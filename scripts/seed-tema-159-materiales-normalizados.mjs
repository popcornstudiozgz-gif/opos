/**
 * Crea tema-159: "Materiales normalizados" — Tema 11 (numero=11,
 * bloque-2) de Oficial Herrero (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 9 oficial del Anexo I (bases2110.pdf, línea 1257):
 *   "Materiales normalizados: clasificación y codificación de materiales
 *   metálicos (férricos y no férricos), poliméricos, compuestos y
 *   cerámicos. Formas comerciales de los materiales mecanizables,
 *   características. Perfilería metálica."
 *
 * Conocimiento técnico consolidado de materiales industriales, sin una
 * ley española que lo regule como tal — mismo criterio que temas
 * anteriores de esta oposición. Búsqueda previa realizada conforme al
 * estándar de sourcing del proyecto.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-159-materiales-normalizados.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-159";
const OPOSICION = "oficial-herrero-ayto-zaragoza";
const BLOQUE_2_ID = "b0312afa-8a49-41a8-a672-99793edcc74e";

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
  titulo: "Materiales normalizados",
  descripcion: "Clasificación y codificación de materiales metálicos (férricos y no férricos), poliméricos, compuestos y cerámicos. Formas comerciales de los materiales mecanizables. Perfilería metálica.",
  contenido: "Desarrolla la clasificación y codificación de los materiales normalizados empleados en el taller de herrería: materiales metálicos férricos y no férricos, materiales poliméricos, compuestos y cerámicos; las formas comerciales habituales en las que se suministran los materiales mecanizables (barras, chapas, tubos, perfiles); y la perfilería metálica normalizada más utilizada en cerrajería y carpintería metálica.",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "Clasificación de materiales metálicos, poliméricos, compuestos y cerámicos", seccion: "clasificacion-materiales-metalicos-no-metalicos", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Formas comerciales de los materiales mecanizables", seccion: "formas-comerciales-materiales-mecanizables", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Perfilería metálica", seccion: "perfileria-metalica", articulos: "Conceptos fundamentales" },
  ],
}]);

const S1 = "clasificacion-materiales-metalicos-no-metalicos";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué son los materiales metálicos férricos?", reverso: "Aquellos cuyo componente principal es el hierro, como el acero al carbono, el acero inoxidable y el hierro fundido" },
  { anverso: "¿Qué son los materiales metálicos no férricos?", reverso: "Aquellos que no contienen hierro como componente principal, como el aluminio, el cobre, el latón, el bronce, el zinc y sus aleaciones" },
  { anverso: "¿Qué son los materiales poliméricos, en el contexto de los materiales empleados en un taller?", reverso: "Materiales orgánicos formados por moléculas de gran tamaño (polímeros), como los plásticos, empleados habitualmente como complemento del metal en elementos como juntas, tiradores o protecciones" },
  { anverso: "¿Qué son los materiales compuestos?", reverso: "Materiales formados por la combinación de dos o más materiales de naturaleza distinta (por ejemplo, fibra de vidrio con resina), que buscan combinar las mejores propiedades de cada componente" },
  { anverso: "¿Qué son los materiales cerámicos?", reverso: "Materiales inorgánicos no metálicos, obtenidos habitualmente mediante procesos de cocción a alta temperatura, caracterizados por su elevada dureza y resistencia a altas temperaturas, pero con escasa tenacidad" },
  { anverso: "¿Qué es la codificación de un material metálico normalizado?", reverso: "Un sistema alfanumérico establecido por las normas técnicas del sector, que identifica de forma unívoca la composición y las características de un material, facilitando su identificación y pedido a los fabricantes" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué son los materiales metálicos férricos?", explicacion: "Aquellos cuyo componente principal es el hierro.", dificultad: "facil", opciones: ["Aquellos cuyo componente principal es el hierro", "Aquellos que no contienen hierro como componente principal", "Aquellos formados exclusivamente por materiales orgánicos", "Aquellos obtenidos mediante procesos de cocción a alta temperatura"], correcta: 0 },
  { enunciado: "¿Qué son los materiales metálicos no férricos?", explicacion: "Aquellos que no contienen hierro como componente principal, como aluminio o cobre.", dificultad: "media", opciones: ["Aquellos que no contienen hierro como componente principal", "Aquellos cuyo único componente posible es el hierro", "Aquellos formados exclusivamente por materiales poliméricos", "Aquellos que solo existen en forma de perfilería normalizada"], correcta: 0 },
  { enunciado: "¿Qué son los materiales compuestos?", explicacion: "Combinan dos o más materiales de naturaleza distinta.", dificultad: "media", opciones: ["Combinan dos o más materiales de naturaleza distinta", "Están formados exclusivamente por un único metal puro", "Son exclusivamente de origen cerámico sin ningún otro componente", "Son exclusivamente de origen polimérico sin ningún otro componente"], correcta: 0 },
  { enunciado: "¿Qué caracteriza a los materiales cerámicos frente a los metálicos?", explicacion: "Elevada dureza y resistencia térmica, pero escasa tenacidad.", dificultad: "media", opciones: ["Elevada dureza y resistencia térmica, pero escasa tenacidad", "Elevada tenacidad y escasa dureza en cualquier circunstancia", "Composición idéntica a la de los materiales metálicos férricos", "Ausencia total de cualquier proceso de fabricación por cocción"], correcta: 0 },
  { enunciado: "¿Qué es la codificación de un material metálico normalizado?", explicacion: "Un sistema alfanumérico que identifica de forma unívoca su composición y características.", dificultad: "dificil", opciones: ["Un sistema alfanumérico que identifica su composición y características", "Un sistema exclusivo de coloración según el fabricante del material", "Un sistema exclusivo de medición del peso del material suministrado", "Un sistema que solo se aplica a materiales cerámicos, nunca a metálicos"], correcta: 0 },
]);

const S2 = "formas-comerciales-materiales-mecanizables";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es una barra, como forma comercial de un material mecanizable?", reverso: "Una pieza de material de sección constante (redonda, cuadrada, hexagonal, entre otras) y longitud considerable respecto a su sección, suministrada en tramos comerciales normalizados" },
  { anverso: "¿Qué es una chapa, como forma comercial de un material mecanizable?", reverso: "Una lámina de material de espesor reducido y uniforme, en relación con sus dimensiones de largo y ancho, suministrada en planchas de tamaño normalizado" },
  { anverso: "¿Qué es un tubo, como forma comercial de un material mecanizable?", reverso: "Una pieza hueca de sección constante (redonda, cuadrada, rectangular) a lo largo de toda su longitud, empleada tanto por su ligereza relativa como por aplicaciones que requieren una cavidad interior" },
  { anverso: "¿Qué criterios debe valorar el herrero al elegir entre distintas formas comerciales de un mismo material para una pieza concreta?", reverso: "La geometría final requerida por la pieza, el esfuerzo mecánico que debe soportar, el peso admisible, el coste del material y el proceso de mecanizado o conformado previsto" },
  { anverso: "¿Qué ventaja aporta emplear una forma comercial normalizada (barra, chapa, tubo) frente a partir de un bloque de material en bruto?", reverso: "Reduce el tiempo y el desperdicio de material en el mecanizado, al partir ya de una geometría próxima a la necesaria para la pieza final" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es una barra, como forma comercial de un material mecanizable?", explicacion: "Una pieza de sección constante y longitud considerable respecto a su sección.", dificultad: "facil", opciones: ["Una pieza de sección constante y longitud considerable", "Una lámina de espesor reducido y uniforme", "Una pieza hueca de sección constante", "Un material exclusivamente en forma de polvo"], correcta: 0 },
  { enunciado: "¿Qué es una chapa, como forma comercial de un material mecanizable?", explicacion: "Una lámina de espesor reducido y uniforme respecto a sus otras dimensiones.", dificultad: "media", opciones: ["Una lámina de espesor reducido y uniforme", "Una pieza de sección constante y gran longitud", "Una pieza hueca de sección constante", "Un material exclusivamente en forma granulada"], correcta: 0 },
  { enunciado: "¿Qué es un tubo, como forma comercial de un material mecanizable?", explicacion: "Una pieza hueca de sección constante a lo largo de toda su longitud.", dificultad: "media", opciones: ["Una pieza hueca de sección constante", "Una lámina de espesor reducido y uniforme", "Una pieza maciza de sección variable", "Un material exclusivamente en forma de polvo"], correcta: 0 },
  { enunciado: "¿Qué criterios debe valorar el herrero al elegir la forma comercial de un material para una pieza concreta?", explicacion: "Geometría requerida, esfuerzo a soportar, peso, coste y proceso de mecanizado previsto.", dificultad: "media", opciones: ["Geometría, esfuerzo, peso, coste y proceso de mecanizado", "Únicamente el color superficial del material disponible", "Únicamente la marca comercial del material disponible", "Únicamente la fecha de fabricación del material disponible"], correcta: 0 },
  { enunciado: "¿Qué ventaja aporta partir de una forma comercial normalizada frente a un bloque de material en bruto?", explicacion: "Reduce el tiempo y el desperdicio de material en el mecanizado.", dificultad: "dificil", opciones: ["Reduce el tiempo y el desperdicio de material en el mecanizado", "Aumenta siempre el desperdicio de material generado", "Elimina por completo la necesidad de cualquier mecanizado posterior", "No aporta ninguna ventaja real frente a un bloque en bruto"], correcta: 0 },
]);

const S3 = "perfileria-metalica";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es la perfilería metálica?", reverso: "El conjunto de piezas de sección constante y forma normalizada (en L, en U, en T, tubular cuadrada o rectangular, entre otras) empleadas habitualmente en cerrajería y carpintería metálica para estructuras, cerramientos y elementos de refuerzo" },
  { anverso: "¿Qué es un perfil angular (en L)?", reverso: "Un perfil metálico cuya sección tiene forma de ángulo recto, empleado habitualmente para refuerzos de esquina, marcos y estructuras ligeras" },
  { anverso: "¿Qué es un perfil en U?", reverso: "Un perfil metálico cuya sección tiene forma de U, empleado habitualmente como guía, canal o elemento estructural que requiere alojar otras piezas en su interior" },
  { anverso: "¿Qué es un perfil tubular (cuadrado o rectangular)?", reverso: "Un perfil metálico hueco de sección cuadrada o rectangular, muy empleado en estructuras de cerrajería (barandas, puertas, verjas) por su buena relación entre resistencia y peso" },
  { anverso: "¿Qué debe tener en cuenta el herrero al seleccionar el tipo de perfil para una estructura de cerrajería (por ejemplo, una baranda)?", reverso: "El tipo de esfuerzo que debe soportar la estructura (flexión, torsión, compresión), la estética requerida y la facilidad de unión (soldadura, atornillado) entre los distintos perfiles empleados" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es la perfilería metálica?", explicacion: "Piezas de sección constante y forma normalizada empleadas en cerrajería y carpintería metálica.", dificultad: "facil", opciones: ["Piezas de sección constante y forma normalizada", "Exclusivamente láminas de espesor reducido", "Exclusivamente materiales en forma de polvo", "Exclusivamente piezas macizas sin ninguna sección definida"], correcta: 0 },
  { enunciado: "¿Qué es un perfil angular (en L)?", explicacion: "Un perfil cuya sección tiene forma de ángulo recto.", dificultad: "media", opciones: ["Un perfil cuya sección tiene forma de ángulo recto", "Un perfil cuya sección tiene forma de U", "Un perfil hueco de sección cuadrada", "Un perfil exclusivo para tuberías de agua"], correcta: 0 },
  { enunciado: "¿Qué es un perfil en U?", explicacion: "Un perfil cuya sección tiene forma de U, empleado como guía o canal.", dificultad: "media", opciones: ["Un perfil cuya sección tiene forma de U", "Un perfil cuya sección tiene forma de ángulo recto", "Un perfil macizo de sección circular", "Un perfil exclusivo para instalaciones eléctricas"], correcta: 0 },
  { enunciado: "¿Por qué es tan empleado el perfil tubular cuadrado o rectangular en estructuras de cerrajería?", explicacion: "Por su buena relación entre resistencia y peso.", dificultad: "media", opciones: ["Por su buena relación entre resistencia y peso", "Por ser el único perfil normalizado existente", "Porque nunca requiere ningún proceso de soldadura", "Porque es siempre el perfil de menor coste disponible"], correcta: 0 },
  { enunciado: "¿Qué debe tener en cuenta el herrero al seleccionar el tipo de perfil para una estructura como una baranda?", explicacion: "El tipo de esfuerzo a soportar, la estética requerida y la facilidad de unión entre perfiles.", dificultad: "dificil", opciones: ["El esfuerzo a soportar, la estética y la facilidad de unión", "Únicamente el color final deseado para la estructura", "Únicamente el fabricante del perfil disponible en el almacén", "Únicamente el peso total sin ninguna otra consideración técnica"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 11 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 11, orden: 11, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-159 creado y vinculado como Tema 11 de Oficial Herrero.");
