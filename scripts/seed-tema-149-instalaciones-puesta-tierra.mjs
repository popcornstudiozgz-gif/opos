/**
 * Crea tema-149: "Instalaciones de puesta a tierra" — Tema 17
 * (numero=17, bloque-2) de Oficial Electricista (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 15 oficial del Anexo I (bases2110.pdf, línea 1358):
 *   "Instalaciones de Puesta a Tierra. Objeto y partes de una puesta a
 *   tierra: electrodos (picas, placas, conductor enterrado), línea de
 *   enlace con tierra, bornes de puesta a tierra y conductores de
 *   protección. Medida de la resistencia de tierra (telurómetro)."
 *
 * Fuente primaria: Real Decreto 842/2002 (REBT) — BOE-A-2002-18099.
 * ITC-BT-18 (puestas a tierra: objeto, elementos y ejecución).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-149-instalaciones-puesta-tierra.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-149";
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
  titulo: "Instalaciones de puesta a tierra",
  descripcion: "Objeto y partes de una puesta a tierra: electrodos (picas, placas, conductor enterrado), línea de enlace con tierra, bornes de puesta a tierra y conductores de protección. Medida de la resistencia de tierra (telurómetro).",
  contenido: "Desarrolla la instalación de puesta a tierra de un edificio conforme a la ITC-BT-18 del REBT: su objeto (limitar la tensión que puedan presentar las masas metálicas y facilitar el paso a tierra de las corrientes de defecto), sus partes (electrodos, línea de enlace con tierra, bornes de puesta a tierra y conductores de protección), y la medida de la resistencia de tierra mediante telurómetro, instrumento y método imprescindibles para comprobar la eficacia real de la instalación.",
  enlaces_boe: [
    { titulo: "Real Decreto 842/2002, Reglamento electrotécnico para baja tensión (ITC-BT-18)", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2002-18099" },
  ],
  indice_estudio: [
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2002-18099", titulo: "Objeto de la puesta a tierra y tipos de electrodos", seccion: "objeto-partes-puesta-tierra-electrodos", articulos: "ITC-BT-18" },
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2002-18099", titulo: "Línea de enlace con tierra, bornes y conductores de protección", seccion: "linea-enlace-tierra-bornes-conductores-proteccion", articulos: "ITC-BT-18" },
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2002-18099", titulo: "Medida de la resistencia de tierra (telurómetro)", seccion: "medida-resistencia-tierra-telurometro", articulos: "ITC-BT-18" },
  ],
}]);

const S1 = "objeto-partes-puesta-tierra-electrodos";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué instrucción técnica complementaria regula las puestas a tierra?", reverso: "La ITC-BT-18" },
  { anverso: "¿Cuál es el objeto de una puesta a tierra, según la ITC-BT-18?", reverso: "Limitar la tensión que, con respecto a tierra, puedan presentar en un momento dado las masas metálicas, asegurar la actuación de las protecciones y eliminar o disminuir el riesgo que supone una avería en el material eléctrico utilizado" },
  { anverso: "¿Qué es un electrodo de puesta a tierra?", reverso: "El elemento metálico enterrado que está en contacto directo con el terreno, permitiendo el paso a tierra de las corrientes de defecto o la carga eléctrica estática" },
  { anverso: "¿Qué es una pica de puesta a tierra?", reverso: "Un electrodo formado por una barra metálica (habitualmente de acero recubierto de cobre) que se hinca verticalmente en el terreno" },
  { anverso: "¿Qué es una placa de puesta a tierra?", reverso: "Un electrodo formado por una placa metálica que se entierra en posición vertical, en contacto directo con el terreno" },
  { anverso: "¿Qué es un conductor enterrado horizontalmente como electrodo de puesta a tierra?", reverso: "Un conductor (desnudo o con cubierta adecuada) que se instala enterrado en el fondo de las zanjas de cimentación de un edificio, formando parte del sistema de electrodos de la instalación" },
  { anverso: "¿Qué factores influyen en la resistividad del terreno, y por tanto en la eficacia de un electrodo de puesta a tierra?", reverso: "El tipo de terreno (arcilloso, arenoso, rocoso), su humedad, la temperatura, y la presencia de sales u otros elementos que favorezcan o dificulten la conductividad eléctrica del suelo" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué instrucción técnica complementaria regula las puestas a tierra?", explicacion: "La ITC-BT-18.", dificultad: "media", opciones: ["La ITC-BT-18", "La ITC-BT-24", "La ITC-BT-47", "La ITC-BT-17"], correcta: 0 },
  { enunciado: "¿Cuál es el objeto principal de una puesta a tierra?", explicacion: "Limitar la tensión de las masas metálicas y facilitar la actuación de las protecciones.", dificultad: "media", opciones: ["Limitar la tensión de las masas metálicas y facilitar las protecciones", "Aumentar la potencia contratada de la instalación", "Reducir el consumo eléctrico general del edificio", "Sustituir por completo a la necesidad de aislamiento de los conductores"], correcta: 0 },
  { enunciado: "¿Qué es una pica de puesta a tierra?", explicacion: "Una barra metálica que se hinca verticalmente en el terreno.", dificultad: "facil", opciones: ["Una barra metálica que se hinca verticalmente en el terreno", "Un conductor que se instala en el interior de una vivienda", "Un dispositivo que mide la resistencia de tierra", "Un elemento del cuadro general de mando y protección"], correcta: 0 },
  { enunciado: "¿Qué es un conductor enterrado horizontalmente como electrodo de puesta a tierra?", explicacion: "Un conductor instalado en el fondo de las zanjas de cimentación.", dificultad: "media", opciones: ["Un conductor instalado en el fondo de las zanjas de cimentación", "Un conductor que enlaza la CGP con la centralización de contadores", "Un conductor exclusivo del circuito de alumbrado de emergencia", "Un conductor que enlaza el ICP con el cuadro general de la vivienda"], correcta: 0 },
  { enunciado: "¿Qué factores influyen en la resistividad del terreno y, por tanto, en la eficacia de un electrodo de tierra?", explicacion: "Tipo de terreno, humedad, temperatura y presencia de sales, entre otros.", dificultad: "dificil", opciones: ["Tipo de terreno, humedad y temperatura, entre otros", "Únicamente el color del terreno en superficie", "Únicamente la profundidad exacta a la que se entierra el electrodo", "Únicamente el fabricante del electrodo instalado"], correcta: 0 },
]);

const S2 = "linea-enlace-tierra-bornes-conductores-proteccion";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es la línea de enlace con tierra?", reverso: "El conductor que une los electrodos de puesta a tierra con el borne principal de tierra, sin ningún tipo de protección o interruptor en su recorrido" },
  { anverso: "¿Qué es el borne principal de puesta a tierra?", reverso: "El elemento que permite la unión de los conductores de tierra, de protección y de enlace equipotencial con la línea de enlace con tierra, situado en un lugar accesible para su inspección, medición y, en su caso, desconexión" },
  { anverso: "¿Por qué debe ser desmontable el borne principal de puesta a tierra?", reverso: "Para permitir la desconexión de la línea de enlace con tierra y así poder medir la resistencia del electrodo de forma aislada del resto de la instalación" },
  { anverso: "¿Qué es un conductor de protección?", reverso: "El conductor que une eléctricamente las masas de una instalación con el borne principal de tierra, para garantizar la protección contra contactos indirectos" },
  { anverso: "¿Qué es la conexión equipotencial?", reverso: "La unión eléctrica entre las masas metálicas de una instalación y los elementos conductores extraños (tuberías de agua, gas, estructuras metálicas) para evitar diferencias de potencial peligrosas entre ellos" },
  { anverso: "¿Qué sección mínima orientativa suele exigirse a un conductor de tierra enterrado de cobre desnudo, según la ITC-BT-18?", reverso: "25 mm², salvo que esté protegido contra la corrosión y contra daños mecánicos, en cuyo caso puede admitirse una sección menor" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es la línea de enlace con tierra?", explicacion: "El conductor que une los electrodos con el borne principal de tierra, sin protección en su recorrido.", dificultad: "media", opciones: ["El conductor que une los electrodos con el borne principal de tierra", "El conductor que enlaza la CGP con la LGA del edificio", "El conductor que protege frente a sobretensiones transitorias", "El conductor que alimenta el alumbrado de emergencia"], correcta: 0 },
  { enunciado: "¿Qué es el borne principal de puesta a tierra?", explicacion: "El elemento que une los conductores de tierra, protección y enlace equipotencial con la línea de enlace con tierra.", dificultad: "media", opciones: ["El elemento que une los conductores de tierra y protección con la línea de enlace", "El elemento que limita la potencia contratada del usuario", "El elemento que mide la intensidad consumida por la instalación", "El elemento que protege frente a contactos directos exclusivamente"], correcta: 0 },
  { enunciado: "¿Por qué debe ser desmontable el borne principal de puesta a tierra?", explicacion: "Para poder medir la resistencia del electrodo de forma aislada.", dificultad: "dificil", opciones: ["Para poder medir la resistencia del electrodo de forma aislada", "Para facilitar exclusivamente su limpieza periódica", "Porque así lo exige el fabricante del material eléctrico", "Para poder aumentar su sección con el paso del tiempo"], correcta: 0 },
  { enunciado: "¿Qué es un conductor de protección?", explicacion: "Une eléctricamente las masas con el borne principal de tierra.", dificultad: "media", opciones: ["Une eléctricamente las masas con el borne principal de tierra", "Une la CGP con la centralización de contadores del edificio", "Protege frente a sobreintensidades de un circuito concreto", "Regula la tensión de la instalación de forma automática"], correcta: 0 },
  { enunciado: "¿Qué es la conexión equipotencial?", explicacion: "Une eléctricamente masas y elementos conductores extraños para evitar diferencias de potencial peligrosas.", dificultad: "dificil", opciones: ["Une masas y elementos conductores extraños evitando diferencias de potencial", "Sustituye por completo a la necesidad de electrodos de puesta a tierra", "Es exclusiva de instalaciones de alta tensión, nunca de baja tensión", "Se aplica únicamente a instalaciones de alumbrado exterior"], correcta: 0 },
]);

const S3 = "medida-resistencia-tierra-telurometro";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es la resistencia de tierra de una instalación?", reverso: "La oposición que ofrece el conjunto formado por el electrodo y el terreno que lo rodea al paso de la corriente eléctrica hacia tierra, expresada en ohmios (Ω)" },
  { anverso: "¿Qué instrumento se emplea para medir la resistencia de tierra de una instalación?", reverso: "El telurómetro (también llamado medidor de tierra), que aplica una corriente de medida a través del electrodo y calcula la resistencia resultante" },
  { anverso: "¿Por qué es importante mantener un valor bajo de resistencia de tierra en una instalación?", reverso: "Porque cuanto menor sea la resistencia de tierra, menor será la tensión de contacto que puede aparecer en una masa ante un defecto, y más eficaz será la actuación de las protecciones (especialmente del interruptor diferencial) para desconectar la instalación" },
  { anverso: "¿Qué relación debe cumplirse entre la resistencia de tierra y la sensibilidad del interruptor diferencial, para garantizar una tensión de contacto segura?", reverso: "El producto de la resistencia de tierra por la sensibilidad del diferencial debe ser inferior a la tensión de contacto máxima admisible (habitualmente 24 V en locales húmedos o mojados, y 50 V en locales secos), conforme al criterio de la ITC-BT-24 y la ITC-BT-18" },
  { anverso: "¿Con qué periodicidad es recomendable comprobar la resistencia de tierra de una instalación, especialmente en terrenos secos o de resistividad variable?", reverso: "Con una periodicidad regular (al menos anual, en la época más seca del año, cuando la resistividad del terreno suele ser mayor), además de tras cualquier reparación o modificación de la instalación de tierra" },
  { anverso: "¿Qué método habitual emplea un telurómetro para medir la resistencia de tierra sin desenterrar el electrodo?", reverso: "El método de las tres picas (o método volt-amperimétrico), que utiliza el electrodo a medir junto con dos picas auxiliares clavadas en el terreno a distancias determinadas" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué instrumento se emplea para medir la resistencia de tierra de una instalación?", explicacion: "El telurómetro.", dificultad: "facil", opciones: ["El telurómetro", "El polímetro exclusivamente", "La pinza amperimétrica exclusivamente", "El luxómetro"], correcta: 0 },
  { enunciado: "¿En qué unidad se expresa la resistencia de tierra de una instalación?", explicacion: "En ohmios (Ω).", dificultad: "facil", opciones: ["Ohmios (Ω)", "Voltios (V)", "Amperios (A)", "Vatios (W)"], correcta: 0 },
  { enunciado: "¿Por qué es importante mantener un valor bajo de resistencia de tierra?", explicacion: "Reduce la tensión de contacto ante un defecto y mejora la actuación de las protecciones.", dificultad: "media", opciones: ["Reduce la tensión de contacto ante un defecto y mejora las protecciones", "Aumenta la potencia contratada disponible en la instalación", "Reduce el consumo eléctrico general del edificio", "Sustituye por completo a la necesidad de interruptor diferencial"], correcta: 0 },
  { enunciado: "¿Qué método habitual emplea un telurómetro para medir la resistencia de tierra sin desenterrar el electrodo?", explicacion: "El método de las tres picas (volt-amperimétrico).", dificultad: "dificil", opciones: ["El método de las tres picas", "El método de la caída de tensión en el conductor de fase", "El método del cortocircuito controlado del electrodo", "El método de la medida directa con un amperímetro de pinza"], correcta: 0 },
  { enunciado: "¿Con qué periodicidad es recomendable comprobar la resistencia de tierra de una instalación?", explicacion: "Con periodicidad regular, al menos anual, especialmente en época seca.", dificultad: "media", opciones: ["Con periodicidad regular, al menos anual", "Una única vez, en el momento de la puesta en servicio de la instalación", "Cada diez años como máximo, sin excepción alguna", "Nunca, si la instalación no ha presentado ninguna incidencia previa"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 17 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 17, orden: 17, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-149 creado y vinculado como Tema 17 de Oficial Electricista.");
