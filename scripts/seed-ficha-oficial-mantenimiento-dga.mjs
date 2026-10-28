/**
 * Ficha (sin material de estudio) de Oficial Primera Mantenimiento del
 * Gobierno de Aragón: personal laboral fijo, Grupo D, convocatoria 25/0145.
 * (Oficial Segunda Mantenimiento, con 6 plazas en la OEP 2026, no está entre
 * las categorías convocadas por las bases del Grupo D de mayo de 2026,
 * códigos 250143 a 250149; por eso la ficha es la de Oficial Primera.)
 *
 * Fuentes primarias leídas íntegras en la sesión:
 * - Resolución de 5 de mayo de 2026 del Director General de la Función
 *   Pública (BOA núm. 96, de 22-05-2026), Grupo D: mismas bases que
 *   Oficial Primera Conductor (ver seed-ficha-conductor-dga.mjs): test de
 *   100 preguntas (base 6.1) y prueba práctica (6.2) de la que eximen los
 *   títulos del anexo III o cinco años en la categoría; anexo I: 5 plazas de
 *   la OEP 2025; anexo II: 6 temas comunes del Grupo D + 12 específicos
 *   (apartado c).
 * - Ficha oficial 25/0145 en aplicaciones.aragon.es/oepc: plazo del
 *   25-05-2026 al 19-06-2026; 5 de turno libre.
 * - Decreto 11/2026 (OEP 2026), anexo II: 5 plazas más, sin convocar.
 *
 * Uso: node --env-file=.env.local scripts/seed-ficha-oficial-mantenimiento-dga.mjs
 */
import { sembrarFicha, DGA } from "./lib/sembrar-ficha.mjs";

const SLUG = "oficial-mantenimiento-dga";

await sembrarFicha({
  oposicion: {
    slug: SLUG,
    nombre: "Oficial Primera Mantenimiento",
    organismo: DGA.organismo,
    organismo_slug: DGA.organismo_slug,
    puesto_slug: "oficial-1-mantenimiento",
    descripcion_corta: "Oposición de Oficial Primera Mantenimiento (laboral fijo, Grupo D) del Gobierno de Aragón: plazas, requisitos, examen y temario oficial.",
    descripcion_larga: "Personal laboral fijo del Grupo D de la Administración de la Comunidad Autónoma de Aragón. Se exige el Graduado en ESO, Técnico o equivalente. El examen es un test de 100 preguntas sobre un programa de 18 temas —6 comunes y 12 específicos: planos y herramientas, albañilería, electricidad, fontanería y control de la legionela, carpintería, cerrajería, pintura, climatización y gas, ascensores, telecomunicaciones, emergencias y protección contra incendios—, seguido de una prueba práctica de la que quedan exentas las personas con alguno de los títulos de FP que fijan las bases.",
  },
  convocatoria: {
    oposicion_slug: SLUG,
    numero: "BOA 96/2026 (código 25/0145)",
    organismo: DGA.organismo,
    plaza: "Oficial Primera Mantenimiento — personal laboral fijo, Grupo D, de la Administración General de la Comunidad Autónoma de Aragón",
    fecha_decreto: "5 de mayo de 2026",
    sistema_seleccion: "Oposición, turno libre: un test eliminatorio y una prueba práctica de apto o no apto",
    requisito_titulacion: "Graduado en Educación Secundaria Obligatoria, Técnico o equivalente.",
    plazo_instancias:
      "20 días hábiles desde el día siguiente a la publicación en el BOA: del 25 de mayo al 19 de junio de 2026 (plazo ya cerrado). Solicitud electrónica con el modelo 524 y tasa de 12,76 €. La Oferta de Empleo Público de 2026 prevé 5 plazas más de esta categoría, todavía sin convocar.",
    duracion_maxima_proceso: "Las bases no fijan un plazo: la fecha del test se anuncia con la lista definitiva de personas admitidas y la de la prueba práctica, después (base 7.1).",
    orden_actuacion: "Comienza por la primera persona aspirante cuyo primer apellido se inicie por la letra «W» (sorteo del Instituto Aragonés de Administración Pública, BOA núm. 76, de 22 de abril de 2026).",
    plazas_total: 5,
    desglose_plazas: [{ turno: "Turno libre", cantidad: 5 }],
    aspirantes_que_pasan_fase: [],
    enlaces_oficiales: [
      { titulo: "Bases de la convocatoria del Grupo D (BOA núm. 96, 22 de mayo de 2026)", url: "https://www.boa.aragon.es/cgi-bin/EBOA/BRSCGI?CMD=VEROBJ&MLKOB=1448784890404" },
      DGA.ficha("250145", "25/0145"),
      DGA.oep2026,
      DGA.portal,
    ],
    ultima_actualizacion: "28 de octubre de 2026",
    pruebas: [
      {
        id: "test", icono: "📝", numero: 1,
        nombre: "Test teórico y teórico-práctico",
        formato: "Test",
        duracion: "2 horas",
        opciones: "100 preguntas + 10 de reserva, 4 alternativas, 1 válida",
        detalle: "Hasta un 25 % de las preguntas son de las materias comunes. Se califica de 0 a 100 puntos y hay que sacar al menos 50. Cada acierto suma 1 punto, cada error resta 0,3333 y las preguntas en blanco no penalizan.",
      },
      {
        id: "practica", icono: "🔧", numero: 2,
        nombre: "Prueba práctica",
        formato: "Práctica, apto o no apto",
        duracion: "Hasta 2 horas",
        opciones: "Sin nota numérica",
        detalle: "Eliminatoria. Quedan exentas, pidiéndolo por escrito en los tres días hábiles siguientes a la publicación de quienes superan el test, las personas con alguno de estos títulos de FP: Grado Superior en Sistemas Electrotécnicos y Automatizados o en Mantenimiento de Instalaciones Térmicas y de Fluidos; Grado Medio en Construcción, Obras de Interior, Decoración y Rehabilitación, Instalaciones Eléctricas y Automáticas, Instalaciones de Telecomunicaciones, Instalaciones Frigoríficas y de Climatización o Instalaciones de Producción de Calor. También quienes hayan trabajado al menos cinco años en esta categoría en la Administración de la Comunidad Autónoma de Aragón.",
      },
    ],
    estado: "cerrada",
    plazo_fin: "2026-06-19",
  },
});
