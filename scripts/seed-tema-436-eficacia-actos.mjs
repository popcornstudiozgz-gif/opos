/**
 * Crea tema-436 — Tema 14 de Administrativa/o (Ayto. Zaragoza, promoción
 * interna, CONV 5.2bis/2025): "Ley del Procedimiento Administrativo Común de
 * las Administraciones Públicas (VI): eficacia de los actos."
 *
 * Fuente: Ley 39/2015 (BOE-A-2015-10565), Título III, Capítulo II, arts. 37 a
 * 46, texto consolidado leído íntegro (content-raw/ley-39-2015-
 * procedimiento-administrativo; consolidado del BOE actualizado a
 * 06-11-2024, sin cambios posteriores).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-436-eficacia-actos.mjs
 */
import { sembrarTema, ADMIN_AYTO } from "./lib/sembrar-tema.mjs";

const L = ADMIN_AYTO.ley39;
const S1 = "inderogabilidad-ejecutividad-efectos";
const S2 = "notificacion-actos";
const S3 = "publicacion-actos";

await sembrarTema({
  tema: {
    slug: "tema-436",
    titulo: "Eficacia de los actos administrativos",
    descripcion: "Ley 39/2015, Título III, Capítulo II (arts. 37 a 46): inderogabilidad singular de los reglamentos; ejecutividad; presunción de validez, efectos desde que se dictan, eficacia demorada y retroactiva; notificación (plazo de diez días, contenido, notificaciones defectuosas, condiciones generales, práctica en papel y por medios electrónicos, rechazo a los diez días naturales, notificación infructuosa en el BOE); publicación y sus supuestos obligatorios; indicación somera del contenido.",
    contenido: "Cuándo produce efectos un acto administrativo: se presume válido y es eficaz desde que se dicta, salvo que se demore por exigirlo su contenido o por depender de su notificación, publicación o aprobación superior; la retroactividad es excepcional. La notificación debe cursarse en diez días con el texto íntegro y los recursos; en papel hay dos intentos en tres días (antes y después de las 15 horas) y, si fallan, anuncio en el BOE; la electrónica se entiende practicada al acceder y rechazada a los diez días naturales sin acceso. La publicación sustituye a la notificación en los actos dirigidos a muchas personas y en los procesos selectivos.",
    enlaces_boe: [{ url: L, titulo: "Ley 39/2015, de 1 de octubre, del Procedimiento Administrativo Común de las Administraciones Públicas (BOE-A-2015-10565)" }],
    indice_estudio: [
      { seccion: S1, titulo: "Inderogabilidad singular, ejecutividad y efectos", articulos: "arts. 37 a 39", url: `${L}#a37` },
      { seccion: S2, titulo: "La notificación", articulos: "arts. 40 a 44", url: `${L}#a40` },
      { seccion: S3, titulo: "La publicación", articulos: "arts. 45 y 46", url: `${L}#a45` },
    ],
  },
  vinculo: { oposicion: ADMIN_AYTO.oposicion, bloqueId: ADMIN_AYTO.bloqueParte2, numero: 14 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Inderogabilidad singular (art. 37.1)", "Las resoluciones de carácter particular no pueden vulnerar una disposición general, aunque procedan de un órgano de igual o superior jerarquía al que la dictó"],
        ["Consecuencia de vulnerar un reglamento (art. 37.2)", "Son nulas las resoluciones que vulneren una disposición reglamentaria, igual que las que incurran en causas del art. 47"],
        ["Ejecutividad (art. 38)", "Los actos de las Administraciones sujetos al Derecho Administrativo son ejecutivos con arreglo a la Ley 39/2015"],
        ["Presunción de validez y efectos (art. 39.1)", "Los actos se presumen válidos y producen efectos desde la fecha en que se dicten, salvo que dispongan otra cosa"],
        ["Eficacia demorada (art. 39.2)", "Cuando lo exija el contenido del acto o esté supeditada a su notificación, publicación o aprobación superior"],
        ["Eficacia retroactiva (art. 39.3)", "Excepcional: actos dictados en sustitución de actos anulados y actos favorables al interesado, si los supuestos de hecho ya existían y no se lesionan derechos de terceros"],
        ["Vinculación entre órganos (art. 39.4)", "Las normas y actos dictados por un órgano en ejercicio de su competencia deben ser observados por los demás, aunque no dependan jerárquicamente o sean de otra Administración"],
        ["Acto de otra Administración que se considera ilegal (art. 39.5)", "Puede requerírsele que lo anule o revise (art. 44 LJCA) y, si lo rechaza, interponer recurso contencioso; el procedimiento propio queda suspendido"],
      ],
      preguntas: [
        ["facil", "Los actos de las Administraciones Públicas sujetos al Derecho Administrativo producen efectos, salvo que en ellos se disponga otra cosa:", ["Desde la fecha en que se dicten", "Desde su publicación en el BOE", "Desde que adquieren firmeza"], "Art. 39.1 Ley 39/2015."],
        ["media", "Una resolución particular del alcalde que vulnere una ordenanza aprobada por el Pleno es:", ["Nula", "Válida, porque el alcalde es el superior jerárquico", "Anulable solo si se recurre en plazo"], "Art. 37 Ley 39/2015: inderogabilidad singular."],
        ["media", "La eficacia retroactiva de los actos administrativos es posible:", ["Excepcionalmente, en actos que sustituyan a otros anulados o en actos favorables que no lesionen derechos de terceros", "Siempre que lo decida el órgano competente", "Solo en las sanciones"], "Art. 39.3 Ley 39/2015."],
        ["media", "La eficacia de un acto queda demorada cuando:", ["Así lo exija su contenido o esté supeditada a su notificación, publicación o aprobación superior", "El interesado lo solicite", "Lo pida cualquier tercero"], "Art. 39.2 Ley 39/2015."],
        ["dificil", "Si una Administración debe dictar un acto basado en otro de distinta Administración que considera ilegal, puede:", ["Requerirla para que lo anule o revise y, si lo rechaza, interponer recurso contencioso-administrativo", "Inaplicarlo sin más", "Anularlo directamente por revisión de oficio"], "Art. 39.5 Ley 39/2015."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Plazo para cursar la notificación (art. 40.2)", "Diez días a partir de la fecha en que se dictó el acto"],
        ["Contenido de la notificación (art. 40.2)", "Texto íntegro de la resolución, si pone o no fin a la vía administrativa, recursos que procedan, órgano ante el que presentarlos y plazo"],
        ["Notificación defectuosa con texto íntegro (art. 40.3)", "Surte efecto desde que el interesado realiza actuaciones que suponen conocer su contenido o interpone el recurso procedente"],
        ["Notificación dentro del plazo máximo del procedimiento (art. 40.4)", "Basta la que contenga al menos el texto íntegro de la resolución y el intento de notificación debidamente acreditado"],
        ["Medio preferente de notificación (art. 41.1)", "Electrónico, y en todo caso cuando el interesado esté obligado a recibirla así"],
        ["Notificaciones nunca electrónicas (art. 41.2)", "Las que acompañan elementos no convertibles a formato electrónico y las que contienen medios de pago (cheques)"],
        ["Rechazo de la notificación (art. 41.5)", "Se hace constar en el expediente, se da por efectuado el trámite y sigue el procedimiento"],
        ["Aviso de puesta a disposición (art. 41.6)", "Se envía al dispositivo o correo comunicado; su falta no impide que la notificación sea válida"],
        ["Notificación por varios cauces (art. 41.7)", "Cuenta la fecha de la que se produjo en primer lugar"],
        ["Notificación en papel en el domicilio (art. 42.2)", "Puede recogerla cualquier mayor de 14 años que se identifique; si nadie la recoge, segundo intento una sola vez en los tres días siguientes, a hora distinta (antes/después de las 15 h, con al menos 3 horas de diferencia)"],
        ["Momento de la notificación electrónica (art. 43.2)", "Cuando se accede a su contenido; si es obligatoria o elegida, se entiende rechazada a los diez días naturales sin acceso"],
        ["Notificación infructuosa (art. 44)", "Interesados desconocidos, lugar ignorado o intento fallido: anuncio en el BOE (además, facultativamente, en otros boletines o tablones)"],
      ],
      preguntas: [
        ["facil", "Toda notificación deberá ser cursada dentro del plazo de:", ["Diez días a partir de la fecha en que el acto haya sido dictado", "Quince días desde la firma", "Un mes desde que el acto sea firme"], "Art. 40.2 Ley 39/2015."],
        ["media", "Una notificación electrónica obligatoria se entiende rechazada cuando hayan transcurrido sin acceder a su contenido:", ["Diez días naturales desde su puesta a disposición", "Diez días hábiles desde su puesta a disposición", "Quince días naturales desde su envío"], "Art. 43.2 Ley 39/2015."],
        ["media", "En la notificación en papel en el domicilio, si el primer intento se hizo a las 11:00, el segundo debe hacerse:", ["Después de las 15:00 horas y dentro de los tres días siguientes", "Antes de las 15:00 horas del día siguiente", "En cualquier hora dentro de los cinco días siguientes"], "Art. 42.2 Ley 39/2015."],
        ["media", "Puede hacerse cargo de una notificación en papel en ausencia del interesado:", ["Cualquier persona mayor de catorce años que se encuentre en el domicilio y haga constar su identidad", "Solo un familiar mayor de edad", "Cualquier vecino del inmueble"], "Art. 42.2 Ley 39/2015."],
        ["media", "Si, intentada la notificación, no se hubiese podido practicar, se hará mediante anuncio en:", ["El Boletín Oficial del Estado", "Solo el tablón de edictos del Ayuntamiento", "El boletín oficial de la provincia, exclusivamente"], "Art. 44 Ley 39/2015."],
        ["dificil", "Una notificación que contiene el texto íntegro pero omite la indicación de los recursos procedentes:", ["Surte efecto desde que el interesado realiza actuaciones que suponen el conocimiento del acto o interpone el recurso procedente", "Es nula de pleno derecho", "No produce efecto alguno nunca"], "Art. 40.3 Ley 39/2015."],
        ["media", "En ningún caso se efectuarán por medios electrónicos las notificaciones:", ["Que contengan medios de pago a favor de los obligados, como cheques", "Dirigidas a personas jurídicas", "De actos desfavorables"], "Art. 41.2.b) Ley 39/2015."],
        ["media", "Si el interesado es notificado por distintos cauces, se toma como fecha de notificación:", ["La de la que se hubiera producido en primer lugar", "La de la última", "La de la notificación en papel"], "Art. 41.7 Ley 39/2015."],
        ["dificil", "La falta de envío del aviso de puesta a disposición al correo electrónico del interesado:", ["No impide que la notificación sea considerada plenamente válida", "Hace nula la notificación", "Amplía el plazo de acceso en diez días"], "Art. 41.6 Ley 39/2015."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["¿Cuándo se publican los actos (art. 45.1)?", "Cuando lo establezcan las normas del procedimiento o lo aconsejen razones de interés público apreciadas por el órgano competente"],
        ["Publicación que surte efectos de notificación (art. 45.1)", "a) actos con destinatario una pluralidad indeterminada de personas (o notificación individual insuficiente); b) actos de procedimientos selectivos o de concurrencia competitiva"],
        ["Medio de publicación en procesos selectivos (art. 45.1.b)", "La convocatoria debe indicarlo; las publicaciones en lugares distintos carecen de validez"],
        ["Contenido de la publicación (art. 45.2)", "Los mismos elementos que exige el art. 40.2 para las notificaciones; los aspectos comunes de varios actos pueden publicarse conjuntamente"],
        ["Dónde se publica (art. 45.3 y 4)", "En el diario oficial que corresponda a la Administración; la publicación en tablón exigida por norma se entiende cumplida con la del diario oficial"],
        ["Indicación somera (art. 46)", "Si la publicación íntegra lesiona derechos o intereses legítimos, se publica solo una somera indicación del contenido y el lugar donde comparecer para conocerlo"],
      ],
      preguntas: [
        ["facil", "Los actos integrantes de un procedimiento selectivo:", ["Son objeto de publicación, que surte los efectos de la notificación", "Se notifican siempre individualmente", "No se publican ni se notifican"], "Art. 45.1.b) Ley 39/2015."],
        ["media", "En un proceso selectivo, las publicaciones efectuadas en un medio distinto del indicado en la convocatoria:", ["Carecen de validez", "Son válidas si se publican también en el BOE", "Son anulables a instancia de parte"], "Art. 45.1.b) Ley 39/2015."],
        ["media", "Cuando la publicación de un acto lesione derechos o intereses legítimos, el órgano:", ["Publicará una somera indicación del contenido y del lugar donde comparecer para conocerlo íntegro", "No publicará nada", "Lo notificará solo por teléfono"], "Art. 46 Ley 39/2015."],
        ["media", "La publicación de un acto debe contener:", ["Los mismos elementos que el art. 40.2 exige para las notificaciones", "Solo un extracto del acto", "Solo el nombre del interesado"], "Art. 45.2 Ley 39/2015."],
        ["dificil", "La publicación en tablón de anuncios exigida por una norma se entiende cumplida, sin perjuicio del art. 44, con:", ["Su publicación en el diario oficial correspondiente", "Su envío por correo postal", "Su exposición en la página web municipal"], "Art. 45.4 Ley 39/2015."],
      ],
    },
  ],
  glosario: [
    [S1, "Inderogabilidad singular", "Principio por el que una resolución particular no puede apartarse de lo dispuesto en un reglamento, aunque la dicte un órgano de igual o superior jerarquía (art. 37)."],
    [S1, "Ejecutividad", "Cualidad de los actos administrativos de producir efectos y poder cumplirse desde que se dictan, sin necesidad de intervención judicial (arts. 38 y 39)."],
    [S1, "Eficacia retroactiva", "Producción de efectos desde una fecha anterior a la del acto; excepcional y limitada por el art. 39.3."],
    [S2, "Dirección electrónica habilitada única", "Buzón electrónico en el que el interesado puede recibir las notificaciones de las Administraciones, junto a la comparecencia en sede electrónica (art. 43.1)."],
    [S2, "Comparecencia en sede electrónica", "Acceso del interesado o su representante, debidamente identificado, al contenido de la notificación (art. 43.1)."],
    [S2, "Notificación infructuosa", "La que no se puede practicar por ser desconocidos los interesados, ignorarse el lugar o fallar el intento; se hace por anuncio en el BOE (art. 44)."],
    [S3, "Concurrencia competitiva", "Procedimiento en el que varias personas compiten por un recurso limitado (subvenciones, plazas); sus actos se publican con efectos de notificación (art. 45.1.b)."],
  ],
  casos: [
    {
      slug: "adm-ayto-notificacion-papel-domicilio",
      titulo: "Una sanción notificada en papel",
      supuesto: "La Oficina de Recursos Humanos dicta el lunes 2 una resolución que impone una sanción a un empleado de servicios generales no obligado a relacionarse electrónicamente. El notificador acude a su domicilio el jueves 5 a las 10:30, sin encontrar a nadie. Más tarde el hijo del empleado, de 15 años, abre la puerta en el segundo intento.",
      preguntas: [
        [S2, "facil", "¿Dentro de qué plazo debía cursarse la notificación?", ["Diez días desde que se dictó la resolución", "Un mes desde que se dictó", "Tres días desde que se dictó"], "Art. 40.2 Ley 39/2015."],
        [S2, "media", "El segundo intento debe hacerse:", ["Una sola vez, dentro de los tres días siguientes, después de las 15:00 h", "Al día siguiente, a la misma hora", "Dentro de los diez días siguientes, a cualquier hora"], "Art. 42.2 Ley 39/2015."],
        [S2, "dificil", "Además de ser después de las 15:00, entre ambos intentos debe haber una diferencia de al menos:", ["Tres horas", "Una hora", "Seis horas"], "Art. 42.2 Ley 39/2015."],
        [S2, "media", "¿Puede recoger la notificación el hijo de 15 años?", ["Sí, si es mayor de 14 años, está en el domicilio y hace constar su identidad", "No, solo puede hacerlo un mayor de edad", "No, solo el propio interesado"], "Art. 42.2 Ley 39/2015."],
        [S2, "media", "Si el segundo intento también hubiera fracasado, la notificación se haría:", ["Mediante anuncio en el BOE", "Por correo electrónico ordinario", "Dejando la notificación en el buzón"], "Arts. 42.2 y 44 Ley 39/2015."],
        [S2, "media", "La notificación debe contener, entre otros datos:", ["Si la resolución pone fin a la vía administrativa y los recursos que proceden", "Solo un resumen de la sanción", "El expediente completo"], "Art. 40.2 Ley 39/2015."],
        [S2, "media", "La notificación en papel también debe ponerse a disposición del interesado:", ["En la sede electrónica, para que pueda acceder voluntariamente", "En el tablón de anuncios del Seminario", "En el BOPZ"], "Art. 42.1 Ley 39/2015."],
        [S2, "media", "Si el empleado accede después a la notificación en la sede electrónica:", ["Se le ofrecerá que el resto de notificaciones se hagan por medios electrónicos", "Queda obligado a relacionarse electrónicamente", "La notificación en papel queda anulada"], "Art. 42.3 Ley 39/2015."],
        [S2, "media", "Si el propio empleado rechazara la notificación:", ["Se haría constar en el expediente, se daría por efectuado el trámite y seguiría el procedimiento", "Habría que repetirla por tercera vez", "El procedimiento caducaría"], "Art. 41.5 Ley 39/2015."],
        [S1, "media", "Si la sanción indicara que produce efectos desde su notificación, estaríamos ante:", ["Un acto de eficacia demorada", "Un acto con eficacia retroactiva", "Un acto nulo"], "Art. 39.2 Ley 39/2015."],
      ],
    },
    {
      slug: "adm-ayto-notificacion-electronica-empresa",
      titulo: "La empresa que no abre sus notificaciones",
      supuesto: "El Ayuntamiento pone a disposición de una empresa contratista, obligada a relacionarse electrónicamente, una resolución en la sede electrónica el día 1 a las 9:00 y le envía un aviso a su correo. La empresa no accede. Paralelamente, se le entrega en mano en la oficina de registro la misma resolución el día 4, cuando acude a presentar otro escrito y pide que se la notifiquen allí.",
      preguntas: [
        [S2, "facil", "Para la empresa la notificación electrónica es:", ["Obligatoria", "Voluntaria", "Prohibida"], "Art. 41.1 Ley 39/2015, en relación con el art. 14.2."],
        [S2, "media", "La notificación electrónica se entiende practicada:", ["En el momento en que se accede a su contenido", "Cuando se envía el aviso al correo", "A las 24 horas de la puesta a disposición"], "Art. 43.2 Ley 39/2015."],
        [S2, "media", "Si la empresa no accediera nunca, la notificación se entendería rechazada:", ["Transcurridos diez días naturales desde la puesta a disposición", "Al día siguiente", "Transcurrido un mes"], "Art. 43.2 Ley 39/2015."],
        [S2, "media", "La entrega en mano en la oficina de registro del día 4 es posible porque:", ["El interesado comparece espontáneamente y solicita la notificación personal en ese momento", "Las empresas siempre pueden elegir el papel", "Lo decide el funcionario de registro libremente"], "Art. 41.1.a) Ley 39/2015."],
        [S2, "media", "Notificada por dos cauces, la fecha de notificación es:", ["La de la que se produjo primero, el día 4", "La del día 11", "La del día 1"], "Art. 41.7 Ley 39/2015."],
        [S2, "dificil", "A efectos de cumplir el plazo máximo de duración del procedimiento, la obligación de notificar se entiende cumplida con:", ["La puesta a disposición en la sede electrónica o en la dirección electrónica habilitada única", "El acceso efectivo de la empresa", "La publicación en el BOE"], "Art. 43.3 en relación con el art. 40.4 Ley 39/2015."],
        [S2, "media", "El correo electrónico que indicó la empresa sirve para:", ["Recibir avisos, no para practicar notificaciones", "Practicar las notificaciones", "Nada"], "Art. 41.1, último párrafo, Ley 39/2015."],
        [S2, "media", "Cualquier notificación es válida si deja constancia de:", ["Envío o puesta a disposición, recepción o acceso, fechas y horas, contenido íntegro e identidad de remitente y destinatario", "Solo la fecha de envío", "Solo la firma del notificador"], "Art. 41.1 Ley 39/2015."],
        [S2, "media", "La empresa podría acceder a sus notificaciones también desde:", ["El Punto de Acceso General electrónico de la Administración", "Cualquier buscador de internet", "El BOE"], "Art. 43.4 Ley 39/2015."],
        [S1, "media", "La resolución notificada se presume:", ["Válida", "Nula hasta que sea firme", "Anulable"], "Art. 39.1 Ley 39/2015."],
      ],
    },
    {
      slug: "adm-ayto-publicaciones-proceso-selectivo",
      titulo: "Las publicaciones de un proceso selectivo",
      supuesto: "Trabajas en la unidad de procesos de Recursos Humanos. En una promoción interna las bases fijan el tablón del edificio Seminario y la sede electrónica como medios de publicación. Un compañero propone avisar de las calificaciones por correo a cada aspirante y no publicar nada; otro quiere publicar la lista con las notas y los datos de salud de quienes pidieron adaptación.",
      preguntas: [
        [S3, "facil", "Las calificaciones del proceso selectivo deben:", ["Publicarse, y la publicación surte efectos de notificación", "Notificarse solo por correo", "No comunicarse"], "Art. 45.1.b) Ley 39/2015."],
        [S3, "media", "La convocatoria debe indicar:", ["El medio donde se harán las sucesivas publicaciones", "El correo de cada aspirante", "Solo la fecha del examen"], "Art. 45.1.b) Ley 39/2015."],
        [S3, "media", "Si se publicaran las notas en un lugar distinto del fijado en las bases:", ["Esas publicaciones carecerían de validez", "Serían válidas igualmente", "Solo serían válidas para los aprobados"], "Art. 45.1.b) Ley 39/2015."],
        [S3, "media", "La publicación de un acto debe incluir:", ["Los mismos elementos que una notificación (texto, recursos, órgano y plazo)", "Solo los nombres", "Solo las notas"], "Art. 45.2 Ley 39/2015."],
        [S3, "media", "Al publicar varios actos con elementos comunes:", ["Pueden publicarse conjuntamente los aspectos coincidentes, especificando solo los individuales", "Debe publicarse cada uno por separado entero", "No pueden publicarse"], "Art. 45.2 Ley 39/2015."],
        [S3, "dificil", "Sobre los datos de salud de los aspirantes con adaptación, si su publicación lesiona derechos, el órgano:", ["Publicará solo una somera indicación y el lugar donde comparecer para conocer el contenido íntegro", "Los publicará igualmente", "No tramitará la adaptación"], "Art. 46 Ley 39/2015."],
        [S2, "media", "Para proteger los datos personales en resoluciones con varios interesados, las Administraciones:", ["Pueden adoptar las medidas que consideren necesarias", "No pueden hacer nada", "Deben anonimizar siempre el acto entero"], "Art. 40.5 Ley 39/2015."],
        [S3, "media", "Si el acto se dirige a una pluralidad indeterminada de personas:", ["Debe publicarse, con efectos de notificación", "Debe notificarse a cada una", "No necesita ninguna difusión"], "Art. 45.1.a) Ley 39/2015."],
        [S3, "media", "Cuando una norma exige publicar en tablón de edictos:", ["Se entiende cumplido con la publicación en el diario oficial correspondiente", "Solo vale el tablón físico", "Debe publicarse además en prensa"], "Art. 45.4 Ley 39/2015."],
        [S1, "media", "Si, tras anularse una calificación, el tribunal dicta otra en su sustitución, esta puede tener:", ["Eficacia retroactiva", "Solo eficacia futura", "Eficacia condicionada a la firma del alcalde"], "Art. 39.3 Ley 39/2015."],
      ],
    },
  ],
});
