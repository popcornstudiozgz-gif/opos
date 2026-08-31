/**
 * Crea tema-66: "Equipos de audio, imagen e informática básica" — Tema 12
 * (numero=12, bloque-2) de Oficial Mantenimiento General (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 10 oficial del Anexo I (bases2110.pdf):
 *   "Aparatos de CD y de ficheros de audio, MP3 o wav, reproducción
 *   inalámbrica bluetooth y equipos HI-FI) y de imagen (equipos
 *   informáticos, proyectores de video, smart TV, formatos de imagen
 *   -JPG, PNG, PDF- formatos de vídeo -mp4, WMV, MOV- y cableado básico
 *   HDMI, DisplayPort)."
 *
 * Conocimiento técnico consolidado sobre equipos y formatos audiovisuales
 * de uso común en equipamientos municipales; no requiere cita legal.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-66-audio-imagen-informatica-basica.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-66";
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
  titulo: "Equipos de audio, imagen e informática básica",
  descripcion: "Aparatos de audio (CD, MP3/WAV, bluetooth, HI-FI) y de imagen (equipos informáticos, proyectores, smart TV), formatos de imagen y vídeo, y cableado básico (HDMI, DisplayPort).",
  contenido: "Desarrolla los equipos y formatos de audio de uso habitual (CD, ficheros MP3/WAV, reproducción inalámbrica bluetooth, equipos HI-FI), los equipos de imagen (equipos informáticos, proyectores de vídeo, smart TV), los formatos de archivo de imagen y vídeo más comunes, y el cableado básico de conexión audiovisual (HDMI, DisplayPort).",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "Equipos de audio: CD, MP3/WAV, bluetooth, HI-FI", seccion: "equipos-audio-cd-mp3-bluetooth-hifi", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Equipos de imagen: informáticos, proyectores, smart TV", seccion: "equipos-imagen-informaticos-proyectores-smarttv", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Formatos de archivo y cableado básico (HDMI, DisplayPort)", seccion: "formatos-archivo-cableado-hdmi-displayport", articulos: "Conceptos fundamentales" },
  ],
}]);

const S1 = "equipos-audio-cd-mp3-bluetooth-hifi";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un CD de audio y cómo almacena el sonido?", reverso: "Un disco compacto que almacena el sonido de forma digital sin compresión (PCM), leído ópticamente por un láser en el reproductor" },
  { anverso: "¿Qué es el formato MP3?", reverso: "Un formato de audio digital comprimido (con pérdida) que reduce mucho el tamaño del archivo eliminando información poco perceptible al oído, a costa de cierta pérdida de calidad" },
  { anverso: "¿Qué es el formato WAV?", reverso: "Un formato de audio digital sin compresión (o con compresión sin pérdida), de mayor calidad y tamaño de archivo que el MP3, habitual en grabación y edición profesional" },
  { anverso: "¿Qué es el bluetooth y para qué se usa en equipos de audio?", reverso: "Una tecnología de comunicación inalámbrica de corto alcance que permite conectar sin cables un dispositivo (móvil, ordenador) a un altavoz o equipo de sonido" },
  { anverso: "¿Qué significa HI-FI (High Fidelity) aplicado a un equipo de sonido?", reverso: "Alta fidelidad: un equipo que reproduce el sonido con la menor distorsión y la mayor fidelidad posible respecto a la grabación original" },
  { anverso: "¿Qué es el 'emparejamiento' (pairing) bluetooth?", reverso: "El proceso de vincular dos dispositivos bluetooth por primera vez, para que puedan reconocerse y conectarse automáticamente en el futuro" },
  { anverso: "¿Qué avería habitual presenta un altavoz bluetooth que 'no empareja'?", reverso: "Puede deberse a que el dispositivo emisor no está en modo de búsqueda, a que el altavoz aún recuerda un emparejamiento anterior (hay que borrarlo), o a que están fuera de alcance" },
  { anverso: "¿Qué es un ecualizador en un equipo de audio?", reverso: "Un control (físico o digital) que permite ajustar el nivel de distintas frecuencias del sonido (graves, medios, agudos) para adaptar la reproducción al gusto o al espacio" },
  { anverso: "¿Qué avería habitual presenta un equipo HI-FI con lector de CD que 'no lee' un disco?", reverso: "Suciedad o rayado en la superficie del disco, o suciedad/desalineación de la lente láser lectora del equipo" },
  { anverso: "¿Qué son los conectores 'jack' de audio (3,5 mm o 6,35 mm) y para qué se usan?", reverso: "Conectores analógicos estándar para auriculares, micrófonos o equipos de sonido, que transmiten la señal de audio por cable" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Cómo almacena el sonido un CD de audio?", explicacion: "De forma digital sin compresión (PCM), leído ópticamente por láser.", dificultad: "media", opciones: ["De forma digital sin compresión, leído por láser", "De forma analógica en una cinta magnética", "Comprimido siempre en formato MP3", "Mediante bluetooth integrado"], correcta: 0 },
  { enunciado: "¿Qué caracteriza al formato MP3?", explicacion: "Es un audio digital comprimido con pérdida, de menor tamaño de archivo.", dificultad: "facil", opciones: ["Es audio digital comprimido con pérdida", "Es audio analógico sin compresión", "Ocupa siempre más que el formato WAV", "Solo funciona con bluetooth"], correcta: 0 },
  { enunciado: "¿Qué diferencia principal hay entre WAV y MP3?", explicacion: "WAV es sin compresión (mayor calidad y tamaño); MP3 es comprimido con pérdida.", dificultad: "media", opciones: ["WAV es sin compresión; MP3 es comprimido con pérdida", "Son exactamente el mismo formato", "MP3 siempre ocupa más que WAV", "WAV no puede reproducirse en HI-FI"], correcta: 0 },
  { enunciado: "¿Qué es el bluetooth aplicado a equipos de audio?", explicacion: "Tecnología de comunicación inalámbrica de corto alcance.", dificultad: "facil", opciones: ["Tecnología de comunicación inalámbrica de corto alcance", "Un formato de compresión de audio", "Un tipo de conector analógico", "Un tipo de disco óptico"], correcta: 0 },
  { enunciado: "¿Qué significa HI-FI en un equipo de sonido?", explicacion: "Alta fidelidad: menor distorsión respecto a la grabación original.", dificultad: "facil", opciones: ["Alta fidelidad", "Alta frecuencia inalámbrica", "Formato de imagen de alta calidad", "Un tipo de cable HDMI"], correcta: 0 },
  { enunciado: "¿Qué es el emparejamiento (pairing) bluetooth?", explicacion: "El proceso de vincular dos dispositivos por primera vez.", dificultad: "media", opciones: ["Vincular dos dispositivos por primera vez", "Ecualizar el sonido de un altavoz", "Comprimir un archivo de audio", "Conectar un cable HDMI"], correcta: 0 },
  { enunciado: "¿Qué puede causar que un altavoz bluetooth no empareje con un móvil?", explicacion: "Que el móvil no esté en modo búsqueda o el altavoz recuerde un emparejamiento anterior.", dificultad: "media", opciones: ["Modo búsqueda no activado o emparejamiento previo guardado", "Que el altavoz tenga cable jack conectado", "Que el CD esté rayado", "Que el ecualizador esté mal ajustado"], correcta: 0 },
  { enunciado: "¿Qué causa habitual provoca que un lector de CD 'no lea' un disco?", explicacion: "Suciedad/rayado del disco o desalineación de la lente láser.", dificultad: "media", opciones: ["Suciedad o rayado del disco, o lente láser sucia", "Un fallo de emparejamiento bluetooth", "Un archivo en formato MP3", "Un conector jack defectuoso"], correcta: 0 },
]);

const S2 = "equipos-imagen-informaticos-proyectores-smarttv";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un proyector de vídeo y qué tecnologías de imagen básicas emplea?", reverso: "Un equipo que proyecta una imagen ampliada sobre una pantalla o pared; las tecnologías más comunes son LCD y DLP" },
  { anverso: "¿Qué avería habitual reduce el brillo o cambia el color de la imagen de un proyector con uso prolongado?", reverso: "El desgaste o agotamiento de la lámpara del proyector, que va perdiendo luminosidad con las horas de uso hasta requerir sustitución" },
  { anverso: "¿Qué es un 'smart TV'?", reverso: "Un televisor con conexión a internet y sistema operativo propio, que permite instalar aplicaciones y acceder a contenido en streaming además de la sintonía habitual" },
  { anverso: "¿Qué diferencia hay entre la resolución HD, Full HD y 4K de una pantalla o proyector?", reverso: "Indican el número de píxeles de la imagen: HD (1280x720), Full HD (1920x1080) y 4K (aproximadamente 3840x2160), aumentando el nivel de detalle en cada salto" },
  { anverso: "¿Qué es la relación de aspecto de una pantalla o proyección?", reverso: "La proporción entre el ancho y el alto de la imagen; la más habitual actualmente es 16:9 (panorámica)" },
  { anverso: "¿Qué elementos básicos componen un equipo informático de sobremesa?", reverso: "La torre o CPU (con placa base, procesador, memoria RAM y almacenamiento), el monitor, el teclado y el ratón" },
  { anverso: "¿Qué avería habitual provoca que un proyector 'no dé imagen' aunque encienda?", reverso: "Un cable de vídeo mal conectado o dañado, o una fuente de entrada (HDMI/VGA) mal seleccionada en el menú del proyector" },
  { anverso: "¿Qué es el enfoque y el keystone (corrección trapezoidal) de un proyector?", reverso: "El enfoque ajusta la nitidez de la imagen; el keystone corrige la deformación trapezoidal que aparece cuando el proyector no está perfectamente perpendicular a la pantalla" },
  { anverso: "¿Qué es un ordenador portátil frente a uno de sobremesa?", reverso: "Un equipo informático integrado en una única carcasa con pantalla, teclado y batería, portable, frente al de sobremesa que separa torre, monitor, teclado y ratón" },
  { anverso: "¿Qué mantenimiento básico preventivo requiere un proyector de vídeo?", reverso: "Limpieza periódica de los filtros de ventilación (evitar sobrecalentamiento) y control de las horas de uso de la lámpara" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué tecnologías básicas de imagen emplea habitualmente un proyector de vídeo?", explicacion: "LCD y DLP.", dificultad: "media", opciones: ["LCD y DLP", "Solo tecnología OLED", "Solo tecnología de plasma", "Solo tecnología CRT"], correcta: 0 },
  { enunciado: "¿Qué causa que un proyector pierda brillo con el uso prolongado?", explicacion: "El desgaste o agotamiento de la lámpara.", dificultad: "media", opciones: ["El desgaste o agotamiento de la lámpara", "Un fallo en el cable HDMI", "La resolución 4K del proyector", "El keystone mal ajustado"], correcta: 0 },
  { enunciado: "¿Qué es un smart TV?", explicacion: "Un televisor con conexión a internet y sistema operativo propio.", dificultad: "facil", opciones: ["Un televisor con conexión a internet y sistema operativo", "Un proyector de alta resolución", "Un tipo de conector de vídeo", "Un formato de compresión de imagen"], correcta: 0 },
  { enunciado: "¿Qué resolución corresponde a Full HD?", explicacion: "1920x1080 píxeles.", dificultad: "media", opciones: ["1920x1080", "1280x720", "3840x2160", "640x480"], correcta: 0 },
  { enunciado: "¿Qué es la relación de aspecto más habitual actualmente en pantallas?", explicacion: "16:9 (panorámica).", dificultad: "facil", opciones: ["16:9", "4:3", "1:1", "21:9"], correcta: 0 },
  { enunciado: "¿Qué causa habitual provoca que un proyector encienda pero no dé imagen?", explicacion: "Cable mal conectado/dañado o fuente de entrada mal seleccionada.", dificultad: "media", opciones: ["Cable mal conectado o fuente de entrada mal seleccionada", "El desgaste de la lámpara", "La resolución del ordenador conectado", "El tamaño de la pantalla de proyección"], correcta: 0 },
  { enunciado: "¿Para qué sirve la corrección keystone de un proyector?", explicacion: "Corrige la deformación trapezoidal de la imagen.", dificultad: "media", opciones: ["Corrige la deformación trapezoidal de la imagen", "Ajusta la nitidez de la imagen", "Cambia la resolución del proyector", "Sustituye a la lámpara"], correcta: 0 },
  { enunciado: "¿Qué mantenimiento preventivo básico requiere un proyector de vídeo?", explicacion: "Limpieza de filtros de ventilación y control de horas de lámpara.", dificultad: "facil", opciones: ["Limpieza de filtros y control de horas de lámpara", "Ninguno, no requiere mantenimiento", "Solo sustitución anual completa", "Solo actualización del sistema operativo"], correcta: 0 },
]);

const S3 = "formatos-archivo-cableado-hdmi-displayport";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es el formato JPG (o JPEG) de imagen?", reverso: "Un formato de imagen digital comprimido con pérdida, muy usado en fotografía por su reducido tamaño de archivo" },
  { anverso: "¿Qué es el formato PNG de imagen?", reverso: "Un formato de imagen sin pérdida de calidad que admite transparencia (canal alfa), habitual en logotipos e imágenes que requieren fondo transparente" },
  { anverso: "¿Qué es el formato PDF y para qué se usa habitualmente?", reverso: "Un formato de documento portátil que conserva el diseño exacto del original (texto, imágenes, maquetación) independientemente del programa o dispositivo con que se abra" },
  { anverso: "¿Qué es el formato de vídeo MP4?", reverso: "Un formato contenedor de vídeo muy extendido, compatible con la mayoría de dispositivos y reproductores, que combina vídeo y audio comprimidos" },
  { anverso: "¿Qué son los formatos de vídeo WMV y MOV?", reverso: "WMV es un formato de vídeo desarrollado por Microsoft; MOV es un formato de vídeo desarrollado por Apple (QuickTime); ambos son alternativas al formato MP4" },
  { anverso: "¿Qué es el cable HDMI y qué transmite?", reverso: "Un cable de conexión digital que transmite simultáneamente vídeo de alta definición y audio por un único cable, muy usado entre ordenadores, proyectores, smart TV y reproductores" },
  { anverso: "¿Qué es el cable DisplayPort y en qué se diferencia principalmente del HDMI en su uso habitual?", reverso: "Un cable de conexión digital de vídeo y audio similar al HDMI, más habitual en el ámbito informático (tarjetas gráficas y monitores de ordenador) que en el audiovisual doméstico" },
  { anverso: "¿Qué avería habitual provoca que una imagen 'parpadee' o desaparezca por un cable HDMI?", reverso: "Un cable HDMI dañado o mal conectado, un conector suelto, o una incompatibilidad de resolución/frecuencia entre el equipo emisor y el receptor" },
  { anverso: "¿Qué es un adaptador o conversor (por ejemplo, VGA a HDMI)?", reverso: "Un dispositivo que permite conectar equipos con tipos de conector distintos, convirtiendo la señal de un estándar a otro" },
  { anverso: "¿Por qué es importante identificar el formato de un archivo antes de reproducirlo o proyectarlo en un equipo público?", reverso: "Porque no todos los reproductores o proyectores son compatibles con todos los formatos, y un formato no soportado puede impedir la reproducción durante un acto o actividad" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué caracteriza al formato JPG de imagen?", explicacion: "Es un formato comprimido con pérdida, muy usado en fotografía.", dificultad: "facil", opciones: ["Formato comprimido con pérdida", "Formato sin pérdida con transparencia", "Formato de vídeo contenedor", "Formato de documento portátil"], correcta: 0 },
  { enunciado: "¿Qué característica distintiva tiene el formato PNG frente al JPG?", explicacion: "Admite transparencia (canal alfa) y no tiene pérdida de calidad.", dificultad: "media", opciones: ["Admite transparencia y no pierde calidad", "Ocupa siempre menos que el JPG", "Es un formato de vídeo, no de imagen", "No puede abrirse en ningún visor de imágenes"], correcta: 0 },
  { enunciado: "¿Qué es el formato PDF?", explicacion: "Un formato de documento portátil que conserva el diseño original.", dificultad: "facil", opciones: ["Un formato de documento portátil que conserva el diseño", "Un formato de vídeo comprimido", "Un tipo de cable de conexión", "Un formato de audio sin compresión"], correcta: 0 },
  { enunciado: "¿Qué es el formato de vídeo MP4?", explicacion: "Un formato contenedor de vídeo muy extendido y compatible.", dificultad: "facil", opciones: ["Un formato contenedor de vídeo muy compatible", "Un formato de imagen sin pérdida", "Un tipo de conector digital", "Un formato exclusivo de Apple"], correcta: 0 },
  { enunciado: "¿Qué transmite un cable HDMI?", explicacion: "Vídeo de alta definición y audio simultáneamente por un único cable.", dificultad: "facil", opciones: ["Vídeo y audio simultáneamente", "Solo señal de vídeo, sin audio", "Solo señal de audio, sin vídeo", "Solo datos de red"], correcta: 0 },
  { enunciado: "¿En qué ámbito es más habitual el cable DisplayPort frente al HDMI?", explicacion: "En el ámbito informático (tarjetas gráficas y monitores).", dificultad: "media", opciones: ["En el ámbito informático (gráficas y monitores)", "En equipos de audio HI-FI exclusivamente", "En cámaras de fotografía únicamente", "En impresoras de documentos"], correcta: 0 },
  { enunciado: "¿Qué puede provocar que una imagen parpadee o desaparezca por HDMI?", explicacion: "Cable dañado, conector suelto o incompatibilidad de resolución/frecuencia.", dificultad: "media", opciones: ["Cable dañado o incompatibilidad de resolución", "El formato PNG del archivo mostrado", "El uso de bluetooth en el equipo", "El tamaño del archivo PDF"], correcta: 0 },
  { enunciado: "¿Para qué se usa un adaptador VGA a HDMI?", explicacion: "Para conectar equipos con tipos de conector distintos.", dificultad: "media", opciones: ["Para conectar equipos con conectores distintos", "Para comprimir un archivo de vídeo", "Para emparejar un altavoz bluetooth", "Para ajustar el keystone de un proyector"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 12 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 12, orden: 12, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-66 creado y vinculado como Tema 12 de Oficial Mantenimiento General.");
