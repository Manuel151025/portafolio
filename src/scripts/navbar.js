/**
 * navbar.js — Interactividad del navbar.
 * Responsabilidad única: comportamiento del navbar
 *   1) Fondo con blur al hacer scroll.
 *   2) Menú desplegable en móvil (accesible).
 *   3) Scroll-spy: marca el link de la sección visible (.is-active).
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

  /* ---------- 3) Scroll-spy: link de la sección visible ---------- */
  if (menu && "IntersectionObserver" in window) {
    const menuLinks = Array.from(menu.querySelectorAll("a"));
    const sections = menuLinks
      .map((link) => document.querySelector(link.getAttribute("href")))
      .filter(Boolean);

    if (sections.length) {
      const spy = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const id = entry.target.id;
            menuLinks.forEach((link) => {
              link.classList.toggle(
                "is-active",
                link.getAttribute("href") === `#${id}`,
              );
            });
          });
        },
        // Banda estrecha en el centro del viewport: activa la sección
        // que cruza el medio de la pantalla.
        { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
      );

      sections.forEach((section) => spy.observe(section));
    }
  }
}
