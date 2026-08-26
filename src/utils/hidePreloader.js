let preloaderStartTime = Date.now();

export function hidePreloader(minDurationMs = 2400) {
  const el = document.getElementById('preloader');
  if (!el || el.classList.contains('hide')) return;

  const elapsed = Date.now() - preloaderStartTime;
  const remaining = Math.max(0, minDurationMs - elapsed);

  setTimeout(() => {
    if (!el || el.classList.contains('hide')) return;
    el.classList.add('hide');
    document.body.classList.remove('loading');
    setTimeout(() => {
      if (el && el.parentNode) {
        el.parentNode.removeChild(el);
      }
    }, 1200); // Wait for the 1.2s fade-out transition to complete
  }, remaining);
}

