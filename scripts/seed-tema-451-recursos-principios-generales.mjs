/**
 * Crea tema-451 — Tema 29 de Administrativa/o (Ayto. Zaragoza, promoción
 * interna, CONV 5.2bis/2025): "Ley del Procedimiento Administrativo Común de
 * las Administraciones Públicas (XXI): recursos administrativos. Principios
 * generales."
 *
 * Fuentes leídas íntegras en la sesión:
 * - Ley 39/2015 (BOE-A-2015-10565), Título V, Capítulo II, Sección 1.ª, arts.
 *   112 a 120 (content-raw/ley-39-2015-procedimiento-administrativo;
 *   consolidado del BOE actualizado a 06-11-2024, sin cambios posteriores).
 * - Ley 7/1985, de Bases del Régimen Local (BOE-A-1985-5392), art. 52.2
 *   (content-raw/ley-7-1985-bases-regimen-local): qué resoluciones locales
 *   ponen fin a la vía administrativa, citado por el art. 114.1.g).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-451-recursos-principios-generales.mjs
 */
import { sembrarTema, ADMIN_AYTO } from "./lib/sembrar-tema.mjs";

const L = ADMIN_AYTO.ley39;
const LBRL = "https://www.boe.es/buscar/act.php?id=BOE-A-1985-5392";
const S1 = "objeto-clases-fin-via";
const S2 = "interposicion-inadmision-suspension";
const S3 = "audiencia-resolucion-pluralidad";

await sembrarTema({
  tema: {
    slug: "tema-451",
    titulo: "Recursos administrativos: principios generales",
    descripcion: "Ley 39/2015, Título V, Capítulo II, Sección 1.ª (arts. 112 a 120): actos recurribles (resoluciones y actos de trámite cualificados) y motivos; sustitución de los recursos por otros procedimientos; disposiciones generales no recurribles en vía administrativa; recurso extraordinario contra actos firmes; actos que ponen fin a la vía administrativa (y, en el ámbito local, art. 52.2 LBRL); contenido del escrito de recurso y error en su calificación; causas de inadmisión; no suspensión de la ejecución y suspensión por el órgano o por silencio de un mes; audiencia; resolución, retroacción y prohibición de reformatio in peius; pluralidad de recursos.",
    contenido: "Las reglas comunes a todos los recursos administrativos. Se recurren las resoluciones y los actos de trámite cualificados (los que deciden el fondo, impiden continuar o causan indefensión o perjuicio irreparable), por cualquier motivo de nulidad o anulabilidad; los reglamentos no se recurren en vía administrativa. Ponen fin a la vía administrativa, entre otras, las resoluciones de alzada, las de órganos sin superior jerárquico y, en los ayuntamientos, las del Pleno, el Alcalde y la Junta de Gobierno. Equivocarse al nombrar el recurso no impide tramitarlo. Recurrir no suspende la ejecución, salvo que el órgano lo acuerde por perjuicios de difícil reparación o nulidad, o si no contesta a la petición de suspensión en un mes. La resolución no puede empeorar la situación del recurrente.",
    enlaces_boe: [
      { url: L, titulo: "Ley 39/2015, de 1 de octubre, del Procedimiento Administrativo Común de las Administraciones Públicas (BOE-A-2015-10565)" },
      { url: LBRL, titulo: "Ley 7/1985, de 2 de abril, Reguladora de las Bases del Régimen Local (BOE-A-1985-5392), art. 52" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "Objeto y clases de recursos; fin de la vía administrativa", articulos: "arts. 112 a 114 Ley 39/2015; art. 52.2 LBRL", url: `${L}#a112` },
      { seccion: S2, titulo: "Interposición, inadmisión y suspensión de la ejecución", articulos: "arts. 115 a 117", url: `${L}#a115` },
      { seccion: S3, titulo: "Audiencia, resolución y pluralidad de recursos", articulos: "arts. 118 a 120", url: `${L}#a118` },
    ],
  },
  vinculo: { oposicion: ADMIN_AYTO.oposicion, bloqueId: ADMIN_AYTO.bloqueParte2, numero: 29 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Actos recurribles (art. 112.1)", "Las resoluciones y los actos de trámite que deciden directa o indirectamente el fondo, impiden continuar el procedimiento o producen indefensión o perjuicio irreparable"],
        ["Recursos ordinarios y motivos (art. 112.1)", "Alzada y potestativo de reposición, fundados en cualquier motivo de nulidad o anulabilidad (arts. 47 y 48)"],
        ["Actos de trámite no cualificados (art. 112.1)", "No se recurren por separado; la oposición se alega para que se considere en la resolución final"],
        ["Sustitución de los recursos (art. 112.2)", "Las leyes pueden sustituir la alzada (y la reposición, respetando su carácter potestativo) por procedimientos de impugnación, conciliación, mediación o arbitraje ante órganos no sometidos a instrucciones jerárquicas"],
        ["Disposiciones generales (art. 112.3)", "No cabe recurso en vía administrativa; el recurso contra un acto fundado solo en la nulidad de un reglamento puede interponerse ante el órgano que lo dictó"],
        ["Recurso contra actos firmes (art. 113)", "Solo el extraordinario de revisión, en los casos del art. 125.1"],
        ["Fin de la vía administrativa (art. 114.1)", "Resoluciones de alzada; procedimientos sustitutivos; órganos sin superior jerárquico; acuerdos finalizadores; responsabilidad patrimonial; procedimientos complementarios sancionadores; y las que disponga una norma legal o reglamentaria"],
        ["Fin de la vía administrativa en las entidades locales (art. 52.2 LBRL)", "Resoluciones del Pleno, Alcaldes y Juntas de Gobierno (salvo excepciones), las de órganos inferiores que resuelvan por delegación de estos y las que disponga una ley"],
      ],
      preguntas: [
        ["facil", "Contra las disposiciones administrativas de carácter general:", ["No cabe recurso en vía administrativa", "Cabe recurso de alzada", "Cabe recurso potestativo de reposición"], "Art. 112.3 Ley 39/2015."],
        ["media", "Son recurribles los actos de trámite que:", ["Deciden directa o indirectamente el fondo, impiden continuar el procedimiento o producen indefensión o perjuicio irreparable", "Todos, sin excepción", "Ninguno"], "Art. 112.1 Ley 39/2015."],
        ["media", "Los recursos de alzada y reposición pueden fundarse en:", ["Cualquiera de los motivos de nulidad o anulabilidad de los arts. 47 y 48", "Solo motivos de nulidad", "Solo razones de oportunidad"], "Art. 112.1 Ley 39/2015."],
        ["media", "Pone fin a la vía administrativa:", ["La resolución de los procedimientos de responsabilidad patrimonial", "La propuesta de resolución", "El acuerdo de iniciación"], "Art. 114.1.e) Ley 39/2015."],
        ["media", "Contra los actos firmes en vía administrativa solo procede:", ["El recurso extraordinario de revisión en los casos del art. 125.1", "El recurso de alzada", "El recurso de reposición"], "Art. 113 Ley 39/2015."],
        ["dificil", "En las entidades locales ponen fin a la vía administrativa, como regla, las resoluciones de:", ["El Pleno, el Alcalde y la Junta de Gobierno", "Cualquier jefe de servicio", "Solo el Pleno"], "Art. 52.2.a) Ley 7/1985."],
        ["media", "La oposición a los actos de trámite no recurribles puede:", ["Alegarse para su consideración en la resolución que ponga fin al procedimiento", "Interponerse en alzada", "No puede hacerse valer nunca"], "Art. 112.1, párrafo segundo, Ley 39/2015."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Contenido del escrito de recurso (art. 115.1)", "Nombre, apellidos e identificación; acto recurrido y razón de la impugnación; lugar, fecha, firma y medio de notificación; órgano destinatario y su código; demás particularidades exigidas"],
        ["Error en la calificación del recurso (art. 115.2)", "No impide su tramitación si se deduce su verdadero carácter"],
        ["Vicios causados por el propio recurrente (art. 115.3)", "Los vicios que hagan anulable un acto no pueden alegarlos quienes los causaron"],
        ["Causas de inadmisión (art. 116)", "Órgano incompetente si el competente es de otra Administración (se remite), falta de legitimación, acto no recurrible, plazo vencido y falta manifiesta de fundamento"],
        ["Efecto del recurso sobre la ejecución (art. 117.1)", "No la suspende, salvo disposición en contrario"],
        ["Suspensión por el órgano (art. 117.2)", "Tras ponderar razonadamente los perjuicios, si la ejecución puede causar perjuicios de imposible o difícil reparación o el recurso se funda en nulidad de pleno derecho"],
        ["Suspensión por silencio (art. 117.3)", "Se entiende suspendida si en un mes desde la entrada de la solicitud en el registro no se dicta y notifica resolución expresa"],
        ["Caución y publicación de la suspensión (art. 117.4 y 5)", "Si la suspensión puede causar perjuicios, exige caución; si el acto afecta a una pluralidad indeterminada de personas, se publica en el diario oficial"],
      ],
      preguntas: [
        ["facil", "La interposición de un recurso administrativo, salvo disposición en contrario:", ["No suspende la ejecución del acto impugnado", "Suspende siempre la ejecución", "Suspende la ejecución durante un mes"], "Art. 117.1 Ley 39/2015."],
        ["media", "El error en la calificación del recurso por el recurrente:", ["No es obstáculo para su tramitación si se deduce su verdadero carácter", "Determina su inadmisión", "Obliga a presentarlo de nuevo"], "Art. 115.2 Ley 39/2015."],
        ["media", "La ejecución del acto se entiende suspendida si, solicitada la suspensión, el órgano no resuelve y notifica en:", ["Un mes desde la entrada de la solicitud en el registro", "Diez días", "Tres meses"], "Art. 117.3 Ley 39/2015."],
        ["media", "Es causa de inadmisión del recurso:", ["Haber transcurrido el plazo para su interposición", "Haberlo calificado mal", "No citar los artículos infringidos"], "Art. 116.d) Ley 39/2015."],
        ["dificil", "Si el recurso se presenta ante un órgano incompetente y el competente pertenece a otra Administración:", ["Se inadmite y debe remitirse al órgano competente", "Se resuelve igualmente", "Se archiva sin más"], "Art. 116.a) Ley 39/2015."],
        ["media", "El órgano que resuelve el recurso puede suspender la ejecución cuando la impugnación se fundamente en:", ["Alguna causa de nulidad de pleno derecho del art. 47.1", "Cualquier defecto de forma", "Razones de oportunidad"], "Art. 117.2.b) Ley 39/2015."],
        ["media", "Los vicios que hagan anulable un acto no podrán ser alegados por:", ["Quienes los hubieren causado", "Los interesados", "Los terceros"], "Art. 115.3 Ley 39/2015."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Audiencia en el recurso (art. 118.1)", "Si se tienen en cuenta hechos o documentos nuevos, se ponen de manifiesto a los interesados de diez a quince días"],
        ["Documentos no tenidos en cuenta (art. 118.1)", "Los que el recurrente pudo aportar en el trámite de alegaciones y no aportó; tampoco pruebas no practicadas por causa imputable a él"],
        ["Otros interesados (art. 118.2)", "Se les da traslado del recurso en todo caso para alegar en el mismo plazo"],
        ["No son documentos nuevos (art. 118.3)", "El recurso, los informes, las propuestas y los aportados antes de la resolución impugnada"],
        ["Sentido de la resolución del recurso (art. 119.1)", "Estima total o parcialmente, desestima o declara la inadmisión"],
        ["Vicio de forma (art. 119.2)", "Si no procede resolver el fondo, se ordena la retroacción al momento del vicio, sin perjuicio de la convalidación"],
        ["Cuestiones no alegadas y congruencia (art. 119.3)", "Se deciden todas, oyendo antes a los interesados; pero la resolución será congruente y no puede agravar la situación inicial del recurrente"],
        ["Pluralidad de recursos (art. 120)", "Si traen causa del mismo acto y hay recurso judicial pendiente, puede suspenderse el plazo para resolver hasta el pronunciamiento judicial; el acuerdo es recurrible"],
      ],
      preguntas: [
        ["facil", "La resolución de un recurso administrativo:", ["No puede agravar la situación inicial del recurrente", "Puede agravarla si hay interés público", "Puede agravarla si lo pide otro interesado"], "Art. 119.3 Ley 39/2015."],
        ["media", "Si hay que tener en cuenta hechos o documentos nuevos, se dará audiencia a los interesados por un plazo:", ["No inferior a diez días ni superior a quince", "De cinco días", "De un mes"], "Art. 118.1 Ley 39/2015."],
        ["media", "Cuando existiendo vicio de forma no se estime procedente resolver sobre el fondo, se ordenará:", ["La retroacción del procedimiento al momento en que se cometió el vicio", "La estimación del recurso", "El archivo del procedimiento"], "Art. 119.2 Ley 39/2015."],
        ["media", "A efectos de la audiencia en el recurso, no tienen el carácter de documentos nuevos:", ["El recurso, los informes y las propuestas", "Los documentos aparecidos después de la resolución", "Los testimonios nuevos de terceros"], "Art. 118.3 Ley 39/2015."],
        ["dificil", "Si deben resolverse varios recursos contra un mismo acto y hay un recurso judicial pendiente, el órgano puede:", ["Suspender el plazo para resolver hasta el pronunciamiento judicial, con acuerdo recurrible", "Inadmitir todos los recursos", "Resolverlos sin audiencia"], "Art. 120 Ley 39/2015."],
        ["media", "Si hay otros interesados en el procedimiento, el recurso:", ["Se les trasladará en todo caso para que aleguen", "No se les comunica", "Solo se les notifica la resolución"], "Art. 118.2 Ley 39/2015."],
      ],
    },
  ],
  glosario: [
    [S1, "Recurso administrativo", "Impugnación de un acto ante la propia Administración para que lo revise; los ordinarios son la alzada y la reposición, y el extraordinario el de revisión."],
    [S1, "Acto de trámite cualificado", "Acto de trámite recurrible por decidir el fondo, impedir continuar o causar indefensión o perjuicio irreparable (art. 112.1)."],
    [S1, "Vía administrativa", "Conjunto de instancias ante la propia Administración; cuando se agota, solo queda acudir a los tribunales (salvo la reposición potestativa y la revisión extraordinaria)."],
    [S2, "Legitimación", "Aptitud para recurrir por tener un derecho o interés legítimo afectado; su falta es causa de inadmisión (art. 116.b)."],
    [S2, "Suspensión de la ejecución", "Paralización de los efectos del acto recurrido mientras se resuelve el recurso (art. 117)."],
    [S2, "Caución", "Garantía que puede exigirse para que la suspensión surta efecto si de ella pueden derivarse perjuicios (art. 117.4)."],
    [S3, "Retroacción", "Vuelta del procedimiento al momento en que se cometió un vicio de forma para repetir lo actuado desde ahí (art. 119.2)."],
  ],
  casos: [
    {
      slug: "adm-ayto-recurso-mal-calificado",
      titulo: "Un recurso mal titulado contra un decreto del concejal",
      supuesto: "Un funcionario recibe un decreto del concejal delegado de Personal, que resuelve por delegación del Alcalde, denegándole una excedencia. Presenta un escrito titulado «recurso de alzada», con su nombre, DNI, el acto recurrido y sus razones, y pide que no se ejecute la incorporación forzosa mientras se resuelve. Pasa un mes sin contestación a esa petición.",
      preguntas: [
        [S1, "media", "El decreto del concejal, dictado por delegación del Alcalde:", ["Pone fin a la vía administrativa", "No pone fin a la vía administrativa", "No es recurrible"], "Art. 52.2.b) Ley 7/1985 y art. 114.1.g) Ley 39/2015."],
        [S2, "media", "Que el funcionario lo titule «alzada» cuando procedería reposición:", ["No impide tramitarlo si se deduce su verdadero carácter", "Determina su inadmisión", "Obliga a archivarlo"], "Art. 115.2 Ley 39/2015."],
        [S2, "facil", "Presentar el recurso, por sí solo:", ["No suspende la ejecución del decreto", "Suspende la ejecución", "Anula el decreto"], "Art. 117.1 Ley 39/2015."],
        [S2, "media", "Como ha pasado un mes desde que su petición de suspensión entró en el registro sin respuesta:", ["La ejecución se entiende suspendida", "La petición se entiende denegada", "El recurso se entiende estimado"], "Art. 117.3 Ley 39/2015."],
        [S2, "media", "El órgano podría haber acordado la suspensión expresamente si la ejecución pudiera causar:", ["Perjuicios de imposible o difícil reparación", "Cualquier molestia", "Gastos de desplazamiento"], "Art. 117.2.a) Ley 39/2015."],
        [S2, "media", "En el escrito de recurso debe figurar, además, el órgano al que se dirige y:", ["Su código de identificación", "El nombre del concejal", "El número de registro de personal"], "Art. 115.1.d) Ley 39/2015."],
        [S1, "media", "El recurso puede fundarse en:", ["Cualquier motivo de nulidad o anulabilidad", "Solo en la nulidad", "Solo en motivos de oportunidad"], "Art. 112.1 Ley 39/2015."],
        [S3, "media", "Al resolver, el órgano:", ["No puede agravar la situación inicial del funcionario", "Puede quitarle otros derechos", "Puede sancionarle"], "Art. 119.3 Ley 39/2015."],
        [S3, "media", "La resolución del recurso podrá:", ["Estimarlo total o parcialmente, desestimarlo o inadmitirlo", "Solo estimarlo", "Solo desestimarlo"], "Art. 119.1 Ley 39/2015."],
        [S2, "dificil", "Si el recurso careciera manifiestamente de fundamento:", ["Podría inadmitirse", "Debería estimarse", "Debería remitirse al juez"], "Art. 116.e) Ley 39/2015."],
      ],
    },
    {
      slug: "adm-ayto-acto-tramite-oposicion",
      titulo: "Recurrir un acto de trámite en una oposición",
      supuesto: "En un proceso selectivo, el tribunal excluye a una aspirante del segundo ejercicio por no haber superado el primero. Otra aspirante quiere recurrir el acuerdo por el que el tribunal fija la fecha del segundo ejercicio, porque le viene mal. Una tercera presenta recurso contra la ordenanza municipal de tasas por derechos de examen.",
      preguntas: [
        [S1, "media", "La exclusión de la primera aspirante es un acto de trámite recurrible porque:", ["Determina la imposibilidad de continuar en el procedimiento", "Todos los actos de trámite lo son", "Lo dictó un tribunal"], "Art. 112.1 Ley 39/2015."],
        [S1, "media", "El acuerdo que fija la fecha del segundo ejercicio:", ["Es un acto de trámite no cualificado; la oposición se alega para la resolución final", "Es recurrible en alzada siempre", "Pone fin a la vía administrativa"], "Art. 112.1, párrafo segundo, Ley 39/2015."],
        [S1, "media", "El recurso contra la ordenanza de tasas, disposición de carácter general:", ["No cabe en vía administrativa", "Cabe en alzada", "Cabe en reposición"], "Art. 112.3 Ley 39/2015."],
        [S1, "dificil", "Si alguien recurriera su liquidación de la tasa alegando solo la nulidad de la ordenanza, podría interponer el recurso:", ["Directamente ante el órgano que dictó la ordenanza", "Solo ante el Tribunal Constitucional", "Ante el tribunal de selección"], "Art. 112.3, párrafo segundo, Ley 39/2015."],
        [S2, "media", "Si una aspirante sin ningún interés afectado recurre la exclusión de otra:", ["El recurso puede inadmitirse por falta de legitimación", "Debe estimarse", "Debe tramitarse siempre"], "Art. 116.b) Ley 39/2015."],
        [S3, "media", "Si al resolver el recurso se tienen en cuenta documentos nuevos no recogidos en el expediente:", ["Se dará audiencia de diez a quince días", "Se resolverá sin más", "Se archivará"], "Art. 118.1 Ley 39/2015."],
        [S3, "media", "Si hay otras aspirantes interesadas, el recurso:", ["Se les trasladará para que aleguen", "No se les comunica", "Solo se les comunica si aprueban"], "Art. 118.2 Ley 39/2015."],
        [S3, "dificil", "Documentos que la recurrente pudo aportar en las alegaciones y no aportó:", ["No se tendrán en cuenta al resolver el recurso", "Se tendrán siempre en cuenta", "Obligan a repetir el ejercicio"], "Art. 118.1, párrafo segundo, Ley 39/2015."],
        [S3, "media", "Si el tribunal cometió un vicio de forma y no procede resolver el fondo:", ["Se ordenará retrotraer al momento del vicio", "Se estimará el recurso en todo caso", "Se inadmitirá"], "Art. 119.2 Ley 39/2015."],
        [S1, "media", "Las leyes pueden sustituir el recurso de alzada por:", ["Procedimientos de impugnación, conciliación, mediación o arbitraje ante órganos no sometidos a instrucciones jerárquicas", "Una queja verbal", "Nada: la alzada es insustituible"], "Art. 112.2 Ley 39/2015."],
      ],
    },
    {
      slug: "adm-ayto-muchos-recursos-mismo-acto",
      titulo: "Cien recursos contra el mismo acto",
      supuesto: "Un acuerdo municipal que modifica las condiciones de uso de unos huertos urbanos recibe cien recursos de los usuarios. Uno de ellos, además, ha acudido ya al juzgado contra la desestimación presunta de su recurso. El acto afecta a una pluralidad indeterminada de personas y varios recurrentes piden su suspensión.",
      preguntas: [
        [S3, "media", "Ante la pluralidad de recursos y el recurso judicial pendiente, el órgano puede:", ["Suspender el plazo para resolver hasta que recaiga pronunciamiento judicial", "Inadmitir todos", "Resolverlos sin leerlos"], "Art. 120.1 Ley 39/2015."],
        [S3, "media", "El acuerdo de suspensión del plazo:", ["Debe notificarse a los interesados, que pueden recurrirlo", "No se notifica", "Es irrecurrible"], "Art. 120.2 Ley 39/2015."],
        [S3, "dificil", "Si un usuario recurre ese acuerdo de suspensión:", ["No afecta a los demás recursos suspendidos", "Se reactivan todos", "Se archivan todos"], "Art. 120.2, párrafo segundo, Ley 39/2015."],
        [S3, "media", "Recaído el pronunciamiento judicial, el órgano puede resolver:", ["Sin más trámites, salvo la audiencia cuando proceda", "Solo tras nueva información pública", "Solo con dictamen del Consejo de Estado"], "Art. 120.3 Ley 39/2015."],
        [S2, "media", "Si se acuerda la suspensión de la eficacia del acuerdo recurrido, al afectar a una pluralidad indeterminada de personas:", ["Debe publicarse en el periódico oficial en que se insertó el acto", "Basta con notificarla a los recurrentes", "No hace falta difundirla"], "Art. 117.5 Ley 39/2015."],
        [S2, "media", "Para suspender, el órgano debe ponderar razonadamente:", ["El perjuicio al interés público o a terceros frente al del recurrente", "Solo el interés del recurrente", "Solo el número de recursos"], "Art. 117.2 Ley 39/2015."],
        [S2, "media", "Si la suspensión puede causar perjuicios, solo producirá efectos:", ["Previa prestación de caución o garantía suficiente", "Tras un año", "Si lo aprueba el Pleno"], "Art. 117.4 Ley 39/2015."],
        [S2, "media", "Al acordar la suspensión pueden adoptarse:", ["Las medidas cautelares necesarias para proteger el interés público o de terceros", "Sanciones a los recurrentes", "Medidas que agraven la situación de todos"], "Art. 117.4 Ley 39/2015."],
        [S1, "media", "Si el acuerdo de los huertos lo hubiera adoptado la Junta de Gobierno municipal:", ["Pondría fin a la vía administrativa", "Sería recurrible en alzada ante el Pleno", "No sería recurrible"], "Art. 52.2.a) Ley 7/1985."],
        [S3, "media", "Si al resolver el órgano aprecia una cuestión no alegada por los recurrentes:", ["Puede decidirla oyéndoles previamente", "No puede tratarla", "La decide sin oírles"], "Art. 119.3 Ley 39/2015."],
      ],
    },
  ],
});
