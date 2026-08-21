/**
 * Preguntas de test — Tema 1, parte 10 (Título VIII, Cap. I: principios
 * generales de la organización territorial, arts. 137-139 + Cap. II: la
 * Administración Local, arts. 140-142).
 *
 * Uso: node --env-file=.env.local scripts/seed-preguntas-tema-1j.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

async function insertPreguntas(preguntas) {
  for (const p of preguntas) {
    const resP = await fetch(`${URL_BASE}/rest/v1/preguntas`, {
      method: "POST",
      headers: { ...HEADERS, Prefer: "return=representation" },
      body: JSON.stringify({ tema_slug: TEMA, seccion: p.seccion, enunciado: p.enunciado, explicacion: p.explicacion ?? null, dificultad: p.dificultad }),
    });
    if (!resP.ok) { console.error(`❌ pregunta ${resP.status} ${await resP.text()}`); process.exit(1); }
    const [row] = await resP.json();
    const opciones = p.opciones.map((texto, i) => ({ pregunta_id: row.id, texto, es_correcta: i === 0, orden: i }));
    const resO = await fetch(`${URL_BASE}/rest/v1/opciones`, { method: "POST", headers: { ...HEADERS, Prefer: "return=minimal" }, body: JSON.stringify(opciones) });
    if (!resO.ok) { console.error(`❌ opciones ${resO.status} ${await resO.text()}`); process.exit(1); }
  }
}

const TEMA = "tema-1";
const q = (seccion, dificultad, enunciado, opciones, explicacion) => ({ seccion, dificultad, enunciado, opciones, explicacion });

const PREGUNTAS = [
  q("titulo-8-cap-1", "media",
    "¿En qué se organiza territorialmente el Estado según el art. 137 CE?",
    ["En municipios, en provincias y en las Comunidades Autónomas que se constituyan; todas estas entidades gozan de autonomía para la gestión de sus respectivos intereses",
     "Exclusivamente en provincias y Comunidades Autónomas, sin mención a los municipios",
     "En municipios y Comunidades Autónomas, sin nivel provincial",
     "En regiones históricas, con exclusión de la organización provincial"]),
  q("titulo-8-cap-1", "media",
    "¿Qué garantiza el Estado según el art. 138.1 CE?",
    ["La realización efectiva del principio de solidaridad, velando por el establecimiento de un equilibrio económico adecuado y justo entre las diversas partes del territorio español, y atendiendo en particular a las circunstancias del hecho insular",
     "La uniformidad absoluta de todas las Comunidades Autónomas en su régimen competencial",
     "La primacía económica exclusiva de las regiones con mayor renta per cápita",
     "La centralización de todos los recursos económicos en el Estado central"]),
  q("titulo-8-cap-1", "media",
    "¿Qué prohíbe el art. 138.2 CE?",
    ["Que las diferencias entre los Estatutos de las distintas Comunidades Autónomas puedan implicar, en ningún caso, privilegios económicos o sociales",
     "Que las Comunidades Autónomas tengan diferentes niveles competenciales",
     "La existencia de más de una lengua cooficial en el conjunto del Estado",
     "Cualquier tipo de cooperación económica entre Comunidades Autónomas"]),
  q("titulo-8-cap-1", "media",
    "¿Qué igualdad reconoce el art. 139.1 CE?",
    ["Todos los españoles tienen los mismos derechos y obligaciones en cualquier parte del territorio del Estado",
     "Todos los españoles tienen los mismos derechos, salvo los relativos al régimen fiscal autonómico",
     "Los derechos de los españoles varían según la Comunidad Autónoma de residencia",
     "Solo los derechos políticos son iguales en todo el territorio, no los civiles"]),
  q("titulo-8-cap-1", "media",
    "¿Qué prohíbe el art. 139.2 CE?",
    ["Que ninguna autoridad pueda adoptar medidas que directa o indirectamente obstaculicen la libertad de circulación y establecimiento de las personas y la libre circulación de bienes en todo el territorio español",
     "El establecimiento de peajes en las vías de comunicación interautonómicas",
     "La creación de aduanas interiores entre provincias de una misma Comunidad Autónoma",
     "El comercio entre Comunidades Autónomas sin autorización estatal previa"]),
  q("titulo-8-cap-2", "media",
    "¿Qué garantiza la Constitución a los municipios según el art. 140 CE?",
    ["Su autonomía y personalidad jurídica plena; su gobierno y administración corresponde a sus respectivos Ayuntamientos, integrados por Alcaldes y Concejales, elegidos por los vecinos mediante sufragio; el concejo abierto podrá funcionar en los términos que la ley establezca",
     "Su dependencia jerárquica de la Diputación Provincial correspondiente",
     "Su autonomía únicamente en materia presupuestaria, sin personalidad jurídica propia",
     "La designación de sus Alcaldes por el Gobierno de la Comunidad Autónoma"]),
  q("titulo-8-cap-2", "media",
    "¿Qué es la provincia según el art. 141.1 CE?",
    ["Una entidad local con personalidad jurídica propia, determinada por la agrupación de municipios, cuya alteración de límites requiere aprobación de las Cortes Generales mediante ley orgánica",
     "Una división meramente estadística sin personalidad jurídica propia",
     "Una entidad dependiente de la Comunidad Autónoma, sin personalidad jurídica diferenciada",
     "Una circunscripción exclusivamente electoral, sin funciones administrativas"]),
  q("titulo-8-cap-2", "media",
    "¿A quién corresponde el gobierno y la administración autónoma de las provincias según el art. 141.2 CE?",
    ["A Diputaciones u otras Corporaciones de carácter representativo",
     "Al Gobierno de la Comunidad Autónoma directamente",
     "A un Delegado del Gobierno designado para cada provincia",
     "A los Ayuntamientos de los municipios que la integran, de forma mancomunada"]),
  q("titulo-8-cap-2", "media",
    "¿Qué permite el art. 141.3 CE?",
    ["Crear agrupaciones de municipios diferentes de la provincia",
     "Suprimir la organización provincial en todo el territorio nacional",
     "Fusionar provincias limítrofes sin necesidad de ley orgánica",
     "Que las Comunidades Autónomas sustituyan a las provincias en todas sus funciones"]),
  q("titulo-8-cap-2", "media",
    "¿Qué administración propia tienen las islas según el art. 141.4 CE?",
    ["Un régimen administrativo propio a través de Cabildos o Consejos, en los archipiélagos",
     "Ninguna administración diferenciada de la provincial ordinaria",
     "Un régimen exclusivamente municipal, sin órgano insular específico",
     "Un régimen dependiente directamente de la Administración General del Estado"]),
  q("titulo-8-cap-2", "media",
    "¿De qué deben disponer las Haciendas locales según el art. 142 CE?",
    ["De los medios suficientes para el desempeño de las funciones que la ley atribuye a las Corporaciones respectivas, nutriéndose fundamentalmente de tributos propios y de participación en los del Estado y de las Comunidades Autónomas",
     "Exclusivamente de tributos propios, sin participación en tributos estatales o autonómicos",
     "De transferencias íntegras del Estado, sin capacidad tributaria propia",
     "De la explotación de su patrimonio, sin ningún tipo de tributo propio"]),
];

console.log(`📝 Insertando ${PREGUNTAS.length} preguntas de ${TEMA} (parte 10: titulo-8-cap-1 y titulo-8-cap-2)...`);
await insertPreguntas(PREGUNTAS);
console.log(`✅ Parte 10 completada.`);
