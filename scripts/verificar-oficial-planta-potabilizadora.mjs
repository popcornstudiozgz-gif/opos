/**
 * Verificación final de Oficial Planta Potabilizadora: 16 temas de parte
 * específica (tema-203 a tema-218), glosario, convocatoria y vínculos
 * tema_oposicion.
 * Uso: node --env-file=.env.local scripts/verificar-oficial-planta-potabilizadora.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}` };
const OPOSICION = "oficial-planta-potabilizadora-ayto-zaragoza";

const temas = Array.from({ length: 16 }, (_, i) => `tema-${203 + i}`);
let ok = true;

for (const tema of temas) {
  const [fRes, pRes, cRes, gRes] = await Promise.all([
    fetch(`${URL_BASE}/rest/v1/flashcards?tema_slug=eq.${tema}&select=id`, { headers: HEADERS }),
    fetch(`${URL_BASE}/rest/v1/preguntas?tema_slug=eq.${tema}&select=id`, { headers: HEADERS }),
    fetch(`${URL_BASE}/rest/v1/casos_practicos?tema_slug=eq.${tema}&select=id,titulo,caso_preguntas(pregunta_id)`, { headers: HEADERS }),
    fetch(`${URL_BASE}/rest/v1/glosario?tema_slug=eq.${tema}&select=id`, { headers: HEADERS }),
  ]);
  const flashcards = await fRes.json();
  const preguntas = await pRes.json();
  const casos = await cRes.json();
  const glosario = await gRes.json();

  const flags = [];
  if (flashcards.length !== 15) flags.push(`flashcards=${flashcards.length} (esperado 15)`);
  if (preguntas.length !== 45) flags.push(`preguntas=${preguntas.length} (esperado 45)`);
  if (casos.length !== 3) flags.push(`casos=${casos.length} (esperado 3)`);
  for (const c of casos) {
    if (c.caso_preguntas.length !== 10) flags.push(`caso "${c.titulo}" tiene ${c.caso_preguntas.length} preguntas (esperado 10)`);
  }
  if (glosario.length === 0) flags.push(`glosario=0`);

  if (flags.length) {
    ok = false;
    console.log(`❌ ${tema}: ${flags.join(" | ")}`);
  } else {
    console.log(`✅ ${tema}: flashcards=${flashcards.length} preguntas=${preguntas.length} casos=${casos.length} glosario=${glosario.length}`);
  }
}

const [toRes, convRes] = await Promise.all([
  fetch(`${URL_BASE}/rest/v1/tema_oposicion?oposicion_slug=eq.${OPOSICION}&select=tema_slug,numero,orden,publicado`, { headers: HEADERS }),
  fetch(`${URL_BASE}/rest/v1/convocatorias?oposicion_slug=eq.${OPOSICION}&select=id`, { headers: HEADERS }),
]);
const temaOposicion = await toRes.json();
const convocatorias = await convRes.json();

console.log(`\n📊 tema_oposicion: ${temaOposicion.length} filas (esperado 22)`);
if (temaOposicion.length !== 22) ok = false;
console.log(`📊 convocatorias: ${convocatorias.length} fila(s) (esperado 1)`);
if (convocatorias.length !== 1) ok = false;

console.log(ok ? "\n✅ TODO CORRECTO" : "\n⚠️ HAY INCONSISTENCIAS — revisar arriba");
