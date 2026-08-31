/**
 * Crea tema-97: "Organización de tareas de limpieza pública" — Tema 12
 * (numero=12, bloque-2) de Oficial Agente Inspector (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 10 oficial del Anexo I (bases2110.pdf):
 *   "Organización de tareas de limpieza pública: barrido manual de
 *   calles y plazas, recogiendo hojas y residuos; uso de maquinaria
 *   específica como sopladores y barredoras; planificación de rutas de
 *   limpieza según necesidades estacionales."
 *
 * Conocimiento técnico consolidado de organización de servicios de
 * limpieza viaria; no requiere cita legal artículo a artículo.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-97-organizacion-limpieza-publica.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-97";
const OPOSICION = "oficial-agente-inspector-ayto-zaragoza";
const BLOQUE_2_ID = "b74ad422-4965-469e-9b9c-ef1a39c26d76";

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
  titulo: "Organización de tareas de limpieza pública",
  descripcion: "Barrido manual de calles y plazas. Maquinaria específica: sopladores y barredoras. Planificación de rutas de limpieza según necesidades estacionales.",
  contenido: "Desarrolla la organización de las tareas de limpieza pública: el barrido manual de calles y plazas, la maquinaria específica empleada (sopladores, barredoras), y la planificación de rutas de limpieza adaptadas a las necesidades estacionales.",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "Barrido manual de calles y plazas", seccion: "barrido-manual-calles-plazas", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Maquinaria específica: sopladores y barredoras", seccion: "maquinaria-sopladores-barredoras", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Planificación de rutas de limpieza estacional", seccion: "planificacion-rutas-limpieza-estacional", articulos: "Conceptos fundamentales" },
  ],
}]);

const S1 = "barrido-manual-calles-plazas";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué herramientas básicas se emplean en el barrido manual de calles y plazas?", reverso: "Escoba de calle (de mango largo), recogedor, carrito o contenedor portátil de recogida, y bolsas para residuos" },
  { anverso: "¿Qué zonas urbanas requieren habitualmente barrido manual en lugar de mecánico?", reverso: "Zonas estrechas, con mobiliario urbano denso, escalinatas, entornos de difícil acceso para maquinaria, y zonas peatonales de alta afluencia donde la maquinaria resultaría molesta o peligrosa" },
  { anverso: "¿Qué se recoge típicamente durante el barrido manual además de hojas caídas?", reverso: "Papeles, colillas, envoltorios, restos orgánicos y otros residuos de pequeño tamaño depositados en la vía pública" },
  { anverso: "¿Qué franja horaria suele preferirse para las tareas de barrido en zonas de alta afluencia peatonal?", reverso: "Primeras horas de la mañana o última hora de la noche, cuando la afluencia de personas es menor, minimizando molestias e interferencias" },
  { anverso: "¿Qué EPI básico es recomendable para el personal de barrido manual en vía pública?", reverso: "Chaleco o ropa de alta visibilidad, guantes de protección, y calzado de seguridad adecuado, especialmente en zonas con tránsito de vehículos" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué herramientas básicas se emplean en el barrido manual?", explicacion: "Escoba de calle, recogedor y carrito de recogida.", dificultad: "facil", opciones: ["Escoba, recogedor y carrito de recogida", "Barredora mecánica exclusivamente", "Soplador de hojas exclusivamente", "Ninguna herramienta específica"], correcta: 0 },
  { enunciado: "¿Qué zonas requieren habitualmente barrido manual en lugar de mecánico?", explicacion: "Zonas estrechas, con mobiliario denso o de difícil acceso para maquinaria.", dificultad: "media", opciones: ["Zonas estrechas o de difícil acceso para maquinaria", "Únicamente autopistas urbanas", "Únicamente polígonos industriales", "Ninguna zona requiere barrido manual"], correcta: 0 },
  { enunciado: "¿Qué se recoge típicamente durante el barrido manual además de hojas?", explicacion: "Papeles, colillas, envoltorios y restos orgánicos de pequeño tamaño.", dificultad: "facil", opciones: ["Papeles, colillas y envoltorios", "Únicamente ramas de gran tamaño", "Únicamente residuos electrónicos", "Únicamente escombros de obra"], correcta: 0 },
  { enunciado: "¿Qué franja horaria se prefiere para el barrido en zonas de alta afluencia?", explicacion: "Primeras horas de la mañana o última hora de la noche.", dificultad: "media", opciones: ["Primeras horas de la mañana o de la noche", "El mediodía, con máxima afluencia", "Solo los fines de semana", "No influye la franja horaria"], correcta: 0 },
  { enunciado: "¿Qué EPI es recomendable para el personal de barrido en vía pública?", explicacion: "Ropa de alta visibilidad, guantes y calzado de seguridad.", dificultad: "media", opciones: ["Alta visibilidad, guantes y calzado de seguridad", "No es necesaria ninguna protección especial", "Solo gafas de sol convencionales", "Solo un chaleco de cualquier color"], correcta: 0 },
]);

const S2 = "maquinaria-sopladores-barredoras";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un soplador en tareas de limpieza pública?", reverso: "Una máquina portátil (de mano o de mochila) que genera una corriente de aire para agrupar y desplazar hojas, papeles y residuos ligeros hacia un punto de recogida" },
  { anverso: "¿Qué es una barredora mecánica y qué tipos básicos existen según su tamaño?", reverso: "Una máquina que recoge mecánicamente residuos de la superficie de la calle mediante cepillos giratorios y un sistema de aspiración/recogida; existen modelos pequeños (aceras, zonas peatonales) y grandes (barredoras viales de gran capacidad para calzadas)" },
  { anverso: "¿Qué ventaja aporta una barredora mecánica frente al barrido manual en grandes superficies?", reverso: "Mayor rapidez y eficiencia en la limpieza de superficies extensas, con menor esfuerzo físico para el operario y mayor capacidad de recogida de residuos" },
  { anverso: "¿Qué limitación tiene el uso de sopladores en entornos urbanos, especialmente cerca de zonas residenciales?", reverso: "El ruido generado y la posible dispersión de polvo o partículas finas al aire, por lo que su uso suele estar sujeto a restricciones horarias en ordenanzas municipales de ruido" },
  { anverso: "¿Qué mantenimiento básico requiere una barredora mecánica?", reverso: "Revisión y sustitución periódica de los cepillos desgastados, limpieza del depósito de residuos, y comprobación del sistema de aspiración/filtrado" },
  { anverso: "¿Qué EPI adicional es recomendable al usar un soplador o una barredora mecánica, frente al barrido manual?", reverso: "Protección auditiva (por el nivel de ruido de la maquinaria) y, en el caso del soplador, mascarilla o protección respiratoria frente al polvo generado" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es un soplador en tareas de limpieza pública?", explicacion: "Una máquina que genera aire para agrupar y desplazar residuos ligeros.", dificultad: "facil", opciones: ["Una máquina que genera aire para agrupar residuos", "Una máquina de aspiración de agua", "Un tipo de barredora vial grande", "Una herramienta de barrido manual"], correcta: 0 },
  { enunciado: "¿Qué tipos básicos de barredora mecánica existen según su tamaño?", explicacion: "Modelos pequeños para aceras y grandes barredoras viales.", dificultad: "media", opciones: ["Pequeñas para aceras y grandes viales", "Solo modelos de gran capacidad vial", "Solo modelos manuales de mano", "No existen tipos diferenciados"], correcta: 0 },
  { enunciado: "¿Qué ventaja aporta una barredora mecánica frente al barrido manual en grandes superficies?", explicacion: "Mayor rapidez, eficiencia y menor esfuerzo físico.", dificultad: "media", opciones: ["Mayor rapidez y menor esfuerzo físico", "No aporta ninguna ventaja real", "Solo funciona en superficies pequeñas", "Requiere siempre más personal"], correcta: 0 },
  { enunciado: "¿Qué limitación presenta el uso de sopladores cerca de zonas residenciales?", explicacion: "El ruido y la posible dispersión de polvo, sujetos a restricciones horarias.", dificultad: "media", opciones: ["Ruido y dispersión de polvo con restricciones horarias", "No presenta ninguna limitación", "Solo puede usarse de noche", "Está prohibido en toda la ciudad"], correcta: 0 },
  { enunciado: "¿Qué mantenimiento básico requiere una barredora mecánica?", explicacion: "Revisión de cepillos, limpieza del depósito y comprobación de aspiración.", dificultad: "media", opciones: ["Revisión de cepillos y comprobación de aspiración", "No requiere ningún mantenimiento periódico", "Solo lavarla exteriormente cada semana", "Solo cambiar el color de la carcasa"], correcta: 0 },
  { enunciado: "¿Qué EPI adicional es recomendable al usar soplador o barredora mecánica?", explicacion: "Protección auditiva y, en el soplador, protección respiratoria frente al polvo.", dificultad: "media", opciones: ["Protección auditiva y respiratoria frente al polvo", "No es necesaria ninguna protección adicional", "Solo gafas de sol convencionales", "Solo calzado deportivo habitual"], correcta: 0 },
]);

const S3 = "planificacion-rutas-limpieza-estacional";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es la planificación de rutas de limpieza pública?", reverso: "La organización previa del recorrido, orden y frecuencia con que se atienden las distintas calles y espacios de una zona, optimizando el tiempo y los recursos disponibles" },
  { anverso: "¿Por qué la caída de hojas en otoño exige adaptar la planificación de rutas de limpieza?", reverso: "Porque aumenta considerablemente el volumen de residuos vegetales en calles y zonas verdes, requiriendo mayor frecuencia de paso o refuerzo de recursos en las zonas con más arbolado" },
  { anverso: "¿Qué necesidades estacionales adicionales pueden condicionar la planificación de rutas de limpieza en primavera?", reverso: "La mayor presencia de polen y flores caídas, así como el inicio de la temporada de mayor uso de parques y zonas verdes que puede generar más residuos de ocio (envases, restos de picnic)" },
  { anverso: "¿Qué criterio de priorización se sigue habitualmente al planificar rutas de limpieza en una ciudad?", reverso: "Priorizar zonas de mayor afluencia peatonal, entornos de centros escolares y sanitarios, mercados y zonas comerciales, y vías principales, sin descuidar el resto del callejero según su frecuencia establecida" },
  { anverso: "¿Qué eventos puntuales (no estrictamente estacionales) pueden requerir un refuerzo extraordinario de la limpieza pública?", reverso: "Fiestas patronales, mercados especiales, eventos deportivos multitudinarios o mercadillos periódicos, que generan un volumen de residuos superior al habitual en un espacio y tiempo concretos" },
  { anverso: "¿Qué papel tiene el agente inspector en la planificación y seguimiento de las rutas de limpieza pública?", reverso: "Supervisar el cumplimiento de las rutas y frecuencias establecidas, detectar zonas con necesidades no cubiertas o incidencias recurrentes, y proponer ajustes a la planificación según la observación directa sobre el terreno" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es la planificación de rutas de limpieza pública?", explicacion: "La organización previa del recorrido, orden y frecuencia de atención a cada zona.", dificultad: "facil", opciones: ["La organización previa del recorrido y frecuencia", "El barrido manual exclusivamente", "El uso exclusivo de barredoras mecánicas", "Un tipo de EPI del personal de limpieza"], correcta: 0 },
  { enunciado: "¿Por qué el otoño exige adaptar la planificación de rutas de limpieza?", explicacion: "Aumenta el volumen de residuos vegetales por la caída de hojas.", dificultad: "media", opciones: ["Aumenta el volumen de residuos vegetales", "Disminuye la necesidad de limpieza", "No afecta a la planificación de rutas", "Solo afecta a zonas industriales"], correcta: 0 },
  { enunciado: "¿Qué necesidad estacional adicional aparece en primavera?", explicacion: "Mayor polen/flores caídas y más residuos de ocio en zonas verdes.", dificultad: "media", opciones: ["Más polen, flores caídas y residuos de ocio", "Ninguna necesidad adicional en primavera", "Solo afecta al riego, no a la limpieza", "Solo afecta a zonas de montaña"], correcta: 0 },
  { enunciado: "¿Qué criterio de priorización se sigue al planificar rutas de limpieza?", explicacion: "Priorizar zonas de mayor afluencia, centros escolares/sanitarios y vías principales.", dificultad: "media", opciones: ["Priorizar zonas de mayor afluencia y vías principales", "Atender todas las zonas exactamente igual", "Priorizar únicamente zonas industriales", "No existe ningún criterio de priorización"], correcta: 0 },
  { enunciado: "¿Qué eventos puntuales pueden requerir refuerzo extraordinario de limpieza?", explicacion: "Fiestas patronales, mercados especiales y eventos deportivos multitudinarios.", dificultad: "media", opciones: ["Fiestas patronales y eventos multitudinarios", "Ningún evento requiere refuerzo especial", "Solo los días laborables ordinarios", "Solo los días de lluvia"], correcta: 0 },
  { enunciado: "¿Qué papel tiene el agente inspector respecto a las rutas de limpieza pública?", explicacion: "Supervisar el cumplimiento y proponer ajustes según observación en el terreno.", dificultad: "media", opciones: ["Supervisar el cumplimiento y proponer ajustes", "Ningún papel, es competencia exclusiva de otro servicio", "Solo conducir la barredora mecánica", "Solo gestionar el presupuesto de limpieza"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 12 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 12, orden: 12, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-97 creado y vinculado como Tema 12 de Oficial Agente Inspector.");
