/**
 * Crea tema-415 — Tema 8 de Operario/a Especialista (Ayto. Zaragoza, CONV
 * 5/2026, Anexo I): "Sistemas contra incendios: nociones básicas y tipos de
 * elementos. Grupos de presión: nociones básicas y tipos de elementos."
 *
 * Tema dedicado: une materias de tema-75/tema-291 (incendios) y tema-290
 * (grupos de presión), y cada número solo admite un canónico.
 *
 * Fuentes:
 * - RD 513/2017, Reglamento de instalaciones de protección contra incendios
 *   (BOE-A-2017-6606), leído en la API del BOE en esta sesión: anexo I,
 *   sección 1.ª (pulsadores a 25 m como máximo y entre 80 y 120 cm;
 *   abastecimiento de agua según UNE 23500; extintores portátiles de hasta
 *   20 kg y móviles de más, con la parte superior entre 80 y 120 cm y un
 *   recorrido máximo de 15 m; clases de fuego A, B, C, D y F de la UNE-EN 2;
 *   BIE de 25 mm semirrígida y 45 mm plana, a 1,50 m como máximo, a 5 m de
 *   cada salida de sector, separadas 50 m como máximo, mangueras de 30 y
 *   20 m y caudales de 85 y 160 l/min) y anexo II (mantenimiento trimestral
 *   por el titular o empresa; anual y quinquenal por empresa mantenedora;
 *   prueba de nivel C o timbrado del extintor y retimbrado; sustitución de
 *   mangueras cada 20 años; vida útil de detectores de 10 años si el
 *   fabricante no indica otra; constancia documental durante 5 años).
 * - RD 485/1997, señalización de seguridad (BOE-A-1997-8668): señales de
 *   equipos contra incendios en rojo.
 * - CTE DB HS4, apartado 3.2.1.5.1 (grupos de presión convencional y de
 *   accionamiento regulable), ya verificado en la sesión de Oficial
 *   Fontanero (tema-290); bombas centrífugas, cebado y presostatos como
 *   conocimiento técnico.
 * - Triángulo y tetraedro del fuego y métodos de extinción: conocimiento
 *   técnico consolidado.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-415-contra-incendios-grupos-presion.mjs
 */
import { sembrarTema, OPERARIO } from "./lib/sembrar-tema.mjs";

const RIPCI = "https://www.boe.es/buscar/act.php?id=BOE-A-2017-6606";
const RD485 = "https://www.boe.es/buscar/act.php?id=BOE-A-1997-8668";
const CTE_HS = "https://www.codigotecnico.org/pdf/Documentos/HS/DBHS.pdf";
const S1 = "fuego-clases-extincion";
const S2 = "equipos-proteccion-incendios";
const S3 = "mantenimiento-instalaciones-pci";
const S4 = "grupos-presion-bombas";

await sembrarTema({
  tema: {
    slug: "tema-415",
    titulo: "Sistemas contra incendios y grupos de presión: nociones básicas y tipos de elementos",
    descripcion: "El fuego: triángulo y tetraedro, clases de fuego (A, B, C, D y F) y métodos de extinción. Elementos de los sistemas contra incendios según el RIPCI (RD 513/2017): detección y alarma (detectores, pulsadores, central), extintores portátiles y móviles y sus agentes, bocas de incendio equipadas (BIE de 25 y 45 mm), hidrantes, rociadores automáticos, abastecimiento de agua y señalización (RD 485/1997). Mantenimiento: operaciones trimestrales del titular, anuales y quinquenales de la empresa mantenedora, timbrado de extintores y sustitución de mangueras. Grupos de presión: bombas centrífugas, cebado, grupo convencional (depósito auxiliar, dos bombas alternas, depósito de presión con membrana) y grupo de caudal variable con variador de frecuencia, según el CTE DB HS4.",
    contenido: "Qué hace falta para que haya fuego y cómo se apaga, qué equipos contra incendios hay en un edificio municipal (extintores, BIE, detectores, pulsadores) y cómo se revisan, y cómo funciona un grupo de presión que da agua a los pisos altos o a la red contra incendios.",
    enlaces_boe: [
      { url: RIPCI, titulo: "Real Decreto 513/2017, de 22 de mayo, Reglamento de instalaciones de protección contra incendios (BOE-A-2017-6606)" },
      { url: RD485, titulo: "Real Decreto 485/1997, de 14 de abril, señalización de seguridad y salud en el trabajo (BOE-A-1997-8668)" },
      { url: CTE_HS, titulo: "Código Técnico de la Edificación, DB HS4 Suministro de agua, apartado 3.2.1.5 (grupos de presión)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "El fuego: elementos, clases y métodos de extinción", articulos: "Anexo I RIPCI (clases de fuego) y conocimiento técnico", url: RIPCI },
      { seccion: S2, titulo: "Tipos de elementos de los sistemas contra incendios", articulos: "Anexo I, sección 1.ª RIPCI; RD 485/1997", url: RIPCI },
      { seccion: S3, titulo: "Mantenimiento de las instalaciones contra incendios", articulos: "Anexo II RIPCI", url: RIPCI },
      { seccion: S4, titulo: "Grupos de presión: bombas y elementos", articulos: "CTE DB HS4, apdo. 3.2.1.5", url: CTE_HS },
    ],
  },
  vinculo: { oposicion: OPERARIO.oposicion, bloqueId: OPERARIO.bloque, numero: 8 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Triángulo del fuego", "Combustible, comburente (el oxígeno del aire) y calor o energía de activación; si falta uno, no hay fuego"],
        ["Tetraedro del fuego", "Añade la reacción en cadena, que permite que el fuego se mantenga una vez iniciado"],
        ["Clase A", "Fuegos de materiales sólidos, normalmente orgánicos, que forman brasas (madera, papel, tejidos)"],
        ["Clase B", "Fuegos de líquidos o de sólidos licuables (gasolina, disolventes, aceites, ceras)"],
        ["Clases C y D", "C: fuegos de gases (butano, propano, gas natural). D: fuegos de metales (magnesio, sodio)"],
        ["Clase F", "Fuegos de aceites y grasas de cocina en los aparatos de cocinar"],
        ["Métodos de extinción", "Enfriamiento (quitar calor, p. ej. con agua), sofocación (quitar oxígeno, p. ej. con una manta o CO2), eliminación o dilución del combustible e inhibición de la reacción en cadena (polvo químico)"],
        ["Conato de incendio", "Fuego incipiente que puede controlarse con los medios de primera intervención, como un extintor"],
      ],
      preguntas: [
        ["facil", "El fuego de papel y cartón es de clase:", ["A", "B", "C"], "Anexo I RIPCI (UNE-EN 2)."],
        ["facil", "El fuego de un depósito de gasóleo es de clase:", ["B", "A", "D"], "Anexo I RIPCI (UNE-EN 2)."],
        ["media", "El fuego de aceite en una freidora de cocina es de clase:", ["F", "C", "D"], "Anexo I RIPCI (UNE-EN 2)."],
        ["media", "Los tres elementos del triángulo del fuego son:", ["Combustible, comburente y calor", "Agua, aire y tierra", "Humo, llama y brasas"], "Conocimiento técnico."],
        ["media", "Cubrir una sartén ardiendo con una tapa apaga el fuego por:", ["Sofocación", "Enfriamiento", "Dilución"], "Conocimiento técnico."],
        ["media", "El agua apaga el fuego principalmente por:", ["Enfriamiento", "Inhibición de la reacción en cadena", "Eliminación del comburente"], "Conocimiento técnico."],
        ["dificil", "El cuarto elemento que añade el tetraedro del fuego es:", ["La reacción en cadena", "El humo", "El viento"], "Conocimiento técnico."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Detección y alarma", "Detectores automáticos (de humo, de temperatura o de llama), pulsadores manuales de alarma, central de control y sirenas o avisadores"],
        ["Pulsadores de alarma (RIPCI)", "Como máximo a 25 m de recorrido desde cualquier origen de evacuación, con su parte superior entre 80 y 120 cm del suelo"],
        ["Extintor", "Aparato que proyecta un agente extintor por presión interna; portátil si pesa hasta 20 kg y móvil (sobre ruedas) si pesa más"],
        ["Colocación de extintores (RIPCI)", "Visibles, accesibles y cerca de las salidas, con la parte superior entre 80 y 120 cm del suelo; recorrido máximo de 15 m desde cualquier origen de evacuación hasta un extintor"],
        ["Agentes extintores", "Agua, espuma, polvo polivalente ABC, dióxido de carbono (CO2, adecuado para equipos eléctricos porque no conduce ni deja residuo) y agentes específicos para metales o aceites de cocina"],
        ["Bocas de incendio equipadas (BIE)", "Manguera semirrígida de 25 mm (hasta 30 m, para cualquier persona) o plana de 45 mm (hasta 20 m, requiere más formación); boquilla y válvula a 1,50 m como máximo; una a 5 m de cada salida de sector y separadas 50 m como máximo"],
        ["Hidrantes", "Tomas de agua exteriores, de columna o enterradas, para el uso de los bomberos"],
        ["Rociadores automáticos", "Sistema fijo que detecta el calor (una ampolla que se rompe) y descarga agua solo en la zona afectada, sin intervención humana"],
        ["Señalización", "Las señales de equipos de lucha contra incendios son rojas con pictograma blanco; las de evacuación y salvamento, verdes (RD 485/1997)"],
      ],
      preguntas: [
        ["media", "Según el RIPCI, la parte superior de un extintor debe quedar entre:", ["80 y 120 cm del suelo", "150 y 200 cm", "20 y 50 cm"], "Anexo I RIPCI."],
        ["media", "El recorrido máximo desde cualquier origen de evacuación hasta un extintor es de:", ["15 m", "25 m", "50 m"], "Anexo I RIPCI."],
        ["media", "Un extintor portátil tiene una masa de hasta:", ["20 kg", "6 kg", "50 kg"], "Anexo I RIPCI."],
        ["media", "Para apagar un fuego en un cuadro eléctrico en tensión, el agente más adecuado es:", ["CO2", "Agua a chorro", "Espuma"], "Conocimiento técnico."],
        ["media", "La BIE de manguera semirrígida, pensada para cualquier persona, tiene un diámetro de:", ["25 mm", "45 mm", "70 mm"], "Anexo I RIPCI."],
        ["dificil", "La distancia máxima recorrida desde cualquier origen de evacuación hasta un pulsador de alarma es:", ["25 m", "15 m", "50 m"], "Anexo I RIPCI."],
        ["facil", "Las señales de los equipos de lucha contra incendios son de color:", ["Rojo", "Verde", "Azul"], "RD 485/1997."],
        ["media", "La boquilla y la válvula de una BIE deben estar como máximo a:", ["1,50 m sobre el suelo", "2,50 m", "0,50 m"], "Anexo I RIPCI."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Mantenimiento trimestral (RIPCI)", "Lo puede hacer personal del fabricante, de una empresa mantenedora o del propio titular: comprobar que el extintor está en su sitio, sin daños, accesible y señalizado, con el manómetro en la zona verde y los precintos intactos"],
        ["Mantenimiento anual y quinquenal", "Solo por personal del fabricante o de una empresa mantenedora: revisión anual de extintores según la UNE 23120 y de BIE según la UNE-EN 671-3"],
        ["Timbrado de extintores", "Prueba de nivel C según el anexo III del Reglamento de equipos a presión (RD 809/2021); a partir de la fecha de timbrado se retimbra hasta tres veces"],
        ["BIE: comprobaciones del titular", "Señalización, accesibilidad, lectura del manómetro y estado de lanza, válvula y manguera"],
        ["Mangueras", "Las mangueras contra incendios deben sustituirse al menos cada 20 años desde su puesta en servicio, salvo que el fabricante garantice más"],
        ["Detectores", "Su vida útil es la que fije el fabricante; si no la fija, 10 años desde su puesta en servicio"],
        ["Registro del mantenimiento", "La empresa mantenedora y el titular conservan constancia documental del programa de mantenimiento al menos durante 5 años"],
      ],
      preguntas: [
        ["media", "La comprobación trimestral de los extintores puede hacerla:", ["El personal del propio titular de la instalación", "Solo un organismo de control", "Solo los bomberos"], "Anexo II RIPCI, tabla I."],
        ["media", "La revisión anual de los extintores debe hacerla:", ["Personal del fabricante o de una empresa mantenedora", "Cualquier empleado", "El usuario del edificio"], "Anexo II RIPCI, tabla II."],
        ["media", "En la revisión trimestral, el manómetro del extintor debe estar:", ["En la zona de operación (verde)", "A cero", "En la zona roja"], "Anexo II RIPCI, tabla I."],
        ["media", "Las mangueras contra incendios deben sustituirse al menos cada:", ["20 años", "5 años", "50 años"], "Anexo II RIPCI."],
        ["dificil", "Si el fabricante no establece la vida útil de los detectores de incendio, esta se considera de:", ["10 años", "5 años", "25 años"], "Anexo II RIPCI."],
        ["media", "La constancia documental del mantenimiento debe conservarse al menos:", ["5 años", "1 año", "10 años"], "Anexo II RIPCI."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Grupo de presión", "Equipo de bombeo que eleva la presión del agua cuando la de la red no basta para abastecer las plantas altas o una instalación contra incendios"],
        ["Bomba centrífuga", "Un rodete o impulsor giratorio comunica energía al agua, que se transforma en presión en la voluta o carcasa"],
        ["Cebado", "Llenado previo de agua de la bomba y de la tubería de aspiración; una bomba centrífuga convencional no aspira aire y sin cebar gira en vacío; la autocebante purga el aire sola"],
        ["Grupo convencional (HS4)", "Depósito auxiliar de alimentación (para no aspirar directamente de la red), al menos dos bombas iguales de funcionamiento alterno montadas en paralelo y depósitos de presión con membrana"],
        ["Depósito de presión con membrana", "Mantiene la presión entre unos límites, permite el arranque y parada automáticos de las bombas y amortigua los golpes de ariete"],
        ["Presostato", "Interruptor que arranca o para la bomba cuando la presión baja o sube de los valores ajustados"],
        ["Grupo de caudal variable (HS4)", "Con variador de frecuencia que ajusta la velocidad de las bombas para mantener constante la presión según la demanda; puede prescindir del depósito auxiliar"],
        ["Local del grupo de presión (HS4)", "De uso exclusivo y con espacio suficiente para el mantenimiento; puede alojar también el tratamiento de agua"],
        ["Abastecimiento de agua contra incendios (RIPCI)", "Fuentes de agua, equipos de impulsión y red general que aseguran caudal y presión durante el tiempo de autonomía exigido, según la norma UNE 23500"],
      ],
      preguntas: [
        ["media", "¿Por qué un grupo de presión convencional tiene al menos dos bombas de funcionamiento alterno?", ["Para mantener el servicio si una falla o está en mantenimiento", "Para duplicar siempre la presión", "Porque una es de agua caliente y otra de fría"], "CTE DB HS4."],
        ["media", "El depósito de presión con membrana sirve para:", ["Mantener la presión entre límites y permitir el arranque y parada automáticos", "Almacenar agua caliente", "Filtrar el agua"], "CTE DB HS4."],
        ["media", "El cebado de una bomba consiste en:", ["Llenar de agua la bomba y la tubería de aspiración antes de arrancar", "Engrasar el motor", "Vaciar el depósito"], "Conocimiento técnico."],
        ["media", "El dispositivo que arranca o para la bomba según la presión es el:", ["Presostato", "Termostato", "Cebador"], "Conocimiento técnico."],
        ["dificil", "El grupo de presión que mantiene constante la presión variando la velocidad de las bombas lleva:", ["Un variador de frecuencia", "Un vaso de expansión de calefacción", "Una válvula de esfera"], "CTE DB HS4."],
        ["media", "En un grupo convencional, las bombas aspiran el agua de:", ["Un depósito auxiliar de alimentación", "Directamente de la red pública", "La red de saneamiento"], "CTE DB HS4."],
        ["media", "El abastecimiento de agua contra incendios se rige por la norma:", ["UNE 23500", "UNE-EN 1057", "UNE 20315"], "Anexo I RIPCI."],
      ],
    },
  ],
  glosario: [
    [S1, "Comburente", "Sustancia que aviva la combustión; normalmente el oxígeno del aire."],
    [S1, "Sofocación", "Método de extinción que elimina o separa el oxígeno del combustible."],
    [S1, "Conato de incendio", "Fuego incipiente que puede apagarse con un extintor."],
    [S2, "BIE", "Boca de incendio equipada: manguera conectada a la red de agua contra incendios, lista para usar."],
    [S2, "Pulsador de alarma", "Dispositivo que se acciona a mano para dar la alarma de incendio."],
    [S2, "Polvo polivalente ABC", "Agente extintor válido para fuegos de clases A, B y C."],
    [S2, "Rociador automático", "Boquilla que se abre por el calor del incendio y descarga agua sobre la zona afectada."],
    [S3, "Timbrado", "Prueba de presión periódica del recipiente de un extintor según el Reglamento de equipos a presión."],
    [S3, "Empresa mantenedora", "Empresa habilitada para el mantenimiento anual y quinquenal de las instalaciones contra incendios."],
    [S4, "Grupo de presión", "Conjunto de bombas y depósitos que aumenta la presión del agua de una instalación."],
    [S4, "Cebado", "Llenado previo de agua de una bomba para que pueda funcionar."],
    [S4, "Variador de frecuencia", "Equipo que regula la velocidad del motor de la bomba para ajustar la presión a la demanda."],
  ],
  casos: [
    {
      slug: "revision-trimestral-centro-civico",
      titulo: "La revisión trimestral en el centro cívico",
      supuesto: "Tu responsable te pide que hagas la comprobación trimestral de los equipos contra incendios de un centro cívico. Encuentras un extintor en el suelo detrás de una pila de sillas, otro con el manómetro en la zona roja, una BIE con la puerta del armario bloqueada por una mesa y un pulsador sin señalizar.",
      preguntas: [
        [S3, "media", "¿Puede hacer esta comprobación trimestral el personal municipal?", ["Sí, la comprobación trimestral puede hacerla el personal del titular", "No, solo los bomberos", "No, solo un organismo de control", "Solo el fabricante"], "Anexo II RIPCI, tabla I."],
        [S2, "media", "El extintor que está en el suelo debe colocarse de modo que su parte superior quede entre:", ["80 y 120 cm del suelo", "0 y 50 cm", "150 y 200 cm", "200 y 250 cm"], "Anexo I RIPCI."],
        [S3, "media", "El extintor con el manómetro en la zona roja:", ["Debe retirarse y avisar a la empresa mantenedora para su revisión o recarga", "Puede seguir en su sitio", "Se rellena con agua", "Se golpea para que suba la aguja"], "Anexo II RIPCI."],
        [S3, "media", "La BIE bloqueada por una mesa incumple que:", ["Debe mantenerse una zona libre de obstáculos que permita acceder a ella y maniobrarla", "Debe estar siempre abierta", "Debe estar a más de 2 m de altura", "Debe estar escondida"], "Anexo I RIPCI."],
        [S2, "media", "¿De qué color debe ser la señal del pulsador de alarma?", ["Roja con pictograma blanco", "Verde con pictograma blanco", "Amarilla con borde negro", "Azul"], "RD 485/1997."],
        [S2, "dificil", "Desde cualquier punto del centro hasta un pulsador no debe haber más de:", ["25 m de recorrido", "15 m", "50 m", "100 m"], "Anexo I RIPCI."],
        [S3, "media", "En la BIE, el titular debe comprobar trimestralmente, entre otras cosas:", ["La presión leyendo el manómetro y el estado de lanza, válvula y manguera", "La caducidad del agua", "Que la manguera esté mojada", "Nada, es anual"], "Anexo II RIPCI, tabla I."],
        [S3, "media", "¿Durante cuánto tiempo hay que conservar constancia de este mantenimiento?", ["Al menos 5 años", "1 mes", "1 año", "No hace falta"], "Anexo II RIPCI."],
        [S2, "media", "La BIE del centro tiene manguera semirrígida. Su longitud máxima es de:", ["30 m", "20 m", "50 m", "10 m"], "Anexo I RIPCI."],
        [S2, "media", "Desde cualquier origen de evacuación hasta un extintor el recorrido no debe superar:", ["15 m", "25 m", "50 m", "5 m"], "Anexo I RIPCI."],
      ],
    },
    {
      slug: "conato-taller-carpinteria",
      titulo: "El conato de incendio en el taller",
      supuesto: "En el taller municipal, una chispa de la amoladora prende unos trapos con disolvente y serrín junto al banco de trabajo. Al lado hay un cuadro eléctrico. Tienes cerca un extintor de polvo ABC y otro de CO2.",
      preguntas: [
        [S1, "media", "Los trapos, el serrín y el disolvente ardiendo combinan fuegos de clase:", ["A y B", "C y D", "Solo D", "Solo F"], "Anexo I RIPCI (UNE-EN 2)."],
        [S2, "media", "¿Qué extintor es más adecuado para ese fuego mixto?", ["El de polvo polivalente ABC", "Uno de agua a chorro", "Uno específico de metales", "Ninguno"], "Conocimiento técnico."],
        [S2, "media", "Si el fuego alcanza el cuadro eléctrico en tensión, el agente más adecuado es:", ["El CO2", "El agua", "La espuma", "Un cubo de arena mojada"], "Conocimiento técnico."],
        [S1, "media", "Lo primero al detectar el conato es:", ["Dar la alarma y, si es incipiente y estás formado, intentar apagarlo sin ponerte en riesgo", "Seguir trabajando", "Abrir las ventanas", "Llamar al encargado por la tarde"], "Conocimiento técnico."],
        [S1, "media", "El polvo químico actúa, entre otras formas, por:", ["Inhibición de la reacción en cadena", "Aportación de oxígeno", "Aumento de la temperatura", "Dilución en agua"], "Conocimiento técnico."],
        [S1, "media", "El chispazo de la amoladora aportó al fuego:", ["La energía de activación (calor)", "El combustible", "El comburente", "La reacción en cadena"], "Conocimiento técnico."],
        [S2, "media", "Si el fuego no se puede controlar, debes:", ["Abandonar la zona, cerrar puertas y avisar a los servicios de emergencia", "Seguir intentándolo hasta agotar todos los extintores", "Esconderte en el almacén", "Usar el ascensor para salir"], "Conocimiento técnico."],
        [S2, "dificil", "Si en el taller hay rociadores automáticos, actuarán:", ["Por el calor, descargando agua solo en la zona afectada", "Solo si alguien pulsa la alarma", "En todo el edificio a la vez", "Solo con humo frío"], "Conocimiento técnico."],
        [S3, "media", "Tras usar el extintor, aunque no se haya vaciado del todo:", ["Debe retirarse y recargarse por una empresa mantenedora", "Se devuelve a su soporte tal cual", "Se tira a la basura", "Se rellena con agua"], "Anexo II RIPCI: comprobar que no ha sido descargado total o parcialmente."],
        [S1, "media", "Para prevenir, los trapos con disolvente deben:", ["Guardarse en recipientes metálicos cerrados y lejos de fuentes de calor", "Amontonarse junto al banco", "Secarse al sol junto a la amoladora", "Guardarse en bolsas de plástico"], "Conocimiento técnico y principios de prevención."],
      ],
    },
    {
      slug: "grupo-presion-no-arranca",
      titulo: "El grupo de presión que no arranca",
      supuesto: "En un edificio municipal de seis plantas, los usuarios de las plantas altas se quedan sin agua por las mañanas. En el cuarto de bombas encuentras un grupo de presión convencional con dos bombas centrífugas, un depósito auxiliar y un depósito de presión con membrana. Una de las bombas no arranca y la otra arranca y para continuamente.",
      preguntas: [
        [S4, "media", "¿Para qué sirve este grupo de presión?", ["Para elevar la presión del agua cuando la de la red no basta para las plantas altas", "Para calentar el agua", "Para evacuar las aguas residuales", "Para medir el consumo"], "CTE DB HS4."],
        [S4, "media", "¿Por qué el grupo tiene dos bombas iguales de funcionamiento alterno?", ["Para que el servicio continúe si una falla o está en mantenimiento", "Para que una sea de reserva contra incendios", "Porque lo exige la compañía eléctrica", "Para duplicar la presión siempre"], "CTE DB HS4."],
        [S4, "media", "Las bombas aspiran el agua del:", ["Depósito auxiliar de alimentación", "Saneamiento", "Calentador", "Vaso de expansión de calefacción"], "CTE DB HS4."],
        [S4, "dificil", "La bomba que arranca y para continuamente suele indicar un fallo en:", ["El depósito de presión con membrana (sin aire o membrana rota) o en el ajuste del presostato", "El contador de agua", "El sifón", "La llave de escuadra"], "Conocimiento técnico."],
        [S4, "media", "¿Qué elemento ordena el arranque y la parada de las bombas según la presión?", ["El presostato", "El termostato", "El diferencial", "El cebador"], "Conocimiento técnico."],
        [S4, "media", "Si se ha vaciado la tubería de aspiración, antes de arrancar una bomba centrífuga convencional hay que:", ["Cebarla", "Engrasar el rodete", "Calentarla", "Desmontar el impulsor"], "Conocimiento técnico."],
        [S4, "media", "Una mejora posible es sustituirlo por un grupo de caudal variable, que:", ["Ajusta la velocidad de las bombas con un variador de frecuencia y mantiene la presión constante", "Funciona sin electricidad", "No necesita bombas", "Solo funciona de noche"], "CTE DB HS4."],
        [S4, "media", "El cuarto de bombas debe ser, según el CTE HS4:", ["De uso exclusivo y con espacio suficiente para el mantenimiento", "Compartido con el almacén de pinturas", "Exterior y sin cerramiento", "Cualquier rincón del garaje"], "CTE DB HS4."],
        [S4, "media", "El depósito de presión con membrana además de regular arranques y paradas ayuda a:", ["Amortiguar los golpes de ariete", "Calentar el agua", "Filtrar la cal", "Medir el caudal"], "CTE DB HS4."],
        [S2, "media", "Si el edificio tuviera BIE, su red de agua debería garantizar caudal y presión durante al menos:", ["Una hora para las dos BIE hidráulicamente más desfavorables", "Diez minutos", "Un día", "No hay exigencia"], "Anexo I RIPCI."],
      ],
    },
  ],
});
