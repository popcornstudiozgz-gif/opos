/**
 * Crea tema-420 — Tema 6 de Subalterna/o (Ayto. Zaragoza, CONV 5/2026,
 * Anexo I): "Nociones básicas de cerrajería, fontanería, electricidad,
 * carpintería, albañilería, calefacción y aire acondicionado. Herramientas
 * y útiles para mantenimiento y pequeñas reparaciones y/o sustituciones."
 *
 * Tema dedicado y de nivel muy básico (pequeñas reparaciones y detección
 * de averías para avisar), en lenguaje sencillo; los oficios se tratan con
 * más detalle en los temas 4 a 7 de Operaria/o Especialista (tema-411,
 * tema-412, tema-45 y tema-414), de los que se toman los datos ya
 * verificados.
 *
 * Fuentes:
 * - REBT, RD 842/2002 (BOE-A-2002-18099), ITC-BT-19 (colores) e ITC-BT-25
 *   (diferencial de 30 mA), leídas en la API del BOE en esta sesión.
 * - RD 614/2001 (BOE-A-2001-11881), anexo II: trabajar sin tensión.
 * - Reglamento de Instalaciones Térmicas en los Edificios, RD 1027/2007
 *   (BOE-A-2007-15820), comprobado su título en la API del BOE; se cita
 *   como norma general de calefacción y climatización sin entrar en sus
 *   valores técnicos.
 * - RD 115/2017, gases fluorados (BOE-A-2017-1679), verificado en la sesión
 *   de Oficial Mecánico: la manipulación de gases refrigerantes exige
 *   certificación.
 * - Cerrajería, carpintería, albañilería y herramientas: conocimiento
 *   técnico consolidado sin norma única.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-420-nociones-mantenimiento.mjs
 */
import { sembrarTema, SUBALTERNO } from "./lib/sembrar-tema.mjs";

const REBT = "https://www.boe.es/buscar/act.php?id=BOE-A-2002-18099";
const RD614 = "https://www.boe.es/buscar/act.php?id=BOE-A-2001-11881";
const RITE = "https://www.boe.es/buscar/act.php?id=BOE-A-2007-15820";
const RD115 = "https://www.boe.es/buscar/act.php?id=BOE-A-2017-1679";
const S1 = "cerrajeria-basica";
const S2 = "fontaneria-electricidad-basica";
const S3 = "carpinteria-albanileria-basica";
const S4 = "calefaccion-aire-acondicionado";
const S5 = "herramientas-pequenas-reparaciones";

await sembrarTema({
  tema: {
    slug: "tema-420",
    titulo: "Nociones básicas de cerrajería, fontanería, electricidad, carpintería, albañilería, calefacción y aire acondicionado; herramientas para pequeñas reparaciones",
    descripcion: "Cerrajería: cerradura, bombín o cilindro, llaves y amaestramiento, pestillo y resbalón, bisagras, cierrapuertas y barras antipánico. Fontanería: llaves de paso, grifos que gotean, cisternas y atascos. Electricidad: cuadro eléctrico, diferencial y magnetotérmico, colores de los cables y seguridad (REBT, RD 614/2001). Carpintería y albañilería: tornillos, tacos, masillas, yeso, silicona y pintura. Calefacción y aire acondicionado: caldera, radiadores, purgador, termostato, equipos split y bomba de calor, filtros y gases refrigerantes (RITE, RD 115/2017). Herramientas y útiles de mantenimiento y su uso seguro.",
    contenido: "Lo básico para hacer pequeñas reparaciones y cambios en un edificio municipal (una bombilla, un bombín, un tornillo flojo, un grifo que gotea) y para saber cuándo hay que avisar a un especialista, con las herramientas que se usan y cómo usarlas con seguridad.",
    enlaces_boe: [
      { url: REBT, titulo: "Real Decreto 842/2002, Reglamento electrotécnico para baja tensión (BOE-A-2002-18099)" },
      { url: RD614, titulo: "Real Decreto 614/2001, protección frente al riesgo eléctrico (BOE-A-2001-11881)" },
      { url: RITE, titulo: "Real Decreto 1027/2007, Reglamento de Instalaciones Térmicas en los Edificios (BOE-A-2007-15820)" },
      { url: RD115, titulo: "Real Decreto 115/2017, comercialización y manipulación de gases fluorados (BOE-A-2017-1679)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "Cerrajería", articulos: "Conocimiento técnico", url: "" },
      { seccion: S2, titulo: "Fontanería y electricidad", articulos: "REBT (ITC-BT-19 y 25); anexo II RD 614/2001", url: REBT },
      { seccion: S3, titulo: "Carpintería y albañilería", articulos: "Conocimiento técnico", url: "" },
      { seccion: S4, titulo: "Calefacción y aire acondicionado", articulos: "RD 1027/2007 (RITE); RD 115/2017", url: RITE },
      { seccion: S5, titulo: "Herramientas y útiles para pequeñas reparaciones", articulos: "Conocimiento técnico", url: "" },
    ],
  },
  vinculo: { oposicion: SUBALTERNO.oposicion, bloqueId: SUBALTERNO.bloque, numero: 6 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Cerradura", "Mecanismo que cierra una puerta y se abre con una llave"],
        ["Bombín o cilindro", "Pieza de la cerradura donde entra la llave; si se pierde una llave, se cambia el bombín sin cambiar toda la cerradura"],
        ["Cómo se cambia un bombín", "Se quita el tornillo largo del canto de la puerta, se gira un poco la llave y se saca el bombín; el nuevo debe tener la misma medida"],
        ["Resbalón y pestillo", "Resbalón: pieza que cierra la puerta al empujarla. Pestillo: pieza que sale al girar la llave y cierra con más seguridad"],
        ["Llave maestra (amaestramiento)", "Sistema en el que una llave abre muchas cerraduras y cada llave normal solo abre la suya"],
        ["Bisagras", "Piezas que unen la puerta al marco y permiten que gire"],
        ["Cierrapuertas", "Mecanismo que cierra la puerta de forma automática y suave"],
        ["Barra antipánico", "Barra horizontal de las puertas de salida de emergencia que abre la puerta empujándola, sin llave"],
        ["Cerradura que va dura", "Se lubrica con un producto específico para cerraduras (por ejemplo, grafito); nunca se fuerza la llave"],
      ],
      preguntas: [
        ["facil", "La pieza de la cerradura donde se mete la llave es:", ["El bombín o cilindro", "La bisagra", "El cierrapuertas"], "Conocimiento técnico."],
        ["media", "Si se pierde una llave de una oficina, lo más práctico es:", ["Cambiar el bombín", "Cambiar la puerta", "Dejar la puerta abierta"], "Conocimiento técnico."],
        ["media", "Las puertas de salida de emergencia suelen tener:", ["Barra antipánico", "Candado", "Cadena con llave"], "Conocimiento técnico."],
        ["media", "El mecanismo que cierra la puerta solo y de forma suave es:", ["El cierrapuertas", "El pestillo", "El bombín"], "Conocimiento técnico."],
        ["media", "Una llave que abre muchas cerraduras de un edificio es:", ["La llave maestra", "La llave inglesa", "La llave de paso"], "Conocimiento técnico."],
        ["facil", "Si una cerradura va dura, se debe:", ["Lubricar con un producto para cerraduras", "Forzar la llave", "Echar agua"], "Conocimiento técnico."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Llave de paso", "Llave que corta el agua de una zona o de todo el edificio; se cierra antes de cualquier reparación"],
        ["Grifo que gotea", "Suele ser una pieza gastada (zapata o cartucho); se cierra la llave de paso antes de desmontarlo"],
        ["Cisterna que no para", "Suele fallar la boya o el mecanismo de descarga; se puede cerrar su llave de escuadra y avisar"],
        ["Atasco", "Se intenta con una ventosa; no hay que echar grasas ni restos por los desagües"],
        ["Cuadro eléctrico", "Tiene el interruptor general, el diferencial (corta si hay fuga a tierra, 30 mA en viviendas) y los magnetotérmicos de cada circuito"],
        ["Si salta un interruptor", "Puede haber una sobrecarga o una avería; se desconectan aparatos, se sube el interruptor y, si vuelve a saltar, se avisa al electricista"],
        ["Colores de los cables", "Verde-amarillo: tierra. Azul claro: neutro. Marrón, negro o gris: fase (ITC-BT-19)"],
        ["Cambiar una bombilla con seguridad", "Apagar el interruptor (y mejor también el circuito en el cuadro), esperar a que se enfríe y usar una escalera estable"],
        ["Trabajar sin tensión", "Antes de tocar una instalación: desconectar, impedir que se vuelva a conectar, comprobar que no hay tensión, poner a tierra y señalizar (RD 614/2001)"],
      ],
      preguntas: [
        ["facil", "Antes de arreglar un grifo hay que:", ["Cerrar la llave de paso", "Abrir todos los grifos", "Llamar al 112"], "Conocimiento técnico."],
        ["media", "El cable de tierra es de color:", ["Verde-amarillo", "Azul", "Marrón"], "ITC-BT-19."],
        ["media", "El interruptor que corta la luz cuando hay una fuga de corriente es:", ["El diferencial", "El de la escalera", "El termostato"], "ITC-BT-25."],
        ["media", "Si un magnetotérmico salta otra vez después de subirlo:", ["Se avisa al electricista", "Se sujeta con cinta", "Se sube muchas veces"], "Conocimiento técnico."],
        ["media", "Para desatascar un lavabo, lo primero es probar con:", ["Una ventosa", "Un martillo", "Un taladro"], "Conocimiento técnico."],
        ["media", "Antes de cambiar una bombilla hay que:", ["Apagar el interruptor y esperar a que se enfríe", "Tocarla para ver si quema", "Mojarla"], "Conocimiento técnico."],
        ["dificil", "La primera de las cinco reglas para trabajar sin tensión es:", ["Desconectar", "Poner a tierra", "Señalizar"], "Anexo II RD 614/2001."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Tornillos y tacos", "Para colgar algo en una pared de ladrillo o yeso se hace un agujero con el taladro, se mete un taco de plástico y se atornilla"],
        ["Tipos de cabeza de tornillo", "Plana (ranura recta), de estrella o Phillips (cruz) y Allen (hueco hexagonal); se usa el destornillador o la llave que corresponda"],
        ["Bisagras flojas", "Se aprietan los tornillos; si el agujero está gastado, se rellena (con un taco o espiga de madera y cola) y se vuelve a atornillar"],
        ["Masilla para madera", "Sirve para tapar agujeros y grietas pequeñas en la madera; se lija cuando seca"],
        ["Yeso y masilla de paredes", "Sirven para tapar agujeros y grietas en paredes y techos interiores antes de pintar"],
        ["Silicona", "Sella juntas de lavabos, platos de ducha o ventanas para que no entre agua; la sanitaria resiste los hongos"],
        ["Pintura de paredes", "La pintura plástica es la habitual en interiores; antes se limpia y se tapan los agujeros"],
        ["Azulejo roto", "Se retira con cuidado, se coloca uno nuevo con cemento cola y se rellena la junta con material de rejuntado"],
      ],
      preguntas: [
        ["media", "Para colgar un cuadro en una pared de ladrillo se usa:", ["Taladro, taco y tornillo", "Solo un clavo de madera", "Cinta adhesiva"], "Conocimiento técnico."],
        ["media", "El tornillo con un hueco de seis lados se aprieta con:", ["Una llave Allen", "Un destornillador plano", "Unos alicates"], "Conocimiento técnico."],
        ["media", "Para sellar la junta entre el lavabo y la pared se usa:", ["Silicona sanitaria", "Pegamento de papel", "Yeso"], "Conocimiento técnico."],
        ["facil", "Para tapar un agujero pequeño en la pared antes de pintar se usa:", ["Masilla o yeso", "Aceite", "Agua"], "Conocimiento técnico."],
        ["media", "La pintura más habitual para paredes interiores es:", ["La pintura plástica", "La pintura de carreteras", "El barniz de barcos"], "Conocimiento técnico."],
        ["media", "Para pegar un azulejo nuevo se usa:", ["Cemento cola", "Silicona de cristales", "Cola blanca"], "Conocimiento técnico."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Reglamento de Instalaciones Térmicas (RITE)", "Norma que regula la calefacción, la climatización y el agua caliente de los edificios (RD 1027/2007)"],
        ["Caldera", "Aparato que calienta el agua que va a los radiadores y, a veces, el agua caliente de los grifos"],
        ["Radiador", "Aparato que da el calor del agua caliente a la habitación"],
        ["Purgar un radiador", "Si el radiador está frío arriba, tiene aire: se abre un poco el purgador con un recipiente debajo hasta que salga agua y se cierra"],
        ["Termostato", "Aparato que mide la temperatura y enciende o apaga la calefacción o el aire acondicionado"],
        ["Válvula termostática", "Llave del radiador que regula su calor según la temperatura de la habitación"],
        ["Aire acondicionado split", "Equipo con una unidad interior (en la pared) y otra exterior unidas por tubos; la bomba de calor da frío en verano y calor en invierno"],
        ["Filtros del aire acondicionado", "Se limpian a menudo para que el aparato funcione bien y el aire sea más limpio"],
        ["Gases refrigerantes", "Solo pueden manipularlos profesionales con certificación (RD 115/2017); una fuga se comunica, no se repara"],
      ],
      preguntas: [
        ["media", "Si un radiador está frío por arriba, probablemente tiene:", ["Aire, y hay que purgarlo", "Demasiada agua caliente", "Un cable suelto"], "Conocimiento técnico."],
        ["facil", "El aparato que enciende y apaga la calefacción según la temperatura es:", ["El termostato", "El purgador", "El bombín"], "Conocimiento técnico."],
        ["media", "La norma que regula las instalaciones de calefacción y climatización de los edificios es:", ["El RITE (RD 1027/2007)", "El Código Penal", "La Ley de Tráfico"], "RD 1027/2007."],
        ["media", "Un equipo de aire acondicionado que da frío y calor es:", ["Una bomba de calor", "Un radiador de agua", "Un ventilador de techo"], "Conocimiento técnico."],
        ["media", "Para que el aire acondicionado funcione bien hay que limpiar a menudo:", ["Los filtros", "Las paredes", "Los cables de la luz"], "Conocimiento técnico."],
        ["dificil", "¿Quién puede manipular el gas refrigerante de un aire acondicionado?", ["Un profesional con certificación", "Cualquier empleado", "Nadie, nunca"], "RD 115/2017."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["Destornilladores", "Planos, de estrella (Phillips o Pozidriv) y de punta Torx; se elige el que encaja bien en la cabeza del tornillo"],
        ["Alicates", "Universales (sujetar, doblar y cortar alambre), de punta (sitios estrechos) y de corte"],
        ["Llaves", "Llave inglesa o ajustable (tuercas de varias medidas), llaves fijas y llaves Allen"],
        ["Martillo", "Para clavar y, con la uña, para sacar clavos"],
        ["Medir y nivelar", "Metro o flexómetro para medir y nivel de burbuja para comprobar que algo está recto"],
        ["Taladro y atornillador", "El taladro hace agujeros con brocas (para madera, metal o pared); el atornillador eléctrico pone y quita tornillos"],
        ["Cúter y sierra", "El cúter corta cartón, cinta o moqueta; la sierra o serrucho corta madera; siempre se corta hacia fuera del cuerpo"],
        ["Útiles y consumibles", "Tornillos, tacos, clavos, cinta aislante, cinta americana, bridas, silicona, masilla, bombillas y pilas"],
        ["Uso seguro de las herramientas", "Usarlas solo para lo que sirven, revisarlas antes, guardarlas ordenadas, usar guantes y gafas cuando haga falta y no dejar herramientas en el suelo"],
      ],
      preguntas: [
        ["facil", "Para comprobar que un cuadro está recto se usa:", ["Un nivel", "Un martillo", "Un cúter"], "Conocimiento técnico."],
        ["media", "La herramienta para apretar tuercas de distintas medidas es:", ["La llave inglesa o ajustable", "El destornillador plano", "El metro"], "Conocimiento técnico."],
        ["media", "Para hacer un agujero en la pared se usa:", ["Un taladro con broca para pared", "Un destornillador", "Un alicate"], "Conocimiento técnico."],
        ["media", "Al cortar con un cúter hay que hacerlo:", ["Hacia fuera del cuerpo", "Hacia la mano que sujeta", "Sin mirar"], "Conocimiento técnico."],
        ["facil", "Para sacar un clavo se usa:", ["La uña del martillo", "El nivel", "La cinta métrica"], "Conocimiento técnico."],
        ["media", "Las herramientas deben guardarse:", ["Ordenadas y en buen estado", "Tiradas en el suelo", "Mojadas"], "Conocimiento técnico."],
      ],
    },
  ],
  glosario: [
    [S1, "Bombín", "Pieza de la cerradura donde entra la llave."],
    [S1, "Barra antipánico", "Barra que abre una puerta de emergencia al empujarla, sin llave."],
    [S1, "Cierrapuertas", "Mecanismo que cierra una puerta de forma automática."],
    [S2, "Llave de paso", "Llave que corta el agua de una zona o de todo el edificio."],
    [S2, "Diferencial", "Interruptor del cuadro eléctrico que corta la luz si hay una fuga de corriente."],
    [S3, "Taco", "Pieza de plástico que se mete en la pared para que el tornillo agarre."],
    [S3, "Silicona", "Producto que sella juntas para que no entre agua."],
    [S4, "Purgador", "Pequeña válvula del radiador para sacar el aire."],
    [S4, "Bomba de calor", "Equipo de aire acondicionado que da frío en verano y calor en invierno."],
    [S5, "Flexómetro", "Metro metálico que se enrolla, para medir."],
    [S5, "Broca", "Pieza del taladro que hace el agujero."],
  ],
  casos: [
    {
      slug: "averias-en-el-colegio",
      titulo: "Las averías del colegio",
      supuesto: "Trabajas de subalterno en un colegio público. Esta mañana te avisan de varias cosas: la llave de un aula se ha perdido, un grifo del baño gotea, una bombilla del pasillo está fundida y un radiador de la biblioteca está frío por arriba.",
      preguntas: [
        [S1, "media", "Para el aula de la llave perdida, lo más práctico es:", ["Cambiar el bombín", "Cambiar la puerta entera", "Dejar el aula abierta"], "Conocimiento técnico."],
        [S1, "media", "Para quitar el bombín hay que soltar:", ["El tornillo largo del canto de la puerta", "Las bisagras", "El cierrapuertas"], "Conocimiento técnico."],
        [S2, "facil", "Antes de mirar el grifo que gotea hay que:", ["Cerrar la llave de paso", "Abrir el grifo del todo", "Poner un cubo y olvidarse"], "Conocimiento técnico."],
        [S2, "media", "Un grifo que gotea suele tener gastada:", ["La zapata o el cartucho", "La bombilla", "La cerradura"], "Conocimiento técnico."],
        [S2, "media", "Para cambiar la bombilla del pasillo hay que:", ["Apagar la luz, esperar a que se enfríe y usar una escalera estable", "Hacerlo con la luz encendida", "Subirse a una silla con ruedas"], "Conocimiento técnico."],
        [S4, "media", "El radiador frío por arriba tiene:", ["Aire, y hay que purgarlo", "Una fuga de gas", "Demasiada electricidad"], "Conocimiento técnico."],
        [S4, "media", "Al purgar el radiador hay que poner debajo:", ["Un recipiente para recoger el agua", "Una regleta eléctrica", "Papeles"], "Conocimiento técnico."],
        [S5, "media", "Para abrir el purgador suele usarse:", ["Una llave de purgador o un destornillador", "Un martillo", "Un cúter"], "Conocimiento técnico."],
        [S5, "media", "Para quitar los tornillos del grifo se usa:", ["El destornillador o la llave adecuados", "Los dientes", "Un cuchillo de cocina"], "Conocimiento técnico."],
        [S2, "dificil", "Si al cambiar la bombilla salta el interruptor del cuadro una y otra vez:", ["Se avisa al electricista", "Se sujeta el interruptor con cinta", "Se cambian todas las bombillas"], "Conocimiento técnico."],
      ],
    },
    {
      slug: "preparar-sala-reunion",
      titulo: "Preparar la sala de reuniones",
      supuesto: "En la Junta Municipal hay que preparar la sala para una reunión de vecinos. Hay que colgar un cartel en la pared, arreglar la bisagra floja de un armario, revisar el aire acondicionado, que hace ruido y apenas enfría, y comprobar que la puerta de emergencia abre bien.",
      preguntas: [
        [S3, "media", "Para colgar el cartel en la pared de ladrillo usarás:", ["Taladro, taco y tornillo", "Solo pegamento de papel", "Un clavo de madera"], "Conocimiento técnico."],
        [S5, "media", "Para que el cartel quede recto usarás:", ["Un nivel", "Un serrucho", "Unos alicates"], "Conocimiento técnico."],
        [S3, "media", "Si el agujero de la bisagra está gastado y el tornillo no agarra:", ["Se rellena el agujero (con un taco o espiga y cola) y se vuelve a atornillar", "Se deja así", "Se pega con cinta"], "Conocimiento técnico."],
        [S4, "media", "Si el aire acondicionado enfría poco, una causa sencilla puede ser:", ["Los filtros sucios", "La cerradura de la puerta", "La pintura de la pared"], "Conocimiento técnico."],
        [S4, "dificil", "Si un técnico dice que falta gas refrigerante:", ["Solo un profesional con certificación puede recargarlo", "Lo recargas tú", "Se echa agua"], "RD 115/2017."],
        [S1, "media", "La puerta de emergencia debe abrirse:", ["Empujando la barra antipánico, sin llave", "Solo con llave", "Solo desde fuera"], "Conocimiento técnico."],
        [S1, "media", "Si la puerta de emergencia no abre bien:", ["Se avisa enseguida, porque es una salida de evacuación", "Se cierra con candado", "Se tapa con un mueble"], "Conocimiento técnico."],
        [S5, "media", "Al usar el taladro conviene llevar:", ["Gafas de protección", "Sandalias", "Una bufanda suelta"], "Conocimiento técnico."],
        [S4, "media", "El aparato que fija la temperatura de la sala es:", ["El termostato", "El purgador", "El bombín"], "Conocimiento técnico."],
        [S5, "media", "Al terminar, las herramientas se:", ["Recogen y guardan ordenadas", "Dejan en la mesa de la reunión", "Tiran"], "Conocimiento técnico."],
      ],
    },
    {
      slug: "aseo-centro-civico",
      titulo: "El aseo del centro cívico",
      supuesto: "En un centro cívico, el aseo tiene varios problemas: la cisterna no deja de cargar agua, el lavabo tarda en vaciarse, la junta de silicona del lavabo está negra y despegada y falta un azulejo junto al espejo.",
      preguntas: [
        [S2, "media", "Para que la cisterna deje de perder agua mientras se repara se cierra:", ["Su llave de escuadra", "La llave de toda la ciudad", "La puerta del aseo"], "Conocimiento técnico."],
        [S2, "media", "En una cisterna que no deja de cargar suele fallar:", ["La boya o el mecanismo de descarga", "El enchufe", "La bombilla"], "Conocimiento técnico."],
        [S2, "media", "Para el lavabo que tarda en vaciarse se prueba primero con:", ["Una ventosa", "Un martillo", "Pintura"], "Conocimiento técnico."],
        [S2, "media", "Para que no se atasque, por el lavabo no se debe echar:", ["Grasas ni restos", "Agua", "Jabón de manos"], "Conocimiento técnico."],
        [S3, "media", "Para cambiar la junta del lavabo se usa:", ["Silicona sanitaria", "Yeso", "Cola blanca"], "Conocimiento técnico."],
        [S3, "media", "Antes de poner la silicona nueva hay que:", ["Quitar la vieja y limpiar y secar la zona", "Ponerla encima de la vieja", "Mojar la zona"], "Conocimiento técnico."],
        [S5, "media", "Para quitar la silicona vieja se puede usar:", ["Un cúter con cuidado, cortando hacia fuera", "Un taladro", "Un martillo"], "Conocimiento técnico."],
        [S3, "media", "El azulejo nuevo se pega con:", ["Cemento cola", "Silicona de cristales", "Celo"], "Conocimiento técnico."],
        [S3, "media", "Después se rellena la junta entre azulejos con:", ["Material de rejuntado", "Pintura", "Aceite"], "Conocimiento técnico."],
        [S2, "dificil", "Cerca del espejo hay un enchufe. Antes de trabajar a su lado conviene:", ["Desconectar ese circuito en el cuadro", "Mojar el enchufe", "Tocar los cables para comprobar"], "Anexo II RD 614/2001."],
      ],
    },
  ],
});
