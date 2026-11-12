import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// All scroll-driven motion for the home page. Without JavaScript, or with
// reduced motion requested, every section renders in its finished state.
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduce) {
  gsap.registerPlugin(ScrollTrigger);
  document.documentElement.classList.add('has-motion');

  const lenis = new Lenis({ lerp: 0.12 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  statement();
  processStory();
  expertise();
  rooms();
  band();
  facts();
  reveals();
  contact();
  // Created last so its trigger positions account for the pinned sections above.
  header();
}

/** Header turns solid once the hero has scrolled away. */
function header() {
  ScrollTrigger.create({
    trigger: '.cg-hero',
    start: 'bottom top+=72',
    onEnter: () => document.querySelector('.hd')?.classList.add('is-solid'),
    onLeaveBack: () => document.querySelector('.hd')?.classList.remove('is-solid'),
  });
  // Over dark sections the solid header switches to its dark variant.
  gsap.utils.toArray<HTMLElement>('[data-dark]').forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: 'top top+=56',
      end: 'bottom top+=56',
      toggleClass: { targets: '.hd', className: 'on-dark' },
    });
  });
}

/** Statement: words ink in one by one as the section crosses the viewport. */
function statement() {
  gsap.fromTo(
    '.st-text span',
    { opacity: 0.12 },
    {
      opacity: 1,
      stagger: 0.12,
      ease: 'none',
      scrollTrigger: { trigger: '.st-text', start: 'top 82%', end: 'bottom 45%', scrub: 0.4 },
    },
  );
}

/** Process: a pinned floor plan that develops through the five stages. */
function processStory() {
  const section = document.querySelector<HTMLElement>('.pr');
  if (!section) return;
  const steps = gsap.utils.toArray<HTMLElement>('.pr-steps li');
  const stage = section.querySelector<HTMLElement>('.pr-stage');
  const names = ['Sketch', 'Design', 'Scope + planning', 'Construction', 'Walkthrough'];
  let current = 0;

  const draw = (group: string) => `${group} .draw`;
  gsap.set('.pr .draw', { strokeDasharray: 1, strokeDashoffset: 1 });
  gsap.set(['.pl-labels text', '.pl-dims text'], { opacity: 0 });
  gsap.set('.pl-stamp', { opacity: 0, scale: 1.7, transformOrigin: '50% 50%' });
  gsap.set('.pr-photo', { clipPath: 'circle(0% at 58% 50%)' });

  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: '.pr-pin',
      start: 'top top',
      end: '+=420%',
      pin: true,
      scrub: 0.5,
      onUpdate: (self) => {
        gsap.set('.pr-progress i', { scaleX: self.progress });
        const index = Math.min(4, Math.floor(self.progress * 5));
        if (index === current) return;
        current = index;
        steps.forEach((li, i) => li.classList.toggle('is-on', i === index));
        if (stage) stage.textContent = names[index];
      },
    },
  });

  // 01 Conversation: rooms sketched as loose bubbles.
  tl.to(draw('.pl-bubbles'), { strokeDashoffset: 0, stagger: 0.12, duration: 0.6 }, 0)
    .to('.pl-labels text', { opacity: 1, stagger: 0.08, duration: 0.3 }, 0.3)
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
  const track = document.querySelector<HTMLElement>('.rm-track');
  if (!track) return;
  // Phones get a native swipe gallery: a pinned sideways scroll fights the thumb.
  if (window.matchMedia('(max-width: 900px)').matches) {
    document.documentElement.classList.add('rm-swipe');
    const hint = document.querySelector('.rm-hint');
    if (hint) hint.textContent = 'Swipe';
    return;
  }
  const distance = () => track.scrollWidth - window.innerWidth;
  const slide = gsap.to(track, {
    x: () => -distance(),
    ease: 'none',
    scrollTrigger: {
      trigger: '.rm-pin',
      start: 'top top',
      end: () => `+=${distance()}`,
      pin: true,
      scrub: 0.5,
      invalidateOnRefresh: true,
    },
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
  gsap.utils.toArray<HTMLElement>('.rv blockquote, .ex-list .cg-label, .ct-pills a, .ct-grid > div').forEach((el) => {
    gsap.from(el, {
      y: 36,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 92%' },
    });
  });
}

/** Contact: the closing question rises line by line. */
function contact() {
  gsap.from('.ct-title span', {
    yPercent: 60,
    opacity: 0,
    duration: 1.1,
    stagger: 0.12,
    ease: 'power4.out',
    scrollTrigger: { trigger: '.ct-title', start: 'top 85%' },
  });
}
