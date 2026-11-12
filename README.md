# I.S Design + Build Website

Marketing website for **https://isdesignandbuild.com**, built with [Astro](https://astro.build).

## Run

Requires Node 22.12 or later.

```sh
npm install
npm run dev
```

Open http://localhost:4321.

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the local dev server |
| `npm run build` | Build the static site into `dist/` |
| `npm run preview` | Serve the built site locally |
| `npm run check` | Type-check `.astro` and TypeScript files |

## Layout

- `src/pages/`: homepage, contact and operational notices; `[slug].astro` builds approved content pages.
- `src/data/content.json`: approved interior-page copy and metadata.
- `src/components/`: shared navigation, footer, hero and genuine project photography.
- `src/styles/content.css`: Direction G extensions for interior pages and accessible navigation.
- `src/layouts/BaseLayout.astro`: shared `<head>`, canonical URL, and page shell.
- `public/`: files served as-is (favicon and media).
- `src/pages/robots.txt.ts`: environment-aware robots output.
- `astro.config.mjs`: site URL, trailing-slash policy, sitemap.

`dist/` is build output and is not committed.

Builds are noindex by default. Only `VERCEL_ENV=production` enables indexing of public pages. The contact experience prepares an email for the visitor to review and send from their own email app. It does not submit a lead to a backend.

See [content implementation notes](docs/content-implementation.md) for sources, verification, future integration requirements and the remaining live-site migration work.
