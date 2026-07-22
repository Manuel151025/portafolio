/**
 * contact-form.js — Envío del formulario de contacto vía Web3Forms.
 * Responsabilidad única: contador de caracteres del mensaje, y al enviar
 * (con validación nativa del navegador) mandar por fetch y mostrar el
 * estado (enviando / éxito / error) sin recargar. Ver CLAUDE.md §4.
 */

const form = document.getElementById("contact-form");

if (form) {
  const status = form.querySelector(".contact-form__status");
  const submitBtn = form.querySelector(".contact-form__submit");
  const message = form.querySelector("#cf-message");
  const counter = form.querySelector(".field__counter");

  // Contador de caracteres del mensaje (límite en el maxlength del textarea)
  if (message && counter) {
    const max = message.getAttribute("maxlength") || 1000;
    const updateCounter = () => {
      counter.textContent = `${message.value.length} / ${max}`;
    };
    message.addEventListener("input", updateCounter);
    updateCounter();
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    status.className = "contact-form__status";
    status.textContent = "Enviando…";
    submitBtn.disabled = true;

    try {
      const formData = new FormData(form);
      // Asunto por defecto si el visitante lo dejó vacío
      const subject = (formData.get("subject") || "").trim();
      if (!subject) {
        formData.set("subject", "Nuevo mensaje desde el portafolio");
      }

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      const result = await response.json();

      if (result.success) {
        status.textContent = "¡Mensaje enviado! Te responderé pronto.";
        status.classList.add("is-success");
        form.reset();
        if (counter) counter.textContent = `0 / ${message.getAttribute("maxlength") || 1000}`;
      } else {
        status.textContent =
          "No se pudo enviar. Prueba por WhatsApp o correo (a la derecha).";
        status.classList.add("is-error");
      }
    } catch (error) {
      status.textContent =
        "Error de red. Intenta de nuevo o escríbeme por otro canal.";
      status.classList.add("is-error");
    } finally {
      submitBtn.disabled = false;
    }
  });
}
