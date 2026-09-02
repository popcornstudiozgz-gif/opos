/**
 * Crea tema-191: "Presión, pérdida de carga y golpe de ariete" — Tema 11
 * (numero=11, bloque-2) de Oficial Guardallaves (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 9 oficial del Anexo I (bases2110.pdf, línea 911):
 *   "Presión, relación presión-altura, pérdidas de carga, golpe de
 *   ariete, Unidades. Conversión de unidades. Simbología."
 *
 * Conocimiento técnico consolidado de hidráulica, sin una ley española
 * que lo regule como tal (mismo criterio que tema-190). Búsqueda previa
 * realizada conforme al estándar de sourcing: la fórmula de
 * Darcy-Weisbach para pérdidas de carga continuas y el método de Allievi
 * para el golpe de ariete son referencias técnicas de ingeniería
 * hidráulica de uso generalizado, no normas legales.
 *
 * Tres secciones:
 * 1. presion-relacion-presion-altura
 * 2. perdidas-carga-tuberias
 * 3. golpe-ariete-causas-prevencion
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-191-presion-perdida-carga-golpe-ariete.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-191";
const OPOSICION = "oficial-guardallaves-ayto-zaragoza";
const BLOQUE_2_ID = "5bb8da57-00c3-4865-a0a1-651b70c85ba0";

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
  titulo: "Presión, pérdida de carga y golpe de ariete",
  descripcion: "Presión y su relación con la altura. Pérdidas de carga en las conducciones. El golpe de ariete: causas y medidas de prevención. Unidades y conversión de unidades.",
  contenido: "Desarrolla la presión del agua en una conducción y su relación directa con la altura (columna de agua), las pérdidas de carga que sufre el agua al circular por una tubería debido al rozamiento, y el golpe de ariete: el fenómeno de sobrepresión brusca que se produce ante un cambio rápido de la velocidad del agua, sus causas más habituales en la operativa de un guardallaves y las medidas para prevenirlo.",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "Presión y su relación con la altura", seccion: "presion-relacion-presion-altura", articulos: "Conceptos fundamentales de hidráulica" },
    { url: "", titulo: "Pérdidas de carga en las conducciones", seccion: "perdidas-carga-tuberias", articulos: "Conceptos fundamentales de hidráulica" },
    { url: "", titulo: "El golpe de ariete: causas y prevención", seccion: "golpe-ariete-causas-prevencion", articulos: "Conceptos fundamentales de hidráulica" },
  ],
}]);

const S1 = "presion-relacion-presion-altura";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es la presión de un fluido?", reverso: "La fuerza que ejerce ese fluido por unidad de superficie sobre las paredes que lo contienen, medida en el Sistema Internacional en pascales (Pa), aunque en el sector del agua se usa habitualmente el bar o el metro de columna de agua (m.c.a.)" },
  { anverso: "¿Qué relación existe entre la presión y la altura de una columna de agua?", reverso: "La presión en la base de una columna de agua es directamente proporcional a su altura: aproximadamente 1 m.c.a. equivale a unos 0,1 bar (0,098 bar), de modo que a mayor altura de la columna, mayor presión en su base" },
  { anverso: "¿Por qué la presión disponible en un punto bajo de la ciudad suele ser mayor que en un punto alto, en una red abastecida por gravedad desde un depósito elevado?", reverso: "Porque la presión depende del desnivel entre el depósito y el punto de consumo: cuanto mayor es la diferencia de cota entre el depósito y el punto considerado, mayor es la presión disponible en ese punto" },
  { anverso: "¿Qué es la altura piezométrica en un punto de la red?", reverso: "La suma de la altura geométrica (cota del punto) más la altura de presión en ese punto, expresada en metros, y que representa el nivel al que subiría el agua si se instalara un tubo vertical abierto en ese punto" },
  { anverso: "¿Cómo se convierten aproximadamente los metros de columna de agua (m.c.a.) a bares?", reverso: "Dividiendo entre aproximadamente 10 (1 m.c.a. ≈ 0,098 bar), de modo que, por ejemplo, 30 m.c.a. equivalen aproximadamente a 3 bares" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es la presión de un fluido?", explicacion: "La fuerza que ejerce por unidad de superficie sobre las paredes que lo contienen.", dificultad: "facil", opciones: ["La fuerza que ejerce por unidad de superficie sobre sus paredes", "La cantidad de materia contenida en ese fluido", "La distancia que recorre ese fluido por unidad de tiempo", "El volumen que ocupa ese fluido dentro de la conducción"], correcta: 0 },
  { enunciado: "¿Aproximadamente a cuántos bares equivale 1 metro de columna de agua (m.c.a.)?", explicacion: "Aproximadamente 0,098 bar (cerca de 0,1 bar).", dificultad: "media", opciones: ["Aproximadamente 0,1 bar", "Aproximadamente 1 bar", "Aproximadamente 10 bares", "Aproximadamente 0,01 bar"], correcta: 0 },
  { enunciado: "¿Por qué la presión en un punto bajo suele ser mayor que en un punto alto en una red por gravedad?", explicacion: "Porque la presión depende del desnivel respecto al depósito.", dificultad: "media", opciones: ["Porque la presión depende del desnivel respecto al depósito", "Porque las tuberías de los puntos bajos son siempre de mayor diámetro", "Porque el caudal consumido en los puntos bajos es siempre menor", "No existe ninguna relación real entre la cota y la presión disponible"], correcta: 0 },
  { enunciado: "¿Qué es la altura piezométrica en un punto de la red?", explicacion: "La suma de la altura geométrica más la altura de presión en ese punto.", dificultad: "dificil", opciones: ["La suma de la altura geométrica más la altura de presión", "Exclusivamente la altura geométrica de ese punto sobre el nivel del mar", "Exclusivamente la presión medida en ese punto, sin relación con la cota", "La diferencia entre el caudal de entrada y de salida en ese punto"], correcta: 0 },
  { enunciado: "¿A cuántos bares equivalen aproximadamente 30 metros de columna de agua?", explicacion: "Aproximadamente 3 bares.", dificultad: "dificil", opciones: ["Aproximadamente 3 bares", "Aproximadamente 30 bares", "Aproximadamente 0,3 bares", "Aproximadamente 300 bares"], correcta: 0 },
]);

const S2 = "perdidas-carga-tuberias";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es la pérdida de carga en una conducción?", reverso: "La disminución de energía (presión) que sufre el agua al circular por una tubería, debida principalmente al rozamiento con las paredes internas y a la turbulencia del flujo" },
  { anverso: "¿Qué es la fórmula de Darcy-Weisbach y para qué se emplea?", reverso: "Es la expresión de referencia recomendada para calcular las pérdidas de carga continuas (por rozamiento a lo largo de una tubería), en función de la longitud, el diámetro, la velocidad del agua y un coeficiente de fricción" },
  { anverso: "¿Qué son las pérdidas de carga localizadas, a diferencia de las continuas?", reverso: "Las que se producen en puntos concretos de la conducción por cambios bruscos en el flujo, como codos, válvulas, reducciones de diámetro o derivaciones (en \"T\"), y se suman a las pérdidas continuas por rozamiento" },
  { anverso: "¿Qué factores aumentan la pérdida de carga en una conducción, para un mismo caudal?", reverso: "Un diámetro menor, una mayor longitud de tubería, una mayor rugosidad interna (por incrustaciones o corrosión) y un mayor número de piezas especiales (codos, válvulas, derivaciones)" },
  { anverso: "¿Qué consecuencia práctica tiene una pérdida de carga excesiva en un tramo de la red para el abastecimiento de una zona?", reverso: "Que la presión disponible en los puntos de consumo de esa zona disminuye, pudiendo llegar a ser insuficiente en los puntos más alejados o más elevados, especialmente en horas punta de consumo" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es la pérdida de carga en una conducción?", explicacion: "La disminución de energía que sufre el agua debida al rozamiento y la turbulencia.", dificultad: "facil", opciones: ["La disminución de energía del agua debida al rozamiento", "El aumento de caudal que se produce al circular el agua", "La disminución de la temperatura del agua en la conducción", "El aumento de la densidad del agua dentro de la tubería"], correcta: 0 },
  { enunciado: "¿Para qué se emplea la fórmula de Darcy-Weisbach?", explicacion: "Para calcular las pérdidas de carga continuas por rozamiento.", dificultad: "media", opciones: ["Para calcular las pérdidas de carga continuas por rozamiento", "Para calcular la capacidad total de un depósito de agua", "Para calcular la facturación del consumo de un abonado", "Para calcular la resistencia estructural de una arqueta"], correcta: 0 },
  { enunciado: "¿Qué son las pérdidas de carga localizadas?", explicacion: "Las que se producen en puntos concretos por cambios bruscos del flujo (codos, válvulas...).", dificultad: "media", opciones: ["Las producidas en puntos concretos por cambios bruscos del flujo", "Las producidas de forma continua a lo largo de todo el trazado", "Las que solo se producen en los depósitos de almacenamiento", "Las que solo afectan a las conducciones de mayor diámetro"], correcta: 0 },
  { enunciado: "¿Qué factor, entre los siguientes, aumenta la pérdida de carga en una conducción para un mismo caudal?", explicacion: "Una mayor rugosidad interna, entre otros factores.", dificultad: "dificil", opciones: ["Una mayor rugosidad interna de la tubería", "Un mayor diámetro de la tubería", "Una menor longitud de la tubería", "Un menor número de piezas especiales instaladas"], correcta: 0 },
  { enunciado: "¿Qué consecuencia práctica tiene una pérdida de carga excesiva en un tramo de la red?", explicacion: "La presión disponible en los puntos de consumo de esa zona disminuye.", dificultad: "media", opciones: ["La presión disponible en los puntos de consumo disminuye", "El caudal total suministrado a la ciudad aumenta de forma directa", "La calidad sanitaria del agua mejora de forma automática", "No genera ninguna consecuencia relevante para el abastecimiento"], correcta: 0 },
]);

const S3 = "golpe-ariete-causas-prevencion";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es el golpe de ariete?", reverso: "Un fenómeno de sobrepresión (y depresión) brusca que se produce en una conducción cuando se modifica de forma rápida la velocidad del agua, por ejemplo al cerrar o abrir una válvula demasiado deprisa, o por la parada súbita de una bomba" },
  { anverso: "¿Cuál es la causa más habitual de golpe de ariete en la operativa de un guardallaves?", reverso: "El cierre demasiado rápido de una válvula durante una maniobra de corte de suministro, que detiene bruscamente la columna de agua en movimiento y genera una onda de sobrepresión que se propaga por la conducción" },
  { anverso: "¿Qué riesgos puede provocar un golpe de ariete no controlado en la red?", reverso: "Roturas de tuberías o de sus uniones, daños en válvulas y accesorios, y en casos graves, daños en el propio depósito o en las instalaciones de bombeo" },
  { anverso: "¿Qué medida básica de prevención del golpe de ariete debe aplicar el guardallaves al maniobrar una válvula?", reverso: "Cerrar y abrir las válvulas de forma lenta y progresiva, nunca de golpe, dando tiempo a que la columna de agua module su velocidad sin cambios bruscos" },
  { anverso: "¿Qué elementos técnicos existen en una instalación, además de una maniobra correcta, para amortiguar el golpe de ariete?", reverso: "Válvulas de cierre lento o de alivio, calderines antiariete y ventosas trifuncionales, entre otros dispositivos diseñados para absorber la sobrepresión generada" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es el golpe de ariete?", explicacion: "Un fenómeno de sobrepresión brusca ante un cambio rápido de la velocidad del agua.", dificultad: "facil", opciones: ["Un fenómeno de sobrepresión brusca ante un cambio rápido de velocidad", "Un fenómeno de pérdida gradual de presión por rozamiento", "Un fenómeno de contaminación del agua por sedimentos", "Un fenómeno de aumento gradual de la temperatura del agua"], correcta: 0 },
  { enunciado: "¿Cuál es la causa más habitual de golpe de ariete en la operativa de un guardallaves?", explicacion: "El cierre demasiado rápido de una válvula.", dificultad: "media", opciones: ["El cierre demasiado rápido de una válvula", "La apertura de una arqueta de registro para su inspección", "La lectura periódica de un contador de agua", "La sustitución de una tapa de registro deteriorada"], correcta: 0 },
  { enunciado: "¿Qué riesgo puede provocar un golpe de ariete no controlado en la red?", explicacion: "Roturas de tuberías o daños en válvulas y accesorios.", dificultad: "media", opciones: ["Roturas de tuberías o daños en válvulas y accesorios", "Una mejora inmediata de la calidad sanitaria del agua", "Una reducción permanente del consumo de la zona afectada", "Ningún riesgo real si la conducción es de polietileno"], correcta: 0 },
  { enunciado: "¿Qué medida básica de prevención del golpe de ariete debe aplicar el guardallaves al maniobrar una válvula?", explicacion: "Cerrar y abrir de forma lenta y progresiva.", dificultad: "facil", opciones: ["Cerrar y abrir la válvula de forma lenta y progresiva", "Cerrar y abrir la válvula lo más rápido posible", "Maniobrar siempre varias válvulas a la vez y de golpe", "Evitar cualquier maniobra de válvulas durante el día"], correcta: 0 },
  { enunciado: "¿Qué dispositivo técnico, además de una maniobra correcta, ayuda a amortiguar el golpe de ariete?", explicacion: "Un calderín antiariete, entre otros dispositivos.", dificultad: "dificil", opciones: ["Un calderín antiariete", "Un contador de chorro único", "Una arqueta de telecontrol", "Una tapa de registro de fundición"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 11 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 11, orden: 11, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-191 creado y vinculado como Tema 11 de Oficial Guardallaves.");
