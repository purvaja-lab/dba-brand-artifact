// affordanceHint.js — pulse a control's affordance when its horizontal-scroll
// panel arrives at center. Editorial dispatches `hs-panel-active` (with the
// panel id) on arrival; on stacked/mobile (no horizontal scroll) we fall back
// to an IntersectionObserver. Returns a cleanup function.
window.affordanceHint = function (el, panelId) {
  if (!el) return function () {};
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return function () {};
  var cls = 'attn-hint';

  function fire() {
    el.classList.remove(cls);
    void el.offsetWidth; // force reflow so the animation restarts on re-arrival
    el.classList.add(cls);
  }
  function onEnd() { el.classList.remove(cls); }
  function onActive(e) {
    if (e && e.detail && e.detail.id === panelId) fire();
  }

  el.addEventListener('animationend', onEnd);
  window.addEventListener('hs-panel-active', onActive);

  // Stacked / mobile: no horizontal scroll, so observe the element directly.
  var io = null;
  var stacked = window.matchMedia && window.matchMedia('(max-width: 767px)').matches;
  if (stacked && 'IntersectionObserver' in window) {
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) fire(); });
    }, { threshold: 0.6 });
    io.observe(el);
  }

  // If this panel is already the active one at mount, hint shortly after.
  if (window.__hsActivePanel === panelId) setTimeout(fire, 500);

  return function destroy() {
    window.removeEventListener('hs-panel-active', onActive);
    el.removeEventListener('animationend', onEnd);
    if (io) io.disconnect();
    el.classList.remove(cls);
  };
};
