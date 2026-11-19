# Handoff: design review fixes

Written 2026-11-12. This is where the work stands after a design review of the built site against [the site standard](site-standard.md). Read the standard first. Every change is judged against it.

## Update, 2026-11-19: second three-reviewer audit and fixes

Three sequential reviewers with separate lenses (the eye, the buyer, the inspector) found the site honest and well built, but hiding its own work, answering few of a buyer's objections and letting the chat bubble cover the phone's main buttons. See [the review note](review-2026-11-19.md) for what worked, what didn't, everything changed and the owner's list; the reports are in [docs/reviews/2026-11-19/](reviews/2026-11-19/).

Points for whoever works on the site next:
- **Page tops.** Words sit in a left column on a scrim (`.ph-shade` in `src/styles/scenes.css`, `.cg-hero-shade` in `src/styles/hero.css`); phones held upright put the photo on top and the words below. After changing a scrim or a page-top photo, re-measure text contrast against the real pixels (every headline, lede, header link and label passed AA on 19 Nov).
- **Home opening.** `--t-built` in `src/styles/hero.css` sets it (1.3s now; the owner's original was 3.4s).
- **Photos.** One page-top or band role per photograph on the main pages; galleries and the portfolio may repeat. The portfolio's lead and groups live in `portfolio` in `src/data/photos.ts`. Run `scripts/trace-photos.py` after changing a page-top photograph.
- **Chat.** Intercom loads only when a visitor taps a `[data-chat]` button (`src/layouts/BaseLayout.astro`, and the icon in the phone bar in `src/components/Footer.astro`); its own launcher is hidden. Keep any new chat entry point clear of the phone bar.
- **H1s.** Interior pages take an optional `kicker` (service and place) in `src/data/content.json`, shown above the headline inside the H1.
- **Lead paint.** The page says "lead-safe" until the owner confirms the abatement certification; then the title, H1 and the home card can say "abatement".

## Update, 2026-11-15 (evening): three-reviewer audit and fixes

An in-depth adversarial review by three reviewers, run one after another with separate lenses (desire and clarity, evidence and positioning, execution and reach), found the site impressive at first glance but not convincing enough to hire from. See [the review note](review-2026-11-15.md) for what worked, what didn't, everything changed in this release and the owner's to-do list. The full reports are in [docs/reviews/2026-11-15/](reviews/2026-11-15/).

Points for whoever works on the site next:
- **Photos.** `src/assets/photos/` now holds 24 company photographs, 12 of them added from the old isenterprises.net archive (the `kavins06/isdesignandbuild` repo). Only `stock/town-05` remains, labelled "Stock image" on the lead-paint page.
- **Line drawings.** The home hero's drawing of `kitchen-a` is hand-traced in `src/components/Hero.astro`. Run `scripts/trace-photos.py` after changing any other page-top photo.
- **Reviews.** Excerpts live in `src/data/reviews.ts`, verbatim from the Google Business Profile, checked on 2026-11-15. Keep the rating and count in step with the profile.
- **Credentials.** `credentials` in `src/data/site.ts` stays `null` until the owner confirms licences and insurance; nothing shows while it is null.
- **Analytics.** The site pushes `click_to_call`, `email_click`, `start_project_click`, `generate_lead` and `inquiry_fallback_shown`. GA4 event tags for them still need adding in Tag Manager.

## Update, 2026-11-15: open to search engines

`launched` in `src/data/site.ts` is now `true` at the owner's request. Production pages no longer carry `noindex`, and production `robots.txt` allows crawling and lists the sitemap. Preview deployments stay `noindex` with `Disallow: /`.

## Update, 2026-11-15 (later): interior pages animated like the home page

On branch `claude/zen-rubin-knws7s`. The owner asked for the home page's "wow" on every page, with fewer words on screen and the SEO kept under the hood.

What every interior page now does:
- **Page top, drafted then built.** A line drawing traced from the page's own photograph draws itself on the dark grid, then the photograph wipes up under it, as on the home hero. The headline rises word by word. A title block (drawing, sheet, and "Our project" or "Design reference") sits top right on wide screens. The traces come from `scripts/trace-photos.py` (OpenCV line detection plus hand-placed ellipses for the bathroom mirrors) and live in `src/data/traces.json`. A page whose photograph has no trace simply opens without the drawing.
- **Service points as a pinned drawing.** Kitchen, bathroom, whole-home, additions, roofing, service areas and lead paint each have their own illustrative drawing in `src/data/drawings.ts` (kitchen plan, bathroom plan, house section, site plan, house elevation, area map, rowhouse facade). As each point becomes active its part of the drawing is drawn and shown in orange, and only that point's description is open. Selected by `"drawing"` on the points section in `content.json`; financing keeps the plain numbered cards.
- **First photo-and-statement section** opens from a framed inset to full bleed (`Band`). Later ones sit beside their text and open from a band across the middle.
- **Galleries** are the home page's sideways rail on desktop and a swipe gallery on phones, using more of the company photographs (`src/data/photos.ts`).
- **Showpieces:** process steps as a sideways run of drawing sheets ending on a finished kitchen (stacked cards on phones); About's "since 1989" as a dimension line drawn to today while the year counts up; remodeling services as panels that open under the pointer; the portfolio as three columns moving at different speeds with a full-screen viewer (arrow keys, swipe, Escape); guides as a big-type list with the photograph riding beside it; a reading line on articles; an orange underline and a drawn check mark on the contact form.
- **Everywhere:** smooth scrolling, headings revealed line by line, the closing question rising, a large footer wordmark, smooth opening questions, and a sheet-over-sheet transition between pages (cross-document view transitions; browsers without support navigate normally).

Words: split texts were shortened (kitchen, bathroom, whole-home, additions, roofing, about, financing). Point descriptions show one at a time. Nothing else in the copy changed.

SEO: a comparison of the old and new builds shows identical titles, descriptions, canonicals, robots, H1 text, structured data, internal links and FAQ text on all 22 pages and the 404. The galleries show more photographs, some with rewritten, more precise alt text, and the portfolio links to its large images.

Checked: `npm run check` (0 errors, 0 warnings, 0 hints) and `npm run build` (23 pages). Every page screenshotted at 1440×900 and as an iPhone 13; no console errors, one H1, alt on every image, no sideways scroll, no phone tap target under 44px (the contact radios sit in 44px labels). With reduced motion or without JavaScript every heading, paragraph, photograph and drawing is visible and complete; the animation bundle (about 54 KB gzipped) is not loaded for reduced motion. Chromium only; Safari and Firefox still to check on real devices.

Not done: the stock page-top photographs (roofing, about, process, service areas, lead paint) still need owner photographs (O2); when one is replaced, run `scripts/trace-photos.py` again.

## Update, 2026-11-15: review fixes implemented

On branch `claude/magical-shannon-k616b0`. `npm run check` and `npm run build` (23 pages) pass. Re-running the review's checks finds no tap targets under 44px on a phone, no sideways scroll, no console errors, one H1 and alt text on every page.

Decisions the user made: D1 cut the form to five required fields and make timing and budget optional; D2 leave the hero timing as it is; D3 swap in company photos where one fits; D4 commit and push to the working branch, with no PR; D5 reuse an existing review.

Done:
- **1. Contact page.** It opens on a darkened company photo (compact top). "Send enquiry" is the orange primary button, and Call and email are text links. Beside the form (below it on a phone) sit "1989", Lia Dean's Google review excerpt and the office details. The form asks for project type, town, description, name and email or phone, with timing and budget under "More details (optional)". ZIP is gone from the form, the email-app fallback and `api/enquiry.js`.
- **2. Proof strip.** Set at 17–22px. On a phone it is a 2 × 2 grid reading "Google reviews", so no item is stranded.
- **3. Tap targets and small text.** All phone targets are at least 44px. The header logo and menu button use negative margins so the header keeps its size. The hero tagline, breadcrumbs, closing contact labels, stock label and swipe hint are now 12px.
- **4. Contrast.** Inactive process steps are at 0.5 opacity. Inactive service titles are `#76766f`. Over a photograph the breadcrumb now sits on a dark label: it measured below 1:1 on bright rooms and now measures at least 4.9:1. Page-top photos are also shaded a little more.
- **5. Polish.** "Start a project" wording; 24px below the hero headline; the hero's `3'-0"` dimension moved to the island's right-hand end, clear of the headline; process step descriptions sit under their headings at 17–22px; the floor plan opens on the drawn sketch.
- **6. Stock.** Company photos now on the home service images (kitchen, bath, whole-home, additions), the floor-plan photo, the "Everyday details" gallery slot, the whole-home service tile, and the tops of home remodeling, whole-home, additions (deck photo in its split) and FAQs. The "Design reference" label now shows only while the image on screen is stock: the roofing image on the home page (on desktop and on its phone tile) and the hero.

Still stock (no company photo fits): the hero (`kit-08`, which its line drawing traces), roofing, about, process, service areas and lead paint. These are streets, drawings and craft shots rather than finished rooms. They need O2.

New, not fixed: the terms page says "The email-preparation tool does not submit or confirm receipt of an enquiry". That is out of date now that the form sends enquiries. It is legal text, so the owner should approve new wording. O1 to O4 below are unchanged and still need the owner.

## State of the repo (as of 2026-11-12)

- Branch `claude/determined-bohr-w5zhsh`, level with `main` at merge 9f069fd (PR #6) plus this document. No code changes are in progress.
- `npm ci`, `npm run check` (0 errors, 0 warnings, 1 hint) and `npm run build` (23 pages) all pass on Node 22.
- Nothing from the review below has been implemented yet.

## How the review was done

1. `npm run build`, then `npx astro preview --port 4321`.
2. A Playwright script opened `/`, `/kitchen-remodeling/`, `/portfolio/`, `/our-process/`, `/contact-us/`, `/faqs/` and `/blogs/` at 1440×900 and as an iPhone 13. It took a screenshot at every screen height while scrolling, and recorded tap targets under 44px, text under 13px, missing alt text, sideways overflow and console errors.
3. Contrast was computed from the browser's computed colours.

The home page animates. Screenshots taken in the first two seconds, or mid-scroll, show half-finished states: a missing "hands.", the stats counters part-way through counting, and empty gallery frames. Wait about 6 seconds before judging the hero.

Clean results: every image has alt text, every page has one H1, there are no console errors and nothing scrolls sideways on a phone. The orange buttons pass contrast (near-black on `#ff5418` is about 6:1).

## Findings, by priority

### 1. Contact page: the conversion page is the weakest page

File: `src/pages/contact-us.astro`.

- "Send enquiry" (line 24) is a black button. The orange button at the top of the page is "Call", in the intro slot (line 6). Make "Send enquiry" the orange primary button. Make Call a text link or a secondary button.
- The page opens on plain black with no photograph, which breaks standard rule "Show, then say" 1. Use a company photo from `src/assets/photos/`, darkened like the other page tops.
- There is no proof next to the form. Add one attributed Google review excerpt (reuse an existing one; do not write new ones) and "Building since 1989" (from `site.since` in `src/data/site.ts`).
- The form has 9 fields, yet the page says "A few details is all we need". `api/enquiry.js` requires service, town, brief, name and a valid email or phone (line 22). See decision D1.

### 2. Proof is set as small print

- The home proof strip (`src/pages/index.astro:92`, styled `.proof-line` in `src/styles/content.css:22`, 12px on phones) holds "Building since 1989 · One in-house team · Our story · Read our Google reviews". On a phone it wraps, and "Read our Google reviews" ends up alone at the top of the next screen. Give it real size, or merge it into the stats section further down the page.

### 3. Phone tap targets and small text (standard: 44px minimum, WCAG 2.1 AA)

- Under 44px on a phone: the header "Menu +" button (49×36, `.menu-toggle` in `src/styles/content.css:92`), the logo link (24px tall), "Our story" (51×40), "Read our Google reviews" (40px tall), the footer Privacy and Terms links (40px), and the contact form radio buttons (18×18; make the whole label row 44px tall).
- Small text: the phone hero tagline is 10px (`.hero-eyebrow`). Breadcrumbs and the contact labels in the closing section (Call, Email, Where we work) are 11px. Raise the functional ones to at least 12–13px. The 9px labels on the hero drawing are decoration and can stay.

### 4. Contrast failure

- In the home process list, the steps that aren't the current one are white at `opacity: 0.32` on black (`src/styles/home.css:149`). That works out to about 2.8:1, below 3:1 even for large text. Use about 0.5.
- The service titles that aren't the current one (`#8a8a84` on white, about 3.5:1) pass only because they are large. Leave them, or darken slightly.

### 5. Consistency and polish

- "Start a Project" (`src/components/Header.astro:17`, `src/components/Footer.astro:8`) should read "Start a project", the wording used everywhere else.
- Hero: "hands." nearly touches the paragraph below it, and on desktop the drawing's "3'-0"" label runs into it. Add about 24px below the headline (`src/styles/hero.css`, `src/components/Hero.astro`).
- `/our-process/`: each step's description is 13px grey, far to the right of a large heading. Put it under the heading at a readable size.
- The home floor-plan animation (`src/pages/index.astro` with `src/scripts/home.ts`) first shows an empty black box. Start on the first drawn state.
- Hero timing: about 1.2s after load the hero still reads "Your home. In good", over the line drawing on black. See decision D2.

### 6. Stock images labelled "Design reference"

- Stock is still used for the home hero (`src/components/Hero.astro:3`, `kit-08`), the home service images (`src/pages/index.astro:15-24`), whole-home and roofing (`src/pages/[slug].astro:28`), and most page tops (`"image": "stock/..."` in `src/data/content.json`).
- The standard says no stock labels may be left visible. The terms page promises that design references are identified as such. So do not remove the label while the image is still stock. Replace the image with a company photo, and then remove the label.
- The hero's line drawing traces the exact `kit-08` kitchen. Replacing that photo means redrawing the trace. See decision D3.
- The same 6–8 company photos repeat across the home gallery, the kitchen page and the portfolio. Fixing that needs owner photos (O2).

## Decisions still open

Each has a recommendation. The user had not answered these when this was written, so confirm with them before acting.

- **D1. Contact form fields.** Recommended: keep the five the server requires (project type, town, description, name, email or phone). Make timing and budget optional under "More details". Drop ZIP. If fields change, keep `api/enquiry.js` and the email-app fallback in `contact-us.astro` in step.
- **D2. Hero timing.** Recommended: show the whole headline at once and animate only the drawing. The owner likes the current opening, so get approval.
- **D3. Stock photos.** Recommended: swap in company photos wherever one fits (kitchen, bathroom, exterior). Leave the hero as it is until a strong owner kitchen photo exists.
- **D4. Git.** Recommended: commit and push to the working branch, and open a PR only when asked.
- **D5. Contact page review.** Recommended: reuse an existing attributed Google excerpt.

## Needed from the owner (blocks part of the work)

- **O1. Enquiry delivery. This is the most important item: the standard requires the form to actually deliver.** Needs `RESEND_API_KEY` set in Vercel, `isdesignandbuild.com` verified as a sending domain in Resend, and the inbox that should receive enquiries (`ENQUIRY_TO`, default `info@isdesignandbuild.com`). Nobody has confirmed whether the key is already set. Without it the form only opens the visitor's own email app.
- **O2. Project photographs.** 15–20 of them, with permission to publish, prioritising the hero, whole-home, roofing, additions, and the story, process and service-area pages.
- **O3. Project names or neighbourhoods** for the portfolio captions. Do not invent them.
- **O4. Optional proof.** Licence and insurance details, lead-paint certification, and confirmation that office hours are Monday to Friday (`docs/site-standard.md`, "Still needed from the owner").

## Can be done now without any answers

Items 2, 3, 4 and 5 in full, except the hero timing (D2). Item 1 in full, except the field cut (D1). Re-run the checks above, plus `npm run check` and `npm run build`, after each change.
