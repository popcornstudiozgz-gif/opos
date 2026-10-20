/**
 * Crea tema-316 — Tema 21 de Bombero/a Conductor/a: "Manejo de
 * herramientas. Herramientas de corte. Especificaciones. Uso y seguridad.
 * Mantenimiento. Herramientas Manuales. Especificaciones. Uso y seguridad.
 * Mantenimiento."
 *
 * Fuente: la bibliografía oficial de la Escuela de Bomberos de Zaragoza
 * remite este tema al "Manual de formación para bomberos" de TRAGSA y el
 * CEIS Guadalajara. Leídos íntegros los capítulos "Herramientas manuales"
 * (M6-EOV-v4-05) y "Herramientas de corte" (M6-EOV-v4-06) del Manual 6
 * "Equipos operativos y herramientas de intervención", publicados por el
 * CEIS Guadalajara bajo licencia CC BY-NC-SA 4.0 (se usan como fuente de
 * estudio, sin reproducir texto ni imágenes). El manual cita como normativa
 * general la Ley 31/1995, el RD 1215/1997 (equipos de trabajo,
 * BOE-A-1997-17824, ya verificado en el proyecto), el RD 1644/2008
 * (máquinas), la UNE-EN 381-5 (perneras anticorte), la UNE-EN 131 y la NTP
 * 239 (escaleras), las NTP 391-393 (herramientas manuales) y las NTP 495 y
 * 132 (oxicorte); se mencionan tal como las cita el manual.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-316-manejo-herramientas.mjs
 */
import { sembrarTema, BOMBERO } from "./lib/sembrar-tema.mjs";

const M6_CORTE = "https://ceis.antiun.net/docus/pdfsonline/m6/M6_EOV_v4_06_equipos_corte/M6-EOV-v4-06-equipos-corte.pdf";
const M6_MANUAL = "https://ceis.antiun.net/docus/pdfsonline/m6/M6_EOV_v4_05_equipos_herramientaManual/M6-EOV-v4-05-equipos-herramientaManual.pdf";
const RD_1215 = "https://www.boe.es/buscar/act.php?id=BOE-A-1997-17824";
const BIBLIO = BOMBERO.escuela("Bibliografia_externa_recomendada_temario_BNI.pdf");
const S1 = "corte-generalidades-seguridad";
const S2 = "motosierra-motorradial";
const S3 = "sierra-sable-oxicorte";
const S4 = "herramientas-manuales-generalidades";
const S5 = "herramientas-manuales-tipos";

await sembrarTema({
  tema: {
    slug: "tema-316",
    titulo: "Manejo de herramientas: herramientas de corte y herramientas manuales",
    descripcion: "Herramientas de corte: materiales, normativa (RD 1215/1997, RD 1644/2008), riesgos y medidas; motosierra y motorradial (arranque, rebote y arrastre, mantenimiento, perneras anticorte UNE-EN 381-5); sierra de sable en excarcelación; oxicorte y plasma; corte manual. Herramientas manuales: diseño, riesgos y prevención; martillo percutor, escaleras (gancho, antepecho, corredera, articulada), abrepuertas hidráulico, llave de ascensores, llaves de corte, batefuegos, TNT, herramienta de bombero, pala y otras.",
    contenido: "Sigue el Manual 6 del CEIS Guadalajara, que la Escuela de Bomberos de Zaragoza recomienda para este tema: para qué sirve cada herramienta de corte y manual del camión, cómo se usa sin accidentes (rebote de la motosierra, arrastre del disco, corte de montantes con sierra de sable, encendido y apagado del soplete) y qué mantenimiento necesita después de cada servicio.",
    enlaces_boe: [
      { url: M6_CORTE, titulo: "CEIS Guadalajara — Manual 6: Herramientas de corte" },
      { url: M6_MANUAL, titulo: "CEIS Guadalajara — Manual 6: Herramientas manuales" },
      { url: RD_1215, titulo: "RD 1215/1997, disposiciones mínimas de seguridad en equipos de trabajo (BOE-A-1997-17824)" },
      { url: BIBLIO, titulo: "Escuela de Bomberos de Zaragoza — Bibliografía externa recomendada (remite el Tema 21 al Manual CEIS Guadalajara)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "Herramientas de corte: definición, materiales, normativa, riesgos y seguridad", articulos: "M6 Corte, apartado 1", url: M6_CORTE },
      { seccion: S2, titulo: "Motosierra, motorradial y perneras anticorte", articulos: "M6 Corte, apartados 2.1-2.3", url: M6_CORTE },
      { seccion: S3, titulo: "Sierra de sable, oxicorte y corte manual", articulos: "M6 Corte, apartados 2.4-2.6", url: M6_CORTE },
      { seccion: S4, titulo: "Herramientas manuales: definición, diseño, riesgos y prevención", articulos: "M6 Manuales, apartado 1", url: M6_MANUAL },
      { seccion: S5, titulo: "Equipos y herramientas manuales del servicio", articulos: "M6 Manuales, apartado 2", url: M6_MANUAL },
    ],
  },
  vinculo: { oposicion: BOMBERO.oposicion, bloqueId: BOMBERO.bloqueParteII, numero: 21 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["¿Qué son las herramientas de corte?", "Máquinas herramienta con elementos muy resistentes que modifican el objeto por corte, arranque o desgarro del material; se clasifican por su fuente de potencia (motor o manual)"],
        ["Cualidades del material de una herramienta de corte", "Dureza, resistencia de los filos a altas temperaturas, resiliencia, tenacidad, bajo coeficiente de fricción y resistencia a los choques térmicos"],
        ["Normativa general de las herramientas de corte", "RD 1644/2008 (comercialización de máquinas, marcado CE, dirigido al fabricante) y RD 1215/1997 (uso de equipos de trabajo, dirigido al empresario), en el marco de la Ley 31/1995"],
        ["Tipos de lesiones con máquinas herramienta", "Aplastamiento, cizallamiento, corte, arrastre o impacto, punzonamiento, fricción o abrasión y proyección de materiales"],
        ["Técnicas de protección de las máquinas", "Resguardos (barrera física) y dispositivos de protección (mantienen el cuerpo fuera de la zona de peligro, detectores de presencia)"],
        ["EPI general para herramientas de corte", "Casco, gafas, máscara de polvo, chaquetón, cubrepantalón con fibras anticorte, botas y guantes de intervención"],
      ],
      preguntas: [
        ["facil", "¿A quién va dirigido el RD 1215/1997?", ["Al empresario o empleador que usa los equipos de trabajo", "Al fabricante", "Al comprador particular"], "M6 Corte."],
        ["media", "¿Qué norma regula la comercialización y el marcado CE de las máquinas?", ["El RD 1644/2008", "El RD 1215/1997", "La NTP 239"], "M6 Corte."],
        ["media", "¿Qué es la resiliencia de un material de corte?", ["Su capacidad de absorber energía de deformación sin agrietarse", "Su color", "Su peso"], "M6 Corte."],
        ["media", "¿Qué es un resguardo?", ["Una barrera material que evita el contacto con la parte peligrosa", "Un tipo de disco", "Un seguro de vida"], "M6 Corte."],
        ["dificil", "¿Qué exige la normativa de PRL para usar estas herramientas con seguridad?", ["Formación teórica y práctica específica", "Solo leer la etiqueta", "Nada"], "M6 Corte."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Diferencia entre motosierra convencional y de rescate", "La de rescate lleva placas de aleación dura en la cadena y corta chapa de acero (hasta 8 mm), cobre o aluminio (hasta 15 mm), cristal armado, tela asfáltica, maderas con clavos, etc."],
        ["Sistemas de la motosierra", "Agarre (dos empuñaduras), motriz (mezcla gasolina-aceite 2-5 %, aire, carburador de membrana), corte (espadín de unos 40 cm) y seguridad (bloqueo de acelerador, salvamanos, freno de cadena, antivibración)"],
        ["¿Qué es el rebote o 'kickback'?", "El movimiento brusco de la motosierra hacia arriba y atrás al cortar con la punta del espadín"],
        ["Normas de uso de la motosierra", "Freno de cadena bloqueado al arrancar, sujetar con las dos manos, acercarla al corte a pleno gas, nunca sobre hombros o cabeza y nunca en lugares cerrados (gases de escape)"],
        ["¿Qué es la motorradial?", "Una cortadora de disco (unos 30 cm y 3 mm) de motor de explosión de dos tiempos; el disco determina el material que corta"],
        ["Diferencia entre rebote y arrastre de la motorradial", "Rebote: al usar la parte superior del disco, la máquina va hacia el operario. Arrastre: al cortar una incisión que se cierra o pieza en tensión, sale lanzada hacia delante"],
        ["Clases de perneras anticorte por velocidad de cadena (UNE-EN 381-5)", "Clase 1: 20 m/s; clase 2: 24 m/s; clase 3: 28 m/s; protegen por deslizamiento, atrapamiento o frenado de la cadena, nunca al 100 %"],
      ],
      preguntas: [
        ["facil", "¿Qué proporción de aceite lleva la mezcla de la motosierra de dos tiempos?", ["2-5 %", "50 %", "Ninguna"], "M6 Corte."],
        ["media", "¿Con qué parte del espadín se produce el rebote?", ["Con la punta", "Con la base", "Con el lateral"], "M6 Corte."],
        ["media", "¿Dónde no debe usarse la motosierra de explosión?", ["En lugares cerrados o mal ventilados", "En exteriores", "En árboles caídos"], "M6 Corte."],
        ["media", "¿Qué técnica alarga la vida del disco adiamantado y reduce el polvo?", ["El corte en mojado", "Cortar en seco siempre", "Cortar despacio sin acelerar"], "M6 Corte."],
        ["media", "¿Para qué no debe usarse la motorradial?", ["Para devastar, porque la presión lateral puede romper el disco", "Para cortar metal", "Para cortar hormigón"], "M6 Corte."],
        ["dificil", "¿Cómo protege la pernera anticorte?", ["Sus fibras largas se arrancan y bloquean el piñón deteniendo la cadena", "Rebota la cadena", "Es de acero"], "M6 Corte."],
        ["dificil", "¿Qué distingue a la motorradial eléctrica?", ["No despide gases tóxicos y sirve en recintos cerrados, pero depende de corriente", "Es más grande", "No corta metal"], "M6 Corte."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["¿Para qué es imprescindible la sierra de sable?", "Para la excarcelación: cristal laminado, montantes, bisagras, puertas y techo; además corta casi cualquier material"],
        ["Precauciones al cortar montantes con sierra de sable", "Retirar el tapizado y localizar refuerzos de cinturones y generadores de gas de airbags; cortar de dentro hacia fuera y en dirección opuesta a la víctima, con protección dura"],
        ["Fases del oxicorte", "Calentar el acero a unos 900 °C con la llama de oxígeno y gas combustible, y cortarlo con un chorro de oxígeno que elimina los óxidos"],
        ["Componentes del equipo de oxicorte", "Botellas de oxígeno y acetileno, manorreductores, soplete, válvulas antirretroceso y mangueras"],
        ["¿Qué metales no se oxicortan?", "Aluminio y cobre; inoxidable, fundición y titanio requieren tratamiento especial; el acero al carbono sí"],
        ["Orden de apagado del soplete según el manual", "Cerrar primero la válvula de acetileno y después la de oxígeno"],
        ["¿Qué es el corte por plasma?", "Un chorro de gas calentado por arco eléctrico (núcleo de 10.000-30.000 °C) que funde y expulsa el metal; corta cualquier metal conductor"],
      ],
      preguntas: [
        ["facil", "¿En qué maniobra es imprescindible la sierra de sable?", ["Excarcelación", "Achique", "Ventilación"], "M6 Corte."],
        ["media", "¿Qué EPI respiratorio se usa al cortar cristal laminado?", ["Mascarilla de filtro de papel (bucal-nasal)", "ERA siempre", "Ninguno"], "M6 Corte."],
        ["media", "¿Qué dispositivo impide que la llama retroceda en el oxicorte?", ["La válvula antirretroceso", "El manómetro", "El chispero"], "M6 Corte."],
        ["media", "¿Puede oxicortarse el aluminio?", ["No", "Sí, fácilmente", "Solo con acetileno"], "M6 Corte."],
        ["media", "¿Cuándo no debe usarse el oxicorte en una intervención?", ["Si hay productos químicos, gases o combustibles implicados", "Nunca hay limitación", "Solo de noche"], "M6 Corte."],
        ["dificil", "¿Qué temperatura puede superar la llama del oxicorte según la NTP 495?", ["3.100 °C", "300 °C", "900 °C"], "M6 Corte."],
        ["media", "¿Qué hace el triscado de la sierra manual?", ["Inclina los dientes para que el corte sea más ancho y no se atasque", "Afila la hoja", "Endurece el mango"], "M6 Corte."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["¿Qué son herramientas manuales en el ámbito de bomberos?", "Las de manejo individual por fuerza humana y también las que, con otra energía, se sostienen con las manos"],
        ["Dos características de diseño de una herramienta manual", "Eficacia y ergonomía (adaptada a la mano, postura cómoda, peso adecuado, menos fuerza muscular)"],
        ["Riesgos principales de las herramientas manuales", "Golpes y cortes, lesiones oculares por proyecciones y esguinces por sobreesfuerzos"],
        ["Causas de accidentes con herramientas manuales", "Uso inadecuado, herramientas defectuosas, abuso para cualquier operación y mala conservación o transporte"],
        ["¿Cómo se transportan las herramientas al subir a una escalera?", "En cartera, cartuchera en la cintura o bolsa en bandolera, nunca en los bolsillos, con filos protegidos"],
        ["Normas técnicas que cita el manual para herramientas manuales", "NTP 391, 392 y 393 (condiciones generales de seguridad)"],
      ],
      preguntas: [
        ["facil", "¿Qué se hace con una herramienta con el mango astillado?", ["Retirarla para reparar o sustituir", "Usarla con cuidado", "Pintarla"], "M6 Manuales."],
        ["media", "¿Dónde no deben llevarse las herramientas al subir una escalera?", ["En los bolsillos", "En una cartuchera", "En una bolsa en bandolera"], "M6 Manuales."],
        ["media", "¿Qué tipo de accidentes provocan sobre todo las herramientas manuales?", ["Una parte importante de los leves", "Solo mortales", "Ninguno"], "M6 Manuales."],
        ["media", "¿Por qué no deben dejarse herramientas en sitios altos?", ["Pueden deslizarse y caer", "Se oxidan", "Se pierden"], "M6 Manuales."],
        ["dificil", "¿Qué requisito ergonómico incluye el diseño de una herramienta?", ["Considerar la dirección del esfuerzo y los momentos de reacción", "Ser de color rojo", "Pesar más de 5 kg"], "M6 Manuales."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["¿Para qué se usa el martillo percutor en bomberos?", "Para rescates en estructuras colapsadas (hormigón, mampostería) y para colocar anclajes en roca; combina giro y percusión"],
        ["Tipos de escaleras manuales del servicio", "De gancho (unos 4 m, 13 travesaños), de antepecho (aluminio, unos 14 peldaños, ganchos de 60 cm), de extensión o corredera y plegable o articulada"],
        ["Ángulo y sobrepaso correctos de una escalera de mano", "75° respecto a la horizontal y sobrepasar alrededor de 1 m el apoyo superior; arnés por encima de 3,5 m"],
        ["Normas citadas para escaleras", "NFPA 1931, NTP 239 y UNE-EN 131"],
        ["¿Qué es la herramienta TNT?", "Una herramienta multiuso de entrada forzada que combina hacha, palanca, estampidor (ariete), bichero y martillo"],
        ["¿Cómo se usa el batefuegos?", "Golpeando de forma pausada la base de las llamas y barriendo hacia lo quemado; no sirve en matorral alto o con pinocha acumulada"],
        ["¿Qué hace el abrepuertas hidráulico?", "Separa pie y uña por presión hidráulica de una bomba manual (hasta unas 10 t) para abrir puertas bloqueadas; norma EN 13204"],
      ],
      preguntas: [
        ["facil", "¿Cuál es el ángulo ideal de una escalera de mano?", ["75°", "45°", "90°"], "M6 Manuales."],
        ["media", "¿Por encima de qué altura se exige sistema anticaídas al trabajar en escalera?", ["3,5 m", "10 m", "1 m"], "M6 Manuales."],
        ["media", "¿Pueden subir dos personas a la vez por una escalera de mano?", ["No", "Sí", "Solo si es de aluminio"], "M6 Manuales."],
        ["media", "¿Qué desventaja tienen las escaleras de aluminio?", ["Son buenas conductoras de la electricidad", "Pesan mucho", "No se pueden inspeccionar"], "M6 Manuales."],
        ["media", "¿Qué herramienta forestal combina azada y hacha?", ["Pulaski", "McLeod", "Batefuegos"], "M6 Manuales."],
        ["dificil", "¿Por qué no se pintan las escaleras de madera?", ["Para poder apreciar posibles defectos", "Porque se pudren", "Por normativa estética"], "M6 Manuales."],
        ["media", "¿Qué indica la etiqueta indicadora de calor en el larguero?", ["Si la escalera ha estado expuesta a alta temperatura", "Su fecha de compra", "Su peso"], "M6 Manuales."],
      ],
    },
  ],
  glosario: [
    [S1, "Esfuerzo cortante", "Esfuerzo que tiende a separar un material deslizando una parte respecto a otra."],
    [S2, "Kickback (rebote)", "Movimiento brusco de la motosierra hacia el operario al cortar con la punta del espadín."],
    [S2, "Espadín", "Barra guía de la motosierra sobre la que gira la cadena."],
    [S3, "Válvula antirretroceso", "Dispositivo del oxicorte que solo deja pasar el gas en un sentido e impide el retroceso de llama."],
    [S3, "Montante", "Pilar de la carrocería de un vehículo (A, B, C, D) que se corta en la excarcelación."],
    [S4, "Ergonomía", "Adaptación de la herramienta a las características del usuario para trabajar sin forzar posturas."],
    [S5, "Escalera de antepecho", "Escalera con grandes ganchos para colgarse de ventanas, terrazas o balaustradas."],
    [S5, "TNT", "Herramienta multiuso de entrada forzada que combina hacha, palanca, ariete, bichero y martillo."],
  ],
  casos: [
    {
      slug: "caso-arbol-caido-calzada",
      titulo: "Un árbol caído sobre la calzada",
      supuesto: "Tras un temporal, un árbol grande ha caído sobre una calle y aplasta parcialmente un coche aparcado. Hay curiosos alrededor.",
      preguntas: [
        [S2, "facil", "¿Qué herramienta es la adecuada para trocear el árbol?", ["La motosierra", "La sierra de sable", "El oxicorte"], "M6 Corte."],
        [S2, "media", "¿Qué hay que hacer antes de arrancar?", ["Bloquear el freno de cadena", "Quitar el salvamanos", "Llenar el depósito en marcha"], "M6 Corte."],
        [S2, "media", "¿Qué zona del espadín provoca el rebote?", ["La punta", "La base", "Ninguna"], "M6 Corte."],
        [S2, "media", "¿Qué EPI específico protege las piernas?", ["Perneras anticorte", "Polainas de soldador", "Rodilleras de goma"], "M6 Corte."],
        [S1, "media", "¿Qué se hace con los curiosos?", ["Mantenerlos fuera de la zona de trabajo", "Dejarlos mirar de cerca", "Pedirles ayuda"], "M6 Corte."],
        [S2, "media", "¿Qué puede usarse para dirigir la caída de un tronco?", ["Cuñas de madera, plástico o aluminio", "Cinta americana", "Nada"], "M6 Corte."],
        [S2, "media", "¿Cómo se acerca la motosierra al corte?", ["Acelerando a fondo y apoyando el tope de garras", "Al ralentí", "Apagada"], "M6 Corte."],
        [S2, "media", "¿Cómo se reposta?", ["Con el motor frío y apagado, lejos de fuego", "En marcha", "Fumando"], "M6 Corte."],
        [S2, "dificil", "¿Qué daña con frecuencia las motosierras según el manual?", ["La falta de aceite de cadena o una viscosidad incorrecta", "El agua de lluvia", "La gasolina"], "M6 Corte."],
        [S2, "media", "Tras el trabajo, ¿qué mantenimiento se hace?", ["Limpiar cadena y espadín y revisar afilado y engrase", "Nada", "Pintarla"], "M6 Corte."],
      ],
    },
    {
      slug: "caso-excarcelacion-sierra-sable",
      titulo: "Excarcelación con sierra de sable",
      supuesto: "Un conductor atrapado tras una colisión. Hay que cortar el parabrisas laminado y los montantes A para abatir el techo, con un sanitario dentro atendiendo a la víctima.",
      preguntas: [
        [S3, "facil", "¿Qué herramienta corta el cristal laminado?", ["La sierra de sable", "La motosierra", "La pala"], "M6 Corte."],
        [S3, "media", "¿Cómo se protege a víctima y sanitario del polvo de cristal?", ["Cubriéndolos con un plástico y protección dura", "No hace falta", "Abriendo las ventanas"], "M6 Corte."],
        [S3, "media", "¿Qué hay que localizar antes de cortar un montante?", ["Refuerzos de cinturones y generadores de gas de airbags", "El depósito de agua", "La radio"], "M6 Corte."],
        [S3, "media", "¿En qué dirección se corta el montante?", ["De dentro hacia fuera y opuesta a la víctima", "Hacia la víctima", "Da igual"], "M6 Corte."],
        [S3, "media", "¿Dónde no se usa la sierra de sable?", ["Junto a la víctima (asientos, pedales)", "En el techo", "En las bisagras"], "M6 Corte."],
        [S3, "media", "¿Qué se hace al cambiar la hoja?", ["Desconectar o bloquear el interruptor", "Dejarla en marcha", "Mojarla"], "M6 Corte."],
        [S3, "media", "¿Qué EPI respiratorio usa el operario al cortar laminado?", ["Mascarilla de filtro de papel", "Ninguno", "ERA de circuito cerrado"], "M6 Corte."],
        [S3, "dificil", "¿Qué tipo de dentado corta de forma agresiva distintos espesores?", ["Paso variable", "Paso constante", "Sin dientes"], "M6 Corte."],
        [S1, "media", "¿Qué EPI general debe llevar?", ["Equipo completo con gafas o pantalla y protección auditiva", "Solo guantes", "Ninguno"], "M6 Corte."],
        [S3, "media", "Si hubiera que cortar el quitamiedos, ¿qué equipo podría usarse?", ["Oxicorte, si no hay combustibles ni gases implicados", "La sierra manual", "El batefuegos"], "M6 Corte."],
      ],
    },
    {
      slug: "caso-rescate-balcon-escaleras",
      titulo: "Rescate desde un primer piso con escaleras",
      supuesto: "En un incendio de un bajo, una persona está en el balcón del primer piso. La autoescala no puede acceder a la calle estrecha y se usan escaleras manuales.",
      preguntas: [
        [S5, "facil", "¿Qué escalera se cuelga de la balaustrada del balcón?", ["La de gancho o la de antepecho", "La de tijera", "Ninguna"], "M6 Manuales."],
        [S5, "media", "¿Cómo se lleva la escalera de gancho?", ["Al hombro entre los peldaños 6 y 7, con los ganchos hacia delante y dentro", "Arrastrándola", "En vertical sobre la cabeza"], "M6 Manuales."],
        [S5, "media", "¿Qué ángulo debe tener una escalera apoyada?", ["75°", "30°", "90°"], "M6 Manuales."],
        [S5, "media", "¿Cuánto debe sobrepasar el apoyo superior?", ["Alrededor de 1 m", "10 cm", "3 m"], "M6 Manuales."],
        [S5, "media", "¿Cómo se sube y baja?", ["De cara a la escalera y con las dos manos", "De espaldas", "Con una mano libre siempre"], "M6 Manuales."],
        [S5, "media", "¿Qué riesgo especial tiene una escalera de aluminio cerca de cables?", ["Conduce la electricidad", "Se quema", "Ninguno"], "M6 Manuales."],
        [S5, "media", "¿Cómo se levanta una escalera pesada?", ["Con varias personas, rodillas flexionadas y fuerza de piernas a la voz de mando", "Una sola persona con la espalda", "Tirando con cuerdas"], "M6 Manuales."],
        [S4, "media", "¿Dónde se llevan las herramientas al subir?", ["En cartuchera o bolsa, nunca en bolsillos", "En la boca", "En la mano libre"], "M6 Manuales."],
        [S5, "dificil", "¿Qué normas regulan las escaleras según el manual?", ["NFPA 1931, NTP 239 y UNE-EN 131", "RD 1644/2008 únicamente", "Ninguna"], "M6 Manuales."],
        [S5, "media", "Tras el incendio, ¿qué mantenimiento necesita la escalera?", ["Limpiarla, revisar sus partes y lubricar las móviles", "Ninguno", "Pintarla de rojo"], "M6 Manuales."],
      ],
    },
  ],
});
