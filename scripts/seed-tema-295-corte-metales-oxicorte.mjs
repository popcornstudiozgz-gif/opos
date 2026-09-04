/**
 * Crea tema-295: "Corte de metales (oxicorte)" — Tema 19 (numero=19,
 * bloque-2) de Oficial Fontanero (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 17 oficial del Anexo I (bases1716.pdf, línea 546):
 * "Corte de metales. Procesos con oxígeno y gas combustible. Gases
 * utilizados. Equipo para oxiacetileno. Corte de metales (oxicorte)."
 *
 * Sourcing: conocimiento técnico consolidado sin ley única que lo regule
 * (equipo de oxicorte: botellas, manorreductores, soplete, mangueras,
 * válvulas antirretorno; presiones de trabajo), verificado con búsqueda
 * previa conforme al estándar del proyecto — mismo criterio ya aplicado en
 * Oficial Herrero para soldadura/corte de metales. Referencia técnica de
 * seguridad: NTP 495 "Soldadura oxiacetilénica y oxicorte: normas de
 * seguridad" del INSST, mismo tipo de fuente técnica (NTP del INSST) ya
 * empleado en Oficial Conductor Maquinaria Pesada.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-295-corte-metales-oxicorte.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-295";
const OPOSICION = "oficial-fontanero-ayto-zaragoza";
const BLOQUE_2_ID = "417e77bc-e7ac-4984-ae49-3a35de79350d";

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
  titulo: "Corte de metales (oxicorte)",
  descripcion: "Fundamentos del oxicorte: precalentamiento y chorro de oxígeno puro. Gases utilizados (oxígeno comburente, acetileno combustible). Equipo: botellas, manorreductores, soplete, mangueras codificadas por color, válvulas antirretorno.",
  contenido: "Desarrolla el proceso de corte de metales por oxicorte: su fundamento (precalentamiento de la zona de corte y posterior chorro de oxígeno puro que oxida y expulsa el metal fundido), los gases empleados —oxígeno como comburente y acetileno como combustible más habitual—, y el equipo necesario para ejecutarlo con seguridad: botellas, manorreductores, soplete, mangueras codificadas por color y válvulas antirretorno, junto con las presiones de trabajo y las normas básicas de seguridad de referencia (NTP 495 del INSST).",
  enlaces_boe: [
    { url: "https://www.insst.es/documents/94886/326962/ntp_495.pdf", titulo: "NTP 495 (INSST): Soldadura oxiacetilénica y oxicorte: normas de seguridad" },
  ],
  indice_estudio: [
    { url: "", titulo: "Fundamentos del oxicorte y gases utilizados", seccion: "fundamentos-del-oxicorte-y-gases-utilizados", articulos: "Conocimiento técnico del oficio" },
    { url: "", titulo: "El equipo de oxicorte", seccion: "el-equipo-de-oxicorte", articulos: "Conocimiento técnico del oficio" },
    { url: "https://www.insst.es/documents/94886/326962/ntp_495.pdf", titulo: "Presiones de trabajo y seguridad", seccion: "presiones-de-trabajo-y-seguridad", articulos: "NTP 495 (INSST)" },
  ],
}]);

const S1 = "fundamentos-del-oxicorte-y-gases-utilizados";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿En qué se basa el proceso de oxicorte para cortar un metal, a diferencia de la soldadura?", reverso: "Se basa en precalentar la zona de corte con una llama hasta la temperatura de ignición del metal, y a continuación dirigir un chorro de oxígeno puro que oxida el metal y expulsa el óxido fundido, abriendo así el corte; no funde el metal por aportación, como en la soldadura" },
  { anverso: "¿Qué gas actúa como comburente en el oxicorte, y qué función cumple?", reverso: "El oxígeno; es el gas que, combinado con el metal precalentado, produce la reacción de oxidación (combustión) que corta el material, además de arrastrar mecánicamente el óxido fundido fuera de la línea de corte" },
  { anverso: "¿Qué gas combustible es el más habitual en el oxicorte, y qué papel cumple?", reverso: "El acetileno; se emplea, junto con el oxígeno, para generar la llama de precalentamiento que lleva el metal a su temperatura de ignición antes de aplicar el chorro de oxígeno de corte" },
  { anverso: "¿A qué tipo de metales se aplica principalmente el oxicorte, y por qué no es apto para cualquier metal?", reverso: "Principalmente a aceros al carbono; no es apto, por ejemplo, para el acero inoxidable ni el aluminio, porque estos forman óxidos que no funden a una temperatura inferior a la del propio metal, impidiendo que el chorro de oxígeno los arrastre" },
  { anverso: "¿Qué diferencia principal existe entre el oxicorte y la soldadura oxiacetilénica en cuanto al objetivo del proceso?", reverso: "El oxicorte busca separar o seccionar el metal mediante oxidación y arrastre del óxido fundido; la soldadura oxiacetilénica busca unir dos piezas fundiendo el metal base y, en su caso, un material de aportación" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿En qué se basa el proceso de oxicorte?", explicacion: "Precalentar la zona y aplicar un chorro de oxígeno que oxida y expulsa el metal.", dificultad: "facil", opciones: ["En precalentar la zona de corte y aplicar un chorro de oxígeno que oxida y expulsa el metal fundido", "En fundir el metal exclusivamente mediante presión mecánica, sin ninguna llama de precalentamiento", "En aplicar exclusivamente un adhesivo químico sobre la línea de corte prevista", "En enfriar bruscamente el metal hasta fracturarlo por choque térmico"], correcta: 0 },
  { enunciado: "¿Qué gas actúa como comburente en el oxicorte?", explicacion: "El oxígeno.", dificultad: "media", opciones: ["El oxígeno", "El acetileno", "El propano", "El nitrógeno"], correcta: 0 },
  { enunciado: "¿Qué gas combustible es el más habitual en el oxicorte?", explicacion: "El acetileno.", dificultad: "media", opciones: ["El acetileno", "El oxígeno", "El nitrógeno", "El dióxido de carbono"], correcta: 0 },
  { enunciado: "¿Por qué el oxicorte no es apto para el acero inoxidable?", explicacion: "Sus óxidos no funden a temperatura inferior a la del metal, impidiendo el arrastre.", dificultad: "dificil", opciones: ["Porque sus óxidos no funden a una temperatura inferior a la del propio metal, impidiendo el arrastre por el chorro de oxígeno", "Porque el acero inoxidable no puede alcanzar nunca la temperatura de precalentamiento necesaria", "Porque el oxígeno reacciona de forma explosiva con el acero inoxidable en cualquier circunstancia", "Porque el acetileno está expresamente prohibido para cualquier trabajo con acero inoxidable"], correcta: 0 },
  { enunciado: "¿Qué diferencia principal hay entre oxicorte y soldadura oxiacetilénica?", explicacion: "El oxicorte separa el metal; la soldadura une piezas fundiéndolas.", dificultad: "media", opciones: ["El oxicorte separa o secciona el metal; la soldadura une piezas fundiendo el metal base", "Ambos procesos persiguen exactamente el mismo objetivo, sin ninguna diferencia real", "El oxicorte siempre une piezas, y la soldadura siempre las separa", "Ninguno de los dos procesos emplea oxígeno como gas comburente"], correcta: 0 },
]);

const S2 = "el-equipo-de-oxicorte";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Cuántas botellas de gas necesita, como mínimo, un equipo de oxicorte, y por qué?", reverso: "Dos: una de gas comburente (oxígeno) y otra de gas combustible (habitualmente acetileno), ya que ambos gases deben mantenerse siempre separados hasta su mezcla controlada en el soplete" },
  { anverso: "¿Qué función cumple el manorreductor de cada botella?", reverso: "Reducir y estabilizar la presión del gas, que en el interior de la botella está a una presión muy elevada, hasta la presión de trabajo adecuada y constante para el soplete" },
  { anverso: "¿Qué función cumple el soplete en un equipo de oxicorte?", reverso: "Mezclar los gases (oxígeno y acetileno) en las proporciones adecuadas para la llama de precalentamiento, y disponer de una salida independiente para el chorro de oxígeno puro de corte, accionado con una palanca aparte" },
  { anverso: "¿Con qué colores se codifican habitualmente las mangueras de un equipo de oxicorte, y a qué gas corresponde cada una?", reverso: "Manguera roja para el acetileno (combustible) y manguera azul para el oxígeno (comburente), codificación que evita confundir la conexión de cada gas" },
  { anverso: "¿Qué función cumplen las válvulas antirretorno de un equipo de oxicorte, y dónde deben instalarse?", reverso: "Evitar el retroceso de la llama hacia la botella (lo que podría provocar su explosión) y el retorno de un gas hacia la botella del otro; deben instalarse en las salidas de los manorreductores, tanto del oxígeno como del acetileno" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Cuántas botellas de gas necesita, como mínimo, un equipo de oxicorte?", explicacion: "Dos: una de oxígeno y otra de gas combustible.", dificultad: "facil", opciones: ["Dos: una de oxígeno y otra de gas combustible (habitualmente acetileno)", "Una sola botella que contiene ambos gases ya mezclados de fábrica", "Tres botellas, incluyendo una adicional de nitrógeno de seguridad", "Ninguna botella: el oxicorte se alimenta exclusivamente de la red eléctrica"], correcta: 0 },
  { enunciado: "¿Qué función cumple el manorreductor de cada botella?", explicacion: "Reduce y estabiliza la presión del gas hasta la de trabajo.", dificultad: "media", opciones: ["Reducir y estabilizar la presión del gas hasta la presión de trabajo adecuada", "Mezclar los gases de oxígeno y acetileno antes de su salida por el soplete", "Encender automáticamente la llama de precalentamiento del soplete", "Medir el caudal exacto de gas consumido durante todo el proceso de corte"], correcta: 0 },
  { enunciado: "¿Qué colores codifican habitualmente las mangueras de acetileno y de oxígeno en un equipo de oxicorte?", explicacion: "Roja para acetileno, azul para oxígeno.", dificultad: "media", opciones: ["Roja para el acetileno y azul para el oxígeno", "Azul para el acetileno y roja para el oxígeno", "Verde para el acetileno y amarilla para el oxígeno", "Ambas mangueras son del mismo color, sin ninguna codificación específica"], correcta: 0 },
  { enunciado: "¿Qué función cumplen las válvulas antirretorno de un equipo de oxicorte?", explicacion: "Evitar el retroceso de la llama hacia la botella y el retorno de un gas hacia la del otro.", dificultad: "dificil", opciones: ["Evitar el retroceso de la llama hacia la botella y el retorno de un gas hacia la del otro", "Aumentar la presión de trabajo del oxígeno por encima de la del acetileno", "Mezclar los gases de oxígeno y acetileno en la proporción adecuada", "Medir el caudal exacto de gas consumido en cada operación de corte"], correcta: 0 },
  { enunciado: "¿Dónde deben instalarse las válvulas antirretorno de un equipo de oxicorte?", explicacion: "En las salidas de los manorreductores, tanto de oxígeno como de acetileno.", dificultad: "media", opciones: ["En las salidas de los manorreductores, tanto de oxígeno como de acetileno", "Únicamente en la salida del soplete, sin ninguna otra válvula en el equipo", "Únicamente en la botella de acetileno, sin ninguna válvula en la de oxígeno", "En ningún punto concreto: no son un elemento exigido en un equipo de oxicorte"], correcta: 0 },
]);

const S3 = "presiones-de-trabajo-y-seguridad";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿A qué presión aproximada se encuentra el gas en el interior de una botella, antes de pasar por el manorreductor?", reverso: "En torno a 150 atmósferas, una presión muy superior a la de trabajo, por lo que el manorreductor debe reducirla de forma estable antes de llegar al soplete" },
  { anverso: "¿En qué rango de presión trabaja habitualmente un equipo de oxicorte tras pasar por el manorreductor?", reverso: "Entre 0,1 y 10 atmósferas aproximadamente, según el gas y el grosor del metal a cortar, muy por debajo de la presión de la propia botella" },
  { anverso: "¿Qué referencia técnica del INSST recoge las normas de seguridad de la soldadura oxiacetilénica y el oxicorte?", reverso: "La NTP 495, «Soldadura oxiacetilénica y oxicorte: normas de seguridad», del Instituto Nacional de Seguridad y Salud en el Trabajo" },
  { anverso: "¿Qué comprobación previa exige la NTP 495 sobre las botellas de gas antes de iniciar un trabajo de oxicorte?", reverso: "Comprobar que las botellas están en posición vertical, bien sujetas para evitar su caída, alejadas de fuentes de calor y con las válvulas y manorreductores en buen estado, sin fugas" },
  { anverso: "¿Qué EPI resulta imprescindible al ejecutar un corte con oxicorte, más allá de la ropa de trabajo habitual?", reverso: "Gafas de protección con filtro adecuado frente al resplandor de la llama y las proyecciones, y guantes resistentes al calor" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿A qué presión aproximada se encuentra el gas en el interior de una botella, antes del manorreductor?", explicacion: "En torno a 150 atmósferas.", dificultad: "media", opciones: ["En torno a 150 atmósferas", "En torno a 1 atmósfera", "En torno a 1.000 atmósferas", "En torno a 0,1 atmósferas"], correcta: 0 },
  { enunciado: "¿Qué referencia técnica del INSST recoge las normas de seguridad del oxicorte?", explicacion: "La NTP 495.", dificultad: "media", opciones: ["La NTP 495", "La NTP 126", "El RD 1215/1997", "La UNE-EN 1074"], correcta: 0 },
  { enunciado: "¿Qué debe comprobarse en las botellas de gas antes de iniciar un trabajo de oxicorte, según la NTP 495?", explicacion: "Que están en vertical, bien sujetas, alejadas del calor y sin fugas.", dificultad: "dificil", opciones: ["Que están en posición vertical, bien sujetas, alejadas de fuentes de calor y sin fugas", "Que están tumbadas en horizontal para facilitar su transporte durante el trabajo", "Que están conectadas directamente entre sí, sin ningún manorreductor intermedio", "Que están completamente vacías antes de iniciar cualquier trabajo de oxicorte"], correcta: 0 },
  { enunciado: "¿Qué EPI resulta imprescindible al ejecutar un corte con oxicorte?", explicacion: "Gafas de protección con filtro adecuado y guantes resistentes al calor.", dificultad: "media", opciones: ["Gafas de protección con filtro adecuado y guantes resistentes al calor", "Un arnés anticaídas, propio de trabajos en altura, sin relación con el oxicorte", "Un equipo de respiración autónoma, propio de espacios confinados", "Botas de agua, propias de trabajos con presencia de agua estancada"], correcta: 0 },
  { enunciado: "¿En qué rango de presión trabaja habitualmente un equipo de oxicorte tras el manorreductor?", explicacion: "Entre 0,1 y 10 atmósferas aproximadamente.", dificultad: "dificil", opciones: ["Entre 0,1 y 10 atmósferas aproximadamente", "Entre 150 y 200 atmósferas aproximadamente", "Entre 500 y 1.000 atmósferas aproximadamente", "A presión atmosférica exacta, sin ninguna reducción ni aumento"], correcta: 0 },
]);

console.log(`📖 glosario...`);
await insertar("glosario", [
  { tema_slug: TEMA, seccion: S1, termino: "Oxicorte", definicion: "Proceso de corte de metales mediante precalentamiento con llama y posterior chorro de oxígeno puro que oxida y expulsa el material fundido." },
  { tema_slug: TEMA, seccion: S1, termino: "Gas comburente", definicion: "Gas (el oxígeno, en el oxicorte) que reacciona con el metal precalentado produciendo la oxidación que permite el corte." },
  { tema_slug: TEMA, seccion: S2, termino: "Manorreductor", definicion: "Dispositivo que reduce y estabiliza la presión del gas de una botella hasta la presión de trabajo adecuada para el soplete." },
  { tema_slug: TEMA, seccion: S2, termino: "Válvula antirretorno (oxicorte)", definicion: "Dispositivo de seguridad que impide el retroceso de la llama hacia la botella y el paso de un gas hacia la botella del otro." },
  { tema_slug: TEMA, seccion: S3, termino: "NTP 495", definicion: "Nota Técnica de Prevención del INSST sobre normas de seguridad en soldadura oxiacetilénica y oxicorte." },
  { tema_slug: TEMA, seccion: S3, termino: "Presión de trabajo (oxicorte)", definicion: "Presión reducida y estabilizada por el manorreductor a la que circulan los gases hacia el soplete, muy inferior a la presión interior de la botella." },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 19 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 19, orden: 19, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-295 creado y vinculado como Tema 19 de Oficial Fontanero.");
