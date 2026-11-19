// Set to true when the site is ready for search engines. While false, every
// page tells search engines not to index it, including on the live domain.
export const launched = true;

export const site = {
  name: 'I.S Design + Build',
  since: 1989,
  phone: '(202) 519-1831',
  phoneHref: 'tel:+12025191831',
  email: 'info@isenterprises.net',
  address: ['1010 Wisconsin Ave NW, Suite 300 #12', 'Washington, DC 20007'],
  hours: 'Monday to Friday, 9:00 AM to 5:00 PM',
  area: 'Washington, DC · Northern Virginia · Montgomery County, Maryland',
};

// Intercom Messenger (hosts the Fin AI chatbot). A public workspace ID, not a secret.
// BaseLayout.astro loads the Messenger for anonymous visitors on every page.
export const intercomAppId = 'lbyfepf8';

// Licences, insurance and accreditation, exactly as the owner confirms them, for the footer
// and the contact page. Leave null until confirmed: nothing is shown while it is null.
// Maryland requires the MHIC number on contractor websites once it is confirmed.
export const credentials: string | null = null;

export const capabilities = [
  { n: '01', name: 'Kitchens', service: 'kitchen', href: '/kitchen-remodeling/', text: 'Layout, storage and finishes that work together.' },
  { n: '02', name: 'Bathrooms', service: 'bathroom', href: '/bathroom-remodeling/', text: 'From a powder room to a primary suite.' },
  { n: '03', name: 'Whole-home renovations', service: 'whole-home', href: '/whole-home-remodeling/', text: 'Every room in one coordinated plan.' },
  { n: '04', name: 'Home additions', service: 'addition', href: '/home-additions/', text: 'More room that feels like it was always there.' },
  { n: '05', name: 'Roofing', service: 'roofing', href: '/roofing/', text: 'Repairs and replacements, plus the leak damage inside.' },
  { n: '06', name: 'Lead paint', service: 'lead', href: '/lead-paint-abatement/', text: 'Lead-safe work in homes and rentals built before 1978.' },
];

export const process = [
  { n: '01', name: 'Tell us about your home', text: 'What you want to change, and what matters most.' },
  { n: '02', name: 'We visit and talk it through', text: 'We look at the house with you and lay out the options.' },
  { n: '03', name: 'Scope and estimate', text: 'What’s included, your selections and any permits, agreed up front.' },
  { n: '04', name: 'Agree, then build', text: 'Cost and arrangements are settled before work starts. You always know where things stand.' },
  { n: '05', name: 'Walk through the finished work', text: 'We go room by room with you and close out the last items.' },
];
