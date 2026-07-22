/**
 * grid-spotlight.js — Mueve el "foco" de la grilla iluminada con el cursor.
 * Responsabilidad única: actualizar --mx/--my en el elemento raíz según la
 * posición del puntero, dentro de requestAnimationFrame.
 *
 * - Solo en escritorio con puntero fino (min-width 768px y pointer: fine):
 *   en móvil/táctil no hay cursor → sale temprano sin registrar el listener.
 * - Respeta prefers-reduced-motion (si está activo, no registra nada).
 * - Listener con { passive: true } y throttle por rAF (un frame a la vez).
 * Ver CLAUDE.md §5 y §9 (rendimiento).
 */

const desktopPointer = window.matchMedia(
  "(min-width: 768px) and (pointer: fine)",
);
const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

// Salir temprano: sin cursor o con menos movimiento, no hacemos nada.
if (desktopPointer.matches && !reducedMotion) {
  const root = document.documentElement;

  let pointerX = 0;
  let pointerY = 0;
  let ticking = false;
  let activated = false;

  const applyPosition = () => {
    root.style.setProperty("--mx", `${pointerX}px`);
    root.style.setProperty("--my", `${pointerY}px`);
    ticking = false;
  };

  const onPointerMove = (event) => {
    pointerX = event.clientX;
    pointerY = event.clientY;

    // Revela la capa iluminada solo tras el primer movimiento.
    if (!activated) {
      document.body.classList.add("cursor-active");
      activated = true;
    }

    // Un solo frame encolado a la vez (nunca setProperty en el listener).
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(applyPosition);
    }
  };

  window.addEventListener("pointermove", onPointerMove, { passive: true });
}
