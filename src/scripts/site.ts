import { ScrollTrigger, startMotion, headerTone } from './motion';
import { band, closingScenes, counts, guides, headings, heroOut, inks, plan, portfolio, rail, rise, span, split, steps } from './scenes';

// Scroll-driven motion for every page except the home page, which has its own
// sequence in home.ts. Only loaded when reduced motion is not requested.
startMotion();
heroOut();

// Sections are set up in page order, so each pinned section is measured after the
// ones above it.
const scenes: Record<string, (el: HTMLElement) => void> = { plan, band, rail, span, split, steps, portfolio, guides };
document.querySelectorAll<HTMLElement>('[data-scene]').forEach((el) => scenes[el.dataset.scene ?? '']?.(el));

headings();
rise('.fq-list details', '.fq-list', 0.06);
inks();
counts();
closingScenes();
headerTone('.page-hero');
ScrollTrigger.sort();
