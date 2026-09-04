/**
 * Crea tema-297: "Prevención de Riesgos Laborales: normativa general" —
 * Tema 21 (numero=21, bloque-2) de Oficial Fontanero (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 19 oficial del Anexo I (bases1716.pdf, línea 550):
 * "Prevención de Riesgos Laborales: Normativa, Obligaciones de la empresa
 * y del trabajador. Los Servicios de Prevención."
 *
 * Sourcing: Ley 31/1995, de 8 de noviembre, de Prevención de Riesgos
 * Laborales (BOE-A-1995-24292) — norma ya verificada y citada de forma
 * extensiva en todo el proyecto (todas las "Oficial X" anteriores):
 * artículos 14-18 (obligaciones del empresario), artículo 29
 * (obligaciones del trabajador), artículos 30-32 bis (organización de la
 * prevención: servicios de prevención propio, mancomunado y ajeno, y el
 * recurso preventivo). RD 39/1997, Reglamento de los Servicios de
 * Prevención, también ya citado en el proyecto.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-297-prl-general-fontaneria.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-297";
const OPOSICION = "oficial-fontanero-ayto-zaragoza";
const BLOQUE_2_ID = "417e77bc-e7ac-4984-ae49-3a35de79350d";

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
  titulo: "Prevención de Riesgos Laborales: normativa general",
  descripcion: "La Ley 31/1995 de Prevención de Riesgos Laborales: objeto y principios generales. Obligaciones del empresario y del trabajador. Los Servicios de Prevención (propio, mancomunado, ajeno) y el recurso preventivo.",
  contenido: "Desarrolla el marco general de la prevención de riesgos laborales aplicable a cualquier trabajador, incluido el Oficial Fontanero: el objeto y los principios de la acción preventiva de la Ley 31/1995, las obligaciones del empresario en materia de seguridad y salud, las obligaciones y derechos del propio trabajador, y la organización de los Servicios de Prevención —propio, mancomunado o ajeno— junto con la figura del recurso preventivo.",
  enlaces_boe: [
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-1995-24292", titulo: "Ley 31/1995, de 8 de noviembre, de Prevención de Riesgos Laborales" },
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-1997-1853", titulo: "Real Decreto 39/1997, de 17 de enero, Reglamento de los Servicios de Prevención" },
  ],
  indice_estudio: [
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-1995-24292", titulo: "Objeto y principios de la Ley 31/1995", seccion: "objeto-y-principios-de-la-ley-31-1995", articulos: "Ley 31/1995, arts. 1-2 y 15" },
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-1995-24292", titulo: "Obligaciones de la empresa y del trabajador", seccion: "obligaciones-de-la-empresa-y-del-trabajador", articulos: "Ley 31/1995, arts. 14-18 y 29" },
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-1995-24292", titulo: "Los Servicios de Prevención", seccion: "los-servicios-de-prevencion", articulos: "Ley 31/1995, arts. 30-32 bis; RD 39/1997" },
  ],
}]);

const S1 = "objeto-y-principios-de-la-ley-31-1995";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Cuál es el objeto de la Ley 31/1995 de Prevención de Riesgos Laborales?", reverso: "Promover la seguridad y la salud de los trabajadores mediante la aplicación de medidas y el desarrollo de las actividades necesarias para la prevención de riesgos derivados del trabajo" },
  { anverso: "¿Qué derecho básico reconoce la Ley 31/1995 a todo trabajador?", reverso: "El derecho a una protección eficaz en materia de seguridad y salud en el trabajo, que lleva implícito un correlativo deber del empresario de protección de los trabajadores frente a los riesgos laborales" },
  { anverso: "¿Qué son los «principios de la acción preventiva» que recoge el artículo 15 de la Ley 31/1995?", reverso: "Los criterios que debe aplicar el empresario para gestionar la prevención: evitar los riesgos, evaluar los que no se puedan evitar, combatirlos en su origen, adaptar el trabajo a la persona, y anteponer la protección colectiva a la individual, entre otros" },
  { anverso: "¿Qué significa que la protección individual sea el último recurso dentro de los principios de la acción preventiva?", reverso: "Que antes de recurrir a un equipo de protección individual (EPI), la Ley obliga a haber agotado otras medidas: eliminar el riesgo, sustituirlo, o proteger de forma colectiva (por ejemplo, una barandilla frente a un arnés individual)" },
  { anverso: "¿A quién se aplica la Ley 31/1995, más allá de las relaciones laborales privadas?", reverso: "Tanto a las relaciones laborales reguladas en el Estatuto de los Trabajadores como al personal civil con relación de carácter administrativo o estatutario al servicio de las Administraciones Públicas, como el Ayuntamiento de Zaragoza" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Cuál es el objeto de la Ley 31/1995?", explicacion: "Promover la seguridad y la salud de los trabajadores frente a los riesgos derivados del trabajo.", dificultad: "facil", opciones: ["Promover la seguridad y la salud de los trabajadores frente a los riesgos del trabajo", "Regular exclusivamente el salario mínimo interprofesional de los trabajadores", "Regular exclusivamente los horarios y jornadas laborales de los trabajadores", "Regular exclusivamente el régimen de la Seguridad Social de los trabajadores"], correcta: 0 },
  { enunciado: "¿Qué derecho básico reconoce la Ley 31/1995 a todo trabajador?", explicacion: "El derecho a una protección eficaz en materia de seguridad y salud en el trabajo.", dificultad: "media", opciones: ["El derecho a una protección eficaz en materia de seguridad y salud en el trabajo", "El derecho exclusivo a elegir libremente su horario de trabajo diario", "El derecho exclusivo a un ascenso automático cada cinco años de antigüedad", "El derecho exclusivo a teletrabajar en cualquier puesto, sin excepción"], correcta: 0 },
  { enunciado: "¿Qué son los principios de la acción preventiva del artículo 15 de la Ley 31/1995?", explicacion: "Los criterios de gestión: evitar riesgos, evaluar los inevitables, combatirlos en origen, priorizar protección colectiva.", dificultad: "media", opciones: ["Los criterios que debe aplicar el empresario para gestionar la prevención de riesgos", "Un listado cerrado de equipos de protección individual obligatorios en cualquier puesto", "Un listado cerrado de sanciones aplicables a cualquier incumplimiento del trabajador", "Un procedimiento exclusivo para tramitar bajas médicas derivadas de accidente laboral"], correcta: 0 },
  { enunciado: "¿Por qué la protección individual (EPI) se considera el último recurso en los principios de la acción preventiva?", explicacion: "Porque antes deben agotarse otras medidas: eliminar, sustituir o proteger colectivamente.", dificultad: "dificil", opciones: ["Porque antes de recurrir a un EPI deben agotarse otras medidas como eliminar el riesgo o proteger colectivamente", "Porque los EPI están expresamente prohibidos por la Ley 31/1995 en cualquier circunstancia", "Porque los EPI son siempre más eficaces que cualquier medida de protección colectiva", "Porque la Ley 31/1995 no regula en ningún caso los equipos de protección individual"], correcta: 0 },
  { enunciado: "¿A quién se aplica la Ley 31/1995, además de a las relaciones laborales privadas?", explicacion: "Al personal de las Administraciones Públicas con relación administrativa o estatutaria.", dificultad: "media", opciones: ["Al personal de las Administraciones Públicas con relación administrativa o estatutaria", "Exclusivamente a las empresas privadas de más de 500 trabajadores", "Exclusivamente a los trabajadores autónomos sin ningún empleado a su cargo", "A ningún otro colectivo distinto de las relaciones laborales privadas"], correcta: 0 },
]);

const S2 = "obligaciones-de-la-empresa-y-del-trabajador";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué deber general tiene el empresario según el artículo 14 de la Ley 31/1995?", reverso: "Garantizar la seguridad y la salud de los trabajadores a su servicio en todos los aspectos relacionados con el trabajo, adoptando cuantas medidas sean necesarias para la protección eficaz" },
  { anverso: "¿Qué obligación tiene el empresario respecto a la evaluación de riesgos, según el artículo 16 de la Ley 31/1995?", reverso: "Realizar una evaluación inicial de los riesgos para la seguridad y salud de los trabajadores, teniendo en cuenta la naturaleza de la actividad, y actualizarla cuando cambien las condiciones de trabajo o se produzcan daños a la salud" },
  { anverso: "¿Qué debe proporcionar el empresario al trabajador respecto a los equipos de protección individual, según el artículo 17 de la Ley 31/1995?", reverso: "Equipos de protección individual adecuados para el desempeño de sus funciones, y velar por su uso efectivo cuando, por la naturaleza del trabajo, sean necesarios" },
  { anverso: "¿Qué obligaciones tiene el trabajador según el artículo 29 de la Ley 31/1995, en correspondencia con las del empresario?", reverso: "Velar, según sus posibilidades, por su propia seguridad y salud y por la de otras personas afectadas por su actividad, usar adecuadamente los equipos de trabajo y de protección, y no poner fuera de funcionamiento los dispositivos de seguridad" },
  { anverso: "¿Qué deben recibir los trabajadores, según el artículo 19 de la Ley 31/1995, en relación con los riesgos de su puesto?", reverso: "Una formación teórica y práctica, suficiente y adecuada, en materia preventiva, centrada específicamente en su puesto de trabajo y adaptada a la evolución de los riesgos" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué deber general tiene el empresario según el artículo 14 de la Ley 31/1995?", explicacion: "Garantizar la seguridad y salud de los trabajadores en todos los aspectos del trabajo.", dificultad: "facil", opciones: ["Garantizar la seguridad y la salud de los trabajadores en todos los aspectos relacionados con el trabajo", "Garantizar exclusivamente el salario mínimo de los trabajadores a su cargo", "Garantizar exclusivamente la formación técnica del oficio, sin relación con la seguridad", "Garantizar exclusivamente el transporte de los trabajadores hasta el centro de trabajo"], correcta: 0 },
  { enunciado: "¿Qué obligación tiene el empresario respecto a la evaluación de riesgos?", explicacion: "Realizar una evaluación inicial y actualizarla ante cambios o daños a la salud.", dificultad: "media", opciones: ["Realizar una evaluación inicial de riesgos y actualizarla cuando cambien las condiciones de trabajo", "Realizar una única evaluación de riesgos en toda la vida útil de la empresa, sin actualizaciones", "Delegar por completo la evaluación de riesgos en cada trabajador individualmente", "Prescindir de cualquier evaluación de riesgos si la empresa tiene menos de 10 trabajadores"], correcta: 0 },
  { enunciado: "¿Qué debe proporcionar el empresario respecto a los equipos de protección individual?", explicacion: "EPI adecuados y velar por su uso efectivo.", dificultad: "media", opciones: ["Equipos de protección individual adecuados y velar por su uso efectivo", "Únicamente un listado teórico de riesgos, sin ningún equipo físico de protección", "Únicamente formación teórica, sin ninguna obligación de proporcionar EPI físicos", "Ningún equipo de protección, al ser esa una responsabilidad exclusiva del trabajador"], correcta: 0 },
  { enunciado: "¿Qué obligación tiene el trabajador según el artículo 29 de la Ley 31/1995?", explicacion: "Velar por su propia seguridad y la de otros, usar bien los equipos, no anular dispositivos de seguridad.", dificultad: "dificil", opciones: ["Velar por su propia seguridad y la de otras personas afectadas por su actividad, usando bien los equipos", "Ninguna obligación específica: toda la responsabilidad recae exclusivamente en el empresario", "Realizar personalmente la evaluación de riesgos de su propio puesto de trabajo", "Contratar por su cuenta un seguro privado adicional de accidentes de trabajo"], correcta: 0 },
  { enunciado: "¿Qué tipo de formación deben recibir los trabajadores según el artículo 19 de la Ley 31/1995?", explicacion: "Teórica y práctica, suficiente y adecuada, centrada en su puesto de trabajo.", dificultad: "media", opciones: ["Formación teórica y práctica, suficiente y adecuada, centrada en su puesto de trabajo", "Únicamente formación teórica general, sin ninguna parte práctica específica", "Únicamente formación práctica, sin ningún contenido teórico sobre los riesgos", "Ninguna formación específica, al considerarse suficiente la experiencia previa del trabajador"], correcta: 0 },
]);

const S3 = "los-servicios-de-prevencion";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué son los Servicios de Prevención, según la Ley 31/1995?", reverso: "El conjunto de medios humanos y materiales necesarios para realizar las actividades preventivas, con el fin de garantizar la adecuada protección de la seguridad y la salud de los trabajadores" },
  { anverso: "¿Qué modalidades de organización de la prevención contempla la Ley 31/1995 y el RD 39/1997?", reverso: "Asunción personal por el empresario (en determinadas condiciones), designación de trabajadores, servicio de prevención propio, servicio de prevención mancomunado (entre varias empresas), y servicio de prevención ajeno (contratado a una entidad externa especializada)" },
  { anverso: "¿Qué es un servicio de prevención ajeno?", reverso: "Una entidad especializada, externa a la empresa, acreditada por la autoridad laboral, que asume las actividades preventivas mediante el correspondiente contrato" },
  { anverso: "¿Qué es el recurso preventivo, regulado en el artículo 32 bis de la Ley 31/1995?", reverso: "Una o varias personas designadas por el empresario, presentes en el centro de trabajo, cuya función es vigilar el cumplimiento de las actividades preventivas en situaciones de especial riesgo (por ejemplo, cuando los riesgos puedan verse agravados por la concurrencia de operaciones diversas)" },
  { anverso: "¿En qué supuestos exige la Ley 31/1995 la presencia de recursos preventivos?", reverso: "Cuando los riesgos puedan agravarse por la concurrencia de operaciones diversas que se desarrollan sucesiva o simultáneamente y que hagan preciso el control de la correcta aplicación de los métodos de trabajo, entre otros supuestos previstos reglamentariamente" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué son los Servicios de Prevención según la Ley 31/1995?", explicacion: "El conjunto de medios humanos y materiales para realizar las actividades preventivas.", dificultad: "facil", opciones: ["El conjunto de medios humanos y materiales necesarios para realizar las actividades preventivas", "Un listado cerrado de sanciones aplicables a los trabajadores incumplidores", "Un seguro privado obligatorio que cada trabajador debe contratar por su cuenta", "Un órgano exclusivamente sindical, sin ninguna función técnica preventiva"], correcta: 0 },
  { enunciado: "¿Qué modalidades de organización de la prevención contempla la normativa?", explicacion: "Asunción personal, designación de trabajadores, servicio propio, mancomunado y ajeno.", dificultad: "media", opciones: ["Asunción personal del empresario, designación de trabajadores, servicio propio, mancomunado o ajeno", "Únicamente la contratación obligatoria de un servicio de prevención ajeno, sin otra alternativa", "Únicamente la designación de un trabajador, sin ninguna otra modalidad posible", "Ninguna modalidad específica: cada empresa decide libremente sin ningún marco normativo"], correcta: 0 },
  { enunciado: "¿Qué es un servicio de prevención ajeno?", explicacion: "Una entidad externa especializada y acreditada que asume las actividades preventivas.", dificultad: "media", opciones: ["Una entidad especializada externa a la empresa, acreditada por la autoridad laboral", "Un departamento interno de la propia empresa, sin ninguna acreditación externa", "Un trabajador designado individualmente dentro de la propia plantilla", "Un órgano exclusivamente sindical sin ninguna acreditación técnica"], correcta: 0 },
  { enunciado: "¿Qué es el recurso preventivo del artículo 32 bis de la Ley 31/1995?", explicacion: "Persona(s) designada(s) para vigilar el cumplimiento de la prevención en situaciones de especial riesgo.", dificultad: "dificil", opciones: ["Una o varias personas designadas para vigilar el cumplimiento de la prevención en situaciones de especial riesgo", "Un fondo económico destinado exclusivamente a indemnizar accidentes laborales", "Un equipo de protección individual concreto exigido en cualquier puesto de trabajo", "Un servicio de prevención ajeno obligatorio para cualquier empresa, sin excepción"], correcta: 0 },
  { enunciado: "¿En qué supuesto exige la Ley 31/1995 la presencia de recursos preventivos?", explicacion: "Cuando los riesgos puedan agravarse por la concurrencia de operaciones diversas.", dificultad: "dificil", opciones: ["Cuando los riesgos puedan agravarse por la concurrencia de operaciones diversas sucesivas o simultáneas", "En cualquier puesto de trabajo, sin ninguna condición adicional de riesgo", "Únicamente en empresas de más de 500 trabajadores, sin excepción posible", "Nunca: el recurso preventivo es una figura meramente orientativa sin exigencia real"], correcta: 0 },
]);

console.log(`📖 glosario...`);
await insertar("glosario", [
  { tema_slug: TEMA, seccion: S1, termino: "Principios de la acción preventiva", definicion: "Criterios del artículo 15 de la Ley 31/1995 que ordenan la gestión de la prevención: evitar riesgos, evaluarlos, combatirlos en origen y priorizar la protección colectiva." },
  { tema_slug: TEMA, seccion: S1, termino: "Ley 31/1995", definicion: "Ley de Prevención de Riesgos Laborales, norma marco de la seguridad y salud en el trabajo en España." },
  { tema_slug: TEMA, seccion: S2, termino: "Evaluación de riesgos", definicion: "Análisis inicial y periódico de los riesgos de cada puesto de trabajo, obligación del empresario según el artículo 16 de la Ley 31/1995." },
  { tema_slug: TEMA, seccion: S2, termino: "EPI", definicion: "Equipo de Protección Individual, elemento que el empresario debe proporcionar cuando otras medidas no eliminan por completo el riesgo." },
  { tema_slug: TEMA, seccion: S3, termino: "Servicio de prevención ajeno", definicion: "Entidad especializada externa a la empresa, acreditada por la autoridad laboral, que asume la actividad preventiva mediante contrato." },
  { tema_slug: TEMA, seccion: S3, termino: "Recurso preventivo", definicion: "Persona designada por el empresario para vigilar el cumplimiento de la prevención en situaciones de especial riesgo, según el artículo 32 bis de la Ley 31/1995." },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 21 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 21, orden: 21, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-297 creado y vinculado como Tema 21 de Oficial Fontanero.");
