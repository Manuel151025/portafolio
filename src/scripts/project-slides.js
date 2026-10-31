/**
 * project-slides.js — Carrusel automático de capturas en cada tarjeta.
 * Responsabilidad única: rotar las capturas de la media ([data-slides]) con
 * fundido + zoom lento y barras de progreso tipo historias.
 *
 * - El ritmo lo marca la animación CSS de la barra activa (.slides__fill):
 *   al terminar (animationend) pasa a la siguiente captura.
 * - Solo corre con la tarjeta en pantalla y la pestaña visible; se pausa
 *   con el cursor encima o el foco dentro.
 * - Cada tarjeta arranca desfasada para que no cambien todas a la vez.
 * - Con prefers-reduced-motion queda fija en la primera captura.
 * - Expone la captura actual en data-current (la usa project-gallery.js).
 */

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const STAGGER_MS = 900;

if (!reduceMotion.matches) {
  document.querySelectorAll("[data-slides]").forEach((root, order) => {
    const imgs = root.querySelectorAll(".slides__img");
    const bars = root.querySelectorAll(".slides__bar");
    let current = 0;
    let started = false;
    let visible = false;
    let hovered = false;

    root.classList.add("is-paused");

    const show = (next) => {
      current = next;
      root.dataset.current = String(current);
      root.classList.add("is-started");
      imgs.forEach((img, i) => img.classList.toggle("is-active", i === current));
      bars.forEach((bar, i) => {
        bar.classList.toggle("is-done", i < current);
        bar.classList.remove("is-active");
      });
      // Reinicia la animación de la barra activa (forzando un reflow).
      void bars[current].offsetWidth;
      bars[current].classList.add("is-active");
    };

    const update = () => {
      const playing = started && visible && !hovered && !document.hidden;
      root.classList.toggle("is-paused", !playing);
    };

    bars.forEach((bar) => {
      bar.addEventListener("animationend", () => {
        show((current + 1) % imgs.length);
      });
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !started) {
          started = true;
          setTimeout(() => {
            show(0);
            update();
          }, order * STAGGER_MS);
          return;
        }
        update();
      },
      { threshold: 0.5 },
    );
    observer.observe(root);

    const hold = (value) => () => {
      hovered = value;
      update();
    };
    root.addEventListener("pointerenter", hold(true));
    root.addEventListener("pointerleave", hold(false));
    root.addEventListener("focus", hold(true));
    root.addEventListener("blur", hold(false));
    document.addEventListener("visibilitychange", update);
  });
}
