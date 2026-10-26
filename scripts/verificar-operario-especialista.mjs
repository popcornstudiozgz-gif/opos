// node --env-file=.env.local scripts/verificar-operario-especialista.mjs
// Comprueba que Operario/a Especialista tiene sus 10 temas vinculados (1-10) y
// cuenta flashcards, preguntas, glosario y casos prácticos por tema,
// respetando el recorte de secciones_incluidas.
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}` };
const OPOSICION = "operario-especialista-ayto-zaragoza";

async function get(path) {
  const r = await fetch(`${URL_BASE}/rest/v1/${path}`, { headers: { ...HEADERS, Prefer: "count=exact" } });
  if (!r.ok) throw new Error(`${path}: ${r.status} ${await r.text()}`);
  return r.json();
}

const vinculos = await get(`tema_oposicion?oposicion_slug=eq.${OPOSICION}&select=tema_slug,numero,secciones_incluidas&order=numero`);
const numeros = vinculos.map((v) => v.numero);
const faltan = Array.from({ length: 10 }, (_, i) => i + 1).filter((n) => !numeros.includes(n));

const conv = await get(`convocatorias?oposicion_slug=eq.${OPOSICION}&select=estado,plazo_fin`);

let total = { fc: 0, pr: 0, gl: 0, cp: 0 };
for (const v of vinculos) {
  const filtro = v.secciones_incluidas ? `&seccion=in.(${v.secciones_incluidas.join(",")})` : "";
  const [fc, pr, gl, cp] = await Promise.all([
    get(`flashcards?tema_slug=eq.${v.tema_slug}${filtro}&select=id`),
    get(`preguntas?tema_slug=eq.${v.tema_slug}${filtro}&select=id`),
    get(`glosario?tema_slug=eq.${v.tema_slug}${filtro}&select=id`),
    get(`casos_practicos?tema_slug=eq.${v.tema_slug}&select=id`),
  ]);
  total.fc += fc.length; total.pr += pr.length; total.gl += gl.length; total.cp += cp.length;
  const recorte = v.secciones_incluidas ? " (recortado)" : "";
  console.log(`Tema ${String(v.numero).padStart(2)} ${v.tema_slug.padEnd(9)} fc ${String(fc.length).padStart(3)} · preg ${String(pr.length).padStart(3)} · glos ${String(gl.length).padStart(2)} · casos ${cp.length}${recorte}`);
}

console.log(`\n${vinculos.length} temas vinculados; faltan: ${faltan.length ? faltan.join(", ") : "ninguno"}`);
console.log(`Totales: ${total.fc} flashcards, ${total.pr} preguntas, ${total.gl} términos de glosario, ${total.cp} casos prácticos`);
console.log(`Convocatoria: ${conv.length ? `${conv[0].estado}, plazo_fin ${conv[0].plazo_fin}` : "NO EXISTE"}`);
if (faltan.length || !conv.length) process.exit(1);
