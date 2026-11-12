// The decorative video should not compete with the first screen for bandwidth.
// Retain its poster for reduced-motion and data-saving visitors.
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;

document.querySelectorAll<HTMLVideoElement>('[data-deferred-video]').forEach((video) => {
  let nearViewport = false;
  let visible = false;
  let loaded = false;
  const update = () => {
    if (motionPreference.matches || connection?.saveData || document.hidden) {
      video.pause();
      return;
    }
    if (nearViewport && !loaded) {
      video.querySelectorAll<HTMLSourceElement>('source[data-src]').forEach((source) => {
        source.src = source.dataset.src!;
      });
      video.load();
      loaded = true;
    }
    if (visible && loaded) void video.play().catch(() => { /* Poster remains if autoplay is unavailable. */ });
    else video.pause();
  };
  new IntersectionObserver(([entry]) => {
    nearViewport = entry.isIntersecting;
    update();
  }, { rootMargin: '400px 0px' }).observe(video);
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    update();
  }).observe(video);
  motionPreference.addEventListener('change', update);
  document.addEventListener('visibilitychange', update);
});
