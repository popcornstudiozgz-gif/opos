/**
 * Crea tema-262: "Corel Draw 2022 o posterior. Herramientas, menús,
 * opciones, variables, paletas de color, terminología" — Tema 18
 * (numero=18, bloque-2) de Oficial Pintor, Especialidad Gráfica (Ayto.
 * Zaragoza).
 *
 * Corresponde al TEMA 16 oficial del Anexo I (bases2110.pdf, línea
 * 1530): "Corel Draw 2022 o posterior. Herramientas, menús, opciones,
 * variables, paletas de color, terminología."
 *
 * Conocimiento técnico de un programa informático comercial concreto
 * (CorelDRAW, de Corel Corporation), sin regulación legal propia más
 * allá de su propia licencia de uso — no existe normativa española que
 * regule el funcionamiento de este software. Búsqueda previa realizada
 * conforme al estándar de sourcing del proyecto: el temario oficial cita
 * expresamente la versión "2022 o posterior", identificando el producto
 * comercial concreto que debe conocerse, sin que ello constituya una
 * fuente normativa sino la referencia al propio software exigido.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-262-coreldraw.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-262";
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
  titulo: "CorelDRAW 2022 o posterior",
  descripcion: "Herramientas básicas de dibujo vectorial de CorelDRAW. Menús y opciones principales del programa. Variables y paletas de color. Terminología propia del software.",
  contenido: "Desarrolla el manejo básico de CorelDRAW 2022 o posterior, programa de diseño vectorial de referencia en el taller de rotulación: las herramientas fundamentales de dibujo y edición (selección, forma, texto, relleno), los menús y opciones principales de la interfaz, las variables de trabajo (capas, guías, unidades de medida) y las paletas de color disponibles en el programa, junto con la terminología propia del software necesaria para su manejo eficiente en la preparación de archivos destinados al corte o a la impresión digital.",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "Herramientas básicas de dibujo y edición de CorelDRAW", seccion: "herramientas-basicas-coreldraw", articulos: "Conocimiento técnico del software" },
    { url: "", titulo: "Menús, opciones y variables de trabajo de CorelDRAW", seccion: "menus-opciones-variables-coreldraw", articulos: "Conocimiento técnico del software" },
    { url: "", titulo: "Paletas de color y terminología de CorelDRAW", seccion: "paletas-color-terminologia-coreldraw", articulos: "Conocimiento técnico del software" },
  ],
}]);

const S1 = "herramientas-basicas-coreldraw";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es la herramienta de selección de CorelDRAW?", reverso: "La herramienta básica (representada por una flecha) empleada para seleccionar, mover, escalar y rotar los objetos del documento, siendo la herramienta de partida para la mayoría de las operaciones de edición sobre un diseño ya creado" },
  { anverso: "¿Qué es la herramienta de forma (Shape tool) de CorelDRAW?", reverso: "Una herramienta que permite editar los nodos y los segmentos de una curva o de un trazado vectorial, modificando su forma exacta (añadiendo, eliminando o desplazando nodos), esencial para ajustar con precisión el contorno de un logotipo o una letra personalizada" },
  { anverso: "¿Qué es la herramienta de texto de CorelDRAW, y qué diferencia existe entre un texto artístico y un texto de párrafo?", reverso: "La herramienta que permite insertar texto en el documento; el texto artístico se comporta como un objeto vectorial único adecuado para rótulos y titulares, mientras que el texto de párrafo se ajusta a un cuadro de texto y resulta más adecuado para bloques largos de contenido" },
  { anverso: "¿Qué es la herramienta de relleno (Fill) de CorelDRAW, relevante para preparar un diseño destinado a un vinilo de corte?", reverso: "La herramienta que permite aplicar un color, un degradado, una textura o un patrón al interior de un objeto vectorial, siendo especialmente relevante asignar un color sólido y bien definido cuando el diseño se destina al corte directo de un vinilo de un único color" },
  { anverso: "¿Por qué es importante dominar la herramienta de forma para convertir texto en curvas antes de enviarlo al plotter de corte?", reverso: "Porque convertir el texto en curvas transforma los caracteres tipográficos en trazados vectoriales editables, garantizando que el diseño se muestre y se corte correctamente aunque la fuente tipográfica original no esté instalada en el equipo que procesa el archivo" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es la herramienta de selección de CorelDRAW?", explicacion: "La herramienta básica para seleccionar, mover, escalar y rotar objetos del documento.", dificultad: "facil", opciones: ["La herramienta básica para seleccionar, mover y escalar objetos", "La herramienta exclusiva para insertar texto en el documento", "La herramienta exclusiva para aplicar color de relleno", "La herramienta exclusiva para editar nodos de una curva"], correcta: 0 },
  { enunciado: "¿Qué permite hacer la herramienta de forma (Shape tool)?", explicacion: "Editar los nodos y segmentos de una curva o trazado vectorial.", dificultad: "media", opciones: ["Editar los nodos y segmentos de una curva vectorial", "Aplicar exclusivamente color de relleno a un objeto", "Insertar exclusivamente texto en el documento", "Seleccionar y mover objetos sin modificar su forma"], correcta: 0 },
  { enunciado: "¿Qué diferencia existe entre un texto artístico y uno de párrafo en CorelDRAW?", explicacion: "El artístico se comporta como objeto vectorial único; el de párrafo se ajusta a un cuadro de texto.", dificultad: "media", opciones: ["El artístico es un objeto único; el de párrafo se ajusta a un cuadro", "Ambos tipos de texto se comportan exactamente igual", "El texto de párrafo siempre resulta más adecuado para rótulos", "El texto artístico nunca puede editarse una vez insertado"], correcta: 0 },
  { enunciado: "¿Qué permite hacer la herramienta de relleno de CorelDRAW?", explicacion: "Aplicar color, degradado, textura o patrón al interior de un objeto vectorial.", dificultad: "media", opciones: ["Aplicar color, degradado o patrón al interior de un objeto", "Seleccionar y mover objetos sin aplicar ningún color", "Editar exclusivamente los nodos de una curva vectorial", "Insertar exclusivamente texto en el documento"], correcta: 0 },
  { enunciado: "¿Por qué es importante convertir texto en curvas antes de enviarlo al plotter de corte?", explicacion: "Garantiza que el diseño se corte correctamente aunque la fuente no esté instalada en el otro equipo.", dificultad: "dificil", opciones: ["Garantiza el corte correcto aunque falte la fuente instalada", "Convertir en curvas nunca resulta necesario para el corte", "El plotter siempre reconoce la fuente sin ninguna conversión", "Solo resulta relevante para textos de párrafo, nunca artísticos"], correcta: 0 },
]);

const S2 = "menus-opciones-variables-coreldraw";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es una capa, concepto de organización disponible en el gestor de objetos de CorelDRAW?", reverso: "Un nivel independiente dentro del documento en el que pueden agruparse determinados objetos, permitiendo mostrar, ocultar o bloquear ese conjunto de objetos de forma conjunta, facilitando la organización de diseños complejos con múltiples elementos superpuestos" },
  { anverso: "¿Qué son las guías, herramienta de precisión disponible en los menús de CorelDRAW?", reverso: "Líneas de referencia horizontales o verticales, no imprimibles, que el usuario puede situar en cualquier punto del documento para alinear con precisión distintos elementos del diseño entre sí o respecto a los bordes del propio documento" },
  { anverso: "¿Por qué es importante configurar correctamente las unidades de medida del documento antes de comenzar un diseño destinado a un rótulo de dimensiones exactas?", reverso: "Porque trabajar con una unidad de medida distinta a la exigida por el trabajo (por ejemplo, píxeles en lugar de centímetros) puede provocar que el tamaño final del elemento impreso o cortado no coincida con las dimensiones reales requeridas para el rótulo" },
  { anverso: "¿Qué es el menú \"Organizar\" de CorelDRAW, relevante al trabajar con varios objetos superpuestos en un diseño de rotulación?", reverso: "El menú que agrupa las opciones para ordenar el orden de apilamiento de los objetos (traer al frente, enviar al fondo), agruparlos, alinearlos y distribuirlos con precisión entre sí, herramientas esenciales al componer un diseño con varios elementos gráficos" },
  { anverso: "¿Qué es exportar un archivo, opción disponible en el menú de CorelDRAW especialmente relevante antes de enviar un diseño al plotter de corte o a la impresora?", reverso: "La acción de guardar el diseño en un formato distinto al propio del programa (por ejemplo, en un formato compatible con el software de la impresora o del plotter de corte), preservando las características vectoriales o de resolución necesarias para el trabajo posterior" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es una capa en CorelDRAW?", explicacion: "Un nivel independiente que agrupa objetos, permitiendo mostrarlos, ocultarlos o bloquearlos conjuntamente.", dificultad: "media", opciones: ["Un nivel independiente que agrupa objetos del documento", "Un color específico de la paleta disponible en el programa", "Una herramienta exclusiva de selección de objetos", "Un formato de archivo exclusivo de exportación"], correcta: 0 },
  { enunciado: "¿Qué son las guías en CorelDRAW?", explicacion: "Líneas de referencia no imprimibles para alinear elementos del diseño con precisión.", dificultad: "media", opciones: ["Líneas de referencia no imprimibles para alinear elementos", "Objetos vectoriales que forman parte del diseño final", "Un tipo de relleno degradado disponible en el programa", "Un menú exclusivo de exportación de archivos"], correcta: 0 },
  { enunciado: "¿Por qué es importante configurar bien las unidades de medida antes de un diseño de rótulo?", explicacion: "Una unidad inadecuada puede provocar que el tamaño final no coincida con las dimensiones reales requeridas.", dificultad: "dificil", opciones: ["Una unidad inadecuada puede alterar el tamaño final requerido", "Las unidades de medida nunca influyen en el tamaño final", "Siempre debe emplearse la unidad de píxeles en cualquier caso", "Solo resulta relevante en diseños de gran formato"], correcta: 0 },
  { enunciado: "¿Qué agrupa el menú \"Organizar\" de CorelDRAW?", explicacion: "Opciones de orden de apilamiento, agrupación, alineación y distribución de objetos.", dificultad: "media", opciones: ["Opciones de orden, agrupación, alineación y distribución", "Opciones exclusivas de exportación de archivos", "Opciones exclusivas de selección de color de relleno", "Opciones exclusivas de configuración de capas"], correcta: 0 },
  { enunciado: "¿Qué es exportar un archivo en CorelDRAW?", explicacion: "Guardar el diseño en un formato distinto al propio del programa, compatible con otro software.", dificultad: "media", opciones: ["Guardar el diseño en un formato compatible con otro software", "Eliminar por completo el diseño del documento actual", "Aplicar exclusivamente un nuevo color de relleno al diseño", "Convertir exclusivamente el texto artístico en curvas"], correcta: 0 },
]);

const S3 = "paletas-color-terminologia-coreldraw";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es una paleta de color en CorelDRAW?", reverso: "Un conjunto predefinido de colores disponible en el programa (por ejemplo, una paleta CMYK, RGB o de un sistema como Pantone) desde el que puede seleccionarse directamente un color para aplicarlo a un objeto, sin necesidad de definirlo manualmente cada vez" },
  { anverso: "¿Qué es un cuentagotas (o herramienta de selección de color), útil para igualar un color existente en un diseño de CorelDRAW?", reverso: "Una herramienta que permite tomar el color exacto de un punto concreto del documento (de una imagen importada o de otro objeto ya creado) y aplicarlo directamente a otro elemento del diseño, garantizando una coincidencia exacta de color entre ambos" },
  { anverso: "¿Qué es un objeto vectorial, terminología fundamental para trabajar correctamente en CorelDRAW?", reverso: "Un elemento gráfico definido matemáticamente mediante formas geométricas (líneas, curvas, puntos de anclaje), que puede escalarse a cualquier tamaño sin perder nitidez, a diferencia de una imagen de mapa de bits importada al mismo documento" },
  { anverso: "¿Qué es la combinación de objetos (Combine), terminología y operación habitual de CorelDRAW al trabajar con letras o formas superpuestas?", reverso: "Una operación que une varios objetos vectoriales en uno solo, generando huecos transparentes en las zonas donde los objetos originales se solapaban, útil por ejemplo para crear una letra con un hueco interior (como la \"O\" o la \"A\") a partir de dos formas independientes" },
  { anverso: "¿Por qué es relevante para el Oficial Pintor Especialidad Gráfica conocer bien la terminología específica del programa (nodos, trazado, relleno, contorno), y no solo saber usar sus herramientas de forma intuitiva?", reverso: "Porque permite comunicarse con precisión con otros profesionales del sector, seguir instrucciones técnicas concretas, y resolver problemas de diseño de forma más eficiente al comprender exactamente qué función cumple cada elemento del programa" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es una paleta de color en CorelDRAW?", explicacion: "Un conjunto predefinido de colores desde el que puede seleccionarse directamente un color para aplicarlo.", dificultad: "facil", opciones: ["Un conjunto predefinido de colores disponible en el programa", "Una herramienta exclusiva de selección de objetos", "Un formato de archivo exclusivo de exportación", "Un tipo de capa exclusiva del gestor de objetos"], correcta: 0 },
  { enunciado: "¿Qué permite hacer un cuentagotas en CorelDRAW?", explicacion: "Tomar el color exacto de un punto del documento y aplicarlo directamente a otro elemento.", dificultad: "media", opciones: ["Tomar un color exacto y aplicarlo a otro elemento", "Seleccionar y mover objetos sin modificar su color", "Editar exclusivamente los nodos de una curva vectorial", "Insertar exclusivamente texto en el documento"], correcta: 0 },
  { enunciado: "¿Qué es un objeto vectorial?", explicacion: "Un elemento definido matemáticamente que puede escalarse sin perder nitidez.", dificultad: "media", opciones: ["Un elemento definido matemáticamente sin perder nitidez", "Una imagen de mapa de bits que pierde calidad al escalar", "Un color específico de una paleta predefinida del programa", "Un tipo de capa exclusiva del gestor de objetos"], correcta: 0 },
  { enunciado: "¿Qué hace la operación de combinar objetos (Combine) en CorelDRAW?", explicacion: "Une varios objetos en uno solo, generando huecos transparentes donde se solapaban.", dificultad: "dificil", opciones: ["Une objetos generando huecos donde se solapaban", "Separa un único objeto en varios objetos independientes", "Aplica exclusivamente un color de relleno a los objetos", "Elimina por completo los objetos seleccionados del documento"], correcta: 0 },
  { enunciado: "¿Por qué es relevante conocer bien la terminología específica del programa, más allá del uso intuitivo?", explicacion: "Permite comunicarse con precisión y resolver problemas de forma más eficiente.", dificultad: "media", opciones: ["Permite comunicarse con precisión y resolver problemas mejor", "La terminología nunca resulta relevante en el uso del programa", "Solo resulta relevante para quienes enseñan a usar el programa", "Solo resulta relevante en diseños de gran complejidad"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 18 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 18, orden: 18, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-262 creado y vinculado como Tema 18 de Oficial Pintor Gráfica.");
