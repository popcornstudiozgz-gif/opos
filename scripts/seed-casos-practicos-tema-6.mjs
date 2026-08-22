/**
 * Casos prácticos — Tema 6 (Los actos administrativos, Ley 39/2015
 * Título III: requisitos, eficacia, nulidad y anulabilidad). 2 casos de
 * 10 preguntas cada uno:
 *   1. La licencia del Bar Trébede: motivación, forma, eficacia y
 *      notificación (arts. 34-36, 39, 40)
 *   2. La orden de derribo de Valdespartera: nulidad, anulabilidad,
 *      límites de la nulidad, conversión, conservación y convalidación
 *      (arts. 47-52)
 *
 * Misma mecánica que los casos anteriores: preguntas/opciones en las
 * tablas ya existentes, enlazadas vía caso_preguntas con su `orden`. La
 * primera opción de cada pregunta es siempre la correcta (el cliente
 * baraja el orden al mostrarlas).
 *
 * Uso: node --env-file=.env.local scripts/seed-casos-practicos-tema-6.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

const TEMA = "tema-6";
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
// CASO 1 — La licencia del Bar Trébede
// ═══════════════════════════════════════════════════════════════════════
const CASO_1 = {
  slug: "caso-bar-trebede-motivacion-eficacia-notificacion",
  titulo: "La licencia del Bar Trébede: motivación, eficacia y notificación",
  orden: 1,
  supuesto:
    "Don Hilario solicita licencia de apertura para un pequeño bar de tapas en el barrio de la Magdalena, «El " +
    "Trébede». El técnico municipal informa favorablemente, pero el órgano competente decide finalmente denegar " +
    "la licencia por motivos de aforo en la calle, dictando una resolución que se limita a decir «se deniega por " +
    "razones de interés general», sin mayor explicación. Días después, en otro expediente, el Ayuntamiento " +
    "concede diez licencias de terraza idénticas y decide refundirlas en un único acto administrativo. La " +
    "resolución de Hilario se notifica el día 2 de un mes conteniendo el texto íntegro, pero sin indicar el " +
    "plazo del recurso ni el órgano ante el que interponerlo; Hilario, sin saberlo, presenta pese a ello un " +
    "recurso de alzada ese mismo mes. Finalmente, tras una revisión posterior, el Ayuntamiento reconsidera y " +
    "decide conceder la licencia en sustitución de la resolución denegatoria, queriendo que la nueva resolución " +
    "produzca efectos desde la fecha de la solicitud original de Hilario.",
  preguntas: [
    q("titulo-3-cap-1", "media",
      "La resolución denegatoria se limita a decir «se deniega por razones de interés general», apartándose además del informe técnico favorable, sin mayor explicación. ¿Es exigible una motivación más completa?",
      ["Sí, deben motivarse, entre otros, los actos que limiten derechos subjetivos o intereses legítimos y los que se separen del criterio seguido en el dictamen de órganos consultivos",
       "No, basta con citar genéricamente «razones de interés general» en cualquier acto administrativo",
       "No, la motivación solo es exigible en los actos favorables al interesado",
       "Sí, pero únicamente si el interesado la solicita expresamente antes de dictarse la resolución"],
      "Art. 35.1.a) y c) LPACAP: deben motivarse los actos que limiten derechos o intereses legítimos y los que se separen del criterio seguido en el dictamen de órganos consultivos."),
    q("titulo-3-cap-1", "facil",
      "Como la decisión de denegar la licencia responde al ejercicio de una potestad discrecional del Ayuntamiento, ¿exige la Ley motivación en ese tipo de actos?",
      ["Sí, deben motivarse los actos que se dicten en el ejercicio de potestades discrecionales",
       "No, los actos discrecionales están por definición exentos de motivación",
       "Solo si la potestad discrecional afecta a más de un interesado a la vez",
       "No, la motivación solo se exige en los actos reglados, nunca en los discrecionales"],
      "Art. 35.1.i) LPACAP: deben motivarse los actos que se dicten en el ejercicio de potestades discrecionales, así como los que deban serlo en virtud de disposición legal o reglamentaria expresa."),
    q("titulo-3-cap-1", "media",
      "Si el técnico municipal hubiera evacuado un informe desfavorable y el órgano competente decidiera apartarse de ese criterio para conceder la licencia, ¿sería igualmente exigible motivar esa decisión?",
      ["Sí, deben motivarse los actos que se separen del criterio seguido en el dictamen de órganos consultivos, con independencia de que la decisión final sea favorable o desfavorable para el interesado",
       "No, solo es exigible motivar cuando la decisión final perjudica al interesado",
       "No, apartarse de un informe técnico no vinculante nunca requiere motivación adicional",
       "Solo sería exigible si el informe técnico tuviera carácter vinculante para el órgano decisor"],
      "Art. 35.1.c) LPACAP: la obligación de motivar al separarse del criterio de un dictamen u órgano consultivo no distingue según el sentido, favorable o desfavorable, de la resolución final."),
    q("titulo-3-cap-1", "facil",
      "El Ayuntamiento concede diez licencias de terraza idénticas y decide refundirlas en un único acto administrativo. ¿Lo permite la Ley?",
      ["Sí, cuando deba dictarse una serie de actos de la misma naturaleza, como concesiones o licencias, podrán refundirse en un único acto que especifique las circunstancias que individualicen los efectos para cada interesado",
       "No, cada licencia debe dictarse siempre en un acto administrativo completamente independiente",
       "Sí, pero únicamente si los diez solicitantes lo piden expresamente y de forma conjunta",
       "No, la refundición de actos administrativos está prohibida con carácter general"],
      "Art. 36.3 LPACAP: cuando deba dictarse una serie de actos administrativos de la misma naturaleza, como nombramientos, concesiones o licencias, podrán refundirse en un único acto que especifique las circunstancias que individualicen los efectos para cada interesado."),
    q("titulo-3-cap-2", "media",
      "Como regla general, ¿desde cuándo producen efectos los actos de las Administraciones Públicas sujetos al Derecho Administrativo?",
      ["Se presumen válidos y producen efectos desde la fecha en que se dictan, salvo que en ellos se disponga otra cosa",
       "Únicamente desde que son publicados en el diario oficial correspondiente",
       "Únicamente desde que adquieren firmeza en vía administrativa",
       "Desde el día siguiente a su notificación, en todo caso"],
      "Art. 39.1 LPACAP: los actos de las Administraciones Públicas se presumirán válidos y producirán efectos desde la fecha en que se dicten, salvo que en ellos se disponga otra cosa."),
    q("titulo-3-cap-2", "dificil",
      "Cuando el Ayuntamiento reconsidera y decide finalmente conceder la licencia en sustitución de la resolución denegatoria anterior, queriendo que produzca efectos desde la fecha de la solicitud original de Hilario, ¿es eso posible?",
      ["Sí, excepcionalmente puede otorgarse eficacia retroactiva a los actos cuando se dicten en sustitución de actos anulados o cuando produzcan efectos favorables al interesado, siempre que los supuestos de hecho ya existieran en la fecha a que se retrotraiga y no se lesionen derechos de terceros",
       "No, los actos administrativos nunca pueden tener eficacia retroactiva bajo ninguna circunstancia",
       "Sí, pero solo si lo autoriza expresamente el Consejo de Estado u órgano consultivo equivalente",
       "Sí, la retroactividad es la regla general aplicable a todo acto administrativo favorable"],
      "Art. 39.3 LPACAP: excepcionalmente podrá otorgarse eficacia retroactiva a los actos cuando se dicten en sustitución de actos anulados y cuando produzcan efectos favorables al interesado, si los supuestos de hecho ya existían en la fecha a que se retrotraiga la eficacia y esta no lesiona derechos o intereses legítimos de otras personas."),
    q("titulo-3-cap-2", "media",
      "La notificación de la resolución denegatoria a Hilario contiene el texto íntegro, pero omite el plazo y el órgano ante el que recurrir. ¿Qué consecuencia tiene esa omisión?",
      ["La notificación surte efecto a partir de la fecha en que el interesado realice actuaciones que supongan el conocimiento del contenido y alcance de la resolución, o interponga el recurso que proceda",
       "La notificación es radicalmente nula y debe repetirse por completo antes de que empiece a correr cualquier plazo",
       "La notificación no surte ningún efecto mientras el propio Ayuntamiento no subsane esos defectos",
       "La omisión carece de cualquier consecuencia, pues basta con incluir el texto íntegro de la resolución"],
      "Art. 40.3 LPACAP: las notificaciones que, conteniendo el texto íntegro del acto, omitiesen alguno de los demás requisitos, surtirán efecto a partir de la fecha en que el interesado realice actuaciones que supongan el conocimiento del contenido y alcance de la resolución, o interponga el recurso procedente."),
    q("titulo-3-cap-2", "facil",
      "Hilario, pese a esos defectos, presenta un recurso de alzada ese mismo mes. ¿Qué efecto tiene esa actuación sobre la eficacia de la notificación?",
      ["La notificación surte efecto, a esos solos efectos, desde el momento en que Hilario interpuso el recurso, pues con ello demuestra conocer el contenido y alcance de la resolución",
       "Ninguno: el recurso de Hilario es inadmisible por haberse practicado una notificación defectuosa",
       "El Ayuntamiento debe archivar el recurso y volver a notificar antes de poder tramitarlo",
       "El plazo de recurso queda indefinidamente abierto, sin que la interposición del recurso tenga relevancia alguna"],
      "Art. 40.3 LPACAP: la interposición del recurso que proceda es, precisamente, una de las actuaciones que hacen surtir efecto a la notificación defectuosa desde ese momento."),
    q("titulo-3-cap-2", "media",
      "Con carácter general, ¿qué debe contener toda notificación de una resolución para cumplir plenamente con la Ley?",
      ["El texto íntegro de la resolución, con indicación de si pone fin o no a la vía administrativa, la expresión de los recursos que procedan, el órgano ante el que presentarlos y el plazo para interponerlos",
       "Únicamente el sentido de la resolución (estimatoria o desestimatoria), sin más contenido",
       "Solamente la identidad del órgano municipal que dictó la resolución",
       "El texto íntegro de la resolución y la firma manuscrita del interesado acusando recibo de ella"],
      "Art. 40.2 LPACAP: toda notificación debe contener el texto íntegro de la resolución, con indicación de si pone fin o no a la vía administrativa, la expresión de los recursos procedentes, el órgano ante el que presentarlos y el plazo para interponerlos."),
    q("titulo-3-cap-1", "facil",
      "¿Debe el Ayuntamiento producir sus actos administrativos, como la resolución sobre la licencia de Hilario, preferentemente por escrito a través de medios electrónicos?",
      ["Sí, los actos administrativos se producirán por escrito a través de medios electrónicos, a menos que su naturaleza exija otra forma más adecuada de expresión y constancia",
       "No, los actos administrativos deben producirse siempre en papel, salvo previsión legal expresa en contrario",
       "Sí, pero únicamente en los municipios de gran población",
       "No existe ninguna regla legal sobre la forma que deben revestir los actos administrativos"],
      "Art. 36.1 LPACAP: los actos administrativos se producirán por escrito a través de medios electrónicos, a menos que su naturaleza exija otra forma más adecuada de expresión y constancia."),
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// CASO 2 — La orden de derribo de Valdespartera
// ═══════════════════════════════════════════════════════════════════════
const CASO_2 = {
  slug: "caso-derribo-valdespartera-nulidad-anulabilidad",
  titulo: "La orden de derribo de Valdespartera: nulidad, anulabilidad y convalidación",
  orden: 2,
  supuesto:
    "El Ayuntamiento dicta una orden de derribo de una nave agrícola en Valdespartera por incumplimiento " +
    "urbanístico. Meses después se descubre que la orden fue dictada por un órgano municipal que carecía por " +
    "completo de competencia territorial para actuar en esa zona, atribuida en realidad a otro servicio. En un " +
    "expediente similar sobre una caseta de aperos, la orden de derribo es correcta en cuanto al fondo, pero no " +
    "se concedió trámite de audiencia al propietario, generándole indefensión. En un tercer expediente, una " +
    "licencia de vado se dictó por el Concejal Delegado cuando la competencia correspondía en realidad a la " +
    "Junta de Gobierno Local, sin que el defecto afecte al fondo del asunto; el Ayuntamiento se plantea " +
    "subsanarlo. En un cuarto expediente, faltaba una autorización sectorial de la Confederación Hidrográfica " +
    "del Ebro que nunca llegó a solicitarse, y que finalmente se obtiene con posterioridad.",
  preguntas: [
    q("titulo-3-cap-3", "dificil",
      "La orden de derribo de la nave de Valdespartera fue dictada por un órgano municipal que carecía por completo de competencia territorial para actuar en esa zona. ¿Qué consecuencia tiene ese vicio?",
      ["La nulidad de pleno derecho del acto, pues son nulos los actos dictados por órgano manifiestamente incompetente por razón del territorio",
       "La simple anulabilidad del acto, subsanable mediante convalidación posterior por cualquier órgano municipal",
       "Ninguna consecuencia: la incompetencia territorial nunca vicia la validez de un acto administrativo",
       "La inexistencia del acto, que ni siquiera necesita ser declarada formalmente por nadie"],
      "Art. 47.1.b) LPACAP: son nulos de pleno derecho los actos dictados por órgano manifiestamente incompetente por razón de la materia o del territorio."),
    q("titulo-3-cap-3", "media",
      "En el caso de la caseta de aperos, la orden es correcta en cuanto al fondo, pero no se concedió trámite de audiencia al propietario, generándole indefensión. ¿Qué vicio afecta a ese acto?",
      ["La anulabilidad, pues el defecto de forma determina la anulabilidad del acto cuando carece de los requisitos formales indispensables para alcanzar su fin o produce indefensión a los interesados",
       "La nulidad de pleno derecho, equiparable a prescindir total y absolutamente del procedimiento",
       "Ningún vicio: la falta de trámite de audiencia nunca afecta a la validez de un acto administrativo",
       "La inexistencia sobrevenida del acto, sin necesidad de impugnación por el interesado"],
      "Art. 48.2 LPACAP: el defecto de forma solo determinará la anulabilidad cuando el acto carezca de los requisitos formales indispensables para alcanzar su fin o dé lugar a la indefensión de los interesados."),
    q("titulo-3-cap-3", "facil",
      "Con carácter general, ¿qué actos son anulables conforme a la Ley?",
      ["Los actos de la Administración que incurran en cualquier infracción del ordenamiento jurídico, incluida la desviación de poder",
       "Únicamente los actos que carezcan de la firma del titular del órgano competente",
       "Únicamente los actos dictados fuera del plazo máximo establecido para resolver",
       "Los actos administrativos nunca pueden ser anulables: solo cabe la nulidad o la plena validez"],
      "Art. 48.1 LPACAP: son anulables los actos de la Administración que incurran en cualquier infracción del ordenamiento jurídico, incluso la desviación de poder."),
    q("titulo-3-cap-3", "media",
      "Si finalmente se declara la nulidad de la orden de derribo de la nave, ¿afecta esa nulidad automáticamente a otros actos posteriores del mismo expediente que sean independientes del primero?",
      ["No, la nulidad o anulabilidad de un acto no implica la de los actos sucesivos en el procedimiento que sean independientes del primero",
       "Sí, la nulidad de un acto arrastra siempre la nulidad de todos los actos posteriores del mismo expediente",
       "Depende exclusivamente de si el interesado lo solicita expresamente al recurrir",
       "Sí, pero solo cuando los actos posteriores sean también actos de gravamen para el interesado"],
      "Art. 49.1 LPACAP: la nulidad o anulabilidad de un acto no implicará la de los sucesivos en el procedimiento que sean independientes del primero."),
    q("titulo-3-cap-3", "dificil",
      "Si la orden de derribo nula contuviera, sin embargo, los elementos constitutivos de otro acto distinto y válido —por ejemplo, una simple advertencia de incumplimiento urbanístico—, ¿qué prevé la Ley?",
      ["El acto nulo que, sin embargo, contenga los elementos constitutivos de otro distinto, producirá los efectos de este otro acto",
       "El acto nulo no puede en ningún caso producir efecto jurídico alguno, ni siquiera los de un acto distinto",
       "Debe iniciarse necesariamente un procedimiento completamente nuevo para poder dictar el acto distinto",
       "Solo produce esos efectos si lo solicita expresamente el interesado afectado por el derribo"],
      "Art. 50 LPACAP (conversión de actos viciados): los actos nulos o anulables que contengan los elementos constitutivos de otro distinto producirán los efectos de este."),
    q("titulo-3-cap-3", "media",
      "Al declararse la nulidad de la orden de derribo, ¿qué debe disponer el órgano que la declara respecto a los trámites del expediente que no se vieron afectados por el vicio?",
      ["Debe disponer siempre la conservación de aquellos actos y trámites cuyo contenido se hubiera mantenido igual de no haberse cometido la infracción",
       "Debe anular necesariamente la totalidad del expediente, sin excepción de ningún trámite",
       "Puede decidir libremente, sin que exista ningún criterio legal que le vincule al respecto",
       "Debe reiniciar el expediente completo desde el primer trámite, sin conservar nada de lo actuado"],
      "Art. 51 LPACAP: el órgano que declare la nulidad o anule las actuaciones dispondrá siempre la conservación de aquellos actos y trámites cuyo contenido se hubiera mantenido igual de no haberse cometido la infracción."),
    q("titulo-3-cap-3", "dificil",
      "En el expediente de la licencia de vado, dictada por el Concejal Delegado cuando la competencia correspondía a la Junta de Gobierno Local, sin afectar al fondo del asunto, ¿puede el Ayuntamiento convalidar el acto?",
      ["Sí: si el vicio consiste en incompetencia no determinante de nulidad, la convalidación puede realizarla el órgano competente cuando sea superior jerárquico del que dictó el acto viciado",
       "No, ningún vicio de incompetencia es convalidable: exige siempre anular el acto y dictarlo de nuevo",
       "Sí, pero solo puede convalidarlo el mismo órgano que cometió el error, nunca su superior jerárquico",
       "No, la convalidación solo cabe para vicios de forma, nunca para vicios de competencia"],
      "Art. 52.3 LPACAP: si el vicio consistiera en incompetencia no determinante de nulidad, la convalidación podrá realizarse por el órgano competente cuando sea superior jerárquico del que dictó el acto viciado."),
    q("titulo-3-cap-3", "media",
      "En el expediente en que faltaba la autorización sectorial de la Confederación Hidrográfica del Ebro, si finalmente se obtiene esa autorización, ¿qué efecto tiene sobre el acto viciado por su ausencia?",
      ["Puede convalidarse el acto mediante el otorgamiento de la autorización por el órgano competente",
       "El acto queda automáticamente convalidado sin necesidad de que llegue a obtenerse realmente la autorización",
       "La falta de autorización sectorial determina siempre la nulidad de pleno derecho, sin posibilidad de convalidación",
       "Debe anularse el acto y dictarse uno enteramente nuevo, sin que quepa la convalidación en este supuesto"],
      "Art. 52.4 LPACAP: si el vicio consistiese en la falta de alguna autorización, podrá ser convalidado el acto mediante el otorgamiento de la misma por el órgano competente."),
    q("titulo-3-cap-3", "facil",
      "Con carácter general, ¿qué efecto produce el acto de convalidación de un acto anulable?",
      ["Produce efecto desde su propia fecha, sin perjuicio de la retroactividad excepcional prevista para los actos que produzcan efectos favorables al interesado",
       "Produce siempre efecto retroactivo a la fecha del acto originario viciado, sin excepción alguna",
       "No produce ningún efecto hasta que transcurran seis meses desde que se dicta la convalidación",
       "Solo produce efecto si lo ratifica expresamente el interesado afectado por el acto convalidado"],
      "Art. 52.2 LPACAP: el acto de convalidación producirá efecto desde su fecha, salvo lo dispuesto en el art. 39.3 para la retroactividad de los actos administrativos."),
    q("titulo-3-cap-3", "dificil",
      "Además de la incompetencia territorial manifiesta, la Ley recoge otros supuestos tasados de nulidad de pleno derecho. ¿Cuál de los siguientes SÍ figura expresamente entre ellos?",
      ["Los actos dictados prescindiendo total y absolutamente del procedimiento legalmente establecido",
       "Los actos dictados fuera del plazo máximo establecido para resolver el procedimiento",
       "Los actos que incurran en cualquier defecto de forma que no llegue a causar indefensión",
       "Los actos que se apoyen en un informe técnico posteriormente rectificado por el mismo órgano"],
      "Art. 47.1.e) LPACAP: son nulos de pleno derecho los actos dictados prescindiendo total y absolutamente del procedimiento legalmente establecido o de las normas esenciales para la formación de la voluntad de los órganos colegiados."),
  ],
};

for (const caso of [CASO_1, CASO_2]) {
  await crearCaso(caso);
}
console.log("✔ Casos prácticos del tema 6 (Los actos administrativos) sembrados.");
