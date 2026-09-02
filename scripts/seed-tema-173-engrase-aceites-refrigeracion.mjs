/**
 * Crea tema-173: "Engrase del motor, aceites y refrigeración" — Tema 9
 * (numero=9, bloque-2) de Oficial Mecánico (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 7 oficial del Anexo I (bases2110.pdf, línea 1400):
 *   "Engrases del motor del automóvil, aceites y clases. La
 *   refrigeración del automóvil."
 *
 * Conocimiento técnico consolidado de mecánica del automóvil, sin una
 * ley española que lo regule como tal — mismo criterio que temas
 * anteriores de esta oposición. Búsqueda previa realizada conforme al
 * estándar de sourcing del proyecto.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-173-engrase-aceites-refrigeracion.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-173";
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
  titulo: "Engrase del motor, aceites y refrigeración",
  descripcion: "El sistema de engrase y el circuito de aceite del motor. Clasificación y viscosidad de los aceites. El sistema de refrigeración del automóvil.",
  contenido: "Desarrolla el sistema de engrase del motor y su circuito de aceite, la clasificación de los aceites de motor según su viscosidad y sus normas de calidad, y el sistema de refrigeración del automóvil, con sus elementos principales y su función de mantener la temperatura de funcionamiento adecuada del motor.",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "El sistema de engrase y el circuito de aceite", seccion: "sistema-engrase-circuito-aceite", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Clasificación y viscosidad de los aceites", seccion: "aceites-clasificacion-viscosidad", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "El sistema de refrigeración del automóvil", seccion: "sistema-refrigeracion-automovil", articulos: "Conceptos fundamentales" },
  ],
}]);

const S1 = "sistema-engrase-circuito-aceite";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Cuál es la función principal del sistema de engrase de un motor?", reverso: "Reducir el rozamiento y el desgaste entre las piezas móviles del motor (cigüeñal, bielas, pistones, árbol de levas), evacuar parte del calor generado y ayudar a mantener limpias las superficies internas del motor" },
  { anverso: "¿Qué es la bomba de aceite?", reverso: "El elemento que impulsa el aceite a presión desde el cárter hacia todos los puntos del motor que requieren lubricación, garantizando un caudal y una presión adecuados en cualquier régimen de giro del motor" },
  { anverso: "¿Qué es el filtro de aceite?", reverso: "Un elemento que retiene las partículas e impurezas presentes en el aceite (residuos de combustión, partículas metálicas de desgaste) antes de que este circule de nuevo por el motor, protegiendo así las superficies lubricadas" },
  { anverso: "¿Qué es el cárter, en relación con el sistema de engrase?", reverso: "El depósito situado en la parte inferior del motor donde se almacena el aceite lubricante, desde donde la bomba de aceite lo toma para impulsarlo por todo el circuito de engrase" },
  { anverso: "¿Por qué es importante respetar el intervalo recomendado por el fabricante para el cambio de aceite y filtro?", reverso: "Porque el aceite pierde progresivamente sus propiedades lubricantes con el uso y la acumulación de impurezas, y un aceite degradado o un filtro saturado comprometen la protección de las piezas móviles del motor frente al desgaste" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Cuál es la función principal del sistema de engrase de un motor?", explicacion: "Reducir el rozamiento y el desgaste entre las piezas móviles, y evacuar parte del calor generado.", dificultad: "facil", opciones: ["Reducir el rozamiento y el desgaste entre las piezas móviles", "Sincronizar la apertura y cierre de las válvulas del motor", "Transformar el movimiento alternativo del pistón en rotación", "Enfriar el habitáculo del vehículo durante su funcionamiento"], correcta: 0 },
  { enunciado: "¿Qué función cumple la bomba de aceite?", explicacion: "Impulsa el aceite a presión desde el cárter hacia todos los puntos que requieren lubricación.", dificultad: "media", opciones: ["Impulsa el aceite a presión hacia los puntos de lubricación", "Filtra las impurezas del aceite antes de su circulación", "Almacena el aceite lubricante en la parte inferior del motor", "Sincroniza la apertura y cierre de las válvulas del motor"], correcta: 0 },
  { enunciado: "¿Qué función cumple el filtro de aceite?", explicacion: "Retiene las partículas e impurezas presentes en el aceite antes de que vuelva a circular.", dificultad: "media", opciones: ["Retiene las partículas e impurezas del aceite", "Impulsa el aceite a presión hacia los puntos de lubricación", "Almacena el aceite lubricante en la parte inferior del motor", "Transforma el movimiento del pistón en rotación continua"], correcta: 0 },
  { enunciado: "¿Qué es el cárter, en relación con el sistema de engrase?", explicacion: "El depósito donde se almacena el aceite lubricante del motor.", dificultad: "media", opciones: ["El depósito donde se almacena el aceite lubricante", "El elemento que filtra las impurezas del aceite del motor", "El elemento que impulsa el aceite a presión por el circuito", "La pieza que cierra la parte superior del bloque motor"], correcta: 0 },
  { enunciado: "¿Por qué es importante respetar el intervalo recomendado para el cambio de aceite y filtro?", explicacion: "El aceite pierde propiedades con el uso y un aceite degradado compromete la protección del motor.", dificultad: "media", opciones: ["El aceite pierde propiedades lubricantes con el uso", "El aceite nunca pierde sus propiedades lubricantes con el tiempo", "Solo es relevante en motores diésel, no en motores de gasolina", "El cambio de aceite solo tiene relevancia estética para el motor"], correcta: 0 },
]);

const S2 = "aceites-clasificacion-viscosidad";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es la viscosidad de un aceite lubricante?", reverso: "La resistencia que ofrece un fluido a fluir; en un aceite de motor, determina su capacidad de formar una película lubricante adecuada entre las piezas móviles a distintas temperaturas de funcionamiento" },
  { anverso: "¿Qué es la clasificación SAE de los aceites de motor?", reverso: "Un sistema de clasificación de la viscosidad de los aceites establecido por la Society of Automotive Engineers, que expresa el comportamiento del aceite en frío y en caliente mediante una designación como, por ejemplo, 5W-30" },
  { anverso: "¿Qué significa la designación 5W-30 de un aceite multigrado?", reverso: "El número seguido de la 'W' (de winter, invierno) indica su comportamiento en frío (cuanto menor, mejor fluidez en frío); el segundo número indica su viscosidad a la temperatura normal de funcionamiento del motor (mayor número, mayor viscosidad en caliente)" },
  { anverso: "¿Qué es un aceite multigrado, frente a uno monogrado?", reverso: "Un aceite multigrado mantiene una viscosidad adecuada tanto en frío como en caliente gracias a aditivos específicos, mientras que un aceite monogrado solo ofrece un comportamiento óptimo en un rango de temperatura más reducido" },
  { anverso: "¿Qué es una clasificación de calidad del aceite, como las normas API o ACEA, frente a la clasificación de viscosidad SAE?", reverso: "Un sistema que indica el nivel de prestaciones y el tipo de motor para el que está diseñado el aceite (gasolina, diésel, con o sin filtro de partículas), complementario a la viscosidad SAE, que solo indica el comportamiento fluido del aceite" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es la viscosidad de un aceite lubricante?", explicacion: "La resistencia que ofrece un fluido a fluir.", dificultad: "facil", opciones: ["La resistencia que ofrece un fluido a fluir", "La temperatura máxima que soporta el aceite sin degradarse", "El color característico del aceite lubricante del motor", "El precio de mercado del aceite lubricante empleado"], correcta: 0 },
  { enunciado: "¿Qué sistema establece la clasificación de viscosidad de los aceites de motor?", explicacion: "La clasificación SAE (Society of Automotive Engineers).", dificultad: "media", opciones: ["La clasificación SAE", "La clasificación API exclusivamente", "La clasificación ACEA exclusivamente", "Ninguna clasificación normalizada existe para los aceites de motor"], correcta: 0 },
  { enunciado: "¿Qué indica el número seguido de la 'W' en una designación de aceite multigrado como 5W-30?", explicacion: "Su comportamiento en frío: cuanto menor, mejor fluidez en frío.", dificultad: "dificil", opciones: ["Su comportamiento en frío", "Su comportamiento exclusivamente en caliente", "El precio del aceite en el mercado", "El color característico del aceite"], correcta: 0 },
  { enunciado: "¿Qué caracteriza a un aceite multigrado frente a uno monogrado?", explicacion: "Mantiene una viscosidad adecuada tanto en frío como en caliente.", dificultad: "media", opciones: ["Mantiene una viscosidad adecuada en frío y en caliente", "Solo ofrece un comportamiento óptimo en un rango reducido", "Nunca puede emplearse en motores diésel modernos", "Siempre resulta más económico que un aceite monogrado"], correcta: 0 },
  { enunciado: "¿Qué indican las normas de calidad como API o ACEA, complementarias a la viscosidad SAE?", explicacion: "El nivel de prestaciones y el tipo de motor para el que está diseñado el aceite.", dificultad: "dificil", opciones: ["El nivel de prestaciones y el tipo de motor adecuado", "Exclusivamente el comportamiento del aceite en frío", "Exclusivamente el color característico del aceite", "Exclusivamente el precio de mercado del aceite"], correcta: 0 },
]);

const S3 = "sistema-refrigeracion-automovil";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Cuál es la función principal del sistema de refrigeración de un motor?", reverso: "Evacuar el exceso de calor generado por la combustión, manteniendo el motor dentro de su rango de temperatura óptimo de funcionamiento, evitando tanto el sobrecalentamiento como un enfriamiento excesivo" },
  { anverso: "¿Qué es el radiador, en el sistema de refrigeración?", reverso: "Un intercambiador de calor por el que circula el líquido refrigerante caliente procedente del motor, cediendo calor al aire exterior que lo atraviesa, antes de volver ya enfriado hacia el motor" },
  { anverso: "¿Qué es la bomba de agua (o bomba de refrigerante)?", reverso: "El elemento que impulsa el líquido refrigerante en circulación continua por todo el circuito de refrigeración: bloque motor, culata, radiador y demás elementos del sistema" },
  { anverso: "¿Qué es el termostato del sistema de refrigeración?", reverso: "Una válvula que regula el paso del líquido refrigerante hacia el radiador según la temperatura del motor, permaneciendo cerrada mientras el motor está frío (para que alcance antes su temperatura óptima) y abriéndose progresivamente al alcanzar la temperatura adecuada" },
  { anverso: "¿Qué es el electroventilador del radiador?", reverso: "Un ventilador accionado eléctricamente que fuerza el paso de aire a través del radiador cuando la circulación natural de aire (por la marcha del vehículo) resulta insuficiente para disipar el calor, como en situaciones de tráfico lento o parado" },
  { anverso: "¿Qué es el líquido refrigerante, y por qué no se emplea agua pura en este circuito?", reverso: "Una mezcla de agua con anticongelante (habitualmente etilenglicol) y aditivos anticorrosivos; el agua pura se congelaría a temperaturas bajo cero (dañando el circuito) y favorecería la corrosión interna de los componentes metálicos del sistema" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Cuál es la función principal del sistema de refrigeración de un motor?", explicacion: "Evacuar el exceso de calor, manteniendo el motor en su rango de temperatura óptimo.", dificultad: "facil", opciones: ["Evacuar el exceso de calor generado por la combustión", "Reducir el rozamiento entre las piezas móviles del motor", "Sincronizar la apertura y cierre de las válvulas del motor", "Filtrar las impurezas del aceite lubricante del motor"], correcta: 0 },
  { enunciado: "¿Qué es el radiador del sistema de refrigeración?", explicacion: "Un intercambiador de calor que cede calor del refrigerante al aire exterior.", dificultad: "media", opciones: ["Un intercambiador de calor que cede calor al aire exterior", "El elemento que impulsa el líquido refrigerante por el circuito", "La válvula que regula el paso de refrigerante según la temperatura", "El ventilador accionado eléctricamente que fuerza el paso de aire"], correcta: 0 },
  { enunciado: "¿Qué función cumple el termostato del sistema de refrigeración?", explicacion: "Regula el paso de refrigerante hacia el radiador según la temperatura del motor.", dificultad: "media", opciones: ["Regula el paso de refrigerante según la temperatura del motor", "Impulsa el líquido refrigerante en circulación por el circuito", "Cede calor del refrigerante caliente al aire exterior", "Filtra las impurezas presentes en el líquido refrigerante"], correcta: 0 },
  { enunciado: "¿Cuándo entra en funcionamiento principalmente el electroventilador del radiador?", explicacion: "Cuando la circulación natural de aire resulta insuficiente, como en tráfico lento o parado.", dificultad: "media", opciones: ["Cuando la circulación natural de aire es insuficiente", "Únicamente cuando el motor está completamente frío", "Únicamente cuando el vehículo circula a alta velocidad", "Nunca, al ser un elemento meramente decorativo del radiador"], correcta: 0 },
  { enunciado: "¿Por qué no se emplea agua pura en el circuito de refrigeración?", explicacion: "Se congelaría a temperaturas bajo cero y favorecería la corrosión interna del sistema.", dificultad: "dificil", opciones: ["Se congelaría en frío y favorecería la corrosión del sistema", "El agua pura siempre resulta más eficaz que cualquier mezcla anticongelante", "El agua pura nunca puede circular por un circuito de refrigeración cerrado", "El uso de agua pura está expresamente prohibido por cualquier fabricante"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 9 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 9, orden: 9, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-173 creado y vinculado como Tema 9 de Oficial Mecánico.");
