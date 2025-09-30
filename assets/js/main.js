const btnMenu = document.querySelector(".header__menu-btn");
const menu = document.querySelector('.nav')
const header = document.querySelector('[data-header]')
const sections = [...document.querySelectorAll('[data-section]')]
const scrollRoot = document.querySelector('[data-scroller]')

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);

let smoother = ScrollSmoother.create({
    wrapper: '#smooth-wrapper',
    content: '#smooth-content',
    smooth: 1,
    // effects: true,
    normalizeScroll: false
});





// gsap.to(".hero-title", {
//     x: 900, // translateX(20px)
//     scale: 90,
//     ease: "none",
//     scrollTrigger: {
//         trigger: ".hero",
//         start: "top top",
//         end: "bottom top", // длина прокрутки, пока достигается требуемый transform
//         scrub: true,
//         pin: true,     // фиксирует .hero пока идёт анимация
//         pinSpacing: true,
//         markers:true
//     }
// });


// Адаптивная GSAP анимация для hero секции
gsap.registerPlugin(ScrollTrigger);

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;

// Функция для получения адаптивных значений
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

// Переменные для отслеживания состояния
let currentAnimation = null;
let isAnimating = false;

// Главная функция создания анимации
function createHeroAnimation() {
    // Убиваем предыдущие анимации
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

    // Сброс стилей
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

    // Специальная логика для мобильных
    if (isMobile) {
        createMobileAnimation(values);
    } else {
        createDesktopAnimation(values);
    }
}

// Анимация для десктопа/планшета
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

// Упрощенная анимация для мобильных
function createMobileAnimation(values) {
    let hasTriggered = false;

    currentAnimation = gsap.timeline({
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: values.endPoint,
            scrub: false, // Отключаем scrub для мобильных
            pin: false, // Отключаем pin для мобильных
            pinSpacing: false,
            invalidateOnRefresh: true,
            
            onEnter: () => {
                if (!hasTriggered) {
                    hasTriggered = true;
                    
                    // Быстрая анимация увеличения
                    gsap.to(".hero-title", {
                        scaleX: values.scaleX,
                        scaleY: values.scaleY,
                        x: values.x,
                        duration: 0.6,
                        ease: "power2.out"
                    });
                    
                    // Подъем контейнера
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
                
                // Возврат в исходное состояние
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

// Функция для правильной инициализации
function initHeroAnimation() {
    // Ждем полной загрузки DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createHeroAnimation);
    } else {
        // Небольшая задержка для стабилизации
        setTimeout(createHeroAnimation, 100);
    }
}

// Оптимизированный обработчик ресайза
let resizeTimeout;
let lastWidth = window.innerWidth;

window.addEventListener('resize', () => {
    // Игнорируем изменения только высоты (мобильные браузеры)
    if (Math.abs(window.innerWidth - lastWidth) < 10) return;
    
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        lastWidth = window.innerWidth;
        
        // Полная перезагрузка для стабильности
        ScrollTrigger.killAll();
        
        setTimeout(() => {
            ScrollTrigger.refresh();
            createHeroAnimation();
        }, 50);
        
    }, 300);
});

// Дополнительная стабилизация для мобильных
if (isMobile) {
    // Предотвращение bounce эффекта
    document.body.addEventListener('touchmove', (e) => {
        if (e.target === document.body) {
            e.preventDefault();
        }
    }, { passive: false });
    
    // Обработка изменения ориентации
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            ScrollTrigger.refresh();
            createHeroAnimation();
        }, 500);
    });
}

// Инициализация
initHeroAnimation();

// Debug функция
window.refreshHeroAnimation = () => {
    ScrollTrigger.killAll();
    setTimeout(() => {
        ScrollTrigger.refresh();
        createHeroAnimation();
    }, 100);
};


// const header = document.querySelector(".header");
let lastScroll = 0;
const hideHeight = 120; // px

window.addEventListener("scroll", () => {
    if(!header.classList.contains("active")){
        let currentScroll = window.scrollY;

        if (currentScroll > lastScroll && currentScroll > hideHeight) {
            // скролл вниз — прячем
            header.classList.add("header--hidden");
        } else if (currentScroll < lastScroll) {
            // скролл вверх — показываем
            header.classList.remove("header--hidden");
        }

        lastScroll = currentScroll;
    }
});



document.addEventListener("DOMContentLoaded", HorizontalScrollSteps());
function HorizontalScrollSteps(){
    const container2 = document.querySelector(".design-process__content");
    if (!container2) return;

    const steps = gsap.utils.toArray(".design-process__steps.selected");

    function getStart() {
        return "-=" + ((window.innerHeight / 2) - (container2.offsetHeight / 2)) + " top";
    }

    function initHorizontalScroll() {
        // убиваем старый скролл
        ScrollTrigger.getAll().forEach(st => {
            if (st.vars.id === "design-process-scroll") st.kill();
        });

        // не инициализируем если ширина <= 1024
        if (window.innerWidth <= 1024) return;

        function getScrollAmount() {
            return container2.scrollWidth - window.innerWidth;
        }

        const scrollAmount = getScrollAmount();
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
                    end: () => "+=" + getScrollAmount(),
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


$(document).ready(function () {
    const $btnContainer = $(".des-process-selected-js").first();
    const $firstButton = $btnContainer.find("button").first();
    if ($firstButton.length) {
        $firstButton.trigger("click");
    }
});

function processSteps(button) {
    const $btnContainer = $(button).closest(".des-process-selected-js");
    const id = $(button).attr("id");
    const $contentContainer = $(button).closest("section").find(".design-process__content").first();

    $btnContainer.find("button").removeClass("selected");
    $(button).addClass("selected");

    $contentContainer.find(".design-process__steps.selected").removeClass("selected");
    const $steps = $contentContainer.find('.design-process__steps[data-id="' + id + '"]');
    $steps.addClass("selected");

    $steps.find(".design-process__row > .design-process__wrap").removeClass("selected");

    setTimeout(() => {
        $steps.find(".design-process__row").each(function (index, row) {
            setTimeout(() => {
                $(row).find(".design-process__wrap").addClass("selected");
            }, index * 180);
        });
        HorizontalScrollSteps()
    }, 200);
}

$(".des-process-selected-js").on("click", "button", function () {
    processSteps(this);
});

$(document).ready(function () {
    const $firstButton = $(".des-process-selected-js button").first();
    if ($firstButton.length) {
        processSteps($firstButton);
    }
});



const form = document.getElementById('form');
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



document.addEventListener("DOMContentLoaded", () => {
    const fileInputs = document.querySelectorAll(".file-upload-wrapper input[type='file']");

    fileInputs.forEach((input) => {
        const wrapper = input.closest(".file-upload-wrapper");

        input.addEventListener("change", () => {
            if (input.files.length > 0) {
                wrapper.dataset.text = input.files[0].name;
                wrapper.classList.add("selected");
            } else {
                wrapper.dataset.text = "Виберіть файл";
                wrapper.classList.remove("selected");
            }
        });
    });
});

$(document).on('af_complete', function (e, response) {
    if (response.success) {
        const wrappers = document.querySelectorAll(".file-upload-wrapper");
        wrappers.forEach(wrapper => {
            wrapper.dataset.text = "Виберіть файл";
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
                    // ставим отступы
                    let marginLeft = 200 * i;
                    firstStep.style.marginLeft = marginLeft + "px";
                } else {
                    // сбрасываем отступы
                    firstStep.style.marginLeft = "";
                }
            });
        });
    }

    // при загрузке
    updateMargins();

    // при ресайзе окна
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

if(document.getElementById("form")){
    document.getElementById("form").addEventListener("submit", function(e) {
        e.preventDefault(); // блокируем перезагрузку
        this.style.display = "none"; // скрыть форму
        document.getElementById("successForm").style.display = "block"; // показать блок
    });
}


ScrollTrigger.create({
    start: "top top",
    onUpdate: (self) => {
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