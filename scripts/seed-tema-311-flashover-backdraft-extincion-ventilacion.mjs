/**
 * Crea tema-311 — Tema 16 de Bombero/a Conductor/a: "Incendios de
 * interiores. Desarrollo de incendios de interiores. Fenómenos asociados,
 * Flashover, Backdraft y explosión de humos. Técnicas de extinción.
 * Ventilación."
 *
 * Fuente: la bibliografía oficial de la Escuela de Bomberos de Zaragoza
 * remite este tema al "Manual básico IVASPE para bomberos de nuevo ingreso"
 * (nov. 2017). Leído íntegro el Módulo 1, Tema 2 (págs. 57-140 del PDF);
 * este tema cubre sus apartados 2.1.3 (flashover), 3.5 (backdraught), 4
 * (explosión de gases de incendio), 5 (zonas de indefinición), 6 (técnicas
 * de extinción) y 7 (ventilación, con los ensayos NIST que resume el
 * manual). Conocimiento técnico sin norma legal: se ciñe al manual.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-311-flashover-backdraft-extincion-ventilacion.mjs
 */
import { sembrarTema, BOMBERO } from "./lib/sembrar-tema.mjs";

const IVASPE = "https://www.valencia.es/documents/d/guest/manual-20bomberos-pdf";
const BIBLIO = BOMBERO.escuela("Bibliografia_externa_recomendada_temario_BNI.pdf");
const S1 = "flashover";
const S2 = "backdraft";
const S3 = "explosion-gases-incendio";
const S4 = "tecnicas-extincion";
const S5 = "ventilacion-presion-positiva";

await sembrarTema({
  tema: {
    slug: "tema-311",
    titulo: "Incendios de interiores (II): flashover, backdraft, explosión de humos, técnicas de extinción y ventilación",
    descripcion: "Flashover (definición ISO, condiciones, signos); backdraught (definición ISO 13943, condiciones, señales de peligro, actuación); explosión de gases de incendio y presiones de colapso; diferencias entre fenómenos; ataque indirecto, directo, enfriamiento de gases 3D con pulsaciones, método de ataque ofensivo, ataque exterior ofensivo; ventilación natural, efecto Venturi y ventilación con presión positiva.",
    contenido: "Sigue el Manual básico IVASPE (Módulo 1, Tema 2), que la Escuela de Bomberos de Zaragoza recomienda para este tema: cómo reconocer los fenómenos más peligrosos de un incendio de interior (flashover, backdraft y explosión de humos), cómo se aplica el agua para enfriar los gases y avanzar con seguridad, y cuándo y cómo ventilar con ventiladores de presión positiva.",
    enlaces_boe: [
      { url: IVASPE, titulo: "Manual básico IVASPE para bomberos de nuevo ingreso (nov. 2017) — Módulo 1, Tema 2" },
      { url: BIBLIO, titulo: "Escuela de Bomberos de Zaragoza — Bibliografía externa recomendada (remite el Tema 16 al Manual IVASPE)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "Flashover", articulos: "IVASPE M1-T2, apartado 2.1.3", url: IVASPE },
      { seccion: S2, titulo: "Backdraught / backdraft", articulos: "IVASPE M1-T2, apartado 3.5", url: IVASPE },
      { seccion: S3, titulo: "Explosión de gases de incendio y diferencias entre fenómenos", articulos: "IVASPE M1-T2, apartados 4 y 5", url: IVASPE },
      { seccion: S4, titulo: "Técnicas de extinción", articulos: "IVASPE M1-T2, apartado 6", url: IVASPE },
      { seccion: S5, titulo: "Ventilación", articulos: "IVASPE M1-T2, apartado 7", url: IVASPE },
    ],
  },
  vinculo: { oposicion: BOMBERO.oposicion, bloqueId: BOMBERO.bloqueParteII, numero: 16 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Definición ISO de flashover", "La transición rápida al estado en que todas las superficies de los materiales de un compartimento se ven involucradas en un incendio"],
        ["Valores que suelen asociarse al flashover", "Más de 600 °C en el cojín de gases y más de 20 kW/m² de calor radiante"],
        ["¿Qué tipo de llamas controla un flashover?", "Llamas de difusión"],
        ["Signos de flashover inminente", "Subida drástica de temperatura, descenso rápido del plano neutro, llamas en la cara inferior del cojín, más gases saliendo, todo humea (piroliza) y llamas por el techo"],
        ["¿Cuánto puede tardar en pasar de 'calma' a flashover?", "En ensayos a escala real, alrededor de 20 segundos"],
        ["¿Es el color del humo un indicador suficiente?", "No: debe sopesarse junto con otros indicadores, porque depende del material y de si arde con o sin llama"],
      ],
      preguntas: [
        ["facil", "¿Qué posibilidades de supervivencia tienen los ocupantes de un recinto en flashover?", ["En teoría, ninguna", "Muchas", "Depende del color del humo"], "IVASPE M1-T2."],
        ["media", "¿Genera el flashover un incremento significativo de presión?", ["No", "Sí, de varios bares", "Solo en sótanos"], "IVASPE M1-T2."],
        ["media", "¿Qué caudal de lanza normal resulta insuficiente según el manual?", ["Incendios de más de 15-20 MW", "Incendios de 100 kW", "Cualquier incendio"], "IVASPE M1-T2."],
        ["media", "¿Qué le pasa al plano neutro antes del flashover?", ["Desciende rápidamente", "Sube", "Desaparece hacia arriba"], "IVASPE M1-T2."],
        ["dificil", "¿Cuál es el objetivo táctico respecto al flashover?", ["Apagar el incendio antes de que se produzca", "Esperar a que pase", "Provocarlo"], "IVASPE M1-T2."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Definición de backdraught en la ISO 13943 (2012)", "Combustión con llama rápida causada por la introducción repentina de aire en un espacio confinado deficiente en oxígeno que contiene productos calientes de la combustión incompleta"],
        ["¿Backdraught o backdraft?", "Significan lo mismo: el primero es inglés británico y el segundo estadounidense"],
        ["Características de un backdraught", "Gases no quemados acumulados, corriente rica en aire, zona bien mezclada, fuente de ignición en esa zona, deflagración turbulenta y bola de fuego al exterior"],
        ["Factores que favorecen un backdraught", "Fuente de ignición en la zona de mezcla, combustible alto en el recinto, aberturas originales bajas y de tamaño intermedio, y buen aislamiento térmico"],
        ["Señales de peligro antes de abrir", "Espacio confinado con mínima ventilación, depósitos aceitosos en cristales, puertas y ventanas calientes, humo pulsando por rendijas y silbidos"],
        ["Señales al abrir la puerta", "Resplandor naranja o fuego no visible, gases succionados hacia dentro, plano neutro cerca del suelo y silbido"],
        ["¿Cómo se ventila ante riesgo de backdraught?", "Hacia el exterior y por la parte más alta posible del recinto, con una vía clara de salida de los gases"],
      ],
      preguntas: [
        ["facil", "¿Qué desencadena un backdraught?", ["La entrada repentina de aire en un recinto con poco oxígeno y gases calientes", "Un exceso de agua", "La electricidad"], "IVASPE M1-T2."],
        ["media", "¿Qué indican los depósitos de aceite en los cristales?", ["Un incendio poco ventilado cuyos productos de pirólisis se han condensado", "Que está apagado", "Que hubo cocina"], "IVASPE M1-T2."],
        ["media", "¿Qué tipos de llama hay en un backdraught?", ["Premezcladas y de difusión", "Solo de difusión", "Ninguna"], "IVASPE M1-T2."],
        ["media", "¿Cuál es una forma de entrada en salvamento ante riesgo de backdraught?", ["Abrir, enfriar, cerrar rápido y repetir", "Abrir de par en par y esperar", "Romper todas las ventanas a la vez"], "IVASPE M1-T2."],
        ["dificil", "¿Dónde no debe situarse el bombero al abrir?", ["En la trayectoria de la puerta abierta", "Junto a la pared", "Agachado"], "IVASPE M1-T2."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["¿Qué es una explosión de gases de incendio?", "La ignición de una mezcla muy homogénea de gases del incendio y aire, normalmente en un recinto contiguo, que provoca un fuerte aumento de presión"],
        ["¿Es una deflagración o una detonación?", "Una deflagración"],
        ["Diferencia esencial con el backdraught", "El backdraught requiere un cambio en la ventilación del recinto incendiado; la explosión de gases ocurre en un espacio (a menudo contiguo) sin aberturas"],
        ["Factores de la potencia de la explosión", "Tamaño de huecos, concentración de premezcla, resistencia de los elementos, velocidad de combustión y factor de expansión"],
        ["Presiones de colapso orientativas", "Ventanas 20-70 mbar, puertas 20-30, tabiques de pladur 30-50, ladrillo de 10 cm 200-300 mbar"],
        ["¿Cómo se distinguen flashover y explosión de gases?", "Fácilmente: el flashover implica llamas de difusión y la explosión de gases, llamas premezcladas"],
      ],
      preguntas: [
        ["facil", "¿Dónde suelen producirse las explosiones de gases de incendio?", ["En recintos contiguos al incendiado", "Al aire libre", "Solo en el foco"], "IVASPE M1-T2."],
        ["media", "¿Qué espacios ocultos favorecen la acumulación de gases?", ["Entre techo y falso techo y bajo tejados", "Los balcones", "Las aceras"], "IVASPE M1-T2."],
        ["media", "¿Qué precaución es clave al ventilar un recinto contiguo con gases?", ["No provocar chispas", "Usar un mechero", "Cerrar todo"], "IVASPE M1-T2."],
        ["media", "¿Qué elemento colapsa con menor presión de la tabla del manual?", ["Las puertas de las habitaciones (20-30 mbar)", "La pared de ladrillo de 10 cm", "Ninguno"], "IVASPE M1-T2."],
        ["dificil", "¿Es cierto que solo cerca del punto estequiométrico la presión es grande?", ["No, puede ser muy elevada también cerca de los límites", "Sí", "Solo con GLP"], "IVASPE M1-T2."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["¿Qué es el ataque indirecto?", "Proyectar agua pulverizada contra superficies calientes para generar mucho vapor; solo desde el exterior y sin víctimas dentro"],
        ["¿Cuándo es útil el ataque directo?", "En incendios incipientes o exteriores, para rematar y cuando el foco es accesible; se aplica con chorro o cono mínimo al foco"],
        ["¿Qué busca el enfriamiento de gases (3D)?", "Proyectar agua pulverizada en pulsaciones dentro del cojín de gases para enfriarlos y contraerlos, elevando el plano neutro"],
        ["¿Qué tamaño de gota y cuántas se buscan?", "Unos 0,3 mm; unos 200 millones de gotas por m³ de llama (unos 2,83 litros)"],
        ["Tipos de pulsaciones", "Cortas (unos 100 l/min, para control de temperatura), largas y largas con barrido (150-300 l/min o más)"],
        ["Pasos del método de ataque ofensivo", "Asegurar la entrada/salida, control de temperatura, ataque a los gases/llamas, pintar paredes y ataque directo"],
        ["¿Qué es el ataque exterior ofensivo (transicional)?", "Chorro sólido de 150-300 l/min a un punto fijo del techo durante 5-30 segundos desde el exterior para reducir la potencia del incendio"],
      ],
      preguntas: [
        ["facil", "¿Desde dónde se aplica el ataque indirecto?", ["Desde el exterior del recinto", "Desde dentro", "Desde el tejado siempre"], "IVASPE M1-T2."],
        ["media", "¿Qué efecto tiene el exceso de agua en el cojín de gases?", ["Genera mucho vapor, baja el plano neutro y puede quemar", "Mejora la visibilidad siempre", "Ninguno"], "IVASPE M1-T2."],
        ["media", "¿Para qué sirve 'pintar paredes'?", ["Para detener la pirólisis de las superficies calientes que se dejan atrás", "Para decorar", "Para marcar la salida"], "IVASPE M1-T2."],
        ["media", "¿Qué indica que el agua de la pulsación sobre la cabeza vuelva a caer?", ["Que la zona superior está lo bastante fría para avanzar", "Que hay flashover", "Que no hay gases"], "IVASPE M1-T2."],
        ["dificil", "¿Quién desarrolló el método de ataque ofensivo y dónde?", ["Krister Giselsson, en Suecia, a principios de los 80", "Humphrey Davy, en 1815", "La NFPA en 2007"], "IVASPE M1-T2."],
        ["dificil", "¿Por qué el ataque exterior ofensivo debe hacerse con chorro sólido?", ["Porque en cono puede bloquear la salida de gases y desplazarlos por el interior", "Porque gasta menos", "Por estética"], "IVASPE M1-T2."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["¿En qué principio se basa la ventilación?", "En el efecto Venturi, explicado por el teorema de Bernoulli: al reducirse la sección aumenta la velocidad y baja la presión"],
        ["¿Qué es la ventilación con presión positiva (VPP)?", "Introducir aire con un ventilador para sobrepresionar el recinto y expulsar humo, calor y gases por una abertura de salida"],
        ["¿A qué distancia y ángulo se coloca el ventilador según los ensayos NIST?", "A 1,2-1,8 m de la puerta (el manual cita también 1,82-3 m) con elevación de al menos 5°, de forma que el cono cubra el hueco"],
        ["Ventajas de la VPP", "Reduce los gases (evita backdraft y explosiones), facilita rescates, reduce la exposición térmica y limpia rápido tras el incendio"],
        ["Efectos de la VPP en el ensayo NIST de una habitación", "Aumentó la velocidad de combustión un 60 % al inicio y +2 MW de pico, pero bajó temperaturas y despejó el pasillo"],
        ["¿Cuánto esperar para entrar tras arrancar el ventilador según el ensayo?", "Entre 60 y 120 segundos, para que se estabilicen los flujos"],
        ["¿Qué disposición de varios ventiladores fue más eficaz?", "En V, mejor que en serie"],
      ],
      preguntas: [
        ["facil", "¿Qué genera el ventilador de presión positiva en el recinto?", ["Sobrepresión", "Vacío", "Agua"], "IVASPE M1-T2."],
        ["media", "¿Dónde debe practicarse la abertura de salida para aprovechar el tiro natural?", ["Lo más cerca posible del foco", "Lejos del foco", "En el sótano"], "IVASPE M1-T2."],
        ["media", "¿Por qué conviene tener una sola entrada y una sola salida?", ["Para no perder caudal y presión del ventilador", "Por estética", "Para que haya más humo"], "Igual que una línea de mangueras."],
        ["media", "¿Basta con colocar ventiladores solo en la base de la escalera de un edificio alto?", ["No resultó efectivo en los ensayos", "Sí, siempre", "No se usan ventiladores"], "IVASPE M1-T2."],
        ["dificil", "¿Qué velocidad de salida por la ventana generó la VPP frente a la natural?", ["Unos 20 m/s frente a 12 m/s", "1 m/s frente a 2 m/s", "100 m/s frente a 1 m/s"], "Ensayo NIST resumido en el manual."],
        ["media", "¿Cómo se limpia de humo un edificio tras el incendio con VPP?", ["Planta a planta, de abajo arriba, cerrando cada una al terminar", "Abriendo todo a la vez", "De arriba abajo sin cerrar"], "IVASPE M1-T2."],
      ],
    },
  ],
  glosario: [
    [S1, "Flashover", "Transición súbita de un incendio en crecimiento a incendio totalmente desarrollado, con todas las superficies del recinto ardiendo."],
    [S2, "Backdraught", "Combustión rápida de los gases no quemados al introducirse aire bruscamente en un recinto pobre en oxígeno."],
    [S2, "Corriente de gravedad", "Flujo de aire que entra por la parte baja de una abertura impulsado por la diferencia de densidad con los gases del incendio."],
    [S3, "Explosión de gases de incendio", "Deflagración de una mezcla homogénea de gases de incendio y aire, generalmente en un recinto contiguo."],
    [S4, "Enfriamiento de gases (3D)", "Técnica de proyectar agua pulverizada en pulsaciones dentro del cojín de gases para enfriarlos y contraerlos."],
    [S4, "Efecto Davy", "Zona sin llama de alrededor de 1 mm que se forma en torno a cada partícula o gota introducida en la llama."],
    [S5, "VPP", "Ventilación con presión positiva mediante ventiladores que sobrepresionan el recinto."],
    [S5, "Efecto Venturi", "Aumento de velocidad y caída de presión de un fluido al estrecharse la sección por la que pasa."],
  ],
  casos: [
    {
      slug: "caso-piso-cerrado-cristales-aceitosos",
      titulo: "Ventanas con depósitos aceitosos",
      supuesto: "Un piso lleva tiempo con fuego y todo cerrado. Los cristales tienen depósitos oscuros y aceitosos, la puerta está muy caliente y sale humo a pulsos por las rendijas con un silbido.",
      preguntas: [
        [S2, "facil", "¿Qué fenómeno indican estas señales?", ["Riesgo de backdraught", "Autoextinción segura", "Un incendio apagado"], "IVASPE M1-T2."],
        [S2, "media", "¿Qué indica la puerta caliente?", ["Que el incendio lleva tiempo activo con ventilación limitada", "Nada", "Que hay agua"], "IVASPE M1-T2."],
        [S2, "media", "¿Cuál sería la ventilación preferible?", ["Hacia la calle, por la parte más alta del recinto", "Abrir la puerta de golpe", "Por el suelo"], "IVASPE M1-T2."],
        [S2, "media", "Si hay que entrar a rescatar, ¿qué método se usa?", ["Abrir, enfriar, cerrar y repetir hasta bajar temperatura y presión", "Entrar corriendo", "Esperar una hora"], "IVASPE M1-T2."],
        [S4, "media", "¿Qué se hace con la lanza antes de abrir del todo?", ["Proyectar un poco de agua en el hueco entre puerta y marco", "Nada", "Echar espuma"], "IVASPE M1-T2."],
        [S2, "media", "Al abrir, ¿qué señal confirmaría el peligro?", ["Que el humo sea succionado hacia dentro", "Que salga aire limpio", "Que haga frío"], "IVASPE M1-T2."],
        [S2, "media", "¿Qué produce un backdraught en el exterior?", ["Una bola de fuego por la abertura", "Lluvia", "Nada"], "IVASPE M1-T2."],
        [S5, "dificil", "¿Por qué se usa la VPP con precaución en este escenario?", ["Puede favorecer la mezcla de gases con el aire o desplazarlos a otras zonas", "Porque no funciona", "Porque es ilegal"], "IVASPE M1-T2."],
        [S1, "media", "¿Qué tipo de llamas predomina en un flashover, para diferenciarlo?", ["De difusión", "Solo premezcladas", "Ninguna"], "IVASPE M1-T2."],
        [S2, "media", "¿Dónde se coloca el bombero que abre la puerta?", ["En el lado seguro, fuera de la trayectoria de la puerta", "Delante de la puerta", "Encima"], "IVASPE M1-T2."],
      ],
    },
    {
      slug: "caso-avance-pasillo-ataque-ofensivo",
      titulo: "Avance por un pasillo con gases calientes",
      supuesto: "Un binomio entra en una vivienda para buscar a una persona. El pasillo tiene un cojín de gases denso y caliente sobre sus cabezas y el foco está al fondo.",
      preguntas: [
        [S4, "facil", "¿Qué se hace nada más entrar?", ["Control de temperatura con pulsaciones cortas sobre la cabeza", "Ataque indirecto", "Abrir todas las ventanas"], "IVASPE M1-T2."],
        [S4, "media", "¿Qué técnica permite avanzar con seguridad?", ["Enfriamiento de gases con pulsaciones", "Chorro sólido al suelo", "Ataque indirecto"], "IVASPE M1-T2."],
        [S4, "media", "¿Qué hay que evitar con la cantidad de agua?", ["El exceso, que genera vapor y quemaduras", "El defecto nunca importa", "Nada"], "IVASPE M1-T2."],
        [S4, "media", "¿Qué se hace con las superficies calientes que se dejan atrás?", ["Pintar paredes para cortar la pirólisis", "Nada", "Prenderlas"], "IVASPE M1-T2."],
        [S4, "media", "¿Qué hace un tercer bombero en la puerta de acceso?", ["Controla la puerta y vigila que los gases que salen no se inflamen", "Se va", "Ventila con VPP siempre"], "IVASPE M1-T2."],
        [S1, "media", "Si la temperatura sube drásticamente y aparecen llamas bajo el cojín, ¿qué ocurre?", ["Flashover inminente: hay que protegerse o retirarse", "Todo va bien", "Hay que dejar de echar agua"], "IVASPE M1-T2."],
        [S4, "media", "Cuando se alcanza el foco, ¿qué técnica se emplea?", ["Ataque directo con el caudal mínimo necesario", "Ataque indirecto", "Ninguna"], "IVASPE M1-T2."],
        [S4, "dificil", "¿Por qué es peligroso el ataque indirecto con víctimas dentro?", ["Genera grandes cantidades de vapor a alta temperatura", "Porque no apaga", "Porque es lento"], "IVASPE M1-T2."],
        [S4, "media", "¿Qué tres opciones debe considerar siempre el binomio?", ["Mantener la posición, avanzar o retirarse", "Correr, saltar o gritar", "Ninguna"], "IVASPE M1-T2."],
        [S4, "dificil", "¿Qué presión en punta de lanza con mangueras de 45 mm cita el manual?", ["Unos 7 bar", "Unos 70 bar", "0,5 bar"], "IVASPE M1-T2."],
      ],
    },
    {
      slug: "caso-humo-escalera-vpp",
      titulo: "Escalera llena de humo",
      supuesto: "Tras extinguir un incendio en un tercer piso, la escalera común está llena de humo y hay vecinos que quieren bajar. Se dispone de un ventilador de presión positiva.",
      preguntas: [
        [S5, "facil", "¿Dónde se coloca el ventilador?", ["En el acceso del edificio, cubriendo el hueco con su cono", "En la azotea apuntando abajo", "Dentro del piso quemado"], "IVASPE M1-T2."],
        [S5, "media", "Si se quiere limpiar la escalera, ¿qué se hace con la vivienda incendiada?", ["Cerrarla y extraer el humo de la escalera", "Abrirla del todo", "Nada"], "IVASPE M1-T2."],
        [S5, "media", "¿Cómo se limpia todo el edificio?", ["Planta a planta de abajo arriba, cerrando cada planta al terminar", "Todo a la vez", "De arriba abajo"], "IVASPE M1-T2."],
        [S5, "media", "¿Qué inconveniente de los ventiladores observaron los ensayos?", ["El ruido puede interferir con las comunicaciones", "Que no mueven aire", "Que apagan las luces"], "IVASPE M1-T2."],
        [S5, "media", "¿Es relevante el CO de los ventiladores de gasolina frente al del incendio?", ["No, fue despreciable", "Sí, mucho mayor", "No generan nada"], "IVASPE M1-T2."],
        [S5, "media", "¿Qué ángulo de elevación mínimo se recomienda?", ["Unos 5 grados", "45 grados", "90 grados"], "IVASPE M1-T2."],
        [S5, "dificil", "En un edificio alto con fuego en la planta 20, ¿dónde se ponen ventiladores?", ["En la base de la escalera y otro cerca de la planta 18", "Solo en la planta 30", "Solo en la calle"], "IVASPE M1-T2."],
        [S5, "media", "¿Qué teorema explica el efecto Venturi?", ["El de Bernoulli", "El de Pitágoras", "El de Arquímedes"], "IVASPE M1-T2."],
        [S5, "media", "¿Para qué más sirve la VPP además de extraer humo?", ["Para proteger recintos y vías de evacuación de la entrada de gases", "Para calentar", "Para regar"], "IVASPE M1-T2."],
        [S3, "media", "Si quedan gases acumulados en un falso techo, ¿qué riesgo hay?", ["Explosión de gases de incendio", "Ninguno", "Inundación"], "IVASPE M1-T2."],
      ],
    },
  ],
});
