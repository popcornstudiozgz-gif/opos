/**
 * Crea tema-441 — Tema 19 de Administrativa/o (Ayto. Zaragoza, promoción
 * interna, CONV 5.2bis/2025): "Ley del Procedimiento Administrativo Común de
 * las Administraciones Públicas (XI): inicio del procedimiento a solicitud
 * del interesado."
 *
 * Fuente: Ley 39/2015 (BOE-A-2015-10565), Título IV, Capítulo II, Sección 3.ª,
 * arts. 66 a 69, texto consolidado leído íntegro (content-raw/ley-39-2015-
 * procedimiento-administrativo; consolidado del BOE actualizado a
 * 06-11-2024, sin cambios posteriores).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-441-inicio-solicitud-interesado.mjs
 */
import { sembrarTema, ADMIN_AYTO } from "./lib/sembrar-tema.mjs";

const L = ADMIN_AYTO.ley39;
const S1 = "solicitudes-iniciacion";
const S2 = "subsanacion-mejora-solicitud";
const S3 = "declaracion-responsable-comunicacion";

await sembrarTema({
  tema: {
    slug: "tema-441",
    titulo: "Inicio del procedimiento a solicitud del interesado",
    descripcion: "Ley 39/2015, Título IV, Capítulo II, Sección 3.ª (arts. 66 a 69): contenido de las solicitudes, solicitud única para pluralidad de personas, recibo, modelos y sistemas de presentación masiva y modelos obligatorios; solicitudes de responsabilidad patrimonial y prescripción al año; subsanación en diez días con advertencia de desistimiento, ampliación hasta cinco días, mejora voluntaria y subsanación electrónica de los obligados; declaración responsable y comunicación, sus efectos desde la presentación y consecuencias de la inexactitud o falsedad.",
    contenido: "Qué debe tener una solicitud (nombre, medio de notificación, hechos y petición, lugar y fecha, firma y órgano destinatario con su código) y qué hace la Administración si falta algo: requerir la subsanación en diez días, advirtiendo de que si no se subsana se tendrá por desistido, plazo ampliable cinco días salvo en procesos selectivos o de concurrencia competitiva. Los obligados a relacionarse electrónicamente que presentan en papel deben subsanar electrónicamente, y la fecha que cuenta es la de la subsanación. La responsabilidad patrimonial prescribe al año. La declaración responsable y la comunicación permiten empezar una actividad desde el día de su presentación, sin perjuicio del control posterior.",
    enlaces_boe: [{ url: L, titulo: "Ley 39/2015, de 1 de octubre, del Procedimiento Administrativo Común de las Administraciones Públicas (BOE-A-2015-10565)" }],
    indice_estudio: [
      { seccion: S1, titulo: "Solicitudes de iniciación y de responsabilidad patrimonial", articulos: "arts. 66 y 67", url: `${L}#a66` },
      { seccion: S2, titulo: "Subsanación y mejora de la solicitud", articulos: "art. 68", url: `${L}#a68` },
      { seccion: S3, titulo: "Declaración responsable y comunicación", articulos: "art. 69", url: `${L}#a69` },
    ],
  },
  vinculo: { oposicion: ADMIN_AYTO.oposicion, bloqueId: ADMIN_AYTO.bloqueParte2, numero: 19 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Contenido de la solicitud (art. 66.1)", "a) nombre y apellidos del interesado y su representante; b) medio electrónico o lugar físico para notificar; c) hechos, razones y petición; d) lugar y fecha; e) firma o acreditación de la voluntad; f) órgano, centro o unidad destinatario y su código de identificación"],
        ["Código de identificación del órgano (art. 66.1)", "Las oficinas de asistencia en materia de registros deben facilitarlo si el interesado lo desconoce; la sede electrónica mantiene un listado actualizado"],
        ["Solicitud única para varias personas (art. 66.2)", "Posible si las pretensiones tienen contenido y fundamento idéntico o sustancialmente similar, salvo norma específica en contra"],
        ["Recibo de presentación (art. 66.3)", "El interesado puede exigir recibo que acredite la fecha y hora de presentación"],
        ["Modelos de presentación masiva (art. 66.4)", "Las Administraciones deben establecerlos; son de uso voluntario y el interesado puede añadir elementos que deben tenerse en cuenta"],
        ["Modelos específicos (art. 66.6)", "Cuando la Administración los establezca expresamente en un procedimiento concreto, son de uso obligatorio"],
        ["Prescripción del derecho a reclamar responsabilidad patrimonial (art. 67.1)", "Un año desde el hecho o acto que motive la indemnización o desde que se manifieste su efecto lesivo; en daños físicos o psíquicos, desde la curación o la determinación de las secuelas"],
        ["Contenido adicional de la solicitud de responsabilidad patrimonial (art. 67.2)", "Lesiones, relación de causalidad con el servicio público, evaluación económica si es posible, momento de la lesión, y proposición de prueba"],
      ],
      preguntas: [
        ["facil", "Según el art. 66.1, la solicitud debe contener, entre otros datos:", ["Hechos, razones y petición en que se concrete con toda claridad la solicitud", "El número de la Seguridad Social del interesado", "El importe de las tasas abonadas"], "Art. 66.1.c) Ley 39/2015."],
        ["media", "Si el interesado desconoce el código de identificación del órgano al que se dirige:", ["La oficina de asistencia en materia de registros está obligada a facilitárselo", "La solicitud se inadmite", "Debe buscarlo en el BOE"], "Art. 66.1, último párrafo, Ley 39/2015."],
        ["media", "Los modelos de presentación masiva que establezcan las Administraciones son:", ["De uso voluntario", "De uso obligatorio", "Solo para personas jurídicas"], "Art. 66.4 Ley 39/2015."],
        ["media", "Los modelos específicos de solicitud establecidos expresamente para un procedimiento concreto son:", ["De uso obligatorio", "De uso voluntario", "Orientativos y sin valor"], "Art. 66.6 Ley 39/2015."],
        ["media", "El derecho a reclamar responsabilidad patrimonial prescribe:", ["Al año de producido el hecho o acto o de manifestarse su efecto lesivo", "A los cuatro años", "A los seis meses"], "Art. 67.1 Ley 39/2015."],
        ["dificil", "En caso de daños físicos a las personas, el plazo para reclamar responsabilidad patrimonial empieza a contar desde:", ["La curación o la determinación del alcance de las secuelas", "El día del accidente en todo caso", "La presentación de la denuncia"], "Art. 67.1 Ley 39/2015."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Plazo de subsanación (art. 68.1)", "Diez días para subsanar la falta o acompañar los documentos preceptivos"],
        ["Consecuencia de no subsanar (art. 68.1)", "Se le tiene por desistido de su petición, previa resolución dictada conforme al art. 21"],
        ["Ampliación del plazo de subsanación (art. 68.2)", "Hasta cinco días, a petición del interesado o de oficio, si la aportación presenta dificultades especiales; no en procedimientos selectivos o de concurrencia competitiva"],
        ["Mejora voluntaria de la solicitud (art. 68.3)", "El órgano puede recabar la modificación o mejora voluntaria de la solicitud, levantando acta sucinta"],
        ["Solicitud presencial de un obligado a relacionarse electrónicamente (art. 68.4)", "Se le requiere para que subsane presentándola electrónicamente; la fecha de presentación es la de la subsanación"],
      ],
      preguntas: [
        ["facil", "Si la solicitud no reúne los requisitos del art. 66, se requerirá al interesado para que subsane en un plazo de:", ["Diez días", "Quince días", "Cinco días"], "Art. 68.1 Ley 39/2015."],
        ["media", "Si el interesado no subsana en plazo:", ["Se le tendrá por desistido de su petición, previa resolución", "Se le impondrá una sanción", "Se resolverá desestimando por silencio"], "Art. 68.1 Ley 39/2015."],
        ["media", "El plazo de subsanación puede ampliarse hasta cinco días, salvo en:", ["Procedimientos selectivos o de concurrencia competitiva", "Procedimientos iniciados a solicitud", "Procedimientos de responsabilidad patrimonial"], "Art. 68.2 Ley 39/2015."],
        ["dificil", "Si una sociedad mercantil presenta una solicitud en papel, la fecha de presentación será:", ["Aquella en que la subsane mediante su presentación electrónica", "La de la presentación en papel", "La de la resolución del procedimiento"], "Art. 68.4 Ley 39/2015, en relación con el art. 14.2."],
        ["media", "Cuando el órgano recaba del solicitante la mejora voluntaria de su solicitud:", ["Se levanta acta sucinta que se incorpora al procedimiento", "Debe abrirse un nuevo procedimiento", "Se suspende el plazo de resolución un año"], "Art. 68.3 Ley 39/2015."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Declaración responsable (art. 69.1)", "Documento en que el interesado manifiesta bajo su responsabilidad que cumple los requisitos, que dispone de la documentación, que la pondrá a disposición si se le requiere y que mantendrá el cumplimiento"],
        ["Comunicación (art. 69.2)", "Documento por el que el interesado pone en conocimiento de la Administración sus datos identificativos u otros datos relevantes para iniciar una actividad o ejercer un derecho"],
        ["Efectos de la declaración responsable y la comunicación (art. 69.3)", "Permiten el reconocimiento o ejercicio del derecho o el inicio de la actividad desde el día de su presentación, sin perjuicio de la comprobación, control e inspección"],
        ["Comunicación posterior al inicio de la actividad (art. 69.3)", "Posible cuando la legislación lo prevea expresamente"],
        ["Inexactitud, falsedad u omisión esencial (art. 69.4)", "Impide continuar con la actividad desde que se tenga constancia, sin perjuicio de responsabilidades; puede obligar a restituir la situación y a no instar un nuevo procedimiento durante un tiempo fijado por ley"],
        ["¿Se pueden exigir a la vez declaración responsable y comunicación (art. 69.6)?", "No, solo una de las dos para una misma actividad o derecho"],
      ],
      preguntas: [
        ["facil", "La declaración responsable permite el inicio de una actividad:", ["Desde el día de su presentación, sin perjuicio de las facultades de comprobación", "Desde que la Administración la apruebe expresamente", "A los tres meses de su presentación"], "Art. 69.3 Ley 39/2015."],
        ["media", "Para iniciar una misma actividad, la Administración puede exigir:", ["Bien una declaración responsable, bien una comunicación, pero no ambas acumulativamente", "Ambas siempre", "Declaración responsable, comunicación y licencia"], "Art. 69.6 Ley 39/2015."],
        ["media", "La inexactitud, falsedad u omisión de carácter esencial en una declaración responsable determina:", ["La imposibilidad de continuar con la actividad desde que se tenga constancia", "Una simple advertencia", "La obligación de presentar una nueva declaración sin consecuencias"], "Art. 69.4 Ley 39/2015."],
        ["media", "La comunicación podrá presentarse en un plazo posterior al inicio de la actividad cuando:", ["La legislación correspondiente lo prevea expresamente", "Lo decida el interesado", "La actividad sea de bajo riesgo, en todo caso"], "Art. 69.3, párrafo segundo, Ley 39/2015."],
        ["dificil", "Los requisitos a los que se refiere la declaración responsable deben estar recogidos en ella:", ["De manera expresa, clara y precisa", "De forma genérica por remisión a la normativa", "Solo en un anexo voluntario"], "Art. 69.1, párrafo segundo, Ley 39/2015."],
      ],
    },
  ],
  glosario: [
    [S1, "Solicitud", "Escrito por el que el interesado pide a la Administración que inicie un procedimiento; su contenido mínimo está en el art. 66."],
    [S1, "Código de identificación (DIR3)", "Código que identifica cada órgano, centro o unidad de la Administración y que debe figurar en la solicitud (art. 66.1.f)."],
    [S1, "Responsabilidad patrimonial", "Derecho de los particulares a ser indemnizados por las lesiones causadas por el funcionamiento de los servicios públicos; se reclama en el plazo de un año (art. 67)."],
    [S2, "Subsanación", "Corrección de los defectos de una solicitud o aportación de los documentos que faltan, en el plazo de diez días (art. 68)."],
    [S2, "Desistimiento", "Abandono de la solicitud por el interesado; es la consecuencia de no subsanar en plazo (art. 68.1)."],
    [S3, "Declaración responsable", "Documento en que el interesado afirma bajo su responsabilidad que cumple los requisitos para ejercer un derecho o iniciar una actividad (art. 69.1)."],
    [S3, "Comunicación", "Documento por el que el interesado pone en conocimiento de la Administración datos relevantes para iniciar una actividad o ejercer un derecho (art. 69.2)."],
  ],
  casos: [
    {
      slug: "adm-ayto-solicitud-incompleta-ayuda",
      titulo: "Una solicitud de ayuda incompleta",
      supuesto: "En una convocatoria municipal de ayudas al alquiler en concurrencia competitiva, una solicitante presenta en papel su solicitud sin firmar y sin el certificado de empadronamiento exigido. Otra solicitud la presenta en papel una sociedad limitada propietaria de viviendas, también obligada a relacionarse electrónicamente.",
      preguntas: [
        [S1, "facil", "¿Qué requisito del art. 66 le falta a la primera solicitud?", ["La firma o acreditación de la autenticidad de la voluntad", "La fecha de nacimiento", "El número de cuenta bancaria"], "Art. 66.1.e) Ley 39/2015."],
        [S2, "media", "Se le requerirá para que subsane en:", ["Diez días", "Cinco días", "Quince días"], "Art. 68.1 Ley 39/2015."],
        [S2, "media", "El requerimiento debe advertirle de que si no subsana:", ["Se le tendrá por desistida, previa resolución", "Se le impondrá una multa", "Su solicitud se resolverá favorablemente"], "Art. 68.1 Ley 39/2015."],
        [S2, "media", "Si pide más tiempo porque el certificado tarda:", ["No puede ampliarse, por tratarse de un procedimiento de concurrencia competitiva", "Se le amplía cinco días", "Se le amplía diez días"], "Art. 68.2 Ley 39/2015."],
        [S2, "media", "A la sociedad limitada se le requerirá para que:", ["Subsane presentando la solicitud electrónicamente", "Acuda en persona con un poder notarial", "Pague una tasa por presentar en papel"], "Art. 68.4 Ley 39/2015."],
        [S2, "dificil", "La fecha de presentación de la solicitud de la sociedad será:", ["La de la subsanación electrónica", "La del registro en papel", "La del fin del plazo de la convocatoria"], "Art. 68.4 Ley 39/2015."],
        [S1, "media", "Si la convocatoria establece un modelo específico de solicitud, su uso es:", ["Obligatorio", "Voluntario", "Recomendado"], "Art. 66.6 Ley 39/2015."],
        [S1, "media", "Al presentar en la oficina de registro, la solicitante puede exigir:", ["Un recibo que acredite la fecha y hora de presentación", "Una resolución inmediata", "Copia del expediente de otros solicitantes"], "Art. 66.3 Ley 39/2015."],
        [S1, "media", "En la solicitud debe indicar el medio o lugar de notificación y, además, puede aportar:", ["Un correo electrónico o dispositivo para recibir avisos", "Un teléfono para notificarle verbalmente", "La dirección de un vecino"], "Art. 66.1.b) Ley 39/2015."],
        [S1, "media", "Si varias inquilinas de un mismo edificio tienen pretensiones con fundamento idéntico:", ["Pueden formularlas en una única solicitud, salvo que la norma específica lo impida", "Deben presentar cada una la suya siempre", "Solo puede presentarla la comunidad de propietarios"], "Art. 66.2 Ley 39/2015."],
      ],
    },
    {
      slug: "adm-ayto-declaracion-responsable-comercio",
      titulo: "La apertura de una tienda con declaración responsable",
      supuesto: "Una comerciante presenta un lunes una declaración responsable para abrir una tienda de ropa en un local de la calle Alfonso I. La abre el mismo día. Un mes después, una inspección municipal comprueba que el local no tiene la salida de emergencia que la comerciante declaró tener.",
      preguntas: [
        [S3, "facil", "¿Podía abrir la tienda el mismo día de la presentación?", ["Sí, la declaración responsable permite iniciar la actividad desde el día de su presentación", "No, debe esperar la licencia", "No, debe esperar un mes"], "Art. 69.3 Ley 39/2015."],
        [S3, "media", "En la declaración responsable la comerciante manifestó, entre otras cosas:", ["Que cumple los requisitos y dispone de la documentación que lo acredita", "Que la Administración ya había inspeccionado el local", "Que pagaría una fianza"], "Art. 69.1 Ley 39/2015."],
        [S3, "media", "La inspección municipal posterior es posible porque:", ["La Administración conserva sus facultades de comprobación, control e inspección", "La declaración responsable caduca al mes", "Lo pidió un vecino"], "Art. 69.3 Ley 39/2015."],
        [S3, "media", "La falsedad sobre la salida de emergencia, de carácter esencial, determina:", ["La imposibilidad de continuar con la actividad desde que se tiene constancia", "Solo una advertencia", "Nada, porque ya abrió"], "Art. 69.4 Ley 39/2015."],
        [S3, "dificil", "La resolución que declare la falsedad podrá obligarla a:", ["Restituir la situación al momento previo al inicio de la actividad", "Pagar el doble de la tasa", "Cambiar de local en 24 horas"], "Art. 69.4, párrafo segundo, Ley 39/2015."],
        [S3, "media", "Además, podrá impedirle instar un nuevo procedimiento con el mismo objeto:", ["Durante el tiempo que determine la ley", "Para siempre", "Durante diez días"], "Art. 69.4 Ley 39/2015."],
        [S3, "media", "Si el Ayuntamiento le hubiera exigido declaración responsable y comunicación a la vez para la misma apertura:", ["No sería posible exigir ambas acumulativamente", "Sería obligatorio", "Sería posible si la tienda es grande"], "Art. 69.6 Ley 39/2015."],
        [S3, "media", "Los modelos de declaración responsable deben estar:", ["Publicados y actualizados permanentemente y fácilmente accesibles", "Solo disponibles en papel", "Disponibles solo a petición"], "Art. 69.5 Ley 39/2015."],
        [S3, "media", "La Administración puede requerir en cualquier momento a la comerciante:", ["La documentación que acredite el cumplimiento de los requisitos", "Una nueva declaración cada mes", "Que cierre durante la inspección"], "Art. 69.1, párrafo segundo, Ley 39/2015."],
        [S1, "media", "La declaración responsable debe ir firmada porque:", ["Presentar declaraciones responsables exige firma", "Así lo pide la Policía Local", "No; basta con la identificación"], "Art. 11.2.b) Ley 39/2015 (Tema 10), aplicable a la iniciación."],
      ],
    },
    {
      slug: "adm-ayto-caida-acera-reclamacion",
      titulo: "La reclamación por una caída en la acera",
      supuesto: "Un vecino se cae el 10 de enero por una baldosa suelta en una acera municipal y se rompe el tobillo. Recibe el alta con secuelas determinadas el 15 de septiembre. El 1 de agosto del año siguiente presenta una reclamación de responsabilidad patrimonial sin indicar cuánto pide ni proponer pruebas.",
      preguntas: [
        [S1, "media", "Al tratarse de un daño físico, el plazo de un año para reclamar empieza a contar desde:", ["El 15 de septiembre, cuando se determinaron las secuelas", "El 10 de enero, día de la caída", "El 1 de agosto"], "Art. 67.1 Ley 39/2015."],
        [S1, "media", "¿Está la reclamación del 1 de agosto del año siguiente dentro de plazo?", ["Sí, porque no ha pasado un año desde la determinación de las secuelas", "No, pasó más de un año desde la caída", "No, el plazo es de seis meses"], "Art. 67.1 Ley 39/2015."],
        [S1, "media", "Además del contenido general, la reclamación debe especificar:", ["Las lesiones, la relación de causalidad, la evaluación económica si es posible y el momento de la lesión", "Solo el lugar de la caída", "El nombre del operario que puso la baldosa"], "Art. 67.2 Ley 39/2015."],
        [S1, "media", "La reclamación irá acompañada de:", ["Las alegaciones, documentos e informaciones oportunas y la proposición de prueba", "Una fianza", "Un informe de la Policía obligatorio"], "Art. 67.2 Ley 39/2015."],
        [S2, "media", "Como le falta la proposición de prueba, se le requerirá para que subsane en:", ["Diez días", "Un mes", "Tres días"], "Art. 68.1 Ley 39/2015."],
        [S2, "media", "Si la aportación de documentos médicos le resulta especialmente difícil, el plazo podrá ampliarse:", ["Hasta cinco días", "Hasta un mes", "No puede ampliarse"], "Art. 68.2 Ley 39/2015."],
        [S2, "media", "La ampliación puede acordarse:", ["A petición del interesado o a iniciativa del órgano", "Solo a petición del interesado", "Solo por el Pleno"], "Art. 68.2 Ley 39/2015."],
        [S2, "dificil", "Si no subsana, para tenerle por desistido es necesaria:", ["Una resolución dictada en los términos del art. 21", "Nada, el desistimiento es automático sin resolución", "Una sentencia"], "Art. 68.1 Ley 39/2015."],
        [S1, "facil", "El procedimiento se inicia en este caso:", ["A solicitud del interesado", "De oficio", "Por denuncia"], "Arts. 54 y 67 Ley 39/2015."],
        [S1, "media", "En la reclamación debe figurar el órgano al que se dirige y:", ["Su código de identificación", "El nombre de su titular", "Su presupuesto"], "Art. 66.1.f) Ley 39/2015."],
      ],
    },
  ],
});
