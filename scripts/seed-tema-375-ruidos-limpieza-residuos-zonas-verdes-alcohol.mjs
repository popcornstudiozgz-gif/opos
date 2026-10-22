/**
 * Crea tema-375 — Tema 48 de Policía Local: "Normativa reguladora de ruidos
 * y vibraciones, limpieza pública, tratamiento de residuos sólidos y zonas
 * verdes. Ordenanza reguladora del consumo indebido de bebidas alcohólicas,
 * fomento de la convivencia y prevención de actuaciones antisociales."
 *
 * Fuentes (textos vigentes de la sede electrónica del Ayuntamiento de
 * Zaragoza, leídos en esta sesión):
 * - Ordenanza para la protección contra Ruidos y Vibraciones (Pleno
 *   31-10-2001, BOPZ nº 280 de 05-12-2001), normativa/247: arts. 6, 12-25,
 *   31, 42 y 51-56.
 * - Ordenanza Municipal de limpieza viaria y gestión de residuos domésticos
 *   (aprobación definitiva Pleno 28-04-2023, BOPZ nº 123 de 02-06-2023),
 *   normativa/13139: arts. 8-12, 18, 23-25, 28-29, 45 y 73-91. Derogó la
 *   Ordenanza de Limpieza Pública, Recogida y Tratamiento de Residuos
 *   Sólidos de 1986, que es la que cita el temario ("limpieza pública,
 *   tratamiento de residuos sólidos"): se estudia la vigente.
 * - Ordenanza Municipal de Uso de Zonas Verdes (Pleno 13-02-1986, BOPZ nº
 *   140 de 19-06-1986; modificaciones de 2013 y 2014), normativa/102, texto
 *   consolidado íntegro.
 * - Ordenanza reguladora del consumo indebido de bebidas alcohólicas,
 *   fomento de la convivencia y prevención de actuaciones antisociales
 *   (aprobación definitiva Comisión de Pleno 11-09-2020, BOPZ nº 229 de
 *   03-10-2020), normativa/12063, texto íntegro.
 * Laguna señalada: la Ordenanza de Ruidos fija sus multas en pesetas con su
 * equivalencia en euros (150,25 / 901,52 / 1.803,04 euros), que se usan tal
 * cual aparecen.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-375-ruidos-limpieza-residuos-zonas-verdes-alcohol.mjs
 */
import { sembrarTema, POLICIA } from "./lib/sembrar-tema.mjs";

const N = (id) => `https://www.zaragoza.es/sede/servicio/normativa/${id}`;
const RUIDO = N(247), LIMPIEZA = N(13139), VERDES = N(102), ALCOHOL = N(12063);
const S1 = "ruidos-areas-comportamiento";
const S2 = "ruidos-vehiculos-infracciones";
const S3 = "limpieza-viaria-prohibiciones";
const S4 = "residuos-recogida-sanciones";
const S5 = "uso-zonas-verdes";
const S6 = "ordenanza-alcohol-convivencia";

await sembrarTema({
  tema: {
    slug: "tema-375",
    titulo: "Ruidos, limpieza, residuos, zonas verdes y consumo de alcohol en la vía pública (ordenanzas de Zaragoza)",
    descripcion: "Ordenanza de protección contra Ruidos y Vibraciones (2001): áreas acústicas y límites, control de vehículos, comportamiento en la vía pública y en las viviendas, obras, carga y descarga, alarmas, infracciones y sanciones. Ordenanza de limpieza viaria y gestión de residuos domésticos (2023): actuaciones prohibidas, actos públicos, animales, pintadas, separación y depósito de residuos, voluminosos, inspección y régimen sancionador. Ordenanza de Uso de Zonas Verdes (1986, consolidada): protección de plantas, perros, acampadas, grafitis, vehículos y mobiliario. Ordenanza del consumo indebido de bebidas alcohólicas y fomento de la convivencia (2020): venta y consumo en espacios públicos ('botellón'), infracciones, sanciones y medidas.",
    contenido: "Las ordenanzas municipales que el agente aplica a diario en la calle: el ruido de una fiesta o de una moto con el escape libre, las obras de noche, tirar basura o colillas, no recoger las cacas del perro, las pintadas, los muebles abandonados, pisar el césped o acampar en un parque, y el botellón. Para cada una se indica qué está prohibido, qué gravedad tiene, cuánto puede costar la multa y qué puede hacer el agente en el momento.",
    enlaces_boe: [
      { url: RUIDO, titulo: "Ordenanza para la protección contra Ruidos y Vibraciones de Zaragoza (BOPZ nº 280, 05-12-2001)" },
      { url: LIMPIEZA, titulo: "Ordenanza Municipal de limpieza viaria y gestión de residuos domésticos de Zaragoza (BOPZ nº 123, 02-06-2023)" },
      { url: VERDES, titulo: "Ordenanza Municipal de Uso de Zonas Verdes de Zaragoza (BOPZ nº 140, 19-06-1986, texto consolidado)" },
      { url: ALCOHOL, titulo: "Ordenanza reguladora del consumo indebido de bebidas alcohólicas, fomento de la convivencia y prevención de actuaciones antisociales (BOPZ nº 229, 03-10-2020)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "Ruidos: áreas acústicas, límites y comportamiento ciudadano", articulos: "arts. 6, 17-25, 31 y 42", url: RUIDO },
      { seccion: S2, titulo: "Ruidos: vehículos, infracciones y sanciones", articulos: "arts. 12-14 y 51-56", url: RUIDO },
      { seccion: S3, titulo: "Limpieza viaria: prohibiciones, actos públicos, animales y pintadas", articulos: "arts. 8-25", url: LIMPIEZA },
      { seccion: S4, titulo: "Residuos: depósito y recogida; inspección y régimen sancionador", articulos: "arts. 28-29, 45 y 73-91", url: LIMPIEZA },
      { seccion: S5, titulo: "Uso de zonas verdes", articulos: "arts. 1-11", url: VERDES },
      { seccion: S6, titulo: "Consumo indebido de bebidas alcohólicas y convivencia", articulos: "arts. 1-18", url: ALCOHOL },
    ],
  },
  vinculo: { oposicion: POLICIA.oposicion, bloqueId: POLICIA.bloqueParte2, numero: 48 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Áreas acústicas (art. 6)", "Tipo I: alta sensibilidad (hospitales, centros educativos o culturales); II: residencial, comercial y servicios; III: zonas E del PGOU; IV: industrial y logística; V: afecciones de infraestructuras; VI: interior de edificios"],
        ["Límites exteriores (art. 42)", "Día (8-22 h) / noche (22-8 h) en dB(A): tipo I, 55/45; tipo II, 65/55; tipo III, 55/55; tipo IV, 75/70"],
        ["Actividad humana (art. 18)", "Prohibido, si se superan los límites y en especial de 22 a 8 h, cantar, gritar o vociferar y hacer ruidos evitables en viviendas (reparaciones, mover muebles)"],
        ["Animales y aparatos (arts. 19-20)", "Los dueños deben evitar que sus animales molesten; televisores y equipos de música no deben superar los límites; electrodomésticos y aire acondicionado, prohibidos de 22 a 8 h si los superan"],
        ["Música al aire libre (art. 22)", "Necesita autorización y fianza; nunca más de 90 dB(A) a 5 m del foco, con un responsable identificado"],
        ["Obras (art. 23)", "Prohibidas de 22 a 8 h salvo urgencia o autorización expresa; durante el día, la maquinaria no puede superar 90 dB(A) a 5 m"],
        ["Carga y descarga (art. 25)", "Prohibida de 22 a 7 h cuando supere los límites de ruido"],
        ["Alarmas (art. 31)", "Solo monotonales o bitonales; prohibidas las de frecuencia variable; deben funcionar correctamente para no activarse sin causa"],
      ],
      preguntas: [
        ["media", "¿Qué límite exterior nocturno rige en un área de tipo II (residencial)?", ["55 dB(A)", "45 dB(A)", "70 dB(A)"], "Ordenanza de Ruidos, art. 42."],
        ["media", "¿Qué tipo de área acústica corresponde a un hospital?", ["Tipo I", "Tipo II", "Tipo IV"], "Art. 6."],
        ["media", "¿Entre qué horas están prohibidas, con carácter general, las obras con maquinaria?", ["Entre las 22 y las 8 horas", "Entre las 14 y las 16 horas", "Nunca"], "Art. 23."],
        ["media", "¿Qué nivel máximo no puede superar una actuación musical autorizada al aire libre?", ["90 dB(A) medidos a 5 metros", "120 dB(A)", "60 dB(A)"], "Art. 22."],
        ["media", "¿Desde qué hora se prohíbe la carga y descarga ruidosa en la vía pública?", ["Desde las 22 hasta las 7 horas", "Desde las 20 horas", "Desde medianoche"], "Art. 25."],
        ["dificil", "¿Qué alarmas prohíbe expresamente la Ordenanza?", ["Las de frecuencia variable de forma controlada", "Las monotonales", "Las bitonales"], "Art. 31."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Control de vehículos (art. 12)", "Todo vehículo debe someterse a las pruebas de ruido que pida la Policía Local; si excede, quince días para corregir y pasar inspección"],
        ["Inmovilización por ruido (art. 12)", "Si supera el límite en más de 6 dB(A), inmovilización directa; entre 2 y 6 dB(A), nuevo plazo de quince días y luego inmovilización; se retira con remolque, sin arrancarlo en la vía"],
        ["Prohibiciones (art. 13)", "Anular el silenciador, tubos resonadores o escape libre; aceleraciones innecesarias; música alta con ventanas abiertas; estacionar con el motor en marcha"],
        ["Bocina y alarmas (art. 14)", "En casco urbano solo ante peligro inminente, auxilio urgente o servicios de urgencia; sirenas hasta 90 dB(A) a 5 m; alarmas de vehículos privados hasta 85 dB(A) a 3 m"],
        ["Sirenas de noche (art. 14)", "Los vehículos de urgencia usarán solo la señal luminosa cuando omitir la sirena no entrañe peligro, especialmente de 22 a 8 h"],
        ["Leves (art. 54)", "Superar hasta 3 dB(A), forzar marchas o música alta en el coche, vehículos con exceso de más de 2 y menos de 6 dB(A), alarmas sin causa, gritar, ruidos de animales o aparatos"],
        ["Graves (art. 54)", "Superar entre 3 y 6 dB(A), circular sin silenciador, música en la calle sin permiso, obras o carga y descarga nocturnas por encima de los límites, dos leves en un año"],
        ["Muy graves (art. 54)", "Superar en 6 dB(A) o más, actividades sin licencia, negar el acceso a la inspección, manipular el limitador, vehículos con más de 7 dB(A) de exceso, dos graves en un año"],
        ["Sanciones (art. 55)", "Leves hasta 150,25 euros; graves hasta 901,52; muy graves hasta 1.803,04 (expresadas en pesetas en la Ordenanza); en casos de especial gravedad, el Alcalde puede suspender la actividad o multar hasta 6.010,12 euros"],
        ["Medidas provisionales (art. 56)", "Precinto de aparatos, equipos o vehículos, clausura temporal, suspensión de la licencia y fianzas"],
      ],
      preguntas: [
        ["media", "¿Puede la Policía Local exigir que un ciclomotor se someta a una prueba de ruido?", ["Sí, todos están obligados", "No", "Solo con orden judicial"], "Art. 12."],
        ["media", "¿Qué ocurre si una moto supera el límite de ruido en más de 6 dB(A) en la inspección?", ["Se inmoviliza directamente", "Se le da un mes", "Nada"], "Art. 12."],
        ["media", "Circular con el 'escape libre' es una infracción…", ["Grave", "Leve", "Muy grave"], "Arts. 13 y 54."],
        ["media", "¿Qué nivel máximo pueden tener las alarmas de los vehículos privados?", ["85 dB(A) a 3 metros", "120 dB(A)", "60 dB(A) a 10 metros"], "Art. 14."],
        ["media", "Manipular el equipo limitador de un bar musical es una infracción…", ["Muy grave", "Leve", "Grave"], "Art. 54."],
        ["dificil", "¿Cuál es la multa máxima de una infracción grave de la Ordenanza de Ruidos?", ["901,52 euros", "150,25 euros", "3.000 euros"], "Art. 55."],
        ["media", "¿Qué medida provisional puede adoptarse sobre un equipo que produce ruido?", ["Su precinto", "Su venta", "Ninguna"], "Art. 56."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Obligación y subsidiariedad (art. 8)", "Todos deben cumplir la Ordenanza; el Ayuntamiento puede exigir reparar el deterioro y hacer los trabajos subsidiariamente a costa del obligado"],
        ["Prohibición general (art. 11.1)", "Abandonar residuos en la vía o espacios públicos o ensuciarlos"],
        ["Conductas prohibidas (art. 11.2) I", "Arrojar colillas o basura, tirar residuos desde vehículos, arrojar objetos desde ventanas o balcones, sacudir alfombras, dar de comer a animales, abandonar animales muertos"],
        ["Conductas prohibidas (art. 11.2) II", "Meter materias encendidas en papeleras o contenedores, rebuscar en ellos, escupir u orinar en la vía pública, no recoger las heces de las mascotas, lavar o reparar vehículos en la calle y abandonar vehículos"],
        ["Balcones (art. 11.2.e)", "La limpieza de balcones y terrazas y el riego de sus plantas solo de 22 a 8 h, sin ensuciar ni molestar"],
        ["Papeleras (art. 12)", "Para residuos pequeños; prohibido meter bolsas de basura o envases y moverlas, volcarlas o dañarlas"],
        ["Actos públicos (art. 18)", "El organizador comunica o solicita con memoria de residuos, separa fracciones, pone aseos portátiles en actos multitudinarios y responde de la limpieza; puede exigirse fianza; quedan excluidas las reuniones y manifestaciones del art. 21 CE"],
        ["Muebles en la calle (art. 23)", "Prohibido abandonarlos salvo que se haya pedido su recogida y se esté en el horario fijado; pueden retirarse sin aviso a costa del dueño"],
        ["Animales (art. 24)", "Quien lleva el animal recoge sus deyecciones (salvo personas ciegas con perro guía), lleva bolsas y líquido para diluir la orina; prohibido que orinen en portales"],
        ["Pintadas (art. 25)", "Prohibidas pintadas, grafitis y adhesivos en espacios visibles y mobiliario; la limpieza la paga el autor (o, subsidiariamente, sus padres si es menor); salvo autorización artística"],
      ],
      preguntas: [
        ["media", "¿Está prohibido arrojar colillas a la vía pública?", ["Sí", "No", "Solo en el centro"], "Ordenanza de limpieza, art. 11.2.a)."],
        ["media", "¿En qué horario puede regarse las plantas de un balcón?", ["De 22 a 8 horas", "De 8 a 22 horas", "En cualquier momento"], "Art. 11.2.e)."],
        ["media", "¿Debe recoger los excrementos el dueño de un perro guía ciego?", ["No, está eximido", "Sí", "Solo de día"], "Art. 24.2."],
        ["media", "¿Qué deben llevar quienes pasean perros?", ["Bolsas para las deposiciones y líquido para diluir la orina", "Nada", "Un bozal siempre"], "Art. 24.4."],
        ["media", "¿Quién paga la limpieza de una pintada hecha por un menor?", ["El autor y, subsidiariamente, quienes respondan por él según la legislación civil", "El Ayuntamiento", "Nadie"], "Art. 25.2."],
        ["dificil", "¿Están sometidas a las obligaciones de limpieza del art. 18 las manifestaciones del art. 21 CE?", ["No, están excluidas", "Sí", "Solo si son de más de 100 personas"], "Art. 18.8."],
        ["media", "¿Puede dejarse un colchón en la calle sin haber pedido su recogida?", ["No", "Sí", "Sí, de noche"], "Arts. 23 y 45."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Obligaciones del usuario (art. 28)", "Reducir volumen, separar por fracciones en bolsas cerradas, respetar horarios y no depositar en un contenedor lleno ni en la calle"],
        ["No permitido (art. 29)", "Abandonar residuos fuera de lugar, dejar palés o escombros junto a contenedores, rebuscar o desplazar contenedores y quemar residuos"],
        ["Voluminosos (art. 45)", "No en la calle ni en contenedores; recogida municipal a petición, gestor autorizado o punto limpio fijo"],
        ["Vigilancia (art. 73)", "El personal de inspección de limpieza y residuos y la Policía Local, con condición de agentes de la autoridad"],
        ["Actas (art. 74)", "Recogen fecha, hora, lugar, presunto infractor y hechos, con fotografías si es posible; tienen presunción de veracidad"],
        ["Competencia (art. 77)", "El Gobierno de Zaragoza u órgano delegado incoa y resuelve; se aplican las Leyes 39 y 40/2015, el Decreto aragonés 28/2001 y la Ordenanza del procedimiento sancionador"],
        ["Muy graves (art. 82)", "Grafitis con materiales que dañan la superficie al limpiarse, vertidos con peligro grave para la salud o el medio ambiente, vandalismo grave en contenedores y mezclar residuos peligrosos (si no es delito)"],
        ["Graves (art. 83)", "Grafitis en servicio público o BIC no muy graves, no limpiar solares, carteles en bienes públicos, dañar contenedores o mobiliario, propaganda fuera de buzones y vertido de escombros o voluminosos"],
        ["Leves (art. 84)", "Lo no tipificado como grave o muy grave: tirar basura, no recoger las heces, escupir u orinar, rebuscar en contenedores, no separar residuos"],
        ["Sanciones (art. 86)", "Leves de 50 a 750 euros; graves de 751 a 1.500; muy graves de 1.501 a 3.000; grados mínimo, medio y máximo según agravantes"],
        ["Pago y sustitución (art. 89)", "50 % de reducción si se paga antes del inicio del procedimiento, 20 % antes de la resolución; posible sustitución por medidas alternativas"],
        ["Requerimiento (art. 88)", "En leves de grado mínimo sin reiteración se priman las medidas educativas: advertencia o requerimiento antes que sanción"],
      ],
      preguntas: [
        ["media", "¿Qué debe hacerse si el contenedor está lleno?", ["Llevar la bolsa a otro contenedor de la misma fracción", "Dejarla al lado", "Dejarla en la acera"], "Art. 28.1.e)."],
        ["media", "¿Tiene la Policía Local la condición de agente de la autoridad para vigilar esta Ordenanza?", ["Sí", "No", "Solo de noche"], "Art. 73."],
        ["media", "¿Cuál es la multa de una infracción leve de la Ordenanza de limpieza?", ["De 50 a 750 euros", "De 751 a 1.500 euros", "Hasta 3.000 euros"], "Art. 86."],
        ["media", "Dañar un contenedor sin inutilizarlo es una infracción…", ["Grave", "Leve", "Muy grave"], "Art. 83.6."],
        ["media", "Verter escombros de una obra menor en un descampado público es una infracción…", ["Grave", "Leve", "No es infracción"], "Art. 83.11."],
        ["dificil", "¿Qué reducción se obtiene pagando antes del inicio del procedimiento sancionador?", ["El 50 %", "El 20 %", "El 10 %"], "Art. 89.1."],
        ["media", "¿Está permitido quemar basura?", ["No", "Sí, en el campo", "Sí, de noche"], "Art. 29.8."],
        ["media", "¿Quién resuelve los expedientes sancionadores de esta Ordenanza?", ["El Gobierno de Zaragoza u órgano en quien delegue", "La Policía Local", "El Pleno"], "Art. 77.3."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["Objeto (art. 1)", "Determinar y normalizar el uso de los espacios libres y zonas verdes del término municipal"],
        ["Bienes de dominio y uso público (art. 4)", "No pueden privatizarse para actos con fines particulares"],
        ["Obedecer indicaciones (art. 6)", "Los usuarios atienden las señales y las indicaciones de la Policía Local y del personal de Parques y Jardines"],
        ["Prohibido sin autorización (art. 7.1)", "Manipular plantas, pisar zonas acotadas o el césped ornamental, cortar flores, talar o podar, pelar árboles o clavar en ellos, atar objetos o trepar, tirar basura y encender fuego"],
        ["Sanciones del art. 7", "Leves de 50 a 250 euros (grado mínimo de 50 a 80 en algunos casos); graves (pelar o clavar en árboles, fuego) de 251 a 500; muy grave (talar, podar o arrancar árboles) de 501 a 750, con comunicación a la jurisdicción penal"],
        ["Perros (art. 7.2)", "Con correa (salvo excepciones de la Ordenanza de animales), por zonas de paseo, lejos de juegos infantiles, césped, macizos y fuentes; infracción leve de 80 euros"],
        ["Acampadas (art. 8.h)", "Prohibido acampar o instalar tiendas o vehículos habilitados en zonas verdes y vías públicas salvo lugares habilitados: leve de 50 a 250 euros; si es un asentamiento, grave de 251 a 500"],
        ["Alcohol en zonas verdes (art. 8 bis)", "Pueden acotarse áreas señalizadas en las que se prohíbe el consumo de bebidas alcohólicas"],
        ["Grafitis en parques (art. 9.b)", "Leve de 50 a 250 euros (con tiza, hasta 80); muy grave de 501 a 750 si el material daña la superficie; los agentes intervienen los materiales y pueden conminar a limpiar"],
        ["Vehículos (art. 10)", "No circulan vehículos a motor salvo excepciones; aparcamientos de visitantes desalojados de 23 a 7 h y a 10 km/h; las bicicletas circulan por caminos anchos, fuera de los espacios plantados"],
        ["Mobiliario (art. 11)", "Juegos infantiles para niños de 3 a 12 años; prohibido bañarse o meterse en fuentes y estanques (grave de 251 a 500 euros)"],
      ],
      preguntas: [
        ["media", "¿Está permitido pisar el césped ornamental?", ["No, salvo autorización", "Sí", "Solo los domingos"], "Ordenanza de Zonas Verdes, art. 7.1.c)."],
        ["media", "Talar o arrancar un árbol en un parque es una infracción…", ["Muy grave, de 501 a 750 euros, y se comunica a la jurisdicción penal", "Leve", "Grave"], "Art. 7.1."],
        ["media", "¿Cómo deben ir los perros en los parques, con carácter general?", ["Con correa y por las zonas de paseo", "Sueltos", "En brazos"], "Art. 7.2."],
        ["media", "¿Puede instalarse una tienda de campaña en un parque?", ["No, salvo en lugares habilitados", "Sí", "Sí, una noche"], "Art. 8.h)."],
        ["media", "¿A qué edades están destinados los juegos infantiles?", ["De 3 a 12 años", "Hasta 16 años", "Sin límite"], "Art. 11.a)."],
        ["dificil", "Bañarse en una fuente decorativa de un espacio público es una infracción…", ["Grave, de 251 a 500 euros", "Leve de 80 euros", "No es infracción"], "Art. 11.c)."],
        ["media", "¿Pueden circular bicicletas por las zonas verdes?", ["Sí, por caminos de anchura suficiente y fuera de los espacios plantados", "No", "Solo de noche"], "Art. 10."],
      ],
    },
    {
      seccion: S6,
      flashcards: [
        ["Objeto (art. 1)", "Desarrollar las normas sobre venta y consumo de bebidas alcohólicas en espacios públicos, en el ámbito de las competencias municipales"],
        ["Venta prohibida (art. 5)", "Desde coches, caravanas, carritos, tenderetes o neveras portátiles, gratis o no; venta ambulante fuera de mercados o ferias autorizados; máquinas automáticas sin control"],
        ["'Botellón' (art. 6.1)", "Prohibido beber alcohol con fines de ocio en reuniones de tres o más personas en espacios públicos, parques, plazas, vías o riberas; salvo merenderos y zonas destinadas a comer y beber"],
        ["En vehículos (art. 6.2)", "Prohibido consumir alcohol dentro de vehículos estacionados en espacios públicos o en su entorno inmediato"],
        ["Fiestas y conciertos (art. 8)", "Necesitan licencia; en espectáculos multitudinarios, vasos reutilizables y nunca vidrio"],
        ["Actuación de la Policía (art. 9)", "Puede inspeccionar locales; antes de denunciar, requiere restituir el espacio y retirar los residuos"],
        ["Responsables (art. 10)", "El autor; los menores de 14 años están exentos (se comunica al Ministerio Fiscal); responden también los titulares de locales y los adultos que dan alcohol a menores"],
        ["Muy graves (art. 12.1)", "Vender o suministrar alcohol a menores en los supuestos del art. 5, obstruir la inspección, organizar o promover botellones y tercera grave en un año"],
        ["Graves y leves (art. 12.2-3)", "Graves: venta prohibida del art. 5, beber en zonas de juego infantil o no recoger los residuos tras el requerimiento, y adultos que dan alcohol a menores; leve: el botellón en los demás casos"],
        ["Sanciones (art. 13)", "Leves de 150 a 600 euros; graves de 601 a 1.500; muy graves de 1.501 a 3.000"],
        ["Prescripción y plazo (art. 15)", "Infracciones: leves 6 meses, graves 2 años, muy graves 3 años; el procedimiento se resuelve en 6 meses"],
        ["Sustitución (art. 16)", "Las multas por botellón pueden sustituirse por trabajos para la comunidad, formación o programas preventivos; con menores se priorizan medidas educativas, incluso si reinciden"],
        ["Medidas (art. 17)", "La Policía Local retira las bebidas y objetos, puede pedir la intervención de limpieza y de los servicios sanitarios y evitar que la concentración se repita"],
      ],
      preguntas: [
        ["media", "¿A partir de cuántas personas está prohibido el consumo de alcohol con fines de ocio en la vía pública?", ["Tres o más", "Diez o más", "Cualquier número"], "Ordenanza del alcohol, art. 6.1."],
        ["media", "¿Está prohibido beber alcohol dentro de un coche aparcado en la vía pública?", ["Sí", "No", "Solo si el motor está en marcha"], "Art. 6.2."],
        ["media", "Organizar un botellón es una infracción…", ["Muy grave", "Leve", "Grave"], "Art. 12.1.c)."],
        ["media", "¿Cuál es la multa de una infracción leve de esta ordenanza?", ["De 150 a 600 euros", "De 50 a 250 euros", "De 601 a 1.500 euros"], "Art. 13."],
        ["media", "¿Están exentos de responsabilidad los menores de 14 años?", ["Sí; se comunica al Ministerio Fiscal", "No", "Solo de noche"], "Art. 10.2."],
        ["dificil", "Beber en grupo en una zona de juego infantil es una infracción…", ["Grave", "Leve", "Muy grave"], "Art. 12.2.c)."],
        ["media", "¿Qué tipo de vaso debe usarse en un concierto multitudinario autorizado?", ["Reutilizable, nunca de vidrio", "De vidrio", "Cualquiera"], "Art. 8.2."],
        ["media", "¿Qué hace el agente antes de denunciar, cuando proceda?", ["Requerir que se limpie el espacio y se retiren los residuos", "Nada", "Detener a todos"], "Art. 9.2."],
      ],
    },
  ],
  glosario: [
    [S1, "dB(A)", "Decibelio con ponderación A, unidad de medida del nivel sonoro percibido por el oído humano."],
    [S1, "Área acústica", "Zona del territorio con unos mismos objetivos y límites de ruido (tipos I a VI)."],
    [S2, "Escape libre", "Circulación sin silenciador o con dispositivos que anulan su acción; prohibida."],
    [S2, "Limitador-registrador", "Equipo que limita y registra el nivel sonoro de un local con música."],
    [S3, "Actuación subsidiaria", "Ejecución por el Ayuntamiento, a costa del obligado, de lo que este no hizo."],
    [S4, "Punto limpio", "Instalación municipal para depositar residuos especiales y voluminosos."],
    [S4, "CTRUZ", "Complejo para el Tratamiento de Residuos Urbanos de Zaragoza."],
    [S5, "Césped ornamental", "Césped que sirve de fondo a jardines con flor, seto recortado u otros trabajos de jardinería."],
    [S6, "Botellón", "Consumo de alcohol con fines de ocio por tres o más personas en un espacio público; prohibido."],
    [S6, "Medida sustitutiva", "Trabajos o formación que pueden reemplazar a la multa, sobre todo en menores."],
  ],
  casos: [
    {
      slug: "caso-botellon-ribera-ebro",
      titulo: "Botellón en la ribera del Ebro",
      supuesto: "Un viernes por la noche, una patrulla encuentra a ocho jóvenes bebiendo en la ribera junto al puente de Piedra, con música alta de un altavoz. Dos de ellos tienen 13 años. Un adulto del grupo reconoce que ha comprado las bebidas para los menores. Junto a ellos hay latas y vasos por el suelo.",
      preguntas: [
        [S6, "media", "¿Está prohibida esta reunión para beber?", ["Sí, por ser tres o más personas en un espacio público", "No", "Solo si hay menores"], "Ordenanza del alcohol, art. 6.1."],
        [S6, "media", "¿Qué deben requerir primero los agentes respecto a las latas y vasos?", ["Que se limpie el espacio y se retiren los residuos", "Nada", "Fotografiarlos solamente"], "Art. 9.2."],
        [S6, "media", "Si se niegan a recoger los residuos tras el requerimiento, la infracción pasa a ser…", ["Grave", "Leve", "No varía"], "Art. 12.2.c)."],
        [S6, "media", "¿Responden los menores de 13 años?", ["No, están exentos y se comunica al Ministerio Fiscal", "Sí, como adultos", "Sí, la mitad"], "Art. 10.2."],
        [S6, "media", "Entregar el adulto alcohol a los menores es una infracción…", ["Grave", "Leve", "No es infracción"], "Art. 12.2.d)."],
        [S6, "media", "¿Qué hacen los agentes con las bebidas?", ["Retirarlas", "Devolverlas", "Venderlas"], "Art. 17.2."],
        [S1, "media", "La música alta del altavoz en la vía pública por encima de los límites puede constituir infracción…", ["De la Ordenanza de Ruidos", "Penal", "Ninguna"], "Ordenanza de Ruidos, arts. 21 y 54."],
        [S6, "media", "¿Puede sustituirse la multa por botellón de los mayores por trabajos para la comunidad?", ["Sí", "No", "Solo si son extranjeros"], "Ordenanza del alcohol, art. 16."],
        [S6, "dificil", "¿Qué multa corresponde, en su caso, a una infracción grave de esta ordenanza?", ["De 601 a 1.500 euros", "De 150 a 600 euros", "Hasta 3.000 euros"], "Art. 13."],
        [S3, "media", "Además, tirar las latas al suelo vulnera la Ordenanza de limpieza, que prohíbe…", ["Abandonar residuos en espacios públicos", "Nada", "Solo las colillas"], "Ordenanza de limpieza, art. 11."],
      ],
    },
    {
      slug: "caso-moto-escape-libre-obra-nocturna",
      titulo: "Una moto con escape libre y una obra de madrugada",
      supuesto: "A las 2:00, vecinos de San José llaman al 092 por el ruido de una obra con martillo neumático en la calzada. Al acudir, los agentes paran además a un joven que circula en una moto sin silenciador acelerando continuamente. La obra no tiene autorización para trabajar de noche.",
      preguntas: [
        [S1, "media", "¿Pueden hacerse trabajos con maquinaria en la vía pública a las 2:00?", ["No, salvo urgencia o autorización expresa", "Sí", "Solo los sábados"], "Ordenanza de Ruidos, art. 23."],
        [S2, "media", "Trabajar con maquinaria de noche superando los límites es una infracción…", ["Grave", "Leve", "Muy grave"], "Art. 54."],
        [S2, "media", "¿Puede exigirse que la moto se someta a una prueba de ruido?", ["Sí", "No", "Solo en la ITV"], "Art. 12."],
        [S2, "media", "Circular sin silenciador es una infracción…", ["Grave", "Leve", "Muy grave"], "Art. 54."],
        [S2, "media", "Forzar las marchas acelerando innecesariamente es una infracción…", ["Leve", "Muy grave", "No es infracción"], "Art. 54."],
        [S2, "media", "Si en la inspección supera el límite en más de 6 dB(A), la moto…", ["Se inmoviliza directamente", "Tiene seis meses", "Nada"], "Art. 12."],
        [S2, "media", "¿Cómo se retira una moto inmovilizada?", ["Con remolque o carga, sin arrancarla en la vía pública", "Conduciéndola", "No se retira"], "Art. 12."],
        [S2, "dificil", "Si la moto superara el límite en más de 7 dB(A), la infracción sería…", ["Muy grave", "Grave", "Leve"], "Art. 54."],
        [S2, "media", "¿Qué medida provisional cabe sobre la maquinaria de la obra?", ["Su precinto", "Su subasta", "Ninguna"], "Art. 56."],
        [S1, "media", "¿Qué límite de nivel sonoro tiene la maquinaria de obra durante el día?", ["90 dB(A) a 5 metros", "120 dB(A)", "No tiene"], "Art. 23."],
      ],
    },
    {
      slug: "caso-parque-perro-grafiti-acampada",
      titulo: "Una mañana en el Parque Grande",
      supuesto: "En el Parque Grande, un agente observa a una persona con un perro suelto que entra en un macizo de flores y no recoge sus excrementos, a dos jóvenes haciendo un grafiti con espray en una estatua y una tienda de campaña instalada junto al estanque desde hace días.",
      preguntas: [
        [S5, "media", "¿Cómo debe ir el perro en el parque?", ["Con correa y por las zonas de paseo, sin entrar en macizos", "Suelto", "Como quiera"], "Ordenanza de Zonas Verdes, art. 7.2."],
        [S5, "media", "¿Qué sanción corresponde al incumplimiento del art. 7.2?", ["Leve, en grado mínimo, de 80 euros", "Muy grave", "Ninguna"], "Art. 7.2."],
        [S3, "media", "No recoger los excrementos vulnera además la Ordenanza de limpieza, como infracción…", ["Leve", "Muy grave", "Penal"], "Ordenanza de limpieza, arts. 24 y 84."],
        [S5, "media", "¿Qué hacen los agentes con los espráis?", ["Retirarlos e intervenirlos cautelarmente", "Devolverlos", "Nada"], "Ordenanza de Zonas Verdes, art. 9.b).4."],
        [S5, "media", "Si el espray daña la superficie al limpiarse, el grafiti en el parque es…", ["Muy grave, de 501 a 750 euros", "Leve", "Grave de 80 euros"], "Art. 9.b).3."],
        [S5, "media", "¿Qué pueden hacer los agentes si la pintada puede limpiarse en el momento?", ["Conminar a los infractores a limpiarla", "Nada", "Pintar encima"], "Art. 9.b).4."],
        [S5, "media", "¿Puede instalarse la tienda de campaña?", ["No, salvo en lugares habilitados", "Sí", "Sí, si no molesta"], "Art. 8.h)."],
        [S5, "dificil", "Si por su permanencia constituye un asentamiento, la infracción es…", ["Grave, de 251 a 500 euros", "Leve de 50 euros", "No es infracción"], "Art. 8.h)."],
        [S5, "media", "¿Deben los usuarios atender las indicaciones de la Policía Local en el parque?", ["Sí", "No", "Solo los menores"], "Art. 6."],
        [S5, "media", "¿Puede prohibirse el consumo de alcohol en determinadas zonas del parque?", ["Sí, en áreas acotadas y señalizadas", "No", "Solo en verano"], "Art. 8 bis."],
      ],
    },
  ],
});
