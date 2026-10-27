/**
 * Ficha (sin material de estudio) de Técnico/a de Gestión General del
 * Gobierno de Aragón: Cuerpo de Funcionarios Técnicos, Escala Técnica de
 * Gestión (A2), convocatoria 25/0095.
 *
 * Fuentes primarias leídas íntegras en la sesión:
 * - Resolución de 19 de diciembre de 2025 del Director General de la Función
 *   Pública (BOA núm. 247, de 23-12-2025), que convoca las clases del Cuerpo
 *   de Funcionarios Técnicos: base 1.3 (oposición de dos ejercicios + curso
 *   selectivo), 1.5, 2.1.e (Diplomatura, Ingeniería Técnica, Arquitectura
 *   Técnica, Grado o equivalente), 3.5 (28,90 €), 6.2 (test de 90 + 10 en
 *   dos horas), 6.3 (práctico de tres horas: 20 preguntas cortas sobre un
 *   máximo de tres supuestos + informe o dictamen, con textos y ordenador
 *   sin conexión), 8.1-8.2 (0-90 mínimo 45, error −0,3333; 0-20 mínimo 10
 *   y 0-10 mínimo 5), 10.4 (curso en línea de 40 horas), letra «Q»; anexo
 *   I: 51 plazas (1 reservada a víctimas de terrorismo).
 * - Programa: Anexo I de la Resolución de 25-11-2025 para Técnicos de
 *   Gestión General (55 temas), PDF en aragon.es.
 * - Ficha oficial 25/0095 en aplicaciones.aragon.es/oepc: plazo del
 *   24-12-2025 al 23-01-2026.
 * - Decreto 11/2026 (OEP 2026): 43 plazas de turno libre (anexo I) y 7 para
 *   personas con discapacidad física o sensorial (anexo III), sin convocar.
 *
 * Uso: node --env-file=.env.local scripts/seed-ficha-tecnico-gestion-dga.mjs
 */
import { sembrarFicha, DGA } from "./lib/sembrar-ficha.mjs";

const SLUG = "tecnico-gestion-dga";

await sembrarFicha({
  oposicion: {
    slug: SLUG,
    nombre: "Técnico/a de Gestión General",
    organismo: DGA.organismo,
    organismo_slug: DGA.organismo_slug,
    puesto_slug: "tecnico-gestion-general",
    descripcion_corta: "Oposición de Técnico/a de Gestión General (A2) del Gobierno de Aragón: plazas, requisitos, examen y temario oficial.",
    descripcion_larga: "Plazas de funcionario del Cuerpo de Funcionarios Técnicos de la Administración de la Comunidad Autónoma de Aragón, Escala Técnica de Gestión (subgrupo A2), el cuerpo de gestión de la DGA. Se exige una diplomatura o un grado. El programa tiene 55 temas: Constitución, Estatuto de Autonomía y Unión Europea, procedimiento administrativo, contratación, empleo público aragonés, presupuesto y contabilidad pública de Aragón, Seguridad Social, tributos y protección de datos. El examen es un test de 90 preguntas y un ejercicio práctico con supuestos e informe.",
  },
  convocatoria: {
    oposicion_slug: SLUG,
    numero: "BOA 247/2025 (código 25/0095)",
    organismo: DGA.organismo,
    plaza: "Técnicos de Gestión General — Cuerpo de Funcionarios Técnicos de la Administración General de la Comunidad Autónoma de Aragón, Escala Técnica de Gestión (subgrupo A2)",
    fecha_decreto: "19 de diciembre de 2025",
    sistema_seleccion: "Oposición, turno libre, seguida de un curso de formación selectivo (en línea, 40 horas, apto o no apto)",
    requisito_titulacion: "Título universitario oficial de Diplomatura, Ingeniería Técnica, Arquitectura Técnica, Grado o equivalente.",
    plazo_instancias:
      "20 días hábiles desde el día siguiente a la publicación en el BOA: del 24 de diciembre de 2025 al 23 de enero de 2026 (plazo ya cerrado). Solicitud electrónica con el modelo 524 y tasa de 28,90 €. La Oferta de Empleo Público de 2026 prevé 43 plazas más de turno libre y 7 para personas con discapacidad física o sensorial, todavía sin convocar.",
    duracion_maxima_proceso: "Los ejercicios se celebran entre los tres y los doce meses siguientes a la publicación de la convocatoria (base 1.5).",
    orden_actuacion: "Comienza por la primera persona aspirante cuyo primer apellido se inicie por la letra «Q» (sorteo del Instituto Aragonés de Administración Pública de 8 de abril de 2025).",
    plazas_total: 51,
    desglose_plazas: [
      { turno: "Turno libre", cantidad: 50 },
      { turno: "Reserva para víctimas de terrorismo", cantidad: 1 },
    ],
    aspirantes_que_pasan_fase: [],
    enlaces_oficiales: [
      { titulo: "Bases de la convocatoria del Cuerpo de Funcionarios Técnicos (BOA núm. 247, 23 de diciembre de 2025)", url: "https://www.boa.aragon.es/cgi-bin/EBOA/BRSCGI?CMD=VEROBJ&MLKOB=1427866630404" },
      { titulo: "Programa de materias de Técnicos de Gestión General (Resolución de 25 de noviembre de 2025)", url: "https://www.aragon.es/documents/d/guest/tecnico-de-gestion-general-pdf" },
      DGA.ficha("250095", "25/0095"),
      DGA.oep2026,
    ],
    ultima_actualizacion: "27 de octubre de 2026",
    pruebas: [
      {
        id: "primer-ejercicio", icono: "📝", numero: 1,
        nombre: "Primer ejercicio (teórico)",
        formato: "Test",
        duracion: "2 horas",
        opciones: "90 preguntas + 10 de reserva, 4 alternativas, 1 válida",
        detalle: "Se califica de 0 a 90 puntos y hay que sacar al menos 45. Cada acierto suma 1 punto, cada error resta 0,3333 y las preguntas en blanco no penalizan.",
      },
      {
        id: "segundo-ejercicio", icono: "📋", numero: 2,
        nombre: "Segundo ejercicio (práctico)",
        formato: "Preguntas cortas sobre supuestos + informe o dictamen",
        duracion: "3 horas",
        opciones: "20 preguntas cortas sobre un máximo de 3 supuestos",
        detalle: "Primera parte (0-20 puntos, mínimo 10): preguntas cortas sobre los supuestos. Segunda parte (0-10 puntos, mínimo 5): un informe, dictamen o análisis. Se pueden usar libros y textos propios, y un ordenador o tableta sin conexión a internet.",
      },
    ],
    estado: "cerrada",
    plazo_fin: "2026-01-23",
  },
});
