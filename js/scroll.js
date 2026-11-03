/* Husker hvor langt man har scrollet på forsiden, slik at man havner
   på samme sted når man går tilbake fra et prosjekt. */
(function () {
  const KEY = 'portfolio-home-scroll';
  const main = document.querySelector('.page-content');
  const scroller = () => (main && main.scrollHeight > main.clientHeight + 1 ? main : null);
  const saved = Number(sessionStorage.getItem(KEY) || 0);
  let restoring = saved > 0;

  const apply = () => {
    const el = scroller();
    if (el) el.scrollTop = saved; else window.scrollTo(0, saved);
  };
  const save = () => {
    if (restoring) return;
    const el = scroller();
    sessionStorage.setItem(KEY, String(el ? el.scrollTop : window.scrollY));
  };

  if (restoring) {
    apply();
    // Bildene over kan endre høyden mens de laster, så sett posisjonen på nytt.
    document.querySelectorAll('.page-content img').forEach((img) => {
      if (!img.complete) img.addEventListener('load', () => restoring && apply(), { once: true });
    });
    window.addEventListener('load', () => { apply(); restoring = false; });
    // Brukeren tar over: slutt å flytte siden.
    ['wheel', 'touchstart', 'keydown'].forEach((ev) =>
      window.addEventListener(ev, () => { restoring = false; }, { once: true, passive: true }));
  }

  (main || window).addEventListener('scroll', save, { passive: true });
  window.addEventListener('scroll', save, { passive: true });
  window.addEventListener('pagehide', () => { restoring = false; save(); });
})();
