# Loading performance

The content preview keeps the Direction G design and animation timing. This pass reduces competition for the first screen:

- Hero image is eager with high fetch priority; primary Latin font files are preloaded on the public content pages.
- Below-fold service images start lazy, then the entire clipped stack is preloaded within 800px of its section. A service switch waits for the incoming image to decode; failed loads retain the current image, and late responses cannot override a newer selection.
- Decorative video source is attached within 400px of its section, plays only while visible, and pauses when the page is hidden. Reduced-motion or data-saving visitors retain the poster without downloading the video. Autoplay failure also leaves the poster visible.
- Reduced-motion visitors do not download the GSAP/Lenis animation bundle. Other visitors retain the existing animations.

## Local mobile lab comparison

Three before/after pairs run sequentially with Lighthouse and headless Chromium, using default mobile simulation and fresh browser runs. No functional browser tests or builds overlapped these runs. The baseline is commit `4463ca5`; the optimized build includes the service-image regression fix. Both were served by local Python static servers. Values below are medians; this is not field Core Web Vitals or a guarantee of production performance. The local servers do not emulate Vercel compression or caching.

| Metric | Before | After |
| --- | ---: | ---: |
| Initial transferred data | 1,628 KiB | 406 KiB |
| Performance score | 99 | 100 |
| Total blocking time | 101 ms | 60 ms |
| Speed Index | 1.92 s | 1.48 s |
| Largest Contentful Paint | 0.94 s | 1.16 s |
| Cumulative Layout Shift | 0.00042 | 0 |

Before scores ranged from 96 to 100; after scores were 100 in all three runs. Baseline transferred data ranged from 877 to 1,628 KiB as the eager video transfer varied during the measurement window; after transfer was 406 KiB in all runs. Median initial transferred data fell about 75%; deferred media still downloads when visitors reach it. LCP was slightly slower, so this is not an improvement in every metric. Lighthouse identifies the hero paragraph as LCP, not completion of the deliberately timed photo reveal, whose timing is unchanged.

These results supersede the original single-run 96-to-99 comparison. Its after run overlapped a functional browser test, so the original score and timing differences should not be attributed to the code changes.

## Regression verification

`npm run check` and the production build pass. Browser checks verify no initial video request, normal video playback on entry and pause on exit, no video download or motion initialization in reduced-motion mode, mobile navigation, no horizontal overflow and no JavaScript errors. A mobile screenshot review confirms the hero appearance is preserved.

Focused adversarial regression checks hold the Roofing image response while activating it: the outgoing image remains visible beyond the wipe duration, and the new image activates only after decoding. Additional cases verify that a newer service selection wins over a delayed response, a failed image keeps the previous image, and proximity preloading does not request the Roofing image during the initial hero view. Chromium was tested; Safari/Firefox and real-user performance remain unverified.
