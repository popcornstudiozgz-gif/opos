/**
 * Crea tema-422 — Tema 8 de Subalterna/o (Ayto. Zaragoza, CONV 5/2026,
 * Anexo I): "Principales sedes de los servicios administrativos. Juntas
 * municipales y vecinales. Centros cívicos y centros de convivencia."
 *
 * Tema dedicado (tema-68, tema-71 y tema-74 de Oficial Mantenimiento tratan
 * por separado organigrama, centros cívicos y juntas, sin las sedes ni los
 * centros de convivencia). Lenguaje sencillo.
 *
 * Fuentes leídas en esta sesión en zaragoza.es:
 * - Reglamento de Órganos Territoriales y de Participación Ciudadana
 *   (normativa/109; BOPZ 288 de 17-12-2005, modificado por la creación del
 *   Distrito Sur, BOPZ 44 de 23-02-2018): art. 2 (dieciséis distritos: 15
 *   urbanos y el Distrito Rural con 14 barrios rurales), art. 3, art. 15
 *   (el Alcalde preside todas las Juntas y puede delegar en un Concejal),
 *   arts. 31-32 (Alcalde de Barrio elegido por consulta vecinal).
 * - API de equipamientos (equipamiento/category/90, 91, 92 y 93): las 15
 *   Juntas Municipales con su dirección, las 14 Juntas Vecinales, 32
 *   Centros de Convivencia para Mayores y 24 centros cívicos (además del
 *   servicio gestor). Las cifras son las del listado de octubre de 2026.
 * - Fichas de trámites (tramite/3317 y 4022) y de la ORC (equipamiento/325):
 *   Casa Consistorial y ORC en Plaza del Pilar, 18; Oficina de Registro del
 *   Seminario en Vía Hispanidad, 20; horario de las Juntas; base 1.13 de
 *   las bases de la CONV 5/2026: tablón de anuncios del edificio Seminario.
 * - Reglamento de Centros Cívicos (normativa/4443; BOPZ 288 de 17-12-2013):
 *   arts. 2, 3, 5, 6, 7, 12, 41-43 y 46.
 * - Ordenanza de los Centros Municipales de Convivencia para Personas
 *   Mayores (normativa/942; BOPZ 143 de 25-06-2010): arts. 1, 2, 31-35.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-422-sedes-juntas-centros.mjs
 */
import { sembrarTema, SUBALTERNO } from "./lib/sembrar-tema.mjs";

const ROTPC = "https://www.zaragoza.es/sede/servicio/normativa/109";
const RCC = "https://www.zaragoza.es/sede/servicio/normativa/4443";
const OCCM = "https://www.zaragoza.es/sede/servicio/normativa/942";
const JUNTAS = "https://www.zaragoza.es/sede/servicio/equipamiento/category/90";
const ORC = "https://www.zaragoza.es/sede/servicio/equipamiento/325";
const S1 = "sedes-servicios-administrativos";
const S2 = "juntas-municipales-vecinales";
const S3 = "centros-civicos";
const S4 = "centros-convivencia-mayores";

await sembrarTema({
  tema: {
    slug: "tema-422",
    titulo: "Principales sedes de los servicios administrativos, Juntas Municipales y Vecinales, centros cívicos y centros de convivencia de Zaragoza",
    descripcion: "Principales sedes: Casa Consistorial y Oficina de Relaciones con la Ciudadanía (Plaza del Pilar, 18), edificio Seminario (Vía Hispanidad, 20), oficinas de registro, Juntas y el teléfono 010. Distritos y Juntas: 15 distritos urbanos con su Junta Municipal y el Distrito Rural con 14 barrios rurales y sus Juntas Vecinales; presidencia y Alcalde de Barrio (Reglamento de Órganos Territoriales). Centros cívicos: concepto, características, servicios, Consejo de Centro, cesión de espacios y normas de uso (Reglamento de Centros Cívicos de 2013). Centros de Convivencia para Personas Mayores: fines, servicios, requisitos y carné de socio, órganos (Ordenanza de 2010).",
    contenido: "Dónde están las principales oficinas del Ayuntamiento, qué son y dónde están las Juntas Municipales y Vecinales, y para qué sirven los centros cívicos y los centros de convivencia para mayores, con sus normas básicas.",
    enlaces_boe: [
      { url: ROTPC, titulo: "Reglamento de Órganos Territoriales y de Participación Ciudadana, Ayuntamiento de Zaragoza" },
      { url: RCC, titulo: "Reglamento de Centros Cívicos, Ayuntamiento de Zaragoza (BOPZ 288 de 17-12-2013)" },
      { url: OCCM, titulo: "Ordenanza de los Centros Municipales de Convivencia para Personas Mayores (BOPZ 143 de 25-06-2010)" },
      { url: JUNTAS, titulo: "Juntas Municipales: equipamientos de la ciudad, Ayuntamiento de Zaragoza" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "Principales sedes de los servicios administrativos", articulos: "Fichas municipales de equipamientos y trámites", url: ORC },
      { seccion: S2, titulo: "Distritos, Juntas Municipales y Juntas Vecinales", articulos: "arts. 2, 3, 15, 31 y 32 ROTPC", url: ROTPC },
      { seccion: S3, titulo: "Centros cívicos", articulos: "arts. 2-7, 12, 41-46 Reglamento de Centros Cívicos", url: RCC },
      { seccion: S4, titulo: "Centros de Convivencia para Personas Mayores", articulos: "arts. 1-2 y 31-35 Ordenanza de 2010", url: OCCM },
    ],
  },
  vinculo: { oposicion: SUBALTERNO.oposicion, bloqueId: SUBALTERNO.bloque, numero: 8 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Casa Consistorial", "Edificio principal del Ayuntamiento, en la Plaza del Pilar, 18; allí están la Alcaldía, la Oficina de Relaciones con la Ciudadanía y una oficina de registro"],
        ["Oficina de Relaciones con la Ciudadanía (ORC)", "En la Plaza del Pilar, 18: información general, trámites, padrón, Tarjeta Ciudadana y recogida de quejas y sugerencias; atiende sin cita previa"],
        ["Edificio Seminario", "Sede municipal en la Vía Hispanidad, 20, con oficina de registro y el tablón de anuncios donde se publican los actos de las oposiciones municipales"],
        ["Oficinas de registro", "Reciben los escritos de los ciudadanos: Plaza del Pilar, 18, Seminario (Vía Hispanidad, 20) y Juntas Municipales y Vecinales"],
        ["Juntas como oficinas de barrio", "En cada distrito y barrio rural la Junta tiene una oficina administrativa donde se hacen trámites como el padrón, de lunes a viernes de 8:30 a 13:30"],
        ["010", "Teléfono municipal de información (976 721 234 desde fuera de Zaragoza)"],
        ["La sede electrónica", "Desde zaragoza.es se pueden consultar equipamientos, direcciones, horarios y hacer trámites"],
      ],
      preguntas: [
        ["facil", "La Casa Consistorial del Ayuntamiento de Zaragoza está en:", ["La Plaza del Pilar", "La Vía Hispanidad", "La Plaza de España"], "Ficha de la ORC."],
        ["media", "La Oficina de Relaciones con la Ciudadanía (ORC) está en:", ["Plaza del Pilar, 18", "Vía Hispanidad, 20", "Calle Domingo Miral, 5"], "Ficha de la ORC."],
        ["media", "El edificio Seminario está en:", ["Vía Hispanidad, 20", "Plaza del Pilar, 18", "Paseo Independencia"], "Ficha del Servicio de Quejas y Sugerencias."],
        ["media", "Los anuncios de la oposición de Subalterno se publican en el tablón del:", ["Edificio Seminario", "Mercado Central", "Estadio"], "Base 1.13 de las bases de la CONV 5/2026."],
        ["media", "¿Dónde se puede presentar un escrito al Ayuntamiento en persona?", ["En las oficinas de registro (Plaza del Pilar, Seminario y Juntas)", "En cualquier tienda", "En la parada del autobús"], "Ficha del Servicio de Quejas y Sugerencias."],
        ["facil", "El teléfono municipal de información es el:", ["010", "112", "016"], "Fichas municipales."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Distritos de Zaragoza (art. 2 ROTPC)", "Hay dieciséis: 15 distritos urbanos y el Distrito Rural, que tiene 14 barrios rurales"],
        ["Los 15 distritos urbanos", "Centro, Casco Histórico, Delicias, Universidad, San José, Las Fuentes, La Almozara, Oliver-Valdefierro, Torrero, Actur-Rey Fernando, El Rabal, Casablanca, Santa Isabel, Miralbueno y Sur"],
        ["Los 14 barrios rurales", "Alfocea, Casetas, Garrapinillos, Juslibol, La Cartuja Baja, Montañana, Monzalbarba, Movera, Peñaflor, San Gregorio, San Juan de Mozarrifar, Torrecilla de Valmadrid, Venta del Olivar y Villarrapa"],
        ["Junta Municipal y Junta Vecinal", "Los distritos urbanos se rigen por Juntas Municipales; los barrios rurales, por Juntas Vecinales"],
        ["¿Para qué sirven las Juntas? (art. 3)", "Acercan la gestión del Ayuntamiento a los barrios y permiten que los vecinos participen"],
        ["¿Quién preside las Juntas Municipales? (art. 15)", "El Alcalde es el presidente nato de todas; puede delegar la presidencia efectiva en un Concejal"],
        ["Alcalde de Barrio (art. 32)", "Preside la Junta Vecinal; es un vecino del barrio elegido por los vecinos en una consulta y nombrado por el Alcalde"],
        ["Algunas direcciones de Juntas Municipales", "Universidad: C/ Domingo Miral, 5. Centro: Pº Hernán Cortés, 31-33. Casco Histórico: C/ San Pablo, 37. Delicias: C/ Antonio Mompeón Motos, 12-14. San José: Pza. Mayor, 2. Torrero: C/ Monzón, 3"],
        ["Distrito Sur", "Es el distrito más reciente: se creó con la modificación del Reglamento publicada en el BOPZ de 23-02-2018"],
      ],
      preguntas: [
        ["media", "¿Cuántos distritos tiene Zaragoza?", ["Dieciséis: 15 urbanos y el Rural", "Diez", "Treinta"], "Art. 2 ROTPC."],
        ["media", "¿Cuántos barrios rurales tiene Zaragoza?", ["14", "5", "20"], "Art. 2 ROTPC."],
        ["facil", "Los barrios rurales se rigen por:", ["Juntas Vecinales", "Juntas Municipales", "Consejos de Ciudad"], "Art. 2 ROTPC."],
        ["media", "¿Quién preside la Junta Vecinal de un barrio rural?", ["El Alcalde de Barrio", "El Presidente del Gobierno de Aragón", "El Delegado del Gobierno"], "Art. 31 ROTPC."],
        ["media", "El Alcalde de Barrio es elegido:", ["Por los vecinos en una consulta, y lo nombra el Alcalde", "Por sorteo", "Por el Gobierno de España"], "Art. 32 ROTPC."],
        ["media", "¿Cuál de estos es un barrio rural de Zaragoza?", ["Casetas", "Delicias", "Universidad"], "Art. 2 ROTPC."],
        ["media", "La Junta Municipal Universidad está en:", ["C/ Domingo Miral, 5", "Plaza del Pilar, 18", "Vía Hispanidad, 20"], "Equipamientos municipales."],
        ["dificil", "El presidente nato de todas las Juntas Municipales es:", ["El Alcalde, que puede delegar en un Concejal", "El Secretario del Ayuntamiento", "El vecino más mayor"], "Art. 15 ROTPC."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["¿Qué es un centro cívico? (art. 2)", "Instalación municipal de los distritos y barrios rurales que presta servicios de participación ciudadana, con programas educativos, culturales, sociales o de atención al ciudadano"],
        ["Tres características (art. 3)", "Proximidad, polivalencia (espacios para varios usos) e integración de servicios municipales"],
        ["Servicios que puede tener (art. 6)", "Oficina de la Junta, información, centro de servicios sociales, centro de tiempo libre y ludoteca, casa de juventud, centro de convivencia para mayores, biblioteca y acceso a internet"],
        ["Consejo de Centro (art. 5)", "Comisión informativa y asesora, presidida por el presidente de la Junta o el Alcalde de Barrio; se reúne al menos una vez al año"],
        ["Cesión de espacios (art. 7)", "Para actividades estables (todo el curso: cursos, talleres) hay que solicitarlo en plazo; también para actividades puntuales (charlas, jornadas)"],
        ["Normas: pasillos y accesos (art. 41)", "Están prohibidos los obstáculos en pasillos y accesos, porque sirven para evacuar en una emergencia"],
        ["Normas: menores (arts. 41 y 46)", "Los menores de 14 años deben estar siempre acompañados por un adulto, salvo en actividades solo para menores con personal propio"],
        ["Normas: tabaco y comida (art. 43)", "No se puede fumar; no se puede comer ni beber, salvo en actividades autorizadas o en la cafetería"],
        ["Horario de apertura (art. 12)", "Se expone en la entrada de cada centro; se abre como máximo media hora después de entrar el personal y se cierra como máximo media hora después de la última actividad"],
        ["El primer centro cívico", "En 1985 se inauguró el Centro Cívico Salvador Allende, en el antiguo matadero municipal (Las Fuentes)"],
      ],
      preguntas: [
        ["media", "Las tres características de los centros cívicos son:", ["Proximidad, polivalencia e integración de servicios", "Lujo, silencio y lejanía", "Deporte, comercio y ocio nocturno"], "Art. 3 Reglamento de Centros Cívicos."],
        ["media", "En un centro cívico, los menores de 14 años:", ["Deben estar acompañados por un adulto", "Pueden estar solos siempre", "No pueden entrar"], "Art. 46 Reglamento de Centros Cívicos."],
        ["facil", "En los pasillos de un centro cívico:", ["No se pueden dejar obstáculos, porque son vías de evacuación", "Se pueden guardar bicicletas", "Se pueden poner mesas"], "Art. 41 Reglamento de Centros Cívicos."],
        ["media", "En el interior de un centro cívico, fumar:", ["Está prohibido", "Está permitido en los pasillos", "Está permitido en las aulas"], "Art. 43 Reglamento de Centros Cívicos."],
        ["media", "Una asociación que quiere un aula todo el curso para un taller debe:", ["Solicitar la cesión de espacios en plazo", "Ocupar el aula sin pedir permiso", "Pedirlo a la cafetería"], "Art. 7 Reglamento de Centros Cívicos."],
        ["media", "¿Qué servicio puede haber en un centro cívico?", ["La oficina de la Junta Municipal o Vecinal", "Una comisaría de la Guardia Civil", "Un juzgado"], "Art. 6 Reglamento de Centros Cívicos."],
        ["dificil", "¿Dónde se inauguró en 1985 el Centro Cívico Salvador Allende?", ["En el antiguo matadero municipal", "En la estación del Norte", "En el Seminario"], "Exposición de motivos del Reglamento de Centros Cívicos."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Centros de Convivencia para Personas Mayores (art. 1)", "Red municipal de equipamientos para mayores: lugar de encuentro, participación, ocio, formación y servicios que mejoran su calidad de vida"],
        ["Servicios (art. 2)", "Información y asesoramiento; cafetería, prensa y lectura; ocio y tiempo libre; actividades formativas, ocupacionales y preventivas; participación y voluntariado; en algunos, comedor y salas de informática"],
        ["Requisitos para ser socio (art. 31)", "Ser jubilado o pensionista, tener 60 años o más y estar empadronado en Zaragoza"],
        ["Cónyuge o pareja del socio (art. 32)", "Puede ser socio de cualquier edad, si no trabaja con sueldo y está empadronado en Zaragoza"],
        ["Carné de socio (art. 33)", "Un único carné para toda la red de centros; solo se puede ser socio de un centro a la vez"],
        ["Asamblea General", "Formada por los socios del centro; se reúne en sesión ordinaria una vez al año"],
        ["Junta de Representantes", "Órgano elegido por los socios que propone actividades y mantiene la relación con todos ellos"],
        ["Dirección del centro", "La ejercen técnicos municipales, que elaboran el programa de actividades"],
        ["La red", "En octubre de 2026 el Ayuntamiento lista 32 Centros de Convivencia para Mayores, en distritos urbanos y barrios rurales"],
      ],
      preguntas: [
        ["media", "Para ser socio de un Centro de Convivencia para Mayores hay que tener al menos:", ["60 años", "50 años", "70 años"], "Art. 31 Ordenanza de los Centros de Convivencia."],
        ["media", "Además de la edad, para ser socio hay que ser jubilado o pensionista y:", ["Estar empadronado en Zaragoza", "Tener coche", "Ser funcionario"], "Art. 31 Ordenanza de los Centros de Convivencia."],
        ["media", "El carné de socio:", ["Es único y vale para toda la red de centros", "Sirve solo para un día", "Hay que renovarlo cada semana"], "Art. 33 Ordenanza de los Centros de Convivencia."],
        ["media", "¿Se puede ser socio de dos centros a la vez?", ["No", "Sí", "Sí, de tres como máximo"], "Art. 33 Ordenanza de los Centros de Convivencia."],
        ["media", "La Asamblea General de socios se reúne en sesión ordinaria:", ["Una vez al año", "Cada día", "Cada diez años"], "Ordenanza de los Centros de Convivencia."],
        ["facil", "¿Qué servicio ofrecen los Centros de Convivencia para Mayores?", ["Actividades de ocio y tiempo libre", "Venta de coches", "Bodas civiles"], "Art. 2 Ordenanza de los Centros de Convivencia."],
        ["dificil", "El cónyuge de un socio puede ser socio aunque no tenga 60 años si:", ["No trabaja con sueldo y está empadronado en Zaragoza", "Paga el doble", "Tiene más de 18 años"], "Art. 32 Ordenanza de los Centros de Convivencia."],
      ],
    },
  ],
  glosario: [
    [S1, "Casa Consistorial", "Edificio principal del Ayuntamiento, en la Plaza del Pilar."],
    [S1, "ORC", "Oficina de Relaciones con la Ciudadanía: atiende e informa a los vecinos en la Plaza del Pilar."],
    [S1, "Edificio Seminario", "Sede municipal en la Vía Hispanidad, 20."],
    [S2, "Distrito", "Parte de la ciudad con su propia Junta Municipal."],
    [S2, "Barrio rural", "Núcleo de población del término municipal fuera de la ciudad, con su Junta Vecinal."],
    [S2, "Alcalde de Barrio", "Vecino elegido por los vecinos que preside la Junta Vecinal."],
    [S3, "Centro cívico", "Edificio municipal del barrio con servicios y actividades para los vecinos."],
    [S3, "Consejo de Centro", "Comisión que revisa el plan anual y las actividades de un centro cívico."],
    [S3, "Polivalencia", "Que un espacio sirve para varios usos."],
    [S4, "Centro de convivencia", "Centro municipal de encuentro y actividades para personas mayores."],
    [S4, "Socio", "Persona inscrita en un centro de convivencia con carné."],
  ],
  casos: [
    {
      slug: "vecino-desorientado",
      titulo: "Un vecino desorientado",
      supuesto: "Trabajas de subalterno en la entrada de la Casa Consistorial. Un señor de 65 años, jubilado, te pregunta varias cosas: dónde puede empadronarse, dónde está la Junta Municipal de su barrio (vive en el distrito Universidad) y qué tiene que hacer para apuntarse a un centro de mayores.",
      preguntas: [
        [S1, "facil", "La Casa Consistorial está en:", ["La Plaza del Pilar", "La Vía Hispanidad", "El Actur"], "Ficha de la ORC."],
        [S1, "media", "Para el padrón, ¿dónde le atienden sin cita previa en ese mismo edificio?", ["En la Oficina de Relaciones con la Ciudadanía", "En Alcaldía", "En la cafetería"], "Fichas del padrón y de la ORC."],
        [S2, "media", "La Junta Municipal Universidad está en:", ["C/ Domingo Miral, 5", "Plaza del Pilar, 18", "C/ San Pablo, 37"], "Equipamientos municipales."],
        [S2, "media", "El horario de atención de las Juntas es de lunes a viernes:", ["De 8:30 a 13:30", "De 20 a 24 h", "Solo los sábados"], "Fichas del padrón."],
        [S4, "media", "¿Puede ser socio de un centro de convivencia?", ["Sí: es jubilado, tiene más de 60 años y, si está empadronado en Zaragoza, cumple los requisitos", "No, es demasiado mayor", "No, tiene que trabajar"], "Art. 31 Ordenanza de los Centros de Convivencia."],
        [S4, "media", "Si se hace socio, su carné le sirve:", ["En toda la red de centros", "Solo en un centro", "Solo un mes"], "Art. 33 Ordenanza de los Centros de Convivencia."],
        [S4, "media", "Su esposa tiene 58 años y no trabaja. ¿Puede ser socia?", ["Sí, como cónyuge de un socio, si está empadronada en Zaragoza", "No, por la edad", "Solo si paga"], "Art. 32 Ordenanza de los Centros de Convivencia."],
        [S1, "media", "Si quiere información por teléfono, puede llamar al:", ["010", "112", "060"], "Fichas municipales."],
        [S3, "media", "En su barrio hay un centro cívico. Allí puede encontrar:", ["Actividades culturales y servicios municipales del barrio", "Un hospital", "Un aeropuerto"], "Arts. 2 y 6 Reglamento de Centros Cívicos."],
        [S1, "media", "Si quiere dejar una queja por escrito en persona, puede hacerlo en:", ["La oficina de registro de la Plaza del Pilar", "Una papelera", "El autobús"], "Ficha del Servicio de Quejas y Sugerencias."],
      ],
    },
    {
      slug: "dia-en-centro-civico",
      titulo: "Un día en el centro cívico",
      supuesto: "Te destinan como subalterno a un centro cívico. Durante la tarde pasan varias cosas: unos padres dejan a dos niños de 10 años solos en el vestíbulo, una persona aparca su bicicleta en el pasillo, otra enciende un cigarrillo en la entrada interior y una asociación pregunta cómo conseguir un aula para un taller semanal.",
      preguntas: [
        [S3, "media", "Los niños de 10 años solos en el vestíbulo:", ["Deben estar acompañados por un adulto", "Pueden quedarse solos", "Deben esperar en la calle"], "Arts. 41 y 46 Reglamento de Centros Cívicos."],
        [S3, "media", "La bicicleta en el pasillo:", ["No puede quedarse, porque los pasillos deben estar libres para evacuar", "Puede quedarse si está atada", "Puede quedarse un rato"], "Art. 41 Reglamento de Centros Cívicos."],
        [S3, "media", "El cigarrillo en el interior:", ["Está prohibido y hay que pedir que lo apague", "Está permitido en la entrada", "Está permitido si hay ventana"], "Art. 43 Reglamento de Centros Cívicos."],
        [S3, "media", "Para un taller semanal todo el curso, la asociación debe:", ["Solicitar la cesión de espacios para actividades estables en el plazo establecido", "Ocupar el aula sin más", "Hablar con la cafetería"], "Art. 7 Reglamento de Centros Cívicos."],
        [S3, "media", "Una charla de un solo día es una actividad:", ["Puntual", "Estable", "Prohibida"], "Art. 7 Reglamento de Centros Cívicos."],
        [S3, "media", "¿Se puede comer en las aulas del centro cívico?", ["No, salvo en actividades autorizadas o en la cafetería", "Sí, siempre", "Solo en los pasillos"], "Art. 43 Reglamento de Centros Cívicos."],
        [S3, "media", "El horario de apertura y cierre del centro debe estar:", ["Expuesto en los accesos del centro", "Escondido", "Solo en la web de otro ayuntamiento"], "Art. 12 Reglamento de Centros Cívicos."],
        [S3, "media", "¿Quién preside el Consejo de Centro?", ["El presidente de la Junta del distrito o el Alcalde de Barrio", "El conserje", "Un vecino al azar"], "Art. 5 Reglamento de Centros Cívicos."],
        [S2, "media", "La oficina de la Junta que hay en el centro cívico sirve para:", ["Hacer trámites del barrio, como el padrón", "Comprar entradas de fútbol", "Sacar dinero"], "Art. 6 Reglamento de Centros Cívicos y fichas del padrón."],
        [S3, "dificil", "Las tres características esenciales de un centro cívico son:", ["Proximidad, polivalencia e integración de servicios", "Velocidad, precio y tamaño", "Silencio, oscuridad y frío"], "Art. 3 Reglamento de Centros Cívicos."],
      ],
    },
    {
      slug: "reparto-por-los-barrios",
      titulo: "El reparto por los barrios",
      supuesto: "Te encargan llevar unos sobres a varias Juntas: a la Junta Municipal Casco Histórico, a la Junta Municipal Centro, a la Junta Vecinal de Casetas y a la oficina de registro del Seminario. En el camino un compañero te pregunta cómo se organiza la ciudad.",
      preguntas: [
        [S2, "media", "La Junta Municipal Casco Histórico está en:", ["C/ San Pablo, 37", "C/ Monzón, 3", "Pza. Mayor, 2"], "Equipamientos municipales."],
        [S2, "media", "La Junta Municipal Centro está en:", ["Pº Hernán Cortés, 31-33", "C/ Domingo Miral, 5", "Vía Hispanidad, 20"], "Equipamientos municipales."],
        [S2, "media", "Casetas es:", ["Un barrio rural con Junta Vecinal", "Un distrito urbano", "Otro municipio"], "Art. 2 ROTPC."],
        [S2, "media", "¿Quién preside la Junta Vecinal de Casetas?", ["Su Alcalde de Barrio", "El Alcalde de Huesca", "El Presidente de la Diputación"], "Art. 31 ROTPC."],
        [S1, "media", "La oficina de registro del Seminario está en:", ["Vía Hispanidad, 20", "Plaza del Pilar, 18", "C/ San Pablo, 37"], "Ficha del Servicio de Quejas y Sugerencias."],
        [S2, "media", "¿Cuántos distritos urbanos tiene Zaragoza?", ["15", "10", "25"], "Art. 2 ROTPC."],
        [S2, "media", "¿Cuál de estos es un distrito urbano?", ["Torrero", "Movera", "Peñaflor"], "Art. 2 ROTPC."],
        [S2, "media", "Las Juntas sirven para:", ["Acercar el Ayuntamiento a los barrios y que los vecinos participen", "Cobrar las multas de tráfico", "Organizar elecciones generales"], "Art. 3 ROTPC."],
        [S2, "dificil", "El distrito más reciente de Zaragoza es:", ["Sur", "Centro", "Casco Histórico"], "Modificación del ROTPC, BOPZ 44 de 23-02-2018."],
        [S4, "media", "En muchos barrios rurales también hay:", ["Un Centro de Convivencia para Mayores", "Un aeropuerto", "Una universidad"], "Equipamientos municipales."],
      ],
    },
  ],
});
