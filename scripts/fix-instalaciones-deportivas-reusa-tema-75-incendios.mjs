/**
 * Vincula el tema canónico tema-75 ("Protección de incendios y
 * evacuación", ya creado para Oficial Mantenimiento General) como Tema 21
 * (numero=21, bloque-2) de Oficial Polivalente Instalaciones Deportivas.
 *
 * Corresponde al TEMA 19 oficial del Anexo I (bases2110.pdf) de esta
 * plaza: "Protección de incendios: el fuego, señalización, medios de
 * extinción y actuación personal en caso de incendio y evacuación de
 * edificios" — enunciado prácticamente idéntico, palabra por palabra, al
 * TEMA 19 oficial de Oficial Mantenimiento General ("Protección de
 * incendios. El fuego. Señalización, medios de extinción y actuación
 * personal en caso de incendio y evacuación de edificios"), que ya dio
 * lugar a tema-75 (scripts/seed-tema-75-proteccion-incendios.mjs).
 *
 * Por tratarse del mismo contenido exigido (mismo alcance, mismas fuentes
 * primarias: RD 513/2017 y RD 485/1997, ya verificadas), se reutiliza el
 * tema canónico existente en lugar de duplicar el contenido con un nuevo
 * slug, siguiendo el modelo de contenido canónico reutilizable del
 * proyecto (ver CLAUDE.md). No se recorta por secciones
 * (secciones_incluidas = null): esta oposición requiere el tema completo,
 * igual que Oficial Mantenimiento General.
 *
 * Uso: node --env-file=.env.local scripts/fix-instalaciones-deportivas-reusa-tema-75-incendios.mjs
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

console.log("🔗 Vinculando tema-75 (protección de incendios) como Tema 21 de Oficial Instalaciones Deportivas...");
await upsert(
  "tema_oposicion",
  [
    {
      tema_slug: "tema-75",
      oposicion_slug: "oficial-instalaciones-deportivas-ayto-zaragoza",
      bloque_id: "cdb0920b-a2d8-4ea8-b3fc-b80168d7361a",
      numero: 21,
      orden: 21,
      es_premium: false,
      publicado: true,
      secciones_incluidas: null,
    },
  ],
  "tema_slug,oposicion_slug"
);
console.log("\n✅ tema-75 vinculado como Tema 21 de Oficial Polivalente Instalaciones Deportivas (contenido reutilizado, sin duplicar).");
