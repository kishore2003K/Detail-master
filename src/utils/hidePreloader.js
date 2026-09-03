let preloaderStartTime = Date.now();

export function hidePreloader(minDurationMs = 500) {
  const el = document.getElementById('preloader');
  if (!el || el.classList.contains('hide')) {
    document.body.classList.remove('loading');
    return;
  }

  const elapsed = Date.now() - preloaderStartTime;
  const remaining = Math.max(0, minDurationMs - elapsed);

  setTimeout(() => {
    const p = document.getElementById('preloader');
    if (!p) {
      document.body.classList.remove('loading');
      return;
    }
    p.classList.add('hide');
    p.style.pointerEvents = 'none';
    document.body.classList.remove('loading');

    setTimeout(() => {
      if (p && p.parentNode) {
        p.parentNode.removeChild(p);
      }
    }, 500);
  }, remaining);
}

