/**
 * Crea tema-308 — Tema 13 de Bombero/a Conductor/a: "Características
 * básicas de los vehículos del SCIS: AEA, ABA y FSV."
 *
 * Fuente: Tema 13 de la Escuela de Bomberos del Ayuntamiento de Zaragoza
 * (fichas de las autoescaleras automáticas E-7, E-9, E-10, E-11, E-12,
 * E-14 y E-15; autobrazos articulados B30 E-8 y B42 E-13; dotación de la
 * AEA E-14 y del FSV S-9). Tablas leídas con `pdftotext -table` porque la
 * extracción normal las desordena. Tema marcado con ** en las bases: es
 * documentación interna del Cuerpo, publicada por la Escuela.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-308-vehiculos-scis-altura-salvamento.mjs
 */
import { sembrarTema, BOMBERO } from "./lib/sembrar-tema.mjs";

const FUENTE = BOMBERO.escuela("Tema_13-_Caracteristias_basicas_de_los_vehiculos_del_SCIS1.pdf");
const S1 = "autoescaleras-aea";
const S2 = "autobrazos-articulados-aba";
const S3 = "vehiculo-salvamentos-varios-fsv";

await sembrarTema({
  tema: {
    slug: "tema-308",
    titulo: "Vehículos del SCIS (II): autoescaleras, brazos articulados y vehículo de salvamentos varios",
    descripcion: "Fichas técnicas de las autoescaleras automáticas (AEA) E-7 a E-15 y de los autobrazos articulados (ABA) B30 y B42: altura, tramos, elevación, cargas de escalera, cesta y grúa, anchura de gatos y alcances; dotación de la AEA E-14 y del vehículo de salvamentos varios (FSV) S-9.",
    contenido: "Recoge los vehículos de trabajo en altura y de rescate del Servicio contra Incendios de Zaragoza: de 18 a 50 metros de escalera, cargas máximas, ángulos de trabajo y alcance por número de personas en cesta, la capacidad de los brazos articulados con monitor, y el material de rescate, eléctrico y de estabilización que lleva el FSV para accidentes y salvamentos.",
    enlaces_boe: [{ url: FUENTE, titulo: "Escuela de Bomberos de Zaragoza — Tema 13: Características básicas de los vehículos del SCIS (AEA, ABA y FSV)" }],
    indice_estudio: [
      { seccion: S1, titulo: "Autoescaleras automáticas (AEA)", articulos: "Tema 13, fichas E-7 a E-15", url: FUENTE },
      { seccion: S2, titulo: "Autobrazos articulados (ABA)", articulos: "Tema 13, fichas B30 E-8 y B42 E-13", url: FUENTE },
      { seccion: S3, titulo: "Vehículo de salvamentos varios (FSV) y dotación de la AEA", articulos: "Tema 13, dotaciones FSV S-9 y AEA E-14", url: FUENTE },
    ],
  },
  vinculo: { oposicion: BOMBERO.oposicion, bloqueId: BOMBERO.bloqueParteII, numero: 13 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["¿Qué alturas de escalera tienen las AEA del Servicio?", "E-7: 50 m; E-9 y E-10: 30 m; E-11 y E-14: 37 m; E-15: 25 m; E-12: 18 m"],
        ["¿Qué autoescala es la más alta y qué tracción tiene?", "La E-7, de 50 m, con transmisión 6x4, 6 tramos y bloqueo longitudinal y transversal"],
        ["¿Qué ángulo máximo de elevación tienen las autoescalas?", "75º, salvo la E-7 que llega a 72º"],
        ["¿Qué carga admite la cesta de la E-15?", "400 kg, la mayor de las autoescalas, igual que su escalera"],
        ["¿Qué alcance tiene la E-15 con una persona en cesta?", "23,50 m (21,50 m con dos y 19,50 m con tres)"],
        ["¿Qué autoescalas no pueden apoyar los pies (gatos) por un solo lado?", "La E-7 y la E-12; el resto sí"],
      ],
      preguntas: [
        ["facil", "¿Qué altura de escalera tiene la autoescala E-7?", ["50 metros", "37 metros", "30 metros"], "Tema 13, ficha AEA."],
        ["media", "¿Qué autoescala es la más corta del Servicio?", ["La E-12, de 18 m", "La E-15, de 25 m", "La E-9, de 30 m"], "Tema 13, ficha AEA."],
        ["media", "¿Cuántas personas en servicio de puente admiten la E-11, E-14 y E-15?", ["12", "8", "4"], "Tema 13, ficha AEA."],
        ["media", "¿Qué anchura de gatos tiene la E-10?", ["5,20 m", "2,2 m", "4,42 m"], "Tema 13, ficha AEA."],
        ["dificil", "¿Cuál es el ángulo de descenso máximo de la E-12?", ["-18º", "-10º", "-12º"], "Tema 13, ficha AEA."],
        ["media", "¿Qué inclinación máxima del terreno admite la E-9?", ["7º", "10º", "3º"], "Tema 13, ficha AEA."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["¿Qué brazos articulados tiene el Servicio?", "El B30 (E-8) y el B42 (E-13), ambos 6x4 con bloqueo longitudinal y transversal"],
        ["¿Qué carga admite la cesta de cada brazo?", "B30: 400 kg (260 kg con monitor); B42: 500 kg (360 kg con monitor)"],
        ["¿Qué caudal da el monitor de cada brazo a 7 bar?", "B30: 2.200 l/min; B42: 5.000 l/min"],
        ["¿Qué inclinación máxima admiten los brazos articulados?", "3º"],
        ["¿Cómo se recoge el brazo en caso de fallo del motor?", "El B30 con batería y el B42 con generador"],
      ],
      preguntas: [
        ["facil", "¿Qué tracción tienen los autobrazos articulados?", ["6x4", "4x2", "8x4"], "Tema 13, ficha ABA."],
        ["media", "¿Qué carga admite la cesta del B42 con monitor?", ["360 kg", "500 kg", "260 kg"], "Tema 13, ficha ABA."],
        ["media", "¿Qué caudal tiene el monitor del B42 a 7 bar?", ["5.000 l/min", "2.200 l/min", "1.000 l/min"], "Tema 13, ficha ABA."],
        ["media", "¿Cuántos tramos telescópicos tiene el B42?", ["4", "2", "6"], "Tema 13, ficha ABA."],
        ["dificil", "¿Con qué se recoge el B30 si falla el motor?", ["Con batería", "Con generador", "Manualmente con manivela"], "Tema 13, ficha ABA."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["¿Qué significa FSV?", "Vehículo de salvamentos varios, dotado de material de rescate, eléctrico y de estabilización"],
        ["¿Qué herramientas de excarcelación lleva el FSV S-9?", "Cizalla y separador Lukas a batería, estampidores Lukas, mini cizalla, cojines neumáticos y estabilizadores"],
        ["¿Qué material para riesgo eléctrico lleva el FSV?", "Pértigas eléctricas telescópicas, cizalla aislante, detectores de corriente, banqueta aislante, pica de toma de tierra, tomas de tierra de catenaria y desconectador de vehículos eléctricos"],
        ["¿Qué material de tracción y elevación lleva el FSV en el armario 6?", "Eslingas, perrillos, sirgas, pía metálica, polea y trácteles con sus sirgas"],
        ["¿Qué lleva en cabina la AEA E-14 para medir el viento?", "Un anemómetro, además de un medidor láser"],
      ],
      preguntas: [
        ["facil", "¿Qué vehículo lleva la cizalla y el separador Lukas para accidentes de tráfico?", ["El FSV", "La BNP", "La autoescala E-12"], "Tema 13, dotación FSV S-9."],
        ["media", "¿Qué elemento del FSV sirve para cortar la alimentación de un coche eléctrico?", ["El desconectador de vehículos eléctricos", "El tráctel", "El estampidor"], "Tema 13, dotación FSV S-9."],
        ["media", "¿En qué armario lleva el FSV el material eléctrico (pértiga, banqueta aislante, detectores)?", ["Armario 4", "Armario 1", "Cofre 5"], "Tema 13, dotación FSV S-9."],
        ["media", "¿Qué lleva el FSV en el techo para accidentes de vehículos pesados?", ["La plataforma de accidentes de camiones", "Un monitor", "Bidones de espumógeno"], "Tema 13, dotación FSV S-9."],
        ["dificil", "¿Qué absorbente lleva el FSV en el cofre 5?", ["Un bidón de sepiolita", "Arena de sílice", "Espumógeno"], "Tema 13, dotación FSV S-9."],
      ],
    },
  ],
  glosario: [
    [S1, "AEA", "Autoescalera automática: vehículo con escalera extensible y cesta para trabajos y rescates en altura."],
    [S1, "Gatos", "Patas estabilizadoras que se despliegan para apoyar el vehículo antes de elevar la escalera o el brazo."],
    [S2, "ABA", "Autobrazo articulado: vehículo con brazo de tramos articulados y telescópicos y cesta, con monitor de agua."],
    [S2, "Monitor", "Lanza de gran caudal montada sobre un soporte o en la cesta, que puede orientarse."],
    [S3, "FSV", "Vehículo de salvamentos varios, con material de excarcelación, estabilización, eléctrico y de tracción."],
    [S3, "Tráctel", "Aparato manual de tracción y elevación por cable (sirga) para arrastrar o levantar cargas."],
  ],
  casos: [
    {
      slug: "caso-rescate-ventana-edificio-alto",
      titulo: "Rescate desde la ventana de un edificio alto",
      supuesto: "En un incendio en un edificio de gran altura hay una persona atrapada en una ventana alta y el humo impide la evacuación por la escalera. El jefe de intervención pide un vehículo de altura.",
      preguntas: [
        [S1, "facil", "¿Qué autoescala del Servicio alcanza mayor altura?", ["La E-7, de 50 m", "La E-12", "La E-15"], "Tema 13."],
        [S1, "media", "¿Cuántos tramos tiene la E-7?", ["6", "4", "3"], "Tema 13."],
        [S1, "media", "¿Qué carga máxima admite la cesta de la E-7?", ["180 kg", "400 kg", "270 kg"], "Tema 13."],
        [S1, "media", "¿Qué ángulo máximo de elevación tiene la E-7?", ["72º", "75º", "80º"], "Tema 13."],
        [S1, "media", "¿Qué alcance tiene la E-7 con una persona en cesta?", ["15 m", "23,50 m", "10 m"], "Tema 13."],
        [S1, "dificil", "¿Puede la E-7 trabajar con los gatos apoyados por un solo lado?", ["No", "Sí", "Solo con viento"], "Tema 13."],
        [S2, "media", "Si se necesita atacar el fuego desde arriba con gran caudal, ¿qué vehículo aporta un monitor de 5.000 l/min?", ["El brazo B42 (E-13)", "La E-12", "El FSV"], "Tema 13."],
        [S2, "media", "¿Qué carga admite la cesta del B42 sin monitor?", ["500 kg", "260 kg", "180 kg"], "Tema 13."],
        [S3, "media", "¿Qué instrumento de la AEA E-14 ayuda a valorar el viento antes de elevar?", ["El anemómetro", "El detector de corriente", "La pértiga"], "Tema 13."],
        [S1, "media", "¿Qué carga de camilla admiten las autoescalas E-7 a E-14?", ["150 kg", "400 kg", "50 kg"], "Tema 13."],
      ],
    },
    {
      slug: "caso-accidente-camion-catenaria",
      titulo: "Accidente de un camión junto a una catenaria",
      supuesto: "Un camión ha volcado junto a una línea de catenaria del tranvía y su conductor está atrapado en la cabina. Se moviliza el vehículo de salvamentos varios.",
      preguntas: [
        [S3, "facil", "¿Qué vehículo lleva el material de excarcelación?", ["El FSV", "La BRP", "La E-12"], "Tema 13."],
        [S3, "media", "¿Qué material del FSV sirve para asegurar la zona respecto a la catenaria?", ["Pértiga de catenaria y tomas de tierra de catenaria", "Mangotes", "Batefuegos"], "Tema 13."],
        [S3, "media", "¿Qué elementos aislantes lleva el FSV?", ["Cizalla aislante y banqueta aislante", "Cojines neumáticos", "Placas de carga"], "Tema 13."],
        [S3, "media", "¿Qué herramientas a batería usará para abrir la cabina?", ["Cizalla y separador Lukas", "Motosierra", "Turbobomba"], "Tema 13."],
        [S3, "media", "¿Qué usará para estabilizar el camión?", ["Estabilizadores Stab-fast, calzos y cojines neumáticos", "Escaleras", "Conos"], "Tema 13."],
        [S3, "media", "¿Qué plataforma específica lleva el FSV en el techo?", ["La plataforma para accidentes de camiones", "Una cesta", "Un monitor"], "Tema 13."],
        [S3, "media", "¿Qué hay en cabina del FSV para proteger y atender a la víctima?", ["Collarines, mantas térmicas y plástico de protección", "Bidones de espumógeno", "Mangueras"], "Tema 13."],
        [S3, "media", "Si hubiera que arrastrar el camión con cable, ¿qué usaría?", ["Los trácteles con sus sirgas", "La escalera corredera", "El ventilador"], "Tema 13."],
        [S3, "dificil", "¿Qué protege el airbag del volante durante el rescate?", ["El protector de airbag de volante", "La lágrima de protección", "El cubrecantos"], "Tema 13."],
        [S3, "media", "¿Qué absorbente usaría para el gasoil derramado?", ["Sepiolita", "Agua", "Espuma de alta expansión"], "Tema 13."],
      ],
    },
    {
      slug: "caso-eleccion-autoescala-calle-estrecha",
      titulo: "Elegir autoescala para una calle estrecha",
      supuesto: "Hay que evacuar a una persona de un tercer piso en una calle estrecha del Casco Antiguo, donde una autoescala grande no puede desplegar los gatos.",
      preguntas: [
        [S1, "facil", "¿Qué autoescala tiene la menor anchura de gatos?", ["La E-12, con 2,2 m", "La E-10, con 5,20 m", "La E-7, con 4,50 m"], "Tema 13."],
        [S1, "media", "¿Qué altura de escalera tiene la E-12?", ["18 m", "30 m", "50 m"], "Tema 13."],
        [S1, "media", "¿Cuántos tramos tiene la E-12?", ["3", "5", "6"], "Tema 13."],
        [S1, "media", "¿Qué carga admite su cesta?", ["200 kg", "400 kg", "180 kg"], "Tema 13."],
        [S1, "media", "¿Qué carga de camilla admite la E-12?", ["100 kg", "150 kg", "400 kg"], "Tema 13."],
        [S1, "dificil", "¿Qué alcance tiene la E-12 con dos personas en cesta?", ["10 m", "18 m", "15 m"], "Tema 13."],
        [S1, "media", "¿Puede apoyar los gatos por un solo lado?", ["No", "Sí", "Solo de noche"], "Tema 13."],
        [S1, "media", "Si la calle permitiera una escala mayor de 25 m con cesta de 400 kg, ¿cuál?", ["La E-15", "La E-9", "La E-7"], "Tema 13."],
        [S2, "media", "¿Qué inclinación máxima del suelo admiten los brazos articulados?", ["3º", "10º", "7º"], "Tema 13."],
        [S3, "media", "¿Qué camilla plegable lleva la AEA E-14 en el techo?", ["Camilla nido plegable y plataforma", "Camilla de vacío", "Ninguna"], "Tema 13."],
      ],
    },
  ],
});
