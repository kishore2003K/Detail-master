let preloaderStartTime = Date.now();
let isDismissing = false;

export function hidePreloader(minDurationMs = 250) {
  if (isDismissing) return;

  const el = document.getElementById('preloader');
  if (!el || el.classList.contains('hide')) {
    document.body.classList.remove('loading');
    return;
  }

  const elapsed = Date.now() - preloaderStartTime;
  const remaining = Math.max(0, minDurationMs - elapsed);

  setTimeout(() => {
    const p = document.getElementById('preloader');
    if (!p || p.classList.contains('hide') || isDismissing) {
      document.body.classList.remove('loading');
      return;
    }

    isDismissing = true;
    p.classList.add('hide');
    p.style.pointerEvents = 'none';

    // Release scroll lock smoothly
    document.body.classList.remove('loading');

    // Remove preloader node from DOM after fade-out transition
    setTimeout(() => {
      if (p && p.parentNode) {
        p.parentNode.removeChild(p);
      }
    }, 400);
  }, remaining);
}
