/**
 * Crea tema-174: "Sistemas de alimentación de los motores diésel y
 * gasolina" — Tema 10 (numero=10, bloque-2) de Oficial Mecánico.
 *
 * Corresponde al TEMA 8 oficial: "Sistemas de alimentación de los
 * motores diésel y gasolina."
 *
 * Conocimiento técnico consolidado de mecánica del automóvil, sin una
 * ley española que lo regule como tal — mismo criterio que temas
 * anteriores de esta oposición.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-174-alimentacion-diesel-gasolina.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-174";
const OPOSICION = "oficial-mecanico-ayto-zaragoza";
const BLOQUE_2_ID = "aa6cf0d6-e9fd-4e52-837d-15fab35cbcbe";

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
  titulo: "Sistemas de alimentación de los motores diésel y gasolina",
  descripcion: "El circuito de alimentación de combustible del motor de gasolina y del motor diésel, y los principios de la inyección electrónica moderna.",
  contenido: "Desarrolla el sistema de alimentación de combustible en los motores de gasolina (depósito, bomba, inyección electrónica), el sistema de alimentación en los motores diésel (bomba de alta presión, inyectores) y los fundamentos de los sistemas de inyección electrónica de última generación, como el common rail en motores diésel y la inyección directa en motores de gasolina.",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "Sistema de alimentación del motor de gasolina", seccion: "sistema-alimentacion-motor-gasolina", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Sistema de alimentación del motor diésel", seccion: "sistema-alimentacion-motor-diesel", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Inyección electrónica y common rail", seccion: "inyeccion-electronica-common-rail", articulos: "Conceptos fundamentales" },
  ],
}]);

const S1 = "sistema-alimentacion-motor-gasolina";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Cuál es la función del sistema de alimentación de un motor de gasolina?", reverso: "Suministrar al motor la mezcla de aire y combustible en la cantidad y proporción adecuadas, en cualquier régimen y condición de funcionamiento, desde el depósito hasta la cámara de combustión" },
  { anverso: "¿Qué es la bomba de combustible en un motor de gasolina moderno?", reverso: "Un elemento, habitualmente eléctrico y sumergido en el depósito, que impulsa el combustible a presión desde el depósito hasta el sistema de inyección" },
  { anverso: "¿Qué es un inyector de gasolina?", reverso: "Una válvula electromagnética que pulveriza el combustible a presión, en la cantidad exacta calculada por la centralita electrónica, según el régimen y la carga del motor en cada instante" },
  { anverso: "¿Qué diferencia hay entre la inyección indirecta y la inyección directa de gasolina?", reverso: "En la inyección indirecta el combustible se pulveriza en el colector de admisión, antes de la válvula; en la inyección directa se pulveriza directamente en el interior de la cámara de combustión, a mayor presión" },
  { anverso: "¿Qué es la sonda lambda?", reverso: "Un sensor situado en el sistema de escape que mide el contenido de oxígeno de los gases de escape, permitiendo a la centralita ajustar la mezcla de aire-combustible para optimizar la combustión y reducir emisiones" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Cuál es la función del sistema de alimentación de un motor de gasolina?", explicacion: "Suministrar la mezcla de aire y combustible en la cantidad y proporción adecuadas.", dificultad: "facil", opciones: ["Suministrar la mezcla de aire y combustible adecuada al motor", "Evacuar el calor generado por la combustión del motor", "Lubricar las piezas móviles internas del motor", "Sincronizar la apertura y cierre de las válvulas del motor"], correcta: 0 },
  { enunciado: "¿Dónde suele ubicarse la bomba de combustible en un motor de gasolina moderno?", explicacion: "Habitualmente es eléctrica y está sumergida en el depósito de combustible.", dificultad: "media", opciones: ["Sumergida en el depósito de combustible", "Integrada dentro del radiador del motor", "Integrada dentro del filtro de aceite del motor", "Fuera del vehículo, en un punto externo al chasis"], correcta: 0 },
  { enunciado: "¿Qué es un inyector de gasolina?", explicacion: "Una válvula electromagnética que pulveriza el combustible en la cantidad calculada por la centralita.", dificultad: "media", opciones: ["Una válvula electromagnética que pulveriza el combustible", "Un elemento que filtra las impurezas del aceite del motor", "Un elemento que evacúa el calor del sistema de refrigeración", "Un sensor que mide la temperatura del líquido refrigerante"], correcta: 0 },
  { enunciado: "¿Cuál es la diferencia principal entre inyección directa e indirecta de gasolina?", explicacion: "En la directa el combustible se inyecta dentro de la cámara de combustión; en la indirecta, en el colector de admisión.", dificultad: "dificil", opciones: ["El punto donde se pulveriza el combustible respecto a la válvula", "La inyección indirecta no existe en motores de gasolina actuales", "La inyección directa solo existe en motores diésel", "No existe ninguna diferencia real entre ambos sistemas"], correcta: 0 },
  { enunciado: "¿Qué función cumple la sonda lambda en el sistema de alimentación?", explicacion: "Mide el oxígeno de los gases de escape para que la centralita ajuste la mezcla aire-combustible.", dificultad: "dificil", opciones: ["Mide el oxígeno de los gases de escape para ajustar la mezcla", "Impulsa el combustible a presión desde el depósito", "Filtra las impurezas sólidas presentes en el combustible", "Regula la temperatura del líquido refrigerante del motor"], correcta: 0 },
]);

const S2 = "sistema-alimentacion-motor-diesel";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿En qué se diferencia fundamentalmente la combustión de un motor diésel respecto a uno de gasolina?", reverso: "En el motor diésel no existe bujía de encendido: el combustible se autoinflama al ser inyectado en el aire fuertemente comprimido y caliente dentro del cilindro (encendido por compresión)" },
  { anverso: "¿Qué es la bomba de inyección de alta presión en un motor diésel?", reverso: "El elemento que eleva la presión del gasóleo a valores muy altos (necesarios para pulverizarlo correctamente en el aire comprimido) y lo distribuye hacia los inyectores de cada cilindro" },
  { anverso: "¿Qué es un inyector diésel?", reverso: "El elemento que introduce el gasóleo a alta presión, finamente pulverizado, en la cámara de combustión, en el momento e cantidad exactos calculados por la centralita electrónica" },
  { anverso: "¿Qué son las bujías de precalentamiento en un motor diésel?", reverso: "Resistencias eléctricas que calientan el aire de la cámara de combustión antes del arranque en frío, facilitando la autoinflamación del gasóleo cuando el motor todavía está frío" },
  { anverso: "¿Qué es el filtro de gasóleo, y por qué es especialmente importante en un motor diésel?", reverso: "Un elemento que retiene impurezas y agua del combustible; es especialmente crítico en diésel porque los sistemas de inyección de alta presión son muy sensibles a cualquier partícula o impureza, que puede dañar bomba e inyectores" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Cómo se produce la combustión en un motor diésel, a diferencia de uno de gasolina?", explicacion: "Por autoinflamación del combustible al inyectarse en aire comprimido y caliente, sin bujía de encendido.", dificultad: "media", opciones: ["Por autoinflamación del combustible en aire comprimido y caliente", "Mediante una chispa producida por una bujía de encendido", "Mediante una llama piloto externa al cilindro del motor", "El motor diésel no requiere ningún tipo de combustión"], correcta: 0 },
  { enunciado: "¿Qué función cumple la bomba de inyección de alta presión en un motor diésel?", explicacion: "Eleva la presión del gasóleo y lo distribuye hacia los inyectores.", dificultad: "media", opciones: ["Eleva la presión del gasóleo y lo distribuye a los inyectores", "Filtra las impurezas presentes en el aceite del motor", "Evacúa el calor generado por la combustión del motor", "Regula la apertura y cierre de las válvulas del motor"], correcta: 0 },
  { enunciado: "¿Qué función cumplen las bujías de precalentamiento en un motor diésel?", explicacion: "Calientan el aire de la cámara de combustión antes del arranque en frío.", dificultad: "media", opciones: ["Calientan el aire de la cámara antes del arranque en frío", "Producen la chispa que enciende la mezcla en cada ciclo", "Filtran el gasóleo antes de llegar a los inyectores", "Regulan la temperatura del líquido refrigerante del motor"], correcta: 0 },
  { enunciado: "¿Por qué es especialmente crítico el filtro de gasóleo en un motor diésel moderno?", explicacion: "Los sistemas de inyección de alta presión son muy sensibles a impurezas, que pueden dañar bomba e inyectores.", dificultad: "dificil", opciones: ["Porque los sistemas de alta presión son muy sensibles a impurezas", "Porque el filtro de gasóleo no tiene ninguna función real", "Porque el gasóleo nunca contiene impurezas ni agua", "Porque el filtro de gasóleo forma parte del sistema de frenos"], correcta: 0 },
  { enunciado: "¿Qué introduce el inyector diésel en la cámara de combustión?", explicacion: "Gasóleo a alta presión, finamente pulverizado, en el momento y cantidad exactos.", dificultad: "facil", opciones: ["Gasóleo a alta presión, finamente pulverizado", "Aire comprimido exclusivamente, sin combustible", "Líquido refrigerante para enfriar la cámara de combustión", "Aceite lubricante para engrasar el cilindro del motor"], correcta: 0 },
]);

const S3 = "inyeccion-electronica-common-rail";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es el sistema common rail en un motor diésel?", reverso: "Un sistema de inyección electrónica en el que una bomba de alta presión carga un conducto común (rampa o 'rail') a presión constante, del que toman combustible los inyectores de todos los cilindros, gestionados individualmente por la centralita" },
  { anverso: "¿Qué ventaja principal aporta el common rail frente a sistemas de inyección diésel anteriores?", reverso: "Permite controlar con gran precisión el momento, la cantidad y el número de inyecciones por ciclo (incluyendo preinyecciones y postinyecciones), mejorando el rendimiento, reduciendo el ruido y las emisiones contaminantes" },
  { anverso: "¿Qué es la centralita electrónica de gestión del motor (ECU)?", reverso: "El elemento que recibe información de múltiples sensores del motor (temperatura, presión, régimen, posición del acelerador) y calcula en tiempo real los parámetros óptimos de inyección de combustible y otros sistemas del motor" },
  { anverso: "¿Qué es un inyector piezoeléctrico, empleado en sistemas common rail avanzados?", reverso: "Un tipo de inyector que emplea un cristal piezoeléctrico (que se deforma al aplicarle corriente) en lugar de un solenoide electromagnético convencional, permitiendo tiempos de apertura y cierre mucho más rápidos y precisos" },
  { anverso: "¿Qué es una preinyección, en el contexto de un sistema common rail?", reverso: "Una pequeña cantidad de combustible inyectada justo antes de la inyección principal, que suaviza el inicio de la combustión, reduciendo el característico ruido y las vibraciones del motor diésel" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es el sistema common rail?", explicacion: "Un sistema en el que un conducto común a presión constante alimenta a los inyectores de todos los cilindros.", dificultad: "media", opciones: ["Un conducto común a presión constante que alimenta los inyectores", "Un sistema exclusivo de los motores de gasolina antiguos", "Un tipo de filtro de aceite de alta capacidad de retención", "Un sistema exclusivo del circuito de refrigeración del motor"], correcta: 0 },
  { enunciado: "¿Cuál es la principal ventaja del sistema common rail frente a sistemas diésel anteriores?", explicacion: "Permite controlar con gran precisión el momento y la cantidad de cada inyección.", dificultad: "media", opciones: ["Permite un control muy preciso del momento y cantidad de inyección", "No aporta ninguna ventaja real frente a sistemas anteriores", "Elimina por completo la necesidad de un filtro de gasóleo", "Elimina por completo la necesidad de una bomba de alta presión"], correcta: 0 },
  { enunciado: "¿Qué función cumple la centralita electrónica (ECU) del motor?", explicacion: "Recibe información de sensores y calcula los parámetros óptimos de inyección y otros sistemas.", dificultad: "media", opciones: ["Recibe datos de sensores y calcula los parámetros de inyección", "Impulsa el líquido refrigerante por el circuito de refrigeración", "Filtra las impurezas presentes en el aceite del motor", "Evacúa físicamente los gases de escape del motor"], correcta: 0 },
  { enunciado: "¿Qué caracteriza a un inyector piezoeléctrico frente a uno electromagnético convencional?", explicacion: "Emplea un cristal piezoeléctrico que permite tiempos de apertura y cierre más rápidos y precisos.", dificultad: "dificil", opciones: ["Tiempos de apertura y cierre más rápidos y precisos", "Es un sistema exclusivo de los motores de gasolina antiguos", "No requiere ninguna gestión por parte de la centralita electrónica", "Elimina la necesidad de bomba de alta presión en el sistema"], correcta: 0 },
  { enunciado: "¿Qué es una preinyección en un sistema common rail?", explicacion: "Una pequeña cantidad de combustible inyectada antes de la inyección principal, que suaviza el inicio de la combustión.", dificultad: "dificil", opciones: ["Una pequeña inyección previa que suaviza el inicio de la combustión", "La única inyección que se produce en cada ciclo del motor", "Un fallo del sistema de inyección que debe repararse siempre", "Una inyección que solo se produce en motores de gasolina"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 10 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 10, orden: 10, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-174 creado y vinculado como Tema 10 de Oficial Mecánico.");
