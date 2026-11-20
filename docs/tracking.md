# Tracking: Tag Manager and Google Analytics

The site pushes lead events to the dataLayer. Tag Manager container **GTM-WFP56VXL** forwards them to GA4 stream **G-F2YV2LBD5Q**. The container and the GA4 settings are kept in code, in [`scripts/tracking/config.mjs`](../scripts/tracking/config.mjs), and [`scripts/tracking/sync.mjs`](../scripts/tracking/sync.mjs) makes the live accounts match it. Change tracking in the config and run the sync. Don't edit by hand in Tag Manager: the next sync overwrites the items it manages.

## What is tracked

| Event | Sent when | Key event (a lead) |
| --- | --- | --- |
| `click_to_call` | a phone link is tapped | yes |
| `email_click` | an email link is tapped | yes |
| `generate_lead` | the enquiry form delivers | yes |
| `start_project_click` | a link to /contact-us/ is clicked | no |
| `chat_open` | a chat button is tapped | no: opening the chat is not an enquiry |
| `inquiry_fallback_shown` | the form falls back to the visitor's email app | no |

Every event carries `link_location` (header, phone_bar, footer, closing, page) and, where it applies, `service`. Both are GA4 custom dimensions.

The site loads Tag Manager only on the production deployment (`VERCEL_ENV=production`, in `src/layouts/BaseLayout.astro`). The events are pushed in `BaseLayout.astro` (links and chat) and `src/pages/contact-us.astro` (the form).

## Commands

| Command | What it does |
| --- | --- |
| `npm run tracking:check` | Read-only: signs in, finds the container and the GA4 property, lists what differs from the config |
| `npm run tracking:apply` | Writes the differences: a Tag Manager draft, plus the GA4 key events and dimensions |
| `npm run tracking:publish` | Writes, then publishes the Tag Manager draft as a new live version |

All three need `GOOGLE_SERVICE_ACCOUNT_JSON` (below). Publishing also publishes anything else left in the container's Default Workspace, so run `tracking:check` first.

## One-time setup: the service account

A Google **API key does not work**: Tag Manager and the Analytics Admin API only accept a signed-in account. The sync signs in as a service account.

1. In [Google Cloud Console](https://console.cloud.google.com/), pick or create a project.
2. **APIs & Services → Library:** enable **Tag Manager API** and **Google Analytics Admin API**.
3. **IAM & Admin → Service accounts → Create service account.** Name it, for example, `website-tracking`. Skip the optional role steps.
4. Open it, then **Keys → Add key → Create new key → JSON**. A `.json` file downloads. It is a password: never commit it or paste it into a chat.
5. Copy the service account's email (it ends in `.iam.gserviceaccount.com`) and add it:
   - **Tag Manager**, container GTM-WFP56VXL: Admin → User Management → add user, container permission **Publish**.
   - **Google Analytics**, the property with G-F2YV2LBD5Q: Admin → Property access management → add user, role **Editor**.
6. Store the key where the sync runs:
   - **Claude Code on the web:** environment menu in the session title bar → Edit → add an environment variable named `GOOGLE_SERVICE_ACCOUNT_JSON` whose value is the whole contents of the `.json` file. Start a new session to pick it up.
   - **A computer:** `export GOOGLE_SERVICE_ACCOUNT_JSON="$(cat path/to/key.json)"` in the shell, or a git-ignored `.env` file.

   A GitHub repository secret is not visible to these: it only reaches GitHub Actions.

To revoke access, delete the key in Cloud Console, or remove the service account's email from Tag Manager and Analytics.

## Changing tracking later

- **New event:** push it from the site (`dataLayer.push({ event: 'name', ... })`), add it to `events` in the config (and to `keyEvents` if it is a lead), then run `npm run tracking:publish`.
- **New detail on events:** push the key with every event and add it to `parameters`. The sync adds the Tag Manager variable, the tag parameter and the GA4 dimension.
- **Different container or stream:** change `container` and `measurementId` in the config, and the container ID in `src/layouts/BaseLayout.astro`, in the same commit.

## Moving the site to GTM-WFP56VXL (20 November 2026)

The site previously loaded GTM-NSZWBWT2, which only sent page views and which nobody could open. Order matters, or page views stop:

1. Run `npm run tracking:publish`, so the new container has the Google tag live.
2. Then merge the switch in `BaseLayout.astro` to `main`.
3. On the live site, use Tag Manager **Preview**, or GA4 **DebugView**, to see a phone tap arrive as `click_to_call`.
