/**
 * Crea tema-95: "Sanidad vegetal, fauna silvestre y especies exóticas
 * invasoras" — Tema 10 (numero=10, bloque-2) de Oficial Agente Inspector
 * (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 8 oficial del Anexo I (bases2110.pdf):
 *   "Sanidad vegetal en zonas verdes, montes y riberas: control de
 *   plagas y enfermedades; control biológico conservativo de plagas;
 *   eliminación de nidos de insectos o residuos vegetales afectados.
 *   Fauna y flora silvestre del municipio de Zaragoza. Especies
 *   amenazadas. Planes sobres especies de flora y fauna amenazadas.
 *   Especies exóticas invasoras. Normativa de aplicación. Catálogo
 *   Español de Especies Exóticas Invasoras. Especies exóticas invasores
 *   en el municipio de Zaragoza. Normativa CITEs."
 *
 * Fuentes primarias verificadas en este turno:
 * - Real Decreto 630/2013, de 2 de agosto, por el que se regula el
 *   Catálogo español de especies exóticas invasoras (BOE-A-2013-8565).
 * - Reglamento (CE) nº 338/97 del Consejo, de 9 de diciembre de 1996,
 *   relativo a la protección de especies de la fauna y flora silvestres
 *   mediante el control de su comercio (norma de la UE que aplica CITES
 *   en el territorio comunitario).
 * Las especies amenazadas/exóticas concretas del término municipal de
 * Zaragoza y los planes de conservación específicos no se detallan con
 * cifras o listados no verificados en esta sesión; se remite a las
 * fuentes oficiales del Gobierno de Aragón (Catálogo de Especies
 * Amenazadas de Aragón, tema-104 de esta oposición) para el detalle
 * autonómico. Sanidad vegetal/control de plagas tratado como
 * conocimiento técnico consolidado.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-95-sanidad-vegetal-especies-invasoras.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-95";
const OPOSICION = "oficial-agente-inspector-ayto-zaragoza";
const BLOQUE_2_ID = "b74ad422-4965-469e-9b9c-ef1a39c26d76";
const RD_630_2013 = "https://www.boe.es/buscar/act.php?id=BOE-A-2013-8565";
const REGLAMENTO_338_97 = "https://www.boe.es/buscar/doc.php?id=DOUE-L-1997-80321";

async function insertar(tabla, filas) {
  const res = await fetch(`${URL_BASE}/rest/v1/${tabla}`, { method: "POST", headers: { ...HEADERS, Prefer: "return=representation" }, body: JSON.stringify(filas) });
  if (!res.ok) { console.error(`❌ Error en ${tabla}: ${res.status} ${await res.text()}`); process.exit(1); }
  return res.json();
}
async function upsert(tabla, filas, onConflict) {
  const res = await fetch(`${URL_BASE}/rest/v1/${tabla}?on_conflict=${onConflict}`, { method: "POST", headers: { ...HEADERS, Prefer: "resolution=merge-duplicates,return=representation" }, body: JSON.stringify(filas) });
  if (!res.ok) { console.error(`❌ Error en ${tabla}: ${res.status} ${await res.text()}`); process.exit(1); }
  return res.json();
}
async function insertarPreguntasConOpciones(seccion, preguntas) {
  const filas = preguntas.map(({ opciones, correcta, ...p }) => ({ ...p, tema_slug: TEMA, seccion }));
  const insertadas = await insertar("preguntas", filas);
  console.log(`   ✓ preguntas: ${insertadas.length} filas`);
  const filasOpciones = insertadas.flatMap((pregunta, i) => preguntas[i].opciones.map((texto, orden) => ({ pregunta_id: pregunta.id, texto, es_correcta: orden === preguntas[i].correcta, orden })));
  const opcionesInsertadas = await insertar("opciones", filasOpciones);
  console.log(`   ✓ opciones: ${opcionesInsertadas.length} filas`);
}

console.log(`📚 Creando ${TEMA}...`);
await insertar("temas", [{
  slug: TEMA,
  titulo: "Sanidad vegetal, fauna silvestre y especies exóticas invasoras",
  descripcion: "Control de plagas y enfermedades en zonas verdes. Fauna y flora silvestre del municipio. Especies exóticas invasoras: Catálogo español y normativa CITES.",
  contenido: "Desarrolla el control de plagas y enfermedades en zonas verdes, montes y riberas (incluido el control biológico conservativo), la fauna y flora silvestre del municipio de Zaragoza y las especies amenazadas, y las especies exóticas invasoras según el Catálogo español (RD 630/2013) y la normativa CITES de control del comercio de especies (Reglamento CE 338/97).",
  enlaces_boe: [
    { url: RD_630_2013, titulo: "RD 630/2013 — Catálogo español de especies exóticas invasoras" },
    { url: REGLAMENTO_338_97, titulo: "Reglamento (CE) nº 338/97 — Protección de especies mediante control de su comercio (CITES-UE)" },
  ],
  indice_estudio: [
    { url: "", titulo: "Control de plagas y enfermedades: sanidad vegetal", seccion: "control-plagas-enfermedades-sanidad-vegetal", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Fauna y flora silvestre del municipio y especies amenazadas", seccion: "fauna-flora-silvestre-especies-amenazadas", articulos: "Conceptos fundamentales" },
    { url: RD_630_2013, titulo: "Especies exóticas invasoras: Catálogo español y normativa CITES", seccion: "especies-exoticas-invasoras-catalogo-cites", articulos: "RD 630/2013 y Reglamento CE 338/97" },
  ],
}]);

const S1 = "control-plagas-enfermedades-sanidad-vegetal";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es una plaga en el contexto de la sanidad vegetal de zonas verdes?", reverso: "Un organismo (insecto, ácaro, otros artrópodos) cuya presencia y desarrollo en una planta causa un daño significativo a su salud, aspecto o viabilidad" },
  { anverso: "¿Qué diferencia hay entre una plaga y una enfermedad vegetal?", reverso: "La plaga la provoca un organismo animal (insectos, ácaros); la enfermedad la provoca un agente patógeno (hongo, bacteria, virus) que altera el funcionamiento normal de la planta" },
  { anverso: "¿Qué es el control biológico conservativo de plagas?", reverso: "Una estrategia de control que favorece y conserva a los enemigos naturales ya presentes en el ecosistema (depredadores, parasitoides) para que regulen de forma natural las poblaciones de plagas, en lugar de recurrir a tratamientos químicos" },
  { anverso: "¿Qué ejemplo de control biológico conservativo es habitual en jardinería urbana frente al pulgón?", reverso: "Favorecer la presencia de mariquitas y sus larvas, depredadoras naturales del pulgón, evitando tratamientos químicos de amplio espectro que también las eliminarían" },
  { anverso: "¿Qué es un nido de procesionaria del pino y por qué requiere una gestión específica?", reverso: "Una bolsa sedosa que las orugas construyen en las ramas de coníferas; requiere gestión específica porque sus larvas tienen pelos urticantes que provocan reacciones alérgicas graves en personas y animales, además del daño que causan al árbol" },
  { anverso: "¿Qué debe hacerse con los residuos vegetales afectados por una plaga o enfermedad tras su retirada?", reverso: "Gestionarlos de forma diferenciada (según el patógeno o plaga) para evitar su propagación, evitando el compostaje sin tratamiento previo si el organismo puede sobrevivir en el proceso" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es una plaga en sanidad vegetal?", explicacion: "Un organismo animal cuya presencia causa daño significativo a la planta.", dificultad: "facil", opciones: ["Un organismo animal que causa daño a la planta", "Un tipo de fertilizante orgánico", "Una técnica de poda de formación", "Un sistema de riego automático"], correcta: 0 },
  { enunciado: "¿Qué diferencia una plaga de una enfermedad vegetal?", explicacion: "La plaga la provoca un animal; la enfermedad, un patógeno (hongo, bacteria, virus).", dificultad: "media", opciones: ["La plaga es un animal; la enfermedad, un patógeno", "Son términos exactamente sinónimos", "La enfermedad solo afecta a animales", "La plaga solo afecta a las raíces"], correcta: 0 },
  { enunciado: "¿Qué es el control biológico conservativo de plagas?", explicacion: "Favorecer a los enemigos naturales ya presentes en el ecosistema.", dificultad: "media", opciones: ["Favorecer a los enemigos naturales presentes", "Aplicar siempre tratamiento químico intensivo", "Eliminar toda la fauna del entorno", "Sustituir la planta afectada por otra"], correcta: 0 },
  { enunciado: "¿Qué ejemplo es propio del control biológico conservativo frente al pulgón?", explicacion: "Favorecer la presencia de mariquitas depredadoras.", dificultad: "media", opciones: ["Favorecer la presencia de mariquitas", "Aplicar insecticida de amplio espectro", "Eliminar todas las flores cercanas", "Sustituir el riego por goteo"], correcta: 0 },
  { enunciado: "¿Por qué requiere gestión específica el nido de procesionaria del pino?", explicacion: "Sus larvas tienen pelos urticantes con riesgo de reacción alérgica grave.", dificultad: "media", opciones: ["Pelos urticantes con riesgo de reacción alérgica", "Solo afecta a la estética del árbol", "No supone ningún riesgo para las personas", "Solo afecta a especies de ribera"], correcta: 0 },
  { enunciado: "¿Cómo deben gestionarse los residuos vegetales afectados por una plaga?", explicacion: "De forma diferenciada, evitando compostaje sin tratamiento si el patógeno puede sobrevivir.", dificultad: "media", opciones: ["De forma diferenciada, evitando propagar el patógeno", "Siempre en el compostaje ordinario sin distinción", "Vertiéndolos en cualquier zona verde cercana", "No requieren ninguna gestión especial"], correcta: 0 },
]);

const S2 = "fauna-flora-silvestre-especies-amenazadas";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué se entiende por fauna y flora silvestre de un municipio?", reverso: "El conjunto de especies animales y vegetales que viven de forma natural, sin domesticar ni cultivar, en el territorio del municipio, incluyendo tanto espacios naturales como zonas urbanas y periurbanas" },
  { anverso: "¿Qué hábitats propios del término municipal de Zaragoza albergan una biodiversidad relevante de fauna y flora silvestre?", reverso: "Las riberas del Ebro y sus afluentes (Gállego, Huerva), los sotos fluviales, los espacios esteparios periurbanos y las zonas de secano y regadío tradicional del entorno rural municipal" },
  { anverso: "¿Qué es una especie amenazada?", reverso: "Una especie cuya población y distribución han disminuido de forma significativa, situándola en riesgo de extinción a corto, medio o largo plazo, y que por ello recibe protección legal específica" },
  { anverso: "¿Qué es un plan de conservación (o plan de recuperación) de una especie amenazada?", reverso: "El instrumento técnico y legal que establece las medidas necesarias para mejorar el estado de conservación de una especie amenazada, incluyendo la protección de su hábitat y, en su caso, programas de cría o reintroducción" },
  { anverso: "¿Qué papel puede tener un agente inspector municipal en la protección de la fauna y flora silvestre del municipio?", reverso: "Vigilar y detectar situaciones de riesgo o infracción (vertidos, destrucción de hábitats, captura ilegal), informar y sensibilizar a la ciudadanía, y comunicar las incidencias a los organismos competentes en conservación de especies" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué se entiende por fauna y flora silvestre de un municipio?", explicacion: "Especies que viven de forma natural, sin domesticar ni cultivar, en su territorio.", dificultad: "facil", opciones: ["Especies que viven de forma natural en el territorio", "Únicamente las especies de jardines públicos", "Únicamente las especies protegidas por CITES", "Únicamente la fauna doméstica del municipio"], correcta: 0 },
  { enunciado: "¿Qué hábitats de Zaragoza albergan una biodiversidad relevante?", explicacion: "Riberas del Ebro/afluentes, sotos fluviales y espacios esteparios periurbanos.", dificultad: "media", opciones: ["Riberas del Ebro y espacios esteparios periurbanos", "Únicamente los parques urbanos centrales", "Únicamente los polígonos industriales", "Ningún espacio del municipio tiene relevancia"], correcta: 0 },
  { enunciado: "¿Qué es una especie amenazada?", explicacion: "Una especie con población en disminución significativa y riesgo de extinción.", dificultad: "facil", opciones: ["Una especie con riesgo de extinción", "Cualquier especie exótica introducida", "Una especie de gran tamaño corporal", "Una especie exclusivamente acuática"], correcta: 0 },
  { enunciado: "¿Qué es un plan de conservación de una especie amenazada?", explicacion: "El instrumento que establece medidas para mejorar su estado de conservación.", dificultad: "media", opciones: ["El instrumento con medidas de conservación", "Un listado de especies exóticas invasoras", "Un catálogo de especies de caza", "Un registro de vertidos contaminantes"], correcta: 0 },
  { enunciado: "¿Qué papel puede tener un agente inspector municipal en la protección de fauna y flora silvestre?", explicacion: "Vigilar, detectar infracciones, sensibilizar y comunicar incidencias.", dificultad: "media", opciones: ["Vigilar, detectar infracciones y comunicar incidencias", "Ninguno, es competencia exclusiva autonómica", "Solo puede actuar dentro de instalaciones deportivas", "Solo puede actuar sobre especies exóticas"], correcta: 0 },
]);

const S3 = "especies-exoticas-invasoras-catalogo-cites";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué norma regula el Catálogo español de especies exóticas invasoras?", reverso: "El Real Decreto 630/2013, de 2 de agosto" },
  { anverso: "¿Qué implica que una especie esté incluida en el Catálogo español de especies exóticas invasoras?", reverso: "Queda prohibida, con carácter general, su introducción, posesión, transporte, tráfico y comercio, salvo autorizaciones excepcionales; se deben adoptar medidas de control y, en su caso, erradicación" },
  { anverso: "¿Qué diferencia hay entre una especie exótica y una especie exótica invasora?", reverso: "La especie exótica es la que ha sido introducida fuera de su área de distribución natural; se considera invasora cuando, además, se propaga de forma agresiva causando o pudiendo causar daño a especies autóctonas, hábitats o ecosistemas" },
  { anverso: "¿Qué es CITES?", reverso: "El Convenio sobre el Comercio Internacional de Especies Amenazadas de Fauna y Flora Silvestres, un tratado internacional (Washington, 1973) que regula y controla el comercio de especies amenazadas para evitar que las ponga en riesgo" },
  { anverso: "¿Qué norma aplica CITES en el territorio de la Unión Europea?", reverso: "El Reglamento (CE) nº 338/97 del Consejo, de 9 de diciembre de 1996, relativo a la protección de especies de la fauna y flora silvestres mediante el control de su comercio" },
  { anverso: "¿Qué especies exóticas invasoras son conocidas en el entorno del término municipal de Zaragoza, entre las de mayor presencia?", reverso: "Entre las de mayor presencia en el entorno se encuentran especies vegetales como la caña común (Arundo donax) y el ailanto (Ailanthus altissima), y especies animales como el mejillón cebra o el cangrejo rojo americano en cursos de agua" },
  { anverso: "¿Qué papel tiene un agente inspector municipal frente a la detección de una especie exótica invasora catalogada?", reverso: "Identificarla y comunicar su presencia a los servicios técnicos competentes, colaborando en las labores de control o erradicación que se determinen, sin actuar por iniciativa propia con productos o métodos no autorizados" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué norma regula el Catálogo español de especies exóticas invasoras?", explicacion: "El Real Decreto 630/2013, de 2 de agosto.", dificultad: "media", opciones: ["El Real Decreto 630/2013", "La Ley 42/2007", "El Reglamento (CE) 338/97", "La Ley 43/2003 de Montes"], correcta: 0 },
  { enunciado: "¿Qué implica la inclusión de una especie en el Catálogo español de especies exóticas invasoras?", explicacion: "Prohibición general de su introducción, posesión, transporte y comercio.", dificultad: "media", opciones: ["Prohibición general de introducción y comercio", "Su protección total frente a cualquier control", "Su fomento como especie ornamental", "Ningún efecto legal práctico"], correcta: 0 },
  { enunciado: "¿Qué diferencia hay entre especie exótica y especie exótica invasora?", explicacion: "La invasora, además de introducida, se propaga causando daño a especies o ecosistemas.", dificultad: "media", opciones: ["La invasora causa daño a especies o ecosistemas", "Son términos exactamente sinónimos", "La exótica siempre es más peligrosa", "La invasora es siempre autóctona"], correcta: 0 },
  { enunciado: "¿Qué es CITES?", explicacion: "Un tratado internacional que regula el comercio de especies amenazadas.", dificultad: "facil", opciones: ["Un tratado internacional sobre comercio de especies", "Un catálogo español de especies invasoras", "Una ley autonómica de caza", "Un plan municipal de reforestación"], correcta: 0 },
  { enunciado: "¿Qué norma aplica CITES en la Unión Europea?", explicacion: "El Reglamento (CE) nº 338/97.", dificultad: "media", opciones: ["El Reglamento (CE) nº 338/97", "El Real Decreto 630/2013", "La Ley 42/2007", "El Decreto 129/2022"], correcta: 0 },
  { enunciado: "¿Qué especies son ejemplo de invasoras en el entorno de Zaragoza?", explicacion: "Caña común, ailanto, mejillón cebra y cangrejo rojo americano.", dificultad: "media", opciones: ["Caña común, ailanto y mejillón cebra", "Chopo, sauce y fresno", "Águila y quebrantahuesos", "Trucha común y barbo"], correcta: 0 },
  { enunciado: "¿Qué debe hacer un agente inspector ante la detección de una especie invasora catalogada?", explicacion: "Identificarla y comunicarla a los servicios técnicos competentes.", dificultad: "media", opciones: ["Identificarla y comunicarla a servicios técnicos", "Aplicar él mismo un tratamiento no autorizado", "Ignorarla si no afecta a zonas urbanas", "Capturarla y trasladarla sin autorización"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 10 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 10, orden: 10, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-95 creado y vinculado como Tema 10 de Oficial Agente Inspector.");
