import type { APIRoute } from 'astro';
export const GET: APIRoute = () => new Response(
  process.env.VERCEL_ENV === 'production'
    ? 'User-agent: *\nAllow: /\nDisallow: /concepts/\n\nSitemap: https://isdesignandbuild.com/sitemap-index.xml\n'
    : 'User-agent: *\nDisallow: /\n',
  { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
);
