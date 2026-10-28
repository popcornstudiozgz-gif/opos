/**
 * Ficha (sin material de estudio) de Arquitecto/a del Gobierno de Aragón:
 * Cuerpo de Funcionarios Superiores, Escala Facultativa Superior (A1),
 * convocatoria 25/0051.
 *
 * Fuentes primarias leídas íntegras en la sesión:
 * - Resolución de 19 de diciembre de 2025 del Director General de la Función
 *   Pública (BOA núm. 247, de 23-12-2025), Cuerpo de Funcionarios Superiores:
 *   mismas bases que Veterinarios (ver seed-ficha-veterinario-dga.mjs;
 *   ejercicios en `DGA.pruebas.superioresA1`).
 * - Programa: Anexo VIII de la Resolución de 25-11-2025 (15 temas comunes +
 *   75 específicos), PDF en aragon.es.
 * - Ficha oficial 25/0051 en aplicaciones.aragon.es/oepc: titulación, plazo
 *   del 24-12-2025 al 23-01-2026 y 16 plazas (14 de turno libre, 1 para
 *   víctimas de terrorismo y 1 para personas transexuales).
 * - Decreto 11/2026 (OEP 2026), anexo I: 5 plazas más, sin convocar.
 *
 * Uso: node --env-file=.env.local scripts/seed-ficha-arquitecto-dga.mjs
 */
import { sembrarFicha, DGA } from "./lib/sembrar-ficha.mjs";

const SLUG = "arquitecto-dga";

await sembrarFicha({
  oposicion: {
    slug: SLUG,
    nombre: "Arquitecto/a",
    organismo: DGA.organismo,
    organismo_slug: DGA.organismo_slug,
    puesto_slug: "arquitecto",
    descripcion_corta: "Oposición de Arquitecto/a (A1) del Gobierno de Aragón: plazas, requisitos, examen y temario oficial.",
    descripcion_larga: "Plazas de funcionario del Cuerpo de Funcionarios Superiores de la Administración de la Comunidad Autónoma de Aragón, Escala Facultativa Superior, Arquitectos (subgrupo A1). Se exige el título de arquitecto o uno que habilite para esta profesión. El programa tiene 90 temas —15 comunes y 75 específicos: ordenación del territorio y urbanismo de Aragón, planeamiento y paisaje, cambio climático, rehabilitación, Código Técnico de la Edificación y Código Estructural, instalaciones, conservación, patrimonio cultural, valoraciones y contratos de obras—, y el examen es un test de 100 preguntas y un práctico con supuestos e informe.",
  },
  convocatoria: {
    oposicion_slug: SLUG,
    numero: "BOA 247/2025 (código 25/0051)",
    organismo: DGA.organismo,
    plaza: "Arquitectos — Cuerpo de Funcionarios Superiores de la Administración de la Comunidad Autónoma de Aragón, Escala Facultativa Superior (subgrupo A1)",
    fecha_decreto: "19 de diciembre de 2025",
    sistema_seleccion: "Oposición, turno libre, seguida de un curso de formación selectivo (en línea, 40 horas, apto o no apto)",
    requisito_titulacion: "Título universitario oficial de Arquitecto o título que habilite para el ejercicio de esta profesión regulada.",
    plazo_instancias:
      "20 días hábiles desde el día siguiente a la publicación en el BOA: del 24 de diciembre de 2025 al 23 de enero de 2026 (plazo ya cerrado). Solicitud electrónica con el modelo 524 y tasa de 39,98 €. La Oferta de Empleo Público de 2026 prevé 5 plazas más, todavía sin convocar.",
    duracion_maxima_proceso: "Los ejercicios se celebran entre los tres y los doce meses siguientes a la publicación de la convocatoria (base 1.5).",
    orden_actuacion: "Comienza por la primera persona aspirante cuyo primer apellido se inicie por la letra «Q» (sorteo del Instituto Aragonés de Administración Pública de 8 de abril de 2025).",
    plazas_total: 16,
    desglose_plazas: [
      { turno: "Turno libre", cantidad: 14 },
      { turno: "Reserva para víctimas de terrorismo", cantidad: 1 },
      { turno: "Reserva para personas transexuales", cantidad: 1 },
    ],
    aspirantes_que_pasan_fase: [],
    enlaces_oficiales: [
      { titulo: "Bases de la convocatoria del Cuerpo de Funcionarios Superiores (BOA núm. 247, 23 de diciembre de 2025)", url: "https://www.boa.aragon.es/cgi-bin/EBOA/BRSCGI?CMD=VEROBJ&MLKOB=1427864610404" },
      { titulo: "Programa de materias de Arquitectos (Anexo VIII de la Resolución de 25 de noviembre de 2025)", url: "https://www.aragon.es/documents/d/guest/arquitectos-pdf" },
      DGA.ficha("250051", "25/0051"),
      DGA.oep2026,
    ],
    ultima_actualizacion: "28 de octubre de 2026",
    pruebas: DGA.pruebas.superioresA1,
    estado: "cerrada",
    plazo_fin: "2026-01-23",
  },
});
