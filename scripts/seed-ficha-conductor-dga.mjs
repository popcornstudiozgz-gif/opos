/**
 * Ficha (sin material de estudio) de Oficial Primera Conductor del Gobierno
 * de Aragón: personal laboral fijo, Grupo D, convocatoria 25/0144.
 *
 * Fuentes primarias leídas íntegras en la sesión:
 * - Resolución de 5 de mayo de 2026 del Director General de la Función
 *   Pública (BOA núm. 96, de 22-05-2026), Grupo D: mismas bases que Ayudante
 *   de Cocina (ver seed-ficha-ayudante-cocina-dga.mjs), más la base 2.1.f
 *   (permiso de conducir C+E o equivalente para esta categoría) y el anexo
 *   III (exime de la prueba práctica el Grado Medio de FP en Conducción de
 *   vehículos de transporte por carretera); anexo I: 5 plazas de la OEP
 *   2025; anexo II: 6 temas comunes del Grupo D + 12 específicos
 *   (apartado b).
 * - Ficha oficial 25/0144 en aplicaciones.aragon.es/oepc: plazo del
 *   25-05-2026 al 19-06-2026; 5 de turno libre.
 * - Decreto 11/2026 (OEP 2026), anexo II: 27 plazas más, sin convocar.
 *
 * Uso: node --env-file=.env.local scripts/seed-ficha-conductor-dga.mjs
 */
import { sembrarFicha, DGA } from "./lib/sembrar-ficha.mjs";

const SLUG = "conductor-dga";

await sembrarFicha({
  oposicion: {
    slug: SLUG,
    nombre: "Oficial Primera Conductor",
    organismo: DGA.organismo,
    organismo_slug: DGA.organismo_slug,
    puesto_slug: "oficial-1-conductor",
    descripcion_corta: "Oposición de Oficial Primera Conductor (laboral fijo, Grupo D) del Gobierno de Aragón: plazas, requisitos, examen y temario oficial.",
    descripcion_larga: "Personal laboral fijo del Grupo D de la Administración de la Comunidad Autónoma de Aragón. Se exige el Graduado en ESO, Técnico o equivalente y el permiso de conducir C+E. El examen es un test de 100 preguntas sobre un programa de 18 temas —6 comunes y 12 específicos: tráfico, permisos y seguridad vial, motores, refrigeración y lubricación, equipo eléctrico, transmisión, dirección, frenos, suspensión y neumáticos, y maquinaria pesada—, seguido de una prueba práctica de la que queda exento quien tenga el FP de conducción de vehículos de transporte por carretera.",
  },
  convocatoria: {
    oposicion_slug: SLUG,
    numero: "BOA 96/2026 (código 25/0144)",
    organismo: DGA.organismo,
    plaza: "Oficial Primera Conductor — personal laboral fijo, Grupo D, de la Administración General de la Comunidad Autónoma de Aragón",
    fecha_decreto: "5 de mayo de 2026",
    sistema_seleccion: "Oposición, turno libre: un test eliminatorio y una prueba práctica de apto o no apto",
    requisito_titulacion: "Graduado en Educación Secundaria Obligatoria, Técnico o equivalente, y permiso de conducir C+E o equivalente.",
    plazo_instancias:
      "20 días hábiles desde el día siguiente a la publicación en el BOA: del 25 de mayo al 19 de junio de 2026 (plazo ya cerrado). Solicitud electrónica con el modelo 524 y tasa de 12,76 €. La Oferta de Empleo Público de 2026 prevé 27 plazas más de esta categoría, todavía sin convocar.",
    duracion_maxima_proceso: "Las bases no fijan un plazo: la fecha del test se anuncia con la lista definitiva de personas admitidas y la de la prueba práctica, después (base 7.1).",
    orden_actuacion: "Comienza por la primera persona aspirante cuyo primer apellido se inicie por la letra «W» (sorteo del Instituto Aragonés de Administración Pública, BOA núm. 76, de 22 de abril de 2026).",
    plazas_total: 5,
    desglose_plazas: [{ turno: "Turno libre", cantidad: 5 }],
    aspirantes_que_pasan_fase: [],
    enlaces_oficiales: [
      { titulo: "Bases de la convocatoria del Grupo D (BOA núm. 96, 22 de mayo de 2026)", url: "https://www.boa.aragon.es/cgi-bin/EBOA/BRSCGI?CMD=VEROBJ&MLKOB=1448784890404" },
      DGA.ficha("250144", "25/0144"),
      DGA.oep2026,
      DGA.portal,
    ],
    ultima_actualizacion: "27 de octubre de 2026",
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
        id: "practica", icono: "🚛", numero: 2,
        nombre: "Prueba práctica",
        formato: "Práctica, apto o no apto",
        duracion: "Hasta 2 horas",
        opciones: "Sin nota numérica",
        detalle: "Eliminatoria. Quedan exentas, pidiéndolo por escrito en los tres días hábiles siguientes a la publicación de quienes superan el test, las personas con el Grado Medio de FP en Conducción de vehículos de transporte por carretera y quienes hayan trabajado al menos cinco años en esta categoría en la Administración de la Comunidad Autónoma de Aragón.",
      },
    ],
    estado: "cerrada",
    plazo_fin: "2026-06-19",
  },
});
