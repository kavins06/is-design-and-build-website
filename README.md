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

- `src/pages/`: one file per route.
- `src/layouts/BaseLayout.astro`: shared `<head>`, canonical URL, and page shell.
- `public/`: files served as-is (favicon, `robots.txt`).
- `astro.config.mjs`: site URL, trailing-slash policy, sitemap.

`dist/` is build output and is not committed.
