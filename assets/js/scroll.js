'use strict';

(function () {
    // === Tweaks you asked for ===
    // Slow zoom x2 (i.e., progress fed into zoom curve is halved)
    const ZOOM_SPEED_MULTIPLIER = 0.1; // 0.5 => 2x slower zoom

    // Make content start scrolling ~25% earlier (shorter sticky height)
    const STICKY_LENGTH_MULTIPLIER = 0.75; // 0.75 => 25% earlier

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

    const clamp01 = function (value) {
        return Math.max(0, Math.min(1, value));
    };

    const easeOutCubic = function (t) {
        return 1 - Math.pow(1 - t, 3);
    };

    const easeInOutCubic = function (t) {
        if (t <= 0) {
            return 0;
        }
        if (t >= 1) {
            return 1;
        }
        return t < 0.5
            ? 4 * t * t * t
            : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const easeInOutSine = function (t) {
        const clamped = clamp01(t);
        return -(Math.cos(Math.PI * clamped) - 1) / 2;
    };

    const readAnchor = function (attr, fallback) {
        if (!heroTitle.hasAttribute(attr)) {
            return fallback;
        }
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
        if (document.head.querySelector('[data-hero-inline-style]')) {
            return;
        }
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

    if (!hero.hasAttribute('tabindex')) {
        hero.setAttribute('tabindex', '0');
    }
    if (!hero.hasAttribute('role')) {
        hero.setAttribute('role', 'button');
    }
    if (!hero.hasAttribute('aria-label')) {
        hero.setAttribute('aria-label', 'Play intro animation and scroll to content');
    }

    const initialViewBox = (function () {
        const raw = (svgRoot.getAttribute('viewBox') || '').trim().split(/\s+/).map(Number);
        if (raw.length === 4 && raw.every(function (n) { return isFinite(n); })) {
            const x = raw[0];
            const y = raw[1];
            const width = raw[2];
            const height = raw[3];
            return {
                x: x,
                y: y,
                width: width,
                height: height,
                centerX: x + width * anchorX,
                centerY: y + height * anchorY
            };
        }
        const width = Number(svgRoot.getAttribute('width')) || svgRoot.clientWidth || 100;
        const height = Number(svgRoot.getAttribute('height')) || svgRoot.clientHeight || 100;
        svgRoot.setAttribute('viewBox', '0 0 ' + width + ' ' + height);
        return {
            x: 0,
            y: 0,
            width: width,
            height: height,
            centerX: width * anchorX,
            centerY: height * anchorY
        };
    })();

    const applyScale = function (scale) {
        const width = initialViewBox.width / scale;
        const height = initialViewBox.height / scale;
        const x = initialViewBox.centerX - width / 2;
        const y = initialViewBox.centerY - height / 2;
        const toFixed = function (n) { return Math.round(n * 1000) / 1000; };
        svgRoot.setAttribute('viewBox', [
            toFixed(x),
            toFixed(y),
            toFixed(width),
            toFixed(height)
        ].join(' '));
    };

    const computeExtraScroll = function () {
        const w = window.innerWidth || document.documentElement.clientWidth || 1;
        const h = window.innerHeight || document.documentElement.clientHeight || 1;
        const aspect = w / h;
        const base = h * 0.34;
        if (aspect >= 2.2) {
            return Math.max(180, h * 0.26);
        }
        if (aspect >= 1.6) {
            return Math.max(210, h * 0.3);
        }
        if (aspect >= 1.2) {
            return Math.max(250, h * 0.34);
        }
        return Math.max(300, base);
    };

    let scrollRange = 1;
    let extraScroll = 0;

    const updateLayout = function () {
        // Apply 25% earlier content scroll by shortening sticky length
        extraScroll = computeExtraScroll() * STICKY_LENGTH_MULTIPLIER;
        const computedHeight = (window.innerHeight || document.documentElement.clientHeight || 0) + extraScroll;
        hero.style.minHeight = computedHeight + 'px';
        hero.style.height = computedHeight + 'px';
        scrollRange = Math.max(1, computedHeight - (window.innerHeight || 0));
    };

    updateLayout();

    let resizeTimer = 0;
    window.addEventListener('resize', function () {
        if (resizeTimer) {
            window.clearTimeout(resizeTimer);
        }
        resizeTimer = window.setTimeout(updateLayout, 120);
    }, { passive: true });

    const measureProgress = function () {
        const rect = hero.getBoundingClientRect();
        const travelled = Math.max(0, Math.min(scrollRange, -rect.top));
        return scrollRange > 0 ? travelled / scrollRange : 0;
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
        if (hasHeading) {
            return 1;
        }
        const fadeStart = 0.965;
        const fadeEnd = 1;
        if (progress <= fadeStart) {
            return 1;
        }
        if (progress >= fadeEnd) {
            return 0;
        }
        return 1 - (progress - fadeStart) / (fadeEnd - fadeStart);
    };

    const fadeForHeading = function () {
        if (!headingBlock) {
            return 1;
        }
        const rect = headingBlock.getBoundingClientRect();
        if (rect.bottom > 0) {
            return 1;
        }
        const fadeWindow = Math.max(80, Math.min(200, rect.height || 120));
        const depth = Math.min(fadeWindow, Math.abs(rect.bottom));
        return Math.max(0, 1 - depth / fadeWindow);
    };

    const nextSection = hero.nextElementSibling;
    let rafId = 0;
    let scrollAnimationFrame = 0;
    let isProgrammaticScroll = false;
    let forcedCompletion = null;

    const startForcedCompletion = function (approxDuration) {
        const currentProgress = clamp01(measureProgress());
        if (currentProgress >= 0.995) {
            forcedCompletion = null;
            return;
        }
        const duration = Math.max(700, Math.min(approxDuration, 1800));
        forcedCompletion = {
            start: currentProgress,
            startedAt: performance.now(),
            duration: duration
        };
    };

    const cancelProgrammaticScroll = function () {
        if (!isProgrammaticScroll) {
            return;
        }
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
            const offset = window.pageYOffset || document.documentElement.scrollTop || 0;
            return rect.top + offset;
        }
        const heroRect = hero.getBoundingClientRect();
        const offset = window.pageYOffset || document.documentElement.scrollTop || 0;
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
        const startY = window.pageYOffset || document.documentElement.scrollTop || 0;
        const distance = maxScrollable - startY;
        if (Math.abs(distance) < 1) {
            return;
        }

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

        if (scrollAnimationFrame) {
            window.cancelAnimationFrame(scrollAnimationFrame);
        }
        scrollAnimationFrame = window.requestAnimationFrame(step);
    };

    const triggerHeroPlayback = function () {
        if (isProgrammaticScroll) {
            return;
        }
        const target = resolveScrollTarget();
        const current = window.pageYOffset || document.documentElement.scrollTop || 0;
        const distance = Math.abs(target - current);
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 1;
        const duration = Math.max(2600, Math.min(3800, (distance / viewportHeight) * 2300));
        startForcedCompletion(duration * 0.65);
        animateScrollTo(target, duration);
    };

    const handleHeroKeydown = function (event) {
        if (event.defaultPrevented) {
            return;
        }
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            triggerHeroPlayback();
        }
    };

    hero.addEventListener('click', function (event) {
        if (event.defaultPrevented) {
            return;
        }
        event.preventDefault();
        triggerHeroPlayback();
    });

    hero.addEventListener('keydown', handleHeroKeydown);

    window.addEventListener('wheel', cancelProgrammaticScroll, { passive: true });
    window.addEventListener('touchstart', cancelProgrammaticScroll, { passive: true });

    const render = function () {
        const now = performance.now();
        let progress = measureProgress();

        if (forcedCompletion) {
            const elapsed = now - forcedCompletion.startedAt;
            const t = clamp01(forcedCompletion.duration > 0 ? elapsed / forcedCompletion.duration : 1);
            const eased = easeInOutSine(t);
            const targetProgress = Math.min(1, forcedCompletion.start + (1 - forcedCompletion.start) * eased);
            progress = Math.max(progress, targetProgress);
            if (t >= 1 || targetProgress >= 0.999) {
                forcedCompletion = null;
            }
        }

        // Feed a slower progress only into zoom (keeps fades/toggles timing intact)
        const zoomProgress = clamp01(progress * ZOOM_SPEED_MULTIPLIER);
        const scale = scaleForProgress(zoomProgress);
        applyScale(scale);

        const opacityProgress = fadeForProgress(progress, Boolean(headingBlock));
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
        if (rafId) {
            window.cancelAnimationFrame(rafId);
        }
        render();
    });
})();
