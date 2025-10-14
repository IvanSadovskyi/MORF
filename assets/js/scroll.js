'use strict';

(function () {
    // === Tunables ===
    // 1) Slow down zoom progression (applied to the zoom progress only)
    const ZOOM_SPEED_MULTIPLIER = 0.1; // 0.5 => 2x slower; your test: 0.1

    // 2) End sticky earlier so content starts scrolling sooner (independent of zoom)
    const STICKY_LENGTH_MULTIPLIER = 0.3; // 0.75 => ~25% earlier; your test: 0.1

    // 3) Keep zooming AFTER sticky ends (while page is already scrolling)
    //    Over the next N viewport-heights, zoom toward (scale_at_sticky_end * factor).
    const POST_SCROLL_ZOOM_FACTOR = 8.0;      // e.g. 2.0 => double vs scale at sticky end; your test: 4.0
    const POST_SCROLL_ZOOM_DISTANCE_VH = 12; // distance of post-zoom in viewport heights; your test: 12

    // 4) Define how long the "virtual" zoom track is (in px) independently of sticky length.
    //    By default it equals the baseline extraScroll (no sticky multiplier).
    const ZOOM_RANGE_MULTIPLIER = 1.0; // keep 1.0 unless you want longer/shorter zoom track

    const hero = document.querySelector('.hero');
    const heroMain = hero ? hero.querySelector('.hero-main') : null;
    const heroTitle = heroMain ? heroMain.querySelector('.hero-title') : null;
    const svgRoot = heroTitle && heroTitle.tagName.toLowerCase() === 'svg'
        ? heroTitle
        : (heroTitle ? heroTitle.querySelector('svg') : null);
    const headingBlock = document.querySelector('.breadcrumbs-heading');
    const headerLeft = document.querySelector('.header__left--delayed');

    if (!hero || !heroMain || !heroTitle || !svgRoot) {
        return;
    }

    const clamp01 = function (value) { return Math.max(0, Math.min(1, value)); };
    const easeOutCubic = function (t) { return 1 - Math.pow(1 - t, 3); };
    const easeInOutCubic = function (t) {
        if (t <= 0) return 0;
        if (t >= 1) return 1;
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };
    const easeInOutSine = function (t) {
        const clamped = clamp01(t);
        return -(Math.cos(Math.PI * clamped) - 1) / 2;
    };

    const readAnchor = function (attr, fallback) {
        if (!heroTitle.hasAttribute(attr)) return fallback;
        const raw = parseFloat(heroTitle.getAttribute(attr) || '');
        return Number.isFinite(raw) ? clamp01(raw) : fallback;
    };

    const anchorX = readAnchor('data-zoom-anchor-x', 0.47672);
    const anchorY = readAnchor('data-zoom-anchor-y', 0.5);

    svgRoot.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    svgRoot.style.overflow = 'visible';
    svgRoot.setAttribute('shape-rendering', 'geometricPrecision');
    svgRoot.setAttribute('text-rendering', 'geometricPrecision');

    const injectOnce = function () {
        if (document.head.querySelector('[data-hero-inline-style]')) return;
        const style = document.createElement('style');
        style.setAttribute('data-hero-inline-style', 'true');
        style.textContent = [
            '.hero{position:relative;cursor:pointer;}',
            '.hero-main{position:sticky;top:0;height:100vh;display:flex;align-items:center;justify-content:center;overflow:visible;}',
            '.hero-title{max-width:min(92vw,92vh);width:min(92vw,92vh);height:auto;display:block;pointer-events:none;will-change:auto;}',
            '.hero-title.is-svg{transform:none!important;}',
            '.hero-title.is-hidden{visibility:hidden;opacity:0;}',
            '.header__left--delayed{opacity:0;pointer-events:none;transition:opacity 0.25s ease;}',
            '.hero-art-hidden .header__left--delayed{opacity:1;pointer-events:auto;}'
        ].join('');
        document.head.appendChild(style);
    };

    injectOnce();

    if (!hero.hasAttribute('tabindex')) hero.setAttribute('tabindex', '0');
    if (!hero.hasAttribute('role')) hero.setAttribute('role', 'button');
    // (no aria-* attributes per your preference)

    const initialViewBox = (function () {
        const raw = (svgRoot.getAttribute('viewBox') || '').trim().split(/\s+/).map(Number);
        if (raw.length === 4 && raw.every(function (n) { return isFinite(n); })) {
            const x = raw[0], y = raw[1], width = raw[2], height = raw[3];
            return { x, y, width, height, centerX: x + width * anchorX, centerY: y + height * anchorY };
        }
        const width = Number(svgRoot.getAttribute('width')) || svgRoot.clientWidth || 100;
        const height = Number(svgRoot.getAttribute('height')) || svgRoot.clientHeight || 100;
        svgRoot.setAttribute('viewBox', '0 0 ' + width + ' ' + height);
        return { x: 0, y: 0, width, height, centerX: width * anchorX, centerY: height * anchorY };
    })();

    const applyScale = function (scale) {
        const width = initialViewBox.width / scale;
        const height = initialViewBox.height / scale;
        const x = initialViewBox.centerX - width / 2;
        const y = initialViewBox.centerY - height / 2;
        const toFixed = function (n) { return Math.round(n * 1000) / 1000; };
        svgRoot.setAttribute('viewBox', [toFixed(x), toFixed(y), toFixed(width), toFixed(height)].join(' '));
    };

    const computeExtraScroll = function () {
        const w = window.innerWidth || document.documentElement.clientWidth || 1;
        const h = window.innerHeight || document.documentElement.clientHeight || 1;
        const aspect = w / h;
        const base = h * 0.34;
        if (aspect >= 2.2) return Math.max(180, h * 0.26);
        if (aspect >= 1.6) return Math.max(210, h * 0.3);
        if (aspect >= 1.2) return Math.max(250, h * 0.34);
        return Math.max(300, base);
    };

    let scrollRange = 1;      // sticky length (px)
    let extraScroll = 0;      // sticky tail (px)
    let zoomRangePx = 1;      // virtual zoom track (px), independent of sticky
    let heroPageTop = 0;      // page Y where hero starts

    const getPageYOffset = function () {
        return window.pageYOffset || document.documentElement.scrollTop || 0;
    };

    const calcElementPageTop = function (el) {
        const rect = el.getBoundingClientRect();
        return rect.top + getPageYOffset();
    };

    const updateLayout = function () {
        // Baseline (unmodified) extra scroll used to define the zoom track:
        const baseExtra = computeExtraScroll();

        // Sticky uses the shortened extra length (independent from zoom track):
        extraScroll = baseExtra * STICKY_LENGTH_MULTIPLIER;

        const viewportH = window.innerHeight || document.documentElement.clientHeight || 0;
        const computedHeight = viewportH + extraScroll;
        hero.style.minHeight = computedHeight + 'px';
        hero.style.height = computedHeight + 'px';

        scrollRange = Math.max(1, computedHeight - viewportH); // == extraScroll
        zoomRangePx = Math.max(1, baseExtra * ZOOM_RANGE_MULTIPLIER); // independent track

        heroPageTop = calcElementPageTop(hero);
    };

    updateLayout();

    let resizeTimer = 0;
    window.addEventListener('resize', function () {
        if (resizeTimer) window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(updateLayout, 120);
    }, { passive: true });

    // Sticky progress (0..1) — controls when content starts; tied to sticky length only
    const measureStickyProgress = function () {
        const rect = hero.getBoundingClientRect();
        const travelled = Math.max(0, Math.min(scrollRange, -rect.top));
        return scrollRange > 0 ? travelled / scrollRange : 0;
    };

    // Zoom progress (0..1) — measured along a *virtual* track independent of sticky length
    const measureZoomProgressBase = function () {
        const currentY = getPageYOffset();
        const deltaFromHeroTop = currentY - heroPageTop; // how many px scrolled since hero top reached
        const travelled = Math.max(0, Math.min(zoomRangePx, deltaFromHeroTop));
        return zoomRangePx > 0 ? travelled / zoomRangePx : 0;
    };

    const scaleForProgress = function (progress) {
        const stageOneEnd = 0.85;
        const stageOneScale = 48;
        const finalScale = 138;
        if (progress <= stageOneEnd) {
            const t = easeOutCubic(progress / stageOneEnd);
            return 1 + (stageOneScale - 1) * t;
        }
        const t = easeInOutCubic((progress - stageOneEnd) / (1 - stageOneEnd));
        return stageOneScale + (finalScale - stageOneScale) * t;
    };

    const fadeForProgress = function (progress, hasHeading) {
        if (hasHeading) return 1;
        const fadeStart = 0.965;
        const fadeEnd = 1;
        if (progress <= fadeStart) return 1;
        if (progress >= fadeEnd) return 0;
        return 1 - (progress - fadeStart) / (fadeEnd - fadeStart);
    };

    const fadeForHeading = function () {
        if (!headingBlock) return 1;
        const rect = headingBlock.getBoundingClientRect();
        if (rect.bottom > 0) return 1;
        const fadeWindow = Math.max(80, Math.min(200, rect.height || 120));
        const depth = Math.min(fadeWindow, Math.abs(rect.bottom));
        return Math.max(0, 1 - depth / fadeWindow);
    };

    const nextSection = hero.nextElementSibling;
    let rafId = 0;
    let scrollAnimationFrame = 0;
    let isProgrammaticScroll = false;
    let forcedCompletion = null;

    // Post-sticky helpers
    let stickyEndY = 0;
    let stickyEnded = false;
    let scaleAtStickyEnd = 1;

    const startForcedCompletion = function (approxDuration) {
        const currentProgress = clamp01(measureStickyProgress());
        if (currentProgress >= 0.995) { forcedCompletion = null; return; }
        const duration = Math.max(700, Math.min(approxDuration, 1800));
        forcedCompletion = { start: currentProgress, startedAt: performance.now(), duration };
    };

    const cancelProgrammaticScroll = function () {
        if (!isProgrammaticScroll) return;
        if (scrollAnimationFrame) {
            window.cancelAnimationFrame(scrollAnimationFrame);
            scrollAnimationFrame = 0;
        }
        isProgrammaticScroll = false;
        forcedCompletion = null;
    };

    const resolveScrollTarget = function () {
        if (nextSection) {
            const rect = nextSection.getBoundingClientRect();
            const offset = getPageYOffset();
            return rect.top + offset;
        }
        const heroRect = hero.getBoundingClientRect();
        const offset = getPageYOffset();
        return heroRect.top + offset + hero.offsetHeight;
    };

    const animateScrollTo = function (targetY, duration) {
        const maxScrollable = Math.max(
            0,
            Math.min(
                targetY,
                (document.documentElement.scrollHeight || document.body.scrollHeight || 0) - (window.innerHeight || 0)
            )
        );
        const startY = getPageYOffset();
        const distance = maxScrollable - startY;
        if (Math.abs(distance) < 1) return;

        const boundedDuration = Math.max(2600, Math.min(duration, 4200));
        const startTime = performance.now();
        isProgrammaticScroll = true;

        const step = function (timestamp) {
            const elapsed = timestamp - startTime;
            const progress = Math.min(1, elapsed / boundedDuration);
            const eased = easeInOutSine(progress);
            window.scrollTo(0, startY + distance * eased);
            if (progress < 1) {
                scrollAnimationFrame = window.requestAnimationFrame(step);
                return;
            }
            cancelProgrammaticScroll();
        };

        if (scrollAnimationFrame) window.cancelAnimationFrame(scrollAnimationFrame);
        scrollAnimationFrame = window.requestAnimationFrame(step);
    };

    const triggerHeroPlayback = function () {
        if (isProgrammaticScroll) return;
        const target = resolveScrollTarget();
        const current = getPageYOffset();
        const distance = Math.abs(target - current);
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 1;
        const duration = Math.max(2600, Math.min(3800, (distance / viewportHeight) * 2300));
        startForcedCompletion(duration * 0.65);
        animateScrollTo(target, duration);
    };

    const handleHeroKeydown = function (event) {
        if (event.defaultPrevented) return;
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            triggerHeroPlayback();
        }
    };

    hero.addEventListener('click', function (event) {
        if (event.defaultPrevented) return;
        event.preventDefault();
        triggerHeroPlayback();
    });

    hero.addEventListener('keydown', handleHeroKeydown);

    window.addEventListener('wheel', cancelProgrammaticScroll, { passive: true });
    window.addEventListener('touchstart', cancelProgrammaticScroll, { passive: true });

    const render = function () {
        const now = performance.now();

        // Sticky progress (drives visibility toggles/fades and defines sticky end)
        let stickyProgress = measureStickyProgress();

        if (forcedCompletion) {
            const elapsed = now - forcedCompletion.startedAt;
            const t = clamp01(forcedCompletion.duration > 0 ? elapsed / forcedCompletion.duration : 1);
            const eased = easeInOutSine(t);
            const targetProgress = Math.min(1, forcedCompletion.start + (1 - forcedCompletion.start) * eased);
            stickyProgress = Math.max(stickyProgress, targetProgress);
            if (t >= 1 || targetProgress >= 0.999) {
                forcedCompletion = null;
            }
        }

        // Compute sticky end Y once per layout
        stickyEndY = heroPageTop + scrollRange;

        // Zoom progress along the independent virtual track
        const zoomProgressBase = measureZoomProgressBase();                // 0..1 independent
        const zoomProgress = clamp01(zoomProgressBase * ZOOM_SPEED_MULTIPLIER);
        let scale = scaleForProgress(zoomProgress);

        // Capture the scale exactly at sticky end (first time we cross it)
        if (!stickyEnded && stickyProgress >= 1) {
            stickyEnded = true;
            scaleAtStickyEnd = scale; // store current zoom scale at the moment sticky finishes
        } else if (stickyEnded && stickyProgress < 1) {
            // if user scrolls back up, allow recapture
            stickyEnded = false;
        }

        // Post-sticky zoom continuation toward scaleAtStickyEnd * POST_SCROLL_ZOOM_FACTOR
        const currentY = getPageYOffset();
        if (stickyEnded && POST_SCROLL_ZOOM_FACTOR > 1) {
            const vh = (window.innerHeight || document.documentElement.clientHeight || 1);
            const postRangePx = Math.max(1, vh * (POST_SCROLL_ZOOM_DISTANCE_VH / 100));
            const postDelta = Math.max(0, currentY - stickyEndY);
            const postT = clamp01(postDelta / postRangePx);
            const targetPostScale = scaleAtStickyEnd + (scaleAtStickyEnd * (POST_SCROLL_ZOOM_FACTOR - 1)) * easeOutCubic(postT);
            scale = Math.max(scale, targetPostScale);
        }

        applyScale(scale);

        // Opacity and body toggles stick to the sticky progress (not the slowed zoom)
        const opacityProgress = fadeForProgress(stickyProgress, Boolean(headingBlock));
        const opacityHeading = fadeForHeading();
        const opacity = Math.min(opacityProgress, opacityHeading);
        heroTitle.style.opacity = String(opacity);

        const isHidden = opacity <= 0.001;
        heroTitle.classList.toggle('is-hidden', isHidden);
        document.body.classList.toggle('hero-art-hidden', isHidden);
        if (!isHidden && headerLeft && document.body.classList.contains('hero-art-hidden')) {
            document.body.classList.remove('hero-art-hidden');
        }

        rafId = window.requestAnimationFrame(render);
    };

    window.requestAnimationFrame(function () {
        if (rafId) window.cancelAnimationFrame(rafId);
        render();
    });
})();
