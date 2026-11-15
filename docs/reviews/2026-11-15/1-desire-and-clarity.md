> Saved from the 15 November 2026 review of commit 3b2f2ce. File paths under `/tmp/claude-0/…` (SHOTS, R) pointed at screenshots in a temporary working folder that no longer exists. Findings are as the reviewer wrote them; see [the summary note](../../review-2026-11-15.md) for what was changed.

# Review 1 of 3: Desire & clarity

Lens: what a homeowner sees, reads and feels. Buyers: (A) a Capitol Hill couple with a 1920s rowhouse planning a kitchen and two bathrooms ($150–250k), first on a phone from Google, then on a laptop, who have seen high-end DC design-build sites; (B) a retired Chevy Chase homeowner with a storm leak, on a phone.

Evidence. `SHOTS` = /tmp/claude-0/-home-user-is-design-and-build-website/deeb0a7f-b2e4-5b6d-979f-62b97e26adf8/scratchpad/shots-before. `R` = /tmp/claude-0/-home-user-is-design-and-build-website/deeb0a7f-b2e4-5b6d-979f-62b97e26adf8/scratchpad/review-1. New captures in R: hero openings filmed frame by frame (`timing-{home,kitchen,roofing}-{desktop,phone}.jpg`, labelled by milliseconds since navigation), laptop 1366×768 heroes (`laptop-*.jpg`), phone menu (`phone-menu-open*.jpg`), roofing contact form (`phone-contact-roofing*.jpg`), contact sheets of every company and stock photo (`photos-contact.jpg`, `stock-contact.jpg`). I also counted visible words and page heights with and without motion (`words.js`) and checked which photo appears on which built page.

---

## 1. Verdict

- **Impressed: 5/10.** On a laptop the first 10 seconds look designed, not like a template. The type, the black/white/orange palette and the drawn-then-built idea beat a typical DC contractor's WordPress site. Then it wears off: a stock render as the hero, the firm's own bright rooms darkened behind scribbled lines, the same dozen photos on every page, and the same six-part page eleven times. On a phone it starts lower (4/10): a dark, busy hero, and nothing on the first screen says "DC" or "since 1989".
- **Would shortlist and contact: 4/10** (the couple). The retiree with the leak: 5/10. The number is on screen and Montgomery County is named, so he may call anyway, but nothing tells him they handle urgent leaks.
- **Biggest reason: the site sells the drawing, not the house.** The most valuable image is a computer render the firm didn't build, and the site labels it "Design reference". Their real work is shown dark, repeated and thin: about 12 photos, nothing like a pre-war rowhouse, and no people. The best reassurance lines are buried on interior pages. So the buyer never sees enough real work, from real people, in homes like theirs, to want it.

What they see in the first 5 seconds:
- **Home, laptop** (`R/timing-home-desktop.jpg`). At 0.4 s, "Your home." sits alone on a black grid. The sub-line and orange "Start a project" are already there, which is good. A kitchen elevation draws itself. For about 2 seconds the headline reads "Your home. In good", an unfinished sentence. "hands." arrives at 3.6 s and the photo wipes in from 4.0 to 5.2 s. They think: stylish remodeler, and an insurance-ad headline. They keep going.
- **Home, phone** (`SHOTS/phone/home/00.jpg`, `R/timing-home-phone/t06503.jpg`). Headline and CTA fit on the first screen, which is good. The location line is hidden on phones (`src/styles/interior.css:133`). The drawing's lines cut through the headline and paragraph. The photo is a dark crop of two stool backs. They think: some remodeling company, not sure it's local.
- **/kitchen-remodeling/ from Google, phone** (`R/timing-kitchen-phone.jpg`). "A kitchen that works for you." sits over a grey, washed-out kitchen covered in random white lines. The firm's bright white kitchen is unrecognisable. The next five screens are a black line drawing. The first clear kitchen photo comes around screen 8.
- **/roofing/ from Google, phone** (`R/timing-roofing-phone.jpg`). "Take care of the roof over your home." sits over a dark stock street at dusk. The big orange button is a form ("Tell us about your roof"). The phone number is a small underlined link. He thinks: they do roofs, but will anyone come today?

---

## 2. What works — keep these

1. **The drawn-then-built idea** (home hero, desktop, `R/timing-home-desktop.jpg`). It says "we design, then we build" without a word, and the CTA is live from 0.4 s. Keep the concept. Fix the photo, the timing and the headline (C1, C2, M1).
2. **The home floor-plan process scene** (`SHOTS/desktop/home/03.jpg`–`08.jpg`). Bubbles become walls, a "SCOPE + PLANNING" stamp lands, fittings go in, and the finished kitchen opens in a circle. It explains design-build in ten seconds and is the best moment on the site. Keep it, at half the scroll length.
3. **A coherent visual system.** Geist type, restrained palette, fine rules, generous space, the large closing question and footer wordmark (`SHOTS/desktop/home/20.jpg`, `21.jpg`). It reads as one designed brand.
4. **Phone basics are right.** Headline and CTA sit in the first screen. The fixed Call / Start a project bar works. Services are photo tiles, the process is stacked cards, the menu is full screen (`R/phone-home-08-15.jpg`, `SHOTS/sheets/phone-our-process.jpg`).
5. **CTAs carry context into the form.** "Tell us about your kitchen" and the closing pills preselect the project type. Roofing adds "Is water currently entering the property?" (`R/phone-contact-roofing.jpg`).
6. **A short, human form.** "What are you planning?", "Where is the property?", "Tell us a little about the work." Timing and budget are tucked away as optional, and the budget placeholder says "Not sure yet is fine" (`SHOTS/desktop/contact-us/01.jpg`).
7. **Lines that sound like a builder worth hiring.** Keep these and promote them:
   - "Repair it or replace it. We'll tell you which." (roofing)
   - "Please don't climb onto the roof." (roofing)
   - "Start with what isn't working." and "Drawings and inspiration help, but you don't need them to begin." (remodeling)
   - "We agree the scope with you before anything is built, so the estimate matches the work." (kitchen)
   - "Know what comes next." and "You don't need every detail decided." (process)
   - "The team you meet at the start is the team that finishes the job." (about)
   - "More room for the life you have." (additions)
   - "What's behind the walls: Plumbing, ventilation and waterproofing, planned with the finishes." (bathroom)
8. **The Eun Mi Yu excerpt** on About: "Eddie also made some great suggestions to improve the remodel and set realistic expectations when some supplies were delayed by vendors." It is specific, names a founder, and answers "will they listen?" and "will they be straight with us?". These are the most persuasive words on the site, and the home page doesn't use them.
9. **Scene drawings that teach.** The kitchen work triangle, the bathroom waterproofing and exhaust callouts, the addition site plan with lot line and new opening, and the lead-paint facade marking a "contained work area". They help a homeowner understand. They just take too long (H7).
10. **The 404 page.** Friendly, on-brand, with two clear ways out.

---

## 3. What fails

### Critical

**C1. The home hero image is not their work: it is a stock computer render, and the site says so.**
- *Where:* home, desktop and phone (`SHOTS/desktop/home/00.jpg`, `SHOTS/phone/home/00.jpg`, `R/kit08-crop.jpg`). `src/components/Hero.astro:3` (stock `kit-08`) and `:56` (title block "IMAGE: DESIGN REFERENCE", desktop only).
- *What the buyer sees:* a dark walnut-and-black, European-style kitchen that looks computer-generated. It is: the textures are perfectly smooth, and it is soft when shown full width. Desktop labels it "Design reference" in orange. "Explore our work" then opens bright white rooms with light oak floors and waterfall islands, a different style and a different price feel. It feels like a bait-and-switch.
- *Why it loses the job:* the "drawn, then built" story implies "we built this". When the payoff is a render they didn't build, the firm's own metaphor works against it. Against DC design-build firms whose heroes are their own finished rooms, this reads as a template.
- *Fix:* **needs owner** for the ideal: one or two professionally photographed finished kitchens in an older DC house. Today, use the firm's strongest real photo, `kitchen-a` (walnut base cabinets, marble backsplash, waterfall island) or `bath-a` (black marble, brass round mirrors). Give it a hand-drawn elevation like the current one, not the OpenCV auto-trace. Keep it bright: a scrim behind the text only. Remove "Design reference" from the first screen once the photo is real.

**C2. The home headline and the first phone screen say nothing that wins the job.**
- *Where:* home hero (`src/components/Hero.astro:45–51`). The location line is hidden on phones (`src/styles/interior.css:133`).
- *What the buyer sees:* "Your home. In good hands." To an American that is Allstate's slogan, "You're in good hands", so the first words sound like an insurance ad. It doesn't say design-build, DC, 37 years, or why this firm. On a phone nothing on the first screen says DC or since 1989, so the couple can't tell whether this is a local firm. "…designed and built by one team. Roofing too." sounds like an afterthought. It cheapens the remodeling positioning and makes the roofing visitor feel secondary.
- *Why it loses the job:* in five seconds they need what, where and why you. They get a slogan.
- *Fix (copy):*
  - Eyebrow, on phone and desktop: **"Washington, DC area · Since 1989"**
  - H1: **"Designed and built by one team. In DC since 1989."** If the owner wants to keep the drawing motif: **"Drawn with you. Built by us. Since 1989."**
  - Sub-line: **"Kitchens, bathrooms, whole-home renovations and additions across DC, Northern Virginia and Montgomery County. We handle the design, the permits and the build."**
  - Actions: [Start a project] [See our work], and a small line below: **"Roof leak? Call (202) 519-1831"**
  - "One team" and "design, permits, build" repeat claims the site and the owner's core promise already make. Reviewer 2 checks them.

**C3. Too little of their real work is shown where it matters. The same photos repeat everywhere, none look like the buyer's house, and nobody is pictured.**
- *Where:* the whole site (`SHOTS/desktop/portfolio/01.jpg`, `SHOTS/sheets/desktop-kitchen-remodeling.jpg`). From the built pages:
  - `kitchen-a` appears on 8 pages: home, remodeling, kitchen, about, process, portfolio, guides index and the kitchen guide.
  - `living-a` and `bed-a` appear on 7 pages each, `kitchen-c` on 6.
  - The stock red-door rowhouse street (`town-05`) appears on roofing, service areas and as the lead-paint hero.
  - The kitchen page has 3 photos showing 2 kitchens. Additions has 2 photos of the same deck. The portfolio is 12 photos captioned only by room, under a "12 PHOTOGRAPHS" counter.
- *What the buyer sees:* by the third page on the laptop, the same walnut kitchen and the same white bedroom again. All the work is one style: bright new-build or gut-renovated units with staged furniture, shot like a real-estate listing. Nothing shows an older rowhouse that kept its character. There are no founders, no crew, no clients. They think: small portfolio, maybe a developer's builder; can they handle our 1920s house?
- *Why it loses the job:* desire comes from seeing work you'd want in your own home. At $150–250k, people shortlist firms whose work looks like their house.
- *Fix:* **needs owner:** 15–20 photos with permission to publish, in this order:
  1. Kitchens and baths in pre-war DC rowhouses
  2. Before/after pairs
  3. The founders and crew on site
  4. One or two real (anonymised) plans or renderings from a project, because every drawing on the site is marked "ILLUSTRATIVE"

  Honest fixes today:
  - Never show the same photo twice on a page, or as the hero of two pages a visitor sees one after the other. Swap `kitchen-a` out of About's founders section and the process end card.
  - On each service page show only photos for that service.
  - Remove the scarcity counters: "12 photographs" (`Portfolio.astro:18`) and "03 photos" (`Rail.astro:24`).
  - Fix the labels (M8).
  - Lead every gallery with the two strongest images, `bath-a` and `kitchen-a`.

### High

**H1. Interior page tops turn the firm's bright rooms grey and cover them in scribbles.**
- *Where:* every interior hero; worst on kitchen, bathroom, whole-home, portfolio and contact, which are the Google landing pages (`SHOTS/desktop/kitchen-remodeling/00.jpg`, `R/laptop-bathroom.jpg`, `R/timing-kitchen-phone.jpg`). The shade is `src/styles/scenes.css:17`: a gradient from 60% to 72% to 85% to 95% black. The lines are auto-traced by `scripts/trace-photos.py` into `src/data/traces.json`.
- *What the buyer sees:* the white waterfall-island kitchen becomes a dim grey room. The black-marble bathroom looks like smashed glass. On a phone the kitchen is unrecognisable. The auto-traced lines are not a drawing like the hand-drawn home hero; they look like a glitch.
- *Why it loses the job:* the "kitchen remodeling DC" landing page should show a kitchen they want in the first second. Instead the mood is heavy, the opposite of the airy rooms they would be paying for.
- *Fix:*
  1. Remove auto-traces from interior heroes. Keep the drafting motif for the home hero and the hand-drawn scene drawings.
  2. Replace the full-height dark gradient with a short scrim behind the text block only, so the top and right of the photo stay at full brightness.
  3. Set phone crops (`object-position`) to show each room's best feature, for example the kitchen-a island.

**H2. The roofing page doesn't serve someone with water coming in.**
- *Where:* /roofing/ on phone and desktop (`SHOTS/phone/roofing/00.jpg`–`05.jpg`, `SHOTS/desktop/roofing/00.jpg`). Copy is `src/data/content.json:317–381`. `"phone": true` (`content.json:326`) is ignored by `src/pages/[slug].astro:42`, so the form stays the primary button. The fixed phone bar always reads "Start a project".
- *What he sees:*
  - A dark stock street at dusk, labelled "Design reference" on desktop.
  - "Take care of the roof over your home.": soft, ad-like.
  - An orange form button and a small Call link.
  - Four screens of a cartoon gable-house drawing to reveal three one-line items. DC rowhouse roofs are mostly flat, so the drawing doesn't even match the couple's house.
  - A stock red-door street.
  - "Do you offer emergency service?" answered with "Call … and we will confirm availability", which reads as "maybe not".
  - "What roof materials do you work with?" answered with no materials.
  - A leak is not a "project".
- *Why it loses the job:* roofing is decided fast and on tone. The competitor whose page says "Leak? Call now" gets the call.
- *Fix:*
  - H1: **"Roof repair and replacement in the DC area."**
  - Lede: **"Leaks, storm damage or a roof at the end of its life, in Washington, DC, Northern Virginia and Montgomery County. Call or send photos and we'll tell you whether it needs a repair or a new roof."**
  - Buttons: primary orange **"Call (202) 519-1831"**, secondary **"Send photos of your roof"** linking to /contact-us/?service=roofing. Implement the existing `phone` flag.
  - Fixed phone bar on /roofing/: primary **"Call"**, secondary **"Send details"**.
  - Move "Repair it or replace it. We'll tell you which." up to the first screen after the hero.
  - Water damage item: **"We repair the stained ceiling and walls along with the roof, so you deal with one company."** The page already says "scoped with the roof"; owner to confirm.
  - Split label "Before you call" becomes **"When you get in touch"**. Don't set homework before an urgent call.
  - Emergency FAQ (**needs owner:** emergency and out-of-hours policy). Interim: **"Call (202) 519-1831 and say water is coming in. We'll tell you on the call how soon we can get there. Outside office hours, leave a message with your address and phone number."**
  - Materials FAQ: **needs owner** (only the roof types they really do: flat/low-slope, shingle, slate, metal). Until then, remove the question; a non-answer reads as evasive.
  - Imagery: **needs owner** (a crew on a DC roof, a repair before/after). Interim: lead with the house drawing, or the firm's own `roof-a` captioned "Rooftop deck from one of our projects", instead of a stock street.
  - Shorten the pinned drawing to about one screen. On phones, show the three items as a static list.

**H3. Generic slogans fill the most valuable lines on the site.** Replacements stay within the word budget.

| Where | Current | Proposed |
| --- | --- | --- |
| Home H1 (`Hero.astro:47–49`) | Your home. In good hands. | Designed and built by one team. In DC since 1989. |
| Home statement (`index.astro:29`, `:105`) | "Built around you" / Make room for what matters. / Tell us what you want to change. We'll show you what's possible. | "How we work" / One team designs it, prices it and builds it. / We agree the scope and the estimate with you before anything is built, so the price matches the work. |
| Home video band (`index.astro:214`) and About H1 (`content.json:388`) | Experience you can build on. | Home: cut the band (M7). About: Building in the DC area since 1989. |
| Gallery title on home and four service pages (`Rail.astro:6`, `index.astro:196`) | See the details come together. | Home: Rooms we've designed and built. Kitchen: Kitchens we've built. Bathroom: Bathrooms we've built. Whole-home and remodeling: From our completed projects. |
| Closing CTA on every page (`Cta.astro:4`; its `lines` prop is never set) | What would you like to change? | Home: keep. Kitchen: Let's talk about your kitchen. Bathroom: Let's talk about your bathroom. Whole-home: Ready to plan the whole house? Additions: Need more room? Let's look at it. Roofing: Roof trouble? Call (202) 519-1831. Portfolio: Want work like this in your home? Process: Ready for step one? Service areas: Is your home in our area? FAQs: Still have a question? Financing: Questions about paying for it? Lead paint: Older home? Let's plan it safely. About: Let's talk about your home. Guides: Ready to turn ideas into a plan? |
| Remodeling H1 and lede (`content.json:9–10`) | Remodeling, built around you. | One room or the whole house. Lede: Kitchens, bathrooms, whole-home renovations and additions in Washington, DC, Northern Virginia and Montgomery County, designed and built by one team. |
| Kitchen H1 and lede (`:45–46`) | A kitchen that works for you. / …planned around the way you cook, gather and live. | Keep the layout, or change everything. Lede: Kitchen remodeling in Washington, DC, Northern Virginia and Montgomery County. We design it with you, agree the scope and price before we start, and build it with our own team. |
| Kitchen split title (`:80`), once its line becomes the H1 | Keep the layout, or change everything. | Scope first, so the estimate matches the work. (keep its text) |
| Kitchen points title (`:53`) | The details that make the difference. | Four decisions that make a kitchen work. |
| Bathroom H1 and lede (`:120–121`) | A bathroom that makes every day easier. | Bathrooms that use every inch. Lede: Bathroom remodeling in Washington, DC, Northern Virginia and Montgomery County, from a powder room to a primary suite. We plan the plumbing, ventilation and waterproofing with the tile you'll see. |
| Whole-home H1 (`:193`) | Bring your home together. | The whole house, planned as one. |
| Whole-home point (`:209`) | What sits beneath the finishes is assessed before finishes are chosen. | We check structure, wiring and plumbing before you choose a single finish. |
| Portfolio H1 and lede (`:521–522`) | See the work, down to the details. / Completed projects from I.S Design + Build. | Rooms we've designed and built. Lede: Kitchens, bathrooms, bedrooms and outdoor spaces from our completed projects. (The current H1 promises details the page doesn't have.) |
| Footer (`Footer.astro:7`) | Home remodeling and roofing. Construction experience since 1989. | Kitchens, bathrooms, whole homes, additions and roofing. Designing and building in the DC area since 1989. |
| Terms H1 (`terms-of-service.astro`) | A starting point for your project. | Website terms. |

**H4. The home page doesn't answer the four feelings that decide the call; the best reassurance is buried elsewhere.**
- *Where:* home, all devices. The strong lines live on kitchen (`content.json:82`), about (`:402`, `:407`) and process (`:428`, `:449`, `:467`).
- *"Will this be a nightmare?"* The home page offers "Your home. In good hands." and vague step names. The real answers ("We agree the scope … so the estimate matches the work", "The team you meet at the start is the team that finishes the job", "Know what comes next") sit on pages most visitors never open.
- *"Will they listen?"* The Eun Mi Yu excerpt is only on About. The home and contact pages both use the more generic Lia Dean line ("high-quality work, with clear communication and strong attention to detail"), which could be about anyone.
- *"Can we afford them?"* Nothing on the home page. "Can you give me a price online? No." is curt. Financing is linked only from the footer.
- *"Will they show up and reply?"* Nowhere says what happens after you get in touch, or how fast. No faces.
- *Why it loses the job:* for a large, disruptive purchase, feeling the firm is safe decides which three firms get called. The site has the material and hides it.
- *Fix:*
  - Home order after the hero: proof strip, then the "How we work" statement (H3), then the shortened process scene with clearer steps (M4), then What we build, then the rooms gallery, then the Eun Mi Yu excerpt as the big quote (Lia Dean second, smaller), then the merged facts (M7), then the closing CTA with "What happens next" (H5).
  - Under the kitchen and bath cost questions add **"Prefer to spread the cost? See financing options."** linking to /financing/.
  - FAQs (`content.json:562–563`): **"Not an accurate one, because every house is different. Tell us what you want to change and, if you have one, a budget range. We'll talk it through and price the work once we've seen the house."** Owner to confirm pricing follows a visit, as process steps 2–3 imply.
  - **Needs owner:** reply time, whether the first visit is free, who the client's day-to-day contact is, founder photos.

**H5. The path to enquiry ends without saying what happens next.**
- *Where:* closing CTA (`Cta.astro:11`, "Next step: Tell us what you have in mind") and the contact page (`contact-us.astro:8`, `:10–14`, `:23`, `:33–34`; `SHOTS/desktop/contact-us/00.jpg`–`01.jpg`, `R/phone-contact.jpg`, `R/phone-contact-roofing-2.jpg`). Phone menu: `R/phone-menu-open*.jpg`.
- *What the buyer sees:*
  - The closing band has six outlined pills and no filled button.
  - The contact page opens with "A few details is all we need to start.", a grammar slip on the page that has to earn trust.
  - On a phone the reassurance (1989, the review, the address) sits below "Send enquiry".
  - Nothing says who reads it, when they'll reply, whether there's a visit, or whether it costs anything.
  - The roofing help text reads: "For a time-sensitive issue, call to discuss availability. This does not request emergency attendance." It is cold and legalistic.
  - The phone menu has no "Start a project", and the fixed bar hides while the menu is open (`interior.css:126`, `:141`).
- *Why it loses the job:* anxiety peaks at the last step. An unanswered "and then what?" costs the comparison shopper.
- *Fix:*
  - Contact intro: **"Five quick questions. Then we'll get in touch to talk it through."**
  - A "What happens next" block, beside the form on desktop and above it on phones:
    1. **"You tell us about the house and what you want to change."**
    2. **"We get back to you to talk it through."** Add **[needs owner: by when]**.
    3. **"If it's a fit, we visit the house and start on the scope and estimate."**
  - Put the review and "since 1989" above the form on phones, and use the Eun Mi Yu excerpt here.
  - Roofing help text: **"If water is coming in now, call (202) 519-1831. It's faster than this form. Sending the form doesn't book a visit."**
  - Button: **"Send my project details"**.
  - Confirmation: **"Thanks, we have your project details. We'll get back to you [needs owner: by when]. If it's urgent, call (202) 519-1831."**
  - Closing band: add a filled orange "Start a project" under the pills. Change "Next step: Tell us what you have in mind" to **"Next step: A short call to talk it through."**
  - Form options: merge "Remodeling — still exploring", "Something else" and "Not sure yet" into "Not sure yet" and "Something else".
  - Phone menu: add an orange "Start a project" and a "Call (202) 519-1831" row at the top.
  - **Needs owner:** if the first visit is free, put **"The first visit is free."** beside the button. It is the most reassuring line a contractor can add.

**H6. The About page shows no people, and opens on a stock photo of a stranger wearing another company's logo.**
- *Where:* /about-us/ (`SHOTS/desktop/about-us/00.jpg`, `R/draw02.jpg`). Copy `content.json:383–421`. Stock `draw-02` is a widely used free photo; the man's polo shirt says "KRA". The founders section uses a kitchen photo.
- *What the buyer sees:* "Is that a founder? Why does his shirt say KRA?" Then a 37-year dimension line, a stock carpenter labelled "Design reference", a good review, and "Italo Rodriguez and Eddie Migues. The names clients mention again and again in their reviews." next to a kitchen. No faces, no roles, no story; about 180 words.
- *Why it loses the job:* in design-build the people are the product. "Will they listen? Will they show up?" is answered by faces and a voice.
- *Fix:* **needs owner:** portraits of Italo and Eddie on a job site; 3–5 sentences in their own words (how they started in 1989, what they insist on in a job); who the client deals with day to day; what "I.S" stands for. Today:
  - Hero: a company photo, never a stranger in a branded shirt.
  - H1: **"Building in the DC area since 1989."**
  - Lede: **"Founded in 1989 by Italo Rodriguez and Eddie Migues as I.S. Enterprises. Now I.S Design + Build."** Add **"Same founders, new name."** only if the owner confirms both still lead projects.
  - Make the Eun Mi Yu excerpt the centrepiece.
  - Until portraits exist, replace the kitchen photo in the founders section with a large type statement.

**H7. Every page is the same long template, and the motion that wows on the home page becomes a wait by the fourth page.**
- *Where:* all service pages, service areas and lead paint (`SHOTS/sheets/desktop-*.jpg`). Desktop page heights, with motion vs without (reduced motion):
  - Home: 15,920 px vs 10,474 px (about 18 vs 12 screens).
  - Kitchen: 10,683 px vs 6,556 px (about 12 vs 7 screens) for about 169 words before the questions.
  - Whole-home: 19 screens.

  Every page runs the same sequence: dark hero, 4–5 screens of pinned drawing, photo band, sideways gallery titled "See the details come together.", questions, "What would you like to change?", footer. Each page also plays a 0.65 s page transition and a 2-second drafting intro. On phones the drawings are pinned too (kitchen phone screens 1–6), with labels about 6 px high.
- *What the buyer sees:* by the third service page they recognise the template and skim. Pinned sections feel stuck; the "Keep scrolling" hints are a symptom. Every page makes them wait for the photo again.
- *Why it loses the job:* sameness reads as a template, the opposite of the owner's "nothing generic" brief, and it spends attention they would otherwise give the portfolio and the form.
- *Fix:*
  1. Cap pinned scenes at about 1.5–2 screens: the home process from `+=420%` to about `+=200%` (`home.ts`), and PlanStory from `n×80%` to about `n×45%`.
  2. On phones, show the drawing once, static, with the points as a plain list.
  3. Play the drafting intro once per visit; later pages open on the photo with a short fade.
  4. Vary the pages: kitchen gets a materials strip or a before/after (needs owner); bathroom leads with "what's behind the walls"; roofing leads with the phone and "repair or replace"; additions leads with the site-plan drawing.
  5. Use the per-page closing lines and gallery titles from H3.
  6. Remove "Keep scrolling" once the pins are short.

### Medium

**M1. The home hero opening delights on a first laptop visit and delays everywhere else.**
- *Where:* home (`R/timing-home-desktop.jpg`, `R/timing-home-phone.jpg`). `src/styles/hero.css`: `--t-built: 3.4s`, "In good" at 1.6 s, the photo reveal runs 1.8 s from 3.4 s.
- *What happens:* the CTA is live at 0.4 s, which is good. The headline reads "Your home. In good" from about 1.6 to 3.4 s. The photo is fully in by about 5.2 s. On phones the elevation's lines cross the headline and paragraph and stay at 38% opacity after the photo arrives (`t06503.jpg`). Visitors who scroll before 3.4 s never see the payoff, and the payoff is a render (C1).
- *Verdict:* charming once on a laptop. A 4–5 second black screen on a phone from Google. Replayed in full on the couple's second visit.
- *Fix:*
  - Show the whole headline at once and animate only the drawing.
  - Start the photo at about 1.2 s and finish by about 2.5 s.
  - Play the long version once per visit (sessionStorage) and a short fade after that.
  - On phones, keep the lines out of the text column, or skip the drawing.
  - The owner chose to keep this timing (handoff D2). This finding is the buyer-side cost of that choice.

**M2. Drawing-sheet jargon confuses homeowners, and "Design reference" advertises stock.**
- *Where:* desktop title blocks on every hero ("DRAWING / SHEET A-02 / IMAGE", "SCALE 1/4" = 1'-0""), plus "ILLUSTRATIVE PLAN", "Sheet P-01" and "KITCHEN PLAN · ILLUSTRATIVE". "Design reference" chips appear on the About, Roofing, Process, Service-areas and Lead-paint heroes, the band images, and the home roofing tile on both devices (`Hero.astro:56`, `InteriorLayout.astro`, `Band.astro`, `[slug].astro:66`, `index.astro:166`, `:175`).
- *What the buyer sees:* architect props. "Design reference" reads as "not ours", which is true.
- *Fix:*
  - Keep "Our project", in plain words: "Photo: our project".
  - Drop SHEET, SCALE and DRAWING.
  - Where a label must stay until the photo is replaced, say "Stock photo", and update the terms wording to match.
  - Replace those five stock images first (**needs owner**) so no label is needed.

**M3. Process copy has vague step names and two different step counts.**
- *Where:* `src/data/site.ts:25–29` and `content.json:428–459`.
- *What the buyer sees:* "Explore the possibilities", "Bring it to life" and "Review the details" are brochure phrases. "Build and communicate: You know how progress and any changes will be discussed." says nothing. "visit where needed" hedges whether anyone comes to the house, and "arrangements" is vague. The home page shows five steps while the process page says "Six steps".
- *Fix, home page steps:*
  - 01 "Tell us about your home": "What you want to change, and what matters most." (keep)
  - 02 **"We visit and talk it through"**: **"We look at the house with you and lay out the options."**
  - 03 **"Scope and estimate"**: **"What's included, your selections and any permits, written down."**
  - 04 **"Agree, then build"**: **"Scope and cost are settled before work starts. You always know where things stand."**
  - 05 **"Walk through the finished work"**: **"We go room by room with you and close out the last items."**
- *Fix, process page:*
  - Step 2: **"We visit, look at the house with you and talk through the options."** (owner to confirm)
  - Step 4: **"Scope, price and start date are agreed in writing before construction starts."** (needs owner)
  - Step 5: **"We build, and you always know where things stand. Any change is agreed with you before it's made."** (needs owner)
  - Lede: **"From first conversation to final walkthrough."** (drop the count)

**M4. Some answers hedge into non-answers.**
- Bathroom (`content.json:175–176`), "Can you make a bathroom easier to access?": **"Yes. Tell us who uses the room and what's hard today, like the step into the shower, the door, or somewhere to hold on, and we'll plan the room around it."** (owner to confirm)
- Additions (`:301–302`), "…possible from a message?": **"Not for certain. Tell us the town, the kind of space you want and roughly where it would go, and we'll tell you what has to be checked (zoning, structure and access) before anyone can say yes."**
- Additions (`:305–306`), permits: **"Almost always. We find out which approvals your project needs and handle the applications before work starts."** This rests on the firm's stated design-permits-build promise; reviewer 2 to confirm.
- Whole-home (`:240–241`), phasing: **"No. We'll tell you which parts make sense to do together and which can wait."**
- Whole-home (`:244–245`), living at home: **"It depends on which rooms are affected and whether you'll lose the kitchen, a bathroom, water or power for a time. We plan the order of work with you so you know before we start."**
- FAQs (`:566–567`): **"Call (202) 519-1831, Monday to Friday, 9 to 5, or email info@isdesignandbuild.com."**
- Kitchen (`:106–107`), timeline (**needs owner:** typical durations): **"It depends on the scope, permits, your selections and how long materials take to arrive. If you have a date to work to, like a baby, a holiday or a move, tell us at the start."**
- Roofing emergency and materials: see H2.

**M5. The lead-paint page is a real reason to choose them, written as a public-health leaflet, with an image that contradicts it.**
- *Where:* /lead-paint-abatement/ (`SHOTS/sheets/desktop-lead-paint-abatement.jpg`, `content.json:643–707`). Under "Old paint becomes dust." is stock `site-04`, a worker cutting timber in a dusty warehouse: exactly the uncontained dust the page warns about. The hero is the red-door street reused from roofing and service areas.
- *What the buyer sees:* a 1920s house is pre-1978, so this matters to the couple. But the page never says what I.S does about it.
- *Fix:*
  - Replace the photo with a large type statement or the facade drawing showing the "contained work area".
  - Add: **"If your house was built before 1978, we plan containment, dust control and clean-up into the scope and the estimate from the first visit."** Certification claims need the owner and reviewer 2.
  - Link from the kitchen and bathroom questions: **"Older house? Read about planning for lead paint."**

**M6. The middle of the home page has filler: a stock video band and duplicated facts.**
- *Where:* `index.astro:209–216` (band: "Experience you can build on." over stock footage of plans on perforated bricks) and `:48–53` with markup at `:218–227` (facts: 1989 / 37 / In-house / 3 areas). `SHOTS/desktop/home/17.jpg`–`18.jpg`.
- *What the buyer sees:* a slow full-screen stock clip that isn't DC work. Then "1989" and "37", which are the same fact. "3 areas" is not a reason to hire anyone.
- *Fix:*
  - Cut the band, or use real site footage (**needs owner**).
  - Three facts instead of four: **"37 years: building homes in the DC area since 1989"**, **"One team: design, permits and construction"**, and one owner-supplied figure (projects completed, or Google rating and count; **needs owner**, reviewer 2).

**M7. Photos don't match their labels, and weak picks lead.**
- Home "What we build" bathroom tile uses `bath-tall`, a small tub-shower hall bath with the toilet front and centre. That is the weakest bath on the site, while `bath-a` and `bath-b` are the strongest images (`index.astro:35`, `SHOTS/desktop/home/09.jpg`).
- The additions tile and the whole additions page show a rear deck, not an addition. "Built to belong." sits over a deck.
- "Living spaces" / "Living space" captions sit on a bedroom photo with the bed in frame (`index.astro:44`, `photos.ts` living-a; alt "Bright living room" at `content.json:22`).
- "Everyday details" is the caption on a shower (`index.astro:45`).
- *Fix:* bathroom tile becomes `bath-a`; living-a becomes **"Bedroom"**; "Everyday details" becomes **"Showers"**. On additions, lead with the site-plan drawing and caption the deck **"Rear deck and stair from one of our projects"**, not as an addition (**needs owner** for addition photos).

**M8. Some screens are empty mid-scroll.**
- *Where:* `SHOTS/desktop/home/02.jpg` (top third blank), `/18.jpg` (blank band under the facts), `/19.jpg` (half black with only "START A PROJECT" before the heading arrives), `SHOTS/desktop/portfolio/03.jpg` (columns end unevenly).
- *What the buyer sees:* for a moment the page looks broken.
- *Fix:* start reveals earlier (around 95% of the viewport), trim padding around the statement and the CTA, and balance the portfolio columns.

**M9. The guides read as generic advice, not this firm's expertise.**
- *Where:* /blogs/ and the articles (`src/data/articles.json`, `SHOTS/sheets/desktop-blogs__kitchen-remodeling-ideas-georgetown.jpg`).
- *What the buyer sees:* long text-only pages with small grey type. The advice is sensible but generic ("Test an island before committing"). There are no project photos and no "here's how we handle this in a rowhouse". All four are dated the same day.
- *Fix:*
  - Add 1–2 relevant company photos per guide.
  - End each guide with 2–3 sentences in the founders' voice, "How we approach this" (**needs owner** input).
  - Add a mid-article ask: **"Planning a kitchen? Tell us about it."**

### Low

- **L1. British spelling on a US site.** "enquiry/enquiries" appears 54 times in the built pages ("Send enquiry", "describe it in your enquiry", privacy and terms headings), and "catalogue" once. Use "inquiry" and "catalog". Button: "Send my project details".
- **L2. Inconsistent naming and capitalisation.** The nav says "Our Work" but the dropdown says "Our story / Our process / Service areas"; the footer uses Title Case. "Explore our work", "View our projects", "See our work" and "Our Work" all name the same page. Use sentence case and one label: "Our work".
- **L3. Phone portfolio numbers run out of order:** 01, 04, 07, 10, 02, 05… (`SHOTS/phone/portfolio/02.jpg`). Drop the numbers on phones, or number in visual order.
- **L4. The transparent header overlaps hero content on the first scroll.** The logo sits over the orange "Start a project" on phone (`SHOTS/phone/home/01.jpg`) and over the area line on desktop (`SHOTS/desktop/home/01.jpg`). Make the header solid as the copy reaches it.
- **L5. Animated year counters can be caught mid-count.** The home facts count up from 1929; a capture shows "1988" and "36" (`SHOTS/phone/home/14.jpg`). About shows "2025" mid-count (`SHOTS/sheets/phone-about-us.jpg`). Counting a year is decoration. Show years static and animate only the line.
- **L6. The desktop header CTA is an outline button.** Make "Start a project" filled orange so the one primary action always looks primary.
- **L7. Service areas mismatch.** It says "Send your town or ZIP code." but the form asks "Town or city". Use **"Send your town."**
- **L8. "I.S" is never explained.** A one-line origin on About (**needs owner**) turns a possible "typo?" into a story.
- **L9.** "Keep scrolling" and "SWIPE →" hints (`Rail.astro:24`, home rooms): remove once the pins are short.

---

## 4. Top 10 changes, in priority order

1. **Hero image:** replace the stock render with the firm's best photo (`kitchen-a` or `bath-a`), keep it bright, give it a hand-drawn trace, and remove "Design reference" from the first screen. Commission a proper hero photo (**needs owner**). (C1)
2. **Hero words:** H1 "Designed and built by one team. In DC since 1989."; the new eyebrow and sub-line; "Roof leak? Call (202) 519-1831"; DC and since 1989 visible on the first phone screen. Full headline at once; photo in by about 2.5 s; long intro once per visit. (C2, M1)
3. **Stop darkening the firm's photos:** a text-only scrim, no auto-traced scribbles, phone crops that show each room. (H1)
4. **Roofing for the leak caller:** phone-first buttons via the existing flag, the new H1 and lede, rewritten emergency answer, materials question removed until answered, a Call-first phone bar, a short drawing. **Needs owner:** emergency and out-of-hours policy, roofing photos. (H2)
5. **Finish the path to enquiry:** "What happens next" block, the fixed intro line, proof above the form on phones, warmer roofing help text, a filled button in the closing band, "Start a project" in the phone menu. **Needs owner:** reply time and whether the first visit is free. (H5)
6. **Rebuild the home middle around reassurance:** "One team designs it, prices it and builds it" with the scope-first promise; the Eun Mi Yu excerpt as the main quote; clearer process steps; cut the stock video band and the duplicated facts; link financing from the cost answers. (H4, M3, M6)
7. **Break the template:** pins of about 1.5–2 screens (static on phones), the intro once per visit, per-page closing lines and gallery titles, each service page leading with its own strongest idea. (H7)
8. **Replace the remaining slogans and hedges** with the lines in H3 and M4.
9. **Imagery clean-up now, and a photo brief for the owner:** no repeats, the right photos per page, fixed labels, the strong bath tile, scarcity counters gone. Brief: pre-war DC kitchens and baths, before/after pairs, founders and crew, one real plan. (C3, M7, M2)
10. **About page:** remove the stranger in the "KRA" shirt, use the new H1 and lede, make the Eun Mi Yu excerpt the centrepiece. Founder portraits and their own words (**needs owner**). Fix the lead-paint page image and add its line about containment and clean-up. (H6, M5)

---

## 5. Outside my lane

1. Proof gap: no Google rating or review count, only two short excerpts, and no licence, insurance or lead certification shown (reviewer 2).
2. Claims to substantiate before promoting them further: "One in-house team", "The team you meet at the start is the team that finishes the job", "The names clients mention again and again in their reviews", "design, permits and build" (reviewer 2).
3. Information architecture: Financing, FAQs, Guides and Lead paint are reachable only from the footer, not the header or phone menu (reviewer 2).
4. The terms page still describes the old email-preparation tool and the "Design reference" convention; it needs updating if labels change (reviewer 3 / legal).
5. Readability and contrast: small grey body text on the guides and process sheets, and trace lines behind hero text (reviewer 3).
