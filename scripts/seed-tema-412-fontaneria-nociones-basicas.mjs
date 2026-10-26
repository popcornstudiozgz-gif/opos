/**
 * Crea tema-412 — Tema 5 de Operario/a Especialista (Ayto. Zaragoza, CONV
 * 5/2026, Anexo I): "Fontanería: nociones básicas, herramientas y tipos de
 * materiales."
 *
 * Tema dedicado de nivel básico (los de Oficial Fontanero, tema-283 a
 * tema-298, son de nivel de oficio; tema-62 de Oficial Mantenimiento mezcla
 * fontanería y calefacción).
 *
 * Fuentes:
 * - Código Técnico de la Edificación, DB HS Salubridad (codigotecnico.org,
 *   DBHS.pdf), leído íntegro en la sesión de Oficial Fontanero
 *   (septiembre de 2026); se reutilizan sus datos ya verificados:
 *   · HS4 (suministro de agua): partes de la instalación (acometida,
 *     instalación general y particulares), presión mínima de 100 kPa en
 *     grifos comunes y 150 kPa en fluxores y calentadores, máxima de
 *     500 kPa; separación mínima de 4 cm entre agua fría y caliente, con la
 *     fría por debajo; red de retorno de ACS cuando la ida al punto más
 *     alejado mide 15 m o más.
 *   · HS5 (evacuación de aguas): cierre hidráulico de 50 mm en usos
 *     continuos y 70 mm en discontinuos, con un máximo de 100 mm; bote
 *     sifónico a 2 m como máximo de la bajante; pendiente mínima del 1 % en
 *     colectores colgados y del 2 % en enterrados.
 * - Materiales, uniones, grifería, herramientas y averías: conocimiento
 *   técnico consolidado del oficio sin norma única, ya contrastado en los
 *   temas de Oficial Fontanero (UNE-EN 1057 para el tubo de cobre).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-412-fontaneria-nociones-basicas.mjs
 */
import { sembrarTema, OPERARIO } from "./lib/sembrar-tema.mjs";

const CTE_HS = "https://www.codigotecnico.org/pdf/Documentos/HS/DBHS.pdf";
const S1 = "instalacion-suministro-agua";
const S2 = "evacuacion-saneamiento";
const S3 = "materiales-uniones-griferia";
const S4 = "herramientas-averias-fontaneria";

await sembrarTema({
  tema: {
    slug: "tema-412",
    titulo: "Fontanería: nociones básicas, herramientas y tipos de materiales",
    descripcion: "Nociones básicas de la instalación de suministro de agua según el CTE DB HS4: acometida, llave de corte general, contador, instalación general y particular, llaves de paso, presiones mínima y máxima, separación entre agua fría y caliente, agua caliente sanitaria y golpe de ariete. Evacuación de aguas según el CTE DB HS5: aparatos, sifones y cierre hidráulico, bote sifónico, bajantes, colectores y arquetas, ventilación. Materiales: tuberías de cobre, acero galvanizado, plásticos (PEX, PP-R, multicapa, PE y PVC); uniones soldadas, roscadas, por termofusión, press-fitting y encoladas; grifería y válvulas. Herramientas y averías comunes: llaves, cortatubos, escariador, curvatubos, terraja, soplete, desatascadores; goteos, cisternas, atascos y fugas.",
    contenido: "Cómo llega el agua a un edificio y cómo se evacúa, qué tuberías y uniones se usan, para qué sirve cada herramienta del fontanero y cómo resolver las averías más comunes: el grifo que gotea, la cisterna que no para, el desagüe atascado o la fuga en una unión.",
    enlaces_boe: [
      { url: CTE_HS, titulo: "Código Técnico de la Edificación, Documento Básico HS Salubridad (secciones HS4 Suministro de agua y HS5 Evacuación de aguas)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "La instalación de suministro de agua", articulos: "CTE DB HS4", url: CTE_HS },
      { seccion: S2, titulo: "La evacuación de aguas y el saneamiento", articulos: "CTE DB HS5", url: CTE_HS },
      { seccion: S3, titulo: "Tipos de materiales: tuberías, uniones, grifería y válvulas", articulos: "Conocimiento técnico", url: "" },
      { seccion: S4, titulo: "Herramientas de fontanería y averías comunes", articulos: "Conocimiento técnico", url: "" },
    ],
  },
  vinculo: { oposicion: OPERARIO.oposicion, bloqueId: OPERARIO.bloque, numero: 5 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Partes de la instalación (HS4)", "Acometida, instalación general y, según haya contador único o contadores por vivienda, derivaciones colectivas o instalaciones particulares"],
        ["Acometida", "Tramo que une la red pública con la instalación del edificio: llave de toma o collarín sobre la red, tubo de acometida y llave de corte en el exterior de la propiedad"],
        ["Llave de corte general", "Interrumpe el suministro a todo el edificio; está dentro de la propiedad, en zona común accesible, y en el armario o arqueta del contador general si existe"],
        ["Instalación particular", "La de cada vivienda o local: llave de paso a la entrada, derivaciones a cada cuarto húmedo con su llave de corte y ramales a cada aparato"],
        ["Presiones en los puntos de consumo (HS4)", "Mínima de 100 kPa (1 bar) en grifos comunes y 150 kPa en fluxores y calentadores; máxima de 500 kPa (5 bar)"],
        ["Agua fría y caliente (HS4)", "Separadas al menos 4 cm; si van en el mismo plano vertical, la fría siempre por debajo de la caliente"],
        ["Red de retorno de ACS (HS4)", "Obligatoria cuando la tubería de ida al punto de consumo más alejado mide 15 m o más, para que el agua caliente llegue rápido"],
        ["Golpe de ariete", "Sobrepresión brusca al cerrar de golpe un grifo o una válvula, que provoca ruidos y puede dañar juntas y tuberías; se evita cerrando despacio o con amortiguadores antiariete"],
      ],
      preguntas: [
        ["media", "Según el CTE DB HS4, la presión mínima en un grifo común es de:", ["100 kPa", "50 kPa", "500 kPa"], "CTE DB HS4."],
        ["media", "La presión en los puntos de consumo no debe superar:", ["500 kPa", "1.000 kPa", "150 kPa"], "CTE DB HS4."],
        ["media", "Si las tuberías de agua fría y caliente van en el mismo plano vertical:", ["La fría debe ir por debajo de la caliente", "La fría debe ir por encima", "Deben ir en contacto para ahorrar espacio"], "CTE DB HS4."],
        ["facil", "La llave que corta el agua a todo el edificio es:", ["La llave de corte general", "La llave de escuadra del lavabo", "La llave de paso del baño"], "CTE DB HS4."],
        ["media", "La sobrepresión brusca al cerrar rápidamente un grifo se llama:", ["Golpe de ariete", "Cavitación", "Sifonamiento"], "Conocimiento técnico."],
        ["dificil", "La red de retorno de agua caliente sanitaria es obligatoria cuando la tubería de ida al punto más alejado mide:", ["15 m o más", "5 m o más", "50 m o más"], "CTE DB HS4."],
        ["media", "Un fluxor de inodoro necesita una presión mínima de:", ["150 kPa", "100 kPa", "50 kPa"], "CTE DB HS4."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Sifón", "Tramo en forma de U que retiene agua (cierre hidráulico) e impide que los malos olores de la red suban a la vivienda"],
        ["Cierre hidráulico (HS5)", "Altura mínima de 50 mm en usos continuos y 70 mm en usos discontinuos; máxima de 100 mm"],
        ["Bote sifónico", "Sifón común que recoge los desagües de varios aparatos (bañera, lavabo, bidé); debe estar a 2 m como máximo de la bajante (HS5)"],
        ["Bajante", "Tubería vertical que recoge las aguas de las plantas y las lleva hasta la red horizontal; su diámetro no disminuye en el sentido de la corriente"],
        ["Colectores (HS5)", "Tuberías horizontales con pendiente mínima del 1 % si van colgados y del 2 % si van enterrados"],
        ["Arqueta", "Cámara registrable de la red enterrada para inspeccionar, limpiar y unir ramales; la arqueta a pie de bajante no debe ser sifónica"],
        ["Ventilación de la red", "Evita que se vacíen los sifones por succión; la ventilación primaria prolonga la bajante por encima de la cubierta"],
        ["Aguas residuales y pluviales", "Residuales: de los aparatos sanitarios. Pluviales: de lluvia, recogidas por canalones, sumideros y bajantes de pluviales"],
      ],
      preguntas: [
        ["facil", "El sifón de un aparato sanitario sirve para:", ["Impedir que suban los malos olores de la red", "Aumentar la presión del agua", "Filtrar la cal"], "CTE DB HS5."],
        ["media", "La altura mínima del cierre hidráulico en usos continuos es:", ["50 mm", "20 mm", "150 mm"], "CTE DB HS5."],
        ["media", "La altura máxima del cierre hidráulico es de:", ["100 mm", "70 mm", "200 mm"], "CTE DB HS5."],
        ["media", "Un bote sifónico debe estar como máximo a una distancia de la bajante de:", ["2 m", "5 m", "10 m"], "CTE DB HS5."],
        ["media", "La pendiente mínima de un colector enterrado es del:", ["2 %", "1 %", "0,5 %"], "CTE DB HS5."],
        ["facil", "La tubería vertical que recoge las aguas de las distintas plantas es:", ["La bajante", "La acometida", "El montante de agua fría"], "CTE DB HS5."],
        ["media", "La cámara registrable de la red enterrada de saneamiento se llama:", ["Arqueta", "Bote sifónico", "Vaso de expansión"], "CTE DB HS5."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Tubo de cobre", "Tradicional en agua fría y caliente, gas y calefacción (UNE-EN 1057); se une por soldadura por capilaridad o con accesorios mecánicos"],
        ["Soldadura blanda y fuerte", "Blanda: por debajo de 450 °C con aleaciones de estaño, en agua sanitaria. Fuerte: por encima de 450 °C con aleaciones de cobre-fósforo o plata, cuando se exige más resistencia (gas)"],
        ["Plásticos para agua a presión", "PEX (polietileno reticulado, resiste agua caliente), multicapa PEX-Al-PEX (con alma de aluminio), PP-R (polipropileno, unido por termofusión) y PE (polietileno, redes de abastecimiento)"],
        ["PVC", "Se usa sobre todo en evacuación (desagües, bajantes); se une por encolado con imprimación y adhesivo"],
        ["Tuberías antiguas", "Plomo y acero galvanizado, que se sustituyen progresivamente por cobre o plásticos por su corrosión y, en el caso del plomo, por razones sanitarias"],
        ["Tipos de unión", "Roscada (con cinta de teflón o pasta selladora), soldada, por termofusión, por compresión, press-fitting (prensando un casquillo) y encolada"],
        ["Grifería", "De dos llaves, monomando (una palanca regula caudal y mezcla; lleva cartucho), termostática (mantiene la temperatura elegida) y temporizada (se cierra sola; habitual en aseos públicos)"],
        ["Válvulas", "De esfera (cierre rápido de 90°), de compuerta (corte total), de retención o antirretorno (el agua pasa en un solo sentido) y reductora de presión"],
        ["Llave de escuadra", "Pequeña llave de paso que conecta el latiguillo de un lavabo, fregadero o cisterna, para cortar el agua de ese aparato sin cerrar toda la vivienda"],
      ],
      preguntas: [
        ["media", "La unión de tuberías de PP-R se hace habitualmente por:", ["Termofusión", "Encolado", "Soldadura con estaño"], "Conocimiento técnico."],
        ["media", "La soldadura blanda de tubo de cobre se realiza a una temperatura:", ["Inferior a 450 °C", "Superior a 800 °C", "Superior a 450 °C con plata"], "Conocimiento técnico."],
        ["facil", "Para sellar una unión roscada se utiliza:", ["Cinta de teflón", "Cinta aislante", "Silicona de cristales"], "Conocimiento técnico."],
        ["media", "El PVC se utiliza sobre todo en:", ["Redes de evacuación y desagües", "Tuberías de gas", "Agua caliente de calefacción a alta temperatura"], "Conocimiento técnico."],
        ["media", "Una válvula de retención:", ["Deja pasar el agua en un solo sentido", "Regula la temperatura", "Mide el caudal"], "Conocimiento técnico."],
        ["media", "El grifo que se cierra solo pasado un tiempo, habitual en aseos públicos, es el:", ["Temporizado", "Termostático", "Monomando"], "Conocimiento técnico."],
        ["dificil", "La tubería multicapa PEX-Al-PEX se caracteriza por:", ["Tener una capa intermedia de aluminio entre dos de polietileno reticulado", "Ser de cobre recubierto de plástico", "Ser exclusiva de desagües"], "Conocimiento técnico."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Llaves de fontanero", "Llave Stillson o de tubo (aprieta tuberías y racores redondos), llave inglesa o ajustable, llaves fijas y llave de lavabo (para tuercas difíciles de alcanzar)"],
        ["Cortatubos y escariador", "El cortatubos corta el tubo limpio y perpendicular; el escariador elimina después las rebabas interiores y exteriores"],
        ["Curvatubos", "Dobla el tubo de cobre sin aplastarlo, manteniendo su sección circular"],
        ["Terraja", "Labra roscas exteriores en tubos metálicos para unirlos con accesorios roscados"],
        ["Soplete", "Calienta la unión para soldar tubo de cobre por capilaridad con estaño o plata"],
        ["Desatascadores", "Ventosa (actúa por presión y succión) y sonda o «serpiente» (cable flexible que se introduce en la tubería)"],
        ["Grifo que gotea", "En grifos de dos llaves suele ser la zapata o montura desgastada; en monomandos, el cartucho cerámico; antes de desmontar se corta el agua con la llave de paso"],
        ["Cisterna que no para de cargar", "Suele deberse al mecanismo de llenado (flotador o boya mal regulados) o a la junta del mecanismo de descarga, que deja escapar agua a la taza"],
        ["Atascos", "Se deben a grasas, restos, pelos o cal que reducen la sección; se actúa con ventosa o sonda y limpiando el sifón"],
      ],
      preguntas: [
        ["media", "Después de cortar un tubo, las rebabas se eliminan con:", ["El escariador", "La terraja", "El soplete"], "Conocimiento técnico."],
        ["media", "Para labrar una rosca exterior en un tubo metálico se usa:", ["La terraja", "El curvatubos", "La ventosa"], "Conocimiento técnico."],
        ["facil", "Antes de cambiar el cartucho de un grifo monomando hay que:", ["Cortar el agua con la llave de paso", "Abrir al máximo el grifo de al lado", "Calentar el grifo con el soplete"], "Conocimiento técnico."],
        ["media", "Una cisterna que no deja de llenarse suele tener averiado:", ["El mecanismo de llenado (boya o flotador) o la junta de descarga", "El sifón del lavabo", "La bajante"], "Conocimiento técnico."],
        ["media", "La llave más adecuada para apretar una tubería redonda roscada es:", ["La llave Stillson o de tubo", "Una llave Allen", "Un destornillador"], "Conocimiento técnico."],
        ["facil", "Para eliminar un atasco introduciendo un cable flexible en la tubería se usa:", ["La sonda o serpiente", "El cortatubos", "El escariador"], "Conocimiento técnico."],
        ["media", "En un grifo antiguo de dos llaves, el goteo suele deberse a:", ["La zapata o montura desgastada", "El cartucho termostático", "La falta de presión de la red"], "Conocimiento técnico."],
      ],
    },
  ],
  glosario: [
    [S1, "Acometida", "Tramo de tubería que une la red pública de agua con la instalación del edificio."],
    [S1, "Golpe de ariete", "Sobrepresión brusca en una tubería al cerrar de golpe un grifo o válvula."],
    [S1, "ACS", "Agua caliente sanitaria: el agua caliente que se usa en grifos y duchas."],
    [S2, "Cierre hidráulico", "Agua que queda retenida en el sifón e impide el paso de olores desde la red."],
    [S2, "Bote sifónico", "Sifón común al que desaguan varios aparatos de un cuarto de baño."],
    [S2, "Bajante", "Tubería vertical de evacuación que recoge las aguas de las distintas plantas."],
    [S3, "Termofusión", "Unión de tuberías de plástico fundiendo sus extremos con calor, sin añadir material."],
    [S3, "Press-fitting", "Unión mecánica en la que un accesorio con casquillo se prensa sobre la tubería con una herramienta."],
    [S3, "Cartucho", "Pieza interior del grifo monomando que regula caudal y mezcla; su desgaste causa goteo."],
    [S4, "Escariador", "Herramienta que quita las rebabas del tubo después de cortarlo."],
    [S4, "Terraja", "Herramienta para hacer roscas exteriores en tubos metálicos."],
    [S4, "Llave Stillson", "Llave de tubo de mordaza ajustable para apretar tuberías y racores redondos."],
  ],
  casos: [
    {
      slug: "fuga-aseo-pabellon",
      titulo: "La fuga en el aseo de un pabellón deportivo",
      supuesto: "En un pabellón municipal avisan de que el suelo de los aseos está mojado. Al revisar encuentras que gotea la unión roscada de la llave de escuadra de un lavabo, que un grifo temporizado no se cierra y que una tubería de cobre que va empotrada junto a la de agua caliente está muy fría y suda.",
      preguntas: [
        [S4, "facil", "Antes de desmontar la llave de escuadra, lo primero es:", ["Cortar el agua de esa zona con la llave de paso", "Desmontar el sifón", "Calentar la unión con el soplete", "Llamar a la compañía de aguas"], "Conocimiento técnico."],
        [S3, "media", "Para volver a sellar la unión roscada usarás:", ["Cinta de teflón o pasta selladora", "Silicona sanitaria", "Cinta aislante", "Pegamento de PVC"], "Conocimiento técnico."],
        [S4, "media", "Para apretar la tuerca de la llave de escuadra en un sitio estrecho bajo el lavabo es útil:", ["Una llave inglesa o una llave de lavabo", "Un martillo", "La terraja", "El curvatubos"], "Conocimiento técnico."],
        [S3, "media", "El grifo que no se cierra es temporizado. Ese tipo de grifo:", ["Se cierra solo transcurrido un tiempo; si no lo hace, falla su mecanismo", "Mantiene la temperatura constante", "Mezcla agua fría y caliente con una palanca", "Solo se usa en cocinas"], "Conocimiento técnico."],
        [S1, "media", "La tubería de agua fría va junto a la caliente. Según el CTE HS4, deben separarse al menos:", ["4 cm", "1 cm", "10 cm", "No hay distancia mínima"], "CTE DB HS4."],
        [S1, "media", "Si van en el mismo plano vertical, ¿cuál debe ir por debajo?", ["La de agua fría", "La de agua caliente", "Indistintamente", "La de mayor diámetro"], "CTE DB HS4."],
        [S1, "dificil", "Al cerrar de golpe el grifo, se oye un fuerte golpe en las tuberías. Es:", ["Un golpe de ariete", "Un atasco", "Un cierre hidráulico", "Una fuga de gas"], "Conocimiento técnico."],
        [S2, "media", "El agua del suelo va a un sumidero sifónico. ¿Para qué sirve el sifón?", ["Para que no suban malos olores de la red", "Para aumentar la presión", "Para recoger la cal", "Para medir el consumo"], "CTE DB HS5."],
        [S3, "media", "Si hubiera que sustituir un tramo de cobre por plástico apto para agua caliente, una opción adecuada sería:", ["Multicapa PEX-Al-PEX", "PVC de evacuación", "Tubo de plomo", "Manguera de jardín"], "Conocimiento técnico."],
        [S4, "media", "Tras la reparación, ¿qué debes comprobar?", ["Que no hay fugas abriendo de nuevo el agua y revisando la unión", "Nada, basta con apretar", "Que el diferencial está subido", "Que el grifo está caliente"], "Conocimiento técnico."],
      ],
    },
    {
      slug: "atasco-fregadero-comedor",
      titulo: "El fregadero atascado del comedor escolar",
      supuesto: "En la cocina del comedor de un colegio se ha atascado el fregadero y el agua sale por el desagüe de la pila de al lado. Además, en los aseos de alumnos huele a cloaca. Te piden que lo soluciones y que expliques al personal de cocina qué ha ocurrido.",
      preguntas: [
        [S4, "media", "La causa más frecuente de un atasco en el fregadero de una cocina es:", ["La acumulación de grasa y restos de comida", "La falta de presión de agua", "Un exceso de cloro", "La rotura del contador"], "Conocimiento técnico."],
        [S4, "facil", "La primera herramienta sencilla para intentar desatascarlo es:", ["La ventosa", "El soplete", "La terraja", "El escariador"], "Conocimiento técnico."],
        [S4, "media", "Si la ventosa no basta, puede introducirse:", ["Una sonda o serpiente", "Un cortatubos", "Una llave de escuadra", "Un manómetro"], "Conocimiento técnico."],
        [S2, "media", "El olor a cloaca en los aseos suele indicar que:", ["Algún sifón se ha quedado sin agua (sin cierre hidráulico)", "La presión de agua es excesiva", "Hay demasiada ventilación", "El contador está mal"], "CTE DB HS5."],
        [S2, "media", "En un aseo poco utilizado, la altura mínima del cierre hidráulico para uso discontinuo es:", ["70 mm", "50 mm", "20 mm", "150 mm"], "CTE DB HS5."],
        [S2, "media", "Para que los sifones no se vacíen por succión cuando desaguan otros aparatos, la red debe tener:", ["Ventilación", "Más presión", "Un grupo de presión", "Un vaso de expansión"], "CTE DB HS5."],
        [S2, "dificil", "Los desagües de varios aparatos del aseo llegan a un bote sifónico. ¿A qué distancia máxima de la bajante debe estar?", ["2 m", "5 m", "0,5 m", "10 m"], "CTE DB HS5."],
        [S2, "media", "Las tuberías de desagüe del colegio, que son de PVC, se unen habitualmente:", ["Por encolado con imprimación y adhesivo", "Por termofusión", "Con soldadura de estaño", "Con press-fitting"], "Conocimiento técnico."],
        [S2, "media", "Si hay que limpiar la red enterrada del patio, se accede por:", ["Las arquetas", "Los grifos", "El contador", "La llave de corte general"], "CTE DB HS5."],
        [S4, "media", "¿Qué consejo darías al personal de cocina?", ["No verter grasas ni restos de comida por el fregadero", "Echar agua hirviendo con lejía cada hora", "Retirar el sifón para que corra mejor", "Cerrar la llave de corte general por la noche"], "Conocimiento técnico."],
      ],
    },
    {
      slug: "cisterna-baja-presion-ultimo-piso",
      titulo: "La cisterna que no para y la poca presión del último piso",
      supuesto: "En un edificio municipal de oficinas, la cisterna de un inodoro de la planta baja no deja de cargar agua, y en la última planta los usuarios se quejan de que los grifos apenas tienen presión y el fluxor de un urinario no descarga bien.",
      preguntas: [
        [S4, "media", "La cisterna que no deja de cargar suele tener averiado:", ["El mecanismo de llenado (boya o flotador) o la junta de descarga", "El sifón del lavabo", "La bajante", "El contador"], "Conocimiento técnico."],
        [S3, "media", "Para cortar el agua solo a esa cisterna sin dejar sin agua toda la planta se usa:", ["La llave de escuadra de la cisterna", "La llave de corte general", "La válvula de retención del contador", "El diferencial"], "Conocimiento técnico."],
        [S1, "media", "Según el CTE HS4, la presión mínima en un grifo común es de:", ["100 kPa", "50 kPa", "300 kPa", "500 kPa"], "CTE DB HS4."],
        [S1, "media", "El fluxor del urinario necesita una presión mínima de:", ["150 kPa", "100 kPa", "50 kPa", "20 kPa"], "CTE DB HS4."],
        [S1, "dificil", "Si en la planta baja la presión supera los 500 kPa, ¿qué elemento puede instalarse?", ["Una válvula reductora de presión", "Una válvula de retención", "Un bote sifónico", "Un escariador"], "CTE DB HS4 (presión máxima de 500 kPa) y conocimiento técnico."],
        [S3, "media", "Una válvula de esfera se caracteriza por:", ["Cerrar con un giro de 90°", "Necesitar muchas vueltas para cerrar", "Dejar pasar el agua en un solo sentido", "Regular la temperatura"], "Conocimiento técnico."],
        [S1, "media", "¿Qué tramo une la red pública con la instalación del edificio?", ["La acometida", "La bajante", "El colector", "El montante de calefacción"], "CTE DB HS4."],
        [S1, "media", "Para cortar el agua a todo el edificio se cierra:", ["La llave de corte general", "La llave de escuadra", "El grifo del lavabo", "El bote sifónico"], "CTE DB HS4."],
        [S4, "media", "Al revisar la tubería de subida ves una tubería antigua de acero galvanizado muy corroída. Lo adecuado es:", ["Proponer su sustitución por cobre o plástico apto", "Pintarla para que no se vea", "Golpearla para quitar el óxido", "Dejarla así indefinidamente"], "Conocimiento técnico."],
        [S3, "media", "Para unir un tramo nuevo de cobre se emplearía:", ["Soldadura por capilaridad con soplete o accesorios mecánicos", "Encolado de PVC", "Termofusión", "Cinta americana"], "Conocimiento técnico."],
      ],
    },
  ],
});
