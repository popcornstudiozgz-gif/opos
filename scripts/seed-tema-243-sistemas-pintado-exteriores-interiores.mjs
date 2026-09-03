/**
 * Crea tema-243: "Sistemas de pintado en exteriores e interiores" —
 * Tema 15 (numero=15, bloque-2) de Oficial Pintor, Especialidad General
 * (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 13 oficial del Anexo I (bases2110.pdf, línea
 * 1468): "Sistemas de pintado en exteriores e interiores. Barnices.
 * Superficies. Materiales. Procesos. Métodos de aplicación. Defectos de
 * la pintura y de su aplicación. Normativa."
 *
 * Normativa: RD 227/2006 (BOE-A-2006-3377, COV) ya citado, de
 * aplicación a los barnices y pinturas de estos sistemas. El resto
 * (defectos de aplicación y sus causas) es conocimiento técnico
 * consolidado del oficio.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-243-sistemas-pintado-exteriores-interiores.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-243";
const OPOSICION = "oficial-pintor-general-ayto-zaragoza";
const BLOQUE_2_ID = "77506e2f-f4c6-4512-8bf8-99d0b3bbbafd";

const RD_227_2006 = "https://www.boe.es/buscar/act.php?id=BOE-A-2006-3377";

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
  titulo: "Sistemas de pintado en exteriores e interiores",
  descripcion: "Barnices y sistemas de pintado según el entorno exterior o interior. Materiales y procesos característicos de cada sistema. Defectos habituales de la pintura y de su aplicación.",
  contenido: "Desarrolla los sistemas de pintado según se apliquen en exteriores o en interiores: los barnices de protección y sus tipos según la exposición a la intemperie; las diferencias de materiales y procesos entre un sistema exterior (mayor exigencia de resistencia a la intemperie, a los rayos UV y a la humedad) y uno interior (mayor peso del acabado estético y de la durabilidad frente al uso); y los defectos más habituales de la pintura y de su aplicación (descuelgues, cráteres, falta de adherencia, entre otros), sus causas y su prevención.",
  enlaces_boe: [
    { url: RD_227_2006, titulo: "RD 227/2006 — límites de COV en pinturas y barnices" },
  ],
  indice_estudio: [
    { url: RD_227_2006, titulo: "Barnices y sistemas de pintado según el entorno", seccion: "barnices-sistemas-pintado-entorno", articulos: "RD 227/2006" },
    { url: "", titulo: "Materiales y procesos de los sistemas exterior e interior", seccion: "materiales-procesos-sistemas-exterior-interior", articulos: "Conocimiento técnico del oficio" },
    { url: "", titulo: "Defectos de la pintura y de su aplicación", seccion: "defectos-pintura-aplicacion", articulos: "Conocimiento técnico del oficio" },
  ],
}]);

const S1 = "barnices-sistemas-pintado-entorno";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un barniz, como producto de acabado?", reverso: "Un producto de acabado transparente o translúcido, formado por un ligante disuelto en un vehículo, que protege la superficie (habitualmente madera) sin ocultar su color o su veta natural, aportando brillo y protección frente al desgaste y la humedad" },
  { anverso: "¿Qué es un barniz marino o náutico, y por qué se emplea también en exteriores urbanos?", reverso: "Un barniz de elevada resistencia a la intemperie, a los rayos UV y a la humedad, formulado originalmente para embarcaciones, empleado también en elementos de madera expuestos al exterior (bancos, pérgolas, carpintería exterior) por su mayor durabilidad frente a un barniz de interior convencional" },
  { anverso: "¿Qué diferencia fundamental exige un sistema de pintado exterior frente a uno interior?", reverso: "El sistema exterior debe resistir la exposición directa a la intemperie: radiación ultravioleta, lluvia, cambios de temperatura y humedad, lo que exige productos con mayor elasticidad y resistencia a estos agentes; el sistema interior prioriza más el acabado estético, la resistencia a la limpieza y, en algunos casos, la resistencia al vapor de agua en cocinas o baños" },
  { anverso: "¿Qué es un barniz al agua, frente a un barniz de base disolvente?", reverso: "Un barniz formulado con resinas en dispersión acuosa, de menor emisión de compuestos orgánicos volátiles y de secado habitualmente más rápido, aunque tradicionalmente con una resistencia algo inferior a la de un barniz de base disolvente en condiciones muy exigentes, diferencia que se ha reducido con las formulaciones más recientes" },
  { anverso: "¿Por qué es relevante conocer los valores límite de COV del RD 227/2006 al seleccionar un barniz para un trabajo exterior de gran superficie?", reverso: "Porque el propio producto comercializado debe cumplir el límite de COV fijado por la normativa según su categoría, y esa información, recogida en su ficha técnica y etiquetado, permite al Oficial Pintor comprobar que el producto elegido es conforme a la normativa vigente" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es un barniz, como producto de acabado?", explicacion: "Un producto transparente o translúcido que protege la superficie sin ocultar su color o veta.", dificultad: "facil", opciones: ["Un producto transparente que protege sin ocultar el soporte", "Un producto opaco que oculta por completo el soporte", "Un pigmento que aporta color a una pintura", "Un aditivo que acelera el secado de una pintura"], correcta: 0 },
  { enunciado: "¿Qué caracteriza a un barniz marino o náutico?", explicacion: "Una elevada resistencia a la intemperie, rayos UV y humedad.", dificultad: "media", opciones: ["Elevada resistencia a la intemperie y rayos UV", "Es exclusivo para superficies metálicas interiores", "Carece de cualquier resistencia a la humedad", "Solo puede aplicarse mediante pistola airless"], correcta: 0 },
  { enunciado: "¿Qué diferencia fundamental exige un sistema de pintado exterior frente a uno interior?", explicacion: "El exterior debe resistir la intemperie, rayos UV y humedad; el interior prioriza el acabado y la limpieza.", dificultad: "media", opciones: ["El exterior resiste la intemperie; el interior prioriza el acabado", "Ambos sistemas exigen exactamente los mismos requisitos", "El sistema interior siempre exige mayor resistencia UV", "El sistema exterior nunca exige resistencia a la humedad"], correcta: 0 },
  { enunciado: "¿Qué caracteriza a un barniz al agua frente a uno de base disolvente?", explicacion: "Menor emisión de COV y secado habitualmente más rápido.", dificultad: "media", opciones: ["Menor emisión de COV y secado habitualmente más rápido", "Siempre ofrece mayor resistencia que uno de base disolvente", "Nunca puede aplicarse sobre superficies de madera", "Requiere siempre un disolvente orgánico para su limpieza"], correcta: 0 },
  { enunciado: "¿Por qué es relevante conocer los límites de COV del RD 227/2006 al elegir un barniz?", explicacion: "El producto comercializado debe cumplir el límite fijado según su categoría, verificable en su ficha técnica.", dificultad: "dificil", opciones: ["El producto debe cumplir el límite de COV de su categoría", "El RD 227/2006 no resulta aplicable a los barnices", "Los límites de COV solo aplican a pinturas, nunca a barnices", "El etiquetado nunca informa sobre el contenido de COV"], correcta: 0 },
]);

const S2 = "materiales-procesos-sistemas-exterior-interior";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué proceso adicional suele exigir un sistema de pintado exterior sobre fachada, respecto a uno interior, antes de aplicar el acabado?", reverso: "Un tratamiento previo más exhaustivo frente a la humedad y las patologías propias de una fachada (eliminación de eflorescencias, tratamiento de fisuras, comprobación de la adherencia del revestimiento existente), dado que estos defectos comprometen antes y de forma más grave un sistema expuesto a la intemperie" },
  { anverso: "¿Qué es un sistema de pintado \"transpirable\", especialmente relevante en fachadas exteriores?", reverso: "Un sistema (imprimación más pintura de acabado) formulado para permitir la salida del vapor de agua del interior del muro hacia el exterior, evitando que la humedad quede retenida en el paramento y provoque desconchones, ampollas o degradación del propio sistema de pintura" },
  { anverso: "¿Qué material resulta habitual en un sistema de pintado interior de cocinas o baños, dada la exposición a la humedad y a la limpieza frecuente?", reverso: "Una pintura plástica con acabado satinado o semi-mate y elevada resistencia al lavado, o en algunos casos un esmalte, formulaciones que resisten mejor la condensación y permiten una limpieza más frecuente sin deteriorarse" },
  { anverso: "¿Qué proceso es habitual en un sistema de pintado interior sobre una pared con pequeñas fisuras superficiales previas al acabado, a diferencia de una fachada exterior?", reverso: "El tratamiento con una banda de refuerzo o malla de fibra de vidrio embebida en masilla sobre las fisuras, previniendo su reaparición a través del acabado, técnica también aplicable en exteriores pero especialmente habitual en interiores de tabiquería" },
  { anverso: "¿Por qué es importante adaptar el proceso completo (preparación, imprimación y acabado) al carácter exterior o interior de una superficie, y no aplicar siempre el mismo sistema por comodidad?", reverso: "Porque las exigencias de resistencia, transpirabilidad y durabilidad son distintas en cada caso; un sistema pensado para interior aplicado en exterior puede fallar prematuramente por no resistir la intemperie, y un sistema exterior aplicado en interior puede suponer un gasto innecesario o un acabado menos adecuado estéticamente" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué proceso adicional suele exigir un sistema exterior sobre fachada respecto a uno interior?", explicacion: "Un tratamiento previo más exhaustivo frente a humedad y patologías (eflorescencias, fisuras).", dificultad: "media", opciones: ["Un tratamiento previo más exhaustivo frente a la humedad", "Ningún proceso adicional distinto del interior", "Únicamente una capa de barniz decorativo adicional", "Únicamente un cambio en el color del acabado"], correcta: 0 },
  { enunciado: "¿Qué es un sistema de pintado transpirable en fachadas?", explicacion: "Un sistema que permite la salida del vapor de agua del muro hacia el exterior.", dificultad: "media", opciones: ["Un sistema que permite la salida del vapor de agua del muro", "Un sistema que impide por completo cualquier paso de vapor", "Un sistema exclusivo para superficies metálicas exteriores", "Un sistema que solo se aplica en interiores húmedos"], correcta: 0 },
  { enunciado: "¿Qué acabado resulta habitual en un sistema interior de cocinas o baños?", explicacion: "Una pintura plástica satinada o semi-mate de elevada resistencia al lavado.", dificultad: "media", opciones: ["Una pintura plástica de elevada resistencia al lavado", "Una pintura de silicatos exclusiva de fachadas", "Un barniz marino de uso exclusivamente exterior", "Una resina epoxi exclusiva de pavimentos industriales"], correcta: 0 },
  { enunciado: "¿Qué técnica es habitual para tratar pequeñas fisuras antes del acabado en interiores de tabiquería?", explicacion: "Una banda de refuerzo o malla de fibra de vidrio embebida en masilla.", dificultad: "dificil", opciones: ["Una banda de refuerzo o malla de fibra embebida en masilla", "Ninguna técnica específica distinta del lijado habitual", "Una imprimación antioxidante exclusiva de superficies metálicas", "Un barniz marino aplicado directamente sobre la fisura"], correcta: 0 },
  { enunciado: "¿Por qué es importante adaptar el sistema de pintado al carácter exterior o interior de la superficie?", explicacion: "Las exigencias de resistencia, transpirabilidad y durabilidad son distintas en cada caso.", dificultad: "media", opciones: ["Las exigencias de resistencia y durabilidad son distintas en cada caso", "El sistema de pintado nunca varía según el entorno", "Siempre resulta preferible aplicar el sistema exterior en cualquier caso", "Siempre resulta preferible aplicar el sistema interior en cualquier caso"], correcta: 0 },
]);

const S3 = "defectos-pintura-aplicacion";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un descuelgue (o \"lágrima\"), como defecto de aplicación de la pintura?", reverso: "Un defecto que se manifiesta como un goteo o escurrimiento visible de la pintura antes de secar, provocado habitualmente por un exceso de producto aplicado, una viscosidad demasiado baja, o una aplicación en una superficie vertical con exceso de carga en la brocha, rodillo o pistola" },
  { anverso: "¿Qué es el cráter o \"piel de naranja\", como defecto de aplicación de la pintura?", reverso: "Un defecto de la superficie acabada que presenta pequeños hoyuelos o una textura irregular similar a la piel de una naranja, causado habitualmente por una técnica de pulverización inadecuada con pistola (presión o distancia incorrectas) o por un secado demasiado rápido de la capa aplicada" },
  { anverso: "¿Qué es la falta de adherencia, como defecto de la pintura, y cuál es su causa más habitual?", reverso: "El desprendimiento de la película de pintura respecto al soporte, en forma de descamación o desconchado; su causa más habitual es una preparación insuficiente de la superficie (falta de limpieza, presencia de polvo o grasa, ausencia de imprimación adecuada) antes de la aplicación" },
  { anverso: "¿Qué es el amarilleamiento, como defecto de determinados acabados con el paso del tiempo?", reverso: "El cambio de tono hacia el amarillo que experimentan ciertos barnices o esmaltes (especialmente los de base alquídica o epoxi) por efecto de la exposición prolongada a la luz o por falta de luz en espacios cerrados, un defecto que puede reducirse eligiendo productos formulados para minimizarlo" },
  { anverso: "¿Qué relación existe entre un buen proceso de preparación de la superficie, ya estudiado en este bloque temático, y la prevención de la mayoría de los defectos de aplicación?", reverso: "La mayoría de los defectos de aplicación (falta de adherencia, descuelgues por absorción irregular, cráteres por contaminación de la superficie) tienen su origen, total o parcialmente, en una preparación insuficiente o inadecuada del soporte, por lo que un buen proceso previo reduce significativamente su aparición" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es un descuelgue o \"lágrima\", como defecto de aplicación?", explicacion: "Un goteo o escurrimiento visible de la pintura antes de secar, por exceso de producto o baja viscosidad.", dificultad: "media", opciones: ["Un goteo visible de la pintura antes de secar", "Un cambio de color de la pintura con el paso del tiempo", "Una pérdida de adherencia de la pintura al soporte", "Una textura irregular similar a la piel de naranja"], correcta: 0 },
  { enunciado: "¿Qué es el cráter o \"piel de naranja\", como defecto de aplicación?", explicacion: "Una textura irregular con pequeños hoyuelos, por técnica de pulverización inadecuada o secado rápido.", dificultad: "media", opciones: ["Una textura irregular con pequeños hoyuelos", "Un goteo visible de la pintura antes de secar", "Una pérdida de adherencia de la pintura al soporte", "Un cambio de color de la pintura con el tiempo"], correcta: 0 },
  { enunciado: "¿Cuál es la causa más habitual de la falta de adherencia de una pintura?", explicacion: "Una preparación insuficiente de la superficie antes de la aplicación.", dificultad: "media", opciones: ["Una preparación insuficiente de la superficie", "Un exceso de producto aplicado en una sola capa", "Una técnica de pulverización con pistola inadecuada", "Una exposición prolongada del acabado a la luz"], correcta: 0 },
  { enunciado: "¿Qué es el amarilleamiento, como defecto de determinados acabados?", explicacion: "El cambio de tono hacia el amarillo por exposición a la luz, propio de ciertos barnices o esmaltes.", dificultad: "dificil", opciones: ["El cambio de tono hacia el amarillo por exposición a la luz", "Un goteo visible de la pintura antes de secar", "Una textura irregular similar a la piel de naranja", "Una pérdida total de adherencia al soporte"], correcta: 0 },
  { enunciado: "¿Qué relación existe entre una buena preparación de la superficie y la prevención de defectos de aplicación?", explicacion: "La mayoría de los defectos tienen su origen, total o parcialmente, en una preparación insuficiente.", dificultad: "dificil", opciones: ["La mayoría de defectos se originan en una preparación insuficiente", "La preparación de la superficie nunca influye en los defectos", "Los defectos de aplicación son siempre aleatorios e inevitables", "Solo influye en el defecto del amarilleamiento con el tiempo"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 15 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 15, orden: 15, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-243 creado y vinculado como Tema 15 de Oficial Pintor General.");
