/**
 * Crea tema-71: "Centros Cívicos de Zaragoza" — Tema 17 (numero=17,
 * bloque-2) de Oficial Mantenimiento General (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 15 oficial del Anexo I (bases2110.pdf):
 *   "Centros Cívicos: Concepto y cometidos de los Centros Cívicos en la
 *   organización municipal de la Ciudad de Zaragoza. Tipos de
 *   actividades socioculturales que se realizan en Centros Cívicos que
 *   requieren las funciones de la persona que ocupe el puesto de Oficial
 *   Mantenimiento General."
 *
 * Contenido basado en el conocimiento público y consolidado sobre la
 * red de Centros Cívicos del Ayuntamiento de Zaragoza (equipamientos de
 * proximidad de gestión municipal, con actividades socioculturales,
 * educativas y de participación); no se citan datos de detalle variables
 * (número exacto de centros, direcciones concretas) que cambian con el
 * tiempo y deben consultarse actualizados en zaragoza.es.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-71-centros-civicos.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-71";
const OPOSICION = "oficial-mantenimiento-ayto-zaragoza";
const BLOQUE_2_ID = "336de420-fb74-4814-9d50-6e2981ed064f";

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
  titulo: "Centros Cívicos de Zaragoza",
  descripcion: "Concepto y cometidos de los Centros Cívicos en la organización municipal de Zaragoza. Tipos de actividades socioculturales y funciones del oficial de mantenimiento general en estos equipamientos.",
  contenido: "Desarrolla el concepto y los cometidos de los Centros Cívicos dentro de la organización municipal de Zaragoza, los tipos de actividades socioculturales que albergan, y las funciones específicas del oficial de mantenimiento general en el correcto funcionamiento de estos equipamientos de proximidad.",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "Concepto y organización de los Centros Cívicos", seccion: "concepto-organizacion-centros-civicos", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Tipos de actividades socioculturales", seccion: "tipos-actividades-socioculturales-centros-civicos", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Funciones del oficial de mantenimiento en Centros Cívicos", seccion: "funciones-oficial-mantenimiento-centros-civicos", articulos: "Conceptos fundamentales" },
  ],
}]);

const S1 = "concepto-organizacion-centros-civicos";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un Centro Cívico en la organización municipal de Zaragoza?", reverso: "Un equipamiento municipal de proximidad, distribuido por distritos y barrios, destinado a facilitar el acceso de la ciudadanía a actividades culturales, educativas, sociales y de participación" },
  { anverso: "¿Cuál es el objetivo principal de la red de Centros Cívicos?", reverso: "Acercar los servicios y actividades municipales a la ciudadanía en su propio barrio o distrito, fomentando la participación, la cultura y la cohesión social de proximidad" },
  { anverso: "¿Qué espacios suele incluir un Centro Cívico?", reverso: "Salas polivalentes, salas de reuniones, biblioteca o punto de lectura, aulas para talleres, y en ocasiones salón de actos o espacios expositivos, según el equipamiento concreto" },
  { anverso: "¿Qué entidades pueden hacer uso de las instalaciones de un Centro Cívico?", reverso: "Tanto el propio Ayuntamiento (para actividades municipales) como asociaciones vecinales, culturales o entidades ciudadanas, mediante cesión o reserva de espacios" },
  { anverso: "¿Qué diferencia hay entre un Centro Cívico y una Casa de Juventud?", reverso: "El Centro Cívico tiene un enfoque generalista dirigido a todos los públicos y edades del barrio; la Casa de Juventud está específicamente orientada a la población joven" },
  { anverso: "¿Por qué la gestión de los Centros Cívicos se considera 'desconcentrada' dentro de la organización municipal?", reverso: "Porque, aunque dependen de la estructura municipal central, prestan servicio directamente en cada distrito o barrio, acercando la actividad municipal al territorio" },
  { anverso: "¿Qué relación tienen los Centros Cívicos con las Juntas Municipales de Distrito?", reverso: "Los Centros Cívicos son equipamientos de proximidad que a menudo sirven de sede o apoyo a actividades vinculadas a la participación vecinal que impulsan las Juntas Municipales del distrito" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es un Centro Cívico en la organización municipal de Zaragoza?", explicacion: "Un equipamiento de proximidad para actividades culturales, educativas y sociales.", dificultad: "facil", opciones: ["Un equipamiento de proximidad para actividades culturales y sociales", "Una oficina exclusiva de atención telefónica", "Un centro de gestión tributaria municipal", "Una dependencia exclusiva del Registro General"], correcta: 0 },
  { enunciado: "¿Cuál es el objetivo principal de la red de Centros Cívicos?", explicacion: "Acercar servicios y actividades municipales a la ciudadanía en su barrio o distrito.", dificultad: "media", opciones: ["Acercar servicios municipales al barrio o distrito", "Centralizar toda la actividad cultural en un único edificio", "Sustituir a las Juntas Municipales de Distrito", "Gestionar exclusivamente trámites tributarios"], correcta: 0 },
  { enunciado: "¿Qué tipo de espacios suele incluir un Centro Cívico?", explicacion: "Salas polivalentes, de reuniones, biblioteca, aulas de talleres.", dificultad: "media", opciones: ["Salas polivalentes, de reuniones, biblioteca y aulas", "Únicamente oficinas administrativas", "Únicamente instalaciones deportivas", "Únicamente despachos municipales"], correcta: 0 },
  { enunciado: "¿Qué entidades pueden usar las instalaciones de un Centro Cívico?", explicacion: "El propio Ayuntamiento y asociaciones vecinales o culturales, mediante cesión o reserva.", dificultad: "media", opciones: ["El Ayuntamiento y asociaciones ciudadanas", "Únicamente empresas privadas", "Únicamente el personal municipal", "Ninguna entidad externa al Ayuntamiento"], correcta: 0 },
  { enunciado: "¿Qué diferencia hay entre un Centro Cívico y una Casa de Juventud?", explicacion: "El Centro Cívico es generalista; la Casa de Juventud se orienta a la población joven.", dificultad: "media", opciones: ["El Centro Cívico es generalista; la Casa de Juventud, para jóvenes", "Son exactamente el mismo tipo de equipamiento", "El Centro Cívico solo admite actividades deportivas", "La Casa de Juventud depende de otra administración"], correcta: 0 },
  { enunciado: "¿Por qué se considera 'desconcentrada' la gestión de los Centros Cívicos?", explicacion: "Prestan servicio directamente en cada distrito o barrio, acercando la actividad al territorio.", dificultad: "media", opciones: ["Prestan servicio directamente en cada distrito o barrio", "Porque no dependen del Ayuntamiento", "Porque los gestiona una empresa privada", "Porque solo existe un único centro en toda la ciudad"], correcta: 0 },
  { enunciado: "¿Qué relación tienen los Centros Cívicos con las Juntas Municipales de Distrito?", explicacion: "A menudo sirven de sede o apoyo a actividades de participación vecinal del distrito.", dificultad: "media", opciones: ["Sirven de sede o apoyo a la participación vecinal", "No tienen ninguna relación entre sí", "Las Juntas Municipales los sustituyen por completo", "Solo existen en distritos sin Junta Municipal"], correcta: 0 },
]);

const S2 = "tipos-actividades-socioculturales-centros-civicos";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué tipos de talleres son habituales en un Centro Cívico?", reverso: "Talleres formativos, artísticos (pintura, manualidades), de idiomas, informática, gimnasia de mantenimiento y actividades para mayores, entre otros, según la programación de cada centro" },
  { anverso: "¿Qué tipo de actividades expositivas puede acoger un Centro Cívico?", reverso: "Exposiciones temporales de fotografía, pintura u otras disciplinas artísticas, habitualmente organizadas por artistas locales o entidades vecinales" },
  { anverso: "¿Qué actividades de participación ciudadana suelen tener lugar en un Centro Cívico?", reverso: "Reuniones de asociaciones vecinales, asambleas de participación, charlas informativas municipales y encuentros de entidades del barrio" },
  { anverso: "¿Qué son las actividades 'de temporada' que suelen programarse en Centros Cívicos?", reverso: "Actividades ligadas a fechas señaladas (Navidad, carnaval, verano) o campañas municipales concretas, que requieren montajes puntuales de decoración o mobiliario adicional" },
  { anverso: "¿Qué exigencia de mantenimiento genera la actividad de salón de actos o sala polivalente en un Centro Cívico?", reverso: "Requiere comprobar el correcto funcionamiento de la megafonía, la iluminación escénica y el mobiliario abatible/plegable, además de las condiciones de accesibilidad y evacuación" },
  { anverso: "¿Qué actividad deportiva ligera puede programarse en las salas de un Centro Cívico?", reverso: "Gimnasia de mantenimiento, yoga, pilates u otras actividades físicas de bajo impacto que no requieren instalaciones deportivas especializadas" },
  { anverso: "¿Por qué la diversidad de actividades de un Centro Cívico exige al oficial de mantenimiento un conocimiento amplio de instalaciones?", reverso: "Porque un mismo edificio combina espacios muy distintos (aulas, salas polivalentes, biblioteca, salón de actos), cada uno con sus propias instalaciones eléctricas, de climatización o audiovisuales que requieren mantenimiento" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué tipos de talleres son habituales en un Centro Cívico?", explicacion: "Formativos, artísticos, de idiomas, informática, gimnasia de mantenimiento.", dificultad: "facil", opciones: ["Formativos, artísticos, idiomas, informática, gimnasia", "Únicamente talleres deportivos de competición", "Únicamente cursos de formación profesional reglada", "Ninguno, los Centros Cívicos no programan talleres"], correcta: 0 },
  { enunciado: "¿Qué tipo de actividad expositiva puede acoger un Centro Cívico?", explicacion: "Exposiciones temporales de fotografía, pintura u otras disciplinas artísticas.", dificultad: "media", opciones: ["Exposiciones temporales de arte", "Exclusivamente exposiciones comerciales", "Exclusivamente ferias de empleo", "Ninguna actividad expositiva"], correcta: 0 },
  { enunciado: "¿Qué actividades de participación ciudadana suelen darse en Centros Cívicos?", explicacion: "Reuniones vecinales, asambleas de participación, charlas municipales.", dificultad: "media", opciones: ["Reuniones vecinales y asambleas de participación", "Únicamente juicios y actos judiciales", "Únicamente actividades comerciales privadas", "Ninguna actividad de participación"], correcta: 0 },
  { enunciado: "¿Qué son las actividades 'de temporada' en un Centro Cívico?", explicacion: "Actividades ligadas a fechas señaladas que requieren montajes puntuales.", dificultad: "media", opciones: ["Actividades ligadas a fechas señaladas con montajes puntuales", "Actividades exclusivamente deportivas de competición", "Actividades que nunca requieren mantenimiento", "Actividades exclusivas para personal municipal"], correcta: 0 },
  { enunciado: "¿Qué debe comprobarse de cara al uso de un salón de actos de un Centro Cívico?", explicacion: "Megafonía, iluminación escénica, mobiliario abatible y condiciones de evacuación.", dificultad: "media", opciones: ["Megafonía, iluminación escénica y evacuación", "Solo el estado de la biblioteca", "Solo el estado de las aulas de informática", "Nada, no requiere comprobación específica"], correcta: 0 },
  { enunciado: "¿Por qué la diversidad de actividades de un Centro Cívico exige un conocimiento amplio de instalaciones al oficial de mantenimiento?", explicacion: "Porque combina espacios muy distintos con instalaciones propias diversas.", dificultad: "media", opciones: ["Porque combina espacios con instalaciones diversas", "Porque todos los espacios tienen instalaciones idénticas", "Porque solo hay una sala en cada centro", "Porque el mantenimiento lo hace siempre una empresa externa"], correcta: 0 },
]);

const S3 = "funciones-oficial-mantenimiento-centros-civicos";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Cuál es la función principal del oficial de mantenimiento general en un Centro Cívico?", reverso: "Garantizar el correcto funcionamiento de las instalaciones (eléctricas, fontanería, climatización, mobiliario) para el desarrollo normal de las actividades programadas" },
  { anverso: "¿Por qué es importante coordinar las tareas de mantenimiento con la programación de actividades de un Centro Cívico?", reverso: "Para evitar interferir en talleres, exposiciones o eventos programados, y para poder acceder a las salas en los momentos en que están libres de actividad" },
  { anverso: "¿Qué tipo de montaje puntual puede requerir la actividad de un Centro Cívico al oficial de mantenimiento?", reverso: "Montaje de mobiliario adicional, paneles expositivos, escenarios pequeños o megafonía para actos puntuales fuera del uso habitual del espacio" },
  { anverso: "¿Qué debe priorizar el oficial de mantenimiento ante una avería detectada en un Centro Cívico justo antes de una actividad programada?", reverso: "Valorar si la avería compromete la seguridad de las personas asistentes o el desarrollo básico de la actividad, informando de inmediato al responsable del centro para decidir si se mantiene, se traslada o se suspende la actividad" },
  { anverso: "¿Qué relación tiene el mantenimiento preventivo con el buen funcionamiento de un Centro Cívico?", reverso: "Reduce el riesgo de averías durante actividades con público, minimizando interrupciones y garantizando la seguridad de las personas usuarias" },
  { anverso: "¿Qué precaución debe tener el oficial de mantenimiento al intervenir en zonas comunes de un Centro Cívico en horario de actividad?", reverso: "Señalizar la zona de trabajo, minimizar el ruido y las molestias, y evitar generar riesgos (cables, herramientas, materiales) accesibles al público" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Cuál es la función principal del oficial de mantenimiento en un Centro Cívico?", explicacion: "Garantizar el correcto funcionamiento de las instalaciones para las actividades.", dificultad: "facil", opciones: ["Garantizar el correcto funcionamiento de las instalaciones", "Programar las actividades socioculturales del centro", "Gestionar las reclamaciones de las personas usuarias", "Elaborar el reglamento del Centro Cívico"], correcta: 0 },
  { enunciado: "¿Por qué es importante coordinar el mantenimiento con la programación de actividades?", explicacion: "Para evitar interferir en talleres o eventos y acceder cuando las salas están libres.", dificultad: "media", opciones: ["Para evitar interferir en actividades programadas", "Porque no influye en absoluto en la organización", "Porque las actividades nunca usan las salas", "Porque el mantenimiento solo puede hacerse de noche"], correcta: 0 },
  { enunciado: "¿Qué tipo de montaje puntual puede requerir un Centro Cívico al oficial de mantenimiento?", explicacion: "Mobiliario adicional, paneles expositivos o megafonía para actos puntuales.", dificultad: "media", opciones: ["Mobiliario, paneles o megafonía para actos puntuales", "Instalación de maquinaria industrial pesada", "Construcción de nuevas edificaciones", "Ninguno, no se hacen montajes puntuales"], correcta: 0 },
  { enunciado: "¿Qué debe hacer el oficial ante una avería justo antes de una actividad programada?", explicacion: "Valorar el riesgo para la seguridad e informar de inmediato al responsable del centro.", dificultad: "media", opciones: ["Valorar el riesgo e informar al responsable del centro", "Ignorarla si la actividad ya ha empezado", "Suspender siempre la actividad sin consultar a nadie", "Reparar siempre sin informar a nadie del centro"], correcta: 0 },
  { enunciado: "¿Qué aporta el mantenimiento preventivo al buen funcionamiento de un Centro Cívico?", explicacion: "Reduce el riesgo de averías durante actividades con público.", dificultad: "media", opciones: ["Reduce el riesgo de averías durante actividades con público", "No tiene ninguna relación con la seguridad", "Sustituye a la programación de actividades", "Elimina la necesidad de mantenimiento correctivo"], correcta: 0 },
  { enunciado: "¿Qué precaución debe tomar el oficial al intervenir en zonas comunes en horario de actividad?", explicacion: "Señalizar la zona, minimizar molestias y evitar riesgos accesibles al público.", dificultad: "media", opciones: ["Señalizar la zona y evitar riesgos accesibles al público", "No es necesaria ninguna precaución especial", "Trabajar siempre sin avisar al personal del centro", "Dejar herramientas y cables sin recoger"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 17 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 17, orden: 17, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-71 creado y vinculado como Tema 17 de Oficial Mantenimiento General.");
