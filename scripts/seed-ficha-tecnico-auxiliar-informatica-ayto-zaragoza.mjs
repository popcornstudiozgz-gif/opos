/**
 * Ficha (sin material de estudio) de Técnica/o Auxiliar Informática/o del
 * Ayuntamiento de Zaragoza: Escala de Administración Especial, Subescala
 * Técnica, clase Cometidos Especiales (C1), turno libre.
 *
 * Fuentes primarias leídas íntegras en la sesión:
 * - Bases específicas CONV 3/2026 (bases2137.pdf = bases2103.pdf, mismo
 *   documento; BOPZ núm. 170, de 27-07-2026), que convocan varias plazas C1:
 *   base 1.4 (10 plazas de la OEP 2026: 8 TLO, 1 TLRDIS y 1 TLRINTEL), 1.8
 *   (estructura de la base 7.4.C.1 de las bases generales), 3.5 (letra
 *   «V»), quinta (220 aspirantes como máximo superan el primer ejercicio:
 *   176 TLO, 22 TLRDIS y 22 TLRINTEL) y anexo I (programa de 40 temas: 8 de
 *   la parte primera y 32 de la segunda).
 * - BOE-A-2026-19150 (BOE de 14-09-2026): extracto; plazo del 15-09-2026 al
 *   05-10-2026 según la ficha oficial (zaragoza.es/oferta, id 2137).
 * - Texto refundido de las bases generales del turno libre (TRBGTL), base
 *   7.4.C.1: los dos ejercicios el mismo día; test de 50 + 5 preguntas de
 *   tres alternativas en 55 minutos y cinco supuestos de cinco preguntas de
 *   cuatro alternativas en 35 minutos; ambos de 0 a 10 con mínimo 5 y
 *   descuento por error de un cuarto del valor de un acierto.
 *
 * Uso: node --env-file=.env.local scripts/seed-ficha-tecnico-auxiliar-informatica-ayto-zaragoza.mjs
 */
import { sembrarFicha } from "./lib/sembrar-ficha.mjs";

const SLUG = "tecnico-auxiliar-informatica-ayto-zaragoza";

await sembrarFicha({
  oposicion: {
    slug: SLUG,
    nombre: "Técnica/o Auxiliar Informática/o",
    organismo: "Ayuntamiento de Zaragoza",
    organismo_slug: "ayuntamiento-zaragoza",
    puesto_slug: "tecnico-auxiliar-informatica",
    descripcion_corta: "Oposición de Técnica/o Auxiliar Informática/o (C1) del Ayuntamiento de Zaragoza: plazas, requisitos, examen y temario oficial.",
    descripcion_larga: "Plazas de funcionario de la Escala de Administración Especial, Subescala Técnica, clase Cometidos Especiales (subgrupo C1), del Ayuntamiento de Zaragoza. Se exige Bachiller, Técnico o equivalente. El programa tiene 40 temas —8 comunes y 32 de informática: hardware, redes locales, Windows y GNU/Linux, TCP/IP, CPD, servidores web, bases de datos, arquitecturas y lenguajes de programación, aplicaciones web, administración y firma electrónica, y Esquema Nacional de Seguridad—, y el examen son dos test el mismo día.",
  },
  convocatoria: {
    oposicion_slug: SLUG,
    numero: "CONV 3/2026",
    organismo: "Ayuntamiento de Zaragoza",
    plaza: "Técnica/o Auxiliar Informática/o — Escala de Administración Especial, Subescala Técnica, clase Cometidos Especiales (subgrupo C1)",
    fecha_decreto: "BOPZ núm. 170, de 27 de julio de 2026",
    sistema_seleccion: "Oposición, turno libre, seguida de un periodo de prácticas",
    requisito_titulacion: "Bachiller, Técnica/o o equivalente.",
    plazo_instancias:
      "20 días naturales desde el día siguiente a la publicación del extracto en el BOE (BOE-A-2026-19150, 14 de septiembre de 2026): del 15 de septiembre al 5 de octubre de 2026 (plazo ya cerrado).",
    duracion_maxima_proceso: "Seis meses desde la celebración del primer ejercicio (bases específicas).",
    orden_actuacion: "Comienza por las personas cuyo primer apellido empiece por la letra «V» (base 3.5).",
    plazas_total: 10,
    desglose_plazas: [
      { turno: "Turno libre ordinario", cantidad: 8 },
      { turno: "Reserva para personas con discapacidad", cantidad: 1 },
      { turno: "Reserva para personas con discapacidad intelectual", cantidad: 1 },
    ],
    aspirantes_que_pasan_fase: [
      { fase: "Primer ejercicio (máximo que pasa a la corrección del segundo)", cantidad: "220 personas: 176 del turno libre ordinario, 22 de discapacidad y 22 de discapacidad intelectual" },
    ],
    enlaces_oficiales: [
      { titulo: "Bases específicas CONV 3/2026 (BOPZ núm. 170, 27 de julio de 2026)", url: "https://www.zaragoza.es/cont/paginas/oferta/archivos/bases/bases2137.pdf" },
      { titulo: "Texto refundido de las bases generales del turno libre (TRBGTL)", url: "https://www.zaragoza.es/contenidos/oferta/bases_turno_libre.pdf" },
      { titulo: "Ficha del proceso en el portal de empleo del Ayuntamiento", url: "https://www.zaragoza.es/oferta/ofertaDetalle.jsp?id=2137" },
    ],
    ultima_actualizacion: "27 de octubre de 2026",
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
