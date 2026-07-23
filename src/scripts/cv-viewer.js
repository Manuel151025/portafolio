/**
 * cv-viewer.js — Visor del CV en un modal, con idioma ES/EN.
 * Responsabilidad única: abrir el <dialog> del CV, cambiar entre CV en
 * español (/cv.pdf) e inglés (/cv-en.pdf), imprimir y cerrar.
 * Carga el PDF de forma diferida (no afecta el LCP). Ver CLAUDE.md §4.
 */

const openBtn = document.getElementById("cv-open");
const dialog = document.getElementById("cv-dialog");

if (openBtn && dialog) {
  const frame = dialog.querySelector(".cv-dialog__frame");
  const closeBtn = dialog.querySelector("#cv-close");
  const printBtn = dialog.querySelector("#cv-print");
  const downloadLink = dialog.querySelector("#cv-download");
  const langBtns = dialog.querySelectorAll(".cv-lang__btn");

  const CV = { es: "/cv.pdf", en: "/cv-en.pdf" };
  let lang = "es";

  const loadCv = (nextLang) => {
    lang = CV[nextLang] ? nextLang : "es";
    frame.src = `${CV[lang]}#toolbar=0&navpanes=0&view=FitH`;
    if (downloadLink) {
      downloadLink.href = CV[lang];
      downloadLink.setAttribute(
        "download",
        lang === "en" ? "CV-Manuel-Cardenas-EN.pdf" : "CV-Manuel-Cardenas.pdf",
      );
    }
    langBtns.forEach((b) =>
      b.classList.toggle("is-active", b.dataset.lang === lang),
    );
  };

  openBtn.addEventListener("click", () => {
    if (!frame.src) loadCv(lang);
    dialog.showModal();
  });

  langBtns.forEach((b) =>
    b.addEventListener("click", () => loadCv(b.dataset.lang)),
  );

  if (closeBtn) closeBtn.addEventListener("click", () => dialog.close());

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  if (printBtn && frame) {
    printBtn.addEventListener("click", () => {
      try {
        frame.contentWindow.focus();
        frame.contentWindow.print();
      } catch (error) {
        window.open(CV[lang], "_blank", "noopener");
      }
    });
  }
}
