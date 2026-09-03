/**
 * Crea tema-258: "Principios Generales de las Artes Gráficas. Fases de
 * la Producción Gráfica. Conceptos, terminología y procesos en
 * preimpresión e impresión Digital" — Tema 14 (numero=14, bloque-2) de
 * Oficial Pintor, Especialidad Gráfica (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 12 oficial del Anexo I (bases2110.pdf, línea
 * 1518): "Principios Generales de las Artes Gráficas. Fases de la
 * Producción Gráfica. Conceptos, terminología y procesos en
 * preimpresión e impresión Digital. Normativa."
 *
 * Conocimiento técnico consolidado del oficio (fundamentos y proceso de
 * producción de artes gráficas, de naturaleza técnica e industrial sin
 * regulación legal propia en España), sin ley española única que lo
 * regule — búsqueda previa realizada conforme al estándar de sourcing
 * del proyecto: no existe normativa española específica distinta de la
 * ya introducida en otros temas de este bloque (Reglamento CLP para
 * tintas, ya citado).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-258-principios-artes-graficas.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-258";
const OPOSICION = "oficial-pintor-grafica-ayto-zaragoza";
const BLOQUE_2_ID = "1e5d5916-cf4a-4920-9175-579f18034ad6";

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
  titulo: "Principios generales de las artes gráficas",
  descripcion: "Fundamentos de las artes gráficas. Fases de la producción gráfica: diseño, preimpresión, impresión y posimpresión. Conceptos y terminología de la preimpresión e impresión digital.",
  contenido: "Desarrolla los fundamentos generales de las artes gráficas aplicados al perfil de esta especialidad: las fases de la producción gráfica, desde el diseño inicial hasta el acabado final del producto impreso; los conceptos y la terminología propios de la preimpresión (maquetación, resolución de imagen, sangrado, marcas de corte) y de la impresión digital; y los procesos que intervienen en cada fase, con especial atención a las particularidades de la impresión digital de gran formato empleada habitualmente en rotulación municipal.",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "Fases de la producción gráfica", seccion: "fases-produccion-grafica", articulos: "Conocimiento técnico del oficio" },
    { url: "", titulo: "Conceptos y terminología de la preimpresión", seccion: "conceptos-terminologia-preimpresion", articulos: "Conocimiento técnico del oficio" },
    { url: "", titulo: "Procesos de la impresión digital", seccion: "procesos-impresion-digital", articulos: "Conocimiento técnico del oficio" },
  ],
}]);

const S1 = "fases-produccion-grafica";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Cuáles son las grandes fases de un proceso de producción gráfica, desde el encargo inicial hasta el producto final?", reverso: "Diseño (creación o adaptación del contenido gráfico), preimpresión (preparación técnica del archivo para su impresión), impresión (reproducción del diseño sobre el material elegido), y posimpresión (acabado: corte, laminado, aplicación o instalación final)" },
  { anverso: "¿Qué es la fase de diseño, dentro de la producción gráfica?", reverso: "La fase en la que se crea o adapta el contenido visual (texto, imágenes, logotipos) que finalmente se imprimirá, habitualmente mediante un programa de diseño gráfico vectorial o de edición de imagen, atendiendo a las necesidades del encargo (un rótulo, un cartel, una señal)" },
  { anverso: "¿Qué es la fase de posimpresión, ya introducida parcialmente en un tema anterior de este bloque?", reverso: "El conjunto de operaciones realizadas tras la impresión: el corte del material según el diseño, el laminado de protección, y la aplicación o instalación final del producto sobre su soporte definitivo (fachada, vehículo, panel)" },
  { anverso: "¿Por qué es importante que el Oficial Pintor Especialidad Gráfica comprenda el conjunto completo de fases de producción, y no solo la fase de impresión propiamente dicha?", reverso: "Porque un error cometido en una fase temprana (por ejemplo, una resolución de imagen insuficiente en el diseño) se traslada y se amplifica en las fases posteriores, siendo mucho más costoso corregirlo una vez impreso el material que detectarlo antes de comenzar la impresión" },
  { anverso: "¿Qué relación existe entre las fases de producción gráfica y el flujo de trabajo habitual de un encargo municipal de rotulación o señalética?", reverso: "Un encargo municipal sigue habitualmente ese mismo flujo: recepción de las especificaciones o el diseño, adaptación técnica en preimpresión, impresión del material, y posimpresión con la instalación final en el emplazamiento municipal correspondiente" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Cuáles son las grandes fases de un proceso de producción gráfica?", explicacion: "Diseño, preimpresión, impresión y posimpresión.", dificultad: "facil", opciones: ["Diseño, preimpresión, impresión y posimpresión", "Corte, laminado, transporte y facturación", "Únicamente diseño e impresión, sin más fases", "Únicamente impresión y posimpresión, sin más fases"], correcta: 0 },
  { enunciado: "¿Qué es la fase de diseño en la producción gráfica?", explicacion: "La fase en la que se crea o adapta el contenido visual que se imprimirá.", dificultad: "media", opciones: ["La fase en la que se crea o adapta el contenido visual", "La fase exclusiva de corte del material ya impreso", "La fase exclusiva de instalación final del producto", "La fase exclusiva de laminado de protección"], correcta: 0 },
  { enunciado: "¿Qué comprende la fase de posimpresión?", explicacion: "Corte, laminado y aplicación o instalación final del producto.", dificultad: "media", opciones: ["Corte, laminado e instalación final del producto", "Exclusivamente la creación del diseño gráfico inicial", "Exclusivamente la impresión sobre el material elegido", "Exclusivamente la preparación técnica del archivo"], correcta: 0 },
  { enunciado: "¿Por qué es importante comprender el conjunto completo de fases de producción?", explicacion: "Un error en una fase temprana se amplifica y resulta más costoso de corregir después.", dificultad: "dificil", opciones: ["Un error temprano se amplifica y resulta más costoso después", "Cada fase resulta completamente independiente de las demás", "Solo la fase de impresión resulta realmente relevante", "El orden de las fases nunca influye en el resultado final"], correcta: 0 },
  { enunciado: "¿Qué relación existe entre estas fases y el flujo de trabajo de un encargo municipal de rotulación?", explicacion: "Un encargo municipal sigue el mismo flujo: diseño, preimpresión, impresión y posimpresión con instalación.", dificultad: "media", opciones: ["Sigue el mismo flujo de diseño, preimpresión, impresión y posimpresión", "Un encargo municipal nunca sigue este tipo de flujo de trabajo", "Solo aplica la fase de impresión en un encargo municipal", "El flujo de trabajo municipal es completamente distinto"], correcta: 0 },
]);

const S2 = "conceptos-terminologia-preimpresion";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es la resolución de una imagen, concepto clave en preimpresión?", reverso: "La cantidad de puntos o píxeles por unidad de longitud (habitualmente expresada en ppp, puntos por pulgada) que contiene una imagen digital, determinante de la nitidez del resultado final una vez impresa, especialmente crítica en impresiones de gran tamaño" },
  { anverso: "¿Qué es el sangrado (o \"sangre\"), concepto de maquetación relevante en preimpresión?", reverso: "Una extensión del diseño más allá del área final de corte, que garantiza que no queden bordes blancos sin imprimir si se produce una pequeña desviación durante el proceso de corte del material impreso" },
  { anverso: "¿Qué son las marcas de corte, en un archivo preparado para impresión?", reverso: "Pequeñas líneas guía situadas en las esquinas de un diseño, que indican con precisión dónde debe realizarse el corte final del material impreso, facilitando un recorte exacto conforme al tamaño definitivo previsto" },
  { anverso: "¿Qué es un archivo vectorial, frente a un archivo de mapa de bits (o raster), en el contexto del diseño para rotulación?", reverso: "Un archivo compuesto por formas geométricas definidas matemáticamente (líneas, curvas), que puede escalarse a cualquier tamaño sin perder calidad ni nitidez, a diferencia de un archivo de mapa de bits, formado por una cuadrícula de píxeles que sí pierde calidad al ampliarse en exceso" },
  { anverso: "¿Por qué resulta especialmente relevante trabajar con archivos vectoriales para el corte con plotter de un rótulo de texto o de una forma sencilla?", reverso: "Porque el plotter de corte necesita seguir el contorno exacto de las formas del diseño, y solo un archivo vectorial define ese contorno con la precisión matemática necesaria para un corte limpio, a diferencia de un archivo de mapa de bits" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es la resolución de una imagen?", explicacion: "La cantidad de puntos o píxeles por unidad de longitud, determinante de la nitidez.", dificultad: "facil", opciones: ["La cantidad de puntos o píxeles por unidad de longitud", "El tamaño total del archivo en megabytes", "El número de colores empleados en la imagen", "El formato de archivo empleado para guardarla"], correcta: 0 },
  { enunciado: "¿Qué es el sangrado en maquetación?", explicacion: "Una extensión del diseño más allá del área de corte, evitando bordes blancos.", dificultad: "media", opciones: ["Una extensión del diseño más allá del área de corte", "El color de fondo empleado en el diseño", "El tamaño final exacto del producto impreso", "Un tipo de tinta empleada en la impresión digital"], correcta: 0 },
  { enunciado: "¿Qué son las marcas de corte en un archivo de impresión?", explicacion: "Líneas guía que indican dónde debe realizarse el corte final del material.", dificultad: "media", opciones: ["Líneas guía que indican dónde realizar el corte final", "El propio contorno vectorial del diseño gráfico", "Un tipo de tinta empleada en la impresión digital", "El nombre del archivo guardado para su impresión"], correcta: 0 },
  { enunciado: "¿Qué diferencia un archivo vectorial de uno de mapa de bits?", explicacion: "El vectorial se escala sin perder calidad; el de mapa de bits pierde calidad al ampliarse.", dificultad: "dificil", opciones: ["El vectorial se escala sin perder calidad", "Ambos tipos de archivo se comportan exactamente igual", "El mapa de bits siempre resulta más preciso que el vectorial", "El vectorial nunca puede emplearse para el corte con plotter"], correcta: 0 },
  { enunciado: "¿Por qué resulta relevante trabajar con archivos vectoriales para el corte con plotter?", explicacion: "El plotter necesita el contorno exacto de las formas, que solo define un archivo vectorial.", dificultad: "media", opciones: ["El plotter necesita el contorno exacto que define un vectorial", "El plotter nunca puede trabajar con archivos vectoriales", "Un archivo de mapa de bits siempre resulta preferible para el corte", "El tipo de archivo nunca influye en el resultado del corte"], correcta: 0 },
]);

const S3 = "procesos-impresion-digital";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es la impresión digital de gran formato, tecnología habitual en un taller de rotulación municipal?", reverso: "Un sistema de impresión que reproduce un diseño directamente desde un archivo digital sobre un material de gran anchura (vinilo, lona), habitualmente mediante inyección de tinta, sin necesidad de planchas ni de un proceso de preparación previo tan complejo como en la impresión offset tradicional" },
  { anverso: "¿Qué ventaja ofrece la impresión digital frente a la impresión offset tradicional para trabajos municipales de tirada corta (por ejemplo, un único cartel)?", reverso: "No exige la preparación de planchas específicas para cada trabajo, resultando mucho más rápida y económica para tiradas cortas o unitarias, aunque su coste por unidad puede resultar superior al de la offset en tiradas muy grandes" },
  { anverso: "¿Qué es una prueba de impresión (o prueba de color), recomendable antes de lanzar un trabajo de impresión digital de gran tamaño?", reverso: "Una impresión de menor tamaño, realizada sobre el mismo material y con la misma configuración de impresora, que permite comprobar el color, la nitidez y el ajuste general antes de comprometer todo el material en un trabajo de gran formato" },
  { anverso: "¿Qué relación existe entre la resolución de la imagen original y la distancia de visualización prevista de un cartel o rótulo de gran formato?", reverso: "Un rótulo destinado a verse desde lejos (una fachada, una valla) puede imprimirse con una resolución menor que un elemento destinado a verse de cerca (un cartel informativo), dado que el ojo humano no percibe los mismos detalles a distancia que de cerca" },
  { anverso: "¿Por qué es relevante para el Oficial Pintor Especialidad Gráfica comprender esta relación entre resolución y distancia de visualización, más allá de aplicar siempre la máxima resolución posible?", reverso: "Porque permite optimizar el tiempo de impresión y el tamaño del archivo sin comprometer la calidad percibida del resultado final, ajustando la resolución al uso real que va a darse a cada elemento gráfico concreto" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es la impresión digital de gran formato?", explicacion: "Un sistema que reproduce un diseño desde un archivo digital sobre materiales de gran anchura.", dificultad: "facil", opciones: ["Un sistema que imprime desde un archivo digital en gran anchura", "Un sistema exclusivo de corte mediante cuchilla", "Un sistema exclusivo de laminado de protección", "Un tipo de tinta empleada en impresión offset"], correcta: 0 },
  { enunciado: "¿Qué ventaja ofrece la impresión digital frente a la offset para tiradas cortas?", explicacion: "No exige preparación de planchas, resultando más rápida y económica para tiradas unitarias.", dificultad: "media", opciones: ["No exige planchas, resultando más rápida para tiradas cortas", "Siempre resulta más económica en cualquier tipo de tirada", "La offset siempre resulta preferible en tiradas cortas", "No existe ninguna diferencia real entre ambos sistemas"], correcta: 0 },
  { enunciado: "¿Qué es una prueba de impresión antes de un trabajo de gran tamaño?", explicacion: "Una impresión menor que permite comprobar color, nitidez y ajuste antes del trabajo completo.", dificultad: "media", opciones: ["Una impresión menor que verifica color y ajuste antes del trabajo", "El propio trabajo de gran tamaño ya finalizado", "Un tipo de tinta específica para pruebas de color", "Un archivo vectorial exclusivo de comprobación"], correcta: 0 },
  { enunciado: "¿Qué relación existe entre resolución de imagen y distancia de visualización de un rótulo?", explicacion: "Un rótulo visto de lejos admite menor resolución que uno destinado a verse de cerca.", dificultad: "dificil", opciones: ["Un rótulo visto de lejos admite menor resolución", "La distancia de visualización nunca influye en la resolución", "Siempre debe aplicarse la máxima resolución posible", "Un rótulo de cerca admite siempre menor resolución que uno lejano"], correcta: 0 },
  { enunciado: "¿Por qué es relevante comprender la relación entre resolución y distancia de visualización?", explicacion: "Permite optimizar tiempo de impresión y tamaño de archivo sin comprometer la calidad percibida.", dificultad: "media", opciones: ["Permite optimizar tiempo y archivo sin perder calidad percibida", "No aporta ninguna utilidad práctica en el trabajo diario", "Solo resulta relevante en impresión offset, nunca en digital", "Solo resulta relevante si el rótulo es de pequeño tamaño"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 14 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 14, orden: 14, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-258 creado y vinculado como Tema 14 de Oficial Pintor Gráfica.");
