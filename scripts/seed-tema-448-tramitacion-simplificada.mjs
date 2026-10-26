/**
 * Crea tema-448 — Tema 26 de Administrativa/o (Ayto. Zaragoza, promoción
 * interna, CONV 5.2bis/2025): "Ley del Procedimiento Administrativo Común de
 * las Administraciones Públicas (XVIII): tramitación simplificada del
 * procedimiento administrativo común."
 *
 * Fuente: Ley 39/2015 (BOE-A-2015-10565), Título IV, Capítulo VI, art. 96,
 * texto consolidado leído íntegro (content-raw/ley-39-2015-
 * procedimiento-administrativo; consolidado del BOE actualizado a
 * 06-11-2024, sin cambios posteriores).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-448-tramitacion-simplificada.mjs
 */
import { sembrarTema, ADMIN_AYTO } from "./lib/sembrar-tema.mjs";

const L = ADMIN_AYTO.ley39;
const S1 = "acuerdo-tramitacion-simplificada";
const S2 = "tramites-plazo-simplificada";

await sembrarTema({
  tema: {
    slug: "tema-448",
    titulo: "La tramitación simplificada del procedimiento administrativo común",
    descripcion: "Ley 39/2015, Título IV, Capítulo VI (art. 96): presupuestos (interés público o falta de complejidad); acuerdo de oficio con oposición expresa de los interesados o a solicitud, desestimable en cinco días sin recurso; vuelta a la tramitación ordinaria; supuestos de responsabilidad patrimonial (causalidad y cuantía inequívocas) y sancionadores (infracción leve, sin oposición posible); plazo de resolución de treinta días; trámites tasados; dictamen consultivo en quince días y efectos de un dictamen contrario.",
    contenido: "La tramitación simplificada es un procedimiento abreviado que se puede acordar por interés público o por falta de complejidad, de oficio o a solicitud. Si se acuerda de oficio, basta la oposición expresa de un interesado para volver a la ordinaria, salvo en los sancionadores por infracción leve. Si la pide el interesado, la Administración puede denegarla en cinco días sin recurso, y pasado ese plazo se entiende denegada. Se resuelve en treinta días y solo tiene los trámites tasados: inicio, subsanación, alegaciones en cinco días, audiencia solo si la resolución va a ser desfavorable, informes y dictámenes preceptivos y resolución; si hace falta otro trámite, se sigue la ordinaria.",
    enlaces_boe: [{ url: L, titulo: "Ley 39/2015, de 1 de octubre, del Procedimiento Administrativo Común de las Administraciones Públicas (BOE-A-2015-10565)" }],
    indice_estudio: [
      { seccion: S1, titulo: "Acuerdo de tramitación simplificada y supuestos especiales", articulos: "art. 96.1 a 5", url: `${L}#a96` },
      { seccion: S2, titulo: "Plazo y trámites de la tramitación simplificada", articulos: "art. 96.6 y 7", url: `${L}#a96` },
    ],
  },
  vinculo: { oposicion: ADMIN_AYTO.oposicion, bloqueId: ADMIN_AYTO.bloqueParte2, numero: 26 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Presupuestos de la tramitación simplificada (art. 96.1)", "Razones de interés público o falta de complejidad del procedimiento"],
        ["¿Quién puede instarla (art. 96.1)?", "La Administración de oficio o el interesado a solicitud"],
        ["Vuelta a la tramitación ordinaria (art. 96.1)", "El órgano competente para tramitar puede acordarla en cualquier momento anterior a la resolución"],
        ["Acuerdo de oficio (art. 96.2)", "Debe notificarse a los interesados; si alguno se opone expresamente, se sigue la tramitación ordinaria"],
        ["Solicitud del interesado (art. 96.3)", "Puede desestimarse en cinco días, sin recurso; pasado ese plazo se entiende desestimada"],
        ["Responsabilidad patrimonial (art. 96.4)", "Si la relación de causalidad, la valoración del daño y la cuantía son inequívocas, puede suspenderse el procedimiento general e iniciarse uno simplificado de oficio"],
        ["Procedimientos sancionadores (art. 96.5)", "Si hay elementos para calificar la infracción como leve; el interesado no puede oponerse"],
      ],
      preguntas: [
        ["facil", "La tramitación simplificada puede acordarse cuando lo aconsejen:", ["Razones de interés público o la falta de complejidad del procedimiento", "La urgencia del interesado exclusivamente", "La carga de trabajo del servicio"], "Art. 96.1 Ley 39/2015."],
        ["media", "Si la Administración acuerda de oficio la tramitación simplificada y un interesado se opone expresamente:", ["Deberá seguirse la tramitación ordinaria", "Se mantiene la simplificada", "Se archiva el procedimiento"], "Art. 96.2 Ley 39/2015."],
        ["media", "La solicitud de tramitación simplificada formulada por el interesado puede desestimarse en el plazo de:", ["Cinco días, sin posibilidad de recurso", "Diez días, con recurso de alzada", "Quince días, con recurso de reposición"], "Art. 96.3 Ley 39/2015."],
        ["media", "Transcurridos cinco días sin respuesta a la solicitud de tramitación simplificada:", ["Se entiende desestimada", "Se entiende estimada", "Se reinicia el plazo"], "Art. 96.3 Ley 39/2015."],
        ["dificil", "En los procedimientos sancionadores tramitados de forma simplificada por infracción leve:", ["No cabe la oposición expresa del interesado", "El interesado puede oponerse en cinco días", "Es obligatoria la conformidad del interesado"], "Art. 96.5 Ley 39/2015."],
        ["media", "La vuelta a la tramitación ordinaria puede acordarse:", ["En cualquier momento anterior a la resolución", "Solo en los cinco primeros días", "Nunca"], "Art. 96.1, párrafo segundo, Ley 39/2015."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Plazo de resolución (art. 96.6)", "Treinta días desde el siguiente a la notificación del acuerdo de tramitación simplificada, salvo que reste menos para la ordinaria"],
        ["Trámites de la simplificada (art. 96.6)", "Inicio; subsanación; alegaciones al inicio en cinco días; audiencia solo si la resolución es desfavorable; informe jurídico, del CGPJ y dictamen consultivo cuando sean preceptivos; resolución"],
        ["Dictamen consultivo en la simplificada (art. 96.6.g)", "Suspende automáticamente el plazo para resolver; puede emitirse en quince días si se pide; el expediente incluye propuesta de resolución"],
        ["Dictamen contrario al fondo de la propuesta (art. 96.6.g)", "Se continúa por la tramitación ordinaria, convalidando lo actuado salvo el dictamen"],
        ["Trámite no previsto (art. 96.7)", "Si el procedimiento exige un trámite no previsto, debe tramitarse de manera ordinaria"],
      ],
      preguntas: [
        ["facil", "Salvo que reste menos para la tramitación ordinaria, los procedimientos simplificados se resolverán en:", ["Treinta días", "Tres meses", "Quince días"], "Art. 96.6 Ley 39/2015."],
        ["media", "En la tramitación simplificada, las alegaciones al inicio se formulan en el plazo de:", ["Cinco días", "Diez días", "Quince días"], "Art. 96.6.c) Ley 39/2015."],
        ["media", "En la tramitación simplificada, el trámite de audiencia se da:", ["Únicamente cuando la resolución vaya a ser desfavorable para el interesado", "Siempre", "Nunca"], "Art. 96.6.d) Ley 39/2015."],
        ["media", "Si el procedimiento simplificado exige un trámite no previsto en el art. 96.6:", ["Deberá tramitarse de manera ordinaria", "Se omite el trámite", "Se amplía el plazo a sesenta días"], "Art. 96.7 Ley 39/2015."],
        ["dificil", "Si el dictamen del órgano consultivo es contrario al fondo de la propuesta, el órgano competente:", ["Acordará continuar por la tramitación ordinaria, convalidando lo actuado salvo el dictamen", "Archivará el procedimiento", "Resolverá en todo caso conforme al dictamen"], "Art. 96.6.g) Ley 39/2015."],
        ["media", "En la tramitación simplificada, el dictamen del órgano consultivo puede emitirse, si lo solicita el órgano competente, en:", ["Quince días", "Dos meses", "Cinco días"], "Art. 96.6.g) Ley 39/2015."],
      ],
    },
  ],
  glosario: [
    [S1, "Tramitación simplificada", "Modalidad abreviada del procedimiento común, con trámites tasados y resolución en treinta días (art. 96)."],
    [S1, "Oposición expresa", "Manifestación de un interesado contra la tramitación simplificada acordada de oficio, que obliga a seguir la ordinaria (art. 96.2), salvo en sancionadores leves."],
    [S1, "Infracción leve", "Calificación que permite tramitar de forma simplificada un procedimiento sancionador sin posibilidad de oposición (art. 96.5)."],
    [S2, "Suspensión automática del plazo", "Paralización del cómputo del plazo para resolver desde que se pide el dictamen consultivo hasta que se emite (art. 96.6.g)."],
    [S2, "Convalidación de actuaciones", "Mantenimiento de lo actuado en la simplificada al pasar a la ordinaria por un dictamen contrario, salvo el propio dictamen (art. 96.6.g)."],
  ],
  casos: [
    {
      slug: "adm-ayto-simplificada-sancion-leve",
      titulo: "Una sanción leve por la vía rápida",
      supuesto: "El órgano competente inicia un procedimiento sancionador contra un vecino por depositar muebles en la calle fuera del horario permitido, conducta que la ordenanza califica como leve. Acuerda la tramitación simplificada y lo notifica el día 1. El vecino presenta un escrito oponiéndose a la tramitación simplificada.",
      preguntas: [
        [S1, "media", "¿Puede tramitarse de forma simplificada?", ["Sí, hay elementos para calificar la infracción como leve", "No, los sancionadores nunca", "Solo si lo pide el vecino"], "Art. 96.5 Ley 39/2015."],
        [S1, "media", "La oposición del vecino:", ["No impide la tramitación simplificada en un sancionador leve", "Obliga a seguir la ordinaria", "Anula el procedimiento"], "Art. 96.5 Ley 39/2015."],
        [S2, "facil", "El procedimiento deberá resolverse, salvo que reste menos para la ordinaria, en:", ["Treinta días", "Tres meses", "Seis meses"], "Art. 96.6 Ley 39/2015."],
        [S2, "media", "Los treinta días se cuentan desde:", ["El día siguiente a la notificación del acuerdo de tramitación simplificada", "La comisión de la infracción", "La resolución"], "Art. 96.6 Ley 39/2015."],
        [S2, "media", "El vecino podrá formular alegaciones al inicio durante:", ["Cinco días", "Diez días", "Quince días"], "Art. 96.6.c) Ley 39/2015."],
        [S2, "media", "Si la resolución va a imponerle la sanción, se le dará:", ["Trámite de audiencia, por ser desfavorable", "Nada más", "Información pública"], "Art. 96.6.d) Ley 39/2015."],
        [S2, "dificil", "Si durante el procedimiento resultara necesario un periodo de prueba, no previsto en la simplificada:", ["Deberá tramitarse de manera ordinaria", "Se omitirá la prueba", "Se resolverá sin pruebas"], "Art. 96.7 Ley 39/2015."],
        [S1, "media", "El órgano puede decidir continuar por la tramitación ordinaria:", ["En cualquier momento anterior a la resolución", "Solo el primer día", "Nunca"], "Art. 96.1 Ley 39/2015."],
        [S2, "media", "Si fuera preceptivo el informe del servicio jurídico:", ["Se incluiría entre los trámites de la simplificada", "Obligaría a la ordinaria", "Se omitiría"], "Art. 96.6.e) Ley 39/2015."],
        [S1, "media", "El acuerdo de tramitación simplificada adoptado de oficio debe:", ["Notificarse a los interesados", "Publicarse solo en el BOE", "Mantenerse reservado"], "Art. 96.2 Ley 39/2015."],
      ],
    },
    {
      slug: "adm-ayto-simplificada-solicitud-denegada",
      titulo: "Un interesado pide la vía rápida",
      supuesto: "Una empresa solicita una autorización de ocupación de vía pública para una mudanza y, en el mismo escrito, pide la tramitación simplificada por tratarse de un asunto sencillo. El servicio considera que no hay razones para ello porque afecta a una calle peatonal con mucho tránsito y requiere un informe de Movilidad.",
      preguntas: [
        [S1, "facil", "¿Puede el interesado pedir la tramitación simplificada?", ["Sí", "No, solo la Administración puede acordarla", "Solo si es una persona física"], "Art. 96.1 y 3 Ley 39/2015."],
        [S1, "media", "Si el servicio aprecia que no concurren los requisitos, puede desestimar la petición en:", ["Cinco días desde su presentación", "Diez días", "Un mes"], "Art. 96.3 Ley 39/2015."],
        [S1, "media", "Contra la desestimación de la tramitación simplificada:", ["No cabe recurso", "Cabe recurso de alzada", "Cabe recurso de reposición"], "Art. 96.3 Ley 39/2015."],
        [S1, "media", "Si el servicio no contesta en cinco días:", ["La solicitud de tramitación simplificada se entiende desestimada", "Se entiende estimada", "Se archiva la autorización"], "Art. 96.3 Ley 39/2015."],
        [S1, "media", "Los requisitos que deben concurrir son:", ["Razones de interés público o falta de complejidad", "Que la empresa sea pequeña", "Que la mudanza sea en fin de semana"], "Art. 96.1 Ley 39/2015."],
        [S2, "media", "Si se tramitara simplificada y el informe de Movilidad no fuera preceptivo ni estuviera entre los trámites tasados:", ["Habría que tramitar de forma ordinaria", "Se pediría igualmente sin cambiar nada", "Se ignoraría siempre"], "Art. 96.7 Ley 39/2015."],
        [S2, "media", "Si se tramitara simplificada, la subsanación de la solicitud:", ["Es uno de los trámites previstos", "No es posible", "Obliga a la ordinaria"], "Art. 96.6.b) Ley 39/2015."],
        [S2, "media", "Si la autorización fuera a concederse en los términos pedidos, en la simplificada:", ["No haría falta trámite de audiencia", "Sería obligatoria la audiencia", "Habría que abrir información pública"], "Art. 96.6.d) Ley 39/2015."],
        [S2, "dificil", "Si quedaran 20 días del plazo de la tramitación ordinaria al acordar la simplificada, el plazo para resolver sería:", ["El de 20 días, por restar menos que los treinta", "Treinta días en todo caso", "Cincuenta días"], "Art. 96.6 Ley 39/2015."],
        [S2, "media", "En la tramitación simplificada, el procedimiento termina con:", ["La resolución", "La audiencia", "El informe jurídico"], "Art. 96.6.h) Ley 39/2015."],
      ],
    },
    {
      slug: "adm-ayto-simplificada-patrimonial",
      titulo: "Una responsabilidad patrimonial clara",
      supuesto: "Un camión de limpieza municipal golpea un coche aparcado correctamente; el atestado, las fotos y el presupuesto del taller (2.000 euros) no dejan dudas. El procedimiento general de responsabilidad patrimonial ya está iniciado. El instructor propone pasar a la vía simplificada.",
      preguntas: [
        [S1, "media", "En responsabilidad patrimonial puede acordarse la simplificada si se considera inequívoca:", ["La relación de causalidad, la valoración del daño y el cálculo de la indemnización", "Solo la identidad del perjudicado", "Solo la fecha del accidente"], "Art. 96.4 Ley 39/2015."],
        [S1, "media", "En ese caso, el órgano competente podrá acordar de oficio:", ["La suspensión del procedimiento general y la iniciación de uno simplificado", "La terminación sin indemnización", "La remisión al juzgado"], "Art. 96.4 Ley 39/2015."],
        [S1, "media", "Como se acuerda de oficio, si el propietario del coche se opone expresamente:", ["Se seguirá la tramitación ordinaria", "Se mantiene la simplificada", "Se archiva"], "Art. 96.2 Ley 39/2015."],
        [S2, "facil", "El procedimiento simplificado se resolverá en:", ["Treinta días, salvo que reste menos para la ordinaria", "Seis meses", "Un año"], "Art. 96.6 Ley 39/2015."],
        [S2, "media", "Si la resolución va a reconocer íntegramente la indemnización pedida:", ["No es necesario el trámite de audiencia", "Es obligatoria la audiencia", "Es obligatoria la información pública"], "Art. 96.6.d) Ley 39/2015."],
        [S2, "media", "Si se pidiera dictamen a un órgano consultivo por ser preceptivo, desde la solicitud hasta su emisión:", ["Se suspende automáticamente el plazo para resolver", "Sigue corriendo el plazo", "Caduca el procedimiento"], "Art. 96.6.g) Ley 39/2015."],
        [S2, "media", "En el expediente remitido al órgano consultivo se incluirá:", ["Una propuesta de resolución", "Solo las fotos", "Nada más que la solicitud"], "Art. 96.6.g) Ley 39/2015."],
        [S2, "dificil", "Si el dictamen fuera contrario al fondo de la propuesta:", ["Se continuaría por la ordinaria, convalidando lo actuado salvo el dictamen", "Se archivaría", "Se repetiría todo desde el principio"], "Art. 96.6.g) Ley 39/2015."],
        [S2, "media", "El órgano competente debe pedir el dictamen en un plazo que permita:", ["Cumplir el plazo de resolución del procedimiento", "Agotar los seis meses", "Esperar al año siguiente"], "Art. 96.6.g) Ley 39/2015."],
        [S1, "media", "El presupuesto previo de la tramitación simplificada en este caso es:", ["La falta de complejidad del procedimiento", "La urgencia del taller", "La cuantía superior a 50.000 euros"], "Art. 96.1 Ley 39/2015."],
      ],
    },
  ],
});
