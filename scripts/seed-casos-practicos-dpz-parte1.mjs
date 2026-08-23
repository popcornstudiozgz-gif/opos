/**
 * Casos prácticos para 4 de los temas de la DPZ que se quedaron sin
 * ninguno visible: Tema 1 (recorte propio de la DPZ, distinto al del
 * Ayuntamiento), Tema 3 (Derecho Administrativo), Tema 4 (régimen local
 * general y de Aragón) y Tema 9 (provincia y municipio).
 *
 * Mismo formato que el resto de casos prácticos: 10 preguntas
 * encadenadas, la primera opción de cada q(...) es la correcta.
 *
 * Uso: node --env-file=.env.local scripts/seed-casos-practicos-dpz-parte1.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

async function crearCaso(temaSlug, { slug, titulo, supuesto, orden, preguntas }) {
  const resCaso = await fetch(`${URL_BASE}/rest/v1/casos_practicos`, {
    method: "POST",
    headers: { ...HEADERS, Prefer: "return=representation" },
    body: JSON.stringify({ tema_slug: temaSlug, slug, titulo, supuesto, orden }),
  });
  if (!resCaso.ok) { console.error(`❌ caso ${resCaso.status} ${await resCaso.text()}`); process.exit(1); }
  const [caso] = await resCaso.json();

  for (let i = 0; i < preguntas.length; i++) {
    const p = preguntas[i];
    const resP = await fetch(`${URL_BASE}/rest/v1/preguntas`, {
      method: "POST",
      headers: { ...HEADERS, Prefer: "return=representation" },
      body: JSON.stringify({ tema_slug: temaSlug, seccion: p.seccion, enunciado: p.enunciado, explicacion: p.explicacion ?? null, dificultad: p.dificultad }),
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

const q = (seccion, dificultad, enunciado, opciones, explicacion) => ({ seccion, dificultad, enunciado, opciones, explicacion });

// ═══════════════════════════════════════════════════════════════════════
// TEMA-1 — DPZ Tema 1 (Título Preliminar + Título I completo de la CE)
// ═══════════════════════════════════════════════════════════════════════
const CASO_TEMA1 = {
  slug: "caso-aixa-asociacion-rio-limpio",
  titulo: "El caso de Aixa y la asociación Río Limpio",
  orden: 7,
  supuesto:
    "Aixa Bouchra es ciudadana marroquí con residencia legal en Huesca desde hace cinco años. Junto con la " +
    "asociación «Río Limpio», que promueve la protección del entorno natural de la ribera del Ebro, organiza " +
    "una charla informativa en la plaza del pueblo. Un concejal, molesto por las críticas de la asociación a " +
    "una obra municipal, intenta impedir la charla alegando que, al ser Aixa extranjera, no tiene derecho a " +
    "participar en actividades públicas. Aixa decide informarse sobre sus derechos. Mientras tanto, el partido " +
    "político al que pertenece el concejal celebra una asamblea interna para fijar su postura sobre la obra " +
    "cuestionada, y las Cortes Generales tramitan una ley que desarrollará la protección del medio ambiente. " +
    "Meses después, una grave alerta de seguridad en la zona lleva a las autoridades a valorar la declaración " +
    "del estado de excepción.",
  preguntas: [
    q("titulo-preliminar", "facil",
      "¿Cómo define el art. 1.3 CE la forma política del Estado español, marco en el que se desarrolla todo este caso?",
      ["La Monarquía parlamentaria",
       "La República parlamentaria",
       "La Monarquía constitucional pura",
       "Un Estado federal"],
      "El art. 1.3 CE fija la forma política del Estado: Monarquía parlamentaria, no república ni monarquía absoluta ni constitucional pura."),
    q("titulo-preliminar", "media",
      "El partido político del concejal celebra una asamblea interna para fijar su postura. ¿Qué exige el art. 6 CE sobre la estructura interna de los partidos?",
      ["Que su estructura interna y funcionamiento sean democráticos, dentro del respeto a la Constitución y a la ley",
       "Que su estructura sea jerárquica y no democrática, por eficacia organizativa",
       "Que celebren asambleas internas solo cuando lo exija expresamente una ley orgánica",
       "El art. 6 CE no regula la estructura interna de los partidos, solo su creación"],
      "El art. 6 CE exige democracia interna en los partidos como condición de su papel constitucional (expresar el pluralismo político y servir de instrumento de participación), no una organización jerárquica."),
    q("titulo-1-cap-1", "media",
      "El concejal alega que Aixa, por ser extranjera, no tiene derecho a participar en actividades públicas como la charla. ¿Es correcto conforme al art. 13.1 CE?",
      ["No: los extranjeros gozan en España de las libertades públicas que garantiza el Título I en los términos que establezcan los tratados y la ley",
       "Sí: el art. 13 CE reserva los derechos del Título I exclusivamente a los españoles",
       "Solo sería correcto si Aixa fuera ciudadana de la Unión Europea",
       "Solo sería correcto si Aixa contara con una autorización administrativa específica para participar en actos públicos"],
      "El art. 13.1 CE reconoce a los extranjeros las libertades del Título I, en los términos de tratados y leyes; no las reserva a los españoles ni exige autorización administrativa específica para participar en una charla informativa."),
    q("titulo-1-cap-2", "facil",
      "¿Qué principio del art. 14 CE vulnera el concejal al querer impedir la charla precisamente por la nacionalidad de Aixa?",
      ["El principio de igualdad, que prohíbe la discriminación por nacimiento, raza, sexo, religión, opinión o cualquier otra condición o circunstancia personal o social",
       "El derecho a la tutela judicial efectiva del art. 24 CE",
       "El principio de legalidad penal del art. 25 CE",
       "El derecho al honor del art. 18 CE"],
      "El art. 14 CE proscribe cualquier discriminación por circunstancias personales, entre las que se incluye la condición de extranjero, encajando exactamente en el motivo alegado por el concejal."),
    q("titulo-1-cap-2", "media",
      "Al margen de la igualdad, ¿qué derecho concreto ejercen Aixa y la asociación al organizar la charla en la plaza, según el art. 21 CE?",
      ["El derecho de reunión pacífica y sin armas, que no necesita autorización previa cuando se ejerce en lugares de tránsito público, solo comunicación previa",
       "El derecho de reunión, que siempre exige autorización previa de la autoridad gubernativa",
       "El derecho de manifestación, reservado en exclusiva a los partidos políticos con representación parlamentaria",
       "Ningún derecho constitucional específico, es una simple tolerancia municipal"],
      "El art. 21 CE ampara las reuniones pacíficas y sin armas; en lugares de tránsito público basta comunicación previa a la autoridad, no autorización, y no está reservado a los partidos políticos."),
    q("titulo-1-cap-3", "media",
      "La asociación Río Limpio defiende la protección del entorno natural de la ribera. ¿Qué principio rector reconoce el art. 45 CE en esta materia?",
      ["El derecho a disfrutar de un medio ambiente adecuado para el desarrollo de la persona, así como el deber de conservarlo",
       "Un derecho fundamental directamente exigible ante los tribunales sin necesidad de desarrollo legal",
       "Una competencia exclusiva y excluyente del Estado, sin intervención de Comunidades Autónomas ni entidades locales",
       "Una mera declaración sin ningún efecto jurídico, ni siquiera como criterio interpretativo"],
      "El art. 45 CE está en el Capítulo III (Principios rectores), no en el Capítulo II de derechos fundamentales: reconoce el derecho-deber ambiental, pero con el régimen de eficacia jurídica propio de los principios rectores, no como derecho fundamental de aplicación directa."),
    q("titulo-1-cap-3", "dificil",
      "Las Cortes Generales tramitan una ley que desarrollará la protección del medio ambiente. ¿Qué exige el art. 53.3 CE sobre la eficacia de principios rectores como el del art. 45?",
      ["Que su reconocimiento, respeto y protección informarán la legislación positiva, la práctica judicial y la actuación de los poderes públicos, y solo podrán alegarse ante la jurisdicción ordinaria de acuerdo con lo que dispongan las leyes que los desarrollen",
       "Que son directamente exigibles ante cualquier juzgado desde la entrada en vigor de la Constitución, sin necesidad de desarrollo legal",
       "Que carecen de cualquier efecto jurídico mientras no exista ley de desarrollo",
       "Que solo vinculan al Poder Legislativo, no a los jueces ni a la Administración"],
      "El art. 53.3 CE fija un régimen intermedio para los principios rectores: informan todo el ordenamiento y vinculan a todos los poderes públicos, pero su alegabilidad directa ante los tribunales depende de lo que establezca la ley que los desarrolle."),
    q("titulo-1-cap-4", "media",
      "Al margen de los principios rectores, ¿qué garantía general otorga el art. 53.1 CE a derechos como la igualdad (art. 14) y la reunión (art. 21), que sí están en el Capítulo II?",
      ["Vinculan a todos los poderes públicos, y solo por ley (que en todo caso deberá respetar su contenido esencial) podrá regularse su ejercicio",
       "Solo vinculan a la Administración, no al Poder Judicial ni al Legislativo",
       "Pueden ser suspendidos por cualquier autoridad administrativa sin necesidad de ley ni de declaración de estado excepcional",
       "Carecen de contenido esencial protegido, el legislador puede regularlos sin ningún límite"],
      "El art. 53.1 CE es la garantía general de todos los derechos del Capítulo II: vinculación de todos los poderes públicos y reserva de ley con respeto al contenido esencial, un nivel de protección superior al de los meros principios rectores del art. 45."),
    q("titulo-1-cap-4", "dificil",
      "Si Aixa quisiera reaccionar con la máxima urgencia frente a una eventual prohibición administrativa de la charla, ¿qué vía reforzada le ofrece el art. 53.2 CE, por tratarse de un derecho de la Sección 1ª del Capítulo II (arts. 14-29)?",
      ["Un procedimiento basado en los principios de preferencia y sumariedad ante los tribunales ordinarios y, en su caso, el recurso de amparo ante el Tribunal Constitucional",
       "El recurso de inconstitucionalidad, reservado a sujetos legitimados como el Gobierno o los Diputados",
       "Una cuestión de inconstitucionalidad, que solo puede plantear un juez, nunca un particular",
       "Ninguna vía reforzada: se tramitaría como cualquier recurso contencioso-administrativo ordinario"],
      "El art. 53.2 CE reserva esta doble garantía (proceso preferente y sumario, más amparo) a los derechos del art. 14 y de la Sección 1ª del Capítulo II (arts. 15-29) — exactamente donde están la igualdad y la reunión que ejercen Aixa y la asociación."),
    q("titulo-1-cap-5", "dificil",
      "Declarado finalmente el estado de excepción por la alerta de seguridad, ¿podría suspenderse el derecho de reunión que ejerció Aixa, según el art. 55.1 CE?",
      ["Sí: el art. 55.1 CE incluye expresamente el derecho de reunión del art. 21 entre los que pueden suspenderse en los estados de excepción o de sitio",
       "No: el derecho de reunión no figura entre los derechos suspendibles en ningún caso",
       "Solo podría suspenderse en estado de sitio, nunca en estado de excepción",
       "Solo podría suspenderse individualmente, nunca con carácter general para toda la población"],
      "El art. 55.1 CE enumera de forma tasada los derechos suspendibles en excepción o sitio, entre ellos el del art. 21 (reunión); a diferencia del régimen individual del art. 55.2 (reservado a investigaciones sobre bandas armadas o terroristas), esta suspensión puede tener carácter general dentro del ámbito territorial declarado."),
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// TEMA-21 — DPZ Tema 3 (Derecho Administrativo: concepto y fuentes)
// ═══════════════════════════════════════════════════════════════════════
const CASO_TEMA21 = {
  slug: "caso-ordenanza-terrazas-jerarquia-normativa",
  titulo: "El caso de la ordenanza de terrazas",
  orden: 1,
  supuesto:
    "El Ayuntamiento de Valdejara quiere aprobar una ordenanza que regule la instalación de terrazas de " +
    "hostelería en la vía pública. Antes de redactarla, la técnica municipal, doña Elvira Nasarre, debe " +
    "resolver varias dudas: si puede establecer una tasa por ocupación de vía pública sin que exista antes una " +
    "ley que lo permita, si la ordenanza puede contradecir lo dispuesto en una ley estatal sobre horarios " +
    "comerciales, y si puede invocar una «costumbre local» según la cual ciertos bares llevan décadas ocupando " +
    "la acera sin licencia. Al mismo tiempo, revisa una sentencia reiterada del Tribunal Supremo sobre el " +
    "concepto de terraza, y comprueba que el Alcalde, en un caso concreto, pretende no aplicar un artículo de " +
    "la ordenanza a un bar amigo suyo mediante un simple decreto.",
  preguntas: [
    q("concepto-fuentes", "facil",
      "Antes de nada, ¿en qué rama del Derecho se encuadra la futura ordenanza de terrazas?",
      ["En el Derecho Administrativo, rama del Derecho Público que regula la organización y funcionamiento de las Administraciones Públicas y sus relaciones con los ciudadanos",
       "En el Derecho Civil, por tratarse de una relación entre el Ayuntamiento y los hosteleros",
       "En el Derecho Mercantil, al afectar a la actividad económica de los bares",
       "En el Derecho Penal, al establecer un régimen sancionador"],
      "Aunque la ordenanza pueda tener un régimen sancionador (Derecho Penal) o afectar a negocios (Derecho Mercantil), su naturaleza como norma de una Administración Pública que organiza el uso del dominio público la sitúa en el Derecho Administrativo."),
    q("concepto-fuentes", "media",
      "¿Puede la técnica municipal establecer la tasa por ocupación de vía pública directamente en la ordenanza, sin que exista antes una ley que la habilite, dado el principio de reserva de ley?",
      ["No: la reserva de ley exige que determinadas materias, como la creación de tributos, solo puedan regularse mediante una norma con rango de ley, no directamente por ordenanza",
       "Sí, sin ninguna limitación: las Corporaciones locales tienen plena libertad para crear cualquier tributo mediante ordenanza",
       "Solo si el Pleno lo aprueba por unanimidad, sin necesidad de ninguna ley previa",
       "La reserva de ley no existe en el ordenamiento español, es un concepto doctrinal sin aplicación práctica"],
      "La reserva de ley en materia tributaria exige que sea una ley (estatal, la Ley de Haciendas Locales) la que habilite a las ordenanzas fiscales locales a establecer y regular tasas, sin que el Ayuntamiento pueda crear ex novo un tributo por ordenanza."),
    q("concepto-fuentes", "media",
      "Si la ordenanza contradijera lo dispuesto en una ley estatal sobre horarios comerciales, ¿qué norma prevalecería, conforme a la jerarquía normativa del art. 9.3 CE?",
      ["La ley estatal: el reglamento (y la ordenanza, como reglamento local) es siempre una norma de rango inferior a la ley, y no puede contradecirla",
       "La ordenanza, por ser la norma más próxima y específica del caso concreto",
       "Ninguna: la contradicción entre ley y reglamento no tiene solución jurídica prevista",
       "Prevalecería la que se hubiera aprobado más recientemente, sea cual sea su rango"],
      "El art. 9.3 CE garantiza la jerarquía normativa: por muy específica que sea la ordenanza, al ser reglamento no puede contradecir a la ley (criterio jerárquico, no cronológico ni de especialidad, es el que resuelve este conflicto)."),
    q("concepto-fuentes", "dificil",
      "¿Puede invocarse la «costumbre local» de ocupar la acera sin licencia como fuente que legitime esa ocupación, frente a lo que disponga la futura ordenanza?",
      ["No, o solo con un papel muy limitado y residual: la costumbre solo opera en defecto de norma escrita aplicable y sin poder contradecirla, y el Derecho Administrativo es de vocación eminentemente escrita",
       "Sí, la costumbre tiene en el Derecho Administrativo el mismo peso central que en el Derecho Civil",
       "Sí, siempre que la costumbre tenga más de veinte años de antigüedad acreditada",
       "La costumbre es la única fuente admisible para regular el uso del dominio público local"],
      "El papel de la costumbre en Derecho Administrativo es marginal por el carácter escrito y formalizado de esta rama; en ningún caso puede imponerse frente a una norma escrita aplicable, como sería la propia ordenanza una vez aprobada."),
    q("concepto-fuentes", "media",
      "¿Qué valor tiene la sentencia reiterada del Tribunal Supremo sobre el concepto de terraza que revisa Elvira, según el art. 1.6 del Código Civil?",
      ["Complementa el ordenamiento jurídico con la doctrina que, de modo reiterado, establece el Tribunal Supremo al interpretar y aplicar la ley, sin ser fuente autónoma en el mismo plano que la ley",
       "Tiene el mismo rango que una ley orgánica, pudiendo derogar leyes ordinarias contrarias",
       "Ningún valor jurídico, es meramente orientativa y sin ninguna relevancia práctica",
       "Solo vincula al propio Tribunal Supremo, nunca a la Administración ni a los tribunales inferiores"],
      "La jurisprudencia complementa el ordenamiento (art. 1.6 CC) sin ser fuente autónoma equiparada a la ley; pero eso no significa que carezca de valor: orienta la interpretación y aplicación de la norma, incluida la que haga la Administración."),
    q("concepto-fuentes", "facil",
      "¿Con qué sometimiento debe actuar el Ayuntamiento al elaborar y aplicar la ordenanza, según el art. 103.1 CE?",
      ["Sometimiento pleno a la ley y al Derecho, sirviendo con objetividad los intereses generales",
       "Sometimiento únicamente a sus propios reglamentos internos, sin subordinación a la ley estatal",
       "Ningún sometimiento especial: goza de discrecionalidad absoluta en el ejercicio de sus competencias",
       "Sometimiento exclusivo a las instrucciones políticas del equipo de gobierno municipal"],
      "El art. 103.1 CE consagra el principio de legalidad administrativa: sometimiento pleno (no parcial ni discrecional) a la ley y al Derecho en su conjunto, no solo a normas internas o instrucciones políticas."),
    q("concepto-fuentes", "media",
      "El Alcalde pretende no aplicar un artículo de la ordenanza a un bar amigo suyo mediante un simple decreto singular. ¿Lo permite el principio de inderogabilidad singular de los reglamentos?",
      ["No: ni siquiera un órgano de rango superior al que dictó el reglamento puede dejar de aplicarlo en un caso concreto mediante un acto singular",
       "Sí, siempre que el Alcalde motive suficientemente su decreto",
       "Sí, porque el Alcalde tiene rango jerárquico superior a la propia ordenanza que él mismo propuso",
       "Depende de si el bar afectado presta su consentimiento expreso a la excepción"],
      "La inderogabilidad singular de los reglamentos protege la ordenanza frente a excepciones ad hoc, aunque quien pretenda inaplicarla sea una autoridad de rango superior a quien la dictó: para modificarla haría falta otra ordenanza, no un decreto singular."),
    q("concepto-fuentes", "media",
      "¿Puede la futura ordenanza incluir trámites o requisitos que vayan más allá de lo que permite una ley con rango de ley, si Elvira lo considera oportuno?",
      ["No con carácter general: el reglamento (y la ordenanza como tal) es siempre una norma subordinada a la ley, no puede crear ex novo obligaciones que la ley no contempla ni contradecirla",
       "Sí, la ordenanza puede añadir libremente cualquier requisito adicional que la técnica municipal estime conveniente",
       "Sí, pero solo si el requisito adicional beneficia económicamente al Ayuntamiento",
       "La relación entre ley y ordenanza es de igualdad, ninguna prevalece sobre la otra"],
      "La subordinación del reglamento a la ley impide que una ordenanza «invente» obligaciones o requisitos al margen de lo que la ley permita, coherente con la jerarquía normativa ya vista."),
    q("concepto-fuentes", "dificil",
      "Si existiera una laguna en la ordenanza sobre un supuesto no previsto, ¿qué fuente podría ayudar a resolverla, además de la analogía con otras normas?",
      ["Los principios generales del Derecho, que cumplen una función supletoria en defecto de ley o costumbre aplicable",
       "Ninguna fuente puede suplir una laguna normativa en Derecho Administrativo",
       "Únicamente una nueva ordenanza aprobada con carácter retroactivo",
       "La opinión personal del Alcalde, como máxima autoridad municipal"],
      "Los principios generales del Derecho (buena fe, proporcionalidad, interdicción de la arbitrariedad...) cumplen precisamente esa función supletoria ante lagunas, sin necesidad de esperar a una reforma normativa ni depender de la voluntad de una autoridad concreta."),
    q("concepto-fuentes", "facil",
      "Por encima de la ordenanza, la ley estatal y cualquier otra norma, ¿qué texto preside todo el sistema de fuentes que debe respetar el Ayuntamiento?",
      ["La Constitución, como norma suprema del ordenamiento jurídico",
       "El reglamento orgánico municipal, por ser la norma más cercana al Ayuntamiento",
       "Los tratados internacionales, con preferencia sobre la Constitución",
       "Las circulares internas de la Diputación Provincial"],
      "La Constitución es la primera fuente del Derecho Administrativo (art. 9.1 CE): ninguna otra norma, ni siquiera un tratado internacional, puede situarse por encima de ella en el sistema de fuentes."),
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// TEMA-22 — DPZ Tema 4 (Régimen local español y de Aragón)
// ═══════════════════════════════════════════════════════════════════════
const CASO_TEMA22 = {
  slug: "caso-nuevo-municipio-aragones-competencias",
  titulo: "El caso del nuevo municipio aragonés de Fontanales",
  orden: 1,
  supuesto:
    "Tras un proceso de segregación, se constituye el municipio de Fontanales, en la provincia de Zaragoza. " +
    "Su primer Ayuntamiento debe decidir qué actividades puede promover para satisfacer las necesidades de sus " +
    "vecinos, y descubre que una ley autonómica le atribuye una competencia nueva sin la correspondiente " +
    "memoria económica. Al mismo tiempo, el Ayuntamiento constata que, salvo previsión en contrario, ejerce " +
    "potestades como la reglamentaria o la de investigación de sus bienes desde el primer día, y se plantea si " +
    "puede ejercer una competencia no atribuida expresamente por poner en riesgo la sostenibilidad financiera " +
    "municipal. Por último, la Secretaría del Ayuntamiento debe inscribir la nueva entidad en el registro " +
    "autonómico correspondiente antes de empezar a operar plenamente.",
  preguntas: [
    q("regimen-local-general", "facil",
      "¿Cómo define el art. 1.1 LBRL a los Municipios como el de Fontanales?",
      ["Entidades básicas de la organización territorial del Estado y cauces inmediatos de participación ciudadana, que gestionan con autonomía los intereses propios de su colectividad",
       "Divisiones puramente administrativas, sin autonomía para gestionar sus propios intereses",
       "Delegaciones territoriales de la Comunidad Autónoma de Aragón",
       "Entidades cuya autonomía depende de lo que decida la Diputación Provincial en cada caso"],
      "El art. 1.1 LBRL vincula al municipio dos rasgos: cauce de participación ciudadana y gestión autónoma (no por delegación) de los intereses propios de su comunidad."),
    q("regimen-local-general", "media",
      "¿Con qué finalidad puede el Ayuntamiento de Fontanales promover actividades y prestar servicios públicos, según el art. 25.1 LBRL?",
      ["Para la gestión de sus intereses y en el ámbito de sus competencias, satisfaciendo las necesidades y aspiraciones de la comunidad vecinal",
       "Únicamente cuando se lo delegue expresamente el Estado",
       "Solo en materias no reguladas por ninguna otra Administración",
       "Exclusivamente en materia de urbanismo, con exclusión de cualquier otro ámbito"],
      "El art. 25.1 LBRL formula la cláusula general de actuación municipal: gestión de intereses propios, dentro de sus competencias, al servicio de la comunidad vecinal, sin limitarse a un único ámbito material."),
    q("regimen-local-general", "media",
      "La ley autonómica que atribuye la nueva competencia a Fontanales no viene acompañada de memoria económica. ¿Es eso conforme al art. 7.2 LBRL?",
      ["No exactamente: aunque el art. 7.2 exige que las competencias propias solo se determinen por ley, es el art. 25.4 LBRL el que impone que esa ley vaya acompañada de una memoria económica que refleje el impacto financiero",
       "Sí, la memoria económica es un trámite meramente potestativo que la ley puede omitir libremente",
       "No es relevante, porque la memoria económica solo se exige para las competencias delegadas, nunca para las propias",
       "Es irrelevante siempre que la competencia beneficie a los vecinos de Fontanales"],
      "El art. 25.4 LBRL exige memoria económica para las leyes que atribuyan nuevas competencias propias, con el fin de garantizar la suficiencia financiera de la entidad local que debe asumirlas — un requisito que complementa la exigencia de rango de ley del art. 7.2."),
    q("regimen-local-general", "media",
      "¿Desde cuándo corresponden al Ayuntamiento de Fontanales potestades como la reglamentaria o la de investigación de sus bienes, según el art. 4.1 LBRL?",
      ["Desde su constitución como Entidad Local territorial, en su calidad de Administración Pública de carácter territorial y dentro de la esfera de sus competencias",
       "Solo tras diez años de existencia, como período de consolidación institucional",
       "Solo si la Diputación Provincial se las delega expresamente mediante convenio",
       "Nunca: esas potestades corresponden en exclusiva a la Comunidad Autónoma de Aragón"],
      "El art. 4.1 LBRL atribuye estas potestades administrativas «en todo caso» a los municipios, provincias e islas, sin necesidad de un período de consolidación ni de delegación expresa de otra Administración."),
    q("regimen-local-general", "dificil",
      "¿Puede Fontanales ejercer una competencia distinta de las propias y de las delegadas si ello pone en riesgo la sostenibilidad financiera de la Hacienda municipal, según el art. 7.4 LBRL?",
      ["No: el art. 7.4 LBRL condiciona el ejercicio de competencias «impropias» a que no se ponga en riesgo la sostenibilidad financiera, entre otros requisitos (ausencia de duplicidad, informes previos vinculantes)",
       "Sí, sin ninguna limitación, por tratarse de un municipio de nueva creación",
       "Solo si lo autoriza expresamente el Ministerio de Hacienda, sin más condiciones",
       "Sí, siempre que el Pleno lo apruebe por mayoría absoluta"],
      "El art. 7.4 LBRL, reforma de racionalización de 2013, exige un triple filtro (sostenibilidad financiera, no duplicidad, informes previos) para el ejercicio de competencias no propias ni delegadas — la sostenibilidad financiera es, precisamente, uno de esos límites."),
    q("regimen-local-general", "facil",
      "¿Con qué sometimiento debe actuar el nuevo Ayuntamiento de Fontanales según el art. 6.1 LBRL?",
      ["Sometimiento pleno a la ley y al Derecho, sirviendo con objetividad los intereses públicos que le están encomendados",
       "Sometimiento únicamente a sus propias ordenanzas, sin subordinación a la ley estatal ni autonómica",
       "Sometimiento a las instrucciones de la Diputación Provincial en toda circunstancia",
       "Ningún sometimiento especial: goza de plena discrecionalidad en su actuación"],
      "El art. 6.1 LBRL traslada al ámbito local el mismo principio de legalidad del art. 103.1 CE: sometimiento pleno a la ley y al Derecho."),
    q("administracion-local-aragon", "facil",
      "¿En qué marco organiza la Comunidad Autónoma de Aragón la Administración Local, y en concreto la del nuevo municipio de Fontanales, según el art. 1 de la Ley 7/1999?",
      ["En el marco de la Constitución Española, el Estatuto de Autonomía de Aragón y la legislación básica de régimen local",
       "Con plena libertad, sin sujeción a la legislación básica estatal de régimen local",
       "Únicamente conforme a su propia ley, sin referencia a la Constitución ni al Estatuto",
       "Conforme a lo que decida en cada momento la Diputación Provincial de Zaragoza"],
      "El art. 1 de la Ley 7/1999 sitúa la Administración Local aragonesa dentro de un triple marco (Constitución, Estatuto, legislación básica estatal), no como un régimen autónomo al margen de ellos."),
    q("administracion-local-aragon", "media",
      "¿Qué es Fontanales, como entidad local básica de Aragón, según el art. 2.1 de la Ley 7/1999?",
      ["El municipio, dotado de personalidad jurídica, naturaleza territorial y autonomía para la gestión de sus intereses peculiares",
       "Una entidad dependiente jerárquicamente de la Diputación Provincial de Zaragoza",
       "Un ente sin personalidad jurídica propia hasta que transcurran diez años desde su constitución",
       "Una simple demarcación estadística sin autonomía de gestión"],
      "El art. 2.1 de la Ley 7/1999 reproduce para Aragón el criterio de la LBRL estatal: el municipio, desde su constitución, tiene personalidad jurídica propia y autonomía, sin depender jerárquicamente de la Diputación."),
    q("administracion-local-aragon", "media",
      "¿Qué potestades corresponden a Fontanales como municipio aragonés, según el art. 3.2 de la Ley 7/1999?",
      ["La reglamentaria y de autoorganización, la tributaria y financiera, la de programación, la expropiatoria, la de investigación/deslinde/recuperación de oficio de bienes, la de ejecución forzosa, la sancionadora y la de revisión de oficio",
       "Únicamente la potestad reglamentaria, sin las demás potestades administrativas clásicas",
       "La potestad legislativa, en pie de igualdad con las Cortes de Aragón",
       "Solo las potestades que le delegue expresamente el Gobierno de Aragón, caso por caso"],
      "El art. 3.2 de la Ley 7/1999 reproduce, para el ámbito aragonés, el mismo catálogo de potestades administrativas clásicas que la LBRL reconoce a nivel estatal."),
    q("administracion-local-aragon", "dificil",
      "¿En qué Registro debe inscribirse Fontanales antes de operar plenamente, y qué carácter tienen sus datos, según el art. 6 de la Ley 7/1999?",
      ["En el Registro de entidades locales de Aragón, adscrito al Departamento de Presidencia y Relaciones Institucionales, con datos de libre acceso que sirven de base al mapa local de Aragón",
       "En un registro distinto y propio de cada Diputación Provincial, sin coordinación entre ellos",
       "En el Registro Mercantil, como si se tratara de una entidad de naturaleza privada",
       "No existe obligación de inscripción registral para los municipios de nueva creación"],
      "El art. 6 de la Ley 7/1999 configura un Registro único (no fragmentado por provincias), de acceso libre, adscrito a Presidencia, que constituye la base oficial del mapa local aragonés."),
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// TEMA-20 — DPZ Tema 9 (La provincia y el municipio: organización y competencias)
// ═══════════════════════════════════════════════════════════════════════
const CASO_TEMA20 = {
  slug: "caso-alcaldesa-torreseca-diputacion",
  titulo: "El caso de la alcaldesa de Torreseca y la Diputación",
  orden: 1,
  supuesto:
    "Torreseca es un municipio de 3.200 habitantes de la provincia de Zaragoza. Su alcaldesa, doña Marisol " +
    "Grasa, quiere nombrar una Junta de Gobierno Local, aunque el municipio no supera los 5.000 habitantes. " +
    "Al mismo tiempo, el Pleno debe decidir sobre la alteración del término municipal tras un acuerdo con el " +
    "pueblo vecino, y la Diputación Provincial de Zaragoza le informa de que, al ser Torreseca un municipio de " +
    "menos de 20.000 habitantes, coordinará la prestación de varios servicios básicos y le garantizará, en " +
    "todo caso, los servicios de secretaría e intervención. Además, Torreseca solicita participar en el plan " +
    "provincial de cooperación de la Diputación para renovar el alumbrado público.",
  preguntas: [
    q("municipio-organizacion", "media",
      "¿Puede la alcaldesa Marisol Grasa nombrar una Junta de Gobierno Local aunque Torreseca no supere los 5.000 habitantes, según el art. 20.1.b LBRL?",
      ["Sí: la Junta de Gobierno Local es obligatoria en los municipios de más de 5.000 habitantes, pero en los de menos puede existir si así lo dispone su reglamento orgánico o lo acuerda el Pleno",
       "No, la Junta de Gobierno Local solo puede existir en municipios de más de 5.000 habitantes, sin excepción",
       "Solo podría nombrarla si lo autoriza expresamente la Diputación Provincial",
       "Solo sería posible tras una reforma de la Ley de Bases del Régimen Local"],
      "El art. 20.1.b LBRL fija el umbral de 5.000 habitantes como obligatorio, pero deja la puerta abierta a que los municipios más pequeños, como Torreseca, la constituyan voluntariamente."),
    q("municipio-organizacion", "facil",
      "¿A quién corresponde el gobierno y la administración de Torreseca, y quién puede ser Alcalde, según el art. 19 LBRL?",
      ["Al ayuntamiento, integrado por el Alcalde y los Concejales; el Alcalde es elegido por los Concejales o por los vecinos, según la legislación electoral general",
       "A la Diputación Provincial de Zaragoza, de la que Torreseca depende jerárquicamente",
       "Al Gobierno de Aragón, por tratarse de un municipio pequeño",
       "A una Asamblea vecinal, en todo caso, con independencia del tamaño del municipio"],
      "El art. 19 LBRL atribuye el gobierno municipal al Ayuntamiento (Alcalde y Concejales), sin subordinación jerárquica a la Diputación ni al Gobierno de Aragón."),
    q("municipio-organizacion", "media",
      "¿Qué órgano es competente para decidir sobre la alteración del término municipal de Torreseca tras el acuerdo con el pueblo vecino, según el art. 22.2.b LBRL?",
      ["El Pleno municipal, al que corresponden en todo caso los acuerdos relativos a la alteración del término municipal",
       "La alcaldesa, por decreto, sin necesidad de acuerdo plenario",
       "La Junta de Gobierno Local, por delegación automática del Pleno",
       "El Gobierno de Aragón, sin intervención del Ayuntamiento de Torreseca"],
      "El art. 22.2.b LBRL reserva al Pleno, entre otros acuerdos de especial trascendencia, la alteración del término municipal — una competencia indelegable en la Junta de Gobierno ni en la Alcaldía."),
    q("municipio-competencias", "media",
      "Torreseca tiene menos de 5.000 habitantes. ¿Qué servicios mínimos debe prestar en todo caso según el art. 26.1.a LBRL?",
      ["Alumbrado público, cementerio, recogida de residuos, limpieza viaria, abastecimiento domiciliario de agua potable, alcantarillado, acceso a los núcleos de población y pavimentación de las vías públicas",
       "Transporte colectivo urbano de viajeros y medio ambiente urbano",
       "Protección civil y prevención de incendios",
       "Parque público y biblioteca pública"],
      "El art. 26.1.a LBRL fija el catálogo mínimo universal, exigible a cualquier municipio con independencia de su población; los servicios adicionales del resto del art. 26.1 solo se exigen a partir de determinados tramos de población."),
    q("municipio-competencias", "dificil",
      "La Diputación coordinará la prestación de varios servicios básicos en Torreseca, por tener menos de 20.000 habitantes. ¿Qué prevé el art. 26.2 LBRL al respecto?",
      ["Que la Diputación provincial o entidad equivalente coordinará servicios como la recogida de residuos, el abastecimiento de agua o la limpieza viaria, sin perjuicio de que el municipio pueda asumirlos si justifica un coste menor",
       "Que la Diputación sustituye por completo al Ayuntamiento en la prestación de todos sus servicios",
       "Que Torreseca queda exento de prestar cualquier servicio mínimo mientras dure la coordinación provincial",
       "Que la coordinación solo es posible si lo solicita expresamente la Comunidad Autónoma de Aragón"],
      "El art. 26.2 LBRL no sustituye al municipio, coordina la prestación de ciertos servicios en los municipios pequeños, dejando abierta la posibilidad de que el propio municipio la asuma si acredita mayor eficiencia."),
    q("provincia-organizacion", "facil",
      "¿Cómo define el art. 31.1 LBRL a la Diputación Provincial de Zaragoza, de la que depende en parte la coordinación de Torreseca?",
      ["Es el órgano de gobierno y administración autónoma de la Provincia, entidad local determinada por la agrupación de Municipios, con personalidad jurídica propia",
       "Es un órgano periférico dependiente jerárquicamente de la Administración General del Estado",
       "Es un organismo consultivo sin capacidad de decisión propia",
       "Es una entidad privada de utilidad pública, sin naturaleza de Administración"],
      "El art. 31.1 LBRL constituye a la Provincia (gobernada por la Diputación) como entidad local de pleno derecho, con personalidad jurídica y capacidad propias, no como un órgano periférico estatal ni una entidad privada."),
    q("provincia-competencias", "media",
      "¿Qué debe garantizar en todo caso la Diputación en los municipios de menos de 1.000 habitantes según el art. 36.1.b LBRL? (Torreseca, con 3.200, no llega a este umbral, pero sí se beneficia de la asistencia general que este mismo artículo prevé)",
      ["La prestación de los servicios de secretaría e intervención en los municipios de menos de 1.000 habitantes, y con carácter general la asistencia y cooperación jurídica, económica y técnica a los municipios de menor capacidad",
       "La gestión íntegra del presupuesto de cualquier municipio de la provincia, sustituyendo al Ayuntamiento",
       "La designación directa del Alcalde en los municipios pequeños",
       "Ninguna obligación de asistencia: cada municipio debe procurarse sus propios medios"],
      "El art. 36.1.b LBRL fija secretaría e intervención (funciones de habilitación nacional) como el mínimo garantizado en los municipios de menos de 1.000 habitantes, dentro de una asistencia más general a los municipios de menor capacidad, categoría en la que puede encajar Torreseca."),
    q("provincia-competencias", "media",
      "¿Qué instrumento debe aprobar anualmente la Diputación para el plan de cooperación al que quiere acogerse Torreseca para renovar su alumbrado, según el art. 36.2.a LBRL?",
      ["Un plan provincial de cooperación a las obras y servicios de competencia municipal, en cuya elaboración deben participar los municipios de la provincia",
       "Un presupuesto único que sustituye a los presupuestos de cada municipio",
       "Un decreto de intervención directa sobre los servicios deficitarios de cada municipio",
       "Un informe anual remitido únicamente al Tribunal de Cuentas, sin efectos sobre los municipios"],
      "El art. 36.2.a LBRL exige que el plan provincial de cooperación se elabore con participación municipal, incluyendo una memoria justificativa de objetivos y criterios de reparto de fondos — el cauce natural para que Torreseca solicite financiación para su alumbrado."),
    q("provincia-competencias", "facil",
      "¿Qué principio general inspira la actuación de la Diputación respecto a municipios pequeños como Torreseca, según el art. 31.2 LBRL?",
      ["Garantizar los principios de solidaridad y equilibrio intermunicipales, asegurando la prestación integral de los servicios municipales en todo el territorio provincial",
       "Sustituir por completo a los municipios pequeños en el ejercicio de todas sus competencias",
       "Ejercer la tutela financiera exclusiva sobre los presupuestos autonómicos",
       "Legislar en materia de régimen local dentro de su territorio, en pie de igualdad con las Cortes de Aragón"],
      "El art. 31.2 LBRL centra la razón de ser de la Provincia en la solidaridad y el equilibrio entre municipios de distinto tamaño y capacidad, no en sustituirlos ni en asumir funciones legislativas."),
    q("municipio-organizacion", "dificil",
      "Si Torreseca decidiera constituir la Junta de Gobierno Local, ¿cómo se integraría según el art. 23.1 LBRL?",
      ["Por la alcaldesa y un número de Concejales no superior al tercio del número legal de los mismos, nombrados y separados libremente por ella, dando cuenta al Pleno",
       "Por todos los Concejales del Ayuntamiento, sin excepción",
       "Por los portavoces de cada grupo político, en proporción exacta a su representación",
       "Por Concejales elegidos directamente por los vecinos en una votación específica"],
      "El art. 23.1 LBRL fija el límite de un tercio y el libre nombramiento/cese por la Alcaldía, con el único requisito de dar cuenta al Pleno, sin exigir representación proporcional de los grupos políticos ni elección directa vecinal."),
  ],
};

for (const caso of [
  { tema: "tema-1", data: CASO_TEMA1 },
  { tema: "tema-21", data: CASO_TEMA21 },
  { tema: "tema-22", data: CASO_TEMA22 },
  { tema: "tema-20", data: CASO_TEMA20 },
]) {
  await crearCaso(caso.tema, caso.data);
}
console.log("✔ Casos prácticos (parte 1 de 2) sembrados: temas 1, 21, 22, 20.");
