/**
 * Crea el tema canónico tema-40: "El correo electrónico" y lo asigna
 * como Tema 20 (último) de la oposición Auxiliar Administrativo DGA
 * (bloque-6, Ofimática e informática).
 *
 * Texto oficial del ítem 20, proporcionado directamente por el usuario:
 *   "Correo electrónico. Conceptos elementales y funcionamiento.
 *   Entorno de trabajo: entorno web y disco local. Outlook. Enviar,
 *   recibir, responder y reenviar mensajes. Creación de mensajes.
 *   Reglas de mensaje. Libreta de direcciones. Adjuntar archivos.
 *   Preferencias de usuario. Eliminar, almacenar y compactar mensajes.
 *   Gestión de carpetas."
 *
 * Contenido técnico/práctico sobre correo electrónico y Outlook, sin
 * necesidad de verificación contra el BOE.
 *
 * Tres secciones:
 * 1. conceptos-funcionamiento-entornos — conceptos elementales y
 *    funcionamiento del correo electrónico; entorno web frente a
 *    cliente local (Outlook); enviar, recibir, responder y reenviar.
 * 2. creacion-mensajes-reglas-libreta — creación de mensajes, reglas
 *    de mensaje, libreta de direcciones, adjuntar archivos.
 * 3. preferencias-carpetas-mantenimiento — preferencias de usuario,
 *    eliminar/almacenar/compactar mensajes, gestión de carpetas.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-correo-electronico-dga.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!URL_BASE || !SERVICE_KEY) {
  console.error("❌ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-40";

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
console.log("📚 Creando tema-40...");
await insertar("temas", [
  {
    slug: TEMA,
    titulo: "El correo electrónico",
    descripcion:
      "Conceptos elementales y funcionamiento del correo electrónico. Entorno de trabajo: entorno web y disco local. Outlook. Enviar, recibir, responder y reenviar mensajes. Creación de mensajes. Reglas de mensaje. Libreta de direcciones. Adjuntar archivos. Preferencias de usuario. Eliminar, almacenar y compactar mensajes. Gestión de carpetas.",
    contenido:
      "Desarrolla el manejo del correo electrónico como herramienta de comunicación administrativa: sus conceptos básicos y funcionamiento, la diferencia entre el acceso vía entorno web y el cliente de escritorio (Outlook), la gestión de mensajes (creación, envío, respuesta, reenvío, reglas), la libreta de direcciones, el adjuntado de archivos, las preferencias de usuario y el mantenimiento y organización de carpetas y mensajes.",
    enlaces_boe: [],
    indice_estudio: [
      {
        url: "",
        titulo: "Conceptos elementales, funcionamiento y entornos de trabajo (web y Outlook)",
        seccion: "conceptos-funcionamiento-entornos",
        articulos: "Conceptos fundamentales",
      },
      {
        url: "",
        titulo: "Creación de mensajes, reglas de mensaje, libreta de direcciones y adjuntos",
        seccion: "creacion-mensajes-reglas-libreta",
        articulos: "Conceptos fundamentales",
      },
      {
        url: "",
        titulo: "Preferencias de usuario, gestión de carpetas y mantenimiento de mensajes",
        seccion: "preferencias-carpetas-mantenimiento",
        articulos: "Conceptos fundamentales",
      },
    ],
  },
]);

// ─────────────────────────────────────────────────────────────────────────
// Sección 1: conceptos-funcionamiento-entornos
// ─────────────────────────────────────────────────────────────────────────
const S1 = "conceptos-funcionamiento-entornos";
console.log(`📝 flashcards (${S1})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Qué es el correo electrónico?", reverso: "Un servicio de Internet que permite el intercambio de mensajes de texto, con posibilidad de adjuntar archivos, entre usuarios identificados mediante una dirección de correo" },
    { anverso: "¿Cuál es la estructura básica de una dirección de correo electrónico?", reverso: "usuario@dominio, donde 'usuario' identifica a la persona o cuenta y 'dominio' identifica al servidor de correo que la aloja" },
    { anverso: "¿Qué protocolo se utiliza habitualmente para el envío de correo electrónico?", reverso: "SMTP (Simple Mail Transfer Protocol)" },
    { anverso: "¿Qué protocolos se utilizan habitualmente para la recepción/descarga de correo electrónico? Cita dos", reverso: "POP3 (descarga los mensajes al dispositivo, normalmente eliminándolos del servidor) e IMAP (mantiene los mensajes sincronizados en el servidor, accesibles desde varios dispositivos)" },
    { anverso: "¿Qué diferencia hay entre acceder al correo mediante 'entorno web' (webmail) y mediante un 'cliente de correo local'?", reverso: "El entorno web se accede desde un navegador sin instalar nada, con los mensajes almacenados en el servidor; el cliente local (como Outlook) es una aplicación instalada en el equipo que puede descargar y almacenar los mensajes en el disco local" },
    { anverso: "¿Qué es Microsoft Outlook?", reverso: "Un cliente de correo electrónico de escritorio (parte de la suite Microsoft Office) que además integra calendario, contactos y tareas" },
    { anverso: "¿Qué diferencia hay entre 'Responder' y 'Responder a todos' al contestar un mensaje de correo?", reverso: "'Responder' envía la respuesta únicamente al remitente original; 'Responder a todos' la envía también a todos los demás destinatarios que recibieron el mensaje original" },
    { anverso: "¿Qué hace la opción 'Reenviar' un mensaje de correo electrónico?", reverso: "Permite enviar un mensaje recibido a uno o varios destinatarios nuevos, manteniendo su contenido original (y pudiendo añadir texto adicional)" },
    { anverso: "¿Qué campos de destinatario existen habitualmente al crear un mensaje de correo? Nombra los tres", reverso: "Para (destinatario principal), CC (con copia, visible para todos) y CCO (con copia oculta, cuyos destinatarios no son visibles para el resto)" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })),
);

console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es el correo electrónico?", explicacion: "Un servicio de Internet para el intercambio de mensajes entre usuarios identificados por una dirección de correo.", dificultad: "facil", opciones: ["Un servicio de Internet para el intercambio de mensajes", "Un tipo de hoja de cálculo", "Un sistema operativo", "Un navegador web"], correcta: 0 },
  { enunciado: "¿Cuál es la estructura básica de una dirección de correo electrónico?", explicacion: "usuario@dominio.", dificultad: "facil", opciones: ["usuario@dominio", "usuario#dominio", "dominio@usuario.com únicamente", "usuario/dominio"], correcta: 0 },
  { enunciado: "¿Qué protocolo se utiliza habitualmente para el envío de correo electrónico?", explicacion: "SMTP (Simple Mail Transfer Protocol).", dificultad: "media", opciones: ["SMTP", "HTTP", "FTP", "DNS"], correcta: 0 },
  { enunciado: "¿Cuál de los siguientes es un protocolo utilizado para la recepción de correo electrónico?", explicacion: "IMAP mantiene los mensajes sincronizados en el servidor.", dificultad: "media", opciones: ["IMAP", "SMTP", "HTTP", "TCP exclusivamente"], correcta: 0 },
  { enunciado: "¿Qué caracteriza el acceso al correo mediante 'entorno web' (webmail) frente a un cliente local como Outlook?", explicacion: "Se accede desde un navegador sin instalar nada, con los mensajes en el servidor.", dificultad: "media", opciones: ["Se accede desde un navegador, sin instalar ninguna aplicación", "Requiere instalar siempre una aplicación de escritorio", "No permite adjuntar archivos", "Solo funciona sin conexión a Internet"], correcta: 0 },
  { enunciado: "¿Qué es Microsoft Outlook?", explicacion: "Un cliente de correo de escritorio que integra también calendario, contactos y tareas.", dificultad: "facil", opciones: ["Un cliente de correo de escritorio de Microsoft Office", "Un navegador de Internet", "Un sistema operativo", "Una hoja de cálculo"], correcta: 0 },
  { enunciado: "¿Qué diferencia hay entre 'Responder' y 'Responder a todos' en un correo electrónico?", explicacion: "'Responder' va solo al remitente; 'Responder a todos' llega también a los demás destinatarios.", dificultad: "media", opciones: ["'Responder a todos' incluye también a los demás destinatarios del mensaje original", "No existe diferencia entre ambas opciones", "'Responder' reenvía el mensaje a un nuevo destinatario", "'Responder a todos' elimina el mensaje original"], correcta: 0 },
  { enunciado: "¿Para qué sirve el campo CCO al redactar un mensaje de correo electrónico?", explicacion: "Con copia oculta: sus destinatarios no son visibles para el resto de destinatarios.", dificultad: "media", opciones: ["Para enviar copia oculta, sin que el resto vea a esos destinatarios", "Para adjuntar un archivo comprimido", "Para marcar el mensaje como urgente", "Para programar el envío diferido del mensaje"], correcta: 0 },
]);

// ─────────────────────────────────────────────────────────────────────────
// Sección 2: creacion-mensajes-reglas-libreta
// ─────────────────────────────────────────────────────────────────────────
const S2 = "creacion-mensajes-reglas-libreta";
console.log(`📝 flashcards (${S2})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Qué elementos suele contener un mensaje de correo electrónico nuevo?", reverso: "Destinatario(s), asunto, cuerpo del mensaje y, opcionalmente, archivos adjuntos" },
    { anverso: "¿Qué es una 'regla de mensaje' en un cliente de correo como Outlook?", reverso: "Una acción automática que se aplica a los mensajes entrantes o salientes que cumplen ciertas condiciones (por ejemplo, mover a una carpeta, marcar, reenviar o eliminar automáticamente)" },
    { anverso: "¿Desde dónde se crean y gestionan las reglas de mensaje en Outlook?", reverso: "Desde 'Archivo' > 'Administrar reglas y alertas' (o desde el menú contextual de un mensaje, opción 'Reglas')" },
    { anverso: "¿Qué es la 'libreta de direcciones' en un cliente de correo?", reverso: "El listado de contactos guardados con sus direcciones de correo electrónico, que permite seleccionarlos rápidamente al redactar un mensaje sin escribir la dirección completa" },
    { anverso: "¿Cómo se añade un contacto nuevo a la libreta de direcciones en Outlook?", reverso: "Desde el módulo 'Contactos' o 'Personas', mediante la opción 'Nuevo contacto', introduciendo el nombre y la dirección de correo, entre otros datos" },
    { anverso: "¿Cómo se adjunta un archivo a un mensaje de correo electrónico?", reverso: "Mediante la opción 'Adjuntar archivo' del mensaje nuevo, seleccionando el archivo desde el equipo o desde el almacenamiento en la nube" },
    { anverso: "¿Qué suelen limitar los servidores de correo respecto a los archivos adjuntos?", reverso: "El tamaño máximo total de los adjuntos por mensaje (habitualmente entre 10 y 25 MB, según el proveedor)" },
    { anverso: "¿Qué es una 'firma' de correo electrónico y dónde se configura en Outlook?", reverso: "Un texto (con datos de contacto, cargo, etc.) que se añade automáticamente al final de los mensajes; se configura desde 'Archivo' > 'Opciones' > 'Correo' > 'Firmas'" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })),
);

console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué elementos básicos suele contener un mensaje de correo electrónico nuevo?", explicacion: "Destinatario, asunto, cuerpo del mensaje y, opcionalmente, adjuntos.", dificultad: "facil", opciones: ["Destinatario, asunto, cuerpo del mensaje y adjuntos opcionales", "Solo el asunto y la firma", "Únicamente la dirección del remitente", "Solo archivos adjuntos, sin texto"], correcta: 0 },
  { enunciado: "¿Qué es una 'regla de mensaje' en un cliente de correo como Outlook?", explicacion: "Una acción automática aplicada a mensajes que cumplen ciertas condiciones.", dificultad: "media", opciones: ["Una acción automática aplicada a mensajes que cumplen ciertas condiciones", "Un tipo de archivo adjunto", "Un filtro antivirus obligatorio", "Un límite de tamaño del buzón"], correcta: 0 },
  { enunciado: "¿Desde dónde se administran las reglas de mensaje en Outlook?", explicacion: "Desde 'Archivo' > 'Administrar reglas y alertas'.", dificultad: "media", opciones: ["Archivo > Administrar reglas y alertas", "Insertar > Reglas", "Vista > Configuración", "Revisar > Ortografía"], correcta: 0 },
  { enunciado: "¿Qué es la libreta de direcciones en un cliente de correo electrónico?", explicacion: "El listado de contactos guardados con sus direcciones de correo.", dificultad: "facil", opciones: ["El listado de contactos guardados con sus direcciones de correo", "El historial de mensajes eliminados", "La carpeta de correo no deseado", "El registro de contraseñas del usuario"], correcta: 0 },
  { enunciado: "¿Desde qué módulo de Outlook se añade un contacto nuevo a la libreta de direcciones?", explicacion: "Desde el módulo 'Contactos' o 'Personas'.", dificultad: "media", opciones: ["Contactos (o Personas)", "Calendario", "Tareas", "Notas"], correcta: 0 },
  { enunciado: "¿Cómo se adjunta un archivo a un mensaje de correo electrónico?", explicacion: "Mediante la opción 'Adjuntar archivo' del mensaje nuevo.", dificultad: "facil", opciones: ["Mediante la opción 'Adjuntar archivo'", "Copiando el archivo en el asunto del mensaje", "No es posible adjuntar archivos en el correo electrónico", "Únicamente enviando un enlace por separado"], correcta: 0 },
  { enunciado: "¿Qué suelen limitar los servidores de correo respecto a los archivos adjuntos de un mensaje?", explicacion: "El tamaño máximo total de los adjuntos por mensaje.", dificultad: "media", opciones: ["El tamaño máximo total de los adjuntos", "El número de destinatarios en copia oculta", "El idioma del mensaje", "El tipo de letra utilizado en el cuerpo"], correcta: 0 },
  { enunciado: "¿Dónde se configura la firma de correo electrónico en Outlook?", explicacion: "Desde 'Archivo' > 'Opciones' > 'Correo' > 'Firmas'.", dificultad: "media", opciones: ["Archivo > Opciones > Correo > Firmas", "Vista > Diseño", "Insertar > Tabla", "Datos > Ordenar y filtrar"], correcta: 0 },
]);

// ─────────────────────────────────────────────────────────────────────────
// Sección 3: preferencias-carpetas-mantenimiento
// ─────────────────────────────────────────────────────────────────────────
const S3 = "preferencias-carpetas-mantenimiento";
console.log(`📝 flashcards (${S3})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Dónde se configuran las 'Preferencias de usuario' generales en Outlook?", reverso: "Desde 'Archivo' > 'Opciones', donde se ajustan aspectos como el formato de los mensajes, las notificaciones, la vista previa de lectura o el idioma" },
    { anverso: "¿Qué diferencia hay entre 'eliminar' un mensaje y 'archivarlo' en un cliente de correo?", reverso: "Eliminar mueve el mensaje a la carpeta de 'Elementos eliminados' (papelera); archivar lo traslada a una carpeta de almacenamiento a largo plazo sin borrarlo" },
    { anverso: "¿Qué es 'compactar' un archivo de datos de Outlook (.pst/.ost)?", reverso: "Un proceso de mantenimiento que reduce el tamaño del archivo de datos eliminando el espacio libre que dejan los mensajes borrados, sin eliminar mensajes vivos" },
    { anverso: "¿Cómo se crea una nueva carpeta personalizada en Outlook para organizar el correo?", reverso: "Haciendo clic derecho sobre la bandeja de entrada u otra carpeta existente y seleccionando 'Nueva carpeta'" },
    { anverso: "¿Qué es la carpeta de 'Correo no deseado' (spam) en un cliente de correo?", reverso: "La carpeta donde el sistema clasifica automáticamente los mensajes identificados como no solicitados o sospechosos, separándolos de la bandeja de entrada" },
    { anverso: "¿Qué ocurre cuando se vacía la carpeta de 'Elementos eliminados' en Outlook?", reverso: "Los mensajes que contenía se eliminan definitivamente (dejan de estar disponibles para su recuperación normal)" },
    { anverso: "¿Qué permite hacer la opción de 'mover' mensajes entre carpetas en un cliente de correo?", reverso: "Organizar el correo trasladando mensajes de la bandeja de entrada a carpetas personalizadas, arrastrándolos o mediante el comando 'Mover a'" },
    { anverso: "¿Qué es una 'cuota de almacenamiento' del buzón de correo?", reverso: "El espacio máximo disponible para almacenar mensajes y adjuntos en la cuenta, cuyo exceso puede impedir la recepción de nuevos correos hasta liberar espacio" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })),
);

console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Desde dónde se configuran las preferencias de usuario generales en Outlook?", explicacion: "Desde 'Archivo' > 'Opciones'.", dificultad: "facil", opciones: ["Archivo > Opciones", "Insertar > Configuración", "Vista > Preferencias", "Datos > Usuario"], correcta: 0 },
  { enunciado: "¿Qué diferencia hay entre 'eliminar' un mensaje y 'archivarlo' en un cliente de correo?", explicacion: "Eliminar lo mueve a la papelera; archivar lo traslada a almacenamiento a largo plazo sin borrarlo.", dificultad: "media", opciones: ["Archivar traslada el mensaje a almacenamiento sin borrarlo, eliminar lo manda a la papelera", "Ambas acciones son exactamente equivalentes", "Archivar borra el mensaje de forma permanente", "Eliminar convierte el mensaje en borrador"], correcta: 0 },
  { enunciado: "¿Qué es 'compactar' un archivo de datos de Outlook (.pst/.ost)?", explicacion: "Un proceso de mantenimiento que reduce el tamaño del archivo eliminando espacio libre de mensajes borrados.", dificultad: "media", opciones: ["Un proceso que reduce el tamaño del archivo de datos", "Un proceso que elimina todos los contactos", "Un proceso que cambia el idioma de la aplicación", "Un proceso que reenvía automáticamente los mensajes"], correcta: 0 },
  { enunciado: "¿Cómo se crea una nueva carpeta personalizada en Outlook?", explicacion: "Clic derecho sobre una carpeta existente y 'Nueva carpeta'.", dificultad: "facil", opciones: ["Clic derecho sobre una carpeta y 'Nueva carpeta'", "Únicamente desde la línea de comandos", "No es posible crear carpetas personalizadas en Outlook", "Reinstalando la aplicación"], correcta: 0 },
  { enunciado: "¿Qué función cumple la carpeta de 'Correo no deseado' en un cliente de correo?", explicacion: "Clasifica automáticamente los mensajes sospechosos o no solicitados, separándolos de la bandeja de entrada.", dificultad: "media", opciones: ["Clasificar automáticamente los mensajes sospechosos o no solicitados", "Almacenar los borradores sin enviar", "Guardar los contactos eliminados", "Archivar los mensajes ya leídos"], correcta: 0 },
  { enunciado: "¿Qué ocurre al vaciar la carpeta de 'Elementos eliminados' en Outlook?", explicacion: "Los mensajes se eliminan definitivamente.", dificultad: "facil", opciones: ["Los mensajes se eliminan definitivamente", "Los mensajes se mueven a Correo no deseado", "Los mensajes se archivan automáticamente", "No ocurre ningún cambio en los mensajes"], correcta: 0 },
  { enunciado: "¿Qué es la cuota de almacenamiento de un buzón de correo?", explicacion: "El espacio máximo disponible para almacenar mensajes y adjuntos.", dificultad: "media", opciones: ["El espacio máximo disponible para mensajes y adjuntos", "El número máximo de contactos permitidos", "El número de reglas de mensaje activas", "El tiempo máximo de conexión diaria"], correcta: 0 },
]);

console.log(
  "✅ tema-40 creado (3 secciones: conceptos-funcionamiento-entornos, creacion-mensajes-reglas-libreta, preferencias-carpetas-mantenimiento; 24 flashcards + 22 preguntas en total).",
);

// ─────────────────────────────────────────────────────────────────────────
// Asignación a la oposición DGA: numero 20, bloque-6 (Ofimática e informática)
// ─────────────────────────────────────────────────────────────────────────
console.log("🔧 Asignando tema-40 a auxiliar-administrativo-dga (numero 20, bloque-6)...");

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
      numero: 20,
      orden: 20,
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

console.log("✅ Tema 20 de la DGA (correo electrónico) dado de alta. ¡Los 20 temas de la DGA están completos!");
