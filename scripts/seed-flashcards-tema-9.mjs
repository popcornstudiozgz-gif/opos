/**
 * Tema-9: Ley 9/2017 de Contratos del Sector Público — Delimitación de los
 * tipos contractuales (arts. 12-18) + Competencias en materia de
 * contratación en las Entidades Locales y normas específicas de
 * contratación local (Disp. adicionales 2ª y 3ª). Alcance deliberadamente
 * acotado al temario de esta oposición: la LCSP tiene ~347 artículos que
 * regulan TODA la contratación pública española (defensa, UE, instrumentos
 * financieros...); el resto queda fuera por no aportar valor de examen
 * aquí y tener un coste de generación desproporcionado.
 *
 * Uso: node --env-file=.env.local scripts/seed-flashcards-tema-9.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

async function insertBatch(filas) {
  const res = await fetch(`${URL_BASE}/rest/v1/flashcards`, { method: "POST", headers: { ...HEADERS, Prefer: "return=minimal" }, body: JSON.stringify(filas) });
  if (!res.ok) { console.error(`❌ ${res.status} ${await res.text()}`); process.exit(1); }
}

const TEMA = "tema-9";
const c = (seccion, anverso, reverso) => ({ tema_slug: TEMA, seccion, anverso, reverso });

const CARDS = [
  // Delimitación de los tipos contractuales (arts. 12-18)
  c("tipos-contractuales", "¿Qué es el contrato de obras (art. 13.1)?", "El que tiene por objeto la ejecución de una obra, sola o con su proyecto, o un trabajo del Anexo I, o una obra según requisitos fijados por la entidad contratante"),
  c("tipos-contractuales", "¿Qué se entiende por \"obra\" (art. 13.2)?", "El resultado de un conjunto de trabajos de construcción o ingeniería civil, destinado a cumplir por sí mismo una función económica o técnica, sobre un bien inmueble"),
  c("tipos-contractuales", "¿A qué deben referirse los contratos de obras (art. 13.3)?", "A una obra completa, susceptible de ser entregada al uso general o servicio correspondiente"),
  c("tipos-contractuales", "¿Qué es la concesión de obras (art. 14.1)?", "Contrato por el que el concesionario realiza una obra y su contraprestación es el derecho a explotarla, con o sin precio adicional"),
  c("tipos-contractuales", "¿Qué implica el derecho de explotación en la concesión de obras (art. 14.4)?", "La transferencia al concesionario de un riesgo operacional (riesgo de demanda y/o de suministro)"),
  c("tipos-contractuales", "¿Qué es la concesión de servicios (art. 15.1)?", "Contrato por el que uno o varios poderes adjudicadores encomiendan la gestión de un servicio de su titularidad, cuya contrapartida es el derecho a explotarlo (con o sin precio)"),
  c("tipos-contractuales", "¿Qué es el contrato de suministro (art. 16.1)?", "El que tiene por objeto la adquisición, arrendamiento financiero o arrendamiento (con o sin opción de compra) de productos o bienes muebles"),
  c("tipos-contractuales", "Cita 2 supuestos que se consideran siempre contrato de suministro (art. 16.3)", "Entregas sucesivas de bienes sin cuantía total definida (según necesidades del adquirente); adquisición/arrendamiento de equipos informáticos y de telecomunicaciones; contratos de fabricación con características fijadas por la entidad; adquisición de energía"),
  c("tipos-contractuales", "¿Qué es el contrato de servicios (art. 17)?", "Aquel cuyo objeto son prestaciones de hacer (actividad o resultado) distinto de una obra o suministro; no puede implicar ejercicio de autoridad pública"),
  c("tipos-contractuales", "¿Qué es un contrato mixto (art. 18.1)?", "El que contiene prestaciones correspondientes a otro u otros contratos de distinta clase"),
  c("tipos-contractuales", "¿Qué criterio se sigue para calificar un contrato mixto de obras/suministros/servicios (art. 18.1.a)?", "Se atiende al carácter de la prestación principal"),

  // Disposición adicional segunda: Competencias de contratación en Entidades Locales
  c("competencias-entidades-locales", "¿Qué competencias de contratación tienen los Alcaldes/Presidentes de Entidades Locales (Disp. ad. 2ª.1)?", "Como órgano de contratación en obras, suministro, servicios, concesión de obras/servicios y contratos administrativos especiales, cuando el valor no supere el 10% de los recursos ordinarios del presupuesto ni 6 millones de euros"),
  c("competencias-entidades-locales", "¿Qué competencias tiene el Pleno según la Disp. ad. 2ª.2?", "La contratación cuando por valor o duración exceda las competencias del Alcalde/Presidente, y la aprobación de los pliegos de cláusulas administrativas generales"),
  c("competencias-entidades-locales", "¿Quién ejerce las competencias de contratación en los municipios de gran población (Disp. ad. 2ª.4)?", "La Junta de Gobierno Local, cualquiera que sea el importe o duración del contrato; el Pleno aprueba los pliegos generales"),
  c("competencias-entidades-locales", "¿Qué son las Juntas de Contratación (Disp. ad. 2ª.5)?", "Órganos de constitución potestativa que actúan como órgano de contratación en obras de reparación/conservación simples, suministros de bienes consumibles y servicios de bajo valor"),
  c("competencias-entidades-locales", "¿Quién debe formar parte necesariamente de la Junta de Contratación (Disp. ad. 2ª.5)?", "El Secretario (o titular del asesoramiento jurídico) y el Interventor"),
  c("competencias-entidades-locales", "¿Cómo pueden ejercer la contratación los municipios de menos de 5.000 habitantes (Disp. ad. 2ª.6)?", "Mediante centrales de contratación, o encomendando la gestión a Diputaciones provinciales o CCAA uniprovinciales"),
  c("competencias-entidades-locales", "¿Quién preside la Mesa de contratación y quiénes son vocales necesarios (Disp. ad. 2ª.7)?", "La preside un miembro de la Corporación o funcionario; son vocales necesarios el Secretario (o titular de asesoría jurídica) y el Interventor, con un mínimo de 3 miembros en total"),
  c("competencias-entidades-locales", "¿Puede el personal eventual formar parte de la Mesa de contratación (Disp. ad. 2ª.7)?", "No, en ningún caso"),
  c("competencias-entidades-locales", "¿Qué competencia tienen los Alcaldes/Presidentes sobre contratos privados y bienes (Disp. ad. 2ª.9)?", "Celebrar contratos privados, adjudicar concesiones sobre bienes y adquirir inmuebles/derechos cuando no supere el 10% de recursos ordinarios ni 3 millones de euros"),
  c("competencias-entidades-locales", "¿Qué corresponde siempre al Pleno según la Disp. ad. 2ª.10?", "Los contratos privados, concesiones y adquisiciones que excedan las competencias del Alcalde, y la enajenación de bienes de valor histórico o artístico, cualquiera que sea su valor"),

  // Disposición adicional tercera: Normas específicas de contratación local
  c("normas-especificas-locales", "¿Qué pueden tramitarse anticipadamente según la Disp. ad. 3ª.2?", "Contratos cuya ejecución comience el ejercicio siguiente, o cuya financiación dependa de préstamo/crédito/subvención, sometidos a condición suspensiva"),
  c("normas-especificas-locales", "¿Quién ejerce los actos de fiscalización en la Entidad Local (Disp. ad. 3ª.3)?", "El órgano Interventor de la Entidad Local, incluyendo la comprobación material de la inversión"),
  c("normas-especificas-locales", "¿Qué pueden sustituir a la aprobación del gasto en municipios de menos de 5.000 habitantes (Disp. ad. 3ª.4)?", "Una certificación de existencia de crédito expedida por el Secretario Interventor o el Interventor"),
  c("normas-especificas-locales", "¿Quién puede supervisar los proyectos de obras si el municipio carece de oficina propia (Disp. ad. 3ª.6)?", "La Diputación provincial o la Administración autonómica uniprovincial correspondiente"),
  c("normas-especificas-locales", "¿Quién evacúa los informes jurídicos que la Ley asigna a los servicios jurídicos (Disp. ad. 3ª.8)?", "El Secretario de la Corporación (siendo preceptivo en aprobación de expedientes, modificaciones, revisión de precios, prórrogas, interpretación y resolución de contratos)"),
  c("normas-especificas-locales", "¿Hasta cuántos años puede aplazarse el pago en la adquisición de bienes inmuebles (Disp. ad. 3ª.9)?", "Hasta 4 años, con sujeción a la normativa de Haciendas Locales sobre compromisos de gastos futuros"),
  c("normas-especificas-locales", "¿Qué pueden licitar los municipios de menos de 20.000 habitantes (Disp. ad. 3ª.11)?", "Contratos de concesión de servicios no armonizados que gestionen 2 o más servicios públicos diferentes, si la anualidad media no supera 200.000 € y se justifica la gestión unificada"),
];

console.log(`📝 Insertando ${CARDS.length} flashcards de tema-9...`);
await insertBatch(CARDS);

const SECCIONES_AUX_ADMIN = ["tipos-contractuales", "competencias-entidades-locales", "normas-especificas-locales"];
const patchTO = await fetch(`${URL_BASE}/rest/v1/tema_oposicion?tema_slug=eq.tema-9&oposicion_slug=eq.auxiliar-administrativo`, {
  method: "PATCH", headers: { ...HEADERS, Prefer: "return=representation" }, body: JSON.stringify({ secciones_incluidas: SECCIONES_AUX_ADMIN }),
});
if (!patchTO.ok) { console.error(`❌ ${patchTO.status} ${await patchTO.text()}`); process.exit(1); }
console.log("✅ tema_oposicion (auxiliar-administrativo, tema-9) limitado a:", SECCIONES_AUX_ADMIN);
console.log("✅ Tema-9 completado (alcance acotado al temario).");
