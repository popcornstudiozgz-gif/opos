/**
 * Crea tema-302: "Adquisición y pérdida de la condición de funcionario.
 * Situaciones administrativas. Seguridad Social. Prevención de Riesgos
 * Laborales" — Tema 8 (numero=8, bloque-1) de Bombero/a Conductor/a.
 *
 * Tema 8 oficial (bases2107.pdf, Anexo I): "Adquisición y perdida de la
 * condición de funcionario/a. Situaciones administrativas. La Seguridad
 * Social de los funcionarios/as locales. Seguridad Social: régimen general.
 * Entidades gestoras y colaboradoras. Inscripción y afiliación.
 * Contingencias protegidas. Prestaciones. Prevención de Riesgos Laborales:
 * normativa, obligaciones de la empresa y del trabajador y servicios de
 * prevención."
 *
 * Tema dedicado: combina materias que en este proyecto están en tema-18
 * (situaciones), tema-31 (Seguridad Social) y tema-25/tema-297 (PRL).
 *
 * Fuentes leídas en la sesión (texto consolidado del BOE):
 * - TREBEP (BOE-A-2015-11719): arts. 62, 63, 85, 86, 89 y 90.
 * - Texto refundido de la Ley General de la Seguridad Social, RDLeg 8/2015
 *   (BOE-A-2015-11724): arts. 7, 15, 16, 42, 66, 80, 136 (en particular
 *   136.2.l: el personal funcionario de las Administraciones Públicas se
 *   integra en el Régimen General salvo que esté en Clases Pasivas u otro
 *   régimen por ley especial — es la base de la Seguridad Social de los
 *   funcionarios locales), 156, 157 y 158.
 * - Ley 31/1995 de Prevención de Riesgos Laborales (BOE-A-1995-24292) y RD
 *   39/1997 (BOE-A-1997-1853): mismos artículos ya verificados para
 *   tema-297 (arts. 14-19, 29, 30-32 bis).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-302-situaciones-seguridad-social-prl.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-302";
const OPOSICION = "bombero-conductor-ayto-zaragoza";
const BLOQUE_1_ID = "653513ce-b965-421a-a408-7bcc01058baf";
const NUMERO = 8;

const EBEP = "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11719";
const LGSS = "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11724";
const LPRL = "https://www.boe.es/buscar/act.php?id=BOE-A-1995-24292";
const RSP = "https://www.boe.es/buscar/act.php?id=BOE-A-1997-1853";

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
  const insertadas = await insertar("preguntas", preguntas.map(({ opciones, correcta, ...p }) => ({ ...p, tema_slug: TEMA, seccion })));
  await insertar("opciones", insertadas.flatMap((pregunta, i) => preguntas[i].opciones.map((texto, orden) => ({ pregunta_id: pregunta.id, texto, es_correcta: orden === preguntas[i].correcta, orden }))));
  console.log(`   ✓ preguntas (${seccion}): ${insertadas.length}`);
}
const q = (seccion, dificultad, enunciado, opciones, explicacion) => ({ seccion, dificultad, enunciado, opciones, explicacion });
async function crearCaso({ slug, titulo, supuesto, orden, preguntas }) {
  if (preguntas.length !== 10) { console.error(`❌ ${titulo}: ${preguntas.length} preguntas (se esperaban 10)`); process.exit(1); }
  const [caso] = await insertar("casos_practicos", [{ tema_slug: TEMA, slug, titulo, supuesto, orden }]);
  const insertadas = await insertar("preguntas", preguntas.map((p) => ({ tema_slug: TEMA, seccion: p.seccion, enunciado: p.enunciado, explicacion: p.explicacion, dificultad: p.dificultad })));
  await insertar("opciones", insertadas.flatMap((pregunta, i) => preguntas[i].opciones.map((texto, idx) => ({ pregunta_id: pregunta.id, texto, es_correcta: idx === 0, orden: idx }))));
  await insertar("caso_preguntas", insertadas.map((pregunta, i) => ({ caso_id: caso.id, pregunta_id: pregunta.id, orden: i })));
  console.log(`   ✓ caso: ${titulo}`);
}

const S1 = "adquisicion-perdida-situaciones";
const S2 = "seguridad-social-regimen-general";
const S3 = "prevencion-riesgos-laborales";

console.log(`📚 Creando ${TEMA}...`);
await insertar("temas", [{
  slug: TEMA,
  titulo: "Adquisición y pérdida de la condición de funcionario, situaciones administrativas, Seguridad Social y prevención de riesgos laborales",
  descripcion: "Requisitos para adquirir la condición de funcionario de carrera y causas de su pérdida. Situaciones administrativas. La Seguridad Social de los funcionarios locales y el Régimen General: afiliación, entidades gestoras y colaboradoras, contingencias y prestaciones. Prevención de riesgos laborales: normativa, obligaciones y servicios de prevención.",
  contenido: "Sigue la vida administrativa del funcionario desde el nombramiento hasta la pérdida de la condición, pasando por las situaciones en que puede encontrarse (servicio activo, excedencias, suspensión...). Explica por qué los funcionarios locales cotizan en el Régimen General de la Seguridad Social, quién gestiona las prestaciones, qué es un accidente de trabajo y qué protege el sistema. Termina con el marco de prevención de riesgos laborales que se aplica también al personal del Servicio contra Incendios.",
  enlaces_boe: [
    { url: EBEP, titulo: "Texto refundido de la Ley del Estatuto Básico del Empleado Público (RDLeg 5/2015)" },
    { url: LGSS, titulo: "Texto refundido de la Ley General de la Seguridad Social (RDLeg 8/2015)" },
    { url: LPRL, titulo: "Ley 31/1995, de Prevención de Riesgos Laborales" },
    { url: RSP, titulo: "Real Decreto 39/1997, Reglamento de los Servicios de Prevención" },
  ],
  indice_estudio: [
    { seccion: S1, titulo: "Adquisición y pérdida de la condición de funcionario. Situaciones administrativas", articulos: "TREBEP, arts. 62, 63 y 85-90", url: `${EBEP}#a62` },
    { seccion: S2, titulo: "La Seguridad Social: funcionarios locales y Régimen General", articulos: "LGSS, arts. 7, 15, 16, 42, 66, 80, 136 y 156-158", url: `${LGSS}#a136` },
    { seccion: S3, titulo: "Prevención de riesgos laborales", articulos: "Ley 31/1995, arts. 14-19, 29 y 30-32 bis; RD 39/1997", url: `${LPRL}#a14` },
  ],
}]);

console.log(`📝 ${S1}...`);
await insertar("flashcards", [
  { anverso: "¿Qué requisitos sucesivos exige el art. 62 TREBEP para adquirir la condición de funcionario de carrera?", reverso: "Superar el proceso selectivo; nombramiento por el órgano competente publicado en el diario oficial; acto de acatamiento de la Constitución (y del Estatuto de Autonomía) y del ordenamiento; y toma de posesión en plazo" },
  { anverso: "¿Cuáles son las causas de pérdida de la condición de funcionario de carrera (art. 63 TREBEP)?", reverso: "La renuncia; la pérdida de la nacionalidad; la jubilación total; la sanción firme de separación del servicio; y la pena firme de inhabilitación absoluta o especial para cargo público" },
  { anverso: "¿En qué situaciones administrativas puede hallarse un funcionario de carrera (art. 85 TREBEP)?", reverso: "Servicio activo, servicios especiales, servicio en otras Administraciones Públicas, excedencia y suspensión de funciones" },
  { anverso: "¿Qué modalidades de excedencia prevé el art. 89 TREBEP?", reverso: "Voluntaria por interés particular, voluntaria por agrupación familiar, por cuidado de familiares, por razón de violencia de género o sexual, y por razón de violencia terrorista" },
  { anverso: "¿Qué efectos tiene la suspensión de funciones (art. 90 TREBEP)?", reverso: "Priva al funcionario del ejercicio de sus funciones y de los derechos inherentes a su condición; determina la pérdida del puesto si excede de seis meses; la suspensión firme por sanción disciplinaria no puede exceder de seis años" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Cuál es el último de los requisitos para adquirir la condición de funcionario de carrera según el art. 62 TREBEP?", explicacion: "La toma de posesión dentro del plazo que se establezca.", dificultad: "facil", opciones: ["La toma de posesión", "La superación del proceso selectivo", "El nombramiento"], correcta: 0 },
  { enunciado: "¿Cuál de estas NO es causa de pérdida de la condición de funcionario de carrera?", explicacion: "La excedencia es una situación administrativa; las causas de pérdida del art. 63 son renuncia, pérdida de nacionalidad, jubilación total, separación firme e inhabilitación firme.", dificultad: "media", opciones: ["La excedencia voluntaria", "La renuncia", "La jubilación total"], correcta: 0 },
  { enunciado: "Para la excedencia voluntaria por interés particular se exige haber prestado servicios efectivos durante al menos:", explicacion: "Cinco años inmediatamente anteriores, salvo que las leyes de función pública fijen un periodo menor (art. 89.2).", dificultad: "media", opciones: ["Cinco años", "Un año", "Diez años"], correcta: 0 },
  { enunciado: "La excedencia por cuidado de cada hijo tiene una duración máxima de:", explicacion: "Tres años desde el nacimiento o la resolución judicial o administrativa (art. 89.4).", dificultad: "media", opciones: ["Tres años", "Un año", "Cinco años"], correcta: 0 },
  { enunciado: "En la excedencia por cuidado de familiares, el puesto de trabajo se reserva al menos durante:", explicacion: "Dos años; después, la reserva es a un puesto en la misma localidad y de igual retribución (art. 89.4).", dificultad: "dificil", opciones: ["Dos años", "Seis meses", "Todo el periodo de excedencia"], correcta: 0 },
]);

console.log(`📝 ${S2}...`);
await insertar("flashcards", [
  { anverso: "¿En qué régimen de Seguridad Social están los funcionarios de la Administración local?", reverso: "En el Régimen General: el art. 136.2.l) LGSS incluye al personal funcionario de las Administraciones Públicas, incluido su periodo de prácticas, salvo que estén en Clases Pasivas del Estado u otro régimen por ley especial" },
  { anverso: "¿Cómo es la afiliación a la Seguridad Social según el art. 15 LGSS?", reverso: "Obligatoria para las personas del art. 7.1 y única para toda su vida y para todo el sistema, sin perjuicio de las altas y bajas en los distintos regímenes" },
  { anverso: "¿Cuáles son las entidades gestoras de la Seguridad Social (art. 66 LGSS)?", reverso: "El Instituto Nacional de la Seguridad Social (prestaciones económicas), el Instituto Nacional de Gestión Sanitaria (servicios sanitarios) y el Instituto de Mayores y Servicios Sociales (pensiones no contributivas y servicios complementarios)" },
  { anverso: "¿Qué son las mutuas colaboradoras con la Seguridad Social (art. 80 LGSS)?", reverso: "Asociaciones privadas de empresarios, sin ánimo de lucro, autorizadas por el Ministerio, que colaboran en la gestión, entre otras, de las prestaciones por accidente de trabajo y enfermedad profesional y de la incapacidad temporal por contingencias comunes" },
  { anverso: "¿Qué es accidente de trabajo según el art. 156 LGSS?", reverso: "Toda lesión corporal que el trabajador sufra con ocasión o por consecuencia del trabajo que ejecute por cuenta ajena; incluye, entre otros, el accidente al ir o volver del trabajo (in itinere) y los ocurridos en actos de salvamento relacionados con el trabajo" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué entidad gestiona las prestaciones económicas del sistema de Seguridad Social, salvo las no contributivas?", explicacion: "El Instituto Nacional de la Seguridad Social (art. 66.1.a LGSS).", dificultad: "facil", opciones: ["El Instituto Nacional de la Seguridad Social", "El Instituto de Mayores y Servicios Sociales", "Las mutuas colaboradoras"], correcta: 0 },
  { enunciado: "¿Se presume accidente de trabajo la lesión sufrida durante el tiempo y en el lugar de trabajo?", explicacion: "Sí, salvo prueba en contrario (art. 156.3 LGSS).", dificultad: "media", opciones: ["Sí, salvo prueba en contrario", "No, nunca se presume", "Solo si hay testigos"], correcta: 0 },
  { enunciado: "Según el art. 156.4 LGSS, NO tiene la consideración de accidente de trabajo el debido a:", explicacion: "Dolo o imprudencia temeraria del trabajador, o fuerza mayor extraña al trabajo.", dificultad: "media", opciones: ["Dolo o imprudencia temeraria del trabajador", "La imprudencia profesional derivada de la confianza en el trabajo habitual", "Un acto de salvamento relacionado con el trabajo"], correcta: 0 },
  { enunciado: "¿Qué es la enfermedad profesional según el art. 157 LGSS?", explicacion: "La contraída a consecuencia del trabajo por cuenta ajena en las actividades y por los elementos o sustancias que especifica el cuadro reglamentario.", dificultad: "media", opciones: ["La contraída por el trabajo en las actividades y por las sustancias del cuadro reglamentario", "Cualquier enfermedad diagnosticada en horario laboral", "Toda enfermedad común de más de seis meses"], correcta: 0 },
  { enunciado: "¿Cuál de estas prestaciones forma parte de la acción protectora del sistema (art. 42 LGSS)?", explicacion: "La incapacidad temporal, entre otras prestaciones económicas del art. 42.1.c).", dificultad: "facil", opciones: ["La prestación económica por incapacidad temporal", "La ayuda para la compra de vivienda", "La beca de estudios universitarios"], correcta: 0 },
]);

console.log(`📝 ${S3}...`);
await insertar("flashcards", [
  { anverso: "¿Cuál es la norma básica de prevención de riesgos laborales y a quién se aplica en la Administración?", reverso: "La Ley 31/1995, que se aplica también al personal con relación administrativa o estatutaria al servicio de las Administraciones Públicas, como el Ayuntamiento de Zaragoza" },
  { anverso: "¿Qué deber general tiene el empresario según el art. 14 de la Ley 31/1995?", reverso: "Garantizar la seguridad y la salud de los trabajadores a su servicio en todos los aspectos relacionados con el trabajo" },
  { anverso: "Cita tres obligaciones del empresario en la Ley 31/1995", reverso: "Evaluar los riesgos y planificar la prevención (art. 16); proporcionar equipos de trabajo y de protección individual adecuados (art. 17); informar y formar a los trabajadores (arts. 18-19)" },
  { anverso: "¿Qué obligaciones tiene el trabajador según el art. 29 de la Ley 31/1995?", reverso: "Velar por su seguridad y la de otras personas afectadas por su actividad, usar adecuadamente equipos y EPI, no anular los dispositivos de seguridad e informar de inmediato de las situaciones de riesgo" },
  { anverso: "¿Qué modalidades de organización de la prevención existen (Ley 31/1995 y RD 39/1997)?", reverso: "Asunción personal por el empresario (en ciertos casos), designación de trabajadores, servicio de prevención propio, servicio de prevención mancomunado y servicio de prevención ajeno" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Se aplica la Ley 31/1995 a los funcionarios del Ayuntamiento?", explicacion: "Sí, también al personal con relación administrativa o estatutaria al servicio de las Administraciones Públicas.", dificultad: "facil", opciones: ["Sí", "No, solo a los trabajadores de empresas privadas", "Solo al personal laboral"], correcta: 0 },
  { enunciado: "Según los principios de la acción preventiva, la protección individual (EPI) debe:", explicacion: "Utilizarse cuando los riesgos no puedan evitarse o limitarse suficientemente por medios de protección colectiva: se antepone la protección colectiva a la individual.", dificultad: "media", opciones: ["Usarse cuando no baste la protección colectiva", "Anteponerse siempre a la protección colectiva", "Sustituir la evaluación de riesgos"], correcta: 0 },
  { enunciado: "¿Qué es un servicio de prevención ajeno?", explicacion: "Una entidad especializada externa, acreditada por la autoridad laboral, que asume las actividades preventivas mediante contrato.", dificultad: "media", opciones: ["Una entidad externa acreditada que asume la prevención mediante contrato", "Un departamento interno sin acreditación", "Un delegado sindical"], correcta: 0 },
  { enunciado: "Si un bombero detecta que su equipo de respiración autónoma tiene un defecto, según el art. 29 de la Ley 31/1995 debe:", explicacion: "Informar de inmediato a su superior y no usarlo; también es un deber no anular los dispositivos de seguridad.", dificultad: "media", opciones: ["Informar de inmediato a su superior", "Usarlo igualmente en la intervención", "Repararlo por su cuenta sin avisar"], correcta: 0 },
  { enunciado: "La formación en prevención que debe recibir el trabajador según el art. 19 de la Ley 31/1995 es:", explicacion: "Teórica y práctica, suficiente y adecuada, centrada en su puesto de trabajo.", dificultad: "media", opciones: ["Teórica y práctica, centrada en su puesto de trabajo", "Solo teórica y general", "Voluntaria"], correcta: 0 },
]);

console.log("📖 glosario...");
await insertar("glosario", [
  { tema_slug: TEMA, seccion: S1, termino: "Toma de posesión", definicion: "Último requisito para adquirir la condición de funcionario de carrera, tras el nombramiento y el acatamiento de la Constitución (art. 62 TREBEP)." },
  { tema_slug: TEMA, seccion: S1, termino: "Excedencia", definicion: "Situación administrativa en la que el funcionario deja temporalmente de prestar servicio; sus efectos sobre retribuciones y reserva de puesto dependen de la modalidad (art. 89 TREBEP)." },
  { tema_slug: TEMA, seccion: S2, termino: "Afiliación", definicion: "Acto obligatorio y único para toda la vida por el que una persona se incorpora al sistema de la Seguridad Social (art. 15 LGSS)." },
  { tema_slug: TEMA, seccion: S2, termino: "Accidente in itinere", definicion: "Accidente sufrido al ir o al volver del lugar de trabajo, que la LGSS considera accidente de trabajo (art. 156.2.a)." },
  { tema_slug: TEMA, seccion: S3, termino: "Evaluación de riesgos", definicion: "Análisis inicial y periódico de los riesgos de cada puesto que el empresario debe realizar y actualizar (art. 16 Ley 31/1995)." },
  { tema_slug: TEMA, seccion: S3, termino: "Servicio de prevención", definicion: "Conjunto de medios humanos y materiales necesarios para realizar las actividades preventivas; puede ser propio, mancomunado o ajeno." },
]);

console.log("🧩 casos prácticos...");
await crearCaso({
  slug: "caso-aspirante-aprobado-toma-posesion",
  titulo: "Del aprobado a la toma de posesión",
  orden: 1,
  supuesto: "Una aspirante supera la oposición y el curso selectivo de bombera-conductora y pregunta qué pasos le quedan para ser funcionaria de carrera y en qué situación quedará después.",
  preguntas: [
    q(S1, "facil", "Superado el proceso selectivo, ¿qué requisito viene a continuación según el art. 62 TREBEP?", ["El nombramiento por el órgano competente, publicado en el diario oficial", "La toma de posesión", "La afiliación a una mutua"], "Art. 62.1.b) TREBEP."),
    q(S1, "media", "¿Qué acto debe realizar antes de tomar posesión?", ["El acatamiento de la Constitución, del Estatuto de Autonomía y del ordenamiento", "Un examen médico adicional en todo caso", "La renuncia a cualquier otro empleo privado"], "Art. 62.1.c) TREBEP."),
    q(S1, "media", "Si después de aprobar no acreditara reunir los requisitos de la convocatoria, ¿qué ocurriría?", ["No podría ser nombrada y quedarían sin efecto sus actuaciones", "Se le daría un año más para acreditarlos", "Sería nombrada en prácticas indefinidamente"], "Art. 62.2 TREBEP."),
    q(S1, "facil", "Tras tomar posesión y empezar a prestar servicio, ¿en qué situación administrativa estará?", ["Servicio activo", "Servicios especiales", "Excedencia"], "Art. 86 TREBEP."),
    q(S2, "media", "¿En qué régimen de Seguridad Social quedará encuadrada?", ["En el Régimen General", "En el régimen de Clases Pasivas", "En el régimen de autónomos"], "Art. 136.2.l) LGSS."),
    q(S2, "media", "Si ya trabajó antes y está afiliada a la Seguridad Social, ¿debe afiliarse de nuevo?", ["No, la afiliación es única para toda la vida; se tramita el alta", "Sí, cada empleo exige una afiliación nueva", "Sí, al cambiar de régimen"], "Art. 15 LGSS."),
    q(S2, "media", "¿Estaba ya incluida en el Régimen General durante su periodo de prácticas?", ["Sí, el art. 136.2.l) LGSS incluye el periodo de prácticas", "No, las prácticas no cotizan", "Solo si duraban más de un año"], "Art. 136.2.l) LGSS."),
    q(S3, "media", "¿Qué deberá recibir del Ayuntamiento en materia preventiva al incorporarse?", ["Formación teórica y práctica en prevención centrada en su puesto", "Solo un manual en papel", "Nada, si ya hizo el curso selectivo"], "Art. 19 Ley 31/1995."),
    q(S1, "dificil", "Si años después quisiera dedicarse temporalmente a un proyecto personal, ¿qué modalidad de excedencia correspondería?", ["Excedencia voluntaria por interés particular, con al menos cinco años de servicios previos", "Excedencia por cuidado de familiares", "Suspensión de funciones"], "Art. 89.2 TREBEP."),
    q(S1, "media", "Durante esa excedencia por interés particular, ¿cobraría retribuciones?", ["No, y el tiempo no computa para ascensos ni trienios", "Sí, las básicas", "Sí, todas"], "Art. 89.2 TREBEP."),
  ],
});
await crearCaso({
  slug: "caso-bombero-lesionado-rescate",
  titulo: "Un bombero se lesiona durante un rescate",
  orden: 2,
  supuesto: "Durante un rescate en un edificio, un bombero sufre una lesión en la rodilla y causa baja. Días después, otro compañero se lesiona en un accidente de tráfico al volver a casa tras la guardia.",
  preguntas: [
    q(S2, "facil", "¿Es accidente de trabajo la lesión sufrida durante el rescate?", ["Sí, es una lesión sufrida con ocasión o por consecuencia del trabajo", "No, es enfermedad común", "Solo si queda incapacidad permanente"], "Art. 156.1 LGSS."),
    q(S2, "media", "¿Y la lesión del compañero al volver a casa tras la guardia?", ["También, como accidente in itinere", "No, fuera del parque nunca hay accidente de trabajo", "Solo si conducía un vehículo municipal"], "Art. 156.2.a) LGSS."),
    q(S2, "media", "Si la lesión se produjo en el lugar y tiempo de trabajo, ¿hay que probar que fue por el trabajo?", ["No, se presume accidente de trabajo salvo prueba en contrario", "Sí, siempre con informe de testigos", "Sí, con una sentencia judicial"], "Art. 156.3 LGSS."),
    q(S2, "media", "¿Qué prestación económica cubre la baja mientras se recupera?", ["La incapacidad temporal", "La jubilación", "La prestación familiar"], "Art. 42.1.c) LGSS."),
    q(S2, "media", "¿Qué tipo de entidad puede colaborar en la gestión de las prestaciones por accidente de trabajo?", ["Una mutua colaboradora con la Seguridad Social", "Un sindicato", "Una compañía de seguros de vida"], "Art. 80.2.a) LGSS."),
    q(S2, "dificil", "¿Impediría calificarlo de accidente de trabajo que el bombero actuase con exceso de confianza propio de su trabajo habitual?", ["No, la imprudencia profesional no lo impide", "Sí, siempre", "Solo si es la primera vez"], "Art. 156.5.a) LGSS."),
    q(S3, "media", "¿Qué debe hacer el Ayuntamiento, como empleador, tras el accidente?", ["Revisar la evaluación de riesgos si se han producido daños a la salud", "Nada, la prevención acabó con la entrega de EPI", "Sancionar automáticamente al bombero"], "Art. 16 Ley 31/1995: la evaluación debe revisarse con ocasión de los daños para la salud."),
    q(S3, "media", "¿Qué principio preventivo se aplica al decidir instalar una protección colectiva en lugar de depender solo del EPI?", ["Anteponer la protección colectiva a la individual", "Trasladar la responsabilidad al trabajador", "Evitar cualquier formación adicional"], "Art. 15 Ley 31/1995."),
    q(S2, "media", "¿Qué entidad gestora administra la asistencia sanitaria en el ámbito de su competencia?", ["El Instituto Nacional de Gestión Sanitaria", "El Instituto de Mayores y Servicios Sociales", "El Instituto Nacional de la Seguridad Social"], "Art. 66.1.b) LGSS."),
    q(S1, "media", "Mientras está de baja, ¿pierde el bombero su situación de servicio activo?", ["No, la baja no cambia su situación administrativa", "Sí, pasa a excedencia", "Sí, pasa a suspensión de funciones"], "Las situaciones administrativas son las del art. 85 TREBEP; la incapacidad temporal no figura entre ellas."),
  ],
});
await crearCaso({
  slug: "caso-evaluacion-riesgos-nuevo-equipo",
  titulo: "La llegada de un nuevo equipo al parque",
  orden: 3,
  supuesto: "El parque recibe un nuevo modelo de herramienta hidráulica de corte para rescates. Antes de ponerla en servicio, la jefatura organiza la prevención con el Servicio de Prevención municipal.",
  preguntas: [
    q(S3, "facil", "¿Qué debe garantizar el Ayuntamiento antes de usar el nuevo equipo?", ["La seguridad y salud de los trabajadores en todos los aspectos relacionados con su uso", "Únicamente que el equipo sea barato", "Nada, si el fabricante lo garantiza"], "Art. 14 Ley 31/1995."),
    q(S3, "media", "¿Debe actualizarse la evaluación de riesgos por la introducción del nuevo equipo?", ["Sí, al cambiar las condiciones de trabajo", "No, la evaluación inicial vale para siempre", "Solo si ya ha habido un accidente"], "Art. 16 Ley 31/1995."),
    q(S3, "media", "¿Qué formación deben recibir los bomberos sobre el nuevo equipo?", ["Teórica y práctica, suficiente y adecuada a su puesto", "Solo la lectura del manual", "Ninguna, si son veteranos"], "Art. 19 Ley 31/1995."),
    q(S3, "media", "¿Qué obligación tienen los bomberos al usarlo?", ["Usarlo adecuadamente según su naturaleza y los riesgos previsibles", "Modificarlo para trabajar más rápido", "Retirar sus protecciones si estorban"], "Art. 29 Ley 31/1995."),
    q(S3, "media", "Si el Ayuntamiento organiza la prevención con medios humanos y técnicos propios, ¿qué modalidad usa?", ["Servicio de prevención propio", "Servicio de prevención ajeno", "Asunción personal por el Alcalde"], "Ley 31/1995 y RD 39/1997."),
    q(S3, "dificil", "Si durante un simulacro de rescate concurren operaciones de varios equipos que agravan los riesgos, ¿qué figura puede exigirse?", ["La presencia de recursos preventivos", "Un servicio de prevención ajeno adicional", "Ninguna"], "Art. 32 bis Ley 31/1995."),
    q(S3, "media", "¿Qué deben recibir los bomberos sobre los riesgos del nuevo equipo y las medidas adoptadas?", ["Información", "Una sanción preventiva", "Un complemento salarial"], "Art. 18 Ley 31/1995."),
    q(S3, "media", "Si un bombero detecta un fallo en el equipo durante la formación, ¿qué debe hacer?", ["Informar de inmediato a su superior", "Seguir usándolo hasta terminar", "Desmontarlo por su cuenta"], "Art. 29.2 Ley 31/1995."),
    q(S1, "media", "Uno de los formadores es un funcionario en excedencia por cuidado de familiares. ¿Puede participar en cursos de formación de la Administración?", ["Sí, los funcionarios en esa situación pueden participar en los cursos de formación", "No, nunca", "Solo si renuncia a la excedencia"], "Art. 89.4 TREBEP."),
    q(S2, "media", "Si un bombero se lesiona durante la práctica con el nuevo equipo, ¿cómo se calificaría?", ["Accidente de trabajo", "Enfermedad común", "Accidente no laboral"], "Art. 156.1 LGSS: lesión con ocasión o por consecuencia del trabajo."),
  ],
});

console.log(`\n🔗 Vinculando ${TEMA} como Tema ${NUMERO} de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_1_ID, numero: NUMERO, orden: NUMERO, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log(`\n✅ ${TEMA} creado y vinculado como Tema ${NUMERO} de Bombero/a Conductor/a.`);
