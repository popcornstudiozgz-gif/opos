/**
 * Casos prácticos — Tema 17 (Los empleados públicos: clases, derechos y
 * deberes, TREBEP Títulos II y III). 3 casos de 10 preguntas cada uno:
 *   1. Los cuatro contratos del Ayuntamiento: clases de personal
 *      (funcionario de carrera, interino, laboral, eventual) (arts. 8-12)
 *   2. Los derechos de Nayara en su nuevo puesto: derechos individuales y
 *      derechos individuales de ejercicio colectivo (arts. 14-15)
 *   3. El código de conducta del funcionario de ventanilla: deberes,
 *      principios éticos y principios de conducta (arts. 52-54)
 *
 * Reutiliza las secciones ya usadas por las preguntas sueltas del tema
 * (clases-personal, derechos, deberes-codigo-conducta). Misma mecánica
 * que los casos anteriores: preguntas/opciones en las tablas ya
 * existentes, enlazadas vía caso_preguntas con su `orden`. La primera
 * opción de cada pregunta es siempre la correcta (el cliente baraja el
 * orden al mostrarlas).
 *
 * Uso: node --env-file=.env.local scripts/seed-casos-practicos-tema-17.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

const TEMA = "tema-17";
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
// CASO 1 — Los cuatro contratos del Ayuntamiento
// ═══════════════════════════════════════════════════════════════════════
const CASO_1 = {
  slug: "caso-cuatro-contratos-ayuntamiento-clases-personal",
  titulo: "Los cuatro contratos del Ayuntamiento: clases de personal",
  orden: 1,
  supuesto:
    "El Ayuntamiento de Zaragoza necesita cubrir varios puestos con urgencia. Para una plaza vacante de auxiliar " +
    "administrativo, cuyo proceso selectivo de funcionarios de carrera aún no ha concluido, nombra " +
    "provisionalmente a Marisa. Para sustituir a un funcionario de baja médica prolongada, nombra a Íñigo " +
    "durante el tiempo estrictamente necesario. El Ayuntamiento también contrata a Carla mediante contrato de " +
    "trabajo temporal para reforzar el Servicio de Deportes durante el verano. Por último, el nuevo Concejal de " +
    "Cultura nombra libremente a su asesor de confianza, Bruno, que no realizará ninguna función distinta del " +
    "asesoramiento político.",
  preguntas: [
    q("clases-personal", "facil",
      "¿En cuántas clases se clasifican los empleados públicos conforme al TREBEP?",
      ["En cuatro: funcionarios de carrera, funcionarios interinos, personal laboral y personal eventual",
       "En dos: funcionarios y personal laboral, exclusivamente",
       "En tres: funcionarios de carrera, personal laboral y personal directivo",
       "En cinco, incluyendo también al personal de alta dirección como categoría independiente"],
      "Art. 8.2 TREBEP: los empleados públicos se clasifican en funcionarios de carrera, funcionarios interinos, personal laboral y personal eventual."),
    q("clases-personal", "media",
      "Marisa es nombrada para una plaza vacante cuyo proceso selectivo de funcionarios de carrera aún no ha concluido. ¿Qué figura es esta, y cuál es su límite temporal máximo general?",
      ["Funcionaria interina, nombrada por existencia de plazas vacantes que no pueden cubrirse por funcionarios de carrera, por un máximo de tres años",
       "Funcionaria de carrera provisional, sin ningún límite temporal",
       "Personal laboral temporal, con un máximo de un año",
       "Personal eventual, cuyo cese coincide con el de la autoridad que la nombró"],
      "Art. 10.1.a) TREBEP: son funcionarios interinos, entre otros supuestos, los nombrados por existencia de plazas vacantes que no puedan cubrirse por funcionarios de carrera, por un máximo de tres años."),
    q("clases-personal", "dificil",
      "Transcurridos los tres años desde el nombramiento de Marisa sin que se haya cubierto la plaza, y si el proceso selectivo queda desierto, ¿qué ocurre?",
      ["Se producirá el fin de la relación de interinidad, y la vacante solo podrá ser ocupada por personal funcionario de carrera, salvo que el proceso selectivo quede desierto, en cuyo caso cabe un nuevo nombramiento interino",
       "Marisa adquiere automáticamente la condición de funcionaria de carrera por el simple transcurso del plazo",
       "La plaza queda definitivamente amortizada, sin posibilidad de nuevo nombramiento interino",
       "El Ayuntamiento debe indemnizar obligatoriamente a Marisa con independencia de lo que ocurra con la plaza"],
      "Art. 10.4 TREBEP: transcurridos tres años se producirá el fin de la relación de interinidad, y la vacante solo podrá ser ocupada por personal funcionario de carrera, salvo que el proceso selectivo quede desierto."),
    q("clases-personal", "media",
      "Íñigo es nombrado para sustituir transitoriamente a un funcionario de baja médica prolongada. ¿Qué tipo de nombramiento interino es este?",
      ["Funcionario interino por sustitución transitoria de los titulares, durante el tiempo estrictamente necesario",
       "Funcionario interino por ejecución de un programa de carácter temporal",
       "Funcionario interino por exceso o acumulación de tareas",
       "Funcionario de carrera en comisión de servicios"],
      "Art. 10.1.b) TREBEP: son funcionarios interinos los nombrados para la sustitución transitoria de los titulares, durante el tiempo estrictamente necesario."),
    q("clases-personal", "facil",
      "El nombramiento de Íñigo como funcionario interino, ¿le otorga la condición de funcionario de carrera en algún momento futuro?",
      ["No, el nombramiento derivado de estos procedimientos de selección en ningún caso dará lugar al reconocimiento de la condición de funcionario de carrera",
       "Sí, automáticamente, transcurrido un año desde su nombramiento",
       "Sí, si supera una evaluación de desempeño favorable",
       "Sí, en cuanto se cubra definitivamente la plaza que ocupa provisionalmente"],
      "Art. 10.2 TREBEP: el nombramiento derivado de los procedimientos de selección de personal funcionario interino en ningún caso dará lugar al reconocimiento de la condición de funcionario de carrera."),
    q("clases-personal", "media",
      "Carla es contratada mediante contrato de trabajo temporal para reforzar el Servicio de Deportes durante el verano. ¿Qué clase de empleado público es Carla?",
      ["Personal laboral, pues presta servicios retribuidos en virtud de un contrato de trabajo formalizado por escrito, en este caso de carácter temporal",
       "Funcionaria interina, por tratarse de una necesidad estacional",
       "Personal eventual, al tratarse de un nombramiento de confianza",
       "Funcionaria de carrera en su primer año de servicio"],
      "Art. 11.1 TREBEP: es personal laboral quien, en virtud de contrato de trabajo formalizado por escrito, presta servicios retribuidos por las Administraciones Públicas, pudiendo ser fijo, indefinido o temporal."),
    q("clases-personal", "dificil",
      "Bruno es nombrado libremente por el Concejal de Cultura como asesor de confianza, sin realizar ninguna función distinta del asesoramiento político. ¿Qué clase de empleado público es Bruno?",
      ["Personal eventual, pues solo realiza funciones expresamente calificadas como de confianza o asesoramiento especial, siendo su nombramiento y cese libres",
       "Funcionario de carrera, al desempeñar funciones de asesoramiento a un cargo electo",
       "Personal laboral fijo, dado que su relación tiene vocación de permanencia",
       "Funcionario interino, por el carácter temporal de la legislatura municipal"],
      "Arts. 12.1 y 12.3 TREBEP: es personal eventual el que, con carácter no permanente, solo realiza funciones de confianza o asesoramiento especial, con nombramiento y cese libres."),
    q("clases-personal", "media",
      "Cuando el Concejal de Cultura cese en su cargo, ¿qué ocurre automáticamente con el nombramiento de Bruno como personal eventual?",
      ["El cese de Bruno tendrá lugar, en todo caso, cuando se produzca el cese de la autoridad a la que presta la función de confianza o asesoramiento",
       "Bruno mantiene su puesto de asesor con independencia de quién ocupe la Concejalía",
       "Bruno pasa automáticamente a la situación de excedencia voluntaria",
       "Bruno adquiere automáticamente la condición de personal laboral fijo"],
      "Art. 12.3 TREBEP: el cese del personal eventual tendrá lugar, en todo caso, cuando se produzca el de la autoridad a la que se preste la función de confianza o asesoramiento."),
    q("clases-personal", "facil",
      "¿Puede la condición de personal eventual de Bruno constituir mérito para su acceso futuro a la función pública?",
      ["No, la condición de personal eventual no podrá constituir mérito para el acceso a la Función Pública o para la promoción interna",
       "Sí, constituye siempre un mérito preferente en cualquier proceso selectivo posterior",
       "Sí, pero únicamente para la promoción interna, nunca para el acceso inicial",
       "Depende de lo que decida discrecionalmente cada convocatoria"],
      "Art. 12.4 TREBEP: la condición de personal eventual no podrá constituir mérito para el acceso a la Función Pública o para la promoción interna."),
    q("clases-personal", "dificil",
      "El ejercicio de funciones que impliquen participación directa o indirecta en el ejercicio de las potestades públicas, ¿a quién corresponde en exclusiva, según el TREBEP?",
      ["A los funcionarios públicos, exclusivamente, en los términos que establezca la ley de desarrollo de cada Administración",
       "Indistintamente a funcionarios de carrera y a personal laboral, sin ninguna reserva",
       "Exclusivamente al personal eventual designado por los órganos de gobierno",
       "A cualquier empleado público, sea cual sea su clase, sin excepción"],
      "Art. 9.2 TREBEP: el ejercicio de funciones que impliquen participación en el ejercicio de las potestades públicas o en la salvaguardia de los intereses generales corresponde exclusivamente a los funcionarios públicos."),
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// CASO 2 — Los derechos de Nayara en su nuevo puesto
// ═══════════════════════════════════════════════════════════════════════
const CASO_2 = {
  slug: "caso-nayara-derechos-empleada-publica",
  titulo: "Los derechos de Nayara en su nuevo puesto: derechos individuales y colectivos",
  orden: 2,
  supuesto:
    "Nayara ingresa como funcionaria de carrera en el Ayuntamiento de Zaragoza. Su jefe de servicio le pide que " +
    "participe en un curso de formación técnica sobre nuevas herramientas digitales, que se imparte dentro de " +
    "su horario laboral habitual. Nayara solicita también información sobre las tareas concretas que debe " +
    "desarrollar en su unidad. Meses después, se ve envuelta en un procedimiento judicial derivado del ejercicio " +
    "legítimo de sus funciones, y pide la asistencia jurídica del Ayuntamiento. Al mismo tiempo, decide " +
    "afiliarse a un sindicato, y participa activamente en la negociación colectiva de las condiciones de trabajo " +
    "de su categoría profesional. Cuando la organización sindical convoca una huelga, Nayara decide secundarla, " +
    "aunque se garantiza el mantenimiento de determinados servicios esenciales.",
  preguntas: [
    q("derechos", "facil",
      "El derecho de Nayara a la formación continua, ¿en qué horario debe impartirse preferentemente conforme al Estatuto?",
      ["Preferentemente en horario laboral",
       "Siempre fuera del horario laboral, sin excepción",
       "Únicamente los fines de semana",
       "El Estatuto no establece ninguna preferencia horaria para la formación continua"],
      "Art. 14.g) TREBEP: los empleados públicos tienen derecho a la formación continua y a la actualización permanente de sus conocimientos, preferentemente en horario laboral."),
    q("derechos", "media",
      "¿Tiene Nayara derecho a ser informada por sus superiores de las tareas concretas que debe desarrollar en su unidad?",
      ["Sí, tiene derecho a participar en la consecución de los objetivos atribuidos a la unidad donde preste sus servicios y a ser informada por sus superiores de las tareas a desarrollar",
       "No, la información sobre las tareas queda a la exclusiva discreción del superior jerárquico",
       "Sí, pero únicamente si lo solicita por escrito y de forma motivada",
       "No, ese derecho solo se reconoce al personal directivo"],
      "Art. 14.e) TREBEP: los empleados públicos tienen derecho a participar en la consecución de los objetivos de su unidad y a ser informados por sus superiores de las tareas a desarrollar."),
    q("derechos", "facil",
      "Ante el procedimiento judicial derivado del ejercicio legítimo de sus funciones, ¿tiene Nayara derecho a la defensa jurídica de la Administración?",
      ["Sí, tiene derecho a la defensa jurídica y protección de la Administración Pública en los procedimientos que se sigan ante cualquier orden jurisdiccional como consecuencia del ejercicio legítimo de sus funciones o cargos públicos",
       "No, la defensa jurídica corre siempre por cuenta y riesgo del propio empleado público",
       "Sí, pero únicamente en procedimientos de naturaleza penal, nunca civil o contencioso-administrativa",
       "No, ese derecho solo se reconoce al personal de alta dirección"],
      "Art. 14.f) TREBEP: los empleados públicos tienen derecho a la defensa jurídica y protección de la Administración en los procedimientos derivados del ejercicio legítimo de sus funciones o cargos."),
    q("derechos", "media",
      "¿Es el derecho de Nayara a percibir sus retribuciones un derecho de carácter individual reconocido por el Estatuto?",
      ["Sí, entre los derechos individuales de los empleados públicos figura expresamente el de percibir las retribuciones y las indemnizaciones por razón del servicio",
       "No, las retribuciones se regulan exclusivamente por la normativa presupuestaria, sin configurarse como un derecho individual",
       "Sí, pero solo respecto a las retribuciones básicas, nunca a los complementos",
       "No, ese derecho corresponde únicamente al personal laboral, no a los funcionarios de carrera"],
      "Art. 14.d) TREBEP: los empleados públicos tienen derecho a percibir las retribuciones y las indemnizaciones por razón del servicio."),
    q("derechos", "dificil",
      "Nayara, como funcionaria de carrera, ¿goza del derecho a la inamovilidad en su condición?",
      ["Sí, entre los derechos individuales figura expresamente el derecho a la inamovilidad en la condición de funcionario de carrera",
       "No, ese derecho ha sido suprimido por el Estatuto Básico del Empleado Público",
       "Sí, pero únicamente durante los tres primeros años tras su nombramiento",
       "No, la inamovilidad solo se reconoce al personal de los cuerpos de habilitación nacional"],
      "Art. 14.a) TREBEP: los empleados públicos tienen derecho a la inamovilidad en la condición de funcionario de carrera."),
    q("derechos", "media",
      "Nayara decide afiliarse a un sindicato. ¿Qué tipo de derecho ejerce, según la clasificación del Estatuto?",
      ["Un derecho individual que se ejerce de forma colectiva: la libertad sindical",
       "Un derecho puramente individual, sin ninguna dimensión colectiva",
       "Una facultad meramente discrecional, no configurada como derecho por el Estatuto",
       "Un derecho reservado únicamente al personal laboral, no a los funcionarios de carrera"],
      "Art. 15.a) TREBEP: los empleados públicos tienen, como derecho individual de ejercicio colectivo, el de libertad sindical."),
    q("derechos", "facil",
      "La participación de Nayara en la negociación colectiva de las condiciones de trabajo de su categoría, ¿está reconocida como derecho por el Estatuto?",
      ["Sí, los empleados públicos tienen derecho a la negociación colectiva y a la participación en la determinación de las condiciones de trabajo",
       "No, la negociación colectiva está reservada en exclusiva al personal laboral",
       "Sí, pero únicamente puede ejercerse a través de asociaciones profesionales, nunca de sindicatos",
       "No, ese derecho fue suprimido para el personal funcionario por el Estatuto Básico del Empleado Público"],
      "Art. 15.b) TREBEP: los empleados públicos tienen derecho a la negociación colectiva y a la participación en la determinación de las condiciones de trabajo."),
    q("derechos", "media",
      "Cuando Nayara secunda la huelga convocada por su sindicato, ¿qué garantía debe mantenerse en todo caso?",
      ["El mantenimiento de los servicios esenciales de la comunidad",
       "Ninguna garantía adicional: el ejercicio de la huelga por empleados públicos es absolutamente ilimitado",
       "La sustitución inmediata de todos los huelguistas por personal eventual",
       "La suspensión automática de todos los servicios municipales, esenciales o no"],
      "Art. 15.c) TREBEP: los empleados públicos tienen derecho al ejercicio de la huelga, con la garantía del mantenimiento de los servicios esenciales de la comunidad."),
    q("derechos", "dificil",
      "Si Nayara quisiera además promover un conflicto colectivo de trabajo relacionado con sus condiciones laborales, ¿lo reconoce el Estatuto como derecho individual de ejercicio colectivo?",
      ["Sí, al planteamiento de conflictos colectivos de trabajo, de acuerdo con la legislación aplicable en cada caso",
       "No, los conflictos colectivos de trabajo están reservados en exclusiva al personal laboral",
       "Sí, pero únicamente si cuenta con la autorización previa y expresa de la Administración",
       "No, esa facultad no figura entre los derechos reconocidos por el TREBEP"],
      "Art. 15.d) TREBEP: los empleados públicos tienen derecho al planteamiento de conflictos colectivos de trabajo, de acuerdo con la legislación aplicable en cada caso."),
    q("derechos", "media",
      "Además de sus derechos individuales, Nayara tiene derecho a la adopción de medidas que favorezcan la conciliación de su vida personal, familiar y laboral. ¿Está este derecho reconocido expresamente por el Estatuto?",
      ["Sí, entre los derechos individuales de los empleados públicos figura expresamente el derecho a la adopción de medidas que favorezcan la conciliación de la vida personal, familiar y laboral",
       "No, la conciliación se regula únicamente mediante convenios colectivos, nunca como derecho estatutario",
       "Sí, pero solo se reconoce a las empleadas públicas, no a los empleados varones",
       "No, ese derecho solo alcanza al personal laboral temporal"],
      "Art. 14.j) TREBEP: los empleados públicos tienen derecho a la adopción de medidas que favorezcan la conciliación de la vida personal, familiar y laboral."),
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// CASO 3 — El código de conducta del funcionario de ventanilla
// ═══════════════════════════════════════════════════════════════════════
const CASO_3 = {
  slug: "caso-codigo-conducta-funcionario-ventanilla",
  titulo: "El código de conducta del funcionario de ventanilla: deberes y principios éticos",
  orden: 3,
  supuesto:
    "Un funcionario de atención al público en las oficinas municipales recibe un regalo de valor considerable de " +
    "un ciudadano al que acaba de tramitar una licencia, «por las molestias». También conoce, por razón de su " +
    "cargo, información confidencial sobre un expediente sancionador de un vecino, y un familiar le pide que se " +
    "la cuente. Su superior le da una instrucción que el funcionario considera claramente contraria a la ley. " +
    "Además, se le pide que agilice sin justificación un trámite en beneficio de un conocido suyo. Por otro " +
    "lado, atiende habitualmente a ciudadanos que se dirigen a él en la lengua cooficial de su Comunidad " +
    "Autónoma.",
  preguntas: [
    q("deberes-codigo-conducta", "facil",
      "Si el funcionario acepta el regalo de valor considerable «por las molestias», ¿es esto conforme al Código de Conducta?",
      ["No, se rechazará cualquier regalo, favor o servicio en condiciones ventajosas que vaya más allá de los usos habituales, sociales y de cortesía",
       "Sí, siempre que el ciudadano lo ofrezca voluntariamente y sin condiciones",
       "Sí, mientras el valor del regalo no supere los 300 euros",
       "No hay ninguna norma sobre regalos en el Código de Conducta del TREBEP"],
      "Art. 54.6 TREBEP: se rechazará cualquier regalo, favor o servicio en condiciones ventajosas que vaya más allá de los usos habituales, sociales y de cortesía."),
    q("deberes-codigo-conducta", "media",
      "Sobre la información confidencial del expediente sancionador que su familiar le pide, ¿puede el funcionario compartirla?",
      ["No, guardará secreto de las materias clasificadas y mantendrá la debida discreción sobre los asuntos que conozca por razón de su cargo, sin poder usar la información para beneficio propio o de terceros",
       "Sí, siempre que se trate de un familiar directo y no de un tercero ajeno",
       "Sí, si el propio ciudadano afectado por el expediente no se opone expresamente",
       "No hay ninguna obligación de confidencialidad respecto a información conocida en el ejercicio del cargo"],
      "Art. 53.12 TREBEP: los empleados públicos guardarán secreto de las materias clasificadas y mantendrán la debida discreción sobre los asuntos que conozcan por razón de su cargo."),
    q("deberes-codigo-conducta", "dificil",
      "Ante la instrucción de su superior que considera claramente contraria a la ley, ¿qué debe hacer el funcionario?",
      ["Puede no obedecerla, por constituir una infracción manifiesta del ordenamiento jurídico, y debe ponerlo inmediatamente en conocimiento de los órganos de inspección procedentes",
       "Debe obedecerla siempre, sin excepción, por proceder de un superior jerárquico",
       "Debe denunciarla directamente ante los tribunales penales, sin comunicarlo antes a ningún órgano administrativo",
       "Debe limitarse a dejar constancia escrita de su desacuerdo, pero ejecutar igualmente la instrucción"],
      "Art. 54.3 TREBEP: obedecerán las instrucciones de los superiores, salvo que constituyan una infracción manifiesta del ordenamiento jurídico, en cuyo caso las pondrán inmediatamente en conocimiento de los órganos de inspección procedentes."),
    q("deberes-codigo-conducta", "media",
      "Sobre la petición de agilizar sin justificación un trámite en beneficio de un conocido, ¿es esto conforme a los principios éticos del Estatuto?",
      ["No, los empleados públicos no influirán en la agilización o resolución de un trámite sin justa causa, y en ningún caso cuando ello comporte un privilegio en beneficio de su entorno familiar y social inmediato",
       "Sí, siempre que el trámite finalmente se resuelva conforme a derecho",
       "Sí, si el conocido no obtiene ninguna ventaja económica directa",
       "No existe ninguna norma específica sobre agilización de trámites en el Código de Conducta"],
      "Art. 53.9 TREBEP: no influirán en la agilización o resolución de trámite o procedimiento sin justa causa, y en ningún caso cuando comporte un privilegio en beneficio de su entorno familiar y social inmediato."),
    q("deberes-codigo-conducta", "facil",
      "Con carácter general, ¿con qué diligencia deben los empleados públicos desempeñar las tareas asignadas a su puesto de trabajo?",
      ["De forma diligente y cumpliendo la jornada y el horario establecidos",
       "Sin ninguna exigencia concreta de jornada, siempre que el resultado final sea satisfactorio",
       "Únicamente durante el horario que cada empleado considere oportuno",
       "El Estatuto no regula la forma de desempeño de las tareas asignadas"],
      "Art. 54.2 TREBEP: el desempeño de las tareas correspondientes al puesto de trabajo se realizará de forma diligente y cumpliendo la jornada y el horario establecidos."),
    q("deberes-codigo-conducta", "media",
      "¿Qué principios inspiran, entre otros, el Código de Conducta de los empleados públicos según el art. 52 del TREBEP?",
      ["Objetividad, integridad, neutralidad, responsabilidad, imparcialidad, confidencialidad, transparencia y honradez, entre otros",
       "Únicamente eficiencia económica y rapidez en la tramitación, sin otros principios",
       "Solo el principio de jerarquía y obediencia debida al superior",
       "Exclusivamente el principio de discrecionalidad técnica"],
      "Art. 52 TREBEP: los empleados públicos actuarán con arreglo a los principios de objetividad, integridad, neutralidad, responsabilidad, imparcialidad, confidencialidad, transparencia, honradez, entre otros."),
    q("deberes-codigo-conducta", "dificil",
      "Los principios y reglas del Código de Conducta, ¿tienen alguna relevancia respecto al régimen disciplinario de los empleados públicos?",
      ["Sí, los principios y reglas establecidos en este capítulo informarán la interpretación y aplicación del régimen disciplinario de los empleados públicos",
       "No, el Código de Conducta y el régimen disciplinario son completamente independientes entre sí",
       "Sí, pero únicamente respecto a las faltas leves, nunca a las graves o muy graves",
       "No, el Código de Conducta tiene un valor meramente orientativo sin ninguna aplicación práctica"],
      "Art. 52 TREBEP (párrafo segundo): los principios y reglas establecidos en este capítulo informarán la interpretación y aplicación del régimen disciplinario de los empleados públicos."),
    q("deberes-codigo-conducta", "media",
      "Al administrar los recursos y bienes públicos de su oficina, ¿con qué criterio debe actuar el funcionario, conforme a los principios de conducta?",
      ["Con austeridad, sin utilizarlos en provecho propio o de personas allegadas, velando además por su conservación",
       "Sin ninguna limitación específica, siempre que rinda cuentas anualmente",
       "Únicamente conforme al criterio que determine discrecionalmente cada unidad administrativa",
       "Con el único límite de no incurrir en responsabilidad penal"],
      "Art. 54.5 TREBEP: administrarán los recursos y bienes públicos con austeridad, y no los utilizarán en provecho propio o de personas allegadas, velando por su conservación."),
    q("deberes-codigo-conducta", "facil",
      "Cuando un ciudadano se dirige al funcionario en la lengua cooficial de su Comunidad Autónoma, ¿debe garantizarse la atención en esa lengua?",
      ["Sí, se garantizará la atención al ciudadano en la lengua que lo solicite siempre que sea oficial en el territorio",
       "No, la atención debe prestarse siempre en castellano, sea cual sea el territorio",
       "Sí, pero únicamente si el propio funcionario domina esa lengua de forma voluntaria",
       "No, esa garantía solo se aplica a los procedimientos escritos, nunca a la atención presencial"],
      "Art. 54.11 TREBEP: se garantizará la atención al ciudadano en la lengua que lo solicite siempre que sea oficial en el territorio."),
    q("deberes-codigo-conducta", "media",
      "Con carácter general, ¿en qué debe fundamentarse la actuación de los empleados públicos frente a los ciudadanos, según los principios éticos?",
      ["En consideraciones objetivas orientadas hacia la imparcialidad y el interés común, al margen de posiciones personales, familiares, corporativas o clientelares",
       "En el criterio personal de cada empleado público, sin más limitación que la legalidad estricta",
       "En las instrucciones exclusivas de su superior jerárquico inmediato, sin ningún otro criterio",
       "En la satisfacción prioritaria de los intereses de los grupos de presión más activos"],
      "Art. 53.2 TREBEP: su actuación perseguirá la satisfacción de los intereses generales y se fundamentará en consideraciones objetivas orientadas hacia la imparcialidad y el interés común."),
  ],
};

for (const caso of [CASO_1, CASO_2, CASO_3]) {
  await crearCaso(caso);
}
console.log("✔ Casos prácticos del tema 17 (Los empleados públicos: clases, derechos y deberes) sembrados.");
