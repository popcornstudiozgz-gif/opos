/**
 * Crea tema-410 — Tema 3 de Operario/a Especialista (Ayto. Zaragoza, CONV
 * 5/2026, Anexo I): "El Manual de Atención a la Ciudadanía."
 *
 * Tema dedicado al Manual completo: tema-15 (Auxiliar Administrativo) solo
 * resume dos apartados del Manual junto al Reglamento de Participación
 * Ciudadana, y tema-68 (Oficial Mantenimiento) trata la atención al público
 * en general.
 *
 * Fuente: Manual de Atención a la Ciudadanía del Ayuntamiento de Zaragoza,
 * revisión de marzo de 2018 de la Comisión para la Igualdad sobre el
 * original de 1994 (PDF de 45 páginas en
 * zaragoza.es/cont/paginas/gestionmunicipal/calidad/pdf/Manual-atencion-ciudadania.pdf),
 * descargado y leído íntegro en esta sesión. No es una norma articulada
 * sino un manual de habilidades; se siguen sus apartados y sus recuadros
 * «Recuerde». Dos observaciones sobre el propio texto:
 * - En «Los siete errores» el PDF separa los rótulos de las descripciones;
 *   la correspondencia usada (apatía, «quitárselos de encima», frialdad,
 *   condescendencia, robotización, excesiva reglamentación, transferencias)
 *   sigue el orden de las descripciones del texto.
 * - Los porcentajes de las causas de baja calidad (44 % y 40 %) los da el
 *   Manual citando «diversos estudios», sin identificarlos.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-410-manual-atencion-ciudadania.mjs
 */
import { sembrarTema, OPERARIO } from "./lib/sembrar-tema.mjs";

const MANUAL = "https://www.zaragoza.es/cont/paginas/gestionmunicipal/calidad/pdf/Manual-atencion-ciudadania.pdf";
const S1 = "ayuntamiento-ciudadania-calidad";
const S2 = "comunicacion-escuchar-hablar";
const S3 = "pautas-practicas-atencion";
const S4 = "situaciones-dificiles-hostilidad";
const S5 = "principios-basicos-atencion";

await sembrarTema({
  tema: {
    slug: "tema-410",
    titulo: "El Manual de Atención a la Ciudadanía del Ayuntamiento de Zaragoza",
    descripcion: "El Ayuntamiento y la ciudadanía: los tres niveles de opinión sobre la Administración y lo que debemos esforzarnos en hacer. La calidad en los servicios de atención: factores con los que se juzga un servicio (aspectos tangibles, capacidad de respuesta, seguridad y fiabilidad, empatía), el «momento de la verdad», causas de la baja calidad, la queja como oportunidad, los siete errores y las cinco características de la calidad. La comunicación: componentes biológicos, psicológicos y sociales de la conducta, mensajes verbales y no verbales, la habilidad de escuchar y la de hablar. Pautas prácticas: saludo, niveles de atención (acogida, recogida y reconocimiento), capacidad de respuesta, mantener la calma, evitar las profecías negativas, escucha activa y agradecimiento. Situaciones difíciles: la curva de la hostilidad y sus seis fases, los pensamientos y el autocontrol emocional. Los catorce principios básicos de la atención a la ciudadanía.",
    contenido: "Cómo atender bien a la gente que se dirige al Ayuntamiento según el manual que el propio Ayuntamiento usa para formar a su personal: qué valora la ciudadanía, qué errores evitar, cómo escuchar y hablar, cómo calmar a una persona enfadada y los principios que resumen todo el Manual.",
    enlaces_boe: [
      { url: MANUAL, titulo: "Manual de Atención a la Ciudadanía, Ayuntamiento de Zaragoza (revisión de marzo de 2018)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "El Ayuntamiento y la ciudadanía. La calidad en los servicios de atención", articulos: "Manual, págs. 5-13", url: MANUAL },
      { seccion: S2, titulo: "La comunicación: componentes de la conducta, escuchar y hablar", articulos: "Manual, págs. 14-32", url: MANUAL },
      { seccion: S3, titulo: "Características de la comunicación en la atención: pautas prácticas", articulos: "Manual, págs. 14-32", url: MANUAL },
      { seccion: S4, titulo: "Cómo afrontar las situaciones difíciles", articulos: "Manual, págs. 33-39", url: MANUAL },
      { seccion: S5, titulo: "Principios básicos en la atención a la ciudadanía", articulos: "Manual, págs. 40-45", url: MANUAL },
    ],
  },
  vinculo: { oposicion: OPERARIO.oposicion, bloqueId: OPERARIO.bloque, numero: 3 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Origen del Manual", "Se editó por primera vez en 1994 en el Gabinete Asesor del Área de Régimen Interior; en marzo de 2018 la Comisión para la Igualdad lo revisó para adaptarlo al lenguaje inclusivo y pasó a llamarse Manual de Atención a la Ciudadanía"],
        ["Tres niveles de opinión sobre la Administración", "1.º general (según les va en la vida); 2.º sobre estructuras y procedimientos (aparecen los tópicos de la burocracia); 3.º el del puesto de contacto, basado en la experiencia directa, donde la percepción suele ser más positiva"],
        ["«Debemos esforzarnos en» (Recuerde)", "Responder a las necesidades reales de la ciudadanía, hacer comprensibles y sencillas nuestras formas de actuar, y ponernos en su situación y mostrarnos accesibles"],
        ["Factores con los que se juzga la calidad", "Aspectos tangibles (instalaciones, materiales, personal), capacidad de respuesta (rapidez, eficacia), seguridad y fiabilidad (competencia, confianza) y empatía (trato personalizado y cortés)"],
        ["El momento de la verdad", "El instante en que la persona entra en contacto con el servicio; el factor clave es el TRATO recibido del personal directamente en contacto"],
        ["Causas de la baja calidad", "Según el Manual, la «actitud del personal» (44 %) y que «trabaja demasiado lento» (40 %); en el fondo, la falta de interés y la escasez de habilidades sociales"],
        ["La queja", "Es el síntoma de que algo ha ido mal y una excelente oportunidad para descubrir nuestros déficits y demostrar nuestras competencias"],
        ["Los siete errores", "Apatía, «quitárselos de encima», frialdad, condescendencia, robotización, excesiva reglamentación y transferencias"],
        ["Cinco características de la calidad", "Es responsabilidad de todos; hacer las cosas bien a la primera; autocontrol emocional continuo; pasar de una actitud pasiva a una activa (prevenir errores); y mejora continua, pues la peor enemiga de la calidad es la rutina"],
      ],
      preguntas: [
        ["media", "Según el Manual, el factor clave en el «momento de la verdad» es:", ["El trato recibido del personal en contacto directo", "El diseño de los impresos", "El horario de apertura"], "Manual, «Factores según los cuales se juzga la calidad»."],
        ["media", "¿Cuáles son, según el Manual, los dos factores fundamentales de la baja calidad en la atención directa?", ["La falta de interés y la escasez de habilidades sociales", "La falta de ordenadores y de presupuesto", "El exceso de público y de normas"], "Manual, recuadro «Recuerde» de las causas de la baja calidad."],
        ["facil", "Para el Manual, la queja de un ciudadano es:", ["Una oportunidad para descubrir déficits y demostrar competencias", "Un ataque personal que debe ignorarse", "Algo que hay que trasladar siempre a otro servicio"], "Manual, causas de la baja calidad."],
        ["media", "¿Cuál de estos NO es uno de los «siete errores» del Manual?", ["La empatía", "La robotización", "Las transferencias"], "Manual, «Los siete errores»."],
        ["media", "Según el Manual, la peor enemiga de la calidad en la atención al público es:", ["La rutina", "La tecnología", "La prisa del ciudadano"], "Manual, características de la calidad."],
        ["dificil", "En el tercer nivel de opinión (el del puesto de contacto), la percepción de la ciudadanía es, según los estudios que cita el Manual:", ["En general más positiva", "Siempre negativa", "Igual que en el nivel general"], "Manual, «El Ayuntamiento al servicio de la ciudadanía»."],
        ["media", "¿Cuál de estos es un factor de calidad del grupo «aspectos tangibles»?", ["El aspecto físico de las instalaciones y los letreros y folletos", "La empatía del personal", "La rapidez en atender"], "Manual, factores de calidad."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Doble aprendizaje", "Conocer y dominar el contenido del trabajo del servicio y, además, las técnicas personales de atención directa (escuchar, hablar, controlar emociones, afrontar situaciones tensas)"],
        ["Actitud ante el aprendizaje (Recuerde)", "Concebir el trabajo como un continuo proceso de aprendizaje, con actitud humilde, buenas dosis de constancia y tolerancia a la frustración"],
        ["Habilidad fundamental", "Las habilidades de comunicación son las fundamentales para el trabajo de atención a la ciudadanía"],
        ["Componentes de la conducta", "Biológicos (sistema nervioso, hormonal, cuerpo y rostro, voz), psicológicos (atender y percibir, pensar, sentir y actuar; Costa y López, 1992) y sociales (contexto, normas sociales, idiosincrasia del puesto, pertenencia a un grupo, valores de la organización)"],
        ["Mensajes verbales y no verbales", "Verbales: palabras con significado. No verbales: miradas, gestos, ritmo del cuerpo, proximidad, tono, volumen e inflexiones de la voz"],
        ["Escuchar es algo activo", "No basta poner oreja (oír): hay que poner cabeza (observación) y corazón (empatía); la habilidad de escuchar es previa a la de hablar"],
        ["La verdadera escucha", "Activa, sin interrumpir ni dar consejos, sin ensayar mentalmente lo que se va a decir, captando el significado y también la intención y el sentimiento del mensaje"],
        ["La habilidad de hablar", "Expresión clara (sin argot administrativo y con gestos coherentes) y precisa (sin divagar, adaptada al nivel de la persona): brevedad, claridad y precisión; es decir, disciplina verbal"],
      ],
      preguntas: [
        ["facil", "Según el Manual, la habilidad fundamental para la atención al público es:", ["La comunicación", "La rapidez mecanográfica", "El conocimiento de idiomas"], "Manual, «El aprendizaje de recursos y habilidades»."],
        ["media", "«Escuchar es algo activo»: además de poner oreja, hay que poner:", ["Cabeza (observación) y corazón (empatía)", "Papel y bolígrafo", "Distancia y silencio"], "Manual, recuadro de la habilidad de escuchar."],
        ["media", "Cuando nos toca hablar, el Manual pide hacerlo con:", ["Brevedad, claridad y precisión", "Tecnicismos para dar seguridad", "Discursos completos y detallados"], "Manual, «La habilidad de hablar»."],
        ["media", "¿Cuál de estos es un mensaje no verbal?", ["El tono y el volumen de la voz", "Una palabra técnica", "Un formulario"], "Manual, «Mensajes verbales y no verbales»."],
        ["dificil", "Los componentes psicológicos básicos de la conducta en la atención al público son:", ["La forma de percibir, los pensamientos, los sentimientos y la actuación concreta", "El sistema nervioso, el hormonal y la voz", "El contexto, las normas y el grupo"], "Manual, «Componentes básicos de la conducta humana»."],
        ["media", "Según el Manual, la habilidad de escuchar:", ["Es previa a la de hablar", "Es secundaria respecto a la de hablar", "Solo se usa por teléfono"], "Manual, «La habilidad de escuchar»."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["El primer contacto: saludarse", "Contacto ocular antes de las primeras palabras, tomar la iniciativa del saludo con buenos deseos y aclaración de intenciones («Buenos días, ¿en qué puedo ayudarle?») y tratar de usted salvo que se indique lo contrario"],
        ["Tres niveles de atención", "1.º Acogida: situar a la persona en las instalaciones. 2.º Recogida: además, saludo e indicación breve de lo que va a pasar. 3.º Reconocimiento: la persona se siente reconocida (su nombre, su caso concreto)"],
        ["Nivel recomendado", "Siempre que sea posible, el de reconocimiento; si no, al menos el de recogida, evitando la simple acogida"],
        ["Capacidad de respuesta", "La rapidez es a menudo decisiva; la espera aumenta la carga emocional; conocer el funcionamiento de otros servicios y anticiparse ayuda a responder"],
        ["Mantener la calma", "Respirar profundamente varias veces y dialogar de forma constructiva con uno mismo (autoverbalizaciones como «Es lógico que esté enfadado. No es personal»)"],
        ["Profecías negativas", "Predicciones automáticas de que la cosa irá mal («Este me va a dar la mañana»); suelen cumplirse; si aparecen más de tres veces en un día, hay que esforzarse en evitarlas"],
        ["Escucha activa: qué evitar", "Interrumpir, emitir juicios de valor u opiniones personales, ofrecer ayuda o soluciones prematuras y hacer comentarios sobre su estado emocional"],
        ["Escucha activa: qué hacer", "Mostrar que se sigue la conversación («ya», «entiendo», «continúe, por favor»), asentir con la cabeza y usar un tono y volumen de voz ligeramente bajo y acogedor"],
        ["Agradecer la colaboración", "Reconocer expresamente el esfuerzo del ciudadano aunque traer ciertos documentos sea su obligación, y despedirse cordialmente con contacto ocular"],
      ],
      preguntas: [
        ["media", "¿Cuál es el nivel de atención más alto según el Manual?", ["El reconocimiento", "La acogida", "La recogida"], "Manual, «Personalizar la atención»."],
        ["media", "En el nivel de «recogida», además de situar a la persona:", ["Se añade un saludo y una indicación breve de lo que va a ocurrir", "Se la llama por su nombre y se recuerda su caso", "Se la deriva a otro servicio"], "Manual, «Personalizar la atención»."],
        ["facil", "Salvo que se indique lo contrario, el trato a la ciudadanía debería ser:", ["De usted", "De tú", "Por el nombre de pila"], "Manual, «El primer contacto: saludarse»."],
        ["media", "Una buena estrategia para mantener la calma en un diálogo difícil es:", ["Respirar profundamente varias veces", "Elevar el tono para imponerse", "Abandonar el puesto"], "Manual, «Mantener la calma»."],
        ["media", "Durante la escucha activa hay que evitar:", ["Ofrecer soluciones prematuras", "Asentir con la cabeza", "Decir «entiendo»"], "Manual, «Escuchar activamente»."],
        ["dificil", "El Manual recomienda esforzarse en evitar las profecías negativas si se repiten en un día más de:", ["Tres veces", "Diez veces", "Una vez"], "Manual, «Evitar las profecías negativas»."],
        ["media", "¿Quién debería iniciar el saludo como norma general?", ["El empleado municipal, tomando la iniciativa", "El ciudadano", "Quien tenga más edad"], "Manual, «El primer contacto: saludarse»."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["La curva de la hostilidad", "Patrón que sigue una reacción de enfado (fuente: Allaire y McNeill), con seis fases: racional, disparo o salida, enlentecimiento, afrontamiento, enfriamiento y solución del problema"],
        ["Fase 2: disparo o salida", "La persona pierde el control y da rienda suelta a palabras o conductas hostiles; cualquier intento de hacerle entrar en razón fracasa: lo más oportuno es escuchar"],
        ["Fase 3: enlentecimiento", "Si no hay nuevas provocaciones, la reacción pierde fuerza y empieza a «venirse abajo»"],
        ["Fase 4: afrontamiento", "Es la fase decisiva: reconocer el estado emocional de la persona y la parte de razón que pueda tener (empatía, acuerdo parcial) ayuda a que aparezca la calma; defenderse o pedirle que se calme la devuelve al disparo"],
        ["Fase 5: enfriamiento", "Con una frase empatizadora («Me hago cargo, quizá yo en su caso me sentiría igual») —que no es darle la razón— la persona se enfría y escucha más"],
        ["Fase 6: solución del problema", "Cuando la persona vuelve al nivel racional, es el momento de presentar los argumentos que permitan resolver la situación"],
        ["Los pensamientos dirigen la conducta", "Antes de actuar pensamos; pensamientos útiles: «Es mi trabajo, no es personal», «Voy a esperar a que acabe de hablar», «Voy a respirar profundamente»"],
        ["Qué hacer ante la hostilidad", "Escuchar con cuidado, reconocer su malestar, invitarle a un área privada y a sentarse, voz pausada y baja, expresar nuestra posición después del incidente y pedir ayuda si no podemos afrontarlo"],
        ["Qué no hacer ante la hostilidad", "Rechazar su irritación o intentar calmarla de inmediato, negarse a escuchar, defender al Ayuntamiento antes de investigar, seguir en un área pública, quedarse de pie, elevar la voz y decirle lo que «debería» hacer"],
      ],
      preguntas: [
        ["media", "¿Cuántas fases tiene la curva de la hostilidad del Manual?", ["Seis", "Tres", "Cuatro"], "Manual, «La curva de la hostilidad»."],
        ["media", "En la fase de «disparo o salida», lo más oportuno es:", ["Escuchar", "Hacerle entrar en razón con argumentos", "Pedirle que se calme"], "Manual, fase 2."],
        ["dificil", "¿En qué fase se puede facilitar el enfriamiento o, al contrario, volver a «calentar» a la persona?", ["En la fase 4, de afrontamiento", "En la fase 1, racional", "En la fase 6, de solución"], "Manual, comentario a la curva de la hostilidad."],
        ["media", "Una frase empatizadora como «me hago cargo» en la fase de enfriamiento significa:", ["Reconocer el estado emocional, sin que sea darle la razón sobre el asunto", "Darle la razón en todo", "Admitir un error del Ayuntamiento"], "Manual, fase 5."],
        ["media", "Ante una persona hostil, ¿qué recomienda el Manual?", ["Invitarla a un área privada y ofrecerle asiento", "Seguir la discusión en el mostrador delante del público", "Permanecer de pie para mantener la autoridad"], "Manual, «Qué hacer / qué no hacer»."],
        ["media", "¿Cuál de estas frases empeora la situación según el Manual?", ["«Cálmese, cálmese, está usted muy nervioso»", "«Comprendo que la situación es delicada»", "«Seguro que tiene razones para sentirse molesto»"], "Manual, comentario a la fase 4."],
        ["facil", "Si percibes que no puedes afrontar la situación, el Manual aconseja:", ["Pedir ayuda a otra persona", "Elevar el volumen de voz", "Abandonar el puesto sin avisar"], "Manual, «Qué hacer»."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["Principio 1: para la ciudadanía", "El Ayuntamiento es algo abstracto; lo único tangible es el soporte físico y, sobre todo, la persona de contacto, que dan el rostro del servicio y SON el servicio"],
        ["Principio 2: la especial situación del personal de contacto", "Está entre los deseos del público y los del Ayuntamiento, y sometido a la dualidad de sus tareas propias y sus habilidades interpersonales"],
        ["Principios 3 y 4", "Cada persona atendida es única (acoger, recoger y reconocer como un traje a medida); la interacción es única para el ciudadano pero repetitiva para el empleado, con riesgo de aburrimiento y rutina"],
        ["Principios 5 y 6", "Dirigir la atención hacia la solución del problema, no a la persona; y empezar por mejoras pequeñas con objetivos alcanzables cada día"],
        ["Principios 7 y 8", "Las personas cambian según dónde y con quién están (el trato amable cambia su conducta); y no hay que preocuparse por dar demasiada atención: se «malacostumbra» al público solo recompensando conductas indeseables"],
        ["Principios 9 y 10", "Dar información veraz y concreta (mejor reconocer que no se sabe algo que dar información ambigua); y mantener el equilibrio en el trato: tener deferencias no significa hacer diferencias"],
        ["Principios 11 y 12", "El empleado es el primer representante del Ayuntamiento y puede recibir alabanzas o críticas desproporcionadas; y es indispensable que domine sus reacciones emocionales"],
        ["Principios 13 y 14", "Conocer y controlar los propios pensamientos, evitando etiquetas y profecías autocumplidas; y para cambiar se necesita mucho tiempo y esfuerzo"],
      ],
      preguntas: [
        ["media", "Según el primer principio, para la ciudadanía la persona de contacto:", ["Es el servicio", "Es un intermediario sin importancia", "Representa solo a su unidad"], "Manual, principio 1."],
        ["media", "Si no conoces la respuesta a una consulta, el Manual considera preferible:", ["Reconocer la ignorancia sobre el tema antes que dar información ambigua", "Dar una respuesta aproximada", "Remitir a la web sin más"], "Manual, principio 9."],
        ["media", "«Tener deferencias no significa necesariamente hacer diferencias» se refiere al principio de:", ["Mantener un equilibrio de tratamiento entre las personas atendidas", "Dar información veraz", "Empezar por mejoras pequeñas"], "Manual, principio 10."],
        ["dificil", "Según el Manual, se «malacostumbra» al público:", ["Recompensando un comportamiento indeseable", "Ofreciendo demasiada atención", "Saludando siempre primero"], "Manual, principio 8."],
        ["media", "El riesgo de que la interacción sea repetitiva para el empleado es:", ["El aburrimiento y la rutina, que convierten al ciudadano en un número", "La falta de horas extra", "El exceso de formación"], "Manual, principio 4."],
        ["facil", "El Manual aconseja empezar por:", ["Mejoras pequeñas y objetivos alcanzables cada día", "Cambiarlo todo de una vez", "Esperar a que cambie la organización"], "Manual, principio 6."],
      ],
    },
  ],
  glosario: [
    [S1, "Momento de la verdad", "Instante en que la persona entra en contacto con un servicio municipal y se forma su opinión sobre él y sobre el Ayuntamiento."],
    [S1, "Empatía", "Capacidad de ponerse en el lugar de la otra persona y mostrar que se quieren comprender y atender sus necesidades concretas."],
    [S1, "Robotización", "Uno de los siete errores: tratar a la ciudadanía de forma estereotipada, con saludos y despedidas mecánicas sin calor humano."],
    [S1, "Transferencias", "Uno de los siete errores: trasladar al ciudadano a otras partes de la organización que a veces tampoco son las adecuadas."],
    [S2, "Mensaje no verbal", "Conducta que acompaña a las palabras: mirada, gestos, proximidad, tono, volumen e inflexiones de la voz."],
    [S2, "Disciplina verbal", "Hablar con brevedad, claridad y precisión, sin argot administrativo ni divagaciones."],
    [S3, "Escucha activa", "Escuchar con concentración, sin interrumpir ni juzgar, mostrando con pequeños gestos y palabras que se sigue al interlocutor."],
    [S3, "Autoverbalización", "Frase constructiva que uno se dice a sí mismo para mantener la calma («No es personal, no va conmigo»)."],
    [S3, "Profecía negativa", "Predicción automática de que un encuentro irá mal; según el Manual, tiende a cumplirse."],
    [S4, "Curva de la hostilidad", "Patrón de seis fases que sigue una reacción de enfado, desde la fase racional hasta la solución del problema."],
    [S4, "Afrontamiento", "Cuarta fase de la curva: el empleado empieza a intervenir reconociendo el estado emocional y la parte de razón del ciudadano."],
    [S5, "Persona de contacto", "Empleado que atiende directamente al público; para la ciudadanía, junto con el soporte físico, es el servicio."],
  ],
  casos: [
    {
      slug: "vecino-enfadado-junta",
      titulo: "El vecino enfadado en la Junta Municipal",
      supuesto: "Estás haciendo una reparación en el vestíbulo de una Junta Municipal cuando un vecino entra muy alterado: lleva tres semanas esperando que se arregle una farola de su calle y alza la voz delante de otras personas. La auxiliar que atiende el mostrador te pide ayuda mientras busca la información del aviso.",
      preguntas: [
        [S4, "media", "El vecino grita y no deja hablar. ¿En qué fase de la curva de la hostilidad está?", ["Disparo o salida", "Racional", "Enfriamiento", "Solución del problema"], "Manual, fase 2."],
        [S4, "media", "¿Qué es lo más oportuno en esa fase?", ["Escuchar", "Explicarle enseguida la normativa", "Decirle que no le tolera que levante la voz", "Llamar a la policía"], "Manual, fase 2."],
        [S4, "media", "¿Dónde conviene continuar la conversación?", ["En un área privada, invitándole a sentarse", "En el mostrador, delante del público", "En la calle", "Por teléfono más tarde"], "Manual, «Qué hacer»."],
        [S4, "dificil", "Cuando empieza a calmarse, ¿qué frase ayuda al enfriamiento?", ["«Me hago cargo, quizá yo en su caso me sentiría igual»", "«Cálmese, está usted muy nervioso»", "«Lo primero que debería aprender es educación»", "«No estoy aquí para aguantar impertinencias»"], "Manual, fase 5."],
        [S4, "media", "Una frase empatizadora como la anterior supone:", ["Reconocer su estado emocional sin darle la razón sobre el asunto", "Reconocer que el Ayuntamiento ha cometido una ilegalidad", "Prometerle que la farola se arreglará hoy", "Darle la razón en todo"], "Manual, fase 5."],
        [S3, "media", "¿Qué tono de voz recomienda el Manual?", ["Pausado y bajando el volumen", "Alto, para hacerse oír", "Neutro y monótono", "Irónico"], "Manual, «Qué hacer» y escucha activa."],
        [S4, "media", "Ya en la fase de solución del problema, ¿qué toca hacer?", ["Presentar los argumentos e información que permitan resolver la situación", "Volver a reñirle por cómo ha entrado", "Dar por terminada la conversación", "Pedirle que vuelva otro día"], "Manual, fase 6."],
        [S5, "media", "Si la auxiliar no sabe cuándo se arreglará la farola, ¿qué debe hacer?", ["Reconocer que no lo sabe antes que dar información ambigua, e informarse", "Decirle que mañana, para que se vaya", "Inventar una fecha aproximada", "Remitirle a otra dependencia sin más"], "Manual, principio 9."],
        [S4, "dificil", "Al terminar, el Manual aconseja respecto al modo en que el vecino se expresó:", ["Expresar nuestra posición después del incidente y pedirle que en otra ocasión se conduzca de otro modo", "No decir nada nunca", "Reprocharle su conducta delante de todos", "Denunciarle"], "Manual, «Qué hacer» y «El autocontrol de las emociones»."],
        [S3, "media", "Al despedirse, conviene:", ["Agradecer su colaboración y despedirse cordialmente con contacto visual", "Despedirse sin mirarle", "Recordarle que la próxima vez espere", "No despedirse"], "Manual, «Agradecer la colaboración ciudadana»."],
      ],
    },
    {
      slug: "primer-dia-centro-civico",
      titulo: "Tu primer día de atención en un centro cívico",
      supuesto: "Te destinan a un centro cívico en el que, además de las tareas de mantenimiento, atenderás ocasionalmente a las personas que llegan al vestíbulo preguntando por actividades y salas. Tu responsable te pide que leas el Manual de Atención a la Ciudadanía y te plantea varias situaciones.",
      preguntas: [
        [S3, "facil", "Entra una persona mayor. ¿Cómo inicias el contacto?", ["Mirándola a los ojos y saludando primero: «Buenos días, ¿en qué puedo ayudarle?»", "Esperando a que ella hable primero", "Con un gesto sin hablar", "Tuteándola para dar confianza"], "Manual, «El primer contacto: saludarse»."],
        [S3, "media", "Le indicas dónde está la sala y le dices que en cinco minutos empieza la actividad. ¿Qué nivel de atención has dado?", ["Recogida", "Acogida", "Reconocimiento", "Transferencia"], "Manual, «Personalizar la atención»."],
        [S3, "media", "Al día siguiente vuelve y la saludas por su nombre y le preguntas si le gustó el taller. Has alcanzado el nivel de:", ["Reconocimiento", "Acogida", "Recogida", "Robotización"], "Manual, «Personalizar la atención»."],
        [S1, "media", "Siempre respondes con la misma frase mecánica a todo el mundo. ¿Qué error del Manual cometes?", ["Robotización", "Apatía", "Transferencias", "Excesiva reglamentación"], "Manual, «Los siete errores»."],
        [S1, "media", "Si envías a alguien a otra ventanilla que tampoco es la adecuada, cometes el error de:", ["Transferencias", "Condescendencia", "Frialdad", "Empatía"], "Manual, «Los siete errores»."],
        [S2, "media", "Mientras alguien te explica su problema, ¿qué demuestra que escuchas activamente?", ["Decir «entiendo», «continúe, por favor» y asentir con la cabeza", "Mirar el móvil", "Interrumpir para adelantar la solución", "Opinar sobre su estado de ánimo"], "Manual, «Escuchar activamente»."],
        [S2, "media", "Al explicar cómo reservar una sala, debes evitar:", ["La jerga o argot de la Administración", "Las palabras sencillas", "Ir al grano", "Adaptarte al nivel de la persona"], "Manual, «La habilidad de hablar»."],
        [S3, "dificil", "Antes de que llegue un usuario que ya conoces piensas «Lo que me faltaba, el pesado del otro día». Según el Manual, eso es:", ["Una profecía negativa, que tiende a cumplirse", "Una autoverbalización positiva", "Una técnica de empatía", "Un componente biológico de la conducta"], "Manual, «Evitar las profecías negativas»."],
        [S1, "media", "¿Qué valoran de forma extraordinaria las personas usuarias de servicios públicos?", ["El trato recibido del personal en contacto", "El color de las paredes", "La cantidad de folletos", "La duración de la espera"], "Manual, recuadro «Recuerde» sobre los factores de calidad."],
        [S5, "media", "Tras varias semanas notas que haces las tareas de atención de forma rutinaria. ¿Qué principio te alerta de ello?", ["La interacción es única para el ciudadano pero repetitiva para el personal, con riesgo de aburrimiento", "Para cambiar se necesita poco tiempo", "No hay que dar demasiada atención", "El personal no representa al Ayuntamiento"], "Manual, principio 4."],
      ],
    },
    {
      slug: "queja-cola-registro",
      titulo: "La queja por la larga espera",
      supuesto: "Mientras cambias unos tubos fluorescentes en una oficina de atención, observas que se ha formado una larga cola. Una vecina se queja de que lleva una hora esperando y de que el personal parece no hacerle caso. El jefe de la oficina organiza después una pequeña reunión para analizar lo sucedido con el Manual en la mano y te pide tu opinión.",
      preguntas: [
        [S1, "media", "¿Cómo debe entenderse la queja de la vecina según el Manual?", ["Como una oportunidad para descubrir déficits y demostrar competencias", "Como una molestia sin importancia", "Como un problema exclusivo de la vecina", "Como algo que hay que ignorar"], "Manual, causas de la baja calidad."],
        [S1, "media", "El personal no la miraba ni daba señales de haber notado su presencia. ¿Qué error es?", ["Apatía", "Condescendencia", "Excesiva reglamentación", "Transferencias"], "Manual, «Los siete errores»."],
        [S3, "media", "Según el Manual, una espera prolongada:", ["Aumenta la carga emocional y hace que la persona se fije en lo negativo", "No influye en la percepción del servicio", "Mejora la paciencia del público", "Solo afecta a los jóvenes"], "Manual, «Capacidad de respuesta»."],
        [S3, "dificil", "¿Qué propone el Manual para mejorar la capacidad de respuesta cuando dependemos de otros servicios?", ["Conocer su funcionamiento con exactitud y anticiparse buscando la información antes de que la pidan", "Remitir siempre a la web", "Pedir al público que vuelva otro día", "Dar números aleatorios"], "Manual, «Capacidad de respuesta»."],
        [S1, "media", "Según el Manual, los dos motivos más citados de baja calidad son la actitud del personal y:", ["Que trabaja demasiado lento", "Los precios", "La falta de aparcamiento", "La lejanía de la oficina"], "Manual, causas de la baja calidad (44 % y 40 %)."],
        [S1, "media", "Una de las cinco características de la calidad es pasar de una actitud pasiva a una activa, que consiste en:", ["Prevenir los errores en lugar de solo subsanarlos", "Esperar a que haya quejas", "Delegar en otros servicios", "Trabajar más horas"], "Manual, características de la calidad."],
        [S1, "media", "¿De quién es responsabilidad la calidad según el Manual?", ["De todas y todos", "Solo de los jefes", "Solo del personal de ventanilla", "Del Alcalde"], "Manual, características de la calidad."],
        [S5, "media", "Para empezar a mejorar, el Manual aconseja:", ["Marcar objetivos pequeños y alcanzables para cada día", "Reformar toda la oficina de una vez", "Cambiar a todo el personal", "Esperar a tener más medios"], "Manual, principio 6."],
        [S4, "media", "Si la vecina se altera mucho, ¿qué debe evitarse?", ["Defender al Ayuntamiento antes de haber investigado el problema", "Escucharla con atención", "Reconocer su malestar", "Ofrecerle asiento"], "Manual, «Qué no hacer»."],
        [S3, "media", "Cuando por fin la atienden, el Manual aconseja empezar con una frase como:", ["«Buenas tardes, siento haberle hecho esperar, ¿qué le ha traído por aquí?»", "«Ya era hora de que llegara su turno»", "«Rápido, que hay mucha gente»", "Ninguna, directamente pedir el DNI"], "Manual, «El primer contacto: saludarse»."],
      ],
    },
  ],
});
