/**
 * Auditoría final: para cada uno de los 20 temas de la oposición DPZ,
 * comprueba (paginando correctamente) cuántas preguntas de test, flashcards,
 * términos de glosario y casos prácticos hay disponibles DENTRO del recorte
 * (secciones_incluidas) de esa oposición.
 *
 * Uso: node --env-file=.env.local scripts/audit-dpz-completitud.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}` };

async function fetchAll(path) {
  let all = [];
  let from = 0;
  const pageSize = 1000;
  while (true) {
    const res = await fetch(`${URL_BASE}/rest/v1/${path}`, { headers: { ...HEADERS, Range: `${from}-${from + pageSize - 1}` } });
    if (!res.ok && res.status !== 206) { console.error(`❌ ${path} ${res.status} ${await res.text()}`); process.exit(1); }
    const page = await res.json();
    all = all.concat(page);
    if (page.length < pageSize) break;
    from += pageSize;
  }
  return all;
}

const OPO = "auxiliar-administrativo-dpz";

const temaOpo = await fetchAll(`tema_oposicion?oposicion_slug=eq.${OPO}&select=tema_slug,numero,secciones_incluidas&order=numero`);
if (temaOpo.length === 0) {
  console.error(`❌ No se encontró ninguna fila tema_oposicion para "${OPO}". Comprobando slug real...`);
  const opos = await fetchAll(`oposiciones?select=slug,nombre`);
  console.log(opos);
  process.exit(1);
}

const preguntas = await fetchAll(`preguntas?select=id,tema_slug,seccion`);
const flashcards = await fetchAll(`flashcards?select=id,tema_slug,seccion`);
const glosario = await fetchAll(`glosario?select=id,tema_slug,seccion`);
const casos = await fetchAll(`casos_practicos?select=id,tema_slug,slug`);
const casoPreguntas = await fetchAll(`caso_preguntas?select=caso_id,pregunta_id`);

const preguntaSeccion = new Map(preguntas.map((p) => [p.id, { tema: p.tema_slug, seccion: p.seccion }]));

function dentroDeAlcance(seccion, seccionesIncluidas) {
  if (!seccionesIncluidas || seccionesIncluidas.length === 0) return true;
  return seccionesIncluidas.includes(seccion);
}

console.log(`\n📊 Auditoría de "${OPO}" — ${temaOpo.length} temas\n`);
console.log("Tema  Núm  Test  Flash  Gloso  Casos  Recorte");
console.log("─".repeat(70));

let huecos = [];
for (const t of temaOpo) {
  const sec = t.secciones_incluidas;
  const nTest = preguntas.filter((p) => p.tema_slug === t.tema_slug && dentroDeAlcance(p.seccion, sec)).length;
  const nFlash = flashcards.filter((f) => f.tema_slug === t.tema_slug && dentroDeAlcance(f.seccion, sec)).length;
  const nGlos = glosario.filter((g) => g.tema_slug === t.tema_slug && dentroDeAlcance(g.seccion, sec)).length;

  const casosDelTema = casos.filter((c) => c.tema_slug === t.tema_slug);
  let nCasosDentro = 0;
  for (const caso of casosDelTema) {
    const preguntasDelCaso = casoPreguntas.filter((cp) => cp.caso_id === caso.id).map((cp) => preguntaSeccion.get(cp.pregunta_id)).filter(Boolean);
    if (preguntasDelCaso.length > 0 && preguntasDelCaso.every((p) => dentroDeAlcance(p.seccion, sec))) nCasosDentro++;
  }

  const recorteTxt = sec && sec.length > 0 ? `${sec.length} secc.` : "completo";
  console.log(`${String(t.numero).padStart(4)}  ${t.tema_slug.padEnd(4)}  ${String(nTest).padStart(4)}  ${String(nFlash).padStart(5)}  ${String(nGlos).padStart(5)}  ${String(nCasosDentro).padStart(5)}  ${recorteTxt}`);

  if (nTest === 0) huecos.push(`Tema ${t.numero} (${t.tema_slug}): SIN TEST`);
  if (nFlash === 0) huecos.push(`Tema ${t.numero} (${t.tema_slug}): SIN FLASHCARDS`);
  if (nGlos === 0) huecos.push(`Tema ${t.numero} (${t.tema_slug}): SIN GLOSARIO`);
  if (nCasosDentro === 0) huecos.push(`Tema ${t.numero} (${t.tema_slug}): SIN CASOS PRÁCTICOS dentro del recorte`);
}

console.log("\n" + "─".repeat(70));
if (huecos.length === 0) {
  console.log("✅ Los 20 temas tienen test, flashcards, glosario y casos prácticos dentro de su recorte.");
} else {
  console.log(`⚠️  ${huecos.length} huecos encontrados:`);
  huecos.forEach((h) => console.log(`   - ${h}`));
}
