/**
 * Crea tema-79: "Ofimática básica: OpenOffice e internet" — Tema 9
 * (numero=9, bloque-2) de Oficial Polivalente Instalaciones Deportivas
 * (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 7 oficial del Anexo I (bases2110.pdf):
 *   "Ofimática básica: Concepto de sistema operativo, concepto de sistema
 *   operativo, operaciones básicas de tratamiento de textos (Writer) y
 *   hoja de cálculo (Calc) en Open Office (versión 3.1.0). Navegación y
 *   consulta de información en Internet (Firefox)."
 *
 * Nota de fidelidad al temario oficial: el enunciado oficial cita
 * literalmente "Open Office (versión 3.1.0)" — una versión de 2009, ya
 * obsoleta frente a LibreOffice (usado en el temario de Oficial
 * Mantenimiento General, tema-67, y en Auxiliar Administrativo). Se
 * mantiene la referencia a OpenOffice tal y como la cita el temario
 * oficial de esta plaza — Writer y Calc de OpenOffice son prácticamente
 * idénticos en funcionalidad básica a sus homónimos de LibreOffice (ambas
 * suites derivan de la misma base de código original, OpenOffice.org) —
 * sin forzar una corrección no solicitada del enunciado oficial.
 * Conocimiento técnico consolidado de ofimática, sin cita legal.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-79-ofimatica-basica-openoffice.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-79";
const OPOSICION = "oficial-instalaciones-deportivas-ayto-zaragoza";
const BLOQUE_2_ID = "cdb0920b-a2d8-4ea8-b3fc-b80168d7361a";

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
  titulo: "Ofimática básica: OpenOffice e internet",
  descripcion: "Concepto de sistema operativo. Operaciones básicas de tratamiento de textos (Writer) y hoja de cálculo (Calc) en OpenOffice. Navegación y consulta de información en internet (Firefox).",
  contenido: "Desarrolla el concepto de sistema operativo, las operaciones básicas de tratamiento de textos (Writer) y hoja de cálculo (Calc) en la suite ofimática OpenOffice, y la navegación y consulta de información en internet mediante el navegador Firefox.",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "Concepto de sistema operativo y ofimática", seccion: "concepto-sistema-operativo-ofimatica", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Tratamiento de textos y hoja de cálculo en OpenOffice", seccion: "writer-calc-openoffice", articulos: "OpenOffice Writer y Calc" },
    { url: "", titulo: "Navegación e información en internet con Firefox", seccion: "navegacion-internet-firefox", articulos: "Conceptos fundamentales" },
  ],
}]);

const S1 = "concepto-sistema-operativo-ofimatica";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un sistema operativo?", reverso: "El programa (o conjunto de programas) básico que gestiona el hardware de un ordenador y permite ejecutar el resto de aplicaciones, actuando de intermediario entre el usuario, los programas y los componentes físicos del equipo" },
  { anverso: "¿Qué funciones básicas realiza un sistema operativo?", reverso: "Gestionar el procesador, la memoria, el almacenamiento (archivos y carpetas), los dispositivos periféricos (teclado, ratón, impresora) y la ejecución de programas" },
  { anverso: "Cita tres ejemplos de sistemas operativos de escritorio", reverso: "Windows, GNU/Linux (con distribuciones como Ubuntu) y macOS" },
  { anverso: "¿Qué es una suite ofimática?", reverso: "Un conjunto de programas integrados para tareas de oficina (procesador de textos, hoja de cálculo, presentaciones, base de datos), como OpenOffice o LibreOffice" },
  { anverso: "¿Qué es un archivo y qué es una carpeta (o directorio) en un sistema operativo?", reverso: "El archivo es la unidad básica de almacenamiento de información (un documento, una imagen); la carpeta es un contenedor que organiza archivos y otras carpetas de forma jerárquica" },
  { anverso: "¿Qué es el escritorio de un sistema operativo?", reverso: "La pantalla principal de trabajo que muestra iconos de acceso a programas, archivos y carpetas, desde la que se gestionan las aplicaciones abiertas" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es un sistema operativo?", explicacion: "El programa básico que gestiona el hardware y permite ejecutar el resto de aplicaciones.", dificultad: "facil", opciones: ["El programa que gestiona el hardware y las aplicaciones", "Un tipo de suite ofimática", "Un navegador de internet", "Un tipo de archivo de texto"], correcta: 0 },
  { enunciado: "¿Cuál de estos es un ejemplo de sistema operativo?", explicacion: "Windows es un sistema operativo; Writer y Calc son aplicaciones ofimáticas.", dificultad: "facil", opciones: ["Windows", "Writer", "Calc", "Firefox"], correcta: 0 },
  { enunciado: "¿Qué es una suite ofimática?", explicacion: "Un conjunto de programas integrados para tareas de oficina.", dificultad: "media", opciones: ["Un conjunto de programas integrados para tareas de oficina", "Un tipo de sistema operativo", "Un navegador de internet", "Un dispositivo periférico"], correcta: 0 },
  { enunciado: "¿Qué diferencia hay entre un archivo y una carpeta?", explicacion: "El archivo es la unidad de información; la carpeta organiza archivos jerárquicamente.", dificultad: "media", opciones: ["El archivo es información; la carpeta organiza archivos", "Son exactamente lo mismo", "La carpeta solo puede contener un archivo", "El archivo siempre contiene carpetas"], correcta: 0 },
  { enunciado: "¿Qué es el escritorio de un sistema operativo?", explicacion: "La pantalla principal de trabajo con accesos a programas y archivos.", dificultad: "facil", opciones: ["La pantalla principal de trabajo", "Un tipo de suite ofimática", "Un dispositivo de almacenamiento externo", "Un navegador de internet"], correcta: 0 },
]);

const S2 = "writer-calc-openoffice";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es OpenOffice Writer?", reverso: "El programa de tratamiento de textos de la suite ofimática libre OpenOffice, equivalente a Microsoft Word y a LibreOffice Writer" },
  { anverso: "¿Qué es OpenOffice Calc?", reverso: "El programa de hoja de cálculo de la suite ofimática libre OpenOffice, equivalente a Microsoft Excel y a LibreOffice Calc" },
  { anverso: "¿Qué relación existe entre OpenOffice y LibreOffice?", reverso: "Ambas suites derivan del mismo proyecto original (OpenOffice.org); LibreOffice nació como bifurcación (fork) de OpenOffice, por lo que comparten una funcionalidad básica prácticamente idéntica en Writer y Calc" },
  { anverso: "¿Qué extensión de archivo usa por defecto un documento de OpenOffice Writer?", reverso: ".odt (OpenDocument Text), el formato abierto estándar; también puede guardar y abrir documentos en formato .doc/.docx" },
  { anverso: "¿Qué es una celda en OpenOffice Calc?", reverso: "La unidad básica de una hoja de cálculo, definida por la intersección de una columna y una fila, donde se introducen datos o fórmulas" },
  { anverso: "¿Con qué símbolo debe comenzar una fórmula en OpenOffice Calc?", reverso: "Con el signo igual (=)" },
  { anverso: "¿Qué hace la función SUMA en OpenOffice Calc?", reverso: "Suma automáticamente los valores contenidos en un rango de celdas indicado" },
  { anverso: "¿Qué es formatear un documento en OpenOffice Writer?", reverso: "Aplicar estilo visual al texto: tipo y tamaño de letra, alineación, márgenes, interlineado, numeración de páginas" },
  { anverso: "¿Cómo se guarda por primera vez un documento en OpenOffice, eligiendo nombre y formato?", reverso: "Mediante la opción 'Guardar como'; en usos posteriores basta con 'Guardar' para actualizar el mismo archivo" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿A qué programa de Microsoft equivale OpenOffice Writer?", explicacion: "A Microsoft Word.", dificultad: "facil", opciones: ["A Microsoft Word", "A Microsoft Excel", "A Microsoft PowerPoint", "A Microsoft Access"], correcta: 0 },
  { enunciado: "¿A qué programa de Microsoft equivale OpenOffice Calc?", explicacion: "A Microsoft Excel.", dificultad: "facil", opciones: ["A Microsoft Excel", "A Microsoft Word", "A Microsoft Outlook", "A Microsoft PowerPoint"], correcta: 0 },
  { enunciado: "¿Qué relación existe entre OpenOffice y LibreOffice?", explicacion: "LibreOffice nació como bifurcación (fork) del proyecto OpenOffice.org.", dificultad: "media", opciones: ["LibreOffice es una bifurcación de OpenOffice", "Son productos sin ninguna relación entre sí", "OpenOffice es una versión posterior de LibreOffice", "Solo uno de los dos permite hojas de cálculo"], correcta: 0 },
  { enunciado: "¿Qué extensión usa por defecto un documento de OpenOffice Writer?", explicacion: ".odt (OpenDocument Text).", dificultad: "media", opciones: [".odt", ".docx únicamente", ".pdf", ".xlsx"], correcta: 0 },
  { enunciado: "¿Qué es una celda en OpenOffice Calc?", explicacion: "La intersección de una columna y una fila.", dificultad: "facil", opciones: ["La intersección de una columna y una fila", "Un tipo de documento de Writer", "Un archivo adjunto de correo", "Un tipo de fuente tipográfica"], correcta: 0 },
  { enunciado: "¿Con qué símbolo debe empezar una fórmula en OpenOffice Calc?", explicacion: "Con el signo igual (=).", dificultad: "facil", opciones: ["Con el signo igual (=)", "Con el signo más (+)", "Con una almohadilla (#)", "Con un asterisco (*)"], correcta: 0 },
  { enunciado: "¿Qué hace la función SUMA en OpenOffice Calc?", explicacion: "Suma automáticamente los valores de un rango de celdas.", dificultad: "facil", opciones: ["Suma los valores de un rango de celdas", "Cuenta las celdas vacías", "Ordena alfabéticamente una columna", "Aplica formato de negrita"], correcta: 0 },
  { enunciado: "¿Qué opción se usa para guardar un documento por primera vez, eligiendo nombre y formato?", explicacion: "'Guardar como'.", dificultad: "media", opciones: ["Guardar como", "Guardar (sin más)", "Imprimir", "Exportar a PDF únicamente"], correcta: 0 },
]);

const S3 = "navegacion-internet-firefox";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es Firefox?", reverso: "Un navegador web de código abierto que permite acceder y visualizar páginas de internet, desarrollado por la Fundación Mozilla" },
  { anverso: "¿Qué es una URL?", reverso: "La dirección única que identifica un recurso en internet, indicando el protocolo, el dominio y, en su caso, la ruta concreta" },
  { anverso: "¿Qué es un marcador (o favorito) en Firefox?", reverso: "Un enlace guardado por la persona usuaria para acceder rápidamente a una página web frecuente, sin tener que escribir de nuevo su dirección" },
  { anverso: "¿Qué es una pestaña en un navegador como Firefox?", reverso: "Cada una de las páginas web abiertas simultáneamente dentro de una misma ventana del navegador, permitiendo alternar entre ellas" },
  { anverso: "¿Qué es el historial de navegación en Firefox?", reverso: "El registro de las páginas web visitadas recientemente, que permite volver a acceder a ellas sin recordar su dirección exacta" },
  { anverso: "¿Qué diferencia hay entre un navegador y un buscador?", reverso: "El navegador (como Firefox) es el programa para acceder a cualquier página de internet; el buscador (como Google) es un servicio web que indexa contenido y permite localizarlo mediante palabras clave" },
  { anverso: "¿Qué es la barra de direcciones de un navegador?", reverso: "El campo donde se escribe la URL de la página que se desea visitar, o términos de búsqueda que el navegador redirige al buscador configurado por defecto" },
  { anverso: "¿Qué precaución básica debe seguirse al navegar por internet en un equipo de uso compartido, como el de un centro deportivo municipal?", reverso: "Cerrar sesión en cualquier servicio con usuario y contraseña, y no guardar contraseñas ni datos personales en el navegador del equipo compartido" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es Firefox?", explicacion: "Un navegador web de código abierto desarrollado por la Fundación Mozilla.", dificultad: "facil", opciones: ["Un navegador web de código abierto", "Una suite ofimática", "Un sistema operativo", "Un buscador de internet"], correcta: 0 },
  { enunciado: "¿Qué es una URL?", explicacion: "La dirección única que identifica un recurso en internet.", dificultad: "facil", opciones: ["La dirección única que identifica un recurso en internet", "Un tipo de archivo adjunto de correo", "Un programa de hoja de cálculo", "Un marcador guardado en el navegador"], correcta: 0 },
  { enunciado: "¿Qué es un marcador (favorito) en Firefox?", explicacion: "Un enlace guardado para acceder rápidamente a una página frecuente.", dificultad: "facil", opciones: ["Un enlace guardado para acceso rápido", "El historial completo de navegación", "Una pestaña abierta del navegador", "Un tipo de barra de direcciones"], correcta: 0 },
  { enunciado: "¿Qué permite hacer una pestaña en un navegador?", explicacion: "Tener varias páginas abiertas simultáneamente y alternar entre ellas.", dificultad: "media", opciones: ["Tener varias páginas abiertas y alternar entre ellas", "Guardar contraseñas de forma automática", "Sustituir a la barra de direcciones", "Eliminar el historial de navegación"], correcta: 0 },
  { enunciado: "¿Qué diferencia hay entre un navegador y un buscador?", explicacion: "El navegador accede a páginas; el buscador indexa y localiza contenido por palabras clave.", dificultad: "media", opciones: ["El navegador accede a páginas; el buscador indexa contenido", "Son términos exactamente sinónimos", "El buscador solo funciona sin navegador", "El navegador solo sirve para el correo electrónico"], correcta: 0 },
  { enunciado: "¿Qué precaución debe seguirse al navegar en un equipo de uso compartido?", explicacion: "Cerrar sesión y no guardar contraseñas ni datos personales.", dificultad: "media", opciones: ["Cerrar sesión y no guardar contraseñas", "No es necesaria ninguna precaución especial", "Guardar siempre las contraseñas para mayor comodidad", "Dejar la sesión abierta para el siguiente usuario"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 9 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 9, orden: 9, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-79 creado y vinculado como Tema 9 de Oficial Polivalente Instalaciones Deportivas.");
