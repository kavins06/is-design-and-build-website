> Saved from the 15 November 2026 review of commit 3b2f2ce. File paths under `/tmp/claude-0/…` (SHOTS, R) pointed at screenshots in a temporary working folder that no longer exists. Findings are as the reviewer wrote them; see [the summary note](../../review-2026-11-15.md) for what was changed.

# Review 2 of 3: Evidence & positioning

**Lens:** why a buyer would believe I.S, and why they would choose it over the alternatives.
**Personas:** (A) the Capitol Hill couple in diligence mode: a 1920s rowhouse, a kitchen and two bathrooms, about $150–250k, three firms on the shortlist. (B) A skeptical strategist who knows the DC remodeling market.

**Method.** I read the repo copy and data and the built pages on the local server, and used the screenshots in SHOTS. Public research was done on 2026-11-15:
- The Google Business Profile behind the site's own review link. The profile and all 39 reviews were pulled through the owner's OpenSEO project.
- BBB, SAM/HigherGov, the DC DOEE lead lists, the Maryland DLLR, MLS listings, the Andersen locator, and 10 remodeler and 3 roofer competitors.
- Photo metadata, read with ImageMagick.

Working files are in /tmp/claude-0/-home-user-is-design-and-build-website/deeb0a7f-b2e4-5b6d-979f-62b97e26adf8/scratchpad/review-2/: `review-notes.txt`, `company-photos.jpg`, `stock-photos.jpg` and `dl-doee/list-2022.txt`.

**Rule for everything below:** each public fact is cited, and the owner must confirm it before it is published. Nothing here is invented.

---

## 1. Verdict

- **Would a diligent buyer believe this firm can deliver?**
  - On the site alone: **4/10**.
  - After one Google search: **7/10**.
- **Would they choose it over the competitors researched?** **3/10** today. With the fixes below, which use only facts the firm already has, about **6–7/10** for the couple's job.
- **The single biggest reason: the site asks to be trusted on its looks and hides the proof the firm already has.**
  - On the site: no rating, no licence, no warranty, no people, and a 12-photo portfolio that looks like staged new-build condos.
  - One click away:
    - **39 Google reviews averaging 4.9.** Many are long and specific, about older DC houses, roofs, lead removal and DC permits, and 21 of them name Eddie Migues.
    - **A BBB A+ file** that lists DC, Maryland and Virginia licences.
    - **A DC lead-abatement listing.**
  - The comparison: Hopkins & Porter puts "4.9 rating based on 37 Google reviews", "Licensed in MD, DC, and VA" and a written warranty on its home page. Next to it, the couple reads I.S as the riskiest name on the list. That is not because it is riskier; the site simply never shows why it isn't.

---

## 2. What works — keep these

1. **Nothing is faked.**
   - No invented testimonials, awards, counts or prices.
   - Stock images are labelled.
   - The structured data deliberately states no rating (`src/data/schema.ts:3-4`).

   That honesty is an asset: everything the site is missing exists and can be added truthfully.
2. **Both quotes are real and checkable.** Lia Dean (January 2026) and Eun Mi Yu (July 2022) appear verbatim on the Google profile. The Yu excerpt names a founder and admits a supply delay, and that candour persuades.
3. **"Formerly I.S. Enterprises"** (About lede `content.json:389`; `alternateName` at `schema.ts:15`). This line connects the new brand to its record: every Google review, the BBB file, the licences and the lead listing are under the old name. Keep it, and use it far more (H3).
4. **The scope-first promises are true, and reviews confirm them.** "Scope, estimate and any permits, agreed up front" (`site.ts:27`), "Scope, cost and arrangements are settled before construction starts" (`content.json:449`) and "We agree the scope with you before anything is built, so the estimate matches the work" (`content.json:82`). Independent confirmation:
   - Margo Hoftijzer: "additional defects came up … this work and costing was all discussed and agreed before they went ahead"
   - Marie Isabel Laurion: "the few change orders we had were legitimate and reasonable"
   - Edith Baker: "he explained everything what would happen how much it would cost"

   Keep the promises, and put the evidence next to them.
5. **Roofing: "Water damage: Ceilings and walls affected by a leak, scoped with the roof"** (`content.json:343-344`). This is a real edge over roofers, and reviews back it:
   - Nicole Green: "replaced my roof which required interior repairs"
   - Fatimah Goodwin: "interior water damage repairs, wall painting and electrical work"
6. **"Do you take smaller projects? Yes."** (`content.json:550-551`) is true to the review base and feeds referrals.
7. **The financing page is candid** (`content.json:602`): the lender decides, and I.S doesn't store the details.
8. **Having a lead-paint page at all.** It matters to almost every Capitol Hill rowhouse, and competitors only mention lead as a cost driver.
9. **Contact details hold up.**
   - The phone number matches the Google profile.
   - isenterprises.net now 308-redirects to the new domain, so the old site's placeholder testimonials ("John Doe") are gone.

---

## 3. What fails

### 3a. Proof inventory: every piece of evidence on the site, rated as presented

| Evidence | Where | As presented (0–5) | Why |
| --- | --- | --- | --- |
| "Building since 1989", "1989", "37 years" | Home proof strip `index.astro:102` and facts `:48-53`; About `Span.astro:8-15`; contact `contact-us.astro:11`; footer `Footer.astro:7`; og alt `BaseLayout.astro:56` | 2 | Shown 6 ways on 4 surfaces in 3 wordings, one of them hedged ("Construction experience since 1989"). In this market it is parity, not an edge: Case 65+ years, Hopkins & Porter 1977, Foster 1983, Sun 1988, BOWA "35th anniversary", Landis 1990. |
| "Read our Google reviews" link | `index.astro:102`, `:234`; `contact-us.astro:12`; About quote | 1 | No rating and no count. The buyer has to leave the site to find out that it's 4.9 from 39. |
| Lia Dean excerpt | Home `:232-233`, contact `:12` | 2 | Real, but it is the most generic sentence of her review. No date, no project. |
| Eun Mi Yu excerpt | About only (`content.json:405-409`) | 3 | Specific, names Eddie, and is buried. |
| Portfolio: 12 photos captioned by room | `/portfolio/`, `src/data/photos.ts` | 1.5 | Two photo shoots in one style, shot as staged listings. No project, place, scope or before/after. The "12 photographs" counter (`Portfolio.astro:18`) advertises how few there are. |
| Founders' names | About (`content.json:415`) | 1 | No faces, roles or story, and the section is illustrated with a kitchen. |
| "One in-house team" / "The team you meet at the start is the team that finishes the job" | `Hero.astro:45`, `:51`; `index.astro:51`, `:102`; `content.json:10`, `:397-402`, `:487` | 2 | Assertion only. The evidence for it, in the reviews, goes unused. |
| Process: 5 steps on home, 6 on the page | `site.ts:24-30`; `content.json:428-459` | 2 | Parity with competitors. Nothing on who manages the job, when things happen, or how changes are priced. |
| Financing (Hearth, HFS) | `/financing/` | 2 | Neutral. |
| "Formerly I.S. Enterprises" | About; schema | 3 | A valuable bridge to the firm's record, but only on About. |
| Licences, insurance, warranty, lead certification, BBB, memberships, awards, press | Nowhere (a grep for licen/insur/warrant/certif/accredit/award finds only "licensed inspector" at `content.json:686`) | 0 | Absent. |
| Office address | Contact, footer | 2 | A real DC address, but it differs from Google ("Suite 300 #12") and BBB (1324 H St NE). |

### 3b. What a diligent buyer finds online

Every row is for the owner to confirm before anything is published.

| Where they look | What they find | Effect | What the site should do |
| --- | --- | --- | --- |
| **Google profile**, the site's own link: https://www.google.com/maps?cid=1968106805018591346 | See the summary below the table. | **Strongly helps** | Show the rating and count. Quote 8–10 reviews, each on the page it supports. Say the reviews are under the former name. Reply to reviews. Resolve the staff review (C1). |
| **BBB**: https://www.bbb.org/washington-dc-eastern-pa/quote/request-is-enterprises-net-184026240 | A+ rating, accredited since 5/8/2025. "Business started 10/1/1989", incorporated 12/3/1998. Italo Rodriguez (President), Eduardo Migues (Vice President). Licences: DC DCRA 70103548 (expires 5/31/2028) and 69011757 (expires 11/30/2027); MD DLLR 98433 (expires 2/27/2027); VA DPOR 2705128578 (expires 4/30/2027). No complaints in 3 years, 0 BBB reviews. **Address 1324 H St NE, Washington, DC 20002; phone (202) 388-6799.** | Helps (licences, A+). Contradicts the site (address, phone). | Publish the licences and BBB A+. Update the BBB address and phone. |
| **Angi / HomeAdvisor**: https://angi.com/companylist/us/dc/washington/is-enterprises-reviews-8699137.htm, https://www.homeadvisor.com/rated.ISEnterprisesInc.35977793.html, https://cost-guide-ssr.homeadvisor.com/rated.isenterprisesinc.141358876.html | About 4.9 from 17–22 reviews (snapshots differ). "Free estimates". **"Does not offer warranties"** and "does not offer emergency services". The listing text describes commercial, government and embassy work. | Mixed. "No warranties" hurts. | If a warranty exists, fix the listing and state the warranty on the site. |
| **SAM.gov via HigherGov**: https://www.highergov.com/awardee/i-s-enterprises-inc-10054679 | I.S. Enterprises, Inc., UEI EGZ3BLX8LQF3, CAGE 1RYJ5, "Date founded Dec. 3, 1998". **GSA Multiple Award Schedule GS21F0010T, 6/1/2007–5/31/2027, $742,036 obligated**, most recent award May 6, 2024. Self-certified DOT DBE, Hispanic American-owned and minority-owned. Primary NAICS 423720 (plumbing and heating supplies wholesale); NAICS also include 236220 and 238160 (roofing). | Helps (a government track record). "Founded 1998" can undercut "since 1989". | One line on About. Reconcile the 1989 and 1998 wording (H3). |
| **DC DOEE lead list**, last public PDF (5-4-2022): https://doee.dc.gov/sites/default/files/dc/sites/ddoe/publication/attachments/DC%20Lead%20Abatement%20-%20Renovation%20Companies%20Updated%205-4-22.pdf | "I.S. Enterprises Inc — Abatement, Renovation/Remodeling — Residential, Commercial and Child Occupied Facility — 9/28/2023 — DC18-8929". Current status can only be checked in DOEE's search portal (https://doee.dc.gov/node/55572), which I could not query. | Helps, if still current | Show the certificate number and expiry once confirmed (H5). |
| **Andersen locator**: https://locations.andersenwindows.com/united-states/dc/washington/is-enterprises/76072 (and `/51815`) | "IS Enterprises" listed as a Certified Contractor, two DC entries. | Helps, for windows | Mention it if confirmed and if windows are offered (M5). |
| **MapQuest**: https://mapquest.com/us/district-of-columbia/is-enterprises-403678930 | "Founded in 1989 by Italo Rodriguez and Eddie Migues". | Helps | — |
| **Houzz, Yelp** | No profile found. | Hurts by comparison: every design-build competitor in §4 has a Houzz profile with reviews or awards. | Create a Houzz profile once real project photos exist. |
| **MLS listings** for the two projects named in `business-context.md` §7: 643 Girard St NE (https://kevinheselbach.evrealestate.com/sold-listing/detail/1177935374/643_GIRARD_ST_NE_-1-Washington-DC) and 1326 Montello Ave NE (https://www.trulia.com/home/1326-montello-1-washington-dc-20002-351762256) | 643 Girard: a condo building, "New Construction: Y", built 2024, units sold January–April 2025 for $716k–$775k. 1326 Montello: a condo built in 2016. | Neutral to harmful: the portfolio reads as developer condos, not remodels. | Say what each project was, or show remodels (H1). |
| **Old domain** isenterprises.net | 308-redirects to isdesignandbuild.com. | Helps | — |

**The Google profile in detail.** It is listed as "I.S Design+Build".
- **Rating:** **4.9 from 39 reviews**: 37 five-star, one four-star and one one-star ("Worst people ever", 2019, unanswered). 20 of the reviews were posted since April 2024.
- **Names:** Eddie is named in **21** reviews, Italo in 4.
- **Jobs mentioned:**
  - roofs (5)
  - windows (4–5)
  - lead removal or mitigation with clearance testing (2)
  - DC permits and zoning (3)
  - owners abroad or out of town (3)
  - kitchen, bath and whole-house remodels (about 8)
  - aging-in-place work (2)
  - many small repairs
- **Price:** two reviews say I.S was not the cheapest bid and was worth it.
- **Listing details:** address "1010 Wisconsin Ave NW Suite 300 **#12**". Hours Monday 9–**4**, Tuesday to Friday 9–5. 48 photos. Only 3 owner replies, all from 2024-11-15.

### 3c. Findings

#### Critical

**C1. The firm's best proof, 4.9 from 39 Google reviews, is invisible. The site shows two one-line excerpts and a link out.**
- **Where:** `index.astro:102` (proof strip), `:229-235` (Lia Dean); `contact-us.astro:12`; `content.json:405-409` (Eun Mi Yu, About only). There is no reviews page, and no service page carries a review.
- **What the skeptic concludes:** "No rating shown means it's bad or there are only a few." Competitors put the number on the page:
  - Hopkins & Porter: "4.9 rating based on 37 Google reviews" (https://www.hopkinsandporter.com/)
  - Foster: Google 4.8 (63) plus 352 GuildQuality reviews (https://www.fosterremodeling.com/)
  - Landis: 4.9 on Google (https://www.landisconstruction.com/)
- **Why it costs the job:** reviews are the first diligence step. When proof is equal, the firm that displays it wins. I.S also has the better content: long, specific, older-house stories.
- **Fix now, with what is already approved** (the owner allowed reuse of existing reviews, handoff D5):
  - Use the full Lia Dean text: **"Eddie & his team were terrific to work with. They delivered high-quality work, with clear communication and strong attention to detail. They went above and beyond to deliver within our complicated schedule, including completing work on weekends and holidays."**
  - Put the Eun Mi Yu quote on home and contact too, not only About.
  - Attribute with a date and job: **"Lia Dean · Google review · January 2026"** and **"Eun Mi Yu · Home remodel · Google review, July 2022"**.
  - Beside every review link: **"Our reviews are listed under our former name, I.S. Enterprises."**
- **Needs owner:**
  1. Approval to show **"4.9 on Google · 39 reviews"**, with the month, in the proof strip and beside every primary CTA.
  2. Approval to quote the reviews in the map below, ideally after asking each reviewer.
  3. A /reviews/ page.
  4. Replies on Google, including a calm reply to the 2019 one-star.
  5. **Integrity:** a five-star review from April 2020 is posted under the name of someone the BBB lists as a member of the company's staff (name withheld here). Google's policy counts "current or former employment" as a conflict of interest (https://support.google.com/contributionpolicy/answer/7400114). Ask for it to be removed before the site advertises the rating. The rating stays 4.9 (185/38 = 4.87).

  **Review-to-page map** (verbatim from Google; the owner's approval is needed for each):

  | Page | Reviewer | Excerpt |
  | --- | --- | --- |
  | Home / contact | Maria Claudia Soler, Dec 2025 | "We did receive cheaper quotes from other companies, but we chose Eddie and his team because they truly deliver quality work." |
  | Home / contact | Shyra Peyton, Jan 2021 | "I.S. Enterprises was one of four contractors that bid on a large-scale overhaul renovation of my parents' old house… he didn't beat around the bush, or try to sell me a dream." |
  | Lead paint | Soler | "we were doing lead removal at the property, which was very important for us since we have small kids… We also had an external party overseeing the work, and the final clearance testing gave us the peace of mind we needed" |
  | Lead paint | Stephanie Bechtold Shedd, Aug 2021 | "lead paint mitigation in our baby's room… They also facilitated last minute lead testing so that we could return home as soon as possible." |
  | Roofing | Jordan Brown, May 2022 | "I have a house built in 1900… my roof had to be completely gutted and rebuilt and I S Enterprises did a perfect job." |
  | Roofing | Nicole Green, Apr 2024 | "Mr. Eddie and his team replaced my roof which required interior repairs." |
  | Bathroom | Marie Isabel Laurion, Mar 2025 | "I'm loving my spa bathroom and expanded closet… the few change orders we had were legitimate and reasonable." |
  | Whole-home | Peyton (above) | — |
  | Whole-home | Jeffrey Little, Feb 2020 | "a major kitchen and bedroom remodel" |
  | Process / permits | Nima Gerami, May 2026 | "He was helpful in navigating the complicated permitting process in DC" |
  | Process / permits | Margo Hoftijzer, Mar 2020 | "this work and costing was all discussed and agreed before they went ahead" |
  | About | Frank Jackson, May 2021 | "Eddie was there pretty much every day checking on the progress" |
  | About | Four Twelve Interiors, Aug 2024 (an independent interior designer) | "the project manager, general contractor and each tradesmen were professional, patient, and efficient" |
  | Service areas, and the couple | Amanda Jones, May 2021 | "a number of small projects on our row home on Capitol Hill… repairing exterior brick mortar, window trim, an attic fan" |

**C2. No licence, insurance, warranty or certification anywhere on the site. Maryland also requires the MHIC number on contractor websites.**
- **Where:** sitewide. The only "licensed" is about third-party inspectors (`content.json:686`). Nothing appears in the footer, contact page or service pages.
- **What the skeptic concludes:** "Is this an unlicensed outfit with a nice website?" For a $150–250k job, licence and insurance are checked first. Competitors show them:
  - Hopkins & Porter: "Licensed in MD, DC, and VA"
  - Gilday: VA, DC and MD licence numbers in the footer (https://www.gilday.com/)
  - ROOFWORKS: "Licensed, Bonded and Insured" (https://www.roofworksinc.com/service-area/washington-dc/)
- **The facts exist publicly** (BBB): DC 70103548 and 69011757, MD 98433, VA DPOR 2705128578, all current, plus A+ with no complaints in 3 years. The Maryland DLLR bulletin of 9 Feb 2021 says MHIC licensees must "include their trade name and MHIC number on all advertising", including "company websites, social media sites" (https://content.govdelivery.com/accounts/MDDLLR/bulletins/2b24b89; also https://labor.maryland.gov/license/mhic/mhicad.shtml). The site markets to Montgomery County.
- **Fix now:** nothing can be published until confirmed. It is a one-email ask, so build the credentials line now and switch it on the day the owner replies.
- **Needs owner:**
  1. Confirm the four numbers, which DC licence is the home-improvement or general-contractor licence, and the Virginia licence class.
  2. Insurance: general liability and workers' comp, and whether certificates are available on request.
  3. Confirm BBB accreditation is still active.

  Then show in the footer, on the contact page and on every service page: **"I.S Design + Build is the trade name of I.S. Enterprises, Inc. Licensed in Washington, DC (#[confirm]), Maryland (MHIC #98433) and Virginia (#2705128578). Fully insured. BBB A+ accredited."**

**C3. Positioning mismatch. The site dresses as an architect-led luxury design-build studio, but all the evidence describes a founder-run builder for older DC homes. The skeptic doesn't believe the costume and never sees the real strengths.**
- **Where:**
  - Drafting props on every hero: "Drawing / Sheet / Scale 1/4" = 1'-0"" (`Hero.astro:53-57`, `InteriorLayout.astro`).
  - "designed and built by one team" (`Hero.astro:51`) and "Designed and built by one in-house team" (`content.json:10`).
  - og alt "Homes designed and built … since 1989" (`BaseLayout.astro:56`).
- **The evidence:**
  - No designer or architect is named anywhere, and every drawing is marked "Illustrative".
  - Reviews show I.S building from other people's designs. George Murray: "the owner of IS made great and improved changes to the plans designed by the architect". Four Twelve Interiors worked alongside the I.S team as the interior designer.
  - SAM's primary NAICS is supply wholesale.
  - The Google profile's place topics are "handrail replacement, window replacement, new bathrooms, pipe replacement, roof repair, electrical work".
- **The firms that own "architect-led design-build" have architects in-house:**
  - Wentworth: Bruce Wentworth, AIA
  - Gilday: "We are architects / We are interior designers / We are builders"
  - Case: architects and four design studios
  - Landis: 65 staff, "215 awards", press logos
- **The taglines echo bigger competitors.** "Built around you" (`index.astro:105`) and "Remodeling, built around you." (`content.json:9`) mirror Case's headline "Built around the way you live." (https://www.casedesign.com/). The Google profile tagline "Designed Around You" mirrors Foster's "Designed Around Trust, Clarity, and Craftsmanship".
- **What the skeptic concludes:** "They say design-build, but there's no designer, no real drawings and no awards. BOWA, Case and Landis do this with architects. Pass."
- **Why it costs the job:** on the luxury axis, I.S loses to every firm in §4. On its real axis (the founder on your job; the whole old house including roof, lead and permits; owners who live away) nobody in §4 competes, and the site never says it.
- **Fix now:**
  - Reposition around verified strengths (§4 statement).
  - Until the owner confirms design capability, replace "designed and built by one team" with **"planned and built by one team"** or **"One team, from estimate to final walkthrough."**
  - Reviewer 1's proposed H1, "Designed and built by one team. In DC since 1989.", should drop "Designed" for the same reason, or wait for the owner.
- **Needs owner:**
  1. Who designs: an in-house designer or architect, a partner architect, or the client's architect?
  2. Are permit drawings produced in-house?
  3. Is there a design fee?
  4. If design is in-house, name the designer and allow 2–3 real, anonymised plans.

#### High

**H1. The portfolio can't prove remodeling.**
- **Where:** `/portfolio/` (`Portfolio.astro`, `photos.ts`). The whole-home gallery (`photos.ts:38`) uses the same images.
- **The evidence:**
  - Two photo shoots, one style. Photo metadata on 8 of the 12 reads Artist "Derek Miller", Copyright "DerekandVeeLLC". "Derek and Vee" is credited as photographer on DC sale listings (https://pear-sprout-df7f.squarespace.com/staging-2023).
  - The other 4 are one 90-second sequence on a Canon EOS 6D, 2021-04-09, 10:21–10:22.
  - All of them are staged listing photography.
  - `business-context.md` §7 names the only two known projects, and the MLS shows both are condo buildings: 643 Girard St NE is "New Construction", built 2024, sold for $716k–$775k; 1326 Montello Ave NE is a 2016 condo.
- **What the skeptic concludes:** "Staged listing photos of developer condos. Where is a lived-in 1920s rowhouse they renovated? Where's the before?" A reverse image search can land on a sale listing.
- **Why it costs the job:** the couple is buying a renovation of an occupied old house, and the only visual proof is of a different product.
- **Fix now:**
  - Group the photos by project, not by room.
  - Don't present condo images as "whole-home renovations" unless they were renovations.
  - Remove the "12 photographs" counter.
  - Add "projects in words" cards from approved reviews, for example **"A house built in 1900: roof rebuilt in three days and the skylight replaced. Jordan Brown, Google review."**
- **Needs owner:**
  1. **The scope of each photographed project:** new build, or a gut conversion with a pop-up or addition? If 643 Girard was a rowhouse gutted and enlarged into condos, it is the best whole-home and addition case study the firm has. Send its before photos.
  2. **The licence for the Derek & Vee photos.**
  3. **3–6 homeowner projects with before/after photos and permission to publish.** Priorities:
     - Capitol Hill row home (Jones)
     - the 1900 house roof (Brown)
     - the spa bath and lower-level rental unit (Laurion)
     - the parents' old house overhaul (Peyton)
     - the Kalorama custom windows (Tanner)
     - the Martha's Vineyard whole house (Murray: out of area, but it shows scale)
  4. **Usable shots among the 48 photos on the Google profile and the photos reviewers uploaded.**
- **Case-study template:**
  - the house: age, type, neighbourhood
  - the brief
  - what we did
  - permits and lead
  - duration band
  - the client's words
  - a before/after pair
  - an optional budget band

**H2. No people.**
- **Where:** About (`content.json:410-418`) shows two names, no faces and no roles, over a kitchen photo. There is no team page.
- **The evidence:**
  - BBB lists Italo Rodriguez (President) and Eduardo Migues (Vice President).
  - Eddie is named in 21 of 39 reviews and Italo in 4. "Again and again" overstates it for Italo.
  - Reviews name crew leads ("Benigno and Ivan", Soler).
- **Competitors show their people:**
  - Foster: six named design consultants with photos
  - Gilday: founder Kevin Gilday pictured
  - Wentworth: its AIA founder named
  - Landis: "65 team members"
- **What the skeptic concludes:** "Who will be in our house? Are the founders still involved?"
- **Fix now:** make the claim exact: **"Eddie Migues is the name you'll see again and again in our Google reviews."** Put the Eun Mi Yu quote beside it.
- **Needs owner:** confirm roles; who the client's day-to-day contact is; whether both founders are active; portraits; 3–5 sentences each; crew leads (with their consent); what "I.S" stands for.
- **Then:** **"Italo Rodriguez, President, and Eddie Migues, Vice President, started the company in 1989. Eddie runs our projects; you'll see his name in more than half of our Google reviews."**

**H3. Identity facts don't match across the site, Google, BBB and the listings, and the address reads as a mailbox.**
- **Where:**
  - **Address:** "Suite 300" on the site (`site.ts:11`, `schema.ts:23`); "Suite 300 **#12**" on Google; 1324 H St NE on BBB (phone (202) 388-6799, also on the DOEE list).
  - **Hours:** Monday to Friday 9–5 on the site (`site.ts:12`, `schema.ts:29-36`); Monday 9–4 on Google.
  - **Brand:** "I.S Design + Build" on the site; "I.S Design+Build" on Google.
  - **History, in four versions:**
    - "1989 — Founded, as I.S. Enterprises" (`Span.astro:10`). BBB says the business started 10/1/1989 and was **incorporated 12/3/1998**; SAM says "Date founded Dec. 3, 1998".
    - "Construction experience since 1989" (`Footer.astro:7`, `content.json:385`). This matches the owner's own wording, "in the industry since 1989" (`business-context.md` §0).
    - "Building since 1989" (home).
    - "Homes designed and built … since 1989" (og alt).
  - **Legal entity:** the footer © names "I.S Design + Build" and no legal entity.
- **What the skeptic concludes:** "A different address and phone on BBB, a '#12' suite, founded in 1989 or 1998?" Each mismatch is small. Together they look evasive.
- **Fix now:**
  - One history phrase everywhere: **"In business since 1989."** (footer, About description, og alt).
  - Change the About marker to **"1989 — Founded"** until the owner confirms the 1989 name.
  - Footer: **"I.S Design + Build is the trade name of I.S. Enterprises, Inc."** (owner or legal to confirm).
  - Put the former-name note on every review link (C1).
- **Needs owner:**
  1. Which address to publish, and can clients meet there? If it is a shared suite, say **"Office visits by appointment"** and name where the crews work from.
  2. What is at 1324 H St NE?
  3. Monday hours.
  4. The brand spelling on Google.
  5. Update BBB, Angi, HomeAdvisor, MapQuest, Andersen and the DOEE contact details to the new name and phone.
  6. One approved history line: **"Started in 1989 by Italo Rodriguez and Eddie Migues. Incorporated as I.S. Enterprises, Inc. in 1998. Renamed I.S Design + Build in 2026."**

**H4. No decision information. The answer to price is "No" and to time is "It depends".**
- **Where:** `content.json:102-107` (kitchen cost and timing), `:562-563` ("Can you give me a price online? No."), the process page and every service page. See the matrix below.
- **What competitors publish:**
  - Boss Design Center: **"Our kitchen projects in Washington DC typically run $80,000 to $250,000"**, a 6–8 month timeline (design 1–2 months, permits and scheduling 4–6 weeks, construction 3–4 months), fixed-price contracts, and change orders limited to hidden damage or client additions (https://bossdesigncenter.com/kitchen-remodel-cost-washington-dc/).
  - Foster: a Cost Guide, a "5% design fee" and a "20% deposit".
  - Gilday: a "Pricing & Budgeting" page.
  - Landis: a pricing and finance page and "No surprise invoices. No unapproved changes."
  - Hopkins & Porter: an additions calculator.
  - Case: a kitchen-cost article with ballpark budgets that lists "lead-safe work for pre-1978 homes" as a cost driver (https://www.casedesign.com/inspiration/how-much-does-it-cost-to-remodel-a-kitchen/).
  - Houzz typical job ranges: Landis $150k–$1M (https://www.houzz.in/professionals/pfvw-pf~2046843566), Hammer $100k–$2M.
- **What the skeptic concludes:** "Are they a $40k firm or a $400k firm?" They call the firm that answers.

| Decision item | Kitchen | Bath | Whole-home | Additions | Roofing |
| --- | --- | --- | --- | --- | --- |
| Typical cost range | No (cost factors only) | No | No | No | No |
| Typical timeline | No ("It depends") | No | No | No | No |
| What's included | Partly | Partly | Partly | Partly | Partly |
| Who designs, and any design fee | No | No | No | No | n/a |
| Permits | Mentioned in the timing answer | No | No | Yes ("We check them") | No |
| Licence and insurance | No | No | No | No | No |
| Warranty | No | No | No | No | No |
| Lead-safe work in pre-1978 homes | No link | No | No | No | No |
| Living through the work | No | No (only in a guide) | "It depends" | No | n/a |
| Deposit and payment schedule | No ("We discuss payment when the scope and estimate are prepared") | No | No | No | No |
| Who manages the job | No | No | No | No | No |
| How changes are handled | Vague ("You know how progress and any changes will be discussed") | Vague | Vague | Vague | Vague |
| Is the first visit free? | No (Angi says free estimates) | No | No | No | No |
| Proof for this service | Condo kitchens | Condo baths | Condo rooms | A deck photo | None |

- **Needs owner (exact asks):**
  1. Typical total ranges from about your last 10 projects of each type: kitchen; one bathroom; kitchen plus two bathrooms; whole-home; roof repair; roof replacement (flat, shingle, slate).
  2. The minimum job size.
  3. Typical durations for design, permits and construction.
  4. Any design fee, and whether it is credited.
  5. The deposit and payment schedule.
  6. Whether the first visit and estimate are free.
  7. How change orders are priced and approved.
  8. The written warranty for remodeling and for roofing.
  9. Can clients stay at home during the work?
  10. Who manages the job day to day.
- **Present once confirmed:**
  - **"Most of our kitchen remodels fall between $[X] and $[Y]; a kitchen plus two bathrooms, $[A]–$[B]. You get a written, itemised estimate after we've seen the house."**
  - A "What's included" list.
  - A design / permits / build timeline bar.
  - **"Warranty: [N]-year workmanship warranty, in writing."**
- **Fix now:** add an honest-pricing proof block using the Peyton and Soler quotes, once the owner approves. Heading: **"We're rarely the lowest bid. Here's why clients choose us anyway."**

**H5. Lead paint: the clearest differentiator, presented with no credential, no statement of the firm's role and no proof, while public records and reviews show real lead work.**
- **Where:** `/lead-paint-abatement/` (`content.json:643-707`). The page is linked from the footer only, and its URL says "abatement".
- **The evidence:** the DOEE listing (§3b: DC18-8929, abatement and renovation, residential, commercial and child-occupied facilities, expiry 9/28/2023 on the last public PDF), plus the Soler (2025) and Shedd (2021) reviews.
- **What the skeptic concludes:** "The URL says abatement and the page says 'tell us about it'. Are they even certified?"
- **Fix now:**
  - State the firm's role in scope terms, taken from the page's own note: **"If your house was built before 1978, we plan containment, dust control and clean-up into the scope and the estimate from the first visit."**
  - Link the page from the kitchen, bathroom, whole-home and roofing pages.
  - Put it in the header (M4).
- **Needs owner:**
  1. The current DOEE firm certification ID and expiry.
  2. The EPA RRP firm certificate.
  3. Names of certified supervisors or renovators.
  4. Whether clearance testing is done by an independent inspector (Soler says an "external party" oversaw it).
  5. Whether they cover Maryland and Virginia.
  6. Permission to quote Soler and Shedd.
- **Then:** **"DC-certified lead abatement and renovation firm (DOEE #[ID], valid to [date]). We contain the work, control the dust and clean up, and an independent clearance test confirms it before you move back in."**

**H6. Roofing has no roofing proof, though the firm has plenty.** (This is the proof angle. Reviewer 1's H2 covered the urgent caller.)
- **Where:** `/roofing/`. Stock images, no review, no warranty, no roof types or materials, no licence.
- **The evidence:**
  - Five roofing reviews: Brown, Crawford, Green, Day, and Laurion 2019.
  - The owner's public reply to Denise Crawford (2024): **"remember you have 30 years warranty on the roof materials and 5 years workmanship warranty."**
  - "Roofing contractor" is a category on the Google profile, and NAICS 238160 (roofing) is in SAM.
  - Angi's "does not offer warranties" contradicts the owner's reply.
- **Competitors:**
  - ROOFWORKS: "Licensed, Bonded and Insured", **"439 jobs in Washington, DC in the last 12 months"** with a live job feed, named systems (modified bitumen, TPO, EPDM, slate), emergency tarping, financing.
  - Long Roofing: "A trusted name since 1945", a 50-year full-replacement warranty, per its own site and Fixr (https://longhome.com/?p=60406, https://www.fixr.com/articles/everything-to-know-about-long-roofing).
  - CJ Roofing: a family-owned DC flat-roof specialist (https://www.rooferscoffeeshop.com/directory/cj-roofing-llc).
- **Fix now:** keep the water-damage line, and add the Brown and Green excerpts once approved.
- **Needs owner:**
  1. The written roofing warranty: the workmanship years, and the manufacturer warranty programmes.
  2. The roof types and materials they actually install: flat (modified bitumen, TPO, EPDM), slate, shingle, metal.
  3. Manufacturer certifications.
  4. Price bands for repairs and replacements.
  5. The emergency policy.
  6. Roof photos.
- **Then:** **"We fix the roof and the ceiling it damaged. One company, one warranty."** and **"Roof replacements carry a [5]-year workmanship warranty plus the manufacturer's material warranty."**

#### Medium

**M1. The "one team" claims are asserted, not shown, though the evidence exists.**
- **Where:** "The team you meet at the start is the team that finishes the job" (`content.json:402`); "One team, start to finish" (`index.astro:51`, `Span.astro:15`).
- **Status:** the owner confirmed an "in-house team for every part of building" (OpenSEO project memory, 2026-11-12). Reviews back it:
  - crews moved from DC to Martha's Vineyard (Murray)
  - Benigno and Ivan "always came back to the house, even after the main work was finished" (Soler)
  - Eddie on site almost daily (Jackson)
- **What the skeptic concludes:** "Everyone says that."
- **Fix now:** anchor each claim with a review line.
- **Needs owner:** which trades are in-house and which are subcontracted (licensed electrical, plumbing, HVAC). Keep "every part" only if it is true. A better line: **"Our own crews, led by Eddie Migues."**

**M2. "Since 1989" is used as if it were the differentiator. In this market it is parity.**
- **Where:** the six placements in §3a.
- **What the skeptic concludes:** "So? Case is 65 years old."
- **Fix now:**
  - Use it once, with meaning: **"Founder-run since 1989."** That combination is rare: BOWA, Case and Sun are institution-sized.
  - Replace "37 years of experience" with "in business", or drop it as a duplicate (Reviewer 1 also flagged this).

**M3. The kitchen page's only product evidence is a discount retailer's stock cabinet catalogue that advertises another company.**
- **Where:** `content.json:62-63` links to `/wp-content/uploads/2025/04/Assembled-Catalog-IS-Enterprises.pdf` (83 pages, 12.8 MB). Page 79: "Save shipping costs for orders below $2,400 (orders over that ship free!)". Page 80: "FIND BIG DISCOUNTS AT www.wholesalecabinets.us".
- **What the skeptic concludes:** "They resell discount stock cabinets, and send us to someone else's website." It signals builder grade and contradicts the premium styling.
- **Fix now:** remove the link, or relabel it honestly as **"Stock cabinet options we can supply"**.
- **Needs owner:** which cabinet lines they install (stock, semi-custom, custom), and any showroom or supplier partners. Case has studios and Foster has a showroom.

**M4. The information architecture hides the decision pages and has no home for proof.**
- **Where:** the header has Remodeling ▾, Roofing, Our Work and About ▾ (story, process, service areas). Financing, Lead Paint, FAQs and Guides are footer-only. Missing entirely: Reviews, Team, Warranty, Costs, project case studies, commercial/government, and repairs/windows/accessibility.
- **The competitor norm:**
  - BOWA: "Clients' Perspectives", "Our Experts", aftercare
  - Case: People, Warranty, Testimonials, Design Studios
  - Foster: Cost Guide, Warranty, Showroom, Financing Partners, Testimonials, Video Testimonials, Our Team
  - Landis: Pricing & Finance, Testimonials, Awards, Team
- **Fix now:**
  - Add a header group **"Planning"**: Our process, Costs & financing, Lead-safe work, FAQs.
  - Add **"Why I.S"**: reviews, licences, warranty, people. Its content needs the owner.
  - Organise the portfolio by project once projects exist.

**M5. Real services and segments shown in the reviews are missing from the site, though the owner's own positioning is "a general contractor that designs and builds everything for a property"** (`business-context.md` §0).
- **What the reviews show:**
  - Windows: Gerami, Tanner, Hansen.
  - Porches, steps and masonry: Jackson, Baylor, Jones, White.
  - Accessibility: Day ("two new high sitting toilets, hand rails… and a stair lift"), and Laurion 2019 (her father with Alzheimer's).
  - Rental-permit readiness: Hoftijzer.
  - Owners overseas: Gerami, Soler, Hoftijzer.
- **Other evidence:** Andersen lists "IS Enterprises" as a Certified Contractor. In Northern Virginia, Sun Design owns aging-in-place ("Thriving-in-Place").
- **Fix now:** none without confirmation.
- **Needs owner:** which of these to sell, and the Andersen status.
- **Then:**
  - One "Repairs, windows & exterior" page.
  - An "Aging in place" section.
  - **"Living abroad or out of town? We've run projects for owners overseas, with regular updates and every decision agreed with you."** Three reviews back this (Gerami, Soler, Hoftijzer), and it is a DC-specific niche.

**M6. Commercial and government work is real on the public record and invisible on the site. Handle it with one honest line, not sector pages.**
- **The evidence:**
  - GSA MAS GS21F0010T, 2007–2027, $742,036 obligated, latest award May 2024.
  - UEI EGZ3BLX8LQF3, CAGE 1RYJ5.
  - Self-certified DBE, Hispanic American-owned and minority-owned.
  - The DOEE listing covers commercial and child-occupied facilities.
  - The Angi copy mentions embassies and international organisations.
- **The owner's position is mixed:** `business-context.md` §0 says these are real lines of business, while the OpenSEO memory says the owner "challenged their inclusion".
- **Recommendation:**
  - Keep the residential site residential.
  - On About: **"We also build for commercial and government clients, and have held a GSA Multiple Award Schedule contract since 2007."**
  - In the footer: **"Commercial or government project? Call (202) 519-1831."**
  - Later, a capability-statement PDF (UEI, CAGE, NAICS, GSA number, past work).
  - No sector pages until there are named projects.
- **Needs owner:**
  1. The scope of the GSA schedule: supplies or construction services?
  2. Are the DBE and MBE statuses formally certified, or only self-reported?
  3. Example projects.

**M7. The pricing-tier signal is confused** (full analysis in §7).
- **The problem:** the luxury look, developer-condo work, a discount cabinet catalogue, and reviews ranging from fan installs to whole-house overhauls.
- **What it costs:** luxury shoppers find the proof thin, and mid-market shoppers assume the firm is too expensive.

**M8. Third-party listings contradict the site, and buyers see them.**
- **The contradictions:**
  - Angi: "does not offer warranties … emergency services".
  - BBB, DOEE and the HomeAdvisor-era listings: the old phone, (202) 388-6799, and the H St NE address.
  - HomeGuide: "no reviews yet" (https://homeguide.com/dc/washington/bathroom-remodeling/is-enterprises-inc).
  - No Houzz profile.
- **Fix (owner action):** update every listing to the new name, phone and address. Create a Houzz profile once real project photos exist.

#### Low

- **L1. The "3 areas" fact is not proof.** Replace it with **"Licensed in DC, MD & VA"** once confirmed. Reviewer 1 also flagged it as filler.
- **L2. The service areas page has no local proof.** Name the neighbourhoods where work was done, which is public: Capitol Hill and Kalorama (reviews), Brookland/Edgewood and Trinidad (the two projects). Needs owner confirmation. Competitors: Wentworth and Landis list towns; ROOFWORKS shows 439 DC jobs in 12 months.
- **L3. Schema consistency with the page claims.** `knowsAbout` (`schema.ts:40`) omits lead-paint work although the site has a page for it. `alternateName` lacks ", Inc.". `sameAs` lists only Google Maps, though BBB, Facebook and YouTube profiles exist. Align these once the facts are confirmed (the SEO mechanics are Reviewer 3's).
- **L4. The terms page tells buyers which showpieces are not company work.** It says "Images identified as design references, the animated kitchen illustration, the illustrative floor plan and background footage … are not presented as completed company projects." It also says "The portfolio uses photographs from the company's project archive", while 8 files carry a third-party copyright. The terms are honest, but they confirm the gap. Replacing the visuals (owner photos) removes it; confirm the photo licence (H1).
- **L5. The guides could carry the firm's DC experience** (permits, lead, party walls, roofs on 1900 houses) rather than generic advice. This is the evidence angle on Reviewer 1's M9. It needs short owner input per guide.
- **L6. Review replies.** Only 3 owner replies, and the 2019 one-star is unanswered. Reviewers praise responsiveness, so show it on Google too (owner action).

---

## 4. Competitors and the positioning to own

All sites were fetched on 2026-11-15, home page plus one key page. "Not shown" means not on the pages fetched.

| Firm | URL | Positioning, in their words | Proof shown | Page types | Tier signal |
| --- | --- | --- | --- | --- | --- |
| BOWA | https://www.bowa.com/ | "A better remodel begins with BOWA"; "Design Build Remodeling Experts" | "Our 35th Anniversary"; NARI CotY, Best of Houzz, Bethesda Best, Best of Arlington; "As Seen In" logos | Projects by category, BOWA Process / "5 Steps to Success", Clients' Perspectives, Our Experts, aftercare, awards & press, FAQ, blog, careers | Luxury ("luxury", "exquisite"); McLean and Middleburg offices |
| Anthony Wilder Design/Build | https://www.anthonywilder.com/ | "Creating award-winning projects"; "Architecture \| Interiors \| Construction" | Recognition page, Houzz, one Chevy Chase client quote; founded around 1990 per HomeGuide | Projects, Our Story, Recognition, client portal, a streamlined WilderWorks line, Interiors | Luxury / high-end |
| Case Architects & Remodelers | https://www.casedesign.com/ | "Built around the way you live." | 65+ years; architects and designers; testimonials; four design studios; "industry leading 5-year workmanship warranty" (https://www.casedesign.com/process/warranty/); a cost & financing article | Portfolio, People, Process (Design / Refine / Build / Warranty), Warranty, Design Studios, blog, videos, seminars | Upper-mid to high |
| Sun Design | https://www.sundesigninc.com/ | "Your Trusted Design Build Remodelers in the DC, Maryland, and Virginia Area" | Since 1988; 11 named testimonials; video tours; Our People; "Warranty/Forever Home Care"; "Thriving-in-Place" | Portfolio including Aging in Place, process, Design-Build FAQ, warranty, events, careers | Upper ("The team is expensive but they are able to walk you through where every cent goes") |
| Wentworth | https://www.wentworthstudio.com/ | "Washington, DC Home Remodeling Contractors & Architects"; "Architects & Builders" | Founded 2004 by Bruce Wentworth, AIA; GuildQuality 4.9; testimonials; rowhouse content (https://www.wentworthstudio.com/blog/row-house-design-remodeling-ideas) | Portfolio, 10-step process, fixed-price contract, testimonials, blog, eBook, careers | Upper ("livable luxury") |
| Landis Architects \| Builders | https://www.landisconstruction.com/ | "Generational Experience"; "Preserving the architectural legacy of Washington, DC homes" | Established 1990; 65 team members; "215 awards"; "418 kitchen remodels"; Google 4.9; press logos (Washingtonian, Architectural Digest, Washington Post); Houzz typical job $150k–$1M | Portfolio, team, process, pricing & finance, testimonials, awards, careers; free consultation | High |
| Hopkins & Porter | https://www.hopkinsandporter.com/ | "Trusted design-build remodelers serving the DC area since 1977" | **4.9 from 37 Google reviews** on the home page; "Licensed in MD, DC, and VA"; 2-year Active Warranty with 9- and 18-month walkthroughs plus a 5-year structural warranty; BBB | Portfolio, team, process, reviews, awards, areas, payment portal, additions calculator | Luxury / upper |
| Gilday Renovations | https://www.gilday.com/ | "We are architects / We are interior designers / We are builders"; "Let us be yours" | 35+ years; founder pictured; 11 testimonials; **VA/DC/MD licence numbers in the footer** | Portfolio, team, process, **Pricing & Budgeting**, reviews, articles, realtor pre-purchase evaluation, careers | Upper ("not the cheapest option") |
| Foster Remodeling Solutions | https://www.fosterremodeling.com/ | "Northern Virginia Home Remodeling Designed Around Trust, Clarity, and Craftsmanship" | Since 1983; Google 4.8 (63); 352 GuildQuality reviews; six named consultants with photos; **"5% design fee", "20% deposit"** | Gallery, team, process, **cost guide**, warranty, showroom, financing, testimonials, video testimonials, seminars | Mid to upper-mid |
| Hammer Design Build Remodel | https://www.houzz.com.sg/pro/hammerbygbco/hammer-design-build-remodel | "High-End Design & Luxury Craftsmanship in DC \| 9X Best of Houzz Winner" | 67 Houzz projects; typical job $100k–$2M; DCRA and MHIC numbers listed; historic DC rowhouse review | Houzz-led | High |
| Boss Design Center (kitchen & bath) | https://bossdesigncenter.com/kitchen-remodel-cost-washington-dc/ | Kitchen & bath design specialist, MD/DC/VA | Published "$80,000 to $250,000" project range, a 6–8 month timeline, fixed-price contract | Cost guides | Upper-mid |
| ROOFWORKS (roofing) | https://www.roofworksinc.com/service-area/washington-dc/ | "Expert Roof Repair, Roof Replacement & Flat Roofing Services Throughout Washington, DC" | 50+ years; family-owned; "Licensed, Bonded and Insured"; BBB; Nextdoor Fave 2025; "439 jobs in Washington, DC in the last 12 months" with a live job feed | Service pages, emergency, inspections, financing, discounts, reviews | Mid ("FREE" estimates, senior discounts) |
| Long Roofing (roofing) | https://longhome.com/?p=60406 | "A trusted name since 1945" | 4th generation; 50-year full-replacement warranty; CertainTeed recognition; around 12,000 GuildQuality reviews at 4.5 (per Fixr) | Large-brand site | Mid / upper-mid ("a little pricey") |
| CJ Roofing (roofing) | https://www.rooferscoffeeshop.com/directory/cj-roofing-llc ; https://getjerry.com/home-insurance/washington-roofing-contractors | Family-owned DC flat-roof specialist | Capitol Hill flat-roof review; CertainTeed credential per a listing | Directory presence | Mid |

**Where I.S is weaker:**
- No in-house design evidenced.
- No awards or press.
- A small, uncontextualised portfolio.
- No people.
- No published warranty, licences or cost guidance.
- No showroom.
- An office that reads as a mailbox.
- No Houzz presence.
- A look that promises more than the proof carries.

**Where I.S can credibly differentiate** (each verified publicly, owner to confirm):

1. **Founder-run, with the founder on your job.** Eddie is named in 21 of 39 reviews; "Eddie was there pretty much every day". BOWA, Case and Sun are too big to say this.
2. **The whole old house from one firm: remodeling and roofing, plus the ceiling the leak ruined.** None of the design-build sites reviewed presents roofing as a service line on the pages fetched, and roofers don't do interiors (Brown, Green, Goodwin).
3. **Lead-safe work in pre-1978 homes, with clearance testing.** The DOEE listing plus the Soler and Shedd reviews, if the certificate is current. Competitors only mention lead as a cost driver.
4. **DC permits and zoning.** Gerami, Jackson, Hoftijzer.
5. **Owners who live away.** Three reviews: Gerami, Soler, Hoftijzer.
6. **Builders that architects and designers like working with.** Murray; Four Twelve Interiors. This speaks to buyers who already have an architect.
7. **"Not the cheapest, worth it."** Peyton, Soler, Obaigbena.
8. **"Since 1989".** Parity against the design-build firms. It is an edge only against roofers and newer contractors.
9. **The Georgetown office: do not lean on it.** The "#12" suite and the different BBB address can backfire.

**Recommended positioning statement** (internal; every element is verifiable once confirmed):

> **For owners of older homes in Washington, DC, Montgomery County and Northern Virginia, I.S Design + Build (formerly I.S. Enterprises) is the founder-run contractor that has taken care of the whole house since 1989 — kitchens, bathrooms, roofs, repairs and lead-safe work — run personally by the people our clients name in their reviews.**

On the site: Reviewer 1 owns the H1 wording, but it should express this positioning.
- **Line:** **"Founder-run since 1989. Your whole house, kitchen to roof, handled by one licensed firm."**
- **Proof bar:** **"4.9 on Google · 39 reviews | Licensed in DC, MD & VA | BBB A+ | DC-certified lead-safe firm"**. Each item needs the owner.
- **Version with today's verified facts only:** **"In business since 1989 · Founders Italo Rodriguez and Eddie Migues · One team from estimate to final walkthrough · Read our Google reviews (under our former name, I.S. Enterprises)"**.

---

## 5. Owner request list, in priority order

1. **Licences and insurance.**
   - Are these yours and current: DC 70103548 and 69011757 (which one is the home-improvement or general-contractor licence?), MHIC 98433, VA DPOR 2705128578 (which class)?
   - Who insures you (general liability, workers' comp), and will you provide certificates on request?
   - Is the BBB accreditation still active?
   - Maryland requires the MHIC number on your website.
2. **Reviews.**
   - May we show "4.9 on Google · 39 reviews" and quote the reviews listed in C1? Will you ask those clients' permission?
   - Is the April 2020 five-star reviewer a member of staff (the BBB listing suggests so)? If so, please have that review removed.
   - Will you reply to reviews, including the 2019 one-star?
3. **Lead certification.**
   - Your current DOEE firm certificate number and expiry? The last public listing is DC18-8929, expired 9/28/2023.
   - Your EPA RRP firm certificate?
   - Names of certified supervisors?
   - Is clearance testing independent?
   - Do you do lead work in Maryland and Virginia?
4. **Warranty.** What written warranty do you give for remodeling and for roofing? Your Google reply mentions a 5-year workmanship and 30-year material warranty on a roof. Angi says you offer none; can we fix Angi?
5. **People.**
   - Confirm the titles: Italo Rodriguez, President; Eddie Migues, Vice President.
   - Are both still active?
   - Who is the client's day-to-day contact?
   - Portraits, 3–5 sentences from each founder, crew leads (Benigno, Ivan?) with their consent, and what "I.S" stands for.
6. **Design.**
   - Who designs? In-house, a partner architect, or the client's architect?
   - Do you produce permit drawings?
   - Do you charge a design fee?
7. **Projects and photos.**
   - What were 643 Girard St NE and 1326 Montello Ave NE: new builds or gut conversions? Do you have before photos?
   - Do you hold a licence for the Derek & Vee photos?
   - 3–6 homeowner projects with before/after photos and permission (see H1).
   - Which of the 48 photos on your Google profile are yours to use?
8. **Money and time.**
   - Typical ranges per project type, and the minimum job.
   - Typical durations.
   - The deposit and payment schedule.
   - Is the first visit or estimate free?
   - How are change orders priced and approved?
   - Can clients stay at home during the work?
9. **Identity.**
   - Is 1010 Wisconsin Ave NW Suite 300 #12 a place clients can visit? What is at 1324 H St NE?
   - Monday hours: 4 or 5?
   - One brand spelling.
   - The legal footer line "trade name of I.S. Enterprises, Inc.".
   - One history line: what was the business called in 1989, given it was incorporated in 1998?
   - Update BBB, Angi, HomeAdvisor, MapQuest, Andersen and DOEE to the new name and phone.
10. **Services.**
    - Do you want to sell windows (are you still an Andersen Certified Contractor?), porches, masonry and exterior repairs, accessibility work and rental-readiness?
    - Should we say you run projects for owners abroad?
11. **Commercial and government.**
    - What does the GSA schedule GS21F0010T cover?
    - Are DBE and MBE formally certified?
    - Any example projects?
    - Do you approve one line on About?
12. **Roofing.**
    - Which roof types and materials do you install?
    - Manufacturer certifications?
    - Your emergency and after-hours policy?
    - Price bands for repairs and replacements?
    - Roof photos?
13. **Enquiries.** Who answers an enquiry, and how fast do you reply?
14. **Cabinets.** Is the wholesale catalogue a line you supply? Which cabinet lines do you install? Keep the PDF or remove it?
15. **Anything else real.** Memberships (NARI, NAHB, MBIA), awards, press, and whether "300+ projects" is accurate. Only claims that are real.

---

## 6. Top 10 changes, in priority order

1. **Put the reviews on the site (C1).**
   - "4.9 on Google · 39 reviews" in the proof strip and beside every primary CTA.
   - The full Lia Dean text and the Eun Mi Yu quote on home and contact.
   - Page-specific excerpts from the C1 map.
   - A /reviews/ page.
   - A former-name note on every review link.
   - Resolve the staff review first.
2. **Publish the licences, insurance and BBB A+ (C2)** in the footer, on the contact page and on every service page, in the wording given in C2.
3. **Reposition to "founder-run builder for older DC homes" (C3, §4).**
   - Drop "designed by one in-house team" until design is confirmed.
   - Retire the "Built around you" and "Designed Around You" taglines, which echo Case and Foster.
4. **Introduce the people (H2):** roles, portraits, story, Eddie's role and review count, crew leads.
5. **Turn the portfolio into evidence (H1).**
   - Project groups with honest context now.
   - 3–6 homeowner case studies with before/after photos as the owner supplies them.
   - Remove the counter.
   - Confirm the photo licence.
6. **Add decision information (H4).**
   - Cost ranges, timelines, what's included, design fee, payment, change orders, first visit, warranty.
   - An honest-pricing proof block with the Peyton and Soler quotes.
7. **Make lead-safe work a credentialed differentiator (H5):** the certificate number and expiry, independent clearance testing, the Soler and Shedd reviews, cross-links, and a place in the nav.
8. **Give roofing proof (H6):** warranty, roof + ceiling from one company, the Brown and Green reviews, systems installed, real roof photos.
9. **Reconcile identity facts everywhere (H3, M8):** address and the #12 suite, hours, brand, legal name, one history line, and all third-party listings.
10. **Fix the information architecture and coverage (M3–M6).**
    - Add the "Planning" and "Why I.S" groups.
    - Surface financing, lead and FAQs.
    - Remove the wholesale cabinet catalogue.
    - One honest commercial/government line.
    - A repairs, windows and accessibility line or page if the owner confirms.

---

## 7. Pricing-tier signal

- **Signalled:** luxury, architect-led. A black minimalist look, drafting title blocks, scale notes and drawings on every page. It reads like Anthony Wilder or BOWA.
- **The work shown:** developer-grade new-build condo finish. Flat-panel and walnut-look cabinetry, quartz waterfall islands, light engineered floors, black fixtures. It is the look of NE DC condos selling for $716k–$850k (643 Girard units in 2025; 1326 Montello #2 sold for $850,000 in April 2023, https://jancrowley.evrealestate.com/sold-listing/detail/1144382281/1326_MONTELLO_AVE_NE_-2-Washington-DC): upper-mid spec, not custom luxury.
- **Product evidence:** a discount stock-cabinet catalogue that points to "www.wholesalecabinets.us". That reads as budget to mid-market.
- **The reviews:**
  - Job sizes run from painting, ceiling fans and handrails to whole-house overhauls, a spa bath plus a rental unit, and GC work on a 4-storey luxury new build.
  - Price comments: "highest" of four bids (Peyton), "cheaper quotes from other companies" (Soler), "a little on the pricier side" (Obaigbena), "fair" (Laurion), "great price" (Murray), "Reasonable price" (Gonzales).
- **Verdict:**
  - The honest tier is **upper-mid, quality-first and founder-run**. It is close to Foster's or Case's pricing posture, not BOWA's or Landis's.
  - The look promises a tier the proof can't carry, so it fails twice. Luxury shoppers find the evidence thin. Owners of $30–80k jobs, a real part of the review base, assume the firm is too expensive.
- **How to move it where it should be, honestly:**
  1. Keep the refined design, and anchor it with builder proof: licences, warranty, reviews, people, before/afters of older homes.
  2. Publish real ranges and a minimum (owner).
  3. Use the "not the cheapest bid, worth it" reviews.
  4. Replace the architect props with real drawings from a permitted job (owner).
  5. Remove the discount catalogue.
  6. Keep "From a powder room to a primary suite" and "Do you take smaller projects? Yes."

---

## 8. Outside my lane

1. The 12.8 MB cabinet PDF is linked from the kitchen page (performance).
2. The address ("Suite 300" vs "#12") and hours (Monday 4 vs 5 pm) differ between the site's markup and Google, which affects local SEO and profile matching.
3. 8 portfolio images carry a third-party copyright in their metadata ("DerekandVeeLLC"). The image rights need a legal check.
4. The MHIC advertising-number requirement for Maryland should be checked by counsel (compliance).
5. Old isenterprises.net deep URLs 308-redirect to the same paths on the new domain. Check that each one resolves.
