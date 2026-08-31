/**
 * Crea tema-62: "Fontanería y calefacción básica" — Tema 8 (numero=8,
 * bloque-2) de Oficial Mantenimiento General (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 6 oficial del Anexo I (bases2110.pdf), "Parte
 * segunda" de Oficial Mantenimiento General:
 *   "Fontanería: Averías y reparaciones en tuberías, desagües, grifos y
 *   llaves de paso. Ruido en las instalaciones. Reconocimiento de
 *   herramientas. Sistemas de calefacción: Clasificación, circuitos
 *   básicos, identificación de componentes, conocimientos básicos de
 *   funcionamiento."
 *
 * Conocimiento técnico consolidado del oficio (averías de fontanería,
 * herramientas, tipos de calefacción); no requiere cita legal
 * artículo a artículo, igual que el criterio ya aplicado en los temas de
 * materiales/herramientas de Oficial Albañil.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-62-fontaneria-calefaccion-mantenimiento.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-62";
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
  titulo: "Fontanería y calefacción básica",
  descripcion: "Averías y reparaciones en tuberías, desagües, grifos y llaves de paso. Ruido en las instalaciones. Reconocimiento de herramientas. Sistemas de calefacción: clasificación, circuitos básicos y componentes.",
  contenido: "Desarrolla las averías más frecuentes en instalaciones de fontanería (tuberías, desagües, grifos, llaves de paso), el ruido en las instalaciones y las herramientas propias del oficio, junto con la clasificación de los sistemas de calefacción, sus circuitos básicos y la identificación de sus componentes.",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "Averías y reparaciones en tuberías, desagües, grifos y llaves de paso", seccion: "fontaneria-averias-tuberias-desagues", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Herramientas de fontanería", seccion: "herramientas-fontaneria", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Sistemas de calefacción: clasificación y componentes", seccion: "sistemas-calefaccion-clasificacion-componentes", articulos: "Conceptos fundamentales" },
  ],
}]);

const S1 = "fontaneria-averias-tuberias-desagues";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Cuál es la causa más habitual de fuga en una tubería de fontanería?", reverso: "La corrosión o perforación del material (especialmente en tuberías metálicas antiguas de plomo o hierro), la rotura por golpe de ariete, o el fallo de una junta o soldadura" },
  { anverso: "¿Qué es el 'golpe de ariete' en una instalación de fontanería?", reverso: "El sobre-empuje o sobrepresión brusca que se produce en una tubería al cerrar rápidamente una llave o grifo, que puede dañar juntas, válvulas y tuberías" },
  { anverso: "¿Cuál es la avería más común en un grifo monomando?", reverso: "El desgaste del cartucho cerámico interior, que provoca goteo constante o dificultad para cerrar" },
  { anverso: "¿Qué función cumple la llave de paso general de una vivienda?", reverso: "Cortar el suministro de agua a toda la instalación interior, imprescindible antes de cualquier reparación" },
  { anverso: "¿Qué es una arqueta en una red de saneamiento?", reverso: "Una cámara de registro, generalmente enterrada, que permite el acceso a la red de desagües para su inspección, limpieza y conexión de ramales" },
  { anverso: "¿Cuál es la causa más frecuente de atasco en un desagüe?", reverso: "La acumulación de grasas, restos orgánicos, cabello o cal en el interior de la tubería, que reduce progresivamente su sección" },
  { anverso: "¿Qué es un sifón en una instalación de saneamiento y para qué sirve?", reverso: "Un tramo de tubería en forma de U que retiene agua permanentemente, impidiendo que los malos olores del alcantarillado suban al interior de la vivienda" },
  { anverso: "¿Qué causas suelen provocar ruido en las instalaciones de fontanería?", reverso: "Velocidad excesiva del agua, tuberías mal fijadas o en contacto directo con la obra, golpe de ariete, o presión de red demasiado alta" },
  { anverso: "¿Qué es una válvula antiariete?", reverso: "Un dispositivo que amortigua las sobrepresiones bruscas (golpe de ariete) producidas al cerrar rápidamente un grifo o electroválvula" },
  { anverso: "¿Qué material de tubería es hoy el más habitual en instalaciones interiores de agua sanitaria?", reverso: "El multicapa (polietileno reticulado con alma de aluminio) o el cobre, según antigüedad de la instalación; sustituyen progresivamente al plomo y al hierro galvanizado" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es el 'golpe de ariete'?", explicacion: "La sobrepresión brusca al cerrar rápidamente una llave o grifo.", dificultad: "media", opciones: ["Una sobrepresión brusca al cerrar rápido un grifo", "Un tipo de junta de fontanería", "Un atasco por acumulación de cal", "Un tipo de válvula antiariete"], correcta: 0 },
  { enunciado: "¿Cuál es la avería más común en un grifo monomando?", explicacion: "El desgaste del cartucho cerámico.", dificultad: "facil", opciones: ["El desgaste del cartucho cerámico", "La rotura de la llave de paso general", "El fallo del sifón", "La corrosión de la arqueta"], correcta: 0 },
  { enunciado: "¿Para qué sirve la llave de paso general de una vivienda?", explicacion: "Para cortar el suministro de agua a toda la instalación.", dificultad: "facil", opciones: ["Para cortar el suministro de agua a toda la instalación", "Para regular la temperatura del agua", "Para amortiguar el golpe de ariete", "Para purgar el aire de la instalación"], correcta: 0 },
  { enunciado: "¿Qué es una arqueta de saneamiento?", explicacion: "Una cámara de registro para inspección y limpieza de la red de desagües.", dificultad: "media", opciones: ["Una cámara de registro de la red de desagües", "Un tipo de grifo monomando", "Un depósito de agua caliente", "Un elemento de calefacción"], correcta: 0 },
  { enunciado: "¿Cuál es la causa más frecuente de atasco en un desagüe?", explicacion: "La acumulación de grasas, restos orgánicos, cabello o cal.", dificultad: "facil", opciones: ["Acumulación de grasas, restos orgánicos, cabello o cal", "Un golpe de ariete", "Un fallo del sifón", "El desgaste del cartucho del grifo"], correcta: 0 },
  { enunciado: "¿Qué función cumple el sifón de un desagüe?", explicacion: "Retiene agua para impedir que suban los malos olores del alcantarillado.", dificultad: "media", opciones: ["Impedir que suban malos olores del alcantarillado", "Amortiguar el golpe de ariete", "Filtrar impurezas del agua", "Regular la presión de la red"], correcta: 0 },
  { enunciado: "¿Qué causa habitual provoca ruido en las instalaciones de fontanería?", explicacion: "Velocidad excesiva del agua o tuberías mal fijadas, entre otras causas.", dificultad: "media", opciones: ["Velocidad excesiva del agua o tuberías mal fijadas", "El uso de tuberías de cobre", "La presencia de una arqueta", "El uso de un cartucho cerámico"], correcta: 0 },
  { enunciado: "¿Qué dispositivo amortigua las sobrepresiones del golpe de ariete?", explicacion: "La válvula antiariete.", dificultad: "dificil", opciones: ["La válvula antiariete", "El sifón", "La arqueta de registro", "La llave de paso general"], correcta: 0 },
]);

const S2 = "herramientas-fontaneria";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Para qué se usa una llave de tubo (Stillson)?", reverso: "Para apretar o aflojar tuberías y racores roscados, ajustando su mordaza al diámetro de la pieza" },
  { anverso: "¿Para qué se usa un juego de llaves fijas o de boca en fontanería?", reverso: "Para apretar o aflojar tuercas y racores de tamaño estándar, sin dañar sus caras planas" },
  { anverso: "¿Para qué se emplea un cortatubos?", reverso: "Para cortar tuberías (cobre, plástico) de forma limpia y perpendicular, sin rebabas ni deformaciones" },
  { anverso: "¿Para qué sirve un soplete o soldador de fontanero?", reverso: "Para soldar por capilaridad uniones de tubería de cobre mediante estaño o plata" },
  { anverso: "¿Qué es una terraja y para qué se usa en fontanería?", reverso: "Una herramienta para labrar roscas exteriores en tubos, permitiendo enroscar racores o accesorios" },
  { anverso: "¿Para qué se usa el teflón (cinta de politetrafluoroetileno) en fontanería?", reverso: "Para sellar y hacer estanca una unión roscada, evitando fugas de agua o gas" },
  { anverso: "¿Para qué sirve una desatascadora (ventosa o sonda)?", reverso: "Para eliminar atascos en desagües, mediante succión/presión (ventosa) o introduciendo un cable flexible (sonda o serpiente)" },
  { anverso: "¿Para qué se usa una máquina de electrosoldadura o termofusión en tubería de plástico?", reverso: "Para unir tramos de tubería de polietileno o polipropileno mediante fusión del material por calor, creando una unión estanca y permanente" },
  { anverso: "¿Para qué sirve un detector de fugas o cámara de inspección de tuberías?", reverso: "Para localizar fugas ocultas o el punto exacto de un atasco/obstrucción sin necesidad de picar o excavar a ciegas" },
  { anverso: "¿Qué herramienta se usa para curvar tubo de cobre sin aplastarlo?", reverso: "El curvatubos (manual o de muelle), que dobla el tubo manteniendo su sección circular" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Para qué se usa una llave de tubo (Stillson)?", explicacion: "Para apretar o aflojar tuberías y racores roscados.", dificultad: "facil", opciones: ["Para apretar o aflojar tuberías y racores roscados", "Para cortar tubería de cobre", "Para soldar por capilaridad", "Para labrar roscas exteriores"], correcta: 0 },
  { enunciado: "¿Qué herramienta corta tuberías de forma limpia y perpendicular?", explicacion: "El cortatubos.", dificultad: "facil", opciones: ["El cortatubos", "La terraja", "La llave Stillson", "El curvatubos"], correcta: 0 },
  { enunciado: "¿Para qué se usa una terraja en fontanería?", explicacion: "Para labrar roscas exteriores en tubos.", dificultad: "media", opciones: ["Para labrar roscas exteriores en tubos", "Para soldar tubería de cobre", "Para desatascar un desagüe", "Para curvar un tubo sin aplastarlo"], correcta: 0 },
  { enunciado: "¿Para qué se emplea el teflón en una unión roscada de fontanería?", explicacion: "Para sellar y hacer estanca la unión, evitando fugas.", dificultad: "facil", opciones: ["Para sellar y hacer estanca la unión", "Para soldar la unión", "Para cortar el tubo", "Para curvar el tubo"], correcta: 0 },
  { enunciado: "¿Qué herramienta permite eliminar atascos introduciendo un cable flexible?", explicacion: "La sonda o serpiente desatascadora.", dificultad: "media", opciones: ["La sonda o serpiente desatascadora", "El cortatubos", "La terraja", "El detector de fugas"], correcta: 0 },
  { enunciado: "¿Cómo se unen tramos de tubería de polietileno o polipropileno mediante calor?", explicacion: "Con una máquina de electrosoldadura o termofusión.", dificultad: "dificil", opciones: ["Con electrosoldadura o termofusión", "Con soldadura de estaño y soplete", "Con teflón", "Con la terraja"], correcta: 0 },
  { enunciado: "¿Para qué se usa un detector de fugas o cámara de inspección?", explicacion: "Para localizar fugas ocultas o atascos sin excavar a ciegas.", dificultad: "media", opciones: ["Para localizar fugas ocultas o atascos", "Para labrar roscas", "Para curvar tuberías", "Para soldar por capilaridad"], correcta: 0 },
  { enunciado: "¿Qué herramienta permite doblar un tubo de cobre sin aplastar su sección?", explicacion: "El curvatubos.", dificultad: "media", opciones: ["El curvatubos", "La terraja", "El cortatubos", "La llave Stillson"], correcta: 0 },
]);

const S3 = "sistemas-calefaccion-clasificacion-componentes";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Cómo se clasifica la calefacción según su ámbito de aplicación?", reverso: "En individual (una caldera o equipo por vivienda) y central o colectiva (una única instalación que da servicio a todo un edificio o conjunto de edificios)" },
  { anverso: "¿Qué tipos de circuito de calefacción existen según el fluido caloportador?", reverso: "Por agua caliente (el más habitual, mediante radiadores o suelo radiante) y por aire caliente (mediante conductos y rejillas)" },
  { anverso: "¿Qué es una caldera de calefacción?", reverso: "El equipo que genera el calor, calentando el agua (u otro fluido) que circula por el circuito, mediante combustión de gas, gasóleo, biomasa o mediante resistencia/bomba de calor eléctrica" },
  { anverso: "¿Qué función cumple el radiador en un circuito de calefacción?", reverso: "Ceder al ambiente el calor transportado por el agua caliente que circula en su interior, principalmente por convección" },
  { anverso: "¿Qué es un purgador en un circuito de calefacción y para qué se usa?", reverso: "Un dispositivo (manual o automático) que permite evacuar el aire acumulado en el circuito, necesario porque el aire reduce el rendimiento y provoca ruidos" },
  { anverso: "¿Qué función cumple la válvula termostática de un radiador?", reverso: "Regular automáticamente el caudal de agua que entra al radiador según la temperatura ambiente deseada, permitiendo el control individual por estancia" },
  { anverso: "¿Qué es el vaso de expansión en una instalación de calefacción?", reverso: "Un depósito que absorbe el aumento de volumen del agua al calentarse, evitando sobrepresiones en el circuito cerrado" },
  { anverso: "¿Qué es la bomba circuladora en un sistema de calefacción?", reverso: "El equipo que impulsa el agua caliente por todo el circuito, venciendo la resistencia de tuberías y radiadores" },
  { anverso: "¿Qué es el suelo radiante?", reverso: "Un sistema de calefacción por circuito de tuberías embebido en el suelo, que cede el calor de forma uniforme por toda la superficie a baja temperatura" },
  { anverso: "¿Qué es un termostato ambiente en una instalación de calefacción?", reverso: "El dispositivo que mide la temperatura de una estancia y ordena el encendido o apagado de la caldera/bomba circuladora para mantener la temperatura de consigna" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Cómo se clasifica la calefacción según su ámbito de aplicación?", explicacion: "En individual y central o colectiva.", dificultad: "facil", opciones: ["Individual y central o colectiva", "Por agua y por electricidad únicamente", "Alta y baja temperatura", "Interior y exterior"], correcta: 0 },
  { enunciado: "¿Qué componente genera el calor en un circuito de calefacción?", explicacion: "La caldera.", dificultad: "facil", opciones: ["La caldera", "El purgador", "El vaso de expansión", "La válvula termostática"], correcta: 0 },
  { enunciado: "¿Para qué sirve un purgador en calefacción?", explicacion: "Para evacuar el aire acumulado en el circuito.", dificultad: "media", opciones: ["Para evacuar el aire acumulado en el circuito", "Para impulsar el agua por el circuito", "Para generar el calor", "Para medir la temperatura ambiente"], correcta: 0 },
  { enunciado: "¿Qué función cumple la válvula termostática de un radiador?", explicacion: "Regular el caudal de agua según la temperatura deseada en la estancia.", dificultad: "media", opciones: ["Regular el caudal según la temperatura deseada", "Generar el calor del circuito", "Impulsar el agua por todo el circuito", "Absorber el aumento de volumen del agua"], correcta: 0 },
  { enunciado: "¿Qué función cumple el vaso de expansión?", explicacion: "Absorbe el aumento de volumen del agua al calentarse, evitando sobrepresiones.", dificultad: "media", opciones: ["Absorbe el aumento de volumen del agua al calentarse", "Impulsa el agua por el circuito", "Mide la temperatura ambiente", "Cede calor al ambiente por convección"], correcta: 0 },
  { enunciado: "¿Qué componente impulsa el agua caliente por todo el circuito?", explicacion: "La bomba circuladora.", dificultad: "media", opciones: ["La bomba circuladora", "El purgador", "El termostato ambiente", "El vaso de expansión"], correcta: 0 },
  { enunciado: "¿Qué caracteriza al suelo radiante frente a los radiadores convencionales?", explicacion: "Cede el calor de forma uniforme por toda la superficie a baja temperatura.", dificultad: "media", opciones: ["Cede el calor de forma uniforme a baja temperatura", "Solo funciona con aire caliente", "No necesita caldera", "Sustituye a la bomba circuladora"], correcta: 0 },
  { enunciado: "¿Qué función cumple el termostato ambiente?", explicacion: "Mide la temperatura y ordena el encendido/apagado para mantener la temperatura de consigna.", dificultad: "facil", opciones: ["Mide la temperatura y controla el encendido/apagado", "Genera el calor del circuito", "Evacua el aire del circuito", "Impulsa el agua por el circuito"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 8 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 8, orden: 8, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-62 creado y vinculado como Tema 8 de Oficial Mantenimiento General.");
