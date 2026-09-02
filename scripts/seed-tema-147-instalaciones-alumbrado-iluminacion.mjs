/**
 * Crea tema-147: "Instalaciones de alumbrado e iluminación" — Tema 15
 * (numero=15, bloque-2) de Oficial Electricista (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 13 oficial del Anexo I (bases2110.pdf, línea 1348):
 *   "Instalaciones de Alumbrado e Iluminación. Luminotecnia: magnitudes
 *   básicas (flujo luminoso, intensidad luminosa, iluminancia y
 *   luminancia). Tipos de lámparas y luminarias (foco en tecnología LED).
 *   Sistemas de encendido y regulación. Alumbrado de emergencia y
 *   señalización."
 *
 * Las magnitudes luminotécnicas (flujo, intensidad, iluminancia,
 * luminancia) son magnitudes físicas del Sistema Internacional, sin una
 * ley española que las "regule" como tales — mismo criterio ya aplicado
 * en tema-140 para las magnitudes eléctricas básicas. Las prescripciones
 * reglamentarias de receptores para alumbrado (ITC-BT-44) y el alumbrado
 * de emergencia y señalización, ya desarrollado con más detalle en
 * tema-146 (locales de pública concurrencia), se citan aquí de forma
 * complementaria centrada en los sistemas de encendido y regulación.
 *
 * Fuente primaria: Real Decreto 842/2002 (REBT), ITC-BT-44 (receptores
 * para alumbrado) — BOE-A-2002-18099.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-147-instalaciones-alumbrado-iluminacion.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-147";
const OPOSICION = "oficial-electricista-ayto-zaragoza";
const BLOQUE_2_ID = "4dbd9335-cb26-48e5-a83b-aef9eeb23097";

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
  titulo: "Instalaciones de alumbrado e iluminación",
  descripcion: "Luminotecnia: magnitudes básicas (flujo luminoso, intensidad luminosa, iluminancia y luminancia). Tipos de lámparas y luminarias (foco en tecnología LED). Sistemas de encendido y regulación. Alumbrado de emergencia y señalización.",
  contenido: "Desarrolla las magnitudes básicas de la luminotecnia (flujo luminoso, intensidad luminosa, iluminancia y luminancia), los tipos de lámparas y luminarias empleados en instalaciones de alumbrado con especial atención a la tecnología LED, los sistemas de encendido y regulación del alumbrado (interruptores, detectores de presencia, reguladores de intensidad o dimmers, sistemas de encendido centralizado), y una síntesis del alumbrado de emergencia y de señalización, ya desarrollado con más detalle en el tema de locales de pública concurrencia.",
  enlaces_boe: [
    { titulo: "Real Decreto 842/2002, Reglamento electrotécnico para baja tensión (ITC-BT-44)", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2002-18099" },
  ],
  indice_estudio: [
    { url: "", titulo: "Luminotecnia: magnitudes básicas", seccion: "luminotecnia-magnitudes-basicas", articulos: "Conceptos fundamentales" },
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2002-18099", titulo: "Tipos de lámparas y luminarias (tecnología LED)", seccion: "tipos-lamparas-luminarias-led", articulos: "ITC-BT-44" },
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2002-18099", titulo: "Sistemas de encendido y regulación. Alumbrado de emergencia y señalización", seccion: "sistemas-encendido-regulacion-alumbrado-emergencia", articulos: "ITC-BT-44, ITC-BT-28" },
  ],
}]);

const S1 = "luminotecnia-magnitudes-basicas";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es el flujo luminoso y en qué unidad se mide?", reverso: "La cantidad total de luz emitida por una fuente luminosa en todas direcciones por unidad de tiempo; se mide en lúmenes (lm)" },
  { anverso: "¿Qué es la intensidad luminosa y en qué unidad se mide?", reverso: "El flujo luminoso emitido por una fuente en una dirección determinada, por unidad de ángulo sólido; se mide en candelas (cd)" },
  { anverso: "¿Qué es la iluminancia y en qué unidad se mide?", reverso: "El flujo luminoso que incide sobre una superficie, por unidad de superficie; se mide en lux (lx), y es la magnitud habitualmente empleada para especificar el nivel de luz recomendado en un puesto de trabajo o estancia" },
  { anverso: "¿Qué es la luminancia y en qué unidad se mide?", reverso: "La intensidad luminosa percibida por el ojo humano procedente de una superficie iluminada o luminosa, por unidad de superficie aparente; se mide en candelas por metro cuadrado (cd/m²)" },
  { anverso: "¿Qué diferencia fundamental existe entre iluminancia y luminancia?", reverso: "La iluminancia mide la luz que incide sobre una superficie (causa), mientras que la luminancia mide la luz que dicha superficie refleja o emite hacia el ojo del observador (efecto percibido)" },
  { anverso: "¿Qué es el rendimiento luminoso o eficacia luminosa de una lámpara?", reverso: "La relación entre el flujo luminoso emitido (en lúmenes) y la potencia eléctrica consumida (en vatios), expresada en lúmenes por vatio (lm/W); a mayor eficacia, menor consumo para un mismo nivel de iluminación" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿En qué unidad se mide el flujo luminoso?", explicacion: "En lúmenes (lm).", dificultad: "facil", opciones: ["Lúmenes (lm)", "Lux (lx)", "Candelas (cd)", "Vatios (W)"], correcta: 0 },
  { enunciado: "¿En qué unidad se mide la iluminancia?", explicacion: "En lux (lx).", dificultad: "facil", opciones: ["Lux (lx)", "Lúmenes (lm)", "Candelas por metro cuadrado (cd/m²)", "Vatios por metro cuadrado (W/m²)"], correcta: 0 },
  { enunciado: "¿Qué magnitud se emplea habitualmente para especificar el nivel de luz recomendado en un puesto de trabajo?", explicacion: "La iluminancia, en lux.", dificultad: "media", opciones: ["La iluminancia", "La luminancia", "La intensidad luminosa", "El rendimiento luminoso"], correcta: 0 },
  { enunciado: "¿Qué diferencia fundamental existe entre iluminancia y luminancia?", explicacion: "La iluminancia mide la luz que incide; la luminancia, la que se percibe reflejada o emitida.", dificultad: "dificil", opciones: ["La iluminancia mide la luz incidente; la luminancia, la percibida", "Son exactamente la misma magnitud con distinto nombre", "La luminancia solo se aplica a fuentes de luz artificial", "La iluminancia solo se aplica a la luz solar directa"], correcta: 0 },
  { enunciado: "¿Qué es el rendimiento o eficacia luminosa de una lámpara?", explicacion: "La relación entre el flujo luminoso emitido y la potencia consumida, en lm/W.", dificultad: "media", opciones: ["La relación entre flujo luminoso emitido y potencia consumida", "La relación entre intensidad luminosa y voltaje de alimentación", "El tiempo de vida útil medio de la lámpara en horas", "El precio de compra de la lámpara por lumen emitido"], correcta: 0 },
]);

const S2 = "tipos-lamparas-luminarias-led";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es una luminaria?", reverso: "El aparato que distribuye, filtra o transforma la luz emitida por una o varias lámparas, y que incluye los elementos necesarios para fijarlas, protegerlas y conectarlas al circuito de alimentación" },
  { anverso: "¿Qué es un LED (diodo emisor de luz)?", reverso: "Un dispositivo semiconductor que emite luz cuando circula corriente eléctrica a su través, por un fenómeno de electroluminiscencia" },
  { anverso: "¿Qué ventajas presenta la tecnología LED frente a las lámparas incandescentes o fluorescentes tradicionales?", reverso: "Mayor eficacia luminosa (más lúmenes por vatio), mayor vida útil, encendido instantáneo sin parpadeo, menor generación de calor, y ausencia de mercurio en su composición" },
  { anverso: "¿Qué es la temperatura de color de una lámpara o luminaria LED, y en qué unidad se expresa?", reverso: "Una magnitud que describe la tonalidad de la luz emitida (cálida, neutra o fría), expresada en kelvin (K); valores bajos (2700-3000 K) corresponden a luz cálida, y valores altos (5000-6500 K) a luz fría" },
  { anverso: "¿Qué es el índice de reproducción cromática (IRC o CRI) de una fuente de luz?", reverso: "Un valor de 0 a 100 que indica la fidelidad con la que una fuente de luz reproduce los colores de los objetos iluminados en comparación con la luz natural, siendo recomendable un IRC elevado en espacios donde la percepción del color es relevante" },
  { anverso: "¿Qué es un driver o fuente de alimentación en una luminaria LED?", reverso: "El dispositivo electrónico que transforma y regula la tensión y la corriente de la red eléctrica a los valores adecuados para el correcto funcionamiento de los diodos LED" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es una luminaria?", explicacion: "El aparato que distribuye, filtra o transforma la luz de una o varias lámparas.", dificultad: "facil", opciones: ["El aparato que distribuye, filtra o transforma la luz de las lámparas", "El propio diodo emisor de luz de una lámpara LED", "El interruptor que enciende y apaga el punto de luz", "El conductor que alimenta eléctricamente la lámpara"], correcta: 0 },
  { enunciado: "¿Qué ventaja NO es propia de la tecnología LED frente a las lámparas tradicionales?", explicacion: "El LED no genera más calor; al contrario, genera menos.", dificultad: "media", opciones: ["Mayor generación de calor que las lámparas tradicionales", "Mayor eficacia luminosa (lm/W)", "Mayor vida útil", "Encendido instantáneo sin parpadeo"], correcta: 0 },
  { enunciado: "¿En qué unidad se expresa la temperatura de color de una luminaria LED?", explicacion: "En kelvin (K).", dificultad: "media", opciones: ["Kelvin (K)", "Lúmenes (lm)", "Lux (lx)", "Vatios (W)"], correcta: 0 },
  { enunciado: "¿Qué indica el índice de reproducción cromática (IRC) de una fuente de luz?", explicacion: "La fidelidad con la que reproduce los colores en comparación con la luz natural.", dificultad: "dificil", opciones: ["La fidelidad con la que reproduce los colores de los objetos", "La potencia eléctrica consumida por la luminaria", "El tiempo de vida útil medio de la luminaria", "El ángulo de apertura del haz de luz emitido"], correcta: 0 },
  { enunciado: "¿Qué función cumple el driver de una luminaria LED?", explicacion: "Transforma y regula la tensión y corriente de red a los valores adecuados para los LED.", dificultad: "media", opciones: ["Transforma y regula la tensión y corriente para los LED", "Mide el flujo luminoso total emitido por la luminaria", "Sustituye a la necesidad de un interruptor diferencial", "Filtra el color de la luz emitida por los diodos"], correcta: 0 },
]);

const S3 = "sistemas-encendido-regulacion-alumbrado-emergencia";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un detector de presencia o de movimiento aplicado al encendido del alumbrado?", reverso: "Un dispositivo que detecta la presencia de personas en una zona (mediante infrarrojos, ultrasonidos o microondas) y activa automáticamente el alumbrado, apagándolo tras un tiempo sin detectar movimiento" },
  { anverso: "¿Qué es un regulador de intensidad o dimmer?", reverso: "Un dispositivo que permite variar de forma continua o escalonada el nivel de flujo luminoso emitido por una o varias luminarias, adaptando la iluminación a las necesidades del momento y contribuyendo al ahorro energético" },
  { anverso: "¿Qué es un sistema de encendido centralizado o telegestión del alumbrado?", reverso: "Un sistema que permite controlar, programar y supervisar de forma remota el encendido, apagado y regulación de un conjunto de puntos de luz (por ejemplo, el alumbrado público de una zona urbana) desde un punto de control único" },
  { anverso: "¿Qué ventaja aporta un sistema de telegestión del alumbrado público frente al encendido tradicional mediante interruptor crepuscular o reloj astronómico?", reverso: "Permite ajustar la iluminación en tiempo real según las necesidades reales de cada zona, detectar averías de forma remota y optimizar el consumo energético del conjunto de la instalación" },
  { anverso: "¿Qué es el alumbrado de emergencia?", reverso: "El alumbrado que entra en funcionamiento automáticamente ante un fallo del alumbrado normal, con autonomía y nivel de iluminación suficientes para facilitar la evacuación segura de un local" },
  { anverso: "¿Qué es el alumbrado de señalización?", reverso: "El alumbrado que indica de modo permanente la situación de puertas, pasillos, escaleras y salidas de un local, facilitando su localización durante una evacuación" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es un detector de presencia aplicado al alumbrado?", explicacion: "Detecta personas en una zona y activa automáticamente el alumbrado.", dificultad: "facil", opciones: ["Un dispositivo que detecta personas y activa el alumbrado automáticamente", "Un dispositivo que mide la iluminancia exacta de una estancia", "Un dispositivo que regula la temperatura de color de una luminaria", "Un dispositivo exclusivo del alumbrado de emergencia"], correcta: 0 },
  { enunciado: "¿Qué es un regulador de intensidad o dimmer?", explicacion: "Permite variar el nivel de flujo luminoso emitido por una luminaria.", dificultad: "media", opciones: ["Permite variar el nivel de flujo luminoso emitido", "Mide la potencia eléctrica total consumida por el edificio", "Sustituye por completo al interruptor diferencial de la instalación", "Detecta exclusivamente la presencia de personas en una zona"], correcta: 0 },
  { enunciado: "¿Qué permite un sistema de telegestión del alumbrado público?", explicacion: "Controlar, programar y supervisar de forma remota el conjunto de puntos de luz.", dificultad: "media", opciones: ["Controlar y supervisar de forma remota el conjunto de puntos de luz", "Sustituir por completo la necesidad de mantenimiento del alumbrado", "Eliminar la necesidad de cualquier protección eléctrica en la red", "Aumentar de forma automática la potencia contratada del municipio"], correcta: 0 },
  { enunciado: "¿Qué es el alumbrado de emergencia?", explicacion: "El que entra en funcionamiento automáticamente ante un fallo del alumbrado normal.", dificultad: "facil", opciones: ["El que entra en funcionamiento automáticamente ante un fallo del alumbrado normal", "El alumbrado decorativo habitual de una fachada", "El alumbrado exclusivo de las zonas de aparcamiento", "El alumbrado que solo se activa de forma manual"], correcta: 0 },
  { enunciado: "¿Qué función cumple el alumbrado de señalización?", explicacion: "Indica de modo permanente la situación de puertas, pasillos y salidas.", dificultad: "media", opciones: ["Indica de modo permanente la situación de puertas y salidas", "Regula el nivel de iluminación general de un local", "Sustituye por completo al alumbrado normal de un local", "Detecta la presencia de personas para encender el alumbrado"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 15 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 15, orden: 15, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-147 creado y vinculado como Tema 15 de Oficial Electricista.");
