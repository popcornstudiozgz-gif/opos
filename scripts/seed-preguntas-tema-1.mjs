/**
 * Preguntas de test — Tema 1 (Constitución Española), derivadas 1:1 de las
 * flashcards del mismo tema/seccion. El tema más extenso: 422 flashcards
 * cubriendo la Constitución completa.
 *
 * Uso: node --env-file=.env.local scripts/seed-preguntas-tema-1.mjs
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
  // ═══ Título Preliminar (arts. 1-9) ═══
  q("titulo-preliminar", "facil",
    "¿Qué tipo de Estado establece el art. 1.1 CE?",
    ["Un Estado social y democrático de Derecho",
     "Un Estado federal y parlamentario",
     "Un Estado confesional y unitario",
     "Un Estado autonómico y presidencialista"]),
  q("titulo-preliminar", "media",
    "¿En qué se fundamenta la Constitución según el art. 2 CE?",
    ["En la indisoluble unidad de la Nación española, reconociendo el derecho a la autonomía de nacionalidades y regiones y la solidaridad entre ellas",
     "En la soberanía compartida entre el Estado y las Comunidades Autónomas",
     "En el derecho de autodeterminación de las nacionalidades históricas",
     "En la unidad territorial exclusiva, sin reconocimiento de autonomía alguna"]),
  q("titulo-preliminar", "media",
    "¿Cómo se componen las Fuerzas Armadas y cuál es su misión según el art. 8.1 CE?",
    ["Ejército de Tierra, Armada y Ejército del Aire; garantizar la soberanía e independencia de España, su integridad territorial y el ordenamiento constitucional",
     "Ejército de Tierra y Armada, únicamente; garantizar exclusivamente la defensa exterior",
     "Un cuerpo único de defensa; garantizar el orden público interno",
     "Ejército de Tierra, Armada, Ejército del Aire y Guardia Civil"]),
  q("titulo-preliminar", "facil",
    "¿Dónde reside la soberanía nacional según el art. 1.2 CE?",
    ["En el pueblo español, del que emanan los poderes del Estado",
     "En las Cortes Generales, como representantes del pueblo",
     "En el Rey, como Jefe del Estado",
     "En cada una de las Comunidades Autónomas, de forma compartida"]),
  q("titulo-preliminar", "facil",
    "¿Cuál es la forma política del Estado español según el art. 1.3 CE?",
    ["La Monarquía parlamentaria",
     "La República parlamentaria",
     "La Monarquía constitucional absoluta",
     "El Estado federal presidencialista"]),
  q("titulo-preliminar", "media",
    "¿Cuál es la lengua oficial del Estado según el art. 3.1 CE?",
    ["El castellano, con deber de conocerla y derecho a usarla",
     "El castellano, únicamente con derecho a usarla, sin deber de conocerla",
     "Todas las lenguas de España por igual, sin lengua oficial preferente",
     "El castellano en el territorio nacional, salvo en las Comunidades con lengua cooficial"]),
  q("titulo-preliminar", "media",
    "¿Cuándo son oficiales las demás lenguas españolas según el art. 3.2 CE?",
    ["En sus respectivas Comunidades Autónomas, según sus Estatutos",
     "En todo el territorio nacional, con el mismo rango que el castellano",
     "Únicamente en el ámbito educativo de cada Comunidad Autónoma",
     "Solo si así lo determina una ley orgánica estatal específica"]),
  q("titulo-preliminar", "media",
    "Según el art. 3.3 CE, ¿qué consideración tienen las modalidades lingüísticas de España?",
    ["Patrimonio cultural objeto de especial respeto y protección",
     "Lenguas oficiales en todo el territorio nacional",
     "Elementos sin relevancia constitucional específica",
     "Modalidades cuyo uso queda restringido al ámbito estrictamente privado"]),
  q("titulo-preliminar", "media",
    "¿Cómo son los colores y proporciones de la bandera de España según el art. 4.1 CE?",
    ["Tres franjas horizontales roja-amarilla-roja; la amarilla el doble de ancha que cada roja",
     "Tres franjas horizontales de igual anchura, roja-amarilla-roja",
     "Dos franjas horizontales, roja y amarilla, de igual anchura",
     "Tres franjas verticales roja-amarilla-roja"]),
  q("titulo-preliminar", "media",
    "¿Pueden las Comunidades Autónomas tener banderas propias según el art. 4.2 CE?",
    ["Sí, y se usan junto a la de España en edificios públicos y actos oficiales",
     "No, la Constitución solo reconoce la bandera nacional",
     "Sí, pero sustituyendo a la bandera de España en el territorio autonómico",
     "Sí, únicamente en actos de carácter estrictamente cultural"]),
  q("titulo-preliminar", "facil",
    "¿Cuál es la capital del Estado según el art. 5 CE?",
    ["La villa de Madrid",
     "Barcelona",
     "La ciudad que determinen las Cortes Generales por ley",
     "No existe una capital constitucionalmente fijada"]),
  q("titulo-preliminar", "media",
    "Según el art. 6 CE, ¿qué expresan los partidos políticos y qué se exige de su estructura?",
    ["Expresan el pluralismo político y son instrumento de participación política; su estructura y funcionamiento deben ser democráticos",
     "Expresan la voluntad exclusiva del Gobierno; su estructura es libre, sin exigencias democráticas",
     "Son órganos del Estado con potestad normativa propia",
     "Expresan el pluralismo político, sin exigencia constitucional sobre su estructura interna"]),
  q("titulo-preliminar", "media",
    "¿Qué papel da el art. 7 CE a los sindicatos y a las asociaciones empresariales?",
    ["La defensa y promoción de los intereses económicos y sociales propios, con creación y actividad libres y estructura democrática",
     "Son órganos consultivos del Gobierno, sin capacidad de acción autónoma",
     "Su creación requiere autorización previa de las Cortes Generales",
     "Actúan exclusivamente como instrumento de participación política, igual que los partidos"]),
  q("titulo-preliminar", "media",
    "¿Qué instrumento regula la organización militar según el art. 8.2 CE?",
    ["Una ley orgánica",
     "Un real decreto del Gobierno",
     "Una ley ordinaria de las Cortes Generales",
     "Un reglamento del Ministerio de Defensa"]),
  q("titulo-preliminar", "facil",
    "¿A qué están sujetos los ciudadanos y los poderes públicos según el art. 9.1 CE?",
    ["A la Constitución y al resto del ordenamiento jurídico",
     "Únicamente a la Constitución, sin sujeción al resto del ordenamiento",
     "A las leyes ordinarias, quedando la Constitución como norma programática",
     "Exclusivamente los poderes públicos, no los ciudadanos particulares"]),
  q("titulo-preliminar", "media",
    "¿Qué deben promover los poderes públicos según el art. 9.2 CE?",
    ["Condiciones para que la libertad e igualdad sean reales y efectivas, removiendo obstáculos y facilitando la participación ciudadana",
     "Exclusivamente la igualdad formal ante la ley, sin intervención adicional",
     "La libertad individual, sin mención expresa a la igualdad efectiva",
     "La participación política, con exclusión de la económica, social y cultural"]),
  q("titulo-preliminar", "dificil",
    "¿Cuál de estos principios garantiza el art. 9.3 CE?",
    ["La irretroactividad de las disposiciones sancionadoras no favorables o restrictivas de derechos individuales",
     "La retroactividad general de todas las normas jurídicas",
     "La discrecionalidad absoluta de los poderes públicos en su actuación",
     "La primacía del reglamento sobre la ley en caso de conflicto"]),
];

console.log(`📝 Insertando ${PREGUNTAS.length} preguntas de ${TEMA} (parte 1: titulo-preliminar)...`);
await insertPreguntas(PREGUNTAS);
console.log(`✅ Parte 1 completada.`);
