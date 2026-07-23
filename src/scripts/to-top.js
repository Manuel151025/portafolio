/**
 * to-top.js — Botón flotante "volver arriba".
 * Responsabilidad única: mostrar el botón al bajar y volver arriba al click.
 * Ver CLAUDE.md §4.
 */

const btn = document.getElementById("to-top");

if (btn) {
  const onScroll = () => {
    btn.classList.toggle("is-visible", window.scrollY > 500);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  btn.addEventListener("click", () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  });
}
