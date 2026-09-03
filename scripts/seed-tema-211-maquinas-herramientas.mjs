/**
 * Crea tema-211: "Máquinas y herramientas" — Tema 15 (numero=15,
 * bloque-2) de Oficial Planta Potabilizadora (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 13 oficial del Anexo I (bases2110.pdf, línea
 * 1194): "Máquinas y herramientas: procesos de mecanizado. Herramientas
 * neumáticas y eléctricas. Uniones mecánicas: tipos, características y
 * uso. Rodamientos: tipos, características y uso. Vibraciones mecánicas
 * en máquinas rotativas."
 *
 * Conocimiento técnico consolidado de mecánica general y mantenimiento
 * industrial, sin una ley española que lo regule como tal — mismo
 * criterio ya aplicado en Oficial Herrero (mecanizado, ver
 * scripts/seed-tema-159-*.mjs) y Oficial Mecánico de este proyecto.
 * Búsqueda previa realizada conforme al estándar de sourcing: no existe
 * una norma española específica que regule los procesos de mecanizado,
 * los tipos de uniones mecánicas o de rodamientos como tales; sí existe
 * el marco general de seguridad de equipos de trabajo (RD 1215/1997,
 * ya verificado en el proyecto) aplicable al uso de estas herramientas,
 * que se tratará en el tema de PRL específico de esta oposición
 * (tema-217/218).
 *
 * Tres secciones:
 * 1. procesos-mecanizado-herramientas-neumaticas-electricas
 * 2. uniones-mecanicas-tipos-caracteristicas-uso
 * 3. rodamientos-vibraciones-maquinas-rotativas
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-211-maquinas-herramientas.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-211";
const OPOSICION = "oficial-planta-potabilizadora-ayto-zaragoza";
const BLOQUE_2_ID = "ca4ed0ad-ab08-4bc9-80b7-fb4e6941b64a";

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
  titulo: "Máquinas y herramientas",
  descripcion: "Procesos de mecanizado. Herramientas neumáticas y eléctricas. Uniones mecánicas: tipos, características y uso. Rodamientos: tipos, características y uso. Vibraciones mecánicas en máquinas rotativas.",
  contenido: "Desarrolla los conocimientos básicos de mecánica general necesarios para el mantenimiento de los equipos de una planta potabilizadora: los principales procesos de mecanizado y las herramientas neumáticas y eléctricas empleadas habitualmente, los tipos de uniones mecánicas y sus características, los rodamientos (tipos, características y uso) presentes en bombas, motores y otros equipos rotativos, y las vibraciones mecánicas en máquinas rotativas como síntoma de posibles anomalías.",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "Procesos de mecanizado y herramientas neumáticas y eléctricas", seccion: "procesos-mecanizado-herramientas-neumaticas-electricas", articulos: "Conocimiento técnico de mecánica general" },
    { url: "", titulo: "Uniones mecánicas: tipos, características y uso", seccion: "uniones-mecanicas-tipos-caracteristicas-uso", articulos: "Conocimiento técnico de mecánica general" },
    { url: "", titulo: "Rodamientos y vibraciones mecánicas en máquinas rotativas", seccion: "rodamientos-vibraciones-maquinas-rotativas", articulos: "Conocimiento técnico de mecánica general" },
  ],
}]);

const S1 = "procesos-mecanizado-herramientas-neumaticas-electricas";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es el mecanizado, en el ámbito del mantenimiento de una planta potabilizadora?", reverso: "El conjunto de procesos que dan forma o modifican una pieza metálica (o de otro material) mediante la eliminación controlada de material, empleados habitualmente para fabricar o reparar piezas pequeñas de recambio en el propio taller de mantenimiento" },
  { anverso: "¿Qué es el taladrado, como proceso básico de mecanizado?", reverso: "El proceso que genera un agujero cilíndrico en una pieza mediante una herramienta rotativa de corte (broca), habitual para preparar orificios de fijación o de paso de tornillería" },
  { anverso: "¿Qué es el roscado, como proceso de mecanizado, y para qué se emplea en el mantenimiento de la planta?", reverso: "El proceso que genera una rosca (interior o exterior) en una pieza, mediante machos de roscar o terrajas, empleado para preparar uniones atornilladas o para reparar una rosca dañada" },
  { anverso: "¿Qué ventaja aportan las herramientas neumáticas frente a las eléctricas en algunas tareas de mantenimiento de una planta de tratamiento de agua?", reverso: "Al no incorporar un motor eléctrico interno, reducen el riesgo de chispa en presencia de atmósferas potencialmente explosivas o húmedas, y suelen ser más ligeras y con menor riesgo de sobrecalentamiento en usos intensivos, siempre que la instalación disponga de aire comprimido disponible" },
  { anverso: "¿Qué precaución básica de seguridad debe tenerse en cuenta al emplear herramientas eléctricas portátiles en un entorno con presencia de agua o humedad, como una planta potabilizadora?", reverso: "Verificar que la herramienta cuenta con el aislamiento eléctrico adecuado y, cuando sea posible, emplear herramientas de doble aislamiento o alimentadas a muy baja tensión de seguridad, además de asegurar una protección diferencial adecuada en el circuito de alimentación" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es el mecanizado, en el ámbito del mantenimiento de una planta?", explicacion: "El conjunto de procesos que dan forma a una pieza mediante eliminación controlada de material.", dificultad: "facil", opciones: ["Dar forma a una pieza mediante eliminación controlada de material", "Dosificar reactivos químicos en el proceso de tratamiento", "Medir el caudal y la presión de una conducción de la planta", "Desinfectar el agua mediante la adición de hipoclorito sódico"], correcta: 0 },
  { enunciado: "¿Qué es el taladrado como proceso básico de mecanizado?", explicacion: "Genera un agujero cilíndrico mediante una herramienta rotativa de corte (broca).", dificultad: "media", opciones: ["Genera un agujero cilíndrico mediante una broca", "Genera una rosca interior o exterior en la pieza", "Elimina el óxido superficial de una pieza metálica", "Une dos piezas metálicas mediante fusión del material"], correcta: 0 },
  { enunciado: "¿Qué es el roscado como proceso de mecanizado?", explicacion: "Genera una rosca en una pieza mediante machos de roscar o terrajas.", dificultad: "media", opciones: ["Genera una rosca en la pieza mediante machos o terrajas", "Genera un agujero cilíndrico mediante una herramienta rotativa", "Elimina el óxido superficial de una pieza metálica", "Une dos piezas metálicas mediante fusión del material"], correcta: 0 },
  { enunciado: "¿Qué ventaja aportan las herramientas neumáticas frente a las eléctricas en algunos entornos de la planta?", explicacion: "Reducen el riesgo de chispa en atmósferas explosivas o húmedas.", dificultad: "dificil", opciones: ["Reducen el riesgo de chispa en atmósferas explosivas o húmedas", "Siempre requieren menos mantenimiento que una herramienta eléctrica", "Nunca requieren ningún tipo de suministro de aire comprimido", "Son siempre más precisas que cualquier herramienta eléctrica"], correcta: 0 },
  { enunciado: "¿Qué precaución básica debe adoptarse al usar herramientas eléctricas portátiles en presencia de humedad?", explicacion: "Verificar el aislamiento adecuado y asegurar protección diferencial en el circuito.", dificultad: "media", opciones: ["Verificar el aislamiento adecuado y la protección diferencial", "Ninguna precaución adicional distinta del uso habitual de la herramienta", "Emplear siempre la máxima tensión disponible en la instalación", "Desconectar por completo la protección diferencial del circuito"], correcta: 0 },
]);

const S2 = "uniones-mecanicas-tipos-caracteristicas-uso";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es una unión atornillada, uno de los tipos de unión mecánica más habituales en el mantenimiento de una planta?", reverso: "Una unión desmontable que emplea un tornillo (o un conjunto de tornillo y tuerca) para mantener unidas dos o más piezas, permitiendo su desmontaje y montaje repetido sin dañar los elementos unidos" },
  { anverso: "¿Qué es una unión embridada, empleada habitualmente en tuberías y equipos de una planta de tratamiento de agua?", reverso: "Una unión desmontable entre dos elementos (tuberías, válvulas, bombas) mediante bridas atornilladas en sus extremos, con una junta de estanqueidad intermedia que garantiza el sellado frente a fugas" },
  { anverso: "¿Qué es una unión soldada, y qué característica principal la distingue de una unión atornillada o embridada?", reverso: "Una unión permanente obtenida mediante la fusión del material de las piezas (con o sin material de aportación), a diferencia de las uniones atornilladas o embridadas, que son desmontables sin dañar las piezas unidas" },
  { anverso: "¿Qué es una chaveta, como elemento de unión mecánica empleado en ejes rotativos?", reverso: "Una pieza prismática que se aloja en un chavetero (ranura) practicado tanto en el eje como en la pieza que va montada sobre él, permitiendo transmitir el par de giro entre ambos e impidiendo su rotación relativa" },
  { anverso: "¿Qué criterio general debe guiar la elección entre una unión desmontable (atornillada, embridada) y una unión permanente (soldada) al reparar o montar un equipo de la planta?", reverso: "Si se prevé la necesidad de desmontar la unión en el futuro (para mantenimiento, sustitución de piezas o inspección periódica), conviene optar por una unión desmontable; si la unión no requerirá desmontarse y se busca la máxima resistencia y estanqueidad, puede optarse por una unión soldada" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es una unión atornillada?", explicacion: "Una unión desmontable mediante tornillo (o tornillo y tuerca).", dificultad: "facil", opciones: ["Una unión desmontable mediante tornillo o tornillo y tuerca", "Una unión permanente mediante fusión del material", "Una unión exclusiva para conducciones de agua de la red", "Una unión exclusiva para ejes rotativos de bombas y motores"], correcta: 0 },
  { enunciado: "¿Qué es una unión embridada?", explicacion: "Una unión desmontable mediante bridas atornilladas, con junta de estanqueidad.", dificultad: "media", opciones: ["Una unión desmontable mediante bridas atornilladas", "Una unión permanente mediante fusión del material de las piezas", "Una unión exclusiva para ejes rotativos de bombas y motores", "Una unión que nunca requiere ninguna junta de estanqueidad"], correcta: 0 },
  { enunciado: "¿Qué distingue a una unión soldada de una unión atornillada o embridada?", explicacion: "Es permanente, mediante fusión del material, frente a las desmontables.", dificultad: "media", opciones: ["Es permanente, mediante fusión del material de las piezas", "Es siempre desmontable, igual que una unión atornillada", "Nunca puede emplearse en tuberías de la red de agua", "Nunca requiere ningún tipo de material de aportación"], correcta: 0 },
  { enunciado: "¿Qué es una chaveta, como elemento de unión en ejes rotativos?", explicacion: "Una pieza prismática que transmite el par de giro entre el eje y la pieza montada.", dificultad: "dificil", opciones: ["Una pieza prismática que transmite el par de giro entre eje y pieza", "Una junta de estanqueidad exclusiva de las uniones embridadas", "Un tipo de rodamiento exclusivo de las bombas centrífugas", "Un tipo de soldadura exclusiva de las conducciones de la red"], correcta: 0 },
  { enunciado: "¿Qué criterio guía la elección entre una unión desmontable y una permanente al montar un equipo?", explicacion: "La previsión de necesitar desmontarla en el futuro para mantenimiento o sustitución.", dificultad: "media", opciones: ["La previsión de necesitar desmontarla en el futuro", "El color exterior de las piezas que se van a unir", "La fecha de fabricación de las piezas que se van a unir", "Ningún criterio técnico real distinto del coste de los materiales"], correcta: 0 },
]);

const S3 = "rodamientos-vibraciones-maquinas-rotativas";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un rodamiento, como elemento mecánico presente en bombas, motores y otros equipos rotativos de la planta?", reverso: "Un elemento mecánico que permite el giro relativo entre dos piezas (habitualmente un eje y su soporte) reduciendo el rozamiento, mediante elementos rodantes (bolas o rodillos) interpuestos entre dos pistas o anillos" },
  { anverso: "¿Qué diferencia general existe entre un rodamiento de bolas y uno de rodillos?", reverso: "El rodamiento de bolas emplea esferas como elemento rodante y es más adecuado para velocidades altas con cargas moderadas; el rodamiento de rodillos emplea cilindros (u otras formas alargadas) y soporta mejor cargas más elevadas, aunque habitualmente a menor velocidad" },
  { anverso: "¿Qué es la lubricación de un rodamiento, y por qué es esencial para su funcionamiento?", reverso: "La aplicación de un lubricante (grasa o aceite) entre los elementos rodantes y las pistas del rodamiento, que reduce el rozamiento, evacúa el calor generado y protege frente a la corrosión; su ausencia o degradación es una de las causas más habituales de fallo prematuro" },
  { anverso: "¿Qué son las vibraciones mecánicas en una máquina rotativa, y qué relevancia tienen para su mantenimiento?", reverso: "Oscilaciones periódicas del equipo en funcionamiento, cuya magnitud y frecuencia pueden analizarse para detectar de forma temprana anomalías como desequilibrios, desalineaciones, rodamientos dañados u holguras mecánicas, antes de que deriven en una avería mayor" },
  { anverso: "¿Por qué es útil el análisis periódico de vibraciones como técnica de mantenimiento predictivo en bombas y motores de la planta?", reverso: "Porque permite anticipar el momento adecuado para intervenir sobre un equipo (por ejemplo, sustituir un rodamiento) antes de que se produzca una avería grave, optimizando el mantenimiento frente a esperar a que el fallo ya se haya manifestado" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es un rodamiento?", explicacion: "Un elemento que permite el giro relativo entre dos piezas reduciendo el rozamiento.", dificultad: "facil", opciones: ["Un elemento que permite el giro reduciendo el rozamiento", "Un elemento exclusivo de unión soldada entre dos piezas", "Un instrumento que mide exclusivamente la presión de una bomba", "Un instrumento que mide exclusivamente el caudal de una bomba"], correcta: 0 },
  { enunciado: "¿Qué diferencia general existe entre un rodamiento de bolas y uno de rodillos?", explicacion: "El de bolas es apto para velocidades altas con cargas moderadas; el de rodillos, para cargas mayores.", dificultad: "media", opciones: ["El de bolas es apto para alta velocidad; el de rodillos, para cargas mayores", "Ambos tipos son exactamente equivalentes en cualquier aplicación", "El de rodillos es siempre más rápido que el rodamiento de bolas", "El rodamiento de bolas nunca puede emplearse en motores eléctricos"], correcta: 0 },
  { enunciado: "¿Por qué es esencial la lubricación de un rodamiento?", explicacion: "Reduce el rozamiento, evacúa el calor y protege frente a la corrosión.", dificultad: "media", opciones: ["Reduce el rozamiento, evacúa el calor y protege de la corrosión", "No aporta ninguna función real distinta de la puramente estética", "Aumenta de forma directa la velocidad máxima de giro del eje", "Sustituye por completo la necesidad de cualquier otro mantenimiento"], correcta: 0 },
  { enunciado: "¿Qué relevancia tienen las vibraciones mecánicas en una máquina rotativa para su mantenimiento?", explicacion: "Su análisis permite detectar de forma temprana anomalías como desequilibrios o rodamientos dañados.", dificultad: "media", opciones: ["Permiten detectar de forma temprana anomalías del equipo", "No tienen ninguna relación real con el estado del equipo", "Solo son relevantes en máquinas de muy gran tamaño", "Las vibraciones siempre indican un fallo grave inminente"], correcta: 0 },
  { enunciado: "¿Por qué es útil el análisis periódico de vibraciones como mantenimiento predictivo?", explicacion: "Permite anticipar el momento adecuado para intervenir antes de una avería grave.", dificultad: "dificil", opciones: ["Permite anticipar el momento adecuado para intervenir a tiempo", "Sustituye por completo la necesidad de lubricar los rodamientos", "Solo es aplicable en bombas, nunca en motores eléctricos", "No aporta ninguna ventaja real frente al mantenimiento correctivo"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 15 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 15, orden: 15, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-211 creado y vinculado como Tema 15 de Oficial Planta Potabilizadora.");
