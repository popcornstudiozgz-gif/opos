/**
 * Casos prácticos — Tema 3 (Estatuto de Autonomía de Aragón), tanda de
 * recambio.
 *
 * Los 3 casos de `seed-casos-practicos-tema-3.mjs` quedan ocultos para
 * esta oposición: usan secciones fuera de `secciones_incluidas` de tema-3
 * (`titulo-preliminar`, `titulo-2-cap-1`, `titulo-2-cap-2`, `titulo-2-cap-3`,
 * `titulo-5`) — el Justicia de Aragón (titulo-2-cap-4), el Poder Judicial y
 * la Administración de Justicia en Aragón (titulo-3, titulo-4), las
 * relaciones con otras Comunidades (titulo-7-cap-2), la Hacienda de las
 * entidades locales aragonesas (titulo-8-cap-4) y la reforma del Estatuto
 * (titulo-9).
 *
 * Estos 3 casos nuevos sí se ciñen al recorte real:
 *   1. Título Preliminar (autogobierno, territorio, símbolos, condición
 *      política de aragonés)
 *   2. Título II, Cap. I y II (las Cortes de Aragón y el Presidente)
 *   3. Título II, Cap. III y Título V (el Gobierno de Aragón / DGA y las
 *      clases de competencias autonómicas)
 *
 * Uso: node --env-file=.env.local scripts/seed-casos-practicos-tema-3-recorte.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

const TEMA = "tema-3";
const q = (seccion, dificultad, enunciado, opciones, explicacion) => ({ seccion, dificultad, enunciado, opciones, explicacion });

async function crearCaso({ slug, titulo, supuesto, orden, preguntas }) {
  const resCaso = await fetch(`${URL_BASE}/rest/v1/casos_practicos`, {
    method: "POST",
    headers: { ...HEADERS, Prefer: "return=representation" },
    body: JSON.stringify({ tema_slug: TEMA, slug, titulo, supuesto, orden }),
  });
  if (!resCaso.ok) { console.error(`❌ caso ${resCaso.status} ${await resCaso.text()}`); process.exit(1); }
  const [caso] = await resCaso.json();

  for (let i = 0; i < preguntas.length; i++) {
    const p = preguntas[i];
    const resP = await fetch(`${URL_BASE}/rest/v1/preguntas`, {
      method: "POST",
      headers: { ...HEADERS, Prefer: "return=representation" },
      body: JSON.stringify({ tema_slug: TEMA, seccion: p.seccion, enunciado: p.enunciado, explicacion: p.explicacion ?? null, dificultad: p.dificultad }),
    });
    if (!resP.ok) { console.error(`❌ pregunta ${resP.status} ${await resP.text()}`); process.exit(1); }
    const [pregunta] = await resP.json();

    const opciones = p.opciones.map((texto, idx) => ({ pregunta_id: pregunta.id, texto, es_correcta: idx === 0, orden: idx }));
    const resO = await fetch(`${URL_BASE}/rest/v1/opciones`, { method: "POST", headers: { ...HEADERS, Prefer: "return=minimal" }, body: JSON.stringify(opciones) });
    if (!resO.ok) { console.error(`❌ opciones ${resO.status} ${await resO.text()}`); process.exit(1); }

    const resCP = await fetch(`${URL_BASE}/rest/v1/caso_preguntas`, {
      method: "POST",
      headers: { ...HEADERS, Prefer: "return=minimal" },
      body: JSON.stringify({ caso_id: caso.id, pregunta_id: pregunta.id, orden: i }),
    });
    if (!resCP.ok) { console.error(`❌ caso_preguntas ${resCP.status} ${await resCP.text()}`); process.exit(1); }
  }
  console.log(`✅ ${titulo} (${preguntas.length} preguntas)`);
}

// ═══════════════════════════════════════════════════════════════════════
// CASO 4 — El autogobierno de Aragón (Título Preliminar)
// ═══════════════════════════════════════════════════════════════════════
const CASO_4 = {
  slug: "caso-instituto-huesca-dia-de-aragon",
  titulo: "El caso del trabajo sobre el Día de Aragón",
  orden: 4,
  supuesto:
    "Un grupo de estudiantes de un instituto de Huesca prepara un trabajo sobre las señas de identidad de la " +
    "Comunidad Autónoma de Aragón con motivo del Día de Aragón. Investigan el origen del autogobierno " +
    "aragonés y sus símbolos oficiales, y se plantean quién tiene realmente la condición política de aragonés. " +
    "Uno de ellos tiene un tío que emigró a Argentina hace treinta años tras vivir siempre en Zaragoza, y se " +
    "pregunta si conserva algún derecho político como aragonés. También estudian el caso de un municipio " +
    "limítrofe con Aragón, hoy perteneciente a otra Comunidad Autónoma, cuyo Ayuntamiento se plantea solicitar " +
    "su incorporación a Aragón.",
  preguntas: [
    q("titulo-preliminar", "facil",
      "¿Cómo define el art. 1.1 del Estatuto a Aragón y en virtud de qué ejerce su autogobierno?",
      ["Una nacionalidad histórica que ejerce su autogobierno de acuerdo con el Estatuto, en ejercicio del derecho a la autonomía que la Constitución reconoce y garantiza a toda nacionalidad",
       "Una región administrativa creada por el Estado en 1978, sin identidad histórica propia",
       "Una provincia con competencias delegadas del Gobierno central",
       "Una entidad local de ámbito supramunicipal"],
      "El art. 1.1 del Estatuto califica a Aragón de «nacionalidad histórica» y funda su autogobierno en el derecho a la autonomía que la Constitución reconoce a las nacionalidades y regiones (art. 2 CE)."),
    q("titulo-preliminar", "media",
      "¿En qué funda el art. 1.3 del Estatuto la identidad propia de Aragón dentro del sistema constitucional español?",
      ["En sus instituciones tradicionales, el Derecho foral y su cultura",
       "Únicamente en su lengua oficial diferenciada del castellano",
       "En haber tenido un Estado propio anterior a la unidad de España",
       "En un reconocimiento expreso y exclusivo de la Unión Europea"],
      "El art. 1.3 del Estatuto liga la identidad propia de Aragón a tres elementos históricos: sus instituciones tradicionales, el Derecho foral aragonés y su cultura, sin necesidad de invocar una lengua propia diferenciada ni un reconocimiento europeo."),
    q("titulo-preliminar", "facil",
      "¿Cómo describe el art. 3.1 y 3.3 del Estatuto la bandera y la capital de Aragón?",
      ["Bandera de cuatro barras rojas horizontales sobre fondo amarillo; capital, la ciudad de Zaragoza",
       "Bandera de tres franjas horizontales roja, amarilla y roja; capital, Huesca",
       "Bandera de cuatro barras rojas sobre fondo blanco; capital, Teruel",
       "El Estatuto no fija bandera ni capital, remitiéndolo a una ley posterior"],
      "El art. 3.1 describe la bandera tradicional de cuatro barras rojas sobre fondo amarillo, y el art. 3.3 fija la capital de Aragón en Zaragoza (no debe confundirse con la bandera de España del art. 4 CE, de tres franjas)."),
    q("titulo-preliminar", "media",
      "¿Quién goza de la condición política de aragonés según el art. 4.1 del Estatuto?",
      ["Los ciudadanos españoles que tengan vecindad administrativa en cualquiera de los municipios de Aragón, o cumplan los requisitos que establezca la legislación aplicable",
       "Únicamente quienes hayan nacido en territorio aragonés",
       "Cualquier ciudadano de la Unión Europea residente en Aragón, sin necesidad de nacionalidad española",
       "Solo quienes acrediten ascendencia aragonesa de al menos dos generaciones"],
      "El art. 4.1 vincula la condición política de aragonés a la vecindad administrativa en un municipio de Aragón (o a lo que fije la legislación), no al lugar de nacimiento ni a la ascendencia."),
    q("titulo-preliminar", "media",
      "El tío que emigró a Argentina hace treinta años tras vivir siempre en Zaragoza, ¿conserva derechos políticos como aragonés según el art. 4.2 del Estatuto?",
      ["Sí: los ciudadanos españoles residentes en el extranjero que hayan tenido su última vecindad administrativa en Aragón gozan también de los derechos políticos del Estatuto, si acreditan esa condición",
       "No: al residir fuera de España, pierde automáticamente cualquier derecho político vinculado a Aragón",
       "Solo si regresa a residir físicamente en un municipio aragonés",
       "Solo sus descendientes podrían recuperar esa condición, nunca él directamente"],
      "El art. 4.2 extiende la condición política de aragonés a los españoles residentes en el extranjero que acrediten haber tenido su última vecindad administrativa en Aragón, precisamente para casos de emigración como el descrito."),
    q("titulo-preliminar", "facil",
      "¿En qué entidades territoriales estructura Aragón su organización territorial según el art. 5 del Estatuto?",
      ["Municipios, comarcas y provincias",
       "Únicamente municipios y provincias, sin comarcas",
       "Municipios y comarcas, sin mención a las provincias",
       "Distritos y barrios, como única división administrativa"],
      "El art. 5 del Estatuto añade la comarca, figura propia del régimen local aragonés, a la división clásica en municipios y provincias que ya prevé la Constitución para el conjunto del Estado."),
    q("titulo-preliminar", "media",
      "¿Qué garantiza el art. 7.3 del Estatuto en relación con las lenguas y modalidades lingüísticas propias de Aragón?",
      ["Que nadie podrá ser discriminado por razón de la lengua",
       "Que el castellano deja de ser lengua oficial en las zonas de uso de lenguas propias",
       "Que el uso de las lenguas propias será obligatorio para toda la ciudadanía aragonesa",
       "Que las lenguas propias de Aragón tendrán idéntico estatuto oficial en todo el territorio, sin distinción de zonas"],
      "El art. 7.3 formula una garantía antidiscriminatoria clara y general, sin declarar la cooficialidad plena de las lenguas propias en todo el territorio (eso se remite a una ley de Cortes de Aragón sobre zonas de uso predominante, art. 7.2)."),
    q("titulo-preliminar", "dificil",
      "¿Con qué tipo de eficacia se aplica el Derecho foral de Aragón según el art. 9.2 del Estatuto?",
      ["Eficacia personal: se aplica a todos los que ostenten la vecindad civil aragonesa, con independencia del lugar de su residencia",
       "Eficacia exclusivamente territorial: solo se aplica dentro de los límites de Aragón",
       "Eficacia mixta, requiriendo siempre residencia y vecindad civil aragonesas simultáneamente",
       "El Derecho foral aragonés no tiene eficacia jurídica autónoma, remitiéndose siempre al Código Civil"],
      "El art. 9.2 es clave para distinguir el Derecho foral (eficacia personal, sigue a la persona con vecindad civil aragonesa esté donde esté) de las normas y disposiciones autonómicas ordinarias, que el art. 9.1 sujeta con carácter general a eficacia territorial."),
    q("titulo-preliminar", "dificil",
      "¿Qué requisitos exige el art. 10 del Estatuto para que el municipio limítrofe se incorpore a la Comunidad Autónoma de Aragón?",
      ["Que lo soliciten el Ayuntamiento o la mayoría de los Ayuntamientos interesados, oída la Comunidad o provincia de origen; que lo acuerden los habitantes mediante consulta; y que lo aprueben las Cortes de Aragón y, después, las Cortes Generales mediante ley orgánica",
       "Basta con el acuerdo del Ayuntamiento afectado, sin más trámite",
       "Requiere únicamente un referéndum estatal, sin intervención de las Cortes de Aragón",
       "Es una decisión exclusiva del Gobierno de España, sin participación municipal ni autonómica"],
      "El art. 10 exige una secuencia de tres requisitos acumulativos: iniciativa municipal (oyendo a la Comunidad de origen), consulta a los habitantes, y aprobación en dos escalones (Cortes de Aragón y Cortes Generales, estas últimas mediante ley orgánica)."),
    q("titulo-preliminar", "media",
      "Al margen de los símbolos y la organización territorial, ¿qué derechos y libertades reconoce el art. 6.1 del Estatuto a los aragoneses?",
      ["Los reconocidos en la Constitución, los de la Declaración Universal de Derechos Humanos y demás instrumentos internacionales ratificados por España, y los establecidos por el propio Estatuto",
       "Únicamente los que reconozca expresamente el Estatuto, al margen de la Constitución",
       "Los mismos que la Unión Europea reconoce a sus ciudadanos, sin remisión a la Constitución española",
       "Ningún derecho propio: el Estatuto se remite en exclusiva a la legislación estatal ordinaria"],
      "El art. 6.1 construye un catálogo de derechos en tres capas: los constitucionales, los de los instrumentos internacionales de derechos humanos ratificados por España, y los que añade el propio Estatuto — sin sustituir nunca a la Constitución."),
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// CASO 5 — Las Cortes de Aragón y la investidura del Presidente
// ═══════════════════════════════════════════════════════════════════════
const CASO_5 = {
  slug: "caso-cortes-aragon-investidura-mocion-censura",
  titulo: "El caso de la investidura y la moción de censura en las Cortes de Aragón",
  orden: 5,
  supuesto:
    "Tras las últimas elecciones a Cortes de Aragón, se constituye la nueva legislatura. El Presidente de las " +
    "Cortes, tras consultar con los grupos parlamentarios, propone un candidato a la Presidencia del Gobierno " +
    "de Aragón. En la primera votación de investidura, el candidato no logra la mayoría necesaria. Días antes " +
    "de la segunda votación, uno de los diputados electos es sorprendido en un delito flagrante cuando se " +
    "dirigía a la Cámara. Finalmente el candidato resulta investido. Meses después de constituido el nuevo " +
    "Gobierno, un grupo de diputados presenta una moción de censura contra el Presidente, proponiendo un " +
    "candidato alternativo.",
  preguntas: [
    q("titulo-2-cap-1", "facil",
      "¿Qué funciones corresponden a las Cortes de Aragón según el art. 33.1 del Estatuto?",
      ["Representan al pueblo aragonés, ejercen la potestad legislativa, aprueban los presupuestos de la Comunidad Autónoma, e impulsan y controlan la acción del Gobierno de Aragón",
       "Únicamente ejercer la potestad legislativa, sin control sobre el Gobierno",
       "Aprobar los presupuestos, pero sin potestad legislativa propia",
       "Representar al pueblo aragonés en el Senado, como única función"],
      "El art. 33.1 resume las funciones nucleares de un parlamento autonómico: representación, potestad legislativa, aprobación de presupuestos, e impulso y control del Gobierno — todas ellas, no una sola de forma aislada."),
    q("titulo-2-cap-1", "media",
      "¿Cuántos escaños puede tener las Cortes de Aragón y qué mínimo corresponde a cada provincia según el art. 36.1-2 del Estatuto?",
      ["Entre 65 y 80 escaños, con un mínimo de 14 escaños por provincia",
       "Un número fijo de 100 escaños, con reparto igualitario entre provincias",
       "Entre 50 y 65 escaños, sin mínimo garantizado por provincia",
       "El número de escaños lo fija libremente el Gobierno de Aragón antes de cada elección"],
      "El art. 36.1 fija una horquilla (65-80 escaños, concretada por la ley electoral) y el art. 36.2 garantiza un suelo de representación territorial: al menos 14 escaños por cada una de las tres provincias aragonesas."),
    q("titulo-2-cap-1", "media",
      "¿Qué características tiene el régimen electoral de las Cortes de Aragón según el art. 37.1-2 del Estatuto?",
      ["Cámara unicameral, elegida por sufragio universal, igual, libre, directo y secreto, por un período de cuatro años",
       "Cámara bicameral, con un Congreso y un Senado autonómicos propios",
       "Elección indirecta, a través de los Ayuntamientos de las tres provincias",
       "Mandato de seis años, coincidiendo con el ciclo europeo"],
      "El art. 37.1 califica a las Cortes de Aragón de cámara unicameral con el mismo estándar de sufragio que las elecciones generales, y el art. 37.2 fija un mandato de cuatro años."),
    q("titulo-2-cap-1", "media",
      "El diputado es sorprendido en un delito flagrante camino de la Cámara. ¿Es conforme esa detención al art. 38.2 del Estatuto?",
      ["Sí: durante su mandato, los Diputados y Diputadas no podrán ser detenidos ni retenidos sino en caso de flagrante delito",
       "No: el Estatuto excluye cualquier detención de un diputado mientras las Cortes estén en período de sesiones",
       "Solo sería válida si la autoriza previamente el Presidente de las Cortes",
       "El Estatuto no regula la inmunidad de los diputados, remitiéndose enteramente a la legislación estatal"],
      "El art. 38.2 protege a los Diputados aragoneses frente a la detención, con la misma excepción que rige a nivel estatal para Diputados y Senadores de las Cortes Generales: el flagrante delito."),
    q("titulo-2-cap-2", "facil",
      "¿Qué mayoría necesita el candidato propuesto para ser investido en la primera votación según el art. 48.2 del Estatuto?",
      ["Mayoría absoluta; si no la obtiene, se procede a una nueva votación 24 horas después, bastando entonces la mayoría simple",
       "Mayoría simple desde la primera votación, sin necesidad de una segunda",
       "Dos tercios de las Cortes de Aragón, en cualquier votación",
       "La investidura aragonesa no exige votación: el Presidente lo designa directamente el Rey"],
      "El art. 48.2 sigue el mismo esquema que el art. 99 CE a nivel estatal: mayoría absoluta en primera votación, mayoría simple en la segunda, transcurridas 24 horas (frente a las 48 horas del procedimiento estatal)."),
    q("titulo-2-cap-2", "media",
      "Si transcurrido cierto plazo desde la constitución de las Cortes ningún candidato hubiera sido investido, ¿qué prevé el art. 48.3 del Estatuto?",
      ["Las Cortes electas quedarán disueltas, procediéndose a la convocatoria de nuevas elecciones, transcurridos dos meses desde su constitución",
       "El candidato más votado en las últimas elecciones es investido automáticamente, sin nueva votación",
       "El Gobierno de España nombra un Presidente interino hasta que las Cortes se pongan de acuerdo",
       "No hay plazo límite: las votaciones de investidura pueden repetirse indefinidamente"],
      "El art. 48.3 fija un plazo máximo de dos meses desde la constitución de las Cortes, transcurrido el cual sin investidura procede la disolución automática y la convocatoria de nuevas elecciones."),
    q("titulo-2-cap-2", "facil",
      "Una vez investido, ¿qué representación ostenta el nuevo Presidente de Aragón según el art. 46.2 del Estatuto?",
      ["La suprema representación de Aragón y la ordinaria del Estado en el territorio aragonés, además de presidir el Gobierno de Aragón y dirigir y coordinar su acción",
       "Únicamente la representación del Gobierno de Aragón, sin representar al Estado en el territorio",
       "La representación exclusiva de su partido político en las Cortes",
       "La misma representación que un Ministro del Gobierno de España"],
      "El art. 46.2 atribuye al Presidente de Aragón una doble representación (autonómica y estatal en el territorio) además de la presidencia y dirección del Gobierno de Aragón, en paralelo a la figura del Rey como Jefe del Estado a nivel nacional."),
    q("titulo-2-cap-2", "media",
      "Meses después, un grupo de diputados presenta una moción de censura contra el Presidente. ¿Qué exige el art. 50.2 del Estatuto sobre su presentación?",
      ["Debe ser propuesta al menos por un 15% de los Diputados y Diputadas, y debe incluir un candidato a la Presidencia del Gobierno de Aragón",
       "Puede presentarla cualquier diputado a título individual, sin firmas adicionales",
       "No es necesario proponer candidato alternativo, basta con censurar la gestión del Presidente",
       "Solo puede presentarla el propio Gobierno de Aragón, nunca la oposición parlamentaria"],
      "El art. 50.2 exige un umbral de firmas (15% de los Diputados) y, como en el modelo estatal, obliga a incluir un candidato alternativo: es también una moción de censura «constructiva»."),
    q("titulo-2-cap-2", "media",
      "Si la moción de censura prospera, ¿qué efecto produce según el art. 50.1 y 50.4 del Estatuto?",
      ["Se aprueba por mayoría absoluta, y cesan el Presidente y su Gobierno, entendiéndose investido el candidato alternativo propuesto",
       "Basta la mayoría simple, y solo cesa el Presidente, permaneciendo el resto del Gobierno",
       "Se aprueba por dos tercios, y obliga a convocar nuevas elecciones a Cortes de Aragón",
       "La moción de censura aragonesa no tiene efecto automático sobre la investidura del candidato alternativo"],
      "El art. 50.1 exige mayoría absoluta y el art. 50.4 anuda un efecto automático a su aprobación: cesan Presidente y Gobierno, y el candidato alternativo queda investido sin necesidad de una votación de investidura separada."),
    q("titulo-2-cap-2", "dificil",
      "Si la moción de censura no hubiera prosperado, ¿podrían sus firmantes presentar otra de inmediato, según el art. 50.5 del Estatuto?",
      ["No: si la moción de censura no es aprobada, sus signatarios no podrán suscribir otra hasta transcurrido un año desde la fecha de la votación",
       "Sí, sin ninguna limitación temporal",
       "Sí, pero solo transcurrido un mes desde el rechazo de la anterior",
       "Solo si cambian de candidato alternativo, sin límite de plazo"],
      "El art. 50.5 fija un año como plazo de espera para los mismos firmantes, una limitación algo más estricta que la prevista para el Congreso de los Diputados a nivel estatal (limitada al mismo período de sesiones)."),
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// CASO 6 — El Gobierno de Aragón y sus competencias
// ═══════════════════════════════════════════════════════════════════════
const CASO_6 = {
  slug: "caso-gobierno-aragon-competencias-consejero",
  titulo: "El caso del nuevo Gobierno de Aragón y sus competencias",
  orden: 6,
  supuesto:
    "El nuevo Gobierno de Aragón (la Diputación General) queda constituido tras la investidura de su Presidente, " +
    "que nombra libremente a sus Consejeros. Semanas después, el Consejero de Agricultura es identificado por " +
    "una infracción administrativa menor, aunque no en flagrante delito. El Gobierno de Aragón, en ejercicio de " +
    "sus competencias, aprueba una regulación sobre concentración parcelaria y otra sobre régimen minero, y " +
    "antes de resolver una cuestión jurídica compleja sobre la organización de un organismo autonómico, " +
    "solicita el dictamen de un órgano consultivo. Por último, se plantea si Aragón puede desarrollar su " +
    "Derecho foral sin necesidad de que el Estado se lo autorice caso por caso.",
  preguntas: [
    q("titulo-2-cap-3", "facil",
      "¿Qué funciones ejerce el Gobierno de Aragón y cómo se compone según el art. 53.1-2 del Estatuto?",
      ["Ejerce la función ejecutiva y la potestad reglamentaria; está constituido por el Presidente, los Vicepresidentes, en su caso, y los Consejeros, nombrados y separados libremente por el Presidente",
       "Solo ejerce la potestad reglamentaria, sin función ejecutiva propia",
       "Está compuesto exclusivamente por el Presidente y un Consejo de sabios designado por las Cortes",
       "Los Consejeros son elegidos directamente por las Cortes de Aragón, no nombrados por el Presidente"],
      "El art. 53.1 asigna al Gobierno de Aragón función ejecutiva y potestad reglamentaria, y el art. 53.2 configura su composición con libre nombramiento y cese de Consejeros por el Presidente, igual que ocurre con los Ministros a nivel estatal."),
    q("titulo-2-cap-3", "media",
      "¿Cómo responde políticamente el Gobierno de Aragón ante las Cortes según el art. 53.3 del Estatuto?",
      ["De forma solidaria, sin perjuicio de la responsabilidad directa de cada Consejero por su gestión",
       "Únicamente el Presidente responde políticamente; los Consejeros quedan exentos de toda responsabilidad",
       "Cada Consejero responde solo por su Departamento, sin responsabilidad solidaria del conjunto del Gobierno",
       "El Gobierno de Aragón no responde políticamente ante las Cortes, solo jurídicamente ante los tribunales"],
      "El art. 53.3 combina responsabilidad colegiada (solidaria, del Gobierno en su conjunto) con responsabilidad individual (directa, de cada Consejero por su gestión), sin que una excluya a la otra."),
    q("titulo-2-cap-3", "media",
      "El Consejero de Agricultura es identificado por una infracción administrativa, sin que medie flagrante delito. ¿Puede ser detenido conforme al art. 55.1 del Estatuto?",
      ["No: el Presidente y las demás personas miembros del Gobierno de Aragón, durante su mandato, no podrán ser detenidas ni retenidas sino en supuesto de flagrante delito",
       "Sí, cualquier autoridad puede detener a un Consejero por cualquier infracción, sea o no flagrante",
       "Solo el Presidente de Aragón goza de esa protección, no el resto de Consejeros",
       "La protección del art. 55.1 solo opera durante los períodos de sesiones de las Cortes"],
      "El art. 55.1 extiende a todos los miembros del Gobierno de Aragón (no solo al Presidente) la misma garantía que el art. 38.2 reconoce a los Diputados: detención solo en flagrante delito, y aquí ni siquiera se trata de un delito, sino de una infracción administrativa."),
    q("titulo-2-cap-3", "facil",
      "Si el Presidente de Aragón cesara, ¿qué ocurre con el resto del Gobierno según el art. 56.1-2 del Estatuto?",
      ["El Gobierno de Aragón cesa también, pero el Gobierno cesante continúa en funciones hasta la toma de posesión del nuevo",
       "El resto de Consejeros permanece en el cargo hasta las siguientes elecciones, con independencia del cese del Presidente",
       "Las Cortes de Aragón deben nombrar un Gobierno provisional distinto de los Consejeros cesantes",
       "El Gobierno de Aragón nunca cesa por el cese del Presidente, solo por moción de censura expresa contra cada Consejero"],
      "El art. 56.1 liga el cese del Gobierno al del Presidente (el mismo criterio que el art. 101 CE para el Gobierno de España), y el art. 56.2 garantiza la continuidad en funciones hasta que tome posesión el nuevo Gobierno, evitando un vacío de poder."),
    q("titulo-5", "media",
      "El Gobierno de Aragón regula la concentración parcelaria dentro de «Agricultura y ganadería». ¿Qué tipo de competencia ejerce según el art. 71.17ª del Estatuto?",
      ["Competencia exclusiva, que incluye la potestad legislativa, la potestad reglamentaria, la función ejecutiva y el establecimiento de políticas propias",
       "Competencia compartida, limitada al desarrollo de la legislación básica estatal",
       "Competencia meramente ejecutiva, sin capacidad normativa propia",
       "No es una materia competencial de la Comunidad Autónoma, sino exclusivamente estatal"],
      "El art. 71 (encabezamiento) atribuye a las competencias exclusivas el máximo nivel de autogobierno normativo (potestad legislativa, reglamentaria y ejecutiva), y su apartado 17ª incluye expresamente la agricultura y ganadería, con mención singular a la concentración parcelaria."),
    q("titulo-5", "media",
      "En cambio, al regular el régimen minero, ¿qué tipo de competencia ejerce el Gobierno de Aragón según el art. 75.2ª del Estatuto?",
      ["Competencia compartida: la Comunidad Autónoma ejerce el desarrollo legislativo y la ejecución de la legislación básica que establezca el Estado",
       "Competencia exclusiva, idéntica en alcance a la de agricultura y ganadería",
       "Competencia ejecutiva, sin ninguna capacidad de desarrollo normativo propio",
       "El régimen minero no figura entre las competencias del Estatuto de Aragón"],
      "El art. 75 (encabezamiento) define las competencias compartidas como desarrollo legislativo y ejecución de la legislación básica estatal, y su apartado 2ª incluye expresamente el régimen minero — un nivel de autogobierno menor que el de las materias exclusivas."),
    q("titulo-5", "dificil",
      "En síntesis, ¿qué diferencia principal hay entre las competencias exclusivas (art. 71), las compartidas (art. 75) y las ejecutivas (art. 77) del Estatuto?",
      ["Las exclusivas dan a Aragón potestad legislativa, reglamentaria y ejecutiva plenas; las compartidas limitan la potestad legislativa autonómica al desarrollo de las bases estatales; las ejecutivas se ciñen a aplicar la legislación estatal, sin desarrollo legislativo propio",
       "No hay diferencia real: las tres categorías otorgan idéntico nivel de autogobierno a Aragón",
       "Las competencias ejecutivas son las de mayor autogobierno, por implicar gestión directa",
       "Las competencias compartidas corresponden en exclusiva al Estado, sin intervención autonómica"],
      "El Estatuto gradúa el autogobierno en tres escalones descendentes: exclusivas (máximo margen normativo propio), compartidas (desarrollo de bases estatales) y ejecutivas (solo aplicación de la legislación estatal, sin margen legislativo autonómico)."),
    q("titulo-2-cap-3", "media",
      "Antes de resolver la cuestión compleja sobre el organismo autonómico, el Gobierno de Aragón consulta a un órgano consultivo. ¿A qué órgano se refiere el art. 58.1 del Estatuto como «supremo órgano consultivo del Gobierno y la Administración» de Aragón?",
      ["Al Consejo Consultivo de Aragón, que ejerce sus funciones con autonomía orgánica y funcional para garantizar su objetividad e independencia",
       "A las propias Cortes de Aragón, a través de su Comisión correspondiente",
       "Al Consejo de Estado, órgano consultivo del Gobierno de España, también competente sobre Aragón",
       "Al Justicia de Aragón, en su función de supervisión de la Administración autonómica"],
      "El art. 58.1 crea, en paralelo al Consejo de Estado estatal (art. 107 CE), un órgano consultivo propio de Aragón —el Consejo Consultivo—, distinto del Consejo de Estado y del Justicia de Aragón (que tiene otras funciones, de garantía de derechos)."),
    q("titulo-5", "media",
      "¿Puede Aragón desarrollar su propio Derecho foral sin necesidad de autorización estatal caso por caso, según el art. 71.2ª del Estatuto?",
      ["Sí: la conservación, modificación y desarrollo del Derecho foral aragonés, con respeto a su sistema de fuentes, es una competencia exclusiva de la Comunidad Autónoma",
       "No: el Derecho foral solo puede modificarse mediante ley orgánica de las Cortes Generales",
       "Sí, pero únicamente en materia procesal, no en Derecho sustantivo foral",
       "Es una competencia compartida, sujeta a las bases que fije el Estado en cada momento"],
      "El art. 71.2ª sitúa el Derecho foral aragonés entre las competencias exclusivas —el nivel de mayor autogobierno—, precisamente porque conservar y desarrollar el Derecho civil propio es uno de los rasgos identitarios que el art. 1.3 del Estatuto reconoce a Aragón."),
    q("titulo-5", "facil",
      "Al margen del caso concreto, ¿qué efecto tiene el art. 80.1 del Estatuto (cláusula de cierre) sobre el listado de competencias?",
      ["Que las especificaciones de los distintos títulos competenciales no son excluyentes de otros posibles contenidos que deban considerarse incluidos en el título respectivo, conforme a la Constitución y al Estatuto",
       "Que el listado del art. 71 es cerrado y no admite ninguna interpretación extensiva",
       "Que cualquier materia no mencionada expresamente corresponde automáticamente al Estado",
       "Que las Cortes de Aragón pueden ampliar libremente el listado de competencias sin reforma estatutaria"],
      "El art. 80.1 es una cláusula interpretativa: evita que una redacción no exhaustiva de cada materia competencial se lea como una lista cerrada, permitiendo incluir contenidos conexos sin necesidad de reformar el Estatuto para cada detalle."),
  ],
};

for (const caso of [CASO_4, CASO_5, CASO_6]) {
  await crearCaso(caso);
}
console.log("✔ Tanda de recambio de casos prácticos del tema 3 (Estatuto de Aragón) sembrada.");
