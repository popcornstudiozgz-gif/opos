/**
 * Crea tema-447 — Tema 25 de Administrativa/o (Ayto. Zaragoza, promoción
 * interna, CONV 5.2bis/2025): "Ley del Procedimiento Administrativo Común de
 * las Administraciones Públicas (XVII): finalización del procedimiento."
 *
 * Fuente: Ley 39/2015 (BOE-A-2015-10565), Título IV, Capítulo V, arts. 84 a
 * 95, texto consolidado leído íntegro (content-raw/ley-39-2015-
 * procedimiento-administrativo; consolidado del BOE actualizado a
 * 06-11-2024, sin cambios posteriores). Las remisiones a los arts. 34 y 35
 * (motivación) y 21 y 22 (obligación de resolver) se citan sin desarrollarlas.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-447-finalizacion-procedimiento.mjs
 */
import { sembrarTema, ADMIN_AYTO } from "./lib/sembrar-tema.mjs";

const L = ADMIN_AYTO.ley39;
const S1 = "terminacion-disposiciones-generales";
const S2 = "resolucion";
const S3 = "desistimiento-renuncia";
const S4 = "caducidad";

await sembrarTema({
  tema: {
    slug: "tema-447",
    titulo: "Finalización del procedimiento",
    descripcion: "Ley 39/2015, Título IV, Capítulo V (arts. 84 a 95): formas de terminación; reconocimiento de responsabilidad y pago voluntario en los sancionadores con reducciones de al menos el 20 % acumulables; terminación convencional; actuaciones complementarias; contenido de la resolución, congruencia y prohibición de reformatio in peius; propuesta y resolución en los procedimientos sancionadores y de responsabilidad patrimonial (seis meses); desistimiento por la Administración; desistimiento y renuncia de los interesados; caducidad por paralización imputable al interesado (tres meses).",
    contenido: "Cómo termina un procedimiento: por resolución, desistimiento, renuncia, caducidad o imposibilidad material sobrevenida. En los sancionadores, reconocer la responsabilidad o pagar voluntariamente antes de resolver da derecho a reducciones de al menos el 20 % cada una, acumulables, si se renuncia a recurrir. La resolución decide todas las cuestiones, debe ser congruente con lo pedido y no puede empeorar la situación del solicitante; nunca puede dejar de dictarse por oscuridad de la ley. La caducidad se produce si el interesado paraliza su procedimiento y, advertido, pasan tres meses sin que haga lo necesario; no prescribe por sí sola sus acciones.",
    enlaces_boe: [{ url: L, titulo: "Ley 39/2015, de 1 de octubre, del Procedimiento Administrativo Común de las Administraciones Públicas (BOE-A-2015-10565)" }],
    indice_estudio: [
      { seccion: S1, titulo: "Terminación, sancionadores y terminación convencional", articulos: "arts. 84 a 86", url: `${L}#a84` },
      { seccion: S2, titulo: "La resolución", articulos: "arts. 87 a 92", url: `${L}#a87` },
      { seccion: S3, titulo: "Desistimiento y renuncia", articulos: "arts. 93 y 94", url: `${L}#a93` },
      { seccion: S4, titulo: "Caducidad", articulos: "art. 95", url: `${L}#a95` },
    ],
  },
  vinculo: { oposicion: ADMIN_AYTO.oposicion, bloqueId: ADMIN_AYTO.bloqueParte2, numero: 25 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Formas de terminación (art. 84.1)", "Resolución, desistimiento, renuncia al derecho (si no está prohibida) y declaración de caducidad"],
        ["Imposibilidad material sobrevenida (art. 84.2)", "También termina el procedimiento; la resolución debe ser motivada en todo caso"],
        ["Reconocimiento de responsabilidad (art. 85.1)", "Si el infractor lo reconoce, puede resolverse con la imposición de la sanción que proceda"],
        ["Pago voluntario (art. 85.2)", "Si la sanción es solo pecuniaria (o la no pecuniaria es improcedente), el pago antes de resolver termina el procedimiento, salvo la reposición de la situación y la indemnización de daños"],
        ["Reducciones en sanciones pecuniarias (art. 85.3)", "Al menos el 20 % por reconocimiento y por pago, acumulables; figuran en la notificación de iniciación y exigen desistir o renunciar a recursos administrativos"],
        ["Terminación convencional (art. 86.1)", "Acuerdos, pactos, convenios o contratos con personas públicas o privadas, no contrarios al ordenamiento ni sobre materias no transigibles, para satisfacer el interés público"],
        ["Contenido mínimo del acuerdo convencional (art. 86.2)", "Partes, ámbito personal, funcional y territorial, y plazo de vigencia"],
        ["Límite de los acuerdos (art. 86.4)", "No alteran las competencias de los órganos ni las responsabilidades de autoridades y funcionarios"],
      ],
      preguntas: [
        ["facil", "Pone fin al procedimiento, según el art. 84.1:", ["La declaración de caducidad", "La propuesta de resolución", "El trámite de audiencia"], "Art. 84.1 Ley 39/2015."],
        ["media", "Cuando la sanción tiene únicamente carácter pecuniario, las reducciones por reconocimiento de responsabilidad y por pago voluntario son de:", ["Al menos el 20 % cada una, acumulables entre sí", "El 50 % en total", "El 10 % no acumulable"], "Art. 85.3 Ley 39/2015."],
        ["media", "La efectividad de las reducciones del art. 85.3 está condicionada a:", ["El desistimiento o renuncia de cualquier acción o recurso en vía administrativa contra la sanción", "Que el infractor no tenga antecedentes", "El pago en 24 horas"], "Art. 85.3 Ley 39/2015."],
        ["media", "El pago voluntario de la multa antes de la resolución termina el procedimiento, salvo en lo relativo a:", ["La reposición de la situación alterada y la indemnización de daños y perjuicios", "El recargo de apremio", "La publicación de la sanción"], "Art. 85.2 Ley 39/2015."],
        ["dificil", "Los acuerdos de terminación convencional no pueden:", ["Versar sobre materias no susceptibles de transacción", "Celebrarse con personas de Derecho privado", "Poner fin al procedimiento"], "Art. 86.1 Ley 39/2015."],
        ["media", "La imposibilidad material de continuar el procedimiento por causas sobrevenidas:", ["Produce su terminación mediante resolución motivada", "No termina el procedimiento", "Produce su caducidad automática"], "Art. 84.2 Ley 39/2015."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Actuaciones complementarias (art. 87)", "Acordadas motivadamente por el órgano que resuelve, se practican en 15 días como máximo; alegaciones de los interesados en 7 días; suspenden el plazo para resolver"],
        ["Contenido de la resolución (art. 88.1)", "Decide todas las cuestiones planteadas y las derivadas; las conexas no planteadas se ponen de manifiesto antes por un máximo de 15 días"],
        ["Congruencia (art. 88.2)", "En los procedimientos a solicitud, la resolución es congruente con lo pedido y no puede agravar la situación inicial del interesado"],
        ["Elementos de la resolución (art. 88.3)", "Decisión motivada (art. 35), recursos procedentes, órgano y plazo"],
        ["Prohibición de abstenerse de resolver (art. 88.5)", "No cabe por silencio, oscuridad o insuficiencia de la ley; sí inadmitir solicitudes de derechos no previstos o manifiestamente infundadas"],
        ["Motivación por informes (art. 88.6)", "La aceptación de informes o dictámenes motiva la resolución cuando se incorporan a su texto"],
        ["Archivo sin propuesta en sancionadores (art. 89.1)", "Inexistencia de hechos, hechos no acreditados, no infracción manifiesta, responsables no identificados o exentos, o infracción prescrita"],
        ["Mayor gravedad en la resolución sancionadora (art. 90.2)", "Si el órgano que resuelve la aprecia, lo notifica al inculpado para alegar en 15 días"],
        ["Ejecutividad de la resolución sancionadora (art. 90.3)", "Cuando no quepa recurso ordinario en vía administrativa"],
        ["Silencio en responsabilidad patrimonial (art. 91.3)", "Pasados seis meses desde el inicio sin resolución ni acuerdo, puede entenderse contraria a la indemnización"],
      ],
      preguntas: [
        ["facil", "En los procedimientos iniciados a solicitud del interesado, la resolución:", ["Será congruente con lo pedido y no podrá agravar su situación inicial", "Puede agravar la situación inicial si hay interés público", "Puede resolver sobre cuestiones no pedidas sin audiencia"], "Art. 88.2 Ley 39/2015."],
        ["media", "Las actuaciones complementarias deberán practicarse en un plazo no superior a:", ["Quince días", "Diez días", "Un mes"], "Art. 87 Ley 39/2015."],
        ["media", "Tras las actuaciones complementarias, los interesados pueden formular alegaciones en:", ["Siete días", "Diez días", "Quince días"], "Art. 87 Ley 39/2015."],
        ["media", "La Administración no puede abstenerse de resolver so pretexto de:", ["Silencio, oscuridad o insuficiencia de los preceptos legales", "Falta de interés del asunto", "Exceso de trabajo"], "Art. 88.5 Ley 39/2015."],
        ["media", "En un procedimiento sancionador, el instructor acordará el archivo sin propuesta de resolución cuando:", ["La infracción haya prescrito", "El inculpado reconozca su responsabilidad", "Falte el trámite de audiencia"], "Art. 89.1.e) Ley 39/2015."],
        ["dificil", "Si el órgano competente para resolver considera que la infracción reviste mayor gravedad que la de la propuesta:", ["Lo notificará al inculpado para que alegue en quince días", "Impondrá directamente la sanción mayor", "Devolverá el expediente al denunciante"], "Art. 90.2 Ley 39/2015."],
        ["media", "En responsabilidad patrimonial, transcurridos seis meses desde el inicio sin resolución expresa ni acuerdo:", ["Puede entenderse que la resolución es contraria a la indemnización", "Se entiende estimada la reclamación", "El procedimiento caduca"], "Art. 91.3 Ley 39/2015."],
        ["media", "La resolución sancionadora será ejecutiva:", ["Cuando no quepa contra ella ningún recurso ordinario en vía administrativa", "Desde que se dicta", "Cuando la confirme un juez"], "Art. 90.3 Ley 39/2015."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Desistimiento por la Administración (art. 93)", "En los procedimientos iniciados de oficio, motivadamente y en los supuestos y con los requisitos previstos en las leyes"],
        ["Desistimiento y renuncia de los interesados (art. 94.1)", "Todo interesado puede desistir de su solicitud o, si no está prohibido, renunciar a sus derechos"],
        ["Varios interesados en la solicitud (art. 94.2)", "El desistimiento o la renuncia solo afecta a quienes lo formulen"],
        ["Forma del desistimiento o renuncia (art. 94.3)", "Cualquier medio que permita su constancia, con las firmas que correspondan"],
        ["Aceptación (art. 94.4)", "De plano, declarando concluso el procedimiento, salvo que terceros interesados personados insten su continuación en diez días"],
        ["Interés general (art. 94.5)", "La Administración puede limitar los efectos al interesado y seguir el procedimiento"],
      ],
      preguntas: [
        ["facil", "Si la solicitud la formularon dos o más interesados, el desistimiento:", ["Solo afecta a quienes lo hayan formulado", "Afecta a todos", "No es posible"], "Art. 94.2 Ley 39/2015."],
        ["media", "Los terceros interesados personados pueden instar la continuación del procedimiento tras el desistimiento en el plazo de:", ["Diez días desde que se les notifique", "Quince días", "Un mes"], "Art. 94.4 Ley 39/2015."],
        ["media", "La Administración puede desistir:", ["En los procedimientos iniciados de oficio, motivadamente y en los casos previstos en las leyes", "En cualquier procedimiento, libremente", "Solo en los iniciados a solicitud"], "Art. 93 Ley 39/2015."],
        ["dificil", "Si la cuestión suscitada entraña interés general, ante el desistimiento del interesado la Administración puede:", ["Limitar sus efectos al interesado y seguir el procedimiento", "Sancionar al interesado", "Archivar obligatoriamente"], "Art. 94.5 Ley 39/2015."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Caducidad en procedimientos a solicitud (art. 95.1)", "Si se paraliza por causa imputable al interesado, se le advierte de que a los tres meses caducará; pasado el plazo sin reanudarlo, se archivan las actuaciones y se le notifica"],
        ["Recurso contra la caducidad (art. 95.1)", "Proceden los recursos pertinentes"],
        ["Inactividad en trámites no indispensables (art. 95.2)", "No produce caducidad; solo la pérdida del derecho a ese trámite"],
        ["Caducidad y prescripción (art. 95.3)", "La caducidad no produce por sí sola la prescripción, pero los procedimientos caducados no interrumpen el plazo de prescripción"],
        ["Nuevo procedimiento tras la caducidad (art. 95.3)", "Pueden incorporarse los actos y trámites que no habrían cambiado, pero deben cumplimentarse alegaciones, prueba y audiencia"],
        ["Excepción a la caducidad (art. 95.4)", "Puede no aplicarse si la cuestión afecta al interés general o conviene sustanciarla"],
      ],
      preguntas: [
        ["facil", "En los procedimientos a solicitud paralizados por causa imputable al interesado, la Administración le advertirá de que se producirá la caducidad transcurridos:", ["Tres meses", "Seis meses", "Un mes"], "Art. 95.1 Ley 39/2015."],
        ["media", "La simple inactividad del interesado en trámites no indispensables para resolver:", ["No produce caducidad, solo la pérdida del derecho al trámite", "Produce la caducidad inmediata", "Produce el desistimiento"], "Art. 95.2 Ley 39/2015."],
        ["media", "Los procedimientos caducados:", ["No interrumpen el plazo de prescripción", "Interrumpen el plazo de prescripción", "Producen por sí solos la prescripción"], "Art. 95.3 Ley 39/2015."],
        ["dificil", "En un nuevo procedimiento iniciado tras la caducidad deberán cumplimentarse en todo caso:", ["Los trámites de alegaciones, proposición de prueba y audiencia", "Solo la resolución", "Ningún trámite si se incorporan los anteriores"], "Art. 95.3, párrafo segundo, Ley 39/2015."],
      ],
    },
  ],
  glosario: [
    [S1, "Terminación convencional", "Fin del procedimiento mediante un acuerdo entre la Administración y los interesados (art. 86)."],
    [S1, "Pago voluntario", "Abono de la multa antes de la resolución, que termina el procedimiento sancionador y da derecho a reducción (art. 85)."],
    [S2, "Actuaciones complementarias", "Diligencias indispensables acordadas por el órgano que resuelve tras la instrucción (art. 87)."],
    [S2, "Congruencia", "Correspondencia entre la resolución y lo pedido por el interesado (art. 88.2)."],
    [S2, "Reformatio in peius", "Empeoramiento de la situación del interesado por la propia resolución de su solicitud; está prohibida (art. 88.2)."],
    [S3, "Renuncia", "Abandono por el interesado del derecho en que se funda su solicitud; solo cabe si no está prohibida (art. 94)."],
    [S4, "Caducidad", "Terminación del procedimiento por su paralización durante el tiempo previsto, en los iniciados a solicitud por causa imputable al interesado (art. 95)."],
  ],
  casos: [
    {
      slug: "adm-ayto-multa-pronto-pago",
      titulo: "Una multa con reconocimiento y pronto pago",
      supuesto: "Se inicia un procedimiento sancionador contra un comercio por exponer género en la acera sin autorización. La sanción propuesta es una multa de 600 euros, sin otra sanción. La notificación de iniciación prevé las reducciones legales mínimas. El titular reconoce su responsabilidad y paga antes de la resolución, renunciando a recurrir.",
      preguntas: [
        [S1, "facil", "Al reconocer el titular su responsabilidad, el procedimiento:", ["Puede resolverse con la imposición de la sanción que proceda", "Se archiva sin sanción", "Pasa al juez"], "Art. 85.1 Ley 39/2015."],
        [S1, "media", "Por el reconocimiento de responsabilidad le corresponde una reducción de al menos:", ["El 20 %", "El 50 %", "El 10 %"], "Art. 85.3 Ley 39/2015."],
        [S1, "media", "Por el pago voluntario, otra reducción de al menos:", ["El 20 %, acumulable a la anterior", "El 20 %, no acumulable", "El 30 %"], "Art. 85.3 Ley 39/2015."],
        [S1, "media", "Con las reducciones mínimas acumuladas, pagará como máximo:", ["360 euros", "480 euros", "300 euros"], "600 − 20 % − 20 % = 360 euros (art. 85.3)."],
        [S1, "media", "Para que las reducciones sean efectivas, debe:", ["Desistir o renunciar a cualquier recurso en vía administrativa contra la sanción", "Cerrar el comercio un día", "Pagar también las costas"], "Art. 85.3 Ley 39/2015."],
        [S1, "media", "Las reducciones debían figurar en:", ["La notificación de iniciación del procedimiento", "La resolución final", "Un bando municipal"], "Art. 85.3 Ley 39/2015."],
        [S1, "dificil", "Aunque pague, el Ayuntamiento podrá seguir exigiéndole:", ["La reposición de la situación alterada y la indemnización de daños", "Una segunda multa", "Nada más"], "Art. 85.2 Ley 39/2015."],
        [S1, "media", "El porcentaje mínimo de reducción puede:", ["Incrementarse reglamentariamente", "Reducirse por ordenanza", "Eliminarse por el instructor"], "Art. 85.3, párrafo segundo, Ley 39/2015."],
        [S2, "media", "Si el titular no hubiera reconocido nada y el instructor viera que los hechos no están acreditados, debería:", ["Resolver la finalización con archivo sin formular propuesta", "Proponer una sanción mínima", "Esperar a que caduque"], "Art. 89.1.b) Ley 39/2015."],
        [S2, "media", "En un procedimiento sancionador, la propuesta de resolución:", ["Debe notificarse a los interesados", "Es interna y no se notifica", "Solo se comunica al denunciante"], "Arts. 88.7 y 89.2 Ley 39/2015."],
      ],
    },
    {
      slug: "adm-ayto-licencia-reformatio",
      titulo: "La licencia que salió peor de lo pedido",
      supuesto: "Una vecina solicita una licencia para cerrar su terraza con un acristalamiento de 2 metros. El órgano competente, tras la instrucción, quiere concederle 1,5 metros y además ordenarle que retire un toldo antiguo que no formaba parte de su solicitud. Antes de resolver, decide pedir una nueva medición técnica.",
      preguntas: [
        [S2, "media", "La nueva medición, acordada por el órgano que resuelve antes de dictar resolución, es una:", ["Actuación complementaria, que requiere acuerdo motivado", "Actuación previa", "Medida provisional"], "Art. 87 Ley 39/2015."],
        [S2, "media", "La medición debe practicarse en un plazo no superior a:", ["Quince días", "Diez días", "Un mes"], "Art. 87 Ley 39/2015."],
        [S2, "media", "Tras la medición, la vecina podrá alegar en:", ["Siete días", "Diez días", "Quince días"], "Art. 87 Ley 39/2015."],
        [S2, "dificil", "Mientras se practica la medición, el plazo para resolver:", ["Queda suspendido", "Sigue corriendo", "Se reinicia desde cero"], "Art. 87 Ley 39/2015."],
        [S2, "media", "Conceder 1,5 metros en lugar de 2 es posible porque:", ["No agrava la situación inicial de la vecina, que no tenía licencia", "La Administración puede siempre dar más de lo pedido", "Así lo exige el art. 95"], "Art. 88.2 Ley 39/2015."],
        [S2, "media", "Ordenar la retirada del toldo en esta resolución:", ["Agravaría su situación inicial; sería necesario incoar de oficio otro procedimiento", "Es correcto en cualquier caso", "Es obligatorio"], "Art. 88.2 Ley 39/2015."],
        [S2, "media", "Si quisiera pronunciarse sobre una cuestión conexa no planteada, el órgano debería:", ["Ponerla antes de manifiesto a la vecina por un plazo no superior a quince días", "Resolver sin avisar", "Pedir permiso al Pleno"], "Art. 88.1 Ley 39/2015."],
        [S2, "facil", "La resolución debe expresar:", ["Los recursos procedentes, el órgano ante el que presentarlos y el plazo", "Solo la decisión", "El sueldo del técnico"], "Art. 88.3 Ley 39/2015."],
        [S2, "media", "Si el informe técnico se incorpora al texto de la resolución:", ["Sirve de motivación", "Debe repetirse con otras palabras", "Anula la resolución"], "Art. 88.6 Ley 39/2015."],
        [S2, "media", "La resolución se dictará:", ["Electrónicamente, garantizando la identidad del órgano y la integridad del documento", "Siempre en papel", "Verbalmente"], "Art. 88.4 Ley 39/2015."],
      ],
    },
    {
      slug: "adm-ayto-caducidad-desistimiento-ayuda",
      titulo: "Una solicitud abandonada y otra retirada",
      supuesto: "Dos hermanos solicitaron conjuntamente una subvención para rehabilitar la fachada de su edificio. El Ayuntamiento les pidió un documento indispensable para resolver y, tras meses sin respuesta, les advirtió de la caducidad. Después, uno de los hermanos presenta un escrito firmado desistiendo; el otro no dice nada. Una comunidad vecina personada en el expediente quiere que siga.",
      preguntas: [
        [S4, "facil", "La advertencia de caducidad indicará que se producirá transcurridos:", ["Tres meses", "Un mes", "Un año"], "Art. 95.1 Ley 39/2015."],
        [S4, "media", "Pasado ese plazo sin aportar el documento indispensable, la Administración:", ["Acordará el archivo de las actuaciones y lo notificará", "Resolverá concediendo la ayuda", "Impondrá una sanción"], "Art. 95.1 Ley 39/2015."],
        [S4, "media", "Si el documento no fuera indispensable para resolver, su falta:", ["No produciría caducidad, solo la pérdida del derecho a ese trámite", "Produciría caducidad", "Produciría la nulidad"], "Art. 95.2 Ley 39/2015."],
        [S4, "media", "Contra la resolución que declare la caducidad:", ["Proceden los recursos pertinentes", "No cabe recurso", "Solo cabe queja"], "Art. 95.1 Ley 39/2015."],
        [S3, "media", "El desistimiento de uno de los hermanos:", ["Solo afecta a él, no al otro hermano", "Afecta a ambos", "No es posible en solicitudes conjuntas"], "Art. 94.2 Ley 39/2015."],
        [S3, "media", "El desistimiento puede hacerse por:", ["Cualquier medio que permita su constancia, con las firmas que correspondan", "Solo comparecencia personal", "Solo burofax"], "Art. 94.3 Ley 39/2015."],
        [S3, "dificil", "La comunidad vecina personada puede pedir que el procedimiento continúe en el plazo de:", ["Diez días desde que se le notifique el desistimiento", "Un mes", "Tres meses"], "Art. 94.4 Ley 39/2015."],
        [S3, "media", "Si no lo pide nadie, la Administración aceptará el desistimiento:", ["De plano, y declarará concluso el procedimiento respecto de quien desiste", "Tras un periodo de prueba", "Solo si lo aprueba el Pleno"], "Art. 94.4 Ley 39/2015."],
        [S4, "media", "Si la ayuda pudiera volver a pedirse en un nuevo procedimiento, este:", ["Podrá incorporar los trámites que no habrían cambiado, pero con alegaciones, prueba y audiencia", "No puede iniciarse nunca", "Se resuelve sin trámites"], "Art. 95.3 Ley 39/2015."],
        [S4, "media", "La caducidad, por sí sola:", ["No produce la prescripción de las acciones", "Produce la prescripción", "Produce la nulidad del derecho"], "Art. 95.3 Ley 39/2015."],
      ],
    },
  ],
});
