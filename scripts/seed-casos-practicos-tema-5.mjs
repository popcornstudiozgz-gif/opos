/**
 * Casos prácticos — Tema 5 (La actividad de las Administraciones Públicas,
 * Ley 39/2015 Título II: normas generales de actuación y términos y
 * plazos). 2 casos de 10 preguntas cada uno:
 *   1. La biblioteca comunitaria de Torrero: obligación de resolver,
 *      suspensión del plazo, silencio administrativo y caducidad
 *      (arts. 20, 21, 22, 24, 25)
 *   2. La terraza de Los Porches: registro electrónico, cómputo de plazos,
 *      tramitación de urgencia y ampliación de plazos (arts. 14, 16,
 *      30-33)
 *
 * Misma mecánica que los casos anteriores: preguntas/opciones en las
 * tablas ya existentes, enlazadas vía caso_preguntas con su `orden`. La
 * primera opción de cada pregunta es siempre la correcta (el cliente
 * baraja el orden al mostrarlas).
 *
 * Uso: node --env-file=.env.local scripts/seed-casos-practicos-tema-5.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

const TEMA = "tema-5";
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
// CASO 1 — La biblioteca comunitaria de Torrero
// ═══════════════════════════════════════════════════════════════════════
const CASO_1 = {
  slug: "caso-biblioteca-torrero-obligacion-resolver",
  titulo: "La biblioteca comunitaria de Torrero: obligación de resolver y silencio",
  orden: 1,
  supuesto:
    "La asociación cultural «Letras del Ebro» solicita al Ayuntamiento de Zaragoza, el 3 de marzo, autorización " +
    "para instalar de forma permanente una pequeña biblioteca comunitaria en un local municipal cedido en el " +
    "barrio de Torrero. La normativa reguladora de este tipo de cesiones no fija plazo máximo de resolución. " +
    "Diez días después de la entrada de la solicitud, el Ayuntamiento detecta que falta el certificado de la " +
    "Junta Directiva de la asociación y le requiere que lo subsane, lo que la asociación cumplimenta veinte días " +
    "después. Pasados varios meses sin resolución expresa, la asociación pregunta cuándo puede considerarse " +
    "aceptada su petición. En paralelo, el Ayuntamiento inicia de oficio un expediente sancionador contra un " +
    "local vecino por ocupar la vía pública sin licencia; ese expediente se paraliza porque el propio local " +
    "denunciado deja de responder a los requerimientos de prueba, y tampoco se resuelve en plazo.",
  preguntas: [
    q("titulo-2-cap-2", "facil",
      "La normativa reguladora de estas cesiones no fija un plazo máximo de resolución. ¿Qué plazo se aplica al procedimiento de la biblioteca?",
      ["Tres meses, plazo supletorio que se aplica cuando las normas reguladoras de los procedimientos no fijan plazo máximo",
       "Seis meses, plazo máximo general para cualquier procedimiento administrativo",
       "No existe plazo aplicable: la Administración puede resolver en cualquier momento sin límite temporal",
       "Un mes, plazo general que la Ley aplica por defecto a todos los procedimientos"],
      "Art. 21.3 LPACAP: cuando las normas reguladoras de los procedimientos no fijen el plazo máximo, este será de tres meses."),
    q("titulo-2-cap-2", "media",
      "Al haberse iniciado el procedimiento a solicitud de la asociación, ¿desde qué momento se cuenta ese plazo de tres meses?",
      ["Desde la fecha en que la solicitud tuvo entrada en el registro electrónico de la Administración u Organismo competente para su tramitación",
       "Desde la fecha del acuerdo de iniciación dictado por el Ayuntamiento",
       "Desde que se completa el expediente con todos los informes preceptivos",
       "Desde la fecha en que se dicta la resolución final del procedimiento"],
      "Art. 21.3.b) LPACAP: en los procedimientos iniciados a solicitud del interesado, el plazo se cuenta desde la fecha en que la solicitud tuvo entrada en el registro electrónico de la Administración competente para su tramitación."),
    q("titulo-2-cap-2", "media",
      "Cuando el Ayuntamiento requiere a la asociación que subsane la falta del certificado de la Junta Directiva, ¿qué ocurre con el plazo máximo para resolver?",
      ["Se suspende, por el tiempo que medie entre la notificación del requerimiento y su efectivo cumplimiento por la asociación",
       "Sigue corriendo con normalidad, sin verse afectado por el requerimiento",
       "Se interrumpe de forma definitiva, debiendo empezar a contarse íntegramente desde cero",
       "El procedimiento caduca automáticamente por el solo hecho de requerirse la subsanación"],
      "Art. 22.1.a) LPACAP: el plazo máximo para resolver se suspende cuando deba requerirse a un interesado para la subsanación de deficiencias, por el tiempo que medie entre la notificación del requerimiento y su efectivo cumplimiento."),
    q("titulo-2-cap-2", "dificil",
      "La cesión del local implica transferir a la asociación facultades relativas a un bien de dominio público municipal. Si transcurre el plazo máximo sin resolución expresa, ¿qué sentido tiene el silencio administrativo?",
      ["Desestimatorio, porque la Ley dispone que el silencio será desestimatorio en los procedimientos cuya estimación tuviera como consecuencia que se transfirieran al solicitante facultades relativas al dominio público",
       "Estimatorio, como regla general aplicable a todo procedimiento iniciado a solicitud del interesado",
       "Estimatorio, por tratarse de una asociación cultural sin ánimo de lucro",
       "No cabe silencio administrativo en ningún procedimiento relativo a bienes municipales"],
      "Art. 24.1 LPACAP: el silencio tendrá efecto desestimatorio, entre otros casos, en los procedimientos cuya estimación tuviera como consecuencia que se transfirieran al solicitante o a terceros facultades relativas al dominio público o al servicio público."),
    q("titulo-2-cap-2", "facil",
      "Si el sentido del silencio es desestimatorio, ¿qué efectos produce exactamente para la asociación?",
      ["Únicamente permite a la asociación interponer el recurso administrativo o contencioso-administrativo que resulte procedente",
       "Tiene, a todos los efectos, la consideración de acto administrativo finalizador y firme del procedimiento",
       "Obliga al Ayuntamiento a dictar necesariamente una resolución expresa confirmatoria de esa denegación",
       "Ninguno: la asociación debe limitarse a esperar indefinidamente la resolución expresa"],
      "Art. 24.2 LPACAP: la desestimación por silencio administrativo tiene los solos efectos de permitir a los interesados la interposición del recurso administrativo o contencioso-administrativo que resulte procedente."),
    q("titulo-2-cap-2", "media",
      "Respecto al expediente sancionador iniciado de oficio contra el local vecino, si transcurre el plazo máximo sin resolución expresa, ¿qué efecto se produce?",
      ["La caducidad del procedimiento, al tratarse del ejercicio de una potestad sancionadora susceptible de producir efectos desfavorables o de gravamen",
       "El silencio administrativo estimatorio, igual que en cualquier procedimiento iniciado de oficio",
       "El silencio administrativo desestimatorio, igual que en el procedimiento de la biblioteca",
       "La nulidad de pleno derecho de todo lo actuado en el expediente"],
      "Art. 25.1.b) LPACAP: en los procedimientos en que la Administración ejercite potestades sancionadoras, susceptibles de producir efectos desfavorables o de gravamen, se producirá la caducidad si vence el plazo máximo sin resolución expresa."),
    q("titulo-2-cap-2", "facil",
      "La resolución que declare la caducidad del expediente sancionador, ¿qué debe ordenar?",
      ["El archivo de las actuaciones",
       "La apertura automática de un nuevo expediente sancionador por los mismos hechos",
       "La imposición directa de la sanción máxima prevista en la ordenanza",
       "La suspensión indefinida del procedimiento, sin más trámite"],
      "Art. 25.1.b) LPACAP: en estos casos, la resolución que declare la caducidad ordenará el archivo de las actuaciones."),
    q("titulo-2-cap-2", "media",
      "El expediente sancionador se paraliza porque el propio local denunciado deja de responder a los requerimientos de prueba. ¿Qué efecto tiene esa paralización sobre el cómputo del plazo para resolver?",
      ["Se interrumpe el cómputo del plazo para resolver y notificar la resolución, al tratarse de una paralización por causa imputable al interesado",
       "No tiene ningún efecto sobre el cómputo del plazo máximo para resolver",
       "Obliga automáticamente a declarar la caducidad, sin posibilidad de continuar el procedimiento",
       "Amplía automáticamente al doble el plazo máximo para resolver"],
      "Art. 25.2 LPACAP: en los supuestos en que el procedimiento se hubiera paralizado por causa imputable al interesado, se interrumpirá el cómputo del plazo para resolver y notificar la resolución."),
    q("titulo-2-cap-1", "facil",
      "Si los responsables de tramitar ambos expedientes incumplen reiteradamente los plazos legales sin causa justificada, ¿qué consecuencia prevé la Ley?",
      ["La exigencia de responsabilidad disciplinaria, sin perjuicio de la que pudiera corresponder conforme a otra normativa aplicable",
       "Ninguna: el incumplimiento de plazos carece de consecuencias para el personal responsable de la tramitación",
       "La nulidad automática de todo lo actuado en el expediente correspondiente",
       "La obligación de indemnizar personalmente al interesado con fondos propios del funcionario"],
      "Art. 21.6 LPACAP: el incumplimiento de la obligación de dictar resolución expresa en plazo dará lugar a la exigencia de responsabilidad disciplinaria, sin perjuicio de la que hubiere lugar de acuerdo con la normativa aplicable."),
    q("titulo-2-cap-1", "media",
      "El Ayuntamiento debe informar a la asociación, dentro de los diez días siguientes a la recepción de su solicitud, del plazo máximo para resolver y de los efectos del silencio. ¿Es correcta esta obligación?",
      ["Sí: la Administración debe comunicar al interesado, dentro de los diez días siguientes a la recepción de la solicitud en el registro, el plazo máximo para resolver y notificar, así como los efectos que pueda producir el silencio administrativo",
       "No, esa comunicación es meramente potestativa y queda al criterio de cada Administración",
       "Sí, pero el plazo para comunicarlo es de un mes, no de diez días",
       "No, esa obligación de informar solo existe en los procedimientos de naturaleza sancionadora"],
      "Art. 21.4 LPACAP: las Administraciones informarán a los interesados del plazo máximo para resolver y de los efectos del silencio, mención que se incluirá en la comunicación que se dirija al interesado dentro de los diez días siguientes a la recepción de la solicitud iniciadora."),
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// CASO 2 — La terraza de Los Porches
// ═══════════════════════════════════════════════════════════════════════
const CASO_2 = {
  slug: "caso-terraza-porches-computo-plazos-registro",
  titulo: "La terraza de Los Porches: cómputo de plazos, registro y ampliación",
  orden: 2,
  supuesto:
    "El restaurante «Los Porches», explotado por una sociedad limitada, presenta el viernes 12 de julio a las " +
    "23:40 horas, a través del registro electrónico del Ayuntamiento de Zaragoza, una solicitud de licencia para " +
    "ampliar su terraza de veladores en la plaza. El sábado 13 y el domingo 14 de julio son inhábiles. El " +
    "titular del restaurante, ante la avalancha de solicitudes similares en plena campaña de verano, pide " +
    "además que su expediente se tramite con urgencia. Mientras se resuelve, una avería informática grave " +
    "afecta durante tres días a la sede electrónica municipal, impidiendo la presentación de nuevas solicitudes. " +
    "Por otro lado, el propio Ayuntamiento, a instancia de varios vecinos, valora ampliar en diez días el plazo " +
    "para resolver, alegando la complejidad de evaluar el impacto acústico de tantas terrazas a la vez.",
  preguntas: [
    q("titulo-2-cap-1", "facil",
      "Como sociedad limitada, ¿está «Los Porches» obligada a presentar su solicitud de licencia por medios electrónicos?",
      ["Sí, las personas jurídicas están, en todo caso, obligadas a relacionarse por medios electrónicos con las Administraciones Públicas",
       "No, puede elegir libremente entre el papel y los medios electrónicos, igual que una persona física",
       "Solo si su domicilio social está inscrito en un municipio distinto de Zaragoza",
       "No, la obligación de relacionarse electrónicamente solo alcanza a las sociedades cotizadas en bolsa"],
      "Art. 14.2.a) LPACAP: las personas jurídicas están, en todo caso, obligadas a relacionarse a través de medios electrónicos con las Administraciones Públicas."),
    q("titulo-2-cap-2", "media",
      "La solicitud se presenta el viernes 12 de julio a las 23:40, un día hábil. ¿En qué momento se considera efectuada la presentación a efectos de cómputo?",
      ["En la fecha y hora efectiva de presentación, pues el registro electrónico permite la presentación todos los días del año durante las veinticuatro horas",
       "Al día siguiente hábil, en todo caso, con independencia de la hora exacta de presentación",
       "Nunca antes de las 8:00 del día siguiente, por convención administrativa general",
       "En la fecha en que un funcionario municipal revise manualmente el registro electrónico"],
      "Art. 31.2.a) LPACAP: el registro electrónico permite la presentación de documentos todos los días del año durante las veinticuatro horas."),
    q("titulo-2-cap-2", "dificil",
      "Si la solicitud se hubiera presentado, en cambio, el sábado 13 de julio (día inhábil), ¿en qué momento se entendería realizada a efectos del cómputo de los plazos que deban cumplir los interesados?",
      ["En la primera hora del primer día hábil siguiente, salvo que una norma permita expresamente la recepción en día inhábil",
       "En el mismo momento de la presentación, sin ninguna particularidad por tratarse de día inhábil",
       "No se computaría: las presentaciones realizadas en día inhábil carecen de validez",
       "En la última hora del propio día inhábil en que se presentó la solicitud"],
      "Art. 31.2.b) LPACAP: a efectos del cómputo de plazos fijados en días hábiles, la presentación en día inhábil se entiende realizada en la primera hora del primer día hábil siguiente."),
    q("titulo-2-cap-2", "facil",
      "Salvo que una norma disponga otro cómputo, cuando un plazo del procedimiento se exprese en días, ¿qué días se computan?",
      ["Solo los días hábiles, excluyéndose del cómputo los sábados, los domingos y los declarados festivos",
       "Todos los días naturales, incluidos sábados, domingos y festivos",
       "Únicamente los días laborables propios de la empresa titular del restaurante",
       "Solo los días en que la sede electrónica municipal esté operativa al cien por cien"],
      "Art. 30.2 LPACAP: siempre que por Ley no se exprese otro cómputo, cuando los plazos se señalen por días se entiende que estos son hábiles, excluyéndose sábados, domingos y festivos."),
    q("titulo-2-cap-2", "media",
      "Si el plazo máximo para resolver la solicitud de «Los Porches» venciera en domingo, ¿qué ocurre?",
      ["El plazo se entiende prorrogado al primer día hábil siguiente",
       "El plazo vence igualmente ese domingo, sin ninguna prórroga posible",
       "El plazo se acorta automáticamente, entendiéndose vencido el viernes anterior",
       "El procedimiento caduca de forma automática por ese solo motivo"],
      "Art. 30.5 LPACAP: cuando el último día del plazo sea inhábil, se entenderá prorrogado al primer día hábil siguiente."),
    q("titulo-2-cap-2", "media",
      "El titular del restaurante solicita que se tramite el expediente con urgencia. Si el Ayuntamiento accede, ¿qué efecto tiene sobre los plazos del procedimiento ordinario?",
      ["Se reducen a la mitad los plazos establecidos para el procedimiento ordinario, salvo los relativos a la presentación de solicitudes y recursos",
       "Se amplían al doble, para permitir una tramitación más completa y cuidadosa",
       "Desaparece cualquier plazo máximo de resolución para ese expediente concreto",
       "Solo se reduce el plazo de la resolución final, manteniéndose igual el resto de trámites"],
      "Art. 33.1 LPACAP: la tramitación de urgencia reduce a la mitad los plazos establecidos para el procedimiento ordinario, salvo los relativos a la presentación de solicitudes y recursos."),
    q("titulo-2-cap-2", "facil",
      "Si algún vecino discrepa del acuerdo que declara la tramitación de urgencia del expediente, ¿puede recurrirlo de forma independiente?",
      ["No cabe recurso alguno contra el acuerdo que declare la tramitación de urgencia, sin perjuicio del que proceda contra la resolución que ponga fin al procedimiento",
       "Sí, cabe recurso de alzada en el plazo de un mes desde que se adopta el acuerdo",
       "Sí, cabe recurso de reposición en el plazo de quince días desde que se notifica",
       "Sí, pero únicamente puede interponerse directamente ante la jurisdicción contencioso-administrativa"],
      "Art. 33.2 LPACAP: no cabrá recurso alguno contra el acuerdo que declare la aplicación de la tramitación de urgencia al procedimiento, sin perjuicio del procedente contra la resolución final."),
    q("titulo-2-cap-2", "dificil",
      "Ante la avalancha de solicitudes similares, el Ayuntamiento valora ampliar en diez días el plazo para resolver, motivando la complejidad del impacto acústico. ¿Qué límite tiene esa ampliación?",
      ["No puede exceder de la mitad del plazo establecido, y solo procede si las circunstancias lo aconsejan y no se perjudican derechos de terceros",
       "Puede ampliarse indefinidamente, mientras el Ayuntamiento lo considere oportuno",
       "No cabe ninguna ampliación de plazos en los procedimientos administrativos comunes",
       "Solo puede ampliarse si lo solicita expresamente el propio interesado, nunca de oficio"],
      "Art. 32.1 LPACAP: la Administración podrá conceder una ampliación de los plazos que no exceda de la mitad de los mismos, si las circunstancias lo aconsejan y con ello no se perjudican derechos de tercero."),
    q("titulo-2-cap-2", "media",
      "Si el Ayuntamiento decide ampliar el plazo, ¿en qué momento debe adoptarse y notificarse ese acuerdo?",
      ["Antes del vencimiento del plazo de que se trate; en ningún caso puede ampliarse un plazo ya vencido",
       "En cualquier momento, incluso después de haber vencido el plazo original",
       "Únicamente en el mismo acto de la resolución final del procedimiento",
       "Dentro de los tres meses siguientes al vencimiento del plazo original"],
      "Art. 32.3 LPACAP: tanto la petición de ampliación como la decisión sobre ella deben producirse antes del vencimiento del plazo; en ningún caso podrá ampliarse un plazo ya vencido."),
    q("titulo-2-cap-2", "dificil",
      "Durante la avería informática que afecta tres días a la sede electrónica municipal, impidiendo presentar solicitudes, ¿qué puede hacer el Ayuntamiento respecto a los plazos no vencidos?",
      ["Determinar una ampliación de los plazos no vencidos, debiendo publicar en la sede electrónica tanto la incidencia técnica como la ampliación concreta acordada",
       "Nada: la avería informática carece de cualquier relevancia jurídica sobre los plazos en curso",
       "Declarar automáticamente la caducidad de todos los procedimientos afectados por la avería",
       "Exigir a los interesados que presenten sus solicitudes exclusivamente en papel mientras dure la avería"],
      "Art. 32.4 LPACAP: cuando una incidencia técnica haya imposibilitado el funcionamiento ordinario del sistema, la Administración podrá determinar una ampliación de los plazos no vencidos, publicando la incidencia y la ampliación concreta en la sede electrónica."),
  ],
};

for (const caso of [CASO_1, CASO_2]) {
  await crearCaso(caso);
}
console.log("✔ Casos prácticos del tema 5 (La actividad de las Administraciones Públicas) sembrados.");
