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
    // Qué elemento se observa para revelar cada uno. Un título con wipe
    // arranca recortado por completo (clip-path) y el navegador no lo cuenta
    // como visible: observándolo a él nunca se dispararía. Se observa su
    // contenedor y, cuando entra, se revela el título.
    const toReveal = new Map();
    reveals.forEach((el) => {
      const watched = el.classList.contains("reveal-wipe")
        ? el.parentElement
        : el;
      toReveal.set(watched, [...(toReveal.get(watched) ?? []), el]);
    });

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          toReveal
            .get(entry.target)
            .forEach((el) => el.classList.add("is-visible"));
          obs.unobserve(entry.target); // se revela una sola vez
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );

    toReveal.forEach((_, watched) => observer.observe(watched));
  }
}
