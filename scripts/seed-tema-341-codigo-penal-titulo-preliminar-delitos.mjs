/**
 * Crea tema-341 — Tema 14 de Policía Local: "Título Preliminar del Código
 * Penal. De los delitos (Libro I, Título I, Capítulo I)."
 *
 * Fuente: Ley Orgánica 10/1995, de 23 de noviembre, del Código Penal
 * (BOE-A-1995-25444, título verificado), texto consolidado del BOE leído
 * íntegro en los arts. 1 a 18 (descargado de la API de legislación
 * consolidada en octubre de 2026).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-341-codigo-penal-titulo-preliminar-delitos.mjs
 */
import { sembrarTema, POLICIA } from "./lib/sembrar-tema.mjs";

const CP = "https://www.boe.es/buscar/act.php?id=BOE-A-1995-25444";
const a = (ancla) => `${CP}#${ancla}`;
const S1 = "garantias-penales";
const S2 = "aplicacion-ley-penal";
const S3 = "concepto-clases-delito";
const S4 = "error-tentativa";
const S5 = "actos-preparatorios";

await sembrarTema({
  tema: {
    slug: "tema-341",
    titulo: "Código Penal: Título Preliminar (garantías penales y aplicación de la ley penal) y De los delitos",
    descripcion: "Principio de legalidad penal, irretroactividad y retroactividad favorable, garantía jurisdiccional y de ejecución, prohibición de analogía, culpabilidad (no hay pena sin dolo o imprudencia), medidas de seguridad, tiempo de comisión, concurso de normas y aplicación supletoria; concepto de delito, comisión por omisión, imprudencia, delitos graves, menos graves y leves, error de tipo y de prohibición, tentativa y desistimiento, conspiración, proposición, provocación y apología.",
    contenido: "Recorre los arts. 1 a 18 del Código Penal: las garantías que impiden castigar sin ley previa, cómo se aplica la ley en el tiempo y cuándo se aplica la más favorable al reo, qué es un delito y cómo se clasifica por la gravedad de su pena, cuándo se castiga la omisión o la imprudencia, qué efectos tiene el error, cuándo hay tentativa y qué actos preparatorios (conspiración, proposición, provocación) se castigan.",
    enlaces_boe: [{ url: CP, titulo: "Ley Orgánica 10/1995, de 23 de noviembre, del Código Penal (BOE-A-1995-25444)" }],
    indice_estudio: [
      { seccion: S1, titulo: "Garantías penales: legalidad, irretroactividad, garantía jurisdiccional y de ejecución", articulos: "arts. 1-4", url: a("a1") },
      { seccion: S2, titulo: "Culpabilidad, medidas de seguridad, tiempo de comisión, concurso de normas y leyes especiales", articulos: "arts. 5-9", url: a("a5") },
      { seccion: S3, titulo: "Concepto de delito, comisión por omisión, imprudencia y clases de delitos", articulos: "arts. 10-13", url: a("a10") },
      { seccion: S4, titulo: "Error, delito consumado, tentativa y desistimiento", articulos: "arts. 14-16", url: a("a14") },
      { seccion: S5, titulo: "Conspiración, proposición, provocación y apología", articulos: "arts. 17-18", url: a("a17") },
    ],
  },
  vinculo: { oposicion: POLICIA.oposicion, bloqueId: POLICIA.bloqueParte2, numero: 14 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Principio de legalidad (art. 1.1)", "No será castigada ninguna acción ni omisión que no esté prevista como delito por ley anterior a su perpetración"],
        ["¿Cuándo pueden aplicarse medidas de seguridad? (art. 1.2)", "Solo cuando concurran los presupuestos establecidos previamente por la ley"],
        ["Irretroactividad (art. 2.1)", "Ningún delito se castiga con pena no prevista por ley anterior; tampoco tienen efecto retroactivo las leyes que establezcan medidas de seguridad"],
        ["Retroactividad favorable (art. 2.2)", "Tienen efecto retroactivo las leyes penales que favorezcan al reo, aunque haya sentencia firme y esté cumpliendo condena; en caso de duda sobre la ley más favorable, se oye al reo"],
        ["Leyes temporales (art. 2.2)", "Los hechos cometidos bajo su vigencia se juzgan conforme a ellas, salvo que se disponga expresamente lo contrario"],
        ["Garantía jurisdiccional (art. 3.1)", "No puede ejecutarse pena ni medida de seguridad sino en virtud de sentencia firme del juez o tribunal competente"],
        ["Garantía de ejecución (art. 3.2)", "La pena se ejecuta en la forma prescrita por la ley y sus reglamentos, bajo el control de los jueces y tribunales"],
        ["Prohibición de analogía (art. 4.1)", "Las leyes penales no se aplican a casos distintos de los comprendidos expresamente en ellas"],
        ["¿Qué hace el juez ante una conducta no penada que cree digna de represión? (art. 4.2)", "Se abstiene de todo procedimiento y expone al Gobierno las razones para que sea objeto de sanción penal"],
        ["Petición de indulto y dilaciones (art. 4.4)", "Si el cumplimiento puede vulnerar el derecho a un proceso sin dilaciones indebidas, el juez suspende la ejecución mientras se resuelve el indulto"],
      ],
      preguntas: [
        ["facil", "Según el art. 1.1 CP, no será castigada ninguna acción u omisión que no esté prevista como delito por ley…", ["Anterior a su perpetración", "Posterior a su perpetración", "Vigente en el momento del juicio"], "Art. 1.1: principio de legalidad."],
        ["media", "¿Tienen efecto retroactivo las leyes penales que favorezcan al reo si ya existe sentencia firme?", ["Sí, aunque esté cumpliendo condena", "No, nunca tras sentencia firme", "Solo si lo pide el Ministerio Fiscal"], "Art. 2.2."],
        ["media", "En caso de duda sobre cuál es la ley más favorable, el art. 2.2 CP dispone que…", ["Será oído el reo", "Decidirá el Gobierno", "Se aplicará siempre la ley posterior"], "Art. 2.2."],
        ["media", "Los hechos cometidos bajo una ley temporal se juzgan…", ["Conforme a ella, salvo disposición expresa en contrario", "Siempre por la ley posterior", "Por la ley más grave"], "Art. 2.2, último inciso."],
        ["facil", "¿Puede ejecutarse una pena sin sentencia firme?", ["No", "Sí, si hay flagrancia", "Sí, si la pena es leve"], "Art. 3.1: garantía jurisdiccional."],
        ["media", "Si un juez conoce una conducta no penada que estima digna de represión, debe…", ["Abstenerse de todo procedimiento y exponerlo al Gobierno", "Castigarla por analogía", "Remitirla a las Cortes para que la juzguen"], "Art. 4.2."],
        ["dificil", "¿Qué puede hacer el juez si hay petición de indulto y la ejecución de la pena haría ilusoria su finalidad?", ["Suspender la ejecución mientras se resuelve el indulto", "Conceder él mismo el indulto", "Archivar la causa"], "Art. 4.4, párrafo segundo."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Principio de culpabilidad (art. 5)", "No hay pena sin dolo o imprudencia"],
        ["Fundamento de las medidas de seguridad (art. 6.1)", "La peligrosidad criminal del sujeto, exteriorizada en la comisión de un hecho previsto como delito"],
        ["Límite de las medidas de seguridad (art. 6.2)", "No pueden ser más gravosas ni más largas que la pena abstractamente aplicable, ni exceder lo necesario para prevenir la peligrosidad"],
        ["Momento de comisión del delito (art. 7)", "Cuando el sujeto ejecuta la acción u omite el acto que estaba obligado a realizar"],
        ["Reglas del concurso de normas (art. 8)", "1.ª especialidad; 2.ª subsidiariedad; 3.ª consunción (el precepto más amplio o complejo absorbe); 4.ª alternatividad (el más grave excluye al de pena menor)"],
        ["Delitos de leyes especiales (art. 9)", "Se les aplica el Título Preliminar; el resto del Código, como supletorio en lo no previsto por ellas"],
      ],
      preguntas: [
        ["facil", "¿Qué establece el art. 5 CP?", ["No hay pena sin dolo o imprudencia", "No hay pena sin juicio", "No hay delito sin víctima"], "Art. 5."],
        ["media", "Las medidas de seguridad se fundamentan en…", ["La peligrosidad criminal del sujeto exteriorizada en un hecho delictivo", "La gravedad del daño causado", "La reincidencia del sujeto"], "Art. 6.1."],
        ["media", "A efectos de la ley aplicable en el tiempo, el delito se considera cometido…", ["Cuando el sujeto ejecuta la acción u omite el acto debido", "Cuando se produce el resultado", "Cuando se presenta la denuncia"], "Art. 7."],
        ["media", "Según el art. 8 CP, el precepto especial se aplica…", ["Con preferencia al general", "Solo si es más grave", "En defecto del general"], "Art. 8, regla 1.ª."],
        ["dificil", "En defecto de los criterios de especialidad, subsidiariedad y consunción, ¿qué regla aplica el art. 8 CP?", ["El precepto más grave excluye los que castigan con pena menor", "Se aplica el más favorable al reo", "Se aplican todos acumulados"], "Art. 8, regla 4.ª."],
        ["media", "¿Qué parte del Código se aplica directamente a los delitos penados por leyes especiales?", ["Las disposiciones del Título Preliminar", "Solo el Libro II", "Ninguna"], "Art. 9."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Concepto de delito (art. 10)", "Las acciones y omisiones dolosas o imprudentes penadas por la ley"],
        ["Comisión por omisión (art. 11)", "Los delitos de resultado se cometen por omisión cuando no evitarlo, infringiendo un especial deber jurídico del autor, equivale a causarlo"],
        ["Casos de equiparación de la omisión a la acción (art. 11)", "a) Específica obligación legal o contractual de actuar; b) el omitente creó una ocasión de riesgo con una acción u omisión precedente"],
        ["¿Cuándo se castiga la imprudencia? (art. 12)", "Solo cuando expresamente lo disponga la ley"],
        ["Clases de delitos por su gravedad (art. 13)", "Graves (pena grave), menos graves (pena menos grave) y leves (pena leve)"],
        ["Pena que encaja en grave y menos grave (art. 13.4)", "El delito se considera, en todo caso, grave"],
        ["Pena que encaja en leve y menos grave (art. 13.4)", "El delito se considera, en todo caso, leve"],
      ],
      preguntas: [
        ["facil", "Son delitos, según el art. 10 CP, las acciones y omisiones…", ["Dolosas o imprudentes penadas por la ley", "Contrarias a la moral", "Sancionadas por la Administración"], "Art. 10."],
        ["media", "¿Cuándo se castigan las acciones u omisiones imprudentes?", ["Solo cuando expresamente lo disponga la ley", "Siempre", "Nunca"], "Art. 12."],
        ["media", "Se equipara la omisión a la acción cuando…", ["Existe una específica obligación legal o contractual de actuar", "El omitente es mayor de edad", "El resultado es leve"], "Art. 11.a)."],
        ["media", "Quien con una acción precedente crea una ocasión de riesgo para el bien jurídico y no evita el resultado…", ["Puede responder por comisión por omisión", "Nunca responde", "Responde solo por un delito leve"], "Art. 11.b)."],
        ["media", "Si la pena de un delito, por su extensión, puede considerarse a la vez grave y menos grave, el delito es…", ["Grave", "Menos grave", "Leve"], "Art. 13.4."],
        ["dificil", "Si la pena, por su extensión, puede considerarse leve y menos grave, el delito es…", ["Leve", "Menos grave", "Grave"], "Art. 13.4, segundo inciso."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Error de tipo invencible (art. 14.1)", "Excluye la responsabilidad criminal"],
        ["Error de tipo vencible (art. 14.1)", "La infracción se castiga, en su caso, como imprudente"],
        ["Error sobre una agravante o elemento cualificador (art. 14.2)", "Impide su apreciación"],
        ["Error de prohibición (art. 14.3)", "Sobre la ilicitud del hecho: invencible excluye la responsabilidad; vencible, pena inferior en uno o dos grados"],
        ["¿Qué es punible según el art. 15?", "El delito consumado y la tentativa de delito"],
        ["Tentativa (art. 16.1)", "Se da principio a la ejecución por hechos exteriores, practicando todos o parte de los actos que deberían producir el resultado, y este no se produce por causas independientes de la voluntad del autor"],
        ["Desistimiento voluntario (art. 16.2)", "Queda exento por el delito intentado quien evita voluntariamente la consumación, desistiendo o impidiendo el resultado, sin perjuicio de los actos ya ejecutados que constituyan otro delito"],
        ["Desistimiento con varios intervinientes (art. 16.3)", "Quedan exentos quienes desistan e impidan o intenten impedir, seria, firme y decididamente, la consumación"],
      ],
      preguntas: [
        ["media", "El error invencible sobre un hecho constitutivo de la infracción…", ["Excluye la responsabilidad criminal", "Atenúa la pena en un grado", "No tiene efecto alguno"], "Art. 14.1."],
        ["media", "Si el error sobre un hecho constitutivo de la infracción es vencible, la infracción se castiga…", ["En su caso, como imprudente", "Como dolosa con pena agravada", "Con pena de multa en todo caso"], "Art. 14.1."],
        ["dificil", "El error vencible sobre la ilicitud del hecho conlleva…", ["La pena inferior en uno o dos grados", "La exención total", "La pena superior en grado"], "Art. 14.3."],
        ["facil", "¿Son punibles la tentativa y el delito consumado?", ["Sí, ambos", "Solo el consumado", "Solo la tentativa de delitos graves"], "Art. 15."],
        ["media", "Hay tentativa cuando el resultado no se produce por causas…", ["Independientes de la voluntad del autor", "Dependientes de la voluntad del autor", "Imputables a la víctima exclusivamente"], "Art. 16.1."],
        ["media", "Quien evita voluntariamente la consumación del delito ya iniciado…", ["Queda exento por el delito intentado, aunque responde de los actos ya ejecutados si son otro delito", "Responde igual que por la tentativa", "Responde como autor del delito consumado"], "Art. 16.2."],
        ["dificil", "El error sobre una circunstancia agravante…", ["Impide su apreciación", "La convierte en atenuante", "No produce ningún efecto"], "Art. 14.2."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["Conspiración (art. 17.1)", "Dos o más personas se conciertan para la ejecución de un delito y resuelven ejecutarlo"],
        ["Proposición (art. 17.2)", "El que ha resuelto cometer un delito invita a otra u otras personas a participar en él"],
        ["¿Cuándo se castigan conspiración y proposición? (art. 17.3)", "Solo en los casos especialmente previstos en la ley"],
        ["Provocación (art. 18.1)", "Incitación directa a cometer un delito por la imprenta, la radiodifusión u otro medio semejante que facilite la publicidad, o ante una concurrencia de personas"],
        ["Apología (art. 18.1)", "Exposición pública de ideas o doctrinas que ensalcen el crimen o enaltezcan a su autor; solo es delictiva como forma de provocación e incitación directa"],
        ["Provocación seguida del delito (art. 18.2)", "Se castiga como inducción"],
      ],
      preguntas: [
        ["facil", "Dos personas se conciertan para ejecutar un delito y resuelven ejecutarlo. Es…", ["Conspiración", "Proposición", "Provocación"], "Art. 17.1."],
        ["media", "Quien ha resuelto cometer un delito e invita a otro a participar realiza…", ["Proposición", "Conspiración", "Apología"], "Art. 17.2."],
        ["media", "¿Cuándo se castigan la conspiración y la proposición para delinquir?", ["Solo en los casos especialmente previstos en la ley", "Siempre", "Solo si el delito llega a consumarse"], "Art. 17.3."],
        ["media", "Si a la provocación le sigue la perpetración del delito, se castiga como…", ["Inducción", "Complicidad", "Encubrimiento"], "Art. 18.2."],
        ["dificil", "La apología solo es delictiva…", ["Como forma de provocación y si constituye incitación directa a cometer un delito", "Siempre que se haga en público", "Cuando se hace en redes sociales"], "Art. 18.1, párrafo segundo."],
      ],
    },
  ],
  glosario: [
    [S1, "Principio de legalidad penal", "No hay delito ni pena sin ley previa que los establezca (arts. 1 y 2 CP)."],
    [S1, "Analogía", "Aplicar una norma a un caso no comprendido en ella por su semejanza; prohibida en Derecho penal (art. 4.1)."],
    [S2, "Medida de seguridad", "Consecuencia penal basada en la peligrosidad criminal del sujeto, no en su culpabilidad."],
    [S2, "Concurso de normas", "Hecho que encaja en varios preceptos penales; se resuelve con las reglas del art. 8."],
    [S3, "Comisión por omisión", "Responder de un resultado por no evitarlo teniendo un especial deber jurídico de hacerlo."],
    [S3, "Imprudencia", "Infracción del deber de cuidado; solo se castiga cuando la ley lo prevé expresamente."],
    [S4, "Error de prohibición", "Error sobre la ilicitud del hecho, no sobre sus elementos."],
    [S4, "Desistimiento", "Abandono voluntario de la ejecución o evitación del resultado que exime por la tentativa."],
    [S5, "Apología", "Exposición pública de ideas que ensalzan el crimen o a su autor."],
  ],
  casos: [
    {
      slug: "caso-robo-interrumpido-desistimiento",
      titulo: "Un intento de robo en un local",
      supuesto: "Una patrulla acude a un comercio donde dos personas han forzado la persiana. Una de ellas, al oír a un vecino, se marcha y avisa a su compañero para que no siga; el otro continúa, pero huye sin llevarse nada al ver llegar el coche patrulla. Días antes, ambos habían acordado el golpe con un tercero que no acudió.",
      preguntas: [
        [S4, "media", "Quien huye sin llevarse nada al ver llegar a la policía, ¿en qué fase queda el delito?", ["Tentativa: el resultado no se produce por causas ajenas a su voluntad", "Desistimiento voluntario", "Delito consumado"], "Art. 16.1."],
        [S4, "dificil", "Para que el que se marchó quede exento por el delito intentado, al haber varios intervinientes, debe…", ["Desistir e impedir o intentar impedir seria, firme y decididamente la consumación", "Limitarse a irse", "Confesar en el juicio"], "Art. 16.3."],
        [S4, "media", "Aunque quede exento por el delito intentado, ¿responde por los daños causados al forzar la persiana?", ["Sí, si esos actos constituyen ya otro delito", "No, nunca", "Solo si lo pide el comerciante"], "Art. 16.2."],
        [S5, "media", "El acuerdo previo de los tres para cometer el robo y resolver ejecutarlo es…", ["Conspiración", "Proposición", "Provocación"], "Art. 17.1."],
        [S5, "media", "¿Se castiga siempre esa conspiración?", ["No, solo en los casos especialmente previstos en la ley", "Sí, siempre", "Solo si el delito se consuma"], "Art. 17.3."],
        [S3, "facil", "¿Es el robo intentado una acción penada por la ley?", ["Sí, la tentativa es punible", "No, solo lo consumado", "Solo si hay violencia"], "Arts. 10 y 15."],
        [S2, "media", "A efectos de la ley aplicable, el delito se cometió…", ["Cuando ejecutaron la acción", "Cuando se presentó la denuncia", "Cuando se dicte sentencia"], "Art. 7."],
        [S1, "media", "Si después del hecho entra en vigor una ley que castiga ese robo con menos pena, ¿cuál se aplica?", ["La nueva, por ser favorable al reo", "Siempre la vigente al cometerlo", "La que elija el juez libremente"], "Art. 2.2."],
        [S1, "facil", "¿Quién puede imponerles una pena?", ["Un juez o tribunal competente, por sentencia firme", "La patrulla que intervino", "El Ayuntamiento"], "Art. 3.1."],
        [S2, "media", "Si el hecho encaja en dos preceptos, uno especial y otro general, se aplica…", ["El especial", "El general", "Ambos"], "Art. 8.1.ª."],
      ],
    },
    {
      slug: "caso-socorrista-omision",
      titulo: "La piscina sin vigilancia",
      supuesto: "En una piscina municipal, el socorrista contratado abandona su puesto para atender asuntos personales. Un menor sufre un percance en el agua y resulta gravemente herido porque nadie interviene. La familia denuncia ante la Policía Local.",
      preguntas: [
        [S3, "media", "¿Puede responder el socorrista del resultado aunque no lo causó con una acción?", ["Sí, por comisión por omisión, al tener una obligación contractual de actuar", "No, nunca se responde por no actuar", "Solo si es funcionario"], "Art. 11.a)."],
        [S3, "media", "La comisión por omisión exige que la no evitación del resultado…", ["Equivalga, según el texto de la ley, a su causación por infringir un especial deber jurídico", "Sea dolosa siempre", "Ocurra en vía pública"], "Art. 11."],
        [S3, "media", "Si no quiso el resultado pero infringió el deber de cuidado, ¿se le castiga?", ["Solo si la ley prevé expresamente la modalidad imprudente", "Siempre", "Nunca"], "Art. 12."],
        [S2, "facil", "¿Puede imponerse pena sin dolo ni imprudencia?", ["No", "Sí, por el resultado", "Sí, si la víctima es menor"], "Art. 5."],
        [S3, "facil", "¿Cómo se clasifican los delitos por su pena?", ["Graves, menos graves y leves", "Mayores y menores", "Públicos y privados"], "Art. 13."],
        [S1, "media", "¿Puede el juez castigar una conducta parecida pero no prevista en la ley?", ["No, las leyes penales no se aplican a casos distintos de los previstos", "Sí, por analogía", "Sí, si es grave"], "Art. 4.1."],
        [S4, "dificil", "Si alegara que ignoraba que abandonar el puesto fuera ilícito y ese error fuese vencible…", ["Se le aplicaría la pena inferior en uno o dos grados", "Quedaría exento", "Se le agravaría la pena"], "Art. 14.3."],
        [S3, "media", "También responde por omisión quien, con una conducta precedente, creó la ocasión de riesgo…", ["Sí", "No", "Solo si es menor de edad"], "Art. 11.b)."],
        [S1, "media", "¿Puede ejecutarse la pena de otra forma que la prescrita por la ley?", ["No", "Sí, si lo decide la Administración", "Sí, si el condenado lo pide"], "Art. 3.2."],
        [S2, "dificil", "Si el hecho encaja en un precepto principal y otro subsidiario…", ["El subsidiario solo se aplica en defecto del principal", "Se aplica siempre el subsidiario", "Se aplican ambos"], "Art. 8.2.ª."],
      ],
    },
    {
      slug: "caso-mensajes-incitacion-redes",
      titulo: "Mensajes en redes que incitan a delinquir",
      supuesto: "La unidad de investigación detecta que un usuario publica en una red social mensajes que animan directamente a sus seguidores a destrozar el mobiliario urbano de una plaza el próximo sábado, y otros que ensalzan a quienes lo hicieron el año anterior. El sábado se producen destrozos.",
      preguntas: [
        [S5, "media", "Incitar directamente a cometer un delito por un medio que facilita la publicidad es…", ["Provocación", "Proposición", "Conspiración"], "Art. 18.1."],
        [S5, "media", "Como a la provocación siguió la perpetración del delito, se castiga como…", ["Inducción", "Complicidad", "Tentativa"], "Art. 18.2."],
        [S5, "dificil", "Los mensajes que ensalzan a quienes cometieron los destrozos el año anterior son delictivos…", ["Solo si constituyen una incitación directa a cometer un delito", "Siempre", "Nunca"], "Art. 18.1, párrafo segundo."],
        [S5, "media", "¿Se castiga siempre la provocación?", ["Solo en los casos en que la ley lo prevea", "Sí, siempre", "No, nunca"], "Art. 18.2."],
        [S1, "facil", "¿Podría castigarse una conducta que no estaba prevista como delito cuando se cometió?", ["No", "Sí, si causa alarma", "Sí, si hay reincidencia"], "Art. 1.1."],
        [S2, "media", "Si se publica después una ley más dura para estos hechos, ¿se aplica retroactivamente?", ["No, las leyes desfavorables no son retroactivas", "Sí", "Solo a los hechos graves"], "Art. 2.1."],
        [S3, "media", "Si la pena prevista puede considerarse leve y menos grave, el delito es…", ["Leve", "Grave", "Menos grave"], "Art. 13.4."],
        [S4, "media", "Si un seguidor intenta romper un banco pero lo detiene un agente antes de lograrlo, hay…", ["Tentativa", "Desistimiento", "Delito consumado"], "Art. 16.1."],
        [S2, "media", "¿Cuándo se entiende cometido el delito de quien publica los mensajes?", ["Cuando ejecuta la acción de publicarlos", "Cuando se producen los destrozos", "Cuando la policía los descubre"], "Art. 7."],
        [S1, "media", "Si el juez considera la pena notablemente excesiva, ¿qué puede hacer?", ["Acudir al Gobierno proponiendo el indulto, sin perjuicio de ejecutar la sentencia", "Rebajar la pena por su cuenta", "Dejar de aplicar la ley"], "Art. 4.3."],
      ],
    },
  ],
});
