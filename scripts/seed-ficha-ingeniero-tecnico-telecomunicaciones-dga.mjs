/**
 * Ficha (sin material de estudio) de Ingeniero/a Técnico/a de
 * Telecomunicaciones del Gobierno de Aragón: Cuerpo de Funcionarios
 * Técnicos, Escala Técnica Facultativa (A2), convocatoria 25/0092.
 *
 * Fuentes primarias leídas íntegras en la sesión:
 * - Resolución de 19 de diciembre de 2025 del Director General de la Función
 *   Pública (BOA núm. 247, de 23-12-2025), Cuerpo de Funcionarios Técnicos:
 *   mismas bases que Técnicos de Gestión General (ejercicios en
 *   `DGA.pruebas.tecnicosA2`; 28,90 €; curso de 40 horas; letra «Q»);
 *   anexo I: 15 plazas (1 reservada a personas transexuales).
 * - Programa: Anexo XI de la Resolución de 25-11-2025 (10 temas comunes + 45
 *   específicos), PDF en aragon.es.
 * - Ficha oficial 25/0092 en aplicaciones.aragon.es/oepc: OEP 2024;
 *   titulación y plazo del 24-12-2025 al 23-01-2026.
 *
 * Uso: node --env-file=.env.local scripts/seed-ficha-ingeniero-tecnico-telecomunicaciones-dga.mjs
 */
import { sembrarFicha, DGA } from "./lib/sembrar-ficha.mjs";

const SLUG = "ingeniero-tecnico-telecomunicaciones-dga";

await sembrarFicha({
  oposicion: {
    slug: SLUG,
    nombre: "Ingeniero/a Técnico/a de Telecomunicaciones",
    organismo: DGA.organismo,
    organismo_slug: DGA.organismo_slug,
    puesto_slug: "ingeniero-tecnico-telecomunicaciones",
    descripcion_corta: "Oposición de Ingeniero/a Técnico/a de Telecomunicaciones (A2) del Gobierno de Aragón: plazas, requisitos, examen y temario oficial.",
    descripcion_larga: "Plazas de funcionario del Cuerpo de Funcionarios Técnicos de la Administración de la Comunidad Autónoma de Aragón, Escala Técnica Facultativa, Ingenieros Técnicos de Telecomunicaciones (subgrupo A2). Se exige la ingeniería técnica de telecomunicaciones, la ingeniería de telecomunicaciones o un grado que habilite para esta profesión. El programa tiene 55 temas —10 comunes y 45 específicos: Ley General de Telecomunicaciones y dominio radioeléctrico, satélite, comunicaciones móviles, redes locales e infraestructuras, telefonía, centros de proceso de datos, almacenamiento, cloud, criptografía, Internet y sistemas de información geográfica—, y el examen es un test de 90 preguntas y un práctico con supuestos e informe.",
  },
  convocatoria: {
    oposicion_slug: SLUG,
    numero: "BOA 247/2025 (código 25/0092)",
    organismo: DGA.organismo,
    plaza: "Ingenieros Técnicos de Telecomunicaciones — Cuerpo de Funcionarios Técnicos de la Administración de la Comunidad Autónoma de Aragón, Escala Técnica Facultativa (subgrupo A2)",
    fecha_decreto: "19 de diciembre de 2025",
    sistema_seleccion: "Oposición, turno libre, seguida de un curso de formación selectivo (en línea, 40 horas, apto o no apto)",
    requisito_titulacion: "Título universitario oficial de Ingeniería de Telecomunicaciones, Ingeniería Técnica de Telecomunicaciones o título de Grado que habilite para el ejercicio de esta profesión regulada.",
    plazo_instancias:
      "20 días hábiles desde el día siguiente a la publicación en el BOA: del 24 de diciembre de 2025 al 23 de enero de 2026 (plazo ya cerrado). Solicitud electrónica con el modelo 524 y tasa de 28,90 €.",
    duracion_maxima_proceso: "Los ejercicios se celebran entre los tres y los doce meses siguientes a la publicación de la convocatoria (base 1.5).",
    orden_actuacion: "Comienza por la primera persona aspirante cuyo primer apellido se inicie por la letra «Q» (sorteo del Instituto Aragonés de Administración Pública de 8 de abril de 2025).",
    plazas_total: 15,
    desglose_plazas: [
      { turno: "Turno libre", cantidad: 14 },
      { turno: "Reserva para personas transexuales", cantidad: 1 },
    ],
    aspirantes_que_pasan_fase: [],
    enlaces_oficiales: [
      { titulo: "Bases de la convocatoria del Cuerpo de Funcionarios Técnicos (BOA núm. 247, 23 de diciembre de 2025)", url: "https://www.boa.aragon.es/cgi-bin/EBOA/BRSCGI?CMD=VEROBJ&MLKOB=1427866630404" },
      { titulo: "Programa de materias de Ingenieros Técnicos de Telecomunicaciones (Anexo XI de la Resolución de 25 de noviembre de 2025)", url: "https://www.aragon.es/documents/d/guest/ingenieros-tecnicos-de-telecomunicaciones-pdf" },
      DGA.ficha("250092", "25/0092"),
      DGA.portal,
    ],
    ultima_actualizacion: "28 de octubre de 2026",
    pruebas: DGA.pruebas.tecnicosA2,
    estado: "cerrada",
    plazo_fin: "2026-01-23",
  },
});
