// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://isdesignandbuild.com',
  trailingSlash: 'always',
  integrations: [sitemap({ filter: (page) => !new URL(page).pathname.startsWith('/concepts/') })],
});
