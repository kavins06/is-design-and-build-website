import { gsap, ScrollTrigger, startMotion, headerTone } from './motion';
import { closingScenes, swipeRegion } from './scenes';

// All scroll-driven motion for the home page. Without JavaScript, or with
// reduced motion requested, every section renders in its finished state.
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const motion = reduce ? false : startMotion();
if (motion) {
  expertise();
  rooms();
  statement();
  processStory();
  band();
  facts();
  reveals();
  closingScenes();
  // Created last so its trigger positions account for the pinned sections above.
  headerTone('.cg-hero');
}

/** Statement: the words ink in once, one after another, when the statement arrives, so a
 * visitor who stops scrolling is never left reading faint words. */
function statement() {
  gsap.fromTo(
    '.st-text span',
    { opacity: 0.15 },
    { opacity: 1, duration: 0.5, stagger: 0.09, ease: 'power1.out', scrollTrigger: { trigger: '.st-text', start: 'top 80%' } },
  );
}

/** Process: a pinned floor plan that develops through the five stages. */
function processStory() {
  const section = document.querySelector<HTMLElement>('.pr');
  if (!section) return;
  const steps = gsap.utils.toArray<HTMLElement>('.pr-steps li');
  const stage = section.querySelector<HTMLElement>('.pr-stage');
  // Phones show the active step's description in one fixed-height line under the list,
  // so the list never changes height while it is pinned.
  const detail = section.querySelector<HTMLElement>('.pr-detail');
  const names = ['Sketch', 'Design', 'Scope + planning', 'Construction', 'Walkthrough'];
  let current = 0;
  // Phones get the finished plan with every step open: a pinned sheet fights the thumb.
  if (!window.matchMedia('(min-width: 901px)').matches) {
    section.classList.add('pr-static');
    if (stage) stage.textContent = 'Plan';
    return;
  }

  const draw = (group: string) => `${group} .draw`;
  // The sheet opens on stage 01 already sketched, so it never shows as an empty box.
  gsap.set('.pr .draw', { strokeDasharray: 1, strokeDashoffset: 1 });
  gsap.set(draw('.pl-bubbles'), { strokeDashoffset: 0 });
  gsap.set('.pl-dims text', { opacity: 0 });
  gsap.set('.pl-stamp', { opacity: 0, scale: 1.7, transformOrigin: '50% 50%' });
  gsap.set('.pr-photo', { clipPath: 'circle(0% at 58% 50%)' });

  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: '.pr-pin',
      start: 'top top',
      // A fifth of a screen per stage: enough to see each step, short enough not to stall.
      end: '+=100%',
      pin: true,
      scrub: 0.5,
      onUpdate: (self) => {
        gsap.set('.pr-progress i', { scaleX: self.progress });
        const index = Math.min(4, Math.floor(self.progress * 5));
        if (index === current) return;
        current = index;
        steps.forEach((li, i) => li.classList.toggle('is-on', i === index));
        if (stage) stage.textContent = names[index];
        if (detail) detail.textContent = steps[index]?.querySelector('p')?.textContent ?? '';
      },
    },
  });

  // 01 Conversation: rooms sketched as loose bubbles (already drawn; held while step 01 is current).
  tl.to({}, { duration: 1 }, 0)
    // 02 Design: the sketch hardens into walls, doors and windows.
    .to('.pl-bubbles', { opacity: 0, duration: 0.4 }, 1)
    .to(draw('.pl-walls'), { strokeDashoffset: 0, stagger: 0.1, duration: 0.6 }, 1)
    .to(draw('.pl-openings'), { strokeDashoffset: 0, stagger: 0.06, duration: 0.4 }, 1.5)
    // 03 Scope + permits: dimensions, then the approval stamp.
    .to(draw('.pl-dims'), { strokeDashoffset: 0, duration: 0.4 }, 2)
    .to('.pl-dims text', { opacity: 1, duration: 0.2 }, 2.3)
    .to('.pl-stamp', { opacity: 1, scale: 1, duration: 0.25, ease: 'back.out(2)' }, 2.55)
    // 04 Build: fittings go in and the walls become solid.
    .to('.pl-stamp', { opacity: 0, duration: 0.2 }, 3)
    .to(draw('.pl-fittings'), { strokeDashoffset: 0, stagger: 0.07, duration: 0.5 }, 3)
    .to('.pl-walls path', { strokeWidth: 9, duration: 0.5 }, 3.3)
    // 05 Walkthrough: the finished room.
    .to('.pr-photo', { clipPath: 'circle(82% at 58% 50%)', duration: 0.8, ease: 'power1.inOut' }, 4)
    .to({}, { duration: 0.2 }, 4.8);
}

/** Expertise: the image and counter follow whichever service is centred. */
function expertise() {
  const items = gsap.utils.toArray<HTMLElement>('[data-cap-item]');
  const imgs = gsap.utils.toArray<HTMLImageElement>('.ex-media [data-cap]');
  const count = document.querySelector('.ex-count b');
  let active = 0;
  let requested = 0;
  // Clipped images may never enter the browser's native lazy-load threshold.
  // Warm the whole stack near the section, without competing with the hero.
  const media = document.querySelector('.ex-media');
  if (media) {
    const prewarm = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      imgs.forEach((img) => { img.loading = 'eager'; });
      prewarm.disconnect();
    }, { rootMargin: '800px 0px' });
    prewarm.observe(media);
  }
  const activate = async (index: number) => {
    requested = index;
    if (index === active) return;
    const image = imgs[index];
    if (!image) return;
    image.loading = 'eager';
    try {
      await image.decode();
    } catch {
      // Keep the current image and label if the requested image cannot load.
      return;
    }
    // A newer hover/scroll selection must win over an older network response.
    if (requested !== index || index === active) return;
    // The outgoing image stays in place underneath while the new one wipes in.
    imgs.forEach((el, i) => el.classList.toggle('was-on', i === active));
    active = index;
    items.forEach((el, i) => el.classList.toggle('is-on', i === index));
    imgs.forEach((el, i) => el.classList.toggle('is-on', i === index));
    if (count) count.textContent = String(index + 1).padStart(2, '0');
  };
  items.forEach((el, i) => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 55%',
      end: 'bottom 55%',
      onEnter: () => activate(i),
      onEnterBack: () => activate(i),
    });
    el.addEventListener('mouseenter', () => activate(i));
  });
}

/** Rooms: vertical scroll drives a horizontal gallery with inner parallax. */
function rooms() {
  if (!motion) return;
  const track = document.querySelector<HTMLElement>('.rm-track');
  if (!track) return;
  // Phones get a native swipe gallery: a pinned sideways scroll fights the thumb.
  if (window.matchMedia('(max-width: 900px)').matches) {
    document.documentElement.classList.add('rm-swipe');
    // The gallery opens on a photograph: its title moves out of the swipe strip, above it.
    const title = track.querySelector('.rm-title');
    if (title) track.before(title);
    const hint = document.querySelector('.rm-hint');
    if (hint) hint.textContent = 'Swipe';
    swipeRegion(track);
    return;
  }
  const distance = () => track.scrollWidth - window.innerWidth;
  // The gallery slides its full width in at most one screen of scrolling.
  const hold = () => Math.min(distance(), window.innerHeight);
  const slide = gsap.to(track, {
    x: () => -distance(),
    ease: 'none',
    scrollTrigger: {
      trigger: '.rm-pin',
      start: 'top top',
      end: () => `+=${hold()}`,
      pin: true,
      scrub: 0.5,
      invalidateOnRefresh: true,
    },
  });
  track.addEventListener('focusin', (event) => {
    const figure = event.target instanceof Element ? event.target.closest('figure') : null;
    const st = slide.scrollTrigger;
    if (!figure || !st) return;
    const left = figure.getBoundingClientRect().left - track.getBoundingClientRect().left - window.innerWidth * 0.15;
    const progress = Math.min(1, Math.max(0, left / distance()));
    window.scrollTo({ top: st.start + progress * (st.end - st.start), behavior: 'instant' });
  });
  gsap.utils.toArray<HTMLElement>('.rm-track figure img').forEach((img) => {
    gsap.fromTo(
      img,
      { xPercent: -8 },
      {
        xPercent: 8,
        ease: 'none',
        scrollTrigger: { trigger: img, containerAnimation: slide, start: 'left right', end: 'right left', scrub: true },
      },
    );
  });
}

/** Video band: grows from an inset frame to full bleed. */
function band() {
  gsap.fromTo(
    '.bd-frame',
    { clipPath: 'inset(14% 18% 14% 18%)' },
    {
      clipPath: 'inset(0% 0% 0% 0%)',
      ease: 'none',
      scrollTrigger: { trigger: '.bd', start: 'top 85%', end: 'top 10%', scrub: 0.4 },
    },
  );
  gsap.from('.bd h2', {
    yPercent: 40,
    opacity: 0,
    ease: 'none',
    scrollTrigger: { trigger: '.bd', start: 'top 45%', end: 'top 5%', scrub: 0.4 },
  });
}

/** Facts: numbers count up once, and the rule above them draws across. */
function facts() {
  gsap.from('.fc', {
    '--rule': 0,
    duration: 1.4,
    ease: 'power3.inOut',
    scrollTrigger: { trigger: '.fc', start: 'top 80%' },
  });
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

/** Simple rise-in for the remaining blocks. */
function reveals() {
  gsap.utils.toArray<HTMLElement>('.rv blockquote, .ex-list .cg-label').forEach((el) => {
    gsap.from(el, {
      y: 36,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 92%' },
    });
  });
}
