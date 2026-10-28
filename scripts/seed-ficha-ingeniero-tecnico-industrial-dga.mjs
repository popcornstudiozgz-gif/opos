/**
 * Ficha (sin material de estudio) de Ingeniero/a Técnico/a Industrial del
 * Gobierno de Aragón: Cuerpo de Funcionarios Técnicos, Escala Técnica
 * Facultativa (A2), convocatoria 25/0090.
 *
 * Fuentes primarias leídas íntegras en la sesión:
 * - Resolución de 19 de diciembre de 2025 del Director General de la Función
 *   Pública (BOA núm. 247, de 23-12-2025), Cuerpo de Funcionarios Técnicos:
 *   mismas bases que Técnicos de Gestión General (ejercicios en
 *   `DGA.pruebas.tecnicosA2`; 28,90 €; curso de 40 horas; letra «Q»);
 *   anexo I: 21 plazas (2 reservadas a personas transexuales).
 * - Programa: Anexo IX de la Resolución de 25-11-2025 (10 temas comunes + 45
 *   específicos), PDF en aragon.es.
 * - Ficha oficial 25/0090 en aplicaciones.aragon.es/oepc: OEP 2024 y 2025;
 *   titulación y plazo del 24-12-2025 al 23-01-2026.
 * - Decreto 11/2026 (OEP 2026), anexo I: 10 plazas más, sin convocar.
 *
 * Uso: node --env-file=.env.local scripts/seed-ficha-ingeniero-tecnico-industrial-dga.mjs
 */
import { sembrarFicha, DGA } from "./lib/sembrar-ficha.mjs";

const SLUG = "ingeniero-tecnico-industrial-dga";

await sembrarFicha({
  oposicion: {
    slug: SLUG,
    nombre: "Ingeniero/a Técnico/a Industrial",
    organismo: DGA.organismo,
    organismo_slug: DGA.organismo_slug,
    puesto_slug: "ingeniero-tecnico-industrial",
    descripcion_corta: "Oposición de Ingeniero/a Técnico/a Industrial (A2) del Gobierno de Aragón: plazas, requisitos, examen y temario oficial.",
    descripcion_larga: "Plazas de funcionario del Cuerpo de Funcionarios Técnicos de la Administración de la Comunidad Autónoma de Aragón, Escala Técnica Facultativa, Ingenieros Técnicos Industriales (subgrupo A2). Se exige la ingeniería técnica industrial, la ingeniería industrial o un grado que habilite para esta profesión. El programa tiene 55 temas —10 comunes y 45 específicos: política industrial y subvenciones, seguridad industrial y registro de establecimientos, sector eléctrico y líneas de alta tensión, eficiencia energética, instalaciones petrolíferas y de gas, grúas, protección contra incendios, contaminación industrial, ruido y metrología—, y el examen es un test de 90 preguntas y un práctico con supuestos e informe.",
  },
  convocatoria: {
    oposicion_slug: SLUG,
    numero: "BOA 247/2025 (código 25/0090)",
    organismo: DGA.organismo,
    plaza: "Ingenieros Técnicos Industriales — Cuerpo de Funcionarios Técnicos de la Administración de la Comunidad Autónoma de Aragón, Escala Técnica Facultativa (subgrupo A2)",
    fecha_decreto: "19 de diciembre de 2025",
    sistema_seleccion: "Oposición, turno libre, seguida de un curso de formación selectivo (en línea, 40 horas, apto o no apto)",
    requisito_titulacion: "Título universitario oficial de Ingeniería Industrial, Ingeniería Técnica Industrial o título de Grado que habilite para el ejercicio de esta profesión regulada.",
    plazo_instancias:
      "20 días hábiles desde el día siguiente a la publicación en el BOA: del 24 de diciembre de 2025 al 23 de enero de 2026 (plazo ya cerrado). Solicitud electrónica con el modelo 524 y tasa de 28,90 €. La Oferta de Empleo Público de 2026 prevé 10 plazas más, todavía sin convocar.",
    duracion_maxima_proceso: "Los ejercicios se celebran entre los tres y los doce meses siguientes a la publicación de la convocatoria (base 1.5).",
    orden_actuacion: "Comienza por la primera persona aspirante cuyo primer apellido se inicie por la letra «Q» (sorteo del Instituto Aragonés de Administración Pública de 8 de abril de 2025).",
    plazas_total: 21,
    desglose_plazas: [
      { turno: "Turno libre", cantidad: 19 },
      { turno: "Reserva para personas transexuales", cantidad: 2 },
    ],
    aspirantes_que_pasan_fase: [],
    enlaces_oficiales: [
      { titulo: "Bases de la convocatoria del Cuerpo de Funcionarios Técnicos (BOA núm. 247, 23 de diciembre de 2025)", url: "https://www.boa.aragon.es/cgi-bin/EBOA/BRSCGI?CMD=VEROBJ&MLKOB=1427866630404" },
      { titulo: "Programa de materias de Ingenieros Técnicos Industriales (Anexo IX de la Resolución de 25 de noviembre de 2025)", url: "https://www.aragon.es/documents/d/guest/ingenieros-tecnicos-industriales-pdf" },
      DGA.ficha("250090", "25/0090"),
      DGA.oep2026,
    ],
    ultima_actualizacion: "28 de octubre de 2026",
    pruebas: DGA.pruebas.tecnicosA2,
    estado: "cerrada",
    plazo_fin: "2026-01-23",
  },
});
