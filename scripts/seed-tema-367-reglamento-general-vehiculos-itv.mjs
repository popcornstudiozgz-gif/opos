/**
 * Crea tema-367 — Tema 40 de Policía Local: "Reglamento General de
 * Vehículos: Normas generales. Homologación, inspección y condiciones
 * técnicas de los vehículos de motor, remolques y semirremolques,
 * ciclomotores, ciclos, vehículos de tracción animal y tranvías.
 * Autorizaciones de circulación de vehículos. Anexos IX, XI, XII y XVIII.
 * Real Decreto por el que se regula la Inspección Técnica de Vehículos."
 *
 * Fuentes (textos consolidados descargados de la API del BOE, octubre 2026):
 * - Real Decreto 2822/1998, de 23 de diciembre, Reglamento General de
 *   Vehículos (BOE-A-1999-1826). Leídos los arts. 1-4 y 5-12 (homologación,
 *   reformas, ITV, condiciones técnicas), 19, 22, 22 bis (VMP, en la
 *   redacción del Real Decreto 52/2026, de 28 de enero, BOE-A-2026-2140,
 *   citado por el propio texto consolidado), 23-28, 34-36, 41 y 49; anexo IX
 *   (tabla 3 de dimensiones extraída del XML), anexo XI (señales V-1, V-2,
 *   V-3, V-13 a V-16, V-20, V-25), anexo XII (dotación, con la baliza V-16)
 *   y anexo XVIII (colores y número de placas).
 * - Real Decreto 920/2017, de 23 de octubre, Inspección Técnica de
 *   Vehículos (BOE-A-2017-12841; se verificó que BOE-A-2017-12659 NO es esta
 *   norma). Leídos los arts. 5, 6 (frecuencias), 9, 11 y 12.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-367-reglamento-general-vehiculos-itv.mjs
 */
import { sembrarTema, POLICIA } from "./lib/sembrar-tema.mjs";

const RGV = "https://www.boe.es/buscar/act.php?id=BOE-A-1999-1826";
const ITV = "https://www.boe.es/buscar/act.php?id=BOE-A-2017-12841";
const S1 = "rgv-normas-generales-autorizacion";
const S2 = "homologacion-condiciones-tecnicas";
const S3 = "matriculacion-bajas-placas";
const S4 = "anexos-ix-xii-masas-dotacion";
const S5 = "anexo-xi-senales-vehiculos";
const S6 = "inspeccion-tecnica-vehiculos";

await sembrarTema({
  tema: {
    slug: "tema-367",
    titulo: "Reglamento General de Vehículos e Inspección Técnica de Vehículos",
    descripcion: "Reglamento General de Vehículos (RD 2822/1998): autorización administrativa para circular y su falta; documentación que debe llevar el conductor; homologación, reformas de importancia e inspección técnica; condiciones técnicas de vehículos de motor, ciclos y bicicletas, vehículos de movilidad personal, vehículos de tracción animal y tranvías; matriculación, permiso de circulación, bajas definitivas y temporales; anexo IX (masas y dimensiones), anexo XI (señales en los vehículos), anexo XII (accesorios y dotación obligatoria, baliza V-16) y anexo XVIII (placas de matrícula). Real Decreto 920/2017: tipos de inspección, frecuencias, calificación de defectos y distintivo V-19.",
    contenido: "Todo lo que el agente comprueba del propio vehículo: si tiene permiso de circulación y tarjeta ITV, si la ITV está en vigor y con qué frecuencia toca, qué significan los defectos leves, graves y muy graves, los colores de las placas de matrícula (taxi, ciclomotor, remolque, diplomáticos…), las señales que llevan los vehículos (prioritario, obstáculo, novel, V-16) y qué deben llevar a bordo. Incluye las bicicletas y los patinetes, que ahora deben inscribirse en un registro de la DGT.",
    enlaces_boe: [
      { url: RGV, titulo: "Real Decreto 2822/1998, de 23 de diciembre, por el que se aprueba el Reglamento General de Vehículos (BOE-A-1999-1826)" },
      { url: ITV, titulo: "Real Decreto 920/2017, de 23 de octubre, por el que se regula la inspección técnica de vehículos (BOE-A-2017-12841)" },
      { url: "https://www.boe.es/buscar/doc.php?id=BOE-A-2026-2140", titulo: "Real Decreto 52/2026, de 28 de enero, que modifica el Reglamento General de Vehículos (BOE-A-2026-2140)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "RGV, Título I y art. 26: autorización y documentación", articulos: "arts. 1-4 y 26", url: `${RGV}#a1` },
      { seccion: S2, titulo: "RGV, Títulos II y III: homologación, reformas, condiciones técnicas, ciclos, VMP, tracción animal y tranvías", articulos: "arts. 5-24", url: `${RGV}#a5` },
      { seccion: S3, titulo: "RGV, Título IV: matriculación, bajas y placas; anexo XVIII", articulos: "arts. 25-49 y anexo XVIII", url: `${RGV}#a25` },
      { seccion: S4, titulo: "RGV, anexo IX (masas y dimensiones) y anexo XII (dotación)", articulos: "anexos IX y XII", url: `${RGV}#anix` },
      { seccion: S5, titulo: "RGV, anexo XI: señales en los vehículos", articulos: "anexo XI", url: `${RGV}#anxi` },
      { seccion: S6, titulo: "RD 920/2017: inspección técnica de vehículos", articulos: "arts. 5, 6, 9, 11 y 12", url: `${ITV}#a6` },
    ],
  },
  vinculo: { oposicion: POLICIA.oposicion, bloqueId: POLICIA.bloqueParte2, numero: 40 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Autorización para circular (art. 1.1)", "Todo vehículo necesita una autorización administrativa previa que verifica su estado y su ajuste a las prescripciones técnicas"],
        ["Sin autorización (art. 1.2)", "Circular sin ella, con ella anulada, sin vigencia o suspendida cautelarmente da lugar a la inmovilización del vehículo"],
        ["Clasificación (art. 4)", "Definiciones, clasificación y categorías de vehículos según los anexos I y II"],
        ["Documentos que lleva el conductor (art. 26.1)", "Permiso de circulación (licencia en ciclomotores) y tarjeta de inspección técnica (certificado de características en ciclomotores)"],
        ["Remolque de hasta 750 kg (art. 26.1.c)", "Tarjeta ITV del remolque y, en la del automóvil, constancia del sistema de acoplamiento compatible"],
        ["Originales o copias (art. 26.2)", "Deben ser originales, o fotocopias debidamente cotejadas"],
      ],
      preguntas: [
        ["media", "¿Qué ocurre si un vehículo circula sin autorización administrativa para circular?", ["Se inmoviliza hasta que se disponga de ella", "Nada si tiene seguro", "Se retira al desguace"], "Art. 1.2."],
        ["media", "¿Qué documentos del vehículo debe llevar el conductor de un turismo?", ["Permiso de circulación y tarjeta de inspección técnica", "Solo el seguro", "La factura de compra"], "Art. 26.1."],
        ["media", "En un ciclomotor, el permiso de circulación se sustituye por…", ["La licencia de circulación", "El DNI", "El certificado del concesionario"], "Art. 26.1.a)."],
        ["media", "¿Valen fotocopias de la documentación del vehículo?", ["Sí, si están debidamente cotejadas", "No, nunca", "Sí, cualquier fotocopia"], "Art. 26.2."],
        ["dificil", "¿Se inmoviliza el vehículo que circula durante la suspensión cautelar de su autorización de circulación?", ["Sí", "No", "Solo si es un camión"], "Art. 1.2, párrafo segundo."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Homologación (art. 5)", "Vehículos de motor, remolques y semirremolques deben corresponder a tipos homologados para su matriculación"],
        ["Reformas de importancia (art. 7)", "El titular debe regularizarlas ante el órgano competente en materia de industria"],
        ["ITV (art. 10)", "Los vehículos matriculados se someten a inspección en estaciones autorizadas por Industria: seguridad, medio ambiente, inscripciones y reformas"],
        ["Condiciones técnicas (art. 11)", "Visibilidad, retrovisores, limpiaparabrisas, dirección, marcha atrás, claxon (solo los prioritarios llevan señales acústicas especiales autorizadas), velocímetro si supera 40 km/h, cinturones y antiempotramiento"],
        ["Frenos de una motocicleta (art. 12.8.4)", "Dos dispositivos: uno al menos sobre la rueda trasera y otro sobre la delantera"],
        ["Ciclos (art. 22.1)", "Freno en ruedas delanteras y traseras y timbre, prohibido cualquier otro aparato acústico"],
        ["Bicicleta de noche (art. 22.4)", "Luz de posición delantera y trasera y catadióptrico trasero; facultativos los de radios y pedales"],
        ["VMP (art. 22 bis)", "Exentos de autorización de circulación, pero necesitan certificado de circulación, inscripción en el Registro de Vehículos Personales Ligeros y etiqueta identificativa"],
        ["Tracción animal (art. 23)", "Ruedas neumáticas o similares; galgas que no sobresalgan más de 10 cm; de noche, luces de posición delantera y trasera y catadióptricos; luces de un solo lado, a la izquierda"],
        ["Tranvías (art. 24)", "Luces de posición delantera y trasera y dispositivos luminosos delantero y trasero indicadores del servicio"],
      ],
      preguntas: [
        ["media", "¿Ante qué Administración se regularizan las reformas de importancia?", ["El órgano competente en materia de industria", "La Policía Local", "La Jefatura Provincial de Tráfico"], "Art. 7.2."],
        ["media", "¿Qué vehículos pueden llevar aparatos emisores de señales acústicas especiales?", ["Solo los prioritarios, debidamente autorizados", "Todos", "Los taxis"], "Art. 11.7."],
        ["media", "¿Qué aparato acústico puede llevar una bicicleta?", ["Solo un timbre", "Un claxon", "Una sirena"], "Art. 22.1."],
        ["media", "¿Qué alumbrado debe llevar una bicicleta que circula de noche?", ["Luz de posición delantera y trasera y catadióptrico trasero", "Solo un catadióptrico", "Ninguno en ciudad"], "Art. 22.4."],
        ["dificil", "Tras el Real Decreto 52/2026, un patinete eléctrico (VMP), para circular, debe…", ["Tener certificado de circulación, estar inscrito en el Registro de Vehículos Personales Ligeros y llevar la etiqueta identificativa", "Estar matriculado como un ciclomotor", "No necesita nada"], "Art. 22 bis.2."],
        ["media", "Si un vehículo de tracción animal lleva luces en un solo lado, ¿dónde van?", ["En el lado izquierdo del sentido de la marcha", "En el derecho", "Detrás"], "Art. 23.5."],
        ["media", "¿Desde qué velocidad en llano debe tener un vehículo de motor indicador de velocidad?", ["Más de 40 km/h", "Más de 25 km/h", "Más de 60 km/h"], "Art. 11.11."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Obligación de matricular (art. 25.1)", "Vehículos de motor y remolques y semirremolques de más de 750 kg; también ciclomotores"],
        ["Matrícula única (art. 27)", "Con excepciones: cambio de provincia con siglas provinciales, vehículos rematriculados y razones de seguridad personal acreditadas"],
        ["Policías autonómicas (art. 27.5)", "Sus vehículos pueden usar en su ámbito placas con contraseña y numeración propias"],
        ["Dónde se matricula (art. 28)", "En la Jefatura de Tráfico del domicilio legal del propietario, arrendatario con opción de compra o a largo plazo"],
        ["Trenes turísticos (art. 28.6)", "Necesitan además autorización complementaria; en vías urbanas, la del Ayuntamiento, con informe vinculante del titular de la vía"],
        ["Bajas definitivas (art. 35)", "Voluntad del titular, deterioro peligroso, abandono tras retirada por los agentes, traslado a otro país y, de oficio, sin ITV ni seguro en los últimos diez años"],
        ["Baja temporal voluntaria (art. 36)", "Máximo un año, prorrogable; también por sustracción con denuncia y por entrega a un compraventa"],
        ["Placa ordinaria (anexo XVIII)", "Fondo blanco y caracteres negros; cuatro cifras y tres consonantes (sin vocales, Ñ ni Q) y banda azul con la bandera europea y la E"],
        ["Colores especiales (anexo XVIII)", "Taxi y VTC hasta nueve plazas: trasera azul con caracteres blancos; vehículos especiales: blanca con caracteres rojos y letra E; remolques: roja con R; ciclomotores: amarilla con C"],
        ["Diplomáticas (anexo XVIII)", "CD fondo rojo; OI fondo azul; CC consulares fondo verde; TA amarilla"],
        ["Otras placas (anexo XVIII)", "Turística T con banda roja de caducidad; histórica H; temporal de particulares P en verde; de empresas S o V en rojo"],
        ["Número de placas (anexo XVIII.III)", "Automóviles: delantera y trasera; motocicletas, ciclomotores y cuatriciclos: solo trasera"],
      ],
      preguntas: [
        ["media", "¿De qué color es el fondo de la placa de matrícula de un ciclomotor?", ["Amarillo", "Blanco", "Rojo"], "Anexo XVIII, I.A.d)."],
        ["media", "¿Qué letra inicia la matrícula de un remolque de más de 750 kg?", ["R", "E", "C"], "Anexo XVIII, I.A.c)."],
        ["media", "¿De qué color es la placa trasera de un taxi?", ["Fondo azul con caracteres blancos", "Fondo blanco con caracteres negros", "Fondo verde"], "Anexo XVIII, I.A.a)."],
        ["media", "Una placa de fondo rojo con las letras CD corresponde a…", ["El Cuerpo diplomático", "Un vehículo de empresa", "Un remolque"], "Anexo XVIII, I.B.a).1.º"],
        ["media", "¿Cuántas placas de matrícula lleva una motocicleta?", ["Una, en la parte posterior", "Dos", "Ninguna"], "Anexo XVIII, III.2."],
        ["dificil", "¿Cuándo puede darse de baja de oficio un vehículo por presumirse que no existe o no circula?", ["Si no ha cumplido la ITV ni el seguro obligatorio en los últimos diez años", "Si no ha pasado la ITV en un año", "Nunca"], "Art. 35.5."],
        ["media", "¿Quién autoriza un tren turístico para circular por vías urbanas?", ["El Ayuntamiento", "La DGT", "La comunidad autónoma"], "Art. 28.6."],
        ["media", "¿Cuánto dura como máximo la baja temporal voluntaria?", ["Un año desde la solicitud, prorrogable", "Cinco años", "Indefinida"], "Art. 36.1.a)."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Longitudes máximas (anexo IX, tabla 3)", "Vehículos de motor y remolques: 12 m; articulados: 16,50 m; trenes de carretera y autobuses articulados: 18,75 m; autobús rígido de dos ejes: 13,50 m; euro-modulares: 32 m"],
        ["Anchura máxima (anexo IX)", "2,55 m como regla general; 2,60 m las superestructuras de vehículos acondicionados (temperatura dirigida)"],
        ["Altura máxima (anexo IX)", "4,00 m incluida la carga; 4,20 m autobuses urbanos clase I; 4,50 m portavehículos y vehículos grúa"],
        ["Giro (anexo IX, 3.2.2)", "Todo vehículo debe poder describir un círculo completo entre radios de 12,50 m y 5,30 m"],
        ["Masas prohibidas (anexo IX, 2.1)", "Presión superior a 9 kg/cm²; masas por eje o totales superiores a las de las tablas; trenes con menos de 3 m entre ejes de tractor y remolque"],
        ["Dotación de turismos (anexo XII.1)", "Baliza luminosa V-16, chaleco reflectante de alta visibilidad y rueda de repuesto o sistema alternativo"],
        ["Dotación de pesados (anexo XII.2)", "Autobuses, vehículos de más de 3.500 kg y conjuntos: además, un extintor homologado"],
        ["Motocicletas (anexo XII.3)", "Deben llevar un chaleco reflectante de alta visibilidad"],
      ],
      preguntas: [
        ["media", "¿Cuál es la anchura máxima general de un vehículo?", ["2,55 m", "2,75 m", "2,40 m"], "Anexo IX, tabla 3."],
        ["media", "¿Cuál es la altura máxima general de un vehículo, incluida la carga?", ["4,00 m", "4,50 m", "3,80 m"], "Anexo IX, tabla 3."],
        ["media", "¿Cuál es la longitud máxima de un tren de carretera?", ["18,75 m", "16,50 m", "12 m"], "Anexo IX, tabla 3."],
        ["media", "¿Qué dispositivo de preseñalización de peligro forma parte de la dotación obligatoria de un turismo?", ["La baliza luminosa V-16", "Dos triángulos", "Una bengala"], "Anexo XII.1.a)."],
        ["media", "¿Qué elemento adicional deben llevar los autobuses?", ["Un extintor homologado", "Una rueda doble", "Una pala"], "Anexo XII.2."],
        ["dificil", "¿Qué altura máxima puede tener un autobús urbano de clase I?", ["4,20 m", "4,00 m", "4,50 m"], "Anexo IX, tabla 3."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["V-1 vehículo prioritario", "Luz azul (CEPE/ONU 65) de policía, bomberos, protección civil y asistencia sanitaria en servicio urgente; visible a 50 m; prohibida en vehículos no prioritarios"],
        ["V-1 auxiliar de policía", "Los vehículos de policía pueden llevar voluntariamente dos luces azules frontales, intermitentes o estroboscópicas, a la altura de las de cruce"],
        ["V-2 vehículo-obstáculo", "Luz amarillo auto de vehículos que trabajan en la vía parados o a no más de 40 km/h; visible a 100 m"],
        ["V-3 vehículo de policía", "Señaliza el vehículo policial en servicio no urgente: rotulación lateral con la denominación del cuerpo y su imagen corporativa"],
        ["V-13 conductor novel", "L blanca sobre fondo verde, en la parte posterior izquierda, durante el primer año de permiso"],
        ["V-14 aprendizaje", "L y PRACTICAS: fondo azul en autoescuelas, rojo con licencia de aprendizaje"],
        ["V-15", "Placa azul y blanca, delante y detrás, del conductor con discapacidad que se desplaza con dificultad"],
        ["V-16 preseñalización de peligro", "Luz amarilla auto en la parte más alta del vehículo inmovilizado o con la carga caída, visible en 360 grados"],
        ["V-20 cargas que sobresalen", "Panel de franjas rojas y blancas en el extremo posterior de la carga"],
        ["V-25 distintivo ambiental", "0 emisiones (azul), ECO (verde y azul), C (verde) y B (amarillo); no hay distintivo para la categoría A; en el ángulo inferior derecho del parabrisas"],
      ],
      preguntas: [
        ["media", "¿De qué color es la señal luminosa V-1 de vehículo prioritario?", ["Azul", "Amarillo auto", "Roja"], "Anexo XI, V-1.3."],
        ["media", "¿Qué indica la señal V-2?", ["Vehículo-obstáculo en la vía que trabaja parado o a no más de 40 km/h", "Vehículo prioritario", "Transporte escolar"], "Anexo XI, V-2.1."],
        ["media", "La señal V-3 corresponde a…", ["Vehículo de policía en servicio no urgente", "Vehículo lento", "Mercancías peligrosas"], "Anexo XI, V-3."],
        ["media", "¿Durante cuánto tiempo lleva el conductor novel la señal V-13?", ["Un año desde que obtiene por primera vez el permiso", "Tres años", "Seis meses"], "Anexo XI, V-13."],
        ["media", "¿Dónde se coloca el distintivo ambiental en un turismo?", ["En el ángulo inferior derecho del parabrisas, por dentro", "En la luna trasera", "En la matrícula"], "Anexo XI, V-25.3."],
        ["dificil", "¿Existe distintivo ambiental para los vehículos de categoría A?", ["No", "Sí, de color rojo", "Sí, de color gris"], "Anexo XI, V-25.1."],
        ["media", "¿Dónde se coloca la baliza V-16?", ["En la parte más alta posible del vehículo inmovilizado", "A 50 m detrás", "En el suelo junto a la rueda"], "Anexo XI, V-16.2."],
      ],
    },
    {
      seccion: S6,
      flashcards: [
        ["Tipos de inspección (RD 920/2017, art. 5)", "Periódicas, por reformas, previas a la matriculación, requeridas por la Administración, voluntarias, tras accidentes graves, tras inspección en carretera, de transporte escolar, de históricos y de mercancías especiales"],
        ["Turismos M1 (art. 6.1)", "Exentos hasta 4 años; bienal de 4 a 10 años; anual a partir de 10"],
        ["Ciclomotores y motos (art. 6.1)", "Ciclomotores: exentos 3 años y después bienal; resto de categoría L: exentos 4 años y después bienal"],
        ["Furgonetas N1 (art. 6.1)", "Exentas 2 años; bienal de 2 a 6; anual de 6 a 10; semestral a partir de 10"],
        ["Autobuses y pesados (art. 6.1)", "Autobuses M2 y M3: anual hasta 5 años y semestral después; camiones N2 y N3: anual hasta 10 años y semestral después"],
        ["Taxis, ambulancias y escolar (art. 6.1.b)", "Anual hasta cinco años y semestral después"],
        ["Antelación (art. 6.5)", "Si se pasa dentro de los 30 días naturales anteriores al vencimiento, el nuevo plazo cuenta desde la fecha de expiración"],
        ["Tras un accidente (art. 6.7.a)", "El agente que hace el atestado propone la inspección antes de volver a circular y lo comunica a la DGT, que la impone"],
        ["Sospecha de defecto (art. 6.7)", "Los agentes pueden ordenar el traslado a la estación ITV más adecuada si el recorrido de ida no supera 30 km (sin límite si está en el sentido de la marcha)"],
        ["ITV caducada (art. 6.9)", "Además de denunciar, el agente concede diez días para pasarla; si no se acredita, la Jefatura inicia la baja de oficio"],
        ["Defectos (art. 9)", "Leves: resultado favorable; graves: desfavorable; muy graves: negativo"],
        ["Seguimiento (art. 11)", "Leves: reparar en dos meses; graves: solo se circula al taller y a la ITV en dos meses; muy graves: el vehículo no puede circular y sale de la estación por medios ajenos"],
        ["Distintivo V-19 (art. 12)", "Prueba de la inspección favorable (no lo llevan los históricos); el agente verifica la ITV en el Registro de Vehículos de la DGT"],
      ],
      preguntas: [
        ["media", "¿Con qué frecuencia pasa la ITV un turismo particular de siete años?", ["Cada dos años", "Cada año", "Cada seis meses"], "RD 920/2017, art. 6.1."],
        ["media", "¿Y un turismo particular de doce años?", ["Anual", "Bienal", "Semestral"], "Art. 6.1."],
        ["media", "¿Con qué frecuencia pasa la ITV un taxi de siete años?", ["Semestral", "Anual", "Bienal"], "Art. 6.1.b)."],
        ["media", "Un vehículo con un defecto muy grave en la ITV obtiene un resultado…", ["Negativo y no puede circular", "Desfavorable y puede circular dos meses", "Favorable"], "Arts. 9.4 y 11.3."],
        ["media", "Con un defecto grave, el vehículo puede circular…", ["Solo para ir al taller y volver a la ITV en dos meses", "Libremente dos meses", "Nunca"], "Art. 11.2."],
        ["dificil", "Si el agente detecta la ITV caducada, además de denunciar, concede al titular…", ["Diez días para pasar la inspección", "Un mes", "Veinticuatro horas"], "Art. 6.9."],
        ["media", "¿Qué distancia máxima de ida puede ordenar el agente para llevar un vehículo sospechoso a la ITV?", ["30 km, salvo que la estación esté en el sentido de la marcha", "100 km", "10 km"], "Art. 6.7."],
        ["media", "¿Cómo verifican los agentes la vigencia de la ITV?", ["En el Registro de Vehículos de la Jefatura Central de Tráfico, o con el informe o la tarjeta ITV", "Solo con la pegatina", "Preguntando al conductor"], "Art. 12.2."],
      ],
    },
  ],
  glosario: [
    [S1, "Permiso de circulación", "Documento que acredita la matriculación del vehículo y la autorización para circular."],
    [S1, "Tarjeta ITV", "Documento con las características técnicas del vehículo y las inspecciones realizadas."],
    [S2, "Reforma de importancia", "Modificación del vehículo que debe regularizarse ante la Administración de industria."],
    [S2, "Vehículo de movilidad personal (VMP)", "Vehículo de una o más ruedas, de una única plaza, propulsado exclusivamente por motores eléctricos, con velocidad máxima por diseño de entre 6 y 25 km/h (p. ej., el patinete eléctrico)."],
    [S3, "Baja temporal", "Retirada provisional del vehículo de la circulación en el Registro de Vehículos."],
    [S3, "Matrícula turística", "Placa con letra T y banda roja de caducidad para vehículos en régimen turístico."],
    [S4, "Masa máxima autorizada (MMA)", "Masa máxima del vehículo cargado admitida para circular."],
    [S4, "Baliza V-16", "Dispositivo luminoso amarillo de preseñalización de peligro, que forma parte de la dotación obligatoria."],
    [S5, "Distintivo ambiental", "Etiqueta V-25 (0, ECO, C o B) que identifica la clasificación ambiental del vehículo."],
    [S6, "Defecto muy grave", "Defecto de la ITV que supone un riesgo directo e inmediato e impide circular."],
  ],
  casos: [
    {
      slug: "caso-control-documentacion-vehiculo-itv",
      titulo: "Una furgoneta sin ITV",
      supuesto: "Una patrulla para a una furgoneta de reparto N1 de ocho años de antigüedad. El conductor lleva el permiso de circulación pero no la tarjeta ITV. Al consultar el Registro de Vehículos, los agentes comprueban que la última ITV caducó hace tres meses. Además, una de las luces de freno no funciona.",
      preguntas: [
        [S1, "media", "¿Qué documento del vehículo falta al conductor?", ["La tarjeta de inspección técnica", "El DNI", "El seguro de vida"], "RGV, art. 26.1.b)."],
        [S6, "media", "¿Con qué frecuencia debe pasar la ITV una furgoneta N1 de ocho años?", ["Anual", "Bienal", "Semestral"], "RD 920/2017, art. 6.1."],
        [S6, "media", "¿Cómo comprueban los agentes la vigencia de la ITV?", ["Consultando el Registro de Vehículos de la Jefatura Central de Tráfico", "Solo por el distintivo", "Llamando a la estación ITV"], "Art. 12.2."],
        [S6, "media", "Además de la denuncia, ¿qué plazo deben conceder los agentes para pasar la ITV?", ["Diez días", "Dos meses", "Un año"], "Art. 6.9."],
        [S6, "dificil", "Si no se acredita la inspección en ese plazo…", ["La Jefatura de Tráfico inicia el procedimiento de baja de oficio", "No pasa nada", "Se subasta el vehículo"], "Art. 6.9."],
        [S6, "media", "Por la sospecha de un defecto, ¿pueden ordenar llevar el vehículo a una ITV?", ["Sí, a la más adecuada, con un recorrido de ida de hasta 30 km", "No", "Solo con orden judicial"], "Art. 6.7."],
        [S6, "media", "Si en la ITV se califica la avería como defecto grave, el resultado es…", ["Desfavorable", "Favorable", "Negativo"], "Art. 9.4."],
        [S6, "media", "Con resultado desfavorable, ¿en qué plazo debe volver a la ITV?", ["Dos meses", "Diez días", "Seis meses"], "Art. 11.2."],
        [S6, "media", "¿Qué distintivo acredita una ITV favorable?", ["El V-19", "El V-16", "El V-25"], "Art. 12.1."],
        [S1, "media", "¿Valdría una fotocopia simple de la tarjeta ITV?", ["No, debe ser original o fotocopia cotejada", "Sí", "Solo si es en color"], "RGV, art. 26.2."],
      ],
    },
    {
      slug: "caso-accidente-baliza-placas",
      titulo: "Un accidente en el tercer cinturón",
      supuesto: "En la Z-30, un turismo con placa de fondo blanco y letra H choca contra un ciclomotor. El turismo queda inmovilizado en la calzada y su conductor coloca la baliza V-16. Llega una grúa con la luz amarilla encendida. El atestado lo instruye la Policía Local, que aprecia daños importantes en la dirección del turismo.",
      preguntas: [
        [S3, "media", "Una placa de fondo blanco cuyo primer carácter es la letra H corresponde a…", ["Un vehículo histórico", "Un vehículo especial", "Un vehículo turístico"], "RGV, anexo XVIII, I.B.c)."],
        [S3, "media", "¿De qué color es la placa del ciclomotor?", ["Fondo amarillo con caracteres negros", "Fondo blanco", "Fondo verde"], "Anexo XVIII, I.A.d)."],
        [S5, "media", "¿Dónde debe colocar el conductor la baliza V-16?", ["En la parte más alta posible del vehículo", "A 50 metros", "En el arcén"], "Anexo XI, V-16.2."],
        [S4, "media", "¿Es obligatoria la baliza V-16 en la dotación del turismo?", ["Sí, según el anexo XII", "No", "Solo en autopistas"], "Anexo XII.1.a)."],
        [S5, "media", "La grúa lleva una luz amarillo auto que indica vehículo-obstáculo: es la señal…", ["V-2", "V-1", "V-3"], "Anexo XI, V-2."],
        [S5, "media", "¿Desde qué distancia debe verse la señal V-2?", ["100 metros", "50 metros", "500 metros"], "Anexo XI, V-2.3."],
        [S6, "media", "Ante los daños en la dirección, ¿qué debe hacer el agente que instruye el atestado?", ["Proponer la inspección antes de la nueva puesta en circulación y comunicarlo a la DGT", "Nada", "Ordenar el desguace"], "RD 920/2017, art. 6.7.a)."],
        [S6, "media", "¿Quién impone la inspección extraordinaria?", ["La Dirección General de Tráfico, por resolución", "El agente directamente", "El taller"], "Art. 6.7.a)."],
        [S6, "dificil", "¿Llevan los vehículos históricos el distintivo V-19?", ["No, están exentos de colocarlo", "Sí", "Solo los de más de 60 años"], "Art. 12.1."],
        [S4, "media", "¿Qué otra prenda forma parte de la dotación obligatoria del turismo?", ["Un chaleco reflectante de alta visibilidad", "Un casco", "Unos guantes"], "Anexo XII.1.b)."],
      ],
    },
    {
      slug: "caso-patinete-bicicleta-noche",
      titulo: "Bicicletas y patinetes de noche",
      supuesto: "De noche, en la ribera del Ebro, los agentes paran a un ciclista sin luces que usa una bocina de aire en lugar de timbre y a un usuario de patinete eléctrico que no tiene etiqueta identificativa ni puede acreditar la inscripción del vehículo. Poco después ven un carro de caballos con una sola luz en el lado derecho.",
      preguntas: [
        [S2, "media", "¿Qué aparato acústico puede llevar la bicicleta?", ["Únicamente un timbre", "Una bocina de aire", "Cualquiera"], "RGV, art. 22.1."],
        [S2, "media", "¿Qué alumbrado obligatorio debe llevar la bicicleta de noche?", ["Luz de posición delantera y trasera y catadióptrico trasero", "Solo una luz delantera", "Nada"], "Art. 22.4."],
        [S2, "media", "¿Necesita la bicicleta autorización administrativa de circulación?", ["No, los ciclos están exceptuados", "Sí", "Solo si es eléctrica"], "Art. 22.3."],
        [S2, "media", "¿Necesita el patinete eléctrico autorización administrativa de circulación como un coche?", ["No, pero sí certificado de circulación, inscripción y etiqueta", "Sí, matrícula ordinaria", "No necesita nada"], "Art. 22 bis."],
        [S2, "dificil", "¿En qué registro debe inscribirse el patinete eléctrico?", ["En el Registro de Vehículos Personales Ligeros del Registro Nacional de Vehículos", "En el padrón", "En el registro municipal de bicicletas"], "Art. 22 bis.2.b)."],
        [S3, "media", "¿Qué letra lleva el número de identificación de la etiqueta de un VMP?", ["La M, cuatro números y tres letras", "La V", "La C"], "Anexo XX.4."],
        [S2, "media", "¿Dónde debe llevar el carro su luz si solo tiene una?", ["En el lado izquierdo del sentido de la marcha", "En el derecho", "Detrás"], "Art. 23.5."],
        [S2, "media", "¿Qué ruedas deben llevar los vehículos de tracción animal?", ["Neumáticas o de elasticidad similar", "Metálicas", "De madera"], "Art. 23.1."],
        [S2, "media", "¿Cuánto pueden sobresalir como máximo las galgas del carro?", ["10 cm de la parte más saliente", "30 cm", "No pueden llevar"], "Art. 23.2."],
        [S2, "media", "¿Qué catadióptricos debe llevar el carro de noche?", ["Traseros no triangulares", "Delanteros rojos", "Ninguno"], "Art. 23.5."],
      ],
    },
  ],
});
