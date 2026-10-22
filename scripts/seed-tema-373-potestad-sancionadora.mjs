/**
 * Crea tema-373 — Tema 46 de Policía Local: "Normativa reguladora del
 * procedimiento para el ejercicio de la potestad sancionadora."
 *
 * Fuentes (textos vigentes leídos en esta sesión):
 * - Ley 40/2015, de Régimen Jurídico del Sector Público (BOE-A-2015-10566,
 *   título verificado en la API del BOE): arts. 25-31, principios de la
 *   potestad sancionadora.
 * - Ley 39/2015, del Procedimiento Administrativo Común (BOE-A-2015-10565):
 *   arts. 21, 25, 53.2, 56, 62-64, 77, 82, 85, 89, 90 y 96.
 * - Ley 7/1985, Reguladora de las Bases del Régimen Local
 *   (BOE-A-1985-5392): arts. 139-141 (tipificación en ordenanzas y límites
 *   de las multas).
 * - Ordenanza Municipal Reguladora del Procedimiento para el ejercicio de la
 *   Potestad Sancionadora del Ayuntamiento de Zaragoza (Pleno 31-01-2014,
 *   BOPZ nº 34 de 12-02-2014), texto vigente íntegro en
 *   zaragoza.es/sede/servicio/normativa/4886. Remite al Reglamento aragonés
 *   aprobado por Decreto 28/2001, de 30 de enero (no leído en esta sesión:
 *   solo se cita lo que la ordenanza dice de él). Laguna señalada: la
 *   ordenanza sigue citando la Ley 30/1992, sustituida por las Leyes 39 y
 *   40/2015; el tema explica sus reglas propias con la ley vigente.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-373-potestad-sancionadora.mjs
 */
import { sembrarTema, POLICIA } from "./lib/sembrar-tema.mjs";

const L40 = "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10566";
const L39 = "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565";
const LBRL = "https://www.boe.es/buscar/act.php?id=BOE-A-1985-5392";
const OM = "https://www.zaragoza.es/sede/servicio/normativa/4886";
const S1 = "principios-potestad-sancionadora";
const S2 = "prescripcion-concurrencia";
const S3 = "procedimiento-sancionador-lpac";
const S4 = "potestad-sancionadora-local";
const S5 = "ordenanza-zaragoza-procedimiento-sancionador";

await sembrarTema({
  tema: {
    slug: "tema-373",
    titulo: "La potestad sancionadora y su procedimiento (Leyes 39 y 40/2015, LBRL y Ordenanza de Zaragoza)",
    descripcion: "Principios de la potestad sancionadora (Ley 40/2015): legalidad, irretroactividad, tipicidad, responsabilidad, proporcionalidad, prescripción y non bis in idem. Especialidades del procedimiento sancionador en la Ley 39/2015: derechos del presunto responsable, iniciación de oficio y separación de fases, acuerdo de iniciación, medidas provisionales, prueba y valor de las actas, reconocimiento y pago voluntario con reducciones, propuesta y resolución, caducidad, tramitación simplificada. Potestad sancionadora local (LBRL, arts. 139-141). Ordenanza Municipal Reguladora del Procedimiento Sancionador de Zaragoza: responsables, plazo de seis meses, denuncias, requerimiento de cese, pago inmediato y sustitución de la multa por trabajos en beneficio de la comunidad.",
    contenido: "Cómo se pone una multa administrativa de forma válida: qué principios hay que respetar, cuándo prescribe una infracción, qué pasos tiene el expediente desde la denuncia del agente hasta la resolución, qué valor tiene el acta policial y qué descuentos hay por pagar pronto. Incluye las reglas propias de Zaragoza, como la obligación del agente de pedir primero que cese la conducta en las infracciones más leves o la posibilidad de cambiar la multa por trabajos para la comunidad.",
    enlaces_boe: [
      { url: L40, titulo: "Ley 40/2015, de 1 de octubre, de Régimen Jurídico del Sector Público (BOE-A-2015-10566)" },
      { url: L39, titulo: "Ley 39/2015, de 1 de octubre, del Procedimiento Administrativo Común (BOE-A-2015-10565)" },
      { url: LBRL, titulo: "Ley 7/1985, de 2 de abril, Reguladora de las Bases del Régimen Local (BOE-A-1985-5392)" },
      { url: OM, titulo: "Ordenanza Municipal Reguladora del Procedimiento para el ejercicio de la Potestad Sancionadora de Zaragoza (BOPZ nº 34, 12-02-2014)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "Ley 40/2015: principios de legalidad, irretroactividad, tipicidad, responsabilidad y proporcionalidad", articulos: "arts. 25-29", url: `${L40}#a25` },
      { seccion: S2, titulo: "Ley 40/2015: prescripción y concurrencia de sanciones", articulos: "arts. 30-31", url: `${L40}#a30` },
      { seccion: S3, titulo: "Ley 39/2015: especialidades del procedimiento sancionador", articulos: "arts. 25, 53.2, 56, 62-64, 77, 85, 89, 90 y 96", url: `${L39}#a63` },
      { seccion: S4, titulo: "LBRL: infracciones y sanciones en las ordenanzas locales", articulos: "arts. 139-141", url: `${LBRL}#a139` },
      { seccion: S5, titulo: "Ordenanza Municipal Reguladora del Procedimiento Sancionador de Zaragoza", articulos: "arts. 1-17", url: OM },
    ],
  },
  vinculo: { oposicion: POLICIA.oposicion, bloqueId: POLICIA.bloqueParte2, numero: 46 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Legalidad (art. 25 Ley 40/2015)", "La potestad sancionadora exige reconocimiento expreso en una norma con rango de ley; en las entidades locales, conforme al Título XI de la LBRL"],
        ["Ámbito (art. 25.3-4)", "Se aplica también a la potestad disciplinaria sobre el personal, pero no a quienes se vinculan con la Administración por contratos o por la legislación patrimonial"],
        ["Irretroactividad (art. 26)", "Se aplican las disposiciones vigentes al cometerse los hechos, salvo las posteriores que favorezcan al infractor (incluso en sanciones pendientes de cumplir)"],
        ["Tipicidad (art. 27)", "Solo son infracciones las previstas en una ley (salvo lo dispuesto para los entes locales); clasificadas en leves, graves y muy graves; prohibida la analogía"],
        ["Responsabilidad (art. 28)", "Solo responden las personas físicas o jurídicas (y entes sin personalidad si una ley les da capacidad) a título de dolo o culpa; compatible con reponer la situación e indemnizar"],
        ["Proporcionalidad (art. 29)", "Ninguna sanción administrativa puede implicar privación de libertad; la infracción no debe resultar más beneficiosa que cumplir la norma"],
        ["Criterios de graduación (art. 29.3)", "Culpabilidad o intencionalidad, continuidad o persistencia, naturaleza de los perjuicios y reincidencia (más de una infracción de igual naturaleza en un año declarada por resolución firme)"],
        ["Concurso medial e infracción continuada (art. 29.5-6)", "Si una infracción deriva necesariamente de otra, solo se impone la más grave; la pluralidad de acciones con un plan preconcebido es infracción continuada"],
      ],
      preguntas: [
        ["media", "¿Qué rango debe tener la norma que reconozca la potestad sancionadora?", ["Rango de ley", "Cualquier reglamento", "Una circular"], "Ley 40/2015, art. 25.1."],
        ["media", "¿Puede una sanción administrativa implicar privación de libertad?", ["No, en ningún caso", "Sí, hasta 48 horas", "Solo si es muy grave"], "Art. 29.1."],
        ["media", "¿Pueden aplicarse por analogía las normas que definen infracciones?", ["No", "Sí", "Solo en favor de la Administración"], "Art. 27.4."],
        ["media", "Una norma sancionadora posterior más favorable al infractor…", ["Se aplica retroactivamente", "No se aplica nunca", "Solo a los hechos futuros"], "Art. 26.2."],
        ["dificil", "¿Qué se entiende por reincidencia a efectos de graduación?", ["Cometer en un año más de una infracción de la misma naturaleza declarada por resolución firme", "Tener cualquier antecedente penal", "Cometer dos infracciones el mismo día"], "Art. 29.3.d)."],
        ["media", "¿Se aplican los principios sancionadores a la potestad disciplinaria sobre el personal de la Administración?", ["Sí", "No", "Solo a los laborales"], "Art. 25.3."],
        ["media", "Si de una infracción deriva necesariamente otra, se impone…", ["Solo la sanción de la más grave", "Las dos sumadas", "La más leve"], "Art. 29.5."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Prescripción de infracciones (art. 30.1)", "La que fije su ley; en su defecto: muy graves, 3 años; graves, 2 años; leves, 6 meses"],
        ["Prescripción de sanciones (art. 30.1)", "En defecto de ley: por faltas muy graves, 3 años; graves, 2 años; leves, 1 año"],
        ["Cómputo de la infracción (art. 30.2)", "Desde el día en que se cometió; si es continuada o permanente, desde que finalizó la conducta"],
        ["Interrupción (art. 30.2)", "La iniciación del procedimiento con conocimiento del interesado; se reanuda si el expediente está paralizado más de un mes por causa no imputable a él"],
        ["Cómputo de la sanción (art. 30.3)", "Desde el día siguiente a que sea ejecutable la resolución o haya pasado el plazo para recurrirla"],
        ["Non bis in idem (art. 31.1)", "No se sancionan hechos ya sancionados penal o administrativamente si hay identidad de sujeto, hecho y fundamento"],
        ["Sanción de un órgano de la UE (art. 31.2)", "Sin identidad de sujeto y fundamento, se tiene en cuenta para graduar y puede minorarse la sanción"],
      ],
      preguntas: [
        ["media", "Si la ley sectorial no dice nada, ¿cuándo prescribe una infracción leve?", ["A los seis meses", "Al año", "A los tres meses"], "Ley 40/2015, art. 30.1."],
        ["media", "¿Y una infracción grave?", ["A los dos años", "Al año", "A los tres años"], "Art. 30.1."],
        ["media", "En defecto de ley, ¿cuándo prescribe una sanción impuesta por falta leve?", ["Al año", "A los seis meses", "A los dos años"], "Art. 30.1."],
        ["media", "¿Desde cuándo prescribe una infracción permanente?", ["Desde que finalizó la conducta infractora", "Desde que empezó", "Desde la denuncia"], "Art. 30.2."],
        ["dificil", "¿Qué interrumpe la prescripción de la infracción?", ["La iniciación del procedimiento sancionador con conocimiento del interesado", "La simple denuncia de un vecino", "El paso de un mes"], "Art. 30.2."],
        ["media", "¿Qué identidad impide sancionar dos veces?", ["De sujeto, hecho y fundamento", "Solo de hecho", "Solo de sujeto"], "Art. 31.1."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Derechos del presunto responsable (art. 53.2 Ley 39/2015)", "Ser notificado de los hechos, infracciones y posibles sanciones, de la identidad del instructor y del órgano competente, y la presunción de no existencia de responsabilidad"],
        ["Inicio (art. 63)", "Siempre de oficio por acuerdo del órgano competente, con separación entre fase instructora y sancionadora en órganos distintos; nunca sanción sin procedimiento"],
        ["Denuncia (art. 62)", "Pone en conocimiento hechos que pueden motivar el inicio de oficio; debe identificar al denunciante y relatar los hechos; no da por sí sola la condición de interesado"],
        ["Acuerdo de iniciación (art. 64)", "Responsables, hechos y posible calificación y sanción, instructor (y recusación), órgano competente, medidas provisionales y derecho a alegar; si no se alega, puede valer como propuesta de resolución"],
        ["Medidas provisionales (art. 56)", "Para asegurar la eficacia de la resolución; antes del inicio, solo por urgencia inaplazable y deben confirmarse en el acuerdo de iniciación en quince días"],
        ["Prueba (art. 77)", "Periodo de diez a treinta días; los hechos probados por sentencia penal firme vinculan; las actas de funcionarios con condición de autoridad hacen prueba salvo prueba en contrario"],
        ["Reconocimiento y pago voluntario (art. 85)", "Terminan el procedimiento; si la sanción es solo pecuniaria, reducciones de al menos el 20 % cada una, acumulables, condicionadas a renunciar a recurrir en vía administrativa"],
        ["Propuesta y resolución (arts. 89-90)", "La propuesta fija hechos, calificación, responsables y sanción; la resolución no puede aceptar hechos distintos; si se agrava, quince días para alegar; es ejecutiva cuando no cabe recurso ordinario"],
        ["Caducidad (art. 25.1.b)", "Vencido el plazo máximo sin resolución en un procedimiento sancionador, se produce la caducidad y el archivo"],
        ["Plazo general (art. 21.3)", "Si la norma no fija plazo máximo, es de tres meses"],
        ["Tramitación simplificada (art. 96.5-6)", "Si hay elementos para calificar la infracción como leve; debe resolverse en treinta días"],
      ],
      preguntas: [
        ["media", "¿Cómo se inician los procedimientos sancionadores?", ["Siempre de oficio", "A instancia del denunciante", "Por el propio infractor"], "Ley 39/2015, art. 63.1."],
        ["media", "¿Qué fases deben encomendarse a órganos distintos?", ["La instructora y la sancionadora", "La de prueba y la de audiencia", "Ninguna"], "Art. 63.1."],
        ["media", "¿Qué valor tiene el acta de un policía local, con condición de autoridad, que recoge los hechos que constató?", ["Hace prueba de esos hechos salvo que se acredite lo contrario", "Ninguno", "Es irrefutable"], "Art. 77.5."],
        ["media", "¿Qué reducción mínima se aplica por pago voluntario de una sanción solo pecuniaria?", ["Al menos un 20 %", "Un 50 % siempre", "Un 10 %"], "Art. 85.3."],
        ["media", "¿Da la denuncia, por sí sola, la condición de interesado?", ["No", "Sí", "Solo si es de un agente"], "Art. 62.5."],
        ["dificil", "¿Qué ocurre si vence el plazo para resolver un procedimiento sancionador sin resolución?", ["Caducidad y archivo de las actuaciones", "Se entiende impuesta la sanción", "Silencio estimatorio para la Administración"], "Art. 25.1.b)."],
        ["media", "¿En qué plazo se resuelve un procedimiento sancionador simplificado?", ["Treinta días", "Tres meses", "Seis meses"], "Art. 96.6."],
        ["media", "¿Vinculan a la Administración los hechos probados por sentencia penal firme?", ["Sí", "No", "Solo si benefician al infractor"], "Art. 77.4."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Tipificación local (art. 139 LBRL)", "Los entes locales pueden, en defecto de normativa sectorial, tipificar infracciones y sanciones en sus ordenanzas para la convivencia y el uso de servicios, equipamientos y espacios públicos"],
        ["Infracciones muy graves locales (art. 140.1)", "Perturbación relevante de la convivencia, impedir el uso o el funcionamiento de un servicio o espacio público, y deterioros graves de equipamientos o espacios públicos"],
        ["Graves y leves (art. 140.2)", "Según la intensidad de la perturbación de la tranquilidad, la salubridad u ornato, el uso o el funcionamiento de servicios y espacios, y los daños"],
        ["Límites de las multas (art. 141)", "Salvo previsión legal distinta: muy graves hasta 3.000 euros, graves hasta 1.500 y leves hasta 750"],
      ],
      preguntas: [
        ["media", "¿Cuál es el límite de multa de una infracción muy grave de una ordenanza local, salvo ley distinta?", ["3.000 euros", "1.500 euros", "6.000 euros"], "LBRL, art. 141."],
        ["media", "¿Y de una infracción leve?", ["750 euros", "300 euros", "1.500 euros"], "LBRL, art. 141."],
        ["media", "¿Pueden las ordenanzas tipificar infracciones?", ["Sí, en defecto de normativa sectorial, para la convivencia y el uso de servicios y espacios públicos", "No, nunca", "Solo si lo autoriza el Estado caso por caso"], "LBRL, art. 139."],
        ["dificil", "¿Es muy grave impedir a otros el uso de un espacio público?", ["Sí", "No, es leve", "No es infracción"], "LBRL, art. 140.1.e)."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["Objeto (art. 1)", "Regular el procedimiento sancionador del Ayuntamiento de Zaragoza por infracciones a ordenanzas y reglamentos municipales"],
        ["Responsables (art. 3)", "Quienes cometan la infracción; padres o tutores responden solidariamente de la multa de los menores"],
        ["Procedimiento y competencia (art. 4)", "El del Reglamento aragonés (Decreto 28/2001); resuelve el Gobierno de Zaragoza u órgano delegado; plazo de seis meses, tras el cual hay caducidad"],
        ["Denuncias (art. 5)", "Cualquier persona puede denunciar; si pide la iniciación, se le comunica si se inicia y la resolución; el instructor puede declarar confidencial su identidad"],
        ["Infracciones residuales (art. 6)", "Son leves los incumplimientos de las ordenanzas no tipificados expresamente como graves o muy graves"],
        ["Graduación (art. 7)", "Grados mínimo, medio y máximo, atendiendo a intencionalidad o reiteración, perjuicios y reincidencia"],
        ["Concurrencia con delito (art. 9)", "Se comunica al Ministerio Fiscal y, si hay identidad, se suspende el procedimiento hasta la resolución judicial"],
        ["Requerimiento de cese (art. 10)", "En infracciones leves de grado mínimo, el agente requiere el cese inmediato; si el infractor obedece y no hay reiteración, no se denuncia, aunque se deja constancia"],
        ["Pago inmediato (art. 12)", "Si lo prevé la ordenanza: 50 % de rebaja si se paga antes del inicio del procedimiento, 20 % antes de la resolución"],
        ["Sustitución de la multa (arts. 13-16)", "Por cursos y trabajos en beneficio de la comunidad, para infractores de 14 a 21 años o mayores sin ingresos o atendidos por Servicios Sociales; 2 horas condonan 50 euros"],
        ["Reparación (art. 17)", "La sanción no exime de reparar los daños y perjuicios causados"],
      ],
      preguntas: [
        ["media", "¿Qué órgano resuelve los procedimientos sancionadores por infracción de ordenanzas en Zaragoza?", ["El Gobierno de Zaragoza u órgano en quien delegue", "El Jefe de la Policía Local", "El Pleno siempre"], "Ordenanza, art. 4."],
        ["media", "¿Qué plazo tiene el Ayuntamiento para resolver y notificar el procedimiento sancionador?", ["Seis meses", "Tres meses", "Un año"], "Art. 4."],
        ["media", "Ante una infracción leve de grado mínimo, ¿qué debe hacer primero el agente?", ["Requerir el cese inmediato de la conducta", "Denunciar siempre", "Detener al infractor"], "Art. 10."],
        ["media", "¿Qué rebaja se obtiene, si la ordenanza lo prevé, por pagar antes del inicio del procedimiento?", ["El 50 %", "El 20 %", "El 10 %"], "Art. 12."],
        ["media", "¿Quién responde de la multa de un menor?", ["Sus padres o tutores, solidariamente", "Nadie", "El Ayuntamiento"], "Art. 3."],
        ["dificil", "En la sustitución de la multa, ¿cuántos euros se condonan por cada dos horas de trabajo o formación?", ["50 euros", "100 euros", "25 euros"], "Art. 16."],
        ["media", "¿Puede mantenerse en secreto la identidad de un vecino denunciante?", ["Sí, si el instructor lo declara confidencial ponderando el riesgo", "No, nunca", "Solo si es menor"], "Art. 5."],
        ["media", "¿Qué calificación tienen los incumplimientos de una ordenanza no tipificados expresamente?", ["Leves", "Graves", "Muy graves"], "Art. 6."],
      ],
    },
  ],
  glosario: [
    [S1, "Tipicidad", "Exigencia de que la infracción y su sanción estén previamente descritas en la norma."],
    [S1, "Infracción continuada", "Pluralidad de acciones que infringen el mismo precepto en ejecución de un plan o aprovechando idéntica ocasión."],
    [S2, "Non bis in idem", "Prohibición de sancionar dos veces con identidad de sujeto, hecho y fundamento."],
    [S2, "Prescripción", "Extinción de la posibilidad de sancionar o de ejecutar la sanción por el paso del tiempo."],
    [S3, "Instructor", "Órgano o persona que tramita el expediente sancionador y formula la propuesta de resolución."],
    [S3, "Caducidad", "Terminación del procedimiento sancionador por no resolverse en plazo, con archivo de las actuaciones."],
    [S3, "Pliego de cargos", "Documento que concreta la calificación de los hechos cuando no fue posible en el acuerdo de iniciación."],
    [S4, "Ordenanza", "Disposición general municipal que puede tipificar infracciones de convivencia y uso de espacios públicos."],
    [S5, "Requerimiento de cese", "Orden del agente de cesar una infracción leve de grado mínimo, que evita la denuncia si se obedece."],
    [S5, "Trabajos en beneficio de la comunidad", "Prestación no retribuida que puede sustituir a la multa municipal."],
  ],
  casos: [
    {
      slug: "caso-joven-orina-via-publica",
      titulo: "Un joven orinando en la calle durante las fiestas",
      supuesto: "Durante las fiestas del Pilar, dos agentes sorprenden a un joven de 19 años orinando en un portal de la calle Cinegio. Es la primera vez que se le denuncia. El chico no tiene ingresos y pregunta si puede evitar pagar la multa.",
      preguntas: [
        [S5, "media", "¿Qué ordenanza regula el procedimiento para sancionar este hecho?", ["La Ordenanza Municipal Reguladora del Procedimiento Sancionador de Zaragoza", "El Código Penal", "La Ley de Tráfico"], "Ordenanza, art. 1."],
        [S5, "media", "¿Quién resolverá el expediente?", ["El Gobierno de Zaragoza u órgano delegado", "Los agentes", "El juez de guardia"], "Art. 4."],
        [S5, "media", "¿Puede sustituir la multa por trabajos en beneficio de la comunidad?", ["Sí, por tener entre 14 y 21 años, si la ordenanza aplicable lo prevé", "No", "Solo si tiene más de 25 años"], "Arts. 13-14."],
        [S5, "media", "¿En qué plazo debe pedirlo tras notificarse la sanción?", ["Un mes", "Diez días", "Seis meses"], "Art. 15.a)."],
        [S5, "dificil", "Si la multa fuera de 100 euros, ¿cuántas horas de trabajo o formación la condonarían?", ["Cuatro horas", "Dos horas", "Diez horas"], "Art. 16: 2 horas = 50 euros."],
        [S3, "media", "¿Qué valor tendrá el acta de los agentes?", ["Prueba de los hechos constatados salvo prueba en contrario", "Ninguno", "Solo orientativo"], "Ley 39/2015, art. 77.5."],
        [S3, "media", "¿Qué derecho tiene el joven durante el procedimiento?", ["A la presunción de no existencia de responsabilidad", "A no ser notificado", "A elegir al instructor"], "Art. 53.2.b)."],
        [S1, "media", "¿Podría la sanción consistir en un arresto?", ["No, ninguna sanción administrativa puede privar de libertad", "Sí, de un día", "Sí, si reincide"], "Ley 40/2015, art. 29.1."],
        [S5, "media", "¿Exime la sanción de limpiar o reparar el portal?", ["No, debe reparar los daños causados", "Sí", "Solo si paga"], "Ordenanza, art. 17."],
        [S2, "media", "Si la ordenanza sectorial no fijara plazo, una infracción leve prescribiría a los…", ["Seis meses", "Dos años", "Tres meses"], "Ley 40/2015, art. 30.1."],
      ],
    },
    {
      slug: "caso-requerimiento-cese-reincidencia",
      titulo: "Requerimiento de cese y reincidencia",
      supuesto: "Un agente observa a un vecino que realiza una conducta leve, castigada en su grado mínimo por una ordenanza, en un parque del barrio de La Almozara. El vecino deja de hacerlo en cuanto se le advierte. Una semana después, el mismo agente le sorprende de nuevo y esta vez le denuncia. El vecino recurre alegando que no se le puede sancionar dos veces.",
      preguntas: [
        [S5, "media", "¿Qué debía hacer el agente la primera vez?", ["Requerir el cese inmediato de la conducta", "Denunciar directamente", "Detenerle"], "Ordenanza, art. 10."],
        [S5, "media", "Como el vecino obedeció y no había reiteración, ¿se formula denuncia?", ["No, aunque se deja constancia del hecho", "Sí, siempre", "Solo si hay testigos"], "Art. 10."],
        [S5, "media", "La segunda vez, ¿hay reiteración?", ["Sí, porque consta la comisión anterior del mismo hecho", "No", "Solo tras un año"], "Art. 10, párrafo segundo."],
        [S2, "media", "¿Se le está sancionando dos veces por lo mismo?", ["No: son dos hechos distintos y el primero no fue sancionado", "Sí", "Depende del agente"], "Ley 40/2015, art. 31."],
        [S1, "media", "¿Qué exige el principio de tipicidad para sancionarle?", ["Que la conducta esté prevista como infracción en la norma", "Que el agente lo considere grave", "Nada"], "Ley 40/2015, art. 27."],
        [S4, "media", "¿Puede una ordenanza municipal tipificar esa infracción?", ["Sí, en defecto de normativa sectorial", "No", "Solo si la aprueba el Estado"], "LBRL, art. 139."],
        [S4, "media", "Si fuera leve, ¿cuál sería la multa máxima, salvo previsión legal distinta?", ["750 euros", "3.000 euros", "150 euros"], "LBRL, art. 141."],
        [S3, "media", "¿Cómo se iniciará el procedimiento?", ["De oficio por acuerdo del órgano competente", "Por el propio vecino", "Por un juez"], "Ley 39/2015, art. 63."],
        [S3, "dificil", "Si no formula alegaciones al acuerdo de iniciación, y este contiene un pronunciamiento preciso sobre la responsabilidad, el acuerdo…", ["Puede considerarse propuesta de resolución", "Queda sin efecto", "Obliga a archivar"], "Ley 39/2015, art. 64.2.f)."],
        [S5, "media", "¿Qué plazo hay para resolver antes de que caduque el procedimiento?", ["Seis meses", "Un mes", "Tres años"], "Ordenanza, art. 4."],
      ],
    },
    {
      slug: "caso-pago-voluntario-delito",
      titulo: "Pago voluntario y posible delito",
      supuesto: "Tras una denuncia de la Policía Local por destrozar mobiliario urbano en la plaza San Francisco, el Ayuntamiento inicia un expediente por infracción muy grave de una ordenanza. El denunciado quiere pagar cuanto antes. Durante la instrucción se sabe que el juzgado sigue diligencias penales por los mismos daños.",
      preguntas: [
        [S4, "media", "¿Qué infracción local es el deterioro grave y relevante de elementos de un espacio público?", ["Muy grave", "Leve", "Grave siempre"], "LBRL, art. 140.1.f)."],
        [S4, "media", "Salvo previsión legal distinta, ¿cuál es la multa máxima?", ["3.000 euros", "750 euros", "1.500 euros"], "LBRL, art. 141."],
        [S5, "media", "Al saberse que hay un proceso penal, ¿qué hace el órgano competente?", ["Pide información al juzgado y, si hay identidad de sujeto, hecho y fundamento, suspende el procedimiento", "Sanciona igualmente", "Archiva sin más"], "Ordenanza, art. 9."],
        [S5, "media", "Durante la suspensión por el proceso penal, el plazo de prescripción y de caducidad…", ["Se interrumpe", "Sigue corriendo", "Se duplica"], "Ordenanza, art. 9."],
        [S2, "media", "Si hay condena penal por los mismos hechos y fundamento, ¿puede sancionarse administrativamente?", ["No", "Sí", "Solo con multa reducida"], "Ley 40/2015, art. 31.1."],
        [S3, "media", "Si no hay delito y el denunciado reconoce su responsabilidad y paga, ¿qué reducciones caben?", ["Al menos un 20 % por cada una, acumulables", "Ninguna", "Un 100 %"], "Ley 39/2015, art. 85.3."],
        [S3, "media", "¿A qué está condicionada esa reducción?", ["A renunciar a cualquier recurso en vía administrativa contra la sanción", "A pagar en efectivo", "A firmar ante notario"], "Art. 85.3."],
        [S1, "media", "Además de la multa, ¿puede exigírsele reponer el mobiliario?", ["Sí, son compatibles la sanción, la reposición y la indemnización", "No", "Solo si lo pide un vecino"], "Ley 40/2015, art. 28.2."],
        [S3, "dificil", "Si el órgano que resuelve considera la sanción más grave que la propuesta, debe…", ["Notificarlo al inculpado para que alegue en quince días", "Imponerla directamente", "Archivar"], "Ley 39/2015, art. 90.2."],
        [S2, "media", "En defecto de ley, una infracción muy grave prescribe a los…", ["Tres años", "Dos años", "Seis meses"], "Ley 40/2015, art. 30.1."],
      ],
    },
  ],
});
