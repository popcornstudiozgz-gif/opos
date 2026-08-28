/**
 * Crea el tema canónico tema-32: "Negociación laboral y convenios
 * colectivos. El Convenio Colectivo del personal laboral de la DGA" y lo
 * asigna como Tema 14 de la oposición Auxiliar Administrativo DGA
 * (bloque-4, función pública).
 *
 * Texto oficial exacto del ítem 14 del programa (Resolución de 25 de
 * noviembre de 2025, ANEXO XXXI, "materias comunes" — verificado esta
 * sesión leyendo el PDF oficial de mia.aragon.es página por página):
 *   "Negociación laboral, conflictos y convenios colectivos. El convenio
 *   colectivo para el personal laboral de la Administración de la
 *   Comunidad Autónoma de Aragón: ámbito de aplicación y derechos y
 *   deberes del personal laboral."
 *
 * Dos secciones:
 * 1. negociacion-laboral-conflictos-convenios — EBEP (RDLeg 5/2015),
 *    Título III, Cap. IV (arts. 31-46): principios generales de la
 *    negociación colectiva, Mesas de Negociación, Pactos y Acuerdos,
 *    órganos de representación y solución extrajudicial de conflictos.
 *    (Texto ya leído íntegro para el seed del Tema 13 de esta misma
 *    sesión — EBEP Cap. IV no se había usado todavía en ningún tema.)
 * 2. convenio-colectivo-dga-ambito-derechos-deberes — VIII Convenio
 *    Colectivo para el Personal Laboral de la Administración de la
 *    Comunidad Autónoma de Aragón (BOA núm. 94, de 19 de mayo de 2023):
 *    ámbito de aplicación (art. 1), concepto de salario como derecho
 *    retributivo básico (art. 8) y régimen disciplinario como plasmación
 *    de los deberes del personal laboral (arts. 108-113), con la remisión
 *    expresa del propio Convenio (art. 108.2) al Código de Conducta del
 *    EBEP para su interpretación.
 *
 * Fuentes: texto consolidado del Real Decreto Legislativo 5/2015, de 30
 * de octubre (BOE-A-2015-11719), y el VIII Convenio Colectivo publicado
 * en el BOA núm. 94, de 19 de mayo de 2023 (csv: BOA20230519011,
 * descargado de acpua.aragon.es y contrastado con la publicación oficial
 * en boa.aragon.es), ambos leídos íntegros para este seed.
 *
 * Sigue el mismo patrón que los scripts de corrección de Tema 5, Tema 10
 * y el seed de Tema 13 de esta sesión: inserta también las opciones de
 * cada pregunta de test.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-negociacion-laboral-convenio-dga.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!URL_BASE || !SERVICE_KEY) {
  console.error("❌ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-32";

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
console.log("📚 Creando tema-32...");
await insertar("temas", [
  {
    slug: TEMA,
    titulo: "Negociación laboral y convenios colectivos. El Convenio Colectivo del personal laboral de la DGA",
    descripcion:
      "La negociación colectiva, la representación y la participación institucional de los empleados públicos: principios generales, Mesas de Negociación, Pactos y Acuerdos y solución extrajudicial de conflictos. El Convenio Colectivo para el Personal Laboral de la Administración de la Comunidad Autónoma de Aragón: ámbito de aplicación y derechos y deberes del personal laboral.",
    contenido:
      "Desarrolla el Capítulo IV del Título III del Estatuto Básico del Empleado Público (Real Decreto Legislativo 5/2015): el derecho a la negociación colectiva, representación y participación institucional, las Mesas de Negociación, los Pactos y Acuerdos y los órganos de representación del personal. Se completa con el VIII Convenio Colectivo para el Personal Laboral de la Administración de la Comunidad Autónoma de Aragón (BOA núm. 94, de 19 de mayo de 2023): su ámbito de aplicación, el concepto de salario y el régimen disciplinario como plasmación de los deberes del personal laboral.",
    enlaces_boe: [
      {
        pdf: "tema-32-ebep",
        url: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11719",
        titulo: "Texto refundido de la Ley del Estatuto Básico del Empleado Público",
      },
      {
        pdf: "tema-32-viii-convenio-dga",
        url: "https://www.boa.aragon.es/cgi-bin/EBOA/BRSCGI?CMD=VEROBJ&MLKOB=1277434930505",
        titulo: "VIII Convenio Colectivo para el Personal Laboral de la Administración de la Comunidad Autónoma de Aragón",
      },
    ],
    indice_estudio: [
      {
        url: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11719#a31",
        titulo: "Negociación laboral, conflictos y convenios colectivos",
        seccion: "negociacion-laboral-conflictos-convenios",
        articulos: "arts. 31-46 EBEP",
      },
      {
        url: "https://www.boa.aragon.es/cgi-bin/EBOA/BRSCGI?CMD=VEROBJ&MLKOB=1277434930505#a1",
        titulo: "El convenio colectivo para el personal laboral de la DGA: ámbito de aplicación y derechos y deberes",
        seccion: "convenio-colectivo-dga-ambito-derechos-deberes",
        articulos: "VIII Convenio Colectivo, arts. 1, 8, 108-113",
      },
    ],
  },
]);

// ─────────────────────────────────────────────────────────────────────────
// Sección 1: negociacion-laboral-conflictos-convenios
// ─────────────────────────────────────────────────────────────────────────
const S1 = "negociacion-laboral-conflictos-convenios";
console.log(`📝 flashcards (${S1})...`);
await insertar(
  "flashcards",
  [
    { anverso: "Según el art. 31.1 EBEP, ¿para qué tienen derecho los empleados públicos a la negociación colectiva, representación y participación institucional?", reverso: "Para la determinación de sus condiciones de trabajo" },
    { anverso: "Según el art. 31.2 EBEP, ¿qué se entiende por negociación colectiva?", reverso: "El derecho a negociar la determinación de las condiciones de trabajo de los empleados de la Administración Pública" },
    { anverso: "Según el art. 33.1 EBEP, ¿a qué principios está sujeta la negociación colectiva de los funcionarios públicos?", reverso: "Legalidad, cobertura presupuestaria, obligatoriedad, buena fe negocial, publicidad y transparencia" },
    { anverso: "Según el art. 34.1 EBEP, ¿dónde se constituye una Mesa General de Negociación de los funcionarios públicos?", reverso: "En el ámbito de la Administración General del Estado, y en cada Comunidad Autónoma, ciudades de Ceuta y Melilla y Entidad Local" },
    { anverso: "Según el art. 36.3 EBEP, ¿para qué se constituye una Mesa General de Negociación en cada Administración Pública?", reverso: "Para negociar todas las materias y condiciones de trabajo comunes al personal funcionario, estatutario y laboral de esa Administración" },
    { anverso: "Según el art. 38.2 EBEP, ¿sobre qué materias versan los Pactos y cómo se aplican?", reverso: "Sobre materias del ámbito competencial del órgano administrativo que los suscribe, aplicándose directamente al personal de ese ámbito" },
    { anverso: "Según el art. 38.3 EBEP, ¿qué requiere la validez y eficacia de los Acuerdos?", reverso: "Su aprobación expresa y formal por los órganos de gobierno de las Administraciones Públicas" },
    { anverso: "Según el art. 39.1 EBEP, ¿cuáles son los órganos específicos de representación de los funcionarios?", reverso: "Los Delegados de Personal y las Juntas de Personal" },
    { anverso: "Según el art. 45.1 EBEP, ¿por qué procedimientos pueden estar integrados los sistemas de solución extrajudicial de conflictos colectivos?", reverso: "Por procedimientos de mediación y arbitraje" },
    { anverso: "Según el art. 15.b) EBEP, ¿qué naturaleza tiene el derecho a la negociación colectiva?", reverso: "Es un derecho individual de los empleados públicos que se ejerce de forma colectiva" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })),
);

console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "Según el art. 31.1 del EBEP, ¿para qué tienen derecho los empleados públicos a la negociación colectiva, representación y participación institucional?", explicacion: "Para la determinación de sus condiciones de trabajo.", dificultad: "facil", opciones: ["Para la determinación de sus condiciones de trabajo", "Para la fijación unilateral de sus retribuciones", "Exclusivamente para la elección de vacaciones", "Para participar en el nombramiento de altos cargos"], correcta: 0 },
  { enunciado: "¿A qué principios está sujeta la negociación colectiva de los funcionarios públicos según el art. 33.1 del EBEP?", explicacion: "Legalidad, cobertura presupuestaria, obligatoriedad, buena fe negocial, publicidad y transparencia.", dificultad: "media", opciones: ["Legalidad, cobertura presupuestaria, obligatoriedad, buena fe negocial, publicidad y transparencia", "Exclusivamente confidencialidad y discrecionalidad", "Solo obligatoriedad y secreto profesional", "Unicidad de representación sindical sin excepciones"], correcta: 0 },
  { enunciado: "Según el art. 34.1 del EBEP, ¿en qué ámbitos se constituye una Mesa General de Negociación de los funcionarios públicos?", explicacion: "En el ámbito de la Administración General del Estado, así como en cada una de las Comunidades Autónomas, ciudades de Ceuta y Melilla y Entidades Locales.", dificultad: "media", opciones: ["AGE, cada Comunidad Autónoma, Ceuta y Melilla y las Entidades Locales", "Únicamente en la Administración General del Estado", "Solo en las Comunidades Autónomas con competencias exclusivas en función pública", "Exclusivamente en el ámbito municipal"], correcta: 0 },
  { enunciado: "Según el art. 36.3 del EBEP, ¿para qué se constituye una Mesa General de Negociación en cada Administración Pública, distinta de la Mesa General de Negociación de las Administraciones Públicas?", explicacion: "Para la negociación de todas aquellas materias y condiciones de trabajo comunes al personal funcionario, estatutario y laboral de esa Administración Pública.", dificultad: "dificil", opciones: [
    "Para negociar materias comunes al personal funcionario, estatutario y laboral de esa Administración",
    "Para negociar exclusivamente las retribuciones del personal laboral",
    "Para negociar únicamente cuestiones de régimen disciplinario",
    "Para sustituir a la Mesa General de Negociación de las Administraciones Públicas",
  ], correcta: 0 },
  { enunciado: "Según el art. 38.2 del EBEP, ¿sobre qué materias versan los Pactos y cómo se aplican al personal?", explicacion: "Los Pactos se celebran sobre materias que se correspondan estrictamente con el ámbito competencial del órgano administrativo que lo suscribe y se aplican directamente al personal de ese ámbito.", dificultad: "dificil", opciones: [
    "Sobre materias del ámbito competencial del órgano que los suscribe, con aplicación directa",
    "Sobre cualquier materia, requiriendo siempre ratificación parlamentaria",
    "Solo sobre materias retributivas, nunca sobre condiciones de trabajo",
    "Sobre materias de reserva de ley, con eficacia directa inmediata",
  ], correcta: 0 },
  { enunciado: "¿Qué requiere la validez y eficacia de los Acuerdos, según el art. 38.3 del EBEP?", explicacion: "Su aprobación expresa y formal por los órganos de gobierno de las Administraciones Públicas, al versar sobre materias competencia de dichos órganos.", dificultad: "media", opciones: ["Aprobación expresa y formal por los órganos de gobierno", "Únicamente la firma de la representación sindical", "Publicación en el Boletín Oficial, sin necesidad de aprobación", "Ratificación por referéndum entre el personal afectado"], correcta: 0 },
  { enunciado: "¿Cuáles son los órganos específicos de representación de los funcionarios, según el art. 39.1 del EBEP?", explicacion: "Los Delegados de Personal y las Juntas de Personal.", dificultad: "facil", opciones: ["Los Delegados de Personal y las Juntas de Personal", "Los Comités de Empresa exclusivamente", "Los Delegados Sindicales únicamente", "Las Mesas Sectoriales de Administración General"], correcta: 0 },
  { enunciado: "Según el art. 45.1 del EBEP, ¿por qué procedimientos pueden estar integrados los sistemas de solución extrajudicial de conflictos colectivos?", explicacion: "Por procedimientos de mediación y arbitraje.", dificultad: "media", opciones: ["Mediación y arbitraje", "Únicamente arbitraje obligatorio", "Recurso contencioso-administrativo directo", "Conciliación judicial exclusivamente"], correcta: 0 },
]);

// ─────────────────────────────────────────────────────────────────────────
// Sección 2: convenio-colectivo-dga-ambito-derechos-deberes
// ─────────────────────────────────────────────────────────────────────────
const S2 = "convenio-colectivo-dga-ambito-derechos-deberes";
console.log(`📝 flashcards (${S2})...`);
await insertar(
  "flashcards",
  [
    { anverso: "Según el art. 1.1 del VIII Convenio Colectivo, ¿quiénes son las partes firmantes?", reverso: "Las secciones sindicales de CCOO, UGT y CSIF (representatividad mayoritaria del 88,64%) y, por la Administración, la Dirección General de la Función Pública y Calidad de los Servicios" },
    { anverso: "Según el art. 1.2 del VIII Convenio Colectivo, ¿qué regula el Convenio?", reverso: "Las relaciones jurídico-laborales entre la Administración de la Comunidad Autónoma de Aragón y las personas trabajadoras a su servicio (también el personal caminero del Estado que preste servicios en ella)" },
    { anverso: "Según el art. 1.2 del VIII Convenio Colectivo, ¿qué colectivos quedan expresamente excluidos de su aplicación?", reverso: "El personal sanitario en formación, el profesorado de religión, el personal laboral docente que desempeñe funciones docentes y el personal de alta dirección" },
    { anverso: "Según el art. 1.4 del VIII Convenio Colectivo, ¿cuál es su ámbito territorial de aplicación?", reverso: "Todo el territorio de la Comunidad Autónoma de Aragón, y aquel otro territorio en el que deba prestar sus servicios el personal al que le sea de aplicación" },
    { anverso: "Según el art. 1.5 del VIII Convenio Colectivo, ¿hasta cuándo estuvo inicialmente vigente?", reverso: "Hasta el 31 de diciembre de 2024, entrando en vigor el día siguiente al de su publicación en el Boletín Oficial de Aragón" },
    { anverso: "Según el art. 2 del VIII Convenio Colectivo, ¿cuándo queda denunciado automáticamente el Convenio y qué ocurre mientras no haya nuevo acuerdo?", reverso: "Queda denunciado automáticamente 45 días antes de finalizar su vigencia; hasta que se alcance un nuevo acuerdo expreso, el Convenio queda prorrogado en sus propios términos" },
    { anverso: "Según el art. 8.1 del VIII Convenio Colectivo, ¿qué se considera salario?", reverso: "La totalidad de las percepciones económicas de las personas trabajadoras por la prestación profesional de sus servicios laborales, que retribuyan el trabajo efectivo o los períodos de descanso computables como de trabajo" },
    { anverso: "Según el art. 108.2 del VIII Convenio Colectivo, ¿qué principios y reglas informan la interpretación y aplicación del régimen disciplinario del personal laboral?", reverso: "Los principios y reglas del capítulo VI del título III del EBEP, referidos a los deberes de los empleados públicos y al Código de Conducta" },
    { anverso: "Según el art. 110 del VIII Convenio Colectivo, ¿en qué se clasifican las faltas disciplinarias del personal laboral?", reverso: "En muy graves, graves y leves" },
    { anverso: "Según el art. 111 del VIII Convenio Colectivo, ¿qué conductas se consideran falta muy grave, además de las del EBEP?", reverso: "Entre otras, el abuso de autoridad, la violación del sigilo profesional, y la violencia de género u otras formas de violencia sexual" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })),
);

console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "Según el art. 1.1 del VIII Convenio Colectivo para el Personal Laboral de la Administración de la Comunidad Autónoma de Aragón, ¿qué órgano representa a la Administración en su firma?", explicacion: "La Dirección General de la Función Pública y Calidad de los Servicios.", dificultad: "media", opciones: ["La Dirección General de la Función Pública y Calidad de los Servicios", "El Departamento de Presidencia en pleno", "El Instituto Aragonés de Administración Pública exclusivamente", "La Vicepresidencia del Gobierno de Aragón"], correcta: 0 },
  { enunciado: "¿Qué regula el VIII Convenio Colectivo, según su art. 1.2?", explicacion: "Las relaciones jurídico-laborales entre la Administración de la Comunidad Autónoma de Aragón y las personas trabajadoras a su servicio, siendo también de aplicación al personal caminero del Estado que preste servicios en dicha Administración.", dificultad: "facil", opciones: [
    "Las relaciones jurídico-laborales entre la Administración autonómica y sus trabajadores",
    "Las relaciones estatutarias de los funcionarios de carrera exclusivamente",
    "El régimen retributivo de los altos cargos del Gobierno de Aragón",
    "Las relaciones laborales del personal docente universitario",
  ], correcta: 0 },
  { enunciado: "¿Cuál de los siguientes colectivos NO queda excluido de la aplicación del VIII Convenio Colectivo según su art. 1.2?", explicacion: "Quedan excluidos el personal sanitario en formación, el profesorado de religión, el personal laboral docente que desempeñe funciones docentes y el personal de alta dirección. El personal de mantenimiento no figura entre las exclusiones.", dificultad: "dificil", opciones: ["El personal de mantenimiento", "El personal sanitario en formación", "El profesorado de religión", "El personal de alta dirección"], correcta: 0 },
  { enunciado: "Según el art. 1.4 del VIII Convenio Colectivo, ¿cuál es su ámbito territorial de aplicación?", explicacion: "Todo el territorio de la Comunidad Autónoma de Aragón, y aquel otro territorio en el que deba prestar sus servicios el personal al que sea de aplicación el Convenio.", dificultad: "media", opciones: [
    "Todo el territorio de Aragón y donde deba prestar servicios el personal afectado",
    "Únicamente el territorio de la provincia de Zaragoza",
    "Solo los centros de trabajo situados en capitales de provincia",
    "El ámbito nacional, por tratarse de personal laboral estatutario",
  ], correcta: 0 },
  { enunciado: "Según el art. 2 del VIII Convenio Colectivo, ¿qué ocurre con el Convenio una vez denunciado, hasta que se alcance un nuevo acuerdo expreso?", explicacion: "Queda prorrogado en sus propios términos.", dificultad: "media", opciones: ["Queda prorrogado en sus propios términos", "Queda automáticamente sin efecto y sin aplicación", "Se aplica supletoriamente el Estatuto de los Trabajadores en su totalidad", "Entra en vigor de forma provisional el convenio del sector privado equivalente"], correcta: 0 },
  { enunciado: "Según el art. 8.1 del VIII Convenio Colectivo, ¿qué cantidades NO tienen la consideración de salario?", explicacion: "No tienen la consideración de salario las indemnizaciones o suplidos por gastos derivados de la actividad laboral, las prestaciones o indemnizaciones de la Seguridad Social, y las indemnizaciones por traslados, suspensiones o despidos.", dificultad: "dificil", opciones: [
    "Las indemnizaciones o suplidos por gastos, las prestaciones de Seguridad Social y las indemnizaciones por traslado, suspensión o despido",
    "El sueldo base y los trienios reconocidos",
    "Los complementos salariales de puesto de trabajo",
    "Las pagas extraordinarias de junio y diciembre",
  ], correcta: 0 },
  { enunciado: "Según el art. 108.2 del VIII Convenio Colectivo, ¿a qué principios y reglas del EBEP se remite para interpretar y aplicar el régimen disciplinario del personal laboral?", explicacion: "A los principios y reglas del capítulo VI del título III del EBEP, referido a los deberes de los empleados públicos y al Código de Conducta.", dificultad: "dificil", opciones: [
    "Los deberes de los empleados públicos y el Código de Conducta (Cap. VI, Título III EBEP)",
    "El régimen retributivo del Cap. III, Título III EBEP",
    "La carrera profesional del Cap. II, Título III EBEP",
    "Las situaciones administrativas del Título VI EBEP",
  ], correcta: 0 },
  { enunciado: "Según el art. 110 del VIII Convenio Colectivo, ¿en qué se clasifican las faltas disciplinarias del personal laboral cometidas con ocasión o consecuencia del trabajo?", explicacion: "En muy graves, graves o leves.", dificultad: "facil", opciones: ["Muy graves, graves o leves", "Graves y leves únicamente, sin categoría de muy graves", "Sancionables y no sancionables", "Disciplinarias y civiles"], correcta: 0 },
]);

console.log(
  "✅ tema-32 creado (2 secciones: negociacion-laboral-conflictos-convenios, convenio-colectivo-dga-ambito-derechos-deberes; 20 flashcards + 16 preguntas en total).",
);

// ─────────────────────────────────────────────────────────────────────────
// Asignación a la oposición DGA: numero 14, bloque-4 (función pública)
// ─────────────────────────────────────────────────────────────────────────
console.log("🔧 Asignando tema-32 a auxiliar-administrativo-dga (numero 14, bloque-4)...");

const bloqueRes = await fetch(
  `${URL_BASE}/rest/v1/bloques?oposicion_slug=eq.auxiliar-administrativo-dga&slug=eq.bloque-4&select=id`,
  { headers: HEADERS },
);
const [bloque4] = await bloqueRes.json();
if (!bloque4) {
  console.error("❌ No se encontró bloque-4 para auxiliar-administrativo-dga.");
  process.exit(1);
}

const asignacionRes = await fetch(`${URL_BASE}/rest/v1/tema_oposicion`, {
  method: "POST",
  headers: { ...HEADERS, Prefer: "return=representation" },
  body: JSON.stringify([
    {
      tema_slug: TEMA,
      oposicion_slug: "auxiliar-administrativo-dga",
      bloque_id: bloque4.id,
      numero: 14,
      orden: 14,
      es_premium: false,
      publicado: true,
      secciones_incluidas: [S1, S2],
    },
  ]),
});
if (!asignacionRes.ok) {
  console.error(`❌ Error insertando tema_oposicion: ${asignacionRes.status} ${await asignacionRes.text()}`);
  process.exit(1);
}
const asignado = await asignacionRes.json();
console.log(`   ✓ tema_oposicion insertado: ${JSON.stringify(asignado[0])}`);

console.log("✅ Tema 14 de la DGA (negociación laboral y convenio colectivo) dado de alta.");
