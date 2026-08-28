/**
 * Crea el tema canónico tema-52: "Innovación de materiales para
 * tabiquería interior y muros de fachada. Tipología, características y
 * aplicaciones" y lo asigna como Tema 14 (bloque-2) de la oposición
 * Oficial Albañil (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 12 oficial del Anexo I (bases2110.pdf).
 *
 * Contenido técnico consolidado sobre sistemas constructivos alternativos
 * a la fábrica tradicional de ladrillo (tabiquería seca con placas de
 * yeso laminado, piezas cerámicas y de hormigón de altas prestaciones,
 * sistemas de aislamiento de fachada), sin una norma única que lo regule
 * como temario de examen; se trata como conocimiento técnico del oficio,
 * igual que otros temas de este bloque sin cita legal directa (tema-49).
 *
 * Tres secciones:
 * 1. sistemas-tabiqueria-seca — placas de yeso laminado y estructura
 *    metálica auxiliar.
 * 2. piezas-altas-prestaciones — ladrillo cerámico de gran formato
 *    (termoarcilla) y bloques de hormigón celular o aligerado.
 * 3. sistemas-innovadores-fachada — SATE, fachada ventilada y paneles
 *    prefabricados.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-52-innovacion-materiales-tabiqueria-fachada.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!URL_BASE || !SERVICE_KEY) {
  console.error("❌ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-52";
const OPOSICION = "oficial-albanil-ayto-zaragoza";
const BLOQUE_2_ID = "11fb28dc-2b37-42bb-ae51-aeb7421e298c";

async function insertar(tabla, filas) {
  const res = await fetch(`${URL_BASE}/rest/v1/${tabla}`, {
    method: "POST",
    headers: { ...HEADERS, Prefer: "return=representation" },
    body: JSON.stringify(filas),
  });
  if (!res.ok) {
    console.error(`❌ Error insertando en ${tabla}: ${res.status} ${await res.text()}`);
    process.exit(1);
  }
  return res.json();
}

async function upsert(tabla, filas, onConflict) {
  const res = await fetch(`${URL_BASE}/rest/v1/${tabla}?on_conflict=${onConflict}`, {
    method: "POST",
    headers: { ...HEADERS, Prefer: "resolution=merge-duplicates,return=representation" },
    body: JSON.stringify(filas),
  });
  if (!res.ok) {
    console.error(`❌ Error insertando en ${tabla}: ${res.status} ${await res.text()}`);
    process.exit(1);
  }
  return res.json();
}

async function insertarPreguntasConOpciones(seccion, preguntas) {
  const filas = preguntas.map(({ opciones, correcta, ...p }) => ({ ...p, tema_slug: TEMA, seccion }));
  const insertadas = await insertar("preguntas", filas);
  console.log(`   ✓ preguntas: ${insertadas.length} filas`);
  const filasOpciones = insertadas.flatMap((pregunta, i) =>
    preguntas[i].opciones.map((texto, orden) => ({
      pregunta_id: pregunta.id,
      texto,
      es_correcta: orden === preguntas[i].correcta,
      orden,
    })),
  );
  const opcionesInsertadas = await insertar("opciones", filasOpciones);
  console.log(`   ✓ opciones: ${opcionesInsertadas.length} filas`);
}

// ─────────────────────────────────────────────────────────────────────────
// Tema canónico
// ─────────────────────────────────────────────────────────────────────────
console.log(`📚 Creando ${TEMA}...`);
await insertar("temas", [
  {
    slug: TEMA,
    titulo: "Innovación de materiales para tabiquería interior y muros de fachada",
    descripcion: "Innovación de materiales para tabiquería interior y muros de fachada. Tipología, características y aplicaciones.",
    contenido:
      "Desarrolla los sistemas constructivos alternativos a la fábrica tradicional de ladrillo: tabiquería seca con placas de yeso laminado, piezas cerámicas y de hormigón de altas prestaciones (ladrillo de gran formato tipo termoarcilla, bloque de hormigón celular o aligerado) y sistemas innovadores de aislamiento y acabado de fachada (SATE, fachada ventilada, paneles prefabricados).",
    enlaces_boe: [],
    indice_estudio: [
      { url: "", titulo: "Sistemas de tabiquería seca", seccion: "sistemas-tabiqueria-seca", articulos: "Conceptos fundamentales" },
      { url: "", titulo: "Piezas cerámicas y de hormigón de altas prestaciones", seccion: "piezas-altas-prestaciones", articulos: "Conceptos fundamentales" },
      { url: "", titulo: "Sistemas innovadores de fachada", seccion: "sistemas-innovadores-fachada", articulos: "Conceptos fundamentales" },
    ],
  },
]);

// ─────────────────────────────────────────────────────────────────────────
// Sección 1: sistemas-tabiqueria-seca
// ─────────────────────────────────────────────────────────────────────────
const S1 = "sistemas-tabiqueria-seca";
console.log(`📝 flashcards (${S1})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Qué es la tabiquería seca?", reverso: "Un sistema de partición interior construido con placas (de yeso laminado u otro material) atornilladas sobre una estructura auxiliar, sin necesidad de agua ni tiempos de fraguado como en la fábrica tradicional" },
    { anverso: "¿Qué es una placa de yeso laminado (PYL)?", reverso: "Un panel formado por un núcleo de yeso revestido por ambas caras con lámina de cartón, empleado como placa de tabiquería seca, trasdosado o falso techo" },
    { anverso: "¿Qué elementos componen la estructura auxiliar de un tabique de PYL?", reverso: "Perfiles metálicos de acero galvanizado: canales (horizontales, en suelo y techo) y montantes (verticales, entre los canales), sobre los que se atornillan las placas" },
    { anverso: "¿Qué ventajas ofrece la tabiquería seca frente a la fábrica tradicional de ladrillo?", reverso: "Mayor rapidez de ejecución, menor peso, ausencia de tiempos de fraguado o secado, facilidad para alojar instalaciones en su interior y posibilidad de desmontaje" },
    { anverso: "¿Qué se coloca en el interior del alma de un tabique de PYL para mejorar el aislamiento?", reverso: "Paneles o mantas de lana mineral (de vidrio o de roca) u otros materiales aislantes, alojados entre los montantes" },
    { anverso: "¿Qué es un trasdosado autoportante de PYL?", reverso: "Un revestimiento interior de un muro mediante placas de yeso laminado fijadas a una estructura metálica propia, sin apoyarse directamente en el muro existente, a diferencia del trasdosado directo o pegado" },
    { anverso: "¿Qué tipos de placa de yeso laminado existen según sus prestaciones especiales?", reverso: "Placas estándar, hidrófugas (para zonas húmedas), ignífugas (mayor resistencia al fuego) y de altas prestaciones acústicas, entre otras" },
    { anverso: "¿Cómo se tratan las juntas entre placas de yeso laminado para conseguir un acabado continuo?", reverso: "Aplicando cinta de juntas y pasta específica en varias manos, lijando entre capas, hasta conseguir una superficie lisa lista para pintar" },
    { anverso: "¿Qué ventaja aporta la tabiquería seca para el paso de instalaciones (electricidad, fontanería)?", reverso: "El hueco entre placas facilita el alojamiento y registro de tuberías y cableado sin necesidad de rozar la fábrica, simplificando su montaje y posterior mantenimiento" },
    { anverso: "¿Qué precaución debe tenerse al fijar elementos pesados (muebles, sanitarios) sobre un tabique de PYL?", reverso: "Emplear anclajes específicos (tacos químicos, placas de refuerzo o perfiles reforzados en la zona) que transmitan la carga a los montantes o a un refuerzo previsto, ya que la placa por sí sola tiene poca capacidad portante" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })),
);

console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es la tabiquería seca?", explicacion: "Un sistema de partición con placas atornilladas sobre estructura auxiliar, sin agua ni fraguado.", dificultad: "facil", opciones: ["Un sistema de partición con placas sobre estructura auxiliar", "Una fábrica de ladrillo tomada con mortero de cemento", "Un revestimiento continuo de mortero de cal", "Un sistema de cimentación superficial"], correcta: 0 },
  { enunciado: "¿Qué es una placa de yeso laminado?", explicacion: "Un panel con núcleo de yeso revestido por ambas caras con lámina de cartón.", dificultad: "media", opciones: ["Un panel con núcleo de yeso revestido de cartón", "Una pieza cerámica de gran formato", "Un bloque de hormigón celular curado en autoclave", "Un panel de aislamiento térmico exterior"], correcta: 0 },
  { enunciado: "¿Qué elementos forman la estructura auxiliar de un tabique de PYL?", explicacion: "Canales horizontales y montantes verticales de acero galvanizado.", dificultad: "media", opciones: ["Canales y montantes de acero galvanizado", "Vigas y pilares de hormigón armado", "Ladrillos huecos y mortero de cemento", "Paneles de piedra natural anclados"], correcta: 0 },
  { enunciado: "¿Qué ventaja ofrece la tabiquería seca frente a la fábrica tradicional?", explicacion: "Mayor rapidez, menor peso y ausencia de tiempos de fraguado o secado.", dificultad: "facil", opciones: ["Mayor rapidez y ausencia de tiempos de fraguado", "Mayor resistencia estructural que un muro de carga", "Menor coste de material siempre", "Mayor resistencia al fuego en todos los casos"], correcta: 0 },
  { enunciado: "¿Qué se aloja habitualmente en el interior del alma de un tabique de PYL?", explicacion: "Paneles o mantas de lana mineral u otros aislantes.", dificultad: "media", opciones: ["Paneles o mantas de lana mineral", "Hormigón armado de relleno", "Grava-cemento compactada", "Ladrillo hueco doble"], correcta: 0 },
  { enunciado: "¿Qué distingue a un trasdosado autoportante de PYL de uno pegado?", explicacion: "El autoportante se fija a una estructura metálica propia, sin apoyarse directamente en el muro existente.", dificultad: "media", opciones: ["Se fija a una estructura propia sin apoyarse en el muro", "No lleva placas de yeso laminado", "Se ejecuta siempre con mortero de cemento", "No admite aislamiento en su interior"], correcta: 0 },
  { enunciado: "¿Para qué se usan las placas hidrófugas de yeso laminado?", explicacion: "Para zonas húmedas.", dificultad: "media", opciones: ["Para zonas húmedas", "Para muros de carga estructurales", "Para cimentaciones superficiales", "Para revestimientos exteriores de fachada"], correcta: 0 },
  { enunciado: "¿Qué precaución debe tomarse al fijar elementos pesados sobre un tabique de PYL?", explicacion: "Emplear anclajes específicos que transmitan la carga a los montantes o a un refuerzo previsto.", dificultad: "media", opciones: ["Emplear anclajes específicos que transmitan la carga a montantes", "No es necesaria ninguna precaución especial", "Solo puede hacerse en tabiques de fábrica de ladrillo", "Requiere siempre romper la placa para reforzarla"], correcta: 0 },
]);

// ─────────────────────────────────────────────────────────────────────────
// Sección 2: piezas-altas-prestaciones
// ─────────────────────────────────────────────────────────────────────────
const S2 = "piezas-altas-prestaciones";
console.log(`📝 flashcards (${S2})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Qué es el ladrillo cerámico de gran formato (tipo termoarcilla)?", reverso: "Una pieza cerámica aligerada, de mayores dimensiones que el ladrillo tradicional, con perforaciones verticales que mejoran su aislamiento térmico, pensada para levantar muros de una sola hoja con menos piezas y juntas" },
    { anverso: "¿Qué ventaja aporta el ladrillo de gran formato frente al ladrillo tradicional en la ejecución de un muro?", reverso: "Reduce el número de piezas y de juntas de mortero necesarias, acelerando la ejecución, y mejora las prestaciones térmicas del cerramiento por su mayor aislamiento intrínseco" },
    { anverso: "¿Qué es el bloque de hormigón celular curado en autoclave (hormigón celular)?", reverso: "Un material prefabricado ligero, con una estructura porosa uniforme obtenida mediante un agente expansor y curado a alta presión y temperatura en autoclave, que combina baja densidad con buen aislamiento térmico" },
    { anverso: "¿Qué ventajas tiene el hormigón celular frente al bloque de hormigón convencional?", reverso: "Menor peso propio, mejor aislamiento térmico y mayor facilidad de corte y trabajo con herramientas manuales, aunque con menor resistencia mecánica" },
    { anverso: "¿Qué es un bloque de hormigón aligerado con árido ligero (por ejemplo, de arcilla expandida)?", reverso: "Un bloque de hormigón fabricado sustituyendo parte del árido convencional por árido ligero, reduciendo su peso y mejorando su aislamiento térmico manteniendo capacidad portante para cerramientos y muros de carga" },
    { anverso: "¿Qué es el marcado CE de un material de construcción?", reverso: "El distintivo obligatorio que certifica que un producto cumple los requisitos esenciales establecidos por la normativa europea armonizada, permitiendo su libre comercialización en el mercado europeo" },
    { anverso: "¿Qué significan las siglas 'LD' o 'LP' habituales en la denominación de bloques de hormigón, según su función?", reverso: "Indican, según la clasificación habitual del sector, si la pieza está pensada para muros de carga (portante) o para particiones/cerramientos no estructurales, junto con otros parámetros como densidad y resistencia" },
    { anverso: "¿Por qué es relevante conocer el 'marcado o sello de calidad' de un material innovador antes de emplearlo en obra?", reverso: "Porque acredita que el material cumple unas características técnicas verificadas (resistencia, aislamiento, durabilidad), facilitando su recepción y control de calidad en obra" },
    { anverso: "¿Qué precaución especial requiere el corte de piezas cerámicas de gran formato o de hormigón celular?", reverso: "Emplear herramientas adecuadas (sierra o disco de corte específico) para evitar dañar la perforación interior o fisurar la pieza, manteniendo sus prestaciones térmicas y mecánicas" },
    { anverso: "¿Qué precaución exige el rejuntado de piezas de gran formato con sistema de machihembrado?", reverso: "Aplicar el adhesivo o mortero cola en la cantidad y forma especificadas por el fabricante, ya que muchos sistemas de gran formato reducen o eliminan la junta vertical de mortero gracias al encaje entre piezas" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })),
);

console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué caracteriza al ladrillo cerámico de gran formato (tipo termoarcilla)?", explicacion: "Perforaciones verticales que mejoran el aislamiento térmico y mayores dimensiones que el ladrillo tradicional.", dificultad: "media", opciones: ["Mayor tamaño y perforaciones que mejoran el aislamiento", "Ser macizo y sin ninguna perforación", "Fabricarse exclusivamente con hormigón", "Usarse solo en cimentaciones"], correcta: 0 },
  { enunciado: "¿Qué ventaja aporta el ladrillo de gran formato en la ejecución de un muro?", explicacion: "Reduce el número de piezas y juntas, acelerando la ejecución y mejorando el aislamiento.", dificultad: "media", opciones: ["Reduce piezas y juntas, acelerando la ejecución", "Aumenta siempre el peso del muro", "Elimina la necesidad de replanteo", "Sustituye al hormigón armado en cimentaciones"], correcta: 0 },
  { enunciado: "¿Cómo se fabrica el hormigón celular curado en autoclave?", explicacion: "Con estructura porosa mediante un agente expansor, curado a alta presión y temperatura en autoclave.", dificultad: "media", opciones: ["Con estructura porosa curada en autoclave", "Mezclando exclusivamente cemento y agua", "Cociendo arcilla a alta temperatura", "Compactando zahorra con cemento"], correcta: 0 },
  { enunciado: "¿Qué ventaja principal tiene el hormigón celular frente al bloque de hormigón convencional?", explicacion: "Menor peso propio y mejor aislamiento térmico.", dificultad: "media", opciones: ["Menor peso y mejor aislamiento térmico", "Mayor resistencia mecánica siempre", "Menor coste de fabricación en todos los casos", "Mayor densidad que el hormigón convencional"], correcta: 0 },
  { enunciado: "¿Qué es un bloque de hormigón aligerado con árido ligero?", explicacion: "Un bloque que sustituye parte del árido convencional por árido ligero, reduciendo peso y mejorando el aislamiento.", dificultad: "media", opciones: ["Un bloque con árido ligero que reduce peso y mejora aislamiento", "Un bloque exclusivamente cerámico", "Un panel de yeso laminado reforzado", "Un sistema de aislamiento exterior SATE"], correcta: 0 },
  { enunciado: "¿Qué certifica el marcado CE de un material de construcción?", explicacion: "Que cumple los requisitos esenciales de la normativa europea armonizada.", dificultad: "media", opciones: ["Que cumple los requisitos esenciales de la normativa europea", "Que es el material más económico del mercado", "Que ha sido fabricado en España", "Que no requiere control de calidad en obra"], correcta: 0 },
  { enunciado: "¿Qué precaución debe tomarse al cortar piezas cerámicas de gran formato o de hormigón celular?", explicacion: "Usar herramientas adecuadas para no dañar la perforación interior ni fisurar la pieza.", dificultad: "media", opciones: ["Usar herramientas adecuadas para no dañar la pieza", "No es necesaria ninguna precaución especial", "Solo pueden cortarse con maza y cincel", "Deben humedecerse siempre antes de cortarlas"], correcta: 0 },
  { enunciado: "¿Qué caracteriza al rejuntado de muchos sistemas de piezas de gran formato con machihembrado?", explicacion: "Reducen o eliminan la junta vertical de mortero gracias al encaje entre piezas.", dificultad: "dificil", opciones: ["Reducen o eliminan la junta vertical de mortero", "Exigen siempre una junta vertical mayor que en ladrillo tradicional", "No admiten ningún tipo de adhesivo o mortero cola", "Solo se rejuntan con pasta de yeso"], correcta: 0 },
]);

// ─────────────────────────────────────────────────────────────────────────
// Sección 3: sistemas-innovadores-fachada
// ─────────────────────────────────────────────────────────────────────────
const S3 = "sistemas-innovadores-fachada";
console.log(`📝 flashcards (${S3})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Qué es el sistema SATE (Sistema de Aislamiento Térmico por el Exterior)?", reverso: "Un sistema constructivo que coloca el aislamiento térmico por la cara exterior del muro de fachada, cubierto por un revestimiento continuo (mortero armado con malla y acabado final), reduciendo los puentes térmicos" },
    { anverso: "¿Qué ventaja principal ofrece el SATE frente a un aislamiento colocado por el interior?", reverso: "Reduce significativamente los puentes térmicos (forjados, pilares) al envolver el edificio de forma continua por el exterior, y no resta superficie útil en el interior de las viviendas" },
    { anverso: "¿Qué capas componen típicamente un sistema SATE?", reverso: "El panel aislante fijado al soporte (con adhesivo y/o fijaciones mecánicas), una capa base de mortero armada con malla de fibra de vidrio, y el revestimiento o acabado final" },
    { anverso: "¿Qué es una fachada ventilada?", reverso: "Un sistema de cerramiento formado por una hoja interior, una cámara de aire ventilada al exterior y una hoja exterior de revestimiento (piedra, gres, composite, etc.) anclada mediante una subestructura, sin contacto directo entre ambas hojas" },
    { anverso: "¿Qué función cumple la cámara de aire ventilada en una fachada ventilada?", reverso: "Favorece la evacuación de humedad y la circulación de aire, mejora el comportamiento térmico en verano (efecto chimenea) y evita el contacto directo del agua de lluvia con la hoja interior" },
    { anverso: "¿Qué elementos componen la subestructura de anclaje de una fachada ventilada?", reverso: "Perfiles metálicos (habitualmente de aluminio o acero inoxidable) fijados al muro base, sobre los que se sujetan las piezas de la hoja exterior mediante anclajes mecánicos ocultos o vistos" },
    { anverso: "¿Qué son los paneles prefabricados de fachada?", reverso: "Elementos de cerramiento fabricados en taller (de hormigón, GRC, sándwich metálico u otros materiales) que se transportan y montan en obra ya terminados o casi terminados, reduciendo el tiempo de ejecución en obra" },
    { anverso: "¿Qué ventaja aporta la prefabricación de paneles de fachada frente a la ejecución in situ?", reverso: "Mayor control de calidad al fabricarse en condiciones controladas de taller, mayor rapidez de montaje en obra y menor dependencia de las condiciones climáticas durante la ejecución" },
    { anverso: "¿Qué es el GRC (hormigón armado con fibra de vidrio)?", reverso: "Un material compuesto de mortero de cemento reforzado con fibras de vidrio resistentes a los álcalis, empleado en paneles de fachada prefabricados ligeros de gran formato y libertad de diseño" },
    { anverso: "¿Qué aspecto debe cuidarse especialmente en el remate y los puntos singulares de un sistema SATE o de fachada ventilada?", reverso: "Los encuentros con huecos (ventanas, puertas), esquinas, arranques y remates superiores, donde deben garantizarse la continuidad del aislamiento y la estanqueidad frente al agua" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })),
);

console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es el sistema SATE?", explicacion: "Un sistema que coloca el aislamiento térmico por el exterior del muro, cubierto con revestimiento continuo.", dificultad: "facil", opciones: ["Un sistema que coloca el aislamiento por el exterior del muro", "Un sistema de aislamiento colocado siempre por el interior", "Una fachada ventilada con hoja de piedra", "Un panel prefabricado de hormigón armado"], correcta: 0 },
  { enunciado: "¿Qué ventaja ofrece el SATE frente al aislamiento por el interior?", explicacion: "Reduce significativamente los puentes térmicos al envolver el edificio de forma continua.", dificultad: "media", opciones: ["Reduce los puentes térmicos al envolver el edificio", "Aumenta siempre el grosor útil de las viviendas", "Elimina la necesidad de revestimiento final", "Se aplica exclusivamente en cubiertas"], correcta: 0 },
  { enunciado: "¿Qué capas componen típicamente un sistema SATE?", explicacion: "Panel aislante, capa base de mortero armada con malla, y revestimiento final.", dificultad: "media", opciones: ["Panel aislante, mortero armado con malla y acabado final", "Únicamente una capa de pintura exterior", "Ladrillo hueco y mortero de cemento", "Placas de yeso laminado y estructura metálica"], correcta: 0 },
  { enunciado: "¿Qué es una fachada ventilada?", explicacion: "Un cerramiento con hoja interior, cámara de aire ventilada y hoja exterior anclada sin contacto directo.", dificultad: "media", opciones: ["Un cerramiento con cámara de aire ventilada entre dos hojas", "Un sistema de aislamiento pegado directamente al muro", "Un tabique de placas de yeso laminado", "Un bloque de hormigón celular curado en autoclave"], correcta: 0 },
  { enunciado: "¿Qué función cumple la cámara de aire en una fachada ventilada?", explicacion: "Evacúa humedad, mejora el comportamiento térmico en verano y evita contacto directo del agua con la hoja interior.", dificultad: "media", opciones: ["Evacúa humedad y mejora el comportamiento térmico", "Sirve exclusivamente de aislamiento acústico", "Sustituye la necesidad de subestructura metálica", "Reduce el peso propio de la hoja exterior a cero"], correcta: 0 },
  { enunciado: "¿Qué son los paneles prefabricados de fachada?", explicacion: "Elementos de cerramiento fabricados en taller que se transportan y montan en obra.", dificultad: "media", opciones: ["Elementos fabricados en taller y montados en obra", "Piezas cerámicas fabricadas siempre in situ", "Un tipo de mortero de revestimiento continuo", "Un sistema exclusivo de aislamiento interior"], correcta: 0 },
  { enunciado: "¿Qué ventaja aporta la prefabricación de paneles frente a la ejecución in situ?", explicacion: "Mayor control de calidad de taller, rapidez de montaje y menor dependencia climática.", dificultad: "media", opciones: ["Mayor control de calidad y menor dependencia climática", "Mayor coste siempre, sin otras ventajas", "Imposibilidad de emplear anclajes mecánicos", "Necesidad de mayor tiempo de fraguado en obra"], correcta: 0 },
  { enunciado: "¿Qué es el GRC en paneles de fachada?", explicacion: "Mortero de cemento reforzado con fibras de vidrio resistentes a los álcalis.", dificultad: "dificil", opciones: ["Mortero de cemento reforzado con fibra de vidrio", "Un tipo de ladrillo cerámico de gran formato", "Un aislante térmico de lana mineral", "Un sistema de anclaje mecánico oculto"], correcta: 0 },
]);

// ─────────────────────────────────────────────────────────────────────────
// Vincular a la oposición (Tema 14)
// ─────────────────────────────────────────────────────────────────────────
console.log(`\n🔗 Vinculando ${TEMA} como Tema 14 de ${OPOSICION}...`);
await upsert(
  "tema_oposicion",
  [
    {
      tema_slug: TEMA,
      oposicion_slug: OPOSICION,
      bloque_id: BLOQUE_2_ID,
      numero: 14,
      orden: 14,
      es_premium: false,
      publicado: true,
      secciones_incluidas: null,
    },
  ],
  "tema_slug,oposicion_slug"
);

console.log("\n✅ tema-52 creado y vinculado como Tema 14 de Oficial Albañil.");
