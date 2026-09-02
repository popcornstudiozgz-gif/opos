/**
 * Crea tema-176: "Encendido de un motor del automóvil" — Tema 12
 * (numero=12, bloque-2) de Oficial Mecánico.
 *
 * Corresponde al TEMA 10 oficial: "Encendido de un motor del
 * automóvil."
 *
 * Conocimiento técnico consolidado de mecánica del automóvil, sin una
 * ley española que lo regule como tal.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-176-encendido-automovil.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-176";
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
  titulo: "Encendido de un motor del automóvil",
  descripcion: "El sistema de encendido del motor de gasolina: encendido convencional por bobina y ruptor, encendido electrónico integral, y los elementos de encendido (bujías y cables).",
  contenido: "Desarrolla el sistema de encendido de un motor de gasolina, desde el encendido convencional por bobina y ruptor (ya en desuso) hasta los sistemas de encendido electrónico integral (DIS, sin distribuidor), y los elementos que intervienen directamente en la producción de la chispa: bujías y cables de encendido (o bobinas independientes por cilindro).",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "El sistema de encendido convencional por bobina", seccion: "sistema-encendido-convencional-bobina", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "El encendido electrónico integral (DIS)", seccion: "encendido-electronico-dis", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Bujías y cables de encendido", seccion: "bujias-cables-encendido", articulos: "Conceptos fundamentales" },
  ],
}]);

const S1 = "sistema-encendido-convencional-bobina";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Cuál es la función del sistema de encendido en un motor de gasolina?", reverso: "Generar y distribuir en el momento exacto la chispa de alta tensión que enciende la mezcla de aire-combustible comprimida en cada cilindro, en el instante adecuado según el régimen y la carga del motor" },
  { anverso: "¿Qué es la bobina de encendido?", reverso: "Un transformador que eleva la tensión de la batería (unos 12 V) hasta varios miles de voltios, necesarios para que salte la chispa entre los electrodos de la bujía" },
  { anverso: "¿Qué es el distribuidor de encendido, en un sistema convencional?", reverso: "Un elemento mecánico, sincronizado con el giro del motor, que reparte la alta tensión generada por la bobina hacia la bujía del cilindro que corresponde en cada momento, según el orden de encendido del motor" },
  { anverso: "¿Qué es el ruptor, en un sistema de encendido convencional (ya en desuso)?", reverso: "Un interruptor mecánico accionado por una leva giratoria que interrumpe periódicamente el paso de corriente por el primario de la bobina, provocando la inducción de alta tensión en el secundario" },
  { anverso: "¿Por qué se abandonaron los sistemas de encendido convencionales con ruptor mecánico?", reverso: "Porque el contacto mecánico del ruptor se desgastaba con el uso, requería ajustes periódicos (punto de contacto) y no ofrecía la precisión y fiabilidad de los sistemas electrónicos modernos" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Cuál es la función del sistema de encendido en un motor de gasolina?", explicacion: "Generar y distribuir la chispa que enciende la mezcla comprimida en cada cilindro.", dificultad: "facil", opciones: ["Generar y distribuir la chispa que enciende la mezcla", "Impulsar el combustible a presión hacia los inyectores", "Evacuar el calor generado por la combustión del motor", "Filtrar las impurezas presentes en el aceite del motor"], correcta: 0 },
  { enunciado: "¿Qué función cumple la bobina de encendido?", explicacion: "Eleva la tensión de la batería hasta la necesaria para que salte la chispa en la bujía.", dificultad: "media", opciones: ["Eleva la tensión de la batería para producir la chispa", "Filtra las impurezas presentes en el combustible del motor", "Impulsa el líquido refrigerante por el circuito de refrigeración", "Regula la apertura y cierre de las válvulas del motor"], correcta: 0 },
  { enunciado: "¿Qué función cumple el distribuidor en un sistema de encendido convencional?", explicacion: "Reparte la alta tensión hacia la bujía del cilindro que corresponde en cada momento.", dificultad: "media", opciones: ["Reparte la alta tensión hacia la bujía correspondiente", "Genera directamente la alta tensión de la chispa", "Filtra las impurezas presentes en el aceite del motor", "Impulsa el combustible a presión hacia los inyectores"], correcta: 0 },
  { enunciado: "¿Qué es el ruptor en un sistema de encendido convencional?", explicacion: "Un interruptor mecánico que interrumpe periódicamente el paso de corriente por el primario de la bobina.", dificultad: "dificil", opciones: ["Un interruptor mecánico que interrumpe la corriente del primario", "Un elemento que filtra las impurezas del combustible", "Un elemento que regula la temperatura del motor", "Un elemento que impulsa el aceite por el circuito de engrase"], correcta: 0 },
  { enunciado: "¿Por qué se abandonaron progresivamente los sistemas de encendido con ruptor mecánico?", explicacion: "El contacto mecánico se desgastaba, requería ajustes periódicos y era menos preciso que los sistemas electrónicos.", dificultad: "media", opciones: ["El contacto mecánico se desgastaba y requería ajustes periódicos", "No existía ningún motivo real para su sustitución", "Los sistemas electrónicos resultan siempre más económicos de fabricar", "El ruptor mecánico nunca llegó a emplearse en la práctica"], correcta: 0 },
]);

const S2 = "encendido-electronico-dis";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un sistema de encendido electrónico integral (DIS, Distributorless Ignition System)?", reverso: "Un sistema de encendido sin distribuidor mecánico, en el que la centralita electrónica controla directamente el momento de encendido de cada cilindro mediante bobinas individuales o compartidas entre pares de cilindros" },
  { anverso: "¿Qué ventaja aporta el encendido electrónico integral frente al sistema convencional con distribuidor?", reverso: "Mayor precisión en el punto de encendido, ausencia de piezas mecánicas de desgaste (distribuidor, ruptor), y capacidad de adaptar el avance de encendido en tiempo real según múltiples parámetros del motor" },
  { anverso: "¿Qué es una bobina individual (bobina-vela) en un sistema de encendido moderno?", reverso: "Una bobina de encendido montada directamente sobre cada bujía, sin necesidad de cable de alta tensión, que la centralita activa de forma independiente para cada cilindro" },
  { anverso: "¿Qué es el sensor de posición del cigüeñal, en relación con el encendido electrónico?", reverso: "Un sensor que informa a la centralita de la posición exacta y la velocidad de giro del cigüeñal, dato imprescindible para calcular el momento exacto de encendido de cada cilindro" },
  { anverso: "¿Qué es el avance del encendido?", reverso: "El adelanto, respecto al punto muerto superior, en el que salta la chispa, calculado por la centralita según el régimen y la carga del motor para optimizar el rendimiento de la combustión" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué caracteriza a un sistema de encendido electrónico integral (DIS)?", explicacion: "No emplea distribuidor mecánico; la centralita controla directamente el encendido de cada cilindro.", dificultad: "media", opciones: ["No emplea distribuidor mecánico, controlado por la centralita", "Emplea siempre un distribuidor mecánico convencional", "No emplea ninguna bobina de encendido en su funcionamiento", "Es un sistema exclusivo de los motores diésel modernos"], correcta: 0 },
  { enunciado: "¿Qué ventaja aporta el encendido electrónico frente al sistema convencional con distribuidor?", explicacion: "Mayor precisión, ausencia de piezas mecánicas de desgaste y adaptación en tiempo real del avance de encendido.", dificultad: "media", opciones: ["Mayor precisión y ausencia de piezas mecánicas de desgaste", "No aporta ninguna ventaja real frente al sistema convencional", "Es siempre más costoso sin ofrecer ninguna mejora técnica", "Elimina por completo la necesidad de bujías en el motor"], correcta: 0 },
  { enunciado: "¿Qué es una bobina individual o bobina-vela?", explicacion: "Una bobina montada directamente sobre cada bujía, sin cable de alta tensión.", dificultad: "media", opciones: ["Una bobina montada directamente sobre cada bujía", "Un tipo de bujía especial de mayor duración", "Un elemento del sistema de refrigeración del motor", "Un elemento del sistema de alimentación de combustible"], correcta: 0 },
  { enunciado: "¿Qué información aporta el sensor de posición del cigüeñal al sistema de encendido electrónico?", explicacion: "La posición exacta y velocidad de giro del cigüeñal, necesaria para calcular el momento de encendido.", dificultad: "dificil", opciones: ["La posición exacta y velocidad de giro del cigüeñal", "La temperatura del líquido refrigerante del motor", "El nivel de combustible en el depósito del vehículo", "La presión del aceite en el circuito de engrase"], correcta: 0 },
  { enunciado: "¿Qué es el avance del encendido?", explicacion: "El adelanto respecto al PMS en el que salta la chispa, calculado por la centralita.", dificultad: "dificil", opciones: ["El adelanto respecto al PMS en el que salta la chispa", "El tiempo que tarda el motor en arrancar en frío", "La cantidad de combustible inyectada en cada ciclo", "La presión máxima alcanzada durante la compresión"], correcta: 0 },
]);

const S3 = "bujias-cables-encendido";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es una bujía de encendido?", reverso: "El elemento que, situado en la cámara de combustión, recibe la alta tensión y produce el salto de chispa entre sus electrodos, iniciando así la combustión de la mezcla comprimida" },
  { anverso: "¿Qué es la distancia entre electrodos (o gap) de una bujía?", reverso: "La separación exacta entre el electrodo central y el electrodo de masa de la bujía, especificada por el fabricante del vehículo, de la que depende que la chispa salte de forma adecuada" },
  { anverso: "¿Qué es el grado térmico de una bujía?", reverso: "Una característica que indica la capacidad de la bujía para disipar el calor generado en la combustión; una bujía 'fría' disipa más calor (adecuada para motores exigentes), una bujía 'caliente' retiene más calor (adecuada para uso suave o ciudad)" },
  { anverso: "¿Qué síntomas puede provocar una bujía en mal estado o desgastada?", reverso: "Fallos de encendido (motor 'renqueante'), dificultad de arranque, aumento del consumo de combustible, pérdida de potencia y mayor emisión de contaminantes" },
  { anverso: "¿Qué son los cables de encendido, en los sistemas que aún los emplean?", reverso: "Conductores de alta tensión, con un aislamiento especial, que transportan la corriente de alta tensión desde la bobina (o el distribuidor) hasta cada bujía; su deterioro puede provocar fugas de corriente y fallos de encendido" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué función cumple la bujía de encendido?", explicacion: "Produce el salto de chispa entre sus electrodos, iniciando la combustión.", dificultad: "facil", opciones: ["Produce el salto de chispa que inicia la combustión", "Impulsa el combustible a presión hacia el cilindro", "Filtra las impurezas presentes en el aceite del motor", "Regula la temperatura del líquido refrigerante"], correcta: 0 },
  { enunciado: "¿Qué es la distancia entre electrodos de una bujía?", explicacion: "La separación entre el electrodo central y el de masa, especificada por el fabricante.", dificultad: "media", opciones: ["La separación entre el electrodo central y el de masa", "La longitud total de la bujía instalada en el motor", "El diámetro de la rosca de la bujía en el cilindro", "El número de electrodos que tiene la bujía"], correcta: 0 },
  { enunciado: "¿Qué indica el grado térmico de una bujía?", explicacion: "Su capacidad para disipar el calor generado en la combustión.", dificultad: "dificil", opciones: ["Su capacidad para disipar el calor de la combustión", "La tensión eléctrica que necesita para funcionar", "El material del que está fabricado el electrodo central", "El precio de mercado de la bujía instalada"], correcta: 0 },
  { enunciado: "¿Qué síntoma es característico de una bujía en mal estado?", explicacion: "Fallos de encendido, con el motor funcionando de forma irregular ('renqueante').", dificultad: "media", opciones: ["Fallos de encendido, con el motor funcionando de forma irregular", "Un aumento notable de la presión de los neumáticos", "Una reducción del nivel de líquido refrigerante del motor", "Un cambio en el color de la carrocería del vehículo"], correcta: 0 },
  { enunciado: "¿Qué riesgo presenta un cable de encendido deteriorado?", explicacion: "Fugas de corriente de alta tensión, que pueden provocar fallos de encendido.", dificultad: "media", opciones: ["Fugas de corriente de alta tensión y fallos de encendido", "Ningún riesgo relevante para el funcionamiento del motor", "Un aumento del nivel de aceite del motor", "Una reducción de la temperatura del motor en marcha"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 12 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 12, orden: 12, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-176 creado y vinculado como Tema 12 de Oficial Mecánico.");
