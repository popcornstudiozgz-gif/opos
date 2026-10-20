/**
 * Crea tema-326 — Tema 31 de Bombero/a Conductor/a: "Dispositivos de
 * protección contraincendios: hidrantes, extinción automática, BIEs,
 * ascensor de emergencia, alumbrado de emergencia, detección automática,
 * sistemas manuales de alarma, pulsadores, sistemas de comunicación y
 * sistemas fijos de extinción."
 *
 * Fuente: Tema 31 "Dispositivos de protección contraincendios" (V.2) de la
 * Escuela de Bomberos del Ayuntamiento de Zaragoza, leído íntegro. Las
 * normas que cita (CTE DB-SI —RD 314/2006—, RIPCI —RD 517/2017—, RSCIEI
 * —RD 2267/2004—, UNE-EN 54, EN 1838, UNE 23400, RD 485/1997) se recogen
 * tal como las cita el documento.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-326-dispositivos-proteccion-contraincendios.mjs
 */
import { sembrarTema, BOMBERO } from "./lib/sembrar-tema.mjs";

const FUENTE = "https://www.zaragoza.es/cont/vistas/portal//bomberos/doc/Tema_31._Dispositivos_de_proteccion_contraincendios_V2.pdf";
const S1 = "hidrantes";
const S2 = "bocas-incendio-equipadas";
const S3 = "ascensor-alumbrado-emergencia";
const S4 = "deteccion-alarma-comunicacion";
const S5 = "sistemas-fijos-extincion";

await sembrarTema({
  tema: {
    slug: "tema-326",
    titulo: "Dispositivos de protección contra incendios",
    descripcion: "Hidrantes (tipos, caudales, emplazamiento); bocas de incendio equipadas de 25 y 45 mm; ascensor de emergencia; alumbrado de emergencia; detección automática (detectores, central, lineales y por aspiración); pulsadores y sistemas de alarma y comunicación; sistemas fijos de extinción (agua pulverizada, rociadores, espuma, polvo y gases).",
    contenido: "Sigue el Tema 31 de la Escuela de Bomberos: qué instalaciones de protección contra incendios encontrará el bombero en un edificio, cómo están diseñadas según el CTE y el RIPCI y cómo puede aprovecharlas en la intervención (hidrantes para abastecer, ascensor de emergencia, central de detección) o tenerlas en cuenta (rociadores, inundación de gas).",
    enlaces_boe: [{ url: FUENTE, titulo: "Escuela de Bomberos de Zaragoza — Tema 31: Dispositivos de protección contraincendios (V.2)" }],
    indice_estudio: [
      { seccion: S1, titulo: "Hidrantes", articulos: "Tema 31, apartado 1", url: FUENTE },
      { seccion: S2, titulo: "Bocas de incendio equipadas (BIE)", articulos: "Tema 31, apartado 2", url: FUENTE },
      { seccion: S3, titulo: "Ascensor y alumbrado de emergencia", articulos: "Tema 31, apartados 3 y 4", url: FUENTE },
      { seccion: S4, titulo: "Detección automática, pulsadores, alarma y comunicación", articulos: "Tema 31, apartados 5, 6 y 7", url: FUENTE },
      { seccion: S5, titulo: "Sistemas fijos de extinción", articulos: "Tema 31, apartado 8", url: FUENTE },
    ],
  },
  vinculo: { oposicion: BOMBERO.oposicion, bloqueId: BOMBERO.bloqueParteII, numero: 31 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["¿Qué caudal mínimo deben dar los hidrantes?", "500 l/min en cada boca los de 80 mm y 1.000 l/min los de 100 mm, durante dos horas y con una presión mínima de 10 m.c.a."],
        ["¿A qué distancia de la fachada se sitúan los hidrantes?", "Entre 5 y 15 metros, con la boca central perpendicular a la fachada y de espaldas a ella"],
        ["¿Qué distancia máxima debe haber hasta un hidrante para considerar protegida una zona?", "Menos de 100 m en zonas urbanas y de 40 m en el resto"],
        ["¿Qué diferencia el hidrante de columna seca del de columna húmeda?", "La columna seca solo se llena al abrir la válvula principal bajo el suelo y se vacía sola tras el uso (protege de heladas); la húmeda está siempre cargada y sus bocas se usan de forma independiente"],
        ["¿Con qué se abre un hidrante de columna seca o bajo tierra?", "Con llave de cuadradillo"],
        ["¿Qué bocas llevan los hidrantes de 100 y 150 mm?", "Al menos dos de 70 mm y una de 100 mm, con racores UNE 23400 y sus tapas"],
      ],
      preguntas: [
        ["facil", "¿Durante cuánto tiempo debe mantener un hidrante su caudal mínimo?", ["Dos horas", "Diez minutos", "Doce horas"], "Tema 31."],
        ["media", "¿Qué caudal mínimo por boca debe dar un hidrante de 100 mm?", ["1.000 l/min", "500 l/min", "200 l/min"], "Tema 31."],
        ["media", "¿Qué tipo de hidrante se usa en aceras con problemas de espacio?", ["El hidrante bajo nivel de tierra", "El de columna húmeda", "El de columna seca"], "Tema 31."],
        ["media", "¿Qué se recomienda en cuanto al número de hidrantes?", ["Uno por cada 10.000 m² construidos o fracción", "Uno por planta", "Uno por calle"], "Tema 31."],
        ["dificil", "¿Qué separación mínima debe haber en la arqueta entre paredes y los mecanismos del hidrante enterrado?", ["5 cm", "50 cm", "1 cm"], "Tema 31."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["¿Qué tipos de BIE establece el RIPCI?", "La BIE de 25 mm, con manguera semirrígida en devanadera, y la BIE de 45 mm, con manguera plana"],
        ["¿Qué longitud máxima de manguera tienen las BIE?", "30 m las de 25 mm y 20 m las de 45 mm"],
        ["¿Qué posiciones debe permitir la lanza-boquilla de una BIE?", "Cierre, agua pulverizada y chorro lleno"],
        ["¿A qué altura y distancia de las salidas se instalan las BIE?", "Con el centro a 1,5 m del suelo como máximo y a 5 m como máximo de las salidas de cada sector de incendio"],
        ["¿Qué alcance nominal se considera para cubrir un sector con BIE?", "La longitud de su manguera incrementada en 5 metros"],
        ["¿Qué ángulo mínimo de apertura deben tener las puertas de los armarios de BIE?", "170º, para que la manguera se desenrolle libremente"],
      ],
      preguntas: [
        ["facil", "¿Qué BIE puede usar una persona sin formación especial?", ["La de 25 mm de manguera semirrígida", "La de 45 mm", "Ninguna"], "Tema 31."],
        ["media", "¿A qué presión mínima se prueba la red de BIE antes de su puesta en servicio?", ["980 kPa (10 kg/cm²) durante dos horas", "1 kg/cm² durante un minuto", "50 bares durante un día"], "Tema 31."],
        ["media", "¿De qué color deben ser los discos de la devanadera de la BIE de 25?", ["Rojo", "Verde", "Amarillo"], "Tema 31."],
        ["media", "¿En cuántas vueltas como máximo debe abrirse una válvula de globo de BIE?", ["Tres vueltas y media", "Diez vueltas", "Media vuelta"], "Tema 31."],
        ["dificil", "¿Qué fórmula relaciona caudal y presión en una BIE?", ["Q = K √P", "Q = K · P²", "Q = P / K"], "Tema 31."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["¿Qué características mínimas tiene el ascensor de emergencia?", "Carga de 630 kg, cabina de 1,10 x 1,40 m, paso de 1,00 m y recorrido completo en menos de 60 s"],
        ["¿Qué pulsador tiene el ascensor de emergencia en la planta de acceso?", "Un pulsador bajo tapa de vidrio con la inscripción «USO EXCLUSIVO BOMBEROS», que envía el ascensor a la planta de acceso y permite manejarlo solo desde la cabina"],
        ["¿Qué autonomía debe tener la alimentación propia del ascensor de emergencia?", "Al menos 1 hora"],
        ["¿Cuántos ascensores de emergencia se exigen?", "Uno accesible por cada mil ocupantes o fracción"],
        ["¿Qué tipos de alumbrado de seguridad define la EN 1838?", "Alumbrado de evacuación, antipánico y de zonas de alto riesgo; además existe el de reemplazamiento"],
        ["¿Qué cociente máximo entre iluminancia máxima y mínima se admite en rutas de evacuación?", "40:1"],
      ],
      preguntas: [
        ["facil", "¿Qué inscripción lleva el pulsador del ascensor de emergencia?", ["«USO EXCLUSIVO BOMBEROS»", "«EMERGENCIA»", "«NO USAR»"], "Tema 31."],
        ["media", "¿Qué capacidad mínima de carga tiene el ascensor de emergencia?", ["630 kg", "300 kg", "2.000 kg"], "Tema 31."],
        ["media", "¿Qué dimensiones mínimas tiene su cabina en uso hospitalario?", ["1,20 x 2,10 m", "1,10 x 1,40 m", "2 x 2 m"], "Tema 31."],
        ["media", "¿Qué alumbrado permite continuar las actividades normales sin cambios?", ["El alumbrado de reemplazamiento", "El antipánico", "El de evacuación"], "Tema 31."],
        ["dificil", "¿A qué distancia de cada equipo de extinción y pulsador debe haber alumbrado de emergencia?", ["A menos de 2 m", "A menos de 20 m", "No es necesario"], "Tema 31."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["¿Qué tipos de detectores de incendio existen?", "De calor (termostático, termovelocimétrico, combinado), de humo (iónico, óptico), de gases, de llamas y multisensores"],
        ["¿Qué detector actúa antes en un fuego de combustión lenta de cartón y en uno de líquido inflamable?", "En el de combustión lenta, el de humo; en el de líquido inflamable, probablemente el de llama"],
        ["¿Qué superficie máxima puede tener una zona de detección?", "1.600 m² en planta"],
        ["¿Qué ventajas tiene el detector óptico lineal de haz?", "Detecta humo en grandes áreas y techos altos: hasta 100 m de longitud y unos 1.600 m² teóricos, equivalentes a 16 detectores puntuales"],
        ["¿A qué distancia máxima debe estar un pulsador de alarma?", "Nadie debe recorrer más de 25 m para alcanzar uno"],
        ["¿Qué nivel sonoro deben tener las alarmas de incendio?", "Al menos 65 dB(A) o 5 dB(A) por encima del ruido ambiente; 75 dB(A) para despertar a personas; nunca más de 120 dB(A)"],
      ],
      preguntas: [
        ["facil", "¿Cada cuántos metros como máximo debe haber un pulsador de alarma accesible?", ["25 m", "100 m", "5 m"], "Tema 31."],
        ["media", "¿Qué detector se activa cuando la temperatura sube demasiado rápido?", ["El termovelocimétrico", "El iónico", "El de llama"], "Tema 31."],
        ["media", "¿Qué sistema de detección se usa en cuadros eléctricos, suelos técnicos o cámaras frigoríficas?", ["La detección de humo por aspiración (ASD)", "El detector de llama", "El pulsador"], "Tema 31."],
        ["media", "¿Qué nivel sonoro mínimo debe tener una alarma pensada para despertar a personas?", ["75 dB(A)", "40 dB(A)", "120 dB(A)"], "Tema 31."],
        ["dificil", "¿Por encima de qué velocidad del aire pueden dar falsas alarmas los detectores iónicos?", ["5 m/s", "0,5 m/s", "50 m/s"], "Tema 31."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["¿Qué sistemas fijos de extinción clasifica el RIPCI?", "Agua pulverizada, rociadores de agua, espuma física, polvo químico, CO2 y sustitutos de los hidrocarburos halogenados"],
        ["¿Cómo se activa un rociador automático?", "Por calor, al fundirse un fusible o romperse una ampolla con líquido que se dilata"],
        ["¿Qué temperaturas indican los colores de las ampollas de los rociadores?", "Naranja < 60 ºC; rojo < 70 ºC; amarillo < 80 ºC; verde < 85 ºC; azul < 140 ºC; malva < 180 ºC; negro > 200 ºC"],
        ["¿Qué diferencia los rociadores de agua de los de agua pulverizada?", "Solo el deflector: el de agua pulverizada proyecta una pulverización más fina"],
        ["¿Qué exige el RIPCI a los sistemas fijos de CO2?", "Que solo se usen si queda garantizada la evacuación, con retardo en el disparo y prealarma"],
        ["¿Hasta qué tensión puede usarse el polvo BC y el ABC según el Tema 31?", "El BC hasta 1.000 V y el ABC hasta 6.000 V"],
      ],
      preguntas: [
        ["facil", "¿De qué color es la ampolla de un rociador tarado a menos de 70 ºC?", ["Rojo", "Azul", "Negro"], "Tema 31."],
        ["media", "¿Qué expansión de espuma se usa para inundar cuartos de calderas y transformadores?", ["Media expansión", "Baja expansión", "Ninguna"], "Tema 31."],
        ["media", "¿Qué gas presurizador usan los sistemas fijos de polvo?", ["Nitrógeno seco", "Oxígeno", "Hidrógeno"], "Tema 31."],
        ["media", "¿Qué inconveniente tiene el sistema fijo de CO2?", ["Posible reignición con brasas y asfixia por desplazamiento del oxígeno", "Daña los equipos eléctricos", "Es muy caro"], "Tema 31."],
        ["dificil", "¿Qué color de ampolla corresponde a rociadores tarados por encima de 200 ºC?", ["Negro", "Malva", "Naranja"], "Tema 31."],
      ],
    },
  ],
  glosario: [
    [S1, "Hidrante", "Punto exterior de abastecimiento de agua para bomberos, capaz de dar mucho caudal en poco tiempo."],
    [S2, "BIE", "Boca de incendio equipada: manguera, lanza y válvula conectadas a una red siempre en carga, en armario."],
    [S3, "Ascensor de emergencia", "Ascensor con pulsador de uso exclusivo de bomberos, alimentación propia de 1 h y acceso protegido en cada planta."],
    [S4, "Detector termovelocimétrico", "Detector que se activa cuando la temperatura aumenta más deprisa de un valor fijado."],
    [S4, "ASD", "Sistema de detección de humo por aspiración, que muestrea el aire mediante una red de tuberías."],
    [S5, "Rociador", "Boquilla automática que se abre por calor y descarga agua sobre la zona de cobertura."],
  ],
  casos: [
    {
      slug: "caso-incendio-hotel-instalaciones",
      titulo: "Incendio en un hotel con instalaciones de protección",
      supuesto: "Salta la alarma en un hotel de doce plantas. Al llegar, la central de detección indica fuego en la planta 9 y algunos rociadores se han activado.",
      preguntas: [
        [S4, "facil", "¿Qué equipo indica en qué zona se ha activado un detector?", ["La central de control y señalización", "El pulsador", "La BIE"], "Tema 31."],
        [S3, "media", "¿Qué ascensor pueden usar los bomberos para subir?", ["El de emergencia, con el pulsador de uso exclusivo de bomberos", "Cualquiera", "Ninguno"], "Tema 31."],
        [S3, "media", "¿Qué ocurre al activar ese pulsador?", ["El ascensor va a la planta de acceso y solo se maneja desde la cabina", "Se bloquea", "Se va a la última planta"], "Tema 31."],
        [S3, "media", "¿Qué autonomía tiene su alimentación propia si falla la red?", ["Al menos 1 hora", "10 minutos", "24 horas"], "Tema 31."],
        [S5, "media", "¿Cómo se han activado los rociadores?", ["Por el calor, al romperse la ampolla o fundirse el fusible", "Manualmente", "Por el humo"], "Tema 31."],
        [S1, "media", "Para abastecer la autobomba, ¿a qué distancia de la fachada debería estar el hidrante?", ["Entre 5 y 15 m", "A más de 100 m", "Pegado a la pared"], "Tema 31."],
        [S2, "media", "Si un empleado usó la BIE de 25 mm antes de llegar, ¿qué longitud máxima tenía su manguera?", ["30 m", "20 m", "60 m"], "Tema 31."],
        [S4, "media", "¿Qué nivel sonoro deberían alcanzar las alarmas en las habitaciones con huéspedes durmiendo?", ["75 dB(A)", "45 dB(A)", "130 dB(A)"], "Tema 31."],
        [S3, "dificil", "¿Qué cociente máximo de iluminancias se admite en las rutas de evacuación?", ["40:1", "10:1", "100:1"], "Tema 31."],
        [S4, "media", "¿Cada cuánto como máximo puede repetirse un mensaje de voz de alarma?", ["Cada 30 segundos", "Cada 5 minutos", "Una sola vez"], "Tema 31."],
      ],
    },
    {
      slug: "caso-nave-industrial-hidrante-espuma",
      titulo: "Una nave industrial con hidrantes y espuma fija",
      supuesto: "Arde parte de una nave industrial con depósitos de líquidos inflamables protegidos por un sistema fijo de espuma. Hay hidrantes de columna seca en el exterior.",
      preguntas: [
        [S1, "facil", "¿Con qué llave se abre el hidrante de columna seca?", ["Con llave de cuadradillo", "Con llave de racorar", "Con llave de ascensor"], "Tema 31."],
        [S1, "media", "¿Qué ventaja tiene el hidrante de columna seca?", ["Se vacía tras su uso y no se daña con las heladas", "Está siempre lleno", "No necesita llave"], "Tema 31."],
        [S1, "media", "¿Qué caudal mínimo da cada boca de un hidrante de 80 mm?", ["500 l/min", "1.000 l/min", "50 l/min"], "Tema 31."],
        [S5, "media", "¿Qué expansión de espuma usan los sistemas fijos para tanques de líquidos inflamables?", ["Baja expansión", "Alta expansión", "Ninguna"], "Tema 31."],
        [S5, "media", "¿Entre qué porcentajes mezclan los proporcionadores del sistema fijo de espuma?", ["Entre el 1 % y el 6 %", "Entre el 20 % y el 30 %", "Al 50 %"], "Tema 31."],
        [S5, "media", "¿Qué tipo de espuma ya no se usa en estos sistemas?", ["La espuma química", "La espuma física", "La AFFF"], "Tema 31."],
        [S4, "media", "¿Qué detector es útil en una nave de techos muy altos?", ["El detector óptico lineal de haz", "El detector puntual iónico", "Ninguno"], "Tema 31."],
        [S4, "dificil", "¿Qué distancia longitudinal máxima cubre un detector de haz?", ["100 m", "10 m", "500 m"], "Tema 31."],
        [S1, "media", "¿A partir de qué superficie de sector deben tener hidrante los establecimientos industriales?", ["300 m² o más", "10.000 m²", "Nunca"], "Tema 31."],
        [S5, "media", "Si una zona estuviera protegida por CO2, ¿qué habría que comprobar antes de entrar?", ["Que se ha completado la evacuación y el riesgo de asfixia", "Nada", "Que hay luz"], "Tema 31."],
      ],
    },
    {
      slug: "caso-revision-instalaciones-edificio-oficinas",
      titulo: "Visita de prevención a un edificio de oficinas",
      supuesto: "Una dotación hace una visita de prevención a un edificio de oficinas para conocer sus instalaciones antes de una posible intervención.",
      preguntas: [
        [S2, "facil", "¿Qué BIE exige el RIPCI con manguera plana?", ["La de 45 mm", "La de 25 mm", "La de 70 mm"], "Tema 31."],
        [S2, "media", "¿A qué altura máxima debe estar el centro de una BIE?", ["1,5 m del suelo", "3 m", "0,5 m"], "Tema 31."],
        [S2, "media", "¿Qué debe dejarse alrededor de cada BIE?", ["Una zona libre de obstáculos", "Un extintor", "Nada"], "Tema 31."],
        [S4, "media", "¿Dónde deben situarse los pulsadores de alarma?", ["En las rutas de salida, junto a las escaleras de emergencia y en cada salida al aire libre", "En los despachos", "En el sótano"], "Tema 31."],
        [S4, "media", "¿Cuántas alarmas acústicas mínimo debe tener el edificio?", ["Dos", "Una", "Ninguna"], "Tema 31."],
        [S3, "media", "¿Dónde debe haber alumbrado de emergencia como mínimo?", ["En cada puerta de salida, escaleras, cambios de dirección y cruces de pasillos, entre otros", "Solo en recepción", "Solo en el exterior"], "Tema 31."],
        [S4, "media", "¿Qué superficie máxima puede tener una zona de detección si abarca varios compartimentos?", ["400 m²", "1.600 m²", "10.000 m²"], "Tema 31."],
        [S4, "media", "Según el CTE recogido en el Tema 31, ¿cuándo exige detección en todo un edificio administrativo?", ["Si excede de 5.000 m²", "Siempre", "Nunca"], "Tema 31."],
        [S2, "dificil", "¿Qué símbolo identifica las BIE según la Directiva 92/58/CEE y el RD 485/1997?", ["El símbolo prescrito de señalización de seguridad, mejor fotoluminiscente", "Un círculo azul", "Ninguno"], "Tema 31."],
        [S5, "media", "Si un archivo está protegido con un gas inerte, ¿qué sustituye ese gas?", ["A los halones prohibidos", "Al agua", "Al CO2 obligatoriamente"], "Tema 31."],
      ],
    },
  ],
});
