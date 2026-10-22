/**
 * Crea tema-368 — Tema 41 de Policía Local: "Ordenanza General de Tráfico y
 * Anexos."
 *
 * Laguna de enunciado señalada: la Ordenanza General de Tráfico de Zaragoza
 * que cita el temario de bases2106.pdf está DEROGADA. La disposición
 * derogatoria única de la Ordenanza de Movilidad Urbana de Zaragoza
 * (aprobación definitiva Pleno 25-07-2024, BOPZ núm. 192 de 21-08-2024,
 * en vigor a los quince días de su publicación) deroga expresamente la
 * Ordenanza General de Tráfico, la de Peatones y ciclistas, la de
 * circulación de VMP, la Especial de Estacionamiento de Minusválidos, la de
 * mercancías peligrosas y la de Transporte escolar y de menores. Como las
 * propias bases dicen que los temas se desarrollan conforme a las normas
 * vigentes al celebrarse los ejercicios, este tema estudia la Ordenanza de
 * Movilidad Urbana (parte general) y sus Instrucciones Técnicas IT-MOV-01 a
 * IT-MOV-10, que hacen las veces de "anexos". El Tema 42 (tema-369) trata
 * la parte de peatones, ciclistas y VMP de la misma ordenanza.
 *
 * Fuente: PDF del texto vigente descargado de zaragoza.es
 * (contenidos/normativa/ORDENANZA_MOVILIDAD_URBANA_def.pdf), leído en los
 * arts. 1-42, 87-116, la disposición derogatoria y las transitorias. Ficha
 * de la sede (servicio/normativa/13296) consultada en esta sesión: no
 * consta ninguna modificación posterior. Del contenido de las Instrucciones
 * Técnicas solo se usan sus títulos y lo que el articulado dice de ellas.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-368-ordenanza-movilidad-urbana-general.mjs
 */
import { sembrarTema, POLICIA } from "./lib/sembrar-tema.mjs";

const OMU = "https://www.zaragoza.es/contenidos/normativa/ORDENANZA_MOVILIDAD_URBANA_def.pdf";
const p = (n) => `${OMU}#page=${n}`;
const S1 = "omu-objeto-limitaciones-seguridad-vial";
const S2 = "omu-clasificacion-vias-senalizacion";
const S3 = "omu-parada-estacionamiento-reservas";
const S4 = "omu-distribucion-mercancias-obras";
const S5 = "omu-disciplina-viaria-sanciones";

await sembrarTema({
  tema: {
    slug: "tema-368",
    titulo: "Ordenanza de Movilidad Urbana de Zaragoza (I): parte general, estacionamiento, mercancías y disciplina viaria",
    descripcion: "La Ordenanza General de Tráfico citada por el temario fue derogada por la Ordenanza de Movilidad Urbana de Zaragoza (BOPZ núm. 192, de 21-08-2024). Objeto, ámbito y órganos competentes; limitaciones de tránsito por masa (12,5, 18 y 26 toneladas) y distintivo ambiental; obstáculos y entornos escolares; vigilancia por la Policía Local; jerarquía viaria (malla básica, zonas 30, 20 y 10), carriles multiuso, señalización y zonas de acceso restringido; parada y estacionamiento, aceras, reservas, estacionamiento regulado y excepciones; distribución urbana de mercancías y carga y descarga; mercancías peligrosas y transportes especiales; obras y eventos; inmovilización, retirada, tratamiento residual y régimen sancionador; Instrucciones Técnicas IT-MOV-01 a IT-MOV-10.",
    contenido: "Atención: la Ordenanza General de Tráfico que nombra el temario ya no está en vigor. La sustituyó en 2024 la Ordenanza de Movilidad Urbana de Zaragoza, que es la que hay que estudiar. Este tema cubre su parte general: qué camiones pueden entrar en la ciudad, la velocidad en los entornos escolares, los tipos de calles, dónde se puede parar y aparcar (incluidas las motos en la acera), la carga y descarga, cuándo se lleva la grúa un vehículo o una bicicleta y cuánto puede ser la multa por infringir la ordenanza.",
    enlaces_boe: [
      { url: OMU, titulo: "Ordenanza de Movilidad Urbana de Zaragoza (aprobación definitiva Pleno 25-07-2024, BOPZ núm. 192 de 21-08-2024)" },
      { url: "https://www.zaragoza.es/sede/servicio/normativa/13296", titulo: "Ficha de la Ordenanza de Movilidad Urbana en la sede electrónica del Ayuntamiento de Zaragoza" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "Título preliminar y Título I: objeto, limitaciones, seguridad vial y control", articulos: "arts. 1-12", url: p(17) },
      { seccion: S2, titulo: "Título II: velocidad, jerarquía viaria, señalización y ordenaciones", articulos: "arts. 13-25", url: p(24) },
      { seccion: S3, titulo: "Título III: parada, estacionamiento, reservas y excepciones", articulos: "arts. 26-42", url: p(32) },
      { seccion: S4, titulo: "Títulos V, VI y VII: distribución urbana de mercancías, obras y eventos", articulos: "arts. 87-109", url: p(62) },
      { seccion: S5, titulo: "Título VIII y disposiciones: disciplina viaria, sanciones y derogaciones", articulos: "arts. 110-116 y disposiciones", url: p(80) },
    ],
  },
  vinculo: { oposicion: POLICIA.oposicion, bloqueId: POLICIA.bloqueParte2, numero: 41 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Ordenanza derogada", "La Ordenanza General de Tráfico fue derogada por la disposición derogatoria única de la Ordenanza de Movilidad Urbana de Zaragoza (BOPZ núm. 192, 21-08-2024)"],
        ["Otras ordenanzas derogadas", "Peatones y ciclistas, circulación de VMP, Especial de Estacionamiento de Minusválidos, mercancías peligrosas y transporte escolar y de menores"],
        ["Objeto (art. 1)", "Regular la movilidad de las personas y la circulación de vehículos, compatibilizando la fluidez del tráfico con el uso peatonal de las calles"],
        ["Ámbito (art. 2)", "Todo el término municipal, incluidas las vías interurbanas municipales, los caminos rurales y los espacios abiertos de uso público"],
        ["Órganos (art. 3)", "Pleno: regulación general; Gobierno de Zaragoza: medidas de ordenación; Alcaldía: en caso de urgencia; Policía Local: medidas imprescindibles ante grave e inminente necesidad"],
        ["Usuarios (art. 4)", "Especial consideración hacia los más vulnerables (el peatón o quien usa el vehículo que menos protege) y hacia el transporte público"],
        ["Masa en el casco urbano (art. 6.3)", "Prohibido el acceso y estacionamiento de vehículos de más de 12,5 t; hasta 18 t en vías con dos o más carriles en ese sentido; de 21:00 a 7:00, hasta 26 t en esas vías"],
        ["Centro histórico (art. 6.5)", "En determinadas zonas de especial protección no pueden circular vehículos de más de 3,5 t, con señalización"],
        ["Distintivo ambiental (art. 6.2)", "Todo vehículo que circule o estacione en vías urbanas de Zaragoza exhibirá el distintivo ambiental según el Reglamento General de Vehículos"],
        ["Entornos escolares (art. 9)", "20 km/h en las calles del perímetro (si no son malla básica) en horario de entrada y salida; 10 km/h dentro del recinto escolar"],
        ["Vigilancia (art. 11)", "La Policía Local vigila, regula y denuncia; en emergencias puede modificar la ordenación, poner o quitar señales y retirar vehículos aunque estén bien estacionados"],
      ],
      preguntas: [
        ["media", "¿Está en vigor la Ordenanza General de Tráfico de Zaragoza?", ["No, la derogó la Ordenanza de Movilidad Urbana de 2024", "Sí", "Solo sus anexos"], "OMU, disposición derogatoria única."],
        ["media", "¿En qué boletín se publicó la aprobación definitiva de la Ordenanza de Movilidad Urbana?", ["BOPZ núm. 192, de 21 de agosto de 2024", "BOE de 1 de enero de 2024", "BOA de 2023"], "Ficha de la sede electrónica municipal."],
        ["media", "Con carácter general, ¿a partir de qué masa máxima se prohíbe el acceso al casco urbano?", ["Más de 12,5 toneladas", "Más de 3,5 toneladas", "Más de 26 toneladas"], "OMU, art. 6.3."],
        ["dificil", "En horario nocturno, en vías con dos o más carriles en su sentido, ¿hasta qué masa pueden circular los vehículos?", ["26 toneladas", "18 toneladas", "12,5 toneladas"], "Art. 6.3.b)."],
        ["media", "¿Cuál es el límite de velocidad dentro de un recinto escolar?", ["10 km/h", "20 km/h", "30 km/h"], "Art. 9.d)."],
        ["media", "¿Qué límite rige en las calles del perímetro escolar (que no son malla básica) en horario de entrada y salida?", ["20 km/h", "30 km/h", "10 km/h"], "Art. 9.a)."],
        ["media", "En una emergencia, ¿puede la Policía Local retirar un vehículo correctamente estacionado?", ["Sí, excepcionalmente, como medida preventiva", "No, nunca", "Solo con orden judicial"], "Art. 11.2."],
        ["media", "¿Quién puede adoptar medidas de ordenación imprescindibles ante una grave e inminente necesidad?", ["Los agentes de la Policía Local", "Solo el Pleno", "Solo la DGT"], "Art. 3.3."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Velocidad (art. 13)", "La de la normativa estatal, que el Ayuntamiento puede reducir con señalización; la señal en el acceso a un ámbito delimitado rige en todas sus vías interiores"],
        ["Malla básica (art. 15.1)", "Primer rango: vías estructurantes (Z-30, Z-20 y penetraciones), distribuidoras y carreteras municipales; constituye la Red Básica de Transporte Público"],
        ["Red local (art. 15.2)", "Segundo rango: vías locales y pacificadas (30 km/h), zonas 30, zonas 20 y residenciales (20 km/h, prioridad peatonal), zonas 10 o peatonales y caminos rurales (30 km/h)"],
        ["Caminos rurales (art. 15.2.c)", "Prioridad del peatón, que debe circular por el borde izquierdo; límite de 30 km/h salvo señalización"],
        ["Carriles multiuso (art. 16)", "En el primer rango, carriles reservados a varios usos (bus, taxi, VTC, motos, bicis y VMP, VAO de tres o más viajeros, DUM)"],
        ["Señalización (art. 17)", "Solo la colocan los servicios municipales o particulares con autorización; prohibida la publicidad en las señales o que afecte a su visibilidad"],
        ["Señales sin autorización (art. 19)", "La Policía Local puede retirarlas, con cargo al responsable"],
        ["Zonas de acceso restringido (art. 20)", "Solo acceden, circulan y estacionan los vehículos autorizados; control por señales, semáforos, tecnología o bolardos retráctiles (art. 22)"],
        ["Calles de prioridad peatonal (art. 23)", "Zona peatonal dentro de una calle (acera), calle peatonal (R-100), calle residencial (S-28, 20 km/h), calle de plataforma única o zona 20, zona 30 y zonas verdes"],
        ["Ocupaciones (art. 24)", "Necesitan autorización: rodajes, mudanzas, obras, servicios, grúas, campañas y veladores; nunca sirven para aparcar los coches de empleados o clientes"],
      ],
      preguntas: [
        ["media", "Las rondas Z-30 y Z-20 son, según la ordenanza, vías…", ["De primer rango y primera categoría o estructurantes", "Locales", "De zona 30"], "Art. 15.1.a."],
        ["media", "¿Cuál es el límite de velocidad en los caminos rurales salvo señalización?", ["30 km/h", "50 km/h", "20 km/h"], "Art. 15.2.c.i."],
        ["media", "¿Por dónde debe circular el peatón en un camino rural?", ["Por el borde izquierdo de la calzada", "Por el centro", "Por el borde derecho"], "Art. 15.2.c.i."],
        ["media", "¿Qué señal identifica una calle residencial?", ["S-28", "R-100", "R-407a"], "Art. 23.1.c)."],
        ["dificil", "¿Qué vehículos de alta ocupación (VAO) pueden incluirse en un carril multiuso?", ["Los que llevan tres o más viajeros", "Los de dos viajeros", "Cualquier turismo"], "Art. 16.1."],
        ["media", "¿Puede un particular colocar una señal de tráfico en la vía pública?", ["Solo con previa y expresa autorización municipal", "Sí, libremente", "Nunca"], "Art. 17.1."],
        ["media", "¿Puede usarse una ocupación autorizada de la vía para aparcar los coches de los empleados?", ["No, en ningún caso", "Sí", "Solo de noche"], "Art. 24, último párrafo."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Parada prohibida (art. 26.2)", "Además de la norma estatal: en intersecciones si dificulta giros o visibilidad, en túneles y pasos a nivel, sobre la plataforma del tranvía, en vías ciclistas y si no deja un paso libre lateral de 3,50 m"],
        ["Taxis en el carril bus (art. 27)", "Pueden parar donde circulan solo para subir o bajar viajeros, máximo dos minutos (salvo personas con discapacidad); los VTC no pueden, salvo señalización"],
        ["Autobuses (art. 28)", "Los de línea solo toman o dejan viajeros en paradas señalizadas; prohibido recoger viajeros fuera de las paradas autorizadas"],
        ["Forma de estacionar (art. 30)", "En cordón, batería o espiga según la señal; sin señal, en cordón y nunca en sentido contrario"],
        ["Quince días (art. 30.7)", "El titular debe comprobar los cambios de señalización; entre el estacionamiento y la comprobación no pueden pasar más de quince días"],
        ["Prohibiciones (art. 30)", "Remolques y caravanas sin el tractor; autocaravanas como vivienda permanente o para acampar; vehículos de más de 3,5 t fuera de lugares habilitados; ante badenes"],
        ["Motos en la acera (art. 31)", "Excepcionalmente, si no hay prohibición ni plazas específicas en el tramo y la acera tiene más de 3 m de paso libre; nunca en calle residencial ni cerca de paradas, contenedores o pavimento tacto-visual"],
        ["Cómo en la acera (art. 31.2)", "Paralela a la acera a 50 cm del bordillo (en batería o espiga si mide más de 6 m); motor solo para subir el bordillo"],
        ["Reservas (arts. 34-39)", "Señal R-307 o R-308 con P y marcas amarillas en zigzag; con horario, solo laborables de lunes a sábado; vigencia máxima de cuatro años renovables; resolución en tres meses"],
        ["Estacionamiento regulado (art. 40)", "El SER fija tiempos máximos con título físico o telemático; se rige por su propio reglamento"],
        ["Excepciones (art. 42)", "Policía, sanitarios, bomberos, limpieza, alumbrado, semáforos o jardines pueden estacionar en lugares prohibidos solo para sus funciones, sin crear obstáculo si el servicio no es urgente"],
      ],
      preguntas: [
        ["media", "¿Qué anchura mínima de paso libre lateral debe dejar un vehículo parado?", ["3,50 metros", "3 metros", "2,50 metros"], "OMU, art. 26.2.e."],
        ["media", "¿Cuánto tiempo máximo puede parar un taxi en el carril bus para dejar viajeros?", ["Dos minutos, salvo personas con discapacidad o movilidad reducida", "Cinco minutos", "Diez minutos"], "Art. 27.3."],
        ["media", "¿Pueden los VTC parar en el carril bus para recoger clientes?", ["No, salvo señalización específica", "Sí, como los taxis", "Sí, dos minutos"], "Art. 27.5."],
        ["media", "Sin señalización específica, ¿cómo se estaciona?", ["En cordón y nunca en sentido contrario", "En batería", "Como se quiera"], "Art. 30.3."],
        ["dificil", "¿Qué anchura de paso libre debe tener la acera para que una moto pueda estacionar en ella?", ["Más de tres metros", "Más de dos metros", "Más de seis metros"], "Art. 31.1.d."],
        ["media", "¿Puede estacionarse en la calle una caravana desenganchada del vehículo tractor?", ["No", "Sí", "Solo una noche"], "Art. 30.6."],
        ["media", "Si una reserva de estacionamiento con horario no indica los días, ¿cuándo rige?", ["Solo en laborables, de lunes a sábado, salvo festivos", "Todos los días", "Solo de lunes a viernes"], "Art. 36.4."],
        ["media", "¿Pueden los vehículos de limpieza pública estacionar donde está prohibido?", ["Sí, exclusivamente para sus funciones", "No, nunca", "Sí, siempre que quieran"], "Art. 42.1."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["DUM (art. 88)", "Distribución urbana de mercancías: transporte, entrega y recogida, incluida la logística inversa; los vehículos DUM se identifican en un registro electrónico"],
        ["Dónde cargar y descargar (art. 90)", "Preferentemente dentro de los locales; en la vía, en estacionamiento autorizado, reservas de carga y descarga, carriles multiuso, carril bus fuera de horario y zonas peatonales si la señal lo permite"],
        ["Horario libre (art. 92.1)", "Entre 7:00 y 21:00 en estacionamiento libre: sin límite hasta 3,5 t; de 3,5 a 18 t, solo el tiempo mínimo necesario"],
        ["Descarga nocturna (arts. 92.2 y 98)", "Entre 21:00 y 7:00 se necesita permiso especial si la MMA supera 2 t (y puede exigirse de oficio por debajo)"],
        ["Tiempo en reservas (art. 93)", "Treinta minutos, prorrogables quince con sistema automatizado; hasta noventa minutos para más de 12,5 t; prohibido encadenar títulos"],
        ["Condiciones (art. 92.5)", "Garantizar la circulación, vallar la acera ocupada con paso alternativo, no volar cargas salvo autorización con zona acotada y operario que regule el tráfico"],
        ["Mercancías peligrosas (art. 94)", "Prohibida su circulación, parada y estacionamiento sin autorización municipal especial; el Ayuntamiento fija horario, recorrido y acompañamiento de la Policía Local"],
        ["Transportes especiales (art. 96)", "Necesitan un permiso para cada ocasión, otorgado por la Policía Local"],
        ["Incumplimientos (art. 103)", "La Policía Local obliga a salir del término o de las vías limitadas a los vehículos que carecen del permiso especial"],
        ["Obras (arts. 104-105)", "Permiso del servicio de movilidad; de noche, balizamiento con luces amarillas intermitentes o rojas; la Policía Local puede paralizar las obras que pongan en riesgo la seguridad vial"],
        ["Eventos (art. 107)", "Afluencia masiva: 10.000 o más asistentes equivalentes; moderada: de 5.000 a menos de 10.000; neutra: menos de 5.000"],
      ],
      preguntas: [
        ["media", "¿Cuál es el tiempo máximo general de uso de una reserva de carga y descarga?", ["Treinta minutos, prorrogables quince con sistema automatizado", "Una hora", "Diez minutos"], "Art. 93.1."],
        ["media", "¿A partir de qué MMA se necesita permiso especial para descargar entre las 21:00 y las 7:00?", ["Más de 2 toneladas", "Más de 3,5 toneladas", "Más de 12,5 toneladas"], "Art. 92.2."],
        ["media", "¿Quién otorga el permiso para cada ocasión de un transporte especial de grandes dimensiones?", ["La Policía Local", "La DGT exclusivamente", "Industria"], "Art. 96."],
        ["media", "¿Pueden circular por Zaragoza vehículos de mercancías peligrosas sin autorización municipal?", ["No, salvo autorización municipal especial", "Sí", "Solo de noche"], "Art. 94.1."],
        ["dificil", "¿Cuál es el tiempo máximo en una reserva de carga y descarga para un vehículo de más de 12,5 t?", ["Noventa minutos", "Treinta minutos", "Sin límite"], "Art. 93.1."],
        ["media", "¿Qué hace la Policía Local con un vehículo que requiere permiso especial y no lo tiene?", ["Le obliga a salir del término municipal o de las vías limitadas", "Lo deja continuar", "Lo subasta"], "Art. 103."],
        ["media", "Un evento con 12.000 asistentes equivalentes es de afluencia…", ["Masiva", "Moderada", "Neutra"], "Art. 107.1.a)."],
        ["media", "¿Cómo se balizan de noche las obras que afectan a la circulación?", ["Con luces amarillas intermitentes o rojas de situación", "Con conos sin luz", "No se balizan"], "Art. 105.2."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["Inmovilización (art. 110)", "La Policía Local puede inmovilizar cualquier vehículo, incluidos bicicletas y VMP, en el lugar que indique, hasta que cese la causa y previo pago de la tasa si procede"],
        ["Retirada: supuestos propios (art. 111.1)", "Además de los de la ley: vehículos ofrecidos en venta en la vía, y motos, ciclomotores, bicicletas y VMP estacionados en la acera incumpliendo la ordenanza o anclados al mobiliario cuando afectan a su uso"],
        ["Retirada de bicicletas y VMP (art. 111.2)", "Si suponen peligro, dificultan la circulación, están amarrados al mobiliario o dañan zonas verdes, o llevan más de un mes sin elementos para circular"],
        ["Grúa sin agente presente (art. 111.7)", "La retirada puede hacerse por orden remota de la Policía Local, sin presencia física del agente"],
        ["Actos y trabajos (art. 111.8)", "Retirada para actos públicos, limpieza o reparaciones, con señalización previa de al menos 24 horas y registro de matrículas; en ese caso no se cobran los gastos"],
        ["Gastos (art. 112)", "Según la ordenanza fiscal, los paga el titular, arrendatario o conductor habitual antes de recuperar el vehículo; no en caso de sustracción acreditada"],
        ["Tratamiento residual (art. 113)", "Requerimiento al titular para retirarlo en un mes, con diez días para alegar; si no, traslado a un Centro Autorizado de Tratamiento"],
        ["Bicicletas abandonadas (art. 114)", "Se presumen abandonadas tras un mes; a los dos meses pueden declararse residuo y destruirse o cederse a entidades sin ánimo de lucro"],
        ["Denuncias (art. 115)", "La Policía Local denuncia; los controladores del SER denuncian las infracciones de estacionamiento; con fichero de imágenes, salvo exceso de tiempo o imposibilidad técnica motivada"],
        ["Infracciones propias (art. 115.6-7)", "Las no previstas en la normativa estatal son leves, responde el conductor y se sancionan con apercibimiento o multa de hasta 150 euros"],
        ["Procedimiento (art. 116)", "Conforme a la normativa de tráfico; las infracciones de autorizaciones o transportes, según la norma municipal de procedimiento sancionador o la de transportes"],
      ],
      preguntas: [
        ["media", "¿Puede la Policía Local inmovilizar una bicicleta?", ["Sí, cualquier tipo de vehículo, incluidos ciclos y VMP", "No", "Solo si es eléctrica"], "OMU, art. 110.1."],
        ["media", "¿Puede retirarse un vehículo que se ofrece en venta estacionado en la vía pública?", ["Sí", "No", "Solo si está en doble fila"], "Art. 111.1.a."],
        ["media", "¿Es necesaria la presencia física del agente para que actúe la grúa municipal?", ["No, cabe la orden remota de la Policía Local", "Sí, siempre", "Solo de día"], "Art. 111.7."],
        ["media", "¿Con qué antelación debe señalizarse la prohibición para retirar vehículos por un acto público autorizado?", ["Al menos 24 horas", "Una hora", "Una semana"], "Art. 111.8.a."],
        ["dificil", "¿Cuál es la sanción máxima de las infracciones de la ordenanza no previstas en la normativa estatal?", ["Apercibimiento o multa de hasta 150 euros", "Multa de 200 euros", "Multa de 500 euros"], "Art. 115.7."],
        ["media", "¿Quién paga los gastos de la grúa si el vehículo había sido robado y se acredita?", ["No son exigibles al titular", "El titular", "El agente"], "Art. 112.2."],
        ["media", "¿Cuándo se presume abandonada una bicicleta sin elementos mínimos para circular?", ["Tras más de un mes en esa situación", "A los tres días", "Al año"], "Art. 114.2."],
        ["media", "¿Pueden denunciar los controladores del SER?", ["Sí, las infracciones a la normativa de estacionamiento", "No", "Solo las de velocidad"], "Art. 115.2."],
      ],
    },
  ],
  glosario: [
    [S1, "Ordenanza de Movilidad Urbana (OMU)", "Norma municipal de Zaragoza de 2024 que sustituye a la Ordenanza General de Tráfico y a otras cinco ordenanzas."],
    [S1, "Masa máxima autorizada (MMA)", "Criterio que usa la ordenanza para limitar el acceso de vehículos pesados al casco urbano."],
    [S2, "Malla básica", "Red de vías de primer rango (estructurantes y distribuidoras) que forma la Red Básica de Transporte Público."],
    [S2, "Zona 20", "Ámbito de calles de plataforma única y tránsito compartido con límite de 20 km/h y prioridad peatonal."],
    [S2, "Carril multiuso", "Carril reservado a una agrupación de usos (bus, taxi, motos, bicis, VAO, DUM)."],
    [S3, "Reserva de estacionamiento", "Espacio señalizado donde se prohíbe estacionar salvo a determinados vehículos."],
    [S3, "SER", "Servicio de Estacionamiento Regulado, que fija tiempos máximos de aparcamiento mediante título."],
    [S4, "DUM", "Distribución urbana de mercancías: transporte, entrega y recogida de mercancías en la ciudad."],
    [S4, "Última milla", "Reparto desde almacenes intermedios con vehículos más pequeños y eficientes."],
    [S5, "Tratamiento residual", "Traslado de un vehículo abandonado a un Centro Autorizado de Tratamiento para su destrucción."],
  ],
  casos: [
    {
      slug: "caso-camion-casco-urbano-descarga",
      titulo: "Un camión de 20 toneladas en el centro",
      supuesto: "A las 10:00, una patrulla detecta un camión de 20 t de MMA que circula por una calle de un solo carril por sentido del Ensanche para descargar en un supermercado. El conductor carece de permiso municipal. A las 23:00, otro camión de 8 t descarga en una reserva de carga y descarga sin permiso especial nocturno y con la carga volando sobre la acera.",
      preguntas: [
        [S1, "media", "¿Puede el camión de 20 t circular por esa calle sin permiso?", ["No: el límite general es 12,5 t (18 t solo en vías de dos o más carriles en ese sentido)", "Sí", "Sí, de día"], "OMU, art. 6.3."],
        [S4, "media", "¿Qué hace la Policía Local con el camión sin permiso?", ["Le obliga a salir del término o de las vías limitadas", "Le acompaña hasta el supermercado", "Nada"], "Art. 103."],
        [S1, "media", "¿Qué instrucción técnica regula el permiso municipal para circular con más masa?", ["La IT-MOV-04", "La IT-MOV-09", "Ninguna"], "Art. 6.7."],
        [S4, "media", "¿Necesita permiso especial el camión de 8 t que descarga a las 23:00?", ["Sí, por superar 2 t en horario nocturno", "No", "Solo en verano"], "Arts. 92.2 y 98."],
        [S4, "media", "¿Está permitido el vuelo de la carga sobre la acera?", ["No, salvo autorización con la zona de caída acotada y señalizada", "Sí", "Solo de noche"], "Art. 92.5.c)."],
        [S4, "media", "¿Cuánto tiempo puede ocupar como máximo una reserva de carga y descarga un vehículo de 8 t?", ["Treinta minutos, prorrogables quince con sistema automatizado", "Noventa minutos", "Sin límite"], "Art. 93.1."],
        [S4, "media", "Si la acera queda impracticable durante la descarga autorizada, debe…", ["Vallarse y habilitar un paso alternativo para los peatones", "Cerrarse sin más", "Nada"], "Art. 92.5.b)."],
        [S1, "media", "¿Qué deben exhibir ambos camiones para circular en Zaragoza?", ["El distintivo ambiental", "Una bandera", "Nada"], "Art. 6.2."],
        [S5, "media", "¿Con qué fichero debe acompañarse, en general, la denuncia?", ["Con imágenes captadas al cometerse la infracción", "Con la firma del conductor", "Con un vídeo de una hora"], "Art. 115.3."],
        [S4, "dificil", "Si el camión de 20 t estuviera al servicio de bomberos, ¿necesitaría permiso municipal?", ["No, los servicios municipales no se sujetan a él", "Sí", "Solo de noche"], "Art. 95.2.a)."],
      ],
    },
    {
      slug: "caso-motos-acera-taxi-carril-bus",
      titulo: "Motos en la acera y un taxi en el carril bus",
      supuesto: "En el paseo de Sagasta, un agente revisa varias motos estacionadas en una acera de 4 m de paso libre, a un metro de un contenedor. En la misma calle hay plazas libres para motos en la calzada. Mientras, un taxi espera clientes en el carril bus sin precontratación y un VTC deja a un viajero en ese mismo carril.",
      preguntas: [
        [S3, "media", "¿Pueden estacionar las motos en la acera si hay plazas libres para motos en ese tramo?", ["No", "Sí", "Solo de noche"], "OMU, art. 31.1.c."],
        [S3, "media", "¿Y a un metro de un contenedor?", ["No, deben estar a más de dos metros", "Sí", "Solo los ciclomotores"], "Art. 31.1, párrafo segundo, a."],
        [S3, "media", "Cuando está permitido, ¿cómo se colocan en la acera?", ["Paralelas a la acera, a 50 cm del bordillo", "Pegadas a la fachada", "Atravesadas"], "Art. 31.2."],
        [S3, "media", "¿Pueden circular con el motor por la acera hasta su sitio?", ["No, solo pueden usar el motor para salvar el bordillo", "Sí, despacio", "Sí"], "Art. 31.2."],
        [S5, "media", "¿Pueden retirarse con la grúa las motos mal estacionadas en la acera?", ["Sí", "No", "Solo con orden judicial"], "Art. 111.1.b."],
        [S3, "media", "¿Puede el taxi esperar clientes en el carril bus sin precontratación?", ["No", "Sí", "Solo dos minutos"], "Art. 27.4."],
        [S3, "media", "¿Puede el VTC dejar al viajero en el carril bus?", ["No, salvo señalización específica que lo permita", "Sí", "Sí, dos minutos"], "Art. 27.5."],
        [S3, "dificil", "¿Cuánto tiempo puede parar un taxi en el carril bus para bajar a un viajero con su equipaje?", ["El imprescindible, sin superar dos minutos", "Cinco minutos", "Sin límite"], "Art. 27.3."],
        [S3, "media", "¿Puede el Gobierno de Zaragoza suprimir en el futuro la posibilidad de aparcar motos en las aceras?", ["Sí, pasados dos años y previos estudios", "No", "Solo el Pleno, inmediatamente"], "OMU, disposición adicional única."],
        [S5, "media", "Las infracciones propias de la ordenanza no previstas en la ley estatal se consideran…", ["Leves", "Graves", "Muy graves"], "Art. 115.6."],
      ],
    },
    {
      slug: "caso-coche-abandonado-bicicleta-farola",
      titulo: "Un coche abandonado y bicicletas en una farola",
      supuesto: "Los vecinos de Torrero avisan de un turismo sin placas y con las ruedas pinchadas que lleva semanas en la misma plaza, y de varias bicicletas sin ruedas amarradas a una farola desde hace más de un mes. Además, el Ayuntamiento va a repintar la calle y necesita dejarla libre de coches.",
      preguntas: [
        [S5, "media", "Constatado el estado del turismo, ¿qué plazo se da al titular para retirarlo?", ["Un mes, con diez días para alegar", "Diez días", "Un año"], "OMU, art. 113.3."],
        [S5, "media", "Si no lo retira, ¿a dónde se traslada?", ["A un Centro Autorizado de Tratamiento de Vehículos", "Al depósito para siempre", "A una subasta"], "Art. 113.3."],
        [S5, "media", "¿Se presumen abandonadas las bicicletas?", ["Sí, tras más de un mes sin los elementos mínimos para circular", "No", "Solo si están oxidadas"], "Art. 114.2.a)."],
        [S5, "media", "¿Puede la Policía Local romper el candado para retirar una bicicleta amarrada irregularmente?", ["Sí, y los gastos son del titular", "No", "Solo con permiso del dueño"], "Art. 32.3."],
        [S5, "media", "¿Qué destino pueden tener las bicicletas en buen estado declaradas residuo?", ["Reutilizarse en actividades municipales o cederse a entidades sin ánimo de lucro", "Venderse", "Destruirse siempre"], "Art. 114.4."],
        [S5, "media", "Para repintar la calle, ¿con qué antelación debe señalizarse la retirada de vehículos?", ["Al menos 24 horas", "Una hora", "Una semana"], "Art. 111.8.b."],
        [S5, "media", "¿Pagan la grúa los dueños de coches retirados por el repintado correctamente anunciado?", ["No, el art. 112 los excluye", "Sí", "La mitad"], "Art. 112.1, que excepciona el art. 111.8."],
        [S3, "media", "¿Cada cuánto debe comprobar el titular que no ha cambiado la señalización donde aparca?", ["Como máximo cada quince días", "Cada mes", "Nunca"], "Art. 30.7."],
        [S5, "dificil", "Si el turismo abandonado supusiera un riesgo para la salud pública, el Ayuntamiento podría…", ["Retirarlo al depósito comunicándolo al titular con la mayor celeridad", "Esperar al plazo de un mes", "Nada"], "Art. 113.4."],
        [S5, "media", "¿Qué deben registrar los agentes antes de la retirada por obras o limpieza?", ["Las matrículas de los vehículos estacionados", "El color de los vehículos", "Nada"], "Art. 111.8.b."],
      ],
    },
  ],
});
