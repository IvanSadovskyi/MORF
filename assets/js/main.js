const btnMenu = document.querySelector(".header__menu-btn");
const menu = document.querySelector('.nav')
const header = document.querySelector('[data-header]')
const sections = [...document.querySelectorAll('[data-section]')]
const scrollRoot = document.querySelector('[data-scroller]')

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);

const disableSmoother = document.body && document.body.hasAttribute('data-disable-smoother');
let smoother = null;

if (!disableSmoother) {
    smoother = ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 1,
        // effects: true,
        normalizeScroll: false
    });
}





/*const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
if(document.querySelector(".hero-title")){
// Function for retrieving responsive values
function getResponsiveValues() {
    const viewportWidth = window.innerWidth;
    
    if (viewportWidth >= 1920) {
        // Desktop
        return {
            scaleX: 90,
            scaleY: 50,
            x: 1320,
            containerY: -650,
            endPoint: "bottom+=90 bottom",
            pinSpacing: true,
            scrubValue: true
        };
    } else if (viewportWidth >= 1366) {
        // Laptop
        return {
            scaleX: 70,
            scaleY: 40,
            x: 700,
            containerY: -650,
            endPoint: "bottom+=90 bottom",
            pinSpacing: true,
            scrubValue: true
        };
    } else if (viewportWidth >= 1024) {
        // Tablet
        return {
            scaleX: 35,
            scaleY: 30,
            x: 550,
            containerY: -650,
            endPoint: "bottom+=400 bottom",
            pinSpacing: !isMobile,
            scrubValue: isMobile ? 1 : true
        };
    } else if (viewportWidth >= 768) {
        // Mobile1
        return {
            scaleX: 30,
            scaleY: 20,
            x: 390,
            containerY: -650,
            endPoint: "bottom+=900 bottom",
            pinSpacing: false,
            scrubValue: 1
        };
    } else {
        // Mobile2
        return {
            scaleX: 30,
            scaleY: 15,
            x: 265,
            containerY: -450,
            endPoint: "bottom+=90 bottom",
            pinSpacing: false,
            scrubValue: 1
        };
    }
}

// State tracking variables
let currentAnimation = null;
let isAnimating = false;

// Main animation creation function
function createHeroAnimation() {
    // Kill previous animations
    if (currentAnimation) {
        currentAnimation.kill();
        currentAnimation = null;
    }
    
    ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars && trigger.vars.trigger === ".hero") {
            trigger.kill();
        }
    });

    const values = getResponsiveValues();

    // Reset styles
    gsap.set(".hero-title", {
        scaleX: 1,
        scaleY: 1,
        x: 0,
        clearProps: "transform"
    });
    
    gsap.set(".container__wrap", {
        y: 0,
        marginBottom: 0,
        clearProps: "transform"
    });

    // Mobile-specific logic
    if (isMobile) {
        createMobileAnimation(values);
    } else {
        createDesktopAnimation(values);
    }
}

// Animation for desktop/tablet
function createDesktopAnimation(values) {
    currentAnimation = gsap.timeline({
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: values.endPoint,
            scrub: values.scrubValue,
            pin: true,
            pinSpacing: values.pinSpacing,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            
            onLeave: () => {
                if (isAnimating) return;
                isAnimating = true;
                
                gsap.to(".container__wrap", { 
                    y: values.containerY, 
                    duration: 0.3, 
                    ease: "power2.out",
                    onComplete: () => {
                        gsap.set(".container__wrap", {
                            marginBottom: values.containerY
                        });
                        isAnimating = false;
                    }
                });
            },
            
            onEnterBack: () => {
                if (isAnimating) return;
                isAnimating = true;
                
                gsap.to(".container__wrap", { 
                    y: 0, 
                    duration: 0.2, 
                    ease: "power2.out",
                    onComplete: () => {
                        gsap.set(".container__wrap", {
                            marginBottom: 0
                        });
                        isAnimating = false;
                    }
                });
            }
        }
    });

    currentAnimation.to(".hero-title", {
        scaleX: values.scaleX,
        scaleY: values.scaleY,
        x: values.x,
        ease: "none",
        duration: 1
    });
}

// Simplified animation for mobile
function createMobileAnimation(values) {
    let hasTriggered = false;

    currentAnimation = gsap.timeline({
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: values.endPoint,
            scrub: false, // Disable scrub for mobile
            pin: false, // Disable pin for mobile
            pinSpacing: false,
            invalidateOnRefresh: true,
            
            onEnter: () => {
                if (!hasTriggered) {
                    hasTriggered = true;
                    
                    // Quick scale-up animation
                    gsap.to(".hero-title", {
                        scaleX: values.scaleX,
                        scaleY: values.scaleY,
                        x: values.x,
                        duration: 0.6,
                        ease: "power2.out"
                    });
                    
                    // Lift the container
                    gsap.to(".container__wrap", { 
                        y: values.containerY, 
                        duration: 0.4, 
                        delay: 0.3,
                        ease: "power2.out"
                    });
                }
            },
            
            onLeaveBack: () => {
                hasTriggered = false;
                
                // Return to the initial state
                gsap.to(".hero-title", {
                    scaleX: 1,
                    scaleY: 1,
                    x: 0,
                    duration: 0.4,
                    ease: "power2.out"
                });
                
                gsap.to(".container__wrap", { 
                    y: 0, 
                    duration: 0.3, 
                    ease: "power2.out"
                });
            }
        }
    });
}

// Proper initialization function
function initHeroAnimation() {
    // Wait for the DOM to finish loading
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createHeroAnimation);
    } else {
        // Small delay for stabilization
        setTimeout(createHeroAnimation, 100);
    }
}

// Optimized resize handler
let resizeTimeout;
let lastWidth = window.innerWidth;

window.addEventListener('resize', () => {
    // Ignore height-only changes (mobile browsers)
    if (Math.abs(window.innerWidth - lastWidth) < 10) return;
    
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        lastWidth = window.innerWidth;
        
        // Full reload for stability
        ScrollTrigger.killAll();
        
        setTimeout(() => {
            ScrollTrigger.refresh();
            createHeroAnimation();
        }, 50);
        
    }, 300);
});

// Additional stabilization for mobile
if (isMobile) {
    // Prevent the bounce effect
    document.body.addEventListener('touchmove', (e) => {
        if (e.target === document.body) {
            e.preventDefault();
        }
    }, { passive: false });
    
    // Handle orientation changes
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            ScrollTrigger.refresh();
            createHeroAnimation();
        }, 500);
    });
}

// Initialization
initHeroAnimation();

// Debug function
window.refreshHeroAnimation = () => {
    ScrollTrigger.killAll();
    setTimeout(() => {
        ScrollTrigger.refresh();
        createHeroAnimation();
    }, 100);
};
}
*/





let lastScroll = 0;
const hideHeight = 120;

window.addEventListener("scroll", () => {
    if(!header.classList.contains("active") && !header.classList.contains("header--contacts")){
        let currentScroll = window.scrollY;

        if (currentScroll > lastScroll && currentScroll > hideHeight) {
            header.classList.add("header--hidden");
        } else if (currentScroll < lastScroll) {
            header.classList.remove("header--hidden");
        }

        lastScroll = currentScroll;
    }
});



document.addEventListener("DOMContentLoaded", HorizontalScrollSteps);

function HorizontalScrollSteps() {
    const container2 = document.querySelector(".design-process__content");
    if (!container2) return;

    const steps = gsap.utils.toArray(".design-process__steps.selected");

    function getStart() {
        return "-=" + ((window.innerHeight / 2) - (container2.offsetHeight / 2)) + " top";
    }

    function calculateTotalWidth() {
        const wrap = document.querySelector(
            ".design-process__steps.selected > .design-process__row:last-child > .design-process__wrap"
        );
        if (!wrap) return 0;

        const stepElements = wrap.querySelectorAll(".design-process__step");
        const stepCount = stepElements.length;
        if (stepCount === 0) return 0;

        const wrapStyle = getComputedStyle(wrap);
        const gap = parseFloat(wrapStyle.gap) || 0;

        let totalWidth = 0;
        stepElements.forEach(step => {
            totalWidth += step.offsetWidth;
        });

        totalWidth += gap * (stepCount - 1);

        const firstStepStyle = getComputedStyle(stepElements[0]);
        totalWidth += parseFloat(firstStepStyle.marginLeft) || 0;

        return totalWidth;
    }

    function initHorizontalScroll() {
        // Kill the existing scroll
        ScrollTrigger.getAll().forEach(st => {
            if (st.vars.id === "design-process-scroll") st.kill();
        });

        // Skip initialization if width <= 1024
        if (window.innerWidth <= 1024) return;

        const totalWidth = calculateTotalWidth();
        const scrollAmount = totalWidth - window.innerWidth + 50;
        console.log(scrollAmount - 32)
        if (scrollAmount > 0) {
            gsap.to(steps, {
                x: () => -scrollAmount,
                ease: "none",
                scrollTrigger: {
                    id: "design-process-scroll",
                    trigger: container2,
                    start: getStart,
                    pin: true,
                    scrub: 1,
                    end: () => "+=" + scrollAmount,
                    invalidateOnRefresh: true,
                    pinSpacing: true
                }
            });
        }
    }

    initHorizontalScroll();

    window.addEventListener("resize", () => {
        initHorizontalScroll();
        ScrollTrigger.refresh();
    });
}



if (!header.classList.contains("header--contacts")){
    const sectionToTheme = {
        light: 'light',
        dark: 'dark',
    };

function setTheme(theme) {
    if (header.getAttribute('data-theme') === theme) return;
    header.setAttribute('data-theme', theme);
}

function checkThemeOnScroll() {
    const headerHeight = header.offsetHeight;
    const scrollPos = window.scrollY + headerHeight + 1;

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
window.addEventListener('scroll', checkThemeOnScroll);
}


btnMenu.addEventListener("click", function() {
    btnMenu.classList.toggle("active")
    menu.classList.toggle('active')
    header.classList.toggle('active')
})
document.querySelectorAll(".nav a").forEach(link =>{
    link.addEventListener("click", ()=>{
        btnMenu.classList.remove("active")
        menu.classList.remove('active')
        header.classList.remove('active')
    })
})


document.addEventListener("DOMContentLoaded", function () {
    // Delegate clicks on buttons inside containers
    document.querySelectorAll(".des-process-selected-js").forEach(function (container) {
        container.addEventListener("click", function (event) {
            const button = event.target.closest("button");
            if (button && container.contains(button)) {
                processSteps(button);
            }
        });
    });

    // Click the first button (initialization)
    const firstButton = document.querySelector(".des-process-selected-js button");
    if (firstButton) {
        firstButton.click();
    }

    // Track window resize
    let resizeTimeout;
    window.addEventListener("resize", function () {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function () {
            const selectedButton = document.querySelector(".des-process-selected-js button.selected");
            if (selectedButton) {
                applyResponsiveSelection(selectedButton);
            }
        }, 150);
    });
});

function processSteps(button) {
    if (!button) return;

    const btnContainer = button.closest(".des-process-selected-js");
    const id = button.id || "";
    const section = button.closest("section");
    const contentContainer = section ? section.querySelector(".design-process__content") : null;

    if (btnContainer) {
        btnContainer.querySelectorAll("button").forEach(function (b) {
            b.classList.remove("selected");
        });
    }
    button.classList.add("selected");

    if (!contentContainer) return;

    contentContainer.querySelectorAll(".design-process__steps.selected").forEach(function (el) {
        el.classList.remove("selected");
    });

    const steps = Array.from(contentContainer.querySelectorAll('.design-process__steps[data-id="' + CSS.escape(id) + '"]'));
    steps.forEach(function (step) {
        step.classList.add("selected");
        // Remove all selected classes before applying new logic
        step.querySelectorAll(".design-process__row > .design-process__wrap").forEach(function (wrap) {
            wrap.classList.remove("selected");
        });
        step.querySelectorAll(".design-process__step").forEach(function (stepEl) {
            stepEl.classList.remove("selected");
        });
    });

    setTimeout(function () {
        applyResponsiveSelection(button);

        if (typeof HorizontalScrollSteps === "function") {
            HorizontalScrollSteps();
        }
    }, 200);
}

function applyResponsiveSelection(button) {
    const id = button.id || "";
    const section = button.closest("section");
    const contentContainer = section ? section.querySelector(".design-process__content") : null;
    
    if (!contentContainer) return;

    const steps = Array.from(contentContainer.querySelectorAll('.design-process__steps[data-id="' + CSS.escape(id) + '"]'));
    const isMobile = window.innerWidth < 768;

    steps.forEach(function (step) {
        const rows = Array.from(step.querySelectorAll(".design-process__row"));
        
        if (isMobile) {
            // On mobile (<768px) add selected to each design-process__step with an interval
            const allSteps = Array.from(step.querySelectorAll(".design-process__step"));
            allSteps.forEach(function (stepEl, stepIndex) {
                setTimeout(function () {
                    stepEl.classList.add("selected");
                }, stepIndex * 100);
            });
            // Remove selected from wrap
            rows.forEach(function (row) {
                row.querySelectorAll(".design-process__wrap").forEach(function (wrap) {
                    wrap.classList.remove("selected");
                });
            });
        } else {
            // On desktop (>768px) add selected to design-process__wrap with a row-based interval
            rows.forEach(function (row, index) {
                setTimeout(function () {
                    row.querySelectorAll(".design-process__wrap").forEach(function (wrap) {
                        wrap.classList.add("selected");
                    });
                }, index * 180);
            });
            // Remove selected from step
            step.querySelectorAll(".design-process__step").forEach(function (stepEl) {
                stepEl.classList.remove("selected");
            });
        }
    });
}




const form = document.getElementById('form');
if(form){
const btnSubmit = form.querySelector('button[type="submit"]')

const getField = (fieldName) => {
    const input = form[fieldName];
    if (!input) return null;
    const error = input.nextElementSibling;
    return { input, error };
};

const fields = [
    getField('email'),
    getField('name'),
    getField('phone')
].filter(Boolean);

fields.forEach(f => {
    f.input.addEventListener('blur', () => {
        const value = f.input.value.trim();

        if (value !== '' && !f.input.validity.valid) {
            f.input.classList.add('error');
            f.error.classList.add('active');
        } else {
            f.input.classList.remove('error');
            f.error.classList.remove('active');
        }
    });
});

btnSubmit.addEventListener('click', () => {
    fields.forEach(f => {        
        if (!f.input.validity.valid) {
            f.input.classList.add('error');
            f.error.classList.add('active');
        } else {
            f.input.classList.remove('error');
            f.error.classList.remove('active');
        }
    });
});
}


document.addEventListener("DOMContentLoaded", () => {
    const fileInputs = document.querySelectorAll(".file-upload-wrapper input[type='file']");

    fileInputs.forEach((input) => {
        const wrapper = input.closest(".file-upload-wrapper");

        input.addEventListener("change", () => {
            if (input.files.length > 0) {
                wrapper.dataset.text = input.files[0].name;
                wrapper.classList.add("selected");
            } else {
                wrapper.dataset.text = "Attach";
                wrapper.classList.remove("selected");
            }
        });
    });
});

document.addEventListener("af_complete", function (e) {
    if (e.detail && e.detail.success) {
        const wrappers = document.querySelectorAll(".file-upload-wrapper");
        wrappers.forEach(wrapper => {
            wrapper.dataset.text = "Attach";
            wrapper.classList.remove("selected");
        });
    }
});


document.addEventListener("DOMContentLoaded", () => {
    const steps = document.querySelectorAll(".design-process__steps");

    function updateMargins() {
        const isDesktop = window.innerWidth >= 1024;

        steps.forEach(step => {
            step.querySelectorAll(".design-process__wrap").forEach((el, i) => {
                const firstStep = el.querySelector(".design-process__step");
                if (!firstStep) return;

                if (isDesktop) {
                    let marginLeft = 200 * i;
                    firstStep.style.marginLeft = marginLeft + "px";
                } else {
                    firstStep.style.marginLeft = "";
                }
            });
        });
    }

    updateMargins();

    window.addEventListener("resize", updateMargins);
});



document.querySelectorAll('.scroll-link').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (!target) return;

        gsap.to(window, {
            duration: 1,
            scrollTo: target,
            ease: "power2.out"
        });
    });
});

ScrollTrigger.create({
    start: "top top",
    onUpdate: (self) => {
        if (header.classList.contains("header--contacts")) return;
        if (self.scroll() > 0) {
            header.classList.add('scrolling-started');
        } else {
            header.classList.remove('scrolling-started');
        }
    }
});




window.addEventListener('load', async () => {
    const waitUntil = (check) => new Promise(resolve => {
        (function tick(){
        const v = check();
        if (v) return resolve(v);
        requestAnimationFrame(tick);
        })();
    });
    
    await customElements.whenDefined('spline-viewer');
    
    const viewer = await waitUntil(() => document.querySelector('spline-viewer'));
    const logo   = await waitUntil(() => viewer.shadowRoot?.getElementById('logo'));
    logo.remove();
});










document.addEventListener('DOMContentLoaded', function () {
    if(!document.querySelector(".product-swiper")) return
    const swiper = new Swiper('.product-swiper', {
    slidesPerView: 1.3,
    centeredSlides: true,
    spaceBetween: 16,
    breakpoints: {
        768: {
        slidesPerView: 3,
        centeredSlides: false,
        spaceBetween: 32
        },
        1024: {
        slidesPerView: 3,
        centeredSlides: false,
        spaceBetween: 64
        },
        1366: {
            slidesPerView: 3,
            centeredSlides: false,
            spaceBetween: 96
        }
    },
    });
});

(() => {
    const forms = document.querySelectorAll('[data-contact-form]');
    if (!forms.length) {
        return;
    }

    const endpoint = '/contact-handler.php';

    const resetStatus = (node) => {
        if (!node) {
            return;
        }
        node.textContent = '';
        node.classList.remove('is-visible', 'form__notice--error', 'form__notice--success');
    };

    const updateStatus = (node, type, message) => {
        if (!node) {
            return;
        }
        node.textContent = message;
        node.classList.add('is-visible');
        if (type === 'error') {
            node.classList.add('form__notice--error');
            node.classList.remove('form__notice--success');
        } else if (type === 'success') {
            node.classList.add('form__notice--success');
            node.classList.remove('form__notice--error');
        }
    };

    forms.forEach((form) => {
        const statusNode = form.querySelector('[data-form-status]');
        const immediateSuccess = form.nextElementSibling;
        const successNode = immediateSuccess && immediateSuccess.classList && immediateSuccess.classList.contains('successForm')
            ? immediateSuccess
            : (form.parentElement ? form.parentElement.querySelector('.successForm') : null);
        const sectionContainer = form.closest('.vacancies-form');

        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            if (form.dataset.submitting === 'true') {
                return;
            }

            form.dataset.submitting = 'true';
            resetStatus(statusNode);
            if (successNode) {
                successNode.classList.remove('done');
            }
            form.classList.remove('is-hidden');
            if (sectionContainer) {
                sectionContainer.classList.remove('done');
            }

            const submitButton = form.querySelector('button[type="submit"]');
            const buttonLabel = submitButton ? submitButton.querySelector('span') : null;
            const originalButtonText = buttonLabel ? buttonLabel.textContent : '';

            if (submitButton) {
                submitButton.disabled = true;
            }
            if (buttonLabel) {
                buttonLabel.textContent = 'Sending...';
            }

            const formData = new FormData(form);
            const interestedInputs = form.querySelectorAll('input[name="Interested"]:checked');
            if (interestedInputs.length) {
                formData.delete('Interested');
                const interestedValues = Array.from(interestedInputs).map((input) => input.value || input.id || 'N/A');
                formData.append('Interested', interestedValues.join(', '));
            }

            formData.append('page_title', document.title || '');
            formData.append('page_url', window.location.href);

            const handleError = (message) => {
                updateStatus(statusNode, 'error', message);
                if (successNode) {
                    successNode.classList.remove('done');
                }
                form.classList.remove('is-hidden');
                if (sectionContainer) {
                    sectionContainer.classList.remove('done');
                }
            };

            try {
                const response = await fetch(endpoint, {
                    method: 'POST',
                    body: formData,
                });

                let payload = null;
                try {
                    payload = await response.json();
                } catch (jsonError) {
                    payload = null;
                }

                if (!response.ok) {
                    throw new Error(payload && payload.message ? payload.message : 'Unable to submit the form right now.');
                }

                if (!payload || typeof payload.success === 'undefined') {
                    throw new Error('Unexpected response from the server.');
                }

                const isSuccess = payload.success === true;

                if (isSuccess) {
                    form.reset();
                    if (successNode) {
                        successNode.classList.add('done');
                        form.classList.add('is-hidden');
                    } else {
                        updateStatus(statusNode, 'success', payload.message || 'Thank you! We will be in touch soon.');
                    }
                    if (sectionContainer) {
                        sectionContainer.classList.add('done');
                    }
                } else {
                    const errorMessage = payload.message || 'We could not send your message. Please try again in a moment.';
                    handleError(errorMessage);
                }
            } catch (error) {
                handleError(error instanceof Error ? error.message : 'We could not send your message. Please try again later.');
            } finally {
                if (buttonLabel) {
                    buttonLabel.textContent = originalButtonText || 'Submit';
                }
                if (submitButton) {
                    submitButton.disabled = false;
                }
                form.dataset.submitting = 'false';
            }
        });
    });
})();

