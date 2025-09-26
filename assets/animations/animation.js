// GSAP Animation
const blurFilter = document.getElementById("blurFilter");
const matrix = document.getElementById("gooMatrix");
const tl = gsap.timeline({ defaults: { ease: "power2.inOut" }, repeat: -1, repeatDelay: 0});
const duration = 1.7;

let vars = { evolution: 0, radius: 0 };

function updatePath() {
  displaceSVGCircle('myCircle', 'cross', 15, 100, 2, vars.evolution, vars.radius);
}

const displacementTween = gsap.to(vars, {
  evolution: 200,
  duration: 200,
  ease: "linear",
  onUpdate: updatePath,
  repeat: -1,
});

//Timeline start
tl.to("#g1", { x: 50, y: 50, duration }, ">")
  .to("#g2", { x: -50, y: 50, duration }, "<")
  .to("#g3", { x: 50, y: -50, duration }, "<")
  .to("#g4", { x: -50, y: -50, duration }, "<")

  .to(blurFilter, { attr: { stdDeviation: 10 }, duration: 1.5, delay: 0.1, }, "<")
  .to(matrix, {
    attr: {
      values: "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -13"
    }, duration
  }, "<")

  .to(["#g1", "#g2", "#g3", "#g4"], { opacity: 0, duration }, "<")

  .to("#myCircle", { opacity: 1, duration }, "<")

  .to(vars, { radius: 75, duration, onUpdate: updatePath }, "<")
  .call(() => displacementTween.play(), null, "<")

  .to("#myCircle", { duration: 2 }, ">")
  
  .to(vars, { radius: 0, duration, onUpdate: updatePath }, ">")
  .to("#myCircle", { opacity: 0, duration }, "<")
  
  .to("#g1", { x: 0, y: 0, opacity: 1, duration }, "<")
  .to("#g2", { x: 0, y: 0, opacity: 1, duration }, "<")
  .to("#g3", { x: 0, y: 0, opacity: 1, duration }, "<")
  .to("#g4", { x: 0, y: 0, opacity: 1, duration }, "<")

  .to(blurFilter, { attr: { stdDeviation: 0 }, duration }, "<")
  .to(matrix, {
    attr: {
      values: "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 3 -1"
    }, duration
  }, "<");