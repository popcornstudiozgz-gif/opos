/**
 * Crea tema-169: "Herramientas de medición y verificación. Inspección de
 * soldaduras" — Tema 21 (numero=21, bloque-2) de Oficial Herrero (Ayto.
 * Zaragoza).
 *
 * Corresponde al TEMA 19 oficial del Anexo I (bases2110.pdf, línea 1285):
 *   "Herramientas de medición de longitud: reglas, pies de rey y
 *   micrómetros. Herramientas de verificación y comprobación: patrones y
 *   calibres. Inspección y verificación de soldaduras."
 *
 * Conocimiento técnico consolidado de metrología de taller e inspección
 * visual de soldaduras, sin una ley española específica que lo regule
 * como técnica de taller — mismo criterio que temas anteriores de esta
 * oposición. Búsqueda previa realizada conforme al estándar de sourcing
 * del proyecto.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-169-herramientas-medicion-verificacion-soldaduras.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-169";
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
  titulo: "Herramientas de medición y verificación. Inspección de soldaduras",
  descripcion: "Herramientas de medición de longitud: reglas, pies de rey y micrómetros. Herramientas de verificación y comprobación: patrones y calibres. Inspección y verificación de soldaduras.",
  contenido: "Desarrolla las herramientas de medición de longitud propias del taller de herrería (reglas, pies de rey y micrómetros), las herramientas de verificación y comprobación (patrones y calibres), y los criterios básicos de inspección y verificación visual de la calidad de una soldadura.",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "Herramientas de medición de longitud: reglas, pies de rey y micrómetros", seccion: "herramientas-medicion-longitud", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Herramientas de verificación y comprobación: patrones y calibres", seccion: "herramientas-verificacion-patrones-calibres", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Inspección y verificación de soldaduras", seccion: "inspeccion-verificacion-soldaduras", articulos: "Conceptos fundamentales" },
  ],
}]);

const S1 = "herramientas-medicion-longitud";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es una regla graduada, como herramienta básica de medición de longitud?", reverso: "Una herramienta de medición directa, con una escala graduada habitualmente en milímetros, empleada para medidas de precisión moderada sobre superficies planas o accesibles" },
  { anverso: "¿Qué es un pie de rey (o calibre)?", reverso: "Un instrumento de medición de precisión que permite medir longitudes exteriores, interiores y profundidades sobre una misma pieza, mediante una escala principal y un nonio (o vernier) que aumenta la precisión de lectura, habitualmente hasta la décima de milímetro" },
  { anverso: "¿Qué es el nonio (o vernier) de un pie de rey?", reverso: "Una escala auxiliar deslizante que, comparada con la escala principal fija, permite leer fracciones de la división mínima de esta última, aumentando la precisión de la medida obtenida" },
  { anverso: "¿Qué es un micrómetro (o palmer)?", reverso: "Un instrumento de medición de mayor precisión que el pie de rey (habitualmente hasta la centésima de milímetro), basado en el desplazamiento de un husillo con rosca de paso conocido, empleado para medidas exteriores de alta exactitud" },
  { anverso: "¿Qué debe tener en cuenta el herrero al elegir entre un pie de rey y un micrómetro para medir una pieza concreta?", reverso: "La precisión realmente requerida por la aplicación (el micrómetro ofrece mayor exactitud pero mide un rango más limitado por vuelta) y el tipo de medida a realizar (el pie de rey permite medidas interiores y de profundidad que el micrómetro convencional no realiza directamente)" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es una regla graduada?", explicacion: "Una herramienta de medición directa con escala graduada, habitualmente en milímetros.", dificultad: "facil", opciones: ["Una herramienta de medición directa con escala graduada", "Un instrumento exclusivo de medición de dureza superficial", "Un instrumento exclusivo de medición de temperatura", "Una herramienta exclusiva de corte de chapa metálica"], correcta: 0 },
  { enunciado: "¿Qué es un pie de rey o calibre?", explicacion: "Un instrumento de precisión que mide exteriores, interiores y profundidades con nonio.", dificultad: "media", opciones: ["Un instrumento de precisión que mide exteriores, interiores y profundidades", "Un instrumento exclusivo para medir exclusivamente longitudes exteriores", "Un instrumento exclusivo para medir la dureza de un material", "Un instrumento exclusivo para medir la temperatura de una pieza"], correcta: 0 },
  { enunciado: "¿Qué es el nonio o vernier de un pie de rey?", explicacion: "Una escala auxiliar deslizante que aumenta la precisión de lectura de la escala principal.", dificultad: "dificil", opciones: ["Una escala auxiliar que aumenta la precisión de lectura", "El elemento que sujeta la pieza durante la medición", "El instrumento que mide exclusivamente profundidades", "El componente que protege el instrumento frente a golpes"], correcta: 0 },
  { enunciado: "¿Qué es un micrómetro o palmer?", explicacion: "Un instrumento de mayor precisión que el pie de rey, basado en un husillo con rosca de paso conocido.", dificultad: "media", opciones: ["Un instrumento de mayor precisión basado en un husillo roscado", "Un instrumento exclusivo para medir longitudes interiores de una pieza", "Un instrumento exclusivo para medir la profundidad de una ranura", "Un instrumento que sustituye por completo al pie de rey en cualquier caso"], correcta: 0 },
  { enunciado: "¿Qué debe tener en cuenta el herrero al elegir entre un pie de rey y un micrómetro?", explicacion: "La precisión requerida y el tipo de medida (exterior, interior o profundidad) a realizar.", dificultad: "dificil", opciones: ["La precisión requerida y el tipo de medida a realizar", "Únicamente el color del instrumento disponible en el taller", "Únicamente el precio del instrumento disponible en el taller", "Únicamente la marca comercial del instrumento disponible"], correcta: 0 },
]);

const S2 = "herramientas-verificacion-patrones-calibres";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un patrón de medida, en el contexto de la verificación de instrumentos y piezas?", reverso: "Un objeto de referencia con una dimensión conocida y certificada, con una precisión muy superior a la del instrumento a verificar, empleado para comprobar y calibrar la exactitud de los instrumentos de medida del taller" },
  { anverso: "¿Qué es un calibre pasa-no pasa?", reverso: "Un instrumento de verificación (no de medida directa) que comprueba si una dimensión de la pieza se encuentra dentro de la tolerancia admitida, mediante dos extremos: uno que debe entrar u encajar en la pieza correcta ('pasa') y otro que no debe hacerlo ('no pasa')" },
  { anverso: "¿Qué ventaja aporta un calibre pasa-no pasa frente a medir la pieza con un pie de rey en un proceso de fabricación en serie?", reverso: "Una comprobación mucho más rápida (basta con introducir o no el calibre) sin necesidad de leer e interpretar una medida numérica exacta, resultando muy eficiente para verificar grandes cantidades de piezas iguales" },
  { anverso: "¿Qué es una galga de espesores?", reverso: "Un juego de láminas metálicas de espesor conocido y calibrado, empleado para medir pequeñas holguras o separaciones entre dos superficies (por ejemplo, la abertura de una junta o la holgura de un mecanismo)" },
  { anverso: "¿Por qué debe verificarse periódicamente la precisión de los instrumentos de medida del taller, comparándolos con un patrón?", reverso: "Porque el uso continuado, los golpes o el desgaste pueden alterar su precisión con el tiempo, y un instrumento descalibrado sin detectar generaría medidas erróneas en cualquier pieza fabricada con su ayuda" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es un patrón de medida?", explicacion: "Un objeto de referencia con dimensión conocida, empleado para calibrar instrumentos.", dificultad: "media", opciones: ["Un objeto de referencia con dimensión conocida y certificada", "Un instrumento exclusivo de medición directa de longitudes", "Un instrumento exclusivo de corte de precisión de chapa", "Un instrumento exclusivo de medición de la dureza de un material"], correcta: 0 },
  { enunciado: "¿Qué es un calibre pasa-no pasa?", explicacion: "Comprueba si una dimensión está dentro de tolerancia mediante dos extremos.", dificultad: "media", opciones: ["Comprueba si una dimensión está dentro de tolerancia", "Mide con precisión numérica exacta cualquier longitud de la pieza", "Mide exclusivamente la dureza superficial de una pieza", "Mide exclusivamente la temperatura de una pieza mecanizada"], correcta: 0 },
  { enunciado: "¿Qué ventaja aporta un calibre pasa-no pasa en fabricación en serie?", explicacion: "Una comprobación mucho más rápida que medir cada pieza con un pie de rey.", dificultad: "dificil", opciones: ["Una comprobación mucho más rápida que medir cada pieza", "Una precisión siempre superior a la de un micrómetro convencional", "La posibilidad de medir la dureza de la pieza verificada", "La posibilidad de medir la temperatura de la pieza verificada"], correcta: 0 },
  { enunciado: "¿Qué es una galga de espesores?", explicacion: "Un juego de láminas de espesor conocido para medir pequeñas holguras.", dificultad: "media", opciones: ["Un juego de láminas de espesor conocido para medir holguras", "Un instrumento exclusivo de medición de la dureza de un material", "Un instrumento exclusivo de medición de la temperatura de una pieza", "Un instrumento exclusivo de medición de ángulos de una pieza"], correcta: 0 },
  { enunciado: "¿Por qué debe verificarse periódicamente la precisión de los instrumentos de medida del taller?", explicacion: "El uso continuado o los golpes pueden alterar su precisión con el tiempo.", dificultad: "media", opciones: ["El uso continuado o los golpes pueden alterar su precisión", "Los instrumentos de medida nunca pierden precisión con el uso", "Solo es necesario verificarlos una única vez, en su compra inicial", "La verificación periódica solo es relevante en instrumentos eléctricos"], correcta: 0 },
]);

const S3 = "inspeccion-verificacion-soldaduras";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es la inspección visual de una soldadura?", reverso: "El examen directo del cordón de soldadura y su entorno, sin instrumentos especializados de ensayo no destructivo, buscando defectos apreciables a simple vista (porosidad, falta de fusión, grietas superficiales, salpicaduras excesivas, geometría irregular)" },
  { anverso: "¿Qué defectos superficiales habituales debe buscar el herrero al inspeccionar visualmente un cordón de soldadura?", reverso: "Porosidad (pequeños huecos visibles en la superficie), grietas, falta de penetración en los extremos del cordón, socavaduras (rebajes en el metal base junto al cordón), y una geometría irregular o excesivamente convexa o cóncava" },
  { anverso: "¿Qué es una socavadura en una soldadura?", reverso: "Un rebaje o surco en el metal base, junto al borde del cordón de soldadura, producido por una fusión excesiva del metal base sin el aporte suficiente de material para rellenarlo, que reduce la sección resistente de la unión en ese punto" },
  { anverso: "¿Qué instrumentos sencillos, además de la simple observación visual, puede emplear el herrero para verificar la geometría de un cordón de soldadura?", reverso: "Galgas o calibres específicos de soldadura, que permiten medir la altura, el ancho o la garganta del cordón, comprobando que se ajusta a las dimensiones mínimas especificadas" },
  { anverso: "¿Qué debe hacer el herrero si, tras la inspección visual, detecta un defecto relevante en un cordón de soldadura de un elemento estructural?", reverso: "Eliminar el defecto mediante mecanizado y repetir la soldadura corrigiendo la causa detectada, en lugar de dar por válida una unión con un defecto que pueda comprometer su resistencia" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es la inspección visual de una soldadura?", explicacion: "El examen directo del cordón sin instrumentos especializados, buscando defectos apreciables a simple vista.", dificultad: "facil", opciones: ["El examen directo del cordón buscando defectos a simple vista", "Un ensayo exclusivo mediante rayos X del cordón de soldadura", "Un ensayo exclusivo de resistencia a la fatiga del cordón", "Una medición exclusiva de la dureza del cordón soldado"], correcta: 0 },
  { enunciado: "¿Qué defectos superficiales debe buscar el herrero al inspeccionar visualmente un cordón?", explicacion: "Porosidad, grietas, falta de penetración, socavaduras y geometría irregular.", dificultad: "media", opciones: ["Porosidad, grietas, falta de penetración y socavaduras", "Únicamente el color final del cordón de soldadura realizado", "Únicamente el tiempo empleado en realizar la soldadura", "Únicamente el precio del material de aportación empleado"], correcta: 0 },
  { enunciado: "¿Qué es una socavadura en una soldadura?", explicacion: "Un rebaje en el metal base junto al cordón, que reduce la sección resistente de la unión.", dificultad: "dificil", opciones: ["Un rebaje en el metal base que reduce la sección resistente", "Un exceso de material de aportación en el centro del cordón", "El color característico de un cordón correctamente ejecutado", "La escoria que se forma con electrodos revestidos exclusivamente"], correcta: 0 },
  { enunciado: "¿Qué instrumento sencillo puede emplear el herrero para verificar la geometría de un cordón de soldadura?", explicacion: "Galgas o calibres específicos de soldadura.", dificultad: "media", opciones: ["Galgas o calibres específicos de soldadura", "Un micrómetro convencional exclusivamente", "Un medidor de dureza exclusivamente", "Un termómetro de infrarrojos exclusivamente"], correcta: 0 },
  { enunciado: "¿Qué debe hacer el herrero ante un defecto relevante detectado en un cordón de un elemento estructural?", explicacion: "Eliminar el defecto mediante mecanizado y repetir la soldadura corrigiendo la causa.", dificultad: "media", opciones: ["Eliminar el defecto y repetir la soldadura corrigiendo la causa", "Aplicar únicamente pintura sobre el defecto detectado", "Dar la soldadura por válida si el defecto resulta poco visible", "Aumentar el espesor de la pieza sin actuar sobre el defecto"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 21 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 21, orden: 21, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-169 creado y vinculado como Tema 21 de Oficial Herrero.");
