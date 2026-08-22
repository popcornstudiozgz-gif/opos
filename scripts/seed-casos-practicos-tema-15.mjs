/**
 * Casos prácticos — Tema 15 (Participación ciudadana y atención al
 * público: Reglamento de Órganos Territoriales y Participación
 * Ciudadana de Zaragoza + Manual de Atención a la Ciudadanía). 3 casos
 * de 10 preguntas cada uno:
 *   1. Los dieciséis distritos de Zaragoza: participación general e
 *      instrumentos de participación individual (arts. 1-8, 51-56 ROTPC)
 *   2. El Consejo de Distrito de Casablanca y la oficina de información:
 *      órganos territoriales de gestión e información municipal (arts.
 *      37-44 ROTPC)
 *   3. La queja en la ventanilla: calidad y comunicación en la atención
 *      a la ciudadanía (Manual de Atención a la Ciudadanía)
 *
 * Reutiliza las secciones ya usadas por las preguntas sueltas del tema
 * (participacion-general, instrumentos-participacion, consejos-distrito,
 * informacion-municipal, calidad-atencion, comunicacion-atencion). Misma
 * mecánica que los casos anteriores: preguntas/opciones en las tablas ya
 * existentes, enlazadas vía caso_preguntas con su `orden`. La primera
 * opción de cada pregunta es siempre la correcta (el cliente baraja el
 * orden al mostrarlas).
 *
 * Uso: node --env-file=.env.local scripts/seed-casos-practicos-tema-15.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

const TEMA = "tema-15";
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
// CASO 1 — Los dieciséis distritos de Zaragoza
// ═══════════════════════════════════════════════════════════════════════
const CASO_1 = {
  slug: "caso-dieciseis-distritos-zaragoza-participacion-instrumentos",
  titulo: "Los dieciséis distritos de Zaragoza: participación general e instrumentos de participación",
  orden: 1,
  supuesto:
    "Un grupo de vecinos del Distrito de Torrero quiere promover que el Ayuntamiento apruebe una nueva " +
    "ordenanza, y para ello reúne firmas de ciudadanos empadronados que representan el 10% del padrón " +
    "municipal. Al mismo tiempo, la asociación vecinal del Distrito Rural pide la celebración de una Audiencia " +
    "Pública sobre el estado de las carreteras rurales, aportando la memoria correspondiente. Una tercera " +
    "persona vecina solicita, además, participar en el turno de ruegos y preguntas al término de un Pleno " +
    "municipal, presentando su solicitud por escrito con la antelación exigida.",
  preguntas: [
    q("participacion-general", "facil",
      "¿Cuántos distritos integran el término municipal de Zaragoza según el Reglamento?",
      ["Dieciséis",
       "Diez",
       "Veinte",
       "Ocho"],
      "Art. 2 ROTPC: en el término municipal de Zaragoza se asientan dieciséis distritos, incluido el Distrito Rural."),
    q("participacion-general", "media",
      "Los Barrios Rurales de Zaragoza, ¿por qué órganos se rigen, a diferencia de los Distritos urbanos?",
      ["Por las Juntas Vecinales, mientras que los Distritos urbanos se rigen por las Juntas Municipales",
       "Por el mismo tipo de Junta que los Distritos urbanos, sin ninguna diferencia de régimen",
       "Directamente por el Pleno del Ayuntamiento, sin ningún órgano territorial propio",
       "Por el Justicia de Aragón, como garante de los derechos de los vecinos rurales"],
      "Art. 2 ROTPC: los Distritos se rigen por las Juntas Municipales y los Barrios Rurales por las Juntas Vecinales."),
    q("participacion-general", "facil",
      "Para modificar la actual estructura de Distritos y Barrios Rurales o sus linderos, ¿qué se requiere?",
      ["Acuerdo del Ayuntamiento Pleno, adoptado con mayoría absoluta, siguiendo los trámites de elaboración de Reglamentos y Ordenanzas municipales",
       "Basta un decreto del Alcalde, sin intervención del Pleno",
       "Es necesaria una ley de las Cortes de Aragón",
       "Basta con el acuerdo de la Junta de Gobierno Local"],
      "Art. 2 ROTPC: para modificar la estructura de Distritos y Barrios Rurales será preciso acuerdo del Ayuntamiento Pleno, adoptado con mayoría absoluta, siguiendo los trámites de Reglamentos y Ordenanzas municipales."),
    q("participacion-general", "media",
      "¿Qué órgano articula sectorialmente la organización territorial de participación ciudadana de Zaragoza?",
      ["El Consejo de la Ciudad de Zaragoza",
       "La Comisión Especial de Sugerencias y Reclamaciones, con carácter exclusivo",
       "El Justicia de Aragón",
       "La Diputación Provincial de Zaragoza"],
      "Art. 1 ROTPC: la participación se canaliza a través de una organización territorial específica y está sectorialmente articulada a través del Consejo de la Ciudad de Zaragoza."),
    q("participacion-general", "dificil",
      "El derecho a promover la iniciativa para proponer al Ayuntamiento la aprobación de reglamentos y ordenanzas, ¿qué porcentaje del padrón municipal debe representar el grupo de ciudadanos que lo promueva?",
      ["El 10% del padrón municipal",
       "El 25% del padrón municipal",
       "El 1% del padrón municipal",
       "No se exige ningún porcentaje mínimo, basta con un solo ciudadano"],
      "Art. 51 ROTPC: se reconoce la iniciativa para proponer reglamentos y ordenanzas cuando sea promovida por ciudadanos que representen el 10% del padrón municipal."),
    q("instrumentos-participacion", "facil",
      "La Audiencia Pública solicitada por la asociación vecinal del Distrito Rural sobre las carreteras rurales, ¿qué debe adjuntar a su petición?",
      ["Una memoria sobre el asunto o asuntos a debatir y la expresión clara de la información que se solicita",
       "Un aval bancario que garantice los gastos de organización del acto",
       "La firma de la totalidad de los vecinos del Distrito Rural",
       "Un informe jurídico previo emitido por el Justicia de Aragón"],
      "Art. 52 ROTPC: las entidades y ciudadanos solicitantes de la Audiencia Pública adjuntarán a su petición una memoria sobre el asunto a debatir y la expresión clara de la información que se solicita."),
    q("instrumentos-participacion", "media",
      "Recibida la documentación de la Audiencia Pública, ¿en qué plazo máximo debe convocarla el Alcalde o el Concejal Delegado de Juntas Vecinales?",
      ["En el plazo máximo de un mes, con una antelación mínima de quince días",
       "En el plazo máximo de una semana, sin antelación mínima exigida",
       "No existe plazo máximo, queda a la discreción del órgano competente",
       "En el plazo máximo de seis meses"],
      "Art. 52 ROTPC: recibida la documentación, el órgano competente, en el plazo máximo de un mes, convocará Audiencia Pública con una antelación mínima de quince días."),
    q("instrumentos-participacion", "dificil",
      "Tras la celebración de la Audiencia Pública sobre las carreteras rurales, ¿en qué plazo debe el órgano competente adoptar un acuerdo sobre la propuesta formulada?",
      ["En el plazo de un mes desde la celebración de la sesión",
       "En el plazo de tres días hábiles",
       "No existe plazo alguno para resolver sobre lo tratado en la Audiencia Pública",
       "En el plazo de un año, coincidiendo con el ejercicio presupuestario"],
      "Art. 52 ROTPC: en las Audiencias Públicas de propuestas de actuaciones, el órgano competente deberá adoptar un acuerdo en el plazo de un mes desde la celebración de la sesión."),
    q("instrumentos-participacion", "media",
      "La persona vecina que quiere intervenir en el turno de ruegos y preguntas al término del Pleno, ¿con qué antelación mínima debe solicitarlo por escrito?",
      ["Con una antelación mínima de 24 horas a la celebración de la sesión del Pleno",
       "Con una antelación mínima de una semana",
       "No se exige ninguna antelación, puede solicitarse en el mismo momento del Pleno",
       "Con una antelación mínima de un mes"],
      "Art. 56 ROTPC: quienes deseen intervenir en el turno de ruegos y preguntas deberán solicitarlo por escrito al Alcalde con una antelación mínima de 24 horas a la sesión del Pleno."),
    q("instrumentos-participacion", "facil",
      "Si la pregunta formulada en ese turno no se contesta de forma inmediata, ¿en qué plazo máximo debe ser contestada por escrito?",
      ["En el plazo máximo de treinta días",
       "En el plazo máximo de tres días",
       "En el plazo máximo de un año",
       "No existe obligación de contestar por escrito en ningún caso"],
      "Art. 56 ROTPC: las preguntas serán contestadas por escrito en el plazo máximo de treinta días, salvo que el preguntado quiera dar respuesta inmediata."),
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// CASO 2 — El Consejo de Distrito de Casablanca y la oficina de información
// ═══════════════════════════════════════════════════════════════════════
const CASO_2 = {
  slug: "caso-consejo-distrito-casablanca-oficina-informacion",
  titulo: "El Consejo de Distrito de Casablanca y la oficina de información",
  orden: 2,
  supuesto:
    "El Pleno del Ayuntamiento de Zaragoza acuerda la creación de un Consejo de Distrito que agrupa varias " +
    "Juntas Municipales limítrofes, entre ellas la de Casablanca. El Alcalde, como Presidente nato del Consejo, " +
    "delega la presidencia en un Concejal. El Consejo Rector se reúne para coordinar la actividad de las Juntas " +
    "Municipales integradas. Al mismo tiempo, un vecino solicita en la Oficina de Información de su Junta " +
    "Municipal una certificación de un acuerdo municipal, y otro vecino presenta por escrito una queja sobre el " +
    "retraso en la tramitación de un expediente cuya competencia corresponde a otra Administración.",
  preguntas: [
    q("consejos-distrito", "facil",
      "Los Consejos de Distrito, ¿qué función cumplen conforme al Reglamento?",
      ["Son órganos de ámbito territorial para la desconcentración administrativa que sirven de cauce para la tramitación de los asuntos derivados de la gestión municipal en su ámbito territorial",
       "Son órganos exclusivamente consultivos, sin ninguna función de gestión",
       "Sustituyen íntegramente a las Juntas Municipales en todas sus competencias",
       "Son órganos jurisdiccionales para resolver conflictos entre vecinos"],
      "Art. 37 ROTPC: los Consejos de Distrito son órganos de ámbito territorial para la desconcentración administrativa que sirven de cauce para la tramitación de los asuntos de gestión municipal."),
    q("consejos-distrito", "media",
      "¿Con arreglo a qué criterios pueden constituirse los Consejos de Distrito?",
      ["Por Juntas Municipales completas, que deben ser limítrofes territorialmente, pudiendo estar formadas por barrios urbanos y rurales",
       "Por decisión unilateral del Concejal Presidente de cada Junta, sin necesidad de que sean limítrofes",
       "Únicamente agrupando barrios urbanos, nunca barrios rurales",
       "Por sorteo entre todas las Juntas Municipales del municipio"],
      "Art. 38 ROTPC: los Consejos de Distrito se constituyen por Juntas Municipales completas y limítrofes territorialmente, pudiendo estar formadas por barrios urbanos y rurales."),
    q("consejos-distrito", "facil",
      "¿A quién corresponde acordar la creación de cada Consejo de Distrito y la asignación de recursos humanos y materiales?",
      ["Al Pleno del Ayuntamiento de Zaragoza",
       "A la Junta de Gobierno Local, sin necesidad de acuerdo plenario",
       "Al Consejo de la Ciudad de Zaragoza",
       "A cada Junta Municipal de forma independiente"],
      "Art. 39 ROTPC: el Pleno del Ayuntamiento de Zaragoza acordará la creación de cada Consejo de Distrito y la asignación de los recursos necesarios."),
    q("consejos-distrito", "media",
      "¿Quién es el Presidente nato de todos los Consejos de Distrito?",
      ["El Alcalde, que podrá delegar en un Concejal esta Presidencia",
       "El Concejal Presidente de la Junta Municipal de mayor población",
       "El Secretario General del Pleno, con carácter permanente",
       "El Presidente del Consejo de la Ciudad de Zaragoza"],
      "Art. 41.1 ROTPC: el Alcalde es el Presidente nato de todos los Consejos de Distrito y podrá delegar en un Concejal esta Presidencia."),
    q("consejos-distrito", "dificil",
      "El Consejo Rector, órgano de coordinación y gestión de la actividad de las Juntas Municipales integradas, ¿con qué periodicidad mínima debe reunirse en sesión ordinaria?",
      ["Como mínimo, una vez al mes",
       "Como mínimo, una vez cada seis meses",
       "Como mínimo, una vez al año",
       "El Reglamento no fija ninguna periodicidad mínima"],
      "Art. 42 ROTPC: el Consejo Rector se reunirá, como mínimo, en sesión ordinaria una vez al mes."),
    q("consejos-distrito", "media",
      "¿Quién integra el Consejo Rector, además del Presidente del Consejo de Distrito y los Presidentes de las Juntas Municipales?",
      ["Con voz y sin voto, un Vocal en representación de cada uno de los grupos municipales y un representante del movimiento vecinal",
       "Únicamente los Presidentes de las Juntas Municipales, sin ningún otro miembro",
       "Representantes de todas las empresas concesionarias de servicios municipales del territorio",
       "El Justicia de Aragón, con voz y voto"],
      "Art. 42 ROTPC: se integran en el Consejo Rector, con voz y sin voto, un Vocal por cada grupo municipal y un representante del movimiento vecinal."),
    q("informacion-municipal", "facil",
      "El vecino que solicita la certificación de un acuerdo municipal en la Oficina de Información, ¿debe motivar razonadamente su petición?",
      ["No, las peticiones de información deberán ser razonadas salvo que se refieran a la obtención de certificaciones de acuerdos o resoluciones",
       "Sí, en todo caso, sin ninguna excepción",
       "No, ninguna petición de información requiere razonamiento alguno",
       "Sí, pero únicamente si la certificación se refiere a materia tributaria"],
      "Art. 44 ROTPC: las peticiones de información deberán ser razonadas, salvo que se refieran a la obtención de certificaciones de acuerdos o resoluciones."),
    q("informacion-municipal", "media",
      "¿Qué debe existir en las dependencias de las Áreas Centrales y de la Administración Desconcentrada, Juntas Municipales y Vecinales, para canalizar la información de la gestión municipal?",
      ["Una Oficina de Información",
       "Un Juzgado de Paz municipal",
       "Una Comisaría de Policía Local, con funciones de información al público",
       "Una sucursal bancaria municipal"],
      "Art. 44 ROTPC: existirá una Oficina de Información que canalizará la información de la gestión del Ayuntamiento y la participación ciudadana."),
    q("informacion-municipal", "dificil",
      "Sobre la queja que otro vecino presenta por escrito respecto al retraso en la tramitación de su expediente, ¿quién resuelve las quejas contra los defectos de tramitación que puedan subsanarse antes de la resolución definitiva, en el ámbito de las Áreas Centrales?",
      ["El Alcalde",
       "El Justicia de Aragón, con carácter exclusivo",
       "El Consejo de la Ciudad de Zaragoza",
       "La Comisión Especial de Sugerencias y Reclamaciones, en todo caso y con carácter excluyente"],
      "Art. 44 ROTPC: el Alcalde, en la actividad de las Áreas Centrales, resolverá las quejas contra los defectos de tramitación que puedan subsanarse antes de la resolución definitiva."),
    q("informacion-municipal", "media",
      "Si la solicitud de un vecino se refiere a una cuestión de la competencia de otra Administración, ¿qué debe hacer el destinatario de la solicitud?",
      ["Dirigirla a quien corresponda, dando cuenta de este extremo al peticionario",
       "Archivarla sin más trámite, sin informar al peticionario",
       "Resolverla igualmente, aunque carezca de competencia sobre la materia",
       "Denegarla automáticamente por incompetencia, sin ninguna otra actuación"],
      "Art. 44 ROTPC: si la solicitud hace referencia a cuestiones de la competencia de otras Administraciones, el destinatario la dirigirá a quien corresponda, dando cuenta al peticionario."),
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// CASO 3 — La queja en la ventanilla
// ═══════════════════════════════════════════════════════════════════════
const CASO_3 = {
  slug: "caso-queja-ventanilla-calidad-comunicacion-atencion",
  titulo: "La queja en la ventanilla: calidad y comunicación en la atención a la ciudadanía",
  orden: 3,
  supuesto:
    "Un ciudadano acude a las oficinas municipales y espera un tiempo prolongado, mostrándose visiblemente " +
    "molesto cuando por fin es atendido. La funcionaria que le atiende debe decidir cómo gestionar la queja del " +
    "ciudadano, prestando atención tanto a lo que dice como a su tono de voz y su expresión facial. Al " +
    "explicarle el trámite, procura evitar la jerga administrativa y ser breve y precisa en sus explicaciones. " +
    "El Manual de Atención a la Ciudadanía recuerda que el trato recibido por el personal en contacto directo es " +
    "el factor clave para la valoración del servicio.",
  preguntas: [
    q("calidad-atencion", "facil",
      "Según el Manual de Atención a la Ciudadanía, ¿cuál es el factor clave en el «momento de la verdad» del contacto entre la ciudadanía y un servicio municipal?",
      ["El trato recibido, que no puede venir sino del personal directamente en contacto con el público",
       "La rapidez exclusiva del trámite, con independencia del trato personal",
       "El aspecto físico de las instalaciones, por encima de cualquier otro factor",
       "El coste económico del servicio prestado"],
      "Manual de Atención a la Ciudadanía: la ciudadanía valora extraordinariamente el trato recibido, y este no puede venir sino del personal directamente en contacto; ese es el factor clave en el momento de la verdad."),
    q("calidad-atencion", "media",
      "Entre los factores según los cuales se juzga la calidad de un servicio, ¿qué recoge la «capacidad de respuesta»?",
      ["La disponibilidad, la rapidez en atender, la eficacia en escuchar y entender, y la habilidad en poner en marcha soluciones",
       "Únicamente el aspecto físico de las instalaciones y los materiales de comunicación",
       "Solo el número de personas empleadas en el servicio",
       "Exclusivamente el coste del servicio para la ciudadanía"],
      "Manual de Atención a la Ciudadanía: la capacidad de respuesta comprende la disponibilidad, la rapidez en atender, la eficacia en escuchar y entender, y la habilidad en poner en marcha soluciones."),
    q("calidad-atencion", "facil",
      "La «empatía», como factor de calidad del servicio, ¿en qué consiste según el Manual?",
      ["En recibir un tratamiento lo más personalizado y cortés posible, con demostraciones palpables de voluntad de comprender y satisfacer las necesidades concretas de la persona atendida",
       "En resolver siempre el expediente de forma favorable al interesado",
       "En atender exclusivamente por medios telemáticos, evitando el contacto personal",
       "En aplicar el mismo protocolo estandarizado a todos los ciudadanos sin distinción"],
      "Manual de Atención a la Ciudadanía: la empatía consiste en recibir un tratamiento personalizado y cortés, con voluntad de comprender y satisfacer las necesidades concretas de la persona."),
    q("calidad-atencion", "media",
      "Según los estudios citados en el Manual, ¿cuáles son los dos motivos mayoritarios por los que la ciudadanía valora como baja la calidad de un servicio público?",
      ["La actitud del personal y la lentitud en el trabajo",
       "El precio del servicio y la lejanía de las oficinas",
       "La falta de aparcamiento y el horario de atención",
       "El exceso de trámites telemáticos y la falta de personal técnico"],
      "Manual de Atención a la Ciudadanía: los dos motivos mayoritarios de baja calidad percibida son la actitud del personal (44%) y la lentitud en el trabajo (40%)."),
    q("calidad-atencion", "dificil",
      "El Manual propone «reconducir» la queja del ciudadano. ¿Cómo sugiere entenderla el personal municipal, entre otras posibilidades?",
      ["Como una excelente oportunidad para demostrar su competencia y ser eficaces, y como el momento idóneo para ayudar a la persona a vencer el miedo e inseguridad frente a una organización compleja",
       "Como una pérdida de tiempo que debe evitarse y minimizarse en todo momento",
       "Como un ataque personal que debe rechazarse de forma inmediata",
       "Como un problema exclusivamente jurídico que debe derivarse siempre al servicio de recursos"],
      "Manual de Atención a la Ciudadanía: se propone reconducir la queja como una oportunidad para demostrar competencia y para ayudar a la persona a vencer el miedo e inseguridad frente a la Administración."),
    q("comunicacion-atencion", "facil",
      "Según el Manual, ¿con qué tipo de mensajes nos comunicamos las personas?",
      ["Con mensajes verbales (palabras) y mensajes no verbales (conductas, miradas, gestos, tono, volumen)",
       "Únicamente con mensajes verbales, siendo irrelevantes los gestos o el tono de voz",
       "Únicamente con mensajes no verbales, sin ninguna relevancia de las palabras empleadas",
       "Exclusivamente por escrito, a través de documentos oficiales"],
      "Manual de Atención a la Ciudadanía: nos comunicamos con mensajes verbales (palabras) y mensajes no verbales (conductas que acompañan a las palabras)."),
    q("comunicacion-atencion", "media",
      "La habilidad de escuchar, según el Manual, ¿debe ser una actitud pasiva o activa?",
      ["Activa: no basta con oír, hay que poner también cabeza (observación) y corazón (empatía)",
       "Puramente pasiva, limitándose a esperar a que el interlocutor termine de hablar",
       "Es indiferente, pues lo relevante es únicamente la respuesta que se ofrezca después",
       "El Manual no distingue entre escucha activa y pasiva"],
      "Manual de Atención a la Ciudadanía: escuchar es algo activo; no basta con oír, hay que poner cabeza (observación) y corazón (empatía)."),
    q("comunicacion-atencion", "facil",
      "Al explicar un trámite, el Manual recomienda evitar el argot o jerga profesional de las administraciones públicas. ¿Con qué finalidad?",
      ["Para que la expresión sea clara, empleando términos que también sean conocidos por la persona que escucha",
       "Para acortar el tiempo de la conversación, sin ninguna relación con la comprensión del interlocutor",
       "Para dar una imagen más técnica y profesional del servicio, aunque no se entienda del todo",
       "El Manual no hace ninguna recomendación sobre el uso de jerga profesional"],
      "Manual de Atención a la Ciudadanía: la expresión clara implica evitar el argot o jerga profesional de las administraciones públicas, empleando términos conocidos por quien escucha."),
    q("comunicacion-atencion", "media",
      "Además de clara, ¿qué otra cualidad debe tener el habla del personal municipal según el Manual?",
      ["Debe ser precisa: no utilizar más términos que los estrictamente necesarios y adaptarse al nivel de la persona con la que se habla",
       "Debe ser lo más extensa posible, para no omitir ningún detalle del procedimiento",
       "Debe utilizar siempre el máximo tecnicismo jurídico disponible",
       "Debe evitarse por completo, priorizando la comunicación exclusivamente escrita"],
      "Manual de Atención a la Ciudadanía: la segunda cualidad del habla es la precisión, no utilizando más términos que los estrictamente necesarios y adaptándose al nivel del interlocutor."),
    q("comunicacion-atencion", "dificil",
      "En síntesis, ¿con qué tres cualidades resume el Manual la «disciplina verbal» exigible en la atención a la ciudadanía?",
      ["Brevedad, claridad y precisión",
       "Formalidad, extensión y tecnicismo",
       "Rapidez, informalidad y cercanía exclusivamente coloquial",
       "El Manual no ofrece ninguna síntesis de cualidades del habla"],
      "Manual de Atención a la Ciudadanía: cuando corresponda hablar, deberá hacerse con brevedad, claridad y precisión."),
  ],
};

for (const caso of [CASO_1, CASO_2, CASO_3]) {
  await crearCaso(caso);
}
console.log("✔ Casos prácticos del tema 15 (Participación ciudadana y atención al público) sembrados.");
