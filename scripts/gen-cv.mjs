/**
 * gen-cv.mjs — Genera el CV en PDF (carta, una página) en español e inglés:
 * public/cv.pdf y public/cv-en.pdf. El contenido vive en `content` (abajo);
 * para actualizar el CV se edita ahí y se vuelve a ejecutar.
 *
 * Ejecutar:  node scripts/gen-cv.mjs
 * Requiere Chrome o Edge instalado (imprime el HTML con --print-to-pdf) y las
 * devDependencies @fontsource/* (las tipografías del sitio van embebidas).
 * Ruta del navegador configurable con la variable CHROME_PATH.
 * Las salidas se commitean en public/.
 * Para depurar la maquetación:  node scripts/gen-cv.mjs --keep-html
 * (conserva el HTML intermedio e imprime su carpeta).
 *
 * Dirección de diseño — "el carnet, extendido":
 *   Para quién: talento humano y líderes técnicos que evalúan a un
 *   desarrollador y deciden en una lectura de diez segundos.
 *   Qué debe sentir: claro, técnico, confiable.
 *   Concepto: el CV abre igual que el portafolio (estado, rol, nombre) y su
 *   columna oscura es el carnet del sitio: misma cabecera, foto y QR.
 *   Elemento memorable: el punto verde de "en producción", único color.
 */
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import QRCode from "qrcode";

const SITE = "manuelcardenas.online";

const contact = [
  ["email", "manuelcardenassuarez2005@gmail.com", "mailto:manuelcardenassuarez2005@gmail.com"],
  ["phone", "+57 320 989 1830", "tel:+573209891830"],
  ["location", null, null], // el texto depende del idioma (c.location)
  ["web", SITE, `https://${SITE}`],
  ["github", "github.com/Manuel151025", "https://github.com/Manuel151025"],
  ["linkedin", "linkedin.com/in/<wbr><span class=\"nowrap\">manuel-cardenas-89b03b424</span>", "https://www.linkedin.com/in/manuel-cardenas-89b03b424"],
];

const kondidLinks = [
  ["proyectoocr.v44nxx.online", "https://proyectoocr.v44nxx.online"],
  ["github.com/V44nxx/Proyecto_ocr", "https://github.com/V44nxx/Proyecto_ocr"],
];
const breadLinks = [
  ["breadcontrol.manuelcardenas.online", "https://breadcontrol.manuelcardenas.online"],
  ["github.com/Manuel151025/breadcontrol", "https://github.com/Manuel151025/breadcontrol"],
];
// Verificación pública en Coursera (el mismo enlace de src/data/formacion.js).
const googleAiLink = [
  "coursera.org/verify/professional-cert/H1LCXVM8XO2D",
  "https://www.coursera.org/verify/professional-cert/H1LCXVM8XO2D",
];

const content = {
  es: {
    lang: "es",
    locale: "es-CO",
    file: "public/cv.pdf",
    status: "2 sistemas en producción",
    role: "Analista y Desarrollador de Software",
    location: "Colombia (Remoto)",
    labels: {
      contact: "Contacto",
      skills: "Competencias",
      languages: "Idiomas",
      profile: "Perfil",
      projects: "Proyectos",
      certs: "Certificaciones",
      education: "Educación",
      portfolio: "Portafolio",
      updated: "Actualizado en",
    },
    profile:
      "Analista y desarrollador de software con dos sistemas en producción: una plataforma web con OCR y 386 pruebas automáticas, y un sistema de gestión para una panadería real. Cubro el ciclo completo: análisis, desarrollo, pruebas, seguridad y despliegue, y uso la IA sin soltar el criterio técnico. Trabajo con PHP, Python, JavaScript, TypeScript y Kotlin, y despliego con Docker en servidores Linux.",
    metrics: [
      ["3", "motores OCR en cascada"],
      ["386", "pruebas automáticas en CI"],
      ["8", "cursos del Certificado Profesional de Google AI"],
    ],
    skills: [
      ["Backend", ["PHP 8", "Python", "FastAPI", "MySQL", "PostgreSQL", "APIs REST"]],
      ["Frontend", ["HTML5 · CSS3", "JavaScript", "Astro", "TypeScript", "Next.js", "Bootstrap"]],
      ["Móvil", ["Kotlin", "Jetpack Compose", "Room", "Retrofit"]],
      ["Calidad y seguridad", ["pytest", "Playwright", "GitHub Actions", "OWASP ZAP", "JMeter"]],
      ["DevOps", ["Docker", "Dokploy", "Linux", "Nginx", "Traefik"]],
      ["Herramientas", ["Git", "GitHub", "Jira", "Claude Code"]],
    ],
    languages: [
      ["Español", "Nativo"],
      ["Inglés", "Intermedio"],
    ],
    projects: [
      {
        title: "KondID — Plataforma OCR de documentos de identidad",
        date: "2026",
        meta: "Proyecto final del tecnólogo · En producción · Equipo de 2 con Emerson Corredor",
        bullets: [
          ["Qué hace:", "lee con OCR en cascada (Google Document AI, RapidOCR y Tesseract) las cédulas de las fichas PDF del SENA y las concilia contra la planilla oficial en Excel."],
          ["Seguridad (mi aporte):", "verificación en dos pasos (TOTP), sesión en cookie HttpOnly, CSP con nonce y límite de intentos; 26 de 26 casos de seguridad superados."],
          ["Calidad (mi aporte):", "386 pruebas automáticas (pytest y Playwright) en GitHub Actions, pruebas con OWASP ZAP y JMeter, y la documentación técnica y de usuario."],
        ],
        stack: ["Python", "FastAPI", "PostgreSQL", "Next.js", "TypeScript", "Docker"],
        links: kondidLinks,
      },
      {
        title: "BreadControl — Sistema de gestión para panadería",
        date: "2025 – Presente",
        meta: "Cliente real · En producción · Desarrollo individual",
        bullets: [
          ["Qué hace:", "10 módulos integrados (inventario, producción, recetas, compras, ventas, gastos y cierre diario) con costeo FIFO por lotes y pagos por Nequi/Wompi."],
          ["Cómo está hecho:", "19 tablas en MySQL, contraseñas con bcrypt y consultas preparadas; gestionado con Scrum en Jira (4 sprints) y desplegado con Docker en un VPS."],
        ],
        stack: ["PHP 8", "MySQL 8", "Bootstrap 5", "JavaScript", "Docker"],
        links: breadLinks,
      },
    ],
    certs: [
      {
        title: "Certificado Profesional de Google AI",
        issuer: "Google · Coursera · 8 cursos",
        date: "Nov 2026",
        state: ["done", "Completado"],
        detail:
          "IA aplicada a investigación, redacción, análisis de datos, y construcción y despliegue de apps.",
        link: googleAiLink,
      },
      {
        title: "Certificado Profesional de Ciberseguridad de Google",
        issuer: "Google · Coursera",
        state: ["wip", "En curso"],
      },
      {
        title: "Certificado Profesional de Análisis de Datos de Google",
        issuer: "Google · Coursera",
        state: ["wip", "En curso"],
      },
    ],
    education: [
      ["Tecnólogo en Análisis y Desarrollo de Software", "SENA · Centro Tecnológico de la Amazonia, Florencia (Caquetá)", "2025 – 2027"],
      ["Técnico en Sistemas por Competencias Laborales", "SENA", "2024"],
      ["Bachiller Académico", "", "2022"],
    ],
  },
  en: {
    lang: "en",
    locale: "en-US",
    file: "public/cv-en.pdf",
    status: "2 systems in production",
    role: "Software Analyst & Developer",
    location: "Colombia (Remote)",
    labels: {
      contact: "Contact",
      skills: "Skills",
      languages: "Languages",
      profile: "Profile",
      projects: "Projects",
      certs: "Certifications",
      education: "Education",
      portfolio: "Portfolio",
      updated: "Updated",
    },
    profile:
      "Software analyst and developer with two systems in production: a web platform with OCR and 386 automated tests, and a management system for a real bakery. I cover the full cycle: analysis, development, testing, security and deployment, and I use AI without giving up technical judgment. I work with PHP, Python, JavaScript, TypeScript and Kotlin, and deploy with Docker on Linux servers.",
    metrics: [
      ["3", "cascading OCR engines"],
      ["386", "automated tests in CI"],
      ["8", "courses in the Google AI Professional Certificate"],
    ],
    skills: [
      ["Backend", ["PHP 8", "Python", "FastAPI", "MySQL", "PostgreSQL", "REST APIs"]],
      ["Frontend", ["HTML5 · CSS3", "JavaScript", "Astro", "TypeScript", "Next.js", "Bootstrap"]],
      ["Mobile", ["Kotlin", "Jetpack Compose", "Room", "Retrofit"]],
      ["Quality & security", ["pytest", "Playwright", "GitHub Actions", "OWASP ZAP", "JMeter"]],
      ["DevOps", ["Docker", "Dokploy", "Linux", "Nginx", "Traefik"]],
      ["Tools", ["Git", "GitHub", "Jira", "Claude Code"]],
    ],
    languages: [
      ["Spanish", "Native"],
      ["English", "Intermediate"],
    ],
    projects: [
      {
        title: "KondID — Identity Document OCR Platform",
        date: "2026",
        meta: "Capstone project · In production · Team of 2 with Emerson Corredor",
        bullets: [
          ["What it does:", "reads scanned ID cards with cascading OCR (Google Document AI, RapidOCR, Tesseract) and reconciles them against the official enrollment spreadsheet."],
          ["Security (my part):", "two-factor authentication (TOTP), HttpOnly cookie sessions, CSP with nonces and rate limiting; 26 of 26 security test cases passing."],
          ["Quality (my part):", "386 automated tests (pytest and Playwright) on GitHub Actions, OWASP ZAP and JMeter testing, plus the technical and user documentation."],
        ],
        stack: ["Python", "FastAPI", "PostgreSQL", "Next.js", "TypeScript", "Docker"],
        links: kondidLinks,
      },
      {
        title: "BreadControl — Bakery Management System",
        date: "2025 – Present",
        meta: "Real client · In production · Solo project",
        bullets: [
          ["What it does:", "10 integrated modules (inventory, production, recipes, purchasing, sales, expenses and daily close) with per-batch FIFO costing and Nequi/Wompi payments."],
          ["How it is built:", "19 MySQL tables, bcrypt password hashing and prepared statements; managed with Scrum in Jira (4 sprints) and deployed with Docker on a VPS."],
        ],
        stack: ["PHP 8", "MySQL 8", "Bootstrap 5", "JavaScript", "Docker"],
        links: breadLinks,
      },
    ],
    certs: [
      {
        title: "Google AI Professional Certificate",
        issuer: "Google · Coursera · 8 courses",
        date: "Nov 2026",
        state: ["done", "Completed"],
        detail:
          "Applied AI for research, writing, data analysis, and building and deploying apps.",
        link: googleAiLink,
      },
      {
        title: "Google Cybersecurity Professional Certificate",
        issuer: "Google · Coursera",
        state: ["wip", "In progress"],
      },
      {
        title: "Google Data Analytics Professional Certificate",
        issuer: "Google · Coursera",
        state: ["wip", "In progress"],
      },
    ],
    education: [
      ["Associate Degree in Software Analysis & Development", "SENA · Centro Tecnológico de la Amazonia, Florencia (Caquetá), Colombia", "2025 – 2027"],
      ["Technical Certificate in Systems (Labor Competencies)", "SENA", "2024"],
      ["High School Diploma", "", "2022"],
    ],
  },
};

// Iconos (trazo de 1.6 sobre 24x24).
const icon = (d) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
const icons = {
  email: icon('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 6.5 8.5-6.5"/>'),
  phone: icon('<rect x="7" y="2.5" width="10" height="19" rx="2.2"/><path d="M11 18.5h2"/>'),
  location: icon('<path d="M12 21s-6.5-5.8-6.5-11a6.5 6.5 0 0 1 13 0c0 5.2-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/>'),
  web: icon('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.7 5.6 3.7 9s-1.2 6.4-3.7 9c-2.5-2.6-3.7-5.6-3.7-9S9.5 5.6 12 3z"/>'),
  github: icon('<path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/>'),
  linkedin: icon('<rect x="3" y="3" width="18" height="18" rx="2.5"/><path d="M8 10.5V16M8 7.8v.1M11.5 16v-3.2c0-1.4 1-2.3 2.2-2.3s2 .9 2 2.3V16M11.5 10.5V16"/>'),
  out: icon('<path d="M7 17 17 7M9 7h8v8"/>'),
};

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const chips = (items) => items.map((t) => `<span class="chip">${esc(t)}</span>`).join("");

// Tipografías del sitio, embebidas (subconjunto latin de @fontsource).
const FONTS = [
  ["space-grotesk", "Space Grotesk", [600, 700]],
  ["inter", "Inter", [400, 500, 600]],
  ["jetbrains-mono", "JetBrains Mono", [400, 500]],
];
async function fontFaces() {
  const faces = [];
  for (const [pkg, family, weights] of FONTS) {
    for (const weight of weights) {
      const file = `node_modules/@fontsource/${pkg}/files/${pkg}-latin-${weight}-normal.woff2`;
      const data = (await readFile(file)).toString("base64");
      faces.push(
        `@font-face { font-family: "${family}"; font-weight: ${weight}; font-style: normal; src: url(data:font/woff2;base64,${data}) format("woff2"); }`,
      );
    }
  }
  return faces.join("\n");
}

function html(c, { photo, fonts, qr }) {
  const contactRows = contact
    .map(([key, text, href]) => {
      const label = text ?? esc(c.location);
      const body = href ? `<a href="${href}">${label}</a>` : `<span>${label}</span>`;
      return `<li>${icons[key]}${body}</li>`;
    })
    .join("");

  const updated = new Intl.DateTimeFormat(c.locale, { month: "long", year: "numeric" }).format(new Date());

  const section = (n, title) =>
    `<div class="sec"><span class="sec__n">0${n}</span><h2>${title}</h2></div>`;

  return `<!doctype html>
<html lang="${c.lang}"><head><meta charset="utf-8"><title>CV — Manuel Andrés Cárdenas Suárez</title>
<style>
${fonts}
  :root {
    /* Tinta sobre papel (columna principal) */
    --ink: #111113;
    --text: #2e2e33;
    --muted: #63636b;
    --line: #e2e2e6;
    --chip-line: #d0d0d6;
    --name-2: #85858e;
    /* Carnet (columna oscura): tokens del sitio */
    --panel: #0a0a0b;
    --panel-surface: #141417;
    --panel-line: #2a2a30;
    --panel-text: #e4e4e7;
    --panel-muted: #a1a1aa;
    --grid: rgba(255, 255, 255, 0.032);
    /* Estado: único color */
    --live: #4ade80;
    --done: #22a35a;
    --wip: #dd9a1f;

    --font-display: "Space Grotesk", "Segoe UI", Arial, sans-serif;
    --font-body: "Inter", "Segoe UI", Arial, sans-serif;
    --font-mono: "JetBrains Mono", Consolas, monospace;
    --pill: 99pt;
  }
  @page { size: Letter; margin: 0; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: 8.5in; height: 11in; }
  body { display: grid; grid-template-columns: 2.55in 1fr; font: 400 8.5pt/1.4 var(--font-body); color: var(--text);
         -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  a { color: inherit; text-decoration: none; }
  .nowrap { white-space: nowrap; }
  svg { display: block; }

  /* ---------- Carnet (columna oscura) ---------- */
  aside { display: flex; flex-direction: column; gap: 13pt; padding: 0.34in 0.25in 0.28in; color: var(--panel-text);
          background-color: var(--panel);
          background-image: linear-gradient(var(--grid) 0.75pt, transparent 0.75pt), linear-gradient(90deg, var(--grid) 0.75pt, transparent 0.75pt);
          background-size: 20pt 20pt; }
  .card-head { display: flex; align-items: center; justify-content: space-between; font: 500 6.2pt var(--font-mono);
               letter-spacing: 0.12em; text-transform: uppercase; color: var(--panel-muted); }
  .card-head b { padding: 1.6pt 5.5pt; font-weight: 500; color: var(--panel-text); border: 0.6pt solid var(--panel-line); border-radius: var(--pill); }
  .photo { display: block; width: 100%; aspect-ratio: 1; margin-top: -5pt; object-fit: cover; object-position: top;
           background: #fff; border: 0.75pt solid var(--panel-line); border-radius: 9pt; }
  aside h2 { display: flex; align-items: center; gap: 6pt; margin-bottom: 8pt; font: 500 6.6pt var(--font-mono);
             letter-spacing: 0.16em; text-transform: uppercase; color: #fff; }
  aside h2::after { content: ""; flex: 1; height: 0.6pt; background: var(--panel-line); }
  .contact { list-style: none; display: grid; gap: 5.5pt; }
  .contact li { display: grid; grid-template-columns: 9pt 1fr; gap: 6pt; align-items: start; font-size: 6.8pt; line-height: 1.3; }
  .contact svg { width: 9pt; height: 9pt; margin-top: 0.4pt; color: var(--panel-muted); }
  .skill + .skill { margin-top: 6.5pt; }
  .skill h3 { margin-bottom: 3.2pt; font: 500 6.2pt var(--font-mono); letter-spacing: 0.1em; text-transform: uppercase; color: var(--panel-muted); }
  .chips { display: flex; flex-wrap: wrap; gap: 2.6pt; }
  .chip { padding: 1.3pt 5pt; font: 400 6.4pt var(--font-mono); white-space: nowrap; border: 0.6pt solid var(--chip-line); border-radius: var(--pill); }
  aside .chip { color: var(--panel-text); background: var(--panel-surface); border-color: var(--panel-line); }
  .lang { display: flex; justify-content: space-between; font-size: 7.6pt; }
  .lang + .lang { margin-top: 3pt; }
  .lang b { font-weight: 500; color: #fff; }
  .lang span { color: var(--panel-muted); }
  .qr { display: flex; align-items: center; gap: 8pt; margin-top: auto; }
  .qr__code { flex: none; width: 40pt; height: 40pt; padding: 3pt; background: #f5f5f7; border-radius: 4pt; }
  .qr__code svg { width: 100%; height: 100%; }
  .qr__text { font: 400 6.8pt/1.45 var(--font-mono); color: var(--panel-text); }
  .qr__text b { display: block; font-weight: 500; font-size: 6.2pt; letter-spacing: 0.14em; text-transform: uppercase; color: var(--panel-muted); }

  /* ---------- Columna principal ---------- */
  main { display: flex; flex-direction: column; padding: 0.36in 0.44in 0.28in 0.42in; }
  .status { align-self: flex-start; display: inline-flex; align-items: center; gap: 5pt; padding: 3.2pt 8.5pt 3.2pt 7pt;
            font: 500 6.6pt var(--font-mono); letter-spacing: 0.1em; text-transform: uppercase; color: #f5f5f7;
            background: var(--ink); border-radius: var(--pill); }
  .status i { width: 5pt; height: 5pt; background: var(--live); border-radius: 50%; }
  .eyebrow { display: flex; align-items: center; gap: 6pt; margin-top: 10pt; font: 400 7.8pt var(--font-mono); color: var(--muted); }
  .eyebrow::before { content: ""; width: 16pt; height: 0.75pt; background: var(--muted); }
  h1 { margin-top: 4pt; font: 700 27pt/1.02 var(--font-display); letter-spacing: -0.025em; color: var(--ink); }
  h1 span { color: var(--name-2); }

  .sec { display: flex; align-items: center; gap: 6pt; margin: 11pt 0 6pt; }
  .sec__n { font: 500 6.6pt var(--font-mono); color: var(--muted); }
  .sec h2 { font: 700 9pt var(--font-display); letter-spacing: 0.09em; text-transform: uppercase; color: var(--ink); }
  .sec::after { content: ""; flex: 1; height: 0.6pt; background: var(--line); }

  .metrics { display: grid; grid-template-columns: 0.8fr 1.08fr 1.22fr; margin-top: 8pt; border: 0.75pt solid var(--line); border-radius: 7pt; }
  .metric { display: flex; align-items: center; gap: 7pt; padding: 6pt 10pt; }
  .metric + .metric { border-left: 0.75pt solid var(--line); }
  .metric b { font: 700 20pt/1 var(--font-display); letter-spacing: -0.03em; color: var(--ink); }
  .metric span { font-size: 7.2pt; line-height: 1.25; color: var(--muted); }

  .item + .item { margin-top: 9pt; }
  .row { display: flex; align-items: baseline; justify-content: space-between; gap: 10pt; }
  .row h3 { font: 600 10pt var(--font-display); letter-spacing: -0.005em; color: var(--ink); }
  .date { font: 400 6.8pt var(--font-mono); white-space: nowrap; color: var(--muted); }
  .meta { margin-top: 1.5pt; font: 400 6.4pt var(--font-mono); letter-spacing: 0.06em; text-transform: uppercase; color: var(--muted); }
  ul.b { display: grid; gap: 2.2pt; margin-top: 4pt; list-style: none; }
  ul.b li { position: relative; padding-left: 9.5pt; }
  ul.b li::before { content: ""; position: absolute; top: 0.5em; left: 0.5pt; width: 3.2pt; height: 3.2pt; background: var(--ink); border-radius: 0.8pt; }
  ul.b b { font-weight: 600; color: var(--ink); }
  main .chips { margin-top: 5pt; }
  main .chip { color: #3c3c43; }
  .links { display: flex; flex-wrap: wrap; gap: 3pt 14pt; margin-top: 5pt; font: 400 6.8pt var(--font-mono); color: var(--ink); }
  .links a { display: inline-flex; align-items: center; gap: 3pt; padding-bottom: 0.6pt; border-bottom: 0.5pt solid var(--chip-line); }
  .links svg { width: 6.5pt; height: 6.5pt; color: var(--muted); }

  .cert + .cert { margin-top: 5pt; }
  .edu + .edu { margin-top: 4pt; }
  .edu h3 span { font-weight: 400; color: var(--muted); }
  .cert h3, .edu h3 { font: 600 9pt var(--font-body); }
  .state { display: inline-flex; align-items: center; gap: 3.5pt; font: 500 6.4pt var(--font-mono); letter-spacing: 0.08em;
           text-transform: uppercase; white-space: nowrap; color: var(--muted); }
  .state i { width: 4.6pt; height: 4.6pt; border-radius: 50%; }
  .state--done i { background: var(--done); }
  .state--wip i { background: var(--wip); }
  .cert__detail { margin-top: 2pt; font-size: 7.9pt; line-height: 1.38; color: var(--muted); }

  .foot { margin-top: auto; padding-top: 8pt; font: 400 6.2pt var(--font-mono); letter-spacing: 0.06em; color: var(--muted); }
</style></head>
<body>
<aside>
  <div class="card-head"><span>Software Dev</span><b>DEV-2026</b></div>
  <img class="photo" src="${photo}" alt="">
  <section><h2>${c.labels.contact}</h2><ul class="contact">${contactRows}</ul></section>
  <section><h2>${c.labels.skills}</h2>${c.skills
    .map(([k, items]) => `<div class="skill"><h3>${esc(k)}</h3><p class="chips">${chips(items)}</p></div>`)
    .join("")}</section>
  <section><h2>${c.labels.languages}</h2>${c.languages
    .map(([k, v]) => `<p class="lang"><b>${k}</b><span>${v}</span></p>`)
    .join("")}</section>
  <a class="qr" href="https://${SITE}">
    <span class="qr__code">${qr}</span>
    <span class="qr__text"><b>${c.labels.portfolio}</b>${SITE}</span>
  </a>
</aside>
<main>
  <p class="status"><i></i>${esc(c.status)}</p>
  <p class="eyebrow">${esc(c.role)}</p>
  <h1>Manuel Andrés<br><span>Cárdenas Suárez</span></h1>

  ${section(1, c.labels.profile)}
  <p>${esc(c.profile)}</p>
  <div class="metrics">${c.metrics
    .map(([n, label]) => `<div class="metric"><b>${n}</b><span>${esc(label)}</span></div>`)
    .join("")}</div>

  ${section(2, c.labels.projects)}
  ${c.projects
    .map(
      (p) => `<div class="item">
    <div class="row"><h3>${esc(p.title)}</h3><span class="date">${p.date}</span></div>
    <p class="meta">${esc(p.meta)}</p>
    <ul class="b">${p.bullets.map(([lead, text]) => `<li><b>${esc(lead)}</b> ${esc(text)}</li>`).join("")}</ul>
    <p class="chips">${chips(p.stack)}</p>
    <p class="links">${p.links.map(([text, href]) => `<a href="${href}">${icons.out}${text}</a>`).join("")}</p>
  </div>`,
    )
    .join("")}

  ${section(3, c.labels.certs)}
  ${c.certs
    .map(
      (cert) => `<div class="cert">
    <div class="row"><h3>${esc(cert.title)}</h3><span class="state state--${cert.state[0]}"><i></i>${cert.state[1]}</span></div>
    <p class="meta">${esc(cert.issuer)}${cert.date ? ` · ${cert.date}` : ""}</p>
    ${cert.detail ? `<p class="cert__detail">${esc(cert.detail)}</p>` : ""}
    ${cert.link ? `<p class="links"><a href="${cert.link[1]}">${icons.out}${cert.link[0]}</a></p>` : ""}
  </div>`,
    )
    .join("")}

  ${section(4, c.labels.education)}
  ${c.education
    .map(
      ([title, place, date]) => `<div class="edu">
    <div class="row"><h3>${esc(title)}${place && place.length < 12 ? ` <span>· ${esc(place)}</span>` : ""}</h3><span class="date">${date}</span></div>
    ${place.length >= 12 ? `<p class="meta">${esc(place)}</p>` : ""}
  </div>`,
    )
    .join("")}

  <p class="foot">${SITE} · ${c.labels.updated} ${updated}</p>
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

const assets = {
  // Foto a color (el perfil.webp del sitio es en blanco y negro).
  photo: `data:image/jpeg;base64,${(await readFile("scripts/cv-foto.jpg")).toString("base64")}`,
  fonts: await fontFaces(),
  // Mismo QR que el carnet del sitio, pero apuntando al portafolio.
  qr: await QRCode.toString(`https://${SITE}`, {
    type: "svg",
    margin: 0,
    errorCorrectionLevel: "M",
    color: { dark: "#0a0a0b", light: "#f5f5f7" },
  }),
};

const keepHtml = process.argv.includes("--keep-html");
const dir = await mkdtemp(join(tmpdir(), "cv-"));
try {
  for (const c of Object.values(content)) {
    const src = join(dir, `cv-${c.lang}.html`);
    await writeFile(src, html(c, assets));
    execFileSync(chrome, [
      "--headless",
      "--disable-gpu",
      "--no-pdf-header-footer",
      "--virtual-time-budget=3000",
      `--user-data-dir=${join(dir, "profile")}`,
      `--print-to-pdf=${resolve(c.file)}`,
      pathToFileURL(src).href,
    ], { stdio: "ignore" });
    console.log(`✓ ${c.file}`);
  }
} finally {
  if (keepHtml) console.log(`HTML conservado en ${dir}`);
  else await rm(dir, { recursive: true, force: true });
}
