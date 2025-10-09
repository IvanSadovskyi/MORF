<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <base href="[[++site_url]]">
        <title>MORF</title>

        <meta name="description" content="Page Description">
        <meta name="keywords" content="#">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="stylesheet" href="assets/css/nprogress.css">
        <link rel="preload" href="/assets/fonts/TTCommons/woff2/TTCommons-Regular.woff2" as="font" type="font/woff2">
        <link rel="preload" href="/assets/fonts/TTCommons/woff2/TTCommons-Medium.woff2" as="font" type="font/woff2">
        <link rel="preload" href="/assets/fonts/TTCommons/woff2/TTCommons-DemiBold.woff2" as="font" type="font/woff2">
        <link rel="stylesheet" href="assets/css/font.css">

        <link rel="stylesheet" href="assets/css/styles.css" media="all">

        <link rel="icon" type="image/svg+xml" href="assets/img/favicon/favicon.svg"> 
        <link rel="apple-touch-icon" sizes="180x180" href="assets/img/favicon/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="assets/img/favicon/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="assets/img/favicon/favicon-16x16.png">
        <link rel="mask-icon" href="assets/img/favicon/safari-pinned-tab.svg" color="#175fff">
        <link rel="shortcut icon" href="assets/img/favicon/favicon.ico">

        <!-- <link rel="preload" href="/assets/animations/hero.splinecode.json" as="fetch" crossorigin="anonymous" /> -->
        <meta name="msapplication-TileColor" content="#175fff">
    </head>
    <body data-disable-smoother="true">
        <script src="assets/js/nprogress.js"></script>
        <script src="/assets/libs/js/jquery.min.js"></script>
        <script>
            $(document).ready (function () {
                NProgress.start ();
                NProgress.set (0.6);
                setTimeout(function () {
                    NProgress.done ();
                }, 1000);
            });
        </script>
        <style type="text/css">
            .preloader{width: 100%;height: 100vh;position: fixed;z-index: 9999;}
            .preloader__wrap{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);width:60px;height:60px;z-index: 8889;}
            .preloader::after{
                position: absolute;
                width: 100%;
                height: 100vh;
                content: "";
                background-color: #f5f5f5;
            }
            @keyframes spin{
                0%,100%{transform:translate(0)}
                25%{transform:translate(160%)}
                50%{transform:translate(160%, 160%)}
                75%{transform:translate(0, 160%)}
            }
            .loader {
                width: 60px;
                aspect-ratio: 1;
                border-radius: 50%;
                background: #175FFF;
                clip-path: polygon(0 0,100% 0,100% 100%,0 100%);
                animation: l1 1s infinite cubic-bezier(0.3,1,0,1);
            }
                @keyframes l1 {
                33% {border-radius: 0;clip-path: polygon(0 0,100% 0,100% 100%,0 100%)}
                66% {border-radius: 0;clip-path: polygon(50% 0,50% 0,100% 100%,0 100%)}
            }
        </style>
        <div class="preloader">
            <div class="preloader__wrap">
                
                <div class="loader"></div>
            </div>
        </div>
        <script type="text/javascript">
            var hellopreloader = document.querySelector('.preloader');
            function fadeOutnojquery(el) {
                el.style.opacity = 1;
                var interhellopreloader = setInterval(function() {
                    el.style.opacity = parseFloat(el.style.opacity) - 0.05;
                    if (el.style.opacity <= 0.05) {
                        clearInterval(interhellopreloader);
                        el.style.display = "none";
                    }
                }, 16);
            }
            window.onload = function(){
                setTimeout(function(){
                    fadeOutnojquery(hellopreloader);
                },1000);
            };
        </script>
<header class="header " data-header data-theme="dark">
            <div class="header__wrap container">
                <div class="header__left header__left--delayed">
                    <a href="/" class="logo">
                        <svg width="103" height="30">
                            <use xlink:href="/assets/img/sprite-svg.svg#logo"/>
                        </svg>
                    </a>
                </div>
                <div class="header__center">
                    <button type="button" class="header__menu-btn">
                        <span></span>
                        <span></span>
                    </button>
                </div>
                <div class="header__right">
                    <a href="/contacts">
                        <span><strong>Hire us</strong></span>
                        <div>
                            <svg width="28" height="28">
                                <use xlink:href="/assets/img/sprite-svg.svg#mail"/>
                            </svg>
                        </div>
                    </a>
                </div>
            </div>
        </header>
        <nav class="nav">
            <div class="nav__wrap">
                <div class="row">
                    <div class="col-1-2-3">
                        <div>
                            <p>Socials</p>
                            <ul class="unstyled">
                                <li>
                                    <a href="https://www.instagram.com/morf.digital/" target="_blank" rel="noopener noreferrer">Instagram</a>
                                </li>
                                <li>
                                    <a href="https://dribbble.com/morf-digital" target="_blank" rel="noopener noreferrer">Dribbble</a>
                                </li>
                                <li>
                                    <a href="https://www.behance.net/morfdgtl" target="_blank" rel="noopener noreferrer">Behance</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-1-2-3">
                        <div class="nav__menu">
                            <p>Menu</p>
                            <ul class="unstyled">
                                <li>
                                    <a class="h1" href="/work"><strong>Work</strong></a>
                                </li>
                                <li>
                                    <a class="h1" href="/about"><strong>About</strong></a>
                                </li>
                                <li>
                                    <a class="h1" href="/contacts"><strong>Contacts</strong></a>
                                </li>
                                <li>
                                    <a class="h1" href="/career"><strong>Career</strong></a>
                                </li>
                                <li class="privacy-policy"><a href="/privacy-policy" class="p-small privacy-policy">Privacy policy</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-1-2-3">
                        <div>
                            <p>Get in touch</p>
                            <p><a class="menu-email" href="mailto:hey@morf.digital">hey@morf.digital</a></p>
                        </div>
                    </div>
                    <div class="col-1 privacy-policy">
                        <p><a class="privacy-policy p-small" href="/privacy-policy">Privacy policy</a></p>
                    </div>
                </div>
            </div>
        </nav>
        <div class="main-bg">
            <div class="main-bg__wrap">
                <spline-viewer style="height: 100vh;" url="/assets/animations/footer.splinecode.json"></spline-viewer>
            </div>
        </div>
        <div id="smooth-wrapper" class="page" data-scroller>
            <div id="smooth-content">
                <div class="hero" data-section="dark">
                    <div class="hero-main">
                        <svg class="hero-title is-svg" viewBox="0 0 753 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet">
                            <defs>
                                <style>*{vector-effect:non-scaling-stroke}</style>
                            </defs>
                            <g>
                                <path d="M144.678 0.342773H181.16C182.202 0.342773 183.08 0.712476 183.808 1.43935C184.536 2.17249 184.9 3.06228 184.9 4.10246V215.898C184.9 216.945 184.536 217.835 183.808 218.561C183.08 219.295 182.195 219.658 181.16 219.658H144.678C143.636 219.658 142.751 219.295 142.03 218.561C141.302 217.835 140.938 216.945 140.938 215.898V77.7297C140.938 76.8963 140.731 76.4765 140.317 76.4765C139.903 76.4765 139.488 76.7898 139.074 77.4164L106.024 129.425C104.983 131.099 103.533 131.932 101.663 131.932H83.2654C81.3955 131.932 79.9398 131.099 78.9044 129.425L45.8545 77.4164C45.4404 76.7898 45.0263 76.5329 44.6121 76.6331C44.1917 76.7397 43.9909 77.2096 43.9909 78.043V215.898C43.9909 216.945 43.627 217.835 42.8991 218.561C42.1712 219.295 41.2864 219.658 40.2511 219.658H3.74374C2.70211 219.658 1.81735 219.295 1.09574 218.561C0.36785 217.835 0.00390625 216.945 0.00390625 215.898V4.10246C0.00390625 3.06228 0.36785 2.17249 1.09574 1.43935C1.82362 0.712476 2.70211 0.342773 3.74374 0.342773H40.226C42.0959 0.342773 43.5517 1.18244 44.5933 2.84923L91.3601 75.8499C91.9813 77.1031 92.6025 77.1031 93.23 75.8499L140.311 2.84923C141.352 1.18244 142.808 0.342773 144.678 0.342773Z" fill="#f5f5f5"/>
                                <path d="M257.567 209.807C245.413 203.24 235.969 194.06 229.23 182.255C222.491 170.456 219.121 156.858 219.121 141.469V77.6039C219.121 62.421 222.491 48.9739 229.23 37.2812C235.969 25.5823 245.413 16.5027 257.567 10.036C269.716 3.57562 283.759 0.342285 299.691 0.342285C315.623 0.342285 329.967 3.57562 342.115 10.036C354.263 16.5027 363.713 25.5823 370.453 37.2812C377.192 48.9801 380.562 62.421 380.562 77.6039V141.469C380.562 156.858 377.192 170.512 370.453 182.412C363.713 194.317 354.263 203.497 342.115 209.964C329.961 216.424 315.817 219.658 299.691 219.658C283.564 219.658 269.716 216.374 257.567 209.807ZM326.955 171.64C333.895 164.459 337.371 154.916 337.371 143.01V77.2969C337.371 65.3974 333.952 55.804 327.112 48.5164C320.266 41.2352 311.13 37.5883 299.691 37.5883C288.252 37.5883 279.417 41.2352 272.583 48.5164C265.737 55.804 262.317 65.3974 262.317 77.2969V143.01C262.317 154.916 265.737 164.453 272.583 171.64C279.423 178.827 288.459 182.412 299.691 182.412C310.923 182.412 320.009 178.821 326.955 171.64Z" fill="#f5f5f5"/>
                                <path d="M531.951 216.838L492.978 130.052C492.564 129.218 491.936 128.798 491.108 128.798H462.112C461.07 128.798 460.556 129.318 460.556 130.365V215.898C460.556 216.944 460.192 217.834 459.464 218.561C458.736 219.294 457.851 219.658 456.816 219.658H420.334C419.292 219.658 418.407 219.294 417.686 218.561C416.958 217.834 416.594 216.944 416.594 215.898V4.10197C416.594 3.05553 416.958 2.172 417.686 1.43886C418.407 0.711988 419.286 0.342285 420.327 0.342285H509.506C522.803 0.342285 534.499 3.06179 544.583 8.48828C554.66 13.921 562.454 21.6472 567.969 31.673C573.472 41.6989 576.227 53.2912 576.227 66.4502C576.227 80.6555 572.694 92.8181 565.629 102.95C558.557 113.083 548.687 120.239 536.005 124.412C534.963 124.832 534.65 125.565 535.07 126.605L577.476 215.271C577.89 216.111 578.097 216.737 578.097 217.151C578.097 218.824 576.955 219.658 574.665 219.658H536.312C534.235 219.658 532.773 218.718 531.945 216.838H531.951ZM460.556 39.819V93.3946C460.556 94.441 461.07 94.9611 462.112 94.9611H502.955C511.683 94.9611 518.806 92.3482 524.315 87.1285C529.818 81.9088 532.573 75.1162 532.573 66.7635C532.573 58.4107 529.818 51.5681 524.315 46.2418C518.806 40.9156 511.683 38.2525 502.955 38.2525H462.112C461.07 38.2525 460.556 38.7726 460.556 39.819Z" fill="#f5f5f5"/>
                                <path d="M601.785 34.4928V4.10197C601.785 3.05553 602.149 2.172 602.877 1.43886C603.611 0.711988 604.49 0.342285 605.525 0.342285H749.264C750.306 0.342285 751.19 0.711988 751.912 1.43886C752.64 2.172 753.004 3.06179 753.004 4.10197V215.898C753.004 216.944 752.64 217.834 751.912 218.561C751.19 219.294 750.306 219.658 749.264 219.658H712.782C711.746 219.658 710.862 219.294 710.134 218.561C709.406 217.834 709.042 216.944 709.042 215.898V129.425C709.042 128.379 708.527 127.858 707.486 127.858H640.451C639.416 127.858 638.531 127.495 637.803 126.762C637.075 126.035 636.711 125.145 636.711 124.099V93.7079C636.711 92.6677 637.075 91.7779 637.803 91.0448C638.531 90.3179 639.416 89.9482 640.451 89.9482H707.486C708.527 89.9482 709.042 89.4281 709.042 88.3817V39.819C709.042 38.7726 708.527 38.2525 707.486 38.2525H605.525C604.49 38.2525 603.605 37.8891 602.877 37.1559C602.155 36.429 601.785 35.5392 601.785 34.4928Z" fill="#f5f5f5"/>
                            </g>
                        </svg>
                    </div>
                </div>
                <main class="main">
                    <div class="container__wrap" data-section="light">
                        <div class="breadcrumbs-heading container container--1300" style="padding-top: 96px;">
                            <h1><strong>Explore<br>our</strong> <i>latest work</i></h1>
                        </div>
                        <section class="cases container container--1300">
                            <div class="row row-g96">
                                <div class="col-1">
                                    <div class="case">
                                        <div>
                                            <h3><strong>NUORI</strong></h3>
                                            <div class="hashtag">
                                                <p>#Branding</p>
                                                <p>#Websites</p>
                                            </div>
                                        </div>
                                        <div class="embed-responsive embed-responsive--16-9"><img src="/assets/img/cases/NORAH/norah-cover.jpg" alt=""></div>
                                        <a href="/case-norah" class="case__link"></a>
                                    </div>
                                </div>
                                <div class="col-1">
                                    <div class="case">
                                        <div>
                                            <h3><strong>Griffith Observatory Rebranding</strong></h3>
                                            <div class="hashtag">
                                                <p>#Branding</p>
                                            </div>
                                        </div>
                                        <div class="embed-responsive embed-responsive--16-9"><img src="/assets/img/cases/griffith-observatory-rebranding/griffith-cover.png" alt=""></div>
                                        <a href="/case-griffith-observatory-rebranding" class="case__link"></a>
                                    </div>
                                </div>
                                <div class="col-1">
                                    <div class="case">
                                        <div>
                                            <h3><strong>Azeum Ground Transportation</strong></h3>
                                            <div class="hashtag">
                                                <p>#Branding</p>
                                                <p>#Websites</p>
                                            </div>
                                        </div>
                                        <div class="embed-responsive embed-responsive--16-9"><img src="/assets/img/cases/azeum/azeum-cover.jpg" alt=""></div>
                                        <a href="/case-azeum" class="case__link"></a>
                                    </div>
                                </div>
                                
                                <div style="margin: 0 auto;">
                                    <a href="/work" class="btn btn--primary">See More</a>
                                </div>
                            </div>
                        </section>
                        <section class="marquee">
                            <div class="marquee__inner">
                                <span><strong>Your</strong> <i>vision</i> <strong>plus our</strong> <i>expertise</i> <strong>equals new impulse to your</strong> <i>growth</i>.</span>
                                <span><strong>Your</strong> <i>vision</i> <strong>plus our</strong> <i>expertise</i> <strong>equals new impulse to your</strong> <i>growth</i>.</span>
                                <span><strong>Your</strong> <i>vision</i> <strong>plus our</strong> <i>expertise</i> <strong>equals new impulse to your</strong> <i>growth</i>.</span>
                            </div>
                        </section>
                        <section class="our-services content-grid content-grid--shuffle container">
                            <div class="content-grid__wrap row row-g64">
                                <div class="col-1-1-2">
                                    <div class="illustration">
                                        <div class="illustration__wrap">
                                            <img src="/assets/img/our-services/websites.svg" alt="">
                                            <div class="illustration__background">
                                                <!-- <img class="blur--150" src="/assets/img/our-services/background/illustration-1.png" alt=""> -->
                                                <div class="illustration__container illustration__container--1">
                                                    <div class="illustration__shape"></div>
                                                    <div class="illustration__shape"></div>
                                                    <div class="illustration__shape"></div>
                                                    <div class="illustration__shape"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="content-grid__texts">
                                        <div class="section-texts">
                                            <h3><strong>Websites and Platforms</strong></h3>
                                            <p>Websites and platforms are crucial for businesses as they help establish an online presence and reach a broader audience. They offer a platform to display products and services, connect with customers, enhance brand recognition, and enable e-commerce, driving revenue and growth.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-1-1-2">
                                    <div class="illustration">
                                        <div class="illustration__wrap">
                                            <img src="/assets/img/our-services/mobile.svg" alt="">
                                            <div class="illustration__background">
                                                <!-- <img class="blur--150" src="/assets/img/our-services/background/illustration-2.png" alt=""> -->
                                                <div class="illustration__container illustration__container--2">
                                                    <div class="illustration__shape"></div>
                                                    <div class="illustration__shape"></div>
                                                    <div class="illustration__shape"></div>
                                                    <div class="illustration__shape"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="content-grid__texts">
                                        <div class="section-texts">
                                            <h3><strong>Mobile Applications</strong></h3>
                                            <p>Mobile applications help businesses reach and engage customers, increase their brand visibility, and provide easy access to products and services anywhere, anytime. They also help companies analyze user data and improve customer experience, leading to increased revenue, customer loyalty, and business growth.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-1-1-2">
                                    <div class="illustration">
                                        <div class="illustration__wrap">
                                            <img src="/assets/img/our-services/strategy.svg" alt="">
                                            <div class="illustration__background">
                                                <!-- <img class="blur--150" src="/assets/img/our-services/background/illustration-3.png" alt=""> -->
                                                <div class="illustration__container illustration__container--3">
                                                    <div class="illustration__shape"></div>
                                                    <div class="illustration__shape"></div>
                                                    <div class="illustration__shape"></div>
                                                    <div class="illustration__shape"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="content-grid__texts">
                                        <div class="section-texts">
                                            <h3><strong>Strategy and Branding</strong></h3>
                                            <p>Branding creates a unique identity for a business, conveying its personality, values, and purpose to the target audience. It builds brand recognition, establishes customer loyalty, and differentiates the business from its competitors, ultimately driving revenue and business growth.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section class="who-we-are container">
                            <div class="col-1-1-2">
                                <div class="who-we-are__logo">
                                        <svg width="228px"; viewBox="0 0 186 228">
                                            <defs>
                                                <filter id="goo">
                                                <feGaussianBlur in="SourceGraphic" stdDeviation="0" result="blur" id="blurFilter"/>
                                                <feColorMatrix in="blur" mode="matrix"
                                                    values="1 0 0 0 0
                                                            0 1 0 0 0
                                                            0 0 1 0 0
                                                            0 0 0 3 -1" result="goo" id="gooMatrix"/>
                                                <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
                                                </filter>
                                            </defs>
                                            <g filter="url(#goo)">
                                            <g id="LetterGroup">
                                            <path id="g1" d="M70.7003 0.5H88.5288C89.0403 0.5 89.4681 0.675039 89.8308 1.03433C90.1842 1.39362 90.3609 1.8174 90.3609 2.32409V105.007C90.3609 105.514 90.1842 105.947 89.8308 106.297C89.4774 106.656 89.0403 106.831 88.5381 106.831H70.7096C70.1981 106.831 69.7703 106.656 69.4169 106.297C69.0635 105.947 68.8868 105.514 68.8868 105.007V38.0228C68.8868 37.6174 68.7845 37.4148 68.5799 37.4148C68.3753 37.4148 68.1707 37.5714 67.9754 37.8754L51.821 63.0902C51.3095 63.9009 50.6027 64.3063 49.6912 64.3063H40.698C39.7865 64.3063 39.0704 63.9009 38.5682 63.0902L22.4138 37.8754C22.2092 37.5714 22.0046 37.4424 21.8093 37.4977C21.6047 37.553 21.5024 37.7741 21.5024 38.1794V105.007C21.5024 105.514 21.3257 105.947 20.9723 106.297C20.6189 106.656 20.1818 106.831 19.6795 106.831H1.82319C1.31167 106.831 0.883866 106.656 0.530459 106.297C0.177052 105.947 0.000348902 105.514 0.000348902 105.007V2.32409C-0.00895128 1.8174 0.167752 1.38441 0.521159 1.03433C0.883866 0.675039 1.31167 0.5 1.82319 0.5H19.6516C20.5631 0.5 21.2792 0.905353 21.7814 1.71606L44.6412 37.1108C44.9481 37.7188 45.2458 37.7188 45.5527 37.1108L68.5706 1.71606C69.0728 0.905353 69.7889 0.5 70.7003 0.5Z" fill="#175FFF"/>
                                            <path id="g2" d="M125.878 102.059C119.935 98.8718 115.322 94.4221 112.03 88.7011C108.738 82.9801 107.092 76.3839 107.092 68.9218V37.9583C107.092 30.5975 108.738 24.075 112.03 18.4092C115.322 12.7343 119.945 8.33068 125.878 5.19841C131.812 2.06614 138.675 0.5 146.469 0.5C154.262 0.5 161.265 2.06614 167.208 5.19841C173.142 8.33068 177.764 12.7343 181.056 18.4092C184.348 24.0842 185.995 30.5975 185.995 37.9583V68.9218C185.995 76.3839 184.348 82.9986 181.056 88.7748C177.764 94.5419 173.142 99.0008 167.208 102.133C161.265 105.265 154.355 106.831 146.469 106.831C138.582 106.831 131.821 105.238 125.878 102.059ZM159.796 83.5513C163.191 80.069 164.883 75.4443 164.883 69.668V37.8109C164.883 32.0438 163.209 27.3915 159.87 23.8539C156.522 20.3255 152.058 18.5566 146.469 18.5566C140.879 18.5566 136.564 20.3255 133.216 23.8539C129.868 27.3823 128.203 32.0346 128.203 37.8109V69.668C128.203 75.4351 129.877 80.069 133.216 83.5513C136.555 87.0337 140.972 88.7748 146.469 88.7748C151.965 88.7748 156.401 87.0337 159.796 83.5513Z" fill="#175FFF"/>
                                            <path id="g3" d="M56.3777 226.991L37.3309 184.917C37.1263 184.512 36.8194 184.309 36.4195 184.309H22.246C21.7345 184.309 21.4834 184.567 21.4834 185.065V226.53C21.4834 227.037 21.3067 227.47 20.9533 227.82C20.5999 228.179 20.1628 228.354 19.6606 228.354H1.82284C1.31133 228.354 0.883517 228.179 0.53011 227.82C0.176703 227.47 0 227.037 0 226.53V123.847C0 123.34 0.176703 122.907 0.53011 122.557C0.883517 122.207 1.31133 122.023 1.82284 122.023H45.4035C51.9043 122.023 57.6146 123.34 62.5437 125.975C67.4728 128.61 71.2766 132.35 73.9737 137.214C76.6614 142.079 78.0099 147.698 78.0099 154.073C78.0099 160.964 76.2801 166.861 72.8297 171.771C69.3701 176.681 64.5433 180.154 58.3493 182.172C57.8378 182.374 57.689 182.734 57.8936 183.231L78.6237 226.217C78.8284 226.622 78.9306 226.926 78.9306 227.129C78.9306 227.94 78.3726 228.345 77.2566 228.345H58.5075C57.4937 228.345 56.7776 227.894 56.3777 226.982V226.991ZM21.4834 141.167V167.146C21.4834 167.653 21.7345 167.902 22.246 167.902H42.2135C46.4823 167.902 49.9606 166.639 52.6576 164.106C55.3454 161.573 56.6939 158.284 56.6939 154.23C56.6939 150.177 55.3454 146.86 52.6576 144.281C49.9606 141.701 46.4823 140.411 42.2135 140.411H22.246C21.7345 140.411 21.4834 140.669 21.4834 141.167Z" fill="#175FFF"/>
                                            <path id="g4" d="M107.082 138.578V123.847C107.082 123.34 107.259 122.907 107.612 122.557C107.966 122.207 108.403 122.023 108.905 122.023H179.158C179.67 122.023 180.098 122.198 180.451 122.557C180.805 122.917 180.981 123.34 180.981 123.847V226.53C180.981 227.037 180.805 227.47 180.451 227.82C180.098 228.179 179.67 228.354 179.158 228.354H161.33C160.818 228.354 160.391 228.179 160.037 227.82C159.684 227.47 159.507 227.037 159.507 226.53V184.604C159.507 184.097 159.256 183.849 158.745 183.849H125.98C125.468 183.849 125.041 183.673 124.687 183.314C124.334 182.964 124.157 182.531 124.157 182.024V167.294C124.157 166.787 124.334 166.363 124.687 166.004C125.041 165.654 125.478 165.469 125.98 165.469H158.745C159.256 165.469 159.507 165.221 159.507 164.714V141.167C159.507 140.66 159.256 140.411 158.745 140.411H108.914C108.412 140.411 107.975 140.236 107.621 139.877C107.268 139.527 107.091 139.094 107.091 138.587L107.082 138.578Z" fill="#175FFF"/>
                                            </g>
                                            <path id="myCircle" d="M93 39 A75 75 0 1 1 93 189 A75 75 0 1 1 93 39 Z" opacity="0" fill="#175FFF"/>
                                            </g>
                                            </svg>
                                </div>
                                <div>
                                    <div class="section-texts">
                                        <h2 class="h1"><strong>Who we are?</strong></h2>
                                        <h3>We Morph Ideas<br>Into Impact.</h3>
                                    </div>
                                    <a href="/about" class="btn btn--primary btn--right">
                                        <span>About Us</span>
                                        <svg width="24px" height="24px">
                                            <use xlink:href="/assets/img/sprite-svg.svg#bold-arrow-right"/>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
                <footer class="footer container" data-footer data-theme="dark">
                    <div class="footer__right">
                        <div class="section-texts">
                            <p>Contacts</p>
                            <h2 class="h1"><strong>Let's</strong> <i>talk</i></h2>
                            <p style="margin-bottom: 24px;">Let's bring your vision to life. Contact us today to discuss your project and take the next step towards success.</p>
                            <a class="menu-email" href="mailto:hey@morf.digital"><strong>hey@morf.digital</strong></a>
                        </div>
                        <div class="section-texts">
                            <p><strong>New York</strong></p>
                            <p>555 Park Ave<br>New York, NY 10013<br>United States</p>
                        </div>
                    </div>
                    <div class="footer__left">
                        <form class="form" id="form" action="" method="post" enctype="multipart/form-data" data-contact-form>
                            <div class="form__group">
                                <p>Interested in</p>
                                <div class="btn-container--selected" data-section="dark">
                                    <div class="btn-wrap--selected">
                                        <input type="checkbox" name="Interested" id="Websites" value="Websites" checked>
                                        <label for="Websites" class="btn btn--selected">
                                            <span>Websites</span>
                                        </label>
                                    </div>
                                    <div class="btn-wrap--selected">
                                        <input type="checkbox" name="Interested" id="Applications" value="Applications">
                                        <label for="Applications" class="btn btn--selected">
                                            <span>Applications</span>
                                        </label>
                                    </div>
                                    <div class="btn-wrap--selected">
                                        <input type="checkbox" name="Interested" id="Branding" value="Branding">
                                        <label for="Branding" class="btn btn--selected">
                                            <span>Branding</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="form__group">
                                <input type="text" name="name" id="name" placeholder="Name" required>
                                <span class="error-message" id="name-error">An error has occurred</span>
                            </div>
                            <div class="form__group">
                                <input class="" type="email" name="email" id="email" placeholder="Email" required>
                                <span class="error-message" id="email-error">An error has occurred</span>
                            </div>
                            <div class="form__group">
                                <textarea rows="1" name="project-description" id="project-description" placeholder="Project description" oninput="this.style.height='auto';this.style.height=this.scrollHeight+'px'"></textarea>
                            </div>
                            <div class="form__notice" data-form-status role="status" aria-live="polite"></div>
                            <div class="flex-between flex-align-center">
                                <div class="form__group file-upload-wrapper p-small" data-text="Attach">
                                    <input name="file-upload-field" type="file" class="file-upload-field" value="">
                                    <span class="error-message" id="file-upload-field-error">An error has occurred</span>
                                </div>
                                <button class="btn btn--secondary btn--right" type="submit">
                                    <span>Submit</span>
                                    <svg width="24px" height="24px">
                                        <use xlink:href="/assets/img/sprite-svg.svg#bold-arrow-right"></use>
                                    </svg>
                                </button>
                            </div>
                        </form>
                        <div class="successForm" id="successForm">
                            <img src="/assets/img/done.svg" alt="">
                            <div class="section-texts" style="margin-top: 32px;">
                                <h2>Thank you for submitting!</h2>
                                <p>We will be in touch with you shortly</p>
                            </div>
                        </div>
                        <div class="section-texts footer__left-text">
                            <p><strong>New York</strong></p>
                            <p>555 Park Ave<br>New York, NY 10013<br>United States</p>
                        </div>
                    </div>
                    <div class="footer__bottom">
                        <a href="/privacy-policy">Privacy Policy</a>
                        <ul class="socials unstyled">
                            <li>
                                <a href="https://www.instagram.com/morf.digital/" target="_blank" rel="noopener noreferrer">
                                    <svg width="24" height="24">
                                        <use xlink:href="/assets/img/sprite-svg.svg#instagram"/>
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a href="https://dribbble.com/morf-digital" target="_blank" rel="noopener noreferrer">
                                    <svg width="24" height="24">
                                        <use xlink:href="/assets/img/sprite-svg.svg#Dribbble"/>
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a href="https://www.behance.net/morfdgtl" target="_blank" rel="noopener noreferrer">
                                    <svg width="24" height="24">
                                        <use xlink:href="/assets/img/sprite-svg.svg#behance"/>
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </div>
                </footer>
            </div>
        </div>
        <script type="module" src="/assets/libs/js/spline-viewer.js"></script>
        
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/ScrollTrigger.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollSmoother.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/ScrollToPlugin.min.js"></script>
        <script src="/assets/js/scroll.js"></script>
        <script src="/assets/js/main.js"></script>

        <script src="/assets/animations/displacement.js"></script>
        <script src="/assets/animations/animation.js"></script>
    </body>
</html>



