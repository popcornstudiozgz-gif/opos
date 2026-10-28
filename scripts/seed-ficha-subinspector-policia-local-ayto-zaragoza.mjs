/**
 * Ficha (sin material de estudio) de Subinspector/a de la Policía Local del
 * Ayuntamiento de Zaragoza: Escala de Administración Especial, Subescala de
 * Servicios Especiales, clase Policía Local (A2), turno libre.
 *
 * Fuentes primarias leídas íntegras en la sesión:
 * - Bases específicas CONV 6/2026 (bases2105.pdf; BOPZ núm. 170, de
 *   27-07-2026): 11 plazas de las OEP 2024, 2025 y 2026 (9 TLO, 1 TLO de
 *   ampliación y 1 TLRTERR), base 1.5 (curso de formación selectivo), 1.6
 *   (estructura de la base 8.4.B de las bases generales), 2.1 (nacionalidad
 *   española, diplomatura o grado, compromiso de portar armas, permisos A y
 *   B), 3.5 (letra «V») y anexo I (60 temas en tres partes).
 * - Rectificación de las bases (BOPZ núm. 196, de 27-08-2026, edicto 5774):
 *   también exime de las pruebas físicas el CAF oro o plata de la
 *   convocatoria ordinaria de 2025.
 * - BOE núm. 227, de 14-09-2026 (BOE-A-2026-19150, extracto de varias
 *   convocatorias municipales): plazo del 15-09-2026 al 05-10-2026 según la
 *   ficha oficial (zaragoza.es/oferta, id 2105).
 * - Texto refundido de las bases generales del turno libre (TRBGTL), base
 *   8.4.B: cuatro ejercicios (oral de dos temas, seis pruebas físicas,
 *   psicotécnico y supuesto práctico escrito), con las marcas y
 *   calificaciones que se recogen abajo.
 *
 * Uso: node --env-file=.env.local scripts/seed-ficha-subinspector-policia-local-ayto-zaragoza.mjs
 */
import { sembrarFicha } from "./lib/sembrar-ficha.mjs";

const SLUG = "subinspector-policia-local-ayto-zaragoza";

await sembrarFicha({
  oposicion: {
    slug: SLUG,
    nombre: "Subinspector/a de Policía Local",
    organismo: "Ayuntamiento de Zaragoza",
    organismo_slug: "ayuntamiento-zaragoza",
    puesto_slug: "subinspector-policia-local",
    descripcion_corta: "Oposición de Subinspector/a de la Policía Local (A2) del Ayuntamiento de Zaragoza, por turno libre: plazas, requisitos, examen y temario oficial.",
    descripcion_larga: "Plazas de mando de la Policía Local de Zaragoza (subgrupo A2) a las que se accede por turno libre, sin haber sido antes policía. Se exige nacionalidad española, una diplomatura o un grado, los permisos de conducir A y B y el compromiso de portar armas. El programa tiene 60 temas en tres partes: materias generales y municipales; mando, liderazgo, intervención y servicio policial; y derecho penal y procesal, seguridad ciudadana, tráfico y ordenanzas de Zaragoza. La oposición tiene cuatro ejercicios —exposición oral de dos temas, pruebas físicas, psicotécnico y un supuesto práctico— y después un curso de formación.",
  },
  convocatoria: {
    oposicion_slug: SLUG,
    numero: "CONV 6/2026",
    organismo: "Ayuntamiento de Zaragoza",
    plaza: "Subinspector/a de la Policía Local — Escala de Administración Especial, Subescala de Servicios Especiales, clase Policía Local (subgrupo A2)",
    fecha_decreto: "BOPZ núm. 170, de 27 de julio de 2026 (rectificadas en el BOPZ núm. 196, de 27 de agosto de 2026)",
    sistema_seleccion: "Oposición, turno libre, seguida de un curso de formación selectivo y obligatorio",
    requisito_titulacion: "Diplomatura universitaria o título de Grado equivalente (o haber superado tres cursos completos de una licenciatura, arquitectura o ingeniería). Además: nacionalidad española, permisos de conducir de las clases A y B y compromiso escrito de portar armas.",
    plazo_instancias:
      "20 días naturales desde el día siguiente a la publicación del extracto en el BOE (BOE-A-2026-19150, 14 de septiembre de 2026): del 15 de septiembre al 5 de octubre de 2026 (plazo ya cerrado).",
    duracion_maxima_proceso: "Seis meses desde la celebración del primer ejercicio (base 1.10).",
    orden_actuacion: "Comienza por las personas cuyo primer apellido empiece por la letra «V» (base 3.5).",
    plazas_total: 11,
    desglose_plazas: [
      { turno: "Turno libre ordinario (incluida 1 plaza de ampliación)", cantidad: 10 },
      { turno: "Reserva para víctimas de terrorismo", cantidad: 1 },
    ],
    aspirantes_que_pasan_fase: [],
    enlaces_oficiales: [
      { titulo: "Bases específicas CONV 6/2026 (BOPZ núm. 170, 27 de julio de 2026)", url: "https://www.zaragoza.es/cont/paginas/oferta/archivos/bases/bases2105.pdf" },
      { titulo: "Rectificación de las bases (BOPZ núm. 196, 27 de agosto de 2026)", url: "https://www.zaragoza.es/cont/paginas/oferta/archivos/1%207%20BOP%20PUBLICACION%20RECTIFICACION%20BASES%20TL%20A2%20PLZ.pdf" },
      { titulo: "Texto refundido de las bases generales del turno libre (TRBGTL)", url: "https://www.zaragoza.es/contenidos/oferta/bases_turno_libre.pdf" },
      { titulo: "Ficha del proceso en el portal de empleo del Ayuntamiento", url: "https://www.zaragoza.es/oferta/ofertaDetalle.jsp?id=2105" },
    ],
    ultima_actualizacion: "28 de octubre de 2026",
    pruebas: [
      {
        id: "primer-ejercicio", icono: "🎤", numero: 1,
        nombre: "Primer ejercicio (oral)",
        formato: "Exposición de dos temas en sesión pública",
        duracion: "20 minutos como máximo (6 de preparación)",
        opciones: "Un tema al azar de las partes I y II y otro de la parte III",
        detalle: "Se puede rechazar uno de los temas extraídos y sacar otro de la misma parte. Cada tema debe durar al menos cinco minutos. Se califica de 0 a 10 y hay que sacar al menos un 5.",
      },
      {
        id: "pruebas-fisicas", icono: "🏃", numero: 2,
        nombre: "Segundo ejercicio (pruebas físicas)",
        formato: "Seis pruebas, apto o no apto",
        duracion: "Según el calendario del tribunal",
        opciones: "Hay que superar todas",
        detalle: "Trepa de cuerda de 5,25 m (hombres) o 4,25 m (mujeres) en 24 s; salto de altura de 85 o 70 cm; tres levantamientos de 37 o 27 kg; 50 m de natación en 46 o 53 s; salto de longitud de 4,00 o 3,20 m, y 1.500 m en 5:54 o 6:54. Hay que llevar certificado médico y puede haber control antidopaje. Están exentos los policías locales de Zaragoza en activo con el certificado de aptitud física (CAF) oro o plata.",
      },
      {
        id: "psicotecnico", icono: "🧠", numero: 3,
        nombre: "Tercer ejercicio (psicotécnico)",
        formato: "Prueba de aptitud psicotécnica y de personalidad",
        duracion: "La que fije el tribunal",
        opciones: "Apto o no apto",
        detalle: "Evalúa la capacidad intelectual general (razonamiento abstracto y verbal), la estabilidad emocional, la iniciativa, la responsabilidad, la sociabilidad y la colaboración, y descarta tendencias disfuncionales de personalidad.",
      },
      {
        id: "supuesto-practico", icono: "📋", numero: 4,
        nombre: "Cuarto ejercicio (supuesto práctico)",
        formato: "Resolución por escrito de un supuesto práctico",
        duracion: "1 hora y 30 minutos",
        opciones: "Material permitido según indique el tribunal",
        detalle: "Sobre las funciones del puesto y el temario. El tribunal puede pedir que se lea en sesión pública. Se califica de 0 a 10 y hay que sacar al menos un 5.",
      },
    ],
    estado: "cerrada",
    plazo_fin: "2026-10-05",
  },
});
