/**
 * Ficha (sin material de estudio) de Técnico/a de Informática del Gobierno de
 * Aragón: Cuerpo de Funcionarios Técnicos, Escala Técnica de Gestión (A2),
 * convocatoria 25/0096.
 *
 * Fuentes primarias leídas íntegras en la sesión:
 * - Resolución de 19 de diciembre de 2025 del Director General de la Función
 *   Pública (BOA núm. 247, de 23-12-2025), Cuerpo de Funcionarios Técnicos:
 *   mismas bases que Técnicos de Gestión General (ejercicios en
 *   `DGA.pruebas.tecnicosA2`; 28,90 €; curso de 40 horas; letra «Q»); base
 *   2.1.e (Diplomatura, Ingeniería Técnica, Arquitectura Técnica, Grado o
 *   equivalente); anexo I: 28 plazas.
 * - Programa: Anexo III de la Resolución de 25-11-2025 para la Escala
 *   Técnica de Gestión (55 temas en una sola lista), PDF en aragon.es.
 * - Ficha oficial 25/0096 en aplicaciones.aragon.es/oepc: plazo del
 *   24-12-2025 al 23-01-2026; 28 de turno libre.
 *
 * Uso: node --env-file=.env.local scripts/seed-ficha-tecnico-informatica-dga.mjs
 */
import { sembrarFicha, DGA } from "./lib/sembrar-ficha.mjs";

const SLUG = "tecnico-informatica-dga";

await sembrarFicha({
  oposicion: {
    slug: SLUG,
    nombre: "Técnico/a de Informática",
    organismo: DGA.organismo,
    organismo_slug: DGA.organismo_slug,
    puesto_slug: "tecnico-informatica",
    descripcion_corta: "Oposición de Técnico/a de Informática (A2) del Gobierno de Aragón: plazas, requisitos, examen y temario oficial.",
    descripcion_larga: "Plazas de funcionario del Cuerpo de Funcionarios Técnicos de la Administración de la Comunidad Autónoma de Aragón, Escala Técnica de Gestión, Técnicos de Informática (subgrupo A2). Se exige una diplomatura, ingeniería técnica, arquitectura técnica o un grado, de cualquier rama. El programa tiene 55 temas: derecho y organización de la Administración aragonesa y, sobre todo, informática —software libre, sistemas operativos, seguridad y análisis de riesgos, inteligencia artificial, cloud computing, ciclo de vida y metodologías de desarrollo, modelado de datos, pruebas, Java EE, cifrado y redes—. El examen es un test de 90 preguntas y un práctico con supuestos e informe.",
  },
  convocatoria: {
    oposicion_slug: SLUG,
    numero: "BOA 247/2025 (código 25/0096)",
    organismo: DGA.organismo,
    plaza: "Técnicos de Informática — Cuerpo de Funcionarios Técnicos de la Administración de la Comunidad Autónoma de Aragón, Escala Técnica de Gestión (subgrupo A2)",
    fecha_decreto: "19 de diciembre de 2025",
    sistema_seleccion: "Oposición, turno libre, seguida de un curso de formación selectivo (en línea, 40 horas, apto o no apto)",
    requisito_titulacion: "Título universitario oficial de Diplomatura, Ingeniería Técnica, Arquitectura Técnica, Grado o equivalente.",
    plazo_instancias:
      "20 días hábiles desde el día siguiente a la publicación en el BOA: del 24 de diciembre de 2025 al 23 de enero de 2026 (plazo ya cerrado). Solicitud electrónica con el modelo 524 y tasa de 28,90 €.",
    duracion_maxima_proceso: "Los ejercicios se celebran entre los tres y los doce meses siguientes a la publicación de la convocatoria (base 1.5).",
    orden_actuacion: "Comienza por la primera persona aspirante cuyo primer apellido se inicie por la letra «Q» (sorteo del Instituto Aragonés de Administración Pública de 8 de abril de 2025).",
    plazas_total: 28,
    desglose_plazas: [{ turno: "Turno libre", cantidad: 28 }],
    aspirantes_que_pasan_fase: [],
    enlaces_oficiales: [
      { titulo: "Bases de la convocatoria del Cuerpo de Funcionarios Técnicos (BOA núm. 247, 23 de diciembre de 2025)", url: "https://www.boa.aragon.es/cgi-bin/EBOA/BRSCGI?CMD=VEROBJ&MLKOB=1427866630404" },
      { titulo: "Programa de materias de Técnicos de Informática (Anexo III de la Resolución de 25 de noviembre de 2025)", url: "https://www.aragon.es/documents/d/guest/tecnicos-de-informatica-pdf" },
      DGA.ficha("250096", "25/0096"),
      DGA.portal,
    ],
    ultima_actualizacion: "28 de octubre de 2026",
    pruebas: DGA.pruebas.tecnicosA2,
    estado: "cerrada",
    plazo_fin: "2026-01-23",
  },
});
