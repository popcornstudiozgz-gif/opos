/**
 * Ficha (sin material de estudio) de Ejecutivo/a de Informática del
 * Gobierno de Aragón: Cuerpo Ejecutivo, Escala General Administrativa (C1),
 * convocatoria 25/0105.
 *
 * Fuentes primarias leídas íntegras en la sesión:
 * - Resolución de 19 de diciembre de 2025 del Director General de la Función
 *   Pública (BOA núm. 247, de 23-12-2025), Cuerpo Ejecutivo: mismas bases
 *   que Administrativos y Agentes para la Protección de la Naturaleza
 *   (ejercicios en `DGA.pruebas.ejecutivoC1`; Bachiller, Técnico o
 *   equivalente; 16,94 €; curso de 20 horas; letra «Q»); anexo I: 17 plazas
 *   (1 reservada a víctimas de terrorismo).
 * - Programa: Anexo XXVI de la Resolución de 25-11-2025 (5 temas comunes +
 *   30 específicos), PDF en aragon.es.
 * - Ficha oficial 25/0105 en aplicaciones.aragon.es/oepc: plazo del
 *   24-12-2025 al 23-01-2026.
 * - Decreto 11/2026 (OEP 2026), anexo I: 8 plazas más, sin convocar.
 *
 * Uso: node --env-file=.env.local scripts/seed-ficha-ejecutivo-informatica-dga.mjs
 */
import { sembrarFicha, DGA } from "./lib/sembrar-ficha.mjs";

const SLUG = "ejecutivo-informatica-dga";

await sembrarFicha({
  oposicion: {
    slug: SLUG,
    nombre: "Ejecutivo/a de Informática",
    organismo: DGA.organismo,
    organismo_slug: DGA.organismo_slug,
    puesto_slug: "ejecutivo-informatica",
    descripcion_corta: "Oposición de Ejecutivo/a de Informática (C1) del Gobierno de Aragón: plazas, requisitos, examen y temario oficial.",
    descripcion_larga: "Plazas de funcionario del Cuerpo Ejecutivo de la Administración de la Comunidad Autónoma de Aragón, Escala General Administrativa, Ejecutivos de Informática (subgrupo C1). Se exige Bachiller, Técnico o equivalente. El programa tiene 35 temas —5 comunes y 30 de informática: protección de datos y Esquema Nacional de Seguridad, sistemas operativos, bases de datos, análisis y diseño, Java EE, aplicaciones móviles, ciclo de vida del software, redes locales y seguridad en redes—, y el examen son dos test el mismo día.",
  },
  convocatoria: {
    oposicion_slug: SLUG,
    numero: "BOA 247/2025 (código 25/0105)",
    organismo: DGA.organismo,
    plaza: "Ejecutivos de Informática — Cuerpo Ejecutivo de la Administración General de la Comunidad Autónoma de Aragón, Escala General Administrativa (subgrupo C1)",
    fecha_decreto: "19 de diciembre de 2025",
    sistema_seleccion: "Oposición, turno libre, seguida de un curso de formación selectivo (en línea, 20 horas, apto o no apto)",
    requisito_titulacion: "Título de Bachiller, Técnico o equivalente.",
    plazo_instancias:
      "20 días hábiles desde el día siguiente a la publicación en el BOA: del 24 de diciembre de 2025 al 23 de enero de 2026 (plazo ya cerrado). Solicitud electrónica con el modelo 524 y tasa de 16,94 €. La Oferta de Empleo Público de 2026 prevé 8 plazas más, todavía sin convocar.",
    duracion_maxima_proceso: "Los ejercicios se celebran entre los tres y los doce meses siguientes a la publicación de la convocatoria (base 1.5).",
    orden_actuacion: "Comienza por la primera persona aspirante cuyo primer apellido se inicie por la letra «Q» (sorteo del Instituto Aragonés de Administración Pública de 8 de abril de 2025).",
    plazas_total: 17,
    desglose_plazas: [
      { turno: "Turno libre", cantidad: 16 },
      { turno: "Reserva para víctimas de terrorismo", cantidad: 1 },
    ],
    aspirantes_que_pasan_fase: [],
    enlaces_oficiales: [
      { titulo: "Bases de la convocatoria del Cuerpo Ejecutivo (BOA núm. 247, 23 de diciembre de 2025)", url: "https://www.boa.aragon.es/cgi-bin/EBOA/BRSCGI?CMD=VEROBJ&MLKOB=1427868650404" },
      { titulo: "Programa de materias de Ejecutivos de Informática (Anexo XXVI de la Resolución de 25 de noviembre de 2025)", url: "https://www.aragon.es/documents/d/guest/ejecutivos-de-informatica-1-pdf" },
      DGA.ficha("250105", "25/0105"),
      DGA.oep2026,
    ],
    ultima_actualizacion: "27 de octubre de 2026",
    pruebas: DGA.pruebas.ejecutivoC1,
    estado: "cerrada",
    plazo_fin: "2026-01-23",
  },
});
