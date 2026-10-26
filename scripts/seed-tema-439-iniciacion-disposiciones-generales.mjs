/**
 * Crea tema-439 — Tema 17 de Administrativa/o (Ayto. Zaragoza, promoción
 * interna, CONV 5.2bis/2025): "Ley del Procedimiento Administrativo Común de
 * las Administraciones Públicas (IX): iniciación del procedimiento.
 * Disposiciones generales."
 *
 * Fuente: Ley 39/2015 (BOE-A-2015-10565), Título IV, Capítulo II, Sección 1.ª,
 * arts. 54 a 57, texto consolidado leído íntegro (content-raw/ley-39-2015-
 * procedimiento-administrativo; consolidado del BOE actualizado a
 * 06-11-2024, sin cambios posteriores).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-439-iniciacion-disposiciones-generales.mjs
 */
import { sembrarTema, ADMIN_AYTO } from "./lib/sembrar-tema.mjs";

const L = ADMIN_AYTO.ley39;
const S1 = "clases-iniciacion-actuaciones-previas";
const S2 = "medidas-provisionales";
const S3 = "acumulacion-procedimientos";

await sembrarTema({
  tema: {
    slug: "tema-439",
    titulo: "Iniciación del procedimiento: disposiciones generales",
    descripcion: "Ley 39/2015, Título IV, Capítulo II, Sección 1.ª (arts. 54 a 57): iniciación de oficio o a solicitud del interesado; información y actuaciones previas, con su contenido en los procedimientos sancionadores; medidas provisionales durante el procedimiento y antes de su inicio (urgencia inaplazable, confirmación en quince días), catálogo, límites, modificación y extinción; acumulación de procedimientos y su irrecurribilidad.",
    contenido: "Cómo empieza un procedimiento: de oficio o a solicitud del interesado. Antes de iniciarlo, la Administración puede hacer actuaciones previas para conocer el caso. Una vez iniciado, el órgano que resuelve puede adoptar medidas provisionales motivadas (suspender actividades, exigir fianzas, cerrar temporalmente un local...) para asegurar la resolución; en casos de urgencia inaplazable pueden adoptarse incluso antes, pero deben confirmarse en el acuerdo de iniciación dentro de quince días o quedan sin efecto. Los procedimientos con identidad sustancial o íntima conexión pueden acumularse si los tramita y resuelve el mismo órgano, y contra ese acuerdo no cabe recurso.",
    enlaces_boe: [{ url: L, titulo: "Ley 39/2015, de 1 de octubre, del Procedimiento Administrativo Común de las Administraciones Públicas (BOE-A-2015-10565)" }],
    indice_estudio: [
      { seccion: S1, titulo: "Clases de iniciación e información y actuaciones previas", articulos: "arts. 54 y 55", url: `${L}#a54` },
      { seccion: S2, titulo: "Medidas provisionales", articulos: "art. 56", url: `${L}#a56` },
      { seccion: S3, titulo: "Acumulación", articulos: "art. 57", url: `${L}#a57` },
    ],
  },
  vinculo: { oposicion: ADMIN_AYTO.oposicion, bloqueId: ADMIN_AYTO.bloqueParte2, numero: 17 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Clases de iniciación (art. 54)", "De oficio o a solicitud del interesado"],
        ["Finalidad de la información o actuaciones previas (art. 55.1)", "Conocer las circunstancias del caso concreto y la conveniencia o no de iniciar el procedimiento"],
        ["¿Quién puede abrir actuaciones previas (art. 55.1)?", "El órgano competente, antes del inicio del procedimiento"],
        ["Objeto de las actuaciones previas en procedimientos sancionadores (art. 55.2)", "Determinar con la mayor precisión posible los hechos, la identificación de los posibles responsables y las circunstancias relevantes"],
        ["¿Quién realiza las actuaciones previas sancionadoras (art. 55.2)?", "Los órganos con funciones de investigación, averiguación e inspección en la materia o, en su defecto, la persona u órgano que determine el competente para iniciar o resolver"],
      ],
      preguntas: [
        ["facil", "Según el art. 54 de la Ley 39/2015, los procedimientos podrán iniciarse:", ["De oficio o a solicitud del interesado", "Solo de oficio", "Solo a solicitud del interesado"], "Art. 54 Ley 39/2015."],
        ["media", "El periodo de información o actuaciones previas se abre:", ["Con anterioridad al inicio del procedimiento", "Una vez dictada la propuesta de resolución", "Después de la resolución, para ejecutarla"], "Art. 55.1 Ley 39/2015."],
        ["media", "En los procedimientos sancionadores, las actuaciones previas se orientan a determinar:", ["Los hechos, los posibles responsables y las circunstancias relevantes", "Solo la cuantía de la sanción", "La firmeza de la resolución"], "Art. 55.2 Ley 39/2015."],
        ["dificil", "Las actuaciones previas sancionadoras las realizan, en defecto de órganos con funciones de inspección en la materia:", ["La persona u órgano que determine el órgano competente para iniciar o resolver", "El propio denunciante", "El Pleno municipal"], "Art. 55.2, párrafo segundo, Ley 39/2015."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Medidas provisionales iniciado el procedimiento (art. 56.1)", "Las adopta el órgano competente para resolver, de oficio o a instancia de parte, motivadamente, para asegurar la eficacia de la resolución, con elementos de juicio suficientes"],
        ["Principios de las medidas provisionales (art. 56.1)", "Proporcionalidad, efectividad y menor onerosidad"],
        ["Medidas antes de iniciar el procedimiento (art. 56.2)", "En urgencia inaplazable y para proteger provisionalmente los intereses, las adopta el órgano competente para iniciar o instruir"],
        ["Plazo para confirmar las medidas previas (art. 56.2)", "Deben confirmarse, modificarse o levantarse en el acuerdo de iniciación, dictado dentro de los quince días siguientes; si no, quedan sin efecto"],
        ["Ejemplos de medidas provisionales (art. 56.3)", "Suspensión temporal de actividades, fianzas, cierre temporal del establecimiento, embargo preventivo, depósito o inmovilización de cosa mueble, consignación de cantidades, retención de ingresos a cuenta"],
        ["Límite de las medidas provisionales (art. 56.4)", "No pueden causar perjuicio de difícil o imposible reparación ni violar derechos amparados por las leyes"],
        ["Modificación y extinción de las medidas (art. 56.5)", "Pueden alzarse o modificarse por circunstancias sobrevenidas; se extinguen cuando surte efectos la resolución que pone fin al procedimiento"],
      ],
      preguntas: [
        ["facil", "Una vez iniciado el procedimiento, las medidas provisionales las adopta:", ["El órgano competente para resolver", "El instructor en todo caso", "El interesado"], "Art. 56.1 Ley 39/2015."],
        ["media", "Las medidas provisionales adoptadas antes de iniciar el procedimiento quedan sin efecto si el acuerdo de iniciación no se dicta en el plazo de:", ["Quince días siguientes a su adopción", "Diez días siguientes a su adopción", "Un mes desde su adopción"], "Art. 56.2 Ley 39/2015."],
        ["media", "Las medidas provisionales se adoptan de acuerdo con los principios de:", ["Proporcionalidad, efectividad y menor onerosidad", "Celeridad, publicidad y gratuidad", "Jerarquía, competencia y eficacia"], "Art. 56.1 Ley 39/2015."],
        ["media", "No se podrán adoptar medidas provisionales que:", ["Puedan causar perjuicio de difícil o imposible reparación a los interesados", "Supongan un coste para el interesado", "Afecten a una actividad económica"], "Art. 56.4 Ley 39/2015."],
        ["media", "Las medidas provisionales se extinguen:", ["Cuando surta efectos la resolución que ponga fin al procedimiento", "A los seis meses de su adopción", "Cuando el interesado lo pida"], "Art. 56.5 Ley 39/2015."],
        ["dificil", "Las medidas adoptadas antes de iniciar el procedimiento también quedan sin efecto cuando el acuerdo de iniciación:", ["No contenga un pronunciamiento expreso acerca de ellas", "Se notifique por medios electrónicos", "Lo dicte un órgano colegiado"], "Art. 56.2, párrafo segundo, Ley 39/2015."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Acumulación de procedimientos (art. 57)", "El órgano que inicie o tramite un procedimiento puede, de oficio o a instancia de parte, acumularlo a otros con identidad sustancial o íntima conexión"],
        ["Requisito orgánico de la acumulación (art. 57)", "Que sea el mismo órgano quien deba tramitar y resolver los procedimientos"],
        ["Recurso contra el acuerdo de acumulación (art. 57)", "No procede recurso alguno"],
      ],
      preguntas: [
        ["facil", "Contra el acuerdo de acumulación de procedimientos:", ["No procede recurso alguno", "Cabe recurso de alzada", "Cabe recurso potestativo de reposición"], "Art. 57 Ley 39/2015."],
        ["media", "Para acumular procedimientos es necesario que guarden:", ["Identidad sustancial o íntima conexión y que el mismo órgano deba tramitarlos y resolverlos", "Los mismos interesados, aunque los resuelvan órganos distintos", "La misma fecha de inicio"], "Art. 57 Ley 39/2015."],
        ["media", "La acumulación puede acordarse:", ["De oficio o a instancia de parte, cualquiera que haya sido la forma de iniciación", "Solo a instancia de parte", "Solo en procedimientos iniciados de oficio"], "Art. 57 Ley 39/2015."],
      ],
    },
  ],
  glosario: [
    [S1, "Actuaciones previas", "Diligencias anteriores al inicio del procedimiento para conocer el caso y decidir si conviene iniciarlo (art. 55); no forman parte del procedimiento."],
    [S2, "Medida provisional", "Decisión cautelar y motivada que asegura la eficacia de la resolución que pueda dictarse (art. 56)."],
    [S2, "Menor onerosidad", "Principio por el que, entre varias medidas eficaces, debe elegirse la que menos perjudique al interesado."],
    [S2, "Urgencia inaplazable", "Situación que justifica adoptar medidas provisionales antes de iniciar el procedimiento (art. 56.2)."],
    [S3, "Acumulación", "Tramitación conjunta de procedimientos con identidad sustancial o íntima conexión que corresponde tramitar y resolver al mismo órgano (art. 57)."],
  ],
  casos: [
    {
      slug: "adm-ayto-bar-cierre-provisional",
      titulo: "El bar con riesgo de derrumbe",
      supuesto: "Un viernes por la tarde los técnicos municipales detectan grietas graves en el techo de un bar abierto al público. El órgano competente para iniciar el procedimiento ordena de inmediato el cierre temporal del local, antes de abrir ningún expediente. El lunes siguiente se plantea si iniciar un procedimiento de restauración de la legalidad y si hace falta investigar antes.",
      preguntas: [
        [S2, "media", "¿Se pueden adoptar medidas provisionales antes de iniciar el procedimiento?", ["Sí, en casos de urgencia inaplazable y para proteger provisionalmente los intereses implicados", "No, nunca", "Solo si lo pide el dueño del bar"], "Art. 56.2 Ley 39/2015."],
        [S2, "media", "Antes de iniciar el procedimiento, la medida la adopta:", ["El órgano competente para iniciar o instruir", "Exclusivamente el Pleno", "El técnico que vio las grietas"], "Art. 56.2 Ley 39/2015."],
        [S2, "media", "El acuerdo de iniciación debe dictarse:", ["Dentro de los quince días siguientes a la adopción del cierre", "Dentro del mes siguiente", "Cuando lo decida el órgano, sin plazo"], "Art. 56.2 Ley 39/2015."],
        [S2, "media", "En ese acuerdo de iniciación, el cierre debe ser:", ["Confirmado, modificado o levantado", "Ignorado", "Elevado a definitivo"], "Art. 56.2 Ley 39/2015."],
        [S2, "dificil", "Si el acuerdo de iniciación se dicta a tiempo pero no dice nada sobre el cierre:", ["El cierre queda sin efecto", "El cierre se mantiene automáticamente", "El cierre se convierte en sanción"], "Art. 56.2, párrafo segundo, Ley 39/2015."],
        [S2, "facil", "El cierre temporal del establecimiento por razones de seguridad es una medida provisional:", ["Prevista expresamente en la Ley", "Prohibida por la Ley", "Solo posible por orden judicial"], "Art. 56.3.c) Ley 39/2015."],
        [S2, "media", "La medida debe adoptarse:", ["De forma motivada y proporcionada", "Verbalmente y sin motivación", "Solo con el consentimiento del dueño"], "Art. 56.2 Ley 39/2015."],
        [S1, "media", "Si el órgano duda sobre los hechos, antes de iniciar el procedimiento puede:", ["Abrir un periodo de información o actuaciones previas", "Dictar directamente la resolución final", "Archivar sin más"], "Art. 55.1 Ley 39/2015."],
        [S2, "media", "Si durante el procedimiento se repara el techo, el cierre puede:", ["Alzarse por circunstancias sobrevenidas", "Mantenerse siempre hasta la resolución", "Convertirse en multa"], "Art. 56.5 Ley 39/2015."],
        [S2, "media", "Contra el acuerdo de iniciación que confirma el cierre:", ["Cabe el recurso que proceda", "No cabe ningún recurso", "Solo cabe queja ante el Justicia"], "Art. 56.2 Ley 39/2015."],
      ],
    },
    {
      slug: "adm-ayto-ocupaciones-acumulacion",
      titulo: "Tres expedientes por la misma terraza",
      supuesto: "En la unidad de licencias se tramitan tres procedimientos sobre la misma terraza de un restaurante: una solicitud de ampliación presentada por el titular, un expediente iniciado de oficio por exceso de mesas y otro iniciado tras la queja de un vecino. Los tres corresponden tramitarlos y resolverlos a la misma jefatura. El titular pide que se tramiten juntos.",
      preguntas: [
        [S3, "media", "¿Pueden acumularse los tres procedimientos?", ["Sí, si guardan identidad sustancial o íntima conexión y los tramita y resuelve el mismo órgano", "No, porque unos se iniciaron de oficio y otro a solicitud", "No, la acumulación solo cabe a petición de todos los interesados"], "Art. 57 Ley 39/2015."],
        [S3, "facil", "¿Importa que la forma de iniciación de cada uno sea distinta?", ["No, la acumulación cabe cualquiera que haya sido la forma de iniciación", "Sí, solo se acumulan los iniciados de oficio", "Sí, solo se acumulan los iniciados a solicitud"], "Art. 57 Ley 39/2015."],
        [S3, "media", "La acumulación puede acordarse a petición del titular:", ["Sí, de oficio o a instancia de parte", "No, solo de oficio", "Solo si paga una tasa"], "Art. 57 Ley 39/2015."],
        [S3, "media", "Si el vecino no está conforme con la acumulación:", ["No puede recurrir el acuerdo de acumulación", "Puede interponer recurso de alzada", "Puede interponer recurso de reposición"], "Art. 57 Ley 39/2015."],
        [S3, "dificil", "Si uno de los expedientes lo tuviera que resolver otro órgano distinto:", ["No podría acumularse a los demás", "Se acumularía igualmente", "Se acumularía si lo pide el interesado"], "Art. 57 Ley 39/2015."],
        [S1, "facil", "El expediente por exceso de mesas se ha iniciado:", ["De oficio", "A solicitud del interesado", "Por silencio administrativo"], "Art. 54 Ley 39/2015."],
        [S1, "facil", "La solicitud de ampliación se ha iniciado:", ["A solicitud del interesado", "De oficio", "Por actuación previa"], "Art. 54 Ley 39/2015."],
        [S2, "media", "Para asegurar la resolución, la jefatura podría ordenar provisionalmente:", ["La retirada de las mesas que excedan de lo autorizado, de forma motivada", "La clausura definitiva del restaurante", "La imposición de una multa sin procedimiento"], "Art. 56.1 y 56.3 Ley 39/2015."],
        [S2, "media", "La medida provisional elegida debe respetar el principio de:", ["Menor onerosidad", "Máxima severidad", "Publicidad absoluta"], "Art. 56.1 Ley 39/2015."],
        [S2, "media", "La medida provisional no podrá:", ["Implicar violación de derechos amparados por las leyes", "Afectar a la terraza", "Ser motivada"], "Art. 56.4 Ley 39/2015."],
      ],
    },
    {
      slug: "adm-ayto-actuaciones-previas-sancion",
      titulo: "Unas actuaciones previas por vertidos",
      supuesto: "Llega a la Oficina de Medio Ambiente información sobre vertidos de escombros en un solar municipal, sin saber quién los hizo. El jefe del servicio duda si iniciar ya un procedimiento sancionador o investigar primero. Mientras, para evitar más vertidos, se plantea exigir una fianza a la empresa sospechosa.",
      preguntas: [
        [S1, "media", "Antes de iniciar el procedimiento sancionador, el órgano competente puede:", ["Abrir actuaciones previas", "Imponer directamente la sanción", "Pedir al juez que investigue"], "Art. 55.1 Ley 39/2015."],
        [S1, "media", "Las actuaciones previas tratarán de identificar:", ["A los posibles responsables, los hechos y las circunstancias relevantes", "Solo la cuantía de la sanción", "Solo el valor del solar"], "Art. 55.2 Ley 39/2015."],
        [S1, "media", "Deben realizarlas, preferentemente:", ["Los órganos con funciones de investigación, averiguación e inspección en la materia", "Los vecinos afectados", "El órgano que vaya a resolver, en todo caso"], "Art. 55.2 Ley 39/2015."],
        [S1, "media", "Si tras las actuaciones previas no conviene iniciar el procedimiento:", ["Puede no iniciarse, porque su finalidad es decidir la conveniencia de iniciarlo", "Debe iniciarse siempre", "Se impone una sanción mínima"], "Art. 55.1 Ley 39/2015."],
        [S2, "media", "La prestación de fianza es una medida provisional:", ["Prevista en la Ley", "Prohibida en procedimientos sancionadores", "Solo posible tras la resolución"], "Art. 56.3.b) Ley 39/2015."],
        [S2, "media", "Una vez iniciado el procedimiento, la fianza la puede exigir:", ["El órgano competente para resolver, motivadamente", "El inspector sin motivación", "El denunciante"], "Art. 56.1 Ley 39/2015."],
        [S2, "dificil", "Para adoptar la fianza durante el procedimiento hace falta, además:", ["Que existan elementos de juicio suficientes", "Que el interesado esté de acuerdo", "Que lo autorice un juez"], "Art. 56.1 Ley 39/2015."],
        [S2, "media", "Si se descubre que la empresa no tuvo relación con los vertidos:", ["La fianza puede alzarse por esa circunstancia sobrevenida", "Debe mantenerse hasta la resolución", "Se convierte en sanción"], "Art. 56.5 Ley 39/2015."],
        [S2, "media", "Las medidas provisionales se regulan, en cuanto a sus términos, conforme a:", ["La Ley 1/2000, de Enjuiciamiento Civil", "El Código Penal", "La Ley de Haciendas Locales"], "Art. 56.3 Ley 39/2015."],
        [S1, "facil", "Un procedimiento sancionador como este se iniciará:", ["De oficio", "A solicitud del interesado", "Por la empresa sospechosa"], "Art. 54 Ley 39/2015, en relación con el art. 63.1."],
      ],
    },
  ],
});
