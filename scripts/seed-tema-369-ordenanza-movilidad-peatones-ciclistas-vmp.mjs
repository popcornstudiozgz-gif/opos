/**
 * Crea tema-369 — Tema 42 de Policía Local: "Ordenanza de circulación de
 * peatones y ciclistas. Ordenanza de circulación y estacionamiento,
 * vehículos de movilidad personal."
 *
 * Laguna de enunciado señalada: la Ordenanza de Peatones y ciclistas y la
 * Ordenanza de circulación de VMP que cita bases2106.pdf están DEROGADAS
 * por la disposición derogatoria única de la Ordenanza de Movilidad Urbana
 * de Zaragoza (Pleno 25-07-2024, BOPZ núm. 192 de 21-08-2024). Conforme a
 * la cláusula de las bases que remite a la normativa vigente, el tema
 * estudia el Título IV de esa ordenanza ("Modos de movilidad urbana",
 * arts. 43-80), leído en el PDF del texto vigente (zaragoza.es). La parte
 * general de la misma ordenanza está en tema-368 (Tema 41).
 *
 * Discrepancia señalada: el art. 56.2.a) de la ordenanza exige 16 años
 * para conducir un VMP, mientras que el art. 155.3 del Reglamento General
 * de Circulación, añadido por el Real Decreto 518/2026 (BOE-A-2026-13889,
 * en vigor el 1-10-2026), prohíbe conducirlos a los menores de quince años
 * y el art. 151.3 RGC impide a las ordenanzas oponerse a él. Se enseñan
 * ambas cifras con su fuente, sin resolver cuál prevalecerá en el examen.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-369-ordenanza-movilidad-peatones-ciclistas-vmp.mjs
 */
import { sembrarTema, POLICIA } from "./lib/sembrar-tema.mjs";

const OMU = "https://www.zaragoza.es/contenidos/normativa/ORDENANZA_MOVILIDAD_URBANA_def.pdf";
const p = (n) => `${OMU}#page=${n}`;
const S1 = "omu-peatones";
const S2 = "omu-ciclos-bicicletas";
const S3 = "omu-vehiculos-movilidad-personal";
const S4 = "omu-motos-transporte-publico";
const S5 = "omu-movilidad-compartida-turistica";

await sembrarTema({
  tema: {
    slug: "tema-369",
    titulo: "Ordenanza de Movilidad Urbana de Zaragoza (II): peatones, ciclistas y vehículos de movilidad personal",
    descripcion: "Las ordenanzas de peatones y ciclistas y de VMP citadas por el temario fueron derogadas por la Ordenanza de Movilidad Urbana de Zaragoza (2024), cuyo Título IV regula hoy estas materias: peatones y personas con movilidad reducida, patines y monopatines, prioridad peatonal y espacios de especial protección, prohibiciones a los peatones; bicicletas: velocidades en vías ciclistas, prioridades, prohibición de aceras y excepción de menores de 12 años, zonas verdes, seguro, alumbrado, transporte de personas y mercancías, registro; VMP: edad, casco, vías por las que pueden circular, seguro y alumbrado; motocicletas, carril bus, tranvía, taxis y VTC; movilidad compartida y turística.",
    contenido: "Las normas municipales de Zaragoza para peatones, bicicletas y patinetes eléctricos. Las antiguas ordenanzas que cita el temario se sustituyeron en 2024 por la Ordenanza de Movilidad Urbana. Incluye a qué velocidad se va en un carril bici, cuándo un niño puede ir en bici por la acera, por qué calles puede circular un patinete, qué seguro hace falta, quién tiene preferencia frente al tranvía y qué exige la ordenanza a los taxis, los VTC y las empresas de alquiler de patinetes y bicicletas. Señala además la diferencia de edad mínima para el patinete entre la ordenanza y la norma estatal reformada en 2026.",
    enlaces_boe: [
      { url: OMU, titulo: "Ordenanza de Movilidad Urbana de Zaragoza (BOPZ núm. 192 de 21-08-2024), Título IV" },
      { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514#a1-8", titulo: "Reglamento General de Circulación, art. 155 (VMP), redacción del RD 518/2026 (BOE-A-2026-13889)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "Título IV, Cap. I: circulación peatonal", articulos: "arts. 43-48", url: p(43) },
      { seccion: S2, titulo: "Título IV, Cap. II: ciclos y bicicletas", articulos: "arts. 49-54", url: p(45) },
      { seccion: S3, titulo: "Título IV, Cap. III: vehículos de movilidad personal", articulos: "arts. 55-57", url: p(50) },
      { seccion: S4, titulo: "Título IV, Caps. IV-VI: motocicletas, resto de vehículos y transporte público", articulos: "arts. 58-73", url: p(52) },
      { seccion: S5, titulo: "Título IV, Caps. VII-VIII: movilidad compartida y turística", articulos: "arts. 74-80", url: p(56) },
    ],
  },
  vinculo: { oposicion: POLICIA.oposicion, bloqueId: POLICIA.bloqueParte2, numero: 42 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Ordenanzas derogadas", "La Ordenanza de Peatones y ciclistas y la de circulación de VMP quedaron derogadas por la Ordenanza de Movilidad Urbana de 2024"],
        ["Peatones (art. 43)", "Quienes, sin ser conductores, se desplazan a pie; las personas en silla de ruedas se asimilan a peatones"],
        ["Movilidad reducida (art. 44)", "En silla de ruedas o vehículo análogo tienen prioridad sobre los demás peatones y pueden usar los carriles bici, también con prioridad"],
        ["Patines y monopatines (art. 45)", "Solo por carriles bici con segregación física o zonas peatonales, acomodando la marcha; prohibido ir por carriles de vehículos a motor o ser arrastrados"],
        ["Preferencia peatonal (art. 46)", "Aceras, calles y zonas peatonales son preferentes para los peatones; los vehículos autorizados van a su paso y sin señales acústicas"],
        ["Especial protección (art. 47)", "Aceras, calles, bulevares o plazas declarados por su alta densidad peatonal; se publica la declaración y se señaliza"],
        ["Prohibiciones a peatones (art. 48)", "Cruzar fuera de los puntos autorizados (salvo calles residenciales, zonas de prioridad peatonal, 20 y 30), esperar el bus en la calzada, subir o bajar de vehículos en marcha y andar por los carriles bici"],
      ],
      preguntas: [
        ["media", "¿Pueden las personas en silla de ruedas circular por los carriles bici?", ["Sí, y con prioridad", "No", "Solo de noche"], "OMU, art. 44.1."],
        ["media", "¿Por dónde pueden circular los patinadores?", ["Por carriles bici con segregación física o zonas peatonales", "Por la calzada", "Por cualquier sitio"], "Art. 45.1."],
        ["media", "¿Puede un peatón cruzar la calzada fuera de un paso en una zona 30?", ["Sí, es una de las excepciones a la prohibición", "No, nunca", "Solo con semáforo"], "Art. 48.a)."],
        ["media", "¿Pueden los peatones caminar por un carril bici?", ["No, salvo personas en silla de ruedas, vehículos análogos o patinadores", "Sí", "Solo si está vacío"], "Art. 48.f)."],
        ["media", "¿Pueden los vehículos autorizados a cruzar una zona peatonal usar el claxon?", ["No, salvo en las situaciones previstas en la normativa", "Sí, para avisar", "Siempre"], "Art. 46.1."],
        ["dificil", "¿Qué justifica declarar un espacio de especial protección para el peatón?", ["Una densidad peatonal que limite la libertad de marcha o especiales dificultades para personas con movilidad reducida", "El deseo de los comerciantes", "La existencia de un carril bus"], "Art. 47.3."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Cargo-bike (art. 49.2)", "Ciclo con una caja que forma parte del chasis para personas o mercancías, que puede tener pedaleo asistido"],
        ["Velocidades (arts. 50 y 54)", "25 km/h en carriles bici con segregación física; 20 km/h en los que están a cota de acera; 30 km/h en carriles bici protegidos (art. 54); en no protegidos, el límite de la calzada"],
        ["Semáforo de peatones (art. 50.4)", "Si solo regula un paso de peatones y tiene ámbar intermitente con silueta de bicicleta, el ciclista puede pasar despacio respetando a los peatones"],
        ["Aceras (art. 50.6)", "Prohibido circular por aceras y zonas peatonales y por carriles o plataformas del transporte público"],
        ["Menores de 12 años (art. 50.7)", "Pueden ir por aceras y zonas peatonales no declaradas de especial protección, acompañados de un adulto a pie, a 5 km/h como máximo, a un metro de los peatones y desmontando si hay mucha gente"],
        ["Por la calzada (art. 50.9)", "Por el centro del carril; dos en paralelo dentro del mismo carril salvo riesgo; pueden rebasar vehículos detenidos"],
        ["Zonas verdes (art. 50.11)", "Solo por caminos de tres o más metros de anchura, fuera de jardines, a no más de 10 km/h en zonas compartidas y a un metro de los peatones"],
        ["Obligaciones (art. 50.12-16)", "Prohibido circular a una rueda; seguro de responsabilidad civil (o de hogar que lo cubra) con copia de la póliza; luces delantera y trasera encendidas a cualquier hora o, en su defecto, reflectantes"],
        ["Remolques (art. 52)", "Para personas: homologado, por vías ciclistas o de un carril y un sentido, conductor mayor de edad, casco para los menores de 16, de día y con velocidad reducida un 10 %; para mercancías: conductor mayor de 16 años"],
        ["Registro de bicicletas (art. 53)", "Adhesión al registro nacional, voluntario, a partir de 14 años (los de menores, a nombre de sus progenitores)"],
        ["Adelantar en vía ciclista (art. 54.2.c)", "Solo en unidireccionales de más de 2 m o en bidireccionales, y siempre por la izquierda"],
        ["Paso de peatones sin paso ciclista (art. 54.4)", "Bicicletas y VMP lo cruzan a pie, con el vehículo en la mano, salvo que dé continuidad a dos tramos de vía ciclista"],
      ],
      preguntas: [
        ["media", "¿Cuál es el límite de velocidad en un carril bici a la misma cota que la acera?", ["20 km/h", "25 km/h", "30 km/h"], "OMU, arts. 50.2 y 54.2.b)."],
        ["media", "¿Y en un carril bici con segregación física?", ["25 km/h", "20 km/h", "45 km/h"], "Art. 50.1."],
        ["media", "¿Puede un niño de 9 años circular en bicicleta por la acera?", ["Sí, acompañado de un adulto a pie y a no más de 5 km/h, salvo en zonas de especial protección", "No, nunca", "Sí, sin condiciones"], "Art. 50.7."],
        ["media", "¿Qué seguro exige la ordenanza para circular en bicicleta?", ["De responsabilidad civil específico o, en su defecto, uno de hogar que lo cubra", "Ninguno", "El mismo que un coche"], "Art. 50.14."],
        ["media", "¿Cuándo deben llevar encendidas las luces las bicicletas según la ordenanza?", ["A cualquier hora del día o de la noche (o, en su defecto, elementos reflectantes)", "Solo de noche", "Nunca en ciudad"], "Art. 50.15."],
        ["dificil", "¿A qué velocidad máxima pueden circular las bicicletas por zonas verdes compartidas con peatones?", ["10 km/h", "20 km/h", "5 km/h"], "Art. 50.11."],
        ["media", "¿Pueden dos ciclistas circular en paralelo en el mismo carril?", ["Sí, salvo que suponga riesgo", "No", "Solo en carril bici"], "Art. 50.9."],
        ["media", "¿Desde qué edad se puede inscribir una bicicleta en el registro?", ["Catorce años", "Dieciocho años", "Doce años"], "Art. 53.2."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Definición y certificación (art. 55)", "La de la normativa de tráfico; deben cumplir las condiciones técnicas y estar certificados en los plazos de la DGT"],
        ["Régimen general (art. 56.2)", "Las mismas condiciones de circulación y estacionamiento que las bicicletas, con particularidades"],
        ["Edad (art. 56.2.a) y discrepancia", "La ordenanza exige 16 años; el RGC (art. 155.3, en vigor desde el 1-10-2026) prohíbe conducirlos a los menores de 15 y no admite ordenanzas que se le opongan"],
        ["Casco (art. 56.2.b)", "Obligatorio: casco de bicicleta homologado o de mayor protección, con luz o elementos reflectantes"],
        ["Por dónde (art. 56.2.c y 3)", "Por carriles bici y vías ciclistas; sin ellas, por ciclo-carriles, vías pacificadas y zonas 30, zonas 20 y residenciales, calles de varios carriles limitadas a 30 km/h (por el carril derecho) y zonas verdes a 10 km/h"],
        ["Prohibido (art. 56.3.g)", "Circular por vías o zonas peatonales"],
        ["Seguro y luces (art. 56.8-9)", "Seguro de responsabilidad civil (o de hogar que lo cubra) con copia de la póliza; luces delantera y trasera homologadas encendidas a cualquier hora"],
        ["Registro municipal de VMP (art. 57)", "Voluntario, desde los 16 años; obligatorio para los VMP de actividades económicas en el primer año desde que se habilite"],
        ["Registro estatal", "Además, el art. 22 bis del Reglamento General de Vehículos (RD 52/2026) exige certificado de circulación, inscripción en el Registro de Vehículos Personales Ligeros y etiqueta"],
      ],
      preguntas: [
        ["media", "¿Qué edad mínima exige la Ordenanza de Movilidad Urbana para conducir un VMP?", ["Dieciséis años", "Doce años", "Dieciocho años"], "OMU, art. 56.2.a)."],
        ["dificil", "¿Qué establece el Reglamento General de Circulación desde el 1-10-2026 sobre la edad para conducir un VMP?", ["Que no pueden hacerlo los menores de quince años", "Que hace falta permiso B", "Nada"], "RGC, art. 155.3 (RD 518/2026)."],
        ["media", "¿Es obligatorio el casco para los conductores de VMP en Zaragoza?", ["Sí, homologado y con luz o reflectantes", "No", "Solo de noche"], "Art. 56.2.b)."],
        ["media", "¿Puede un VMP circular por la calzada de una calle de un carril por sentido limitada a 30 km/h si no hay carril bici?", ["Sí, es una vía pacificada", "No, nunca", "Solo por la acera"], "Art. 56.3.b)."],
        ["media", "¿Pueden los VMP circular por zonas peatonales?", ["No", "Sí, despacio", "Solo los de alquiler"], "Art. 56.3.g)."],
        ["media", "¿Cuándo deben llevar las luces encendidas los VMP?", ["A cualquier hora del día o de la noche", "Solo de noche", "Nunca"], "Art. 56.9."],
        ["media", "En una calle con varios carriles limitados a 30 km/h, ¿por qué carril va el VMP?", ["Por el derecho de los no reservados al transporte público", "Por el izquierdo", "Por el carril bus"], "Art. 56.3.d)."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Motos (arts. 58-59)", "Estacionan preferentemente en calzada o en reservas, y en aceras con los límites del art. 31; no circulan por zonas peatonales, carriles bici ni, sin autorización señalizada, por el carril bus; prohibido ir a una rueda"],
        ["Líneas adelantadas de espera (art. 60)", "Zonas ante el semáforo para motos y ciclomotores; también pueden usarlas bicicletas, VMP y vehículos de tres ruedas asimilados"],
        ["Plataforma reservada (art. 65)", "Exclusiva del tranvía o del autobús; en emergencia, ambulancias, bomberos y policía pueden usarla salvo que sea de césped; prohibido parar y estacionar en ella"],
        ["Carril bus (art. 67)", "Autobús urbano y, salvo señal en contra, taxis, autobuses escolares, de empresa, discrecionales e interurbanos; según el art. 16, también VTC, motos, VAO, bicis, VMP y DUM; todos obedecen el semáforo del bus"],
        ["Prioridad del tranvía (art. 68)", "Con carácter general sobre los demás vehículos y peatones, salvo en cruces con semáforos"],
        ["Velocidad del tranvía (art. 69)", "Adaptada a la vía para poder parar ante cualquier obstáculo y nunca más del límite urbano de 50 km/h"],
        ["Paradas de autobús (art. 70)", "Solo el tiempo necesario, salvo en origen y final de línea, donde deben parar el motor"],
        ["VTC (art. 72)", "Solo pueden circular con distintivo 0 emisiones o ECO; los adaptados a sillas de ruedas, al menos C"],
        ["Taxis (art. 73)", "En las paradas, solo libres y sin superar su capacidad"],
      ],
      preguntas: [
        ["media", "¿Pueden las motocicletas circular por el carril bus de Zaragoza?", ["Solo con autorización expresa debidamente señalizada", "Siempre", "Nunca, bajo ningún concepto"], "OMU, art. 59.1."],
        ["media", "¿Tiene prioridad el tranvía sobre los peatones?", ["Sí, con carácter general, salvo en cruces con semáforo", "No, nunca", "Solo de noche"], "Art. 68."],
        ["media", "¿Pueden las patrullas de policía circular por la plataforma del tranvía en una emergencia?", ["Sí, salvo que su superficie sea de manto vegetal", "No", "Solo con permiso del tranvía"], "Art. 65.1."],
        ["media", "¿Qué distintivo ambiental deben tener, en general, los VTC para circular en Zaragoza?", ["0 emisiones o ECO", "C o B", "Ninguno"], "Art. 72."],
        ["media", "¿Qué semáforo deben obedecer los vehículos que circulan por el carril bus?", ["El semáforo específico para el autobús", "El general", "Ninguno"], "Art. 67.2."],
        ["dificil", "¿Cuál es la velocidad máxima absoluta del tranvía según la ordenanza?", ["El límite urbano de 50 km/h", "70 km/h", "30 km/h"], "Art. 69."],
        ["media", "¿Pueden las bicicletas usar las líneas adelantadas de espera de las motos?", ["Sí", "No", "Solo las eléctricas"], "Art. 60.2."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["Movilidad compartida (art. 74)", "Vehículos usados por distintos usuarios, alquilados por periodos cortos, con ámbito restringido al término municipal"],
        ["Tipos (art. 75)", "Turismos, motos y ciclomotores, bicicletas, VMP y otros; con o sin base fija"],
        ["Autorización (art. 76.1)", "Las empresas necesitan autorización demanial, pueden pagar tasa o canon y deben tener un interlocutor físicamente en Zaragoza"],
        ["Obligaciones (art. 76)", "Estacionar en lugares permitidos, dar datos y geolocalización en tiempo real, no usar energías fósiles, identificar la marca, comunicar quién conducía en una infracción y tener seguro de responsabilidad civil"],
        ["Pruebas piloto (art. 78)", "Autorizadas por decreto, como máximo tres años; después, concesión u otra autorización"],
        ["Movilidad turística (arts. 79-80)", "Rutas con VMP, ciclos, tuk-tuk o segway (no autobuses turísticos); vehículos homologados, sin superar sus plazas y con autorización municipal"],
      ],
      preguntas: [
        ["media", "¿Pueden los vehículos de movilidad compartida usar combustibles fósiles?", ["No, en ningún caso", "Sí", "Solo los turismos"], "OMU, art. 76.6."],
        ["media", "Si el usuario de un patinete compartido comete una infracción y la empresa no lo identifica…", ["La empresa asume la sanción", "No pasa nada", "La paga el Ayuntamiento"], "Art. 76.8."],
        ["media", "¿Cuánto pueden durar como máximo las pruebas piloto de movilidad compartida?", ["Tres años", "Un año", "Cinco años"], "Art. 78."],
        ["media", "¿Se consideran movilidad turística los autobuses turísticos?", ["No", "Sí", "Solo los descapotables"], "Art. 79."],
        ["media", "¿Qué seguro deben tener los vehículos de movilidad compartida?", ["De responsabilidad civil específico para su circulación", "Ninguno", "Solo de robo"], "Art. 76.9."],
      ],
    },
  ],
  glosario: [
    [S1, "Espacio de especial protección para el peatón", "Acera, calle o plaza así declarada por su alta densidad peatonal, donde se restringen usos y la circulación de bicicletas."],
    [S1, "Zona 20", "Calles de plataforma única y tránsito compartido con límite de 20 km/h y prioridad peatonal."],
    [S2, "Acera-bici", "Vía ciclista señalizada sobre la acera, con límite de 20 km/h y preferencia de los peatones."],
    [S2, "Ciclo-carril", "Carril calmado o carril 30, abierto a todos los vehículos con límite general de 30 km/h."],
    [S2, "Cargo-bike", "Ciclo de transporte con una caja integrada en el chasis, que puede tener pedaleo asistido."],
    [S3, "VMP", "Vehículo de movilidad personal, como el patinete eléctrico, sujeto a casco, seguro, luces y certificación."],
    [S4, "Línea adelantada de espera", "Zona ante la línea de detención del semáforo reservada a motos, bicicletas y VMP."],
    [S4, "Plataforma reservada", "Espacio exclusivo del tranvía o del autobús donde está prohibido parar o estacionar."],
    [S5, "Movilidad compartida", "Uso sucesivo o simultáneo de vehículos de alquiler por minutos dentro del término municipal."],
    [S5, "Autorización demanial", "Título municipal que permite a una empresa ocupar el dominio público para su servicio."],
  ],
  casos: [
    {
      slug: "caso-patinete-adolescente-acera",
      titulo: "Un patinete por la acera de la Gran Vía",
      supuesto: "Un agente observa a un chico de 15 años que circula en un patinete eléctrico por la acera de la Gran Vía, sin casco y con las luces apagadas a las 12:00. No lleva copia de ningún seguro. El patinete pertenece a sus padres.",
      preguntas: [
        [S3, "media", "Según la ordenanza, ¿puede el chico de 15 años conducir un VMP?", ["No: la ordenanza exige 16 años", "Sí", "Sí, acompañado"], "OMU, art. 56.2.a)."],
        [S3, "dificil", "Y según el Reglamento General de Circulación vigente desde octubre de 2026, ¿cuál es la regla de edad?", ["Prohíbe conducirlos a los menores de quince años, por lo que la ordenanza es más exigente", "Exige 18 años", "No hay regla"], "RGC, art. 155.3."],
        [S3, "media", "¿Puede circular un VMP por la acera?", ["No, tiene prohibidas las zonas peatonales", "Sí, despacio", "Sí, si es menor"], "Art. 56.3.g)."],
        [S3, "media", "¿Debe llevar casco?", ["Sí, obligatorio para los conductores de VMP", "No", "Solo de noche"], "Art. 56.2.b)."],
        [S3, "media", "¿Debe llevar las luces encendidas a mediodía?", ["Sí, a cualquier hora del día o de la noche", "No, solo de noche", "Solo en túneles"], "Art. 56.9."],
        [S3, "media", "¿Qué seguro exige la ordenanza?", ["Responsabilidad civil específico o de hogar que lo cubra, con copia de la póliza", "Ninguno", "Seguro a todo riesgo"], "Art. 56.8."],
        [S3, "media", "Si no hay carril bici en la zona, ¿por dónde podría circular un conductor de VMP habilitado?", ["Por ciclo-carriles, vías pacificadas, zonas 30, 20 o residenciales", "Por la acera", "Por la autovía"], "Art. 56.3."],
        [S2, "media", "Como las de las bicicletas, ¿qué distancia debe guardar en zonas compartidas con peatones?", ["Al menos un metro", "Diez centímetros", "Cinco metros"], "Art. 56.5."],
        [S3, "media", "Además de la ordenanza, ¿qué exige la normativa estatal para que el patinete pueda circular?", ["Certificado de circulación, inscripción en el Registro de Vehículos Personales Ligeros y etiqueta", "Matrícula ordinaria", "Nada"], "RGV, art. 22 bis."],
        [S3, "media", "¿Puede la Policía Local inmovilizar el patinete?", ["Sí, la ordenanza permite inmovilizar VMP", "No", "Solo con orden judicial"], "OMU, art. 110.1."],
      ],
    },
    {
      slug: "caso-ciclistas-parque-grande",
      titulo: "Bicicletas en el Parque Grande y en el centro",
      supuesto: "Un domingo, en el Parque Grande José Antonio Labordeta, varios ciclistas circulan a unos 18 km/h por un camino de 2 m compartido con peatones, y uno circula a una rueda. En el centro, una madre acompaña a pie a su hijo de 8 años que va en bicicleta por la acera de una calle peatonal declarada de especial protección.",
      preguntas: [
        [S2, "media", "¿Pueden las bicicletas circular por un camino de 2 m de un parque?", ["No: solo por caminos de tres o más metros", "Sí", "Solo los domingos"], "OMU, art. 50.11."],
        [S2, "media", "¿A qué velocidad máxima pueden ir en zonas verdes compartidas con peatones?", ["10 km/h", "18 km/h", "25 km/h"], "Art. 50.11."],
        [S2, "media", "¿Está permitido circular a una rueda?", ["No, está expresamente prohibido", "Sí", "Solo en parques"], "Art. 50.12."],
        [S2, "media", "¿Qué distancia mínima deben guardar con los peatones?", ["Un metro", "Medio metro", "Dos metros"], "Art. 50.11."],
        [S2, "media", "¿Puede el niño de 8 años ir en bici por esa acera aunque le acompañe su madre?", ["No, porque la calle está declarada de especial protección para el peatón", "Sí", "Sí, a 5 km/h"], "Art. 50.7."],
        [S2, "media", "En una acera sin esa declaración, ¿a qué velocidad máxima podría ir?", ["5 km/h", "10 km/h", "20 km/h"], "Art. 50.7."],
        [S2, "dificil", "¿Cuándo debe desmontar el menor que circula por la acera?", ["Cuando hay alta densidad peatonal", "Nunca", "Al pasar por un semáforo"], "Art. 50.7."],
        [S1, "media", "¿Quién declara un espacio de especial protección para el peatón?", ["El órgano municipal competente, con publicidad y señalización", "La Policía Local en el acto", "Los vecinos"], "Art. 47."],
        [S2, "media", "Si el paso de peatones no tiene paso para bicicletas, el ciclista debe…", ["Cruzarlo con la bicicleta en la mano", "Cruzar montado y rápido", "Tocar el timbre"], "Art. 54.4."],
        [S2, "media", "¿Qué deben hacer los ciclistas si los peatones no les permiten respetar la distancia de seguridad en una zona de prioridad peatonal?", ["Bajarse y circular andando", "Tocar el timbre", "Acelerar"], "Art. 50.8."],
      ],
    },
    {
      slug: "caso-tranvia-carril-bus-vtc",
      titulo: "En el eje del tranvía",
      supuesto: "En la avenida de la Academia General Militar, un turismo queda detenido sobre la plataforma del tranvía en un cruce, una moto circula por el carril bus sin señal que lo autorice y un VTC con distintivo C, no adaptado, recoge clientes. Mientras tanto, una ambulancia en emergencia usa la plataforma del tranvía, que es de césped.",
      preguntas: [
        [S4, "media", "¿Puede el turismo quedar detenido sobre la plataforma del tranvía?", ["No, está prohibido", "Sí, unos segundos", "Sí, si hay atasco"], "OMU, art. 66."],
        [S4, "media", "¿Puede la moto circular por el carril bus sin señal que lo autorice?", ["No", "Sí", "Solo de noche"], "Art. 59.1."],
        [S4, "media", "¿Puede circular en Zaragoza un VTC con distintivo C no adaptado para sillas de ruedas?", ["No: debe ser 0 emisiones o ECO", "Sí", "Solo de día"], "Art. 72."],
        [S4, "dificil", "¿Puede la ambulancia en emergencia circular por la plataforma de césped?", ["No: la excepción de emergencia no se aplica a plataformas de manto vegetal", "Sí, siempre", "Solo con sirena"], "Art. 65.1."],
        [S4, "media", "¿Tiene prioridad el tranvía sobre el turismo en un cruce sin semáforo?", ["Sí", "No", "El que llegue primero"], "Art. 68."],
        [S4, "media", "¿Qué velocidad máxima no puede superar nunca el tranvía?", ["50 km/h, el límite urbano", "70 km/h", "30 km/h"], "Art. 69."],
        [S4, "media", "¿Puede pararse o estacionarse sobre la plataforma reservada?", ["No", "Sí, para carga y descarga", "Sí, de noche"], "Art. 65.2."],
        [S4, "media", "¿Quién circula por el carril bus aunque no haya señal específica?", ["Taxis en servicio, autobuses escolares, de empresa, discrecionales e interurbanos", "Cualquier turismo", "Solo motos"], "Art. 67.1."],
        [S4, "media", "¿Qué es una línea adelantada de espera?", ["Una zona ante el semáforo para motos, bicicletas y VMP", "Una línea para peatones", "Una parada de taxis"], "Art. 60."],
        [S4, "media", "¿Cuánto puede permanecer un autobús urbano en una parada intermedia?", ["Solo el tiempo necesario para recoger o dejar viajeros", "Diez minutos", "Sin límite"], "Art. 70.2."],
      ],
    },
  ],
});
