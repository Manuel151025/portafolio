/**
 * scroll-reveal.js — Aparición de elementos al entrar en viewport.
 * Responsabilidad única: observar los elementos a revelar y añadirles
 * .is-visible cuando entran en pantalla.
 *   - .reveal       → fade + subida sutil
 *   - .reveal-wipe  → descubierto tipo "wipe" (títulos de sección)
 * Ver CLAUDE.md §5.
 */

const reveals = document.querySelectorAll(".reveal, .reveal-wipe");

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
