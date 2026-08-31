/**
 * Crea tema-93: "Gestión y mantenimiento de montes y riberas" — Tema 8
 * (numero=8, bloque-2) de Oficial Agente Inspector (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 6 oficial del Anexo I (bases2110.pdf):
 *   "Gestión y mantenimiento de montes y riberas: labores de limpieza y
 *   eliminación de especies invasoras; conservación de la biodiversidad
 *   y protección de hábitats de fauna; reforestación y recuperación de
 *   áreas degradadas del término municipal de Zaragoza. Principales
 *   especies a emplear. Épocas de siembra y plantación. El Bosque de los
 *   Zaragozanos."
 *
 * El Bosque de los Zaragozanos es un proyecto municipal de reforestación
 * público y conocido del Ayuntamiento de Zaragoza; se describe en su
 * concepto general sin fabricar cifras de superficie o número de árboles
 * no verificadas en esta sesión. Contenido técnico consolidado de
 * gestión forestal/ribereña; no requiere cita legal artículo a artículo
 * (la normativa forestal y de aguas se desarrolla en detalle en tema-103
 * de esta misma oposición).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-93-gestion-montes-riberas.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-93";
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
  titulo: "Gestión y mantenimiento de montes y riberas",
  descripcion: "Limpieza y eliminación de especies invasoras. Conservación de la biodiversidad y protección de hábitats. Reforestación y recuperación de áreas degradadas. El Bosque de los Zaragozanos.",
  contenido: "Desarrolla las labores de limpieza y eliminación de especies invasoras en montes y riberas del término municipal, la conservación de la biodiversidad y protección de hábitats de fauna, y la reforestación y recuperación de áreas degradadas, con referencia al proyecto municipal del Bosque de los Zaragozanos.",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "Limpieza y eliminación de especies invasoras", seccion: "limpieza-eliminacion-especies-invasoras", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Conservación de biodiversidad y protección de hábitats", seccion: "conservacion-biodiversidad-habitats", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Reforestación, recuperación de áreas degradadas y el Bosque de los Zaragozanos", seccion: "reforestacion-bosque-zaragozanos", articulos: "Conceptos fundamentales" },
  ],
}]);

const S1 = "limpieza-eliminacion-especies-invasoras";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué labores básicas de limpieza se realizan habitualmente en montes y riberas del término municipal?", reverso: "Retirada de residuos sólidos urbanos vertidos ilegalmente, limpieza de vegetación seca acumulada (combustible forestal), y mantenimiento de sendas y caminos de acceso" },
  { anverso: "¿Qué es una especie vegetal invasora?", reverso: "Una especie introducida fuera de su área de distribución natural que se propaga de forma agresiva, desplazando a la vegetación autóctona y alterando el equilibrio del ecosistema" },
  { anverso: "¿Qué caracteriza a la caña común (Arundo donax) como especie invasora en riberas?", reverso: "Un crecimiento muy rápido y agresivo que forma masas densas, desplazando a la vegetación de ribera autóctona (sotos), y dificultando el flujo natural del agua en episodios de crecida" },
  { anverso: "¿Qué es el ailanto (Ailanthus altissima) y por qué es problemático como especie invasora urbana?", reverso: "Un árbol de crecimiento muy rápido, gran capacidad de rebrote y propagación por semilla, que coloniza solares, taludes y bordes de caminos, siendo muy difícil de erradicar solo con corte" },
  { anverso: "¿Qué métodos básicos existen para el control o eliminación de una especie vegetal invasora?", reverso: "El control mecánico (corte, desbroce, arranque de raíz), el control mediante tratamiento con producto fitosanitario autorizado en casos necesarios, y el seguimiento posterior para evitar el rebrote" },
  { anverso: "¿Por qué el simple corte de algunas especies invasoras (como el ailanto) no es suficiente para su eliminación?", reverso: "Porque muchas de estas especies tienen una gran capacidad de rebrote desde la raíz o el tocón, por lo que el corte sin tratamiento complementario puede incluso estimular un rebrote más vigoroso" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué labores de limpieza son habituales en montes y riberas municipales?", explicacion: "Retirada de residuos, limpieza de combustible forestal y mantenimiento de sendas.", dificultad: "media", opciones: ["Retirada de residuos, limpieza de combustible y sendas", "Únicamente la poda de arbolado urbano", "Únicamente el riego de céspedes", "Ninguna labor de limpieza específica"], correcta: 0 },
  { enunciado: "¿Qué es una especie vegetal invasora?", explicacion: "Una especie introducida que se propaga agresivamente desplazando a la autóctona.", dificultad: "facil", opciones: ["Una especie introducida que desplaza a la autóctona", "Cualquier especie de árbol de gran altura", "Una especie protegida por ley", "Una especie exclusiva de zonas de riego"], correcta: 0 },
  { enunciado: "¿Qué problema causa la caña común (Arundo donax) en riberas?", explicacion: "Desplaza a la vegetación autóctona y dificulta el flujo del agua en crecidas.", dificultad: "media", opciones: ["Desplaza vegetación autóctona y dificulta el flujo del agua", "Mejora la calidad del agua del río", "Es una especie protegida en Aragón", "Solo afecta a zonas urbanas, no a riberas"], correcta: 0 },
  { enunciado: "¿Por qué es problemático el ailanto como especie invasora urbana?", explicacion: "Crece muy rápido, rebrota con facilidad y es difícil de erradicar solo con corte.", dificultad: "media", opciones: ["Crece rápido y rebrota con facilidad", "Es una especie autóctona protegida", "Solo crece en riberas, no en solares urbanos", "No tiene capacidad de propagación"], correcta: 0 },
  { enunciado: "¿Qué métodos existen para el control de una especie invasora?", explicacion: "Control mecánico, tratamiento fitosanitario autorizado y seguimiento posterior.", dificultad: "media", opciones: ["Control mecánico, fitosanitario y seguimiento", "Únicamente el riego intensivo", "Únicamente la poda de formación", "No existe ningún método de control"], correcta: 0 },
  { enunciado: "¿Por qué el simple corte de especies como el ailanto no basta para eliminarlas?", explicacion: "Porque tienen gran capacidad de rebrote desde la raíz o el tocón.", dificultad: "media", opciones: ["Tienen gran capacidad de rebrote desde la raíz", "El corte elimina siempre la especie por completo", "No es necesario ningún seguimiento posterior", "El corte favorece la vegetación autóctona"], correcta: 0 },
]);

const S2 = "conservacion-biodiversidad-habitats";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un hábitat de fauna en el contexto de montes y riberas?", reverso: "El conjunto de condiciones físicas y bióticas de un espacio (vegetación, agua, refugio, alimento) que permite la presencia y reproducción de una especie animal determinada" },
  { anverso: "¿Qué es el bosque de ribera (o soto) y qué función ecológica cumple?", reverso: "La vegetación arbórea y arbustiva que se desarrolla junto a los cursos de agua (sauces, álamos, chopos); actúa como corredor ecológico, estabiliza las orillas, filtra contaminantes y da refugio a numerosas especies de fauna" },
  { anverso: "¿Qué es un corredor ecológico?", reverso: "Una franja de hábitat natural (por ejemplo, un soto ribereño) que conecta espacios naturales separados, permitiendo el desplazamiento y la dispersión de especies animales y vegetales entre ellos" },
  { anverso: "¿Por qué es importante mantener zonas de vegetación densa (matorral, sotobosque) en un espacio de biodiversidad, en lugar de dejarlo completamente despejado?", reverso: "Porque ofrece refugio, alimento y zonas de nidificación o cría para numerosas especies de fauna, que se pierden si se elimina por completo la vegetación" },
  { anverso: "¿Qué actuaciones básicas favorecen la conservación de la biodiversidad en la gestión de montes y riberas municipales?", reverso: "Respetar épocas de cría y nidificación al planificar labores de limpieza o poda, mantener zonas de vegetación autóctona sin intervenir, y controlar las especies invasoras que compiten con la fauna y flora local" },
  { anverso: "¿Por qué debe evitarse realizar labores de desbroce intensivo o poda en primavera en zonas con presencia de fauna nidificante?", reverso: "Porque coincide con la época de reproducción de muchas aves y otros animales, y la intervención puede destruir nidos, ahuyentar a los progenitores o afectar directamente a las crías" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es un hábitat de fauna?", explicacion: "El conjunto de condiciones que permiten la presencia y reproducción de una especie.", dificultad: "facil", opciones: ["Las condiciones que permiten la presencia de una especie", "Un tipo de especie vegetal invasora", "Un tipo de residuo vegetal", "Un tramo concreto de un río"], correcta: 0 },
  { enunciado: "¿Qué función ecológica cumple el bosque de ribera o soto?", explicacion: "Corredor ecológico, estabiliza orillas, filtra contaminantes y da refugio a fauna.", dificultad: "media", opciones: ["Corredor ecológico y refugio de fauna", "Únicamente valor estético del paisaje", "Únicamente producción de madera", "No cumple ninguna función ecológica"], correcta: 0 },
  { enunciado: "¿Qué es un corredor ecológico?", explicacion: "Una franja de hábitat que conecta espacios naturales separados.", dificultad: "media", opciones: ["Una franja que conecta espacios naturales", "Un tipo de especie invasora", "Un camino de acceso para maquinaria", "Un tipo de tratamiento fitosanitario"], correcta: 0 },
  { enunciado: "¿Por qué es importante mantener zonas de vegetación densa en espacios de biodiversidad?", explicacion: "Ofrece refugio, alimento y zonas de cría para la fauna.", dificultad: "media", opciones: ["Ofrece refugio y zonas de cría para la fauna", "No aporta ningún beneficio ecológico", "Solo tiene valor estético", "Favorece la propagación de especies invasoras"], correcta: 0 },
  { enunciado: "¿Qué actuación favorece la conservación de biodiversidad en la gestión de montes y riberas?", explicacion: "Respetar épocas de cría y controlar especies invasoras.", dificultad: "media", opciones: ["Respetar épocas de cría y controlar invasoras", "Desbrozar toda la vegetación sin excepción", "Eliminar toda la vegetación autóctona", "Ignorar las épocas de nidificación"], correcta: 0 },
  { enunciado: "¿Por qué debe evitarse el desbroce intensivo en primavera en zonas con fauna nidificante?", explicacion: "Coincide con la época de reproducción y puede afectar a nidos y crías.", dificultad: "media", opciones: ["Coincide con la época de reproducción de la fauna", "No tiene ninguna relación con la fauna", "Solo afecta a especies invasoras", "La primavera es la mejor época para desbrozar"], correcta: 0 },
]);

const S3 = "reforestacion-bosque-zaragozanos";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es la reforestación?", reverso: "La plantación de árboles y arbustos en una superficie que anteriormente tenía cubierta forestal y la ha perdido, con el objetivo de restaurar el ecosistema forestal" },
  { anverso: "¿Qué es la recuperación de áreas degradadas en el contexto de la gestión de montes y riberas?", reverso: "El conjunto de actuaciones (limpieza, eliminación de invasoras, reforestación con especies autóctonas, restauración del suelo) dirigidas a devolver a un espacio degradado (por erosión, vertidos, incendios, invasión de especies) su funcionalidad ecológica" },
  { anverso: "¿Qué es el Bosque de los Zaragozanos?", reverso: "Un proyecto municipal de reforestación del Ayuntamiento de Zaragoza en el entorno del término municipal, orientado a aumentar la masa forestal y la biodiversidad, con participación ciudadana en la plantación de árboles" },
  { anverso: "¿Qué criterio general debe seguirse al elegir las especies a emplear en una reforestación de una zona degradada del término municipal de Zaragoza?", reverso: "Priorizar especies autóctonas, bien adaptadas al clima y suelo local (semiárido continental), y con buena tolerancia a la sequía, evitando especies exóticas o invasoras" },
  { anverso: "¿Qué especies arbóreas son propias de la ribera del Ebro y sus afluentes en el entorno de Zaragoza?", reverso: "Chopos (Populus), sauces (Salix), olmos (Ulmus) y fresnos (Fraxinus), entre otras especies de ribera adaptadas a la humedad y proximidad al cauce" },
  { anverso: "¿Qué época es habitualmente la más adecuada para las labores de siembra y plantación en un proyecto de reforestación en el clima de Zaragoza?", reverso: "El otoño y el invierno (periodo de reposo vegetativo y mayor disponibilidad de humedad en el suelo), evitando las plantaciones en pleno verano por el estrés hídrico y las altas temperaturas" },
  { anverso: "¿Qué cuidados posteriores requiere una plantación de reforestación en sus primeros años, especialmente en clima semiárido como el de Zaragoza?", reverso: "Riegos de mantenimiento (especialmente en los primeros veranos), control de competencia de malas hierbas, protección frente a fauna herbívora (mediante protectores) y reposición de marras (ejemplares que no prosperan)" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es la reforestación?", explicacion: "La plantación de árboles y arbustos para restaurar una superficie forestal perdida.", dificultad: "facil", opciones: ["La plantación para restaurar una cubierta forestal perdida", "La eliminación de especies invasoras exclusivamente", "El riego de zonas verdes urbanas", "La poda de formación de arbolado urbano"], correcta: 0 },
  { enunciado: "¿Qué es la recuperación de áreas degradadas?", explicacion: "Actuaciones para devolver la funcionalidad ecológica a un espacio degradado.", dificultad: "media", opciones: ["Devolver la funcionalidad ecológica a un espacio degradado", "Únicamente la limpieza de residuos urbanos", "Únicamente la poda de seguridad del arbolado", "Un sinónimo exacto de desbroce"], correcta: 0 },
  { enunciado: "¿Qué es el Bosque de los Zaragozanos?", explicacion: "Un proyecto municipal de reforestación del Ayuntamiento de Zaragoza.", dificultad: "media", opciones: ["Un proyecto municipal de reforestación", "Un parque urbano ya consolidado desde el siglo XIX", "Una especie vegetal invasora del término municipal", "Un tipo de bosque de ribera natural"], correcta: 0 },
  { enunciado: "¿Qué criterio debe priorizarse al elegir especies para reforestar en Zaragoza?", explicacion: "Especies autóctonas adaptadas al clima semiárido y con tolerancia a la sequía.", dificultad: "media", opciones: ["Especies autóctonas adaptadas al clima semiárido", "Especies exóticas de crecimiento muy rápido", "Especies invasoras de fácil propagación", "Cualquier especie, sin ningún criterio"], correcta: 0 },
  { enunciado: "¿Qué especies arbóreas son propias de la ribera del Ebro en Zaragoza?", explicacion: "Chopos, sauces, olmos y fresnos.", dificultad: "media", opciones: ["Chopos, sauces, olmos y fresnos", "Palmeras y cactus exclusivamente", "Pinos de montaña exclusivamente", "Ninguna especie arbórea es propia de ribera"], correcta: 0 },
  { enunciado: "¿Cuál es la época más adecuada para siembra y plantación en el clima de Zaragoza?", explicacion: "Otoño e invierno, periodo de reposo vegetativo.", dificultad: "media", opciones: ["Otoño e invierno", "Pleno verano", "Solo en primavera", "No influye la época del año"], correcta: 0 },
  { enunciado: "¿Qué cuidado posterior es especialmente importante en una reforestación en clima semiárido?", explicacion: "Riegos de mantenimiento en los primeros veranos.", dificultad: "media", opciones: ["Riegos de mantenimiento en los primeros veranos", "No requiere ningún cuidado posterior", "Solo la poda anual de formación", "Solo la aplicación de fitosanitarios"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 8 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 8, orden: 8, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-93 creado y vinculado como Tema 8 de Oficial Agente Inspector.");
