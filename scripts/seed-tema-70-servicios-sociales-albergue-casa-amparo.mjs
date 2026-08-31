/**
 * Crea tema-70: "Servicios Sociales Comunitarios: Albergue y Casa de
 * Amparo" — Tema 16 (numero=16, bloque-2) de Oficial Mantenimiento
 * General (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 14 oficial del Anexo I (bases2110.pdf):
 *   "Servicios Sociales Comunitarios: Reglamento y Normas Internas del
 *   Albergue y de la Casa de Amparo."
 *
 * A diferencia de otros casos ya detectados en este proyecto (PPRL-1606,
 * PPRL-1602, pliego de cimentaciones), verificado en este turno que
 * AMBOS documentos citados por el temario SÍ están publicados en la
 * normativa municipal del Ayuntamiento de Zaragoza:
 * - Reglamento de la Residencia Casa Amparo — aprobado en Pleno el 19 de
 *   septiembre de 2002, modificado el 4 de marzo de 2010
 *   (https://www.zaragoza.es/sede/servicio/normativa/124).
 * - Normas de Régimen Interno del Albergue Municipal de Transeúntes
 *   (https://www.zaragoza.es/sede/servicio/normativa/8603).
 * Contenido verificado mediante búsqueda y lectura de resumen de ambas
 * páginas oficiales de normativa municipal en esta sesión.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-70-servicios-sociales-albergue-casa-amparo.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-70";
const OPOSICION = "oficial-mantenimiento-ayto-zaragoza";
const BLOQUE_2_ID = "336de420-fb74-4814-9d50-6e2981ed064f";
const REGL_CASA_AMPARO = "https://www.zaragoza.es/sede/servicio/normativa/124";
const NORMAS_ALBERGUE = "https://www.zaragoza.es/sede/servicio/normativa/8603";

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
  titulo: "Servicios Sociales Comunitarios: Albergue y Casa de Amparo",
  descripcion: "Reglamento de la Residencia Casa Amparo y Normas de Régimen Interno del Albergue Municipal de Transeúntes del Ayuntamiento de Zaragoza.",
  contenido: "Desarrolla el Reglamento de la Residencia Casa Amparo (residencia pública municipal para personas mayores) y las Normas de Régimen Interno del Albergue Municipal de Transeúntes de Zaragoza: su finalidad, tipos de plazas y espacios, requisitos de acceso, derechos y deberes de las personas usuarias, y cauces de queja y reclamación.",
  enlaces_boe: [
    { url: REGL_CASA_AMPARO, titulo: "Reglamento de la Residencia Casa Amparo (Ayuntamiento de Zaragoza)" },
    { url: NORMAS_ALBERGUE, titulo: "Normas de Régimen Interno del Albergue Municipal de Transeúntes (Ayuntamiento de Zaragoza)" },
  ],
  indice_estudio: [
    { url: REGL_CASA_AMPARO, titulo: "Reglamento de la Residencia Casa Amparo", seccion: "reglamento-residencia-casa-amparo", articulos: "Normativa municipal, aprobada en Pleno el 19/09/2002" },
    { url: NORMAS_ALBERGUE, titulo: "Normas de Régimen Interno del Albergue Municipal", seccion: "normas-regimen-interno-albergue-municipal", articulos: "Normativa municipal" },
    { url: "", titulo: "Funciones del oficial de mantenimiento en estos centros", seccion: "funciones-mantenimiento-centros-sociales", articulos: "Conceptos fundamentales" },
  ],
}]);

const S1 = "reglamento-residencia-casa-amparo";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es la Casa Amparo del Ayuntamiento de Zaragoza?", reverso: "Una residencia pública municipal, de carácter mixto, destinada a servir de vivienda permanente a personas mayores, proporcionando asistencia integral tanto a personas válidas como asistidas" },
  { anverso: "¿Cuándo se aprobó el Reglamento de la Residencia Casa Amparo y cuándo se modificó?", reverso: "Se aprobó en sesión plenaria del 19 de septiembre de 2002 y fue modificado el 4 de marzo de 2010" },
  { anverso: "¿Qué tipos de plazas existen en la Casa Amparo?", reverso: "Plazas concertadas con el Gobierno de Aragón (acceso vía Sistema Aragonés de Atención a la Dependencia) y plazas no concertadas para situaciones de especial desamparo o necesidad valoradas por servicios sociales municipales" },
  { anverso: "¿Qué requisitos básicos se exigen para acceder a una plaza no concertada de la Casa Amparo?", reverso: "Tener al menos 65 años, estar empadronado en Zaragoza con 6 meses de antelación, encontrarse en situación de dependencia que impida vivir en el domicilio habitual, y carecer de apoyos familiares o recursos suficientes" },
  { anverso: "¿Qué son la Asamblea General y la Junta de Participación en la Casa Amparo?", reverso: "Órganos de gestión del centro: la Asamblea General reúne a residentes y representación administrativa; la Junta de Participación está formada por 6 representantes de residentes elegidos y 3 representantes administrativos, con mandato de 4 años" },
  { anverso: "¿Qué derechos tienen las personas residentes en la Casa Amparo?", reverso: "Acceso a las instalaciones, participación en asambleas, actividades socioculturales, 45 días de vacaciones anuales, y derecho a presentar reclamaciones" },
  { anverso: "¿Qué deberes tienen las personas residentes en la Casa Amparo?", reverso: "Cumplir la normativa del centro, comunicar cambios en su situación económica, mantener una convivencia respetuosa, e informar de ausencias superiores a 24 horas" },
  { anverso: "¿Cómo se financian las plazas no concertadas de la Casa Amparo?", reverso: "Con aproximadamente el 80% de los ingresos netos mensuales de la persona residente, manteniendo un mínimo equivalente al 20% de la pensión mínima de jubilación" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es la Casa Amparo del Ayuntamiento de Zaragoza?", explicacion: "Una residencia pública municipal mixta para personas mayores.", dificultad: "facil", opciones: ["Una residencia pública municipal para personas mayores", "Un albergue de transeúntes", "Un centro cívico municipal", "Una oficina de atención ciudadana"], correcta: 0 },
  { enunciado: "¿Cuándo se aprobó el Reglamento de la Residencia Casa Amparo?", explicacion: "En sesión plenaria del 19 de septiembre de 2002.", dificultad: "dificil", opciones: ["El 19 de septiembre de 2002", "El 4 de marzo de 2010", "El 1 de enero de 2015", "El 27 de julio de 2026"], correcta: 0 },
  { enunciado: "¿Qué tipos de plazas existen en la Casa Amparo?", explicacion: "Concertadas con el Gobierno de Aragón y no concertadas.", dificultad: "media", opciones: ["Concertadas y no concertadas", "Solo concertadas", "Solo no concertadas", "Plazas exclusivamente temporales"], correcta: 0 },
  { enunciado: "¿Qué edad mínima se exige para una plaza no concertada de la Casa Amparo?", explicacion: "65 años.", dificultad: "media", opciones: ["65 años", "60 años", "70 años", "No hay requisito de edad"], correcta: 0 },
  { enunciado: "¿Qué es la Junta de Participación de la Casa Amparo?", explicacion: "Órgano formado por 6 representantes de residentes y 3 administrativos, mandato de 4 años.", dificultad: "dificil", opciones: ["6 representantes de residentes y 3 administrativos", "Solo representantes de la administración", "Solo representantes de los residentes", "Un órgano formado por técnicos externos"], correcta: 0 },
  { enunciado: "¿Cuántos días de vacaciones anuales tienen derecho las personas residentes en la Casa Amparo?", explicacion: "45 días.", dificultad: "media", opciones: ["45 días", "15 días", "30 días", "60 días"], correcta: 0 },
  { enunciado: "¿Qué deber tienen las personas residentes respecto a sus ausencias?", explicacion: "Informar de ausencias superiores a 24 horas.", dificultad: "media", opciones: ["Informar de ausencias superiores a 24 horas", "No pueden ausentarse nunca del centro", "Informar solo de ausencias superiores a una semana", "No existe ninguna obligación al respecto"], correcta: 0 },
  { enunciado: "¿Aproximadamente qué porcentaje de sus ingresos netos aporta una persona residente en plaza no concertada?", explicacion: "Alrededor del 80%, manteniendo un mínimo equivalente al 20% de la pensión mínima.", dificultad: "dificil", opciones: ["Aproximadamente el 80%", "El 100% de sus ingresos", "El 20% de sus ingresos", "No aporta ninguna cantidad"], correcta: 0 },
]);

const S2 = "normas-regimen-interno-albergue-municipal";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es el Albergue Municipal de Transeúntes de Zaragoza?", reverso: "Un centro municipal de Servicios Sociales que ofrece alojamiento temporal y atención a personas en situación de calle o transeúntes, con distintas modalidades según la situación de cada persona" },
  { anverso: "¿Qué modalidades de alojamiento ofrece el Albergue Municipal?", reverso: "Habitaciones ordinarias, Casa Abierta (para personas en situación de cronicidad), Módulos de Inserción, Módulos Familiares, Viviendas Tuteladas, y servicio de emergencia por frío" },
  { anverso: "¿Qué normas fundamentales de convivencia rigen en el Albergue Municipal?", reverso: "Respeto mutuo, cumplimiento de horarios, mantenimiento de la higiene, y prohibición expresa de alcohol, drogas ilegales y objetos peligrosos" },
  { anverso: "¿Dónde está permitido fumar dentro del Albergue Municipal?", reverso: "Solo en las áreas al aire libre; está prohibido fumar en los espacios cerrados del centro" },
  { anverso: "¿Cómo funciona el servicio de admisión del Albergue Municipal?", reverso: "Funciona las 24 horas del día, y requiere presentar un documento de identidad válido para el acceso" },
  { anverso: "¿Pueden acceder menores de edad al Albergue Municipal?", reverso: "Solo acompañados de su progenitor o tutor legal" },
  { anverso: "¿A qué hora cierran habitualmente las puertas del Albergue Municipal?", reverso: "A las 20:30 horas, aunque existen excepciones documentadas según la modalidad de alojamiento o circunstancias particulares" },
  { anverso: "¿A través de qué cauces puede una persona usuaria presentar una queja o reclamación en el Albergue Municipal?", reverso: "Mediante comunicación directa con la dirección del centro, instancia ante el Registro General del Ayuntamiento, el Libro de reclamaciones disponible en el centro, un buzón de sugerencias, o en reuniones periódicas con la dirección" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es el Albergue Municipal de Transeúntes de Zaragoza?", explicacion: "Un centro municipal que ofrece alojamiento temporal a personas transeúntes.", dificultad: "facil", opciones: ["Un centro de alojamiento temporal para personas transeúntes", "Una residencia permanente para personas mayores", "Un centro cívico de actividades socioculturales", "Una oficina de atención ciudadana"], correcta: 0 },
  { enunciado: "¿Qué modalidades de alojamiento ofrece el Albergue Municipal?", explicacion: "Habitaciones ordinarias, Casa Abierta, Módulos de Inserción y Familiares, Viviendas Tuteladas y emergencia de frío.", dificultad: "media", opciones: ["Varias modalidades según la situación de la persona", "Únicamente habitaciones ordinarias", "Únicamente el servicio de emergencia por frío", "Solo viviendas tuteladas permanentes"], correcta: 0 },
  { enunciado: "¿Qué está expresamente prohibido en el Albergue Municipal?", explicacion: "Alcohol, drogas ilegales y objetos peligrosos.", dificultad: "facil", opciones: ["Alcohol, drogas ilegales y objetos peligrosos", "El uso de habitaciones ordinarias", "La presentación de quejas", "El acceso con documento de identidad"], correcta: 0 },
  { enunciado: "¿Dónde está permitido fumar en el Albergue Municipal?", explicacion: "Solo en áreas al aire libre.", dificultad: "media", opciones: ["Solo en áreas al aire libre", "En cualquier espacio del centro", "Únicamente en las habitaciones", "En ningún lugar del recinto"], correcta: 0 },
  { enunciado: "¿Cómo funciona el servicio de admisión del Albergue Municipal?", explicacion: "Funciona 24 horas y requiere documento de identidad válido.", dificultad: "media", opciones: ["24 horas, con documento de identidad válido", "Solo en horario de mañana", "Sin necesidad de identificación", "Solo los fines de semana"], correcta: 0 },
  { enunciado: "¿En qué condiciones pueden acceder menores de edad al Albergue Municipal?", explicacion: "Solo acompañados de progenitor o tutor legal.", dificultad: "media", opciones: ["Acompañados de progenitor o tutor legal", "Sin ninguna restricción", "Nunca pueden acceder menores", "Solo con autorización judicial previa"], correcta: 0 },
  { enunciado: "¿A qué hora cierran habitualmente las puertas del Albergue Municipal?", explicacion: "A las 20:30 horas.", dificultad: "dificil", opciones: ["A las 20:30 horas", "A las 22:00 horas", "A las 18:00 horas", "No cierran nunca"], correcta: 0 },
  { enunciado: "¿A través de qué cauce, entre otros, puede presentarse una reclamación en el Albergue Municipal?", explicacion: "El Libro de reclamaciones disponible en el centro.", dificultad: "media", opciones: ["El Libro de reclamaciones del centro", "Únicamente por correo postal", "Únicamente mediante recurso judicial", "No existe cauce alguno de reclamación"], correcta: 0 },
]);

const S3 = "funciones-mantenimiento-centros-sociales";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué papel cumple el oficial de mantenimiento general en centros como la Casa Amparo o el Albergue Municipal?", reverso: "Atender las incidencias de mantenimiento (electricidad, fontanería, carpintería, etc.) que puedan surgir en las instalaciones, garantizando su correcto funcionamiento para las personas usuarias" },
  { anverso: "¿Por qué es especialmente importante la rapidez de respuesta ante una avería en la Casa Amparo?", reverso: "Porque es una residencia permanente de personas mayores, algunas con dependencia, para quienes una avería (por ejemplo, de calefacción o de un ascensor) puede afectar directamente a su bienestar y seguridad diaria" },
  { anverso: "¿Qué consideración especial debe tener el oficial de mantenimiento al trabajar en espacios ocupados por personas residentes o usuarias de estos centros?", reverso: "Actuar con respeto a la intimidad y tranquilidad de las personas usuarias, minimizando molestias (ruido, interrupciones) y coordinando, cuando sea posible, el momento de la intervención con el personal del centro" },
  { anverso: "¿Qué tipo de incidencias de mantenimiento son más habituales en un centro residencial como la Casa Amparo?", reverso: "Averías de fontanería y calefacción, problemas eléctricos, mantenimiento de puertas y accesos adaptados, y cuestiones de accesibilidad (barreras arquitectónicas, ascensores)" },
  { anverso: "¿Por qué debe el oficial de mantenimiento conocer las normas de convivencia y horarios del Albergue Municipal, aunque no le afecten directamente como trabajador?", reverso: "Para coordinar mejor su presencia y sus trabajos con el funcionamiento del centro (horarios de acceso, zonas comunes) sin interferir en la actividad ni en la intimidad de las personas usuarias" },
  { anverso: "¿A quién debe informar el oficial de mantenimiento si detecta una situación de riesgo para la seguridad de una persona usuaria en estos centros (por ejemplo, un suelo mojado o una barrera peligrosa)?", reverso: "A la dirección o al personal responsable del centro, de forma inmediata, además de tomar las medidas de señalización o mitigación del riesgo que estén a su alcance" },
  { anverso: "¿Qué relación guarda este tema con el tema de accesibilidad en la organización de la parte específica de Oficial Mantenimiento General?", reverso: "El mantenimiento en centros residenciales como la Casa Amparo exige especial atención a la accesibilidad (rampas, ascensores, pasamanos, ausencia de barreras) dado el perfil de sus personas usuarias" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué papel cumple el oficial de mantenimiento general en centros como la Casa Amparo?", explicacion: "Atender incidencias de mantenimiento para garantizar el correcto funcionamiento del centro.", dificultad: "facil", opciones: ["Atender incidencias de mantenimiento del centro", "Gestionar las plazas concertadas y no concertadas", "Tramitar las reclamaciones de las personas usuarias", "Aprobar el reglamento del centro"], correcta: 0 },
  { enunciado: "¿Por qué es especialmente importante la rapidez de respuesta ante averías en la Casa Amparo?", explicacion: "Porque afecta a personas mayores, algunas dependientes, en su bienestar y seguridad diaria.", dificultad: "media", opciones: ["Porque afecta al bienestar y seguridad de personas mayores dependientes", "Porque es un centro de uso exclusivamente administrativo", "Porque no tiene personal propio de gestión", "Porque no existen normas de convivencia en el centro"], correcta: 0 },
  { enunciado: "¿Qué consideración debe tener el oficial al trabajar en espacios ocupados por personas usuarias?", explicacion: "Respetar su intimidad y tranquilidad, minimizando molestias.", dificultad: "media", opciones: ["Respetar su intimidad y minimizar molestias", "Realizar el trabajo sin ninguna coordinación previa", "Priorizar siempre el horario que más le convenga", "No es necesaria ninguna consideración especial"], correcta: 0 },
  { enunciado: "¿Qué tipo de incidencias son más habituales en un centro residencial como la Casa Amparo?", explicacion: "Fontanería, calefacción, problemas eléctricos y accesibilidad.", dificultad: "media", opciones: ["Fontanería, calefacción, electricidad y accesibilidad", "Exclusivamente incidencias informáticas", "Exclusivamente incidencias de jardinería", "Ninguna, es un centro sin instalaciones técnicas"], correcta: 0 },
  { enunciado: "¿A quién debe informar el oficial si detecta un riesgo para la seguridad de una persona usuaria?", explicacion: "A la dirección o personal responsable del centro, de forma inmediata.", dificultad: "media", opciones: ["A la dirección o personal responsable del centro", "A ningún responsable, debe resolverlo solo siempre", "Solo al final de su jornada laboral", "Únicamente por escrito al cabo de una semana"], correcta: 0 },
  { enunciado: "¿Por qué es relevante la accesibilidad en el mantenimiento de centros como la Casa Amparo?", explicacion: "Por el perfil de sus personas usuarias (mayores, algunas dependientes).", dificultad: "media", opciones: ["Por el perfil de personas mayores y dependientes usuarias", "Porque no afecta al trabajo de mantenimiento", "Porque solo aplica a centros escolares", "Porque la accesibilidad no es relevante en residencias"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 16 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 16, orden: 16, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-70 creado y vinculado como Tema 16 de Oficial Mantenimiento General.");
