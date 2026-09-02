/**
 * Crea tema-199: "Instalaciones de riego" — Tema 19 (numero=19,
 * bloque-2) de Oficial Guardallaves (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 17 oficial del Anexo I (bases2110.pdf, línea 942):
 *   "Instalaciones de riego. Materiales y diferentes elementos que
 *   componen la red de riego."
 *
 * Fuentes verificadas mediante búsqueda en esta sesión:
 * - UNE-EN 12484 ("Técnicas de riego. Sistemas de riego automático de
 *   espacios verdes"), en sus distintas partes, citada por su función y
 *   alcance general para los materiales y elementos de una instalación
 *   de riego automático.
 * - Ordenanza Municipal para la Ecoeficiencia y la Calidad de la Gestión
 *   Integral del Agua (OMECGIA), art. 80 ("Ahorro en jardines"), leído
 *   íntegro en esta sesión: pautas de diseño, porcentajes de superficies
 *   en plantaciones de más de una hectárea, límite de 1.600 m³/ha/año
 *   para la conexión de la red de riego, sistemas de riego eficiente
 *   exigidos (micro-irrigación, goteo, aspersores con programador,
 *   detectores de humedad), restricción horaria de riego entre junio y
 *   septiembre, y obligación de contador específico y sistemas de
 *   control y alarma en determinadas instalaciones.
 *
 * Tres secciones:
 * 1. materiales-elementos-red-riego-une-en-12484
 * 2. diseno-ahorro-eficiencia-jardines-omecgia
 * 3. limitaciones-volumen-horario-control-omecgia
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-199-instalaciones-riego.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-199";
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
  titulo: "Instalaciones de riego",
  descripcion: "Materiales y elementos de la red de riego automático (UNE-EN 12484). Pautas de diseño y ahorro en jardines. Límite de volumen, restricción horaria y sistemas de control (art. 80 OMECGIA).",
  contenido: "Desarrolla las instalaciones de riego que forman parte de la red de abastecimiento municipal: los materiales y elementos que componen una red de riego automático (aspersores, goteo, electroválvulas y programadores, normalizados por UNE-EN 12484), y el marco de ahorro y eficiencia exigido por la Ordenanza Municipal para la Ecoeficiencia y la Calidad de la Gestión Integral del Agua para el diseño de jardines, con sus límites de volumen, su restricción horaria y sus sistemas de control obligatorios.",
  enlaces_boe: [
    "https://www.zaragoza.es/contenidos/medioambiente/Ordenanzaagua.pdf",
  ],
  indice_estudio: [
    { url: "", titulo: "Materiales y elementos de la red de riego (UNE-EN 12484)", seccion: "materiales-elementos-red-riego-une-en-12484", articulos: "UNE-EN 12484" },
    { url: "https://www.zaragoza.es/contenidos/medioambiente/Ordenanzaagua.pdf", titulo: "Diseño y ahorro en jardines", seccion: "diseno-ahorro-eficiencia-jardines-omecgia", articulos: "OMECGIA, art. 80.1 a 80.3" },
    { url: "https://www.zaragoza.es/contenidos/medioambiente/Ordenanzaagua.pdf", titulo: "Límite de volumen, restricción horaria y sistemas de control", seccion: "limitaciones-volumen-horario-control-omecgia", articulos: "OMECGIA, art. 80.5 a 80.10" },
  ],
}]);

const S1 = "materiales-elementos-red-riego-une-en-12484";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué norma regula los sistemas de riego automático de espacios verdes?", reverso: "La norma UNE-EN 12484, \"Técnicas de riego. Sistemas de riego automático de espacios verdes\", en sus distintas partes (entre ellas, instalación y recepción)" },
  { anverso: "¿Qué es una electroválvula de riego?", reverso: "Una válvula accionada eléctricamente (habitualmente a 12 o 24 voltios) que abre o cierra el paso de agua hacia un sector de riego concreto, gobernada por el programador de riego" },
  { anverso: "¿Qué diferencia existe entre el riego por aspersión y el riego por goteo?", reverso: "El riego por aspersión distribuye el agua en forma de lluvia sobre una superficie amplia (habitual en césped); el riego por goteo aporta el agua de forma localizada y lenta junto a cada planta, con menor pérdida por evaporación (habitual en arbustos y xerojardinería)" },
  { anverso: "¿Qué es un programador de riego?", reverso: "El dispositivo que controla de forma automática cuándo y durante cuánto tiempo se activa cada electroválvula (sector de riego), pudiendo integrar sensores de humedad o de lluvia para ajustar el riego a las condiciones reales" },
  { anverso: "¿Qué elementos básicos suele integrar una instalación de riego automático, además de las tuberías y aspersores o goteros?", reverso: "Un contador o punto de toma desde la red, un cabezal de filtrado (para evitar obstrucciones en aspersores o goteros), electroválvulas por sector, y un programador que las gobierna" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué norma regula los sistemas de riego automático de espacios verdes?", explicacion: "La norma UNE-EN 12484.", dificultad: "media", opciones: ["La norma UNE-EN 12484", "La norma UNE-EN 1074", "La norma UNE-EN 14339", "La norma UNE-EN 545"], correcta: 0 },
  { enunciado: "¿Qué es una electroválvula de riego?", explicacion: "Una válvula accionada eléctricamente que abre o cierra el paso de agua a un sector.", dificultad: "media", opciones: ["Una válvula accionada eléctricamente que abre o cierra un sector", "Un aspersor que distribuye el agua en forma de lluvia", "Un contador que mide el volumen total de agua consumido", "Un sensor que mide la humedad del suelo del jardín"], correcta: 0 },
  { enunciado: "¿Qué diferencia existe entre el riego por aspersión y el riego por goteo?", explicacion: "La aspersión distribuye agua en lluvia sobre una superficie amplia; el goteo la aporta de forma localizada.", dificultad: "media", opciones: ["La aspersión cubre superficie amplia; el goteo es localizado", "Ambos sistemas distribuyen el agua de forma exactamente idéntica", "El goteo cubre superficie amplia; la aspersión es localizada", "El goteo solo puede emplearse en superficies de césped"], correcta: 0 },
  { enunciado: "¿Qué es un programador de riego?", explicacion: "El dispositivo que controla automáticamente cuándo y cuánto tiempo se activa cada sector.", dificultad: "facil", opciones: ["El dispositivo que controla cuándo se activa cada sector de riego", "El elemento que filtra las partículas sólidas del agua de riego", "El elemento que mide la presión disponible en la red de riego", "El elemento que factura el consumo de agua del jardín"], correcta: 0 },
  { enunciado: "¿Qué elementos básicos integra habitualmente una instalación de riego automático?", explicacion: "Contador, cabezal de filtrado, electroválvulas y programador.", dificultad: "dificil", opciones: ["Contador, cabezal de filtrado, electroválvulas y programador", "Exclusivamente aspersores, sin ningún otro elemento adicional", "Exclusivamente un depósito domiciliario de almacenamiento", "Exclusivamente una válvula reductora de presión de gran calibre"], correcta: 0 },
]);

const S2 = "diseno-ahorro-eficiencia-jardines-omecgia";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué pautas de diseño básico exige el art. 80.1 de la OMECGIA para un jardín, entre otras?", reverso: "Respetar la estructura natural del terreno, reducir la superficie de césped en favor de vegetación menos exigente, seleccionar especies autóctonas o adaptadas al clima de Aragón, e incorporar recubrimientos que reduzcan la evaporación" },
  { anverso: "¿Qué porcentaje máximo de superficie de césped se admite en el diseño de nuevas plantaciones de más de una hectárea, según el art. 80.2 de la OMECGIA?", reverso: "Un 35% máximo de la superficie" },
  { anverso: "¿Qué porcentaje mínimo de arbolado (en superficie de tierra o planta tapizante) exige el art. 80.2 de la OMECGIA en plantaciones de más de una hectárea?", reverso: "Un 30% mínimo de la superficie" },
  { anverso: "¿Quién debe evaluar la posible variación de estos porcentajes por causa de diseño justificada, según el art. 80.3 de la OMECGIA?", reverso: "El informe debe ser evaluado por los servicios técnicos del Servicio de Parques y Jardines, requiriendo el visto bueno y aprobación municipal" },
  { anverso: "¿Qué sistemas de riego exige el art. 80.6 de la OMECGIA que minimicen el consumo de agua y de energía?", reverso: "La micro-irrigación, el riego por goteo, la red de aspersores regulados por programador, o los detectores de humedad para controlar la frecuencia del riego, sobre todo en días de lluvia" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué pauta de diseño básico exige el art. 80.1 de la OMECGIA para un jardín?", explicacion: "Reducir la superficie de césped en favor de vegetación menos exigente, entre otras pautas.", dificultad: "media", opciones: ["Reducir la superficie de césped en favor de vegetación menos exigente", "Maximizar en todo caso la superficie ocupada por césped", "Prohibir el uso de especies autóctonas en el diseño del jardín", "Prohibir cualquier recubrimiento de suelo distinto de la tierra"], correcta: 0 },
  { enunciado: "¿Qué porcentaje máximo de césped se admite en nuevas plantaciones de más de una hectárea, según el art. 80.2 de la OMECGIA?", explicacion: "Un 35% máximo.", dificultad: "dificil", opciones: ["Un 35% máximo", "Un 80% máximo", "Un 10% máximo", "Un 50% máximo"], correcta: 0 },
  { enunciado: "¿Qué porcentaje mínimo de arbolado exige el art. 80.2 de la OMECGIA en plantaciones de más de una hectárea?", explicacion: "Un 30% mínimo.", dificultad: "dificil", opciones: ["Un 30% mínimo", "Un 5% mínimo", "Un 60% mínimo", "Un 15% mínimo"], correcta: 0 },
  { enunciado: "¿Quién debe evaluar una variación justificada de los porcentajes de diseño, según el art. 80.3 de la OMECGIA?", explicacion: "Los servicios técnicos del Servicio de Parques y Jardines.", dificultad: "dificil", opciones: ["Los servicios técnicos del Servicio de Parques y Jardines", "El propio propietario del terreno, sin autorización adicional", "El Servicio de Explotación de Redes exclusivamente", "El organismo de cuenca competente sobre la red de riego"], correcta: 0 },
  { enunciado: "¿Qué sistemas de riego exige el art. 80.6 de la OMECGIA que minimicen el consumo de agua y energía?", explicacion: "Micro-irrigación, goteo, aspersores con programador o detectores de humedad.", dificultad: "media", opciones: ["Micro-irrigación, goteo, aspersores con programador", "Riego manual exclusivo mediante manguera", "Riego por inundación exclusivo de toda la superficie", "Riego exclusivo mediante cisternas municipales"], correcta: 0 },
]);

const S3 = "limitaciones-volumen-horario-control-omecgia";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué límite de volumen establece el art. 80.5 de la OMECGIA para la conexión de una red de riego?", reverso: "1.600 m³ por hectárea y año" },
  { anverso: "¿Qué restricción horaria de riego establece el art. 80.7 de la OMECGIA entre junio y septiembre?", reverso: "Se evitará el riego entre las 11 y las 20 horas" },
  { anverso: "¿Qué debe analizarse en el diseño de nuevas zonas verdes de 400 m² o más, según el art. 80.8 de la OMECGIA?", reverso: "La posibilidad de usar aguas pluviales, subterráneas o recicladas antes que agua apta para el consumo humano, y disponer de un programa anual de mantenimiento con sistemas de ahorro de agua" },
  { anverso: "¿Qué elementos de ahorro de agua cita el art. 80.8 de la OMECGIA para el programa anual de mantenimiento de una zona verde?", reverso: "Un contador de agua específico para la zona de riego (según Anexo XIII), programadores ajustados a las necesidades hídricas, sensores de lluvia o de humedad, detectores de fugas, aspersores de corto alcance en césped, riego por goteo en zonas arbustivas, y sistemas de prevención de escorrentía" },
  { anverso: "¿En qué instalaciones exige el art. 80.10 de la OMECGIA disponer de sistemas de control y de alarma ante rotura de conducciones?", reverso: "En instalaciones con consumos anuales superiores a 1.500 m³/año, superficies ajardinadas de más de 1.000 m², o que utilicen aguas grises" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué límite de volumen establece el art. 80.5 de la OMECGIA para la conexión de una red de riego?", explicacion: "1.600 m³ por hectárea y año.", dificultad: "dificil", opciones: ["1.600 m³ por hectárea y año", "16.000 m³ por hectárea y año", "160 m³ por hectárea y año", "1.600 m³ por hectárea y mes"], correcta: 0 },
  { enunciado: "¿Qué restricción horaria de riego establece el art. 80.7 de la OMECGIA entre junio y septiembre?", explicacion: "Evitar el riego entre las 11 y las 20 horas.", dificultad: "media", opciones: ["Evitar el riego entre las 11 y las 20 horas", "Evitar el riego entre las 20 y las 23 horas", "Evitar el riego durante todo el fin de semana", "Evitar el riego exclusivamente durante la noche"], correcta: 0 },
  { enunciado: "¿Qué debe analizarse en el diseño de nuevas zonas verdes de 400 m² o más, según el art. 80.8 de la OMECGIA?", explicacion: "El uso de aguas pluviales, subterráneas o recicladas antes que agua de consumo humano.", dificultad: "media", opciones: ["El uso de aguas pluviales, subterráneas o recicladas", "La instalación obligatoria de una piscina municipal cercana", "La prohibición absoluta de instalar césped en la superficie", "La necesidad de un certificado de profesionalidad del jardinero"], correcta: 0 },
  { enunciado: "¿Qué elemento de ahorro de agua, entre otros, exige el art. 80.8 de la OMECGIA para el mantenimiento de una zona verde?", explicacion: "Un contador de agua específico para la zona de riego.", dificultad: "media", opciones: ["Un contador de agua específico para la zona de riego", "Una segunda toma de agua no contabilizada por contador", "Un depósito domiciliario de más de 10.000 litros de capacidad", "Una válvula de compuerta de cierre metal exclusivamente"], correcta: 0 },
  { enunciado: "¿En qué instalaciones exige el art. 80.10 de la OMECGIA sistemas de control y alarma ante rotura de conducciones?", explicacion: "Consumos superiores a 1.500 m³/año o superficies ajardinadas de más de 1.000 m².", dificultad: "dificil", opciones: ["Consumos superiores a 1.500 m³/año o más de 1.000 m² ajardinados", "En cualquier instalación de riego, sin excepción alguna", "Únicamente en instalaciones de titularidad municipal", "Únicamente en instalaciones con fuentes ornamentales"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 19 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 19, orden: 19, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-199 creado y vinculado como Tema 19 de Oficial Guardallaves.");
