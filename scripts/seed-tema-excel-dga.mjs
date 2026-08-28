/**
 * Crea el tema canónico tema-39: "La hoja de cálculo Excel" y lo
 * asigna como Tema 19 de la oposición Auxiliar Administrativo DGA
 * (bloque-6, Ofimática e informática).
 *
 * Texto oficial del ítem 19, proporcionado directamente por el usuario:
 *   "Hoja de cálculo Excel. Principales funciones y utilidades.
 *   Creación y estructuración del documento. Trabajar con libros y
 *   hojas. Celdas: insertar, eliminar, formato. Diseño de página:
 *   Orientación y área de impresión. Datos: ordenar y filtrar.
 *   Fórmulas básicas. Personalización del entorno de trabajo."
 *
 * Contenido técnico/práctico sobre Microsoft Excel, sin necesidad de
 * verificación contra el BOE.
 *
 * Tres secciones:
 * 1. libros-hojas-celdas — funciones y utilidades principales,
 *    creación y estructuración del documento, trabajar con libros y
 *    hojas, celdas (insertar, eliminar, formato).
 * 2. diseno-pagina-datos-formulas — diseño de página (orientación y
 *    área de impresión), datos (ordenar y filtrar), fórmulas básicas.
 * 3. personalizacion-entorno — personalización del entorno de trabajo.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-excel-dga.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!URL_BASE || !SERVICE_KEY) {
  console.error("❌ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-39";

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
console.log("📚 Creando tema-39...");
await insertar("temas", [
  {
    slug: TEMA,
    titulo: "La hoja de cálculo Excel",
    descripcion:
      "Principales funciones y utilidades de Excel. Creación y estructuración del documento. Trabajar con libros y hojas. Celdas: insertar, eliminar, formato. Diseño de página: orientación y área de impresión. Datos: ordenar y filtrar. Fórmulas básicas. Personalización del entorno de trabajo.",
    contenido:
      "Desarrolla el manejo de la hoja de cálculo Microsoft Excel para la gestión de datos administrativos: la estructura de libros y hojas, la gestión de celdas (insertar, eliminar, dar formato), el diseño de página para la impresión, la ordenación y el filtrado de datos, las fórmulas y funciones básicas, y la personalización del entorno de trabajo.",
    enlaces_boe: [],
    indice_estudio: [
      {
        url: "",
        titulo: "Libros, hojas y celdas: insertar, eliminar y dar formato",
        seccion: "libros-hojas-celdas",
        articulos: "Conceptos fundamentales",
      },
      {
        url: "",
        titulo: "Diseño de página, ordenación/filtrado de datos y fórmulas básicas",
        seccion: "diseno-pagina-datos-formulas",
        articulos: "Conceptos fundamentales",
      },
      {
        url: "",
        titulo: "Personalización del entorno de trabajo",
        seccion: "personalizacion-entorno",
        articulos: "Conceptos fundamentales",
      },
    ],
  },
]);

// ─────────────────────────────────────────────────────────────────────────
// Sección 1: libros-hojas-celdas
// ─────────────────────────────────────────────────────────────────────────
const S1 = "libros-hojas-celdas";
console.log(`📝 flashcards (${S1})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Qué es Microsoft Excel?", reverso: "Una aplicación de hoja de cálculo que permite organizar, calcular y analizar datos mediante filas, columnas y celdas, e integrada en la suite Microsoft Office" },
    { anverso: "¿Qué extensión de archivo utilizan por defecto los libros de las versiones modernas de Excel?", reverso: ".xlsx (formato basado en XML introducido a partir de Excel 2007, frente a la extensión .xls de versiones anteriores)" },
    { anverso: "¿Qué es un 'libro' de Excel?", reverso: "El archivo de Excel completo, que puede contener una o varias hojas de cálculo" },
    { anverso: "¿Qué es una 'hoja de cálculo' (u hoja de trabajo) dentro de un libro de Excel?", reverso: "Cada una de las pestañas o páginas de trabajo dentro de un libro, organizada en filas y columnas, en las que se introducen y gestionan los datos" },
    { anverso: "¿Cómo se identifica una celda en Excel?", reverso: "Mediante la combinación de la letra de su columna y el número de su fila (por ejemplo, A1, B3, D10)" },
    { anverso: "¿Cómo se inserta una nueva fila o columna en Excel?", reverso: "Haciendo clic derecho sobre el número de fila o la letra de columna de referencia y seleccionando 'Insertar' en el menú contextual (también desde la pestaña Inicio, grupo Celdas)" },
    { anverso: "¿Cómo se elimina el contenido de una celda sin eliminar la celda en sí?", reverso: "Seleccionando la celda y pulsando la tecla Suprimir (o Retroceso), que borra el contenido pero mantiene la celda y su formato" },
    { anverso: "¿Qué opciones de formato de celda pueden aplicarse en Excel?", reverso: "El formato de número (moneda, porcentaje, fecha, etc.), la alineación, el tipo y color de fuente, los bordes y el sombreado, entre otras" },
    { anverso: "¿Cómo se cambia el nombre de una hoja de cálculo en Excel?", reverso: "Haciendo doble clic sobre la pestaña de la hoja en la parte inferior de la ventana y escribiendo el nuevo nombre (también desde el menú contextual, opción 'Cambiar nombre')" },
    { anverso: "¿Qué es el cuadro de nombres en Excel?", reverso: "El campo situado a la izquierda de la barra de fórmulas que muestra la referencia de la celda activa y permite desplazarse rápidamente a otra celda escribiendo su referencia" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })),
);

console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es Microsoft Excel?", explicacion: "Una aplicación de hoja de cálculo que permite organizar, calcular y analizar datos.", dificultad: "facil", opciones: ["Una hoja de cálculo", "Un procesador de textos", "Un gestor de correo electrónico", "Un navegador de Internet"], correcta: 0 },
  { enunciado: "¿Qué extensión de archivo utilizan por defecto los libros de las versiones modernas de Excel?", explicacion: ".xlsx, formato basado en XML.", dificultad: "media", opciones: [".xlsx", ".docx", ".pptx", ".csv exclusivamente"], correcta: 0 },
  { enunciado: "¿Qué es un 'libro' de Excel?", explicacion: "El archivo de Excel completo, que puede contener una o varias hojas de cálculo.", dificultad: "media", opciones: ["El archivo completo, que puede contener varias hojas", "Una única celda de la hoja de cálculo", "Un tipo de gráfico estadístico", "Un complemento externo de Excel"], correcta: 0 },
  { enunciado: "¿Cómo se identifica una celda concreta dentro de una hoja de Excel?", explicacion: "Mediante la combinación de la letra de columna y el número de fila (p. ej., A1).", dificultad: "facil", opciones: ["Por la letra de la columna y el número de la fila", "Únicamente por un número secuencial", "Por el color con que esté rellena", "Por su posición en centímetros desde el borde"], correcta: 0 },
  { enunciado: "¿Cómo se elimina el contenido de una celda sin eliminar la celda en sí?", explicacion: "Seleccionando la celda y pulsando Suprimir.", dificultad: "media", opciones: ["Seleccionando la celda y pulsando Suprimir", "Cerrando el libro sin guardar", "Cambiando el nombre de la hoja de cálculo", "No es posible borrar solo el contenido de una celda"], correcta: 0 },
  { enunciado: "¿Cuál de las siguientes es una opción de formato de celda en Excel?", explicacion: "El formato de número (moneda, porcentaje, fecha) es una opción de formato de celda.", dificultad: "facil", opciones: ["Formato de número (moneda, porcentaje, fecha)", "Combinar correspondencia", "Insertar encabezado y pie de página únicamente para texto", "Corrector ortográfico exclusivo de texto"], correcta: 0 },
  { enunciado: "¿Cómo se cambia el nombre de una hoja de cálculo en Excel?", explicacion: "Haciendo doble clic sobre su pestaña en la parte inferior de la ventana.", dificultad: "media", opciones: ["Haciendo doble clic sobre su pestaña", "Únicamente desde el menú Archivo > Guardar como", "No es posible renombrar una hoja de cálculo", "Cambiando la extensión del archivo completo"], correcta: 0 },
  { enunciado: "¿Qué muestra el cuadro de nombres de Excel, situado a la izquierda de la barra de fórmulas?", explicacion: "La referencia de la celda activa, y permite desplazarse a otra celda escribiendo su referencia.", dificultad: "media", opciones: ["La referencia de la celda activa", "El nombre del archivo del libro", "El número total de hojas del libro", "El resultado de la última fórmula introducida"], correcta: 0 },
]);

// ─────────────────────────────────────────────────────────────────────────
// Sección 2: diseno-pagina-datos-formulas
// ─────────────────────────────────────────────────────────────────────────
const S2 = "diseno-pagina-datos-formulas";
console.log(`📝 flashcards (${S2})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Desde qué pestaña de Excel se configura la orientación de la página (vertical/horizontal) antes de imprimir?", reverso: "Desde la pestaña 'Diseño de página', en el grupo 'Configurar página', opción 'Orientación'" },
    { anverso: "¿Qué es el 'área de impresión' en Excel?", reverso: "El rango de celdas que se ha definido para que sea la única parte de la hoja que se imprima, evitando imprimir toda la hoja de cálculo" },
    { anverso: "¿Cómo se establece el área de impresión en Excel?", reverso: "Seleccionando el rango de celdas deseado y, desde la pestaña 'Diseño de página', eligiendo 'Área de impresión' > 'Establecer área de impresión'" },
    { anverso: "¿Qué son los 'saltos de página' en Excel?", reverso: "Las marcas que dividen el contenido de la hoja en páginas independientes al imprimir, y que pueden ajustarse manualmente desde la vista 'Vista previa de salto de página'" },
    { anverso: "¿Qué hace la función 'Ordenar' en Excel?", reverso: "Reorganiza las filas de un rango de datos según los valores de una o varias columnas, de forma ascendente o descendente" },
    { anverso: "¿Qué hace la función 'Filtrar' en Excel?", reverso: "Muestra únicamente las filas que cumplen determinados criterios, ocultando temporalmente el resto sin eliminar los datos" },
    { anverso: "¿Qué es el 'Autofiltro' en Excel?", reverso: "La herramienta que añade flechas desplegables a los encabezados de columna, permitiendo filtrar los datos de forma rápida seleccionando los valores deseados" },
    { anverso: "¿Cómo empieza siempre una fórmula en Excel?", reverso: "Con el signo igual (=)" },
    { anverso: "¿Qué hace la función SUMA en Excel? Escribe un ejemplo", reverso: "Suma los valores de un rango de celdas; ejemplo: =SUMA(A1:A10) suma los valores de las celdas A1 a A10" },
    { anverso: "¿Cuáles son otras funciones básicas habituales de Excel además de SUMA? Cita tres", reverso: "PROMEDIO (calcula la media), MAX (valor máximo), MIN (valor mínimo); también CONTAR (cuenta celdas con números) y SI (evalúa una condición)" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })),
);

console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Desde qué pestaña de Excel se configura la orientación de la página antes de imprimir?", explicacion: "Desde la pestaña 'Diseño de página'.", dificultad: "facil", opciones: ["Diseño de página", "Fórmulas", "Datos", "Revisar"], correcta: 0 },
  { enunciado: "¿Qué es el área de impresión en Excel?", explicacion: "El rango de celdas definido para que sea la única parte de la hoja que se imprima.", dificultad: "media", opciones: ["El rango de celdas definido para imprimirse", "El total de celdas con contenido en la hoja", "El nombre de la hoja de cálculo activa", "El formato de número aplicado a las celdas"], correcta: 0 },
  { enunciado: "¿Cómo se establece el área de impresión en Excel?", explicacion: "Seleccionando el rango y desde 'Diseño de página' > 'Área de impresión' > 'Establecer área de impresión'.", dificultad: "media", opciones: ["Desde 'Diseño de página' > 'Área de impresión'", "Desde la pestaña 'Fórmulas'", "No es posible limitar el área que se imprime", "Únicamente eliminando las filas sobrantes de la hoja"], correcta: 0 },
  { enunciado: "¿Qué hace la función 'Ordenar' en Excel?", explicacion: "Reorganiza las filas de un rango según los valores de una o varias columnas, en orden ascendente o descendente.", dificultad: "facil", opciones: ["Reorganiza las filas según los valores de una o varias columnas", "Elimina las filas duplicadas automáticamente", "Cambia el formato de número de las celdas", "Combina varias hojas de cálculo en una sola"], correcta: 0 },
  { enunciado: "¿Qué hace la función 'Filtrar' en Excel?", explicacion: "Muestra únicamente las filas que cumplen determinados criterios, ocultando temporalmente el resto.", dificultad: "media", opciones: ["Muestra solo las filas que cumplen ciertos criterios", "Elimina de forma permanente los datos no deseados", "Ordena alfabéticamente todas las columnas", "Convierte los datos en un gráfico automáticamente"], correcta: 0 },
  { enunciado: "¿Qué añade el 'Autofiltro' a los encabezados de columna en Excel?", explicacion: "Flechas desplegables que permiten filtrar los datos seleccionando los valores deseados.", dificultad: "media", opciones: ["Flechas desplegables para filtrar por valores", "Un gráfico automático de los datos", "Un comentario explicativo en cada celda", "Un hipervínculo a otra hoja del libro"], correcta: 0 },
  { enunciado: "¿Con qué signo debe comenzar siempre una fórmula en Excel?", explicacion: "Con el signo igual (=).", dificultad: "facil", opciones: ["El signo igual (=)", "El signo más (+) exclusivamente", "El símbolo de arroba (@)", "El signo de almohadilla (#)"], correcta: 0 },
  { enunciado: "¿Qué calcula la fórmula =SUMA(A1:A10) en Excel?", explicacion: "La suma de los valores contenidos en las celdas A1 a A10.", dificultad: "facil", opciones: ["La suma de los valores de las celdas A1 a A10", "El promedio de las celdas A1 a A10", "El valor máximo entre A1 y A10", "El número de celdas vacías entre A1 y A10"], correcta: 0 },
]);

// ─────────────────────────────────────────────────────────────────────────
// Sección 3: personalizacion-entorno
// ─────────────────────────────────────────────────────────────────────────
const S3 = "personalizacion-entorno";
console.log(`📝 flashcards (${S3})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Desde qué menú de Excel se accede a las opciones generales de personalización de la aplicación?", reverso: "Desde 'Archivo' > 'Opciones'" },
    { anverso: "¿Cómo se personaliza la barra de herramientas de acceso rápido en Excel?", reverso: "Haciendo clic en la flecha desplegable situada al final de dicha barra y seleccionando o deseleccionando los comandos que se desea mostrar" },
    { anverso: "¿Para qué sirve la opción 'Personalizar cinta de opciones' en Excel?", reverso: "Para mostrar u ocultar pestañas y comandos de la cinta, o crear pestañas y grupos personalizados con los comandos de uso más frecuente" },
    { anverso: "¿Cómo se inmovilizan filas o columnas en Excel para que permanezcan visibles al desplazarse por la hoja?", reverso: "Desde la pestaña 'Vista', opción 'Inmovilizar paneles', pudiendo inmovilizar la fila superior, la primera columna, o hasta el punto seleccionado" },
    { anverso: "¿Qué permite hacer el 'Zoom' en Excel y dónde se ajusta?", reverso: "Aumentar o reducir el tamaño de visualización de la hoja de cálculo en pantalla; se ajusta desde el control deslizante situado en la esquina inferior derecha, o desde la pestaña 'Vista'" },
    { anverso: "¿Cómo se cambia el color de fondo o el tema visual del entorno de Excel?", reverso: "Desde 'Archivo' > 'Opciones' > 'General', en el apartado 'Personalizar la copia de Microsoft Office', seleccionando el tema deseado" },
    { anverso: "¿Qué opciones de configuración por defecto pueden personalizarse desde 'Archivo > Opciones > Guardar' en Excel?", reverso: "El formato de archivo predeterminado al guardar, la ubicación predeterminada de guardado y la frecuencia de autoguardado" },
    { anverso: "¿Para qué sirven las 'Vistas personalizadas' en Excel?", reverso: "Para guardar una configuración concreta de la hoja (área de impresión, filtros, zoom, filas ocultas) y poder recuperarla rápidamente más adelante" },
    { anverso: "¿Cómo se muestran u ocultan las líneas de división (cuadrícula) de la hoja de cálculo en Excel?", reverso: "Desde la pestaña 'Vista', activando o desactivando la casilla 'Líneas de división'" },
    { anverso: "¿Desde qué pestaña se dividen (o inmovilizan) paneles y se organizan varias ventanas de Excel simultáneamente?", reverso: "Desde la pestaña 'Vista', en el grupo 'Ventana'" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })),
);

console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Desde qué menú de Excel se accede a las opciones generales de configuración de la aplicación?", explicacion: "Desde 'Archivo' > 'Opciones'.", dificultad: "facil", opciones: ["Archivo > Opciones", "Insertar > Configuración", "Datos > Personalizar", "Revisar > Opciones"], correcta: 0 },
  { enunciado: "¿Cómo se personaliza la barra de herramientas de acceso rápido en Excel?", explicacion: "Haciendo clic en la flecha desplegable situada al final de dicha barra.", dificultad: "media", opciones: ["Desde la flecha desplegable al final de la barra de acceso rápido", "Desde el Panel de control de Windows", "No es posible personalizar esa barra en Excel", "Reinstalando la suite Office completa"], correcta: 0 },
  { enunciado: "¿Desde qué pestaña de Excel se inmovilizan filas o columnas para que permanezcan visibles al desplazarse por la hoja?", explicacion: "Desde la pestaña 'Vista', opción 'Inmovilizar paneles'.", dificultad: "media", opciones: ["Vista", "Fórmulas", "Diseño de página", "Revisar"], correcta: 0 },
  { enunciado: "¿Qué permite ajustar el 'Zoom' en Excel?", explicacion: "El tamaño de visualización de la hoja de cálculo en pantalla.", dificultad: "facil", opciones: ["El tamaño de visualización de la hoja en pantalla", "El tamaño real del papel al imprimir", "El número de decimales de las celdas", "El idioma del corrector ortográfico"], correcta: 0 },
  { enunciado: "¿Desde dónde se cambia el tema visual (color de fondo) del entorno de Excel?", explicacion: "Desde 'Archivo' > 'Opciones' > 'General', en 'Personalizar la copia de Microsoft Office'.", dificultad: "media", opciones: ["Archivo > Opciones > General", "Datos > Ordenar y filtrar", "Fórmulas > Auditoría de fórmulas", "Vista > Macros"], correcta: 0 },
  { enunciado: "¿Qué puede configurarse desde 'Archivo > Opciones > Guardar' en Excel?", explicacion: "El formato de archivo predeterminado, la ubicación de guardado y la frecuencia de autoguardado.", dificultad: "media", opciones: ["El formato, ubicación y frecuencia de autoguardado", "El tipo de gráfico predeterminado", "El idioma de las fórmulas", "El número de hojas nuevas al abrir Excel, exclusivamente"], correcta: 0 },
  { enunciado: "¿Para qué sirven las 'Vistas personalizadas' en Excel?", explicacion: "Para guardar una configuración concreta de la hoja y recuperarla rápidamente más adelante.", dificultad: "media", opciones: ["Para guardar y recuperar una configuración concreta de la hoja", "Para crear automáticamente gráficos dinámicos", "Para traducir el contenido de la hoja a otro idioma", "Para proteger la hoja con contraseña"], correcta: 0 },
  { enunciado: "¿Desde qué pestaña se muestran u ocultan las líneas de división (cuadrícula) en Excel?", explicacion: "Desde la pestaña 'Vista', casilla 'Líneas de división'.", dificultad: "facil", opciones: ["Vista", "Inicio", "Insertar", "Fórmulas"], correcta: 0 },
]);

console.log(
  "✅ tema-39 creado (3 secciones: libros-hojas-celdas, diseno-pagina-datos-formulas, personalizacion-entorno; 30 flashcards + 24 preguntas en total).",
);

// ─────────────────────────────────────────────────────────────────────────
// Asignación a la oposición DGA: numero 19, bloque-6 (Ofimática e informática)
// ─────────────────────────────────────────────────────────────────────────
console.log("🔧 Asignando tema-39 a auxiliar-administrativo-dga (numero 19, bloque-6)...");

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
      numero: 19,
      orden: 19,
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

console.log("✅ Tema 19 de la DGA (hoja de cálculo Excel) dado de alta.");
