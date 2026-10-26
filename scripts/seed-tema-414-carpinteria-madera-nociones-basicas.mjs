/**
 * Crea tema-414 — Tema 7 de Operario/a Especialista (Ayto. Zaragoza, CONV
 * 5/2026, Anexo I): "Carpintería de madera: nociones básicas, herramientas
 * y tipos de materiales."
 *
 * Tema dedicado de nivel básico; los de Oficial Carpintero (tema-108 a
 * tema-123) son de nivel de oficio y están repartidos en 16 temas.
 *
 * Fuentes:
 * - Conocimiento técnico consolidado del oficio sin una ley única que lo
 *   regule (estructura y propiedades de la madera, especies, tableros,
 *   herramientas, uniones y acabados), con AITIM (Asociación de
 *   Investigación Técnica de las Industrias de la Madera) como referencia
 *   técnica del sector, criterio ya verificado con búsqueda previa en la
 *   sesión de Oficial Carpintero.
 * - Seguridad: RD 665/1997, agentes cancerígenos (BOE-A-1997-11145),
 *   modificado por el RD 349/2003 (BOE-A-2003-6934), que incluyó los
 *   trabajos con exposición a polvo de maderas duras; y RD 1215/1997,
 *   equipos de trabajo (BOE-A-1997-17824). Ambos verificados en la API del
 *   BOE (el identificador del RD 1215/1997 se ha corregido en esta misma
 *   sesión en tema-123 y tema-132, que citaban uno erróneo).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-414-carpinteria-madera-nociones-basicas.mjs
 */
import { sembrarTema, OPERARIO } from "./lib/sembrar-tema.mjs";

const RD665 = "https://www.boe.es/buscar/act.php?id=BOE-A-1997-11145";
const RD349 = "https://www.boe.es/buscar/act.php?id=BOE-A-2003-6934";
const RD1215 = "https://www.boe.es/buscar/act.php?id=BOE-A-1997-17824";
const S1 = "madera-estructura-especies-defectos";
const S2 = "tableros-derivados-madera";
const S3 = "herramientas-manuales-carpintero";
const S4 = "maquinas-uniones-acabados-seguridad";

await sembrarTema({
  tema: {
    slug: "tema-414",
    titulo: "Carpintería de madera: nociones básicas, herramientas y tipos de materiales",
    descripcion: "La madera: partes del tronco (corteza, cámbium, albura, duramen, médula y anillos de crecimiento), maderas de coníferas y de frondosas, especies habituales, humedad, contracción y defectos (nudos, fendas, alabeos, gemas). Tableros derivados: contrachapado, aglomerado o de partículas, de fibras (MDF), OSB, alistonado y melaminado; tableros hidrófugos. Herramientas manuales: de medir y trazar, de serrar, de cepillar, de labrar (formón, gubia, escoplo), de perforar, de golpear y de sujetar; lijas. Máquinas portátiles, uniones (clavos, tornillos, espigas, colas) y acabados (barniz, lasur, aceite, protectores). Seguridad: polvo de maderas duras como agente cancerígeno (RD 665/1997 y RD 349/2003) y uso seguro de las máquinas (RD 1215/1997).",
    contenido: "Lo básico para hacer pequeñas reparaciones de carpintería: cómo es la madera y qué defectos tiene, qué tableros existen y para qué sirve cada uno, qué herramientas y máquinas se usan, cómo se unen y protegen las piezas y cómo trabajar con seguridad frente al polvo y las máquinas.",
    enlaces_boe: [
      { url: RD665, titulo: "Real Decreto 665/1997, de 12 de mayo, protección frente a agentes cancerígenos (BOE-A-1997-11145)" },
      { url: RD349, titulo: "Real Decreto 349/2003, de 21 de marzo, que modifica el RD 665/1997 e incluye el polvo de maderas duras (BOE-A-2003-6934)" },
      { url: RD1215, titulo: "Real Decreto 1215/1997, de 18 de julio, equipos de trabajo (BOE-A-1997-17824)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "La madera: estructura, especies, propiedades y defectos", articulos: "Conocimiento técnico (AITIM)", url: "" },
      { seccion: S2, titulo: "Tableros derivados de la madera", articulos: "Conocimiento técnico (AITIM)", url: "" },
      { seccion: S3, titulo: "Herramientas manuales del carpintero", articulos: "Conocimiento técnico", url: "" },
      { seccion: S4, titulo: "Máquinas portátiles, uniones, acabados y seguridad", articulos: "RD 665/1997, RD 349/2003 y RD 1215/1997", url: RD665 },
    ],
  },
  vinculo: { oposicion: OPERARIO.oposicion, bloqueId: OPERARIO.bloque, numero: 7 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Partes del tronco (de fuera adentro)", "Corteza, cámbium (capa que genera madera nueva), albura (madera joven y clara que conduce la savia), duramen (madera interior, más oscura, dura y durable) y médula (centro blando)"],
        ["Anillos de crecimiento", "Capas que el árbol forma cada año: madera temprana o de primavera (más clara y blanda) y tardía o de verano (más oscura y densa)"],
        ["Coníferas y frondosas", "Coníferas (resinosas, de hoja perenne en aguja): pino, abeto; suelen dar maderas blandas. Frondosas (de hoja ancha): roble, haya, castaño, nogal, fresno; suelen dar maderas duras"],
        ["Especies habituales", "Pino (estructura y carpintería económica), haya (muebles, curvable), roble (muebles, suelos, exterior), castaño, nogal (ebanistería) y tropicales como sapelli o iroko (exterior, carpintería de huecos)"],
        ["Humedad de la madera", "La madera pierde o gana agua según el ambiente; por debajo del punto de saturación de las fibras (en torno al 30 %) cambia de dimensiones: se hincha o merma"],
        ["Anisotropía", "La madera no se comporta igual en todas las direcciones: es más resistente en la dirección de la fibra y su contracción es mayor en sentido tangencial que en el radial"],
        ["Nudos", "Restos de ramas incluidos en el tronco; desvían la fibra y debilitan la pieza; los nudos saltadizos pueden desprenderse"],
        ["Fendas y alabeos", "Fendas o grietas: separación de fibras, a menudo por un secado rápido. Alabeos: deformaciones al secar (abarquillado, curvado, revirado)"],
        ["Gema", "Falta de madera en una arista de la pieza por haberse aserrado cerca de la corteza"],
      ],
      preguntas: [
        ["media", "La parte más interior y oscura del tronco, más dura y durable, es:", ["El duramen", "La albura", "El cámbium"], "Conocimiento técnico."],
        ["media", "La capa del tronco que genera madera nueva cada año es:", ["El cámbium", "La médula", "La corteza exterior"], "Conocimiento técnico."],
        ["facil", "¿Cuál de estas maderas es de conífera?", ["Pino", "Roble", "Haya"], "Conocimiento técnico."],
        ["media", "El resto de una rama incluido en la madera aserrada se llama:", ["Nudo", "Gema", "Fenda"], "Conocimiento técnico."],
        ["media", "La falta de madera en una arista de la pieza, por estar cerca de la corteza, es:", ["La gema", "El alabeo", "La carcoma"], "Conocimiento técnico."],
        ["media", "Una tabla que se curva al secarse presenta un defecto de:", ["Alabeo", "Gema", "Nudo"], "Conocimiento técnico."],
        ["dificil", "La madera cambia sus dimensiones al ganar o perder humedad por debajo del:", ["Punto de saturación de las fibras, en torno al 30 %", "10 % de humedad exactamente", "60 % de humedad"], "Conocimiento técnico."],
        ["media", "¿Qué madera se asocia tradicionalmente a la ebanistería de calidad?", ["Nogal", "Chopo", "Abeto"], "Conocimiento técnico."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Contrachapado", "Tablero de chapas finas encoladas con las fibras cruzadas entre capas contiguas; suele tener un número impar de capas para equilibrar sus tensiones"],
        ["Aglomerado o tablero de partículas", "Partículas o virutas de madera con resina prensadas en caliente; económico y estable, pero con menor resistencia a la flexión y a la humedad, y retiene peor los tornillos en los cantos"],
        ["Tablero de fibras (MDF)", "Fibras de madera con resina prensadas; superficie muy lisa y homogénea, fácil de mecanizar, lacar y moldurar"],
        ["OSB", "Tablero de virutas grandes orientadas en capas cruzadas; resistente, usado en construcción (cerramientos, cubiertas, forjados ligeros)"],
        ["Tablero alistonado", "Núcleo de listones de madera maciza pegados entre sí, a veces chapado; más resistente que el aglomerado"],
        ["Tablero melaminado", "Aglomerado o MDF revestido con papel impregnado en resina de melamina; acabado decorativo y lavable, habitual en mobiliario"],
        ["Tablero hidrófugo", "Fabricado con resinas o aditivos que lo hacen resistente a la humedad; muchos fabricantes lo distinguen por un color verdoso del núcleo; resistir humedad no equivale a poder usarse a la intemperie"],
        ["Canteado", "Revestimiento de los cantos de un tablero (cubrecantos de melamina, PVC o madera) para protegerlos y darles acabado"],
      ],
      preguntas: [
        ["media", "El contrachapado suele tener un número de capas:", ["Impar, con las fibras cruzadas entre capas", "Par, todas en la misma dirección", "Siempre de dos capas"], "Conocimiento técnico (AITIM)."],
        ["media", "El tablero de superficie muy lisa y homogénea, ideal para lacar, es el:", ["MDF", "OSB", "Aglomerado de partículas gruesas"], "Conocimiento técnico (AITIM)."],
        ["media", "El tablero de virutas grandes orientadas, usado en construcción, es el:", ["OSB", "Melaminado", "Contrachapado"], "Conocimiento técnico (AITIM)."],
        ["facil", "El tablero de aglomerado revestido con papel decorativo de resina, habitual en muebles de oficina, es el:", ["Melaminado", "Alistonado", "OSB"], "Conocimiento técnico."],
        ["media", "Un inconveniente del aglomerado frente a la madera maciza es:", ["Su menor resistencia a la flexión y a la humedad", "Su elevado precio", "Que no se puede cortar"], "Conocimiento técnico."],
        ["dificil", "Un tablero hidrófugo:", ["Resiste la humedad, pero no por eso puede usarse a la intemperie sin protección", "Es apto para cualquier uso exterior", "Es lo mismo que un tablero ignífugo"], "Conocimiento técnico (AITIM)."],
        ["media", "Revestir el borde de un tablero con una banda de PVC o melamina se llama:", ["Cantear", "Chapar el núcleo", "Escoplear"], "Conocimiento técnico."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Medir y trazar", "Metro o flexómetro, escuadra (ángulos de 90°), falsa escuadra (cualquier ángulo), gramil (líneas paralelas a un canto), nivel, compás y lápiz de carpintero"],
        ["Herramientas de serrar", "Serrucho (corte general), serrucho de costilla (con refuerzo en el lomo, cortes precisos y de ingletes), sierra de calar o marquetería (cortes curvos) y sierra de arco"],
        ["Serrar al hilo y a contrahílo", "Al hilo: en la misma dirección de la fibra. A contrahílo o al través: perpendicular a la fibra"],
        ["Cepillos", "Herramientas con una cuchilla que alisan y rebajan la madera; la garlopa es un cepillo largo para enderezar y aplanar superficies grandes"],
        ["Formón, escoplo y gubia", "Formón: filo recto y plano para rebajar y ajustar. Escoplo: más grueso, para cajas y mortajas. Gubia: filo curvo para tallas y perfiles redondeados; se golpean con el mazo de madera"],
        ["Herramientas de perforar", "Berbiquí y barrena manuales, y hoy sobre todo el taladro con brocas para madera (de punta centradora) y brocas planas o de pala"],
        ["Herramientas de golpear y sujetar", "Martillo de carpintero (con uña para sacar clavos), mazo, botador (hunde la cabeza del clavo), sargentos y gatos (aprietan piezas encoladas) y tornillo o banco de carpintero"],
        ["Lijas", "El número indica el grano: los números bajos (40-80) son gruesos para desbastar y los altos (180-240 o más) finos para acabar; se usan de forma progresiva"],
        ["Escofina y lima", "Escofina: lima de dientes gruesos para desbastar madera. Lima: dientes más finos para afinar"],
      ],
      preguntas: [
        ["media", "Para trazar líneas paralelas a un canto se utiliza:", ["El gramil", "La falsa escuadra", "El botador"], "Conocimiento técnico."],
        ["media", "La herramienta de filo curvo que se usa en tallas y perfiles redondeados es:", ["La gubia", "El formón", "La garlopa"], "Conocimiento técnico."],
        ["media", "Para trasladar o marcar un ángulo cualquiera distinto de 90° se usa:", ["La falsa escuadra", "La escuadra", "El metro"], "Conocimiento técnico."],
        ["facil", "Para apretar dos piezas mientras se seca la cola se usan:", ["Sargentos o gatos", "Escofinas", "Gramiles"], "Conocimiento técnico."],
        ["media", "Serrar perpendicularmente a la dirección de la fibra se llama:", ["Serrar a contrahílo o al través", "Serrar al hilo", "Escoplear"], "Conocimiento técnico."],
        ["media", "Para el acabado final de una superficie se usa una lija de grano:", ["Fino (número alto)", "Grueso (número bajo)", "Indiferente"], "Conocimiento técnico."],
        ["media", "El cepillo largo que sirve para enderezar y aplanar grandes superficies es:", ["La garlopa", "El guillame", "El formón"], "Conocimiento técnico."],
        ["facil", "Para hundir la cabeza de un clavo por debajo de la superficie se usa:", ["El botador", "El gramil", "La gubia"], "Conocimiento técnico."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Máquinas portátiles", "Sierra circular (cortes rectos), sierra de calar o caladora (cortes curvos), ingletadora (cortes en ángulo), taladro-atornillador, lijadora orbital o de banda y fresadora o router (molduras y ranuras)"],
        ["Protecciones de la sierra circular", "El resguardo cubre el disco y el cuchillo divisor, detrás del disco, impide que la madera se cierre y sea lanzada hacia el operario; no deben retirarse nunca"],
        ["Uniones mecánicas", "Clavos, puntas, tornillos para madera (con taladro guía para no rajar), espigas o clavijas, galletas y herrajes"],
        ["Colas", "Cola blanca o de acetato de polivinilo (PVA, la más habitual en interior), cola de contacto (para chapas y laminados) y colas de poliuretano o epoxi (más resistentes a la humedad)"],
        ["Acabados", "Barniz (película protectora transparente), lasur (protector de poro abierto para exterior, deja respirar la madera), aceites y ceras, pintura y lacas"],
        ["Protectores de la madera", "Productos fungicidas e insecticidas que protegen frente a hongos (pudrición) e insectos xilófagos (carcoma, termitas)"],
        ["Polvo de maderas duras", "Su exposición está incluida como proceso cancerígeno en el RD 665/1997 desde el RD 349/2003; exige aspiración localizada, limpieza sin soplar y protección respiratoria"],
        ["Seguridad con máquinas (RD 1215/1997)", "Usar solo equipos adecuados y con sus protecciones, recibir formación e información sobre su uso, y protegerse ojos y oídos; las prendas holgadas pueden ser atrapadas por las partes giratorias"],
      ],
      preguntas: [
        ["media", "El elemento de seguridad de la sierra circular que impide que la madera se cierre sobre el disco es:", ["El cuchillo divisor", "El gramil", "El botador"], "Conocimiento técnico y RD 1215/1997."],
        ["media", "La cola más habitual para encolar madera en interior es:", ["La cola blanca (PVA)", "La cola de contacto", "El cemento cola"], "Conocimiento técnico."],
        ["media", "Para proteger una puerta de madera exterior dejando que la madera respire se usa:", ["Lasur", "Cola blanca", "Masilla de vidriero"], "Conocimiento técnico."],
        ["facil", "La máquina portátil adecuada para hacer cortes curvos en un tablero es:", ["La sierra de calar o caladora", "La ingletadora", "La cepilladora"], "Conocimiento técnico."],
        ["dificil", "¿Qué norma incluye los trabajos con exposición a polvo de maderas duras entre los procesos cancerígenos?", ["El RD 665/1997, modificado por el RD 349/2003", "El RD 614/2001", "El Código Técnico de la Edificación"], "RD 665/1997 y RD 349/2003."],
        ["media", "Para que un tornillo no raje la madera cerca de un borde conviene:", ["Hacer un taladro guía previo", "Golpearlo con el martillo", "Mojar la madera"], "Conocimiento técnico."],
        ["media", "Los insectos que se alimentan de la madera, como la carcoma, se llaman:", ["Xilófagos", "Hidrófugos", "Fungicidas"], "Conocimiento técnico."],
      ],
    },
  ],
  glosario: [
    [S1, "Albura", "Parte exterior y más joven del tronco, más clara, que conduce la savia y es menos durable que el duramen."],
    [S1, "Duramen", "Parte interior del tronco, más oscura, dura y durable."],
    [S1, "Alabeo", "Deformación de una pieza de madera al secarse: se curva, se abarquilla o se tuerce."],
    [S1, "Frondosa", "Árbol de hoja ancha (roble, haya, nogal) que suele dar maderas duras."],
    [S2, "Contrachapado", "Tablero formado por chapas finas encoladas con las fibras cruzadas."],
    [S2, "MDF", "Tablero de fibras de densidad media, de superficie lisa y homogénea."],
    [S2, "OSB", "Tablero de virutas orientadas, usado en construcción."],
    [S3, "Gramil", "Herramienta para trazar líneas paralelas a un canto."],
    [S3, "Escoplo", "Herramienta de filo recto, más robusta que el formón, para abrir cajas y mortajas."],
    [S3, "Sargento", "Herramienta de apriete para sujetar piezas mientras se encolan o trabajan."],
    [S4, "Lasur", "Protector decorativo de poro abierto que deja respirar la madera, muy usado en exterior."],
    [S4, "Cuchillo divisor", "Pieza fija detrás del disco de la sierra circular que evita que la madera se cierre y salga despedida."],
    [S4, "Xilófago", "Organismo, como la carcoma o las termitas, que se alimenta de madera."],
  ],
  casos: [
    {
      slug: "puerta-aula-no-cierra",
      titulo: "La puerta del aula que no cierra",
      supuesto: "En un colegio, la puerta de madera maciza de un aula roza contra el marco en la parte superior desde que llegó el otoño y no cierra bien. Además, una de sus hojas tiene una grieta junto a un nudo y el canto inferior está algo podrido por la humedad de la fregona.",
      preguntas: [
        [S1, "media", "¿Por qué la puerta empieza a rozar con la llegada del otoño?", ["La madera ha absorbido humedad y se ha hinchado", "La madera ha perdido peso", "El marco se ha encogido por el frío", "Las bisagras se han dilatado"], "Conocimiento técnico: la madera cambia de dimensiones con la humedad."],
        [S3, "media", "Para rebajar ligeramente el canto superior de la hoja usarás:", ["Un cepillo de carpintero", "Un gramil", "Una gubia", "Un botador"], "Conocimiento técnico."],
        [S3, "media", "Antes de cepillar, ¿cómo marcarás una línea paralela al canto?", ["Con el gramil", "Con la falsa escuadra", "Con el martillo", "Con la escofina"], "Conocimiento técnico."],
        [S1, "media", "La grieta que aparece junto al nudo es una:", ["Fenda", "Gema", "Albura", "Veta"], "Conocimiento técnico."],
        [S1, "dificil", "¿Por qué el nudo debilita la pieza?", ["Porque desvía la fibra de la madera", "Porque es más blando que la albura", "Porque contiene agua", "Porque no tiene médula"], "Conocimiento técnico."],
        [S4, "media", "El canto inferior está podrido por hongos. Una vez saneado, conviene aplicar:", ["Un protector fungicida y después el acabado", "Cola blanca", "Agua con jabón", "Pintura plástica de interior directamente"], "Conocimiento técnico."],
        [S4, "media", "Para tapar la grieta tras limpiarla puede usarse:", ["Masilla para madera o cola con serrín", "Yeso", "Silicona de baño", "Cemento"], "Conocimiento técnico."],
        [S3, "media", "Para el acabado del canto cepillado se lija empezando por un grano:", ["Medio o grueso y terminando con uno fino", "Fino y terminando con uno grueso", "Solo con grano grueso", "Sin lijar"], "Conocimiento técnico."],
        [S4, "media", "Si para desmontar la hoja tienes que quitar tornillos muy apretados, usarás:", ["Un destornillador o taladro-atornillador con la punta adecuada", "Un formón haciendo palanca", "Un serrucho", "Un sargento"], "Conocimiento técnico."],
        [S4, "media", "Al cepillar y lijar madera de roble (frondosa dura), debes tener en cuenta que su polvo:", ["Es un agente cancerígeno y exige aspiración y protección respiratoria", "Es inocuo", "Solo es peligroso si está mojado", "Es un buen fertilizante"], "RD 665/1997 y RD 349/2003."],
      ],
    },
    {
      slug: "estanteria-almacen-biblioteca",
      titulo: "La estantería del almacén de la biblioteca",
      supuesto: "Te encargan montar una estantería sencilla para el almacén de una biblioteca municipal con material disponible en el taller: tableros de aglomerado melaminado, MDF y un tablero de OSB, además de tornillos, espigas y cola. Las baldas soportarán cajas de libros.",
      preguntas: [
        [S2, "media", "Las baldas cargarán mucho peso. ¿Qué limitación tiene el aglomerado?", ["Su menor resistencia a la flexión, por lo que puede combarse si la luz es grande", "Que es demasiado pesado para levantarlo", "Que no se puede atornillar nunca", "Que es transparente"], "Conocimiento técnico."],
        [S2, "media", "El tablero de aglomerado revestido de papel con resina, lavable y decorativo, es el:", ["Melaminado", "OSB", "Contrachapado", "Alistonado"], "Conocimiento técnico."],
        [S2, "media", "Los cantos del melaminado quedan al aire tras el corte. Para protegerlos se:", ["Cantean con cubrecantos de melamina o PVC", "Barnizan con lasur", "Lijan con grano 40", "Dejan así"], "Conocimiento técnico."],
        [S4, "media", "Para cortar los tableros en recto con rapidez usarás:", ["La sierra circular con su resguardo y cuchillo divisor", "La sierra de calar a pulso", "Un serrucho de marquetería", "La gubia"], "Conocimiento técnico."],
        [S4, "dificil", "Un compañero quiere quitar el resguardo de la sierra para ver mejor el corte. ¿Qué le dices?", ["Que no: las protecciones de los equipos de trabajo no deben retirarse", "Que sí, si va con cuidado", "Que solo si corta MDF", "Que solo en cortes cortos"], "RD 1215/1997."],
        [S4, "media", "Para unir las baldas a los laterales sin herrajes visibles pueden usarse:", ["Espigas de madera con cola", "Clavos de acero sin cola", "Cinta adhesiva", "Grapas de oficina"], "Conocimiento técnico."],
        [S4, "media", "Para que el tornillo no abra el canto del tablero conviene:", ["Hacer un taladro guía", "Golpear el tornillo", "Usar tornillos de mayor diámetro", "Calentar el tablero"], "Conocimiento técnico."],
        [S3, "media", "Para comprobar que los laterales forman 90° con las baldas usarás:", ["La escuadra", "El gramil", "El botador", "La escofina"], "Conocimiento técnico."],
        [S3, "media", "Mientras se seca la cola, las piezas se sujetan con:", ["Sargentos", "Mazos", "Gubias", "Escoplos"], "Conocimiento técnico."],
        [S2, "media", "Si la estantería fuera para un lugar con humedad, sería preferible un tablero:", ["Hidrófugo", "De aglomerado estándar", "De cartón", "Melaminado estándar"], "Conocimiento técnico (AITIM)."],
      ],
    },
    {
      slug: "banco-parque-carcoma",
      titulo: "El banco de madera con carcoma",
      supuesto: "En el patio de un centro cívico hay un banco de listones de pino con varios agujeritos y serrín fino en el suelo, algún listón partido y la madera agrisada por el sol. Te piden repararlo y protegerlo para que dure.",
      preguntas: [
        [S4, "media", "Los agujeritos con serrín fino indican la presencia de:", ["Insectos xilófagos (carcoma)", "Hongos de pudrición blanca", "Nudos saltadizos", "Exceso de barniz"], "Conocimiento técnico."],
        [S4, "media", "Para tratar la madera afectada se aplica:", ["Un producto insecticida-fungicida protector de la madera", "Cola blanca", "Agua caliente", "Pintura de interior"], "Conocimiento técnico."],
        [S1, "media", "El pino es una madera de:", ["Conífera, generalmente blanda", "Frondosa dura", "Tropical", "Tablero"], "Conocimiento técnico."],
        [S3, "media", "Para cortar a medida un listón nuevo con precisión usarás:", ["Un serrucho de costilla o una ingletadora", "Una gubia", "Un gramil", "Una escofina"], "Conocimiento técnico."],
        [S3, "media", "Para medir la longitud del listón usarás:", ["El metro o flexómetro", "La falsa escuadra", "El botador", "El sargento"], "Conocimiento técnico."],
        [S4, "media", "Para fijar el listón nuevo a la estructura del banco en exterior conviene usar:", ["Tornillos inoxidables o galvanizados", "Clavos de acero sin tratar", "Cola blanca de interior", "Grapas"], "Conocimiento técnico."],
        [S4, "media", "Para eliminar el agrisado superficial antes de proteger, lo adecuado es:", ["Lijar la superficie", "Mojarla con lejía pura y dejarla", "Quemarla", "Pintarla directamente sin preparar"], "Conocimiento técnico."],
        [S4, "media", "Como acabado para exterior que deja respirar la madera se recomienda:", ["Lasur", "Barniz de interior", "Cola de contacto", "Cera de muebles"], "Conocimiento técnico."],
        [S4, "media", "Si lijas con lijadora eléctrica, debes protegerte con:", ["Gafas y mascarilla, y aspirar el polvo", "Solo guantes de jardín", "Ninguna protección", "Un casco de moto"], "RD 1215/1997 y principios de prevención."],
        [S1, "dificil", "Un listón se ha partido justo por un nudo grande. ¿Por qué ahí?", ["Porque el nudo desvía la fibra y debilita la sección", "Porque el nudo es más húmedo", "Porque el nudo es duramen", "Porque los nudos son de otra especie"], "Conocimiento técnico."],
      ],
    },
  ],
});
