export function hidePreloader() {
  const el = document.getElementById('preloader');
  if (!el) return;
  el.classList.add('hide');
  document.body.classList.remove('loading');
  setTimeout(() => el.remove(), 500); // remove from DOM after fade completes
}
