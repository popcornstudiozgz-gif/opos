/**
 * Crea tema-379 — Tema 7 de Administrativo DGA (tema 2 del programa de
 * materias específicas): "El procedimiento administrativo: concepto e
 * importancia. La Ley 39/2015, de 1 de octubre, del Procedimiento
 * Administrativo Común de las Administraciones Públicas. Las
 * Administraciones Públicas: relaciones y órganos. Idea general de la
 * iniciación, ordenación, instrucción y terminación del procedimiento."
 *
 * Fuentes (textos consolidados leídos en esta sesión en la API del BOE):
 * - Ley 39/2015 (BOE-A-2015-10565): arts. 1-2 (objeto y ámbito), 54-62
 *   (iniciación de oficio), 66 y 68 (solicitudes y subsanación), 70-74
 *   (ordenación), 75-83 (instrucción), 84, 86, 88, 94 y 95 (terminación).
 * - Ley 40/2015, de Régimen Jurídico del Sector Público (BOE-A-2015-10566):
 *   arts. 1-3 (ámbito y principios), 5-14 (órganos y competencia), 15-18
 *   (órganos colegiados), 23-24 (abstención y recusación) y 140-153
 *   (relaciones interadministrativas, órganos de cooperación).
 * - Estatuto de Autonomía de Aragón (BOE-A-2007-8444): arts. 88 y 90
 *   (colaboración con el Estado y Comisión Bilateral Aragón-Estado).
 * El concepto de procedimiento y su doble finalidad (garantía del
 * ciudadano y eficacia de la Administración) se presenta como doctrina,
 * apoyada en el art. 105.c) CE y en el art. 1 de la Ley 39/2015.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-379-procedimiento-administrativo-organos.mjs
 */
import { sembrarTema, ADMIN_DGA } from "./lib/sembrar-tema.mjs";

const L39 = "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565";
const L40 = "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10566";
const EAA = "https://www.boe.es/buscar/act.php?id=BOE-A-2007-8444";
const S1 = "procedimiento-concepto-ley-39-2015";
const S2 = "organos-administrativos-competencia";
const S3 = "organos-colegiados-abstencion-recusacion";
const S4 = "relaciones-interadministrativas";
const S5 = "fases-procedimiento-idea-general";

await sembrarTema({
  tema: {
    slug: "tema-379",
    titulo: "El procedimiento administrativo y la Ley 39/2015; las Administraciones Públicas: órganos y relaciones; fases del procedimiento",
    descripcion: "Concepto e importancia del procedimiento administrativo. Objeto, ámbito y estructura de la Ley 39/2015. Las Administraciones Públicas y su sector público (Ley 40/2015): principios, órganos administrativos, competencia, delegación, avocación, encomienda de gestión, delegación de firma y suplencia; órganos colegiados; abstención y recusación. Relaciones interadministrativas: principios, colaboración, cooperación, Conferencias Sectoriales y Comisión Bilateral Aragón-Estado. Idea general de la iniciación, ordenación, instrucción y terminación del procedimiento.",
    contenido: "Qué es un procedimiento administrativo y para qué sirve, qué regula la Ley 39/2015 y cómo se organizan por dentro las Administraciones: quién es competente para decidir, cuándo puede pasar un asunto a otro órgano, cómo funcionan los órganos colegiados, cuándo debe apartarse un funcionario de un expediente y cómo colaboran el Estado, Aragón y los ayuntamientos. Termina con un recorrido por los cuatro momentos de cualquier expediente: inicio, ordenación, instrucción y resolución.",
    enlaces_boe: [
      { url: L39, titulo: "Ley 39/2015, de 1 de octubre, del Procedimiento Administrativo Común de las Administraciones Públicas (BOE-A-2015-10565)" },
      { url: L40, titulo: "Ley 40/2015, de 1 de octubre, de Régimen Jurídico del Sector Público (BOE-A-2015-10566)" },
      { url: EAA, titulo: "Estatuto de Autonomía de Aragón, arts. 88-90 (BOE-A-2007-8444)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "Concepto de procedimiento; objeto, ámbito y estructura de la Ley 39/2015", articulos: "arts. 1-2 Ley 39/2015", url: `${L39}#a1` },
      { seccion: S2, titulo: "Principios, órganos administrativos y competencia", articulos: "arts. 3, 5-14 Ley 40/2015", url: `${L40}#a5` },
      { seccion: S3, titulo: "Órganos colegiados; abstención y recusación", articulos: "arts. 15-18 y 23-24 Ley 40/2015", url: `${L40}#a15` },
      { seccion: S4, titulo: "Relaciones interadministrativas", articulos: "arts. 140-153 Ley 40/2015; arts. 88 y 90 EAA", url: `${L40}#a140` },
      { seccion: S5, titulo: "Iniciación, ordenación, instrucción y terminación", articulos: "arts. 54-95 Ley 39/2015", url: `${L39}#a54` },
    ],
  },
  vinculo: { oposicion: ADMIN_DGA.oposicion, bloqueId: ADMIN_DGA.bloqueDerecho, numero: 7 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Procedimiento administrativo (concepto)", "Cauce formal, ordenado en una sucesión de trámites, por el que la Administración forma su voluntad y dicta sus actos"],
        ["Doble finalidad del procedimiento", "Garantía de los derechos del ciudadano frente a la Administración y eficacia y acierto de la decisión administrativa"],
        ["Base constitucional (art. 105.c CE)", "La ley regulará el procedimiento a través del cual deben producirse los actos administrativos, garantizando, cuando proceda, la audiencia del interesado"],
        ["Objeto de la Ley 39/2015 (art. 1.1)", "Requisitos de validez y eficacia de los actos, el procedimiento común (incluidos el sancionador y el de responsabilidad patrimonial) y los principios de la iniciativa legislativa y la potestad reglamentaria"],
        ["Trámites adicionales (art. 1.2 Ley 39/2015)", "Solo por ley, de forma motivada y cuando sea eficaz, proporcionado y necesario; por reglamento solo especialidades de órganos, plazos, iniciación, terminación, publicación e informes"],
        ["Ámbito subjetivo (art. 2.1 Ley 39/2015)", "Sector público: AGE, Administraciones de las CCAA, entidades de la Administración Local y sector público institucional"],
        ["Administraciones Públicas (art. 2.3 Ley 39/2015)", "AGE, CCAA, entidades locales y los organismos públicos y entidades de derecho público vinculados o dependientes"],
        ["Estructura de la Ley 39/2015", "Título preliminar y seis títulos: interesados (I), actividad de las AAPP (II), actos (III), procedimiento común (IV), revisión (V) e iniciativa legislativa y potestad reglamentaria (VI)"],
        ["Ley 39/2015 y Ley 40/2015", "La 39 regula la relación externa con los ciudadanos (procedimiento); la 40, la organización y funcionamiento internos y las relaciones entre Administraciones"],
      ],
      preguntas: [
        ["media", "Según su art. 1.1, la Ley 39/2015 regula, entre otras materias:", ["El procedimiento administrativo común, incluido el sancionador y el de responsabilidad patrimonial", "La organización de la Administración General del Estado", "Los órganos colegiados de las Comunidades Autónomas", "El régimen de los convenios entre Administraciones"], "Art. 1.1 Ley 39/2015. La organización interna está en la Ley 40/2015."],
        ["media", "Según el art. 1.2 de la Ley 39/2015, los trámites adicionales o distintos a los de la ley solo pueden incluirse:", ["Mediante ley, de forma motivada y cuando sea eficaz, proporcionado y necesario", "Mediante orden ministerial", "Por instrucción del órgano instructor", "Mediante acuerdo del órgano colegiado competente"], "Art. 1.2 Ley 39/2015."],
        ["facil", "¿Cuál de estos entes NO tiene la consideración de Administración Pública según el art. 2.3 de la Ley 39/2015?", ["Una sociedad mercantil pública", "La Administración de la Comunidad Autónoma de Aragón", "Un ayuntamiento", "Un organismo autónomo"], "Las entidades de derecho privado forman parte del sector público institucional, pero no son Administraciones Públicas."],
        ["media", "¿Qué título de la Ley 39/2015 regula la revisión de los actos en vía administrativa?", ["Título V", "Título III", "Título IV", "Título VI"], "Estructura de la Ley 39/2015."],
        ["media", "Las Corporaciones de Derecho Público (por ejemplo, los colegios profesionales) en el ejercicio de funciones públicas se rigen:", ["Por su normativa específica y supletoriamente por la Ley 39/2015", "Solo por el Derecho privado", "Íntegramente por la Ley 39/2015", "Por la Ley 40/2015 en exclusiva"], "Art. 2.4 Ley 39/2015."],
        ["media", "El art. 105.c) de la Constitución remite a la ley la regulación del procedimiento, garantizando cuando proceda:", ["La audiencia del interesado", "La gratuidad del procedimiento", "La intervención del Ministerio Fiscal", "El silencio positivo"], "Art. 105.c) CE."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Principios de actuación (art. 3.1 Ley 40/2015)", "Servir con objetividad los intereses generales con eficacia, jerarquía, descentralización, desconcentración y coordinación, con sometimiento pleno a la Constitución, a la Ley y al Derecho"],
        ["Órgano administrativo (art. 5.1 Ley 40/2015)", "Unidad a la que se atribuyen funciones con efectos jurídicos frente a terceros o cuya actuación tiene carácter preceptivo"],
        ["Requisitos para crear un órgano (art. 5.3)", "Determinar su integración y dependencia jerárquica, delimitar sus funciones y competencias y dotar los créditos necesarios; no se pueden duplicar órganos"],
        ["Instrucciones y órdenes de servicio (art. 6)", "Dirigen la actividad de los órganos dependientes; su incumplimiento no afecta por sí solo a la validez del acto, pero puede generar responsabilidad disciplinaria"],
        ["Competencia (art. 8.1)", "Es irrenunciable y la ejercen los órganos que la tienen atribuida como propia, salvo delegación o avocación"],
        ["Delegación de competencias (art. 9)", "Traslada el ejercicio (no la titularidad) a otro órgano de la misma Administración aunque no sea dependiente; se publica en el boletín oficial y los actos se consideran del delegante"],
        ["Competencias indelegables (art. 9.2)", "Relaciones con la Jefatura del Estado, Presidencias de Gobierno y Parlamentos; disposiciones de carácter general; resolución de recursos por el órgano que dictó el acto; y lo que diga una ley"],
        ["Avocación (art. 10)", "El órgano superior asume un asunto de un órgano dependiente por acuerdo motivado notificado antes o a la vez que la resolución; no cabe recurso contra él"],
        ["Encomienda de gestión (art. 11)", "Encarga actividades materiales o técnicas a otro órgano o entidad; no cede la titularidad ni los elementos sustantivos; no puede tener por objeto prestaciones propias de contratos"],
        ["Delegación de firma (art. 12)", "El titular delega solo la firma en órganos dependientes; no altera la competencia ni necesita publicarse; se hace constar en el acto"],
        ["Suplencia (art. 13)", "Sustitución temporal del titular por vacante, ausencia, enfermedad, abstención o recusación; no altera la competencia ni necesita publicación"],
      ],
      preguntas: [
        ["media", "La delegación de competencias entre órganos de la Administración de la Comunidad Autónoma de Aragón debe publicarse en:", ["El Boletín Oficial de Aragón", "El Boletín Oficial del Estado", "El Boletín Oficial de la Provincia", "No necesita publicarse"], "Art. 9.3 Ley 40/2015: en el boletín de la Administración a la que pertenece el órgano delegante."],
        ["media", "¿Cuál de estas competencias NO puede delegarse?", ["La adopción de disposiciones de carácter general", "La resolución de solicitudes de ayudas", "La autorización de gastos", "La concesión de permisos al personal"], "Art. 9.2.b) Ley 40/2015."],
        ["dificil", "Contra el acuerdo de avocación:", ["No cabe recurso, aunque puede impugnarse en el recurso contra la resolución del procedimiento", "Cabe recurso de alzada", "Cabe recurso potestativo de reposición", "Cabe recurso contencioso-administrativo directo"], "Art. 10.2 Ley 40/2015."],
        ["media", "¿Qué figura NO requiere publicación para su validez?", ["La delegación de firma", "La delegación de competencias", "La revocación de una delegación de competencias", "La encomienda de gestión entre órganos de la misma Administración"], "Art. 12.2 Ley 40/2015 (también la suplencia, art. 13.2)."],
        ["media", "Las resoluciones dictadas por delegación se consideran dictadas:", ["Por el órgano delegante", "Por el órgano delegado", "Por el superior jerárquico común", "Por ambos de forma solidaria"], "Art. 9.4 Ley 40/2015."],
        ["dificil", "Salvo autorización expresa de una ley, ¿se pueden delegar las competencias que se ejercen por delegación?", ["No", "Sí, siempre", "Sí, con autorización del órgano delegante", "Sí, si el órgano es colegiado"], "Art. 9.5 Ley 40/2015."],
        ["media", "El incumplimiento por un órgano de una instrucción de su superior:", ["No afecta por sí solo a la validez del acto, sin perjuicio de la responsabilidad disciplinaria", "Hace nulo el acto de pleno derecho", "Hace anulable el acto en todo caso", "Obliga a revocar el acto de oficio"], "Art. 6.2 Ley 40/2015."],
        ["media", "Si una norma atribuye una competencia a una Administración sin decir qué órgano la ejerce, corresponde:", ["A los órganos inferiores competentes por razón de materia y territorio", "Al órgano de mayor jerarquía", "Al Consejo de Gobierno", "Al órgano que designe el interesado"], "Art. 8.3 Ley 40/2015."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Secretario del órgano colegiado (art. 16 Ley 40/2015)", "Puede ser miembro o no; vela por la legalidad formal y material, certifica las actuaciones y garantiza el respeto de las reglas de constitución y adopción de acuerdos"],
        ["Sesiones a distancia (art. 17.1)", "Todos los órganos colegiados pueden constituirse, reunirse y adoptar acuerdos presencialmente o a distancia, salvo que su reglamento interno diga lo contrario"],
        ["Quórum de constitución (art. 17.2)", "Presidente y Secretario (o suplentes) y al menos la mitad de los miembros"],
        ["Asuntos fuera del orden del día (art. 17.4)", "Solo si asisten todos los miembros y se declara la urgencia por el voto favorable de la mayoría"],
        ["Adopción de acuerdos (art. 17.5-6)", "Por mayoría de votos; quienes votan en contra o se abstienen quedan exentos de la responsabilidad derivada del acuerdo"],
        ["Acta (art. 18)", "La levanta el Secretario: asistentes, orden del día, lugar y tiempo, puntos principales de las deliberaciones y acuerdos; se aprueba en la misma sesión o en la siguiente"],
        ["Motivos de abstención (art. 23.2)", "Interés personal; matrimonio o parentesco (consanguinidad hasta el 4.º grado, afinidad hasta el 2.º); amistad íntima o enemistad manifiesta; haber sido perito o testigo; relación de servicio o servicios profesionales en los dos últimos años"],
        ["Efectos de no abstenerse (art. 23.4-5)", "No implica necesariamente la invalidez del acto, pero da lugar a responsabilidad"],
        ["Recusación (art. 24)", "La promueve el interesado por escrito en cualquier momento; el recusado responde al día siguiente; si lo niega, el superior resuelve en 3 días; no cabe recurso contra la decisión"],
      ],
      preguntas: [
        ["media", "Para la válida constitución de un órgano colegiado se requiere la asistencia del Presidente, del Secretario y de:", ["La mitad, al menos, de sus miembros", "Dos tercios de sus miembros", "La mayoría absoluta más uno", "Todos sus miembros"], "Art. 17.2 Ley 40/2015."],
        ["media", "Un asunto no incluido en el orden del día puede ser objeto de acuerdo si:", ["Asisten todos los miembros y se declara su urgencia por mayoría", "Lo propone el Presidente", "Lo pide un tercio de los miembros", "Lo autoriza el Secretario"], "Art. 17.4 Ley 40/2015."],
        ["dificil", "Es motivo de abstención el parentesco con un interesado:", ["De consanguinidad dentro del cuarto grado o de afinidad dentro del segundo", "De consanguinidad dentro del segundo grado", "De afinidad dentro del cuarto grado", "Solo si es de primer grado"], "Art. 23.2.b) Ley 40/2015."],
        ["media", "Haber prestado servicios profesionales a una empresa interesada es motivo de abstención si se hizo:", ["En los dos últimos años", "En los cinco últimos años", "En el último año", "En cualquier momento"], "Art. 23.2.e) Ley 40/2015."],
        ["media", "Si el recusado niega la causa de recusación, su superior resuelve en el plazo de:", ["Tres días", "Diez días", "Un día", "Quince días"], "Art. 24.4 Ley 40/2015."],
        ["media", "La intervención de un funcionario en quien concurría un motivo de abstención:", ["No implica necesariamente la invalidez del acto", "Determina siempre su nulidad de pleno derecho", "Determina siempre su anulabilidad", "Obliga a retrotraer todo el procedimiento"], "Art. 23.4 Ley 40/2015."],
        ["facil", "Los miembros de un órgano colegiado que votan en contra de un acuerdo:", ["Quedan exentos de la responsabilidad que pueda derivarse de él", "Responden solidariamente", "Deben impugnarlo en vía judicial", "Pierden el derecho a formular voto particular"], "Art. 17.6 Ley 40/2015."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Principios de las relaciones interadministrativas (art. 140 Ley 40/2015)", "Lealtad institucional, respeto a la distribución de competencias, colaboración, cooperación, coordinación, eficiencia, responsabilidad, garantía e igualdad de derechos y solidaridad interterritorial"],
        ["Colaboración (art. 140.1.c)", "Deber de actuar con el resto de Administraciones para el logro de fines comunes"],
        ["Cooperación (art. 140.1.d)", "Dos o más Administraciones asumen voluntariamente, en ejercicio de sus competencias, compromisos específicos para una acción común"],
        ["Coordinación (art. 140.1.e)", "Obligación de una Administración (singularmente la AGE) de garantizar la coherencia de las actuaciones de las Administraciones afectadas por una misma materia"],
        ["Negativa a colaborar (art. 141.2)", "Solo si no se está facultado, no hay medios suficientes, se causa un perjuicio grave o la información es confidencial; se comunica motivadamente"],
        ["Conferencia de Presidentes (art. 146)", "Órgano de cooperación multilateral entre el Gobierno de la Nación y los Gobiernos autonómicos, presidido por el Presidente del Gobierno"],
        ["Conferencia Sectorial (art. 147)", "Órgano multilateral de ámbito sectorial que preside el ministro competente y reúne a los consejeros autonómicos; debe inscribirse en el Registro estatal de Órganos e Instrumentos de Cooperación"],
        ["Decisiones de la Conferencia Sectorial (art. 151)", "Acuerdos (obligatorios salvo para quien vota en contra, o para todos si la AGE coordina) y recomendaciones (orientan la actuación; apartarse exige motivarlo)"],
        ["Comisión Bilateral de Cooperación Aragón-Estado (art. 90 EAA)", "Instrumento principal de relación entre Aragón y el Estado; presidencia alterna por turnos de un año; previene conflictos y delibera sobre proyectos legislativos estatales que afecten a Aragón"],
      ],
      preguntas: [
        ["media", "Según la Ley 40/2015, el principio por el que dos o más Administraciones asumen voluntariamente compromisos específicos para una acción común es el de:", ["Cooperación", "Colaboración", "Coordinación", "Lealtad institucional"], "Art. 140.1.d) Ley 40/2015."],
        ["media", "¿Quién preside una Conferencia Sectorial?", ["El miembro del Gobierno de la Nación competente por razón de la materia", "El Presidente del Gobierno", "El consejero autonómico de mayor antigüedad", "Rotatoriamente cada Comunidad Autónoma"], "Art. 147.1 Ley 40/2015."],
        ["dificil", "Un acuerdo de Conferencia Sectorial adoptado sin que la AGE ejerza funciones de coordinación es de obligado cumplimiento:", ["Salvo para quienes hayan votado en contra mientras no decidan suscribirlo después", "Para todas las Administraciones en todo caso", "Solo para la Administración General del Estado", "Para nadie, es una mera recomendación"], "Art. 151.2.a) Ley 40/2015."],
        ["media", "El instrumento principal de relación entre la Comunidad Autónoma de Aragón y el Estado es:", ["La Comisión Bilateral de Cooperación Aragón-Estado", "La Conferencia de Presidentes", "El Consejo de Política Fiscal y Financiera", "La Delegación del Gobierno en Aragón"], "Art. 90.1 EAA."],
        ["media", "La presidencia de la Comisión Bilateral de Cooperación Aragón-Estado se ejerce:", ["De forma alternativa en turnos de un año", "Siempre por el ministro competente", "Siempre por el Presidente de Aragón", "Por sorteo en cada sesión"], "Art. 90.3 EAA."],
        ["media", "Una Administración puede negarse a prestar la asistencia que otra le pide, entre otros supuestos, cuando:", ["No disponga de medios suficientes para ello, comunicándolo motivadamente", "Lo considere inconveniente políticamente", "La solicitante sea de distinto nivel territorial", "No exista un convenio previo"], "Art. 141.2 Ley 40/2015."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["Clases de iniciación (art. 54 Ley 39/2015)", "De oficio o a solicitud del interesado"],
        ["Iniciación de oficio (art. 58)", "Por acuerdo del órgano competente: por propia iniciativa, orden superior, petición razonada de otros órganos o denuncia"],
        ["Denuncia (art. 62.5)", "Por sí sola no confiere la condición de interesado en el procedimiento"],
        ["Subsanación de la solicitud (art. 68)", "10 días, con advertencia de tenerle por desistido; ampliable hasta 5 días salvo en procedimientos selectivos o de concurrencia competitiva"],
        ["Medidas provisionales (art. 56)", "Las adopta el órgano competente para resolver, de forma motivada y proporcionada, para asegurar la eficacia de la resolución; no pueden causar perjuicios de difícil o imposible reparación"],
        ["Ordenación: impulso (art. 71)", "De oficio en todos sus trámites y por medios electrónicos, respetando el orden riguroso de incoación en asuntos homogéneos"],
        ["Cumplimiento de trámites (art. 73)", "Los interesados disponen de 10 días salvo plazo distinto; si no los cumplen, pueden ser declarados decaídos en su derecho al trámite"],
        ["Cuestiones incidentales (art. 74)", "No suspenden la tramitación, salvo la recusación"],
        ["Instrucción: prueba (art. 77.2)", "Periodo de prueba no superior a 30 días ni inferior a 10"],
        ["Instrucción: informes (art. 80)", "Salvo disposición en contrario, facultativos y no vinculantes; se emiten en 10 días"],
        ["Trámite de audiencia (art. 82)", "Inmediatamente antes de la propuesta de resolución; plazo no inferior a 10 días ni superior a 15"],
        ["Información pública (art. 83)", "Anuncio en el diario oficial; plazo de alegaciones no inferior a 20 días; comparecer no otorga por sí la condición de interesado"],
        ["Formas de terminación (art. 84)", "Resolución, desistimiento, renuncia, caducidad e imposibilidad material de continuar por causas sobrevenidas; también terminación convencional (art. 86)"],
        ["Caducidad a solicitud del interesado (art. 95)", "Paralización imputable al interesado: se le advierte y, pasados 3 meses sin reanudar, se archivan las actuaciones"],
      ],
      preguntas: [
        ["facil", "¿Cuál de estas NO es una forma de iniciación de oficio del procedimiento?", ["Solicitud del interesado", "Orden superior", "Petición razonada de otros órganos", "Denuncia"], "Art. 58 Ley 39/2015; la solicitud es la otra clase de iniciación (art. 54)."],
        ["media", "Si una solicitud no reúne los requisitos exigidos, se requerirá al interesado para que subsane en un plazo de:", ["Diez días", "Quince días", "Cinco días", "Un mes"], "Art. 68.1 Ley 39/2015."],
        ["media", "El plazo del periodo de prueba es:", ["No superior a treinta días ni inferior a diez", "De quince días exactos", "No superior a dos meses", "No inferior a veinte días"], "Art. 77.2 Ley 39/2015."],
        ["media", "Salvo disposición expresa en contrario, los informes son:", ["Facultativos y no vinculantes", "Preceptivos y vinculantes", "Preceptivos y no vinculantes", "Facultativos y vinculantes"], "Art. 80.1 Ley 39/2015."],
        ["media", "El trámite de audiencia se concede por un plazo:", ["No inferior a diez días ni superior a quince", "De diez días hábiles exactos", "No inferior a veinte días", "No superior a cinco días"], "Art. 82.2 Ley 39/2015."],
        ["dificil", "En un procedimiento iniciado a solicitud del interesado y paralizado por causa imputable a él, la caducidad se produce:", ["Tras advertírsele y transcurrir tres meses sin que realice lo necesario para reanudarlo", "Automáticamente a los seis meses", "Al mes de la paralización, sin advertencia", "Nunca: la caducidad solo opera en procedimientos de oficio"], "Art. 95.1 Ley 39/2015."],
        ["media", "¿Cuál es la única cuestión incidental que suspende la tramitación del procedimiento?", ["La recusación", "La nulidad de actuaciones", "La abstención", "La acumulación"], "Art. 74 Ley 39/2015."],
        ["media", "El plazo para formular alegaciones en el trámite de información pública:", ["No puede ser inferior a veinte días", "Es de diez días", "No puede superar quince días", "Lo fija libremente cada interesado"], "Art. 83.2 Ley 39/2015."],
      ],
    },
  ],
  glosario: [
    [S1, "Procedimiento administrativo común", "El que regula la Ley 39/2015 para todas las Administraciones, sin perjuicio de las especialidades que una ley establezca en determinadas materias."],
    [S2, "Avocación", "Decisión motivada de un órgano superior de asumir un asunto que correspondía resolver a un órgano dependiente."],
    [S2, "Encomienda de gestión", "Encargo a otro órgano o entidad de actividades materiales o técnicas, sin ceder la competencia ni la responsabilidad de dictar los actos jurídicos."],
    [S2, "Desconcentración", "Traspaso permanente, mediante norma, de la titularidad y el ejercicio de una competencia a un órgano jerárquicamente dependiente."],
    [S3, "Quórum", "Número mínimo de miembros que deben asistir para que un órgano colegiado quede válidamente constituido."],
    [S3, "Recusación", "Petición del interesado para que se aparte del procedimiento a una autoridad o empleado público en quien concurre un motivo de abstención."],
    [S4, "Conferencia Sectorial", "Órgano de cooperación entre el ministro competente en una materia y los consejeros autonómicos del ramo."],
    [S5, "Petición razonada", "Propuesta de iniciar un procedimiento que formula un órgano sin competencia para iniciarlo; no vincula al competente, que debe explicar por qué no lo inicia."],
    [S5, "Decaimiento en el derecho al trámite", "Pérdida de la posibilidad de realizar un trámite por no haberlo cumplido en plazo, aunque se admite si se hace antes o el mismo día en que se notifica la resolución que lo declara."],
    [S5, "Propuesta de resolución", "Documento que el instructor eleva al órgano competente para resolver cuando instrucción y resolución corresponden a órganos distintos."],
  ],
  casos: [
    {
      slug: "competencia-delegada-direccion-general",
      titulo: "Una competencia que cambia de manos",
      supuesto: "La consejera de un departamento del Gobierno de Aragón tiene atribuida la concesión de unas ayudas. Para agilizar, delega por orden su resolución en una directora general. Meses después, ante un expediente especialmente delicado, la consejera decide resolverlo ella misma. Paralelamente, la directora general delega la firma de los oficios de trámite en un jefe de servicio.",
      preguntas: [
        [S2, "media", "La delegación de la consejera en la directora general traslada:", ["El ejercicio de la competencia, no su titularidad", "La titularidad de la competencia", "Solo la firma", "La responsabilidad política"], "Art. 8.1 Ley 40/2015."],
        [S2, "media", "Para ser eficaz, la orden de delegación debe publicarse en:", ["El Boletín Oficial de Aragón", "El tablón del departamento", "El BOE", "No necesita publicarse"], "Art. 9.3 Ley 40/2015."],
        [S2, "media", "Las resoluciones de la directora general en uso de la delegación deben indicar esta circunstancia y se consideran dictadas por:", ["La consejera", "La directora general", "El Gobierno de Aragón", "El jefe de servicio"], "Art. 9.4 Ley 40/2015."],
        [S2, "dificil", "Cuando la consejera decide resolver ella el expediente delicado, utiliza la figura de:", ["La avocación", "La revocación de la delegación", "La encomienda de gestión", "La suplencia"], "Art. 10 Ley 40/2015."],
        [S2, "media", "Ese acuerdo debe ser motivado y notificarse a los interesados:", ["Antes o a la vez que la resolución final", "Solo si lo piden", "Después de la resolución, en el plazo de un mes", "No es necesario notificarlo"], "Art. 10.2 Ley 40/2015."],
        [S2, "media", "La delegación de firma en el jefe de servicio:", ["No altera la competencia ni requiere publicación", "Exige publicación en el BOA", "Traslada la competencia al jefe de servicio", "Es nula porque la competencia ya era delegada"], "Art. 12 Ley 40/2015: cabe sobre competencias ostentadas por atribución o por delegación."],
        [S2, "dificil", "¿Podría la directora general delegar a su vez la competencia para resolver en el jefe de servicio?", ["No, salvo autorización expresa de una ley", "Sí, con la conformidad de la consejera", "Sí, porque es su órgano dependiente", "Sí, si lo publica en el BOA"], "Art. 9.5 Ley 40/2015."],
        [S2, "media", "¿Podría la consejera revocar la delegación?", ["Sí, en cualquier momento", "No, la delegación es irrevocable", "Solo pasado un año", "Solo con acuerdo del Gobierno"], "Art. 9.6 Ley 40/2015."],
        [S3, "media", "En uno de los expedientes es solicitante el cuñado de la directora general. Esta debe:", ["Abstenerse y comunicarlo a su superior inmediato", "Resolver igualmente, porque la afinidad no es causa de abstención", "Pedir permiso al interesado", "Delegar la firma en otro órgano"], "Art. 23.2.b) Ley 40/2015: afinidad dentro del segundo grado."],
        [S5, "facil", "Las ayudas se inician a solicitud de los interesados. Si una solicitud está incompleta, el plazo para subsanarla es de:", ["Diez días", "Cinco días", "Quince días", "Un mes"], "Art. 68.1 Ley 39/2015."],
      ],
    },
    {
      slug: "comision-valoracion-colegiada",
      titulo: "La comisión de valoración",
      supuesto: "Para resolver una convocatoria, el departamento crea una comisión de valoración con cinco vocales, presidenta y secretario. El día de la reunión, convocada por videoconferencia, se conectan la presidenta, el secretario y dos vocales. Uno de los vocales propone añadir un punto que no estaba en el orden del día. Al final, un vocal vota en contra de la propuesta mayoritaria.",
      preguntas: [
        [S3, "media", "¿Puede la comisión reunirse por videoconferencia?", ["Sí, salvo que su reglamento interno lo excluya expresa y excepcionalmente", "No, las sesiones deben ser presenciales", "Solo si lo autoriza el consejero", "Solo para aprobar actas"], "Art. 17.1 Ley 40/2015."],
        [S3, "dificil", "Con presidenta, secretario y dos de cinco vocales conectados, ¿está válidamente constituida?", ["No, falta la asistencia de al menos la mitad de los miembros", "Sí, porque están presidenta y secretario", "Sí, porque es a distancia", "Sí, si así lo decide la presidenta"], "Art. 17.2 Ley 40/2015: presidente, secretario y la mitad, al menos, de sus miembros."],
        [S3, "media", "El punto que no figuraba en el orden del día solo podría tratarse si:", ["Asistieran todos los miembros y se declarase la urgencia por mayoría", "Lo aceptase la presidenta", "Lo aceptase el secretario", "Se votase por unanimidad de los asistentes, aunque falten miembros"], "Art. 17.4 Ley 40/2015."],
        [S3, "media", "Los acuerdos de la comisión se adoptan:", ["Por mayoría de votos", "Por unanimidad", "Por mayoría de dos tercios", "Por decisión de la presidenta"], "Art. 17.5 Ley 40/2015."],
        [S3, "facil", "El vocal que vota en contra:", ["Queda exento de la responsabilidad que pueda derivarse del acuerdo", "Responde igual que los demás", "Debe abandonar la comisión", "Debe recurrir el acuerdo"], "Art. 17.6 Ley 40/2015."],
        [S3, "media", "¿Quién levanta el acta de la sesión?", ["El secretario", "La presidenta", "El vocal de mayor edad", "El jefe de servicio"], "Art. 18.1 Ley 40/2015."],
        [S3, "media", "El acta de la sesión puede aprobarse:", ["En la misma reunión o en la inmediata siguiente", "Solo en la sesión siguiente", "Únicamente por el consejero", "En el plazo de un mes"], "Art. 18.2 Ley 40/2015."],
        [S3, "media", "Un solicitante descubre que uno de los vocales es socio de una empresa competidora y pide que se aparte. Ha planteado:", ["Una recusación", "Un recurso de alzada", "Una abstención", "Una queja ante el Justicia"], "Art. 24 Ley 40/2015."],
        [S3, "dificil", "Contra la decisión que resuelve la recusación:", ["No cabe recurso, aunque puede alegarse al recurrir la resolución final", "Cabe recurso de alzada", "Cabe recurso de reposición", "Cabe recurso contencioso directo"], "Art. 24.5 Ley 40/2015."],
        [S5, "media", "La recusación planteada durante la tramitación:", ["Suspende la tramitación del procedimiento", "No suspende nada", "Pone fin al procedimiento", "Obliga a empezar de nuevo"], "Art. 74 Ley 39/2015: es la única cuestión incidental que suspende."],
      ],
    },
    {
      slug: "expediente-de-principio-a-fin",
      titulo: "Un expediente de principio a fin",
      supuesto: "Una empresa solicita una autorización al Gobierno de Aragón. El servicio tramitador pide un informe a otro departamento, abre un periodo de prueba porque no da por ciertos algunos datos y, como el asunto afecta a terceros, acuerda información pública. Mientras tanto, la empresa deja de aportar un documento indispensable que se le requirió.",
      preguntas: [
        [S5, "facil", "Este procedimiento se ha iniciado:", ["A solicitud del interesado", "De oficio por propia iniciativa", "Por denuncia", "Por orden superior"], "Art. 54 Ley 39/2015."],
        [S5, "media", "El informe del otro departamento, si ninguna norma dice lo contrario, será:", ["Facultativo y no vinculante, y debe emitirse en diez días", "Preceptivo y vinculante, en un mes", "Vinculante, en quince días", "Facultativo, sin plazo"], "Art. 80.1-2 Ley 39/2015."],
        [S5, "media", "El periodo de prueba que abre el instructor tendrá una duración:", ["Entre diez y treinta días", "De dos meses", "De cinco días", "Libre, sin límites"], "Art. 77.2 Ley 39/2015."],
        [S5, "media", "El instructor solo puede rechazar las pruebas propuestas por la empresa cuando sean:", ["Manifiestamente improcedentes o innecesarias, mediante resolución motivada", "Costosas", "Presentadas en papel", "Propuestas fuera del horario de registro"], "Art. 77.3 Ley 39/2015."],
        [S5, "media", "El anuncio de información pública se publicará en:", ["El diario oficial correspondiente, con un plazo de alegaciones no inferior a veinte días", "El tablón del servicio, durante diez días", "La prensa local, durante cinco días", "El BOE en todo caso"], "Art. 83.2 Ley 39/2015."],
        [S5, "media", "Un vecino que presenta alegaciones en la información pública:", ["No adquiere por ello la condición de interesado, pero tiene derecho a una respuesta razonada", "Pasa a ser interesado automáticamente", "Puede bloquear la autorización", "No tiene derecho a respuesta"], "Art. 83.3 Ley 39/2015."],
        [S5, "dificil", "Si la empresa no aporta el documento indispensable, la Administración puede declarar la caducidad:", ["Tras advertírselo y pasados tres meses de paralización imputable a ella", "Al día siguiente del vencimiento del plazo", "Sin advertencia previa, a los seis meses", "Nunca, porque se inició a solicitud"], "Art. 95.1 Ley 39/2015."],
        [S5, "media", "El trámite de audiencia a la empresa se realizará:", ["Una vez instruido el procedimiento, inmediatamente antes de redactar la propuesta de resolución", "Al inicio del procedimiento", "Después de la resolución", "Solo si lo pide la empresa"], "Art. 82.1 Ley 39/2015."],
        [S5, "media", "Si la empresa desiste de su solicitud y no hay terceros que pidan continuar, la Administración:", ["Aceptará de plano el desistimiento y declarará concluso el procedimiento", "Deberá resolver igualmente el fondo", "Le impondrá una sanción", "Pedirá autorización al Consejo Consultivo"], "Art. 94.4 Ley 39/2015."],
        [S1, "media", "Este procedimiento se rige por la Ley 39/2015 porque la Administración de la Comunidad Autónoma de Aragón:", ["Forma parte de su ámbito subjetivo de aplicación", "Ha decidido aplicarla voluntariamente", "Solo la aplica a las ayudas", "No está sujeta a ella"], "Art. 2.1.b) Ley 39/2015."],
      ],
    },
  ],
});
