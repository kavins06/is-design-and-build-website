# I.S Design + Build: business context

Working notes for planning the new website. Compiled 2026-11-11 from the live site, the two GitHub repos, the original WordPress content, and public listings. Items marked **(unverified)** come from old marketing copy or third-party listings and need the owner's confirmation before they appear on the new site. Open questions are collected at the end.

## 1. The company in one paragraph

I.S Design + Build is the new consumer brand of **I.S. Enterprises, Inc.**, a Washington, DC general contractor founded in 1989 by Italo Rodriguez and Eddie Migues. It sells **design-build residential remodeling** (design, permits and construction under one roof) to homeowners in DC, Maryland and Virginia, with a Georgetown office address. Its two distinguishing lines beyond ordinary remodeling are **roofing** and **lead-paint abatement**, the latter backed by EPA / DC certification.

## 2. Identity and contact details

| Item | Value | Notes |
| --- | --- | --- |
| Brand name | I.S Design + Build | Also written "I.S Design+Build", "I.S. Design & Build". Pick one spelling. |
| Legal / legacy name | I.S. Enterprises, Inc. | Still used on listings, email domain, YouTube, financing partner pages. |
| Tagline in use | "Designed Around You" | Also "Transforming spaces with Quality and Expertise". |
| Core promise | "We handle the Design, Permits & Building" | |
| Address | 1010 Wisconsin Ave NW, Suite 300 #12, Washington, DC 20007 | Georgetown. Looks like a shared-office suite. |
| Phone (live site) | (202) 519-1831 | |
| Phone (older build, DC listings) | (202) 388-6799 | Which is current? |
| Email | info@isenterprises.net | Email for the new domain runs on Google Workspace. |
| New domain | isdesignandbuild.com | Registered 2026-10-19. |
| Old domain | isenterprises.net | Still live (WordPress). |
| Facebook | facebook.com/ISDesignDC | |
| YouTube | youtube.com/@ISEnterprisesRemodeling | |
| Earlier address (2017 listing) | 1324 8th St NE, Washington, DC | **(unverified)** |

## 3. History and people

- Founded **1989** by **Italo Rodriguez** (President) and **Eddie Migues** (Vice President).
- Origin story: construction and design experience combined with supplying general-contracting supplies.
- Old copy says "one of three Washington-owned businesses ... EPA Certified to remove lead-based paint hazards". The meaning of "one of three" is unclear.
- The rebrand to I.S Design + Build happened in 2026 with the new domain.

### Conflicting numbers in existing copy

| Claim | Where | Problem |
| --- | --- | --- |
| Founded 1989 | About page, BBB, MapQuest | That is 37 years. |
| "20+ years of experience" | Stats blocks | Contradicts 1989. |
| "Over a decade" / "over 10 years" | Home, location pages | Contradicts both. |
| "More than 300 projects" | About page | **(unverified)** |

## 4. Services

| Service | What the current copy says | Notes |
| --- | --- | --- |
| Kitchen remodeling | Layout, cabinetry, countertops, lighting, fixtures, flooring, finishes | Flagship. A 12 MB assembled-cabinet catalog PDF (shaker, accent colours, raised panel) is linked from this page. |
| Bathroom remodeling | Design, showers and tubs, vanities, storage, tile | |
| Whole-home remodeling | Coordinated layout, materials and scope across rooms | Added on the live site. |
| Home additions | Purpose, connecting old and new, zoning and feasibility | No own-project photos exist. |
| Roofing | Inspection, repair, replacement, maintenance; shingle and metal | Instant quote widget via Instant Roofer. |
| Lead-paint abatement | Assessment, abatement, safety protocols, post-abatement testing | The clearest differentiator; certification is the proof. |
| Financing | Third-party: HFS Financial and Hearth | Partner links are under the I.S. Enterprises name. |

Third-party listings (Angi, HomeAdvisor) also mention painting, exterior remodeling, home maintenance, outdoor living, green building, and Andersen windows. **(unverified)**

The older Vercel build added **Government** and **Commercial** sector pages. They contained scoping copy only, with no contracts, clients or qualifications claimed. DC's lead-abatement register does list the company for residential, commercial and child-occupied facilities.

## 5. Process

The live site describes seven steps:

1. Start with a conversation
2. Consultation and site visit
3. Design and material direction
4. Scope and estimate
5. Review and agreement
6. Construction and communication
7. Walkthrough and next steps

A 40-second "customer experience" video sits on the process page.

## 6. Service area

- Stated area: Washington, DC, Maryland and Virginia, "based in Georgetown".
- Both known portfolio projects are in **Northeast DC**, and nearly all of the old location pages target NE / SE DC neighbourhoods (Brentwood, Kingman Park, Barney Circle, Near Northeast, Navy Yard, Edgewood, and so on).
- The old site carried **318 neighbourhood landing pages**: 153 roofing, 46 kitchen, 46 bathroom, 46 "custom", 27 "top". They are templated SEO pages with invented-sounding testimonials. The live site kept 11 of them.

## 7. Proof and credibility

| Asset | Status |
| --- | --- |
| Portfolio | Two real projects: **643 Girard St NE** and **1326 Montello Ave NE #1**. The live site shows 7 photos; the old repo holds about 60 images, including more Girard St shots (kitchens, bathrooms, rooftop deck). |
| Lead certification | DC DOEE listed the firm for abatement and renovation (ID DC18-8929). The latest listing found expired **2023-09-28**; current status needs confirming. |
| Reviews | HomeAdvisor about 4.9 from 17–22 reviews (snapshots vary); Angi and BBB listings exist. None are on the site. |
| Testimonials on site | Placeholders only ("John Doe, Homeowner, New York"). |
| Awards section | Placeholder lorem ipsum. |
| Licences, insurance, warranty | "Licensed professionals" is asserted; no licence numbers shown. Angi says no warranties offered. **(unverified)** |
| Team photos, founder story | None. |
| Before / after photos | A before/after plugin exists but no real pairs. |

## 8. The existing websites

| Site | What it is |
| --- | --- |
| **isenterprises.net** | Original WordPress + Elementor site, 399 routes, still live. |
| **isdesignandbuild.com (live)** | ChatGPT Sites build, 32 pages. A patchwork: some pages rewritten cleanly (process, FAQ, whole-home, additions), others are the old WordPress pages carried over with their placeholders. |
| **`kavins06/isdesignandbuild`** | Earlier no-framework rebuild (435 pages) on Vercel, not serving the domain. Useful as an archive of content and images. |
| **`kavins06/is-design-and-build-website`** | The new Astro project (this repo). |

Problems visible on the live site today:

- Placeholder testimonials, lorem-ipsum awards, and a stats block repeating "20+ years" eight times.
- FAQ blocks where every answer is the same sentence.
- Contact form posts through FormSubmit; older WordPress forms on carried-over pages no longer work.
- Mixed voice: careful, hedged copy on new pages next to generic "dream kitchen" copy on old ones.
- Inconsistent brand spelling, phone number, and years in business.

Integrations currently in use: FormSubmit (contact form), Instant Roofer (roof quotes), HFS Financial and Hearth (financing), Google Workspace (email).

## 9. Audience and positioning (my reading)

- **Primary buyer:** owners of older DC rowhouses and homes planning a kitchen, bathroom or whole-home renovation, who want one firm to handle design, permits and construction.
- **Secondary:** homeowners needing a roof repaired or replaced (faster, price-led decision), and owners or landlords of pre-1978 properties with lead-paint obligations.
- **Possible third:** commercial and government clients, if the company really pursues that work.
- **Strengths to build on:** 37 years in business, founder-led, design-build under one roof, certified lead work, real DC projects.
- **Gaps to fill:** real reviews, more project photography, people, licence details.

## 10. Open questions for the owner

1. **Name:** exact brand spelling, and should "I.S. Enterprises" appear anywhere (for example "formerly I.S. Enterprises, est. 1989")?
2. **Phone and email:** which number is right, and will email move to an @isdesignandbuild.com address?
3. **Years and volume:** can we say "since 1989"? Is "300+ projects" accurate?
4. **Priority services:** which lines bring the most revenue and which do you most want to grow? Are roofing and lead abatement core, or side lines?
5. **Commercial and government:** real lines of business with past work, or leave out?
6. **Service area:** where do you actually take jobs in Maryland and Virginia?
7. **Credentials:** current DC licence numbers, lead-abatement certification status, insurance, any warranty offered.
8. **Proof:** more project photos, before/afters, real client reviews we may quote, any awards.
9. **People:** who should be shown (founders, designers, project managers)? Are the founders still active?
10. **Leads:** what happens after an enquiry, who answers, and is the goal a call, a form, or a booked consultation?
11. **Keep or drop:** Instant Roofer quotes, HFS / Hearth financing, the cabinet catalog, the blog, the neighbourhood SEO pages.
12. **Old domain:** should isenterprises.net redirect to the new site?
13. **Look and feel:** any logo files, brand colours, or sites you admire?
