/**
 * qr-modal.js — Amplía el QR del carnet en un modal para escanearlo mejor.
 * Responsabilidad única. Detiene la propagación del puntero para no activar
 * el tilt/arrastre del carnet al interactuar con el QR. Usa <dialog> nativo.
 * Ver CLAUDE.md §4.
 */

const qrBtn = document.querySelector(".id-card__qr");
const dialog = document.getElementById("qr-dialog");

if (qrBtn && dialog) {
  const closeBtn = dialog.querySelector(".tech-dialog__close");

  // Evita que interactuar con el QR active el tilt/arrastre del carnet.
  qrBtn.addEventListener("pointerdown", (event) => event.stopPropagation());

  qrBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    dialog.showModal();
  });

  if (closeBtn) closeBtn.addEventListener("click", () => dialog.close());

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
}
