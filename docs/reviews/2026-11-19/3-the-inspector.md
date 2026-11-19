# Review 3 of 3: The inspector

**Lens:** does the site work for every customer, on every device, accessibly and fast, and does it get found by DC homeowners searching? Taste (review 1) and copy and persuasion (review 2) are out of scope here.
**Reviewed:** production https://isdesignandbuild.com/ and the local preview at commit 54085f6. The review ran on 19 Nov 2026, 10:44–11:13 UTC.
**Method:** everything below was measured, not judged by eye. I used Playwright with Chromium 157 and wrote scripts in `SCRATCH/r3tools/`; their output is under `SCRATCH/shots-r3/`. I also used curl against production. WebKit and Firefox are **not installed** in this environment, so I did not install them and did not test those engines (see F9).
SCRATCH = `/tmp/claude-0/-home-user-is-design-and-build-website/b2b559e5-fa92-5fae-aced-91fd3960b686/scratchpad`. Source is cited as `file:line` in `SCRATCH/review-src`.

## 1. Verdict

The site is technically sound. I found no horizontal overflow at any of 8 sizes on 17 pages. The menu, dropdowns, viewer, swipe galleries, FAQs and service preselection all work, the page still reads with JavaScript off, the first phone screen loads fast, and the search basics are clean. The biggest failure comes from a third party: on every phone, the Intercom chat launcher sits on top of the phone bar's main button. On the roofing page that button is **"Call (202) 519-1831"**, so persona C taps the chat bubble instead of the phone number. The firm is also blind: GTM has no triggers for the call, email and start-project events the site pushes, so no lead click reaches Google Analytics, and nobody can tell what search or the site actually produces.

| Score | /10 | Reason |
| --- | --- | --- |
| Works everywhere | **6** | Every interaction passed in Chromium at 320–1920 px and in landscape. However, Intercom covers the primary phone-bar button on every phone and the Send button on the contact form, and Safari and Firefox are untested. |
| Accessible | **7** | The structure is strong: 1 H1 per page, no skipped heading levels, landmarks, a working skip link, a visible 2 px focus ring, labelled fields, reduced motion respected and no-JS rendering. Header text over light hero photos measures 1.9–3.0:1, and small labels on photos measure 2.4–4.4:1. |
| Fast | **7** | On a throttled phone, LCP is 0.8–1.3 s and CLS is 0. Intercom then downloads about 1 MB on every page view and blocks the main thread for 0.5–1.0 s; total TBT is 1.4–2.1 s. |
| Found by DC buyers | **6** | Titles, canonicals, sitemap, robots, schema, matching name/address/phone/hours (NAP), 404 handling and old-URL redirects all work. Six titles carry no DC term, most H1s carry no service or place, old URLs redirect in 2 hops, /about, /contact and /blog return 404, and the sitemap has no lastmod. Lead clicks are not measured. |

**Per persona**
- **A (Capitol Hill, iPhone, then laptop):** finds a well-titled kitchen page that loads in about 1.1 s. On the phone, the right end of the "Start a project" button is under the chat bubble. Safari is the main browser for this persona and is untested here.
- **B (Bethesda, iPad and laptop):** works. On the iPad the chat launcher overlaps the contact form's "Send my project details" button and the budget field when the button sits at the bottom of the screen.
- **C (roof leak, phone, at night):** the most exposed persona. On /roofing/ the launcher covers 20% of the width of the "Call (202) 519-1831" button, which is the only thing this visitor wants to tap. At 13–15 s after landing (about when they are ready to tap), the throttled phone is frozen for 0.66 s while Intercom starts up.
- **D (landlord, lead paint):** the page works. The schema's `knowsAbout` list leaves out lead paint, and the title says "Lead Paint in Older DC Homes", with no "abatement" or "removal" anywhere in the title or H1.

## 2. What works: keep

- **Layout at every size.** I loaded 17 pages × 8 sizes (320×568, 360×740, 390×844, 844×390, 768×1024, 1024×768, 1280×800, 1920×1080) = 136 loads. There was **0 px of horizontal overflow** anywhere. The H1 is fully on the first screen in all 136. Data: `SCRATCH/shots-r3/widths/widths.json`.
- **Phone menu.** It opens, locks the page behind it (`inert` plus `menu-locked`) and scrolls by swipe inside the fixed header, and the last link stays reachable even at 320×568 and 844×390. Escape closes it and returns focus to the Menu button. Screenshots: `SCRATCH/shots-r3/interact/menu2-*`.
- **Desktop dropdowns.** They open with Enter, Escape closes them and returns focus to the summary, opening one closes the others, and clicking outside closes them all.
- **Portfolio viewer.** It is a `<dialog>`: Enter opens it with focus on Close, ArrowRight moves to the next photo, a phone swipe moves to the next photo, Escape returns focus to the photo that opened it, and the buttons are 48×48. Screenshots: `SCRATCH/shots-r3/interact/viewer-*.png`.
- **Galleries.** The rail is native scroll-snap with `tabindex=0` and `role=region`, and a swipe on the phone moved it 344 px.
- **FAQs** are native `<details>`; both tap and Enter toggle them.
- **Contact preselection.** Every one of the 8 `?service=` links found across 15 pages preselects the right option. `?service=roofing` also shows the water-entering question.
- **Semantics, measured on 9 key pages:** exactly one H1, no skipped heading levels, header, main and footer present, labelled nav, no `<img>` without alt, every form field labelled, `lang="en"`, and the honeypot is `aria-hidden` and has `tabindex=-1`. With reduced motion requested there are 0 running animations and GSAP is not loaded. With JavaScript off there are 0 hidden headings or paragraphs on 4 of 5 pages (2 items on /portfolio/).
- **Search hygiene.** Each indexable page has a unique title and description, a self-referencing canonical, a single H1 and an `og.jpg` at 1200×630 (94 KB). Production has no `noindex`, and the 404 page returns 404 with `noindex`. robots.txt points to the sitemap, which lists 23 URLs. The schema (`GeneralContractor`, `BreadcrumbList`, `Service`, `FAQPage`, `BlogPosting`) parses. The name, address, phone, email and Monday–Friday 9–5 hours in the schema match the footer (`src/data/site.ts:12`). `sameAs`/`hasMap` point to the Google Business Profile.
- **Production headers.** HSTS (2 years), nosniff, Referrer-Policy, Permissions-Policy, X-Frame-Options and frame-ancestors are all set. http and www both redirect with 308 to https://isdesignandbuild.com/.
- **The dataLayer pushes are correct** (but see F2). On production, all 10 test clicks pushed the right `click_to_call`, `email_click` or `start_project_click` event with the right `link_location` and `service`, and there were no console errors.

## 3. What doesn't work, ranked by jobs lost

### F1 (P0). The Intercom launcher covers the phone bar's main button and the contact form's Send button
- **What the customer experiences:** on any phone, the round chat bubble sits on the right end of the orange primary button in the fixed bottom bar. On /roofing/ that button is "Call (202) 519-1831". A thumb on the right end of the button opens a chatbot instead of dialling. On /contact-us/, on phone, iPad and landscape phone, the same bubble covers the right end of "Send my project details" whenever the button is at the bottom of the screen.
- **Evidence (production):**

  | Device | Launcher (CSS px) | What it covers |
  | --- | --- | --- |
  | iPhone 13 | 322,596 → 370,644 (z-index 2147483003) | Bar primary 151,606 → 390,664: "Start a project" (kitchen), "Call (202) 519-1831" (roofing, 20% of the button's width) |
  | 320×568 phone | 252,500 → 300,548 | Bar primary 124,510 → 320,568 |
  | iPhone 13 /contact-us/ | same | "Send my project details" and the budget field |
  | iPad Pro 11 /contact-us/ | 766,1126 → 814,1174 | "Send my project details" and the budget field |
  | Landscape 844×390 /contact-us/ | 776,322 → 824,370 | "Send my project details" |

  Screenshots: `SCRATCH/shots-r3/prod/intercom-iphone13-kitchen-remodeling-900.png`, `.../intercom-iphone13-roofing-bar.png`, `.../intercom-se320-*.png`, `.../intercom-ipad-contact-us-submit.png`.
- **Cause:** `src/layouts/BaseLayout.astro:103` sets `intercomSettings` with no offset. The phone bar is fixed to the bottom at z-index 40 (`src/styles/interior.css:124`), and Intercom's default launcher sits 20 px from the bottom-right corner at z-index 2147483003.
- **Fix (can be done now):** in `BaseLayout.astro:103`, raise the launcher above the bar on phones:
  `window.intercomSettings = { api_base: '…', app_id: intercomAppId, vertical_padding: window.matchMedia('(max-width: 900px)').matches ? 84 : 20 };`
  The bar is about 59 px tall plus the safe area, so 84 px clears it. On /contact-us/, either hide the launcher with `hide_default_launcher: true` (the visitor is already in the form) or give the form's last row `padding-right: 72px`. Alternative: hide the default launcher on phones and add "Chat" as a third phone-bar item that calls `Intercom('show')`. **Owner:** the launcher position can also be set in Intercom → Messenger → Style. Whichever is set, it must keep clear of the bar.

### F2 (P0). No lead click reaches Google Analytics: GTM has no triggers for the site's events
- **What the business experiences:** the owner cannot see how many calls, emails or project starts come from the site, from which pages or from search. Any spend on Google Ads or SEO is unmeasurable.
- **Evidence:** after 5 clicks on iPhone 13 and 5 on desktop on production /roofing/, `window.dataLayer` held all 10 events, but the only GA4 hit sent in the following 4 s was `page_view`. The live container `gtm.js?id=GTM-NSZWBWT2` (551 KB, fetched 19 Nov) contains GA4 ID `G-F2YV2LBD5Q` 18 times, and `click_to_call`, `email_click` and `start_project_click` **0 times**.
- **Cause:** the site pushes the events correctly (`BaseLayout.astro:86-95`), but the GTM container has no Custom Event triggers or GA4 event tags for them.
- **Fix: needs the owner, or whoever administers GTM.** In GTM, create three Custom Event triggers (`click_to_call`, `email_click`, `start_project_click`) and a GA4 Event tag for each. Pass `link_location` and `service` as event parameters, publish the container, and mark `click_to_call` and `start_project_click` as key events in GA4. Do the same for `generate_lead` and `inquiry_fallback_shown` (`src/pages/contact-us.astro:87`) once the form is wired. Check the result in GTM Preview.

### F3 (P1). Intercom roughly doubles every page and freezes the phone for 0.5–1 s after landing
- **What the customer experiences:** the page appears fast. About 13–15 s later on a mid-range phone, Intercom's app starts and the page stops responding to taps and scrolls for 0.5–1.0 s. Every visitor downloads about 1 MB, even if they never chat.
- **Evidence:** six pages on production, iPhone 13 emulation, CPU slowed 4x, 1.6 Mbps and 150 ms latency, cold cache. Data: `SCRATCH/shots-r3/perf/perf.json`. Here TBT counts long tasks from first paint to 15 s, so it is stricter than Lighthouse.

  | Page | FCP / LCP | LCP element | CLS | TBT | Total | Intercom | Intercom start-up task |
  | --- | --- | --- | --- | --- | --- | --- | --- |
  | / | 1.10 s | hero text | 0 | 1,560 ms | 1,562 KB | 992 KB | 658 ms at 14.1 s |
  | /kitchen-remodeling/ | 1.14 s | H1 | 0 | 1,361 ms | 1,485 KB | 992 KB | 715 ms at 13.4 s |
  | /roofing/ | 0.83 s | H1 | 0 | 1,693 ms | 1,556 KB | 992 KB | 664 ms at 13.7 s |
  | /portfolio/ | 1.31 s | H1 | 0 | 1,493 ms | 1,891 KB | 992 KB | 509 ms at 15.3 s |
  | /contact-us/ | 1.23 s | H1 | 0 | 1,675 ms | 1,383 KB | 992 KB | 736 ms at 12.8 s |
  | /lead-paint-abatement/ | 1.05 s | H1 | 0 | 2,051 ms | 1,714 KB | 992 KB | 1,002 ms at 14.5 s |

  Intercom fetches 13 scripts, including `session-recorder~app~tooltips.js`. GTM adds 180 KB. Intercom is 53–72% of all bytes. No image was oversized: all loaded images were within 1.5× of their displayed size at DPR 3. The two variable fonts are preloaded.
- **Cause:** `BaseLayout.astro:109-110` loads the widget for every visitor on `load` plus idle, with a 3 s timeout.
- **Fix (can be done now):** load Intercom only when the visitor interacts. Show a small CSS "Chat" button and call the loader on its first tap. Second-best: load it on the first `pointerdown` or `scroll`, or after 20 s, whichever comes first. **Owner:** in Intercom, turn off features that are not needed, such as session recording, product tours and proactive messages. The `rulesets/match` request plus `message.js` suggests a proactive message rule is active.

### F4 (P1). Header and small labels over light photographs fail contrast
- **What the customer experiences:** on the first screen of interior pages with a pale-sky hero, the white logo, "Menu" and the nav links are hard to read in daylight. Older owners, persona B in particular, may not find the menu.
- **Evidence:** I made the text transparent, then measured each text box against the real pixels behind it after the opening animation (`SCRATCH/r3tools/contrast.cjs`, `SCRATCH/shots-r3/contrast/*-live.png`). Crops: `SCRATCH/shots-r3/contrast/crop-desktop-roofing-nav.png`, `crop-phone-about-header.png`.

  | Text | Where | Measured | Needs |
  | --- | --- | --- | --- |
  | Nav "Our work", "Planning", "About" (15 px) | Desktop /roofing/, /faqs/, /portfolio/, /reviews/, /kitchen-remodeling/ | 1.95–2.9:1 | 4.5 |
  | Logo "I.S Design + Build" and "Menu" (13–16 px) | Phone /about-us/, /roofing/, /reviews/, /portfolio/ | 2.05–2.9:1 | 4.5 |
  | `.ph-status` "Our project" / "Stock image" (11 px, orange) | Desktop page heroes | 2.4–2.95:1 | 4.5 |
  | Band labels "Scope first", "Any size", "Your priorities", "In-house" (12 px) | Desktop kitchen, bathroom, whole-home, about | 3.1–4.4:1 | 4.5 |
  | Floor-plan drawing labels and "01"–"05" section numbers | Home | 1.1–2.0:1 | Drawing labels are part of the picture (exempt); the section numbers fail |

- **Cause:** the header is transparent over `.page-hero` and gets its dark backing only after 24 px of scroll (`src/components/Header.astro:60`, `src/styles/interior.css:295`). Nav links are at `opacity: 0.8` (`src/styles/home.css:84`). `.ph-status` uses `--signal` #ff5418 on a translucent box (`src/styles/scenes.css:50`). Band labels use `#ffffffbf` over a photo (`src/styles/scenes.css:142`).
- **Fix (can be done now):** add a top scrim to page heroes, e.g. `.page-hero::before { content: ''; position: absolute; inset: 0 0 auto; height: 180px; background: linear-gradient(#0c0c0cb3, #0c0c0c00); z-index: 1; pointer-events: none; }`, and set `.hd nav a { opacity: 1 }`. Make `.ph-status` `#ff8a5c` or give its box an opaque `#0c0c0c` backing. Make `.bnd .cg-label` `#fff` and add `text-shadow: 0 1px 8px #000a`. Raise the home section numbers to at least `#ffffffb3` on dark.

### F5 (P1). Local search: key H1s and six titles do not say what or where
- **What happens:** Google weights the title and H1 when matching a search such as "kitchen remodeling Capitol Hill DC". The titles of the service pages are good: "Kitchen Remodeling in DC & Nearby", "Roof Repair & Replacement in DC". The rest are weak:
  - **Titles with no DC term:** "Our Story", "Client Reviews", "Our Work: Kitchens, Bathrooms & More", "Start Your Project", "Our Remodeling Process", "Remodeling & Roofing Questions".
  - **H1s with no service or place:** "Your home. In good hands.", "Bathrooms that use every inch.", "The whole house, planned as one.", "More room for the life you have.", "Rooms we've built.", "Know what comes next.".
  - **Lead-paint wording:** the page's title and H1 never use "abatement" or "removal", which are the words a landlord types (persona D).
  - **Long description:** the About page description is 173 characters, so it is truncated in results.
  - **Blog titles:** the 4 blog posts have no brand suffix.
  - **Schema gaps:** `knowsAbout` omits lead paint, and there is no `logo` and no `geo`.
- **Evidence:** `SCRATCH/r3tools/seo.py` run over every production page; output in `SCRATCH/r3tools/html/`.
- **Cause:** per-page `title`/`description` props in `src/pages/*.astro` and `src/data/content.json`. Schema: `src/data/schema.ts`.
- **Fix (can be done now):**
  - Titles, e.g. "About I.S Design + Build | DC Remodeler Since 1989", "Remodeling Reviews from DC Homeowners | I.S Design + Build", "Kitchen & Bath Remodeling Projects in DC | …", "Contact a DC Remodeling Contractor | …", "Lead Paint Abatement for Older DC Homes | …".
  - Add a visually small service-and-place line inside each service H1, e.g. `<h1><span class="eyebrow">Bathroom remodeling in Washington, DC</span> Bathrooms that use every inch.</h1>`. For the home H1 the owner must approve this (the headline was owner-approved). Suggested: move "Washington, DC area · Since 1989" into the H1 as a span.
  - Trim the About description to 155 characters or fewer.
  - Add "Lead paint abatement", `logo` and `geo` (Georgetown office) to the schema.
  - **Needs the owner:** confirm the lead-paint certification before using the word "abatement" in claims (brief, owner-unconfirmed).

### F6 (P2). Old URLs redirect in two hops, and common guesses return 404
- **Evidence:**
  - `curl -L` on production: `/kitchen-remodeling-georgetown-dc`, `/roof-repair-georgetown-dc`, `/services` and `/is-a-kitchen-remodel-worth-…` each go through 2 × 308 (first to add a trailing slash, then to the target).
  - `/about`, `/contact`, `/blog` and `/kitchen-remodeling-dc` end in **404**.
  - `/wp-content/uploads/x.jpg` returns 403.
  - Log: `SCRATCH/r3tools/prod-curl.txt`.
- **Cause:** `trailingSlash: true` (`vercel.json:4`) runs before the custom redirects, so the slash-less sources in `vercel.json` never match. There are no rules for the common short paths.
- **Fix (can be done now):** add redirects for `/about/` → `/about-us/`, `/contact/` → `/contact-us/` and `/blog/` → `/blogs/`. Accept the 2-hop chains (Google follows them), or remove the slash-less duplicate rules, which never fire. **Needs the owner:** check Search Console's "Not found" report for old WordPress URLs not yet covered.

### F7 (P2). The sitemap has no lastmod
- **Evidence:** `sitemap-0.xml` lists 23 URLs and no `<lastmod>`.
- **Cause:** `astro.config.mjs:9` calls `sitemap()` with no options.
- **Fix (can be done now):** `sitemap({ lastmod: new Date() })`, or serialize per-page dates. Then submit the sitemap in Search Console (**owner**).

### F8 (P2). On small phones some pages have no action on the first screen
- **Evidence:** at 320×568, /kitchen-remodeling/, /lead-paint-abatement/, /about-us/ and /home-remodeling/ show the H1 but no visible button or call link. /blogs/ shows none at 320, 360 or 390 wide. Screenshots: `SCRATCH/shots-r3/widths/w-320x568-*.png`.
- **Cause:** the header CTA is hidden at 540 px and below (`src/styles/interior.css:141`), and the phone bar appears only after 480 px of scroll (`src/components/Footer.astro:25`).
- **Fix (can be done now):** show the bar after 120 px of scroll, or from the start on interior pages. Apply F1's launcher offset at the same time.

### F9 (P2). Safari and Firefox untested, and the desktop chat launcher never appeared
- WebKit and Firefox could not launch here (`Executable doesn't exist at /opt/pw-browsers/webkit-2359`). Persona A browses in iPhone Safari. Before sign-off, check these by hand on a real iPhone (iOS 16.4+) and in Firefox:
  - The phone menu: a fixed header with `height: 100dvh; overflow-y: auto`, at `interior.css:102`.
  - `inert` on main.
  - The `<dialog>` viewer and its swipe.
  - The scroll-snap rail.
  - The `<details>` dropdowns.
  - `backdrop-filter` on the veiled header.
  - The Intercom offset from F1.
- At 1440×900, Chromium never rendered the Intercom launcher within 25 s on two pages, while phone and tablet always did (`SCRATCH/shots-r3/prod/intercom-desktop-*.png`). **Owner:** confirm in Intercom whether hiding it on desktop is intended.

### Minor (P2)
- **Phone-menu focus:** after the last link of the open phone menu, Tab moves to the phone bar and then wraps to the skip link. That is acceptable, but a focus loop inside the menu would be tidier (`Header.astro:46-50`).
- **Skip link:** the target `<main id="main">` has no `tabindex="-1"`, so focus reports BODY after "Skip to content". The next Tab still lands inside main in Chromium; add `tabindex="-1"` so older Safari versions behave the same.
- **Contact radio buttons:** 18×18 px inputs inside larger labels, so they pass via the label.
- **HSTS:** `max-age=63072000` without `includeSubDomains; preload`. This **needs the owner**, because it affects every subdomain.

## 4. Fix list

| ID | Priority | What to change | Where | Done now / owner |
| --- | --- | --- | --- | --- |
| F1 | P0 | Lift the Intercom launcher above the phone bar (`vertical_padding: 84` at 900 px and below); hide it, or pad the form's last row, on /contact-us/ | `src/layouts/BaseLayout.astro:103`; Intercom Messenger → Style | **Now**; owner to keep the Intercom setting in step |
| F2 | P0 | Add GTM Custom Event triggers and GA4 event tags for `click_to_call`, `email_click` and `start_project_click`; mark them as key events | GTM container GTM-NSZWBWT2, GA4 G-F2YV2LBD5Q | **Needs the owner** (GTM/GA4 access) |
| F3 | P1 | Load Intercom on interaction (facade "Chat" button), or on first scroll/tap, or after 20 s; turn off session recording and proactive messages if unused | `BaseLayout.astro:104-111`; Intercom settings | **Now** (code) + **owner** (settings) |
| F4a | P1 | Top scrim on page heroes; nav links at opacity 1 | `src/styles/interior.css:295` area; `src/styles/home.css:84` | **Now** |
| F4b | P1 | `.ph-status` to #ff8a5c or opaque backing; `.bnd .cg-label` to #fff plus text-shadow; home section numbers at least #ffffffb3 | `src/styles/scenes.css:50`, `:142` | **Now** |
| F5a | P1 | Add DC and service terms to the six weak titles; trim the About description to 155 characters or fewer | `src/pages/*.astro`, `src/data/content.json` | **Now** |
| F5b | P1 | Put a service-and-place span inside the service-page H1s; home H1 only with approval | Page hero components (`src/components/Hero.astro`, `[slug].astro`) | **Now**; home H1 **needs owner approval** |
| F5c | P2 | Add lead paint to schema `knowsAbout`; add `logo` and `geo` | `src/data/schema.ts` | **Now**; "abatement" in claims **needs the owner** (certification) |
| F6 | P2 | Redirect /about, /contact and /blog; drop the dead slash-less rules | `vercel.json` | **Now**; owner to check Search Console 404s |
| F7 | P2 | Sitemap `lastmod`; submit it in Search Console | `astro.config.mjs:9` | **Now** + **owner** |
| F8 | P2 | Show the phone bar earlier (120 px) on interior pages | `src/components/Footer.astro:25` | **Now** (after F1) |
| F9 | P2 | Real iPhone Safari and Firefox pass over the menu, viewer, rail and dropdowns; confirm desktop launcher visibility | Manual test; Intercom settings | **Owner** / QA |
| F10 | P2 | `tabindex="-1"` on `<main id="main">`; optional focus loop in the phone menu | `src/layouts/InteriorLayout.astro:41`, `src/pages/index.astro:87`, `Header.astro:46` | **Now** |
| F11 | P2 | HSTS `includeSubDomains; preload` once every subdomain serves HTTPS | `vercel.json` headers | **Needs the owner** (DNS/subdomains) |

## Appendix: how to reproduce

| Check | Command (from `SCRATCH/r3tools`) | Output |
| --- | --- | --- |
| Widths and first screen | `node widths.cjs http://127.0.0.1:4321 SCRATCH/shots-r3/widths` | `widths.json`, `w-*.png` |
| Menu, dropdowns, FAQ, preselection, viewer, rail, no-JS, reduced motion | `node interact.cjs …` and `node interact2.cjs …` | `interact.log`, `interact2.log`, `shots-r3/interact/` |
| Contrast against real pixels | `SRC=SCRATCH/review-src node contrast.cjs <base> <out> live\|reduce` | `contrast-*.log`, `shots-r3/contrast/` |
| Production: Intercom overlap and dataLayer | `node prod.cjs SCRATCH/shots-r3/prod`, `node roof.cjs …` | `prod.log`, `shots-r3/prod/` |
| Production: throttled performance | `node perf.cjs SCRATCH/shots-r3/perf` | `perf.log`, `perf.json` |
| Production: SEO tags, headers, redirects | `python3 -I seo.py html`, `prod-curl.txt` | in `r3tools/` |
| GTM container contents | `curl gtm.js?id=GTM-NSZWBWT2` then grep for the event names | `r3tools/gtm.js` |
