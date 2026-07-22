/**
 * contact-form.js — Envío del formulario de contacto vía Web3Forms.
 * Responsabilidad única: interceptar el submit, enviar por fetch y mostrar
 * el estado (enviando / éxito / error) sin recargar la página.
 * Ver CLAUDE.md §4.
 */

const form = document.getElementById("contact-form");

if (form) {
  const status = form.querySelector(".contact-form__status");
  const submitBtn = form.querySelector(".contact-form__submit");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    status.className = "contact-form__status";
    status.textContent = "Enviando…";
    submitBtn.disabled = true;

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      const result = await response.json();

      if (result.success) {
        status.textContent = "¡Mensaje enviado! Te responderé pronto.";
        status.classList.add("is-success");
        form.reset();
      } else {
        status.textContent =
          "No se pudo enviar. Escríbeme directo a mi email (a la derecha).";
        status.classList.add("is-error");
      }
    } catch (error) {
      status.textContent =
        "Error de red. Intenta de nuevo o escríbeme a mi email.";
      status.classList.add("is-error");
    } finally {
      submitBtn.disabled = false;
    }
  });
}
