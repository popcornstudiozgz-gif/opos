/**
 * Crea el tema canónico tema-50: "Conceptos generales de cimentaciones y
 * estructuras según Código estructural. Ejecución de fábricas de hormigón
 * armado. Arquetas, contrarrestos y macizos para nudos de tuberías de
 * abastecimiento" y lo asigna como Tema 12 (bloque-2) de la oposición
 * Oficial Albañil (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 10 oficial del Anexo I (bases2110.pdf): "Conceptos
 * generales de cimentaciones y estructuras según Código estructural.
 * Ejecución de fábricas de hormigón armado. Arquetas, contrarrestos y
 * macizos para codos, TEs, conos de reducción y bridas ciegas en nudos de
 * tuberías de abastecimiento según pliego de prescripciones técnicas del
 * Ayuntamiento de Zaragoza."
 *
 * Fuente primaria (secciones 1 y 2): Real Decreto 470/2021, de 29 de
 * junio, por el que se aprueba el Código Estructural (BOE-A-2021-13681),
 * que sustituye a la Instrucción de Hormigón Estructural (EHE-08).
 * Verificado en este turno: el Título 2 ("Estructuras de hormigón",
 * capítulos 7 a 16) regula el proyecto, ejecución, gestión de calidad y
 * durabilidad de las estructuras de hormigón, incluidas las armadas. Es un
 * documento técnico muy extenso; el contenido de tipología de
 * cimentaciones y conceptos de hormigón armado se desarrolla aquí como
 * conocimiento técnico consolidado del oficio, sin atribuir artículos
 * concretos no verificados uno a uno.
 *
 * AVISO IMPORTANTE (sección 3) — el "pliego de prescripciones técnicas del
 * Ayuntamiento de Zaragoza" citado expresamente en el enunciado oficial
 * para arquetas, contrarrestos y macizos en nudos de tuberías de
 * abastecimiento es, como el procedimiento PPRL-1606 del tema 10, un
 * documento interno/técnico del propio Ayuntamiento no localizado en
 * fuentes públicas. No se ha fabricado ni inventado su contenido
 * específico; se señala expresamente esta laguna, con contenido
 * verificable sobre los conceptos generales (qué es un contrarresto, para
 * qué sirve) que sí son conocimiento técnico consolidado del oficio.
 *
 * Tres secciones:
 * 1. tipos-cimentaciones — cimentaciones superficiales y profundas.
 * 2. hormigon-armado-fabricas — conceptos de hormigón armado y ejecución
 *    de fábricas de hormigón armado.
 * 3. arquetas-contrarrestos-tuberias-abastecimiento — arquetas,
 *    contrarrestos y macizos en nudos de tuberías, y aviso sobre el
 *    pliego interno del Ayuntamiento de Zaragoza.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-50-cimentaciones-hormigon-armado.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!URL_BASE || !SERVICE_KEY) {
  console.error("❌ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-50";
const OPOSICION = "oficial-albanil-ayto-zaragoza";
const BLOQUE_2_ID = "11fb28dc-2b37-42bb-ae51-aeb7421e298c";
const CODIGO_ESTRUCTURAL = "https://www.boe.es/buscar/act.php?id=BOE-A-2021-13681";

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
    titulo: "Cimentaciones y estructuras según el Código Estructural. Fábricas de hormigón armado",
    descripcion:
      "Conceptos generales de cimentaciones y estructuras según Código estructural. Ejecución de fábricas de hormigón armado. Arquetas, contrarrestos y macizos para codos, TEs, conos de reducción y bridas ciegas en nudos de tuberías de abastecimiento según pliego de prescripciones técnicas del Ayuntamiento de Zaragoza.",
    contenido:
      "Desarrolla los tipos de cimentación (superficial y profunda), los conceptos básicos del hormigón armado y la ejecución de fábricas de hormigón armado según el Código Estructural (RD 470/2021), y los elementos singulares de anclaje en redes de abastecimiento (arquetas, contrarrestos y macizos en codos, TEs, conos de reducción y bridas ciegas). El pliego de prescripciones técnicas del Ayuntamiento de Zaragoza citado expresamente en el temario oficial para estos elementos es un documento técnico interno no publicado, cuyo contenido concreto no ha podido verificarse ni reproducirse: se señala esta laguna de forma expresa en la sección 3.",
    enlaces_boe: [
      { url: CODIGO_ESTRUCTURAL, titulo: "RD 470/2021 — Código Estructural" },
    ],
    indice_estudio: [
      { url: CODIGO_ESTRUCTURAL, titulo: "Tipos de cimentaciones", seccion: "tipos-cimentaciones", articulos: "Conceptos fundamentales" },
      { url: CODIGO_ESTRUCTURAL, titulo: "Hormigón armado y ejecución de fábricas de hormigón armado", seccion: "hormigon-armado-fabricas", articulos: "Título 2, Estructuras de hormigón (caps. 7-16)" },
      { url: "", titulo: "Arquetas, contrarrestos y macizos en tuberías de abastecimiento", seccion: "arquetas-contrarrestos-tuberias-abastecimiento", articulos: "Conceptos fundamentales" },
    ],
  },
]);

// ─────────────────────────────────────────────────────────────────────────
// Sección 1: tipos-cimentaciones
// ─────────────────────────────────────────────────────────────────────────
const S1 = "tipos-cimentaciones";
console.log(`📝 flashcards (${S1})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Qué es una cimentación?", reverso: "El conjunto de elementos estructurales que transmiten las cargas de una construcción al terreno, garantizando su estabilidad y repartiendo el peso de forma compatible con la capacidad portante del suelo" },
    { anverso: "¿Qué diferencia hay entre cimentación superficial y cimentación profunda?", reverso: "La superficial transmite las cargas a estratos de terreno cercanos a la superficie (zapatas, losas); la profunda las transmite a estratos resistentes situados a mayor profundidad, cuando los superficiales no tienen suficiente capacidad portante (pilotes, pozos de cimentación)" },
    { anverso: "¿Qué es una zapata aislada?", reverso: "Un elemento de cimentación superficial que recibe la carga de un único pilar o soporte, repartiéndola sobre una superficie de terreno mayor que la sección del pilar" },
    { anverso: "¿Qué es una zapata corrida?", reverso: "Un elemento de cimentación superficial, de forma alargada, que recibe la carga de un muro de carga o de una alineación de pilares, repartiéndola de forma continua a lo largo de su longitud" },
    { anverso: "¿Qué es una losa de cimentación?", reverso: "Un elemento de cimentación superficial que ocupa toda la superficie en planta del edificio, repartiendo las cargas de todos los pilares y muros sobre el terreno de forma conjunta; se emplea cuando el terreno tiene poca capacidad portante o las cargas son elevadas" },
    { anverso: "¿Qué es un pilote?", reverso: "Un elemento de cimentación profunda, de sección relativamente pequeña y gran longitud, que transmite las cargas de la estructura a un estrato resistente en profundidad, bien por la resistencia de punta, bien por rozamiento lateral con el terreno, o ambas" },
    { anverso: "¿Qué es un encepado?", reverso: "El elemento de hormigón armado que corona un grupo de pilotes y reparte sobre ellos la carga transmitida por el pilar o muro que apoya en él" },
    { anverso: "¿Qué es la 'capacidad portante' del terreno?", reverso: "La máxima presión que el terreno puede soportar sin sufrir una rotura o un asiento excesivo, y que condiciona el tipo y las dimensiones de la cimentación a emplear" },
    { anverso: "¿Qué norma regula actualmente el proyecto y ejecución de estructuras de hormigón en España, tras sustituir a la EHE-08?", reverso: "El Código Estructural, aprobado por el Real Decreto 470/2021, de 29 de junio" },
    { anverso: "¿Por qué es importante un buen arranque de muro sobre la cimentación?", reverso: "Porque es el punto de transición entre la cimentación y la fábrica de elevación, donde deben garantizarse la impermeabilización, el correcto anclaje de armaduras (si las hay) y la continuidad estructural del elemento" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })),
);

console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es una cimentación?", explicacion: "El conjunto de elementos que transmiten las cargas de la construcción al terreno.", dificultad: "facil", opciones: ["El conjunto de elementos que transmiten las cargas al terreno", "El revestimiento exterior de un muro de fachada", "El sistema de entibación de una zanja", "El acabado final de un pavimento"], correcta: 0 },
  { enunciado: "¿Cuándo se recurre a una cimentación profunda en lugar de una superficial?", explicacion: "Cuando los estratos superficiales no tienen suficiente capacidad portante y hay que transmitir las cargas a mayor profundidad.", dificultad: "media", opciones: ["Cuando los estratos superficiales no tienen suficiente capacidad portante", "Siempre que la obra sea de nueva planta", "Cuando el presupuesto de la obra es reducido", "Cuando el edificio tiene una sola planta"], correcta: 0 },
  { enunciado: "¿Qué es una zapata aislada?", explicacion: "Recibe la carga de un único pilar y la reparte sobre una superficie de terreno mayor.", dificultad: "media", opciones: ["Un elemento que recibe la carga de un único pilar", "Un elemento que recibe la carga de todos los muros a la vez", "Un elemento de cimentación profunda con forma cilíndrica", "El encepado de un grupo de pilotes"], correcta: 0 },
  { enunciado: "¿Qué es una zapata corrida?", explicacion: "Un elemento alargado que reparte la carga de un muro de carga o alineación de pilares de forma continua.", dificultad: "media", opciones: ["Un elemento alargado que reparte la carga de un muro o alineación", "Una losa que ocupa toda la planta del edificio", "Un pilote de gran longitud", "Un macizo de anclaje para tuberías"], correcta: 0 },
  { enunciado: "¿Cuándo se emplea una losa de cimentación?", explicacion: "Cuando el terreno tiene poca capacidad portante o las cargas son elevadas, repartiéndolas sobre toda la planta.", dificultad: "media", opciones: ["Cuando el terreno tiene poca capacidad portante o las cargas son elevadas", "Únicamente en edificios de una sola planta", "Solo cuando no existe ningún pilar en el edificio", "Cuando se requiere una cimentación profunda"], correcta: 0 },
  { enunciado: "¿Qué es un pilote?", explicacion: "Un elemento de cimentación profunda que transmite cargas a un estrato resistente en profundidad.", dificultad: "media", opciones: ["Un elemento de cimentación profunda de gran longitud", "Un elemento de cimentación superficial alargado", "Una pieza de encofrado para hormigón armado", "Un tipo de mortero de agarre para fábricas"], correcta: 0 },
  { enunciado: "¿Qué es un encepado?", explicacion: "El elemento de hormigón armado que corona un grupo de pilotes y reparte la carga sobre ellos.", dificultad: "media", opciones: ["El elemento que corona un grupo de pilotes repartiendo la carga", "Una zapata aislada bajo un único pilar", "El acabado superficial de una losa de cimentación", "Un tipo de contrarresto en tuberías de abastecimiento"], correcta: 0 },
  { enunciado: "¿Qué norma sustituyó a la Instrucción de Hormigón Estructural EHE-08?", explicacion: "El Código Estructural, aprobado por el RD 470/2021.", dificultad: "media", opciones: ["El Código Estructural (RD 470/2021)", "El Código Técnico de la Edificación", "El RD 1627/1997 de seguridad en obras", "El RD 1212/2009 de certificados de profesionalidad"], correcta: 0 },
]);

// ─────────────────────────────────────────────────────────────────────────
// Sección 2: hormigon-armado-fabricas
// ─────────────────────────────────────────────────────────────────────────
const S2 = "hormigon-armado-fabricas";
console.log(`📝 flashcards (${S2})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Qué es el hormigón armado?", reverso: "El hormigón al que se incorporan armaduras de acero (barras corrugadas), aprovechando que el hormigón resiste bien la compresión y el acero la tracción, de modo que el conjunto resiste ambos esfuerzos" },
    { anverso: "¿Por qué se emplea acero corrugado (con resaltos) en lugar de liso en las armaduras de hormigón armado?", reverso: "Porque los resaltos mejoran la adherencia entre el acero y el hormigón, permitiendo una correcta transmisión de esfuerzos entre ambos materiales" },
    { anverso: "¿Qué es el recubrimiento de una armadura?", reverso: "El espesor de hormigón que separa la superficie exterior de la armadura de la cara externa del elemento, necesario para proteger el acero de la corrosión y del fuego, y garantizar la adherencia" },
    { anverso: "¿Por qué es crítico respetar el recubrimiento mínimo especificado en un elemento de hormigón armado?", reverso: "Porque un recubrimiento insuficiente facilita la entrada de humedad y agentes agresivos hasta la armadura, provocando su corrosión, la fisuración y el desprendimiento del hormigón (patología conocida como 'coqueras' o 'oxidación de armaduras')" },
    { anverso: "¿Qué es un encofrado?", reverso: "El molde temporal, de madera, metal u otros materiales, que da forma al hormigón fresco mientras fragua y endurece, y que se retira una vez el elemento tiene resistencia suficiente" },
    { anverso: "¿Qué es el curado del hormigón?", reverso: "El conjunto de medidas (mantener húmeda la superficie, proteger de la desecación, el calor o el frío excesivos) que se adoptan tras el hormigonado para que el hormigón desarrolle correctamente sus propiedades resistentes" },
    { anverso: "¿Qué es una junta de hormigonado?", reverso: "La superficie de contacto entre dos hormigonados realizados en momentos distintos, que debe tratarse adecuadamente (limpieza, rugosidad) para garantizar una correcta unión entre ambos" },
    { anverso: "¿Qué es una junta de dilatación en una estructura?", reverso: "Una separación física prevista en el proyecto entre partes de una construcción, que permite los movimientos por dilatación o contracción térmica sin generar fisuras o daños estructurales" },
    { anverso: "¿Qué es la vibración del hormigón durante su puesta en obra?", reverso: "El proceso mecánico (con vibrador de aguja u otros medios) que compacta el hormigón fresco dentro del encofrado, eliminando el aire ocluido y evitando coqueras o huecos" },
    { anverso: "¿Qué elementos de albañilería suelen ejecutarse en hormigón armado según cita el temario oficial?", reverso: "Arquetas, contrarrestos y macizos en nudos de tuberías (codos, TEs, conos de reducción, bridas ciegas), además de otras fábricas de hormigón armado propias de la obra civil y edificación" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })),
);

console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Por qué se combinan hormigón y acero en el hormigón armado?", explicacion: "Porque el hormigón resiste bien la compresión y el acero la tracción, complementándose.", dificultad: "facil", opciones: ["Porque el hormigón resiste compresión y el acero tracción", "Porque abarata siempre el coste de la obra", "Porque el acero sustituye la necesidad de encofrado", "Porque el hormigón por sí solo no fragua"], correcta: 0 },
  { enunciado: "¿Por qué se usa acero corrugado en lugar de liso en las armaduras?", explicacion: "Los resaltos mejoran la adherencia entre acero y hormigón.", dificultad: "media", opciones: ["Porque los resaltos mejoran la adherencia con el hormigón", "Porque es más barato que el acero liso", "Porque no requiere recubrimiento mínimo", "Porque resiste mejor la compresión que el liso"], correcta: 0 },
  { enunciado: "¿Qué función cumple el recubrimiento de una armadura de hormigón armado?", explicacion: "Proteger el acero de la corrosión y el fuego, y garantizar la adherencia.", dificultad: "media", opciones: ["Proteger el acero de la corrosión y garantizar la adherencia", "Aumentar el peso propio del elemento", "Sustituir la necesidad de vibrado del hormigón", "Acelerar el fraguado del hormigón"], correcta: 0 },
  { enunciado: "¿Qué consecuencia tiene un recubrimiento insuficiente en un elemento de hormigón armado?", explicacion: "Facilita la corrosión de la armadura y la fisuración o desprendimiento del hormigón.", dificultad: "media", opciones: ["Facilita la corrosión de la armadura", "Mejora la resistencia a compresión del elemento", "Reduce el tiempo de curado necesario", "No tiene ninguna consecuencia relevante"], correcta: 0 },
  { enunciado: "¿Qué es un encofrado?", explicacion: "El molde temporal que da forma al hormigón fresco mientras fragua.", dificultad: "facil", opciones: ["El molde temporal que da forma al hormigón fresco", "La armadura de acero corrugado del elemento", "El acabado final de una fábrica vista", "El sistema de vibrado del hormigón"], correcta: 0 },
  { enunciado: "¿Para qué sirve el curado del hormigón?", explicacion: "Para que desarrolle correctamente sus propiedades resistentes, protegiéndolo de la desecación.", dificultad: "media", opciones: ["Para que desarrolle correctamente sus propiedades resistentes", "Para acelerar el desencofrado inmediato", "Para sustituir la necesidad de armadura", "Para reducir el recubrimiento necesario"], correcta: 0 },
  { enunciado: "¿Qué es una junta de hormigonado?", explicacion: "La superficie de contacto entre dos hormigonados realizados en momentos distintos.", dificultad: "media", opciones: ["La superficie de contacto entre dos hormigonados distintos", "Una separación para permitir la dilatación térmica", "El molde temporal del hormigón fresco", "El recubrimiento mínimo de una armadura"], correcta: 0 },
  { enunciado: "¿Para qué sirve la vibración del hormigón en su puesta en obra?", explicacion: "Para compactarlo, eliminando el aire ocluido y evitando coqueras.", dificultad: "media", opciones: ["Para compactarlo y evitar coqueras", "Para acelerar el fraguado inicial", "Para reducir la cantidad de cemento necesaria", "Para sustituir el curado posterior"], correcta: 0 },
]);

// ─────────────────────────────────────────────────────────────────────────
// Sección 3: arquetas-contrarrestos-tuberias-abastecimiento
// ─────────────────────────────────────────────────────────────────────────
const S3 = "arquetas-contrarrestos-tuberias-abastecimiento";
console.log(`📝 flashcards (${S3})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Qué es una arqueta en una red de abastecimiento o saneamiento?", reverso: "Una arca de fábrica u hormigón, generalmente registrable, que aloja elementos de la red (válvulas, uniones, contadores) y permite su inspección, maniobra o mantenimiento" },
    { anverso: "¿Qué es un contrarresto en una tubería a presión?", reverso: "Un macizo de hormigón (u otro sistema de anclaje) que se coloca en los puntos donde la tubería cambia de dirección o de sección, para absorber el empuje que genera la presión del fluido en ese punto y evitar el desplazamiento de la tubería" },
    { anverso: "¿Por qué un codo en una tubería a presión necesita contrarresto y un tramo recto no?", reverso: "Porque en un tramo recto las fuerzas de presión se equilibran en direcciones opuestas; en un codo, la presión interna genera un empuje neto en la dirección de la bisectriz del ángulo, que debe ser absorbido por el contrarresto" },
    { anverso: "¿Qué es una TE en una red de tuberías?", reverso: "Una pieza de conexión en forma de T que permite derivar un ramal perpendicular (o en ángulo) desde una conducción principal" },
    { anverso: "¿Qué es un cono de reducción en una tubería?", reverso: "Una pieza que conecta dos tramos de tubería de diámetros distintos, adaptando la sección de forma progresiva" },
    { anverso: "¿Qué es una brida ciega en una conducción?", reverso: "Una pieza plana que cierra completamente el extremo de una tubería embridada, utilizada para taponar un ramal, dejar preparada una futura ampliación o aislar un tramo de la red" },
    { anverso: "¿Qué factores condicionan el dimensionamiado de un contrarresto en un nudo de tubería?", reverso: "El diámetro de la tubería, la presión de servicio, el ángulo del cambio de dirección y las características del terreno de apoyo, que deben resistir el empuje transmitido" },
    { anverso: "¿Qué es un macizo de anclaje en el contexto de redes de abastecimiento?", reverso: "Un elemento de hormigón u otro material resistente que fija una pieza de la conducción (válvula, brida, codo) al terreno o a una estructura, impidiendo su desplazamiento por los esfuerzos que soporta" },
    { anverso: "¿Está disponible públicamente el pliego de prescripciones técnicas del Ayuntamiento de Zaragoza citado en el temario oficial para arquetas, contrarrestos y macizos de tuberías de abastecimiento?", reverso: "No. Es un documento técnico interno del Ayuntamiento de Zaragoza; no se ha localizado publicado en boletines oficiales ni en su sede electrónica, y su contenido concreto no puede verificarse ni reproducirse aquí" },
    { anverso: "¿Qué conocimiento general sí es verificable sobre estos elementos, al margen del pliego interno no disponible?", reverso: "Los conceptos técnicos consolidados de arqueta, contrarresto, TE, cono de reducción y brida ciega, y los principios generales de hormigón armado del Código Estructural (RD 470/2021) que rigen su ejecución, aunque las prescripciones dimensionales concretas del Ayuntamiento de Zaragoza no sean públicas" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })),
);

console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es una arqueta en una red de abastecimiento?", explicacion: "Un arca registrable que aloja elementos de la red y permite su inspección o mantenimiento.", dificultad: "facil", opciones: ["Un arca registrable que aloja elementos de la red", "Un macizo de hormigón que absorbe empujes", "Una pieza de conexión en forma de T", "Un tapón que cierra el extremo de una tubería"], correcta: 0 },
  { enunciado: "¿Para qué sirve un contrarresto en una tubería a presión?", explicacion: "Para absorber el empuje generado por la presión del fluido en los cambios de dirección o sección.", dificultad: "media", opciones: ["Para absorber el empuje en cambios de dirección o sección", "Para registrar e inspeccionar la red", "Para derivar un ramal perpendicular", "Para reducir el diámetro de la tubería"], correcta: 0 },
  { enunciado: "¿Por qué un codo necesita contrarresto y un tramo recto no?", explicacion: "Porque en el codo la presión genera un empuje neto que debe absorberse, mientras que en el tramo recto las fuerzas se equilibran.", dificultad: "dificil", opciones: ["Porque en el codo la presión genera un empuje neto no equilibrado", "Porque los tramos rectos no soportan presión", "Porque los codos siempre tienen mayor diámetro", "Porque el contrarresto sustituye a la brida ciega"], correcta: 0 },
  { enunciado: "¿Qué es una TE en una red de tuberías?", explicacion: "Una pieza de conexión que permite derivar un ramal desde la conducción principal.", dificultad: "facil", opciones: ["Una pieza de conexión que permite derivar un ramal", "Una pieza que reduce el diámetro de la tubería", "Un macizo de hormigón de anclaje", "Un tapón ciego del extremo de la red"], correcta: 0 },
  { enunciado: "¿Qué es un cono de reducción?", explicacion: "Una pieza que conecta dos tramos de tubería de diámetros distintos.", dificultad: "media", opciones: ["Una pieza que conecta tramos de distinto diámetro", "Una arqueta de registro de válvulas", "Un elemento que absorbe empujes en codos", "Una pieza que cierra completamente un ramal"], correcta: 0 },
  { enunciado: "¿Para qué se emplea una brida ciega en una conducción?", explicacion: "Para taponar un ramal, dejar preparada una ampliación futura o aislar un tramo de la red.", dificultad: "media", opciones: ["Para taponar un ramal o aislar un tramo de la red", "Para derivar un nuevo ramal perpendicular", "Para reducir progresivamente el diámetro", "Para registrar el estado de una válvula"], correcta: 0 },
  { enunciado: "¿Qué factores condicionan el dimensionamiento de un contrarresto?", explicacion: "Diámetro de la tubería, presión de servicio, ángulo del cambio de dirección y características del terreno.", dificultad: "media", opciones: ["Diámetro, presión, ángulo del cambio de dirección y terreno", "Únicamente el color de la tubería", "Solo el precio del hormigón empleado", "Exclusivamente la profundidad de la zanja"], correcta: 0 },
  { enunciado: "¿Está publicado el pliego de prescripciones técnicas del Ayuntamiento de Zaragoza citado en el temario para estos elementos?", explicacion: "No; es un documento técnico interno no localizado en fuentes públicas.", dificultad: "media", opciones: ["No, es un documento técnico interno no publicado", "Sí, se publica junto a la convocatoria cada año", "Sí, figura como anexo del Código Estructural", "Sí, está disponible en el BOE"], correcta: 0 },
]);

// ─────────────────────────────────────────────────────────────────────────
// Vincular a la oposición (Tema 12)
// ─────────────────────────────────────────────────────────────────────────
console.log(`\n🔗 Vinculando ${TEMA} como Tema 12 de ${OPOSICION}...`);
await upsert(
  "tema_oposicion",
  [
    {
      tema_slug: TEMA,
      oposicion_slug: OPOSICION,
      bloque_id: BLOQUE_2_ID,
      numero: 12,
      orden: 12,
      es_premium: false,
      publicado: true,
      secciones_incluidas: null,
    },
  ],
  "tema_slug,oposicion_slug"
);

console.log("\n✅ tema-50 creado y vinculado como Tema 12 de Oficial Albañil.");
