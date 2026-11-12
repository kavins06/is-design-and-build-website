import { site } from './site';

// Structured data (schema.org JSON-LD). Only facts already published on the
// site are stated here: no ratings or prices.
const origin = 'https://isdesignandbuild.com';
const businessId = `${origin}/#business`;
const areas = ['Washington, DC', 'Northern Virginia', 'Montgomery County, Maryland', 'Bethesda, Maryland', 'Chevy Chase, Maryland'];

export const abs = (path: string) => new URL(path, origin).href;

export const business = {
  '@type': ['HomeAndConstructionBusiness', 'GeneralContractor'],
  '@id': businessId,
  name: site.name,
  alternateName: 'I.S. Enterprises',
  url: `${origin}/`,
  image: abs('/og.jpg'),
  telephone: '+12025191831',
  email: site.email,
  foundingDate: String(site.since),
  address: {
    '@type': 'PostalAddress',
    streetAddress: '1010 Wisconsin Ave NW, Suite 300',
    addressLocality: 'Washington',
    addressRegion: 'DC',
    postalCode: '20007',
    addressCountry: 'US',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00',
    },
  ],
  areaServed: areas.map((name) => ({ '@type': 'AdministrativeArea', name })),
  hasMap: 'https://maps.google.com/maps?cid=1968106805018591346',
  sameAs: ['https://maps.google.com/maps?cid=1968106805018591346'],
  knowsAbout: ['Kitchen remodeling', 'Bathroom remodeling', 'Whole-home renovation', 'Home additions', 'Roofing'],
};

export const website = {
  '@type': 'WebSite',
  '@id': `${origin}/#website`,
  url: `${origin}/`,
  name: site.name,
  publisher: { '@id': businessId },
  inLanguage: 'en-US',
};

export const breadcrumbs = (trail: { name: string; path: string }[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: trail.map((item, i) => ({ '@type': 'ListItem', position: i + 1, name: item.name, item: abs(item.path) })),
});

export const service = (name: string, description: string, path: string) => ({
  '@type': 'Service',
  '@id': `${abs(path)}#service`,
  name,
  serviceType: name,
  description,
  url: abs(path),
  provider: { '@id': businessId },
  areaServed: areas.map((area) => ({ '@type': 'AdministrativeArea', name: area })),
});

const text = (html: string) =>
  html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

export const faqPage = (items: { q: string; a: string }[]) => ({
  '@type': 'FAQPage',
  mainEntity: items.map(({ q, a }) => ({ '@type': 'Question', name: text(q), acceptedAnswer: { '@type': 'Answer', text: text(a) } })),
});

/** Questions written in the copy as <p><strong>Question?</strong><br/>Answer</p>. */
export const questionsFromBlocks = (blocks: string[]) =>
  blocks.flatMap((block) => {
    const match = block.match(/^<p><strong>(.+?)<\/strong><br\s*\/?>(.+)<\/p>$/s);
    return match ? [{ q: match[1], a: match[2] }] : [];
  });

export const article = (a: { title: string; description: string; date: string; path: string; image: string }) => ({
  '@type': 'BlogPosting',
  '@id': `${abs(a.path)}#article`,
  headline: a.title,
  description: a.description,
  datePublished: a.date,
  dateModified: a.date,
  image: abs(a.image),
  url: abs(a.path),
  mainEntityOfPage: abs(a.path),
  author: { '@id': businessId },
  publisher: { '@id': businessId },
  inLanguage: 'en-US',
});

export const graph = (nodes: object[]) => ({ '@context': 'https://schema.org', '@graph': nodes });
