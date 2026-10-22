/**
 * Verificación final de la oposición Policía Local (Ayto. Zaragoza):
 * comprueba que los 50 números del temario están vinculados, y cuenta por
 * tema flashcards, preguntas, glosario y casos prácticos (respetando el
 * recorte de secciones_incluidas), además de la ficha de convocatoria.
 *
 * Uso: node --env-file=.env.local scripts/verificar-policia-local.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}` };
const OPOSICION = "policia-local-ayto-zaragoza";

async function get(ruta) {
  const res = await fetch(`${URL_BASE}/rest/v1/${ruta}`, { headers: HEADERS });
  if (!res.ok) { console.error(`❌ ${ruta}: ${res.status} ${await res.text()}`); process.exit(1); }
  return res.json();
}

const vinculos = await get(`tema_oposicion?select=numero,tema_slug,secciones_incluidas,publicado&oposicion_slug=eq.${OPOSICION}&order=numero`);
const faltan = [];
for (let n = 1; n <= 50; n++) if (!vinculos.some((v) => v.numero === n)) faltan.push(n);

let total = { flashcards: 0, preguntas: 0, glosario: 0, casos: 0 };
let problemas = 0;
for (const v of vinculos) {
  const filtro = v.secciones_incluidas ? `&seccion=in.(${v.secciones_incluidas.join(",")})` : "";
  const [fc, pr, gl, ca] = await Promise.all([
    get(`flashcards?select=id&tema_slug=eq.${v.tema_slug}${filtro}`),
    get(`preguntas?select=id&tema_slug=eq.${v.tema_slug}${filtro}`),
    get(`glosario?select=id&tema_slug=eq.${v.tema_slug}${filtro}`),
    get(`casos_practicos?select=id&tema_slug=eq.${v.tema_slug}`),
  ]);
  total.flashcards += fc.length; total.preguntas += pr.length; total.glosario += gl.length; total.casos += ca.length;
  const aviso = !v.publicado || fc.length === 0 || pr.length === 0 ? " ⚠️" : "";
  if (aviso) problemas++;
  console.log(`Tema ${String(v.numero).padStart(2)} · ${v.tema_slug.padEnd(9)} · ${fc.length} fc · ${pr.length} preg · ${gl.length} glos · ${ca.length} casos${v.secciones_incluidas ? " (recorte)" : ""}${aviso}`);
}

const conv = await get(`convocatorias?select=oposicion_slug,estado,plazo_fin&oposicion_slug=eq.${OPOSICION}`);
console.log(`\nVinculados: ${vinculos.length}/50${faltan.length ? ` — faltan: ${faltan.join(", ")}` : ""}`);
console.log(`Totales: ${total.flashcards} flashcards, ${total.preguntas} preguntas, ${total.glosario} términos de glosario, ${total.casos} casos prácticos`);
console.log(`Convocatoria: ${conv.length ? `${conv[0].estado}, plazo_fin ${conv[0].plazo_fin}` : "❌ no existe"}`);
console.log(problemas || faltan.length ? `\n⚠️ Revisar ${problemas} tema(s) con incidencias.` : "\n✅ Todo correcto.");
