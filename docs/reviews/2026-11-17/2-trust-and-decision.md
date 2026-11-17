# Reviewer 2: Will they believe us and choose us?

Lens: words, proof, offer and the path to getting in touch. Reviewed 17 November 2026 on the local build (same commit as production, spot-checked against isdesignandbuild.com) at 1440×900 and on an emulated iPhone 13. Competitor sites read the same day: Landis Architects | Builders, Case Architects & Remodelers, Wentworth, Sun Design, Roofworks, PJ Fitzpatrick.

## 1. Verdict

Everything on the site is true and its Google reviews beat most rivals' proof, but it never says why a homeowner should pick this firm, and it leaves out what decides a contractor shortlist: licences and insurance, a project like theirs, what the first visit costs, and who answers after 5 pm. The firm's two real edges (fixing the roof *and* the ceiling it ruined, and lead-paint work in pre-1978 houses) are buried, and the lead page never says the firm does the work.

| Measure | Score | Why |
|---|---|---|
| Believable from the site alone | **6/10** | 17 verbatim, named, dated Google excerpts and honest "Our project" / "Stock image" labels; but ability is asserted, not shown: no project context, no faces, no licence, insurance or certification. |
| Chosen over the competitors | **3/10** | Landis shows "Established in 1990" and "4.9/5 on Google", tying both of this site's headline numbers, then adds "418 kitchen remodels", "215 awards" and "a free consultation". Nothing here breaks the tie. |

**Would get in touch** (each walk starts where Google would most likely land them):

- **a. Capitol Hill rowhouse, kitchen and bathroom, comparing three: 5/10.** Lands on /kitchen-remodeling/. Probably sends the short form as a third bid, because the "pricing was fair" reviews ring true. But they see no rowhouse kitchen and no price or free-visit signal, and the only quote is from 2020 and mentions "a few minor issues".
- **b. Chevy Chase/Bethesda family, whole-home or addition: 2/10.** Lands on /home-additions/: no addition, no gallery, no Maryland project, no architect, no MHIC number. Wentworth ("Bruce Wentworth, AIA", Chevy Chase) and Case (Bethesda) win before anyone calls.
- **c. Northeast DC, water through the ceiling tonight: 4/10.** On a phone, /roofing/ puts "Call (202) 519-1831" first. But after hours the only answer is "leave a message", in a closed question about five screens down. A roofer offering "Emergency roof tarping" gets tonight's job, and the repair.
- **d. Landlord, pre-1978 rental, told to do lead work: 2/10.** The page opens "Older home? Plan for lead paint early." over a photo labelled "Stock image". It claims no DOEE certification and says nothing about notices, tenants or clearance reports. The landlord picks from DOEE's certified list instead.

## 2. What works: keep it

1. **Reviews handled with integrity:** verbatim, full names, the job in the client's words, month and year, "…" for cuts, a link to Google (`src/data/reviews.ts`, `src/pages/reviews.astro:36`). Case's home page signs its quote "Janet S."; this is stronger.
2. **Reviews that answer the objections that matter:**
   - "We did receive cheaper quotes from other companies, but we chose Eddie and his team" (Soler, Dec 2025)
   - "he didn't beat around the bush, or try to sell me a dream" (Peyton)
   - "the pricing was fair and the few change orders we had were legitimate and reasonable" (Laurion)
   - "this work and costing was all discussed and agreed before they went ahead" (Hoftijzer)
3. **The right promise, said consistently:** "We agree the scope and the estimate with you before anything is built, so the price matches the work." (`index.astro:102`, echoed on the kitchen and process pages).
4. **Builder's lines:** "Repair it or replace it. We'll tell you which." / "Please don't climb onto the roof." / "Old paint becomes dust." / "You don't need every detail decided."
5. **Roofing is phone-first:** the hero button and the phone bar say "Call (202) 519-1831" (`content.json:408`, `Footer.astro:19-20`). The roofing form is honest: "sending the form doesn't book a visit."
6. **A contact page that asks little:** three next steps, five questions, a town rather than an address, an optional budget ("Not sure yet is fine"), and the project type pre-selected.
7. **Small truths rivals lack:** "I live out of town. Can you run my project?" and "Can you make a bathroom easier to use as we get older?" in the FAQs, and "Formerly I.S. Enterprises" explained in the footer.

## 3. What doesn't work, ranked by jobs lost

### 3.1 No reason to choose this firm (every visitor)

- **First screen:** "Your home. In good hands." (Allstate's line for decades), then "We handle the design, the permits and the build", which describes any design-build firm. Under it: "4.9 on Google · 39 reviews / In business since 1989 / One in-house team". Rivals tie those numbers: Landis "Established in 1990", "4.9/5 on Google"; Sun Design "Since 1988"; Case "For over 65 years".
- **Repeats instead of proof:** the home page repeats those facts (the rating three times, 1989 three times, "one team" four times), while the first sentence from a client sits about ten screens down on a phone, out of 14.
- **The real edges are reduced to captions:** "From the kitchen to the roof." is the video caption (`index.astro:208`); "We repair the stained ceiling and walls along with the roof, so you deal with one company." is point 03 on /roofing/ (`content.json:426`); lead work is missing from "What we build" (`site.ts:21-27`).
- **Cause:** `Hero.astro:55-60`, `index.astro:42-46, 95, 213-224`.

### 3.2 Lead-paint work is hidden and never claimed (landlords, every pre-1978 owner)

- **The page frames lead paint as something to plan for, not a service:** "Older home? Plan for lead paint early." / "The EPA sets rules for renovation work in pre-1978 homes." It never names DOEE, DC's regulator, and adds: "Lead inspections and risk assessments are carried out by a licensed inspector or risk assessor." In its own voice the site never says "abatement"; the word appears only inside a client's quote. All three FAQs are for owner-occupiers.
- **No route in leads to it:** it is missing from the home page's services, the footer summary, "What services do you offer?", the closing project buttons and the form's project types. A landlord's enquiry is filed as "Something else" (`content.json:802`). The menu files lead paint under "Planning". Shedd's "They also facilitated last minute lead testing so that we could return home as soon as possible" appears only on /reviews/.
- **Why it loses the job:** DOEE requires firms to be DOEE-certified before doing lead-based paint work in pre-1978 homes, and warns that EPA certification alone may not be enough. Landlords with a notice choose from DOEE's certified list, so silence reads as "not certified". `business-context.md` §7: the firm's listing (DC18-8929) expired 2023-09-28.
- **Cause:** `content.json:798-870`, `site.ts:21-27`, `Header.astro:4`, `contact-us.astro:28`, `Footer.astro:13`.

### 3.3 Ability is asserted, not shown (personas a and b)

- **Photos without context:** all 24 photos carry a room name only, so the kitchen page reads "01 Kitchen 02 Kitchen 03 Kitchen 04 Kitchen". No neighbourhood, house type, scope or before photo (`photos.ts:27-28` waits on the owner).
- **Pages without their own work:** /home-additions/ shows no addition and has no gallery; /roofing/ shows no roof work (a roof terrace and a rooftop deck); /whole-home-remodeling/ repeats the overview gallery.
- **"Our story" has no story:** "They founded the company in 1989. Eddie's is the name you'll see again and again in our Google reviews." No faces, roles or team (`content.json:504-513`).
- **Facts that would impress are left in review captions:** "Independent interior designer on a new four-story home"; "Roof rebuild, house built in 1900".
- **Rivals show context:** Wentworth's Capitol Hill row-house kitchen page names the clients, the problem ("narrow with hardly any counter space") and the scope, with before photos.

### 3.4 No licences, insurance, warranty or certification anywhere

- **Nothing to show:** `credentials` is `null` (`site.ts:19`), while every rival in the table below shows a licence, a guarantee or both.
- **Advertising where licences are unconfirmed:** the code notes "Maryland requires the MHIC number on contractor websites" (`site.ts:18`), and the service-areas page hedges on Northern Virginia: "Send your location and we will confirm coverage." (`content.json:609`).

### 3.5 The offer stops at "we'll be in touch" (personas a and b)

- **Contact page:** "02 We get back to you to talk it through. 03 If it's a fit, we visit the house and prepare the scope and estimate." It gives no reply time and no name, and doesn't say whether the visit is free or design is paid for. "If it's a fit" reads as a filter.
- **No anchors:** cost is "We prepare an estimate once the scope is defined." and time is "It depends on the scope, permits, your selections…". Landis says "It starts with a free consultation… There's no obligation" and "Landis provides budget guidance early in the process". Every roofer says "Free Estimate".
- **No design step:** design is in the name and the opening paragraph, but not in either process list (`site.ts:29-35`, `content.json:533-558`). No designer, architect or drawing is mentioned, though the firm's own earlier process had "Design and material direction" (`business-context.md` §5).

### 3.6 A leak tonight gets "leave a message", and it's hidden (persona c)

- **The urgent answer is buried:** iPhone 13, /roofing/: "What if water is coming in now?" is closed, about five screens down, and says "Outside office hours, leave a message with your address and phone number."
- **Missing emergency basics:** no tarp or temporary cover, no callback time, no flat roofs (what most DC rowhouses have), no free inspection.
- **Photo buttons with no upload:** "Send photos of your roof" (`content.json:407`) and "Send details and photos" (`Cta.astro:19`) open a form that cannot take a photo.

### 3.7 Proof in the wrong places

- **A weak quote on the flagship page:** the kitchen page's only quote is "Italo, Eddie, and the IS Enterprises team … Though there were a few minor issues along the way…" (Feb 2020, `content.json:95-98`). It is six years old, names an unknown company and leads with issues.
- **Strong reviews only on /reviews/:** Dean (Jan 2026, the newest remodeling review), Day (accessibility), and Jones's "our row home on Capitol Hill" never reach the kitchen or bathroom pages.
- **"In-house" is unconfirmed:** "One in-house team", "build it with our own team" and "The team you meet at the start is the team that finishes the job" (`index.astro:95`, `content.json:10, 57, 491`) are confirmed nowhere in the docs. One review mentions "the project manager, general contractor and each tradesmen". If the trades are subcontracted, this is the claim a sharp buyer catches.

### 3.8 Navigation and the phone number

- **No phone on desktop:** the header shows only "Start a project" (`Header.astro:19`; `content.css:6` hides `.mobile-phone`).
- **Proof and a service buried in the menu:** Reviews, the strongest asset, sit inside "About"; lead paint, a service, sits under "Planning".

### 3.9 The voice, in places

- **Headlines any firm could use:** "Bathrooms that use every inch.", "More room for the life you have.", "Built to belong.", "Useful answers before you start."
- **Hedges:** "If it's a fit"; "Not for certain." (additions FAQ).
- **Guides are generic and hedged:** "Deep drawers may suit pots, while a tall cabinet may help keep food in one place." ("may" appears nine times.) Two target Georgetown, where no project is shown and historic-district review never comes up.

### Where the owner's brief works against customers

- **"Longer answers… closed by default"** hides the one answer a leaking-roof visitor needs.
- **"One primary action everywhere: start a project"** is wrong for landlords as well as leaks: both want to call.
- **"Proof near every ask"** has turned into the same three numbers, three times.
- **The premium architectural look promises an architect-led firm.** The words must claim the ground the evidence supports, a founder-run builder for older DC houses, or persona b is set up for disappointment.

### The competition, in their own words

| Firm | What they show that this site doesn't |
|---|---|
| Landis Architects \| Builders, DC (est. 1990) | "418 kitchen remodels", "215 awards", 65 team members; "It starts with a free consultation"; "No surprise invoices. No unapproved changes."; "preservation reviews that often come with historic properties" |
| Case Architects & Remodelers, DC/Bethesda/VA | "For over 65 years"; four design studios incl. DC; "100% satisfaction guarantee"; warranty page |
| Wentworth, Chevy Chase | "Bruce Wentworth, AIA"; GuildQuality "4.9/5 stars"; "fixed-price contract"; Capitol Hill row-house case study |
| Roofworks (DC) / PJ Fitzpatrick (DC) | "Licensed, Bonded and Insured"; "Emergency roof tarping"; "Insurance claim assistance"; "438 jobs in Washington, DC in the last 12 months"; DC licence number; "satisfaction guarantee"; free estimates |

**Where this firm can win, and should say so:**

- **Roof and ceiling from one firm:** no design-build rival above sells roofs, and no roofer rebuilds ceilings.
- **Lead-safe work and renovation together.**
- **A co-founder clients name in review after review.**
- **Small jobs and repairs welcome.**
- **Out-of-town owners and landlords are already clients.**

## 4. What needs to change

### P0: loses jobs now

**1. Say why us on the first screen.** Fixable now.

- **H1** (`Hero.astro:55-59`, three spans, last in orange): "From the kitchen / to the / roof."
- **Opening paragraph** (`Hero.astro:60`): "Kitchens, bathrooms, whole-home renovations, additions and roofs for older homes in DC, Northern Virginia and Montgomery County, including lead-safe work in pre-1978 houses. We handle the design, the permits and the build."
  - "Older homes" fits the evidence; the owner may veto it.
  - Add the lead clause only once item 2 is confirmed.
- **Video caption** (`index.astro:208`): "Agreed first. Then built."
- **Home proof:** delete the fact strip (`index.astro:213-222`) and move `<Reviews>` (`index.astro:224`) to directly after "How we work", with keys `['solerPrice', 'peyton']`.

**2. Make lead-paint work a listed service, and prove it.**

- **Needs owner, first.** Ask: "Send the current DOEE lead abatement-renovation firm certificate (number, expiry), the certified supervisor's name and the EPA RRP firm number. Do you take landlord jobs under a DOEE notice? Send two or three photos of real containment." If it has lapsed, renew before marketing lead work.
- **Then** (`content.json:799-806`):
  - Title: "Lead Paint Work for Older DC Homes and Rentals | I.S Design + Build".
  - H1: "Lead paint work for older DC homes and rentals."
  - Opening paragraph: "Peeling paint in a pre-1978 house or rental, or a child in the home? We contain the dust, do the work and arrange the independent clearance test, so you can move back in or rent it again."
  - Add: "DOEE-certified lead firm, certificate [number], valid to [date]."
  - Set `"phone": true`, with the CTA "Send details of the property".
  - New FAQ: "I've been told my rental needs lead work. Can you do it?" / "Yes. Send us the notice or inspection report. We'll tell you what the work involves and when we can start, and arrange the clearance test whose report you file with DOEE."
- **Fixable now:**
  - Reviews `["solerLead", "shedd"]` (`content.json:843-845`).
  - Note (`content.json:839`): "Testing and the final clearance check are done by an independent certified inspector. We arrange it." (Shedd, Soler.)
  - `content.json:813`: "In DC, lead paint work in pre-1978 homes must follow DOEE and EPA rules."
  - Add "Lead paint work" to the form's project types (`contact-us.astro:28`) and the closing buttons (`Cta.astro:11`).
  - Move it out of "Planning" (item 10).

**3. Show licences, insurance and warranty.** Needs owner.

- **Ask:** "DC licence number(s); MHIC number; Virginia DPOR licence class and number; insurer for general liability and workers' compensation; any written warranty."
- **Then:** set `site.ts:19` to one line, so it shows in the footer and on the contact page. For example: "DC licence [no.] · MHIC [no.] · Virginia Class [x] [no.] · Insured · DOEE lead firm [no.]".
- **Answer it in the FAQ:** "Are you licensed and insured?"
- **Remove any state you aren't licensed in** from every page.

**4. Answer the night-time leak in plain view.** Fixable now.

- **Roofing opening paragraph** (`content.json:406`): "Leaks, storm damage or a worn-out roof in DC, Northern Virginia and Montgomery County. We fix the roof and the ceiling it damaged, so you deal with one company."
- **Under the buttons** (a new field rendered in `[slug].astro:43-45`): "Water coming in now? Call and say so. Evenings and weekends, leave your address and number."
- **Photo buttons:** "Send photos of your roof" (`content.json:407`) and "Send details and photos" (`Cta.astro:19`) become "Send roof details". In the roofing help text (`contact-us.astro:31`), add "Photos help: email them to info@isdesignandbuild.com."
- **Needs owner.** Ask:
  - "After hours, who calls back, and by when?"
  - "Do you tarp or patch the same day?"
  - "Which roofs: flat or low-slope (modified bitumen, TPO, EPDM, coating), shingle, slate, metal?"
  - "Is the inspection free? Is there a roof warranty?"
  - "Are your hours really Monday to Friday?"

  Then replace the "Evenings and weekends" line with the real promise.

**5. Give the photos a project.**

- **Needs owner.** Ask: "For each of the 24 photos, which job is it from (643 Girard St NE, 1326 Montello Ave NE, other), what was done, and may we name the neighbourhood? For two jobs, send before photos and a two-line scope, plus any photos of additions, whole-house or Maryland work." Then caption them, for example "Kitchen · rowhouse renovation, Northeast DC" (`photos.ts`).
- **Fixable now** (`content.json:364`): "An addition changes the rooms beside it, so we plan both together. We've built everything from a porch through DC zoning to a new four-story home." (Source: `reviews.ts:36-37`.)

### P1: noticeably weakens

**6. Finish the offer on the contact page** (`contact-us.astro:19-23`).

- **Fixable now:** step 03 becomes "We visit the house, then prepare the scope and estimate."
- **Needs owner.** Ask: "How fast do you reply, and who? Is the first visit free? Is design a separate, paid stage?" Then add only what is true, for example "We reply within one business day. The first visit is free."

**7. Put design in the process.**

- **Fixable now:**
  - `site.ts:31`: `{ name: 'We visit and plan it with you', text: 'Layout, materials and finishes, chosen with you before the estimate.' }`.
  - Process page (`content.json:538-541`), new step after "Visit the house": "Design and selections: Layout, materials and finishes, chosen with you before the estimate is final."
- **Needs owner.** Ask: "Who designs: staff, a partner architect, or the client's own? Do you produce permit drawings?" Then add the FAQ "Who designs it?".

**8. The right review on the right page.** Fixable now.

- **Kitchen:** `["peyton", "little"]` (`content.json:96`).
- **Bathroom:** `["laurion", "day"]` (`content.json:192`).
- **Whole-home:** `["peytonResult", "solerAway"]` (`content.json:284`).
- **Every review block** (`Reviews.astro:13`), after the rating: "Many reviews use our former name, I.S. Enterprises."

**9. Make the people real, and confirm "in-house".**

- **Fixable now** (`content.json:508`): "They founded the company in 1989 as I.S. Enterprises. In our reviews, clients name Eddie for being on site, answering quickly and being straight about the bid." (Jackson, Yu, Peyton.)
- **Needs owner.** Ask: "Photos of Italo and Eddie, their roles today, the project manager's name, two sentences on how the company started. Which trades are your own employees?"
- **If the trades are subcontracted,** replace the three "in-house" claims with "One firm and one point of contact, from first visit to final walkthrough."

**10. A menu that follows the decision.** Fixable now.

- **Menu** (`Header.astro:3-5`): Remodeling ▾ · Roofing · Lead paint · Our work · Reviews · About ▾ (Our story, Our process, Service areas, Financing, FAQs, Guides).
- **Desktop header:** show "(202) 519-1831" beside "Start a project".
- **Footer summary** (`Footer.astro:13`): "Kitchens, bathrooms, whole homes, additions, roofs and lead paint work."

**11. Claim only the area you can prove.**

- **Fixable now** (`content.json:601`): "Capitol Hill, Northeast DC and across the city: from a single room to a full renovation or a new roof." (Jones review; `business-context.md` §6.)
- **Needs owner.** Ask: "Which Montgomery County and Northern Virginia towns have you worked in?" Name three or four, or drop the region.

**12. An FAQ page that answers real objections** (`content.json:680-716`).

- **Fixable now:**
  - "What services do you offer?": "Kitchens, bathrooms, whole-home renovations, additions, roofing and lead paint work in older homes. We also take on windows, porches, repairs and accessibility changes like grab bars and stair lifts." (Gerami, Jackson, Jones, Day.)
  - Add "Do you handle permits?": "Yes. We find out which permits and approvals the work needs, including DC zoning, and apply before work starts."
  - Add "Can you work with my architect or designer?": "Yes. We've built alongside independent designers, including on a new four-story home."
  - Add "Water is coming through my ceiling. What now?" with the roofing answer.
- **Needs owner:** answers to "Are you licensed and insured?", "Is the first visit free?", "How soon could you start?" and "Do you guarantee your work?".

### P2: polish

**13. Sharper headlines.** Fixable now.

- **Bathroom** (`content.json:152`): "Bathrooms built right behind the tile."
- **Additions** (`content.json:333-334`): "More room, built to match the house." with the opening paragraph "Home additions in Washington, DC, Northern Virginia and Montgomery County. We check zoning and structure first, handle the permits, and build the new space to match the old."
- **Additions FAQ** (`content.json:380`): "Not from a message alone. Send the town, the space you want and where it would go, and we'll tell you what we need to check: zoning, structure and access."
- **FAQ page** (`content.json:671`): "Straight answers before you call."

**14. Small fixes.** Fixable now.

- **Guides** (`articles.json`): cut the hedges; for example, "Deep drawers may suit pots…" becomes "Put pots in deep drawers and food in one tall cabinet."
- **Financing note** (`content.json:753`): add "Our lender pages show our former name, I.S. Enterprises."
- **"Next step" link** (`Cta.astro:23`): "A short call to talk it through" goes to the form. Make it "Send details. We call you back."

**15. Owner decisions.** Needs owner.

- **Guides:** one written from a real job, and keep or drop the Georgetown framing.
- **Instant Roofer:** put it on /roofing/ if it still works and you stand by its numbers. It would be the only price signal on the site.
- **Commercial and government work** (`business-context.md` §0): decide whether it gets a line.

## 5. Outside my lens

- Portfolio photos read as staged listing photography, and the roofing and additions heroes show decks and terraces (reviewer 1).
- On a phone the contact form's first field sits about 1.4 screens down (reviewers 1 and 3).
- `knowsAbout` in the structured data omits lead paint, and the lead page's title and description lack "abatement" (reviewer 3).
- "Suite 300" on the site vs "Suite 300 #12" in the business notes, and "I.S Design+Build" on Google: align name, address and phone (reviewer 3).
