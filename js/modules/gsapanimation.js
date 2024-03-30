export function gsapanimation() {
  gsap.from("#instructionCircle", {
    duration: 1,
    scale: 0,
    opacity: 0,
    ease: "back",
  });

  gsap.to(".imageright", {
    y: -200,
  });

  gsap.to(".imageleft", {
    y: -200,
  });

  gsap.to(".imageright", {
    y: 0,
    duration: 1,
    delay: 1,
    ease: "bounce",
  });

  gsap.to(".imageleft", {
    y: 0,
    duration: 1,
    delay: 1,
    ease: "bounce",
  });
}
