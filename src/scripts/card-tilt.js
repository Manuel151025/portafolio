/**
 * card-tilt.js — Inclinación 3D de la credencial siguiendo el mouse.
 * Responsabilidad única: efecto tilt/parallax + sheen holográfico + agarre,
 * coordinado con el balanceo en reposo (CSS animation "sway").
 *
 * - En reposo, la tarjeta se balancea sola (animación CSS).
 * - Al entrar el cursor: se PAUSA el balanceo y el tilt toma el control.
 * - CLICK SOSTENIDO (pointerdown): la tarjeta se "agarra" → se inclina más
 *   y se arrastra siguiendo el cursor (con captura de puntero, sigue aunque
 *   el cursor salga de la tarjeta). Al soltar, vuelve.
 * - Al salir: la tarjeta vuelve al centro y se REANUDA el balanceo.
 * - Ignora dispositivos táctiles y respeta prefers-reduced-motion.
 * Ver CLAUDE.md §4 y §5.
 */

const MAX_TILT = 12; // grados de inclinación al pasar el cursor
const GRAB_TILT = 20; // grados al mantener presionado (más marcado)
const GRAB_TRANSLATE = 38; // px de arrastre al mantener presionado
const BASE_ROTATE = -4; // inclinación base de la credencial colgada
const EASE = 0.15; // suavizado del lerp (0..1)

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

function initCardTilt(scene) {
  const card = scene.querySelector("[data-tilt]");
  if (!card) return;

  let targetX = 0;
  let targetY = 0;
  let targetTX = 0;
  let targetTY = 0;
  let currentX = 0;
  let currentY = 0;
  let currentTX = 0;
  let currentTY = 0;
  let grabbing = false;
  let rafId = null;

  const paint = (rx, ry, tx, ty) => {
    card.style.transform = `rotate(${BASE_ROTATE}deg) translate3d(${tx}px, ${ty}px, 0) rotateX(${rx}deg) rotateY(${ry}deg)`;
  };

  const render = () => {
    currentX += (targetX - currentX) * EASE;
    currentY += (targetY - currentY) * EASE;
    currentTX += (targetTX - currentTX) * EASE;
    currentTY += (targetTY - currentTY) * EASE;
    paint(currentX, currentY, currentTX, currentTY);

    const settled =
      Math.abs(targetX - currentX) < 0.05 &&
      Math.abs(targetY - currentY) < 0.05 &&
      Math.abs(targetTX - currentTX) < 0.1 &&
      Math.abs(targetTY - currentTY) < 0.1;

    if (settled) {
      if (targetX === 0 && targetY === 0 && targetTX === 0 && targetTY === 0) {
        // De vuelta al reposo: devuelve el control al balanceo (CSS).
        card.style.transform = "";
        card.style.animation = "";
      } else {
        paint(targetX, targetY, targetTX, targetTY);
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
    card.style.animation = "none";
  };

  const onMove = (event) => {
    if (event.pointerType === "touch") return;
    card.style.animation = "none";

    const rect = card.getBoundingClientRect();
    const px = clamp((event.clientX - rect.left) / rect.width, 0, 1); // 0..1
    const py = clamp((event.clientY - rect.top) / rect.height, 0, 1); // 0..1

    const tilt = grabbing ? GRAB_TILT : MAX_TILT;
    targetY = (px - 0.5) * 2 * tilt; // izquierda/derecha
    targetX = -(py - 0.5) * 2 * tilt; // arriba/abajo

    // Con click sostenido, la tarjeta se arrastra siguiendo el cursor
    targetTX = grabbing ? (px - 0.5) * 2 * GRAB_TRANSLATE : 0;
    targetTY = grabbing ? (py - 0.5) * 2 * GRAB_TRANSLATE : 0;

    // Posición del reflejo holográfico
    card.style.setProperty("--mx", `${px * 100}%`);
    card.style.setProperty("--my", `${py * 100}%`);
    card.style.setProperty("--sheen-opacity", "1");

    schedule();
  };

  const onDown = (event) => {
    if (event.pointerType === "touch") return;
    // Evita que arrastrar seleccione el texto de la tarjeta.
    event.preventDefault();
    grabbing = true;
    card.classList.add("is-grabbing");
    card.style.animation = "none";
    // Captura el puntero: el arrastre continúa aunque el cursor salga.
    try {
      scene.setPointerCapture(event.pointerId);
    } catch (err) {
      /* algunos navegadores pueden lanzar; ignora */
    }
  };

  const release = () => {
    grabbing = false;
    card.classList.remove("is-grabbing");
    targetTX = 0;
    targetTY = 0;
    schedule();
  };

  const onLeave = () => {
    grabbing = false;
    card.classList.remove("is-grabbing");
    targetX = 0;
    targetY = 0;
    targetTX = 0;
    targetTY = 0;
    card.style.setProperty("--sheen-opacity", "0");
    schedule();
  };

  scene.addEventListener("pointerenter", onEnter);
  scene.addEventListener("pointermove", onMove);
  scene.addEventListener("pointerdown", onDown);
  scene.addEventListener("pointerup", release);
  scene.addEventListener("pointercancel", release);
  scene.addEventListener("pointerleave", onLeave);
}

// No inicializa el tilt si el usuario prefiere menos movimiento
if (!prefersReducedMotion) {
  document.querySelectorAll(".id-card-scene").forEach(initCardTilt);
}
