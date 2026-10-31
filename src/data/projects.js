/**
 * projects.js — Fuente única de los proyectos (datos separados de la vista).
 * Projects.astro itera sobre este array y renderiza un ProjectCard por cada
 * proyecto. Ver CLAUDE.md §4 y §8.
 *
 * Campos por proyecto:
 *   titulo, descripcion, stack[], estado, repo (o null), demo (o null),
 *   capturas[] ({ src, alt }: la primera es la portada de la tarjeta)
 *
 * Imágenes: guárdalas en /public/img/proyectos/ (WebP 1280x720, 16:9). La
 * tarjeta las rota en carrusel y el modal las muestra en galería; con el
 * array vacío, la tarjeta muestra un placeholder.
 */
export const projects = [
  {
    titulo: "KondID",
    descripcion:
      "Plataforma web que lee con OCR las cédulas de las fichas PDF del SENA y las concilia contra la planilla oficial en Excel, con verificación en dos pasos y 386 pruebas automáticas en CI. Proyecto final del tecnólogo, hecho en equipo con Emerson Corredor; mi parte: seguridad, pruebas y documentación.",
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
      { src: "/img/proyectos/kondid-1.webp", alt: "Panel principal con los totales de fichas, personas y comparaciones" },
      { src: "/img/proyectos/kondid-2.webp", alt: "Personas extraídas de una ficha, con las que quedan por revisar" },
      { src: "/img/proyectos/kondid-3.webp", alt: "Comparación de los datos leídos contra la planilla oficial en Excel" },
    ],
  },
  {
    titulo: "BreadControl",
    descripcion:
      "Sistema web de gestión para panadería (caso real: panadería familiar). Control de ventas, producción, inventario y finanzas con costeo FIFO y pagos vía Nequi/Wompi.",
    stack: ["PHP 8", "MySQL 8", "Bootstrap 5", "PDO"],
    estado: "Producción",
    repo: "https://github.com/Manuel151025/breadcontrol",
    demo: "https://breadcontrol.manuelcardenas.online",
    capturas: [
      { src: "/img/proyectos/breadcontrol-1.webp", alt: "Portada de BreadControl" },
      { src: "/img/proyectos/breadcontrol-2.webp", alt: "Los 10 módulos integrados del sistema" },
      { src: "/img/proyectos/breadcontrol-3.webp", alt: "Inicio de sesión con saludo, hora y clima" },
    ],
  },
  {
    titulo: "Lector de Cédulas",
    descripcion:
      "Aplicación de escritorio que lee cédulas colombianas escaneadas en PDF con OCR y las coteja contra el Excel de inscritos, mostrando solo lo que no cuadra (caso real: fichas del SENA). Decodifica el PDF417 del reverso para confirmar los datos impresos. Todo el reconocimiento corre en el equipo: nada sale a internet.",
    stack: [
      "Python 3.12",
      "Flask",
      "Waitress",
      "RapidOCR",
      "OpenVINO",
      "PyMuPDF",
      "zxing-cpp",
      "OpenCV",
      "pywebview",
      "openpyxl",
    ],
    estado: "Producción",
    repo: null,
    demo: null,
    capturas: [
      { src: "/img/proyectos/lector-cedulas-1.webp", alt: "Inicio con lo que falta por revisar y las últimas fichas" },
      { src: "/img/proyectos/lector-cedulas-2.webp", alt: "Pantalla «Acerca de» con las cifras del programa" },
      { src: "/img/proyectos/lector-cedulas-3.webp", alt: "Mis fichas: historial y en qué va cada una" },
    ],
  },
  {
    titulo: "Proyecto Offline",
    descripcion:
      "App Android nativa offline-first para encuestas de campo (caso Ministerio de Salud). Sincronización con resolución de conflictos Last-Write-Wins y patrón outbox.",
    stack: [
      "Kotlin",
      "Jetpack Compose",
      "Room",
      "WorkManager",
      "Retrofit",
      "Hilt",
      "Clean Architecture/MVVM",
      "PHP 8",
      "MySQL 8",
    ],
    estado: "En desarrollo",
    repo: "https://github.com/Manuel151025/proyecto_offline",
    demo: "https://encuestas.manuelcardenas.online",
    capturas: [
      { src: "/img/proyectos/proyecto-offline-1.webp", alt: "La app en el celular: inicio, registro sin conexión y envío de datos" },
      { src: "/img/proyectos/proyecto-offline-2.webp", alt: "Panel de administración con el resumen de la recolección" },
      { src: "/img/proyectos/proyecto-offline-3.webp", alt: "Panel de sincronización de los celulares" },
    ],
  },
  {
    titulo: "SeguimientoSENA",
    descripcion:
      "Sistema de seguimiento de proyectos formativos con tres roles (coordinador, instructor, aprendiz). Exportación PDF/Excel y recuperación de contraseña por email.",
    stack: ["PHP 8", "MySQL 8", "Bootstrap 5", "PDO"],
    estado: "En desarrollo",
    repo: "https://github.com/Manuel151025/proyecto_sena",
    demo: "https://sena.manuelcardenas.online",
    capturas: [
      { src: "/img/proyectos/seguimientosena-1.webp", alt: "Panel de coordinación con el semáforo de aprendices" },
      { src: "/img/proyectos/seguimientosena-2.webp", alt: "Expediente de seguimiento de un aprendiz" },
      { src: "/img/proyectos/seguimientosena-3.webp", alt: "Ruta del proyecto formativo con su cronograma" },
    ],
  },
];
