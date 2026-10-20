/**
 * Crea tema-312 — Tema 17 de Bombero/a Conductor/a: "Agentes extintores:
 * definición y características. Líquidos, sólidos y gaseosos (características
 * y mecanismos de extinción). Aplicaciones, usos, ventajas e inconvenientes."
 *
 * Fuente: Tema 17 "Agentes extintores" (V.3) de la Escuela de Bomberos del
 * Ayuntamiento de Zaragoza, leído íntegro. Para este tema la Escuela
 * recomienda además el Manual del CEIS Guadalajara; las normas técnicas que
 * cita el propio documento (UNE-EN 1568 para la expansión de espumas,
 * UNE-EN 15004 para sistemas de gas, NTP 666 del INSST, Protocolo de
 * Montreal) se mencionan como las cita el documento.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-312-agentes-extintores.mjs
 */
import { sembrarTema, BOMBERO } from "./lib/sembrar-tema.mjs";

const FUENTE = "https://www.zaragoza.es/cont/vistas/portal//bomberos/doc/Tema_17_Agentes_extintores_V3.pdf";
const S1 = "agua-aditivos";
const S2 = "espumas";
const S3 = "polvos-extintores";
const S4 = "agentes-gaseosos";
const S5 = "aplicaciones-limitaciones";

await sembrarTema({
  tema: {
    slug: "tema-312",
    titulo: "Agentes extintores: agua, espumas, polvos y gases",
    descripcion: "Definición de agente extintor. El agua y sus aditivos; las espumas (tipos, expansión, dosificación); los polvos BC, ABC y especiales; los agentes gaseosos (nitrógeno, CO2, halones y sus sustitutos, gases inertes, agua nebulizada). Mecanismos de extinción, aplicaciones, ventajas e inconvenientes de cada uno.",
    contenido: "Sigue el Tema 17 de la Escuela de Bomberos: qué hace cada agente sobre el tetraedro del fuego, por qué el agua extingue sobre todo por enfriamiento, cómo se forma y se clasifica la espuma, cuándo actúan los polvos por inhibición, qué gases se usan en inundación total y con qué precauciones, y en qué fuegos no debe usarse cada agente.",
    enlaces_boe: [{ url: FUENTE, titulo: "Escuela de Bomberos de Zaragoza — Tema 17: Agentes extintores (V.3)" }],
    indice_estudio: [
      { seccion: S1, titulo: "El agua y sus aditivos", articulos: "Tema 17, apartado 1.2.1", url: FUENTE },
      { seccion: S2, titulo: "Las espumas", articulos: "Tema 17, apartados 1.2.2 y 2.2", url: FUENTE },
      { seccion: S3, titulo: "Agentes extintores sólidos (polvos)", articulos: "Tema 17, apartados 1.3 y 2.3", url: FUENTE },
      { seccion: S4, titulo: "Agentes extintores gaseosos", articulos: "Tema 17, apartados 1.4 y 2.4", url: FUENTE },
      { seccion: S5, titulo: "Aplicaciones y limitaciones del agua", articulos: "Tema 17, apartado 2.1", url: FUENTE },
    ],
  },
  vinculo: { oposicion: BOMBERO.oposicion, bloqueId: BOMBERO.bloqueParteII, numero: 17 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["¿Qué es un agente extintor?", "El compuesto que, aplicado sobre el fuego, provoca la extinción al actuar sobre uno o más componentes del tetraedro del fuego; no confundir con el extintor, que es el envase"],
        ["¿Cuál es el calor latente de vaporización del agua?", "539,4 cal/g; su calor específico es 1 cal/(g·ºC)"],
        ["¿Cuánto aumenta el volumen del agua al vaporizarse a 100 ºC?", "Unas 1.600-1.700 veces; a 240 ºC unas 2.500 y por encima de 500 ºC más de 3.000"],
        ["¿Cuál es el mecanismo principal de extinción del agua?", "El enfriamiento; también actúa por sofocación (el vapor desplaza el oxígeno), dilución en líquidos polares y emulsión en apolares"],
        ["¿Qué tamaño de gota tiene el agua nebulizada?", "Inferior a 400 micras en el 90 % de las gotas, con presiones de 4 a 200 bares"],
        ["¿Qué hacen los humectantes, los espesantes y los modificadores de flujo?", "Los humectantes bajan la tensión superficial para penetrar en sólidos porosos; los espesantes aumentan la viscosidad para que el agua se adhiera; los modificadores de flujo (polioxietileno, «agua rápida») reducen las pérdidas de carga"],
      ],
      preguntas: [
        ["facil", "¿Por qué mecanismo extingue principalmente el agua?", ["Enfriamiento", "Inhibición", "Sofocación exclusivamente"], "Por su elevado calor latente de vaporización (Tema 17)."],
        ["media", "¿Cuánto aumenta aproximadamente el volumen del agua al vaporizarse a 100 ºC?", ["1.600-1.700 veces", "10 veces", "100 veces"], "Tema 17, características del agua."],
        ["media", "¿A qué temperatura alcanza el agua su máxima densidad?", ["4 ºC", "0 ºC", "100 ºC"], "Tema 17."],
        ["media", "¿Qué aditivo reduce las pérdidas de carga en las mangueras?", ["Los modificadores de flujo, como el polioxietileno", "Los espesantes", "Los anticongelantes"], "Tema 17, agua con aditivos."],
        ["dificil", "¿Cuál es el tamaño óptimo de gota del agua pulverizada proyectada con lanza?", ["Entre 0,3 y 1 mm", "Menos de 0,01 mm", "Más de 5 mm"], "Tema 17, mecanismos de extinción del agua."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["¿Qué diferencia espumógeno, espumante y espuma?", "Espumógeno: concentrado tensoactivo; espumante: mezcla de espumógeno y agua; espuma: mezcla final de espumante y aire"],
        ["¿Cómo se clasifican las espumas por su expansión (UNE-EN 1568)?", "Baja (<20), media (20-200) y alta (>200)"],
        ["¿Cuál es el mecanismo principal de extinción de la espuma?", "La sofocación, separando el combustible del oxígeno; secundariamente enfría por el agua que contiene"],
        ["¿Qué espuma forma una película acuosa sobre el hidrocarburo?", "La AFFF (formadora de película acuosa), con efecto de «autocuración»"],
        ["¿Qué espumas resisten los líquidos polares como el alcohol?", "Las antialcohol ATC o AR; hoy se usan combinaciones de AFFF y ATC"],
        ["¿Qué tres fases tiene la aplicación de espuma?", "Dosificación, generación y distribución (D-G-D)"],
      ],
      preguntas: [
        ["facil", "Una espuma con coeficiente de expansión 150 es de:", ["Media expansión", "Baja expansión", "Alta expansión"], "Media expansión: entre 20 y 200 (UNE-EN 1568)."],
        ["media", "¿Con qué agente nunca debe usarse la espuma simultáneamente?", ["Con los polvos extintores", "Con el agua", "Con el CO2"], "Los polvos descomponen la espuma (Tema 17)."],
        ["media", "¿Qué pérdida de carga puede provocar un dosificador Venturi?", ["Hasta el 33 % de la presión", "Ninguna", "Un 1 %"], "Tema 17, dosificación."],
        ["media", "¿Dónde debe colocarse un proporcionador previo en un tendido de mangueras?", ["Entre el penúltimo y el último tercio del tendido", "Junto a la bomba", "En la lanza siempre"], "Tema 17."],
        ["dificil", "¿En qué porcentaje se mezclan habitualmente los espumógenos de baja y media expansión?", ["Entre el 3 % y el 6 %", "Entre el 10 % y el 20 %", "Menos del 0,5 %"], "Los de media y alta, del 1 % al 3 %."],
        ["media", "¿Por qué la espuma no es adecuada en fuegos de metales (clase D)?", ["Porque su agua reacciona con el metal y desprende hidrógeno", "Porque es demasiado ligera", "Porque es tóxica"], "Tema 17, aplicabilidad de las espumas."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["¿Cuál es el mecanismo principal de extinción de los polvos?", "La inhibición (rotura de la reacción en cadena); secundariamente sofocación y muy ligeramente enfriamiento"],
        ["¿De qué está compuesto el polvo BC (convencional o seco)?", "Bicarbonato sódico y potásico con aditivos; sirve para fuegos B y C"],
        ["¿Qué tiene de particular el polvo ABC (polivalente o antibrasa)?", "Incorpora fosfato monoamónico, que forma una capa de ácido metafosfórico que sofoca; sirve también para fuegos de clase A"],
        ["¿Para qué son los polvos especiales?", "Para fuegos de metales (clase D), cada uno para un metal concreto; los no preparados (arena seca, dolomita, ClNa…) actúan por sofocación"],
        ["¿Qué limitaciones tienen los polvos?", "Enfrían muy poco (riesgo de reignición), sirven para conatos, son abrasivos y dejan residuos, no se usan con espuma y están desaconsejados en fuegos F"],
      ],
      preguntas: [
        ["facil", "¿Qué polvo puede usarse en fuegos de clase A?", ["El polivalente ABC", "El BC", "Ninguno"], "Tema 17."],
        ["media", "¿Qué compuesto del polvo ABC forma la capa de ácido metafosfórico?", ["El fosfato monoamónico", "El bicarbonato sódico", "El grafito"], "Tema 17."],
        ["media", "¿Qué tamaño de partícula tienen los polvos extintores?", ["De 20 a 30 micras", "De 1 a 2 mm", "De 400 micras"], "Tema 17."],
        ["media", "¿Por qué está desaconsejado el polvo en fuegos de aceite de cocina (F)?", ["Por las proyecciones de aceite en llamas que puede provocar", "Porque es conductor", "Porque no inhibe"], "Tema 17."],
        ["dificil", "¿Hasta qué temperatura son estables los polvos extintores?", ["Por debajo de 50 ºC", "Por debajo de 500 ºC", "Por debajo de 0 ºC"], "Tema 17."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["¿Qué propiedades comunes tienen los agentes gaseosos?", "Se almacenan licuados a presión, son eficaces solo en interiores, son dieléctricos y son agentes limpios que no dejan residuos"],
        ["¿Cómo extingue el CO2 y a qué temperatura puede bajar?", "Principalmente por sofocación (concentraciones cercanas al 40 %) y secundariamente por enfriamiento, al expandirse hasta -79 ºC («nieve carbónica»)"],
        ["¿Por qué no se usa CO2 en fuegos de metales?", "Porque en contacto con ellos puede descomponerse y generar oxígeno"],
        ["¿Por qué se prohibieron los halones?", "Por el Protocolo de Montreal, al destruir la capa de ozono; además a más de 700 ºC generan fosgeno"],
        ["¿Qué contiene el Inergen IG-541?", "Nitrógeno 52 %, argón 40 % y CO2 8 %; extingue por sofocación bajando el oxígeno residual"],
        ["¿Qué riesgo tienen los sistemas de inundación total por gas?", "La asfixia o la cardiotoxicidad: exigen prealarma, retardo y evacuación previa del recinto"],
      ],
      preguntas: [
        ["facil", "¿Qué densidad relativa tiene el CO2 respecto al aire?", ["1,53", "0,6", "1"], "Es aproximadamente un 50 % más denso que el aire."],
        ["media", "¿Por qué mecanismo extinguen principalmente los halones?", ["Inhibición de la reacción en cadena", "Enfriamiento", "Dilución"], "Tema 17."],
        ["media", "¿Qué norma internacional prohibió los halones?", ["El Protocolo de Montreal", "El Protocolo de Kioto", "La Directiva Seveso"], "Tema 17."],
        ["media", "¿Qué indica el segundo dígito del número de un halón?", ["El número de átomos de flúor", "El número de átomos de carbono", "El número de átomos de bromo"], "Carbono, flúor, cloro, bromo y, si existe, yodo."],
        ["dificil", "¿Qué composición tiene el Argonite IG-55?", ["50 % argón y 50 % nitrógeno", "100 % argón", "52 % nitrógeno, 40 % argón y 8 % CO2"], "Tema 17, gases inertes."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["¿Qué diferencia el agua a chorro de la pulverizada?", "El chorro tiene más alcance pero solo un 10 % del agua participa en la extinción y es solo para fuegos A; la pulverizada es la forma más eficaz y sirve para A y B"],
        ["¿Por qué no se echa agua a chorro sobre derrames o depósitos de líquidos inflamables?", "Porque proyecta el líquido inflamado y propaga el incendio; en depósitos puede provocar el rebose"],
        ["¿Cuál es la mayor limitación del agua?", "Que conduce la electricidad: riesgo de arco eléctrico con cables, catenarias o cuadros"],
        ["¿Qué ocurre si se echa agua sobre una sartén de aceite ardiendo?", "El agua se vaporiza bruscamente y proyecta el aceite inflamado: nunca debe hacerse"],
        ["¿Para qué más se usa el agua pulverizada además de extinguir?", "Para dispersar nubes de gas, crear pasillos de evacuación y refrigerar zonas expuestas"],
      ],
      preguntas: [
        ["facil", "¿Cuál es la forma más eficaz de usar el agua?", ["Pulverizada o en neblina", "A chorro compacto", "En bloque de hielo"], "Tema 17, aplicaciones del agua."],
        ["media", "¿Qué porcentaje de agua de un chorro compacto participa realmente en la extinción?", ["Aproximadamente un 10 %", "El 90 %", "El 50 %"], "Tema 17."],
        ["media", "¿En qué fuegos se usa el agua sobre todo para controlar y no para extinguir?", ["En fuegos B y C", "En fuegos A", "En ninguno"], "Tema 17."],
        ["media", "¿Qué fenómeno aprovechan los anticongelantes?", ["El descenso crioscópico", "La tensión superficial", "El efecto Venturi"], "Tema 17."],
        ["dificil", "¿Qué marca el panel naranja con una X delante del número de peligro?", ["Que la materia reacciona peligrosamente con el agua", "Que es radiactiva", "Que es un gas"], "Tema 17, limitaciones del agua."],
      ],
    },
  ],
  glosario: [
    [S1, "Calor latente de vaporización", "Calor necesario para convertir en vapor un gramo de líquido sin cambiar su temperatura; en el agua, 539,4 cal/g."],
    [S2, "AFFF", "Espumógeno formador de película acuosa, que crea una capa fina de agua sobre el hidrocarburo e impide su contacto con el aire."],
    [S2, "Coeficiente de expansión", "Relación entre el volumen de espuma obtenida y el de solución espumante que la produce."],
    [S3, "Inhibición", "Mecanismo de extinción que rompe la reacción en cadena combinándose con los radicales libres."],
    [S4, "Inundación total", "Descarga de un agente gaseoso que llena por completo un recinto cerrado para extinguir el fuego."],
    [S5, "Descenso crioscópico", "Disminución del punto de congelación del agua al añadirle anticongelantes."],
  ],
  casos: [
    {
      slug: "caso-incendio-derrame-gasolina",
      titulo: "Incendio de un derrame de gasolina",
      supuesto: "Tras un accidente, arde un derrame de gasolina en la calzada junto a un turismo. La dotación debe elegir el agente extintor y la forma de aplicarlo.",
      preguntas: [
        [S5, "facil", "¿Debe atacarse el derrame con agua a chorro?", ["No, proyectaría el líquido inflamado y extendería el fuego", "Sí, es lo más rápido", "Sí, siempre que haya hidrante"], "Tema 17."],
        [S2, "facil", "¿Qué agente es más adecuado para un derrame de hidrocarburo?", ["La espuma", "El agua a chorro", "El CO2 al aire libre"], "Tema 17."],
        [S2, "media", "¿Qué espuma forma una película acuosa sobre la gasolina?", ["AFFF", "Proteínica", "Alta expansión"], "Tema 17."],
        [S2, "media", "¿Cómo se aplica habitualmente la espuma?", ["De forma indirecta, haciéndola resbalar sobre superficies", "Directamente al centro con chorro", "Por debajo del vehículo"], "Tema 17."],
        [S2, "media", "¿Por qué mecanismo extinguirá principalmente la espuma?", ["Sofocación", "Inhibición", "Dilución"], "Tema 17."],
        [S3, "media", "Si un compañero quisiera usar a la vez un extintor de polvo, ¿qué ocurriría?", ["El polvo degradaría la espuma", "Se potenciarían", "Nada"], "Tema 17."],
        [S2, "media", "Tras extinguir, ¿para qué puede seguir usándose la espuma?", ["Para cubrir el derrame de forma preventiva y controlar los vapores", "Para limpiar la calzada", "Para nada"], "Tema 17."],
        [S4, "media", "¿Sería eficaz un extintor de CO2 al aire libre con viento?", ["Poco, los gases solo son plenamente eficaces en interiores", "Sí, es el mejor agente", "Sí, por enfriamiento"], "Tema 17."],
        [S2, "dificil", "Si el líquido fuera alcohol, ¿qué tipo de espuma haría falta?", ["Antialcohol ATC o AR", "Proteínica", "Cualquier AFFF"], "Tema 17."],
        [S5, "media", "¿Para qué podría usarse el agua pulverizada en este siniestro?", ["Para refrigerar el vehículo y zonas expuestas o crear una cortina de protección", "Para extinguir el derrame a chorro", "Para nada"], "Tema 17."],
      ],
    },
    {
      slug: "caso-sala-servidores-inundacion-gas",
      titulo: "Fuego en una sala protegida por inundación de gas",
      supuesto: "Salta la alarma en una sala de servidores protegida por un sistema fijo de gas inerte. Al llegar, la dotación encuentra la sala cerrada con la descarga ya realizada.",
      preguntas: [
        [S4, "facil", "¿Por qué se usan gases en salas de equipos electrónicos?", ["Son dieléctricos y no dejan residuos", "Son baratos y enfrían mucho", "Porque conducen la electricidad"], "Tema 17."],
        [S4, "media", "¿Qué riesgo tiene entrar en la sala tras la descarga?", ["Asfixia por el oxígeno reducido", "Quemaduras químicas", "Radiación"], "Tema 17."],
        [S4, "media", "¿Qué exigen estos sistemas antes de la descarga?", ["Prealarma, retardo y evacuación del recinto", "Nada", "Abrir las ventanas"], "Tema 17 (UNE-EN 15004)."],
        [S4, "media", "Si el sistema fuera de Inergen, ¿qué gases contendría?", ["Nitrógeno, argón y CO2", "Solo CO2", "Halón 1301"], "Tema 17."],
        [S4, "media", "¿Qué hay que garantizar tras la descarga para evitar la reignición?", ["Mantener la concentración hasta que desaparezca el riesgo y enfriar finalmente con agua", "Ventilar de inmediato", "Encender los equipos"], "Tema 17."],
        [S4, "media", "¿Por qué los gases inertes protegen más tiempo que los halocarbonados?", ["Porque su densidad es parecida a la del aire", "Porque son más densos", "Porque reaccionan con el fuego"], "Tema 17."],
        [S4, "dificil", "¿Hasta qué nivel de oxígeno bajan los gases inertes según el valor NEL?", ["12 %", "21 %", "5 %"], "Tema 17."],
        [S4, "media", "¿Qué deberá hacerse después con el gas?", ["Ventilar la sala por zonas preparadas para disiparlo", "Dejarlo indefinidamente", "Recogerlo en botellas"], "Tema 17."],
        [S1, "media", "Si el sistema fuera de agua nebulizada, ¿qué tamaño tendrían las gotas?", ["Menos de 400 micras", "Más de 2 mm", "De 1 cm"], "Tema 17."],
        [S4, "media", "¿Qué inconveniente tienen los gases inertes frente a los halones?", ["Necesitan mucha más concentración y volumen de almacenamiento", "Destruyen la capa de ozono", "Son tóxicos"], "Tema 17."],
      ],
    },
    {
      slug: "caso-incendio-taller-metales",
      titulo: "Incendio en un taller con virutas de magnesio",
      supuesto: "En un taller de mecanizado arden virutas de magnesio junto a un cuadro eléctrico y unos palés de madera.",
      preguntas: [
        [S3, "facil", "¿A qué clase de fuego corresponde el magnesio ardiendo?", ["Clase D", "Clase A", "Clase B"], "Fuegos de metales."],
        [S5, "media", "¿Por qué no debe usarse agua sobre el magnesio?", ["Porque puede reaccionar, producir hidrógeno y explosiones", "Porque se congela", "Porque es demasiado lenta"], "Tema 17."],
        [S3, "media", "¿Qué agente es el adecuado para el metal?", ["Un polvo especial para ese metal", "Polvo BC", "Espuma"], "Tema 17."],
        [S3, "media", "Sin polvo especial, ¿qué recurso no preparado podría usarse sobre el metal?", ["Arena seca", "Agua pulverizada", "CO2"], "Tema 17."],
        [S4, "media", "¿Por qué tampoco sirve el CO2 sobre el metal?", ["Puede descomponerse y generar oxígeno", "Es demasiado caro", "Es conductor"], "Tema 17."],
        [S3, "media", "Para el cuadro eléctrico en tensión, ¿qué condición debe respetarse con el polvo?", ["No superar la tensión indicada en la etiqueta del extintor", "Ninguna", "Mojarlo antes"], "Tema 17."],
        [S3, "media", "¿Qué polvo serviría también para los palés de madera?", ["El polivalente ABC", "El BC", "El especial D"], "Tema 17."],
        [S3, "media", "Tras apagar los palés con polvo, ¿qué conviene hacer?", ["Enfriar con agua para evitar la reignición", "Nada", "Echar más polvo cada hora"], "Tema 17."],
        [S5, "dificil", "Si el chorro de agua tocara el cuadro en tensión, ¿qué riesgo correría el bombero?", ["Arco eléctrico", "Congelación", "Intoxicación"], "Tema 17."],
        [S3, "media", "¿Por qué mecanismo actúan principalmente los polvos especiales no preparados?", ["Sofocación", "Inhibición", "Enfriamiento"], "Tema 17."],
      ],
    },
  ],
});
