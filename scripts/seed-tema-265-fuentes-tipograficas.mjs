/**
 * Crea tema-265: "Fuentes Tipográficas. Tipos. Usos. Normativa" — Tema
 * 21 (numero=21, bloque-2) de Oficial Pintor, Especialidad Gráfica
 * (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 19 oficial del Anexo I (bases2110.pdf, línea
 * 1539): "Fuentes Tipográficas. Tipos. Usos. Normativa."
 *
 * Fuentes verificadas en esta sesión mediante búsqueda:
 * - Ley 20/2003, de 7 de julio, de Protección Jurídica del Diseño
 *   Industrial (BOE-A-2003-13615): su artículo de definiciones incluye
 *   expresamente "los caracteres tipográficos" dentro del concepto de
 *   "producto" protegible como diseño industrial, siendo esta —y no la
 *   Ley de Propiedad Intelectual— la norma española que ampara
 *   específicamente el diseño de una tipografía cuando se registra.
 * - Real Decreto Legislativo 1/1996, de 12 de abril, Texto Refundido de
 *   la Ley de Propiedad Intelectual (BOE-A-1996-8930): no menciona las
 *   tipografías de forma expresa, pero puede proteger una fuente
 *   tipográfica como obra si reúne suficiente originalidad y
 *   creatividad; ambas protecciones (diseño industrial y propiedad
 *   intelectual) son compatibles entre sí, según confirma la propia Ley
 *   20/2003. Se desarrolla en el tema la diferencia práctica entre
 *   ambos regímenes de protección.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-265-fuentes-tipograficas.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-265";
const OPOSICION = "oficial-pintor-grafica-ayto-zaragoza";
const BLOQUE_2_ID = "1e5d5916-cf4a-4920-9175-579f18034ad6";
const BOE_LEY_20_2003 = "https://www.boe.es/buscar/act.php?id=BOE-A-2003-13615";
const BOE_LPI_1996 = "https://www.boe.es/buscar/act.php?id=BOE-A-1996-8930";

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
  titulo: "Fuentes Tipográficas: Tipos, Usos y Normativa",
  descripcion: "Clasificación de las familias tipográficas. Criterios de uso según el soporte y el mensaje. Protección legal de las fuentes tipográficas: diseño industrial y propiedad intelectual.",
  contenido: "Desarrolla la clasificación de las fuentes tipográficas (serif, sans-serif, script, display, monoespaciadas), los criterios técnicos y comunicativos para elegir una tipografía según el soporte de rotulación y el mensaje a transmitir, y el marco normativo español que protege el diseño de una tipografía: la Ley 20/2003 de Protección Jurídica del Diseño Industrial, que incluye expresamente los caracteres tipográficos entre los productos protegibles como diseño, y el Texto Refundido de la Ley de Propiedad Intelectual (RDLeg 1/1996), aplicable cuando la fuente reúne suficiente originalidad como obra. Incluye también las condiciones habituales de licencia de uso de una fuente tipográfica comercial.",
  enlaces_boe: [
    { titulo: "Ley 20/2003, de 7 de julio, de Protección Jurídica del Diseño Industrial (BOE-A-2003-13615)", url: BOE_LEY_20_2003 },
    { titulo: "Real Decreto Legislativo 1/1996, Texto Refundido de la Ley de Propiedad Intelectual (BOE-A-1996-8930)", url: BOE_LPI_1996 },
  ],
  indice_estudio: [
    { url: "", titulo: "Clasificación de las familias tipográficas", seccion: "clasificacion-familias-tipograficas", articulos: "Conocimiento técnico del sector" },
    { url: "", titulo: "Criterios de uso de la tipografía en rotulación", seccion: "criterios-uso-tipografia", articulos: "Conocimiento técnico del sector" },
    { url: BOE_LEY_20_2003, titulo: "Normativa de protección de las fuentes tipográficas", seccion: "normativa-proteccion-tipografias", articulos: "Ley 20/2003 (definiciones); RDLeg 1/1996" },
  ],
}]);

const S1 = "clasificacion-familias-tipograficas";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es una tipografía con serifa (serif), una de las grandes familias tipográficas clásicas?", reverso: "Una tipografía cuyos caracteres presentan pequeños remates o trazos terminales (serifas) en los extremos de las letras, tradicionalmente asociada a la impresión de textos largos por facilitar, según numerosos estudios, la lectura fluida en soporte impreso" },
  { anverso: "¿Qué es una tipografía de palo seco (sans-serif), en contraste con la tipografía con serifa?", reverso: "Una tipografía cuyos caracteres carecen de remates terminales, de trazo generalmente más limpio y geométrico, ampliamente empleada en rotulación y en pantallas por su buena legibilidad a distancia y en tamaños reducidos" },
  { anverso: "¿Qué es una tipografía script o caligráfica?", reverso: "Una familia tipográfica que imita la escritura manual o caligráfica, con trazos unidos y variables en grosor, empleada habitualmente en rótulos que buscan transmitir cercanía, elegancia o un carácter artesanal, pero de legibilidad reducida a distancia o en tamaños pequeños" },
  { anverso: "¿Qué es una tipografía display o decorativa?", reverso: "Una familia tipográfica diseñada específicamente para llamar la atención en titulares, logotipos o rótulos de gran tamaño, con formas marcadas o poco convencionales, no pensada para textos largos por resultar fatigosa en lectura continuada" },
  { anverso: "¿Qué es una tipografía monoespaciada?", reverso: "Una tipografía en la que todos los caracteres ocupan exactamente el mismo ancho horizontal, independientemente de su forma, empleada tradicionalmente en máquinas de escribir y en la actualidad en código informático o en composiciones que requieren alineación exacta entre líneas" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué caracteriza a una tipografía con serifa (serif)?", explicacion: "Presenta pequeños remates o trazos terminales en los extremos de las letras.", dificultad: "facil", opciones: ["Presenta pequeños remates en los extremos de las letras", "Carece por completo de remates terminales en sus caracteres", "Imita la escritura manual o caligráfica con trazos unidos", "Ocupa siempre el mismo ancho horizontal en cada carácter"], correcta: 0 },
  { enunciado: "¿Qué caracteriza a una tipografía sans-serif o de palo seco?", explicacion: "Carece de remates terminales, de trazo limpio y geométrico.", dificultad: "facil", opciones: ["Carece de remates terminales, de trazo limpio y geométrico", "Presenta siempre remates marcados en cada carácter", "Imita siempre la escritura manual o caligráfica", "Se emplea exclusivamente en textos largos impresos"], correcta: 0 },
  { enunciado: "¿Para qué se emplea habitualmente una tipografía script o caligráfica en rotulación?", explicacion: "Para transmitir cercanía, elegancia o carácter artesanal, con legibilidad reducida a distancia.", dificultad: "media", opciones: ["Para transmitir cercanía o carácter artesanal en el rótulo", "Para maximizar la legibilidad a gran distancia del rótulo", "Exclusivamente para textos largos de lectura continuada", "Exclusivamente en composiciones que exigen alineación exacta"], correcta: 0 },
  { enunciado: "¿Para qué está diseñada una tipografía display o decorativa?", explicacion: "Para llamar la atención en titulares, logotipos o rótulos de gran tamaño, no para texto largo.", dificultad: "media", opciones: ["Para llamar la atención en titulares o rótulos de gran tamaño", "Para textos largos por resultar cómoda en lectura continuada", "Exclusivamente para código informático o alineación exacta", "Exclusivamente para imitar la escritura manual caligráfica"], correcta: 0 },
  { enunciado: "¿Qué caracteriza a una tipografía monoespaciada?", explicacion: "Todos los caracteres ocupan exactamente el mismo ancho horizontal.", dificultad: "media", opciones: ["Todos los caracteres ocupan el mismo ancho horizontal", "Cada carácter ocupa un ancho distinto según su forma", "Se emplea exclusivamente en rótulos de gran formato", "Carece siempre de cualquier tipo de remate terminal"], correcta: 0 },
]);

const S2 = "criterios-uso-tipografia";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Por qué conviene priorizar una tipografía sans-serif de trazo grueso en un rótulo destinado a leerse desde un vehículo en movimiento?", reverso: "Porque su trazo limpio y sin remates facilita el reconocimiento rápido de la forma de las letras a distancia y en condiciones de visión breve, a diferencia de tipografías con serifa fina o de trazos muy decorativos, que pierden legibilidad cuanto mayor es la distancia o menor el tiempo de lectura disponible" },
  { anverso: "¿Qué es el interletraje (kerning/tracking), parámetro tipográfico relevante al componer un rótulo de gran formato?", reverso: "El espacio horizontal entre los caracteres de un texto; un interletraje mal ajustado (demasiado apretado o demasiado abierto) puede dificultar la lectura del rótulo o generar un efecto visual desequilibrado, especialmente perceptible cuando el texto se amplía a gran tamaño" },
  { anverso: "¿Por qué conviene limitar el número de familias tipográficas distintas empleadas en un mismo rótulo o cartel?", reverso: "Porque combinar demasiadas tipografías distintas en una misma composición genera una sensación de desorden visual y dificulta que el mensaje se perciba como un conjunto coherente; el criterio habitual del sector recomienda no combinar más de dos o tres familias tipográficas por composición" },
  { anverso: "¿Qué relación existe entre el grosor del trazo de una tipografía (peso: light, regular, bold, black) y su uso en un rótulo?", reverso: "Un peso más grueso (bold, black) aporta mayor visibilidad y contraste a distancia, adecuado para titulares o el nombre principal del rótulo, mientras que un peso más fino (light, regular) resulta más adecuado para textos secundarios o información complementaria que se lee más de cerca" },
  { anverso: "¿Por qué es importante comprobar la legibilidad de una tipografía sobre el color de fondo concreto del soporte antes de aplicarla en un rótulo final?", reverso: "Porque el contraste entre el color del texto y el color del fondo determina en gran medida la legibilidad real del rótulo, pudiendo una combinación de colores con bajo contraste hacer casi ilegible una tipografía que en otras condiciones resultaría perfectamente legible" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Por qué conviene una sans-serif de trazo grueso en un rótulo leído desde un vehículo en movimiento?", explicacion: "Facilita el reconocimiento rápido a distancia y en tiempo de lectura breve.", dificultad: "media", opciones: ["Facilita el reconocimiento rápido a distancia y en poco tiempo", "Una tipografía script siempre resulta más legible a distancia", "El tipo de tipografía nunca influye en la legibilidad a distancia", "Solo importa el tamaño del texto, nunca el tipo de tipografía"], correcta: 0 },
  { enunciado: "¿Qué es el interletraje (kerning/tracking)?", explicacion: "El espacio horizontal entre los caracteres de un texto.", dificultad: "media", opciones: ["El espacio horizontal entre los caracteres de un texto", "El espacio vertical entre las líneas de un párrafo", "El grosor del trazo de cada carácter tipográfico", "El color aplicado al texto de un rótulo"], correcta: 0 },
  { enunciado: "¿Cuántas familias tipográficas distintas recomienda como máximo el criterio habitual del sector en una misma composición?", explicacion: "No combinar más de dos o tres familias tipográficas por composición.", dificultad: "media", opciones: ["No más de dos o tres familias tipográficas por composición", "No existe ningún límite recomendado por el sector", "Únicamente puede emplearse una sola tipografía por composición", "Al menos cinco familias distintas para dar variedad visual"], correcta: 0 },
  { enunciado: "¿Qué peso tipográfico resulta más adecuado para el nombre principal de un rótulo?", explicacion: "Un peso grueso (bold, black), que aporta mayor visibilidad y contraste a distancia.", dificultad: "facil", opciones: ["Un peso grueso (bold o black), con mayor visibilidad", "Un peso muy fino (light), siempre más legible a distancia", "El peso tipográfico nunca influye en la visibilidad del rótulo", "Un peso intermedio idéntico para todo el texto del rótulo"], correcta: 0 },
  { enunciado: "¿Por qué es importante comprobar el contraste entre el color del texto y el del fondo del soporte?", explicacion: "El contraste determina en gran medida la legibilidad real del rótulo.", dificultad: "media", opciones: ["El contraste determina en gran medida la legibilidad real", "El color de fondo nunca afecta a la legibilidad del texto", "Solo resulta relevante en soportes de color oscuro", "La legibilidad depende exclusivamente del tamaño del texto"], correcta: 0 },
]);

const S3 = "normativa-proteccion-tipografias";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué norma española protege específicamente el diseño de una fuente tipográfica cuando se registra, incluyendo expresamente los caracteres tipográficos en su definición de producto protegible?", reverso: "La Ley 20/2003, de 7 de julio, de Protección Jurídica del Diseño Industrial (BOE-A-2003-13615), cuyo artículo de definiciones incluye de forma explícita \"los caracteres tipográficos\" dentro del concepto de \"producto\" susceptible de protección como diseño industrial mediante su registro" },
  { anverso: "¿Puede una fuente tipográfica protegerse también mediante la Ley de Propiedad Intelectual (RDLeg 1/1996), aunque esta no la mencione de forma expresa?", reverso: "Sí: si la fuente tipográfica reúne suficiente originalidad y creatividad para considerarse una obra propia de su autor, puede protegerse como propiedad intelectual, siendo esta protección compatible con la protección como diseño industrial registrado según la propia Ley 20/2003" },
  { anverso: "¿Qué implica, en la práctica diaria de un taller de rotulación, que la mayoría de las fuentes tipográficas comerciales se distribuyan bajo una licencia de uso concreta?", reverso: "Que el uso legal de la fuente está condicionado a los términos de esa licencia (por ejemplo, uso personal, uso comercial limitado, o licencia comercial completa), y que emplear una fuente en un rótulo o cartel destinado a la venta sin la licencia comercial adecuada puede constituir una infracción de los derechos del diseñador o distribuidor de la fuente" },
  { anverso: "¿Qué diferencia existe entre una fuente tipográfica de uso libre (por ejemplo, bajo licencia SIL Open Font License) y una fuente propietaria comercial, relevante al elegir tipografía para un trabajo del taller?", reverso: "La fuente de uso libre puede emplearse, modificarse y, según los términos exactos de su licencia, incluso redistribuirse sin coste ni autorización adicional, mientras que la fuente propietaria comercial exige adquirir la licencia correspondiente antes de utilizarla en un trabajo, especialmente si el resultado se destina a un uso comercial" },
  { anverso: "¿Por qué conviene comprobar la licencia de una fuente tipográfica antes de emplearla en un rótulo encargado por un cliente municipal o institucional, y no solo en un encargo estrictamente comercial?", reverso: "Porque muchas licencias distinguen entre uso personal y uso institucional o corporativo (no solo \"comercial\" en sentido estricto de venta directa), de modo que un rótulo institucional puede requerir igualmente una licencia de pago aunque no se trate de un producto puesto a la venta" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué norma española incluye expresamente los caracteres tipográficos como producto protegible?", explicacion: "La Ley 20/2003, de Protección Jurídica del Diseño Industrial (BOE-A-2003-13615).", dificultad: "media", opciones: ["La Ley 20/2003, de Protección Jurídica del Diseño Industrial", "El RDLeg 1/1996, de Propiedad Intelectual, exclusivamente", "Ninguna norma española menciona los caracteres tipográficos", "Un reglamento europeo directamente aplicable en España"], correcta: 0 },
  { enunciado: "¿Puede protegerse una fuente tipográfica también mediante la Ley de Propiedad Intelectual?", explicacion: "Sí, si reúne suficiente originalidad como obra, compatible con la protección como diseño industrial.", dificultad: "dificil", opciones: ["Sí, si reúne suficiente originalidad, y es compatible con la otra protección", "No, la Ley de Propiedad Intelectual excluye expresamente las tipografías", "Solo si la fuente carece de cualquier registro como diseño industrial", "Solo las fuentes de uso libre pueden protegerse de esa forma"], correcta: 0 },
  { enunciado: "¿Qué implica que la mayoría de fuentes comerciales se distribuyan bajo licencia de uso?", explicacion: "El uso legal está condicionado a los términos de esa licencia; usarla sin la licencia adecuada puede ser infracción.", dificultad: "media", opciones: ["El uso legal está condicionado a los términos de la licencia", "Cualquier fuente puede emplearse libremente sin restricción alguna", "Solo las fuentes gratuitas exigen algún tipo de licencia", "La licencia solo aplica si el trabajo se vende directamente"], correcta: 0 },
  { enunciado: "¿Qué diferencia existe entre una fuente de uso libre y una fuente propietaria comercial?", explicacion: "La libre puede emplearse sin coste según su licencia; la propietaria exige adquirir la licencia correspondiente.", dificultad: "media", opciones: ["La libre no exige coste; la propietaria exige adquirir licencia", "Ambos tipos de fuente exigen siempre el mismo tipo de licencia", "La fuente propietaria siempre puede usarse sin ninguna licencia", "La fuente libre nunca puede emplearse en un uso comercial"], correcta: 0 },
  { enunciado: "¿Por qué conviene comprobar la licencia de una fuente incluso en un encargo institucional, no solo comercial?", explicacion: "Muchas licencias distinguen uso personal de uso institucional/corporativo, exigiendo licencia de pago igualmente.", dificultad: "dificil", opciones: ["Muchas licencias exigen licencia de pago también para uso institucional", "Los encargos institucionales nunca están sujetos a ninguna licencia", "Solo los encargos de venta directa requieren licencia comercial", "La licencia de una fuente nunca distingue el tipo de cliente final"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 21 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 21, orden: 21, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-265 creado y vinculado como Tema 21 de Oficial Pintor Gráfica.");
