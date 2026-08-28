/**
 * Crea el tema canónico tema-37: "Introducción al sistema operativo:
 * el entorno Windows" y lo asigna como Tema 17 de la oposición
 * Auxiliar Administrativo DGA (bloque-6, Ofimática e informática).
 *
 * Texto oficial del ítem 17, proporcionado directamente por el usuario:
 *   "Introducción al sistema operativo: el entorno Windows.
 *   Fundamentos. La interfaz de Windows: ventanas, iconos, menús
 *   contextuales, cuadros de diálogos. El menú Inicio. Cortana. La
 *   barra de tareas. El área de Notificación. El explorador de
 *   Windows. Operaciones de búsqueda. Herramientas 'Este equipo' y
 *   'Acceso rápido'. Panel de control. Accesorios. Herramientas del
 *   sistema."
 *
 * Contenido técnico/práctico sobre el sistema operativo Microsoft
 * Windows (interfaz común a las versiones 10/11 salvo notas puntuales),
 * sin necesidad de verificación contra el BOE.
 *
 * Tres secciones:
 * 1. interfaz-windows-fundamentos — fundamentos del entorno Windows,
 *    ventanas, iconos, menús contextuales, cuadros de diálogo, menú
 *    Inicio, Cortana, barra de tareas y área de notificación.
 * 2. explorador-windows-busquedas — el Explorador de Windows,
 *    operaciones de búsqueda, "Este equipo" y "Acceso rápido".
 * 3. panel-control-accesorios-herramientas — Panel de control,
 *    Accesorios y Herramientas del sistema.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-windows-dga.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!URL_BASE || !SERVICE_KEY) {
  console.error("❌ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-37";

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
console.log("📚 Creando tema-37...");
await insertar("temas", [
  {
    slug: TEMA,
    titulo: "Introducción al sistema operativo: el entorno Windows",
    descripcion:
      "Fundamentos del entorno Windows. La interfaz de Windows: ventanas, iconos, menús contextuales, cuadros de diálogo. El menú Inicio. Cortana. La barra de tareas. El área de notificación. El Explorador de Windows. Operaciones de búsqueda. Herramientas 'Este equipo' y 'Acceso rápido'. Panel de control. Accesorios. Herramientas del sistema.",
    contenido:
      "Introduce el manejo básico del sistema operativo Microsoft Windows, necesario para el trabajo administrativo diario: los elementos de su interfaz gráfica (ventanas, iconos, menús contextuales, cuadros de diálogo), el menú Inicio y la barra de tareas, el Explorador de Windows y sus herramientas de navegación y búsqueda de archivos, así como el Panel de control, los Accesorios y las Herramientas del sistema.",
    enlaces_boe: [],
    indice_estudio: [
      {
        url: "",
        titulo: "Fundamentos e interfaz de Windows: ventanas, menú Inicio, barra de tareas",
        seccion: "interfaz-windows-fundamentos",
        articulos: "Conceptos fundamentales",
      },
      {
        url: "",
        titulo: "El Explorador de Windows y las operaciones de búsqueda",
        seccion: "explorador-windows-busquedas",
        articulos: "Conceptos fundamentales",
      },
      {
        url: "",
        titulo: "Panel de control, Accesorios y Herramientas del sistema",
        seccion: "panel-control-accesorios-herramientas",
        articulos: "Conceptos fundamentales",
      },
    ],
  },
]);

// ─────────────────────────────────────────────────────────────────────────
// Sección 1: interfaz-windows-fundamentos
// ─────────────────────────────────────────────────────────────────────────
const S1 = "interfaz-windows-fundamentos";
console.log(`📝 flashcards (${S1})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Qué es Windows?", reverso: "El sistema operativo desarrollado por Microsoft que gestiona los recursos del ordenador y proporciona una interfaz gráfica de usuario basada en ventanas, iconos y menús para interactuar con el equipo" },
    { anverso: "¿Qué es una ventana en el entorno Windows?", reverso: "El área rectangular en la que se muestra el contenido de un programa o carpeta, que puede moverse, redimensionarse, minimizarse, maximizarse o cerrarse mediante los botones de su esquina superior derecha" },
    { anverso: "¿Qué es un icono?", reverso: "Un pequeño símbolo o imagen que representa un archivo, carpeta, programa o acceso directo, y que se activa haciendo doble clic sobre él" },
    { anverso: "¿Qué es un menú contextual y cómo se abre?", reverso: "Un menú que muestra las opciones disponibles según el elemento seleccionado; se abre haciendo clic con el botón derecho del ratón sobre ese elemento" },
    { anverso: "¿Qué es un cuadro de diálogo?", reverso: "Una ventana secundaria que solicita información al usuario o le ofrece opciones para completar una acción (por ejemplo, un cuadro de diálogo para guardar un archivo, pidiendo nombre y ubicación)" },
    { anverso: "¿Qué es el menú Inicio en Windows?", reverso: "El punto de acceso principal a los programas instalados, la configuración del sistema, los documentos recientes y las opciones de apagado o reinicio del equipo" },
    { anverso: "¿Qué era Cortana en Windows?", reverso: "El asistente virtual con reconocimiento de voz integrado en Windows que permitía realizar búsquedas, gestionar recordatorios y ejecutar tareas mediante comandos de voz o texto" },
    { anverso: "¿Qué es la barra de tareas en Windows?", reverso: "La barra situada habitualmente en la parte inferior de la pantalla que muestra el botón de Inicio, los programas anclados y en ejecución, y el área de notificación" },
    { anverso: "¿Qué es el área de notificación (bandeja del sistema)?", reverso: "La zona de la barra de tareas, situada junto al reloj, donde se muestran iconos de programas en segundo plano y notificaciones del sistema (batería, conexión de red, volumen, etc.)" },
    { anverso: "¿Qué combinación de teclas abre habitualmente el menú Inicio en Windows?", reverso: "La tecla Windows (⊞), sola o combinada con otras teclas para acceder a funciones adicionales" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })),
);

console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es Windows?", explicacion: "El sistema operativo de Microsoft que gestiona los recursos del ordenador y proporciona una interfaz gráfica basada en ventanas.", dificultad: "facil", opciones: ["El sistema operativo de Microsoft con interfaz gráfica basada en ventanas", "Un procesador de textos de Microsoft Office", "Un navegador web desarrollado por Google", "Un tipo de memoria de almacenamiento externo"], correcta: 0 },
  { enunciado: "¿Cómo se abre habitualmente un menú contextual en Windows?", explicacion: "Haciendo clic con el botón derecho del ratón sobre el elemento.", dificultad: "facil", opciones: ["Con el botón derecho del ratón sobre el elemento", "Con doble clic del botón izquierdo", "Pulsando la tecla Escape", "Arrastrando el elemento a la papelera"], correcta: 0 },
  { enunciado: "¿Qué es un cuadro de diálogo en Windows?", explicacion: "Una ventana secundaria que solicita información al usuario o le ofrece opciones para completar una acción.", dificultad: "media", opciones: ["Una ventana secundaria que solicita información u ofrece opciones al usuario", "Un tipo de icono del escritorio", "El nombre técnico del menú Inicio", "Un archivo de configuración del sistema"], correcta: 0 },
  { enunciado: "¿Qué permite hacer el menú Inicio de Windows?", explicacion: "Acceder a los programas instalados, la configuración del sistema, documentos recientes y las opciones de apagado/reinicio.", dificultad: "facil", opciones: ["Acceder a programas, configuración, documentos recientes y opciones de apagado", "Editar exclusivamente documentos de texto", "Configurar únicamente la conexión de red", "Ver solo la papelera de reciclaje"], correcta: 0 },
  { enunciado: "¿Qué función cumplía Cortana en Windows?", explicacion: "Era el asistente virtual con reconocimiento de voz que permitía realizar búsquedas y ejecutar tareas mediante comandos de voz o texto.", dificultad: "media", opciones: ["Era el asistente virtual con reconocimiento de voz de Windows", "Era el antivirus integrado por defecto en Windows", "Era el nombre del Explorador de archivos", "Era una versión anterior del Panel de control"], correcta: 0 },
  { enunciado: "¿Qué se muestra habitualmente en la barra de tareas de Windows?", explicacion: "El botón de Inicio, los programas anclados y en ejecución, y el área de notificación.", dificultad: "facil", opciones: ["El botón de Inicio, programas en ejecución y el área de notificación", "Únicamente el reloj del sistema", "Solo los accesos directos del escritorio", "Exclusivamente la papelera de reciclaje"], correcta: 0 },
  { enunciado: "¿Qué tipo de información suele mostrarse en el área de notificación de Windows?", explicacion: "Iconos de programas en segundo plano y notificaciones del sistema, como batería, red o volumen.", dificultad: "media", opciones: ["Iconos de programas en segundo plano y notificaciones del sistema", "El listado completo de archivos del disco duro", "Los documentos abiertos recientemente en Word", "El historial de navegación del navegador web"], correcta: 0 },
  { enunciado: "¿Qué tecla del teclado abre habitualmente el menú Inicio de Windows?", explicacion: "La tecla Windows (⊞).", dificultad: "facil", opciones: ["La tecla Windows (⊞)", "La tecla Tabulador", "La tecla Suprimir", "La tecla Bloq Mayús"], correcta: 0 },
]);

// ─────────────────────────────────────────────────────────────────────────
// Sección 2: explorador-windows-busquedas
// ─────────────────────────────────────────────────────────────────────────
const S2 = "explorador-windows-busquedas";
console.log(`📝 flashcards (${S2})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Qué es el Explorador de Windows?", reverso: "La aplicación integrada en Windows que permite navegar, organizar y gestionar los archivos y carpetas almacenados en el equipo y en las unidades conectadas" },
    { anverso: "¿Qué combinación de teclas abre habitualmente el Explorador de Windows?", reverso: "La tecla Windows (⊞) + E" },
    { anverso: "¿Qué es 'Este equipo' en el Explorador de Windows?", reverso: "La vista que muestra las unidades de disco, las unidades extraíbles y las carpetas principales del usuario (Documentos, Imágenes, Descargas, etc.) conectadas al equipo" },
    { anverso: "¿Qué es 'Acceso rápido' en el Explorador de Windows?", reverso: "La sección que muestra las carpetas usadas con más frecuencia y los archivos abiertos recientemente, para acceder a ellos de forma más ágil" },
    { anverso: "¿Cómo se anclan carpetas a 'Acceso rápido'?", reverso: "Haciendo clic derecho sobre la carpeta deseada y seleccionando la opción 'Anclar a acceso rápido' en el menú contextual" },
    { anverso: "¿Dónde se realiza habitualmente una búsqueda de archivos dentro del Explorador de Windows?", reverso: "En el cuadro de búsqueda situado en la parte superior de la ventana del Explorador, que busca por nombre y contenido dentro de la carpeta o unidad seleccionada" },
    { anverso: "¿Qué son los operadores de búsqueda avanzada en el Explorador de Windows?", reverso: "Filtros como tipo de archivo, fecha de modificación o tamaño, que permiten acotar los resultados de una búsqueda dentro del Explorador" },
    { anverso: "¿Qué es el panel de navegación del Explorador de Windows?", reverso: "El panel lateral izquierdo que muestra la estructura jerárquica de Acceso rápido, Este equipo, la Red y otras ubicaciones, facilitando el desplazamiento entre carpetas" },
    { anverso: "¿Cómo se cambia la forma de visualizar los archivos (iconos grandes, lista, detalles) en el Explorador de Windows?", reverso: "Desde la pestaña o menú 'Vista', donde se puede elegir entre distintos modos de presentación de archivos y carpetas" },
    { anverso: "¿Qué permite hacer la opción 'Ordenar por' en el Explorador de Windows?", reverso: "Organizar los archivos mostrados en una carpeta según criterios como nombre, fecha de modificación, tipo o tamaño" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })),
);

console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es el Explorador de Windows?", explicacion: "La aplicación integrada que permite navegar, organizar y gestionar archivos y carpetas.", dificultad: "facil", opciones: ["La aplicación que permite navegar y gestionar archivos y carpetas", "El navegador de Internet incorporado en Windows", "El asistente de voz del sistema", "El programa de correo electrónico predeterminado"], correcta: 0 },
  { enunciado: "¿Qué combinación de teclas abre el Explorador de Windows directamente?", explicacion: "Tecla Windows + E.", dificultad: "media", opciones: ["Windows + E", "Ctrl + E", "Alt + E", "Windows + Tab"], correcta: 0 },
  { enunciado: "¿Qué muestra la vista 'Este equipo' del Explorador de Windows?", explicacion: "Las unidades de disco, unidades extraíbles y las carpetas principales del usuario.", dificultad: "facil", opciones: ["Las unidades de disco y las carpetas principales del usuario", "Únicamente los programas instalados", "Solo el historial de navegación reciente", "Exclusivamente los archivos temporales del sistema"], correcta: 0 },
  { enunciado: "¿Qué es 'Acceso rápido' en el Explorador de Windows?", explicacion: "La sección que muestra las carpetas usadas con más frecuencia y los archivos abiertos recientemente.", dificultad: "media", opciones: ["Carpetas usadas con frecuencia y archivos recientes", "La papelera de reciclaje del sistema", "El listado de programas instalados", "El panel de control del sistema"], correcta: 0 },
  { enunciado: "¿Cómo se ancla una carpeta a 'Acceso rápido' en el Explorador de Windows?", explicacion: "Haciendo clic derecho sobre la carpeta y seleccionando 'Anclar a acceso rápido' en el menú contextual.", dificultad: "media", opciones: ["Clic derecho sobre la carpeta y 'Anclar a acceso rápido'", "Arrastrándola directamente a la papelera", "Cambiándole el nombre a 'Acceso rápido'", "No es posible anclar carpetas a Acceso rápido"], correcta: 0 },
  { enunciado: "¿Dónde se realiza una búsqueda de archivos dentro de una carpeta en el Explorador de Windows?", explicacion: "En el cuadro de búsqueda situado en la parte superior de la ventana del Explorador.", dificultad: "facil", opciones: ["En el cuadro de búsqueda de la parte superior de la ventana", "Únicamente desde el menú Inicio", "Exclusivamente desde el Panel de control", "Solo es posible mediante línea de comandos"], correcta: 0 },
  { enunciado: "¿Qué muestra el panel de navegación del Explorador de Windows?", explicacion: "La estructura jerárquica de Acceso rápido, Este equipo, la Red y otras ubicaciones.", dificultad: "media", opciones: ["La estructura jerárquica de Acceso rápido, Este equipo y la Red", "Únicamente los archivos recién eliminados", "Solo las aplicaciones abiertas en ese momento", "El historial de impresión de documentos"], correcta: 0 },
  { enunciado: "¿Desde dónde se cambia el modo de visualización de archivos (iconos grandes, lista, detalles) en el Explorador de Windows?", explicacion: "Desde la pestaña o menú 'Vista'.", dificultad: "media", opciones: ["Desde la pestaña o menú 'Vista'", "Desde el Panel de control exclusivamente", "No es posible cambiar la vista de los archivos", "Solo mediante la configuración del monitor"], correcta: 0 },
]);

// ─────────────────────────────────────────────────────────────────────────
// Sección 3: panel-control-accesorios-herramientas
// ─────────────────────────────────────────────────────────────────────────
const S3 = "panel-control-accesorios-herramientas";
console.log(`📝 flashcards (${S3})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Qué es el Panel de control de Windows?", reverso: "La utilidad clásica de Windows que permite ver y configurar los ajustes del sistema: cuentas de usuario, dispositivos e impresoras, redes, programas instalados, opciones de accesibilidad, etc." },
    { anverso: "¿Qué es la aplicación 'Configuración' de Windows y en qué se relaciona con el Panel de control?", reverso: "Es la aplicación moderna de ajustes de Windows, con una interfaz más simplificada, que progresivamente ha ido asumiendo funciones que antes solo estaban en el Panel de control clásico" },
    { anverso: "¿Desde dónde se pueden agregar o quitar programas instalados en Windows?", reverso: "Desde el Panel de control, en 'Programas y características' (o desde la app 'Configuración', en 'Aplicaciones')" },
    { anverso: "¿Qué son los 'Accesorios' de Windows? Cita dos ejemplos", reverso: "Un conjunto de aplicaciones básicas incluidas de serie en Windows para tareas sencillas; ejemplos: Bloc de notas, Paint, Calculadora" },
    { anverso: "¿Para qué sirve el Bloc de notas de Windows?", reverso: "Es un editor de texto sin formato, útil para escribir o consultar archivos de texto plano de forma rápida y ligera" },
    { anverso: "¿Qué es la Calculadora de Windows?", reverso: "Una aplicación accesoria que permite realizar cálculos matemáticos básicos y, según el modo seleccionado, también científicos, de conversión de unidades o de programación" },
    { anverso: "¿Qué son las 'Herramientas del sistema' de Windows? Cita un ejemplo", reverso: "Un conjunto de utilidades para el mantenimiento y la administración del equipo; ejemplos: el Liberador de espacio en disco, el Desfragmentador y el Administrador de tareas" },
    { anverso: "¿Qué es el Administrador de tareas de Windows y cómo se abre habitualmente?", reverso: "La herramienta que muestra los programas y procesos en ejecución, su consumo de recursos, y permite finalizar aplicaciones que no responden; se abre habitualmente con Ctrl+Alt+Supr o Ctrl+Mayús+Esc" },
    { anverso: "¿Para qué sirve el Liberador de espacio en disco?", reverso: "Para localizar y eliminar archivos temporales, la papelera de reciclaje y otros archivos innecesarios, liberando espacio de almacenamiento en el disco" },
    { anverso: "¿Qué es la Restauración del sistema en Windows?", reverso: "Una herramienta que permite devolver el sistema a un estado anterior (un 'punto de restauración') en caso de fallos, sin afectar a los archivos personales del usuario" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })),
);

console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es el Panel de control de Windows?", explicacion: "La utilidad clásica que permite ver y configurar los ajustes del sistema: cuentas de usuario, dispositivos, redes, programas, etc.", dificultad: "facil", opciones: ["La utilidad que permite ver y configurar los ajustes del sistema", "Un accesorio para redactar textos sin formato", "Un antivirus incluido por defecto en Windows", "Un servicio de almacenamiento en la nube"], correcta: 0 },
  { enunciado: "¿Desde dónde puede desinstalarse un programa instalado en Windows?", explicacion: "Desde el Panel de control, en 'Programas y características' (o desde 'Configuración', en 'Aplicaciones').", dificultad: "media", opciones: ["Desde 'Programas y características' del Panel de control", "Solo eliminando manualmente sus archivos de la carpeta del sistema", "Desde el Explorador de Windows, en la papelera de reciclaje", "No es posible desinstalar programas en Windows"], correcta: 0 },
  { enunciado: "¿Cuál de las siguientes es una aplicación clasificada como 'Accesorio' de Windows?", explicacion: "El Bloc de notas es un accesorio de Windows para edición de texto sin formato.", dificultad: "facil", opciones: ["Bloc de notas", "Panel de control", "Explorador de Windows", "Administrador de tareas"], correcta: 0 },
  { enunciado: "¿Qué tipo de archivos edita el Bloc de notas de Windows?", explicacion: "Archivos de texto plano, sin formato.", dificultad: "media", opciones: ["Archivos de texto plano, sin formato", "Documentos con formato avanzado y tablas", "Hojas de cálculo con fórmulas", "Presentaciones con diapositivas"], correcta: 0 },
  { enunciado: "¿Cuál de las siguientes se considera una 'Herramienta del sistema' de Windows?", explicacion: "El Administrador de tareas es una herramienta del sistema para gestionar procesos y recursos.", dificultad: "media", opciones: ["El Administrador de tareas", "La Calculadora", "El Bloc de notas", "Paint"], correcta: 0 },
  { enunciado: "¿Qué combinación de teclas permite abrir habitualmente el Administrador de tareas de Windows?", explicacion: "Ctrl+Mayús+Esc (también accesible vía Ctrl+Alt+Supr).", dificultad: "media", opciones: ["Ctrl+Mayús+Esc", "Alt+F4", "Windows+E", "Ctrl+Z"], correcta: 0 },
  { enunciado: "¿Para qué sirve el Liberador de espacio en disco de Windows?", explicacion: "Para localizar y eliminar archivos temporales y otros archivos innecesarios, liberando espacio de almacenamiento.", dificultad: "media", opciones: ["Para eliminar archivos temporales y liberar espacio de disco", "Para instalar nuevos programas automáticamente", "Para configurar la conexión de red inalámbrica", "Para cambiar el idioma del sistema operativo"], correcta: 0 },
  { enunciado: "¿Qué permite hacer la Restauración del sistema en Windows?", explicacion: "Devolver el sistema a un estado anterior (punto de restauración) en caso de fallos, sin afectar a los archivos personales.", dificultad: "media", opciones: ["Devolver el sistema a un estado anterior sin afectar a los archivos personales", "Eliminar de forma permanente todos los datos del disco duro", "Reinstalar el sistema operativo desde cero obligatoriamente", "Cambiar la contraseña de todos los usuarios del equipo"], correcta: 0 },
]);

console.log(
  "✅ tema-37 creado (3 secciones: interfaz-windows-fundamentos, explorador-windows-busquedas, panel-control-accesorios-herramientas; 30 flashcards + 24 preguntas en total).",
);

// ─────────────────────────────────────────────────────────────────────────
// Asignación a la oposición DGA: numero 17, bloque-6 (Ofimática e informática)
// ─────────────────────────────────────────────────────────────────────────
console.log("🔧 Asignando tema-37 a auxiliar-administrativo-dga (numero 17, bloque-6)...");

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
      numero: 17,
      orden: 17,
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

console.log("✅ Tema 17 de la DGA (entorno Windows) dado de alta.");
