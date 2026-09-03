/**
 * Glosario de Oficial Pintor, Especialidad Gráfica (Ayto. Zaragoza):
 * selección curada de 32 términos (2 por tema) para los 16 temas de la
 * parte específica (tema-251 a tema-266), con la misma `seccion` que
 * las flashcards/preguntas ya sembradas de cada tema.
 *
 * Uso: node --env-file=.env.local scripts/seed-glosario-oficial-pintor-grafica.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

async function insertar(tabla, filas) {
  const res = await fetch(`${URL_BASE}/rest/v1/${tabla}`, { method: "POST", headers: { ...HEADERS, Prefer: "return=representation" }, body: JSON.stringify(filas) });
  if (!res.ok) { console.error(`❌ Error en ${tabla}: ${res.status} ${await res.text()}`); process.exit(1); }
  return res.json();
}

const TERMINOS = [
  // tema-251 — Taller de rotulación
  { tema_slug: "tema-251", seccion: "instalaciones-taller-rotulacion", termino: "Plotter de corte", definicion: "Máquina que corta con una cuchilla de precisión el contorno de un diseño vectorial sobre un material flexible, como el vinilo, siguiendo la trayectoria enviada desde el software de diseño." },
  { tema_slug: "tema-251", seccion: "materiales-taller-almacenamiento-productos-quimicos", termino: "Prensa de transferencia térmica", definicion: "Máquina que aplica calor y presión sobre un material (por ejemplo, un vinilo textil) para fijarlo de forma permanente sobre una prenda u otro soporte." },
  // tema-252 — Herramientas de posimpresión
  { tema_slug: "tema-252", seccion: "herramientas-manuales-manipulacion-corte", termino: "Cutter de precisión", definicion: "Herramienta manual de corte con hoja intercambiable, empleada para recortar con exactitud vinilos, láminas o cartones que no pueden procesarse en el plotter de corte." },
  { tema_slug: "tema-252", seccion: "laminadoras-funcion-mantenimiento-basico", termino: "Rasqueta o espátula de aplicación", definicion: "Herramienta plana empleada para eliminar burbujas de aire y asegurar una buena adherencia al aplicar un vinilo adhesivo o una lámina sobre un soporte." },
  // tema-253 — Materiales de rotulación
  { tema_slug: "tema-253", seccion: "vinilo-corte-usos", termino: "Vinilo de corte", definicion: "Lámina de PVC monomérico o polimérico, disponible en color sólido, que se recorta con un plotter de corte para formar letras o formas destinadas a rotulación." },
  { tema_slug: "tema-253", seccion: "laminados-proteccion-tipos-usos", termino: "Vinilo reflectante", definicion: "Material recubierto de microesferas de vidrio o prismas que devuelven la luz hacia su origen, empleado en señalización que debe ser visible de noche con luz de faros." },
  // tema-254 — Materiales flexibles y rígidos
  { tema_slug: "tema-254", seccion: "materiales-flexibles-lona-poliester", termino: "Lona PVC (Frontlit/Backlit)", definicion: "Material textil recubierto de PVC empleado en grandes formatos publicitarios; la lona Backlit permite retroiluminación, la Frontlit se ilumina desde el exterior." },
  { tema_slug: "tema-254", seccion: "materiales-rigidos-impresion", termino: "Panel Dibond", definicion: "Material compuesto formado por dos láminas de aluminio con un núcleo de polietileno, ligero y rígido, muy empleado en cartelería exterior de larga duración." },
  // tema-255 — Soportes y limpieza antigraffiti
  { tema_slug: "tema-255", seccion: "productos-limpieza-soportes", termino: "Desengrasante", definicion: "Producto químico empleado para eliminar grasa, polvo o restos previos de la superficie de un soporte antes de aplicar un vinilo o una pintura, garantizando una buena adherencia." },
  { tema_slug: "tema-255", seccion: "productos-proteccion-antigraffiti", termino: "Barniz antigraffiti", definicion: "Recubrimiento protector aplicado sobre una superficie que facilita la posterior eliminación de pintadas o graffitis sin dañar el soporte original." },
  // tema-256 — Empapelado y montaje de exposiciones
  { tema_slug: "tema-256", seccion: "tipos-papel-pintado-materiales-grafica", termino: "Vinilo mural o de decoración", definicion: "Lámina adhesiva de gran formato, imprimible o de color liso, destinada a recubrir una pared o superficie interior con fines decorativos o informativos." },
  { tema_slug: "tema-256", seccion: "interpretacion-planos-montaje-exposiciones", termino: "Cartela museográfica", definicion: "Panel informativo de pequeño o mediano formato, colocado junto a una pieza expuesta, que recoge su título, autoría y datos técnicos relevantes." },
  // tema-257 — Andamios, escaleras, plataformas
  { tema_slug: "tema-257", seccion: "andamios-condiciones-grafica", termino: "Andamio tubular", definicion: "Estructura modular metálica montada por elementos tubulares y sistemas de unión normalizados, empleada como plataforma de trabajo temporal en altura." },
  { tema_slug: "tema-257", seccion: "pemp-aplicadas-rotulacion", termino: "Plataforma elevadora móvil de personal (PEMP)", definicion: "Equipo de trabajo autopropulsado o remolcado que eleva a uno o varios trabajadores hasta una posición de trabajo en altura, regulado específicamente por su propia normativa de utilización." },
  // tema-258 — Principios de artes gráficas
  { tema_slug: "tema-258", seccion: "fases-produccion-grafica", termino: "Preimpresión", definicion: "Conjunto de procesos previos a la impresión (maquetación, tratamiento de color, generación del archivo final) necesarios para preparar un diseño antes de su reproducción." },
  { tema_slug: "tema-258", seccion: "procesos-impresion-digital", termino: "Impresión digital", definicion: "Técnica de impresión que transfiere la imagen directamente desde un archivo digital al soporte, sin necesidad de planchas u otros elementos físicos intermedios propios de la impresión offset." },
  // tema-259 — Sistemas de color e impresión digital
  { tema_slug: "tema-259", seccion: "sistemas-color-rgb-cmyk-perfiles-icc", termino: "Perfil ICC", definicion: "Archivo que describe cómo un dispositivo concreto (pantalla, impresora) reproduce el color, empleado para mantener la coherencia cromática entre lo visto en pantalla y lo impreso." },
  { tema_slug: "tema-259", seccion: "sistemas-impresion-tintas-ecosolventes", termino: "Tinta ecosolvente", definicion: "Tipo de tinta empleada en impresión digital de gran formato, con menor contenido de disolventes agresivos que las tintas solventes tradicionales, reduciendo su impacto ambiental y su toxicidad." },
  // tema-260 — Señalética
  { tema_slug: "tema-260", seccion: "senalizacion-seguridad-salud-trabajo", termino: "Pictograma", definicion: "Signo gráfico simplificado que representa un objeto, una acción o un concepto de forma universalmente comprensible, sin depender del idioma del observador." },
  { tema_slug: "tema-260", seccion: "accesibilidad-senaletica-administraciones-publicas", termino: "Señalética en braille", definicion: "Sistema de rotulación táctil basado en el alfabeto braille, incorporado en la señalética de un edificio o espacio público para garantizar su accesibilidad a personas con discapacidad visual." },
  // tema-261 — Identidad corporativa Zaragoza
  { tema_slug: "tema-261", seccion: "estructura-manual-identidad-corporativa", termino: "Manual de identidad corporativa", definicion: "Documento que recoge las normas de uso de la marca de una organización: logotipo, colores, tipografías y sus aplicaciones autorizadas en distintos soportes." },
  { tema_slug: "tema-261", seccion: "aplicacion-rotulos-directorios-carteleria", termino: "Directorio institucional", definicion: "Elemento de señalética que indica la ubicación de las distintas dependencias o servicios de un edificio administrativo, siguiendo criterios homogéneos de identidad visual." },
  // tema-262 — CorelDRAW
  { tema_slug: "tema-262", seccion: "herramientas-basicas-coreldraw", termino: "Nodo", definicion: "Punto de anclaje de un trazado vectorial que define su forma; al desplazar, añadir o eliminar nodos con la herramienta de forma se modifica la geometría de la curva." },
  { tema_slug: "tema-262", seccion: "paletas-color-terminologia-coreldraw", termino: "Curvas (convertir texto en curvas)", definicion: "Operación que transforma un texto tipográfico en trazados vectoriales editables, independientes de la fuente original, garantizando su correcta visualización en cualquier equipo." },
  // tema-263 — Roland VersaWorks
  { tema_slug: "tema-263", seccion: "menus-opciones-versaworks", termino: "RIP (Raster Image Processor)", definicion: "Software o dispositivo que traduce un archivo de diseño al lenguaje que una impresora de gran formato puede interpretar directamente para su reproducción." },
  { tema_slug: "tema-263", seccion: "variables-trabajo-versaworks", termino: "Tiling (mosaico)", definicion: "División automática de una imagen que excede el ancho máximo del soporte o de la impresora en varias secciones independientes que se ensamblan tras su impresión." },
  // tema-264 — Tipos de ficheros gráficos
  { tema_slug: "tema-264", seccion: "vectoriales-mapa-bits", termino: "Formato raster (mapa de bits)", definicion: "Tipo de fichero gráfico formado por una cuadrícula fija de píxeles, que pierde nitidez al ampliarse por encima de su resolución original, a diferencia de un formato vectorial." },
  { tema_slug: "tema-264", seccion: "formato-pdf-intercambio", termino: "Fuente incrustada (embebida)", definicion: "Fuente tipográfica que queda integrada dentro del propio fichero (por ejemplo, un PDF), garantizando que el texto se visualice correctamente aunque el destinatario no la tenga instalada." },
  // tema-265 — Fuentes tipográficas
  { tema_slug: "tema-265", seccion: "clasificacion-familias-tipograficas", termino: "Serifa", definicion: "Pequeño remate o trazo terminal en los extremos de los caracteres de una tipografía, característico de las familias tipográficas clásicas denominadas serif." },
  { tema_slug: "tema-265", seccion: "normativa-proteccion-tipografias", termino: "Licencia de fuente tipográfica", definicion: "Condiciones legales bajo las que el diseñador o distribuidor de una fuente autoriza su uso (personal, comercial o institucional), cuyo incumplimiento puede constituir una infracción de sus derechos." },
  // tema-266 — PRL obras de construcción
  { tema_slug: "tema-266", seccion: "ley-prl-rd-1627-1997-rotulacion", termino: "Libro de Incidencias", definicion: "Libro con hojas por duplicado custodiado en la obra donde se anota cualquier incumplimiento de las medidas de seguridad previstas, con obligación de notificarlo a la Inspección de Trabajo en 24 horas." },
  { tema_slug: "tema-266", seccion: "trabajos-altura-lineas-vida-rotulos", termino: "Línea de vida", definicion: "Dispositivo, fijo o temporal, anclado a puntos resistentes de la estructura, al que el trabajador conecta su arnés mediante un dispositivo anticaídas deslizante durante un trabajo en altura." },
];

console.log(`📚 Insertando glosario de Oficial Pintor Gráfica (${TERMINOS.length} términos)...`);
const insertados = await insertar("glosario", TERMINOS);
console.log(`✅ ${insertados.length} términos de glosario insertados.`);
