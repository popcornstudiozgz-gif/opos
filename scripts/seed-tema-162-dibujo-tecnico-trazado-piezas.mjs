/**
 * Crea tema-162: "Dibujo técnico y trazado de piezas" — Tema 14
 * (numero=14, bloque-2) de Oficial Herrero (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 12 oficial del Anexo I (bases2110.pdf, línea 1268):
 *   "Sistemas de representación gráfica. Instrumentos de dibujo a mano
 *   alzada. Normas de acotación. Sistemas de proporcionalidad. Trazado y
 *   marcado de piezas: finalidad, clase, planos de referencia, normas
 *   prácticas en el trazado al aire."
 *
 * Fuente primaria: la norma UNE 1032 (adaptación española de la ISO 128)
 * sobre sistemas de representación y acotación en dibujo técnico, ya
 * verificada y citada como referencia técnica del sector en Oficial
 * Carpintero (ver scripts/seed-tema-116-*.mjs, tema de dibujo técnico de
 * esa oposición). Es una norma técnica de aplicación voluntaria (no una
 * disposición del BOE), citada aquí igualmente como referencia técnica,
 * no como fuente legal. El trazado y marcado de piezas es conocimiento
 * técnico consolidado del oficio de herrero sin ley adicional que lo
 * regule.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-162-dibujo-tecnico-trazado-piezas.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-162";
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
  titulo: "Dibujo técnico y trazado de piezas",
  descripcion: "Sistemas de representación gráfica. Instrumentos de dibujo a mano alzada. Normas de acotación. Sistemas de proporcionalidad. Trazado y marcado de piezas.",
  contenido: "Desarrolla los sistemas de representación gráfica empleados en el dibujo técnico del oficio de herrero, los instrumentos de dibujo a mano alzada, las normas de acotación y los sistemas de proporcionalidad conforme a la norma UNE 1032 (adaptación española de la ISO 128), y el trazado y marcado de piezas: su finalidad, clases, planos de referencia y normas prácticas para el trazado al aire sobre el propio material.",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "Sistemas de representación gráfica e instrumentos de dibujo a mano alzada", seccion: "sistemas-representacion-grafica-instrumentos-dibujo", articulos: "UNE 1032" },
    { url: "", titulo: "Normas de acotación y sistemas de proporcionalidad", seccion: "normas-acotacion-proporcionalidad", articulos: "UNE 1032" },
    { url: "", titulo: "Trazado y marcado de piezas", seccion: "trazado-marcado-piezas", articulos: "Conceptos fundamentales" },
  ],
}]);

const S1 = "sistemas-representacion-grafica-instrumentos-dibujo";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un sistema de representación gráfica en dibujo técnico?", reverso: "Un conjunto de reglas normalizadas que permite representar sobre un plano bidimensional (papel o pantalla) la forma tridimensional de un objeto, de manera que pueda ser interpretada de forma unívoca por cualquier técnico" },
  { anverso: "¿Qué es el sistema diédrico (o de vistas) en dibujo técnico?", reverso: "Un sistema de representación que proyecta el objeto sobre varios planos perpendiculares entre sí (habitualmente alzado, planta y perfil), obteniendo distintas vistas que, combinadas, permiten reconstruir mentalmente la forma tridimensional completa" },
  { anverso: "¿Qué es una vista en corte, en dibujo técnico?", reverso: "Una representación que muestra el interior de una pieza como si se hubiera seccionado con un plano imaginario, empleada para mostrar con claridad detalles internos que no serían visibles en una vista exterior convencional" },
  { anverso: "¿Qué es el dibujo a mano alzada (o croquis)?", reverso: "Un dibujo técnico realizado sin instrumentos de precisión (regla, escuadra), respetando de forma aproximada la proporción entre los distintos elementos, empleado habitualmente para bocetos rápidos o para tomar medidas directamente de una pieza existente" },
  { anverso: "¿Qué instrumentos básicos emplea el herrero para un dibujo técnico realizado con instrumentos de precisión, más allá del croquis a mano alzada?", reverso: "La regla graduada, la escuadra y el cartabón, el compás, y el transportador de ángulos, entre otros instrumentos habituales de dibujo técnico" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es un sistema de representación gráfica en dibujo técnico?", explicacion: "Un conjunto de reglas normalizadas para representar en un plano la forma de un objeto tridimensional.", dificultad: "facil", opciones: ["Reglas normalizadas para representar en un plano un objeto 3D", "Un instrumento exclusivo de medición de ángulos", "Un instrumento exclusivo de sujeción de piezas metálicas", "Una herramienta exclusiva de corte de chapa metálica"], correcta: 0 },
  { enunciado: "¿Qué es el sistema diédrico o de vistas?", explicacion: "Proyecta el objeto sobre varios planos perpendiculares, obteniendo distintas vistas.", dificultad: "media", opciones: ["Proyecta el objeto sobre varios planos perpendiculares", "Representa el objeto mediante un único punto de vista fijo", "Es exclusivo para representar piezas de sección circular", "Sustituye por completo a la necesidad de acotación numérica"], correcta: 0 },
  { enunciado: "¿Qué es una vista en corte, en dibujo técnico?", explicacion: "Muestra el interior de una pieza como si se hubiera seccionado con un plano imaginario.", dificultad: "media", opciones: ["Muestra el interior de la pieza mediante un plano imaginario", "Muestra exclusivamente el exterior de la pieza sin ningún detalle interno", "Sustituye por completo a las vistas exteriores convencionales", "Solo es aplicable a piezas de un único material metálico"], correcta: 0 },
  { enunciado: "¿Qué es el dibujo a mano alzada o croquis?", explicacion: "Un dibujo sin instrumentos de precisión, con proporción aproximada.", dificultad: "media", opciones: ["Un dibujo sin instrumentos de precisión, con proporción aproximada", "Un dibujo realizado exclusivamente con regla y compás de precisión", "Un dibujo que exige siempre una escala exacta normalizada", "Un dibujo exclusivo para representar piezas de gran tamaño"], correcta: 0 },
  { enunciado: "¿Qué instrumentos emplea el herrero para un dibujo técnico de precisión?", explicacion: "Regla graduada, escuadra y cartabón, compás y transportador de ángulos, entre otros.", dificultad: "media", opciones: ["Regla, escuadra, compás y transportador de ángulos", "Únicamente un lápiz de grafito sin ningún otro instrumento", "Únicamente una calculadora electrónica de bolsillo", "Únicamente un martillo de forja sin ningún instrumento gráfico"], correcta: 0 },
]);

const S2 = "normas-acotacion-proporcionalidad";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es la acotación en dibujo técnico?", reverso: "El conjunto de líneas, cifras y símbolos normalizados que indican en un plano las dimensiones reales de una pieza, permitiendo su fabricación sin necesidad de medir directamente sobre el propio dibujo" },
  { anverso: "¿Qué es una línea de cota en dibujo técnico?", reverso: "La línea, habitualmente paralela al elemento medido y rematada con flechas en sus extremos, sobre la que se indica el valor numérico de la dimensión acotada" },
  { anverso: "¿Qué es una línea auxiliar de cota (o línea de referencia)?", reverso: "La línea perpendicular al elemento medido que delimita el punto exacto desde y hasta el cual se mide la cota, uniendo el contorno de la pieza con la línea de cota correspondiente" },
  { anverso: "¿Qué norma técnica establece los criterios de representación y acotación en dibujo técnico habitualmente empleados en España?", reverso: "La norma UNE 1032, adaptación española de la norma internacional ISO 128" },
  { anverso: "¿Por qué es importante respetar rigurosamente las normas de acotación al elaborar un plano técnico?", reverso: "Porque una acotación incompleta, redundante o mal interpretable puede provocar errores de fabricación, al no quedar claro para el operario qué medida exacta debe respetar en cada elemento de la pieza" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es la acotación en dibujo técnico?", explicacion: "Líneas, cifras y símbolos que indican las dimensiones reales de una pieza en el plano.", dificultad: "facil", opciones: ["Líneas, cifras y símbolos que indican las dimensiones reales", "Un instrumento exclusivo de medición de ángulos", "Un sistema exclusivo de representación de vistas en corte", "Un sistema exclusivo de coloración de los planos técnicos"], correcta: 0 },
  { enunciado: "¿Qué es una línea de cota?", explicacion: "La línea sobre la que se indica el valor numérico de la dimensión acotada.", dificultad: "media", opciones: ["La línea sobre la que se indica el valor numérico de la dimensión", "La línea que delimita el contorno exterior completo de la pieza", "La línea exclusiva empleada para representar vistas en corte", "La línea exclusiva empleada para representar ejes de simetría"], correcta: 0 },
  { enunciado: "¿Qué es una línea auxiliar de cota o línea de referencia?", explicacion: "Delimita el punto exacto desde y hasta el cual se mide la cota.", dificultad: "media", opciones: ["Delimita el punto exacto desde y hasta el cual se mide la cota", "Sustituye por completo a la propia línea de cota del plano", "Solo se emplea en dibujos realizados a mano alzada", "Indica exclusivamente el material del que está hecha la pieza"], correcta: 0 },
  { enunciado: "¿Qué norma técnica establece los criterios de acotación habitualmente empleados en España?", explicacion: "La norma UNE 1032, adaptación española de la ISO 128.", dificultad: "dificil", opciones: ["La norma UNE 1032", "El Real Decreto 842/2002 (REBT)", "El Real Decreto 1215/1997", "La norma UNE-EN 60204-1"], correcta: 0 },
  { enunciado: "¿Por qué es importante respetar rigurosamente las normas de acotación al elaborar un plano técnico?", explicacion: "Una acotación incompleta o mal interpretable puede provocar errores de fabricación.", dificultad: "media", opciones: ["Una acotación incompleta puede provocar errores de fabricación", "La acotación nunca influye en el resultado final de la fabricación", "Solo es relevante en planos de piezas de gran tamaño", "La acotación solo tiene relevancia estética, sin ninguna función práctica"], correcta: 0 },
]);

const S3 = "trazado-marcado-piezas";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es el trazado de una pieza, en el oficio de herrero?", reverso: "La operación de dibujar sobre la propia superficie del material (en bruto o semielaborado) las líneas, marcas y referencias necesarias para guiar su posterior mecanizado, corte o conformado" },
  { anverso: "¿Cuál es la finalidad principal del trazado antes de mecanizar una pieza?", reverso: "Evitar errores de fabricación, optimizar el aprovechamiento del material y servir de guía visual precisa durante las operaciones posteriores de corte, taladrado o conformado" },
  { anverso: "¿Qué es el trazado plano, como clase de trazado?", reverso: "El trazado realizado sobre una superficie plana (chapa), habitualmente para definir contornos de corte, líneas de plegado o posiciones de agujeros" },
  { anverso: "¿Qué es un plano de referencia en el trazado de una pieza?", reverso: "Una superficie o línea tomada como origen de medida, a partir de la cual se referencian el resto de cotas y marcas trazadas sobre la pieza, garantizando la coherencia dimensional del conjunto" },
  { anverso: "¿Qué es el trazado al aire, y qué precauciones prácticas exige?", reverso: "El trazado realizado directamente sobre una pieza o estructura ya montada, sin el apoyo de una superficie de trabajo plana convencional; exige especial atención a la estabilidad de la pieza, la elección de un punto de referencia fiable y el uso de herramientas de trazado adaptadas a superficies irregulares o de difícil acceso" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es el trazado de una pieza en el oficio de herrero?", explicacion: "Dibujar sobre la propia superficie del material las líneas necesarias para guiar su mecanizado.", dificultad: "facil", opciones: ["Dibujar sobre el material las líneas para guiar su mecanizado", "Medir la dureza superficial del material antes de mecanizarlo", "Aplicar un tratamiento térmico previo al mecanizado de la pieza", "Unir dos piezas mediante soldadura antes de su mecanizado"], correcta: 0 },
  { enunciado: "¿Cuál es la finalidad principal del trazado antes de mecanizar una pieza?", explicacion: "Evitar errores de fabricación y optimizar el aprovechamiento del material.", dificultad: "media", opciones: ["Evitar errores de fabricación y optimizar el material", "Aumentar de forma automática la dureza de la pieza a mecanizar", "Sustituir por completo a la necesidad de cualquier plano técnico", "Reducir el peso final de la pieza antes de su mecanizado"], correcta: 0 },
  { enunciado: "¿Qué es el trazado plano, como clase de trazado?", explicacion: "El realizado sobre una superficie plana, habitualmente chapa.", dificultad: "media", opciones: ["El realizado sobre una superficie plana, como una chapa", "El realizado exclusivamente sobre piezas ya montadas en estructura", "El realizado exclusivamente sobre barras de sección circular", "El realizado exclusivamente mediante instrumentos electrónicos"], correcta: 0 },
  { enunciado: "¿Qué es un plano de referencia en el trazado de una pieza?", explicacion: "Una superficie o línea tomada como origen de medida para el resto de cotas trazadas.", dificultad: "dificil", opciones: ["Una superficie o línea tomada como origen de medida", "La línea que delimita exclusivamente el contorno final de corte", "El instrumento empleado para trazar líneas curvas sobre la pieza", "La cifra numérica que indica el espesor final de la pieza"], correcta: 0 },
  { enunciado: "¿Qué precauciones prácticas exige el trazado al aire, sobre una pieza ya montada?", explicacion: "Atención a la estabilidad de la pieza, un punto de referencia fiable y herramientas adaptadas a superficies irregulares.", dificultad: "dificil", opciones: ["Atención a la estabilidad, un punto de referencia fiable y herramientas adaptadas", "Ninguna precaución adicional respecto al trazado plano convencional", "Solo es aplicable a piezas de pequeño tamaño y fácil acceso", "Exige siempre desmontar previamente la pieza ya montada"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 14 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 14, orden: 14, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-162 creado y vinculado como Tema 14 de Oficial Herrero.");
