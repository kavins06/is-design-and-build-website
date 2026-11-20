import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export { gsap, ScrollTrigger };

// Shared by every animated page. Only loaded when reduced motion is not requested,
// and every section is laid out in its finished state before this runs.

/**
 * Turns on the scroll-linked scenes. The page scrolls natively: an eased smooth-scroll layer
 * made every wheel and trackpad scroll trail behind the hand, which read as slow scrolling.
 */
export function startMotion() {
  gsap.registerPlugin(ScrollTrigger);
  document.documentElement.classList.add('has-motion');
  return true;
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
