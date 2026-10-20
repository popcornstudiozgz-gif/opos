/**
 * Crea tema-331 — Tema 36 de Bombero/a Conductor/a: "Plan municipal de
 * protección civil de Zaragoza. Plan de actuación y organización ante la
 * emergencia."
 *
 * Fuente: Tema 36 "Plan municipal de protección civil de Zaragoza" de la
 * Escuela de Bomberos del Ayuntamiento de Zaragoza, leído íntegro, que
 * resume el Plan de actuación ante emergencias de protección civil de
 * Zaragoza (PEMUZ): estructura, órganos, Grupos de Acción, voluntariado,
 * fases y niveles, operatividad y CECOPAZ.
 *
 * Norma derogada señalada: el apunte encuadra el PEMUZ en la "Ley 30/2002,
 * de 17 de diciembre, de Protección Civil y Atención de Emergencias de
 * Aragón", hoy sustituida por la Ley 4/2024, de 28 de junio, del Sistema de
 * Protección Civil y Gestión de Emergencias de Aragón (BOE-A-2024-15350, ya
 * verificada en la sesión de Oficial Agente Inspector). Se dice expresamente
 * en la sección de introducción.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-331-plan-municipal-proteccion-civil-pemuz.mjs
 */
import { sembrarTema, BOMBERO } from "./lib/sembrar-tema.mjs";

const FUENTE = "https://www.zaragoza.es/cont/vistas/portal//bomberos/doc/Tema_36_Plan_municipal_de_proteccion_civil_de_Zaragoza.pdf";
const LEY_4_2024 = "https://www.boe.es/buscar/act.php?id=BOE-A-2024-15350";
const S1 = "pemuz-introduccion-estructura";
const S2 = "cecopaz-organos";
const S3 = "pma-direccion-operaciones";
const S4 = "grupos-accion-voluntarios";
const S5 = "fases-niveles-operatividad";

await sembrarTema({
  tema: {
    slug: "tema-331",
    titulo: "Plan municipal de protección civil de Zaragoza (PEMUZ): estructura, Grupos de Acción y fases",
    descripcion: "El PEMUZ como plan multirriesgo; órganos directivos, de coordinación, de asesoramiento y de intervención; CECOPAZ, Director del Plan, Director Técnico de la Emergencia, Comité Asesor, Gabinete de Información y UGAE; PMA, Director de Operaciones y Comité de Apoyo; los cinco Grupos de Acción y el voluntariado; fases de alerta, emergencia (nivel 1, 1 agravado y 2) y normalización.",
    contenido: "Sigue el Tema 36 de la Escuela de Bomberos: quién dirige una emergencia de protección civil en Zaragoza, dónde se coordina (CECOPAZ, en el Parque n.º 1), quién manda en el terreno (Director de Operaciones en el PMA), qué hace cada Grupo de Acción, cómo se integran los voluntarios y cómo se activa, escala y desactiva el plan. La ley autonómica que cita el apunte (Ley 30/2002) está derogada: hoy rige la Ley 4/2024 de Aragón.",
    enlaces_boe: [
      { url: FUENTE, titulo: "Escuela de Bomberos de Zaragoza — Tema 36: Plan municipal de protección civil (PEMUZ)" },
      { url: LEY_4_2024, titulo: "Ley 4/2024, de 28 de junio, del Sistema de Protección Civil y Gestión de Emergencias de Aragón (BOE-A-2024-15350)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "Introducción y estructura del PEMUZ", articulos: "Tema 36, introducción y estructura", url: FUENTE },
      { seccion: S2, titulo: "CECOPAZ: Director del Plan, DTE, Comité Asesor, Gabinete de Información y UGAE", articulos: "Tema 36, órganos del plan", url: FUENTE },
      { seccion: S3, titulo: "Puesto de Mando Avanzado, Director de Operaciones, Comité de Apoyo y Jefes de Grupo", articulos: "Tema 36, PMA", url: FUENTE },
      { seccion: S4, titulo: "Grupos de Acción y voluntarios de protección civil", articulos: "Tema 36, Grupos de Acción", url: FUENTE },
      { seccion: S5, titulo: "Activación, fases, niveles, operatividad y desactivación", articulos: "Tema 36, organización frente a la emergencia", url: FUENTE },
    ],
  },
  vinculo: { oposicion: BOMBERO.oposicion, bloqueId: BOMBERO.bloqueParteII, numero: 36 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["¿Qué es el PEMUZ?", "El Plan de actuación ante emergencias de protección civil de Zaragoza: marco orgánico-funcional y de movilización de recursos municipales, públicos y privados, y de coordinación con otras Administraciones"],
        ["¿Bajo qué principios estructura el PEMUZ la gestión de emergencias?", "Mando único, jerarquía, integración y coordinación"],
        ["¿Por qué se dice que el PEMUZ es multirriesgo?", "Porque cubre emergencias por cualquier tipo de riesgo en el término municipal; para algunos riesgos significativos hay planes específicos anexos"],
        ["¿Qué cuatro tipos de órganos tiene el PEMUZ?", "Directivos, de coordinación, de asesoramiento y de mando e intervención"],
        ["¿Qué órganos son directivos?", "El Director del Plan (decisiones estratégicas) y el Director de Operaciones (decisiones técnicas en la intervención)"],
        ["¿Qué órganos son de coordinación?", "El CECOPAZ, el Director Técnico de la Emergencia (integrado en él) y el PMA"],
        ["¿Qué órganos son de asesoramiento?", "Comité Asesor, Gabinete de Prensa/Información y UGAE (en el CECOPAZ) y Comité de Apoyo (en el PMA)"],
        ["¿Qué ley autonómica cita el apunte y cuál está vigente?", "Cita la Ley 30/2002 de Protección Civil de Aragón, derogada; hoy rige la Ley 4/2024, de 28 de junio, del Sistema de Protección Civil y Gestión de Emergencias de Aragón"],
      ],
      preguntas: [
        ["facil", "¿Qué significan las siglas PEMUZ?", ["Plan de actuación ante emergencias de protección civil de Zaragoza", "Plan de Movilidad Urbana de Zaragoza", "Programa de Empleo Municipal"], "Tema 36."],
        ["media", "¿Qué principio NO es uno de los cuatro del PEMUZ?", ["Descentralización", "Mando único", "Coordinación"], "Son mando único, jerarquía, integración y coordinación."],
        ["media", "¿Dónde se recogen los planes ante riesgos específicos?", ["Como anexos del PEMUZ", "En el BOE", "En la ordenanza fiscal"], "Tema 36."],
        ["media", "¿Qué tipo de órgano son los Grupos de Acción?", ["De intervención", "Directivo", "De asesoramiento"], "Sus Jefes son órganos de mando."],
        ["dificil", "¿Qué norma aragonesa de protección civil está vigente actualmente?", ["Ley 4/2024, de 28 de junio", "Ley 30/2002, de 17 de diciembre", "Ley 1/2013, de 7 de marzo"], "La Ley 30/2002 que cita el apunte fue sustituida por la Ley 4/2024 (BOE-A-2024-15350); la Ley 1/2013 regula los SPEIS."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["¿Qué es el CECOPAZ y quién lo integra?", "El Centro de Coordinación Operativa de Zaragoza, órgano superior de coordinación presidido por el Director del Plan; lo integran el Director del Plan, el DTE, el Comité Asesor, el Gabinete de Información y la UGAE"],
        ["¿Dónde se ubica el CECOPAZ?", "Como norma general en el Parque n.º 1 de bomberos (calle Valle de Broto, 16), salvo que el Director del Plan disponga otra ubicación"],
        ["¿Quién es el Director del PEMUZ?", "El Alcalde de Zaragoza o quien le sustituya; puede delegar en el concejal con competencias en protección civil"],
        ["¿Quién es el Director Técnico de la Emergencia?", "El Jefe del Servicio contra Incendios, de Salvamento y Protección Civil o, en su ausencia, el mando de mayor rango; enlace natural entre CECOPAZ y PMA"],
        ["¿Qué hace el Gabinete de Información?", "Elabora y difunde la información oficial; es el único órgano autorizado para dar datos a la población y a los medios"],
        ["¿Qué es la UGAE?", "La Unidad de Gestión Administrativa de la Emergencia, herramienta básica del CECOPAZ dirigida por el DTE y formada por personal del Servicio; actúa como Centro de Recepción de Alarmas"],
        ["¿Qué es el CRAZ?", "La Central de Recepción de Alarmas del Ayuntamiento de Zaragoza, dentro del CECOPAZ, que recibe avisos y alertas"],
      ],
      preguntas: [
        ["facil", "¿Quién preside el CECOPAZ?", ["El Director del Plan", "El Jefe de Policía Local", "El Delegado del Gobierno"], "Tema 36."],
        ["media", "¿Quién declara la activación del PEMUZ y su fin?", ["El Director del Plan", "El Gabinete de Información", "Cualquier bombero"], "Tema 36."],
        ["media", "¿Quién autoriza el uso de drones en la gestión de la emergencia?", ["El Director del Plan", "El Jefe de Grupo Sanitario", "El Comité de Apoyo"], "Tema 36."],
        ["media", "¿Qué órgano propone las zonas caliente, templada, de socorro y base?", ["El Director Técnico de la Emergencia", "El Gabinete de Información", "El Grupo de Acción Social"], "Tema 36."],
        ["dificil", "¿Quién ejerce la jefatura del Gabinete de Información en primer lugar?", ["El responsable de la dirección de Comunicación del Área de Alcaldía o quien designe el Director", "El Jefe de Bomberos", "Un periodista externo"], "Tema 36."],
        ["media", "¿Con qué centro autonómico se comunica la UGAE?", ["112 SOS Aragón", "El 091 exclusivamente", "Ninguno"], "Tema 36."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["¿Qué es el PMA en el PEMUZ?", "El órgano ejecutivo del Director del Plan en el terreno: visión global, coordinación de Grupos de Acción, zonificación e información continua al CECOPAZ"],
        ["¿Quién compone siempre el PMA?", "El Director de Operaciones y los Jefes de cada Grupo que intervienen; puede añadirse un Comité de Apoyo"],
        ["¿Quién es Director de Operaciones hasta su designación formal?", "La persona de mayor orden jerárquico del Servicio de Extinción, Salvamento y PC presente en el lugar"],
        ["¿Quién decide en qué Grupo de Acción se integran los voluntarios?", "El Director de Operaciones"],
        ["¿Qué es el Comité de Apoyo?", "Órgano asesor del PMA dependiente del Director de Operaciones, formado por especialistas, prácticos del terreno y responsables de instalaciones afectadas"],
        ["¿Quién es Jefe del Grupo de Intervención sin designación formal?", "El bombero de mayor rango en la zona de intervención"],
      ],
      preguntas: [
        ["facil", "¿Qué principio rige el PMA?", ["Mando único del Director de Operaciones", "Mando colegiado", "Votación"], "Tema 36."],
        ["media", "¿Puede haber varios PMA?", ["Sí, si la emergencia afecta a zonas amplias", "No, nunca", "Solo en nivel 2"], "El Director del Plan determina la modalidad."],
        ["media", "¿Quién designa al Director de Operaciones?", ["El Director del Plan", "El Comité Asesor", "El Jefe de Grupo Logístico"], "Tema 36."],
        ["media", "¿Quién mantiene el mando natural sobre sus efectivos dentro del PMA?", ["Cada medio asignado, aunque los coordine el Director de Operaciones", "Solo el Alcalde", "Nadie"], "Tema 36."],
        ["dificil", "¿Quién es Jefe del Grupo Sanitario en primera instancia?", ["El médico del primer recurso avanzado que llegue", "El Jefe de Policía", "El voluntario más antiguo"], "Después, el bombero sanitario de mayor rango."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["¿Cuáles son los cinco Grupos de Acción genéricos?", "Intervención, Seguridad, Sanitario, Acción Social y Logístico"],
        ["Misión del Grupo de Intervención", "Eliminar o controlar los efectos de la emergencia actuando sobre su causa, y el salvamento, rescate y protección de personas y bienes"],
        ["Misión del Grupo de Seguridad", "Seguridad ciudadana y orden público, y control de accesos a las zonas de intervención; lo forman FCSE y Policía Local"],
        ["Misión del Grupo Sanitario", "Asistencia sanitaria y socorro: primeros auxilios, clasificación, evacuación sanitaria y atención psicológica"],
        ["Misión del Grupo de Acción Social", "Atención social y psicológica a afectados y familiares y organización de la filiación en confinamiento, evacuación y albergue"],
        ["Misión del Grupo Logístico", "Proveer material, equipos y suministros, organizar evacuaciones y alojamientos, y medidas de ingeniería civil y rehabilitación de servicios esenciales"],
        ["¿Cómo intervienen los voluntarios de protección civil?", "Siempre integrados en un Grupo de Acción y bajo las órdenes de su Jefe; se evita en lo posible que participen en el Grupo de Intervención"],
      ],
      preguntas: [
        ["facil", "¿Cuántos Grupos de Acción prevé el PEMUZ de forma genérica?", ["Cinco", "Tres", "Diez"], "Tema 36."],
        ["media", "¿En qué grupo se integra la Unidad Verde del Ayuntamiento?", ["Intervención", "Acción Social", "Sanitario"], "Tema 36."],
        ["media", "¿Qué grupo hace los desvíos de tráfico y controla los accesos?", ["Seguridad", "Logístico", "Intervención"], "Tema 36."],
        ["media", "¿Quién dirige en primer lugar el Grupo Sanitario?", ["El Jefe del Servicio de Prevención y Salud", "El Alcalde", "Cruz Roja"], "Tema 36."],
        ["media", "¿Qué grupo garantiza las comunicaciones entre el PMA y el CECOPAZ con unidades móviles?", ["Logístico", "Acción Social", "Seguridad"], "Tema 36."],
        ["dificil", "¿En qué grupo se evita, en lo posible, la participación de voluntarios?", ["Intervención", "Logístico", "Acción Social"], "Tema 36."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["¿Cuándo se activa el PEMUZ?", "Ante una emergencia que supere o pueda superar la capacidad de respuesta de los servicios habituales"],
        ["¿En qué fases puede activarse el PEMUZ?", "Alerta, emergencia (nivel 1, nivel 1 agravado o nivel 2) y normalización"],
        ["¿Qué distingue el nivel 1, el nivel 1 agravado y el nivel 2?", "Nivel 1: controlable con los medios del plan bajo el Director del PEMUZ; 1 agravado: igual pero con apoyos puntuales externos; nivel 2: no controlable solo con el PEMUZ o requiere un plan de ámbito superior"],
        ["¿Qué implica el nivel 2?", "El PEMUZ queda integrado en un plan superior (Plan Territorial o Plan Especial de Aragón) y sigue la estrategia del CECOP autonómico"],
        ["¿Qué es la fase de normalización?", "La que sigue a la emergencia para restablecer las condiciones mínimas de vuelta a la normalidad"],
        ["¿Cómo se formaliza la activación?", "Con el modelo del anexo V, notificado a Administraciones y organismos, con fecha y hora, fase y nivel, riesgos, ubicación y afectaciones"],
        ["¿Cuándo se activa automáticamente el PEMUZ?", "Cuando se da una situación prevista en un Plan de Actuación Municipal ante riesgo específico"],
      ],
      preguntas: [
        ["facil", "¿Qué fase precede a la emergencia cuando hay previsiones desfavorables?", ["Alerta", "Normalización", "Nivel 2"], "Tema 36."],
        ["media", "¿Qué nivel se declara si se necesitan apoyos puntuales de recursos externos?", ["Nivel 1 agravado", "Nivel 2", "Alerta"], "Tema 36."],
        ["media", "¿Qué supone la activación de la fase de alerta?", ["La constitución del CECOPAZ", "La evacuación de la ciudad", "Nada"], "Tema 36."],
        ["media", "¿Cuándo se desactiva la fase de normalización?", ["Cuando se asegura el restablecimiento de los servicios esenciales", "Al día siguiente", "Al llegar la prensa"], "Tema 36."],
        ["dificil", "En nivel 2, ¿a qué directrices se ajusta el PEMUZ?", ["A las del Director del Plan autonómico y el CECOP de Aragón", "Solo a las del Alcalde", "A las de la UME"], "Tema 36."],
        ["media", "¿Qué criterio NO está entre los que valoran la activación?", ["El color de los vehículos", "Las condiciones meteorológicas", "La afectación a la población"], "Tema 36."],
      ],
    },
  ],
  glosario: [
    [S1, "Plan multirriesgo", "Plan que cubre emergencias de cualquier tipo de riesgo, completado por planes específicos para riesgos concretos."],
    [S2, "CECOPAZ", "Centro de Coordinación Operativa de Zaragoza, órgano superior de coordinación del PEMUZ."],
    [S2, "UGAE", "Unidad de Gestión Administrativa de la Emergencia, que hace efectivas las labores de coordinación del CECOPAZ."],
    [S2, "CRAZ", "Central de Recepción de Alarmas del Ayuntamiento de Zaragoza, ubicada en el CECOPAZ."],
    [S3, "Director de Operaciones", "Jefe del PMA que coordina técnicamente a todos los Grupos de Acción en el lugar de la emergencia."],
    [S3, "Zonificación", "División del terreno en zona de intervención (caliente y templada), de seguridad/socorro y libre/base."],
    [S4, "Grupo de Acción", "Conjunto de medios humanos y materiales con misión, ámbito y funciones definidas para intervenir en la emergencia."],
    [S5, "Nivel 2", "Nivel de emergencia que integra el PEMUZ en un plan de protección civil de ámbito autonómico."],
  ],
  casos: [
    {
      slug: "caso-inundacion-barrio-pemuz",
      titulo: "Inundación en un barrio",
      supuesto: "Tras unas lluvias torrenciales, varios bajos y aparcamientos de un barrio se inundan y hay personas aisladas. Los servicios habituales no dan abasto y se activa el PEMUZ.",
      preguntas: [
        [S5, "facil", "¿Por qué se activa el PEMUZ?", ["Porque se supera la capacidad de los servicios habituales", "Porque llueve", "Porque lo pide un vecino"], "Tema 36."],
        [S2, "media", "¿Quién declara formalmente la fase y el nivel?", ["El Director del Plan (Alcalde o delegado)", "El Jefe de Grupo Logístico", "El Gabinete de Información"], "Tema 36."],
        [S2, "media", "¿Dónde se constituye normalmente el CECOPAZ?", ["En el Parque n.º 1 de bomberos", "En el Pilar", "En la DGA"], "Tema 36."],
        [S4, "media", "¿Qué grupo hace el bombeo en bajos y aparcamientos?", ["Intervención", "Acción Social", "Seguridad"], "Tema 36."],
        [S4, "media", "¿Qué grupo organiza los albergues para los desalojados?", ["Logístico, con Acción Social en la atención", "Seguridad", "Sanitario únicamente"], "Tema 36."],
        [S2, "media", "¿Quién informa a la población y a los medios?", ["Solo el Gabinete de Información", "Cada bombero", "Los voluntarios"], "Tema 36."],
        [S3, "media", "¿Quién dirige en el terreno a todos los grupos?", ["El Director de Operaciones desde el PMA", "El Alcalde in situ", "El Comité Asesor"], "Tema 36."],
        [S4, "media", "Si llegan voluntarios de protección civil, ¿cómo intervienen?", ["Integrados en un Grupo asignado por el Director de Operaciones", "Por libre", "Dirigiendo el PMA"], "Tema 36."],
        [S5, "dificil", "Si hacen falta apoyos puntuales de bomberos de la DPZ, ¿qué nivel corresponde?", ["Nivel 1 agravado", "Nivel 2", "Alerta"], "Tema 36."],
        [S5, "media", "Cuando cesan las lluvias y hay que restablecer servicios, ¿qué fase se activa?", ["Normalización", "Alerta", "Nivel 2"], "Tema 36."],
      ],
    },
    {
      slug: "caso-fuga-quimica-poligono",
      titulo: "Fuga química en un polígono",
      supuesto: "Una nube tóxica se escapa de una industria y amenaza a un barrio cercano. Se activa el PEMUZ y se valora confinar a la población.",
      preguntas: [
        [S3, "facil", "¿Quién ejerce de Director de Operaciones hasta su designación formal?", ["El mando de mayor rango del Servicio presente", "El dueño de la industria", "Un policía"], "Tema 36."],
        [S3, "media", "¿Qué establece el Director de Operaciones sobre el terreno?", ["La zonificación de acceso e intervención", "Los presupuestos", "Las multas"], "Tema 36."],
        [S4, "media", "¿Qué grupo aplica y controla el confinamiento o evacuación?", ["Seguridad", "Logístico", "Acción Social"], "Tema 36."],
        [S4, "media", "¿Qué grupo controla la explosividad y tapona fugas?", ["Intervención", "Sanitario", "Seguridad"], "Tema 36."],
        [S3, "media", "¿Quién podría formar parte del Comité de Apoyo?", ["El responsable técnico de la industria afectada", "Un periodista", "Cualquier vecino"], "Tema 36."],
        [S2, "media", "¿Quién ordena las medidas de protección a la población?", ["El Director del Plan", "El Jefe de Grupo Sanitario", "La UGAE"], "Tema 36."],
        [S4, "media", "¿Qué grupo atiende a los heridos en la zona segura?", ["Sanitario", "Logístico", "Seguridad"], "Tema 36."],
        [S2, "media", "¿Qué órgano registra y tramita las peticiones de recursos extraordinarios?", ["La UGAE", "El PMA", "El Grupo de Seguridad"], "Tema 36."],
        [S5, "dificil", "Si la emergencia supera al PEMUZ y se activa un plan especial autonómico, ¿qué nivel se declara?", ["Nivel 2", "Nivel 1", "Normalización"], "Tema 36."],
        [S2, "media", "¿Quién es el enlace natural entre el PMA y el CECOPAZ?", ["El Director Técnico de la Emergencia", "El Gabinete de Información", "El Comité Asesor"], "Tema 36."],
      ],
    },
    {
      slug: "caso-ola-calor-alerta",
      titulo: "Previsión de una ola de calor extrema",
      supuesto: "Los servicios de predicción anuncian temperaturas extremas durante varios días. Aún no hay daños, pero se teme por la población vulnerable.",
      preguntas: [
        [S5, "facil", "¿Qué fase del PEMUZ corresponde?", ["Alerta", "Emergencia nivel 2", "Normalización"], "Tema 36."],
        [S5, "media", "¿Cuál es el objetivo principal de la fase de alerta?", ["Comunicar a autoridades y servicios e informar a la población potencialmente afectada", "Evacuar la ciudad", "Cerrar los parques"], "Tema 36."],
        [S2, "media", "¿Dónde se reciben y registran las informaciones sobre el fenómeno?", ["En la UGAE / Centro de Recepción de Alarmas", "En el PMA", "En cada Junta de Distrito"], "Tema 36."],
        [S2, "media", "¿Quién elabora los avisos y recomendaciones a la población?", ["El Gabinete de Información", "El Grupo de Intervención", "La UME"], "Tema 36."],
        [S4, "media", "¿Qué grupo podría suministrar equipos de climatización auxiliares?", ["Logístico", "Seguridad", "Intervención"], "Tema 36."],
        [S4, "media", "¿Qué grupo hace seguimiento especial a ancianos, niños y enfermos crónicos?", ["Sanitario", "Seguridad", "Intervención"], "Tema 36."],
        [S2, "media", "¿Quién decide la composición del Comité Asesor?", ["El Director del Plan, asesorado por el DTE", "El Gabinete", "Los voluntarios"], "Tema 36."],
        [S5, "media", "Si no se materializa el riesgo, ¿qué ocurre con el PEMUZ?", ["Se desactiva al no existir riesgo significativo", "Pasa a nivel 2", "Sigue activo un año"], "Tema 36."],
        [S2, "dificil", "¿Con qué otros centros enlaza la UGAE?", ["Comarca Central, Gobierno de Aragón, Delegación del Gobierno y CECOR", "Solo con la prensa", "Con ninguno"], "Tema 36."],
        [S1, "media", "¿Qué tipo de plan es el PEMUZ respecto a los riesgos?", ["Multirriesgo", "Solo de incendios", "Solo de inundaciones"], "Tema 36."],
      ],
    },
  ],
});
