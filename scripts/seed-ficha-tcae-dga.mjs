/**
 * Ficha (sin material de estudio) de Técnico/a en Cuidados Auxiliares de
 * Enfermería (TCAE) del Gobierno de Aragón: Cuerpo Auxiliar, Escala Auxiliar
 * de Enfermería (C2), convocatoria 25/0112. No es la TCAE del Servicio
 * Aragonés de Salud, que tiene oferta y convocatorias propias.
 *
 * Fuentes primarias leídas íntegras en la sesión:
 * - Resolución de 19 de diciembre de 2025 del Director General de la Función
 *   Pública (BOA núm. 247, de 23-12-2025), que convoca todas las clases del
 *   Cuerpo Auxiliar (OEP 2023-2025 acumuladas): base 1.3 (oposición + curso
 *   selectivo), 1.5 (ejercicios entre 3 y 12 meses tras la convocatoria),
 *   2.1.e (título de Técnico en Cuidados Auxiliares de Enfermería o
 *   equivalente), 3.5 (12,76 €), 6 (dos test el mismo día: 70 + 5 en dos
 *   horas y 30 + 5 sobre supuestos en una hora), 8 (0-70 mínimo 35; 0-30
 *   mínimo 15; error −0,3333), 10.4 (curso en línea de 20 horas), letra
 *   «Q»; anexo I: 155 plazas (7 víctimas de violencia de género, 1 de
 *   terrorismo y 2 personas transexuales).
 * - Programa: Anexo XXXV de la Resolución de 25-11-2025 (5 temas comunes +
 *   15 específicos), PDF en aragon.es.
 * - Ficha oficial 25/0112 en aplicaciones.aragon.es/oepc: plazo del
 *   24-12-2025 al 23-01-2026; 145 de turno libre + reservas.
 * - Decreto 11/2026 (OEP 2026), anexo I: 13 plazas más, sin convocar.
 *
 * Uso: node --env-file=.env.local scripts/seed-ficha-tcae-dga.mjs
 */
import { sembrarFicha, DGA } from "./lib/sembrar-ficha.mjs";

const SLUG = "tcae-dga";

await sembrarFicha({
  oposicion: {
    slug: SLUG,
    nombre: "Técnico/a en Cuidados Auxiliares de Enfermería (TCAE)",
    organismo: DGA.organismo,
    organismo_slug: DGA.organismo_slug,
    puesto_slug: "tcae",
    descripcion_corta: "Oposición de TCAE del Gobierno de Aragón (Cuerpo Auxiliar, Escala Auxiliar de Enfermería, C2): plazas, requisitos, examen y temario oficial.",
    descripcion_larga: "Plazas de funcionario del Cuerpo Auxiliar de la Administración de la Comunidad Autónoma de Aragón, Escala Auxiliar de Enfermería (subgrupo C2). No es la oposición de TCAE del Servicio Aragonés de Salud: su programa de 20 temas se centra en la atención a personas mayores, con discapacidad o en situación de dependencia —atención centrada en la persona, buenas prácticas en los centros del IASS, alimentación, higiene, movilización, demencias, úlceras por presión, eliminación de sujeciones, cuidados al final de la vida y primeros auxilios—, más 5 temas comunes. El examen son dos test el mismo día.",
  },
  convocatoria: {
    oposicion_slug: SLUG,
    numero: "BOA 247/2025 (código 25/0112)",
    organismo: DGA.organismo,
    plaza: "Técnicos en Cuidados Auxiliares de Enfermería — Cuerpo Auxiliar de la Administración General de la Comunidad Autónoma de Aragón, Escala Auxiliar de Enfermería (subgrupo C2)",
    fecha_decreto: "19 de diciembre de 2025",
    sistema_seleccion: "Oposición, turno libre, seguida de un curso de formación selectivo (en línea, 20 horas, apto o no apto)",
    requisito_titulacion: "Título de Técnico en Cuidados Auxiliares de Enfermería o equivalente.",
    plazo_instancias:
      "20 días hábiles desde el día siguiente a la publicación en el BOA: del 24 de diciembre de 2025 al 23 de enero de 2026 (plazo ya cerrado). Solicitud electrónica con el modelo 524 y tasa de 12,76 €. La Oferta de Empleo Público de 2026 prevé 13 plazas más, todavía sin convocar.",
    duracion_maxima_proceso: "Los ejercicios se celebran entre los tres y los doce meses siguientes a la publicación de la convocatoria (base 1.5).",
    orden_actuacion: "Comienza por la primera persona aspirante cuyo primer apellido se inicie por la letra «Q» (sorteo del Instituto Aragonés de Administración Pública de 8 de abril de 2025).",
    plazas_total: 155,
    desglose_plazas: [
      { turno: "Turno libre", cantidad: 145 },
      { turno: "Reserva para víctimas de violencia de género", cantidad: 7 },
      { turno: "Reserva para víctimas de terrorismo", cantidad: 1 },
      { turno: "Reserva para personas transexuales", cantidad: 2 },
    ],
    aspirantes_que_pasan_fase: [],
    enlaces_oficiales: [
      { titulo: "Bases de la convocatoria del Cuerpo Auxiliar (BOA núm. 247, 23 de diciembre de 2025)", url: "https://www.boa.aragon.es/cgi-bin/EBOA/BRSCGI?CMD=VEROBJ&MLKOB=1427870670404" },
      { titulo: "Programa de materias de TCAE (Anexo XXXV de la Resolución de 25 de noviembre de 2025)", url: "https://www.aragon.es/documents/d/guest/tcae-pdf" },
      DGA.ficha("250112", "25/0112"),
      DGA.oep2026,
    ],
    ultima_actualizacion: "27 de octubre de 2026",
    pruebas: [
      {
        id: "primer-ejercicio", icono: "📝", numero: 1,
        nombre: "Primer ejercicio (teórico)",
        formato: "Test",
        duracion: "2 horas",
        opciones: "70 preguntas + 5 de reserva, 4 alternativas, 1 válida",
        detalle: "Sobre el programa de materias. Se califica de 0 a 70 puntos y hay que sacar al menos 35. Cada acierto suma 1 punto, cada error resta 0,3333 y las preguntas en blanco no penalizan.",
      },
      {
        id: "segundo-ejercicio", icono: "📋", numero: 2,
        nombre: "Segundo ejercicio (práctico)",
        formato: "Test sobre supuestos prácticos",
        duracion: "1 hora",
        opciones: "30 preguntas + 5 de reserva, 4 alternativas, 1 válida",
        detalle: "Se hace el mismo día, a continuación del primero, y solo se corrige a quien lo haya superado. Se califica de 0 a 30 puntos y hay que sacar al menos 15, con la misma penalización por error.",
      },
    ],
    estado: "cerrada",
    plazo_fin: "2026-01-23",
  },
});
