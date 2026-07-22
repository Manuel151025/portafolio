/**
 * navbar.js — Interactividad del navbar.
 * Responsabilidad única: comportamiento del navbar
 *   1) Fondo con blur al hacer scroll.
 *   2) Menú desplegable en móvil (accesible).
 * Ver CLAUDE.md §4 y §5.
 */

const navbar = document.getElementById("navbar");

if (navbar) {
  const toggle = navbar.querySelector(".navbar__toggle");
  const menu = navbar.querySelector(".navbar__menu");

  /* ---------- 1) Blur al hacer scroll ---------- */
  const onScroll = () => {
    navbar.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  onScroll(); // estado inicial (por si recarga a mitad de página)
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- 2) Menú móvil ---------- */
  if (toggle && menu) {
    const closeMenu = () => {
      navbar.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    };

    toggle.addEventListener("click", () => {
      const isOpen = navbar.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Cerrar al navegar a una sección
    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    // Cerrar con Escape
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
  }
}
