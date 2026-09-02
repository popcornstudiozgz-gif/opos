/**
 * Crea tema-155: "Metalurgia básica" — Tema 7 (numero=7, bloque-2) de
 * Oficial Herrero (Ayto. Zaragoza). Primer tema de la parte específica
 * de esta oposición.
 *
 * Corresponde al TEMA 5 oficial del Anexo I (bases2110.pdf, línea 1249):
 *   "Metalurgia básica. Metales, acero al carbono y otros. Dilataciones
 *   y contracciones. Preparación de bordes. Recubrimientos.
 *   Galvanización. Oxidación de Metales."
 *
 * Conocimiento técnico consolidado de metalurgia básica y del oficio de
 * herrero (metales, acero al carbono, dilatación térmica, recubrimientos
 * anticorrosivos, galvanización, oxidación): sin una ley española que lo
 * regule como tal — mismo criterio ya aplicado en Oficial Carpintero
 * (ver scripts/seed-tema-108-*.mjs y siguientes) para contenido técnico
 * del oficio sin ley única. Búsqueda previa realizada conforme al
 * estándar de sourcing del proyecto: no existe reglamento español que
 * regule las propiedades metalúrgicas de los materiales como tales.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-155-metalurgia-basica.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-155";
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
  titulo: "Metalurgia básica",
  descripcion: "Metales, acero al carbono y otros. Dilataciones y contracciones. Preparación de bordes. Recubrimientos. Galvanización. Oxidación de metales.",
  contenido: "Desarrolla los fundamentos de metalurgia básica necesarios para el oficio de herrero: los metales más habituales en el taller (acero al carbono y otros), el fenómeno de dilatación y contracción térmica de los metales, la preparación de bordes previa a la unión de piezas, los recubrimientos protectores y la galvanización, y la oxidación de los metales como proceso de corrosión.",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "Metales, acero al carbono y otros. Dilataciones y contracciones", seccion: "metales-acero-carbono-dilataciones-contracciones", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Preparación de bordes, recubrimientos y galvanización", seccion: "preparacion-bordes-recubrimientos-galvanizacion", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Oxidación de metales", seccion: "oxidacion-metales", articulos: "Conceptos fundamentales" },
  ],
}]);

const S1 = "metales-acero-carbono-dilataciones-contracciones";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es el acero al carbono?", reverso: "Una aleación de hierro y carbono (con un contenido de carbono generalmente inferior al 2%), el material metálico más empleado en el taller de herrería por su equilibrio entre resistencia, dureza y facilidad de trabajo" },
  { anverso: "¿Cómo influye el porcentaje de carbono en las propiedades del acero?", reverso: "A mayor porcentaje de carbono, mayor dureza y resistencia mecánica, pero también mayor fragilidad y menor soldabilidad; a menor porcentaje, el acero resulta más dúctil, maleable y fácil de soldar" },
  { anverso: "¿Qué otros metales, además del acero al carbono, son habituales en el taller de herrería?", reverso: "El hierro fundido, el acero inoxidable, el aluminio y sus aleaciones, y en menor medida el cobre y el latón, cada uno con propiedades y usos específicos" },
  { anverso: "¿Qué es la dilatación térmica de un metal?", reverso: "El aumento de las dimensiones (longitud, superficie o volumen) de una pieza metálica al elevarse su temperatura, debido al mayor movimiento de sus átomos" },
  { anverso: "¿Qué es la contracción térmica de un metal?", reverso: "La disminución de las dimensiones de una pieza metálica al reducirse su temperatura, fenómeno inverso a la dilatación" },
  { anverso: "¿Por qué debe tener en cuenta el herrero la dilatación y contracción térmica al soldar o unir piezas metálicas?", reverso: "Porque el calentamiento localizado propio de la soldadura provoca dilataciones y contracciones no uniformes que pueden generar tensiones internas, deformaciones o grietas en la pieza si no se controlan adecuadamente" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es el acero al carbono?", explicacion: "Una aleación de hierro y carbono, el material más empleado en el taller de herrería.", dificultad: "facil", opciones: ["Una aleación de hierro y carbono", "Una aleación de cobre y estaño", "Un metal puro sin ninguna aleación", "Una aleación exclusiva de aluminio y magnesio"], correcta: 0 },
  { enunciado: "¿Cómo influye un mayor porcentaje de carbono en las propiedades del acero?", explicacion: "Aumenta la dureza y resistencia, pero también la fragilidad y reduce la soldabilidad.", dificultad: "media", opciones: ["Aumenta la dureza y la fragilidad, reduce la soldabilidad", "Reduce la dureza sin ninguna otra consecuencia", "No tiene ninguna influencia sobre las propiedades del acero", "Aumenta exclusivamente la conductividad eléctrica del acero"], correcta: 0 },
  { enunciado: "¿Qué es la dilatación térmica de un metal?", explicacion: "El aumento de sus dimensiones al elevarse la temperatura.", dificultad: "facil", opciones: ["El aumento de sus dimensiones al elevarse la temperatura", "La disminución de sus dimensiones al elevarse la temperatura", "El cambio de color de la pieza al enfriarse", "La pérdida de peso de la pieza al calentarse"], correcta: 0 },
  { enunciado: "¿Qué es la contracción térmica de un metal?", explicacion: "La disminución de sus dimensiones al reducirse la temperatura.", dificultad: "facil", opciones: ["La disminución de sus dimensiones al reducirse la temperatura", "El aumento de sus dimensiones al reducirse la temperatura", "El aumento de su dureza al enfriarse bruscamente", "La pérdida total de sus propiedades mecánicas"], correcta: 0 },
  { enunciado: "¿Por qué debe tener en cuenta el herrero la dilatación y contracción al soldar piezas metálicas?", explicacion: "El calentamiento localizado puede generar tensiones, deformaciones o grietas si no se controla.", dificultad: "media", opciones: ["Puede generar tensiones, deformaciones o grietas en la pieza", "No tiene ninguna relevancia práctica en el proceso de soldadura", "Solo es relevante en piezas de aluminio, nunca de acero", "Solo es relevante si la pieza se suelda en exterior"], correcta: 0 },
]);

const S2 = "preparacion-bordes-recubrimientos-galvanizacion";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es la preparación de bordes en metalurgia?", reverso: "El mecanizado o conformado previo de los bordes de dos piezas metálicas (mediante biselado, chaflanado u otras técnicas) para facilitar y garantizar la calidad de la unión posterior, habitualmente por soldadura" },
  { anverso: "¿Por qué es importante una correcta preparación de bordes antes de soldar dos piezas?", reverso: "Porque permite que el material de aportación penetre correctamente en toda la unión, garantizando una soldadura resistente y sin defectos internos (falta de penetración, poros)" },
  { anverso: "¿Qué es un recubrimiento metálico protector?", reverso: "Una capa de otro material (metálico o no metálico) aplicada sobre la superficie de una pieza para protegerla frente a la corrosión, el desgaste u otros agentes agresivos" },
  { anverso: "¿Qué es la galvanización?", reverso: "Un proceso de recubrimiento de una pieza de acero o hierro con una capa de zinc, que protege el metal base frente a la oxidación mediante protección de barrera y protección catódica o galvánica" },
  { anverso: "¿Qué es la galvanización en caliente (por inmersión)?", reverso: "El proceso de galvanización en el que la pieza se sumerge en un baño de zinc fundido, formando una capa de recubrimiento especialmente resistente y duradera, habitual en elementos de herrería expuestos a la intemperie" },
  { anverso: "¿Qué es la protección catódica o galvánica que aporta el zinc en una pieza galvanizada?", reverso: "El fenómeno por el cual el zinc, al ser un metal menos noble que el acero, se corroe preferentemente (se sacrifica) protegiendo así al acero base incluso si el recubrimiento presenta algún pequeño daño o arañazo" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es la preparación de bordes en metalurgia?", explicacion: "El conformado previo de los bordes de dos piezas para facilitar su unión posterior.", dificultad: "facil", opciones: ["El conformado previo de los bordes para facilitar su unión", "El pulido final de la pieza tras la soldadura", "El proceso de galvanización de una pieza terminada", "La medición final de las dimensiones de una pieza"], correcta: 0 },
  { enunciado: "¿Por qué es importante preparar correctamente los bordes antes de soldar?", explicacion: "Permite que el material de aportación penetre correctamente, evitando defectos.", dificultad: "media", opciones: ["Permite que el material de aportación penetre correctamente", "No tiene ninguna influencia sobre la calidad de la soldadura", "Solo es relevante en soldaduras de aluminio", "Reduce el tiempo total de enfriamiento de la pieza"], correcta: 0 },
  { enunciado: "¿Qué es la galvanización?", explicacion: "Un proceso de recubrimiento de acero o hierro con una capa de zinc.", dificultad: "facil", opciones: ["Un proceso de recubrimiento con una capa de zinc", "Un proceso de calentamiento sin ningún recubrimiento adicional", "Un proceso exclusivo de corte de metales", "Un proceso de medición de la dureza de un material"], correcta: 0 },
  { enunciado: "¿Qué caracteriza a la galvanización en caliente por inmersión?", explicacion: "La pieza se sumerge en un baño de zinc fundido.", dificultad: "media", opciones: ["La pieza se sumerge en un baño de zinc fundido", "Se aplica una pintura de zinc con brocha o rodillo", "Se proyecta zinc en polvo mediante aire comprimido", "Se aplica una lámina de zinc adhesiva sobre la pieza"], correcta: 0 },
  { enunciado: "¿Qué es la protección catódica o galvánica que aporta el zinc en una pieza galvanizada?", explicacion: "El zinc se corroe preferentemente, protegiendo al acero base incluso ante pequeños daños.", dificultad: "dificil", opciones: ["El zinc se corroe preferentemente, protegiendo al acero base", "El acero se corroe siempre antes que el zinc en cualquier caso", "El zinc impide cualquier tipo de corrosión de forma absoluta", "La protección catódica no guarda relación con la corrosión"], correcta: 0 },
]);

const S3 = "oxidacion-metales";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es la oxidación de un metal?", reverso: "Una reacción química en la que el metal pierde electrones al reaccionar con el oxígeno (u otro agente oxidante) del ambiente, formando un óxido superficial" },
  { anverso: "¿Qué es la corrosión, en relación con la oxidación de los metales?", reverso: "El deterioro progresivo de un metal como consecuencia de reacciones químicas o electroquímicas (entre ellas, la oxidación) con su entorno, que puede llegar a comprometer la integridad estructural de la pieza" },
  { anverso: "¿Por qué el hierro y el acero son especialmente propensos a la oxidación (formación de herrumbre u óxido de hierro)?", reverso: "Porque el óxido de hierro que se forma no es compacto ni adherente, se desprende con facilidad y expone continuamente nueva superficie metálica al ambiente, permitiendo que la oxidación progrese en profundidad" },
  { anverso: "¿Qué diferencia presenta, frente al hierro, la oxidación superficial del aluminio?", reverso: "El óxido de aluminio forma una capa fina, compacta y adherente que protege al metal base de una oxidación posterior más profunda, a diferencia del óxido de hierro" },
  { anverso: "¿Qué factores ambientales aceleran habitualmente la oxidación de una pieza de acero sin protección?", reverso: "La humedad ambiental, la presencia de sales (por ejemplo, en ambientes costeros o tras el uso de sal de deshielo), y la contaminación atmosférica con agentes ácidos" },
  { anverso: "¿Qué medidas puede aplicar el herrero para prevenir la oxidación de una pieza de acero terminada?", reverso: "Aplicar recubrimientos protectores (pintura, galvanización, imprimaciones antioxidantes), mantener la pieza seca y limpia, y emplear aceros con mayor resistencia a la corrosión (aceros inoxidables o aceros corten) cuando la aplicación lo requiera" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es la oxidación de un metal?", explicacion: "Una reacción química en la que el metal pierde electrones al reaccionar con el oxígeno del ambiente.", dificultad: "facil", opciones: ["Una reacción química con el oxígeno del ambiente", "Un proceso exclusivamente mecánico sin reacción química", "Un aumento de la dureza del metal sin ningún cambio químico", "Un proceso que solo afecta a los metales no férricos"], correcta: 0 },
  { enunciado: "¿Por qué el hierro es especialmente propenso a la oxidación progresiva?", explicacion: "Su óxido no es compacto ni adherente y se desprende, exponiendo nueva superficie.", dificultad: "media", opciones: ["Su óxido no es compacto ni adherente y se desprende", "Su óxido es completamente impermeable al oxígeno del ambiente", "El hierro nunca reacciona químicamente con el oxígeno", "El hierro es inmune a la humedad ambiental"], correcta: 0 },
  { enunciado: "¿Qué diferencia presenta el óxido de aluminio frente al óxido de hierro?", explicacion: "Forma una capa fina, compacta y adherente que protege al metal base.", dificultad: "dificil", opciones: ["Forma una capa fina, compacta y adherente protectora", "Se desprende con la misma facilidad que el óxido de hierro", "No se forma nunca sobre las piezas de aluminio", "Es mucho más grueso y poroso que el óxido de hierro"], correcta: 0 },
  { enunciado: "¿Qué factores ambientales aceleran la oxidación de una pieza de acero sin protección?", explicacion: "Humedad, presencia de sales y contaminación atmosférica ácida.", dificultad: "media", opciones: ["Humedad, sales y contaminación atmosférica ácida", "Únicamente la temperatura ambiente elevada", "Únicamente la exposición directa al sol", "Ningún factor ambiental influye en la oxidación del acero"], correcta: 0 },
  { enunciado: "¿Qué medida puede aplicar el herrero para prevenir la oxidación de una pieza de acero terminada?", explicacion: "Aplicar recubrimientos protectores como pintura o galvanización.", dificultad: "facil", opciones: ["Aplicar recubrimientos protectores como pintura o galvanización", "Aumentar la humedad ambiental de almacenamiento", "Evitar cualquier tipo de limpieza de la pieza terminada", "Reducir el espesor de la pieza metálica"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 7 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 7, orden: 7, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-155 creado y vinculado como Tema 7 de Oficial Herrero.");
