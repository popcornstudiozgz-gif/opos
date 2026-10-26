/**
 * Crea tema-427 — Tema 5 de Administrativa/o (Ayto. Zaragoza, promoción
 * interna, CONV 5.2bis/2025, Parte primera rectificada en el BOPZ núm. 278 de
 * 3-12-2025): "La evaluación del desempeño en el Estatuto Básico del Empleado
 * Público (TREBEP): artículo 20 del TREBEP."
 *
 * Fuentes leídas íntegras en la sesión (texto vigente de la API del BOE,
 * 26-10-2026; ninguno de estos artículos ha cambiado desde 2015):
 * - TREBEP, RDLeg 5/2015 (BOE-A-2015-11719): art. 20 (núcleo del tema) y,
 *   por su conexión directa, arts. 16.3.a), 17.b) y 24.c).
 * - Ley 5/2017 de Integridad y Ética Públicas de Aragón (BOE-A-2017-10292),
 *   art. 44.5 (criterios de conducta en la gestión del rendimiento).
 * - Acuerdo sobre condiciones de trabajo del personal funcionario del
 *   Ayuntamiento de Zaragoza 2024-2027 (BOPZ núm. 134 de 13-06-2024): art.
 *   21.8 (objetivo de desarrollar la evaluación del desempeño), art. 26
 *   (carrera horizontal por antigüedad de cuatro años y 100 horas de
 *   formación, al amparo del art. 21.1.f de la Ley 30/1984 mientras no se
 *   desarrolle el art. 17 TREBEP) y art. 31 (productividad ligada a
 *   objetivos). No se ha localizado un sistema de evaluación del desempeño
 *   aprobado por el Ayuntamiento, por lo que el tema no le atribuye ninguno.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-427-evaluacion-desempeno.mjs
 */
import { sembrarTema, ADMIN_AYTO } from "./lib/sembrar-tema.mjs";

const TREBEP = "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11719";
const LEY5_2017 = "https://www.boe.es/buscar/act.php?id=BOE-A-2017-10292";
const BOPZ_ACUERDO = "https://www.boa.aragon.es/cgi-bin/EBOA/BRSCGI?CMD=VEROBJ&MLKOB=1337816230404&type=pdf";
const S1 = "concepto-criterios-evaluacion";
const S2 = "efectos-evaluacion";
const S3 = "evaluacion-ayuntamiento-zaragoza";

await sembrarTema({
  tema: {
    slug: "tema-427",
    titulo: "La evaluación del desempeño (artículo 20 del TREBEP)",
    descripcion: "Art. 20 TREBEP: obligación de establecer sistemas de evaluación del desempeño; concepto (medición y valoración de la conducta profesional y del rendimiento o logro de resultados); criterios de transparencia, objetividad, imparcialidad y no discriminación; efectos en la carrera horizontal, la formación, la provisión de puestos y las retribuciones complementarias; continuidad en el puesto obtenido por concurso; exigencia de sistemas objetivos aprobados previamente. Conexión con los arts. 16, 17 y 24 TREBEP, con el art. 44.5 de la Ley aragonesa 5/2017 y con el Acuerdo de condiciones de trabajo del Ayuntamiento de Zaragoza (carrera horizontal y productividad).",
    contenido: "La evaluación del desempeño es el procedimiento que mide y valora la conducta profesional y el rendimiento o los resultados de cada empleado. Todas las Administraciones deben establecer sistemas de evaluación, que han de ser transparentes, objetivos, imparciales y no discriminatorios. Cada Administración decide sus efectos en la carrera horizontal, la formación, la provisión de puestos y el complemento de productividad; la continuidad en un puesto ganado por concurso puede depender de ella, con audiencia y resolución motivada. Pero ninguno de esos efectos puede aplicarse sin haber aprobado antes un sistema objetivo. En el Ayuntamiento de Zaragoza, el Acuerdo 2024-2027 fija como objetivo desarrollarla, y entretanto la carrera horizontal se basa en cuatro años de servicio y cien horas de formación.",
    enlaces_boe: [
      { url: TREBEP, titulo: "Real Decreto Legislativo 5/2015, texto refundido del Estatuto Básico del Empleado Público (BOE-A-2015-11719), art. 20" },
      { url: LEY5_2017, titulo: "Ley 5/2017, de 1 de junio, de Integridad y Ética Públicas de Aragón (BOE-A-2017-10292), art. 44.5" },
      { url: BOPZ_ACUERDO, titulo: "Acuerdo sobre condiciones de trabajo del personal funcionario del Ayuntamiento de Zaragoza (BOPZ núm. 134, de 13-06-2024)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "Concepto y criterios de la evaluación del desempeño", articulos: "art. 20.1 y 2 TREBEP", url: `${TREBEP}#a20` },
      { seccion: S2, titulo: "Efectos de la evaluación y requisito de sistemas objetivos", articulos: "art. 20.3 a 5; arts. 16, 17 y 24 TREBEP", url: `${TREBEP}#a20` },
      { seccion: S3, titulo: "La evaluación del desempeño en Aragón y en el Ayuntamiento de Zaragoza", articulos: "art. 44.5 Ley 5/2017; arts. 21, 26 y 31 del Acuerdo", url: BOPZ_ACUERDO },
    ],
  },
  vinculo: { oposicion: ADMIN_AYTO.oposicion, bloqueId: ADMIN_AYTO.bloqueParte1, numero: 5 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Obligación del art. 20.1 TREBEP", "Las Administraciones Públicas establecerán sistemas que permitan la evaluación del desempeño de sus empleados"],
        ["Concepto de evaluación del desempeño (art. 20.1)", "Procedimiento mediante el cual se mide y valora la conducta profesional y el rendimiento o el logro de resultados"],
        ["Criterios de los sistemas de evaluación (art. 20.2)", "Transparencia, objetividad, imparcialidad y no discriminación"],
        ["Límite de los sistemas de evaluación (art. 20.2)", "Se aplican sin menoscabo de los derechos de los empleados públicos"],
      ],
      preguntas: [
        ["facil", "Según el art. 20 TREBEP, la evaluación del desempeño es el procedimiento mediante el cual se mide y valora:", ["La conducta profesional y el rendimiento o el logro de resultados", "Solo la antigüedad", "Solo los títulos académicos"], "Art. 20.1 TREBEP."],
        ["media", "Los sistemas de evaluación del desempeño se adecuarán a criterios de:", ["Transparencia, objetividad, imparcialidad y no discriminación", "Rapidez, economía y secreto", "Jerarquía y antigüedad"], "Art. 20.2 TREBEP."],
        ["media", "Están obligadas a establecer sistemas de evaluación del desempeño:", ["Las Administraciones Públicas", "Solo la Administración General del Estado", "Solo las empresas públicas"], "Art. 20.1 TREBEP."],
        ["dificil", "Los sistemas de evaluación del desempeño se aplicarán:", ["Sin menoscabo de los derechos de los empleados públicos", "Aunque limiten los derechos de los empleados", "Solo con autorización judicial"], "Art. 20.2 TREBEP."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Efectos de la evaluación (art. 20.3)", "Cada Administración determina sus efectos en la carrera profesional horizontal, la formación, la provisión de puestos y las retribuciones complementarias del art. 24"],
        ["Continuidad en el puesto obtenido por concurso (art. 20.4)", "Queda vinculada a la evaluación del desempeño, con audiencia al interesado y resolución motivada"],
        ["Requisito previo (art. 20.5)", "La carrera horizontal, el complemento por rendimiento del art. 24.c) y el cese en un puesto obtenido por concurso exigen aprobar antes sistemas objetivos de evaluación"],
        ["Carrera horizontal (arts. 16.3.a y 17.b)", "Progresión sin cambiar de puesto; debe valorar, entre otros, la trayectoria, la calidad del trabajo, los conocimientos y el resultado de la evaluación del desempeño"],
        ["Art. 24.c) TREBEP", "Retribución complementaria por el grado de interés, iniciativa o esfuerzo y el rendimiento o resultados obtenidos"],
      ],
      preguntas: [
        ["facil", "Según el art. 20.3 TREBEP, cada Administración determinará los efectos de la evaluación en, entre otros:", ["La carrera profesional horizontal y la formación", "La edad de jubilación", "El régimen de incompatibilidades"], "Art. 20.3 TREBEP."],
        ["media", "La continuidad en un puesto de trabajo obtenido por concurso:", ["Queda vinculada a la evaluación del desempeño, con audiencia al interesado y resolución motivada", "Es indefinida en todo caso", "Depende solo de la voluntad del superior"], "Art. 20.4 TREBEP."],
        ["media", "Para aplicar la carrera horizontal o cesar a alguien en un puesto obtenido por concurso por su desempeño se requiere:", ["La aprobación previa de sistemas objetivos de evaluación", "Solo un informe del jefe", "La conformidad de los sindicatos en cada caso"], "Art. 20.5 TREBEP."],
        ["dificil", "Las retribuciones complementarias ligadas a la evaluación son las del art. 24.c) TREBEP, que atienden a:", ["El interés, iniciativa o esfuerzo y el rendimiento o resultados obtenidos", "La antigüedad", "Los servicios extraordinarios fuera de la jornada"], "Arts. 20.3 y 24.c) TREBEP."],
        ["media", "Según el art. 17.b) TREBEP, en la carrera horizontal debe valorarse, entre otros aspectos:", ["El resultado de la evaluación del desempeño", "La afiliación sindical", "El lugar de residencia"], "Art. 17.b) TREBEP."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Ley 5/2017 de Aragón y rendimiento (art. 44.5)", "Las Administraciones promoverán que el sistema de gestión del rendimiento valore la conducta profesional con criterios que garanticen el cumplimiento del código de conducta"],
        ["Objetivo del Acuerdo municipal (art. 21.8)", "Desarrollo de la evaluación del desempeño para la mejora de la gestión administrativa"],
        ["Carrera horizontal en el Ayuntamiento (art. 26 del Acuerdo)", "Ascenso de nivel por cuatro años de servicio activo en el mismo grupo en el Ayuntamiento y 100 horas de formación, al amparo de la Ley 30/1984 mientras no se desarrolle el art. 17 TREBEP"],
        ["Nivel máximo de carrera del grupo C1 (art. 26 del Acuerdo)", "Intervalo de niveles 11-22 (16-22 tras el RDL 6/2023), con nivel máximo de carrera 22"],
        ["Productividad en el Ayuntamiento (art. 31 del Acuerdo)", "Retribuye el especial rendimiento, la actividad extraordinaria y el interés o iniciativa, en función de circunstancias objetivas y de objetivos asignados al puesto"],
        ["Sistema municipal de evaluación", "No se ha localizado un sistema de evaluación del desempeño aprobado y publicado por el Ayuntamiento de Zaragoza"],
      ],
      preguntas: [
        ["media", "El Acuerdo de condiciones de trabajo del Ayuntamiento de Zaragoza recoge, entre sus principios generales:", ["El desarrollo de la evaluación del desempeño para la mejora de la gestión administrativa", "La supresión de la evaluación", "La evaluación solo de los directivos"], "Art. 21.8 del Acuerdo."],
        ["media", "Según el Acuerdo municipal, el ascenso de nivel en la carrera horizontal exige, entre otros requisitos:", ["Cuatro años de servicio activo en el mismo grupo y 100 horas de formación", "Una evaluación anual favorable", "Diez años de antigüedad"], "Art. 26.A.e) del Acuerdo."],
        ["dificil", "Mientras no se desarrolle el art. 17 TREBEP por ley de Función Pública, la carrera horizontal municipal se sigue apoyando en:", ["El art. 21.1.f) de la Ley 30/1984", "El art. 20 TREBEP directamente", "Un reglamento europeo"], "Art. 26.2 del Acuerdo."],
        ["media", "Según el Acuerdo, el complemento de productividad se percibe en función de:", ["Circunstancias objetivas relacionadas con el desempeño y los objetivos del puesto", "La antigüedad", "El número de hijos"], "Art. 31.3 del Acuerdo."],
        ["media", "La Ley 5/2017 de Aragón pide que la gestión del rendimiento incluya, al valorar la conducta profesional:", ["Criterios que garanticen la observancia del código de conducta", "Solo criterios económicos", "La opinión de los ciudadanos exclusivamente"], "Art. 44.5 Ley 5/2017."],
      ],
    },
  ],
  glosario: [
    [S1, "Evaluación del desempeño", "Procedimiento que mide y valora la conducta profesional y el rendimiento o logro de resultados de los empleados públicos (art. 20.1 TREBEP)."],
    [S1, "Rendimiento", "Resultado del trabajo en relación con los objetivos fijados; uno de los dos objetos de la evaluación junto a la conducta profesional."],
    [S2, "Carrera horizontal", "Progresión profesional sin cambiar de puesto de trabajo, por grados, categorías o niveles (arts. 16.3.a y 17 TREBEP)."],
    [S2, "Provisión de puestos", "Procedimientos para cubrir puestos de trabajo (concurso, libre designación...); uno de los ámbitos en que la evaluación puede tener efectos."],
    [S3, "Complemento de productividad", "Retribución complementaria por especial rendimiento, actividad extraordinaria e interés o iniciativa (art. 24.c TREBEP y art. 31 del Acuerdo)."],
    [S3, "Nivel de complemento de destino", "Escalón dentro del intervalo de cada grupo de clasificación que se progresa con la carrera horizontal municipal (art. 26 del Acuerdo)."],
  ],
  casos: [
    {
      slug: "adm-ayto-evaluacion-nueva-jefa",
      titulo: "Una jefa que quiere evaluar a su equipo",
      supuesto: "La nueva jefa de una unidad administrativa decide, por su cuenta, puntuar cada mes a sus administrativos de 1 a 10 según su «actitud», sin criterios escritos, y anuncia que quien saque menos de 5 perderá el puesto que obtuvo por concurso y no cobrará productividad.",
      preguntas: [
        [S1, "media", "Un sistema de evaluación sin criterios escritos y basado en la «actitud» según el parecer de la jefa vulnera los criterios de:", ["Transparencia y objetividad", "Celeridad y economía", "Jerarquía"], "Art. 20.2 TREBEP."],
        [S1, "facil", "La evaluación del desempeño debe medir y valorar:", ["La conducta profesional y el rendimiento o logro de resultados", "La simpatía personal", "La vida privada"], "Art. 20.1 TREBEP."],
        [S2, "media", "¿Puede cesarse a un administrativo en un puesto obtenido por concurso sin un sistema objetivo aprobado previamente?", ["No, el art. 20.5 exige la aprobación previa de sistemas objetivos", "Sí, si lo decide la jefa", "Sí, si saca menos de 5"], "Art. 20.5 TREBEP."],
        [S2, "media", "Además, el cese en el puesto obtenido por concurso exige:", ["Audiencia al interesado y resolución motivada", "Solo una comunicación verbal", "La firma del interesado"], "Art. 20.4 TREBEP."],
        [S2, "media", "Quién determina los efectos de la evaluación en la provisión de puestos y las retribuciones:", ["Cada Administración Pública", "Cada jefe de unidad", "Cada empleado"], "Art. 20.3 TREBEP."],
        [S1, "dificil", "Si la evaluación tratara peor a quienes tienen reducción de jornada por cuidado de hijos sin justificación objetiva, vulneraría el criterio de:", ["No discriminación", "Economía", "Jerarquía"], "Art. 20.2 TREBEP."],
        [S3, "media", "En el Ayuntamiento, el complemento de productividad se basa en:", ["Circunstancias objetivas y objetivos asignados al puesto, con justificación periódica", "La puntuación personal de cada jefe", "La antigüedad"], "Art. 31.3 y 6 del Acuerdo."],
        [S1, "media", "Los sistemas de evaluación se aplicarán:", ["Sin menoscabo de los derechos de los empleados", "Aunque reduzcan derechos", "Solo a los interinos"], "Art. 20.2 TREBEP."],
        [S3, "media", "Según el Acuerdo, ¿es objetivo municipal desarrollar la evaluación del desempeño?", ["Sí, para mejorar la gestión administrativa", "No, está prohibida", "Solo para la Policía Local"], "Art. 21.8 del Acuerdo."],
        [S2, "media", "La obligación de establecer sistemas de evaluación del desempeño corresponde a:", ["Las Administraciones Públicas", "Los jefes de unidad por su cuenta", "Los sindicatos"], "Art. 20.1 TREBEP."],
      ],
    },
    {
      slug: "adm-ayto-evaluacion-carrera-horizontal",
      titulo: "Subir de nivel sin cambiar de puesto",
      supuesto: "Pedro, administrativo C1 con nivel 16, lleva cuatro años en servicio activo en el Ayuntamiento de Zaragoza en el mismo grupo y ha hecho 120 horas de cursos validados por el Centro Municipal de Formación. Quiere ascender de nivel y pregunta si le evaluarán el desempeño.",
      preguntas: [
        [S3, "media", "Según el Acuerdo, el ascenso de nivel en la carrera horizontal exige:", ["Cuatro años de servicio activo en el mismo grupo en el Ayuntamiento y 100 horas de formación", "Una evaluación del desempeño favorable", "Aprobar un examen"], "Art. 26.A.e) del Acuerdo."],
        [S3, "facil", "¿Cumple Pedro los requisitos?", ["Sí", "No, le faltan horas de formación", "No, le faltan años"], "Art. 26.A.e) del Acuerdo."],
        [S3, "media", "¿Cuentan para el ascenso los servicios prestados en otras Administraciones?", ["No, según el Acuerdo", "Sí, siempre", "Solo los del Gobierno de Aragón"], "Art. 26.A.e) del Acuerdo."],
        [S3, "media", "Las acciones formativas alegadas deben haber sido validadas previamente por:", ["El Centro Municipal de Formación", "El propio Pedro", "Cualquier academia privada"], "Art. 26.A.e) del Acuerdo."],
        [S3, "media", "El procedimiento para reconocer el nivel superior se inicia:", ["A petición del interesado, con documentación justificativa", "De oficio cada año", "Por sorteo"], "Art. 26.B.1 del Acuerdo."],
        [S2, "media", "La carrera horizontal consiste en:", ["Progresar sin necesidad de cambiar de puesto de trabajo", "Ascender a un puesto superior por concurso", "Cambiar de grupo de clasificación"], "Art. 16.3.a) TREBEP y art. 26.1 del Acuerdo."],
        [S2, "dificil", "Para que la evaluación del desempeño pudiera condicionar la carrera horizontal de Pedro, sería necesario:", ["Que el Ayuntamiento aprobara previamente un sistema objetivo de evaluación", "Que lo pidiera su jefe", "Nada más"], "Art. 20.5 TREBEP."],
        [S2, "media", "Cuando se regule por ley la carrera horizontal, el art. 17.b) TREBEP prevé valorar, entre otros:", ["El resultado de la evaluación del desempeño y la calidad de los trabajos", "Solo la antigüedad", "La afiliación política"], "Art. 17.b) TREBEP."],
        [S3, "media", "Los efectos económicos del nuevo nivel se producen:", ["Desde la fecha del reconocimiento, retrotrayéndose a la fecha en que cumplió los requisitos", "Desde el año siguiente", "Nunca"], "Art. 26.A.g) del Acuerdo."],
        [S3, "media", "El nivel máximo de carrera del grupo C1 según el Acuerdo es:", ["22", "26", "30"], "Art. 26.A.c) del Acuerdo."],
      ],
    },
    {
      slug: "adm-ayto-evaluacion-productividad-objetivos",
      titulo: "Un programa de productividad por objetivos",
      supuesto: "El Ayuntamiento estudia un programa para reducir el retraso en la tramitación de licencias que incluiría un complemento de productividad para el personal que alcance objetivos medibles (expedientes resueltos en plazo). Los sindicatos piden que se respete el art. 20 TREBEP y el Acuerdo.",
      preguntas: [
        [S3, "media", "Según el Acuerdo, la productividad debe estar basada en:", ["La consecución de objetivos asignados al puesto, en un programa municipal identificado", "La antigüedad de cada empleado", "La opinión de los vecinos"], "Art. 31.4 y 6 del Acuerdo."],
        [S3, "media", "La percepción de la productividad requiere:", ["Justificación temporal y periódica del cumplimiento de objetivos", "Solo solicitarla", "Un sorteo"], "Art. 31.6 del Acuerdo."],
        [S3, "dificil", "Las cuantías percibidas por productividad en un periodo:", ["No originan derechos para periodos posteriores", "Se consolidan para siempre", "Se suman al sueldo base"], "Art. 31.5 del Acuerdo."],
        [S2, "media", "En el TREBEP, la retribución por rendimiento o resultados es la del:", ["Art. 24.c)", "Art. 48", "Art. 95"], "Art. 24.c) TREBEP."],
        [S2, "media", "Para vincular esa retribución a la evaluación del desempeño hace falta:", ["Aprobar antes un sistema objetivo de evaluación", "Nada", "Una ley orgánica"], "Art. 20.5 TREBEP."],
        [S1, "media", "Medir los expedientes resueltos en plazo es valorar:", ["El rendimiento o logro de resultados", "La conducta en la vida privada", "La afiliación sindical"], "Art. 20.1 TREBEP."],
        [S1, "media", "El sistema que se diseñe debe ser, entre otras cosas:", ["Transparente e imparcial", "Secreto", "Arbitrario"], "Art. 20.2 TREBEP."],
        [S3, "media", "Con carácter general, la productividad es compatible con otros complementos que remuneren la especial dedicación:", ["No, es incompatible con carácter general", "Sí, siempre", "Solo con autorización del Pleno"], "Art. 31.7 del Acuerdo."],
        [S3, "media", "El complemento de productividad tiene carácter:", ["Personal", "Del puesto", "Colectivo e igual para todos"], "Art. 31.1 del Acuerdo."],
        [S3, "media", "La Ley aragonesa 5/2017 añade que la gestión del rendimiento debe incluir criterios sobre:", ["La observancia del código de conducta", "La edad", "El domicilio"], "Art. 44.5 Ley 5/2017."],
      ],
    },
  ],
});
