/**
 * Administrativa/o (Ayto. Zaragoza): retira los vínculos de los Temas 13 y 16
 * a los canónicos tema-6 [titulo-3-cap-1] y tema-7 [titulo-4-cap-1], que con
 * ese recorte solo aportaban 4 flashcards y 9 preguntas (Tema 13, arts. 34-36)
 * y 2 flashcards y 3 preguntas (Tema 16, art. 53). Los sustituyen los temas
 * dedicados tema-435 y tema-438 (seed-tema-435-requisitos-actos.mjs y
 * seed-tema-438-derechos-interesado.mjs), que deben ejecutarse después.
 *
 * Uso: node --env-file=.env.local scripts/fix-administrativo-ayto-temas-dedicados-13-16.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, Prefer: "return=representation" };

const res = await fetch(`${URL_BASE}/rest/v1/tema_oposicion?oposicion_slug=eq.administrativo-ayto-zaragoza&tema_slug=in.(tema-6,tema-7)`, { method: "DELETE", headers: HEADERS });
if (!res.ok) { console.error(`❌ ${res.status} ${await res.text()}`); process.exit(1); }
const borrados = await res.json();
console.log(`✅ Vínculos retirados: ${borrados.map((v) => `Tema ${v.numero} → ${v.tema_slug}`).join(", ") || "ninguno"}`);
