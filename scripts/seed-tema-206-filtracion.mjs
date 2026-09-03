/**
 * Crea tema-206: "La filtración" — Tema 10 (numero=10, bloque-2) de
 * Oficial Planta Potabilizadora (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 8 oficial del Anexo I (bases2110.pdf, línea
 * 1141): "La filtración: Conceptos fundamentales. Esquema general de
 * filtros abiertos y cerrados. Filtración por arena. Filtración con
 * carbón activo. La regulación del caudal circulante por los filtros.
 * Lavado de filtros. Control y automatismo de la filtración y del
 * lavado de los filtros. Mantenimiento de equipos y de la obra civil."
 *
 * Fuente primaria verificada mediante búsqueda en esta sesión:
 * Ayuntamiento de Zaragoza, portal de infraestructuras, "Potabilización
 * de agua": la Planta de Casablanca emplea filtración sobre lechos de
 * arena o carbón activo para eliminar los sólidos en suspensión que
 * quedan en el agua tras la decantación. El resto del contenido técnico
 * (esquema de filtros abiertos/cerrados, regulación de caudal, lavado
 * de filtros, control y automatismo) es conocimiento técnico
 * consolidado del tratamiento de aguas, sin una norma española
 * específica que lo regule a ese nivel operativo.
 *
 * Tres secciones:
 * 1. conceptos-esquema-filtros-abiertos-cerrados
 * 2. filtracion-arena-carbon-activo
 * 3. regulacion-caudal-lavado-automatismo-mantenimiento
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-206-filtracion.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-206";
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
  titulo: "La filtración",
  descripcion: "Conceptos fundamentales de la filtración y esquema de filtros abiertos y cerrados. Filtración por arena y con carbón activo. Regulación del caudal, lavado de filtros, control y automatismo, y mantenimiento.",
  contenido: "Desarrolla la filtración como etapa del tratamiento de potabilización posterior a la decantación: sus conceptos fundamentales, el esquema general de filtros abiertos y cerrados, la filtración por arena y con carbón activo (empleadas ambas en la Planta Potabilizadora de Casablanca), la regulación del caudal circulante por los filtros, el lavado de filtros y su control y automatismo, y el mantenimiento de sus equipos y de la obra civil.",
  enlaces_boe: [
    "https://www.zaragoza.es/sede/portal/infraestructuras/agua/potabilizacion",
  ],
  indice_estudio: [
    { url: "", titulo: "Conceptos fundamentales y esquema de filtros abiertos y cerrados", seccion: "conceptos-esquema-filtros-abiertos-cerrados", articulos: "Conocimiento técnico del tratamiento de aguas" },
    { url: "https://www.zaragoza.es/sede/portal/infraestructuras/agua/potabilizacion", titulo: "Filtración por arena y con carbón activo", seccion: "filtracion-arena-carbon-activo", articulos: "Ayuntamiento de Zaragoza — Potabilización del agua" },
    { url: "", titulo: "Regulación de caudal, lavado de filtros, automatismo y mantenimiento", seccion: "regulacion-caudal-lavado-automatismo-mantenimiento", articulos: "Conocimiento técnico del tratamiento de aguas" },
  ],
}]);

const S1 = "conceptos-esquema-filtros-abiertos-cerrados";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿En qué consiste la filtración, como etapa del tratamiento de potabilización posterior a la decantación?", reverso: "En hacer pasar el agua ya decantada a través de un medio poroso (lecho filtrante) que retiene las partículas en suspensión de menor tamaño que no fueron eliminadas en la decantación, mejorando la claridad y la calidad final del agua" },
  { anverso: "¿Qué es un filtro abierto (o de gravedad), en el esquema general de filtración?", reverso: "Un filtro en el que el agua circula a través del lecho filtrante por la propia gravedad, sin estar contenido en un recipiente cerrado a presión, habitual en plantas potabilizadoras de gran tamaño" },
  { anverso: "¿Qué es un filtro cerrado (o a presión), a diferencia de uno abierto?", reverso: "Un filtro contenido en un recipiente cerrado, en el que el agua circula impulsada por presión, habitual en instalaciones de menor tamaño o donde se requiere un espacio más compacto" },
  { anverso: "¿Qué capas suele tener un filtro de tipo abierto, de arriba abajo?", reverso: "El lecho filtrante propiamente dicho (arena, o arena y carbón activo, según el diseño), una capa de grava de soporte de granulometría creciente, y el sistema de drenaje que recoge el agua ya filtrada en la parte inferior" },
  { anverso: "¿Por qué es relevante distinguir entre filtros abiertos y cerrados a la hora de planificar su mantenimiento?", reverso: "Porque el acceso, la inspección visual y las operaciones de mantenimiento (como el lavado o la reposición del lecho filtrante) difieren considerablemente entre un filtro abierto, más accesible, y uno cerrado, cuyo interior no es visible sin desmontaje o instrumentación específica" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿En qué consiste la filtración, como etapa del tratamiento de potabilización?", explicacion: "En hacer pasar el agua ya decantada por un medio poroso que retiene partículas en suspensión.", dificultad: "facil", opciones: ["En hacer pasar el agua por un medio poroso que retiene partículas", "En eliminar los sólidos gruesos del agua bruta mediante rejas", "En desinfectar el agua mediante la adición de hipoclorito", "En desestabilizar eléctricamente las partículas en suspensión"], correcta: 0 },
  { enunciado: "¿Qué es un filtro abierto o de gravedad?", explicacion: "Un filtro en el que el agua circula por gravedad, sin recipiente cerrado a presión.", dificultad: "media", opciones: ["Un filtro en el que el agua circula por gravedad", "Un filtro contenido en un recipiente cerrado a presión", "Un filtro exclusivo para agua ya desinfectada por cloro", "Un filtro que no requiere ningún tipo de lecho filtrante"], correcta: 0 },
  { enunciado: "¿Qué es un filtro cerrado o a presión?", explicacion: "Un filtro contenido en un recipiente cerrado en el que el agua circula por presión.", dificultad: "media", opciones: ["Un filtro contenido en un recipiente cerrado a presión", "Un filtro en el que el agua circula exclusivamente por gravedad", "Un filtro exclusivo para el desbaste inicial del agua bruta", "Un filtro que no requiere ningún tipo de lavado periódico"], correcta: 0 },
  { enunciado: "¿Qué capas suele tener, de arriba abajo, un filtro de tipo abierto?", explicacion: "El lecho filtrante, una capa de grava de soporte y el sistema de drenaje.", dificultad: "dificil", opciones: ["El lecho filtrante, la grava de soporte y el drenaje", "Únicamente una capa de hormigón impermeable", "Únicamente una capa de carbón activo sin ningún soporte adicional", "Únicamente un sistema de tuberías sin ningún lecho filtrante"], correcta: 0 },
  { enunciado: "¿Por qué es relevante distinguir entre filtros abiertos y cerrados de cara al mantenimiento?", explicacion: "El acceso y las operaciones de mantenimiento difieren considerablemente entre ambos tipos.", dificultad: "media", opciones: ["El acceso y las operaciones de mantenimiento difieren entre ambos", "No existe ninguna diferencia real de mantenimiento entre ambos tipos", "Los filtros cerrados nunca requieren ningún tipo de mantenimiento", "Los filtros abiertos nunca requieren ningún tipo de mantenimiento"], correcta: 0 },
]);

const S2 = "filtracion-arena-carbon-activo";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué medio filtrante emplea la filtración por arena?", reverso: "Un lecho de arena de una granulometría determinada, que retiene por tamizado y adsorción superficial las partículas en suspensión que el agua arrastra tras la decantación" },
  { anverso: "¿Qué medio filtrante emplea la filtración con carbón activo, y qué aporta frente a la filtración exclusiva por arena?", reverso: "Un lecho de carbón activo (obtenido a partir de materia orgánica sometida a un proceso de activación que le confiere una gran superficie porosa), que además de retener partículas por filtración física adsorbe sustancias disueltas responsables de sabores, olores o color no deseados" },
  { anverso: "¿Qué proceso ha empleado la Planta Potabilizadora de Casablanca en su etapa de filtración, según la información oficial del Ayuntamiento de Zaragoza?", reverso: "La eliminación de los sólidos en suspensión que quedan en el agua sobre lechos de arena o carbón activo, en filtros específicos de esta etapa del tratamiento" },
  { anverso: "¿Por qué puede combinarse la arena y el carbón activo en un mismo filtro, en lugar de emplear un único medio filtrante?", reverso: "Porque cada medio aporta una función distinta y complementaria: la arena retiene principalmente partículas por filtración física, mientras que el carbón activo añade capacidad de adsorción de sustancias disueltas, mejorando el resultado conjunto del proceso" },
  { anverso: "¿Qué ocurre con la capacidad de adsorción del carbón activo con el uso continuado del filtro?", reverso: "Se va agotando progresivamente conforme adsorbe más sustancias, por lo que el carbón activo requiere una regeneración periódica o su sustitución, a diferencia de la arena, que se mantiene físicamente estable durante mucho más tiempo (aunque también requiere lavado)" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué medio filtrante emplea la filtración por arena?", explicacion: "Un lecho de arena de granulometría determinada.", dificultad: "facil", opciones: ["Un lecho de arena de granulometría determinada", "Un lecho de carbón activo exclusivamente", "Un lecho de sulfato de alúmina exclusivamente", "Un lecho de hipoclorito sódico exclusivamente"], correcta: 0 },
  { enunciado: "¿Qué aporta la filtración con carbón activo frente a la filtración exclusiva por arena?", explicacion: "Añade capacidad de adsorción de sustancias disueltas causantes de sabor u olor.", dificultad: "media", opciones: ["Añade capacidad de adsorción de sustancias disueltas", "Elimina por completo la necesidad de la etapa de decantación previa", "Elimina por completo la necesidad de la desinfección posterior", "Reduce de forma directa la presión disponible en toda la planta"], correcta: 0 },
  { enunciado: "¿Qué proceso de filtración emplea la Planta Potabilizadora de Casablanca, según la información oficial del Ayuntamiento?", explicacion: "Lechos de arena o carbón activo.", dificultad: "media", opciones: ["Lechos de arena o carbón activo", "Exclusivamente membranas de ósmosis inversa", "Exclusivamente filtros de papel de un solo uso", "Exclusivamente resinas de intercambio iónico"], correcta: 0 },
  { enunciado: "¿Por qué puede combinarse arena y carbón activo en un mismo filtro?", explicacion: "Porque cada medio aporta una función complementaria distinta.", dificultad: "dificil", opciones: ["Porque cada medio aporta una función complementaria distinta", "Porque ambos materiales cumplen exactamente la misma función", "Porque la combinación reduce siempre el coste total del filtro", "Porque la normativa exige expresamente esa combinación en todo caso"], correcta: 0 },
  { enunciado: "¿Qué ocurre con la capacidad de adsorción del carbón activo con el uso continuado?", explicacion: "Se agota progresivamente, requiriendo regeneración o sustitución.", dificultad: "media", opciones: ["Se agota progresivamente, requiriendo regeneración o sustitución", "Aumenta de forma indefinida sin ningún límite práctico real", "Se mantiene exactamente constante durante toda la vida del filtro", "No guarda ninguna relación con el uso continuado del filtro"], correcta: 0 },
]);

const S3 = "regulacion-caudal-lavado-automatismo-mantenimiento";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Por qué es necesario regular el caudal circulante por los filtros de una planta potabilizadora?", reverso: "Para mantener una velocidad de filtración adecuada: un caudal excesivo reduce el tiempo de contacto y la eficacia de la retención de partículas, mientras que un caudal insuficiente reduce la capacidad de tratamiento de la planta" },
  { anverso: "¿Por qué es necesario el lavado periódico de los filtros?", reverso: "Porque las partículas retenidas van colmatando progresivamente el lecho filtrante, aumentando la pérdida de carga y reduciendo la capacidad de tratamiento, hasta que resulta necesario retirarlas mediante un lavado" },
  { anverso: "¿En qué consiste habitualmente el lavado (o retrolavado) de un filtro?", reverso: "En invertir el sentido normal de circulación del agua, haciéndola pasar de abajo hacia arriba a mayor velocidad (a veces combinada con aire) para expandir el lecho filtrante y arrastrar las partículas retenidas fuera del filtro" },
  { anverso: "¿Qué papel cumple el control y el automatismo en la regulación del caudal y el lavado de los filtros de una planta moderna?", reverso: "Permite programar y ejecutar de forma automática los ciclos de lavado en función de parámetros medidos (pérdida de carga, tiempo de servicio, turbidez del agua filtrada), sin depender exclusivamente de la observación y la actuación manual del operario" },
  { anverso: "¿Qué aspectos de mantenimiento requieren especial atención en los filtros, además del propio lecho filtrante?", reverso: "El sistema de drenaje inferior (para evitar obstrucciones), las válvulas de entrada, salida y lavado, los equipos de bombeo o soplado empleados en el retrolavado, y el estado de la obra civil del propio filtro (estructura, revestimientos, juntas de estanqueidad)" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Por qué es necesario regular el caudal circulante por los filtros?", explicacion: "Un caudal excesivo reduce la eficacia; uno insuficiente reduce la capacidad de tratamiento.", dificultad: "media", opciones: ["Un caudal excesivo reduce la eficacia de retención de partículas", "El caudal no tiene ninguna relación real con la eficacia del filtro", "Cuanto mayor sea el caudal, siempre mejor será la eficacia del filtro", "El caudal solo es relevante en la etapa de decantación, no en filtración"], correcta: 0 },
  { enunciado: "¿Por qué es necesario el lavado periódico de los filtros?", explicacion: "Las partículas retenidas colmatan progresivamente el lecho filtrante.", dificultad: "facil", opciones: ["Las partículas retenidas colmatan progresivamente el lecho filtrante", "El lecho filtrante se disuelve completamente con el uso continuado", "El lavado periódico no aporta ninguna ventaja real al proceso", "El lavado solo es necesario en los filtros de tipo cerrado"], correcta: 0 },
  { enunciado: "¿En qué consiste habitualmente el lavado o retrolavado de un filtro?", explicacion: "Invertir el sentido de circulación del agua, de abajo hacia arriba, a mayor velocidad.", dificultad: "media", opciones: ["Invertir el sentido de circulación del agua a mayor velocidad", "Añadir sulfato de alúmina al lecho filtrante ya colmatado", "Sustituir por completo el lecho filtrante en cada lavado realizado", "Aumentar de forma permanente el caudal normal de filtración"], correcta: 0 },
  { enunciado: "¿Qué papel cumple el automatismo en la regulación del caudal y el lavado de los filtros?", explicacion: "Permite programar y ejecutar automáticamente los ciclos según parámetros medidos.", dificultad: "media", opciones: ["Permite programar y ejecutar automáticamente los ciclos de lavado", "Elimina por completo la necesidad de cualquier mantenimiento físico", "Sustituye por completo la necesidad del lecho filtrante del filtro", "Solo es aplicable en filtros de tipo abierto, nunca en cerrados"], correcta: 0 },
  { enunciado: "¿Qué aspectos, además del lecho filtrante, requieren especial atención en el mantenimiento de un filtro?", explicacion: "El sistema de drenaje, las válvulas y los equipos de bombeo o soplado del retrolavado.", dificultad: "dificil", opciones: ["El drenaje, las válvulas y los equipos del retrolavado", "Únicamente el color exterior de la estructura del filtro", "Únicamente la fecha de instalación original del filtro", "Ningún aspecto adicional distinto del propio lecho filtrante"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 10 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 10, orden: 10, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-206 creado y vinculado como Tema 10 de Oficial Planta Potabilizadora.");
