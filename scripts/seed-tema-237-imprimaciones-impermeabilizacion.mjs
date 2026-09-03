/**
 * Crea tema-237: "Imprimaciones, productos de impermeabilización y sus
 * disolventes" — Tema 9 (numero=9, bloque-2) de Oficial Pintor,
 * Especialidad General (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 7 oficial del Anexo I (bases2110.pdf, línea
 * 1451): "Imprimaciones, productos de impermeabilización y sus
 * disolventes. Tipos. Usos. Métodos de aplicación. Fichas Técnicas.
 * Normativa."
 *
 * Normativa: RD 227/2006 (BOE-A-2006-3377, COV) y Reglamento CLP
 * (DOUE-L-2008-82637), ya citados y verificados en tema-235/236, ambos
 * de aplicación a las imprimaciones e impermeabilizantes como productos
 * químicos de pintura. El resto (tipos y usos) es conocimiento técnico
 * consolidado del oficio.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-237-imprimaciones-impermeabilizacion.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-237";
const OPOSICION = "oficial-pintor-general-ayto-zaragoza";
const BLOQUE_2_ID = "77506e2f-f4c6-4512-8bf8-99d0b3bbbafd";

const RD_227_2006 = "https://www.boe.es/buscar/act.php?id=BOE-A-2006-3377";
const REGLAMENTO_CLP = "https://www.boe.es/buscar/doc.php?id=DOUE-L-2008-82637";

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
  titulo: "Imprimaciones, productos de impermeabilización y sus disolventes",
  descripcion: "Tipos de imprimaciones y su función previa a la pintura. Productos de impermeabilización. Disolventes asociados, usos, métodos de aplicación y fichas técnicas.",
  contenido: "Desarrolla las imprimaciones, como capa previa que mejora la adherencia y sella la superficie antes de aplicar la pintura de acabado, y sus distintos tipos según el soporte y el problema a resolver; los productos de impermeabilización, destinados a impedir el paso del agua a través de una superficie; y los disolventes específicos asociados a cada tipo de producto, sus usos, métodos de aplicación y la información de sus fichas técnicas, con referencia a la normativa de límites de COV y de clasificación de productos químicos ya introducida en temas anteriores.",
  enlaces_boe: [
    { url: RD_227_2006, titulo: "RD 227/2006 — límites de COV en pinturas y barnices" },
    { url: REGLAMENTO_CLP, titulo: "Reglamento (CE) 1272/2008 (CLP) — clasificación, etiquetado y envasado" },
  ],
  indice_estudio: [
    { url: "", titulo: "Imprimaciones: tipos y función previa a la pintura", seccion: "imprimaciones-tipos-funcion", articulos: "Conocimiento técnico del oficio" },
    { url: "", titulo: "Productos de impermeabilización: tipos y usos", seccion: "productos-impermeabilizacion-tipos-usos", articulos: "Conocimiento técnico del oficio" },
    { url: RD_227_2006, titulo: "Disolventes asociados, métodos de aplicación y fichas técnicas", seccion: "disolventes-asociados-metodos-aplicacion-fichas", articulos: "RD 227/2006, Reglamento CLP" },
  ],
}]);

const S1 = "imprimaciones-tipos-funcion";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es una imprimación, en el proceso de pintura?", reverso: "Un producto que se aplica como primera capa sobre una superficie preparada, antes de la pintura de acabado, con el fin de mejorar la adherencia de las capas siguientes, sellar la porosidad del soporte y homogeneizar su absorción" },
  { anverso: "¿Qué es una imprimación selladora?", reverso: "Una imprimación destinada a cerrar la porosidad de un soporte muy absorbente (como un yeso, un mortero nuevo o una madera porosa), evitando que la pintura de acabado se absorba de forma irregular y presente diferencias de brillo o de tono" },
  { anverso: "¿Qué es una imprimación antioxidante?", reverso: "Una imprimación específica para superficies metálicas, formulada con pigmentos inhibidores de la corrosión (como el fosfato de zinc), que protege el metal de la oxidación antes de aplicar el esmalte o la pintura de acabado" },
  { anverso: "¿Qué es una imprimación fijadora o consolidante?", reverso: "Una imprimación de baja viscosidad que penetra en un soporte disgregado, polvoriento o muy poroso (como un yeso viejo o un mortero degradado), consolidándolo y mejorando su cohesión antes de aplicar posteriores capas de pintura" },
  { anverso: "¿Por qué es especialmente importante aplicar una imprimación antioxidante sobre una superficie metálica antes de pintarla, y no aplicar directamente el esmalte?", reverso: "Porque el esmalte de acabado no ofrece, por sí solo, una protección eficaz frente a la corrosión del metal; sin una imprimación antioxidante previa, la humedad podría iniciar el proceso de oxidación por debajo de la propia película de pintura, comprometiendo su durabilidad" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es una imprimación, en el proceso de pintura?", explicacion: "La primera capa aplicada antes del acabado, que mejora adherencia y sella la porosidad.", dificultad: "facil", opciones: ["La primera capa que mejora la adherencia y sella la porosidad", "La última capa de acabado que aporta el color final", "Un disolvente empleado exclusivamente para limpiar brochas", "Un aditivo que acelera el secado de cualquier pintura"], correcta: 0 },
  { enunciado: "¿Qué es una imprimación selladora?", explicacion: "La que cierra la porosidad de un soporte muy absorbente.", dificultad: "media", opciones: ["La que cierra la porosidad de un soporte muy absorbente", "La que protege exclusivamente superficies metálicas", "La que se aplica exclusivamente sobre pavimentos", "Un tipo de esmalte de acabado brillante"], correcta: 0 },
  { enunciado: "¿Qué es una imprimación antioxidante?", explicacion: "Una imprimación con pigmentos inhibidores de la corrosión para superficies metálicas.", dificultad: "media", opciones: ["Una imprimación con pigmentos inhibidores de la corrosión", "Una imprimación exclusiva para soportes de madera porosa", "Un tipo de disolvente empleado en la limpieza de metales", "Un aditivo que aumenta el brillo de un esmalte"], correcta: 0 },
  { enunciado: "¿Qué es una imprimación fijadora o consolidante?", explicacion: "Una imprimación de baja viscosidad que consolida un soporte disgregado o poroso.", dificultad: "dificil", opciones: ["Una imprimación de baja viscosidad que consolida el soporte", "Una imprimación exclusiva para superficies metálicas nuevas", "Un tipo de esmalte de acabado mate", "Un disolvente exclusivo para pinturas epoxi bicomponente"], correcta: 0 },
  { enunciado: "¿Por qué es importante una imprimación antioxidante antes de pintar una superficie metálica?", explicacion: "El esmalte por sí solo no protege eficazmente frente a la corrosión bajo la propia película.", dificultad: "media", opciones: ["El esmalte solo no protege eficazmente frente a la corrosión", "El esmalte siempre protege igual de bien sin imprimación previa", "La imprimación antioxidante nunca resulta necesaria en metal", "Solo resulta relevante en superficies de madera, no de metal"], correcta: 0 },
]);

const S2 = "productos-impermeabilizacion-tipos-usos";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un producto de impermeabilización, en el ámbito de la edificación?", reverso: "Un material o revestimiento aplicado sobre una superficie (cubierta, terraza, fachada, cimentación) con el fin de impedir o dificultar el paso del agua a su través, protegiendo el elemento constructivo de filtraciones y de la degradación asociada a la humedad" },
  { anverso: "¿Qué es una membrana impermeabilizante líquida?", reverso: "Un producto que se aplica en estado líquido (mediante brocha, rodillo o pistola) y que, tras su secado o curado, forma una película continua, elástica y sin juntas sobre la superficie tratada, adaptándose a geometrías irregulares con facilidad" },
  { anverso: "¿Qué es una pintura impermeabilizante para fachadas (o pintura elástica)?", reverso: "Un tipo de pintura con capacidad de puentear pequeñas fisuras del soporte gracias a su elasticidad, que impide la entrada de agua de lluvia manteniendo al mismo tiempo la transpirabilidad del muro, evitando la retención de humedad en su interior" },
  { anverso: "¿Qué diferencia existe entre impermeabilizar y simplemente pintar una superficie exterior con una pintura convencional?", reverso: "Una pintura convencional protege y decora la superficie, pero no necesariamente impide el paso del agua a su través en presencia de fisuras o de una porosidad elevada; un producto impermeabilizante está formulado y ensayado específicamente para bloquear ese paso de agua, con una elasticidad y un espesor de película adecuados a ese fin" },
  { anverso: "¿Qué precaución debe adoptarse respecto a la transpirabilidad de un producto de impermeabilización aplicado sobre un muro de mampostería o fábrica antigua?", reverso: "Debe elegirse un producto suficientemente transpirable (que permita la salida del vapor de agua del interior del muro), ya que un impermeabilizante totalmente estanco al vapor podría retener humedad en el interior de la fábrica y provocar patologías como desconchones o eflorescencias" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es un producto de impermeabilización?", explicacion: "Un material que impide o dificulta el paso del agua a través de una superficie.", dificultad: "facil", opciones: ["Un material que impide el paso del agua a través de una superficie", "Un material que aporta exclusivamente color a una superficie", "Un disolvente empleado exclusivamente en pinturas epoxi", "Un aditivo que acelera el secado de cualquier pintura"], correcta: 0 },
  { enunciado: "¿Qué es una membrana impermeabilizante líquida?", explicacion: "Un producto que forma una película continua, elástica y sin juntas tras su secado.", dificultad: "media", opciones: ["Un producto que forma una película continua y sin juntas", "Un producto exclusivo para pavimentos industriales", "Un tipo de esmalte de acabado brillante", "Un disolvente exclusivo para limpiar herramientas"], correcta: 0 },
  { enunciado: "¿Qué característica define a una pintura impermeabilizante elástica para fachadas?", explicacion: "Su capacidad de puentear pequeñas fisuras manteniendo la transpirabilidad del muro.", dificultad: "media", opciones: ["Puentea fisuras y mantiene la transpirabilidad del muro", "Carece por completo de cualquier elasticidad", "Impide siempre por completo la transpirabilidad del muro", "Solo puede aplicarse sobre superficies metálicas"], correcta: 0 },
  { enunciado: "¿Qué diferencia existe entre impermeabilizar y pintar con una pintura convencional?", explicacion: "El impermeabilizante está formulado específicamente para bloquear el paso del agua.", dificultad: "dificil", opciones: ["El impermeabilizante bloquea específicamente el paso del agua", "Ambos procesos son exactamente equivalentes en cualquier caso", "Pintar siempre impermeabiliza igual de bien que un impermeabilizante", "Impermeabilizar nunca requiere ninguna preparación previa"], correcta: 0 },
  { enunciado: "¿Qué precaución debe adoptarse al impermeabilizar un muro de fábrica antigua?", explicacion: "Elegir un producto suficientemente transpirable para evitar retener humedad en el interior.", dificultad: "dificil", opciones: ["Elegir un producto suficientemente transpirable", "Elegir siempre el producto menos transpirable disponible", "La transpirabilidad nunca resulta relevante en este caso", "Solo resulta relevante en muros de construcción reciente"], correcta: 0 },
]);

const S3 = "disolventes-asociados-metodos-aplicacion-fichas";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué disolvente resulta habitual para diluir y limpiar herramientas tras el uso de una imprimación o pintura al agua?", reverso: "El agua, dado que las imprimaciones y pinturas formuladas en base acuosa se diluyen y se limpian con agua, a diferencia de las formuladas en base disolvente, que requieren un disolvente orgánico específico" },
  { anverso: "¿Qué tipo de disolvente suele requerir una imprimación antioxidante formulada en base disolvente?", reverso: "Un disolvente orgánico específico (como el aguarrás mineral o white spirit), indicado en su ficha técnica, empleado tanto para ajustar la viscosidad de aplicación como para la limpieza de las herramientas tras su uso" },
  { anverso: "¿Qué información de la ficha técnica de una imprimación resulta especialmente relevante antes de aplicar la pintura de acabado sobre ella?", reverso: "El tiempo de secado y el tiempo máximo de repintado, que indican el intervalo dentro del cual debe aplicarse la siguiente capa para garantizar una correcta adherencia entre ambas" },
  { anverso: "¿Qué método de aplicación resulta habitual para una membrana impermeabilizante líquida sobre una gran superficie de cubierta?", reverso: "La aplicación mediante rodillo o llana dentada, en varias capas cruzadas, a veces reforzada con una malla o velo de fibra en los encuentros y puntos singulares (juntas, esquinas, encuentros con bajantes), conforme a las indicaciones de la ficha técnica del producto" },
  { anverso: "¿Por qué es importante respetar el tiempo máximo de repintado indicado en la ficha técnica de una imprimación?", reverso: "Porque, superado ese intervalo, la superficie de la imprimación puede endurecerse o contaminarse en exceso, reduciendo la adherencia química o mecánica de la siguiente capa y comprometiendo la durabilidad del acabado final" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué disolvente es habitual para una imprimación o pintura formulada en base acuosa?", explicacion: "El agua, a diferencia de las formuladas en base disolvente orgánico.", dificultad: "facil", opciones: ["El agua", "El aguarrás mineral exclusivamente", "La acetona exclusivamente", "El xileno exclusivamente"], correcta: 0 },
  { enunciado: "¿Qué disolvente suele requerir una imprimación antioxidante en base disolvente?", explicacion: "Un disolvente orgánico específico como el aguarrás mineral, indicado en su ficha técnica.", dificultad: "media", opciones: ["Un disolvente orgánico específico indicado en su ficha técnica", "Siempre y exclusivamente agua, sin ninguna excepción", "Ningún disolvente, al aplicarse siempre pura sin diluir", "Un disolvente distinto en cada aplicación, sin ficha técnica"], correcta: 0 },
  { enunciado: "¿Qué información de la ficha técnica resulta relevante para repintar sobre una imprimación?", explicacion: "El tiempo de secado y el tiempo máximo de repintado.", dificultad: "media", opciones: ["El tiempo de secado y el tiempo máximo de repintado", "Únicamente el precio de venta del producto", "Únicamente el color exacto de la imprimación", "Únicamente la fecha de fabricación del producto"], correcta: 0 },
  { enunciado: "¿Qué método de aplicación resulta habitual para una membrana impermeabilizante líquida en cubiertas?", explicacion: "Rodillo o llana dentada en varias capas cruzadas, reforzado con malla en puntos singulares.", dificultad: "dificil", opciones: ["Rodillo o llana dentada en varias capas cruzadas", "Exclusivamente pistola airless en una única capa", "Exclusivamente brocha fina de precisión", "Ningún método específico distinto de una pintura convencional"], correcta: 0 },
  { enunciado: "¿Por qué es importante respetar el tiempo máximo de repintado de una imprimación?", explicacion: "Superado ese intervalo puede reducirse la adherencia de la siguiente capa.", dificultad: "dificil", opciones: ["Superado ese intervalo puede reducirse la adherencia de la capa siguiente", "El tiempo de repintado nunca influye en la adherencia final", "Solo resulta relevante en imprimaciones antioxidantes", "Solo resulta relevante si se aplica mediante pistola"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 9 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 9, orden: 9, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-237 creado y vinculado como Tema 9 de Oficial Pintor General.");
