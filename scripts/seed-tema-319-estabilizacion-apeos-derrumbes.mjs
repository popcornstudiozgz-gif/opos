/**
 * Crea tema-319 — Tema 24 de Bombero/a Conductor/a: "Estabilización de
 * estructuras y actuaciones ante derrumbes. Intervención en derrumbamientos.
 * Apeos. Definición. Tipología de apeos según su función. Materiales en
 * apeos. Actuaciones en apeos de emergencias. Apeos en elementos
 * horizontales. Apeos en elementos verticales. Apeos en zanjas,
 * entibaciones. Apeos en bóvedas. Apeos en huecos, ventanas, puertas.
 * Terminología de apeos."
 *
 * Fuente: la bibliografía oficial de la Escuela de Bomberos de Zaragoza
 * remite este tema al "Manual básico IVASPE para bomberos de nuevo ingreso"
 * (nov. 2017). Leídos íntegros del Módulo 2, Tema 11 los apartados 6
 * (intervención en derrumbamientos) y 7 (apeos, con su glosario de términos),
 * cuyo índice coincide con el enunciado oficial. El manual cita la UNE-EN
 * 1065 (puntales telescópicos) y la UNE-EN 338 (madera estructural); se
 * mencionan tal como las cita. Conocimiento técnico sin norma legal propia.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-319-estabilizacion-apeos-derrumbes.mjs
 */
import { sembrarTema, BOMBERO } from "./lib/sembrar-tema.mjs";

const IVASPE = "https://www.valencia.es/documents/d/guest/manual-20bomberos-pdf";
const BIBLIO = BOMBERO.escuela("Bibliografia_externa_recomendada_temario_BNI.pdf");
const S1 = "intervencion-derrumbamientos";
const S2 = "apeos-definicion-tipologia-materiales";
const S3 = "apeos-emergencia-ejecucion";
const S4 = "apeos-horizontales-verticales";
const S5 = "entibaciones-bovedas-huecos-terminologia";

await sembrarTema({
  tema: {
    slug: "tema-319",
    titulo: "Estabilización de estructuras: derrumbamientos y apeos",
    descripcion: "Tipologías de derrumbamiento (construcciones mixtas y de hormigón armado), huecos de supervivencia, zonificación, información y observación, prioridades de rescate y seguridad; apeos: definición, sistemas ligeros, tipología según su función (urgencia, complementario, supletorio), madera y puntales telescópicos (UNE-EN 1065), evaluación y ejecución, apeos de forjados, vigas, voladizos, muros, pilares, acodalados, entibaciones, bóvedas y huecos, y terminología.",
    contenido: "Sigue el Manual IVASPE (Módulo 2, Tema 11), que la Escuela de Bomberos de Zaragoza recomienda para este tema: cómo se organiza un rescate en un edificio derrumbado (zonas, información, víctimas de superficie y ocultas, vigías) y cómo se apuntala con madera y puntales metálicos un forjado, una viga, un muro o una zanja para que no se venga abajo mientras se trabaja.",
    enlaces_boe: [
      { url: IVASPE, titulo: "Manual básico IVASPE (nov. 2017) — Módulo 2, Tema 11, apartados 6 y 7" },
      { url: BIBLIO, titulo: "Escuela de Bomberos de Zaragoza — Bibliografía externa recomendada (remite el Tema 24 al Manual IVASPE)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "Intervención en derrumbamientos", articulos: "IVASPE M2-T11, apartado 6", url: IVASPE },
      { seccion: S2, titulo: "Apeos: definición, tipología según su función y materiales", articulos: "IVASPE M2-T11, apartados 7.1.1-7.1.3", url: IVASPE },
      { seccion: S3, titulo: "Actuaciones en apeos de emergencia", articulos: "IVASPE M2-T11, apartado 7.1.4", url: IVASPE },
      { seccion: S4, titulo: "Apeos en elementos horizontales y verticales", articulos: "IVASPE M2-T11, apartados 7.1.5-7.1.6", url: IVASPE },
      { seccion: S5, titulo: "Entibaciones, bóvedas, huecos y terminología de apeos", articulos: "IVASPE M2-T11, apartados 7.1.7-7.1.9 y glosario", url: IVASPE },
    ],
  },
  vinculo: { oposicion: BOMBERO.oposicion, bloqueId: BOMBERO.bloqueParteII, numero: 24 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Derrumbamientos típicos de construcciones mixtas", "Inclinado, en V y total; generan mucho polvo y escombro menudo"],
        ["Tipos de colapso en edificios de hormigón armado", "Desaparición de una o varias plantas, caída lateral, derrumbamiento sobrepuesto, sobrepuesto de plantas intermedias y destrucción total"],
        ["¿Qué es un hueco de supervivencia?", "El espacio mínimo para sobrevivir al colapso, que depende del tamaño de la víctima; todo derrumbe genera huecos"],
        ["Zonas en un derrumbamiento", "Roja o caliente (el derrumbe, sin vehículos), amarilla o templada (vehículos y personal en espera, PMA inicial) y verde o fría (perímetro de seguridad)"],
        ["Dos herramientas para decidir", "La información (contrastando al informador) y la observación de la estructura"],
        ["Orden de rescate de víctimas", "Primero las de superficie, después las semienterradas o de difícil acceso y por último las ocultas"],
        ["Normas de seguridad en el escombro", "Nunca solo (pareja a 3-4 m), cuerda guía en galerías, vía de escape, vigías, no mover elementos que soporten carga y retirada manual del escombro si hay víctimas"],
      ],
      preguntas: [
        ["facil", "¿Qué víctimas se rescatan primero?", ["Las de superficie", "Las ocultas", "Ninguna"], "IVASPE M2-T11."],
        ["media", "¿Qué separación suele quedar entre forjados superpuestos tras un colapso?", ["Unos 40-60 cm", "Unos 3 m", "Nada"], "IVASPE M2-T11."],
        ["media", "¿Qué postura es la más segura ante un derrumbe?", ["Posición fetal", "De pie con los brazos abiertos", "Tumbado boca arriba"], "IVASPE M2-T11."],
        ["media", "¿Dónde se sitúan los vehículos de bomberos?", ["En la zona amarilla o templada", "Sobre el escombro", "En la zona roja"], "IVASPE M2-T11."],
        ["dificil", "¿Qué movimiento detectan los controladores láser de estabilidad?", ["Unos 5 mm", "1 m", "50 cm"], "IVASPE M2-T11."],
        ["media", "¿Qué datos ayudan a localizar a una víctima?", ["Hora, edad, costumbres y distribución de la vivienda", "Solo el nombre", "El color de su coche"], "IVASPE M2-T11."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["¿Qué es un apeo?", "Una estructura auxiliar temporal que absorbe o libera de cargas un elemento estructural; el apuntalamiento es el apeo de urgencia"],
        ["Condiciones mínimas de un apuntalamiento", "Resistencia y estabilidad ante las cargas, simplicidad y rapidez de montaje y, a veces, habitabilidad"],
        ["Sistemas de apeo según el peso", "Pesados (cantería o albañilería, más bien refuerzos) y ligeros (madera y metálicos)"],
        ["Apeos según su función", "De urgencia (anula un riesgo inminente), complementario (estabilidad a medio-largo plazo, con habitabilidad) y supletorio (permite reparar o sustituir el elemento)"],
        ["Materiales de los apeos ligeros de bomberos", "Madera de pino y puntales telescópicos de acero (sistemas mixtos)"],
        ["Puntales telescópicos (UNE-EN 1065)", "Diámetros de 48, 55 y 60 mm; a 2,5-3 m soportan del orden de 1.100, 1.600 y 2.000 kg; coeficiente de 2-2,5 sobre la carga de rotura"],
        ["Clases de servicio de la madera en apeos", "1: interior cubierto; 2: bajo cubierta abierto al exterior; 3: intemperie o contacto con agua o suelo"],
      ],
      preguntas: [
        ["facil", "¿A qué esfuerzo trabajan en general los apeos?", ["Compresión", "Torsión", "Tracción siempre"], "IVASPE M2-T11."],
        ["media", "¿Qué tipo de apeo anula un riesgo inminente de colapso?", ["De urgencia", "Supletorio", "Refuerzo de recuperación"], "IVASPE M2-T11."],
        ["media", "¿Qué apeo deja accesible el elemento dañado para repararlo?", ["El supletorio", "El de urgencia", "El pesado"], "IVASPE M2-T11."],
        ["media", "¿Qué ventaja tiene el puntal metálico frente al tablón?", ["Se ajusta con la rosca sin cortar ni acuñar", "Resiste más siempre", "Pesa menos que un palillo"], "IVASPE M2-T11."],
        ["dificil", "¿Qué clase de duración tiene una carga de entre una semana y seis meses?", ["Media", "Corta", "Permanente"], "IVASPE M2-T11."],
        ["media", "¿Cuántas veces es más barato un sistema de madera que uno metálico según el manual?", ["Del orden de 1/2 a 1/6 del coste", "Igual", "Diez veces más caro"], "IVASPE M2-T11."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Fases para decidir un apeo", "Inspección (elementos dañados, materiales, cargas, grietas, colindantes) y evaluación (si apuntalar, dónde, qué tipo y con qué)"],
        ["¿Quién conviene que apoye la decisión técnica?", "El arquitecto o aparejador municipal u otro personal cualificado"],
        ["Medida de un pie derecho de madera", "Altura menos los gruesos de sopanda y durmiente y unos 2 cm para el acuñado"],
        ["¿Cómo se embridan los tablones?", "En grupos de dos o tres, con tres bridas: una central y una en cada extremo"],
        ["¿Para qué sirven las cuñas?", "Se colocan por parejas enfrentadas entre durmiente y pie derecho para templar y ajustar el apeo"],
        ["¿Cómo se arriostran los apeos?", "Triangulando con riostras en cruz de San Andrés para que trabajen en conjunto"],
        ["Zonificación en un apeo de emergencia", "Caliente (solo el ensamble final), templada (corte y preparación de piezas, acopio) y fría (público y prensa)"],
      ],
      preguntas: [
        ["facil", "¿Cuántas bridas se ponen como norma a una pareja de tablones?", ["Tres", "Una", "Diez"], "IVASPE M2-T11."],
        ["media", "¿Dónde se cortan y preparan las piezas del apeo?", ["En la zona templada", "En la caliente", "En el parque"], "IVASPE M2-T11."],
        ["media", "¿Por qué se cortan los pies derechos un poco más cortos?", ["Para meter las cuñas y templar el apeo", "Para ahorrar madera", "Por error"], "IVASPE M2-T11."],
        ["media", "¿Qué se coloca entre una pieza metálica y un muro?", ["Una pieza de madera para evitar cizallamientos", "Nada", "Goma espuma"], "IVASPE M2-T11."],
        ["dificil", "¿Qué decisión es más habitual ante un edificio inestable sin material de apeo?", ["Balizar y evacuar", "Demoler", "Ignorar"], "IVASPE M2-T11."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Apeo de forjados: dirección de los puntales", "Líneas de puntales perpendiculares a las viguetas; en reticulares la dirección no importa"],
        ["Regla nemotécnica de carga de un puntal", "Un puntal, 1.000 kg"],
        ["¿Dónde colocar las líneas de puntales en un forjado?", "En el centro (máximo momento flector) y como referencia a 1/5 de la luz (momento flector cero)"],
        ["¿Hasta dónde se llevan los apeos?", "Siempre hasta suelo firme, de abajo arriba y con las líneas de puntales alineadas en vertical"],
        ["¿Qué es el apeo en asnillas?", "Apeo de viga con tornapuntas sobre una durmiente atirantada, para cuando hay riesgo de movimientos laterales"],
        ["Ángulos de trabajo de los tornapuntas", "60-75° con la durmiente en muros de carga o fachadas; 45° en muros de contención"],
        ["¿Qué es un apeo volante o acodalado?", "El que apoya un muro en otro próximo mediante codales y jabalcones a 45°, sin apoyos en el suelo"],
      ],
      preguntas: [
        ["facil", "¿Cómo se colocan los puntales respecto a las viguetas?", ["Perpendiculares", "Paralelos", "Da igual siempre"], "IVASPE M2-T11."],
        ["media", "¿Qué ángulo usa el apeo inclinado de un muro de contención?", ["45°", "75°", "90°"], "IVASPE M2-T11."],
        ["media", "¿Qué se hace para liberar de cargas una jácena con un muro encima?", ["Una viga aguja que atraviesa el muro", "Un tirante al techo", "Nada"], "IVASPE M2-T11."],
        ["media", "¿Qué hay que tener en cuenta al apear un pilar de una planta intermedia?", ["Recoger las cargas de los pilares superiores", "Solo el tramo dañado", "Nada"], "IVASPE M2-T11."],
        ["dificil", "¿Dónde está el momento flector máximo de un voladizo?", ["En su cara superior, a diferencia del forjado", "En su cara inferior", "En el suelo"], "IVASPE M2-T11."],
        ["media", "¿Qué elemento del apeo inclinado está en contacto con el muro?", ["La zapata mural", "La durmiente", "El codal"], "IVASPE M2-T11."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["¿Desde qué profundidad debe entibarse una zanja según el manual?", "Cuando supera 1,30 m"],
        ["Tipos de entibación", "Ligera (terreno cohesionado o rescate urgente), semicuajada (cubre el 50 %) y cuajada (terreno sin cohesión, cubre todo)"],
        ["¿Qué son las cimbras?", "Los apeos de arcos y bóvedas; la parte vertical y la inclinada se encuentran en la imposta"],
        ["¿Por qué se apean los huecos de puertas y ventanas?", "Porque son discontinuidades en la transmisión de cargas y puntos vulnerables del muro"],
        ["Elementos horizontales de un apeo", "Sopandas (bajo el elemento apeado), durmientes (sobre el suelo), puentes, codales y agujas"],
        ["Elementos verticales e inclinados", "Puntales o rollizos, pies derechos, virotillos, zapatas murales; tornapuntas, jabalcones y riostras"],
        ["Material auxiliar de apeos", "Bridas, cuñas, ejiones y muletillas, y clavos o puntas"],
      ],
      preguntas: [
        ["facil", "¿Qué pieza reparte las cargas sobre el suelo?", ["La durmiente", "La sopanda", "El codal"], "IVASPE M2-T11."],
        ["media", "¿Qué entibación se usa en arenas o gravas?", ["Cuajada", "Ligera", "Ninguna"], "IVASPE M2-T11."],
        ["media", "¿Qué pieza va en contacto directo bajo un forjado o dintel?", ["La sopanda", "La durmiente", "La riostra"], "IVASPE M2-T11."],
        ["media", "¿Qué es un ejión?", ["Un pequeño taco de madera que sirve de tope en los ensambles", "Un tipo de puntal", "Una grieta"], "IVASPE M2-T11."],
        ["dificil", "¿Qué encuentro de tornapunta es el más utilizado?", ["Pico de flauta", "Boca de perro", "Cola de milano"], "IVASPE M2-T11."],
        ["media", "¿Cuánto debe penetrar un clavo en la última pieza?", ["2/3 de su grosor", "Nada", "1 mm"], "IVASPE M2-T11."],
      ],
    },
  ],
  glosario: [
    [S1, "Hueco de supervivencia", "Espacio que queda tras un colapso donde una víctima puede seguir con vida."],
    [S2, "Apuntalamiento", "Apeo de urgencia ejecutado ante un riesgo inminente de colapso."],
    [S2, "Puntal telescópico", "Puntal de dos tubos de acero que se ajusta en longitud mediante rosca (UNE-EN 1065)."],
    [S3, "Cruz de San Andrés", "Arriostramiento en aspa que triangula los pies derechos para dar estabilidad."],
    [S4, "Tornapunta", "Puntal inclinado que transmite las cargas del elemento apeado a la durmiente."],
    [S4, "Viga aguja", "Pieza que atraviesa un muro para recoger sus cargas y transmitirlas a pies derechos."],
    [S5, "Sopanda", "Pieza horizontal en contacto con el elemento apeado que reparte su carga a los puntales."],
    [S5, "Entibación", "Apeo que contiene las paredes de una zanja o excavación."],
  ],
  casos: [
    {
      slug: "caso-explosion-gas-edificio",
      titulo: "Derrumbe parcial por explosión de gas",
      supuesto: "Una explosión de gas a las 16:00 ha derrumbado parte de un edificio de viviendas de hormigón armado. Hay vecinos buscando entre los escombros y una mujer mayor desaparecida.",
      preguntas: [
        [S1, "facil", "¿Qué se hace primero con los vecinos que buscan entre el escombro?", ["Retirarlos y controlar el caos", "Dejarles seguir", "Darles herramientas"], "IVASPE M2-T11."],
        [S1, "media", "¿Dónde no puede haber vehículos?", ["En la zona roja o caliente", "En la zona fría", "En ningún sitio"], "IVASPE M2-T11."],
        [S1, "media", "¿Qué información ayuda a localizar a la mujer?", ["Sus costumbres a esa hora y la distribución de la vivienda", "Su ropa", "Su matrícula"], "IVASPE M2-T11."],
        [S1, "media", "¿Qué riesgos secundarios hay que cortar?", ["Gas, agua y electricidad", "La música", "El tráfico aéreo"], "IVASPE M2-T11."],
        [S1, "media", "¿Cómo se retira el escombro si puede haber víctimas?", ["A mano, sacándolo fuera de la zona", "Con excavadora", "Apilándolo encima"], "IVASPE M2-T11."],
        [S1, "media", "¿Cómo se mueve un rescatador por el escombro?", ["Acompañado a 3-4 m y comprobando dónde pisa", "Solo y deprisa", "Saltando"], "IVASPE M2-T11."],
        [S1, "media", "¿Qué figura vigila las partes inestables?", ["El vigía", "El conductor", "Un vecino"], "IVASPE M2-T11."],
        [S3, "media", "Si hay que hacer una galería entre forjados, ¿qué se hace antes?", ["Apuntalar la zona", "Nada", "Quitar los pilares"], "IVASPE M2-T11."],
        [S1, "dificil", "¿Qué hace un rescatador en una galería si hay una réplica y no le da tiempo a salir?", ["Quedarse en posición fetal en zona más segura", "Correr siempre", "Gritar"], "IVASPE M2-T11."],
        [S1, "media", "¿Qué víctimas requieren técnicas específicas de localización?", ["Las ocultas", "Las de superficie", "Ninguna"], "IVASPE M2-T11."],
      ],
    },
    {
      slug: "caso-forjado-tejado-hundido",
      titulo: "Tejado hundido sobre un forjado",
      supuesto: "En una casa antigua, parte del tejado se ha hundido sobre el forjado de la primera planta, que está muy flechado; la viga que lo sostiene está dañada.",
      preguntas: [
        [S3, "facil", "¿Qué fase va antes de decidir si apuntalar?", ["La inspección", "La demolición", "El montaje"], "IVASPE M2-T11."],
        [S4, "media", "¿Cómo se colocan las líneas de puntales?", ["Perpendiculares a las viguetas", "Paralelas a ellas", "Al azar"], "IVASPE M2-T11."],
        [S4, "media", "¿Dónde se planta el puntal en una viga flexionada?", ["Hacia el centro, máximo momento flector", "En los apoyos", "Fuera"], "IVASPE M2-T11."],
        [S4, "media", "¿Hasta dónde se lleva el apeo?", ["Hasta suelo firme", "Al forjado inferior sin más", "A la cubierta"], "IVASPE M2-T11."],
        [S2, "media", "¿Qué carga aproximada se asigna a cada puntal por regla nemotécnica?", ["1.000 kg", "100 kg", "10.000 kg"], "IVASPE M2-T11."],
        [S3, "media", "¿Cómo se templa el apeo de madera?", ["Con parejas de cuñas enfrentadas", "A martillazos en el techo", "Con cola"], "IVASPE M2-T11."],
        [S3, "media", "¿Qué se descuenta al medir el pie derecho?", ["Sopanda, durmiente y unos 2 cm", "Nada", "Un metro"], "IVASPE M2-T11."],
        [S4, "media", "Si se prevén movimientos laterales de la viga, ¿qué apeo se usa?", ["En asnillas", "Volante", "Entibación"], "IVASPE M2-T11."],
        [S3, "dificil", "¿Por qué se arriostra con cruz de San Andrés?", ["Para triangular y que el conjunto no se desplace", "Por estética", "Para colgar herramientas"], "IVASPE M2-T11."],
        [S2, "media", "¿Qué tipo de apeo es este si se hace de inmediato para evitar el colapso?", ["De urgencia", "Supletorio", "Refuerzo de recuperación"], "IVASPE M2-T11."],
      ],
    },
    {
      slug: "caso-zanja-trabajador-atrapado",
      titulo: "Trabajador atrapado en una zanja",
      supuesto: "En una obra, un trabajador ha quedado atrapado hasta la cintura por un desprendimiento en una zanja de 2 m de profundidad en terreno arenoso.",
      preguntas: [
        [S5, "facil", "¿A partir de qué profundidad hay que entibar según el manual?", ["1,30 m", "5 m", "0,5 m"], "IVASPE M2-T11."],
        [S5, "media", "¿Qué entibación corresponde a un terreno arenoso sin cohesión?", ["Cuajada", "Ligera", "Ninguna"], "IVASPE M2-T11."],
        [S5, "media", "¿Cuándo se acepta una entibación ligera aunque el terreno sea flojo?", ["Cuando no admite demora por rescate de personas sepultadas", "Nunca", "Siempre"], "IVASPE M2-T11."],
        [S2, "media", "¿Qué elementos son muy útiles como codales en zanjas?", ["Puntales metálicos cortos", "Cuerdas", "Mangueras"], "IVASPE M2-T11."],
        [S5, "media", "¿Cómo se colocan las cuñas en los cabeceros?", ["Para que al apoyarse el sistema se comprima y no se suelte el codal", "Sueltas", "Hacia arriba sin más"], "IVASPE M2-T11."],
        [S5, "media", "¿Qué pieza mantiene la separación entre las dos paredes?", ["El codal", "La durmiente", "La sopanda"], "IVASPE M2-T11."],
        [S1, "media", "¿Qué se hace con los acopios de tierra junto a la zanja?", ["No sobrecargar el borde inestable", "Apilar más tierra", "Nada"], "Seguridad en derrumbes, IVASPE M2-T11."],
        [S3, "media", "¿Dónde se preparan las tablas y codales?", ["En la zona templada", "Dentro de la zanja", "En el parque"], "IVASPE M2-T11."],
        [S5, "dificil", "En la semicuajada, ¿qué porcentaje del terreno cubre el panel?", ["El 50 %", "El 100 %", "El 10 %"], "IVASPE M2-T11."],
        [S1, "media", "¿Quién vela por la seguridad de los rescatadores durante la maniobra?", ["El responsable de seguridad", "El atrapado", "Nadie"], "IVASPE M2-T11."],
      ],
    },
  ],
});
