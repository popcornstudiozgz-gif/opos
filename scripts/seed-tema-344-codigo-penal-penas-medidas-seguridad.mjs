/**
 * Crea tema-344 — Tema 17 de Policía Local: "De las penas, sus clases y
 * efectos (Libro I, Título III, Capítulo I). De las medidas de seguridad
 * (Libro I, Título IV, Capítulo I)."
 *
 * Fuente: Ley Orgánica 10/1995, del Código Penal (BOE-A-1995-25444), texto
 * consolidado del BOE leído íntegro en los arts. 32 a 60 y 95 a 100.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-344-codigo-penal-penas-medidas-seguridad.mjs
 */
import { sembrarTema, POLICIA } from "./lib/sembrar-tema.mjs";

const CP = "https://www.boe.es/buscar/act.php?id=BOE-A-1995-25444";
const a = (ancla) => `${CP}#${ancla}`;
const S1 = "clases-penas";
const S2 = "penas-privativas-libertad";
const S3 = "penas-privativas-derechos";
const S4 = "multa-accesorias-comunes";
const S5 = "medidas-seguridad";

await sembrarTema({
  tema: {
    slug: "tema-344",
    titulo: "Código Penal: las penas, sus clases y efectos, y las medidas de seguridad",
    descripcion: "Clasificación de las penas en graves, menos graves y leves; penas de las personas jurídicas; lo que no se reputa pena; prisión permanente revisable, prisión, localización permanente y responsabilidad personal subsidiaria; penas privativas de derechos (inhabilitaciones, suspensión, privación del permiso de conducir y de armas, prohibiciones de residencia, aproximación y comunicación, trabajos en beneficio de la comunidad, privación de la patria potestad); multa por días-multa y proporcional; penas accesorias y prohibiciones del art. 57; abono de la prisión provisional; medidas de seguridad privativas y no privativas de libertad.",
    contenido: "Recorre el Capítulo I del Título III (arts. 32 a 60) y el Capítulo I del Título IV (arts. 95 a 100) del Código Penal: qué penas existen y cómo se clasifican por su duración, cuánto duran la prisión y las privaciones de derechos, cómo se calcula la multa por días-multa y qué pasa si no se paga, cuándo se imponen penas accesorias y las prohibiciones de aproximarse o comunicarse con la víctima, y en qué consisten las medidas de seguridad y cuándo se aplican.",
    enlaces_boe: [{ url: CP, titulo: "Ley Orgánica 10/1995, de 23 de noviembre, del Código Penal (BOE-A-1995-25444)" }],
    indice_estudio: [
      { seccion: S1, titulo: "Las penas y sus clases", articulos: "arts. 32-34", url: a("a32") },
      { seccion: S2, titulo: "Penas privativas de libertad", articulos: "arts. 35-38", url: a("a35") },
      { seccion: S3, titulo: "Penas privativas de derechos", articulos: "arts. 39-49", url: a("a39") },
      { seccion: S4, titulo: "Multa, penas accesorias y disposiciones comunes", articulos: "arts. 50-60", url: a("a50") },
      { seccion: S5, titulo: "Medidas de seguridad en general", articulos: "arts. 95-100", url: a("a95") },
    ],
  },
  vinculo: { oposicion: POLICIA.oposicion, bloqueId: POLICIA.bloqueParte2, numero: 17 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Clases de penas por su naturaleza (art. 32)", "Privativas de libertad, privativas de otros derechos y multa; pueden imponerse como principales o accesorias"],
        ["Clasificación por su naturaleza y duración (art. 33.1)", "Graves, menos graves y leves"],
        ["Penas de prisión graves y menos graves", "Grave: prisión permanente revisable y prisión superior a cinco años. Menos grave: prisión de tres meses hasta cinco años"],
        ["Privación del permiso de conducir según su duración", "Grave: más de 8 años. Menos grave: de 1 año y 1 día a 8 años. Leve: de 3 meses a 1 año"],
        ["Multa según su extensión", "Menos grave: más de tres meses (y la proporcional, salvo para personas jurídicas). Leve: hasta tres meses"],
        ["Trabajos en beneficio de la comunidad según su duración", "Menos grave: de 31 días a un año. Leve: de uno a treinta días"],
        ["Pena siempre leve del art. 33.4", "La localización permanente de un día a tres meses"],
        ["Penas de las personas jurídicas (art. 33.7)", "Todas graves: multa, disolución, suspensión de actividades y clausura de locales (máx. 5 años), prohibición de actividades (temporal máx. 15 años), inhabilitación para subvenciones y contratos (máx. 15 años) e intervención judicial (máx. 5 años)"],
        ["¿Qué no se reputa pena? (art. 34)", "La detención y prisión preventiva y otras medidas cautelares penales; las multas y correcciones gubernativas o disciplinarias; y las privaciones de derechos y sanciones reparadoras de leyes civiles o administrativas"],
        ["Duración de las penas accesorias (art. 33.6)", "La de la pena principal, salvo que otros preceptos dispongan otra cosa"],
      ],
      preguntas: [
        ["facil", "¿Cómo se clasifican las penas en función de su naturaleza y duración?", ["Graves, menos graves y leves", "Mayores y menores", "Principales y secundarias"], "Art. 33.1."],
        ["media", "La prisión de cuatro años es una pena…", ["Menos grave", "Grave", "Leve"], "Art. 33.3.a)."],
        ["media", "La privación del derecho a conducir durante seis meses es una pena…", ["Leve", "Menos grave", "Grave"], "Art. 33.4.a)."],
        ["media", "La multa de cuatro meses es una pena…", ["Menos grave", "Leve", "Grave"], "Art. 33.3.j)."],
        ["media", "¿Es pena la detención preventiva?", ["No", "Sí, leve", "Sí, menos grave"], "Art. 34.1."],
        ["dificil", "¿Qué consideración tienen las penas aplicables a las personas jurídicas?", ["Todas son graves", "Todas son menos graves", "Depende de su duración"], "Art. 33.7."],
        ["dificil", "La prohibición temporal de realizar actividades impuesta a una persona jurídica no puede exceder de…", ["Quince años", "Cinco años", "Veinte años"], "Art. 33.7.e)."],
        ["media", "La privación de la patria potestad es una pena…", ["Grave", "Menos grave", "Leve"], "Art. 33.2.k)."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Penas privativas de libertad (art. 35)", "Prisión permanente revisable, prisión, localización permanente y responsabilidad personal subsidiaria por impago de multa"],
        ["Duración de la prisión (art. 36.2)", "Mínimo tres meses y máximo veinte años, salvo excepciones del Código"],
        ["Tercer grado en la prisión permanente revisable (art. 36.1)", "No antes de 20 años de prisión efectiva en terrorismo (Cap. VII, Tít. XXII) ni de 15 en el resto; permisos no antes de 12 y 8 años respectivamente"],
        ["Periodo de seguridad (art. 36.2)", "En prisión de más de cinco años el juez puede ordenar que el tercer grado no llegue hasta cumplir la mitad; es obligatorio en terrorismo, organizaciones criminales y ciertos delitos contra menores o sexuales"],
        ["Localización permanente (art. 37)", "Hasta seis meses en el domicilio o lugar fijado por el juez; puede cumplirse en fines de semana o de forma no continuada y controlarse con medios electrónicos"],
        ["Cómputo de las penas (art. 38)", "Reo preso: desde que la sentencia es firme. Reo no preso: desde que ingresa en el establecimiento para cumplirla"],
      ],
      preguntas: [
        ["facil", "¿Cuál es la duración máxima ordinaria de la pena de prisión?", ["Veinte años", "Treinta años", "Quince años"], "Art. 36.2."],
        ["facil", "¿Cuál es la duración mínima de la pena de prisión?", ["Tres meses", "Un mes", "Seis meses"], "Art. 36.2."],
        ["media", "¿Es pena privativa de libertad la responsabilidad personal subsidiaria por impago de multa?", ["Sí", "No", "Solo en delitos graves"], "Art. 35."],
        ["media", "La localización permanente tiene una duración de…", ["Hasta seis meses", "Hasta un año", "Hasta tres años"], "Art. 37.1."],
        ["dificil", "En la prisión permanente revisable por un delito no terrorista, ¿cuándo puede accederse al tercer grado?", ["Tras quince años de prisión efectiva", "Tras veinte años", "Tras diez años"], "Art. 36.1.b)."],
        ["media", "Si el reo no está preso, la pena empieza a computarse…", ["Desde que ingresa en el establecimiento para cumplirla", "Desde la sentencia de instancia", "Desde los hechos"], "Art. 38.2."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Duración de las inhabilitaciones y la suspensión (art. 40.1)", "Inhabilitación absoluta: de 6 a 20 años. Especial: de 3 meses a 20 años. Suspensión de empleo o cargo: de 3 meses a 6 años"],
        ["Duración de privación de conducir y de armas (art. 40.2)", "De tres meses a diez años"],
        ["Duración de prohibiciones de residencia, aproximación y comunicación (art. 40.3)", "Residencia: hasta 10 años. Aproximación o comunicación: de un mes a 10 años"],
        ["Inhabilitación absoluta (art. 41)", "Privación definitiva de todos los honores, empleos y cargos públicos, aunque sean electivos, e incapacidad para obtenerlos o ser elegido durante la condena"],
        ["Suspensión de empleo o cargo (art. 43)", "Priva de su ejercicio durante la condena (no de la titularidad, a diferencia de la inhabilitación)"],
        ["Privación del permiso por más de dos años (art. 47)", "Comporta la pérdida de vigencia del permiso o licencia de conducción o de armas"],
        ["Prohibición de aproximarse (art. 48.2)", "Impide acercarse a la víctima en cualquier lugar, a su domicilio y lugares frecuentados, y suspende el régimen de visitas con los hijos hasta su cumplimiento"],
        ["Prohibición de comunicarse (art. 48.3)", "Impide cualquier contacto escrito, verbal o visual por cualquier medio, incluidos los informáticos o telemáticos"],
        ["Trabajos en beneficio de la comunidad (art. 49)", "Requieren el consentimiento del condenado; cooperación no retribuida en actividades de utilidad pública, de hasta ocho horas diarias, bajo control del Juez de Vigilancia Penitenciaria"],
      ],
      preguntas: [
        ["media", "La inhabilitación absoluta tiene una duración de…", ["Seis a veinte años", "Tres meses a veinte años", "Uno a diez años"], "Art. 40.1."],
        ["media", "La privación del derecho a conducir por más de dos años implica…", ["La pérdida de vigencia del permiso", "Solo su suspensión temporal", "La retirada del vehículo"], "Art. 47."],
        ["media", "¿Pueden imponerse trabajos en beneficio de la comunidad sin consentimiento del condenado?", ["No", "Sí", "Solo si es reincidente"], "Art. 49."],
        ["media", "¿Cuál es la duración diaria máxima de los trabajos en beneficio de la comunidad?", ["Ocho horas", "Seis horas", "Diez horas"], "Art. 49."],
        ["dificil", "La prohibición de aproximarse a la víctima respecto de los hijos supone…", ["Suspender el régimen de visitas, comunicación y estancia hasta su cumplimiento", "Nada", "Perder la patria potestad"], "Art. 48.2."],
        ["media", "La prohibición de comunicarse con la víctima abarca el contacto…", ["Escrito, verbal o visual por cualquier medio", "Solo telefónico", "Solo presencial"], "Art. 48.3."],
        ["dificil", "La suspensión de empleo o cargo público dura…", ["De tres meses a seis años", "De seis a veinte años", "Hasta diez años"], "Art. 40.1."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Sistema ordinario de la multa (art. 50.2)", "Días-multa, salvo que la ley disponga otra cosa"],
        ["Extensión y cuota de la multa para personas físicas (art. 50.3-4)", "De diez días a dos años; cuota diaria de 2 a 400 euros (meses de 30 días y años de 360)"],
        ["Multa a personas jurídicas (art. 50.3-4)", "Hasta cinco años; cuota diaria de 30 a 5.000 euros"],
        ["¿Qué tiene en cuenta el juez para la cuota? (art. 50.5)", "Exclusivamente la situación económica del reo: patrimonio, ingresos, obligaciones, cargas familiares y circunstancias personales"],
        ["Pago aplazado (art. 50.6)", "Por causa justificada, en un plazo no superior a dos años desde la firmeza; el impago de dos plazos vence los restantes"],
        ["Responsabilidad personal subsidiaria (art. 53.1)", "Un día de privación de libertad por cada dos cuotas diarias no satisfechas; en delitos leves puede cumplirse con localización permanente, y con conformidad, con trabajos en beneficio de la comunidad"],
        ["¿Cuándo no se impone la responsabilidad subsidiaria? (art. 53.3)", "A los condenados a pena privativa de libertad superior a cinco años"],
        ["Pena accesoria de la prisión de diez o más años (art. 55)", "La inhabilitación absoluta durante el tiempo de la condena"],
        ["Prohibiciones del art. 57.2 en violencia doméstica y de género", "Se impone en todo caso la prohibición de aproximarse (art. 48.2): hasta 10 años si el delito es grave o 5 si es menos grave"],
        ["Abono de la prisión provisional (art. 58)", "Se abona en su totalidad para la pena de la causa en que se acordó; un mismo periodo nunca se abona en más de una causa"],
      ],
      preguntas: [
        ["facil", "La pena de multa se impone, salvo que la ley disponga otra cosa, por el sistema de…", ["Días-multa", "Multa fija", "Porcentaje de ingresos"], "Art. 50.2."],
        ["media", "La cuota diaria de la multa a una persona física oscila entre…", ["2 y 400 euros", "30 y 5.000 euros", "10 y 1.000 euros"], "Art. 50.4."],
        ["media", "Si el condenado no paga la multa, queda sujeto a un día de privación de libertad por cada…", ["Dos cuotas diarias no satisfechas", "Cuota diaria no satisfecha", "Tres cuotas no satisfechas"], "Art. 53.1."],
        ["dificil", "A efectos de cómputo de la multa, los meses se entienden de…", ["Treinta días y los años de trescientos sesenta", "Treinta y un días y los años de 365", "Cuatro semanas"], "Art. 50.4."],
        ["media", "La pena de prisión igual o superior a diez años lleva consigo como accesoria…", ["La inhabilitación absoluta durante la condena", "La privación del permiso de conducir", "La expulsión"], "Art. 55."],
        ["media", "En un delito de lesiones contra la expareja, la prohibición de aproximarse a la víctima…", ["Se acuerda en todo caso", "Es potestativa", "No puede imponerse"], "Art. 57.2."],
        ["dificil", "¿Se impone responsabilidad personal subsidiaria por impago de multa a quien está condenado a siete años de prisión?", ["No", "Sí", "Solo si es reincidente"], "Art. 53.3."],
        ["media", "El tiempo de prisión provisional sufrido se abona…", ["En su totalidad para la pena de la causa en que se acordó", "Solo la mitad", "No se abona"], "Art. 58.1."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["Requisitos para aplicar una medida de seguridad (art. 95.1)", "1.ª Que el sujeto haya cometido un hecho previsto como delito; 2.ª que pueda deducirse un pronóstico de probabilidad de comisión de nuevos delitos"],
        ["Si la pena posible no es privativa de libertad (art. 95.2)", "Solo pueden acordarse medidas no privativas de libertad del art. 96.3"],
        ["Medidas privativas de libertad (art. 96.2)", "Internamiento en centro psiquiátrico, en centro de deshabituación y en centro educativo especial"],
        ["Medidas no privativas de libertad (art. 96.3)", "Inhabilitación profesional, expulsión de extranjeros no residentes legalmente, libertad vigilada, custodia familiar, privación del derecho a conducir y privación del derecho a la tenencia y porte de armas"],
        ["Decisiones durante la ejecución (art. 97)", "Mantener la medida, cesarla al desaparecer la peligrosidad, sustituirla por otra más adecuada o suspenderla"],
        ["Propuesta anual del Juez de Vigilancia (art. 98.1)", "En las medidas privativas de libertad y en la libertad vigilada posterior a prisión, eleva al menos anualmente una propuesta de mantenimiento, cese, sustitución o suspensión"],
        ["Concurrencia de pena y medida privativas de libertad (art. 99)", "Se cumple primero la medida, que se abona para la pena (sistema vicarial)"],
        ["Quebrantamiento de un internamiento (art. 100.1)", "El juez ordena el reingreso en el mismo centro u otro adecuado y deduce testimonio por el quebrantamiento"],
        ["¿Es quebrantamiento negarse al tratamiento médico? (art. 100.3)", "No, aunque el juez puede sustituir el tratamiento por otra medida aplicable"],
      ],
      preguntas: [
        ["media", "Para imponer una medida de seguridad es necesario, entre otras cosas, que el sujeto…", ["Haya cometido un hecho previsto como delito", "Haya sido condenado antes", "Sea mayor de 21 años"], "Art. 95.1.1.ª."],
        ["facil", "¿Cuál de estas es una medida de seguridad privativa de libertad?", ["Internamiento en centro psiquiátrico", "Libertad vigilada", "Custodia familiar"], "Art. 96.2."],
        ["media", "La custodia familiar es una medida…", ["No privativa de libertad", "Privativa de libertad", "Accesoria a la multa"], "Art. 96.3.4.ª."],
        ["media", "Si concurren pena y medida de seguridad privativas de libertad, se cumple primero…", ["La medida, que se abona para la pena", "La pena", "Ambas a la vez"], "Art. 99."],
        ["dificil", "¿Con qué periodicidad mínima debe elevar el Juez de Vigilancia la propuesta sobre una medida privativa de libertad?", ["Anualmente", "Semestralmente", "Cada dos años"], "Art. 98.1."],
        ["media", "¿Constituye quebrantamiento negarse a seguir un tratamiento médico inicialmente consentido?", ["No", "Sí", "Solo si es psiquiátrico"], "Art. 100.3."],
        ["dificil", "Si la pena que hubiera podido imponerse no es privativa de libertad, el juez solo puede acordar…", ["Medidas no privativas de libertad del art. 96.3", "Internamiento psiquiátrico", "Cualquier medida"], "Art. 95.2."],
      ],
    },
  ],
  glosario: [
    [S1, "Pena accesoria", "La que acompaña a una principal porque la ley así lo dispone; dura lo mismo que ella salvo excepción."],
    [S2, "Prisión permanente revisable", "Pena grave de prisión sin término fijo, sujeta a revisión conforme al art. 92."],
    [S2, "Localización permanente", "Pena de permanencia en el domicilio o lugar fijado por el juez, hasta seis meses."],
    [S3, "Inhabilitación absoluta", "Privación definitiva de todos los honores, empleos y cargos públicos."],
    [S3, "Trabajos en beneficio de la comunidad", "Cooperación no retribuida en actividades de utilidad pública, con consentimiento del penado."],
    [S4, "Días-multa", "Sistema de multa que combina una extensión temporal y una cuota diaria según la capacidad económica."],
    [S4, "Responsabilidad personal subsidiaria", "Privación de libertad por impago de la multa: un día por cada dos cuotas."],
    [S5, "Medida de seguridad", "Consecuencia penal fundada en la peligrosidad criminal tras cometer un delito."],
    [S5, "Sistema vicarial", "Cumplimiento previo de la medida de seguridad y abono de su tiempo para la pena."],
  ],
  casos: [
    {
      slug: "caso-condena-conductor-ebrio",
      titulo: "La condena de un conductor",
      supuesto: "Un conductor, interceptado por la Policía Local conduciendo bajo la influencia de bebidas alcohólicas, es condenado a una multa de seis meses con una cuota diaria de 10 euros y a la privación del derecho a conducir durante tres años. No tiene ingresos fijos y no paga la multa.",
      preguntas: [
        [S4, "media", "¿Cuántos días dura la multa a efectos de cómputo?", ["180 días", "183 días", "240 días"], "Art. 50.4: meses de 30 días."],
        [S4, "media", "¿Cuál es el importe total de la multa?", ["1.800 euros", "600 euros", "3.600 euros"], "180 días × 10 euros."],
        [S4, "dificil", "Si no paga nada, ¿cuántos días de responsabilidad personal subsidiaria le corresponden?", ["90 días", "180 días", "60 días"], "Art. 53.1: un día por cada dos cuotas impagadas."],
        [S4, "media", "Con su conformidad, la responsabilidad subsidiaria puede cumplirse mediante…", ["Trabajos en beneficio de la comunidad", "Multa adicional", "Inhabilitación"], "Art. 53.1, párrafo segundo."],
        [S1, "media", "La multa de seis meses es una pena…", ["Menos grave", "Leve", "Grave"], "Art. 33.3.j)."],
        [S1, "media", "La privación del derecho a conducir durante tres años es una pena…", ["Menos grave", "Grave", "Leve"], "Art. 33.3.d)."],
        [S3, "media", "Al ser superior a dos años, la privación del derecho a conducir conlleva…", ["La pérdida de vigencia del permiso", "Solo su suspensión", "Ningún efecto sobre el permiso"], "Art. 47."],
        [S3, "facil", "¿Puede conducir ciclomotores durante la condena?", ["No: inhabilita para ambos derechos", "Sí", "Solo en zona urbana"], "Art. 47."],
        [S4, "media", "Si mejora después su situación económica tras cumplir la responsabilidad subsidiaria, ¿debe pagar la multa?", ["No, su cumplimiento extingue la obligación de pago", "Sí", "Solo la mitad"], "Art. 53.4."],
        [S4, "media", "Si empeora su situación tras la sentencia, el juez puede excepcionalmente…", ["Modificar las cuotas y los plazos de pago", "Anular la condena", "Convertirla en prisión"], "Art. 51."],
      ],
    },
    {
      slug: "caso-orden-alejamiento-quebrantada",
      titulo: "La prohibición de aproximación",
      supuesto: "Un hombre condenado por lesiones a su expareja a un año de prisión tiene impuesta la prohibición de aproximarse a ella. La Policía Local lo localiza a pocos metros del trabajo de la víctima, controlado por un dispositivo electrónico. Tienen un hijo en común con régimen de visitas fijado judicialmente.",
      preguntas: [
        [S4, "media", "En un delito de lesiones contra la expareja, la prohibición de aproximación se impone…", ["En todo caso", "Solo si la víctima lo pide", "Nunca"], "Art. 57.2."],
        [S4, "dificil", "Como hay pena de prisión, la prohibición debe durar más que la prisión entre…", ["Uno y cinco años más, si el delito es menos grave", "Uno y diez años más, siempre", "Un mes y un año más"], "Art. 57.1, párrafo segundo."],
        [S3, "media", "¿Qué lugares abarca la prohibición de aproximarse?", ["Cualquier lugar donde esté la víctima, su domicilio, trabajo y lugares frecuentados", "Solo el domicilio", "Solo la vía pública"], "Art. 48.2."],
        [S3, "media", "¿Qué ocurre con el régimen de visitas del hijo?", ["Queda en suspenso hasta el total cumplimiento de la pena", "Se mantiene igual", "Se extingue para siempre"], "Art. 48.2."],
        [S3, "facil", "¿Puede controlarse la medida con medios electrónicos?", ["Sí", "No", "Solo con autorización de la víctima"], "Art. 48.4."],
        [S3, "media", "Si la contactara por mensajería instantánea, incumpliría la prohibición de…", ["Comunicarse con la víctima", "Residir en determinados lugares", "Aproximarse"], "Art. 48.3."],
        [S2, "media", "La prisión de un año es una pena…", ["Menos grave", "Leve", "Grave"], "Art. 33.3.a)."],
        [S3, "media", "¿Cuál es la duración posible de la prohibición de aproximarse como pena?", ["De un mes a diez años", "Hasta seis meses", "De uno a veinte años"], "Art. 40.3."],
        [S1, "media", "¿Cómo se cumplen la pena de prisión y la prohibición?", ["Necesariamente de forma simultánea", "Primero una y después otra, siempre", "A elección del condenado"], "Art. 57.1, párrafo segundo."],
        [S1, "media", "La prohibición de aproximarse durante dos años es una pena…", ["Menos grave", "Grave", "Leve"], "Art. 33.3.h)."],
      ],
    },
    {
      slug: "caso-internamiento-psiquiatrico",
      titulo: "Un internamiento psiquiátrico",
      supuesto: "Un hombre con un trastorno psíquico grave agrede a un viandante sin poder comprender la ilicitud de su conducta. El juez lo declara exento de responsabilidad y, a la vista de los informes, aprecia probabilidad de que cometa nuevos delitos. Meses después se fuga del centro.",
      preguntas: [
        [S5, "media", "¿Qué dos requisitos exige el art. 95 para imponerle una medida de seguridad?", ["Haber cometido un hecho previsto como delito y un pronóstico de probabilidad de nuevos delitos", "Ser reincidente y mayor de edad", "Haber sido condenado a prisión"], "Art. 95.1."],
        [S5, "facil", "¿Qué tipo de medida es el internamiento en centro psiquiátrico?", ["Privativa de libertad", "No privativa de libertad", "Una pena accesoria"], "Art. 96.2.1.ª."],
        [S5, "media", "¿Qué ordena el juez tras la fuga del centro?", ["El reingreso en el mismo centro u otro adecuado y deducir testimonio", "Su puesta en libertad", "Una multa"], "Art. 100.1 y 3."],
        [S5, "media", "Si desaparece su peligrosidad criminal, el juez…", ["Decreta el cese de la medida", "Debe mantenerla igualmente", "La convierte en prisión"], "Art. 97.b)."],
        [S5, "dificil", "¿Quién eleva al menos anualmente una propuesta sobre el mantenimiento de la medida?", ["El Juez de Vigilancia Penitenciaria", "El Ministerio Fiscal", "El director del centro"], "Art. 98.1."],
        [S5, "media", "¿Puede sustituirse la medida por otra más adecuada?", ["Sí, entre las previstas para el supuesto", "No, nunca", "Solo por una multa"], "Art. 97.c)."],
        [S5, "media", "Si la sustitución evoluciona desfavorablemente…", ["Se vuelve a aplicar la medida sustituida", "Se archiva", "Se aplica prisión"], "Art. 97.c)."],
        [S5, "dificil", "¿Puede la medida ser más gravosa o más larga que la pena abstractamente aplicable al hecho?", ["No", "Sí", "Solo si es psiquiátrica"], "Art. 6.2."],
        [S5, "media", "¿Es una medida no privativa de libertad la libertad vigilada?", ["Sí", "No", "Es una pena"], "Art. 96.3.3.ª."],
        [S1, "media", "El internamiento de este caso, ¿es una pena?", ["No, es una medida de seguridad", "Sí, grave", "Sí, menos grave"], "Arts. 32 y 96."],
      ],
    },
  ],
});
