/**
 * card-tilt.js — Inclinación 3D de la credencial siguiendo el mouse.
 * Responsabilidad única: efecto tilt/parallax + sheen holográfico,
 * coordinado con el balanceo en reposo (CSS animation "sway").
 *
 * - En reposo, la tarjeta se balancea sola (animación CSS).
 * - Al entrar el cursor: se PAUSA el balanceo y el tilt toma el control.
 * - Al salir: la tarjeta vuelve al centro y se REANUDA el balanceo.
 * - Suaviza el tilt con requestAnimationFrame (lerp) y mueve el sheen.
 * - Ignora dispositivos táctiles y respeta prefers-reduced-motion.
 * Ver CLAUDE.md §4 y §5.
 */

const MAX_TILT = 12; // grados máximos de inclinación
const BASE_ROTATE = -4; // inclinación base de la credencial colgada
const EASE = 0.15; // suavizado del lerp (0..1)

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

function initCardTilt(scene) {
  const card = scene.querySelector("[data-tilt]");
  if (!card) return;

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let rafId = null;

  const render = () => {
    currentX += (targetX - currentX) * EASE;
    currentY += (targetY - currentY) * EASE;
    card.style.transform = `rotate(${BASE_ROTATE}deg) rotateX(${currentX}deg) rotateY(${currentY}deg)`;

    const settled =
      Math.abs(targetX - currentX) < 0.05 &&
      Math.abs(targetY - currentY) < 0.05;

    if (settled) {
      if (targetX === 0 && targetY === 0) {
        // De vuelta al reposo: devuelve el control al balanceo (CSS).
        card.style.transform = "";
        card.style.animationPlayState = "";
      } else {
        card.style.transform = `rotate(${BASE_ROTATE}deg) rotateX(${targetX}deg) rotateY(${targetY}deg)`;
      }
      rafId = null;
    } else {
      rafId = requestAnimationFrame(render);
    }
  };

  const schedule = () => {
    if (rafId === null) rafId = requestAnimationFrame(render);
  };

  const onEnter = (event) => {
    if (event.pointerType === "touch") return;
    // Pausa el balanceo mientras el cursor controla la tarjeta.
    card.style.animationPlayState = "paused";
  };

  const onMove = (event) => {
    // Ignora toques: en móvil la tarjeta permanece con su balanceo.
    if (event.pointerType === "touch") return;

    card.style.animationPlayState = "paused";

    const rect = card.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width; // 0..1
    const py = (event.clientY - rect.top) / rect.height; // 0..1

    targetY = (px - 0.5) * 2 * MAX_TILT; // izquierda/derecha
    targetX = -(py - 0.5) * 2 * MAX_TILT; // arriba/abajo

    // Posición del reflejo holográfico
    card.style.setProperty("--mx", `${px * 100}%`);
    card.style.setProperty("--my", `${py * 100}%`);
    card.style.setProperty("--sheen-opacity", "1");

    schedule();
  };

  const onLeave = () => {
    targetX = 0;
    targetY = 0;
    card.style.setProperty("--sheen-opacity", "0");
    schedule();
  };

  const onClick = () => {
    card.classList.add("is-pressed");
    window.setTimeout(() => card.classList.remove("is-pressed"), 200);
  };

  scene.addEventListener("pointerenter", onEnter);
  scene.addEventListener("pointermove", onMove);
  scene.addEventListener("pointerleave", onLeave);
  scene.addEventListener("click", onClick);
}

// No inicializa el tilt si el usuario prefiere menos movimiento
if (!prefersReducedMotion) {
  document.querySelectorAll(".id-card-scene").forEach(initCardTilt);
}
