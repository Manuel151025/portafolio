/**
 * formacion.js — Fuente única de la sección Formación (datos separados de
 * la vista). Formacion.astro renderiza los estudios como línea de tiempo y
 * las certificaciones como credenciales. Ver CLAUDE.md §4 y §8.
 *
 * estudios[]:        titulo, entidad, periodo, estado (o null), nota (o null)
 * certificaciones[]: titulo, emisor, fecha (o null si sigue en curso),
 *                    cursos (cuántos tiene el programa), estado
 *                    ("Completado" | "En curso"), detalle (o null),
 *                    credencial (enlace de verificación, o null)
 *
 * Al terminar un certificado: pon su fecha, cambia el estado a "Completado"
 * y pega en `credencial` el enlace "Ver certificado" de Coursera.
 */
export const estudios = [
  {
    titulo: "Tecnólogo en Análisis y Desarrollo de Software",
    entidad: "SENA · Centro Tecnológico de la Amazonia, Florencia (Caquetá)",
    periodo: "2025 – 2027",
    estado: "En curso",
    nota: "Disponible para etapa productiva (contrato de aprendizaje)",
  },
  {
    titulo: "Técnico en Sistemas por Competencias Laborales",
    entidad: "SENA",
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
    cursos: 8,
    estado: "Completado",
    detalle:
      "Fundamentos de IA, investigación, redacción, creación de contenido, análisis de datos, y construcción y despliegue de aplicaciones con IA.",
    credencial: null,
  },
  {
    titulo: "Certificado Profesional de Ciberseguridad de Google",
    emisor: "Google · Coursera",
    fecha: null,
    cursos: 8,
    estado: "En curso",
    detalle: null,
    credencial: null,
  },
  {
    titulo: "Certificado Profesional de Análisis de Datos de Google",
    emisor: "Google · Coursera",
    fecha: null,
    cursos: 8,
    estado: "En curso",
    detalle: null,
    credencial: null,
  },
];
