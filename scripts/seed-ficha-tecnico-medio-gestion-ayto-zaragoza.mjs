/**
 * Ficha (sin material de estudio) de Técnica/o Medio de Gestión del
 * Ayuntamiento de Zaragoza: Escala de Administración General, Subescala de
 * Gestión (A2), turno libre.
 *
 * Fuentes primarias leídas íntegras en la sesión:
 * - Bases específicas del proceso de la OEP 2025 (bases1680.pdf; BOPZ núm.
 *   147, de 30-06-2025), que convocan varias plazas A2: base 1.4 (8 plazas:
 *   6 TLO, 1 TLO de ampliación y 1 TLRDIS), 2.2.1 (Diplomatura o Grado),
 *   3.5 (letra «V»), quinta (80 aspirantes como máximo superan la primera
 *   prueba del primer ejercicio: 70 TLO y 10 TLRDIS) y anexo I (programa
 *   de 60 temas en cuatro partes).
 * - Ficha oficial del proceso (zaragoza.es/oferta, id 1680): extracto en el
 *   BOE núm. 257, de 25-10-2025; plazo hasta el 14-11-2025; calificaciones
 *   finales y propuesta de nombramiento publicadas el 09-10-2026 (proceso
 *   terminado).
 * - Texto refundido de las bases generales del turno libre (TRBGTL), base
 *   7.4.B.1, en su versión publicada hoy en zaragoza.es: primer ejercicio
 *   con dos pruebas el mismo día (test de 64 + 5 preguntas en 1 h 9 min y un
 *   supuesto práctico en 1 h 30 min) y oral de dos temas (partes 3.ª y 4.ª)
 *   en 20 minutos. La estructura coincide con los anuncios del proceso id
 *   1680 (primera y segunda prueba del primer ejercicio, segundo ejercicio).
 * - Oferta de Empleo Público 2026 (BOPZ núm. 162, de 17-07-2026), anexo I:
 *   9 plazas de turno libre (1 de ampliación, 1 TLRDIS), aún sin bases
 *   (ficha id 2080). El estado de la ficha es «pendiente de publicación»
 *   por eso, siguiendo el precedente de Oficial Fontanero: los datos de
 *   estructura y temario son los del proceso de 2025.
 *
 * Uso: node --env-file=.env.local scripts/seed-ficha-tecnico-medio-gestion-ayto-zaragoza.mjs
 */
import { sembrarFicha } from "./lib/sembrar-ficha.mjs";

const SLUG = "tecnico-medio-gestion-ayto-zaragoza";

await sembrarFicha({
  oposicion: {
    slug: SLUG,
    nombre: "Técnica/o Medio de Gestión",
    organismo: "Ayuntamiento de Zaragoza",
    organismo_slug: "ayuntamiento-zaragoza",
    puesto_slug: "tecnico-medio-gestion",
    descripcion_corta: "Oposición de Técnica/o Medio de Gestión (A2) del Ayuntamiento de Zaragoza: plazas, requisitos, examen y temario oficial.",
    descripcion_larga: "Plazas de funcionario de la Escala de Administración General, Subescala de Gestión (subgrupo A2), del Ayuntamiento de Zaragoza. Se exige una diplomatura o un grado. El programa tiene 60 temas en cuatro partes —Constitución, igualdad, Estatuto de Aragón, régimen local y empleo público; administración electrónica, calidad y ofimática; procedimiento administrativo, recursos, potestad sancionadora y contratación; personal, Seguridad Social, competencias municipales, hacienda local y urbanismo—, y la oposición tiene dos ejercicios: un test seguido de un supuesto práctico el mismo día, y un oral de dos temas.",
  },
  convocatoria: {
    oposicion_slug: SLUG,
    numero: "OEP 2026 (9 plazas, sin convocar)",
    organismo: "Ayuntamiento de Zaragoza",
    plaza: "Técnica/o Medio de Gestión — Escala de Administración General, Subescala de Gestión (subgrupo A2)",
    fecha_decreto: "pendiente de publicación (la última convocatoria se publicó en el BOPZ núm. 147, de 30 de junio de 2025)",
    sistema_seleccion: "Oposición, turno libre, seguida de un periodo de prácticas",
    requisito_titulacion: "Diplomada/o Universitario o Título de Grado equivalente.",
    plazo_instancias:
      "Pendiente: la Oferta de Empleo Público de 2026 incluye 9 plazas, pero sus bases todavía no se han publicado. En el último proceso (OEP 2025, 8 plazas, ya terminado) el plazo fue de 20 días naturales desde el extracto en el BOE (BOE núm. 257, de 25 de octubre de 2025) y acabó el 14 de noviembre de 2025.",
    duracion_maxima_proceso: "Pendiente de las bases de 2026. En el proceso de 2025 se fijaron seis meses desde el primer ejercicio.",
    orden_actuacion: "Pendiente de las bases de 2026 (en el proceso de 2025 empezó por la letra «V»).",
    plazas_total: 9,
    desglose_plazas: [
      { turno: "Turno libre ordinario (incluida 1 de ampliación)", cantidad: 8 },
      { turno: "Reserva para personas con discapacidad", cantidad: 1 },
    ],
    aspirantes_que_pasan_fase: [
      { fase: "Primera prueba del primer ejercicio (máximo que pasa, proceso de 2025)", cantidad: "80 personas: 70 del turno libre ordinario y 10 de la reserva por discapacidad" },
    ],
    enlaces_oficiales: [
      { titulo: "Ficha del proceso 2026 en el portal de empleo del Ayuntamiento", url: "https://www.zaragoza.es/oferta/ofertaDetalle.jsp?id=2080" },
      { titulo: "Bases del último proceso, OEP 2025 (BOPZ núm. 147, 30 de junio de 2025)", url: "https://www.zaragoza.es/cont/paginas/oferta/archivos/bases/bases1680.pdf" },
      { titulo: "Ficha del proceso de 2025", url: "https://www.zaragoza.es/oferta/ofertaDetalle.jsp?id=1680" },
      { titulo: "Texto refundido de las bases generales del turno libre (TRBGTL)", url: "https://www.zaragoza.es/contenidos/oferta/bases_turno_libre.pdf" },
      { titulo: "Oferta de Empleo Público 2026 (BOPZ núm. 162, 17 de julio de 2026)", url: "https://bop.dpz.es/BOPZ/UploadServlet?ruta=Boletines%5C2026%5C162%5CEdictos%5Cbop_4881_2026.pdf" },
    ],
    ultima_actualizacion: "27 de octubre de 2026",
    pruebas: [
      {
        id: "primer-ejercicio-test", icono: "📝", numero: 1,
        nombre: "Primer ejercicio, primera prueba (test)",
        formato: "Test sobre todo el temario",
        duracion: "1 hora y 9 minutos",
        opciones: "64 preguntas + 5 de reserva, 4 alternativas",
        detalle: "Se califica de 0 a 10 y hay que sacar al menos un 5. Cada error descuenta un cuarto del valor de un acierto; las preguntas en blanco no penalizan. Solo pasan las mejores notas, hasta el máximo que fijen las bases (80 en 2025).",
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
        duracion: "20 minutos como máximo (6 de preparación)",
        opciones: "Un tema al azar de la parte tercera y otro de la cuarta",
        detalle: "Se puede rechazar uno de los temas extraídos y sacar otro. Cada tema debe durar al menos cinco minutos. Se califica de 0 a 10 y hay que sacar al menos un 5.",
      },
    ],
    estado: "pendiente_publicacion",
    plazo_fin: null,
  },
});
