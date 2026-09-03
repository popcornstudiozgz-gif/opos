/**
 * Crea tema-244: "Pintura decorativa. Aerografía" — Tema 16
 * (numero=16, bloque-2) de Oficial Pintor, Especialidad General (Ayto.
 * Zaragoza).
 *
 * Corresponde al TEMA 14 oficial del Anexo I (bases2110.pdf, línea
 * 1471): "Pintura Decorativa. Aerografía. Imitaciones. Materiales.
 * Herramientas. Métodos de aplicación."
 *
 * Conocimiento técnico consolidado del oficio (técnicas decorativas y
 * de aerografía sin regulación legal propia), sin ley española única
 * que lo regule — mismo criterio que en otros temas de técnica pura del
 * oficio ya aplicados en el proyecto. Búsqueda previa realizada
 * conforme al estándar de sourcing del proyecto: no existe normativa
 * específica distinta de la ya introducida en temas anteriores sobre
 * productos químicos (Reglamento CLP, RD 227/2006).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-244-pintura-decorativa-aerografia.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-244";
const OPOSICION = "oficial-pintor-general-ayto-zaragoza";
const BLOQUE_2_ID = "77506e2f-f4c6-4512-8bf8-99d0b3bbbafd";

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
  titulo: "Pintura decorativa. Aerografía",
  descripcion: "Técnicas de pintura decorativa. La aerografía y sus equipos. Imitaciones de materiales mediante técnicas decorativas de pintura. Materiales, herramientas y métodos de aplicación.",
  contenido: "Desarrolla las técnicas decorativas propias del oficio de pintor, más allá del acabado liso convencional: las técnicas de pintura decorativa (veladuras, estucados, efectos texturados); la aerografía, como técnica de proyección fina y controlada de pintura mediante un aerógrafo, empleada en trabajos de detalle, degradados y decoración artística; las técnicas de imitación de materiales (madera, mármol, piedra) mediante pintura; y los materiales, herramientas y métodos de aplicación específicos de cada técnica decorativa.",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "Técnicas de pintura decorativa", seccion: "tecnicas-pintura-decorativa", articulos: "Conocimiento técnico del oficio" },
    { url: "", titulo: "La aerografía: equipos y técnica de aplicación", seccion: "aerografia-equipos-tecnica-aplicacion", articulos: "Conocimiento técnico del oficio" },
    { url: "", titulo: "Imitaciones de materiales mediante pintura", seccion: "imitaciones-materiales-pintura", articulos: "Conocimiento técnico del oficio" },
  ],
}]);

const S1 = "tecnicas-pintura-decorativa";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es una veladura, como técnica de pintura decorativa?", reverso: "Una técnica que consiste en aplicar una capa muy diluida y semitransparente de pintura sobre un color base ya seco, dejando entrever el color de fondo y logrando efectos de profundidad, matiz o envejecimiento controlado" },
  { anverso: "¿Qué es un estucado decorativo, aplicado con pintura o pasta específica?", reverso: "Una técnica que emplea una pasta o pintura de textura espesa, aplicada con llana o espátula en varias pasadas y a veces pulida posteriormente, para lograr un acabado con relieve, brillo o un efecto similar al del estuco tradicional de cal" },
  { anverso: "¿Qué es un efecto texturado, como técnica de pintura decorativa?", reverso: "Un acabado que combina una pintura de textura espesa (con carga) con herramientas específicas (rodillos de relieve, esponjas, espátulas de dibujo) para generar un patrón o relieve superficial deliberado, distinto del acabado liso convencional" },
  { anverso: "¿Qué precaución debe adoptarse al aplicar una veladura sobre un color base, respecto al orden y al tiempo de secado?", reverso: "Esperar a que el color base esté completamente seco antes de aplicar la veladura, evitando que ambas capas se mezclen de forma incontrolada, y trabajar por zonas manejables si la técnica exige difuminar el producto antes de que comience a secar" },
  { anverso: "¿Por qué suele emplearse una herramienta específica (trapo, esponja marina, brocha de veladura) en lugar de un rodillo convencional para aplicar muchas técnicas decorativas?", reverso: "Porque estas herramientas permiten controlar mejor la cantidad de producto aplicado y generar la textura o el efecto irregular característico de la técnica decorativa, mientras que un rodillo convencional tiende a dejar un acabado uniforme, opuesto al efecto buscado" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es una veladura, como técnica de pintura decorativa?", explicacion: "Una capa muy diluida y semitransparente aplicada sobre un color base ya seco.", dificultad: "facil", opciones: ["Una capa diluida y semitransparente sobre un color base", "Una capa opaca de gran espesor aplicada con llana", "Un tipo de imprimación antioxidante para metal", "Un aditivo que aumenta la viscosidad de la pintura"], correcta: 0 },
  { enunciado: "¿Qué es un estucado decorativo?", explicacion: "Una técnica con pasta espesa aplicada con llana, en varias pasadas, con relieve o brillo.", dificultad: "media", opciones: ["Una técnica con pasta espesa aplicada con llana", "Una técnica de proyección fina mediante aerógrafo", "Una capa muy diluida aplicada sobre un color base", "Un tipo de barniz exclusivo para exteriores"], correcta: 0 },
  { enunciado: "¿Qué es un efecto texturado, como técnica decorativa?", explicacion: "Un acabado que combina pintura espesa con herramientas específicas para generar relieve.", dificultad: "media", opciones: ["Un acabado que combina pintura espesa con herramientas de relieve", "Una capa muy diluida y semitransparente", "Una técnica exclusiva de proyección con aerógrafo", "Un tipo de imprimación selladora para yeso"], correcta: 0 },
  { enunciado: "¿Qué precaución debe respetarse al aplicar una veladura sobre un color base?", explicacion: "Esperar a que el color base esté completamente seco antes de aplicar la veladura.", dificultad: "media", opciones: ["Esperar a que el color base esté completamente seco", "Aplicar siempre la veladura sobre el color base aún húmedo", "El tiempo de secado del color base nunca resulta relevante", "Aplicar siempre ambas capas de forma simultánea"], correcta: 0 },
  { enunciado: "¿Por qué se emplean herramientas específicas (trapo, esponja) en lugar de un rodillo convencional en muchas técnicas decorativas?", explicacion: "Permiten controlar la cantidad de producto y generar la textura irregular característica.", dificultad: "dificil", opciones: ["Permiten controlar el producto y generar la textura buscada", "El rodillo convencional siempre genera mejores efectos decorativos", "No existe ninguna diferencia real entre ambas herramientas", "Solo se emplean por motivos de coste de la herramienta"], correcta: 0 },
]);

const S2 = "aerografia-equipos-tecnica-aplicacion";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un aerógrafo?", reverso: "Un pequeño instrumento de precisión, accionado por aire comprimido, que pulveriza pintura en forma de fina niebla a través de una boquilla, permitiendo un control muy preciso del trazo, el degradado y el detalle, mayor que el de una pistola de pintar convencional" },
  { anverso: "¿Qué equipo auxiliar resulta imprescindible para el funcionamiento de un aerógrafo?", reverso: "Un compresor de aire, que suministra el aire a presión constante necesario para pulverizar la pintura a través del aerógrafo, habitualmente con un regulador de presión y un filtro que elimina la humedad y las partículas del aire comprimido" },
  { anverso: "¿Qué es una plantilla o máscara, empleada habitualmente junto con el aerógrafo?", reverso: "Una lámina recortada (de papel, vinilo o plástico) que se coloca sobre la superficie para proteger las zonas que no deben recibir pintura, permitiendo proyectar el color únicamente sobre las áreas delimitadas por el recorte, con bordes nítidos" },
  { anverso: "¿Qué diferencia principal existe entre un aerógrafo y una pistola de pintar convencional?", reverso: "El aerógrafo trabaja con un caudal de pintura mucho menor y una boquilla de menor diámetro, orientado a trabajos de detalle, degradados suaves y precisión, mientras que la pistola convencional está orientada a cubrir superficies grandes con mayor rapidez y caudal" },
  { anverso: "¿Qué precaución de limpieza resulta especialmente importante tras el uso de un aerógrafo?", reverso: "Limpiar a fondo y de inmediato el depósito, la boquilla y el conducto interno del aerógrafo con el disolvente adecuado al producto empleado, dado que sus componentes son de dimensiones muy reducidas y se obstruyen con facilidad si la pintura seca en su interior" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es un aerógrafo?", explicacion: "Un instrumento de precisión accionado por aire comprimido que pulveriza pintura con gran control.", dificultad: "facil", opciones: ["Un instrumento de precisión que pulveriza pintura con gran control", "Una llana empleada para técnicas de estucado", "Un tipo de brocha de veladura de gran tamaño", "Un compresor de aire de gran caudal"], correcta: 0 },
  { enunciado: "¿Qué equipo auxiliar resulta imprescindible para el funcionamiento de un aerógrafo?", explicacion: "Un compresor de aire que suministra aire a presión constante.", dificultad: "media", opciones: ["Un compresor de aire a presión constante", "Una llana metálica de gran tamaño", "Un rodillo de textura especial", "Una espátula de masillar convencional"], correcta: 0 },
  { enunciado: "¿Qué es una plantilla o máscara empleada junto con el aerógrafo?", explicacion: "Una lámina recortada que protege las zonas que no deben recibir pintura.", dificultad: "media", opciones: ["Una lámina recortada que protege zonas sin pintar", "Un tipo de brocha de precisión para veladuras", "Un equipo de protección respiratoria del operario", "Un compresor auxiliar de menor tamaño"], correcta: 0 },
  { enunciado: "¿Qué diferencia principal existe entre un aerógrafo y una pistola de pintar convencional?", explicacion: "El aerógrafo tiene menor caudal y boquilla, orientado a detalle y precisión, no a grandes superficies.", dificultad: "dificil", opciones: ["El aerógrafo tiene menor caudal, orientado al detalle", "Ambos equipos funcionan de forma exactamente idéntica", "La pistola convencional siempre ofrece mayor precisión", "El aerógrafo se emplea exclusivamente en exteriores"], correcta: 0 },
  { enunciado: "¿Por qué es especialmente importante limpiar a fondo el aerógrafo tras su uso?", explicacion: "Sus componentes son de dimensiones muy reducidas y se obstruyen con facilidad si la pintura seca dentro.", dificultad: "media", opciones: ["Sus componentes reducidos se obstruyen si la pintura seca dentro", "La limpieza del aerógrafo nunca resulta especialmente relevante", "Solo resulta relevante si se emplea pintura de base acuosa", "Solo resulta relevante una vez al mes de uso continuado"], correcta: 0 },
]);

const S3 = "imitaciones-materiales-pintura";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es una técnica de imitación de veta de madera (o \"efecto madera\") mediante pintura?", reverso: "Una técnica decorativa que reproduce, sobre una superficie que no es de madera real, el aspecto visual de la veta y el color característicos de una especie de madera, mediante veladuras superpuestas, peines especiales o esponjas que arrastran el producto imitando el dibujo natural de la veta" },
  { anverso: "¿Qué es una técnica de imitación de mármol (o \"efecto mármol\") mediante pintura?", reverso: "Una técnica decorativa que reproduce las vetas, las vetas cruzadas y el aspecto pulido característico del mármol natural sobre una superficie plana, empleando veladuras de distintos tonos, plumas o pinceles finos para dibujar las vetas, y un sellado final que aporta brillo similar al del mármol pulido" },
  { anverso: "¿Por qué se emplean técnicas de imitación de materiales nobles (madera, mármol, piedra) en lugar del material real en determinados elementos decorativos?", reverso: "Porque permiten obtener un efecto visual similar al del material noble con un coste, un peso y un mantenimiento considerablemente inferiores, siendo especialmente útiles en restauración, decoración de interiores o elementos donde el material real resultaría inviable técnica o económicamente" },
  { anverso: "¿Qué habilidad resulta especialmente relevante para el Oficial Pintor en la ejecución de técnicas de imitación de materiales?", reverso: "Una buena observación previa del material real a imitar (su color, su patrón de vetas, su brillo), junto con el dominio de la herramienta específica de cada técnica (peine, pluma, esponja), dado que el resultado depende en gran medida de la destreza manual y del criterio estético de quien lo ejecuta" },
  { anverso: "¿Qué relación existe entre las técnicas de imitación de materiales y las técnicas de veladura estudiadas en este mismo tema?", reverso: "Muchas técnicas de imitación (especialmente la de mármol) se basan precisamente en la superposición de sucesivas veladuras de distintos tonos, aplicando el mismo principio de capas semitransparentes superpuestas para lograr profundidad y matiz en el resultado final" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es una técnica de imitación de veta de madera mediante pintura?", explicacion: "Reproduce el aspecto visual de la veta de una especie de madera sobre otra superficie.", dificultad: "facil", opciones: ["Reproduce el aspecto de la veta de madera sobre otra superficie", "Aplica una capa opaca de color liso sin ningún patrón", "Pulveriza pintura mediante un aerógrafo de precisión", "Sella un pavimento con una resina de alta resistencia"], correcta: 0 },
  { enunciado: "¿Qué es una técnica de imitación de mármol mediante pintura?", explicacion: "Reproduce las vetas y el aspecto pulido del mármol natural sobre una superficie plana.", dificultad: "media", opciones: ["Reproduce las vetas y el aspecto pulido del mármol", "Aplica un aditivo antideslizante sobre un pavimento", "Pulveriza pintura mediante un compresor de gran caudal", "Repara imperfecciones de la superficie con masilla"], correcta: 0 },
  { enunciado: "¿Por qué se emplean técnicas de imitación de materiales nobles en lugar del material real?", explicacion: "Permiten un efecto similar con menor coste, peso y mantenimiento.", dificultad: "media", opciones: ["Permiten un efecto similar con menor coste y mantenimiento", "El material real siempre resulta más económico de emplear", "Las técnicas de imitación nunca ofrecen un resultado aceptable", "Solo se emplean quienes carecen de material real disponible"], correcta: 0 },
  { enunciado: "¿Qué habilidad resulta especialmente relevante en la ejecución de técnicas de imitación de materiales?", explicacion: "La observación del material real y el dominio de la herramienta específica de cada técnica.", dificultad: "dificil", opciones: ["La observación del material real y el dominio de la herramienta", "Únicamente disponer del compresor de mayor potencia posible", "Únicamente conocer el precio de mercado del material real", "Ninguna habilidad específica distinta de la pintura convencional"], correcta: 0 },
  { enunciado: "¿Qué relación existe entre las técnicas de imitación de mármol y la técnica de veladura?", explicacion: "Muchas imitaciones se basan en la superposición de sucesivas veladuras de distinto tono.", dificultad: "dificil", opciones: ["Se basan en la superposición de sucesivas veladuras", "No existe ninguna relación real entre ambas técnicas", "La imitación de mármol nunca emplea veladuras", "La veladura solo se emplea en imitaciones de madera"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 16 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 16, orden: 16, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-244 creado y vinculado como Tema 16 de Oficial Pintor General.");
