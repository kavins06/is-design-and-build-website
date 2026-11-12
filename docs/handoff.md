# Handoff: design review fixes

Written 2026-11-12. This is where the work stands after a design review of the built site against [the site standard](site-standard.md). Read the standard first. Every change is judged against it.

## State of the repo

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
