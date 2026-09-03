/**
 * Crea tema-219: "Normativa de tráfico, circulación de vehículos a motor y
 * seguridad vial" — Tema 7 (numero=7, bloque-2) de Oficial Conductor,
 * Especialidad Maquinaria Pesada (Ayto. Zaragoza). Primer tema de la parte
 * específica de esta oposición.
 *
 * Corresponde al TEMA 5 oficial del Anexo I (bases2110.pdf, línea 2091):
 *   "Normativa vigente en materia de tráfico, circulación de vehículos a
 *   motor y seguridad vial."
 *
 * Normativa verificada mediante WebSearch en esta sesión:
 * - Real Decreto Legislativo 6/2015, de 30 de octubre, texto refundido de
 *   la Ley sobre Tráfico, Circulación de Vehículos a Motor y Seguridad
 *   Vial (BOE-A-2015-11722).
 * - Real Decreto 1428/2003, de 21 de noviembre, Reglamento General de
 *   Circulación (BOE-A-2003-23514).
 * - Real Decreto 2822/1998, de 23 de diciembre, Reglamento General de
 *   Vehículos (BOE-A-1999-1826) — clasificación de vehículos especiales y
 *   maquinaria de obras.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-219-normativa-trafico-seguridad-vial.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-219";
const OPOSICION = "oficial-conductor-maquinaria-pesada-ayto-zaragoza";
const BLOQUE_2_ID = "388bfbfc-396e-4de2-8897-09532d6a0bcd";

const RDLEG_6_2015 = "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11722";
const RD_1428_2003 = "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514";
const RD_2822_1998 = "https://www.boe.es/buscar/act.php?id=BOE-A-1999-1826";

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
  titulo: "Normativa de tráfico, circulación y seguridad vial",
  descripcion: "La Ley sobre Tráfico, Circulación de Vehículos a Motor y Seguridad Vial. El Reglamento General de Circulación: normas de comportamiento. Vehículos especiales y maquinaria de obras: clasificación y autorizaciones de circulación.",
  contenido: "Desarrolla el marco normativo estatal vigente en materia de tráfico: el texto refundido de la Ley sobre Tráfico, Circulación de Vehículos a Motor y Seguridad Vial (RDLeg 6/2015), que fija los principios y normas de comportamiento en la circulación; el Reglamento General de Circulación (RD 1428/2003), que desarrolla esas normas de comportamiento, señalización, prioridad y velocidad; y el régimen de los vehículos especiales y la maquinaria de obras conforme al Reglamento General de Vehículos (RD 2822/1998), incluidas las autorizaciones complementarias de circulación que puede requerir su desplazamiento por vía pública.",
  enlaces_boe: [
    { url: RDLEG_6_2015, titulo: "RDLeg 6/2015 — texto refundido de la Ley sobre Tráfico, Circulación de Vehículos a Motor y Seguridad Vial" },
    { url: RD_1428_2003, titulo: "RD 1428/2003 — Reglamento General de Circulación" },
    { url: RD_2822_1998, titulo: "RD 2822/1998 — Reglamento General de Vehículos" },
  ],
  indice_estudio: [
    { url: RDLEG_6_2015, titulo: "La Ley sobre Tráfico, Circulación de Vehículos a Motor y Seguridad Vial", seccion: "ley-trafico-seguridad-vial-objeto-estructura", articulos: "RDLeg 6/2015" },
    { url: RD_1428_2003, titulo: "El Reglamento General de Circulación: normas de comportamiento", seccion: "reglamento-general-circulacion-normas-comportamiento", articulos: "RD 1428/2003" },
    { url: RD_2822_1998, titulo: "Vehículos especiales y maquinaria de obras: clasificación y autorizaciones", seccion: "vehiculos-especiales-maquinaria-obras-autorizaciones", articulos: "RD 2822/1998, RD 1428/2003" },
  ],
}]);

const S1 = "ley-trafico-seguridad-vial-objeto-estructura";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué norma constituye el marco estatal básico en materia de tráfico y seguridad vial?", reverso: "El Real Decreto Legislativo 6/2015, de 30 de octubre, por el que se aprueba el texto refundido de la Ley sobre Tráfico, Circulación de Vehículos a Motor y Seguridad Vial (LTSV), que refunde en un único texto la Ley de 1990 y sus modificaciones posteriores" },
  { anverso: "¿Cuál es el objeto de la Ley sobre Tráfico, Circulación de Vehículos a Motor y Seguridad Vial?", reverso: "Regular el uso y tráfico de las vías públicas, así como la actividad administrativa relativa al tráfico, con la finalidad principal de garantizar la seguridad vial y proteger a las personas usuarias de las vías" },
  { anverso: "¿A qué vías resulta de aplicación la Ley sobre Tráfico, Circulación de Vehículos a Motor y Seguridad Vial?", reverso: "A las vías y terrenos públicos aptos para la circulación, tanto urbanos como interurbanos, y a las vías y terrenos privados de uso común general, con las particularidades que la propia ley establece" },
  { anverso: "¿Qué es una norma de comportamiento en la circulación, en el sentido de la LTSV?", reverso: "Una regla de conducta exigible a las personas usuarias de la vía (conductoras, peatonas, ciclistas) para garantizar la seguridad de la circulación, cuyo incumplimiento puede dar lugar a una infracción administrativa" },
  { anverso: "¿Qué tipo de vehículo es una máquina como una excavadora o una pala cargadora, a efectos de la normativa de tráfico?", reverso: "Un vehículo especial, sometido a las normas generales de circulación con las particularidades y limitaciones específicas que establecen el Reglamento General de Vehículos y el Reglamento General de Circulación para este tipo de vehículos" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué norma constituye el marco estatal básico en materia de tráfico y seguridad vial?", explicacion: "El RDLeg 6/2015, texto refundido de la Ley sobre Tráfico, Circulación de Vehículos a Motor y Seguridad Vial.", dificultad: "facil", opciones: ["El RDLeg 6/2015, texto refundido de la Ley de Tráfico", "El Reglamento General de Circulación exclusivamente", "El Reglamento General de Vehículos exclusivamente", "El Código Penal exclusivamente"], correcta: 0 },
  { enunciado: "¿Cuál es la finalidad principal de la Ley sobre Tráfico, Circulación de Vehículos a Motor y Seguridad Vial?", explicacion: "Garantizar la seguridad vial y proteger a las personas usuarias de las vías.", dificultad: "media", opciones: ["Garantizar la seguridad vial de las personas usuarias", "Regular exclusivamente el régimen fiscal de los vehículos", "Regular exclusivamente la fabricación de vehículos", "Regular exclusivamente los seguros de responsabilidad civil"], correcta: 0 },
  { enunciado: "¿A qué tipo de vías resulta de aplicación la LTSV, con carácter general?", explicacion: "A las vías y terrenos públicos aptos para la circulación, urbanos e interurbanos, y a las de uso común general.", dificultad: "media", opciones: ["A las vías públicas y a las privadas de uso común general", "Únicamente a las vías interurbanas del Estado", "Únicamente a las vías urbanas de los municipios", "Únicamente a las vías privadas de uso exclusivo"], correcta: 0 },
  { enunciado: "¿Qué es una norma de comportamiento en la circulación?", explicacion: "Una regla de conducta exigible a las personas usuarias de la vía para garantizar la seguridad.", dificultad: "media", opciones: ["Una regla de conducta exigible a las personas usuarias de la vía", "Una recomendación sin ningún carácter exigible", "Una norma aplicable solo a los vehículos de gran tonelaje", "Una norma aplicable solo en horario nocturno"], correcta: 0 },
  { enunciado: "¿Qué consideración tiene, a efectos de tráfico, una máquina como una excavadora?", explicacion: "La de vehículo especial, con normas de circulación específicas.", dificultad: "dificil", opciones: ["Vehículo especial, con normas de circulación específicas", "No tiene ninguna consideración a efectos de tráfico", "Se equipara siempre a un turismo sin ninguna particularidad", "Solo tiene normas de tráfico si circula por autopista"], correcta: 0 },
]);

const S2 = "reglamento-general-circulacion-normas-comportamiento";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué desarrolla el Reglamento General de Circulación (RD 1428/2003)?", reverso: "Las normas de comportamiento en la circulación establecidas por la Ley sobre Tráfico, Circulación de Vehículos a Motor y Seguridad Vial: normas de prioridad, velocidad, adelantamiento, maniobras, sentido de circulación, señalización y estacionamiento, entre otras" },
  { anverso: "¿Qué es la señalización, según el Reglamento General de Circulación?", reverso: "El conjunto de señales y órdenes de la autoridad reguladora del tráfico, semáforos, señales verticales y horizontales, y marcas viales, que tienen preferencia sobre las normas generales de circulación cuando existan discrepancias entre ambas" },
  { anverso: "¿Qué regla general de prioridad establece el Reglamento General de Circulación en las intersecciones, salvo señalización en contrario?", reverso: "La prioridad de paso corresponde al vehículo que circula por la derecha, salvo que exista una señal, semáforo o agente que regule la prioridad de otra forma en esa intersección concreta" },
  { anverso: "¿Qué límite de velocidad general aplica, de forma orientativa, a un vehículo especial o máquina de obras circulando por una vía interurbana, salvo indicación distinta de su ficha técnica o autorización específica?", reverso: "La velocidad máxima que fije su propia ficha técnica o autorización de circulación (habitualmente reducida, dada la naturaleza del vehículo), que puede ser inferior a los límites generales aplicables a los vehículos ordinarios en ese mismo tipo de vía" },
  { anverso: "¿Qué obligación de comportamiento general impone el Reglamento General de Circulación a toda persona conductora, incluida la de un vehículo especial o maquinaria pesada?", reverso: "El deber de mantener su propia libertad de movimientos, el campo necesario de visión y la atención permanente a la conducción, que garanticen su propia seguridad, la del resto de personas usuarias de la vía y la de terceros" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué desarrolla el Reglamento General de Circulación (RD 1428/2003)?", explicacion: "Las normas de comportamiento en la circulación establecidas por la Ley de Tráfico.", dificultad: "facil", opciones: ["Las normas de comportamiento en la circulación", "Exclusivamente el régimen de infracciones y sanciones", "Exclusivamente los requisitos técnicos de los vehículos", "Exclusivamente el régimen de los permisos de conducción"], correcta: 0 },
  { enunciado: "¿Qué prioridad tiene la señalización semafórica o de un agente respecto de las normas generales de circulación cuando existe discrepancia entre ambas?", explicacion: "La señalización o la orden del agente prevalecen sobre la norma general de circulación.", dificultad: "media", opciones: ["Prevalece la señalización o la orden del agente", "Prevalece siempre la norma general de circulación", "Ambas tienen exactamente el mismo valor jurídico", "Ninguna de las dos es de aplicación en ese supuesto"], correcta: 0 },
  { enunciado: "¿Cuál es la regla general de prioridad en una intersección sin señalización específica?", explicacion: "Prioridad del vehículo que circula por la derecha.", dificultad: "media", opciones: ["Prioridad del vehículo que circula por la derecha", "Prioridad del vehículo de mayor tamaño o tonelaje", "Prioridad del vehículo que circula con mayor velocidad", "No existe ninguna regla general en ese supuesto"], correcta: 0 },
  { enunciado: "¿Qué determina, de forma orientativa, el límite de velocidad aplicable a un vehículo especial o máquina de obras?", explicacion: "Su propia ficha técnica o autorización de circulación, habitualmente reducida.", dificultad: "dificil", opciones: ["Su propia ficha técnica o autorización de circulación", "Siempre el límite general máximo de la vía por la que circula", "Nunca existe un límite específico distinto del general", "Únicamente lo que decida en cada momento la persona conductora"], correcta: 0 },
  { enunciado: "¿Qué deber de comportamiento general impone el Reglamento General de Circulación a toda persona conductora?", explicacion: "Mantener la libertad de movimientos, el campo de visión y la atención permanente a la conducción.", dificultad: "media", opciones: ["Mantener libertad de movimientos, visión y atención permanente", "Ningún deber específico distinto de respetar los límites de velocidad", "Únicamente el deber de llevar el permiso de conducción consigo", "Únicamente el deber de circular con las luces encendidas"], correcta: 0 },
]);

const S3 = "vehiculos-especiales-maquinaria-obras-autorizaciones";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un vehículo especial, según el Reglamento General de Vehículos (RD 2822/1998)?", reverso: "Todo vehículo autopropulsado, o remolcado, distinto de los definidos en el resto de categorías del reglamento, concebido y construido para realizar obras o servicios determinados, que por sus características está exceptuado de cumplir alguna de las condiciones técnicas exigidas con carácter general" },
  { anverso: "¿En qué grupo clasifica el Reglamento General de Circulación a la maquinaria de obras y servicios que, por su propia construcción, supera de forma permanente las masas o dimensiones máximas autorizadas?", reverso: "En el grupo 3 de vehículos que precisan autorización complementaria de circulación (junto al grupo 1, transporte especial de cargas indivisibles, y al grupo 2, vehículos especiales agrícolas)" },
  { anverso: "¿Qué es una autorización complementaria de circulación (ACC), en el contexto de un vehículo del grupo 3 como una máquina de obras?", reverso: "El permiso administrativo que habilita a un vehículo especial que supera permanentemente las masas o dimensiones máximas para circular por las vías objeto de la ley, en las condiciones y con las limitaciones que en ella se determinen" },
  { anverso: "¿Qué elementos de seguridad debe portar, con carácter general, una máquina de obras o vehículo especial al desplazarse por vía pública hasta el lugar de los trabajos?", reverso: "Los dispositivos de señalización y alumbrado que le sean exigibles según su tipo (luces, catadióptricos, señal V-20 de vehículo lento si corresponde), además de cumplir las condiciones de anchura, longitud y masa que fije su autorización" },
  { anverso: "¿Qué diferencia existe entre la circulación de una máquina de obras por vía pública para desplazarse hasta el tajo, y su utilización dentro del propio recinto o zona de obras?", reverso: "El desplazamiento por vía pública queda sometido a la normativa de tráfico y seguridad vial (LTSV, Reglamento General de Circulación y de Vehículos); dentro del recinto de obras, sin tránsito de terceros, rigen principalmente las normas de prevención de riesgos laborales propias del centro de trabajo" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es un vehículo especial, según el Reglamento General de Vehículos?", explicacion: "Un vehículo concebido para obras o servicios determinados, exceptuado de alguna condición técnica general.", dificultad: "media", opciones: ["Un vehículo concebido para obras o servicios determinados", "Cualquier vehículo con más de dos ejes, sin más requisitos", "Cualquier vehículo con matrícula extranjera temporal", "Cualquier vehículo destinado al transporte escolar"], correcta: 0 },
  { enunciado: "¿En qué grupo clasifica la normativa a la maquinaria de obras que supera de forma permanente las masas o dimensiones máximas?", explicacion: "En el grupo 3 de vehículos que precisan autorización complementaria de circulación.", dificultad: "media", opciones: ["Grupo 3, vehículos especiales de obras y servicios", "Grupo 1, transporte especial de cargas indivisibles", "Grupo 2, vehículos especiales agrícolas", "No existe ninguna clasificación por grupos en esta materia"], correcta: 0 },
  { enunciado: "¿Qué es una autorización complementaria de circulación (ACC)?", explicacion: "El permiso que habilita a circular a un vehículo especial que supera las masas o dimensiones máximas.", dificultad: "media", opciones: ["El permiso que habilita a circular a un vehículo especial", "Un distintivo meramente informativo sin efectos administrativos", "Un seguro obligatorio adicional para maquinaria pesada", "Un carné específico exigido solo al operador de la máquina"], correcta: 0 },
  { enunciado: "¿Qué debe portar, con carácter general, una máquina de obras al desplazarse por vía pública?", explicacion: "Los dispositivos de señalización y alumbrado exigibles según su tipo.", dificultad: "facil", opciones: ["Los dispositivos de señalización y alumbrado exigibles", "Ningún dispositivo adicional distinto del resto de vehículos", "Únicamente una bandera roja portada por un peatón guía", "Únicamente distintivos de empresa, sin exigencia de seguridad"], correcta: 0 },
  { enunciado: "¿Qué normativa rige principalmente el uso de una máquina de obras dentro del propio recinto de la obra, sin tránsito de terceros?", explicacion: "Las normas de prevención de riesgos laborales propias del centro de trabajo, más que la normativa de tráfico.", dificultad: "dificil", opciones: ["Las normas de prevención de riesgos laborales del centro de trabajo", "Exclusivamente el Reglamento General de Circulación", "Exclusivamente la Ley de Tráfico, sin ninguna otra norma aplicable", "Ninguna normativa resulta de aplicación dentro de un recinto de obras"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 7 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 7, orden: 7, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-219 creado y vinculado como Tema 7 de Oficial Conductor Maquinaria Pesada.");
