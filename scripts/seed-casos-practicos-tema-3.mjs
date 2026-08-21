/**
 * Casos prácticos — Tema 3 (Estatuto de Autonomía de Aragón). Segunda tanda
 * del feature, tras los 4 casos del tema 1 (Constitución): 3 casos de 10
 * preguntas cada uno, con los mismos números de artículo y la misma
 * terminología ("EAAr") que ya usan las flashcards/preguntas de este tema
 * (ver scripts/seed-flashcards-tema-3* y las preguntas ya sembradas), para
 * que el contenido nuevo no contradiga al existente:
 *   1. Las instituciones de Aragón (Título II completo: Cortes, Presidente,
 *      Gobierno, Justicia de Aragón)
 *   2. La comarca de Piedra Alta: organización territorial, competencias y
 *      Hacienda local (Preliminar, Títulos V/VI/VII.2/VIII.4)
 *   3. El caso de doña Pilar Used: Derecho foral, Administración y Poder
 *      Judicial en Aragón (Preliminar, Títulos III/IV/IX) — cierra
 *      distinguiendo el Justicia de Aragón (institución de garantía) del
 *      Tribunal Superior de Justicia (órgano jurisdiccional), con una
 *      pregunta que remite explícitamente al Caso 1.
 *
 * Misma mecánica que seed-casos-practicos-tema-1.mjs: las preguntas y
 * opciones se insertan en las tablas preguntas/opciones ya existentes, y
 * cada una se enlaza a su caso vía caso_preguntas con su `orden`.
 *
 * Uso: node --env-file=.env.local scripts/seed-casos-practicos-tema-3.mjs
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
// CASO 1 — Las instituciones de Aragón
// ═══════════════════════════════════════════════════════════════════════
const CASO_1 = {
  slug: "caso-instituciones-aragon-mocion-censura",
  titulo: "El caso de la moción de censura en las Cortes de Aragón",
  orden: 1,
  supuesto:
    "Tras las elecciones a las Cortes de Aragón, ningún grupo obtiene mayoría absoluta. Doña Marta Aisa, " +
    "Diputada del partido más votado, es candidata a la Presidencia de Aragón. En la primera votación de " +
    "investidura no logra la mayoría necesaria; veinticuatro horas después se repite la votación y resulta " +
    "investida. Ya nombrada Presidenta, forma su Gobierno. Meses más tarde, tras una polémica decisión sobre el " +
    "cierre de un centro de salud rural, un grupo de Diputados presenta una moción de censura contra ella, " +
    "proponiendo como candidato alternativo a don Jorge Sarasa. Uno de los Diputados firmantes, don Ismael " +
    "Broto, es detenido por la Guardia Civil por un presunto delito cometido el día anterior, ajeno a su " +
    "actividad parlamentaria y sin que mediara flagrancia. Mientras tanto, el Justicia de Aragón recibe una " +
    "queja ciudadana sobre la gestión de una comarca y decide investigarla.",
  preguntas: [
    q("titulo-2-cap-1", "facil",
      "¿Cuáles son las instituciones de la Comunidad Autónoma de Aragón según el art. 32 EAAr?",
      ["Las Cortes, el Presidente, el Gobierno (o Diputación General) y el Justicia de Aragón",
       "Las Cortes, el Presidente, el Gobierno y el Tribunal Superior de Justicia de Aragón",
       "Las Cortes, el Gobierno, el Justicia de Aragón y la Diputación Provincial",
       "Las Cortes, el Presidente y el Gobierno, únicamente"],
      "El Tribunal Superior de Justicia de Aragón no es una institución de la Comunidad Autónoma: forma parte del Poder Judicial del Estado, aunque culmine la organización judicial en el territorio aragonés (art. 63 EAAr)."),
    q("titulo-2-cap-2", "media",
      "¿Cómo se elige y nombra a la Presidenta de Aragón, doña Marta Aisa, según el art. 46.1 EAAr?",
      ["Elegida por las Cortes de Aragón entre sus Diputados y Diputadas, y nombrada por el Rey",
       "Elegida directamente por sufragio universal en las mismas elecciones autonómicas",
       "Propuesta por el Rey tras consultar con los grupos parlamentarios, igual que el Presidente del Gobierno estatal",
       "Nombrada por el Gobierno saliente hasta la siguiente investidura"],
      "A diferencia del Presidente del Gobierno estatal, el Estatuto no prevé una propuesta regia previa consulta: el candidato surge directamente de entre los propios Diputados y Diputadas de las Cortes de Aragón."),
    q("titulo-2-cap-2", "media",
      "En la primera votación de investidura, Marta Aisa no obtiene mayoría absoluta. ¿Qué mayoría basta 24 horas después, conforme al art. 48.2 EAAr?",
      ["Mayoría simple de los votos emitidos",
       "Mayoría absoluta también en la segunda votación",
       "Dos tercios de los Diputados presentes",
       "No cabe una segunda votación: se disuelven las Cortes directamente"],
      "El art. 48.2 EAAr rebaja la exigencia en la segunda votación, celebrada 24 horas después de la primera, a mayoría simple."),
    q("titulo-2-cap-2", "media",
      "Si transcurrieran dos meses desde la primera votación sin que ningún candidato hubiera sido investido, ¿qué ocurriría según el art. 48.3 EAAr?",
      ["Las Cortes de Aragón quedarían disueltas y se convocarían nuevas elecciones",
       "El Gobierno saliente continuaría indefinidamente en funciones, sin límite de plazo",
       "El Justicia de Aragón asumiría interinamente la Presidencia",
       "Las Cortes Generales del Estado nombrarían un Presidente provisional"],
      "El art. 48.3 EAAr fija un plazo máximo de dos meses desde la primera votación: agotado sin investidura, procede la disolución automática de las Cortes de Aragón, igual en su lógica al mecanismo del art. 99.5 CE para el Gobierno estatal."),
    q("titulo-2-cap-3", "facil",
      "Ya investida, Marta Aisa forma su Gobierno. ¿Ante quién responde el Gobierno de Aragón por su gestión, según el art. 53.3 EAAr?",
      ["Ante las Cortes de Aragón, de forma solidaria, sin perjuicio de la responsabilidad directa de cada Consejero",
       "Ante el Justicia de Aragón, como garante de la actividad del Gobierno",
       "Ante el Tribunal Superior de Justicia de Aragón",
       "Únicamente ante la propia Presidenta, sin control externo"],
      "El art. 53.3 EAAr establece la responsabilidad solidaria del Gobierno ante las Cortes, sin perjuicio de que cada Consejero responda además directamente de su gestión."),
    q("titulo-2-cap-2", "dificil",
      "Sobre la moción de censura contra la Presidenta Aisa que proponen los Diputados, con Sarasa como candidato alternativo: ¿qué exige el art. 50.2 EAAr para poder presentarla?",
      ["Ser propuesta por al menos el 15% de los Diputados, incluyendo un candidato alternativo a la Presidencia",
       "Ser propuesta por al menos el 10% de los Diputados, igual que la moción de censura estatal del art. 113.2 CE",
       "Ser propuesta por mayoría absoluta de las Cortes desde el primer momento",
       "Ser propuesta por un solo Diputado, sin necesidad de más firmas"],
      "El Estatuto aragonés exige un umbral más alto (15%) que el previsto para el Congreso de los Diputados en el art. 113.2 CE (10%): son dos mociones de censura «constructivas» (exigen candidato alternativo) pero con requisitos de presentación distintos."),
    q("titulo-2-cap-2", "dificil",
      "Si la moción de censura no prosperase, ¿podrían sus firmantes presentar otra inmediatamente, conforme al art. 50.5 EAAr?",
      ["No: sus signatarios no podrían suscribir otra moción de censura hasta pasado un año",
       "Sí, tantas veces como consideren oportuno",
       "Sí, pero solo una vez más dentro del mismo periodo de sesiones, igual que en el modelo estatal",
       "Sí, siempre que cambien de candidato alternativo"],
      "El art. 50.5 EAAr es más restrictivo que su equivalente estatal (art. 113.4 CE, que limita la reiteración solo «durante el mismo periodo de sesiones»): en Aragón el plazo de espera es de un año completo."),
    q("titulo-2-cap-1", "media",
      "Sobre la detención de don Ismael Broto, Diputado firmante de la moción, por un hecho ajeno a su actividad parlamentaria y sin flagrancia: ¿es correcta esa detención conforme al art. 38 EAAr?",
      ["No: los Diputados y Diputadas gozan de inviolabilidad por sus votos y opiniones, y no pueden ser detenidos salvo en caso de flagrante delito",
       "Sí: la inviolabilidad solo protege las opiniones expresadas en el Pleno, no la libertad personal del Diputado",
       "Sí, porque el hecho es ajeno a su actividad como Diputado",
       "No, pero únicamente porque ocurrió la víspera de una votación relevante"],
      "El art. 38 EAAr protege a los Diputados y Diputadas frente a la detención salvo flagrante delito, con independencia de si el hecho investigado tiene o no relación con su actividad parlamentaria."),
    q("titulo-2-cap-4", "facil",
      "El Justicia de Aragón investiga una queja sobre la gestión de una comarca. ¿Puede supervisar a las comarcas, conforme al art. 59.2 EAAr?",
      ["Sí: puede supervisar a la Administración de la Comunidad Autónoma, los entes locales aragoneses y las comarcas, y los servicios públicos gestionados por concesión",
       "No: su ámbito de supervisión se limita a la Administración autonómica, sin alcanzar a comarcas ni municipios",
       "Solo si la comarca lo autoriza expresamente",
       "Solo puede investigar quejas relativas a derechos fundamentales, no a la gestión ordinaria"],
      "El art. 59.2 EAAr extiende expresamente el ámbito de supervisión del Justicia a los entes locales aragoneses y las comarcas, además de a la Administración autonómica."),
    q("titulo-2-cap-4", "facil",
      "¿Ante quién rinde cuentas el Justicia de Aragón de su actuación, según el art. 59.3 EAAr?",
      ["Ante las Cortes de Aragón",
       "Ante el Gobierno de Aragón",
       "Ante el Tribunal Superior de Justicia de Aragón",
       "Ante el Defensor del Pueblo estatal, como institución superior"],
      "El Justicia de Aragón es, como el Defensor del Pueblo a nivel estatal, un comisionado parlamentario: rinde cuentas ante las Cortes de Aragón, que lo designan, no ante el Gobierno ni ante ningún órgano judicial."),
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// CASO 2 — La comarca de Piedra Alta
// ═══════════════════════════════════════════════════════════════════════
const CASO_2 = {
  slug: "caso-comarca-piedra-alta",
  titulo: "El caso de la comarca de Piedra Alta",
  orden: 2,
  supuesto:
    "La comarca de Piedra Alta, formada por la agrupación de doce municipios limítrofes del Somontano turolense, " +
    "negocia con la Diputación Provincial de Teruel un convenio de cooperación para prestar servicios conjuntos " +
    "a los municipios más pequeños. Al mismo tiempo, el Ayuntamiento de la localidad de Argente, dentro de la " +
    "comarca, quiere ampliar una captación de agua para regadío que discurre íntegramente por territorio " +
    "aragonés, y solicita informe a la Comunidad Autónoma. La comarca, por su parte, explora colaborar con una " +
    "región vecina de Cataluña en un proyecto cultural transfronterizo, y presenta una solicitud de ayuda " +
    "económica al Fondo Local de Aragón para financiar una residencia de mayores.",
  preguntas: [
    q("titulo-preliminar", "facil",
      "¿En qué se estructura la organización territorial de Aragón, de la que forma parte Piedra Alta, según el art. 5 EAAr?",
      ["Municipios, comarcas y provincias",
       "Municipios y comarcas, únicamente",
       "Provincias y mancomunidades",
       "Comarcas y regiones históricas"],
      "El art. 5 EAAr fija el mismo esquema territorial que desarrolla después el Título VI: municipios, comarcas y provincias."),
    q("titulo-6", "facil",
      "¿Qué son las comarcas, como la de Piedra Alta, según el art. 83.1 EAAr?",
      ["Entidades territoriales constituidas por la agrupación de municipios limítrofes, fundamentales para la vertebración del territorio",
       "Divisiones puramente administrativas sin personalidad jurídica propia",
       "Un nivel de gobierno provisional, pendiente de suprimirse en favor de las provincias",
       "Agrupaciones voluntarias de municipios que pueden disolverse libremente en cualquier momento"],
      "El art. 83.1 EAAr las define como entidades territoriales por agrupación de municipios limítrofes, atribuyéndoles un papel fundamental en la vertebración del territorio aragonés."),
    q("titulo-6", "media",
      "¿Qué funciones ejerce la Diputación Provincial de Teruel respecto a los municipios y comarcas de su ámbito, según el art. 84 EAAr?",
      ["Cooperación, asistencia y prestación de servicios a municipios y comarcas, con criterios de solidaridad y equilibrio territorial",
       "Tutela y control jerárquico sobre las decisiones de la comarca",
       "Ninguna: las provincias carecen de funciones una vez creadas las comarcas",
       "Únicamente la recaudación de tributos propios de los municipios"],
      "El art. 84 EAAr atribuye a las provincias un papel de cooperación y asistencia a municipios y comarcas, no de tutela ni de sustitución de sus competencias."),
    q("titulo-6", "media",
      "¿Bajo qué principios se desarrolla la actividad de municipios, comarcas y provincias entre sí, según el art. 85.1 EAAr?",
      ["Subsidiariedad, proporcionalidad y diferenciación",
       "Jerarquía, centralización y uniformidad",
       "Exclusividad competencial absoluta entre niveles",
       "Delegación permanente de todas las competencias en la comarca"],
      "El art. 85.1 EAAr ordena las relaciones entre los distintos niveles territoriales aragoneses conforme a los principios de subsidiariedad, proporcionalidad y diferenciación, no mediante jerarquía."),
    q("titulo-5", "media",
      "Sobre la captación de agua del Ayuntamiento de Argente, que discurre íntegramente por territorio aragonés: ¿de quién es la competencia conforme al art. 72 EAAr?",
      ["De la Comunidad Autónoma de Aragón: ordenación, planificación, gestión y aprovechamientos hidráulicos de las aguas que discurran íntegramente por su territorio",
       "Del Estado, como ocurre con cualquier recurso hidráulico",
       "De la comarca de Piedra Alta, por afectar a su ámbito territorial",
       "De la Confederación Hidrográfica correspondiente, en exclusiva y sin intervención autonómica"],
      "El art. 72 EAAr reserva a Aragón la competencia sobre las aguas intracomunitarias (las que discurren íntegramente por su territorio); es distinto del caso de las aguas que discurren por más de una Comunidad Autónoma, que corresponden al Estado (art. 149.1.22ª CE)."),
    q("titulo-5", "dificil",
      "¿Qué potestades ejerce Aragón en el ámbito de esta competencia exclusiva sobre aguas intracomunitarias, según el art. 71 EAAr?",
      ["Potestad legislativa, potestad reglamentaria, función ejecutiva y el establecimiento de políticas propias",
       "Únicamente la función ejecutiva, quedando la legislación reservada siempre al Estado",
       "Solo la potestad reglamentaria de desarrollo de una ley estatal previa",
       "Ninguna potestad normativa: solo gestión administrativa del día a día"],
      "El art. 71 EAAr define el contenido pleno de las competencias exclusivas: no se limitan a la gestión, incluyen también la capacidad de legislar y reglamentar la materia y fijar políticas propias."),
    q("titulo-7-cap-2", "facil",
      "Sobre el proyecto cultural con la región vecina de Cataluña: ¿permite el Estatuto esa colaboración, conforme al art. 91.1 EAAr?",
      ["Sí: Aragón puede establecer relaciones de colaboración con otras Comunidades Autónomas, especialmente con las que tengan vínculos históricos y geográficos",
       "No: cualquier relación entre Comunidades Autónomas requiere autorización previa de las Cortes Generales",
       "Solo si el proyecto se limita a materias de competencia exclusiva estatal",
       "No: el Estatuto solo prevé relaciones de Aragón con el Estado, nunca con otras Comunidades"],
      "El art. 91.1 EAAr habilita expresamente la colaboración interautonómica, con mención singular a las Comunidades con vínculos históricos y geográficos, como es el caso de Cataluña."),
    q("titulo-8-cap-4", "media",
      "Sobre la ayuda solicitada al Fondo Local de Aragón para la residencia de mayores: ¿qué es este fondo según el art. 114.5 EAAr?",
      ["El fondo que integra el conjunto de aportaciones incondicionadas de la Comunidad Autónoma a las Corporaciones Locales",
       "Un fondo europeo gestionado directamente por la Unión Europea",
       "Un préstamo reintegrable que conceden las Diputaciones Provinciales a los municipios",
       "El fondo destinado exclusivamente a inversión en infraestructuras viarias comarcales"],
      "El art. 114.5 EAAr define el Fondo Local de Aragón como el cauce de las aportaciones incondicionadas (de libre disposición para la entidad local) de la Comunidad Autónoma."),
    q("titulo-8-cap-4", "media",
      "Al margen de esa ayuda concreta, ¿qué le corresponde a la Comunidad Autónoma respecto a las entidades locales, según el art. 114.1 EAAr?",
      ["La tutela financiera, respetando la autonomía local reconocida en los arts. 137, 140, 141 y 142 CE",
       "La tutela política plena, pudiendo revocar los acuerdos de sus órganos de gobierno",
       "Ninguna: las entidades locales aragonesas dependen financieramente solo del Estado",
       "La gestión directa del presupuesto de cada municipio y comarca"],
      "El art. 114.1 EAAr habla de tutela financiera, no de tutela política ni de gestión directa: la autonomía local que garantiza la Constitución queda a salvo."),
    q("titulo-6", "media",
      "Si la comarca quisiera plantear una propuesta general de coordinación con el Gobierno de Aragón, no solo esta ayuda puntual, ¿a través de qué órgano lo haría, conforme al art. 86 EAAr?",
      ["A través del Consejo Local de Aragón, el órgano de colaboración y coordinación entre el Gobierno de Aragón y las asociaciones representativas de entidades locales",
       "A través del Justicia de Aragón",
       "Directamente ante las Cortes Generales del Estado",
       "A través del Consejo Consultivo de Aragón"],
      "El art. 86 EAAr crea el Consejo Local de Aragón precisamente como cauce estable de colaboración y coordinación entre el Gobierno autonómico y las entidades locales, distinto del Justicia (garantía de derechos) o el Consejo Consultivo (órgano consultivo jurídico)."),
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// CASO 3 — El caso de doña Pilar Used
// ═══════════════════════════════════════════════════════════════════════
const CASO_3 = {
  slug: "caso-derecho-foral-pilar-used",
  titulo: "El caso de doña Pilar Used",
  orden: 3,
  supuesto:
    "Doña Pilar Used, con vecindad civil aragonesa pero residente en Madrid desde hace veinte años, fallece " +
    "dejando una finca rústica en el Somontano. Sus herederos discuten si se aplica el Derecho civil aragonés o " +
    "el Código Civil común, ya que Pilar residía fuera de Aragón. El caso llega al Tribunal Superior de Justicia " +
    "de Aragón. La magistrada que lo instruye, muy familiarizada con el Derecho foral, es además candidata a un " +
    "puesto de Secretaria judicial en un partido judicial aragonés. Mientras tanto, la Administración de la " +
    "Comunidad Autónoma tramita en paralelo un expediente sobre las demarcaciones territoriales de los juzgados " +
    "de la zona, y un vecino disconforme con esa tramitación se plantea a quién dirigir su queja. Por último, " +
    "el debate social generado por el caso lleva a las Cortes de Aragón a estudiar impulsar una reforma del " +
    "Estatuto para reforzar las competencias forales.",
  preguntas: [
    q("titulo-preliminar", "media",
      "¿Qué eficacia tiene el Derecho foral de Aragón, el que reclaman los herederos de doña Pilar, según el art. 9.2 EAAr?",
      ["Eficacia personal: se aplica a quienes ostenten vecindad civil aragonesa, con independencia del lugar de residencia",
       "Eficacia territorial: solo se aplica a quienes residan dentro de Aragón",
       "Eficacia mixta: territorial para los bienes inmuebles, personal para los muebles",
       "Ninguna eficacia propia: siempre cede ante el Código Civil común"],
      "Al ser de eficacia personal, el Derecho foral aragonés se aplica a doña Pilar por conservar su vecindad civil aragonesa, con independencia de que llevara veinte años residiendo en Madrid: residencia y vecindad civil son cosas distintas."),
    q("titulo-preliminar", "facil",
      "¿En qué basa Aragón su identidad propia, de la que este Derecho foral forma parte, según el art. 1.3 EAAr?",
      ["Sus instituciones tradicionales, el Derecho foral y su cultura",
       "Únicamente su lengua propia",
       "Su régimen fiscal diferenciado",
       "Su organización territorial en comarcas"],
      "El art. 1.3 EAAr enumera instituciones tradicionales, Derecho foral y cultura como los tres pilares de la identidad propia de Aragón."),
    q("titulo-5", "media",
      "Al margen de su eficacia personal, ¿qué tipo de competencia tiene la Comunidad Autónoma sobre el Derecho foral aragonés en sí mismo, conforme al art. 71 EAAr?",
      ["Es una competencia exclusiva de Aragón",
       "Es una competencia compartida con el Estado",
       "Es una competencia meramente ejecutiva de la legislación civil estatal",
       "No es competencia de Aragón: el Derecho civil es siempre competencia exclusiva del Estado"],
      "El art. 71 EAAr incluye expresamente el Derecho foral aragonés entre las materias de competencia exclusiva de la Comunidad Autónoma, sin perjuicio de las reglas constitucionales sobre competencia estatal en Derecho civil (art. 149.1.8ª CE) que la propia Constitución exceptúa para los derechos forales preexistentes."),
    q("titulo-4-cap-1", "facil",
      "El caso llega al Tribunal Superior de Justicia de Aragón. ¿Qué es este órgano según el art. 63.1 EAAr?",
      ["El órgano jurisdiccional en que culmina la organización judicial en Aragón, sin perjuicio de las competencias del Tribunal Supremo",
       "Un órgano consultivo del Gobierno de Aragón en materia jurídica",
       "El órgano de gobierno interno de los jueces aragoneses, equivalente al Consejo General del Poder Judicial",
       "Una institución de la Comunidad Autónoma, como el Justicia de Aragón"],
      "El Tribunal Superior de Justicia de Aragón es un órgano jurisdiccional del Poder Judicial del Estado radicado en Aragón, no una institución propia de la Comunidad Autónoma ni un órgano consultivo o de gobierno interno."),
    q("titulo-4-cap-1", "media",
      "¿Quién nombra al Presidente del Tribunal Superior de Justicia de Aragón, según el art. 63.3 EAAr?",
      ["El Rey, a propuesta del Consejo General del Poder Judicial",
       "Las Cortes de Aragón, por mayoría absoluta",
       "El Presidente de Aragón, a propuesta del Gobierno",
       "El propio Tribunal, por votación entre sus magistrados"],
      "Al tratarse de un órgano del Poder Judicial del Estado, su nombramiento sigue el cauce estatal ordinario: Real Decreto del Rey a propuesta del Consejo General del Poder Judicial, sin intervención de las instituciones aragonesas."),
    q("titulo-4-cap-1", "media",
      "Sobre la magistrada candidata a Secretaria judicial: ¿qué mérito es preferente para nombrar Magistrados, Jueces y Secretarios en Aragón, según el art. 65 EAAr?",
      ["El conocimiento acreditado del Derecho propio de Aragón",
       "La antigüedad en el escalafón, con independencia de su especialización",
       "Haber nacido en territorio aragonés",
       "Ostentar la vecindad civil aragonesa"],
      "El art. 65 EAAr liga el mérito preferente al conocimiento del Derecho aragonés, no a un requisito de origen o vecindad de la persona candidata."),
    q("titulo-4-cap-2", "media",
      "Sobre el expediente de las demarcaciones territoriales de los juzgados de la zona: ¿a quién corresponde fijar esos límites, según el art. 68.1 EAAr?",
      ["A la Comunidad Autónoma",
       "Al Consejo General del Poder Judicial, en exclusiva",
       "Al Tribunal Superior de Justicia de Aragón",
       "A cada Ayuntamiento afectado, de forma individual"],
      "El art. 68.1 EAAr atribuye a la Comunidad Autónoma la determinación de los límites de las demarcaciones judiciales, aunque los órganos jurisdiccionales que operan dentro de ellas pertenezcan al Poder Judicial del Estado."),
    q("titulo-3", "facil",
      "La Administración de la Comunidad Autónoma tramita este expediente de demarcaciones. ¿Qué condición ostenta esa Administración en el ejercicio de sus competencias, según el art. 61.2 EAAr?",
      ["La condición de Administración ordinaria",
       "La condición de Administración subordinada a la del Estado en todo caso",
       "La condición de Administración meramente consultiva",
       "No tiene condición jurídica propia distinta de la estatal"],
      "El art. 61.2 EAAr reconoce a la Administración aragonesa la condición de Administración ordinaria en sus propias competencias, no una posición subordinada o meramente consultiva."),
    q("titulo-2-cap-4", "dificil",
      "El vecino disconforme con la tramitación del expediente se pregunta ante qué institución de garantía —distinta del Tribunal Superior de Justicia— podría plantear su queja. A la vista de lo visto sobre las instituciones de Aragón, ¿cuál sería?",
      ["El Justicia de Aragón, que puede supervisar a la Administración de la Comunidad Autónoma (art. 59.2 EAAr)",
       "El propio Tribunal Superior de Justicia de Aragón, que también supervisa a la Administración",
       "El Consejo de Justicia de Aragón, como órgano de garantía de los ciudadanos",
       "Las Cortes Generales del Estado, directamente"],
      "El Justicia de Aragón y el Tribunal Superior de Justicia son instituciones bien distintas, aunque el nombre se preste a confusión: el Justicia es un comisionado de las Cortes de Aragón que supervisa a la Administración (como un Defensor del Pueblo autonómico); el Tribunal Superior es un órgano jurisdiccional que resuelve pleitos, no admite quejas ciudadanas sobre la Administración. El Consejo de Justicia de Aragón, por su parte, opera en el ámbito de la Administración de Justicia, no como cauce de queja ciudadana general."),
    q("titulo-9", "media",
      "Las Cortes de Aragón estudian impulsar una reforma del Estatuto para reforzar las competencias forales. ¿Qué mayorías exige el art. 115.2 EAAr para esa reforma?",
      ["Aprobación por 2/3 de las Cortes de Aragón y aprobación de las Cortes Generales mediante ley orgánica",
       "Mayoría absoluta de las Cortes de Aragón, sin intervención posterior de las Cortes Generales",
       "Mayoría simple de las Cortes de Aragón, ratificada después en referéndum",
       "Unanimidad de las Cortes de Aragón"],
      "El art. 115.2 EAAr exige una doble mayoría cualificada: dos tercios en las Cortes de Aragón y, después, aprobación de las Cortes Generales mediante ley orgánica, ya que el Estatuto es al mismo tiempo norma institucional básica de Aragón y ley orgánica del Estado."),
  ],
};

for (const caso of [CASO_1, CASO_2, CASO_3]) {
  await crearCaso(caso);
}
console.log("✔ Casos prácticos del tema 3 (Estatuto de Autonomía de Aragón) sembrados.");
