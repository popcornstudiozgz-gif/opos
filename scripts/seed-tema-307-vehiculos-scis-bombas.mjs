/**
 * Crea tema-307 — Tema 12 de Bombero/a Conductor/a: "Características
 * básicas de los vehículos del SCIS: BUL, BUP, BNP, BRM, BPM y BRP."
 *
 * Fuente: Tema 12 de la Escuela de Bomberos del Ayuntamiento de Zaragoza
 * (fichas técnicas por vehículo y dotación de armarios de la BUL T-51, BRP
 * T-37, BNP T-50 y BUP T-32). Las tablas se leyeron con `pdftotext -table`
 * y se contrastaron por coordenadas del PDF, porque la extracción normal las
 * desordena. Las cifras de caudal de bomba se citan tal como figuran en las
 * fichas (p. ej. "16/8 - 3/40"), sin interpretar unidades que el documento
 * no explicita.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-307-vehiculos-scis-bombas.mjs
 */
import { sembrarTema, BOMBERO } from "./lib/sembrar-tema.mjs";

const FUENTE = BOMBERO.escuela("Tema_12-_Caracteristias_basicas_de_los_vehiculos_del_SCIS1.pdf");
const S1 = "bombas-urbanas-ligeras-bul";
const S2 = "bombas-urbanas-pesadas-mixtas";
const S3 = "bombas-rurales-nodrizas";
const S4 = "dotacion-material-vehiculos";

await sembrarTema({
  tema: {
    slug: "tema-307",
    titulo: "Vehículos del SCIS (I): bombas urbanas, mixtas, rurales y nodrizas",
    descripcion: "Fichas técnicas de las Bombas Urbanas Ligeras (BUL), Urbanas Pesadas (BUP), Pesadas Mixtas (BPM) y Rural Mixta (BRM), Rurales Pesadas (BRP) y Nodrizas Pesadas (BNP) del Servicio: transmisión, bloqueos, cisterna, espuma, bomba, cebado, cabestrante y caja de cambios; y dotación de material por armarios.",
    contenido: "Recoge las características básicas de la flota de autobombas del Servicio contra Incendios de Zaragoza tal como las publica la Escuela de Bomberos: qué distingue a cada tipo de bomba, las capacidades de cisterna y espuma de cada vehículo, quién lleva tracción total o bloqueos, y qué material lleva cada armario de los vehículos tipo.",
    enlaces_boe: [{ url: FUENTE, titulo: "Escuela de Bomberos de Zaragoza — Tema 12: Características básicas de los vehículos del SCIS" }],
    indice_estudio: [
      { seccion: S1, titulo: "Bombas Urbanas Ligeras (BUL)", articulos: "Tema 12, fichas BUL", url: FUENTE },
      { seccion: S2, titulo: "Bombas Urbanas Pesadas (BUP) y Pesadas Mixtas (BPM/BRM)", articulos: "Tema 12, fichas BUP, BPM y BRM", url: FUENTE },
      { seccion: S3, titulo: "Bombas Rurales Pesadas (BRP) y Nodrizas Pesadas (BNP)", articulos: "Tema 12, fichas BRP y BNP", url: FUENTE },
      { seccion: S4, titulo: "Dotación de material por armarios", articulos: "Tema 12, BUL T-51, BRP T-37, BNP T-50, BUP T-32", url: FUENTE },
    ],
  },
  vinculo: { oposicion: BOMBERO.oposicion, bloqueId: BOMBERO.bloqueParteII, numero: 12 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["¿Qué significan las siglas BUL?", "Bomba Urbana Ligera"],
        ["¿Qué transmisión tienen todas las BUL del Servicio?", "4x2"],
        ["¿Qué capacidades de cisterna tienen las BUL?", "Entre 1.300 L (T-29) y 2.500 L (T-39, T-49, T-51); T-35 1.500 L y T-36, T-40 y T-52 2.000 L"],
        ["¿Qué BUL lleva premezclador de espuma?", "La T-35 (bomba Godiva); el resto de BUL no llevan espuma"],
        ["¿Qué tipo de presión tienen las bombas de las BUL?", "Combinada"],
        ["¿Qué marca de bomba montan las BUL T-40, T-49, T-51 y T-52?", "Magirus; estas cuatro tienen bloqueos, cebado automático y AdBlue salvo la T-40"],
      ],
      preguntas: [
        ["facil", "¿Qué tracción tienen las Bombas Urbanas Ligeras del Servicio?", ["4x2", "4x4", "6x4"], "Todas las BUL son 4x2 (Tema 12)."],
        ["media", "¿Qué BUL tiene la cisterna más pequeña?", ["La T-29, con 1.300 L", "La T-51", "La T-52"], "Tema 12, ficha BUL."],
        ["media", "¿Cuál es la única BUL con premezclador de espuma?", ["La T-35", "La T-49", "La T-29"], "Tema 12, ficha BUL."],
        ["media", "¿Qué capacidad de cabestrante tienen las BUL T-49, T-51 y T-52?", ["5.443 kg", "3.600 kg", "6.803 kg"], "Tema 12, ficha BUL."],
        ["dificil", "¿Qué BUL de bomba Magirus tiene caja de cambios manual?", ["La T-40", "La T-49", "La T-52"], "T-40 manual; T-49, T-51 y T-52 automáticas."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["¿Qué significan BUP, BPM y BRM?", "Bomba Urbana Pesada, Bomba Pesada Mixta y Bomba Rural Mixta"],
        ["¿Qué cisterna tienen las BUP, BPM y la BRM?", "3.000 L todas ellas"],
        ["¿Qué BUP llevan espuma y monitor?", "La T-32 y la T-33 (bomba Rosenbauer), con 200 L de espuma y monitor; la T-43 y T-45 (Ziegler) no"],
        ["¿Qué vehículo de este grupo tiene tracción 4x4?", "La BRM T-47 (Bomba Rural Mixta)"],
        ["¿Qué equipamiento común destaca en las BPM y la BRM?", "Todas llevan monitor, equipo de rescate y foco de iluminación"],
        ["¿Qué espuma lleva la BPM T-48?", "150 L + 150 L, con bomba Flomeyca y monitor de 2.000 l/min"],
      ],
      preguntas: [
        ["facil", "¿Qué capacidad de cisterna tienen las Bombas Urbanas Pesadas?", ["3.000 L", "1.300 L", "7.500 L"], "Tema 12, ficha BUP."],
        ["media", "¿Qué vehículo del grupo de pesadas mixtas tiene tracción total 4x4?", ["La BRM T-47", "La BPM T-34", "La BUP T-32"], "Tema 12."],
        ["media", "¿Qué BUP llevan 200 L de espuma?", ["La T-32 y la T-33", "La T-43 y la T-45", "Ninguna"], "Tema 12, ficha BUP."],
        ["media", "¿Qué tipo de bloqueo tienen las BUP?", ["Diferencial", "Longitudinal y transversal", "Ninguno"], "Tema 12, ficha BUP."],
        ["dificil", "¿Qué capacidad de cabestrante tiene la BPM T-48?", ["5.500 kg", "4.080 kg", "3.600 kg"], "Tema 12, ficha BPM."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["¿Qué características comparten las BRP T-37, T-38 y T-42?", "Tracción 4x4, bloqueos longitudinal y transversal, cisterna de 3.500 L, sin espuma, bomba Rosenbauer, cabestrante de 3.600 kg y caja Telligent"],
        ["¿Qué significa BNP?", "Bomba Nodriza Pesada: vehículo de gran capacidad de agua para abastecer a otros vehículos"],
        ["¿Qué capacidades de cisterna tienen las BNP?", "T-31: 7.500 L; T-41: 8.000 L; T-44: 12.500 L; T-50: 14.500 L"],
        ["¿Qué BNP tiene la mayor cisterna y qué tracción?", "La T-50, con 14.500 L, tracción 8x4 y cabestrante de 6.803 kg"],
        ["¿Qué BNP lleva espuma?", "La T-31, con 500 L; el resto no"],
        ["¿Qué tipo de presión tienen las BNP T-41 y T-44?", "Baja presión; la T-31 y la T-50 la tienen combinada"],
      ],
      preguntas: [
        ["facil", "¿Qué tracción tienen las Bombas Rurales Pesadas?", ["4x4", "4x2", "8x4"], "Tema 12, ficha BRP."],
        ["media", "¿Qué cisterna tienen las BRP?", ["3.500 L", "2.000 L", "14.500 L"], "Tema 12, ficha BRP."],
        ["media", "¿Qué BNP tiene una cisterna de 12.500 L y tracción 6x4?", ["La T-44", "La T-41", "La T-31"], "Tema 12, ficha BNP."],
        ["media", "¿Qué BNP tiene presión combinada además de la T-50?", ["La T-31", "La T-41", "La T-44"], "T-41 y T-44 son de baja presión."],
        ["dificil", "¿Qué BRP lleva AdBlue?", ["La T-42", "La T-37", "La T-38"], "Tema 12, ficha BRP."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["¿Qué lleva la trasera de bomba de una BUL tipo (T-51)?", "Carrete de primer socorro, llaves de racorar, mando del foco mástil y manguera corta de 25 mm con bifurcación"],
        ["¿Dónde lleva la BUL T-51 la saca de incendio de piso?", "En el armario 4, junto al monitor, botellas de aire, dos equipos ERA, extintores y manguera en plegado americano"],
        ["¿Qué material de cabina lleva la BUL T-51?", "Griferías bibotella, llaves de ascensores y de columna seca, DEA, mando del cabestrante, maletín de línea de aire, cinta de balizar y nipones"],
        ["¿Qué material forestal lleva en el techo la BRP T-37?", "Motosierra, turbobomba, mangotes de aspiración, batefuegos, válvula de pie y herramientas manuales"],
        ["¿Qué lleva en el techo la BNP T-50?", "Bidones de espumógeno, mangotes y escalera corredera"],
      ],
      preguntas: [
        ["facil", "¿Dónde lleva la BUL T-51 el DEA?", ["En la cabina", "En el techo", "En el cofre 6"], "Tema 12, dotación BUL T-51."],
        ["media", "¿En qué armario de la BUL T-51 van la válvula de pie, la llave de hidrante y la trifurcación?", ["Armario 6", "Armario 1", "Armario 3"], "Tema 12, dotación BUL T-51."],
        ["media", "¿Qué vehículo tipo lleva batefuegos en el techo?", ["La BRP T-37", "La BNP T-50", "La BUL T-51"], "Tema 12, dotación BRP T-37."],
        ["media", "¿Qué lleva la BUL T-51 en el cofre 6?", ["Equipos para espuma", "El generador eléctrico", "Las escaleras"], "Tema 12, dotación BUL T-51."],
        ["dificil", "¿Cuántos equipos ERA lleva en cabina la BUP T-32?", ["Cinco", "Dos", "Ninguno"], "Tema 12, dotación BUP T-32."],
      ],
    },
  ],
  glosario: [
    [S1, "BUL", "Bomba Urbana Ligera: autobomba de menor tamaño del Servicio, 4x2 y con cisterna de 1.300 a 2.500 L."],
    [S1, "Presión combinada", "Bomba capaz de trabajar en baja y en alta presión."],
    [S2, "BRM", "Bomba Rural Mixta: autobomba con tracción 4x4 (T-47) que combina uso urbano y rural."],
    [S3, "BNP", "Bomba Nodriza Pesada: vehículo de gran cisterna (7.500 a 14.500 L) para abastecer de agua a otros vehículos."],
    [S3, "Bloqueo de diferencial", "Dispositivo que impide que las ruedas de un eje giren a distinta velocidad, para mejorar la tracción en terreno difícil."],
    [S4, "Carrete de primer socorro", "Manguera semirrígida enrollada en la trasera de la bomba, lista para un ataque rápido."],
  ],
  casos: [
    {
      slug: "caso-eleccion-vehiculo-incendio-forestal",
      titulo: "Elegir vehículo para un incendio de vegetación",
      supuesto: "Se recibe un aviso de incendio de vegetación en una zona de caminos de tierra del término municipal, lejos de hidrantes. El jefe de turno debe decidir qué vehículos enviar.",
      preguntas: [
        [S3, "facil", "¿Qué tipo de bomba es más adecuado por su tracción para caminos de tierra?", ["Una Bomba Rural Pesada (BRP), 4x4", "Una BUL 4x2", "Una autoescala"], "Tema 12."],
        [S3, "media", "¿Qué capacidad de cisterna llevará cada BRP?", ["3.500 L", "1.300 L", "14.500 L"], "Tema 12."],
        [S3, "media", "¿Qué bloqueos tienen las BRP para terreno difícil?", ["Longitudinal y transversal", "Ninguno", "Solo diferencial"], "Tema 12."],
        [S4, "media", "¿Qué herramienta específica de incendios de vegetación lleva la BRP T-37 en el techo?", ["Batefuegos", "Escalera corredera", "Ventilador"], "Tema 12."],
        [S3, "media", "Para abastecer de agua a las BRP lejos de hidrantes, ¿qué vehículo se enviaría?", ["Una Bomba Nodriza Pesada (BNP)", "Una BUL", "Una autoescala"], "Tema 12."],
        [S3, "media", "¿Qué BNP lleva la mayor cantidad de agua?", ["La T-50, con 14.500 L", "La T-31", "La T-41"], "Tema 12."],
        [S3, "dificil", "¿Qué BNP lleva también espuma?", ["La T-31, con 500 L", "La T-50", "La T-44"], "Tema 12."],
        [S2, "media", "Si se necesitara un vehículo mixto 4x4 con monitor y equipo de rescate, ¿cuál?", ["La BRM T-47", "La BUP T-43", "La BUL T-29"], "Tema 12."],
        [S4, "media", "¿Qué equipo para trasvasar o aspirar agua lleva la BRP T-37 en el techo?", ["Turbobomba y mangotes de aspiración", "Cojines neumáticos", "Pértiga eléctrica"], "Tema 12."],
        [S3, "media", "¿Qué caja de cambios llevan las BRP?", ["Telligent", "Manual ZF", "Allison"], "Tema 12."],
      ],
    },
    {
      slug: "caso-incendio-casco-urbano-bul",
      titulo: "Incendio en una calle estrecha del casco urbano",
      supuesto: "Un incendio en un piso de una calle estrecha obliga a salir con una Bomba Urbana Ligera. El conductor repasa con la dotación dónde va cada material de la BUL T-51.",
      preguntas: [
        [S1, "facil", "¿Por qué se elige una BUL para una calle estrecha?", ["Por ser la autobomba de menor tamaño del Servicio", "Por tener la mayor cisterna", "Por ser 4x4"], "Tema 12."],
        [S1, "media", "¿Cuánta agua lleva la BUL T-51?", ["2.500 L", "1.300 L", "3.500 L"], "Tema 12."],
        [S1, "media", "¿Qué tipo de cebado tiene la T-51?", ["Automático", "Manual", "No tiene"], "Tema 12."],
        [S4, "facil", "¿Dónde está la saca de incendio de piso?", ["En el armario 4", "En el techo", "En la cabina"], "Tema 12."],
        [S4, "media", "¿Qué lleva el armario 2 para la intervención en interiores?", ["Cortina antihumo, escalera telescópica, abrepuertas y herramientas manuales", "Mangotes de aspiración", "Bidones de espumógeno"], "Tema 12."],
        [S4, "media", "¿Dónde lleva el ventilador?", ["En el cofre 1", "En el armario 6", "En el techo"], "Tema 12."],
        [S4, "media", "¿Qué hay en la trasera de bomba para un ataque rápido?", ["El carrete de primer socorro", "La escalera corredera", "El generador"], "Tema 12."],
        [S4, "media", "¿Dónde están las llaves de ascensor y de columna seca?", ["En la cabina", "En el cofre 2", "En el armario 5"], "Tema 12."],
        [S4, "media", "¿Cuántos equipos ERA llevan entre los armarios 3 y 4 de la T-51?", ["Cinco (3 + 2)", "Dos", "Ocho"], "Tema 12."],
        [S1, "dificil", "¿Qué marca de bomba lleva la T-51?", ["Magirus", "Godiva", "Rosenbauer"], "Tema 12."],
      ],
    },
    {
      slug: "caso-incendio-nave-industrial-bup-bnp",
      titulo: "Incendio en una nave industrial",
      supuesto: "Un incendio en una nave de un polígono requiere varias autobombas pesadas, espuma y aporte continuo de agua.",
      preguntas: [
        [S2, "facil", "¿Qué cisterna tienen las BUP que acuden?", ["3.000 L", "1.300 L", "8.000 L"], "Tema 12."],
        [S2, "media", "¿Qué BUP pueden aportar espuma propia?", ["La T-32 y la T-33, con 200 L", "La T-43 y la T-45", "Ninguna"], "Tema 12."],
        [S2, "media", "¿Qué BUP llevan monitor?", ["La T-32 y la T-33", "La T-43 y la T-45", "Todas"], "Tema 12."],
        [S3, "media", "Para garantizar agua continua, ¿qué vehículo se pide?", ["Una BNP", "Una BUL", "Una autoescala"], "Tema 12."],
        [S3, "media", "¿Qué BNP tiene 8.000 L y baja presión?", ["La T-41", "La T-50", "La T-31"], "Tema 12."],
        [S4, "media", "¿Qué lleva la BNP T-50 en el techo útil para este incendio?", ["Bidones de espumógeno", "Batefuegos", "Camilla nido"], "Tema 12."],
        [S2, "media", "¿Qué BPM lleva 150 L + 150 L de espuma?", ["La T-48", "La T-34", "La T-46"], "Tema 12."],
        [S2, "media", "¿Qué tienen en común todas las BPM y la BRM?", ["Monitor, equipo de rescate y foco de iluminación", "Tracción 4x4", "Cisterna de 14.500 L"], "Tema 12."],
        [S3, "dificil", "¿Qué tracción tiene la BNP T-50?", ["8x4", "6x4", "4x2"], "Tema 12."],
        [S2, "media", "¿Qué caja de cambios llevan las BUP T-43 y T-45?", ["Automática Allison", "Manual", "Telligent"], "Tema 12."],
      ],
    },
  ],
});
