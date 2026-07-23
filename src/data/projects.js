/**
 * projects.js — Fuente única de los proyectos (datos separados de la vista).
 * Projects.astro itera sobre este array y renderiza un ProjectCard por cada
 * proyecto. Ver CLAUDE.md §4 y §8.
 *
 * Campos por proyecto:
 *   titulo, descripcion, stack[], estado, repo, demo (o null),
 *   imagen (captura escritorio, o null), imagenMovil (captura móvil, o null)
 *
 * Imágenes: guárdalas en /public/img/proyectos/ (WebP recomendado). Si un
 * campo es null, la tarjeta muestra un placeholder. Ver §11.
 */
export const projects = [
  {
    titulo: "BreadControl",
    descripcion:
      "Sistema web de gestión para panadería (caso real: panadería familiar). Control de ventas, producción, inventario y finanzas con costeo FIFO y pagos vía Nequi/Wompi.",
    stack: ["PHP 8", "MySQL 8", "Bootstrap 5", "PDO"],
    estado: "Producción",
    repo: "https://github.com/Manuel151025/breadcontrol",
    demo: "https://breadcontrol.manuelcardenas.online",
    imagen: "/img/proyectos/breadcontrol.webp",
    imagenMovil: null,
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
    imagen: null,
    imagenMovil: null,
  },
  {
    titulo: "SeguimientoSENA",
    descripcion:
      "Sistema de seguimiento de proyectos formativos con tres roles (coordinador, instructor, aprendiz). Exportación PDF/Excel y recuperación de contraseña por email.",
    stack: ["PHP 8", "MySQL 8", "Bootstrap 5", "PDO"],
    estado: "En desarrollo",
    repo: "https://github.com/Manuel151025/proyecto_sena",
    demo: "https://sena.manuelcardenas.online",
    imagen: "/img/proyectos/sena.webp",
    imagenMovil: null,
  },
];
