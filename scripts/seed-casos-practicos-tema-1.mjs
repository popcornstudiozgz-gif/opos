/**
 * Casos prácticos — Tema 1 (Constitución Española). Primer intento del
 * feature: 4 casos de 10 preguntas cada uno (criterio acordado con el
 * usuario: volumen real de un caso práctico de examen), cada uno centrado
 * en un bloque distinto de la CE para no solapar contenido:
 *   1. Derechos fundamentales y sus garantías (Título I, cap. 1/2/4/5)
 *   2. La Corona y las Cortes Generales (Título II y III)
 *   3. El Gobierno: investidura, decreto-ley y moción de censura (Título III/IV/V)
 *   4. La organización territorial del Estado (Título VIII y IX)
 *
 * A diferencia de `seed-preguntas-tema-*.mjs`, aquí cada pregunta pertenece
 * a UN caso y se inserta en `caso_preguntas` con su `orden`: no son hechos
 * sueltos, dan por conocido el supuesto y a veces la respuesta anterior.
 * Las preguntas y sus opciones viven en las mismas tablas `preguntas`/
 * `opciones` que el test suelto (misma `seccion` que ya usan las
 * flashcards/preguntas de ese tramo del articulado).
 *
 * Uso: node --env-file=.env.local scripts/seed-casos-practicos-tema-1.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

const TEMA = "tema-1";
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
// CASO 1 — Derechos fundamentales y sus garantías
// ═══════════════════════════════════════════════════════════════════════
const CASO_1 = {
  slug: "caso-derechos-fundamentales-manifestacion",
  titulo: "El caso de la manifestación prohibida",
  orden: 1,
  supuesto:
    "Kseniya Ivánova es ciudadana ucraniana, residente legal en Zaragoza desde hace tres años. Junto con la " +
    "asociación vecinal «Voces del Ebro», convoca una concentración pacífica en la Plaza del Pilar para protestar " +
    "por el cierre de una escuela pública, y lo comunica a la Subdelegación del Gobierno con diez días de " +
    "antelación. Dos días antes de la fecha prevista, la Subdelegación dicta una resolución prohibiendo la " +
    "concentración, alegando de forma genérica «riesgo para el orden público», sin motivar ningún peligro " +
    "concreto para personas o bienes. Kseniya decide recurrir. Mientras tanto, un periódico local publica una " +
    "columna muy crítica con la Subdelegación, y esta se plantea si puede exigir su retirada antes de que " +
    "circule. Semanas después, unos graves disturbios en la provincia llevan al Gobierno a declarar el estado " +
    "de excepción, dentro del cual se investiga a varias personas por su relación con una organización armada.",
  preguntas: [
    q("titulo-1-cap-1", "media",
      "¿Es Kseniya, como ciudadana extranjera, titular del derecho de reunión pacífica del art. 21 CE?",
      ["Sí: los extranjeros gozan en España de las libertades del Título I en los términos que fijen los tratados y la ley, y el derecho de reunión pacífica y sin armas se reconoce sin necesidad de autorización",
       "No: el art. 13 CE reserva los derechos fundamentales exclusivamente a quienes tengan la nacionalidad española",
       "Solo si es nacional de un Estado miembro de la Unión Europea",
       "Solo si obtiene una autorización administrativa expresa que la habilite para ejercer derechos fundamentales"],
      "Art. 13.1 CE: los extranjeros gozarán en España de las libertades públicas que garantiza el Título I en los términos que establezcan los tratados y la ley. El derecho de reunión (art. 21 CE) no exige nacionalidad española, y su ejercicio pacífico y sin armas no requiere autorización."),
    q("titulo-1-cap-2", "facil",
      "¿Qué exige el art. 21.2 CE a quienes convocan una reunión o manifestación en lugares de tránsito público?",
      ["Comunicación previa a la autoridad, que solo podrá prohibirla cuando existan razones fundadas de alteración del orden público con peligro para personas o bienes",
       "Autorización administrativa previa y expresa de la autoridad gubernativa",
       "Comunicación previa y aprobación posterior del ayuntamiento donde vaya a celebrarse",
       "Ningún trámite: ni siquiera es necesario comunicarlo con antelación"],
      "El art. 21.2 CE distingue reunión de manifestación en tránsito público (exige comunicación previa, no autorización) de la simple reunión en lugar cerrado o no público (que ni eso exige). La prohibición es la excepción, y exige razones fundadas y motivadas."),
    q("titulo-1-cap-2", "media",
      "La resolución de la Subdelegación se limita a invocar genéricamente «riesgo para el orden público», sin precisar ningún peligro concreto. ¿Es eso conforme al art. 21.2 CE?",
      ["No: el precepto exige razones fundadas de alteración del orden público con peligro para personas o bienes, no una invocación genérica y no motivada",
       "Sí: basta con citar el orden público como causa, sin necesidad de mayor motivación",
       "Sí, siempre que la resolución se dicte por escrito y dentro de plazo",
       "No, pero solo porque Kseniya es extranjera; para un ciudadano español bastaría la mención genérica"],
      "El Tribunal Constitucional exige que la prohibición esté motivada en indicios racionales de que puedan producirse alteraciones del orden público con peligro para personas o bienes; una fórmula genérica y no razonada no cumple esa exigencia."),
    q("titulo-1-cap-4", "media",
      "¿Qué vía ofrece el art. 53.2 CE a Kseniya para reaccionar con carácter preferente y urgente frente a esa prohibición?",
      ["Un procedimiento basado en los principios de preferencia y sumariedad ante los tribunales ordinarios y, en su caso, el recurso de amparo ante el Tribunal Constitucional",
       "El recurso de inconstitucionalidad ante el Tribunal Constitucional",
       "Una cuestión de inconstitucionalidad planteada por el juez que conozca del asunto",
       "El recurso contencioso-administrativo ordinario, sin ningún trato preferente"],
      "El art. 53.2 CE reserva esa doble garantía (proceso preferente y sumario, más amparo) a los derechos del art. 14 y la Sección 1ª del Capítulo II del Título I. El recurso de inconstitucionalidad es un control de leyes, no de actos administrativos, y la cuestión de inconstitucionalidad la plantea un juez, no el ciudadano."),
    q("titulo-1-cap-4", "dificil",
      "Si Kseniya agota la vía judicial ordinaria sin éxito y acude al Tribunal Constitucional, ¿puede fundamentar su recurso de amparo en la vulneración del art. 21 CE?",
      ["Sí: el derecho de reunión del art. 21 CE está dentro de la Sección 1ª del Capítulo II del Título I (arts. 15 a 29), que es precisamente la protegida por el recurso de amparo",
       "No: el amparo solo protege el art. 14 (igualdad), no el resto de derechos del Título I",
       "No: el derecho de reunión pertenece a la Sección 2ª (deberes de los ciudadanos), fuera del ámbito del amparo",
       "Solo podría fundamentarlo si el Defensor del Pueblo hubiera dictaminado antes en su favor"],
      "El art. 21 CE cae dentro del rango 15-29 (Sección 1ª), amparado junto con el art. 14. La Sección 2ª (arts. 30-38, deberes y otros derechos de los ciudadanos) no goza de esa garantía reforzada."),
    q("titulo-1-cap-2", "facil",
      "Sobre la columna del periódico crítica con la Subdelegación: ¿puede la Administración exigir su retirada antes de que se publique?",
      ["No: el art. 20.2 CE prohíbe expresamente cualquier tipo de censura previa",
       "Sí, si considera que el contenido puede alterar el orden público",
       "Sí, mediante una autorización previa del Delegado del Gobierno",
       "Solo si el periódico ha sido sancionado anteriormente por hechos similares"],
      "El art. 20.2 CE es tajante: «El ejercicio de estos derechos no puede restringirse mediante ningún tipo de censura previa». La única reacción posible frente a un contenido ilícito es a posteriori, por los cauces legales."),
    q("titulo-1-cap-4", "facil",
      "El Defensor del Pueblo decide intervenir de oficio en el caso de Kseniya. ¿En qué se fundamenta constitucionalmente su actuación?",
      ["En el art. 54 CE: es un alto comisionado de las Cortes Generales, designado por estas para la defensa de los derechos del Título I, y puede supervisar la actividad de la Administración",
       "En el art. 53.2 CE, como una instancia previa obligatoria antes de acudir a los tribunales",
       "En el art. 124 CE, como órgano dependiente del Ministerio Fiscal",
       "No tiene fundamento constitucional expreso: su existencia depende solo de una ley ordinaria"],
      "El art. 54 CE constitucionaliza la institución del Defensor del Pueblo como comisionado de las Cortes para la defensa de los derechos del Título I, con función de supervisión de la Administración, no como filtro previo obligatorio ni como órgano del Ministerio Fiscal."),
    q("titulo-1-cap-5", "media",
      "Declarado el estado de excepción, ¿qué derecho de los siguientes SÍ puede ser objeto de suspensión conforme al art. 55.1 CE?",
      ["El derecho de reunión del art. 21 CE",
       "El derecho a la vida y la prohibición de tortura del art. 15 CE",
       "El derecho a la tutela judicial efectiva del art. 24 CE",
       "El principio de legalidad penal del art. 25 CE"],
      "El art. 55.1 CE enumera de forma tasada los derechos suspendibles en excepción o sitio (entre otros, arts. 17, 18.2 y 3, 19, 20.1.a y d y 20.5, 21 y 28.2). Derechos como el art. 15 (vida, integridad), el art. 24 (tutela judicial) o el art. 25 (legalidad penal) no figuran en esa lista y no pueden suspenderse nunca, ni siquiera en estado de sitio."),
    q("titulo-1-cap-5", "dificil",
      "Al investigar a personas por su relación con una organización armada, ¿puede el Gobierno suspender individualmente algunos derechos de esas personas concretas sin necesidad de declarar el estado de excepción?",
      ["Sí: el art. 55.2 CE permite la suspensión individual (no general) de los derechos de los arts. 17.2 y 18.2 y 3 para personas determinadas, en investigaciones sobre bandas armadas o terroristas, con intervención judicial y control parlamentario",
       "No: la única vía para suspender cualquier derecho es la declaración previa del estado de excepción o de sitio",
       "Sí, y de forma indefinida, mientras dure la investigación, sin necesidad de intervención judicial",
       "Sí, pero solo el Congreso de los Diputados puede acordarlo, nunca el Gobierno"],
      "El art. 55.2 CE prevé un régimen distinto y más limitado que el 55.1: suspensión individual, no general, de un catálogo de derechos más reducido, exigiendo necesaria intervención judicial y control parlamentario de la actuación gubernativa."),
    q("titulo-5", "media",
      "Al margen de la suspensión de derechos, ¿queda alterada la responsabilidad del Gobierno y de sus agentes por haberse declarado el estado de excepción?",
      ["No: el art. 116.6 CE establece expresamente que la declaración de los estados de alarma, excepción y sitio no modifica el principio de responsabilidad del Gobierno y de sus agentes reconocido en la Constitución y las leyes",
       "Sí: durante el estado de excepción el Gobierno y sus agentes quedan exentos de responsabilidad por los actos relacionados con este",
       "Sí, pero solo respecto a la responsabilidad penal, no a la civil ni a la disciplinaria",
       "Depende de si la declaración la ha autorizado o no el Congreso de los Diputados"],
      "El art. 116.6 CE cierra el régimen de los estados excepcionales garantizando que, pese a la suspensión de derechos, el control sobre la actuación del Gobierno y sus agentes se mantiene intacto."),
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// CASO 2 — La Corona y las Cortes Generales
// ═══════════════════════════════════════════════════════════════════════
const CASO_2 = {
  slug: "caso-corona-regencia-inmunidad",
  titulo: "El caso de la Regencia y la inmunidad parlamentaria",
  orden: 2,
  supuesto:
    "El Rey sufre un grave problema de salud que le incapacita temporalmente para el ejercicio de su autoridad. " +
    "El Príncipe heredero, hijo del Rey, es menor de edad, y el padre del Rey falleció años atrás. Las Cortes " +
    "Generales deben pronunciarse sobre la situación institucional. Mientras tanto, el Congreso tramita con " +
    "urgencia un proyecto de ley de protección civil remitido por el Gobierno. El día señalado para la votación " +
    "final, uno de los diputados de la Cámara, don Marcos Aliende, es detenido por la Guardia Civil cuando se " +
    "dirigía a votar, acusado de un presunto delito de desórdenes públicos que se le atribuye del día anterior, " +
    "cometido fuera del recinto parlamentario y sin relación con su actividad como diputado. El Presidente del " +
    "Congreso debe decidir cómo proceder.",
  preguntas: [
    q("titulo-2", "media",
      "¿Quién debe reconocer que el Rey está inhabilitado para el ejercicio de su autoridad antes de que pueda abrirse la Regencia?",
      ["Las Cortes Generales (art. 59.2 CE)",
       "El Gobierno, mediante acuerdo del Consejo de Ministros",
       "El propio Presidente del Congreso, de forma unilateral",
       "El Tribunal Constitucional, mediante sentencia"],
      "El art. 59.2 CE exige que la imposibilidad del Rey «fuere reconocida por las Cortes Generales»: no basta la apreciación del Gobierno ni de un solo órgano de una Cámara."),
    q("titulo-2", "dificil",
      "Reconocida la inhabilitación y siendo el Príncipe heredero menor de edad, sin que vivan ya el padre ni la madre del Rey, ¿a quién corresponde ejercer la Regencia?",
      ["Al pariente mayor de edad más próximo a suceder en la Corona, según el orden sucesorio (arts. 59.1 y 59.2 CE)",
       "Al Presidente del Gobierno, en funciones de Jefe del Estado interino",
       "Al Presidente del Congreso de los Diputados, mientras dure la incapacidad",
       "A un Consejo de Regencia de composición libremente decidida por las Cortes, al no existir Príncipe heredero mayor de edad"],
      "El art. 59.2 CE remite, cuando el heredero es menor de edad, «a la manera prevista en el apartado anterior»: el 59.1 llama al padre o la madre del Rey y, en su defecto, al pariente mayor de edad más próximo a suceder. Solo si no hubiera ninguna persona a quien corresponda la Regencia la nombrarían las Cortes (art. 59.3 CE), que no es el caso aquí."),
    q("titulo-2", "facil",
      "¿En nombre de quién se ejerce siempre la Regencia, sea cual sea la persona o personas que la ostenten?",
      ["Siempre en nombre del Rey (art. 59.5 CE)",
       "En nombre de las Cortes Generales, que la han reconocido",
       "En nombre propio del Regente, con plenas facultades",
       "En nombre del pueblo español, como titular de la soberanía"],
      "El art. 59.5 CE es claro: «La Regencia se ejercerá por mandato constitucional y siempre en nombre del Rey»."),
    q("titulo-2", "media",
      "¿Qué requisitos exige el art. 59.4 CE para poder ejercer la Regencia?",
      ["Ser español y mayor de edad",
       "Ser español de nacimiento y pertenecer a la Familia Real",
       "Ser mayor de edad, sin exigirse la nacionalidad española",
       "Contar con la confirmación expresa del Congreso de los Diputados en cada caso"],
      "El art. 59.4 CE dice literalmente: «Para ejercer la Regencia es preciso ser español y mayor de edad»."),
    q("titulo-2", "facil",
      "Cuando el Regente se hace cargo de sus funciones, ¿qué debe prestar ante las Cortes Generales?",
      ["El mismo juramento que el Rey (fidelidad a la Constitución y las leyes, y respeto a los derechos de ciudadanos y Comunidades Autónomas), más el juramento de fidelidad al Rey",
       "Únicamente un juramento de fidelidad personal al Rey, sin mención a la Constitución",
       "Ningún juramento: la Regencia se ejerce sin necesidad de acto formal alguno",
       "Un juramento distinto, regulado por ley ordinaria y no por la Constitución"],
      "El art. 61.2 CE extiende al Regente o Regentes, al hacerse cargo de sus funciones, el mismo juramento que presta el Rey conforme al art. 61.1, añadiendo el de fidelidad al Rey."),
    q("titulo-3-cap-2", "facil",
      "El proyecto de ley de protección civil llega al Congreso remitido por el Gobierno. ¿Cómo se llama este tipo de iniciativa legislativa, frente a la que parte de las propias Cámaras?",
      ["Proyecto de ley, por contraposición a las proposiciones de ley, de iniciativa parlamentaria (arts. 87 y 88 CE)",
       "Proposición de ley, igual que si la presentara un grupo parlamentario",
       "Real Decreto Legislativo, por tratarse de una delegación del Gobierno",
       "Iniciativa legislativa popular, al tramitarse con carácter urgente"],
      "El art. 88 CE reserva el nombre de «proyectos de ley» a los aprobados por el Consejo de Ministros y remitidos al Congreso; las que parten de las Cámaras, de las Comunidades Autónomas o de la iniciativa popular se llaman «proposiciones de ley» (art. 87 CE)."),
    q("titulo-3-cap-1", "media",
      "Don Marcos Aliende es detenido cuando se dirigía a votar, por un delito que no fue flagrante y sin autorización previa de la Cámara. ¿Es correcta esa detención conforme al art. 71.2 CE?",
      ["No: durante su mandato, los Diputados solo pueden ser detenidos en caso de flagrante delito, y no pueden ser inculpados ni procesados sin la previa autorización de la Cámara respectiva",
       "Sí: la inmunidad parlamentaria solo protege frente al procesamiento, nunca frente a la detención",
       "Sí, porque el hecho investigado es ajeno a su actividad como diputado",
       "No, pero solo porque ocurrió el día antes de una votación; en cualquier otro momento sí sería válida"],
      "El art. 71.2 CE protege frente a la detención (salvo flagrancia) y frente al procesamiento sin autorización de la Cámara —el llamado «suplicatorio»—, durante todo el mandato y con independencia de si el hecho tiene relación con su función parlamentaria."),
    q("titulo-3-cap-1", "media",
      "Si finalmente la Cámara autoriza su procesamiento, ¿qué órgano es competente para juzgar la causa contra don Marcos Aliende?",
      ["La Sala de lo Penal del Tribunal Supremo (art. 71.3 CE)",
       "La Audiencia Provincial correspondiente a su circunscripción electoral",
       "El Tribunal Constitucional, por afectar a un cargo público representativo",
       "Un juzgado de instrucción ordinario, como a cualquier otro ciudadano"],
      "El art. 71.3 CE atribuye un fuero especial: «En las causas contra Diputados y Senadores será competente la Sala de lo Penal del Tribunal Supremo»."),
    q("titulo-3-cap-1", "dificil",
      "La inviolabilidad del art. 71.1 CE, a diferencia de la inmunidad del art. 71.2, ¿a qué alcanza exactamente?",
      ["A las opiniones manifestadas por el Diputado en el ejercicio de sus funciones, sin extenderse a hechos delictivos ajenos a esa actividad, como el que se imputa a Marcos Aliende",
       "A cualquier delito cometido por el Diputado durante su mandato, incluidos los ajenos a su actividad parlamentaria",
       "Únicamente a la protección frente a la detención, igual que la inmunidad",
       "A las opiniones manifestadas dentro o fuera del ejercicio de sus funciones, sin límite temporal ni material"],
      "La inviolabilidad (art. 71.1 CE) cubre las opiniones vertidas en el ejercicio de la función parlamentaria (votos, discursos); la inmunidad (art. 71.2 CE) es la que protege frente a detención y procesamiento por cualquier hecho, con los límites vistos. Son garantías distintas y complementarias."),
    q("titulo-2", "facil",
      "Aprobado finalmente el proyecto de ley de protección civil por el Congreso y el Senado, ¿a quién corresponde sancionarlo y promulgarlo?",
      ["Al Rey (art. 62.a CE), como acto debido, sin que suponga una facultad de veto",
       "Al Presidente del Gobierno, que lo remite después al Rey solo para su conocimiento",
       "Al Presidente del Congreso, como representante de la Cámara que inició la tramitación",
       "Al Tribunal Constitucional, con carácter previo a su entrada en vigor"],
      "El art. 62.a CE atribuye al Rey sancionar y promulgar las leyes; es un acto reglado y debido, refrendado por el Presidente del Gobierno o el Ministro competente (art. 64 CE), sin margen de veto."),
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// CASO 3 — El Gobierno: investidura, decreto-ley y moción de censura
// ═══════════════════════════════════════════════════════════════════════
const CASO_3 = {
  slug: "caso-investidura-decreto-ley-mocion-censura",
  titulo: "El caso de la investidura fallida",
  orden: 3,
  supuesto:
    "Tras unas elecciones generales, ningún partido obtiene mayoría absoluta. El Rey, tras las consultas " +
    "previstas en la Constitución, propone como candidata a la Presidencia del Gobierno a doña Elena Bardaxí, " +
    "líder del partido más votado. En la primera votación de investidura, Bardaxí no logra la mayoría necesaria. " +
    "Dos días después se repite la votación. Mientras tanto, unas graves inundaciones afectan a varias " +
    "provincias, y el Gobierno en funciones aprueba un decreto-ley de ayudas urgentes a los damnificados. " +
    "Meses después de constituido el nuevo Gobierno, un grupo parlamentario presenta una moción de censura " +
    "contra la Presidenta Bardaxí, proponiendo como candidato alternativo a don Ricardo Solans.",
  preguntas: [
    q("titulo-4", "facil",
      "Antes de proponer un candidato a la Presidencia del Gobierno, ¿qué trámite exige el art. 99.1 CE al Rey?",
      ["Consultar previamente con los representantes designados por los grupos políticos con representación parlamentaria, a través del Presidente del Congreso",
       "Convocar un referéndum consultivo entre la ciudadanía",
       "Solicitar un informe vinculante al Tribunal Constitucional",
       "Consultar únicamente con el partido más votado, sin necesidad de oír a los demás grupos"],
      "El art. 99.1 CE exige la consulta previa a los representantes de todos los grupos con representación parlamentaria, canalizada a través del Presidente del Congreso."),
    q("titulo-4", "facil",
      "¿Qué mayoría necesita Bardaxí para obtener la confianza del Congreso en la primera votación de investidura?",
      ["Mayoría absoluta de los votos (art. 99.3 CE)",
       "Mayoría simple de los votos",
       "Dos tercios de los votos del Congreso",
       "Mayoría absoluta del Congreso y del Senado conjuntamente"],
      "El art. 99.3 CE exige mayoría absoluta en la primera votación; solo si no se alcanza se pasa a una segunda votación cuarenta y ocho horas después."),
    q("titulo-4", "media",
      "Al no obtener mayoría absoluta, se repite la votación 48 horas después. ¿Qué mayoría basta en esa segunda votación?",
      ["Mayoría simple (art. 99.3 CE)",
       "Mayoría absoluta, igual que en la primera",
       "Mayoría de dos tercios, al ser una segunda votación",
       "No cabe una segunda votación: si falla la primera, se disuelven las Cámaras directamente"],
      "El art. 99.3 CE rebaja la exigencia en la segunda votación: basta la mayoría simple para otorgar la confianza."),
    q("titulo-4", "media",
      "Si ni siquiera en la segunda votación se otorgase la confianza a ningún candidato, ¿qué ocurre transcurrido el plazo previsto desde la primera votación?",
      ["El Rey disolverá ambas Cámaras y convocará nuevas elecciones, con el refrendo del Presidente del Congreso; el plazo es de dos meses desde la primera votación (art. 99.5 CE)",
       "El Gobierno en funciones continúa indefinidamente hasta que se investiga a un candidato, sin plazo máximo",
       "Las Cortes designan directamente un Presidente del Gobierno por mayoría simple, sin necesidad de investidura",
       "El Tribunal Constitucional nombra un Gobierno de gestión hasta las siguientes elecciones"],
      "El art. 99.5 CE fija un plazo máximo de dos meses desde la primera votación de investidura: agotado sin éxito, procede la disolución automática de las Cámaras."),
    q("titulo-3-cap-2", "facil",
      "El Gobierno en funciones aprueba un decreto-ley de ayudas por las inundaciones. ¿En qué circunstancia habilita el art. 86.1 CE a dictar este tipo de norma?",
      ["En caso de extraordinaria y urgente necesidad",
       "Siempre que exista una delegación previa expresa de las Cortes Generales",
       "Únicamente durante los períodos en que las Cortes están disueltas",
       "En cualquier momento y para cualquier materia, sin necesidad de justificar urgencia"],
      "El art. 86.1 CE reserva el decreto-ley a los casos de extraordinaria y urgente necesidad; no equivale a la delegación legislativa (que da lugar a decretos legislativos, art. 82 CE) ni depende de que las Cortes estén disueltas."),
    q("titulo-3-cap-2", "dificil",
      "¿Podría ese mismo decreto-ley, además de las ayudas, suspender temporalmente algún derecho del Título I para agilizar la reconstrucción de las zonas afectadas?",
      ["No: el art. 86.1 CE excluye expresamente de los decretos-leyes los derechos, deberes y libertades de los ciudadanos regulados en el Título I, además de las instituciones básicas del Estado, el régimen de las Comunidades Autónomas y el Derecho electoral general",
       "Sí, siempre que se convalide después por el Congreso dentro de los treinta días",
       "Sí, si la urgencia está suficientemente justificada en la exposición de motivos",
       "Sí, pero solo respecto a derechos del Capítulo III (principios rectores), no del Capítulo II"],
      "La exclusión del art. 86.1 CE opera con independencia de la convalidación posterior o de lo motivada que esté la urgencia: hay materias vedadas al decreto-ley en cualquier caso."),
    q("titulo-3-cap-2", "media",
      "Publicado el decreto-ley, ¿qué trámite es obligatorio en el Congreso dentro de los treinta días siguientes a su promulgación?",
      ["Su convalidación o derogación expresa, mediante debate y votación de totalidad (art. 86.2 CE)",
       "Su ratificación por el Senado, sin intervención del Congreso",
       "Su remisión al Tribunal Constitucional para un control previo de constitucionalidad",
       "Ningún trámite: el decreto-ley entra en vigor de forma definitiva desde su publicación"],
      "El art. 86.2 CE obliga a que el Congreso se pronuncie expresamente sobre la convalidación o derogación del decreto-ley dentro de los treinta días siguientes a su promulgación, mediante un debate y votación de totalidad."),
    q("titulo-5", "media",
      "Meses después, se presenta una moción de censura contra la Presidenta Bardaxí proponiendo a Solans como candidato alternativo. ¿Qué exige el art. 113.2 CE sobre su presentación?",
      ["Debe ser propuesta al menos por la décima parte de los Diputados, y ha de incluir un candidato a la Presidencia del Gobierno (moción de censura «constructiva»)",
       "Puede presentarla cualquier Diputado a título individual, sin necesidad de más firmas",
       "Debe ser propuesta por la mayoría absoluta del Congreso desde el primer momento",
       "No es necesario proponer candidato alternativo alguno, basta con censurar la gestión del Gobierno"],
      "El art. 113.2 CE exige la firma de al menos una décima parte de los Diputados y, a diferencia de otros sistemas parlamentarios, obliga a incluir un candidato alternativo: es la llamada moción de censura «constructiva»."),
    q("titulo-5", "facil",
      "¿Qué mayoría se necesita para que la moción de censura contra Bardaxí prospere?",
      ["Mayoría absoluta del Congreso de los Diputados (art. 113.1 CE)",
       "Mayoría simple del Congreso de los Diputados",
       "Mayoría absoluta conjunta del Congreso y el Senado",
       "Dos tercios del Congreso de los Diputados"],
      "El art. 113.1 CE exige mayoría absoluta del Congreso para que la moción de censura prospere y, con ella, sea investido automáticamente el candidato alternativo propuesto."),
    q("titulo-5", "media",
      "Si la moción de censura contra Bardaxí no prospera, ¿pueden sus firmantes presentar otra moción de censura durante el mismo período de sesiones?",
      ["No: los signatarios de una moción de censura rechazada no podrán presentar otra durante el mismo período de sesiones (art. 113.4 CE)",
       "Sí, tantas veces como consideren oportuno dentro del mismo período de sesiones",
       "Sí, pero solo transcurrido un mes desde el rechazo de la anterior",
       "Sí, siempre que cambien de candidato alternativo"],
      "El art. 113.4 CE limita expresamente la reiteración de mociones de censura por los mismos firmantes dentro del mismo período de sesiones, para evitar un uso puramente desgastante del instrumento."),
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// CASO 4 — La organización territorial del Estado
// ═══════════════════════════════════════════════════════════════════════
const CASO_4 = {
  slug: "caso-organizacion-territorial-deva-robledal",
  titulo: "El caso de Deva-Robledal: una nueva Comunidad Autónoma",
  orden: 4,
  supuesto:
    "Deva y Robledal son dos provincias limítrofes, con características históricas, culturales y económicas " +
    "comunes, integradas actualmente en la Comunidad Autónoma de Ostralia junto con otras tres provincias. Sus " +
    "Diputaciones Provinciales, junto con las dos terceras partes de los municipios de cada provincia cuya " +
    "población representa la mayoría del censo electoral, acuerdan iniciar el procedimiento para constituirse " +
    "en una nueva Comunidad Autónoma, separándose de Ostralia. Aprobado su Estatuto de Autonomía, la nueva " +
    "Comunidad de Deva-Robledal asume competencias en ordenación del territorio, urbanismo y vivienda, y aprueba " +
    "una ley regional sobre aguas que el Estado considera que invade su competencia exclusiva sobre recursos " +
    "hidráulicos que discurren por más de una Comunidad Autónoma. El Gobierno central se plantea impugnarla.",
  preguntas: [
    q("titulo-8-cap-3", "media",
      "¿A quién corresponde la iniciativa del proceso autonómico por la vía del art. 143 CE que siguen Deva y Robledal?",
      ["A las Diputaciones interesadas y a las dos terceras partes de los municipios de cada provincia cuya población represente, al menos, la mayoría del censo electoral",
       "Exclusivamente al Gobierno central, a propuesta de las Cortes Generales",
       "A una mayoría simple de los municipios de la provincia, sin intervención de la Diputación",
       "Al Rey, a propuesta del Presidente del Gobierno saliente"],
      "El art. 143.2 CE atribuye la iniciativa del proceso autonómico a las Diputaciones u órganos interinsulares y a las dos terceras partes de los municipios cuya población represente la mayoría del censo electoral de cada provincia."),
    q("titulo-8-cap-3", "facil",
      "¿Qué características exige el art. 143.1 CE a las provincias limítrofes que quieren constituirse en Comunidad Autónoma?",
      ["Tener características históricas, culturales y económicas comunes",
       "Tener el mismo número de habitantes",
       "Compartir frontera con otro Estado de la Unión Europea",
       "Haber formado parte de una misma Comunidad Autónoma durante al menos veinticinco años"],
      "El art. 143.1 CE exige a las provincias limítrofes «características históricas, culturales y económicas comunes» para poder constituirse en Comunidad Autónoma."),
    q("titulo-8-cap-3", "media",
      "¿Mediante qué tipo de norma se aprueba el Estatuto de Autonomía de la nueva Deva-Robledal en las Cortes Generales?",
      ["Mediante ley orgánica (art. 81.1 CE, tras la elaboración y tramitación previstas en los arts. 146 y 147 CE)",
       "Mediante ley ordinaria aprobada por mayoría simple del Congreso",
       "Mediante real decreto del Consejo de Ministros",
       "Mediante un tratado internacional entre el Estado y la nueva Comunidad"],
      "El art. 81.1 CE incluye expresamente entre las leyes orgánicas «las que aprueben los Estatutos de Autonomía», que además siguen el procedimiento de elaboración específico de los arts. 146 y 147 CE."),
    q("titulo-8-cap-3", "media",
      "Deva-Robledal asume «ordenación del territorio, urbanismo y vivienda». ¿Qué naturaleza tiene esta materia según el art. 148.1 CE?",
      ["Es una de las materias que las Comunidades Autónomas pueden asumir en sus Estatutos (art. 148.1.3ª CE)",
       "Es una competencia exclusiva del Estado que ninguna Comunidad Autónoma puede asumir",
       "Es una materia compartida por igual entre el Estado y todas las Comunidades sin necesidad de previsión estatutaria",
       "Es una competencia que solo pueden asumir las Comunidades que accedieron a la autonomía por la vía del art. 151 CE"],
      "El art. 148.1 CE enumera las materias que las Comunidades Autónomas «podrán asumir» en sus Estatutos, entre ellas, en su apartado 3ª, la ordenación del territorio, urbanismo y vivienda; no depende de la vía de acceso a la autonomía seguida."),
    q("titulo-8-cap-3", "media",
      "Sobre la ley autonómica de aguas: si estas discurren por más de una Comunidad Autónoma, ¿a quién corresponde la competencia exclusiva conforme al art. 149.1.22ª CE?",
      ["Al Estado: legislación, ordenación y concesión de recursos y aprovechamientos hidráulicos cuando las aguas discurran por más de una Comunidad Autónoma",
       "A la Comunidad Autónoma en cuyo territorio nazca el cauce",
       "Es una competencia necesariamente compartida al 50% entre el Estado y las Comunidades afectadas",
       "A la Comunidad Autónoma que primero legisle sobre la materia"],
      "El art. 149.1.22ª CE reserva expresamente al Estado la competencia exclusiva sobre aguas intercomunitarias, precisamente para evitar regulaciones autonómicas dispares sobre un recurso que trasciende un solo territorio."),
    q("titulo-8-cap-3", "dificil",
      "Al margen de esa competencia exclusiva estatal, si existiera un conflicto entre una norma estatal y una autonómica sobre una materia NO atribuida expresamente al Estado, ¿qué regla resuelve el conflicto según el art. 149.3 CE?",
      ["El derecho estatal prevalecerá, en caso de conflicto, sobre el de las Comunidades Autónomas en todo lo que no esté atribuido a la competencia exclusiva de estas",
       "El derecho estatal será siempre meramente supletorio del autonómico, sin prevalecer nunca sobre él",
       "Prevalece automáticamente la norma más reciente en el tiempo, sea estatal o autonómica",
       "El conflicto solo puede resolverlo el Senado, como cámara de representación territorial"],
      "El art. 149.3 CE contiene dos reglas distintas: la de prevalencia (el derecho estatal prevalece en conflictos sobre materias no atribuidas en exclusiva a las Comunidades) y la de supletoriedad (el derecho estatal suple, en todo caso, las lagunas del autonómico). Para un conflicto de normas, la que opera es la prevalencia, no la supletoriedad."),
    q("titulo-9", "media",
      "Ante la ley autonómica que invade su competencia exclusiva sobre aguas, ¿qué instrumento tiene el Gobierno para impugnarla ante el Tribunal Constitucional?",
      ["El recurso de inconstitucionalidad (art. 161.1.a CE)",
       "El recurso de amparo",
       "Una cuestión de inconstitucionalidad",
       "Un conflicto en defensa de la autonomía local"],
      "El art. 161.1.a CE legitima al Gobierno, entre otros sujetos, para interponer el recurso de inconstitucionalidad contra leyes y disposiciones normativas con fuerza de ley, como es una ley autonómica."),
    q("titulo-9", "dificil",
      "Si en lugar del recurso de inconstitucionalidad el Gobierno impugna la ley por la vía específica del art. 161.2 CE para disposiciones autonómicas, ¿qué efecto inmediato produce esa impugnación sobre la norma recurrida?",
      ["La suspensión automática de la disposición impugnada, que el Tribunal Constitucional deberá ratificar o levantar en un plazo no superior a cinco meses",
       "Ningún efecto inmediato: la norma sigue plenamente vigente hasta que recaiga sentencia",
       "Su derogación definitiva desde el momento de la impugnación",
       "La suspensión, pero solo si la solicita expresamente el Tribunal Constitucional en un auto motivado"],
      "El art. 161.2 CE es una vía reforzada, exclusiva del Gobierno: la sola impugnación produce la suspensión automática de la disposición o resolución autonómica recurrida, que el Tribunal Constitucional debe ratificar o levantar en un plazo máximo de cinco meses."),
    q("titulo-8-cap-1", "facil",
      "Con independencia del conflicto competencial, ¿qué principio constitucional obliga al Estado a velar por un equilibrio económico adecuado y justo entre Deva-Robledal y el resto del territorio?",
      ["El principio de solidaridad del art. 138 CE",
       "El principio de autonomía financiera del art. 156 CE",
       "El principio de unidad de mercado del art. 139 CE",
       "El principio de cooperación del art. 145 CE"],
      "El art. 138.1 CE encomienda al Estado garantizar la realización efectiva del principio de solidaridad, velando por un equilibrio económico adecuado y justo entre las diversas partes del territorio español."),
    q("titulo-8-cap-2", "facil",
      "Tras la creación de la nueva Comunidad, ¿mantienen los municipios de Deva y Robledal su propia autonomía para la gestión de sus intereses?",
      ["Sí: el art. 140 CE garantiza la autonomía de los municipios, con personalidad jurídica plena, con independencia de la Comunidad Autónoma a la que pertenezcan",
       "No: al integrarse en una nueva Comunidad Autónoma, los municipios pierden su autonomía y quedan subordinados a esta",
       "Solo la mantienen los municipios capital de provincia",
       "Solo si así lo reconoce expresamente el nuevo Estatuto de Autonomía"],
      "La autonomía municipal del art. 140 CE es una garantía institucional directamente constitucional, no una concesión de la Comunidad Autónoma correspondiente: no depende de lo que diga o deje de decir su Estatuto."),
  ],
};

for (const caso of [CASO_1, CASO_2, CASO_3, CASO_4]) {
  await crearCaso(caso);
}
console.log("✔ Casos prácticos del tema 1 (Constitución) sembrados.");
