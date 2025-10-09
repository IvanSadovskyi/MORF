'use strict';

(function () {
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

    const easeOutExpo = function (t) {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    };

    const readAnchor = function (attr, fallback) {
        if (!heroTitle.hasAttribute(attr)) {
            return fallback;
        }
        const raw = parseFloat(heroTitle.getAttribute(attr) || '');
        return Number.isFinite(raw) ? clamp01(raw) : fallback;
    };

    const anchorX = readAnchor('data-zoom-anchor-x', 0.48);
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
            '.hero{position:relative;}',
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
        const base = h * 0.55;
        if (aspect >= 2.2) {
            return Math.max(260, h * 0.38);
        }
        if (aspect >= 1.6) {
            return Math.max(300, h * 0.45);
        }
        if (aspect >= 1.2) {
            return Math.max(340, h * 0.5);
        }
        return Math.max(380, base);
    };

    let scrollRange = 1;
    let extraScroll = 0;

    const updateLayout = function () {
        extraScroll = computeExtraScroll();
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
        const stageOneEnd = 0.62;
        const stageOneScale = 58;
        const finalScale = 140;
        if (progress <= stageOneEnd) {
            const t = easeOutCubic(progress / stageOneEnd);
            return 1 + (stageOneScale - 1) * t;
        }
        const t = easeOutExpo((progress - stageOneEnd) / (1 - stageOneEnd));
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

    let rafId = 0;
    const render = function () {
        const progress = measureProgress();
        const scale = scaleForProgress(progress);
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
