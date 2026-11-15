// The decorative video should not compete with the first screen for bandwidth.
// Retain its poster for reduced-motion and data-saving visitors.
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;

document.querySelectorAll<HTMLVideoElement>('[data-deferred-video]').forEach((video) => {
  let nearViewport = false;
  let visible = false;
  let loaded = false;
  // A visible pause button (WCAG 2.2.2): once a visitor pauses, the video stays paused.
  let userPaused = false;
  const toggle = video.parentElement?.querySelector<HTMLButtonElement>('[data-video-toggle]');
  if (toggle && !motionPreference.matches && !connection?.saveData) {
    toggle.hidden = false;
    toggle.addEventListener('click', () => {
      userPaused = !userPaused;
      toggle.setAttribute('aria-pressed', String(userPaused));
      toggle.textContent = userPaused ? 'Play video' : 'Pause video';
      update();
    });
  }
  const update = () => {
    if (userPaused || motionPreference.matches || connection?.saveData || document.hidden) {
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
