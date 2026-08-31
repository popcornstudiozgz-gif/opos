/**
 * Crea tema-78: "Calidad en el servicio deportivo municipal" — Tema 8
 * (numero=8, bloque-2) de Oficial Polivalente Instalaciones Deportivas
 * (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 6 oficial del Anexo I (bases2110.pdf):
 *   "Calidad en el servicio deportivo municipal: Manual de Atención al
 *   Ciudadano del Ayuntamiento de Zaragoza, Cartas de Servicios de
 *   centros deportivos municipales, Certificación ISO 14001 en Centros
 *   Deportivos, procedimientos de reserva y uso de espacios deportivos."
 *
 * El Manual de Atención al Ciudadano y las Cartas de Servicios son
 * documentos de gestión de calidad municipal ya referenciados en otros
 * temas del proyecto (p. ej. tema-15 de Auxiliar Administrativo); ISO
 * 14001 es una norma internacional de gestión ambiental (no legislación
 * española), tratada aquí como concepto de gestión de calidad/
 * ambiental aplicado a los Centros Deportivos según cita el propio
 * temario oficial, sin fabricar detalles no verificables (fecha exacta
 * de certificación de cada centro, alcance certificado). Los
 * procedimientos de reserva y uso son conocimiento de gestión de
 * servicios consolidado, sin cita legal.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-78-calidad-servicio-deportivo.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-78";
const OPOSICION = "oficial-instalaciones-deportivas-ayto-zaragoza";
const BLOQUE_2_ID = "cdb0920b-a2d8-4ea8-b3fc-b80168d7361a";

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
  titulo: "Calidad en el servicio deportivo municipal",
  descripcion: "Manual de Atención al Ciudadano. Cartas de Servicios de centros deportivos municipales. Certificación ISO 14001 en Centros Deportivos. Procedimientos de reserva y uso de espacios deportivos.",
  contenido: "Desarrolla los instrumentos de gestión de calidad del servicio deportivo municipal: el Manual de Atención al Ciudadano del Ayuntamiento de Zaragoza, las Cartas de Servicios de los centros deportivos municipales, la certificación ISO 14001 de gestión ambiental aplicada a Centros Deportivos, y los procedimientos de reserva y uso de espacios deportivos.",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "Manual de Atención al Ciudadano y Cartas de Servicios", seccion: "manual-atencion-cartas-servicios", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Certificación ISO 14001 en Centros Deportivos", seccion: "certificacion-iso-14001-centros-deportivos", articulos: "Norma internacional de gestión ambiental" },
    { url: "", titulo: "Procedimientos de reserva y uso de espacios deportivos", seccion: "procedimientos-reserva-uso-espacios-deportivos", articulos: "Conceptos fundamentales" },
  ],
}]);

const S1 = "manual-atencion-cartas-servicios";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es el Manual de Atención al Ciudadano del Ayuntamiento de Zaragoza?", reverso: "Un documento de referencia interno que recoge criterios y protocolos comunes de calidad para la atención a la ciudadanía en los distintos servicios y canales municipales, incluidos los centros deportivos" },
  { anverso: "¿Qué es una Carta de Servicios de un centro deportivo municipal?", reverso: "Un documento público que informa a la ciudadanía de los servicios que presta el centro, los compromisos de calidad asumidos (por ejemplo, tiempos de respuesta, limpieza, disponibilidad), y los derechos de las personas usuarias" },
  { anverso: "¿Qué finalidad tiene publicar los compromisos de calidad en una Carta de Servicios?", reverso: "Hacer explícitos y medibles los estándares que la ciudadanía puede exigir al servicio, permitiendo su seguimiento y la rendición de cuentas por parte de la administración" },
  { anverso: "¿Qué relación tiene la Carta de Servicios de un centro deportivo con las funciones de un oficial polivalente de instalaciones deportivas?", reverso: "Sus tareas de mantenimiento y atención inciden directamente en el cumplimiento de compromisos de la Carta (limpieza, disponibilidad de equipos, seguridad de instalaciones), por lo que debe conocer qué estándares se han comprometido" },
  { anverso: "¿Qué principios de atención al público, recogidos en el Manual de Atención al Ciudadano, son especialmente relevantes en un centro deportivo con contacto directo con usuarios?", reverso: "La escucha activa, la claridad en la comunicación, la personalización del trato y el autocontrol emocional ante quejas o incidencias" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es el Manual de Atención al Ciudadano del Ayuntamiento de Zaragoza?", explicacion: "Un documento con criterios y protocolos comunes de calidad de atención.", dificultad: "media", opciones: ["Un documento con criterios comunes de calidad de atención", "El Reglamento de Centros y Pabellones Deportivos", "La Ordenanza Fiscal 24.8", "El organigrama del Ayuntamiento"], correcta: 0 },
  { enunciado: "¿Qué es una Carta de Servicios de un centro deportivo municipal?", explicacion: "Un documento público con los servicios ofrecidos y los compromisos de calidad asumidos.", dificultad: "facil", opciones: ["Un documento con servicios y compromisos de calidad", "Un contrato laboral del personal del centro", "Un plano técnico de las instalaciones", "Un listado de tarifas exclusivamente"], correcta: 0 },
  { enunciado: "¿Para qué sirve publicar compromisos de calidad medibles en una Carta de Servicios?", explicacion: "Para que la ciudadanía pueda exigir y hacer seguimiento de esos estándares.", dificultad: "media", opciones: ["Para que la ciudadanía pueda exigir y seguir esos estándares", "Para reducir el número de usuarios del centro", "Para sustituir al Reglamento de Centros Deportivos", "Para eliminar la necesidad de mantenimiento"], correcta: 0 },
  { enunciado: "¿Por qué son relevantes las Cartas de Servicios para un oficial polivalente de instalaciones deportivas?", explicacion: "Porque su trabajo incide directamente en el cumplimiento de los compromisos asumidos.", dificultad: "media", opciones: ["Porque su trabajo incide en el cumplimiento de esos compromisos", "Porque redacta él mismo las Cartas de Servicios", "Porque no tiene ninguna relación con su trabajo", "Porque sustituye a la Ordenanza Fiscal"], correcta: 0 },
]);

const S2 = "certificacion-iso-14001-centros-deportivos";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es la norma ISO 14001?", reverso: "Una norma internacional que establece los requisitos para implantar un sistema de gestión ambiental en una organización, orientado a reducir su impacto ambiental y mejorar su desempeño de forma continua" },
  { anverso: "¿Es la ISO 14001 una norma legal española o una norma internacional voluntaria?", reverso: "Es una norma internacional de certificación voluntaria (elaborada por la Organización Internacional de Normalización, ISO), no una ley ni un reglamento de obligado cumplimiento" },
  { anverso: "¿Qué implica que un Centro Deportivo Municipal cuente con la certificación ISO 14001?", reverso: "Que dispone de un sistema de gestión ambiental verificado por una entidad certificadora externa, con procedimientos definidos para controlar y mejorar aspectos como el consumo de agua, energía, productos químicos y gestión de residuos" },
  { anverso: "¿Qué aspectos ambientales suele controlar un sistema de gestión ISO 14001 en un centro deportivo con piscina?", reverso: "El consumo de agua y energía, el uso y almacenamiento de productos químicos de tratamiento del agua, la gestión de residuos, y el control de vertidos" },
  { anverso: "¿Qué papel tiene el personal de mantenimiento de un centro certificado ISO 14001 en el cumplimiento del sistema de gestión ambiental?", reverso: "Debe seguir los procedimientos establecidos (por ejemplo, en el manejo de productos químicos o la gestión de residuos) para que el centro mantenga su desempeño ambiental y supere las auditorías de certificación" },
  { anverso: "¿Qué es una auditoría de certificación ISO 14001?", reverso: "Una revisión periódica realizada por una entidad certificadora externa para comprobar que el sistema de gestión ambiental de la organización sigue cumpliendo los requisitos de la norma" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es la norma ISO 14001?", explicacion: "Una norma internacional para implantar un sistema de gestión ambiental.", dificultad: "facil", opciones: ["Una norma internacional de gestión ambiental", "Una ley española de obligado cumplimiento", "Un reglamento municipal de Zaragoza", "Una ordenanza fiscal sobre residuos"], correcta: 0 },
  { enunciado: "¿Es la ISO 14001 de obligado cumplimiento legal en España?", explicacion: "No, es una certificación internacional voluntaria.", dificultad: "media", opciones: ["No, es una certificación voluntaria", "Sí, es de obligado cumplimiento en toda España", "Sí, pero solo para centros deportivos municipales", "No existe tal norma en el ámbito internacional"], correcta: 0 },
  { enunciado: "¿Qué implica que un centro deportivo cuente con la certificación ISO 14001?", explicacion: "Que dispone de un sistema de gestión ambiental verificado por una entidad externa.", dificultad: "media", opciones: ["Dispone de un sistema de gestión ambiental verificado", "Está exento de pagar tasas municipales", "No necesita mantenimiento de instalaciones", "Sustituye al Reglamento de Centros Deportivos"], correcta: 0 },
  { enunciado: "¿Qué aspectos suele controlar la ISO 14001 en un centro deportivo con piscina?", explicacion: "Consumo de agua/energía, productos químicos y gestión de residuos.", dificultad: "media", opciones: ["Consumo de agua/energía y gestión de residuos", "Exclusivamente el horario de apertura", "Exclusivamente las tarifas de acceso", "Exclusivamente el número de socios"], correcta: 0 },
  { enunciado: "¿Qué papel tiene el personal de mantenimiento en un centro certificado ISO 14001?", explicacion: "Seguir los procedimientos establecidos para mantener el desempeño ambiental.", dificultad: "media", opciones: ["Seguir los procedimientos establecidos del sistema", "No tiene ningún papel específico", "Solo afecta al personal administrativo", "Solo se aplica durante la auditoría externa"], correcta: 0 },
]);

const S3 = "procedimientos-reserva-uso-espacios-deportivos";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un abono de un centro deportivo municipal?", reverso: "Un título que da acceso continuado a las instalaciones y servicios del centro durante un periodo determinado, mediante el pago de una cuota periódica" },
  { anverso: "¿Qué es una reserva de espacio deportivo (por ejemplo, una pista de pádel) en un centro municipal?", reverso: "El procedimiento por el que una persona usuaria bloquea con antelación un espacio y horario concretos para su uso exclusivo, habitualmente mediante un sistema de reserva online, telefónico o presencial" },
  { anverso: "¿Qué canales suelen habilitarse para realizar reservas en centros deportivos municipales?", reverso: "Aplicaciones o webs de reserva online, atención telefónica y atención presencial en el propio centro" },
  { anverso: "¿Qué información básica debe verificarse al acceder a una instalación reservada previamente?", reverso: "La identidad de la persona usuaria (mediante abono o documento identificativo), la validez de la reserva (fecha, hora, espacio) y, en su caso, el pago correspondiente" },
  { anverso: "¿Qué es una lista de espera en el procedimiento de reserva de espacios deportivos?", reverso: "El mecanismo que permite a una persona usuaria optar a un espacio ya reservado por otra, en caso de que esta última cancele su reserva" },
  { anverso: "¿Por qué es importante para el personal de mantenimiento e instalaciones conocer el sistema de reservas del centro?", reverso: "Porque debe coordinar sus tareas de mantenimiento con la ocupación prevista de los espacios, evitando interferir en actividades reservadas y priorizando intervenciones en horarios de menor uso" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es un abono de un centro deportivo municipal?", explicacion: "Un título que da acceso continuado a instalaciones y servicios mediante cuota periódica.", dificultad: "facil", opciones: ["Un título de acceso continuado mediante cuota periódica", "Un documento exclusivo del personal del centro", "Un certificado de calidad ambiental", "Un tipo de Carta de Servicios"], correcta: 0 },
  { enunciado: "¿Qué es una reserva de espacio deportivo?", explicacion: "El procedimiento de bloquear con antelación un espacio y horario para uso exclusivo.", dificultad: "facil", opciones: ["Bloquear con antelación un espacio y horario", "El pago de la tasa municipal anual", "La certificación ISO 14001 del centro", "El acceso libre sin ningún trámite previo"], correcta: 0 },
  { enunciado: "¿Qué canales suelen habilitarse para realizar reservas en centros deportivos municipales?", explicacion: "Online, telefónico y presencial.", dificultad: "media", opciones: ["Online, telefónico y presencial", "Únicamente presencial", "Únicamente por correo postal", "Únicamente a través de terceros"], correcta: 0 },
  { enunciado: "¿Qué debe verificarse al acceder a una instalación previamente reservada?", explicacion: "Identidad, validez de la reserva y, en su caso, el pago.", dificultad: "media", opciones: ["Identidad, validez de la reserva y pago", "Solo el nombre completo de la persona", "Solo el pago, sin comprobar la reserva", "No es necesaria ninguna verificación"], correcta: 0 },
  { enunciado: "¿Qué es una lista de espera en el sistema de reservas?", explicacion: "El mecanismo que permite optar a un espacio si su titular cancela la reserva.", dificultad: "media", opciones: ["Permite optar a un espacio si se cancela la reserva", "Es un listado de personal de mantenimiento", "Es un registro de incidencias del centro", "Es la lista de socios morosos del centro"], correcta: 0 },
  { enunciado: "¿Por qué es relevante que el personal de mantenimiento conozca el sistema de reservas?", explicacion: "Para coordinar sus tareas con la ocupación prevista de los espacios.", dificultad: "media", opciones: ["Para coordinar el mantenimiento con la ocupación prevista", "Porque gestiona directamente los cobros de las reservas", "Porque sustituye al personal de recepción", "Porque no influye en su planificación de trabajo"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 8 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 8, orden: 8, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-78 creado y vinculado como Tema 8 de Oficial Polivalente Instalaciones Deportivas.");
