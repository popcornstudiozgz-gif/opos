/**
 * Crea tema-309 — Tema 14 de Bombero/a Conductor/a: "Principios de la lucha
 * contra incendios. Conceptos básicos del fuego. Procesos químicos de la
 * combustión. Procesos físicos de la combustión. Clasificación de los
 * materiales combustibles. Productos de la combustión. Inflamabilidad de los
 * gases de incendio. Extinción de incendios. Mecanismos de extinción."
 *
 * Fuente: la bibliografía oficial de la Escuela de Bomberos de Zaragoza
 * ("Bibliografía externa recomendada temario BNI") remite este tema al
 * "Manual básico IVASPE para bomberos de nuevo ingreso", versión noviembre
 * 2017 (Agencia Valenciana de Seguridad y Respuesta a las Emergencias).
 * Descargado de la web pública del Ayuntamiento de València (Bomberos,
 * documentación de procedimientos operativos) y leído íntegro el Módulo 1,
 * Tema 1 "Principios de la lucha contra incendios" (págs. 9-56 del PDF).
 * Conocimiento técnico sin norma legal: se ciñe al manual.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-309-principios-lucha-contra-incendios.mjs
 */
import { sembrarTema, BOMBERO } from "./lib/sembrar-tema.mjs";

const IVASPE = "https://www.valencia.es/documents/d/guest/manual-20bomberos-pdf";
const BIBLIO = BOMBERO.escuela("Bibliografia_externa_recomendada_temario_BNI.pdf");
const S1 = "quimica-combustion";
const S2 = "procesos-fisicos-calor";
const S3 = "productos-combustion";
const S4 = "inflamabilidad-gases";
const S5 = "mecanismos-extincion-clases-fuego";

await sembrarTema({
  tema: {
    slug: "tema-309",
    titulo: "Principios de la lucha contra incendios: combustión, inflamabilidad y extinción",
    descripcion: "Conceptos básicos del fuego, condiciones y velocidad de la combustión, pirólisis; estados de la materia, cambios de estado y transmisión del calor; gases y toxicidad (CO, HCN), llamas de difusión y premezcladas; límites y rango de inflamabilidad, fuentes de ignición; mecanismos de extinción, clases de fuego A, B, C, D y F y agentes extintores.",
    contenido: "Sigue el Manual básico IVASPE (Módulo 1, Tema 1), que la Escuela de Bomberos de Zaragoza recomienda para este tema: qué hace falta para que algo arda, por qué los sólidos y líquidos arden en forma de gas, cómo se transmite el calor, qué gases tóxicos produce un incendio, entre qué concentraciones arde un gas y cómo se apaga un fuego según su clase.",
    enlaces_boe: [
      { url: IVASPE, titulo: "Manual básico IVASPE para bomberos de nuevo ingreso (nov. 2017) — Módulo 1, Tema 1" },
      { url: BIBLIO, titulo: "Escuela de Bomberos de Zaragoza — Bibliografía externa recomendada (remite el Tema 14 al Manual IVASPE)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "Conceptos básicos del fuego y procesos químicos de la combustión", articulos: "IVASPE M1-T1, apartados 1 y 2", url: IVASPE },
      { seccion: S2, titulo: "Procesos físicos: estados de la materia, energía y transmisión del calor", articulos: "IVASPE M1-T1, apartado 3", url: IVASPE },
      { seccion: S3, titulo: "Productos de la combustión: gases, toxicidad, agentes pasivos y llamas", articulos: "IVASPE M1-T1, apartado 4", url: IVASPE },
      { seccion: S4, titulo: "Inflamabilidad de los gases de incendio", articulos: "IVASPE M1-T1, apartado 5", url: IVASPE },
      { seccion: S5, titulo: "Extinción: mecanismos, clases de fuego y agentes extintores", articulos: "IVASPE M1-T1, apartado 6", url: IVASPE },
    ],
  },
  vinculo: { oposicion: BOMBERO.oposicion, bloqueId: BOMBERO.bloqueParteII, numero: 14 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["¿Cómo define la norma ISO la combustión?", "Reacción exotérmica de una sustancia con un agente oxidante"],
        ["¿Qué tres condiciones básicas necesita la combustión?", "Suficiente material combustible, suficiente oxígeno disponible y temperatura suficientemente alta"],
        ["¿Qué composición tiene el aire según el manual?", "21 % de oxígeno y 79 % de nitrógeno, con trazas de CO2 y gases nobles"],
        ["¿Qué es el índice de oxígeno?", "La mínima concentración de oxígeno, en una mezcla con nitrógeno, que mantiene una combustión con llama en condiciones de ensayo"],
        ["¿Qué tres tipos de combustión hay según su velocidad?", "Sin llama (latente), con llama y rápida (explosión)"],
        ["Diferencia entre deflagración y detonación", "Deflagración: velocidad de reacción de 1 m/s a la del sonido; detonación: superior a la del sonido, con llama a 1.500-2.000 m/s"],
        ["¿Qué es la pirólisis y a qué temperatura suele empezar?", "La descomposición química por el calor de un material en gases más simples; suele comenzar entre 100 y 250 °C"],
        ["¿A qué temperatura arde la superficie de un sólido con llama piloto y sin ella?", "Unos 300-400 °C con llama piloto; 500-600 °C sin ella (caso de la madera)"],
      ],
      preguntas: [
        ["facil", "¿Qué tipo de reacción es la combustión?", ["Exotérmica de oxidación", "Endotérmica", "Nuclear"], "IVASPE M1-T1."],
        ["media", "¿En qué materiales se da la combustión sin llama?", ["Solo en sólidos, sobre todo porosos", "Solo en gases", "Solo en líquidos"], "IVASPE M1-T1."],
        ["media", "¿Qué humo produce típicamente la combustión latente de un sofá de poliuretano?", ["Humo tóxico blanco y amarillo", "Humo negro denso", "No produce humo"], "IVASPE M1-T1."],
        ["media", "¿Qué tipo de sustancias no necesitan el oxígeno del aire para arder?", ["Las que lo contienen en su estructura, como los explosivos", "El agua", "Los metales nobles"], "IVASPE M1-T1."],
        ["dificil", "¿Qué velocidad de llama alcanza una detonación?", ["Del orden de 1.500 a 2.000 m/s", "1 m/s", "10 m/s"], "IVASPE M1-T1."],
        ["media", "¿Qué fase de un combustible arde en realidad en la combustión con llama?", ["La gaseosa", "La sólida", "La líquida"], "Sólidos y líquidos deben pasar a gas para arder."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["¿Qué ocurre con la temperatura durante la fusión o la ebullición?", "Permanece constante hasta que todo el material cambia de estado, porque la energía se usa en el cambio"],
        ["¿Qué es la sublimación?", "El paso directo de sólido a gas sin fase líquida"],
        ["¿Qué es la tasa de calor liberado?", "La energía desprendida por unidad de tiempo (J/s o W); sirve para medir el tamaño de un incendio y varía a lo largo de él"],
        ["Ejemplos de tasa máxima de calor liberado", "Papelera 100 kW; charco de gasolina de 1 m² 2,5 MW; sofá 1-3 MW; palés de 3 m de altura 7 MW"],
        ["¿Cuáles son los tres mecanismos de transmisión de calor?", "Conducción (contacto directo), convección (a través de un fluido en movimiento) y radiación (ondas electromagnéticas)"],
        ["¿Qué estado de la materia necesita más energía para activarse?", "El sólido, después el líquido y por último el gas"],
      ],
      preguntas: [
        ["facil", "¿Cómo se transmite el calor por contacto directo entre cuerpos?", ["Conducción", "Convección", "Radiación"], "IVASPE M1-T1."],
        ["media", "¿Qué mecanismo transmite el calor sin necesidad de medio?", ["Radiación", "Conducción", "Convección"], "Viaja como onda electromagnética."],
        ["media", "¿En qué unidad se expresa la tasa de calor liberado?", ["Vatios (J/s)", "Litros", "Pascales"], "IVASPE M1-T1."],
        ["media", "¿Cuál es la tasa máxima aproximada de un charco de gasolina de 1 m²?", ["2,5 MW", "100 kW", "70 MW"], "IVASPE M1-T1."],
        ["dificil", "En la combustión del metano, ¿cuánta energía se libera frente a la de activación por gramo?", ["11.875 calorías frente a unas 750", "Lo mismo", "750 frente a 11.875"], "IVASPE M1-T1."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["¿De qué factores dependen los productos de la combustión?", "Del tipo de combustión, de la disponibilidad de aire y de la adición de retardantes químicos"],
        ["¿Qué significa que un incendio esté infraventilado?", "Que el aire es insuficiente (rico en combustible): aumentan el CO, el hollín y los hidrocarburos"],
        ["¿Qué características tiene el monóxido de carbono (CO)?", "Incoloro, inodoro, inflamable con amplio rango y principal causante de víctimas en incendios"],
        ["¿De qué materiales procede el ácido cianhídrico (HCN)?", "De la combustión incompleta de lana, seda, nylon y poliuretano; incoloro y muy letal"],
        ["¿De dónde procede el ácido clorhídrico (HCl) en un incendio?", "De la pirólisis de aislantes como el PVC de los cables y de materiales con retardantes"],
        ["¿Qué son los agentes pasivos?", "Productos presentes que no participan químicamente (CO2, vapor de agua, hollín, nitrógeno) pero influyen en la parte física"],
        ["Diferencia entre llama de difusión y premezclada", "Difusión: combustible y aire se encuentran sin mezclarse antes (vela, amarilla). Premezclada: ya mezclados dentro del rango de inflamabilidad antes de la ignición (Bunsen)"],
      ],
      preguntas: [
        ["facil", "¿Qué gas es el principal causante de las muertes en incendios?", ["Monóxido de carbono", "Nitrógeno", "Oxígeno"], "IVASPE M1-T1."],
        ["media", "¿Qué concentración de CO provoca inconsciencia inmediata y peligro de muerte en 1-3 minutos?", ["12.800 ppm (1,28 %)", "100 ppm", "400 ppm"], "Tabla del IVASPE."],
        ["media", "¿Por qué algunas llamas son azules?", ["Por su combustión de rendimiento muy alto y poco hollín", "Por falta de oxígeno", "Por el nitrógeno"], "IVASPE M1-T1."],
        ["media", "¿Qué tipo de llamas se ven casi siempre cuando arde el cojín de gases?", ["De difusión", "Premezcladas", "Ninguna"], "IVASPE M1-T1."],
        ["dificil", "¿Cuándo se genera HCN o gases halógenos?", ["Solo si el combustible contiene nitrógeno o halógenos", "Siempre", "Nunca"], "IVASPE M1-T1."],
        ["media", "¿Qué gas es de color normalmente marrón e irrita gravemente los pulmones?", ["Dióxido de nitrógeno", "Monóxido de carbono", "Amoniaco"], "IVASPE M1-T1."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Diferencia entre temperatura de ignición y de autoignición", "Ignición: mínima temperatura a la que los vapores arden con llama presente; autoignición: la mínima para que la mezcla arda sin fuente de ignición"],
        ["¿Qué son el LII y el LSI?", "Límite inferior y superior de inflamabilidad: mínima y máxima concentración de gas en aire que permite la combustión"],
        ["¿Qué es el rango de inflamabilidad?", "La zona de concentraciones entre el LII y el LSI"],
        ["¿Qué es la mezcla ideal o estequiométrica?", "La concentración en que la reacción es completa: mayor intensidad, menor energía de ignición y mayor velocidad de combustión"],
        ["¿Cómo afecta la temperatura al rango de inflamabilidad?", "Lo amplía: unos 100 °C más reducen el LII y aumentan el LSI en torno a un 8 %"],
        ["¿Qué tres tipos de fuentes de ignición distingue el manual?", "Abiertas (siempre activas en contacto con el gas: ignición en el LII), ocultas e intermitentes"],
        ["Límites de inflamabilidad del metano y del butano", "Metano 5 % - 15 %; butano 1,8 % - 9 %"],
      ],
      preguntas: [
        ["facil", "¿Qué ocurre por debajo del LII?", ["La mezcla es demasiado pobre para arder", "Arde mejor", "Explota siempre"], "IVASPE M1-T1."],
        ["media", "¿Qué gas de la tabla del manual tiene el rango de inflamabilidad más amplio?", ["Acetileno (2 % - 80 %)", "Gasolina", "Benceno"], "IVASPE M1-T1."],
        ["media", "¿Dónde se necesita la mínima energía de ignición?", ["En la mezcla estequiométrica", "En el LII", "En el LSI"], "IVASPE M1-T1."],
        ["media", "Con una fuente de ignición abierta, ¿en qué punto se produce la ignición?", ["En el LII", "En el LSI", "En la mezcla ideal"], "IVASPE M1-T1."],
        ["dificil", "¿Qué temperatura deben alcanzar los gases para que la combustión se mantenga?", ["Unos 1.500-1.600 K", "100 K", "300 K"], "IVASPE M1-T1."],
        ["media", "¿Qué ejemplo de fuente intermitente da el manual?", ["El arranque de una nevera o un timbre", "El foco del incendio", "Un quemador en su hornacina"], "IVASPE M1-T1."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["¿Qué añade el tetraedro del fuego al triángulo?", "La reacción en cadena, junto a combustible, comburente y energía de activación"],
        ["¿Cuáles son los cuatro mecanismos de extinción?", "Enfriamiento (el principal), sofocación, eliminación del combustible e inhibición química"],
        ["Clases de fuego", "A: sólidos ordinarios; B: líquidos; C: gases; D: metales; F: aceites y grasas de cocina (la antigua clase E eléctrica desapareció)"],
        ["¿Cuánto se expande el agua al vaporizarse?", "1:1.700 a 100 °C y unas 1:3.500 a 450 °C; puede absorber hasta el 80 % de la energía de un incendio"],
        ["¿Qué tres tipos de espuma hay y qué expansión tienen?", "Baja (unas 7 veces, alcance ~10 m), media (unas 70) y alta (unas 700, sin alcance)"],
        ["¿Qué tasa de aplicación de espuma recoge NFPA 11 para charcos?", "4 l/m²·min durante 15 minutos"],
        ["¿Cómo extingue el polvo seco?", "Por enfriamiento de las llamas e inhibición química; no conduce la electricidad"],
        ["Riesgos del CO2 como agente", "Asfixia por encima del 4 % en volumen, se acumula en zonas bajas (densidad 1,5), apenas tiene alcance y se disipa rápido"],
      ],
      preguntas: [
        ["facil", "¿Cuál es el principal mecanismo de extinción?", ["Enfriamiento", "Inhibición", "Eliminación"], "IVASPE M1-T1."],
        ["media", "Cerrar la válvula de una fuga de gas incendiada es un ejemplo de…", ["Eliminación del combustible", "Sofocación", "Enfriamiento"], "IVASPE M1-T1."],
        ["media", "¿A qué clase pertenece el fuego de una freidora?", ["F", "A", "D"], "IVASPE M1-T1."],
        ["media", "¿Qué agente se asocia con la inhibición química?", ["Los halones", "El agua", "La arena"], "IVASPE M1-T1."],
        ["media", "¿Qué inconveniente tiene el agua frente a líquidos inflamables?", ["Puede propagar los fuegos de clase B", "Es tóxica", "Es cara"], "IVASPE M1-T1."],
        ["dificil", "¿Qué concentración de CO2 requieren los sistemas de inundación total?", ["Generalmente más del 35 %", "Un 4 %", "Un 1 %"], "IVASPE M1-T1."],
        ["dificil", "¿Qué concentración de espumógeno es habitual?", ["Entre el 1 y el 6 % en volumen", "El 50 %", "El 100 %"], "IVASPE M1-T1."],
      ],
    },
  ],
  glosario: [
    [S1, "Pirólisis", "Descomposición química de un material por el calor en sustancias más simples, que generan gases inflamables."],
    [S1, "Combustión latente", "Combustión sin llama, lenta, propia de sólidos porosos."],
    [S2, "Tasa de calor liberado", "Energía desprendida por unidad de tiempo en un incendio, medida en vatios."],
    [S3, "Cojín de gases de incendio", "Capa de gases calientes y de pirólisis que se acumula bajo el techo de un recinto incendiado."],
    [S3, "Agente pasivo", "Producto presente en el incendio que no participa en la reacción química pero influye en su parte física."],
    [S4, "Rango de inflamabilidad", "Intervalo de concentraciones de gas en aire entre el LII y el LSI en que la mezcla puede arder."],
    [S4, "Mezcla estequiométrica", "Proporción de combustible y aire que produce una combustión completa."],
    [S5, "Inhibición química", "Interrupción de la reacción en cadena capturando los radicales libres."],
  ],
  casos: [
    {
      slug: "caso-sofa-combustion-latente",
      titulo: "Un sofá que arde sin llama",
      supuesto: "Una dotación acude a una vivienda llena de humo blanco amarillento. Un sofá de poliuretano arde sin llamas visibles y la habitación está cerrada.",
      preguntas: [
        [S1, "facil", "¿Qué tipo de combustión es?", ["Sin llama o latente", "Detonación", "Con llama premezclada"], "IVASPE M1-T1."],
        [S3, "media", "¿Qué gas es el más peligroso para los ocupantes?", ["Monóxido de carbono", "Nitrógeno", "Oxígeno"], "IVASPE M1-T1."],
        [S3, "media", "¿Qué otro gas letal libera el poliuretano?", ["Ácido cianhídrico (HCN)", "Helio", "Argón"], "IVASPE M1-T1."],
        [S3, "media", "¿En qué condición de ventilación aumentan CO y hollín?", ["Infraventilada", "Sobreventilada", "Estequiométrica"], "IVASPE M1-T1."],
        [S1, "media", "¿Qué podría ocurrir si se aporta oxígeno bruscamente?", ["Que se desarrollen llamas", "Que se apague solo", "Nada"], "IVASPE M1-T1."],
        [S4, "media", "¿Qué efecto tiene el aumento de temperatura sobre los gases acumulados?", ["Amplía su rango de inflamabilidad", "Lo reduce", "Ninguno"], "IVASPE M1-T1."],
        [S5, "media", "¿A qué clase de fuego pertenece el sofá?", ["A", "B", "D"], "IVASPE M1-T1."],
        [S5, "media", "¿Qué agente es más adecuado?", ["Agua", "CO2 solo", "Polvo para metales"], "El agua es efectiva en fuegos de clase A."],
        [S5, "dificil", "¿Por qué el CO2 no es buen agente para este caso?", ["No es bueno para fuegos en el interior de materiales", "Es inflamable", "Conduce la electricidad"], "IVASPE M1-T1."],
        [S2, "media", "¿Qué tasa máxima de calor puede alcanzar un sofá en llamas?", ["1-3 MW", "100 kW", "70 MW"], "IVASPE M1-T1."],
      ],
    },
    {
      slug: "caso-fuga-butano-local",
      titulo: "Fuga de butano en un local",
      supuesto: "Huele a gas en un local comercial en planta baja. Hay una bombona de butano con una fuga y una nevera conectada.",
      preguntas: [
        [S2, "facil", "¿Dónde se acumula el butano?", ["A ras del suelo, por ser más pesado que el aire", "En el techo", "Se dispersa por igual"], "IVASPE M1-T1."],
        [S4, "media", "¿Cuál es el rango de inflamabilidad del butano?", ["1,8 % - 9 %", "5 % - 15 %", "2 % - 80 %"], "IVASPE M1-T1."],
        [S4, "media", "¿Qué tipo de fuente de ignición es la nevera?", ["Intermitente", "Abierta", "Inexistente"], "IVASPE M1-T1."],
        [S4, "media", "¿Qué puede bastar para inflamar la mezcla?", ["La chispa de un interruptor de luz", "Nada, el butano no arde", "Solo una llama grande"], "IVASPE M1-T1."],
        [S5, "media", "¿Qué mecanismo se aplica al cerrar la válvula?", ["Eliminación del combustible", "Enfriamiento", "Inhibición"], "IVASPE M1-T1."],
        [S5, "media", "¿A qué clase de fuego corresponde un incendio de gas?", ["C", "A", "F"], "IVASPE M1-T1."],
        [S1, "media", "Si la mezcla se inflama, ¿qué tipo de combustión rápida se produce normalmente?", ["Deflagración", "Combustión latente", "Sublimación"], "IVASPE M1-T1."],
        [S3, "media", "¿Qué tipo de llama produciría la ignición de esa mezcla ya hecha?", ["Premezclada", "De difusión laminar", "Ninguna"], "IVASPE M1-T1."],
        [S4, "dificil", "¿Dónde es mayor la velocidad de combustión?", ["Cerca de la mezcla estequiométrica", "En el LII", "En el LSI"], "IVASPE M1-T1."],
        [S5, "media", "¿Qué agente es muy efectivo en fuegos de clase B y C?", ["Polvo químico seco", "Agua a chorro", "Arena mojada"], "IVASPE M1-T1."],
      ],
    },
    {
      slug: "caso-sala-servidores-co2",
      titulo: "Sala de servidores con extinción por CO2",
      supuesto: "En un edificio de oficinas se ha disparado el sistema automático de CO2 de la sala de servidores. Un técnico no ha salido.",
      preguntas: [
        [S5, "facil", "¿Cómo extingue principalmente el CO2?", ["Diluyendo el oxígeno (sofocación)", "Por inhibición", "Mojando"], "IVASPE M1-T1."],
        [S5, "media", "¿Qué riesgo corre el técnico?", ["Asfixia, por encima del 4 % de CO2", "Quemaduras por frío únicamente", "Ninguno"], "IVASPE M1-T1."],
        [S5, "media", "¿Qué precaución tomar al entrar?", ["Asumir que el aire ha sido desplazado y usar protección respiratoria", "Entrar sin más", "Encender un mechero"], "IVASPE M1-T1."],
        [S5, "media", "¿Dónde se acumula el CO2?", ["En pozos y zonas bajas", "En el techo", "En ningún sitio"], "Densidad de vapor 1,5."],
        [S5, "media", "¿Por qué se usa CO2 en equipos electrónicos?", ["No deja residuos ni conduce la electricidad", "Es barato", "Moja poco"], "IVASPE M1-T1."],
        [S5, "media", "¿Qué inconveniente puede tener sobre componentes electrónicos?", ["Efecto refrigerante o de congelación", "Los oxida", "Los mancha"], "IVASPE M1-T1."],
        [S5, "dificil", "¿Qué tratado limita la producción de halones?", ["El Protocolo de Montreal", "El de Kioto", "El ADR"], "IVASPE M1-T1."],
        [S3, "media", "¿Qué gas tóxico puede liberar la pirólisis del aislante de los cables de PVC?", ["Ácido clorhídrico", "Ozono", "Helio"], "IVASPE M1-T1."],
        [S1, "media", "¿Qué porcentaje normal de oxígeno tiene el aire?", ["21 %", "79 %", "4 %"], "IVASPE M1-T1."],
        [S5, "media", "¿Qué otros agentes gaseosos menciona el manual como sustitutos?", ["Mezclas de argón y nitrógeno (y CO2)", "Vapor de gasolina", "Hidrógeno"], "IVASPE M1-T1."],
      ],
    },
  ],
});
