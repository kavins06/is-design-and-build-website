// Makes Google Tag Manager and Google Analytics match scripts/tracking/config.mjs.
//
//   node scripts/tracking/sync.mjs            check only: sign in, find the container and property, list what differs
//   node scripts/tracking/sync.mjs --apply    also write the differences (GTM workspace draft, GA4 key events and dimensions)
//   node scripts/tracking/sync.mjs --publish  also publish the GTM workspace as a new live version
//
// Needs GOOGLE_SERVICE_ACCOUNT_JSON: the full JSON key of a Google Cloud service account that has
// Publish on the container and Editor on the GA4 property. See docs/tracking.md.

import { createSign } from 'node:crypto';
import * as want from './config.mjs';

const mode = process.argv.includes('--publish') ? 'publish' : process.argv.includes('--apply') ? 'apply' : 'check';
const write = mode !== 'check';
const GTM = 'https://tagmanager.googleapis.com/tagmanager/v2';
const GA = 'https://analyticsadmin.googleapis.com/v1beta';
const SCOPES = [
  'https://www.googleapis.com/auth/tagmanager.edit.containers',
  'https://www.googleapis.com/auth/tagmanager.edit.containerversions',
  'https://www.googleapis.com/auth/tagmanager.publish',
  'https://www.googleapis.com/auth/analytics.edit',
];

const log = (...a) => console.log(...a);
const fail = (msg) => { console.error(`\n✗ ${msg}`); process.exit(1); };

// ---------- auth: a signed JWT exchanged for an access token (no dependencies) ----------
async function accessToken() {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!raw) fail('GOOGLE_SERVICE_ACCOUNT_JSON is not set. See docs/tracking.md.');
  let key;
  try { key = JSON.parse(raw); } catch { fail('GOOGLE_SERVICE_ACCOUNT_JSON is not valid JSON. It must be the whole key file, not an API key.'); }
  if (key.type !== 'service_account' || !key.private_key || !key.client_email) fail('GOOGLE_SERVICE_ACCOUNT_JSON is not a service-account key file.');
  const b64 = (v) => Buffer.from(typeof v === 'string' ? v : JSON.stringify(v)).toString('base64url');
  const now = Math.floor(Date.now() / 1000);
  const unsigned = `${b64({ alg: 'RS256', typ: 'JWT' })}.${b64({ iss: key.client_email, scope: SCOPES.join(' '), aud: 'https://oauth2.googleapis.com/token', iat: now, exp: now + 3600 })}`;
  const jwt = `${unsigned}.${createSign('RSA-SHA256').update(unsigned).sign(key.private_key, 'base64url')}`;
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: jwt }),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) fail(`Google refused the service account sign-in: ${body.error_description || body.error || res.status}`);
  log(`✓ Signed in as ${key.client_email}`);
  return body.access_token;
}

let token;
async function api(method, url, body) {
  const res = await fetch(url, {
    method,
    headers: { authorization: `Bearer ${token}`, ...(body ? { 'content-type': 'application/json' } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  const data = text ? JSON.parse(text) : {};
  if (!res.ok) {
    const msg = data.error?.message || text || res.status;
    const err = new Error(`${method} ${url.replace(/^https:\/\/[^/]+/, '')}: ${res.status} ${msg}`);
    err.status = res.status;
    throw err;
  }
  return data;
}
async function list(url, field) {
  const out = [];
  let page = '';
  do {
    const data = await api('GET', `${url}${url.includes('?') ? '&' : '?'}pageSize=200${page ? `&pageToken=${page}` : ''}`);
    out.push(...(data[field] || []));
    page = data.nextPageToken;
  } while (page);
  return out;
}

// ---------- what Tag Manager should hold ----------
const tpl = (key, value) => ({ type: 'template', key, value });
const regex = `^(${want.events.join('|')})$`;
const desired = {
  variables: want.parameters.map((p) => ({
    name: p.key,
    type: 'v',
    parameter: [{ type: 'integer', key: 'dataLayerVersion', value: '2' }, { type: 'boolean', key: 'setDefaultValue', value: 'false' }, tpl('name', p.key)],
  })),
  triggers: [{
    name: want.names.trigger,
    type: 'customEvent',
    customEventFilter: [{ type: 'matchRegex', parameter: [tpl('arg0', '{{_event}}'), tpl('arg1', regex)] }],
  }],
  tags: (triggerId) => [
    {
      name: want.names.eventTag,
      type: 'gaawe',
      parameter: [
        tpl('eventName', '{{Event}}'),
        tpl('measurementIdOverride', want.measurementId),
        { type: 'boolean', key: 'sendEcommerceData', value: 'false' },
        { type: 'list', key: 'eventSettingsTable', list: want.parameters.map((p) => ({ type: 'map', map: [tpl('parameter', p.key), tpl('parameterValue', `{{${p.key}}}`)] })) },
      ],
      firingTriggerId: [triggerId],
    },
  ],
};

// A desired parameter matches when an existing one has the same key and the same value (lists compared whole).
const canon = (p) => JSON.stringify({ type: p.type, key: p.key, value: p.value, list: p.list, map: p.map }, (k, v) => (v === undefined ? undefined : v));
const paramsMatch = (have = [], need = []) => need.every((n) => have.some((h) => h.key === n.key && canon(h) === canon(n)));
const mergeParams = (have = [], need = []) => [...have.filter((h) => !need.some((n) => n.key === h.key)), ...need];
const sameSet = (a = [], b = []) => a.length === b.length && a.every((x) => b.includes(x));

let changes = 0;
async function upsert(kind, base, have, item, matches) {
  const found = have.find((h) => h.name === item.name);
  if (found && found.type === item.type && matches(found)) { log(`  = ${kind} "${item.name}" is correct`); return found; }
  changes++;
  log(`  ${found ? '~ update' : '+ create'} ${kind} "${item.name}"`);
  if (!write) return found || { ...item, [`${kind}Id`]: `(new ${kind})` };
  if (!found) return api('POST', `${base}/${kind}s`, item);
  const body = { ...found, ...item, parameter: found.type === item.type ? mergeParams(found.parameter, item.parameter) : item.parameter };
  return api('PUT', `${GTM}/${found.path}?fingerprint=${found.fingerprint}`, body);
}

async function syncTagManager() {
  log(`\nTag Manager ${want.container}`);
  const accounts = await list(`${GTM}/accounts`, 'account');
  let container;
  for (const a of accounts) {
    const cs = await list(`${GTM}/${a.path}/containers`, 'container');
    container = cs.find((c) => c.publicId === want.container);
    if (container) break;
  }
  if (!container) fail(`The service account cannot see ${want.container}. In Tag Manager, Admin → User Management, add its email with Publish.`);
  log(`✓ Found container "${container.name}"`);

  const workspaces = await list(`${GTM}/${container.path}/workspaces`, 'workspace');
  const ws = workspaces.find((w) => w.name === 'Default Workspace') || workspaces[0];
  log(`  using workspace "${ws.name}"`);
  const base = `${GTM}/${ws.path}`;

  const builtIns = await list(`${base}/built_in_variables`, 'builtInVariable');
  if (builtIns.some((b) => b.type === 'event')) log('  = built-in variable "Event" is enabled');
  else { changes++; log('  + enable built-in variable "Event"'); if (write) await api('POST', `${base}/built_in_variables?type=event`); }

  const [vars, triggers, tags] = await Promise.all([list(`${base}/variables`, 'variable'), list(`${base}/triggers`, 'trigger'), list(`${base}/tags`, 'tag')]);
  for (const v of desired.variables) await upsert('variable', base, vars, v, (f) => paramsMatch(f.parameter, v.parameter));
  let trigger;
  for (const t of desired.triggers) trigger = await upsert('trigger', base, triggers, t, (f) => paramsMatch(f.customEventFilter?.[0]?.parameter, t.customEventFilter[0].parameter) && f.customEventFilter?.[0]?.type === 'matchRegex');
  for (const t of desired.tags(trigger.triggerId)) await upsert('tag', base, tags, t, (f) => paramsMatch(f.parameter, t.parameter) && sameSet(f.firingTriggerId, t.firingTriggerId));

  // Page views come from the tag that loads the GA4 stream itself (Tag Manager's "Google Analytics" tag, made in
  // Tag Manager). The sync never creates one: a second tag for the same stream makes Tag Manager refuse to publish.
  const loaders = tags.filter((t) => t.name !== want.names.eventTag && JSON.stringify(t.parameter || []).includes(want.measurementId));
  if (loaders.length === 1) log(`  = tag "${loaders[0].name}" loads ${want.measurementId}`);
  else if (!loaders.length) { changes++; log(`  ! no tag loads ${want.measurementId}, so page views are not sent. In Tag Manager add Tags → New → Google Analytics with that ID (see docs/tracking.md).`); }
  else {
    // Keep Tag Manager's own Google Analytics tag and drop plain Google tags (type googtag) for the same stream.
    const extra = loaders.filter((t) => t.type === 'googtag');
    if (!extra.length || extra.length === loaders.length) fail(`${loaders.length} tags load ${want.measurementId} (${loaders.map((t) => `"${t.name}"`).join(', ')}). Delete all but one in Tag Manager.`);
    for (const t of extra) {
      changes++; log(`  - delete tag "${t.name}": it loads ${want.measurementId} a second time, which stops Tag Manager publishing`);
      if (write) await api('DELETE', `${GTM}/${t.path}`);
    }
  }

  const notFound = (e) => (e.status === 404 ? null : Promise.reject(e));
  const live = await api('GET', `${GTM}/${container.path}/versions:live`).catch(notFound);
  const latest = await api('GET', `${GTM}/${container.path}/version_headers:latest`).catch(notFound);
  log(`  live version: ${live ? `${live.containerVersionId} "${live.name || ''}"` : 'none published'}`);
  // A version saved but never made live: an earlier publish failed after create_version, which also emptied the workspace.
  const stranded = latest?.containerVersionId && latest.containerVersionId !== '0' && latest.containerVersionId !== live?.containerVersionId ? latest.containerVersionId : null;
  const status = await api('GET', `${base}/status`);
  const pending = status.workspaceChange?.length || 0;

  if (mode !== 'publish') {
    if (stranded && !pending) { changes++; log(`  ! version ${stranded} is saved but not live`); }
    return;
  }
  const publish = async (path) => {
    const pub = await api('POST', `${GTM}/${path}:publish`);
    if (pub.compilerError || !pub.containerVersion) fail(`Tag Manager could not publish ${path.split('/').pop()}: the version did not compile. Open it in Tag Manager to see why.`);
    log(`✓ Published version ${pub.containerVersion.containerVersionId}`);
  };
  if (pending) {
    const created = await api('POST', `${base}:create_version`, { name: `Synced from scripts/tracking ${new Date().toISOString().slice(0, 10)}`, notes: 'Published by scripts/tracking/sync.mjs' });
    if (created.compilerError || !created.containerVersion) fail(`Tag Manager could not build a version${created.syncStatus?.mergeConflict ? ' (the workspace has merge conflicts)' : ''}.`);
    await publish(created.containerVersion.path);
  } else if (stranded) {
    log(`  version ${stranded} was saved but never made live; publishing it`);
    await publish(`${container.path}/versions/${stranded}`);
  } else log('  live version is up to date');
}

async function syncAnalytics() {
  log(`\nGoogle Analytics ${want.measurementId}`);
  const summaries = await list(`${GA}/accountSummaries`, 'accountSummaries');
  let property;
  for (const s of summaries) for (const p of s.propertySummaries || []) {
    if (property) break;
    const streams = await list(`${GA}/${p.property}/dataStreams`, 'dataStreams');
    if (streams.some((d) => d.webStreamData?.measurementId === want.measurementId)) property = p;
  }
  if (!property) fail(`The service account cannot see the property with ${want.measurementId}. In Analytics, Admin → Property access management, add its email as Editor.`);
  log(`✓ Found property "${property.displayName}" (${property.property})`);

  const keyEvents = await list(`${GA}/${property.property}/keyEvents`, 'keyEvents');
  for (const e of want.keyEvents) {
    if (keyEvents.some((k) => k.eventName === e)) { log(`  = key event "${e}"`); continue; }
    changes++; log(`  + mark "${e}" as a key event`);
    if (write) await api('POST', `${GA}/${property.property}/keyEvents`, { eventName: e, countingMethod: 'ONCE_PER_EVENT' });
  }
  const extra = keyEvents.filter((k) => k.custom && !want.keyEvents.includes(k.eventName)).map((k) => k.eventName);
  if (extra.length) log(`  note: also marked as key events, left as they are: ${extra.join(', ')}`);

  const dims = await list(`${GA}/${property.property}/customDimensions`, 'customDimensions');
  for (const p of want.parameters) {
    if (dims.some((d) => d.parameterName === p.key && d.scope === 'EVENT')) { log(`  = custom dimension "${p.key}"`); continue; }
    changes++; log(`  + create custom dimension "${p.key}"`);
    if (write) await api('POST', `${GA}/${property.property}/customDimensions`, { parameterName: p.key, displayName: p.displayName, scope: 'EVENT' });
  }
}

log(`Mode: ${mode}${write ? '' : ' (read-only: nothing will be changed)'}`);
token = await accessToken();
try {
  await syncTagManager();
  await syncAnalytics();
} catch (e) { fail(e.message); }
log(`\n${changes ? `${changes} difference${changes > 1 ? 's' : ''} ${write ? 'written' : 'found; run with --apply, or --publish to also make the tags live'}` : 'Everything matches.'}`);
if (mode === 'apply' && changes) log('Tag Manager changes are a draft until you run --publish.');
