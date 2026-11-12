# Approved content preview

Implemented from the [website copy and implementation report](https://app.openseo.so/p/0f4022c5-06d4-4b29-9d1c-133e543d0d2b/reports/e6978f4f-380a-4570-a357-e9a39d13f25c), with the latest owner decisions overriding older business-context notes.

## Public content and design

- Thirteen core routes: home, remodeling overview, kitchens, bathrooms, whole-home renovations, additions, roofing, story, process, service areas, portfolio, FAQs and contact.
- The current Direction G design is the base. The kitchen trace geometry, photo reveal, scroll-driven floor plan, service-image transitions, horizontal gallery, video reveal and counter/reveal animations remain. The floor-plan stamp now says “Scope + planning,” not an invented permit approval.
- New pages reuse Geist, the monochrome palette, orange accent, measured whitespace, grid and fine rules. Desktop disclosure navigation, mobile navigation, Escape handling and a skip link provide access to actual routes.
- Hero and process stock images are identified as design references. Portfolio images use existing company photography from `src/assets/photos/`, originally imported as company project photography in commit `7e130ab`. The previous repository’s `src/portfolio.mjs` and `docs/business-context.md` also distinguish original photography from stock. No invented project narratives, full private addresses, budgets, dates or before/after pairings were added. Individual project names and exact image-to-project assignments remain for owner review.
- Review excerpts are the attributed Google excerpts in the approved report. A dated rating/count is not presented as current. Current titles for Italo Rodriguez and Eddie Migues are not claimed.

## Contact and future integration

The new Astro source has no verified enquiry backend. The contact form therefore **prepares an email**. It does not submit a lead, save a record, book an appointment or claim receipt. Visitors review the generated text and choose to open their email app or copy the text. Phone and direct email links remain available, including without JavaScript. Changing fields hides a stale prepared draft.

No Grok service, Google Sheet, operational agent, upload storage, calendar or notification queue has been connected. There is no public chat launcher. Those integrations require server-side credentials, an owner/monitored handoff, agreed permissions, storage/retention rules and actual success/failure tests. The privacy and website notices describe the current limited behavior; review them when that behavior changes.

## Indexing and migration

- Canonicals and the sitemap use `https://isdesignandbuild.com/` and retain the approved established paths.
- Builds default to `noindex, nofollow` and `robots.txt: Disallow: /`. Only `VERCEL_ENV=production` enables public indexing. Vercel supplies this system environment variable. For another host, set it deliberately only for the intended public production build.
- Design experiments remain at `/concepts/`, marked noindex and excluded from the sitemap.
- Existing routes in this Astro branch were retained. The static robots file is replaced by a build-time environment-aware endpoint.
- **This preview is not a complete migration of the separate live website.** Before a production switch, inventory its legacy neighborhood pages, planning guides, cabinet PDF, financing and lead-abatement content. Decide each URL individually; reconcile `/kitchen-remodeling-washington-dc/` with the core kitchen page. Do not use blanket homepage redirects. No DNS, production domain or old-domain redirect changes are part of this implementation.

## Verification

- `npm run check`: no errors, warnings or hints.
- Static build succeeds; all public routes have one H1 and their local links resolve.
- Production-mode build checked separately: public pages have no inherited preview noindex; production robots allows public pages. Preview build restored afterward.
- Local Chromium checks cover desktop/mobile hero fit, navigation, roofing preselection, phone/email enquiry preparation, stale-draft invalidation, reduced motion, no-JavaScript direct contact and console errors. No email is sent by these checks.
- Visual review compares the existing Direction G hero with the revised hero and checks service, contact, gallery and process layouts. These checks do not establish field Core Web Vitals or backend delivery.
