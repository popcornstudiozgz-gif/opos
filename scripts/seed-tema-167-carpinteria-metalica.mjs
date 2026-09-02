/**
 * Crea tema-167: "Carpintería metálica" — Tema 19 (numero=19, bloque-2)
 * de Oficial Herrero (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 17 oficial del Anexo I (bases2110.pdf, línea 1280):
 *   "Carpintería metálica: Los materiales, Carpintería metálica
 *   prefabricada, estructuras y cerramientos, cerramientos de vanos de
 *   paso: las puertas, cerramientos de huecos para aireación y
 *   soleamiento: las ventanas, protección solar, compartimento de
 *   espacios."
 *
 * Conocimiento técnico consolidado de carpintería metálica, sin una ley
 * española específica que lo regule como técnica de taller — mismo
 * criterio que temas anteriores de esta oposición. Búsqueda previa
 * realizada conforme al estándar de sourcing del proyecto.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-167-carpinteria-metalica.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-167";
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
  titulo: "Carpintería metálica",
  descripcion: "Los materiales de la carpintería metálica. Carpintería metálica prefabricada, estructuras y cerramientos. Cerramientos de vanos de paso: las puertas. Cerramientos de huecos para aireación y soleamiento: las ventanas. Protección solar. Compartimentación de espacios.",
  contenido: "Desarrolla la carpintería metálica: los materiales empleados y la carpintería metálica prefabricada, con sus estructuras y cerramientos; los cerramientos de vanos de paso (puertas metálicas); los cerramientos de huecos para aireación y soleamiento (ventanas metálicas) y la protección solar asociada; y los sistemas de compartimentación de espacios mediante carpintería metálica.",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "Materiales y carpintería metálica prefabricada. Estructuras y cerramientos", seccion: "materiales-carpinteria-metalica-prefabricada", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Cerramientos de vanos de paso: las puertas", seccion: "cerramientos-vanos-paso-puertas", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Cerramientos de huecos: ventanas, protección solar y compartimentación", seccion: "cerramientos-huecos-ventanas-proteccion-solar", articulos: "Conceptos fundamentales" },
  ],
}]);

const S1 = "materiales-carpinteria-metalica-prefabricada";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué materiales son habituales en la carpintería metálica de edificios?", reverso: "El acero (en perfiles laminados o conformados en frío), el aluminio (habitual en ventanas y cerramientos ligeros por su ligereza y resistencia a la corrosión) y, en menor medida, el acero inoxidable para aplicaciones de mayor exigencia estética o de durabilidad" },
  { anverso: "¿Qué ventaja general presenta el aluminio frente al acero en carpintería metálica de ventanas y cerramientos?", reverso: "Una mayor ligereza, una resistencia natural a la corrosión sin necesidad de tratamientos protectores adicionales, y una mayor facilidad de conformado en perfiles de geometría compleja mediante extrusión" },
  { anverso: "¿Qué es la carpintería metálica prefabricada?", reverso: "Elementos de carpintería metálica (puertas, ventanas, cerramientos) fabricados en taller con dimensiones y acabados normalizados o a medida, listos para su transporte e instalación final en obra, reduciendo el tiempo de montaje respecto a una fabricación completa in situ" },
  { anverso: "¿Qué diferencia una estructura metálica de un cerramiento, en el contexto de la carpintería metálica de un edificio?", reverso: "La estructura es el conjunto de elementos metálicos que soportan las cargas y dan rigidez al conjunto (pilares, vigas, montantes); el cerramiento es el elemento que cierra o delimita un hueco o vano, sin necesariamente cumplir una función estructural principal" },
  { anverso: "¿Qué debe tener en cuenta el herrero al elegir el material y el tipo de perfil para una obra concreta de carpintería metálica?", reverso: "El uso previsto del elemento, las cargas o esfuerzos a soportar, la exposición a la intemperie o a ambientes agresivos, el acabado estético requerido, y la compatibilidad con el resto de materiales del edificio donde se instala" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué materiales son habituales en la carpintería metálica de edificios?", explicacion: "Acero, aluminio y, en menor medida, acero inoxidable.", dificultad: "facil", opciones: ["Acero, aluminio y acero inoxidable", "Madera y corcho exclusivamente, sin ningún metal", "Vidrio y cerámica exclusivamente, sin ningún metal", "Hormigón armado exclusivamente, sin ningún metal"], correcta: 0 },
  { enunciado: "¿Qué ventaja presenta el aluminio frente al acero en carpintería metálica?", explicacion: "Mayor ligereza y resistencia natural a la corrosión.", dificultad: "media", opciones: ["Mayor ligereza y resistencia natural a la corrosión", "Mayor dureza y resistencia mecánica que el acero en cualquier caso", "Un coste siempre inferior al del acero convencional", "Una resistencia térmica siempre superior a la del acero"], correcta: 0 },
  { enunciado: "¿Qué es la carpintería metálica prefabricada?", explicacion: "Elementos fabricados en taller, listos para su transporte e instalación en obra.", dificultad: "media", opciones: ["Elementos fabricados en taller, listos para instalar en obra", "Elementos fabricados exclusivamente in situ, sin ningún taller previo", "Elementos que nunca requieren ningún proceso de transporte", "Elementos exclusivos de madera, sin ningún componente metálico"], correcta: 0 },
  { enunciado: "¿Qué diferencia una estructura metálica de un cerramiento?", explicacion: "La estructura soporta cargas y da rigidez; el cerramiento cierra o delimita un hueco.", dificultad: "dificil", opciones: ["La estructura soporta cargas; el cerramiento delimita un hueco", "Ambos términos son exactamente equivalentes entre sí", "El cerramiento siempre soporta más carga que la estructura", "La estructura nunca puede combinarse con ningún cerramiento"], correcta: 0 },
  { enunciado: "¿Qué debe tener en cuenta el herrero al elegir material y perfil para una obra de carpintería metálica?", explicacion: "El uso previsto, las cargas, la exposición ambiental y el acabado requerido.", dificultad: "media", opciones: ["Uso previsto, cargas, exposición ambiental y acabado requerido", "Únicamente el color final deseado para el elemento fabricado", "Únicamente el precio del material disponible en el almacén", "Únicamente la marca comercial del material disponible"], correcta: 0 },
]);

const S2 = "cerramientos-vanos-paso-puertas";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un cerramiento de vano de paso, en carpintería metálica?", reverso: "El elemento (habitualmente una puerta) que cierra una abertura destinada al tránsito de personas o vehículos, permitiendo su apertura y cierre controlados" },
  { anverso: "¿Qué es una puerta abatible?", reverso: "Una puerta cuya hoja gira sobre un eje vertical (bisagras o pernios), abriéndose hacia un lado, siendo el sistema más habitual en puertas de acceso a edificios y locales" },
  { anverso: "¿Qué es una puerta corredera?", reverso: "Una puerta cuya hoja se desplaza lateralmente sobre una guía o carril, sin necesidad de espacio de barrido frente a la abertura, empleada habitualmente cuando el espacio disponible es limitado" },
  { anverso: "¿Qué es una puerta basculante?", reverso: "Una puerta, habitual en garajes y naves, cuya hoja se desplaza mediante un movimiento combinado de giro y traslación, quedando alojada en posición horizontal bajo el techo al abrirse por completo" },
  { anverso: "¿Qué elementos de herrajes son habituales en una puerta metálica de acceso, además de la propia hoja?", reverso: "Las bisagras o pernios (para el giro de la hoja), la cerradura y el mecanismo de accionamiento, el marco donde se aloja la puerta, y en su caso el sistema de cierre automático (muelle o pistón hidráulico)" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es un cerramiento de vano de paso?", explicacion: "El elemento, habitualmente una puerta, que cierra una abertura destinada al tránsito.", dificultad: "facil", opciones: ["El elemento que cierra una abertura destinada al tránsito", "Un elemento exclusivo de ventilación sin ninguna función de paso", "Un elemento exclusivo de protección solar sin ninguna función de tránsito", "Un elemento estructural que sustituye por completo a la necesidad de puertas"], correcta: 0 },
  { enunciado: "¿Qué es una puerta abatible?", explicacion: "Su hoja gira sobre un eje vertical mediante bisagras o pernios.", dificultad: "media", opciones: ["Su hoja gira sobre un eje vertical mediante bisagras", "Su hoja se desplaza lateralmente sobre una guía o carril", "Su hoja se desplaza mediante giro y traslación combinados", "Su hoja permanece siempre fija, sin ningún movimiento posible"], correcta: 0 },
  { enunciado: "¿Qué es una puerta corredera?", explicacion: "Su hoja se desplaza lateralmente sobre una guía o carril.", dificultad: "media", opciones: ["Su hoja se desplaza lateralmente sobre una guía o carril", "Su hoja gira sobre un eje vertical mediante bisagras", "Su hoja se desplaza mediante giro y traslación combinados", "Su hoja permanece siempre fija, sin ningún movimiento posible"], correcta: 0 },
  { enunciado: "¿Qué es una puerta basculante, habitual en garajes y naves?", explicacion: "Su hoja se desplaza mediante un movimiento combinado de giro y traslación.", dificultad: "media", opciones: ["Su hoja se desplaza mediante giro y traslación combinados", "Su hoja gira exclusivamente sobre un eje vertical", "Su hoja se desplaza exclusivamente sobre una guía lateral", "Su hoja permanece siempre fija, sin ningún movimiento posible"], correcta: 0 },
  { enunciado: "¿Qué elementos de herrajes son habituales en una puerta metálica de acceso?", explicacion: "Bisagras, cerradura, marco y, en su caso, sistema de cierre automático.", dificultad: "dificil", opciones: ["Bisagras, cerradura, marco y sistema de cierre automático", "Únicamente el color de la hoja de la puerta metálica", "Únicamente el peso total de la hoja de la puerta metálica", "Únicamente el fabricante de la hoja de la puerta metálica"], correcta: 0 },
]);

const S3 = "cerramientos-huecos-ventanas-proteccion-solar";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un cerramiento de hueco para aireación y soleamiento, en carpintería metálica?", reverso: "El elemento (habitualmente una ventana) que cierra una abertura destinada a permitir el paso de luz natural y, cuando se abre, de aire, en un cerramiento exterior de un edificio" },
  { anverso: "¿Qué es una ventana oscilobatiente?", reverso: "Una ventana metálica que combina dos modos de apertura mediante un único mecanismo: abatible (girando lateralmente sobre un eje vertical) y oscilante (basculando sobre un eje horizontal inferior para una ventilación más reducida y segura)" },
  { anverso: "¿Qué es la protección solar en carpintería metálica, y qué elementos son habituales?", reverso: "Los elementos destinados a reducir la incidencia directa de la radiación solar sobre un hueco o cerramiento, como las persianas metálicas, las lamas orientables (lamas de celosía) o los toldos con estructura metálica" },
  { anverso: "¿Qué es una celosía metálica, como elemento de protección solar?", reverso: "Un conjunto de lamas metálicas, fijas u orientables, dispuestas en paralelo delante de un hueco o cerramiento, que permiten regular el paso de luz y aire mientras reducen la incidencia solar directa" },
  { anverso: "¿Qué es la compartimentación de espacios mediante carpintería metálica?", reverso: "El uso de elementos de carpintería metálica (mamparas, tabiques ligeros con estructura metálica y paneles) para dividir un espacio interior en distintas áreas, sin necesidad de recurrir a una tabiquería de obra convencional" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es un cerramiento de hueco para aireación y soleamiento?", explicacion: "El elemento, habitualmente una ventana, que permite el paso de luz y aire.", dificultad: "facil", opciones: ["El elemento que permite el paso de luz y, al abrirse, de aire", "Un elemento exclusivo de tránsito de personas sin ninguna función de ventilación", "Un elemento estructural que sustituye por completo a la necesidad de ventanas", "Un elemento exclusivo de compartimentación interior sin relación con el exterior"], correcta: 0 },
  { enunciado: "¿Qué caracteriza a una ventana oscilobatiente?", explicacion: "Combina apertura abatible y oscilante mediante un único mecanismo.", dificultad: "media", opciones: ["Combina apertura abatible y oscilante en un único mecanismo", "Solo permite un único modo de apertura, sin ninguna combinación posible", "Se desplaza exclusivamente sobre una guía lateral, como una corredera", "No permite ningún tipo de apertura, siendo un elemento fijo"], correcta: 0 },
  { enunciado: "¿Qué elementos son habituales como protección solar en carpintería metálica?", explicacion: "Persianas metálicas, lamas orientables y toldos con estructura metálica.", dificultad: "media", opciones: ["Persianas metálicas, lamas orientables y toldos con estructura metálica", "Únicamente puertas correderas, sin ninguna relación con la protección solar", "Únicamente ventanas oscilobatientes, sin ningún otro elemento adicional", "Ningún elemento de carpintería metálica cumple función de protección solar"], correcta: 0 },
  { enunciado: "¿Qué es una celosía metálica?", explicacion: "Un conjunto de lamas metálicas, fijas u orientables, que regulan el paso de luz y aire.", dificultad: "media", opciones: ["Un conjunto de lamas metálicas que regulan luz y aire", "Una puerta metálica exclusiva para el tránsito de vehículos", "Un elemento estructural que sustituye por completo a una ventana", "Un tipo exclusivo de bisagra empleado en puertas abatibles"], correcta: 0 },
  { enunciado: "¿Qué es la compartimentación de espacios mediante carpintería metálica?", explicacion: "Dividir un espacio interior mediante mamparas o tabiques ligeros con estructura metálica.", dificultad: "dificil", opciones: ["Dividir un espacio interior mediante mamparas o tabiques ligeros", "Un sistema exclusivo de protección solar sin relación con la división de espacios", "Un sistema exclusivo de cerramiento exterior sin relación con espacios interiores", "Un sistema que siempre requiere tabiquería de obra convencional, sin metal"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 19 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 19, orden: 19, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-167 creado y vinculado como Tema 19 de Oficial Herrero.");
