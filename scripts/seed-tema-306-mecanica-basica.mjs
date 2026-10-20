/**
 * Crea tema-306 — Tema 11 de Bombero/a Conductor/a: "Mecánica básica.
 * Motores de gasolina y diésel. Nuevas tecnologías: vehículos híbridos,
 * eléctricos y de hidrógeno."
 *
 * Fuente: Tema 11 "Mecánica" de la Escuela de Bomberos del Ayuntamiento de
 * Zaragoza (zaragoza.es/sede/portal/bomberos/temarios), leído íntegro.
 * Contenido técnico sin norma única que lo regule; el tema se ciñe a lo que
 * expone ese documento oficial de referencia para la oposición (cuando el
 * documento da dos cifras distintas para un mismo dato, p. ej. la relación
 * de compresión del diésel, no se pregunta por la cifra).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-306-mecanica-basica.mjs
 */
import { sembrarTema, BOMBERO } from "./lib/sembrar-tema.mjs";

const FUENTE = "https://www.zaragoza.es/cont/vistas/portal//bomberos/doc/TEMA_11_Mecanica_basica.pdf";
const S1 = "motor-gasolina-dos-cuatro-tiempos";
const S2 = "motor-diesel-inyeccion";
const S3 = "emisiones-normas-euro";
const S4 = "combustibles-gaseosos-hidrogeno";
const S5 = "vehiculos-electricos-hibridos";

await sembrarTema({
  tema: {
    slug: "tema-306",
    titulo: "Mecánica básica: motores de gasolina y diésel y nuevas tecnologías de propulsión",
    descripcion: "Motor de explosión de dos y cuatro tiempos, encendido y alimentación; motor diésel, sus particularidades y sistemas de inyección (common rail, bomba unitaria, inyector bomba); normas Euro, SCR, AdBlue y EGR; GLP, GNC, GNL, etanol e hidrógeno; vehículos eléctricos e híbridos y sus elementos de seguridad.",
    contenido: "Sigue el Tema 11 de la Escuela de Bomberos: cómo funcionan los motores de gasolina y diésel y en qué se diferencian, las piezas principales de un motor, la inyección diésel moderna, cómo se reducen las emisiones de los vehículos pesados, las propiedades de los combustibles gaseosos y del hidrógeno que importan en una intervención, y los componentes y riesgos de los vehículos eléctricos e híbridos (alta tensión, cables naranjas, desconexión).",
    enlaces_boe: [{ url: FUENTE, titulo: "Escuela de Bomberos de Zaragoza — Tema 11: Mecánica básica" }],
    indice_estudio: [
      { seccion: S1, titulo: "El motor de explosión: dos y cuatro tiempos", articulos: "Tema 11, motor de explosión", url: FUENTE },
      { seccion: S2, titulo: "El motor diésel y sus sistemas de inyección", articulos: "Tema 11, motor diésel", url: FUENTE },
      { seccion: S3, titulo: "Emisiones: normas Euro, SCR, AdBlue y EGR", articulos: "Tema 11, normas Euro", url: FUENTE },
      { seccion: S4, titulo: "Motores de gas, etanol e hidrógeno", articulos: "Tema 11, nuevas tecnologías", url: FUENTE },
      { seccion: S5, titulo: "Vehículos eléctricos e híbridos", articulos: "Tema 11, vehículos eléctricos e híbridos", url: FUENTE },
    ],
  },
  vinculo: { oposicion: BOMBERO.oposicion, bloqueId: BOMBERO.bloqueParteII, numero: 11 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["¿Cuáles son las cuatro fases del ciclo de un motor de combustión?", "Admisión, compresión, explosión o combustión y escape"],
        ["¿En cuántas vueltas de cigüeñal completa el ciclo un motor de cuatro tiempos y uno de dos tiempos?", "El de cuatro tiempos en dos vueltas (cuatro carreras del pistón); el de dos tiempos en una vuelta (dos carreras)"],
        ["¿Qué tiene el motor de dos tiempos en lugar de válvulas?", "Lumbreras: el cambio de gases lo dirige el propio pistón; carece de árbol de levas y de mecanismo de distribución"],
        ["¿Por qué un motor de dos tiempos puede trabajar en cualquier posición?", "Porque no tiene cárter de aceite: el lubricante se mezcla con el combustible, como en motosierras y motodiscos"],
        ["¿Qué hace la bobina de encendido?", "Transforma el bajo voltaje de la batería en impulsos de alta tensión para que salte la chispa en la bujía"],
        ["¿Qué misión tienen las bielas y el cigüeñal?", "Las bielas transmiten el movimiento de los pistones al cigüeñal, que lo transforma en movimiento giratorio"],
        ["¿Para qué sirve el turbocompresor?", "Usa los gases de escape para mover una turbina que comprime el aire de admisión (sobrealimentación)"],
      ],
      preguntas: [
        ["facil", "¿Cuántas vueltas de cigüeñal necesita un motor de cuatro tiempos para completar el ciclo?", ["Dos", "Una", "Cuatro"], "Cuatro carreras del pistón, dos vueltas completas del cigüeñal."],
        ["media", "¿Qué motor se usa habitualmente en motosierras y motodiscos de bomberos?", ["El de dos tiempos", "El diésel de cuatro tiempos", "El eléctrico de alta tensión"], "Tema 11: el aceite va mezclado con el combustible y permite trabajar en cualquier posición."],
        ["media", "¿Qué pieza abre y cierra las válvulas?", ["El árbol de levas", "La biela", "El cárter"], "Tema 11, partes principales del motor."],
        ["media", "¿Qué segmentos del pistón se llaman también rascadores?", ["Los de aceite o engrase", "Los de fuego", "Los de compresión"], "Tema 11, segmentos."],
        ["dificil", "¿Qué elemento del encendido convencional absorbe la sobrecorriente de apertura de los platinos?", ["El condensador", "El amperímetro", "La bujía"], "Tema 11, sistema de encendido."],
        ["media", "¿Qué pieza situada en el extremo del cigüeñal regula su giro y va unida al embrague?", ["El volante de inercia", "El colector de escape", "El taqué"], "Tema 11, partes del motor."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["¿Cómo se inflama el combustible en un motor diésel?", "Por autoinflamación: el aire se comprime hasta 700-900 ºC y al inyectar el gasóleo arde sin chispa"],
        ["¿Qué sistemas no necesita el motor diésel?", "Carburador y encendido por chispa: los sustituye la inyección de combustible a presión"],
        ["¿Qué son las bujías de calentamiento?", "Calentadores en el cilindro que, alimentados por la batería al dar el contacto, calientan el aire para facilitar la inflamación en frío"],
        ["¿En qué consiste el common rail?", "Una bomba de alta presión envía el gasóleo a un conducto común para todos los inyectores, con presión elevada independiente de las revoluciones y gestión por una ECU"],
        ["¿Qué diferencia el inyector bomba del common rail?", "El inyector bomba agrupa en una pieza, en la culata y por cilindro, la generación de presión y la inyección; en el common rail la presión está en el conducto común"],
        ["¿Qué gasóleo es de uso agrícola y cuál de calefacción?", "El gasóleo B es agrícola (no puede usarse en vehículos no agrícolas) y el C es para calefacción doméstica"],
      ],
      preguntas: [
        ["facil", "¿Qué necesita un motor de gasolina que no necesita un diésel?", ["Encendido por chispa", "Inyectores", "Cigüeñal"], "El diésel funciona por autoinflamación."],
        ["media", "¿A qué presión trabaja normalmente el acumulador de un common rail?", ["Entre 1.400 y 1.600 bares, hasta 2.500 en algunos motores", "Entre 6 y 12 bares", "A 200 bares"], "Tema 11, common rail."],
        ["media", "¿Qué gasóleo está destinado a la calefacción doméstica?", ["El gasóleo C", "El gasóleo B", "El gasóleo A"], "Tema 11, carburantes."],
        ["media", "¿Por qué las válvulas de escape de un diésel pueden ser huecas y rellenas de sodio?", ["Para refrigerarse mejor", "Para pesar más", "Para aislar del ruido"], "El sodio absorbe mucho calor al fundirse."],
        ["dificil", "¿A qué régimen corta el calculador del common rail la presión de alimentación para evitar el exceso de velocidad?", ["5.000 rpm", "3.000 rpm", "8.000 rpm"], "Tema 11: a 5.000 rpm corta la presión y por encima de 5.400 desactiva bomba e inyectores."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["¿Qué fijan las normas EURO?", "Los valores límite de emisiones contaminantes de los vehículos nuevos; Euro 1 entró en vigor en 1993 y la actual es Euro 6"],
        ["¿Qué es el sistema SCR?", "La Reducción Catalítica Selectiva: inyecta AdBlue en el escape para que el NOx, en el catalizador, se convierta en agua y nitrógeno"],
        ["¿Qué es el AdBlue?", "Marca registrada del AUS 32, disolución de urea al 32,5 % en agua desmineralizada; no es tóxico pero puede corroer algunos metales"],
        ["¿Cómo se reconoce el depósito de AdBlue?", "Va normalmente junto al de combustible y su tapa es siempre de color azul"],
        ["¿Qué hace la válvula EGR?", "Recircula parte de los gases de escape a la admisión, baja el oxígeno y la temperatura de combustión y reduce así los óxidos de nitrógeno"],
      ],
      preguntas: [
        ["facil", "¿De qué color es la tapa del depósito de AdBlue?", ["Azul", "Verde", "Roja"], "Tema 11, AdBlue."],
        ["media", "¿Qué contaminante reduce principalmente el sistema SCR?", ["Los óxidos de nitrógeno (NOx)", "El monóxido de carbono", "El dióxido de azufre"], "Tema 11, SCR."],
        ["media", "¿Qué es el AdBlue químicamente?", ["Una disolución de urea al 32,5 % en agua", "Un aditivo de gasolina", "Un aceite sintético"], "Tema 11, AdBlue (AUS 32)."],
        ["media", "¿Qué inconveniente tiene la recirculación de gases EGR?", ["Disminuye la densidad de potencia y aumenta las partículas", "Aumenta los NOx", "Consume AdBlue"], "Tema 11, EGR."],
        ["dificil", "¿En qué año entró en vigor la norma Euro 1?", ["1993", "2011", "2014"], "Tema 11, normas Euro."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["¿Qué es el GLP de automoción y cómo se almacena?", "Mezcla de butano y propano (habitualmente 65/35 %), licuada en depósito a 6-12 bares (normalmente 7) con un llenado máximo del 80 %"],
        ["¿Dónde se acumula una fuga de GLP gaseoso?", "En lugares bajos, porque es más pesado que el aire"],
        ["¿Qué es el GNC y a qué presión se almacena?", "Gas natural comprimido, sobre todo metano; más ligero que el aire, se almacena a 200-250 bar"],
        ["¿A qué temperatura se licúa el gas natural (GNL)?", "A unos -162 ºC; es un líquido criogénico que ocupa 600 veces menos que en estado gaseoso"],
        ["¿Qué rango de inflamabilidad tiene el hidrógeno?", "Del 4 % al 75 % en aire; es incoloro, inodoro, no tóxico y se dispersa rápidamente"],
        ["¿A qué presión almacenan el hidrógeno los vehículos de pila de combustible?", "En depósitos tipo III y IV a 350-700 bares, con válvula de seguridad térmica que se activa a 110 ºC"],
      ],
      preguntas: [
        ["facil", "¿Qué se añade al GLP para detectar fugas por el olor?", ["Mercaptano", "AdBlue", "Etanol"], "Tema 11, GLP."],
        ["media", "Una fuga de GLP en estado gaseoso tiende a:", ["Acumularse en lugares bajos", "Subir y dispersarse", "Disolverse en el agua"], "El GLP gaseoso es más pesado que el aire."],
        ["media", "¿A qué presión se almacena el GNC en los vehículos?", ["200-250 bar", "6-12 bar", "1.400 bar"], "Tema 11, GNC."],
        ["media", "¿Cuál es el número ONU del hidrógeno comprimido según el Tema 11?", ["1049", "1966", "1203"], "Hidrógeno a presión: código de peligro 23 y ONU 1049; líquido refrigerado: 223 y ONU 1966."],
        ["dificil", "¿A qué temperatura actúa la válvula de seguridad térmica de los depósitos de hidrógeno?", ["110 ºC", "80 ºC", "250 ºC"], "Tema 11, hidrógeno."],
        ["media", "¿Cuál es el principal inconveniente del etanol en altas concentraciones?", ["Corroe ciertos materiales y reseca las gomas del sistema de combustible", "Es más pesado que el agua", "Es radiactivo"], "Tema 11, etanol."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["¿Qué diferencia un eléctrico puro (BEV) de un híbrido?", "El BEV se mueve solo con motores eléctricos; el híbrido combina motor eléctrico y motor térmico"],
        ["¿Qué es un híbrido enchufable (PHEV)?", "Un híbrido cuya batería puede recargarse enchufándolo a la red; recorre entre 5 y 80 km solo con tracción eléctrica"],
        ["¿Qué hacen el inversor y el conversor en un eléctrico?", "El inversor convierte la continua de la batería en alterna para el motor; el conversor baja la alta tensión continua a 12, 24 o 48 V para las baterías auxiliares"],
        ["¿De qué color son los cables de alta tensión?", "Naranja normalizado, para diferenciarlos de los de baja tensión"],
        ["¿Qué elementos de seguridad incorporan los eléctricos para la desconexión?", "Interrupción automática ante impacto o cortocircuito y dispositivos manuales de emergencia (plug service, anillo de corte, fusibles de desconexión)"],
        ["¿Qué conector es el estándar europeo para carga en alterna?", "El tipo 2 (IEC 62196-2), conocido como «Mennekes»; para continua se usa el CCS Combo"],
      ],
      preguntas: [
        ["facil", "¿De qué color son los cables de alta tensión de un vehículo eléctrico?", ["Naranja", "Azul", "Negro"], "Tema 11, elementos de seguridad."],
        ["media", "¿Qué elemento convierte la corriente continua de la batería en alterna para el motor?", ["El inversor", "El conversor", "El cargador"], "Tema 11."],
        ["media", "¿Dónde suelen ir las baterías de alta tensión?", ["En la parte baja del vehículo o en el maletero", "En el techo", "En el capó junto al motor térmico"], "Tema 11, elementos de seguridad."],
        ["media", "¿Qué tipo de híbrido se mueve solo con el motor eléctrico y usa el térmico como generador puntual?", ["El híbrido en serie", "El híbrido paralelo", "El semihíbrido MHEV"], "Tema 11, disposición de motores."],
        ["dificil", "¿Qué voltaje usan los sistemas semihíbridos (MHEV)?", ["48 voltios", "400 voltios", "12 voltios"], "Tema 11: también llamados sistemas de 48 V."],
      ],
    },
  ],
  glosario: [
    [S1, "Lumbrera", "Abertura del cilindro de un motor de dos tiempos por la que entran y salen los gases, sustituyendo a las válvulas."],
    [S2, "Common rail", "Sistema de inyección diésel con un conducto común a alta presión para todos los inyectores, gestionado por una ECU."],
    [S3, "SCR", "Reducción Catalítica Selectiva: tecnología que, con AdBlue, transforma los NOx del escape en nitrógeno y agua."],
    [S3, "EGR", "Recirculación de gases de escape a la admisión para reducir la temperatura de combustión y los NOx."],
    [S4, "GNL", "Gas natural licuado a unos -162 ºC, líquido criogénico que ocupa 600 veces menos que en estado gaseoso."],
    [S5, "Plug service", "Dispositivo manual de emergencia que interrumpe la alimentación de la batería de alta tensión de un vehículo eléctrico."],
  ],
  casos: [
    {
      slug: "caso-accidente-turismo-electrico",
      titulo: "Accidente de un turismo eléctrico",
      supuesto: "Una dotación acude a un accidente de tráfico en el que está implicado un turismo eléctrico con daños en los bajos. El oficial pide al bombero conductor que identifique los riesgos propios del vehículo.",
      preguntas: [
        [S5, "facil", "¿Cómo identifica los cables de alta tensión?", ["Por su color naranja normalizado", "Por ser más finos", "No se pueden identificar"], "Tema 11."],
        [S5, "media", "¿Dónde es probable que esté la batería de alta tensión?", ["En la parte baja del vehículo o en el maletero", "En el techo", "En el salpicadero"], "Tema 11."],
        [S5, "media", "¿Qué dispositivo manual puede usarse para cortar la alimentación de la batería?", ["El plug service o el anillo de corte indicado por la marca", "El freno de mano", "La llave de las ruedas"], "Tema 11."],
        [S5, "media", "¿Qué batería sigue alimentando apertura de puertas e iluminación interior?", ["La batería auxiliar de 12 o 24 V", "La batería de tracción exclusivamente", "Ninguna"], "Tema 11."],
        [S5, "media", "¿Qué dispositivos automáticos pueden haber cortado ya la alta tensión?", ["Fusibles y relés que actúan ante impacto o cortocircuito", "El airbag", "El ABS"], "Tema 11."],
        [S5, "media", "Si fuera un híbrido enchufable, ¿qué tendría además del motor eléctrico?", ["Un motor de combustión interna", "Una pila de hidrógeno", "Un depósito de GLP"], "Tema 11."],
        [S5, "media", "¿Qué elemento convierte la corriente de la batería en alterna para el motor y puede seguir con tensión?", ["El inversor", "El catalizador", "El cárter"], "Tema 11."],
        [S5, "dificil", "¿Qué siglas identifican un eléctrico de autonomía extendida?", ["EREV", "MHEV", "HEV"], "Tema 11, siglas."],
        [S5, "media", "Los cables naranjas se colocan, por diseño:", ["Fuera de las zonas de corte y separación", "En los pilares de corte", "En las puertas"], "Tema 11, elementos de seguridad."],
        [S5, "media", "Si el coche estaba cargando en la calle con un conector europeo de alterna, ¿cuál sería probablemente?", ["El tipo 2 Mennekes", "El Schuko de 10 A", "El CHAdeMO"], "Tema 11, conectores."],
      ],
    },
    {
      slug: "caso-fuga-vehiculo-gas",
      titulo: "Fuga en un vehículo propulsado por gas",
      supuesto: "En un aparcamiento subterráneo, un vecino avisa de olor a gas junto a una furgoneta. El rótulo indica que funciona con GLP. Poco después llega otro aviso de un autobús de GNC averiado en la calle.",
      preguntas: [
        [S4, "facil", "¿Por qué se huele la fuga de GLP?", ["Porque lleva mercaptano como odorante", "Porque el GLP huele de forma natural", "Porque arde"], "El GLP es inodoro; se le añade mercaptano."],
        [S4, "media", "¿Dónde se acumulará el GLP fugado?", ["En las zonas bajas del aparcamiento", "En el techo", "Se disipará al instante"], "El GLP gaseoso es más pesado que el aire."],
        [S4, "media", "¿De qué gases está compuesto el GLP?", ["Butano y propano", "Metano", "Hidrógeno"], "Tema 11."],
        [S4, "media", "¿Qué riesgo para las personas tiene el GLP además de la inflamabilidad?", ["Es asfixiante", "Es radiactivo", "Es corrosivo para la piel en todo caso"], "No es tóxico pero sí asfixiante."],
        [S4, "media", "¿Hasta qué porcentaje se llena el depósito de GLP?", ["El 80 %", "El 100 %", "El 50 %"], "Tema 11."],
        [S4, "media", "En el autobús de GNC, ¿cómo se comportará una fuga en la calle?", ["Se disipará hacia arriba, porque es más ligero que el aire", "Se acumulará en el suelo", "Se licuará"], "Densidad 0,625 respecto al aire."],
        [S4, "media", "¿A qué presión están los depósitos del autobús de GNC?", ["200-250 bar", "7 bar", "700 bar"], "Tema 11."],
        [S4, "dificil", "¿Qué rango de inflamabilidad tiene el gas natural?", ["Entre el 5 % y el 15 %", "Entre el 4 % y el 75 %", "Entre el 1 % y el 2 %"], "Tema 11."],
        [S4, "media", "¿Qué componente principal tiene el gas natural?", ["Metano", "Butano", "Propano"], "Tema 11."],
        [S4, "media", "Si fuera un vehículo de hidrógeno, ¿cuál sería su rango de inflamabilidad?", ["Del 4 % al 75 %", "Del 5 % al 15 %", "Del 2,15 % al 9,6 %"], "Tema 11."],
      ],
    },
    {
      slug: "caso-revision-autobomba-diesel",
      titulo: "Revisión de la autobomba al inicio de la guardia",
      supuesto: "Al empezar la guardia, el bombero conductor revisa la autobomba diésel Euro 6 y explica a un compañero en prácticas cómo funciona su motor y sus sistemas anticontaminación.",
      preguntas: [
        [S2, "facil", "¿Cómo se produce la combustión en el motor de la autobomba?", ["Por autoinflamación del gasóleo en aire muy caliente", "Por chispa de bujía", "Por llama piloto"], "Tema 11."],
        [S2, "media", "¿Qué ayuda al arranque en frío?", ["Las bujías de calentamiento", "El carburador", "El ruptor"], "Tema 11."],
        [S2, "media", "¿Qué gasóleo debe repostar?", ["Gasóleo A", "Gasóleo B", "Gasóleo C"], "El B es agrícola y el C de calefacción."],
        [S3, "facil", "¿Qué líquido debe reponer en el depósito de tapa azul?", ["AdBlue", "Anticongelante", "Aceite"], "Tema 11."],
        [S3, "media", "¿Para qué sirve ese líquido?", ["Para que el SCR reduzca los NOx", "Para lubricar el turbo", "Para limpiar el parabrisas"], "Tema 11."],
        [S3, "media", "¿Qué sistema recircula gases de escape para bajar la temperatura de combustión?", ["La EGR", "El SCR", "El intercooler"], "Tema 11."],
        [S2, "media", "¿Qué sistema de inyección mantiene alta presión en un conducto común para todos los inyectores?", ["El common rail", "El carburador", "El inyector bomba"], "Tema 11."],
        [S1, "media", "¿Qué aprovecha el turbocompresor para comprimir el aire de admisión?", ["Los gases de escape", "La batería", "El aceite"], "Tema 11."],
        [S2, "dificil", "¿Por qué la refrigeración del diésel debe ser más eficaz que la de gasolina?", ["Porque alcanza temperaturas de funcionamiento más altas, sobre todo en la culata", "Porque gira más rápido", "Porque no tiene radiador"], "Tema 11."],
        [S3, "media", "¿Qué norma de emisiones es la actual según el Tema 11?", ["Euro 6", "Euro 4", "Euro 1"], "Tema 11."],
      ],
    },
  ],
});
