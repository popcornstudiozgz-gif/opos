/**
 * Crea tema-183: "Sistema de escape" — Tema 19 (numero=19, bloque-2)
 * de Oficial Mecánico.
 *
 * Corresponde al TEMA 17 oficial: "Sistema de escape."
 *
 * Conocimiento técnico consolidado de mecánica del automóvil, sin una
 * ley española que lo regule como tal.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-183-sistema-escape.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-183";
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
  titulo: "Sistema de escape",
  descripcion: "El colector de escape y las tuberías, los sistemas de reducción de emisiones (catalizador, filtro de partículas), y el silenciador y los sensores del sistema de escape.",
  contenido: "Desarrolla el sistema de escape del automóvil, desde el colector de escape que recoge los gases de cada cilindro, pasando por los elementos de reducción de emisiones contaminantes (catalizador, filtro de partículas diésel), hasta el silenciador y los sensores (sonda lambda, sensores de presión y temperatura de escape) que gestionan y monitorizan el conjunto del sistema.",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "El colector de escape y las tuberías", seccion: "colector-escape-tuberia", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Catalizador y filtro de partículas: reducción de emisiones", seccion: "catalizador-fap-reduccion-emisiones", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "El silenciador y los sensores del sistema de escape", seccion: "silencioso-sensores-escape", articulos: "Conceptos fundamentales" },
  ],
}]);

const S1 = "colector-escape-tuberia";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Cuál es la función del sistema de escape de un automóvil?", reverso: "Conducir los gases resultantes de la combustión desde los cilindros hasta el exterior del vehículo, reduciendo su temperatura y presión, atenuando el ruido generado y depurándolos de sustancias contaminantes antes de expulsarlos a la atmósfera" },
  { anverso: "¿Qué es el colector de escape?", reverso: "El elemento que recoge los gases de escape procedentes de cada uno de los cilindros del motor y los conduce hacia un único conducto, siendo el primer tramo del sistema de escape, sometido a las temperaturas más elevadas" },
  { anverso: "¿Por qué el colector de escape debe soportar temperaturas muy elevadas?", reverso: "Porque está en contacto directo con los gases recién expulsados de la cámara de combustión, que pueden alcanzar varios cientos de grados centígrados, especialmente en motores turboalimentados donde además aloja el turbocompresor" },
  { anverso: "¿Qué es el tubo de escape (o línea de escape)?", reverso: "El conjunto de tuberías metálicas que conducen los gases desde el colector, a través de los distintos elementos de tratamiento (catalizador, filtro de partículas) y silenciamiento, hasta la salida al exterior en la parte trasera del vehículo" },
  { anverso: "¿Qué problema puede causar la corrosión en el sistema de escape de un vehículo?", reverso: "Perforaciones en las tuberías o el colector, que provocan fugas de gases de escape (ruido anómalo, olor a gases quemados dentro o cerca del habitáculo) y pueden alterar el correcto funcionamiento de los sensores de escape" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Cuál es la función del sistema de escape de un automóvil?", explicacion: "Conducir los gases de combustión al exterior, reduciendo temperatura, ruido y contaminación.", dificultad: "facil", opciones: ["Conducir los gases de combustión al exterior del vehículo", "Impulsar el combustible a presión hacia los inyectores", "Evacuar el calor del sistema de refrigeración del motor", "Filtrar las impurezas presentes en el aceite del motor"], correcta: 0 },
  { enunciado: "¿Qué función cumple el colector de escape?", explicacion: "Recoge los gases de cada cilindro y los conduce hacia un único conducto.", dificultad: "media", opciones: ["Recoge los gases de cada cilindro y los conduce a un conducto único", "Filtra las partículas contaminantes de los gases de escape", "Reduce el ruido generado por los gases de escape del motor", "Genera la chispa que enciende la mezcla del motor"], correcta: 0 },
  { enunciado: "¿Por qué el colector de escape debe soportar temperaturas muy elevadas?", explicacion: "Está en contacto directo con los gases recién expulsados de la combustión.", dificultad: "media", opciones: ["Está en contacto directo con los gases recién expulsados", "El colector de escape nunca alcanza temperaturas elevadas", "Solo alcanza temperatura elevada en motores diésel", "La temperatura del colector depende del color del vehículo"], correcta: 0 },
  { enunciado: "¿Qué es el tubo de escape (línea de escape)?", explicacion: "El conjunto de tuberías que conducen los gases desde el colector hasta la salida exterior.", dificultad: "media", opciones: ["El conjunto de tuberías que conducen los gases hasta la salida", "El elemento que recoge los gases directamente de cada cilindro", "El elemento que filtra las impurezas del aceite del motor", "El elemento que regula la temperatura del líquido refrigerante"], correcta: 0 },
  { enunciado: "¿Qué problema puede causar la corrosión en el sistema de escape?", explicacion: "Perforaciones que provocan fugas de gases, con ruido anómalo y posible olor a gases quemados.", dificultad: "dificil", opciones: ["Perforaciones que provocan fugas de gases de escape", "La corrosión nunca afecta al sistema de escape del vehículo", "Solo afecta a la estética del sistema de escape", "La corrosión mejora la eficacia del sistema de escape"], correcta: 0 },
]);

const S2 = "catalizador-fap-reduccion-emisiones";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es el catalizador (o convertidor catalítico)?", reverso: "Un elemento del sistema de escape que contiene metales preciosos (platino, paladio, rodio) que favorecen reacciones químicas para transformar gases contaminantes (monóxido de carbono, hidrocarburos no quemados, óxidos de nitrógeno) en sustancias menos nocivas (dióxido de carbono, agua, nitrógeno)" },
  { anverso: "¿Por qué el catalizador necesita alcanzar una temperatura mínima de funcionamiento para ser eficaz?", reverso: "Porque las reacciones químicas de conversión de gases contaminantes solo se producen de forma eficiente a partir de una temperatura determinada (habitualmente varios cientos de grados); en frío, el catalizador apenas depura los gases de escape" },
  { anverso: "¿Qué es el filtro de partículas diésel (FAP o DPF)?", reverso: "Un dispositivo específico de los motores diésel que retiene físicamente las partículas sólidas (hollín) presentes en los gases de escape, evitando que se emitan a la atmósfera" },
  { anverso: "¿Qué es la regeneración del filtro de partículas (FAP)?", reverso: "El proceso mediante el cual el hollín acumulado en el filtro se quema a alta temperatura (de forma automática durante la conducción, o forzada por la centralita en determinadas condiciones), reduciéndolo a cenizas y liberando de nuevo la capacidad de retención del filtro" },
  { anverso: "¿Por qué la conducción exclusivamente urbana, con trayectos cortos, puede dificultar la regeneración del filtro de partículas?", reverso: "Porque la regeneración requiere que los gases de escape alcancen una temperatura suficientemente alta durante un tiempo determinado, condición que se cumple con más facilidad en trayectos largos a velocidad sostenida que en circulación urbana con paradas frecuentes" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué función cumple el catalizador?", explicacion: "Transforma gases contaminantes en sustancias menos nocivas mediante reacciones químicas.", dificultad: "media", opciones: ["Transforma gases contaminantes en sustancias menos nocivas", "Retiene físicamente las partículas sólidas de hollín del escape", "Reduce el ruido generado por los gases de escape del motor", "Genera la chispa que enciende la mezcla del motor"], correcta: 0 },
  { enunciado: "¿Por qué el catalizador necesita alcanzar una temperatura mínima para ser eficaz?", explicacion: "Las reacciones químicas de conversión solo se producen de forma eficiente a partir de una temperatura determinada.", dificultad: "dificil", opciones: ["Las reacciones químicas requieren una temperatura mínima eficaz", "El catalizador funciona igual de bien a cualquier temperatura", "El catalizador nunca depende de la temperatura de los gases", "Solo depende de la temperatura en motores de gasolina"], correcta: 0 },
  { enunciado: "¿Qué función cumple el filtro de partículas diésel (FAP)?", explicacion: "Retiene físicamente las partículas sólidas (hollín) de los gases de escape.", dificultad: "media", opciones: ["Retiene físicamente las partículas sólidas de hollín del escape", "Transforma gases contaminantes mediante reacciones químicas", "Reduce el ruido generado por los gases de escape del motor", "Genera la chispa que enciende la mezcla del motor"], correcta: 0 },
  { enunciado: "¿Qué es la regeneración del filtro de partículas?", explicacion: "El proceso mediante el cual el hollín acumulado se quema a alta temperatura, reduciéndolo a cenizas.", dificultad: "dificil", opciones: ["El proceso en que el hollín acumulado se quema a alta temperatura", "La sustitución completa del filtro por uno nuevo", "El proceso de limpieza manual externa del tubo de escape", "El proceso de cambio del aceite del motor del vehículo"], correcta: 0 },
  { enunciado: "¿Por qué la conducción exclusivamente urbana con trayectos cortos puede dificultar la regeneración del FAP?", explicacion: "La regeneración requiere que los gases alcancen una temperatura suficientemente alta durante un tiempo determinado, más difícil en circulación urbana con paradas.", dificultad: "dificil", opciones: ["Requiere temperatura alta sostenida, más difícil en trayectos cortos", "La conducción urbana siempre facilita la regeneración del filtro", "El tipo de conducción no influye en absoluto en la regeneración", "La regeneración solo depende del kilometraje total del vehículo"], correcta: 0 },
]);

const S3 = "silencioso-sensores-escape";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es el silenciador (o silencioso) del sistema de escape?", reverso: "Un elemento, situado habitualmente en el tramo final del sistema de escape, diseñado para atenuar el ruido generado por la salida de los gases de combustión, mediante cámaras internas que reducen la presión sonora" },
  { anverso: "¿Qué son los sensores de temperatura de gases de escape?", reverso: "Sensores situados en distintos puntos del sistema de escape (antes y después del catalizador o del filtro de partículas) que informan a la centralita de la temperatura de los gases, dato necesario para gestionar procesos como la regeneración del FAP o proteger el catalizador de un sobrecalentamiento" },
  { anverso: "¿Qué es el sensor de presión diferencial del filtro de partículas?", reverso: "Un sensor que mide la diferencia de presión entre la entrada y la salida del filtro de partículas, permitiendo a la centralita estimar la cantidad de hollín acumulado y decidir cuándo es necesario iniciar una regeneración" },
  { anverso: "¿Qué relación tiene la sonda lambda con el sistema de escape, más allá del sistema de alimentación?", reverso: "Aunque su función principal es ayudar a ajustar la mezcla de combustible, está físicamente instalada en el sistema de escape (antes y, en muchos vehículos, también después del catalizador), y una segunda sonda lambda tras el catalizador permite además comprobar su eficacia de conversión" },
  { anverso: "¿Qué síntomas puede provocar una avería en el sistema de escape relacionada con sus sensores?", reverso: "Encendido del testigo de avería del motor, funcionamiento en modo degradado (menor potencia) de la centralita como medida de protección, y en el caso del FAP, un aviso específico de filtro de partículas obstruido" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué función cumple el silenciador del sistema de escape?", explicacion: "Atenúa el ruido generado por la salida de los gases de combustión.", dificultad: "facil", opciones: ["Atenúa el ruido generado por la salida de los gases", "Transforma gases contaminantes en sustancias menos nocivas", "Retiene físicamente las partículas sólidas del escape", "Genera la chispa que enciende la mezcla del motor"], correcta: 0 },
  { enunciado: "¿Qué información aportan los sensores de temperatura de gases de escape?", explicacion: "La temperatura de los gases en distintos puntos, necesaria para gestionar la regeneración del FAP o proteger el catalizador.", dificultad: "media", opciones: ["La temperatura de los gases en distintos puntos del sistema", "El nivel de combustible en el depósito del vehículo", "La presión de los neumáticos del vehículo", "El nivel de aceite en el cárter del motor"], correcta: 0 },
  { enunciado: "¿Qué mide el sensor de presión diferencial del filtro de partículas?", explicacion: "La diferencia de presión entre la entrada y la salida del filtro, para estimar el hollín acumulado.", dificultad: "dificil", opciones: ["La diferencia de presión entre entrada y salida del filtro", "La temperatura del líquido refrigerante del motor", "El nivel de aceite en el cárter del motor", "La presión de los neumáticos del vehículo"], correcta: 0 },
  { enunciado: "¿Por qué se instala una segunda sonda lambda tras el catalizador en muchos vehículos?", explicacion: "Permite comprobar la eficacia de conversión del propio catalizador.", dificultad: "dificil", opciones: ["Permite comprobar la eficacia de conversión del catalizador", "Sirve exclusivamente para medir la temperatura del motor", "Sirve exclusivamente para medir la presión de los neumáticos", "No cumple ninguna función real en el sistema de escape"], correcta: 0 },
  { enunciado: "¿Qué puede provocar una avería en los sensores del sistema de escape?", explicacion: "Encendido del testigo de avería y funcionamiento en modo degradado de la centralita como medida de protección.", dificultad: "media", opciones: ["Encendido del testigo de avería y modo degradado del motor", "Ninguna consecuencia relevante para el funcionamiento del motor", "Una mejora notable del rendimiento del motor", "Una reducción notable del consumo de combustible"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 19 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 19, orden: 19, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-183 creado y vinculado como Tema 19 de Oficial Mecánico.");
