/**
 * Casos prácticos — Tema 8 (Revisión de actos en vía administrativa, Ley
 * 39/2015 Título V: revisión de oficio y recursos administrativos). 3
 * casos de 10 preguntas cada uno, cierra el bloque 3 (procedimiento
 * administrativo):
 *   1. La subvención cobrada por error: revisión de oficio de actos
 *      nulos, declaración de lesividad de actos anulables, rectificación
 *      de errores y revocación (arts. 106-110)
 *   2. La sanción de tráfico y el recurso equivocado: recurso de alzada,
 *      recurso de reposición, plazos, calificación errónea del recurso y
 *      suspensión de la ejecución (arts. 112-124)
 *   3. El expediente falsificado: recurso extraordinario de revisión
 *      contra actos firmes (arts. 125-126)
 *
 * Misma mecánica que los casos anteriores: preguntas/opciones en las
 * tablas ya existentes, enlazadas vía caso_preguntas con su `orden`. La
 * primera opción de cada pregunta es siempre la correcta (el cliente
 * baraja el orden al mostrarlas).
 *
 * Uso: node --env-file=.env.local scripts/seed-casos-practicos-tema-8.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

const TEMA = "tema-8";
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
// CASO 1 — La subvención cobrada por error
// ═══════════════════════════════════════════════════════════════════════
const CASO_1 = {
  slug: "caso-subvencion-revision-oficio-lesividad",
  titulo: "La subvención cobrada por error: revisión de oficio y declaración de lesividad",
  orden: 1,
  supuesto:
    "El Ayuntamiento concede una subvención a una empresa de catering, «Sabores del Ebro», que resulta favorable " +
    "para la empresa, pero fue dictada por un órgano manifiestamente incompetente por razón de la materia (la " +
    "tramitó el Servicio de Deportes cuando correspondía al de Cultura). El acto ha puesto fin a la vía " +
    "administrativa y no fue recurrido en plazo por nadie; dos años después, la Intervención municipal detecta " +
    "el error y propone revisarlo de oficio. En otro expediente, una licencia de apertura concedida a un " +
    "gimnasio, aun siendo válida y favorable para su titular, resulta gravemente perjudicial para el interés " +
    "público urbanístico por incumplir condiciones de accesibilidad; han transcurrido dos años desde que se " +
    "dictó, sin que el vicio llegue a ser causa de nulidad radical. En un tercer expediente, el Ayuntamiento " +
    "detecta un simple error material en el nombre de un beneficiario de una ayuda social y quiere corregirlo " +
    "directamente. Finalmente, se plantea revocar una sanción de gravamen que impuso hace tres años a un " +
    "vecino, dado que las circunstancias han cambiado sustancialmente.",
  preguntas: [
    q("titulo-5-cap-1", "media",
      "La subvención a «Sabores del Ebro» fue dictada por un órgano manifiestamente incompetente por razón de la materia, ha puesto fin a la vía administrativa y no fue recurrida en plazo. ¿Puede el Ayuntamiento declarar de oficio su nulidad?",
      ["Sí, en cualquier momento, por iniciativa propia o a solicitud de interesado, y previo dictamen favorable del Consejo de Estado u órgano consultivo equivalente de la Comunidad Autónoma, si lo hubiere, puede declarar de oficio la nulidad de actos que hayan puesto fin a la vía administrativa o no hayan sido recurridos en plazo, incursos en causa de nulidad de pleno derecho",
       "No, transcurrido el plazo de recurso el acto deviene firme e irrevisable en todo caso",
       "Sí, pero únicamente dentro del plazo de un año desde que se dictó el acto",
       "No, la revisión de oficio solo procede respecto de actos que aún no hayan puesto fin a la vía administrativa"],
      "Art. 106.1 LPACAP: las Administraciones Públicas, en cualquier momento, por iniciativa propia o a solicitud de interesado, y previo dictamen favorable del Consejo de Estado u órgano consultivo equivalente, declararán de oficio la nulidad de los actos que hayan puesto fin a la vía administrativa o no hayan sido recurridos en plazo, incursos en alguna causa del art. 47.1."),
    q("titulo-5-cap-1", "facil",
      "¿En qué causa de nulidad de pleno derecho se basaría esa revisión de oficio de la subvención?",
      ["Haber sido dictada por órgano manifiestamente incompetente por razón de la materia",
       "Haberse dictado fuera del plazo máximo de resolución del procedimiento",
       "Contener un simple defecto de forma que no cause indefensión al interesado",
       "Haberse notificado con retraso a la empresa beneficiaria"],
      "Art. 47.1.b) LPACAP, al que remite el art. 106.1: son nulos de pleno derecho los actos dictados por órgano manifiestamente incompetente por razón de la materia o del territorio."),
    q("titulo-5-cap-1", "dificil",
      "Si el procedimiento de revisión de oficio de la subvención se inicia de oficio por la propia Intervención municipal y transcurren seis meses sin dictarse resolución, ¿qué ocurre?",
      ["Se producirá la caducidad del procedimiento",
       "Se entenderá estimada la revisión por silencio administrativo positivo",
       "El procedimiento continúa indefinidamente, sin ningún límite temporal",
       "Se transforma automáticamente en un procedimiento de declaración de lesividad"],
      "Art. 106.5 LPACAP: cuando el procedimiento se hubiera iniciado de oficio, el transcurso del plazo de seis meses desde su inicio sin dictarse resolución producirá la caducidad del mismo."),
    q("titulo-5-cap-1", "media",
      "La licencia del gimnasio es válida y favorable para su titular, pero gravemente perjudicial para el interés público urbanístico, sin incurrir en causa de nulidad radical. ¿Qué vía debe seguir el Ayuntamiento para dejarla sin efecto?",
      ["Impugnarla ante el orden jurisdiccional contencioso-administrativo, previa su declaración de lesividad para el interés público, al tratarse de un acto favorable anulable",
       "Declarar directamente su nulidad de oficio, sin necesidad de acudir a la vía judicial",
       "Revocarla libremente en cualquier momento, por tratarse de un acto favorable al interesado",
       "Rectificarla sin más trámite, como si se tratara de un simple error material"],
      "Art. 107.1 LPACAP: las Administraciones Públicas podrán impugnar ante el orden jurisdiccional contencioso-administrativo los actos favorables para los interesados que sean anulables, previa su declaración de lesividad para el interés público."),
    q("titulo-5-cap-1", "media",
      "Han transcurrido dos años desde que se dictó la licencia del gimnasio. ¿Está todavía a tiempo el Ayuntamiento de declararla lesiva?",
      ["Sí, la declaración de lesividad no podrá adoptarse una vez transcurridos cuatro años desde que se dictó el acto administrativo, por lo que dentro de los dos años transcurridos aún es posible",
       "No, el plazo máximo para declarar la lesividad es de un año desde que se dictó el acto",
       "Sí, la declaración de lesividad puede adoptarse en cualquier momento, sin límite temporal alguno",
       "No, la declaración de lesividad debe adoptarse siempre dentro de los seis meses siguientes al acto"],
      "Art. 107.2 LPACAP: la declaración de lesividad no podrá adoptarse una vez transcurridos cuatro años desde que se dictó el acto administrativo."),
    q("titulo-5-cap-1", "facil",
      "Antes de declarar la lesividad de la licencia del gimnasio, ¿debe darse audiencia a su titular?",
      ["Sí, la declaración de lesividad exige la previa audiencia de cuantos aparezcan como interesados en el acto",
       "No, la declaración de lesividad puede adoptarse sin necesidad de oír al titular de la licencia",
       "Sí, pero únicamente si el titular lo solicita expresamente por escrito",
       "No, la audiencia solo es exigible en los procedimientos de revisión de oficio de actos nulos"],
      "Art. 107.2 LPACAP: la declaración de lesividad exigirá la previa audiencia de cuantos aparezcan como interesados en el acto, en los términos del art. 82."),
    q("titulo-5-cap-1", "dificil",
      "Al tratarse de una licencia municipal, si finalmente se decide declarar su lesividad, ¿qué órgano de la entidad local es competente para adoptar esa declaración?",
      ["El Pleno de la Corporación o, en su defecto, el órgano colegiado superior de la entidad",
       "El Alcalde, en todo caso, por tratarse de una competencia de dirección de la política municipal",
       "El propio Servicio de Urbanismo que tramitó originalmente la licencia",
       "La Junta de Gobierno Local, con carácter exclusivo y excluyente"],
      "Art. 107.5 LPACAP: si el acto proviniera de las entidades que integran la Administración Local, la declaración de lesividad se adoptará por el Pleno de la Corporación o, en defecto de este, por el órgano colegiado superior de la entidad."),
    q("titulo-5-cap-1", "facil",
      "Respecto al simple error material en el nombre de un beneficiario de una ayuda social, ¿puede el Ayuntamiento rectificarlo directamente?",
      ["Sí, las Administraciones Públicas podrán rectificar en cualquier momento, de oficio o a instancia de los interesados, los errores materiales, de hecho o aritméticos existentes en sus actos",
       "No, cualquier error, por mínimo que sea, exige tramitar un procedimiento completo de revisión de oficio",
       "Sí, pero únicamente dentro del plazo de un mes desde que se dictó el acto",
       "No, los errores materiales solo pueden corregirse a instancia del propio interesado, nunca de oficio"],
      "Art. 109.2 LPACAP: las Administraciones Públicas podrán rectificar en cualquier momento, de oficio o a instancia de los interesados, los errores materiales, de hecho o aritméticos existentes en sus actos."),
    q("titulo-5-cap-1", "media",
      "Sobre la posible revocación de la sanción de gravamen impuesta hace tres años a un vecino, ¿qué límites tiene esa facultad de revocación?",
      ["Puede revocarse mientras no haya transcurrido el plazo de prescripción, siempre que la revocación no constituya dispensa o exención no permitida por las leyes, ni sea contraria al principio de igualdad, al interés público o al ordenamiento jurídico",
       "Los actos de gravamen nunca pueden revocarse: solo los actos favorables al interesado",
       "Puede revocarse libremente en cualquier momento, sin ningún límite legal aplicable",
       "Solo puede revocarse si lo solicita expresamente el vecino sancionado, nunca de oficio"],
      "Art. 109.1 LPACAP: las Administraciones Públicas podrán revocar sus actos de gravamen o desfavorables, mientras no haya transcurrido el plazo de prescripción, siempre que la revocación no constituya dispensa o exención no permitida, ni sea contraria al principio de igualdad, al interés público o al ordenamiento jurídico."),
    q("titulo-5-cap-1", "media",
      "Iniciado el procedimiento de revisión de oficio de la subvención de «Sabores del Ebro», ¿puede el órgano competente suspender la ejecución del acto mientras se tramita?",
      ["Sí, el órgano competente para declarar la nulidad o lesividad podrá suspender la ejecución del acto cuando esta pudiera causar perjuicios de imposible o difícil reparación",
       "No, la ejecución del acto nunca puede suspenderse mientras se tramita el expediente de revisión de oficio",
       "Sí, pero únicamente si lo solicita expresamente la propia empresa beneficiaria de la subvención",
       "No, la suspensión solo es posible una vez declarada ya la nulidad del acto"],
      "Art. 108 LPACAP: iniciado el procedimiento de revisión de oficio, el órgano competente para declarar la nulidad o lesividad podrá suspender la ejecución del acto cuando esta pudiera causar perjuicios de imposible o difícil reparación."),
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// CASO 2 — La sanción de tráfico y el recurso equivocado
// ═══════════════════════════════════════════════════════════════════════
const CASO_2 = {
  slug: "caso-sancion-trafico-alzada-reposicion",
  titulo: "La sanción de tráfico y el recurso equivocado: alzada, reposición y plazos",
  orden: 2,
  supuesto:
    "Don Ceferino recibe la notificación de una sanción de tráfico impuesta por un agente de un consorcio de " +
    "transporte dependiente de varias Administraciones, en una resolución que no pone fin a la vía " +
    "administrativa. El acto se notifica el día 3 de un mes. Aconsejado por un familiar, Ceferino presenta, mes " +
    "y medio después de la notificación, un recurso de reposición en lugar de uno de alzada. En un expediente " +
    "similar, otro sancionado, cuya resolución sí pone fin a la vía administrativa, presenta recurso de " +
    "reposición dentro del mes siguiente a la notificación y, a los dos meses, sin haber recibido respuesta, " +
    "decide acudir directamente a la vía contencioso-administrativa sin esperar más. Un tercer sancionado " +
    "solicita la suspensión de la ejecución de su sanción, alegando perjuicios de difícil reparación, y " +
    "transcurre un mes desde su solicitud sin que el Ayuntamiento resuelva expresamente sobre ella.",
  preguntas: [
    q("titulo-5-cap-2", "media",
      "La resolución sancionadora del consorcio no pone fin a la vía administrativa. ¿Qué recurso administrativo procede, y ante quién?",
      ["El recurso de alzada, ante el órgano superior jerárquico del que dictó el acto",
       "El recurso de reposición, ante el mismo órgano que dictó el acto",
       "El recurso extraordinario de revisión, ante el órgano que dictó el acto",
       "Ningún recurso administrativo: solo cabría acudir directamente a la vía judicial"],
      "Art. 121.1 LPACAP: las resoluciones y actos que no pongan fin a la vía administrativa podrán ser recurridos en alzada ante el órgano superior jerárquico del que los dictó."),
    q("titulo-5-cap-2", "dificil",
      "Ceferino presenta, por error, un recurso de reposición en lugar de uno de alzada. Si de su escrito se deduce con claridad su verdadero propósito impugnatorio, ¿es eso obstáculo para tramitarlo?",
      ["No, el error o la ausencia de la calificación del recurso por parte del recurrente no será obstáculo para su tramitación, siempre que se deduzca su verdadero carácter",
       "Sí, el recurso debe inadmitirse automáticamente por la sola calificación errónea del recurrente",
       "No, pero en ese caso el Ayuntamiento debe tramitarlo literalmente como recurso de reposición, sin corregir la calificación",
       "Sí, salvo que el recurrente abone una tasa adicional por la corrección de la calificación"],
      "Art. 115.2 LPACAP: el error o la ausencia de la calificación del recurso por parte del recurrente no será obstáculo para su tramitación, siempre que se deduzca su verdadero carácter."),
    q("titulo-5-cap-2", "media",
      "El acto se notificó el día 3, y Ceferino recurre mes y medio después. Si el plazo del recurso de alzada es de un mes desde un acto expreso, ¿en qué situación queda la resolución sancionadora?",
      ["Transcurrido el plazo de un mes sin haberse interpuesto el recurso de alzada, la resolución será firme a todos los efectos",
       "El plazo del recurso de alzada nunca caduca mientras el interesado no haya sido advertido expresamente de ello",
       "El plazo se amplía automáticamente a tres meses cuando el recurrente alega desconocimiento del plazo correcto",
       "La resolución nunca puede devenir firme mientras exista la posibilidad de un recurso extraordinario de revisión"],
      "Art. 122.1 LPACAP: el plazo para la interposición del recurso de alzada será de un mes si el acto fuera expreso; transcurrido ese plazo sin haberse interpuesto, la resolución será firme a todos los efectos."),
    q("titulo-5-cap-2", "facil",
      "El segundo sancionado, cuya resolución sí pone fin a la vía administrativa, presenta recurso de reposición. ¿Es este recurso obligatorio antes de acudir a la vía contencioso-administrativa?",
      ["No, el recurso de reposición contra los actos que ponen fin a la vía administrativa tiene carácter potestativo: cabe interponerlo o impugnar directamente el acto ante el orden jurisdiccional contencioso-administrativo",
       "Sí, es siempre un requisito previo obligatorio antes de poder acudir a la vía contencioso-administrativa",
       "No, el recurso de reposición ha sido suprimido por la Ley 39/2015 y ya no existe",
       "Sí, pero únicamente en los procedimientos de naturaleza sancionadora"],
      "Art. 123.1 LPACAP: los actos que pongan fin a la vía administrativa podrán ser recurridos potestativamente en reposición o ser impugnados directamente ante el orden jurisdiccional contencioso-administrativo."),
    q("titulo-5-cap-2", "dificil",
      "Si el segundo sancionado, tras interponer el recurso de reposición, acude directamente a la vía contencioso-administrativa a los dos meses sin esperar respuesta expresa ni el transcurso del plazo de desestimación presunta, ¿es eso correcto?",
      ["No, no se podrá interponer recurso contencioso-administrativo hasta que sea resuelto expresamente el recurso de reposición o se haya producido su desestimación presunta",
       "Sí, una vez interpuesto el recurso de reposición, el interesado puede acudir a la vía contencioso-administrativa en cualquier momento",
       "No, pero solo porque no han transcurrido aún seis meses desde la interposición del recurso de reposición",
       "Sí, siempre que hayan transcurrido al menos quince días desde la interposición del recurso"],
      "Art. 123.2 LPACAP: no se podrá interponer recurso contencioso-administrativo hasta que sea resuelto expresamente el recurso de reposición o se haya producido la desestimación presunta del mismo."),
    q("titulo-5-cap-2", "media",
      "¿Cuál es el plazo máximo para dictar y notificar la resolución del recurso de reposición del segundo sancionado?",
      ["Un mes",
       "Tres meses, igual que en el recurso de alzada",
       "Quince días, sin posibilidad de ampliación",
       "Seis meses desde la interposición del recurso"],
      "Art. 124.2 LPACAP: el plazo máximo para dictar y notificar la resolución del recurso de reposición será de un mes."),
    q("titulo-5-cap-2", "facil",
      "Una vez resuelto el recurso de reposición del segundo sancionado, ¿puede este interponer un nuevo recurso de reposición contra esa resolución?",
      ["No, contra la resolución de un recurso de reposición no podrá interponerse de nuevo dicho recurso",
       "Sí, puede interponer un segundo recurso de reposición dentro del mes siguiente",
       "Sí, siempre que aporte nuevos documentos no valorados en el primer recurso",
       "Sí, pero solo si lo autoriza expresamente el órgano que resolvió el primer recurso"],
      "Art. 124.3 LPACAP: contra la resolución de un recurso de reposición no podrá interponerse de nuevo dicho recurso."),
    q("titulo-5-cap-2", "media",
      "El tercer sancionado solicita la suspensión de la ejecución de su sanción alegando perjuicios de difícil reparación. Si transcurre un mes desde su solicitud sin resolución expresa, ¿qué ocurre?",
      ["La ejecución del acto impugnado se entenderá suspendida, salvo que el órgano competente haya dictado y notificado resolución expresa dentro de ese plazo de un mes",
       "La solicitud de suspensión se entiende automáticamente denegada por silencio administrativo",
       "El procedimiento de recurso caduca automáticamente por el transcurso de ese plazo",
       "La suspensión solo puede entenderse producida si lo confirma expresamente un juez"],
      "Art. 117.3 LPACAP: la ejecución del acto impugnado se entenderá suspendida si, transcurrido un mes desde que la solicitud de suspensión tuvo entrada en el registro, el órgano competente no ha dictado y notificado resolución expresa al respecto."),
    q("titulo-5-cap-2", "facil",
      "Como regla general, ¿suspende la mera interposición de un recurso administrativo la ejecución del acto impugnado?",
      ["No, la interposición de cualquier recurso, salvo disposición legal en contrario, no suspenderá la ejecución del acto impugnado",
       "Sí, todo recurso administrativo suspende automáticamente la ejecución del acto recurrido",
       "Sí, pero únicamente en los procedimientos sancionadores como el de tráfico",
       "No, la ejecución de un acto administrativo nunca puede suspenderse, ni siquiera a petición del interesado"],
      "Art. 117.1 LPACAP: la interposición de cualquier recurso, excepto en los casos en que una disposición establezca lo contrario, no suspenderá la ejecución del acto impugnado."),
    q("titulo-5-cap-2", "dificil",
      "Si el tercer sancionado hubiera fundado su solicitud de suspensión en que la sanción incurre en una causa de nulidad de pleno derecho del art. 47.1 LPACAP, ¿es esa circunstancia, por sí sola, relevante a efectos de la suspensión?",
      ["Sí, es una de las circunstancias que permiten al órgano competente para resolver el recurso acordar la suspensión de la ejecución del acto impugnado",
       "No, la nulidad de pleno derecho es irrelevante a efectos de la suspensión cautelar del acto",
       "Sí, pero solo si además el interesado presta caución o garantía suficiente en todo caso",
       "No, la suspensión solo puede fundarse en perjuicios económicos cuantificados con precisión"],
      "Art. 117.2.b) LPACAP: el órgano competente podrá suspender la ejecución del acto impugnado cuando la impugnación se fundamente en alguna de las causas de nulidad de pleno derecho del art. 47.1."),
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// CASO 3 — El expediente falsificado
// ═══════════════════════════════════════════════════════════════════════
const CASO_3 = {
  slug: "caso-expediente-falsificado-recurso-extraordinario-revision",
  titulo: "El expediente falsificado: recurso extraordinario de revisión",
  orden: 3,
  supuesto:
    "Una empresa constructora obtiene una licencia de obras que devino firme en vía administrativa. Tres años " +
    "después, una sentencia penal firme declara que varios informes técnicos que sirvieron de base a la " +
    "resolución fueron declarados falsos. Un particular afectado pretende ahora impugnar esa licencia ya firme. " +
    "En otro expediente, un ciudadano descubre un error de hecho en la resolución de una licencia de vado, que " +
    "resulta directamente de los propios documentos que ya obraban en el expediente administrativo, y quiere " +
    "recurrir pese a que el acto es firme desde hace dos años. En un tercer expediente, aparecen documentos " +
    "nuevos, posteriores a la resolución, que evidencian el error de una resolución sobre una subvención " +
    "dictada hace seis meses.",
  preguntas: [
    q("titulo-5-cap-2", "facil",
      "La licencia de obras ya es firme en vía administrativa. ¿Qué recurso administrativo cabe, en principio, contra un acto firme como este?",
      ["Solo procederá, contra los actos firmes en vía administrativa, el recurso extraordinario de revisión, cuando concurra alguna de las circunstancias tasadas legalmente previstas",
       "El recurso de alzada, exactamente en los mismos términos que contra un acto no firme",
       "El recurso de reposición ordinario, sin ninguna particularidad respecto de un acto no firme",
       "Ningún recurso es ya posible contra un acto administrativo firme, en ningún caso"],
      "Art. 113 LPACAP: contra los actos firmes en vía administrativa solo procederá el recurso extraordinario de revisión cuando concurra alguna de las circunstancias del art. 125.1."),
    q("titulo-5-cap-2", "media",
      "La sentencia penal firme declara falsos varios informes técnicos que sirvieron de base a la licencia de obras. ¿Es esta una causa tasada para el recurso extraordinario de revisión?",
      ["Sí, procede cuando en la resolución hayan influido esencialmente documentos o testimonios declarados falsos por sentencia judicial firme, anterior o posterior a aquella resolución",
       "No, la falsedad de documentos declarada judicialmente no está prevista como causa del recurso extraordinario de revisión",
       "Sí, pero únicamente si la sentencia penal es anterior a la propia resolución administrativa impugnada",
       "No, esa circunstancia solo permitiría iniciar un procedimiento de revisión de oficio, nunca un recurso de particulares"],
      "Art. 125.1.c) LPACAP: procede el recurso extraordinario de revisión cuando en la resolución hayan influido esencialmente documentos o testimonios declarados falsos por sentencia judicial firme, anterior o posterior a la resolución."),
    q("titulo-5-cap-2", "dificil",
      "¿En qué plazo debe interponerse el recurso extraordinario de revisión basado en esa sentencia penal firme?",
      ["En el plazo de tres meses a contar desde que la sentencia judicial quedó firme",
       "En el plazo de cuatro años desde que se dictó la resolución administrativa impugnada",
       "En el plazo de un mes desde que se dictó la resolución administrativa, igual que en el recurso de alzada",
       "No existe plazo alguno para interponer el recurso extraordinario de revisión basado en esta causa"],
      "Art. 125.2 LPACAP: en los casos distintos del error de hecho, el plazo será de tres meses a contar desde el conocimiento de los documentos o desde que la sentencia judicial quedó firme."),
    q("titulo-5-cap-2", "media",
      "El error de hecho detectado en la licencia de vado resulta directamente de los propios documentos que ya obraban en el expediente administrativo. ¿Es esa una causa admitida para el recurso extraordinario de revisión?",
      ["Sí, procede cuando al dictar la resolución se hubiera incurrido en error de hecho que resulte de los propios documentos incorporados al expediente",
       "No, el error de hecho nunca es causa de recurso extraordinario de revisión, solo de revisión de oficio",
       "Sí, pero únicamente si el error se refiere a una cuestión de derecho, no de hecho",
       "No, esa causa solo es aplicable a los actos que aún no hayan devenido firmes"],
      "Art. 125.1.a) LPACAP: procede el recurso extraordinario de revisión cuando al dictar el acto se hubiera incurrido en error de hecho que resulte de los propios documentos incorporados al expediente."),
    q("titulo-5-cap-2", "media",
      "Han transcurrido dos años desde que la licencia de vado devino firme. ¿Está todavía a tiempo el ciudadano de interponer el recurso extraordinario de revisión por error de hecho?",
      ["Sí, para esta causa concreta el plazo es de cuatro años siguientes a la fecha de notificación de la resolución impugnada, por lo que dentro de los dos años transcurridos aún es posible",
       "No, el plazo para esta causa es de tres meses desde que se dictó la resolución, ya transcurrido",
       "Sí, esta causa no tiene ningún plazo máximo de interposición",
       "No, cualquier recurso extraordinario de revisión debe interponerse siempre dentro del año siguiente al acto"],
      "Art. 125.2 LPACAP: cuando se trate de la causa de error de hecho, el recurso se interpondrá dentro del plazo de cuatro años siguientes a la fecha de notificación de la resolución impugnada."),
    q("titulo-5-cap-2", "facil",
      "¿Ante qué órgano debe interponerse el recurso extraordinario de revisión contra la licencia de vado?",
      ["Ante el órgano administrativo que dictó el acto impugnado, que también será el competente para resolverlo",
       "Ante el órgano jerárquicamente superior al que dictó el acto, igual que en el recurso de alzada",
       "Ante el Consejo de Estado directamente, sin intervención del órgano municipal",
       "Ante el orden jurisdiccional contencioso-administrativo, sin necesidad de vía administrativa previa"],
      "Art. 125.1 LPACAP: el recurso extraordinario de revisión se interpondrá ante el órgano administrativo que dictó el acto, que también será el competente para su resolución."),
    q("titulo-5-cap-2", "dificil",
      "Sobre la resolución de la subvención dictada hace seis meses, aparecen documentos nuevos y posteriores a ella que evidencian su error. ¿Es esta una causa admitida para el recurso extraordinario de revisión?",
      ["Sí, procede cuando aparezcan documentos de valor esencial para la resolución del asunto que, aunque sean posteriores, evidencien el error de la resolución recurrida",
       "No, solo los documentos anteriores a la resolución, y no los posteriores, pueden fundar este recurso",
       "Sí, pero únicamente si esos documentos hubieran podido aportarse durante la tramitación del expediente original",
       "No, los documentos nuevos posteriores a la resolución solo permiten iniciar un procedimiento judicial"],
      "Art. 125.1.b) LPACAP: procede el recurso extraordinario de revisión cuando aparezcan documentos de valor esencial para la resolución del asunto que, aunque sean posteriores, evidencien el error de la resolución recurrida."),
    q("titulo-5-cap-2", "media",
      "Si el órgano competente aprecia que el recurso extraordinario de revisión de la subvención no se funda en ninguna de las causas legalmente tasadas, ¿qué puede hacer sin necesidad de recabar dictamen consultivo?",
      ["Puede acordar motivadamente la inadmisión a trámite del recurso, sin necesidad de recabar dictamen del Consejo de Estado u órgano consultivo de la Comunidad Autónoma",
       "Debe en todo caso recabar el dictamen del Consejo de Estado antes de poder inadmitir el recurso",
       "Debe admitirlo automáticamente a trámite, sin posibilidad de inadmisión motivada",
       "Debe remitir el asunto directamente a la jurisdicción contencioso-administrativa, sin resolver él mismo"],
      "Art. 126.1 LPACAP: el órgano competente podrá acordar motivadamente la inadmisión a trámite, sin necesidad de recabar dictamen del Consejo de Estado, cuando el recurso no se funde en alguna de las causas del art. 125.1."),
    q("titulo-5-cap-2", "facil",
      "Si transcurren tres meses desde la interposición del recurso extraordinario de revisión sin que se dicte y notifique resolución expresa, ¿qué ocurre?",
      ["Se entenderá desestimado, quedando expedita la vía jurisdiccional contencioso-administrativa",
       "Se entenderá estimado por silencio administrativo positivo",
       "El recurso caduca automáticamente y no cabe ya ninguna vía de impugnación posterior",
       "El plazo se prorroga automáticamente por otros tres meses adicionales"],
      "Art. 126.3 LPACAP: transcurrido el plazo de tres meses desde la interposición del recurso extraordinario de revisión sin haberse dictado y notificado la resolución, se entenderá desestimado, quedando expedita la vía jurisdiccional contencioso-administrativa."),
    q("titulo-5-cap-2", "media",
      "Al resolver el recurso extraordinario de revisión, ¿debe el órgano competente pronunciarse únicamente sobre si concurre o no la causa alegada, sin entrar en el fondo del asunto?",
      ["No, el órgano debe pronunciarse no solo sobre la procedencia del recurso, sino también, en su caso, sobre el fondo de la cuestión resuelta por el acto recurrido",
       "Sí, su pronunciamiento debe limitarse exclusivamente a la concurrencia formal de la causa alegada",
       "No, debe limitarse a remitir el expediente a un nuevo procedimiento distinto para resolver el fondo",
       "Sí, entrar en el fondo del asunto en este recurso está expresamente prohibido por la Ley"],
      "Art. 126.2 LPACAP: el órgano al que corresponde conocer del recurso extraordinario de revisión debe pronunciarse no solo sobre la procedencia del recurso, sino también sobre el fondo de la cuestión resuelta por el acto recurrido."),
  ],
};

for (const caso of [CASO_1, CASO_2, CASO_3]) {
  await crearCaso(caso);
}
console.log("✔ Casos prácticos del tema 8 (Revisión de actos en vía administrativa) sembrados.");
