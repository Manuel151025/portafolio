/**
 * hero-scroll.js — Indicador de scroll del hero.
 * Responsabilidad única: ocultar con fade el indicador "Desplázate" en
 * cuanto el usuario empieza a bajar. Ver CLAUDE.md §4.
 */

const indicator = document.querySelector(".hero__scroll");

if (indicator) {
  const onScroll = () => {
    indicator.classList.toggle("is-hidden", window.scrollY > 40);
  };
  onScroll(); // estado inicial (por si recarga a mitad de página)
  window.addEventListener("scroll", onScroll, { passive: true });
}
