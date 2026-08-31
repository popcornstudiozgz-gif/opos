/**
 * Crea tema-72: "Centros Públicos Escolares de Zaragoza" — Tema 18
 * (numero=18, bloque-2) de Oficial Mantenimiento General (Ayto.
 * Zaragoza).
 *
 * Corresponde al TEMA 16 oficial del Anexo I (bases2110.pdf):
 *   "Centros Públicos Escolares: funciones de los oficiales de
 *   mantenimiento general. Unidad de Colegios Públicos. Concepto y
 *   cometidos de los Centros Públicos Escolares. Ubicación de los
 *   centros educativos. Tipologías de Centros Públicos Escolares."
 *
 * Contenido basado en conocimiento público y consolidado sobre el reparto
 * de competencias de mantenimiento de centros escolares públicos entre
 * el Ayuntamiento (edificios de titularidad municipal, típicamente
 * educación infantil/primaria) y el Gobierno de Aragón (competencia
 * educativa autonómica); no se citan datos de detalle variable (número
 * exacto de centros, direcciones) que deben consultarse actualizados en
 * zaragoza.es.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-72-centros-publicos-escolares.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-72";
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
  titulo: "Centros Públicos Escolares de Zaragoza",
  descripcion: "Unidad de Colegios Públicos. Concepto y cometidos de los Centros Públicos Escolares. Ubicación y tipologías. Funciones de los oficiales de mantenimiento general.",
  contenido: "Desarrolla el concepto y los cometidos de los Centros Públicos Escolares de titularidad municipal, la función de la Unidad de Colegios Públicos, las tipologías de centros educativos, y las funciones específicas del oficial de mantenimiento general en el mantenimiento de estos edificios.",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "Unidad de Colegios Públicos: concepto y cometidos", seccion: "unidad-colegios-publicos-concepto-cometidos", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Tipologías y ubicación de centros escolares", seccion: "tipologias-ubicacion-centros-escolares", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Funciones del oficial de mantenimiento en centros escolares", seccion: "funciones-oficial-mantenimiento-centros-escolares", articulos: "Conceptos fundamentales" },
  ],
}]);

const S1 = "unidad-colegios-publicos-concepto-cometidos";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es la Unidad de Colegios Públicos del Ayuntamiento de Zaragoza?", reverso: "La unidad municipal responsable de la conservación, mantenimiento y limpieza de los edificios de titularidad municipal destinados a educación infantil y primaria" },
  { anverso: "¿Qué reparto de competencias existe habitualmente entre el Ayuntamiento y el Gobierno de Aragón respecto a los centros escolares públicos?", reverso: "El Ayuntamiento es responsable de la construcción, conservación y mantenimiento de los edificios de titularidad municipal (colegios de educación infantil y primaria); el Gobierno de Aragón asume la competencia educativa (profesorado, currículo, gestión pedagógica)" },
  { anverso: "¿Qué tipo de obras se distinguen habitualmente en la gestión de los centros escolares municipales?", reverso: "El mantenimiento ordinario (reparaciones menores, conservación diaria) y las obras de reforma o mejora de mayor entidad, que suelen requerir planificación y presupuesto específico" },
  { anverso: "¿Por qué es especialmente sensible el calendario de intervención en un centro escolar?", reverso: "Porque debe coordinarse con el calendario lectivo, priorizando las actuaciones de mayor entidad en periodos vacacionales para minimizar la afectación a la actividad educativa" },
  { anverso: "¿Qué es un Consejo Escolar y qué relación tiene con el mantenimiento del centro?", reverso: "El órgano de participación de la comunidad educativa (dirección, profesorado, familias, Ayuntamiento); entre sus funciones puede estar el seguimiento del estado de las instalaciones y el traslado de necesidades de mantenimiento" },
  { anverso: "¿Qué es el AMPA (Asociación de Madres y Padres de Alumnos) y qué papel puede tener respecto a incidencias del centro?", reverso: "La asociación de familias del centro educativo; con frecuencia es un canal por el que se comunican al centro o al Ayuntamiento incidencias observadas en las instalaciones" },
  { anverso: "¿Por qué se prioriza la seguridad infantil en el mantenimiento de un centro escolar?", reverso: "Porque el perfil de las personas usuarias (niños y niñas) exige extremar precauciones frente a riesgos que en otros edificios serían menos críticos (vallado, superficies, productos de limpieza, accesibilidad)" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es la Unidad de Colegios Públicos del Ayuntamiento de Zaragoza?", explicacion: "La unidad responsable de conservación, mantenimiento y limpieza de colegios de titularidad municipal.", dificultad: "media", opciones: ["La unidad responsable del mantenimiento de colegios municipales", "El órgano que fija el currículo educativo", "El sindicato del profesorado municipal", "La comisión de admisión de alumnado"], correcta: 0 },
  { enunciado: "¿Qué competencia asume el Ayuntamiento respecto a los centros escolares de titularidad municipal?", explicacion: "Construcción, conservación y mantenimiento del edificio.", dificultad: "media", opciones: ["Construcción, conservación y mantenimiento del edificio", "La gestión pedagógica y el currículo escolar", "La contratación del profesorado", "La evaluación académica del alumnado"], correcta: 0 },
  { enunciado: "¿Qué competencia asume el Gobierno de Aragón respecto a estos centros?", explicacion: "La competencia educativa: profesorado, currículo, gestión pedagógica.", dificultad: "media", opciones: ["La competencia educativa (profesorado, currículo)", "El mantenimiento íntegro del edificio", "La limpieza diaria de las instalaciones", "La gestión del comedor escolar exclusivamente"], correcta: 0 },
  { enunciado: "¿Por qué se prioriza intervenir en obras de mayor entidad durante los periodos vacacionales?", explicacion: "Para minimizar la afectación a la actividad educativa.", dificultad: "media", opciones: ["Para minimizar la afectación a la actividad educativa", "Porque el personal de mantenimiento solo trabaja en verano", "Porque no es posible trabajar con el centro cerrado", "Porque lo exige siempre el Consejo Escolar"], correcta: 0 },
  { enunciado: "¿Qué es el Consejo Escolar de un centro educativo?", explicacion: "El órgano de participación de la comunidad educativa.", dificultad: "facil", opciones: ["El órgano de participación de la comunidad educativa", "La empresa de mantenimiento del centro", "El servicio municipal de limpieza", "El departamento de obras del Gobierno de Aragón"], correcta: 0 },
  { enunciado: "¿Qué papel puede tener el AMPA respecto a incidencias de mantenimiento?", explicacion: "Ser un canal por el que se comunican incidencias observadas en las instalaciones.", dificultad: "media", opciones: ["Ser un canal para comunicar incidencias de instalaciones", "Aprobar el presupuesto municipal de obras", "Contratar directamente al personal de mantenimiento", "Sustituir al Consejo Escolar en sus funciones"], correcta: 0 },
  { enunciado: "¿Por qué se prioriza la seguridad infantil en el mantenimiento de un centro escolar?", explicacion: "Por el perfil de las personas usuarias (niños y niñas), que exige extremar precauciones.", dificultad: "media", opciones: ["Por el perfil de niños y niñas usuarias del centro", "Porque no afecta a otros tipos de edificios", "Porque lo exige exclusivamente el AMPA", "Porque no existen otras prioridades de mantenimiento"], correcta: 0 },
]);

const S2 = "tipologias-ubicacion-centros-escolares";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué tipologías básicas de centros escolares públicos existen según su etapa educativa?", reverso: "Colegios de Educación Infantil y Primaria (CEIP), y en algunos casos Escuelas Infantiles (etapa 0-3 años), además de centros de secundaria (IES) de competencia autonómica" },
  { anverso: "¿Qué son las Escuelas Infantiles Municipales?", reverso: "Centros de titularidad municipal destinados al primer ciclo de educación infantil (0-3 años), gestionados o mantenidos por el Ayuntamiento" },
  { anverso: "¿Qué es un CEIP (Colegio de Educación Infantil y Primaria)?", reverso: "Un centro escolar que imparte el segundo ciclo de educación infantil (3-6 años) y educación primaria (6-12 años)" },
  { anverso: "¿Qué diferencia de titularidad suele existir entre un CEIP y un IES en cuanto al mantenimiento del edificio?", reverso: "Los edificios de CEIP construidos por el Ayuntamiento suelen mantenerse por titularidad municipal; los IES (educación secundaria) son de competencia y titularidad autonómica en la mayoría de los casos" },
  { anverso: "¿Por qué es importante que el oficial de mantenimiento general conozca la ubicación y tipología de cada centro escolar antes de intervenir?", reverso: "Porque las necesidades de mantenimiento, el calendario de intervención y las condiciones de acceso varían según la etapa educativa y la titularidad del edificio" },
  { anverso: "¿Qué características arquitectónicas suelen distinguir a los patios y espacios exteriores de un centro de educación infantil frente a uno de primaria?", reverso: "Los espacios de infantil suelen requerir superficies más protegidas (pavimentos amortiguadores, vallado reforzado) adaptadas a la menor edad y autonomía motriz del alumnado" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es un CEIP?", explicacion: "Un Colegio de Educación Infantil y Primaria.", dificultad: "facil", opciones: ["Un Colegio de Educación Infantil y Primaria", "Un Instituto de Educación Secundaria", "Una Escuela Infantil de 0-3 años exclusivamente", "Un Centro Cívico municipal"], correcta: 0 },
  { enunciado: "¿A qué etapa educativa se destinan las Escuelas Infantiles Municipales?", explicacion: "Al primer ciclo de educación infantil, 0-3 años.", dificultad: "media", opciones: ["Al primer ciclo de educación infantil (0-3 años)", "A la educación secundaria obligatoria", "Exclusivamente a la etapa de bachillerato", "A la formación profesional"], correcta: 0 },
  { enunciado: "¿Qué etapas educativas imparte un CEIP?", explicacion: "Segundo ciclo de infantil (3-6) y primaria (6-12).", dificultad: "media", opciones: ["Infantil (3-6) y primaria (6-12)", "Solo secundaria obligatoria", "Solo bachillerato", "Solo formación profesional"], correcta: 0 },
  { enunciado: "¿Qué diferencia de titularidad suele existir entre un CEIP y un IES?", explicacion: "El CEIP suele ser de titularidad municipal; el IES, de titularidad autonómica.", dificultad: "media", opciones: ["El CEIP es municipal; el IES, autonómico", "Ambos son siempre de titularidad municipal", "Ambos son siempre de titularidad autonómica", "No existe ninguna diferencia de titularidad"], correcta: 0 },
  { enunciado: "¿Por qué debe el oficial conocer la tipología de cada centro antes de intervenir?", explicacion: "Porque las necesidades y condiciones de mantenimiento varían según etapa y titularidad.", dificultad: "media", opciones: ["Las necesidades varían según etapa y titularidad", "Todos los centros tienen exactamente las mismas necesidades", "No influye en absoluto en su trabajo", "Solo es relevante para el Consejo Escolar"], correcta: 0 },
  { enunciado: "¿Qué característica suelen tener los espacios exteriores de un centro de educación infantil?", explicacion: "Superficies más protegidas y vallado reforzado, adaptadas a la menor edad.", dificultad: "media", opciones: ["Superficies protegidas y vallado reforzado", "No requieren ninguna adaptación especial", "Son siempre idénticos a los de un IES", "No pueden tener pavimentos amortiguadores"], correcta: 0 },
]);

const S3 = "funciones-oficial-mantenimiento-centros-escolares";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Cuáles son las funciones básicas del oficial de mantenimiento general en un centro escolar municipal?", reverso: "Atender averías e incidencias de electricidad, fontanería, carpintería y albañilería, y realizar el mantenimiento preventivo básico de las instalaciones del edificio" },
  { anverso: "¿Por qué debe el oficial de mantenimiento coordinarse con la dirección del centro antes de intervenir en horario lectivo?", reverso: "Para minimizar la interrupción de las clases, garantizar la seguridad del alumnado durante la intervención, y acceder a las zonas necesarias sin generar riesgos" },
  { anverso: "¿Qué tipo de incidencia en un centro escolar debe considerarse prioritaria y urgente?", reverso: "Cualquier incidencia que comprometa la seguridad del alumnado o el personal: fallos eléctricos peligrosos, roturas de cristales, elementos sueltos en patios o zonas de paso, fugas de agua junto a instalaciones eléctricas" },
  { anverso: "¿Qué debe hacer el oficial de mantenimiento si detecta una barrera arquitectónica o un desperfecto que dificulta el acceso a alumnado con movilidad reducida?", reverso: "Comunicarlo de inmediato a la dirección del centro y a la Unidad de Colegios Públicos, priorizando su reparación por el impacto directo en la accesibilidad e igualdad de oportunidades del alumnado" },
  { anverso: "¿Qué precaución especial debe seguirse al manipular herramientas o productos potencialmente peligrosos en un centro escolar?", reverso: "Mantenerlos siempre fuera del alcance del alumnado, señalizar la zona de trabajo, y no dejarlos desatendidos en ningún momento durante la intervención" },
  { anverso: "¿Qué relación tiene el mantenimiento preventivo de instalaciones de recreo (columpios, toboganes, vallados) con la seguridad escolar?", reverso: "Reduce el riesgo de accidentes en el patio, uno de los espacios de mayor uso y menor supervisión directa del alumnado durante el juego" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Cuáles son las funciones básicas del oficial de mantenimiento en un centro escolar?", explicacion: "Atender averías de electricidad, fontanería, carpintería y albañilería, y mantenimiento preventivo.", dificultad: "facil", opciones: ["Atender averías básicas y el mantenimiento preventivo", "Impartir clases de apoyo al alumnado", "Gestionar la matriculación del centro", "Elaborar el currículo educativo"], correcta: 0 },
  { enunciado: "¿Por qué debe coordinarse el oficial con la dirección antes de intervenir en horario lectivo?", explicacion: "Para minimizar la interrupción de clases y garantizar la seguridad del alumnado.", dificultad: "media", opciones: ["Para minimizar interrupciones y garantizar seguridad", "No es necesaria ninguna coordinación previa", "Solo se coordina en periodo vacacional", "Solo lo exige el AMPA, no la dirección"], correcta: 0 },
  { enunciado: "¿Qué tipo de incidencia debe considerarse prioritaria en un centro escolar?", explicacion: "La que compromete la seguridad del alumnado o el personal.", dificultad: "media", opciones: ["La que compromete la seguridad del alumnado", "Cualquier incidencia estética sin urgencia", "Solo las incidencias informáticas", "Ninguna, todas tienen la misma prioridad"], correcta: 0 },
  { enunciado: "¿Qué debe hacer el oficial ante una barrera arquitectónica que dificulta el acceso de alumnado con movilidad reducida?", explicacion: "Comunicarlo de inmediato y priorizar su reparación.", dificultad: "media", opciones: ["Comunicarlo de inmediato y priorizar su reparación", "Esperar a la siguiente revisión programada", "No es competencia del oficial de mantenimiento", "Resolverlo solo si lo solicita la familia"], correcta: 0 },
  { enunciado: "¿Qué precaución debe seguirse al manipular herramientas o productos peligrosos en un centro escolar?", explicacion: "Mantenerlos fuera del alcance del alumnado y no dejarlos desatendidos.", dificultad: "media", opciones: ["Mantenerlos fuera del alcance del alumnado", "No es necesaria ninguna precaución especial", "Solo hay que avisar a la dirección después de terminar", "Pueden dejarse desatendidos brevemente"], correcta: 0 },
  { enunciado: "¿Qué relación tiene el mantenimiento preventivo de instalaciones de recreo con la seguridad escolar?", explicacion: "Reduce el riesgo de accidentes en el patio.", dificultad: "media", opciones: ["Reduce el riesgo de accidentes en el patio", "No tiene relación con la seguridad del alumnado", "Solo afecta a la estética del centro", "Sustituye a la vigilancia del profesorado"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 18 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 18, orden: 18, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-72 creado y vinculado como Tema 18 de Oficial Mantenimiento General.");
