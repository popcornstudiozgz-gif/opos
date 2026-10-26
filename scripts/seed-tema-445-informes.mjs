/**
 * Crea tema-445 — Tema 23 de Administrativa/o (Ayto. Zaragoza, promoción
 * interna, CONV 5.2bis/2025): "Ley del Procedimiento Administrativo Común de
 * las Administraciones Públicas (XV): instrucción del procedimiento.
 * Informes."
 *
 * Fuente: Ley 39/2015 (BOE-A-2015-10565), Título IV, Capítulo IV, Sección 3.ª,
 * arts. 79 a 81, texto consolidado leído íntegro (content-raw/ley-39-2015-
 * procedimiento-administrativo; consolidado del BOE actualizado a
 * 06-11-2024, sin cambios posteriores). La referencia a la suspensión del
 * plazo para resolver remite al art. 22.1.d), que no se desarrolla aquí.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-445-informes.mjs
 */
import { sembrarTema, ADMIN_AYTO } from "./lib/sembrar-tema.mjs";

const L = ADMIN_AYTO.ley39;
const S1 = "peticion-emision-informes";
const S2 = "informes-responsabilidad-patrimonial";

await sembrarTema({
  tema: {
    slug: "tema-445",
    titulo: "Instrucción del procedimiento: los informes",
    descripcion: "Ley 39/2015, Título IV, Capítulo IV, Sección 3.ª (arts. 79 a 81): petición de informes preceptivos y de los necesarios para resolver, con cita del precepto o motivación y concreción de los extremos; carácter facultativo y no vinculante salvo disposición en contrario; emisión electrónica en diez días; efectos de la falta de emisión (proseguir o suspender el plazo si es preceptivo) y de los informes de otra Administración; informe preceptivo del servicio causante y dictamen del Consejo de Estado u órgano consultivo autonómico (desde 50.000 euros) en responsabilidad patrimonial.",
    contenido: "Cómo se piden y emiten los informes: se solicitan los obligatorios por ley y los necesarios para resolver, citando el precepto o explicando por qué se piden y concretando sobre qué. Salvo que una norma diga otra cosa, son facultativos y no vinculantes, y se emiten por medios electrónicos en diez días. Si no llegan a tiempo se puede seguir adelante, salvo que sean preceptivos, en cuyo caso puede suspenderse el plazo para resolver; si es de otra Administración y no llega, se sigue y el que llegue tarde puede no tenerse en cuenta. En responsabilidad patrimonial es preceptivo el informe del servicio causante del daño (diez días) y, desde 50.000 euros o la cuantía autonómica, el dictamen del Consejo de Estado u órgano consultivo (dos meses).",
    enlaces_boe: [{ url: L, titulo: "Ley 39/2015, de 1 de octubre, del Procedimiento Administrativo Común de las Administraciones Públicas (BOE-A-2015-10565)" }],
    indice_estudio: [
      { seccion: S1, titulo: "Petición y emisión de informes", articulos: "arts. 79 y 80", url: `${L}#a79` },
      { seccion: S2, titulo: "Informes y dictámenes en responsabilidad patrimonial", articulos: "art. 81", url: `${L}#a81` },
    ],
  },
  vinculo: { oposicion: ADMIN_AYTO.oposicion, bloqueId: ADMIN_AYTO.bloqueParte2, numero: 23 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Informes que se solicitan (art. 79.1)", "Los preceptivos por disposiciones legales y los que se juzguen necesarios para resolver, citando el precepto que los exija o fundamentando su conveniencia"],
        ["Contenido de la petición de informe (art. 79.2)", "Debe concretar el extremo o extremos sobre los que se solicita"],
        ["Carácter de los informes (art. 80.1)", "Salvo disposición expresa en contrario, facultativos y no vinculantes"],
        ["Plazo y forma de emisión (art. 80.2)", "Por medios electrónicos, conforme al art. 26, en diez días salvo que una disposición o el resto de plazos permita o exija otro"],
        ["Informe no emitido en plazo (art. 80.3)", "Pueden proseguir las actuaciones, sin perjuicio de la responsabilidad del causante de la demora; si es preceptivo, puede suspenderse el plazo máximo para resolver (art. 22.1.d)"],
        ["Informe de otra Administración no emitido (art. 80.4)", "Si expresa el punto de vista de sus competencias y no llega en plazo, pueden proseguir las actuaciones; el emitido fuera de plazo puede no tenerse en cuenta"],
      ],
      preguntas: [
        ["facil", "Salvo disposición expresa en contrario, los informes serán:", ["Facultativos y no vinculantes", "Preceptivos y vinculantes", "Preceptivos y no vinculantes"], "Art. 80.1 Ley 39/2015."],
        ["media", "Salvo otra previsión, los informes se emitirán en el plazo de:", ["Diez días", "Quince días", "Un mes"], "Art. 80.2 Ley 39/2015."],
        ["media", "En la petición de informe debe concretarse:", ["El extremo o extremos acerca de los que se solicita", "El sentido favorable o desfavorable esperado", "El nombre del técnico que debe firmarlo"], "Art. 79.2 Ley 39/2015."],
        ["media", "Si un informe preceptivo no se emite en plazo:", ["Podrá suspenderse el transcurso del plazo máximo para resolver", "El procedimiento caduca", "Se entiende emitido en sentido favorable"], "Art. 80.3 Ley 39/2015."],
        ["dificil", "Un informe de otra Administración, emitido fuera de plazo, que exprese el punto de vista de sus competencias:", ["Podrá no ser tenido en cuenta al resolver", "Obliga a retrotraer el procedimiento", "Debe tenerse en cuenta siempre"], "Art. 80.4 Ley 39/2015."],
        ["media", "Al solicitar un informe que no es preceptivo, el órgano debe:", ["Fundamentar la conveniencia de reclamarlo", "Pedir permiso al interesado", "Abrir información pública"], "Art. 79.1 Ley 39/2015."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Informe preceptivo en responsabilidad patrimonial (art. 81.1)", "Del servicio cuyo funcionamiento haya ocasionado la presunta lesión; plazo máximo de diez días"],
        ["¿Cuándo es preceptivo el dictamen del Consejo de Estado u órgano consultivo autonómico (art. 81.2)?", "Si la indemnización reclamada es de 50.000 euros o más (o la cuantía de la legislación autonómica) y en los casos de la LO 3/1980"],
        ["Remisión de la propuesta al órgano consultivo (art. 81.2)", "El instructor la remite en diez días desde el fin de la audiencia, ajustada al art. 91, o la propuesta de terminación convencional"],
        ["Plazo y contenido del dictamen (art. 81.2)", "Dos meses; se pronuncia sobre la relación de causalidad y, en su caso, la valoración del daño y la cuantía y modo de la indemnización"],
        ["Responsabilidad por el funcionamiento anormal de la Justicia (art. 81.3)", "Informe preceptivo del Consejo General del Poder Judicial en dos meses como máximo, con suspensión del plazo para resolver"],
      ],
      preguntas: [
        ["facil", "En los procedimientos de responsabilidad patrimonial es preceptivo solicitar informe:", ["Al servicio cuyo funcionamiento haya ocasionado la presunta lesión", "Al Defensor del Pueblo", "Al interesado"], "Art. 81.1 Ley 39/2015."],
        ["media", "El informe del servicio causante de la lesión no podrá exceder en su emisión de:", ["Diez días", "Quince días", "Dos meses"], "Art. 81.1 Ley 39/2015."],
        ["media", "Es preceptivo el dictamen del Consejo de Estado u órgano consultivo autonómico cuando la indemnización reclamada sea de cuantía igual o superior a:", ["50.000 euros, o la que establezca la legislación autonómica", "6.000 euros", "100.000 euros en todo caso"], "Art. 81.2 Ley 39/2015."],
        ["media", "El dictamen del órgano consultivo se emitirá en el plazo de:", ["Dos meses", "Diez días", "Seis meses"], "Art. 81.2 Ley 39/2015."],
        ["dificil", "El instructor remite la propuesta de resolución al órgano competente para pedir el dictamen en el plazo de:", ["Diez días desde la finalización del trámite de audiencia", "Un mes desde la reclamación", "Dos meses desde la prueba"], "Art. 81.2, párrafo segundo, Ley 39/2015."],
        ["media", "El dictamen debe pronunciarse sobre:", ["La relación de causalidad entre el servicio público y la lesión y, en su caso, la valoración del daño y la indemnización", "La sanción al funcionario responsable", "La oportunidad política de indemnizar"], "Art. 81.2, párrafo tercero, Ley 39/2015."],
      ],
    },
  ],
  glosario: [
    [S1, "Informe preceptivo", "El que una norma obliga a pedir; si no llega en plazo puede suspenderse el plazo para resolver (art. 80.3)."],
    [S1, "Informe facultativo", "El que el órgano pide porque lo juzga necesario, aunque ninguna norma lo exija; es la regla general (art. 80.1)."],
    [S1, "Informe vinculante", "El que obliga al órgano a resolver en el sentido que indica; solo lo es si una disposición lo establece expresamente."],
    [S2, "Dictamen", "Opinión técnica o jurídica de un órgano consultivo (Consejo de Estado u órgano autonómico equivalente)."],
    [S2, "Relación de causalidad", "Vínculo entre el funcionamiento del servicio público y el daño, sobre el que se pronuncia el dictamen (art. 81.2)."],
  ],
  casos: [
    {
      slug: "adm-ayto-informe-urbanismo-tarde",
      titulo: "Un informe de Urbanismo que no llega",
      supuesto: "Para resolver una solicitud de licencia de actividad, el instructor pide el 1 de marzo un informe al Servicio de Urbanismo (obligatorio según la ordenanza) y otro, voluntario, al Servicio de Movilidad. Ninguno llega en el plazo general. Además, se pide informe a la Confederación Hidrográfica del Ebro, otra Administración, sobre la afección a un cauce.",
      preguntas: [
        [S1, "facil", "El informe de Urbanismo, exigido por la ordenanza, es:", ["Preceptivo", "Facultativo", "Inexistente"], "Art. 79.1 Ley 39/2015."],
        [S1, "media", "Al pedirlo, el instructor debe:", ["Citar el precepto que lo exige y concretar los extremos sobre los que se pide", "Indicar qué debe concluir", "Pedirlo verbalmente"], "Art. 79.1 y 2 Ley 39/2015."],
        [S1, "media", "Salvo otra previsión, ambos informes debían emitirse en:", ["Diez días", "Un mes", "Quince días"], "Art. 80.2 Ley 39/2015."],
        [S1, "media", "Ante la falta del informe de Movilidad, facultativo:", ["Pueden proseguir las actuaciones", "Debe suspenderse el procedimiento", "La licencia se deniega"], "Art. 80.3 Ley 39/2015."],
        [S1, "media", "Ante la falta del informe de Urbanismo, preceptivo:", ["Puede suspenderse el plazo máximo para resolver", "Se entiende favorable", "Se archiva el procedimiento"], "Art. 80.3 Ley 39/2015."],
        [S1, "dificil", "La demora en emitir los informes:", ["Puede dar lugar a responsabilidad de quien la cause", "No tiene consecuencias", "Anula el procedimiento"], "Art. 80.3 Ley 39/2015."],
        [S1, "media", "Si la Confederación no emite su informe en plazo:", ["Pueden proseguir las actuaciones", "No puede resolverse nunca", "Hay que pedir permiso al Ministerio"], "Art. 80.4 Ley 39/2015."],
        [S1, "media", "Si el informe de la Confederación llega después de vencido su plazo:", ["Podrá no ser tenido en cuenta al resolver", "Debe tenerse en cuenta en todo caso", "Anula la resolución"], "Art. 80.4 Ley 39/2015."],
        [S1, "media", "Salvo disposición expresa, el informe de Urbanismo, aun siendo preceptivo, es:", ["No vinculante", "Vinculante", "Definitivo"], "Art. 80.1 Ley 39/2015."],
        [S1, "facil", "Los informes se emiten por:", ["Medios electrónicos", "Teléfono", "Correo ordinario"], "Art. 80.2 Ley 39/2015."],
      ],
    },
    {
      slug: "adm-ayto-reclamacion-60000",
      titulo: "Una reclamación de 60.000 euros",
      supuesto: "Un ciclista reclama al Ayuntamiento 60.000 euros por las lesiones sufridas al caer en un socavón de un carril bici. La instrucción ya ha terminado el trámite de audiencia. En Aragón el órgano consultivo es el Consejo Consultivo de Aragón; a efectos del caso, supón que la legislación autonómica no fija otra cuantía.",
      preguntas: [
        [S2, "facil", "Durante la instrucción es preceptivo pedir informe:", ["Al servicio responsable del mantenimiento del carril bici", "Al ciclista", "Al Pleno"], "Art. 81.1 Ley 39/2015."],
        [S2, "media", "Ese informe debe emitirse en un plazo no superior a:", ["Diez días", "Un mes", "Dos meses"], "Art. 81.1 Ley 39/2015."],
        [S2, "media", "Por la cuantía reclamada es preceptivo:", ["El dictamen del órgano consultivo de la Comunidad Autónoma", "Solo el informe del servicio", "El informe del Consejo General del Poder Judicial"], "Art. 81.2 Ley 39/2015."],
        [S2, "media", "Tras la audiencia, el instructor remitirá la propuesta de resolución para pedir el dictamen en:", ["Diez días", "Un mes", "Quince días"], "Art. 81.2 Ley 39/2015."],
        [S2, "media", "El dictamen se emitirá en:", ["Dos meses", "Diez días", "Seis meses"], "Art. 81.2 Ley 39/2015."],
        [S2, "media", "El dictamen se pronunciará, entre otros aspectos, sobre:", ["La relación de causalidad entre el funcionamiento del servicio y la lesión", "El carácter del ciclista", "Las multas de tráfico del ciclista"], "Art. 81.2 Ley 39/2015."],
        [S2, "dificil", "Si en lugar de la propuesta de resolución el instructor planteara terminar mediante acuerdo con el ciclista, remitiría:", ["La propuesta de acuerdo de terminación convencional", "Nada", "Solo el informe del servicio"], "Art. 81.2 Ley 39/2015."],
        [S2, "media", "Si el ciclista hubiera reclamado 30.000 euros, el dictamen:", ["No sería preceptivo por la cuantía, salvo otra previsión legal", "Seguiría siendo preceptivo", "Sería vinculante"], "Art. 81.2 Ley 39/2015."],
        [S1, "media", "Si el instructor quisiera además un informe de la Policía Local sobre el accidente:", ["Podría pedirlo motivando su conveniencia", "No podría", "Debería pedirlo el ciclista"], "Art. 79.1 Ley 39/2015."],
        [S1, "media", "Ese informe de la Policía, salvo norma en contrario, sería:", ["Facultativo y no vinculante", "Preceptivo y vinculante", "Vinculante"], "Art. 80.1 Ley 39/2015."],
      ],
    },
    {
      slug: "adm-ayto-peticion-informe-mal-hecha",
      titulo: "Una petición de informe mal planteada",
      supuesto: "Un compañero nuevo prepara una petición de informe al Servicio Jurídico en un expediente de concesión de subvención. Escribe solo: «Se ruega informe sobre el expediente adjunto». No cita ninguna norma ni explica por qué lo pide. Te pide que la revises.",
      preguntas: [
        [S1, "media", "La petición debe concretar:", ["El extremo o extremos sobre los que se solicita", "El sentido del informe", "El nombre del jurista"], "Art. 79.2 Ley 39/2015."],
        [S1, "media", "Si el informe es preceptivo, la petición debe:", ["Citar el precepto que lo exige", "Indicar la urgencia sin más", "Ir firmada por el interesado"], "Art. 79.1 Ley 39/2015."],
        [S1, "media", "Si no es preceptivo, la petición debe:", ["Fundamentar la conveniencia de reclamarlo", "No pedirse nunca", "Pedirse verbalmente"], "Art. 79.1 Ley 39/2015."],
        [S1, "facil", "El informe del Servicio Jurídico, salvo norma en contrario, será:", ["Facultativo y no vinculante", "Vinculante", "Preceptivo y vinculante"], "Art. 80.1 Ley 39/2015."],
        [S1, "media", "Si la tramitación exige un plazo menor para no incumplir otros plazos, el informe:", ["Puede tener un plazo distinto de los diez días", "Siempre tiene diez días", "Siempre tiene un mes"], "Art. 80.2 Ley 39/2015."],
        [S1, "media", "Los informes se solicitan a efectos de:", ["La resolución del procedimiento", "La ejecución de sanciones", "La revisión de oficio exclusivamente"], "Art. 79.1 Ley 39/2015."],
        [S1, "dificil", "Los informes deben emitirse conforme a los requisitos del art. 26, que se refiere a:", ["La emisión de documentos administrativos electrónicos", "La firma manuscrita", "El silencio administrativo"], "Art. 80.2 Ley 39/2015."],
        [S1, "media", "Si el Servicio Jurídico no contesta y el informe es facultativo, el instructor:", ["Puede proseguir las actuaciones", "Debe archivar", "Debe esperar indefinidamente"], "Art. 80.3 Ley 39/2015."],
        [S2, "media", "Si el expediente fuera de responsabilidad patrimonial, sería preceptivo además el informe:", ["Del servicio cuyo funcionamiento causó la presunta lesión", "Del Tribunal de Cuentas", "Del interesado"], "Art. 81.1 Ley 39/2015."],
        [S1, "media", "Una petición genérica como la del compañero incumple:", ["La obligación de concretar los extremos del informe", "La obligación de firmar el interesado", "Nada, es correcta"], "Art. 79.2 Ley 39/2015."],
      ],
    },
  ],
});
