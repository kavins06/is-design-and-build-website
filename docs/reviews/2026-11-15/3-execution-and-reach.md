> Saved from the 15 November 2026 review of commit 3b2f2ce. File paths under `/tmp/claude-0/…` (R, SHOTS) pointed at scripts and screenshots in a temporary working folder that no longer exists. Findings are as the reviewer wrote them; see [the summary note](../../review-2026-11-15.md) for what was changed.

# Review 3 of 3: Execution & reach

Site: I.S Design + Build, commit 3b2f2ce. I tested the local preview build at http://127.0.0.1:4321/, which is the same commit as live. Live https://isdesignandbuild.com and isenterprises.net were checked with curl only, about 45 requests. Only Chromium is available here, so the Safari and Firefox risks come from reading the code.

Scripts and raw results are in `/tmp/claude-0/-home-user-is-design-and-build-website/deeb0a7f-b2e4-5b6d-979f-62b97e26adf8/scratchpad/review-3/`, called `R/` below. They include crawl.json, axe-no-preference.json, the phone-audit-*.json files, perf-phone-a.json and perf-phone-b.json, photo-contrast.json, lh/home-mobile.json, gtm-sandbox.js, menu-scroll.js, swipe2.js, cls-window.js and resize.js, plus the screenshots cited below.

---

## 1. Verdict

- **Works well enough everywhere not to lose a customer: 6/10.** The basics are solid:
  - No broken links.
  - No console errors.
  - No sideways scrolling at any width from 320 to 1440 px.
  - The headline and main button sit on the first phone screen.
  - The site degrades well with reduced motion or without JavaScript.

  Phones, where most homeowners will arrive, get the least-tested version of a motion-heavy site:
  - **The phone menu can't be scrolled.** "Our story", "Our process", "Service areas" and the menu's phone number can't be reached.
  - **The kitchen page jumps as you scroll** (CLS 0.33, rated "poor").
  - **Swiping in the photo viewer only works by accident.**
  - **None of this has been tried in Safari.**

- **Found by DC-area buyers searching: 6/10.** The technical SEO is clean:
  - Production allows indexing and lists the sitemap.
  - Canonicals and titles are correct, with no duplicates.
  - Structured data is valid.
  - 319 of the old site's 399 URLs redirect.

  What holds it back:
  - Three money pages (bathroom, whole-home, roofing) have no location in their titles.
  - Two real old articles and 66 archive URLs return 404.
  - The name, address and hours don't match the Google Business Profile.
  - Phone CLS is "poor" on the kitchen page.
  - There is no conversion tracking, so nobody can tell which searches turn into calls.

- **Single biggest technical risk:** iPhone and Android visitors get a motion system that has only ever been checked in desktop Chromium. The Lenis smooth-scroll library behind the animations already blocks touch scrolling in the open phone menu (H1). The pinned drawing scenes already shift the layout on phones (H2). Neither was caught because nobody tested on a phone browser.

---

## 2. What works: keep these

1. **No dead ends.**
   - 22 sitemap pages plus the 404 page, scrolled through fully at 1440 px.
   - 192 unique internal URLs (pages, images, fonts, video, PDF) all resolve (`R/crawl.json`). The 193rd URL checked was a deliberate 404 test.
   - No in-page anchor is missing.
   - A missing page returns a real 404 status.
   - No JavaScript errors and no unhandled promise rejections.
2. **Redirects are thorough.**
   - Of the old site's 399 URLs (`/home/user/isdesignandbuild/content/pages.json`), 319 redirect to a live page: 180 to roofing, 92 to kitchen, 46 to bathroom, and /services. Another 11 still exist.
   - On live: `www` and `http` 308 to `https://isdesignandbuild.com/`, and missing trailing slashes get a 308.
   - `*.html`, `/index.html__p=*`, `/concepts/*` and `/services` all work.
   - Every isenterprises.net variant (http/https, www) 308s to the same path on the new domain.
3. **Production indexing logic is right.**
   - Live robots.txt is `Allow: /` plus the sitemap.
   - Live pages carry no robots meta tag.
   - Preview builds stay `noindex` with `Disallow: /` (`BaseLayout.astro:25`, `robots.txt.ts`).
   - Canonicals are absolute and self-referencing, and trailing slashes are consistent.
   - All 23 titles and descriptions are unique, each page has one H1, and no heading levels are skipped.
4. **Valid, honest structured data.**
   - The business node (HomeAndConstructionBusiness + GeneralContractor) and WebSite are on every page.
   - BreadcrumbList is on 22 pages, Service on 6, BlogPosting on 4.
   - FAQ markup is generated from the visible questions (`[slug].astro:33`).
   - Every URL in the markup resolves.
5. **Phone layout basics.**
   - No horizontal overflow on any page at 320, 360, 390, 414, 768, 1024 or 844×390 (`R/phone-audit-*.json`).
   - Headline and main button are on the first screen of every page at 360–414 px.
   - Phone tap targets are at least 44 px.
   - The fixed Call / Start bar never covers the footer (it has 96 px of padding).
   - Rotating a tablet across the 900 px breakpoint leaves a working layout.
6. **Reduced motion and no-JavaScript fallbacks.**
   - With reduced motion, the 54 KB (gzip) animation bundle and the video are never requested.
   - Interior pages are fully visible in both modes.
   - Without JavaScript, the nav shows as plain links and the contact page shows an email and phone fallback.
7. **Speed foundations.**
   - On a throttled phone (4× CPU, 1.6 Mbps, 150 ms round trip), Largest Contentful Paint is text at 0.76–1.0 s on all 17 pages measured.
   - Layout shift at load is 0.
   - Hashed assets are cached for a year as immutable and served with Brotli.
   - Two fonts are preloaded with `font-display: swap`.
   - Images are responsive WebP with width and height set.
   - Lighthouse mobile on the home page (preview build, no Google Tag Manager): Performance 95, Accessibility 96, Best Practices 100.
8. **The portfolio viewer is a native modal `<dialog>`.** Focus goes to Close, Escape closes it, focus returns to the photo that opened it, arrow keys work, and the page behind can't be reached.
9. **Keyboard basics.**
   - The skip link is visible on focus and works.
   - The focus ring is a clear 2 px orange.
   - Header dropdowns are native `<details>`. Enter opens them, and Escape closes them and returns focus.
10. **Hosting basics.**
    - HSTS is on, the certificate is valid (Let's Encrypt, until 17 Jan 2027), and there is no mixed content.
    - The PDF link is labelled with its type and size: "Cabinet catalogue (PDF, 13 MB)".
    - GA4 page views do fire on live. I verified this offline with every analytics hit blocked (section 3, H3).

---

## 3. What fails

### High

**H1. The phone menu can't be scrolled, so four of its links are unreachable on phones.**
- **Where:**
  - `src/scripts/motion.ts:18-24` stops Lenis while `menu-locked` is set.
  - Lenis cancels every wheel and touch move while stopped: `node_modules/lenis/dist/lenis.mjs:617-618`, with non-passive listeners at `:255-286`.
  - The open menu's nav is a scroll box: `src/styles/content.css:82`, `.hd.menu-open nav { max-height: 72svh; overflow-y: auto }`.
  - The nav element is at `src/components/Header.astro:10`.
- **Evidence:** `R/menu-scroll.js` opens the menu and drags with real touch events.

  | Device | Nav overflow | Scroll position after drag | Phone link |
  |---|---|---|---|
  | iPhone 13 | 257 px | stays at 0 | bottom at 759 px of a 664 px screen |
  | iPhone SE | 326 px | stays at 0 | unreachable |
  | 844×390 landscape | 454 px | stays at 0 | unreachable |
  | iPhone SE, reduced motion (no Lenis) | 326 px | moves 0 → 326 | reachable |

  Screenshot: `R/menu-iPhone-390-no-preference.jpg`. The menu ends at "ABOUT" over empty black, with nothing hinting there is more.
- **Impact:** phone visitors can't reach Our story, Our process, Service areas or the menu's call link from the menu. Those are exactly the trust pages, and the call link is the urgent caller's way in.
- **Fix:**
  - Add `data-lenis-prevent` to `<nav id="primary-nav">`, or create Lenis with `prevent: (n) => n.closest?.('.hd, .lb')`.
  - Better: remove the 72svh scroll box and let the full-screen sheet scroll itself (`.cg .hd.menu-open { overflow-y: auto; overscroll-behavior: contain }` plus `data-lenis-prevent` on `.hd`).
  - Re-run `R/menu-scroll.js` afterwards.

**H2. Pinned drawing scenes shift the layout on phones. The kitchen page fails CLS.**
- **Where:**
  - The active point's description animates `grid-template-rows: 0fr → 1fr` inside the pinned, centred phone layout: `src/styles/scenes.css:94-96` (`.dw-text`), used by `src/components/scenes/PlanStory.astro:131`.
  - On the home page, inactive step text is `display: none` (`src/styles/home.css:635`), so the active step grows from 39 to 87 px.
- **Evidence:** CLS computed the way Core Web Vitals does, in session windows, while scrolling on a 390 px phone (`R/cls-window.js`):

  | Page | CLS on phone |
  |---|---|
  | `/kitchen-remodeling/` | **0.33 (poor)** at both scroll speeds |
  | `/whole-home-remodeling/` | 0.11–0.20 |
  | `/service-areas/` | 0.07–0.12 |
  | `/` | 0.04–0.07 |
  | Same pages at 1440 px desktop | ≤ 0.004 |

  The shift sources come from `R/cls-debug.js`: `figure.dw-sheet 172→165 h226→239`, `ol.dw-steps 394→388`, and `li.is-on h39→87` on the home page.
- **Impact:** Search Console will mark the kitchen URL "CLS: poor (mobile)" once field data arrives. That is a page-experience drag on the most valuable service page, and the visible jitter looks broken.
- **Fix:** reserve the space instead of changing height:
  - Give the descriptions one fixed-height panel sized to the longest text, and switch between them with opacity and transform (these don't count as layout shift).
  - Or, at ≤ 900 px, set a fixed `min-height` on `.dw-steps`, use `align-content: start`, and drop the grid-rows transition.
  - On the home page, keep every step's paragraph in the layout and fade it instead of using `display: none`.

**H3. Nothing measures leads.**
- **Where:** `src/layouts/BaseLayout.astro:24,34`. No `dataLayer.push` happens anywhere on click or on enquiry success (`src/pages/contact-us.astro:78-81`).
- **Evidence:**
  - The live container GTM-NSZWBWT2, downloaded to `R/gtm-download/gtm.js`, contains only the GA4 Google tag G-F2YV2LBD5Q with enhanced measurement.
  - Its key-event rules expect `close_convert_lead`, `qualify_lead` and `purchase`, which the site never sends.
  - In the offline sandbox (`R/gtm-sandbox.js`, all Google requests aborted and logged), clicking `tel:`, `mailto:` and "Start a project" produced no event. Enhanced measurement doesn't track `tel:` or `mailto:` links.
  - Page views do fire, but only because the GTM runtime turns `gtag('js', new Date())` into a `gtm.js` event (`gE.js` in the container). Without that line, no page view fires (sandbox variant "noJsCommand").
- **Impact:** the owner can't tell which pages, searches or campaigns produce calls and enquiries, so can't judge this redesign or spend on ads sensibly.
- **Fix:**
  - Use Google's standard GTM snippet (the `{'gtm.start', event:'gtm.js'}` push).
  - Add one always-loaded listener:
    ```js
    document.addEventListener('click', (e) => {
      const a = e.target.closest?.('a'); if (!a) return;
      const h = a.getAttribute('href') || '';
      const where = a.closest('[data-m-bar]') ? 'phone_bar' : a.closest('header') ? 'header' : a.closest('footer') ? 'footer' : 'page';
      if (h.startsWith('tel:')) dataLayer.push({ event: 'click_to_call', link_location: where });
      else if (h.startsWith('mailto:')) dataLayer.push({ event: 'email_click', link_location: where });
      else if (h.startsWith('/contact-us/')) dataLayer.push({ event: 'start_project_click', link_location: where, service: new URL(a.href).searchParams.get('service') || 'none' });
    });
    ```
  - In `contact-us.astro`, after `delivered` is true, add `window.dataLayer?.push({ event: 'generate_lead', service: service.value })`, and push `enquiry_fallback_shown` when the email fallback appears.
  - Add GA4 event tags in GTM and mark `generate_lead` and `click_to_call` as key events.

**H4. The privacy wording contradicts the analytics setup.**
- **Where:** `src/pages/contact-us.astro:32` ("We use these details only to reply to your enquiry.") and `src/pages/privacy-policy.astro:6` (the "Website analytics" paragraph).
- **Evidence:**
  - The live container's `__ogt_1p_data_v2` tag has `isAutoEnabled`, `autoEmailEnabled`, `autoPhoneEnabled`, `autoAddressEnabled` and `isAutoCollectPiiEnabledFlag` all set to true (`R/gtm-download/gtm.js`).
  - That is GA4's "automatically detect user-provided data". It picks up email and phone numbers from forms and sends them to Google hashed.
  - The policy only mentions page views, device, location and cookies.
- **Impact:** the policy, and the promise next to the form, are not accurate. Google's terms for user-provided data require disclosure. It is a needless legal exposure on the page that asks for personal details.
- **Fix (owner or counsel to approve):** either switch off automatic user-provided data detection in the Google tag settings (GA4 Admin), or disclose it in the policy and reword the form note. Add an effective date to the policy.

**H5. iPhone and Safari are untested, and the riskiest features are WebKit-sensitive.**
- **Where:** the handoff says "Chromium only; Safari and Firefox still to check on real devices". No WebKit or Gecko engine is installed here.
- **Evidence from the code:**
  - Lenis on every page (`motion.ts:14`). This is the cause of H1; its touch handling also changes how swipes behave (M1).
  - Pinned GSAP ScrollTrigger scenes inside `100svh` sections while the iOS address bar resizes (`scenes.css:56,126,176`, `home.ts:54-61`). Risk of jumps on real devices.
  - SVG dash-drawing with `pathLength` on an `<ellipse>` (`index.astro:135`) and with `vector-effect: non-scaling-stroke` (`hero.css:107-117`). Historically buggy in WebKit and Gecko: drawings can show dotted or fail to draw.
  - Cross-document view transitions (`scenes.css:6-9`): Safari 18.2+ only, not Firefox. This degrades gracefully.
  - `interpolate-size` and `::details-content` FAQ animation (`scenes.css:164-167`): Chrome only. Others open instantly, which is fine.
  - `<dialog>` with `@starting-style` and `overlay` transitions (`scenes.css:285-287`): Firefox has no `overlay`, so the closing fade is lost. Minor.
  - `backdrop-filter` without the `-webkit-` prefix (`home.css:59`): iOS 17 and earlier show no blur. The header is 92% opaque white anyway, so this is minor.
  - `AbortSignal.timeout` (`contact-us.astro:74`): on iOS 15 it falls into the email fallback. Negligible.
- **Impact:** most DC homeowners browsing on a phone use an iPhone. Every motion-dependent screen is unverified for them.
- **Fix:** before more design work, test the home, kitchen, portfolio and contact pages on a real iPhone (Safari 17 and 18 or later), an iPad and macOS Safari, plus Firefox. Check scrolling through each pinned scene, the menu, the viewer, the line drawings and the FAQ. Add Playwright WebKit and Firefox to CI on a machine where browsers can be installed.

### Medium

**M1. Swiping in the viewer works only as a side effect of Lenis.**
- **Where:** `src/components/scenes/Portfolio.astro:77-82` uses pointerdown/pointerup, and `src/styles/scenes.css:285` (`.lb`) sets no `touch-action`.
- **Evidence (`R/swipe2.js`, iPhone 13):**
  - With motion on: swipes with any vertical drift advance (Lenis cancels the touchmove). A perfectly horizontal start gets `pointercancel` and doesn't advance.
  - With reduced motion, all swipes fail (`pointerdown → pointercancel`).
- **Fix:** add `.lb-stage { touch-action: pan-y pinch-zoom; }` (or `none` on the dialog), reset on `pointercancel`, or use touchstart/touchend.

**M2. The home gallery links show no focus ring, and keyboard focus knocks the pinned gallery out of line.**
- **Where:** `src/pages/index.astro:200` (the `<a>` wrapping `<div>` and `<figcaption>`), `src/styles/content.css:33` (the link stays `display: inline`), and `src/styles/home.css:371-373` (`.rm { overflow: hidden }`).
- **Evidence (`R/railtab2.js`):**
  - The focused link reports `:focus-visible`, but its outline sits on 0×0 inline fragments, so no ring is visible (`R/rail-focus-crop.jpg`).
  - Tabbing also scrolls the hidden overflow box: `section.rm` ends up with `scrollLeft` 1361, which the GSAP pin doesn't know about (`R/rail-tab-3rd.jpg`).
  - This fails WCAG 2.4.7.
- **Fix:** set `.rm-track figure a { display: block; }` and `.rm { overflow: clip; }`. On `focusin`, scroll the page to that figure's position in the pin.

**M3. The About page review is hidden from screen readers.**
- **Where:** `src/scripts/scenes.ts:333-341` (`inks()`), applied to `<p data-ink>` at `src/pages/[slug].astro:79`.
- **Evidence:** axe reports "aria-prohibited-attr" (serious) at desktop and phone widths. GSAP SplitText 3.15 defaults to `aria: "auto"`: it puts `aria-label` on the `<p>` (not allowed on a paragraph, so assistive tech ignores it) and `aria-hidden` on every word.
- **Fix:** use `SplitText.create(el, { type: 'words', aria: 'none' })`. Plain inline spans read correctly. `aria: 'none'` is also safe for the `[data-split]` headings at `scenes.ts:51`.

**M4. The open phone menu leaks focus and doesn't close when it should.**
- **Where:** `src/components/Header.astro:23-41`.
- **Evidence (`R/interact.js`, `R/resize.js`):**
  - Pressing Tab past the last menu item moves focus to "Home", the page's main button and the call link, all hidden behind the full-screen menu.
  - Following a link doesn't close the menu (only Escape, outside clicks and the toggle do). On iOS's back/forward cache, going back restores the page with the menu open and scrolling locked. I can't test this headless; it is inferred from the code.
  - Opening the menu at 800 px and widening to 1200 px leaves `menu-locked` and Lenis stopped, so mouse-wheel scrolling is dead (scroll position stayed at 0) with no menu visible.
- **Fix:**
  - While open, set `inert` on `main` and `footer`, or trap focus.
  - Close on any menu link click: `nav.addEventListener('click', e => e.target.closest('a') && closeMenu())`.
  - Close on `pageshow` and on `matchMedia('(min-width: 901px)')` change.

**M5. Swipe galleries can't be scrolled by keyboard.**
- **Where:** `src/components/scenes/Rail.astro:99` in swipe mode (`scenes.ts:188-193`) and the home `.rm-track` (`index.astro:195`).
- **Evidence:** axe "scrollable-region-focusable" (serious) on `/home-remodeling/`, `/kitchen-remodeling/`, `/bathroom-remodeling/` and `/whole-home-remodeling/` at phone width. This applies at any viewport ≤ 900 px. WCAG 2.1.1.
- **Fix:** in swipe mode, add `tabindex="0" role="region" aria-label="Project photos, scroll sideways"` to the track.

**M6. A looping video plays with no way to pause it.**
- **Where:** `src/pages/index.astro:211-213` (`loop`), played by `src/scripts/media.ts:22`.
- **Evidence:** it plays for as long as it is on screen. WCAG 2.2.2 (level A) requires a pause control for motion longer than 5 seconds. Reduced-motion visitors are spared, but the rule applies to everyone.
- **Fix:** add a pause/play button, or remove `loop` and stop after one pass.

**M7. Stock photos are the heaviest files on the site.**
- **Where:** `src/layouts/InteriorLayout.astro:43` (`widths={[900,1600,2400]}`, default quality), `Band.astro:11` and `[slug].astro:66`.
- **Evidence:**

  | Page | Image | Phone (1600w) | Desktop retina (2400w) | Initial phone weight | Load on throttled phone |
  |---|---|---|---|---|---|
  | Lead paint | town-05 | 810 KB | 1.46 MB | 1.06 MB | 5.5 s |
  | Service areas | town-13 | 507 KB | 1.0 MB | 1.45 MB | 7.5 s |
  | Roofing | town-12 | 363 KB | 682 KB | 1.31 MB | 6.7 s |

  Most other pages weigh about 0.3 MB at load (`R/perf-phone-*.json`). Roofing also pulls the 810 KB town-05 inside the browser's lazy-load distance on slow connections.
- **Fix:** add a 1080/1200w size (`widths={[640,1080,1600,2400]}`), set `quality={55}`, and consider `<Picture formats={['avif','webp']}>`. Replacing the stock photos, already asked of the owner, also fixes this.

**M8. Google Tag Manager is the heaviest script on every page.**
- **Where:** `src/layouts/BaseLayout.astro:34`.
- **Evidence:**
  - gtm.js is 548 KB raw, 149 KB Brotli, 180 KB gzip. All of the site's own JavaScript is 54 KB gzip.
  - On a 4× throttled phone it adds two long tasks of 100–180 ms. Blocking time (my approximation of Total Blocking Time):

    | Page | Without GTM | With GTM |
    |---|---|---|
    | Contact | 86 ms | 312 ms |
    | Kitchen | 180 ms | 376 ms |
    | Home | 217 ms | 368 ms |

  - The text LCP doesn't change. Measured with `GTM=1 R/perf.js`, with the container served locally.
- **Fix:** use the standard snippet and inject it after `load` (or on idle or first interaction). Turn off enhanced-measurement features nobody uses (video, site search). Add field monitoring of Core Web Vitals (Vercel Speed Insights or `web-vitals` → dataLayer).

**M9. Security headers are missing, which is a regression.**
- **Where:** `vercel.json` has no `headers` block. The previous build's `/home/user/isdesignandbuild/vercel.json` sent CSP, `nosniff`, `Referrer-Policy` and `Permissions-Policy`.
- **Evidence:** live HTML responses carry only `strict-transport-security: max-age=63072000`. There is no `X-Content-Type-Options`, `Referrer-Policy`, `frame-ancestors`/`X-Frame-Options` or `Permissions-Policy`, so the enquiry form can be framed by another site.
- **Fix:** add a headers block:
  ```json
  "headers": [{ "source": "/(.*)", "headers": [
    { "key": "X-Content-Type-Options", "value": "nosniff" },
    { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
    { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" },
    { "key": "Content-Security-Policy", "value": "frame-ancestors 'none'; base-uri 'self'; object-src 'none'; form-action 'self'" } ] }]
  ```
  Extend the CSP to `script-src` once GTM's domains are listed.

**M10. Old URLs that still return 404.**
- **Where:** the redirects in `vercel.json`.
- **Evidence:**
  - Two real WordPress articles return 404 on both domains, because isenterprises.net forwards the path unchanged:
    - `/is-a-kitchen-remodel-worth-the-investment-costs-vs-value-in-the-dmv-area/`
    - `/transform-your-spaceremodeling-insights-2/` ("Lead Paint Removal & Abatement – Should I Worry About Lead Paint?")
  - So do 66 archive URLs under `/category/*` and `/author/*`.
- **Fix:** add these redirects:
  ```json
  { "source": "/is-a-kitchen-remodel-worth-the-investment-costs-vs-value-in-the-dmv-area/", "destination": "/blogs/renovations-home-value-comfort-dc/", "permanent": true },
  { "source": "/transform-your-spaceremodeling-insights-2/", "destination": "/lead-paint-abatement/", "permanent": true },
  { "source": "/category/:path*", "destination": "/blogs/", "permanent": true },
  { "source": "/author/:path*", "destination": "/blogs/", "permanent": true }
  ```

**M11. Titles miss the strongest local signal.**
- **Where:** `src/data/content.json`:
  - `:115` "Bathroom Remodeling | I.S Design + Build"
  - `:188` "Whole-Home Renovations | I.S Design + Build"
  - `:318` "Roof Repair & Replacement | I.S Design + Build"
  - `:475` (Service Areas) has no brand suffix.
  - Blog titles run 66–77 characters and get cut off in results.
- **Fix:** for example "Bathroom Remodeling in Washington, DC | I.S Design + Build", "Whole-Home Renovation in DC & Nearby | I.S Design + Build" and "Roof Repair & Replacement in DC | I.S Design + Build". Keep article titles to 60 characters or fewer.

**M12. The terms page describes the old email-only form.**
- **Where:** `src/pages/terms-of-service.astro:6`: "The email-preparation tool does not submit or confirm receipt of an enquiry. You must send the prepared message through your email application."
- **Problem:** the form now posts to `/api/enquiry/` and confirms "Thank you. Your enquiry is with us." (`contact-us.astro:34`).
- **Fix (owner to approve):** "Sending the form delivers your enquiry to us by email. It does not create a contract or confirm an appointment. If the form can't send, it prepares the text for your own email app." Add an effective date.

**M13. Name, address and hours: the local-ranking mechanics (execution angle on reviewer 2's H3).**
- **Where:**
  - `src/data/schema.ts:23` (streetAddress "Suite 300"), `:29-36` (Monday 09:00–17:00), `:38-39` (`hasMap`/`sameAs` is only the Maps link).
  - `src/data/site.ts:11-12`, used by the footer and contact page.
- **Why it matters:** Google cross-checks the site, its markup, the Business Profile and directory listings. The exact same name, address and phone string everywhere matters more than which string is chosen.
- **Fix:** once the owner confirms one canonical version, make `schema.ts`, `site.ts`, the Business Profile, BBB and directories identical. Add `sameAs` for confirmed profiles, plus `geo` and `logo`.

### Low

- **L1. Text over photos and drawings** (`R/photo-contrast.json`; worst 5% and median of background pixels):

  | Text | Size | Worst 5% | Median | Cause |
  |---|---|---|---|---|
  | Phone hero eyebrow | 12 px | 2.45:1 | 11.2:1 | white trace lines run behind it |
  | Band label ("kitchen") | 11 px, 75% white | 3.29:1 | 4.42:1 | photo behind |
  | Service panels, phone (`/home-remodeling/`) | 15 px | 3.43:1 | — | weak gradient |

  The home statement (`home.ts:25-34`) and the About quote start at 12–14% opacity (1.29:1, which Lighthouse flags) and stay faint if the visitor stops scrolling partway. **Fix:** a small scrim or text-shadow behind hero text on phones; the band label at full white; a stronger panel gradient; start the ink effect at 35% or more, or play it once.
- **L2. Small labels.** Section labels and step numbers are 11 px and figcaptions 10 px on phones (`hero.css:27`, `scenes.css` figcaptions). Raise them to 12–13 px.
- **L3. Gallery link names don't match what's on screen** (WCAG 2.5.3, Lighthouse). `index.astro:200` uses `aria-label="View our work: Kitchens"` while the link shows "01 Kitchens". Drop the `aria-label`.
- **L4. The fixed phone bar** (`Footer.astro:12-18`) sits outside any landmark (axe "region" on 19 of the 20 pages scanned at phone width; contact has no bar). Wrap it in `<nav aria-label="Quick contact">`. It also appears only after 480 px of scrolling (`:16`). With the header CTA hidden at ≤ 540 px (`interior.css:141`) and the menu's phone link unreachable (H1), the home page's first phone screen has no way to call.
- **L5. Desktop dropdowns stay open after keyboard focus leaves them** (`Header.astro:31-41`). Close the `<details>` on `focusout`.
- **L6. "What we build" on the home page** (`home.css:354-367`, `index.astro:169`, `index.astro:243-249`):
  - `.ex-list p { opacity: 0 }` also matches the label "Home remodeling & roofing", which GSAP then animates from 0 to 0. The label is invisible on desktop in every mode.
  - With reduced motion or no JavaScript, 4 of the 5 service descriptions never appear and the image never changes, because the switcher lives in the motion-only bundle.
  - **Fix:** scope the rule to `.ex-list li p`, show every description under `html:not(.has-motion)`, and move hover/focus switching out of `home.ts`.
- **L7. Console noise.** "GSAP target not found" warnings on the 7 drawing pages come from empty selections in `plan()` (`scenes.ts:104-135`). Guard them.
- **L8. Short cache lifetimes.** `/media/plans.mp4` (1.0 MB), `/og.jpg`, `/favicon.svg` and the PDF are served `max-age=0, must-revalidate`. Add `Cache-Control` rules for `/media/` and `/wp-content/`.
- **L9. The 83-page, 12.8 MB catalogue PDF is not linearized** (`pdfinfo`: "Optimized: no"). Phones must download all of it before it opens. Downsample its images and linearize it (`qpdf --linearize`), aiming for under 3 MB (`content.json:62-63`).
- **L10. Search and markup polish:**
  - FAQPage markup on 8 pages earns no rich results for this kind of site. Since August 2023 Google shows them only for government and health sites. It is harmless.
  - The business `image` and every page's `og:image` are the stock-render card (`schema.ts:17`, `BaseLayout.astro:27`).
  - Articles use `og:type` "website".
  - The 404 page's canonical points to `/404/`, which returns 404 (`BaseLayout.astro:22`), and `/404.html` returns 200.
  - There is no `/favicon.ico`; live serves the 404 HTML for it.
  - The sitemap has no `lastmod`.
  - The home H1's text reads "Your home.In goodhands." with the words run together (`Hero.astro:46-50`). Add spaces inside the spans.
- **L11. Tablets and landscape phones:**
  - The header CTA is 103×36 px at 768 px and in landscape.
  - On a 1024 px touch tablet the desktop nav targets are 21–26 px tall (they pass WCAG 2.5.8 through spacing, but are under the site's own 44 px rule).
  - At 844×390 the home, portfolio, process and article H1s fall below the first screen, and no call bar appears above 700 px width.
- **L12. Build bloat.** `import.meta.glob(..., { eager: true })` (`[slug].astro:18`) copies every original JPG into `dist`, for example gov-04 at 1.6 MB and bath-06 at 1.3 MB, making `_astro` 32 MB. Visitors never download them, but deploys are slower.

---

## 4. Top 10 fixes in priority order

1. **Make the phone menu work** (H1, M4): `data-lenis-prevent` on the menu, close it on link click, `pageshow` and widening, and set `inert` on the page behind it.
2. **Stop the phone layout shift in the pinned scenes** (H2): fixed-height description panel, opacity instead of height. Re-measure with `R/cls-window.js`; target under 0.1 on the kitchen page.
3. **Measure leads** (H3): standard GTM snippet, `click_to_call`, `email_click`, `start_project_click` and `generate_lead` pushes, and GA4 key events.
4. **Make the legal pages true** (H4, M12): switch off or disclose automatic user-provided data collection, reword the form note, update the terms' email-tool sentence, and add effective dates.
5. **Test on a real iPhone, iPad, Safari and Firefox** (H5), using the checklist in H5. Add WebKit and Firefox to CI.
6. **Fix search reach** (M10, M11, M13): two article redirects and the archive redirects; location in the bathroom, whole-home and roofing titles; brand on Service Areas; name, address and hours aligned with the Business Profile once confirmed.
7. **Accessibility batch** (M1, M2, M3, M5, M6): `aria: 'none'` on SplitText, block links and `overflow: clip` on the home gallery, focusable swipe tracks, `touch-action` on the viewer, and a pause button for the video.
8. **Cut image weight** (M7, L9): 1080/1200w sizes and `quality={55}` (or AVIF) for the town-05, town-12 and town-13 heroes, or replace them with owner photos. Compress and linearize the PDF.
9. **Restore security and cache headers** (M9, L8) in `vercel.json`.
10. **Lighten GTM and fix the small bugs** (M8, L6, L4): load GTM after `load`, fix the invisible "What we build" label and static descriptions, and wrap the phone bar in a landmark (or show it from page load).

---

## 5. Outside my lane

1. The share image and the business image in search markup are the stock kitchen render. Pick a real project photo (content).
2. Service-page H1s and ledes carry no service or location keyword (for example "A kitchen that works for you."). That is a copy decision.
3. After the 318 neighbourhood pages were folded into three, one Service Areas page covers every town. Whether to add Bethesda, Chevy Chase or Arlington pages is a content and positioning call.
4. All four guides are dated 2026-11-07, the migration date, with `dateModified` equal to `datePublished`. Real publication dates are an editorial decision.
