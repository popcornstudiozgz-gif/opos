/**
 * Crea tema-444 — Tema 22 de Administrativa/o (Ayto. Zaragoza, promoción
 * interna, CONV 5.2bis/2025): "Ley del Procedimiento Administrativo Común de
 * las Administraciones Públicas (XIV): instrucción del procedimiento.
 * Prueba."
 *
 * Fuente: Ley 39/2015 (BOE-A-2015-10565), Título IV, Capítulo IV, Sección 2.ª,
 * arts. 77 y 78, texto consolidado leído íntegro (content-raw/ley-39-2015-
 * procedimiento-administrativo; consolidado del BOE actualizado a
 * 06-11-2024, sin cambios posteriores). Incluye el apartado 3 bis del art.
 * 77 (inversión de la carga de la prueba ante indicios de discriminación).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-444-prueba.mjs
 */
import { sembrarTema, ADMIN_AYTO } from "./lib/sembrar-tema.mjs";

const L = ADMIN_AYTO.ley39;
const S1 = "medios-periodo-prueba";
const S2 = "valor-probatorio";
const S3 = "practica-prueba";

await sembrarTema({
  tema: {
    slug: "tema-444",
    titulo: "Instrucción del procedimiento: la prueba",
    descripcion: "Ley 39/2015, Título IV, Capítulo IV, Sección 2.ª (arts. 77 y 78): medios de prueba admisibles en Derecho y valoración conforme a la LEC; periodo de prueba de diez a treinta días y periodo extraordinario de hasta diez días; rechazo motivado de pruebas improcedentes o innecesarias; carga de la prueba ante indicios de discriminación; vinculación a los hechos probados por sentencias penales firmes; valor probatorio de los documentos de funcionarios con condición de autoridad; informes como prueba; práctica de la prueba, notificación y anticipo de gastos.",
    contenido: "Cómo se prueban los hechos en un procedimiento administrativo: vale cualquier medio admitido en Derecho, valorado según la Ley de Enjuiciamiento Civil. Si la Administración no da por ciertos los hechos o la naturaleza del procedimiento lo exige, el instructor abre un periodo de prueba de entre diez y treinta días, ampliable con otro extraordinario de hasta diez. Solo puede rechazar las pruebas manifiestamente improcedentes o innecesarias, motivadamente. Las actas de los funcionarios con condición de autoridad hacen prueba salvo que se demuestre lo contrario, y los hechos probados por sentencia penal firme vinculan en los procedimientos sancionadores. La prueba se practica previa notificación de lugar, fecha y hora, y los gastos que no deba soportar la Administración pueden exigirse por anticipado.",
    enlaces_boe: [{ url: L, titulo: "Ley 39/2015, de 1 de octubre, del Procedimiento Administrativo Común de las Administraciones Públicas (BOE-A-2015-10565)" }],
    indice_estudio: [
      { seccion: S1, titulo: "Medios y periodo de prueba", articulos: "art. 77.1 a 3 bis", url: `${L}#a77` },
      { seccion: S2, titulo: "Valor probatorio y prueba en la propuesta", articulos: "art. 77.4 a 7", url: `${L}#a77` },
      { seccion: S3, titulo: "Práctica de la prueba", articulos: "art. 78", url: `${L}#a78` },
    ],
  },
  vinculo: { oposicion: ADMIN_AYTO.oposicion, bloqueId: ADMIN_AYTO.bloqueParte2, numero: 22 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Medios de prueba (art. 77.1)", "Cualquier medio de prueba admisible en Derecho, valorado según los criterios de la Ley 1/2000, de Enjuiciamiento Civil"],
        ["¿Cuándo se abre el periodo de prueba (art. 77.2)?", "Cuando la Administración no tenga por ciertos los hechos alegados o la naturaleza del procedimiento lo exija; lo acuerda el instructor"],
        ["Duración del periodo de prueba (art. 77.2)", "No superior a treinta días ni inferior a diez"],
        ["Periodo extraordinario de prueba (art. 77.2)", "A petición de los interesados, si el instructor lo considera necesario, por un plazo no superior a diez días"],
        ["Rechazo de pruebas (art. 77.3)", "Solo las manifiestamente improcedentes o innecesarias, mediante resolución motivada del instructor"],
        ["Indicios de discriminación (art. 77.3 bis)", "Si el interesado aporta indicios fundados, corresponde a quien se imputa la discriminación justificar objetiva y razonablemente las medidas y su proporcionalidad; puede pedirse informe a organismos de igualdad"],
      ],
      preguntas: [
        ["facil", "El periodo de prueba tendrá un plazo:", ["No superior a treinta días ni inferior a diez", "No superior a quince días ni inferior a cinco", "De un mes exacto"], "Art. 77.2 Ley 39/2015."],
        ["media", "El periodo extraordinario de prueba tiene un plazo no superior a:", ["Diez días", "Quince días", "Treinta días"], "Art. 77.2 Ley 39/2015."],
        ["media", "El instructor solo podrá rechazar las pruebas propuestas por los interesados cuando sean:", ["Manifiestamente improcedentes o innecesarias, mediante resolución motivada", "Costosas para la Administración", "Propuestas fuera del horario de oficina"], "Art. 77.3 Ley 39/2015."],
        ["media", "La valoración de las pruebas se realiza de acuerdo con los criterios de:", ["La Ley 1/2000, de Enjuiciamiento Civil", "La Ley de Enjuiciamiento Criminal", "El Código Civil exclusivamente"], "Art. 77.1 Ley 39/2015."],
        ["dificil", "Cuando el interesado alega discriminación y aporta indicios fundados, corresponde:", ["A la persona a quien se impute la situación discriminatoria justificar objetiva y razonablemente las medidas y su proporcionalidad", "Al interesado probar plenamente la discriminación", "Al instructor archivar el procedimiento"], "Art. 77.3 bis Ley 39/2015."],
        ["media", "La apertura del periodo de prueba la acuerda:", ["El instructor del procedimiento", "El interesado", "El órgano consultivo"], "Art. 77.2 Ley 39/2015."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Hechos probados por sentencia penal firme (art. 77.4)", "Vinculan a las Administraciones en los procedimientos sancionadores"],
        ["Documentos de funcionarios con condición de autoridad (art. 77.5)", "Hacen prueba de los hechos constatados, si cumplen los requisitos legales, salvo que se acredite lo contrario"],
        ["Informe como medio de prueba (art. 77.6)", "Si la prueba consiste en un informe de un órgano administrativo, organismo público o entidad de derecho público, se entiende preceptivo"],
        ["Valoración de la prueba en la propuesta (art. 77.7)", "Si puede ser el fundamento básico de la decisión, debe incluirse en la propuesta de resolución"],
      ],
      preguntas: [
        ["facil", "Los hechos declarados probados por resoluciones judiciales penales firmes:", ["Vinculan a las Administraciones en los procedimientos sancionadores", "No vinculan nunca a la Administración", "Solo vinculan si los alega el interesado"], "Art. 77.4 Ley 39/2015."],
        ["media", "Los documentos formalizados por funcionarios con condición de autoridad que recojan hechos constatados por ellos:", ["Hacen prueba de esos hechos salvo que se acredite lo contrario", "Hacen prueba plena e irrebatible", "No tienen valor probatorio"], "Art. 77.5 Ley 39/2015."],
        ["media", "Cuando la prueba consiste en un informe de un órgano administrativo, se entiende que este tiene carácter:", ["Preceptivo", "Facultativo", "Vinculante"], "Art. 77.6 Ley 39/2015."],
        ["dificil", "Cuando la valoración de las pruebas pueda constituir el fundamento básico de la decisión:", ["Debe incluirse en la propuesta de resolución", "Debe reservarse para la resolución", "Debe comunicarse solo al órgano consultivo"], "Art. 77.7 Ley 39/2015."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Comunicación de la práctica de prueba (art. 78.1)", "La Administración comunica a los interesados, con antelación suficiente, el inicio de las actuaciones para practicar las pruebas admitidas"],
        ["Contenido de la notificación de prueba (art. 78.2)", "Lugar, fecha y hora, con advertencia, en su caso, de que el interesado puede nombrar técnicos que le asistan"],
        ["Gastos de las pruebas (art. 78.3)", "Si la prueba pedida por el interesado implica gastos que no deba soportar la Administración, esta puede exigir su anticipo, a reserva de la liquidación definitiva con comprobantes"],
      ],
      preguntas: [
        ["facil", "La Administración comunicará a los interesados el inicio de las actuaciones de prueba:", ["Con antelación suficiente", "El mismo día", "Después de practicarlas"], "Art. 78.1 Ley 39/2015."],
        ["media", "En la notificación de la práctica de prueba se consignará:", ["El lugar, fecha y hora, con la advertencia de que puede nombrar técnicos que le asistan", "Solo el resultado esperado", "La sanción que corresponda"], "Art. 78.2 Ley 39/2015."],
        ["media", "Si la prueba solicitada por el interesado implica gastos que no debe soportar la Administración:", ["Esta podrá exigir el anticipo, a reserva de la liquidación definitiva", "La prueba se rechaza siempre", "La paga siempre la Administración"], "Art. 78.3 Ley 39/2015."],
        ["dificil", "La liquidación definitiva de los gastos de una prueba se practica:", ["Uniendo los comprobantes que acrediten su realidad y cuantía", "Por estimación del instructor", "Aplicando una tasa fija"], "Art. 78.3 Ley 39/2015."],
      ],
    },
  ],
  glosario: [
    [S1, "Periodo de prueba", "Fase de la instrucción, de diez a treinta días, para practicar las pruebas pertinentes (art. 77.2)."],
    [S1, "Prueba improcedente o innecesaria", "La que no guarda relación con los hechos o no aporta nada a su esclarecimiento; solo esas pueden rechazarse, motivadamente (art. 77.3)."],
    [S1, "Inversión de la carga de la prueba", "Regla del art. 77.3 bis: ante indicios fundados de discriminación, debe justificar su actuación quien es señalado como discriminador."],
    [S2, "Presunción de veracidad", "Valor de los hechos constatados por funcionarios con condición de autoridad en documentos formalizados con los requisitos legales, que admite prueba en contrario (art. 77.5)."],
    [S3, "Anticipo de gastos", "Pago previo que puede exigirse al interesado por pruebas que pide y cuyo coste no debe soportar la Administración (art. 78.3)."],
  ],
  casos: [
    {
      slug: "adm-ayto-acta-policia-terraza",
      titulo: "El acta de la Policía y la terraza",
      supuesto: "En un procedimiento sancionador contra un bar por exceso de mesas en la terraza, consta un acta firmada por dos agentes de la Policía Local, que tienen condición de autoridad, en la que se cuentan 14 mesas cuando la licencia permite 8. El titular niega los hechos, pide que declare como testigo un cliente y que se haga un peritaje sobre el ruido del local, que nada tiene que ver con las mesas.",
      preguntas: [
        [S2, "media", "El acta de los agentes:", ["Hace prueba de los hechos constatados salvo que se acredite lo contrario", "No tiene ningún valor probatorio", "Es prueba plena que no admite prueba en contrario"], "Art. 77.5 Ley 39/2015."],
        [S1, "media", "Como el titular niega los hechos, el instructor:", ["Abrirá un periodo de prueba si no los tiene por ciertos o lo exige la naturaleza del procedimiento", "Debe archivar el procedimiento", "Impone la sanción sin más"], "Art. 77.2 Ley 39/2015."],
        [S1, "facil", "El periodo de prueba durará:", ["Entre diez y treinta días", "Entre cinco y quince días", "Dos meses"], "Art. 77.2 Ley 39/2015."],
        [S1, "media", "La declaración del cliente como testigo:", ["Es un medio de prueba admisible en Derecho", "Está prohibida en vía administrativa", "Solo vale ante un juez"], "Art. 77.1 Ley 39/2015."],
        [S1, "media", "El peritaje sobre el ruido, ajeno a los hechos:", ["Puede rechazarse por manifiestamente improcedente, mediante resolución motivada", "Debe practicarse siempre", "Puede rechazarse sin motivación"], "Art. 77.3 Ley 39/2015."],
        [S3, "media", "La declaración del testigo se notificará al titular indicando:", ["Lugar, fecha y hora, y que puede nombrar técnicos que le asistan", "Solo el nombre del testigo", "Nada, se practica sin avisar"], "Art. 78.2 Ley 39/2015."],
        [S2, "dificil", "Si un juzgado penal hubiera declarado probado en sentencia firme que había 14 mesas:", ["Ese hecho vincularía a la Administración en el procedimiento sancionador", "La Administración podría apartarse libremente", "El procedimiento debería archivarse"], "Art. 77.4 Ley 39/2015."],
        [S2, "media", "Si la valoración del acta es el fundamento básico de la sanción, debe:", ["Incluirse en la propuesta de resolución", "Ocultarse al interesado", "Reservarse para el recurso"], "Art. 77.7 Ley 39/2015."],
        [S1, "media", "Si, terminado el periodo, el titular pide un periodo extraordinario y el instructor lo considera necesario:", ["Podrá abrirlo por un máximo de diez días", "Podrá abrirlo por treinta días", "No existe esa posibilidad"], "Art. 77.2 Ley 39/2015."],
        [S1, "media", "Las pruebas se valorarán conforme a:", ["Los criterios de la Ley de Enjuiciamiento Civil", "La libre voluntad del alcalde", "La opinión del denunciante"], "Art. 77.1 Ley 39/2015."],
      ],
    },
    {
      slug: "adm-ayto-peritaje-gastos",
      titulo: "Un peritaje que cuesta dinero",
      supuesto: "En un expediente de responsabilidad patrimonial por daños en una vivienda atribuidos a unas obras municipales, el reclamante pide que un laboratorio externo analice muestras de la pared, con un coste de 1.200 euros. El instructor admite la prueba. También se pide un informe al Servicio de Conservación de Infraestructuras como prueba.",
      preguntas: [
        [S3, "media", "Como el análisis implica gastos que no debe soportar la Administración, esta puede:", ["Exigir su anticipo al reclamante, a reserva de la liquidación definitiva", "Rechazar la prueba por cara", "Pagarla y cobrársela con una multa"], "Art. 78.3 Ley 39/2015."],
        [S3, "media", "La liquidación definitiva de los 1.200 euros se hará:", ["Con los comprobantes que acrediten la realidad y cuantía del gasto", "A tanto alzado", "Por la mitad, en todo caso"], "Art. 78.3 Ley 39/2015."],
        [S3, "facil", "La toma de muestras debe comunicarse al reclamante:", ["Con antelación suficiente", "Una vez hecha", "Nunca"], "Art. 78.1 Ley 39/2015."],
        [S3, "media", "En la comunicación se le advertirá de que puede:", ["Nombrar técnicos que le asistan", "Elegir al instructor", "Fijar el resultado"], "Art. 78.2 Ley 39/2015."],
        [S2, "media", "El informe del Servicio de Conservación, pedido como prueba, se entiende:", ["Preceptivo", "Facultativo", "Vinculante"], "Art. 77.6 Ley 39/2015."],
        [S1, "media", "¿Podría el instructor rechazar el análisis por considerarlo útil pero caro?", ["No, solo puede rechazar las pruebas manifiestamente improcedentes o innecesarias", "Sí, por su coste", "Sí, sin motivarlo"], "Art. 77.3 Ley 39/2015."],
        [S1, "media", "Los hechos relevantes pueden acreditarse por:", ["Cualquier medio de prueba admisible en Derecho", "Solo documentos públicos", "Solo informes municipales"], "Art. 77.1 Ley 39/2015."],
        [S2, "media", "Si el resultado del análisis es pieza imprescindible para decidir:", ["Su valoración se incluirá en la propuesta de resolución", "No se mencionará", "Se mandará al juez"], "Art. 77.7 Ley 39/2015."],
        [S1, "dificil", "La resolución que rechace una prueba propuesta debe ser:", ["Motivada", "Verbal", "Secreta"], "Art. 77.3 Ley 39/2015."],
        [S1, "facil", "El periodo de prueba lo abre:", ["El instructor", "El reclamante", "El laboratorio"], "Art. 77.2 Ley 39/2015."],
      ],
    },
    {
      slug: "adm-ayto-discriminacion-acceso-instalacion",
      titulo: "Una queja por discriminación en una instalación deportiva",
      supuesto: "Una usuaria con discapacidad reclama al Ayuntamiento porque el personal de un pabellón municipal le negó varias veces el acceso al vestuario adaptado alegando «normas internas». Aporta mensajes y el testimonio de otra usuaria como indicios. El servicio responsable no ha dado ninguna explicación por escrito.",
      preguntas: [
        [S1, "media", "Si la usuaria aporta indicios fundados de discriminación:", ["Corresponde al servicio señalado justificar objetiva y razonablemente sus medidas y su proporcionalidad", "Ella debe probar plenamente la discriminación", "El procedimiento se archiva"], "Art. 77.3 bis Ley 39/2015."],
        [S1, "media", "Para valorar esos indicios, el órgano puede recabar informe de:", ["Los organismos públicos competentes en materia de igualdad", "La empresa de limpieza", "Cualquier asociación vecinal"], "Art. 77.3 bis, párrafo segundo, Ley 39/2015."],
        [S1, "facil", "Los mensajes aportados son:", ["Un medio de prueba admisible en Derecho", "Inadmisibles por ser electrónicos", "Solo válidos ante notario"], "Art. 77.1 Ley 39/2015."],
        [S1, "media", "El testimonio de la otra usuaria:", ["Puede practicarse como prueba testifical", "Está prohibido", "Solo vale si es funcionaria"], "Art. 77.1 Ley 39/2015."],
        [S3, "media", "Si se cita a la testigo, se comunicará a la reclamante:", ["Con antelación suficiente, indicando lugar, fecha y hora", "Después de la declaración", "Solo si lo pide"], "Art. 78.1 y 2 Ley 39/2015."],
        [S2, "media", "Si el conserje del pabellón levantara un acta interna sin condición de autoridad:", ["No tendría la presunción de veracidad del art. 77.5", "Haría prueba plena", "Sería un informe preceptivo"], "Art. 77.5 Ley 39/2015: solo funcionarios con condición de autoridad."],
        [S2, "media", "Si se pide como prueba un informe a la Oficina de Igualdad municipal, se entiende:", ["Preceptivo", "Facultativo", "Vinculante"], "Art. 77.6 Ley 39/2015."],
        [S1, "media", "El periodo de prueba, si se abre, no podrá ser inferior a:", ["Diez días", "Cinco días", "Treinta días"], "Art. 77.2 Ley 39/2015."],
        [S1, "dificil", "La justificación que dé el servicio debe ser:", ["Objetiva, razonable y suficientemente probada, incluida la proporcionalidad de las medidas", "Una simple referencia a las normas internas", "Verbal"], "Art. 77.3 bis Ley 39/2015."],
        [S2, "media", "La valoración de estas pruebas, si es la base de la decisión, figurará en:", ["La propuesta de resolución", "Un anexo secreto", "El recurso"], "Art. 77.7 Ley 39/2015."],
      ],
    },
  ],
});
