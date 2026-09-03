/**
 * Crea tema-280: "Vehículos específicos para el movimiento de tierras.
 * Tipos. Métodos de trabajo" — Tema 20 (numero=20, bloque-2) de
 * Oficial Conductor, Especialidad General (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 18 oficial del Anexo I (bases2110.pdf, línea
 * 1590):
 *   "Vehículos específicos para el movimiento de tierras. Tipos.
 *   Métodos de trabajo."
 *
 * Sourcing: conocimiento técnico consolidado sin ley única que lo
 * regule como tal — mismo criterio ya aplicado en Oficial Conductor
 * Maquinaria Pesada (scripts/seed-tema-219-*.mjs a seed-tema-234-*.mjs
 * de esa misma oposición), con un nivel de profundidad distinto: este
 * TEMA 18 de Oficial Conductor General es una introducción general a
 * los tipos de vehículos de movimiento de tierras y sus métodos de
 * trabajo, orientada a un conductor generalista, no la especialización
 * en 16 temas de Conductor Maquinaria Pesada, por lo que se ha
 * redactado contenido nuevo y no reutilizado, al no coincidir el
 * enunciado oficial ni el nivel de profundidad exigido. Se reutiliza,
 * por ser información técnica ya verificada en esa oposición, la
 * referencia a la NTP 126 del INSST ("Máquinas para movimiento de
 * tierras: identificación de riesgos").
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-280-vehiculos-movimiento-tierras.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-280";
const OPOSICION = "oficial-conductor-general-ayto-zaragoza";
const BLOQUE_2_ID = "38c4f100-214c-45c4-8600-841993100e43";

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
  titulo: "Vehículos para el movimiento de tierras",
  descripcion: "Excavadoras y palas cargadoras. Motoniveladoras, bulldozer y compactadores. Dúmperes rígidos y articulados. Métodos generales de trabajo y riesgos asociados.",
  contenido: "Desarrolla, a nivel introductorio y orientado a un conductor generalista, los principales tipos de vehículos y maquinaria empleados en el movimiento de tierras (excavadoras, palas cargadoras, motoniveladoras, bulldozer, compactadores, dúmperes) y sus métodos generales de trabajo, sin alcanzar el nivel de especialización propio de un Oficial Conductor de la especialidad de Maquinaria Pesada.",
  enlaces_boe: [
    { url: "https://www.insst.es/documentacion/documentacion-tecnica-en-linea/notas-tecnicas-de-prevencion", titulo: "NTP 126 del INSST: Máquinas para movimiento de tierras (identificación de riesgos)" },
  ],
  indice_estudio: [
    { url: "", titulo: "Excavadoras y palas cargadoras", seccion: "excavadoras-y-palas-cargadoras", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Motoniveladoras, bulldozer y compactadores", seccion: "motoniveladoras-bulldozer-y-compactadores", articulos: "Conceptos fundamentales" },
    { url: "https://www.insst.es/documentacion/documentacion-tecnica-en-linea/notas-tecnicas-de-prevencion", titulo: "Dúmperes y métodos generales de trabajo", seccion: "dumperes-y-metodos-generales-de-trabajo", articulos: "NTP 126 del INSST" },
  ],
}]);

const S1 = "excavadoras-y-palas-cargadoras";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es una excavadora hidráulica y cuál es su función principal en el movimiento de tierras?", reverso: "Una máquina sobre orugas o ruedas, dotada de un brazo articulado con cuchara, cuya función principal es excavar y cargar tierra o materiales, mediante un movimiento de giro de la cuchara hacia el propio vehículo" },
  { anverso: "¿Qué diferencia existe entre una excavadora de cuchara frontal y una de cuchara retro (retroexcavadora)?", reverso: "La cuchara frontal excava empujando hacia adelante y por encima del nivel de apoyo de la máquina; la cuchara retro (la más habitual) excava tirando hacia el propio vehículo y por debajo de su nivel de apoyo, siendo más adecuada para zanjas y excavaciones bajo el nivel del suelo" },
  { anverso: "¿Qué es una pala cargadora y en qué se diferencia de una excavadora?", reverso: "Una máquina, sobre ruedas u orugas, dotada de un cazo frontal que se desplaza junto con toda la máquina para cargar y trasladar material a corta distancia, a diferencia de la excavadora, que trabaja principalmente mediante el giro del brazo sin desplazarse durante la propia excavación" },
  { anverso: "¿Qué es una miniexcavadora y para qué tipo de trabajos se utiliza habitualmente?", reverso: "Una excavadora de tamaño reducido, especialmente adecuada para trabajos en espacios reducidos o de difícil acceso (zanjas estrechas, interiores de solares pequeños, obras urbanas), donde una excavadora convencional no podría maniobrar con facilidad" },
  { anverso: "¿Qué riesgo específico señala la NTP 126 del INSST como propio de las máquinas para movimiento de tierras, en relación con su zona de trabajo?", reverso: "El riesgo de atropello o de golpe a personas situadas en las denominadas \"zonas muertas\" o de visibilidad reducida del operador, especialmente al maniobrar marcha atrás o al girar la máquina" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es una excavadora hidráulica y cuál es su función principal?", explicacion: "Máquina con brazo articulado y cuchara, para excavar y cargar tierra o materiales.", dificultad: "facil", opciones: ["Excavar y cargar tierra o materiales mediante brazo y cuchara", "Compactar el terreno mediante un rodillo vibratorio de gran peso", "Nivelar superficies mediante una cuchilla frontal ajustable", "Transportar tierra a larga distancia mediante una caja basculante"], correcta: 0 },
  { enunciado: "¿Qué diferencia existe entre la cuchara frontal y la cuchara retro de una excavadora?", explicacion: "La frontal excava hacia adelante y por encima; la retro, hacia el vehículo y por debajo del nivel de apoyo.", dificultad: "media", opciones: ["La retro excava hacia el vehículo y por debajo del nivel de apoyo", "Ambas cucharas excavan exactamente de la misma forma y en la misma dirección", "La cuchara frontal es la más habitual para excavar zanjas profundas", "La cuchara retro solo se usa para nivelar superficies, no para excavar"], correcta: 0 },
  { enunciado: "¿Qué es una pala cargadora y en qué se diferencia de una excavadora?", explicacion: "Máquina con cazo frontal que se desplaza para cargar y trasladar material a corta distancia.", dificultad: "media", opciones: ["Un cazo frontal que se desplaza para cargar y trasladar material", "Una máquina exclusiva para compactar el terreno mediante vibración", "Una máquina exclusiva para nivelar superficies mediante una cuchilla", "Una máquina idéntica a la excavadora, sin ninguna diferencia real"], correcta: 0 },
  { enunciado: "¿Para qué tipo de trabajos se utiliza habitualmente una miniexcavadora?", explicacion: "Trabajos en espacios reducidos o de difícil acceso.", dificultad: "media", opciones: ["Trabajos en espacios reducidos o de difícil acceso", "Grandes movimientos de tierra en obras de gran envergadura", "Compactación de superficies de gran extensión únicamente", "Transporte de materiales a larga distancia entre obras"], correcta: 0 },
  { enunciado: "¿Qué riesgo señala la NTP 126 del INSST propio de estas máquinas?", explicacion: "El riesgo de atropello en las zonas muertas o de visibilidad reducida del operador.", dificultad: "dificil", opciones: ["El riesgo de atropello en zonas muertas de visibilidad reducida", "El riesgo exclusivo de vuelco en pendientes muy pronunciadas", "El riesgo exclusivo de incendio del propio motor de la máquina", "Ningún riesgo específico distinto del resto de maquinaria de obra"], correcta: 0 },
]);

const S2 = "motoniveladoras-bulldozer-y-compactadores";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es una motoniveladora y cuál es su función principal?", reverso: "Una máquina dotada de una larga cuchilla central orientable, cuya función principal es nivelar y perfilar superficies de tierra, dando el acabado y la pendiente adecuados a caminos, explanadas o taludes" },
  { anverso: "¿Qué es un bulldozer (topadora) y en qué se diferencia de una motoniveladora?", reverso: "Una máquina sobre orugas dotada de una cuchilla frontal robusta, orientada principalmente a empujar grandes volúmenes de tierra o a desbrozar y allanar terrenos, a diferencia de la motoniveladora, orientada al acabado fino de la superficie" },
  { anverso: "¿Qué es un compactador y cuál es su función en una obra de movimiento de tierras?", reverso: "Una máquina (de rodillo liso, de pata de cabra o vibratoria, entre otros tipos) cuya función es compactar el terreno o los materiales de relleno, reduciendo los huecos de aire y aumentando su densidad y capacidad portante" },
  { anverso: "¿Qué diferencia existe entre un compactador de rodillo liso y uno vibratorio?", reverso: "El de rodillo liso compacta principalmente por el propio peso estático de la máquina; el vibratorio añade una vibración mecánica que aumenta notablemente la eficacia de compactación, especialmente en suelos granulares" },
  { anverso: "¿Qué relación existe entre el uso de un compactador vibratorio y el Reglamento español de vibraciones mecánicas (RD 1311/2005), ya citado en Oficial Conductor Maquinaria Pesada?", reverso: "El RD 1311/2005 regula la exposición de los trabajadores a las vibraciones mecánicas, un riesgo laboral especialmente relevante en el manejo prolongado de compactadores vibratorios y otra maquinaria similar de movimiento de tierras" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es una motoniveladora y cuál es su función principal?", explicacion: "Máquina con cuchilla orientable para nivelar y perfilar superficies de tierra.", dificultad: "facil", opciones: ["Nivelar y perfilar superficies de tierra con una cuchilla orientable", "Excavar zanjas profundas mediante un brazo articulado con cuchara", "Compactar el terreno mediante un rodillo vibratorio de gran peso", "Transportar tierra a larga distancia mediante una caja basculante"], correcta: 0 },
  { enunciado: "¿Qué es un bulldozer y en qué se diferencia de una motoniveladora?", explicacion: "Máquina con cuchilla frontal robusta para empujar grandes volúmenes de tierra, no para el acabado fino.", dificultad: "media", opciones: ["Empuja grandes volúmenes de tierra, sin el acabado fino de la niveladora", "Cumple exactamente la misma función que una motoniveladora convencional", "Se utiliza exclusivamente para compactar superficies de gran extensión", "Se utiliza exclusivamente para excavar zanjas de gran profundidad"], correcta: 0 },
  { enunciado: "¿Cuál es la función principal de un compactador en una obra de movimiento de tierras?", explicacion: "Compactar el terreno o el relleno, reduciendo huecos de aire y aumentando su densidad.", dificultad: "media", opciones: ["Compactar el terreno reduciendo huecos de aire y aumentando su densidad", "Excavar y cargar tierra mediante un brazo articulado con cuchara", "Nivelar superficies mediante una cuchilla central orientable", "Transportar tierra a larga distancia mediante una caja basculante"], correcta: 0 },
  { enunciado: "¿Qué diferencia existe entre un compactador de rodillo liso y uno vibratorio?", explicacion: "El liso compacta por peso estático; el vibratorio añade vibración mecánica.", dificultad: "media", opciones: ["El vibratorio añade vibración mecánica que aumenta la eficacia", "Ambos tipos de compactador funcionan exactamente de la misma forma", "El rodillo liso siempre compacta mejor que cualquier compactador vibratorio", "El compactador vibratorio no se utiliza nunca en suelos granulares"], correcta: 0 },
  { enunciado: "¿Qué regula el RD 1311/2005 en relación con el uso de compactadores vibratorios?", explicacion: "La exposición de los trabajadores a las vibraciones mecánicas.", dificultad: "dificil", opciones: ["La exposición de los trabajadores a las vibraciones mecánicas", "La homologación técnica de los compactadores vibratorios en España", "El régimen de infracciones de tráfico aplicable a este tipo de maquinaria", "El Certificado de Aptitud Profesional exigido para manejar este tipo de máquina"], correcta: 0 },
]);

const S3 = "dumperes-y-metodos-generales-de-trabajo";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un dúmper y cuál es su función principal en una obra de movimiento de tierras?", reverso: "Un vehículo dotado de una caja o cuba basculante, destinado al transporte de tierras, áridos o escombros dentro de la propia obra o entre obras cercanas, descargando su contenido mediante el basculamiento de la caja" },
  { anverso: "¿Qué diferencia existe entre un dúmper rígido y uno articulado?", reverso: "El dúmper rígido tiene un chasis único sin articulación central, más estable mono terreno firme; el dúmper articulado tiene una unión central que permite un giro más cerrado entre la parte delantera y trasera, mejorando su maniobrabilidad en terrenos irregulares o de obra" },
  { anverso: "¿Qué es el método de trabajo en \"corte y relleno\", habitual en el movimiento de tierras?", reverso: "Un método que combina la excavación (corte) de tierra en las zonas más elevadas de un terreno con su traslado y compactación (relleno) en las zonas más bajas, buscando equilibrar el volumen de tierra movido y minimizar el transporte a vertedero" },
  { anverso: "¿Qué relevancia tiene la coordinación entre distintas máquinas (excavadora, dúmper, compactador) en un método de trabajo de movimiento de tierras?", reverso: "Una coordinación adecuada evita tiempos muertos (excavadora esperando al dúmper, o viceversa) y reduce riesgos de colisión o atropello entre máquinas que trabajan simultáneamente en una misma zona de la obra" },
  { anverso: "¿Qué riesgo adicional, señalado también por la NTP 126 del INSST, es propio del trabajo simultáneo de varias máquinas de movimiento de tierras en una misma zona?", reverso: "El riesgo de colisión entre máquinas o de atropello a otros trabajadores presentes en la obra, especialmente en maniobras de marcha atrás o en zonas de visibilidad reducida entre varias máquinas trabajando a la vez" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es un dúmper y cuál es su función principal?", explicacion: "Vehículo con caja basculante para transportar tierras, áridos o escombros en obra.", dificultad: "facil", opciones: ["Transportar tierras, áridos o escombros mediante una caja basculante", "Excavar zanjas profundas mediante un brazo articulado con cuchara", "Nivelar superficies mediante una cuchilla central orientable", "Compactar el terreno mediante un rodillo vibratorio de gran peso"], correcta: 0 },
  { enunciado: "¿Qué diferencia existe entre un dúmper rígido y uno articulado?", explicacion: "El articulado tiene una unión central que mejora su maniobrabilidad en terrenos irregulares.", dificultad: "media", opciones: ["El articulado mejora su maniobrabilidad en terrenos irregulares", "Ambos tipos de dúmper son técnicamente idénticos entre sí", "El dúmper rígido siempre tiene mayor capacidad de carga que el articulado", "El dúmper articulado no puede circular nunca fuera de la propia obra"], correcta: 0 },
  { enunciado: "¿En qué consiste el método de trabajo en \"corte y relleno\"?", explicacion: "Combina excavación en zonas altas con traslado y compactación en zonas bajas.", dificultad: "media", opciones: ["Combina excavación en zonas altas con relleno en zonas bajas", "Consiste exclusivamente en compactar toda la superficie de la obra", "Consiste exclusivamente en nivelar toda la superficie de la obra", "Consiste en transportar toda la tierra excavada directamente a vertedero"], correcta: 0 },
  { enunciado: "¿Qué relevancia tiene la coordinación entre distintas máquinas en un método de trabajo de movimiento de tierras?", explicacion: "Evita tiempos muertos y reduce riesgos de colisión o atropello.", dificultad: "media", opciones: ["Evita tiempos muertos y reduce riesgos de colisión o atropello", "No tiene ninguna relevancia real para el desarrollo de la obra", "Solo es relevante si las máquinas son de distintos fabricantes", "Solo es relevante durante la fase final de la obra, no al inicio"], correcta: 0 },
  { enunciado: "¿Qué riesgo adicional señala la NTP 126 propio del trabajo simultáneo de varias máquinas?", explicacion: "El riesgo de colisión entre máquinas o de atropello a otros trabajadores.", dificultad: "dificil", opciones: ["El riesgo de colisión entre máquinas o de atropello a trabajadores", "El riesgo exclusivo de avería mecánica simultánea de todas las máquinas", "El riesgo exclusivo de exceso de ruido ambiental en la zona de obra", "Ningún riesgo adicional distinto del ya señalado para una máquina aislada"], correcta: 0 },
]);

console.log(`📖 glosario...`);
await insertar("glosario", [
  { tema_slug: TEMA, seccion: S1, termino: "Zona muerta", definicion: "Área alrededor de una máquina de movimiento de tierras no visible o con visibilidad muy reducida para el operador, especialmente relevante en maniobras de marcha atrás o giro." },
  { tema_slug: TEMA, seccion: S1, termino: "Retroexcavadora", definicion: "Excavadora cuya cuchara excava tirando hacia el propio vehículo y por debajo de su nivel de apoyo, la configuración más habitual para zanjas y excavaciones bajo el nivel del suelo." },
  { tema_slug: TEMA, seccion: S2, termino: "Bulldozer", definicion: "Máquina sobre orugas con cuchilla frontal robusta, orientada a empujar grandes volúmenes de tierra o a desbrozar y allanar terrenos." },
  { tema_slug: TEMA, seccion: S2, termino: "Compactador vibratorio", definicion: "Compactador que añade vibración mecánica a su peso estático para aumentar la eficacia de compactación, especialmente en suelos granulares." },
  { tema_slug: TEMA, seccion: S3, termino: "Dúmper articulado", definicion: "Vehículo de transporte de tierras con una unión central entre la parte delantera y trasera que mejora su maniobrabilidad en terrenos irregulares o de obra." },
  { tema_slug: TEMA, seccion: S3, termino: "Corte y relleno", definicion: "Método de trabajo que combina la excavación de tierra en zonas elevadas con su traslado y compactación en zonas bajas, buscando equilibrar el volumen de tierra movido." },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 20 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 20, orden: 20, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-280 creado y vinculado como Tema 20 de Oficial Conductor General.");
