/**
 * Vincula el tema canónico tema-52 ("Innovación de materiales para
 * tabiquería interior y muros de fachada", ya creado para Oficial
 * Albañil) como Tema 9 (numero=11, bloque-2) de Oficial Cementerio.
 *
 * Corresponde al TEMA 9 oficial del Anexo I (bases2110.pdf) de esta
 * plaza: "Innovación de materiales para tabiquería interior y muros de
 * fachada: Tipología. Características. Aplicaciones." — enunciado
 * prácticamente idéntico, palabra por palabra, al TEMA 12 oficial de
 * Oficial Albañil ("Innovación de materiales para tabiquería interior y
 * muros de fachada. Tipología, características y aplicaciones"), que ya
 * dio lugar a tema-52 (scripts/seed-oficial-albanil-... — verificar
 * script exacto de origen si se necesita).
 *
 * Por tratarse del mismo contenido exigido (mismo alcance: sistemas de
 * tabiquería seca, piezas cerámicas/hormigón de altas prestaciones,
 * sistemas innovadores de fachada), se reutiliza el tema canónico
 * existente en lugar de duplicar el contenido con un nuevo slug,
 * siguiendo el modelo de contenido canónico reutilizable del proyecto
 * (ver CLAUDE.md) y el precedente de
 * fix-instalaciones-deportivas-reusa-tema-75-incendios.mjs. No se
 * recorta por secciones (secciones_incluidas = null): el enunciado de
 * Oficial Cementerio no añade ni quita ningún matiz respecto al de
 * Oficial Albañil, por lo que esta oposición requiere el tema completo.
 *
 * Uso: node --env-file=.env.local scripts/fix-cementerio-reusa-tema-52-tabiqueria.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

async function upsert(tabla, filas, onConflict) {
  const res = await fetch(`${URL_BASE}/rest/v1/${tabla}?on_conflict=${onConflict}`, {
    method: "POST",
    headers: { ...HEADERS, Prefer: "resolution=merge-duplicates,return=representation" },
    body: JSON.stringify(filas),
  });
  if (!res.ok) { console.error(`❌ Error en ${tabla}: ${res.status} ${await res.text()}`); process.exit(1); }
  const data = await res.json();
  console.log(`   ✓ ${tabla}: ${data.length} filas`);
  return data;
}

console.log("🔗 Vinculando tema-52 (innovación de materiales para tabiquería) como Tema 9 de Oficial Cementerio...");
await upsert(
  "tema_oposicion",
  [
    {
      tema_slug: "tema-52",
      oposicion_slug: "oficial-cementerio-ayto-zaragoza",
      bloque_id: "429d8f77-67a2-4655-b39d-353bdd19af74",
      numero: 11,
      orden: 11,
      es_premium: false,
      publicado: true,
      secciones_incluidas: null,
    },
  ],
  "tema_slug,oposicion_slug"
);
console.log("\n✅ tema-52 vinculado como Tema 9 de Oficial Cementerio (contenido reutilizado, sin duplicar).");
