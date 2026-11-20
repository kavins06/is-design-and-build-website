// What Google Tag Manager and Google Analytics should contain for this site.
// scripts/tracking/sync.mjs makes the live accounts match this file.
// Change tracking here, never by hand in Tag Manager: a hand edit is overwritten on the next sync.

export const container = 'GTM-WFP56VXL'; // the site loads it once src/layouts/BaseLayout.astro is switched (docs/tracking.md)
export const measurementId = 'G-F2YV2LBD5Q'; // the GA4 web stream

// Events the site pushes to the dataLayer (BaseLayout.astro, contact-us.astro).
// Adding an event here forwards it to GA4; the site must also push it.
export const events = [
  'click_to_call', // a tel: link; link_location says where
  'email_click', // a mailto: link
  'start_project_click', // a link to /contact-us/; service says which
  'chat_open', // a [data-chat] button
  'generate_lead', // the enquiry form delivered
  'inquiry_fallback_shown', // the form fell back to the visitor's email app
];

// dataLayer keys sent with every event above, as GA4 event parameters and event-scoped custom dimensions.
export const parameters = [
  { key: 'link_location', displayName: 'Link location' },
  { key: 'service', displayName: 'Service' },
];

// Events counted as leads in GA4. chat_open is deliberately not one: opening the chat is not an enquiry.
export const keyEvents = ['click_to_call', 'email_click', 'generate_lead'];

// Names in Tag Manager. sync.mjs finds items by these names, so renaming one here creates a new item.
export const names = {
  googleTag: 'Google tag – GA4',
  trigger: 'Site lead events',
  eventTag: 'GA4 – site lead events',
};
