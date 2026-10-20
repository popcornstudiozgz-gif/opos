/**
 * Crea tema-327 — Tema 32 de Bombero/a Conductor/a: "Primeros auxilios.
 * Recomendaciones de la AHA (American Heart Association) del año 2020:
 * Soporte Vital Básico en adulto, niño y lactante. Obstrucción de la vía
 * aérea en adulto, niño y lactante."
 *
 * Fuente: Tema 32 "Primeros auxilios" (V.2) de la Escuela de Bomberos del
 * Ayuntamiento de Zaragoza, leído íntegro, que desarrolla las
 * recomendaciones AHA 2020 que cita el temario oficial. Contenido sanitario
 * sin norma legal: se ciñe a lo que expone el documento oficial.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-327-primeros-auxilios-svb-aha.mjs
 */
import { sembrarTema, BOMBERO } from "./lib/sembrar-tema.mjs";

const FUENTE = "https://www.zaragoza.es/cont/vistas/portal//bomberos/doc/TEMA_32_Primeros_auxilios_V2.pdf";
const S1 = "cadena-supervivencia";
const S2 = "svb-adulto";
const S3 = "dea";
const S4 = "svb-ninos-lactantes";
const S5 = "obstruccion-via-aerea";

await sembrarTema({
  tema: {
    slug: "tema-327",
    titulo: "Primeros auxilios (I): soporte vital básico y obstrucción de la vía aérea según la AHA 2020",
    descripcion: "Cadena de supervivencia extrahospitalaria; definiciones de edad; algoritmo de soporte vital básico en adultos; RCP de alta calidad; posición lateral de seguridad; uso del DEA y circunstancias especiales; soporte vital básico en niños y lactantes; obstrucción de la vía aérea por cuerpo extraño en adultos, niños y lactantes.",
    contenido: "Sigue el Tema 32 de la Escuela de Bomberos sobre las recomendaciones de la American Heart Association de 2020: cómo reconocer un paro cardíaco, cómo hacer compresiones y ventilaciones de calidad en adultos, niños y lactantes, cómo usar un desfibrilador externo automatizado con seguridad y cómo desobstruir la vía aérea de una persona que se atraganta.",
    enlaces_boe: [{ url: FUENTE, titulo: "Escuela de Bomberos de Zaragoza — Tema 32: Primeros auxilios, recomendaciones AHA 2020 (V.2)" }],
    indice_estudio: [
      { seccion: S1, titulo: "La cadena de supervivencia", articulos: "Tema 32, introducción", url: FUENTE },
      { seccion: S2, titulo: "Soporte vital básico en adultos", articulos: "Tema 32, SVB en adultos", url: FUENTE },
      { seccion: S3, titulo: "El desfibrilador externo automatizado (DEA)", articulos: "Tema 32, DEA", url: FUENTE },
      { seccion: S4, titulo: "Soporte vital básico en niños y lactantes", articulos: "Tema 32, SVB pediátrico", url: FUENTE },
      { seccion: S5, titulo: "Obstrucción de la vía aérea", articulos: "Tema 32, apartado 2", url: FUENTE },
    ],
  },
  vinculo: { oposicion: BOMBERO.oposicion, bloqueId: BOMBERO.bloqueParteII, numero: 32 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["¿Qué refleja la cadena de supervivencia?", "Las acciones encadenadas que dan a la víctima de un paro la mejor posibilidad de sobrevivir; si un eslabón se rompe, el resultado empeora"],
        ["¿Cuántos eslabones tienen las cadenas de supervivencia desde 2020?", "Seis; en 2020 la AHA añadió un eslabón a todas las cadenas (la recuperación)"],
        ["¿Cómo define la AHA lactante, niño y adulto?", "Lactante, menor de 1 año; niño, de 1 a 8 años; adulto, desde los 8 años"],
        ["¿Qué tres acciones son fundamentales al identificar un paro cardíaco?", "Activar de inmediato el sistema de emergencias, hacer una RCP de alta calidad y temprana y desfibrilar con un DEA"],
        ["¿Qué diferencia el paro cardíaco de adultos y de niños?", "En adultos suele ser repentino y de origen cardíaco; en niños suele relacionarse con un problema respiratorio, y la prevención es el primer eslabón pediátrico"],
      ],
      preguntas: [
        ["facil", "Según la AHA, ¿a partir de qué edad se considera adulto a efectos de RCP?", ["8 años", "12 años", "18 años"], "Tema 32."],
        ["media", "¿Qué porcentaje aproximado de adultos atendidos por un paro no traumático sobrevive al alta?", ["Apenas un 10 %", "Un 50 %", "Un 90 %"], "Tema 32."],
        ["media", "¿Qué es la RCP-T?", ["La RCP asistida por el teleoperador de emergencias", "Una RCP solo con ventilaciones", "La RCP traumática"], "Tema 32."],
        ["media", "¿Qué debe hacer, como mínimo, un testigo sin entrenamiento?", ["Compresiones torácicas (RCP solo con las manos)", "Nada", "Solo ventilaciones"], "Tema 32."],
        ["dificil", "¿Cuánto pueden multiplicar la RCP inmediata y la desfibrilación temprana la supervivencia?", ["Duplicarla o triplicarla", "No la modifican", "Multiplicarla por diez"], "Tema 32."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["¿Cuáles son los pasos iniciales del algoritmo de SVB?", "Confirmar la seguridad de la escena, comprobar si la víctima responde, pedir ayuda (sistema de emergencias y DEA) y evaluar la respiración en no más de 10 segundos"],
        ["¿Qué hacer con una persona inconsciente que respira y sin lesiones que lo contraindiquen?", "Colocarla en posición lateral de seguridad para evitar la obstrucción de la vía aérea"],
        ["¿Cómo son las compresiones de alta calidad en un adulto?", "Al menos 5 cm de profundidad, 100 a 120 por minuto, permitiendo que el pecho vuelva a su posición, con interrupciones de menos de 10 segundos"],
        ["¿Cuál es la relación compresión-ventilación del reanimador único?", "30 compresiones y 2 ventilaciones"],
        ["¿Dónde se colocan las manos para las compresiones?", "Talón de una mano en el centro del pecho, mitad inferior del esternón, la otra encima, brazos rectos y hombros sobre las manos"],
        ["¿Cada cuánto se turnan dos reanimadores en las compresiones?", "Cada 5 ciclos de 30:2, aproximadamente cada 2 minutos"],
        ["¿Qué se hace en una embarazada con útero a la altura notoria (unas 20 semanas)?", "RCP normal más desplazamiento lateral del útero hacia la izquierda; si se reanima, colocarla sobre su lado izquierdo"],
      ],
      preguntas: [
        ["facil", "¿Qué profundidad mínima tienen las compresiones en un adulto?", ["5 cm", "2 cm", "10 cm"], "Tema 32."],
        ["media", "¿A qué frecuencia se hacen las compresiones?", ["100 a 120 por minuto", "60 por minuto", "150 a 180 por minuto"], "Tema 32."],
        ["media", "¿Cuánto debe durar cada ventilación?", ["1 segundo", "5 segundos", "Medio segundo"], "Tema 32."],
        ["media", "¿Debe comprobar el pulso el personal lego?", ["No", "Sí, siempre en el cuello", "Sí, en la muñeca"], "Tema 32."],
        ["dificil", "¿Qué porcentaje de oxígeno contiene aproximadamente el aire que exhala el reanimador?", ["17 %", "4 %", "21 %"], "Tema 32."],
        ["media", "¿Cuándo puede moverse a una víctima con sospecha de traumatismo?", ["Si no se puede mantener la vía aérea, el lugar no es seguro o es indispensable para la RCP", "Siempre", "Nunca"], "Tema 32."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["¿Qué ritmos son desfibrilables?", "La taquicardia ventricular sin pulso y la fibrilación ventricular"],
        ["¿En cuánto tiempo deben hacerse los primeros pasos del DEA tras su llegada?", "Encenderlo y colocar los parches en unos 30 segundos, mientras otro reanimador sigue con la RCP"],
        ["¿Qué colocaciones de parches existen?", "Anterolateral (bajo la clavícula derecha y al costado del pezón izquierdo) y anteroposterior (centro del tórax y centro de la espalda)"],
        ["¿Qué se hace tras una descarga o si el DEA no la aconseja?", "Reanudar de inmediato la RCP empezando por las compresiones; el DEA vuelve a analizar cada 2 minutos"],
        ["¿Qué hacer si la víctima tiene el pecho mojado?", "Sacarla del agua si está sumergida y secar rápidamente el tórax antes de colocar los parches"],
        ["¿Qué hacer con un marcapasos o un parche de medicación?", "Evitar colocar el parche del DEA encima del dispositivo; retirar el parche de medicación con guantes y limpiar la zona si no retrasa la descarga"],
      ],
      preguntas: [
        ["facil", "¿Qué parches se usan en víctimas de 8 años en adelante?", ["Los de adulto", "Los pediátricos", "Cualquiera"], "Tema 32."],
        ["media", "¿Se pueden usar parches pediátricos en un adulto?", ["No, su energía es insuficiente", "Sí, siempre", "Solo si es delgado"], "Tema 32."],
        ["media", "¿Daña la descarga del DEA al feto de una embarazada en paro?", ["No", "Sí", "Solo en el tercer trimestre"], "Tema 32."],
        ["media", "¿Qué hacer si el vello torácico impide que se peguen los parches?", ["Rasurar la zona o usar un primer juego de parches para depilar", "Pegarlos sobre la ropa", "No usar el DEA"], "Tema 32."],
        ["dificil", "¿Qué signos indican el retorno de la circulación espontánea?", ["Ventilación, tos y movimiento del paciente", "Pupilas dilatadas", "Piel fría"], "Tema 32."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["¿Qué relación compresión-ventilación usa un reanimador único en niños y lactantes?", "La misma que en adultos: 30:2"],
        ["¿Qué profundidad tienen las compresiones en lactantes y niños?", "Al menos un tercio del diámetro anteroposterior: unos 4 cm en el lactante y unos 5 cm en el niño"],
        ["¿Cómo se comprime en un lactante?", "Con 2 dedos en el centro del tórax, justo por debajo de la línea de los pezones, sin presionar la punta del esternón"],
        ["¿Por qué son tan importantes las ventilaciones en niños?", "Porque su paro suele deberse a problemas respiratorios y la sangre ya tiene poco oxígeno: solo compresiones no basta"],
        ["¿Qué técnica de ventilación se prefiere en el lactante?", "Boca a boca y nariz, con la cabeza en posición neutra"],
        ["¿Cuándo activa el sistema de emergencias un reanimador solo con un lactante?", "Tras unos 5 ciclos o 2 minutos de RCP, si nadie lo ha activado"],
      ],
      preguntas: [
        ["facil", "¿Con qué se hacen las compresiones en un lactante?", ["Con 2 dedos", "Con las dos manos", "Con el puño"], "Tema 32."],
        ["media", "¿Qué profundidad aproximada tienen las compresiones en un lactante?", ["Unos 4 cm", "Unos 8 cm", "Unos 1 cm"], "Tema 32."],
        ["media", "¿Cómo se comprueba si responde un lactante?", ["Tocando el talón del pie y preguntando en voz alta", "Sacudiéndolo con fuerza", "Pellizcándolo"], "Tema 32."],
        ["media", "¿Por qué no se extiende demasiado la cabeza del lactante?", ["Porque la vía aérea puede quedar bloqueada", "Porque le duele", "Porque se despierta"], "Tema 32."],
        ["dificil", "¿Qué colocación de parches es la más común en lactantes?", ["Anteroposterior", "Anterolateral", "En las piernas"], "Tema 32."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["¿Qué signos indican una obstrucción leve de la vía aérea y qué se hace?", "Buen intercambio de aire y tos forzada: animar a toser y vigilar"],
        ["¿Qué es el signo universal de obstrucción?", "La víctima se lleva las manos al cuello; si no puede hablar, la obstrucción es grave"],
        ["¿Cómo se hace la maniobra de Heimlich?", "Desde detrás, puño con el pulgar contra el abdomen en la línea media, por encima del ombligo y por debajo del esternón, y compresiones rápidas hacia arriba"],
        ["¿Qué se hace en embarazadas o personas muy obesas que se atragantan?", "Compresiones torácicas en el mismo punto que el masaje cardíaco"],
        ["¿Cómo se desobstruye a un lactante que responde?", "Hasta 5 palmadas en la espalda entre los omóplatos y hasta 5 compresiones torácicas, con la cabeza por debajo del tronco; nunca compresiones abdominales"],
        ["¿Qué hacer si la víctima de atragantamiento deja de responder?", "Bajarla al suelo, iniciar RCP con compresiones y, al abrir la vía aérea, buscar el objeto y sacarlo solo si se ve; nunca barrido digital a ciegas"],
      ],
      preguntas: [
        ["facil", "¿Qué se hace ante un atragantamiento leve con tos eficaz?", ["Animar a toser y vigilar", "Heimlich inmediato", "Palmadas fuertes"], "Tema 32."],
        ["media", "¿Se hacen compresiones abdominales a un lactante?", ["No, nunca", "Sí, siempre", "Solo si es mayor de 6 meses"], "Tema 32."],
        ["media", "¿Por qué no se hace barrido digital a ciegas?", ["Puede empujar el objeto más adentro o causar lesiones", "Es lento", "Es antihigiénico"], "Tema 32."],
        ["media", "¿Cuántas palmadas en la espalda se dan a un lactante en cada secuencia?", ["Hasta 5", "Hasta 30", "Una"], "Tema 32."],
        ["dificil", "¿Por qué la RCP puede ayudar en una obstrucción tras perder el conocimiento?", ["Los músculos se relajan y las compresiones torácicas generan tanta fuerza como las abdominales", "Porque se ventila mejor", "Porque el objeto se disuelve"], "Tema 32."],
      ],
    },
  ],
  glosario: [
    [S1, "Cadena de supervivencia", "Secuencia de seis eslabones de actuación ante un paro cardíaco, según la AHA 2020."],
    [S2, "RCP de alta calidad", "Compresiones de al menos 5 cm a 100-120 por minuto, con reexpansión completa del tórax e interrupciones mínimas."],
    [S2, "Posición lateral de seguridad", "Postura de costado para una persona inconsciente que respira, que evita la obstrucción de la vía aérea."],
    [S3, "DEA", "Desfibrilador externo automatizado: analiza el ritmo y administra una descarga si es desfibrilable."],
    [S3, "Fibrilación ventricular", "Ritmo de paro con actividad eléctrica caótica del corazón, que no bombea sangre; es desfibrilable."],
    [S5, "Maniobra de Heimlich", "Compresiones abdominales rápidas hacia arriba para expulsar un cuerpo extraño en adultos y niños que responden."],
  ],
  casos: [
    {
      slug: "caso-paro-cardiaco-calle",
      titulo: "Un hombre se desploma en la calle",
      supuesto: "Al volver de un servicio, la dotación ve a un hombre de unos 60 años desplomarse en la acera. No responde y solo boquea. El vehículo lleva un DEA.",
      preguntas: [
        [S2, "facil", "¿Qué se comprueba primero?", ["Que la escena es segura", "El pulso en la muñeca", "Su documentación"], "Tema 32."],
        [S2, "media", "¿Respirar boqueando es una respiración normal?", ["No, es signo de paro", "Sí", "Solo si es rápido"], "Tema 32."],
        [S2, "media", "¿Cuánto tiempo como máximo se dedica a evaluar la respiración?", ["10 segundos", "1 minuto", "30 segundos"], "Tema 32."],
        [S2, "media", "¿Con qué relación comienza la RCP?", ["30 compresiones y 2 ventilaciones", "15:2", "5:1"], "Tema 32."],
        [S3, "media", "¿Cuándo se usa el DEA?", ["Tan pronto como esté disponible", "Tras 20 minutos de RCP", "Solo en el hospital"], "Tema 32."],
        [S3, "media", "Durante el análisis del ritmo, ¿qué deben hacer todos?", ["Apartarse sin tocar a la víctima", "Seguir las compresiones", "Ventilar"], "Tema 32."],
        [S3, "media", "Tras la descarga, ¿qué se hace?", ["Reanudar la RCP con compresiones de inmediato", "Esperar 2 minutos sin hacer nada", "Comprobar pupilas"], "Tema 32."],
        [S2, "media", "¿Cada cuánto deben turnarse los bomberos en las compresiones?", ["Cada 2 minutos aproximadamente", "Cada 10 minutos", "No se turnan"], "Tema 32."],
        [S3, "dificil", "¿Dónde va un parche en la colocación anterolateral?", ["Justo debajo de la clavícula derecha", "En la espalda", "En el abdomen"], "Tema 32."],
        [S2, "media", "¿Hasta cuándo se mantiene la RCP?", ["Hasta que llegue el soporte vital avanzado o la víctima reaccione", "Hasta cansarse", "5 minutos"], "Tema 32."],
      ],
    },
    {
      slug: "caso-lactante-atragantado",
      titulo: "Un lactante atragantado",
      supuesto: "En una vivienda, una madre pide ayuda porque su bebé de 8 meses se ha atragantado con un trozo de juguete y no puede llorar ni toser con fuerza.",
      preguntas: [
        [S5, "facil", "¿Qué tipo de obstrucción sugiere la tos ineficaz?", ["Grave", "Leve", "Ninguna"], "Tema 32."],
        [S5, "media", "¿Qué maniobras se usan en el lactante consciente?", ["Hasta 5 palmadas en la espalda y hasta 5 compresiones torácicas", "Maniobra de Heimlich", "Compresiones abdominales"], "Tema 32."],
        [S5, "media", "¿Cómo se sujeta al lactante para las palmadas?", ["Boca abajo sobre el antebrazo, con la cabeza más baja que el tórax", "De pie", "Boca arriba en la cama"], "Tema 32."],
        [S5, "media", "¿Dónde se dan las palmadas?", ["Entre los omóplatos", "En la nuca", "En el abdomen"], "Tema 32."],
        [S5, "media", "¿Dónde se hacen las compresiones torácicas?", ["En el centro del tórax, mitad inferior del esternón", "En el abdomen", "En el cuello"], "Tema 32."],
        [S5, "media", "Si el bebé deja de responder, ¿qué se hace?", ["Iniciar RCP con compresiones y buscar el objeto al abrir la vía aérea", "Seguir con palmadas", "Esperar"], "Tema 32."],
        [S4, "media", "¿Qué profundidad tienen las compresiones de RCP en el lactante?", ["Un tercio del tórax, unos 4 cm", "5 cm como en adultos", "1 cm"], "Tema 32."],
        [S4, "media", "¿Cómo se ventila al lactante?", ["Boca a boca y nariz con la cabeza en posición neutra", "Solo por la nariz", "Con la cabeza muy extendida"], "Tema 32."],
        [S5, "dificil", "Si se ve el juguete en la garganta y es fácil de coger, ¿qué se hace?", ["Sacarlo con los dedos", "Empujarlo", "Dejarlo"], "Tema 32."],
        [S5, "media", "¿Por qué no se hace un barrido a ciegas con el dedo?", ["Puede empujar el objeto o causar lesiones", "Es lento", "Está prohibido por ley"], "Tema 32."],
      ],
    },
    {
      slug: "caso-paro-piscina-nino",
      titulo: "Un niño sacado de una piscina",
      supuesto: "En una piscina municipal, un socorrista ha sacado del agua a un niño de 6 años que no respira. La dotación llega con un DEA con parches pediátricos.",
      preguntas: [
        [S4, "facil", "¿Qué se debe hacer con el tórax mojado antes del DEA?", ["Secarlo rápidamente", "Nada", "Echar más agua"], "Tema 32."],
        [S4, "media", "¿Por qué son tan importantes aquí las ventilaciones?", ["Porque el paro del niño suele ser de origen respiratorio", "Porque es obligatorio", "No son importantes"], "Tema 32."],
        [S4, "media", "¿Qué profundidad tienen las compresiones en un niño de 6 años?", ["Un tercio del tórax, unos 5 cm", "Unos 2 cm", "Unos 10 cm"], "Tema 32."],
        [S4, "media", "¿Con qué se comprime a un niño de 6 años?", ["Con 1 o 2 manos según su tamaño", "Con 2 dedos", "Con el pie"], "Tema 32."],
        [S3, "media", "¿Qué parches deben usarse si están disponibles?", ["Los pediátricos", "Los de adulto obligatoriamente", "Ninguno"], "Tema 32."],
        [S3, "media", "Si solo hubiera parches de adulto, ¿qué se hace?", ["Usarlos sin que se toquen, quizá en anteroposterior", "No usar el DEA", "Cortarlos"], "Tema 32."],
        [S4, "media", "¿Qué relación compresión-ventilación aplicará un reanimador único?", ["30:2", "15:1", "5:5"], "Tema 32."],
        [S3, "dificil", "¿Qué hace un sistema de atenuación pediátrica del DEA?", ["Reduce la energía de la descarga", "Aumenta la energía", "Analiza el pulso"], "Tema 32."],
        [S3, "media", "¿Se puede usar el DEA sobre una superficie mojada pequeña tras secar el tórax?", ["Sí, tras limpiar rápidamente el tórax", "No, nunca", "Solo en seco absoluto"], "Tema 32."],
        [S1, "media", "¿Qué rango de edad es «niño» para la AHA?", ["De 1 a 8 años", "De 0 a 12 años", "De 3 a 14 años"], "Tema 32."],
      ],
    },
  ],
});
