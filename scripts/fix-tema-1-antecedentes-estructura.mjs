/**
 * Añade a tema-1 (Constitución Española, canónico) una sección nueva
 * "antecedentes-estructura": antecedentes inmediatos y estructura formal de
 * la Constitución.
 *
 * Motivo: el Tema 1 oficial de Bombero/a Conductor/a del Ayto. de Zaragoza
 * (bases2107.pdf, Anexo I) exige "La Constitución: antecedentes, estructura
 * y contenido. Principios constitucionales y valores fundamentales. Título
 * preliminar", y tema-1 solo cubría el contenido (títulos y artículos), no
 * los antecedentes ni la estructura. Las oposiciones que ya usan tema-1 con
 * recorte (`secciones_incluidas`) no ven la sección nueva; las que lo usan
 * completo (NULL) la ven como un apartado más del mismo tema.
 *
 * Fuente: texto consolidado de la Constitución (BOE-A-1978-31229), leído en
 * la sesión: cabecera («BOE» núm. 311, de 29/12/1978; ELI con fecha
 * 1978/12/27), fórmula de promulgación ("las Cortes han aprobado y el pueblo
 * español ratificado"), índice (preámbulo, título preliminar, títulos I a X,
 * 169 artículos, 4 disposiciones adicionales, 9 transitorias, 1 derogatoria
 * y 1 final), disposición derogatoria (Ley 1/1977 para la Reforma Política y
 * Leyes Fundamentales del régimen anterior) y disposición transitoria
 * octava (las Cámaras que aprobaron la Constitución).
 *
 * Uso: node --env-file=.env.local scripts/fix-tema-1-antecedentes-estructura.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-1";
const S = "antecedentes-estructura";
const CE = "https://www.boe.es/buscar/act.php?id=BOE-A-1978-31229";

async function pedir(url, opciones = {}) {
  const res = await fetch(url, { ...opciones, headers: { ...HEADERS, ...(opciones.headers ?? {}) } });
  if (!res.ok) { console.error(`❌ ${res.status} ${url}\n${await res.text()}`); process.exit(1); }
  return res.status === 204 ? null : res.json();
}
const insertar = (tabla, filas) => pedir(`${URL_BASE}/rest/v1/${tabla}`, { method: "POST", headers: { Prefer: "return=representation" }, body: JSON.stringify(filas) });
async function insertarPreguntasConOpciones(seccion, preguntas) {
  const insertadas = await insertar("preguntas", preguntas.map(({ opciones, correcta, ...p }) => ({ ...p, tema_slug: TEMA, seccion })));
  await insertar("opciones", insertadas.flatMap((pregunta, i) => preguntas[i].opciones.map((texto, orden) => ({ pregunta_id: pregunta.id, texto, es_correcta: orden === preguntas[i].correcta, orden }))));
  console.log(`   ✓ preguntas: ${insertadas.length}`);
}

const existentes = await pedir(`${URL_BASE}/rest/v1/flashcards?select=id&tema_slug=eq.${TEMA}&seccion=eq.${S}`);
if (existentes.length) { console.log(`ℹ️  ${TEMA} ya tiene la sección ${S}; no se hace nada.`); process.exit(0); }

const [tema] = await pedir(`${URL_BASE}/rest/v1/temas?select=indice_estudio&slug=eq.${TEMA}`);
const indice = [
  { seccion: S, titulo: "Antecedentes y estructura de la Constitución", articulos: "Preámbulo, disposición derogatoria y disposición final", url: `${CE}#dd` },
  ...tema.indice_estudio.filter((i) => i.seccion !== S),
];
await pedir(`${URL_BASE}/rest/v1/temas?slug=eq.${TEMA}`, { method: "PATCH", headers: { Prefer: "return=minimal" }, body: JSON.stringify({ indice_estudio: indice }) });
console.log("   ✓ indice_estudio actualizado");

await insertar("flashcards", [
  { anverso: "¿Cómo se estructura formalmente la Constitución Española de 1978?", reverso: "Un preámbulo, un título preliminar y diez títulos (I a X) con 169 artículos, más 4 disposiciones adicionales, 9 transitorias, 1 derogatoria y 1 final" },
  { anverso: "¿Cuántos artículos tiene la Constitución Española?", reverso: "169 artículos, distribuidos entre el título preliminar y los títulos I a X" },
  { anverso: "¿Qué ley preconstitucional deroga expresamente en primer lugar la disposición derogatoria de la Constitución?", reverso: "La Ley 1/1977, de 4 de enero, para la Reforma Política" },
  { anverso: "¿Qué normas del régimen anterior deroga también la disposición derogatoria de la Constitución?", reverso: "Las Leyes Fundamentales: Principios del Movimiento Nacional (1958), Fuero de los Españoles (1945), Fuero del Trabajo (1938), Ley Constitutiva de las Cortes (1942), Ley de Sucesión en la Jefatura del Estado (1947), Ley Orgánica del Estado (1967) y Ley de Referéndum Nacional (1945)" },
  { anverso: "Según la fórmula de promulgación de la Constitución, ¿quién la aprobó y quién la ratificó?", reverso: "La aprobaron las Cortes y la ratificó el pueblo español" },
  { anverso: "¿Cuándo se publicó la Constitución en el BOE y cuándo entró en vigor?", reverso: "Se publicó en el «BOE» núm. 311, de 29 de diciembre de 1978, y entró en vigor ese mismo día, según su disposición final" },
  { anverso: "¿Qué proclama el preámbulo de la Constitución como voluntad de la Nación española?", reverso: "Garantizar la convivencia democrática, consolidar un Estado de Derecho, proteger a todos los españoles y pueblos de España en el ejercicio de los derechos humanos, promover el progreso de la cultura y la economía, establecer una sociedad democrática avanzada y colaborar en las relaciones pacíficas entre todos los pueblos de la Tierra" },
  { anverso: "¿Qué cámaras asumieron las funciones del Congreso y del Senado tras la entrada en vigor de la Constitución (disposición transitoria octava)?", reverso: "Las mismas Cámaras que habían aprobado la Constitución, sin que su mandato pudiera extenderse más allá del 15 de junio de 1981" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S })));
console.log("   ✓ flashcards: 8");

await insertarPreguntasConOpciones(S, [
  { enunciado: "¿Cuántos artículos tiene la Constitución Española de 1978?", explicacion: "La Constitución tiene 169 artículos, repartidos entre el título preliminar y los títulos I a X.", dificultad: "facil", opciones: ["169", "196", "159"], correcta: 0 },
  { enunciado: "Además del título preliminar, ¿cuántos títulos tiene la Constitución?", explicacion: "Tiene diez títulos, numerados del I al X (el X regula la reforma constitucional).", dificultad: "facil", opciones: ["Diez", "Ocho", "Doce"], correcta: 0 },
  { enunciado: "¿Cuántas disposiciones transitorias tiene la Constitución?", explicacion: "Nueve disposiciones transitorias, además de 4 adicionales, 1 derogatoria y 1 final.", dificultad: "media", opciones: ["Nueve", "Cuatro", "Una"], correcta: 0 },
  { enunciado: "¿Qué ley deroga expresamente la disposición derogatoria de la Constitución en su primer inciso?", explicacion: "La Ley 1/1977, de 4 de enero, para la Reforma Política, que abrió el proceso de transición.", dificultad: "media", opciones: ["La Ley 1/1977, de 4 de enero, para la Reforma Política", "La Ley Orgánica 2/1979 del Tribunal Constitucional", "La Ley 7/1985, reguladora de las Bases del Régimen Local"], correcta: 0 },
  { enunciado: "¿En qué boletín y fecha se publicó la Constitución?", explicacion: "En el «BOE» núm. 311, de 29 de diciembre de 1978; según su disposición final entró en vigor el mismo día de su publicación.", dificultad: "media", opciones: ["En el «BOE» núm. 311, de 29 de diciembre de 1978", "En el «BOE» núm. 1, de 1 de enero de 1979", "En el «BOE» núm. 311, de 6 de diciembre de 1978"], correcta: 0 },
  { enunciado: "Según la fórmula de promulgación de la Constitución, ¿quién la ratificó?", explicacion: "\"Las Cortes han aprobado y el pueblo español ratificado la siguiente Constitución\".", dificultad: "facil", opciones: ["El pueblo español", "El Tribunal Supremo", "El Consejo de Estado"], correcta: 0 },
  { enunciado: "¿Cuál de estas normas NO figura entre las derogadas expresamente por la disposición derogatoria de la Constitución?", explicacion: "La disposición derogatoria cita las Leyes Fundamentales del régimen anterior (Fuero de los Españoles, Fuero del Trabajo, Ley Orgánica del Estado...). El Código Civil no figura entre ellas.", dificultad: "dificil", opciones: ["El Código Civil", "El Fuero de los Españoles, de 17 de julio de 1945", "La Ley Orgánica del Estado, de 10 de enero de 1967"], correcta: 0 },
  { enunciado: "¿Hasta qué fecha como máximo podían ejercer sus funciones las Cámaras que aprobaron la Constitución, según la disposición transitoria octava?", explicacion: "Su mandato no podía extenderse más allá del 15 de junio de 1981.", dificultad: "dificil", opciones: ["15 de junio de 1981", "31 de diciembre de 1978", "6 de diciembre de 1982"], correcta: 0 },
]);

await insertar("glosario", [
  { tema_slug: TEMA, seccion: S, termino: "Ley para la Reforma Política", definicion: "Ley 1/1977, de 4 de enero, que abrió el proceso de transición democrática; la Constitución la deroga expresamente en su disposición derogatoria." },
  { tema_slug: TEMA, seccion: S, termino: "Leyes Fundamentales", definicion: "Conjunto de leyes de rango constitucional del régimen anterior (Fuero de los Españoles, Fuero del Trabajo, Ley Orgánica del Estado, etc.), derogadas por la disposición derogatoria de la Constitución." },
  { tema_slug: TEMA, seccion: S, termino: "Disposición derogatoria", definicion: "Parte final de una norma que declara qué normas anteriores quedan sin efecto; la de la Constitución cita expresamente las leyes del régimen anterior." },
]);
console.log("   ✓ glosario: 3");
console.log(`\n✅ Sección ${S} añadida a ${TEMA}.`);
