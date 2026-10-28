/**
 * Ficha (sin material de estudio) de Auxiliar de Educación Especial del
 * Gobierno de Aragón: Cuerpo Auxiliar, Escala de Ayudantes Facultativos (C2),
 * convocatoria 25/0110. Está en la oferta de la Administración General de la
 * DGA (no en la de personal docente de Educación), aunque trabaje en centros
 * educativos.
 *
 * Fuentes primarias leídas íntegras en la sesión:
 * - Resolución de 19 de diciembre de 2025 del Director General de la Función
 *   Pública (BOA núm. 247, de 23-12-2025), que convoca todas las clases del
 *   Cuerpo Auxiliar: mismas bases que TCAE (ver seed-ficha-tcae-dga.mjs):
 *   dos test el mismo día (6.2-6.3 y 8.1-8.2), 12,76 €, curso de 20 horas,
 *   letra «Q»; base 2.1.e (Graduado en ESO, Técnico o equivalente); anexo I:
 *   35 plazas (2 reservadas a víctimas de violencia de género y 1 a víctimas
 *   de terrorismo).
 * - Programa: Anexo XXXIII de la Resolución de 25-11-2025 (5 temas comunes +
 *   15 específicos), PDF en aragon.es.
 * - Ficha oficial 25/0110 en aplicaciones.aragon.es/oepc: OEP 2024 y 2025;
 *   plazo del 24-12-2025 al 23-01-2026.
 * - Decreto 11/2026 (OEP 2026), anexo I: 7 plazas más, sin convocar.
 *
 * Uso: node --env-file=.env.local scripts/seed-ficha-auxiliar-educacion-especial-dga.mjs
 */
import { sembrarFicha, DGA } from "./lib/sembrar-ficha.mjs";

const SLUG = "auxiliar-educacion-especial-dga";

await sembrarFicha({
  oposicion: {
    slug: SLUG,
    nombre: "Auxiliar de Educación Especial",
    organismo: DGA.organismo,
    organismo_slug: DGA.organismo_slug,
    puesto_slug: "auxiliar-educacion-especial",
    descripcion_corta: "Oposición de Auxiliar de Educación Especial (C2) del Gobierno de Aragón: plazas, requisitos, examen y temario oficial.",
    descripcion_larga: "Plazas de funcionario del Cuerpo Auxiliar de la Administración de la Comunidad Autónoma de Aragón, Escala de Ayudantes Facultativos, Auxiliares de Educación Especial (subgrupo C2), que atienden al alumnado con necesidades educativas especiales en centros ordinarios y de educación especial. Se exige el Graduado en ESO, Técnico o equivalente. El programa tiene 20 temas —5 comunes y 15 específicos: discapacidad física, intelectual y sensorial, conductas desafiantes, autonomía en alimentación, aseo y control de esfínteres, comunicación, acompañamiento y patio, educación inclusiva y ayudas técnicas—, y el examen son dos test el mismo día.",
  },
  convocatoria: {
    oposicion_slug: SLUG,
    numero: "BOA 247/2025 (código 25/0110)",
    organismo: DGA.organismo,
    plaza: "Auxiliares de Educación Especial — Cuerpo Auxiliar de la Administración General de la Comunidad Autónoma de Aragón, Escala de Ayudantes Facultativos (subgrupo C2)",
    fecha_decreto: "19 de diciembre de 2025",
    sistema_seleccion: "Oposición, turno libre, seguida de un curso de formación selectivo (en línea, 20 horas, apto o no apto)",
    requisito_titulacion: "Título de Graduado en Educación Secundaria Obligatoria, título de Técnico o equivalente.",
    plazo_instancias:
      "20 días hábiles desde el día siguiente a la publicación en el BOA: del 24 de diciembre de 2025 al 23 de enero de 2026 (plazo ya cerrado). Solicitud electrónica con el modelo 524 y tasa de 12,76 €. La Oferta de Empleo Público de 2026 prevé 7 plazas más, todavía sin convocar.",
    duracion_maxima_proceso: "Los ejercicios se celebran entre los tres y los doce meses siguientes a la publicación de la convocatoria (base 1.5).",
    orden_actuacion: "Comienza por la primera persona aspirante cuyo primer apellido se inicie por la letra «Q» (sorteo del Instituto Aragonés de Administración Pública de 8 de abril de 2025).",
    plazas_total: 35,
    desglose_plazas: [
      { turno: "Turno libre", cantidad: 32 },
      { turno: "Reserva para víctimas de violencia de género", cantidad: 2 },
      { turno: "Reserva para víctimas de terrorismo", cantidad: 1 },
    ],
    aspirantes_que_pasan_fase: [],
    enlaces_oficiales: [
      { titulo: "Bases de la convocatoria del Cuerpo Auxiliar (BOA núm. 247, 23 de diciembre de 2025)", url: "https://www.boa.aragon.es/cgi-bin/EBOA/BRSCGI?CMD=VEROBJ&MLKOB=1427870670404" },
      { titulo: "Programa de materias de Auxiliares de Educación Especial (Anexo XXXIII de la Resolución de 25 de noviembre de 2025)", url: "https://www.aragon.es/documents/d/guest/auxiliares-de-educacion-especial-pdf" },
      DGA.ficha("250110", "25/0110"),
      DGA.oep2026,
    ],
    ultima_actualizacion: "28 de octubre de 2026",
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
