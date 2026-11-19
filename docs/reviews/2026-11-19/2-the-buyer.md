# Review 2 of 3: The buyer (what a homeowner reads and believes)

19 November 2026 · commit 54085f6 · read on http://127.0.0.1:4321/, chat judged on production · `file:line` cites `SCRATCH/review-src/` (SCRATCH is the session scratchpad named in the brief)
Competitors read: BOWA (home page and Client Aftercare page), Landis (home page and Pricing & Financing page), Case Design/Remodeling (home page). For C and D: search listings for DC roof-leak repair and DOEE's lead guidance for landlords. Anthony Wilder blocked the fetch.
Chat test: I sent one question to production Fin from /roofing/ at about 10:37 UTC. It is now an anonymous conversation in the Intercom inbox, and the owner can close it.

## 1. Verdict

Everything the site says is true and modest, and its 4.9-from-39 Google rating with dated, word-for-word reviews convinces a sceptical buyer that the firm is real, long-standing and decent to deal with. It gives no reason to choose it over BOWA, Case or Landis: the headline is a slogan, its one repeated differentiator ("in-house") is not a confirmed fact, and the facts a $150k+ buyer checks first (licence, insurance, warranty, who will be in my house, rough cost, how long) are missing, as the site's own chatbot admits. The night-time roof-leak caller and the lead-paint landlord fare worst: the roofing page promises "today" and then leads to voicemail, and the lead page is written for renovators.

| Score | /10 | Why |
| --- | --- | --- |
| Believable on the site alone | **6** | Honest, verbatim, dated reviews and a real founding story. Nothing a buyer can verify beyond them: no licences, people, project stories or numbers. |
| Chosen over DC competitors | **4** | It makes the same design-build pitch as BOWA, Case and Landis with less proof. Landis (founded 1990, "4.9/5 on Google", "65 team members", published prices) beats it on its own terms. |
| Would get in touch | **5** | The form is short and the phone is on every page. But there is no reply time, no word on what the first visit costs, no phone in the desktop header, and the roof "send photos" path cannot take photos. |

| Persona | Believe | Choose us | Get in touch | The deciding moment |
| --- | --- | --- | --- | --- |
| A. Capitol Hill rowhouse, kitchen + 2 baths, $150–250k | 7 | 5 | 6 | The Capitol Hill row-home review and the honest cost FAQ help. Nothing says whether $150–250k covers a kitchen and two bathrooms; Landis prints "$150,000 to $300,000+" for a kitchen alone. |
| B. Chevy Chase/Bethesda addition, $300k+ | 5 | 3 | 4 | No addition is shown, no designer is named, and there is no MHIC number on a site that advertises Montgomery County on every page. BOWA offers "three years … structural elements for 15 years" of warranty. |
| C. NE DC roof leak, phone, at night | 6 | 3 | 7 | "Call" comes first and the Brown and Green roof reviews are the right ones. But "Call us today" leads to a message line after 5 pm, while DC leak-repair listings advertise 24/7 response. |
| D. Landlord, pre-1978 rental, lead | 4 | 2 | 4 | The page is "Older home? Plan for lead paint early.", written for renovators. It shows no certification and says nothing for landlords, and "lead paint" is not an option on the form. |

## 2. What works: keep

- **Restraint.** I found no invented claim on any page. Reviews carry the name, the job and the month (`reviews.ts:22-39`), and `/reviews/` says "Excerpts are quoted word for word" (`reviews.astro:36`).
- **The rating sits beside every ask:** "4.9 on Google from 39 reviews · Read them on Google" (`Reviews.astro:13-14`, `contact-us.astro:12`).
- **Excerpts that disarm objections:** "We did receive cheaper quotes … but we chose Eddie" (home), "the few change orders we had were legitimate and reasonable" (bathroom), "abatement protocols were properly followed … final clearance testing" (lead).
- **Roofing leads with the phone** in the hero, the closing and the phone bar (`content.json:408`, `Footer.astro:20`). The form asks "Is water currently entering the property?" and the page says "Please don't climb onto the roof."
- **A builder's honesty in the FAQs:** "Can you give me a price online? Not an accurate one, because every house is different." and "Can you tell me whether an addition is possible from a message? Not for certain."
- **The old name is explained:** "Formerly I.S. Enterprises" appears in the footer, on About and in the reviews intro, so reviews that use the old name make sense.
- **"Building in the DC area since 1989."** (`content.json:477`): specific, and older than Landis (1990).

## 3. What doesn't work, ranked by jobs lost

### 3.1 The facts a $150k buyer checks first are missing, and the chatbot says so (B, D, most of A)
- **What the buyer meets:** no licence, insurance, warranty, certification or team on any page, in the footer or on the contact page. Asked "are you licensed and insured?", production Fin replied: *"About licensing and insurance: that detail isn't listed in the information here, but you can ask about it directly when you call."* A firm in business since 1989 sounds unsure whether it is licensed. Maryland buyers expect an MHIC number on contractor advertising, and every lede names Montgomery County. Competitors show this proof: BOWA: *"We cover everything on the project for three years and all structural elements for 15 years"*. Landis: "65 TEAM MEMBERS", "Meet the Team".
- **Evidence:** `SCRATCH/shots-r2/roof-phone-messenger-answer.png`.
- **Cause:** `credentials` is `null` (`site.ts:20-23`), so `Footer.astro:15` and `contact-us.astro:15` show nothing, and no FAQ asks the question.
- **Fix (needs the owner, P0):**
  - DC licence number.
  - MHIC number, or stop naming Montgomery County.
  - Virginia licence, or narrow "Northern Virginia".
  - Insurance (certificate on request).
  - Current DOEE lead abatement-renovation certification and EPA RRP firm number.
  - Warranty terms, or the honest after-care policy if there is no warranty.
  - A photo and one line each for Italo and Eddie.
- **Honest interim, now (the owner approves the wording):** add to `/faqs/` and to the contact aside *"Are you licensed and insured? Ask us for our licence numbers and certificate of insurance on the first call, and check them before you sign with any contractor."* Give Fin the same answer so it stops saying "isn't listed".

### 3.2 Nothing on the page is something only I.S. could say (all personas)
- **The headline:** "Your home. In good hands." (`Hero.astro:55-59`) was approved by the owner, but I recommend replacing it. Any firm could say it, and it echoes Allstate's "You're in good hands", so it reads like insurance. Case's "Built around the way you live." and BOWA's "A better remodel begins with BOWA" are just as generic, so nobody owns the first line yet, and I.S. could.
- **The statement:** "One team designs it, prices it and builds it." (`index.astro:26`) is the design-build pitch every competitor makes.
- **"In-house" is unconfirmed.** It is the differentiator the site repeats (10 times as "in-house" or "own team": `index.astro:39`, `:84`, `:89`, `Span.astro:16`, `content.json:10`, `:52`, `:57`, `:148`, `:474`, `:486`; plus "The team you meet at the start is the team that finishes the job.", `:491`), but it is not among the owner's confirmed facts. If a buyer later meets a subcontracted electrician, it reads as a broken promise.
- **What is true and buried in excerpts:**
  - Co-founder Eddie Migues is named in reviews from 2020 to 2026: *"Eddie was there pretty much every day checking on the progress"* (Jackson, May 2021); *"Eddie & his team were terrific to work with"* (Dean, January 2026).
  - One firm for the kitchen, the roof, the leak-damaged ceiling and the lead paint. None of the three design-build sites I read leads with roof repair or lead work.
  - Straight bids: *"didn't beat around the bush, or try to sell me a dream"* (Peyton).
  - DC permits and zoning (Gerami, Jackson).
- **Fix (the H1 needs owner approval; the rest can be done now):**
  - H1: either option A, *"Kitchens to roofs. One DC firm since 1989."* (it matches the existing band "From the kitchen to the roof.", `index.astro:202`), or option B, keep the H1 and change only the lede.
  - Lede (`Hero.astro:60`), now: "Kitchens, bathrooms, whole-home renovations, additions and roofs across DC, Northern Virginia and Montgomery County. We handle the design, the permits and the build." Replace with: *"Design, permits and build for kitchens, bathrooms, additions and whole homes, plus roofs and lead-safe work. Founded in 1989 by Italo Rodriguez and Eddie Migues. Eddie is the name you'll read again and again in our Google reviews."*
  - Facts strip and proof line: replace "In-house / One team, first visit to final walkthrough" (`index.astro:39`) and "One in-house team" (`:89`) with *"Founders / Italo Rodriguez and Eddie Migues, since 1989"* until the owner confirms which trades are really in-house.
  - Home reviews: lead with Jackson (`index.astro:218` → `['jackson','solerPrice']`).

### 3.3 Roof leak at night: the page promises "today", and the phone takes a message (C)
- **What the buyer meets:**
  - The closing says "Roof trouble? / Call us today." (`content.json:467-468`), and the hero says "Call or send photos, and we'll tell you whether to repair or replace." (`:406`).
  - The after-hours truth comes only in the third FAQ: "Outside office hours, leave a message with your address and phone number." (`:461`). The hours appear only in the footer (`site.ts:12`), and `docs/site-standard.md` still lists them as unconfirmed.
  - "Send photos of your roof" (`content.json:407`) and "Send details and photos" (`Cta.astro:19`) open a form with no way to attach a photo (`contact-us.astro:28-41`). The photo route is buried in an FAQ: "Email them to info@isenterprises.net" (`content.json:457`).
  - Intercom pops up "Hi! 👋 How can I help?" over the roofing page and opens with *"Hi there! You're speaking with IS AI AI Agent. I'm ready to assist you."* ("AI" is doubled, and "IS AI" is not the firm's name). The chat does accept photos.
  - Fin's actual answer was accurate (call, or leave a message out of hours), then it asked for a name but not a phone number or address.
  - Search listings for DC roof-leak repair are full of firms advertising 24/7 response, and one prints its DC licence number in its header.
- **Evidence:** `SCRATCH/shots-r2/roof-phone-initial.png`, `roof-phone-messenger.png`, `roof-phone-messenger-answer.png`.
- **Fix, now:**
  - Roofing lede: *"Roof leaking? Call (202) 519-1831. Outside office hours, leave your address and number and we'll call you back."* Add when ("first thing next business day") once the owner confirms it.
  - Closing: *"Water coming in? / Call (202) 519-1831."*
  - "Send photos of your roof" → *"Email photos of your roof"*, linking to `mailto:info@isenterprises.net?subject=Roof%20photos`. `Cta.astro:19` "Send details and photos" → *"Send details"*.
  - A three-line "Until we get there" box: *"Move belongings away from the drip and catch it in a bucket. Keep clear of a sagging ceiling and of light fittings with water in them. Take photos for your insurer."*
  - In Intercom's settings (no code): name the agent "I.S Design + Build", greet with *"Hi. For a roof leak, call (202) 519-1831. I can answer questions about our work and how a project runs."*, and ask for the phone number and address on leak questions.
- **Needs the owner (P0):** does anyone answer or return calls after hours, and when? That single line wins or loses C.

### 3.4 Lead paint: written for renovators, not for the landlord who needs the work done (D)
- **What the buyer meets:**
  - The H1 "Older home? Plan for lead paint early." (`content.json:804`) and the lede (`:805`) speak to someone planning a renovation.
  - The note "Lead inspections and risk assessments are carried out by a licensed inspector or risk assessor." (`:839`) reads to a landlord as "not us".
  - The URL says abatement; the words never offer it.
- **Lead paint is missing from:**
  - the services list (`site.ts:25-31`), which feeds the home page's "What we build";
  - the hero lede;
  - the footer line "Kitchens, bathrooms, whole homes, additions and roofs." (`Footer.astro:13`);
  - the form options (`contact-us.astro:28`). The page sends `service=other`, so the form says "Something else".
  - In the menu it appears only as "Planning › Lead paint in older homes" (`Header.astro:4`).
- **The best lead proof is unused:** Shedd, *"They also facilitated last minute lead testing so that we could return home as soon as possible."* (`reviews.ts:39`), appears only on `/reviews/`.
- **Nothing for landlords:** DOEE tells landlords to hire a DC-certified abatement-renovation contractor and to submit a clearance report when there is a DOEE order or notice, and the page mentions neither.
- **Commercial and government work** are confirmed lines (`docs/business-context.md:10`) but appear nowhere on the site.
- **Fix, now:**
  - H1: *"Lead-paint abatement and lead-safe renovation."*
  - Lede: *"For DC homes and rentals built before 1978. We plan containment, dust control and clean-up into the scope, and the job ends with clearance testing."* (The reviews support this; the owner confirms it is standard.)
  - Add a "Renting it out?" point: *"Tell us if you have a DOEE notice or order, a risk-assessment report, or a date the unit must be ready."*
  - Add Shedd to `content.json:843-845`.
  - Add "Lead paint" to the form select, the `Cta.astro:11` pills and the footer line.
  - Add an FAQ: *"Do you take commercial and government work? Yes. Call (202) 519-1831."*
- **Needs the owner (P0 for D):** current DOEE and EPA RRP certification. The business context says DC's register listed the company for residential, commercial and child-occupied facilities. Confirm that it is current, then say so on this page.

### 3.5 No anchor for money or time, and the budget question is hidden (A, B)
- **What the buyer meets:**
  - Price: "Not an accurate one…" (`content.json:697-698`). Time: "It depends on the scope, permits…" (`:126-127`).
  - The budget question is tucked under "More details (optional)" (`contact-us.astro:35-37`).
  - The site never explains whether the estimate becomes a fixed price, or whether the first visit is free.
- **What competitors publish:**
  - Landis: *"Hall Bathroom … $50,000 to $90,000"*, *"Kitchens … $150,000 to $300,000+"*, *"ONE STORY Addition … $200,000 to $350,000"*, *"Our design work is billed at $175 per hour"*.
  - BOWA sells "Purchase Consultations".
- **Effect on A:** the home page's "We did receive cheaper quotes from other companies" tells A that I.S. is not the cheapest, but never what it costs.
- **Needs the owner (P1):** typical ranges from past DC jobs (kitchen, bathroom, addition), typical durations, whether the first visit is free, and whether the agreed price is fixed. A free visit or a fixed price would be the single strongest line against BOWA and Landis.
- **Now:**
  - Move the budget question into the main form as bands (*Under $50k / $50–150k / $150–300k / Over $300k / Not sure yet*), labelled *"Roughly what budget do you have in mind?"*.
  - Put Laurion's *"I think the pricing was fair and the few change orders we had were legitimate and reasonable"* beside the cost FAQs (`content.json:118-123`, `:697`).

### 3.6 "We'll be in touch", but when, who, and at what cost? (all)
- **What the buyer meets:**
  - The contact intro says "Five quick questions. Then we'll be in touch to talk it through." (`contact-us.astro:9`), step 02 says "We get back to you to talk it through." (`:21`), and the success message says "We'll reply using the contact details you gave." (`:42`). No timing, no name, no cost.
  - The quote at the moment of commitment is Yu's, ending "set realistic expectations when some supplies were delayed by vendors" (`contact-us.astro:6`): a delay story.
  - The desktop header has no phone number (`Header.astro:17` shows it only in the phone menu; `content.css:6`; `SCRATCH/shots/desktop/home/00.png`). On the home page the number appears only as "Roof leak? Call (202) 519-1831" (`Hero.astro:60`), so a remodeling buyer reads it as the leak line.
- **Fix, now:**
  - Intro: *"Five quick questions. Prefer to talk? Call (202) 519-1831."*
  - Add the reply time once the owner gives one (needs owner, P1).
  - Swap the quote for Peyton (`reviews.ts:27`): *"When Eddie followed up with me about his bid he didn't beat around the bush, or try to sell me a dream. He was direct, honest, and transparent…"*
  - Put the phone number in the desktop header next to "Start a project".
  - Add "Call (202) 519-1831" as the second hero action on the home page.

### 3.7 The best reviews are not placed beside the objection they answer (now, P1)
| Page | Now | Change | Objection answered |
| --- | --- | --- | --- |
| Home (`index.astro:218`) | yu, solerPrice | lead with **jackson** | Who is actually on my job? |
| Contact (`contact-us.astro:6`) | yu | **peyton** | What happens after I ask for a bid? |
| Lead paint (`content.json:843`) | solerLead | add **shedd** | Testing; getting the family home fast |
| Bathroom (`content.json:191`) | laurion | add **day** (grab rails, stair lift) | The "as we get older" FAQ |
| Additions (`content.json:368`) | jackson, designer | add **gerami** | "Do additions require permits?" |
| Whole-home (`content.json:283`) | peytonResult, hoftijzer | add **dean**, **solerAway** | Hard schedules; owners living away |
No home excerpt says who "Eddie" is; the lede in 3.2 fixes that.

### 3.8 Additions, whole homes and the portfolio: claims with no project behind them (B)
- **Additions:** the page has no gallery (`content.json:336-391`), and no review or caption describes an addition. "Built to belong." claims what nothing on the page shows.
- **Design:** "We handle the design" (`Hero.astro:60`) never says who designs: an architect, an in-house designer, an engineer? Case names "our architects, designers, and craftspeople".
- **Portfolio:** photographs are captioned by room only ("Kitchen", "Bathroom"; `photos.ts:32-55`), so a buyer cannot tell one project from twenty, or judge the scale.
- **Needs the owner (P1):** who designs and with what credentials; any addition or whole-house projects with neighbourhood, scope and year; which photographs belong to which project.
- **Now:**
  - Portfolio intro: *"Photographs from our own recent projects in Northeast DC. Captions name the room."* (The owner confirms the location, which comes from the brief.)
  - Additions: lead with the evidence that exists, permits and zoning (Jackson, Gerami) and the four-storey new home (the designer's review). H1: *"More room, with the permits handled."*, backed by the page's own FAQ "We find out which approvals your project needs and handle the applications".

### 3.9 Navigation hides the proof and the answers buyers hunt for (P1)
- **Hidden proof:** Reviews, the strongest asset, sit one level down under "About" (`Header.astro:5`).
- **Hidden answers:** lead paint and the FAQs sit under "Planning" (`Header.astro:4`), and there is no entry for cost.
- **Northern Virginia:** the service-areas page hedges ("Send your location and we will confirm coverage.", `content.json:609`), while every lede names Northern Virginia with confidence.
- **Fix:**
  - Now: make "Reviews" a top-level link, and list "Lead paint" with the services.
  - Needs the owner: name the Virginia towns served, or drop Northern Virginia from the ledes.

### 3.10 Facts a buyer will cross-check
| Item | Where | What the buyer makes of it | Fix |
| --- | --- | --- | --- |
| Email `info@isenterprises.net` on isdesignandbuild.com | `site.ts:10`; contact intro; FAQs `content.json:457`, `:714` | It looks like a different or abandoned company; a mismatched email domain is what scams look like. | Now: label it *"(our long-standing I.S. Enterprises address)"*. The owner chose this address on 17 Nov; I propose plainly that he add `info@isdesignandbuild.com` to the same inbox and show that instead (needs owner). |
| Name spellings | Site "I.S Design + Build"; Google "I.S Design+Build" (`reviews.ts:1`); chat "IS AI"; Hearth link `partners/is-enterprises` (`content.json:743`) | "I.S" without its second dot reads as a typo beside "I.S. Enterprises". | The owner fixes one spelling and uses it on Google and in Intercom (P2). |
| Hours "Monday to Friday, 9:00 AM to 5:00 PM" | `site.ts:12` | The roofing promise in 3.3 depends on them. | Confirm with the owner (see `docs/site-standard.md`, "Still needed"). |
| Process | 5 steps on home (`site.ts:33-39`), 6 on `/our-process/` (`content.json:533-558`), 3 on contact (`contact-us.astro:19-23`) | Three versions of "our process". | Now: one six-step list; home and contact quote it word for word. |
| Privacy policy, "Last updated 15 November 2026" | `privacy-policy.astro:5-6` | It does not mention the Intercom chat added on 17 Nov, but does say that typed contact details may go to Google "in an encoded (hashed) form". | Now: add a "Chat" paragraph (Intercom stores the conversation, its AI answers first, the team reads it). The owner decides whether the hashing setting is worth that paragraph. |

### 3.11 The ledes spend their first words on geography, and some headlines are slogans (now, P2)
"…in Washington, DC, Northern Virginia and Montgomery County" appears 10 times in `content.json` (e.g. `:10`, `:57`, `:153`, `:245`, `:334`, `:406`), in the sentence where the buyer looks for the promise. Move the area into the label line, then:
| Page | Now | Replace with (no new facts) |
| --- | --- | --- |
| Roofing H1 (`:405`) | Roof repair and replacement. | *Roof leaks fixed, ceiling included.* (from `:426` and Green's review) |
| Additions H1 (`:333`) | More room for the life you have. | *More room, with the permits handled.* |
| Kitchen lede (`:57`) | Kitchen remodeling in Washington, DC, … We design it with you… | *We design it with you, agree the scope and the estimate before we start, then build it.* |
| Bathroom lede (`:153`) | Bathroom remodeling in Washington, DC, … from a powder room… | *From a powder room to a primary suite. We plan the plumbing, ventilation and waterproofing with the tile you'll see.* |
| Service areas H1 (`:589`) | Home projects across the DC area. | *DC, Montgomery County and Northern Virginia.* |
| FAQ H1 (`:671`) | Useful answers before you start. | *Cost, permits, timing, lead paint: straight answers.* (only once 3.12 is done) |

### 3.12 The FAQs and guides answer the easy questions, not the ones buyers ask (P2)
- **FAQs:** `/faqs/` (`content.json:676-716`) has 7 questions: services, small jobs, area, drawings, price, out of town, how to call. Missing:
  - licence and insurance, warranty;
  - permits (the answer already exists at `:384`), living at home (`:304`), lead paint (`:131`);
  - who will be in my house, deposit and payment schedule, how soon you can start;
  - working with my architect or designer (supported by the Four Twelve Interiors review);
  - roof insurance claims, commercial work.
- **Guides:**
  - There are 4 (`articles.json`), all dated 7 November 2026, two of them about Georgetown, where none of the personas lives.
  - The byline is the company, not a person.
  - The advice is generic ("Walk through making breakfast…"), and none covers cost, permits, lead or leaks.
- **Fix:**
  - Now: copy the existing answers into `/faqs/`, and ship the rest as the owner answers them.
  - Next guides: *Permits for a DC rowhouse renovation*, *Lead paint rules for DC landlords*, *A roof leak at night: what to do before the roofer comes*, bylined Eddie Migues once he approves.

## 4. Fix list

| ID | P | What to change | Where | Now / owner |
| --- | --- | --- | --- | --- |
| B1 | P0 | Licences (DC, MHIC, VA), insurance, warranty or after-care, DOEE and RRP certification, founders' photos; fill `credentials` | `site.ts:23`, `Footer.astro:15`, `contact-us.astro:15`, lead page | **Needs owner** |
| B2 | P0 | Interim FAQ "Are you licensed and insured? Ask us for our licence numbers and certificate of insurance…"; teach Fin the same answer | `content.json:679`, Intercom | **Now** (owner approves wording) |
| B3 | P0 | Specific home H1 (option A) or keep the H1 with the new lede; founders in the lede; "Founders" replaces the unconfirmed "In-house" stat | `Hero.astro:55-60`, `index.astro:39`, `:89`, `Span.astro:16` | H1 **needs owner approval**; the rest **now** |
| B4 | P0 | Roofing: out-of-hours line in the hero, "Water coming in? / Call…" closing, "Email photos" link, "Until we get there" box | `content.json:406-407`, `:461`, `:467-468`, `Cta.astro:19` | **Now**; callback time **needs owner** |
| B5 | P0 | Intercom: agent name, greeting with the phone number, ask for phone and address on leaks; remove "IS AI AI Agent" | Intercom settings | **Now** (owner's Intercom login) |
| B6 | P0 | Lead page: abatement H1, landlord point, Shedd review; lead paint in the form, pills, footer and services menu | `content.json:804-845`, `contact-us.astro:28`, `Cta.astro:11`, `Footer.astro:13`, `Header.astro:3-4` | **Now**; certification **needs owner** |
| B7 | P1 | Contact: Peyton quote, "Prefer to talk?" line, reply time; phone in desktop header; call link in home hero | `contact-us.astro:6`, `:9`, `:21`, `:42`, `Header.astro:17-19`, `Hero.astro:60` | **Now**; reply time and who calls **need owner** |
| B8 | P1 | Budget bands in the main form; Laurion quote beside the cost FAQs | `contact-us.astro:35-37`, `content.json:118-123`, `:697` | **Now** |
| B9 | P1 | Price ranges, durations, first-visit cost, fixed or not | FAQs, service pages | **Needs owner** |
| B10 | P1 | Move reviews per table 3.7 | `index.astro:218`, `content.json:191`, `:283`, `:368`, `:843` | **Now** |
| B11 | P1 | Who designs; addition and whole-house projects; portfolio grouped by project; interim portfolio line | `content.json:336-391`, `:643`, `photos.ts` | **Needs owner**; interim **now** |
| B12 | P1 | Reviews top-level; lead paint with the services; Northern Virginia towns or drop | `Header.astro:3-5`, `content.json:609` | Nav **now**; towns **need owner** |
| B13 | P1 | Label the email now; owner adds an `@isdesignandbuild.com` address | `site.ts:10`, `Cta.astro:23`, `Footer.astro:14` | **Now** + **owner** |
| B14 | P1 | Privacy: chat paragraph; decision on the hashed-data setting | `privacy-policy.astro:5-6` | **Now** + **owner decision** |
| B15 | P2 | Commercial and government FAQ line | `content.json:676-716` | **Now** (confirmed fact) |
| B16 | P2 | One process list everywhere | `site.ts:33-39`, `content.json:533-558`, `contact-us.astro:19-23` | **Now** |
| B17 | P2 | Ledes without geography; headline rewrites per table 3.11 | `content.json` | **Now** |
| B18 | P2 | Complete FAQs; three guides on permits, landlord lead rules and roof leaks | `content.json:676-716`, `articles.json` | **Now** + **owner** |
| B19 | P2 | One brand spelling on site, Google and Intercom | `site.ts:6`, Google profile, Intercom | **Needs owner** |
| B20 | P2 | Close the one test conversation from this review (19 Nov, about 10:37 UTC, /roofing/) | Intercom inbox | **Owner** |

Sources outside the repo: bowa.com and bowa.com/client-aftercare/; landisconstruction.com and landisconstruction.com/pricing-and-financing; casedesign.com; doee.dc.gov lead guidance for landlords and certification. Roofer claims come from search listings only and should be read as indicative.
