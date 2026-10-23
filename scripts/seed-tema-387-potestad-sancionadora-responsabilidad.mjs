/**
 * Crea tema-387 — Tema 15 de Administrativo DGA (tema 10 del programa de
 * materias específicas): "La potestad sancionadora de la Administración.
 * Responsabilidad patrimonial de las Administraciones Publicas:
 * responsabilidad civil y penal de los funcionarios públicos."
 *
 * Fuentes (textos consolidados leídos en esta sesión en la API del BOE):
 * - Ley 40/2015 (BOE-A-2015-10566): arts. 25-31 (principios de la potestad
 *   sancionadora) y 32-37 (responsabilidad patrimonial, concurrencia,
 *   indemnización, responsabilidad del personal y penal).
 * - Ley 39/2015 (BOE-A-2015-10565): arts. 53.2, 63-65, 67, 81, 85, 89-92 y
 *   96 (especialidades de los procedimientos sancionador y de
 *   responsabilidad patrimonial).
 * - Ley 5/2021, de Organización y Régimen Jurídico del Sector Público
 *   Autonómico de Aragón (BOE-A-2021-12701): arts. 35 (órganos competentes
 *   para sancionar por cuantía) y 36 (responsabilidad patrimonial: resuelve
 *   el consejero).
 * - Ley 1/2009, del Consejo Consultivo de Aragón (BOE-A-2009-7196): art.
 *   15.10 (dictamen preceptivo en reclamaciones de 50.000 € o más, en la
 *   redacción dada por la Ley 5/2021 con efectos de 2-10-2021; antes,
 *   6.000 €).
 * - Código Penal, LO 10/1995 (BOE-A-1995-25444): art. 121 (responsabilidad
 *   civil subsidiaria de la Administración por delitos de su personal).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-387-potestad-sancionadora-responsabilidad.mjs
 */
import { sembrarTema, ADMIN_DGA } from "./lib/sembrar-tema.mjs";

const L40 = "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10566";
const L39 = "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565";
const L5 = "https://www.boe.es/buscar/act.php?id=BOE-A-2021-12701";
const LCC = "https://www.boe.es/buscar/act.php?id=BOE-A-2009-7196";
const CP = "https://www.boe.es/buscar/act.php?id=BOE-A-1995-25444";
const S1 = "principios-potestad-sancionadora";
const S2 = "procedimiento-sancionador";
const S3 = "responsabilidad-patrimonial-requisitos";
const S4 = "procedimiento-responsabilidad-patrimonial";
const S5 = "responsabilidad-personal-civil-penal";

await sembrarTema({
  tema: {
    slug: "tema-387",
    titulo: "La potestad sancionadora de la Administración y la responsabilidad patrimonial; responsabilidad civil y penal del personal",
    descripcion: "Principios de la potestad sancionadora (Ley 40/2015): legalidad, irretroactividad, tipicidad, responsabilidad, proporcionalidad, prescripción y non bis in idem; órganos competentes en Aragón según la cuantía (Ley 5/2021). Especialidades del procedimiento sancionador (Ley 39/2015): iniciación de oficio, separación de fases, acuerdo de iniciación, reconocimiento y pago voluntario con reducciones, propuesta y resolución. Responsabilidad patrimonial: requisitos de la lesión, concurrencia de Administraciones, indemnización y procedimiento (plazo de un año, informe del servicio, dictamen del Consejo Consultivo de Aragón a partir de 50.000 €, resolución por el consejero, silencio a los seis meses, tramitación simplificada). Acción de regreso contra el personal, responsabilidad penal y responsabilidad civil subsidiaria de la Administración.",
    contenido: "Qué límites tiene la Administración para multar (solo por lo que diga una ley, nunca con cárcel, sin castigar dos veces lo mismo) y cómo se tramita una sanción, con los descuentos por reconocer la culpa o pagar pronto. Y la otra cara: cuándo debe la Administración indemnizar los daños que causan sus servicios, cómo se reclama en Aragón y cuándo puede después repercutir el coste sobre el funcionario culpable, además de su posible responsabilidad penal.",
    enlaces_boe: [
      { url: L40, titulo: "Ley 40/2015, de Régimen Jurídico del Sector Público (BOE-A-2015-10566)" },
      { url: L39, titulo: "Ley 39/2015, del Procedimiento Administrativo Común (BOE-A-2015-10565)" },
      { url: L5, titulo: "Ley 5/2021, de Organización y Régimen Jurídico del Sector Público Autonómico de Aragón (BOE-A-2021-12701)" },
      { url: LCC, titulo: "Ley 1/2009, del Consejo Consultivo de Aragón (BOE-A-2009-7196)" },
      { url: CP, titulo: "Código Penal, art. 121 (BOE-A-1995-25444)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "Principios de la potestad sancionadora", articulos: "arts. 25-31 Ley 40/2015; art. 35 Ley 5/2021", url: `${L40}#a25` },
      { seccion: S2, titulo: "Especialidades del procedimiento sancionador", articulos: "arts. 53.2, 63-64, 85, 89-90 Ley 39/2015", url: `${L39}#a63` },
      { seccion: S3, titulo: "Responsabilidad patrimonial: principios, concurrencia e indemnización", articulos: "arts. 32-35 Ley 40/2015", url: `${L40}#a32` },
      { seccion: S4, titulo: "Procedimiento de responsabilidad patrimonial", articulos: "arts. 65, 67, 81, 91-92 y 96.4 Ley 39/2015; art. 36 Ley 5/2021; art. 15.10 Ley 1/2009", url: `${L39}#a67` },
      { seccion: S5, titulo: "Responsabilidad de autoridades y personal; responsabilidad penal y civil", articulos: "arts. 36-37 Ley 40/2015; art. 121 CP", url: `${L40}#a36` },
    ],
  },
  vinculo: { oposicion: ADMIN_DGA.oposicion, bloqueId: ADMIN_DGA.bloqueDerecho, numero: 15 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Legalidad (art. 25 Ley 40/2015)", "La potestad sancionadora exige reconocimiento expreso en una norma con rango de ley y se ejerce con el procedimiento legal por los órganos que la tengan atribuida"],
        ["Ámbito (art. 25.3-4)", "Se extiende a la potestad disciplinaria sobre el personal, pero no a quienes se vinculan con la Administración por contratos o por la legislación patrimonial"],
        ["Irretroactividad (art. 26)", "Se aplican las normas vigentes al cometerse la infracción, salvo las posteriores más favorables, incluso para sanciones pendientes de cumplir"],
        ["Tipicidad (art. 27)", "Solo son infracciones las previstas por una ley, clasificadas en leves, graves y muy graves; los reglamentos solo especifican o gradúan; prohibida la analogía"],
        ["Responsabilidad (art. 28)", "Responden las personas físicas y jurídicas (y entes sin personalidad si una ley lo prevé) a título de dolo o culpa; compatible con reponer la situación e indemnizar"],
        ["Proporcionalidad (art. 29)", "Ninguna sanción puede suponer privación de libertad; infringir no debe ser más beneficioso que cumplir; criterios: culpabilidad, continuidad, perjuicios y reincidencia"],
        ["Reincidencia (art. 29.3.d)", "Comisión en un año de más de una infracción de la misma naturaleza declarada por resolución firme en vía administrativa"],
        ["Prescripción supletoria (art. 30.1)", "Infracciones: muy graves 3 años, graves 2 años, leves 6 meses; sanciones: muy graves 3 años, graves 2 años, leves 1 año"],
        ["Non bis in idem (art. 31.1)", "No se sancionan hechos ya sancionados penal o administrativamente si hay identidad de sujeto, hecho y fundamento"],
        ["Competencia sancionadora en Aragón (art. 35.3 Ley 5/2021)", "A falta de norma específica: hasta 12.000 €, el director del servicio provincial; de 12.000 a 30.000 €, el director general; más de 30.000 €, el consejero"],
      ],
      preguntas: [
        ["facil", "La potestad sancionadora de la Administración debe estar reconocida expresamente por:", ["Una norma con rango de ley", "Una orden del consejero", "Una instrucción", "Un convenio"], "Art. 25.1 Ley 40/2015."],
        ["media", "Si las leyes no fijan plazo, una infracción leve prescribe a los:", ["Seis meses", "Un año", "Dos años", "Tres meses"], "Art. 30.1 Ley 40/2015."],
        ["media", "Si no hay plazo legal, la sanción impuesta por una falta leve prescribe al:", ["Año", "Seis meses", "Dos años", "Tres años"], "Art. 30.1 Ley 40/2015."],
        ["media", "¿Puede una sanción administrativa implicar privación de libertad?", ["No, en ningún caso, ni directa ni subsidiariamente", "Sí, hasta 24 horas", "Solo si es muy grave", "Solo si no se paga la multa"], "Art. 29.1 Ley 40/2015."],
        ["media", "Una nueva norma que reduce la sanción prevista para una infracción ya cometida:", ["Se aplica retroactivamente porque favorece al infractor", "No se aplica", "Solo se aplica a hechos futuros", "Se aplica solo si lo pide el Fiscal"], "Art. 26.2 Ley 40/2015."],
        ["dificil", "En la Administración de la Comunidad Autónoma de Aragón, sin norma específica, una multa de 20.000 euros la impone:", ["La persona titular de la dirección general competente", "El director del servicio provincial", "El consejero", "El Gobierno de Aragón"], "Art. 35.3.b) Ley 5/2021."],
        ["media", "¿Se aplican los principios de la potestad sancionadora a la potestad disciplinaria sobre el personal?", ["Sí, cualquiera que sea la naturaleza jurídica de la relación de empleo", "No", "Solo a funcionarios de carrera", "Solo a personal laboral"], "Art. 25.3 Ley 40/2015."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Iniciación (art. 63.1 Ley 39/2015)", "Siempre de oficio, por acuerdo del órgano competente, con separación entre la fase instructora y la sancionadora encomendadas a órganos distintos"],
        ["Garantía de procedimiento (art. 63.2)", "Nunca puede imponerse una sanción sin el procedimiento oportuno"],
        ["Acuerdo de iniciación (art. 64.2)", "Identifica a los responsables, hechos, posible calificación y sanción, instructor y secretario, órgano competente, medidas provisionales y derecho a alegar"],
        ["Iniciación como propuesta (art. 64.2.f)", "Si no se presentan alegaciones al acuerdo de iniciación y este contiene un pronunciamiento preciso, puede considerarse propuesta de resolución"],
        ["Derechos del presunto responsable (art. 53.2)", "Ser notificado de hechos, infracciones, sanciones, instructor y autoridad competente; presunción de no existencia de responsabilidad"],
        ["Reconocimiento y pago voluntario (art. 85)", "Si el infractor reconoce su responsabilidad o paga antes de la resolución, termina el procedimiento; en sanciones solo pecuniarias, reducciones de al menos el 20 % acumulables, condicionadas a no recurrir"],
        ["Archivo sin propuesta (art. 89.1)", "Si no existen los hechos, no se acreditan, no son infracción, no hay responsable identificado o ha prescrito"],
        ["Propuesta de resolución (art. 89.2-3)", "Se notifica a los interesados con plazo para alegar; fija hechos probados, calificación, responsables y sanción propuesta"],
        ["Resolución (art. 90.2)", "No puede aceptar hechos distintos de los del procedimiento; si se aprecia mayor gravedad, se oye al inculpado 15 días"],
        ["Ejecutividad de la sanción (art. 90.3)", "Es ejecutiva cuando no cabe contra ella recurso ordinario en vía administrativa"],
      ],
      preguntas: [
        ["media", "Los procedimientos sancionadores se inician:", ["Siempre de oficio", "Siempre a solicitud del denunciante", "De oficio o a instancia de parte indistintamente", "Por el juez"], "Art. 63.1 Ley 39/2015."],
        ["media", "En el procedimiento sancionador, la fase instructora y la sancionadora:", ["Se encomiendan a órganos distintos", "Las realiza el mismo órgano", "Se suprimen si hay prisa", "Las decide el interesado"], "Art. 63.1 Ley 39/2015."],
        ["media", "Si el presunto infractor paga voluntariamente una sanción pecuniaria antes de la resolución, se aplica una reducción de al menos:", ["El 20 %", "El 50 %", "El 10 %", "El 30 %"], "Art. 85.3 Ley 39/2015."],
        ["dificil", "La efectividad de las reducciones por reconocimiento o pago voluntario está condicionada a:", ["El desistimiento o renuncia a cualquier acción o recurso en vía administrativa", "Que la sanción sea leve", "Que lo autorice el instructor", "Que lo pida un abogado"], "Art. 85.3 Ley 39/2015."],
        ["media", "Si en la instrucción se acredita que la infracción ha prescrito, el instructor:", ["Resolverá el archivo sin necesidad de propuesta de resolución", "Formulará propuesta de sanción", "Remitirá el caso al juez", "Impondrá la sanción mínima"], "Art. 89.1.e) Ley 39/2015."],
        ["media", "Si el órgano que resuelve considera más grave la infracción que la propuesta, debe:", ["Notificarlo al inculpado para que alegue en quince días", "Imponer la sanción sin más", "Archivar el expediente", "Pedir dictamen al Consejo Consultivo"], "Art. 90.2 Ley 39/2015."],
        ["media", "La resolución sancionadora es ejecutiva:", ["Cuando no quepa contra ella ningún recurso ordinario en vía administrativa", "Desde que se dicta", "Solo tras sentencia firme", "A los tres meses"], "Art. 90.3 Ley 39/2015."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Derecho a indemnización (art. 32.1 Ley 40/2015)", "Por toda lesión en bienes o derechos consecuencia del funcionamiento normal o anormal de los servicios públicos, salvo fuerza mayor o deber jurídico de soportarla"],
        ["Anulación de actos (art. 32.1)", "La anulación de un acto o disposición no presupone por sí misma derecho a indemnización"],
        ["Requisitos del daño (art. 32.2)", "Efectivo, evaluable económicamente e individualizado respecto de una persona o grupo"],
        ["Responsabilidad del Estado legislador (art. 32.3-5)", "Por leyes no expropiatorias si así lo prevén, y por normas declaradas inconstitucionales o contrarias al Derecho de la UE si el particular obtuvo antes sentencia desestimatoria alegándolo"],
        ["Concurrencia de Administraciones (art. 33)", "En actuaciones conjuntas responden solidariamente; en otros casos, según competencia, interés tutelado e intensidad de intervención, y solidariamente si no puede determinarse"],
        ["Daños no indemnizables (art. 34.1)", "Los que el particular tiene el deber de soportar y los derivados de hechos imprevisibles o inevitables según el estado de la ciencia o la técnica"],
        ["Cálculo de la indemnización (art. 34.2-3)", "Según la legislación fiscal, de expropiación y demás normas (baremos de seguros en lesiones corporales), referida al día del daño y actualizada con el Índice de Garantía de la Competitividad"],
        ["Pago en especie (art. 34.4)", "La indemnización puede sustituirse por compensación en especie o pagos periódicos, con acuerdo del interesado"],
        ["Responsabilidad de Derecho privado (art. 35)", "Aunque actúe en relaciones privadas o mediante entidades privadas, la responsabilidad de la Administración se exige por los arts. 32 y siguientes"],
      ],
      preguntas: [
        ["media", "La Administración responde de los daños causados por el funcionamiento de los servicios públicos:", ["Tanto normal como anormal, salvo fuerza mayor o deber de soportarlos", "Solo si es anormal", "Solo si hay culpa del funcionario", "Solo si hay sentencia penal"], "Art. 32.1 Ley 40/2015."],
        ["media", "Para ser indemnizable, el daño debe ser:", ["Efectivo, evaluable económicamente e individualizado", "Superior a 6.000 euros", "Causado por un funcionario identificado", "Reconocido por el Consejo Consultivo"], "Art. 32.2 Ley 40/2015."],
        ["media", "La anulación de un acto administrativo por un tribunal:", ["No presupone por sí misma el derecho a indemnización", "Da siempre derecho a indemnización", "Impide cualquier indemnización", "Obliga a indemnizar con el doble"], "Art. 32.1 Ley 40/2015."],
        ["dificil", "No son indemnizables los daños derivados de hechos que no se pudieron prever o evitar según:", ["El estado de los conocimientos de la ciencia o de la técnica en el momento de producirse", "La voluntad del funcionario", "El presupuesto disponible", "La opinión del perjudicado"], "Art. 34.1 Ley 40/2015."],
        ["media", "Cuando varias Administraciones actúan conjuntamente y causan un daño, responden frente al particular:", ["De forma solidaria", "Solo la de menor nivel", "A partes iguales sin solidaridad", "Solo la que lo reconozca"], "Art. 33.1 Ley 40/2015."],
        ["media", "La cuantía de la indemnización se calcula con referencia:", ["Al día en que la lesión efectivamente se produjo, actualizada al final del procedimiento", "Al día de la sentencia", "Al día de la reclamación sin actualizar", "Al primer día del año"], "Art. 34.3 Ley 40/2015."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Iniciación (arts. 65 y 67 Ley 39/2015; art. 36.2 Ley 5/2021)", "De oficio o a instancia de parte, siempre que no haya prescrito el derecho a reclamar"],
        ["Plazo para reclamar (art. 67.1)", "Un año desde el hecho o acto lesivo o desde que se manifiesta su efecto; en daños físicos o psíquicos, desde la curación o la determinación de las secuelas"],
        ["Plazo tras anulación (art. 67.1)", "Un año desde la notificación de la resolución administrativa o la sentencia definitiva que anula el acto"],
        ["Contenido de la reclamación (art. 67.2)", "Lesiones, relación de causalidad con el servicio, evaluación económica si es posible, momento de la lesión, alegaciones y proposición de prueba"],
        ["Informe preceptivo (art. 81.1)", "Del servicio cuyo funcionamiento causó la presunta lesión, en un plazo máximo de 10 días"],
        ["Dictamen del órgano consultivo en Aragón (art. 15.10 Ley 1/2009)", "Preceptivo del Consejo Consultivo de Aragón en reclamaciones de cuantía igual o superior a 50.000 € (antes de octubre de 2021, superior a 6.000 €)"],
        ["Contenido del dictamen (art. 81.2 Ley 39/2015)", "Se emite en dos meses y se pronuncia sobre la relación de causalidad y, en su caso, la valoración del daño y la cuantía y modo de indemnizar"],
        ["Competencia para resolver en Aragón (art. 36.2 Ley 5/2021)", "El titular del departamento competente por razón de la materia, salvo que una ley la atribuya al Gobierno"],
        ["Silencio (art. 91.3 Ley 39/2015)", "A los seis meses sin resolución se puede entender desestimada la reclamación"],
        ["Tramitación simplificada (art. 96.4)", "Si la relación de causalidad, la valoración y la cuantía son inequívocas, puede suspenderse el procedimiento general e iniciarse uno simplificado"],
        ["Terminación convencional (art. 86.5)", "Puede terminarse por acuerdo que fije la cuantía y modo de indemnizar conforme al art. 34 de la Ley 40/2015"],
      ],
      preguntas: [
        ["facil", "El derecho a reclamar responsabilidad patrimonial prescribe:", ["Al año de producido el hecho o de manifestarse su efecto lesivo", "A los seis meses", "A los cuatro años", "A los tres meses"], "Art. 67.1 Ley 39/2015."],
        ["media", "En daños físicos a las personas, el plazo de un año empieza a contar:", ["Desde la curación o la determinación del alcance de las secuelas", "Desde el accidente en todo caso", "Desde la primera visita médica", "Desde la presentación de la denuncia"], "Art. 67.1 Ley 39/2015."],
        ["dificil", "En Aragón, el dictamen del Consejo Consultivo es preceptivo en las reclamaciones de responsabilidad patrimonial de cuantía:", ["Igual o superior a 50.000 euros", "Superior a 6.000 euros", "Superior a 300.000 euros", "En todo caso"], "Art. 15.10 Ley 1/2009, redacción de la Ley 5/2021."],
        ["media", "En el procedimiento de responsabilidad patrimonial es preceptivo el informe:", ["Del servicio cuyo funcionamiento causó la presunta lesión, en diez días", "Del Justicia de Aragón", "De la Cámara de Cuentas", "Del Tribunal Superior de Justicia"], "Art. 81.1 Ley 39/2015."],
        ["media", "En la Administración de la Comunidad Autónoma de Aragón, resuelve las reclamaciones de responsabilidad patrimonial:", ["El titular del departamento competente por razón de la materia, salvo que una ley lo atribuya al Gobierno", "El director general", "El Consejo Consultivo", "El jefe de servicio"], "Art. 36.2 Ley 5/2021."],
        ["media", "Si en seis meses desde el inicio no se notifica resolución, la reclamación:", ["Puede entenderse desestimada", "Se entiende estimada", "Caduca", "Se archiva"], "Art. 91.3 Ley 39/2015."],
        ["media", "La resolución debe pronunciarse necesariamente sobre:", ["La relación de causalidad entre el servicio y la lesión y, en su caso, la valoración y cuantía", "La culpa del funcionario", "La sanción al responsable", "La responsabilidad penal"], "Art. 91.2 Ley 39/2015."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["Reclamación directa a la Administración (art. 36.1 Ley 40/2015)", "Los particulares exigen directamente a la Administración la indemnización por los daños causados por su personal, no al empleado"],
        ["Acción de regreso (art. 36.2)", "Tras indemnizar, la Administración exige de oficio a su personal la responsabilidad en que hubiera incurrido por dolo, culpa o negligencia graves, previo procedimiento"],
        ["Criterios para exigirla (art. 36.2)", "Resultado dañoso, grado de culpabilidad, responsabilidad profesional del personal y su relación con el daño"],
        ["Daños a bienes de la Administración (art. 36.3)", "El mismo procedimiento se sigue contra el personal que cause daños en bienes o derechos de la Administración con dolo, culpa o negligencia graves"],
        ["Trámites del procedimiento (art. 36.4)", "Alegaciones 15 días, prueba 15 días, audiencia 10 días, propuesta en 5 días y resolución en 5 días"],
        ["Efecto de la resolución (art. 36.5)", "La resolución que declara la responsabilidad del empleado pone fin a la vía administrativa"],
        ["Responsabilidad penal (art. 37 Ley 40/2015)", "La responsabilidad penal del personal y la civil derivada del delito se exigen según su legislación; no suspenden el procedimiento patrimonial salvo que los hechos penales sean necesarios para fijarla"],
        ["Responsabilidad civil subsidiaria (art. 121 CP)", "Las Administraciones responden subsidiariamente de los daños causados por su personal penalmente responsable en el ejercicio de sus funciones, sin duplicar la indemnización"],
      ],
      preguntas: [
        ["media", "Un ciudadano dañado por la actuación de un funcionario del Gobierno de Aragón debe reclamar la indemnización:", ["Directamente a la Administración", "Directamente al funcionario", "Al Justicia de Aragón", "Al sindicato del funcionario"], "Art. 36.1 Ley 40/2015."],
        ["media", "Tras indemnizar, la Administración exigirá responsabilidad a su empleado cuando haya actuado con:", ["Dolo, culpa o negligencia graves", "Cualquier negligencia leve", "Buena fe", "Siempre, en todo caso"], "Art. 36.2 Ley 40/2015."],
        ["media", "En el procedimiento para exigir responsabilidad al personal, el trámite de audiencia dura:", ["Diez días", "Quince días", "Cinco días", "Un mes"], "Art. 36.4.c) Ley 40/2015."],
        ["dificil", "La exigencia de responsabilidad penal al funcionario:", ["No suspende el procedimiento de responsabilidad patrimonial salvo que los hechos penales sean necesarios para fijarla", "Suspende siempre el procedimiento patrimonial", "Impide la responsabilidad patrimonial", "Sustituye a la acción de regreso"], "Art. 37.2 Ley 40/2015."],
        ["media", "Según el art. 121 del Código Penal, por los delitos de sus funcionarios en el ejercicio de sus cargos, la Administración responde civilmente de forma:", ["Subsidiaria", "Solidaria y principal", "Mancomunada", "No responde nunca"], "Art. 121 CP."],
        ["media", "La resolución que declara la responsabilidad del empleado por el daño:", ["Pone fin a la vía administrativa", "Es recurrible en alzada", "Debe ser confirmada por el juez penal", "Es un acto de trámite"], "Art. 36.5 Ley 40/2015."],
      ],
    },
  ],
  glosario: [
    [S1, "Tipicidad", "Exigencia de que la conducta sancionada y la sanción estén descritas previamente y con precisión en una ley."],
    [S1, "Non bis in idem", "Prohibición de castigar dos veces los mismos hechos cuando coinciden sujeto, hecho y fundamento."],
    [S1, "Reincidencia", "Comisión en el plazo de un año de más de una infracción de la misma naturaleza declarada por resolución firme."],
    [S2, "Instructor", "Persona que tramita el procedimiento sancionador y formula la propuesta de resolución, distinta del órgano que resuelve."],
    [S2, "Pago voluntario", "Pago de la multa antes de la resolución, que termina el procedimiento y da derecho a una reducción si se renuncia a recurrir."],
    [S3, "Lesión resarcible", "Daño efectivo, evaluable e individualizado que el particular no tiene el deber jurídico de soportar."],
    [S3, "Relación de causalidad", "Vínculo directo entre el funcionamiento del servicio público y el daño sufrido, requisito de la responsabilidad patrimonial."],
    [S3, "Fuerza mayor", "Acontecimiento extraordinario, imprevisible e inevitable ajeno al servicio que excluye la responsabilidad de la Administración."],
    [S4, "Consejo Consultivo de Aragón", "Órgano consultivo de la Comunidad Autónoma que dictamina, entre otros asuntos, las reclamaciones de responsabilidad patrimonial de 50.000 € o más."],
    [S5, "Acción de regreso", "Reclamación de la Administración contra su propio empleado para recuperar lo que pagó por un daño causado con dolo o culpa grave."],
    [S5, "Responsabilidad civil subsidiaria", "Obligación de la Administración de pagar los daños del delito de su funcionario cuando este no puede hacerlo."],
  ],
  casos: [
    {
      slug: "multa-actividad-sin-autorizacion",
      titulo: "Una multa por actividad sin autorización",
      supuesto: "El Departamento competente del Gobierno de Aragón tiene noticia de que una empresa ejerce una actividad sin la autorización exigida por una ley aragonesa, que tipifica la conducta como infracción grave con multa de hasta 25.000 euros. No hay norma que atribuya la competencia para sancionar. La empresa ya había sido sancionada por lo mismo hace ocho meses.",
      preguntas: [
        [S2, "media", "El procedimiento se iniciará:", ["De oficio, por acuerdo del órgano competente", "A petición de la empresa", "Por el juez", "Por un vecino directamente"], "Art. 63.1 Ley 39/2015."],
        [S2, "media", "El acuerdo de iniciación debe identificar, entre otros elementos:", ["Los hechos, su posible calificación y sanción, el instructor y el órgano competente", "Solo el nombre de la empresa", "La sanción definitiva", "El abogado de la empresa"], "Art. 64.2 Ley 39/2015."],
        [S1, "dificil", "Sin norma específica, si la multa propuesta es de 15.000 euros, la impondrá:", ["La persona titular de la dirección general", "El director del servicio provincial", "El consejero", "El Gobierno de Aragón"], "Art. 35.3.b) Ley 5/2021: de 12.000 a 30.000 €."],
        [S1, "media", "Si la multa fuera de 8.000 euros, sería competente:", ["El director del servicio provincial", "El director general", "El consejero", "El Presidente"], "Art. 35.3.a) Ley 5/2021."],
        [S1, "media", "Para graduar la sanción, la sanción anterior de hace ocho meses por lo mismo, si es firme en vía administrativa, constituye:", ["Reincidencia", "Infracción continuada", "Concurso medial", "Non bis in idem"], "Art. 29.3.d) Ley 40/2015."],
        [S2, "media", "Si la empresa reconoce su responsabilidad y paga voluntariamente, tendrá una reducción de al menos:", ["El 20 % por cada una, acumulables", "El 50 % total", "El 10 %", "Ninguna"], "Art. 85.3 Ley 39/2015."],
        [S2, "media", "Para disfrutar de esas reducciones, la empresa debe:", ["Desistir o renunciar a cualquier acción o recurso en vía administrativa", "Pagar en efectivo", "Presentar aval", "Esperar a la resolución"], "Art. 85.3 Ley 39/2015."],
        [S2, "media", "Si la empresa no alega frente al acuerdo de iniciación y este contiene un pronunciamiento preciso sobre la responsabilidad:", ["Podrá considerarse propuesta de resolución", "Se archivará el expediente", "Se duplicará la multa", "Se suspenderá el procedimiento"], "Art. 64.2.f) Ley 39/2015."],
        [S1, "media", "Si una ley no fijara plazo, esta infracción grave prescribiría a los:", ["Dos años", "Seis meses", "Tres años", "Un año"], "Art. 30.1 Ley 40/2015."],
        [S2, "media", "La resolución sancionadora será ejecutiva:", ["Cuando no quepa contra ella recurso ordinario en vía administrativa", "Desde la propuesta", "Desde el acuerdo de iniciación", "Nunca"], "Art. 90.3 Ley 39/2015."],
      ],
    },
    {
      slug: "caida-edificio-publico-indemnizacion",
      titulo: "Una caída en un edificio público",
      supuesto: "El 10 de febrero, una ciudadana resbala en el suelo recién fregado y sin señalizar de una oficina del Gobierno de Aragón y se rompe una muñeca. Recibe el alta médica con secuelas determinadas el 20 de septiembre. Reclama 60.000 euros.",
      preguntas: [
        [S3, "media", "Para que nazca la responsabilidad patrimonial, el daño debe ser consecuencia:", ["Del funcionamiento normal o anormal del servicio público", "De un delito del limpiador", "De una ley inconstitucional", "De la fuerza mayor"], "Art. 32.1 Ley 40/2015."],
        [S4, "media", "Al tratarse de lesiones físicas, el plazo de un año para reclamar empieza a contar:", ["Desde la determinación del alcance de las secuelas (20 de septiembre)", "Desde el 10 de febrero", "Desde el 1 de enero siguiente", "Desde que presente la reclamación"], "Art. 67.1 Ley 39/2015."],
        [S4, "media", "En su reclamación debe especificar, entre otros datos:", ["Las lesiones, la relación de causalidad con el servicio y la evaluación económica si es posible", "El nombre del funcionario culpable", "La sanción para el limpiador", "La aseguradora del edificio"], "Art. 67.2 Ley 39/2015."],
        [S4, "media", "Durante la instrucción será preceptivo el informe de:", ["El servicio cuyo funcionamiento causó la lesión, en diez días", "El Justicia de Aragón", "El Tribunal de Cuentas", "La policía"], "Art. 81.1 Ley 39/2015."],
        [S4, "dificil", "Por la cuantía reclamada (60.000 euros), será preceptivo el dictamen de:", ["El Consejo Consultivo de Aragón", "El Consejo de Estado", "Ningún órgano consultivo", "La Junta de Contratación Pública"], "Art. 15.10 Ley 1/2009: 50.000 € o más."],
        [S4, "media", "Ese dictamen se emitirá en el plazo de:", ["Dos meses", "Diez días", "Un mes", "Seis meses"], "Art. 81.2 Ley 39/2015."],
        [S4, "media", "Resolverá la reclamación:", ["El titular del departamento competente por razón de la materia", "El director del servicio provincial", "El Consejo Consultivo", "El Gobierno de Aragón siempre"], "Art. 36.2 Ley 5/2021."],
        [S3, "media", "Para calcular la indemnización por lesiones corporales puede tomarse como referencia:", ["Los baremos de la normativa de seguros obligatorios y de la Seguridad Social", "El sueldo del funcionario", "El precio del edificio", "Lo que decida la reclamante"], "Art. 34.2 Ley 40/2015."],
        [S4, "media", "Si en seis meses desde el inicio no se le notifica resolución, la ciudadana:", ["Puede entender desestimada su reclamación y acudir al contencioso", "Debe esperar indefinidamente", "Tiene la reclamación estimada", "Pierde el derecho"], "Art. 91.3 Ley 39/2015."],
        [S5, "media", "Si se probase que el limpiador actuó con negligencia grave, tras pagar la Administración podría:", ["Exigirle a él la responsabilidad mediante la acción de regreso", "No hacer nada", "Despedirle sin procedimiento", "Repercutir el pago en la ciudadana"], "Art. 36.2 Ley 40/2015."],
      ],
    },
    {
      slug: "funcionario-delito-responsabilidad-civil",
      titulo: "Un funcionario condenado por un delito",
      supuesto: "Un empleado público del Gobierno de Aragón, en el ejercicio de sus funciones, falsifica una certificación que causa un perjuicio económico de 30.000 euros a una empresa. Es condenado penalmente. Paralelamente, la empresa había presentado una reclamación de responsabilidad patrimonial ante la Administración.",
      preguntas: [
        [S5, "media", "La responsabilidad penal del empleado se exigirá:", ["De acuerdo con la legislación penal correspondiente", "Mediante procedimiento administrativo sancionador", "Por la Cámara de Cuentas", "Por el Consejo Consultivo"], "Art. 37.1 Ley 40/2015."],
        [S5, "media", "Si el empleado no puede pagar la responsabilidad civil derivada del delito, la Administración responde:", ["De forma subsidiaria, sin duplicar la indemnización", "De forma principal y adicional", "No responde", "Solo si lo acuerda el Gobierno"], "Art. 121 CP."],
        [S5, "dificil", "Si en el proceso penal se exige la responsabilidad civil del funcionario, la pretensión debe dirigirse también contra:", ["La Administración presuntamente responsable civil subsidiaria", "El sindicato", "La aseguradora de la empresa", "El Justicia de Aragón"], "Art. 121, segundo párrafo, CP."],
        [S5, "media", "¿Suspende el proceso penal el procedimiento de responsabilidad patrimonial?", ["Solo si la determinación de los hechos en el orden penal es necesaria para fijar la responsabilidad patrimonial", "Siempre", "Nunca, en ningún caso", "Solo si lo pide la empresa"], "Art. 37.2 Ley 40/2015."],
        [S5, "media", "En ningún caso la empresa podrá cobrar:", ["Dos veces por el mismo daño (duplicidad indemnizatoria)", "La indemnización completa", "Los intereses", "La actualización"], "Art. 121 CP."],
        [S5, "media", "Si la Administración indemniza a la empresa, podrá exigir después al empleado lo pagado porque actuó con:", ["Dolo", "Culpa leve", "Buena fe", "Error excusable"], "Art. 36.2 Ley 40/2015."],
        [S5, "media", "En ese procedimiento contra el empleado, el plazo de alegaciones es de:", ["Quince días", "Diez días", "Cinco días", "Un mes"], "Art. 36.4.a) Ley 40/2015."],
        [S4, "media", "Como la cuantía reclamada (30.000 euros) es inferior a 50.000 euros, en Aragón:", ["No es preceptivo el dictamen del Consejo Consultivo", "Es preceptivo el dictamen del Consejo de Estado", "Es preceptivo el dictamen del Consejo Consultivo", "Debe resolver el Gobierno"], "Art. 15.10 Ley 1/2009."],
        [S3, "media", "El daño económico de 30.000 euros a la empresa cumple los requisitos de ser:", ["Efectivo, evaluable económicamente e individualizado", "Hipotético", "Moral exclusivamente", "Colectivo indeterminado"], "Art. 32.2 Ley 40/2015."],
        [S5, "media", "La resolución que declare la responsabilidad del empleado frente a la Administración:", ["Pone fin a la vía administrativa", "Debe recurrirse en alzada", "La dicta el juez penal", "Es provisional hasta la sentencia civil"], "Art. 36.5 Ley 40/2015."],
      ],
    },
  ],
});
