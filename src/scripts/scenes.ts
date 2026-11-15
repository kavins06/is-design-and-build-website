import { gsap, ScrollTrigger } from './motion';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

// Scroll scenes shared by the home page and the interior pages. Each scene looks
// for its own markup and does nothing when the page does not have it. All markup
// is already in its finished state, so a scene only adds the starting state.

const ease = 'power4.out';
const desktop = () => window.matchMedia('(min-width: 901px)').matches;

/** The closing question, its options and the footer wordmark. */
export function closingScenes() {
  const title = document.querySelector('.ct-title');
  if (title) {
    gsap.from('.ct-title span', {
      yPercent: 60,
      opacity: 0,
      duration: 1.1,
      stagger: 0.12,
      ease,
      scrollTrigger: { trigger: title, start: 'top 95%' },
    });
  }
  rise('.ct-pills a', '.ct-pills', 0.05);
  rise('.ct-grid > div', '.ct-grid', 0.08);
  const mark = document.querySelector<HTMLElement>('.footer-mark');
  if (mark) {
    const split = SplitText.create(mark, { type: 'chars', mask: 'chars' });
    gsap.from(split.chars, {
      yPercent: 110,
      duration: 1.2,
      stagger: 0.035,
      ease,
      scrollTrigger: { trigger: mark, start: 'top 98%' },
    });
  }
}

/** Items rise in, one after another, when their group enters. */
export function rise(items: string, group: string, stagger = 0.08) {
  const trigger = document.querySelector(group);
  if (!trigger) return;
  gsap.from(items, { y: 34, opacity: 0, duration: 0.9, stagger, ease: 'power3.out', scrollTrigger: { trigger, start: 'top 96%' } });
}

/** Headings marked data-split reveal line by line from behind a mask. */
export function headings() {
  gsap.utils.toArray<HTMLElement>('[data-split]').forEach((el) => {
    SplitText.create(el, {
      type: 'lines',
      mask: 'lines',
      autoSplit: true,
      onSplit: (self) =>
        gsap.from(self.lines, {
          yPercent: 105,
          duration: 1.1,
          stagger: 0.09,
          ease,
          scrollTrigger: { trigger: el, start: 'top 94%' },
        }),
    });
  });
}

/** Page top: the photo drifts and the headline lifts away as the page scrolls on. */
export function heroOut() {
  const hero = document.querySelector<HTMLElement>('.page-hero.has-photo');
  if (!hero) return;
  const st = { trigger: hero, start: 'top top', end: 'bottom top', scrub: true };
  gsap.to(hero.querySelector('.ph-stage'), { yPercent: 22, scale: 1.06, ease: 'none', scrollTrigger: st });
  gsap.to(hero.querySelector('.page-hero-copy'), { yPercent: -14, opacity: 0, ease: 'none', scrollTrigger: { ...st, start: 'top+=10% top' } });
}

/** Plan: a pinned drawing sheet whose parts are drawn as each point becomes active. */
export function plan(section: HTMLElement) {
  const pin = section.querySelector<HTMLElement>('.dw-pin');
  const base = section.querySelector('.dw-base');
  if (!pin || !base) return;
  // Phones get the finished drawing with every point open: a pinned sheet fights the thumb.
  if (!desktop()) {
    section.classList.add('dw-static');
    return;
  }
  const steps = Array.from(section.querySelectorAll<HTMLElement>('.dw-steps li'));
  const parts = Array.from(section.querySelectorAll<SVGGElement>('.dw-part'));
  const names = steps.map((li) => li.querySelector('h3')?.textContent ?? '');
  const stage = section.querySelector('.dw-stage');
  const bar = section.querySelector('.dw-progress i');
  const outs = Array.from(section.querySelectorAll('.out'));
  const lines = (scope: Element) => Array.from(scope.querySelectorAll('[pathLength]')).filter((el) => !el.closest('.out'));
  const marks = (scope: Element) => Array.from(scope.querySelectorAll('text, .x, .xo, .dw-stamp'));
  const n = parts.length;

  const allLines = Array.from(section.querySelectorAll('[pathLength]'));
  const allMarks = [...marks(base), ...parts.flatMap(marks)];
  if (allLines.length) gsap.set(allLines, { strokeDasharray: 1, strokeDashoffset: 1 });
  if (allMarks.length) gsap.set(allMarks, { opacity: 0 });
  if (outs.length) gsap.set(outs, { opacity: 1 });
  if (bar) gsap.set(bar, { scaleX: 0 });
  parts[0]?.classList.add('is-on');

  // The base and the first point sketch themselves as the sheet scrolls into view,
  // so the pinned sheet never opens empty.
  const approach = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: { trigger: section, start: 'top 85%', end: 'top 5%', scrub: 0.5 },
  });
  // Only animate what a drawing actually has, so GSAP never warns about missing targets.
  const baseLines = [...lines(base), ...outs.flatMap((g) => Array.from(g.querySelectorAll('[pathLength]')))];
  const baseMarks = marks(base);
  if (baseLines.length) approach.to(baseLines, { strokeDashoffset: 0, duration: 1, stagger: { amount: 0.6 } }, 0);
  if (baseMarks.length) approach.to(baseMarks, { opacity: 1, duration: 0.3 }, 0.8);
  const firstLines = parts[0] ? lines(parts[0]) : [];
  const firstMarks = parts[0] ? marks(parts[0]) : [];
  if (firstLines.length) approach.to(firstLines, { strokeDashoffset: 0, duration: 0.8, stagger: { amount: 0.4 } }, 0.7);
  if (firstMarks.length) approach.to(firstMarks, { opacity: 1, duration: 0.3 }, 1.3);

  let current = 0;
  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: pin,
      start: 'top top',
      end: `+=${n * 50}%`,
      pin: true,
      scrub: 0.5,
      anticipatePin: 1,
      onUpdate: (self) => {
        if (bar) gsap.set(bar, { scaleX: self.progress });
        const index = Math.min(n - 1, Math.floor(self.progress * n));
        if (index === current) return;
        current = index;
        steps.forEach((li, i) => li.classList.toggle('is-on', i === index));
        parts.forEach((g, i) => g.classList.toggle('is-on', i === index));
        if (stage) stage.textContent = names[index] ?? '';
      },
    },
  });
  tl.to({}, { duration: n }, 0);
  parts.forEach((part, i) => {
    if (!i) return;
    const partLines = lines(part);
    const partMarks = marks(part);
    const removed = Array.from(part.querySelectorAll('.out'));
    if (partLines.length) tl.to(partLines, { strokeDashoffset: 0, duration: 0.6, stagger: { amount: 0.25 } }, i - 0.15);
    if (partMarks.length) tl.to(partMarks, { opacity: 1, duration: 0.25 }, i + 0.2);
    if (removed.length) tl.to(removed, { opacity: 0, duration: 0.3 }, i);
  });
}

/** Band: a photograph opens from a framed inset to full bleed under one statement. */
export function band(el: HTMLElement) {
  const frame = el.querySelector('.bnd-frame');
  if (!frame) return;
  const img = frame.querySelector('img');
  gsap.fromTo(
    frame,
    { clipPath: desktop() ? 'inset(16% 22% 16% 22%)' : 'inset(10% 7% 10% 7%)' },
    { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', scrollTrigger: { trigger: el, start: 'top 90%', end: 'top 5%', scrub: 0.4 } },
  );
  if (img) gsap.fromTo(img, { scale: 1.25 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
  gsap.from(el.querySelectorAll('.bnd-copy > *'), {
    y: 50,
    opacity: 0,
    stagger: 0.1,
    ease: 'none',
    scrollTrigger: { trigger: el, start: 'top 40%', end: 'top 0%', scrub: 0.4 },
  });
}

/** Split: the photograph opens from a band across its middle and drifts inside its frame. */
export function split(el: HTMLElement) {
  const figure = el.querySelector('figure');
  const img = figure?.querySelector('img');
  if (!figure || !img) return;
  gsap.fromTo(
    figure,
    { clipPath: 'inset(22% 0% 22% 0%)' },
    { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', scrollTrigger: { trigger: el, start: 'top 88%', end: 'center 55%', scrub: 0.4 } },
  );
  gsap.fromTo(img, { yPercent: -7, scale: 1.16 }, { yPercent: 7, scale: 1.16, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
}

/** Images that sit off screen sideways may never meet the browser's lazy-load distance: load them as their section approaches. */
function warm(el: HTMLElement) {
  ScrollTrigger.create({
    trigger: el,
    start: 'top bottom+=900',
    once: true,
    onEnter: () => el.querySelectorAll('img').forEach((img) => (img.loading = 'eager')),
  });
}

/** Rail: vertical scroll drives a sideways gallery with inner parallax. Phones swipe instead. */
export function rail(el: HTMLElement) {
  const track = el.querySelector<HTMLElement>('.rail-track');
  const pin = el.querySelector<HTMLElement>('.rail-pin');
  if (!track || !pin) return;
  warm(el);
  if (!desktop()) {
    el.classList.add('is-swipe');
    const hint = el.querySelector('.rail-hint');
    if (hint) hint.textContent = 'Swipe';
    swipeRegion(track);
    return;
  }
  const distance = () => track.scrollWidth - window.innerWidth;
  const slide = gsap.to(track, {
    x: () => -distance(),
    ease: 'none',
    scrollTrigger: { trigger: pin, start: 'top top', end: () => `+=${distance()}`, pin: true, scrub: 0.5, anticipatePin: 1, invalidateOnRefresh: true },
  });
  track.querySelectorAll('figure img').forEach((img) => {
    gsap.fromTo(
      img,
      { xPercent: -8 },
      { xPercent: 8, ease: 'none', scrollTrigger: { trigger: img, containerAnimation: slide, start: 'left right', end: 'right left', scrub: true } },
    );
  });
  const bar = el.querySelector('.rail-progress i');
  if (bar) gsap.fromTo(bar, { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: pin, start: 'top top', end: () => `+=${distance()}`, scrub: true } });
}

/** A sideways swipe gallery that keyboard users can focus and scroll with the arrow keys. */
export function swipeRegion(track: HTMLElement) {
  track.tabIndex = 0;
  track.setAttribute('role', 'region');
  track.setAttribute('aria-label', 'Project photographs, scroll sideways');
}

/** Steps: a pinned run of drawing sheets; each drawing draws itself as its sheet arrives. Phones stack them. */
export function steps(el: HTMLElement) {
  const track = el.querySelector<HTMLElement>('.steps-track');
  const pin = el.querySelector<HTMLElement>('.steps-pin');
  if (!track || !pin) return;
  const sheets = Array.from(el.querySelectorAll<HTMLElement>('.sheet'));
  warm(el);
  gsap.set(el.querySelectorAll('.sheet svg path'), { strokeDasharray: 1, strokeDashoffset: 1 });
  const drawSheet = (sheet: HTMLElement, trigger: ScrollTrigger.Vars) => {
    const paths = sheet.querySelectorAll('svg path');
    if (paths.length) gsap.to(paths, { strokeDashoffset: 0, duration: 1.1, stagger: 0.18, ease: 'power2.inOut', scrollTrigger: trigger });
  };
  if (!desktop()) {
    sheets.forEach((sheet) => drawSheet(sheet, { trigger: sheet, start: 'top 82%' }));
    return;
  }
  const ruler = el.querySelector('.steps-ruler i');
  const marks = Array.from(el.querySelectorAll('.steps-ruler b'));
  if (ruler) gsap.set(ruler, { scaleX: 0 });
  const distance = () => track.scrollWidth - window.innerWidth;
  const slide = gsap.to(track, {
    x: () => -distance(),
    ease: 'none',
    scrollTrigger: {
      trigger: pin,
      start: 'top top',
      end: () => `+=${distance()}`,
      pin: true,
      scrub: 0.5,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        if (ruler) gsap.set(ruler, { scaleX: self.progress });
        marks.forEach((b, i) => b.classList.toggle('is-on', self.progress >= (i + 0.5) / (marks.length + 1) - 0.04));
      },
    },
  });
  // Sheets already on screen when the run starts draw as the section arrives; the rest as they slide in.
  sheets.forEach((sheet) => {
    if (sheet.offsetLeft + sheet.offsetWidth * 0.5 < window.innerWidth) drawSheet(sheet, { trigger: el, start: 'top 55%' });
    else drawSheet(sheet, { trigger: sheet, containerAnimation: slide, start: 'left 80%' });
  });
  const photo = el.querySelector('.sheet-photo img');
  if (photo) {
    gsap.fromTo(
      photo,
      { clipPath: 'inset(0% 100% 0% 0%)', scale: 1.2 },
      { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, ease: 'none', scrollTrigger: { trigger: photo.parentElement, containerAnimation: slide, start: 'left 95%', end: 'left 35%', scrub: true } },
    );
  }
}

/**
 * Span: the dimension line draws from the founding year to today while the year counts up.
 * It plays through once rather than following the scroll, so it always ends on the real year.
 */
export function span(el: HTMLElement) {
  const line = el.querySelector('.span-line i');
  const label = el.querySelector('.span-line em');
  if (!line) return;
  // The years stay as printed: only the dimension line is drawn, so no visitor ever
  // catches a year part-way through counting.
  const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' }, scrollTrigger: { trigger: el, start: 'top 72%' } });
  tl.fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 1.8 }, 0)
    .from(label, { opacity: 0, y: 10, duration: 0.5, ease: 'power2.out' }, 1.3);
  rise('.span-facts > div', '.span-facts', 0.1);
}

/** Portfolio: the middle column travels faster than the outer ones; photographs open as they arrive. */
export function portfolio(el: HTMLElement) {
  if (desktop()) {
    el.querySelectorAll<HTMLElement>('.pf-col').forEach((col) => {
      const deep = col.dataset.depth === '1';
      gsap.fromTo(col, { yPercent: deep ? 6 : 0 }, { yPercent: deep ? -10 : 2, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
  }
  el.querySelectorAll<HTMLElement>('figure a').forEach((link) => {
    gsap.fromTo(
      link,
      { clipPath: 'inset(0% 0% 100% 0%)' },
      { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power3.inOut', scrollTrigger: { trigger: link, start: 'top 92%' } },
    );
    const img = link.querySelector('img');
    if (img) gsap.from(img, { scale: 1.25, duration: 1.6, ease: 'power3.out', scrollTrigger: { trigger: link, start: 'top 92%' } });
  });
}

/** Guides: with a desktop pointer, the hovered guide's photograph rides beside the list, following the pointer. */
export function guides(el: HTMLElement) {
  if (!desktop() || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  const float = el.querySelector<HTMLElement>('.gl-float');
  if (!float) return;
  const imgs = Array.from(float.querySelectorAll('img'));
  imgs.forEach((img) => (img.loading = 'eager'));
  el.classList.add('is-float');
  // The photograph keeps to the free space right of the titles and follows the pointer up and down.
  const y = gsap.quickTo(float, 'y', { duration: 0.7, ease: 'power3' });
  const tilt = gsap.quickTo(float, 'rotation', { duration: 0.9, ease: 'power3' });
  let last = 0;
  let settle = 0;
  el.addEventListener('pointermove', (event) => {
    y(event.clientY);
    // Leans with the pointer's movement, then settles level when it stops.
    tilt(gsap.utils.clamp(-5, 5, (event.clientY - last) * 0.3));
    last = event.clientY;
    window.clearTimeout(settle);
    settle = window.setTimeout(() => tilt(0), 90);
  });
  el.querySelectorAll('.gl-row').forEach((row, i) => {
    row.addEventListener('pointerenter', () => {
      imgs.forEach((img, j) => img.classList.toggle('is-on', i === j));
      float.classList.add('is-on');
    });
  });
  el.querySelector('.gl-list')?.addEventListener('pointerleave', () => float.classList.remove('is-on'));
  rise('.gl-list li', '.gl-list', 0.1);
}

/** Quotes and statements ink in word by word as they cross the screen. */
export function inks() {
  gsap.utils.toArray<HTMLElement>('[data-ink]').forEach((el) => {
    const split = SplitText.create(el, { type: 'words' });
    gsap.fromTo(
      split.words,
      { opacity: 0.14 },
      { opacity: 1, stagger: 0.1, ease: 'none', scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: 0.4 } },
    );
  });
}

/** Numbers count up once when they arrive. */
export function counts() {
  gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
    const target = Number(el.dataset.count);
    const state = { value: target > 1000 ? target - 60 : 0 };
    gsap.to(state, {
      value: target,
      duration: 1.8,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%' },
      onUpdate: () => (el.textContent = String(Math.round(state.value))),
    });
  });
}
