/**
 * Crea tema-231: "Mantenimiento de maquinaria" — Tema 19 (numero=19,
 * bloque-2) de Oficial Conductor, Especialidad Maquinaria Pesada (Ayto.
 * de Zaragoza).
 *
 * Corresponde al TEMA 17 oficial del Anexo I (bases2110.pdf, línea
 * 2172): "Mantenimiento de maquinaria (excavadora, cargadora, mini
 * excavadora y maquinaria de obras). Verificar niveles. Líquidos para
 * mantenimiento de niveles. Confección de partes de avería y
 * mantenimiento."
 *
 * Normativa ya citada y verificada en esta oposición:
 * - RD 1215/1997, de 18 de julio, equipos de trabajo (BOE-A-1997-17824)
 *   — exige que los equipos de trabajo se mantengan en buen estado
 *   mediante un mantenimiento adecuado (art. 3), ya introducido en
 *   tema-220.
 * El resto (verificación de niveles, líquidos, partes de mantenimiento)
 * es conocimiento técnico consolidado del oficio.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-231-mantenimiento-maquinaria.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-231";
const OPOSICION = "oficial-conductor-maquinaria-pesada-ayto-zaragoza";
const BLOQUE_2_ID = "388bfbfc-396e-4de2-8897-09532d6a0bcd";

const RD_1215_1997 = "https://www.boe.es/buscar/act.php?id=BOE-A-1997-17824";

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
  titulo: "Mantenimiento de maquinaria",
  descripcion: "El mantenimiento de excavadoras, cargadoras, mini-excavadoras y maquinaria de obras. Verificación de niveles y líquidos de mantenimiento. Confección de partes de avería y mantenimiento.",
  contenido: "Desarrolla el mantenimiento de la maquinaria de obra pública operada por el Oficial Conductor: la distinción entre mantenimiento preventivo (programado, para evitar averías) y correctivo (tras la avería), y la obligación de mantener los equipos de trabajo en buen estado conforme al RD 1215/1997; la verificación periódica de niveles y los distintos líquidos empleados en el mantenimiento de la máquina (aceite de motor, aceite hidráulico, refrigerante, líquido de frenos); y la confección de los partes de avería y de mantenimiento, como documento de registro y de comunicación con el servicio de taller.",
  enlaces_boe: [
    { url: RD_1215_1997, titulo: "RD 1215/1997 — equipos de trabajo (mantenimiento adecuado)" },
  ],
  indice_estudio: [
    { url: RD_1215_1997, titulo: "El mantenimiento preventivo y la verificación de niveles", seccion: "mantenimiento-preventivo-verificacion-niveles", articulos: "RD 1215/1997, art. 3" },
    { url: "", titulo: "Los líquidos para mantenimiento de niveles", seccion: "liquidos-mantenimiento-niveles-tipos", articulos: "Conocimiento técnico del oficio" },
    { url: "", titulo: "Confección de partes de avería y mantenimiento", seccion: "partes-averia-mantenimiento-documentacion", articulos: "Conocimiento técnico del oficio" },
  ],
}]);

const S1 = "mantenimiento-preventivo-verificacion-niveles";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué exige el RD 1215/1997 en relación con el mantenimiento de los equipos de trabajo, como una excavadora o una pala cargadora?", reverso: "Que se mantengan, mediante un mantenimiento adecuado, en condiciones que satisfagan las condiciones técnicas exigibles, ajustado en particular a las instrucciones del fabricante, para garantizar la seguridad y la salud de las personas trabajadoras durante su uso" },
  { anverso: "¿Qué diferencia existe entre el mantenimiento preventivo y el mantenimiento correctivo de una máquina?", reverso: "El mantenimiento preventivo se realiza de forma programada, antes de que se produzca la avería (revisiones periódicas, cambios de aceite, engrase), con el objetivo de evitarla; el mantenimiento correctivo se realiza una vez producida la avería, para reparar el fallo ya detectado" },
  { anverso: "¿Qué debe verificar el Oficial Conductor al comprobar el nivel de aceite del motor de su máquina antes de comenzar la jornada?", reverso: "Que el nivel se encuentra entre las marcas de mínimo y máximo de la varilla o del indicador correspondiente, comprobando la medición con la máquina en terreno horizontal y, según el modelo, con el motor frío o tras un breve tiempo de reposo" },
  { anverso: "¿Por qué es especialmente importante verificar el nivel de aceite hidráulico en una máquina como una excavadora o una pala cargadora?", reverso: "Porque el sistema hidráulico es el que acciona directamente el equipo de trabajo (pluma, brazo, cazo, hoja); un nivel insuficiente puede provocar un funcionamiento errático o una pérdida de fuerza del equipo, y dañar la bomba hidráulica por trabajar en vacío" },
  { anverso: "¿Qué consecuencia puede tener no verificar periódicamente los niveles de la máquina antes de iniciar el trabajo?", reverso: "Un funcionamiento anómalo o una avería grave y costosa que podría haberse evitado con una comprobación sencilla y rápida, además del riesgo de que la máquina falle de forma inesperada durante la propia ejecución de los trabajos, comprometiendo la seguridad" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué exige el RD 1215/1997 respecto al mantenimiento de los equipos de trabajo?", explicacion: "Mantenerlos en condiciones adecuadas mediante un mantenimiento ajustado a las instrucciones del fabricante.", dificultad: "media", opciones: ["Mantenerlos adecuados conforme a las instrucciones del fabricante", "Ninguna exigencia específica de mantenimiento periódico", "Exclusivamente una revisión anual realizada por un taller externo", "Exclusivamente el cumplimiento del régimen de circulación vial"], correcta: 0 },
  { enunciado: "¿Qué diferencia el mantenimiento preventivo del correctivo?", explicacion: "El preventivo se realiza antes de la avería; el correctivo, una vez producida esta.", dificultad: "media", opciones: ["El preventivo es previo a la avería; el correctivo, posterior", "Ambos se refieren exactamente al mismo tipo de intervención", "El correctivo siempre se realiza antes que el preventivo", "El preventivo solo se aplica a máquinas de menos de un año"], correcta: 0 },
  { enunciado: "¿Qué debe comprobarse al verificar el nivel de aceite de motor?", explicacion: "Que se encuentra entre las marcas de mínimo y máximo, en terreno horizontal.", dificultad: "facil", opciones: ["Que está entre las marcas de mínimo y máximo, en horizontal", "Únicamente el color del aceite, sin comprobar el nivel", "Únicamente la fecha de fabricación del propio aceite", "Ninguna comprobación específica distinta del combustible"], correcta: 0 },
  { enunciado: "¿Por qué es especialmente importante el nivel de aceite hidráulico en una excavadora?", explicacion: "El sistema hidráulico acciona el equipo de trabajo; un nivel insuficiente puede dañar la bomba.", dificultad: "dificil", opciones: ["Acciona el equipo de trabajo y su falta puede dañar la bomba", "No influye en ningún caso en el funcionamiento de la máquina", "Solo afecta al consumo de combustible de la máquina", "Solo es relevante en máquinas de más de diez años de uso"], correcta: 0 },
  { enunciado: "¿Qué consecuencia puede tener no verificar periódicamente los niveles de la máquina?", explicacion: "Una avería grave y costosa, o un fallo inesperado que comprometa la seguridad.", dificultad: "media", opciones: ["Una avería grave o un fallo que comprometa la seguridad", "Ninguna consecuencia relevante en la práctica habitual", "Únicamente una reducción estética del aspecto de la máquina", "Únicamente un aumento del ruido del motor sin más efectos"], correcta: 0 },
]);

const S2 = "liquidos-mantenimiento-niveles-tipos";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué función cumple el aceite de motor en una máquina de obra pública?", reverso: "Lubricar las piezas móviles internas del motor (pistones, cigüeñal, árbol de levas) para reducir el rozamiento y el desgaste, contribuir a su refrigeración, y arrastrar partículas e impurezas hacia el filtro de aceite" },
  { anverso: "¿Qué función cumple el aceite hidráulico en una excavadora o una pala cargadora?", reverso: "Transmitir la presión generada por la bomba hidráulica a los distintos cilindros y motores hidráulicos de la máquina, permitiendo el movimiento del equipo de trabajo, la dirección o la propulsión, según el sistema de que se trate" },
  { anverso: "¿Qué función cumple el líquido refrigerante del motor?", reverso: "Absorber el calor generado por la combustión en el motor y disiparlo a través del radiador, manteniendo la temperatura de funcionamiento dentro de un rango adecuado que evite tanto el sobrecalentamiento como un enfriamiento excesivo" },
  { anverso: "¿Qué función cumple el líquido de frenos en la maquinaria que dispone de sistema de frenado hidráulico?", reverso: "Transmitir la presión ejercida sobre el pedal de freno hasta los elementos de frenado (discos o tambores), siendo un fluido prácticamente incompresible que garantiza una respuesta inmediata y proporcional del sistema de frenado" },
  { anverso: "¿Por qué es importante utilizar siempre el tipo de líquido o aceite especificado por el fabricante de la máquina, y no uno equivalente sin verificar?", reverso: "Porque cada líquido está formulado con unas características específicas de viscosidad, aditivación o composición química adecuadas al sistema concreto de esa máquina, y un producto inadecuado puede reducir su eficacia o incluso dañar los componentes internos del sistema" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué función cumple el aceite de motor?", explicacion: "Lubricar las piezas móviles internas, contribuir a la refrigeración y arrastrar impurezas.", dificultad: "facil", opciones: ["Lubricar piezas móviles y contribuir a la refrigeración", "Transmitir la presión al equipo de trabajo hidráulico", "Absorber el calor de la combustión hacia el radiador", "Transmitir la presión del pedal de freno a las ruedas"], correcta: 0 },
  { enunciado: "¿Qué función cumple el aceite hidráulico en una excavadora?", explicacion: "Transmitir la presión de la bomba a los cilindros y motores hidráulicos de la máquina.", dificultad: "media", opciones: ["Transmitir la presión a los cilindros y motores hidráulicos", "Lubricar exclusivamente el interior del motor de combustión", "Refrigerar exclusivamente el sistema de frenos de la máquina", "Enfriar exclusivamente el aire de admisión del motor"], correcta: 0 },
  { enunciado: "¿Qué función cumple el líquido refrigerante del motor?", explicacion: "Absorber el calor de la combustión y disiparlo a través del radiador.", dificultad: "media", opciones: ["Absorber y disipar el calor generado por la combustión", "Transmitir la presión al equipo de trabajo hidráulico", "Lubricar las piezas móviles del sistema hidráulico", "Transmitir la presión del pedal de freno al sistema"], correcta: 0 },
  { enunciado: "¿Qué característica debe tener el líquido de frenos hidráulico?", explicacion: "Ser prácticamente incompresible, para garantizar una respuesta inmediata del sistema.", dificultad: "dificil", opciones: ["Ser prácticamente incompresible", "Ser altamente compresible para amortiguar el frenado", "Tener una viscosidad idéntica a la del aceite de motor", "Ser conductor eléctrico para el sistema de frenado"], correcta: 0 },
  { enunciado: "¿Por qué debe utilizarse siempre el líquido especificado por el fabricante y no uno equivalente sin verificar?", explicacion: "Cada líquido tiene características específicas; uno inadecuado puede dañar los componentes.", dificultad: "media", opciones: ["Un producto inadecuado puede reducir eficacia o dañar componentes", "Cualquier líquido similar resulta siempre igualmente válido", "El fabricante no especifica ningún tipo de líquido concreto", "Solo es relevante en máquinas de más de veinte años"], correcta: 0 },
]);

const S3 = "partes-averia-mantenimiento-documentacion";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un parte de avería?", reverso: "Un documento en el que la persona operadora registra una incidencia o un fallo detectado en la máquina (síntoma observado, momento en que se produjo, circunstancias), destinado a comunicar la incidencia al servicio de mantenimiento o taller para su reparación" },
  { anverso: "¿Qué información básica debe recoger un parte de avería o de mantenimiento?", reverso: "La identificación de la máquina, la fecha y hora de la incidencia, una descripción clara del síntoma o del fallo observado, las horas de funcionamiento (horómetro) de la máquina en ese momento, y el nombre de la persona que lo cumplimenta" },
  { anverso: "¿Por qué es importante cumplimentar el parte de avería de forma inmediata, tan pronto como se detecta la incidencia?", reverso: "Porque los detalles del síntoma (ruido, vibración, pérdida de fuerza, testigo de aviso) se recuerdan con mayor precisión recién detectados, lo que facilita al personal de mantenimiento un diagnóstico más rápido y preciso de la avería" },
  { anverso: "¿Qué es un parte de mantenimiento preventivo, a diferencia de un parte de avería?", reverso: "El documento que registra las operaciones de mantenimiento programado ya realizadas sobre la máquina (cambios de aceite, engrases, sustitución de filtros), sirviendo de historial para planificar las siguientes intervenciones según las horas de uso o el calendario establecido" },
  { anverso: "¿Qué relación existe entre un buen registro histórico de partes de avería y mantenimiento y la gestión del parque de maquinaria de un organismo como el Ayuntamiento de Zaragoza?", reverso: "Permite detectar averías recurrentes en una máquina concreta o en un modelo determinado, planificar mejor las revisiones preventivas futuras, y disponer de un historial documentado útil para decisiones de reparación o de renovación del parque de maquinaria" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es un parte de avería?", explicacion: "Un documento que registra una incidencia detectada en la máquina para comunicarla al taller.", dificultad: "facil", opciones: ["Un documento que registra una incidencia para el taller", "Un documento exclusivamente contable de la obra", "Un contrato de compraventa de la propia máquina", "Un informe exclusivamente fotográfico de la máquina"], correcta: 0 },
  { enunciado: "¿Cuál de los siguientes datos debe recoger un parte de avería o de mantenimiento?", explicacion: "Las horas de funcionamiento (horómetro) de la máquina en ese momento, entre otros datos.", dificultad: "media", opciones: ["Las horas de funcionamiento (horómetro) de la máquina", "Únicamente el color exterior de la máquina", "Únicamente la marca comercial del combustible utilizado", "Únicamente el nombre de la empresa fabricante"], correcta: 0 },
  { enunciado: "¿Por qué es importante cumplimentar el parte de avería de forma inmediata?", explicacion: "Los detalles del síntoma se recuerdan con mayor precisión recién detectados.", dificultad: "media", opciones: ["Los detalles se recuerdan con mayor precisión recién detectados", "No existe ninguna ventaja real en cumplimentarlo de inmediato", "Solo es relevante si la avería resulta muy grave", "Solo es relevante si la avería ocurre fuera de la obra"], correcta: 0 },
  { enunciado: "¿Qué es un parte de mantenimiento preventivo?", explicacion: "El registro de las operaciones de mantenimiento programado ya realizadas sobre la máquina.", dificultad: "media", opciones: ["El registro de las operaciones de mantenimiento ya realizadas", "El registro exclusivo de las averías ya ocurridas", "Un documento exclusivamente administrativo sin utilidad técnica", "Un documento exigido solo tras la venta de la máquina"], correcta: 0 },
  { enunciado: "¿Qué utilidad tiene un buen registro histórico de partes de avería para la gestión del parque de maquinaria?", explicacion: "Permite detectar averías recurrentes y planificar mejor las revisiones preventivas futuras.", dificultad: "dificil", opciones: ["Permite detectar averías recurrentes y planificar revisiones", "No aporta ninguna utilidad real para la gestión del parque", "Solo es útil para el cálculo del presupuesto anual", "Solo es útil si la máquina tiene menos de un año de uso"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 19 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 19, orden: 19, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-231 creado y vinculado como Tema 19 de Oficial Conductor Maquinaria Pesada.");
