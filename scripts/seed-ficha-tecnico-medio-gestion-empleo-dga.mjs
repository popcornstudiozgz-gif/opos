/**
 * Ficha (sin material de estudio) de Técnico/a Medio de Gestión de Empleo
 * del Gobierno de Aragón: Cuerpo de Funcionarios Técnicos, Escala Técnica de
 * Gestión (A2), convocatoria 25/0099.
 *
 * Fuentes primarias leídas íntegras en la sesión:
 * - Resolución de 19 de diciembre de 2025 del Director General de la Función
 *   Pública (BOA núm. 247, de 23-12-2025), Cuerpo de Funcionarios Técnicos
 *   (ejercicios en `DGA.pruebas.tecnicosA2`); anexo I: 12 plazas (2
 *   reservadas a víctimas de terrorismo).
 * - Programa: Anexo IV de la Resolución de 25-11-2025 (55 temas), PDF en
 *   aragon.es.
 * - Ficha oficial 25/0099 en aplicaciones.aragon.es/oepc: OEP 2024 y 2025;
 *   plazo del 24-12-2025 al 23-01-2026.
 * - Decreto 11/2026 (OEP 2026): 16 plazas de turno libre (anexo I) y 4 para
 *   personas con discapacidad física o sensorial (anexo III), sin convocar.
 *
 * Uso: node --env-file=.env.local scripts/seed-ficha-tecnico-medio-gestion-empleo-dga.mjs
 */
import { sembrarFicha, DGA } from "./lib/sembrar-ficha.mjs";

const SLUG = "tecnico-medio-gestion-empleo-dga";

await sembrarFicha({
  oposicion: {
    slug: SLUG,
    nombre: "Técnico/a Medio de Gestión de Empleo",
    organismo: DGA.organismo,
    organismo_slug: DGA.organismo_slug,
    puesto_slug: "tecnico-medio-gestion-empleo",
    descripcion_corta: "Oposición de Técnico/a Medio de Gestión de Empleo (A2) del Gobierno de Aragón: plazas, requisitos, examen y temario oficial.",
    descripcion_larga: "Plazas de funcionario del Cuerpo de Funcionarios Técnicos de la Administración de la Comunidad Autónoma de Aragón, Escala Técnica de Gestión, Técnicos Medios de Gestión de Empleo (subgrupo A2), con un programa centrado en el Instituto Aragonés de Empleo (INAEM) y las políticas de empleo. Se exige una diplomatura o un grado. El programa tiene 55 temas: derecho constitucional y administrativo, calidad, presupuesto, derecho del trabajo y relaciones laborales, y políticas activas de empleo —intermediación, orientación, formación en alternancia, apoyo al emprendimiento—. El examen es un test de 90 preguntas y un práctico con supuestos e informe.",
  },
  convocatoria: {
    oposicion_slug: SLUG,
    numero: "BOA 247/2025 (código 25/0099)",
    organismo: DGA.organismo,
    plaza: "Técnicos Medios de Gestión de Empleo — Cuerpo de Funcionarios Técnicos de la Administración General de la Comunidad Autónoma de Aragón, Escala Técnica de Gestión (subgrupo A2)",
    fecha_decreto: "19 de diciembre de 2025",
    sistema_seleccion: "Oposición, turno libre, seguida de un curso de formación selectivo (en línea, 40 horas, apto o no apto)",
    requisito_titulacion: "Título universitario oficial de Diplomatura universitaria, Ingeniería Técnica, Arquitectura Técnica, Grado o equivalente.",
    plazo_instancias:
      "20 días hábiles desde el día siguiente a la publicación en el BOA: del 24 de diciembre de 2025 al 23 de enero de 2026 (plazo ya cerrado). Solicitud electrónica con el modelo 524 y tasa de 28,90 €. La Oferta de Empleo Público de 2026 prevé 16 plazas más de turno libre y 4 para personas con discapacidad física o sensorial, todavía sin convocar.",
    duracion_maxima_proceso: "Los ejercicios se celebran entre los tres y los doce meses siguientes a la publicación de la convocatoria (base 1.5).",
    orden_actuacion: "Comienza por la primera persona aspirante cuyo primer apellido se inicie por la letra «Q» (sorteo del Instituto Aragonés de Administración Pública de 8 de abril de 2025).",
    plazas_total: 12,
    desglose_plazas: [
      { turno: "Turno libre", cantidad: 10 },
      { turno: "Reserva para víctimas de terrorismo", cantidad: 2 },
    ],
    aspirantes_que_pasan_fase: [],
    enlaces_oficiales: [
      { titulo: "Bases de la convocatoria del Cuerpo de Funcionarios Técnicos (BOA núm. 247, 23 de diciembre de 2025)", url: "https://www.boa.aragon.es/cgi-bin/EBOA/BRSCGI?CMD=VEROBJ&MLKOB=1427866630404" },
      { titulo: "Programa de materias de Técnicos Medios de Gestión de Empleo (Resolución de 25 de noviembre de 2025)", url: "https://www.aragon.es/documents/d/guest/tecnico-medio-de-gestion-de-empleo-pdf" },
      DGA.ficha("250099", "25/0099"),
      DGA.oep2026,
    ],
    ultima_actualizacion: "27 de octubre de 2026",
    pruebas: DGA.pruebas.tecnicosA2,
    estado: "cerrada",
    plazo_fin: "2026-01-23",
  },
});
