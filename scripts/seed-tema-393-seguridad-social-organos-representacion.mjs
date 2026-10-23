/**
 * Crea tema-393 — Tema 21 de Administrativo DGA (tema 16 del programa de
 * materias específicas): "El personal de la Administración de la
 * Comunidad Autónoma de Aragón (VI). El régimen de Seguridad Social del
 * personal de las Administraciones Públicas. Los órganos de representación
 * y participación."
 *
 * Fuentes (textos consolidados leídos en esta sesión en la API del BOE):
 * - RDLeg 8/2015, texto refundido de la Ley General de la Seguridad Social
 *   (BOE-A-2015-11724): arts. 7, 10, 15, 16, 136.2.k)-n), 138-140, 142, 144
 *   y disposición adicional tercera.
 * - RDLeg 4/2000, texto refundido de la Ley sobre Seguridad Social de los
 *   Funcionarios Civiles del Estado (BOE-A-2000-12140): arts. 1-4.
 * - RDLeg 5/2015, EBEP (BOE-A-2015-11719): arts. 31 y 39-46.
 * - RDLeg 2/2015, Estatuto de los Trabajadores (BOE-A-2015-11430): arts.
 *   61-63 y 66-68.
 * - LO 11/1985, de Libertad Sindical (BOE-A-1985-16660): arts. 6, 7, 8 y 10.
 * - Ley 31/1995, de Prevención de Riesgos Laborales (BOE-A-1995-24292):
 *   arts. 35, 38 y 39.
 * La negociación colectiva (Mesas, pactos y acuerdos, convenios) es el
 * Tema 22, que reutiliza el tema-32; aquí no se repite.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-393-seguridad-social-organos-representacion.mjs
 */
import { sembrarTema, ADMIN_DGA } from "./lib/sembrar-tema.mjs";

const LGSS = "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11724";
const MUF = "https://www.boe.es/buscar/act.php?id=BOE-A-2000-12140";
const EBEP = "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11719";
const ET = "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430";
const LOLS = "https://www.boe.es/buscar/act.php?id=BOE-A-1985-16660";
const LPRL = "https://www.boe.es/buscar/act.php?id=BOE-A-1995-24292";
const S1 = "sistema-seguridad-social";
const S2 = "seguridad-social-empleados-publicos";
const S3 = "afiliacion-alta-cotizacion";
const S4 = "juntas-delegados-personal";
const S5 = "representacion-personal-laboral";
const S6 = "representacion-sindical-prevencion";

await sembrarTema({
  tema: {
    slug: "tema-393",
    titulo: "El personal de la Administración de Aragón (VI): régimen de Seguridad Social del personal de las Administraciones y órganos de representación y participación",
    descripcion: "El sistema de la Seguridad Social: campo de aplicación, Régimen General y regímenes especiales. Encuadramiento del personal de las Administraciones: laborales y funcionarios autonómicos en el Régimen General; el régimen especial de los funcionarios civiles del Estado (Clases Pasivas y mutualismo administrativo, MUFACE) y la inclusión en el Régimen General de los funcionarios de nuevo ingreso desde 2011; funcionarios transferidos. Afiliación, altas, bajas y cotización. Órganos de representación: derecho de representación y participación institucional; Delegados y Juntas de Personal de los funcionarios (EBEP); delegados de personal y comités de empresa del personal laboral (ET); secciones y delegados sindicales; Delegados de Prevención y Comité de Seguridad y Salud.",
    contenido: "En qué régimen de Seguridad Social está un trabajador del Gobierno de Aragón (y por qué un funcionario estatal transferido puede seguir en MUFACE) y quién representa a los empleados ante la Administración: cuántos delegados o miembros de Junta de Personal o comité de empresa corresponden según la plantilla, qué funciones y garantías tienen, cuántas horas sindicales, y qué papel tienen los delegados sindicales y de prevención.",
    enlaces_boe: [
      { url: LGSS, titulo: "Real Decreto Legislativo 8/2015, texto refundido de la Ley General de la Seguridad Social (BOE-A-2015-11724)" },
      { url: MUF, titulo: "Real Decreto Legislativo 4/2000, texto refundido de la Ley sobre Seguridad Social de los Funcionarios Civiles del Estado (BOE-A-2000-12140)" },
      { url: EBEP, titulo: "Real Decreto Legislativo 5/2015, texto refundido del Estatuto Básico del Empleado Público (BOE-A-2015-11719)" },
      { url: ET, titulo: "Real Decreto Legislativo 2/2015, texto refundido del Estatuto de los Trabajadores (BOE-A-2015-11430)" },
      { url: LOLS, titulo: "Ley Orgánica 11/1985, de Libertad Sindical (BOE-A-1985-16660)" },
      { url: LPRL, titulo: "Ley 31/1995, de Prevención de Riesgos Laborales (BOE-A-1995-24292)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "El sistema de la Seguridad Social: Régimen General y regímenes especiales", articulos: "arts. 7, 10 y 136.1 LGSS", url: `${LGSS}#a7` },
      { seccion: S2, titulo: "Seguridad Social del personal de las Administraciones Públicas", articulos: "art. 136.2.k)-n) y DA 3.ª LGSS; arts. 1-4 RDLeg 4/2000", url: `${LGSS}#a136` },
      { seccion: S3, titulo: "Afiliación, altas, bajas y cotización", articulos: "arts. 15-16, 138-140, 142 y 144 LGSS", url: `${LGSS}#a15` },
      { seccion: S4, titulo: "Representación de los funcionarios: Delegados y Juntas de Personal", articulos: "arts. 31 y 39-46 EBEP", url: `${EBEP}#a39` },
      { seccion: S5, titulo: "Representación del personal laboral: delegados de personal y comités de empresa", articulos: "arts. 61-63 y 66-68 ET", url: `${ET}#a62` },
      { seccion: S6, titulo: "Representación sindical y participación en prevención", articulos: "arts. 6-8 y 10 LOLS; arts. 35, 38 y 39 LPRL", url: `${LOLS}#asexto` },
    ],
  },
  vinculo: { oposicion: ADMIN_DGA.oposicion, bloqueId: ADMIN_DGA.bloquePersonal, numero: 21 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Campo de aplicación contributivo (art. 7.1 LGSS)", "Españoles residentes y extranjeros que residan o se encuentren legalmente en España que ejerzan actividad en territorio nacional como trabajadores por cuenta ajena, autónomos, socios de cooperativas, estudiantes o funcionarios públicos civiles y militares"],
        ["Prestaciones no contributivas (art. 7.2 LGSS)", "Comprenden a todos los españoles residentes y a los extranjeros con residencia legal en España"],
        ["Régimen General (art. 136.1 LGSS)", "Incluye obligatoriamente a los trabajadores por cuenta ajena y asimilados, salvo que por su actividad deban estar en un régimen especial"],
        ["Regímenes especiales (art. 10.2 LGSS)", "Autónomos, trabajadores del mar, funcionarios públicos civiles y militares, estudiantes y los demás que determine el Ministerio"],
        ["Regímenes con ley específica (art. 10.3 LGSS)", "Los de trabajadores del mar y funcionarios públicos se rigen por sus leyes propias, tendiendo a la homogeneidad con el Régimen General"],
        ["Tendencia a la unidad (art. 10.5 LGSS)", "El Gobierno puede integrar regímenes especiales en el Régimen General, salvo los regidos por leyes específicas"],
      ],
      preguntas: [
        ["media", "¿Cuál de estos colectivos constituye un régimen especial de la Seguridad Social según la LGSS?", ["Los funcionarios públicos, civiles y militares", "El personal laboral de las Administraciones", "Los empleados de hogar", "Los trabajadores agrarios por cuenta ajena"], "Art. 10.2.c) LGSS; empleados de hogar y agrarios son sistemas especiales dentro del Régimen General (art. 136.2.a)."],
        ["media", "El Régimen General de la Seguridad Social incluye obligatoriamente a:", ["Los trabajadores por cuenta ajena y asimilados", "Solo a los funcionarios", "Solo a los autónomos", "Solo a los estudiantes"], "Art. 136.1 LGSS."],
        ["dificil", "Los regímenes especiales de trabajadores del mar y funcionarios públicos:", ["Se rigen por leyes específicas", "Se regulan por orden ministerial", "No existen", "Están integrados en el de autónomos"], "Art. 10.3 LGSS."],
        ["media", "A efectos de prestaciones no contributivas, están comprendidos en el sistema:", ["Todos los españoles residentes en territorio español", "Solo quienes hayan cotizado", "Solo los funcionarios", "Solo los mayores de 65 años"], "Art. 7.2 LGSS."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Personal laboral de las Administraciones (art. 136.2.k LGSS)", "Personal civil no funcionario: incluido en el Régimen General salvo que una ley especial lo incluya en otro régimen"],
        ["Funcionarios en el Régimen General (art. 136.2.l LGSS)", "Personal funcionario de las Administraciones, incluido el periodo de prácticas, salvo que esté en Clases Pasivas u otro régimen por ley especial"],
        ["Funcionarios de la Comunidad Autónoma", "Los funcionarios de nuevo ingreso y en prácticas de las Comunidades Autónomas están excluidos del régimen especial de los funcionarios civiles del Estado (art. 3.2.f RDLeg 4/2000) y cotizan al Régimen General"],
        ["Funcionarios transferidos (art. 136.2.n LGSS)", "Los funcionarios del Estado transferidos que ingresen voluntariamente en cuerpos o escalas propios de la Comunidad Autónoma pasan al Régimen General"],
        ["Régimen especial de funcionarios civiles del Estado (art. 2 RDLeg 4/2000)", "Dos mecanismos de cobertura: Clases Pasivas del Estado (pensiones) y mutualismo administrativo, gestionado por MUFACE"],
        ["MUFACE (art. 4 RDLeg 4/2000)", "Mutualidad General de Funcionarios Civiles del Estado: gestiona de forma unitaria el mutualismo administrativo, también para los funcionarios estatales transferidos y adscritos a las Comunidades Autónomas"],
        ["Nuevo ingreso desde 2011 (DA 3.ª LGSS)", "El personal de Clases Pasivas que accede desde el 1 de enero de 2011 queda incluido en el Régimen General a efectos de pensiones (RDL 13/2010), manteniendo el mutualismo"],
        ["Excluidos de MUFACE (art. 3.2 RDLeg 4/2000)", "Funcionarios locales, de organismos autónomos, militares, de Justicia, de la Seguridad Social, de nuevo ingreso de las CCAA, transferidos integrados en cuerpos autonómicos y PAS de universidades"],
      ],
      preguntas: [
        ["media", "Un funcionario de nuevo ingreso del Cuerpo Ejecutivo de la Comunidad Autónoma de Aragón queda encuadrado en:", ["El Régimen General de la Seguridad Social", "MUFACE", "Clases Pasivas del Estado", "El régimen de autónomos"], "Art. 136.2.l) LGSS y art. 3.2.f) RDLeg 4/2000."],
        ["media", "El mutualismo administrativo de los funcionarios civiles del Estado lo gestiona:", ["MUFACE", "El INSS", "ISFAS", "MUGEJU"], "Art. 4.1 RDLeg 4/2000."],
        ["media", "Los mecanismos de cobertura del régimen especial de funcionarios civiles del Estado son:", ["Clases Pasivas y mutualismo administrativo", "Solo MUFACE", "Régimen General y autónomos", "Mutuas colaboradoras"], "Art. 2.1 RDLeg 4/2000."],
        ["dificil", "Desde el 1 de enero de 2011, los nuevos funcionarios civiles del Estado:", ["Quedan integrados en el Régimen General a efectos de pensiones", "Siguen en Clases Pasivas", "Cotizan como autónomos", "No tienen cobertura de pensiones"], "Art. 2.2 RDLeg 4/2000 y DA 3.ª LGSS."],
        ["dificil", "Un funcionario del Estado transferido a Aragón que ingresa voluntariamente en un cuerpo propio de la Comunidad:", ["Queda incluido en el Régimen General y excluido de MUFACE", "Sigue obligatoriamente en MUFACE", "Pasa a ISFAS", "Pierde la condición de funcionario"], "Art. 136.2.n) LGSS y art. 3.2.g) RDLeg 4/2000."],
        ["media", "El personal laboral de la Administración aragonesa cotiza, con carácter general, al:", ["Régimen General de la Seguridad Social", "Régimen especial de funcionarios", "Régimen de autónomos", "Régimen del mar"], "Art. 136.2.k) LGSS."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Afiliación (art. 15 LGSS)", "Obligatoria para las personas del art. 7.1 y única para toda su vida y para todo el sistema, sin perjuicio de las altas y bajas en los distintos regímenes"],
        ["Afiliación de oficio (art. 16.4 LGSS)", "La Administración de la Seguridad Social puede practicar de oficio afiliación, altas y bajas cuando compruebe su incumplimiento"],
        ["Inscripción del empresario (art. 138 LGSS)", "Requisito previo al inicio de la actividad; se considera empresario a toda persona o entidad, pública o privada, por cuya cuenta trabajen personas incluidas en el Régimen General"],
        ["Obligación de afiliar y dar de alta (art. 139 LGSS)", "El empresario solicita la afiliación y comunica altas y bajas; si no lo hace, el trabajador puede instarlas directamente"],
        ["Altas fuera de plazo (art. 140.2 LGSS)", "La afiliación y altas solicitadas fuera de plazo no tienen efecto retroactivo"],
        ["Sujeto responsable de cotizar (art. 142 LGSS)", "El empresario ingresa sus aportaciones y las de sus trabajadores; descuenta la del trabajador al pagar la nómina; si no lo hace entonces, no puede después"],
        ["Duración de la obligación de cotizar (art. 144 LGSS)", "Nace con el inicio del trabajo, incluido el periodo de prueba; continúa en incapacidad temporal, nacimiento y riesgo durante el embarazo o la lactancia; se suspende en huelga y cierre patronal"],
      ],
      preguntas: [
        ["media", "La afiliación a la Seguridad Social es:", ["Obligatoria y única para toda la vida y para todo el sistema", "Voluntaria", "Distinta en cada empleo", "Renovable cada año"], "Art. 15 LGSS."],
        ["media", "La obligación de cotizar nace:", ["Con el inicio de la prestación del trabajo, incluido el periodo de prueba", "Al superar el periodo de prueba", "Al mes de empezar", "Con la primera nómina"], "Art. 144.1 LGSS."],
        ["media", "Si el empresario no descuenta la cuota obrera al pagar la nómina:", ["No puede descontarla después y la ingresa a su cargo", "Puede descontarla en cualquier momento posterior", "La paga la Tesorería", "La paga el trabajador directamente"], "Art. 142.2 LGSS."],
        ["media", "Durante una huelga, la obligación de cotizar:", ["Se suspende", "Se duplica", "Continúa íntegra", "Se extingue definitivamente"], "Art. 144.5 LGSS."],
        ["dificil", "Las altas solicitadas fuera de plazo por el empresario:", ["No tienen efecto retroactivo", "Retrotraen sus efectos al inicio del trabajo", "Son nulas", "Requieren autorización judicial"], "Art. 140.2 LGSS."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Derechos colectivos (art. 31.1 EBEP)", "Negociación colectiva, representación y participación institucional para determinar las condiciones de trabajo"],
        ["Representación y participación institucional (art. 31.3-4 EBEP)", "Representación: elegir representantes y constituir órganos unitarios; participación institucional: participar, a través de los sindicatos, en órganos de control y seguimiento de entidades"],
        ["Órganos de representación de los funcionarios (art. 39.1 EBEP)", "Los Delegados de Personal y las Juntas de Personal"],
        ["Delegados de Personal (art. 39.2 EBEP)", "En unidades electorales de 6 a 49 funcionarios: hasta 30, un Delegado; de 31 a 49, tres, que actúan conjunta y mancomunadamente"],
        ["Juntas de Personal (art. 39.3 y 5 EBEP)", "Desde 50 funcionarios; 5 miembros de 50 a 100, 9 de 101 a 250, 13 de 251 a 500, 17 de 501 a 750, 21 de 751 a 1.000 y, de ahí, dos por cada 1.000 o fracción hasta 75"],
        ["Funciones (art. 40 EBEP)", "Recibir información de la política de personal, informar sobre traslados y organización, conocer las sanciones por faltas muy graves, ser oídos en jornada, horario, vacaciones y permisos, y vigilar el cumplimiento de normas laborales y de prevención"],
        ["Garantías (art. 41 EBEP)", "Libre circulación, distribución de publicaciones, audiencia en sus expedientes disciplinarios durante el mandato y el año siguiente, crédito horario (15 a 40 horas) y no ser trasladados ni sancionados por su mandato"],
        ["Mandato y elecciones (arts. 42-44 EBEP)", "Cuatro años, reelegibles y prorrogado si no hay nuevas elecciones; sufragio personal, directo, libre y secreto; Juntas por listas cerradas proporcionales y Delegados por listas abiertas mayoritarias"],
        ["Derecho de reunión (art. 46 EBEP)", "Pueden convocar sindicatos, Delegados y Juntas de Personal, Comités de Empresa o al menos el 40 % del colectivo; fuera de horas de trabajo salvo acuerdo"],
      ],
      preguntas: [
        ["media", "Los órganos específicos de representación de los funcionarios son:", ["Los Delegados de Personal y las Juntas de Personal", "Los comités de empresa", "Las Mesas de Negociación", "Las secciones sindicales"], "Art. 39.1 EBEP."],
        ["media", "Las Juntas de Personal se constituyen en unidades electorales con un censo mínimo de:", ["50 funcionarios", "6 funcionarios", "100 funcionarios", "250 funcionarios"], "Art. 39.3 EBEP."],
        ["media", "En una unidad electoral de 40 funcionarios se eligen:", ["Tres Delegados de Personal", "Un Delegado de Personal", "Una Junta de Personal de 5 miembros", "Dos Delegados de Personal"], "Art. 39.2 EBEP."],
        ["dificil", "Una Junta de Personal de una unidad electoral de 300 funcionarios tendrá:", ["13 miembros", "9 miembros", "17 miembros", "5 miembros"], "Art. 39.5 EBEP."],
        ["media", "El mandato de los miembros de las Juntas de Personal dura:", ["Cuatro años, con posibilidad de reelección", "Dos años", "Cinco años sin reelección", "Hasta la jubilación"], "Art. 42 EBEP."],
        ["dificil", "Un representante de los funcionarios en una unidad de 200 funcionarios dispone de un crédito mensual de:", ["20 horas", "15 horas", "30 horas", "40 horas"], "Art. 41.1.d) EBEP."],
        ["media", "Los Delegados de Personal se eligen mediante:", ["Listas abiertas y sistema mayoritario", "Listas cerradas proporcionales", "Designación sindical", "Sorteo"], "Art. 44.d) EBEP."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["Participación en la empresa (art. 61 ET)", "Los trabajadores participan a través de los órganos de representación del título II del ET"],
        ["Delegados de personal (art. 62 ET)", "En centros de más de 10 y menos de 50 trabajadores (de 6 a 10 si lo deciden por mayoría): uno hasta 30, tres de 31 a 49; actúan mancomunadamente"],
        ["Comité de empresa (art. 63 ET)", "Órgano representativo y colegiado en centros de 50 o más trabajadores; comité conjunto si varios centros de la misma provincia suman 50; intercentros solo por convenio, máximo 13 miembros"],
        ["Composición del comité (art. 66 ET)", "Misma escala que las Juntas de Personal: 5, 9, 13, 17, 21 y dos por cada mil hasta 75; se reúne cada dos meses o a petición de un tercio"],
        ["Mandato y revocación (art. 67.3 ET)", "Cuatro años, en funciones hasta nuevas elecciones; revocables por asamblea a instancia de un tercio de los electores y por mayoría absoluta, no durante la tramitación de un convenio"],
        ["Garantías (art. 68 ET)", "Expediente contradictorio por faltas graves o muy graves, prioridad de permanencia, no ser despedido ni sancionado por su acción representativa durante el mandato y el año siguiente, libertad de expresión y crédito horario de 15 a 40 horas"],
        ["Comités de empresa en la Administración (art. 46.1.c EBEP)", "El personal laboral de las Administraciones se representa mediante delegados de personal y comités de empresa, que pueden también convocar reuniones"],
      ],
      preguntas: [
        ["media", "El comité de empresa se constituye en los centros de trabajo con un censo de:", ["50 o más trabajadores", "10 o más trabajadores", "250 o más trabajadores", "6 o más trabajadores"], "Art. 63.1 ET."],
        ["media", "En un centro de 25 trabajadores, la representación corresponde a:", ["Un delegado de personal", "Tres delegados de personal", "Un comité de empresa de 5 miembros", "Un delegado sindical"], "Art. 62.1 ET."],
        ["dificil", "El comité intercentros:", ["Solo puede crearse por convenio colectivo, con un máximo de 13 miembros", "Es obligatorio en toda empresa con varios centros", "Tiene 75 miembros como máximo", "Lo nombra el empresario"], "Art. 63.3 ET."],
        ["media", "Los miembros del comité de empresa tienen garantizado:", ["No ser despedidos ni sancionados por su acción representativa durante el mandato y el año siguiente", "La inamovilidad absoluta en todo caso", "Un salario superior", "La exención de la jornada completa"], "Art. 68.c) ET."],
        ["dificil", "La revocación de los miembros del comité de empresa durante su mandato exige:", ["Asamblea a instancia de al menos un tercio de los electores y mayoría absoluta", "Decisión del empresario", "Acuerdo del sindicato", "Resolución judicial"], "Art. 67.3 ET."],
        ["media", "El comité de empresa debe reunirse:", ["Cada dos meses o cuando lo solicite un tercio de sus miembros o de los representados", "Cada semana", "Una vez al año", "Solo cuando lo convoque el empresario"], "Art. 66.2 ET."],
      ],
    },
    {
      seccion: S6,
      flashcards: [
        ["Sindicatos más representativos estatales (art. 6.2 LOLS)", "Los que obtienen el 10 % o más del total de delegados de personal, miembros de comités de empresa y órganos correspondientes de las Administraciones, y sus afiliados"],
        ["Más representativos de Comunidad Autónoma (art. 7.1 LOLS)", "Al menos el 15 % de los representantes en la Comunidad, con un mínimo de 1.500, sin estar federados con organizaciones estatales"],
        ["Secciones sindicales (art. 8 LOLS)", "Los afiliados pueden constituirlas; las de sindicatos más representativos o con representación tienen tablón de anuncios, negociación colectiva y local adecuado en centros de más de 250 trabajadores"],
        ["Delegados sindicales (art. 10 LOLS)", "En centros de más de 250 trabajadores; uno de 250 a 750, dos de 751 a 2.000, tres de 2.001 a 5.000 y cuatro desde 5.001 (para sindicatos con el 10 % de votos); asisten con voz y sin voto"],
        ["Delegados de Prevención (art. 35 LPRL)", "Representantes con funciones específicas en prevención, designados por y entre los representantes del personal: 2 de 50 a 100 trabajadores, 3 de 101 a 500… hasta 8"],
        ["Comité de Seguridad y Salud (art. 38 LPRL)", "Órgano paritario y colegiado de consulta en prevención, en centros de 50 o más trabajadores; se reúne trimestralmente; delegados sindicales y técnicos participan con voz y sin voto"],
        ["Promoción de elecciones (art. 43 EBEP)", "Sindicatos más representativos estatales o autonómicos, los que tengan el 10 % de representantes en el conjunto de las Administraciones o en la unidad electoral, y los funcionarios por acuerdo mayoritario"],
      ],
      preguntas: [
        ["media", "Para ser sindicato más representativo a nivel estatal se requiere obtener al menos:", ["El 10 % del total de representantes", "El 15 % con 1.500 representantes", "El 5 %", "El 25 %"], "Art. 6.2.a) LOLS."],
        ["dificil", "Un sindicato es más representativo a nivel de Comunidad Autónoma si obtiene en ella al menos:", ["El 15 % de los representantes, con un mínimo de 1.500, sin federarse con organizaciones estatales", "El 10 % de los representantes", "El 20 % sin mínimo", "500 representantes"], "Art. 7.1 LOLS."],
        ["media", "Los delegados sindicales se eligen en centros de trabajo de:", ["Más de 250 trabajadores", "Más de 50 trabajadores", "Más de 10 trabajadores", "Cualquier tamaño"], "Art. 10.1 LOLS."],
        ["media", "El Comité de Seguridad y Salud se constituye en centros de:", ["50 o más trabajadores", "250 o más", "10 o más", "Cualquier tamaño"], "Art. 38.2 LPRL."],
        ["media", "El Comité de Seguridad y Salud se reúne con carácter ordinario:", ["Trimestralmente", "Mensualmente", "Anualmente", "Cada dos meses"], "Art. 38.3 LPRL."],
        ["dificil", "En un centro con 80 trabajadores, el número de Delegados de Prevención es:", ["2", "3", "1", "4"], "Art. 35.2 LPRL."],
      ],
    },
  ],
  glosario: [
    [S1, "Régimen General", "Régimen de la Seguridad Social en el que se integran los trabajadores por cuenta ajena y asimilados."],
    [S1, "Régimen especial", "Régimen propio de colectivos con peculiaridades, como autónomos, trabajadores del mar o funcionarios."],
    [S2, "Clases Pasivas", "Sistema estatal de pensiones de los funcionarios civiles y militares del Estado ingresados antes de 2011."],
    [S2, "Mutualismo administrativo", "Mecanismo de cobertura de los funcionarios del Estado (asistencia sanitaria, incapacidad, etc.) gestionado por mutualidades como MUFACE."],
    [S2, "Funcionario transferido", "Funcionario del Estado traspasado a una Comunidad Autónoma al asumir esta las competencias en que trabajaba."],
    [S3, "Alta", "Comunicación a la Seguridad Social del inicio de la actividad de un trabajador ya afiliado."],
    [S3, "Cuota obrera", "Parte de la cotización a cargo del trabajador, que el empresario descuenta de la nómina."],
    [S4, "Unidad electoral", "Ámbito en el que se eligen los representantes de los funcionarios (Delegados o Junta de Personal)."],
    [S4, "Crédito horario", "Horas mensuales retribuidas de que disponen los representantes para su función."],
    [S5, "Comité de empresa", "Órgano colegiado que representa al personal laboral de un centro de 50 o más trabajadores."],
    [S6, "Sección sindical", "Agrupación de los afiliados a un sindicato en una empresa o centro de trabajo."],
    [S6, "Delegado de Prevención", "Representante de los trabajadores con funciones específicas en prevención de riesgos laborales."],
  ],
  casos: [
    {
      slug: "nuevos-funcionarios-seguridad-social",
      titulo: "Encuadramiento en la Seguridad Social de un servicio",
      supuesto: "En un servicio provincial del Gobierno de Aragón trabajan: Ana, administrativa que acaba de tomar posesión tras aprobar la oposición de 2026; Luis, funcionario del Estado transferido en los años ochenta, que nunca ha participado en procesos de integración en cuerpos autonómicos; Marta, que fue transferida pero ingresó después por oposición en un cuerpo propio de la Comunidad; y Pedro, conductor laboral fijo.",
      preguntas: [
        [S2, "media", "Ana queda incluida en:", ["El Régimen General de la Seguridad Social", "MUFACE", "Clases Pasivas", "El régimen de autónomos"], "Art. 136.2.l) LGSS y art. 3.2.f) RDLeg 4/2000."],
        [S2, "media", "Durante su periodo de prácticas, Ana estaba:", ["Incluida igualmente en el Régimen General", "Sin cobertura", "En MUFACE", "En el régimen de estudiantes"], "Art. 136.2.l) LGSS."],
        [S2, "dificil", "Luis, funcionario estatal transferido no integrado en cuerpos propios, sigue en principio en:", ["El régimen especial de funcionarios civiles del Estado (Clases Pasivas y MUFACE)", "El Régimen General", "El régimen de autónomos", "Ningún régimen"], "Arts. 3.1 y 4.2 RDLeg 4/2000."],
        [S2, "media", "La gestión de la cobertura de Luis la realiza:", ["MUFACE, de forma unitaria", "La Comunidad Autónoma en exclusiva", "Una mutua privada", "El INEM"], "Art. 4 RDLeg 4/2000."],
        [S2, "dificil", "Marta, al ingresar voluntariamente en un cuerpo propio de la Comunidad:", ["Pasa al Régimen General", "Sigue en MUFACE en todo caso", "Pasa a Clases Pasivas", "Puede elegir cada año"], "Art. 136.2.n) LGSS y art. 3.2.g) RDLeg 4/2000."],
        [S2, "media", "Pedro, conductor laboral fijo, está en:", ["El Régimen General", "MUFACE", "Clases Pasivas", "El régimen de funcionarios"], "Art. 136.2.k) LGSS."],
        [S3, "media", "Respecto de Pedro, la obligación de cotizar nació:", ["Con el inicio del trabajo, incluido el periodo de prueba", "Al terminar el periodo de prueba", "Al primer año", "Al firmar el convenio"], "Art. 144.1 LGSS."],
        [S3, "media", "Quien debe ingresar las cuotas de Pedro (las suyas y las de la Administración) es:", ["La Administración empleadora, como sujeto responsable", "Pedro directamente", "El comité de empresa", "La Tesorería sin intervención del empleador"], "Art. 142.1 LGSS."],
        [S3, "media", "Si Pedro está de baja por incapacidad temporal, la obligación de cotizar:", ["Continúa", "Se suspende", "Se extingue", "Pasa a cargo del sindicato"], "Art. 144.4 LGSS."],
        [S3, "media", "La afiliación de cada uno de ellos a la Seguridad Social es:", ["Única para toda la vida y para todo el sistema", "Nueva en cada destino", "Anual", "Voluntaria"], "Art. 15 LGSS."],
      ],
    },
    {
      slug: "elecciones-junta-personal",
      titulo: "Elecciones en una unidad electoral",
      supuesto: "En una unidad electoral de la Administración aragonesa hay 420 funcionarios. En el mismo ámbito trabajan 120 trabajadores laborales en un centro y 35 en otro centro de otra provincia. Se convocan elecciones sindicales.",
      preguntas: [
        [S4, "media", "Los 420 funcionarios elegirán:", ["Una Junta de Personal", "Tres Delegados de Personal", "Un comité de empresa", "Delegados sindicales"], "Art. 39.3 EBEP."],
        [S4, "dificil", "Esa Junta de Personal tendrá:", ["13 miembros", "9 miembros", "17 miembros", "21 miembros"], "Art. 39.5 EBEP."],
        [S4, "media", "La Junta elegirá entre sus miembros:", ["Un Presidente y un Secretario", "Un alcalde", "Un gerente", "Un interventor"], "Art. 39.6 EBEP."],
        [S4, "media", "La elección de la Junta se hará mediante:", ["Listas cerradas y sistema proporcional corregido", "Listas abiertas mayoritarias", "Designación del consejero", "Votación a mano alzada"], "Art. 44.d) EBEP."],
        [S4, "media", "Podrán presentar candidaturas sindicatos, coaliciones y grupos de electores que reúnan al menos:", ["El triple de los miembros a elegir", "El doble", "El 50 % del censo", "Diez firmas"], "Art. 44.c) EBEP."],
        [S5, "media", "Los 120 trabajadores laborales del primer centro eligen:", ["Un comité de empresa de 9 miembros", "Tres delegados de personal", "Una Junta de Personal", "Un comité de 5 miembros"], "Arts. 63.1 y 66.1.b) ET."],
        [S5, "media", "Los 35 trabajadores del otro centro, en otra provincia, eligen:", ["Tres delegados de personal", "Un comité de empresa", "Un delegado de personal", "Ningún representante"], "Art. 62.1 ET."],
        [S4, "dificil", "Cada miembro de la Junta de Personal dispondrá de un crédito mensual de:", ["30 horas", "20 horas", "15 horas", "40 horas"], "Art. 41.1.d) EBEP."],
        [S4, "media", "No serán electores ni elegibles los funcionarios:", ["Nombrados por decreto del Consejo de Gobierno", "En servicio activo", "Interinos", "De nuevo ingreso"], "Art. 44.b) EBEP."],
        [S4, "media", "Las impugnaciones del proceso electoral se tramitan, con carácter general, mediante:", ["Un procedimiento arbitral", "Recurso de alzada", "Recurso de casación", "Queja al Justicia de Aragón"], "Art. 44.f) EBEP."],
      ],
    },
    {
      slug: "representantes-garantias-prevencion",
      titulo: "Un representante y la prevención de riesgos",
      supuesto: "Rosa, miembro de la Junta de Personal de una unidad de 600 funcionarios, es designada además Delegada de Prevención. La Administración le abre un expediente disciplinario y, por otro lado, pretende trasladarla de unidad por las críticas que ha publicado sobre los horarios.",
      preguntas: [
        [S4, "media", "En el expediente disciplinario de Rosa debe darse:", ["Audiencia a la Junta de Personal, además de a la interesada", "Solo audiencia a Rosa", "Audiencia al comité de empresa", "Nada especial"], "Art. 41.1.c) EBEP."],
        [S4, "media", "El traslado de Rosa por sus críticas como representante:", ["Está prohibido durante el mandato y el año siguiente", "Es libre", "Solo requiere informe sindical", "Es obligatorio"], "Art. 41.1.e) EBEP."],
        [S4, "media", "Rosa tiene derecho a distribuir publicaciones sobre cuestiones profesionales y sindicales:", ["Libremente", "Solo con autorización previa", "Nunca", "Solo fuera del centro"], "Art. 41.1.b) EBEP."],
        [S4, "dificil", "Su crédito horario mensual, con 600 funcionarios en la unidad, es de:", ["35 horas", "30 horas", "40 horas", "20 horas"], "Art. 41.1.d) EBEP."],
        [S4, "media", "La Junta debe ser oída en el establecimiento de:", ["La jornada, el horario, las vacaciones y los permisos", "Las retribuciones de los altos cargos", "Los presupuestos", "Los nombramientos de libre designación"], "Art. 40.1.d) EBEP."],
        [S4, "media", "Respecto de los asuntos que la Administración declare reservados, Rosa debe:", ["Guardar sigilo profesional, incluso tras su mandato", "Publicarlos", "Comunicarlos a la prensa", "Ignorar la reserva"], "Art. 41.3 EBEP."],
        [S6, "media", "Como Delegada de Prevención, Rosa ha sido designada:", ["Por y entre los representantes del personal", "Por el consejero", "Por sorteo", "Por el servicio de prevención"], "Art. 35.2 LPRL."],
        [S6, "media", "Con 600 empleados, el número de Delegados de Prevención por escala legal sería:", ["4", "3", "5", "2"], "Art. 35.2 LPRL."],
        [S6, "media", "Rosa formará parte del Comité de Seguridad y Salud, que es un órgano:", ["Paritario y colegiado de consulta en prevención", "Unipersonal", "Sancionador", "Judicial"], "Art. 38.1 LPRL."],
        [S6, "media", "En ese comité, los delegados sindicales participan:", ["Con voz pero sin voto", "Con voz y voto", "No pueden asistir", "Solo como secretarios"], "Art. 38.2 LPRL."],
      ],
    },
  ],
});
