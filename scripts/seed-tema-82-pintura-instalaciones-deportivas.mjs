/**
 * Crea tema-82: "Pintura aplicada a instalaciones deportivas" — Tema 12
 * (numero=12, bloque-2) de Oficial Polivalente Instalaciones Deportivas
 * (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 10 oficial del Anexo I (bases2110.pdf):
 *   "Pintura aplicada a instalaciones deportivas. Útiles y herramientas.
 *   Operaciones básicas."
 *
 * Conocimiento técnico consolidado del oficio de pintura, con especial
 * atención a los requisitos propios del entorno deportivo (pinturas
 * antideslizantes en suelos húmedos, resistencia al cloro en zonas de
 * piscina, marcaje de líneas de juego); no requiere cita legal artículo
 * a artículo.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-82-pintura-instalaciones-deportivas.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-82";
const OPOSICION = "oficial-instalaciones-deportivas-ayto-zaragoza";
const BLOQUE_2_ID = "cdb0920b-a2d8-4ea8-b3fc-b80168d7361a";

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
  titulo: "Pintura aplicada a instalaciones deportivas",
  descripcion: "Tipos de pintura aplicados a instalaciones deportivas. Útiles y herramientas. Operaciones básicas de pintado.",
  contenido: "Desarrolla los tipos de pintura y recubrimientos empleados en instalaciones deportivas (pinturas antideslizantes, resistentes al cloro, marcaje de líneas de juego), los útiles y herramientas del oficio, y las operaciones básicas de preparación de superficies y pintado.",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "Tipos de pintura para instalaciones deportivas", seccion: "tipos-pintura-instalaciones-deportivas", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Útiles y herramientas de pintura", seccion: "utiles-herramientas-pintura", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Operaciones básicas de pintado", seccion: "operaciones-basicas-pintado", articulos: "Conceptos fundamentales" },
  ],
}]);

const S1 = "tipos-pintura-instalaciones-deportivas";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es una pintura antideslizante y dónde se emplea en un centro deportivo?", reverso: "Una pintura con áridos o texturizante incorporado que aumenta la fricción de la superficie; se emplea en zonas húmedas como playas de piscina, vestuarios y accesos, para reducir el riesgo de resbalones" },
  { anverso: "¿Qué característica debe tener una pintura empleada en zonas expuestas al cloro (playas de piscina, salas de tratamiento)?", reverso: "Resistencia química al cloro y a la humedad constante, para evitar el deterioro prematuro, la decoloración o el desprendimiento de la pintura" },
  { anverso: "¿Qué es la pintura de marcaje de líneas de juego en pistas deportivas?", reverso: "Una pintura específica (habitualmente acrílica o de resina) de alta durabilidad y buena adherencia al pavimento deportivo, empleada para trazar las líneas reglamentarias de un campo o pista" },
  { anverso: "¿Qué diferencia hay entre pintura plástica y pintura al esmalte?", reverso: "La pintura plástica es a base de agua, de secado rápido y uso habitual en interiores; el esmalte es de mayor dureza y resistencia (habitualmente a base de disolvente), usado en superficies metálicas o de madera sometidas a más desgaste" },
  { anverso: "¿Qué es una pintura antioxidante y dónde se aplica en instalaciones deportivas?", reverso: "Una pintura formulada para proteger superficies metálicas de la corrosión; se aplica en porterías, canastas, vallados y otros elementos metálicos expuestos a la intemperie" },
  { anverso: "¿Por qué es importante el marcaje correcto de las líneas de una pista deportiva?", reverso: "Porque delimita el espacio de juego según la normativa reglamentaria de cada deporte, siendo un requisito para la homologación y el uso competitivo de la instalación" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es una pintura antideslizante y dónde se usa?", explicacion: "Aumenta la fricción; se usa en zonas húmedas como playas de piscina y vestuarios.", dificultad: "facil", opciones: ["Pintura que aumenta la fricción en zonas húmedas", "Pintura exclusiva para porterías metálicas", "Pintura para marcaje de líneas de juego", "Pintura al esmalte de secado lento"], correcta: 0 },
  { enunciado: "¿Qué característica debe tener una pintura en zonas expuestas al cloro?", explicacion: "Resistencia química al cloro y a la humedad constante.", dificultad: "media", opciones: ["Resistencia química al cloro y humedad", "Ser exclusivamente de color blanco", "No requerir ninguna característica especial", "Ser siempre pintura antioxidante"], correcta: 0 },
  { enunciado: "¿Qué es la pintura de marcaje de líneas de juego?", explicacion: "Una pintura de alta durabilidad para trazar líneas reglamentarias en pistas.", dificultad: "media", opciones: ["Pintura de alta durabilidad para líneas reglamentarias", "Pintura antideslizante de vestuarios", "Pintura antioxidante de porterías", "Pintura plástica de interiores"], correcta: 0 },
  { enunciado: "¿Qué diferencia hay entre pintura plástica y pintura al esmalte?", explicacion: "La plástica es a base de agua y secado rápido; el esmalte es más resistente, a base de disolvente.", dificultad: "media", opciones: ["La plástica es a base de agua; el esmalte es más resistente", "Son exactamente el mismo tipo de pintura", "El esmalte siempre es antideslizante", "La plástica se usa solo en porterías metálicas"], correcta: 0 },
  { enunciado: "¿Dónde se aplica habitualmente una pintura antioxidante en instalaciones deportivas?", explicacion: "En porterías, canastas, vallados y otros elementos metálicos.", dificultad: "media", opciones: ["En porterías, canastas y vallados metálicos", "En las playas de piscina exclusivamente", "En el marcaje de líneas de juego", "En los vestuarios interiores exclusivamente"], correcta: 0 },
  { enunciado: "¿Por qué es importante el marcaje correcto de líneas en una pista deportiva?", explicacion: "Es un requisito de homologación según la normativa reglamentaria del deporte.", dificultad: "media", opciones: ["Es un requisito de homologación reglamentaria", "No tiene ninguna relevancia normativa", "Solo afecta a la estética de la pista", "Sustituye a la pintura antideslizante"], correcta: 0 },
]);

const S2 = "utiles-herramientas-pintura";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Para qué se usa una brocha en trabajos de pintura?", reverso: "Para aplicar pintura en superficies pequeñas, rincones, bordes y elementos de detalle donde el rodillo no llega con precisión" },
  { anverso: "¿Para qué se usa un rodillo en trabajos de pintura?", reverso: "Para aplicar pintura de forma rápida y uniforme sobre superficies grandes y lisas, como paredes o pavimentos" },
  { anverso: "¿Para qué se usa una máquina de marcaje de líneas (carro marcador) en pistas deportivas?", reverso: "Para trazar líneas rectas y uniformes con pintura sobre el pavimento deportivo, guiada manualmente y con un depósito que dosifica la pintura de forma constante" },
  { anverso: "¿Para qué se usa una lija en la preparación previa al pintado?", reverso: "Para eliminar imperfecciones, pintura vieja desconchada o suciedad de la superficie, mejorando la adherencia de la nueva capa de pintura" },
  { anverso: "¿Para qué se usa cinta de carrocero (cinta de pintor) en trabajos de pintura?", reverso: "Para proteger zonas que no se quieren pintar y conseguir bordes rectos y limpios en el trazado de líneas o cambios de color" },
  { anverso: "¿Para qué se usa una pistola de pintar (pistola airless o de gravedad) frente a brocha y rodillo?", reverso: "Para aplicar pintura de forma más rápida y uniforme en superficies grandes o de acceso complejo, pulverizando la pintura a presión" },
  { anverso: "¿Qué EPI es imprescindible al trabajar con pinturas o disolventes en espacios cerrados?", reverso: "Mascarilla con filtro adecuado a los vapores orgánicos, guantes de protección química y, si es necesario, gafas; además de garantizar una ventilación adecuada del espacio" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Para qué se usa una brocha en pintura?", explicacion: "Para aplicar pintura en superficies pequeñas, rincones y bordes.", dificultad: "facil", opciones: ["Para superficies pequeñas, rincones y bordes", "Para superficies grandes y lisas exclusivamente", "Para trazar líneas de pistas deportivas", "Para lijar superficies antes de pintar"], correcta: 0 },
  { enunciado: "¿Para qué se usa un rodillo en pintura?", explicacion: "Para aplicar pintura rápida y uniforme en superficies grandes.", dificultad: "facil", opciones: ["Para superficies grandes y lisas", "Para rincones y bordes de detalle", "Para trazar líneas de juego", "Para proteger zonas sin pintar"], correcta: 0 },
  { enunciado: "¿Para qué se usa una máquina de marcaje de líneas en pistas deportivas?", explicacion: "Para trazar líneas rectas y uniformes sobre el pavimento.", dificultad: "media", opciones: ["Para trazar líneas rectas y uniformes", "Para lijar el pavimento antes de pintar", "Para aplicar pintura antioxidante en porterías", "Para proteger zonas que no se pintan"], correcta: 0 },
  { enunciado: "¿Para qué se usa la lija en preparación de superficies?", explicacion: "Para eliminar imperfecciones y mejorar la adherencia.", dificultad: "media", opciones: ["Para eliminar imperfecciones y mejorar adherencia", "Para trazar líneas de juego", "Para pulverizar pintura a presión", "Para proteger zonas sin pintar"], correcta: 0 },
  { enunciado: "¿Para qué se usa la cinta de carrocero en pintura?", explicacion: "Para proteger zonas y conseguir bordes rectos y limpios.", dificultad: "media", opciones: ["Para proteger zonas y conseguir bordes rectos", "Para aplicar pintura pulverizada", "Para lijar superficies previas al pintado", "Para trazar líneas curvas irregulares"], correcta: 0 },
  { enunciado: "¿Qué EPI es imprescindible al trabajar con pinturas en espacios cerrados?", explicacion: "Mascarilla con filtro adecuado, guantes y ventilación.", dificultad: "media", opciones: ["Mascarilla, guantes y ventilación adecuada", "No es necesaria ninguna protección", "Solo calzado de seguridad", "Solo casco de protección"], correcta: 0 },
]);

const S3 = "operaciones-basicas-pintado";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Cuál es el primer paso en una operación básica de pintado de una superficie deteriorada?", reverso: "La preparación de la superficie: limpieza, eliminación de pintura suelta o desconchada, lijado y, si es necesario, reparación de pequeños desperfectos previos" },
  { anverso: "¿Qué es una imprimación en un proceso de pintado?", reverso: "Una capa previa a la pintura de acabado que mejora la adherencia y, en superficies metálicas, protege frente a la oxidación antes de aplicar el color final" },
  { anverso: "¿Por qué se aplican habitualmente varias manos de pintura en lugar de una sola capa gruesa?", reverso: "Porque varias capas finas proporcionan un acabado más uniforme, mejor cubrición y menor riesgo de goteos o defectos que una única capa gruesa" },
  { anverso: "¿Qué tiempo debe respetarse entre manos de pintura?", reverso: "El tiempo de secado indicado por el fabricante del producto, que varía según el tipo de pintura, la temperatura y la humedad ambiental" },
  { anverso: "¿Qué condiciones ambientales deben evitarse al pintar exteriores en instalaciones deportivas?", reverso: "Lluvia inminente, humedad muy alta, temperaturas extremas (muy bajas o muy altas) y viento fuerte, que afectan al secado y la calidad del acabado" },
  { anverso: "¿Qué precaución debe tomarse al pintar una pista o superficie deportiva antes de su uso?", reverso: "Respetar el tiempo de secado y curado completo indicado por el fabricante antes de permitir el acceso o uso de la superficie, para evitar que la pintura se dañe o resulte resbaladiza" },
  { anverso: "¿Cómo debe gestionarse el material sobrante de pintura y los envases vacíos tras un trabajo de pintado?", reverso: "Como residuo específico, siguiendo el sistema de recogida selectiva de residuos peligrosos del centro/municipio, sin verterlo por desagües ni mezclarlo con residuos ordinarios" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Cuál es el primer paso al pintar una superficie deteriorada?", explicacion: "La preparación: limpieza, eliminación de pintura suelta y lijado.", dificultad: "facil", opciones: ["La preparación de la superficie", "Aplicar directamente la pintura de acabado", "Colocar cinta de carrocero exclusivamente", "Ventilar la zona sin preparar la superficie"], correcta: 0 },
  { enunciado: "¿Qué es una imprimación?", explicacion: "Una capa previa que mejora adherencia y protege frente a la oxidación.", dificultad: "media", opciones: ["Una capa previa que mejora la adherencia", "La capa final de acabado decorativo", "Un tipo de disolvente para limpiar brochas", "Un tipo de cinta protectora"], correcta: 0 },
  { enunciado: "¿Por qué se aplican varias manos finas en vez de una capa gruesa?", explicacion: "Dan un acabado más uniforme y menor riesgo de goteos o defectos.", dificultad: "media", opciones: ["Dan un acabado más uniforme sin goteos", "Ahorran siempre más tiempo de trabajo", "Eliminan la necesidad de imprimación", "No existe diferencia real entre ambas opciones"], correcta: 0 },
  { enunciado: "¿De qué depende el tiempo de secado entre manos de pintura?", explicacion: "Del tipo de pintura, la temperatura y la humedad ambiental.", dificultad: "media", opciones: ["Del tipo de pintura, temperatura y humedad", "Siempre es exactamente el mismo, 24 horas", "Solo depende del color de la pintura", "No influye en el resultado final"], correcta: 0 },
  { enunciado: "¿Qué condiciones deben evitarse al pintar exteriores?", explicacion: "Lluvia, humedad alta, temperaturas extremas y viento fuerte.", dificultad: "media", opciones: ["Lluvia, humedad alta y temperaturas extremas", "El sol directo únicamente", "El uso de imprimación", "La aplicación de varias manos"], correcta: 0 },
  { enunciado: "¿Cómo debe gestionarse el material sobrante de pintura y envases vacíos?", explicacion: "Como residuo específico, sin verterlo por desagües ni mezclarlo con residuos ordinarios.", dificultad: "media", opciones: ["Como residuo específico, sin verterlo por desagües", "Se puede verter directamente por el desagüe", "Se mezcla con los residuos ordinarios sin problema", "No requiere ninguna gestión especial"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 12 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 12, orden: 12, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-82 creado y vinculado como Tema 12 de Oficial Polivalente Instalaciones Deportivas.");
