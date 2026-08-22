/**
 * Casos prácticos — Tema 19 (La función pública local, TREBEP Título V:
 * planificación de recursos humanos, estructuración del empleo público y
 * provisión de puestos y movilidad). 3 casos de 10 preguntas cada uno,
 * cierra el bloque 6 (función pública) junto a los temas 17 y 18:
 *   1. La oferta de empleo público del Ayuntamiento: planificación de
 *      recursos humanos (arts. 69-71)
 *   2. La plantilla y la relación de puestos de trabajo: estructuración
 *      del empleo público (arts. 72-77)
 *   3. El puesto de jefatura por concurso o libre designación: provisión
 *      de puestos y movilidad (arts. 78-84)
 *
 * Reutiliza las secciones ya usadas por las preguntas sueltas del tema
 * (planificacion-rrhh, estructuracion-empleo, provision-movilidad). Misma
 * mecánica que los casos anteriores: preguntas/opciones en las tablas ya
 * existentes, enlazadas vía caso_preguntas con su `orden`. La primera
 * opción de cada pregunta es siempre la correcta (el cliente baraja el
 * orden al mostrarlas).
 *
 * Uso: node --env-file=.env.local scripts/seed-casos-practicos-tema-19.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

const TEMA = "tema-19";
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
// CASO 1 — La oferta de empleo público del Ayuntamiento
// ═══════════════════════════════════════════════════════════════════════
const CASO_1 = {
  slug: "caso-oferta-empleo-publico-planificacion-rrhh",
  titulo: "La oferta de empleo público del Ayuntamiento: planificación de recursos humanos",
  orden: 1,
  supuesto:
    "El Ayuntamiento de Zaragoza, tras detectar un déficit de efectivos en varios servicios, aprueba un Plan de " +
    "Ordenación de Recursos Humanos. Como parte del plan, se elabora la Oferta de empleo público del año, que " +
    "incluye 40 plazas de nuevo ingreso con dotación presupuestaria, y se publica en el boletín oficial " +
    "correspondiente. El Ayuntamiento también constituye un Registro de personal para inscribir los datos de " +
    "sus empleados. Al no disponer de suficiente capacidad técnica para gestionar de forma avanzada ese " +
    "registro, solicita la cooperación de la Comunidad Autónoma de Aragón.",
  preguntas: [
    q("planificacion-rrhh", "facil",
      "¿Cuál es el objetivo principal de la planificación de los recursos humanos en las Administraciones Públicas?",
      ["Contribuir a la eficacia en la prestación de los servicios y a la eficiencia en la utilización de los recursos económicos disponibles, mediante la dimensión adecuada de los efectivos, su distribución, formación, promoción y movilidad",
       "Reducir en todo caso el número total de empleados públicos de la Administración",
       "Garantizar exclusivamente la promoción interna de los funcionarios ya en servicio activo",
       "Sustituir progresivamente al personal funcionario por personal laboral"],
      "Art. 69.1 TREBEP: la planificación de los recursos humanos tendrá como objetivo contribuir a la eficacia en la prestación de servicios y a la eficiencia en el uso de los recursos económicos, mediante la dimensión adecuada de los efectivos, su distribución, formación, promoción y movilidad."),
    q("planificacion-rrhh", "media",
      "Entre las medidas que puede incluir un Plan de Ordenación de Recursos Humanos, ¿cuál de las siguientes contempla expresamente el Estatuto?",
      ["El análisis de las disponibilidades y necesidades de personal, tanto en número de efectivos como en perfiles profesionales o niveles de cualificación",
       "La fijación directa de los salarios de cada empleado público de forma individualizada",
       "La supresión automática de todos los cuerpos y escalas existentes en la Administración",
       "La sustitución permanente de los procesos selectivos por la libre designación"],
      "Art. 69.2.a) TREBEP: los Planes de Ordenación de Recursos Humanos pueden incluir el análisis de las disponibilidades y necesidades de personal, en número de efectivos y en perfiles o cualificación."),
    q("planificacion-rrhh", "media",
      "Las 40 plazas de nuevo ingreso con dotación presupuestaria que necesita cubrir el Ayuntamiento, ¿mediante qué instrumento deben incorporarse?",
      ["Mediante la Oferta de empleo público, u otro instrumento similar de gestión de la provisión de las necesidades de personal",
       "Mediante convenio colectivo exclusivamente, sin necesidad de otro instrumento",
       "Mediante decreto directo del Alcalde, sin necesidad de convocatoria pública",
       "Mediante ampliación automática de la plantilla, sin ningún instrumento formal"],
      "Art. 70.1 TREBEP: las necesidades de recursos humanos con asignación presupuestaria que deban proveerse mediante personal de nuevo ingreso serán objeto de la Oferta de empleo público o instrumento similar."),
    q("planificacion-rrhh", "dificil",
      "Una vez incluidas esas 40 plazas en la Oferta de empleo público, ¿en qué plazo máximo debe desarrollarse su ejecución?",
      ["Dentro del plazo improrrogable de tres años",
       "Dentro del plazo de un año, prorrogable indefinidamente",
       "No existe ningún plazo máximo para ejecutar la Oferta de empleo público",
       "Dentro del plazo de seis meses desde su publicación"],
      "Art. 70.1 TREBEP: la ejecución de la Oferta de empleo público o instrumento similar deberá desarrollarse dentro del plazo improrrogable de tres años."),
    q("planificacion-rrhh", "facil",
      "¿Qué órganos deben aprobar anualmente la Oferta de empleo público, y dónde debe publicarse?",
      ["Se aprueba por los órganos de Gobierno de las Administraciones Públicas y debe publicarse en el Diario oficial correspondiente",
       "La aprueba directamente cada jefe de servicio, sin necesidad de publicación oficial",
       "La aprueba el Tribunal de Cuentas, publicándose únicamente en la intranet municipal",
       "No requiere aprobación formal, basta con su comunicación interna al personal"],
      "Art. 70.2 TREBEP: la Oferta de empleo público se aprobará anualmente por los órganos de Gobierno de las Administraciones Públicas y deberá ser publicada en el Diario oficial correspondiente."),
    q("planificacion-rrhh", "media",
      "Además del compromiso de las 40 plazas, ¿puede el Ayuntamiento convocar procesos selectivos por encima de ese número dentro de la misma Oferta de empleo público?",
      ["Sí, la Oferta de empleo público comporta la obligación de convocar los procesos selectivos para las plazas comprometidas y hasta un diez por cien adicional",
       "No, el número de plazas convocadas debe coincidir exactamente con el comprometido, sin margen alguno",
       "Sí, sin ningún límite porcentual sobre las plazas comprometidas",
       "No, cualquier plaza adicional exige necesariamente una nueva Oferta de empleo público independiente"],
      "Art. 70.1 TREBEP: la Oferta de empleo público comportará la obligación de convocar los procesos selectivos para las plazas comprometidas y hasta un diez por cien adicional."),
    q("planificacion-rrhh", "facil",
      "¿Debe el Ayuntamiento constituir un Registro de personal en el que se inscriban los datos relativos a sus empleados?",
      ["Sí, cada Administración Pública constituirá un Registro en el que se inscribirán los datos relativos a su personal",
       "No, los registros de personal son una facultad exclusiva de la Administración General del Estado",
       "Sí, pero únicamente en los municipios de gran población",
       "No, esa obligación fue derogada por el Estatuto Básico del Empleado Público"],
      "Art. 71.1 TREBEP: cada Administración Pública constituirá un Registro en el que se inscribirán los datos relativos a su personal."),
    q("planificacion-rrhh", "media",
      "Al no disponer de suficiente capacidad técnica para gestionar de forma avanzada su registro, ¿puede el Ayuntamiento solicitar cooperación de la Comunidad Autónoma?",
      ["Sí, cuando las Entidades Locales no cuenten con suficiente capacidad financiera o técnica, la Administración General del Estado y las Comunidades Autónomas cooperarán con ellas a estos efectos",
       "No, cada Entidad Local debe asumir en solitario la gestión de su registro de personal",
       "Sí, pero únicamente si media un convenio previo aprobado por las Cortes Generales",
       "No, esa cooperación solo está prevista para los municipios de menos de 1.000 habitantes"],
      "Art. 71.5 TREBEP: cuando las Entidades Locales no cuenten con suficiente capacidad financiera o técnica, la Administración General del Estado y las Comunidades Autónomas cooperarán con ellas."),
    q("planificacion-rrhh", "dificil",
      "Si varias Administraciones quisieran establecer contenidos mínimos comunes para sus registros de personal y homogeneizar el intercambio de información, ¿qué instrumento prevé el Estatuto para ello?",
      ["Un convenio de Conferencia Sectorial, con respeto a la legislación de protección de datos de carácter personal",
       "Una ley orgánica específica aprobada por las Cortes Generales",
       "Un simple acuerdo verbal entre los responsables de recursos humanos de cada Administración",
       "El Estatuto no prevé ningún instrumento de coordinación entre registros de personal"],
      "Art. 71.3 TREBEP: mediante convenio de Conferencia Sectorial se establecerán los contenidos mínimos comunes de los Registros de personal y los criterios de intercambio homogéneo de información."),
    q("planificacion-rrhh", "media",
      "Entre las medidas de un Plan de Ordenación de Recursos Humanos, ¿puede figurar la previsión de incorporación de personal a través de la Oferta de empleo público?",
      ["Sí, entre las medidas que puede incluir un Plan figura expresamente la previsión de la incorporación de recursos humanos a través de la Oferta de empleo público",
       "No, la Oferta de empleo público es un instrumento completamente independiente y ajeno a los Planes de Ordenación de Recursos Humanos",
       "Sí, pero solo si el Plan lo excluye expresamente de forma justificada",
       "No, los Planes de Ordenación de Recursos Humanos solo pueden referirse a movilidad, nunca a nuevo ingreso"],
      "Art. 69.2.e) TREBEP: los Planes de Ordenación de Recursos Humanos pueden incluir la previsión de la incorporación de recursos humanos a través de la Oferta de empleo público."),
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// CASO 2 — La plantilla y la relación de puestos de trabajo
// ═══════════════════════════════════════════════════════════════════════
const CASO_2 = {
  slug: "caso-plantilla-relacion-puestos-trabajo-estructuracion",
  titulo: "La plantilla y la relación de puestos de trabajo: estructuración del empleo público",
  orden: 2,
  supuesto:
    "El Ayuntamiento aprueba su relación de puestos de trabajo, que detalla la denominación de cada puesto, el " +
    "grupo de clasificación profesional, el cuerpo o escala al que está adscrito, el sistema de provisión y las " +
    "retribuciones complementarias. Uno de los puestos, de nivel técnico, exige estar en posesión de un título " +
    "universitario de Grado para acceder a él. Por necesidades del servicio, se pide a un funcionario que " +
    "desempeñe temporalmente tareas distintas a las de su puesto habitual, aunque adecuadas a su categoría, sin " +
    "merma en sus retribuciones. Por otro lado, el Ayuntamiento se plantea crear un nuevo cuerpo de funcionarios " +
    "especializado en gestión medioambiental.",
  preguntas: [
    q("estructuracion-empleo", "facil",
      "La relación de puestos de trabajo que aprueba el Ayuntamiento, ¿qué contenido mínimo debe comprender conforme al Estatuto?",
      ["Al menos, la denominación de los puestos, los grupos de clasificación profesional, los cuerpos o escalas a que estén adscritos, los sistemas de provisión y las retribuciones complementarias",
       "Únicamente el nombre y apellidos de cada empleado que ocupa el puesto",
       "Solo la retribución total de cada puesto, sin ninguna otra especificación",
       "Únicamente el organigrama jerárquico del Ayuntamiento, sin más contenido"],
      "Art. 74 TREBEP: las relaciones de puestos de trabajo comprenderán, al menos, la denominación de los puestos, los grupos de clasificación, los cuerpos o escalas, los sistemas de provisión y las retribuciones complementarias."),
    q("estructuracion-empleo", "media",
      "¿Deben ser públicos estos instrumentos organizativos, como la relación de puestos de trabajo?",
      ["Sí, dichos instrumentos serán públicos",
       "No, tienen carácter reservado y de uso interno exclusivo de recursos humanos",
       "Sí, pero únicamente accesibles a los propios empleados públicos afectados",
       "No, solo se hacen públicos si lo solicita expresamente algún interesado"],
      "Art. 74 TREBEP (in fine): dichos instrumentos organizativos serán públicos."),
    q("estructuracion-empleo", "media",
      "El puesto de nivel técnico que exige título universitario de Grado para acceder a él, ¿a qué grupo de clasificación profesional pertenece?",
      ["Al Grupo A, para cuyo acceso se exige estar en posesión del título universitario de Grado",
       "Al Grupo B, reservado a quienes posean el título de Técnico Superior",
       "Al Grupo C1, para el que se exige título de Bachiller o Técnico",
       "Al Grupo C2, para el que se exige título de Graduado en Educación Secundaria Obligatoria"],
      "Art. 76 TREBEP: para el acceso a los cuerpos o escalas del Grupo A se exigirá estar en posesión del título universitario de Grado."),
    q("estructuracion-empleo", "facil",
      "Dentro del Grupo A, ¿en cuántos subgrupos se divide, y con qué criterio se distinguen?",
      ["En dos subgrupos, A1 y A2, en función del nivel de responsabilidad de las funciones a desempeñar y de las características de las pruebas de acceso",
       "En tres subgrupos, A1, A2 y A3, según la antigüedad del cuerpo o escala",
       "No se divide en subgrupos, es un grupo único e indivisible",
       "En dos subgrupos determinados exclusivamente por el sexo de los aspirantes"],
      "Art. 76 TREBEP: el Grupo A se divide en los Subgrupos A1 y A2, en función del nivel de responsabilidad de las funciones y de las características de las pruebas de acceso."),
    q("estructuracion-empleo", "media",
      "Por necesidades del servicio, se pide a un funcionario que desempeñe temporalmente tareas distintas a las de su puesto habitual, aunque adecuadas a su clasificación, sin merma en sus retribuciones. ¿Permite esto el Estatuto?",
      ["Sí, las Administraciones Públicas podrán asignar a su personal funciones, tareas o responsabilidades distintas a las de su puesto cuando resulten adecuadas a su clasificación, grado o categoría, si las necesidades del servicio lo justifican y sin merma en las retribuciones",
       "No, un funcionario únicamente puede desempeñar las tareas exactas de su puesto de trabajo, sin ninguna excepción",
       "Sí, pero solo si el funcionario lo solicita expresamente por escrito",
       "No, cualquier cambio de tareas exige necesariamente una modificación previa de la relación de puestos de trabajo"],
      "Art. 73.2 TREBEP: las Administraciones podrán asignar funciones o tareas distintas a las del puesto, adecuadas a la clasificación, grado o categoría, cuando las necesidades del servicio lo justifiquen, sin merma en las retribuciones."),
    q("estructuracion-empleo", "dificil",
      "El Ayuntamiento se plantea crear un nuevo cuerpo de funcionarios especializado en gestión medioambiental. ¿Puede hacerlo por sí mismo, mediante un simple acuerdo de la Junta de Gobierno Local?",
      ["No, los cuerpos y escalas de funcionarios se crean, modifican y suprimen por ley de las Cortes Generales o de las asambleas legislativas de las comunidades autónomas",
       "Sí, cualquier Ayuntamiento puede crear libremente sus propios cuerpos de funcionarios mediante ordenanza",
       "Sí, siempre que cuente con el informe favorable del Secretario municipal",
       "No, la creación de cuerpos de funcionarios está reservada en exclusiva a la Administración General del Estado"],
      "Art. 75.2 TREBEP: los cuerpos y escalas de funcionarios se crean, modifican y suprimen por ley de las Cortes Generales o de las asambleas legislativas de las comunidades autónomas."),
    q("estructuracion-empleo", "facil",
      "¿En qué se agrupan los funcionarios de carrera, según el Estatuto, para incorporar competencias, capacidades y conocimientos comunes acreditados en un proceso selectivo?",
      ["En cuerpos, escalas, especialidades u otros sistemas análogos",
       "Únicamente en categorías profesionales negociadas colectivamente",
       "En niveles retributivos, sin ninguna otra clasificación adicional",
       "En departamentos administrativos, sin ninguna clasificación profesional específica"],
      "Art. 75.1 TREBEP: los funcionarios se agrupan en cuerpos, escalas, especialidades u otros sistemas que incorporen competencias, capacidades y conocimientos comunes acreditados a través de un proceso selectivo."),
    q("estructuracion-empleo", "media",
      "Si el Ayuntamiento tuviera también personal laboral en su plantilla, ¿conforme a qué normativa se clasifica ese personal?",
      ["El personal laboral se clasifica de conformidad con la legislación laboral",
       "Se clasifica exactamente con los mismos grupos A, B, C1 y C2 que el personal funcionario",
       "No existe ninguna clasificación aplicable al personal laboral de las Administraciones Públicas",
       "Se clasifica según lo que determine unilateralmente cada jefe de servicio"],
      "Art. 77 TREBEP: el personal laboral se clasificará de conformidad con la legislación laboral."),
    q("estructuracion-empleo", "dificil",
      "Con carácter general, ¿tienen los empleados públicos derecho al desempeño de un puesto de trabajo conforme al sistema de estructuración del empleo público?",
      ["Sí, los empleados públicos tienen derecho al desempeño de un puesto de trabajo de acuerdo con el sistema de estructuración del empleo público que establezcan las leyes de desarrollo del Estatuto",
       "No, el desempeño de un puesto concreto es una mera expectativa, no un derecho reconocido",
       "Sí, pero únicamente el personal funcionario de carrera, nunca el personal laboral",
       "No, ese derecho solo se reconoce a los funcionarios del Grupo A"],
      "Art. 73.1 TREBEP: los empleados públicos tienen derecho al desempeño de un puesto de trabajo de acuerdo con el sistema de estructuración del empleo público que establezcan las leyes de desarrollo del Estatuto."),
    q("estructuracion-empleo", "media",
      "¿Con qué finalidad pueden agruparse los puestos de trabajo en función de sus características, según el Estatuto?",
      ["Para ordenar la selección, la formación y la movilidad",
       "Únicamente para fijar de forma más rápida las retribuciones de cada puesto",
       "Exclusivamente para facilitar la elaboración de organigramas gráficos",
       "El Estatuto no prevé ninguna finalidad concreta para agrupar los puestos de trabajo"],
      "Art. 73.3 TREBEP: los puestos de trabajo podrán agruparse en función de sus características para ordenar la selección, la formación y la movilidad."),
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// CASO 3 — El puesto de jefatura por concurso o libre designación
// ═══════════════════════════════════════════════════════════════════════
const CASO_3 = {
  slug: "caso-jefatura-concurso-libre-designacion-movilidad",
  titulo: "El puesto de jefatura por concurso o libre designación: provisión y movilidad",
  orden: 3,
  supuesto:
    "El Ayuntamiento convoca un concurso para proveer una jefatura de sección, valorando los méritos y " +
    "capacidades de los candidatos mediante un órgano colegiado técnico. En otro proceso paralelo, convoca por " +
    "libre designación con convocatoria pública un puesto de especial responsabilidad y confianza, para el que " +
    "el órgano competente aprecia discrecionalmente la idoneidad de los candidatos. Meses después, ese titular " +
    "es cesado discrecionalmente de su puesto de libre designación. Al mismo tiempo, una funcionaria víctima de " +
    "violencia de género solicita el traslado a otro puesto de trabajo de su misma categoría profesional en " +
    "otra localidad. Por último, otro funcionario obtiene destino en la Diputación General de Aragón a través " +
    "de un procedimiento de movilidad interadministrativa.",
  preguntas: [
    q("provision-movilidad", "facil",
      "¿Con arreglo a qué principios deben proveerse los puestos de trabajo de las Administraciones Públicas?",
      ["Igualdad, mérito, capacidad y publicidad",
       "Antigüedad exclusivamente, sin ningún otro criterio",
       "Libre designación generalizada, sin sujeción a principios adicionales",
       "Confianza política del órgano de gobierno correspondiente"],
      "Art. 78.1 TREBEP: las Administraciones Públicas proveerán los puestos de trabajo mediante procedimientos basados en los principios de igualdad, mérito, capacidad y publicidad."),
    q("provision-movilidad", "media",
      "¿Cuáles son los dos procedimientos ordinarios de provisión de puestos de trabajo del personal funcionario de carrera?",
      ["El concurso y la libre designación con convocatoria pública",
       "La antigüedad y la oposición libre",
       "El sorteo y la designación directa del Alcalde",
       "La herencia del puesto y la promoción automática"],
      "Art. 78.2 TREBEP: la provisión de puestos de trabajo se llevará a cabo por los procedimientos de concurso y de libre designación con convocatoria pública."),
    q("provision-movilidad", "media",
      "En el concurso convocado para la jefatura de sección, ¿quién valora los méritos y capacidades de los candidatos?",
      ["Órganos colegiados de carácter técnico, cuya composición responde al principio de profesionalidad y especialización y se adecúa al criterio de paridad entre mujer y hombre",
       "Directamente el Alcalde, sin intervención de ningún órgano colegiado",
       "Una empresa externa de selección de personal, contratada al efecto",
       "El propio candidato, mediante autoevaluación de sus méritos"],
      "Art. 79.1 TREBEP: el concurso consistirá en la valoración de méritos y capacidades por órganos colegiados de carácter técnico, con profesionalidad, especialización y paridad entre mujer y hombre."),
    q("provision-movilidad", "facil",
      "El puesto de especial responsabilidad y confianza cubierto por libre designación, ¿en qué consiste este procedimiento de provisión?",
      ["En la apreciación discrecional por el órgano competente de la idoneidad de los candidatos en relación con los requisitos exigidos para el desempeño del puesto",
       "En la aplicación de un baremo objetivo de méritos, exactamente igual que en el concurso",
       "En un sorteo público entre los candidatos que reúnan los requisitos mínimos",
       "En la elección directa por votación del personal del servicio"],
      "Art. 80.1 TREBEP: la libre designación con convocatoria pública consiste en la apreciación discrecional por el órgano competente de la idoneidad de los candidatos."),
    q("provision-movilidad", "media",
      "El titular de ese puesto de libre designación es cesado discrecionalmente. ¿Qué debe garantizarle la Administración tras el cese?",
      ["Se le deberá asignar un puesto de trabajo conforme al sistema de carrera profesional propio de la Administración y con las garantías inherentes a dicho sistema",
       "No tiene derecho a ningún puesto posterior, pues el cese discrecional implica la pérdida de su condición de funcionario",
       "Únicamente tiene derecho a una indemnización económica, sin reingreso posible",
       "Debe superar de nuevo un proceso selectivo completo para reingresar en la Administración"],
      "Art. 80.4 TREBEP: en caso de cese de un puesto de libre designación, se le deberá asignar un puesto de trabajo conforme al sistema de carrera profesional propio de la Administración."),
    q("provision-movilidad", "dificil",
      "La funcionaria víctima de violencia de género solicita el traslado a otro puesto de su misma categoría en otra localidad. ¿Exige el Estatuto que se trate de una vacante de necesaria cobertura para reconocerle ese derecho?",
      ["No, tendrá derecho al traslado a otro puesto de trabajo de análogas características sin necesidad de que sea vacante de necesaria cobertura, y la Administración deberá comunicarle las vacantes existentes en la localidad que solicite",
       "Sí, el traslado solo procede si la plaza está calificada como de necesaria cobertura",
       "No, pero solo tiene derecho al traslado dentro del mismo municipio, nunca a otra localidad",
       "Sí, y además debe aportar una autorización judicial específica para cada traslado"],
      "Art. 82.1 TREBEP: las víctimas de violencia de género tendrán derecho al traslado a otro puesto de análogas características sin necesidad de que sea vacante de necesaria cobertura."),
    q("provision-movilidad", "facil",
      "Ese traslado de la funcionaria víctima de violencia de género, ¿qué consideración tiene a efectos del Estatuto?",
      ["Tendrá la consideración de traslado forzoso",
       "Tendrá la consideración de una excedencia voluntaria por interés particular",
       "Tendrá la consideración de una permuta entre puestos de trabajo",
       "No tiene ninguna consideración jurídica específica distinta de un traslado ordinario"],
      "Art. 82.1 TREBEP (in fine): este traslado tendrá la consideración de traslado forzoso."),
    q("provision-movilidad", "media",
      "El funcionario que obtiene destino en la Diputación General de Aragón mediante movilidad interadministrativa, ¿en qué situación queda respecto a su Administración de origen?",
      ["Queda en la situación administrativa de servicio en otras Administraciones Públicas",
       "Pierde definitivamente su condición de funcionario de la Administración de origen",
       "Queda en situación de excedencia voluntaria por interés particular",
       "Continúa en situación de servicio activo en su Administración de origen, sin ninguna modificación"],
      "Art. 84.3 TREBEP: los funcionarios que obtengan destino en otra Administración a través de procedimientos de movilidad quedarán, respecto de su Administración de origen, en situación de servicio en otras Administraciones Públicas."),
    q("provision-movilidad", "dificil",
      "Si ese funcionario, tras un cese en un puesto de libre designación en la Administración de destino, no solicita el reingreso al servicio activo en su Administración de origen dentro del plazo establecido, ¿qué ocurre?",
      ["Será declarado de oficio en situación de excedencia voluntaria por interés particular",
       "Pierde automáticamente y de forma definitiva la condición de funcionario",
       "Se le declara en situación de suspensión de funciones",
       "Continúa indefinidamente en servicio en la Administración de destino, sin ninguna consecuencia"],
      "Art. 84.3 TREBEP (párrafo final): de no solicitarse el reingreso al servicio activo en el plazo indicado, será declarado de oficio en situación de excedencia voluntaria por interés particular."),
    q("provision-movilidad", "media",
      "En caso de urgente e inaplazable necesidad, ¿puede el Ayuntamiento proveer un puesto de trabajo con carácter provisional, sin convocatoria previa?",
      ["Sí, los puestos de trabajo podrán proveerse con carácter provisional, debiendo procederse a su convocatoria pública dentro del plazo que señalen las normas aplicables",
       "No, cualquier provisión de un puesto exige siempre la convocatoria pública previa, sin excepción",
       "Sí, y en ese caso no es necesaria ninguna convocatoria pública posterior",
       "No, la provisión provisional de puestos fue suprimida por el Estatuto Básico del Empleado Público"],
      "Art. 81.3 TREBEP: en caso de urgente e inaplazable necesidad, los puestos de trabajo podrán proveerse con carácter provisional, debiendo procederse a su convocatoria pública dentro del plazo establecido."),
  ],
};

for (const caso of [CASO_1, CASO_2, CASO_3]) {
  await crearCaso(caso);
}
console.log("✔ Casos prácticos del tema 19 (La función pública local) sembrados.");
