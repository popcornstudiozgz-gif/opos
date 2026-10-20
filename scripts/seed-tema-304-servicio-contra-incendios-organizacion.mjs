/**
 * Crea tema-304 — Tema 9 de Bombero/a Conductor/a: "El Servicio contra
 * Incendios, de Salvamento y Protección Civil. Organización. Funciones de
 * los distintos puestos de la escala operativa, según la legislación de la
 * Comunidad Autónoma de Aragón. Parques de Bomberos. Especialidades."
 *
 * Fuente: Tema 9 editado por la Escuela de Bomberos del Ayuntamiento de
 * Zaragoza (V. 31-10-2024), publicado en zaragoza.es/sede/portal/bomberos/
 * temarios y leído íntegro en la sesión. Las funciones de cada categoría
 * son las del Decreto 158/2014 del Gobierno de Aragón que el propio
 * documento transcribe; las cifras de plantilla son las de la plantilla
 * aprobada en el presupuesto de 2024 que recoge el documento.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-304-servicio-contra-incendios-organizacion.mjs
 */
import { sembrarTema, BOMBERO } from "./lib/sembrar-tema.mjs";

const FUENTE = BOMBERO.escuela("TEMA_9_EL_SERVICIO_CONTRA_INCENDIOS_DE_SALVAMENTO_Y_PROTECCION_CIVIL_V2024.pdf");
const S1 = "organizacion-servicio";
const S2 = "funciones-escala-operativa";
const S3 = "especialidades-unidades";
const S4 = "parques-zonificacion";

await sembrarTema({
  tema: {
    slug: "tema-304",
    titulo: "El Servicio contra Incendios, de Salvamento y Protección Civil de Zaragoza: organización, funciones, especialidades y parques",
    descripcion: "Qué es el Servicio y en qué normas se apoya; los Cuerpos de Inspección, Mando e Intervención, la escala auxiliar y la Unidad de Asistencia Médica; turnos y dotaciones; funciones de cada categoría según el Decreto 158/2014; especialidades; zonificación y parques de bomberos.",
    contenido: "Sigue el Tema 9 editado por la Escuela de Bomberos del Ayuntamiento de Zaragoza: la naturaleza y base legal del Servicio, su estructura en cuerpos y categorías y la plantilla aprobada, la organización en seis turnos con sus mínimos y la dotación como unidad operativa básica, las funciones de jefe de intervención, subjefe, oficial y bombero, las especialidades (buceo, auxiliar de ambulancia, rescate vertical, guía canino) y la zonificación de la ciudad en parques.",
    enlaces_boe: [{ url: FUENTE, titulo: "Escuela de Bomberos de Zaragoza — Tema 9: El Servicio contra Incendios, de Salvamento y Protección Civil (V.2024)" }],
    indice_estudio: [
      { seccion: S1, titulo: "Organización del Servicio", articulos: "Tema 9, introducción y apartado 1", url: FUENTE },
      { seccion: S2, titulo: "Funciones de la escala operativa (Decreto 158/2014)", articulos: "Tema 9, apartado 2", url: FUENTE },
      { seccion: S3, titulo: "Especialidades, escala auxiliar y Unidad de Asistencia Médica", articulos: "Tema 9, apartados 1.1, 1.2 y 3", url: FUENTE },
      { seccion: S4, titulo: "Zonificación y parques de bomberos", articulos: "Tema 9, apartado 4", url: FUENTE },
    ],
  },
  vinculo: { oposicion: BOMBERO.oposicion, bloqueId: BOMBERO.bloqueParteII, numero: 9 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["¿Qué es el Servicio contra Incendios, de Salvamento y Protección Civil de Zaragoza?", "Un conjunto organizado de medios humanos y materiales que tiene por objeto el salvamento de personas y bienes en incendios, inundaciones, hundimientos, accidentes o calamidad pública y cualquier otro siniestro dentro de su zona de actuación"],
        ["¿En qué normas se apoya la competencia del Ayuntamiento para prestar el servicio de prevención y extinción de incendios?", "En la Ley 7/1985 Reguladora de las Bases de Régimen Local (municipio de más de 20.000 habitantes), la Ley 7/1999 de Administración Local de Aragón y la Ley 1/2013 de los Servicios de Prevención, Extinción de Incendios y Salvamento de Aragón"],
        ["¿Bajo qué autoridad actúa el Servicio?", "Bajo la superior autoridad del Alcalde-Presidente, que delega esta facultad en un miembro electo de la Corporación"],
        ["¿Qué condición tienen los bomberos del Servicio en el ejercicio de sus funciones?", "Son funcionarios de carrera y tienen el carácter de agentes de la autoridad"],
        ["¿En qué cuerpos se organiza el personal del Servicio desde la Ley 1/2013?", "En los Cuerpos de Inspección, de Mando y de Intervención"],
        ["¿En cuántos turnos se organiza el personal y cuál es la unidad operativa básica?", "En 6 turnos de trabajo; la unidad operativa básica es la dotación: un oficial bombero con cuatro bomberos"],
        ["¿Qué papel tiene el Servicio cuando se activa el Plan municipal de protección civil?", "Actúa como integrante del Grupo de Intervención, junto al resto de colectivos, bajo el mando único que corresponda según el plan y el tipo de emergencia"],
      ],
      preguntas: [
        ["facil", "¿Qué carácter tienen los bomberos del Servicio en el ejercicio de sus funciones?", ["Agentes de la autoridad", "Personal eventual", "Voluntarios de protección civil"], "Son funcionarios de carrera con carácter de agentes de la autoridad (Tema 9 de la Escuela)."],
        ["media", "¿En qué cuerpos se organiza el personal del Servicio?", ["Inspección, Mando e Intervención", "Dirección, Técnico y Auxiliar", "Operativo, Sanitario y Administrativo"], "Desde la Ley 1/2013, en los Cuerpos de Inspección, Mando e Intervención."],
        ["media", "¿Cuál es la unidad operativa básica del Servicio?", ["La dotación: un oficial bombero y cuatro bomberos", "El turno completo de guardia", "El parque de zona"], "Tema 9, apartado 1."],
        ["media", "¿En cuántos turnos de trabajo se integra el personal del Servicio?", ["Seis", "Cuatro", "Tres"], "El personal se integra en 6 turnos que deben cubrir unos mínimos diarios."],
        ["dificil", "Según la plantilla de 2024 recogida en el Tema 9, ¿cuántas plazas de Bombero/a Conductor había?", ["299", "70", "29"], "La plantilla aprobada en el presupuesto de 2024 contemplaba 299 plazas de Bombero/a Conductor."],
        ["media", "¿Quién ejerce la superior autoridad sobre el Servicio?", ["El Alcalde-Presidente, que la delega en un miembro electo de la Corporación", "El Gobierno de Aragón", "El Delegado del Gobierno"], "Tema 9, introducción."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["¿Qué norma fija las funciones de las categorías del Cuerpo de Intervención?", "El Decreto 158/2014 del Gobierno de Aragón, que regula la organización y funcionamiento de los Servicios de Prevención, Extinción de Incendios y Salvamento"],
        ["Cita tres funciones del Jefe de Intervención", "Dirigir, organizar y coordinar los recursos en su área; asumir la dirección de intervenciones complejas o simultáneas; verificar la movilización de recursos; dirigir la planificación formativa; documentar y evaluar incidentes y accidentes laborales; inspeccionar los parques"],
        ["Cita tres funciones del Subjefe de Intervención", "Dirigir los equipos de intervención de su área; asistir a los siniestros cuando se le ordene; sustituir al Jefe de Intervención; dirigir la formación teórica, práctica y de maniobras; supervisar dependencias, equipos y vehículos"],
        ["¿Qué hace el Oficial en una intervención?", "Asiste y dirige la intervención asumiendo el mando, valora la situación y la comunica a su superior pidiendo apoyo si procede, toma los datos, ordena la terminación y recogida del material y elabora el informe"],
        ["Cita cinco funciones del Bombero según el Decreto 158/2014", "Asistir a las intervenciones; velar por la seguridad de afectados y compañeros con eficacia, seguridad y proporcionalidad; conducir los vehículos para los que se le exigió permiso; revisar vehículos, material y herramientas en su guardia; reponer tras cada intervención el material dañado y los consumibles"],
        ["¿Qué debe hacer el bombero después de cada intervención con el material?", "Reponer inmediatamente el material dañado y los consumibles gastados, y limpiar y acondicionar lo que sea necesario"],
      ],
      preguntas: [
        ["facil", "¿Qué categoría asume el mando de la intervención según los procedimientos establecidos?", ["El Oficial", "El Bombero", "El Inspector"], "Es la primera función del Oficial en el Decreto 158/2014."],
        ["media", "¿Qué categoría sustituye al Jefe de Intervención cuando lo requiere el Jefe del Servicio?", ["El Subjefe de Intervención", "El Oficial", "El Bombero más antiguo"], "Función c) del Subjefe de Intervención."],
        ["media", "¿A quién informa el bombero de las anomalías o deterioros que observe?", ["Al Oficial, por el procedimiento establecido", "Directamente al Alcalde", "Al fabricante del material"], "Función j) del Bombero."],
        ["media", "¿Qué criterios debe aplicar el bombero al velar por la seguridad de afectados y compañeros?", ["Eficacia, seguridad y proporcionalidad", "Rapidez, economía y discreción", "Jerarquía y antigüedad"], "Función b) del Bombero."],
        ["dificil", "¿Qué categoría inspecciona los parques verificando su conservación, mantenimiento y orden?", ["El Jefe de Intervención", "El Oficial", "El Bombero"], "Función g) del Jefe de Intervención."],
        ["media", "¿Qué vehículos debe conducir el bombero?", ["Los del parque para los que se le exigió permiso en el proceso de selección", "Solo los turismos del Servicio", "Ninguno: conducir es tarea exclusiva del Oficial conductor"], "Función c) del Bombero."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["¿Quién forma la escala auxiliar del Servicio?", "Los componentes del Cuerpo de Intervención que han cumplido 55 años o que, por motivos de salud avalados médicamente, no pueden atender emergencias; realizan labores de apoyo (logística, mantenimiento, centro de comunicaciones)"],
        ["¿Cuándo se creó la Unidad de Asistencia Médica (UAM) y cuál es su primera función?", "En junio de 1983; su primera función es la asistencia sanitaria al Cuerpo de Intervención y a las personas auxiliadas en las intervenciones"],
        ["¿Con qué medios móviles cuenta la Unidad de Asistencia Médica?", "Tres UVI móviles, un Vehículo de Asistencia Médica (VAM) y un Puesto Médico Avanzado (PMA) portátil para grandes catástrofes"],
        ["¿Cuál es la vida útil de las ambulancias del Servicio?", "10 años, con independencia del kilometraje; por eso son los vehículos que más se renuevan"],
        ["Cita las especialidades del Servicio que recoge el Tema 9", "Rescate acuático (bombero buceador), auxiliar de ambulancia, rescate vertical y guía canino"],
        ["¿Sustituyen las funciones de un especialista a las de su categoría?", "No, no son excluyentes: se superponen a las del cargo que desempeña y se ejercen en el rescate y en el trabajo de parque"],
      ],
      preguntas: [
        ["facil", "¿A partir de qué edad pasan los componentes del Cuerpo de Intervención a la escala auxiliar?", ["55 años", "60 años", "50 años"], "Tema 9, apartado 1.1."],
        ["media", "¿En qué año se creó la Unidad de Asistencia Médica del Servicio?", ["1983", "1907", "1991"], "Se creó en junio de 1983."],
        ["media", "¿Cuántas UVI móviles tiene la Unidad de Asistencia Médica?", ["Tres", "Una", "Cinco"], "Tres UVI móviles, un VAM y un PMA."],
        ["media", "¿Qué dotación lleva cada UVI móvil además de médico y DUE?", ["Dos TES o bomberos con la formación exigida", "Un único conductor", "Cuatro bomberos"], "Tema 9, apartado 1.2."],
        ["dificil", "¿Cada cuánto revisan los especialistas en rescate vertical el funcionamiento del material?", ["Todos los lunes en servicio de mañana", "Una vez al mes", "Solo tras cada rescate"], "Reglamento de la especialidad de rescate vertical, recogido en el Tema 9."],
        ["media", "¿Qué tipo de búsquedas realiza el especialista guía canino?", ["Búsqueda y localización de personas en estructuras colapsadas, edificios, grandes áreas o ahogados", "Detección de explosivos en aeropuertos", "Control de animales peligrosos en la vía pública"], "Tema 9, apartado 3."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["¿Qué persigue la zonificación del Servicio en parques?", "Reducir los tiempos de respuesta, situando parques con su dotación por todo el término para llegar cuanto antes y que la emergencia quede en un conato"],
        ["¿En cuántas zonas de actuación se divide Zaragoza?", "En cuatro zonas, con un parque de zona en cada una; todos dependen del parque central, que recibe y distribuye las llamadas"],
        ["¿Qué alberga el Parque 1 además del parque de zona nº 1?", "Los órganos rectores (delegación política y jefatura), la central de comunicaciones, la sección de prevención, la oficina administrativa, la asistencia médica, almacenes, talleres, autoprotección escolar, escuela de formación y Protección Civil"],
        ["¿Cuándo se inauguró el Parque 1 y dónde está?", "En marzo de 1983, en la avenida Valle de Broto (segundo cinturón), en la margen izquierda del Ebro"],
        ["¿Qué tiene de particular el Parque 2?", "Está en el Casco Antiguo, anexo al Museo del Fuego y de los Bomberos (calle Ramón y Cajal); abierto en 1907, fue el único parque durante 75 años y está equipado para actuar en calles estrechas"],
        ["¿Para qué se usa hoy el Parque 5?", "Para la instrucción del personal en el Polígono Empresarium (calle Acebo): prácticas con fuego real en la «casa del fuego», plataforma de gas natural y extintores; aún sin personal permanente"],
      ],
      preguntas: [
        ["facil", "¿Qué parque recibe y distribuye las llamadas de emergencia?", ["El parque central (Parque 1)", "El Parque 2", "El Parque 4"], "Tema 9, apartado 4."],
        ["media", "¿En qué fecha se inauguró el Parque 1?", ["Marzo de 1983", "Octubre de 1988", "Marzo de 1991"], "Tema 9, apartado 4."],
        ["media", "¿Qué instalación de prácticas con fuego real tiene el Parque 5?", ["La «casa del fuego»", "Una torre de 50 metros", "Una piscina de buceo"], "Tema 9, apartado 4."],
        ["media", "¿Qué parque está especialmente equipado para intervenir en calles estrechas?", ["El Parque 2, del Casco Antiguo", "El Parque 3", "El Parque 4"], "Tema 9, apartado 4."],
        ["dificil", "¿Qué autoescalas tiene el Parque 1 según el Tema 9?", ["De 27, 37 y 50 metros", "De 18 y 30 metros", "Solo una de 42 metros"], "El Parque 1 cuenta con autoescalas de 27, 37 y 50 m y brazos articulados de 30 y 42 m."],
        ["media", "¿Qué corredor cubre también el Parque 1 desde la apertura de la Z-40?", ["El de la carretera de Castellón N-232", "El de la autovía de Madrid A-2 sur", "El de la carretera de Valencia"], "Tema 9, apartado 4."],
      ],
    },
  ],
  glosario: [
    [S1, "SEIS", "Servicio de Extinción de Incendios y Salvamento; denominación abreviada del Servicio contra Incendios, de Salvamento y Protección Civil de Zaragoza."],
    [S1, "Dotación", "Unidad operativa básica del Servicio: un oficial bombero y cuatro bomberos."],
    [S2, "Escala operativa", "Conjunto de categorías del Cuerpo de Intervención (jefe y subjefe de intervención, oficial y bombero) cuyas funciones fija el Decreto 158/2014."],
    [S3, "UAM", "Unidad de Asistencia Médica del Servicio, creada en 1983, con UVI móviles, VAM y puesto médico avanzado."],
    [S3, "PMA", "Puesto Médico Avanzado: instalación sanitaria portátil para atender víctimas en grandes catástrofes."],
    [S4, "Zonificación", "Reparto del término municipal en zonas atendidas por parques de zona para reducir los tiempos de respuesta."],
  ],
  casos: [
    {
      slug: "caso-primer-dia-parque-central",
      titulo: "Primer día en el parque central",
      supuesto: "Un bombero recién incorporado inicia su primera guardia en el Parque 1. Su oficial le explica la organización del Servicio, qué se espera de él y cómo se reparte el personal.",
      preguntas: [
        [S1, "facil", "¿Qué condición tiene el nuevo bombero en el ejercicio de sus funciones?", ["Agente de la autoridad", "Voluntario", "Personal eventual"], "Los bomberos del Servicio son funcionarios de carrera con carácter de agentes de la autoridad."],
        [S1, "media", "¿En qué cuerpo se integra como bombero?", ["En el Cuerpo de Intervención", "En el Cuerpo de Mando", "En el Cuerpo de Inspección"], "Las categorías de bombero, oficial, subjefe y jefe de intervención forman el Cuerpo de Intervención."],
        [S1, "media", "¿Qué formará con su oficial y otros tres compañeros?", ["Una dotación, la unidad operativa básica", "Un turno", "Un parque de zona"], "La dotación es un oficial bombero con cuatro bomberos."],
        [S2, "facil", "Al empezar la guardia, ¿qué debe revisar?", ["Los vehículos, materiales y herramientas asignados en su turno", "Las nóminas del turno", "La agenda del Alcalde"], "Función e) del Bombero."],
        [S2, "media", "Si observa que falta una herramienta en el vehículo, ¿qué debe hacer?", ["Informar al Oficial por el procedimiento establecido", "Comprarla por su cuenta", "Esperar a la próxima intervención"], "Funciones f) y j) del Bombero."],
        [S2, "media", "Tras la primera salida, ¿qué hará con los consumibles gastados?", ["Reponerlos inmediatamente", "Esperar al final del mes", "Dejarlo para el turno siguiente"], "Función i) del Bombero."],
        [S4, "media", "¿Qué otras dependencias encontrará en el Parque 1?", ["La central de comunicaciones, la jefatura y Protección Civil, entre otras", "Solo cocheras", "El Museo del Fuego"], "El Parque 1 acoge órganos rectores, central de comunicaciones, asistencia médica, escuela y Protección Civil."],
        [S3, "media", "Si un compañero se lesiona en una práctica, ¿qué unidad le atenderá?", ["La Unidad de Asistencia Médica", "La escala auxiliar", "La sección de prevención"], "La UAM presta asistencia al Cuerpo de Intervención, también en actividades formativas con riesgo."],
        [S2, "media", "¿Quién dirige su formación teórica, práctica y de maniobras?", ["El Subjefe de Intervención", "El propio bombero", "El Inspector"], "Función d) del Subjefe de Intervención."],
        [S1, "dificil", "Si se activa el Plan municipal de protección civil, ¿en qué grupo actuará el Servicio?", ["En el Grupo de Intervención", "En el Grupo Logístico", "En el Grupo Sanitario"], "Tema 9, introducción."],
      ],
    },
    {
      slug: "caso-intervencion-oficial-al-mando",
      titulo: "Un incendio en vivienda con el oficial al mando",
      supuesto: "Una dotación sale a un incendio en una vivienda. El oficial asume el mando y, ante la evolución del fuego, valora pedir más medios.",
      preguntas: [
        [S2, "facil", "¿Quién asume el mando de la intervención al llegar?", ["El Oficial", "El bombero conductor", "El primer vecino que avisó"], "Función a) del Oficial."],
        [S2, "media", "Si la situación empeora, ¿qué debe hacer el oficial?", ["Valorarla, comunicarla a su superior y solicitar medios de apoyo si procede", "Retirarse sin informar", "Esperar a que acabe la guardia"], "Función b) del Oficial."],
        [S2, "media", "¿Podría requerir la presencia de su superior en el siniestro?", ["Sí, cuando lo estime necesario", "No, nunca", "Solo si lo pide el propietario"], "Función i) del Oficial."],
        [S2, "media", "Si la complejidad aumenta mucho, ¿quién puede asumir la dirección?", ["El Jefe de Intervención", "El bombero más antiguo", "El conductor"], "Función b) del Jefe de Intervención."],
        [S2, "media", "¿Qué deben aplicar los bomberos al proteger a los vecinos y a sus compañeros?", ["Criterios de eficacia, seguridad y proporcionalidad", "Criterios de antigüedad", "Criterios económicos"], "Función b) del Bombero."],
        [S2, "facil", "Terminada la extinción, ¿quién ordena la recogida del material?", ["El Oficial", "El propietario", "El médico de la UAM"], "Función d) del Oficial."],
        [S2, "media", "¿Quién toma los datos de la intervención?", ["El Oficial", "El conductor de la autoescala", "La Policía Local en exclusiva"], "Función c) del Oficial."],
        [S3, "media", "Si hay heridos, ¿qué recurso del propio Servicio puede acudir?", ["Una UVI móvil de la Unidad de Asistencia Médica", "La unidad canina", "La escala auxiliar"], "La UAM cuenta con tres UVI móviles."],
        [S2, "media", "¿Quién elabora el informe de la intervención?", ["El Oficial", "El vecino afectado", "El Alcalde"], "Función g) del Oficial."],
        [S4, "media", "Si la vivienda está en el Casco Antiguo, ¿qué parque es el de zona?", ["El Parque 2", "El Parque 3", "El Parque 4"], "El Parque 2 cubre el centro urbano y el casco antiguo."],
      ],
    },
    {
      slug: "caso-busqueda-edificio-colapsado-especialidades",
      titulo: "Búsqueda tras el colapso de un edificio",
      supuesto: "Un edificio se derrumba parcialmente. Además de las dotaciones, se movilizan especialistas del Servicio y medios sanitarios para buscar y atender a posibles víctimas.",
      preguntas: [
        [S3, "facil", "¿Qué especialistas son adecuados para buscar personas bajo los escombros?", ["Los guías caninos", "Los buceadores", "Los auxiliares de ambulancia"], "El guía canino busca personas en estructuras colapsadas."],
        [S3, "media", "¿Dejan los guías caninos de ser bomberos durante la búsqueda?", ["No, sus funciones se superponen a las de su cargo", "Sí, pasan a depender de la Policía", "Sí, pasan a la escala auxiliar"], "Las funciones del especialista no son excluyentes."],
        [S3, "media", "Si hubiera que acceder a una zona alta con técnicas de escalada, ¿qué especialistas intervendrían?", ["Los de rescate vertical", "Los buceadores", "Los guías caninos"], "Rescate vertical: escalada y espeleo-socorro."],
        [S3, "media", "Si hay muchas víctimas, ¿qué recurso sanitario portátil existe para grandes catástrofes?", ["El Puesto Médico Avanzado", "Una autoescala", "La grúa"], "El PMA está destinado a grandes catástrofes."],
        [S3, "media", "¿Qué hace el auxiliar de ambulancia al llegar al lugar?", ["Colocar la ambulancia de forma segura y con fácil salida para evacuar", "Dirigir la extinción", "Buscar con el perro"], "Reglamento de auxiliar de ambulancia."],
        [S3, "media", "¿Qué maniobras puede realizar el auxiliar de ambulancia?", ["Las de soporte vital básico, ayudando al médico y al enfermero", "Cirugía de urgencia", "Ninguna sanitaria"], "Reglamento de auxiliar de ambulancia."],
        [S2, "media", "¿Quién verifica la correcta movilización de recursos al lugar?", ["El Jefe de Intervención", "El bombero conductor", "El guía canino"], "Función c) del Jefe de Intervención."],
        [S1, "media", "¿Bajo qué plan actuaría el Servicio si la emergencia obliga a activarlo?", ["El Plan municipal de protección civil", "El plan de prácticas anual", "El Plan de Igualdad"], "Tema 9, introducción."],
        [S3, "dificil", "Tras la búsqueda, ¿qué debe registrar el guía canino respecto al perro?", ["Su actividad en un diario que comunica semestralmente al Coordinador", "Nada", "Su peso diario al veterinario municipal"], "Reglamento de la Unidad Canina."],
        [S2, "media", "¿Quién documenta y evalúa los accidentes laborales del personal a su cargo?", ["El Jefe de Intervención", "El Bombero", "El médico de la UAM en exclusiva"], "Función e) del Jefe de Intervención."],
      ],
    },
  ],
});
