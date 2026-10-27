/**
 * Ficha (sin material de estudio) de Técnica/o de Administración General
 * (TAG) del Ayuntamiento de Zaragoza: Escala de Administración General,
 * Subescala Técnica (A1), turno libre.
 *
 * Fuentes primarias leídas íntegras en la sesión:
 * - Bases específicas CONV 1/2026 (bases1679.pdf; BOPZ núm. 170, de
 *   27-07-2026), que convocan varias plazas A1: base 1.4 (8 plazas de TAG de
 *   la OEP 2025: 6 TLO, 1 TLO de ampliación y 1 TLRDIS), 1.6 (oposición),
 *   1.7 (periodo de prácticas), 1.8 (estructura de la base 7.4.A de las
 *   bases generales), 1.12 (seis meses desde el primer ejercicio), 2.2.1
 *   (titulación), 3.3 (20 días naturales desde el extracto en el BOE), 3.5
 *   (letra «V»), quinta (80 aspirantes como máximo superan el primer
 *   ejercicio: 70 TLO y 10 TLRDIS) y anexo I (programa de 90 temas en
 *   cuatro partes).
 * - BOE-A-2026-19150 (BOE núm. 227, de 14-09-2026): extracto que abre el
 *   plazo, del 15-09-2026 al 05-10-2026 según la ficha oficial
 *   (zaragoza.es/oferta, id 1679).
 * - Texto refundido de las bases generales del turno libre (TRBGTL), base
 *   7.4.A: test de 80 + 5 preguntas en 1 h 25 min (cada error descuenta un
 *   cuarto del valor de un acierto); oral de tres temas (partes 2.ª, 3.ª y
 *   4.ª) en 30 minutos con 9 de preparación; práctico de dos supuestos en
 *   cuatro horas; los tres de 0 a 10, con un mínimo de 5.
 * - Oferta de Empleo Público 2026 (BOPZ núm. 162, de 17-07-2026), anexo I:
 *   13 plazas más de TAG (1 de ampliación, 1 TLRDIS), aún sin bases
 *   (ficha id 2079).
 * Nota: hay además un proceso anterior de 8 plazas (CONV 1bis/2025, OEP
 * 2023/24, id 1594) con el primer ejercicio celebrado en octubre de 2026;
 * comparte temario y estructura, pero la ficha refleja la convocatoria más
 * reciente.
 *
 * Uso: node --env-file=.env.local scripts/seed-ficha-tag-ayto-zaragoza.mjs
 */
import { sembrarFicha } from "./lib/sembrar-ficha.mjs";

const SLUG = "tag-ayto-zaragoza";

await sembrarFicha({
  oposicion: {
    slug: SLUG,
    nombre: "Técnica/o de Administración General (TAG)",
    organismo: "Ayuntamiento de Zaragoza",
    organismo_slug: "ayuntamiento-zaragoza",
    puesto_slug: "tecnico-administracion-general",
    descripcion_corta: "Oposición de Técnica/o de Administración General (TAG, A1) del Ayuntamiento de Zaragoza: plazas, requisitos, examen y temario oficial.",
    descripcion_larga: "Plazas de funcionario de la Escala de Administración General, Subescala Técnica (subgrupo A1), del Ayuntamiento de Zaragoza. Se exige licenciatura o grado en Derecho, Ciencias Políticas, Económicas o Empresariales, o equivalente. El programa tiene 90 temas en cuatro partes —derecho constitucional y de la Unión Europea, derecho administrativo, régimen local y hacienda local, y competencias municipales y urbanismo—, y la oposición tiene tres ejercicios: un test, un oral de tres temas y un práctico de dos supuestos.",
  },
  convocatoria: {
    oposicion_slug: SLUG,
    numero: "CONV 1/2026",
    organismo: "Ayuntamiento de Zaragoza",
    plaza: "Técnica/o de Administración General — Escala de Administración General, Subescala Técnica (subgrupo A1)",
    fecha_decreto: "BOPZ núm. 170, de 27 de julio de 2026",
    sistema_seleccion: "Oposición, turno libre, seguida de un periodo de prácticas",
    requisito_titulacion: "Título universitario oficial de Licenciada/o en Derecho, Ciencias Políticas, Económicas o Empresariales, Intendente Mercantil o Actuario, o sus equivalentes de Grado.",
    plazo_instancias:
      "20 días naturales desde el día siguiente a la publicación del extracto en el BOE (BOE-A-2026-19150, 14 de septiembre de 2026): del 15 de septiembre al 5 de octubre de 2026 (plazo ya cerrado). La Oferta de Empleo Público de 2026 prevé 13 plazas más de TAG, todavía sin convocar.",
    duracion_maxima_proceso: "Seis meses desde la celebración del primer ejercicio (base 1.12).",
    orden_actuacion: "Comienza por las personas cuyo primer apellido empiece por la letra «V» (base 3.5).",
    plazas_total: 8,
    desglose_plazas: [
      { turno: "Turno libre ordinario (incluida 1 de ampliación)", cantidad: 7 },
      { turno: "Reserva para personas con discapacidad", cantidad: 1 },
    ],
    aspirantes_que_pasan_fase: [
      { fase: "Primer ejercicio (máximo que pasa al oral)", cantidad: "80 personas: 70 del turno libre ordinario y 10 de la reserva por discapacidad" },
    ],
    enlaces_oficiales: [
      { titulo: "Bases específicas CONV 1/2026 (BOPZ núm. 170, 27 de julio de 2026)", url: "https://www.zaragoza.es/cont/paginas/oferta/archivos/bases/bases1679.pdf" },
      { titulo: "Texto refundido de las bases generales del turno libre (TRBGTL)", url: "https://www.zaragoza.es/contenidos/oferta/bases_turno_libre.pdf" },
      { titulo: "Ficha del proceso en el portal de empleo del Ayuntamiento", url: "https://www.zaragoza.es/oferta/ofertaDetalle.jsp?id=1679" },
      { titulo: "Oferta de Empleo Público 2026 (BOPZ núm. 162, 17 de julio de 2026)", url: "https://bop.dpz.es/BOPZ/UploadServlet?ruta=Boletines%5C2026%5C162%5CEdictos%5Cbop_4881_2026.pdf" },
    ],
    ultima_actualizacion: "27 de octubre de 2026",
    pruebas: [
      {
        id: "primer-ejercicio", icono: "📝", numero: 1,
        nombre: "Primer ejercicio (test)",
        formato: "Test sobre todo el temario",
        duracion: "1 hora y 25 minutos",
        opciones: "80 preguntas + 5 de reserva, 4 alternativas",
        detalle: "Se califica de 0 a 10 y hay que sacar al menos un 5. Cada error descuenta un cuarto del valor de un acierto; las preguntas en blanco no penalizan. Además, el tribunal fija una nota de corte para que solo pasen las 80 mejores notas.",
      },
      {
        id: "segundo-ejercicio", icono: "🎤", numero: 2,
        nombre: "Segundo ejercicio (oral)",
        formato: "Exposición de tres temas en sesión pública",
        duracion: "30 minutos como máximo (9 de preparación)",
        opciones: "Un tema al azar de cada una de las partes segunda, tercera y cuarta",
        detalle: "Se puede rechazar uno o dos de los temas extraídos y sacar otro. Cada tema debe durar al menos cinco minutos. Se califica de 0 a 10 y hay que sacar al menos un 5.",
      },
      {
        id: "tercer-ejercicio", icono: "📋", numero: 3,
        nombre: "Tercer ejercicio (práctico)",
        formato: "Resolución de dos supuestos prácticos por escrito",
        duracion: "4 horas",
        opciones: "Material permitido según indique el tribunal",
        detalle: "El tribunal puede acordar que se lea en sesión pública. Se califica de 0 a 10 y hay que sacar al menos un 5.",
      },
    ],
    estado: "cerrada",
    plazo_fin: "2026-10-05",
  },
});
