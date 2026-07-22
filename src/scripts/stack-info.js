/**
 * stack-info.js — Resumen de cada tecnología en un modal.
 * Responsabilidad única: al hacer click en una tarjeta del Stack, abre un
 * <dialog> con el logo, el nombre y la descripción (de data-* de la tarjeta).
 * Usa el <dialog> nativo → foco gestionado, cierre con Escape y en top-layer.
 * Ver CLAUDE.md §4.
 */

const dialog = document.getElementById("tech-dialog");

if (dialog) {
  const iconEl = dialog.querySelector(".tech-dialog__icon");
  const titleEl = dialog.querySelector(".tech-dialog__title");
  const descEl = dialog.querySelector(".tech-dialog__desc");
  const closeBtn = dialog.querySelector(".tech-dialog__close");

  document.querySelectorAll(".tech[data-name]").forEach((card) => {
    card.addEventListener("click", () => {
      const cardIcon = card.querySelector(".tech__icon");
      iconEl.innerHTML = cardIcon ? cardIcon.innerHTML : "";
      titleEl.textContent = card.dataset.name;
      descEl.textContent = card.dataset.desc;
      dialog.showModal();
    });
  });

  closeBtn.addEventListener("click", () => dialog.close());

  // Cerrar al hacer click fuera del contenido (en el backdrop)
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
}
