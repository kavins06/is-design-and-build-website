# Loading performance

The content preview keeps the Direction G design and animation timing. This pass reduces competition for the first screen:

- Hero image is eager with high fetch priority; primary Latin font files are preloaded on the public content pages.
- Below-fold service images use native lazy loading.
- Decorative video source is attached within 400px of its section, plays only while visible, and pauses when the page is hidden. Reduced-motion or data-saving visitors retain the poster without downloading the video. Autoplay failure also leaves the poster visible.
- Reduced-motion visitors do not download the GSAP/Lenis animation bundle. Other visitors retain the existing animations.

## Local mobile lab comparison

Lighthouse, headless Chromium, default mobile simulation, same locally served static build before and after. This is one comparison, not field Core Web Vitals or a guarantee of production performance. The local server does not emulate Vercel compression or caching. Timing metrics have run-to-run variability.

| Metric | Before | After |
| --- | ---: | ---: |
| Initial transferred data | 1,628 KiB | 406 KiB |
| Performance score | 96 | 99 |
| Total blocking time | 230 ms | 110 ms |
| Speed Index | 1.8 s | 1.6 s |
| Largest Contentful Paint | 0.9 s | 1.2 s |
| Cumulative Layout Shift | 0 | 0 |

Initial transferred data fell about 75%; deferred media still downloads when visitors reach it. The deliberately timed hero reveal is unchanged.

`npm run check` and the production build pass. Browser checks verify no initial video request, normal video playback on entry and pause on exit, no video download or motion initialization in reduced-motion mode, mobile navigation, no horizontal overflow and no JavaScript errors. A mobile screenshot review confirms the hero appearance is preserved.
