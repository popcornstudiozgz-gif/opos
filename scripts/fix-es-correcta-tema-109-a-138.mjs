/**
 * FIX: corrige el bug introducido en la sesión de hoy (Oficial Carpintero
 * y Oficial Cementerio) por el que la función auxiliar `q()` usada en
 * `insertarPreguntasConOpciones` no incluía el campo `correcta`, haciendo
 * que `es_correcta: orden === preguntas[i].correcta` evaluara siempre a
 * `false` (comparación contra `undefined`), dejando las 4 opciones de
 * cada "pregunta de test" (no de caso práctico) marcadas como incorrectas.
 *
 * Afecta a 720 preguntas en 30 temas: tema-109 a tema-138 (24 preguntas
 * de test por tema; tema-108 no se ve afectado porque usó un patrón
 * distinto). Las preguntas de casos_practicos NO están afectadas: se
 * insertan por un camino de código distinto (`crearCaso`) que fija
 * `es_correcta: idx === 0` de forma explícita.
 *
 * La corrección es segura: en todos los scripts de esta sesión, la
 * primera opción del array (`orden = 0`) es siempre, por convención y
 * verificado manualmente, la respuesta correcta — coincide con el texto
 * de la propia `explicacion` de cada pregunta. Este script marca
 * `es_correcta = true` en la opción `orden = 0` de cada pregunta afectada
 * (detectada dinámicamente como aquella con 0 opciones marcadas
 * correctas), sin tocar ninguna pregunta ya correcta ni ninguna de
 * casos_practicos.
 *
 * Uso: node --env-file=.env.local scripts/fix-es-correcta-tema-109-a-138.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

async function get(path) {
  const res = await fetch(`${URL_BASE}/rest/v1/${path}`, { headers: HEADERS });
  if (!res.ok) { console.error(`❌ GET ${path}: ${res.status} ${await res.text()}`); process.exit(1); }
  return res.json();
}
async function patchOpcion(id, body) {
  const res = await fetch(`${URL_BASE}/rest/v1/opciones?id=eq.${id}`, {
    method: "PATCH",
    headers: { ...HEADERS, Prefer: "return=minimal" },
    body: JSON.stringify(body),
  });
  if (!res.ok) { console.error(`❌ PATCH opciones id=${id}: ${res.status} ${await res.text()}`); process.exit(1); }
}

const temas = [];
for (let i = 109; i <= 138; i++) temas.push(`tema-${i}`);

let totalFixed = 0;
let totalSkippedAlreadyOk = 0;
const detail = {};

for (const t of temas) {
  const preguntas = await get(`preguntas?tema_slug=eq.${t}&select=id`);
  let fixedInTema = 0;
  for (const p of preguntas) {
    const ops = await get(`opciones?pregunta_id=eq.${p.id}&select=id,orden,es_correcta`);
    const nCorrect = ops.filter((o) => o.es_correcta).length;
    if (nCorrect === 1) { totalSkippedAlreadyOk++; continue; }
    if (nCorrect > 1) { console.log(`   ⚠ ${t} pregunta ${p.id}: ${nCorrect} opciones ya marcadas correctas — SE OMITE, revisar manualmente`); continue; }
    // nCorrect === 0: aplicar el fix
    const first = ops.find((o) => o.orden === 0);
    if (!first) { console.log(`   ⚠ ${t} pregunta ${p.id}: no tiene opción con orden=0 — SE OMITE, revisar manualmente`); continue; }
    await patchOpcion(first.id, { es_correcta: true });
    fixedInTema++;
    totalFixed++;
  }
  if (fixedInTema > 0) { detail[t] = fixedInTema; console.log(`   ✓ ${t}: ${fixedInTema} preguntas corregidas`); }
}

console.log("\n=== Resumen ===");
console.log("Preguntas corregidas:", totalFixed);
console.log("Preguntas que ya estaban bien (sin tocar):", totalSkippedAlreadyOk);
console.log("Temas con al menos una corrección:", Object.keys(detail).length);
console.log("\n✅ Fix completado.");
