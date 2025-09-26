const blurFilter = document.getElementById("blurFilter");
const matrix = document.getElementById("gooMatrix");
const tl = gsap.timeline({ defaults: { ease: "power3.inOut" }, repeat: -1, repeatDelay: 0});
const duration = 2;

tl.to("#g1", { opacity:0, duration }, ">")
  .to(blurFilter, { attr: { stdDeviation: 10 } , duration: 1, }, "<")
  .to(matrix, {
    attr: {
      values: "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -13"
    } , duration: 1,
  }, "<")

  .to("#g2", { opacity: 1, duration }, "<")
  .to(blurFilter, { attr: { stdDeviation: 0 }, duration: 1, delay: -1.2, }, ">")
  .to(matrix, {
    attr: {
      values: "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 3 -1"
    }, duration: 1, 
  }, "<")

tl.to("#g2", { opacity:0, duration }, ">")
  .to(blurFilter, { attr: { stdDeviation: 10 } , duration: 1 }, "<")
  .to(matrix, {
    attr: {
      values: "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -13"
    } , duration: 1,
  }, "<")

  .to("#g3", { opacity: 1, duration }, "<")
  .to(blurFilter, { attr: { stdDeviation: 0 }, duration: 1, delay: -1.2, }, ">")
  .to(matrix, {
    attr: {
      values: "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 3 -1"
    }, duration: 1 ,
  }, "<")

tl.to("#g3", { opacity:0, duration }, ">")
  .to(blurFilter, { attr: { stdDeviation: 10 } , duration: 1 }, "<")
  .to(matrix, {
    attr: {
      values: "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -13"
    } , duration: 1 ,
  }, "<")
  
  .to("#g4", { opacity: 1, duration }, "<")
  .to(blurFilter, { attr: { stdDeviation: 0 }, duration: 1, delay: -1.2, }, ">")
  .to(matrix, {
    attr: {
      values: "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 3 -1"
    }, duration: 1 ,
  }, "<")

tl.to("#g4", { opacity:0, duration }, ">")
  .to(blurFilter, { attr: { stdDeviation: 10 } , duration: 1 }, "<")
  .to(matrix, {
    attr: {
      values: "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -13"
    } , duration: 1 ,
  }, "<")

  .to("#g1", { opacity: 1, duration }, "<")
  .to(blurFilter, { attr: { stdDeviation: 0 }, duration: 1, delay: -1.2, }, ">")
  .to(matrix, {
    attr: {
      values: "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 3 -1"
    }, duration: 1,
  }, "<")