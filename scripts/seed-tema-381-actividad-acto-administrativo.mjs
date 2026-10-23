/**
 * Crea tema-381 — Tema 9 de Administrativo DGA (tema 4 del programa de
 * materias específicas): "La actividad de las Administraciones Públicas:
 * obligación de resolver y silencio administrativo. Términos y plazos.
 * Disposiciones administrativas. El acto administrativo: concepto,
 * elementos y clases. Su motivación y notificación. Eficacia y validez de
 * los actos administrativos: nulidad y anulabilidad. Ejecución de los actos
 * administrativos."
 *
 * Fuentes (textos consolidados leídos en esta sesión en la API del BOE):
 * - Ley 39/2015 (BOE-A-2015-10565): arts. 21-25 (obligación de resolver,
 *   suspensión, ampliación, silencio), 29-33 (términos y plazos), 34-46
 *   (requisitos, motivación, forma, eficacia, notificación y publicación),
 *   47-52 (nulidad, anulabilidad, conversión, conservación, convalidación),
 *   97-105 (ejecución) y 128-131 (disposiciones administrativas).
 * El concepto de acto administrativo, sus elementos (subjetivo, objetivo y
 * formal) y sus clases (resolutorios y de trámite, favorables y de gravamen,
 * reglados y discrecionales, expresos y presuntos, que agotan o no la vía
 * administrativa, firmes) son doctrina consolidada, apoyada en los arts. 34,
 * 35.1.i), 24, 112 y 114 de la Ley 39/2015; se presentan así.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-381-actividad-acto-administrativo.mjs
 */
import { sembrarTema, ADMIN_DGA } from "./lib/sembrar-tema.mjs";

const L39 = "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565";
const S1 = "obligacion-resolver-silencio";
const S2 = "terminos-plazos";
const S3 = "disposiciones-acto-concepto-elementos-clases";
const S4 = "motivacion-notificacion";
const S5 = "eficacia-validez-nulidad-anulabilidad";
const S6 = "ejecucion-actos";

await sembrarTema({
  tema: {
    slug: "tema-381",
    titulo: "Obligación de resolver y silencio, plazos, disposiciones y acto administrativo: motivación, notificación, eficacia, validez y ejecución",
    descripcion: "Obligación de resolver, plazo máximo, suspensión y ampliación; silencio en procedimientos iniciados a solicitud y de oficio. Términos y plazos: cómputo por horas, días, meses y años, días inhábiles, registros electrónicos, ampliación y tramitación de urgencia. Disposiciones administrativas. El acto administrativo: concepto, elementos y clases. Motivación y forma. Notificación (papel y electrónica, rechazo, notificación infructuosa) y publicación. Eficacia: ejecutividad, efectos y retroactividad. Validez: nulidad de pleno derecho, anulabilidad, conversión, conservación y convalidación. Ejecución forzosa: apremio, ejecución subsidiaria, multa coercitiva y compulsión.",
    contenido: "Qué pasa cuando la Administración no contesta a tiempo, cómo se cuentan los plazos (y qué ocurre si el último día es sábado), qué es un acto administrativo y qué debe incluir para ser válido, cómo se notifica en papel o por internet y cuándo se da por rechazada una notificación electrónica. También qué diferencia hay entre un acto nulo y uno anulable y cómo puede la Administración obligar a cumplir lo que ha decidido.",
    enlaces_boe: [
      { url: L39, titulo: "Ley 39/2015, de 1 de octubre, del Procedimiento Administrativo Común de las Administraciones Públicas (BOE-A-2015-10565)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "Obligación de resolver y silencio administrativo", articulos: "arts. 21-25", url: `${L39}#a21` },
      { seccion: S2, titulo: "Términos y plazos", articulos: "arts. 29-33", url: `${L39}#a29` },
      { seccion: S3, titulo: "Disposiciones administrativas y acto administrativo: concepto, elementos y clases", articulos: "arts. 34-36 y 128-131", url: `${L39}#a34` },
      { seccion: S4, titulo: "Motivación, notificación y publicación", articulos: "arts. 35 y 40-46", url: `${L39}#a40` },
      { seccion: S5, titulo: "Eficacia y validez: nulidad y anulabilidad", articulos: "arts. 37-39 y 47-52", url: `${L39}#a47` },
      { seccion: S6, titulo: "Ejecución de los actos administrativos", articulos: "arts. 97-105", url: `${L39}#a97` },
    ],
  },
  vinculo: { oposicion: ADMIN_DGA.oposicion, bloqueId: ADMIN_DGA.bloqueDerecho, numero: 9 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Obligación de resolver (art. 21.1 Ley 39/2015)", "La Administración debe dictar resolución expresa y notificarla en todos los procedimientos, cualquiera que sea su forma de iniciación"],
        ["Excepciones a resolver expresamente (art. 21.1)", "Terminación por pacto o convenio y procedimientos de derechos sujetos solo a declaración responsable o comunicación"],
        ["Plazo máximo para resolver (art. 21.2-3)", "El de la norma del procedimiento, sin exceder de 6 meses salvo ley o Derecho UE; si no se fija, 3 meses"],
        ["Cómputo del plazo para resolver (art. 21.3)", "De oficio: desde el acuerdo de iniciación; a solicitud: desde la entrada en el registro electrónico del órgano competente"],
        ["Comunicación al interesado (art. 21.4)", "En los 10 días siguientes a la recepción de la solicitud se le informa del plazo máximo y de los efectos del silencio"],
        ["Suspensión por informe preceptivo (art. 22.1.d)", "Desde la petición hasta la recepción del informe, comunicándolo; máximo 3 meses"],
        ["Ampliación del plazo para resolver (art. 23)", "Excepcional y motivada, agotados los medios; no puede superar el plazo inicial; no cabe recurso"],
        ["Silencio en procedimientos a solicitud (art. 24.1)", "Regla general: estimatorio, salvo que una ley, el Derecho UE o internacional dispongan lo contrario"],
        ["Silencio desestimatorio (art. 24.1)", "Derecho de petición, facultades sobre dominio o servicio público, actividades que dañen el medio ambiente, responsabilidad patrimonial, impugnación de actos y revisión de oficio a solicitud"],
        ["Doble silencio en alzada (art. 24.1)", "Si se recurre en alzada una desestimación por silencio y tampoco se resuelve, el recurso se entiende estimado (salvo las materias de silencio negativo)"],
        ["Efectos del silencio (art. 24.2-3)", "El estimatorio es un verdadero acto; la resolución posterior solo puede confirmarlo. El desestimatorio solo permite recurrir; la resolución posterior no queda vinculada"],
        ["Certificado de silencio (art. 24.4)", "Lo expide de oficio el órgano competente en 15 días desde que expira el plazo máximo para resolver"],
        ["Falta de resolución en procedimientos de oficio (art. 25)", "Si podían reconocer derechos: desestimación; si son sancionadores o de gravamen: caducidad y archivo"],
      ],
      preguntas: [
        ["facil", "Si la norma reguladora de un procedimiento no fija el plazo máximo para resolver, este será de:", ["Tres meses", "Seis meses", "Un mes", "Dos meses"], "Art. 21.3 Ley 39/2015."],
        ["media", "El plazo máximo para resolver fijado por una norma reglamentaria no puede exceder de:", ["Seis meses, salvo que una ley o el Derecho de la UE establezcan uno mayor", "Tres meses en ningún caso", "Un año", "Dos años"], "Art. 21.2 Ley 39/2015."],
        ["media", "En un procedimiento iniciado a solicitud, ¿desde cuándo se cuenta el plazo para resolver?", ["Desde la entrada de la solicitud en el registro electrónico del órgano competente", "Desde que el instructor la lee", "Desde el día siguiente a su firma", "Desde la publicación en el BOA"], "Art. 21.3.b) Ley 39/2015."],
        ["media", "En un procedimiento de responsabilidad patrimonial iniciado a solicitud, el silencio es:", ["Desestimatorio", "Estimatorio", "Caducidad", "No hay silencio"], "Art. 24.1 Ley 39/2015."],
        ["dificil", "Un interesado recurre en alzada la desestimación por silencio de su solicitud de una licencia (materia sin silencio negativo legal) y el recurso tampoco se resuelve en plazo. El recurso se entiende:", ["Estimado", "Desestimado", "Caducado", "Inadmitido"], "Art. 24.1, tercer párrafo, Ley 39/2015."],
        ["media", "Producido un silencio estimatorio, la Administración solo puede dictar después una resolución expresa:", ["Confirmatoria del acto presunto", "Contraria al silencio", "De cualquier sentido", "Previo dictamen del Consejo Consultivo"], "Art. 24.3.a) Ley 39/2015."],
        ["media", "En un procedimiento sancionador iniciado de oficio, vencido el plazo sin resolver, se produce:", ["La caducidad", "La estimación por silencio", "La desestimación por silencio", "La prescripción automática de la infracción"], "Art. 25.1.b) Ley 39/2015."],
        ["dificil", "La suspensión del plazo para resolver por la petición de un informe preceptivo no puede exceder de:", ["Tres meses", "Un mes", "Diez días", "Seis meses"], "Art. 22.1.d) Ley 39/2015."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Obligatoriedad de plazos (art. 29 Ley 39/2015)", "Los términos y plazos obligan a las autoridades y al personal de la Administración y a los interesados"],
        ["Plazos por horas (art. 30.1)", "Son hábiles las horas de un día hábil; se cuentan de hora en hora y minuto en minuto; no pueden superar 24 horas (si no, se expresan en días)"],
        ["Plazos por días (art. 30.2)", "Salvo otra previsión legal o de la UE, son hábiles: se excluyen sábados, domingos y festivos; si son naturales, debe indicarse en la notificación"],
        ["Inicio del cómputo (art. 30.3-4)", "Desde el día siguiente a la notificación, publicación o producción del silencio"],
        ["Plazos por meses o años (art. 30.4)", "Terminan el mismo día del mes o año de vencimiento en que se notificó; si no existe ese día, el último del mes"],
        ["Último día inhábil (art. 30.5)", "El plazo se prorroga al primer día hábil siguiente"],
        ["Inhábil en uno de los dos lugares (art. 30.6)", "Si es hábil donde reside el interesado e inhábil en la sede del órgano, o al revés, se considera inhábil"],
        ["Calendario de días inhábiles (art. 30.7)", "Lo fijan la AGE y las CCAA (incluyendo los de las entidades locales de su territorio) y se publica antes de empezar cada año"],
        ["Registro electrónico (art. 31.2)", "Abierto 24 horas todos los días; lo presentado en día inhábil se entiende presentado en la primera hora del primer día hábil siguiente"],
        ["Ampliación de plazos (art. 32)", "Hasta la mitad del plazo, si no perjudica a terceros; debe pedirse y acordarse antes del vencimiento; no cabe recurso"],
        ["Tramitación de urgencia (art. 33)", "Por razones de interés público se reducen a la mitad los plazos, salvo los de presentación de solicitudes y recursos; no cabe recurso"],
      ],
      preguntas: [
        ["facil", "Salvo que una ley disponga otra cosa, los plazos señalados por días son:", ["Hábiles, excluidos sábados, domingos y festivos", "Naturales", "Hábiles, excluidos solo los domingos", "Hábiles, excluidos agosto y Semana Santa"], "Art. 30.2 Ley 39/2015."],
        ["media", "Una resolución se notifica el 31 de enero con un plazo de un mes para recurrir. El plazo vence:", ["El último día de febrero", "El 1 de marzo", "El 28 de febrero solo si el año no es bisiesto", "El 3 de marzo"], "Art. 30.4 Ley 39/2015: si no hay día equivalente, expira el último día del mes."],
        ["media", "Si el último día de un plazo es inhábil:", ["Se prorroga al primer día hábil siguiente", "Vence el día hábil anterior", "Se pierde el trámite", "Se amplía una semana"], "Art. 30.5 Ley 39/2015."],
        ["media", "Un documento presentado en el registro electrónico un domingo, a efectos de plazos en días hábiles, se entiende presentado:", ["En la primera hora del primer día hábil siguiente", "El domingo a la hora de presentación", "El viernes anterior", "Dos días después"], "Art. 31.2.b) Ley 39/2015."],
        ["media", "La ampliación de un plazo que conceda la Administración no puede exceder de:", ["La mitad del plazo inicial", "El doble del plazo", "Diez días", "Un mes"], "Art. 32.1 Ley 39/2015."],
        ["dificil", "¿Puede ampliarse un plazo ya vencido?", ["No, en ningún caso", "Sí, si el interesado lo justifica", "Sí, dentro de los tres días siguientes", "Sí, si lo acuerda el superior jerárquico"], "Art. 32.3 Ley 39/2015."],
        ["media", "Con la tramitación de urgencia, ¿qué plazos NO se reducen a la mitad?", ["Los de presentación de solicitudes y recursos", "Los de audiencia", "Los de emisión de informes", "Los de prueba"], "Art. 33.1 Ley 39/2015."],
        ["media", "Un plazo señalado por horas no puede tener una duración superior a:", ["Veinticuatro horas", "Cuarenta y ocho horas", "Doce horas", "Setenta y dos horas"], "Art. 30.1 Ley 39/2015."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Disposición administrativa", "Norma de carácter general (reglamento) dictada por una Administración; innova el ordenamiento y se aplica a una pluralidad indeterminada de casos"],
        ["Acto administrativo (concepto doctrinal)", "Declaración de voluntad, juicio, conocimiento o deseo realizada por la Administración en ejercicio de una potestad administrativa distinta de la reglamentaria"],
        ["Diferencia acto-reglamento", "El reglamento innova el ordenamiento y no se agota con su aplicación; el acto lo aplica y se agota en su cumplimiento, aunque tenga destinatarios plurales"],
        ["Elementos del acto (doctrina)", "Subjetivo (órgano competente), objetivo (contenido determinado y adecuado a los fines, presupuesto de hecho, causa y fin) y formal (procedimiento y forma)"],
        ["Producción y contenido (art. 34 Ley 39/2015)", "Los dicta el órgano competente ajustándose a los requisitos y al procedimiento; su contenido será determinado y adecuado a sus fines"],
        ["Forma (art. 36)", "Por escrito a través de medios electrónicos, salvo que su naturaleza exija otra forma; los actos verbales que lo requieran se documentan después"],
        ["Actos de la misma naturaleza (art. 36.3)", "Nombramientos, concesiones o licencias en serie pueden refundirse en un único acto que individualice a cada interesado"],
        ["Clases de actos (doctrina)", "Resolutorios y de trámite; favorables y de gravamen; reglados y discrecionales; expresos y presuntos; que ponen o no fin a la vía administrativa; firmes y no firmes"],
        ["Actos de trámite recurribles (art. 112.1)", "Los que deciden directa o indirectamente el fondo, impiden continuar el procedimiento, producen indefensión o perjuicio irreparable"],
        ["Acto firme", "El que ya no puede recurrirse por vías ordinarias porque han transcurrido los plazos o se han agotado los recursos"],
      ],
      preguntas: [
        ["media", "¿Qué diferencia esencial hay entre un reglamento y un acto administrativo con muchos destinatarios?", ["El reglamento innova el ordenamiento; el acto lo aplica y se agota con su cumplimiento", "El número de destinatarios", "El órgano que los dicta", "El boletín en que se publican"], "Doctrina; arts. 34 y 128 Ley 39/2015."],
        ["facil", "Según el art. 36 de la Ley 39/2015, los actos administrativos se producirán:", ["Por escrito a través de medios electrónicos, salvo que su naturaleza exija otra forma", "Siempre de forma verbal", "En papel con firma manuscrita", "Mediante publicación en el BOA"], "Art. 36.1 Ley 39/2015."],
        ["media", "Un acto dictado en ejercicio de una potestad que permite a la Administración elegir entre varias soluciones igualmente válidas es un acto:", ["Discrecional", "Reglado", "Presunto", "De trámite"], "Clasificación doctrinal; los discrecionales deben motivarse (art. 35.1.i)."],
        ["media", "La concesión de una subvención a un ciudadano es, para él, un acto:", ["Favorable o declarativo de derechos", "De gravamen", "De trámite", "Presunto"], "Clasificación doctrinal por sus efectos."],
        ["dificil", "¿Cuál de estos actos de trámite es recurrible de forma autónoma?", ["El que impide continuar el procedimiento", "El que acuerda pedir un informe facultativo", "La citación a una comparecencia", "El acuerdo de abrir el periodo de prueba"], "Art. 112.1 Ley 39/2015."],
        ["media", "Varios nombramientos de la misma naturaleza:", ["Pueden refundirse en un único acto que especifique a cada interesado", "Deben dictarse siempre por separado", "Requieren autorización del Gobierno", "Se dictan de forma verbal"], "Art. 36.3 Ley 39/2015."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Motivación (art. 35.1 Ley 39/2015)", "Sucinta referencia de hechos y fundamentos de derecho"],
        ["Actos que deben motivarse (art. 35.1)", "Los que limitan derechos; resuelven revisiones, recursos o arbitrajes; se apartan del criterio precedente o del dictamen consultivo; suspenden o adoptan medidas provisionales; urgencia, ampliación y actuaciones complementarias; rechazo de pruebas; terminación por imposibilidad; sancionadores y de responsabilidad patrimonial; discrecionales"],
        ["Selectivos y concurrencia competitiva (art. 35.2)", "Se motivan según sus convocatorias, quedando acreditados los fundamentos de la resolución"],
        ["Plazo para cursar la notificación (art. 40.2)", "10 días desde que se dicta el acto"],
        ["Contenido de la notificación (art. 40.2)", "Texto íntegro; si pone fin o no a la vía administrativa; recursos procedentes, órgano y plazo"],
        ["Notificación defectuosa (art. 40.3)", "Con texto íntegro pero sin los demás requisitos, surte efecto cuando el interesado actúa demostrando conocerla o interpone recurso"],
        ["Plazo máximo cumplido (art. 40.4)", "Basta la notificación con el texto íntegro y el intento debidamente acreditado (o la puesta a disposición electrónica)"],
        ["Notificación en papel en el domicilio (art. 42.2)", "Puede recogerla cualquier persona mayor de 14 años que se identifique; si nadie la recoge, se repite una sola vez a hora distinta dentro de los 3 días siguientes"],
        ["Notificación electrónica (art. 43)", "Por comparecencia en la sede o en la dirección electrónica habilitada única; se practica al acceder al contenido"],
        ["Rechazo de la notificación electrónica (art. 43.2)", "Si es obligatoria o elegida, se entiende rechazada a los 10 días naturales de su puesta a disposición sin acceder"],
        ["Notificación infructuosa (art. 44)", "Interesado desconocido, lugar ignorado o intento fallido: anuncio en el BOE (facultativamente, antes, en otros boletines o tablones)"],
        ["Publicación en lugar de notificación (art. 45.1)", "Actos dirigidos a una pluralidad indeterminada de personas y actos de procedimientos selectivos o de concurrencia competitiva (en el medio que indique la convocatoria)"],
        ["Varias notificaciones por distintos cauces (art. 41.7)", "Se toma como fecha la de la que se produjo en primer lugar"],
      ],
      preguntas: [
        ["media", "La notificación de un acto debe cursarse en el plazo de:", ["Diez días desde que se dictó", "Quince días desde su firma", "Un mes", "Tres días"], "Art. 40.2 Ley 39/2015."],
        ["media", "¿Cuál de estos actos NO está entre los que el art. 35 exige motivar?", ["Un acto de trámite de mero impulso", "El que rechaza pruebas propuestas por los interesados", "El que se separa del dictamen de un órgano consultivo", "El que resuelve un recurso administrativo"], "Art. 35.1 Ley 39/2015."],
        ["media", "Una notificación electrónica obligatoria se entiende rechazada si no se accede a su contenido en:", ["Diez días naturales desde su puesta a disposición", "Diez días hábiles", "Quince días naturales", "Un mes"], "Art. 43.2 Ley 39/2015."],
        ["media", "Si en el domicilio no está el interesado, la notificación en papel puede recogerla:", ["Cualquier persona mayor de catorce años que se encuentre allí y se identifique", "Solo un familiar mayor de edad", "Solo el propio interesado", "Un vecino del inmueble"], "Art. 42.2 Ley 39/2015."],
        ["media", "Si se ignora el lugar de notificación de un interesado, la notificación se hace mediante anuncio en:", ["El Boletín Oficial del Estado", "Solo el Boletín Oficial de Aragón", "El tablón del departamento", "Un periódico de difusión regional"], "Art. 44 Ley 39/2015."],
        ["dificil", "Una notificación con el texto íntegro pero sin indicar los recursos procedentes:", ["Surte efecto desde que el interesado actúe mostrando conocerla o interponga el recurso procedente", "Es nula de pleno derecho", "Nunca produce efectos", "Surte efecto a los tres meses"], "Art. 40.3 Ley 39/2015."],
        ["media", "Los actos de un procedimiento selectivo se notifican normalmente mediante:", ["Publicación en el medio indicado en la convocatoria", "Notificación individual en papel", "Llamada telefónica", "Correo electrónico ordinario"], "Art. 45.1.b) Ley 39/2015."],
        ["media", "Si el interesado ha recibido la misma notificación por correo postal y en la sede electrónica, se toma como fecha:", ["La de la que se produjo en primer lugar", "La última", "La postal siempre", "La electrónica siempre"], "Art. 41.7 Ley 39/2015."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["Presunción de validez y efectos (art. 39.1 Ley 39/2015)", "Los actos se presumen válidos y producen efectos desde que se dictan, salvo que en ellos se disponga otra cosa"],
        ["Eficacia demorada (art. 39.2)", "Cuando lo exija su contenido o esté supeditada a notificación, publicación o aprobación superior"],
        ["Retroactividad (art. 39.3)", "Excepcional: actos que sustituyen a otros anulados o con efectos favorables, si los supuestos de hecho ya existían y no se lesionan derechos de terceros"],
        ["Ejecutividad (art. 38)", "Los actos sujetos al Derecho Administrativo son ejecutivos con arreglo a la ley"],
        ["Nulidad de pleno derecho (art. 47.1)", "Lesionan derechos susceptibles de amparo; órgano manifiestamente incompetente por materia o territorio; contenido imposible; constitutivos de infracción penal; prescindiendo total y absolutamente del procedimiento; adquisición de facultades sin requisitos esenciales; los que diga una ley"],
        ["Anulabilidad (art. 48.1)", "Cualquier otra infracción del ordenamiento jurídico, incluida la desviación de poder"],
        ["Defecto de forma (art. 48.2)", "Solo anula si el acto carece de requisitos formales indispensables para su fin o causa indefensión"],
        ["Actuación fuera de plazo (art. 48.3)", "Solo anula cuando así lo imponga la naturaleza del término o plazo"],
        ["Límites a la extensión (art. 49)", "La invalidez de un acto no afecta a los sucesivos independientes, ni la de una parte a las partes independientes (salvo que sin ella no se hubiera dictado)"],
        ["Conversión (art. 50)", "El acto nulo o anulable que contenga los elementos de otro distinto produce los efectos de este"],
        ["Conservación (art. 51)", "Se conservan los actos y trámites cuyo contenido se habría mantenido igual sin la infracción"],
        ["Convalidación (art. 52)", "Solo de actos anulables, subsanando sus vicios; efectos desde su fecha; la incompetencia no determinante de nulidad la convalida el superior jerárquico competente"],
      ],
      preguntas: [
        ["media", "Un acto dictado por un órgano manifiestamente incompetente por razón de la materia es:", ["Nulo de pleno derecho", "Anulable", "Válido pero irregular", "Convalidable por el inferior"], "Art. 47.1.b) Ley 39/2015."],
        ["media", "La desviación de poder determina que el acto sea:", ["Anulable", "Nulo de pleno derecho", "Inexistente", "Válido"], "Art. 48.1 Ley 39/2015."],
        ["dificil", "Un defecto de forma determina la anulabilidad del acto:", ["Solo si carece de requisitos formales indispensables para alcanzar su fin o da lugar a indefensión", "Siempre", "Nunca", "Solo si lo aprecia un juez"], "Art. 48.2 Ley 39/2015."],
        ["media", "¿Qué actos pueden convalidarse?", ["Los anulables", "Los nulos de pleno derecho", "Los inexistentes", "Todos, sin distinción"], "Art. 52.1 Ley 39/2015."],
        ["media", "Los actos administrativos producen efectos, como regla general:", ["Desde la fecha en que se dictan, salvo que en ellos se disponga otra cosa", "Desde su publicación en el BOE", "Un mes después de dictarse", "Desde que son firmes"], "Art. 39.1 Ley 39/2015."],
        ["dificil", "Excepcionalmente puede darse eficacia retroactiva a un acto cuando:", ["Produce efectos favorables al interesado, existían ya los supuestos de hecho y no lesiona derechos de terceros", "Lo pide cualquier interesado", "Es un acto sancionador", "Lo decide el instructor"], "Art. 39.3 Ley 39/2015."],
        ["media", "Un acto nulo que contiene los elementos constitutivos de otro distinto:", ["Produce los efectos de este otro (conversión)", "No produce ningún efecto", "Se convalida automáticamente", "Debe declararse inexistente"], "Art. 50 Ley 39/2015."],
        ["media", "Realizar una actuación fuera del plazo establecido implica la anulabilidad del acto:", ["Solo cuando lo imponga la naturaleza del término o plazo", "Siempre", "Nunca", "Si el retraso es superior a un mes"], "Art. 48.3 Ley 39/2015."],
      ],
    },
    {
      seccion: S6,
      flashcards: [
        ["Título previo (art. 97 Ley 39/2015)", "No se inicia ninguna actuación material de ejecución que limite derechos sin la resolución que le sirva de fundamento, que debe notificarse"],
        ["Ejecutoriedad (art. 98.1)", "Los actos son inmediatamente ejecutivos salvo suspensión, sanciones recurribles en vía administrativa (incluida la reposición), disposición en contrario o necesidad de aprobación superior"],
        ["Pago electrónico (art. 98.2)", "Las sanciones y deudas con la Hacienda se pagan preferentemente por tarjeta, transferencia, domiciliación u otros medios autorizados"],
        ["Ejecución forzosa (art. 99)", "Previo apercibimiento, salvo suspensión o cuando la Constitución o la ley exijan intervención judicial"],
        ["Medios de ejecución forzosa (art. 100)", "Apremio sobre el patrimonio, ejecución subsidiaria, multa coercitiva y compulsión sobre las personas; con proporcionalidad y eligiendo el menos restrictivo de la libertad"],
        ["Entrada en domicilio (art. 100.3)", "Requiere el consentimiento del titular o, en su defecto, autorización judicial"],
        ["Apremio sobre el patrimonio (art. 101)", "Para cantidades líquidas, por el procedimiento de apremio; ninguna obligación pecuniaria sin norma de rango legal"],
        ["Ejecución subsidiaria (art. 102)", "Para actos no personalísimos: la Administración los realiza por sí o por terceros a costa del obligado (liquidación provisional posible antes)"],
        ["Multa coercitiva (art. 103)", "Si lo autoriza una ley, reiterada por lapsos suficientes; independiente y compatible con las sanciones"],
        ["Compulsión sobre las personas (art. 104)", "Para obligaciones personalísimas de no hacer o soportar, si una ley lo autoriza y con respeto a la dignidad"],
        ["Prohibición de acciones posesorias (art. 105)", "No se admiten interdictos contra actuaciones administrativas realizadas en materia de su competencia y con el procedimiento legal"],
      ],
      preguntas: [
        ["media", "¿Cuál de estos NO es un medio de ejecución forzosa de los actos administrativos?", ["La prisión preventiva", "El apremio sobre el patrimonio", "La ejecución subsidiaria", "La multa coercitiva"], "Art. 100.1 Ley 39/2015."],
        ["media", "La ejecución subsidiaria procede cuando:", ["El acto no es personalísimo y puede realizarlo una persona distinta del obligado, a su costa", "El obligado debe pagar una cantidad líquida", "El acto es personalísimo de no hacer", "Lo pide un tercero"], "Art. 102 Ley 39/2015."],
        ["media", "La multa coercitiva:", ["Requiere autorización legal y es compatible con las sanciones", "Es una sanción por la infracción cometida", "Sustituye a la sanción", "Solo puede imponerse una vez"], "Art. 103 Ley 39/2015."],
        ["dificil", "Una sanción contra la que cabe recurso potestativo de reposición:", ["No es inmediatamente ejecutiva mientras quepa recurso en vía administrativa", "Es inmediatamente ejecutiva", "Solo es ejecutiva tras sentencia firme", "Se ejecuta por compulsión"], "Art. 98.1.b) Ley 39/2015."],
        ["media", "Si para ejecutar un acto hay que entrar en el domicilio del afectado y este se opone, la Administración necesita:", ["Autorización judicial", "Una orden del consejero", "La presencia de la policía local", "Un acuerdo del Gobierno"], "Art. 100.3 Ley 39/2015."],
        ["media", "Si son admisibles varios medios de ejecución, se elegirá:", ["El menos restrictivo de la libertad individual", "El más rápido", "El más barato para la Administración", "El que elija el obligado"], "Art. 100.2 Ley 39/2015."],
        ["facil", "Antes de proceder a la ejecución forzosa, la Administración debe:", ["Apercibir al obligado", "Pedir autorización judicial en todo caso", "Publicar un anuncio en el BOE", "Imponer una sanción"], "Art. 99 Ley 39/2015."],
      ],
    },
  ],
  glosario: [
    [S1, "Silencio administrativo", "Efecto que la ley atribuye a la falta de resolución expresa en plazo: estimar o desestimar la solicitud para que el interesado no quede indefenso."],
    [S1, "Caducidad del procedimiento", "Terminación del procedimiento por el transcurso del plazo máximo (en los de oficio de gravamen) o por la paralización imputable al interesado."],
    [S2, "Día inhábil", "Día que no se computa en los plazos por días: sábados, domingos y festivos del calendario oficial."],
    [S3, "Acto de trámite", "Acto que prepara la resolución final sin decidir el fondo del asunto; solo es recurrible de forma autónoma en los casos del art. 112.1."],
    [S3, "Acto reglado", "Aquel cuyo contenido está totalmente predeterminado por la norma, sin margen de elección para la Administración."],
    [S3, "Acto firme", "Acto que ya no admite recurso ordinario por haber transcurrido los plazos o haberse agotado las vías de impugnación."],
    [S4, "Motivación", "Explicación sucinta de los hechos y fundamentos de derecho que justifican la decisión administrativa."],
    [S4, "Dirección electrónica habilitada única", "Buzón electrónico en el que las Administraciones ponen a disposición de los interesados sus notificaciones electrónicas."],
    [S5, "Desviación de poder", "Uso de una potestad administrativa para un fin distinto del previsto por el ordenamiento; causa de anulabilidad."],
    [S5, "Convalidación", "Subsanación por la Administración de los vicios de un acto anulable para que sea plenamente válido."],
    [S6, "Apremio", "Procedimiento para cobrar forzosamente sobre el patrimonio del deudor una cantidad líquida debida a la Administración."],
    [S6, "Ejecución subsidiaria", "Realización por la Administración, o por quien ella designe, de lo que el obligado no hace, cargándole el coste."],
  ],
  casos: [
    {
      slug: "solicitud-sin-respuesta-silencio",
      titulo: "Una solicitud que no recibe respuesta",
      supuesto: "Una vecina de Teruel solicitó el 10 de marzo una autorización al Gobierno de Aragón. La norma del procedimiento no fija plazo para resolver ni el sentido del silencio. Durante la tramitación, el órgano pidió un informe preceptivo a otro departamento y se lo comunicó. Llegado el verano sigue sin respuesta y la vecina quiere saber qué puede hacer.",
      preguntas: [
        [S1, "facil", "Como la norma no fija plazo para resolver, el plazo máximo es de:", ["Tres meses", "Seis meses", "Un mes", "Un año"], "Art. 21.3 Ley 39/2015."],
        [S1, "media", "Ese plazo se cuenta desde:", ["La entrada de la solicitud en el registro electrónico del órgano competente", "La firma de la solicitud", "El día en que el instructor la recibió en su mesa", "La publicación de la convocatoria"], "Art. 21.3.b) Ley 39/2015."],
        [S1, "media", "La petición del informe preceptivo, comunicada a la vecina:", ["Suspendió el plazo para resolver hasta recibir el informe, como máximo tres meses", "No afectó al plazo", "Duplicó el plazo", "Puso fin al procedimiento"], "Art. 22.1.d) Ley 39/2015."],
        [S1, "media", "Si vence el plazo sin resolución y ninguna ley establece silencio negativo, la solicitud se entiende:", ["Estimada", "Desestimada", "Caducada", "Archivada"], "Art. 24.1 Ley 39/2015."],
        [S1, "media", "Ese acto estimatorio presunto:", ["Es un verdadero acto que pone fin al procedimiento y puede hacerse valer ante cualquiera", "Solo permite recurrir", "No produce efectos hasta que se publique", "Debe ratificarlo el Gobierno"], "Art. 24.2 y 4 Ley 39/2015."],
        [S1, "dificil", "Si después la Administración dicta resolución expresa, solo podrá ser:", ["Confirmatoria de la estimación", "Desestimatoria", "De cualquier sentido", "Una inadmisión"], "Art. 24.3.a) Ley 39/2015."],
        [S1, "media", "Para acreditar el silencio, el órgano competente debe expedir de oficio un certificado en el plazo de:", ["Quince días desde que expira el plazo para resolver", "Un mes", "Diez días hábiles desde que lo pida", "Tres meses"], "Art. 24.4 Ley 39/2015."],
        [S2, "media", "Si el último día del plazo para resolver cayera en domingo:", ["Se prorrogaría al primer día hábil siguiente", "Vencería el viernes anterior", "Vencería ese domingo", "Se ampliaría una semana"], "Art. 30.5 Ley 39/2015."],
        [S1, "media", "Si en vez de una autorización hubiera pedido una indemnización por responsabilidad patrimonial, el silencio sería:", ["Desestimatorio", "Estimatorio", "De caducidad", "Positivo con condiciones"], "Art. 24.1 Ley 39/2015."],
        [S1, "media", "El personal que tiene a su cargo el despacho del asunto y no resuelve en plazo puede incurrir en:", ["Responsabilidad disciplinaria", "Responsabilidad penal en todo caso", "Ninguna responsabilidad", "Pérdida automática del puesto"], "Art. 21.6 Ley 39/2015."],
      ],
    },
    {
      slug: "notificacion-electronica-empresa",
      titulo: "La notificación que nadie abrió",
      supuesto: "El Gobierno de Aragón dicta el 2 de mayo una resolución desfavorable para una empresa, obligada a relacionarse electrónicamente. La pone a disposición en la sede electrónica el 5 de mayo y envía un aviso al correo de la empresa. Nadie accede. A la vez, a un particular afectado por la misma resolución se le intenta notificar en papel en su domicilio, donde no hay nadie.",
      preguntas: [
        [S4, "media", "La notificación debía cursarse en el plazo de:", ["Diez días desde que se dictó la resolución", "Un mes", "Quince días hábiles", "Tres días"], "Art. 40.2 Ley 39/2015."],
        [S4, "media", "La notificación debe incluir, además del texto íntegro:", ["Si pone fin o no a la vía administrativa y los recursos, órgano y plazo", "Solo la firma", "El expediente completo", "El nombre de todos los afectados"], "Art. 40.2 Ley 39/2015."],
        [S4, "dificil", "Si la empresa no accede, la notificación se entenderá rechazada:", ["Transcurridos diez días naturales desde la puesta a disposición, el 5 de mayo", "A los diez días hábiles desde el 2 de mayo", "Nunca, sin acceso no hay notificación", "Al mes"], "Art. 43.2 Ley 39/2015."],
        [S4, "media", "El aviso al correo electrónico de la empresa:", ["Es informativo; su falta no impide que la notificación sea válida", "Es la notificación en sí", "Sustituye a la sede electrónica", "Debe enviarse por burofax"], "Art. 41.1 y 6 Ley 39/2015."],
        [S4, "media", "Rechazada la notificación electrónica:", ["Se hace constar en el expediente, se da por efectuado el trámite y sigue el procedimiento", "Hay que repetirla en papel", "Se archiva el procedimiento", "Se anula la resolución"], "Art. 41.5 Ley 39/2015."],
        [S4, "media", "En el domicilio del particular, si no hay nadie, el intento se repetirá:", ["Una sola vez, a hora distinta, dentro de los tres días siguientes", "Tres veces en una semana", "Al mes siguiente", "Ninguna vez más"], "Art. 42.2 Ley 39/2015."],
        [S4, "media", "Si el segundo intento también fracasa, la notificación se hará por:", ["Anuncio en el Boletín Oficial del Estado", "Llamada telefónica", "Correo ordinario sin acuse", "Publicación en un periódico"], "Art. 44 Ley 39/2015."],
        [S4, "media", "A efectos de cumplir el plazo máximo de duración del procedimiento, basta:", ["El texto íntegro de la resolución y el intento de notificación debidamente acreditado", "La firma de la resolución", "El registro de salida", "La publicación en el portal web"], "Art. 40.4 Ley 39/2015."],
        [S3, "media", "La resolución, que limita derechos de la empresa, debe estar:", ["Motivada, con sucinta referencia de hechos y fundamentos de derecho", "Sin motivar, porque es un acto reglado", "Motivada solo si la empresa lo pide", "Motivada por el Consejo Consultivo"], "Art. 35.1.a) Ley 39/2015."],
        [S2, "dificil", "Notificada (o rechazada) la resolución, el plazo de un mes para recurrir empieza a contar:", ["Desde el día siguiente a la notificación o rechazo", "El mismo día de la puesta a disposición", "Desde que la empresa lo decida", "Desde el 2 de mayo"], "Art. 30.4 Ley 39/2015."],
      ],
    },
    {
      slug: "orden-retirada-ejecucion-subsidiaria",
      titulo: "La orden de retirar un vallado",
      supuesto: "Un particular instala un vallado en un terreno de dominio público autonómico. El departamento le ordena retirarlo, pero el acto lo firma por error un jefe de sección sin competencia, aunque dentro del mismo departamento. Detectado el fallo, el director general competente lo corrige. El particular sigue sin retirar el vallado.",
      preguntas: [
        [S5, "media", "El acto firmado por el jefe de sección incompetente, que no es manifiestamente incompetente por materia ni territorio, es:", ["Anulable", "Nulo de pleno derecho", "Válido", "Inexistente"], "Arts. 47.1.b) y 48.1 Ley 39/2015."],
        [S5, "media", "El director general, superior jerárquico competente, puede:", ["Convalidar el acto subsanando el vicio de incompetencia", "Solo anularlo y empezar de cero", "Nada, el vicio es insubsanable", "Pedir autorización judicial"], "Art. 52.3 Ley 39/2015."],
        [S5, "media", "El acto de convalidación produce efectos:", ["Desde su fecha, salvo los supuestos de retroactividad del art. 39.3", "Desde la fecha del acto viciado", "Desde su publicación en el BOE", "Desde que el particular lo acepte"], "Art. 52.2 Ley 39/2015."],
        [S6, "media", "Antes de ejecutar materialmente la retirada, la Administración debe:", ["Contar con la resolución que le sirve de fundamento, notificarla y apercibir al obligado", "Pedir permiso al juez en todo caso", "Esperar a que el acto sea firme", "Imponer una sanción"], "Arts. 97 y 99 Ley 39/2015."],
        [S6, "media", "Como retirar un vallado no es una obligación personalísima, el medio adecuado es:", ["La ejecución subsidiaria a costa del obligado", "La compulsión sobre la persona", "La prisión", "El apremio sobre el patrimonio exclusivamente"], "Art. 102 Ley 39/2015."],
        [S6, "media", "El coste de la retirada:", ["Puede liquidarse provisionalmente antes de la ejecución y exigirse por la vía de apremio", "Lo asume siempre la Administración", "Se cobra por sentencia civil", "Lo paga el ayuntamiento"], "Arts. 101-102 Ley 39/2015."],
        [S6, "dificil", "Si una ley lo autoriza, la Administración podría imponer multas coercitivas reiteradas. Estas multas:", ["Son compatibles con la sanción que proceda por la ocupación", "Sustituyen a la sanción", "Son una sanción más", "Prohíben la ejecución subsidiaria posterior"], "Art. 103.2 Ley 39/2015."],
        [S6, "media", "El particular presenta una acción posesoria (interdicto) ante el juez civil contra la retirada. Según la Ley 39/2015:", ["No se admitirá a trámite si la actuación es de la competencia del órgano y sigue el procedimiento legal", "Paraliza automáticamente la ejecución", "Debe resolverla la Administración", "Obliga a indemnizarle"], "Art. 105 Ley 39/2015."],
        [S5, "media", "El acto se presume válido y produce efectos:", ["Desde la fecha en que se dicta, salvo que disponga otra cosa", "Solo desde que es firme", "Desde que lo acepta el particular", "Desde que se ejecuta"], "Art. 39.1 Ley 39/2015."],
        [S4, "media", "La orden de retirada, por limitar derechos del particular, debe:", ["Estar motivada", "Ser verbal", "Publicarse solo en el BOE", "No requiere motivación"], "Art. 35.1.a) Ley 39/2015."],
      ],
    },
  ],
});
