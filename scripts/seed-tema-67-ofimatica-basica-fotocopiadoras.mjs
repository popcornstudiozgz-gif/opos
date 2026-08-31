/**
 * Crea tema-67: "Ofimática básica e internet" — Tema 13 (numero=13,
 * bloque-2) de Oficial Mantenimiento General (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 11 oficial del Anexo I (bases2110.pdf):
 *   "Ofimática básica. Operaciones básicas de tratamiento de textos
 *   (Writer) y hoja de cálculo (Calc) en Libre Office. Navegación y
 *   consulta de información en internet. Correo electrónico. Manejo de
 *   máquinas fotocopiadoras: Tamaños de papel usados en las máquinas.
 *   Problemas más usuales."
 *
 * Conocimiento técnico consolidado de ofimática y equipos de oficina de
 * uso común; no requiere cita legal.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-67-ofimatica-basica-fotocopiadoras.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-67";
const OPOSICION = "oficial-mantenimiento-ayto-zaragoza";
const BLOQUE_2_ID = "336de420-fb74-4814-9d50-6e2981ed064f";

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
  titulo: "Ofimática básica, internet y fotocopiadoras",
  descripcion: "Operaciones básicas de tratamiento de textos (Writer) y hoja de cálculo (Calc) en LibreOffice. Navegación e información en internet. Correo electrónico. Manejo de fotocopiadoras: tamaños de papel y problemas usuales.",
  contenido: "Desarrolla las operaciones básicas de LibreOffice Writer (tratamiento de textos) y Calc (hoja de cálculo), la navegación y consulta de información en internet y el uso del correo electrónico, junto con el manejo básico de máquinas fotocopiadoras: tamaños de papel normalizados y problemas más usuales.",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "Ofimática básica: Writer y Calc en LibreOffice", seccion: "ofimatica-basica-writer-calc", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Internet y correo electrónico", seccion: "internet-correo-electronico", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Fotocopiadoras: tamaños de papel y problemas usuales", seccion: "fotocopiadoras-tamanos-papel-problemas", articulos: "Conceptos fundamentales" },
  ],
}]);

const S1 = "ofimatica-basica-writer-calc";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es LibreOffice Writer?", reverso: "El programa de tratamiento de textos de la suite ofimática libre LibreOffice, equivalente a Microsoft Word" },
  { anverso: "¿Qué es LibreOffice Calc?", reverso: "El programa de hoja de cálculo de la suite ofimática libre LibreOffice, equivalente a Microsoft Excel" },
  { anverso: "¿Qué extensión de archivo usa por defecto un documento de Writer?", reverso: ".odt (OpenDocument Text), el formato abierto estándar de LibreOffice; también puede guardar y abrir archivos .docx" },
  { anverso: "¿Qué extensión de archivo usa por defecto una hoja de cálculo de Calc?", reverso: ".ods (OpenDocument Spreadsheet); también puede guardar y abrir archivos .xlsx" },
  { anverso: "¿Qué es una celda en una hoja de cálculo de Calc?", reverso: "La unidad básica de una hoja de cálculo, definida por la intersección de una columna y una fila, donde se introduce texto, números o fórmulas" },
  { anverso: "¿Qué es una fórmula en Calc y con qué símbolo empieza?", reverso: "Una expresión que realiza un cálculo automático a partir de valores o referencias a otras celdas; siempre comienza con el signo igual (=)" },
  { anverso: "¿Qué hace la función SUMA en Calc?", reverso: "Suma automáticamente los valores contenidos en un rango de celdas indicado" },
  { anverso: "¿Qué es formatear un documento en Writer?", reverso: "Aplicar estilo visual al texto o al documento: tipo y tamaño de letra, alineación, márgenes, interlineado, numeración de páginas, etc." },
  { anverso: "¿Qué es la corrección ortográfica automática en Writer?", reverso: "Una función que subraya y sugiere corrección de las palabras que el programa detecta como mal escritas, comparándolas con un diccionario del idioma configurado" },
  { anverso: "¿Cómo se guarda un documento por primera vez en LibreOffice?", reverso: "Mediante la opción 'Guardar como', que permite elegir el nombre, la ubicación y el formato del archivo; las veces siguientes basta con 'Guardar' para actualizar el mismo archivo" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿A qué programa de Microsoft equivale LibreOffice Writer?", explicacion: "A Microsoft Word, ambos son procesadores de texto.", dificultad: "facil", opciones: ["A Microsoft Word", "A Microsoft Excel", "A Microsoft PowerPoint", "A Microsoft Access"], correcta: 0 },
  { enunciado: "¿A qué programa de Microsoft equivale LibreOffice Calc?", explicacion: "A Microsoft Excel, ambos son hojas de cálculo.", dificultad: "facil", opciones: ["A Microsoft Excel", "A Microsoft Word", "A Microsoft PowerPoint", "A Microsoft Outlook"], correcta: 0 },
  { enunciado: "¿Qué extensión usa por defecto un documento de Writer?", explicacion: ".odt (OpenDocument Text).", dificultad: "media", opciones: [".odt", ".docx únicamente", ".pdf", ".xlsx"], correcta: 0 },
  { enunciado: "¿Qué es una celda en Calc?", explicacion: "La intersección de una columna y una fila.", dificultad: "facil", opciones: ["La intersección de una columna y una fila", "Un tipo de documento de Writer", "Un archivo adjunto de correo", "Un tipo de fuente tipográfica"], correcta: 0 },
  { enunciado: "¿Con qué símbolo debe comenzar siempre una fórmula en Calc?", explicacion: "Con el signo igual (=).", dificultad: "facil", opciones: ["Con el signo igual (=)", "Con el signo más (+)", "Con una almohadilla (#)", "Con un asterisco (*)"], correcta: 0 },
  { enunciado: "¿Qué hace la función SUMA en Calc?", explicacion: "Suma automáticamente los valores de un rango de celdas.", dificultad: "facil", opciones: ["Suma los valores de un rango de celdas", "Cuenta el número de celdas vacías", "Ordena alfabéticamente una columna", "Aplica formato de negrita al texto"], correcta: 0 },
  { enunciado: "¿Qué implica formatear un documento en Writer?", explicacion: "Aplicar estilo visual: tipo de letra, alineación, márgenes, interlineado, etc.", dificultad: "media", opciones: ["Aplicar estilo visual al texto o documento", "Guardar el documento en formato PDF", "Sumar los valores de una tabla", "Enviar el documento por correo electrónico"], correcta: 0 },
  { enunciado: "¿Qué opción se usa para guardar un documento por primera vez, eligiendo nombre y formato?", explicacion: "'Guardar como'.", dificultad: "media", opciones: ["Guardar como", "Guardar (sin más)", "Imprimir", "Exportar a PDF únicamente"], correcta: 0 },
]);

const S2 = "internet-correo-electronico";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un navegador web?", reverso: "Un programa que permite acceder y visualizar páginas de internet, interpretando su código y mostrando el contenido (Firefox, Chrome, Edge, entre otros)" },
  { anverso: "¿Qué es una URL?", reverso: "La dirección única que identifica un recurso en internet (por ejemplo, una página web), indicando el protocolo, el dominio y, en su caso, la ruta concreta" },
  { anverso: "¿Qué es un buscador de internet y en qué se diferencia de un navegador?", reverso: "El buscador es un servicio web (como Google) que indexa y permite localizar contenido en internet mediante palabras clave; el navegador es el programa que se usa para acceder a cualquier página, incluido el buscador" },
  { anverso: "¿Qué es el correo electrónico?", reverso: "Un sistema de mensajería digital que permite enviar y recibir mensajes con texto y archivos adjuntos entre direcciones de correo, de forma asíncrona" },
  { anverso: "¿Qué elementos identifican una dirección de correo electrónico?", reverso: "Un nombre de usuario, el símbolo arroba (@) y el dominio del proveedor de correo (por ejemplo, usuario@zaragoza.es)" },
  { anverso: "¿Qué es un archivo adjunto en un correo electrónico?", reverso: "Un archivo (documento, imagen, etc.) que se envía acompañando al mensaje de correo, independiente del cuerpo del texto" },
  { anverso: "¿Qué diferencia hay entre los campos 'Para', 'CC' y 'CCO' de un correo electrónico?", reverso: "'Para' son los destinatarios principales; 'CC' (con copia) son destinatarios que reciben copia visible para todos; 'CCO' (con copia oculta) reciben copia sin que el resto de destinatarios lo vean" },
  { anverso: "¿Qué es la carpeta de correo no deseado (spam)?", reverso: "Una carpeta donde el sistema de correo clasifica automáticamente los mensajes sospechosos de ser publicidad no solicitada o fraudulentos" },
  { anverso: "¿Qué precaución básica debe tomarse antes de abrir un archivo adjunto de un correo desconocido?", reverso: "Verificar la fiabilidad del remitente y desconfiar de adjuntos o enlaces inesperados, ya que pueden contener virus o intentos de fraude (phishing)" },
  { anverso: "¿Qué es una contraseña segura para una cuenta de correo o de un servicio online?", reverso: "Una contraseña larga, que combina mayúsculas, minúsculas, números y símbolos, distinta para cada servicio y que no incluye datos personales fácilmente deducibles" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es un navegador web?", explicacion: "Un programa que permite acceder y visualizar páginas de internet.", dificultad: "facil", opciones: ["Un programa que permite acceder a páginas de internet", "Un servicio que indexa contenido de internet", "Un tipo de archivo adjunto", "Un sistema de correo electrónico"], correcta: 0 },
  { enunciado: "¿Qué es una URL?", explicacion: "La dirección única que identifica un recurso en internet.", dificultad: "facil", opciones: ["La dirección única que identifica un recurso en internet", "Un tipo de archivo adjunto de correo", "Un programa de hoja de cálculo", "Una carpeta de correo no deseado"], correcta: 0 },
  { enunciado: "¿Qué diferencia hay entre un buscador y un navegador?", explicacion: "El buscador indexa contenido; el navegador es el programa para acceder a cualquier página.", dificultad: "media", opciones: ["El buscador indexa contenido; el navegador accede a páginas", "Son exactamente lo mismo", "El navegador solo sirve para el correo electrónico", "El buscador es un tipo de archivo adjunto"], correcta: 0 },
  { enunciado: "¿Qué elementos identifican una dirección de correo electrónico?", explicacion: "Usuario, arroba (@) y dominio del proveedor.", dificultad: "facil", opciones: ["Usuario, arroba (@) y dominio", "Solo el nombre de usuario", "Solo el dominio del proveedor", "Usuario y contraseña únicamente"], correcta: 0 },
  { enunciado: "¿Qué diferencia hay entre 'CC' y 'CCO' en un correo electrónico?", explicacion: "CC es copia visible para todos; CCO es copia oculta al resto de destinatarios.", dificultad: "media", opciones: ["CC es visible; CCO es oculta al resto", "Son exactamente lo mismo", "CCO solo se usa para archivos adjuntos", "CC solo se usa en correo no deseado"], correcta: 0 },
  { enunciado: "¿Qué es la carpeta de correo no deseado (spam)?", explicacion: "Donde se clasifican automáticamente mensajes sospechosos de publicidad o fraude.", dificultad: "facil", opciones: ["Donde se clasifican mensajes sospechosos", "Donde se guardan los borradores", "Donde se guardan los contactos", "Donde se archivan los correos leídos"], correcta: 0 },
  { enunciado: "¿Qué precaución debe tomarse ante un adjunto de un correo desconocido?", explicacion: "Verificar la fiabilidad del remitente antes de abrirlo, por riesgo de virus o phishing.", dificultad: "media", opciones: ["Verificar la fiabilidad del remitente antes de abrirlo", "Abrirlo siempre sin comprobar nada", "Reenviarlo a todos los contactos", "Marcarlo directamente como spam sin leerlo"], correcta: 0 },
  { enunciado: "¿Qué caracteriza a una contraseña segura?", explicacion: "Larga, con mayúsculas, minúsculas, números y símbolos, distinta por servicio.", dificultad: "media", opciones: ["Larga y combinando distintos tipos de caracteres", "Corta y fácil de recordar", "Igual para todos los servicios", "Basada en el nombre propio o la fecha de nacimiento"], correcta: 0 },
]);

const S3 = "fotocopiadoras-tamanos-papel-problemas";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué tamaño de papel es el estándar habitual en oficinas en España?", reverso: "El DIN A4 (210 x 297 mm), el formato de papel más usado en documentos administrativos" },
  { anverso: "¿Qué tamaño de papel es el DIN A3 y para qué se usa habitualmente?", reverso: "210 x 420... en realidad 297 x 420 mm, el doble de un A4; se usa para documentos de mayor tamaño (planos sencillos, carteles, folletos desplegables)" },
  { anverso: "¿Qué relación hay entre los formatos DIN A0, A1, A2, A3 y A4?", reverso: "Cada formato es la mitad del anterior por el lado más largo: A0 es el mayor (1 m² aprox.), y cada número superior indica que el papel se ha doblado a la mitad respecto al anterior" },
  { anverso: "¿Qué es un atasco de papel en una fotocopiadora y qué causa habitual lo provoca?", reverso: "La retención de una hoja dentro del mecanismo de arrastre; suele deberse a papel arrugado, húmedo, mal colocado en la bandeja, o al desgaste de los rodillos de arrastre" },
  { anverso: "¿Qué debe comprobarse antes de forzar la extracción de un papel atascado en una fotocopiadora?", reverso: "Consultar el panel/pantalla de la máquina, que suele indicar la zona exacta del atasco, y abrir las puertas de acceso siguiendo las instrucciones para no dañar el mecanismo" },
  { anverso: "¿Qué es el tóner en una fotocopiadora o impresora láser?", reverso: "El polvo pigmentado que se fusiona con el papel mediante calor y presión para formar la imagen impresa; se agota con el uso y debe sustituirse el cartucho" },
  { anverso: "¿Qué síntoma indica habitualmente que el tóner de una fotocopiadora se está agotando?", reverso: "Las copias salen cada vez más claras, con rayas blancas o zonas sin tinta" },
  { anverso: "¿Qué es el tambor (o unidad de imagen) de una fotocopiadora láser?", reverso: "El componente cilíndrico fotosensible que transfiere el tóner al papel; su desgaste provoca manchas repetidas a intervalos regulares en la copia" },
  { anverso: "¿Qué mantenimiento básico preventivo puede realizar un usuario en una fotocopiadora?", reverso: "Mantener limpia la bandeja de papel y el cristal de escaneo, evitar sobrecargar las bandejas y avisar de averías graves al servicio técnico sin intentar reparaciones internas" },
  { anverso: "¿Qué problema habitual provoca que las copias salgan con líneas o sombras verticales?", reverso: "Suciedad o rayado en el cristal de escaneo, o suciedad en el tambor/unidad de imagen" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Cuál es el tamaño de papel estándar en oficinas en España?", explicacion: "El DIN A4 (210 x 297 mm).", dificultad: "facil", opciones: ["DIN A4", "DIN A3", "DIN A0", "DIN A5"], correcta: 0 },
  { enunciado: "¿Qué relación de tamaño hay entre los formatos DIN A0 a A4?", explicacion: "Cada formato es la mitad del anterior por el lado más largo.", dificultad: "media", opciones: ["Cada formato es la mitad del anterior", "Cada formato duplica al anterior en todas direcciones", "Son todos del mismo tamaño", "A4 es mayor que A3"], correcta: 0 },
  { enunciado: "¿Qué causa habitual provoca un atasco de papel en una fotocopiadora?", explicacion: "Papel arrugado, húmedo, mal colocado o rodillos de arrastre desgastados.", dificultad: "media", opciones: ["Papel arrugado, húmedo o rodillos desgastados", "El agotamiento del tóner", "El desgaste del tambor de imagen", "Un fallo del sistema operativo"], correcta: 0 },
  { enunciado: "¿Qué debe comprobarse antes de extraer un papel atascado?", explicacion: "El panel/pantalla de la máquina, que indica la zona exacta del atasco.", dificultad: "media", opciones: ["El panel de la máquina que indica la zona del atasco", "Nada, se debe tirar directamente del papel visible", "El nivel de tóner únicamente", "El tamaño de papel cargado en la bandeja"], correcta: 0 },
  { enunciado: "¿Qué es el tóner en una fotocopiadora láser?", explicacion: "El polvo pigmentado que forma la imagen impresa sobre el papel.", dificultad: "facil", opciones: ["El polvo pigmentado que forma la imagen impresa", "El componente cilíndrico fotosensible", "El mecanismo de arrastre del papel", "El cristal de escaneo"], correcta: 0 },
  { enunciado: "¿Qué síntoma indica que el tóner se está agotando?", explicacion: "Copias cada vez más claras, con rayas blancas o zonas sin tinta.", dificultad: "media", opciones: ["Copias más claras o con zonas sin tinta", "Atascos frecuentes de papel", "Líneas verticales por suciedad del cristal", "Manchas repetidas a intervalos regulares"], correcta: 0 },
  { enunciado: "¿Qué provoca el desgaste del tambor o unidad de imagen?", explicacion: "Manchas repetidas a intervalos regulares en la copia.", dificultad: "dificil", opciones: ["Manchas repetidas a intervalos regulares", "Copias cada vez más claras uniformemente", "Atascos de papel en la bandeja", "Errores de conexión de red"], correcta: 0 },
  { enunciado: "¿Qué suele provocar que las copias salgan con líneas o sombras verticales?", explicacion: "Suciedad o rayado en el cristal de escaneo.", dificultad: "media", opciones: ["Suciedad o rayado en el cristal de escaneo", "El agotamiento total del tóner", "Un atasco de papel resuelto", "El tamaño de papel DIN A3"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 13 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 13, orden: 13, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-67 creado y vinculado como Tema 13 de Oficial Mantenimiento General.");
