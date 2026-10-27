/**
 * Ficha (sin material de estudio) de Técnica/o Auxiliar de Emergencias
 * Sanitarias del Ayuntamiento de Zaragoza: Escala de Administración
 * Especial, Subescala Técnica, Técnicos Auxiliares (C1), turno libre.
 *
 * Fuentes primarias leídas íntegras en la sesión:
 * - Bases específicas CONV 3/2026 (bases2103.pdf; BOPZ núm. 170, de
 *   27-07-2026): base 1.4 (7 plazas de la OEP 2026: 6 TLO y 1 TLRVGEN), 1.8
 *   (prueba adicional de pruebas físicas, anexo III), 2.2.5 (titulación y
 *   permiso C), 3.5 (letra «V»), quinta (168 aspirantes como máximo superan
 *   el primer ejercicio: 144 TLO y 24 TLRVGEN), anexo I (programa de 40
 *   temas) y anexo III (cinco pruebas físicas: trepa de cuerda, subida a la
 *   torre con 15 kg, 1.000 m, desplazamiento de maniquí de 25 kg y 100 m de
 *   natación; 0-2 puntos cada una, total 10, mínimo 5, un máximo de dos
 *   ceros).
 * - **Rectificación** de las bases (BOPZ núm. 196, de 27-08-2026, edicto
 *   5770): añade a la base sexta una estructura propia para esta plaza:
 *   primer ejercicio con dos pruebas (test de 50 + 5 preguntas de tres
 *   alternativas en 55 minutos, de 0 a 7 y mínimo 3,5; y cuestionario de
 *   conocimiento del municipio de 50 + 5 preguntas en 30 minutos, de 0 a 3
 *   y mínimo 1,5, sobre parques de bomberos, malla básica y viales del
 *   anexo III, polígonos, juntas, hospitales y otros puntos), y segundo
 *   ejercicio de cinco supuestos con cinco preguntas en 35 minutos.
 * - BOE-A-2026-19150 (BOE de 14-09-2026): extracto; plazo del 15-09-2026 al
 *   05-10-2026 según la ficha oficial (zaragoza.es/oferta, id 2103).
 *
 * Uso: node --env-file=.env.local scripts/seed-ficha-tecnico-auxiliar-emergencias-sanitarias-ayto-zaragoza.mjs
 */
import { sembrarFicha } from "./lib/sembrar-ficha.mjs";

const SLUG = "tecnico-auxiliar-emergencias-sanitarias-ayto-zaragoza";

await sembrarFicha({
  oposicion: {
    slug: SLUG,
    nombre: "Técnica/o Auxiliar de Emergencias Sanitarias",
    organismo: "Ayuntamiento de Zaragoza",
    organismo_slug: "ayuntamiento-zaragoza",
    puesto_slug: "tecnico-auxiliar-emergencias-sanitarias",
    descripcion_corta: "Oposición de Técnica/o Auxiliar de Emergencias Sanitarias (C1) del Ayuntamiento de Zaragoza: plazas, requisitos, examen, pruebas físicas y temario oficial.",
    descripcion_larga: "Plazas de funcionario de la Escala de Administración Especial, Subescala Técnica, Técnicos Auxiliares (subgrupo C1), del Ayuntamiento de Zaragoza. Se exige el título de Técnico en Emergencias Sanitarias (o la habilitación de conductor de ambulancias asistenciales con Bachiller o Técnico) y, en todo caso, el permiso de conducir C. El programa tiene 40 temas —8 comunes y 32 específicos: anatomía y fisiología, soporte vital, traumatismos e inmovilización, transferencia del paciente, oxigenoterapia y medicación, patologías urgentes, incidentes con múltiples víctimas y dispositivos de riesgos previsibles—. El examen incluye un test, un cuestionario sobre el callejero de Zaragoza, cinco supuestos prácticos y pruebas físicas.",
  },
  convocatoria: {
    oposicion_slug: SLUG,
    numero: "CONV 3/2026",
    organismo: "Ayuntamiento de Zaragoza",
    plaza: "Técnica/o Auxiliar de Emergencias Sanitarias — Escala de Administración Especial, Subescala Técnica, Técnicos Auxiliares (subgrupo C1)",
    fecha_decreto: "BOPZ núm. 170, de 27 de julio de 2026 (rectificadas en el BOPZ núm. 196, de 27 de agosto de 2026)",
    sistema_seleccion: "Oposición, turno libre, con prueba adicional de aptitud física, seguida de un periodo de prácticas",
    requisito_titulacion: "Título oficial de Técnica/o en Emergencias Sanitarias (Real Decreto 1397/2007), o habilitación de conductor/a de ambulancias asistenciales de clase C según la disposición transitoria segunda del Real Decreto 836/2012 junto con el título de Bachiller, Técnica/o o equivalente. En todo caso, permiso de conducir de clase C.",
    plazo_instancias:
      "20 días naturales desde el día siguiente a la publicación del extracto en el BOE (BOE-A-2026-19150, 14 de septiembre de 2026): del 15 de septiembre al 5 de octubre de 2026 (plazo ya cerrado).",
    duracion_maxima_proceso: "Seis meses desde la celebración del primer ejercicio (bases específicas).",
    orden_actuacion: "Comienza por las personas cuyo primer apellido empiece por la letra «V» (base 3.5).",
    plazas_total: 7,
    desglose_plazas: [
      { turno: "Turno libre ordinario", cantidad: 6 },
      { turno: "Reserva para mujeres víctimas de violencia de género", cantidad: 1 },
    ],
    aspirantes_que_pasan_fase: [
      { fase: "Primer ejercicio (máximo que pasa a la corrección del segundo)", cantidad: "168 personas: 144 del turno libre ordinario y 24 de la reserva" },
    ],
    enlaces_oficiales: [
      { titulo: "Bases específicas CONV 3/2026 (BOPZ núm. 170, 27 de julio de 2026)", url: "https://www.zaragoza.es/cont/paginas/oferta/archivos/bases/bases2103.pdf" },
      { titulo: "Rectificación de las bases (BOPZ núm. 196, 27 de agosto de 2026)", url: "https://www.zaragoza.es/cont/paginas/oferta/archivos/1%207%20BOP%20PUBLICACION%20RECTIFICACION%20BASES%20TL%20C1.pdf" },
      { titulo: "Ficha del proceso en el portal de empleo del Ayuntamiento", url: "https://www.zaragoza.es/oferta/ofertaDetalle.jsp?id=2103" },
    ],
    ultima_actualizacion: "27 de octubre de 2026",
    pruebas: [
      {
        id: "primer-ejercicio-test", icono: "📝", numero: 1,
        nombre: "Primer ejercicio, primera prueba (test)",
        formato: "Test sobre el temario",
        duracion: "55 minutos",
        opciones: "50 preguntas + 5 de reserva, 3 alternativas",
        detalle: "Se califica de 0 a 7 puntos (0,140 por acierto y −0,035 por error; en blanco no penaliza) y hay que sacar al menos 3,5. Quien no la supera no pasa a corrección de la segunda prueba.",
      },
      {
        id: "primer-ejercicio-municipio", icono: "🗺️", numero: 2,
        nombre: "Primer ejercicio, segunda prueba (conocimiento del municipio)",
        formato: "Test sobre ubicaciones y recorridos en Zaragoza",
        duracion: "30 minutos",
        opciones: "50 preguntas + 5 de reserva, 3 alternativas",
        detalle: "Sobre los cuatro parques de bomberos, la malla básica y los viales y polígonos del anexo III, las sedes de juntas, los hospitales y otros puntos como el aeropuerto o la estación Delicias. De 0 a 3 puntos (0,060 por acierto y −0,015 por error), mínimo 1,5. El primer ejercicio suma las dos pruebas (0-10) y el tribunal fija una nota de corte no inferior a 5.",
      },
      {
        id: "segundo-ejercicio", icono: "📋", numero: 3,
        nombre: "Segundo ejercicio (supuestos)",
        formato: "Cinco supuestos teórico-prácticos con cinco preguntas cada uno",
        duracion: "35 minutos",
        opciones: "25 preguntas, 4 alternativas",
        detalle: "Mismo día, a continuación del primero, y solo se corrige a quien lo haya superado. Se califica según las bases generales.",
      },
      {
        id: "pruebas-fisicas", icono: "🏃", numero: 4,
        nombre: "Prueba adicional (pruebas físicas)",
        formato: "Cinco pruebas físicas",
        duracion: "Según convoque el tribunal",
        opciones: "0, 1 o 2 puntos por prueba; total de 0 a 10",
        detalle: "Trepa de cuerda lisa, subida a la torre de maniobras con mochila de 15 kg, 1.000 metros lisos, desplazamiento de un maniquí de 25 kg y 100 metros de natación. Hay que sumar al menos 5 puntos y se admiten como máximo dos pruebas con cero; la nota se suma a la del proceso.",
      },
    ],
    estado: "cerrada",
    plazo_fin: "2026-10-05",
  },
});
