/**
 * Crea tema-315 — Tema 20 de Bombero/a Conductor/a: "Protocolo de incendio
 * de piso: tren de ataque. Equipamiento, material mínimo y funciones de
 * bomberos y conductores."
 *
 * Fuente: Protocolo / Procedimiento Incendio de Piso del Servicio contra
 * Incendios de Zaragoza (Escuela de Bomberos, actualizado en septiembre de
 * 2024), publicado como material del Tema 20 y leído íntegro. Las
 * referencias a la Ordenanza Municipal de Protección contra Incendios de
 * Zaragoza (bocas de columna seca, edificios de gran altura) y al CTE (24 m)
 * se recogen tal como las cita el protocolo.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-315-protocolo-incendio-piso.mjs
 */
import { sembrarTema, BOMBERO } from "./lib/sembrar-tema.mjs";

const FUENTE = BOMBERO.escuela("Protocolo_Procedimiento_Incendio_piso_version_web4.pdf");
const S1 = "tren-ataque-equipos";
const S2 = "funciones-bul-conductor";
const S3 = "funciones-aea-umc-sanitarios";
const S4 = "columna-seca-gran-altura";
const S5 = "terminos-definiciones";

await sembrarTema({
  tema: {
    slug: "tema-315",
    titulo: "Protocolo de incendio de piso: tren de ataque, equipamiento y funciones",
    descripcion: "Tren de ataque para incendios de vivienda del Servicio de Zaragoza; intervención por equipos de dos; equipamiento y funciones de los equipos de la BUL y la AEA, de sus conductores, de la Unidad de Mando y Comunicaciones y del personal sanitario; columna seca (IPF-39, 40 y 41) y edificios de gran altura; términos y definiciones.",
    contenido: "Recoge el procedimiento que aplica el Servicio contra Incendios de Zaragoza en los incendios de vivienda: qué vehículos y personas salen, cómo se reparten en equipos, qué lleva y hace cada uno —con especial atención al bombero conductor de la BUL y de la AEA—, cómo se ataca usando la columna seca, qué cambia en edificios de gran altura y qué significan los conceptos clave (ablandado, caudal crítico, golpe de ariete, ventilación defensiva, zona caliente).",
    enlaces_boe: [{ url: FUENTE, titulo: "Servicio contra Incendios de Zaragoza — Protocolo / Procedimiento Incendio de Piso (septiembre 2024)" }],
    indice_estudio: [
      { seccion: S1, titulo: "Tren de ataque e intervención por equipos", articulos: "Protocolo, tren de ataque", url: FUENTE },
      { seccion: S2, titulo: "Equipos de la BUL y funciones del conductor", articulos: "Protocolo, BUL", url: FUENTE },
      { seccion: S3, titulo: "Autoescala, Unidad de Mando y personal sanitario", articulos: "Protocolo, AEA, UMC y AMB", url: FUENTE },
      { seccion: S4, titulo: "Columna seca y edificios de gran altura", articulos: "Protocolo, columna seca y EGA", url: FUENTE },
      { seccion: S5, titulo: "Términos y definiciones", articulos: "Protocolo, términos y definiciones", url: FUENTE },
    ],
  },
  vinculo: { oposicion: BOMBERO.oposicion, bloqueId: BOMBERO.bloqueParteII, numero: 20 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["¿Qué vehículos forman el tren de ataque general de un incendio de vivienda?", "Una Unidad de Mando y Comunicaciones (UMC), una Bomba Urbana Ligera (BUL), una Autoescala Automática (AEA) y una Ambulancia tipo C"],
        ["¿Qué dotación lleva la UMC en el tren de ataque?", "Un Subjefe de Intervención y un Oficial de Conductores"],
        ["¿Qué dotación llevan la BUL y la AEA?", "Cada una: un Oficial, tres Bomberos y un Bombero-Conductor"],
        ["¿Qué se añade al tren de ataque desde la novena planta?", "Una BUP más con la dotación que se determine, y se valora otro vehículo con material de ventilación"],
        ["¿Cómo se organizan los equipos de una dotación completa?", "Siempre por equipos de dos: Equipo 1, el Oficial y un Bombero; Equipo 2, dos Bomberos"],
        ["¿Qué hacen entre sí los componentes de cada equipo antes de intervenir?", "Una inspección visual y física de la correcta instalación de sus EPI"],
      ],
      preguntas: [
        ["facil", "¿Qué tipo de ambulancia forma parte del tren de ataque de incendio de piso?", ["Tipo C, con médico, enfermero y dos TES", "Tipo A1", "Ninguna"], "Protocolo de incendio de piso."],
        ["media", "¿Desde qué planta se incluye una BUP más en el tren de ataque?", ["Desde la 9.ª planta", "Desde la 4.ª planta", "Desde la 15.ª planta"], "Protocolo de incendio de piso."],
        ["media", "¿Quién forma el Equipo 1 de la BUL?", ["El Oficial y un Bombero", "Dos Bomberos", "El conductor y el Oficial"], "Protocolo de incendio de piso."],
        ["media", "¿Por qué se interviene siempre por equipos de dos?", ["Por seguridad", "Por economía", "Por tradición"], "Protocolo de incendio de piso."],
        ["dificil", "¿Qué caudal tienen las lanzas de 45 mm según los criterios de actuación?", ["450 l/min", "230 l/min", "2.000 l/min"], "Protocolo de incendio de piso."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["¿Qué lleva el bombero del Equipo 1 de la BUL además de su EPI y ERA?", "Radio, linterna, máscara de salvamento con latiguillo y la bolsa con el tendido de ataque de 38 mm en «Cleveland», con lanza de 450 l/min y bifurcación de 45 mm"],
        ["¿Qué hace el Equipo 2 de la BUL?", "Realiza el tendido desde la trifurcación de la BUL hasta la bifurcación de ataque del Equipo 1 y queda como equipo S.O.S. en zona limpia, entrando solo a requerimiento del Oficial"],
        ["¿Dónde coloca el conductor la BUL?", "A indicación del Oficial-Conductor, a una distancia que deje espacio para el acceso y maniobra de la AEA, previendo la caída de elementos del edificio"],
        ["¿Qué radio balizará el conductor en torno al acceso del inmueble?", "Unos 10 metros (zona caliente)"],
        ["¿Qué instalación hace el conductor de la BUL?", "Una instalación de 70 mm desde la salida de bomba hasta la trifurcación"],
        ["¿Qué vigila el conductor mientras da agua?", "La presión de trabajo y la temperatura de la bomba; da agua a petición del Oficial del E-1 y colabora en el abastecimiento desde el hidrante o la nodriza"],
        ["¿Qué lleva el conductor de la BUL?", "EPI nivel 1 con cabo de anclaje integrado, radio y linterna"],
      ],
      preguntas: [
        ["facil", "¿A petición de quién da agua el conductor de la BUL?", ["Del Oficial del Equipo 1", "De cualquier vecino", "Del conductor de la AEA"], "Protocolo de incendio de piso."],
        ["media", "¿Qué diámetro tiene la instalación del conductor de la BUL desde la bomba a la trifurcación?", ["70 mm", "25 mm", "38 mm"], "Protocolo de incendio de piso."],
        ["media", "¿Qué comunica el Oficial del Equipo 1 sobre la vivienda?", ["Estado de la escalera, posibilidad de tendido vertical, puerta, acceso, confinamiento, víctimas y control del incendio", "Solo el número de víctimas", "Nada, comunica el conductor"], "Protocolo de incendio de piso."],
        ["media", "¿Dónde queda el Equipo 2 de la BUL tras realizar el tendido?", ["En el exterior de la vivienda, en zona limpia, como equipo S.O.S.", "Dentro de la vivienda atacando", "En el vehículo"], "Protocolo de incendio de piso."],
        ["dificil", "Con columna seca, ¿hasta dónde lleva el conductor de la BUL la instalación de 70 mm?", ["Hasta la IPF-41 de la caja de escalera en que se interviene", "Hasta la IPF-40", "Hasta la vivienda"], "Protocolo de incendio de piso."],
        ["media", "¿Cómo confina el Equipo 1 el incendio?", ["Con la cortina de humo o controlando la puerta", "Rompiendo ventanas", "Abriendo todas las puertas"], "Protocolo de incendio de piso."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["¿Qué hace el Equipo 3 de la AEA?", "Pone el ventilador/presurizador en la puerta del inmueble, bloquea los ascensores en planta baja y prepara la caja de escalera para la ventilación"],
        ["¿Qué hace el Equipo 4 de la AEA?", "Si el incendio sale por fachada y lo ordena el Jefe, el ataque ofensivo exterior («ablandado»); coloca la cesta (E-7/E-5) y hace el tendido para la AEA desde la trifurcación"],
        ["¿Qué hace el conductor de la AEA?", "A indicación del Oficial-Conductor sitúa y emplaza la AEA y colabora en la colocación de la cesta (E-7/E-5)"],
        ["¿Qué hace el Subjefe de Intervención (mando) al llegar?", "Una comunicación flash con el Centro de Comunicaciones, una primera inspección exterior, toma las decisiones y hace la inspección final"],
        ["¿Qué funciones tiene el Oficial de Conductores (control)?", "Ubicar los vehículos, poner en marcha el ventilador a indicación del mando, localizar hidrantes y colaborar en el abastecimiento, y hacer de enlace central-siniestro-mando"],
        ["¿Qué material sanitario dejan preparado en zona segura?", "Mochila circulatorio, pulsioxímetro portátil y bala de oxígeno con mascarillas reservorio; se les llama por radio como «Equipo Médico»"],
      ],
      preguntas: [
        ["facil", "¿Quién sitúa y emplaza la autoescala?", ["El conductor de la AEA, a indicación del Oficial-Conductor", "El Subjefe", "El Equipo 2 de la BUL"], "Protocolo de incendio de piso."],
        ["media", "¿Quién bloquea los ascensores en planta baja?", ["El Equipo 3 de la AEA", "El conductor de la BUL", "El personal sanitario"], "Protocolo de incendio de piso."],
        ["media", "¿Quién localiza los hidrantes y hace de enlace de comunicaciones?", ["El Oficial de Conductores", "El Equipo 1", "El médico"], "Protocolo de incendio de piso."],
        ["media", "¿Qué debe incluir la inspección final del mando?", ["Una medición de monóxido de carbono antes de dejar entrar a los residentes", "Solo una foto", "Nada más que el parte"], "Protocolo de incendio de piso."],
        ["dificil", "¿Con qué tendido se trabaja en la cesta de la AEA?", ["Tercio corto con lanza de 45 mm; el largo en Cleveland es para el acceso por fachada", "Tercio de 25 mm", "Sin agua"], "Protocolo de incendio de piso."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["¿Qué edificios deben tener columna seca según el CTE que cita el protocolo?", "Los de altura de evacuación mayor de 24 m (orientativamente una 8.ª planta)"],
        ["¿Qué es la IPF-41?", "La toma de fachada de la columna seca: siamesa en Y con racores Barcelona de 70 mm y purga de 25 mm, una por caja de escalera"],
        ["¿Qué es la IPF-39 y dónde se instala?", "La boca de salida en planta: siamesa en Y de 45 mm; en plantas pares y, desde la 8.ª, en todas"],
        ["¿Qué es la IPF-40?", "Una boca similar a la IPF-39 con válvula de seccionamiento; se instala cada cuatro plantas"],
        ["¿Qué edificios son de gran altura según la Ordenanza municipal que cita el protocolo?", "Los de altura de evacuación superior a 50 metros"],
        ["¿Cuánta pérdida de carga se añade por la altura en un tendido?", "1 kg/cm² por cada 10 m de altura, para cualquier diámetro"],
      ],
      preguntas: [
        ["facil", "¿De quién es el uso de la columna seca?", ["De uso exclusivo de bomberos", "De los vecinos", "Del conserje"], "Protocolo de incendio de piso."],
        ["media", "¿Cada cuántas plantas se instala la IPF-40 con válvula de seccionamiento?", ["Cada cuatro plantas", "En todas", "Cada diez plantas"], "Protocolo de incendio de piso."],
        ["media", "¿Qué hace el Equipo 2 de la BUL con las IPF en un incendio con columna seca?", ["Las revisa hasta la IPF-40 por encima del incendio y la cierra", "Las abre todas", "No hace nada"], "Protocolo de incendio de piso."],
        ["media", "¿Qué mangueras azules se usan en los primeros tramos con altas presiones?", ["Las HI-RISE", "Las de 25 mm semirrígidas", "Los mangotes"], "Protocolo de incendio de piso."],
        ["dificil", "Con dos vehículos en serie, ¿qué presión máxima tiene la bomba de apoyo?", ["6 bares", "17 bares", "50 bares"], "La principal sale como máximo a 17 bar (6+11)."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["¿Qué es el ataque exterior ofensivo o «ablandado»?", "Reducir la potencia del incendio desde una posición exterior segura con chorro de agua sin alterar el flujo de gases; idealmente con 45 mm y baja presión"],
        ["¿Qué diferencia el caudal óptimo del caudal crítico?", "El óptimo extingue con el mínimo gasto de agua; el crítico es el mínimo para conseguir la extinción (por debajo, el fuego solo decae al agotar el combustible)"],
        ["¿Qué es el golpe de ariete?", "Una sobrepresión y depresión (pulso de Zhukowski) por variar bruscamente el caudal, como al abrir o cerrar la lanza; puede romper racores, mangueras o la bomba"],
        ["¿Qué es la ventilación defensiva?", "Confinar el incendio y evacuar humos del resto del edificio sin que el aire limpio atraviese el recinto del fuego, con agua disponible antes de ventilar"],
        ["¿Qué es la falsa columna?", "Un tendido vertical de 45 mm, normalmente por la caja de escalera, que sustituye a una columna seca"],
        ["¿Cuándo debe usarse el cabo de anclaje integrado?", "En trabajos a más de 2 m de altura y siempre en la cesta de la AEA"],
      ],
      preguntas: [
        ["facil", "¿Qué zona debe balizarse e impedir el paso a ajenos a la intervención?", ["La zona caliente", "La zona fría", "Toda la calle siempre"], "Protocolo de incendio de piso."],
        ["media", "¿Por qué se prioriza el tendido vertical en plantas altas?", ["Por menores pérdidas de carga, rapidez y por dejar libre la escalera", "Por estética", "Porque gasta menos agua"], "Protocolo de incendio de piso."],
        ["media", "¿Qué debe confirmarse antes de empezar a ventilar?", ["Que hay agua disponible en el área de incendio", "Que el ascensor funciona", "Que la ambulancia se ha ido"], "Protocolo de incendio de piso."],
        ["media", "¿Cómo debe ir plegado el tercio de ataque que sube el Equipo 1 con columna seca?", ["En «Cleveland»", "En «Americano»", "Enrollado en devanadera"], "Protocolo de incendio de piso."],
        ["dificil", "¿Qué debe hacerse con las ventanas cerradas para la ventilación táctica al terminar?", ["Dejarlas abiertas", "Cerrarlas con llave", "Precintarlas"], "Protocolo de incendio de piso."],
      ],
    },
  ],
  glosario: [
    [S1, "Tren de ataque", "Conjunto de vehículos y dotaciones que se envían de forma inmediata a un tipo de siniestro tipificado."],
    [S2, "Equipo S.O.S.", "Equipo que permanece en zona limpia, junto a la vivienda, preparado para rescatar a los compañeros que trabajan dentro."],
    [S3, "UMC", "Unidad de Mando y Comunicaciones: vehículo del Subjefe de Intervención y del Oficial de Conductores."],
    [S4, "IPF-41", "Toma de alimentación de la columna seca en fachada, con racores de 70 mm."],
    [S4, "HI-RISE", "Mangueras azules de especificaciones mejoradas para los primeros tramos con altas presiones en 45 y 70 mm."],
    [S5, "Ablandado", "Ataque exterior ofensivo que reduce la potencia del incendio desde fuera sin alterar el flujo de gases."],
  ],
  casos: [
    {
      slug: "caso-incendio-cuarta-planta-conductor-bul",
      titulo: "Incendio en una cuarta planta: el conductor de la BUL",
      supuesto: "Sale el tren de ataque a un incendio en un piso de la cuarta planta de un edificio de viviendas. Usted es el bombero conductor de la BUL.",
      preguntas: [
        [S1, "facil", "¿Qué otros vehículos acompañan a su BUL?", ["La UMC, la AEA y una ambulancia tipo C", "Solo la policía", "Una BNP y una grúa"], "Protocolo."],
        [S2, "facil", "¿Quién le indica dónde colocar la BUL?", ["El Oficial-Conductor", "El vecino", "El médico"], "Protocolo."],
        [S2, "media", "¿Qué debe prever al colocar el vehículo?", ["Espacio para la AEA y la posible caída de elementos del edificio", "Solo la sombra", "Aparcar lo más cerca posible de la puerta"], "Protocolo."],
        [S2, "media", "¿Qué radio balizará?", ["Unos 10 m del acceso al inmueble", "1 m", "50 m"], "Protocolo."],
        [S2, "media", "¿Qué instalación hace usted?", ["De 70 mm desde la bomba a la trifurcación", "De 25 mm a la vivienda", "Ninguna"], "Protocolo."],
        [S2, "media", "¿Cuándo da agua?", ["A petición del Oficial del Equipo 1", "En cuanto llega", "Cuando lo pida un vecino"], "Protocolo."],
        [S2, "media", "¿Qué vigila en la bomba?", ["Presión de trabajo y temperatura", "Solo el nivel de combustible", "La radio"], "Protocolo."],
        [S2, "media", "¿Con quién colabora para el abastecimiento de agua?", ["Con el Oficial-Conductor", "Con el Equipo 3", "Con el personal sanitario"], "Protocolo."],
        [S5, "dificil", "¿Qué fenómeno debe evitar con maniobras bruscas de las válvulas?", ["El golpe de ariete", "El flashover", "La cavitación del tráfico"], "Protocolo."],
        [S2, "media", "¿Qué equipo personal lleva usted?", ["EPI nivel 1 con cabo de anclaje, radio y linterna", "ERA y cámara térmica", "Ninguno"], "Protocolo."],
      ],
    },
    {
      slug: "caso-incendio-planta-doce-columna-seca",
      titulo: "Incendio en una planta 12 con columna seca",
      supuesto: "Arde una vivienda en la planta 12 de un edificio con columna seca. El tren de ataque se refuerza y se ataca a través de la columna.",
      preguntas: [
        [S1, "facil", "¿Qué vehículo se añade por ser una planta superior a la 9.ª?", ["Una BUP", "Una BNP", "Una grúa"], "Protocolo."],
        [S4, "media", "¿Dónde conecta el conductor de la BUL la instalación de 70 mm?", ["En la IPF-41 de la caja de escalera", "En la IPF-39 de la planta 12", "En el hidrante"], "Protocolo."],
        [S4, "media", "¿Qué hace el conductor tras conectar a la IPF-41?", ["Presuriza hasta ella y espera a que el Oficial pida presurizar la columna", "Presuriza toda la columna de inmediato", "Desconecta"], "Protocolo."],
        [S4, "media", "¿Dónde conecta el Equipo 1 su tendido de ataque?", ["En la IPF-39 (o IPF-40) de la planta siniestrada", "En la IPF-41", "En la bomba"], "Protocolo."],
        [S4, "media", "¿Qué revisa el Equipo 2 antes de subir?", ["Las IPF hasta la IPF-40 por encima del incendio, que cierra", "Los ascensores", "Las ventanas"], "Protocolo."],
        [S4, "dificil", "Si el Equipo 1 no puede conectar en su planta, ¿qué hace el Equipo 2?", ["Conecta un tercio de 38 mm en la planta inferior y lo empalma al ataque", "Abandona la intervención", "Usa la IPF-41"], "Protocolo."],
        [S2, "media", "¿Qué llave necesitan para abrir los armarios de la columna seca?", ["Llave de cuadradillo", "Llave de ascensor", "Llave de hidrante"], "Protocolo."],
        [S5, "media", "¿Cómo debe desplegarse el tercio «de aproximación» en Americano antes de presurizar?", ["En vacío", "Ya presurizado", "Enrollado"], "Protocolo."],
        [S4, "media", "¿Qué se añade a la pérdida de carga por los 12 pisos (unos 36 m)?", ["Unos 3,6 kg/cm² (1 por cada 10 m)", "Nada", "12 kg/cm²"], "Protocolo."],
        [S3, "media", "¿Quién pone en marcha el ventilador cuando lo indique el mando?", ["El Oficial de Conductores", "El conductor de la AEA", "El médico"], "Protocolo."],
      ],
    },
    {
      slug: "caso-incendio-exteriorizado-fachada-aea",
      titulo: "Un incendio que sale por la fachada",
      supuesto: "Un incendio en un tercer piso sale por la ventana a la fachada y hay una persona pidiendo ayuda en el balcón contiguo. Interviene la autoescala.",
      preguntas: [
        [S3, "facil", "¿Quién decide hacer el ataque ofensivo exterior?", ["El Jefe de la Intervención", "El conductor de la AEA", "El vecino"], "Protocolo."],
        [S5, "media", "¿Qué pretende el «ablandado»?", ["Reducir la potencia del incendio desde fuera sin alterar el flujo de gases", "Romper la fachada", "Ventilar la vivienda"], "Protocolo."],
        [S5, "media", "¿Qué tendido es idóneo para el ablandado?", ["45 mm y baja presión", "25 mm y alta presión", "70 mm y 50 bares"], "Protocolo."],
        [S3, "media", "¿Quién realiza el ablandado?", ["El Equipo 4 de la AEA", "El Equipo 1 de la BUL", "El personal sanitario"], "Protocolo."],
        [S3, "media", "¿Quién emplaza la autoescala?", ["Su conductor, a indicación del Oficial-Conductor", "El Equipo 2", "La policía"], "Protocolo."],
        [S5, "media", "¿Qué deben llevar los bomberos en la cesta?", ["El cabo de anclaje integrado sujeto", "Nada especial", "Solo el casco"], "Protocolo."],
        [S3, "media", "¿Puede el Oficial de la AEA subir a la cesta para el salvamento?", ["Sí, a criterio del mando, como parte del Equipo 4", "No, nunca", "Solo si no hay humo"], "Protocolo."],
        [S1, "media", "¿Qué dice el criterio sobre el agua en la cesta?", ["No hay excusa para no subir tendido y disponer de agua en la cesta", "No es necesaria", "Solo de noche"], "Protocolo."],
        [S3, "dificil", "¿A qué debe prestar atención el Equipo 4 al tender a la AEA?", ["Al sentido de giro de la torre de la AEA", "Al color de la manguera", "A la radio"], "Protocolo."],
        [S3, "media", "Si se baja a la víctima, ¿qué hace el conductor de la ambulancia?", ["Saca la camilla y la deja preparada", "Se marcha", "Apaga la radio"], "Protocolo."],
      ],
    },
  ],
});
