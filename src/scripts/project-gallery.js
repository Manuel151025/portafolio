/**
 * project-gallery.js — Galería de capturas dentro del modal de proyecto.
 * Responsabilidad única: navegar entre las capturas de cada [data-gallery]
 * con flechas, miniaturas, teclado (← →) y deslizamiento táctil.
 *
 * Al abrir el modal desde la tarjeta, empieza en la captura que la tarjeta
 * estaba mostrando (data-current, que escribe project-slides.js).
 */

const SWIPE_PX = 40;

document.querySelectorAll(".project-dialog").forEach((dialog) => {
  const gallery = dialog.querySelector("[data-gallery]");
  if (!gallery) return;

  const imgs = gallery.querySelectorAll(".gallery__img");
  const thumbs = gallery.querySelectorAll(".gallery__thumb");
  const count = gallery.querySelector(".gallery__count");
  const caption = gallery.querySelector(".gallery__caption");
  const total = imgs.length;
  if (total < 2) return;

  let current = 0;

  const go = (next, direction = next > current ? 1 : -1) => {
    const target = (next + total) % total;
    if (target === current) return;
    gallery.style.setProperty("--gallery-dir", String(direction));
    imgs.forEach((img, i) => {
      img.classList.toggle("is-active", i === target);
      if (i === target) img.removeAttribute("aria-hidden");
      else img.setAttribute("aria-hidden", "true");
    });
    thumbs.forEach((thumb, i) => {
      thumb.classList.toggle("is-active", i === target);
      if (i === target) thumb.setAttribute("aria-current", "true");
      else thumb.removeAttribute("aria-current");
    });
    if (count) count.textContent = `${target + 1} / ${total}`;
    if (caption) caption.textContent = thumbs[target]?.dataset.caption ?? "";
    current = target;
  };

  gallery
    .querySelector("[data-gallery-prev]")
    ?.addEventListener("click", () => go(current - 1, -1));
  gallery
    .querySelector("[data-gallery-next]")
    ?.addEventListener("click", () => go(current + 1, 1));
  thumbs.forEach((thumb) => {
    thumb.addEventListener("click", () => go(Number(thumb.dataset.galleryGo)));
  });

  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") go(current - 1, -1);
    if (event.key === "ArrowRight") go(current + 1, 1);
  });

  // Deslizar con el dedo sobre la imagen.
  const stage = gallery.querySelector(".gallery__stage");
  let startX = null;
  stage.addEventListener("pointerdown", (event) => {
    if (event.pointerType !== "mouse") startX = event.clientX;
  });
  stage.addEventListener("pointerup", (event) => {
    if (startX === null) return;
    const dx = event.clientX - startX;
    startX = null;
    if (Math.abs(dx) >= SWIPE_PX) go(current + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
  });
  stage.addEventListener("pointercancel", () => {
    startX = null;
  });

  // Sincroniza con la captura que mostraba la tarjeta al abrir el modal.
  document
    .querySelectorAll(`[data-project-open="${dialog.id}"][data-slides]`)
    .forEach((media) => {
      media.addEventListener("click", () => {
        go(Number(media.dataset.current ?? 0), 1);
      });
    });
});
