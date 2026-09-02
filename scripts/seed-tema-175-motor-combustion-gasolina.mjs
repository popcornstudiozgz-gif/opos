/**
 * Crea tema-175: "Motor de combustión. Motor de gasolina" — Tema 11
 * (numero=11, bloque-2) de Oficial Mecánico.
 *
 * Corresponde al TEMA 9 oficial: "Motor de combustión. Motor de
 * gasolina."
 *
 * Conocimiento técnico consolidado de mecánica del automóvil, sin una
 * ley española que lo regule como tal.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-175-motor-combustion-gasolina.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-175";
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
  titulo: "Motor de combustión. Motor de gasolina",
  descripcion: "Fundamentos del motor de combustión interna, el ciclo Otto de cuatro tiempos y los elementos constructivos y parámetros de rendimiento del motor de gasolina.",
  contenido: "Desarrolla los fundamentos del motor de combustión interna alternativo, el ciclo termodinámico de cuatro tiempos (Otto) propio del motor de gasolina, los elementos constructivos que lo hacen posible y los principales parámetros de rendimiento (cilindrada, relación de compresión, potencia, par motor) empleados para caracterizar un motor.",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "El ciclo Otto y la combustión en el motor de gasolina", seccion: "ciclo-otto-combustion-gasolina", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Elementos constructivos del motor de gasolina", seccion: "elementos-constructivos-motor-gasolina", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Rendimiento y parámetros característicos del motor", seccion: "rendimiento-parametros-motor", articulos: "Conceptos fundamentales" },
  ],
}]);

const S1 = "ciclo-otto-combustion-gasolina";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un motor de combustión interna alternativo?", reverso: "Un motor térmico en el que la combustión de una mezcla de combustible y aire tiene lugar en el interior de un cilindro, provocando el movimiento alternativo (de vaivén) de un pistón, que se transforma después en movimiento rotativo mediante el cigüeñal" },
  { anverso: "¿Cuáles son los cuatro tiempos del ciclo Otto de un motor de gasolina?", reverso: "Admisión (entra la mezcla aire-combustible), compresión (el pistón comprime la mezcla), explosión o combustión (la bujía enciende la mezcla, empujando el pistón) y escape (se evacúan los gases quemados)" },
  { anverso: "¿Qué ocurre en el tiempo de admisión del ciclo Otto?", reverso: "La válvula de admisión se abre y el pistón desciende, permitiendo la entrada de la mezcla de aire y combustible (o solo aire, en motores de inyección directa) en el cilindro" },
  { anverso: "¿Qué ocurre en el tiempo de explosión o combustión del ciclo Otto?", reverso: "La bujía produce una chispa que enciende la mezcla comprimida, generando una expansión rápida de los gases que empuja el pistón hacia abajo, produciendo el trabajo útil del motor" },
  { anverso: "¿Qué es el punto muerto superior (PMS) y el punto muerto inferior (PMI)?", reverso: "El PMS es la posición más alta que alcanza el pistón dentro del cilindro; el PMI es la posición más baja. El recorrido del pistón entre ambos puntos se denomina carrera" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es un motor de combustión interna alternativo?", explicacion: "Un motor en el que la combustión tiene lugar dentro del cilindro y provoca el movimiento alternativo de un pistón.", dificultad: "facil", opciones: ["Un motor en el que la combustión provoca el movimiento de un pistón", "Un motor que funciona exclusivamente mediante energía eléctrica", "Un motor en el que la combustión ocurre fuera del cilindro", "Un motor que no requiere ningún tipo de combustible"], correcta: 0 },
  { enunciado: "¿Cuáles son los cuatro tiempos del ciclo Otto?", explicacion: "Admisión, compresión, explosión (o combustión) y escape.", dificultad: "media", opciones: ["Admisión, compresión, explosión y escape", "Admisión, refrigeración, engrase y escape", "Compresión, filtrado, combustión y refrigeración", "Admisión, lubricación, combustión y filtrado"], correcta: 0 },
  { enunciado: "¿Qué ocurre durante el tiempo de admisión del ciclo Otto?", explicacion: "Entra la mezcla de aire y combustible en el cilindro mientras el pistón desciende.", dificultad: "media", opciones: ["Entra la mezcla de aire y combustible en el cilindro", "Se evacúan los gases quemados del cilindro", "La bujía enciende la mezcla comprimida en el cilindro", "El pistón comprime la mezcla dentro del cilindro"], correcta: 0 },
  { enunciado: "¿Qué elemento produce la chispa que enciende la mezcla en el tiempo de explosión?", explicacion: "La bujía de encendido.", dificultad: "facil", opciones: ["La bujía de encendido", "El inyector de combustible", "La válvula de escape del cilindro", "El termostato del sistema de refrigeración"], correcta: 0 },
  { enunciado: "¿Qué es la carrera del pistón?", explicacion: "El recorrido del pistón entre el punto muerto superior y el punto muerto inferior.", dificultad: "media", opciones: ["El recorrido del pistón entre el PMS y el PMI", "El diámetro interior del cilindro del motor", "El número total de cilindros del motor", "La presión máxima alcanzada en la combustión"], correcta: 0 },
]);

const S2 = "elementos-constructivos-motor-gasolina";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es el bloque motor?", reverso: "La estructura principal del motor, generalmente de fundición o aleación de aluminio, que aloja los cilindros y sirve de soporte al resto de elementos mecánicos del motor" },
  { anverso: "¿Qué es la culata de un motor de gasolina?", reverso: "La pieza que cierra la parte superior del bloque motor, alojando las válvulas de admisión y escape, las bujías, y en muchos motores también el árbol de levas" },
  { anverso: "¿Qué es el pistón y qué función cumple?", reverso: "Un elemento cilíndrico que se desplaza dentro del cilindro, recibiendo la fuerza de la combustión y transmitiéndola a la biela; lleva segmentos que sellan la cámara de combustión y controlan el consumo de aceite" },
  { anverso: "¿Qué es la biela?", reverso: "El elemento que une el pistón con el cigüeñal, transformando el movimiento alternativo (de vaivén) del pistón en el movimiento rotativo del cigüeñal" },
  { anverso: "¿Qué es el cigüeñal?", reverso: "El eje que recoge el movimiento de todas las bielas y lo transforma en un movimiento de rotación continuo, que finalmente se transmite hacia la caja de cambios y las ruedas del vehículo" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es el bloque motor?", explicacion: "La estructura principal que aloja los cilindros y sirve de soporte al resto de elementos del motor.", dificultad: "facil", opciones: ["La estructura principal que aloja los cilindros del motor", "El elemento que cierra la parte superior del bloque motor", "El eje que transforma el movimiento de las bielas en rotación", "El elemento que une el pistón con el cigüeñal"], correcta: 0 },
  { enunciado: "¿Qué elementos aloja habitualmente la culata de un motor de gasolina?", explicacion: "Las válvulas de admisión y escape, las bujías, y en muchos casos el árbol de levas.", dificultad: "media", opciones: ["Válvulas, bujías y, a menudo, el árbol de levas", "Únicamente el cigüeñal del motor", "Únicamente el cárter de aceite del motor", "Únicamente el radiador del sistema de refrigeración"], correcta: 0 },
  { enunciado: "¿Qué función cumple el pistón dentro del cilindro?", explicacion: "Recibe la fuerza de la combustión y la transmite a la biela.", dificultad: "media", opciones: ["Recibe la fuerza de la combustión y la transmite a la biela", "Impulsa el líquido refrigerante por el circuito de refrigeración", "Filtra las impurezas presentes en el aceite del motor", "Produce la chispa que enciende la mezcla de combustible"], correcta: 0 },
  { enunciado: "¿Qué función cumple la biela?", explicacion: "Une el pistón con el cigüeñal, transformando el movimiento alternativo en rotativo.", dificultad: "media", opciones: ["Une el pistón con el cigüeñal transformando el movimiento", "Cierra la parte superior del bloque motor del vehículo", "Aloja las válvulas de admisión y escape del motor", "Impulsa el combustible a presión hacia los inyectores"], correcta: 0 },
  { enunciado: "¿Qué función cumple el cigüeñal?", explicacion: "Transforma el movimiento de las bielas en un movimiento de rotación continuo.", dificultad: "media", opciones: ["Transforma el movimiento de las bielas en rotación continua", "Cierra la parte superior del bloque motor del vehículo", "Filtra las impurezas presentes en el combustible del motor", "Regula la apertura y cierre de las válvulas del motor"], correcta: 0 },
]);

const S3 = "rendimiento-parametros-motor";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es la cilindrada de un motor?", reverso: "El volumen total desplazado por todos los pistones del motor al recorrer su carrera completa, expresado habitualmente en centímetros cúbicos (cc) o litros; es uno de los parámetros básicos que caracterizan un motor" },
  { anverso: "¿Qué es la relación de compresión de un motor?", reverso: "La relación entre el volumen del cilindro cuando el pistón está en el punto muerto inferior y el volumen cuando está en el punto muerto superior; indica cuánto se comprime la mezcla antes de la combustión" },
  { anverso: "¿Qué es la potencia de un motor?", reverso: "El trabajo que el motor es capaz de realizar por unidad de tiempo, expresado habitualmente en caballos de vapor (CV) o kilovatios (kW); indica la capacidad del motor para realizar trabajo a un régimen determinado" },
  { anverso: "¿Qué es el par motor?", reverso: "La fuerza de giro (momento de fuerza) que el motor es capaz de generar en el cigüeñal, expresada habitualmente en newton-metro (N·m); determina la capacidad de aceleración y tracción del vehículo, especialmente a bajas revoluciones" },
  { anverso: "¿Qué diferencia hay, en la práctica, entre potencia y par motor a la hora de valorar un vehículo?", reverso: "La potencia indica la capacidad de trabajo a un régimen elevado (velocidad punta), mientras que el par motor indica la capacidad de tracción y aceleración, especialmente relevante en vehículos de carga o trabajo a bajas revoluciones" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es la cilindrada de un motor?", explicacion: "El volumen total desplazado por todos los pistones al recorrer su carrera completa.", dificultad: "facil", opciones: ["El volumen total desplazado por todos los pistones", "La fuerza de giro que el motor genera en el cigüeñal", "El trabajo que el motor realiza por unidad de tiempo", "La relación entre el volumen del cilindro en PMI y PMS"], correcta: 0 },
  { enunciado: "¿Qué indica la relación de compresión de un motor?", explicacion: "Cuánto se comprime la mezcla dentro del cilindro antes de la combustión.", dificultad: "media", opciones: ["Cuánto se comprime la mezcla antes de la combustión", "El volumen total desplazado por los pistones del motor", "El trabajo que el motor realiza por unidad de tiempo", "La fuerza de giro que el motor genera en el cigüeñal"], correcta: 0 },
  { enunciado: "¿En qué unidades se expresa habitualmente la potencia de un motor?", explicacion: "Caballos de vapor (CV) o kilovatios (kW).", dificultad: "facil", opciones: ["Caballos de vapor (CV) o kilovatios (kW)", "Newton-metro (N·m) exclusivamente", "Centímetros cúbicos (cc) exclusivamente", "Bares de presión exclusivamente"], correcta: 0 },
  { enunciado: "¿Qué es el par motor?", explicacion: "La fuerza de giro que el motor genera en el cigüeñal, expresada en N·m.", dificultad: "media", opciones: ["La fuerza de giro que el motor genera en el cigüeñal", "El volumen total desplazado por los pistones del motor", "La cantidad de combustible consumida por el motor", "La temperatura máxima alcanzada durante la combustión"], correcta: 0 },
  { enunciado: "¿Qué parámetro resulta especialmente relevante para la capacidad de tracción de un vehículo de trabajo a bajas revoluciones?", explicacion: "El par motor.", dificultad: "dificil", opciones: ["El par motor", "La cilindrada exclusivamente, sin relación con el par", "La relación de compresión exclusivamente", "El color de los gases de escape del motor"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 11 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 11, orden: 11, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-175 creado y vinculado como Tema 11 de Oficial Mecánico.");
