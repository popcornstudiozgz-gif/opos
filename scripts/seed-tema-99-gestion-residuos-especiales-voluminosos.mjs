/**
 * Crea tema-99: "Gestión de residuos especiales y voluminosos" — Tema 14
 * (numero=14, bloque-2) de Oficial Agente Inspector (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 12 oficial del Anexo I (bases2110.pdf):
 *   "Gestión de residuos especiales y voluminosos: recogida y traslado
 *   de residuos voluminosos; gestión de residuos electrónicos, muebles y
 *   escombros; organización del almacenamiento temporal de estos
 *   residuos. Instalaciones de tratamiento de residuos; puntos limpios;
 *   recogida neumática; Centro de Tratamiento de Residuos de Zaragoza
 *   (CTRUZ). Economía circular en la gestión de residuos: fomento de la
 *   reutilización y reciclaje de materiales recuperables; separación y
 *   clasificación de residuos para su valorización; recogida y
 *   tratamiento de residuos orgánicos y transformación en compost."
 *
 * Fuente primaria verificada en este turno: el Complejo para el
 * Tratamiento de Residuos Urbanos de Zaragoza (CTRUZ), gestionado por
 * Urbasur, ubicado en el Parque Tecnológico del Reciclaje, con
 * capacidad para más de 450.000 t/año de residuos urbanos y línea
 * específica de tratamiento de residuo orgánico para compostaje
 * (https://www.zaragoza.es/sede/servicio/equipamiento/2491,
 * https://www.zaragozarecicla.org/el-ctruz/que-es-el-ctruz/). El resto
 * del contenido (puntos limpios, recogida neumática, clasificación de
 * residuos) se trata como conocimiento técnico consolidado de gestión
 * de residuos municipales.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-99-gestion-residuos-especiales-voluminosos.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-99";
const OPOSICION = "oficial-agente-inspector-ayto-zaragoza";
const BLOQUE_2_ID = "b74ad422-4965-469e-9b9c-ef1a39c26d76";
const CTRUZ = "https://www.zaragoza.es/sede/servicio/equipamiento/2491";

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
  titulo: "Gestión de residuos especiales y voluminosos",
  descripcion: "Recogida de residuos voluminosos, electrónicos, muebles y escombros. Puntos limpios, recogida neumática y el CTRUZ. Economía circular: reutilización, reciclaje y compostaje.",
  contenido: "Desarrolla la recogida y traslado de residuos voluminosos, electrónicos, muebles y escombros, las instalaciones de tratamiento de residuos (puntos limpios, recogida neumática, el CTRUZ), y los principios de economía circular aplicados a la gestión de residuos: reutilización, reciclaje, separación y compostaje de residuos orgánicos.",
  enlaces_boe: [
    { url: CTRUZ, titulo: "Complejo para el Tratamiento de Residuos Urbanos de Zaragoza (CTRUZ)" },
  ],
  indice_estudio: [
    { url: "", titulo: "Recogida de residuos voluminosos, electrónicos y escombros", seccion: "recogida-residuos-voluminosos-electronicos-escombros", articulos: "Conceptos fundamentales" },
    { url: CTRUZ, titulo: "Instalaciones de tratamiento: puntos limpios, recogida neumática y CTRUZ", seccion: "instalaciones-tratamiento-puntos-limpios-ctruz", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Economía circular: reutilización, reciclaje y compostaje", seccion: "economia-circular-reciclaje-compostaje", articulos: "Conceptos fundamentales" },
  ],
}]);

const S1 = "recogida-residuos-voluminosos-electronicos-escombros";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un residuo voluminoso?", reverso: "Un residuo de gran tamaño que, por sus dimensiones, no puede depositarse en los contenedores ordinarios de recogida (muebles, colchones, electrodomésticos grandes) y requiere un sistema de recogida específico" },
  { anverso: "¿Qué es un RAEE (residuo de aparato eléctrico y electrónico)?", reverso: "Cualquier aparato que ha funcionado con corriente eléctrica o campos electromagnéticos y ha llegado al final de su vida útil (electrodomésticos, ordenadores, móviles), sometido a una gestión específica por los materiales y componentes que puede contener" },
  { anverso: "¿Por qué requieren los RAEE una gestión diferenciada de los residuos ordinarios?", reverso: "Porque pueden contener sustancias peligrosas (metales pesados, gases refrigerantes) y, a la vez, materiales valiosos recuperables (metales, plásticos, componentes electrónicos), que deben tratarse en instalaciones autorizadas específicas" },
  { anverso: "¿Qué es un escombro de obra menor y cómo debe gestionarse?", reverso: "Los residuos de construcción y demolición generados en pequeñas reformas domésticas; deben depositarse en contenedores específicos o trasladarse a un punto limpio, sin mezclarse con residuos domésticos ordinarios" },
  { anverso: "¿Cómo se solicita habitualmente la recogida de un residuo voluminoso en un municipio como Zaragoza?", reverso: "Mediante solicitud previa (telefónica, online o app municipal), indicando el día y punto de recogida, para que el servicio municipal correspondiente lo retire en la fecha asignada" },
  { anverso: "¿Qué problema genera el abandono incontrolado de residuos voluminosos en la vía pública sin solicitar la recogida?", reverso: "Genera un vertido incontrolado que deteriora la imagen del espacio público, puede suponer un riesgo (obstáculo, foco de insectos o roedores) y constituye una infracción sancionable según la ordenanza municipal de residuos" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es un residuo voluminoso?", explicacion: "Un residuo de gran tamaño que no cabe en los contenedores ordinarios.", dificultad: "facil", opciones: ["Un residuo de gran tamaño fuera de contenedores ordinarios", "Cualquier residuo peligroso, sin importar el tamaño", "Un residuo orgánico compostable", "Un residuo exclusivamente electrónico"], correcta: 0 },
  { enunciado: "¿Qué es un RAEE?", explicacion: "Un residuo de aparato eléctrico y electrónico al final de su vida útil.", dificultad: "media", opciones: ["Un aparato eléctrico o electrónico al final de su vida útil", "Un residuo exclusivamente de construcción", "Un residuo orgánico de jardinería", "Un residuo voluminoso no eléctrico"], correcta: 0 },
  { enunciado: "¿Por qué los RAEE requieren gestión diferenciada?", explicacion: "Pueden contener sustancias peligrosas y materiales valiosos recuperables.", dificultad: "media", opciones: ["Contienen sustancias peligrosas y materiales recuperables", "No presentan ningún riesgo específico", "Son siempre biodegradables", "Se gestionan igual que cualquier residuo orgánico"], correcta: 0 },
  { enunciado: "¿Cómo debe gestionarse un escombro de obra menor doméstica?", explicacion: "En contenedores específicos o trasladándolo a un punto limpio.", dificultad: "media", opciones: ["En contenedores específicos o punto limpio", "Mezclado con residuos domésticos ordinarios", "Abandonado en cualquier zona verde", "No requiere ninguna gestión específica"], correcta: 0 },
  { enunciado: "¿Cómo se solicita habitualmente la recogida de un residuo voluminoso?", explicacion: "Mediante solicitud previa telefónica, online o por app municipal.", dificultad: "media", opciones: ["Mediante solicitud previa telefónica u online", "Depositándolo directamente sin avisar", "Solo puede llevarse personalmente al CTRUZ", "No existe ningún procedimiento de solicitud"], correcta: 0 },
  { enunciado: "¿Qué supone el abandono incontrolado de residuos voluminosos en la vía pública?", explicacion: "Un vertido incontrolado sancionable según la ordenanza municipal.", dificultad: "media", opciones: ["Un vertido sancionable según la ordenanza municipal", "Una práctica habitual sin ninguna consecuencia", "Está permitido si es de noche", "Solo afecta a residuos electrónicos"], correcta: 0 },
]);

const S2 = "instalaciones-tratamiento-puntos-limpios-ctruz";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un punto limpio?", reverso: "Una instalación municipal donde la ciudadanía puede depositar de forma gratuita y separada por tipología residuos que no van en los contenedores ordinarios (voluminosos, RAEE, escombros de obra menor, residuos peligrosos domésticos)" },
  { anverso: "¿Qué tipos de residuos se admiten habitualmente en un punto limpio?", reverso: "Muebles y enseres, electrodomésticos, RAEE, escombros de pequeña reforma, pilas y baterías, aceites usados, restos de poda, y otros residuos peligrosos domésticos (pinturas, disolventes)" },
  { anverso: "¿Qué es la recogida neumática de residuos?", reverso: "Un sistema de transporte de residuos mediante conductos subterráneos por succión de aire, que traslada la basura depositada en buzones fijos hasta una central de recogida, evitando el paso de camiones de recogida por la calle" },
  { anverso: "¿Qué ventaja aporta la recogida neumática frente a la recogida tradicional con contenedores?", reverso: "Reduce el tráfico de camiones de recogida por las calles, disminuye el ruido y las molestias asociadas, y evita la presencia visible de contenedores en la vía pública" },
  { anverso: "¿Qué es el CTRUZ (Complejo para el Tratamiento de Residuos Urbanos de Zaragoza)?", reverso: "La instalación que gestiona el tratamiento de los residuos urbanos de Zaragoza y municipios de su entorno, con capacidad para varios cientos de miles de toneladas al año, que incluye recuperación de materiales, tratamiento de residuo orgánico para compost, y generación de biogás/electricidad" },
  { anverso: "¿Qué empresa gestiona el CTRUZ y dónde se ubica?", reverso: "Lo gestiona la empresa Urbasur, ubicado en el Parque Tecnológico del Reciclaje (López Soriano) de Zaragoza" },
  { anverso: "¿Qué es el CIAM (Centro de Innovación Alfonso Maíllo) dentro del complejo del CTRUZ?", reverso: "Un centro dedicado a la investigación y desarrollo de tecnologías para minimizar residuos y transformarlos en nuevos recursos, alineado con los principios de economía circular" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es un punto limpio?", explicacion: "Una instalación municipal para depositar residuos separados que no van en contenedores ordinarios.", dificultad: "facil", opciones: ["Una instalación para depositar residuos separados", "Un contenedor ordinario de recogida", "Un tipo de vertido incontrolado", "Un residuo voluminoso doméstico"], correcta: 0 },
  { enunciado: "¿Qué residuos se admiten habitualmente en un punto limpio?", explicacion: "Muebles, RAEE, escombros de obra menor, pilas, aceites y restos de poda.", dificultad: "media", opciones: ["Muebles, RAEE, escombros menores y pilas", "Únicamente residuos orgánicos de cocina", "Únicamente papel y cartón", "Ningún residuo especial se admite"], correcta: 0 },
  { enunciado: "¿Qué es la recogida neumática de residuos?", explicacion: "Un sistema de transporte por conductos subterráneos mediante succión de aire.", dificultad: "media", opciones: ["Transporte por conductos subterráneos por succión", "Recogida exclusivamente con camiones", "Un tipo de punto limpio móvil", "Un sistema de compostaje doméstico"], correcta: 0 },
  { enunciado: "¿Qué ventaja aporta la recogida neumática frente a la tradicional?", explicacion: "Reduce el tráfico de camiones, el ruido y la presencia de contenedores.", dificultad: "media", opciones: ["Reduce tráfico, ruido y contenedores visibles", "No aporta ninguna ventaja real", "Aumenta el tráfico de camiones de recogida", "Solo funciona para residuos orgánicos"], correcta: 0 },
  { enunciado: "¿Qué es el CTRUZ?", explicacion: "El complejo que trata los residuos urbanos de Zaragoza y su entorno.", dificultad: "media", opciones: ["El complejo de tratamiento de residuos urbanos", "Un punto limpio de pequeño tamaño", "Un tipo de contenedor de recogida selectiva", "Una ordenanza municipal de residuos"], correcta: 0 },
  { enunciado: "¿Qué empresa gestiona el CTRUZ?", explicacion: "Urbasur.", dificultad: "dificil", opciones: ["Urbasur", "Zaragoza Deporte Municipal", "Las Brigadas de Arquitectura", "El Servicio de Movilidad Urbana"], correcta: 0 },
  { enunciado: "¿Qué función cumple el CIAM dentro del CTRUZ?", explicacion: "Investigación y desarrollo de tecnologías de economía circular.", dificultad: "dificil", opciones: ["Investigación de tecnologías de economía circular", "Gestión exclusiva de residuos voluminosos", "Recogida neumática de residuos", "Control sanitario de piscinas municipales"], correcta: 0 },
]);

const S3 = "economia-circular-reciclaje-compostaje";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es la economía circular aplicada a la gestión de residuos?", reverso: "Un modelo que busca mantener el valor de los materiales el mayor tiempo posible, priorizando la reducción, reutilización y reciclaje frente al modelo lineal tradicional de 'producir, usar y tirar'" },
  { anverso: "¿Qué diferencia hay entre reutilización y reciclaje de un residuo?", reverso: "La reutilización aprovecha directamente el objeto o material para el mismo u otro uso sin transformarlo; el reciclaje transforma el material del residuo (fundiéndolo, triturándolo) para obtener materia prima que se incorpora a un nuevo producto" },
  { anverso: "¿Qué es la separación en origen de los residuos?", reverso: "La clasificación de los residuos por tipología (orgánico, papel, envases, vidrio, resto) que realiza la propia persona generadora antes de depositarlos, facilitando su posterior valorización" },
  { anverso: "¿Qué es la valorización de un residuo?", reverso: "El proceso que permite aprovechar el residuo como recurso, ya sea mediante reciclaje de materiales, compostaje de la fracción orgánica, o valorización energética (generación de energía a partir de residuos no reciclables)" },
  { anverso: "¿Qué es el compostaje de residuos orgánicos?", reverso: "El proceso biológico de descomposición controlada de la materia orgánica (restos de comida, poda) que la transforma en compost, un abono orgánico rico en nutrientes reutilizable en agricultura y jardinería" },
  { anverso: "¿Qué es el biogás generado a partir de residuos orgánicos y para qué se aprovecha?", reverso: "Un gas combustible generado por la descomposición anaeróbica (sin oxígeno) de la materia orgánica, que puede aprovecharse para generar electricidad o calor, reduciendo el uso de combustibles fósiles" },
  { anverso: "¿Qué papel puede tener un agente inspector municipal en el fomento de la economía circular en su ámbito de actuación?", reverso: "Sensibilizar y orientar a la ciudadanía sobre la correcta separación de residuos, detectar incidencias en la gestión de residuos (vertidos, mezcla incorrecta), y colaborar en campañas de educación ambiental sobre reciclaje" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es la economía circular aplicada a residuos?", explicacion: "Un modelo que prioriza reducción, reutilización y reciclaje frente al modelo lineal.", dificultad: "facil", opciones: ["Un modelo que prioriza reducción, reutilización y reciclaje", "Un modelo que solo prioriza la incineración", "Un modelo exclusivo de residuos electrónicos", "Un sinónimo de vertido controlado"], correcta: 0 },
  { enunciado: "¿Qué diferencia hay entre reutilización y reciclaje?", explicacion: "La reutilización no transforma el material; el reciclaje sí lo transforma para un nuevo producto.", dificultad: "media", opciones: ["La reutilización no transforma; el reciclaje sí", "Son términos exactamente sinónimos", "El reciclaje nunca transforma el material", "La reutilización siempre implica fundición"], correcta: 0 },
  { enunciado: "¿Qué es la separación en origen de los residuos?", explicacion: "La clasificación por tipología que hace la persona generadora antes de depositarlos.", dificultad: "media", opciones: ["La clasificación previa por la persona generadora", "El proceso final en la planta de tratamiento", "Un sinónimo de compostaje", "Un tipo de recogida neumática"], correcta: 0 },
  { enunciado: "¿Qué es la valorización de un residuo?", explicacion: "El proceso que permite aprovecharlo como recurso (reciclaje, compostaje, energía).", dificultad: "media", opciones: ["Aprovecharlo como recurso mediante distintos procesos", "Su eliminación definitiva sin ningún aprovechamiento", "Un sinónimo exacto de vertido controlado", "Solo aplica a residuos electrónicos"], correcta: 0 },
  { enunciado: "¿Qué es el compostaje de residuos orgánicos?", explicacion: "La descomposición controlada que transforma la materia orgánica en abono.", dificultad: "facil", opciones: ["Descomposición controlada que genera abono orgánico", "La incineración de residuos orgánicos", "Un tipo de recogida neumática", "El reciclaje de materiales metálicos"], correcta: 0 },
  { enunciado: "¿Qué es el biogás generado a partir de residuos orgánicos?", explicacion: "Un gas combustible por descomposición anaeróbica, aprovechable como energía.", dificultad: "media", opciones: ["Un gas combustible aprovechable como energía", "Un tipo de abono orgánico sólido", "Un residuo peligroso sin aprovechamiento", "Un producto exclusivo del reciclaje de vidrio"], correcta: 0 },
  { enunciado: "¿Qué papel puede tener un agente inspector en el fomento de la economía circular?", explicacion: "Sensibilizar a la ciudadanía y detectar incidencias en la gestión de residuos.", dificultad: "media", opciones: ["Sensibilizar y detectar incidencias en la gestión", "Ningún papel, es competencia exclusiva del CTRUZ", "Solo gestionar directamente la planta de tratamiento", "Solo aplica a residuos voluminosos"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 14 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 14, orden: 14, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-99 creado y vinculado como Tema 14 de Oficial Agente Inspector.");
