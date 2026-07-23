/**
 * cv-viewer.js — Visor del CV en un modal.
 * Responsabilidad única: abrir el <dialog> del CV, cargar el PDF de forma
 * diferida (data-src, no afecta el LCP), imprimir, y cerrar (volver al
 * portafolio). Usa el <dialog> nativo. Ver CLAUDE.md §4.
 */

const openBtn = document.getElementById("cv-open");
const dialog = document.getElementById("cv-dialog");

if (openBtn && dialog) {
  const frame = dialog.querySelector(".cv-dialog__frame");
  const closeBtn = dialog.querySelector("#cv-close");
  const printBtn = dialog.querySelector("#cv-print");

  openBtn.addEventListener("click", () => {
    // Carga el PDF solo al abrir el visor.
    if (frame && !frame.src) frame.src = frame.dataset.src;
    dialog.showModal();
  });

  if (closeBtn) closeBtn.addEventListener("click", () => dialog.close());

  // Cerrar al hacer click fuera del visor (backdrop)
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  if (printBtn && frame) {
    printBtn.addEventListener("click", () => {
      try {
        frame.contentWindow.focus();
        frame.contentWindow.print();
      } catch (error) {
        // Si el navegador no deja imprimir el PDF embebido, lo abre aparte.
        window.open("/cv.pdf", "_blank", "noopener");
      }
    });
  }
}
