/**
 * Crea tema-310 — Tema 15 de Bombero/a Conductor/a: "Incendios de
 * interiores. Desarrollo de incendios de interiores. Comportamiento del
 * fuego. Incendios limitados por combustible. Incendios limitados por
 * ventilación. Diferencias."
 *
 * Fuente: la bibliografía oficial de la Escuela de Bomberos de Zaragoza
 * remite este tema al "Manual básico IVASPE para bomberos de nuevo ingreso"
 * (nov. 2017). Leído íntegro el Módulo 1, Tema 2 "Incendios de interiores:
 * desarrollo de incendios de interiores" (págs. 57-140 del PDF publicado en
 * la web del Ayuntamiento de València); este tema cubre sus apartados 1, 2
 * (salvo el flashover, que va con el Tema 16) y 3.1-3.4. Conocimiento
 * técnico sin norma legal: se ciñe al manual.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-310-incendios-interiores-desarrollo.mjs
 */
import { sembrarTema, BOMBERO } from "./lib/sembrar-tema.mjs";

const IVASPE = "https://www.valencia.es/documents/d/guest/manual-20bomberos-pdf";
const BIBLIO = BOMBERO.escuela("Bibliografia_externa_recomendada_temario_BNI.pdf");
const S1 = "factores-combustible-propagacion";
const S2 = "recinto-ventilacion-cerramientos";
const S3 = "fases-desarrollo-incendio";
const S4 = "combustible-vs-ventilacion";
const S5 = "ventilacion-limitada-escenarios";

await sembrarTema({
  tema: {
    slug: "tema-310",
    titulo: "Incendios de interiores (I): comportamiento del fuego, fases y control por combustible o por ventilación",
    descripcion: "Factores del incendio en un recinto: tipo y ubicación del combustible, inercia térmica, dirección y geometría de las superficies, volumen y altura del recinto, huecos de ventilación, cerramientos y vías de propagación; fases (ignición, crecimiento, flashover, totalmente desarrollado, decaimiento); incendios controlados por combustible y por ventilación; pulsaciones, autoextinción, reanudación y autoignición de los gases.",
    contenido: "Sigue el Manual básico IVASPE (Módulo 1, Tema 2), que la Escuela de Bomberos de Zaragoza recomienda para este tema: qué hace que un incendio dentro de una habitación crezca rápido o lento, por qué fases pasa, cómo distinguir si está limitado por el combustible o por la falta de aire y qué puede pasar cuando un incendio con poco oxígeno recibe aire de golpe.",
    enlaces_boe: [
      { url: IVASPE, titulo: "Manual básico IVASPE para bomberos de nuevo ingreso (nov. 2017) — Módulo 1, Tema 2" },
      { url: BIBLIO, titulo: "Escuela de Bomberos de Zaragoza — Bibliografía externa recomendada (remite el Tema 15 al Manual IVASPE)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "Combustible y propagación de las llamas", articulos: "IVASPE M1-T2, apartados 1.1-1.2", url: IVASPE },
      { seccion: S2, titulo: "Geometría del recinto, huecos, cerramientos y vías de propagación", articulos: "IVASPE M1-T2, apartados 1.3-1.6", url: IVASPE },
      { seccion: S3, titulo: "Fases del desarrollo del incendio", articulos: "IVASPE M1-T2, apartado 2", url: IVASPE },
      { seccion: S4, titulo: "Incendios controlados por combustible y por ventilación: diferencias", articulos: "IVASPE M1-T2, apartados 2 y 3", url: IVASPE },
      { seccion: S5, titulo: "Recintos con ventilación limitada: pulsaciones, autoextinción, reanudación y autoignición", articulos: "IVASPE M1-T2, apartados 3.1-3.4", url: IVASPE },
    ],
  },
  vinculo: { oposicion: BOMBERO.oposicion, bloqueId: BOMBERO.bloqueParteII, numero: 15 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["¿Cómo arden los materiales sintéticos frente a los muebles de madera?", "Los sintéticos (polímeros porosos y ligeros) arden más rápido y durante menos tiempo; la madera da evoluciones lentas pero prolongadas"],
        ["¿Cuántos gases combustibles deben emitir la madera y los plásticos para arder?", "Unos 2 g/m²·s la madera o el papel y 1 g/m²·s los plásticos, de mayor contenido energético"],
        ["¿Qué es la inercia térmica (kρc)?", "El producto de conductividad, densidad y calor específico: cuanto mayor, más lentamente se calienta la superficie y más lenta es la propagación de la llama"],
        ["¿Dónde se propaga más rápido un incendio según la ubicación del foco?", "En una esquina más que junto a una pared, y junto a una pared más que en el centro del recinto"],
        ["Regla general de la dirección de propagación", "Ascendente, más rápida que la horizontal, y esta más rápida que la descendente; en techos combustibles la llama sigue el flujo de gases"],
        ["¿De qué factores depende la velocidad de crecimiento de las llamas sobre un material?", "Inercia térmica, dirección de la superficie, geometría de la superficie y entorno (temperatura ambiente)"],
      ],
      preguntas: [
        ["facil", "¿Qué arde antes, una pila de palillos o un tronco de la misma masa?", ["La pila de palillos, por su mayor superficie", "El tronco", "Igual"], "IVASPE M1-T2."],
        ["media", "Con 20 kW/m², ¿cuál arde antes, el contrachapado o el aglomerado?", ["El contrachapado (unos 50 s frente a más de 3 min)", "El aglomerado", "Ninguno"], "Por su menor inercia térmica."],
        ["media", "Una llama vertical en contrachapado tarda 30 s en pasar de 25 a 50 cm. ¿Cuánto tardará en llegar a 1 m aproximadamente?", ["Unos 2 minutos", "Una hora", "5 segundos"], "La altura de llama se duplica en intervalos iguales."],
        ["media", "¿Por qué los plásticos propagan rápido el fuego sobre suelos de madera?", ["Gotean y forman charcos que arden", "Porque no arden", "Porque apagan la madera"], "IVASPE M1-T2."],
        ["dificil", "¿Qué material de la tabla del manual tiene mayor inercia térmica?", ["Acero", "Poliuretano", "Contrachapado"], "kρc del acero: 160.000.000."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["¿Cómo influye el volumen del recinto?", "En recintos pequeños se alcanzan temperaturas altas y desarrollo rápido; en grandes, temperaturas más bajas y desarrollo más lento"],
        ["¿Qué efecto tienen los techos bajos?", "Mayor transmisión de calor al combustible: las llamas alcanzan el techo, se propagan horizontalmente y aumentan la radiación"],
        ["¿Cuándo son decisivos los huecos de ventilación?", "Cuando el incendio pasa a estar controlado por ventilación: su tamaño y forma determinan la velocidad de combustión"],
        ["¿Cómo influyen los cerramientos aislantes?", "Conservan el calor de los gases (incendio más severo); ladrillo y hormigón disipan más calor por conducción"],
        ["Vías de propagación fuera del recinto", "Aberturas existentes, rotura de cristales, deterioro de cerramientos y fallo de pasos de instalaciones"],
      ],
      preguntas: [
        ["facil", "¿En qué recinto se desarrolla antes el incendio con la misma carga?", ["En el pequeño", "En el grande", "Igual"], "IVASPE M1-T2."],
        ["media", "¿Qué cerramiento da un incendio más caliente, hormigón normal o bloques de hormigón ligero?", ["Bloques de hormigón ligero, por aislar más", "Hormigón normal", "Ninguno"], "IVASPE M1-T2."],
        ["media", "¿Influye la forma de la abertura en un incendio controlado por combustible?", ["No de forma significativa", "Sí, es lo único que influye", "Lo apaga"], "IVASPE M1-T2."],
        ["media", "¿Dónde pueden inflamarse los gases que escapan por una abertura?", ["Lejos del punto de origen, si están calientes", "Solo en el foco", "Nunca"], "IVASPE M1-T2."],
        ["dificil", "En recintos de techo alto y gran superficie, ¿cómo crece el incendio?", ["Por radiación directa de la llama a objetos próximos", "Por el techo", "No crece"], "La separación entre combustibles gana importancia."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["¿Cuáles son las fases del incendio según Walton y Thomas?", "Ignición, crecimiento, flashover, incendio totalmente desarrollado y decaimiento"],
        ["¿Qué es la columna o pluma del incendio?", "El flujo ascendente de gases calientes sobre la llama, que alimenta el cojín de gases bajo el techo"],
        ["¿De dónde proceden los gases no quemados?", "De la pirólisis de materiales no expuestos a la llama (incluido el techo) y de la combustión incompleta del foco"],
        ["¿Qué temperaturas alcanza un incendio totalmente desarrollado?", "Habitualmente entre 800 y 900 °C, y puede durar horas"],
        ["¿Qué ocurre en la etapa de decaimiento?", "El incendio vuelve a estar controlado por el combustible y son comunes los incendios latentes"],
        ["Resistencia de acero y hormigón a 500 °C", "El acero pierde la mitad de su resistencia; el hormigón mantiene alrededor del 75 %"],
      ],
      preguntas: [
        ["facil", "¿Qué fase sigue al flashover?", ["Incendio totalmente desarrollado", "Ignición", "Decaimiento inmediato"], "IVASPE M1-T2."],
        ["media", "En un incendio totalmente desarrollado, ¿por qué salen llamas por las ventanas?", ["Está controlado por ventilación y el exceso de gases arde fuera", "Por el viento", "No salen"], "IVASPE M1-T2."],
        ["media", "¿A qué temperatura suele empezar la pirólisis?", ["Entre 100 y 250 °C", "Por encima de 1.000 °C", "A 0 °C"], "IVASPE M1-T2."],
        ["media", "¿Qué temperatura del cojín de gases se asocia normalmente al flashover?", ["Más de 600 °C", "100 °C", "2.000 °C"], "Y radiación de más de 20 kW/m²."],
        ["dificil", "¿Qué material estructural pierde la mitad de su resistencia a 500 °C?", ["El acero", "El hormigón", "La piedra"], "IVASPE M1-T2."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["¿Qué es un incendio controlado (limitado) por el combustible?", "El que dispone de aire suficiente: es la cantidad de combustible la que limita su crecimiento"],
        ["¿Qué es un incendio controlado (limitado) por ventilación?", "El que dispone de combustible de sobra pero no de oxígeno suficiente: el aire que entra limita la tasa de calor"],
        ["¿Qué pasa al abrir la puerta en un incendio controlado por combustible?", "La tasa de calor no aumenta y no hay que temer una inflamación rápida de los gases"],
        ["¿Por qué es clave distinguir ambos tipos al llegar?", "Porque condiciona la actuación: en el controlado por ventilación, la entrada de aire puede desencadenar un crecimiento rápido o un backdraft"],
        ["¿Cuándo pasa un incendio de estar controlado por combustible a estarlo por ventilación?", "Típicamente con el flashover, o antes si el recinto está cerrado o con pocas aberturas"],
      ],
      preguntas: [
        ["facil", "¿Qué limita el crecimiento de un incendio controlado por combustible?", ["La cantidad de combustible", "La falta de aire", "El agua"], "IVASPE M1-T2."],
        ["media", "¿Qué determina la velocidad de combustión en un incendio controlado por ventilación?", ["El flujo de aire que entra por los huecos", "El color del humo", "La hora"], "IVASPE M1-T2."],
        ["media", "En un ensayo citado por el manual, ¿tras cuánto tiempo pasó el incendio a estar controlado por ventilación?", ["Unos 300 segundos", "Unos 5 segundos", "Una hora"], "IVASPE M1-T2."],
        ["media", "¿Influye que el recinto esté abierto o cerrado cuando hay oxígeno suficiente?", ["No", "Sí, siempre", "Solo de noche"], "IVASPE M1-T2."],
        ["dificil", "Si un incendio tiene poca ventilación, ¿progresa hacia flashover?", ["No: su intensidad disminuye y se acumulan gases de pirólisis", "Sí, más rápido", "Siempre explota"], "IVASPE M1-T2."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["¿Qué cuatro escenarios plantea el manual en incendios con ventilación limitada?", "Autoextinción, reanudación del desarrollo, autoignición de los gases y backdraught"],
        ["¿Qué son las pulsaciones?", "El 'respirar' del incendio: al bajar la temperatura los gases se contraen y entra aire; al arder se expanden y salen; y se repite"],
        ["¿Qué riesgo tiene la autoextinción para los ocupantes?", "Aunque el fuego sea fácil de apagar, los gases (CO, HCN) pueden matar a quien duerme: los detectores salvan vidas"],
        ["¿Qué ocurre en un incendio que reanuda su desarrollo?", "Al entrar aire por la parte baja de la abertura, el foco crece, las llamas alcanzan el cojín y puede evolucionar a flashover"],
        ["¿A qué temperatura suelen autoinflamarse los gases del incendio al salir al aire?", "Entre 500 y 600 °C"],
      ],
      preguntas: [
        ["facil", "¿Cómo se llama el fenómeno en que el incendio parece 'respirar'?", ["Pulsaciones", "Flashover", "Sublimación"], "IVASPE M1-T2."],
        ["media", "Si los gases se autoinflaman en la puerta y se cierra esta, ¿qué ocurre?", ["Las llamas desaparecen al consumirse el oxígeno", "Explota", "Nada cambia"], "IVASPE M1-T2."],
        ["media", "¿Qué tipo de llamas se producen al reanudarse el desarrollo?", ["De difusión", "Premezcladas únicamente", "Ninguna"], "IVASPE M1-T2."],
        ["media", "¿Dónde hay visibilidad en un recinto cuyo incendio se autoextingue?", ["Solo a nivel del suelo", "En el techo", "En todo el recinto"], "IVASPE M1-T2."],
        ["dificil", "¿Qué factor influye en que un incendio empiece a pulsar?", ["La relación entre el tamaño de la abertura y el calor liberado", "El color de las paredes", "La humedad"], "IVASPE M1-T2."],
      ],
    },
  ],
  glosario: [
    [S1, "Inercia térmica (kρc)", "Producto de conductividad, densidad y calor específico de un material, que determina lo rápido que se calienta su superficie."],
    [S2, "Cojín de gases", "Capa de gases calientes y de pirólisis acumulada bajo el techo del recinto."],
    [S3, "Pluma del incendio", "Columna ascendente de gases calientes que se forma sobre el foco."],
    [S3, "Etapa de decaimiento", "Fase final en que el incendio pierde intensidad y vuelve a estar controlado por el combustible."],
    [S4, "Incendio controlado por ventilación", "Incendio cuyo crecimiento está limitado por el aire disponible, no por el combustible."],
    [S5, "Plano neutro", "Altura de una abertura en la que la presión interior y exterior se igualan: por encima salen los gases y por debajo entra aire."],
  ],
  casos: [
    {
      slug: "caso-salon-esquina-sofa",
      titulo: "Fuego en la esquina de un salón",
      supuesto: "Un sofá de espuma situado en la esquina de un salón con techo bajo empieza a arder. La ventana está abierta y la puerta del salón también.",
      preguntas: [
        [S1, "facil", "¿Por qué crecerá rápido el incendio?", ["Porque está en una esquina y el calor se refleja al foco", "Porque hay poca espuma", "No crecerá"], "IVASPE M1-T2."],
        [S1, "media", "¿Cómo se propaga la llama por la espuma sintética?", ["Muy rápido, por su baja inercia térmica", "Muy lento", "No se propaga"], "IVASPE M1-T2."],
        [S2, "media", "¿Qué efecto tiene el techo bajo?", ["Las llamas lo alcanzan y aumentan la radiación sobre el resto", "Ninguno", "Enfría el incendio"], "IVASPE M1-T2."],
        [S4, "media", "Con ventana y puerta abiertas, ¿cómo está controlado al principio?", ["Por el combustible", "Por la ventilación", "Por el agua"], "IVASPE M1-T2."],
        [S3, "media", "¿Hacia qué fenómeno puede evolucionar con buen aporte de aire?", ["Flashover", "Autoextinción", "Sublimación"], "IVASPE M1-T2."],
        [S3, "media", "¿Qué tasa de calor puede alcanzar un sofá?", ["1-3 MW", "100 W", "100 MW"], "Dato del manual (M1-T1)."],
        [S3, "media", "¿Qué temperatura del cojín indica normalmente flashover?", ["Más de 600 °C", "Unos 150 °C", "Unos 50 °C"], "IVASPE M1-T2."],
        [S4, "media", "Tras el flashover, ¿cómo pasa a estar controlado?", ["Por ventilación", "Por combustible", "No cambia"], "IVASPE M1-T2."],
        [S2, "dificil", "¿Por dónde podría propagarse a la vivienda contigua?", ["Por huecos en cerramientos o pasos de instalaciones", "Solo por el tejado", "No puede"], "IVASPE M1-T2."],
        [S3, "media", "¿Cuánto puede durar el incendio totalmente desarrollado?", ["Incluso horas, según el combustible", "Segundos", "Siempre 5 minutos"], "IVASPE M1-T2."],
      ],
    },
    {
      slug: "caso-dormitorio-cerrado-noche",
      titulo: "Dormitorio cerrado de madrugada",
      supuesto: "De madrugada, un aviso por humo en un piso. El incendio empezó en un dormitorio con puerta y ventana cerradas. Al llegar, apenas sale humo frío por las rendijas.",
      preguntas: [
        [S4, "facil", "¿Cómo estará controlado ese incendio?", ["Por ventilación", "Por combustible", "Por la lluvia"], "IVASPE M1-T2."],
        [S5, "media", "¿Qué escenario parece más probable si sale poco humo y frío?", ["Autoextinción o latencia", "Flashover inminente", "Explosión segura"], "IVASPE M1-T2."],
        [S5, "media", "¿Qué peligro corren los ocupantes dormidos?", ["Intoxicación por CO y HCN", "Ninguno", "Solo quemaduras leves"], "IVASPE M1-T2."],
        [S5, "media", "¿Qué elemento de prevención es vital en estos casos?", ["Los detectores de incendio", "Las cortinas", "Las alfombras"], "IVASPE M1-T2."],
        [S5, "media", "Al abrir la puerta, si el recinto tuvo mucho calor, ¿qué puede pasar?", ["Que el incendio reanude su desarrollo", "Nada nunca", "Que se congele"], "IVASPE M1-T2."],
        [S5, "media", "Si los gases están a 500-600 °C al salir, ¿qué puede ocurrir?", ["Que se autoinflamen al contacto con el aire", "Que se enfríen", "Nada"], "IVASPE M1-T2."],
        [S2, "media", "¿Qué papel juega el plano neutro al abrir la puerta?", ["Salen gases por arriba y entra aire por abajo", "Ninguno", "Solo entra aire"], "IVASPE M1-T2."],
        [S5, "media", "¿Qué indica humo que sale y entra rítmicamente por las rendijas?", ["Pulsaciones", "Un incendio apagado", "Una fuga de agua"], "IVASPE M1-T2."],
        [S5, "dificil", "¿Cuál es el cuarto escenario posible que obliga a máxima precaución?", ["Backdraught", "Sublimación", "Decaimiento"], "Se estudia en el Tema 16."],
        [S4, "media", "¿Por qué es clave distinguir combustible o ventilación antes de entrar?", ["Porque condiciona la táctica", "No importa", "Por el seguro"], "IVASPE M1-T2."],
      ],
    },
    {
      slug: "caso-nave-techo-alto",
      titulo: "Incendio en una nave de techo alto",
      supuesto: "Arde un palé en el centro de una nave industrial de gran volumen y techo alto, con otros palés separados a varios metros.",
      preguntas: [
        [S2, "facil", "¿Cómo será el desarrollo inicial en un recinto grande?", ["Más lento y con temperaturas de gases más bajas", "Más rápido", "Igual que en un aseo"], "IVASPE M1-T2."],
        [S2, "media", "¿Cómo se propagará a los otros palés?", ["Sobre todo por radiación directa de la llama", "Por el techo inmediatamente", "No se propaga"], "IVASPE M1-T2."],
        [S1, "media", "¿Qué importancia tiene la separación entre palés?", ["Cuanto mayor, más tarda en incorporarse el material", "Ninguna", "Acelera el fuego"], "IVASPE M1-T2."],
        [S1, "media", "Con el foco en el centro, ¿cómo entra el aire?", ["Por todo el perímetro inferior, lo que ralentiza al principio", "No entra", "Solo por el techo"], "IVASPE M1-T2."],
        [S2, "media", "¿Qué riesgo hay aunque el volumen sea grande?", ["Los gases bajo el techo pueden calentar combustibles y propagar rápido el fuego", "Ninguno", "Que se enfríe todo"], "IVASPE M1-T2."],
        [S3, "media", "¿Qué tasa máxima puede alcanzar una pila de palés de 3 m?", ["Unos 7 MW", "100 kW", "1 W"], "Dato del manual (M1-T1)."],
        [S3, "media", "Si la estructura es metálica, ¿qué ocurre a 500 °C?", ["Pierde la mitad de su resistencia", "Se refuerza", "No le afecta"], "IVASPE M1-T2."],
        [S4, "media", "Con la nave abierta, ¿cómo está controlado el incendio al principio?", ["Por combustible", "Por ventilación", "Por presión"], "IVASPE M1-T2."],
        [S1, "dificil", "¿Cómo se propaga la llama si el techo es combustible?", ["Con el flujo de gases, rápidamente", "Contra el flujo, lentamente", "No se propaga"], "IVASPE M1-T2."],
        [S3, "media", "¿Cómo se forma el cojín de gases bajo el techo?", ["A través de la columna o pluma del incendio", "Por la lluvia", "Por los ventiladores"], "IVASPE M1-T2."],
      ],
    },
  ],
});
