# Review 1 of 3: The eye (what a homeowner sees and feels)

19 November 2026. Commit 54085f6, served at http://127.0.0.1:4321/. Source cited from `SCRATCH/review-src/`.
SCRATCH = `/tmp/claude-0/-home-user-is-design-and-build-website/b2b559e5-fa92-5fae-aced-91fd3960b686/scratchpad`.
New evidence is in `SCRATCH/shots-r1/`: competitor first screens (`competitors/`, `compare-first-screen-desktop.png`, `compare-first-screen-phone.png`), a sheet of the whole photo library (`photo-library.png`) and iPad captures (`ipad/`). The brightness script is `SCRATCH/r1tools/bright.cjs`. Run it again after the fixes to check them.

## 1. Verdict

The company's own photographs are bright, airy, professionally shot rooms, and the site's typography is crafted and consistent. But the site hides those photographs. Every page-top photo is shown at about half its real brightness, words cover it on a phone, and the work only appears after screens of black line drawings. Next to BOWA, Case and Anthony Wilder, which open on a warm, fully lit room, this site looks dark, technical and smaller than it is. On the pages a family planning an addition, a roof job or lead-paint work would read, it barely shows any work at all.

| Score (out of 10) | | Why |
| --- | --- | --- |
| Impressed on desktop | **6** | Confident layout and type. Photos are dimmed to 46–66 % of the original. Galleries on screen 5 or later. Portfolio looks like a thumbnail grid. |
| Impressed on a phone | **5** | The home hero on a phone shows pendant lamps and ceiling, not a kitchen. Page tops at 40–52 % brightness. Bands crop to a cooker hood. The last 24–40 % of each page is black. |
| Overall | **5** | The parts that look good (the galleries) are buried, and what a visitor sees first is the weakest view of the work. |
| Can picture them in my home | **4** | Rooms are new-build white interiors from two or three projects. No additions, no roofs being worked on, no lead work and no people. Also no rowhouse or period character. |

| Persona | Impressed | Picture them in my home | Why |
| --- | --- | --- | --- |
| A. Capitol Hill rowhouse, kitchen + 2 baths, iPhone then laptop | 6 | 5 | Kitchens and baths are the library's strength, and the desktop galleries sell them. On the iPhone the hero is a dark ceiling and the kitchen band is a cooker hood. No rowhouse character anywhere (needs the owner). |
| B. Chevy Chase/Bethesda, addition or whole home, $300k+, iPad/laptop | 4 | 3 | The additions page leads with the shadowy space under a deck (`shots-r1/ipad/home-additions/00.png`) and shows one other photo, a bedroom. Whole-home leads with a bedroom. The portfolio is small same-size thumbnails. Next to BOWA/Case/Wilder it reads as a smaller firm. |
| C. NE DC roof leak, phone at night | 5 | 4 | The orange call button is unmissable. The photos show a roof terrace with an AC unit and a lounge with sofas, so no roof work. The middle of the page is a cartoon house drawing. |
| D. Pre-1978 rental landlord / small commercial | 4 | 3 | One labelled stock street photo, then drawings. There are no photos below the page top. Nothing shows containment, crews or finished abatement (needs the owner). |

## 2. What works: keep

- **The photographs themselves.** All 24 are real, sharp and bright, and the kitchens and bathrooms are attractive (`shots-r1/photo-library.png`). Shown unshaded they hold up next to the competitors.
- **The desktop gallery rails** ("Kitchens we've built" and the bathroom rail) are the best-looking screens on the site (`shots/desktop/kitchen-remodeling/05.png`, `06.png`; `shots/desktop/bathroom-remodeling/05.png`).
- **One consistent visual system.** It uses one typeface family, tight confident headings and consistent spacing. Every page feels like the same firm.
- **Interior page openings are brisk.** The drawing is done and the room fully built by 2.55 s, and the drawing then fades to nothing (`scenes.css:30-35`). This is the model the home page should follow.
- **Honest labelling.** The lead-paint stock photo says "Stock image", and the company photos say "Our project". Keep both.
- **The idea of drawn-then-built.** No DC competitor does it. It is distinctive and fits a design-build firm. Its timing and what it leaves behind are the problem (F3), not the idea.

## 3. What doesn't work, ranked by jobs lost

### F1. Every page-top photo is shown at about half its real brightness (P0, can be done now)
**What the customer sees:** a dim, moody room behind heavy black gradients. On the home page, white construction lines also stay over the kitchen for good. The rooms were photographed bright and white, and the site turns them grey. Competitors' first screens are 45–90 % brighter.
**Evidence:** I measured the mean luminance of the first screen against the same crop of the original file (`SCRATCH/r1tools/bright.cjs`). The screenshot includes the white headline, so the real darkening of the photo is worse than these numbers.

| Page | Desktop full frame | Desktop "clear" top-right | Phone full frame | Phone top band |
| --- | --- | --- | --- | --- |
| Home (kitchen-a) | 0.55 | 0.83 | 0.51 | 0.79 |
| Kitchen (kitchen-d) | 0.49 | 0.83 | 0.45 | 0.65 |
| Bathroom (bath-a) | 0.46 | 0.85 | 0.42 | 0.63 |
| Whole-home (living-a) | 0.48 | 0.82 | 0.42 | 0.58 |
| Additions (exterior-a) | 0.47 | 0.87 | 0.41 | 0.60 |
| Roofing (roof-b) | 0.50 | 0.81 | 0.46 | 0.60 |
| Portfolio (kitchen-b) | 0.59 | 0.79 | 0.52 | 0.66 |
| About (roof-c) | 0.66 | 0.82 | 0.47 | 0.62 |

First-screen mean luminance (0–255), desktop/phone: **ours 97/97**, BOWA 141/167, Case 147/182, Anthony Wilder 184/181, Landis 99/112 (`shots-r1/compare-first-screen-*.png`). Only Landis is as dark, and its photo is a warm, styled kitchen with three words over it.
**Cause:** `hero.css:93-96` stacks three shades: 55 % across the top, 80 % at the bottom and a 75° wash of 85→55→12 %. `hero.css:99-106` leaves the drawing at 38 % opacity forever (14 % on phones, `hero.css:214-215`). Phones get 90/74/55 % up to 84 % of the height (`hero.css:219`). Interior pages: `scenes.css:18-21` (desktop) and `scenes.css:27` (phone, 94→78→55 % up to 90 % of the height). The bands use `scenes.css:140`. The service panels draw photos at 62 % opacity (`scenes.css:262`), and the home service cards on phones get a 90 % gradient (`interior.css:151`).
**Fix:**
- Shade only behind the words. Home desktop (`hero.css:93-96`): `linear-gradient(180deg, rgba(0,0,0,.35) 0, transparent 14%), linear-gradient(0deg, rgba(0,0,0,.55) 0, transparent 32%), linear-gradient(75deg, rgba(0,0,0,.72) 0, rgba(0,0,0,.3) 30%, transparent 52%)`. Apply the same shape to `scenes.css:18-21`.
- `@keyframes cg-dim { to { opacity: 0 } }`, so the drawing leaves once the room is built, as on interior pages.
- Set `.pn-item img` to opacity 0.9 and keep a bottom-only gradient.
- Targets: full frame ≥ 0.70 of the original on desktop and the clear area ≥ 0.93. Phones: see F2.

### F2. On a phone, the words sit on top of the room (P0, can be done now)
**What the customer sees:** an eyebrow, a three-line headline, a four-line paragraph, a full-width button and two links stacked over the photo. What is left of the home kitchen is a strip of ceiling and three pendant lamps (`shots/phone/home/00.png`). On roofing it is sky, a tree branch and an AC unit (`shots/phone/roofing/00.png`). Case and BOWA put the room, unshaded, in the top half and the words below (`shots-r1/compare-first-screen-phone.png`).
**Cause:** a full-screen hero with the copy pinned to the bottom (`hero.css:43-59`, `interior.css:362`), plus the phone shades above. The photo is a centred `object-fit: cover` crop of a 3:2 landscape image into a 390×664 portrait (`hero.css:81-82`, `interior.css:7`).
**Fix:** at ≤540 px, give the photo the top half and the words the bottom half. Set `.cg-stage, .ph-stage { bottom: auto; height: 50svh }` with a shade only in its bottom 25 % fading into black, and set the copy on solid black below. Keep the headline and buttons in the hero and move the paragraph to just below it. Set the crop per photo, e.g. kitchen-a `object-position: 30% 62%` (island and cabinets) and roof-b `object-position: 80% 45%` (gable and flat roof). Target: at least 45 % of the first phone screen is unshaded room.

### F3. The home opening takes 5.2 s, and leaves lines over the photo (P0, proposal for the owner to approve)
**What the customer sees:** for 4.4 s, a black screen with white lines being drawn. The room starts to appear at 4.4 s and is complete at 5.2 s (`shots/sheets/film-desktop-home.png`, frames `film/desktop/home/t04408ms.png` and `t05200ms.png`; the phone film is the same). After that, a 38 % white wireframe stays over the kitchen on desktop. It reads as a glitch rather than a drawing. Interior pages do the same idea in 2.55 s and then clear the lines.
**Cause:** `--t-built: 3.4s` (`hero.css:10`) and a 1.8 s reveal (`hero.css:84`). There are 22 strokes plus dimensions, staggered 0.16 s apart (`hero.css:115`), so the last one starts at 3.9 s. The second headline line comes at 1.6 s (`hero.css:162`), and `cg-dim` stops at 0.38 (`hero.css:104`).
**Fix (keep the idea, shorten it):** set `--t-built: 1.3s`, change the stroke delay to `calc(.1s + var(--i) * .05s)` with a 0.7 s draw, make the photo reveal 1.1 s, delay the second headline line by 0.6 s, and fade the drawing to 0 by about 3 s. The room then shows from about 1.5 s and is complete at about 2.4 s. I am telling the owner plainly: the drawing is the hook, but on a first visit it holds the room back for 5 s, and nobody waits 5 s to see a kitchen.

### F4. Service pages don't show the service (P0 for additions/whole-home, P1 for the rest; part can be done now, part needs the owner)
**What the customer sees:**
- **Additions:** the page top is the shadowy space under a rear deck. The only other photo is a bedroom (`content.json:332`, `:360`), there is no gallery and the page has one photo below the top. Nothing on the page shows an addition.
- **Whole-home:** it opens on a bedroom (living-a, which `photos.ts:39` itself captions "Bedroom") and then a second bedroom band (`content.json:243`, `:275`).
- **Roofing:** a roof terrace, then a rooftop lounge with blue sofas (`content.json:404`, `:440`). Between them is a children's-book house drawing (`shots/desktop/roofing/01.png`). There are no shingles, flashing, membrane or crew.
- **Lead paint:** a stock street and drawings, with no photos below the page top (`content.json:803`).
- **About:** "One team, from first sketch to final walkthrough" is shown over a close-up of a sink (`content.json:487`). There are no people.

**Fix now (honest re-casting of existing photos; captions stay "Our project" and the room name):**
- Whole-home: the top becomes kitchen-c (kitchen open to the stair and living room, which reads as a whole floor). Home-remodeling's top (`content.json:8`) becomes kitchen-f so kitchen-c is not used twice.
- Additions: swap its top (exterior-a) with service-areas' band deck-a (`content.json:623`). deck-a shows the back of a whole house, three levels of it.
- Additions also gets the outdoor rail (deck-a, exterior-a, roof-b, roof-c) that the other service pages have, using the existing `Rail` with a new `galleries.outdoor` list in `photos.ts`.
- Roofing: keep roof-b, cropped to the roofs (F2), and drop the sofa band.
- Bathroom: swap the dark bath-a top (`content.json:151`) for bright bath-b, and put bath-a in the band.

**Needs the owner:** photographs of a real addition (outside, ideally before and after), roofs being repaired or replaced, lead containment and clearance, and Italo, Eddie and the crew. The interim fixes above are the most honest available.

### F5. The work arrives late (P1, can be done now)
**What the customer sees:** on the home page, the first photo that isn't shaded comes after **five full screens of scrolling on desktop**, out of 14.4 (`shots/desktop/home/05.png`, about 4,500 px). On a phone it comes after **seven to eight screens**, out of 14.6 (`shots/phone/home/07.png`, `08.png`). Before it come a white statement and 2.4 screens of pinned black diagrams (bubble plan, floor plan, a photo in a circle). On kitchen, bathroom and whole-home, the gallery comes after one pinned drawing screen and a dark band: after five screens on desktop and four to five on a phone (`05.png` desktop, `04.png`–`05.png` phone).
**Cause:** home section order (`index.astro:88-205`). Process pin `+=240%` on desktop and `+=180%` on phone (`home.ts:57`). Rooms rail pin of up to 2 screens (`home.ts:160`). Interior order: points-drawing, then split, reviews and gallery (`content.json:50-145`, and the same for the others). Plan pin `n*25%` (`scenes.ts:127`).
**Fix:**
- Home: Hero, then "What we build", then "Rooms we've built", then the statement and the process. Cut the process pin to `+=120%` on desktop and drop it on phones (as `scenes.ts:81` already does for plans).
- Service pages: move the `gallery` section to straight after the hero, ahead of the plan drawing.
- Target: a bright company photo by screen 2 on every key page, on both devices.

### F6. Phone crops cut rooms down to objects (P1, can be done now)
**What the customer sees:** the kitchen band is a cooker hood and a cupboard door (`shots/phone/kitchen-remodeling/02.png`). The phone rails are 84vw × 54svh portraits that show the middle third of a landscape room: stools, or the ceiling and a pendant (`.../04.png`, `05.png`).
**Cause:** `.bnd-frame` is `min-height: 100svh` with `object-fit: cover` and no phone override (`scenes.css:138-140`). `.rail.is-swipe .rail-track figure > div { height: 54svh }` (`scenes.css:177`).
**Fix:**
- At ≤900 px, `.bnd-frame { display: block; min-height: 0; padding: 0 }`, `.bnd-frame > img { position: static; height: auto; aspect-ratio: 3/2 }` and hide `::after`. The copy then sits below the photo on black.
- Change the rail to `height: auto; aspect-ratio: 4/3`.

### F7. The portfolio doesn't look like a $300k firm's portfolio (P1, partly now, partly the owner)
**What the customer sees:** 18 thumbnails, all 3:2 and about 430 px wide on a 1440 screen (about 170 px on a phone). They sit in three columns with the middle one dropped, so the layout ends in a ragged white hole (`shots/sheets/desktop-portfolio.png`). Every caption is a room word ("Kitchen", "Bathroom"), with no lead image, no grouping and no projects. It reads like a property-listing gallery. BOWA, Case and Wilder sell projects.
**Cause:** `scenes.css:290-292` (three columns, `data-depth` offset) and `Portfolio.astro:18-20` (pre-split columns).
**Fix now:** use one grid. Make the first photo full width, then show two columns of about 680 px. Group the photos under small room headings (Kitchens, Bathrooms and powder rooms, Outdoor and rooftop, Bedrooms), drop the offset, and use one column on phones.
**Needs the owner:** project names, neighbourhoods, before and after photos, and more projects, especially older DC rowhouses and Chevy Chase or Bethesda family homes, which personas A and B need to see themselves in.

### F8. An unlabelled stock video fills a whole screen of the home page (P1, can be done now)
**What the customer sees:** "From the kitchen to the roof." over hands turning a plan book on a pallet of perforated clay bricks, next to a hi-vis vest (`public/media/plans-poster.jpg`). It came in with "licensed stock photos and video" (commit 8cd95a4), it is not labelled, and it sits among photos marked "Our project". A sharp-eyed visitor reads it as generic, and the brick type isn't DC.
**Cause:** `index.astro:197-205`.
**Fix:** replace the video with a full-bleed company photo. deck-a, the back of a whole house from deck to roof, fits the line. If the video stays, label it "Stock footage" as `Band.astro:12` does.

### F9. Every page ends with 3 phone screens of black (P1, can be done now)
**What the customer sees:** the closing block, service chips, a contact grid, a black footer and a 13.1vw wordmark. Phone and email are each shown twice within a few swipes. I measured this with reduced motion, so pinned sections don't change the page heights (`SCRATCH/r1tools/measure.cjs`).

| Share of page from the closing block to the end | Kitchen | Bathroom | Additions | Roofing | Lead paint | About | Contact |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Desktop | 24 % | 22 % | 30 % | 31 % | 33 % | 30 % | 79 % (footer alone 60 %) |
| Phone | 26 % (3.2 screens) | 25 % | 37 % | 38 % | 40 % | 36 % | 86 % (footer alone 41 %) |

**Cause:** `Cta.astro:22-23` (chips and contact grid), `Footer.astro:17` and `scenes.css:54` (wordmark).
**Fix:** on phones, hide `.ct-grid`, which repeats the footer, and the wordmark. Lay out footer links in two tight columns with 10 px rows. Target: ≤ 1.6 phone screens from the closing headline to the end of the page. Reviewer 2 owns which links stay.

### F10. The same few photos keep coming back (P2, can be done now)
**What the customer sees:** a visitor going from Home to Whole-home to Additions sees bedrooms three times.
- bed-a is used 4 times: the home service card (`index.astro:28`) and `content.json:21`, `:275` and `:730`.
- kitchen-c is used 3 times (`index.astro:142`, `content.json:8`, `:758`).
- roof-a is used 3 times (`content.json:440`, `:588` and the whole-home rail).
- living-a is used twice (`content.json:243`, `:360`).

**Fix:** give each photo at most one page-top or band role (F4 does most of this). Use rails and the portfolio for repeats.

### F11. The brand's temperature fights the photos (P2, can be done now; owner's taste)
**What the customer sees:** black grid paper, safety orange, small mono capitals and "ILLUSTRATIVE PLAN" CAD sheets. That reads as an architecture studio or a tech start-up. The photos are white, wood and daylight. BOWA, Case and Wilder are light and warm. Orange is used for CTAs and also for "hands.", label squares, step numbers, chips, the plus in the logo and closing headlines, so it never gets to mean "act here".
**Fix:**
- Make warm off-white (`--tint`, `hero.css:5`) the main background of interior sections. Keep black for the hero, the plan scene and the footer.
- Keep orange for buttons, the logo plus and one accent per screen.
- Remove the "PAGE / PHOTO" info box over the brightest part of every page-top photo (`InteriorLayout.astro:60-65`, `scenes.css:46`; `Hero.astro:62-65`). Keep "Our project" as a small caption at the bottom right.

### F12. Smaller things
- The reviews page on a phone is 13.2 screens of text with no image (`shots/sheets/phone-reviews.png`). Insert two neutral "Rooms we've built" photo strips between review groups. Don't pair a photo with a named reviewer.
- On the about page, the band below the reviews leaves about half a desktop screen of white (`shots/desktop/about-us/03.png`). Tighten the padding.

## 4. Fix list

| ID | Pri | What to change | Where | Now / owner |
| --- | --- | --- | --- | --- |
| E1 | P0 | Shade only behind the words; drawing fades to 0; panels at 0.9 opacity. Target ≥ 0.70 full frame and ≥ 0.93 clear area on desktop (re-run `bright.cjs`) | `hero.css:93-106`, `scenes.css:18-21`, `:140`, `:262`, `interior.css:151` | Now |
| E2 | P0 | Phone page tops: photo in the top 50svh, unshaded, words on black below; paragraph below the hero; per-photo `object-position` | `hero.css:213-220`, `scenes.css:25-28`, `interior.css:362` | Now |
| E3 | P0 | Home opening ≤ 2.5 s to a built room, lines cleared afterwards | `hero.css:10, 84, 104, 115, 162` | Now; owner approves the timing change |
| E4 | P0 | Re-cast leads: whole-home → kitchen-c; home-remodeling → kitchen-f; additions ↔ deck-a; bathroom → bath-b; roofing drops the sofa band | `content.json:8, 151, 183, 243, 332, 440, 623` | Now |
| E5 | P0 | Add an outdoor rail to additions (deck-a, exterior-a, roof-b, roof-c) | `photos.ts` galleries, `content.json` additions sections | Now |
| E6 | P1 | Work first: home order Hero → What we build → Rooms → process; process pin `+=120%`, none on phones; galleries straight after the hero on service pages | `index.astro:88-205`, `home.ts:57`, `content.json` section order | Now |
| E7 | P1 | Phone bands become a 3:2 photo above the text; rails 4:3 | `scenes.css:138-140`, `:177` | Now |
| E8 | P1 | Portfolio: lead image, two columns of ~680 px, room groups, no offset, one column on phones | `Portfolio.astro:18-20`, `scenes.css:290-292` | Now |
| E9 | P1 | Replace the stock plans video with deck-a full bleed, or label it "Stock footage" | `index.astro:197-205` | Now |
| E10 | P1 | Phone ending ≤ 1.6 screens: hide the duplicate contact grid and the wordmark on phones; compact the footer | `Cta.astro:23`, `Footer.astro:17`, `scenes.css:54` | Now |
| E11 | P2 | One page-top or band role per photo | `content.json`, `index.astro:28` | Now |
| E12 | P2 | Warm off-white interiors, orange for actions only, remove the PAGE/PHOTO box | `hero.css:5`, `scenes.css:46`, `InteriorLayout.astro:60-65`, `Hero.astro:62-65` | Now |
| E13 | P2 | Photo strips between review groups; tighten the about page's white gap | `reviews.astro`, `content.json` about | Now |
| O1 | P0 | Photograph a real addition (outside, before and after) and a roof repair or replacement in progress | additions, roofing | Needs the owner. Interim: E4, E5 |
| O2 | P1 | Photos of Italo, Eddie and the crew on site, for About and the home page | about | Needs the owner. Interim: keep roof-c; don't put a sink under "One team" |
| O3 | P1 | Lead-safe work: containment, HEPA, clearance (no faces of tenants) | lead paint | Needs the owner. Interim: keep the labelled stock |
| O4 | P1 | Projects with names and neighbourhoods; older DC rowhouse and family-home projects | portfolio | Needs the owner. Interim: E8 grouping |
