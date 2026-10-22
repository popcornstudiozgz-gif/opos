/**
 * Crea tema-343 — Tema 16 de Policía Local: "Personas criminalmente
 * responsables de los delitos (Libro I, Título II)."
 *
 * Fuente: Ley Orgánica 10/1995, del Código Penal (BOE-A-1995-25444), texto
 * consolidado del BOE leído íntegro en los arts. 27 a 31 quinquies.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-343-codigo-penal-personas-responsables.mjs
 */
import { sembrarTema, POLICIA } from "./lib/sembrar-tema.mjs";

const CP = "https://www.boe.es/buscar/act.php?id=BOE-A-1995-25444";
const a = (ancla) => `${CP}#${ancla}`;
const S1 = "autores-complices";
const S2 = "delitos-medios-difusion";
const S3 = "actuacion-en-nombre-de-otro";
const S4 = "responsabilidad-personas-juridicas";

await sembrarTema({
  tema: {
    slug: "tema-343",
    titulo: "Código Penal: personas criminalmente responsables de los delitos",
    descripcion: "Autores y cómplices; autoría directa, coautoría y autoría mediata; inductores y cooperadores necesarios; complicidad; responsabilidad escalonada en los delitos cometidos por medios de difusión; actuación en nombre de otro; responsabilidad penal de las personas jurídicas, modelos de organización y gestión (compliance), atenuantes propias y entidades excluidas.",
    contenido: "Recorre el Título II del Libro I del Código Penal (arts. 27 a 31 quinquies): quiénes responden de un delito (autores y cómplices), qué formas de autoría existen y a quién se equipara al autor, cómo se reparte la responsabilidad en los delitos cometidos a través de la prensa o la radio, qué ocurre con el administrador que actúa por una sociedad, y cuándo responde penalmente una persona jurídica y cómo puede quedar exenta.",
    enlaces_boe: [{ url: CP, titulo: "Ley Orgánica 10/1995, de 23 de noviembre, del Código Penal (BOE-A-1995-25444)" }],
    indice_estudio: [
      { seccion: S1, titulo: "Autores y cómplices", articulos: "arts. 27-29", url: a("a27") },
      { seccion: S2, titulo: "Delitos cometidos por medios o soportes de difusión mecánicos", articulos: "art. 30", url: a("a30") },
      { seccion: S3, titulo: "Actuación en nombre o representación de otro", articulos: "art. 31", url: a("a31") },
      { seccion: S4, titulo: "Responsabilidad penal de las personas jurídicas", articulos: "arts. 31 bis a 31 quinquies", url: a("a31bis") },
    ],
  },
  vinculo: { oposicion: POLICIA.oposicion, bloqueId: POLICIA.bloqueParte2, numero: 16 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["¿Quiénes son responsables criminalmente de los delitos? (art. 27)", "Los autores y los cómplices"],
        ["Formas de autoría del art. 28, párrafo primero", "Realizar el hecho por sí solo (autoría directa), conjuntamente (coautoría) o por medio de otro del que se sirven como instrumento (autoría mediata)"],
        ["¿A quiénes considera también autores el art. 28?", "a) A los que inducen directamente a otro a ejecutarlo; b) a los que cooperan con un acto sin el cual no se habría efectuado (cooperadores necesarios)"],
        ["Cómplices (art. 29)", "Quienes, sin ser autores, cooperan a la ejecución del hecho con actos anteriores o simultáneos"],
        ["Diferencia entre cooperador necesario y cómplice", "El cooperador necesario aporta un acto sin el cual el hecho no se habría efectuado y se considera autor; el cómplice aporta una cooperación no imprescindible"],
        ["¿Puede ser cómplice quien interviene después del delito?", "No: la complicidad exige actos anteriores o simultáneos a la ejecución (art. 29)"],
      ],
      preguntas: [
        ["facil", "Según el art. 27 CP, son responsables criminalmente de los delitos…", ["Los autores y los cómplices", "Los autores, cómplices y encubridores", "Solo los autores"], "Art. 27."],
        ["media", "Quien realiza el hecho por medio de otro del que se sirve como instrumento es…", ["Autor (autoría mediata)", "Cómplice", "Inductor"], "Art. 28."],
        ["media", "Quien coopera a la ejecución con un acto sin el cual no se habría efectuado se considera…", ["Autor", "Cómplice", "Encubridor"], "Art. 28.b)."],
        ["media", "Quien induce directamente a otro a ejecutar un delito se considera…", ["Autor", "Cómplice", "No responde"], "Art. 28.a)."],
        ["media", "Los cómplices cooperan a la ejecución con actos…", ["Anteriores o simultáneos", "Posteriores", "Anteriores, simultáneos o posteriores"], "Art. 29."],
        ["dificil", "Tres personas ejecutan juntas un robo repartiéndose las tareas esenciales. Son…", ["Coautores", "Un autor y dos cómplices", "Inductores"], "Art. 28: realizan el hecho conjuntamente."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["¿Responden los cómplices en los delitos cometidos por medios de difusión mecánicos? (art. 30.1)", "No: no responden ni los cómplices ni quienes los hubieren favorecido personal o realmente"],
        ["Orden de responsabilidad escalonada del art. 30.2", "1.º quienes redactaron el texto o produjeron el signo y quienes les indujeron; 2.º directores de la publicación o programa; 3.º directores de la empresa editora, emisora o difusora; 4.º directores de la empresa grabadora, reproductora o impresora"],
        ["Carácter de esa responsabilidad", "Escalonada, excluyente y subsidiaria"],
        ["¿Cuándo pasa la responsabilidad al siguiente escalón? (art. 30.3)", "Cuando por cualquier motivo distinto de la extinción de la responsabilidad (incluida la rebeldía o residir fuera de España) no pueda perseguirse a los del número anterior"],
      ],
      preguntas: [
        ["media", "En los delitos cometidos con medios de difusión mecánicos, ¿responden los cómplices?", ["No", "Sí", "Solo si son directores"], "Art. 30.1."],
        ["media", "¿Quién responde en primer lugar en un delito cometido a través de un periódico?", ["Quien realmente redactó el texto y quien le indujo", "El director de la empresa impresora", "El director del periódico"], "Art. 30.2.1.º."],
        ["dificil", "Si el redactor está en rebeldía y no puede ser perseguido, el procedimiento se dirige contra…", ["El director de la publicación o programa", "El director de la empresa impresora", "Nadie"], "Art. 30.3."],
        ["media", "La responsabilidad del art. 30 CP es…", ["Escalonada, excluyente y subsidiaria", "Solidaria", "Mancomunada"], "Art. 30.2."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Actuación en nombre de otro (art. 31)", "El administrador de hecho o de derecho de una persona jurídica, o quien actúa en representación de otro, responde personalmente aunque no reúna las condiciones que exige el delito, si concurren en la entidad o persona representada"],
        ["Finalidad del art. 31", "Evitar la impunidad en delitos especiales cuando la cualidad exigida (por ejemplo, ser deudor u obligado tributario) la tiene la sociedad y no quien actúa por ella"],
      ],
      preguntas: [
        ["media", "El administrador de hecho de una sociedad que comete un delito que exige una cualidad que solo tiene la sociedad…", ["Responde personalmente", "No responde nunca", "Solo responde la sociedad"], "Art. 31."],
        ["media", "¿Alcanza el art. 31 al representante voluntario de otra persona?", ["Sí, al que actúa en nombre o representación legal o voluntaria de otro", "No, solo al representante legal", "Solo a los abogados"], "Art. 31."],
        ["facil", "¿Comprende el art. 31 al administrador de hecho, además del de derecho?", ["Sí", "No", "Solo en sociedades anónimas"], "Art. 31."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Primer título de imputación de la persona jurídica (art. 31 bis.1.a)", "Delitos cometidos en su nombre o por su cuenta, y en su beneficio directo o indirecto, por sus representantes legales o quienes pueden decidir u ostentan facultades de organización y control"],
        ["Segundo título de imputación (art. 31 bis.1.b)", "Delitos de los sometidos a la autoridad de esas personas, posibles por haberse incumplido gravemente los deberes de supervisión, vigilancia y control"],
        ["Condiciones de exención por delitos de directivos (art. 31 bis.2)", "Modelo de organización y gestión eficaz previo; supervisión confiada a un órgano con poderes autónomos; que los autores eludieran fraudulentamente el modelo; y que no hubiera omisión o insuficiencia de la supervisión"],
        ["Personas jurídicas de pequeñas dimensiones (art. 31 bis.3)", "Las autorizadas a presentar cuenta de pérdidas y ganancias abreviada; su órgano de administración puede asumir la supervisión"],
        ["Requisitos de los modelos de prevención (art. 31 bis.5)", "Identificar actividades de riesgo, protocolos de decisión, gestión de recursos financieros, obligación de informar, sistema disciplinario y verificación periódica"],
        ["¿Exige el art. 31 ter individualizar a la persona física responsable?", "No: la responsabilidad de la persona jurídica es exigible aunque la persona física no se haya individualizado o no se le pueda perseguir"],
        ["Atenuantes de la persona jurídica (art. 31 quater)", "Confesar antes de conocer el procedimiento, colaborar aportando pruebas nuevas y decisivas, reparar o disminuir el daño antes del juicio oral y establecer medidas eficaces de prevención antes del juicio oral"],
        ["Entidades excluidas (art. 31 quinquies.1)", "El Estado, las Administraciones públicas territoriales e institucionales, organismos reguladores, agencias y entidades públicas empresariales, organizaciones internacionales de derecho público y las que ejerzan potestades públicas"],
        ["Sociedades mercantiles públicas (art. 31 quinquies.2)", "Solo se les pueden imponer las penas de multa y de intervención judicial (art. 33.7 a y g), salvo que se hayan creado para eludir la responsabilidad penal"],
      ],
      preguntas: [
        ["facil", "¿Puede una persona jurídica ser penalmente responsable?", ["Sí, en los supuestos previstos en el Código", "No, nunca", "Solo si es extranjera"], "Art. 31 bis.1."],
        ["media", "¿Responde penalmente un Ayuntamiento como persona jurídica?", ["No: las Administraciones públicas territoriales están excluidas", "Sí, como cualquier empresa", "Solo si tiene más de 50.000 habitantes"], "Art. 31 quinquies.1."],
        ["media", "¿Impide que responda la persona jurídica el que el empleado autor haya fallecido?", ["No", "Sí", "Solo si murió antes del juicio"], "Art. 31 ter.2."],
        ["media", "Para que la confesión atenúe a la persona jurídica, debe hacerse…", ["Antes de conocer que el procedimiento judicial se dirige contra ella", "En el juicio oral", "Tras la sentencia"], "Art. 31 quater.a)."],
        ["dificil", "¿Qué penas pueden imponerse a una sociedad mercantil pública que presta servicios de interés económico general?", ["Solo multa e intervención judicial", "Todas las del art. 33.7", "Ninguna"], "Art. 31 quinquies.2."],
        ["dificil", "¿Qué son personas jurídicas de pequeñas dimensiones a estos efectos?", ["Las autorizadas a presentar cuenta de pérdidas y ganancias abreviada", "Las de menos de 5 trabajadores", "Las que no tienen ánimo de lucro"], "Art. 31 bis.3."],
        ["media", "Si la acreditación de las condiciones del modelo de prevención es solo parcial…", ["Se valora a efectos de atenuar la pena", "La persona jurídica queda exenta", "Se agrava la pena"], "Art. 31 bis.2, párrafo segundo."],
        ["media", "Cuando se impone multa a la persona física y a la jurídica por los mismos hechos, el juez…", ["Modula las cuantías para que la suma no sea desproporcionada", "Duplica la multa", "Solo multa a la jurídica"], "Art. 31 ter.1."],
      ],
    },
  ],
  glosario: [
    [S1, "Autoría mediata", "Cometer el delito sirviéndose de otra persona como instrumento."],
    [S1, "Coautoría", "Realización conjunta del hecho por varias personas."],
    [S1, "Cooperador necesario", "Quien aporta un acto sin el cual el delito no se habría cometido; se le considera autor."],
    [S1, "Cómplice", "Quien coopera con actos anteriores o simultáneos no imprescindibles."],
    [S2, "Responsabilidad en cascada", "Sistema escalonado, excluyente y subsidiario del art. 30 para delitos cometidos por medios de difusión."],
    [S3, "Administrador de hecho", "Quien gestiona realmente una sociedad sin nombramiento formal."],
    [S4, "Compliance", "Modelo de organización y gestión para prevenir delitos en la persona jurídica (art. 31 bis)."],
  ],
  casos: [
    {
      slug: "caso-alunizaje-reparto-tareas",
      titulo: "Un alunizaje con reparto de tareas",
      supuesto: "Una banda empotra un coche robado contra el escaparate de una tienda de electrónica. A conduce y empotra el coche, B y C entran y cargan los productos, D vigila la esquina y avisa por móvil, y E, que les prestó las llaves de una nave para esconder el botín, lo hizo días antes sabiendo para qué era. F, el ideólogo, convenció a A para participar.",
      preguntas: [
        [S1, "media", "A, B y C, que ejecutan conjuntamente el hecho, son…", ["Coautores", "Cómplices", "Encubridores"], "Art. 28."],
        [S1, "media", "F, que convenció directamente a A para participar, se considera…", ["Autor, como inductor", "Cómplice", "No responde"], "Art. 28.a)."],
        [S1, "dificil", "D, que vigila y avisa, si su aportación no es imprescindible para el robo, sería…", ["Cómplice", "Cooperador necesario", "Inductor"], "Art. 29."],
        [S1, "media", "E presta la nave antes del hecho y sabiendo su destino. Su aportación es un acto…", ["Anterior, que puede constituir complicidad", "Posterior, que nunca es participación", "Irrelevante"], "Art. 29."],
        [S1, "facil", "¿Quiénes responden criminalmente del delito?", ["Los autores y los cómplices", "Solo quien conduce", "Solo F"], "Art. 27."],
        [S1, "media", "Si sin el coche empotrado de A el robo no se hubiera podido realizar, la aportación de A es…", ["De autor", "De cómplice", "Irrelevante"], "Art. 28."],
        [S1, "dificil", "Si un tercero, sin acuerdo previo, compra después parte del botín, ¿es cómplice?", ["No: la complicidad exige actos anteriores o simultáneos", "Sí", "Sí, si paga poco"], "Art. 29."],
        [S3, "media", "Si el coche lo hubiera alquilado E como administrador de una sociedad, ¿respondería personalmente?", ["Sí, si concurren los requisitos del delito", "No, solo la sociedad", "Nunca"], "Art. 31."],
        [S4, "media", "¿Respondería penalmente la tienda víctima como persona jurídica?", ["No: es la perjudicada", "Sí", "Solo si tiene seguro"], "Art. 31 bis exige delitos cometidos en su beneficio."],
        [S1, "media", "Si A actuó engañado por F, creyendo que retiraba su propio coche, F podría ser…", ["Autor mediato que utiliza a A como instrumento", "Cómplice", "No responde"], "Art. 28."],
      ],
    },
    {
      slug: "caso-vertido-empresa-compliance",
      titulo: "Un vertido desde una empresa",
      supuesto: "La Policía Local detecta un vertido grave de residuos al Canal Imperial desde una nave industrial. El encargado de planta ordenó el vertido para ahorrar costes y en beneficio de la empresa. La empresa alega que tenía un plan de prevención de delitos, aunque nadie lo supervisaba. El vertido lo ejecutó un operario siguiendo las órdenes.",
      preguntas: [
        [S4, "media", "¿Puede responder penalmente la empresa por el delito cometido en su beneficio por quien tiene facultades de organización?", ["Sí", "No, nunca", "Solo si el encargado es socio"], "Art. 31 bis.1.a)."],
        [S4, "dificil", "¿Queda exenta la empresa por tener un plan de prevención que nadie supervisaba?", ["No: la supervisión debe confiarse a un órgano con poderes autónomos y ejercerse", "Sí, basta con tenerlo", "Sí, si lo tenía por escrito"], "Art. 31 bis.2, condiciones 2.ª y 4.ª."],
        [S4, "media", "Si la empresa colabora aportando pruebas nuevas y decisivas durante el proceso…", ["Puede apreciarse una atenuante", "Queda exenta", "Se agrava su pena"], "Art. 31 quater.b)."],
        [S4, "media", "Si la empresa implanta medidas eficaces de prevención antes del juicio oral…", ["Es una atenuante", "Es una eximente", "No tiene efecto"], "Art. 31 quater.d)."],
        [S4, "media", "¿Es necesario identificar al operario concreto para que responda la empresa?", ["No", "Sí, siempre", "Solo si es grave"], "Art. 31 ter.1."],
        [S4, "facil", "Un requisito de los modelos de prevención es…", ["Establecer un sistema disciplinario que sancione su incumplimiento", "Tener más de 100 trabajadores", "Estar inscritos en el Registro Civil"], "Art. 31 bis.5.5.º."],
        [S1, "media", "El encargado que da la orden al operario, si el operario la ejecuta conjuntamente con él, puede ser…", ["Autor", "Mero cómplice siempre", "Exento"], "Art. 28."],
        [S3, "media", "Si el delito exigiera ser titular de la instalación y la titular es la empresa, el administrador que actúa por ella…", ["Responde personalmente", "No responde", "Responde solo civilmente"], "Art. 31."],
        [S4, "dificil", "Si la empresa fuera una entidad pública empresarial, ¿le sería aplicable la responsabilidad penal de las personas jurídicas?", ["No, están excluidas", "Sí", "Solo multa"], "Art. 31 quinquies.1."],
        [S4, "media", "Si es una pyme autorizada a presentar cuenta de pérdidas y ganancias abreviada, la supervisión del modelo…", ["Puede asumirla directamente su órgano de administración", "Debe externalizarse siempre", "No es necesaria"], "Art. 31 bis.3."],
      ],
    },
    {
      slug: "caso-injurias-programa-radio",
      titulo: "Un programa de radio",
      supuesto: "Un colaborador de una emisora local lee en antena un texto que podría ser constitutivo de delito contra un particular. El texto lo había escrito otra persona, que convenció al colaborador para leerlo. El autor del texto vive en el extranjero y no puede ser perseguido.",
      preguntas: [
        [S2, "media", "¿Qué tipo de responsabilidad rige en los delitos cometidos a través de la radio?", ["Escalonada, excluyente y subsidiaria", "Solidaria de todos", "Solo de la empresa"], "Art. 30.2."],
        [S2, "media", "¿Quiénes figuran en el primer escalón?", ["Quienes redactaron el texto y quienes les indujeron", "Los directores de la emisora", "Los técnicos de sonido"], "Art. 30.2.1.º."],
        [S2, "dificil", "Si el autor del texto reside fuera de España y no puede ser perseguido, el procedimiento se dirige…", ["Contra los del número inmediatamente posterior", "Contra nadie", "Contra todos a la vez"], "Art. 30.3."],
        [S2, "media", "El segundo escalón lo ocupan…", ["Los directores de la publicación o programa", "Los directores de la empresa grabadora", "Los oyentes"], "Art. 30.2.2.º."],
        [S2, "media", "¿Responde como cómplice el técnico que conectó el micrófono?", ["No: en estos delitos no responden los cómplices", "Sí", "Solo si cobra"], "Art. 30.1."],
        [S2, "media", "El tercer escalón son…", ["Los directores de la empresa editora, emisora o difusora", "Los anunciantes", "Los redactores"], "Art. 30.2.3.º."],
        [S1, "facil", "En general, ¿quiénes responden criminalmente de los delitos?", ["Autores y cómplices", "Solo autores", "Solo personas jurídicas"], "Art. 27."],
        [S2, "dificil", "¿Pasa la responsabilidad al siguiente escalón si se ha extinguido la responsabilidad penal del primero?", ["No: el art. 30.3 exige un motivo distinto de la extinción", "Sí, siempre", "Solo si lo pide la víctima"], "Art. 30.3."],
        [S4, "media", "¿Podría responder la emisora como persona jurídica?", ["Solo en los supuestos previstos en el Código para personas jurídicas", "Siempre", "Nunca"], "Art. 31 bis.1."],
        [S1, "media", "Quien convence directamente al colaborador para leer el texto, conforme a las reglas generales, sería…", ["Inductor, considerado autor", "Cómplice", "Encubridor"], "Art. 28.a); el art. 30.2.1.º también lo incluye en el primer escalón."],
      ],
    },
  ],
});
