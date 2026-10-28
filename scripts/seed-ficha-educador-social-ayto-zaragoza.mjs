/**
 * Ficha (sin material de estudio) de Educador/a Social del Ayuntamiento de
 * Zaragoza: Escala de Administración Especial, Subescala Técnica, clase
 * Media (A2), turno libre.
 *
 * Fuentes primarias leídas íntegras en la sesión:
 * - Bases específicas CONV 2/2026 (bases2097.pdf = bases2091.pdf, mismo
 *   documento; BOPZ núm. 170, de 27-07-2026), que convocan varias plazas A2:
 *   base 1.4 (9 plazas de las OEP 2024, 2025 y 2026: 8 TLO y 1 TLRDIS), 1.7
 *   (periodo de prácticas), 1.8 (estructura de la base 7.4.B.1 de las bases
 *   generales), 2.2.2 (titulación), 3.5 (letra «V»), quinta (90 aspirantes
 *   como máximo superan la primera prueba: 80 TLO y 10 TLRDIS) y anexo I
 *   (programa de 60 temas en cuatro partes). La rectificación de estas bases
 *   (BOPZ núm. 196, de 27-08-2026, edicto 5765) no afecta a esta categoría.
 * - BOE núm. 227, de 14-09-2026 (BOE-A-2026-19150): plazo del 15-09-2026 al
 *   05-10-2026 según la ficha oficial (zaragoza.es/oferta, id 2097).
 * - TRBGTL, base 7.4.B.1: mismos ejercicios que Ingeniera/o Técnica/o
 *   Industrial (ver seed-ficha-ingeniero-tecnico-industrial-ayto-zaragoza.mjs).
 *
 * Uso: node --env-file=.env.local scripts/seed-ficha-educador-social-ayto-zaragoza.mjs
 */
import { sembrarFicha } from "./lib/sembrar-ficha.mjs";

const SLUG = "educador-social-ayto-zaragoza";

await sembrarFicha({
  oposicion: {
    slug: SLUG,
    nombre: "Educador/a Social",
    organismo: "Ayuntamiento de Zaragoza",
    organismo_slug: "ayuntamiento-zaragoza",
    puesto_slug: "educador-social",
    descripcion_corta: "Oposición de Educador/a Social (A2) del Ayuntamiento de Zaragoza: plazas, requisitos, examen y temario oficial.",
    descripcion_larga: "Plazas de funcionario de la Escala de Administración Especial, Subescala Técnica, clase Media (subgrupo A2), del Ayuntamiento de Zaragoza. Se exige la diplomatura o el grado en Educación Social, o la habilitación de un colegio profesional de educadores sociales. El programa tiene 60 temas en cuatro partes: materias generales, gestión y ofimática, servicios sociales (ley aragonesa, servicios comunitarios, adicciones, pobreza, violencia contra las mujeres, infancia y absentismo escolar) y educación social (ética, proyecto socioeducativo, evaluación, entrevista, desarrollo evolutivo, familia, discapacidad y comunidad). El examen es un test y un supuesto práctico el mismo día y, después, la exposición oral de dos temas.",
  },
  convocatoria: {
    oposicion_slug: SLUG,
    numero: "CONV 2/2026",
    organismo: "Ayuntamiento de Zaragoza",
    plaza: "Educador/a Social — Escala de Administración Especial, Subescala Técnica, clase Media (subgrupo A2)",
    fecha_decreto: "BOPZ núm. 170, de 27 de julio de 2026",
    sistema_seleccion: "Oposición, turno libre, seguida de un periodo de prácticas",
    requisito_titulacion: "Título universitario oficial de Diplomado o Grado en Educación Social, o encontrarse en alguno de los supuestos de la disposición transitoria tercera de la Ley 9/2005, de creación del Colegio Profesional de Educadores Sociales de Aragón, o estar habilitado por alguno de los Colegios Profesionales de Educadores.",
    plazo_instancias:
      "20 días naturales desde el día siguiente a la publicación del extracto en el BOE (BOE-A-2026-19150, 14 de septiembre de 2026): del 15 de septiembre al 5 de octubre de 2026 (plazo ya cerrado).",
    duracion_maxima_proceso: "Seis meses desde la celebración del primer ejercicio (bases específicas).",
    orden_actuacion: "Comienza por las personas cuyo primer apellido empiece por la letra «V» (base 3.5).",
    plazas_total: 9,
    desglose_plazas: [
      { turno: "Turno libre ordinario", cantidad: 8 },
      { turno: "Reserva para personas con discapacidad", cantidad: 1 },
    ],
    aspirantes_que_pasan_fase: [
      { fase: "Primera prueba (máximo que pasa a la corrección del supuesto práctico)", cantidad: "90 personas: 80 del turno libre ordinario y 10 de discapacidad" },
    ],
    enlaces_oficiales: [
      { titulo: "Bases específicas CONV 2/2026 (BOPZ núm. 170, 27 de julio de 2026)", url: "https://www.zaragoza.es/cont/paginas/oferta/archivos/bases/bases2097.pdf" },
      { titulo: "Texto refundido de las bases generales del turno libre (TRBGTL)", url: "https://www.zaragoza.es/contenidos/oferta/bases_turno_libre.pdf" },
      { titulo: "Ficha del proceso en el portal de empleo del Ayuntamiento", url: "https://www.zaragoza.es/oferta/ofertaDetalle.jsp?id=2097" },
    ],
    ultima_actualizacion: "28 de octubre de 2026",
    pruebas: [
      {
        id: "primer-ejercicio-test", icono: "📝", numero: 1,
        nombre: "Primer ejercicio, primera prueba (test)",
        formato: "Test sobre todo el temario",
        duracion: "1 hora y 9 minutos",
        opciones: "64 preguntas + 5 de reserva, 4 alternativas",
        detalle: "Se califica de 0 a 10 y hay que sacar al menos un 5. Cada error descuenta un cuarto del valor de un acierto; las preguntas en blanco no penalizan. Solo pasan las mejores notas, hasta un máximo de 90 personas.",
      },
      {
        id: "primer-ejercicio-practico", icono: "📋", numero: 2,
        nombre: "Primer ejercicio, segunda prueba (supuesto práctico)",
        formato: "Resolución de un supuesto práctico por escrito",
        duracion: "1 hora y 30 minutos",
        opciones: "Material permitido según indique el tribunal",
        detalle: "Se hace el mismo día, justo después del test. Se califica de 0 a 10 y hay que sacar al menos un 5. Las dos pruebas forman un ejercicio de 0 a 20 puntos.",
      },
      {
        id: "segundo-ejercicio", icono: "🎤", numero: 3,
        nombre: "Segundo ejercicio (oral)",
        formato: "Exposición de dos temas en sesión pública",
        duracion: "20 minutos como máximo",
        opciones: "Un tema al azar de la parte tercera y otro de la cuarta",
        detalle: "Se puede rechazar uno de los temas extraídos y sacar otro. Cada tema debe durar al menos cinco minutos. Se califica de 0 a 10 y hay que sacar al menos un 5.",
      },
    ],
    estado: "cerrada",
    plazo_fin: "2026-10-05",
  },
});
