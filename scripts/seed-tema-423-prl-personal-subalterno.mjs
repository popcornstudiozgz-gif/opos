/**
 * Crea tema-423 — Tema 9 de Subalterna/o (Ayto. Zaragoza, CONV 5/2026,
 * Anexo I): "Prevención de riesgos laborales: conceptos básicos y
 * prevención de riesgos laborales en el ejercicio de las funciones propias
 * del personal subalterno."
 *
 * Tema dedicado: tema-25 (Ley 31/1995) no trata los riesgos propios del
 * puesto. Lenguaje sencillo.
 *
 * Fuentes leídas en esta sesión:
 * - Ley 31/1995, de Prevención de Riesgos Laborales (BOE-A-1995-24292):
 *   arts. 4, 14, 15, 18, 19, 21 y 29 (API del BOE).
 * - RD 1215/1997 (BOE-A-1997-17824), anexo II.4.2: escaleras de mano.
 * - RD 486/1997, lugares de trabajo (BOE-A-1997-8669), anexo I.A.3.
 * - RD 487/1997, manipulación manual de cargas (BOE-A-1997-8670) y Guía
 *   técnica del INSST de septiembre de 2024 (pesos de referencia).
 * - RD 488/1997, pantallas de visualización (BOE-A-1997-8671) y RD
 *   485/1997, señalización (BOE-A-1997-8668): títulos comprobados en la API
 *   del BOE; se citan solo como marco general.
 * - Riesgos concretos del puesto (caídas, cortes, golpes, guillotina,
 *   emergencias): conocimiento técnico preventivo consolidado; no se ha
 *   localizado una evaluación de riesgos pública del puesto de subalterno
 *   del Ayuntamiento de Zaragoza, así que no se citan datos internos.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-423-prl-personal-subalterno.mjs
 */
import { sembrarTema, SUBALTERNO } from "./lib/sembrar-tema.mjs";

const LPRL = "https://www.boe.es/buscar/act.php?id=BOE-A-1995-24292";
const RD1215 = "https://www.boe.es/buscar/act.php?id=BOE-A-1997-17824";
const RD487 = "https://www.boe.es/buscar/act.php?id=BOE-A-1997-8670";
const RD488 = "https://www.boe.es/buscar/act.php?id=BOE-A-1997-8671";
const GUIA_MMC = "https://www.insst.es/documents/94886/203536/Guia+tecnica+para+la+evaluacion+y+prevencion+de+los+riesgos+relativos+a+la+manipulacion+manual+de+cargas+2024.pdf";
const S1 = "prl-conceptos-basicos";
const S2 = "prl-derechos-obligaciones";
const S3 = "riesgos-personal-subalterno";
const S4 = "emergencias-evacuacion";

await sembrarTema({
  tema: {
    slug: "tema-423",
    titulo: "Prevención de riesgos laborales: conceptos básicos y prevención en las funciones del personal subalterno",
    descripcion: "Conceptos básicos de la Ley 31/1995: prevención, riesgo laboral, daños derivados del trabajo, riesgo grave e inminente, equipo de trabajo y equipo de protección individual (art. 4); principios de la acción preventiva (art. 15). Derechos y obligaciones: protección eficaz, información, formación, interrupción de la actividad ante un riesgo grave e inminente y obligaciones de los trabajadores (arts. 14, 18, 19, 21 y 29). Riesgos de las tareas del personal subalterno y su prevención: caídas, uso de escaleras de mano, manipulación de cargas (RD 487/1997 y Guía del INSST), cortes con guillotinas y cúter, golpes, electricidad, pantallas y atención al público. Actuación en emergencias y evacuación.",
    contenido: "Qué es la prevención de riesgos laborales, qué derechos y obligaciones tienes como trabajador y cómo evitar los accidentes más comunes del personal subalterno: resbalones, caídas de escaleras, cargar peso, cortes y emergencias.",
    enlaces_boe: [
      { url: LPRL, titulo: "Ley 31/1995, de 8 de noviembre, de Prevención de Riesgos Laborales (BOE-A-1995-24292)" },
      { url: RD1215, titulo: "Real Decreto 1215/1997, equipos de trabajo (escaleras de mano) (BOE-A-1997-17824)" },
      { url: RD487, titulo: "Real Decreto 487/1997, manipulación manual de cargas (BOE-A-1997-8670)" },
      { url: RD488, titulo: "Real Decreto 488/1997, pantallas de visualización (BOE-A-1997-8671)" },
      { url: GUIA_MMC, titulo: "INSST, Guía técnica sobre manipulación manual de cargas (septiembre de 2024)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "Conceptos básicos de prevención", articulos: "arts. 4 y 15 Ley 31/1995", url: `${LPRL}#a4` },
      { seccion: S2, titulo: "Derechos y obligaciones en prevención", articulos: "arts. 14, 18, 19, 21 y 29 Ley 31/1995", url: `${LPRL}#a14` },
      { seccion: S3, titulo: "Riesgos y prevención en las tareas del personal subalterno", articulos: "RD 1215/1997; RD 487/1997; Guía INSST", url: RD487 },
      { seccion: S4, titulo: "Emergencias y evacuación", articulos: "Conocimiento técnico preventivo", url: "" },
    ],
  },
  vinculo: { oposicion: SUBALTERNO.oposicion, bloqueId: SUBALTERNO.bloque, numero: 9 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Prevención (art. 4)", "Conjunto de actividades o medidas para evitar o disminuir los riesgos del trabajo"],
        ["Riesgo laboral (art. 4)", "Posibilidad de que un trabajador sufra un daño por su trabajo; su gravedad depende de la probabilidad y de la severidad del daño"],
        ["Daños derivados del trabajo (art. 4)", "Enfermedades, patologías o lesiones sufridas con motivo u ocasión del trabajo"],
        ["Riesgo grave e inminente (art. 4)", "El que es probable que ocurra muy pronto y puede causar un daño grave"],
        ["Equipo de trabajo (art. 4)", "Cualquier máquina, aparato, instrumento o instalación usada en el trabajo"],
        ["EPI (art. 4)", "Equipo de protección individual: lo lleva el trabajador para protegerse (guantes, gafas, calzado de seguridad)"],
        ["Principios de la prevención (art. 15)", "Evitar los riesgos, evaluar los que no se pueden evitar, combatirlos en su origen, adaptar el trabajo a la persona, sustituir lo peligroso por lo que lo es menos, anteponer la protección colectiva a la individual y dar instrucciones"],
        ["Protección colectiva e individual", "La colectiva protege a todos (una barandilla); la individual, a una persona (un casco). Primero se usa la colectiva"],
      ],
      preguntas: [
        ["facil", "La posibilidad de sufrir un daño por el trabajo se llama:", ["Riesgo laboral", "Prevención", "Accidente in itinere"], "Art. 4 Ley 31/1995."],
        ["media", "Los guantes y las gafas de protección son:", ["Equipos de protección individual (EPI)", "Protecciones colectivas", "Equipos de oficina"], "Art. 4 Ley 31/1995."],
        ["media", "¿Qué protección se usa primero según la Ley?", ["La colectiva", "La individual", "Ninguna"], "Art. 15.1.h) Ley 31/1995."],
        ["media", "El primer principio de la prevención es:", ["Evitar los riesgos", "Comprar EPI", "Esperar a que haya un accidente"], "Art. 15.1.a) Ley 31/1995."],
        ["media", "Un riesgo que puede ocurrir muy pronto y causar un daño grave es:", ["Un riesgo grave e inminente", "Un riesgo leve", "Un riesgo imposible"], "Art. 4 Ley 31/1995."],
        ["media", "Una fotocopiadora o una guillotina son:", ["Equipos de trabajo", "EPI", "Lugares de trabajo"], "Art. 4 Ley 31/1995."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Derecho a la protección (art. 14)", "Los trabajadores tienen derecho a una protección eficaz; la Administración tiene el deber de proteger a su personal; las medidas de seguridad no las paga el trabajador"],
        ["Información (art. 18)", "El trabajador debe recibir información sobre los riesgos de su puesto y las medidas para protegerse"],
        ["Formación (art. 19)", "Teórica y práctica, al empezar a trabajar y cuando cambian las tareas o los equipos; dentro del horario de trabajo y gratis para el trabajador"],
        ["Riesgo grave e inminente (art. 21)", "El trabajador tiene derecho a interrumpir su actividad y salir del lugar de trabajo si hay un riesgo grave e inminente para su vida o su salud"],
        ["Obligación principal del trabajador (art. 29)", "Cuidar de su propia seguridad y de la de las personas a las que pueda afectar su trabajo, siguiendo su formación y las instrucciones"],
        ["Obligaciones concretas (art. 29.2)", "Usar bien las máquinas y herramientas; usar los EPI; no quitar ni anular los dispositivos de seguridad; avisar de inmediato a su superior de cualquier riesgo; cooperar con el empresario"],
        ["Incumplimiento (art. 29.3)", "No cumplir las obligaciones de prevención es una falta disciplinaria para los funcionarios"],
      ],
      preguntas: [
        ["media", "La formación en prevención se da:", ["Dentro del horario de trabajo y sin coste para el trabajador", "Fuera del horario y pagada por el trabajador", "Solo a los jefes"], "Art. 19 Ley 31/1995."],
        ["media", "Si ves un riesgo en tu trabajo debes:", ["Avisar de inmediato a tu superior", "No decir nada", "Esperar a fin de mes"], "Art. 29.2.4.º Ley 31/1995."],
        ["media", "Ante un riesgo grave e inminente, el trabajador puede:", ["Interrumpir su actividad y salir del lugar de trabajo", "Seguir trabajando siempre", "Esconderse en el almacén"], "Art. 21.2 Ley 31/1995."],
        ["facil", "Quitar la protección de una máquina para ir más rápido:", ["Está prohibido", "Está permitido", "Es recomendable"], "Art. 29.2.3.º Ley 31/1995."],
        ["media", "Las medidas de seguridad las paga:", ["La Administración o la empresa, nunca el trabajador", "El trabajador", "Los vecinos"], "Art. 14.5 Ley 31/1995."],
        ["dificil", "Para un funcionario, no cumplir sus obligaciones de prevención es:", ["Una falta disciplinaria", "Algo sin consecuencias", "Un delito siempre"], "Art. 29.3 Ley 31/1995."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Caídas al mismo nivel", "Resbalones y tropiezos por suelos mojados, cables o cajas en el paso: mantener el orden y la limpieza, señalizar el suelo mojado y usar calzado adecuado"],
        ["Escaleras de mano (RD 1215/1997)", "Colocarlas a unos 75°, sobre suelo firme y con pies antideslizantes; subir y bajar de frente; no subir dos personas; no usar sillas ni cajas para subirse"],
        ["Manipulación de cargas (RD 487/1997)", "Primero usar carros o carretillas; si hay que cargar a mano: pies separados, flexionar las rodillas, espalda recta, carga pegada al cuerpo y no girar el tronco"],
        ["Pesos de referencia (Guía INSST 2024)", "En condiciones ideales, como máximo 25 kg para hombres de 20 a 45 años y 20 kg para mujeres de esa edad (menos para otras edades); más de 25 kg, mejor con ayuda o medios mecánicos"],
        ["Cortes", "Con guillotina, cúter o tijeras: usar las protecciones, cortar hacia fuera del cuerpo y guardar el cúter con la cuchilla recogida"],
        ["Golpes", "Contra puertas, cajones abiertos o estanterías: cerrar cajones, no correr y mirar al abrir puertas"],
        ["Electricidad", "No tocar enchufes o cables dañados; no sobrecargar regletas; las reparaciones eléctricas las hace personal especializado"],
        ["Pantallas de ordenador (RD 488/1997)", "Pantalla a la altura de los ojos o un poco por debajo, buena silla y pausas para descansar la vista"],
        ["Atención al público", "Mantener la calma, pedir ayuda si una situación se complica y avisar a seguridad o a la policía si hay agresión"],
      ],
      preguntas: [
        ["facil", "Para evitar resbalones, el suelo mojado debe:", ["Señalizarse", "Taparse con papel", "Dejarse así"], "Conocimiento técnico preventivo."],
        ["media", "Una escalera de mano se coloca con un ángulo aproximado de:", ["75°", "30°", "90°"], "Anexo II.4.2.2 RD 1215/1997."],
        ["media", "Para subir a un sitio alto se debe usar:", ["Una escalera adecuada", "Una silla con ruedas", "Una caja de cartón"], "RD 1215/1997."],
        ["media", "Antes de cargar una caja pesada a mano conviene:", ["Usar un carro o una carretilla si es posible", "Levantarla de golpe", "Doblar la espalda"], "Art. 3 RD 487/1997."],
        ["media", "Al levantar una caja hay que:", ["Flexionar las rodillas y mantener la espalda recta", "Estirar las piernas y doblar la espalda", "Girar el tronco"], "Guía INSST."],
        ["dificil", "Según la Guía del INSST, el peso máximo recomendado en condiciones ideales para una mujer de 30 años es:", ["20 kg", "40 kg", "50 kg"], "Guía INSST 2024, tabla 2."],
        ["media", "El cúter debe guardarse:", ["Con la cuchilla recogida", "Con la cuchilla fuera", "En el bolsillo abierto"], "Conocimiento técnico preventivo."],
        ["media", "Si ves un cable eléctrico dañado:", ["No lo tocas y avisas", "Lo arreglas con cinta adhesiva", "Lo escondes"], "Conocimiento técnico preventivo."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Plan de emergencia", "Cada edificio tiene un plan que dice cómo actuar ante un incendio u otra emergencia; hay que conocerlo"],
        ["Al descubrir un fuego", "Dar la alarma (pulsador o avisar), llamar al 112 si hace falta y, solo si es pequeño y sabes hacerlo, usar el extintor"],
        ["Evacuación", "Salir con calma por las salidas señalizadas, sin correr, sin volver a por objetos y sin usar el ascensor"],
        ["Si hay humo", "Ir agachado, cerca del suelo, y taparse la boca y la nariz si es posible"],
        ["Punto de encuentro", "Lugar exterior donde se reúnen las personas evacuadas para comprobar que no falta nadie"],
        ["Señales de evacuación", "Son verdes con dibujos blancos; las de los equipos contra incendios son rojas"],
        ["Puertas y pasillos de evacuación", "Deben estar siempre libres de obstáculos y las puertas de emergencia deben poder abrirse sin llave"],
        ["Ayudar a otras personas", "En una evacuación, se ayuda a las personas mayores, con discapacidad o con niños, siguiendo las instrucciones del equipo de emergencia"],
        ["Primeros auxilios", "Ante un accidente: proteger la zona, avisar al 112 y socorrer sin poner en riesgo la propia seguridad"],
      ],
      preguntas: [
        ["facil", "Durante una evacuación por incendio no se debe usar:", ["El ascensor", "La escalera", "Las salidas de emergencia"], "Conocimiento técnico preventivo."],
        ["media", "Si hay humo en el pasillo, hay que avanzar:", ["Agachado, cerca del suelo", "De pie y corriendo", "De espaldas"], "Conocimiento técnico preventivo."],
        ["facil", "El teléfono de emergencias es el:", ["112", "010", "016"], "Conocimiento general."],
        ["media", "El lugar exterior donde se reúnen las personas evacuadas es:", ["El punto de encuentro", "El almacén", "El ascensor"], "Conocimiento técnico preventivo."],
        ["media", "Las señales de salida de emergencia son de color:", ["Verde", "Rojo", "Amarillo"], "RD 485/1997."],
        ["media", "Las puertas de emergencia deben:", ["Estar libres y abrirse sin llave", "Estar cerradas con candado", "Tener muebles delante"], "Conocimiento técnico preventivo."],
        ["media", "Ante un accidente, lo primero es:", ["Proteger la zona y avisar al 112", "Mover a la persona herida enseguida", "Irse a casa"], "Conocimiento técnico preventivo (conducta PAS)."],
      ],
    },
  ],
  glosario: [
    [S1, "Prevención", "Medidas para evitar o reducir los riesgos del trabajo."],
    [S1, "Riesgo laboral", "Posibilidad de sufrir un daño por el trabajo."],
    [S1, "EPI", "Equipo de protección individual, como guantes, gafas o calzado de seguridad."],
    [S1, "Protección colectiva", "Medida que protege a todas las personas a la vez, como una barandilla."],
    [S2, "Riesgo grave e inminente", "Peligro que puede ocurrir muy pronto y causar un daño grave."],
    [S2, "Delegado de prevención", "Representante de los trabajadores en temas de seguridad y salud."],
    [S3, "Manipulación manual de cargas", "Levantar, transportar, empujar o tirar de objetos con la fuerza del cuerpo."],
    [S3, "Riesgo dorsolumbar", "Riesgo de dañarse la espalda, sobre todo la zona baja."],
    [S4, "Evacuación", "Salida ordenada de las personas de un edificio en una emergencia."],
    [S4, "Punto de encuentro", "Lugar seguro fuera del edificio donde se reúnen las personas evacuadas."],
    [S4, "Conducta PAS", "Proteger, Avisar y Socorrer: orden de actuación ante un accidente."],
  ],
  casos: [
    {
      slug: "manana-en-la-conserjeria",
      titulo: "Una mañana en la conserjería",
      supuesto: "Trabajas de subalterno en la conserjería de un edificio municipal. Esta mañana tienes que subir unas cajas de folios al archivo, colocar un cartel en lo alto de una pared y fregar la entrada porque ha llovido. Además, ves un cable pelado junto a la fotocopiadora.",
      preguntas: [
        [S3, "media", "Para llevar las cajas de folios al archivo, lo mejor es:", ["Usar un carro", "Llevar cinco cajas a la vez en brazos", "Arrastrarlas por las escaleras"], "Art. 3 RD 487/1997."],
        [S3, "media", "Si tienes que levantar una caja del suelo:", ["Flexiona las rodillas y mantén la espalda recta", "Dobla la espalda", "Levántala de un tirón"], "Guía INSST."],
        [S3, "media", "Para colocar el cartel en alto usarás:", ["Una escalera de mano en buen estado, bien apoyada", "Una silla de oficina con ruedas", "Una papelera"], "RD 1215/1997."],
        [S3, "media", "En la escalera de mano debes subir:", ["De frente a la escalera", "De espaldas", "Con otra persona a la vez"], "Anexo II.4.2.3 RD 1215/1997."],
        [S3, "facil", "Después de fregar la entrada debes:", ["Señalizar que el suelo está mojado", "Dejarlo sin avisar", "Poner cajas encima"], "Conocimiento técnico preventivo."],
        [S3, "media", "Con el cable pelado junto a la fotocopiadora:", ["No lo tocas, avisas y, si es posible, se desconecta el aparato", "Lo arreglas con cinta", "Lo pisas para que no se mueva"], "Conocimiento técnico preventivo."],
        [S2, "media", "¿A quién debes avisar del cable pelado?", ["A tu superior directo de inmediato", "A nadie", "A un vecino"], "Art. 29.2.4.º Ley 31/1995."],
        [S1, "media", "El cable pelado es un ejemplo de:", ["Riesgo laboral", "EPI", "Protección colectiva"], "Art. 4 Ley 31/1995."],
        [S3, "media", "Si una caja pesa 30 kg:", ["Es mejor moverla con ayuda o con un carro", "La levantas tú solo de golpe", "La lanzas"], "Guía INSST: más de 25 kg, probablemente riesgo no tolerable."],
        [S2, "media", "Si no sabes manejar el carro elevador del archivo:", ["Pides formación antes de usarlo", "Lo usas igualmente", "Lo desmontas"], "Art. 19 Ley 31/1995."],
      ],
    },
    {
      slug: "alarma-de-incendio",
      titulo: "Suena la alarma de incendio",
      supuesto: "Estás en la entrada de un centro cívico cuando suena la alarma de incendio. Hay humo en el pasillo de la primera planta. En el edificio hay una clase de personas mayores y un grupo de niños con sus monitores.",
      preguntas: [
        [S4, "facil", "¿Puedes usar el ascensor para bajar a las personas mayores?", ["No, nunca en un incendio", "Sí, es más rápido", "Sí, si va lleno"], "Conocimiento técnico preventivo."],
        [S4, "media", "Para salir, las personas deben seguir:", ["Las señales verdes de salida", "Las señales rojas", "Cualquier puerta"], "RD 485/1997."],
        [S4, "media", "En el pasillo con humo hay que ir:", ["Agachado, cerca del suelo", "Corriendo de pie", "Con los ojos cerrados"], "Conocimiento técnico preventivo."],
        [S4, "media", "Las personas evacuadas se reúnen en:", ["El punto de encuentro exterior", "El sótano", "Los aseos"], "Conocimiento técnico preventivo."],
        [S4, "media", "¿Se puede volver a entrar a por el bolso o el abrigo?", ["No", "Sí, rápidamente", "Sí, si el humo es poco"], "Conocimiento técnico preventivo."],
        [S4, "media", "A las personas mayores y a los niños se les:", ["Ayuda a salir siguiendo las instrucciones del equipo de emergencia", "Deja para el final sin ayuda", "Encierra en un aula"], "Conocimiento técnico preventivo."],
        [S4, "facil", "Para avisar a los bomberos se llama al:", ["112", "010", "091"], "Conocimiento general."],
        [S4, "media", "Las puertas de salida de emergencia deben:", ["Abrirse sin llave, empujando", "Estar cerradas con llave", "Tener mesas delante"], "Conocimiento técnico preventivo."],
        [S2, "media", "Ante un riesgo grave e inminente, los trabajadores tienen derecho a:", ["Interrumpir su actividad y salir del lugar", "Seguir trabajando", "Ser sancionados"], "Art. 21 Ley 31/1995."],
        [S4, "dificil", "Si el fuego fuera muy pequeño y tú supieras usar el extintor:", ["Podrías intentar apagarlo sin ponerte en peligro, después de dar la alarma", "Deberías apagarlo siempre, aunque fuera grande", "Nunca puedes usar un extintor"], "Conocimiento técnico preventivo."],
      ],
    },
    {
      slug: "guillotina-y-pantalla",
      titulo: "La guillotina y la pantalla",
      supuesto: "En la oficina de una Junta Municipal te piden cortar 200 tarjetas con la guillotina y luego pasar unos datos al ordenador durante dos horas. Un compañero te dice que la protección de la guillotina «molesta» y que es mejor quitarla.",
      preguntas: [
        [S2, "media", "¿Se puede quitar la protección de la guillotina?", ["No, no se deben quitar los dispositivos de seguridad", "Sí, si molesta", "Sí, para ir más rápido"], "Art. 29.2.3.º Ley 31/1995."],
        [S3, "media", "Al usar la guillotina hay que:", ["Mantener las manos fuera de la zona de corte", "Sujetar el papel justo debajo de la cuchilla", "Usarla sin mirar"], "Conocimiento técnico preventivo."],
        [S1, "media", "La guillotina es:", ["Un equipo de trabajo", "Un EPI", "Una señal"], "Art. 4 Ley 31/1995."],
        [S3, "media", "La pantalla del ordenador debe estar:", ["A la altura de los ojos o un poco por debajo", "Muy arriba, mirando al techo", "En el suelo"], "Conocimiento técnico preventivo (RD 488/1997)."],
        [S3, "media", "Después de un rato frente a la pantalla conviene:", ["Hacer pausas para descansar la vista", "Acercar la cara a la pantalla", "No parpadear"], "Conocimiento técnico preventivo (RD 488/1997)."],
        [S3, "media", "La silla de trabajo debe:", ["Ser estable y permitir una postura cómoda", "Tener tres patas", "Ser un taburete sin respaldo"], "Conocimiento técnico preventivo."],
        [S2, "media", "Si no te han explicado cómo usar la guillotina, tienes derecho a:", ["Recibir formación antes de usarla", "Nada", "Que lo haga otro siempre"], "Art. 19 Ley 31/1995."],
        [S2, "media", "Tu obligación como trabajador es:", ["Cuidar tu seguridad y la de los demás, siguiendo las instrucciones", "Ir lo más rápido posible", "Ignorar las normas"], "Art. 29.1 Ley 31/1995."],
        [S1, "media", "Antes de usar EPI, la Ley manda dar prioridad a:", ["La protección colectiva", "La protección individual", "Ninguna"], "Art. 15.1.h) Ley 31/1995."],
        [S3, "media", "Si te cortas con el papel o la guillotina:", ["Avisas, te lavas la herida y usas el botiquín", "Sigues trabajando sin decir nada", "Te pones cinta adhesiva sin limpiar"], "Conocimiento técnico preventivo."],
      ],
    },
  ],
});
