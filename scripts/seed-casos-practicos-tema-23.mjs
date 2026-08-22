/**
 * Casos prácticos — Tema 23 (La Ley de Urbanismo de Aragón). 3 casos de
 * 10 preguntas cada uno, cada uno centrado en un bloque distinto del
 * tema:
 *   1. La actividad urbanística en Aragón: función pública y
 *      competencias de los órganos municipales, y clasificación del
 *      suelo (arts. 1-14)
 *   2. El plan general del municipio: planeamiento (plan general,
 *      ordenación estructural) y gestión urbanística (sistemas de
 *      actuación) (arts. 38-40, 118-122)
 *   3. La ampliación sin licencia en Torrero: edificación y uso del
 *      suelo (licencias) y disciplina urbanística (inspección,
 *      infracciones y sanciones) (arts. 214-227, 264-279)
 *
 * Reutiliza las secciones ya usadas por las preguntas sueltas del tema
 * (titulo-preliminar, regimen-suelo, planeamiento, gestion-urbanistica,
 * edificacion-uso, disciplina-urbanistica). Misma mecánica que los casos
 * anteriores: preguntas/opciones en las tablas ya existentes, enlazadas
 * vía caso_preguntas con su `orden`. La primera opción de cada pregunta
 * es siempre la correcta (el cliente baraja el orden al mostrarlas).
 *
 * Uso: node --env-file=.env.local scripts/seed-casos-practicos-tema-23.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

const TEMA = "tema-23";
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
// CASO 1 — La actividad urbanística en Aragón
// ═══════════════════════════════════════════════════════════════════════
const CASO_1 = {
  slug: "caso-funcion-publica-clasificacion-suelo-aragon",
  titulo: "La actividad urbanística en Aragón: función pública y clasificación del suelo",
  orden: 1,
  supuesto:
    "Un promotor pretende construir un polígono industrial en un terreno situado en un municipio aragonés sin " +
    "plan general aprobado. El terreno carece de servicios urbanísticos, pero está próximo a una zona ya " +
    "consolidada por la edificación en dos terceras partes de su superficie. El Ayuntamiento debe pronunciarse " +
    "sobre a qué clase de suelo pertenece ese terreno, y sobre qué órgano municipal es competente para las " +
    "distintas decisiones del expediente: el otorgamiento de la licencia, la aprobación de los instrumentos de " +
    "planeamiento y la imposición de eventuales sanciones graves.",
  preguntas: [
    q("titulo-preliminar", "facil",
      "La dirección y el control de la actividad urbanística, ¿qué naturaleza tienen conforme a la Ley?",
      ["Constituyen una función pública",
       "Constituyen una actividad puramente privada sujeta a autorización administrativa",
       "Constituyen una potestad exclusiva y excluyente de la Comunidad Autónoma, sin intervención municipal",
       "Constituyen una actividad de mero fomento, sin capacidad de intervención directa"],
      "Art. 2.1 LUA: la dirección y el control de la actividad urbanística constituyen una función pública."),
    q("titulo-preliminar", "media",
      "Entre los principios que rigen la actividad urbanística en Aragón, ¿figura la participación ciudadana?",
      ["Sí, habilitando en los procedimientos para la adopción de decisiones urbanísticas los trámites de información y audiencia pública en los términos establecidos en las leyes",
       "No, la actividad urbanística se rige exclusivamente por criterios técnicos, sin participación ciudadana",
       "Sí, pero solo en los municipios de gran población",
       "No, la participación ciudadana solo se prevé para la aprobación de ordenanzas fiscales"],
      "Art. 3.e) LUA: la actividad urbanística se desarrollará conforme al principio de participación ciudadana, habilitando trámites de información y audiencia pública."),
    q("titulo-preliminar", "facil",
      "Si el municipio careciera de plan general aprobado, ¿de quién es la competencia general para la actividad urbanística pública del término municipal?",
      ["Con carácter general y para la gestión de los intereses de la comunidad local, corresponde a los municipios la actividad urbanística pública",
       "Corresponde en exclusiva a la Comunidad Autónoma de Aragón mientras no exista plan general",
       "Corresponde a la Diputación Provincial hasta que se apruebe el plan general",
       "Corresponde al Estado, en tanto no se transfiera la competencia a la Comunidad Autónoma"],
      "Art. 8.1 LUA: con carácter general y para la gestión de los intereses de la comunidad local, corresponde a los municipios la actividad urbanística pública."),
    q("titulo-preliminar", "media",
      "¿A quién corresponde el otorgamiento de las licencias urbanísticas de este expediente, salvo que las leyes sectoriales lo atribuyan expresamente al Pleno o a la Junta de Gobierno Local?",
      ["Al Alcalde",
       "Al Pleno, en todo caso y sin excepción",
       "A la Comisión Provincial de Urbanismo",
       "Al Consejero competente en materia de urbanismo del Gobierno de Aragón"],
      "Art. 8.3.d) LUA: corresponde al Alcalde el otorgamiento de las licencias, salvo que las leyes sectoriales lo atribuyan expresamente al Pleno o a la Junta de Gobierno Local."),
    q("titulo-preliminar", "dificil",
      "¿A qué órgano municipal corresponde la aprobación inicial y provisional del planeamiento general?",
      ["Al Pleno",
       "Al Alcalde, con carácter exclusivo",
       "A la Junta de Gobierno Local, en todo caso",
       "Al Secretario municipal, previo informe técnico"],
      "Art. 8.4.a) LUA: corresponde al Pleno la aprobación inicial y provisional del planeamiento general."),
    q("titulo-preliminar", "media",
      "Si finalmente se detectara una infracción urbanística grave en este expediente, ¿a quién corresponde la imposición de la sanción?",
      ["Al Pleno, pues la imposición de sanciones por la comisión de infracciones graves y muy graves corresponde a este órgano",
       "Al Alcalde, como responsable general de la disciplina urbanística",
       "A la Junta de Gobierno Local, sin necesidad de intervención del Pleno",
       "A los Consejos Provinciales de Urbanismo, con carácter exclusivo"],
      "Art. 8.4.d) LUA: corresponde al Pleno la imposición de sanciones por la comisión de infracciones graves y muy graves."),
    q("regimen-suelo", "facil",
      "El plan general, en su caso, clasificará el suelo del término municipal en varias clases. ¿Cuáles son, entre otras, las categorías del suelo urbano?",
      ["Suelo urbano consolidado o no consolidado",
       "Suelo urbano rústico y suelo urbano forestal",
       "Suelo urbano público y suelo urbano privado, exclusivamente",
       "El suelo urbano no admite categorías, es una clase única sin subdivisiones"],
      "Art. 11.1.a) LUA: el plan general clasificará el suelo, entre otras clases, en suelo urbano, consolidado o no consolidado."),
    q("regimen-suelo", "media",
      "El terreno del promotor carece de servicios urbanísticos, pero está próximo a una zona consolidada por la edificación en dos terceras partes de su superficie. Si el plan general incluyera ese terreno en esa área consolidada, cumpliendo los demás requisitos legales, ¿podría tener la condición de suelo urbano?",
      ["Sí, tendrán la condición de suelo urbano los terrenos que el plan general incluya en áreas consolidadas por la edificación, al menos, en las dos terceras partes de su superficie edificable, cumpliendo los demás requisitos legales",
       "No, la falta de servicios urbanísticos impide en todo caso la clasificación como suelo urbano",
       "Sí, automáticamente, por el solo hecho de estar próximo a una zona consolidada, sin más requisitos",
       "No, solo puede ser suelo urbanizable delimitado en ese supuesto"],
      "Art. 12.c) LUA: tendrán la condición de suelo urbano los terrenos que el plan general incluya en áreas consolidadas por la edificación en, al menos, las dos terceras partes de su superficie edificable, cumpliendo los demás requisitos."),
    q("regimen-suelo", "dificil",
      "Si el municipio careciera de plan general, ¿qué clasificación tendría el suelo que no reúna la condición de urbano?",
      ["Tendrá la consideración de suelo no urbanizable",
       "Tendrá la consideración de suelo urbanizable delimitado, por defecto",
       "Tendrá la consideración de suelo urbano no consolidado, mientras no se apruebe el plan general",
       "Carecerá de cualquier clasificación hasta la aprobación del plan general"],
      "Art. 11.3 LUA: en los municipios que carezcan de plan general, el suelo que no tenga la condición de urbano tendrá la consideración de suelo no urbanizable."),
    q("regimen-suelo", "media",
      "Con carácter general, ¿tiene el propietario derecho patrimonial pleno sobre la edificabilidad que le atribuya el planeamiento, por el solo hecho de esa previsión?",
      ["No, la previsión de edificabilidad por la ordenación territorial y urbanística, por sí misma, no la integra en el contenido del derecho de propiedad del suelo; la patrimonialización se produce solo con su realización efectiva y el cumplimiento de los deberes y cargas correspondientes",
       "Sí, la mera previsión de edificabilidad por el planeamiento la incorpora automáticamente al derecho de propiedad",
       "Sí, pero únicamente en el suelo urbano consolidado",
       "No, el propietario nunca puede patrimonializar la edificabilidad prevista por el planeamiento, en ningún caso"],
      "Art. 10.2 LUA: la previsión de edificabilidad, por sí misma, no la integra en el contenido del derecho de propiedad del suelo; la patrimonialización se produce con su realización efectiva y el cumplimiento de deberes y cargas."),
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// CASO 2 — El plan general del municipio
// ═══════════════════════════════════════════════════════════════════════
const CASO_2 = {
  slug: "caso-plan-general-planeamiento-gestion-urbanistica",
  titulo: "El plan general del municipio: planeamiento y gestión urbanística",
  orden: 2,
  supuesto:
    "Un municipio aragonés inicia la redacción de su plan general de ordenación urbana para varios términos " +
    "municipales, incorporando un estudio territorial, urbanístico, ambiental y social de los nuevos núcleos de " +
    "demanda previstos. Al aprobarse la ordenación pormenorizada de un sector de suelo urbano no consolidado, el " +
    "Ayuntamiento debe delimitar la correspondiente unidad de ejecución y decidir el sistema de gestión " +
    "urbanística más adecuado. Un grupo de propietarios que suman más de la mitad de la superficie de esa " +
    "unidad propone al Ayuntamiento el sistema de compensación en su proyecto de planeamiento de desarrollo.",
  preguntas: [
    q("planeamiento", "facil",
      "El plan general de ordenación urbana, como instrumento de ordenación integral, ¿qué ámbito territorial puede abarcar?",
      ["Uno o varios términos municipales completos",
       "Únicamente una parte del término municipal, nunca su totalidad",
       "Exclusivamente el suelo urbano consolidado del municipio",
       "El ámbito de toda la Comunidad Autónoma de Aragón"],
      "Art. 38.1 LUA: el plan general de ordenación urbana abarcará uno o varios términos municipales completos."),
    q("planeamiento", "media",
      "El plan general debe respetar las determinaciones vinculantes de otros instrumentos superiores. ¿Cuáles, entre otros?",
      ["Las directrices de ordenación del territorio y los planes de ordenación de los recursos naturales que resulten aplicables",
       "Únicamente las ordenanzas municipales de tráfico",
       "Ningún instrumento superior vincula al plan general, que goza de autonomía plena",
       "Solo los convenios urbanísticos suscritos con particulares"],
      "Art. 38.2 LUA: el plan general respetará las determinaciones vinculantes de las directrices de ordenación del territorio y de los planes de ordenación de los recursos naturales aplicables."),
    q("planeamiento", "facil",
      "Al concretar el modelo de evolución urbana y ocupación del territorio, ¿qué horizonte temporal de gestión se aplica en defecto de previsión del propio planeamiento?",
      ["Veinte años",
       "Cinco años",
       "Cincuenta años",
       "No existe ningún horizonte temporal supletorio, siendo obligatoria su fijación expresa en todo caso"],
      "Art. 39.1.b) LUA: el plan general deberá establecer un horizonte temporal de gestión; en defecto de previsión del planeamiento, será de veinte años."),
    q("planeamiento", "media",
      "El estudio territorial, urbanístico, ambiental y social de los nuevos núcleos de demanda que incorpora el plan general, ¿qué debe justificar y analizar?",
      ["Debe justificar su implantación y analizar su viabilidad, teniendo en cuenta el posible incremento de la capacidad de las redes y servicios urbanísticos",
       "Únicamente el coste económico de las nuevas infraestructuras, sin otra consideración",
       "Solo el impacto visual del nuevo núcleo sobre el paisaje circundante",
       "El plan general no está obligado a incorporar ningún estudio de este tipo"],
      "Art. 39.1.a) LUA: el plan general incorporará un estudio específico de los nuevos núcleos de demanda, justificando su implantación y analizando su viabilidad."),
    q("planeamiento", "dificil",
      "La ordenación estructural del término municipal, ¿qué determinaciones comprende, entre otras?",
      ["La clasificación de la totalidad del suelo, con delimitación de las superficies adscritas a cada clase y categoría, y los sistemas generales que aseguren la racionalidad y coherencia del desarrollo urbanístico",
       "Únicamente el trazado de las calles y su anchura exacta",
       "Solo la localización de los edificios de titularidad municipal",
       "Exclusivamente el calendario de ejecución de las obras de urbanización"],
      "Art. 40.1.a) y b) LUA: la ordenación estructural comprende la clasificación de la totalidad del suelo y los sistemas generales que aseguren la racionalidad y coherencia del desarrollo."),
    q("gestion-urbanistica", "facil",
      "La gestión urbanística, ¿qué comprende conforme a la Ley?",
      ["El conjunto de procedimientos para la distribución equitativa de beneficios y cargas y para la transformación del uso del suelo, en ejecución del planeamiento urbanístico",
       "Únicamente la redacción material de los planos del plan general",
       "Solo la recaudación de las tasas urbanísticas municipales",
       "Exclusivamente la resolución de los recursos administrativos en materia de urbanismo"],
      "Art. 118.1 LUA: la gestión urbanística es el conjunto de procedimientos para la distribución equitativa de beneficios y cargas y la transformación del uso del suelo, en ejecución del planeamiento."),
    q("gestion-urbanistica", "media",
      "Para ejecutar el planeamiento mediante actuaciones integradas en ese sector de suelo urbano no consolidado, ¿qué requiere la Ley, además de la aprobación del instrumento de ordenación pormenorizada?",
      ["La delimitación de la unidad de ejecución",
       "La previa expropiación de la totalidad de las parcelas afectadas, en todo caso",
       "La constitución obligatoria de una sociedad urbanística municipal",
       "La aprobación de una ley autonómica específica para cada unidad de ejecución"],
      "Art. 121.2 LUA: la ejecución mediante actuaciones integradas requiere la aprobación del instrumento de planeamiento con ordenación pormenorizada, así como la delimitación de la unidad de ejecución."),
    q("gestion-urbanistica", "facil",
      "¿A quién corresponde establecer el sistema de gestión urbanística que se considere más adecuado para esa unidad de ejecución?",
      ["A la Administración, al aprobar el planeamiento que establezca la ordenación pormenorizada o, en su caso, con la delimitación de la unidad de ejecución",
       "Exclusivamente a los propietarios afectados, sin intervención de la Administración",
       "Al Gobierno de Aragón, en todo caso, con independencia de la Administración competente",
       "A un árbitro designado de común acuerdo entre Administración y propietarios"],
      "Art. 122.1 LUA: al aprobar el planeamiento con ordenación pormenorizada, la Administración establecerá el sistema de gestión urbanística que considere más adecuado."),
    q("gestion-urbanistica", "dificil",
      "Para que la propuesta del sistema de compensación de los propietarios vincule a la Administración respecto a esa unidad de ejecución, ¿qué requisito exige la Ley sobre la suscripción del proyecto de planeamiento de desarrollo?",
      ["Debe estar suscrito por propietarios que sumen más de la mitad de la superficie de esa unidad, y garantizar que el desarrollo de las obras se adecue a las necesidades de crecimiento y forma de la ciudad",
       "Debe estar suscrito por la totalidad de los propietarios afectados, sin excepción alguna",
       "Basta con que lo suscriba un único propietario, sea cual sea su porcentaje de superficie",
       "No existe ningún requisito de suscripción mínima para vincular a la Administración"],
      "Art. 122.2 LUA: para que la propuesta del sistema de compensación vincule a la Administración, el proyecto debe estar suscrito por propietarios que sumen más de la mitad de la superficie de la unidad."),
    q("gestion-urbanistica", "media",
      "Si transcurrieran los plazos fijados por el planeamiento para el desarrollo del sector sin que se hubiera ejecutado, ¿podría sustituirse el sistema de actuación inicialmente elegido?",
      ["Sí, el sistema de actuación podrá ser sustituido, de forma justificada, de oficio o a instancia de parte, y en todo caso se considerará justificado el cambio por el transcurso de los plazos fijados por el planeamiento",
       "No, el sistema de actuación elegido inicialmente es inmodificable durante toda la vigencia del planeamiento",
       "Sí, pero únicamente a instancia de los propietarios afectados, nunca de oficio",
       "No, solo cabría la expropiación forzosa de la totalidad del sector, sin otra alternativa"],
      "Art. 122.3 LUA: el sistema de actuación podrá ser sustituido, de oficio o a instancia de parte; se considerará justificado el cambio por el transcurso de los plazos fijados por el planeamiento."),
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// CASO 3 — La ampliación sin licencia en Torrero
// ═══════════════════════════════════════════════════════════════════════
const CASO_3 = {
  slug: "caso-ampliacion-sin-licencia-torrero-edificacion-disciplina",
  titulo: "La ampliación sin licencia en Torrero: edificación, uso del suelo y disciplina urbanística",
  orden: 3,
  supuesto:
    "Un propietario del barrio de Torrero amplía su vivienda excediendo la edificabilidad prevista en el " +
    "planeamiento en un 15 %, sin haber solicitado la preceptiva licencia urbanística. Los inspectores " +
    "urbanísticos municipales, tras recibir una denuncia vecinal, acuden a inspeccionar la obra y solicitan la " +
    "exhibición de la documentación, que el propietario se niega a mostrar. El Ayuntamiento debe calificar la " +
    "infracción cometida y decidir las medidas a adoptar, incluida una eventual orden de paralización de las " +
    "obras en curso.",
  preguntas: [
    q("edificacion-uso", "facil",
      "Los actos de transformación, construcción, edificación y uso del suelo, como esta ampliación de vivienda, ¿requieren para su lícito ejercicio algún título habilitante?",
      ["Sí, requerirán para su lícito ejercicio de licencia, declaración responsable o comunicación previa, según corresponda",
       "No, cualquier obra de ampliación puede ejecutarse libremente sin ningún título habilitante",
       "Sí, pero únicamente si la vivienda se encuentra en suelo urbanizable, nunca en suelo urbano",
       "No, el título habilitante solo es exigible para obras de nueva planta, nunca para ampliaciones"],
      "Art. 225 LUA: los actos de transformación, construcción, edificación y uso del suelo requerirán para su lícito ejercicio de licencia, declaración responsable o comunicación previa."),
    q("edificacion-uso", "media",
      "Dado que la ampliación altera la configuración arquitectónica del edificio por su entidad, ¿qué título habilitante concreto sería exigible, conforme a la Ley?",
      ["Licencia urbanística, pues las obras de ampliación que alteren la configuración arquitectónica del edificio están sujetas a licencia",
       "Una simple comunicación previa, en todo caso, sea cual sea la entidad de la obra",
       "Ningún título habilitante, al tratarse de una vivienda unifamiliar de uso privado",
       "Declaración responsable, exactamente igual que para obras de escasa entidad constructiva"],
      "Art. 226.2.c) LUA: están sujetas a licencia las obras de ampliación, modificación, reforma o rehabilitación que alteren la configuración arquitectónica del edificio."),
    q("edificacion-uso", "facil",
      "La licencia urbanística, ¿qué autoridad municipal la otorga con carácter general?",
      ["El Alcalde",
       "El Pleno de la Corporación, en todo caso",
       "El Secretario municipal, como fedatario del expediente",
       "El Consejo Provincial de Urbanismo correspondiente"],
      "Art. 226.1 LUA: la licencia urbanística es el acto administrativo por el que el Alcalde autoriza los actos de transformación, construcción, edificación o uso del suelo o el subsuelo."),
    q("disciplina-urbanistica", "media",
      "Los inspectores urbanísticos que acuden a inspeccionar la obra, ¿qué condición tienen a efectos de sus facultades de inspección?",
      ["Tienen la condición de agentes de la autoridad",
       "Actúan como meros particulares sin ninguna facultad especial de inspección",
       "Solo tienen facultades de inspección si van acompañados de un juez",
       "Carecen de cualquier facultad coercitiva, limitándose a levantar un simple informe no vinculante"],
      "Art. 265.1 LUA: los inspectores urbanísticos tienen la condición de agentes de la autoridad."),
    q("disciplina-urbanistica", "dificil",
      "El propietario se niega a exhibir la documentación solicitada por los inspectores. ¿Cómo califica la Ley esa negativa?",
      ["Se considerará obstrucción de la actividad de inspección",
       "Es una conducta irrelevante desde el punto de vista de la disciplina urbanística",
       "Solo constituye obstrucción si el propietario impide físicamente el acceso al inmueble",
       "Constituye directamente un delito de desobediencia, sin calificación administrativa previa"],
      "Art. 265.3.b) LUA: se considerará obstrucción de la actividad de inspección la negativa a efectuar la exhibición de la documentación requerida."),
    q("disciplina-urbanistica", "facil",
      "Las actas de inspección extendidas por los inspectores urbanísticos, ¿qué naturaleza y valor probatorio tienen?",
      ["Tienen la naturaleza de documentos públicos y constituyen prueba de los hechos que motiven su formalización, salvo que se acredite lo contrario",
       "Tienen carácter meramente orientativo, sin ningún valor probatorio en el expediente",
       "Solo tienen valor probatorio si son ratificadas posteriormente por un notario",
       "Carecen de cualquier eficacia mientras no sean confirmadas por sentencia judicial firme"],
      "Art. 266.1 LUA: las actas y diligencias de los inspectores urbanísticos tienen la naturaleza de documentos públicos y constituyen prueba de los hechos que motiven su formalización, salvo prueba en contrario."),
    q("disciplina-urbanistica", "media",
      "La ejecución de la ampliación excediendo la edificabilidad prevista en el planeamiento en un 15 %, ¿qué calificación merece conforme a la Ley?",
      ["Infracción grave, pues la ejecución de edificaciones excediendo la edificabilidad determinada en el instrumento de planeamiento en más de un diez por ciento se considera infracción grave",
       "Infracción leve, por tratarse de una vivienda unifamiliar de escasa entidad",
       "Infracción muy grave, en todo caso, cualquiera que sea el porcentaje de exceso",
       "No constituye infracción alguna mientras la obra sea técnicamente legalizable"],
      "Art. 278.c).1ª LUA: se considera infracción grave la ejecución de edificaciones excediendo la edificabilidad determinada en el instrumento de planeamiento en más de un diez por ciento."),
    q("disciplina-urbanistica", "facil",
      "¿Dentro de qué horquilla de multa se sanciona esa infracción grave?",
      ["De seis mil euros y un céntimo a sesenta mil euros",
       "De seiscientos a seis mil euros, igual que las infracciones leves",
       "De sesenta mil euros y un céntimo a trescientos mil euros, igual que las infracciones muy graves",
       "La Ley no fija ninguna horquilla concreta para las infracciones graves"],
      "Art. 278 LUA: las infracciones graves serán sancionadas con multa de seis mil euros y un céntimo a sesenta mil euros."),
    q("disciplina-urbanistica", "dificil",
      "Si el Ayuntamiento ordenara la paralización de las obras y el propietario continuara ejecutándolas incumpliendo esa orden, ¿qué calificación adicional merece ese incumplimiento?",
      ["El incumplimiento de la orden de paralización y de las demás medidas cautelares constituye, por sí mismo, una infracción grave",
       "Carece de cualquier relevancia disciplinaria adicional, al estar ya sancionada la infracción original",
       "Constituye automáticamente una infracción leve, al tratarse de un incumplimiento meramente formal",
       "Solo tiene consecuencias en vía penal, nunca en vía administrativa urbanística"],
      "Art. 278.h) LUA: constituye infracción grave el incumplimiento de la orden de paralización y de las demás medidas cautelares que pudieran imponerse."),
    q("edificacion-uso", "media",
      "Con carácter general, mientras no exista plan que lo autorice, ¿hasta qué altura máxima puede edificarse en este municipio, sin perjuicio de otras limitaciones aplicables?",
      ["No podrá edificarse con una altura superior a tres plantas, medidas en cada punto del terreno",
       "No existe ningún límite de altura mientras no se apruebe el plan general",
       "El límite general es de cinco plantas, salvo que el plan reduzca esa altura",
       "El límite depende exclusivamente de la anchura de la calle a la que dé frente el edificio"],
      "Art. 215.1 LUA: mientras no exista plan que lo autorice, no podrá edificarse con una altura superior a tres plantas, medidas en cada punto del terreno."),
  ],
};

for (const caso of [CASO_1, CASO_2, CASO_3]) {
  await crearCaso(caso);
}
console.log("✔ Casos prácticos del tema 23 (La Ley de Urbanismo de Aragón) sembrados.");
