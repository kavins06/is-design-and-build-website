// Set to true when the site is ready for search engines. While false, every
// page tells search engines not to index it, including on the live domain.
export const launched = false;

export const site = {
  name: 'I.S Design + Build',
  since: 1989,
  phone: '(202) 519-1831',
  phoneHref: 'tel:+12025191831',
  email: 'info@isdesignandbuild.com',
  address: ['1010 Wisconsin Ave NW, Suite 300', 'Washington, DC 20007'],
  hours: 'Monday to Friday, 9:00 AM to 5:00 PM',
  area: 'Washington, DC · Northern Virginia · Montgomery County, Maryland',
};

export const capabilities = [
  { n: '01', name: 'Kitchens', service: 'kitchen', href: '/kitchen-remodeling/', text: 'Layout, storage and finishes that work together.' },
  { n: '02', name: 'Bathrooms', service: 'bathroom', href: '/bathroom-remodeling/', text: 'From a powder room to a primary suite.' },
  { n: '03', name: 'Whole-home renovations', service: 'whole-home', href: '/whole-home-remodeling/', text: 'Every room in one coordinated plan.' },
  { n: '04', name: 'Home additions', service: 'addition', href: '/home-additions/', text: 'More room that feels like it was always there.' },
  { n: '05', name: 'Roofing', service: 'roofing', href: '/roofing/', text: 'Repairs and full replacements.' },
];

export const process = [
  { n: '01', name: 'Tell us about your home', text: 'What you want to change, and what matters most.' },
  { n: '02', name: 'Explore the possibilities', text: 'Layout, materials and the details that shape the work.' },
  { n: '03', name: 'Define the project', text: 'Scope, estimate and any permits, agreed up front.' },
  { n: '04', name: 'Bring it to life', text: 'We build. You always know where things stand.' },
  { n: '05', name: 'Review the details', text: 'We walk the finished work with you.' },
];
