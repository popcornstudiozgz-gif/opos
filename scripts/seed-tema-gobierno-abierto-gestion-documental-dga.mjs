/**
 * Crea el tema canónico tema-33: "El Gobierno Abierto y la gestión
 * documental" y lo asigna como Tema 15 de la oposición Auxiliar
 * Administrativo DGA (bloque-5, Gobierno abierto).
 *
 * Texto oficial del ítem 15 del programa de "materias comunes",
 * verificado esta sesión cruzando dos academias independientes
 * (mpsoposiciones.com y cierzoformacion.com) al no estar disponible el
 * acceso al navegador para releer directamente el PDF de mia.aragon.es
 * ya usado en sesiones anteriores para los ítems 1-14:
 *   "El Gobierno Abierto. Concepto y principios informadores. Normativa
 *   autonómica en materia de transparencia, acceso a la información y
 *   participación ciudadana. La información y atención al público, con
 *   especial atención a las personas con discapacidad. Quejas y
 *   Sugerencias sobre los servicios públicos gestionados por el
 *   Gobierno de Aragón. La gestión documental en el archivo de oficina:
 *   series, procedimientos y expedientes. La Política de Gestión y
 *   Archivo de Documentos Electrónicos de la Administración de la
 *   Comunidad Autónoma de Aragón. Archivo Electrónico Único."
 * Ambas fuentes coinciden literalmente en el texto y encajan con la
 * descripción ya existente en BD para bloque-5 ("Transparencia,
 * participación ciudadana, atención al público y gestión documental").
 *
 * Cuatro secciones, cada una con contenido legal real leído íntegro
 * esta sesión:
 * 1. gobierno-abierto-concepto-principios — Ley 8/2015 de Aragón,
 *    Título I (arts. 1-3): objeto, principios generales y definiciones.
 * 2. transparencia-participacion-ciudadana-aragon — Ley 8/2015,
 *    Título II Cap. I y III (arts. 4-6, 25, 37) y Título III Cap. I y IV
 *    (arts. 42, 49, 53, 54): sujetos obligados, derecho a la
 *    información, Consejo de Transparencia, participación ciudadana e
 *    instrumentos de consulta popular.
 * 3. atencion-publico-discapacidad-quejas-sugerencias — Ley 8/2015
 *    arts. 2.l, 6.3, 11.3, 20.1, 51 y disposición adicional sexta:
 *    accesibilidad universal, Cartas de Servicios, procedimiento de
 *    quejas y sugerencias.
 * 4. gestion-documental-archivo-electronico — Decreto 38/2016, de 5 de
 *    abril, del Gobierno de Aragón (Política de gestión y archivo de
 *    documentos electrónicos de la Administración de la Comunidad
 *    Autónoma de Aragón y de sus Organismos Públicos), BOA núm. 71, de
 *    14 de abril de 2016: clasificación, series documentales, CLASE,
 *    DESFOR, valoración, transferencia y eliminación de documentos; y
 *    art. 17 de la Ley 39/2015 (LPACAP): archivo electrónico único.
 *
 * Fuentes: Ley 8/2015, de 25 de marzo (BOE-A-2015-5332, texto
 * consolidado descargado de boe.es y leído íntegro); Decreto 38/2016,
 * de 5 de abril (BOA núm. 71, de 14 de abril de 2016, csv:
 * BOA20160414001, leído íntegro); art. 17 de la Ley 39/2015, de 1 de
 * octubre (BOE-A-2015-10565), cuyo texto exacto —de solo 3 apartados—
 * se contrastó vía búsqueda con múltiples fuentes jurídicas
 * independientes que coinciden literalmente.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-gobierno-abierto-gestion-documental-dga.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!URL_BASE || !SERVICE_KEY) {
  console.error("❌ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-33";

async function insertar(tabla, filas) {
  const res = await fetch(`${URL_BASE}/rest/v1/${tabla}`, {
    method: "POST",
    headers: { ...HEADERS, Prefer: "return=representation" },
    body: JSON.stringify(filas),
  });
  if (!res.ok) {
    console.error(`❌ Error insertando en ${tabla}: ${res.status} ${await res.text()}`);
    process.exit(1);
  }
  return res.json();
}

async function insertarPreguntasConOpciones(seccion, preguntas) {
  const filas = preguntas.map(({ opciones, correcta, ...p }) => ({ ...p, tema_slug: TEMA, seccion }));
  const insertadas = await insertar("preguntas", filas);
  console.log(`   ✓ preguntas: ${insertadas.length} filas`);
  const filasOpciones = insertadas.flatMap((pregunta, i) =>
    preguntas[i].opciones.map((texto, orden) => ({
      pregunta_id: pregunta.id,
      texto,
      es_correcta: orden === preguntas[i].correcta,
      orden,
    })),
  );
  const opcionesInsertadas = await insertar("opciones", filasOpciones);
  console.log(`   ✓ opciones: ${opcionesInsertadas.length} filas`);
}

// ─────────────────────────────────────────────────────────────────────────
// Tema canónico
// ─────────────────────────────────────────────────────────────────────────
console.log("📚 Creando tema-33...");
await insertar("temas", [
  {
    slug: TEMA,
    titulo: "El Gobierno Abierto y la gestión documental",
    descripcion:
      "Concepto y principios informadores del Gobierno Abierto. La Ley 8/2015 de Transparencia y Participación Ciudadana de Aragón: transparencia, acceso a la información pública y participación ciudadana. La información y atención al público, con especial atención a las personas con discapacidad, y las quejas y sugerencias. La gestión documental en el archivo de oficina y la Política de Gestión y Archivo de Documentos Electrónicos de la Administración de la Comunidad Autónoma de Aragón. Archivo Electrónico Único.",
    contenido:
      "Desarrolla la Ley 8/2015, de 25 de marzo, de Transparencia de la Actividad Pública y Participación Ciudadana de Aragón: su objeto y principios, la transparencia y el derecho de acceso a la información pública, la participación ciudadana y sus instrumentos, y la atención al público con especial atención a la accesibilidad de las personas con discapacidad y al procedimiento de quejas y sugerencias. Se completa con la Política de gestión y archivo de documentos electrónicos de la Administración de la Comunidad Autónoma de Aragón, aprobada por Decreto 38/2016, y con el Archivo Electrónico Único regulado en el art. 17 de la Ley 39/2015.",
    enlaces_boe: [
      {
        pdf: "tema-33-ley8-2015-transparencia-aragon",
        url: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-5332",
        titulo: "Ley 8/2015, de Transparencia de la Actividad Pública y Participación Ciudadana de Aragón",
      },
      {
        pdf: "tema-33-decreto38-2016-gestion-documental",
        url: "https://www.boa.aragon.es/cgi-bin/EBOA/BRSCGI?CMD=VEROBJ&MLKOB=902540023535",
        titulo: "Decreto 38/2016, Política de gestión y archivo de documentos electrónicos de la Administración de Aragón",
      },
      {
        pdf: "tema-33-ley39-2015-lpacap",
        url: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565#a17",
        titulo: "Ley 39/2015, art. 17: Archivo de documentos (Archivo Electrónico Único)",
      },
    ],
    indice_estudio: [
      {
        url: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-5332#a1",
        titulo: "El Gobierno Abierto: concepto y principios informadores",
        seccion: "gobierno-abierto-concepto-principios",
        articulos: "Ley 8/2015 de Aragón, arts. 1-3",
      },
      {
        url: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-5332#a4",
        titulo: "Normativa autonómica: transparencia, acceso a la información y participación ciudadana",
        seccion: "transparencia-participacion-ciudadana-aragon",
        articulos: "Ley 8/2015 de Aragón, arts. 4-6, 25, 37, 42, 49, 53-54",
      },
      {
        url: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-5332#a20",
        titulo: "Información y atención al público, discapacidad, quejas y sugerencias",
        seccion: "atencion-publico-discapacidad-quejas-sugerencias",
        articulos: "Ley 8/2015 de Aragón, arts. 2.l, 6.3, 11.3, 20, 51, disp. adic. sexta",
      },
      {
        url: "https://www.boa.aragon.es/cgi-bin/EBOA/BRSCGI?CMD=VEROBJ&MLKOB=902540023535",
        titulo: "Gestión documental en el archivo de oficina y Archivo Electrónico Único",
        seccion: "gestion-documental-archivo-electronico",
        articulos: "Decreto 38/2016 (íntegro); Ley 39/2015, art. 17",
      },
    ],
  },
]);

// ─────────────────────────────────────────────────────────────────────────
// Sección 1: gobierno-abierto-concepto-principios
// ─────────────────────────────────────────────────────────────────────────
const S1 = "gobierno-abierto-concepto-principios";
console.log(`📝 flashcards (${S1})...`);
await insertar(
  "flashcards",
  [
    { anverso: "Según el art. 1.1 de la Ley 8/2015 de Aragón, ¿cuál es el objeto de la ley?", reverso: "Regular e impulsar la transparencia de la actividad pública en Aragón y la participación ciudadana en las políticas del Gobierno de Aragón, con la finalidad de impulsar el gobierno abierto" },
    { anverso: "Según el art. 1.2 de la Ley 8/2015, ¿qué tres cosas garantiza la ley de forma efectiva?", reverso: "La transparencia de la actividad pública, el derecho a la información pública accesible y comprensible, y el derecho de participación en la planificación, elaboración y evaluación de las políticas públicas" },
    { anverso: "Según el art. 3.a) de la Ley 8/2015, ¿qué se entiende por Gobierno abierto?", reverso: "Aquel que promueve una comunicación y diálogo de calidad con la ciudadanía para facilitar su participación, garantiza la información y la transparencia para fomentar la rendición de cuentas, y diseña sus estrategias en un marco de gobernanza multinivel" },
    { anverso: "Según el art. 2.a) de la Ley 8/2015, ¿qué garantiza el principio de gobernanza?", reverso: "La interacción, en el proceso de toma de decisiones, de las instancias públicas tradicionales, los entornos cívicos y económicos y la ciudadanía" },
    { anverso: "Según el art. 2.b) de la Ley 8/2015, ¿en qué consiste el principio de transparencia pública?", reverso: "En proporcionar y difundir de manera clara, proactiva, accesible y constante la información que obra en poder de la Administración, bajo los principios de veracidad y objetividad" },
    { anverso: "Según el art. 2.c) de la Ley 8/2015, ¿qué promueve el principio de participación ciudadana?", reverso: "La implicación de la ciudadanía, a título individual o colectivo, en la planificación, el diseño y la evaluación de las políticas públicas, así como en la toma de decisiones" },
    { anverso: "Según el art. 2.l) de la Ley 8/2015, ¿a qué norma remite el principio de accesibilidad?", reverso: "Al Real Decreto Legislativo 1/2013, de 29 de noviembre, Texto Refundido de la Ley General de derechos de las personas con discapacidad y de su inclusión social" },
    { anverso: "Según el art. 2.ñ) de la Ley 8/2015, ¿qué establece el principio de libre acceso a la información pública?", reverso: "Que cualquier persona puede solicitar el acceso a la información pública" },
    { anverso: "Según el art. 3.b) de la Ley 8/2015, ¿qué se entiende por publicidad activa?", reverso: "La obligación de difundir de forma permanente, veraz y objetiva la información que garantice la transparencia de la actividad pública" },
    { anverso: "Según el art. 3.h) de la Ley 8/2015, ¿qué se entiende por información pública?", reverso: "Los contenidos o documentos, cualquiera que sea su formato o soporte, que obren en poder de los sujetos obligados y que hayan sido elaborados o adquiridos en el ejercicio de sus funciones" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })),
);

console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "Según el art. 1.1 de la Ley 8/2015 de Transparencia de Aragón, ¿cuál es la finalidad última de la ley?", explicacion: "Impulsar el gobierno abierto en el ámbito de la Comunidad Autónoma como forma de relación del Gobierno y de la Administración con los ciudadanos y las ciudadanas.", dificultad: "media", opciones: ["Impulsar el gobierno abierto como forma de relación con la ciudadanía", "Reformar la organización territorial de Aragón", "Suprimir los procedimientos administrativos presenciales", "Crear un nuevo régimen sancionador autonómico"], correcta: 0 },
  { enunciado: "¿Cuáles son los tres derechos que garantiza de forma efectiva la Ley 8/2015, según su art. 1.2?", explicacion: "La transparencia mediante publicidad activa, el derecho a la información pública accesible y comprensible, y el derecho de participación en las políticas públicas.", dificultad: "media", opciones: [
    "Transparencia (publicidad activa), derecho a la información pública y derecho de participación",
    "Derecho de huelga, derecho de reunión y derecho de petición",
    "Derecho de acceso a la vivienda, al trabajo y a la educación",
    "Solo el derecho de acceso a la información pública",
  ], correcta: 0 },
  { enunciado: "Según el art. 3.a) de la Ley 8/2015, ¿cómo se define el Gobierno abierto?", explicacion: "Aquel que promueve comunicación y diálogo de calidad con la ciudadanía, garantiza información y transparencia para fomentar la rendición de cuentas, y diseña sus estrategias en un marco de gobernanza multinivel.", dificultad: "dificil", opciones: [
    "El que promueve diálogo con la ciudadanía, garantiza transparencia y rendición de cuentas en gobernanza multinivel",
    "El que digitaliza al cien por cien sus trámites administrativos",
    "El que reduce el número de empleados públicos mediante la automatización",
    "El que delega sus competencias en entidades privadas",
  ], correcta: 0 },
  { enunciado: "El principio de gobernanza, recogido en el art. 2.a) de la Ley 8/2015, persigue especialmente:", explicacion: "La coordinación y cooperación entre las diferentes Administraciones públicas y en el interior de cada una, para hacer posible el desarrollo de un gobierno multinivel.", dificultad: "media", opciones: ["La coordinación y cooperación entre Administraciones para un gobierno multinivel", "La centralización de todas las competencias en el Gobierno de Aragón", "La eliminación de los órganos colegiados", "La reducción del gasto público en un porcentaje fijo"], correcta: 0 },
  { enunciado: "¿A qué texto normativo remite expresamente el principio de accesibilidad del art. 2.l) de la Ley 8/2015?", explicacion: "Al Real Decreto Legislativo 1/2013, de 29 de noviembre, por el que se aprueba el Texto Refundido de la Ley General de derechos de las personas con discapacidad y de su inclusión social.", dificultad: "dificil", opciones: [
    "El Real Decreto Legislativo 1/2013, sobre derechos de las personas con discapacidad",
    "La Ley Orgánica 3/2007, para la Igualdad Efectiva de Mujeres y Hombres",
    "La Ley 19/2013, de transparencia, acceso a la información pública y buen gobierno",
    "El Convenio de Aarhus sobre acceso a la información ambiental",
  ], correcta: 0 },
  { enunciado: "Según el art. 3.b) de la Ley 8/2015, ¿qué se entiende por publicidad activa?", explicacion: "La obligación de difundir de forma permanente, veraz y objetiva la información que garantice la transparencia de la actividad pública.", dificultad: "facil", opciones: ["La obligación de difundir de forma permanente, veraz y objetiva información que garantice la transparencia", "La publicación exclusiva de anuncios de contratación pública", "El derecho del ciudadano a solicitar información previa justificación de interés", "La obligación de publicar solo la normativa vigente"], correcta: 0 },
  { enunciado: "Según el art. 3.h) de la Ley 8/2015, ¿qué se entiende por información pública?", explicacion: "Los contenidos o documentos, cualquiera que sea su formato o soporte, que obren en poder de los sujetos obligados y hayan sido elaborados o adquiridos en el ejercicio de sus funciones.", dificultad: "media", opciones: [
    "Contenidos o documentos, en cualquier formato, en poder de los sujetos obligados por razón de sus funciones",
    "Únicamente los documentos publicados en el Boletín Oficial de Aragón",
    "Solo la información de carácter estadístico elaborada por la Administración",
    "Cualquier documento en poder de un particular relacionado con la Administración",
  ], correcta: 0 },
  { enunciado: "¿Cuál de los siguientes NO es uno de los principios generales enumerados en el art. 2 de la Ley 8/2015?", explicacion: "El art. 2 recoge, entre otros, gobernanza, transparencia pública, participación ciudadana, accesibilidad y libre acceso a la información; no recoge un 'principio de subsidiariedad competencial'.", dificultad: "dificil", opciones: ["El principio de subsidiariedad competencial", "El principio de transparencia pública", "El principio de participación ciudadana", "El principio de libre acceso a la información pública"], correcta: 0 },
]);

// ─────────────────────────────────────────────────────────────────────────
// Sección 2: transparencia-participacion-ciudadana-aragon
// ─────────────────────────────────────────────────────────────────────────
const S2 = "transparencia-participacion-ciudadana-aragon";
console.log(`📝 flashcards (${S2})...`);
await insertar(
  "flashcards",
  [
    { anverso: "Según el art. 4.1 de la Ley 8/2015, cita tres sujetos obligados por el título de transparencia.", reverso: "La Administración de la Comunidad Autónoma de Aragón, las entidades de la Administración local aragonesa y la Universidad de Zaragoza (entre otros: Consejo Consultivo, Consejo Económico y Social, organismos autónomos, consorcios)" },
    { anverso: "Según el art. 5 de la Ley 8/2015, ¿es necesario declarar un interés para obtener información pública?", reverso: "No; el derecho a obtener información pública se puede ejercer sin necesidad de declarar interés alguno" },
    { anverso: "Según el art. 25.2 de la Ley 8/2015, ¿a partir de qué edad pueden los menores ejercer el derecho de acceso a la información pública?", reverso: "A partir de los 14 años" },
    { anverso: "Según el art. 25.3 de la Ley 8/2015, ¿es necesario motivar la solicitud de acceso a la información pública?", reverso: "No; no es necesario motivar la solicitud ni invocar la ley, aunque el solicitante puede exponer los motivos si lo desea" },
    { anverso: "Según el art. 37.1 de la Ley 8/2015, ¿cuál es la función principal del Consejo de Transparencia de Aragón?", reverso: "Promover la transparencia de la actividad pública, velar por el cumplimiento de las obligaciones de publicidad activa y garantizar el ejercicio del derecho de acceso a la información pública" },
    { anverso: "Según el art. 42 de la Ley 8/2015, ¿cuál es el ámbito objetivo del título de participación ciudadana?", reverso: "Promover y garantizar la más amplia participación ciudadana, individual o colectiva, en la planificación, elaboración, ejecución y evaluación de las políticas públicas del Gobierno de Aragón" },
    { anverso: "Según el art. 49 de la Ley 8/2015, ¿en qué precepto del Estatuto de Autonomía de Aragón se fundamenta el derecho de participación?", reverso: "En el artículo 15 del Estatuto de Autonomía de Aragón" },
    { anverso: "Según el art. 53.2 de la Ley 8/2015, cita los cuatro instrumentos de consulta popular previstos.", reverso: "Las audiencias públicas, los foros de consulta, los paneles ciudadanos y los jurados ciudadanos" },
    { anverso: "Según el art. 54.6 de la Ley 8/2015, ¿cuáles son las tres fases del proceso de deliberación participativa?", reverso: "Fase de información, fase de deliberación y fase de retorno" },
    { anverso: "Según el art. 52.4 de la Ley 8/2015, ¿qué carácter tiene el resultado de los instrumentos de participación ciudadana en el diseño de las políticas públicas?", reverso: "Carácter orientativo" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })),
);

console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "Según el art. 5 de la Ley 8/2015 de Aragón, para obtener información pública previa solicitud, la persona solicitante:", explicacion: "No está obligada a declarar interés alguno, sin más limitaciones que las contempladas en la ley.", dificultad: "media", opciones: ["No está obligada a declarar interés alguno", "Debe acreditar un interés legítimo directo", "Debe ser residente en Aragón", "Debe abonar previamente una tasa"], correcta: 0 },
  { enunciado: "Según el art. 25.2 de la Ley 8/2015, ¿a partir de qué edad pueden los y las menores ejercer el derecho de acceso a la información pública?", explicacion: "A partir de los 14 años.", dificultad: "facil", opciones: ["14 años", "12 años", "16 años", "18 años"], correcta: 0 },
  { enunciado: "Según el art. 25.3 de la Ley 8/2015, ¿qué exige la ley para el ejercicio del derecho de acceso a la información pública?", explicacion: "No es necesario motivar la solicitud ni invocar la ley, si bien el solicitante puede exponer los motivos, que podrán ser tenidos en cuenta al resolver.", dificultad: "media", opciones: ["No exige motivar la solicitud ni invocar la ley", "Exige motivar siempre la solicitud", "Exige acreditar la condición de interesado en un procedimiento", "Exige presentar la solicitud exclusivamente por vía telemática"], correcta: 0 },
  { enunciado: "¿Cuál es la función principal del Consejo de Transparencia de Aragón según el art. 37.1 de la Ley 8/2015?", explicacion: "Promover la transparencia de la actividad pública, velar por el cumplimiento de las obligaciones de publicidad activa y garantizar el ejercicio del derecho de acceso a la información pública.", dificultad: "media", opciones: [
    "Promover la transparencia y garantizar el derecho de acceso a la información pública",
    "Fiscalizar las cuentas públicas de la Comunidad Autónoma",
    "Resolver los recursos contencioso-administrativos en materia de personal",
    "Aprobar los presupuestos anuales del Gobierno de Aragón",
  ], correcta: 0 },
  { enunciado: "Según el art. 49 de la Ley 8/2015, el derecho de participación de los ciudadanos y ciudadanas se ejerce en los términos previstos en:", explicacion: "El artículo 15 del Estatuto de Autonomía de Aragón.", dificultad: "dificil", opciones: ["El artículo 15 del Estatuto de Autonomía de Aragón", "El artículo 23 de la Constitución Española", "El artículo 105.b) de la Constitución Española", "El artículo 62.3 del Estatuto de Autonomía de Aragón"], correcta: 0 },
  { enunciado: "Según el art. 53.2 de la Ley 8/2015, ¿cuál de los siguientes NO es un instrumento de consulta popular previsto en la ley?", explicacion: "Los instrumentos son las audiencias públicas, los foros de consulta, los paneles ciudadanos y los jurados ciudadanos; el referéndum consultivo no figura entre ellos (queda excluido por competencia estatal).", dificultad: "dificil", opciones: ["El referéndum consultivo", "Las audiencias públicas", "Los foros de consulta", "Los jurados ciudadanos"], correcta: 0 },
  { enunciado: "Según el art. 54.6 de la Ley 8/2015, ¿cuáles son las fases del proceso de deliberación participativa?", explicacion: "Fase de información, fase de deliberación y fase de retorno.", dificultad: "media", opciones: ["Información, deliberación y retorno", "Consulta, votación y ejecución", "Convocatoria, debate y sanción", "Propuesta, alegaciones y resolución"], correcta: 0 },
  { enunciado: "Según el art. 52.4 de la Ley 8/2015, ¿qué carácter tiene el resultado de los instrumentos de participación ciudadana en el diseño de las políticas públicas?", explicacion: "Carácter orientativo, no vinculante.", dificultad: "media", opciones: ["Orientativo", "Vinculante en todo caso", "Vinculante solo si participa más del 50% del censo", "Sujeto a ratificación por las Cortes de Aragón"], correcta: 0 },
]);

// ─────────────────────────────────────────────────────────────────────────
// Sección 3: atencion-publico-discapacidad-quejas-sugerencias
// ─────────────────────────────────────────────────────────────────────────
const S3 = "atencion-publico-discapacidad-quejas-sugerencias";
console.log(`📝 flashcards (${S3})...`);
await insertar(
  "flashcards",
  [
    { anverso: "Según el art. 20.1.c) de la Ley 8/2015, ¿qué deben publicar las Administraciones públicas aragonesas sobre las relaciones con la ciudadanía?", reverso: "El procedimiento para presentar sugerencias y quejas sobre el funcionamiento de los servicios públicos" },
    { anverso: "Según el art. 20.1.b) de la Ley 8/2015, ¿qué deben incluir las Cartas de Servicios que se publiquen?", reverso: "Información sobre los servicios públicos que se gestionan, su grado de cumplimiento (incluidas las listas de espera) y el resultado de las evaluaciones de calidad" },
    { anverso: "Según el art. 51.1 de la Ley 8/2015, ¿qué derecho tienen los ciudadanos y ciudadanas respecto al funcionamiento de los servicios de la DGA?", reverso: "El derecho a formular propuestas de actuación y regulación, así como mejoras o sugerencias, en relación con el funcionamiento de los servicios que presta la Administración de la Comunidad Autónoma de Aragón" },
    { anverso: "Según el art. 51.2 de la Ley 8/2015, ¿qué debe hacer la Administración respecto a las iniciativas ciudadanas que mejoren los servicios?", reverso: "Habilitar fórmulas para hacer efectivo el derecho de propuesta y promover el reconocimiento público de esas iniciativas" },
    { anverso: "Según el art. 6.3 de la Ley 8/2015, ¿cómo debe estar disponible la información pública para las personas con discapacidad?", reverso: "En una modalidad accesible: suministrada por medios o en formatos adecuados que resulten accesibles y comprensibles, conforme al principio de accesibilidad universal y diseño para todos" },
    { anverso: "Según el art. 11.3 de la Ley 8/2015, ¿qué debe garantizarse en la publicidad activa respecto a las personas con discapacidad?", reverso: "Que toda la información esté a disposición de las personas con discapacidad en una modalidad accesible" },
    { anverso: "Según la disposición adicional sexta de la Ley 8/2015, ¿qué deben garantizar el Gobierno de Aragón y el resto de Administraciones en la comunicación con la ciudadanía?", reverso: "La simplificación de trámites y un lenguaje y canales de comunicación oral y escrita comprensibles, promoviendo la accesibilidad plena de personas con limitaciones visuales, motrices, auditivas o cognitivas" },
    { anverso: "Según el art. 52.3 de la Ley 8/2015, ¿qué colectivos concretos se menciona que deben ver favorecida su participación?", reverso: "Las personas con discapacidad, las personas mayores, la juventud, las personas inmigrantes y los sectores sociales con mayor dificultad de participación" },
    { anverso: "Según el art. 2.l) de la Ley 8/2015, ¿qué principio obliga a que el diseño de las políticas garantice la accesibilidad universal?", reverso: "El principio de accesibilidad" },
    { anverso: "Según el art. 5.d) de la Ley 8/2015, ¿tiene derecho el ciudadano a ser asistido en la búsqueda de información pública?", reverso: "Sí, a ser asistido en su búsqueda de información por el personal al servicio de los sujetos obligados" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })),
);

console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "Según el art. 20.1.c) de la Ley 8/2015, ¿qué deben publicar las Administraciones públicas aragonesas sobre la relación con la ciudadanía?", explicacion: "El procedimiento para presentar sugerencias y quejas sobre el funcionamiento de los servicios públicos.", dificultad: "facil", opciones: ["El procedimiento para presentar sugerencias y quejas sobre los servicios públicos", "Únicamente el organigrama de cada departamento", "El listado de sanciones administrativas impuestas", "Los datos personales de los reclamantes"], correcta: 0 },
  { enunciado: "Según el art. 51.1 de la Ley 8/2015, los ciudadanos y las ciudadanas tienen derecho a formular:", explicacion: "Propuestas de actuación y regulación, así como mejoras o sugerencias en relación con el funcionamiento de los servicios que presta la Administración de la Comunidad Autónoma de Aragón.", dificultad: "media", opciones: [
    "Propuestas de actuación y regulación, y mejoras o sugerencias sobre los servicios de la DGA",
    "Recursos de alzada directamente ante el Consejo de Transparencia",
    "Iniciativas legislativas populares ante las Cortes de Aragón",
    "Denuncias penales ante el Justicia de Aragón",
  ], correcta: 0 },
  { enunciado: "Según el art. 6.3 de la Ley 8/2015, ¿cómo debe estar disponible la información prevista en el título de transparencia para las personas con discapacidad?", explicacion: "En una modalidad accesible, suministrada por medios o formatos adecuados conforme al principio de accesibilidad universal y diseño para todos.", dificultad: "media", opciones: [
    "En modalidad accesible, conforme al principio de accesibilidad universal y diseño para todos",
    "Únicamente previa solicitud expresa y motivada",
    "Solo en formato braille impreso",
    "Con un recargo en tasas para cubrir el coste de adaptación",
  ], correcta: 0 },
  { enunciado: "Según la disposición adicional sexta de la Ley 8/2015, ¿qué deben garantizar el Gobierno de Aragón y el resto de Administraciones públicas en sus trámites?", explicacion: "La simplificación de trámites y la utilización de un lenguaje y canales de comunicación comprensibles, con apoyo y asistencia a la ciudadanía, y medidas de accesibilidad para personas con limitaciones visuales, motrices, auditivas o cognitivas.", dificultad: "dificil", opciones: [
    "La simplificación de trámites y lenguaje comprensible, con accesibilidad plena para diversas limitaciones",
    "La eliminación de todos los trámites presenciales",
    "La obligatoriedad del uso exclusivo de la sede electrónica",
    "La reducción de plazos administrativos a la mitad en todos los procedimientos",
  ], correcta: 0 },
  { enunciado: "Según el art. 52.3 de la Ley 8/2015, el funcionamiento de los instrumentos de participación ciudadana debe asegurar condiciones de inclusión social favoreciendo, entre otros, a:", explicacion: "Las personas con discapacidad, las personas mayores, la juventud, las personas inmigrantes y los sectores con mayor dificultad de participación.", dificultad: "media", opciones: [
    "Personas con discapacidad, personas mayores, juventud y personas inmigrantes",
    "Únicamente a los funcionarios públicos",
    "Solo a las entidades locales de menos de 5.000 habitantes",
    "Exclusivamente a las asociaciones empresariales",
  ], correcta: 0 },
  { enunciado: "Según el art. 20.1.b) de la Ley 8/2015, ¿qué deben recoger las Cartas de Servicios que publiquen las Administraciones aragonesas?", explicacion: "Información sobre los servicios públicos gestionados, el grado de cumplimiento (incluidas listas de espera) y el resultado de las evaluaciones de calidad de los servicios.", dificultad: "media", opciones: [
    "Información sobre los servicios, su grado de cumplimiento y evaluaciones de calidad",
    "Solo el horario de atención al público",
    "Exclusivamente el organigrama del departamento responsable",
    "El listado de personal adscrito a cada servicio con sus retribuciones",
  ], correcta: 0 },
  { enunciado: "Según el art. 51.2 de la Ley 8/2015, ¿qué debe hacer la Administración respecto de las iniciativas ciudadanas que hayan posibilitado una mejora de los servicios?", explicacion: "Habilitar fórmulas para hacer efectivo el derecho y promover el reconocimiento público de dichas iniciativas.", dificultad: "media", opciones: ["Habilitar fórmulas para el ejercicio del derecho y promover su reconocimiento público", "Ignorarlas si no proceden de una entidad registrada", "Remitirlas obligatoriamente a informe de la Cámara de Cuentas", "Cobrar una tasa por su tramitación"], correcta: 0 },
  { enunciado: "Según el art. 5.d) de la Ley 8/2015, ¿qué derecho tiene la persona que busca información pública?", explicacion: "Ser asistida en su búsqueda de información por el personal al servicio de los sujetos obligados.", dificultad: "facil", opciones: ["Ser asistida en su búsqueda de información por el personal del sujeto obligado", "Recibir asesoramiento jurídico gratuito de un abogado de oficio", "Exigir la presencia de un notario en la entrega de la información", "Obtener una indemnización si la búsqueda dura más de un día"], correcta: 0 },
]);

// ─────────────────────────────────────────────────────────────────────────
// Sección 4: gestion-documental-archivo-electronico
// ─────────────────────────────────────────────────────────────────────────
const S4 = "gestion-documental-archivo-electronico";
console.log(`📝 flashcards (${S4})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Qué aprueba el Decreto 38/2016, de 5 de abril, del Gobierno de Aragón?", reverso: "La Política de gestión y archivo de documentos electrónicos de la Administración de la Comunidad Autónoma de Aragón y de sus Organismos Públicos" },
    { anverso: "Según el apartado 1.5.3 de la Política (Decreto 38/2016), ¿en qué se basa la clasificación de los documentos?", reverso: "En las funciones y series documentales de la Administración, sistematizadas en un cuadro de clasificación funcional" },
    { anverso: "¿Qué es CLASE, según el Decreto 38/2016?", reverso: "El Sistema para la Identificación y Gestión Documental, que identifica y relaciona órganos, funciones, series y procedimientos, gestionado por el Archivo de la Administración de la Comunidad Autónoma de Aragón" },
    { anverso: "¿Qué es DESFOR, según el Decreto 38/2016?", reverso: "El Catálogo de Procedimientos Administrativos y Servicios prestados por la Administración de la Comunidad Autónoma de Aragón" },
    { anverso: "Según el apartado 1.5.6.1 de la Política, ¿qué es la valoración documental y a quién corresponde?", reverso: "El proceso que determina los valores de los documentos y da como resultado los plazos de conservación, transferencia y acceso de las series documentales; corresponde a la Comisión de Valoración de Documentos Administrativos" },
    { anverso: "Según el apartado 1.5.8 de la Política, ¿qué es la transferencia de documentos?", reverso: "El procedimiento habitual de ingreso de fondos en un archivo mediante el traslado de fracciones de series documentales, una vez cumplido el plazo de permanencia fijado en la valoración" },
    { anverso: "Según el apartado 1.5.9 de la Política, ¿qué se necesita para eliminar documentos?", reverso: "El dictamen preceptivo de la Comisión de Valoración de Documentos Administrativos y la autorización administrativa del Departamento competente en materia de Cultura" },
    { anverso: "Según la introducción de la Política (Decreto 38/2016), ¿cuál es su objetivo principal?", reverso: "Mejorar el control en la gestión de documentos a lo largo de su ciclo de vida, asegurando el acceso, seguridad, disponibilidad, confidencialidad y conservación de la documentación producida por la Administración autonómica" },
    { anverso: "Según el art. 17.1 de la Ley 39/2015, ¿qué debe mantener cada Administración?", reverso: "Un archivo electrónico único de los documentos electrónicos que correspondan a procedimientos finalizados" },
    { anverso: "Según el art. 17.2 de la Ley 39/2015, ¿en qué formato deben conservarse los documentos electrónicos?", reverso: "En un formato que garantice su autenticidad, integridad y conservación, así como su consulta con independencia del tiempo transcurrido, asegurando la posibilidad de trasladar los datos a otros formatos y soportes" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S4 })),
);

console.log(`📝 preguntas de test (${S4})...`);
await insertarPreguntasConOpciones(S4, [
  { enunciado: "¿Qué norma aprueba la Política de gestión y archivo de documentos electrónicos de la Administración de la Comunidad Autónoma de Aragón?", explicacion: "El Decreto 38/2016, de 5 de abril, del Gobierno de Aragón (BOA núm. 71, de 14 de abril de 2016).", dificultad: "facil", opciones: ["El Decreto 38/2016, de 5 de abril, del Gobierno de Aragón", "La Ley 8/2015, de Transparencia de Aragón", "El Decreto 12/1993, de creación del Archivo de la Administración", "La Ley 6/1986, de archivos de Aragón"], correcta: 0 },
  { enunciado: "Según el Decreto 38/2016, ¿en qué se basa la clasificación de los documentos y expedientes de la Administración?", explicacion: "En las funciones y series documentales de la Administración, sistematizadas en un cuadro de clasificación funcional.", dificultad: "media", opciones: ["En las funciones y series documentales, mediante un cuadro de clasificación funcional", "Exclusivamente en el orden alfabético del asunto", "En la fecha de entrada en el registro general", "En el formato del documento (papel o electrónico)"], correcta: 0 },
  { enunciado: "¿Qué es CLASE, según la Política de gestión documental de Aragón (Decreto 38/2016)?", explicacion: "El Sistema para la Identificación y Gestión Documental, que identifica y relaciona órganos, funciones, series y procedimientos.", dificultad: "media", opciones: [
    "El Sistema para la Identificación y Gestión Documental (órganos, funciones, series y procedimientos)",
    "El Catálogo de Procedimientos Administrativos y Servicios de la DGA",
    "El sistema de firma electrónica del Gobierno de Aragón",
    "El repositorio de normativa consolidada del Gobierno de Aragón",
  ], correcta: 0 },
  { enunciado: "¿Qué es DESFOR, según el Decreto 38/2016?", explicacion: "El Catálogo de Procedimientos Administrativos y Servicios prestados por la Administración de la Comunidad Autónoma de Aragón.", dificultad: "media", opciones: ["El Catálogo de Procedimientos Administrativos y Servicios de la DGA", "El Sistema de Identificación y Gestión Documental", "El Esquema de Metadatos del Gobierno de Aragón", "El Directorio Común de Unidades Orgánicas (DIR3)"], correcta: 0 },
  { enunciado: "Según el apartado 1.5.6.1 de la Política de gestión documental, ¿a qué órgano corresponde la valoración documental?", explicacion: "A la Comisión de Valoración de Documentos Administrativos, que determina los plazos de conservación, transferencia y acceso de las series documentales.", dificultad: "media", opciones: ["A la Comisión de Valoración de Documentos Administrativos", "Al Consejo de Transparencia de Aragón", "A la Aragonesa de Servicios Telemáticos", "Al Instituto Aragonés de Administración Pública"], correcta: 0 },
  { enunciado: "Según el apartado 1.5.9 de la Política de gestión documental, ¿qué requisitos son necesarios para eliminar un documento o expediente?", explicacion: "Dictamen preceptivo de la Comisión de Valoración de Documentos Administrativos y autorización administrativa del Departamento competente en materia de Cultura.", dificultad: "dificil", opciones: [
    "Dictamen de la Comisión de Valoración y autorización del Departamento competente en Cultura",
    "Solo la firma del jefe de la unidad productora del documento",
    "Un informe favorable no vinculante de la Aragonesa de Servicios Telemáticos",
    "La mera expiración del plazo de conservación, sin trámite adicional",
  ], correcta: 0 },
  { enunciado: "Según el art. 17.1 de la Ley 39/2015 (LPACAP), ¿qué debe mantener cada Administración?", explicacion: "Un archivo electrónico único de los documentos electrónicos que correspondan a procedimientos finalizados.", dificultad: "facil", opciones: ["Un archivo electrónico único de los documentos de procedimientos finalizados", "Un archivo electrónico distinto por cada departamento", "Un archivo en papel duplicado del archivo electrónico", "Un archivo electrónico solo para expedientes sancionadores"], correcta: 0 },
  { enunciado: "Según el art. 17.2 de la Ley 39/2015, ¿qué debe garantizar el formato de conservación de los documentos electrónicos?", explicacion: "Su autenticidad, integridad y conservación, así como su consulta con independencia del tiempo transcurrido desde su emisión, y la posibilidad de trasladar los datos a otros formatos y soportes.", dificultad: "media", opciones: [
    "Autenticidad, integridad, conservación y posibilidad de traslado a otros formatos",
    "Únicamente la compresión máxima del tamaño del archivo",
    "Que el documento sea ilegible sin clave de descifrado del interesado",
    "Que el documento se destruya automáticamente a los 5 años",
  ], correcta: 0 },
]);

console.log(
  "✅ tema-33 creado (4 secciones: gobierno-abierto-concepto-principios, transparencia-participacion-ciudadana-aragon, atencion-publico-discapacidad-quejas-sugerencias, gestion-documental-archivo-electronico; 40 flashcards + 32 preguntas en total).",
);

// ─────────────────────────────────────────────────────────────────────────
// Asignación a la oposición DGA: numero 15, bloque-5 (Gobierno abierto)
// ─────────────────────────────────────────────────────────────────────────
console.log("🔧 Asignando tema-33 a auxiliar-administrativo-dga (numero 15, bloque-5)...");

const bloqueRes = await fetch(
  `${URL_BASE}/rest/v1/bloques?oposicion_slug=eq.auxiliar-administrativo-dga&slug=eq.bloque-5&select=id`,
  { headers: HEADERS },
);
const [bloque5] = await bloqueRes.json();
if (!bloque5) {
  console.error("❌ No se encontró bloque-5 para auxiliar-administrativo-dga.");
  process.exit(1);
}

const asignacionRes = await fetch(`${URL_BASE}/rest/v1/tema_oposicion`, {
  method: "POST",
  headers: { ...HEADERS, Prefer: "return=representation" },
  body: JSON.stringify([
    {
      tema_slug: TEMA,
      oposicion_slug: "auxiliar-administrativo-dga",
      bloque_id: bloque5.id,
      numero: 15,
      orden: 15,
      es_premium: false,
      publicado: true,
      secciones_incluidas: [S1, S2, S3, S4],
    },
  ]),
});
if (!asignacionRes.ok) {
  console.error(`❌ Error insertando tema_oposicion: ${asignacionRes.status} ${await asignacionRes.text()}`);
  process.exit(1);
}
const asignado = await asignacionRes.json();
console.log(`   ✓ tema_oposicion insertado: ${JSON.stringify(asignado[0])}`);

console.log("✅ Tema 15 de la DGA (Gobierno Abierto y gestión documental) dado de alta.");
