/**
 * Crea tema-443 — Tema 21 de Administrativa/o (Ayto. Zaragoza, promoción
 * interna, CONV 5.2bis/2025): "Ley del Procedimiento Administrativo Común de
 * las Administraciones Públicas (XIII): instrucción del procedimiento.
 * Disposiciones generales."
 *
 * Fuente: Ley 39/2015 (BOE-A-2015-10565), Título IV, Capítulo IV, Sección 1.ª,
 * arts. 75 y 76, texto consolidado leído íntegro (content-raw/ley-39-2015-
 * procedimiento-administrativo; consolidado del BOE actualizado a
 * 06-11-2024, sin cambios posteriores).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-443-instruccion-disposiciones-generales.mjs
 */
import { sembrarTema, ADMIN_AYTO } from "./lib/sembrar-tema.mjs";

const L = ADMIN_AYTO.ley39;
const S1 = "actos-instruccion";
const S2 = "alegaciones-instruccion";

await sembrarTema({
  tema: {
    slug: "tema-443",
    titulo: "Instrucción del procedimiento: disposiciones generales",
    descripcion: "Ley 39/2015, Título IV, Capítulo IV, Sección 1.ª (arts. 75 y 76): actos de instrucción de oficio y por medios electrónicos; requisitos de las aplicaciones de tramitación; práctica de los actos que requieren la intervención de los interesados en la forma más conveniente para ellos; principios de contradicción e igualdad; alegaciones en cualquier momento anterior a la audiencia y alegación de defectos de tramitación en todo momento.",
    contenido: "La instrucción es la fase en la que se reúnen los datos para resolver. Los actos de instrucción los realiza de oficio y por medios electrónicos el órgano que tramita, sin perjuicio de que los interesados propongan actuaciones; cuando requieran su intervención se practican en la forma más cómoda para ellos y compatible con su trabajo. El instructor garantiza la contradicción y la igualdad. Los interesados pueden alegar y aportar documentos en cualquier momento antes de la audiencia, y deben tenerse en cuenta en la propuesta de resolución; los defectos de tramitación (paralización, plazos incumplidos, trámites omitidos) pueden alegarse siempre, y pueden dar lugar a responsabilidad disciplinaria.",
    enlaces_boe: [{ url: L, titulo: "Ley 39/2015, de 1 de octubre, del Procedimiento Administrativo Común de las Administraciones Públicas (BOE-A-2015-10565)" }],
    indice_estudio: [
      { seccion: S1, titulo: "Actos de instrucción", articulos: "art. 75", url: `${L}#a75` },
      { seccion: S2, titulo: "Alegaciones", articulos: "art. 76", url: `${L}#a76` },
    ],
  },
  vinculo: { oposicion: ADMIN_AYTO.oposicion, bloqueId: ADMIN_AYTO.bloqueParte2, numero: 21 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Finalidad de los actos de instrucción (art. 75.1)", "Determinar, conocer y comprobar los hechos sobre los que debe pronunciarse la resolución"],
        ["¿Quién y cómo realiza los actos de instrucción (art. 75.1)?", "De oficio y por medios electrónicos, el órgano que tramita el procedimiento"],
        ["Derecho de los interesados en la instrucción (art. 75.1)", "Proponer las actuaciones que requieran su intervención o constituyan trámites legal o reglamentariamente establecidos"],
        ["Requisitos de las aplicaciones de instrucción (art. 75.2)", "Garantizar el control de tiempos y plazos, la identificación de los órganos responsables y la tramitación ordenada, y facilitar la simplificación y la publicidad"],
        ["Actos que requieren intervención del interesado (art. 75.3)", "Se practican en la forma más conveniente para él y compatible, en lo posible, con sus obligaciones laborales o profesionales"],
        ["Principios que debe respetar el instructor (art. 75.4)", "Contradicción e igualdad de los interesados"],
      ],
      preguntas: [
        ["facil", "Los actos de instrucción se realizarán:", ["De oficio y a través de medios electrónicos por el órgano que tramite el procedimiento", "Solo a instancia del interesado", "Por el órgano que resuelve, en papel"], "Art. 75.1 Ley 39/2015."],
        ["media", "Los actos de instrucción que requieran la intervención de los interesados se practicarán:", ["En la forma más conveniente para ellos y compatible, en lo posible, con sus obligaciones laborales o profesionales", "Siempre por la mañana en la sede del órgano", "Como decida libremente el instructor"], "Art. 75.3 Ley 39/2015."],
        ["media", "El órgano instructor adoptará las medidas necesarias para el pleno respeto de los principios de:", ["Contradicción e igualdad de los interesados", "Jerarquía y descentralización", "Economía y eficiencia"], "Art. 75.4 Ley 39/2015."],
        ["dificil", "Las aplicaciones y sistemas de información de la instrucción deben garantizar, entre otros aspectos:", ["El control de los tiempos y plazos y la identificación de los órganos responsables", "El anonimato del instructor", "La resolución automática de todos los expedientes"], "Art. 75.2 Ley 39/2015."],
        ["media", "La finalidad de los actos de instrucción es:", ["La determinación, conocimiento y comprobación de los hechos sobre los que debe resolverse", "La ejecución forzosa de la resolución", "La revisión de oficio de actos firmes"], "Art. 75.1 Ley 39/2015."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Momento para presentar alegaciones (art. 76.1)", "En cualquier momento del procedimiento anterior al trámite de audiencia"],
        ["Qué pueden aportar los interesados (art. 76.1)", "Alegaciones, documentos u otros elementos de juicio"],
        ["Valor de las alegaciones (art. 76.1)", "Deben ser tenidas en cuenta por el órgano competente al redactar la propuesta de resolución"],
        ["Alegación de defectos de tramitación (art. 76.2)", "En todo momento, especialmente paralización, infracción de plazos preceptivos u omisión de trámites subsanables antes de la resolución"],
        ["Consecuencia de los defectos de tramitación alegados (art. 76.2)", "Si hay razones, pueden dar lugar a exigir responsabilidad disciplinaria"],
      ],
      preguntas: [
        ["facil", "Los interesados pueden aducir alegaciones y aportar documentos:", ["En cualquier momento del procedimiento anterior al trámite de audiencia", "Solo en el trámite de audiencia", "Solo en la solicitud inicial"], "Art. 76.1 Ley 39/2015."],
        ["media", "Las alegaciones y documentos aportados por los interesados serán tenidos en cuenta:", ["Al redactar la propuesta de resolución", "Solo si los aporta un abogado", "Solo en vía de recurso"], "Art. 76.1 Ley 39/2015."],
        ["media", "Los defectos de tramitación, especialmente la paralización o la infracción de plazos, pueden alegarse:", ["En todo momento", "Solo antes de la audiencia", "Solo en el recurso"], "Art. 76.2 Ley 39/2015."],
        ["dificil", "Las alegaciones sobre defectos de tramitación pueden dar lugar, si hay razones para ello, a:", ["La exigencia de responsabilidad disciplinaria", "La nulidad automática del procedimiento", "La condena en costas del interesado"], "Art. 76.2 Ley 39/2015."],
      ],
    },
  ],
  glosario: [
    [S1, "Instrucción", "Fase del procedimiento en la que se reúnen y comprueban los hechos y datos necesarios para resolver (arts. 75 a 83)."],
    [S1, "Principio de contradicción", "Derecho de los interesados a conocer y rebatir los hechos, pruebas y alegaciones de los demás (art. 75.4)."],
    [S1, "Órgano instructor", "Órgano o persona que tramita el procedimiento y practica los actos de instrucción."],
    [S2, "Alegación", "Escrito o manifestación del interesado que expone hechos, razones o argumentos en defensa de su posición (art. 76)."],
    [S2, "Paralización del procedimiento", "Detención injustificada de la tramitación; puede alegarse en todo momento como defecto de tramitación (art. 76.2)."],
  ],
  casos: [
    {
      slug: "adm-ayto-inspeccion-horario-trabajo",
      titulo: "Una inspección en horario de trabajo",
      supuesto: "En un procedimiento de concesión de una ayuda a la rehabilitación, el instructor cita al solicitante, que trabaja a turnos en una fábrica, para una visita de comprobación a su vivienda un martes a las 10:00, justo cuando tiene turno. El solicitante pide que se cambie la cita y presenta, además, unas fotografías y un presupuesto que acreditan el estado de la vivienda.",
      preguntas: [
        [S1, "media", "La visita a la vivienda, que requiere su intervención, debe practicarse:", ["En la forma más conveniente para él y compatible, en lo posible, con su trabajo", "Cuando decida el instructor sin más", "Solo en fin de semana"], "Art. 75.3 Ley 39/2015."],
        [S1, "facil", "La visita de comprobación es un acto de:", ["Instrucción", "Iniciación", "Ejecución"], "Art. 75.1 Ley 39/2015."],
        [S1, "media", "Los actos de instrucción los realiza:", ["De oficio el órgano que tramita el procedimiento", "El solicitante", "El órgano que resuelve, siempre en persona"], "Art. 75.1 Ley 39/2015."],
        [S2, "media", "¿Puede el solicitante aportar las fotografías y el presupuesto en este momento?", ["Sí, en cualquier momento anterior al trámite de audiencia", "No, solo al presentar la solicitud", "No, solo en la audiencia"], "Art. 76.1 Ley 39/2015."],
        [S2, "media", "Esos documentos deben tenerse en cuenta:", ["Al redactar la propuesta de resolución", "Solo si el instructor lo considera oportuno", "Solo en vía de recurso"], "Art. 76.1 Ley 39/2015."],
        [S1, "media", "El instructor debe garantizar, frente a otros solicitantes de la misma ayuda, el principio de:", ["Igualdad", "Jerarquía", "Secreto"], "Art. 75.4 Ley 39/2015."],
        [S1, "media", "El solicitante tiene derecho a proponer actuaciones que:", ["Requieran su intervención o sean trámites legal o reglamentariamente establecidos", "Retrasen el procedimiento", "Sean del interés de un tercero"], "Art. 75.1 Ley 39/2015."],
        [S1, "dificil", "La aplicación de gestión de ayudas debe facilitar:", ["La simplificación y la publicidad de los procedimientos", "El secreto de los plazos", "La resolución sin instrucción"], "Art. 75.2 Ley 39/2015."],
        [S2, "media", "Si el expediente estuviera parado tres meses sin motivo, el solicitante podría:", ["Alegar en todo momento ese defecto de tramitación", "Solo esperar a la resolución", "Pedir directamente la ejecución"], "Art. 76.2 Ley 39/2015."],
        [S1, "media", "Los actos de instrucción se realizan preferentemente a través de:", ["Medios electrónicos", "Comparecencias personales", "Correo postal"], "Art. 75.1 Ley 39/2015."],
      ],
    },
    {
      slug: "adm-ayto-expediente-paralizado",
      titulo: "Un expediente olvidado en un cajón",
      supuesto: "Una asociación de vecinos solicitó hace cinco meses la cesión de un local municipal. El expediente lleva cuatro meses sin ningún trámite y falta un informe que el instructor nunca pidió. La asociación presenta un escrito quejándose de la paralización y aportando un acta de su asamblea; el trámite de audiencia aún no se ha abierto.",
      preguntas: [
        [S2, "facil", "¿Puede la asociación alegar la paralización del expediente?", ["Sí, en todo momento", "No, debe esperar a la resolución", "Solo en la audiencia"], "Art. 76.2 Ley 39/2015."],
        [S2, "media", "Entre los defectos de tramitación que pueden alegarse se encuentran:", ["La paralización, la infracción de plazos y la omisión de trámites subsanables", "Solo la falta de firma", "Solo la incompetencia del órgano"], "Art. 76.2 Ley 39/2015."],
        [S2, "media", "La omisión del informe puede alegarse porque:", ["Es un trámite que puede subsanarse antes de la resolución definitiva", "Hace nulo el procedimiento", "Impide resolver para siempre"], "Art. 76.2 Ley 39/2015."],
        [S2, "dificil", "Si la paralización no tiene justificación, puede dar lugar a:", ["Responsabilidad disciplinaria", "La caducidad automática a favor de la asociación", "Una multa a la asociación"], "Art. 76.2 Ley 39/2015."],
        [S2, "media", "El acta de la asamblea aportada antes de la audiencia:", ["Debe tenerse en cuenta en la propuesta de resolución", "Se devuelve por extemporánea", "Solo se tiene en cuenta si la firma un abogado"], "Art. 76.1 Ley 39/2015."],
        [S1, "media", "El impulso de la instrucción corresponde:", ["Al órgano que tramita, de oficio", "A la asociación", "Al Pleno"], "Art. 75.1 Ley 39/2015."],
        [S1, "media", "Si se cita a la junta directiva de la asociación, debe hacerse en la forma:", ["Más conveniente para ellos y compatible con sus obligaciones", "Que decida el instructor sin límites", "Exclusivamente presencial"], "Art. 75.3 Ley 39/2015."],
        [S1, "media", "Si otra asociación también pide el mismo local, el instructor debe respetar:", ["La contradicción y la igualdad de ambas", "Solo los intereses de la primera", "El orden alfabético"], "Art. 75.4 Ley 39/2015."],
        [S2, "facil", "Las alegaciones pueden acompañarse de:", ["Documentos u otros elementos de juicio", "Solo testigos", "Nada"], "Art. 76.1 Ley 39/2015."],
        [S1, "media", "La aplicación informática del Ayuntamiento debería haber permitido detectar el retraso porque debe garantizar:", ["El control de los tiempos y plazos", "La firma automática", "La resolución sin instructor"], "Art. 75.2 Ley 39/2015."],
      ],
    },
    {
      slug: "adm-ayto-dos-interesados-contradiccion",
      titulo: "Dos vecinos enfrentados por una licencia",
      supuesto: "En un procedimiento de licencia para instalar un toldo en un bajo comercial, un vecino del primer piso se ha personado como interesado oponiéndose. El titular del comercio aporta un informe técnico favorable; el vecino pide conocerlo para rebatirlo. El instructor quiere practicar una medición en la fachada.",
      preguntas: [
        [S1, "media", "Que el vecino pueda conocer y rebatir el informe del comerciante responde al principio de:", ["Contradicción", "Jerarquía", "Oficialidad"], "Art. 75.4 Ley 39/2015."],
        [S1, "media", "El instructor debe tratar a ambos interesados conforme al principio de:", ["Igualdad", "Antigüedad", "Preferencia del solicitante"], "Art. 75.4 Ley 39/2015."],
        [S1, "facil", "La medición en la fachada la acordará:", ["De oficio el órgano que tramita el procedimiento", "El vecino", "El comerciante"], "Art. 75.1 Ley 39/2015."],
        [S2, "media", "El vecino puede presentar alegaciones contra el toldo:", ["En cualquier momento anterior al trámite de audiencia", "Solo después de la resolución", "Solo dentro de los tres primeros días"], "Art. 76.1 Ley 39/2015."],
        [S2, "media", "El informe técnico del comerciante es un:", ["Elemento de juicio aportado por un interesado", "Informe preceptivo de la Administración", "Acto de resolución"], "Art. 76.1 Ley 39/2015."],
        [S1, "media", "Si la medición requiere que el comerciante abra el local, se hará:", ["En la forma más conveniente para él y compatible con su actividad", "A la hora que fije el vecino", "Sin avisarle"], "Art. 75.3 Ley 39/2015."],
        [S2, "media", "Tanto las alegaciones del vecino como el informe del comerciante deben ser tenidos en cuenta:", ["Al redactar la propuesta de resolución", "Solo los del solicitante", "Solo los del vecino"], "Art. 76.1 Ley 39/2015."],
        [S1, "media", "El comerciante puede proponer que se practique una actuación concreta si:", ["Requiere su intervención o es un trámite legal o reglamentario", "Le conviene para retrasar", "Lo autoriza el vecino"], "Art. 75.1 Ley 39/2015."],
        [S2, "dificil", "Si el instructor omite pedir un informe obligatorio de Urbanismo, cualquiera de los dos puede:", ["Alegarlo en todo momento como omisión de un trámite subsanable", "Solo alegarlo tras la resolución", "No puede alegarlo"], "Art. 76.2 Ley 39/2015."],
        [S1, "media", "La instrucción se realiza a través de:", ["Medios electrónicos", "Medios exclusivamente orales", "Medios elegidos por el vecino"], "Art. 75.1 Ley 39/2015."],
      ],
    },
  ],
});
