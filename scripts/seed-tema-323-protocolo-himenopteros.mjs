/**
 * Crea tema-323 — Tema 28 de Bombero/a Conductor/a: "Protocolo de
 * actuación himenópteros: glosario, tipos de intervención y recepción del
 * aviso, organización de la intervención, movilización de recursos,
 * procedimientos operativos y listado de material."
 *
 * Fuente: Tema 28 "Protocolo actuación himenópteros" de la Escuela de
 * Bomberos del Ayuntamiento de Zaragoza, leído íntegro. El RD 209/2002
 * (ordenación de las explotaciones apícolas), al que remite el documento
 * para el enjambre una vez recogido, se cita tal como lo cita.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-323-protocolo-himenopteros.mjs
 */
import { sembrarTema, BOMBERO } from "./lib/sembrar-tema.mjs";

const FUENTE = BOMBERO.escuela("Tema_28_Protocolo_actuacion_himenopteros.pdf");
const S1 = "glosario-tipos-intervencion";
const S2 = "organizacion-movilizacion";
const S3 = "enjambres-abejas";
const S4 = "avispas-insecticida";

await sembrarTema({
  tema: {
    slug: "tema-323",
    titulo: "Protocolo de actuación con himenópteros: abejas y avispas",
    descripcion: "Glosario apícola; tipos de intervención (enjambres desnudos, enjambres establecidos y avispas) y recepción del aviso; organización y movilización de recursos (J-36, AEA, especialistas URRA); procedimiento general; recogida de enjambres desnudos; avispas autóctonas e invasoras, insecticida y primeros auxilios.",
    contenido: "Recoge el protocolo del Servicio contra Incendios de Zaragoza ante abejas y avispas: cuándo y cómo se interviene en cada tipo de servicio, qué recursos salen, cómo se recoge un enjambre sin dañarlo, por qué los avisperos se retiran al ocaso, cómo se usa el insecticida piretroide con seguridad, qué hacer ante la avispa asiática y cómo atender una picadura.",
    enlaces_boe: [{ url: FUENTE, titulo: "Escuela de Bomberos de Zaragoza — Tema 28: Protocolo de actuación con himenópteros" }],
    indice_estudio: [
      { seccion: S1, titulo: "Glosario, tipos de intervención y recepción del aviso", articulos: "Tema 28, apartados 1 y 2", url: FUENTE },
      { seccion: S2, titulo: "Organización y movilización de recursos", articulos: "Tema 28, apartados 3, 4 y 5.1", url: FUENTE },
      { seccion: S3, titulo: "Enjambres desnudos y establecidos", articulos: "Tema 28, apartados 5.2 y 5.3", url: FUENTE },
      { seccion: S4, titulo: "Avispas, insecticida y primeros auxilios", articulos: "Tema 28, apartados 5.1.8 y 5.4", url: FUENTE },
    ],
  },
  vinculo: { oposicion: BOMBERO.oposicion, bloqueId: BOMBERO.bloqueParteII, numero: 28 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["¿Qué caracteriza a los himenópteros?", "Insectos (abejas, avispas y hormigas) con dos pares de alas membranosas y el ovopositor modificado en aguijón para inyectar veneno"],
        ["¿Qué es un enjambre desnudo?", "Un grupo de abejas errante, tras dividirse una colonia, posado en forma de barba o racimo, sin ubicación definitiva ni panales"],
        ["¿Qué es un enjambre establecido?", "Una colonia que ya ha encontrado ubicación definitiva (un hueco de unos 30 l) y funciona como colmena con panales de cera"],
        ["¿Qué tres tipos de intervención contempla el protocolo?", "Enjambres desnudos, enjambres establecidos y avispas (nidos ocultos o en el exterior)"],
        ["¿Qué es la piquera?", "La pequeña ranura de la colmena por la que entran y salen las abejas"],
        ["¿Qué consejo se da al demandante si le ha picado una abeja?", "Extraer el aguijón raspando la piel con una tarjeta, no con los dedos, para no reventar la bolsa de veneno"],
      ],
      preguntas: [
        ["facil", "¿Qué es el ahumador?", ["Un útil que produce humo para calmar a las abejas", "Un extintor", "Un insecticida"], "Tema 28, glosario."],
        ["media", "¿Qué avispa es una especie autóctona protegida por defender contra la asiática?", ["La avispa crabro", "La Vespa velutina", "La Vespula germanica"], "Tema 28, glosario."],
        ["media", "Si el enjambre está en una habitación, ¿qué se aconseja al demandante?", ["Dejar la ventana abierta y cerrar las puertas al resto de la casa", "Cerrar la ventana", "Usar insecticida"], "Tema 28."],
        ["media", "¿Qué es un núcleo?", ["Una colmena pequeña de unos seis cuadros usada como cazaenjambres", "La reina", "El panal central"], "Tema 28, glosario."],
        ["dificil", "¿Qué significa pecorear?", ["Salir las obreras a recolectar polen y néctar", "Enjambrar", "Construir panales"], "Tema 28, glosario."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["¿Cuándo actúa en general el Cuerpo de Bomberos con himenópteros?", "En las situaciones que supongan peligro o riesgo real para personas, animales y bienes"],
        ["¿Cuándo se interviene en un enjambre desnudo?", "En el momento de recibir el aviso, porque están todas presentes y pueden trasladarse a un lugar más comprometido"],
        ["¿Qué requiere la retirada de un enjambre establecido?", "Inspección previa de personal especializado, autorización firmada del requirente y que la ejecute solo personal formado (especialistas URRA)"],
        ["¿Qué vehículo usan los especialistas URRA?", "El J-36; se añade la AEA si el enjambre o nido está en altura"],
        ["¿Pueden ir los enjambres dentro de la cabina?", "No: se trasladan en la parte posterior de la AEA o en el compartimento separado del vehículo ligero adaptado"],
        ["¿Qué siete riesgos identifica la evaluación del entorno?", "Mecánicos, químicos, eléctricos, biológicos, posturales, térmicos y de altura"],
      ],
      preguntas: [
        ["facil", "¿Cuántos especialistas URRA salen como mínimo a un enjambre establecido?", ["Dos", "Uno", "Cinco"], "Tema 28."],
        ["media", "¿Cuántas retiradas de enjambres establecidos programa como máximo al día el personal URRA?", ["Una", "Tres", "Diez"], "Tema 28."],
        ["media", "¿Quién responde de un enjambre establecido en la fachada?", ["La comunidad de vecinos", "El Ayuntamiento", "Los bomberos"], "Tema 28."],
        ["media", "¿Cuál es la primera opción ante un enjambre establecido?", ["La coexistencia pacífica", "Destruirlo", "Fumigarlo"], "Tema 28."],
        ["dificil", "Si el ciudadano no colabora con la extracción de la colmena, ¿a quién se avisa?", ["A la Unidad Verde, que levanta acta", "A la Guardia Civil", "Al juzgado"], "Tema 28."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["¿Por qué un enjambre desnudo recién salido es manso?", "Porque sale cargado de reservas; con los días sin establecerse aumenta su hambre y su agresividad, y no sabemos cuántos días lleva volando"],
        ["¿Cuánto sobrevive un enjambre desnudo sin alimento?", "Unos seis días a 35 ºC y unos cuatro días entre 17 y 35 ºC"],
        ["¿Debe buscarse a la reina al recoger un enjambre?", "No: se mete el enjambre «a bulto» en la caja y la reina, casi seguro, estará dentro"],
        ["¿Qué método se usa con un enjambre posado en una pared?", "El arrastrado o barrido: se coloca la caja debajo y se sube lentamente por la pared dejando que entren"],
        ["¿Por qué no se actúa de noche con enjambres desnudos?", "Porque la abeja no vuela de noche y, si caen al suelo, la recuperación es más complicada"],
        ["¿Qué pasa con el enjambre una vez metido en la caja?", "Deja de ser animal doméstico y pasa a ser ganado (RD 209/2002): no puede quedar en núcleo urbano y se lleva al apiario para cuarentena"],
      ],
      preguntas: [
        ["facil", "¿A qué hora se recoge un enjambre desnudo?", ["Cuando llamen, a cualquier hora del día", "Solo de noche", "Solo al amanecer"], "Tema 28."],
        ["media", "¿Qué atrae a las abejas para que suban a los cuadros?", ["La cera, sobre todo si es vieja", "El insecticida", "La luz roja"], "Tema 28."],
        ["media", "¿Qué se usa como último recurso para recoger el enjambre por el estrés que causa?", ["El aspirador", "El cepillo", "Los cuadros de cera"], "Tema 28."],
        ["media", "Si la maniobra falla y el enjambre se dispersa, ¿qué medida de protección puede usarse?", ["Un extintor de CO2 o un tendido con agua pulverizada", "Gasolina", "Insecticida en todo caso"], "Tema 28."],
        ["dificil", "¿Con qué se desodoriza el lugar donde estaba el enjambre?", ["Con aguarrás o trementina", "Con lejía", "Con perfume"], "Tema 28."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["¿Cuándo se retiran los nidos de avispa y por qué?", "Al ocaso del día, para atrapar a casi todas en el nido y que no queden avispas volviendo y revoloteando en estado más agresivo"],
        ["¿Qué luz se usa para iluminar un avispero?", "Luz roja, porque las avispas no la ven"],
        ["¿Qué componentes tiene el insecticida del Servicio y qué tipo son?", "Tetrametrina, permetrina y cipermetrina: piretroides sintéticos, de baja toxicidad para mamíferos"],
        ["¿Qué precauciones tiene el aerosol insecticida?", "Riesgo de inflamabilidad en espacios cerrados y con electricidad; no usarlo con viento; en lugares cerrados o públicos (colegios, hospitales) usar bolsa o aspirado"],
        ["¿Qué hacer ante un nido de avispa asiática (Vespa velutina)?", "No romperlo; avisar a las instituciones (Sanidad Animal y Vegetal, ARNA apícola, Unidad Verde); su eliminación requiere un traje especial más grueso y protección facial de metacrilato"],
        ["¿Qué diferencia el aguijón de la abeja del de la avispa?", "El de la abeja es arponado, queda clavado y la abeja muere; el de la avispa es liso o poco dentado y puede picar varias veces"],
      ],
      preguntas: [
        ["facil", "¿Puede una avispa picar varias veces?", ["Sí, su aguijón no queda clavado", "No, muere al picar", "Solo de noche"], "Tema 28."],
        ["media", "¿Qué tipo de nido hace la avispa Polistes?", ["Pequeños nidos aéreos sin cubierta, de 10 a 30 individuos", "Grandes nidos subterráneos", "Nidos en colmenas"], "Tema 28."],
        ["media", "¿Cómo se distingue el nido de avispa asiática?", ["Tiene la entrada y salida por un agujero lateral", "Es subterráneo", "Es de cera"], "Tema 28."],
        ["media", "¿Qué tratamiento tiene una reacción local a una picadura?", ["Extraer el aguijón, desinfectar, frío y antihistamínico tópico", "Torniquete", "Nada"], "Tema 28."],
        ["dificil", "¿Por qué el insecticida no basta en un nido grande con larvas operculadas?", ["Porque no es larvicida y las larvas pueden salir tras la metamorfosis", "Porque se evapora", "Porque atrae a más avispas"], "Tema 28."],
        ["media", "¿Qué color de nido tiene la Vespula germanica frente a la vulgaris?", ["Gris la germanica y amarillo ocre la vulgaris", "Ambos verdes", "Blanco la germanica"], "Tema 28."],
      ],
    },
  ],
  glosario: [
    [S1, "Enjambrazón", "Proceso por el que una colonia de abejas se divide y parte de ella sale con la reina vieja en busca de nuevo lugar."],
    [S1, "Panal", "Conjunto de celdillas hexagonales de cera donde las abejas crían y almacenan alimento."],
    [S2, "URRA", "Especialistas del Servicio formados para retirar enjambres establecidos y avisperos ocultos."],
    [S3, "Cazaenjambres", "Caja o núcleo donde se recoge un enjambre desnudo para trasladarlo al apiario."],
    [S4, "Piretroide", "Insecticida sintético que imita a las piretrinas del crisantemo; actúa como neurotóxico de contacto."],
    [S4, "Vespa velutina", "Avispa asiática, especie invasora que debe neutralizarse por ley."],
  ],
  casos: [
    {
      slug: "caso-enjambre-arbol-colegio",
      titulo: "Un enjambre en un árbol junto a un colegio",
      supuesto: "A media mañana de primavera llaman porque un enjambre de abejas cuelga en racimo de un árbol junto a la puerta de un colegio.",
      preguntas: [
        [S1, "facil", "¿Qué tipo de servicio es?", ["Enjambre desnudo", "Enjambre establecido", "Avispero oculto"], "Tema 28."],
        [S2, "media", "¿Cuándo se interviene?", ["En el momento de recibir el aviso", "Al anochecer", "Al día siguiente"], "Tema 28."],
        [S2, "media", "¿Hace falta autorización del solicitante?", ["No, en enjambres desnudos puede ser directa", "Sí, firmada siempre", "Solo del director"], "Tema 28."],
        [S3, "media", "¿Cómo se recoge un enjambre en racimo de una rama?", ["Con un golpe seco en la rama para que caiga en la caja, cortando la rama o con cuadros de cera", "Aspirándolo siempre", "Fumigándolo"], "Tema 28."],
        [S3, "media", "¿Hay que buscar a la reina?", ["No, se mete el enjambre a bulto", "Sí, siempre", "Solo si es grande"], "Tema 28."],
        [S3, "media", "¿Qué conviene hacer después con la caja si es posible?", ["Dejarla con una pequeña apertura hasta la tarde para que entren las rezagadas", "Cerrarla y llevársela de inmediato", "Enterrarla"], "Tema 28."],
        [S2, "media", "¿Dónde se transporta la caja?", ["Fuera de la cabina, en la trasera de la AEA o en compartimento separado", "En la cabina", "En el maletero de un coche particular"], "Tema 28."],
        [S2, "media", "¿Qué zona se baliza alrededor del enjambre?", ["La zona caliente, con cinta y carteles", "Ninguna", "Toda la ciudad"], "Tema 28."],
        [S3, "dificil", "¿Por qué no se deja el enjambre para más tarde?", ["Puede marcharse a un lugar más comprometido o establecerse en un hueco", "Porque de noche pican más", "Porque se muere"], "Tema 28."],
        [S3, "media", "¿Adónde se llevan finalmente los enjambres?", ["Al apiario, para cuarentena con apicultores", "A la basura", "Al zoo"], "Tema 28."],
      ],
    },
    {
      slug: "caso-avispero-alero-tejado",
      titulo: "Un avispero en el alero de un tejado",
      supuesto: "Por la mañana, un vecino avisa de un gran nido redondeado de avispas en el alero del tejado de un edificio de viviendas.",
      preguntas: [
        [S4, "facil", "¿A qué hora se retirará el nido?", ["Al ocaso", "De inmediato a mediodía", "A cualquier hora"], "Tema 28."],
        [S4, "media", "¿Qué se hace mientras tanto?", ["Balizar, poner carteles de precaución y avisar a los vecinos", "Romper el nido", "Nada"], "Tema 28."],
        [S4, "media", "¿Qué especie es probable por el nido redondeado bajo alero?", ["Vespula vulgaris o germanica", "Polistes", "Abeja doméstica"], "Tema 28."],
        [S2, "media", "¿Qué vehículo puede necesitarse por la altura?", ["La autoescala (AEA)", "La BNP", "La ambulancia"], "Tema 28."],
        [S4, "media", "¿Con qué luz se trabajará al anochecer?", ["Luz roja", "Luz azul", "Foco blanco potente"], "Tema 28."],
        [S4, "media", "¿Qué EPI específico se usa con avispas?", ["Traje de apicultor, guantes, botas y gomas en tobillos y muñecas, más EPI de riesgo tóxico si hay insecticida", "Nivel III", "Ninguno"], "Tema 28."],
        [S4, "media", "¿Cuánto tiempo se pulveriza el insecticida sobre las zonas a tratar?", ["15 o 20 segundos", "Un segundo", "Diez minutos"], "Tema 28."],
        [S4, "dificil", "¿Qué riesgo especial tiene el aerosol cerca de instalaciones eléctricas?", ["Inflamabilidad y arco eléctrico", "Congelación", "Ninguno"], "Tema 28."],
        [S4, "media", "¿Dónde se depositan los restos del nido?", ["En una bolsa precintada en el contenedor de orgánicos", "En el suelo", "En la alcantarilla"], "Tema 28."],
        [S4, "media", "Si el nido fuera de avispa asiática, ¿qué haría falta?", ["Un traje especial más grueso con protección facial de metacrilato", "Solo el traje de apicultor", "Nada especial"], "Tema 28."],
      ],
    },
    {
      slug: "caso-picadura-multiple-vecino",
      titulo: "Un vecino con picaduras múltiples",
      supuesto: "Un vecino que intentó retirar por su cuenta un nido ha recibido varias picaduras y empieza a tener urticaria generalizada y dificultad para respirar.",
      preguntas: [
        [S4, "facil", "¿Qué tipo de reacción sugieren sus síntomas?", ["Reacción sistémica o anafilaxia", "Reacción local leve", "Ninguna"], "Tema 28."],
        [S4, "media", "¿Qué suele causar las muertes por picadura?", ["La reacción alérgica grave, más que la acción tóxica del veneno", "El dolor", "La infección"], "Tema 28."],
        [S4, "media", "¿Qué veneno produce más reacciones anafilácticas?", ["El de avispa, por una proteína antigénica", "El de abeja siempre", "El de hormiga"], "Tema 28."],
        [S1, "media", "Si fueran picaduras de abeja, ¿cómo se extrae el aguijón?", ["Raspando con una tarjeta, sin pinzar la bolsa con los dedos", "Apretando con los dedos", "No se extrae"], "Tema 28."],
        [S2, "media", "Si se va a un lugar lejano con una colmena grande, ¿a quién se avisa?", ["A la ambulancia, dándole la localización", "A nadie", "A la prensa"], "Tema 28."],
        [S1, "media", "¿Qué consejo previo debió recibir el vecino?", ["No intentar exterminarlas con venenos u objetos", "Usar fuego", "Mojar el nido"], "Tema 28."],
        [S4, "media", "¿De qué depende la gravedad del cuadro?", ["Número de picaduras, exposición anterior y edad", "La hora del día", "El color de la ropa"], "Tema 28."],
        [S4, "dificil", "¿Qué tratamiento local se cita para las picaduras?", ["Lavar con agua y jabón, antiséptico y hielo", "Calor seco", "Alcohol de 96º"], "Tema 28."],
        [S2, "media", "¿Qué riesgo de la evaluación del entorno corresponde al veneno?", ["Biológico", "Térmico", "Postural"], "Tema 28."],
        [S4, "media", "¿Qué se hace con un nido de especie autóctona?", ["Solo se retira si hay riesgo real para personas, animales o bienes", "Se destruye siempre", "Nunca se toca"], "Tema 28."],
      ],
    },
  ],
});
