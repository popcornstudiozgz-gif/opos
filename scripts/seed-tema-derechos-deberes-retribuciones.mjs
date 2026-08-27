/**
 * Crea el tema canónico tema-31: "Derechos, deberes y régimen retributivo
 * de los funcionarios públicos. Seguridad Social" y lo asigna como Tema 13
 * de la oposición Auxiliar Administrativo DGA (bloque-4, función pública).
 *
 * Texto oficial exacto del ítem 13 del programa (Resolución de 25 de
 * noviembre de 2025, ANEXO XXXI, "materias comunes" — verificado esta
 * sesión leyendo el PDF oficial de mia.aragon.es página por página):
 *   "Derechos, deberes y código de conducta de los funcionarios. Carrera
 *   administrativa y Promoción profesional. Régimen retributivo.
 *   Regímenes de seguridad social: Régimen General y Mutualismo
 *   Administrativo."
 *
 * Cuatro secciones:
 * 1. derechos-deberes-codigo-conducta — EBEP (RDLeg 5/2015), Título III,
 *    Cap. I (derechos, arts. 14-15) y Cap. VI (deberes/código de
 *    conducta, arts. 52-54).
 * 2. carrera-promocion-interna — EBEP Título III, Cap. II (arts. 16-20).
 * 3. regimen-retributivo — EBEP Título III, Cap. III (arts. 21-30).
 * 4. seguridad-social-funcionarios — Real Decreto Legislativo 4/2000
 *    (texto refundido de la Ley sobre Seguridad Social de los
 *    Funcionarios Civiles del Estado, "ley MUFACE"), que regula el
 *    Mutualismo Administrativo, y su art. 2.2 y 3.2.f), que explican por
 *    qué los funcionarios de las Comunidades Autónomas de nuevo ingreso
 *    —como los Auxiliares Administrativos de la DGA— quedan encuadrados
 *    en el Régimen General de la Seguridad Social y no en MUFACE.
 *
 * Fuentes: texto consolidado del Real Decreto Legislativo 5/2015, de 30
 * de octubre (BOE-A-2015-11719), y del Real Decreto Legislativo 4/2000,
 * de 23 de junio (BOE-A-2000-12140), ambos leídos íntegros para este seed
 * vía BOE.
 *
 * Sigue el mismo patrón que los scripts de corrección de Tema 5 y Tema 10
 * de esta sesión: inserta también las opciones de cada pregunta de test.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-derechos-deberes-retribuciones.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!URL_BASE || !SERVICE_KEY) {
  console.error("❌ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-31";

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
console.log("📚 Creando tema-31...");
await insertar("temas", [
  {
    slug: TEMA,
    titulo: "Derechos, deberes y régimen retributivo de los funcionarios públicos. Seguridad Social",
    descripcion:
      "Los derechos individuales y colectivos de los empleados públicos y su código de conducta. La carrera administrativa y la promoción profesional. El régimen retributivo: retribuciones básicas y complementarias. Los regímenes de seguridad social de los funcionarios: Régimen General y Mutualismo Administrativo.",
    contenido:
      "Desarrolla el Título III del texto refundido del Estatuto Básico del Empleado Público (Real Decreto Legislativo 5/2015): derechos de los empleados públicos, código de conducta, carrera profesional y régimen retributivo. Se completa con el Real Decreto Legislativo 4/2000, que regula el Mutualismo Administrativo (MUFACE) como una de las dos vías de encuadramiento en la Seguridad Social de los funcionarios, junto al Régimen General, aplicable este último a los funcionarios de las Comunidades Autónomas de nuevo ingreso.",
    enlaces_boe: [
      {
        pdf: "tema-31-ebep",
        url: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11719",
        titulo: "Texto refundido de la Ley del Estatuto Básico del Empleado Público",
      },
      {
        pdf: "tema-31-ley-muface",
        url: "https://www.boe.es/buscar/act.php?id=BOE-A-2000-12140",
        titulo: "Texto refundido de la Ley sobre Seguridad Social de los Funcionarios Civiles del Estado",
      },
    ],
    indice_estudio: [
      {
        url: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11719#a14",
        titulo: "Derechos, deberes y código de conducta de los funcionarios",
        seccion: "derechos-deberes-codigo-conducta",
        articulos: "arts. 14-15 y 52-54 EBEP",
      },
      {
        url: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11719#a16",
        titulo: "Carrera administrativa y promoción profesional",
        seccion: "carrera-promocion-interna",
        articulos: "arts. 16-20 EBEP",
      },
      {
        url: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11719#a21",
        titulo: "Régimen retributivo",
        seccion: "regimen-retributivo",
        articulos: "arts. 21-30 EBEP",
      },
      {
        url: "https://www.boe.es/buscar/act.php?id=BOE-A-2000-12140#a1",
        titulo: "Regímenes de seguridad social: Régimen General y Mutualismo Administrativo",
        seccion: "seguridad-social-funcionarios",
        articulos: "RDLeg 4/2000, arts. 1-5, 11-12, 33-34",
      },
    ],
  },
]);

// ─────────────────────────────────────────────────────────────────────────
// Sección 1: derechos-deberes-codigo-conducta
// ─────────────────────────────────────────────────────────────────────────
const S1 = "derechos-deberes-codigo-conducta";
console.log(`📝 flashcards (${S1})...`);
await insertar(
  "flashcards",
  [
    { anverso: "Según el art. 14.a) EBEP, ¿qué derecho individual tienen los funcionarios de carrera?", reverso: "El derecho a la inamovilidad en la condición de funcionario de carrera" },
    { anverso: "Según el art. 14.c) EBEP, ¿conforme a qué principios se ejerce la progresión en la carrera profesional y la promoción interna?", reverso: "Igualdad, mérito y capacidad, mediante sistemas objetivos y transparentes de evaluación" },
    { anverso: "Según el art. 15 EBEP, ¿qué derechos individuales se ejercen de forma colectiva?", reverso: "Libertad sindical, negociación colectiva y participación, huelga, planteamiento de conflictos colectivos y derecho de reunión" },
    { anverso: "Según el art. 52 EBEP, ¿qué principios inspiran el Código de Conducta de los empleados públicos?", reverso: "Objetividad, integridad, neutralidad, responsabilidad, imparcialidad, confidencialidad, dedicación al servicio público, transparencia, ejemplaridad, austeridad, accesibilidad, eficacia, honradez y respeto a la igualdad, entre otros" },
    { anverso: "Según el art. 53.5 EBEP, ¿de qué deben abstenerse los empleados públicos por razón de sus principios éticos?", reverso: "De participar en asuntos en los que tengan interés personal, y de toda actividad privada que suponga riesgo de conflicto de intereses con su puesto público" },
    { anverso: "Según el art. 53.12 EBEP, ¿qué deber tienen los empleados públicos respecto a las materias clasificadas?", reverso: "Guardar secreto de las materias clasificadas u otras cuya difusión esté prohibida, y mantener discreción sobre los asuntos que conozcan por razón de su cargo" },
    { anverso: "Según el art. 54.3 EBEP, ¿en qué caso puede un empleado público desobedecer las instrucciones de un superior?", reverso: "Cuando constituyan una infracción manifiesta del ordenamiento jurídico, debiendo ponerlo inmediatamente en conocimiento de los órganos de inspección" },
    { anverso: "Según el art. 54.6 EBEP, ¿qué deben rechazar los empleados públicos?", reverso: "Cualquier regalo, favor o servicio en condiciones ventajosas que vaya más allá de los usos habituales, sociales y de cortesía" },
    { anverso: "Según el art. 14.h) EBEP, ¿frente a qué conductas se protege especialmente el derecho al respeto de la intimidad y dignidad en el trabajo?", reverso: "Frente al acoso sexual y por razón de sexo, de orientación e identidad sexual, expresión de género o características sexuales, moral y laboral" },
    { anverso: "Según el art. 52 EBEP, ¿qué informan los principios y reglas del Código de Conducta?", reverso: "La interpretación y aplicación del régimen disciplinario de los empleados públicos" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })),
);

console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "Según el art. 14.a) del EBEP, ¿a qué derecho individual tienen los funcionarios de carrera en correspondencia con la naturaleza de su relación de servicio?", explicacion: "A la inamovilidad en la condición de funcionario de carrera.", dificultad: "facil", opciones: ["A la inamovilidad en la condición de funcionario de carrera", "A la libre elección de destino sin proceso selectivo", "A la percepción de una indemnización al cesar voluntariamente", "A la exención total de responsabilidad disciplinaria"], correcta: 0 },
  { enunciado: "¿Conforme a qué principios se ejerce el derecho a la progresión en la carrera profesional y la promoción interna, según el art. 14.c) del EBEP?", explicacion: "Conforme a los principios constitucionales de igualdad, mérito y capacidad, mediante sistemas objetivos y transparentes de evaluación.", dificultad: "media", opciones: ["Igualdad, mérito y capacidad", "Antigüedad exclusivamente", "Discrecionalidad del superior jerárquico", "Sorteo entre los candidatos que cumplan requisitos mínimos"], correcta: 0 },
  { enunciado: "¿Cuál de los siguientes NO es un derecho individual ejercido colectivamente según el art. 15 del EBEP?", explicacion: "El art. 15 recoge la libertad sindical, la negociación colectiva y participación, la huelga, el planteamiento de conflictos colectivos y el derecho de reunión. La inamovilidad en la condición de funcionario es un derecho individual del art. 14, no colectivo.", dificultad: "dificil", opciones: ["El derecho a la inamovilidad en la condición de funcionario de carrera", "El ejercicio de la huelga", "La libertad sindical", "El derecho de reunión"], correcta: 0 },
  { enunciado: "Según el art. 52 del EBEP, ¿qué deben desempeñar los empleados públicos con arreglo a los principios de objetividad, integridad, neutralidad, responsabilidad y demás recogidos en dicho artículo?", explicacion: "Las tareas que tengan asignadas, velando por los intereses generales con sujeción y observancia de la Constitución y del resto del ordenamiento jurídico.", dificultad: "media", opciones: ["Las tareas que tengan asignadas, velando por los intereses generales", "Únicamente las funciones expresamente delegadas por escrito", "Las instrucciones verbales de cualquier ciudadano", "Las tareas que consideren más eficientes según su propio criterio"], correcta: 0 },
  { enunciado: "Según el art. 53.5 del EBEP, ¿de qué deben abstenerse los empleados públicos por razón de los principios éticos que rigen su actuación?", explicacion: "De participar en asuntos en los que tengan un interés personal, así como de toda actividad privada o interés que pueda suponer un riesgo de conflicto de intereses con su puesto público.", dificultad: "media", opciones: ["De asuntos con interés personal o riesgo de conflicto de intereses", "De cualquier actividad de formación continua", "De participar en procesos de promoción interna", "De ejercer el derecho de huelga"], correcta: 0 },
  { enunciado: "¿Qué deben rechazar los empleados públicos según el art. 54.6 del EBEP?", explicacion: "Cualquier regalo, favor o servicio en condiciones ventajosas que vaya más allá de los usos habituales, sociales y de cortesía, sin perjuicio de lo establecido en el Código Penal.", dificultad: "media", opciones: ["Cualquier regalo, favor o servicio ventajoso más allá de los usos sociales y de cortesía", "Únicamente los regalos de valor superior a 300 euros", "Los regalos procedentes de otras Administraciones Públicas", "Ningún regalo está prohibido si se declara públicamente"], correcta: 0 },
  { enunciado: "Según el art. 54.3 del EBEP, ¿qué debe hacer un empleado público que reciba una orden de un superior que constituya una infracción manifiesta del ordenamiento jurídico?", explicacion: "Debe ponerla inmediatamente en conocimiento de los órganos de inspección procedentes; en ese caso, no está obligado a obedecerla.", dificultad: "dificil", opciones: [
    "Ponerla inmediatamente en conocimiento de los órganos de inspección procedentes",
    "Obedecerla igualmente, ya que la orden de un superior siempre prevalece",
    "Solicitar autorización a un sindicato antes de actuar",
    "Esperar a que la orden se repita por segunda vez para poder desobedecerla",
  ], correcta: 0 },
  { enunciado: "Según el art. 14.h) del EBEP, el derecho al respeto de la intimidad, orientación e identidad sexual y dignidad en el trabajo se protege especialmente frente a:", explicacion: "Frente al acoso sexual y por razón de sexo, de orientación e identidad sexual, expresión de género o características sexuales, moral y laboral.", dificultad: "media", opciones: ["El acoso sexual y por razón de sexo, entre otras formas de acoso", "La evaluación anual del desempeño", "Los traslados forzosos por necesidades del servicio", "Las sanciones disciplinarias firmes"], correcta: 0 },
]);

// ─────────────────────────────────────────────────────────────────────────
// Sección 2: carrera-promocion-interna
// ─────────────────────────────────────────────────────────────────────────
const S2 = "carrera-promocion-interna";
console.log(`📝 flashcards (${S2})...`);
await insertar(
  "flashcards",
  [
    { anverso: "Según el art. 16.2 EBEP, ¿qué es la carrera profesional?", reverso: "El conjunto ordenado de oportunidades de ascenso y expectativas de progreso profesional conforme a los principios de igualdad, mérito y capacidad" },
    { anverso: "Según el art. 16.3 EBEP, ¿cuáles son las modalidades de carrera profesional de los funcionarios de carrera?", reverso: "Carrera horizontal, carrera vertical, promoción interna vertical y promoción interna horizontal" },
    { anverso: "Según el art. 16.3.a) EBEP, ¿en qué consiste la carrera horizontal?", reverso: "En la progresión de grado, categoría, escalón u otros conceptos análogos, sin necesidad de cambiar de puesto de trabajo" },
    { anverso: "Según el art. 16.3.c) EBEP, ¿en qué consiste la promoción interna vertical?", reverso: "En el ascenso desde un cuerpo o escala de un Subgrupo (o Grupo si no tiene Subgrupo) a otro superior" },
    { anverso: "Según el art. 18.2 EBEP, ¿qué requisitos debe cumplir un funcionario para participar en promoción interna?", reverso: "Poseer los requisitos exigidos para el ingreso, tener al menos dos años de antigüedad en servicio activo en el Subgrupo inferior, y superar las pruebas selectivas correspondientes" },
    { anverso: "Según el art. 20.1 EBEP, ¿qué mide la evaluación del desempeño?", reverso: "La conducta profesional y el rendimiento o el logro de resultados" },
    { anverso: "Según el art. 20.2 EBEP, ¿a qué criterios deben adecuarse los sistemas de evaluación del desempeño?", reverso: "Transparencia, objetividad, imparcialidad y no discriminación" },
    { anverso: "Según el art. 17.b) EBEP, ¿qué se valora en la carrera horizontal, además de la trayectoria y actuación profesional?", reverso: "La calidad de los trabajos realizados, los conocimientos adquiridos y el resultado de la evaluación del desempeño" },
    { anverso: "Según el art. 16.4 EBEP, ¿pueden los funcionarios progresar simultáneamente en carrera horizontal y vertical?", reverso: "Sí, cuando la Administración correspondiente las haya implantado en un mismo ámbito" },
    { anverso: "Según el art. 20.4 EBEP, ¿a qué queda vinculada la continuidad en un puesto de trabajo obtenido por concurso?", reverso: "A la evaluación del desempeño, dando audiencia al interesado y mediante resolución motivada" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })),
);

console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "Según el art. 16.2 del EBEP, ¿qué se entiende por carrera profesional?", explicacion: "El conjunto ordenado de oportunidades de ascenso y expectativas de progreso profesional conforme a los principios de igualdad, mérito y capacidad.", dificultad: "media", opciones: ["El conjunto ordenado de oportunidades de ascenso conforme a igualdad, mérito y capacidad", "El derecho exclusivo a permanecer en el mismo puesto de trabajo", "El sistema retributivo aplicable a los funcionarios interinos", "El procedimiento de acceso inicial al empleo público"], correcta: 0 },
  { enunciado: "¿Cuál de las siguientes NO es una modalidad de carrera profesional prevista en el art. 16.3 del EBEP?", explicacion: "Las modalidades previstas son carrera horizontal, carrera vertical, promoción interna vertical y promoción interna horizontal. La \"carrera diagonal\" no existe en el EBEP.", dificultad: "media", opciones: ["Carrera diagonal", "Carrera horizontal", "Carrera vertical", "Promoción interna vertical"], correcta: 0 },
  { enunciado: "Según el art. 16.3.a) del EBEP, ¿en qué consiste la carrera horizontal de los funcionarios de carrera?", explicacion: "En la progresión de grado, categoría, escalón u otros conceptos análogos, sin necesidad de cambiar de puesto de trabajo.", dificultad: "media", opciones: ["En la progresión de grado o categoría sin necesidad de cambiar de puesto de trabajo", "En el ascenso a un cuerpo de Subgrupo superior mediante proceso selectivo", "En el cambio voluntario de Administración Pública", "En la obtención de un puesto por libre designación"], correcta: 0 },
  { enunciado: "Según el art. 18.2 del EBEP, ¿cuál es la antigüedad mínima exigida en servicio activo en el Subgrupo inferior para participar en la promoción interna?", explicacion: "Al menos dos años de servicio activo en el inferior Subgrupo, o Grupo de clasificación profesional si este no tiene Subgrupo.", dificultad: "media", opciones: ["Dos años", "Cinco años", "Seis meses", "No se exige antigüedad mínima"], correcta: 0 },
  { enunciado: "Según el art. 20.1 del EBEP, ¿qué es la evaluación del desempeño?", explicacion: "El procedimiento mediante el cual se mide y valora la conducta profesional y el rendimiento o el logro de resultados.", dificultad: "facil", opciones: ["El procedimiento que mide y valora la conducta profesional y el rendimiento", "El proceso selectivo para el ingreso en la función pública", "El expediente disciplinario por faltas graves", "El sistema de cotización a la Seguridad Social"], correcta: 0 },
  { enunciado: "¿A qué criterios deben adecuarse, en todo caso, los sistemas de evaluación del desempeño, según el art. 20.2 del EBEP?", explicacion: "Transparencia, objetividad, imparcialidad y no discriminación, aplicándose sin menoscabo de los derechos de los empleados públicos.", dificultad: "media", opciones: ["Transparencia, objetividad, imparcialidad y no discriminación", "Confidencialidad absoluta sin posibilidad de recurso", "Exclusivamente criterios de antigüedad", "Discrecionalidad plena del órgano evaluador"], correcta: 0 },
  { enunciado: "Según el art. 17.b) del EBEP, además de la trayectoria y actuación profesional, ¿qué otros elementos se valoran en la carrera horizontal?", explicacion: "La calidad de los trabajos realizados, los conocimientos adquiridos y el resultado de la evaluación del desempeño, pudiendo incluirse otros méritos y aptitudes por razón de la especificidad de la función.", dificultad: "dificil", opciones: [
    "La calidad de los trabajos, los conocimientos adquiridos y el resultado de la evaluación del desempeño",
    "Únicamente la antigüedad en el puesto de trabajo",
    "El número de horas de formación recibidas en el último año, exclusivamente",
    "La valoración de un tribunal externo ajeno a la Administración",
  ], correcta: 0 },
  { enunciado: "Según el art. 20.4 del EBEP, ¿a qué queda vinculada la continuidad en un puesto de trabajo obtenido por concurso?", explicacion: "A la evaluación del desempeño de acuerdo con los sistemas de evaluación que determine cada Administración Pública, dándose audiencia al interesado y mediante resolución motivada.", dificultad: "dificil", opciones: [
    "A la evaluación del desempeño, con audiencia al interesado y resolución motivada",
    "A la antigüedad del funcionario en la Administración",
    "A la superación de un nuevo proceso selectivo cada cuatro años",
    "A la afiliación sindical del funcionario",
  ], correcta: 0 },
]);

// ─────────────────────────────────────────────────────────────────────────
// Sección 3: regimen-retributivo
// ─────────────────────────────────────────────────────────────────────────
const S3 = "regimen-retributivo";
console.log(`📝 flashcards (${S3})...`);
await insertar(
  "flashcards",
  [
    { anverso: "Según el art. 22.1 EBEP, ¿en qué se clasifican las retribuciones de los funcionarios de carrera?", reverso: "En retribuciones básicas y retribuciones complementarias" },
    { anverso: "Según el art. 23 EBEP, ¿de qué se componen exclusivamente las retribuciones básicas?", reverso: "Del sueldo asignado a cada Subgrupo o Grupo de clasificación profesional, y de los trienios" },
    { anverso: "Según el art. 23.b) EBEP, ¿qué son los trienios?", reverso: "Una cantidad igual para cada Subgrupo o Grupo de clasificación profesional, por cada tres años de servicio" },
    { anverso: "Según el art. 24 EBEP, ¿qué factores atienden las retribuciones complementarias?", reverso: "La progresión en la carrera administrativa, la especial dificultad/responsabilidad/dedicación del puesto, el rendimiento o resultados, y los servicios extraordinarios fuera de jornada" },
    { anverso: "Según el art. 22.4 EBEP, ¿cuántas pagas extraordinarias hay al año y de qué importe?", reverso: "Dos al año, cada una por el importe de una mensualidad de retribuciones básicas y de la totalidad de las retribuciones complementarias" },
    { anverso: "Según el art. 22.5 EBEP, ¿qué no puede percibir un funcionario como contraprestación de un servicio?", reverso: "Participación en tributos o en cualquier otro ingreso de las Administraciones Públicas, ni participación o premio en multas impuestas" },
    { anverso: "Según el art. 25 EBEP, ¿qué retribuciones perciben los funcionarios interinos?", reverso: "Las retribuciones básicas y pagas extraordinarias del Subgrupo de adscripción, más las retribuciones complementarias de los apartados b), c) y d) del art. 24, y las de la categoría de entrada" },
    { anverso: "Según el art. 30.1 EBEP, ¿tiene carácter sancionador la deducción proporcional de haberes por jornada no realizada?", reverso: "No, sin perjuicio de la sanción disciplinaria que pueda corresponder adicionalmente" },
    { anverso: "Según el art. 30.2 EBEP, ¿se perciben retribuciones durante el ejercicio del derecho de huelga?", reverso: "No; la deducción de haberes no tiene carácter de sanción ni afecta al régimen de prestaciones sociales" },
    { anverso: "Según el art. 21.2 EBEP, ¿qué límite existe para los incrementos retributivos?", reverso: "No pueden acordarse incrementos que globalmente superen los límites fijados anualmente en la Ley de Presupuestos Generales del Estado" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })),
);

console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "Según el art. 22.1 del EBEP, ¿en qué se clasifican las retribuciones de los funcionarios de carrera?", explicacion: "En retribuciones básicas y retribuciones complementarias.", dificultad: "facil", opciones: ["En básicas y complementarias", "En fijas y variables únicamente", "En mensuales y anuales", "En estatales y autonómicas"], correcta: 0 },
  { enunciado: "¿De qué se componen exclusivamente las retribuciones básicas, según el art. 23 del EBEP?", explicacion: "Del sueldo asignado a cada Subgrupo o Grupo de clasificación profesional, y de los trienios.", dificultad: "media", opciones: ["Del sueldo del Subgrupo y de los trienios", "Del sueldo, los trienios y el complemento de destino", "Únicamente del complemento específico", "De la totalidad de las retribuciones complementarias"], correcta: 0 },
  { enunciado: "Según el art. 23.b) del EBEP, ¿qué son los trienios?", explicacion: "Una cantidad igual para cada Subgrupo o Grupo de clasificación profesional, por cada tres años de servicio.", dificultad: "facil", opciones: ["Una cantidad igual por Subgrupo, por cada tres años de servicio", "Una cantidad variable según el puesto de trabajo desempeñado", "Un complemento exclusivo del personal directivo", "Una prestación de la Seguridad Social"], correcta: 0 },
  { enunciado: "¿Cuál de los siguientes NO es uno de los factores que, según el art. 24 del EBEP, deben atender las retribuciones complementarias?", explicacion: "El art. 24 atiende a la progresión en la carrera, la especial dificultad/responsabilidad/dedicación del puesto, el rendimiento o resultados y los servicios extraordinarios fuera de jornada. La antigüedad ya se retribuye mediante los trienios, que son retribución básica, no complementaria.", dificultad: "dificil", opciones: ["La antigüedad del funcionario", "La progresión alcanzada en la carrera administrativa", "La especial dificultad técnica o responsabilidad del puesto", "Los servicios extraordinarios prestados fuera de la jornada normal"], correcta: 0 },
  { enunciado: "Según el art. 22.4 del EBEP, ¿cuántas pagas extraordinarias perciben los funcionarios al año?", explicacion: "Dos al año, cada una por el importe de una mensualidad de retribuciones básicas y de la totalidad de las retribuciones complementarias (salvo las de los apartados c y d del art. 24).", dificultad: "facil", opciones: ["Dos", "Una", "Tres", "Cuatro"], correcta: 0 },
  { enunciado: "Según el art. 22.5 del EBEP, ¿qué está prohibido percibir a los funcionarios como contraprestación de un servicio?", explicacion: "No podrá percibirse participación en tributos o en cualquier otro ingreso de las Administraciones Públicas como contraprestación de cualquier servicio, participación o premio en multas impuestas.", dificultad: "dificil", opciones: [
    "Participación en tributos o en multas impuestas como contraprestación del servicio",
    "Las pagas extraordinarias correspondientes",
    "Los trienios devengados",
    "Las indemnizaciones por razón del servicio",
  ], correcta: 0 },
  { enunciado: "¿Tiene carácter sancionador la deducción proporcional de haberes por la parte de jornada no realizada, según el art. 30.1 del EBEP?", explicacion: "No, sin perjuicio de la sanción disciplinaria que, en su caso, pueda corresponder adicionalmente por la misma conducta.", dificultad: "media", opciones: ["No, no tiene carácter sancionador", "Sí, siempre se considera una sanción disciplinaria leve", "Sí, pero solo si se repite tres veces en un año", "Depende de la decisión discrecional del superior jerárquico"], correcta: 0 },
  { enunciado: "Según el art. 21.2 del EBEP, ¿qué límite existe para los incrementos retributivos que se acuerden?", explicacion: "No podrán acordarse incrementos retributivos que globalmente supongan un incremento de la masa salarial superior a los límites fijados anualmente en la Ley de Presupuestos Generales del Estado para el personal.", dificultad: "media", opciones: [
    "No superar los límites fijados anualmente en la Ley de Presupuestos Generales del Estado",
    "No pueden superar el 1% anual bajo ninguna circunstancia",
    "No existe ningún límite legal a los incrementos retributivos",
    "El límite lo fija cada funcionario individualmente en su solicitud",
  ], correcta: 0 },
]);

// ─────────────────────────────────────────────────────────────────────────
// Sección 4: seguridad-social-funcionarios
// ─────────────────────────────────────────────────────────────────────────
const S4 = "seguridad-social-funcionarios";
console.log(`📝 flashcards (${S4})...`);
await insertar(
  "flashcards",
  [
    { anverso: "Según el art. 2.1 del RDLeg 4/2000, ¿por qué mecanismos de cobertura queda integrado el Régimen especial de la Seguridad Social de los Funcionarios Civiles del Estado?", reverso: "Por el Régimen de Clases Pasivas del Estado y por el Régimen del Mutualismo Administrativo" },
    { anverso: "Según el art. 2.2 del RDLeg 4/2000, ¿a qué régimen quedan integrados, a efectos exclusivos de pensiones, los funcionarios de carrera de la Administración Civil del Estado ingresados desde el 1 de enero de 2011?", reverso: "Al Régimen General de la Seguridad Social" },
    { anverso: "Según el art. 3.2.f) del RDLeg 4/2000, ¿están incluidos los funcionarios de nuevo ingreso de las Comunidades Autónomas en el Régimen especial de Mutualismo Administrativo (MUFACE)?", reverso: "No, quedan excluidos de este Régimen especial y se rigen por sus normas específicas (Régimen General de la Seguridad Social)" },
    { anverso: "Según el art. 4.1 del RDLeg 4/2000, ¿quién gestiona el sistema de mutualismo administrativo?", reverso: "La Mutualidad General de Funcionarios Civiles del Estado (MUFACE), dependiente del Ministerio de Administraciones Públicas" },
    { anverso: "Según el art. 5.1 del RDLeg 4/2000, ¿qué naturaleza jurídica tiene MUFACE?", reverso: "Es un organismo público con personalidad jurídica pública diferenciada, patrimonio y tesorería propios y autonomía de gestión" },
    { anverso: "Según el art. 11 del RDLeg 4/2000, ¿qué contingencias protege el Mutualismo Administrativo?", reverso: "Necesidad de asistencia sanitaria, incapacidad temporal, incapacidad permanente, cargas familiares y la situación especial de incapacidad temporal por donación de órganos o tejidos" },
    { anverso: "Según el art. 33.1 del RDLeg 4/2000, ¿qué sistema financiero rige el Régimen especial de Seguridad Social de los Funcionarios Civiles del Estado?", reverso: "El sistema de reparto, con cuota revisable periódicamente" },
    { anverso: "Según el art. 34 del RDLeg 4/2000, ¿qué constituye los recursos económicos de MUFACE?", reverso: "Las aportaciones económicas del Estado, las cuotas de los mutualistas, las subvenciones estatales y otros recursos públicos y privados" },
    { anverso: "¿Bajo qué régimen de Seguridad Social se encuadran los funcionarios de la Administración de la Comunidad Autónoma de Aragón, como los Auxiliares Administrativos de la DGA?", reverso: "El Régimen General de la Seguridad Social, ya que MUFACE (Mutualismo Administrativo) está reservado a los funcionarios civiles del Estado" },
    { anverso: "Según el art. 3.1 del RDLeg 4/2000, ¿quiénes quedan obligatoriamente incluidos en el campo de aplicación del Régimen especial de MUFACE?", reverso: "Los funcionarios de carrera de la Administración Civil del Estado y los funcionarios en prácticas que aspiren a incorporarse a sus Cuerpos" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S4 })),
);

console.log(`📝 preguntas de test (${S4})...`);
await insertarPreguntasConOpciones(S4, [
  { enunciado: "Según el art. 2.1 del RDLeg 4/2000, ¿por qué dos mecanismos de cobertura queda integrado el Régimen especial de la Seguridad Social de los Funcionarios Civiles del Estado?", explicacion: "Por el Régimen de Clases Pasivas del Estado y por el Régimen del Mutualismo Administrativo (gestionado por MUFACE).", dificultad: "media", opciones: ["Clases Pasivas del Estado y Mutualismo Administrativo", "Régimen General y Régimen Especial de Autónomos", "Mutualismo Administrativo y Régimen Agrario", "Clases Pasivas y Régimen Especial del Mar"], correcta: 0 },
  { enunciado: "Según el art. 2.2 del RDLeg 4/2000, ¿a qué régimen quedan integrados, a efectos exclusivos de pensiones, los funcionarios de carrera de la Administración Civil del Estado que ingresaron a partir del 1 de enero de 2011?", explicacion: "Al Régimen General de la Seguridad Social, de acuerdo con el Real Decreto-ley 13/2010.", dificultad: "dificil", opciones: ["Al Régimen General de la Seguridad Social", "Al Régimen de Clases Pasivas exclusivamente", "Al Régimen Especial de Trabajadores Autónomos", "Continúan en MUFACE sin ninguna excepción"], correcta: 0 },
  { enunciado: "Según el art. 3.2.f) del RDLeg 4/2000, ¿quedan incluidos los funcionarios de nuevo ingreso de las Comunidades Autónomas en el Régimen especial de MUFACE?", explicacion: "No; quedan expresamente excluidos de este Régimen especial y se rigen por sus normas específicas, encuadrándose en el Régimen General de la Seguridad Social.", dificultad: "dificil", opciones: ["No, quedan excluidos y se rigen por el Régimen General", "Sí, obligatoriamente, como cualquier funcionario civil del Estado", "Sí, pero solo si lo solicitan expresamente", "Solo los funcionarios de subgrupo A1 quedan incluidos"], correcta: 0 },
  { enunciado: "Según el art. 4.1 del RDLeg 4/2000, ¿qué organismo gestiona y presta el sistema de mutualismo administrativo?", explicacion: "La Mutualidad General de Funcionarios Civiles del Estado (MUFACE), dependiente del Ministerio de Administraciones Públicas.", dificultad: "facil", opciones: ["La Mutualidad General de Funcionarios Civiles del Estado (MUFACE)", "El Instituto Nacional de la Seguridad Social (INSS)", "La Tesorería General de la Seguridad Social", "El Instituto Aragonés de Administración Pública (IAAP)"], correcta: 0 },
  { enunciado: "Según el art. 5.1 del RDLeg 4/2000, ¿qué naturaleza jurídica tiene la Mutualidad General de Funcionarios Civiles del Estado?", explicacion: "Es un organismo público con personalidad jurídica pública diferenciada, patrimonio y tesorería propios y autonomía de gestión.", dificultad: "media", opciones: [
    "Organismo público con personalidad jurídica pública diferenciada y autonomía de gestión",
    "Sociedad mercantil de capital íntegramente estatal",
    "Fundación del sector público sin personalidad jurídica propia",
    "Un mero servicio administrativo integrado en el Ministerio, sin personalidad jurídica",
  ], correcta: 0 },
  { enunciado: "¿Cuál de las siguientes NO es una contingencia protegida por el Mutualismo Administrativo según el art. 11 del RDLeg 4/2000?", explicacion: "El art. 11 protege la asistencia sanitaria, la incapacidad temporal, la incapacidad permanente, las cargas familiares y la situación especial de incapacidad temporal por donación de órganos. El desempleo no es una contingencia protegida por MUFACE.", dificultad: "dificil", opciones: ["El desempleo", "La necesidad de asistencia sanitaria", "La incapacidad temporal", "Las cargas familiares"], correcta: 0 },
  { enunciado: "Según el art. 33.1 del RDLeg 4/2000, ¿qué sistema financiero rige el Régimen especial de la Seguridad Social de los Funcionarios Civiles del Estado?", explicacion: "El sistema de reparto, con cuota revisable periódicamente, salvo las excepciones que puedan establecerse.", dificultad: "media", opciones: ["El sistema de reparto", "El sistema de capitalización individual pura", "Un fondo de pensiones privado obligatorio", "Un sistema mixto sin regulación legal específica"], correcta: 0 },
  { enunciado: "¿Bajo qué régimen de Seguridad Social se encuadran los funcionarios de la Administración de la Comunidad Autónoma de Aragón, como los Auxiliares Administrativos de la DGA?", explicacion: "El Régimen General de la Seguridad Social, puesto que el Mutualismo Administrativo (MUFACE) está reservado, con carácter general, a los funcionarios civiles del Estado, quedando expresamente excluidos de él los funcionarios de nuevo ingreso de las Comunidades Autónomas (art. 3.2.f RDLeg 4/2000).", dificultad: "dificil", opciones: ["El Régimen General de la Seguridad Social", "El Mutualismo Administrativo gestionado por MUFACE", "El Régimen Especial de Trabajadores Autónomos", "El Régimen Especial de la Minería del Carbón"], correcta: 0 },
]);

console.log(
  "✅ tema-31 creado (4 secciones: derechos-deberes-codigo-conducta, carrera-promocion-interna, regimen-retributivo, seguridad-social-funcionarios; 40 flashcards + 32 preguntas en total).",
);

// ─────────────────────────────────────────────────────────────────────────
// Asignación a la oposición DGA: numero 13, bloque-4 (función pública)
// ─────────────────────────────────────────────────────────────────────────
console.log("🔧 Asignando tema-31 a auxiliar-administrativo-dga (numero 13, bloque-4)...");

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
      numero: 13,
      orden: 13,
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

console.log("✅ Tema 13 de la DGA (derechos, deberes, carrera, retribuciones y seguridad social) dado de alta.");
