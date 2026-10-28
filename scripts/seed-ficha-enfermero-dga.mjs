/**
 * Ficha (sin material de estudio) de Enfermero/a del Gobierno de Aragón:
 * Cuerpo de Funcionarios Técnicos, Escala Técnica Sanitaria (A2),
 * convocatoria 25/0081. Es la escala de funcionarios de la Administración
 * General de la DGA, no la de personal estatutario del Servicio Aragonés de
 * Salud.
 *
 * Fuentes primarias leídas íntegras en la sesión:
 * - Resolución de 19 de diciembre de 2025 del Director General de la Función
 *   Pública (BOA núm. 247, de 23-12-2025), Cuerpo de Funcionarios Técnicos:
 *   mismas bases que Técnicos de Gestión General (ejercicios en
 *   `DGA.pruebas.tecnicosA2`; 28,90 €; curso de 40 horas; letra «Q»); base
 *   2.1.e (Diplomatura o Grado en Enfermería o Ayudante Técnico Sanitario);
 *   anexo I: 57 plazas (2 reservadas a víctimas de violencia de género, 1 a
 *   víctimas de terrorismo y 1 a personas transexuales).
 * - Programa: Anexo XXII de la Resolución de 25-11-2025 (10 temas comunes +
 *   45 específicos), PDF en aragon.es.
 * - Ficha oficial 25/0081 en aplicaciones.aragon.es/oepc: OEP 2023; plazo del
 *   24-12-2025 al 23-01-2026.
 *
 * Uso: node --env-file=.env.local scripts/seed-ficha-enfermero-dga.mjs
 */
import { sembrarFicha, DGA } from "./lib/sembrar-ficha.mjs";

const SLUG = "enfermero-dga";

await sembrarFicha({
  oposicion: {
    slug: SLUG,
    nombre: "Enfermero/a",
    organismo: DGA.organismo,
    organismo_slug: DGA.organismo_slug,
    puesto_slug: "enfermero",
    descripcion_corta: "Oposición de Enfermero/a (A2, funcionario) del Gobierno de Aragón: plazas, requisitos, examen y temario oficial.",
    descripcion_larga: "Plazas de funcionario del Cuerpo de Funcionarios Técnicos de la Administración de la Comunidad Autónoma de Aragón, Escala Técnica Sanitaria, Enfermeros (subgrupo A2). No es la oposición de enfermería del Servicio Aragonés de Salud, que tiene convocatorias propias. Se exige la diplomatura o el grado en Enfermería o el título de Ayudante Técnico Sanitario. El programa tiene 55 temas —10 comunes y 45 específicos: salud pública, proceso de atención y clasificaciones de enfermería, bioética, cuidados a personas con enfermedades crónicas, diabetes, heridas, demencia y cuidados paliativos, educación para la salud y el sistema aragonés de atención a la dependencia—, y el examen es un test de 90 preguntas y un práctico con supuestos e informe.",
  },
  convocatoria: {
    oposicion_slug: SLUG,
    numero: "BOA 247/2025 (código 25/0081)",
    organismo: DGA.organismo,
    plaza: "Enfermeros — Cuerpo de Funcionarios Técnicos de la Administración de la Comunidad Autónoma de Aragón, Escala Técnica Sanitaria (subgrupo A2)",
    fecha_decreto: "19 de diciembre de 2025",
    sistema_seleccion: "Oposición, turno libre, seguida de un curso de formación selectivo (en línea, 40 horas, apto o no apto)",
    requisito_titulacion: "Título universitario oficial de Diplomatura o Grado en Enfermería o Ayudante Técnico Sanitario.",
    plazo_instancias:
      "20 días hábiles desde el día siguiente a la publicación en el BOA: del 24 de diciembre de 2025 al 23 de enero de 2026 (plazo ya cerrado). Solicitud electrónica con el modelo 524 y tasa de 28,90 €.",
    duracion_maxima_proceso: "Los ejercicios se celebran entre los tres y los doce meses siguientes a la publicación de la convocatoria (base 1.5).",
    orden_actuacion: "Comienza por la primera persona aspirante cuyo primer apellido se inicie por la letra «Q» (sorteo del Instituto Aragonés de Administración Pública de 8 de abril de 2025).",
    plazas_total: 57,
    desglose_plazas: [
      { turno: "Turno libre", cantidad: 53 },
      { turno: "Reserva para víctimas de violencia de género", cantidad: 2 },
      { turno: "Reserva para víctimas de terrorismo", cantidad: 1 },
      { turno: "Reserva para personas transexuales", cantidad: 1 },
    ],
    aspirantes_que_pasan_fase: [],
    enlaces_oficiales: [
      { titulo: "Bases de la convocatoria del Cuerpo de Funcionarios Técnicos (BOA núm. 247, 23 de diciembre de 2025)", url: "https://www.boa.aragon.es/cgi-bin/EBOA/BRSCGI?CMD=VEROBJ&MLKOB=1427866630404" },
      { titulo: "Programa de materias de Enfermeros (Anexo XXII de la Resolución de 25 de noviembre de 2025)", url: "https://www.aragon.es/documents/d/guest/enfermeros-pdf" },
      DGA.ficha("250081", "25/0081"),
      DGA.portal,
    ],
    ultima_actualizacion: "28 de octubre de 2026",
    pruebas: DGA.pruebas.tecnicosA2,
    estado: "cerrada",
    plazo_fin: "2026-01-23",
  },
});
