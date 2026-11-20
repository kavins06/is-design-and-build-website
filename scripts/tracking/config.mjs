// What Google Tag Manager and Google Analytics should contain for this site.
// scripts/tracking/sync.mjs makes the live accounts match this file.
// Change tracking here, never by hand in Tag Manager: a hand edit is overwritten on the next sync.

export const container = 'GTM-WFP56VXL'; // must match the ID in src/layouts/BaseLayout.astro
export const measurementId = 'G-F2YV2LBD5Q'; // the GA4 web stream

// Events the site pushes to the dataLayer (BaseLayout.astro).
// Adding an event here forwards it to GA4; the site must also push it.
export const events = [
  'click_to_call', // a tel: link; link_location says where
  'email_click', // a mailto: link
  'chat_open', // a Chat now button; service says which page's service, if any
  'chat_unavailable', // the chat could not load, so the visitor was shown the phone number and email
  'generate_lead', // the visitor gave Tony (Intercom) their email address in the chat
];

// dataLayer keys sent with every event above, as GA4 event parameters and event-scoped custom dimensions.
export const parameters = [
  { key: 'link_location', displayName: 'Link location' },
  { key: 'service', displayName: 'Service' },
];

// Events counted as leads in GA4. chat_open is deliberately not one: opening the chat is not an inquiry.
// generate_lead is: the visitor has left a way to reach them.
export const keyEvents = ['click_to_call', 'email_click', 'generate_lead'];

// Names in Tag Manager. sync.mjs finds items by these names, so renaming one here creates a new item.
export const names = {
  trigger: 'Site lead events',
  eventTag: 'GA4 – site lead events',
};
