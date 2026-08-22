/**
 * Casos prácticos — Tema 4 (Los interesados en el procedimiento, Ley 39/2015
 * Título I). Arranca el bloque 3 (procedimiento administrativo): 2 casos de
 * 10 preguntas cada uno, centrados en artículos distintos del Título I para
 * no solapar contenido:
 *   1. Los vecinos del edificio Pignatelli: capacidad de obrar de un menor,
 *      concepto de interesado, pluralidad de interesados, nuevos interesados
 *      sobrevenidos y sucesión en la condición de interesado (arts. 3, 4, 7, 8)
 *   2. La gestoría Aragón Trámites: obligación de relacionarse
 *      electrónicamente, representación y registro de apoderamientos,
 *      identificación y firma, asistencia a interesados sin medios
 *      electrónicos (arts. 5, 6, 9-12, 14, 68.4)
 *
 * Misma mecánica que seed-casos-practicos-tema-1.mjs y -tema-3.mjs: las
 * preguntas y opciones se insertan en las tablas preguntas/opciones ya
 * existentes, y cada una se enlaza a su caso vía caso_preguntas con su
 * `orden`. La primera opción de cada pregunta es siempre la correcta (el
 * cliente baraja el orden al mostrarlas).
 *
 * Uso: node --env-file=.env.local scripts/seed-casos-practicos-tema-4.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

const TEMA = "tema-4";
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
// CASO 1 — Los vecinos del edificio Pignatelli
// ═══════════════════════════════════════════════════════════════════════
const CASO_1 = {
  slug: "caso-vecinos-pignatelli-pluralidad-interesados",
  titulo: "Los vecinos del edificio Pignatelli: pluralidad de interesados",
  orden: 1,
  supuesto:
    "Varios vecinos del edificio de la calle Pignatelli presentan conjuntamente ante el Ayuntamiento de Zaragoza " +
    "un escrito solicitando la reparación de una farola municipal defectuosa que ha causado daños en la fachada " +
    "del inmueble, sin designar representante ni indicar quién firma en primer lugar. Entre los firmantes está " +
    "Nayara, de 16 años, que actúa por sí misma reclamando una indemnización por el golpe que sufrió su " +
    "bicicleta, aparcada en el portal, sin que la asista ninguno de sus progenitores. También firma la asociación " +
    "vecinal «Ebro Vivo», que carece de personalidad jurídica propia. Meses después, ya en instrucción, el " +
    "Ayuntamiento advierte que el titular de un local comercial de la planta baja —que no firmó el escrito " +
    "inicial— podría verse directamente afectado por la resolución que se adopte. Además, uno de los vecinos " +
    "firmantes, don Restituto, fallece durante la tramitación, y su hijo solicita continuar en su lugar como " +
    "heredero de la vivienda dañada, ofreciendo actuar también en representación del resto de herederos mediante " +
    "apoderamiento apud acta tramitado electrónicamente.",
  preguntas: [
    q("titulo-1-cap-1", "facil",
      "Sobre Nayara, que actúa sola reclamando la indemnización por su bicicleta sin la asistencia de sus padres, ¿tiene capacidad de obrar ante el Ayuntamiento?",
      ["Sí, si el ejercicio y defensa de ese derecho concreto le está permitido por el ordenamiento jurídico sin necesidad de la asistencia de quien ejerza la patria potestad, tutela o curatela",
       "No, los menores de edad carecen en todo caso de capacidad de obrar ante las Administraciones Públicas",
       "Sí, automáticamente y sin excepciones, por el mero hecho de tener más de 14 años",
       "Solo si sus padres lo autorizan expresamente por escrito ante el Ayuntamiento"],
      "Art. 3.b) LPACAP: tienen capacidad de obrar los menores de edad para el ejercicio y defensa de aquellos derechos o intereses cuya actuación esté permitida por el ordenamiento jurídico sin la asistencia de quien ejerza la patria potestad, tutela o curatela (salvo incapacitación que afecte a ese ámbito)."),
    q("titulo-1-cap-1", "media",
      "El escrito lo firman varios vecinos sin señalar representante ni orden. ¿Con quién debe entenderse el Ayuntamiento las actuaciones del procedimiento?",
      ["Con el representante o interesado que expresamente hayan señalado y, en su defecto, con el que figure en primer término",
       "Con todos y cada uno de los firmantes, notificando individualmente cada trámite a cada uno de ellos",
       "Con el vecino de mayor edad del edificio",
       "Con el propietario de la vivienda de mayor superficie"],
      "Art. 7 LPACAP: cuando en una solicitud figuren varios interesados, las actuaciones se entenderán con el representante o interesado expresamente señalado y, en su defecto, con el que figure en primer término."),
    q("titulo-1-cap-1", "facil",
      "¿Qué condición ostentan los vecinos firmantes del escrito respecto al procedimiento de reparación de la farola?",
      ["La de interesados, en cuanto lo promueven como titulares de derechos o intereses legítimos, individuales o colectivos",
       "La de meros denunciantes, sin ningún derecho reconocido en el procedimiento",
       "La de testigos del procedimiento, sin capacidad de actuar en él",
       "La de terceros ajenos, hasta que recaiga resolución definitiva"],
      "Art. 4.1.a) LPACAP: se consideran interesados quienes promuevan el procedimiento como titulares de derechos o intereses legítimos, individuales o colectivos."),
    q("titulo-1-cap-1", "media",
      "Al advertir que el titular del local comercial no firmante puede verse directamente afectado por la resolución, ¿qué debe hacer el Ayuntamiento?",
      ["Comunicarle la tramitación del procedimiento, pues es titular de un derecho o interés legítimo y directo identificable en el expediente que puede resultar afectado por la resolución",
       "Nada: al no haber comparecido con el escrito inicial, pierde cualquier posibilidad de intervenir",
       "Abrir un procedimiento completamente nuevo y distinto solo para él",
       "Comunicárselo únicamente si él mismo lo solicita expresamente por escrito"],
      "Art. 8 LPACAP: si durante la instrucción de un procedimiento sin publicidad se advierte la existencia de personas titulares de derechos o intereses legítimos y directos, identificables en el expediente, que puedan resultar afectadas, se les comunicará la tramitación del procedimiento."),
    q("titulo-1-cap-1", "dificil",
      "Tras fallecer don Restituto, su hijo solicita continuar el procedimiento en su lugar como heredero de la vivienda. ¿Es correcta esa sustitución?",
      ["Sí: cuando la condición de interesado derive de una relación jurídica transmisible, el derecho-habiente sucede en tal condición cualquiera que sea el estado del procedimiento",
       "No, el fallecimiento de un interesado obliga a archivar el procedimiento en lo que a él respecta",
       "Solo si el resto de vecinos firmantes lo autorizan expresamente",
       "No, es necesario iniciar un procedimiento distinto e independiente"],
      "Art. 4.3 LPACAP: cuando la condición de interesado derivase de una relación jurídica transmisible, el derecho-habiente sucede en tal condición cualquiera que sea el estado del procedimiento."),
    q("titulo-1-cap-1", "media",
      "El hijo de don Restituto ofrece actuar también en representación del resto de herederos, acreditando la representación mediante apoderamiento apud acta por comparecencia electrónica en la sede electrónica municipal. ¿Es válido este cauce?",
      ["Sí: el apoderamiento apud acta puede otorgarse mediante comparecencia electrónica en la sede electrónica correspondiente, o mediante comparecencia personal en las oficinas de asistencia en materia de registros",
       "No, el apoderamiento apud acta solo puede realizarse presencialmente ante notario",
       "No, la representación en vía administrativa exige siempre poder notarial inscrito en el Registro Mercantil",
       "Solo sería válido si todos los herederos son mayores de edad y residen en Zaragoza"],
      "Art. 5.4 LPACAP: se entiende acreditada la representación mediante apoderamiento apud acta efectuado por comparecencia personal o comparecencia electrónica en la sede electrónica correspondiente, o mediante su inscripción en el registro electrónico de apoderamientos."),
    q("titulo-1-cap-1", "facil",
      "Si, mientras se acredita el poder, el hijo se limita a realizar un acto de mero trámite (aportar un documento que el Ayuntamiento le ha requerido), ¿es exigible en ese momento acreditar la representación?",
      ["No, para los actos y gestiones de mero trámite se presume la representación",
       "Sí, es imprescindible acreditar la representación para cualquier actuación, por mínima que sea",
       "No, porque la representación nunca es exigible en un procedimiento administrativo",
       "Solo es exigible si el trámite se realiza por medios electrónicos"],
      "Art. 5.3 LPACAP: para actos y gestiones de mero trámite se presumirá la representación; solo para formular solicitudes, presentar declaraciones responsables, interponer recursos, desistir o renunciar deberá acreditarse."),
    q("titulo-1-cap-1", "media",
      "Si más adelante el Ayuntamiento aprecia que la representación no está suficientemente acreditada para interponer un recurso en nombre de los herederos, ¿qué debe hacer antes de tener el acto por no realizado?",
      ["Conceder un plazo de diez días —o superior si las circunstancias del caso lo requieren— para subsanar el defecto, sin que la falta o insuficiente acreditación impida por sí sola tener el acto por realizado",
       "Rechazar de plano el escrito sin trámite adicional alguno",
       "Declarar automáticamente el desistimiento del interesado, sin posibilidad de subsanación",
       "Exigir necesariamente representación mediante poder notarial en un plazo máximo de tres días"],
      "Art. 5.6 LPACAP: la falta o insuficiente acreditación de la representación no impedirá que se tenga por realizado el acto, siempre que se aporte aquella o se subsane el defecto dentro del plazo de diez días que debe conceder el órgano administrativo, o un plazo superior si las circunstancias lo requieren."),
    q("titulo-1-cap-1", "dificil",
      "La asociación vecinal «Ebro Vivo», que carece de personalidad jurídica propia, también firma el escrito reclamando en nombre del colectivo de vecinos afectados. ¿Puede actuar con capacidad de obrar ante el Ayuntamiento?",
      ["Sí, cuando la Ley así lo declare expresamente, los grupos de afectados, las uniones y entidades sin personalidad jurídica y los patrimonios independientes o autónomos tienen capacidad de obrar",
       "No, solo las personas físicas o jurídicas con capacidad de obrar conforme a las normas civiles pueden actuar ante las Administraciones Públicas",
       "Sí, siempre y en todo caso, sin necesidad de previsión legal expresa",
       "No, las entidades sin personalidad jurídica nunca pueden ser parte en un procedimiento administrativo"],
      "Art. 3.c) LPACAP: cuando la Ley lo declare expresamente, tendrán capacidad de obrar los grupos de afectados, las uniones y entidades sin personalidad jurídica y los patrimonios independientes o autónomos."),
    q("titulo-1-cap-2", "media",
      "Al recibir el escrito, el Ayuntamiento comprueba el nombre y apellidos de cada firmante según constan en su DNI. ¿Está obligado a hacerlo así?",
      ["Sí, las Administraciones Públicas están obligadas a verificar la identidad de los interesados mediante la comprobación de su nombre y apellidos o denominación que consten en el DNI o documento identificativo equivalente",
       "No, la verificación de identidad es una facultad meramente potestativa de la Administración",
       "Solo es obligatoria cuando el interesado se relaciona con la Administración por medios electrónicos",
       "Solo es obligatoria en los procedimientos de naturaleza sancionadora"],
      "Art. 9.1 LPACAP: las Administraciones Públicas están obligadas a verificar la identidad de los interesados en el procedimiento administrativo mediante la comprobación de su nombre y apellidos o denominación o razón social que consten en el DNI o documento identificativo equivalente."),
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// CASO 2 — La gestoría Aragón Trámites
// ═══════════════════════════════════════════════════════════════════════
const CASO_2 = {
  slug: "caso-gestoria-aragon-tramites-apoderamiento",
  titulo: "La gestoría Aragón Trámites: representación, identificación y firma",
  orden: 2,
  supuesto:
    "La gestoría «Aragón Trámites» gestiona, en representación de varios clientes, trámites ante el Ayuntamiento " +
    "de Zaragoza. Uno de ellos, la empresa Forjados del Ebro S.L., le otorga un poder general inscrito en el " +
    "registro electrónico de apoderamientos para actuar en su nombre ante cualquier Administración. Otro " +
    "cliente, don Eusebio, un albañil jubilado de 78 años sin medios electrónicos propios, acude " +
    "presencialmente pidiendo ayuda para solicitar una tarjeta de aparcamiento por movilidad reducida, y no sabe " +
    "firmar electrónicamente. Una tercera clienta, arquitecta colegiada, se identifica ante el Ayuntamiento " +
    "mediante un certificado electrónico cualificado de firma para presentar su proyecto técnico. Meses después, " +
    "Forjados del Ebro S.L. decide revocar el poder general que otorgó a la gestoría, la misma mañana en que " +
    "esta ha presentado un recurso en su nombre.",
  preguntas: [
    q("titulo-1-cap-1", "facil",
      "Forjados del Ebro S.L. es una sociedad mercantil que actúa ante el Ayuntamiento a través de la gestoría. ¿Tiene capacidad de obrar ante las Administraciones Públicas?",
      ["Sí, las personas jurídicas que ostenten capacidad de obrar con arreglo a las normas civiles tienen capacidad de obrar ante las Administraciones Públicas",
       "No, solo las personas físicas tienen capacidad de obrar ante la Administración",
       "Sí, pero únicamente si cuenta con más de diez personas trabajadoras en plantilla",
       "No, las sociedades mercantiles necesitan una ley especial que expresamente les reconozca capacidad de obrar en cada caso"],
      "Art. 3.a) LPACAP: tendrán capacidad de obrar ante las Administraciones Públicas las personas físicas o jurídicas que ostenten capacidad de obrar con arreglo a las normas civiles."),
    q("titulo-1-cap-1", "media",
      "El poder general de Forjados del Ebro está inscrito en el registro electrónico de apoderamientos. ¿Cuál es su validez máxima?",
      ["Una validez determinada máxima de cinco años a contar desde la fecha de inscripción, que el poderdante puede prorrogar antes de que finalice",
       "Es indefinida mientras no se revoque expresamente",
       "Un año, prorrogable tácitamente de forma indefinida",
       "Diez años, sin posibilidad de prórroga"],
      "Art. 6.6 LPACAP: los poderes inscritos en el registro tendrán una validez determinada máxima de cinco años desde la fecha de inscripción, pudiendo el poderdante revocarlos o prorrogarlos antes de que finalice ese plazo."),
    q("titulo-1-cap-1", "dificil",
      "Cuando la gestoría presenta un recurso en nombre de Forjados del Ebro invocando ese poder inscrito, ¿debe volver a aportar el documento del poder en papel junto con el recurso?",
      ["No necesariamente: el documento electrónico que acredite el resultado de la consulta al registro electrónico de apoderamientos tiene la condición de acreditación de la representación a estos efectos",
       "Sí, siempre debe acompañarse el poder notarial original en cada escrito que se presente",
       "No, porque para interponer recursos nunca es necesario acreditar la representación",
       "Sí, salvo que el poder se hubiera otorgado exclusivamente apud acta"],
      "Art. 5.5 LPACAP: el documento electrónico que acredite el resultado de la consulta al registro electrónico de apoderamientos correspondiente tendrá la condición de acreditación de la representación."),
    q("titulo-1-cap-1", "media",
      "Entre los datos que debe contener el asiento del registro electrónico de apoderamientos sobre el poder de Forjados del Ebro, ¿cuál de los siguientes exige la Ley?",
      ["El periodo de tiempo por el cual se otorga el poder y el tipo de poder según las facultades que otorgue",
       "El número de cuenta bancaria de la sociedad poderdante",
       "El objeto social completo de la empresa poderdante",
       "El domicilio fiscal detallado del apoderado, con independencia de sus datos identificativos"],
      "Art. 6.3 LPACAP: los asientos de los registros de apoderamientos deben contener, al menos, los datos identificativos de poderdante y apoderado, la fecha de inscripción, el período de tiempo por el que se otorga el poder y el tipo de poder según las facultades que otorgue."),
    q("titulo-1-cap-1", "facil",
      "Si el poder de Forjados del Ebro se hubiera otorgado únicamente para que la gestoría realizara determinados trámites concretos especificados en el propio poder, ¿es esa una tipología admitida para su inscripción?",
      ["Sí, la Ley admite expresamente el poder limitado a la realización de determinados trámites especificados, junto con el poder general y el referido a una Administración u Organismo concreto",
       "No, solo cabe inscribir poderes generales, sin ninguna limitación de trámites",
       "No, los poderes limitados a trámites concretos nunca son inscribibles en un registro electrónico",
       "Sí, pero únicamente si además se formaliza ante notario, sin excepción alguna"],
      "Art. 6.4 LPACAP: los poderes inscribibles corresponden a un poder general, a un poder para actuar ante una Administración u Organismo concreto, o a un poder limitado a determinados trámites especificados en el propio poder."),
    q("titulo-1-cap-2", "media",
      "Don Eusebio, sin medios electrónicos, no sabe firmar electrónicamente su solicitud de tarjeta de aparcamiento. ¿Puede un funcionario municipal firmar en su lugar?",
      ["Sí: si carece de los medios electrónicos necesarios, su identificación o firma puede ser válidamente realizada por un funcionario público habilitado, previa identificación de Eusebio y su consentimiento expreso, dejando constancia de ello",
       "No, la firma es personalísima y no puede sustituirse en ningún caso",
       "Sí, pero no es necesario que Eusebio preste su consentimiento expreso",
       "No, en ese caso el trámite debe declararse inadmisible directamente"],
      "Art. 12.2 LPACAP: si el interesado carece de los medios electrónicos necesarios, su identificación o firma electrónica podrá ser válidamente realizada por un funcionario público, previa identificación del interesado y su consentimiento expreso, del que debe quedar constancia."),
    q("titulo-1-cap-2", "facil",
      "¿Qué Administraciones deben mantener actualizado un registro de los funcionarios habilitados para identificar o firmar en lugar de interesados como don Eusebio?",
      ["La Administración General del Estado, las Comunidades Autónomas y las Entidades Locales, con registros que deben ser interoperables entre sí",
       "Únicamente la Administración General del Estado",
       "Solo las Comunidades Autónomas con lengua cooficial",
       "No existe tal obligación: es una práctica meramente voluntaria de cada Ayuntamiento"],
      "Art. 12.3 LPACAP: la Administración General del Estado, las Comunidades Autónomas y las Entidades Locales mantendrán actualizado un registro de los funcionarios habilitados, plenamente interoperable e interconectado con el de las restantes Administraciones."),
    q("titulo-1-cap-2", "media",
      "La arquitecta se identifica mediante un certificado electrónico cualificado de firma electrónica expedido por un prestador incluido en la «Lista de confianza de prestadores de servicios de certificación». ¿Es un sistema de identificación electrónica válido conforme a la Ley?",
      ["Sí, es uno de los sistemas de identificación electrónica expresamente previstos por la Ley",
       "No, los certificados de firma electrónica solo sirven para firmar documentos, nunca para identificarse",
       "Sí, pero únicamente si además cuenta con una autorización expresa y específica del Ayuntamiento para ese trámite concreto",
       "No, ese sistema de identificación solo es válido para personas físicas que actúen sin representación"],
      "Art. 9.2.a) LPACAP: los interesados podrán identificarse electrónicamente mediante sistemas basados en certificados electrónicos cualificados de firma electrónica expedidos por prestadores incluidos en la Lista de confianza."),
    q("titulo-1-cap-2", "facil",
      "Para formular la solicitud de la tarjeta de movilidad reducida de don Eusebio, ¿exige la Ley el uso obligatorio de firma?",
      ["Sí: entre otros supuestos, para formular solicitudes, presentar declaraciones responsables o comunicaciones, interponer recursos, desistir de acciones y renunciar a derechos",
       "Sí, para cualquier actuación dentro del procedimiento, por mínima que sea",
       "No, la firma solo es exigible para interponer recursos",
       "No, la Ley nunca exige firma, basta con la identificación del interesado"],
      "Art. 11.2 LPACAP: las Administraciones solo requerirán el uso obligatorio de firma para formular solicitudes, presentar declaraciones responsables o comunicaciones, interponer recursos, desistir de acciones y renunciar a derechos."),
    q("titulo-1-cap-1", "dificil",
      "Forjados del Ebro revoca el poder general la misma mañana en que la gestoría ya ha presentado un recurso en su nombre. ¿Desde cuándo produce efectos esa revocación?",
      ["Desde la fecha en que se produzca la inscripción de la revocación en el registro correspondiente",
       "Desde el mismo momento en que el poderdante decide revocarlo, sin necesidad de inscripción alguna",
       "Un poder general nunca puede revocarse antes de que transcurran los cinco años de vigencia",
       "Solo produce efectos si la revocación se formaliza ante notario"],
      "Art. 6.7 LPACAP: las solicitudes de revocación podrán dirigirse a cualquier registro, debiendo quedar inscrita esta circunstancia y surtiendo efectos desde la fecha en que se produzca dicha inscripción."),
  ],
};

for (const caso of [CASO_1, CASO_2]) {
  await crearCaso(caso);
}
console.log("✔ Casos prácticos del tema 4 (Los interesados en el procedimiento) sembrados.");
