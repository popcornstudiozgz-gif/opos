/**
 * Ficha (sin material de estudio) de Economista del Gobierno de Aragón:
 * Cuerpo de Funcionarios Superiores, Escala de Economistas (A1),
 * convocatoria 25/0053.
 *
 * Fuentes primarias leídas íntegras en la sesión:
 * - Resolución de 19 de diciembre de 2025 del Director General de la Función
 *   Pública (BOA núm. 247, de 23-12-2025), Cuerpo de Funcionarios Superiores:
 *   mismas bases que Veterinarios (ver seed-ficha-veterinario-dga.mjs).
 * - Programa: Anexo VII de la Resolución de 25-11-2025 (15 temas comunes +
 *   75 específicos en seis apartados numerados de forma continua, que aquí
 *   van en un solo bloque), PDF en aragon.es. **Laguna:** en ese PDF el tema
 *   específico 10 sale sin enunciado («10. -») y al 8 le falta texto
 *   («Economía del bienestar (I): t … de mercado como fundamento de la
 *   intervención del Sector Público»); comprobado con dos extractores
 *   distintos: el texto no está en el documento. La Resolución publicada en
 *   el BOA núm. 243 (17-12-2025) solo remite a mia.aragon.es (CSV
 *   CSVG68H0X32IP1Q0XFIL, con sesión). Se muestran así, sin inventar nada.
 * - Ficha oficial 25/0053 en aplicaciones.aragon.es/oepc: titulación, plazo
 *   del 24-12-2025 al 23-01-2026 y 10 plazas de turno libre.
 * - Decreto 11/2026 (OEP 2026), anexo I: 8 plazas más, sin convocar.
 *
 * Uso: node --env-file=.env.local scripts/seed-ficha-economista-dga.mjs
 */
import { sembrarFicha, DGA } from "./lib/sembrar-ficha.mjs";

const SLUG = "economista-dga";

await sembrarFicha({
  oposicion: {
    slug: SLUG,
    nombre: "Economista",
    organismo: DGA.organismo,
    organismo_slug: DGA.organismo_slug,
    puesto_slug: "economista",
    descripcion_corta: "Oposición de Economista (A1) del Gobierno de Aragón: plazas, requisitos, examen y temario oficial.",
    descripcion_larga: "Plazas de funcionario del Cuerpo de Funcionarios Superiores de la Administración de la Comunidad Autónoma de Aragón, Escala de Economistas (subgrupo A1). Se exige la licenciatura o el grado en Administración y Dirección de Empresas, Economía, Finanzas y Contabilidad, Marketing o equivalente. El programa tiene 90 temas —15 comunes y 75 específicos: economía general, economía española, internacional y aragonesa, economía de la empresa y cálculo financiero, economía del sector público, hacienda y administración pública en Aragón, y econometría—, y el examen es un test de 100 preguntas y un práctico con supuestos e informe.",
  },
  convocatoria: {
    oposicion_slug: SLUG,
    numero: "BOA 247/2025 (código 25/0053)",
    organismo: DGA.organismo,
    plaza: "Economistas — Cuerpo de Funcionarios Superiores de la Administración de la Comunidad Autónoma de Aragón, Escala de Economistas (subgrupo A1)",
    fecha_decreto: "19 de diciembre de 2025",
    sistema_seleccion: "Oposición, turno libre, seguida de un curso de formación selectivo (en línea, 40 horas, apto o no apto)",
    requisito_titulacion: "Título universitario oficial de Licenciatura o Grado en Administración y Dirección de Empresas, Economía, Finanzas y Contabilidad, Marketing e Investigación de Mercados, o equivalente.",
    plazo_instancias:
      "20 días hábiles desde el día siguiente a la publicación en el BOA: del 24 de diciembre de 2025 al 23 de enero de 2026 (plazo ya cerrado). Solicitud electrónica con el modelo 524 y tasa de 39,98 €. La Oferta de Empleo Público de 2026 prevé 8 plazas más, todavía sin convocar.",
    duracion_maxima_proceso: "Los ejercicios se celebran entre los tres y los doce meses siguientes a la publicación de la convocatoria (base 1.5).",
    orden_actuacion: "Comienza por la primera persona aspirante cuyo primer apellido se inicie por la letra «Q» (sorteo del Instituto Aragonés de Administración Pública de 8 de abril de 2025).",
    plazas_total: 10,
    desglose_plazas: [{ turno: "Turno libre", cantidad: 10 }],
    aspirantes_que_pasan_fase: [],
    enlaces_oficiales: [
      { titulo: "Bases de la convocatoria del Cuerpo de Funcionarios Superiores (BOA núm. 247, 23 de diciembre de 2025)", url: "https://www.boa.aragon.es/cgi-bin/EBOA/BRSCGI?CMD=VEROBJ&MLKOB=1427864610404" },
      { titulo: "Programa de materias de Economistas (Anexo VII de la Resolución de 25 de noviembre de 2025)", url: "https://www.aragon.es/documents/d/guest/economistas-pdf" },
      DGA.ficha("250053", "25/0053"),
      DGA.oep2026,
    ],
    ultima_actualizacion: "28 de octubre de 2026",
    pruebas: DGA.pruebas.superioresA1,
    estado: "cerrada",
    plazo_fin: "2026-01-23",
  },
});
