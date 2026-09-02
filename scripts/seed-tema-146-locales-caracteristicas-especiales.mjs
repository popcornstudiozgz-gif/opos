/**
 * Crea tema-146: "Instalaciones en locales de características especiales"
 * — Tema 14 (numero=14, bloque-2) de Oficial Electricista (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 12 oficial del Anexo I (bases2110.pdf, línea 1344):
 *   "Instalaciones en Locales de Características Especiales. Locales
 *   húmedos, mojados, con riesgo de corrosión y polvorientos. Locales de
 *   pública concurrencia (hospitales, espectáculos, etc.): requisitos
 *   específicos, suministros de reserva y de emergencia."
 *
 * Fuente primaria: Real Decreto 842/2002 (REBT) — BOE-A-2002-18099.
 * ITC-BT-30 (instalaciones en locales de características especiales:
 * húmedos, mojados, con riesgo de corrosión, polvorientos, con riesgo de
 * incendio o explosión), ITC-BT-28 (instalaciones en locales de pública
 * concurrencia: requisitos específicos y suministros complementarios de
 * socorro, reserva y duplicado).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-146-locales-caracteristicas-especiales.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-146";
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
  titulo: "Instalaciones en locales de características especiales",
  descripcion: "Locales húmedos, mojados, con riesgo de corrosión y polvorientos. Locales de pública concurrencia (hospitales, espectáculos, etc.): requisitos específicos, suministros de reserva y de emergencia.",
  contenido: "Desarrolla las prescripciones especiales que exige el REBT en locales con condiciones ambientales agravadas —húmedos, mojados, con riesgo de corrosión y polvorientos, conforme a la ITC-BT-30— y en locales de pública concurrencia —hospitales, salas de espectáculos, centros comerciales, entre otros, conforme a la ITC-BT-28—, incluyendo sus requisitos específicos y la exigencia de suministros complementarios de socorro, reserva y duplicado, así como el alumbrado de emergencia y señalización.",
  enlaces_boe: [
    { titulo: "Real Decreto 842/2002, Reglamento electrotécnico para baja tensión (ITC-BT-28, ITC-BT-30)", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2002-18099" },
  ],
  indice_estudio: [
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2002-18099", titulo: "Locales húmedos, mojados, con riesgo de corrosión y polvorientos", seccion: "locales-humedos-mojados-riesgo-corrosion-polvorientos", articulos: "ITC-BT-30" },
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2002-18099", titulo: "Locales de pública concurrencia: requisitos específicos", seccion: "locales-publica-concurrencia-requisitos-especificos", articulos: "ITC-BT-28" },
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2002-18099", titulo: "Suministros de reserva y de emergencia", seccion: "suministros-reserva-emergencia", articulos: "ITC-BT-28" },
  ],
}]);

const S1 = "locales-humedos-mojados-riesgo-corrosion-polvorientos";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué instrucción técnica complementaria regula las instalaciones en locales de características especiales?", reverso: "La ITC-BT-30" },
  { anverso: "¿Qué es un local húmedo, según la clasificación de la ITC-BT-30?", reverso: "Un local en el que, de forma habitual, la condensación de vapor de agua cubre parcialmente paredes y techos, con un ambiente saturado o próximo a la saturación de humedad" },
  { anverso: "¿Qué es un local mojado?", reverso: "Un local en el que el suelo, las paredes y los objetos se encuentran habitualmente cubiertos de humedad o de proyecciones de agua, con posible presencia de agua en el pavimento" },
  { anverso: "¿Qué prescripción especial exigen los locales húmedos o mojados respecto al material eléctrico instalado?", reverso: "Material con un grado de protección IP adecuado frente a la penetración de agua y humedad, y canalizaciones y mecanismos concebidos para resistir esas condiciones sin deterioro" },
  { anverso: "¿Qué es un local con riesgo de corrosión, según la ITC-BT-30?", reverso: "Un local en el que existen de forma habitual gases, vapores, polvo o depósitos de naturaleza corrosiva que pueden afectar a los materiales eléctricos instalados" },
  { anverso: "¿Qué es un local polvoriento, y qué distinción establece la ITC-BT-30 dentro de esta categoría?", reverso: "Un local en el que se produce o deposita polvo en cantidad apreciable; se distingue entre locales con polvo no conductor y locales con polvo conductor, exigiendo este último medidas de protección más estrictas" },
  { anverso: "¿Qué grado de protección (índice IP) es habitual exigir en el material eléctrico de un local mojado?", reverso: "Un grado de protección elevado frente a la proyección de agua (por ejemplo, IPX4 o superior, según las condiciones concretas del local), conforme a las tablas de la ITC-BT-30" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué instrucción técnica complementaria regula los locales húmedos, mojados, con riesgo de corrosión y polvorientos?", explicacion: "La ITC-BT-30.", dificultad: "media", opciones: ["La ITC-BT-30", "La ITC-BT-28", "La ITC-BT-25", "La ITC-BT-21"], correcta: 0 },
  { enunciado: "¿Qué caracteriza a un local húmedo según la ITC-BT-30?", explicacion: "La condensación habitual de vapor de agua sobre paredes y techos.", dificultad: "media", opciones: ["La condensación habitual de vapor de agua sobre paredes y techos", "La presencia constante de agua en el pavimento del local", "La presencia habitual de gases o vapores corrosivos", "La acumulación habitual de polvo conductor"], correcta: 0 },
  { enunciado: "¿Qué caracteriza a un local mojado según la ITC-BT-30?", explicacion: "Suelo, paredes y objetos habitualmente cubiertos de humedad o proyecciones de agua.", dificultad: "media", opciones: ["Suelo, paredes y objetos habitualmente cubiertos de humedad", "La presencia habitual de gases corrosivos exclusivamente", "La acumulación de polvo no conductor exclusivamente", "Una temperatura ambiente elevada de forma constante"], correcta: 0 },
  { enunciado: "¿Qué distinción especial establece la ITC-BT-30 dentro de los locales polvorientos?", explicacion: "Entre locales con polvo no conductor y locales con polvo conductor.", dificultad: "dificil", opciones: ["Entre locales con polvo no conductor y locales con polvo conductor", "Entre locales con polvo orgánico y locales con polvo inorgánico", "Entre locales con polvo fino y locales con polvo grueso", "No existe ninguna distinción especial dentro de esta categoría"], correcta: 0 },
  { enunciado: "¿Qué prescripción general exigen los locales húmedos o mojados respecto al material eléctrico?", explicacion: "Un grado de protección IP adecuado frente a la penetración de agua y humedad.", dificultad: "media", opciones: ["Un grado de protección IP adecuado frente al agua y la humedad", "Ninguna prescripción especial respecto al material estándar", "Únicamente un color identificativo distinto del material eléctrico", "Únicamente una potencia máxima limitada de los receptores"], correcta: 0 },
]);

const S2 = "locales-publica-concurrencia-requisitos-especificos";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué instrucción técnica complementaria regula las instalaciones eléctricas en locales de pública concurrencia?", reverso: "La ITC-BT-28" },
  { anverso: "¿Qué tipo de locales considera de pública concurrencia la ITC-BT-28?", reverso: "Aquellos con capacidad o afluencia de público relevante: hospitales, salas de espectáculos, centros comerciales, estaciones, centros de enseñanza, edificios de pública concurrencia en general" },
  { anverso: "¿Qué requisito específico exige, con carácter general, la ITC-BT-28 a las instalaciones eléctricas de estos locales?", reverso: "Requisitos reforzados de seguridad frente a incendio y frente a contactos eléctricos, en atención al mayor riesgo derivado de la elevada afluencia de personas y a la posible dificultad de evacuación" },
  { anverso: "¿Qué debe garantizarse, con carácter general, respecto a la instalación eléctrica de un hospital, como local de pública concurrencia?", reverso: "Una continuidad de suministro reforzada en las zonas críticas (quirófanos, unidades de cuidados intensivos), mediante los suministros complementarios que correspondan según su clasificación" },
  { anverso: "¿Qué tipo de cableado es habitual exigir en las zonas comunes de locales de pública concurrencia, en relación con el riesgo de incendio?", reverso: "Cableado con características de no propagación de la llama y de reducida emisión de humos y gases tóxicos, conforme a las prescripciones de la ITC-BT-28" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué instrucción técnica complementaria regula las instalaciones en locales de pública concurrencia?", explicacion: "La ITC-BT-28.", dificultad: "media", opciones: ["La ITC-BT-28", "La ITC-BT-30", "La ITC-BT-17", "La ITC-BT-24"], correcta: 0 },
  { enunciado: "¿Qué tipo de locales considera de pública concurrencia la ITC-BT-28?", explicacion: "Hospitales, salas de espectáculos, centros comerciales, entre otros con afluencia relevante de público.", dificultad: "facil", opciones: ["Hospitales, salas de espectáculos y centros comerciales, entre otros", "Únicamente las viviendas unifamiliares aisladas", "Únicamente los locales industriales de pequeña superficie", "Únicamente los locales con riesgo de corrosión"], correcta: 0 },
  { enunciado: "¿Por qué exige la ITC-BT-28 requisitos reforzados de seguridad en estos locales?", explicacion: "Por el mayor riesgo derivado de la elevada afluencia de personas y la posible dificultad de evacuación.", dificultad: "media", opciones: ["Por el mayor riesgo derivado de la elevada afluencia de personas", "Porque estos locales siempre tienen menor superficie que una vivienda", "Porque estos locales nunca disponen de suministro eléctrico continuo", "Porque la normativa los excluye del ámbito general del REBT"], correcta: 0 },
  { enunciado: "¿Qué tipo de cableado es habitual exigir en zonas comunes de locales de pública concurrencia?", explicacion: "Cableado con no propagación de la llama y reducida emisión de humos y gases tóxicos.", dificultad: "dificil", opciones: ["Cableado con no propagación de la llama y reducida emisión de humos tóxicos", "Cualquier tipo de cableado estándar, sin ninguna prescripción especial", "Únicamente cableado de aluminio, nunca de cobre", "Únicamente cableado sin ningún tipo de aislamiento"], correcta: 0 },
  { enunciado: "¿Qué zonas de un hospital, como local de pública concurrencia, requieren una continuidad de suministro especialmente reforzada?", explicacion: "Las zonas críticas, como quirófanos y unidades de cuidados intensivos.", dificultad: "media", opciones: ["Las zonas críticas, como quirófanos y unidades de cuidados intensivos", "Únicamente el aparcamiento exterior del hospital", "Únicamente las zonas administrativas del hospital", "Ninguna zona en particular, siendo todas equivalentes"], correcta: 0 },
]);

const S3 = "suministros-reserva-emergencia";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es el suministro de socorro en un local de pública concurrencia, según la ITC-BT-28?", reverso: "El suministro complementario destinado a asegurar el alumbrado y las señales de seguridad y de evacuación, permitiendo la finalización de un espectáculo o la evacuación del público con seguridad ante un fallo del suministro normal" },
  { anverso: "¿Qué es el suministro de reserva en un local de pública concurrencia?", reverso: "El suministro complementario capaz de sustituir al suministro normal en la totalidad o parte de la instalación, con la finalidad de mantener el servicio aunque falte el suministro habitual, con un tiempo de conmutación acorde a la actividad del local" },
  { anverso: "¿Qué es el suministro duplicado en un local de pública concurrencia?", reverso: "Aquel en el que la instalación receptora se alimenta a través de dos suministros independientes entre sí, de forma que un fallo en uno de ellos no afecta al otro, garantizando la continuidad de suministro" },
  { anverso: "¿Qué es el alumbrado de emergencia?", reverso: "El alumbrado que entra en funcionamiento automáticamente ante un fallo del alumbrado normal, con autonomía y nivel de iluminación suficientes para permitir la evacuación segura del local" },
  { anverso: "¿Qué es el alumbrado de señalización dentro del alumbrado de emergencia?", reverso: "El alumbrado que indica de modo permanente la situación de puertas, pasillos, escaleras y salidas de un local, para facilitar su localización durante una evacuación" },
  { anverso: "¿Cuál es la autonomía mínima habitual exigida al alumbrado de emergencia en locales de pública concurrencia?", reverso: "Una hora de funcionamiento autónomo desde el fallo del suministro normal, conforme a las prescripciones de la ITC-BT-28 y, complementariamente, del Código Técnico de la Edificación (DB-SUA 4)" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es el suministro de socorro en un local de pública concurrencia?", explicacion: "El destinado a asegurar el alumbrado y señales de seguridad y evacuación.", dificultad: "media", opciones: ["El destinado a asegurar el alumbrado y señales de seguridad y evacuación", "El suministro exclusivo para climatización del local", "El suministro que sustituye por completo al suministro normal en todo momento", "El suministro destinado exclusivamente a maquinaria de cocina"], correcta: 0 },
  { enunciado: "¿Qué es el suministro duplicado en un local de pública concurrencia?", explicacion: "Alimentación mediante dos suministros independientes entre sí.", dificultad: "media", opciones: ["Alimentación mediante dos suministros independientes entre sí", "Un único suministro con doble tarifa contratada", "Un suministro que dobla la potencia contratada del local", "Un suministro exclusivo para el alumbrado de emergencia"], correcta: 0 },
  { enunciado: "¿Qué es el alumbrado de emergencia?", explicacion: "El alumbrado que entra en funcionamiento automáticamente ante un fallo del alumbrado normal.", dificultad: "facil", opciones: ["El alumbrado que entra en funcionamiento automáticamente ante un fallo", "El alumbrado decorativo habitual de un local de espectáculos", "El alumbrado exterior de la fachada del edificio", "El alumbrado que solo se activa manualmente por el personal"], correcta: 0 },
  { enunciado: "¿Cuál es la autonomía mínima habitual exigida al alumbrado de emergencia en locales de pública concurrencia?", explicacion: "Una hora de funcionamiento autónomo.", dificultad: "media", opciones: ["Una hora", "Diez minutos", "Veinticuatro horas", "Cinco minutos"], correcta: 0 },
  { enunciado: "¿Qué función cumple el alumbrado de señalización dentro del alumbrado de emergencia?", explicacion: "Indica de modo permanente la situación de puertas, pasillos, escaleras y salidas.", dificultad: "media", opciones: ["Indica de modo permanente la situación de puertas, pasillos y salidas", "Ilumina exclusivamente el escenario de una sala de espectáculos", "Sustituye por completo al alumbrado normal del local en todo momento", "Se activa únicamente durante labores de mantenimiento del local"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 14 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 14, orden: 14, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-146 creado y vinculado como Tema 14 de Oficial Electricista.");
