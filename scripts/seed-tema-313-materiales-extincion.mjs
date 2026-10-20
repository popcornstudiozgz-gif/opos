/**
 * Crea tema-313 — Tema 18 de Bombero/a Conductor/a: "Materiales de
 * extinción: mangueras, bifurcaciones, reducciones, lanzas de agua, monitor
 * con trípode, acortinador, pistola de alta presión, generadores y lanzas de
 * espuma, proporcionador con tubo de succión, Propak y ventiladores."
 *
 * Fuente: Tema 18 "Materiales de extinción" (V.4) de la Escuela de
 * Bomberos del Ayuntamiento de Zaragoza, leído íntegro (basado en el Manual
 * del CEIS Guadalajara, que es la bibliografía que recomienda el Servicio).
 * Las normas UNE y el RD 824/1982 (racor Barcelona) se citan tal como
 * aparecen en el documento.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-313-materiales-extincion.mjs
 */
import { sembrarTema, BOMBERO } from "./lib/sembrar-tema.mjs";

const FUENTE = "https://www.zaragoza.es/cont/vistas/portal//bomberos/doc/Tema_18_Materiales_de_extincion_V4.pdf";
const S1 = "mangueras";
const S2 = "piezas-union-racores";
const S3 = "lanzas-monitores";
const S4 = "espuma-propak";
const S5 = "accesorios-ventiladores";

await sembrarTema({
  tema: {
    slug: "tema-313",
    titulo: "Materiales de extinción: mangueras, piezas de unión, lanzas, equipos de espuma y ventiladores",
    descripcion: "Mangueras (tipos, diámetros, presiones, posición en el tendido, mantenimiento); racores, reducciones, bifurcaciones y trifurcaciones; lanzas de agua, monitores y cañones; lanzas y generadores de espuma, proporcionadores y Propak; accesorios y ventiladores, con sus normas de uso y seguridad.",
    contenido: "Sigue el Tema 18 de la Escuela de Bomberos: cómo se clasifican las mangueras y cómo se combinan en un tendido para no perder presión, el racor Barcelona obligatorio en toda España, los tipos de lanza según la UNE-EN 15182 y su manejo seguro, cómo se genera espuma de baja, media y alta expansión, y el uso seguro de ventiladores y accesorios.",
    enlaces_boe: [{ url: FUENTE, titulo: "Escuela de Bomberos de Zaragoza — Tema 18: Materiales de extinción (V.4)" }],
    indice_estudio: [
      { seccion: S1, titulo: "Mangueras", articulos: "Tema 18, apartado 1.1", url: FUENTE },
      { seccion: S2, titulo: "Piezas de unión: racores, reducciones, bifurcaciones", articulos: "Tema 18, apartado 1.2", url: FUENTE },
      { seccion: S3, titulo: "Lanzas de agua, monitores y cañones", articulos: "Tema 18, apartados 1.3.1 a 1.3.3", url: FUENTE },
      { seccion: S4, titulo: "Lanzas y generadores de espuma, proporcionadores y Propak", articulos: "Tema 18, apartados 1.3.4 y 1.3.7", url: FUENTE },
      { seccion: S5, titulo: "Accesorios y ventiladores", articulos: "Tema 18, apartados 1.3.5 y 1.3.6", url: FUENTE },
    ],
  },
  vinculo: { oposicion: BOMBERO.oposicion, bloqueId: BOMBERO.bloqueParteII, numero: 18 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["¿Qué norma española recoge las características de las mangueras de impulsión?", "La UNE 23091; la UNE-EN 1947 regula las semirrígidas de vehículos, la UNE-EN 14557 los mangotes de aspiración y la UNE-EN 694 las semirrígidas de sistemas fijos (BIE)"],
        ["¿Qué diámetros de manguera se usan en extinción?", "25, 45 y 70 mm (también 100 mm); en aprovisionamiento 100, 110 y 150 mm"],
        ["¿Qué longitud tiene habitualmente un rollo nuevo de manguera?", "30 metros"],
        ["¿Qué son los mangotes de aspiración?", "Mangueras armadas con anillos metálicos que no se colapsan al trabajar por depresión; tramos de 2 a 4 m para aspirar de ríos, balsas o piscinas"],
        ["¿Qué diferencia las mangueras de ataque, alimentación y abastecimiento?", "La de ataque llega a la lanza; la de alimentación va de la bomba o hidrante a la división; la de abastecimiento lleva el agua de la fuente al depósito de la autobomba"],
        ["¿Qué longitud máxima se recomienda para una línea de 25 mm?", "60 metros, por la gran pérdida de presión"],
        ["¿A qué presión se hace la prueba de estanqueidad de las mangueras tras el incendio?", "Entre 12 y 15 kg/cm²; después se lavan, escurren, secan y pliegan"],
      ],
      preguntas: [
        ["facil", "¿Qué longitud tiene un rollo nuevo de manguera?", ["30 metros", "15 metros", "50 metros"], "Tema 18."],
        ["media", "¿Qué manguera es la del carrete de primer socorro?", ["Semirrígida de 25 mm", "Plana de 70 mm", "Mangote de aspiración"], "Tema 18."],
        ["media", "¿Qué pérdida de carga se produce aproximadamente en 30 m de manguera de 25 mm con 200-300 l/min?", ["8-9 atmósferas", "0,1-0,2 atmósferas", "0,5 atmósferas"], "En 70 mm 0,1-0,2 atm y en 45 mm 0,5 atm (Tema 18)."],
        ["media", "Según la UNE-EN 1947, una manguera semirrígida de categoría I trabaja a menos de:", ["15 bares", "40 bares", "5 bares"], "Categoría II: entre 15 y 40 bares."],
        ["dificil", "¿Cómo se llama el abastecimiento encadenando autobombas en incendios forestales?", ["Aprovisionamiento por escalonamiento", "Tendido Cleveland", "Línea de ataque directa"], "Tema 18."],
        ["media", "¿Qué manguera se recomienda en las últimas tendencias para incendios de piso?", ["La de 45 mm", "La de 25 mm", "La de 100 mm"], "Por la seguridad del bombero (Tema 18)."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["¿Qué racor es obligatorio en toda España?", "El racor Barcelona, según el RD 824/1982; sus características están en la UNE 23400"],
        ["¿Cómo se reconoce el racor Barcelona?", "Es simétrico, normalizado hasta 100 mm y lleva tres enganches a modo de orejetas"],
        ["¿Qué es una reducción?", "Una pieza de dos racores de distinto diámetro para unir mangueras de diferentes secciones; las habituales son 70-45 y 45-25 mm"],
        ["¿Por qué no se recomienda una reducción directa de 70 a 25 mm?", "Por la gran pérdida de carga que se produce en ese estrechamiento"],
        ["¿Cómo es una trifurcación?", "Una entrada de 70 mm y, en el lado opuesto, una salida de 70 mm y dos de 45 mm"],
        ["¿Qué es el colector o bifurcación siamesa?", "Dos entradas de 70 mm y una salida de 100 mm que alimenta directamente una bomba, sin llave de cierre"],
      ],
      preguntas: [
        ["facil", "¿Qué racor deben usar todos los parques de bomberos de España?", ["El racor Barcelona", "El racor Storz", "El racor de rosca"], "RD 824/1982 (Tema 18)."],
        ["media", "¿Qué norma UNE recoge las características del racor Barcelona?", ["UNE 23400", "UNE 23091", "UNE-EN 15182"], "Tema 18."],
        ["media", "¿Con qué material se construyen hoy los racores?", ["Aleaciones de aluminio con magnesio y silicio", "Hierro fundido", "PVC"], "Tema 18."],
        ["media", "¿Qué salidas tiene una bifurcación con entrada de 70 mm?", ["Dos de 45 mm", "Dos de 70 mm", "Tres de 25 mm"], "Tema 18."],
        ["dificil", "¿Qué garantiza la estanqueidad de los racores?", ["Juntas de caucho embutidas en una garganta del casquillo", "La rosca", "El alambre de la ligatura"], "Tema 18."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["¿En qué principio físico se basan las lanzas?", "En la ley de la continuidad: al reducirse la sección de salida aumenta la velocidad y el caudal se mantiene; la presión se transforma en energía cinética"],
        ["¿Qué norma regula las lanzas manuales y cómo las clasifica?", "La UNE-EN 15182: por presión nominal (≤16 bares o 16-40 bares) y en tipos 1 a 4 según puedan regular chorro, caudal y presión"],
        ["¿Qué ventajas tienen las lanzas de múltiples efectos?", "Regulan el caudal y el cono de proyección sin dejar de proyectar, mantienen el caudal constante y tienen posición de purga (Flush)"],
        ["¿Para qué sirve la lanza de cortina (hidro-shield o «pavo real»)?", "Para crear pasillos de evacuación y refrigerar estructuras protegiendo de la radiación; no es para extinguir"],
        ["¿Cómo se recupera una lanza que se ha escapado?", "Pisando la manguera lo más cerca posible de la lanza y avanzando con el peso del cuerpo hasta poder agacharse y cogerla"],
        ["¿Qué diferencia un cañón de un monitor?", "El cañón se orienta con palanca o maneral; el monitor con coronas o husillos (aunque se usan indistintamente)"],
      ],
      preguntas: [
        ["facil", "¿Cómo debe retroceder el bombero con la lanza?", ["De espaldas, sin dar la espalda al fuego y lanzando una cortina de protección", "Corriendo de espaldas al fuego", "Soltando la lanza"], "Tema 18."],
        ["media", "¿Qué lanza es más adecuada en teoría con tensión eléctrica, usada de forma intermitente?", ["La lanza de niebla ZR-300", "La de chorro sólido", "La Akron 753"], "Tema 18."],
        ["media", "¿Qué presión máxima admite la lanza Akron Style 753?", ["50 atmósferas", "6 atmósferas", "200 atmósferas"], "Tema 18."],
        ["media", "¿Qué abanico forma una lanza de cortina de 70 mm?", ["Unos 12 m de alto y 24 m de ancho", "Unos 2 m de alto", "Unos 50 m de alto"], "Con 45 mm: unos 8 m de alto y 16 m de ancho."],
        ["dificil", "¿Qué caudal proyecta el monitor autooscilante Partner a 12 atmósferas?", ["Hasta 2.000 l/min", "Hasta 200 l/min", "Hasta 10.000 l/min"], "Tema 18."],
        ["media", "¿Qué lanza se usa para combustibles compactados como balas de paja?", ["La lanza inyectora", "La lanza de cortina", "La lanza de niebla"], "Tema 18."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["¿Qué hace el proporcionador con tubo de succión?", "Aspira el espumógeno por efecto Venturi y lo mezcla con el agua; lleva una flecha de sentido y suele dosificar entre el 3 % y el 6 %"],
        ["¿Qué pérdida de carga produce la generación de espuma?", "Entre un 30 y un 35 % de la pérdida de carga total al final de la instalación"],
        ["¿Qué diferencia una lanza mezcladora de una premezcladora de baja expansión?", "La mezcladora necesita proporcionador previo; la premezcladora lo lleva incorporado y la dosificación varía con la presión"],
        ["¿A qué presión trabaja óptimamente una lanza de media expansión?", "Entre 2,5 y 3 atmósferas, sin superar nunca 5; expansión en torno a 65 y mezcla del 3 %"],
        ["¿Cómo funciona el generador portátil de alta expansión?", "Hidráulicamente: el agua de una línea de 70 mm mueve una turbina y un ventilador; lleva el proporcionador incorporado (≤1,5 %) y trabaja a 5-10 atmósferas"],
        ["¿Qué es el Propak y en qué porcentajes trabaja?", "Un generador portátil de espuma: del 0,1 % al 1 % para fuegos de clase A y al 1, 3 o 6 % para hidrocarburos o líquidos polares"],
      ],
      preguntas: [
        ["facil", "¿Por qué efecto aspira el espumógeno el proporcionador?", ["Efecto Venturi", "Efecto Joule", "Golpe de ariete"], "Tema 18."],
        ["media", "¿Qué presión no debe superarse nunca en una lanza de media expansión?", ["5 atmósferas", "50 atmósferas", "1 atmósfera"], "Tema 18."],
        ["media", "¿Qué concentración de espumógeno usan los generadores de alta expansión?", ["No superior al 1,5 %", "Del 6 %", "Del 20 %"], "Tema 18."],
        ["media", "¿Qué diámetro de proporcionador necesita una lanza de espuma de 45 mm?", ["45 mm", "25 mm", "70 mm"], "Cada proporcionador va con el caudal de su lanza."],
        ["dificil", "¿Qué diámetro tiene el cono de la lanza a chorro lleno del Propak?", ["6 mm", "25 mm", "45 mm"], "Tema 18."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["¿Para qué sirve un salvamangueras?", "Para que los vehículos pasen sobre el tendido sin dañarlo ni cortar el caudal, evitando golpes de ariete"],
        ["¿Qué es un salvaesquinas?", "Pieza metálica curvada que se fija a un elemento (p. ej. un pasamanos) para que la manguera no se estrangule en las esquinas, útil en tendidos verticales"],
        ["¿Qué es la válvula de pie o «alcachofa»?", "Filtro del extremo del mangote que impide la entrada de impurezas y su descebado"],
        ["¿Qué tipos de ventiladores usan los bomberos?", "Motoventiladores (motor de explosión), hidroventiladores (movidos por agua, pueden pulverizarla) y electroventiladores"],
        ["¿Qué precauciones tiene el turboventilador?", "No arrancarlo con olor a gas natural o GLP, no usarlo en zonas cerradas, repostar fuera del lugar de trabajo y no antes de dos minutos tras pararlo, y usar guantes"],
        ["¿Qué mezcla usa la antorcha de goteo?", "Queroseno y gasóleo en proporción 30 a 70 %; se usa para contrafuegos y quemas controladas"],
      ],
      preguntas: [
        ["facil", "¿Qué accesorio permite el paso de vehículos sobre las mangueras?", ["El salvamangueras", "El salvaesquinas", "El tapafugas"], "Tema 18."],
        ["media", "¿Por qué no se debe arrancar el turboventilador si huele a gas?", ["Porque su motor puede ser fuente de ignición", "Porque se ahogaría el motor", "Porque gasta más"], "Tema 18."],
        ["media", "¿Qué ventilador puede añadir agua pulverizada a la corriente de aire?", ["El hidroventilador", "El electroventilador", "El motoventilador"], "Tema 18."],
        ["media", "¿Qué alcance tiene en chorro una mochila extintora?", ["Unos 12 metros", "Unos 50 metros", "Unos 2 metros"], "4 metros en pulverización (Tema 18)."],
        ["dificil", "¿Qué debe llevar un racor ciego colocado en una salida de impulsión?", ["Una válvula para eliminar la sobrepresión", "Un manómetro obligatorio", "Una junta de cobre"], "Tema 18."],
      ],
    },
  ],
  glosario: [
    [S1, "Tendido", "Conjunto de mangueras y accesorios unidos para llevar el agente extintor desde el suministro hasta el foco."],
    [S1, "Mangote", "Manguera armada de aspiración, con anillos metálicos interiores, que trabaja por depresión."],
    [S2, "Racor Barcelona", "Racor simétrico de tres orejetas, obligatorio en España por el RD 824/1982 y descrito en la UNE 23400."],
    [S3, "Lanza de múltiples efectos", "Lanza que regula caudal y cono de proyección sin interrumpir el agua y mantiene el caudal constante en cualquier efecto."],
    [S4, "Proporcionador", "Dispositivo (premezclador o eductor) que aspira el espumógeno por efecto Venturi y lo mezcla con el agua."],
    [S5, "Salvaesquinas", "Pieza que evita el estrangulamiento de la manguera en las esquinas de un tendido vertical."],
  ],
  casos: [
    {
      slug: "caso-tendido-incendio-piso-alto",
      titulo: "Tendido para un incendio en una planta alta",
      supuesto: "Arde un piso en la décima planta de un edificio con columna seca. El oficial pide a la dotación montar el tendido de ataque.",
      preguntas: [
        [S1, "facil", "¿Qué se recomienda en plantas superiores a la octava?", ["Usar la columna seca con salida de 45 mm", "Subir un tendido de 25 mm por la fachada", "Usar solo extintores"], "Tema 18."],
        [S1, "media", "¿Qué diámetro de manguera se recomienda hoy en incendios de piso por seguridad del bombero?", ["45 mm", "25 mm", "100 mm"], "Tema 18."],
        [S1, "media", "¿Qué caudal máximo limita el ataque con 25 mm desde la BUL?", ["Unos 230 l/min", "Unos 2.000 l/min", "Unos 50 l/min"], "Tema 18."],
        [S5, "media", "¿Qué accesorio evita que la manguera se estrangule en la barandilla de la escalera?", ["El salvaesquinas", "El salvamangueras", "El pesatomas"], "Tema 18."],
        [S3, "media", "¿Qué debe hacerse con la lanza antes de cambiar el tendido de sitio?", ["Cerrarla", "Abrirla al máximo", "Soltarla"], "Tema 18."],
        [S3, "media", "¿Cómo debe avanzar el bombero hacia el fuego?", ["Lentamente, semiagachado y de lado", "Erguido y corriendo", "De espaldas"], "Tema 18."],
        [S3, "media", "Si hay indicios de flashover, ¿qué lanza de gota muy fina recoge el Tema 18?", ["La Akron Style 753", "La de chorro sólido", "La de cortina"], "Tema 18."],
        [S3, "dificil", "¿Cómo debe abrirse la lanza de gatillo para evitar golpes de ariete?", ["Accionando el gatillo con suavidad", "De golpe", "Con la bomba parada"], "Tema 18."],
        [S1, "media", "Tras el incendio, ¿qué prueba se hará a las mangueras en el parque?", ["Estanqueidad a 12-15 kg/cm²", "Ninguna", "Rotura a 100 bares"], "Tema 18."],
        [S2, "media", "¿Qué pieza permite pasar de una manguera de 70 a otra de 45 mm?", ["Una reducción 70-45", "Un racor ciego", "Un salvamangueras"], "Tema 18."],
      ],
    },
    {
      slug: "caso-aspiracion-desde-acequia",
      titulo: "Abastecimiento desde una acequia",
      supuesto: "En un incendio rural lejos de hidrantes, la autobomba debe llenar su cisterna aspirando agua de una acequia cercana.",
      preguntas: [
        [S1, "facil", "¿Qué mangueras se usan para aspirar agua de la acequia?", ["Mangotes de aspiración", "Mangueras planas de 25 mm", "Semirrígidas del carrete"], "Tema 18."],
        [S1, "media", "¿Por qué los mangotes no se aplastan al aspirar?", ["Porque llevan una armadura de anillos metálicos", "Porque son de goma gruesa sin armadura", "Porque trabajan a presión positiva"], "Tema 18."],
        [S5, "media", "¿Qué se coloca en el extremo sumergido para evitar impurezas?", ["La válvula de pie o «alcachofa»", "Un racor ciego", "Un tapafugas"], "Tema 18."],
        [S1, "media", "¿Qué conviene hacer con los tramos de mangote en la acequia?", ["Atarlos entre sí para no perderlos si se sueltan", "Dejarlos sueltos", "Cortarlos"], "Tema 18."],
        [S1, "media", "¿Qué longitud suelen tener los tramos de mangote?", ["Entre 2 y 4 metros", "30 metros", "100 metros"], "Tema 18."],
        [S5, "media", "Si se supera la altura de aspiración posible, ¿qué equipo se usa?", ["Una turbobomba", "Un ventilador", "Un generador de espuma"], "Tema 18."],
        [S5, "media", "¿Con qué se unen y separan los tramos de mangote?", ["Con llaves de racorar", "A mano siempre", "Con alambre"], "Tema 18."],
        [S1, "dificil", "¿Cómo se clasifican los mangotes según la UNE-EN 14557?", ["Tipo A de elastómeros y tipo B termoplásticos", "Tipo 2A y 2B", "Categoría I y II"], "Tema 18."],
        [S1, "media", "Si luego hubiera que llevar el agua a otra autobomba lejana, ¿cómo se llama esa técnica?", ["Aprovisionamiento por escalonamiento", "Línea de ataque directa", "Tendido Cleveland"], "Tema 18."],
        [S2, "media", "¿Qué pieza alimentaría la bomba con dos mangueras de 70 mm?", ["El colector o bifurcación siamesa", "Una reducción 45-25", "Una trifurcación"], "Tema 18."],
      ],
    },
    {
      slug: "caso-espuma-sotano-garaje",
      titulo: "Inundación de espuma en un sótano",
      supuesto: "Arde un trastero en un segundo sótano de difícil acceso. El jefe decide inundar el sótano de espuma de alta expansión y ventilar después.",
      preguntas: [
        [S4, "facil", "¿Qué equipo genera espuma de alta expansión?", ["Un generador portátil de alta expansión", "Una lanza de chorro sólido", "Un monitor Partner"], "Tema 18."],
        [S4, "media", "¿Cómo se mueve el ventilador de ese generador?", ["Hidráulicamente, con el agua de una línea de 70 mm", "Con un motor de gasolina", "Con electricidad"], "Tema 18."],
        [S4, "media", "¿A qué presión trabaja el generador de alta expansión?", ["Entre 5 y 10 atmósferas", "A 50 atmósferas", "A menos de 1 atmósfera"], "Tema 18."],
        [S4, "media", "¿Dónde lleva el proporcionador?", ["Incorporado al equipo", "Al inicio del tendido", "En la bomba"], "Tema 18."],
        [S4, "media", "¿Qué inconveniente de la espuma de alta expansión hay que prever?", ["Impide la visibilidad y el acceso", "Es tóxica siempre", "Conduce la electricidad más que el agua"], "Tema 18 y Tema 17."],
        [S5, "media", "Para ventilar después, ¿qué ventilador no debe arrancarse si hay olor a gas?", ["El motoventilador de explosión", "El hidroventilador", "Ninguno"], "Tema 18."],
        [S5, "media", "¿Dónde se coloca el ventilador?", ["En lugar plano, sin productos que resbalen ni fragmentos", "Dentro del sótano", "En cualquier pendiente"], "Tema 18."],
        [S5, "media", "¿Cuándo puede repostarse el turboventilador?", ["Fuera del lugar de trabajo y pasados dos minutos de pararlo", "Con el motor en marcha", "Inmediatamente al pararlo"], "Tema 18."],
        [S5, "dificil", "¿Qué protección debe usarse en especial al revisar el ventilador?", ["Protección de ojos y oídos", "Solo casco", "Ninguna"], "Tema 18."],
        [S4, "media", "Si se usara una lanza de media expansión, ¿qué coeficiente de expansión tendría aproximadamente?", ["65", "5", "1.000"], "Tema 18."],
      ],
    },
  ],
});
