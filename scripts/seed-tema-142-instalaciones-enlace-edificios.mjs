/**
 * Crea tema-142: "Instalaciones de enlace en edificios" — Tema 10
 * (numero=10, bloque-2) de Oficial Electricista (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 8 oficial del Anexo I (bases2110.pdf, línea 1328):
 *   "Instalaciones de Enlace en Edificios. Definición y partes que las
 *   componen: Caja General de Protección (CGP), Línea General de
 *   Alimentación (LGA), Centralización de Contadores, Derivación
 *   Individual (DI) e Interruptor de Control de Potencia (ICP). Esquemas
 *   de instalación."
 *
 * Fuente primaria: Real Decreto 842/2002 (REBT) — BOE-A-2002-18099.
 * ITC-BT-12 (esquemas de instalaciones de enlace), ITC-BT-13 (CGP),
 * ITC-BT-14 (LGA), ITC-BT-15 (DI), ITC-BT-16 (ubicación de contadores),
 * ITC-BT-17 (dispositivos generales e individuales de mando y
 * protección; ICP).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-142-instalaciones-enlace-edificios.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-142";
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
  titulo: "Instalaciones de enlace en edificios",
  descripcion: "Definición y partes que componen la instalación de enlace: Caja General de Protección (CGP), Línea General de Alimentación (LGA), centralización de contadores, Derivación Individual (DI) e Interruptor de Control de Potencia (ICP). Esquemas de instalación.",
  contenido: "Desarrolla la instalación de enlace de un edificio, que une la acometida de la empresa distribuidora con las instalaciones interiores o receptoras del usuario: la Caja General de Protección (CGP), la Línea General de Alimentación (LGA), la centralización de contadores, la Derivación Individual (DI) y el Interruptor de Control de Potencia (ICP), así como los esquemas habituales de instalación (contador único, centralización de contadores en edificio de varios usuarios).",
  enlaces_boe: [
    { titulo: "Real Decreto 842/2002, Reglamento electrotécnico para baja tensión (ITC-BT-12 a ITC-BT-17)", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2002-18099" },
  ],
  indice_estudio: [
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2002-18099", titulo: "Definición y esquemas de la instalación de enlace", seccion: "definicion-esquemas-instalacion-enlace", articulos: "ITC-BT-12" },
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2002-18099", titulo: "Caja General de Protección (CGP) y Línea General de Alimentación (LGA)", seccion: "caja-general-proteccion-linea-general-alimentacion", articulos: "ITC-BT-13, ITC-BT-14" },
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2002-18099", titulo: "Centralización de contadores, Derivación Individual (DI) e ICP", seccion: "centralizacion-contadores-derivacion-individual-icp", articulos: "ITC-BT-15, ITC-BT-16, ITC-BT-17" },
  ],
}]);

const S1 = "definicion-esquemas-instalacion-enlace";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es la instalación de enlace de un edificio, según el REBT?", reverso: "El conjunto de instalaciones eléctricas que une la acometida de la empresa distribuidora con las instalaciones interiores o receptoras del usuario, comprendiendo desde la CGP hasta el ICP" },
  { anverso: "¿Qué elementos componen, de forma general, la instalación de enlace de un edificio?", reverso: "La Caja General de Protección (CGP), la Línea General de Alimentación (LGA), la centralización de contadores, las Derivaciones Individuales (DI) y los dispositivos generales e individuales de mando y protección (con el Interruptor de Control de Potencia, ICP)" },
  { anverso: "¿Qué esquema de instalación de enlace es habitual en un edificio destinado a un único usuario?", reverso: "Un esquema simplificado en el que la CGP y la medida (contador) pueden agruparse en una única caja, sin necesidad de LGA independiente ni de centralización de contadores propiamente dicha" },
  { anverso: "¿Qué esquema de instalación de enlace es habitual en un edificio de varios usuarios (por ejemplo, un edificio de viviendas)?", reverso: "Un esquema con CGP única de entrada, LGA hasta la centralización de contadores, y una Derivación Individual independiente para cada usuario desde la centralización de contadores" },
  { anverso: "¿Quién es titular, con carácter general, de la Caja General de Protección y de la Línea General de Alimentación de un edificio?", reverso: "La propiedad del edificio, sin perjuicio de que la empresa distribuidora pueda intervenir en su verificación y en el precintado de determinados elementos" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es la instalación de enlace de un edificio?", explicacion: "El conjunto que une la acometida de la distribuidora con las instalaciones interiores del usuario.", dificultad: "facil", opciones: ["El conjunto que une la acometida con las instalaciones interiores del usuario", "Únicamente el cableado interior de una vivienda", "Únicamente la red de distribución exterior de la compañía eléctrica", "El conjunto de luminarias instaladas en las zonas comunes del edificio"], correcta: 0 },
  { enunciado: "¿Qué elementos componen, de forma general, la instalación de enlace?", explicacion: "CGP, LGA, centralización de contadores, DI e ICP.", dificultad: "media", opciones: ["CGP, LGA, centralización de contadores, DI e ICP", "Únicamente el cuadro de mando de cada vivienda", "Únicamente los enchufes e interruptores interiores", "Únicamente la acometida de la empresa distribuidora"], correcta: 0 },
  { enunciado: "¿Qué esquema de instalación de enlace es habitual en un edificio de varios usuarios?", explicacion: "CGP única, LGA hasta la centralización de contadores, y DI independiente para cada usuario.", dificultad: "media", opciones: ["CGP única, LGA y centralización de contadores con DI independiente por usuario", "Una CGP independiente para cada usuario del edificio", "Ninguna centralización de contadores, con un contador junto a cada CGP", "Una única DI compartida por todos los usuarios del edificio"], correcta: 0 },
  { enunciado: "¿Quién es titular, con carácter general, de la CGP y la LGA de un edificio?", explicacion: "La propiedad del edificio.", dificultad: "media", opciones: ["La propiedad del edificio", "Siempre la empresa distribuidora en exclusiva", "El Ayuntamiento del municipio en todo caso", "El primer usuario que solicita el suministro"], correcta: 0 },
  { enunciado: "¿Qué instrucción técnica complementaria regula los esquemas generales de la instalación de enlace?", explicacion: "La ITC-BT-12.", dificultad: "media", opciones: ["La ITC-BT-12", "La ITC-BT-24", "La ITC-BT-44", "La ITC-BT-03"], correcta: 0 },
]);

const S2 = "caja-general-proteccion-linea-general-alimentacion";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es la Caja General de Protección (CGP)?", reverso: "La caja que aloja los elementos de protección de la Línea General de Alimentación, marcando el inicio de la instalación de enlace del edificio y el límite con la acometida de la distribuidora" },
  { anverso: "¿Qué instrucción técnica complementaria regula la Caja General de Protección?", reverso: "La ITC-BT-13" },
  { anverso: "¿Dónde se ubica habitualmente la CGP de un edificio?", reverso: "En la fachada del edificio, en un lugar de libre y permanente acceso, o empotrada en un nicho de pared, de forma que resulte fácilmente accesible para su inspección y mantenimiento" },
  { anverso: "¿Qué elementos de protección incorpora la CGP?", reverso: "Fusibles de seguridad calibrados en cada uno de los conductores de fase o polares, dimensionados según la carga prevista" },
  { anverso: "¿Qué es la Línea General de Alimentación (LGA)?", reverso: "El conductor o conjunto de conductores que enlaza la Caja General de Protección con la centralización de contadores del edificio" },
  { anverso: "¿Qué instrucción técnica complementaria regula la Línea General de Alimentación?", reverso: "La ITC-BT-14" },
  { anverso: "¿Qué criterio determina la sección de los conductores de la LGA?", reverso: "La previsión de cargas del edificio (potencia total prevista), aplicando los criterios de caída de tensión máxima admisible e intensidad máxima admisible del conductor" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es la Caja General de Protección (CGP)?", explicacion: "La caja que aloja los elementos de protección de la LGA, en el inicio de la instalación de enlace.", dificultad: "facil", opciones: ["La caja que aloja los elementos de protección de la LGA", "El armario donde se ubican los contadores de cada usuario", "El dispositivo que limita la potencia contratada de cada vivienda", "El punto de conexión de la toma de tierra del edificio"], correcta: 0 },
  { enunciado: "¿Qué instrucción técnica complementaria regula la Caja General de Protección?", explicacion: "La ITC-BT-13.", dificultad: "media", opciones: ["La ITC-BT-13", "La ITC-BT-14", "La ITC-BT-15", "La ITC-BT-16"], correcta: 0 },
  { enunciado: "¿Qué elementos de protección incorpora habitualmente la CGP?", explicacion: "Fusibles de seguridad calibrados en los conductores de fase.", dificultad: "media", opciones: ["Fusibles de seguridad calibrados", "Un interruptor diferencial exclusivamente", "Un contador de energía activa", "Un interruptor de control de potencia (ICP)"], correcta: 0 },
  { enunciado: "¿Qué es la Línea General de Alimentación (LGA)?", explicacion: "El conductor que enlaza la CGP con la centralización de contadores.", dificultad: "facil", opciones: ["El conductor que enlaza la CGP con la centralización de contadores", "El conductor que enlaza cada contador con su vivienda correspondiente", "El conductor de la acometida exterior de la empresa distribuidora", "El conductor de puesta a tierra del edificio"], correcta: 0 },
  { enunciado: "¿Qué criterios determinan la sección de los conductores de la LGA?", explicacion: "La previsión de cargas, la caída de tensión máxima admisible y la intensidad máxima admisible.", dificultad: "dificil", opciones: ["Previsión de cargas, caída de tensión e intensidad máxima admisible", "Únicamente el color exigido para el aislamiento del conductor", "Únicamente la longitud total del edificio en metros", "Únicamente el número de plantas del edificio"], correcta: 0 },
]);

const S3 = "centralizacion-contadores-derivacion-individual-icp";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es la centralización de contadores de un edificio?", reverso: "El conjunto o agrupación de los contadores de energía eléctrica de los distintos usuarios de un mismo edificio, reunidos en un único lugar (local o armario) para facilitar su lectura y mantenimiento" },
  { anverso: "¿Qué instrucción técnica complementaria regula la ubicación y los sistemas de instalación de los contadores?", reverso: "La ITC-BT-16" },
  { anverso: "¿Qué es la Derivación Individual (DI)?", reverso: "El conductor o conjunto de conductores que enlaza cada equipo de medida (contador) con el correspondiente cuadro general de mando y protección del usuario" },
  { anverso: "¿Qué instrucción técnica complementaria regula las Derivaciones Individuales?", reverso: "La ITC-BT-15" },
  { anverso: "¿Qué es el Interruptor de Control de Potencia (ICP)?", reverso: "Un dispositivo que limita automáticamente el suministro eléctrico a la potencia contratada por el usuario, desconectando si esta se supera" },
  { anverso: "¿Dónde se ubica habitualmente el ICP en una vivienda?", reverso: "En el propio cuadro general de mando y protección de la vivienda, o en un lugar próximo a la centralización de contadores, según el criterio de la empresa distribuidora" },
  { anverso: "¿Qué instrucción técnica complementaria regula los dispositivos generales e individuales de mando y protección, incluido el ICP?", reverso: "La ITC-BT-17" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es la centralización de contadores?", explicacion: "La agrupación de los contadores de los distintos usuarios de un edificio en un único lugar.", dificultad: "facil", opciones: ["La agrupación de los contadores de un edificio en un único lugar", "El único contador general que mide el consumo de todo el edificio", "El dispositivo que limita la potencia contratada de cada usuario", "El conductor que enlaza la CGP con la LGA"], correcta: 0 },
  { enunciado: "¿Qué es la Derivación Individual (DI)?", explicacion: "El conductor que enlaza el contador con el cuadro de mando y protección del usuario.", dificultad: "media", opciones: ["El conductor que enlaza el contador con el cuadro del usuario", "El conductor que enlaza la CGP con la centralización de contadores", "El conductor de la acometida exterior de la distribuidora", "El conductor de puesta a tierra general del edificio"], correcta: 0 },
  { enunciado: "¿Qué instrucción técnica complementaria regula las Derivaciones Individuales?", explicacion: "La ITC-BT-15.", dificultad: "media", opciones: ["La ITC-BT-15", "La ITC-BT-13", "La ITC-BT-17", "La ITC-BT-18"], correcta: 0 },
  { enunciado: "¿Qué función cumple el Interruptor de Control de Potencia (ICP)?", explicacion: "Limita automáticamente el suministro a la potencia contratada.", dificultad: "facil", opciones: ["Limita automáticamente el suministro a la potencia contratada", "Mide la energía activa consumida por el usuario", "Protege frente a contactos indirectos exclusivamente", "Conecta la instalación a la red de tierra del edificio"], correcta: 0 },
  { enunciado: "¿Qué instrucción técnica complementaria regula los dispositivos generales e individuales de mando y protección, incluido el ICP?", explicacion: "La ITC-BT-17.", dificultad: "media", opciones: ["La ITC-BT-17", "La ITC-BT-15", "La ITC-BT-16", "La ITC-BT-24"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 10 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 10, orden: 10, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-142 creado y vinculado como Tema 10 de Oficial Electricista.");
