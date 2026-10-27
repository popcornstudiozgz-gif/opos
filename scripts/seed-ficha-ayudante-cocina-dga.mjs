/**
 * Ficha (sin material de estudio) de Oficial Segunda Ayudante de Cocina del
 * Gobierno de Aragón: personal laboral fijo, Grupo D, convocatoria 25/0147.
 *
 * Fuentes primarias leídas íntegras en la sesión:
 * - Resolución de 5 de mayo de 2026 del Director General de la Función
 *   Pública (BOA núm. 96, de 22-05-2026), que convoca las categorías del
 *   Grupo D (códigos 250143 a 250149): base 2.1.e (Graduado en ESO, Técnico
 *   o equivalente), 3.5 (12,76 €), 6.1 (test de 100 + 10 de reserva, dos
 *   horas, hasta un 25 % de materias comunes), 6.2 (prueba práctica
 *   eliminatoria de hasta dos horas para esta categoría, de la que quedan
 *   exentas las personas con título habilitante del anexo III —Grado Medio
 *   en Cocina y Gastronomía o Grado Superior en Dirección de Cocina— o cinco
 *   años en la categoría en la Administración aragonesa), 8.1 (0-100, mínimo
 *   50, error −0,3333), 8.4 (práctica apto/no apto), letra «W»; anexo I: 31
 *   plazas (3 OEP 2023 + 8 OEP 2024 + 20 OEP 2025, 1 reservada a víctimas de
 *   violencia); anexo II: 6 temas comunes del Grupo D + 12 específicos
 *   (apartado e).
 * - Ficha oficial 25/0147 en aplicaciones.aragon.es/oepc: plazo del
 *   25-05-2026 al 19-06-2026; 30 turno libre + 1 víctimas de violencia.
 * - Decreto 11/2026 (OEP 2026), anexo II: 30 plazas más, sin convocar.
 *
 * Uso: node --env-file=.env.local scripts/seed-ficha-ayudante-cocina-dga.mjs
 */
import { sembrarFicha, DGA } from "./lib/sembrar-ficha.mjs";

const SLUG = "ayudante-cocina-dga";

await sembrarFicha({
  oposicion: {
    slug: SLUG,
    nombre: "Oficial Segunda Ayudante de Cocina",
    organismo: DGA.organismo,
    organismo_slug: DGA.organismo_slug,
    puesto_slug: "oficial-2-ayudante-cocina",
    descripcion_corta: "Oposición de Oficial Segunda Ayudante de Cocina (laboral fijo, Grupo D) del Gobierno de Aragón: plazas, requisitos, examen y temario oficial.",
    descripcion_larga: "Personal laboral fijo del Grupo D de la Administración de la Comunidad Autónoma de Aragón. Se exige el Graduado en ESO, Técnico o equivalente. El examen es un test de 100 preguntas sobre un programa de 18 temas —6 comunes y 12 de cocina: instalaciones y manipulación de alimentos, aprovisionamiento, nutrición, preparación y conservación de cada tipo de género, elaboraciones básicas, primeros y segundos platos y postres—, seguido de una prueba práctica de la que quedan exentas las personas con un título de FP de cocina.",
  },
  convocatoria: {
    oposicion_slug: SLUG,
    numero: "BOA 96/2026 (código 25/0147)",
    organismo: DGA.organismo,
    plaza: "Oficial Segunda Ayudante de Cocina — personal laboral fijo, Grupo D, de la Administración General de la Comunidad Autónoma de Aragón",
    fecha_decreto: "5 de mayo de 2026",
    sistema_seleccion: "Oposición, turno libre: un test eliminatorio y una prueba práctica de apto o no apto",
    requisito_titulacion: "Graduado en Educación Secundaria Obligatoria, Técnico o equivalente.",
    plazo_instancias:
      "20 días hábiles desde el día siguiente a la publicación en el BOA: del 25 de mayo al 19 de junio de 2026 (plazo ya cerrado). Solicitud electrónica con el modelo 524 y tasa de 12,76 €. La Oferta de Empleo Público de 2026 prevé 30 plazas más de esta categoría, todavía sin convocar.",
    duracion_maxima_proceso: "Las bases no fijan un plazo: la fecha del test se anuncia con la lista definitiva de personas admitidas y la de la prueba práctica, después (base 7.1).",
    orden_actuacion: "Comienza por la primera persona aspirante cuyo primer apellido se inicie por la letra «W» (sorteo del Instituto Aragonés de Administración Pública, BOA núm. 76, de 22 de abril de 2026).",
    plazas_total: 31,
    desglose_plazas: [
      { turno: "Turno libre", cantidad: 30 },
      { turno: "Reserva para mujeres víctimas de violencia", cantidad: 1 },
    ],
    aspirantes_que_pasan_fase: [],
    enlaces_oficiales: [
      { titulo: "Bases de la convocatoria del Grupo D (BOA núm. 96, 22 de mayo de 2026)", url: "https://www.boa.aragon.es/cgi-bin/EBOA/BRSCGI?CMD=VEROBJ&MLKOB=1448784890404" },
      DGA.ficha("250147", "25/0147"),
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
        id: "practica", icono: "🍳", numero: 2,
        nombre: "Prueba práctica",
        formato: "Práctica, apto o no apto",
        duracion: "Hasta 2 horas",
        opciones: "Sin nota numérica",
        detalle: "Eliminatoria. Quedan exentas, pidiéndolo por escrito en los tres días hábiles siguientes a la publicación de quienes superan el test, las personas con Grado Medio en Cocina y Gastronomía o Grado Superior en Dirección de Cocina, y quienes hayan trabajado al menos cinco años en esta categoría en la Administración de la Comunidad Autónoma de Aragón.",
      },
    ],
    estado: "cerrada",
    plazo_fin: "2026-06-19",
  },
});
