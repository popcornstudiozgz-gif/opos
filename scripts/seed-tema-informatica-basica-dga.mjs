/**
 * Crea el tema canónico tema-36: "Informática básica" y lo asigna
 * como Tema 16 de la oposición Auxiliar Administrativo DGA (bloque-6,
 * Ofimática e informática), primer tema de las "materias específicas".
 *
 * Texto oficial del ítem 16, proporcionado directamente por el usuario
 * (programa de materias específicas de la DGA):
 *   "Informática básica: conceptos fundamentales sobre el hardware y
 *   el software. Sistemas de almacenamiento de datos. Sistemas
 *   operativos. Certificados y firma electrónica. La Red Internet:
 *   Origen, evolución y estado actual. Conceptos elementales sobre
 *   protocolos y servicios en Internet. Navegadores web: funcionamiento
 *   básico y navegadores más utilizados. Concepto de URL. Uso de
 *   buscadores. Inteligencia Artificial. Nociones básicas de seguridad
 *   informática."
 *
 * A diferencia de los temas jurídicos de esta sesión, este contenido
 * es técnico/práctico (informática general) y no requiere verificación
 * contra el BOE: se basa en conceptos estándar de hardware, software,
 * sistemas operativos, redes y seguridad informática ampliamente
 * consolidados y no controvertidos.
 *
 * Cuatro secciones:
 * 1. hardware-software-almacenamiento — conceptos fundamentales de
 *    hardware y software, y sistemas de almacenamiento de datos.
 * 2. sistemas-operativos-certificados-firma — qué es un sistema
 *    operativo y sus funciones, certificados digitales y firma
 *    electrónica.
 * 3. internet-protocolos-servicios — origen y evolución de Internet,
 *    protocolos (TCP/IP, HTTP/HTTPS, etc.) y servicios de Internet.
 * 4. navegadores-buscadores-ia-seguridad — navegadores web, concepto
 *    de URL, buscadores, Inteligencia Artificial y nociones básicas
 *    de seguridad informática.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-informatica-basica-dga.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!URL_BASE || !SERVICE_KEY) {
  console.error("❌ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-36";

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
console.log("📚 Creando tema-36...");
await insertar("temas", [
  {
    slug: TEMA,
    titulo: "Informática básica",
    descripcion:
      "Conceptos fundamentales sobre el hardware y el software. Sistemas de almacenamiento de datos. Sistemas operativos. Certificados y firma electrónica. La Red Internet: origen, evolución y estado actual. Protocolos y servicios en Internet. Navegadores web y concepto de URL. Uso de buscadores. Inteligencia Artificial. Nociones básicas de seguridad informática.",
    contenido:
      "Introduce los conceptos básicos de informática necesarios en el puesto de Auxiliar Administrativo: los componentes del hardware y los tipos de software, los sistemas de almacenamiento de datos, la función de los sistemas operativos, los certificados digitales y la firma electrónica, el origen y funcionamiento de Internet (protocolos, servicios, navegadores, URL y buscadores), una introducción a la Inteligencia Artificial y las nociones básicas de seguridad informática que debe conocer cualquier empleado público en su actividad diaria.",
    enlaces_boe: [],
    indice_estudio: [
      {
        url: "",
        titulo: "Hardware, software y sistemas de almacenamiento de datos",
        seccion: "hardware-software-almacenamiento",
        articulos: "Conceptos fundamentales",
      },
      {
        url: "",
        titulo: "Sistemas operativos, certificados y firma electrónica",
        seccion: "sistemas-operativos-certificados-firma",
        articulos: "Conceptos fundamentales",
      },
      {
        url: "",
        titulo: "La Red Internet: origen, protocolos y servicios",
        seccion: "internet-protocolos-servicios",
        articulos: "Conceptos fundamentales",
      },
      {
        url: "",
        titulo: "Navegadores, URL, buscadores, Inteligencia Artificial y seguridad informática",
        seccion: "navegadores-buscadores-ia-seguridad",
        articulos: "Conceptos fundamentales",
      },
    ],
  },
]);

// ─────────────────────────────────────────────────────────────────────────
// Sección 1: hardware-software-almacenamiento
// ─────────────────────────────────────────────────────────────────────────
const S1 = "hardware-software-almacenamiento";
console.log(`📝 flashcards (${S1})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Qué se entiende por hardware?", reverso: "El conjunto de componentes físicos y tangibles de un sistema informático: la placa base, el procesador, la memoria, los dispositivos de almacenamiento, los periféricos, etc." },
    { anverso: "¿Qué se entiende por software?", reverso: "El conjunto de programas, instrucciones y datos que permiten a un ordenador realizar tareas; es la parte lógica e intangible del sistema informático" },
    { anverso: "¿Qué es la CPU (unidad central de procesamiento)?", reverso: "El componente hardware encargado de ejecutar las instrucciones de los programas, realizando las operaciones aritméticas y lógicas; es el 'cerebro' del ordenador" },
    { anverso: "¿Cuál es la diferencia entre memoria RAM y memoria ROM?", reverso: "La RAM (memoria de acceso aleatorio) es volátil, se usa para el trabajo temporal y pierde su contenido al apagar el equipo; la ROM (memoria de solo lectura) es no volátil y conserva instrucciones básicas incluso sin energía" },
    { anverso: "¿Qué distingue al software de sistema del software de aplicación?", reverso: "El software de sistema (como el sistema operativo) gestiona los recursos del ordenador y sirve de base para otros programas; el software de aplicación (como un procesador de texto) realiza tareas específicas para el usuario" },
    { anverso: "¿Qué es un dispositivo de almacenamiento óptico y cita un ejemplo", reverso: "Un dispositivo que graba y lee datos mediante un haz de láser sobre un disco; ejemplos: CD, DVD y Blu-ray" },
    { anverso: "¿Qué es un disco de estado sólido (SSD) y en qué se diferencia de un disco duro (HDD)?", reverso: "Un SSD almacena datos en memoria flash sin partes móviles, siendo más rápido, silencioso y resistente que un HDD, que almacena los datos en platos magnéticos giratorios" },
    { anverso: "¿Qué es el almacenamiento en la nube (cloud storage)?", reverso: "Un modelo de almacenamiento de datos en servidores remotos accesibles a través de Internet, que permite guardar y recuperar información sin depender de un dispositivo físico local" },
    { anverso: "¿Qué es un periférico de entrada? Pon un ejemplo", reverso: "Un dispositivo que permite introducir datos o instrucciones en el ordenador; ejemplos: teclado, ratón, escáner" },
    { anverso: "¿Qué es un periférico de salida? Pon un ejemplo", reverso: "Un dispositivo que permite al ordenador mostrar o comunicar información al usuario; ejemplos: monitor, impresora, altavoces" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })),
);

console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué se entiende por hardware de un sistema informático?", explicacion: "El conjunto de componentes físicos y tangibles: placa base, procesador, memoria, dispositivos de almacenamiento y periféricos.", dificultad: "facil", opciones: ["Los componentes físicos y tangibles del sistema", "Los programas y aplicaciones instalados", "Exclusivamente el sistema operativo", "Los datos almacenados en el disco duro"], correcta: 0 },
  { enunciado: "¿Cuál es la función principal de la CPU en un ordenador?", explicacion: "Ejecutar las instrucciones de los programas realizando operaciones aritméticas y lógicas.", dificultad: "facil", opciones: ["Ejecutar las instrucciones de los programas", "Almacenar de forma permanente los archivos del usuario", "Mostrar la información en pantalla", "Conectar el equipo a Internet"], correcta: 0 },
  { enunciado: "¿Qué característica principal distingue a la memoria RAM de la memoria ROM?", explicacion: "La RAM es volátil (pierde su contenido al apagar el equipo); la ROM es no volátil.", dificultad: "media", opciones: ["La RAM es volátil y la ROM no", "La ROM es más rápida que la RAM en todos los casos", "La RAM solo puede leerse, nunca escribirse", "No existe diferencia relevante entre ambas"], correcta: 0 },
  { enunciado: "¿Qué es el software de sistema?", explicacion: "El software que gestiona los recursos del ordenador y sirve de base para el resto de programas, como el sistema operativo.", dificultad: "media", opciones: ["El software que gestiona los recursos del ordenador, como el sistema operativo", "Cualquier programa instalado por el usuario para tareas específicas", "El conjunto de componentes físicos del equipo", "Los archivos de datos generados por el usuario"], correcta: 0 },
  { enunciado: "¿Cuál de las siguientes es una ventaja característica de un disco de estado sólido (SSD) frente a un disco duro tradicional (HDD)?", explicacion: "Los SSD, al no tener partes móviles, son más rápidos, silenciosos y resistentes que los HDD.", dificultad: "media", opciones: ["Mayor velocidad y ausencia de partes móviles", "Menor coste por gigabyte en todos los casos", "Mayor capacidad máxima disponible siempre", "Requerir desfragmentación periódica obligatoria"], correcta: 0 },
  { enunciado: "¿Qué es el almacenamiento en la nube?", explicacion: "Un modelo de almacenamiento en servidores remotos accesibles por Internet, sin depender de un dispositivo físico local.", dificultad: "facil", opciones: ["Almacenamiento en servidores remotos accesibles por Internet", "Un tipo de memoria RAM de alta velocidad", "Un formato de compresión de archivos", "Un dispositivo de almacenamiento óptico"], correcta: 0 },
  { enunciado: "¿Cuál de los siguientes es un periférico de entrada?", explicacion: "El teclado permite introducir datos en el ordenador; es un periférico de entrada.", dificultad: "facil", opciones: ["El teclado", "El monitor", "La impresora", "Los altavoces"], correcta: 0 },
  { enunciado: "¿Cuál de los siguientes es un periférico de salida?", explicacion: "El monitor muestra información al usuario; es un periférico de salida.", dificultad: "facil", opciones: ["El monitor", "El ratón", "El escáner", "El teclado"], correcta: 0 },
]);

// ─────────────────────────────────────────────────────────────────────────
// Sección 2: sistemas-operativos-certificados-firma
// ─────────────────────────────────────────────────────────────────────────
const S2 = "sistemas-operativos-certificados-firma";
console.log(`📝 flashcards (${S2})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Qué es un sistema operativo?", reverso: "El software base que gestiona los recursos hardware de un ordenador (procesador, memoria, dispositivos) y proporciona los servicios necesarios para que se ejecuten las demás aplicaciones" },
    { anverso: "Cita tres funciones básicas de un sistema operativo", reverso: "Gestión de la memoria, gestión de los procesos (o tareas en ejecución), y gestión de los dispositivos de entrada/salida (también: gestión de archivos y gestión de la interfaz de usuario)" },
    { anverso: "Cita tres ejemplos de sistemas operativos para ordenadores personales", reverso: "Microsoft Windows, macOS y Linux (en sus distintas distribuciones)" },
    { anverso: "¿Qué es un certificado digital (o certificado electrónico)?", reverso: "Un documento electrónico expedido por una autoridad de certificación que vincula unos datos de verificación de firma a un firmante y confirma su identidad" },
    { anverso: "¿Qué es la firma electrónica?", reverso: "El conjunto de datos en forma electrónica asociados a un documento que se utilizan para identificar al firmante y garantizar la integridad del documento firmado" },
    { anverso: "¿Qué diferencia hay entre firma electrónica simple, avanzada y cualificada?", reverso: "La simple es cualquier dato electrónico asociado a otros datos para autenticar al firmante; la avanzada permite identificar al firmante y detectar cambios posteriores; la cualificada es una firma avanzada basada en un certificado cualificado y creada con un dispositivo cualificado, con la máxima validez legal" },
    { anverso: "¿Qué es el DNI electrónico (DNIe)?", reverso: "El documento nacional de identidad que incorpora un chip con certificados digitales que permiten acreditar electrónicamente la identidad de su titular y firmar documentos electrónicos" },
    { anverso: "¿Qué es Cl@ve?", reverso: "El sistema de identificación, autenticación y firma electrónica del sector público de la Administración General del Estado, pensado para simplificar el acceso electrónico de los ciudadanos a los servicios públicos" },
    { anverso: "¿Para qué sirve un certificado digital al relacionarse con la Administración?", reverso: "Para identificarse electrónicamente y firmar documentos y trámites ante la Administración con validez legal, sin necesidad de presencia física" },
    { anverso: "¿Qué es una entidad o autoridad de certificación (AC)?", reverso: "La entidad de confianza responsable de emitir y gestionar los certificados digitales, garantizando la identidad de las personas o entidades a las que se los expide" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })),
);

console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es un sistema operativo?", explicacion: "El software base que gestiona los recursos hardware del ordenador y permite ejecutar las demás aplicaciones.", dificultad: "facil", opciones: ["El software base que gestiona los recursos del ordenador", "Un periférico de almacenamiento externo", "Un tipo de memoria RAM especializada", "Un navegador web instalado por defecto"], correcta: 0 },
  { enunciado: "¿Cuál de las siguientes NO es una función básica de un sistema operativo?", explicacion: "La gestión de la memoria, procesos y dispositivos son funciones propias del sistema operativo; redactar documentos de texto es tarea de una aplicación (como Word), no del sistema operativo.", dificultad: "media", opciones: ["Redactar documentos de texto", "Gestionar la memoria del equipo", "Gestionar los procesos en ejecución", "Gestionar los dispositivos de entrada/salida"], correcta: 0 },
  { enunciado: "¿Cuál de los siguientes es un sistema operativo?", explicacion: "Microsoft Windows es un sistema operativo; Word es una aplicación que se ejecuta sobre un sistema operativo.", dificultad: "facil", opciones: ["Microsoft Windows", "Microsoft Word", "Microsoft Excel", "Microsoft Outlook"], correcta: 0 },
  { enunciado: "¿Qué es un certificado digital o electrónico?", explicacion: "Un documento electrónico expedido por una autoridad de certificación que vincula unos datos de verificación de firma a un firmante, confirmando su identidad.", dificultad: "media", opciones: ["Un documento electrónico que confirma la identidad de un firmante", "Un tipo de archivo comprimido", "Un protocolo de transferencia de archivos", "Un componente físico del ordenador"], correcta: 0 },
  { enunciado: "¿Cuál de los siguientes tipos de firma electrónica tiene la máxima validez legal, al basarse en un certificado cualificado y un dispositivo cualificado?", explicacion: "La firma electrónica cualificada.", dificultad: "dificil", opciones: ["La firma electrónica cualificada", "La firma electrónica simple", "La firma electrónica avanzada, sin más requisitos", "Ningún tipo de firma electrónica tiene validez legal"], correcta: 0 },
  { enunciado: "¿Qué es el DNI electrónico (DNIe)?", explicacion: "El documento nacional de identidad que incorpora un chip con certificados digitales para acreditar la identidad electrónicamente y firmar documentos.", dificultad: "facil", opciones: ["El DNI que incorpora un chip con certificados digitales", "Un certificado emitido exclusivamente por bancos privados", "Una aplicación móvil de mensajería", "Un tipo de tarjeta de crédito sin contacto"], correcta: 0 },
  { enunciado: "¿Qué es Cl@ve?", explicacion: "El sistema de identificación, autenticación y firma electrónica del sector público de la Administración General del Estado.", dificultad: "media", opciones: ["El sistema de identificación y firma electrónica del sector público estatal", "Un navegador web específico de la Administración", "Un antivirus desarrollado por el CCN-CERT", "Un formato de archivo de documentos administrativos"], correcta: 0 },
  { enunciado: "¿Cuál es la función de una entidad o autoridad de certificación (AC)?", explicacion: "Emitir y gestionar los certificados digitales, garantizando la identidad de las personas o entidades a las que se expiden.", dificultad: "media", opciones: ["Emitir y gestionar certificados digitales garantizando la identidad de sus titulares", "Fabricar los componentes hardware de los ordenadores", "Diseñar sistemas operativos para dispositivos móviles", "Gestionar exclusivamente el correo electrónico corporativo"], correcta: 0 },
]);

// ─────────────────────────────────────────────────────────────────────────
// Sección 3: internet-protocolos-servicios
// ─────────────────────────────────────────────────────────────────────────
const S3 = "internet-protocolos-servicios";
console.log(`📝 flashcards (${S3})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Qué es Internet?", reverso: "Una red mundial descentralizada de ordenadores interconectados que se comunican entre sí mediante un conjunto común de protocolos, permitiendo el intercambio de información a escala global" },
    { anverso: "¿En qué proyecto tiene su origen Internet?", reverso: "En ARPANET, una red desarrollada a finales de los años 60 por el Departamento de Defensa de Estados Unidos, considerada la precursora directa de Internet" },
    { anverso: "¿Qué es un protocolo de comunicación en informática?", reverso: "Un conjunto de reglas y normas que permiten que dos o más dispositivos se comuniquen e intercambien información de forma ordenada y comprensible para ambos" },
    { anverso: "¿Qué significa TCP/IP y qué función cumple?", reverso: "Protocolo de Control de Transmisión / Protocolo de Internet; es el conjunto de protocolos base que permite la comunicación entre los dispositivos conectados a Internet, encargándose del envío fiable y el direccionamiento de los datos" },
    { anverso: "¿Qué es el protocolo HTTP y en qué se diferencia de HTTPS?", reverso: "HTTP (Protocolo de Transferencia de Hipertexto) es el protocolo que permite la transferencia de páginas web; HTTPS es su versión segura, que cifra la comunicación entre el navegador y el servidor" },
    { anverso: "¿Qué es el correo electrónico como servicio de Internet?", reverso: "Un servicio que permite el envío y recepción de mensajes digitales entre usuarios a través de la red, mediante protocolos como SMTP (envío), POP3 e IMAP (recepción)" },
    { anverso: "¿Qué es la World Wide Web (WWW)?", reverso: "Un servicio de Internet basado en el hipertexto que permite acceder a través de navegadores a páginas web interconectadas mediante enlaces; no es sinónimo de Internet, sino uno de sus servicios más utilizados" },
    { anverso: "¿Qué es la Administración electrónica como servicio de Internet?", reverso: "El conjunto de servicios que permiten a los ciudadanos relacionarse con las Administraciones Públicas por medios electrónicos: presentar solicitudes, consultar expedientes, realizar pagos, etc." },
    { anverso: "¿Qué es el FTP y para qué se usa?", reverso: "Protocolo de Transferencia de Ficheros; se utiliza para transferir archivos entre un cliente y un servidor a través de una red" },
    { anverso: "¿Qué caracteriza el estado actual de Internet frente a sus inicios?", reverso: "Su enorme expansión y masificación de uso, la movilidad (acceso desde dispositivos móviles), la velocidad de las conexiones, y la centralidad de servicios como el comercio electrónico, las redes sociales, la nube y la Administración electrónica" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })),
);

console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es Internet?", explicacion: "Una red mundial descentralizada de ordenadores interconectados que se comunican mediante un conjunto común de protocolos.", dificultad: "facil", opciones: ["Una red mundial descentralizada de ordenadores interconectados", "Un programa informático instalado en cada equipo", "Un tipo de navegador web específico", "Un servicio exclusivo de correo electrónico"], correcta: 0 },
  { enunciado: "¿En qué proyecto tiene su origen Internet?", explicacion: "En ARPANET, red desarrollada a finales de los años 60 por el Departamento de Defensa de Estados Unidos.", dificultad: "media", opciones: ["ARPANET", "World Wide Web", "Windows Network", "TCP Foundation"], correcta: 0 },
  { enunciado: "¿Qué es un protocolo de comunicación en informática?", explicacion: "Un conjunto de reglas y normas que permiten que dos o más dispositivos se comuniquen e intercambien información de forma ordenada.", dificultad: "media", opciones: ["Un conjunto de reglas que permiten la comunicación entre dispositivos", "Un tipo de virus informático", "Un dispositivo físico de red", "Un formato de compresión de imágenes"], correcta: 0 },
  { enunciado: "¿Qué función cumple el conjunto de protocolos TCP/IP?", explicacion: "Permite la comunicación entre los dispositivos conectados a Internet, encargándose del envío fiable y el direccionamiento de los datos.", dificultad: "media", opciones: ["Permite la comunicación y el direccionamiento de datos entre dispositivos en Internet", "Sirve exclusivamente para comprimir archivos de gran tamaño", "Es un protocolo utilizado solo para el correo electrónico", "Es el sistema operativo base de los servidores web"], correcta: 0 },
  { enunciado: "¿En qué se diferencia HTTPS de HTTP?", explicacion: "HTTPS es la versión segura de HTTP: cifra la comunicación entre el navegador y el servidor.", dificultad: "media", opciones: ["HTTPS cifra la comunicación entre navegador y servidor", "HTTPS es más antiguo que HTTP", "HTTP solo funciona en redes locales, HTTPS en Internet", "No existe ninguna diferencia relevante entre ambos"], correcta: 0 },
  { enunciado: "¿Cuáles son los protocolos habituales asociados al correo electrónico?", explicacion: "SMTP para el envío de mensajes, y POP3 o IMAP para su recepción.", dificultad: "dificil", opciones: ["SMTP para envío, y POP3/IMAP para recepción", "HTTP para envío y FTP para recepción", "TCP/IP exclusivamente", "DNS para envío y recepción de mensajes"], correcta: 0 },
  { enunciado: "¿Qué es la World Wide Web (WWW)?", explicacion: "Un servicio de Internet basado en el hipertexto que permite acceder a páginas web interconectadas mediante enlaces; no es sinónimo de Internet.", dificultad: "media", opciones: ["Un servicio de Internet basado en el hipertexto, no sinónimo de Internet", "Un sinónimo exacto de Internet", "Un tipo de cable de red de alta velocidad", "El nombre del primer navegador web creado"], correcta: 0 },
  { enunciado: "¿Para qué se utiliza el protocolo FTP?", explicacion: "Para transferir archivos entre un cliente y un servidor a través de una red.", dificultad: "media", opciones: ["Para transferir archivos entre un cliente y un servidor", "Para navegar por páginas web", "Para enviar correos electrónicos", "Para realizar videollamadas"], correcta: 0 },
]);

// ─────────────────────────────────────────────────────────────────────────
// Sección 4: navegadores-buscadores-ia-seguridad
// ─────────────────────────────────────────────────────────────────────────
const S4 = "navegadores-buscadores-ia-seguridad";
console.log(`📝 flashcards (${S4})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Qué es un navegador web?", reverso: "Una aplicación que permite acceder e interpretar páginas web, mostrando su contenido (texto, imágenes, vídeo) y permitiendo la interacción del usuario con ellas" },
    { anverso: "Cita tres navegadores web ampliamente utilizados en la actualidad", reverso: "Google Chrome, Microsoft Edge y Mozilla Firefox (también: Safari, Opera)" },
    { anverso: "¿Qué es una URL?", reverso: "Localizador Uniforme de Recursos (Uniform Resource Locator): la dirección que identifica de forma única un recurso en Internet y permite localizarlo, indicando el protocolo, el dominio y la ruta del recurso" },
    { anverso: "En una URL como https://www.aragon.es/tramites, identifica el protocolo y el dominio", reverso: "El protocolo es 'https' (indicado antes de '://') y el dominio es 'www.aragon.es'" },
    { anverso: "¿Qué es un buscador (motor de búsqueda)?", reverso: "Una herramienta que permite localizar información en Internet a partir de palabras clave introducidas por el usuario, mostrando una lista de resultados relevantes; ejemplos: Google, Bing" },
    { anverso: "¿Qué es la Inteligencia Artificial (IA)?", reverso: "La rama de la informática que desarrolla sistemas capaces de realizar tareas que normalmente requieren inteligencia humana, como el reconocimiento de patrones, el aprendizaje o la toma de decisiones" },
    { anverso: "¿Qué es un modelo de lenguaje o asistente conversacional de IA?", reverso: "Un tipo de sistema de Inteligencia Artificial entrenado para comprender y generar texto en lenguaje natural, capaz de responder preguntas, redactar textos o resumir información" },
    { anverso: "¿Qué se entiende por seguridad informática?", reverso: "El conjunto de medidas técnicas y organizativas destinadas a proteger los sistemas informáticos y la información que contienen frente a accesos no autorizados, daños o pérdidas" },
    { anverso: "¿Qué es una contraseña segura y qué características debería tener?", reverso: "Una contraseña difícil de adivinar o descifrar, que combine mayúsculas, minúsculas, números y símbolos, con una longitud suficiente, y que no se reutilice en distintos servicios" },
    { anverso: "¿Qué es el phishing?", reverso: "Una técnica de fraude por la que un atacante se hace pasar por una entidad legítima (banco, Administración, empresa) mediante correos o webs falsas para engañar al usuario y obtener sus datos personales o credenciales" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S4 })),
);

console.log(`📝 preguntas de test (${S4})...`);
await insertarPreguntasConOpciones(S4, [
  { enunciado: "¿Qué es un navegador web?", explicacion: "Una aplicación que permite acceder e interpretar páginas web, mostrando su contenido y permitiendo la interacción del usuario.", dificultad: "facil", opciones: ["Una aplicación que permite acceder e interpretar páginas web", "Un servicio de almacenamiento en la nube", "Un protocolo de transferencia de archivos", "Un tipo de sistema operativo"], correcta: 0 },
  { enunciado: "¿Cuál de las siguientes opciones es un navegador web?", explicacion: "Google Chrome es un navegador web.", dificultad: "facil", opciones: ["Google Chrome", "Google Drive", "Google Docs", "Gmail"], correcta: 0 },
  { enunciado: "¿Qué es una URL?", explicacion: "El Localizador Uniforme de Recursos: la dirección que identifica de forma única un recurso en Internet.", dificultad: "facil", opciones: ["La dirección que identifica de forma única un recurso en Internet", "Un tipo de virus informático", "Un protocolo exclusivo de correo electrónico", "El nombre técnico de una tarjeta de red"], correcta: 0 },
  { enunciado: "En la URL https://www.boa.aragon.es, ¿qué elemento representa 'https'?", explicacion: "El protocolo utilizado para acceder al recurso.", dificultad: "media", opciones: ["El protocolo", "El dominio", "La ruta del recurso", "El puerto de conexión"], correcta: 0 },
  { enunciado: "¿Qué es un buscador o motor de búsqueda?", explicacion: "Una herramienta que localiza información en Internet a partir de palabras clave, mostrando una lista de resultados relevantes.", dificultad: "facil", opciones: ["Una herramienta que localiza información en Internet a partir de palabras clave", "Un navegador web específico", "Un servicio de correo electrónico", "Un tipo de certificado digital"], correcta: 0 },
  { enunciado: "¿Qué es la Inteligencia Artificial?", explicacion: "La rama de la informática que desarrolla sistemas capaces de realizar tareas que normalmente requieren inteligencia humana.", dificultad: "media", opciones: ["La rama de la informática que desarrolla sistemas con capacidades similares a la inteligencia humana", "Un tipo de hardware especializado exclusivamente en gráficos", "Un protocolo de seguridad para redes wifi", "Un sistema operativo diseñado para servidores"], correcta: 0 },
  { enunciado: "¿Cuál de las siguientes características debería tener una contraseña segura?", explicacion: "Debe combinar mayúsculas, minúsculas, números y símbolos, con longitud suficiente y sin reutilizarse en distintos servicios.", dificultad: "facil", opciones: ["Combinar mayúsculas, minúsculas, números y símbolos, con longitud suficiente", "Ser lo más corta posible para recordarla fácilmente", "Coincidir con el nombre de usuario para simplificar el acceso", "Reutilizarse en todos los servicios para no olvidarla"], correcta: 0 },
  { enunciado: "¿Qué es el phishing?", explicacion: "Una técnica de fraude en la que un atacante se hace pasar por una entidad legítima para engañar al usuario y obtener sus datos personales o credenciales.", dificultad: "media", opciones: ["Una técnica de fraude que suplanta a una entidad legítima para robar datos", "Un tipo de antivirus gratuito", "Un protocolo de cifrado de correo electrónico", "Una técnica de compresión de archivos adjuntos"], correcta: 0 },
]);

console.log(
  "✅ tema-36 creado (4 secciones: hardware-software-almacenamiento, sistemas-operativos-certificados-firma, internet-protocolos-servicios, navegadores-buscadores-ia-seguridad; 40 flashcards + 32 preguntas en total).",
);

// ─────────────────────────────────────────────────────────────────────────
// Asignación a la oposición DGA: numero 16, bloque-6 (Ofimática e informática)
// ─────────────────────────────────────────────────────────────────────────
console.log("🔧 Asignando tema-36 a auxiliar-administrativo-dga (numero 16, bloque-6)...");

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
      numero: 16,
      orden: 16,
      es_premium: false,
      publicado: true,
      secciones_incluidas: [S1, S2, S3, S4],
    },
  ]),
});
if (!asignacionRes.ok) {
  console.error(`❌ Error insertando tema_oposicion: ${asignacionRes.status} ${await asignacionRes.text()}`);
  process.exit(1);
}
const asignado = await asignacionRes.json();
console.log(`   ✓ tema_oposicion insertado: ${JSON.stringify(asignado[0])}`);

console.log("✅ Tema 16 de la DGA (informática básica) dado de alta.");
