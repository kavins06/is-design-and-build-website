// Receives the website enquiry form and emails it to the company.
// Needs RESEND_API_KEY in the Vercel project. Without it the endpoint answers 503
// and the page falls back to preparing an email in the visitor's own email app.
const SERVICES = ['kitchen', 'bathroom', 'whole-home', 'addition', 'roofing', 'remodeling', 'other', 'unsure'];
const clean = (value, max) => String(value ?? '').replace(/[\u0000-\u0008\u000b-\u001f]/g, '').trim().slice(0, max);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method_not_allowed' });
  let data = req.body;
  if (typeof data === 'string') { try { data = JSON.parse(data); } catch { data = null; } }
  if (!data || typeof data !== 'object') return res.status(400).json({ error: 'invalid' });
  // Honeypot: real visitors never see or fill this field. Pretend it worked.
  if (clean(data.company, 200)) return res.status(200).json({ ok: true });

  const f = {
    service: clean(data.service, 40), serviceLabel: clean(data.serviceLabel, 80), town: clean(data.town, 100), zip: clean(data.zip, 10),
    brief: clean(data.brief, 1500), timing: clean(data.timing, 60), budget: clean(data.budget, 120), water: clean(data.water, 20),
    name: clean(data.name, 100), preferred: data.preferred === 'phone' ? 'phone' : 'email', reply: clean(data.reply, 160),
  };
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.reply);
  const phoneOk = f.reply.replace(/\D/g, '').length >= 7;
  if (!SERVICES.includes(f.service) || !f.town || !f.brief || !f.name || !(f.preferred === 'email' ? emailOk : phoneOk)) {
    return res.status(422).json({ error: 'missing_fields' });
  }
  const key = process.env.RESEND_API_KEY;
  if (!key) return res.status(503).json({ error: 'not_configured' });

  const text = [
    `Project: ${f.serviceLabel || f.service}`, `Location: ${f.town}${f.zip ? ' · ' + f.zip : ''}`, '', f.brief, '',
    `Timing: ${f.timing || 'Not specified'}`, `Budget: ${f.budget || 'Not specified'}`,
    ...(f.service === 'roofing' ? [`Water currently entering: ${f.water || 'Not sure'}`] : []), '',
    `Name: ${f.name}`, `Preferred contact: ${f.preferred}`, `Contact details: ${f.reply}`,
  ].join('\n');
  try {
    const sent = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.ENQUIRY_FROM || 'I.S Design + Build website <enquiries@isdesignandbuild.com>',
        to: [process.env.ENQUIRY_TO || 'info@isdesignandbuild.com'],
        ...(f.preferred === 'email' ? { reply_to: f.reply } : {}),
        subject: `Project enquiry: ${f.serviceLabel || f.service} (${f.town})`,
        text,
      }),
    });
    if (!sent.ok) return res.status(502).json({ error: 'send_failed' });
    return res.status(200).json({ ok: true });
  } catch {
    return res.status(502).json({ error: 'send_failed' });
  }
}
