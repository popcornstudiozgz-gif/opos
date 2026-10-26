/**
 * Crea tema-440 — Tema 18 de Administrativa/o (Ayto. Zaragoza, promoción
 * interna, CONV 5.2bis/2025): "Ley del Procedimiento Administrativo Común de
 * las Administraciones Públicas (X): iniciación del procedimiento de oficio
 * por la administración."
 *
 * Fuente: Ley 39/2015 (BOE-A-2015-10565), Título IV, Capítulo II, Sección 2.ª,
 * arts. 58 a 65, texto consolidado leído íntegro (content-raw/ley-39-2015-
 * procedimiento-administrativo; consolidado del BOE actualizado a
 * 06-11-2024, sin cambios posteriores).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-440-iniciacion-de-oficio.mjs
 */
import { sembrarTema, ADMIN_AYTO } from "./lib/sembrar-tema.mjs";

const L = ADMIN_AYTO.ley39;
const S1 = "formas-iniciacion-de-oficio";
const S2 = "denuncia";
const S3 = "inicio-sancionador-responsabilidad-patrimonial";

await sembrarTema({
  tema: {
    slug: "tema-440",
    titulo: "Iniciación del procedimiento de oficio por la Administración",
    descripcion: "Ley 39/2015, Título IV, Capítulo II, Sección 2.ª (arts. 58 a 65): iniciación de oficio por acuerdo del órgano competente; propia iniciativa, orden superior, petición razonada de otros órganos y denuncia; contenido de la denuncia, exención o reducción de la multa al denunciante que colabora y ausencia de condición de interesado; especialidades de los procedimientos sancionadores (siempre de oficio, separación instrucción-resolución, contenido del acuerdo de iniciación, pliego de cargos) y de responsabilidad patrimonial (plazo de diez días para los lesionados).",
    contenido: "Cómo empieza la Administración un procedimiento por sí misma: siempre por acuerdo del órgano competente, que puede actuar por propia iniciativa, por orden de un superior, por petición razonada de otro órgano sin competencia o por denuncia de cualquier persona. La denuncia debe identificar al denunciante y relatar los hechos, pero no le da la condición de interesado. Los procedimientos sancionadores se inician siempre de oficio, separan instructor y órgano que resuelve, y su acuerdo de iniciación tiene un contenido mínimo; los de responsabilidad patrimonial de oficio exigen que no haya prescrito el derecho y dan diez días a los lesionados para alegar.",
    enlaces_boe: [{ url: L, titulo: "Ley 39/2015, de 1 de octubre, del Procedimiento Administrativo Común de las Administraciones Públicas (BOE-A-2015-10565)" }],
    indice_estudio: [
      { seccion: S1, titulo: "Iniciación de oficio: propia iniciativa, orden superior y petición razonada", articulos: "arts. 58 a 61", url: `${L}#a58` },
      { seccion: S2, titulo: "Inicio por denuncia", articulos: "art. 62", url: `${L}#a62` },
      { seccion: S3, titulo: "Especialidades sancionadoras y de responsabilidad patrimonial", articulos: "arts. 63 a 65", url: `${L}#a63` },
    ],
  },
  vinculo: { oposicion: ADMIN_AYTO.oposicion, bloqueId: ADMIN_AYTO.bloqueParte2, numero: 18 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["¿Cómo se inician los procedimientos de oficio (art. 58)?", "Por acuerdo del órgano competente, por propia iniciativa, por orden superior, por petición razonada de otros órganos o por denuncia"],
        ["Propia iniciativa (art. 59)", "Actuación derivada del conocimiento directo o indirecto de los hechos por el órgano que tiene la competencia de iniciación"],
        ["Orden superior (art. 60.1)", "La emitida por un órgano superior jerárquico del competente para iniciar"],
        ["Contenido de la orden superior en procedimientos sancionadores (art. 60.2)", "En lo posible: presuntos responsables, hechos y su tipificación, lugar y fecha o periodo de los hechos"],
        ["Petición razonada (art. 61.1)", "Propuesta de iniciación de un órgano sin competencia para iniciar que conoce los hechos ocasionalmente o por sus funciones de inspección, averiguación o investigación"],
        ["¿Vincula la petición razonada (art. 61.2)?", "No, pero el órgano competente debe comunicar al peticionario los motivos por los que no inicia"],
        ["Petición razonada en responsabilidad patrimonial (art. 61.4)", "Debe individualizar la lesión, su relación de causalidad con el servicio público, su evaluación económica si es posible y el momento en que se produjo"],
      ],
      preguntas: [
        ["facil", "Los procedimientos se iniciarán de oficio por acuerdo del órgano competente, entre otros supuestos:", ["A petición razonada de otros órganos", "A solicitud del interesado", "Por silencio administrativo"], "Art. 58 Ley 39/2015."],
        ["media", "La orden superior es la emitida por:", ["Un órgano administrativo superior jerárquico del competente para la iniciación", "Cualquier órgano de otra Administración", "El Pleno en todo caso"], "Art. 60.1 Ley 39/2015."],
        ["media", "La petición razonada de otro órgano:", ["No vincula al órgano competente, que debe comunicar los motivos si no inicia", "Obliga a iniciar el procedimiento", "Equivale a una denuncia anónima"], "Art. 61.2 Ley 39/2015."],
        ["media", "Se entiende por propia iniciativa la actuación derivada:", ["Del conocimiento directo o indirecto de los hechos por el órgano competente para iniciar", "De la solicitud de un interesado", "De una sentencia judicial"], "Art. 59 Ley 39/2015."],
        ["dificil", "En responsabilidad patrimonial, la petición razonada debe individualizar, entre otros extremos:", ["La relación de causalidad de la lesión con el funcionamiento del servicio público", "La identidad del funcionario responsable y su sanción", "La partida presupuestaria del pago"], "Art. 61.4 Ley 39/2015."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Denuncia (art. 62.1)", "Acto por el que cualquier persona, cumpliendo o no una obligación legal, pone en conocimiento de un órgano un hecho que podría justificar iniciar un procedimiento de oficio"],
        ["Contenido de la denuncia (art. 62.2)", "Identidad de quien la presenta y relato de los hechos; si pueden ser infracción, fecha de comisión e identificación de los presuntos responsables cuando sea posible"],
        ["Denuncia sobre perjuicio al patrimonio público (art. 62.3)", "La no iniciación debe motivarse y se notifica a los denunciantes si se ha iniciado o no el procedimiento"],
        ["Exención de multa al denunciante partícipe (art. 62.4)", "Si es el primero en aportar pruebas que permitan iniciar o comprobar la infracción, cuando no hubiera elementos suficientes, y repara el perjuicio"],
        ["Reducción de la sanción al denunciante partícipe (art. 62.4)", "Si no cumple las condiciones de exención pero aporta pruebas con valor añadido significativo"],
        ["Requisitos comunes de la exención o reducción (art. 62.4)", "Que el denunciante cese en la infracción y no haya destruido pruebas"],
        ["¿Es interesado el denunciante (art. 62.5)?", "La denuncia no confiere por sí sola la condición de interesado"],
      ],
      preguntas: [
        ["facil", "La presentación de una denuncia:", ["No confiere, por sí sola, la condición de interesado", "Convierte al denunciante en interesado", "Inicia automáticamente el procedimiento"], "Art. 62.5 Ley 39/2015."],
        ["media", "Las denuncias deben expresar:", ["La identidad de quien las presenta y el relato de los hechos", "Solo el relato de los hechos, pudiendo ser anónimas", "La sanción que debe imponerse"], "Art. 62.2 Ley 39/2015."],
        ["media", "Cuando la denuncia invoca un perjuicio en el patrimonio de las Administraciones Públicas, la no iniciación del procedimiento:", ["Debe ser motivada y notificarse a los denunciantes", "No necesita motivación", "Se publica en el BOE"], "Art. 62.3 Ley 39/2015."],
        ["dificil", "El denunciante que participó en la infracción será eximido de la multa si, entre otros requisitos:", ["Es el primero en aportar pruebas que permitan iniciar el procedimiento o comprobar la infracción", "Paga la mitad de la multa", "Denuncia en el plazo de un mes"], "Art. 62.4 Ley 39/2015."],
        ["media", "Para la exención o reducción de la sanción al denunciante partícipe es necesario en ambos casos que:", ["Cese en la infracción y no haya destruido pruebas", "Sea funcionario público", "Renuncie a recurrir"], "Art. 62.4, último párrafo, Ley 39/2015."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Inicio de los procedimientos sancionadores (art. 63.1)", "Siempre de oficio, por acuerdo del órgano competente, separando la fase instructora y la sancionadora en órganos distintos"],
        ["Sanción sin procedimiento (art. 63.2)", "En ningún caso puede imponerse una sanción sin haberse tramitado el procedimiento"],
        ["Infracción continuada (art. 63.3)", "No pueden iniciarse nuevos procedimientos por la misma infracción continuada mientras no haya una primera resolución sancionadora ejecutiva"],
        ["Contenido mínimo del acuerdo de iniciación sancionador (art. 64.2)", "Presuntos responsables; hechos, posible calificación y sanciones; instructor y secretario con régimen de recusación; órgano competente y norma, y posibilidad de reconocer la responsabilidad; medidas provisionales; derecho a alegar y audiencia y plazos"],
        ["Acuerdo de iniciación como propuesta de resolución (art. 64.2.f)", "Si el interesado no alega en plazo, puede considerarse propuesta de resolución cuando contenga un pronunciamiento preciso sobre la responsabilidad"],
        ["Pliego de cargos (art. 64.3)", "Excepcionalmente, si no hay elementos para la calificación inicial, se hace después en un pliego de cargos notificado a los interesados"],
        ["Responsabilidad patrimonial de oficio (art. 65)", "Exige que no haya prescrito el derecho a reclamar; los presuntos lesionados tienen diez días para alegar y proponer prueba; se instruye aunque no se personen"],
      ],
      preguntas: [
        ["facil", "Los procedimientos de naturaleza sancionadora se iniciarán:", ["Siempre de oficio", "Siempre a solicitud del interesado", "De oficio o a solicitud, indistintamente"], "Art. 63.1 Ley 39/2015."],
        ["media", "En los procedimientos sancionadores, la fase instructora y la sancionadora se encomiendan:", ["A órganos distintos", "Al mismo órgano", "Al denunciante y al órgano competente"], "Art. 63.1 Ley 39/2015."],
        ["media", "El acuerdo de iniciación del procedimiento sancionador se notificará a los interesados, entendiendo en todo caso por tal:", ["Al inculpado", "Al denunciante", "Al instructor"], "Art. 64.1 Ley 39/2015."],
        ["media", "Cuando al dictar el acuerdo de iniciación no hay elementos suficientes para la calificación inicial de los hechos, esta se hace después en:", ["Un pliego de cargos notificado a los interesados", "La resolución final directamente", "Un informe del denunciante"], "Art. 64.3 Ley 39/2015."],
        ["dificil", "Si el inculpado no formula alegaciones en plazo, el acuerdo de iniciación podrá considerarse propuesta de resolución cuando:", ["Contenga un pronunciamiento preciso acerca de la responsabilidad imputada", "Lo pida el denunciante", "Haya transcurrido un año"], "Art. 64.2.f) Ley 39/2015."],
        ["media", "En un procedimiento de responsabilidad patrimonial iniciado de oficio, los particulares presuntamente lesionados disponen para alegar y proponer prueba de:", ["Diez días", "Quince días", "Un mes"], "Art. 65.2 Ley 39/2015."],
        ["media", "Si los presuntos lesionados no se personan en el procedimiento de responsabilidad patrimonial iniciado de oficio:", ["El procedimiento se instruye igualmente", "Se archiva", "Caduca"], "Art. 65.2 Ley 39/2015."],
      ],
    },
  ],
  glosario: [
    [S1, "Petición razonada", "Propuesta de iniciación que formula un órgano sin competencia para iniciar; no vincula (art. 61)."],
    [S1, "Orden superior", "Mandato del superior jerárquico del órgano competente para que inicie un procedimiento (art. 60)."],
    [S2, "Denuncia", "Comunicación de cualquier persona a la Administración de hechos que podrían justificar iniciar de oficio un procedimiento (art. 62)."],
    [S3, "Instructor", "Órgano o persona que tramita el procedimiento sancionador, distinto del que resuelve (art. 63.1)."],
    [S3, "Pliego de cargos", "Documento posterior al acuerdo de iniciación que concreta la calificación de los hechos cuando al iniciar no se pudo (art. 64.3)."],
    [S3, "Inculpado", "Persona a la que se imputa la infracción en un procedimiento sancionador; es siempre interesado (art. 64.1)."],
  ],
  casos: [
    {
      slug: "adm-ayto-denuncia-vecino-ruido",
      titulo: "La denuncia de un vecino por obras sin licencia",
      supuesto: "Un vecino presenta en el registro un escrito en el que cuenta que en el local de enfrente se están haciendo obras sin licencia desde hace un mes. Da su nombre, DNI y domicilio. Días después pide que le notifiquen todos los trámites porque se considera interesado. El servicio de disciplina urbanística decide iniciar un procedimiento sancionador.",
      preguntas: [
        [S2, "facil", "El escrito del vecino es:", ["Una denuncia", "Una solicitud de iniciación", "Una petición razonada"], "Art. 62.1 Ley 39/2015."],
        [S2, "media", "La denuncia debe contener:", ["La identidad del denunciante y el relato de los hechos", "La sanción propuesta", "La firma de un abogado"], "Art. 62.2 Ley 39/2015."],
        [S2, "media", "Si los hechos pueden ser infracción, la denuncia recogerá además:", ["La fecha de comisión y, si es posible, los presuntos responsables", "El importe de la multa", "La ordenanza fiscal aplicable"], "Art. 62.2 Ley 39/2015."],
        [S2, "media", "¿Es el vecino interesado por haber denunciado?", ["No, la denuncia no le confiere por sí sola esa condición", "Sí, siempre", "Sí, si lo pide por escrito"], "Art. 62.5 Ley 39/2015."],
        [S3, "facil", "El procedimiento sancionador se inicia:", ["De oficio, por acuerdo del órgano competente", "A solicitud del vecino", "Automáticamente con la denuncia"], "Arts. 58 y 63.1 Ley 39/2015."],
        [S3, "media", "El acuerdo de iniciación se notificará:", ["A los interesados, y en todo caso al inculpado", "Solo al vecino", "Solo al instructor"], "Art. 64.1 Ley 39/2015."],
        [S3, "media", "Al vecino se le comunicará la incoación:", ["Cuando las normas reguladoras del procedimiento así lo prevean", "Siempre", "Nunca"], "Art. 64.1, párrafo segundo, Ley 39/2015."],
        [S3, "media", "El acuerdo de iniciación debe identificar al instructor e indicar:", ["El régimen de recusación", "Su retribución", "Su antigüedad"], "Art. 64.2.c) Ley 39/2015."],
        [S3, "dificil", "El acuerdo de iniciación debe indicar también la posibilidad de que el presunto responsable:", ["Reconozca voluntariamente su responsabilidad, con los efectos del art. 85", "Elija al instructor", "Pague la multa a plazos sin intereses"], "Art. 64.2.d) Ley 39/2015."],
        [S3, "media", "Si las obras continúan cada día, mientras no haya una primera resolución sancionadora ejecutiva:", ["No pueden iniciarse nuevos procedimientos sancionadores por esa infracción continuada", "Debe iniciarse un procedimiento por cada día", "Debe archivarse el primero"], "Art. 63.3 Ley 39/2015."],
      ],
    },
    {
      slug: "adm-ayto-policia-peticion-razonada",
      titulo: "La Policía Local pide abrir un expediente",
      supuesto: "Una patrulla de Policía Local, que no tiene competencia para sancionar en materia de residuos, detecta que una empresa deja cada noche contenedores de obra en la acera sin autorización. Remite al servicio competente un informe proponiendo iniciar un procedimiento sancionador. A la vez, la concejala delegada, superior del jefe de ese servicio, le ordena por escrito que inicie el expediente.",
      preguntas: [
        [S1, "media", "El informe de la Policía Local es:", ["Una petición razonada", "Una denuncia de un particular", "Una orden superior"], "Art. 61.1 Ley 39/2015."],
        [S1, "media", "¿Obliga ese informe a iniciar el procedimiento?", ["No, pero si no se inicia deben comunicarse los motivos a la Policía", "Sí, siempre", "Solo si lo firma el jefe de Policía"], "Art. 61.2 Ley 39/2015."],
        [S1, "media", "En un procedimiento sancionador, la petición razonada debe especificar en lo posible:", ["Presuntos responsables, hechos y su tipificación, lugar y fechas", "Solo el lugar", "La sanción concreta"], "Art. 61.3 Ley 39/2015."],
        [S1, "media", "El escrito de la concejala es:", ["Una orden superior", "Una petición razonada", "Una denuncia"], "Art. 60.1 Ley 39/2015."],
        [S1, "dificil", "La orden superior en un procedimiento sancionador expresará, en la medida de lo posible:", ["Los presuntos responsables, los hechos y su tipificación, y el lugar y fecha", "Solo el nombre del instructor", "La cuantía de la sanción"], "Art. 60.2 Ley 39/2015."],
        [S1, "facil", "En todo caso, el procedimiento se iniciará por:", ["Acuerdo del órgano competente", "Acuerdo de la Policía Local", "Acuerdo de la empresa"], "Art. 58 Ley 39/2015."],
        [S3, "media", "Quien instruya el expediente:", ["Debe ser un órgano distinto del que resuelva", "Puede ser la concejala que lo ordena y resuelve", "Debe ser la propia Policía Local"], "Art. 63.1 Ley 39/2015."],
        [S3, "media", "¿Podría imponerse la multa directamente con el informe policial, sin procedimiento?", ["No, en ningún caso se impone una sanción sin procedimiento", "Sí, si la infracción es leve", "Sí, si la empresa no alega"], "Art. 63.2 Ley 39/2015."],
        [S3, "media", "El acuerdo de iniciación debe recoger las medidas provisionales:", ["Que haya acordado el órgano competente para iniciar", "Que proponga la empresa", "No las recoge nunca"], "Art. 64.2.e) Ley 39/2015."],
        [S3, "media", "El acuerdo debe indicar el derecho a formular alegaciones y:", ["A la audiencia, con sus plazos", "A elegir el órgano que resuelve", "A no ser sancionado"], "Art. 64.2.f) Ley 39/2015."],
      ],
    },
    {
      slug: "adm-ayto-arbol-caido-patrimonial",
      titulo: "Un árbol cae sobre varios coches",
      supuesto: "Tras un temporal, un árbol de un parque municipal cae sobre tres coches aparcados. El Ayuntamiento decide iniciar de oficio un procedimiento de responsabilidad patrimonial. Uno de los propietarios, además, había participado con otros en talas ilegales en el mismo parque y ahora aporta pruebas que permiten descubrirlas.",
      preguntas: [
        [S3, "media", "Para iniciar de oficio la responsabilidad patrimonial es necesario que:", ["No haya prescrito el derecho de los interesados a reclamar", "Los propietarios lo soliciten", "Haya sentencia judicial"], "Art. 65.1 Ley 39/2015."],
        [S3, "media", "El acuerdo de iniciación se notificará a los propietarios dándoles para alegar y proponer prueba:", ["Diez días", "Cinco días", "Veinte días"], "Art. 65.2 Ley 39/2015."],
        [S3, "media", "Si un propietario no se persona:", ["El procedimiento se instruye igualmente", "Se archiva para él", "Pierde el derecho a indemnización"], "Art. 65.2 Ley 39/2015."],
        [S1, "media", "Si el servicio de Parques comunicara los daños a Patrimonio para que inicie el expediente, su escrito debería individualizar:", ["La lesión, la relación de causalidad, la evaluación económica y el momento de la lesión", "Solo las matrículas", "Solo la especie del árbol"], "Art. 61.4 Ley 39/2015."],
        [S2, "media", "Respecto a las talas ilegales, el propietario que aporta pruebas actúa como:", ["Denunciante", "Instructor", "Peticionario razonado"], "Art. 62.1 Ley 39/2015."],
        [S2, "dificil", "Podrá quedar exento de la multa si es el primero en aportar pruebas, no había elementos suficientes para ordenar el procedimiento y:", ["Repara el perjuicio causado", "Paga una fianza", "Renuncia a la indemnización por su coche"], "Art. 62.4 Ley 39/2015."],
        [S2, "media", "Si no cumple esas condiciones pero aporta pruebas con valor añadido significativo:", ["Se le reducirá la multa o la sanción no pecuniaria", "Se le eximirá igualmente", "No tendrá ningún beneficio"], "Art. 62.4, párrafo segundo, Ley 39/2015."],
        [S2, "media", "En cualquier caso, para obtener el beneficio debe:", ["Cesar en la infracción y no haber destruido pruebas", "Ser vecino de Zaragoza", "Haber denunciado ante la Policía"], "Art. 62.4, último párrafo, Ley 39/2015."],
        [S3, "media", "El procedimiento sancionador por las talas se iniciará:", ["De oficio", "A solicitud del propietario denunciante", "Por el juez"], "Art. 63.1 Ley 39/2015."],
        [S1, "facil", "Si el concejal de Medio Ambiente conociera directamente las talas por estar presente, el inicio sería por:", ["Propia iniciativa del órgano competente, si es él quien debe iniciar", "Denuncia", "Petición razonada"], "Art. 59 Ley 39/2015."],
      ],
    },
  ],
});
