/**
 * Crea el tema canónico tema-34: "Las disposiciones administrativas, el
 * acto administrativo y el procedimiento administrativo" y lo asigna
 * como Tema 7 de la oposición Auxiliar Administrativo DGA (bloque-2,
 * Derecho y procedimiento administrativo).
 *
 * Texto oficial del ítem 7 del programa de "materias comunes",
 * verificado esta sesión contra una página dedicada por tema
 * (vence.es/auxiliar-administrativo-aragon/temario/tema-7), cuya
 * numeración se contrastó y confirmó por continuidad con el Tema 6 ya
 * verificado en sesiones anteriores ("La actividad de las
 * Administraciones Públicas" = tema-5, bloque-2, numero=6): el
 * navegador no estaba disponible esta sesión para releer directamente
 * el PDF oficial de mia.aragon.es usado en los ítems 1-15 anteriores.
 *   "Las disposiciones administrativas. El acto administrativo:
 *   concepto, elementos y clases. Su motivación y notificación.
 *   Notificación electrónica. El procedimiento administrativo. Sujetos
 *   obligados a relacionarse electrónicamente con la Administración.
 *   Identificación y firma de los interesados. Representación."
 *
 * Este tema es deliberadamente NUEVO (no un recorte de los canónicos
 * tema-4/tema-6/tema-7/tema-27 ya existentes) porque el programa de la
 * DGA agrupa estos contenidos de forma distinta a como los reparten
 * Ayuntamiento de Zaragoza y DPZ entre varios temas separados y más
 * detallados (p. ej. su "Los actos administrativos" cubre íntegro el
 * Título III, incluida la eficacia general de los arts. 37-39, que en
 * la DGA pertenece en cambio al Tema 8). Repartir aquí las secciones
 * de los canónicos compartidos habría dejado, o bien huecos (falta de
 * "notificación" si solo se toma el Cap. I), o bien contenido no
 * pedido por este ítem (eficacia general si se toma el Cap. II
 * completo). Se construye por ello contenido nuevo, con cita exacta de
 * artículo en cada flashcard/pregunta, para servir con precisión al
 * recorte real de la DGA.
 *
 * Cuatro secciones, todas basadas en la Ley 39/2015 (LPACAP), texto
 * consolidado leído íntegro esta sesión:
 * 1. disposiciones-administrativas-reglamentos — Título VI (arts.
 *    128-131): potestad reglamentaria, jerarquía normativa, principios
 *    de buena regulación, publicidad de las normas; más arts. 47.2 y
 *    112.3 sobre nulidad e irrecurribilidad de las disposiciones
 *    generales.
 * 2. acto-administrativo-concepto-elementos-clases-motivacion —
 *    Título III, Cap. I (arts. 34-36): producción y contenido,
 *    motivación, forma.
 * 3. notificacion-notificacion-electronica — Título III, Cap. II,
 *    arts. 40-46 (notificación, condiciones generales, práctica en
 *    papel y electrónica, notificación infructuosa, publicación).
 * 4. procedimiento-sujetos-electronicos-identificacion-representacion
 *    — art. 54 (clases de iniciación del procedimiento), Título I
 *    Cap. I (arts. 5-6: representación, registro de apoderamientos),
 *    Cap. II (arts. 9, 11: identificación y firma) y art. 14 (sujetos
 *    obligados a relacionarse electrónicamente).
 *
 * Fuente: Ley 39/2015, de 1 de octubre (BOE-A-2015-10565), texto
 * consolidado descargado de boe.es y leído íntegro (títulos preliminar
 * a VI) esta sesión.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-disposiciones-acto-administrativo-dga.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!URL_BASE || !SERVICE_KEY) {
  console.error("❌ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-34";

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
console.log("📚 Creando tema-34...");
await insertar("temas", [
  {
    slug: TEMA,
    titulo: "Las disposiciones administrativas, el acto administrativo y el procedimiento administrativo",
    descripcion:
      "Las disposiciones administrativas: potestad reglamentaria y jerarquía normativa. El acto administrativo: concepto, elementos y clases; su motivación y notificación, incluida la notificación electrónica. El procedimiento administrativo: sujetos obligados a relacionarse electrónicamente con la Administración, identificación y firma de los interesados, y representación.",
    contenido:
      "Desarrolla la Ley 39/2015, de 1 de octubre, del Procedimiento Administrativo Común de las Administraciones Públicas: la potestad reglamentaria y la jerarquía de las disposiciones administrativas (Título VI); los requisitos del acto administrativo —producción, motivación y forma— (Título III, Cap. I); el régimen de las notificaciones, en papel y electrónicas (Título III, Cap. II, arts. 40-46); y, dentro del procedimiento administrativo, la representación de los interesados, su identificación y firma, y los sujetos obligados a relacionarse electrónicamente con la Administración (Título I).",
    enlaces_boe: [
      {
        pdf: "tema-34-ley39-2015-lpacap",
        url: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565",
        titulo: "Ley 39/2015, del Procedimiento Administrativo Común de las Administraciones Públicas",
      },
    ],
    indice_estudio: [
      {
        url: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565#a128",
        titulo: "Las disposiciones administrativas: potestad reglamentaria y jerarquía normativa",
        seccion: "disposiciones-administrativas-reglamentos",
        articulos: "arts. 128-131, 47.2, 112.3",
      },
      {
        url: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565#a34",
        titulo: "El acto administrativo: concepto, elementos, clases y motivación",
        seccion: "acto-administrativo-concepto-elementos-clases-motivacion",
        articulos: "arts. 34-36",
      },
      {
        url: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565#a40",
        titulo: "La notificación y la notificación electrónica",
        seccion: "notificacion-notificacion-electronica",
        articulos: "arts. 40-46",
      },
      {
        url: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565#a54",
        titulo: "El procedimiento administrativo: sujetos obligados a relacionarse electrónicamente, identificación, firma y representación",
        seccion: "procedimiento-sujetos-electronicos-identificacion-representacion",
        articulos: "arts. 5-6, 9, 11, 14, 54",
      },
    ],
  },
]);

// ─────────────────────────────────────────────────────────────────────────
// Sección 1: disposiciones-administrativas-reglamentos
// ─────────────────────────────────────────────────────────────────────────
const S1 = "disposiciones-administrativas-reglamentos";
console.log(`📝 flashcards (${S1})...`);
await insertar(
  "flashcards",
  [
    { anverso: "Según el art. 128.1 de la Ley 39/2015, ¿a quién corresponde el ejercicio de la potestad reglamentaria?", reverso: "Al Gobierno de la Nación, a los órganos de Gobierno de las Comunidades Autónomas y a los órganos de gobierno locales" },
    { anverso: "Según el art. 128.2, ¿qué materias NO pueden regular los reglamentos?", reverso: "Aquellas que la Constitución o los Estatutos de Autonomía reconocen de la competencia de las Cortes Generales o Asambleas Legislativas; tampoco pueden tipificar delitos, faltas o infracciones administrativas, ni establecer penas, sanciones o tributos" },
    { anverso: "Según el art. 128.3, ¿qué principio rige el orden de las disposiciones administrativas?", reverso: "El principio de jerarquía normativa: ninguna disposición administrativa podrá vulnerar los preceptos de otra de rango superior" },
    { anverso: "Según el art. 129.1, ¿con arreglo a qué principios deben actuar las Administraciones al ejercer la potestad reglamentaria?", reverso: "Necesidad, eficacia, proporcionalidad, seguridad jurídica, transparencia y eficiencia" },
    { anverso: "Según el art. 129.2, ¿en qué se traduce el principio de necesidad y eficacia?", reverso: "La iniciativa normativa debe estar justificada por una razón de interés general, basarse en una identificación clara de los fines perseguidos y ser el instrumento más adecuado para garantizarlos" },
    { anverso: "Según el art. 129.3, ¿qué exige el principio de proporcionalidad?", reverso: "Que la iniciativa contenga la regulación imprescindible para atender la necesidad a cubrir, tras constatar que no existen medidas menos restrictivas de derechos o que impongan menos obligaciones" },
    { anverso: "Según el art. 131, ¿dónde deben publicarse las normas con rango de ley, los reglamentos y las disposiciones administrativas?", reverso: "En el diario oficial correspondiente, requisito necesario para que entren en vigor y produzcan efectos jurídicos" },
    { anverso: "Según el art. 47.2 de la Ley 39/2015, ¿cuándo son nulas de pleno derecho las disposiciones administrativas?", reverso: "Cuando vulneren la Constitución, las leyes u otras disposiciones administrativas de rango superior, regulen materias reservadas a la Ley, o establezcan la retroactividad de disposiciones sancionadoras no favorables o restrictivas de derechos individuales" },
    { anverso: "Según el art. 112.3, ¿cabe recurso administrativo contra las disposiciones administrativas de carácter general?", reverso: "No; contra ellas no cabrá recurso en vía administrativa (los recursos contra un acto que se funden solo en la nulidad de una disposición general podrán interponerse directamente ante el órgano que la dictó)" },
    { anverso: "¿Qué diferencia esencial existe entre una disposición general (reglamento) y un acto administrativo?", reverso: "La disposición general innova el ordenamiento jurídico con vocación de permanencia, aplicándose indefinidamente a una pluralidad de casos, mientras que el acto administrativo aplica el ordenamiento a un caso concreto y se agota con su cumplimiento" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })),
);

console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "Según el art. 128.1 de la Ley 39/2015, ¿a quién corresponde el ejercicio de la potestad reglamentaria?", explicacion: "Al Gobierno de la Nación, a los órganos de Gobierno de las Comunidades Autónomas y a los órganos de gobierno locales.", dificultad: "facil", opciones: ["Al Gobierno de la Nación, a los órganos de gobierno de las CCAA y a los locales", "Exclusivamente al Gobierno de la Nación", "A las Cortes Generales", "A los tribunales de justicia"], correcta: 0 },
  { enunciado: "Según el art. 128.2, ¿cuál de las siguientes materias NO puede regular un reglamento?", explicacion: "Los reglamentos no pueden tipificar delitos, faltas o infracciones administrativas, ni establecer penas, sanciones, tributos, exacciones parafiscales u otras cargas de carácter público.", dificultad: "media", opciones: ["Tipificar infracciones administrativas y establecer sanciones", "Desarrollar aspectos organizativos de un departamento", "Precisar el procedimiento de tramitación de una ayuda", "Regular horarios de atención al público"], correcta: 0 },
  { enunciado: "¿Qué principio establece el art. 128.3 de la Ley 39/2015 respecto al orden de las disposiciones administrativas?", explicacion: "El principio de jerarquía normativa: ninguna disposición administrativa podrá vulnerar los preceptos de otra de rango superior.", dificultad: "facil", opciones: ["El principio de jerarquía normativa", "El principio de competencia exclusiva", "El principio de reserva de ley", "El principio de irretroactividad absoluta"], correcta: 0 },
  { enunciado: "¿Cuáles son los principios de buena regulación enumerados en el art. 129.1 de la Ley 39/2015?", explicacion: "Necesidad, eficacia, proporcionalidad, seguridad jurídica, transparencia y eficiencia.", dificultad: "media", opciones: ["Necesidad, eficacia, proporcionalidad, seguridad jurídica, transparencia y eficiencia", "Legalidad, jerarquía, competencia y publicidad", "Eficacia, economía, celeridad y buena fe", "Transparencia, participación, rendición de cuentas y accesibilidad"], correcta: 0 },
  { enunciado: "Según el art. 131 de la Ley 39/2015, ¿qué requisito deben cumplir las normas con rango de ley, los reglamentos y las disposiciones administrativas para entrar en vigor?", explicacion: "Deben publicarse en el diario oficial correspondiente.", dificultad: "facil", opciones: ["Publicarse en el diario oficial correspondiente", "Ser notificadas individualmente a cada ciudadano", "Ser sometidas a referéndum", "Ser ratificadas por el Consejo de Estado"], correcta: 0 },
  { enunciado: "Según el art. 47.2 de la Ley 39/2015, ¿cuándo son nulas de pleno derecho las disposiciones administrativas?", explicacion: "Cuando vulneren la Constitución, las leyes u otras disposiciones de rango superior, regulen materias reservadas a la Ley, o establezcan la retroactividad de disposiciones sancionadoras no favorables o restrictivas de derechos individuales.", dificultad: "dificil", opciones: [
    "Cuando vulneren normas de rango superior, materias reservadas a ley, o establezcan retroactividad sancionadora desfavorable",
    "Cuando no hayan sido informadas por el Consejo de Estado",
    "Cuando su tramitación haya excedido el plazo de un año",
    "Cuando no incluyan una memoria económica",
  ], correcta: 0 },
  { enunciado: "Según el art. 112.3 de la Ley 39/2015, ¿cabe recurso administrativo contra las disposiciones administrativas de carácter general?", explicacion: "No cabe recurso en vía administrativa contra las disposiciones de carácter general.", dificultad: "media", opciones: ["No cabe recurso en vía administrativa", "Cabe recurso de alzada en todo caso", "Cabe recurso de reposición únicamente", "Cabe recurso extraordinario de revisión únicamente"], correcta: 0 },
  { enunciado: "¿Cuál es la diferencia esencial entre una disposición general (reglamento) y un acto administrativo?", explicacion: "La disposición general innova el ordenamiento jurídico con vocación de permanencia y se aplica a una pluralidad indeterminada de casos; el acto administrativo aplica el ordenamiento a un caso concreto y se agota con su cumplimiento.", dificultad: "media", opciones: [
    "La disposición general innova el ordenamiento con vocación de permanencia; el acto aplica ese ordenamiento a un caso concreto",
    "Ambos tienen exactamente el mismo régimen jurídico y de recursos",
    "El acto administrativo siempre tiene rango superior al reglamento",
    "Solo la disposición general puede ser objeto de notificación",
  ], correcta: 0 },
]);

// ─────────────────────────────────────────────────────────────────────────
// Sección 2: acto-administrativo-concepto-elementos-clases-motivacion
// ─────────────────────────────────────────────────────────────────────────
const S2 = "acto-administrativo-concepto-elementos-clases-motivacion";
console.log(`📝 flashcards (${S2})...`);
await insertar(
  "flashcards",
  [
    { anverso: "Según el art. 34.1 de la Ley 39/2015, ¿cómo se producen los actos administrativos?", reverso: "Por el órgano competente, bien de oficio o a instancia del interesado, ajustándose a los requisitos y al procedimiento establecido" },
    { anverso: "Según el art. 34.2, ¿a qué debe ajustarse el contenido de los actos administrativos?", reverso: "A lo dispuesto por el ordenamiento jurídico, siendo determinado y adecuado a los fines de aquellos" },
    { anverso: "Según el art. 35.1, cita tres tipos de actos que deben ser motivados", reverso: "Los que limiten derechos subjetivos o intereses legítimos; los que resuelvan procedimientos de revisión de oficio, recursos administrativos o arbitraje; y los que se separen del criterio seguido en actuaciones precedentes o del dictamen de órganos consultivos" },
    { anverso: "Según el art. 36.1, ¿en qué forma se producen los actos administrativos?", reverso: "Por escrito a través de medios electrónicos, a menos que su naturaleza exija otra forma más adecuada de expresión y constancia" },
    { anverso: "Según el art. 36.3, ¿pueden refundirse varios actos administrativos en uno solo?", reverso: "Sí; cuando deba dictarse una serie de actos de la misma naturaleza (nombramientos, concesiones o licencias) podrán refundirse en un único acto que especifique las circunstancias que individualicen los efectos para cada interesado" },
    { anverso: "¿Cuál es el elemento subjetivo del acto administrativo, según el art. 34.1?", reverso: "El órgano competente que lo dicta" },
    { anverso: "¿Cuál es el elemento objetivo del acto administrativo, según el art. 34.2?", reverso: "El contenido del acto, que debe ajustarse al ordenamiento jurídico y ser determinado y adecuado a sus fines" },
    { anverso: "¿Qué comprende el elemento formal del acto administrativo, según los arts. 34.1 y 36?", reverso: "El procedimiento seguido para su producción (art. 34.1) y la forma en que se expresa, por escrito a través de medios electrónicos con carácter general (art. 36)" },
    { anverso: "Doctrinalmente, ¿cómo se clasifican los actos administrativos según su relación con la esfera jurídica del interesado?", reverso: "En actos favorables (amplían la esfera jurídica del interesado, reconociéndole derechos o facultades) y actos de gravamen (la restringen, imponiéndole obligaciones o limitaciones)" },
    { anverso: "Según el art. 24 de la Ley 39/2015, ¿cómo se clasifican los actos administrativos según su forma de producción?", reverso: "En actos expresos (dictados y notificados por la Administración) y actos presuntos, producidos por silencio administrativo cuando vence el plazo máximo sin resolución expresa" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })),
);

console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "Según el art. 34.1 de la Ley 39/2015, ¿por quién se producen los actos administrativos?", explicacion: "Por el órgano competente, bien de oficio o a instancia del interesado, ajustándose a los requisitos y al procedimiento establecido.", dificultad: "facil", opciones: ["Por el órgano competente, de oficio o a instancia del interesado", "Únicamente a instancia del interesado", "Por cualquier órgano de la Administración indistintamente", "Exclusivamente por el titular del departamento"], correcta: 0 },
  { enunciado: "¿Cuál de los siguientes actos debe motivarse, según el art. 35.1 de la Ley 39/2015?", explicacion: "Los actos que limiten derechos subjetivos o intereses legítimos deben ser motivados, con sucinta referencia de hechos y fundamentos de derecho.", dificultad: "media", opciones: ["Los que limiten derechos subjetivos o intereses legítimos", "Los actos de mero trámite que no deciden el fondo del asunto", "Todos los actos administrativos, sin excepción", "Únicamente los actos favorables al interesado"], correcta: 0 },
  { enunciado: "Según el art. 36.1 de la Ley 39/2015, ¿en qué forma se producen los actos administrativos con carácter general?", explicacion: "Por escrito a través de medios electrónicos, a menos que su naturaleza exija otra forma más adecuada de expresión y constancia.", dificultad: "facil", opciones: ["Por escrito a través de medios electrónicos, salvo que la naturaleza del acto exija otra forma", "Siempre verbalmente, con constancia posterior por escrito", "Solo en soporte papel", "Únicamente mediante comparecencia personal"], correcta: 0 },
  { enunciado: "Según el art. 36.3 de la Ley 39/2015, ¿qué permite hacer la ley cuando deba dictarse una serie de actos administrativos de la misma naturaleza?", explicacion: "Podrán refundirse en un único acto, acordado por el órgano competente, que especificará las circunstancias que individualicen los efectos para cada interesado.", dificultad: "media", opciones: [
    "Refundirlos en un único acto que especifique las circunstancias individualizadoras",
    "Delegar su firma en cualquier funcionario sin control posterior",
    "Prescindir de la motivación en todos los casos",
    "Notificarlos únicamente mediante publicación colectiva sin identificación individual",
  ], correcta: 0 },
  { enunciado: "¿Cuál es el elemento subjetivo del acto administrativo?", explicacion: "El órgano competente que dicta el acto (art. 34.1).", dificultad: "facil", opciones: ["El órgano competente que lo dicta", "El contenido del acto", "La forma en que se expresa", "El plazo de notificación"], correcta: 0 },
  { enunciado: "¿Cuál es el elemento objetivo del acto administrativo, según el art. 34.2 de la Ley 39/2015?", explicacion: "El contenido del acto, que debe ajustarse al ordenamiento jurídico y ser determinado y adecuado a sus fines.", dificultad: "media", opciones: ["El contenido, ajustado al ordenamiento jurídico y adecuado a sus fines", "El órgano que lo dicta", "El plazo máximo de resolución", "El sistema de identificación del interesado"], correcta: 0 },
  { enunciado: "Doctrinalmente, ¿cómo se denominan los actos que restringen la esfera jurídica del interesado imponiéndole obligaciones o limitaciones?", explicacion: "Actos de gravamen, por oposición a los actos favorables.", dificultad: "media", opciones: ["Actos de gravamen", "Actos presuntos", "Actos definitivos", "Actos de trámite"], correcta: 0 },
  { enunciado: "Según el art. 24 de la Ley 39/2015, ¿cómo se denomina el acto administrativo que se produce por el vencimiento del plazo máximo sin resolución expresa?", explicacion: "Acto presunto, producido por silencio administrativo.", dificultad: "media", opciones: ["Acto presunto (por silencio administrativo)", "Acto expreso tácito", "Acto de gravamen automático", "Acto convalidado"], correcta: 0 },
]);

// ─────────────────────────────────────────────────────────────────────────
// Sección 3: notificacion-notificacion-electronica
// ─────────────────────────────────────────────────────────────────────────
const S3 = "notificacion-notificacion-electronica";
console.log(`📝 flashcards (${S3})...`);
await insertar(
  "flashcards",
  [
    { anverso: "Según el art. 40.2 de la Ley 39/2015, ¿en qué plazo debe cursarse una notificación desde que el acto fue dictado?", reverso: "Dentro del plazo de diez días a partir de la fecha en que el acto haya sido dictado" },
    { anverso: "Según el art. 40.2, ¿qué debe contener toda notificación?", reverso: "El texto íntegro de la resolución, con indicación de si pone fin o no a la vía administrativa, la expresión de los recursos que procedan, el órgano ante el que presentarlos y el plazo para interponerlos" },
    { anverso: "Según el art. 41.1, ¿cómo se practican preferentemente las notificaciones?", reverso: "Por medios electrónicos, y en todo caso cuando el interesado resulte obligado a recibirlas por esta vía" },
    { anverso: "Según el art. 41.2, ¿qué notificaciones NUNCA se efectúan por medios electrónicos?", reverso: "Aquellas en que el acto a notificar vaya acompañado de elementos no susceptibles de conversión a formato electrónico, y las que contengan medios de pago a favor de los obligados (como cheques)" },
    { anverso: "Según el art. 42.2, en una notificación en papel practicada en el domicilio, si el interesado no está presente, ¿quién puede hacerse cargo de ella?", reverso: "Cualquier persona mayor de catorce años que se encuentre en el domicilio y haga constar su identidad" },
    { anverso: "Según el art. 42.2, si nadie se hace cargo de la notificación en papel, ¿cuántos intentos se realizan y con qué separación horaria?", reverso: "Se repite por una sola vez más, en hora distinta, dentro de los tres días siguientes, dejando al menos un margen de tres horas entre ambos intentos" },
    { anverso: "Según el art. 43.2, ¿cuándo se entienden practicadas las notificaciones por medios electrónicos?", reverso: "En el momento en que se produzca el acceso a su contenido" },
    { anverso: "Según el art. 43.2, ¿cuándo se entiende rechazada una notificación electrónica obligatoria o expresamente elegida por el interesado?", reverso: "Cuando hayan transcurrido diez días naturales desde la puesta a disposición de la notificación sin que se acceda a su contenido" },
    { anverso: "Según el art. 44 de la Ley 39/2015, ¿cómo se notifica cuando los interesados son desconocidos, se ignora el lugar de la notificación o esta resultó infructuosa?", reverso: "Mediante un anuncio publicado en el «Boletín Oficial del Estado»" },
    { anverso: "Según el art. 45.1, ¿en qué dos supuestos los actos administrativos serán objeto de publicación surtiendo los efectos de la notificación?", reverso: "Cuando el acto tenga por destinatario una pluralidad indeterminada de personas (o la notificación individual sea insuficiente), y cuando se trate de actos integrantes de un procedimiento selectivo o de concurrencia competitiva" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })),
);

console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "Según el art. 40.2 de la Ley 39/2015, ¿en qué plazo debe cursarse una notificación desde que se dictó el acto?", explicacion: "Dentro del plazo de diez días a partir de la fecha en que el acto haya sido dictado.", dificultad: "facil", opciones: ["Diez días", "Cinco días", "Un mes", "Quince días"], correcta: 0 },
  { enunciado: "¿Cómo se practican preferentemente las notificaciones según el art. 41.1 de la Ley 39/2015?", explicacion: "Por medios electrónicos, y en todo caso cuando el interesado esté obligado a recibirlas por esta vía.", dificultad: "facil", opciones: ["Por medios electrónicos", "Siempre en papel, salvo petición expresa contraria", "Por télex o telegrama", "Verbalmente, con acta posterior"], correcta: 0 },
  { enunciado: "Según el art. 41.2 de la Ley 39/2015, ¿cuál de las siguientes notificaciones NUNCA se efectuará por medios electrónicos?", explicacion: "Las que contengan medios de pago a favor de los obligados, tales como cheques.", dificultad: "dificil", opciones: ["Las que contengan medios de pago a favor de los obligados, como cheques", "Las relativas a procedimientos sancionadores", "Las dirigidas a personas jurídicas", "Las que pongan fin a la vía administrativa"], correcta: 0 },
  { enunciado: "Según el art. 42.2 de la Ley 39/2015, si en una notificación en papel practicada en el domicilio el interesado no está presente, ¿quién puede hacerse cargo de ella?", explicacion: "Cualquier persona mayor de catorce años que se encuentre en el domicilio y haga constar su identidad.", dificultad: "media", opciones: ["Cualquier persona mayor de catorce años presente en el domicilio", "Solo un familiar directo mayor de edad", "Únicamente el propio interesado", "Cualquier vecino del inmueble, sin límite de edad"], correcta: 0 },
  { enunciado: "Según el art. 43.2 de la Ley 39/2015, ¿cuándo se entienden practicadas las notificaciones por medios electrónicos?", explicacion: "En el momento en que se produzca el acceso a su contenido.", dificultad: "media", opciones: ["En el momento en que se accede a su contenido", "En el momento en que se envían, con independencia del acceso", "A los 24 horas de su puesta a disposición, automáticamente", "Cuando el interesado lo confirme por escrito"], correcta: 0 },
  { enunciado: "Según el art. 43.2, ¿cuándo se entiende rechazada una notificación electrónica de carácter obligatorio si el interesado no accede a su contenido?", explicacion: "Cuando hayan transcurrido diez días naturales desde la puesta a disposición de la notificación.", dificultad: "media", opciones: ["Transcurridos diez días naturales desde la puesta a disposición", "Transcurridas 24 horas desde el envío", "Transcurrido un mes natural", "Nunca se considera rechazada, solo pendiente"], correcta: 0 },
  { enunciado: "Según el art. 44 de la Ley 39/2015, cuando los interesados son desconocidos o se ignora el lugar de la notificación, ¿cómo se practica esta?", explicacion: "Mediante un anuncio publicado en el Boletín Oficial del Estado.", dificultad: "facil", opciones: ["Mediante anuncio publicado en el Boletín Oficial del Estado", "Mediante anuncio en un periódico de tirada nacional", "Mediante edicto fijado en el domicilio del último destino conocido, únicamente", "No es posible notificar en ese supuesto"], correcta: 0 },
  { enunciado: "Según el art. 45.1 de la Ley 39/2015, ¿en cuál de los siguientes casos los actos administrativos serán objeto de publicación surtiendo los efectos de la notificación?", explicacion: "Cuando el acto tenga por destinatario una pluralidad indeterminada de personas, o se trate de actos integrantes de un procedimiento selectivo o de concurrencia competitiva.", dificultad: "media", opciones: [
    "Cuando el destinatario sea una pluralidad indeterminada de personas o el acto sea de un procedimiento selectivo",
    "Únicamente cuando así lo solicite expresamente el interesado",
    "Solo en los procedimientos sancionadores",
    "Nunca; la publicación jamás sustituye a la notificación",
  ], correcta: 0 },
]);

// ─────────────────────────────────────────────────────────────────────────
// Sección 4: procedimiento-sujetos-electronicos-identificacion-representacion
// ─────────────────────────────────────────────────────────────────────────
const S4 = "procedimiento-sujetos-electronicos-identificacion-representacion";
console.log(`📝 flashcards (${S4})...`);
await insertar(
  "flashcards",
  [
    { anverso: "Según el art. 54 de la Ley 39/2015, ¿cómo pueden iniciarse los procedimientos administrativos?", reverso: "De oficio o a solicitud del interesado" },
    { anverso: "Según el art. 14.1 de la Ley 39/2015, ¿pueden las personas físicas elegir si se relacionan con la Administración por medios electrónicos?", reverso: "Sí, en todo momento, salvo que estén obligadas a relacionarse electrónicamente; el medio elegido puede modificarse en cualquier momento" },
    { anverso: "Según el art. 14.2, cita tres colectivos obligados en todo caso a relacionarse electrónicamente con la Administración", reverso: "Las personas jurídicas, las entidades sin personalidad jurídica, y quienes ejerzan una actividad profesional que requiera colegiación obligatoria (también quienes representen a un obligado electrónico, y los empleados públicos por razón de su condición)" },
    { anverso: "Según el art. 9.1 de la Ley 39/2015, ¿cómo verifican las Administraciones la identidad de los interesados?", reverso: "Mediante la comprobación de su nombre y apellidos, o denominación o razón social, que consten en el Documento Nacional de Identidad o documento identificativo equivalente" },
    { anverso: "Según el art. 9.2, cita dos sistemas de identificación electrónica admitidos por las Administraciones", reverso: "Sistemas basados en certificados electrónicos cualificados de firma electrónica, y sistemas basados en certificados electrónicos cualificados de sello electrónico, ambos expedidos por prestadores incluidos en la Lista de confianza de prestadores de servicios de certificación" },
    { anverso: "Según el art. 11.2 de la Ley 39/2015, ¿para qué actuaciones exigen las Administraciones el uso obligatorio de firma?", reverso: "Formular solicitudes, presentar declaraciones responsables o comunicaciones, interponer recursos, desistir de acciones y renunciar a derechos" },
    { anverso: "Según el art. 5.1 de la Ley 39/2015, ¿pueden los interesados actuar por medio de representante?", reverso: "Sí; se entenderán con este las actuaciones administrativas, salvo manifestación expresa en contra del interesado" },
    { anverso: "Según el art. 5.3, ¿para qué actuaciones debe acreditarse la representación (frente a los actos de mero trámite, en que se presume)?", reverso: "Para formular solicitudes, presentar declaraciones responsables o comunicaciones, interponer recursos, desistir de acciones y renunciar a derechos en nombre de otra persona" },
    { anverso: "Según el art. 5.6, ¿qué ocurre si falta o es insuficiente la acreditación de la representación?", reverso: "No impedirá que se tenga por realizado el acto, siempre que se aporte la acreditación o se subsane el defecto dentro del plazo de diez días que debe conceder el órgano administrativo" },
    { anverso: "Según el art. 6.1 de la Ley 39/2015, ¿qué es el registro electrónico de apoderamientos?", reverso: "El registro en el que deben inscribirse, al menos, los poderes de carácter general otorgados apud acta —presencial o electrónicamente— por un interesado a favor de un representante, para actuar en su nombre ante las Administraciones Públicas" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S4 })),
);

console.log(`📝 preguntas de test (${S4})...`);
await insertarPreguntasConOpciones(S4, [
  { enunciado: "Según el art. 54 de la Ley 39/2015, ¿cómo pueden iniciarse los procedimientos administrativos?", explicacion: "De oficio o a solicitud del interesado.", dificultad: "facil", opciones: ["De oficio o a solicitud del interesado", "Únicamente de oficio", "Únicamente a solicitud del interesado", "Solo mediante denuncia de un tercero"], correcta: 0 },
  { enunciado: "Según el art. 14.1 de la Ley 39/2015, ¿pueden las personas físicas elegir si se comunican con la Administración por medios electrónicos?", explicacion: "Sí, en todo momento, salvo que estén obligadas a relacionarse por esa vía; además, el medio elegido puede modificarse en cualquier momento.", dificultad: "media", opciones: ["Sí, en todo momento, salvo obligación legal en contrario", "No, deben usar siempre medios electrónicos", "Solo si lo autoriza expresamente cada Administración", "Solo las personas mayores de 65 años pueden elegir"], correcta: 0 },
  { enunciado: "Según el art. 14.2 de la Ley 39/2015, ¿cuál de los siguientes sujetos está obligado en todo caso a relacionarse electrónicamente con la Administración?", explicacion: "Las personas jurídicas están obligadas en todo caso, junto con las entidades sin personalidad jurídica y quienes ejerzan una actividad profesional de colegiación obligatoria, entre otros.", dificultad: "media", opciones: ["Las personas jurídicas", "Cualquier persona física mayor de edad", "Los menores de edad emancipados", "Los jubilados que perciban pensión pública"], correcta: 0 },
  { enunciado: "Según el art. 9.1 de la Ley 39/2015, ¿cómo verifican las Administraciones Públicas la identidad de los interesados?", explicacion: "Mediante la comprobación de su nombre y apellidos o denominación/razón social, que consten en el DNI o documento identificativo equivalente.", dificultad: "facil", opciones: ["Comprobando el nombre y apellidos que consten en el DNI o documento equivalente", "Exigiendo siempre huella dactilar biométrica", "Mediante declaración jurada del propio interesado, sin más comprobación", "Solicitando referencias de dos testigos"], correcta: 0 },
  { enunciado: "Según el art. 11.2 de la Ley 39/2015, ¿para cuál de las siguientes actuaciones exigen las Administraciones el uso obligatorio de firma?", explicacion: "Para formular solicitudes, presentar declaraciones responsables o comunicaciones, interponer recursos, desistir de acciones y renunciar a derechos.", dificultad: "media", opciones: ["Formular solicitudes e interponer recursos", "Consultar el estado de tramitación de un expediente", "Acceder a información pública general", "Realizar una consulta telefónica informativa"], correcta: 0 },
  { enunciado: "Según el art. 5.1 de la Ley 39/2015, ¿pueden los interesados actuar por medio de representante ante la Administración?", explicacion: "Sí, entendiéndose con este las actuaciones administrativas, salvo manifestación expresa en contra del interesado.", dificultad: "facil", opciones: ["Sí, salvo manifestación expresa en contra del interesado", "No, la actuación siempre debe ser personal", "Solo si el representante es un profesional colegiado", "Solo en procedimientos sancionadores"], correcta: 0 },
  { enunciado: "Según el art. 5.6 de la Ley 39/2015, ¿qué ocurre si falta o es insuficiente la acreditación de la representación?", explicacion: "No impide que se tenga por realizado el acto, siempre que se aporte la acreditación o se subsane el defecto en el plazo de diez días que conceda el órgano administrativo.", dificultad: "media", opciones: [
    "No impide el acto, si se subsana en el plazo de diez días concedido al efecto",
    "El acto es nulo de pleno derecho de forma automática",
    "Se archiva el expediente sin posibilidad de subsanación",
    "Se impone una sanción disciplinaria al representante",
  ], correcta: 0 },
  { enunciado: "Según el art. 6.1 de la Ley 39/2015, ¿qué es el registro electrónico de apoderamientos?", explicacion: "El registro en el que se inscriben, al menos, los poderes de carácter general otorgados apud acta (presencial o electrónicamente) a favor de un representante, para actuar ante las Administraciones Públicas.", dificultad: "media", opciones: [
    "El registro donde se inscriben los poderes generales otorgados apud acta a favor de un representante",
    "El registro de documentos electrónicos administrativos",
    "El registro de firmas electrónicas cualificadas de los funcionarios",
    "El catálogo de procedimientos administrativos susceptibles de representación",
  ], correcta: 0 },
]);

console.log(
  "✅ tema-34 creado (4 secciones: disposiciones-administrativas-reglamentos, acto-administrativo-concepto-elementos-clases-motivacion, notificacion-notificacion-electronica, procedimiento-sujetos-electronicos-identificacion-representacion; 40 flashcards + 32 preguntas en total).",
);

// ─────────────────────────────────────────────────────────────────────────
// Asignación a la oposición DGA: numero 7, bloque-2 (Derecho y procedimiento administrativo)
// ─────────────────────────────────────────────────────────────────────────
console.log("🔧 Asignando tema-34 a auxiliar-administrativo-dga (numero 7, bloque-2)...");

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
      numero: 7,
      orden: 7,
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

console.log("✅ Tema 7 de la DGA (disposiciones administrativas y acto administrativo) dado de alta.");
