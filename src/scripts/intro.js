/**
 * intro.js — Pantalla de bienvenida (overlay).
 * Responsabilidad única: orquestar las fases del intro (entrada → pausa →
 * salida), el skip, el bloqueo de scroll y la limpieza del DOM.
 *
 * El overlay está oculto por CSS por defecto; este script lo activa solo:
 *   - en la primera visita de la sesión (sessionStorage('intro-seen')), y
 *   - si NO hay prefers-reduced-motion.
 * Así evita parpadeo en visitas repetidas y no afecta el LCP (el contenido
 * real se pinta detrás). Las fases se orquestan con clases CSS.
 * Ver CLAUDE.md §4 y §9.
 */

/* ------------------------------------------------------------------
 * TEMPORAL (pruebas): fuerza la intro en CADA recarga.
 * Para volver a "una vez por sesión", pon REPLAY_ALWAYS = false.
 * ------------------------------------------------------------------ */
const REPLAY_ALWAYS = false;

const ENTRY_MS = 1400; // entrada (con stagger de las líneas)
const PAUSE_MS = 700; // pausa
const EXIT_MS = 1000; // salida (fade + desplazamiento del contenido + wipe vertical)
const SESSION_KEY = "intro-seen";

const intro = document.getElementById("intro");

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

let alreadySeen = false;
try {
  alreadySeen = sessionStorage.getItem(SESSION_KEY) === "1";
} catch (error) {
  /* almacenamiento no disponible (modo privado): trátalo como no visto */
}

const shouldPlay =
  intro && !prefersReducedMotion && (REPLAY_ALWAYS || !alreadySeen);

if (shouldPlay) {
  const root = document.documentElement;
  let autoExitTimer = null;
  let closing = false;

  const remove = () => {
    root.classList.remove("intro-open"); // restaura el scroll del body
    intro.remove(); // saca el overlay del DOM
  };

  const exit = () => {
    if (closing) return;
    closing = true;
    window.clearTimeout(autoExitTimer);
    document.removeEventListener("keydown", exit);
    intro.classList.add("is-exit"); // fade del contenido + wipe vertical
    window.setTimeout(remove, EXIT_MS);
  };

  // Marca la sesión desde el inicio (aunque la salte, cuenta como vista).
  try {
    sessionStorage.setItem(SESSION_KEY, "1");
  } catch (error) {
    /* modo privado: ignora */
  }

  root.classList.add("intro-open"); // bloquea el scroll mientras es visible
  intro.classList.add("is-active"); // muestra el overlay y dispara la entrada

  // Salida automática tras entrada + pausa
  autoExitTimer = window.setTimeout(exit, ENTRY_MS + PAUSE_MS);

  // Skippable: click en cualquier parte o cualquier tecla
  intro.addEventListener("click", exit);
  document.addEventListener("keydown", exit);
}
