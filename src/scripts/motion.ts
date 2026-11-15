import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

export { gsap, ScrollTrigger };

// Shared by every animated page. Only loaded when reduced motion is not requested,
// and every section is laid out in its finished state before this runs.

/** Smooth scrolling, driven by the same clock as the scroll-linked scenes. */
export function startMotion() {
  gsap.registerPlugin(ScrollTrigger);
  document.documentElement.classList.add('has-motion');
  const lenis = new Lenis({ lerp: 0.12 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  // The phone menu and the photo viewer lock the page, so it must not scroll smoothly underneath.
  const root = document.documentElement;
  const locked = () => root.classList.contains('menu-locked') || root.classList.contains('lb-open');
  new MutationObserver(() => (locked() ? lenis.stop() : lenis.start())).observe(root, {
    attributes: true,
    attributeFilter: ['class'],
  });
  return lenis;
}

/**
 * Header turns solid once the page top has scrolled away, and dark over dark sections.
 * Call last, so trigger positions account for any pinned sections above.
 */
export function headerTone(top: string) {
  const header = document.querySelector('.hd');
  if (!header) return;
  ScrollTrigger.create({
    trigger: top,
    start: 'bottom top+=72',
    onEnter: () => header.classList.add('is-solid'),
    onLeaveBack: () => header.classList.remove('is-solid'),
  });
  gsap.utils.toArray<HTMLElement>('[data-dark]').forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: 'top top+=56',
      end: 'bottom top+=56',
      toggleClass: { targets: header, className: 'on-dark' },
    });
  });
}
