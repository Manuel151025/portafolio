/**
 * gen-cv.mjs — Genera el CV en PDF (carta, una página) en español e inglés:
 * public/cv.pdf y public/cv-en.pdf. El contenido vive en `content` (abajo);
 * para actualizar el CV se edita ahí y se vuelve a ejecutar.
 *
 * Ejecutar:  node scripts/gen-cv.mjs
 * Requiere Chrome o Edge instalado (imprime el HTML con --print-to-pdf).
 * Ruta del navegador configurable con la variable CHROME_PATH.
 * Las salidas se commitean en public/.
 */
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const contact = {
  email: "manuelcardenassuarez2005@gmail.com",
  phone: "+57 320 989 1830",
  web: "manuelcardenas.online",
  github: "github.com/Manuel151025",
  linkedin: "linkedin.com/in/manuel-cardenas-89b03b424",
};

const content = {
  es: {
    lang: "es",
    file: "public/cv.pdf",
    role: "Analista y Desarrollador de Software",
    location: "Colombia (Remoto)",
    labels: {
      contact: "Contacto",
      skills: "Competencias",
      languages: "Idiomas",
      profile: "Perfil profesional",
      projects: "Proyectos",
      education: "Educación",
      team: "Trabajo en equipo",
    },
    profile:
      "Analista y Desarrollador de Software en formación, con experiencia práctica construyendo aplicaciones web, móviles y de escritorio de extremo a extremo: desde el análisis y la documentación hasta el despliegue en producción. Bases sólidas en arquitectura limpia, seguridad, pruebas automatizadas y control de versiones. Integro herramientas de IA en mi flujo de trabajo sin ceder el criterio técnico ni la calidad del código.",
    skills: [
      ["Backend", "PHP 8, Python, FastAPI, MySQL 8, PostgreSQL, PDO, APIs REST"],
      ["Frontend", "HTML5, CSS3, JavaScript, TypeScript, Next.js, Bootstrap, Astro"],
      ["Móvil", "Kotlin, Jetpack Compose, Room, Retrofit, Hilt"],
      ["Calidad y seguridad", "pytest, Playwright, GitHub Actions (CI), OWASP ZAP, JMeter"],
      ["DevOps / Infra", "Docker, Dokploy, Linux, Nginx, Traefik, VPS"],
      ["Herramientas", "Git, GitHub, VS Code, MySQL Workbench, Claude Code"],
    ],
    languages: [
      ["Español", "Nativo"],
      ["Inglés", "Intermedio"],
    ],
    projects: [
      {
        title: "KondID — OCR de Documentos de Identidad",
        date: "2026",
        sub: "Proyecto final del tecnólogo · En producción · En equipo con Emerson Corredor",
        bullets: [
          "Lee con OCR en cascada (Document AI → RapidOCR → Tesseract) las cédulas de las fichas PDF del SENA y las concilia contra la planilla oficial en Excel.",
          "Mi aporte: verificación en dos pasos, sesión en cookie HttpOnly, CSP con nonce y límite de intentos; 386 pruebas automáticas en CI y la documentación técnica.",
        ],
        stack: "Python, FastAPI, PostgreSQL, Next.js, TypeScript, pytest, Playwright, Docker",
      },
      {
        title: "BreadControl — Gestión para Panadería",
        date: "2025 – Presente",
        sub: "Proyecto real en producción · Panadería familiar",
        bullets: [
          "Ventas, producción, inventario y finanzas con costeo FIFO; pagos Nequi/Wompi y Docker sobre VPS.",
        ],
        stack: "PHP 8, MySQL 8, Bootstrap 5, PDO, Docker",
      },
      {
        title: "Lector de Cédulas — App de Escritorio con OCR",
        date: "2026",
        sub: "En uso real · Fichas del SENA",
        bullets: [
          "OCR local de cédulas escaneadas en PDF y cotejo contra el Excel de inscritos; decodifica el PDF417 del reverso. Nada sale a internet.",
        ],
        stack: "Python, Flask, RapidOCR, OpenVINO, OpenCV, PyMuPDF",
      },
      {
        title: "Proyecto Offline — App Android de Encuestas",
        date: "2025 – Presente",
        sub: "App móvil nativa offline-first · Caso Ministerio de Salud",
        bullets: [
          "Sincronización offline-first con resolución de conflictos (Last-Write-Wins) y patrón outbox; Clean Architecture (MVVM) con backend PHP/MySQL.",
        ],
        stack: "Kotlin, Jetpack Compose, Room, WorkManager, Retrofit, Hilt",
      },
      {
        title: "SeguimientoSENA — Seguimiento de Proyectos",
        date: "2025 – Presente",
        sub: "App web con control de acceso por roles",
        bullets: [
          "Tres roles (coordinador, instructor, aprendiz), exportación PDF/Excel y recuperación de contraseña por correo.",
        ],
        stack: "PHP 8, MySQL 8, Bootstrap 5, PDO",
      },
    ],
    education: [
      ["Tecnólogo en Análisis y Desarrollo de Software", "SENA — Centro Tecnológico de la Amazonia, Florencia (Caquetá)", "2025 – 2027"],
      ["Técnico en Sistemas por Competencias Laborales", "SENA", "2024"],
      ["Bachiller Académico", "", "2022"],
    ],
    team: "Proyectos en equipos de dos a cuatro personas con Git/GitHub y división de responsabilidades, en todo el ciclo: análisis, documentación, implementación, pruebas y despliegue.",
  },
  en: {
    lang: "en",
    file: "public/cv-en.pdf",
    role: "Software Analyst & Developer",
    location: "Colombia (Remote)",
    labels: {
      contact: "Contact",
      skills: "Skills",
      languages: "Languages",
      profile: "Professional summary",
      projects: "Projects",
      education: "Education",
      team: "Teamwork",
    },
    profile:
      "Software Analyst and Developer (in training) with hands-on experience building end-to-end web, mobile, and desktop applications — from analysis and documentation to production deployment. Solid foundation in clean architecture, security, automated testing, and version control. I integrate AI tools into my workflow while keeping full technical ownership and code quality.",
    skills: [
      ["Backend", "PHP 8, Python, FastAPI, MySQL 8, PostgreSQL, PDO, REST APIs"],
      ["Frontend", "HTML5, CSS3, JavaScript, TypeScript, Next.js, Bootstrap, Astro"],
      ["Mobile", "Kotlin, Jetpack Compose, Room, Retrofit, Hilt"],
      ["Quality & security", "pytest, Playwright, GitHub Actions (CI), OWASP ZAP, JMeter"],
      ["DevOps / Infra", "Docker, Dokploy, Linux, Nginx, Traefik, VPS"],
      ["Tools", "Git, GitHub, VS Code, MySQL Workbench, Claude Code"],
    ],
    languages: [
      ["Spanish", "Native"],
      ["English", "Intermediate"],
    ],
    projects: [
      {
        title: "KondID — Identity Document OCR Platform",
        date: "2026",
        sub: "Capstone project · In production · Built with Emerson Corredor",
        bullets: [
          "Reads scanned Colombian ID cards from SENA PDF batches with cascading OCR (Document AI → RapidOCR → Tesseract) and reconciles them against the official Excel roster.",
          "My part: two-factor authentication, HttpOnly cookie sessions, nonce-based CSP and rate limiting; 386 automated tests in CI and the technical documentation.",
        ],
        stack: "Python, FastAPI, PostgreSQL, Next.js, TypeScript, pytest, Playwright, Docker",
      },
      {
        title: "BreadControl — Bakery Management System",
        date: "2025 – Present",
        sub: "Real production project · Family bakery",
        bullets: [
          "Sales, production, inventory, and finance with FIFO costing; Nequi/Wompi payments; Docker on a VPS.",
        ],
        stack: "PHP 8, MySQL 8, Bootstrap 5, PDO, Docker",
      },
      {
        title: "ID Card Reader — Desktop OCR App",
        date: "2026",
        sub: "In real use · SENA enrollment batches",
        bullets: [
          "Local OCR of scanned ID cards in PDF, cross-checked against the enrollment spreadsheet; decodes the back-side PDF417 barcode. No data leaves the machine.",
        ],
        stack: "Python, Flask, RapidOCR, OpenVINO, OpenCV, PyMuPDF",
      },
      {
        title: "Offline Project — Android Field Survey App",
        date: "2025 – Present",
        sub: "Native offline-first mobile app · Ministry of Health use case",
        bullets: [
          "Offline-first sync with Last-Write-Wins conflict resolution and the outbox pattern; Clean Architecture (MVVM) with a PHP/MySQL backend.",
        ],
        stack: "Kotlin, Jetpack Compose, Room, WorkManager, Retrofit, Hilt",
      },
      {
        title: "SeguimientoSENA — Project Tracking System",
        date: "2025 – Present",
        sub: "Web app with role-based access control",
        bullets: [
          "Three roles (coordinator, instructor, learner), PDF/Excel export, and email password recovery.",
        ],
        stack: "PHP 8, MySQL 8, Bootstrap 5, PDO",
      },
    ],
    education: [
      ["Associate Degree in Software Analysis & Development", "SENA — Centro Tecnológico de la Amazonia, Florencia (Caquetá), Colombia", "2025 – 2027"],
      ["Technical Certificate in Systems (Labor Competencies)", "SENA", "2024"],
      ["High School Diploma", "", "2022"],
    ],
    team: "Projects in teams of two to four using Git/GitHub and clear division of responsibilities across the full cycle: analysis, documentation, implementation, testing, and deployment.",
  },
};

// Iconos de contacto (trazo de 1.6 sobre 24x24).
const icon = (d) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
const icons = {
  email: icon('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 6.5 8.5-6.5"/>'),
  phone: icon('<rect x="7" y="2.5" width="10" height="19" rx="2.2"/><path d="M11 18.5h2"/>'),
  location: icon('<path d="M12 21s-6.5-5.8-6.5-11a6.5 6.5 0 0 1 13 0c0 5.2-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/>'),
  web: icon('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.7 5.6 3.7 9s-1.2 6.4-3.7 9c-2.5-2.6-3.7-5.6-3.7-9S9.5 5.6 12 3z"/>'),
  github: icon('<path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/>'),
  linkedin: icon('<rect x="3" y="3" width="18" height="18" rx="2.5"/><path d="M8 10.5V16M8 7.8v.1M11.5 16v-3.2c0-1.4 1-2.3 2.2-2.3s2 .9 2 2.3V16M11.5 10.5V16"/>'),
};

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

function html(c, photo) {
  const contactRows = [
    ["email", contact.email],
    ["phone", contact.phone],
    ["location", c.location],
    ["web", contact.web],
    ["github", contact.github],
    ["linkedin", contact.linkedin],
  ]
    .map(([k, v]) => `<li class="c-${k}">${icons[k]}<span>${esc(v)}</span></li>`)
    .join("");

  return `<!doctype html>
<html lang="${c.lang}"><head><meta charset="utf-8"><title>CV — Manuel Andrés Cárdenas Suárez</title>
<style>
  @page { size: Letter; margin: 0; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: 8.5in; height: 11in; }
  body { font-family: Arial, "Liberation Sans", Helvetica, sans-serif; color: #2b2b30; font-size: 8.6pt; line-height: 1.33;
         display: grid; grid-template-columns: 2.5in 1fr; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  aside { background: #111113; color: #d4d4d8; padding: 0.42in 0.3in 0.3in; }
  main { padding: 0.42in 0.48in 0.25in 0.46in; }
  .photo { display: block; width: 1.7in; height: 1.7in; margin: 0 auto 0.3in; border-radius: 50%; object-fit: cover; object-position: top;
           border: 3px solid #f5f5f7; background: #fff; }
  aside h2 { color: #fff; font-size: 9.6pt; letter-spacing: 0.22em; text-transform: uppercase; padding-bottom: 5pt;
             border-bottom: 1px solid #3a3a40; margin: 0 0 9pt; }
  aside section + section { margin-top: 18pt; }
  .contact { list-style: none; display: grid; gap: 6.5pt; }
  .contact li { display: grid; grid-template-columns: 11pt 1fr; gap: 6pt; align-items: center; font-size: 8pt; }
  .contact svg { width: 10pt; height: 10pt; color: #a1a1aa; }
  .contact .c-email span, .contact .c-linkedin span { font-size: 7.1pt; letter-spacing: -0.01em; white-space: nowrap; }
  .skill + .skill { margin-top: 8pt; }
  .skill h3 { color: #fff; font-size: 7.8pt; letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 1.5pt; }
  .skill p { font-size: 8pt; }
  .lang { display: flex; justify-content: space-between; font-size: 8pt; }
  .lang + .lang { margin-top: 4pt; }
  .lang b { color: #fff; }
  h1 { font-size: 22pt; line-height: 1.05; letter-spacing: 0.01em; color: #111113; text-transform: uppercase; }
  .role { font-size: 10.5pt; color: #55555c; margin-top: 4pt; letter-spacing: 0.02em; }
  .rule { width: 34pt; height: 3pt; background: #111113; margin: 8pt 0 11pt; }
  main h2 { font-size: 10pt; letter-spacing: 0.16em; text-transform: uppercase; color: #111113; margin: 10pt 0 5pt; }
  main h2:first-of-type { margin-top: 0; }
  .profile, .team { text-align: justify; }
  .proj + .proj { margin-top: 6pt; }
  .row { display: flex; justify-content: space-between; align-items: baseline; gap: 10pt; }
  .row h3 { font-size: 9pt; color: #111113; }
  .date { font-size: 7.6pt; color: #77777e; white-space: nowrap; }
  .sub { font-style: italic; color: #66666d; font-size: 7.9pt; }
  ul.b { margin: 2pt 0 1.5pt 11pt; }
  ul.b li { margin-top: 1pt; }
  .stack { font-size: 7.6pt; color: #55555c; }
  .stack b { color: #111113; }
  .edu + .edu { margin-top: 4pt; }
</style></head>
<body>
<aside>
  <img class="photo" src="${photo}" alt="">
  <section><h2>${c.labels.contact}</h2><ul class="contact">${contactRows}</ul></section>
  <section><h2>${c.labels.skills}</h2>${c.skills
    .map(([k, v]) => `<div class="skill"><h3>${k}</h3><p>${esc(v)}</p></div>`)
    .join("")}</section>
  <section><h2>${c.labels.languages}</h2>${c.languages
    .map(([k, v]) => `<div class="lang"><b>${k}</b><span>${v}</span></div>`)
    .join("")}</section>
</aside>
<main>
  <h1>Manuel Andrés<br>Cárdenas Suárez</h1>
  <p class="role">${c.role}</p>
  <div class="rule"></div>
  <h2>${c.labels.profile}</h2>
  <p class="profile">${esc(c.profile)}</p>
  <h2>${c.labels.projects}</h2>
  ${c.projects
    .map(
      (p) => `<div class="proj">
    <div class="row"><h3>${esc(p.title)}</h3><span class="date">${p.date}</span></div>
    <p class="sub">${esc(p.sub)}</p>
    <ul class="b">${p.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
    <p class="stack"><b>Stack:</b> ${esc(p.stack)}</p>
  </div>`,
    )
    .join("")}
  <h2>${c.labels.education}</h2>
  ${c.education
    .map(
      ([t, place, d]) => `<div class="edu">
    <div class="row"><h3>${esc(t)}</h3><span class="date">${d}</span></div>
    ${place ? `<p class="sub">${esc(place)}</p>` : ""}
  </div>`,
    )
    .join("")}
  <h2>${c.labels.team}</h2>
  <p class="team">${esc(c.team)}</p>
</main>
</body></html>`;
}

const chrome = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
].find((p) => p && existsSync(p));
if (!chrome) throw new Error("No se encontró Chrome/Edge. Define CHROME_PATH.");

// Foto a color (el perfil.webp del sitio es en blanco y negro).
const photo = `data:image/jpeg;base64,${(await readFile("scripts/cv-foto.jpg")).toString("base64")}`;
const dir = await mkdtemp(join(tmpdir(), "cv-"));
try {
  for (const c of Object.values(content)) {
    const src = join(dir, `cv-${c.lang}.html`);
    await writeFile(src, html(c, photo));
    execFileSync(chrome, [
      "--headless",
      "--disable-gpu",
      "--no-pdf-header-footer",
      `--user-data-dir=${join(dir, "profile")}`,
      `--print-to-pdf=${resolve(c.file)}`,
      pathToFileURL(src).href,
    ], { stdio: "ignore" });
    console.log(`✓ ${c.file}`);
  }
} finally {
  await rm(dir, { recursive: true, force: true });
}
