/**
 * Crea el tema canónico tema-38: "El procesador de texto Word" y lo
 * asigna como Tema 18 de la oposición Auxiliar Administrativo DGA
 * (bloque-6, Ofimática e informática).
 *
 * Texto oficial del ítem 18, proporcionado directamente por el usuario:
 *   "Procesador de texto Word. Principales funciones y utilidades.
 *   Creación y estructuración del documento. Encabezado y pie de
 *   página. Opciones de formato. Impresión de documentos. Tablas.
 *   Listas y columnas. Inserción de elementos. Combinar
 *   correspondencia. Personalización del entorno de trabajo."
 *
 * Contenido técnico/práctico sobre Microsoft Word, sin necesidad de
 * verificación contra el BOE.
 *
 * Tres secciones:
 * 1. creacion-documento-formato — funciones y utilidades principales,
 *    creación y estructuración del documento, encabezado y pie de
 *    página, opciones de formato.
 * 2. tablas-listas-columnas-insercion — tablas, listas y columnas,
 *    inserción de elementos (imágenes, formas, WordArt, etc.).
 * 3. impresion-combinar-personalizacion — impresión de documentos,
 *    combinar correspondencia, personalización del entorno de trabajo.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-word-dga.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!URL_BASE || !SERVICE_KEY) {
  console.error("❌ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-38";

async function insertar(tabla, filas) {
  const res = await fetch(`${URL_BASE}/rest/v1/${tabla}`, {
    method: "POST",
    headers: { ...HEADERS, Prefer: "return=representation" },
    body: JSON.stringify(filas),
  });
  if (!res.ok) {
    console.error(`❌ Error insertando en ${tabla}: ${res.status} ${await res.text()}`);
    process.exit(1);
  }
  return res.json();
}

async function insertarPreguntasConOpciones(seccion, preguntas) {
  const filas = preguntas.map(({ opciones, correcta, ...p }) => ({ ...p, tema_slug: TEMA, seccion }));
  const insertadas = await insertar("preguntas", filas);
  console.log(`   ✓ preguntas: ${insertadas.length} filas`);
  const filasOpciones = insertadas.flatMap((pregunta, i) =>
    preguntas[i].opciones.map((texto, orden) => ({
      pregunta_id: pregunta.id,
      texto,
      es_correcta: orden === preguntas[i].correcta,
      orden,
    })),
  );
  const opcionesInsertadas = await insertar("opciones", filasOpciones);
  console.log(`   ✓ opciones: ${opcionesInsertadas.length} filas`);
}

// ─────────────────────────────────────────────────────────────────────────
// Tema canónico
// ─────────────────────────────────────────────────────────────────────────
console.log("📚 Creando tema-38...");
await insertar("temas", [
  {
    slug: TEMA,
    titulo: "El procesador de texto Word",
    descripcion:
      "Principales funciones y utilidades de Word. Creación y estructuración del documento. Encabezado y pie de página. Opciones de formato. Impresión de documentos. Tablas. Listas y columnas. Inserción de elementos. Combinar correspondencia. Personalización del entorno de trabajo.",
    contenido:
      "Desarrolla el manejo del procesador de textos Microsoft Word para la elaboración de documentos administrativos: creación y estructuración de documentos, encabezados y pies de página, formato de texto y párrafo, tablas, listas y columnas, inserción de elementos (imágenes, tablas, símbolos), impresión de documentos, la función de combinar correspondencia y la personalización del entorno de trabajo.",
    enlaces_boe: [],
    indice_estudio: [
      {
        url: "",
        titulo: "Creación y estructuración del documento: encabezado, pie de página y formato",
        seccion: "creacion-documento-formato",
        articulos: "Conceptos fundamentales",
      },
      {
        url: "",
        titulo: "Tablas, listas, columnas e inserción de elementos",
        seccion: "tablas-listas-columnas-insercion",
        articulos: "Conceptos fundamentales",
      },
      {
        url: "",
        titulo: "Impresión, combinar correspondencia y personalización del entorno",
        seccion: "impresion-combinar-personalizacion",
        articulos: "Conceptos fundamentales",
      },
    ],
  },
]);

// ─────────────────────────────────────────────────────────────────────────
// Sección 1: creacion-documento-formato
// ─────────────────────────────────────────────────────────────────────────
const S1 = "creacion-documento-formato";
console.log(`📝 flashcards (${S1})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Qué es Microsoft Word?", reverso: "Un procesador de textos que permite crear, editar, dar formato e imprimir documentos, siendo una de las aplicaciones principales de la suite Microsoft Office" },
    { anverso: "¿Qué extensión de archivo utilizan por defecto los documentos de las versiones modernas de Word?", reverso: ".docx (formato basado en XML introducido a partir de Word 2007, frente a la extensión .doc de versiones anteriores)" },
    { anverso: "¿Qué combinación de teclas permite guardar un documento de Word?", reverso: "Ctrl+G (o Ctrl+S según el idioma del teclado)" },
    { anverso: "¿Qué es un estilo en Word?", reverso: "Un conjunto predefinido de características de formato (fuente, tamaño, color, espaciado) que se aplica de una vez a un texto, facilitando la coherencia visual y la generación automática de tablas de contenido" },
    { anverso: "¿Qué es el encabezado de un documento en Word?", reverso: "El área situada en la parte superior de cada página, fuera del margen de texto, donde puede incluirse información repetida en todas las páginas (título, logotipo, fecha)" },
    { anverso: "¿Qué es el pie de página en Word?", reverso: "El área situada en la parte inferior de cada página, fuera del margen de texto, habitual para incluir el número de página u otra información repetida" },
    { anverso: "¿Cómo se inserta un número de página en Word?", reverso: "Desde la pestaña 'Insertar', en el grupo 'Encabezado y pie de página', seleccionando la opción 'Número de página' y su ubicación" },
    { anverso: "Cita tres opciones de formato de carácter en Word", reverso: "Tipo de fuente, tamaño de fuente y estilo (negrita, cursiva, subrayado); también color de fuente y efectos de texto" },
    { anverso: "Cita tres opciones de formato de párrafo en Word", reverso: "Alineación (izquierda, centrada, derecha, justificada), interlineado y espaciado entre párrafos; también sangría" },
    { anverso: "¿Qué es la vista previa de impresión en Word?", reverso: "La función que permite visualizar el aspecto final que tendrá el documento al imprimirse, antes de enviarlo a la impresora" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })),
);

console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es Microsoft Word?", explicacion: "Un procesador de textos que permite crear, editar, dar formato e imprimir documentos.", dificultad: "facil", opciones: ["Un procesador de textos", "Una hoja de cálculo", "Un gestor de bases de datos", "Un cliente de correo electrónico"], correcta: 0 },
  { enunciado: "¿Qué extensión de archivo utilizan por defecto los documentos de Word en sus versiones modernas?", explicacion: ".docx, formato basado en XML.", dificultad: "media", opciones: [".docx", ".xlsx", ".pptx", ".pdf"], correcta: 0 },
  { enunciado: "¿Qué es un estilo en Word?", explicacion: "Un conjunto predefinido de características de formato que se aplica de una vez a un texto, facilitando la coherencia visual.", dificultad: "media", opciones: ["Un conjunto predefinido de características de formato aplicable de una vez", "Un tipo de archivo exclusivo para imágenes", "Una herramienta para revisar la ortografía", "Un comando para imprimir el documento"], correcta: 0 },
  { enunciado: "¿Dónde se sitúa el encabezado de un documento en Word?", explicacion: "En la parte superior de cada página, fuera del margen de texto.", dificultad: "facil", opciones: ["En la parte superior de cada página", "En la parte inferior de cada página", "En el centro exacto de la página", "Solo en la primera página del documento"], correcta: 0 },
  { enunciado: "¿Desde qué pestaña de Word se inserta habitualmente un número de página?", explicacion: "Desde la pestaña 'Insertar', en el grupo 'Encabezado y pie de página'.", dificultad: "media", opciones: ["Insertar", "Inicio", "Vista", "Revisar"], correcta: 0 },
  { enunciado: "¿Cuál de las siguientes es una opción de formato de carácter en Word?", explicacion: "La negrita es una opción de formato de carácter, junto con el tipo, tamaño y color de fuente.", dificultad: "facil", opciones: ["Negrita", "Interlineado", "Sangría", "Combinar correspondencia"], correcta: 0 },
  { enunciado: "¿Cuál de las siguientes es una opción de formato de párrafo en Word?", explicacion: "La alineación (izquierda, centrada, derecha, justificada) es una opción de formato de párrafo.", dificultad: "media", opciones: ["Alineación del texto", "Tipo de fuente", "Color de fuente", "Subrayado"], correcta: 0 },
  { enunciado: "¿Para qué sirve la vista previa de impresión en Word?", explicacion: "Para visualizar el aspecto final que tendrá el documento al imprimirse, antes de enviarlo a la impresora.", dificultad: "facil", opciones: ["Para visualizar el documento antes de imprimirlo", "Para corregir automáticamente la ortografía", "Para insertar tablas en el documento", "Para combinar correspondencia con una base de datos"], correcta: 0 },
]);

// ─────────────────────────────────────────────────────────────────────────
// Sección 2: tablas-listas-columnas-insercion
// ─────────────────────────────────────────────────────────────────────────
const S2 = "tablas-listas-columnas-insercion";
console.log(`📝 flashcards (${S2})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Desde qué pestaña de Word se inserta una tabla?", reverso: "Desde la pestaña 'Insertar', seleccionando la opción 'Tabla' e indicando el número de filas y columnas" },
    { anverso: "¿Qué son las 'Herramientas de tabla' que aparecen al seleccionar una tabla en Word?", reverso: "Pestañas contextuales (Diseño y Presentación) que aparecen automáticamente al hacer clic dentro de una tabla, con opciones para dar formato, combinar/dividir celdas, y ajustar filas y columnas" },
    { anverso: "¿Cómo se combinan varias celdas de una tabla en una sola, en Word?", reverso: "Seleccionando las celdas a unir, haciendo clic derecho y eligiendo 'Combinar celdas' (o desde la pestaña 'Presentación' de Herramientas de tabla)" },
    { anverso: "¿Qué es una lista con viñetas en Word?", reverso: "Una lista en la que cada elemento se precede de un símbolo (viñeta) en lugar de un número, útil cuando el orden de los elementos no es relevante" },
    { anverso: "¿Qué es una lista numerada en Word?", reverso: "Una lista en la que cada elemento se precede de un número o letra correlativos, útil cuando el orden de los elementos sí es relevante" },
    { anverso: "¿Qué es una lista multinivel en Word?", reverso: "Una lista con varios niveles de jerarquía o sangría, donde cada nivel puede tener su propio formato de numeración o viñetas" },
    { anverso: "¿Desde qué pestaña se configuran columnas de estilo periodístico en un documento de Word?", reverso: "Desde la pestaña 'Diseño' (o 'Formato'), en la opción 'Columnas', pudiendo elegir el número de columnas y su distribución" },
    { anverso: "Cita tres elementos que pueden insertarse en un documento Word desde la pestaña 'Insertar'", reverso: "Imágenes, tablas y formas; también encabezado/pie de página, número de página, WordArt, símbolos e hipervínculos" },
    { anverso: "¿Qué es WordArt en Word?", reverso: "Una herramienta que permite crear texto decorativo con efectos visuales (colores, sombras, contornos), útil para títulos destacados" },
    { anverso: "¿Qué es un salto de página en Word y cómo se inserta?", reverso: "Una marca que fuerza que el contenido siguiente comience en una nueva página; se inserta desde la pestaña 'Insertar' > 'Salto de página', o con Ctrl+Intro" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })),
);

console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Desde qué pestaña de Word se inserta una tabla en un documento?", explicacion: "Desde la pestaña 'Insertar'.", dificultad: "facil", opciones: ["Insertar", "Inicio", "Diseño", "Revisar"], correcta: 0 },
  { enunciado: "¿Qué son las 'Herramientas de tabla' de Word?", explicacion: "Pestañas contextuales que aparecen al hacer clic dentro de una tabla, con opciones de diseño y presentación.", dificultad: "media", opciones: ["Pestañas contextuales que aparecen al seleccionar una tabla", "Un tipo de archivo exclusivo para tablas", "Un complemento externo que debe instalarse aparte", "Una función disponible solo en la versión web de Word"], correcta: 0 },
  { enunciado: "¿Cómo se combinan varias celdas de una tabla en una sola celda en Word?", explicacion: "Seleccionando las celdas y eligiendo 'Combinar celdas' desde el menú contextual o la pestaña Presentación.", dificultad: "media", opciones: ["Seleccionando las celdas y eligiendo 'Combinar celdas'", "Eliminando la tabla y creando una nueva desde cero", "No es posible combinar celdas en Word", "Aplicando un salto de página entre las celdas"], correcta: 0 },
  { enunciado: "¿Qué tipo de lista es más adecuada cuando el orden de los elementos es relevante?", explicacion: "La lista numerada, ya que cada elemento se precede de un número o letra correlativos.", dificultad: "facil", opciones: ["Lista numerada", "Lista con viñetas", "Tabla sin bordes", "Lista de un solo nivel sin formato"], correcta: 0 },
  { enunciado: "¿Qué es una lista multinivel en Word?", explicacion: "Una lista con varios niveles de jerarquía o sangría, cada uno con su propio formato de numeración o viñetas.", dificultad: "media", opciones: ["Una lista con varios niveles de jerarquía o sangría", "Una lista que solo admite viñetas circulares", "Una tabla con múltiples encabezados", "Una lista que no puede editarse una vez creada"], correcta: 0 },
  { enunciado: "¿Desde dónde se configuran columnas de estilo periodístico en un documento de Word?", explicacion: "Desde la pestaña 'Diseño' (o 'Formato'), en la opción 'Columnas'.", dificultad: "media", opciones: ["Desde la pestaña 'Diseño', opción 'Columnas'", "Desde el Panel de control de Windows", "No es posible crear columnas en Word", "Únicamente insertando una tabla sin bordes"], correcta: 0 },
  { enunciado: "¿Qué es WordArt en Word?", explicacion: "Una herramienta para crear texto decorativo con efectos visuales, útil para títulos destacados.", dificultad: "facil", opciones: ["Una herramienta para crear texto decorativo con efectos visuales", "Un tipo de tabla predefinida", "Un complemento de revisión ortográfica", "Una función de combinar correspondencia"], correcta: 0 },
  { enunciado: "¿Qué combinación de teclas inserta un salto de página en Word?", explicacion: "Ctrl+Intro.", dificultad: "media", opciones: ["Ctrl+Intro", "Ctrl+P", "Alt+Tab", "Ctrl+Mayús+Esc"], correcta: 0 },
]);

// ─────────────────────────────────────────────────────────────────────────
// Sección 3: impresion-combinar-personalizacion
// ─────────────────────────────────────────────────────────────────────────
const S3 = "impresion-combinar-personalizacion";
console.log(`📝 flashcards (${S3})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Qué combinación de teclas abre habitualmente el cuadro de impresión en Word?", reverso: "Ctrl+P" },
    { anverso: "¿Qué opciones básicas suelen configurarse antes de imprimir un documento en Word?", reverso: "La impresora de destino, el rango de páginas a imprimir, el número de copias, la orientación (vertical/horizontal) y el tamaño del papel" },
    { anverso: "¿Qué es la función 'Combinar correspondencia' en Word?", reverso: "La función que permite generar múltiples documentos personalizados (cartas, etiquetas, sobres) combinando una plantilla fija con datos variables procedentes de una lista o base de datos" },
    { anverso: "¿Cuáles son los tres elementos básicos necesarios para combinar correspondencia en Word?", reverso: "El documento principal (la plantilla), el origen de datos (lista de destinatarios) y los campos de combinación insertados en el documento" },
    { anverso: "¿Desde qué pestaña de Word se accede al asistente de 'Combinar correspondencia'?", reverso: "Desde la pestaña 'Correspondencia'" },
    { anverso: "¿Qué formatos pueden usarse como origen de datos para combinar correspondencia en Word?", reverso: "Hojas de cálculo de Excel, listas de contactos de Outlook, bases de datos de Access, o incluso tablas creadas directamente en Word" },
    { anverso: "¿Qué es un campo de combinación en Word?", reverso: "Un marcador insertado en el documento principal (como «Nombre» o «Dirección») que Word sustituye por el dato correspondiente de cada registro del origen de datos al generar los documentos combinados" },
    { anverso: "¿Cómo se personaliza la barra de herramientas de acceso rápido en Word?", reverso: "Haciendo clic en la flecha desplegable situada al final de dicha barra y seleccionando o deseleccionando los comandos que se desea mostrar" },
    { anverso: "¿Cómo se cambia el tema de color o el fondo del entorno de trabajo de Word?", reverso: "Desde 'Archivo' > 'Opciones' > 'General', en el apartado 'Personalizar la copia de Microsoft Office', donde se elige el tema y, en algunas versiones, el fondo de Office" },
    { anverso: "¿Para qué sirve la opción 'Personalizar cinta de opciones' en Word?", reverso: "Para mostrar u ocultar pestañas y comandos de la cinta de opciones, o crear pestañas y grupos personalizados con los comandos más usados" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })),
);

console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué combinación de teclas abre habitualmente el cuadro de impresión en Word?", explicacion: "Ctrl+P.", dificultad: "facil", opciones: ["Ctrl+P", "Ctrl+I", "Ctrl+G", "Ctrl+M"], correcta: 0 },
  { enunciado: "¿Qué es la función 'Combinar correspondencia' de Word?", explicacion: "La función que genera múltiples documentos personalizados combinando una plantilla con datos variables de una lista.", dificultad: "media", opciones: ["Genera documentos personalizados combinando una plantilla con datos variables", "Une varios documentos de Word en uno solo sin personalización", "Corrige automáticamente la ortografía de varios documentos a la vez", "Convierte un documento de Word a formato PDF"], correcta: 0 },
  { enunciado: "¿Cuáles son los tres elementos básicos necesarios para combinar correspondencia?", explicacion: "El documento principal, el origen de datos y los campos de combinación.", dificultad: "media", opciones: ["Documento principal, origen de datos y campos de combinación", "Encabezado, pie de página y número de página", "Tabla, lista y columna", "Fuente, tamaño y color de texto"], correcta: 0 },
  { enunciado: "¿Desde qué pestaña de Word se accede al asistente de combinar correspondencia?", explicacion: "Desde la pestaña 'Correspondencia'.", dificultad: "facil", opciones: ["Correspondencia", "Insertar", "Revisar", "Vista"], correcta: 0 },
  { enunciado: "¿Cuál de los siguientes puede usarse como origen de datos para combinar correspondencia en Word?", explicacion: "Una hoja de cálculo de Excel es un origen de datos habitual para combinar correspondencia.", dificultad: "media", opciones: ["Una hoja de cálculo de Excel", "Un archivo de audio", "Una presentación de PowerPoint", "Un archivo de imagen"], correcta: 0 },
  { enunciado: "¿Qué es un campo de combinación en Word?", explicacion: "Un marcador en el documento principal que se sustituye por el dato correspondiente de cada registro del origen de datos.", dificultad: "media", opciones: ["Un marcador que se sustituye por el dato de cada registro", "Un tipo de tabla predefinida sin bordes", "Un estilo de formato de párrafo", "Una plantilla de impresión predeterminada"], correcta: 0 },
  { enunciado: "¿Desde dónde se personaliza la barra de herramientas de acceso rápido en Word?", explicacion: "Haciendo clic en la flecha desplegable al final de dicha barra.", dificultad: "media", opciones: ["Desde la flecha desplegable al final de la barra de acceso rápido", "Desde el Panel de control de Windows", "No es posible personalizar esa barra", "Solo puede modificarse reinstalando Office"], correcta: 0 },
  { enunciado: "¿Desde qué menú de Word se accede a 'Personalizar cinta de opciones'?", explicacion: "Desde 'Archivo' > 'Opciones', apartado 'Personalizar cinta de opciones'.", dificultad: "media", opciones: ["Archivo > Opciones", "Insertar > Tabla", "Vista > Zoom", "Revisar > Ortografía"], correcta: 0 },
]);

console.log(
  "✅ tema-38 creado (3 secciones: creacion-documento-formato, tablas-listas-columnas-insercion, impresion-combinar-personalizacion; 30 flashcards + 24 preguntas en total).",
);

// ─────────────────────────────────────────────────────────────────────────
// Asignación a la oposición DGA: numero 18, bloque-6 (Ofimática e informática)
// ─────────────────────────────────────────────────────────────────────────
console.log("🔧 Asignando tema-38 a auxiliar-administrativo-dga (numero 18, bloque-6)...");

const bloqueRes = await fetch(
  `${URL_BASE}/rest/v1/bloques?oposicion_slug=eq.auxiliar-administrativo-dga&slug=eq.bloque-6&select=id`,
  { headers: HEADERS },
);
const [bloque6] = await bloqueRes.json();
if (!bloque6) {
  console.error("❌ No se encontró bloque-6 para auxiliar-administrativo-dga.");
  process.exit(1);
}

const asignacionRes = await fetch(`${URL_BASE}/rest/v1/tema_oposicion`, {
  method: "POST",
  headers: { ...HEADERS, Prefer: "return=representation" },
  body: JSON.stringify([
    {
      tema_slug: TEMA,
      oposicion_slug: "auxiliar-administrativo-dga",
      bloque_id: bloque6.id,
      numero: 18,
      orden: 18,
      es_premium: false,
      publicado: true,
      secciones_incluidas: [S1, S2, S3],
    },
  ]),
});
if (!asignacionRes.ok) {
  console.error(`❌ Error insertando tema_oposicion: ${asignacionRes.status} ${await asignacionRes.text()}`);
  process.exit(1);
}
const asignado = await asignacionRes.json();
console.log(`   ✓ tema_oposicion insertado: ${JSON.stringify(asignado[0])}`);

console.log("✅ Tema 18 de la DGA (procesador de texto Word) dado de alta.");
