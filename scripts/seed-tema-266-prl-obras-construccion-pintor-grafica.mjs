/**
 * Crea tema-266: "Prevención de Riesgos Laborales en las obras de
 * construcción" — Tema 22 (numero=22, bloque-2, ÚLTIMO tema de la parte
 * específica) de Oficial Pintor, Especialidad Gráfica (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 20 oficial del Anexo I (bases2110.pdf, línea
 * 1542): "Prevención de Riesgos Laborales en las obras de
 * construcción."
 *
 * Mismo enunciado oficial y mismo contenido normativo que el TEMA 22
 * (tema-250) ya sembrado para Oficial Pintor Especialidad General —
 * ambas especialidades del mismo cuerpo de Oficial Pintor comparten
 * idéntico punto de temario de PRL. Se sigue aquí el mismo patrón de
 * contenido y las mismas fuentes ya verificadas en esta sesión (no se
 * reutiliza el tema canónico en sí porque cada especialidad requiere
 * ejemplos y supuestos propios de su oficio: rotulación/artes gráficas
 * frente a pintura general):
 * - Ley 31/1995, de Prevención de Riesgos Laborales (BOE-A-1995-24292).
 * - Real Decreto 1627/1997, disposiciones mínimas de seguridad y salud
 *   en obras de construcción (BOE-A-1997-22614).
 * - Real Decreto 773/1997, utilización de equipos de protección
 *   individual (BOE-A-1997-12735).
 * - Real Decreto 2177/2004, trabajos temporales en altura con equipos
 *   de protección individual, incluidas líneas de vida (BOE-A-2004-19311).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-266-prl-obras-construccion-pintor-grafica.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-266";
const OPOSICION = "oficial-pintor-grafica-ayto-zaragoza";
const BLOQUE_2_ID = "1e5d5916-cf4a-4920-9175-579f18034ad6";
const BOE_LEY_31_1995 = "https://www.boe.es/buscar/act.php?id=BOE-A-1995-24292";
const BOE_RD_1627_1997 = "https://www.boe.es/buscar/act.php?id=BOE-A-1997-22614";
const BOE_RD_773_1997 = "https://www.boe.es/buscar/act.php?id=BOE-A-1997-12735";
const BOE_RD_2177_2004 = "https://www.boe.es/buscar/act.php?id=BOE-A-2004-19311";

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
  titulo: "PRL en las obras de construcción (Oficial Pintor, Especialidad Gráfica)",
  descripcion: "Ley 31/1995 y RD 1627/1997 en obras de rotulación y montaje gráfico. Equipos de protección individual (RD 773/1997). Trabajos en altura y líneas de vida (RD 2177/2004).",
  contenido: "Desarrolla la Prevención de Riesgos Laborales aplicada a las obras de construcción, con especial atención a los trabajos propios de un Oficial Pintor Especialidad Gráfica (montaje de rótulos y cartelería en fachadas, andamios y plataformas elevadoras, instalación de lonas de gran formato): la Ley 31/1995 de Prevención de Riesgos Laborales como marco general, el Real Decreto 1627/1997 de disposiciones mínimas de seguridad y salud en obras de construcción (estudio de seguridad y salud, coordinador de seguridad, libro de incidencias), el Real Decreto 773/1997 sobre equipos de protección individual, y el Real Decreto 2177/2004 sobre trabajos temporales en altura, con particular atención a las líneas de vida y los arneses anticaídas necesarios en la instalación de rótulos y lonas en fachada.",
  enlaces_boe: [
    { titulo: "Ley 31/1995, de Prevención de Riesgos Laborales (BOE-A-1995-24292)", url: BOE_LEY_31_1995 },
    { titulo: "Real Decreto 1627/1997, disposiciones mínimas de seguridad y salud en obras de construcción (BOE-A-1997-22614)", url: BOE_RD_1627_1997 },
    { titulo: "Real Decreto 773/1997, utilización de equipos de protección individual (BOE-A-1997-12735)", url: BOE_RD_773_1997 },
    { titulo: "Real Decreto 2177/2004, trabajos temporales en altura (BOE-A-2004-19311)", url: BOE_RD_2177_2004 },
  ],
  indice_estudio: [
    { url: BOE_LEY_31_1995, titulo: "La Ley 31/1995 y el RD 1627/1997 en obras de rotulación", seccion: "ley-prl-rd-1627-1997-rotulacion", articulos: "Ley 31/1995; RD 1627/1997" },
    { url: BOE_RD_773_1997, titulo: "Equipos de protección individual del Oficial Pintor Gráfica", seccion: "epi-oficial-pintor-grafica", articulos: "RD 773/1997" },
    { url: BOE_RD_2177_2004, titulo: "Trabajos en altura y líneas de vida en montaje de rótulos", seccion: "trabajos-altura-lineas-vida-rotulos", articulos: "RD 2177/2004" },
  ],
}]);

const S1 = "ley-prl-rd-1627-1997-rotulacion";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué establece la Ley 31/1995 de Prevención de Riesgos Laborales como derecho básico del trabajador, aplicable también al Oficial Pintor Especialidad Gráfica cuando instala un rótulo en una obra en construcción?", reverso: "El derecho a una protección eficaz en materia de seguridad y salud en el trabajo, correlativo al deber empresarial de garantizar esa seguridad, incluyendo la información, formación, consulta y participación del trabajador en todo lo relativo a los riesgos derivados de su puesto de trabajo" },
  { anverso: "¿Qué es el Estudio de Seguridad y Salud, documento exigido por el RD 1627/1997 en las obras de construcción donde puede intervenir un Oficial Pintor Gráfica?", reverso: "El documento elaborado por el promotor de la obra (a través del proyectista o del coordinador de seguridad) que identifica los riesgos previsibles de la obra y establece las medidas preventivas para evitarlos o reducirlos, siendo obligatorio en las obras que superan determinados umbrales de presupuesto, duración o número de trabajadores" },
  { anverso: "¿Qué es el coordinador de seguridad y salud durante la ejecución de la obra, figura prevista en el RD 1627/1997?", reverso: "El técnico designado por el promotor cuando en la ejecución de la obra intervienen más de una empresa o trabajadores autónomos, encargado de coordinar la aplicación de los principios preventivos entre todas las partes, aprobar el plan de seguridad y salud de cada contratista, y organizar la coordinación de actividades entre ellas" },
  { anverso: "¿Qué es el Libro de Incidencias, documento de obra regulado por el RD 1627/1997, relevante si el Oficial Pintor Gráfica detecta un incumplimiento de seguridad al instalar un rótulo?", reverso: "Un libro con hojas por duplicado custodiado en la obra en el que el coordinador de seguridad, la dirección facultativa, los contratistas o los representantes de los trabajadores pueden anotar cualquier incumplimiento de las medidas de seguridad previstas, obligando su anotación a notificar la incidencia a la Inspección de Trabajo en un plazo de 24 horas" },
  { anverso: "¿Qué es el Plan de Seguridad y Salud, documento que cada empresa contratista debe elaborar en aplicación del Estudio de Seguridad y Salud de la obra, incluida una empresa de rotulación subcontratada?", reverso: "El documento en el que la empresa contratista analiza, estudia, desarrolla y complementa el Estudio de Seguridad y Salud del promotor en función de su propio método de ejecución de los trabajos, adaptándolo a las circunstancias concretas de su intervención en la obra" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué derecho básico establece la Ley 31/1995 para el trabajador en materia de seguridad y salud?", explicacion: "El derecho a una protección eficaz, correlativo al deber empresarial de garantizarla.", dificultad: "facil", opciones: ["El derecho a una protección eficaz en seguridad y salud", "El derecho a elegir libremente el equipo de protección propio", "El derecho exclusivo a formación sin ninguna otra obligación", "El derecho a rechazar cualquier tarea sin justificación alguna"], correcta: 0 },
  { enunciado: "¿Qué es el Estudio de Seguridad y Salud exigido por el RD 1627/1997?", explicacion: "Documento que identifica riesgos previsibles y establece medidas preventivas, elaborado por el promotor.", dificultad: "media", opciones: ["Identifica riesgos previsibles y establece medidas preventivas", "Un documento exclusivo de cada trabajador individual", "Un documento que solo aplica a obras de reducido presupuesto", "Un documento opcional sin ninguna obligatoriedad legal"], correcta: 0 },
  { enunciado: "¿Cuál es la función del coordinador de seguridad y salud durante la ejecución de la obra?", explicacion: "Coordinar la aplicación de principios preventivos entre las distintas empresas que intervienen.", dificultad: "media", opciones: ["Coordinar la aplicación de principios preventivos entre empresas", "Ejecutar directamente los trabajos de rotulación de la obra", "Sustituir al empresario en todas sus obligaciones preventivas", "Elaborar en solitario el plan de seguridad de cada contratista"], correcta: 0 },
  { enunciado: "¿En qué plazo debe notificarse a la Inspección de Trabajo una anotación en el Libro de Incidencias?", explicacion: "24 horas.", dificultad: "dificil", opciones: ["24 horas", "72 horas", "7 días naturales", "No existe plazo obligatorio de notificación"], correcta: 0 },
  { enunciado: "¿Qué es el Plan de Seguridad y Salud de una empresa contratista?", explicacion: "Analiza y desarrolla el Estudio de Seguridad y Salud del promotor según su propio método de ejecución.", dificultad: "media", opciones: ["Desarrolla el Estudio de Seguridad según el método propio", "Sustituye por completo al Estudio de Seguridad del promotor", "Solo resulta exigible a la empresa principal, nunca a subcontratas", "Un documento redactado exclusivamente por el coordinador"], correcta: 0 },
]);

const S2 = "epi-oficial-pintor-grafica";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un Equipo de Protección Individual (EPI), según la definición del RD 773/1997, aplicable a la protección del Oficial Pintor Gráfica frente a caídas o cortes con material rígido?", reverso: "Cualquier equipo destinado a ser llevado o sujetado por el trabajador para que le proteja de uno o varios riesgos que puedan amenazar su seguridad o su salud en el trabajo, así como cualquier complemento o accesorio destinado a tal fin" },
  { anverso: "¿Qué EPI resulta imprescindible para el Oficial Pintor Gráfica al manipular materiales rígidos de gran formato (metacrilato, dibond, cartón pluma) durante su corte o montaje?", reverso: "Guantes de protección frente a riesgos mecánicos (cortes, pinchazos) y gafas de protección ocular, dado el riesgo de proyección de fragmentos o de corte con los bordes afilados que puede presentar un panel rígido recién cortado" },
  { anverso: "¿Qué EPI respiratorio puede resultar necesario para el Oficial Pintor Gráfica al aplicar disolventes o al trabajar con determinadas tintas o adhesivos en espacios poco ventilados?", reverso: "Una mascarilla con filtro para vapores orgánicos, adecuada frente a la exposición a disolventes y compuestos orgánicos volátiles presentes en algunas tintas, colas o productos de limpieza de superficies antes de la rotulación" },
  { anverso: "¿Qué obligación tiene el empresario respecto al mantenimiento y reposición de los EPI entregados al Oficial Pintor Gráfica, según el RD 773/1997?", reverso: "Proporcionar gratuitamente los EPI necesarios, velar por su uso efectivo, garantizar su mantenimiento y reponerlos cuando resulte necesario por deterioro o pérdida de sus propiedades protectoras, sin que su coste pueda repercutirse en ningún caso sobre el trabajador" },
  { anverso: "¿Qué criterio establece el RD 773/1997 sobre el uso de EPI frente a otras medidas de protección colectiva disponibles en una obra?", reverso: "Los EPI deben utilizarse cuando los riesgos no puedan evitarse o limitarse suficientemente por medios técnicos de protección colectiva o mediante medidas de organización del trabajo, siendo por tanto una medida de protección subsidiaria y no la primera opción preventiva a aplicar" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es un Equipo de Protección Individual (EPI) según el RD 773/1997?", explicacion: "Cualquier equipo llevado por el trabajador para protegerle de riesgos para su seguridad o salud.", dificultad: "facil", opciones: ["Cualquier equipo llevado por el trabajador para protegerle de riesgos", "Exclusivamente un dispositivo de protección colectiva de la obra", "Exclusivamente una señal de advertencia visible en la obra", "Un documento que certifica la formación preventiva del trabajador"], correcta: 0 },
  { enunciado: "¿Qué EPI resulta imprescindible al manipular paneles rígidos de gran formato en su corte o montaje?", explicacion: "Guantes frente a riesgos mecánicos y gafas de protección ocular.", dificultad: "media", opciones: ["Guantes frente a riesgos mecánicos y gafas de protección", "Únicamente calzado de seguridad, sin ningún otro EPI", "Únicamente un arnés anticaídas, sin protección de manos", "Ningún EPI resulta necesario al tratarse de material ligero"], correcta: 0 },
  { enunciado: "¿Qué EPI respiratorio puede necesitarse al trabajar con disolventes o tintas en espacios poco ventilados?", explicacion: "Una mascarilla con filtro para vapores orgánicos.", dificultad: "media", opciones: ["Una mascarilla con filtro para vapores orgánicos", "Un equipo de respiración autónoma de buceo profesional", "Ningún EPI respiratorio resulta nunca necesario en el taller", "Únicamente gafas de protección, sin protección respiratoria"], correcta: 0 },
  { enunciado: "¿Qué obligación tiene el empresario respecto al coste de los EPI?", explicacion: "Proporcionarlos gratuitamente, sin que su coste pueda repercutirse sobre el trabajador.", dificultad: "media", opciones: ["Proporcionarlos gratuitamente, sin repercutir su coste", "Repercutir su coste proporcionalmente en la nómina", "Solo debe reponerlos si el trabajador lo solicita expresamente", "El coste de los EPI corresponde siempre al propio trabajador"], correcta: 0 },
  { enunciado: "¿Qué criterio establece el RD 773/1997 sobre el uso de EPI frente a la protección colectiva?", explicacion: "Los EPI se emplean cuando el riesgo no puede evitarse por protección colectiva u organización del trabajo.", dificultad: "dificil", opciones: ["Los EPI son subsidiarios de la protección colectiva disponible", "Los EPI siempre deben priorizarse sobre la protección colectiva", "La protección colectiva nunca resulta obligatoria en una obra", "EPI y protección colectiva resultan excluyentes entre sí"], correcta: 0 },
]);

const S3 = "trabajos-altura-lineas-vida-rotulos";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué regula el Real Decreto 2177/2004, particularmente relevante para el Oficial Pintor Gráfica al instalar un rótulo o una lona de gran formato en la fachada de un edificio?", reverso: "Las disposiciones mínimas de seguridad y salud para la utilización por los trabajadores de equipos de trabajo en materia de trabajos temporales en altura, modificando el RD 1215/1997 para incorporar estas disposiciones específicas" },
  { anverso: "¿Qué es una línea de vida, sistema de protección colectiva o individual habitual al instalar un rótulo o una lona en fachada, cubierta o gran altura?", reverso: "Un dispositivo, fijo o temporal, formado por un cable o cuerda anclado a puntos resistentes de la estructura, al que el trabajador conecta su arnés mediante un dispositivo anticaídas deslizante, permitiéndole desplazarse por la zona de trabajo en altura mientras permanece protegido frente a una caída" },
  { anverso: "¿Qué orden de prioridad establece el RD 2177/2004 entre los distintos medios para realizar un trabajo temporal en altura (escalera de mano, plataforma elevadora, andamio, acceso mediante cuerda)?", reverso: "Deben priorizarse los equipos que proporcionen una protección colectiva (como una plataforma elevadora o un andamio con barandillas) frente a los medios que dependan únicamente de un equipo de protección individual, y dentro de estos, priorizar aquellos con mayor seguridad y menor riesgo, reservando la escalera de mano solo cuando otros medios más seguros no resulten justificados por el bajo riesgo o la corta duración de la tarea" },
  { anverso: "¿Qué formación específica exige el RD 2177/2004 a un trabajador antes de realizar trabajos con acceso mediante cuerda (por ejemplo, para instalar una lona en una fachada de gran altura)?", reverso: "Una formación adecuada y específica para las operaciones previstas, que incluya los procedimientos de rescate, dado el riesgo particular que presenta este método de trabajo y la necesidad de que el propio trabajador o sus compañeros puedan actuar con rapidez en caso de emergencia" },
  { anverso: "¿Por qué debe revisarse periódicamente el estado de un arnés anticaídas y de sus elementos de amarre antes de cada uso en un trabajo de instalación de rótulos en altura?", reverso: "Porque un arnés o una cuerda con costuras dañadas, cortes, quemaduras o desgaste por uso puede fallar en el momento de una caída real, perdiendo su capacidad de proteger al trabajador precisamente cuando resulta más necesaria; la normativa exige revisar el equipo antes de cada uso y sustituirlo ante cualquier indicio de deterioro" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué regula el Real Decreto 2177/2004?", explicacion: "Disposiciones mínimas de seguridad para trabajos temporales en altura, modificando el RD 1215/1997.", dificultad: "media", opciones: ["Disposiciones mínimas de seguridad para trabajos en altura", "Exclusivamente el uso de equipos de protección individual", "Exclusivamente las obras de construcción de nueva planta", "Exclusivamente el transporte de materiales pesados en obra"], correcta: 0 },
  { enunciado: "¿Qué es una línea de vida en un trabajo de instalación en altura?", explicacion: "Un cable o cuerda anclado a puntos resistentes al que se conecta el arnés mediante dispositivo anticaídas.", dificultad: "media", opciones: ["Un cable anclado al que se conecta el arnés del trabajador", "Un cable exclusivo para izar materiales, no personas", "Un tipo de andamio tubular de montaje rápido", "Un documento que certifica la resistencia de la fachada"], correcta: 0 },
  { enunciado: "¿Qué prioridad establece el RD 2177/2004 entre los distintos medios de trabajo en altura?", explicacion: "Priorizar la protección colectiva frente a la dependencia exclusiva de protección individual.", dificultad: "dificil", opciones: ["Priorizar la protección colectiva sobre la individual exclusiva", "La escalera de mano siempre es el medio prioritario a emplear", "Todos los medios de trabajo en altura tienen igual prioridad", "Debe emplearse siempre el acceso mediante cuerda como prioridad"], correcta: 0 },
  { enunciado: "¿Qué formación exige el RD 2177/2004 para trabajos con acceso mediante cuerda?", explicacion: "Formación adecuada y específica que incluya los procedimientos de rescate.", dificultad: "dificil", opciones: ["Formación específica que incluya procedimientos de rescate", "No exige ninguna formación adicional a la formación general", "Únicamente formación teórica, sin procedimientos de rescate", "Únicamente la formación exigida para el uso de escaleras"], correcta: 0 },
  { enunciado: "¿Por qué debe revisarse el arnés anticaídas antes de cada uso?", explicacion: "Un arnés dañado puede fallar en el momento de una caída real, perdiendo su capacidad protectora.", dificultad: "media", opciones: ["Un arnés dañado puede fallar en el momento de una caída real", "El arnés nunca se deteriora con el uso continuado", "Solo debe revisarse una vez al año, según la normativa", "La revisión del arnés no resulta exigida por ninguna norma"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 22 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 22, orden: 22, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-266 creado y vinculado como Tema 22 de Oficial Pintor Gráfica.");
