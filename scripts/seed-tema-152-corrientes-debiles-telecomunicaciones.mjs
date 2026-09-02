/**
 * Crea tema-152: "Instalaciones de corrientes débiles y
 * telecomunicaciones" — Tema 20 (numero=20, bloque-2) de Oficial
 * Electricista (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 18 oficial del Anexo I (bases2110.pdf, línea 1367):
 *   "Instalaciones de Corrientes Débiles y Telecomunicaciones. Sistemas
 *   de portero y videoportero automáticos. Redes de datos y cableado
 *   estructurado. Sistemas de detección de incendios y alarmas."
 *
 * Fuentes primarias verificadas en esta sesión (WebSearch sobre boe.es):
 * - Real Decreto 346/2011, de 11 de marzo, Reglamento regulador de las
 *   infraestructuras comunes de telecomunicaciones (ICT) para el acceso
 *   a los servicios de telecomunicación en el interior de las
 *   edificaciones — BOE-A-2011-5834. Regula la infraestructura de redes
 *   de datos, telefonía y RTV, de aplicación al cableado estructurado en
 *   edificios de nueva construcción o rehabilitados.
 * - Real Decreto 513/2017, de 22 de mayo, Reglamento de instalaciones de
 *   protección contra incendios (RIPCI) — BOE-A-2017-6606. Regula las
 *   condiciones de diseño, instalación y mantenimiento de los sistemas de
 *   detección y alarma de incendios.
 * Los sistemas de portero y videoportero automáticos no cuentan con una
 * ley española específica que los regule como tales: se tratan como
 * conocimiento técnico consolidado de corrientes débiles, con la
 * instalación eléctrica de baja tensión que los alimenta sujeta al REBT
 * con carácter general.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-152-corrientes-debiles-telecomunicaciones.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-152";
const OPOSICION = "oficial-electricista-ayto-zaragoza";
const BLOQUE_2_ID = "4dbd9335-cb26-48e5-a83b-aef9eeb23097";

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
  titulo: "Instalaciones de corrientes débiles y telecomunicaciones",
  descripcion: "Sistemas de portero y videoportero automáticos. Redes de datos y cableado estructurado. Sistemas de detección de incendios y alarmas.",
  contenido: "Desarrolla las instalaciones de corrientes débiles y telecomunicaciones de un edificio: los sistemas de portero y videoportero automáticos, las redes de datos y el cableado estructurado conforme al Reglamento de infraestructuras comunes de telecomunicaciones (ICT, Real Decreto 346/2011), y los sistemas de detección de incendios y alarmas conforme al Reglamento de instalaciones de protección contra incendios (RIPCI, Real Decreto 513/2017).",
  enlaces_boe: [
    { titulo: "Real Decreto 346/2011, Reglamento de infraestructuras comunes de telecomunicaciones (ICT)", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2011-5834" },
    { titulo: "Real Decreto 513/2017, Reglamento de instalaciones de protección contra incendios (RIPCI)", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2017-6606" },
  ],
  indice_estudio: [
    { url: "", titulo: "Sistemas de portero y videoportero automáticos", seccion: "sistemas-portero-videoportero-automaticos", articulos: "Conceptos fundamentales" },
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2011-5834", titulo: "Redes de datos y cableado estructurado (ICT)", seccion: "redes-datos-cableado-estructurado", articulos: "RD 346/2011" },
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2017-6606", titulo: "Sistemas de detección de incendios y alarmas (RIPCI)", seccion: "sistemas-deteccion-incendios-alarmas", articulos: "RD 513/2017" },
  ],
}]);

const S1 = "sistemas-portero-videoportero-automaticos";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un sistema de portero automático?", reverso: "Un sistema de corrientes débiles que permite la comunicación de audio entre la entrada de un edificio y las distintas viviendas o dependencias, junto con la apertura eléctrica de la puerta de acceso" },
  { anverso: "¿Qué es un sistema de videoportero automático, a diferencia de un portero automático simple?", reverso: "Un sistema que añade a la comunicación de audio la transmisión de imagen mediante una cámara situada en la entrada, permitiendo identificar visualmente a la persona visitante antes de abrir la puerta" },
  { anverso: "¿Qué elementos básicos componen la placa exterior de un sistema de portero o videoportero automático?", reverso: "El conjunto de pulsadores de llamada (uno por vivienda o dependencia), el altavoz y micrófono para la comunicación, y, en el caso del videoportero, la cámara y su iluminación asociada" },
  { anverso: "¿Qué elemento permite, desde el interior de la vivienda, descolgar la comunicación y accionar la apertura de la puerta de entrada del edificio?", reverso: "El aparato interior (telefonillo o monitor de videoportero), que incluye el pulsador de apertura de puerta conectado al abrepuertas eléctrico de la entrada" },
  { anverso: "¿A qué tensión suele trabajar el circuito de comunicación de un sistema de portero o videoportero automático, a diferencia de la tensión de red?", reverso: "A muy baja tensión, alimentado por un transformador o fuente de alimentación específica del propio sistema, reduciendo el riesgo eléctrico en el cableado de comunicación entre la placa exterior y los aparatos interiores" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es un sistema de portero automático?", explicacion: "Permite comunicación de audio entre la entrada y las viviendas, con apertura eléctrica de la puerta.", dificultad: "facil", opciones: ["Permite comunicación de audio y apertura eléctrica de la puerta", "Un sistema exclusivo de detección de incendios", "Un sistema exclusivo de cableado estructurado de datos", "Un dispositivo de medida de la resistencia de tierra"], correcta: 0 },
  { enunciado: "¿Qué añade un videoportero automático respecto a un portero automático simple?", explicacion: "La transmisión de imagen mediante una cámara en la entrada.", dificultad: "media", opciones: ["La transmisión de imagen mediante una cámara en la entrada", "La apertura eléctrica de la puerta, ausente en el portero simple", "La comunicación de audio, ausente en el portero simple", "La conexión a la red de datos del edificio"], correcta: 0 },
  { enunciado: "¿Qué elemento acciona la apertura de la puerta de entrada desde el interior de una vivienda?", explicacion: "El aparato interior (telefonillo o monitor), con su pulsador de apertura conectado al abrepuertas.", dificultad: "media", opciones: ["El aparato interior (telefonillo o monitor de videoportero)", "La cámara situada en la placa exterior", "El transformador que alimenta el sistema", "El interruptor diferencial del cuadro general"], correcta: 0 },
  { enunciado: "¿A qué tensión suele trabajar el circuito de comunicación de un portero o videoportero automático?", explicacion: "A muy baja tensión, mediante transformador o fuente específica.", dificultad: "media", opciones: ["A muy baja tensión, mediante transformador o fuente específica", "Siempre a la tensión nominal de red de 230 V", "Siempre a la tensión de alta tensión de la red de distribución", "A una tensión superior a la de cualquier otro circuito del edificio"], correcta: 0 },
  { enunciado: "¿Qué elementos componen habitualmente la placa exterior de un videoportero automático?", explicacion: "Pulsadores de llamada, altavoz, micrófono, cámara e iluminación asociada.", dificultad: "dificil", opciones: ["Pulsadores de llamada, altavoz, micrófono y cámara", "Únicamente un pulsador general para todo el edificio", "Únicamente una cámara, sin ningún elemento de audio", "Únicamente el abrepuertas eléctrico de la entrada"], correcta: 0 },
]);

const S2 = "redes-datos-cableado-estructurado";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué Real Decreto aprueba el Reglamento de infraestructuras comunes de telecomunicaciones (ICT)?", reverso: "El Real Decreto 346/2011, de 11 de marzo, que regula la infraestructura para el acceso a los servicios de telecomunicación en el interior de las edificaciones" },
  { anverso: "¿Qué es el cableado estructurado en una instalación de red de datos?", reverso: "Un sistema de cableado normalizado y jerarquizado (con sus paneles de conexión, rosetas y armarios de distribución) que permite la conexión de distintos dispositivos y servicios a una misma infraestructura física, independientemente del tipo de equipo conectado en cada punto" },
  { anverso: "¿Qué elementos básicos componen una instalación de cableado estructurado?", reverso: "El armario o rack de distribución (con los paneles de conexión y equipos activos), el cableado horizontal (hasta cada roseta o punto de acceso) y las propias rosetas o tomas de usuario" },
  { anverso: "¿Qué categoría de cable de par trenzado (UTP/FTP) es habitual en redes de datos actuales de edificios de nueva construcción?", reverso: "Categoría 6 o superior (Cat 6, Cat 6A), que ofrece mayor ancho de banda que categorías anteriores (Cat 5e), adecuada para las velocidades de transmisión actuales" },
  { anverso: "¿Qué diferencia existe entre un cable UTP y un cable FTP en el cableado de datos?", reverso: "El cable FTP incorpora una pantalla o apantallamiento metálico que protege frente a interferencias electromagnéticas externas, del que carece el cable UTP (sin apantallar)" },
  { anverso: "¿Por qué es recomendable mantener una separación adecuada entre el cableado de datos y el cableado de potencia (fuerza) en una instalación?", reverso: "Para minimizar las interferencias electromagnéticas que el cableado de potencia puede inducir sobre el cableado de datos, que trabaja con señales de menor nivel y mayor sensibilidad" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué Real Decreto aprueba el Reglamento de infraestructuras comunes de telecomunicaciones (ICT)?", explicacion: "El Real Decreto 346/2011, de 11 de marzo.", dificultad: "media", opciones: ["El Real Decreto 346/2011, de 11 de marzo", "El Real Decreto 842/2002, de 2 de agosto", "El Real Decreto 513/2017, de 22 de mayo", "El Real Decreto 614/2001, de 8 de junio"], correcta: 0 },
  { enunciado: "¿Qué es el cableado estructurado en una red de datos?", explicacion: "Un sistema de cableado normalizado y jerarquizado para distintos servicios y dispositivos.", dificultad: "media", opciones: ["Un sistema de cableado normalizado y jerarquizado", "Un tipo exclusivo de cable de fibra óptica sin normalización", "Un sistema exclusivo de detección de incendios", "Un sistema exclusivo del circuito de fuerza de un motor"], correcta: 0 },
  { enunciado: "¿Qué categoría de cable de par trenzado es habitual en redes de datos de edificios de nueva construcción?", explicacion: "Categoría 6 o superior.", dificultad: "media", opciones: ["Categoría 6 o superior", "Categoría 1, la más básica disponible", "No existe ninguna categorización de este tipo de cable", "Categoría exclusiva para redes de telefonía analógica"], correcta: 0 },
  { enunciado: "¿Qué diferencia existe entre un cable UTP y un cable FTP?", explicacion: "El FTP incorpora apantallamiento frente a interferencias; el UTP no.", dificultad: "dificil", opciones: ["El FTP incorpora apantallamiento frente a interferencias", "El UTP incorpora apantallamiento y el FTP no", "Ambos son exactamente equivalentes en su construcción", "El UTP solo se emplea en redes de fibra óptica"], correcta: 0 },
  { enunciado: "¿Por qué es recomendable separar el cableado de datos del cableado de potencia?", explicacion: "Para minimizar interferencias electromagnéticas sobre el cableado de datos.", dificultad: "media", opciones: ["Para minimizar interferencias electromagnéticas sobre el cableado de datos", "Para reducir el precio total de la instalación de cableado", "Porque la normativa lo prohíbe expresamente en cualquier caso", "Porque ambos cableados no pueden coexistir en el mismo edificio"], correcta: 0 },
]);

const S3 = "sistemas-deteccion-incendios-alarmas";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué Real Decreto aprueba el Reglamento de instalaciones de protección contra incendios (RIPCI)?", reverso: "El Real Decreto 513/2017, de 22 de mayo" },
  { anverso: "¿Qué elementos básicos componen un sistema de detección y alarma de incendios?", reverso: "La central de detección de incendios, los detectores (de humo, de temperatura, o combinados), los pulsadores manuales de alarma, y los dispositivos de señalización acústica y/o visual (sirenas, luces estroboscópicas)" },
  { anverso: "¿Qué diferencia existe entre un detector de humo y un detector térmico en un sistema de detección de incendios?", reverso: "El detector de humo responde a la presencia de partículas de combustión en el aire, detectando habitualmente el fuego en una fase más temprana; el detector térmico responde a la elevación de temperatura, siendo más adecuado en ambientes donde el humo no es un buen indicador (por ejemplo, cocinas o zonas con vapor)" },
  { anverso: "¿Qué es un pulsador manual de alarma en un sistema de detección de incendios?", reverso: "Un dispositivo que permite a cualquier persona activar manualmente la alarma general del edificio al detectar un incendio, sin necesidad de esperar a la activación automática de los detectores" },
  { anverso: "¿Qué es la central de detección de incendios?", reverso: "El equipo que recibe las señales de los detectores y pulsadores, procesa la información, activa las alarmas y señalizaciones correspondientes, y puede transmitir la alarma a un centro de recepción de alarmas o al servicio de bomberos, según la configuración del sistema" },
  { anverso: "¿Qué relación tiene el sistema de detección de incendios con la instalación eléctrica de baja tensión de un edificio?", reverso: "El sistema de detección se alimenta de la instalación eléctrica del edificio (habitualmente con una fuente de alimentación propia y batería de respaldo para garantizar su funcionamiento ante un corte de suministro), por lo que su correcta alimentación y protección forman parte de las tareas del electricista" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué Real Decreto aprueba el Reglamento de instalaciones de protección contra incendios (RIPCI)?", explicacion: "El Real Decreto 513/2017, de 22 de mayo.", dificultad: "media", opciones: ["El Real Decreto 513/2017, de 22 de mayo", "El Real Decreto 346/2011, de 11 de marzo", "El Real Decreto 842/2002, de 2 de agosto", "El Real Decreto 773/1997, de 30 de mayo"], correcta: 0 },
  { enunciado: "¿Qué elementos básicos componen un sistema de detección y alarma de incendios?", explicacion: "Central, detectores, pulsadores manuales y dispositivos de señalización.", dificultad: "media", opciones: ["Central, detectores, pulsadores manuales y señalización", "Únicamente una central sin ningún detector asociado", "Únicamente detectores, sin ninguna central de control", "Únicamente pulsadores manuales, sin detección automática"], correcta: 0 },
  { enunciado: "¿Qué diferencia existe entre un detector de humo y un detector térmico?", explicacion: "El de humo responde a partículas de combustión; el térmico, a la elevación de temperatura.", dificultad: "media", opciones: ["El de humo responde a partículas de combustión; el térmico, a la temperatura", "Ambos responden exactamente al mismo fenómeno físico", "El térmico detecta siempre antes que el detector de humo", "El detector de humo solo se emplea en exteriores"], correcta: 0 },
  { enunciado: "¿Qué función cumple un pulsador manual de alarma en este tipo de sistema?", explicacion: "Permite activar manualmente la alarma general sin esperar a la detección automática.", dificultad: "facil", opciones: ["Permite activar manualmente la alarma general del edificio", "Detecta automáticamente el humo de un incendio", "Mide la temperatura ambiente de una estancia", "Sustituye por completo a la central de detección"], correcta: 0 },
  { enunciado: "¿Por qué suele disponer de batería de respaldo la fuente de alimentación de un sistema de detección de incendios?", explicacion: "Para garantizar su funcionamiento ante un corte del suministro eléctrico normal.", dificultad: "dificil", opciones: ["Para garantizar su funcionamiento ante un corte del suministro normal", "Para aumentar la sensibilidad de los detectores de humo", "Para reducir el consumo eléctrico general del sistema", "Porque el sistema nunca puede alimentarse de la red eléctrica normal"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 20 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 20, orden: 20, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-152 creado y vinculado como Tema 20 de Oficial Electricista.");
