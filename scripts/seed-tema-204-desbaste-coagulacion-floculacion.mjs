/**
 * Crea tema-204: "Desbaste, coagulación y floculación" — Tema 8
 * (numero=8, bloque-2) de Oficial Planta Potabilizadora (Ayto.
 * Zaragoza).
 *
 * Corresponde al TEMA 6 oficial del Anexo I (bases2110.pdf, línea
 * 1119): "El desbaste. Tipos de rejas de desbaste. La coagulación y
 * floculación del agua: Conceptos. Factores que influyen en la
 * coagulación y floculación. Reactivos para la coagulación y
 * floculación. Dispositivos de preparación, adición mezcla y
 * dosificación de coagulantes y floculantes con el agua. Dosificación
 * de carbón en polvo. Dosificación de Dióxido de Carbono."
 *
 * Fuente primaria verificada mediante búsqueda en esta sesión:
 * Ayuntamiento de Zaragoza, portal de infraestructuras, "Potabilización
 * de agua" — describe el proceso real de la Planta de Casablanca: el
 * desbaste elimina los sólidos gruesos mediante el paso del agua por
 * rejas, la coagulación se realiza añadiendo sulfato de alúmina para
 * coagular las materias en suspensión, y la floculación mediante la
 * adición de almidón para aglomerar las sustancias. El resto del
 * contenido técnico (tipos de rejas, factores de la coagulación,
 * dosificación de carbón en polvo y de dióxido de carbono) es
 * conocimiento técnico consolidado del tratamiento de aguas, sin una
 * norma española específica que lo regule a ese nivel de detalle
 * operativo — mismo criterio que otros contenidos técnicos de proceso
 * industrial sin ley única de este proyecto.
 *
 * Tres secciones:
 * 1. desbaste-tipos-rejas
 * 2. coagulacion-floculacion-conceptos-factores
 * 3. reactivos-dosificacion-coagulantes-carbon-co2
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-204-desbaste-coagulacion-floculacion.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-204";
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
  titulo: "Desbaste, coagulación y floculación",
  descripcion: "El desbaste y los tipos de rejas. Conceptos y factores de la coagulación y floculación. Reactivos, dispositivos de dosificación, y dosificación de carbón en polvo y dióxido de carbono.",
  contenido: "Desarrolla las dos primeras etapas del tratamiento de potabilización tras la captación: el desbaste, que elimina los sólidos gruesos del agua bruta mediante rejas, y la coagulación-floculación, que mediante la adición de reactivos como el sulfato de alúmina y el almidón permite aglomerar las partículas en suspensión para su posterior eliminación en la decantación. Incluye los dispositivos de preparación, mezcla y dosificación de estos reactivos, y la dosificación de carbón en polvo y de dióxido de carbono.",
  enlaces_boe: [
    "https://www.zaragoza.es/sede/portal/infraestructuras/agua/potabilizacion",
  ],
  indice_estudio: [
    { url: "https://www.zaragoza.es/sede/portal/infraestructuras/agua/potabilizacion", titulo: "El desbaste y los tipos de rejas", seccion: "desbaste-tipos-rejas", articulos: "Ayuntamiento de Zaragoza — Potabilización del agua" },
    { url: "https://www.zaragoza.es/sede/portal/infraestructuras/agua/potabilizacion", titulo: "Coagulación y floculación: conceptos y factores", seccion: "coagulacion-floculacion-conceptos-factores", articulos: "Ayuntamiento de Zaragoza — Potabilización del agua; conocimiento técnico del tratamiento de aguas" },
    { url: "", titulo: "Reactivos y dosificación: coagulantes, carbón en polvo y CO₂", seccion: "reactivos-dosificacion-coagulantes-carbon-co2", articulos: "Conocimiento técnico del tratamiento de aguas" },
  ],
}]);

const S1 = "desbaste-tipos-rejas";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿En qué consiste el desbaste, primera etapa del tratamiento de potabilización?", reverso: "En eliminar los sólidos gruesos del agua bruta (ramas, residuos, materiales flotantes) mediante el paso del agua a través de unas rejas, antes de que lleguen a las siguientes fases del tratamiento" },
  { anverso: "¿Qué diferencia general existe entre una reja de desbaste de gran separación (rejas gruesas) y una de pequeña separación (rejas finas)?", reverso: "La reja gruesa retiene únicamente los elementos de mayor tamaño (ramas, residuos voluminosos); la reja fina retiene partículas más pequeñas que hayan podido atravesar la reja gruesa, protegiendo mejor los equipos posteriores" },
  { anverso: "¿Por qué es importante realizar el desbaste antes de cualquier otra etapa del tratamiento?", reverso: "Porque protege los equipos posteriores (bombas, dispositivos de dosificación, decantadores) frente a obstrucciones o daños mecánicos causados por sólidos de gran tamaño, y evita que esos sólidos interfieran en los procesos químicos posteriores" },
  { anverso: "¿Qué sistema de limpieza suelen incorporar las rejas de desbaste de una planta potabilizadora moderna?", reverso: "Un sistema de limpieza automático (mecánico) que retira periódicamente los sólidos retenidos, evitando la colmatación de la reja y reduciendo la necesidad de limpieza manual" },
  { anverso: "¿Qué ocurre con los sólidos retenidos en las rejas de desbaste una vez retirados?", reverso: "Se recogen y gestionan como residuo, siendo evacuados fuera del proceso de tratamiento de agua, sin volver a entrar en contacto con el flujo principal" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿En qué consiste el desbaste como primera etapa del tratamiento?", explicacion: "En eliminar los sólidos gruesos del agua bruta mediante rejas.", dificultad: "facil", opciones: ["En eliminar los sólidos gruesos del agua bruta mediante rejas", "En añadir sulfato de alúmina para coagular partículas finas", "En desinfectar el agua mediante la adición de hipoclorito", "En medir el caudal y la presión del agua bruta de entrada"], correcta: 0 },
  { enunciado: "¿Qué diferencia general existe entre una reja gruesa y una reja fina de desbaste?", explicacion: "La gruesa retiene elementos de mayor tamaño; la fina, partículas más pequeñas.", dificultad: "media", opciones: ["La gruesa retiene elementos mayores; la fina, partículas menores", "Ambos tipos de reja retienen exactamente el mismo tamaño de partícula", "La reja fina se instala siempre antes que la reja gruesa", "La reja gruesa solo se emplea en plantas de muy pequeño tamaño"], correcta: 0 },
  { enunciado: "¿Por qué es importante realizar el desbaste antes de cualquier otra etapa del tratamiento?", explicacion: "Protege los equipos posteriores frente a obstrucciones o daños mecánicos.", dificultad: "media", opciones: ["Protege los equipos posteriores frente a obstrucciones o daños", "Mejora automáticamente el sabor del agua tratada final", "Elimina por completo la necesidad de la desinfección posterior", "Reduce de forma directa el consumo eléctrico de toda la planta"], correcta: 0 },
  { enunciado: "¿Qué sistema suelen incorporar las rejas de desbaste modernas para evitar su colmatación?", explicacion: "Un sistema de limpieza automático (mecánico).", dificultad: "media", opciones: ["Un sistema de limpieza automático mecánico", "Un sistema exclusivo de dosificación de hipoclorito", "Un sistema exclusivo de medición de caudal y presión", "Ningún sistema adicional, requiriendo limpieza manual exclusiva"], correcta: 0 },
  { enunciado: "¿Qué ocurre con los sólidos retenidos en las rejas de desbaste?", explicacion: "Se recogen y gestionan como residuo fuera del proceso de tratamiento.", dificultad: "dificil", opciones: ["Se recogen y gestionan como residuo fuera del proceso", "Se reincorporan directamente al flujo principal de agua tratada", "Se emplean como reactivo en la posterior coagulación-floculación", "Se disuelven de forma automática en el propio caudal de entrada"], correcta: 0 },
]);

const S2 = "coagulacion-floculacion-conceptos-factores";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿En qué consiste la coagulación del agua, dentro del tratamiento de potabilización?", reverso: "En desestabilizar eléctricamente las partículas en suspensión de muy pequeño tamaño (coloides), mediante la adición de un reactivo coagulante como el sulfato de alúmina, para que puedan agruparse en partículas de mayor tamaño" },
  { anverso: "¿En qué consiste la floculación, y en qué se diferencia de la coagulación?", reverso: "En la aglomeración de las partículas ya desestabilizadas por la coagulación en flóculos de mayor tamaño (mediante una agitación suave y, en la planta de Zaragoza, con la adición de almidón), facilitando su posterior eliminación por decantación; la coagulación desestabiliza, la floculación aglomera" },
  { anverso: "¿Qué factores influyen principalmente en la eficacia de la coagulación-floculación?", reverso: "El pH del agua, la temperatura, la turbidez y la naturaleza de las partículas en suspensión, la dosis del reactivo empleado, y el grado y tiempo de agitación aplicados en cada fase" },
  { anverso: "¿Por qué es importante controlar con precisión el pH del agua durante la coagulación?", reverso: "Porque cada reactivo coagulante tiene un rango de pH óptimo en el que su eficacia es máxima; fuera de ese rango, la coagulación puede resultar incompleta o poco eficaz, incluso empleando la dosis correcta de reactivo" },
  { anverso: "¿Qué relación existe entre el grado de agitación aplicado y el resultado de la floculación?", reverso: "Una agitación demasiado intensa puede romper los flóculos ya formados, mientras que una agitación insuficiente puede no favorecer su formación; se requiere una agitación suave y progresiva para obtener flóculos consistentes y de buen tamaño" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿En qué consiste la coagulación del agua?", explicacion: "En desestabilizar eléctricamente las partículas en suspensión mediante un reactivo coagulante.", dificultad: "facil", opciones: ["En desestabilizar las partículas en suspensión mediante un reactivo", "En eliminar los sólidos gruesos del agua mediante rejas", "En desinfectar el agua mediante la adición de hipoclorito", "En medir el caudal y la presión del agua bruta de entrada"], correcta: 0 },
  { enunciado: "¿En qué se diferencia la floculación de la coagulación?", explicacion: "La coagulación desestabiliza las partículas; la floculación las aglomera en flóculos mayores.", dificultad: "media", opciones: ["La coagulación desestabiliza; la floculación aglomera en flóculos", "Ambos procesos son exactamente equivalentes, sin ninguna diferencia", "La floculación desestabiliza; la coagulación aglomera en flóculos", "La floculación se realiza siempre antes que la coagulación"], correcta: 0 },
  { enunciado: "¿Qué factores influyen principalmente en la eficacia de la coagulación-floculación?", explicacion: "El pH, la temperatura, la turbidez, la dosis de reactivo y el grado de agitación.", dificultad: "media", opciones: ["El pH, la temperatura, la turbidez, la dosis y la agitación", "Únicamente el color exterior del agua bruta de entrada", "Únicamente la presión disponible en la conducción de entrada", "Únicamente la hora del día en que se realiza el tratamiento"], correcta: 0 },
  { enunciado: "¿Por qué es importante controlar el pH del agua durante la coagulación?", explicacion: "Cada coagulante tiene un rango de pH óptimo donde su eficacia es máxima.", dificultad: "dificil", opciones: ["Cada coagulante tiene un rango de pH óptimo de eficacia máxima", "El pH no tiene ninguna relación real con la eficacia de la coagulación", "Un pH incorrecto siempre mejora la eficacia de cualquier coagulante", "El pH solo es relevante en la etapa de desinfección final del agua"], correcta: 0 },
  { enunciado: "¿Qué relación existe entre el grado de agitación y el resultado de la floculación?", explicacion: "Una agitación excesiva rompe los flóculos; una insuficiente no favorece su formación.", dificultad: "dificil", opciones: ["Una agitación excesiva rompe los flóculos ya formados", "Cuanto más intensa sea la agitación, mejores serán siempre los flóculos", "La agitación no tiene ninguna relación real con el tamaño de los flóculos", "Los flóculos se forman exclusivamente sin ningún tipo de agitación"], correcta: 0 },
]);

const S3 = "reactivos-dosificacion-coagulantes-carbon-co2";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué reactivo coagulante emplea la Planta Potabilizadora de Casablanca para desestabilizar las partículas en suspensión del agua?", reverso: "El sulfato de alúmina" },
  { anverso: "¿Qué reactivo emplea la planta de Casablanca en la fase de floculación para aglomerar las sustancias ya coaguladas?", reverso: "El almidón" },
  { anverso: "¿Qué función cumplen los dispositivos de preparación, adición y mezcla de los reactivos coagulantes y floculantes?", reverso: "Diluir el reactivo en la concentración adecuada, incorporarlo al flujo de agua en el punto y el momento precisos, y garantizar una mezcla homogénea antes de que el agua pase a las siguientes fases del tratamiento" },
  { anverso: "¿Con qué finalidad se dosifica carbón en polvo en algunas fases del tratamiento de potabilización?", reverso: "Para adsorber sustancias que causan sabores, olores o color no deseados en el agua (especialmente en episodios de mayor carga de contaminantes orgánicos o de proliferación de algas), complementando la eliminación lograda por la coagulación-floculación" },
  { anverso: "¿Con qué finalidad se dosifica dióxido de carbono (CO₂) en el tratamiento de potabilización?", reverso: "Para ajustar y estabilizar el pH del agua, tanto para optimizar la eficacia de otros reactivos del proceso como para evitar que el agua resulte excesivamente agresiva (corrosiva) o incrustante en la red de distribución" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué reactivo coagulante emplea la Planta Potabilizadora de Casablanca?", explicacion: "El sulfato de alúmina.", dificultad: "media", opciones: ["El sulfato de alúmina", "El almidón", "El dióxido de carbono", "El carbón activo en polvo"], correcta: 0 },
  { enunciado: "¿Qué reactivo emplea la planta de Casablanca en la fase de floculación?", explicacion: "El almidón.", dificultad: "media", opciones: ["El almidón", "El sulfato de alúmina", "El hipoclorito sódico", "El dióxido de carbono"], correcta: 0 },
  { enunciado: "¿Qué función cumplen los dispositivos de preparación, adición y mezcla de los reactivos?", explicacion: "Diluir, incorporar y mezclar el reactivo de forma homogénea en el punto adecuado.", dificultad: "media", opciones: ["Diluir, incorporar y mezclar el reactivo de forma homogénea", "Eliminar por completo la necesidad de cualquier reactivo posterior", "Medir exclusivamente el caudal de entrada del agua bruta", "Purgar exclusivamente el aire acumulado en la conducción"], correcta: 0 },
  { enunciado: "¿Con qué finalidad se dosifica carbón en polvo en el tratamiento de potabilización?", explicacion: "Para adsorber sustancias causantes de sabores, olores o color no deseados.", dificultad: "dificil", opciones: ["Para adsorber sustancias causantes de sabores u olores no deseados", "Para desinfectar el agua eliminando bacterias y microorganismos", "Para desestabilizar eléctricamente las partículas en suspensión", "Para purgar el aire acumulado en los puntos altos de la conducción"], correcta: 0 },
  { enunciado: "¿Con qué finalidad se dosifica dióxido de carbono en el tratamiento de potabilización?", explicacion: "Para ajustar y estabilizar el pH del agua.", dificultad: "dificil", opciones: ["Para ajustar y estabilizar el pH del agua", "Para desinfectar el agua eliminando bacterias y microorganismos", "Para adsorber sustancias causantes de sabores u olores no deseados", "Para eliminar los sólidos gruesos del agua bruta de entrada"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 8 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 8, orden: 8, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-204 creado y vinculado como Tema 8 de Oficial Planta Potabilizadora.");
