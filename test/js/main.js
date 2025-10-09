/* ======================= Base refs (non-scroll logic) ======================= */
const btnMenu = document.querySelector(".header__menu-btn");
const menu = document.querySelector('.nav');
const header = document.querySelector('[data-header]');

/* =========================================================
   Mobile nav
   ========================================================= */
btnMenu.addEventListener("click", function() {
  btnMenu.classList.toggle("active");
  menu.classList.toggle('active');
  header.classList.toggle('active');
});
document.querySelectorAll(".nav a").forEach(link =>{
  link.addEventListener("click", ()=>{
    btnMenu.classList.remove("active");
    menu.classList.remove('active');
    header.classList.remove('active');
  });
});

/* =========================================================
   Process steps UI (unchanged) — reuses window.HorizontalScrollSteps()
   ========================================================= */
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
    if (typeof window.HorizontalScrollSteps === 'function') {
      window.HorizontalScrollSteps();
    }
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

/* =========================================================
   Form validation
   ========================================================= */
const form = document.getElementById('form');
const btnSubmit = form ? form.querySelector('button[type="submit"]') : null;

const getField = (fieldName) => {
  if (!form) return null;
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

if (btnSubmit){
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

/* =========================================================
   File upload UI
   ========================================================= */
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

/* =========================================================
   Design process margins (unchanged)
   ========================================================= */
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
  window.addEventListener("resize", updateMargins, { passive: true });
});

/* =========================================================
   Spline logo remove after ready
   ========================================================= */
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

