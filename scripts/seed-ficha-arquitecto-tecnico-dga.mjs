/**
 * Ficha (sin material de estudio) de Arquitecto/a Técnico/a del Gobierno de
 * Aragón: Cuerpo de Funcionarios Técnicos, Escala Técnica Facultativa (A2),
 * convocatoria 25/0078.
 *
 * Fuentes primarias leídas íntegras en la sesión:
 * - Resolución de 19 de diciembre de 2025 del Director General de la Función
 *   Pública (BOA núm. 247, de 23-12-2025), Cuerpo de Funcionarios Técnicos:
 *   mismas bases que Técnicos de Gestión General (ejercicios en
 *   `DGA.pruebas.tecnicosA2`; 28,90 €; curso de 40 horas; letra «Q»);
 *   anexo I: 18 plazas.
 * - Programa: Anexo V de la Resolución de 25-11-2025 (10 temas comunes + 45
 *   específicos), PDF en aragon.es.
 * - Ficha oficial 25/0078 en aplicaciones.aragon.es/oepc: titulación y plazo
 *   del 24-12-2025 al 23-01-2026; 18 de turno libre.
 * - Decreto 11/2026 (OEP 2026), anexo I: 8 plazas más, sin convocar.
 *
 * Uso: node --env-file=.env.local scripts/seed-ficha-arquitecto-tecnico-dga.mjs
 */
import { sembrarFicha, DGA } from "./lib/sembrar-ficha.mjs";

const SLUG = "arquitecto-tecnico-dga";

await sembrarFicha({
  oposicion: {
    slug: SLUG,
    nombre: "Arquitecto/a Técnico/a",
    organismo: DGA.organismo,
    organismo_slug: DGA.organismo_slug,
    puesto_slug: "arquitecto-tecnico",
    descripcion_corta: "Oposición de Arquitecto/a Técnico/a (A2) del Gobierno de Aragón: plazas, requisitos, examen y temario oficial.",
    descripcion_larga: "Plazas de funcionario del Cuerpo de Funcionarios Técnicos de la Administración de la Comunidad Autónoma de Aragón, Escala Técnica Facultativa, Arquitectos Técnicos (subgrupo A2). Se exige la diplomatura o el grado en Arquitectura Técnica, o un grado que habilite para esta profesión. El programa tiene 55 temas —10 comunes y 45 específicos: Ley de Ordenación de la Edificación, urbanismo y valoraciones, Código Técnico de la Edificación, estructuras e instalaciones, eficiencia energética, patologías, accesibilidad, protección civil, patrimonio cultural y contratos de obras—, y el examen es un test de 90 preguntas y un práctico con supuestos e informe.",
  },
  convocatoria: {
    oposicion_slug: SLUG,
    numero: "BOA 247/2025 (código 25/0078)",
    organismo: DGA.organismo,
    plaza: "Arquitectos Técnicos — Cuerpo de Funcionarios Técnicos de la Administración de la Comunidad Autónoma de Aragón, Escala Técnica Facultativa (subgrupo A2)",
    fecha_decreto: "19 de diciembre de 2025",
    sistema_seleccion: "Oposición, turno libre, seguida de un curso de formación selectivo (en línea, 40 horas, apto o no apto)",
    requisito_titulacion: "Título universitario oficial de Diplomatura o Grado en Arquitectura Técnica o equivalente, o título de Grado que habilite para el ejercicio de esta profesión regulada.",
    plazo_instancias:
      "20 días hábiles desde el día siguiente a la publicación en el BOA: del 24 de diciembre de 2025 al 23 de enero de 2026 (plazo ya cerrado). Solicitud electrónica con el modelo 524 y tasa de 28,90 €. La Oferta de Empleo Público de 2026 prevé 8 plazas más, todavía sin convocar.",
    duracion_maxima_proceso: "Los ejercicios se celebran entre los tres y los doce meses siguientes a la publicación de la convocatoria (base 1.5).",
    orden_actuacion: "Comienza por la primera persona aspirante cuyo primer apellido se inicie por la letra «Q» (sorteo del Instituto Aragonés de Administración Pública de 8 de abril de 2025).",
    plazas_total: 18,
    desglose_plazas: [{ turno: "Turno libre", cantidad: 18 }],
    aspirantes_que_pasan_fase: [],
    enlaces_oficiales: [
      { titulo: "Bases de la convocatoria del Cuerpo de Funcionarios Técnicos (BOA núm. 247, 23 de diciembre de 2025)", url: "https://www.boa.aragon.es/cgi-bin/EBOA/BRSCGI?CMD=VEROBJ&MLKOB=1427866630404" },
      { titulo: "Programa de materias de Arquitectos Técnicos (Anexo V de la Resolución de 25 de noviembre de 2025)", url: "https://www.aragon.es/documents/d/guest/arquitectos-tecnicos-pdf" },
      DGA.ficha("250078", "25/0078"),
      DGA.oep2026,
    ],
    ultima_actualizacion: "28 de octubre de 2026",
    pruebas: DGA.pruebas.tecnicosA2,
    estado: "cerrada",
    plazo_fin: "2026-01-23",
  },
});
