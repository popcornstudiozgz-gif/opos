/**
 * Crea tema-205: "Decantación: el decantador Accelator" — Tema 9
 * (numero=9, bloque-2) de Oficial Planta Potabilizadora (Ayto.
 * Zaragoza).
 *
 * Corresponde al TEMA 7 oficial del Anexo I (bases2110.pdf, línea
 * 1132): "Decantación: Concepto. El decantador Accelator: Descripción
 * de su funcionamiento. Las purgas. Funcionamiento de las válvulas de
 * purga. Control de fangos en las zonas del Accelator. Sistemas de
 * extracción de fangos y su automatización. Mantenimiento de equipos y
 * de la obra civil."
 *
 * Fuente primaria verificada mediante búsqueda en esta sesión: el
 * decantador Accelator es un equipo real de la marca Degrémont
 * empleado en la Planta Potabilizadora de Casablanca (confirmado por
 * el Ayuntamiento de Zaragoza, portal de infraestructuras,
 * "Potabilización de agua": el proceso de la planta incluye
 * "coagulación-floculación (decantador acelerator)"). Su funcionamiento
 * general (entrada de agua bruta, turbina central, recirculación de
 * fangos, concentrador de fangos, salida de agua tratada) está descrito
 * en fuentes técnicas académicas sobre decantadores de tipo
 * clarificador-espesador de recirculación de fangos, un diseño
 * compacto que integra coagulación-floculación y decantación en un
 * mismo equipo. El resto del contenido (purgas, válvulas de purga,
 * mantenimiento de equipos y obra civil) es conocimiento técnico
 * consolidado de operación de plantas de tratamiento de agua, sin una
 * norma española específica que lo regule a ese nivel operativo.
 *
 * Tres secciones:
 * 1. decantacion-concepto-accelator-funcionamiento
 * 2. purgas-valvulas-control-fangos
 * 3. extraccion-fangos-automatizacion-mantenimiento
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-205-decantacion-accelator.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-205";
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
  titulo: "Decantación: el decantador Accelator",
  descripcion: "Concepto de decantación y funcionamiento del decantador Accelator de la Planta de Casablanca. Purgas y válvulas de purga. Control de fangos, sistemas de extracción, automatización y mantenimiento.",
  contenido: "Desarrolla la decantación como etapa del tratamiento de potabilización, y en particular el decantador Accelator empleado en la Planta Potabilizadora de Casablanca de Zaragoza: un equipo compacto de tipo clarificador-espesador que integra coagulación-floculación y decantación mediante una turbina central de recirculación de fangos. Explica las purgas y el funcionamiento de sus válvulas, el control de fangos en las distintas zonas del equipo, los sistemas de extracción de fangos y su automatización, y el mantenimiento de sus equipos y de la obra civil.",
  enlaces_boe: [
    "https://www.zaragoza.es/sede/portal/infraestructuras/agua/potabilizacion",
  ],
  indice_estudio: [
    { url: "https://www.zaragoza.es/sede/portal/infraestructuras/agua/potabilizacion", titulo: "Decantación: concepto y funcionamiento del Accelator", seccion: "decantacion-concepto-accelator-funcionamiento", articulos: "Ayuntamiento de Zaragoza — Potabilización del agua; conocimiento técnico de decantadores" },
    { url: "", titulo: "Purgas, válvulas de purga y control de fangos", seccion: "purgas-valvulas-control-fangos", articulos: "Conocimiento técnico del tratamiento de aguas" },
    { url: "", titulo: "Extracción de fangos, automatización y mantenimiento", seccion: "extraccion-fangos-automatizacion-mantenimiento", articulos: "Conocimiento técnico del tratamiento de aguas" },
  ],
}]);

const S1 = "decantacion-concepto-accelator-funcionamiento";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿En qué consiste la decantación, como etapa del tratamiento de potabilización?", reverso: "En separar del agua las partículas ya coaguladas y floculadas (flóculos), aprovechando su mayor densidad respecto al agua, de modo que sedimentan y pueden extraerse en forma de fangos antes de la filtración" },
  { anverso: "¿Qué es el decantador Accelator empleado en la Planta Potabilizadora de Casablanca?", reverso: "Un equipo de decantación de tipo clarificador-espesador, que integra en un mismo tanque la coagulación-floculación y la decantación, mediante una turbina central que recircula parte de los fangos ya formados para favorecer la formación de nuevos flóculos" },
  { anverso: "¿Qué elementos componen básicamente un decantador Accelator?", reverso: "Entrada de agua bruta, una turbina central, un sistema de recirculación de fangos, un concentrador (o espesador) de fangos, y la salida de agua ya decantada hacia la siguiente etapa del tratamiento" },
  { anverso: "¿Qué ventaja aporta el diseño compacto del Accelator frente a un decantador convencional de coagulación-floculación y decantación separadas?", reverso: "Requiere menos espacio y puede manejar cargas superficiales mayores, siendo adecuado para plantas con espacio limitado o caudales elevados, además de recircular fangos para mejorar la eficacia de la floculación" },
  { anverso: "¿Qué calidad de agua tratada es capaz de producir un decantador Accelator bien operado, en términos de turbidez?", reverso: "Una turbidez inferior a 2 NTU, junto con una reducción de color superior a la de otros sistemas de decantación convencionales" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿En qué consiste la decantación como etapa del tratamiento de potabilización?", explicacion: "En separar del agua las partículas ya coaguladas y floculadas por sedimentación.", dificultad: "facil", opciones: ["En separar del agua los flóculos ya formados por sedimentación", "En eliminar los sólidos gruesos del agua mediante rejas", "En desinfectar el agua mediante la adición de hipoclorito", "En medir el caudal y la presión del agua bruta de entrada"], correcta: 0 },
  { enunciado: "¿Qué es el decantador Accelator empleado en la Planta Potabilizadora de Casablanca?", explicacion: "Un decantador de tipo clarificador-espesador que integra coagulación-floculación y decantación.", dificultad: "media", opciones: ["Un decantador que integra coagulación-floculación y decantación", "Un filtro exclusivo de arena y carbón activo de la planta", "Un depósito exclusivo de almacenamiento de agua tratada final", "Un sistema exclusivo de cloración y desinfección final"], correcta: 0 },
  { enunciado: "¿Qué elemento central del Accelator recircula parte de los fangos ya formados?", explicacion: "Una turbina central.", dificultad: "media", opciones: ["Una turbina central", "Una reja de desbaste", "Un filtro de carbón activo", "Un contador electromagnético"], correcta: 0 },
  { enunciado: "¿Qué ventaja aporta el diseño compacto del Accelator frente a un decantador convencional?", explicacion: "Requiere menos espacio y puede manejar cargas superficiales mayores.", dificultad: "dificil", opciones: ["Requiere menos espacio y admite mayores cargas superficiales", "Requiere siempre mucho más espacio que un decantador convencional", "Elimina por completo la necesidad de la etapa de filtración posterior", "Elimina por completo la necesidad de la etapa de desinfección final"], correcta: 0 },
  { enunciado: "¿Qué turbidez es capaz de producir un decantador Accelator bien operado?", explicacion: "Una turbidez inferior a 2 NTU.", dificultad: "dificil", opciones: ["Una turbidez inferior a 2 NTU", "Una turbidez inferior a 200 NTU", "Una turbidez siempre superior a 50 NTU", "La turbidez no es un parámetro relevante para este equipo"], correcta: 0 },
]);

const S2 = "purgas-valvulas-control-fangos";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es una purga de fangos en el contexto del decantador Accelator?", reverso: "La operación de extraer, de forma periódica o continua, los fangos acumulados en las distintas zonas del decantador, evitando que se acumulen en exceso y afecten a la calidad del agua tratada o al propio funcionamiento del equipo" },
  { anverso: "¿Qué función cumplen las válvulas de purga del decantador?", reverso: "Regular el momento, la duración y el caudal de la extracción de fangos desde las zonas de concentración del decantador hacia el sistema de gestión de fangos de la planta" },
  { anverso: "¿Por qué es importante controlar con precisión el nivel de fangos en las distintas zonas del Accelator?", reverso: "Porque un exceso de fangos puede arrastrar partículas hacia la salida de agua decantada (deteriorando la calidad del agua tratada), mientras que una purga excesiva desperdicia flóculos útiles para la recirculación y aumenta innecesariamente el volumen de fangos a gestionar" },
  { anverso: "¿Qué método permite controlar de forma objetiva, y no solo visual, el nivel de fangos en el decantador?", reverso: "Sondas o sensores de concentración de sólidos (turbidímetros o medidores de manto de fangos) instalados en las distintas zonas del equipo, que permiten un control más preciso que la simple observación visual" },
  { anverso: "¿Qué relación existe entre la frecuencia de purga de fangos y la eficacia general de la decantación?", reverso: "Una frecuencia de purga bien ajustada mantiene el manto de fangos en el nivel óptimo para favorecer la recirculación y la formación de nuevos flóculos, mejorando la eficacia global del decantador; una frecuencia mal ajustada (por exceso o defecto) reduce esa eficacia" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es una purga de fangos en el decantador Accelator?", explicacion: "La extracción periódica o continua de los fangos acumulados en el decantador.", dificultad: "facil", opciones: ["La extracción de los fangos acumulados en el decantador", "La adición de sulfato de alúmina para la coagulación inicial", "La desinfección final del agua ya decantada y filtrada", "La medición del caudal de entrada de agua bruta a la planta"], correcta: 0 },
  { enunciado: "¿Qué función cumplen las válvulas de purga del decantador?", explicacion: "Regulan el momento, la duración y el caudal de extracción de fangos.", dificultad: "media", opciones: ["Regulan el momento, la duración y el caudal de extracción", "Regulan exclusivamente la dosificación de sulfato de alúmina", "Regulan exclusivamente el caudal de agua bruta de entrada", "Regulan exclusivamente la dosificación de hipoclorito sódico"], correcta: 0 },
  { enunciado: "¿Por qué es importante controlar con precisión el nivel de fangos en el decantador?", explicacion: "Un exceso puede deteriorar la calidad del agua tratada; una purga excesiva desperdicia flóculos útiles.", dificultad: "media", opciones: ["Un exceso deteriora el agua tratada; una purga excesiva desperdicia flóculos", "El nivel de fangos no tiene ninguna relación real con la calidad del agua", "Cuantos más fangos se acumulen, mejor será siempre la calidad del agua", "El control del nivel de fangos solo es relevante en la etapa de filtración"], correcta: 0 },
  { enunciado: "¿Qué método permite un control objetivo del nivel de fangos, más allá de la observación visual?", explicacion: "Sondas o sensores de concentración de sólidos.", dificultad: "dificil", opciones: ["Sondas o sensores de concentración de sólidos", "Únicamente la medición del pH del agua de entrada", "Únicamente la medición de la temperatura ambiente de la sala", "Ningún método objetivo distinto de la observación visual directa"], correcta: 0 },
  { enunciado: "¿Qué relación existe entre la frecuencia de purga y la eficacia de la decantación?", explicacion: "Una frecuencia bien ajustada mantiene el manto de fangos en su nivel óptimo.", dificultad: "dificil", opciones: ["Una frecuencia bien ajustada mantiene el manto de fangos óptimo", "La frecuencia de purga no influye en ningún caso en la eficacia del equipo", "Cuanto más frecuente sea la purga, siempre mejor será la eficacia", "Cuanto menos frecuente sea la purga, siempre mejor será la eficacia"], correcta: 0 },
]);

const S3 = "extraccion-fangos-automatizacion-mantenimiento";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué sistemas existen para automatizar la extracción de fangos de un decantador Accelator, más allá de la purga manual?", reverso: "Temporizadores que programan purgas periódicas a intervalos fijos, y sistemas más avanzados basados en sondas de concentración de sólidos que activan la purga automáticamente cuando se supera un umbral determinado" },
  { anverso: "¿Qué ventaja aporta automatizar la extracción de fangos frente a una purga exclusivamente manual?", reverso: "Garantiza una gestión más constante y ajustada a las condiciones reales del proceso, sin depender de la disponibilidad u observación directa del operario, y reduce el riesgo de olvidos o purgas mal cronometradas" },
  { anverso: "¿Qué comprobaciones básicas de mantenimiento deben realizarse periódicamente en los equipos mecánicos del decantador Accelator (turbina, válvulas de purga)?", reverso: "Revisión del estado de desgaste de los componentes mecánicos, verificación del correcto funcionamiento de motores y accionamientos, comprobación de la estanqueidad de las válvulas de purga, y lubricación de los elementos que lo requieran" },
  { anverso: "¿Qué aspectos de la obra civil del decantador requieren mantenimiento periódico, además de los propios equipos mecánicos?", reverso: "El estado del hormigón y las juntas de estanqueidad del tanque, la limpieza de las superficies internas frente a incrustaciones o biofilm, y la revisión de las canalizaciones de entrada y salida de agua y de fangos" },
  { anverso: "¿Por qué es importante programar el mantenimiento del decantador de forma preventiva, y no solo reaccionar ante una avería ya producida?", reverso: "Porque una avería en el decantador puede comprometer la calidad del agua tratada de toda la planta durante el tiempo que dure la reparación, por lo que el mantenimiento preventivo reduce el riesgo de paradas no planificadas del proceso" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué sistemas existen para automatizar la extracción de fangos de un decantador?", explicacion: "Temporizadores y sondas de concentración de sólidos que activan la purga automáticamente.", dificultad: "media", opciones: ["Temporizadores y sondas de concentración de sólidos", "Únicamente la observación visual continua de un operario", "Únicamente la medición manual del pH cada hora", "Ningún sistema automático es posible en este tipo de equipo"], correcta: 0 },
  { enunciado: "¿Qué ventaja aporta automatizar la extracción de fangos frente a una purga exclusivamente manual?", explicacion: "Garantiza una gestión más constante y ajustada a las condiciones reales del proceso.", dificultad: "media", opciones: ["Garantiza una gestión más constante y ajustada al proceso real", "No aporta ninguna ventaja real frente a la purga manual", "Elimina por completo la necesidad de cualquier mantenimiento posterior", "Aumenta de forma automática la turbidez del agua tratada final"], correcta: 0 },
  { enunciado: "¿Qué debe revisarse periódicamente en los equipos mecánicos del decantador?", explicacion: "El desgaste de componentes, el funcionamiento de motores y la estanqueidad de válvulas.", dificultad: "media", opciones: ["El desgaste, el funcionamiento de motores y la estanqueidad", "Únicamente el color exterior de la pintura del tanque", "Únicamente la fecha de fabricación original del equipo", "Ninguna revisión periódica es necesaria en este tipo de equipo"], correcta: 0 },
  { enunciado: "¿Qué aspectos de la obra civil del decantador requieren mantenimiento periódico?", explicacion: "El estado del hormigón, las juntas de estanqueidad y las canalizaciones.", dificultad: "dificil", opciones: ["El hormigón, las juntas de estanqueidad y las canalizaciones", "Únicamente el color exterior de las paredes del tanque", "Ningún aspecto de la obra civil requiere mantenimiento periódico", "Únicamente la vegetación circundante al propio decantador"], correcta: 0 },
  { enunciado: "¿Por qué es importante el mantenimiento preventivo del decantador, más allá de reaccionar ante una avería?", explicacion: "Una avería puede comprometer la calidad del agua tratada de toda la planta.", dificultad: "media", opciones: ["Una avería puede comprometer la calidad del agua de toda la planta", "El mantenimiento preventivo no aporta ninguna ventaja real frente a esperar", "Solo es relevante el mantenimiento preventivo de la propia obra civil", "El decantador Accelator no requiere ningún tipo de mantenimiento"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 9 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 9, orden: 9, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-205 creado y vinculado como Tema 9 de Oficial Planta Potabilizadora.");
