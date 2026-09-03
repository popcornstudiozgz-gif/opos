/**
 * Crea tema-222: "Trabajos con excavadora (I): pala frontal, excavación y
 * cuchara bivalva" — Tema 10 (numero=10, bloque-2) de Oficial Conductor,
 * Especialidad Maquinaria Pesada (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 8 oficial del Anexo I (bases2110.pdf, línea 2109):
 *   "Trabajos con excavadora (I). Trabajos con equipo de pala frontal,
 *   excavación y cuchara bivalva de acuerdo a los ciclos de producción y
 *   calidad previstos aplicando en todo momento las normas de seguridad
 *   vigentes."
 *
 * Conocimiento técnico consolidado del oficio de operador de excavadora,
 * sin una ley española única que lo regule como tal — mismo criterio ya
 * aplicado en Oficial Carpintero, Herrero y Mecánico (ver scripts/
 * seed-tema-108-*.mjs, seed-tema-155-*.mjs y seed-tema-171-*.mjs) para
 * contenido técnico del oficio sin ley única. Búsqueda previa realizada
 * conforme al estándar de sourcing del proyecto: la referencia técnica
 * pública disponible es la Nota Técnica de Prevención NTP 126 "Máquinas
 * para movimiento de tierras" del Instituto Nacional de Seguridad y
 * Salud en el Trabajo (INSST), que resume los riesgos y medidas
 * preventivas de este tipo de maquinaria; la seguridad intrínseca de la
 * propia máquina (marcado CE) ya se desarrolló en tema-220 (RD
 * 1644/2008).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-222-trabajos-excavadora-1.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-222";
const OPOSICION = "oficial-conductor-maquinaria-pesada-ayto-zaragoza";
const BLOQUE_2_ID = "388bfbfc-396e-4de2-8897-09532d6a0bcd";

const NTP_126 = "https://www.insst.es/documentacion/colecciones-tecnicas/ntp-notas-tecnicas-de-prevencion/4-serie-ntp-numeros-121-a-155-ano-1985/ntp-126-maquinas-para-movimiento-de-tierras";

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
  titulo: "Trabajos con excavadora (I): pala frontal, excavación y cuchara bivalva",
  descripcion: "La excavadora: tipos y componentes principales. El equipo de pala frontal y el ciclo de producción. La cuchara bivalva y las normas de seguridad vigentes en su uso.",
  contenido: "Desarrolla los trabajos con excavadora en su primera parte: los tipos y componentes principales de la máquina (tren de rodaje, chasis, torreta, pluma, brazo y cazo); el equipo de pala frontal, su funcionamiento y el ciclo de producción (excavación, giro, descarga y retorno) que determina la calidad y el rendimiento del trabajo; y el equipo de cuchara bivalva, sus aplicaciones específicas y las normas de seguridad que deben respetarse en todo momento durante su uso, con referencia a la Nota Técnica de Prevención NTP 126 del INSST.",
  enlaces_boe: [
    { url: NTP_126, titulo: "INSST — NTP 126: Máquinas para movimiento de tierras" },
  ],
  indice_estudio: [
    { url: NTP_126, titulo: "La excavadora: tipos y componentes principales", seccion: "excavadora-tipos-componentes-principales", articulos: "Conocimiento técnico del oficio" },
    { url: NTP_126, titulo: "El equipo de pala frontal y el ciclo de producción", seccion: "equipo-pala-frontal-ciclo-produccion", articulos: "Conocimiento técnico del oficio" },
    { url: NTP_126, titulo: "La cuchara bivalva y las normas de seguridad vigentes", seccion: "cuchara-bivalva-normas-seguridad-vigentes", articulos: "NTP 126 (INSST)" },
  ],
}]);

const S1 = "excavadora-tipos-componentes-principales";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es una excavadora, como máquina de movimiento de tierras?", reverso: "Una máquina autopropulsada sobre cadenas o neumáticos, dotada de una superestructura giratoria capaz de girar 360°, que excava y carga materiales mediante el movimiento de un equipo formado por pluma, brazo y cazo, accionado hidráulicamente" },
  { anverso: "¿Qué diferencia principal existe entre una excavadora de cadenas y una excavadora sobre neumáticos?", reverso: "La excavadora de cadenas ofrece mayor estabilidad y tracción en terrenos irregulares o blandos, a costa de menor velocidad de desplazamiento; la de neumáticos se desplaza con mayor rapidez por vías y terrenos firmes, siendo más adecuada para obras urbanas con desplazamientos frecuentes" },
  { anverso: "¿Qué es el tren de rodaje de una excavadora de cadenas?", reverso: "El conjunto formado por las cadenas, las ruedas motrices, las ruedas guía y los rodillos, que soporta el peso de la máquina y le proporciona tracción y estabilidad sobre el terreno" },
  { anverso: "¿Qué es la torreta o superestructura giratoria de una excavadora?", reverso: "La parte superior de la máquina, que aloja la cabina, el motor y los sistemas hidráulicos, y que puede girar libremente sobre el chasis inferior gracias a la corona de giro, permitiendo orientar el equipo de trabajo sin desplazar la máquina" },
  { anverso: "¿Qué elementos componen el equipo de trabajo de una excavadora (pluma, brazo y cazo)?", reverso: "La pluma, articulada a la torreta; el brazo, articulado al extremo de la pluma; y el cazo o cuchara, articulado al extremo del brazo, siendo el elemento final que realiza la excavación propiamente dicha; los tres elementos se accionan mediante cilindros hidráulicos" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es una excavadora, como máquina de movimiento de tierras?", explicacion: "Una máquina con superestructura giratoria que excava y carga mediante pluma, brazo y cazo.", dificultad: "facil", opciones: ["Una máquina con superestructura giratoria y equipo de pluma-brazo-cazo", "Una máquina exclusiva para el transporte de materiales a larga distancia", "Una máquina exclusiva para la compactación de firmes de carretera", "Una máquina exclusiva para la nivelación fina de superficies"], correcta: 0 },
  { enunciado: "¿Qué ventaja ofrece una excavadora de cadenas frente a una de neumáticos?", explicacion: "Mayor estabilidad y tracción en terrenos irregulares o blandos.", dificultad: "media", opciones: ["Mayor estabilidad y tracción en terrenos irregulares", "Mayor velocidad de desplazamiento por vía pública", "Menor coste de mantenimiento en cualquier terreno", "Mayor capacidad de carga en cualquier circunstancia"], correcta: 0 },
  { enunciado: "¿Qué es el tren de rodaje de una excavadora de cadenas?", explicacion: "El conjunto de cadenas, ruedas motrices, ruedas guía y rodillos que da tracción y estabilidad.", dificultad: "media", opciones: ["El conjunto que da tracción y estabilidad a la máquina", "El sistema hidráulico que acciona el cazo de la máquina", "La cabina desde la que opera la persona conductora", "El motor diésel que impulsa el conjunto de la máquina"], correcta: 0 },
  { enunciado: "¿Qué permite la corona de giro de una excavadora?", explicacion: "Que la torreta gire libremente sobre el chasis inferior sin desplazar la máquina.", dificultad: "media", opciones: ["Que la torreta gire libremente sobre el chasis inferior", "Que la máquina se desplace más rápido por carretera", "Que el cazo cambie automáticamente de tamaño", "Que el motor reduzca su consumo de combustible"], correcta: 0 },
  { enunciado: "¿Qué elemento del equipo de trabajo realiza la excavación propiamente dicha?", explicacion: "El cazo o cuchara, articulado al extremo del brazo.", dificultad: "facil", opciones: ["El cazo o cuchara", "La pluma exclusivamente", "El brazo exclusivamente", "La corona de giro"], correcta: 0 },
]);

const S2 = "equipo-pala-frontal-ciclo-produccion";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es el equipo de pala frontal en una excavadora?", reverso: "Una configuración del equipo de trabajo en la que el cazo excava hacia arriba y hacia adelante, alejándose de la máquina, siendo especialmente adecuada para excavar por encima del nivel de apoyo de la excavadora (frentes altos, taludes elevados)" },
  { anverso: "¿Cuáles son las cuatro fases del ciclo de trabajo de una excavadora?", reverso: "Excavación (llenado del cazo), giro con carga (desde el frente de excavación hasta el punto de descarga), descarga del material, y giro de retorno (vacío) hasta la posición de inicio de una nueva excavación" },
  { anverso: "¿Qué factores influyen principalmente en la producción (rendimiento) de un ciclo de excavación?", reverso: "El tipo y la dureza del material excavado, el ángulo de giro entre la excavación y la descarga, la altura o profundidad de excavación respecto al punto óptimo, la habilidad de la persona operadora, y las condiciones del terreno y del punto de descarga" },
  { anverso: "¿Por qué es preferible, siempre que sea posible, minimizar el ángulo de giro entre la excavación y la descarga?", reverso: "Porque reduce el tiempo de ciclo y, por tanto, aumenta la producción horaria de la máquina, al disminuir el recorrido angular que debe realizar la torreta en cada ciclo de trabajo" },
  { anverso: "¿Qué se entiende por calidad del ciclo de producción, más allá de la simple cantidad de material movido?", reverso: "Que el material se excargue de forma ordenada, sin derrames ni sobrellenado descontrolado del cazo, respetando las cotas y perfiles de excavación previstos en el proyecto, y aplicando en todo momento las normas de seguridad vigentes" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es el equipo de pala frontal en una excavadora?", explicacion: "Una configuración en la que el cazo excava hacia arriba y adelante, alejándose de la máquina.", dificultad: "media", opciones: ["Una configuración en la que el cazo excava hacia arriba y adelante", "Una configuración exclusiva para excavar por debajo del nivel de apoyo", "Un accesorio exclusivo para la carga de materiales fragmentados", "Un accesorio exclusivo para el transporte de la propia máquina"], correcta: 0 },
  { enunciado: "¿Cuáles son las cuatro fases del ciclo de trabajo de una excavadora?", explicacion: "Excavación, giro con carga, descarga, y giro de retorno vacío.", dificultad: "media", opciones: ["Excavación, giro con carga, descarga y giro de retorno", "Arranque, aceleración, frenado y parada del motor", "Carga, transporte, descarga y regreso a base del camión", "Nivelación, compactación, riego y acabado del firme"], correcta: 0 },
  { enunciado: "¿Cuál de los siguientes factores influye directamente en la producción de un ciclo de excavación?", explicacion: "El ángulo de giro entre la excavación y la descarga, entre otros factores.", dificultad: "media", opciones: ["El ángulo de giro entre excavación y descarga", "El color de la carrocería de la máquina", "La marca comercial del fabricante de la máquina", "El número de personas presentes en la obra"], correcta: 0 },
  { enunciado: "¿Por qué es preferible minimizar el ángulo de giro entre excavación y descarga?", explicacion: "Reduce el tiempo de ciclo y aumenta la producción horaria de la máquina.", dificultad: "dificil", opciones: ["Reduce el tiempo de ciclo y aumenta la producción horaria", "No influye en ningún caso en el rendimiento del trabajo", "Solo influye en el consumo de combustible, no en la producción", "Solo es relevante en excavaciones de gran profundidad"], correcta: 0 },
  { enunciado: "¿Qué implica la calidad del ciclo de producción, más allá de la cantidad de material movido?", explicacion: "Respetar cotas y perfiles previstos, sin derrames, aplicando las normas de seguridad vigentes.", dificultad: "media", opciones: ["Respetar cotas y perfiles, sin derrames, con seguridad", "Exclusivamente mover la mayor cantidad posible de material", "Exclusivamente minimizar el tiempo total de la jornada laboral", "Exclusivamente reducir el consumo de combustible de la máquina"], correcta: 0 },
]);

const S3 = "cuchara-bivalva-normas-seguridad-vigentes";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es una cuchara bivalva?", reverso: "Un accesorio del equipo de trabajo formado por dos mandíbulas o valvas articuladas que se abren y cierran hidráulicamente, empleado para excavar y extraer materiales en zanjas estrechas y profundas, pozos, o para la manipulación de materiales sueltos" },
  { anverso: "¿En qué tipo de trabajos resulta especialmente adecuada la cuchara bivalva frente a un cazo convencional?", reverso: "En excavaciones estrechas y de gran profundidad (como pozos o zanjas para pantallas de contención), donde el cazo convencional no permite un ataque vertical eficaz del material ni su extracción limpia sin desmoronar las paredes de la excavación" },
  { anverso: "¿Qué comprobación de seguridad debe realizarse antes de iniciar el trabajo con una cuchara bivalva?", reverso: "Verificar el correcto funcionamiento del sistema de apertura y cierre hidráulico de las valvas, el estado de los pasadores y articulaciones, y que el peso de la carga a manipular no supera la capacidad nominal del equipo" },
  { anverso: "¿Qué riesgo específico conlleva el uso de la cuchara bivalva frente al de un cazo convencional?", reverso: "El riesgo de atrapamiento en el cierre de las valvas, y el riesgo de caída de material por una apertura accidental o un fallo del sistema hidráulico de cierre durante el izado o desplazamiento de la carga" },
  { anverso: "¿Qué norma de seguridad general, aplicable a cualquier equipo de trabajo de la excavadora, debe respetarse durante el uso de la cuchara bivalva?", reverso: "Mantener despejada la zona de trabajo de personas ajenas, no superar la capacidad de carga de la máquina, y operar siempre dentro de las condiciones de estabilidad indicadas por el fabricante, conforme a la evaluación de riesgos del puesto" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es una cuchara bivalva?", explicacion: "Un accesorio de dos mandíbulas articuladas que se abren y cierran hidráulicamente.", dificultad: "facil", opciones: ["Un accesorio de dos mandíbulas que se abren y cierran hidráulicamente", "Un accesorio exclusivo para la compactación de terrenos", "Un accesorio exclusivo para el transporte de la propia excavadora", "Un sistema de iluminación adicional de la máquina"], correcta: 0 },
  { enunciado: "¿En qué tipo de trabajos resulta especialmente adecuada la cuchara bivalva?", explicacion: "En excavaciones estrechas y de gran profundidad, como pozos o zanjas para pantallas.", dificultad: "media", opciones: ["En excavaciones estrechas y de gran profundidad", "Únicamente en la nivelación de grandes superficies", "Únicamente en el transporte de materiales a larga distancia", "Únicamente en la compactación de firmes de carretera"], correcta: 0 },
  { enunciado: "¿Qué debe comprobarse antes de iniciar el trabajo con una cuchara bivalva?", explicacion: "El sistema de apertura y cierre hidráulico, pasadores y articulaciones, y la capacidad nominal.", dificultad: "media", opciones: ["El sistema de cierre hidráulico y la capacidad nominal", "Únicamente el nivel de combustible de la máquina", "Únicamente el color de la pintura de la cuchara", "Ninguna comprobación adicional distinta del cazo convencional"], correcta: 0 },
  { enunciado: "¿Qué riesgo específico conlleva el uso de la cuchara bivalva?", explicacion: "El riesgo de atrapamiento en el cierre de las valvas y de caída de material por fallo hidráulico.", dificultad: "dificil", opciones: ["Atrapamiento en el cierre y caída de material por fallo hidráulico", "Ningún riesgo adicional distinto del cazo convencional", "Únicamente el riesgo de vuelco de la máquina completa", "Únicamente el riesgo derivado del ruido del motor"], correcta: 0 },
  { enunciado: "¿Qué norma general de seguridad debe respetarse durante el uso de la cuchara bivalva?", explicacion: "No superar la capacidad de carga y operar dentro de las condiciones de estabilidad indicadas.", dificultad: "media", opciones: ["No superar la capacidad de carga y respetar la estabilidad indicada", "Trabajar siempre con la máxima velocidad de ciclo posible", "Prescindir de la zona de seguridad si la obra tiene prisa", "Ninguna norma adicional distinta de la circulación por carretera"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 10 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 10, orden: 10, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-222 creado y vinculado como Tema 10 de Oficial Conductor Maquinaria Pesada.");
