// ============================ scroll.js ============================
// All scroll-related logic in one file. Comments are in English.
// ==================================================================


/* -------------------- Base refs used by scroll features -------------------- */
const dheader = document.querySelector('[data-header]');
const sections = [...document.querySelectorAll('[data-section]')];


/* -------------------- Small utils -------------------- */
const vw = () => window.innerWidth || document.documentElement.clientWidth || 0;
const vh = () => window.innerHeight || document.documentElement.clientHeight || 0;
const clamp01 = v => Math.max(0, Math.min(1, v));
const lerp = (a,b,t) => a + (b-a)*t;


/* -------------------- Neutralize GSAP/Smoother leftovers -------------------- */
(function normalizeScrollDOM() {
  const wrap = document.getElementById('smooth-wrapper');
  const cont = document.getElementById('smooth-content');
  if (wrap) {
    wrap.style.removeProperty('position');
    wrap.style.removeProperty('inset');
    wrap.style.removeProperty('overflow');
    wrap.style.removeProperty('width');
    wrap.style.removeProperty('height');
  }
  if (cont) {
    cont.style.removeProperty('transform');
    cont.style.removeProperty('translate');
    cont.style.removeProperty('rotate');
    cont.style.removeProperty('scale');
    cont.style.boxSizing = 'border-box';
    cont.style.width = '100%';
    cont.style.overflow = 'visible';
  }
  document.documentElement.style.overflowX = 'hidden';
  document.body.style.overflowX = 'hidden';
})();


/* -------------------- Inject minimal CSS (hero + helpers) -------------------- */
(function injectStyles(){
  const css = `
    html, body { overflow-x: hidden; }

    .hero{
      overflow: visible;
      width: 100% !important;
      max-width: none !important;
      min-height: 100vh;
      position: relative;
    }

    .hero-main{
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: visible;
    }

    /* host must not be 3D-transformed (keeps vector crisp) */
    .hero-title{
      max-width: min(100vw, 100vh);
      transform-origin: 50% 50%;
      transform: none;
      backface-visibility: visible;
      opacity: 1;
      filter: none;
      pointer-events: none;
    }
    .hero-title.is-svg{
      transform: none !important;
      will-change: auto !important;
      backface-visibility: visible !important;
      overflow: visible; /* CSS box (helps in some UAs) */
    }

    #hero-spacer{
      width: 100%;
      height: 1px;
      pointer-events: none;
    }

    .design-process__content{ position: relative; overflow: visible; }
    .design-process__steps{}
  `;
  const s = document.createElement('style');
  s.setAttribute('data-inline-styles','hero-vanilla-rAF');
  s.textContent = css;
  document.head.appendChild(s);
})();


/* -------------------- HERO zoom + hide-after (px) + zoom anchor --------------------
   - Vector zoom via SVG viewBox (no blur, centered by "anchor", no clipping)
   - Piecewise progress: 1 -> 400 smoothly, then 400 -> 1000 sharply
   - Page below is released only after zoom finishes (via spacer)
   - Hide enlarged object after configurable threshold in PX (default 2000)
   - Config knobs:
       * data-hide-after-px on .hero-title   (e.g., data-hide-after-px="2500")
       * window.HERO_HIDE_AFTER_PX           (number)
       * data-zoom-anchor-x / data-zoom-anchor-y on .hero-title (0..1)
       * window.HERO_ZOOM_ANCHOR_X / _Y
----------------------------------------------------------------------------- */
(() => {
  // Zoom targets (interpreted as scale factor relative to initial viewBox)
  const SCALE_STAGE1   = 400;   // smooth phase target
  const SCALE_END_ALL  = 1000;  // final "whiteout"

  // Scroll distances that control zoom progress (in viewport %)
  const DIST_VH_DESKTOP = 140;
  const DIST_VH_TABLET  = 160;
  const DIST_VH_MOBILE  = 180;

  // Fraction of progress for stage 1 (smooth)
  const BREAK_AT = 0.72;

  const hero  = document.querySelector('.hero');
  const title = document.querySelector('.hero-title'); // inline <svg class="hero-title is-svg">
  const after = document.querySelector('.container__wrap');
  if (!hero || !title || !after) return;

  // -------- Config: hide-after px --------
  const DEFAULT_HIDE_AFTER_PX = 2000;
  function readHideAfterPx() {
    const attr = title.getAttribute('data-hide-after-px');
    if (attr != null && attr.trim() !== '' && !isNaN(parseFloat(attr))) return Math.max(0, parseFloat(attr));
    if (typeof window.HERO_HIDE_AFTER_PX === 'number' && isFinite(window.HERO_HIDE_AFTER_PX)) return Math.max(0, window.HERO_HIDE_AFTER_PX);
    return DEFAULT_HIDE_AFTER_PX;
  }

  // -------- Config: zoom anchor (0..1) --------
  const DEFAULT_ANCHOR_X = 0.475;
  const DEFAULT_ANCHOR_Y = 0.5;
  function readAnchor() {
    const axAttr = title.getAttribute('data-zoom-anchor-x');
    const ayAttr = title.getAttribute('data-zoom-anchor-y');
    const ax = (axAttr != null && axAttr.trim() !== '' && isFinite(parseFloat(axAttr)))
      ? parseFloat(axAttr)
      : (typeof window.HERO_ZOOM_ANCHOR_X === 'number' ? window.HERO_ZOOM_ANCHOR_X : DEFAULT_ANCHOR_X);
    const ay = (ayAttr != null && ayAttr.trim() !== '' && isFinite(parseFloat(ayAttr)))
      ? parseFloat(ayAttr)
      : (typeof window.HERO_ZOOM_ANCHOR_Y === 'number' ? window.HERO_ZOOM_ANCHOR_Y : DEFAULT_ANCHOR_Y);
    return { ax: clamp01(ax), ay: clamp01(ay) };
  }
  const { ax, ay } = readAnchor();

  // -------- Detect inline SVG root --------
  let svgRoot = null;
  if (title instanceof SVGSVGElement) svgRoot = title;
  else {
    const inner = title.querySelector && title.querySelector('svg');
    if (inner instanceof SVGSVGElement) svgRoot = inner;
  }
  const hasSVG = !!svgRoot;
  if (hasSVG) {
    title.classList.add('is-svg');
    if (!svgRoot.hasAttribute('preserveAspectRatio')) {
      svgRoot.setAttribute('preserveAspectRatio','xMidYMid meet'); // keep AR, centered
    }
    svgRoot.style.overflow = 'visible';
    svgRoot.setAttribute('shape-rendering','geometricPrecision');
    svgRoot.setAttribute('text-rendering','geometricPrecision');
  } else {
    // Fallback for non-SVG targets: pivot CSS scale at the same anchor
    title.style.transformOrigin = `${ax * 100}% ${ay * 100}%`;
  }

  // -------- Parse/ensure initial viewBox --------
  let vb0 = null; // {x,y,w,h,cx,cy}
  if (hasSVG) {
    const vb = (svgRoot.getAttribute('viewBox') || '').trim().split(/\s+/).map(Number);
    if (vb.length !== 4 || vb.some(n => !isFinite(n))) {
      const w = Number(svgRoot.getAttribute('width'))  || svgRoot.clientWidth  || 100;
      const h = Number(svgRoot.getAttribute('height')) || svgRoot.clientHeight || 100;
      svgRoot.setAttribute('viewBox', `0 0 ${w} ${h}`);
      vb0 = { x:0, y:0, w, h, cx:w/2, cy:h/2 };
    } else {
      const [x,y,w,h] = vb;
      vb0 = { x, y, w, h, cx:x + w/2, cy:y + h/2 };
    }
  }

  // -------- Spacer: prevents page below from scrolling until zoom finishes --------
  let spacer = document.getElementById('hero-spacer');
  if (!spacer) {
    spacer = document.createElement('div');
    spacer.id = 'hero-spacer';
    hero.parentNode?.insertBefore(spacer, hero.nextSibling);
  }

  // Easing helpers
  const easeInOutCubic = t => (t < 0.5) ? 4*t*t*t : 1 - Math.pow(-2*t + 2, 3) / 2;
  const easeOutExpo    = t => (t === 1 ? 1 : 1 - Math.pow(2, -10*t));

  // Runtime config holder
  let cfg = {
    distPx: 1,        // total scroll distance for the whole zoom
    spacerPx: 1,      // spacer height (to "hold" page)
    hideAfterPx: DEFAULT_HIDE_AFTER_PX // threshold to hide the title
  };

  // Remember original inline display to restore later
  const originalInlineDisplay = title.style.display || '';

  function recomputeConfig(){
    const distVH = (vw() >= 1280) ? DIST_VH_DESKTOP : (vw() >= 768 ? DIST_VH_TABLET : DIST_VH_MOBILE);
    cfg.distPx   = Math.max(1, Math.round(vh() * (distVH/100)));
    cfg.spacerPx = cfg.distPx;
    spacer.style.height = `${cfg.spacerPx}px`;
    cfg.hideAfterPx = readHideAfterPx();
  }

  // Progress based on how much top of hero has moved past the viewport top
  function measureProgress(){
    const rect = hero.getBoundingClientRect();
    const traveled = Math.max(0, -rect.top); // px scrolled past hero's top
    const p = clamp01(traveled / cfg.distPx);
    return { p, traveled };
  }

  // Piecewise scale curve
  function piecewiseScale(p){
    if (p <= BREAK_AT) {
      const t = easeInOutCubic(p / BREAK_AT);
      return lerp(1, SCALE_STAGE1, t);
    } else {
      const t = easeOutExpo((p - BREAK_AT) / (1 - BREAK_AT));
      return lerp(SCALE_STAGE1, SCALE_END_ALL, t);
    }
  }

  // Apply vector zoom by shrinking viewBox toward the anchor (no clipping)
  function setSvgViewBoxScale(scale){
    const w = vb0.w / scale;
    const h = vb0.h / scale;

    // Anchor point in original viewBox coords
    const cx = vb0.x + vb0.w * ax;
    const cy = vb0.y + vb0.h * ay;

    // Place shrunken box around the anchor
    const x = cx - w / 2;
    const y = cy - h / 2;

    const fx = n => Math.round(n * 1000) / 1000; // fewer decimals for perf
    svgRoot.setAttribute('viewBox', `${fx(x)} ${fx(y)} ${fx(w)} ${fx(h)}`);
  }

  // Visibility toggle (px-based)
  let isHidden = false;
  function applyHideIfNeeded(traveledPx){
    const shouldHide = traveledPx > cfg.hideAfterPx;
    if (shouldHide && !isHidden){
      title.style.display = 'none';
      isHidden = true;
    } else if (!shouldHide && isHidden){
      title.style.display = originalInlineDisplay;
      isHidden = false;
    }
  }

  let rafId = 0;
  function tick(){
    const { p, traveled } = measureProgress();

    // Toggle visibility according to traveled distance vs threshold
    applyHideIfNeeded(traveled);

    if (!isHidden){
      const s = piecewiseScale(p);
      if (hasSVG) setSvgViewBoxScale(s);
      else title.style.transform = `scale(${s})`;
    }

    rafId = requestAnimationFrame(tick);
  }

  (async () => {
    if (document.fonts?.ready) { try { await document.fonts.ready; } catch {} }
    // Double rAF to ensure layout is settled before measuring
    await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));

    recomputeConfig();
    cancelAnimationFrame(rafId);
    tick();

    const onRz = () => { recomputeConfig(); };
    window.addEventListener('resize', onRz, { passive: true });
    window.addEventListener('orientationchange', () => setTimeout(onRz, 120), { passive: true });
  })();
})();


/* -------------------- Header hide on scroll -------------------- */
(() => {
  if (!dheader) return;
  let lastScroll = 0;
  const hideHeight = 120; // px
  window.addEventListener("scroll", () => {
    if(!dheader.classList.contains("active")){
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      if (y > lastScroll && y > hideHeight) dheader.classList.add("header--hidden");
      else if (y < lastScroll) dheader.classList.remove("header--hidden");
      lastScroll = y;
    }
  }, { passive: true });
})();


/* -------------------- HorizontalScrollSteps (rAF-based) -------------------- */
(function attachHorizontalScrollSteps(){
  function HorizontalScrollSteps(){
    const container = document.querySelector(".design-process__content");
    if (!container) return;

    const steps = Array.from(document.querySelectorAll(".design-process__steps.selected"));
    if (!steps.length) return;

    let scrollAmount = 0;

    function measure(){
      scrollAmount = Math.max(0, container.scrollWidth - window.innerWidth);
    }

    function progressInViewport(){
      const rect = container.getBoundingClientRect();
      const vh_  = window.innerHeight || 1;
      const startLine = vh_ * 0.35;
      const endDist   = rect.height + vh_ * 0.30;
      const covered   = (vh_ - rect.top) - startLine;
      return clamp01(covered / Math.max(1, endDist));
    }

    let rafId = 0;
    function tick(){
      if (window.innerWidth <= 1024 || scrollAmount <= 0){
        steps.forEach(n => (n.style.transform = 'translate3d(0,0,0)'));
      } else {
        const p = progressInViewport();
        const x = -Math.round(scrollAmount * p);
        steps.forEach(n => (n.style.transform = `translate3d(${x}px,0,0)`));
      }
      rafId = requestAnimationFrame(tick);
    }

    const onRz = () => { measure(); };
    measure();
    tick();
    window.addEventListener('resize', onRz, { passive: true });
  }

  window.HorizontalScrollSteps = HorizontalScrollSteps;
  document.addEventListener("DOMContentLoaded", () => HorizontalScrollSteps());
})();


/* -------------------- Section-based header theme -------------------- */
(() => {
  if (!dheader || dheader.classList.contains("header--contacts")) return;

  const sectionToTheme = { light: 'light', dark: 'dark' };
  function setTheme(theme) {
    if (dheader.getAttribute('data-theme') === theme) return;
    dheader.setAttribute('data-theme', theme);
  }
  function checkThemeOnScroll() {
    const headerHeight = dheader.offsetHeight;
    const scrollPos = (window.scrollY || document.documentElement.scrollTop || 0) + headerHeight + 1;
    for (let section of sections) {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      if (scrollPos >= top && scrollPos < bottom) {
        const sectionKey = section.dataset.section;
        const theme = sectionToTheme[sectionKey] || 'light';
        setTheme(theme);
        break;
      }
    }
  }
  checkThemeOnScroll();
  window.addEventListener('scroll', checkThemeOnScroll, { passive: true });
})();


/* -------------------- Smooth scroll to anchors -------------------- */
(() => {
  document.querySelectorAll('.scroll-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();


/* -------------------- Header state when page moves from top -------------------- */
(() => {
  if (!dheader) return;
  const onScroll = () => {
    const y = window.scrollY || document.documentElement.scrollTop || 0;
    if (y > 0) dheader.classList.add('scrolling-started');
    else dheader.classList.remove('scrolling-started');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
})();
