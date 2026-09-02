/**
 * Crea tema-158: "Normalización, proporcionalidad y escalas" — Tema 10
 * (numero=10, bloque-2) de Oficial Herrero (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 8 oficial del Anexo I (bases2110.pdf, línea 1255):
 *   "Normalización, proporcionalidad y escalas: Normalización, tolerancia
 *   y acabado superficial, Clases de escalas."
 *
 * Conocimiento técnico consolidado de dibujo técnico y normalización
 * industrial (tolerancias dimensionales, acabado superficial, escalas de
 * representación), apoyado en normas técnicas UNE/ISO de aplicación
 * voluntaria (no disposiciones del BOE) — mismo criterio ya aplicado en
 * Oficial Carpintero para dibujo técnico (UNE 1032, adaptación española
 * de la ISO 128, ver scripts/seed-tema-116-*.mjs), citadas aquí como
 * referencia técnica del sector, no como fuente legal. Búsqueda previa
 * realizada conforme al estándar de sourcing del proyecto.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-158-normalizacion-proporcionalidad-escalas.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-158";
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
  titulo: "Normalización, proporcionalidad y escalas",
  descripcion: "Normalización, tolerancia y acabado superficial. Clases de escalas.",
  contenido: "Desarrolla la normalización industrial aplicada al oficio de herrero: el concepto de tolerancia dimensional y su función en el mecanizado y ajuste de piezas, el acabado superficial y su influencia en el funcionamiento de una pieza, y las clases de escalas empleadas en la representación gráfica de planos (de reducción, naturales y de ampliación).",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "Normalización y tolerancias dimensionales", seccion: "normalizacion-tolerancias", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Acabado superficial", seccion: "acabado-superficial", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Clases de escalas y proporcionalidad", seccion: "clases-escalas-proporcionalidad", articulos: "Conceptos fundamentales" },
  ],
}]);

const S1 = "normalizacion-tolerancias";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es la normalización industrial?", reverso: "El proceso de establecer y aplicar reglas, dimensiones y especificaciones comunes (normas técnicas) para unificar productos, materiales y procesos, facilitando su fabricación, intercambio y comprobación" },
  { anverso: "¿Qué ventajas aporta la normalización al trabajo de un taller de herrería?", reverso: "Permite emplear materiales, piezas y herramientas de fabricantes distintos con garantía de compatibilidad, facilita la sustitución de piezas y reduce errores de interpretación en los planos y especificaciones" },
  { anverso: "¿Qué es la tolerancia dimensional de una pieza mecanizada?", reverso: "El margen admisible de variación respecto a la medida nominal (o teórica) de una pieza, dentro del cual esta se considera correctamente fabricada y apta para su función" },
  { anverso: "¿Por qué es necesaria la tolerancia dimensional en la fabricación de piezas, en lugar de exigir una medida exacta?", reverso: "Porque ningún proceso de fabricación puede garantizar una medida exacta al cien por cien; la tolerancia define el margen de error aceptable que sigue permitiendo el correcto funcionamiento y ajuste de la pieza con otras" },
  { anverso: "¿Qué es un ajuste entre dos piezas, en relación con las tolerancias dimensionales de cada una?", reverso: "La relación resultante entre las tolerancias de dos piezas que deben encajar entre sí (por ejemplo, un eje y un agujero), que puede ser de holgura, de apriete o de transición, según el margen de juego resultante" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es la normalización industrial?", explicacion: "Establecer reglas y especificaciones comunes para unificar productos, materiales y procesos.", dificultad: "facil", opciones: ["Establecer reglas comunes para unificar productos y procesos", "Un proceso exclusivo de acabado superficial de una pieza", "Un proceso exclusivo de tratamiento térmico del acero", "Un proceso exclusivo de medición del peso de una pieza"], correcta: 0 },
  { enunciado: "¿Qué ventaja aporta la normalización al trabajo de un taller de herrería?", explicacion: "Permite compatibilidad entre materiales y piezas de fabricantes distintos.", dificultad: "media", opciones: ["Permite compatibilidad entre materiales de fabricantes distintos", "Elimina por completo la necesidad de cualquier tolerancia dimensional", "Aumenta siempre el precio final de los materiales empleados", "Reduce la vida útil de las piezas fabricadas en el taller"], correcta: 0 },
  { enunciado: "¿Qué es la tolerancia dimensional de una pieza mecanizada?", explicacion: "El margen admisible de variación respecto a su medida nominal.", dificultad: "media", opciones: ["El margen admisible de variación respecto a su medida nominal", "La medida exacta que debe tener la pieza sin ningún margen", "El acabado superficial exigido a la pieza terminada", "La escala empleada para representar la pieza en un plano"], correcta: 0 },
  { enunciado: "¿Por qué es necesaria la tolerancia dimensional en la fabricación de piezas?", explicacion: "Porque ningún proceso de fabricación garantiza una medida exacta al cien por cien.", dificultad: "media", opciones: ["Ningún proceso de fabricación garantiza una medida exacta", "Porque las normas técnicas prohíben cualquier medida exacta", "Porque las piezas nunca necesitan encajar entre sí", "Porque la tolerancia elimina la necesidad de mecanizado"], correcta: 0 },
  { enunciado: "¿Qué es un ajuste entre dos piezas que deben encajar entre sí?", explicacion: "La relación resultante entre sus tolerancias, que puede ser de holgura, apriete o transición.", dificultad: "dificil", opciones: ["La relación entre sus tolerancias: holgura, apriete o transición", "La medida exacta idéntica exigida a ambas piezas sin margen", "El acabado superficial exigido a ambas piezas por igual", "La escala de representación empleada para ambas piezas"], correcta: 0 },
]);

const S2 = "acabado-superficial";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es el acabado superficial de una pieza mecanizada?", reverso: "El conjunto de características de la superficie de una pieza tras su fabricación, especialmente su rugosidad (irregularidades microscópicas), que influye en su funcionamiento, rozamiento y resistencia al desgaste" },
  { anverso: "¿Qué es la rugosidad superficial de una pieza?", reverso: "El conjunto de irregularidades microscópicas presentes en la superficie de una pieza tras su mecanizado, expresadas habitualmente mediante un valor numérico normalizado" },
  { anverso: "¿Por qué influye el acabado superficial en el rozamiento entre dos piezas que deslizan entre sí?", reverso: "Porque una superficie más rugosa genera mayor fricción y desgaste entre las piezas en contacto, mientras que una superficie más fina (menor rugosidad) facilita un deslizamiento más suave" },
  { anverso: "¿Qué proceso de acabado puede emplear el herrero para mejorar la rugosidad superficial de una pieza tras su mecanizado inicial?", reverso: "El pulido, el esmerilado o el lijado, entre otros procesos de acabado que reducen las irregularidades microscópicas de la superficie" },
  { anverso: "¿Qué relación existe entre el acabado superficial de una pieza y su resistencia a la corrosión?", reverso: "Una superficie más lisa y sin irregularidades ofrece menos puntos de anclaje para la humedad y los agentes corrosivos, dificultando el inicio de la oxidación respecto a una superficie más rugosa e irregular" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es el acabado superficial de una pieza mecanizada?", explicacion: "El conjunto de características de su superficie, especialmente la rugosidad.", dificultad: "facil", opciones: ["El conjunto de características de su superficie, en especial la rugosidad", "El margen admisible de variación respecto a su medida nominal", "El tratamiento térmico aplicado a la pieza terminada", "La escala empleada para representar la pieza en un plano"], correcta: 0 },
  { enunciado: "¿Qué es la rugosidad superficial de una pieza?", explicacion: "Las irregularidades microscópicas presentes en su superficie tras el mecanizado.", dificultad: "media", opciones: ["Las irregularidades microscópicas de su superficie", "El margen de tolerancia dimensional admitido para la pieza", "El tipo de tratamiento térmico aplicado a la pieza", "La escala de representación empleada en el plano de la pieza"], correcta: 0 },
  { enunciado: "¿Por qué influye el acabado superficial en el rozamiento entre dos piezas que deslizan entre sí?", explicacion: "Una superficie más rugosa genera mayor fricción y desgaste.", dificultad: "media", opciones: ["Una superficie más rugosa genera mayor fricción y desgaste", "La rugosidad superficial nunca influye en el rozamiento entre piezas", "Una superficie más rugosa siempre reduce el rozamiento entre piezas", "El acabado superficial solo influye en el aspecto estético de la pieza"], correcta: 0 },
  { enunciado: "¿Qué proceso puede emplear el herrero para mejorar el acabado superficial de una pieza tras su mecanizado?", explicacion: "El pulido, el esmerilado o el lijado.", dificultad: "facil", opciones: ["El pulido, el esmerilado o el lijado", "El temple exclusivamente, sin ningún otro proceso posible", "La galvanización exclusivamente, sin ningún otro proceso posible", "El revenido exclusivamente, sin ningún otro proceso posible"], correcta: 0 },
  { enunciado: "¿Qué relación existe entre el acabado superficial y la resistencia a la corrosión de una pieza?", explicacion: "Una superficie más lisa ofrece menos puntos de anclaje para la humedad y los agentes corrosivos.", dificultad: "dificil", opciones: ["Una superficie más lisa dificulta el inicio de la oxidación", "El acabado superficial no guarda ninguna relación con la corrosión", "Una superficie más rugosa siempre resiste mejor la corrosión", "Solo la galvanización influye en la resistencia a la corrosión"], correcta: 0 },
]);

const S3 = "clases-escalas-proporcionalidad";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es la escala de un plano o dibujo técnico?", reverso: "La relación de proporcionalidad entre las dimensiones representadas en el plano y las dimensiones reales del objeto o pieza representada" },
  { anverso: "¿Qué es una escala de reducción?", reverso: "Una escala en la que las dimensiones del plano son menores que las dimensiones reales del objeto representado (por ejemplo, 1:10, donde 1 unidad del plano equivale a 10 unidades reales), empleada para representar objetos o conjuntos de gran tamaño" },
  { anverso: "¿Qué es una escala natural?", reverso: "Una escala en la que las dimensiones del plano coinciden exactamente con las dimensiones reales del objeto representado (escala 1:1), empleada habitualmente para piezas de pequeño o mediano tamaño" },
  { anverso: "¿Qué es una escala de ampliación?", reverso: "Una escala en la que las dimensiones del plano son mayores que las dimensiones reales del objeto representado (por ejemplo, 2:1, donde 2 unidades del plano equivalen a 1 unidad real), empleada para representar con mayor claridad detalles de piezas muy pequeñas" },
  { anverso: "¿Qué debe indicarse siempre junto a una escala de reducción o ampliación en un plano técnico?", reverso: "Su relación numérica exacta (por ejemplo, 1:5 o 2:1), de forma que cualquier persona que consulte el plano pueda calcular correctamente las dimensiones reales del objeto representado" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es la escala de un plano o dibujo técnico?", explicacion: "La relación de proporcionalidad entre las dimensiones del plano y las dimensiones reales.", dificultad: "facil", opciones: ["La relación de proporcionalidad entre plano y dimensiones reales", "El margen admisible de variación respecto a la medida nominal", "El acabado superficial exigido a la pieza representada", "El tipo de tratamiento térmico aplicado a la pieza"], correcta: 0 },
  { enunciado: "¿Qué es una escala de reducción?", explicacion: "Las dimensiones del plano son menores que las reales.", dificultad: "media", opciones: ["Las dimensiones del plano son menores que las reales", "Las dimensiones del plano son mayores que las reales", "Las dimensiones del plano coinciden exactamente con las reales", "Una escala que no permite calcular dimensiones reales"], correcta: 0 },
  { enunciado: "¿Qué es una escala natural?", explicacion: "Escala 1:1, donde el plano coincide exactamente con las dimensiones reales.", dificultad: "media", opciones: ["Escala 1:1, coincide con las dimensiones reales", "Escala 1:10, muy inferior a las dimensiones reales", "Escala 2:1, superior a las dimensiones reales", "Una escala exclusiva para objetos de gran tamaño"], correcta: 0 },
  { enunciado: "¿Cuándo resulta especialmente útil una escala de ampliación?", explicacion: "Para representar con claridad detalles de piezas muy pequeñas.", dificultad: "media", opciones: ["Para representar con claridad detalles de piezas muy pequeñas", "Para representar edificios completos de gran tamaño", "Para representar el plano general de un municipio", "Nunca resulta útil en el dibujo técnico de piezas"], correcta: 0 },
  { enunciado: "¿Qué debe indicarse siempre junto a una escala de reducción o ampliación en un plano técnico?", explicacion: "Su relación numérica exacta, para poder calcular las dimensiones reales.", dificultad: "dificil", opciones: ["Su relación numérica exacta", "Únicamente el color de las líneas del plano", "Únicamente el nombre del delineante que ha elaborado el plano", "Únicamente la fecha de elaboración del plano técnico"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 10 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 10, orden: 10, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-158 creado y vinculado como Tema 10 de Oficial Herrero.");
