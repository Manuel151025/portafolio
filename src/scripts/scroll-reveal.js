/**
 * scroll-reveal.js — Aparición de elementos al entrar en viewport.
 * Responsabilidad única: observar los elementos .reveal y añadirles
 * .is-visible (fade + subida sutil) cuando entran en pantalla.
 * Ver CLAUDE.md §5.
 */

const reveals = document.querySelectorAll(".reveal");

if (reveals.length) {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  // Sin IntersectionObserver o con menos movimiento: mostrar de inmediato.
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target); // se revela una sola vez
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );

    reveals.forEach((el) => observer.observe(el));
  }
}
