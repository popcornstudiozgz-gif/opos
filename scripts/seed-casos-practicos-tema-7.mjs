/**
 * Casos prácticos — Tema 7 (Disposiciones sobre el procedimiento
 * administrativo común, Ley 39/2015 Título IV: garantías, iniciación,
 * instrucción y finalización). 3 casos de 10 preguntas cada uno, cada
 * uno centrado en una fase distinta del procedimiento:
 *   1. El vertido de aceite en el Canal Imperial: garantías del
 *      inculpado, clases de iniciación de oficio y medidas provisionales
 *      (arts. 53-56, 58-63)
 *   2. La subvención del mercadillo de artesanía: instrucción,
 *      alegaciones, prueba, informes y trámite de audiencia (arts. 75-83)
 *   3. La terraza de invierno paralizada: finalización, desistimiento,
 *      renuncia, terminación convencional y caducidad (arts. 84-86, 93-95)
 *
 * Misma mecánica que los casos anteriores: preguntas/opciones en las
 * tablas ya existentes, enlazadas vía caso_preguntas con su `orden`. La
 * primera opción de cada pregunta es siempre la correcta (el cliente
 * baraja el orden al mostrarlas).
 *
 * Uso: node --env-file=.env.local scripts/seed-casos-practicos-tema-7.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

const TEMA = "tema-7";
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
// CASO 1 — El vertido de aceite en el Canal Imperial
// ═══════════════════════════════════════════════════════════════════════
const CASO_1 = {
  slug: "caso-vertido-canal-imperial-iniciacion-oficio",
  titulo: "El vertido de aceite en el Canal Imperial: iniciación de oficio y medidas provisionales",
  orden: 1,
  supuesto:
    "Un vecino que paseaba junto al Canal Imperial de Aragón observa un vertido de aceite usado procedente de un " +
    "taller mecánico cercano y lo pone en conocimiento de la Policía Local, sin ser él mismo perjudicado " +
    "directo. Un agente medioambiental, en el ejercicio de sus funciones de inspección, redacta también un " +
    "informe sobre el mismo hecho por iniciativa propia. Por su parte, el Servicio de Aguas del Ayuntamiento, " +
    "que carece de competencia para incoar el procedimiento sancionador, remite al órgano competente una " +
    "petición solicitando la apertura del expediente, tras haber detectado el vertido en sus labores rutinarias " +
    "de control. El órgano competente decide incoar un procedimiento sancionador contra el titular del taller, " +
    "ordenando como medida cautelar inmediata, incluso antes de dictar el acuerdo de iniciación, el cierre " +
    "temporal del desagüe implicado, dada la urgencia del caso.",
  preguntas: [
    q("titulo-4-cap-2", "facil",
      "Los procedimientos administrativos, con carácter general, ¿de qué formas pueden iniciarse conforme a la Ley?",
      ["De oficio o a solicitud del interesado",
       "Únicamente de oficio, nunca a instancia de parte",
       "Únicamente a solicitud del interesado, salvo previsión legal expresa en contrario",
       "Únicamente mediante denuncia, sin que exista ninguna otra vía posible"],
      "Art. 54 LPACAP: los procedimientos podrán iniciarse de oficio o a solicitud del interesado."),
    q("titulo-4-cap-2", "media",
      "El vecino que observa el vertido y lo comunica a la Policía Local, sin ser perjudicado directo, realiza:",
      ["Una denuncia, esto es, el acto por el que cualquier persona pone en conocimiento de un órgano administrativo un hecho que pudiera justificar la iniciación de oficio de un procedimiento",
       "Una solicitud de iniciación, que legitima automáticamente al vecino como interesado en el procedimiento",
       "Una petición razonada, figura reservada a órganos administrativos con funciones de inspección",
       "Un recurso administrativo, susceptible de ser resuelto de forma independiente del procedimiento sancionador"],
      "Art. 62.1 LPACAP: se entiende por denuncia el acto por el que cualquier persona pone en conocimiento de un órgano administrativo la existencia de un hecho que pudiera justificar la iniciación de oficio de un procedimiento."),
    q("titulo-4-cap-2", "facil",
      "Por el solo hecho de presentar la denuncia, ¿adquiere el vecino la condición de interesado en el procedimiento sancionador?",
      ["No, la presentación de una denuncia no confiere, por sí sola, la condición de interesado en el procedimiento",
       "Sí, automáticamente y en todo caso",
       "Sí, pero únicamente cuando el vertido afecta a un bien de dominio público",
       "Sí, siempre que la denuncia se presente por escrito y no de forma verbal"],
      "Art. 62.5 LPACAP: la presentación de una denuncia no confiere, por sí sola, la condición de interesado en el procedimiento."),
    q("titulo-4-cap-2", "media",
      "El agente medioambiental redacta el informe por iniciativa propia, en el ejercicio de sus funciones de inspección. ¿Cómo se califica esta forma de inicio del procedimiento?",
      ["Inicio por propia iniciativa, entendida como la actuación derivada del conocimiento directo o indirecto de los hechos por el órgano que tiene atribuida la competencia de iniciación",
       "Inicio a solicitud del interesado, puesto que el agente actúa en representación del interés público afectado",
       "Inicio por denuncia, exactamente en los mismos términos que en el caso del vecino paseante",
       "Inicio por orden superior, por el solo hecho de tratarse de un funcionario con funciones de inspección"],
      "Art. 59 LPACAP: se entiende por propia iniciativa la actuación derivada del conocimiento directo o indirecto de las circunstancias, conductas o hechos por el órgano que tiene atribuida la competencia de iniciación."),
    q("titulo-4-cap-2", "dificil",
      "El Servicio de Aguas, que detectó el vertido pero no tiene competencia para iniciar el procedimiento sancionador, remite al órgano competente una petición solicitando la apertura del expediente. ¿Cómo se denomina esta forma de inicio, y vincula al órgano competente?",
      ["Es una petición razonada, formulada por un órgano que no tiene competencia para iniciar el procedimiento; no vincula al órgano competente, que deberá comunicar los motivos si decide no incoarlo",
       "Es una orden superior, que vincula siempre y en todo caso al órgano competente para iniciar el procedimiento",
       "Es una denuncia, con exactamente los mismos efectos que la presentada por el vecino paseante",
       "Es una solicitud de iniciación, que obliga a incoar el procedimiento en el plazo máximo de diez días"],
      "Art. 61.1 y 61.2 LPACAP: la petición razonada es la propuesta de iniciación formulada por un órgano sin competencia para iniciar el procedimiento; no vincula al órgano competente, que debe comunicar los motivos de no incoación."),
    q("titulo-4-cap-2", "media",
      "Los procedimientos de naturaleza sancionadora, como este, ¿pueden iniciarse a solicitud de un interesado?",
      ["No, los procedimientos sancionadores se iniciarán siempre de oficio por acuerdo del órgano competente",
       "Sí, siempre que lo solicite la persona directamente perjudicada por la infracción",
       "Sí, mediante cualquiera de las formas ordinarias de iniciación previstas para el resto de procedimientos",
       "Solo si la infracción tiene la calificación legal de leve"],
      "Art. 63.1 LPACAP: los procedimientos de naturaleza sancionadora se iniciarán siempre de oficio por acuerdo del órgano competente."),
    q("titulo-4-cap-2", "facil",
      "¿Deben separarse en este procedimiento sancionador la fase instructora y la sancionadora?",
      ["Sí, los procedimientos de naturaleza sancionadora deben establecer la debida separación entre la fase instructora y la sancionadora, encomendadas a órganos distintos",
       "No, ambas fases pueden encomendarse siempre al mismo órgano sin ningún inconveniente",
       "Solo es exigible esa separación cuando la infracción se califique como muy grave",
       "No existe ninguna exigencia legal de separación entre instrucción y sanción"],
      "Art. 63.1 LPACAP: los procedimientos sancionadores establecerán la debida separación entre la fase instructora y la sancionadora, encomendada a órganos distintos."),
    q("titulo-4-cap-2", "dificil",
      "El órgano competente ordena, incluso antes de dictar el acuerdo de iniciación, el cierre temporal del desagüe implicado, dada la urgencia del caso. ¿Permite esto la Ley?",
      ["Sí, antes de la iniciación del procedimiento, el órgano competente para iniciar o instruir puede adoptar de forma motivada, en casos de urgencia inaplazable, las medidas provisionales necesarias y proporcionadas, que deberán confirmarse, modificarse o levantarse en el acuerdo de iniciación",
       "No, las medidas provisionales solo pueden adoptarse una vez iniciado formalmente el procedimiento, nunca antes",
       "Sí, y esas medidas provisionales anteriores a la iniciación tienen validez indefinida, sin necesidad de confirmación posterior",
       "No, cualquier medida cautelar exige siempre la previa audiencia del interesado antes de su adopción"],
      "Art. 56.2 LPACAP: antes de la iniciación del procedimiento, en casos de urgencia inaplazable, el órgano competente para iniciar o instruir podrá adoptar de forma motivada las medidas provisionales necesarias y proporcionadas, que deberán confirmarse, modificarse o levantarse en el acuerdo de iniciación."),
    q("titulo-4-cap-2", "media",
      "Si el acuerdo de iniciación, dictado dentro de los quince días siguientes, no contiene un pronunciamiento expreso sobre esa medida provisional previa, ¿qué ocurre con ella?",
      ["Queda sin efecto, pues las medidas provisionales adoptadas antes de la iniciación quedan sin efecto si el acuerdo de iniciación no contiene un pronunciamiento expreso acerca de ellas",
       "Se mantiene indefinidamente vigente, salvo revocación expresa posterior",
       "Se convierte automáticamente en la sanción definitiva del procedimiento",
       "Debe ser ratificada obligatoriamente por el órgano superior jerárquico en el plazo de un mes"],
      "Art. 56.2 LPACAP (párrafo segundo): dichas medidas quedarán sin efecto si no se inicia el procedimiento en el plazo de quince días o cuando el acuerdo de iniciación no contenga un pronunciamiento expreso acerca de ellas."),
    q("titulo-4-cap-1", "facil",
      "Una vez incoado el procedimiento sancionador contra el titular del taller, ¿qué derecho específico le reconoce la Ley, además de los generales de cualquier interesado?",
      ["A ser notificado de los hechos que se le imputen, de las infracciones que puedan constituir y de las sanciones que pudieran corresponderle, así como de la identidad del instructor y del órgano competente para sancionar",
       "Únicamente el derecho genérico a ser oído, sin mayor concreción legal",
       "El derecho a que el procedimiento se resuelva necesariamente en su favor si no existen pruebas directas del vertido",
       "El derecho a elegir personalmente a la persona que actuará como instructor del procedimiento sancionador"],
      "Art. 53.2.a) LPACAP: en los procedimientos sancionadores, los presuntos responsables tienen derecho a ser notificados de los hechos imputados, las infracciones que puedan constituir, las sanciones que pudieran corresponder y la identidad del instructor y del órgano competente para sancionar."),
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// CASO 2 — La subvención del mercadillo de artesanía
// ═══════════════════════════════════════════════════════════════════════
const CASO_2 = {
  slug: "caso-subvencion-mercadillo-artesania-instruccion",
  titulo: "La subvención del mercadillo de artesanía: instrucción, prueba e informes",
  orden: 2,
  supuesto:
    "La asociación «Manos de Aragón» solicita al Ayuntamiento de Zaragoza una subvención para organizar un " +
    "mercadillo de artesanía local. En su solicitud declara unos gastos previstos que el Ayuntamiento no " +
    "considera suficientemente acreditados, por lo que abre un período de prueba. Durante la instrucción, la " +
    "asociación presenta nuevas facturas antes del trámite de audiencia. El órgano instructor solicita además " +
    "un informe económico al Servicio de Intervención, que no responde dentro del plazo señalado, sin tratarse " +
    "de un informe preceptivo. Al preparar la propuesta de resolución, el instructor rechaza una de las pruebas " +
    "propuestas por la asociación —el testimonio de un proveedor— por considerarla manifiestamente innecesaria. " +
    "Finalmente, antes de redactar la propuesta de resolución, se pone de manifiesto el expediente completo a " +
    "la asociación para que formule las alegaciones que estime oportunas.",
  preguntas: [
    q("titulo-4-cap-4", "facil",
      "¿Quién debe realizar, de oficio, los actos de instrucción necesarios para determinar y comprobar los hechos del expediente de la subvención?",
      ["El órgano que tramite el procedimiento, sin perjuicio del derecho de los interesados a proponer las actuaciones que requieran su intervención",
       "Exclusivamente la propia asociación solicitante, que debe aportar todas las pruebas por su cuenta",
       "El Pleno del Ayuntamiento, en todo caso, con independencia de la cuantía de la subvención",
       "Un órgano jurisdiccional externo designado específicamente a tal efecto"],
      "Art. 75.1 LPACAP: los actos de instrucción necesarios para la determinación, conocimiento y comprobación de los hechos se realizarán de oficio por el órgano que tramite el procedimiento."),
    q("titulo-4-cap-4", "media",
      "La asociación presenta nuevas facturas antes del trámite de audiencia. ¿Debe el órgano competente tenerlas en cuenta al redactar la propuesta de resolución?",
      ["Sí, los interesados pueden aducir alegaciones y aportar documentos en cualquier momento del procedimiento anterior al trámite de audiencia, y deben ser tenidos en cuenta al redactar la propuesta de resolución",
       "No, solo se admiten documentos aportados en el momento inicial de la solicitud de subvención",
       "Sí, pero únicamente si el propio Ayuntamiento los solicita expresamente a la asociación",
       "No, cualquier documento posterior a la solicitud inicial se considera extemporáneo y se inadmite"],
      "Art. 76.1 LPACAP: los interesados podrán, en cualquier momento del procedimiento anterior al trámite de audiencia, aducir alegaciones y aportar documentos, que serán tenidos en cuenta al redactar la propuesta de resolución."),
    q("titulo-4-cap-4", "media",
      "Al no considerar acreditados los gastos declarados, el Ayuntamiento abre un período de prueba. ¿Qué duración tiene, como regla general, ese período ordinario?",
      ["No superior a treinta días ni inferior a diez",
       "Exactamente quince días, sin posibilidad de variación",
       "No superior a sesenta días ni inferior a veinte",
       "La Ley no fija ningún límite temporal para el período de prueba"],
      "Art. 77.2 LPACAP: el instructor acordará la apertura de un período de prueba por un plazo no superior a treinta días ni inferior a diez."),
    q("titulo-4-cap-4", "dificil",
      "El instructor rechaza el testimonio del proveedor propuesto por la asociación por considerarlo manifiestamente innecesario. ¿Es correcta esa forma de proceder?",
      ["Sí, el instructor solo puede rechazar las pruebas propuestas por los interesados cuando sean manifiestamente improcedentes o innecesarias, y debe hacerlo mediante resolución motivada",
       "No, el instructor está obligado a admitir siempre todas las pruebas que proponga el interesado, sin excepción alguna",
       "Sí, pero no es necesario motivar el rechazo de ninguna prueba propuesta por el interesado",
       "No, el rechazo de pruebas propuestas por el interesado está terminantemente prohibido por la Ley"],
      "Art. 77.3 LPACAP: el instructor del procedimiento solo podrá rechazar las pruebas propuestas por los interesados cuando sean manifiestamente improcedentes o innecesarias, mediante resolución motivada."),
    q("titulo-4-cap-4", "facil",
      "Cuando finalmente se practique el testimonio de algún testigo admitido, ¿qué debe comunicar la Administración a la asociación con antelación suficiente?",
      ["El inicio de las actuaciones necesarias para la realización de las pruebas admitidas, consignando lugar, fecha y hora de su práctica",
       "Únicamente el resultado final de la prueba, una vez que ya se haya practicado",
       "No existe obligación legal de comunicar nada relativo a la práctica de la prueba",
       "Solamente la identidad del funcionario que presenciará la práctica de la prueba"],
      "Arts. 78.1 y 78.2 LPACAP: la Administración comunicará a los interesados, con antelación suficiente, el inicio de las actuaciones de prueba, consignando lugar, fecha y hora de su práctica."),
    q("titulo-4-cap-4", "media",
      "El informe económico solicitado al Servicio de Intervención no es preceptivo y no se emite en el plazo señalado. ¿Qué puede hacer el instructor?",
      ["Proseguir las actuaciones, sin perjuicio de la responsabilidad en que pueda incurrir el responsable de la demora",
       "Debe suspender obligatoriamente el procedimiento hasta que el informe se emita, sea o no preceptivo",
       "Debe archivar directamente el expediente por la sola falta del informe",
       "Debe requerir necesariamente un nuevo informe idéntico a un órgano administrativo distinto"],
      "Art. 80.3 LPACAP: de no emitirse el informe en plazo, y sin perjuicio de la responsabilidad en que incurra el responsable de la demora, se podrán proseguir las actuaciones salvo que se trate de un informe preceptivo."),
    q("titulo-4-cap-4", "facil",
      "Salvo disposición expresa en contrario, ¿qué carácter tienen, con carácter general, los informes solicitados en un procedimiento como este?",
      ["Facultativos y no vinculantes",
       "Preceptivos y vinculantes en todo caso",
       "Preceptivos, pero nunca vinculantes para el órgano que resuelve",
       "Facultativos, pero siempre vinculantes para el órgano que resuelve"],
      "Art. 80.1 LPACAP: salvo disposición expresa en contrario, los informes serán facultativos y no vinculantes."),
    q("titulo-4-cap-4", "media",
      "Antes de redactar la propuesta de resolución, se pone de manifiesto el expediente a la asociación mediante el trámite de audiencia. ¿En qué plazo puede alegar y presentar documentos en ese trámite?",
      ["En un plazo no inferior a diez días ni superior a quince",
       "En un plazo fijo e improrrogable de cinco días",
       "En un plazo no inferior a un mes ni superior a dos meses",
       "La Ley no fija ningún plazo concreto para el trámite de audiencia"],
      "Art. 82.2 LPACAP: los interesados, en un plazo no inferior a diez días ni superior a quince, podrán alegar y presentar los documentos y justificaciones que estimen pertinentes."),
    q("titulo-4-cap-4", "dificil",
      "Si antes del vencimiento de ese plazo la asociación manifiesta expresamente su decisión de no efectuar alegaciones ni aportar más documentos, ¿qué ocurre con el trámite de audiencia?",
      ["Se tendrá por realizado el trámite",
       "El procedimiento debe suspenderse hasta que transcurra íntegramente el plazo máximo de quince días",
       "Se declara automáticamente la caducidad del procedimiento de subvención",
       "El Ayuntamiento debe conceder de oficio un nuevo plazo adicional de audiencia"],
      "Art. 82.3 LPACAP: si antes del vencimiento del plazo los interesados manifiestan su decisión de no efectuar alegaciones ni aportar nuevos documentos o justificaciones, se tendrá por realizado el trámite."),
    q("titulo-4-cap-4", "media",
      "¿Es posible, con carácter general, prescindir del trámite de audiencia en un procedimiento como el de esta subvención?",
      ["Sí, se puede prescindir de él cuando no figuren en el procedimiento ni se tengan en cuenta en la resolución otros hechos ni otras alegaciones y pruebas que las aducidas por el propio interesado",
       "No, el trámite de audiencia es siempre obligatorio y no admite ninguna excepción",
       "Sí, pero únicamente cuando la cuantía de la subvención sea inferior a 3.000 euros",
       "No, prescindir del trámite de audiencia determina en todo caso la nulidad de pleno derecho de la resolución"],
      "Art. 82.4 LPACAP: se podrá prescindir del trámite de audiencia cuando no figuren en el procedimiento ni sean tenidos en cuenta en la resolución otros hechos ni otras alegaciones y pruebas que las aducidas por el interesado."),
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// CASO 3 — La terraza de invierno paralizada
// ═══════════════════════════════════════════════════════════════════════
const CASO_3 = {
  slug: "caso-terraza-invierno-finalizacion-caducidad",
  titulo: "La terraza de invierno paralizada: finalización, desistimiento y caducidad",
  orden: 3,
  supuesto:
    "Un bar del Casco Histórico solicita autorización para instalar una terraza de invierno acristalada. Durante " +
    "la tramitación, el Ayuntamiento le requiere aportar un plano técnico adicional, advirtiéndole de que, si " +
    "no lo hace, transcurrido cierto plazo se producirá la caducidad del procedimiento. El titular del bar no " +
    "responde, y pasados los tres meses desde el requerimiento sin que aporte el plano, el Ayuntamiento se " +
    "plantea archivar el expediente. En un expediente paralelo, el propio titular decide desistir " +
    "voluntariamente de su segunda solicitud, relativa a una ampliación de horario, aunque un vecino que se " +
    "había personado como interesado en ese expediente pide que continúe la tramitación pese al desistimiento. " +
    "En un tercer expediente, el Ayuntamiento y una empresa de mobiliario urbano alcanzan un convenio para poner " +
    "fin a una controversia sobre el diseño homologado de las terrazas municipales. Finalmente, un incendio " +
    "destruye por completo un cuarto local para el que se había solicitado una licencia de apertura, haciendo " +
    "imposible continuar ese procedimiento.",
  preguntas: [
    q("titulo-4-cap-5", "facil",
      "Además de la resolución, ¿qué otras causas pueden poner fin a un procedimiento administrativo conforme a la Ley?",
      ["El desistimiento, la renuncia al derecho en que se funde la solicitud (cuando no esté prohibida por el ordenamiento) y la declaración de caducidad",
       "Únicamente la resolución expresa: ninguna otra causa puede poner fin al procedimiento",
       "Solo el transcurso del plazo máximo de resolución, sea cual sea el sentido del silencio administrativo",
       "Únicamente el fallecimiento del interesado, cuando el procedimiento se hubiera iniciado a su solicitud"],
      "Art. 84.1 LPACAP: pondrán fin al procedimiento la resolución, el desistimiento, la renuncia al derecho en que se funde la solicitud y la declaración de caducidad."),
    q("titulo-4-cap-5", "media",
      "El Ayuntamiento requiere al titular del bar que aporte un plano técnico, advirtiéndole de la caducidad si no lo hace. Transcurridos tres meses desde el requerimiento sin que lo aporte, ¿qué debe ordenar el Ayuntamiento?",
      ["El archivo de las actuaciones, notificándoselo al interesado, al haberse producido la caducidad del procedimiento por causa imputable al interesado",
       "Debe resolver directamente sobre el fondo del asunto, sin poder declarar la caducidad en ningún caso",
       "Debe ampliar automáticamente el plazo otros tres meses, sin posibilidad de archivar el expediente",
       "Debe incoar de oficio un procedimiento sancionador contra el titular del bar por no aportar el plano"],
      "Art. 95.1 LPACAP: transcurridos tres meses desde la advertencia sin que el interesado realice las actividades necesarias para reanudar la tramitación, la Administración acordará el archivo de las actuaciones."),
    q("titulo-4-cap-5", "facil",
      "Contra la resolución que declare la caducidad del procedimiento de la terraza de invierno, ¿puede el titular del bar interponer recurso?",
      ["Sí, contra la resolución que declare la caducidad procederán los recursos pertinentes",
       "No, la declaración de caducidad es irrecurrible en todo caso",
       "Sí, pero únicamente mediante recurso contencioso-administrativo directo, sin recurso administrativo previo",
       "No, salvo que la caducidad se hubiera declarado por causa no imputable al interesado"],
      "Art. 95.1 LPACAP (in fine): contra la resolución que declare la caducidad procederán los recursos pertinentes."),
    q("titulo-4-cap-5", "media",
      "Si en lugar de omitir el plano, el titular del bar simplemente tarda en cumplimentar un trámite no indispensable para dictar resolución, ¿puede el Ayuntamiento declarar la caducidad por esa sola inactividad?",
      ["No, no podrá acordarse la caducidad por la simple inactividad del interesado en la cumplimentación de trámites que no sean indispensables para dictar resolución; esa inactividad solo produce la pérdida de su derecho a ese trámite",
       "Sí, cualquier inactividad del interesado, sea cual sea el trámite afectado, permite declarar la caducidad",
       "Sí, pero únicamente si la inactividad se prolonga durante más de un año",
       "No, en ningún caso puede el interesado perder su derecho a un trámite del procedimiento"],
      "Art. 95.2 LPACAP: no podrá acordarse la caducidad por la simple inactividad del interesado en la cumplimentación de trámites no indispensables para dictar resolución; esa inactividad solo tendrá el efecto de la pérdida de su derecho a ese trámite."),
    q("titulo-4-cap-5", "dificil",
      "Si la caducidad del procedimiento de la terraza no impide iniciar un nuevo procedimiento por no haber prescrito la acción, ¿qué ocurre con los actos y trámites ya practicados en el procedimiento caducado?",
      ["Pueden incorporarse al nuevo procedimiento aquellos cuyo contenido se hubiera mantenido igual de no haberse producido la caducidad, si bien deberán cumplimentarse en todo caso los trámites de alegaciones, prueba y audiencia",
       "Se pierden por completo, sin que pueda aprovecharse ningún trámite del procedimiento anterior",
       "El nuevo procedimiento debe tramitarse exactamente con los mismos plazos ya transcurridos en el procedimiento caducado",
       "La caducidad produce siempre la prescripción de la acción, impidiendo iniciar un nuevo procedimiento"],
      "Art. 95.3 LPACAP: en el nuevo procedimiento podrán incorporarse los actos y trámites cuyo contenido se hubiera mantenido igual de no haberse producido la caducidad, debiendo cumplimentarse en todo caso alegaciones, prueba y audiencia."),
    q("titulo-4-cap-5", "media",
      "El titular del bar desiste voluntariamente de su segunda solicitud, sobre ampliación de horario, pero un vecino personado como interesado pide que continúe la tramitación. ¿Puede el procedimiento continuar pese al desistimiento?",
      ["Sí, si se hubiesen personado terceros interesados, estos pueden instar la continuación del procedimiento en el plazo de diez días desde que fueron notificados del desistimiento",
       "No, el desistimiento del solicitante pone fin al procedimiento de forma automática e irreversible, sin excepción",
       "Sí, pero solo si lo autoriza expresamente el propio titular del bar que ha desistido",
       "No, los terceros interesados nunca pueden instar la continuación de un procedimiento del que el solicitante ha desistido"],
      "Art. 94.4 LPACAP: la Administración aceptará de plano el desistimiento salvo que, habiéndose personado terceros interesados, estos instasen su continuación en el plazo de diez días desde que fueron notificados de aquel."),
    q("titulo-4-cap-5", "facil",
      "Con carácter general, ¿puede la Administración, en un procedimiento iniciado de oficio, desistir motivadamente de su tramitación?",
      ["Sí, en los procedimientos iniciados de oficio la Administración puede desistir motivadamente, en los supuestos y con los requisitos previstos en las leyes",
       "No, la Administración nunca puede desistir de un procedimiento que ella misma ha iniciado de oficio",
       "Sí, pero únicamente si lo autoriza previamente el propio interesado afectado por el procedimiento",
       "No, el desistimiento es una figura reservada exclusivamente a los interesados, nunca a la Administración"],
      "Art. 93 LPACAP: en los procedimientos iniciados de oficio, la Administración podrá desistir, motivadamente, en los supuestos y con los requisitos previstos en las Leyes."),
    q("titulo-4-cap-5", "media",
      "El Ayuntamiento y la empresa de mobiliario urbano alcanzan un convenio que pone fin a su controversia sobre el diseño de las terrazas. ¿Admite la Ley que un acuerdo de este tipo tenga la consideración de finalizador del procedimiento?",
      ["Sí, las Administraciones Públicas pueden celebrar acuerdos, pactos, convenios o contratos que tengan la consideración de finalizadores de los procedimientos administrativos, siempre que no sean contrarios al ordenamiento jurídico ni versen sobre materias no susceptibles de transacción",
       "No, ningún acuerdo o convenio puede sustituir nunca a una resolución administrativa expresa",
       "Sí, pero solo si el convenio se limita estrictamente a materias de contratación pública",
       "No, los convenios entre Administración y particulares están reservados en exclusiva a conflictos judiciales ya iniciados"],
      "Art. 86.1 LPACAP: las Administraciones Públicas podrán celebrar acuerdos, pactos, convenios o contratos que tengan la consideración de finalizadores de los procedimientos administrativos, con el alcance y régimen que prevea la disposición que los regule."),
    q("titulo-4-cap-5", "facil",
      "El incendio que destruye por completo el local para el que se había solicitado la licencia de apertura hace imposible continuar el procedimiento. ¿Es esto una causa de terminación del procedimiento?",
      ["Sí, la imposibilidad material de continuar el procedimiento por causas sobrevenidas también produce su terminación, mediante resolución que en todo caso debe ser motivada",
       "No, la Ley no contempla ninguna causa de terminación distinta de la resolución expresa sobre el fondo del asunto",
       "Sí, pero en ese caso el procedimiento se considera automáticamente estimado por silencio administrativo",
       "No, en ese supuesto el Ayuntamiento debe declarar necesariamente la caducidad, nunca la terminación por imposibilidad material"],
      "Art. 84.2 LPACAP: también producirá la terminación del procedimiento la imposibilidad material de continuarlo por causas sobrevenidas, mediante resolución motivada."),
    q("titulo-4-cap-5", "media",
      "Esa resolución que declara la terminación del procedimiento por imposibilidad material sobrevenida, ¿debe estar motivada?",
      ["Sí, la resolución que se dicte en estos casos deberá ser motivada en todo caso",
       "No, basta con una simple comunicación informal al interesado, sin necesidad de resolución motivada",
       "Solo debe motivarse si el propio interesado lo solicita expresamente",
       "No, la motivación únicamente es exigible en los procedimientos de naturaleza sancionadora"],
      "Art. 84.2 LPACAP (in fine): la resolución que se dicte en los casos de imposibilidad material de continuar el procedimiento deberá ser motivada en todo caso."),
  ],
};

for (const caso of [CASO_1, CASO_2, CASO_3]) {
  await crearCaso(caso);
}
console.log("✔ Casos prácticos del tema 7 (Disposiciones sobre el procedimiento administrativo común) sembrados.");
