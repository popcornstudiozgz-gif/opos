/**
 * Crea tema-442 — Tema 20 de Administrativa/o (Ayto. Zaragoza, promoción
 * interna, CONV 5.2bis/2025): "Ley del Procedimiento Administrativo Común de
 * las Administraciones Públicas (XII): ordenación del procedimiento."
 *
 * Fuente: Ley 39/2015 (BOE-A-2015-10565), Título IV, Capítulo III, arts. 70 a
 * 74, texto consolidado leído íntegro (content-raw/ley-39-2015-
 * procedimiento-administrativo; consolidado del BOE actualizado a
 * 06-11-2024, sin cambios posteriores).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-442-ordenacion-procedimiento.mjs
 */
import { sembrarTema, ADMIN_AYTO } from "./lib/sembrar-tema.mjs";

const L = ADMIN_AYTO.ley39;
const S1 = "expediente-administrativo";
const S2 = "impulso-concentracion-tramites";
const S3 = "cumplimiento-tramites-cuestiones-incidentales";

await sembrarTema({
  tema: {
    slug: "tema-442",
    titulo: "Ordenación del procedimiento",
    descripcion: "Ley 39/2015, Título IV, Capítulo III (arts. 70 a 74): el expediente administrativo, su formato electrónico, índice y remisión conforme al Esquema Nacional de Interoperabilidad, e información auxiliar excluida; impulso de oficio, celeridad, orden riguroso de incoación y responsabilidad del instructor; concentración de trámites; cumplimiento de trámites por los interesados en diez días y declaración de decaimiento; cuestiones incidentales, que no suspenden salvo la recusación.",
    contenido: "Cómo se ordena la tramitación de un expediente: el expediente es electrónico y reúne de forma ordenada todos los documentos que fundamentan la resolución, pero no las notas, borradores o informes internos. El procedimiento se impulsa de oficio y los asuntos de la misma naturaleza se despachan por orden de entrada, salvo orden motivada del jefe de la unidad; saltarse el orden puede acarrear responsabilidad disciplinaria. Los trámites que admiten impulso simultáneo se acuerdan en un solo acto. Los interesados tienen, por regla general, diez días para cumplir sus trámites y, si no lo hacen, pueden ser declarados decaídos. Las cuestiones incidentales no suspenden el procedimiento, salvo la recusación.",
    enlaces_boe: [{ url: L, titulo: "Ley 39/2015, de 1 de octubre, del Procedimiento Administrativo Común de las Administraciones Públicas (BOE-A-2015-10565)" }],
    indice_estudio: [
      { seccion: S1, titulo: "El expediente administrativo", articulos: "art. 70", url: `${L}#a70` },
      { seccion: S2, titulo: "Impulso y concentración de trámites", articulos: "arts. 71 y 72", url: `${L}#a71` },
      { seccion: S3, titulo: "Cumplimiento de trámites y cuestiones incidentales", articulos: "arts. 73 y 74", url: `${L}#a73` },
    ],
  },
  vinculo: { oposicion: ADMIN_AYTO.oposicion, bloqueId: ADMIN_AYTO.bloqueParte2, numero: 20 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Expediente administrativo (art. 70.1)", "Conjunto ordenado de documentos y actuaciones que sirven de antecedente y fundamento a la resolución, y diligencias para ejecutarla"],
        ["Formato y formación del expediente (art. 70.2)", "Electrónico, por agregación ordenada de documentos, pruebas, dictámenes, informes, acuerdos, notificaciones y diligencias; con índice numerado cuando se remita y copia electrónica certificada de la resolución"],
        ["Remisión del expediente electrónico (art. 70.3)", "Conforme al Esquema Nacional de Interoperabilidad: completo, foliado, autentificado y con índice autentificado"],
        ["Efecto de autenticar el índice (art. 70.3)", "Garantiza la integridad e inmutabilidad del expediente desde su firma y permite recuperarlo; un mismo documento puede estar en varios expedientes"],
        ["Información que NO forma parte del expediente (art. 70.4)", "La auxiliar o de apoyo: aplicaciones, ficheros, bases de datos, notas, borradores, opiniones, resúmenes, comunicaciones e informes internos y juicios de valor"],
        ["Excepción a la exclusión del art. 70.4", "Los informes preceptivos y facultativos solicitados antes de la resolución que ponga fin al procedimiento sí forman parte del expediente"],
      ],
      preguntas: [
        ["facil", "Según el art. 70.2, los expedientes administrativos tendrán formato:", ["Electrónico", "Papel, con copia digital opcional", "El que elija el interesado"], "Art. 70.2 Ley 39/2015."],
        ["media", "No forma parte del expediente administrativo:", ["Un borrador de resolución o una nota interna de apoyo", "Un informe preceptivo solicitado antes de resolver", "La notificación de la resolución"], "Art. 70.4 Ley 39/2015."],
        ["media", "Cuando deba remitirse, el expediente electrónico se enviará:", ["Completo, foliado, autentificado y con un índice autentificado", "Solo con los documentos favorables al interesado", "En papel y por correo certificado"], "Art. 70.3 Ley 39/2015."],
        ["media", "Debe constar en el expediente, en relación con la resolución adoptada:", ["Copia electrónica certificada de la resolución", "Solo un resumen de la resolución", "La firma manuscrita del interesado"], "Art. 70.2 Ley 39/2015."],
        ["dificil", "Un mismo documento:", ["Puede formar parte de distintos expedientes electrónicos", "Solo puede incorporarse a un expediente", "Debe duplicarse con distinto número para cada expediente"], "Art. 70.3 Ley 39/2015."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Impulso del procedimiento (art. 71.1)", "De oficio en todos sus trámites y por medios electrónicos, bajo el principio de celeridad y respetando la transparencia y la publicidad"],
        ["Orden de despacho de los expedientes (art. 71.2)", "Orden riguroso de incoación en asuntos de homogénea naturaleza, salvo orden motivada en contrario del titular de la unidad, de la que quede constancia"],
        ["Consecuencia de alterar el orden de despacho (art. 71.2)", "Responsabilidad disciplinaria del infractor y, en su caso, remoción del puesto de trabajo"],
        ["Responsables directos de la tramitación (art. 71.3)", "Las personas designadas como órgano instructor o los titulares de las unidades con esa función, especialmente del cumplimiento de los plazos"],
        ["Concentración de trámites (art. 72.1)", "Por simplificación administrativa, se acuerdan en un solo acto los trámites que admitan impulso simultáneo y no deban cumplirse sucesivamente"],
        ["Trámites encargados a otros órganos (art. 72.2)", "En la comunicación debe consignarse el plazo legal establecido"],
      ],
      preguntas: [
        ["facil", "El procedimiento se impulsará:", ["De oficio en todos sus trámites", "Solo a instancia del interesado", "Solo cuando lo pida el superior jerárquico"], "Art. 71.1 Ley 39/2015."],
        ["media", "En el despacho de los expedientes de homogénea naturaleza se guardará:", ["El orden riguroso de incoación, salvo orden motivada en contrario del titular de la unidad", "El orden alfabético de los interesados", "El orden que prefiera cada tramitador"], "Art. 71.2 Ley 39/2015."],
        ["media", "El incumplimiento del orden de despacho puede dar lugar a:", ["Responsabilidad disciplinaria y, en su caso, remoción del puesto", "Nulidad de pleno derecho de todos los expedientes", "Una multa al interesado"], "Art. 71.2 Ley 39/2015."],
        ["media", "Según el principio de simplificación administrativa, se acordarán en un solo acto:", ["Los trámites que admitan impulso simultáneo y no sea obligado su cumplimiento sucesivo", "Todos los trámites del procedimiento", "Solo la iniciación y la resolución"], "Art. 72.1 Ley 39/2015."],
        ["dificil", "Son responsables directos de la tramitación y del cumplimiento de plazos:", ["Las personas designadas como órgano instructor o los titulares de las unidades con esa función", "Los interesados", "Los órganos consultivos"], "Art. 71.3 Ley 39/2015."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Plazo general para trámites de los interesados (art. 73.1)", "Diez días desde el siguiente a la notificación, salvo que la norma fije otro"],
        ["Actos de los interesados defectuosos (art. 73.2)", "La Administración lo comunica a su autor y le concede diez días para cumplimentarlos"],
        ["Decaimiento en el derecho al trámite (art. 73.3)", "Puede declararse a quien no cumpla; pero su actuación se admite si se produce antes o dentro del día en que se notifica la resolución que tiene por transcurrido el plazo"],
        ["Cuestiones incidentales (art. 74)", "No suspenden la tramitación, ni siquiera las relativas a la nulidad de actuaciones, salvo la recusación"],
      ],
      preguntas: [
        ["facil", "Salvo que la norma fije otro plazo, los trámites de los interesados deben realizarse en:", ["Diez días a partir del siguiente a la notificación", "Quince días", "Un mes"], "Art. 73.1 Ley 39/2015."],
        ["media", "Las cuestiones incidentales que se susciten en el procedimiento:", ["No suspenden su tramitación, salvo la recusación", "Suspenden siempre la tramitación", "Solo suspenden si afectan a la nulidad de actuaciones"], "Art. 74 Ley 39/2015."],
        ["media", "Al interesado que no cumpla un trámite en plazo se le podrá:", ["Declarar decaído en su derecho al trámite correspondiente", "Sancionar con multa", "Excluir de todo el procedimiento"], "Art. 73.3 Ley 39/2015."],
        ["dificil", "La actuación del interesado fuera de plazo se admite y produce efectos si se realiza:", ["Antes o dentro del día en que se notifique la resolución que tiene por transcurrido el plazo", "En los diez días siguientes al vencimiento", "En cualquier momento antes de la resolución final"], "Art. 73.3 Ley 39/2015."],
        ["media", "Si un acto del interesado no reúne los requisitos necesarios, la Administración le concederá para cumplimentarlo:", ["Diez días", "Cinco días", "Quince días"], "Art. 73.2 Ley 39/2015."],
      ],
    },
  ],
  glosario: [
    [S1, "Expediente administrativo", "Conjunto ordenado de documentos y actuaciones que fundamentan la resolución y las diligencias para ejecutarla (art. 70.1)."],
    [S1, "Foliado", "Numeración ordenada de los documentos del expediente; en el electrónico se garantiza con un índice autentificado."],
    [S1, "Esquema Nacional de Interoperabilidad", "Conjunto de criterios técnicos que permiten intercambiar expedientes y documentos electrónicos entre Administraciones (art. 70.3)."],
    [S2, "Impulso de oficio", "Obligación de la Administración de hacer avanzar el procedimiento sin esperar a que lo pida el interesado (art. 71.1)."],
    [S2, "Concentración de trámites", "Acuerdo en un solo acto de los trámites que pueden impulsarse a la vez (art. 72)."],
    [S3, "Decaimiento", "Pérdida del derecho a realizar un trámite por no cumplirlo en plazo (art. 73.3)."],
    [S3, "Cuestión incidental", "Cuestión que surge durante el procedimiento distinta de la principal; no lo suspende salvo la recusación (art. 74)."],
  ],
  casos: [
    {
      slug: "adm-ayto-expediente-al-juzgado",
      titulo: "El juzgado pide el expediente",
      supuesto: "Un interesado ha recurrido ante el Juzgado de lo Contencioso-Administrativo una denegación de licencia. El juzgado pide al Ayuntamiento el expediente. En la carpeta electrónica hay: la solicitud, un informe técnico preceptivo, la notificación, la resolución, varios correos internos entre técnicos con opiniones personales y dos borradores de la resolución.",
      preguntas: [
        [S1, "media", "¿Forman parte del expediente los correos internos con opiniones personales?", ["No, son información auxiliar o de apoyo", "Sí, todo lo que esté en la carpeta", "Solo si el interesado lo pide"], "Art. 70.4 Ley 39/2015."],
        [S1, "media", "¿Forman parte del expediente los borradores de la resolución?", ["No", "Sí", "Solo el último"], "Art. 70.4 Ley 39/2015."],
        [S1, "facil", "¿Forma parte del expediente el informe técnico preceptivo pedido antes de resolver?", ["Sí", "No, porque es un informe interno", "Solo si es favorable"], "Art. 70.4 Ley 39/2015."],
        [S1, "media", "El expediente se remitirá al juzgado:", ["Completo, foliado, autentificado y con índice autentificado", "Sin índice", "Solo con la resolución"], "Art. 70.3 Ley 39/2015."],
        [S1, "media", "La remisión se hará conforme a:", ["El Esquema Nacional de Interoperabilidad y sus Normas Técnicas", "El reglamento interno de cada servicio", "Las instrucciones del abogado del interesado"], "Art. 70.3 Ley 39/2015."],
        [S1, "media", "La autenticación del índice garantiza:", ["La integridad e inmutabilidad del expediente desde su firma", "Que la resolución es correcta", "La gratuidad de la remisión"], "Art. 70.3 Ley 39/2015."],
        [S1, "media", "En el expediente debe constar de la resolución:", ["Copia electrónica certificada", "Solo un extracto", "La versión en borrador"], "Art. 70.2 Ley 39/2015."],
        [S1, "facil", "El expediente reúne los documentos que sirven de antecedente y fundamento a la resolución y:", ["Las diligencias encaminadas a ejecutarla", "Las opiniones personales de los técnicos", "Los expedientes de otros vecinos"], "Art. 70.1 Ley 39/2015."],
        [S1, "dificil", "Si el informe técnico se usó también en otro expediente de licencia:", ["Puede formar parte de ambos expedientes", "Debe eliminarse de uno de ellos", "Debe repetirse el informe"], "Art. 70.3 Ley 39/2015."],
        [S1, "media", "Cuando el expediente se remite, debe acompañarse de:", ["Un índice numerado de todos los documentos", "Un resumen del instructor", "La opinión del alcalde"], "Art. 70.2 Ley 39/2015."],
      ],
    },
    {
      slug: "adm-ayto-orden-despacho-favor",
      titulo: "Un compañero quiere adelantar un expediente",
      supuesto: "En la unidad de tramitación de bonificaciones del IBI hay 300 solicitudes pendientes, todas iguales. Un compañero quiere adelantar la de un conocido suyo, presentada la última. La jefa de unidad, por su parte, decide dar prioridad mediante orden motivada a las solicitudes de familias con personas dependientes, dejando constancia por escrito.",
      preguntas: [
        [S2, "facil", "Como regla, las 300 solicitudes deben despacharse:", ["Por riguroso orden de incoación", "Por orden alfabético", "Por orden de importe"], "Art. 71.2 Ley 39/2015."],
        [S2, "media", "Si el compañero adelanta la solicitud de su conocido, se expone a:", ["Responsabilidad disciplinaria y, en su caso, remoción del puesto", "Nada, si la solicitud es correcta", "Solo una amonestación verbal del interesado"], "Art. 71.2 Ley 39/2015."],
        [S2, "media", "¿Puede la jefa de unidad alterar el orden?", ["Sí, mediante orden motivada de la que quede constancia", "No, nunca", "Sí, verbalmente y sin motivar"], "Art. 71.2 Ley 39/2015."],
        [S2, "media", "El procedimiento se rige por el principio de:", ["Celeridad", "Lentitud garantista", "Oralidad"], "Art. 71.1 Ley 39/2015."],
        [S2, "media", "Los responsables directos del cumplimiento de los plazos en la unidad son:", ["Los titulares de las unidades con función instructora o los instructores designados", "Los solicitantes", "El servicio de informática"], "Art. 71.3 Ley 39/2015."],
        [S2, "media", "Si para resolver hace falta pedir a la vez un informe a Catastro y otro a Servicios Sociales, independientes entre sí:", ["Se acordarán en un solo acto", "Se pedirán uno detrás de otro", "Se pedirán al final"], "Art. 72.1 Ley 39/2015."],
        [S2, "dificil", "Al pedir esos informes a otros órganos, la comunicación debe indicar:", ["El plazo legal establecido", "El nombre del solicitante más antiguo", "La cuantía de la bonificación"], "Art. 72.2 Ley 39/2015."],
        [S3, "media", "Si una solicitante debe aportar un documento y no se fija otro plazo, tendrá:", ["Diez días desde el siguiente a la notificación", "Cinco días", "Un mes"], "Art. 73.1 Ley 39/2015."],
        [S3, "media", "Si no lo aporta en plazo, se la podrá:", ["Declarar decaída en su derecho a ese trámite", "Sancionar", "Excluir de futuros procedimientos"], "Art. 73.3 Ley 39/2015."],
        [S2, "media", "El impulso del procedimiento se hará, además, a través de:", ["Medios electrónicos", "Correo postal exclusivamente", "Llamadas telefónicas"], "Art. 71.1 Ley 39/2015."],
      ],
    },
    {
      slug: "adm-ayto-recusacion-instructor",
      titulo: "La recusación del instructor y un documento tardío",
      supuesto: "En un expediente sancionador por ocupación de vía pública, la empresa interesada plantea, en mitad de la tramitación, que se declare la nulidad de una diligencia de inspección y, además, recusa al instructor por amistad íntima con el denunciante. También presenta un documento que se le había pedido, dos días después de vencer su plazo, justo el día en que le notifican la resolución que le declara decaído en ese trámite.",
      preguntas: [
        [S3, "media", "La petición de nulidad de la diligencia de inspección, como cuestión incidental:", ["No suspende la tramitación", "Suspende la tramitación", "Obliga a archivar el expediente"], "Art. 74 Ley 39/2015."],
        [S3, "media", "La recusación del instructor:", ["Es la única cuestión incidental que suspende la tramitación", "No suspende la tramitación", "Obliga a archivar el expediente"], "Art. 74 Ley 39/2015."],
        [S3, "dificil", "El documento presentado el mismo día en que se notifica la resolución de decaimiento:", ["Se admite y produce sus efectos legales", "Se rechaza por extemporáneo", "Se admite pero sin efectos"], "Art. 73.3 Ley 39/2015."],
        [S3, "media", "Si lo hubiera presentado al día siguiente de esa notificación:", ["Ya no se admitiría como cumplimiento del trámite", "Se admitiría igualmente", "Se admitiría con multa"], "Art. 73.3 Ley 39/2015."],
        [S3, "media", "Si la Administración aprecia que un escrito de la empresa no reúne los requisitos necesarios:", ["Se lo comunicará y le dará diez días para cumplimentarlo", "Lo archivará sin más", "Le impondrá una sanción"], "Art. 73.2 Ley 39/2015."],
        [S3, "facil", "El plazo general para los trámites de los interesados es de:", ["Diez días", "Veinte días", "Tres días"], "Art. 73.1 Ley 39/2015."],
        [S2, "media", "Mientras se resuelve la recusación, el procedimiento:", ["Queda suspendido", "Sigue su curso", "Caduca"], "Art. 74 Ley 39/2015."],
        [S1, "media", "El escrito de recusación y su resolución:", ["Forman parte del expediente", "Son información auxiliar", "Se guardan en un expediente secreto"], "Art. 70.2 Ley 39/2015."],
        [S2, "media", "El instructor designado es responsable directo de:", ["La tramitación y el cumplimiento de los plazos", "La sanción final", "El pago de la multa"], "Art. 71.3 Ley 39/2015."],
        [S1, "media", "Las notas manuscritas del instructor para preparar la propuesta:", ["No forman parte del expediente", "Forman parte del expediente", "Deben notificarse al interesado"], "Art. 70.4 Ley 39/2015."],
      ],
    },
  ],
});
