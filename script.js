var t1 = gsap.timeline();
t1.from(".ankur", {
  y: -500,
  opacity: 0,
  duration: 1,
});
t1.to(".ankur", {
  delay: 1,
  opacity: 0,
});
t1.to(".loader", {
  y: -900,
  duration: 2,
});
t1.from("header", {
  y: -100,
  opacity: 0,
  duration: 0.5,
  stagger: 0.4,
});
t1.from(".iam", {
  x: -500,
  opacity: 0,
  duration: 0.5,
});
t1.from(".ankursingh", {
  x: 1500,
  opacity: 0,
  duration: 0.5,
});
t1.from(".circlebg img", {
  opacity: 0,
  duration: 1,
});

const scroll = new LocomotiveScroll({
  el: document.querySelector("[data-scroll-container]"),
  smooth: true,
});

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.scrollerProxy(".main", {
  scrollTop(value) {
    return arguments.length
      ? scroll.scrollTo(value, 0, 0)
      : scroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
  pinType: document.querySelector(".main").style.transform
    ? "transform"
    : "fixed",
});

scroll.on("scroll", ScrollTrigger.update);

function parallaxHover(e) {
  const img = e.currentTarget.querySelector(".layer");
  const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
  const x = ((e.clientX - left) / width - 0.5) * 100;
  const y = ((e.clientY - top) / height - 0.5) * 100;
  img.style.transform = `translateX(${x}px) translateY(${y}px) scale(1.05)`;
}

function resetParallax(el) {
  el.querySelector(".layer").style.transform =
    "translateX(0px) translateY(0px) scale(1)";
}

window.addEventListener("wheel", function (dets) {
  if (dets.deltaY > 0) {
    gsap.to(".element img", {
      rotate: 0,
    });
  } else {
    gsap.to(".element img", {
      rotate: 180,
    });
  }
});

gsap.to(".slider", {
  x: () => {
    const slider = document.querySelector(".slider");
    const scrollAmount = slider.scrollWidth - window.innerWidth;
    return -scrollAmount;
  },
  ease: "none",
  scrollTrigger: {
    trigger: ".page4",
    scroller: ".main",
    start: "top top",
    end: () => {
      const slider = document.querySelector(".slider");
      return `+=${slider.scrollWidth - window.innerWidth}`;
    },
    scrub: true,
    pin: true,
  },
});

var cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", function (dets) {
  gsap.to(cursor, {
    x: dets.x,
    y: dets.y,
    duration: 1.5,
    ease: "power2.out",
  });
});

ScrollTrigger.addEventListener("refresh", () => scroll.update());
ScrollTrigger.refresh();
