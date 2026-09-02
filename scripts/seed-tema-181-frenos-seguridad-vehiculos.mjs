/**
 * Crea tema-181: "Frenos del automóvil. Seguridad pasiva y activa en
 * los vehículos" — Tema 17 (numero=17, bloque-2) de Oficial Mecánico.
 *
 * Corresponde al TEMA 15 oficial: "Frenos del automóvil. Seguridad
 * pasiva y activa en los vehículos."
 *
 * Conocimiento técnico consolidado de mecánica del automóvil, sin una
 * ley española que lo regule como tal.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-181-frenos-seguridad-vehiculos.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-181";
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
  titulo: "Frenos del automóvil. Seguridad pasiva y activa en los vehículos",
  descripcion: "El sistema de frenos de tambor y de disco, los sistemas electrónicos de frenado (ABS, ESP), y los elementos de seguridad pasiva y activa de los vehículos.",
  contenido: "Desarrolla el sistema de frenos del automóvil, tanto de tambor como de disco, los sistemas electrónicos que mejoran su eficacia y seguridad (ABS, y de forma más amplia el ESP), y los conceptos de seguridad pasiva (que reduce las consecuencias de un accidente: airbags, cinturones, estructura del vehículo) y seguridad activa (que ayuda a evitar el accidente: frenos, ABS, ESP, luces) en los vehículos.",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "El sistema de frenos: tambor y disco", seccion: "sistema-frenos-tambor-disco", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "El ABS y otros sistemas electrónicos de frenado", seccion: "abs-sistemas-electronicos-frenado", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Seguridad pasiva y activa en los vehículos", seccion: "seguridad-pasiva-activa-vehiculos", articulos: "Conceptos fundamentales" },
  ],
}]);

const S1 = "sistema-frenos-tambor-disco";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Cuál es la función del sistema de frenos de un automóvil?", reverso: "Reducir la velocidad del vehículo o detenerlo por completo, transformando la energía cinética del movimiento en calor mediante el rozamiento de los elementos de fricción" },
  { anverso: "¿Cómo funciona el freno de disco?", reverso: "Una pinza de freno, accionada hidráulicamente, presiona unas pastillas de fricción contra un disco metálico solidario a la rueda, generando el rozamiento que frena el vehículo; el calor generado se disipa con relativa facilidad al estar el disco expuesto al aire" },
  { anverso: "¿Cómo funciona el freno de tambor?", reverso: "Unas zapatas de fricción, situadas dentro de un tambor solidario a la rueda, se expanden hidráulicamente contra la superficie interior del tambor, generando el rozamiento que frena el vehículo; disipa peor el calor que el freno de disco, al estar más cerrado" },
  { anverso: "¿Por qué es habitual que los frenos delanteros de un turismo sean de disco y los traseros, en muchos modelos, de tambor?", reverso: "Porque durante una frenada, el peso del vehículo se transfiere hacia el eje delantero, que soporta un mayor esfuerzo de frenado y por tanto genera más calor; el disco disipa mejor ese calor, mientras que el eje trasero, con menor exigencia, puede emplear tambor de forma más económica" },
  { anverso: "¿Qué es el líquido de frenos, y por qué es importante su mantenimiento?", reverso: "Un fluido hidráulico que transmite la presión del pedal de freno hasta las pinzas o cilindros de rueda; es higroscópico (absorbe humedad del ambiente con el tiempo), lo que reduce su punto de ebullición y su eficacia, por lo que debe sustituirse periódicamente según recomendación del fabricante" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Cuál es la función del sistema de frenos de un automóvil?", explicacion: "Reducir la velocidad o detener el vehículo transformando la energía cinética en calor por rozamiento.", dificultad: "facil", opciones: ["Reducir la velocidad o detener el vehículo mediante rozamiento", "Generar la chispa que enciende la mezcla del motor", "Impulsar el combustible a presión hacia los inyectores", "Evacuar el calor generado por la combustión del motor"], correcta: 0 },
  { enunciado: "¿Cómo funciona el freno de disco?", explicacion: "Una pinza presiona pastillas de fricción contra un disco metálico solidario a la rueda.", dificultad: "media", opciones: ["Una pinza presiona pastillas contra un disco solidario a la rueda", "Unas zapatas se expanden dentro de un tambor cerrado", "Un fluido hidráulico frena directamente la rueda sin fricción", "Un electroimán frena la rueda sin ningún elemento mecánico"], correcta: 0 },
  { enunciado: "¿Cómo funciona el freno de tambor?", explicacion: "Unas zapatas se expanden hidráulicamente contra la superficie interior de un tambor.", dificultad: "media", opciones: ["Unas zapatas se expanden contra la superficie interior de un tambor", "Una pinza presiona pastillas contra un disco expuesto al aire", "Un fluido hidráulico frena directamente la rueda sin fricción", "Un electroimán frena la rueda sin ningún elemento mecánico"], correcta: 0 },
  { enunciado: "¿Por qué el freno de disco disipa mejor el calor que el freno de tambor?", explicacion: "El disco está más expuesto al aire, mientras que el tambor es un elemento más cerrado.", dificultad: "media", opciones: ["El disco está más expuesto al aire que el tambor, más cerrado", "El tambor siempre disipa mejor el calor que el disco", "Ambos sistemas disipan el calor exactamente igual", "El calor no influye en el funcionamiento de ningún sistema de freno"], correcta: 0 },
  { enunciado: "¿Por qué el líquido de frenos debe sustituirse periódicamente?", explicacion: "Es higroscópico y absorbe humedad con el tiempo, reduciendo su punto de ebullición y eficacia.", dificultad: "dificil", opciones: ["Es higroscópico y absorbe humedad, reduciendo su eficacia", "El líquido de frenos nunca se degrada con el paso del tiempo", "Solo debe sustituirse si el vehículo no frena en absoluto", "El líquido de frenos es idéntico al aceite del motor"], correcta: 0 },
]);

const S2 = "abs-sistemas-electronicos-frenado";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es el ABS (Antilock Braking System, sistema antibloqueo de frenos)?", reverso: "Un sistema electrónico que evita el bloqueo total de las ruedas durante una frenada brusca, modulando la presión de frenado varias veces por segundo en cada rueda, permitiendo mantener la capacidad de dirigir el vehículo mientras se frena" },
  { anverso: "¿Por qué es importante evitar el bloqueo total de las ruedas al frenar?", reverso: "Porque una rueda bloqueada (deslizando sin girar) pierde adherencia direccional y de frenado respecto a una rueda que gira frenando al límite del agarre, aumentando la distancia de frenado y la pérdida de control del vehículo" },
  { anverso: "¿Qué son los sensores de velocidad de rueda, en relación con el ABS?", reverso: "Sensores situados en cada rueda que informan a la centralita del ABS de la velocidad de giro de cada una, permitiendo detectar si alguna rueda está a punto de bloquearse durante una frenada" },
  { anverso: "¿Qué es el ESP (Electronic Stability Program, control electrónico de estabilidad)?", reverso: "Un sistema que, apoyándose en el ABS y en sensores adicionales (de giro, de ángulo de volante), detecta si el vehículo empieza a derrapar o perder trayectoria, y frena de forma independiente alguna rueda concreta para ayudar a corregir la trayectoria del vehículo" },
  { anverso: "¿Qué es el reparto electrónico de frenada (EBD, Electronic Brakeforce Distribution)?", reverso: "Un sistema, habitualmente integrado con el ABS, que reparte de forma óptima la fuerza de frenado entre el eje delantero y trasero según las condiciones de carga y frenado en cada momento, mejorando la eficacia y estabilidad de la frenada" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué función cumple el ABS?", explicacion: "Evita el bloqueo total de las ruedas durante una frenada brusca, modulando la presión de frenado.", dificultad: "media", opciones: ["Evita el bloqueo total de las ruedas durante una frenada brusca", "Aumenta la velocidad máxima que puede alcanzar el vehículo", "Genera la chispa que enciende la mezcla del motor", "Filtra las impurezas presentes en el aceite del motor"], correcta: 0 },
  { enunciado: "¿Por qué es importante evitar el bloqueo total de las ruedas al frenar?", explicacion: "Una rueda bloqueada pierde adherencia direccional y de frenado respecto a una rueda que gira al límite del agarre.", dificultad: "dificil", opciones: ["Una rueda bloqueada pierde adherencia direccional y de frenado", "Una rueda bloqueada siempre frena de forma más eficaz", "El bloqueo de ruedas no influye en la distancia de frenado", "El bloqueo de ruedas mejora la capacidad de dirigir el vehículo"], correcta: 0 },
  { enunciado: "¿Qué información aportan los sensores de velocidad de rueda al sistema ABS?", explicacion: "La velocidad de giro de cada rueda, permitiendo detectar si alguna está a punto de bloquearse.", dificultad: "media", opciones: ["La velocidad de giro de cada rueda del vehículo", "La temperatura del líquido refrigerante del motor", "El nivel de combustible en el depósito del vehículo", "La presión del aceite en el circuito de engrase"], correcta: 0 },
  { enunciado: "¿Qué función cumple el ESP (control electrónico de estabilidad)?", explicacion: "Detecta pérdida de trayectoria y frena de forma independiente alguna rueda para ayudar a corregirla.", dificultad: "dificil", opciones: ["Frena de forma independiente una rueda para corregir la trayectoria", "Genera directamente la presión de sobrealimentación del motor", "Filtra las impurezas presentes en el combustible del motor", "Regula la apertura y cierre de las válvulas del motor"], correcta: 0 },
  { enunciado: "¿Qué función cumple el reparto electrónico de frenada (EBD)?", explicacion: "Reparte de forma óptima la fuerza de frenado entre el eje delantero y trasero según las condiciones de carga y frenado.", dificultad: "dificil", opciones: ["Reparte de forma óptima la fuerza de frenado entre ejes", "Genera la chispa que enciende la mezcla del motor", "Impulsa el combustible a presión hacia los inyectores", "Filtra las impurezas presentes en el aceite del motor"], correcta: 0 },
]);

const S3 = "seguridad-pasiva-activa-vehiculos";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es la seguridad activa de un vehículo?", reverso: "El conjunto de sistemas y elementos diseñados para ayudar a evitar que se produzca un accidente, como los frenos, el ABS, el ESP, las luces, o los sistemas de asistencia a la conducción" },
  { anverso: "¿Qué es la seguridad pasiva de un vehículo?", reverso: "El conjunto de sistemas y elementos diseñados para reducir las consecuencias de un accidente una vez que este ya se ha producido, como el airbag, el cinturón de seguridad, o la propia estructura deformable del vehículo" },
  { anverso: "¿Qué es una zona de deformación programada (zona de crumple)?", reverso: "Una parte de la estructura del vehículo, habitualmente en los extremos delantero y trasero, diseñada para deformarse de forma controlada en un impacto, absorbiendo energía y reduciendo la fuerza que llega al habitáculo de los ocupantes" },
  { anverso: "¿Qué es el pretensor del cinturón de seguridad?", reverso: "Un mecanismo que, en caso de colisión, retensa instantáneamente el cinturón de seguridad, eliminando la holgura y sujetando al ocupante de forma más eficaz contra el asiento antes de que actúe el airbag" },
  { anverso: "¿Qué es el airbag (bolsa de aire)?", reverso: "Un dispositivo de seguridad pasiva que, activado por sensores de impacto, despliega en fracciones de segundo una bolsa que amortigua el golpe del ocupante contra el volante, el salpicadero u otras partes del habitáculo durante una colisión" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es la seguridad activa de un vehículo?", explicacion: "El conjunto de sistemas diseñados para ayudar a evitar que se produzca un accidente.", dificultad: "facil", opciones: ["Sistemas diseñados para ayudar a evitar un accidente", "Sistemas diseñados para reducir las consecuencias de un accidente", "El conjunto de elementos decorativos del vehículo", "El conjunto de elementos del sistema de refrigeración"], correcta: 0 },
  { enunciado: "¿Qué es la seguridad pasiva de un vehículo?", explicacion: "El conjunto de sistemas diseñados para reducir las consecuencias de un accidente ya producido.", dificultad: "facil", opciones: ["Sistemas diseñados para reducir las consecuencias de un accidente", "Sistemas diseñados para ayudar a evitar que ocurra un accidente", "El conjunto de elementos decorativos del vehículo", "El conjunto de elementos del sistema de refrigeración"], correcta: 0 },
  { enunciado: "¿Qué función cumple una zona de deformación programada?", explicacion: "Se deforma de forma controlada absorbiendo energía y reduciendo la fuerza que llega al habitáculo.", dificultad: "media", opciones: ["Se deforma controladamente absorbiendo energía del impacto", "Impide cualquier tipo de deformación de la carrocería", "Aumenta la rigidez total de toda la estructura del vehículo", "Solo cumple una función estética en el diseño del vehículo"], correcta: 0 },
  { enunciado: "¿Qué función cumple el pretensor del cinturón de seguridad?", explicacion: "Retensa instantáneamente el cinturón en caso de colisión, eliminando la holgura.", dificultad: "media", opciones: ["Retensa instantáneamente el cinturón eliminando la holgura", "Despliega una bolsa de aire que amortigua el golpe del ocupante", "Reduce la velocidad del vehículo antes del impacto", "Bloquea las ruedas del vehículo durante una frenada brusca"], correcta: 0 },
  { enunciado: "¿Qué elemento de seguridad pasiva se activa mediante sensores de impacto para amortiguar el golpe del ocupante?", explicacion: "El airbag.", dificultad: "facil", opciones: ["El airbag", "El ABS del sistema de frenos", "El ESP del sistema de estabilidad", "El intercooler del sistema de sobrealimentación"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 17 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 17, orden: 17, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-181 creado y vinculado como Tema 17 de Oficial Mecánico.");
