/**
 * Corrige tema-42 (Ley de capitalidad de Zaragoza y Haciendas Locales,
 * usado por las 16 "Oficial X"): presentaba el Impuesto sobre Vehículos de
 * Tracción Mecánica (IVTM) como impuesto potestativo y decía que los
 * obligatorios eran "dos" (IBI e IAE).
 *
 * Según el art. 59 del texto refundido de la Ley reguladora de las
 * Haciendas Locales (RDLeg 2/2004, BOE-A-2004-4214), leído en la sesión:
 * - 59.1: los ayuntamientos exigirán el IBI, el IAE y el IVTM (obligatorios).
 * - 59.2: podrán establecer y exigir el ICIO y el IIVTNU (potestativos).
 * tema-12 ya lo recogía correctamente; el error estaba solo en tema-42
 * (detectado al preparar el Tema 5 de Bombero/a Conductor/a).
 *
 * Uso: node --env-file=.env.local scripts/fix-tema-42-ivtm-obligatorio.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json", Prefer: "return=representation" };

async function actualizar(tabla, id, campos) {
  const res = await fetch(`${URL_BASE}/rest/v1/${tabla}?id=eq.${id}`, { method: "PATCH", headers: HEADERS, body: JSON.stringify(campos) });
  if (!res.ok) { console.error(`❌ ${tabla} ${id}: ${res.status} ${await res.text()}`); process.exit(1); }
  const filas = await res.json();
  if (filas.length !== 1) { console.error(`❌ ${tabla} ${id}: se esperaba 1 fila, actualizadas ${filas.length}`); process.exit(1); }
  console.log(`   ✓ ${tabla} ${id}`);
}

await actualizar("flashcards", "93aed987-8ed4-4333-8668-162071acc513", {
  anverso: "¿Qué impuestos municipales son de exacción obligatoria según la Ley reguladora de las Haciendas Locales (art. 59.1)?",
  reverso: "El Impuesto sobre Bienes Inmuebles (IBI), el Impuesto sobre Actividades Económicas (IAE) y el Impuesto sobre Vehículos de Tracción Mecánica (IVTM)",
});
await actualizar("flashcards", "dde95065-4093-4de9-8f76-e574b7a3ce48", {
  anverso: "¿Qué impuestos municipales son de exacción potestativa (voluntaria) según el art. 59.2 de la Ley reguladora de las Haciendas Locales?",
  reverso: "El Impuesto sobre Construcciones, Instalaciones y Obras (ICIO) y el Impuesto sobre el Incremento de Valor de los Terrenos de Naturaleza Urbana (IIVTNU o \"plusvalía municipal\"), que el Ayuntamiento puede establecer mediante ordenanza fiscal",
});

await actualizar("preguntas", "8511742e-9cd3-4016-8284-b05b24138c12", {
  enunciado: "¿Cuáles son los impuestos municipales de exacción obligatoria?",
  explicacion: "Según el art. 59.1 de la Ley reguladora de las Haciendas Locales, los ayuntamientos exigirán el IBI, el IAE y el IVTM.",
});
await actualizar("opciones", "4aed3711-67d3-4972-9a74-11f4b8b58ea8", { texto: "El IBI, el IAE y el IVTM" });
await actualizar("opciones", "0d6ffa2c-055a-463b-9b20-8e91a3498818", { texto: "Solo el IBI" });

await actualizar("preguntas", "dae5e1fe-bc16-4bf6-a6ae-7cb947be734b", {
  explicacion: "El Impuesto sobre Construcciones, Instalaciones y Obras (ICIO) es potestativo según el art. 59.2 de la Ley reguladora de las Haciendas Locales; el IBI, el IAE y el IVTM son obligatorios (art. 59.1).",
});
await actualizar("opciones", "65adcd85-cf1b-4855-8f3c-6b099096087b", { texto: "El Impuesto sobre Construcciones, Instalaciones y Obras" });

console.log("\n✅ tema-42 corregido: el IVTM figura ya como impuesto obligatorio.");
