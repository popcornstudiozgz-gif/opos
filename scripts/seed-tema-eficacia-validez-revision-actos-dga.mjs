/**
 * Crea el tema canónico tema-35: "Eficacia y validez de los actos
 * administrativos. Revisión de los actos administrativos" y lo asigna
 * como Tema 8 de la oposición Auxiliar Administrativo DGA (bloque-2,
 * Derecho y procedimiento administrativo).
 *
 * Texto oficial del ítem 8 del programa de "materias comunes",
 * verificado esta sesión contra una página dedicada por tema
 * (vence.es/auxiliar-administrativo-aragon/temario/tema-8), consistente
 * con la numeración ya confirmada de los Temas 6 y 7 (el navegador no
 * estaba disponible esta sesión para releer directamente el PDF
 * oficial de mia.aragon.es usado en los ítems 1-15 anteriores):
 *   "Eficacia y validez de los actos administrativos: nulidad y
 *   anulabilidad. Revisión de los actos administrativos: revisión de
 *   oficio y recursos."
 *
 * Este tema es NUEVO (no un recorte del canónico tema-6/tema-8 ya
 * existentes) por el mismo motivo que el Tema 7: el programa de la DGA
 * separa "eficacia" (arts. 37-39) de "notificación" (arts. 40-46) de
 * forma distinta a como el canónico tema-6 compartido con Ayuntamiento
 * de Zaragoza y DPZ agrupa todo el Título III en tres secciones
 * (requisitos/eficacia/nulidad), y el canónico tema-8 compartido no
 * incluye la eficacia junto con la revisión, como sí exige aquí el
 * propio título del ítem de la DGA ("Eficacia y validez... Revisión").
 *
 * Cuatro secciones, todas basadas en la Ley 39/2015 (LPACAP), texto
 * consolidado leído íntegro esta sesión:
 * 1. eficacia-actos-administrativos — Título III, Cap. II, arts. 37-39
 *    (inderogabilidad singular, ejecutividad, efectos).
 * 2. nulidad-anulabilidad — Título III, Cap. III, arts. 47-52 (nulidad
 *    de pleno derecho, anulabilidad, límites a su extensión, conversión
 *    de actos viciados, conservación de actos y trámites, convalidación).
 * 3. revision-de-oficio — Título V, Cap. I, arts. 106-111 (revisión de
 *    disposiciones y actos nulos, declaración de lesividad de actos
 *    anulables, suspensión, revocación y rectificación de errores,
 *    límites de la revisión).
 * 4. recursos-administrativos — Título V, Cap. II, arts. 112-126
 *    (objeto y clases de recursos, recurso de alzada, recurso
 *    potestativo de reposición, recurso extraordinario de revisión).
 *
 * Fuente: Ley 39/2015, de 1 de octubre (BOE-A-2015-10565), texto
 * consolidado descargado de boe.es y leído íntegro (títulos preliminar
 * a VI) esta sesión.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-eficacia-validez-revision-actos-dga.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!URL_BASE || !SERVICE_KEY) {
  console.error("❌ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-35";

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
console.log("📚 Creando tema-35...");
await insertar("temas", [
  {
    slug: TEMA,
    titulo: "Eficacia y validez de los actos administrativos. Revisión de los actos administrativos",
    descripcion:
      "Eficacia de los actos administrativos: inderogabilidad singular, ejecutividad y efectos. Validez: nulidad de pleno derecho y anulabilidad, límites a su extensión, conversión, conservación y convalidación. La revisión de los actos administrativos: revisión de oficio, declaración de lesividad y recursos administrativos (alzada, reposición y extraordinario de revisión).",
    contenido:
      "Desarrolla la Ley 39/2015, de 1 de octubre, del Procedimiento Administrativo Común de las Administraciones Públicas: la eficacia de los actos administrativos (Título III, Cap. II, arts. 37-39); la nulidad de pleno derecho y la anulabilidad (Título III, Cap. III, arts. 47-52); la revisión de oficio de disposiciones y actos nulos y anulables (Título V, Cap. I, arts. 106-111); y los recursos administrativos —alzada, potestativo de reposición y extraordinario de revisión— (Título V, Cap. II, arts. 112-126).",
    enlaces_boe: [
      {
        pdf: "tema-35-ley39-2015-lpacap",
        url: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565",
        titulo: "Ley 39/2015, del Procedimiento Administrativo Común de las Administraciones Públicas",
      },
    ],
    indice_estudio: [
      {
        url: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565#a37",
        titulo: "Eficacia de los actos administrativos",
        seccion: "eficacia-actos-administrativos",
        articulos: "arts. 37-39",
      },
      {
        url: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565#a47",
        titulo: "Nulidad de pleno derecho y anulabilidad",
        seccion: "nulidad-anulabilidad",
        articulos: "arts. 47-52",
      },
      {
        url: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565#a106",
        titulo: "Revisión de oficio",
        seccion: "revision-de-oficio",
        articulos: "arts. 106-111",
      },
      {
        url: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565#a112",
        titulo: "Recursos administrativos: alzada, reposición y extraordinario de revisión",
        seccion: "recursos-administrativos",
        articulos: "arts. 112-126",
      },
    ],
  },
]);

// ─────────────────────────────────────────────────────────────────────────
// Sección 1: eficacia-actos-administrativos
// ─────────────────────────────────────────────────────────────────────────
const S1 = "eficacia-actos-administrativos";
console.log(`📝 flashcards (${S1})...`);
await insertar(
  "flashcards",
  [
    { anverso: "Según el art. 37.1 de la Ley 39/2015, ¿qué es la inderogabilidad singular?", reverso: "El principio por el que las resoluciones administrativas de carácter particular no pueden vulnerar lo establecido en una disposición de carácter general, aunque procedan de un órgano de igual o superior jerarquía al que dictó la disposición general" },
    { anverso: "Según el art. 37.2, ¿qué consecuencia tiene vulnerar lo establecido en una disposición reglamentaria mediante una resolución particular?", reverso: "La nulidad de dicha resolución administrativa" },
    { anverso: "Según el art. 38 de la Ley 39/2015, ¿cómo son los actos de las Administraciones Públicas sujetos al Derecho Administrativo?", reverso: "Ejecutivos, con arreglo a lo dispuesto en la propia Ley" },
    { anverso: "Según el art. 39.1, ¿desde cuándo se presumen válidos y producen efectos los actos administrativos?", reverso: "Desde la fecha en que se dictan, salvo que en ellos se disponga otra cosa" },
    { anverso: "Según el art. 39.2, ¿cuándo queda demorada la eficacia de un acto?", reverso: "Cuando así lo exija su contenido o esté supeditada a su notificación, publicación o aprobación superior" },
    { anverso: "Según el art. 39.3, ¿en qué dos supuestos puede otorgarse eficacia retroactiva a un acto?", reverso: "Cuando se dicte en sustitución de un acto anulado, o cuando produzca efectos favorables al interesado, siempre que los supuestos de hecho necesarios existieran ya en la fecha a que se retrotraiga y no se lesionen derechos o intereses legítimos de terceros" },
    { anverso: "Según el art. 39.4, ¿deben los órganos administrativos observar las normas y actos dictados por otros órganos en el ejercicio de su propia competencia?", reverso: "Sí, aunque no dependan jerárquicamente entre sí o pertenezcan a otra Administración" },
    { anverso: "Según el art. 39.5, ¿qué puede hacer una Administración cuando debe dictar un acto que se basa en otro dictado por Administración distinta que entiende ilegal?", reverso: "Puede requerir previamente a esa otra Administración para que anule o revise el acto y, de rechazarse el requerimiento, interponer recurso contencioso-administrativo, quedando en tanto suspendido el procedimiento" },
    { anverso: "¿Cuál de los tres artículos de la eficacia de los actos (37, 38, 39) regula específicamente la ejecutividad?", reverso: "El artículo 38: los actos de las Administraciones Públicas sujetos al Derecho Administrativo serán ejecutivos con arreglo a lo dispuesto en la Ley" },
    { anverso: "¿Bajo qué título y capítulo de la Ley 39/2015 se regula la eficacia de los actos administrativos?", reverso: "Título III (De los actos administrativos), Capítulo II (Eficacia de los actos), arts. 37 a 39" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })),
);

console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "Según el art. 37.1 de la Ley 39/2015, ¿qué establece el principio de inderogabilidad singular?", explicacion: "Que las resoluciones administrativas de carácter particular no podrán vulnerar lo establecido en una disposición de carácter general, aunque procedan de un órgano de igual o superior jerarquía al que dictó la disposición general.", dificultad: "media", opciones: [
    "Que una resolución particular no puede vulnerar una disposición general, aunque proceda de órgano superior",
    "Que las disposiciones generales no pueden ser modificadas nunca",
    "Que solo el Consejo de Ministros puede derogar reglamentos",
    "Que los actos administrativos no pueden ser recurridos individualmente",
  ], correcta: 0 },
  { enunciado: "Según el art. 37.2, ¿qué ocurre con las resoluciones administrativas que vulneren lo establecido en una disposición reglamentaria?", explicacion: "Son nulas.", dificultad: "media", opciones: ["Son nulas", "Son simplemente anulables", "Son válidas si el órgano tiene rango superior", "Quedan en suspenso hasta su convalidación"], correcta: 0 },
  { enunciado: "Según el art. 38 de la Ley 39/2015, ¿cómo son los actos de las Administraciones Públicas sujetos al Derecho Administrativo?", explicacion: "Ejecutivos, con arreglo a lo dispuesto en la Ley.", dificultad: "facil", opciones: ["Ejecutivos", "Siempre suspendidos hasta que ganen firmeza", "Solo ejecutivos si son favorables al interesado", "Nunca ejecutivos sin autorización judicial previa"], correcta: 0 },
  { enunciado: "Según el art. 39.1 de la Ley 39/2015, ¿desde cuándo producen efectos los actos administrativos, salvo que se disponga otra cosa?", explicacion: "Desde la fecha en que se dictan.", dificultad: "facil", opciones: ["Desde la fecha en que se dictan", "Desde su publicación en el diario oficial, siempre", "Desde que ganan firmeza en vía administrativa", "Desde el día siguiente a su notificación, en todo caso"], correcta: 0 },
  { enunciado: "Según el art. 39.3 de la Ley 39/2015, ¿en qué supuesto puede otorgarse excepcionalmente eficacia retroactiva a un acto?", explicacion: "Cuando se dicte en sustitución de un acto anulado, o cuando produzca efectos favorables al interesado, siempre que los supuestos de hecho ya existieran en la fecha de retroacción y no se lesionen derechos de terceros.", dificultad: "dificil", opciones: [
    "Cuando sustituya a un acto anulado o produzca efectos favorables, sin lesionar derechos de terceros",
    "Siempre que lo solicite el interesado, sin más requisitos",
    "Nunca; la retroactividad está prohibida en todo caso",
    "Solo en los procedimientos sancionadores",
  ], correcta: 0 },
  { enunciado: "Según el art. 39.4 de la Ley 39/2015, ¿deben los órganos administrativos observar los actos dictados por otros órganos en ejercicio de su propia competencia?", explicacion: "Sí, aunque no dependan jerárquicamente entre sí o pertenezcan a otra Administración.", dificultad: "media", opciones: ["Sí, aunque no dependan jerárquicamente ni pertenezcan a la misma Administración", "No, cada órgano puede ignorar los actos de otros órganos", "Solo si pertenecen a la misma Administración", "Solo si media convenio expreso entre ambos órganos"], correcta: 0 },
  { enunciado: "Según el art. 39.5 de la Ley 39/2015, si una Administración debe dictar un acto que se basa en otro de una Administración distinta que entiende ilegal, ¿qué puede hacer?", explicacion: "Puede requerir previamente a esa Administración para que anule o revise el acto y, si se rechaza, interponer recurso contencioso-administrativo, quedando suspendido el procedimiento.", dificultad: "dificil", opciones: [
    "Requerir la anulación o revisión y, si se rechaza, interponer recurso contencioso-administrativo",
    "Dictar directamente el acto ignorando el vicio detectado",
    "Anular por sí misma el acto de la otra Administración",
    "Suspender indefinidamente el procedimiento sin más trámite",
  ], correcta: 0 },
  { enunciado: "¿En qué capítulo del Título III de la Ley 39/2015 se regula la eficacia de los actos administrativos?", explicacion: "Capítulo II (arts. 37-39).", dificultad: "facil", opciones: ["Capítulo II", "Capítulo I", "Capítulo III", "Capítulo IV"], correcta: 0 },
]);

// ─────────────────────────────────────────────────────────────────────────
// Sección 2: nulidad-anulabilidad
// ─────────────────────────────────────────────────────────────────────────
const S2 = "nulidad-anulabilidad";
console.log(`📝 flashcards (${S2})...`);
await insertar(
  "flashcards",
  [
    { anverso: "Según el art. 47.1 de la Ley 39/2015, cita tres causas de nulidad de pleno derecho de los actos administrativos", reverso: "Los que lesionen derechos y libertades susceptibles de amparo constitucional; los dictados por órgano manifiestamente incompetente por razón de la materia o del territorio; y los que tengan un contenido imposible (también: los constitutivos de infracción penal, los dictados prescindiendo total y absolutamente del procedimiento, y los que adquieren facultades/derechos sin los requisitos esenciales)" },
    { anverso: "Según el art. 47.2, ¿qué disposiciones administrativas son nulas de pleno derecho?", reverso: "Las que vulneren la Constitución, las leyes u otras disposiciones de rango superior, las que regulen materias reservadas a la Ley, y las que establezcan la retroactividad de disposiciones sancionadoras no favorables o restrictivas de derechos individuales" },
    { anverso: "Según el art. 48.1, ¿qué actos son anulables?", reverso: "Los actos de la Administración que incurran en cualquier infracción del ordenamiento jurídico, incluso la desviación de poder" },
    { anverso: "Según el art. 48.2, ¿cuándo determina anulabilidad el defecto de forma de un acto?", reverso: "Solo cuando el acto carezca de los requisitos formales indispensables para alcanzar su fin o dé lugar a la indefensión de los interesados" },
    { anverso: "Según el art. 49.1, ¿afecta la nulidad o anulabilidad de un acto a los actos sucesivos del procedimiento?", reverso: "No, si estos son independientes del acto viciado" },
    { anverso: "Según el art. 50 de la Ley 39/2015, ¿qué es la conversión de actos viciados?", reverso: "El efecto por el cual los actos nulos o anulables que contengan los elementos constitutivos de otro acto distinto producirán los efectos de este otro acto" },
    { anverso: "Según el art. 51, ¿qué es la conservación de actos y trámites?", reverso: "La disposición por la que el órgano que declare la nulidad o anule las actuaciones dispondrá siempre mantener aquellos actos y trámites cuyo contenido hubiera sido el mismo de no haberse cometido la infracción" },
    { anverso: "Según el art. 52.1, ¿qué es la convalidación?", reverso: "La facultad de la Administración de convalidar los actos anulables, subsanando los vicios de que adolezcan" },
    { anverso: "Según el art. 52.3, ¿quién puede convalidar un vicio de incompetencia no determinante de nulidad?", reverso: "El órgano competente cuando sea superior jerárquico del que dictó el acto viciado" },
    { anverso: "Según el art. 52.4, si el vicio consiste en la falta de una autorización, ¿cómo puede convalidarse el acto?", reverso: "Mediante el otorgamiento de la autorización faltante por el órgano competente" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })),
);

console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "Según el art. 47.1 de la Ley 39/2015, ¿cuál de los siguientes actos es nulo de pleno derecho?", explicacion: "Los dictados por órgano manifiestamente incompetente por razón de la materia o del territorio son nulos de pleno derecho.", dificultad: "media", opciones: ["Los dictados por órgano manifiestamente incompetente por razón de la materia o del territorio", "Los que incurran en un simple error de cálculo aritmético", "Los que se aparten de un dictamen no vinculante", "Los que incumplan un plazo de tramitación no esencial"], correcta: 0 },
  { enunciado: "Según el art. 47.1, ¿cuáles de estos actos son nulos de pleno derecho por prescindir del procedimiento?", explicacion: "Los dictados prescindiendo total y absolutamente del procedimiento legalmente establecido, o de las reglas esenciales para la formación de la voluntad de los órganos colegiados.", dificultad: "dificil", opciones: [
    "Los dictados prescindiendo total y absolutamente del procedimiento legalmente establecido",
    "Los dictados con un simple retraso respecto al plazo previsto",
    "Los dictados sin haber recabado un informe facultativo no preceptivo",
    "Los dictados sin citar expresamente la norma aplicable, aunque esta se aplique correctamente",
  ], correcta: 0 },
  { enunciado: "Según el art. 47.2 de la Ley 39/2015, ¿cuál de las siguientes disposiciones administrativas es nula de pleno derecho?", explicacion: "Las que regulen materias reservadas a la Ley son nulas de pleno derecho.", dificultad: "media", opciones: ["Las que regulen materias reservadas a la Ley", "Las que desarrollen aspectos organizativos internos", "Las que fijen plazos de tramitación de un procedimiento", "Las que sean posteriores a la ley que desarrollan"], correcta: 0 },
  { enunciado: "Según el art. 48.1 de la Ley 39/2015, ¿qué actos son anulables?", explicacion: "Los actos de la Administración que incurran en cualquier infracción del ordenamiento jurídico, incluso la desviación de poder.", dificultad: "media", opciones: ["Los que incurran en cualquier infracción del ordenamiento jurídico, incluida la desviación de poder", "Únicamente los que carezcan totalmente de motivación", "Solo los dictados por órganos colegiados", "Únicamente los actos de trámite no cualificados"], correcta: 0 },
  { enunciado: "Según el art. 48.2 de la Ley 39/2015, ¿cuándo determina anulabilidad el defecto de forma de un acto?", explicacion: "Solo cuando el acto carezca de los requisitos formales indispensables para alcanzar su fin o dé lugar a indefensión de los interesados.", dificultad: "dificil", opciones: [
    "Solo si el acto carece de requisitos formales indispensables o causa indefensión",
    "Siempre, cualquier defecto de forma determina anulabilidad",
    "Nunca, el defecto de forma es irrelevante en derecho administrativo",
    "Solo si el defecto de forma es alegado por un tercero ajeno al procedimiento",
  ], correcta: 0 },
  { enunciado: "Según el art. 50 de la Ley 39/2015, ¿en qué consiste la conversión de actos viciados?", explicacion: "Los actos nulos o anulables que contengan los elementos constitutivos de otro acto distinto producirán los efectos de este.", dificultad: "media", opciones: [
    "Los actos viciados que contengan elementos de otro acto distinto producen los efectos de este",
    "La transformación automática de todo acto anulable en un acto nulo",
    "La sustitución del acto viciado por silencio administrativo",
    "La anulación retroactiva de todos los trámites del procedimiento",
  ], correcta: 0 },
  { enunciado: "Según el art. 51 de la Ley 39/2015, ¿qué dispone el órgano que declara la nulidad o anula unas actuaciones respecto de los actos y trámites cuyo contenido se hubiera mantenido igual de no haberse cometido la infracción?", explicacion: "Su conservación.", dificultad: "media", opciones: ["Su conservación", "Su anulación automática junto con el resto", "Su remisión al Consejo de Estado para dictamen", "Su archivo provisional hasta nueva resolución"], correcta: 0 },
  { enunciado: "Según el art. 52.3 de la Ley 39/2015, si el vicio de un acto consiste en incompetencia no determinante de nulidad, ¿quién puede convalidarlo?", explicacion: "El órgano competente, cuando sea superior jerárquico del que dictó el acto viciado.", dificultad: "dificil", opciones: ["El órgano competente que sea superior jerárquico del que dictó el acto", "Cualquier órgano de la misma Administración, sin más requisito", "Únicamente el propio órgano que cometió el vicio", "El Consejo de Estado exclusivamente"], correcta: 0 },
]);

// ─────────────────────────────────────────────────────────────────────────
// Sección 3: revision-de-oficio
// ─────────────────────────────────────────────────────────────────────────
const S3 = "revision-de-oficio";
console.log(`📝 flashcards (${S3})...`);
await insertar(
  "flashcards",
  [
    { anverso: "Según el art. 106.1 de la Ley 39/2015, ¿qué requisito previo exige la revisión de oficio de actos nulos que hayan puesto fin a la vía administrativa?", reverso: "El dictamen favorable del Consejo de Estado u órgano consultivo equivalente de la Comunidad Autónoma, si lo hubiere" },
    { anverso: "Según el art. 106.5, si el procedimiento de revisión de oficio se inicia de oficio, ¿qué ocurre si transcurren 6 meses sin resolución?", reverso: "Se produce la caducidad del procedimiento" },
    { anverso: "Según el art. 107.1 de la Ley 39/2015, ¿cómo pueden las Administraciones impugnar sus propios actos favorables anulables?", reverso: "Ante el orden jurisdiccional contencioso-administrativo, previa su declaración de lesividad para el interés público" },
    { anverso: "Según el art. 107.2, ¿cuál es el plazo máximo para adoptar la declaración de lesividad?", reverso: "Cuatro años desde que se dictó el acto administrativo, y exige la previa audiencia de cuantos aparezcan como interesados" },
    { anverso: "Según el art. 108 de la Ley 39/2015, iniciado un procedimiento de revisión de oficio, ¿puede suspenderse la ejecución del acto?", reverso: "Sí, el órgano competente para declarar la nulidad o lesividad puede suspenderla cuando pudiera causar perjuicios de imposible o difícil reparación" },
    { anverso: "Según el art. 109.1 de la Ley 39/2015, ¿pueden las Administraciones revocar sus actos de gravamen o desfavorables?", reverso: "Sí, mientras no haya transcurrido el plazo de prescripción, siempre que la revocación no constituya dispensa/exención no permitida ni sea contraria al principio de igualdad, al interés público o al ordenamiento jurídico" },
    { anverso: "Según el art. 109.2, ¿qué pueden rectificar las Administraciones en cualquier momento, de oficio o a instancia de interesado?", reverso: "Los errores materiales, de hecho o aritméticos existentes en sus actos" },
    { anverso: "Según el art. 110 de la Ley 39/2015, ¿cuándo no pueden ejercerse las facultades de revisión de oficio?", reverso: "Cuando por prescripción de acciones, por el tiempo transcurrido o por otras circunstancias, su ejercicio resulte contrario a la equidad, a la buena fe, al derecho de los particulares o a las leyes" },
    { anverso: "Según el art. 111 de la Ley 39/2015, en el ámbito estatal, ¿quién es competente para revisar de oficio los actos y disposiciones dictados por los Ministros?", reverso: "El Consejo de Ministros" },
    { anverso: "¿En qué capítulo y título de la Ley 39/2015 se regula la revisión de oficio?", reverso: "Título V (De la revisión de los actos en vía administrativa), Capítulo I (Revisión de oficio), arts. 106 a 111" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })),
);

console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "Según el art. 106.1 de la Ley 39/2015, ¿qué requisito exige la Administración para declarar de oficio la nulidad de un acto que puso fin a la vía administrativa?", explicacion: "El previo dictamen favorable del Consejo de Estado u órgano consultivo equivalente de la Comunidad Autónoma, si lo hubiere.", dificultad: "media", opciones: ["Dictamen favorable del Consejo de Estado u órgano consultivo equivalente", "La conformidad expresa del interesado beneficiado por el acto", "Una sentencia judicial previa que declare la nulidad", "La aprobación de las Cortes Generales"], correcta: 0 },
  { enunciado: "Según el art. 106.5 de la Ley 39/2015, cuando el procedimiento de revisión de oficio se inicia de oficio, ¿qué ocurre si transcurren seis meses sin dictarse resolución?", explicacion: "Se produce la caducidad del procedimiento.", dificultad: "media", opciones: ["Se produce la caducidad del procedimiento", "Se entiende estimada la nulidad por silencio positivo", "El procedimiento se prorroga automáticamente otros seis meses", "El acto queda anulado de pleno derecho automáticamente"], correcta: 0 },
  { enunciado: "Según el art. 107.1 de la Ley 39/2015, ¿cómo puede una Administración impugnar sus propios actos favorables que sean anulables?", explicacion: "Ante el orden jurisdiccional contencioso-administrativo, previa declaración de lesividad para el interés público.", dificultad: "media", opciones: [
    "Ante el orden contencioso-administrativo, previa declaración de lesividad",
    "Mediante revocación directa, sin más trámite",
    "Mediante recurso de alzada ante sí misma",
    "Nunca puede impugnar actos favorables ya dictados",
  ], correcta: 0 },
  { enunciado: "Según el art. 107.2 de la Ley 39/2015, ¿cuál es el plazo máximo para adoptar la declaración de lesividad?", explicacion: "Cuatro años desde que se dictó el acto administrativo.", dificultad: "dificil", opciones: ["Cuatro años", "Un año", "Seis meses", "Dos años"], correcta: 0 },
  { enunciado: "Según el art. 109.1 de la Ley 39/2015, ¿pueden las Administraciones revocar sus actos de gravamen o desfavorables?", explicacion: "Sí, mientras no haya transcurrido el plazo de prescripción, siempre que la revocación no constituya dispensa no permitida ni sea contraria al principio de igualdad, al interés público o al ordenamiento jurídico.", dificultad: "media", opciones: [
    "Sí, mientras no haya prescrito y no sea contraria a la igualdad, interés público u ordenamiento",
    "No, los actos desfavorables son irrevocables por definición",
    "Solo si lo solicita el interesado perjudicado, nunca de oficio",
    "Solo mediante sentencia judicial firme previa",
  ], correcta: 0 },
  { enunciado: "Según el art. 109.2 de la Ley 39/2015, ¿qué pueden rectificar las Administraciones en cualquier momento?", explicacion: "Los errores materiales, de hecho o aritméticos existentes en sus actos.", dificultad: "facil", opciones: ["Los errores materiales, de hecho o aritméticos", "Cualquier defecto de fondo del acto, sin límite temporal", "Solo los errores detectados por el interesado", "Únicamente errores tipográficos en el nombre del firmante"], correcta: 0 },
  { enunciado: "Según el art. 110 de la Ley 39/2015, ¿cuándo no pueden ejercerse las facultades de revisión de oficio?", explicacion: "Cuando, por prescripción, por el tiempo transcurrido o por otras circunstancias, su ejercicio resulte contrario a la equidad, la buena fe, el derecho de los particulares o las leyes.", dificultad: "dificil", opciones: [
    "Cuando resulte contrario a la equidad, la buena fe, el derecho de los particulares o las leyes",
    "Nunca hay límites a la revisión de oficio",
    "Solo cuando lo solicite expresamente el interesado afectado",
    "Únicamente si ha transcurrido más de un siglo desde el acto",
  ], correcta: 0 },
  { enunciado: "Según el art. 111 de la Ley 39/2015, en el ámbito de la Administración General del Estado, ¿quién es competente para la revisión de oficio de los actos y disposiciones dictados por los Ministros?", explicacion: "El Consejo de Ministros, respecto de sus propios actos y de los dictados por los Ministros.", dificultad: "dificil", opciones: ["El Consejo de Ministros", "El propio Ministro afectado", "El Consejo de Estado directamente", "Los Secretarios de Estado"], correcta: 0 },
]);

// ─────────────────────────────────────────────────────────────────────────
// Sección 4: recursos-administrativos
// ─────────────────────────────────────────────────────────────────────────
const S4 = "recursos-administrativos";
console.log(`📝 flashcards (${S4})...`);
await insertar(
  "flashcards",
  [
    { anverso: "Según el art. 112.1 de la Ley 39/2015, ¿en qué motivos pueden fundarse los recursos de alzada y potestativo de reposición?", reverso: "En cualquiera de los motivos de nulidad o anulabilidad previstos en los arts. 47 y 48 de la Ley" },
    { anverso: "Según el art. 112.3, ¿cabe recurso en vía administrativa contra las disposiciones administrativas de carácter general?", reverso: "No; contra ellas no cabrá recurso administrativo" },
    { anverso: "Según el art. 121.1 de la Ley 39/2015, ¿ante qué órgano se recurre en alzada?", reverso: "Ante el órgano superior jerárquico del que dictó el acto, cuando este no ponga fin a la vía administrativa" },
    { anverso: "Según el art. 122.1, ¿cuál es el plazo para interponer el recurso de alzada si el acto es expreso?", reverso: "Un mes; transcurrido sin haberse interpuesto, la resolución será firme a todos los efectos" },
    { anverso: "Según el art. 122.2, ¿cuál es el plazo máximo para dictar y notificar la resolución de un recurso de alzada?", reverso: "Tres meses; transcurrido sin resolución, se podrá entender desestimado" },
    { anverso: "Según el art. 123.1 de la Ley 39/2015, ¿qué carácter tiene el recurso de reposición y ante qué órgano se interpone?", reverso: "Carácter potestativo; se interpone ante el mismo órgano que dictó el acto que puso fin a la vía administrativa, o puede impugnarse directamente ante el orden jurisdiccional contencioso-administrativo" },
    { anverso: "Según el art. 124.1 y 124.2, ¿cuáles son los plazos para interponer y resolver el recurso de reposición?", reverso: "Un mes para interponerlo (si el acto es expreso) y un mes máximo para dictar y notificar la resolución" },
    { anverso: "Según el art. 125.1 de la Ley 39/2015, ¿contra qué actos procede el recurso extraordinario de revisión?", reverso: "Contra los actos firmes en vía administrativa, cuando concurra alguna de las circunstancias tasadas en la ley (error de hecho, documentos de valor esencial aparecidos después, documentos/testimonios declarados falsos, o resolución dictada por prevaricación u otra conducta punible)" },
    { anverso: "Según el art. 125.2, ¿cuál es el plazo para interponer el recurso extraordinario de revisión por error de hecho?", reverso: "Cuatro años desde la notificación de la resolución impugnada (en los demás casos, tres meses desde el conocimiento de los documentos o desde que quedó firme la sentencia)" },
    { anverso: "Según el art. 116 de la Ley 39/2015, cita dos causas de inadmisión de un recurso administrativo", reverso: "Ser incompetente el órgano administrativo (cuando el competente pertenezca a otra Administración), y carecer de legitimación el recurrente (también: tratarse de acto no susceptible de recurso, haber transcurrido el plazo, o carecer manifiestamente de fundamento)" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S4 })),
);

console.log(`📝 preguntas de test (${S4})...`);
await insertarPreguntasConOpciones(S4, [
  { enunciado: "Según el art. 112.1 de la Ley 39/2015, ¿en qué motivos pueden fundarse los recursos de alzada y potestativo de reposición?", explicacion: "En cualquiera de los motivos de nulidad o anulabilidad previstos en los arts. 47 y 48 de la Ley.", dificultad: "media", opciones: ["En los motivos de nulidad o anulabilidad de los arts. 47 y 48", "Únicamente en defectos de forma", "Solo en la falta de motivación del acto", "Exclusivamente en la incompetencia territorial"], correcta: 0 },
  { enunciado: "Según el art. 121.1 de la Ley 39/2015, ¿ante qué órgano se recurre en alzada un acto que no pone fin a la vía administrativa?", explicacion: "Ante el órgano superior jerárquico del que dictó el acto.", dificultad: "facil", opciones: ["Ante el órgano superior jerárquico del que dictó el acto", "Ante el mismo órgano que dictó el acto", "Ante el Consejo de Estado directamente", "Ante el orden jurisdiccional contencioso-administrativo directamente"], correcta: 0 },
  { enunciado: "Según el art. 122.1 de la Ley 39/2015, ¿cuál es el plazo para interponer un recurso de alzada contra un acto expreso?", explicacion: "Un mes; transcurrido dicho plazo sin interponerse el recurso, la resolución será firme a todos los efectos.", dificultad: "facil", opciones: ["Un mes", "Quince días", "Dos meses", "Tres meses"], correcta: 0 },
  { enunciado: "Según el art. 122.2 de la Ley 39/2015, ¿cuál es el plazo máximo para dictar y notificar la resolución de un recurso de alzada?", explicacion: "Tres meses; transcurrido sin resolución expresa, se puede entender desestimado.", dificultad: "media", opciones: ["Tres meses", "Un mes", "Seis meses", "Quince días"], correcta: 0 },
  { enunciado: "Según el art. 123.1 de la Ley 39/2015, ¿qué carácter tiene el recurso de reposición?", explicacion: "Carácter potestativo: los actos que pongan fin a la vía administrativa pueden recurrirse potestativamente en reposición o impugnarse directamente ante lo contencioso-administrativo.", dificultad: "media", opciones: ["Potestativo", "Obligatorio en todo caso antes de acudir a la vía judicial", "Solo cabe si lo autoriza expresamente una ley especial", "Es incompatible con el recurso contencioso-administrativo"], correcta: 0 },
  { enunciado: "Según los arts. 124.1 y 124.2 de la Ley 39/2015, ¿cuáles son los plazos de interposición y resolución del recurso de reposición?", explicacion: "Un mes para interponerlo (acto expreso) y un mes máximo para dictar y notificar la resolución.", dificultad: "media", opciones: ["Un mes para interponer y un mes para resolver", "Quince días para interponer y tres meses para resolver", "Dos meses para interponer y dos meses para resolver", "Un mes para interponer y tres meses para resolver"], correcta: 0 },
  { enunciado: "Según el art. 125.1 de la Ley 39/2015, ¿contra qué tipo de actos procede el recurso extraordinario de revisión?", explicacion: "Contra los actos firmes en vía administrativa, cuando concurra alguna de las circunstancias tasadas por la ley.", dificultad: "media", opciones: ["Contra los actos firmes en vía administrativa, por causas tasadas", "Contra cualquier acto de trámite no definitivo", "Contra las disposiciones de carácter general", "Contra actos que aún admiten recurso de alzada"], correcta: 0 },
  { enunciado: "Según el art. 116 de la Ley 39/2015, ¿cuál de las siguientes es causa de inadmisión de un recurso administrativo?", explicacion: "Carecer de legitimación el recurrente es una de las causas de inadmisión tasadas en el art. 116.", dificultad: "media", opciones: ["Carecer de legitimación el recurrente", "Que el recurso esté motivado de forma extensa", "Que el recurrente sea una persona jurídica", "Que el recurso se presente por vía electrónica"], correcta: 0 },
]);

console.log(
  "✅ tema-35 creado (4 secciones: eficacia-actos-administrativos, nulidad-anulabilidad, revision-de-oficio, recursos-administrativos; 40 flashcards + 32 preguntas en total).",
);

// ─────────────────────────────────────────────────────────────────────────
// Asignación a la oposición DGA: numero 8, bloque-2 (Derecho y procedimiento administrativo)
// ─────────────────────────────────────────────────────────────────────────
console.log("🔧 Asignando tema-35 a auxiliar-administrativo-dga (numero 8, bloque-2)...");

const bloqueRes = await fetch(
  `${URL_BASE}/rest/v1/bloques?oposicion_slug=eq.auxiliar-administrativo-dga&slug=eq.bloque-2&select=id`,
  { headers: HEADERS },
);
const [bloque2] = await bloqueRes.json();
if (!bloque2) {
  console.error("❌ No se encontró bloque-2 para auxiliar-administrativo-dga.");
  process.exit(1);
}

const asignacionRes = await fetch(`${URL_BASE}/rest/v1/tema_oposicion`, {
  method: "POST",
  headers: { ...HEADERS, Prefer: "return=representation" },
  body: JSON.stringify([
    {
      tema_slug: TEMA,
      oposicion_slug: "auxiliar-administrativo-dga",
      bloque_id: bloque2.id,
      numero: 8,
      orden: 8,
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

console.log("✅ Tema 8 de la DGA (eficacia, validez y revisión de los actos administrativos) dado de alta.");
