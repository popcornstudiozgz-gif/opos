/**
 * Crea tema-321 — Tema 26 de Bombero/a Conductor/a: "Accidentes de
 * tráfico. Recepción del aviso. Aproximación al accidente. Riesgos en la
 * intervención. Procedimiento unificado de rescate en accidentes de tráfico."
 *
 * Fuente: Tema 26 de la Escuela de Bomberos del Ayuntamiento de Zaragoza,
 * en sus dos documentos (Manual "Procedimiento unificado de rescate en
 * accidentes de tráfico", V3, basado en el Manual básico de rescate en
 * accidentes de tráfico de APRAT; y Protocolo del Servicio, V2), leídos
 * íntegros. El art. 5.7 del Reglamento General de Circulación sobre el
 * emplazamiento de vehículos se cita tal como lo transcribe el manual.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-321-accidentes-trafico.mjs
 */
import { sembrarTema, BOMBERO } from "./lib/sembrar-tema.mjs";

const MANUAL = "https://www.zaragoza.es/cont/vistas/portal//bomberos/doc/Tema_26_Accidentes_de_trafico_Parte_1_V3.pdf";
const PROTOCOLO = "https://www.zaragoza.es/cont/vistas/portal//bomberos/doc/Tema_26_Accidentes_de_trafico_Parte_2_V2.pdf";
const S1 = "aviso-tren-ataque-funciones";
const S2 = "emplazamiento-zonificacion-reconocimiento";
const S3 = "control-riesgos-estabilizacion";
const S4 = "excarcelacion-extraccion";
const S5 = "atencion-victima";

await sembrarTema({
  tema: {
    slug: "tema-321",
    titulo: "Accidentes de tráfico: procedimiento unificado de rescate",
    descripcion: "Recepción del aviso y activación del rescate; tren de ataque y funciones (UMC, FSV, UVI); emplazamiento, señalización y zonas; reconocimiento 360º; control de riesgos y estabilización inicial y secundaria; acceso, planes de excarcelación A, B y de emergencia; extracción y técnicas de movilización; valoración primaria y secundaria; medidas contra incendios y derrames.",
    contenido: "Recoge el procedimiento del Servicio contra Incendios de Zaragoza para rescatar a víctimas de accidentes de tráfico: cómo se recibe el aviso, qué vehículos y personas salen y qué hace cada uno —en especial el bombero conductor del FSV y de la UVI móvil—, cómo se colocan los vehículos y se delimitan las zonas, en qué orden se controlan riesgos y se estabiliza, y cómo se planifica la excarcelación y se extrae a la víctima respetando su eje.",
    enlaces_boe: [
      { url: MANUAL, titulo: "Escuela de Bomberos de Zaragoza — Tema 26: Manual de rescate en accidentes de tráfico (V3)" },
      { url: PROTOCOLO, titulo: "Escuela de Bomberos de Zaragoza — Tema 26: Protocolo de accidentes de tráfico (V2)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "Aviso, tren de ataque y funciones", articulos: "Manual: recepción del aviso; Protocolo: tren de ataque y funciones", url: PROTOCOLO },
      { seccion: S2, titulo: "Emplazamiento, señalización, zonas y reconocimiento 360º", articulos: "Manual, fase 1", url: MANUAL },
      { seccion: S3, titulo: "Control de riesgos y estabilización", articulos: "Manual, fase 1 y anexos 1.3, 1.4 y 1.6", url: MANUAL },
      { seccion: S4, titulo: "Planes de excarcelación y extracción", articulos: "Manual, fases 2 y 3 y anexos 3.1 y 3.2", url: MANUAL },
      { seccion: S5, titulo: "Atención a la víctima: valoración primaria y secundaria", articulos: "Manual, anexos 1.5 y 4", url: MANUAL },
    ],
  },
  vinculo: { oposicion: BOMBERO.oposicion, bloqueId: BOMBERO.bloqueParteII, numero: 26 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["¿Qué vehículos forman el tren de ataque general en un accidente de tráfico?", "Una UMC (subjefe de intervención y oficial de conductores), un Furgón de Salvamentos Varios (oficial, bombero conductor y tres bomberos: bombero y binomio) y una UVI móvil (médico, enfermero y dos bomberos TES, uno conductor)"],
        ["¿Cómo se comunican las transmisiones durante el trayecto?", "Las cortas y sencillas por radio, escuchadas por todo el tren de ataque; las más largas, por móvil con el jefe de intervención"],
        ["¿Qué parque se activa?", "El más próximo al siniestro o el que tenga en ese momento los medios adecuados, completando con otros parques si hace falta"],
        ["¿Qué funciones tiene el bombero conductor del FSV?", "Colocar el vehículo con estacionamiento defensivo y herramientas por el lado seguro, establecer medidas contra incendios (tendido SOS, línea de agua o Propak), iluminar, arrancar motores (hidráulico, generador) y atender las necesidades de material"],
        ["¿Qué funciones tiene el oficial de conductores en un accidente?", "Supervisar la colocación de vehículos (con libre salida para la UVI), señalizar, desconectar la batería del vehículo, hacer de nexo con la central y apoyar al conductor del FSV"],
        ["¿Quién es el responsable final de la maniobra de extracción?", "El subjefe de intervención"],
      ],
      preguntas: [
        ["facil", "¿Qué vehículo de rescate forma parte del tren de ataque en accidentes de tráfico?", ["El Furgón de Salvamentos Varios (FSV)", "La autoescala", "La BNP"], "Protocolo de accidentes de tráfico."],
        ["media", "¿Quién desconecta la batería del vehículo accidentado según el protocolo?", ["El oficial de conductores", "El médico", "El bombero conductor de la UVI"], "Protocolo de accidentes de tráfico."],
        ["media", "¿Qué mascarilla incluye el equipamiento básico de los bomberos en el protocolo?", ["FFP3 (FFP2 para la ambulancia)", "Ninguna", "Equipo de respiración autónomo siempre"], "Protocolo de accidentes de tráfico."],
        ["media", "¿Qué medida de seguridad contra incendios establece el bombero conductor del FSV?", ["Tendido SOS, línea de agua o Propak", "Ninguna", "Una BNP"], "Protocolo de accidentes de tráfico."],
        ["dificil", "¿Qué aplicación consultan los mandos para conocer los riesgos del modelo de vehículo?", ["Rescue Code", "Google Maps", "IPSIGE"], "Protocolo de accidentes de tráfico."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["¿Quién designa el emplazamiento de los vehículos de emergencia en carretera según el art. 5.7 del RGC citado en el manual?", "Los Agentes de Tráfico de la Guardia Civil (ATGC); en el Servicio el responsable delegado es el Oficial Conductor"],
        ["¿Qué objetivos tiene el emplazamiento de los vehículos?", "Protegerse del tráfico, respetar las zonas caliente, templada y fría y orientar los vehículos para acceder a herramientas por el lado seguro"],
        ["¿Qué extensión y características tiene la zona caliente?", "Hasta 5 m: área operativa, solo personal con EPI, sin herramientas que no se usen y libre de restos de vehículos"],
        ["¿Qué es la zona templada?", "De 5 a 10 m: vehículos de bomberos y sanitarios, zona limpia, zona sucia y espera del personal de apoyo"],
        ["¿Qué es el reconocimiento 360º y quién lo hace?", "La inspección del accidente a su alrededor respetando la zona caliente, para identificar riesgos, planes, víctimas y acceso; la hacen subjefe y oficial bombero, médico y enfermero y el «bombero ratón»"],
        ["¿Quién señaliza el accidente?", "Los ATGC y demás agentes de la autoridad; en su ausencia, el Oficial Conductor o quien designe"],
      ],
      preguntas: [
        ["facil", "¿Hasta qué distancia se extiende la zona caliente?", ["Hasta 5 m", "Hasta 50 m", "Hasta 1 m"], "Manual de accidentes de tráfico."],
        ["media", "¿Qué hay en la zona templada?", ["Vehículos, zona limpia, zona sucia y personal de apoyo", "Solo los curiosos", "La víctima"], "Manual de accidentes de tráfico."],
        ["media", "¿Quién controla la zona fría o perímetro exterior?", ["Los ATGC o fuerzas del orden", "El binomio", "El médico"], "Manual de accidentes de tráfico."],
        ["media", "¿A quién deben dirigirse los ATGC para el emplazamiento de los vehículos del Servicio?", ["Únicamente al responsable del emplazamiento (Oficial Conductor)", "A cualquier bombero", "Al médico"], "Manual de accidentes de tráfico."],
        ["dificil", "¿Qué método de triaje se cita en el reconocimiento?", ["START", "SAMPLE", "AVDN"], "Manual de accidentes de tráfico."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["¿Qué riesgos externos se controlan antes de acceder al vehículo?", "Entorno no seguro (eléctrico, MMPP), restos de vehículos, fugas y derrames, nuevas tecnologías e inestabilidad"],
        ["¿Qué características tiene la estabilización inicial?", "Rápida y provisional, previa al acceso, hecha por el binomio del FSV; nunca se accede sin estabilizar y se empieza por la parte más insegura"],
        ["¿Qué diferencia la estabilización primaria de la de emergencia?", "La primaria es más estable y deja libres a los bomberos; la de emergencia es excepcional, menos estable y requiere bomberos sujetando durante toda la ejecución"],
        ["¿Qué riesgos interiores se controlan antes de atender a la víctima?", "Elementos de carga, llave de contacto y freno de mano, airbags, pretensores, ROPS y reposacabezas activos"],
        ["¿Qué medidas se toman ante derrames?", "Gasolina menor: tendido de espuma preventivo; gasolina importante: cubrir con espuma; gasoil: cubrir con sepiolita"],
        ["¿Cuándo se desconecta la batería?", "Tras accionar los mecanismos eléctricos que faciliten el acceso o la extracción (ventanillas, techo, asientos)"],
      ],
      preguntas: [
        ["facil", "¿Puede accederse al vehículo sin estabilizarlo?", ["No", "Sí, si hay prisa", "Sí, si está sobre ruedas"], "Manual de accidentes de tráfico."],
        ["media", "¿Qué posición del vehículo es la más inestable?", ["Sobre su lateral", "Sobre sus ruedas", "Sobre su techo"], "Manual de accidentes de tráfico."],
        ["media", "¿Con qué se cubre un derrame de gasoil?", ["Con sepiolita", "Con espuma", "Con agua a chorro"], "Manual de accidentes de tráfico."],
        ["media", "¿Qué estabilización se indica en extracciones a 0º con el vehículo sobre ruedas?", ["La de 5 puntos", "La de 4 puntos", "La de emergencia"], "Manual de accidentes de tráfico, anexo 1.6."],
        ["dificil", "¿Qué indicación deben dar los bomberos al terminar la estabilización primaria?", ["«Estabilización primaria realizada», asegurándose de ser escuchados", "Nada", "Un toque de silbato"], "Manual de accidentes de tráfico, anexo 1.3."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["¿Qué caracteriza el Plan A de excarcelación?", "Es el seguro: máximos huecos interiores y exteriores, buena valoración de la víctima, material de inmovilización y extracción a 0º o al menor ángulo"],
        ["¿Qué caracteriza el Plan B?", "Es el rápido: máximos huecos interiores y mínimo hueco exterior, con tabla espinal y menor ángulo de extracción"],
        ["¿Qué es el Plan de emergencia?", "La maniobra más rápida, sin material de inmovilización; si el entorno es inseguro se hace solo este plan"],
        ["¿Quién determina los planes de excarcelación y cuántos se eligen?", "El mando de la intervención; se eligen dos (A y B, o emergencia y B), según el estado del herido y el entorno"],
        ["¿Quién dirige la extracción de la víctima?", "El mando sanitario, en comunicación constante con el mando de bomberos; los movimientos los dirige quien sujeta la cabeza"],
        ["¿Cuándo se usa la maniobra de Rautek?", "Para extraer con un solo rescatador cuando el tiempo es determinante; tiene apoyos facial, biaxilar y antebraquial"],
      ],
      preguntas: [
        ["facil", "¿Qué ángulo de extracción se prioriza?", ["0º respecto al eje espinal", "90º", "45º siempre"], "Manual de accidentes de tráfico."],
        ["media", "¿Qué plan se usa si el entorno es inseguro?", ["Solo el plan de emergencia", "Solo el plan A", "Ninguno"], "Manual de accidentes de tráfico."],
        ["media", "¿Qué código se usa antes de movilizar a la víctima?", ["«Preparados – Tensión – Ya»", "«Uno, dos, tres»", "«Fuego»"], "Manual de accidentes de tráfico."],
        ["media", "¿Qué técnica de movilización es la última opción?", ["La rotación sentado 90º", "La tracción axilar", "Las tablas Jota a 0º"], "Manual de accidentes de tráfico."],
        ["dificil", "¿En qué casos no se recomienda el Ferno KED?", ["Traumatismo torácico con compromiso ventilatorio, neumotórax y embarazo avanzado", "En cualquier conductor", "En niños con silla"], "Manual de accidentes de tráfico, anexo 3.2."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["¿Qué sistemática sigue la valoración primaria en trauma?", "C-ABC: control de hemorragias externas, vía aérea, respiración y circulación"],
        ["¿Cuál es la primera causa de muerte potencialmente evitable en trauma?", "La hemorragia, junto con la obstrucción de la vía aérea"],
        ["¿Qué escala valora el nivel de conciencia en la valoración primaria?", "AVDN: Alerta, reacciona a estímulo Verbal, a Doloroso, No reacciona"],
        ["¿Cómo debe aproximarse el rescatador a una víctima consciente?", "Dentro de su campo visual, para que no mueva el cuello, hasta hacer el control cervical bimanual"],
        ["¿Qué recoge la regla SAMPLE de la valoración secundaria?", "Síntomas, alergias, medicación, patologías previas, última ingesta y eventos previos"],
        ["¿Qué hacer si la víctima no tiene pulso?", "Rescate de emergencia (maniobra de Rautek) e inicio inmediato de RCP 30/2"],
      ],
      preguntas: [
        ["facil", "¿Cómo se moviliza siempre a la víctima de un accidente de tráfico?", ["En bloque, manteniendo el eje cabeza-cuello-tronco", "Por los brazos", "Sentada"], "Manual de accidentes de tráfico."],
        ["media", "¿Qué maniobra de apertura de la vía aérea está contraindicada en el trauma?", ["Frente-mentón", "Tracción mandibular", "Cánula de Guedel"], "Manual de accidentes de tráfico, anexo 1.5."],
        ["media", "¿Dónde se realiza la valoración secundaria?", ["En la ambulancia", "Dentro del coche", "En la zona fría"], "Manual de accidentes de tráfico."],
        ["media", "¿Qué valores máximos tiene la escala de Glasgow por apartados?", ["Ocular 4, verbal 5, motor 6", "Ocular 5, verbal 5, motor 5", "Ocular 3, verbal 4, motor 5"], "Manual de accidentes de tráfico, anexo 4."],
        ["dificil", "¿Qué se mide para colocar el collarín cervical?", ["Traveses de dedo entre la base del hombro y el ángulo de la mandíbula", "La circunferencia del cuello con cinta", "La estatura"], "Manual de accidentes de tráfico."],
      ],
    },
  ],
  glosario: [
    [S1, "FSV", "Furgón de Salvamentos Varios, con el material de excarcelación y estabilización."],
    [S2, "Zona caliente", "Área operativa de hasta 5 m alrededor del vehículo, solo para personal con EPI y material en uso."],
    [S2, "Estacionamiento defensivo", "Colocación del vehículo de emergencia para proteger a los intervinientes del tráfico."],
    [S3, "Binomio", "Pareja de bomberos del FSV que estabiliza el vehículo y maneja las herramientas de excarcelación."],
    [S4, "Plan de excarcelación", "Conjunto de maniobras que el mando decide (A, B o de emergencia) para liberar a la víctima atrapada."],
    [S5, "C-ABC", "Orden de la valoración primaria en trauma: hemorragias, vía aérea, respiración y circulación."],
  ],
  casos: [
    {
      slug: "caso-colision-autovia-conductor-fsv",
      titulo: "Colisión en una autovía: el conductor del FSV",
      supuesto: "Un turismo ha chocado contra la mediana de una autovía con su conductor atrapado. Usted conduce el Furgón de Salvamentos Varios.",
      preguntas: [
        [S2, "facil", "¿Quién determina en carretera dónde se estacionan los vehículos de emergencia?", ["Los Agentes de Tráfico de la Guardia Civil", "El bombero conductor", "El médico"], "Art. 5.7 RGC citado en el manual."],
        [S1, "media", "¿Con quién colabora para colocar el FSV?", ["Con el oficial de conductores", "Con el binomio", "Con el enfermero"], "Protocolo."],
        [S1, "media", "¿Cómo debe colocar el FSV?", ["Con estacionamiento defensivo y herramientas por el lado seguro", "Lo más cerca posible del coche siniestrado", "En la mediana"], "Protocolo."],
        [S2, "media", "¿Qué zona debe respetar al colocarlo?", ["La zona caliente de hasta 5 m", "Ninguna", "Toda la calzada"], "Manual."],
        [S1, "media", "¿Qué medida contra incendios prepara usted?", ["Tendido SOS, línea de agua o Propak", "Nada", "Una BNP"], "Protocolo."],
        [S1, "media", "¿Qué motores pone en marcha?", ["El equipo hidráulico y el generador, entre otros", "Solo el motor del FSV", "El de la UVI"], "Protocolo."],
        [S1, "media", "¿Qué hace con las herramientas al terminar?", ["Recogerlas, revisarlas y limpiarlas", "Dejarlas en la calzada", "Entregarlas a la Guardia Civil"], "Protocolo."],
        [S1, "media", "¿Debe dejar libre la salida de la UVI móvil?", ["Sí, el oficial de conductores lo supervisa", "No es necesario", "Solo de noche"], "Protocolo."],
        [S2, "dificil", "¿Qué cuidado especial debe tener al rebasar el espacio protegido por el camión?", ["Extremar la precaución con el tráfico", "Ninguno", "Correr"], "Manual."],
        [S1, "media", "Si hace falta iluminar la zona, ¿quién se encarga?", ["El bombero conductor del FSV", "El médico", "El binomio"], "Protocolo."],
      ],
    },
    {
      slug: "caso-vehiculo-volcado-lateral",
      titulo: "Un turismo volcado sobre su lateral",
      supuesto: "Un turismo ha quedado sobre su lateral con dos ocupantes y huele a gasolina. El binomio del FSV debe estabilizarlo antes de que nadie acceda.",
      preguntas: [
        [S3, "facil", "¿Qué posición es la más inestable?", ["Sobre su lateral", "Sobre sus ruedas", "Sobre su techo"], "Manual."],
        [S3, "media", "¿Qué zona se deja libre en el vehículo volcado de lado?", ["Techo y maletero, zona de trabajo de extracción", "Los bajos", "El capó"], "Manual."],
        [S3, "media", "¿Dónde se coloca la grada en la estabilización primaria?", ["En el montante B", "En la rueda", "En el techo"], "Manual."],
        [S3, "media", "¿Qué material es más indicado para la estabilización secundaria en lateral?", ["Los Stab-Fast", "Cojines neumáticos solo", "Cuerdas"], "Manual."],
        [S3, "media", "¿Qué precaución tiene al colocar los Stab-Fast en los bajos?", ["Las zonas calientes del escape", "El color del coche", "Nada"], "Manual."],
        [S3, "media", "Con olor a gasolina, ¿qué medida preventiva se toma con un derrame menor?", ["Preparar un tendido de espuma sin usarlo salvo incendio", "Echar agua a chorro", "Nada"], "Manual."],
        [S3, "media", "Si el derrame de gasolina es importante, ¿qué se hace?", ["Cubrirlo con espuma", "Cubrirlo con sepiolita", "Dejarlo evaporar"], "Manual."],
        [S3, "dificil", "¿Por qué un vehículo volcado hacia el depósito tiene fuga constante?", ["Por el respiradero del tapón del depósito", "Por el radiador", "Por el escape"], "Manual."],
        [S3, "media", "¿Quién comunica que el entorno es seguro y autoriza el acceso a la zona caliente?", ["El mando de la intervención", "El binomio", "La víctima"], "Manual."],
        [S3, "media", "¿Cuándo se retiran los apoyos de la estabilización primaria?", ["Después de completar la secundaria", "Antes de empezar la secundaria", "Nunca"], "Manual."],
      ],
    },
    {
      slug: "caso-excarcelacion-conductor-atrapado",
      titulo: "Excarcelación de un conductor atrapado",
      supuesto: "El conductor de un turismo está atrapado por las piernas, consciente, con dolor cervical. El vehículo ya está estabilizado y el médico ha valorado al herido.",
      preguntas: [
        [S5, "facil", "¿Cómo se acercan a él para que no mueva el cuello?", ["Dentro de su campo visual", "Por detrás sin avisar", "Por el techo"], "Manual."],
        [S5, "media", "¿Qué orden sigue la valoración primaria?", ["C-ABC", "ABC sin control de hemorragias", "SAMPLE"], "Manual."],
        [S4, "media", "¿Quién decide el plan de excarcelación?", ["El mando de la intervención, con la información sanitaria", "El bombero conductor", "El conductor herido"], "Manual."],
        [S4, "media", "Con el herido estable y entorno seguro, ¿qué plan se busca?", ["El Plan A (seguro)", "El de emergencia", "Ninguno"], "Manual."],
        [S4, "media", "¿Cuál es la extracción ideal del conductor?", ["0º por el portón", "90º por su puerta siempre", "Por la ventanilla"], "Anexo 3.1: 0º portón."],
        [S4, "media", "¿Quién dirige los movimientos durante la extracción?", ["Quien sujeta la cabeza de la víctima", "El bombero conductor", "El último en llegar"], "Manual."],
        [S4, "media", "¿Sobre qué debe quedar la víctima al final de la extracción?", ["Decúbito supino alineado sobre el tablero espinal", "Sentada en la silla de ruedas", "De pie"], "Manual."],
        [S5, "media", "¿Qué se debe hacer mientras no se puede acceder a la víctima?", ["Apoyo psicológico: presentarse, preguntarle y mantener contacto visual", "Nada", "Gritarle"], "Manual."],
        [S4, "dificil", "¿Qué maniobra se realiza primero entre las posibles?", ["La de menor espacio y menor tiempo", "La más espectacular", "La de mayor corte"], "Manual."],
        [S5, "media", "¿Qué escala valora su conciencia?", ["AVDN", "START", "SAMPLE"], "Manual."],
      ],
    },
  ],
});
