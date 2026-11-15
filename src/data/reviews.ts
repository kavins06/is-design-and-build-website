// Client reviews from the company's Google Business Profile (listed as "I.S Design+Build";
// many reviews use the former name, I.S. Enterprises). Excerpts are verbatim; "…" marks
// text left out. Checked against the profile on 2026-11-15. Keep the rating and count in
// step with the profile when they change.

export const googleReviews = {
  rating: '4.9',
  count: 39,
  url: 'https://www.google.com/maps?cid=1968106805018591346',
};

export interface Review {
  text: string;
  name: string;
  /** Month and year the review was posted. */
  date: string;
  /** What the work was, in the reviewer's own terms. */
  job?: string;
}

export const reviews = {
  yu: { text: 'Eddie is very knowledgeable, professional and was very responsive when I had questions. Eddie also made some great suggestions to improve the remodel and set realistic expectations when some supplies were delayed by vendors.', name: 'Eun Mi Yu', date: 'July 2022', job: 'Home remodel' },
  dean: { text: 'Eddie & his team were terrific to work with. They delivered high-quality work, with clear communication and strong attention to detail. They went above and beyond to deliver within our complicated schedule, including completing work on weekends and holidays.', name: 'Lia Dean', date: 'January 2026' },
  solerPrice: { text: 'We did receive cheaper quotes from other companies, but we chose Eddie and his team because they truly deliver quality work.', name: 'Maria Claudia Soler', date: 'December 2025', job: 'Renovation with lead removal' },
  solerLead: { text: 'Eddie took the time to walk us through the entire process and made sure all abatement protocols were properly followed. … the final clearance testing gave us the peace of mind we needed', name: 'Maria Claudia Soler', date: 'December 2025', job: 'Renovation with lead removal' },
  solerAway: { text: 'Since we were living abroad during the renovation and could not see the progress in person, Eddie made sure to keep us updated regularly and always discussed decisions that needed to be made.', name: 'Maria Claudia Soler', date: 'December 2025', job: 'Renovation' },
  peyton: { text: 'When Eddie followed up with me about his bid he didn’t beat around the bush, or try to sell me a dream. He was direct, honest, and transparent…', name: 'Shyra Peyton', date: 'January 2021', job: 'Large-scale renovation of an old house' },
  peytonResult: { text: 'As promised, I received an almost new-like renovated home done to professional quality with added little touches of things that I would have never thought about.', name: 'Shyra Peyton', date: 'January 2021', job: 'Large-scale renovation of an old house' },
  brown: { text: '…my roof had to be completely gutted and rebuilt and I S Enterprises did a perfect job.', name: 'Jordan Brown', date: 'May 2022', job: 'Roof rebuild, house built in 1900' },
  green: { text: 'Mr. Eddie and his team replaced my roof which required interior repairs. Mr. Eddie was very professional and very attentive to execute the work with care (no stress).', name: 'Nicole Green', date: 'April 2024', job: 'Roof replacement and interior repairs' },
  laurion: { text: 'Their team showed up consistently and worked hard, even in the stretch of 100-degree days we had in July! I think the pricing was fair and the few change orders we had were legitimate and reasonable. I’m loving my spa bathroom and expanded closet…', name: 'Marie Isabel Laurion', date: 'March 2025', job: 'Bathroom, closet and lower-level unit' },
  day: { text: 'They installed two new high sitting toilets, hand rails inside and outside my shower/tub, and a stair lift with remote controls on both levels. My ceiling and wall had to be cut open to do the electrical work for the stair lift and there is no evidence that it was done.', name: 'Willette Day', date: 'July 2024', job: 'Accessibility work' },
  little: { text: 'Italo, Eddie, and the IS Enterprises team did a major kitchen and bedroom remodel for us last year. Though there were a few minor issues along the way, I expect that to be the case in any major home project, and overall, we were very happy with the communication and quality of work we received.', name: 'Jeffrey Little', date: 'February 2020', job: 'Kitchen and bedroom remodel' },
  gerami: { text: 'He was helpful in navigating the complicated permitting process in DC, and the ordering and installation of the windows went off without a hitch.', name: 'Nima Gerami', date: 'May 2026', job: 'Window replacement' },
  hoftijzer: { text: 'During the renovations some additional defects came up that needed to be addressed and this work and costing was all discussed and agreed before they went ahead.', name: 'Margo Hoftijzer', date: 'March 2020', job: 'Renovations before new tenants' },
  jackson: { text: 'Eddie stuck with us through the process and helped move things along through the shutdown and everything. … Eddie was there pretty much every day checking on the progress and making sure everything went to plan.', name: 'Frank Jackson', date: 'May 2021', job: 'New porch, through DC zoning' },
  designer: { text: 'From the initial phase of construction to the final finish details, the project manager, general contractor and each tradesmen were professional, patient, and efficient in their approach.', name: 'Four Twelve Interiors', date: 'August 2024', job: 'Independent interior designer on a new four-story home' },
  jones: { text: 'Eddie and his team recently completed a number of small projects on our row home on Capitol Hill. They did a great job repairing exterior brick mortar, window trim, an attic fan, and other miscellaneous repair work that was much needed (no more birds in the attic!).', name: 'Amanda Jones', date: 'May 2021', job: 'Repairs to a Capitol Hill row home' },
  shedd: { text: 'Once on site, they were prompt, impeccably clean, and detail-oriented. They also facilitated last minute lead testing so that we could return home as soon as possible.', name: 'Stephanie Bechtold Shedd', date: 'August 2021', job: 'Lead paint mitigation in a baby’s room' },
} satisfies Record<string, Review>;

export type ReviewKey = keyof typeof reviews;
