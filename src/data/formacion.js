/**
 * formacion.js — Fuente única de la sección Formación (datos separados de
 * la vista). Formacion.astro renderiza los estudios como línea de tiempo y
 * las certificaciones como credenciales. Ver CLAUDE.md §4 y §8.
 *
 * estudios[]:        titulo, entidad, periodo, estado (o null), nota (o null)
 * certificaciones[]: titulo, emisor, fecha (o null si sigue en curso),
 *                    icono (nombre de simple-icons) o logo (imagen PNG con
 *                    fondo transparente en /img/logos/, se pinta como máscara
 *                    en el gris del talón; usa uno de los dos y deja el otro
 *                    en null),
 *                    carga ({ valor, unidad }: cursos u horas),
 *                    estado ("Completado" | "En curso"), detalle (o null),
 *                    credencial (enlace de verificación, o null)
 *
 * Al terminar un certificado: pon su fecha, cambia el estado a "Completado"
 * y pega en `credencial` su dirección pública de verificación, la que
 * Coursera imprime en el certificado (coursera.org/verify/…). El mismo
 * enlace va en el CV (scripts/gen-cv.mjs).
 *
 * Los certificados del SENA se verifican con un código que lleva la cédula:
 * ese código no se publica (ni aquí ni en el CV).
 */
export const estudios = [
  {
    titulo: "Tecnólogo en Análisis y Desarrollo de Software",
    entidad: "SENA · Centro Tecnológico de la Amazonia, Florencia (Caquetá)",
    periodo: "2025 – 2027",
    estado: "En curso",
    nota: null,
  },
  {
    titulo: "Bootcamp de Programación Nivel Explorador",
    entidad: "Talento Tech · MinTIC y CUN · 164 horas",
    periodo: "2025",
    estado: null,
    nota: null,
  },
  {
    titulo: "Técnico Laboral por Competencias en Sistemas",
    entidad: "Academia Nacional de Sistemas · 974 horas",
    periodo: "2024",
    estado: null,
    nota: null,
  },
];

export const certificaciones = [
  {
    titulo: "Certificado Profesional de Google AI",
    emisor: "Google · Coursera",
    fecha: "Nov 2026",
    icono: "simple-icons:google",
    logo: null,
    carga: { valor: 8, unidad: "cursos" },
    estado: "Completado",
    detalle:
      "Fundamentos de IA, investigación, redacción, creación de contenido, análisis de datos, y construcción y despliegue de aplicaciones con IA.",
    credencial:
      "https://www.coursera.org/verify/professional-cert/H1LCXVM8XO2D",
  },
  {
    titulo: "Redes y Seguridad",
    emisor: "SENA",
    fecha: "Oct 2024",
    icono: null,
    logo: "/img/logos/sena.png",
    carga: { valor: 40, unidad: "horas" },
    estado: "Completado",
    detalle: "Verificable en certificados.sena.edu.co.",
    credencial: null,
  },
  {
    titulo: "Certificado Profesional de Ciberseguridad de Google",
    emisor: "Google · Coursera",
    fecha: null,
    icono: "simple-icons:google",
    logo: null,
    carga: { valor: 8, unidad: "cursos" },
    estado: "En curso",
    detalle: null,
    credencial: null,
  },
  {
    titulo: "Certificado Profesional de Análisis de Datos de Google",
    emisor: "Google · Coursera",
    fecha: null,
    icono: "simple-icons:google",
    logo: null,
    carga: { valor: 8, unidad: "cursos" },
    estado: "En curso",
    detalle: null,
    credencial: null,
  },
];
