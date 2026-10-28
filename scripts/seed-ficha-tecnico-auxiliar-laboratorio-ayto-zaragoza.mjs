/**
 * Ficha (sin material de estudio) de Técnica/o Auxiliar de Laboratorio del
 * Ayuntamiento de Zaragoza: Escala de Administración Especial, Subescala
 * Técnica, Técnicos Auxiliares (C1), turno libre.
 *
 * Fuentes primarias leídas íntegras en la sesión:
 * - Bases específicas CONV 3/2026 (bases2101.pdf, mismo documento que
 *   bases2100/2103/2137; BOPZ núm. 170, de 27-07-2026): base 1.4 (6 plazas
 *   de las OEP 2024, 2025 y 2026: 5 TLO y 1 TLRDIS), 1.8 (estructura de la
 *   base 7.4.C.1 de las bases generales), 2.2.1 (titulación), 3.5 (letra
 *   «V»), quinta (150 aspirantes como máximo superan el primer ejercicio: 125
 *   TLO y 25 TLRDIS) y anexo I (programa de 40 temas: 8 de la parte primera
 *   y 32 de la segunda). La rectificación del BOPZ núm. 196 (27-08-2026) no
 *   afecta a esta categoría.
 * - BOE núm. 227, de 14-09-2026 (BOE-A-2026-19150): plazo del 15-09-2026 al
 *   05-10-2026 según la ficha oficial (zaragoza.es/oferta, id 2101).
 * - TRBGTL, base 7.4.C.1: mismos dos ejercicios que Técnico Auxiliar de
 *   Informática (ver seed-ficha-tecnico-auxiliar-informatica-ayto-zaragoza.mjs).
 *
 * Uso: node --env-file=.env.local scripts/seed-ficha-tecnico-auxiliar-laboratorio-ayto-zaragoza.mjs
 */
import { sembrarFicha } from "./lib/sembrar-ficha.mjs";

const SLUG = "tecnico-auxiliar-laboratorio-ayto-zaragoza";

await sembrarFicha({
  oposicion: {
    slug: SLUG,
    nombre: "Técnica/o Auxiliar de Laboratorio",
    organismo: "Ayuntamiento de Zaragoza",
    organismo_slug: "ayuntamiento-zaragoza",
    puesto_slug: "tecnico-auxiliar-laboratorio",
    descripcion_corta: "Oposición de Técnica/o Auxiliar de Laboratorio (C1) del Ayuntamiento de Zaragoza: plazas, requisitos, examen y temario oficial.",
    descripcion_larga: "Plazas de funcionario de la Escala de Administración Especial, Subescala Técnica, Técnicos Auxiliares (subgrupo C1), del Ayuntamiento de Zaragoza. Se exige un título de técnico de las ramas de química o sanidad, o el Bachiller. El programa tiene 40 temas —8 comunes y 32 específicos de laboratorio: seguridad y equipos en microbiología, medios de cultivo y microorganismos, análisis bacteriológico y fisicoquímico del agua, gravimetría, electrodos, espectroscopía, cromatografía, toma de muestras, control de calidad y acreditación ISO 17025—, y el examen son dos test el mismo día.",
  },
  convocatoria: {
    oposicion_slug: SLUG,
    numero: "CONV 3/2026",
    organismo: "Ayuntamiento de Zaragoza",
    plaza: "Técnica/o Auxiliar de Laboratorio — Escala de Administración Especial, Subescala Técnica, Técnicos Auxiliares (subgrupo C1)",
    fecha_decreto: "BOPZ núm. 170, de 27 de julio de 2026",
    sistema_seleccion: "Oposición, turno libre, seguida de un periodo de prácticas",
    requisito_titulacion: "Título oficial de Técnica/o de la rama profesional de química o sanidad, o Bachiller, o equivalente.",
    plazo_instancias:
      "20 días naturales desde el día siguiente a la publicación del extracto en el BOE (BOE-A-2026-19150, 14 de septiembre de 2026): del 15 de septiembre al 5 de octubre de 2026 (plazo ya cerrado).",
    duracion_maxima_proceso: "Seis meses desde la celebración del primer ejercicio (bases específicas).",
    orden_actuacion: "Comienza por las personas cuyo primer apellido empiece por la letra «V» (base 3.5).",
    plazas_total: 6,
    desglose_plazas: [
      { turno: "Turno libre ordinario", cantidad: 5 },
      { turno: "Reserva para personas con discapacidad", cantidad: 1 },
    ],
    aspirantes_que_pasan_fase: [
      { fase: "Primer ejercicio (máximo que pasa a la corrección del segundo)", cantidad: "150 personas: 125 del turno libre ordinario y 25 de discapacidad" },
    ],
    enlaces_oficiales: [
      { titulo: "Bases específicas CONV 3/2026 (BOPZ núm. 170, 27 de julio de 2026)", url: "https://www.zaragoza.es/cont/paginas/oferta/archivos/bases/bases2101.pdf" },
      { titulo: "Texto refundido de las bases generales del turno libre (TRBGTL)", url: "https://www.zaragoza.es/contenidos/oferta/bases_turno_libre.pdf" },
      { titulo: "Ficha del proceso en el portal de empleo del Ayuntamiento", url: "https://www.zaragoza.es/oferta/ofertaDetalle.jsp?id=2101" },
    ],
    ultima_actualizacion: "28 de octubre de 2026",
    pruebas: [
      {
        id: "primer-ejercicio", icono: "📝", numero: 1,
        nombre: "Primer ejercicio (test)",
        formato: "Test sobre todo el temario",
        duracion: "55 minutos",
        opciones: "50 preguntas + 5 de reserva, 3 alternativas",
        detalle: "Se califica de 0 a 10 y hay que sacar al menos un 5. Cada error descuenta un cuarto del valor de un acierto; las preguntas en blanco no penalizan. El tribunal fija una nota de corte para que solo pasen las mejores notas.",
      },
      {
        id: "segundo-ejercicio", icono: "📋", numero: 2,
        nombre: "Segundo ejercicio (supuestos)",
        formato: "Cinco supuestos teórico-prácticos con cinco preguntas cada uno",
        duracion: "35 minutos",
        opciones: "25 preguntas, 4 alternativas",
        detalle: "Se hace el mismo día, a continuación del primero, y solo se corrige a quien lo haya superado. Se califica de 0 a 10 y hay que sacar al menos un 5, con la misma penalización por error.",
      },
    ],
    estado: "cerrada",
    plazo_fin: "2026-10-05",
  },
});
