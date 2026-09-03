/**
 * Crea tema-210: "Bombas y depósitos" — Tema 14 (numero=14, bloque-2)
 * de Oficial Planta Potabilizadora (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 12 oficial del Anexo I (bases2110.pdf, línea
 * 1183): "Bombas: tipos de bombas para elevación de aguas,
 * características, funcionamiento y mantenimiento. Disposición y
 * esquema general de bombas, válvulas e instalaciones auxiliares
 * necesarias en una estación de bombeo. Control y automatismo en las
 * estaciones de bombeo. Los depósitos: Esquema general de un depósito
 * con sus elementos auxiliares principales. Impermeabilización de
 * depósitos."
 *
 * Conocimiento técnico consolidado de ingeniería hidráulica e
 * instalaciones de bombeo y almacenamiento de agua, sin una ley
 * española que lo regule a este nivel operativo — mismo criterio ya
 * aplicado a otros contenidos técnicos de proceso industrial de este
 * proyecto. Búsqueda previa realizada conforme al estándar de sourcing:
 * no existe una norma española específica sobre tipos de bombas o
 * diseño de estaciones de bombeo de agua potable; sí se reutiliza el
 * dato ya verificado en el proyecto (Oficial Guardallaves) sobre la
 * capacidad del depósito de Casablanca (~148.000 m³) como referencia
 * real de la magnitud de los depósitos de la red de Zaragoza.
 *
 * Tres secciones:
 * 1. tipos-bombas-elevacion-caracteristicas-mantenimiento
 * 2. estacion-bombeo-disposicion-control-automatismo
 * 3. depositos-esquema-elementos-impermeabilizacion
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-210-bombas-depositos.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-210";
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
  titulo: "Bombas y depósitos",
  descripcion: "Tipos de bombas para elevación de aguas, características y mantenimiento. Disposición y control de una estación de bombeo. Esquema general de un depósito, sus elementos auxiliares e impermeabilización.",
  contenido: "Desarrolla los dos elementos estructurales fundamentales de una planta de tratamiento y su red asociada: las bombas para la elevación de agua (tipos, características, funcionamiento y mantenimiento), la disposición y el esquema general de una estación de bombeo con sus válvulas e instalaciones auxiliares, y su control y automatismo; y los depósitos de almacenamiento (esquema general con sus elementos auxiliares principales, y su impermeabilización).",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "Tipos de bombas de elevación, características y mantenimiento", seccion: "tipos-bombas-elevacion-caracteristicas-mantenimiento", articulos: "Conocimiento técnico de instalaciones de bombeo" },
    { url: "", titulo: "Estación de bombeo: disposición, control y automatismo", seccion: "estacion-bombeo-disposicion-control-automatismo", articulos: "Conocimiento técnico de instalaciones de bombeo" },
    { url: "https://www.zaragoza.es/sede/portal/infraestructuras/agua/red", titulo: "Depósitos: esquema, elementos auxiliares e impermeabilización", seccion: "depositos-esquema-elementos-impermeabilizacion", articulos: "Ayuntamiento de Zaragoza — Red de abastecimiento de agua; conocimiento técnico" },
  ],
}]);

const S1 = "tipos-bombas-elevacion-caracteristicas-mantenimiento";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es una bomba centrífuga, uno de los tipos de bomba más habituales para la elevación de agua en una planta potabilizadora?", reverso: "Una bomba que transmite energía al agua mediante la fuerza centrífuga generada por un rodete (impulsor) que gira a alta velocidad, elevando la presión y desplazando el fluido hacia la salida" },
  { anverso: "¿Qué es una bomba sumergible, y en qué situaciones se emplea habitualmente en una planta de tratamiento de agua?", reverso: "Una bomba diseñada para operar completamente sumergida en el propio líquido que impulsa, empleada habitualmente en pozos, arquetas de fangos o cámaras de bombeo con acceso limitado, evitando la necesidad de un cebado externo" },
  { anverso: "¿Qué característica técnica fundamental define la capacidad de trabajo de una bomba, junto con su caudal?", reverso: "La altura manométrica (o altura de elevación) que es capaz de proporcionar, es decir, la energía que aporta al fluido expresada como altura de columna de agua equivalente, necesaria para vencer el desnivel geométrico y las pérdidas de carga del sistema" },
  { anverso: "¿Qué es la curva característica de una bomba?", reverso: "La representación gráfica de la relación entre el caudal que impulsa la bomba y la altura manométrica que es capaz de proporcionar para cada valor de ese caudal, información esencial para seleccionar la bomba adecuada a las necesidades de una instalación" },
  { anverso: "¿Qué operaciones básicas de mantenimiento requiere periódicamente una bomba de elevación de agua?", reverso: "Revisión del estado de los rodamientos y de las juntas de estanqueidad (cierre mecánico), comprobación de vibraciones anómalas, control del consumo eléctrico del motor asociado, y verificación de que no existe cavitación ni pérdida de rendimiento respecto a su curva característica original" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es una bomba centrífuga?", explicacion: "Una bomba que transmite energía al agua mediante la fuerza centrífuga de un rodete giratorio.", dificultad: "facil", opciones: ["Una bomba que transmite energía mediante un rodete giratorio", "Una bomba que funciona exclusivamente sumergida en el fluido", "Un instrumento que mide exclusivamente la presión de la red", "Un instrumento que mide exclusivamente el caudal de la red"], correcta: 0 },
  { enunciado: "¿Qué es una bomba sumergible y cuándo se emplea habitualmente?", explicacion: "Opera sumergida en el líquido, útil en pozos o cámaras de bombeo de acceso limitado.", dificultad: "media", opciones: ["Opera sumergida en el líquido, útil en pozos o cámaras de acceso limitado", "Opera siempre fuera del líquido, sin ningún contacto directo con él", "Se emplea exclusivamente para medir la presión de la red", "Se emplea exclusivamente para purgar el aire de la conducción"], correcta: 0 },
  { enunciado: "¿Qué característica técnica define, junto con el caudal, la capacidad de trabajo de una bomba?", explicacion: "La altura manométrica o de elevación.", dificultad: "media", opciones: ["La altura manométrica o de elevación", "El color exterior de la carcasa de la bomba", "La fecha de fabricación de la bomba instalada", "El nombre comercial del fabricante de la bomba"], correcta: 0 },
  { enunciado: "¿Qué es la curva característica de una bomba?", explicacion: "La relación gráfica entre el caudal impulsado y la altura manométrica proporcionada.", dificultad: "dificil", opciones: ["La relación entre el caudal impulsado y la altura manométrica", "El esquema eléctrico exclusivo del motor de la bomba", "El plano de la obra civil de la estación de bombeo", "El calendario de mantenimiento preventivo de la bomba"], correcta: 0 },
  { enunciado: "¿Qué operación básica de mantenimiento requiere periódicamente una bomba de elevación?", explicacion: "Revisión de rodamientos, juntas de estanqueidad y detección de vibraciones anómalas.", dificultad: "media", opciones: ["Revisión de rodamientos, juntas y detección de vibraciones", "Ninguna operación de mantenimiento, al ser equipos de vida indefinida", "Sustitución completa anual, con independencia de su estado real", "Pintado exterior periódico, sin ninguna comprobación funcional"], correcta: 0 },
]);

const S2 = "estacion-bombeo-disposicion-control-automatismo";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué elementos básicos integra, además de las propias bombas, una estación de bombeo de agua potable?", reverso: "Válvulas de aislamiento en la aspiración y en la impulsión de cada bomba, válvulas antirretorno que evitan el reflujo hacia la bomba parada, instrumentación de medida (presión, caudal), y elementos de protección frente al golpe de ariete en tramos de impulsión largos" },
  { anverso: "¿Por qué suelen instalarse varias bombas en paralelo en una misma estación de bombeo, en lugar de una única bomba de mayor capacidad?", reverso: "Permite adaptar el caudal impulsado a la demanda real activando solo el número de bombas necesario, disponer de una bomba de reserva ante una avería o labores de mantenimiento, y repartir el desgaste alternando su uso" },
  { anverso: "¿Qué es una bomba de reserva (o de respaldo) en una estación de bombeo?", reverso: "Una bomba adicional a las necesarias para el funcionamiento normal, que permanece disponible para entrar en servicio automáticamente si una de las bombas habituales falla o requiere mantenimiento, garantizando la continuidad del servicio" },
  { anverso: "¿Qué papel cumple el control y el automatismo en una estación de bombeo moderna?", reverso: "Arrancar y parar las bombas de forma automática según la demanda (por ejemplo, en función del nivel de un depósito o de la presión de la red), alternar su uso para repartir el desgaste, y generar alarmas ante cualquier funcionamiento anómalo detectado" },
  { anverso: "¿Qué elemento de protección se instala habitualmente en la impulsión de una estación de bombeo para prevenir el golpe de ariete ante una parada brusca de las bombas?", reverso: "Un calderín antiariete (o depósito hidroneumático), que absorbe la sobrepresión generada por el cambio brusco de velocidad del agua al detenerse el bombeo" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué elementos, además de las bombas, integra una estación de bombeo?", explicacion: "Válvulas de aislamiento y antirretorno, instrumentación de medida y protección antiariete.", dificultad: "media", opciones: ["Válvulas de aislamiento, antirretorno, instrumentación y protección", "Únicamente las propias bombas, sin ningún elemento adicional", "Únicamente un depósito de almacenamiento de agua tratada", "Únicamente un sistema de dosificación de hipoclorito"], correcta: 0 },
  { enunciado: "¿Por qué suelen instalarse varias bombas en paralelo en una misma estación de bombeo?", explicacion: "Permite adaptar el caudal a la demanda y disponer de reserva ante averías.", dificultad: "media", opciones: ["Permite adaptar el caudal a la demanda y disponer de reserva", "Siempre resulta más económico que instalar una única bomba grande", "Elimina por completo la necesidad de mantenimiento de las bombas", "Reduce de forma automática el consumo eléctrico total de la estación"], correcta: 0 },
  { enunciado: "¿Qué es una bomba de reserva en una estación de bombeo?", explicacion: "Una bomba adicional que entra en servicio automáticamente si falla otra o requiere mantenimiento.", dificultad: "media", opciones: ["Una bomba adicional disponible ante avería o mantenimiento", "La bomba de mayor antigüedad de toda la estación de bombeo", "La bomba de menor caudal disponible en toda la estación", "Un elemento exclusivo de medición de presión, no de bombeo"], correcta: 0 },
  { enunciado: "¿Qué papel cumple el control y el automatismo en una estación de bombeo moderna?", explicacion: "Arranca y para las bombas automáticamente según la demanda, y genera alarmas.", dificultad: "media", opciones: ["Arranca y para las bombas según la demanda, y genera alarmas", "Sustituye por completo la necesidad de mantenimiento de las bombas", "Elimina por completo el riesgo de golpe de ariete sin más elementos", "Solo es aplicable en estaciones de bombeo de muy gran tamaño"], correcta: 0 },
  { enunciado: "¿Qué elemento previene el golpe de ariete en la impulsión de una estación de bombeo?", explicacion: "Un calderín antiariete o depósito hidroneumático.", dificultad: "dificil", opciones: ["Un calderín antiariete o depósito hidroneumático", "Una válvula reductora de presión exclusivamente", "Un contador electromagnético exclusivamente", "Una arqueta de registro exclusivamente"], correcta: 0 },
]);

const S3 = "depositos-esquema-elementos-impermeabilizacion";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué elementos auxiliares principales integra el esquema general de un depósito de almacenamiento de agua?", reverso: "Tubería de entrada (con su válvula de regulación), tubería de salida, aliviadero o rebosadero de seguridad, desagüe de fondo para su vaciado y limpieza, sistema de ventilación, y sonda o sistema de medición del nivel de agua almacenada" },
  { anverso: "¿Qué función cumple el aliviadero (o rebosadero) de un depósito de almacenamiento de agua?", reverso: "Evacuar de forma segura el excedente de agua si el nivel del depósito supera su capacidad máxima prevista, evitando desbordamientos incontrolados y posibles daños estructurales" },
  { anverso: "¿Qué función cumple el desagüe de fondo de un depósito?", reverso: "Permitir el vaciado completo del depósito, necesario para operaciones de limpieza interior, inspección o reparación de su obra civil" },
  { anverso: "¿Por qué es necesaria la impermeabilización de un depósito de almacenamiento de agua potable?", reverso: "Para evitar fugas de agua tratada hacia el exterior (con la consiguiente pérdida de volumen y de recursos), y para impedir la entrada de agua o humedad procedente del terreno que pudiera contaminar el agua almacenada" },
  { anverso: "¿Qué materiales o sistemas se emplean habitualmente para la impermeabilización interior de un depósito de hormigón?", reverso: "Revestimientos específicos (morteros impermeabilizantes, resinas epoxi o láminas sintéticas) aplicados sobre la superficie interior del hormigón, compatibles con el contacto continuado con agua destinada al consumo humano" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué elementos auxiliares integra el esquema general de un depósito de almacenamiento?", explicacion: "Entrada, salida, aliviadero, desagüe de fondo, ventilación y medición de nivel.", dificultad: "media", opciones: ["Entrada, salida, aliviadero, desagüe de fondo y medición de nivel", "Únicamente una tubería de entrada, sin ningún otro elemento", "Únicamente un sistema de dosificación de hipoclorito", "Únicamente un sistema de filtración por carbón activo"], correcta: 0 },
  { enunciado: "¿Qué función cumple el aliviadero de un depósito de almacenamiento?", explicacion: "Evacúa el excedente de agua si el nivel supera la capacidad máxima, evitando desbordamientos.", dificultad: "media", opciones: ["Evacúa el excedente de agua evitando desbordamientos incontrolados", "Vacía por completo el depósito para su limpieza interior", "Mide el nivel exacto de agua almacenada en el depósito", "Dosifica el hipoclorito necesario para la desinfección final"], correcta: 0 },
  { enunciado: "¿Qué función cumple el desagüe de fondo de un depósito?", explicacion: "Permite su vaciado completo para limpieza, inspección o reparación.", dificultad: "media", opciones: ["Permite el vaciado completo para limpieza o reparación", "Evacúa exclusivamente el excedente de agua por sobrenivel", "Mide exclusivamente el nivel de agua almacenada en el depósito", "Dosifica exclusivamente el hipoclorito de la desinfección final"], correcta: 0 },
  { enunciado: "¿Por qué es necesaria la impermeabilización de un depósito de agua potable?", explicacion: "Evita fugas de agua tratada y la entrada de agua o humedad del terreno.", dificultad: "facil", opciones: ["Evita fugas de agua tratada y la entrada de agua del terreno", "Mejora exclusivamente el aspecto estético exterior del depósito", "Reduce exclusivamente el peso total de la estructura del depósito", "No aporta ninguna función real distinta de la puramente estética"], correcta: 0 },
  { enunciado: "¿Qué sistemas se emplean habitualmente para la impermeabilización interior de un depósito de hormigón?", explicacion: "Morteros impermeabilizantes, resinas epoxi o láminas sintéticas compatibles con agua de consumo.", dificultad: "dificil", opciones: ["Morteros impermeabilizantes, resinas epoxi o láminas sintéticas", "Pintura decorativa convencional sin ninguna función impermeabilizante", "Ningún revestimiento adicional distinto del propio hormigón armado", "Exclusivamente una capa de arena sobre la superficie interior"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 14 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 14, orden: 14, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-210 creado y vinculado como Tema 14 de Oficial Planta Potabilizadora.");
