/**
 * Crea tema-253: "Materiales de rotulación" — Tema 9 (numero=9,
 * bloque-2) de Oficial Pintor, Especialidad Gráfica (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 7 oficial del Anexo I (bases2110.pdf, línea
 * 1503): "Materiales de rotulación. Vinilo de corte. Vinilo al ácido.
 * Láminas de protección solar. Laminados. Normativa."
 *
 * Normativa: Reglamento CLP (DOUE-L-2008-82637, ya citado en el
 * proyecto), clasificación y etiquetado, de aplicación a los adhesivos
 * y al vinilo al ácido (que contiene un componente químico corrosivo).
 * El resto (tipos y usos de cada material) es conocimiento técnico
 * consolidado del oficio.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-253-materiales-rotulacion.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-253";
const OPOSICION = "oficial-pintor-grafica-ayto-zaragoza";
const BLOQUE_2_ID = "1e5d5916-cf4a-4920-9175-579f18034ad6";

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
  titulo: "Materiales de rotulación",
  descripcion: "El vinilo de corte y el vinilo al ácido. Láminas de protección solar. Laminados de protección. Normativa de etiquetado de los productos químicos empleados.",
  contenido: "Desarrolla los materiales específicos de rotulación: el vinilo de corte, empleado para recortar directamente letras y formas; el vinilo al ácido (o vinilo grabado), que simula el aspecto del vidrio grabado al ácido; las láminas de protección solar, que reducen la entrada de luz y calor a través de un cristal; y los laminados de protección, ya introducidos en el tema anterior. Se incluye la normativa de clasificación y etiquetado (Reglamento CLP) aplicable a los productos químicos empleados en estos materiales, especialmente relevante en el caso del vinilo al ácido.",
  enlaces_boe: [
    { url: REGLAMENTO_CLP, titulo: "Reglamento (CE) 1272/2008 (CLP) — clasificación, etiquetado y envasado" },
  ],
  indice_estudio: [
    { url: "", titulo: "El vinilo de corte y sus usos", seccion: "vinilo-corte-usos", articulos: "Conocimiento técnico del oficio" },
    { url: REGLAMENTO_CLP, titulo: "El vinilo al ácido y las láminas de protección solar", seccion: "vinilo-acido-laminas-proteccion-solar", articulos: "Reglamento CLP" },
    { url: "", titulo: "Los laminados de protección: tipos y usos", seccion: "laminados-proteccion-tipos-usos", articulos: "Conocimiento técnico del oficio" },
  ],
}]);

const S1 = "vinilo-corte-usos";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es el vinilo de corte, ya introducido en temas anteriores?", reverso: "Un vinilo adhesivo de color uniforme del que se recortan directamente letras, formas o logotipos mediante una plotter de corte, sin ningún proceso de impresión previo, muy empleado en rótulos, escaparates y señalización" },
  { anverso: "¿Qué diferencia existe entre un vinilo de corte monomérico y uno polimérico?", reverso: "El vinilo monomérico es más económico y menos flexible, adecuado para aplicaciones planas y de corta o media duración; el vinilo polimérico es más flexible, resistente y duradero, adecuado para superficies curvas y aplicaciones de larga duración en exterior" },
  { anverso: "¿Para qué tipo de trabajo resulta especialmente adecuado el vinilo de corte frente a un vinilo impreso?", reverso: "Para rótulos de texto o formas de un único color, sin degradados ni imágenes complejas, donde el corte directo del vinilo resulta más rápido, económico y de bordes más nítidos que una impresión seguida de recorte" },
  { anverso: "¿Qué precaución debe adoptarse al elegir el color de un vinilo de corte destinado a exterior, dada la exposición prolongada al sol?", reverso: "Elegir un vinilo con buena resistencia a los rayos UV, dado que ciertos colores (especialmente los rojos y algunos tonos vivos) tienden a decolorarse con mayor rapidez que otros bajo una exposición solar prolongada" },
  { anverso: "¿Qué es el brillo o acabado de un vinilo de corte, característica a considerar según el uso previsto?", reverso: "La terminación superficial del vinilo (brillante, mate o satinada), que influye en el aspecto final del rótulo y en su comportamiento frente a los reflejos de luz, siendo relevante elegir el acabado adecuado según la ubicación y la visibilidad requerida" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es el vinilo de corte?", explicacion: "Un vinilo adhesivo de color uniforme del que se recortan letras o formas mediante plotter.", dificultad: "facil", opciones: ["Un vinilo de color uniforme recortado mediante plotter", "Un vinilo que recibe primero una imagen impresa", "Una pintura líquida de secado rápido para exteriores", "Un tipo de barniz transparente de protección"], correcta: 0 },
  { enunciado: "¿Qué diferencia un vinilo de corte monomérico de uno polimérico?", explicacion: "El monomérico es más económico y menos flexible; el polimérico, más flexible y duradero.", dificultad: "media", opciones: ["El polimérico es más flexible y duradero que el monomérico", "Ambos tipos de vinilo son exactamente equivalentes", "El monomérico siempre resulta más duradero que el polimérico", "El polimérico nunca puede aplicarse en superficies curvas"], correcta: 0 },
  { enunciado: "¿Para qué tipo de trabajo resulta especialmente adecuado el vinilo de corte?", explicacion: "Rótulos de texto o formas de un único color, sin degradados ni imágenes complejas.", dificultad: "media", opciones: ["Rótulos de texto de un único color sin imágenes complejas", "Fotografías con degradados de color complejos", "Imágenes con múltiples colores mezclados", "Ningún tipo de trabajo resulta especialmente adecuado"], correcta: 0 },
  { enunciado: "¿Qué precaución debe adoptarse al elegir el color de un vinilo de corte para exterior?", explicacion: "Elegir un vinilo con buena resistencia UV, dado que ciertos colores decoloran antes que otros.", dificultad: "dificil", opciones: ["Elegir un vinilo con buena resistencia a los rayos UV", "El color elegido nunca influye en la resistencia UV", "Todos los colores decoloran exactamente al mismo ritmo", "Solo resulta relevante en vinilos de tipo impreso"], correcta: 0 },
  { enunciado: "¿Qué es el brillo o acabado de un vinilo de corte?", explicacion: "La terminación superficial (brillante, mate o satinada) que influye en el aspecto final.", dificultad: "media", opciones: ["La terminación superficial que influye en el aspecto final", "El color exacto del vinilo elegido para el rótulo", "El tipo de adhesivo empleado en el vinilo", "El grosor exacto de la lámina de vinilo"], correcta: 0 },
]);

const S2 = "vinilo-acido-laminas-proteccion-solar";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es el vinilo al ácido (o vinilo grabado)?", reverso: "Un vinilo adhesivo translúcido, de textura y aspecto similar al del vidrio grabado al ácido, empleado para decorar cristales y mamparas aportando privacidad parcial sin renunciar por completo al paso de la luz" },
  { anverso: "¿Por qué recibe el nombre de \"vinilo al ácido\", pese a que su aplicación no implique el uso real de ácido?", reverso: "Porque su aspecto final imita visualmente el efecto del grabado al ácido tradicional sobre vidrio (una técnica que sí emplea ácido fluorhídrico para atacar químicamente la superficie del cristal), reproduciendo ese efecto mediante un material adhesivo sin necesidad de manipular productos corrosivos" },
  { anverso: "¿Qué es una lámina de protección solar, empleada sobre cristales de edificios municipales?", reverso: "Una lámina adhesiva transparente o tintada que se aplica sobre un cristal para reducir la entrada de radiación solar, el deslumbramiento y la ganancia de calor en el interior del espacio, contribuyendo también, en ocasiones, a la eficiencia energética del edificio" },
  { anverso: "¿Qué información debería consultar el Oficial Pintor Especialidad Gráfica en la ficha técnica de una lámina de protección solar antes de aplicarla?", reverso: "El porcentaje de rechazo solar y de transmisión de luz visible que ofrece el producto, que determina el grado de reducción de calor y de deslumbramiento logrado, y que debe ajustarse a las necesidades concretas del espacio a tratar" },
  { anverso: "¿Qué precaución debe adoptarse al manipular los adhesivos empleados con estos materiales (vinilo al ácido, láminas de protección solar), conforme al Reglamento CLP?", reverso: "Consultar los pictogramas de peligro, las indicaciones de peligro (H) y los consejos de prudencia (P) de la etiqueta del producto, adoptando las medidas de protección indicadas (ventilación, guantes) según los riesgos identificados" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es el vinilo al ácido o vinilo grabado?", explicacion: "Un vinilo translúcido que imita el aspecto del vidrio grabado al ácido.", dificultad: "media", opciones: ["Un vinilo translúcido que imita el vidrio grabado al ácido", "Un vinilo opaco de color uniforme para rótulos", "Una pintura líquida exclusiva para cristales", "Un tipo de laminado de protección exterior"], correcta: 0 },
  { enunciado: "¿Por qué recibe el nombre de \"vinilo al ácido\" este material?", explicacion: "Imita visualmente el efecto del grabado al ácido tradicional sobre vidrio.", dificultad: "dificil", opciones: ["Imita el efecto del grabado al ácido tradicional sobre vidrio", "Porque su aplicación exige manipular ácido fluorhídrico real", "Porque se fabrica disolviendo el vinilo en ácido", "Porque protege el cristal frente a la corrosión ácida"], correcta: 0 },
  { enunciado: "¿Qué es una lámina de protección solar?", explicacion: "Una lámina que reduce la entrada de radiación solar, deslumbramiento y calor.", dificultad: "media", opciones: ["Una lámina que reduce radiación solar, deslumbramiento y calor", "Un vinilo de corte exclusivo para rótulos de texto", "Un laminado exclusivo para proteger impresiones digitales", "Un adhesivo exclusivo para fijar carteles de gran formato"], correcta: 0 },
  { enunciado: "¿Qué información debería consultarse en la ficha técnica de una lámina de protección solar?", explicacion: "El porcentaje de rechazo solar y de transmisión de luz visible.", dificultad: "media", opciones: ["El porcentaje de rechazo solar y transmisión de luz visible", "Únicamente el precio del producto por metro cuadrado", "Únicamente el color disponible del producto", "Únicamente la marca comercial del fabricante"], correcta: 0 },
  { enunciado: "¿Qué debe consultarse en la etiqueta de los adhesivos empleados con estos materiales, conforme al Reglamento CLP?", explicacion: "Pictogramas de peligro, indicaciones H y consejos de prudencia P.", dificultad: "media", opciones: ["Pictogramas de peligro, indicaciones H y consejos P", "Únicamente el precio de venta del producto", "Únicamente la marca comercial del fabricante", "Únicamente el color del envase del producto"], correcta: 0 },
]);

const S3 = "laminados-proteccion-tipos-usos";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un laminado brillante, como acabado de protección de una impresión?", reverso: "Un laminado transparente que aporta un acabado de alto brillo a la impresión protegida, realzando la saturación de los colores, aunque puede resultar más propenso a mostrar reflejos y huellas dactilares que un acabado mate" },
  { anverso: "¿Qué es un laminado mate, como acabado alternativo de protección?", reverso: "Un laminado transparente que aporta un acabado sin brillo a la impresión protegida, reduciendo los reflejos y disimulando mejor las huellas dactilares, aunque puede atenuar ligeramente la saturación percibida de los colores respecto a un laminado brillante" },
  { anverso: "¿Qué es un laminado antigraffiti, empleado en elementos de mobiliario urbano o señalización municipal expuestos al vandalismo?", reverso: "Un laminado de protección específico, formulado para resistir pintadas y facilitar su posterior limpieza sin dañar la impresión o el material subyacente, empleado en superficies especialmente expuestas al riesgo de grafitis en el espacio público" },
  { anverso: "¿Qué relación existe entre el laminado antigraffiti y los productos de protección antigrafiti que se estudiarán como parte de los soportes del material gráfico en un tema posterior de este bloque?", reverso: "Ambos persiguen el mismo objetivo (facilitar la limpieza de pintadas no deseadas), pero el laminado antigraffiti se aplica como una capa adicional sobre el propio material impreso, mientras que otros productos antigrafiti pueden aplicarse directamente sobre superficies sin necesidad de un laminado" },
  { anverso: "¿Por qué es relevante elegir el tipo de laminado (brillante, mate, antigraffiti) en función del uso final y la ubicación del material gráfico, y no de forma indiferente?", reverso: "Porque cada tipo de laminado ofrece un equilibrio distinto entre estética, resistencia mecánica y facilidad de mantenimiento, y una elección inadecuada puede comprometer la durabilidad o el aspecto final del trabajo en su ubicación real de uso" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué caracteriza a un laminado brillante?", explicacion: "Aporta un acabado de alto brillo que realza la saturación de los colores.", dificultad: "facil", opciones: ["Aporta un acabado de alto brillo que realza el color", "Aporta un acabado mate que reduce los reflejos", "Es un laminado exclusivo para exteriores muy expuestos", "Es un laminado exclusivo para trabajos antigraffiti"], correcta: 0 },
  { enunciado: "¿Qué ventaja ofrece un laminado mate frente a uno brillante?", explicacion: "Reduce los reflejos y disimula mejor las huellas dactilares.", dificultad: "media", opciones: ["Reduce los reflejos y disimula mejor las huellas", "Siempre realza más la saturación del color que el brillante", "Nunca resulta adecuado para trabajos de exterior", "Ofrece siempre mayor resistencia mecánica que el brillante"], correcta: 0 },
  { enunciado: "¿Qué es un laminado antigraffiti?", explicacion: "Un laminado formulado para resistir pintadas y facilitar su limpieza posterior.", dificultad: "media", opciones: ["Un laminado formulado para resistir pintadas y facilitar limpieza", "Un laminado exclusivo para interiores sin riesgo de vandalismo", "Un laminado que impide por completo cualquier tipo de limpieza", "Un laminado exclusivo para proteger frente a la humedad"], correcta: 0 },
  { enunciado: "¿Qué relación existe entre el laminado antigraffiti y otros productos antigrafiti aplicados directamente sobre superficies?", explicacion: "Ambos facilitan la limpieza de pintadas, pero el laminado se aplica sobre el propio material impreso.", dificultad: "dificil", opciones: ["Ambos facilitan la limpieza, pero se aplican de forma distinta", "Ambos son exactamente el mismo producto con distinto nombre", "El laminado antigraffiti nunca guarda relación con estos productos", "Solo los productos antigrafiti directos resultan realmente eficaces"], correcta: 0 },
  { enunciado: "¿Por qué es relevante elegir el tipo de laminado según el uso final y la ubicación del trabajo?", explicacion: "Cada tipo ofrece un equilibrio distinto entre estética, resistencia y mantenimiento.", dificultad: "media", opciones: ["Cada tipo ofrece un equilibrio distinto según sus características", "El tipo de laminado nunca influye en el resultado final", "Siempre conviene elegir el laminado de mayor precio disponible", "La elección del laminado solo depende de su color disponible"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 9 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 9, orden: 9, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-253 creado y vinculado como Tema 9 de Oficial Pintor Gráfica.");
