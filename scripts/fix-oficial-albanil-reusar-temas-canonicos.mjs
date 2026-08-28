/**
 * Corrección: el "Tema 1" del programa de Oficial Albañil (Ayto. Zaragoza)
 * agrupa Constitución + Estatuto de Aragón + LPACAP, pero esos tres bloques
 * YA EXISTEN como temas canónicos (tema-1, tema-3, tema-7) con una
 * granularidad de secciones que encaja casi exactamente con lo que pide
 * este programa. Crear tema-41 como contenido nuevo duplicaba ese trabajo
 * en lugar de reutilizarlo con `secciones_incluidas`, rompiendo el patrón
 * de recorte ya usado en el resto de la web.
 *
 * Esta corrección:
 * 1. Elimina tema-41 (tema_oposicion, opciones, preguntas, flashcards y el
 *    propio tema) — no lo usa ninguna otra oposición todavía.
 * 2. Da de alta tema-1, tema-3 y tema-7 como los temas 1, 2 y 3 de la
 *    oposición, recortados con `secciones_incluidas` a las secciones que
 *    pide el programa de Oficial Albañil.
 * 3. Renumera tema-42/43/44 a los temas 4, 5 y 6.
 *
 * Uso: node --env-file=.env.local scripts/fix-oficial-albanil-reusar-temas-canonicos.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const OPOSICION = "oficial-albanil-ayto-zaragoza";

async function get(tabla, query) {
  const res = await fetch(`${URL_BASE}/rest/v1/${tabla}?${query}`, { headers: HEADERS });
  if (!res.ok) throw new Error(`GET ${tabla}: ${res.status} ${await res.text()}`);
  return res.json();
}

async function del(tabla, query) {
  const res = await fetch(`${URL_BASE}/rest/v1/${tabla}?${query}`, { method: "DELETE", headers: HEADERS });
  if (!res.ok) throw new Error(`DELETE ${tabla}: ${res.status} ${await res.text()}`);
}

async function patch(tabla, query, body) {
  const res = await fetch(`${URL_BASE}/rest/v1/${tabla}?${query}`, { method: "PATCH", headers: HEADERS, body: JSON.stringify(body) });
  if (!res.ok) throw new Error(`PATCH ${tabla}: ${res.status} ${await res.text()}`);
  // Sin Prefer: return=representation, PATCH devuelve el cuerpo vacío.
}

async function insertar(tabla, filas) {
  const res = await fetch(`${URL_BASE}/rest/v1/${tabla}`, { method: "POST", headers: { ...HEADERS, Prefer: "return=representation" }, body: JSON.stringify(filas) });
  if (!res.ok) throw new Error(`POST ${tabla}: ${res.status} ${await res.text()}`);
  return res.json();
}

console.log("🗑️  Eliminando tema-41 (contenido duplicado)...");
const preguntasT41 = await get("preguntas", "tema_slug=eq.tema-41&select=id");
if (preguntasT41.length > 0) {
  const ids = preguntasT41.map((p) => p.id).join(",");
  await del("opciones", `pregunta_id=in.(${ids})`);
  console.log(`   ✓ opciones eliminadas (${preguntasT41.length} preguntas afectadas)`);
}
await del("preguntas", "tema_slug=eq.tema-41");
console.log("   ✓ preguntas eliminadas");
await del("flashcards", "tema_slug=eq.tema-41");
console.log("   ✓ flashcards eliminadas");
await del("tema_oposicion", `oposicion_slug=eq.${OPOSICION}&tema_slug=eq.tema-41`);
console.log("   ✓ tema_oposicion eliminado");
await del("temas", "slug=eq.tema-41");
console.log("   ✓ tema-41 eliminado");

console.log("\n🔧 Renumerando tema-42/43/44 a los puestos 4, 5 y 6...");
// Orden descendente: hay una restricción UNIQUE(oposicion_slug, numero), así
// que hay que liberar primero los números altos antes de asignarlos.
await patch("tema_oposicion", `oposicion_slug=eq.${OPOSICION}&tema_slug=eq.tema-44`, { numero: 6, orden: 6 });
await patch("tema_oposicion", `oposicion_slug=eq.${OPOSICION}&tema_slug=eq.tema-43`, { numero: 5, orden: 5 });
await patch("tema_oposicion", `oposicion_slug=eq.${OPOSICION}&tema_slug=eq.tema-42`, { numero: 4, orden: 4 });
console.log("   ✓ renumerados");

console.log("\n📎 Reutilizando tema-1, tema-3 y tema-7 (recortados) como temas 1, 2 y 3...");
const [bloque1] = await get("bloques", `oposicion_slug=eq.${OPOSICION}&slug=eq.bloque-1&select=id`);

await insertar("tema_oposicion", [
  {
    tema_slug: "tema-1",
    oposicion_slug: OPOSICION,
    bloque_id: bloque1.id,
    numero: 1,
    orden: 1,
    es_premium: false,
    publicado: true,
    // Estructura y título preliminar; Administración pública (Título IV);
    // organización territorial, principios generales y Admin. local (Título VIII, cap. I y II).
    secciones_incluidas: ["titulo-preliminar", "titulo-4", "titulo-8-cap-1", "titulo-8-cap-2"],
  },
  {
    tema_slug: "tema-3",
    oposicion_slug: OPOSICION,
    bloque_id: bloque1.id,
    numero: 2,
    orden: 2,
    es_premium: false,
    publicado: true,
    // Título preliminar y organización institucional (Cortes, Presidente, Gobierno, Justicia).
    secciones_incluidas: ["titulo-preliminar", "titulo-2-cap-1", "titulo-2-cap-2", "titulo-2-cap-3", "titulo-2-cap-4"],
  },
  {
    tema_slug: "tema-7",
    oposicion_slug: OPOSICION,
    bloque_id: bloque1.id,
    numero: 3,
    orden: 3,
    es_premium: false,
    publicado: true,
    // El programa pide "disposiciones sobre el procedimiento administrativo
    // común" sin más precisión: se incluye el tema completo (sin recorte).
    secciones_incluidas: null,
  },
]);
console.log("   ✓ tema-1, tema-3 y tema-7 asignados");

console.log("\n✅ Corrección aplicada: temas 1-3 ahora reutilizan contenido canónico existente; 4-6 son tema-42/43/44 renumerados.");
