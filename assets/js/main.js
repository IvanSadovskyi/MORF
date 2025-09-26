const btnMenu = document.querySelector(".header__menu-btn");
const menu = document.querySelector('.nav')
const header = document.querySelector('[data-header]')
const sections = [...document.querySelectorAll('[data-section]')]
const scrollRoot = document.querySelector('[data-scroller]')

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);

let smoother = ScrollSmoother.create({
    wrapper: '#smooth-wrapper',
    content: '#smooth-content',
    smooth: 0.1,
    effects: true,
    normalizeScroll: false
});

if(document.querySelector(".hero-main")){
    ScrollTrigger.create({
        trigger: ".hero-wrap",
        start: "top top",
        endTrigger: ".hero-end-trigger",
        end: "center bottom",
        pin: ".hero-main",
        pinSpacing: false,
    });
}

// header hide/show — используем scroller и self.scroll()
let lastScroll = 0;

ScrollTrigger.create({
	start: 0,
	end: "max",
	onUpdate: self => {
		let currentScroll = self.scroll();
		if (currentScroll > lastScroll && currentScroll > 100 && !header.classList.contains("active")) {
			gsap.to(header, { yPercent: -100, duration: 0.2, ease: "none" });
		} else {
			gsap.to(header, { yPercent: 0, duration: 0.2, ease: "none" });
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
