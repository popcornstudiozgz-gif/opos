/**
 * Crea tema-208: "Circulación de fluidos y medición de caudal y
 * presión" — Tema 12 (numero=12, bloque-2) de Oficial Planta
 * Potabilizadora (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 10 oficial del Anexo I (bases2110.pdf, línea
 * 1163): "Circulación de un fluido en canales abiertos y en conductos
 * cerrados. Equipos para la medición del caudal y la presión: tipos,
 * características, instalación y mantenimiento. Relaciones entre la
 * presión la velocidad y la sección de paso de un fluido."
 *
 * Conocimiento técnico consolidado de hidráulica industrial, sin una
 * ley española que lo regule como tal — mismo criterio ya aplicado en
 * Oficial Guardallaves para conceptos básicos de hidráulica (ver
 * scripts/seed-tema-190-*.mjs y seed-tema-191-*.mjs), aquí ampliado a
 * la circulación en canales abiertos (propia de una planta de
 * tratamiento, a diferencia de la red de distribución a presión) y a
 * los equipos industriales de medición de caudal y presión. Búsqueda
 * previa realizada conforme al estándar de sourcing del proyecto: no
 * existe una norma española específica que regule estos conceptos
 * físicos generales ni los tipos de instrumentos de medida industrial
 * en sí mismos (distinto de la metrología legal de contadores
 * domiciliarios, RD 244/2016, que no es aplicable a estos equipos de
 * proceso interno de planta).
 *
 * Tres secciones:
 * 1. circulacion-canales-abiertos-conductos-cerrados
 * 2. equipos-medicion-caudal-presion-tipos-instalacion
 * 3. relaciones-presion-velocidad-seccion
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-208-circulacion-fluidos-medicion-caudal-presion.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-208";
const OPOSICION = "oficial-planta-potabilizadora-ayto-zaragoza";
const BLOQUE_2_ID = "ca4ed0ad-ab08-4bc9-80b7-fb4e6941b64a";

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
  titulo: "Circulación de fluidos y medición de caudal y presión",
  descripcion: "Circulación de un fluido en canales abiertos y en conductos cerrados. Equipos para la medición del caudal y la presión: tipos, características, instalación y mantenimiento. Relaciones entre presión, velocidad y sección.",
  contenido: "Desarrolla la hidráulica de la circulación de fluidos dentro de una planta de tratamiento de agua: la diferencia entre la circulación en canales abiertos (propia de muchas etapas del proceso interno) y en conductos cerrados a presión, los principales tipos de equipos de medición de caudal y presión empleados en una planta industrial (con sus características, instalación y mantenimiento), y las relaciones fundamentales entre presión, velocidad y sección de paso de un fluido.",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "Circulación en canales abiertos y en conductos cerrados", seccion: "circulacion-canales-abiertos-conductos-cerrados", articulos: "Conocimiento técnico de hidráulica industrial" },
    { url: "", titulo: "Equipos para la medición de caudal y presión", seccion: "equipos-medicion-caudal-presion-tipos-instalacion", articulos: "Conocimiento técnico de hidráulica industrial" },
    { url: "", titulo: "Relaciones entre presión, velocidad y sección de paso", seccion: "relaciones-presion-velocidad-seccion", articulos: "Conocimiento técnico de hidráulica industrial" },
  ],
}]);

const S1 = "circulacion-canales-abiertos-conductos-cerrados";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué caracteriza la circulación de un fluido en un canal abierto, a diferencia de un conducto cerrado?", reverso: "En un canal abierto, el fluido circula con una superficie libre en contacto con la atmósfera (sin llenar toda la sección disponible), y su movimiento está impulsado principalmente por la gravedad, aprovechando la pendiente del canal" },
  { anverso: "¿Qué caracteriza la circulación de un fluido en un conducto cerrado, a diferencia de un canal abierto?", reverso: "En un conducto cerrado, el fluido llena por completo la sección de la tubería y circula a presión, pudiendo desplazarse en cualquier dirección (incluso en contra de la gravedad) gracias a esa presión, y no solo por efecto de la pendiente" },
  { anverso: "¿En qué etapas del tratamiento de una planta potabilizadora es habitual encontrar circulación en canal abierto?", reverso: "En tramos como los canales de entrada de agua bruta, los propios decantadores, y los canales de distribución del agua entre distintas unidades de filtración, donde no siempre es necesario ni conveniente que el agua circule a presión" },
  { anverso: "¿Qué parámetro geométrico es especialmente relevante en el diseño de un canal abierto, y que no tiene el mismo peso en un conducto cerrado a presión?", reverso: "La pendiente del canal, ya que determina, junto con su sección, la velocidad de circulación del agua por efecto exclusivo de la gravedad, sin necesidad de una fuente de presión adicional" },
  { anverso: "¿Por qué es importante que el guardallaves de planta conozca ambos tipos de circulación (canal abierto y conducto cerrado) dentro de una misma instalación?", reverso: "Porque una planta potabilizadora combina ambos tipos de circulación en distintos tramos de su proceso, y el diagnóstico de una incidencia (por ejemplo, un caudal insuficiente en una etapa) requiere identificar correctamente en qué tipo de tramo se produce para aplicar el criterio adecuado" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué caracteriza la circulación de un fluido en un canal abierto?", explicacion: "Tiene una superficie libre y circula principalmente por gravedad.", dificultad: "facil", opciones: ["Tiene una superficie libre y circula principalmente por gravedad", "Llena por completo la sección y circula siempre a presión", "Nunca puede combinarse con tramos de conducto cerrado", "Requiere siempre una bomba de impulsión para su circulación"], correcta: 0 },
  { enunciado: "¿Qué caracteriza la circulación de un fluido en un conducto cerrado?", explicacion: "Llena por completo la sección y circula a presión, incluso en contra de la gravedad.", dificultad: "media", opciones: ["Llena la sección y circula a presión, incluso en contra de la gravedad", "Tiene siempre una superficie libre en contacto con la atmósfera", "Circula exclusivamente por efecto de la pendiente del conducto", "Nunca puede combinarse con tramos de canal abierto"], correcta: 0 },
  { enunciado: "¿En qué etapas de una planta potabilizadora es habitual la circulación en canal abierto?", explicacion: "En canales de entrada, decantadores y canales de distribución entre unidades de filtración.", dificultad: "media", opciones: ["En canales de entrada, decantadores y distribución entre filtros", "Exclusivamente en la red de distribución final a los abonados", "Exclusivamente en el depósito central de almacenamiento", "En ninguna etapa, al circular siempre el agua a presión en la planta"], correcta: 0 },
  { enunciado: "¿Qué parámetro geométrico es especialmente relevante en el diseño de un canal abierto?", explicacion: "La pendiente del canal.", dificultad: "dificil", opciones: ["La pendiente del canal", "El diámetro nominal exclusivamente, sin relación con la pendiente", "El material de fabricación exclusivamente, sin relación con la pendiente", "La presión de servicio exclusivamente, como en un conducto cerrado"], correcta: 0 },
  { enunciado: "¿Por qué es importante distinguir entre canal abierto y conducto cerrado al diagnosticar una incidencia de caudal?", explicacion: "Permite aplicar el criterio de diagnóstico adecuado a cada tipo de tramo.", dificultad: "media", opciones: ["Permite aplicar el criterio de diagnóstico adecuado a cada tramo", "No existe ninguna diferencia real relevante para el diagnóstico", "Solo es relevante en instalaciones de gran tamaño, no en plantas pequeñas", "El tipo de circulación no influye nunca en la causa de una incidencia"], correcta: 0 },
]);

const S2 = "equipos-medicion-caudal-presion-tipos-instalacion";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un caudalímetro electromagnético, uno de los tipos de equipo de medición de caudal más habituales en una planta de tratamiento de agua?", reverso: "Un instrumento que mide el caudal de un líquido conductor (como el agua) aplicando el principio de inducción electromagnética, sin partes móviles en contacto con el fluido, lo que reduce su desgaste y mantenimiento" },
  { anverso: "¿Qué es un vertedero (o canaleta Parshall), como método de medición de caudal en canal abierto?", reverso: "Una estructura hidráulica normalizada (una contracción o un resalto en el canal) que provoca una relación conocida y estable entre el nivel del agua y el caudal circulante, permitiendo estimar el caudal a partir de una simple medición de nivel" },
  { anverso: "¿Qué es un manómetro, como equipo de medición de presión?", reverso: "Un instrumento que mide la presión de un fluido en un punto concreto de una conducción o equipo, habitualmente mediante un elemento mecánico (tubo Bourdon) o un sensor electrónico que convierte la presión en una señal eléctrica" },
  { anverso: "¿Qué debe tenerse en cuenta al instalar un equipo de medición de caudal en un conducto cerrado, para garantizar una lectura fiable?", reverso: "Disponer de un tramo recto suficiente de tubería antes y después del equipo (sin codos, válvulas u otras perturbaciones cercanas), conforme a las recomendaciones del fabricante, para evitar turbulencias que falseen la medición" },
  { anverso: "¿Qué operaciones básicas de mantenimiento requieren periódicamente los equipos de medición de caudal y presión?", reverso: "Verificación y calibración periódica frente a un patrón conocido, limpieza de sensores o partes en contacto con el fluido (especialmente si hay riesgo de incrustaciones), y comprobación del correcto funcionamiento de su señal de salida hacia el sistema de control" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es un caudalímetro electromagnético?", explicacion: "Un instrumento que mide el caudal por inducción electromagnética, sin partes móviles en el fluido.", dificultad: "media", opciones: ["Un instrumento que mide el caudal por inducción electromagnética", "Un instrumento que mide exclusivamente la presión de una conducción", "Un instrumento que mide exclusivamente el pH del agua tratada", "Un instrumento que mide exclusivamente la turbidez del agua"], correcta: 0 },
  { enunciado: "¿Qué es un vertedero o canaleta Parshall como método de medición de caudal?", explicacion: "Una estructura hidráulica que relaciona el nivel del agua con el caudal circulante en canal abierto.", dificultad: "media", opciones: ["Una estructura que relaciona nivel y caudal en canal abierto", "Un instrumento electrónico exclusivo para conductos cerrados a presión", "Un tipo de válvula reductora de presión de la red de distribución", "Un depósito exclusivo de almacenamiento de agua ya tratada"], correcta: 0 },
  { enunciado: "¿Qué es un manómetro?", explicacion: "Un instrumento que mide la presión de un fluido en un punto concreto.", dificultad: "facil", opciones: ["Un instrumento que mide la presión de un fluido", "Un instrumento que mide exclusivamente el caudal de un fluido", "Un instrumento que mide exclusivamente la temperatura del fluido", "Un instrumento que mide exclusivamente el nivel de un depósito"], correcta: 0 },
  { enunciado: "¿Qué debe garantizarse al instalar un equipo de medición de caudal en un conducto cerrado?", explicacion: "Un tramo recto suficiente antes y después del equipo, para evitar turbulencias.", dificultad: "dificil", opciones: ["Un tramo recto suficiente antes y después del equipo", "Que el equipo se instale siempre justo después de un codo", "Que el equipo se instale siempre justo antes de una válvula", "Ninguna condición especial distinta de la propia conexión eléctrica"], correcta: 0 },
  { enunciado: "¿Qué operación básica de mantenimiento requieren periódicamente los equipos de medición de caudal y presión?", explicacion: "Verificación y calibración periódica frente a un patrón conocido.", dificultad: "media", opciones: ["Verificación y calibración periódica frente a un patrón", "Ninguna operación de mantenimiento, al ser equipos de vida indefinida", "Sustitución completa anual, con independencia de su estado real", "Pintado exterior periódico, sin ninguna comprobación funcional"], correcta: 0 },
]);

const S3 = "relaciones-presion-velocidad-seccion";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Cuál es la relación matemática básica entre caudal, velocidad y sección de un conducto cerrado?", reverso: "Caudal = Velocidad × Sección (Q = v · S); a igualdad de caudal, una menor sección implica una mayor velocidad del fluido, y viceversa" },
  { anverso: "¿Qué relación general existe entre la velocidad de un fluido y su presión en un mismo conducto, cuando el caudal se mantiene constante pero la sección varía (principio de Bernoulli, de forma simplificada)?", reverso: "En un tramo donde el fluido gana velocidad (por reducirse la sección), su presión estática tiende a disminuir; en un tramo donde el fluido pierde velocidad (por aumentar la sección), su presión estática tiende a aumentar, para una misma energía total del sistema" },
  { anverso: "¿Qué consecuencia práctica tiene esta relación entre velocidad y presión al diseñar un estrechamiento en una conducción de proceso, como el paso hacia un equipo de medición de caudal?", reverso: "Que en el punto de mayor velocidad (menor sección) se produce una caída localizada de presión, un efecto que aprovechan precisamente algunos tipos de caudalímetros (como los de presión diferencial) para estimar el caudal a partir de esa diferencia de presión" },
  { anverso: "¿Por qué es relevante para un oficial de planta conocer estas relaciones al interpretar las lecturas de los equipos de medición instalados en distintos puntos del proceso?", reverso: "Porque permite entender por qué una lectura de presión puede variar de forma normal entre dos puntos de una misma conducción (por un simple cambio de sección), sin que eso implique necesariamente una avería o una pérdida de carga anómala" },
  { anverso: "¿Qué ocurre con la velocidad de un fluido en un canal abierto si, manteniendo el mismo caudal, se reduce la sección mojada del canal (por ejemplo, por sedimentos acumulados)?", reverso: "La velocidad debe aumentar para mantener el mismo caudal, exactamente igual que en un conducto cerrado, conforme a la misma relación Q = v · S aplicada a la sección efectivamente ocupada por el agua" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Cuál es la relación matemática básica entre caudal, velocidad y sección?", explicacion: "Caudal = Velocidad × Sección (Q = v · S).", dificultad: "facil", opciones: ["Caudal = Velocidad × Sección", "Caudal = Velocidad / Sección", "Caudal = Sección / Velocidad", "Caudal = Velocidad + Sección"], correcta: 0 },
  { enunciado: "¿Qué ocurre con la presión de un fluido en un tramo donde gana velocidad por reducirse la sección?", explicacion: "Su presión estática tiende a disminuir.", dificultad: "media", opciones: ["Su presión estática tiende a disminuir", "Su presión estática tiende a aumentar siempre", "Su presión se mantiene exactamente constante en cualquier caso", "La presión no guarda ninguna relación con la velocidad del fluido"], correcta: 0 },
  { enunciado: "¿Qué tipo de caudalímetro aprovecha la caída de presión asociada a un estrechamiento para estimar el caudal?", explicacion: "Los caudalímetros de presión diferencial.", dificultad: "dificil", opciones: ["Los caudalímetros de presión diferencial", "Los caudalímetros electromagnéticos exclusivamente", "Los vertederos o canaletas Parshall exclusivamente", "Ningún tipo de caudalímetro aprovecha ese efecto"], correcta: 0 },
  { enunciado: "¿Por qué es relevante conocer la relación presión-velocidad-sección al interpretar lecturas de equipos de medición en distintos puntos?", explicacion: "Permite entender variaciones normales de presión sin que impliquen necesariamente una avería.", dificultad: "media", opciones: ["Permite entender variaciones normales sin que impliquen avería", "Cualquier variación de presión entre dos puntos indica siempre una avería", "La presión debe ser siempre idéntica en cualquier punto de la conducción", "Esta relación solo es aplicable a conductos cerrados, nunca a canales"], correcta: 0 },
  { enunciado: "¿Qué ocurre con la velocidad de un fluido en un canal abierto si se reduce su sección mojada manteniendo el mismo caudal?", explicacion: "La velocidad debe aumentar, conforme a Q = v · S.", dificultad: "media", opciones: ["La velocidad debe aumentar para mantener el mismo caudal", "La velocidad debe disminuir para mantener el mismo caudal", "La velocidad no varía nunca ante un cambio de sección mojada", "El caudal deja de poder calcularse en un canal abierto"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 12 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 12, orden: 12, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-208 creado y vinculado como Tema 12 de Oficial Planta Potabilizadora.");
