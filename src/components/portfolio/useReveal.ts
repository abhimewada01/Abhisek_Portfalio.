import { useEffect } from "react";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Adds `reveal-in` to every `.reveal` element as it scrolls into view. */
export function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (!els.length) return;

    if (prefersReducedMotion()) {
      els.forEach((el) => el.classList.add("reveal-in"));
      return;
    }

    document.querySelectorAll("section, footer").forEach((section) => {
      section.querySelectorAll<HTMLElement>(".reveal").forEach((el, i) => {
        el.style.transitionDelay = `${i * 60}ms`;
      });
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("reveal-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/** Enhanced reveal with staggered animation delays for sequential elements */
export function useStaggeredReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal-stagger"));
    if (!els.length) return;

    if (prefersReducedMotion()) {
      els.forEach((el) => el.classList.add("reveal-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const index = Array.from(els).indexOf(e.target as HTMLElement);
            const delay = index * 60;
            setTimeout(() => {
              e.target.classList.add("reveal-in");
            }, delay);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/** Page load staggered animation for hero elements */
export function usePageLoadAnimation() {
  useEffect(() => {
    const heroElements = document.querySelectorAll("#home .reveal");

    if (prefersReducedMotion()) {
      heroElements.forEach((el) => el.classList.add("reveal-in"));
      return;
    }

    const timer = setTimeout(() => {
      heroElements.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add("reveal-in");
        }, index * 60);
      });
    }, 100);

    return () => clearTimeout(timer);
  }, []);
}
