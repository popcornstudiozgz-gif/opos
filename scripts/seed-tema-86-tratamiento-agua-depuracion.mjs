/**
 * Crea tema-86: "Tratamiento del agua de piscinas: depuración" — Tema 16
 * (numero=16, bloque-2) de Oficial Polivalente Instalaciones Deportivas
 * (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 14 oficial del Anexo I (bases2110.pdf):
 *   "Tratamiento del agua de las piscinas: Depuración. Tipos,
 *   características y componentes. El ciclo de depuración con filtros
 *   de arena de sílice. Operaciones básicas de mantenimiento y uso de
 *   equipos de depuración y elementos auxiliares."
 *
 * Conocimiento técnico consolidado del oficio (funcionamiento de
 * sistemas de depuración de piscinas, filtros de arena de sílice); no
 * requiere cita legal artículo a artículo. Complementa al Decreto
 * 50/1993 (tema-85), que exige la depuración pero no detalla su
 * funcionamiento técnico.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-86-tratamiento-agua-depuracion.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-86";
const OPOSICION = "oficial-instalaciones-deportivas-ayto-zaragoza";
const BLOQUE_2_ID = "cdb0920b-a2d8-4ea8-b3fc-b80168d7361a";

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
  titulo: "Tratamiento del agua de piscinas: depuración",
  descripcion: "Tipos, características y componentes de la depuración del agua de piscinas. El ciclo de depuración con filtros de arena de sílice. Operaciones básicas de mantenimiento de equipos de depuración.",
  contenido: "Desarrolla el ciclo de depuración del agua de una piscina: componentes del circuito de depuración, funcionamiento de los filtros de arena de sílice, y las operaciones básicas de mantenimiento y uso de los equipos de depuración y sus elementos auxiliares.",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "Ciclo de depuración: componentes del circuito", seccion: "ciclo-depuracion-componentes-circuito", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Filtros de arena de sílice: funcionamiento", seccion: "filtros-arena-silice-funcionamiento", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Mantenimiento de equipos de depuración y elementos auxiliares", seccion: "mantenimiento-equipos-depuracion", articulos: "Conceptos fundamentales" },
  ],
}]);

const S1 = "ciclo-depuracion-componentes-circuito";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es el ciclo de depuración de una piscina?", reverso: "El recorrido continuo que sigue el agua desde que se recoge en el vaso (por el rebosadero y los skimmers) hasta que, tras pasar por el sistema de filtración y tratamiento, vuelve limpia y desinfectada al vaso" },
  { anverso: "¿Qué es un skimmer en una piscina?", reverso: "Un dispositivo situado en la pared del vaso que recoge el agua superficial (junto con hojas, insectos y suciedad flotante) hacia el circuito de depuración, complementando o sustituyendo al rebosadero según el tipo de piscina" },
  { anverso: "¿Qué es un vaso de compensación (o depósito de compensación) en una piscina?", reverso: "Un depósito que recibe el agua recogida por el rebosadero, regulando las variaciones de nivel del vaso (por ejemplo, al entrar bañistas) antes de enviarla a la bomba y el filtro" },
  { anverso: "¿Qué función cumple la bomba de circulación en el circuito de depuración?", reverso: "Impulsar el agua desde el vaso de compensación (o skimmers) a través del filtro y, tras su tratamiento, de vuelta al vaso, garantizando la renovación continua del agua" },
  { anverso: "¿Qué es un pre-filtro (o cesta de la bomba) en el circuito de depuración?", reverso: "Un elemento situado antes de la bomba que retiene hojas, insectos y residuos gruesos, protegiendo el rodete de la bomba de posibles atascos o daños" },
  { anverso: "¿Qué orden siguen habitualmente los componentes en el circuito de depuración de una piscina?", reverso: "Recogida de agua (rebosadero/skimmer) → vaso de compensación → pre-filtro → bomba → filtro → sistema de desinfección/calentamiento → retorno al vaso mediante boquillas de impulsión" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es el ciclo de depuración de una piscina?", explicacion: "El recorrido continuo del agua desde su recogida hasta su tratamiento y retorno al vaso.", dificultad: "facil", opciones: ["El recorrido del agua desde su recogida hasta su retorno tratada", "El proceso de vaciado completo del vaso", "El proceso de pintado del vaso", "El proceso de calefacción del agua exclusivamente"], correcta: 0 },
  { enunciado: "¿Qué es un skimmer en una piscina?", explicacion: "Un dispositivo que recoge el agua superficial y suciedad flotante.", dificultad: "media", opciones: ["Un dispositivo que recoge agua superficial y suciedad", "Un tipo de filtro de arena", "Un producto químico desinfectante", "Un elemento de la red eléctrica"], correcta: 0 },
  { enunciado: "¿Qué función cumple el vaso de compensación?", explicacion: "Recibe el agua del rebosadero y regula variaciones de nivel.", dificultad: "media", opciones: ["Recibe el agua y regula variaciones de nivel", "Genera el calor del agua", "Desinfecta el agua con cloro", "Sustituye al filtro de arena"], correcta: 0 },
  { enunciado: "¿Qué función cumple la bomba de circulación?", explicacion: "Impulsa el agua a través del filtro y de vuelta al vaso.", dificultad: "facil", opciones: ["Impulsa el agua a través del filtro y al vaso", "Filtra las partículas finas del agua", "Regula el pH del agua automáticamente", "Genera electricidad para el circuito"], correcta: 0 },
  { enunciado: "¿Para qué sirve el pre-filtro o cesta de la bomba?", explicacion: "Protege el rodete de la bomba reteniendo residuos gruesos.", dificultad: "media", opciones: ["Protege el rodete reteniendo residuos gruesos", "Desinfecta químicamente el agua", "Calienta el agua antes de la bomba", "Sustituye al filtro de arena de sílice"], correcta: 0 },
  { enunciado: "¿Cuál es el orden habitual del circuito de depuración?", explicacion: "Recogida → compensación → pre-filtro → bomba → filtro → desinfección/calentamiento → retorno.", dificultad: "dificil", opciones: ["Recogida, compensación, pre-filtro, bomba, filtro y retorno", "Filtro, bomba, recogida y retorno directo", "Desinfección, bomba, recogida y filtro", "Retorno, recogida, bomba y desinfección"], correcta: 0 },
]);

const S2 = "filtros-arena-silice-funcionamiento";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un filtro de arena de sílice?", reverso: "Un recipiente a presión que contiene un lecho de arena de sílice de granulometría específica, a través del cual se hace pasar el agua para retener partículas en suspensión" },
  { anverso: "¿Cómo retiene las partículas un filtro de arena de sílice?", reverso: "El agua atraviesa el lecho de arena, quedando las partículas en suspensión retenidas entre los granos de arena por un efecto mecánico de tamizado y adherencia" },
  { anverso: "¿Qué es el 'lavado a contracorriente' (backwash) de un filtro de arena?", reverso: "Una operación de limpieza que invierte el sentido del flujo de agua a través del filtro, arrastrando la suciedad acumulada en la arena hacia el desagüe, regenerando así su capacidad de filtración" },
  { anverso: "¿Qué indica un aumento significativo de la presión en el manómetro de un filtro de arena?", reverso: "Que el filtro está colmatado (saturado de suciedad) y necesita un lavado a contracorriente para recuperar su capacidad de filtración" },
  { anverso: "¿Qué es el enjuague (rinse) tras un lavado a contracorriente de un filtro de arena?", reverso: "Una fase corta posterior al lavado que compacta de nuevo la arena y evita que restos de suciedad removida pasen directamente al vaso de la piscina al retomar la filtración normal" },
  { anverso: "¿Con qué frecuencia debe renovarse la arena de un filtro de piscina?", reverso: "Habitualmente cada varios años (según uso e indicaciones del fabricante), ya que con el tiempo la arena pierde capacidad filtrante por desgaste y colmatación progresiva de sus granos" },
  { anverso: "¿Qué es la válvula selectora (multiválvula) de un filtro de arena?", reverso: "El elemento que permite seleccionar el modo de funcionamiento del filtro: filtración normal, lavado a contracorriente, enjuague, vaciado directo, recirculación o cerrado" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es un filtro de arena de sílice?", explicacion: "Un recipiente a presión con un lecho de arena que retiene partículas en suspensión.", dificultad: "facil", opciones: ["Un recipiente con arena que retiene partículas", "Un tipo de bomba de circulación", "Un producto químico desinfectante", "Un depósito de compensación"], correcta: 0 },
  { enunciado: "¿Qué es el lavado a contracorriente (backwash) de un filtro?", explicacion: "Una operación que invierte el flujo para arrastrar la suciedad hacia el desagüe.", dificultad: "media", opciones: ["Invertir el flujo para arrastrar la suciedad", "Añadir más arena al filtro", "Aumentar la temperatura del agua", "Cambiar la válvula selectora por otra"], correcta: 0 },
  { enunciado: "¿Qué indica un aumento significativo de presión en el manómetro del filtro?", explicacion: "Que el filtro está colmatado y necesita lavado a contracorriente.", dificultad: "media", opciones: ["Que el filtro está colmatado", "Que hay una fuga en la bomba", "Que el agua está demasiado fría", "Que el pH del agua es incorrecto"], correcta: 0 },
  { enunciado: "¿Para qué sirve la fase de enjuague (rinse) tras el lavado a contracorriente?", explicacion: "Compacta la arena y evita que restos de suciedad pasen al vaso.", dificultad: "media", opciones: ["Compacta la arena y evita suciedad en el vaso", "Sustituye por completo la arena del filtro", "Calienta el agua antes de volver al vaso", "Desinfecta químicamente el agua filtrada"], correcta: 0 },
  { enunciado: "¿Con qué frecuencia debe renovarse la arena de un filtro de piscina?", explicacion: "Cada varios años, según uso e indicaciones del fabricante.", dificultad: "media", opciones: ["Cada varios años", "Cada día", "Cada semana", "Nunca es necesario renovarla"], correcta: 0 },
  { enunciado: "¿Qué función cumple la válvula selectora (multiválvula) de un filtro de arena?", explicacion: "Permite seleccionar el modo de funcionamiento del filtro.", dificultad: "media", opciones: ["Permite seleccionar el modo de funcionamiento", "Genera la desinfección química del agua", "Sustituye a la bomba de circulación", "Regula únicamente la temperatura del agua"], correcta: 0 },
]);

const S3 = "mantenimiento-equipos-depuracion";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué operación de mantenimiento básica debe realizarse a diario en el pre-filtro de la bomba de una piscina?", reverso: "Vaciar y limpiar la cesta del pre-filtro de hojas, insectos y residuos acumulados, para evitar que reduzcan el caudal de la bomba" },
  { anverso: "¿Qué revisión periódica debe hacerse sobre el manómetro del filtro de arena?", reverso: "Comprobar la presión de funcionamiento y compararla con la presión de referencia tras el último lavado, para decidir cuándo es necesario un nuevo lavado a contracorriente" },
  { anverso: "¿Qué mantenimiento preventivo básico requiere una bomba de circulación de piscina?", reverso: "Comprobar la ausencia de ruidos anómalos o vibraciones excesivas, verificar que no haya fugas en las juntas, y revisar el estado del motor eléctrico y sus conexiones" },
  { anverso: "¿Qué elemento auxiliar del circuito de depuración debe revisarse para detectar fugas de agua en el sistema?", reverso: "Las uniones, juntas y válvulas de las tuberías del circuito, comprobando visualmente la ausencia de goteos o humedad en las conexiones" },
  { anverso: "¿Por qué es importante llevar un registro de las operaciones de mantenimiento del sistema de depuración?", reverso: "Para tener trazabilidad de los lavados realizados, detectar patrones de colmatación anormalmente frecuentes, y cumplir con el registro sanitario exigido por la normativa de piscinas" },
  { anverso: "¿Qué precaución debe seguirse al manipular la válvula selectora de un filtro de arena durante su funcionamiento?", reverso: "Parar siempre la bomba antes de cambiar de posición la válvula selectora, para evitar dañar el mecanismo interno de la válvula por el flujo de agua a presión" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué operación diaria básica requiere el pre-filtro de la bomba?", explicacion: "Vaciar y limpiar la cesta de residuos acumulados.", dificultad: "facil", opciones: ["Vaciar y limpiar la cesta de residuos", "Sustituir la arena del filtro", "Cambiar el aceite de la bomba", "Pintar la carcasa del filtro"], correcta: 0 },
  { enunciado: "¿Para qué se compara la presión del manómetro del filtro con la de referencia?", explicacion: "Para decidir cuándo es necesario un nuevo lavado a contracorriente.", dificultad: "media", opciones: ["Para decidir cuándo lavar el filtro", "Para calcular el consumo eléctrico", "Para ajustar la temperatura del agua", "Para determinar el pH del agua"], correcta: 0 },
  { enunciado: "¿Qué mantenimiento preventivo requiere una bomba de circulación?", explicacion: "Comprobar ruidos, vibraciones, fugas y estado del motor.", dificultad: "media", opciones: ["Comprobar ruidos, fugas y estado del motor", "Solo revisar el color del agua", "Solo revisar la iluminación del vaso", "No requiere ningún mantenimiento periódico"], correcta: 0 },
  { enunciado: "¿Qué debe revisarse para detectar fugas en el circuito de depuración?", explicacion: "Uniones, juntas y válvulas de las tuberías.", dificultad: "media", opciones: ["Uniones, juntas y válvulas de las tuberías", "Solo el color de la arena del filtro", "Solo el manómetro de presión", "Solo el motor de la bomba"], correcta: 0 },
  { enunciado: "¿Por qué es importante registrar las operaciones de mantenimiento del sistema de depuración?", explicacion: "Para trazabilidad, detectar anomalías y cumplir el registro sanitario exigido.", dificultad: "media", opciones: ["Para trazabilidad y cumplir el registro sanitario", "No aporta ningún valor práctico", "Solo sirve para facturar a la empresa proveedora", "Solo es obligatorio en piscinas privadas"], correcta: 0 },
  { enunciado: "¿Qué precaución debe seguirse al manipular la válvula selectora del filtro?", explicacion: "Parar siempre la bomba antes de cambiar la posición.", dificultad: "media", opciones: ["Parar la bomba antes de cambiar la posición", "Manipularla siempre con la bomba en marcha", "No requiere ninguna precaución especial", "Solo manipularla con el vaso lleno de gente"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 16 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 16, orden: 16, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-86 creado y vinculado como Tema 16 de Oficial Polivalente Instalaciones Deportivas.");
