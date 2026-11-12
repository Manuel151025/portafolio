/**
 * projects.js — Fuente única de los proyectos (datos separados de la vista).
 * Projects.astro itera sobre este array y renderiza un ProjectCard por cada
 * proyecto. Ver CLAUDE.md §4 y §8.
 *
 * Solo van los proyectos en producción que mejor muestran el trabajo; los
 * que siguen en desarrollo se agregan cuando estén terminados.
 *
 * Campos por proyecto:
 *   titulo, rol (contexto: equipo, cliente…), descripcion,
 *   cifras[] ({ valor, etiqueta }: tres datos verificables),
 *   destacados[] (detalle para el modal), stack[], estado,
 *   repo (o null), demo (o null),
 *   capturas[] ({ src, alt }: la primera es la portada de la tarjeta)
 *
 * Imágenes: guárdalas en /public/img/proyectos/ (WebP 1280x720, 16:9). La
 * tarjeta las rota en carrusel y el modal las muestra en galería; con el
 * array vacío, la tarjeta muestra un placeholder.
 */
export const projects = [
  {
    titulo: "KondID",
    rol: "Proyecto final del tecnólogo · Equipo de 2",
    descripcion:
      "Plataforma web que lee con OCR las cédulas de las fichas PDF del SENA y las concilia contra la planilla oficial en Excel. La construí con Emerson Corredor; mi parte fue la seguridad, las pruebas y la documentación.",
    cifras: [
      { valor: "386", etiqueta: "pruebas automáticas" },
      { valor: "26/26", etiqueta: "casos de seguridad" },
      { valor: "3", etiqueta: "motores OCR en cascada" },
    ],
    destacados: [
      "OCR en cascada: Google Document AI, con RapidOCR y Tesseract como respaldo local si la nube falla.",
      "Verificación en dos pasos (TOTP), sesión en cookie HttpOnly, CSP con nonce y límite de intentos.",
      "386 pruebas automáticas (pytest y Playwright) en GitHub Actions; los errores 500 bajo ataque de OWASP ZAP bajaron de 3.201 a 17.",
      "Backend y frontend en contenedores Docker, con despliegue automático en cada push.",
    ],
    stack: [
      "Python 3.12",
      "FastAPI",
      "PostgreSQL",
      "Next.js",
      "TypeScript",
      "Document AI",
      "RapidOCR",
      "pytest",
      "Playwright",
      "Docker",
    ],
    estado: "Producción",
    repo: "https://github.com/V44nxx/Proyecto_ocr",
    demo: "https://proyectoocr.v44nxx.online",
    capturas: [
      { src: "/img/proyectos/kondid-1.webp", alt: "Panel principal con los totales de fichas y personas" },
      { src: "/img/proyectos/kondid-2.webp", alt: "Personas extraídas y las que faltan por revisar" },
      { src: "/img/proyectos/kondid-3.webp", alt: "Comparación contra la planilla oficial en Excel" },
    ],
  },
  {
    titulo: "BreadControl",
    rol: "Cliente real · Desarrollo individual",
    descripcion:
      "Sistema web de gestión para una panadería familiar: compras, inventario, producción, ventas y cierre diario, con costeo FIFO por lotes y pagos por Nequi/Wompi.",
    cifras: [
      { valor: "10", etiqueta: "módulos integrados" },
      { valor: "19", etiqueta: "tablas en MySQL" },
      { valor: "4", etiqueta: "sprints con Scrum" },
    ],
    destacados: [
      "Costeo FIFO real: cada tanda descuenta del lote más antiguo y calcula el costo con su precio de compra.",
      "Cierre del día con la utilidad neta en un clic; merma y bonificaciones calculadas automáticamente.",
      "Contraseñas con bcrypt, consultas preparadas con PDO y protección contra XSS.",
      "Gestionado con Scrum en Jira: 4 sprints y más de 45 tareas.",
    ],
    stack: ["PHP 8", "MySQL 8", "Bootstrap 5", "JavaScript", "PDO", "Docker"],
    estado: "Producción",
    repo: "https://github.com/Manuel151025/breadcontrol",
    demo: "https://breadcontrol.manuelcardenas.online",
    capturas: [
      { src: "/img/proyectos/breadcontrol-1.webp", alt: "Portada de BreadControl" },
      { src: "/img/proyectos/breadcontrol-2.webp", alt: "Los 10 módulos integrados del sistema" },
      { src: "/img/proyectos/breadcontrol-3.webp", alt: "Inicio de sesión con saludo, hora y clima" },
    ],
  },
];
