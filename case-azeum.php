<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <base href="[[++site_url]]">
        <title>MORF - Azeum</title>

        <meta name="description" content="Описание страницы">
        <meta name="keywords" content="#">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="stylesheet" href="assets/css/nprogress.css">
        <link rel="preload" href="/assets/fonts/TTCommons/woff2/TTCommons-Regular.woff2" as="font" type="font/woff2">
        <link rel="preload" href="/assets/fonts/TTCommons/woff2/TTCommons-Medium.woff2" as="font" type="font/woff2">
        <link rel="preload" href="/assets/fonts/TTCommons/woff2/TTCommons-DemiBold.woff2" as="font" type="font/woff2">
        <link rel="stylesheet" href="assets/css/font.css">

        <link rel="stylesheet" href="assets/css/styles.css" media="all">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css"/>
        <script src="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.js"></script>

        <link rel="icon" type="image/svg+xml" href="assets/img/favicon/favicon.svg"> 
        <link rel="apple-touch-icon" sizes="180x180" href="assets/img/favicon/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="assets/img/favicon/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="assets/img/favicon/favicon-16x16.png">
        <link rel="mask-icon" href="assets/img/favicon/safari-pinned-tab.svg" color="#175fff">
        <link rel="shortcut icon" href="assets/img/favicon/favicon.ico">
        <meta name="msapplication-TileColor" content="#175fff">
    </head>
    <body>
        <script src="/assets/js/nprogress.js"></script>
        <script src="/assets/libs/js/jquery.min.js"></script>
        <script>
            $(document).ready (function () {
                NProgress.start ();
                NProgress.set (0.6);
                setTimeout(function () {
                    NProgress.done ();
                }, 200);
            });
        </script>
        <header class="header " data-header data-theme="light">
            <div class="header__wrap container">
                <div class="header__left">
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
                                    <a href="https://www.instagram.com/morf.digital/">Instagram</a>
                                </li>
                                <li>
                                    <a href="https://dribbble.com/morf.digital">Dribbble</a>
                                </li>
                                <li>
                                    <a href="https://www.behance.net/morfdgtl">Behance</a>
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
            <div class="main-bg__wrap" style="background-color: #f5f5f5;">
                <spline-viewer url="/assets/animations/footer.splinecode.json"></spline-viewer>
            </div>
        </div>
        <div id="smooth-wrapper" class="page" data-scroller>
            <div id="smooth-content">
                <main>
                    <section class="pictures pictures--50 container" data-section="light">
                        <div>
                            <div class="breadcrumbs-heading">
                                <span>Work</span>
                                <h1><strong>Azeum<br>Ground Transportation</strong></h1>
                                <p class="h3">A Premium Identity for Ground Transportation Excellence</p>
                            </div>
                            <div class="picture embed-responsive embed-responsive--1-1">
                                <img src="/assets/img/cases/azeum/azeum-1.jpg" alt="">
                            </div>
                        </div>
                        <div class="picture--t150">
                            <div class="picture embed-responsive embed-responsive--1-1">
                                <img src="/assets/img/cases/azeum/azeum-2.jpg" alt="">
                            </div>
                        </div>
                    </section>
                    <div class="work-texts container">
                        <div class="introduction">
                            <div class="introduction__wrap"><h2><strong>Introduction</strong></h2></div>
                            <div class="introduction__wrap">
                                <p>This case study highlights the branding, identity, and website development for Azeum, a premium ground transportation company committed to high-end, reliable, and efficient mobility solutions. The rebrand combines minimalism with sophisticated design to reflect Azeum’s luxury and dependability, creating a cohesive and impactful visual identity across all platforms.</p>
                            </div>
                        </div>
                    </div>
                    <section class="container picture">
                        <img src="/assets/img/cases/azeum/azeum-3.jpg" alt="">
                    </section>
                    <section class="container picture">
                        <img src="/assets/img/cases/azeum/azeum-4.png" alt="">
                    </section>
                    <div class="work-texts container">
                        <h2 style="margin-bottom: 32px;"><strong>Logotype</strong></h2>
                        <div class="row row-g96 row-nw">
                            <div class="col-1-2" style="margin-bottom: 0;">
                                <p>Logo is the most recognizable element of brand identity. Inspired by movement, precision, and excellence, it visually represents the seamless transportation experience they provide.</p>
                            </div>
                            <div class="col-1-2" style="margin-bottom: 0;">
                                <p>The combination of the "A" and "Z" in logo reflects the concept of "Ground Transportation from A to Z," symbolizing their comprehensive approach to mobility.</p>
                            </div>
                        </div>
                    </div>
                    <section class="work-texts container">
                        <div class="row row-g96 row-nw">
                            <div class="col-1-2 picture embed-responsive embed-responsive--1-1" style="margin-bottom: 0;">
                                <img src="/assets/img/cases/azeum/azeum-5.jpg" alt="">
                            </div>
                            <div class="col-1-2 section-texts" style="margin-bottom: 0; display: flex; justify-content: center; flex-direction: column;">
                                <h2><strong>Website Development</strong></h2>
                                <h3>Desktop / Mobile<br>Light / Dark</h3>
                                <p>The Azeum website was developed from the ground up to provide an intuitive user experience.  With full responsiveness for desktop and mobile  devices, the site adapts effortlessly to different screen sizes. We implemented dark and light theme options, allowing users to personalize their browsing experience while maintaining a sleek, modern aesthetic.</p>
                            </div>
                        </div>
                    </section>
                    <section class="pictures container">
                        <div class="pictures__wrap" style="justify-content: start;">
                            <div class="picture picture-bs">
                                <img src="/assets/img/cases/azeum/azeum-6.jpg" alt="">
                            </div>
                            <div class="picture picture-bs">
                                <img src="/assets/img/cases/azeum/azeum-8.jpg" alt="">
                            </div>
                        </div>
                        <div class="pictures__wrap">
                            <div class="picture picture-bs">
                                <img src="/assets/img/cases/azeum/azeum-7.jpg" alt="">
                            </div>
                            <div class="picture picture-bs">
                                <img src="/assets/img/cases/azeum/azeum-9.jpg" alt="">
                            </div>
                        </div>
                    </section>
                    <section class="container picture picture-bs">
                        <img src="/assets/img/cases/azeum/azeum-10.jpg" alt="">
                    </section>
                    <section class="container picture">
                        <img src="/assets/img/cases/azeum/azeum-11.jpg" alt="">
                    </section>
                    <section class="pictures container">
                        <div class="pictures__wrap" style="justify-content: start;">
                            <div class="picture">
                                <img src="/assets/img/cases/azeum/azeum-12.jpg" alt="">
                            </div>
                            <div class="picture">
                                <img src="/assets/img/cases/azeum/azeum-14.jpg" alt="">
                            </div>
                        </div>
                        <div class="pictures__wrap">
                            <div class="picture">
                                <img src="/assets/img/cases/azeum/azeum-13.jpg" alt="">
                            </div>
                            <div class="picture">
                                <img src="/assets/img/cases/azeum/azeum-15.jpg" alt="">
                            </div>
                        </div>
                    </section>
                    <section class="container picture">
                        <img src="/assets/img/cases/azeum/azeum-16.jpg" alt="">
                    </section>
                    <section class="pictures container" data-section="light">
                        <div>
                            <div class="picture picture-bs">
                                <img src="/assets/img/cases/azeum/azeum-17.jpg" alt="">
                            </div>
                        </div>
                        <div>
                            <div class="picture picture-bs">
                                <img src="/assets/img/cases/azeum/azeum-18.jpg" alt="">
                            </div>
                        </div>
                    </section>
                    <div class="product-swiper__container">
                        <div class="swiper product-swiper">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide picture"><img src="/assets/img/cases/azeum/azeum-19.jpg" alt=""></div>
                                <div class="swiper-slide picture"><img src="/assets/img/cases/azeum/azeum-20.jpg" alt=""></div>
                                <div class="swiper-slide picture"><img src="/assets/img/cases/azeum/azeum-21.jpg" alt=""></div>
                            </div>
                        </div>
                    </div>
                    <section class="pictures container">
                        <div class="pictures__wrap" style="justify-content: center;">
                            <div class="picture picture-bs">
                                <img src="/assets/img/cases/azeum/azeum-22.jpg" alt="">
                            </div>
                        </div>
                        <div class="pictures__wrap">
                            <div class="picture picture-bs">
                                <img src="/assets/img/cases/azeum/azeum-24.jpg" alt="">
                            </div>
                            <div class="picture picture-bs">
                                <img src="/assets/img/cases/azeum/azeum-23.jpg" alt="">
                            </div>
                        </div>
                    </section>
                    <section class="container picture picture-bs">
                        <img src="/assets/img/cases/azeum/azeum-25.jpg" alt="">
                    </section>
                    <section class="container picture">
                        <img src="/assets/img/cases/azeum/azeum-26.jpg" alt="">
                    </section>
                    <div class="container">
                        <div style="width: 100%; height: 2px;background-color: #E0E0E0;"></div>
                    </div>
                    <section class="other-project container">
                        <div class="row row-g96 row-nw">
                            <div class="col-1-2">
                                <img src="/assets/img/cases/norah/norah-cover.jpg" alt="">
                            </div>
                            <div class="col-1-2">
                                <div class="other-project__wrap">
                                    <span>Next project</span>
                                    <h2><strong>NORAH</strong></h2>
                                    <a href="/case-norah" class="btn btn--arrow btn--right btn--primary">
                                        <svg width="24px" height="24px">
                                            <use xlink:href="/assets/img/sprite-svg.svg#bold-arrow-right"/>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>
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
                                <a href="https://www.instagram.com/morf.digital/">
                                    <svg width="24" height="24">
                                        <use xlink:href="/assets/img/sprite-svg.svg#instagram"/>
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a href="https://dribbble.com/morf.digital">
                                    <svg width="24" height="24">
                                        <use xlink:href="/assets/img/sprite-svg.svg#Dribbble"/>
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a href="https://www.behance.net/morfdgtl">
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

        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollSmoother.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/ScrollToPlugin.min.js"></script>
        <script src="/assets/libs/js/jquery.min.js"></script>
        <script src="/assets/js/main.js"></script>
    </body>
</html>