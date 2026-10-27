/**
 * Ficha (sin material de estudio) de Personal de Servicios Auxiliares del
 * Gobierno de Aragón: personal laboral fijo, Grupo E, convocatoria 25/0153.
 *
 * Fuentes primarias leídas íntegras en la sesión:
 * - Resolución de 6 de mayo de 2026 del Director General de la Función
 *   Pública (BOA núm. 96, de 22-05-2026), Grupo E (códigos 250150 a
 *   250153): mismas bases que Servicios Domésticos (ver
 *   seed-ficha-servicios-domesticos-dga.mjs); anexo I: 20 plazas, todas de
 *   la OEP 2025; anexo II: 6 temas comunes del Grupo E + 6 específicos
 *   (apartado d).
 * - Ficha oficial 25/0153 en aplicaciones.aragon.es/oepc: plazo del
 *   25-05-2026 al 19-06-2026; 20 de turno libre.
 * - Decreto 11/2026 (OEP 2026), anexo II: 78 plazas más, sin convocar.
 *
 * Uso: node --env-file=.env.local scripts/seed-ficha-servicios-auxiliares-dga.mjs
 */
import { sembrarFicha, DGA } from "./lib/sembrar-ficha.mjs";

const SLUG = "servicios-auxiliares-dga";

await sembrarFicha({
  oposicion: {
    slug: SLUG,
    nombre: "Personal de Servicios Auxiliares",
    organismo: DGA.organismo,
    organismo_slug: DGA.organismo_slug,
    puesto_slug: "personal-servicios-auxiliares",
    descripcion_corta: "Oposición de Personal de Servicios Auxiliares (laboral fijo, Grupo E) del Gobierno de Aragón: plazas, requisitos, examen y temario oficial.",
    descripcion_larga: "Personal laboral fijo del Grupo E de la Administración de la Comunidad Autónoma de Aragón. Solo se exige el Certificado de Estudios Primarios o de Escolaridad, y el examen es un único test de 50 preguntas sobre un programa de 12 temas: 6 comunes (Constitución, Estatuto de Autonomía, organización de la Administración aragonesa, empleo público y convenio colectivo, igualdad y prevención de riesgos laborales) y 6 específicos de atención al público, correspondencia, apertura y cierre de edificios, máquinas de oficina y traslado de materiales.",
  },
  convocatoria: {
    oposicion_slug: SLUG,
    numero: "BOA 96/2026 (código 25/0153)",
    organismo: DGA.organismo,
    plaza: "Personal de Servicios Auxiliares — personal laboral fijo, Grupo E, de la Administración General de la Comunidad Autónoma de Aragón",
    fecha_decreto: "6 de mayo de 2026",
    sistema_seleccion: "Oposición, turno libre, con un único ejercicio eliminatorio",
    requisito_titulacion: "Certificado de Estudios Primarios o de Escolaridad, o equivalente.",
    plazo_instancias:
      "20 días hábiles desde el día siguiente a la publicación en el BOA: del 25 de mayo al 19 de junio de 2026 (plazo ya cerrado). Solicitud electrónica con el modelo 524 y tasa de 8,51 €. La Oferta de Empleo Público de 2026 prevé 78 plazas más de esta categoría, todavía sin convocar.",
    duracion_maxima_proceso: "Las bases no fijan un plazo: la fecha del ejercicio se anuncia con la lista definitiva de personas admitidas (base 7.1).",
    orden_actuacion: "Comienza por la primera persona aspirante cuyo primer apellido se inicie por la letra «W» (sorteo del Instituto Aragonés de Administración Pública, BOA núm. 76, de 22 de abril de 2026).",
    plazas_total: 20,
    desglose_plazas: [{ turno: "Turno libre", cantidad: 20 }],
    aspirantes_que_pasan_fase: [],
    enlaces_oficiales: [
      { titulo: "Bases de la convocatoria del Grupo E (BOA núm. 96, 22 de mayo de 2026)", url: "https://www.boa.aragon.es/cgi-bin/EBOA/BRSCGI?CMD=VEROBJ&MLKOB=1448788930404" },
      DGA.ficha("250153", "25/0153"),
      DGA.oep2026,
      DGA.portal,
    ],
    ultima_actualizacion: "27 de octubre de 2026",
    pruebas: [
      {
        id: "ejercicio-unico", icono: "📝", numero: 1,
        nombre: "Ejercicio único (test)",
        formato: "Test teórico y teórico-práctico",
        duracion: "90 minutos",
        opciones: "50 preguntas + 5 de reserva, 4 alternativas, 1 válida",
        detalle: "Hasta un 25 % de las preguntas son de las materias comunes. Se califica de 0 a 50 puntos y hay que sacar al menos 25. Cada acierto suma 1 punto, cada error resta 0,3333 y las preguntas en blanco no penalizan.",
      },
    ],
    estado: "cerrada",
    plazo_fin: "2026-06-19",
  },
});
