/**
 * project-modal.js — Modal de detalle de cada proyecto.
 * Responsabilidad única: abrir el <dialog> de un proyecto al pulsar su media
 * o su botón "Detalles", y cerrarlo (×, Escape o click fuera).
 * Usa el <dialog> nativo. Ver CLAUDE.md §4.
 */

// Abrir: cualquier disparador con data-project-open="<id-del-dialog>"
document.querySelectorAll("[data-project-open]").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const dialog = document.getElementById(trigger.dataset.projectOpen);
    if (dialog && typeof dialog.showModal === "function") {
      dialog.showModal();
    }
  });
});

// Cerrar cada modal de proyecto
document.querySelectorAll(".project-dialog").forEach((dialog) => {
  const closeBtn = dialog.querySelector(".tech-dialog__close");
  if (closeBtn) closeBtn.addEventListener("click", () => dialog.close());

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
});
