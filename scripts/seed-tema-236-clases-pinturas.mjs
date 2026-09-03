/**
 * Crea tema-236: "Clases de pinturas" — Tema 8 (numero=8, bloque-2) de
 * Oficial Pintor, Especialidad General (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 6 oficial del Anexo I (bases2110.pdf, línea
 * 1448): "Clases de Pinturas: Pinturas Plásticas. Silicatos. Esmaltes.
 * Epoxi. Poliuretanos. Clorocaucho. Disolventes. Usos. Métodos de
 * aplicación. Fichas Técnicas. Normativa."
 *
 * Normativa verificada mediante WebSearch en esta sesión:
 * - RD 227/2006, de 24 de febrero, por el que se complementa el
 *   régimen jurídico sobre la limitación de las emisiones de compuestos
 *   orgánicos volátiles (COV) en determinadas pinturas y barnices
 *   (BOE-A-2006-3377) — transpone la Directiva 2004/42/CE, fija los
 *   valores límite de COV por tipo de producto.
 * - Reglamento (CE) 1272/2008 (CLP), clasificación, etiquetado y
 *   envasado, ya citado en tema-235 — relevante para las fichas
 *   técnicas y de seguridad de cada tipo de pintura.
 * El resto (composición y usos de cada familia de pintura) es
 * conocimiento técnico consolidado del oficio.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-236-clases-pinturas.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-236";
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
  titulo: "Clases de pinturas",
  descripcion: "Pinturas plásticas, silicatos, esmaltes. Pinturas epoxi, poliuretanos y clorocaucho. Disolventes, usos, métodos de aplicación y fichas técnicas, con los límites de COV del RD 227/2006.",
  contenido: "Desarrolla las principales familias de pinturas empleadas en el oficio: las pinturas plásticas, los silicatos y los esmaltes; las pinturas epoxi, los poliuretanos y las pinturas de clorocaucho, de mayor resistencia química y mecánica; y los disolventes empleados con cada familia, sus usos, métodos de aplicación y la información recogida en sus fichas técnicas, con referencia a los valores límite de compuestos orgánicos volátiles (COV) que fija el RD 227/2006 para cada tipo de producto.",
  enlaces_boe: [
    { url: RD_227_2006, titulo: "RD 227/2006 — límites de COV en pinturas y barnices" },
    { url: REGLAMENTO_CLP, titulo: "Reglamento (CE) 1272/2008 (CLP) — clasificación, etiquetado y envasado" },
  ],
  indice_estudio: [
    { url: "", titulo: "Pinturas plásticas, silicatos y esmaltes", seccion: "pinturas-plasticas-silicatos-esmaltes", articulos: "Conocimiento técnico del oficio" },
    { url: "", titulo: "Pinturas epoxi, poliuretanos y clorocaucho", seccion: "pinturas-epoxi-poliuretanos-clorocaucho", articulos: "Conocimiento técnico del oficio" },
    { url: RD_227_2006, titulo: "Disolventes, métodos de aplicación, fichas técnicas y límites de COV", seccion: "disolventes-metodos-aplicacion-fichas-tecnicas-cov", articulos: "RD 227/2006, Reglamento CLP" },
  ],
}]);

const S1 = "pinturas-plasticas-silicatos-esmaltes";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es una pintura plástica?", reverso: "Una pintura al agua formulada con resinas sintéticas en dispersión (habitualmente acrílicas o vinílicas), de uso muy extendido en interiores y exteriores por su fácil aplicación, secado rápido y buena relación calidad-precio, aunque con menor resistencia química que otras familias" },
  { anverso: "¿Qué es una pintura de silicatos?", reverso: "Una pintura mineral formulada a partir de silicato potásico, que reacciona químicamente con soportes minerales (como el mortero de cal o el hormigón) formando un enlace permanente, muy transpirable y de gran durabilidad, empleada especialmente en fachadas y restauración" },
  { anverso: "¿Qué es un esmalte, como tipo de pintura?", reverso: "Una pintura que, al secar, forma una película lisa, brillante o satinada y de gran dureza superficial, empleada habitualmente sobre madera, metal y carpintería, con buena resistencia a la abrasión y a la limpieza" },
  { anverso: "¿Qué ventaja ofrece la pintura de silicatos frente a una pintura plástica convencional en fachadas de edificios antiguos con soporte mineral?", reverso: "Su elevada transpirabilidad, que permite la evacuación del vapor de agua del muro sin retenerlo, reduciendo el riesgo de humedades y desprendimientos, además de su unión química permanente con soportes minerales como la cal o el hormigón" },
  { anverso: "¿Qué diferencia existe, en cuanto a acabado, entre un esmalte y una pintura plástica mate?", reverso: "El esmalte forma una película más lisa, dura y con brillo o satinado, mientras que la pintura plástica mate ofrece un acabado sin brillo, con una textura y una resistencia a la limpieza generalmente inferiores a las del esmalte" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es una pintura plástica?", explicacion: "Una pintura al agua con resinas sintéticas en dispersión, acrílicas o vinílicas.", dificultad: "facil", opciones: ["Una pintura al agua con resinas sintéticas en dispersión", "Una pintura formulada exclusivamente con silicato potásico", "Una pintura formulada exclusivamente con resina epoxi", "Una pintura empleada exclusivamente sobre metal"], correcta: 0 },
  { enunciado: "¿Qué es una pintura de silicatos?", explicacion: "Una pintura mineral que reacciona químicamente con soportes minerales.", dificultad: "media", opciones: ["Una pintura mineral que reacciona con soportes minerales", "Una pintura formulada exclusivamente con resinas acrílicas", "Una pintura empleada exclusivamente sobre pavimentos", "Una pintura formulada exclusivamente con clorocaucho"], correcta: 0 },
  { enunciado: "¿Qué es un esmalte, como tipo de pintura?", explicacion: "Una pintura que forma una película lisa, brillante o satinada y de gran dureza.", dificultad: "media", opciones: ["Una pintura que forma una película lisa y de gran dureza", "Una pintura mineral exclusiva para fachadas antiguas", "Una pintura exclusiva para la señalización de pavimentos", "Un tipo de disolvente empleado en la limpieza de brochas"], correcta: 0 },
  { enunciado: "¿Qué ventaja ofrece la pintura de silicatos en fachadas de soporte mineral?", explicacion: "Su elevada transpirabilidad y su unión química permanente con el soporte.", dificultad: "dificil", opciones: ["Su transpirabilidad y unión química con el soporte mineral", "Su menor coste frente a cualquier otra familia de pintura", "Su mayor brillo frente a cualquier otra familia de pintura", "Su exclusiva aplicación mediante pistola airless"], correcta: 0 },
  { enunciado: "¿Qué diferencia de acabado existe entre un esmalte y una pintura plástica mate?", explicacion: "El esmalte forma una película más lisa, dura y con brillo o satinado.", dificultad: "media", opciones: ["El esmalte ofrece un acabado más liso, duro y brillante", "Ambos acabados resultan exactamente idénticos", "La pintura plástica mate siempre resulta más resistente", "El esmalte nunca puede aplicarse sobre madera"], correcta: 0 },
]);

const S2 = "pinturas-epoxi-poliuretanos-clorocaucho";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es una pintura epoxi?", reverso: "Una pintura bicomponente (resina más endurecedor, que deben mezclarse antes de su aplicación) de elevada resistencia química, mecánica y a la abrasión, empleada habitualmente en pavimentos industriales, estructuras metálicas y ambientes agresivos" },
  { anverso: "¿Qué significa que una pintura epoxi sea \"bicomponente\"?", reverso: "Que se suministra en dos envases separados (la resina base y el endurecedor o catalizador) que deben mezclarse en la proporción indicada por el fabricante justo antes de su aplicación, iniciándose entonces una reacción química de curado con un tiempo de vida útil limitado (pot life)" },
  { anverso: "¿Qué es una pintura de poliuretano?", reverso: "Una pintura de elevada resistencia a la intemperie, a los rayos UV y a la abrasión, que mantiene mejor el brillo y el color con el tiempo que otras familias, empleada como acabado de protección en exteriores, carpintería metálica y superficies sometidas a desgaste" },
  { anverso: "¿Qué es una pintura de clorocaucho?", reverso: "Una pintura formulada a partir de caucho clorado, de elevada resistencia a la humedad, a los ácidos y álcalis, empleada tradicionalmente en superficies sumergidas o muy expuestas a la humedad (piscinas, elementos metálicos en ambientes húmedos), aunque en desuso progresivo por motivos medioambientales" },
  { anverso: "¿Por qué se emplean pinturas epoxi o de poliuretano, en lugar de una pintura plástica convencional, en un pavimento industrial de alto tránsito?", reverso: "Porque ofrecen una resistencia mecánica, química y a la abrasión muy superior a la de una pintura plástica convencional, soportando mejor el paso de vehículos, la caída de objetos y el contacto con productos químicos habituales en ese entorno" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es una pintura epoxi?", explicacion: "Una pintura bicomponente de elevada resistencia química y mecánica.", dificultad: "media", opciones: ["Una pintura bicomponente de elevada resistencia química y mecánica", "Una pintura al agua de secado muy rápido", "Una pintura mineral exclusiva para fachadas", "Una pintura exclusiva para trabajos de aerografía"], correcta: 0 },
  { enunciado: "¿Qué significa que una pintura epoxi sea bicomponente?", explicacion: "Que se suministra en dos envases (resina y endurecedor) que deben mezclarse antes de aplicarla.", dificultad: "dificil", opciones: ["Se suministra en dos envases que deben mezclarse antes de aplicarla", "Se aplica siempre en dos capas de idéntico color", "Se comercializa siempre en dos colores distintos", "Requiere siempre dos personas para su aplicación"], correcta: 0 },
  { enunciado: "¿Qué característica distingue a una pintura de poliuretano?", explicacion: "Elevada resistencia a la intemperie, rayos UV y abrasión, con buen mantenimiento del brillo.", dificultad: "media", opciones: ["Resistencia a la intemperie, rayos UV y abrasión", "Es exclusivamente una pintura al agua de bajo coste", "Solo puede aplicarse en interiores sin ventilación", "Carece de resistencia alguna a la abrasión"], correcta: 0 },
  { enunciado: "¿Qué es una pintura de clorocaucho?", explicacion: "Una pintura de caucho clorado, resistente a la humedad, ácidos y álcalis.", dificultad: "media", opciones: ["Una pintura de caucho clorado resistente a la humedad", "Una pintura exclusiva para pavimentos de madera", "Una pintura mineral exclusiva para fachadas antiguas", "Un tipo de disolvente empleado en la limpieza de brochas"], correcta: 0 },
  { enunciado: "¿Por qué se emplean pinturas epoxi o poliuretano en un pavimento industrial de alto tránsito?", explicacion: "Por su resistencia mecánica, química y a la abrasión muy superior a la de una pintura plástica.", dificultad: "media", opciones: ["Por su resistencia mecánica, química y a la abrasión superior", "Por su menor coste frente a cualquier otra pintura", "Por su aplicación exclusivamente mediante brocha", "Por no requerir ninguna preparación previa del pavimento"], correcta: 0 },
]);

const S3 = "disolventes-metodos-aplicacion-fichas-tecnicas-cov";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un disolvente, en el contexto de las pinturas?", reverso: "Un líquido volátil empleado para diluir la pintura hasta la viscosidad de aplicación adecuada, para limpiar herramientas tras su uso, y que se evapora durante el proceso de secado de la película de pintura, contribuyendo a la formación del acabado final" },
  { anverso: "¿Qué regula el RD 227/2006 en relación con los disolventes contenidos en las pinturas y barnices?", reverso: "Los valores límite de compuestos orgánicos volátiles (COV) que pueden contener determinadas pinturas y barnices puestos en el mercado, por su contribución a la contaminación atmosférica y a la formación de ozono troposférico" },
  { anverso: "¿Qué es una ficha técnica de un producto de pintura?", reverso: "El documento del fabricante que recoge las características técnicas del producto: composición, rendimiento, tiempos de secado y de repintado, diluyente recomendado, condiciones de aplicación y equipos compatibles, sirviendo de referencia para su correcto uso" },
  { anverso: "¿Qué diferencia existe entre la ficha técnica y la ficha de datos de seguridad de un producto de pintura?", reverso: "La ficha técnica recoge las características de aplicación y rendimiento del producto; la ficha de datos de seguridad (conforme al Reglamento CLP) recoge los riesgos para la salud y el medio ambiente, y las medidas de prevención, manipulación y almacenamiento seguro" },
  { anverso: "¿Por qué es importante consultar la ficha técnica antes de elegir el método de aplicación (brocha, rodillo o pistola) de una pintura concreta?", reverso: "Porque cada producto tiene una viscosidad, un rendimiento y unas condiciones de aplicación óptimas distintas, y la ficha técnica indica el método o métodos recomendados por el fabricante para lograr el acabado y la durabilidad previstos" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es un disolvente, en el contexto de las pinturas?", explicacion: "Un líquido volátil para diluir la pintura y limpiar herramientas, que se evapora durante el secado.", dificultad: "facil", opciones: ["Un líquido volátil para diluir la pintura y limpiar herramientas", "Un pigmento que aporta color a la pintura", "Una resina que forma la película de la pintura", "Un aditivo que acelera el secado de la pintura"], correcta: 0 },
  { enunciado: "¿Qué regula el RD 227/2006 en relación con las pinturas y barnices?", explicacion: "Los valores límite de compuestos orgánicos volátiles (COV) en determinados productos.", dificultad: "media", opciones: ["Los valores límite de compuestos orgánicos volátiles", "El almacenamiento de productos químicos en general", "Los equipos de protección individual del pintor", "Las condiciones generales de los lugares de trabajo"], correcta: 0 },
  { enunciado: "¿Qué es una ficha técnica de un producto de pintura?", explicacion: "El documento con las características de aplicación y rendimiento del producto.", dificultad: "media", opciones: ["El documento con las características de aplicación y rendimiento", "El documento exclusivo con el precio del producto", "El documento exclusivo con la garantía comercial", "El documento exclusivo con el color RAL del producto"], correcta: 0 },
  { enunciado: "¿Qué diferencia existe entre la ficha técnica y la ficha de datos de seguridad?", explicacion: "La técnica recoge aplicación y rendimiento; la de seguridad, riesgos y medidas de prevención.", dificultad: "dificil", opciones: ["Una recoge aplicación; la otra, riesgos y prevención", "Ambas fichas contienen exactamente la misma información", "La ficha de seguridad solo existe para pinturas al agua", "La ficha técnica sustituye siempre a la de seguridad"], correcta: 0 },
  { enunciado: "¿Por qué es importante consultar la ficha técnica antes de elegir el método de aplicación de una pintura?", explicacion: "Cada producto tiene condiciones de aplicación óptimas distintas indicadas por el fabricante.", dificultad: "media", opciones: ["Cada producto tiene condiciones de aplicación óptimas distintas", "El método de aplicación nunca varía según el producto", "La ficha técnica nunca indica el método de aplicación", "Solo resulta relevante para pinturas epoxi bicomponente"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 8 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 8, orden: 8, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-236 creado y vinculado como Tema 8 de Oficial Pintor General.");
