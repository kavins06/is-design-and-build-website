import type { APIRoute } from 'astro';
import { launched } from '../data/site';

// Before launch, production still allows crawling so that search engines can
// read the noindex tag on each page and drop it; the sitemap is not advertised.
export const GET: APIRoute = () => new Response(
  process.env.VERCEL_ENV === 'production' && !launched
    ? 'User-agent: *\nAllow: /\n'
    : process.env.VERCEL_ENV === 'production'
    ? 'User-agent: *\nAllow: /\nDisallow: /concepts/\n\nSitemap: https://isdesignandbuild.com/sitemap-index.xml\n'
    : 'User-agent: *\nDisallow: /\n',
  { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
);
