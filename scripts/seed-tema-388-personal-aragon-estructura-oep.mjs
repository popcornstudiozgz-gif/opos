/**
 * Crea tema-388 — Tema 16 de Administrativo DGA (tema 11 del programa de
 * materias específicas): "El personal de la Administración de la
 * Comunidad Autónoma de Aragón (I). Estructura y organización de la
 * Función Pública. Registro de Personal. Programación y oferta de empleo
 * público."
 *
 * Fuentes (textos consolidados leídos en esta sesión en la API del BOE):
 * - Decreto Legislativo 1/1991, texto refundido de la Ley de Ordenación de
 *   la Función Pública de la Comunidad Autónoma de Aragón (BOA-d-1991-90001,
 *   leído íntegro): arts. 1-18, 23-24 y disposiciones adicionales sexta y
 *   novena. Es la ley que las bases de la convocatoria de 2025 declaran
 *   aplicable (base 12.3). Hecho señalado: conserva la denominación de los
 *   antiguos Grupos A-E de la Ley 30/1984 y la del «Consejero de Presidencia
 *   y Relaciones Institucionales»; hoy esas funciones las ejerce el
 *   departamento competente en función pública (Hacienda, Interior y
 *   Administración Pública, según la propia convocatoria).
 * - Texto refundido del Estatuto Básico del Empleado Público, RDLeg 5/2015
 *   (BOE-A-2015-11719): arts. 8-13, 59, 69-76 y disposición transitoria
 *   tercera (equivalencia de grupos). Por ser legislación básica, prevalece
 *   sobre las reglas aragonesas anteriores incompatibles (por ejemplo, la
 *   reserva por discapacidad del 7 % del art. 59 frente al 3 % de la
 *   disposición adicional sexta del DLeg 1/1991).
 * - Decreto 11/2026, OEP de 2026 de la Administración General de Aragón
 *   (BOA núm. 22, de 03-02-2026), leído en la sesión: 839 plazas de turno
 *   libre (de ellas 67 para personas con discapacidad) y 479 de promoción
 *   interna, como ejemplo real de oferta.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-388-personal-aragon-estructura-oep.mjs
 */
import { sembrarTema, ADMIN_DGA } from "./lib/sembrar-tema.mjs";

const LOFPA = "https://www.boe.es/buscar/act.php?id=BOA-d-1991-90001";
const EBEP = "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11719";
const OEP26 = "https://www.boa.aragon.es/cgi-bin/EBOA/BRSCGI?CMD=VEROBJ&MLKOB=1433527770303";
const S1 = "clases-personal-funcion-publica-aragon";
const S2 = "organos-superiores-personal";
const S3 = "cuerpos-escalas-grupos";
const S4 = "relaciones-puestos-trabajo";
const S5 = "registro-personal";
const S6 = "planificacion-oferta-empleo-publico";

await sembrarTema({
  tema: {
    slug: "tema-388",
    titulo: "El personal de la Administración de Aragón (I): estructura y organización de la Función Pública, Registro de Personal y oferta de empleo público",
    descripcion: "El texto refundido de la Ley de Ordenación de la Función Pública de Aragón (DLeg 1/1991) y su relación con el Estatuto Básico del Empleado Público. Clases de personal: funcionarios de carrera, interinos, personal laboral, eventual y directivo. Órganos superiores en materia de personal y Comisión Interdepartamental de la Función Pública. Cuerpos, escalas y clases de especialidad; grupos y subgrupos de clasificación. Relaciones de puestos de trabajo y plantillas presupuestarias. Registro General de Personal. Planificación de recursos humanos, planes de empleo y oferta de empleo público, con la reserva para personas con discapacidad.",
    contenido: "Cómo está organizada la plantilla del Gobierno de Aragón: qué tipos de empleados hay (funcionarios, interinos, laborales, eventuales), quién decide en materia de personal, cómo se agrupan los funcionarios en cuerpos y escalas como el Cuerpo Ejecutivo y su Escala General Administrativa, qué es la relación de puestos de trabajo, para qué sirve el Registro de Personal y cómo se aprueba cada año la oferta de empleo público que da lugar a las oposiciones.",
    enlaces_boe: [
      { url: LOFPA, titulo: "Decreto Legislativo 1/1991, texto refundido de la Ley de Ordenación de la Función Pública de Aragón (BOA-d-1991-90001)" },
      { url: EBEP, titulo: "Real Decreto Legislativo 5/2015, texto refundido del Estatuto Básico del Empleado Público (BOE-A-2015-11719)" },
      { url: OEP26, titulo: "Decreto 11/2026, Oferta de Empleo Público 2026 de la Administración General de Aragón (BOA núm. 22, 03-02-2026)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "Clases de personal", articulos: "arts. 4-9 DLeg 1/1991; arts. 8-13 EBEP", url: `${EBEP}#a8` },
      { seccion: S2, titulo: "Órganos superiores en materia de personal", articulos: "arts. 10-13 DLeg 1/1991", url: LOFPA },
      { seccion: S3, titulo: "Cuerpos, escalas y grupos de clasificación", articulos: "arts. 15-16 DLeg 1/1991; arts. 75-76 y DT 3.ª EBEP", url: `${EBEP}#a75` },
      { seccion: S4, titulo: "Relaciones de puestos de trabajo y plantillas", articulos: "arts. 17-18 DLeg 1/1991; arts. 72-74 EBEP", url: `${EBEP}#a74` },
      { seccion: S5, titulo: "Registro de Personal", articulos: "art. 14 DLeg 1/1991; art. 71 EBEP", url: `${EBEP}#a71` },
      { seccion: S6, titulo: "Planificación, planes de empleo y oferta de empleo público", articulos: "arts. 23-24 y DA 6.ª y 9.ª DLeg 1/1991; arts. 59, 69-70 EBEP", url: `${EBEP}#a70` },
    ],
  },
  vinculo: { oposicion: ADMIN_DGA.oposicion, bloqueId: ADMIN_DGA.bloquePersonal, numero: 16 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Ley de Función Pública de Aragón", "Texto refundido de la Ley de Ordenación de la Función Pública de la Comunidad Autónoma de Aragón, aprobado por el Decreto Legislativo 1/1991, de 19 de febrero"],
        ["Ámbito (art. 2 DLeg 1/1991)", "Todo el personal al servicio de la Administración de la Comunidad Autónoma, con posibles normas específicas para el personal sanitario, investigador y docente"],
        ["Clases de empleados públicos (art. 8 EBEP)", "Funcionarios de carrera, funcionarios interinos, personal laboral (fijo, indefinido o temporal) y personal eventual"],
        ["Funcionario de carrera (art. 9 EBEP)", "Vinculado por nombramiento legal mediante relación estatutaria de Derecho Administrativo con carácter permanente; ejerce en exclusiva las potestades públicas"],
        ["Regla general en Aragón (art. 5 DLeg 1/1991)", "Con carácter general, los puestos de la Administración de la Comunidad Autónoma serán desempeñados por funcionarios"],
        ["Funcionario interino (art. 10 EBEP)", "Nombrado por necesidad y urgencia para vacantes (máximo tres años), sustituciones, programas temporales (tres años, ampliables doce meses) o exceso de tareas (nueve meses en dieciocho)"],
        ["Selección de interinos en Aragón (art. 7.5 DLeg 1/1991)", "Mediante listas de espera derivadas de los procesos selectivos y listas supletorias; si se agotan y hay urgencia, a través del Servicio Público de Empleo"],
        ["Personal laboral (art. 8 DLeg 1/1991)", "Ocupa puestos clasificados como laborales con contrato escrito: oficios, vigilancia, mantenimiento, puestos no permanentes, docentes no regladas, investigación y conocimientos especializados sin cuerpo"],
        ["Personal eventual (art. 6 DLeg 1/1991 y art. 12 EBEP)", "Puestos de confianza o asesoramiento especial del Presidente o de los consejeros; nombramiento y cese libres; nunca es mérito para el acceso"],
        ["Personal directivo (art. 13 EBEP)", "Desarrolla funciones directivas profesionales; designación por mérito, capacidad e idoneidad; sometido a evaluación; sus condiciones no se negocian"],
      ],
      preguntas: [
        ["facil", "Según el art. 8 del EBEP, ¿cuál de estos NO es una clase de empleado público?", ["El alto cargo", "El funcionario interino", "El personal laboral", "El personal eventual"], "Art. 8.2 EBEP."],
        ["media", "En la Administración de la Comunidad Autónoma de Aragón, con carácter general, los puestos de trabajo serán desempeñados por:", ["Funcionarios", "Personal laboral", "Personal eventual", "Interinos"], "Art. 5 DLeg 1/1991."],
        ["media", "Un funcionario interino nombrado para cubrir una vacante puede permanecer, como regla general, un máximo de:", ["Tres años", "Cinco años", "Un año", "Dos años"], "Art. 10.1.a) y 4 EBEP."],
        ["media", "El personal eventual de la Administración aragonesa ocupa puestos de confianza o asesoramiento especial de:", ["El Presidente o los consejeros", "Los jefes de servicio", "Los sindicatos", "Las Cortes de Aragón"], "Art. 6.1 DLeg 1/1991."],
        ["dificil", "En Aragón, si se agotan las listas de espera y concurre manifiesta urgencia, el funcionario interino puede seleccionarse a través de:", ["El Servicio Público de Empleo", "Una empresa de trabajo temporal", "Libre designación", "Sorteo público"], "Art. 7.5 DLeg 1/1991."],
        ["media", "¿Cuál de estos puestos puede desempeñar el personal laboral según el art. 8 del DLeg 1/1991?", ["Los de vigilancia, custodia y porteo", "Los de jefatura de servicio", "Los que impliquen ejercicio de potestades públicas", "Los de letrado de los Servicios Jurídicos"], "Art. 8.2.c) DLeg 1/1991."],
        ["media", "La prestación de servicios como personal eventual:", ["Nunca puede constituir mérito para el acceso a la función pública", "Es mérito preferente", "Da acceso directo a funcionario", "Se valora doble en los concursos"], "Art. 6.2 DLeg 1/1991 y art. 12.4 EBEP."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Órganos superiores en materia de personal (art. 10 DLeg 1/1991)", "El Gobierno de Aragón, el consejero competente en función pública y el consejero competente en hacienda"],
        ["Gobierno de Aragón (art. 11 DLeg 1/1991)", "Establece la política de personal y la potestad reglamentaria; aprueba la oferta de empleo público, las relaciones de puestos, los intervalos de niveles y la jornada; fija servicios mínimos en huelga"],
        ["Separación del servicio (art. 11.2.l DLeg 1/1991)", "El Gobierno decide sobre las propuestas de expedientes disciplinarios que impliquen separación definitiva del servicio"],
        ["Consejero competente en función pública (art. 12 DLeg 1/1991)", "Desarrollo, coordinación y control de la política de personal: propone la oferta y las relaciones de puestos, convoca pruebas selectivas, nombra funcionarios y resuelve incompatibilidades"],
        ["Nomenclatura histórica", "El texto refundido habla del «Consejero de Presidencia y Relaciones Institucionales»; hoy sus funciones las ejerce el titular del departamento competente en función pública"],
        ["Comisión Interdepartamental de la Función Pública (art. 13 DLeg 1/1991)", "Órgano técnico de coordinación e información sobre personal, adscrito al departamento de función pública; la preside el director general de función pública"],
        ["Composición de la Comisión Interdepartamental (art. 13.2)", "Director general de función pública (presidente), secretarios generales técnicos de los departamentos y otros órganos que se determinen; secretario sin voto"],
        ["Funciones de la Comisión Interdepartamental (art. 13.3)", "Informar los proyectos normativos sobre función pública, proponer mejoras de organización y condiciones de trabajo y asesorar en la planificación estratégica de recursos humanos"],
      ],
      preguntas: [
        ["media", "¿Cuál de estos NO es órgano superior en materia de personal según el art. 10 del DLeg 1/1991?", ["El Justicia de Aragón", "El Gobierno de Aragón", "El consejero competente en función pública", "El consejero competente en hacienda"], "Art. 10.1 DLeg 1/1991."],
        ["media", "La oferta anual de empleo público de la Administración aragonesa la aprueba:", ["El Gobierno de Aragón", "El consejero de Hacienda", "El director general de función pública", "Las Cortes de Aragón"], "Art. 11.2.f) DLeg 1/1991."],
        ["media", "Las propuestas de resolución de expedientes disciplinarios que impliquen separación definitiva del servicio las decide:", ["El Gobierno de Aragón", "El jefe de servicio", "El instructor", "El Consejo Consultivo"], "Art. 11.2.l) DLeg 1/1991."],
        ["media", "La Comisión Interdepartamental de la Función Pública está presidida por:", ["El director general competente en materia de función pública", "El Presidente de Aragón", "El consejero de Hacienda", "Un representante sindical"], "Art. 13.2.a) DLeg 1/1991."],
        ["dificil", "La Comisión Interdepartamental de la Función Pública NO tiene competencia sobre el personal:", ["Docente no universitario, estatutario y de la Administración de Justicia", "De administración general", "De los organismos públicos", "Funcionario de los departamentos"], "Art. 13.1 DLeg 1/1991."],
        ["media", "Resolver los expedientes de incompatibilidades del personal corresponde, según el texto refundido, al:", ["Consejero competente en función pública", "Gobierno de Aragón", "Jefe de cada unidad", "Tribunal de Cuentas"], "Art. 12.2.j) DLeg 1/1991."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Agrupación de funcionarios (art. 15 DLeg 1/1991)", "Se integran en cuerpos, estructurados en escalas y especialidades, y encuadrados en grupos según la titulación exigida"],
        ["Cuerpos de Aragón (art. 16 DLeg 1/1991)", "Funcionarios Superiores (A), Funcionarios Técnicos (B), Ejecutivo (C), Auxiliar (D) y Subalterno (E, a extinguir)"],
        ["Cuerpo Ejecutivo (art. 16 DLeg 1/1991)", "Tareas de ejecución y tramitación administrativa; requiere Bachiller o equivalente; escalas General Administrativa, de Ayudantes Facultativos y de Agentes para la Protección de la Naturaleza"],
        ["Cuerpo de Funcionarios Superiores (art. 16)", "Escalas Superior de Administración, de Letrados de los Servicios Jurídicos, Facultativa Superior, Sanitaria Superior y Superior de Investigación (y de Economistas, añadida en 2000)"],
        ["Creación de cuerpos y escalas (art. 16.3 DLeg 1/1991 y art. 75.2 EBEP)", "Requiere ley de las Cortes de Aragón (o de las Cortes Generales en el Estado)"],
        ["Grupos del EBEP (art. 76)", "A (A1 y A2, título de Grado), B (Técnico Superior), C (C1: Bachiller o Técnico; C2: ESO) y agrupaciones profesionales sin titulación"],
        ["Equivalencias (DT 3.ª EBEP)", "Antiguo grupo A = A1; B = A2; C = C1; D = C2; E = agrupaciones profesionales"],
        ["Clases de especialidad (art. 16.2 DLeg 1/1991)", "Dentro de cada escala, las plazas se agrupan según su clase de especialidad para asignar funciones de forma coherente"],
      ],
      preguntas: [
        ["facil", "Las personas que superen esta oposición ingresarán en el Cuerpo:", ["Ejecutivo, Escala General Administrativa", "Auxiliar, Escala Auxiliar Administrativa", "De Funcionarios Técnicos, Escala Técnica de Gestión", "De Funcionarios Superiores"], "Art. 16 DLeg 1/1991 y convocatoria de 2025."],
        ["media", "En la clasificación del EBEP, el antiguo grupo C de la Ley 30/1984 equivale al subgrupo:", ["C1", "C2", "A2", "B"], "DT 3.ª EBEP."],
        ["media", "La creación, modificación o extinción de cuerpos y escalas de la Administración aragonesa requiere:", ["Ley de las Cortes de Aragón", "Decreto del Gobierno de Aragón", "Orden del consejero", "Acuerdo de la Mesa de la Función Pública"], "Art. 16.3 DLeg 1/1991 y art. 75.2 EBEP."],
        ["media", "Para acceder a un cuerpo del subgrupo C1 se exige:", ["Título de Bachiller o Técnico", "Título de Grado", "Graduado en ESO", "Técnico Superior"], "Art. 76 EBEP."],
        ["media", "¿Cuál de estas escalas pertenece al Cuerpo Ejecutivo aragonés?", ["Escala de Agentes para la Protección de la Naturaleza", "Escala de Letrados de los Servicios Jurídicos", "Escala Técnica de Gestión", "Escala Auxiliar Administrativa"], "Art. 16.1 DLeg 1/1991."],
        ["dificil", "El Cuerpo de Funcionarios Técnicos (antiguo grupo B) del DLeg 1/1991 se corresponde con el subgrupo del EBEP:", ["A2", "B", "A1", "C1"], "DT 3.ª EBEP: Grupo B = Subgrupo A2."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Relaciones de puestos de trabajo (art. 17.1 DLeg 1/1991)", "Las aprueba el Gobierno a propuesta del consejero de función pública; incluyen todos los puestos permanentes y si son de funcionario, laboral o eventual"],
        ["Contenido de la RPT (art. 17.1 DLeg 1/1991 y art. 74 EBEP)", "Denominación, nivel o categoría, modo de provisión, requisitos, grupos, cuerpos o escalas adscritos y retribuciones complementarias"],
        ["Creación y supresión de puestos (art. 17.2 DLeg 1/1991)", "Se hace a través de las relaciones de puestos; no pueden promoverse por solicitud personal o colectiva de sus titulares"],
        ["Publicidad de la RPT (art. 17.3 DLeg 1/1991)", "Se actualizan anualmente y se publican, con sus modificaciones, en el Boletín Oficial de Aragón"],
        ["Puestos de libre designación (art. 17.5 DLeg 1/1991)", "Solo las jefaturas de servicio y asimilados, las secretarías de altos cargos y los que excepcionalmente lo justifiquen por sus funciones"],
        ["Requisito para proveer (art. 17.4 DLeg 1/1991)", "La provisión de puestos de funcionario y los nuevos contratos laborales fijos exigen que el puesto figure en la RPT"],
        ["Plantillas presupuestarias (art. 18 DLeg 1/1991)", "Los Presupuestos anuales fijan el número de dotaciones de cada cuerpo, de eventuales y de personal laboral, y los créditos para retribuirlos"],
        ["Asignación de funciones (art. 73.2 EBEP)", "La Administración puede asignar funciones distintas de las del puesto si son adecuadas a la clasificación y lo justifican las necesidades del servicio, sin merma retributiva"],
      ],
      preguntas: [
        ["media", "Las relaciones de puestos de trabajo de los departamentos del Gobierno de Aragón las aprueba:", ["El Gobierno de Aragón, a propuesta del consejero competente en función pública", "Cada secretario general técnico", "La Mesa de la Función Pública", "Las Cortes de Aragón"], "Art. 17.1 DLeg 1/1991."],
        ["media", "Las relaciones de puestos de trabajo y sus modificaciones se publican en:", ["El Boletín Oficial de Aragón", "El tablón de cada departamento", "El BOE", "No se publican"], "Art. 17.3 DLeg 1/1991."],
        ["dificil", "¿Pueden los titulares de los puestos promover la modificación de su puesto en la RPT mediante solicitud personal o colectiva?", ["No, en ningún caso", "Sí, con informe sindical", "Sí, si lo apoya el jefe de servicio", "Solo una vez al año"], "Art. 17.2 DLeg 1/1991."],
        ["media", "Según el DLeg 1/1991, pueden clasificarse como de libre designación, entre otros:", ["Los puestos de jefatura de servicio y asimilados", "Todos los puestos de nivel 22 o superior", "Los puestos de auxiliar administrativo", "Los puestos de personal laboral"], "Art. 17.5 DLeg 1/1991."],
        ["media", "El número de dotaciones de cada cuerpo se fija en:", ["Los Presupuestos anuales de la Comunidad Autónoma", "La relación de puestos de trabajo exclusivamente", "La oferta de empleo público", "El Estatuto de Autonomía"], "Art. 18.1 DLeg 1/1991."],
        ["media", "Para que pueda formalizarse un nuevo contrato de personal laboral fijo es necesario que:", ["El puesto figure detallado en la relación de puestos de trabajo", "Lo autorice el Justicia", "Se publique en el BOE", "Exista un convenio con el INAEM"], "Art. 17.4 DLeg 1/1991."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["Registro General de Personal (art. 14.1 DLeg 1/1991)", "Inscribe a todo el personal de la Administración de la Comunidad Autónoma y anota todos los actos que afecten a su vida administrativa"],
        ["Datos prohibidos (art. 14.3 DLeg 1/1991)", "En la documentación individual no figurará ningún dato relativo a opinión, raza o religión"],
        ["Registro y nómina (art. 14.4 DLeg 1/1991)", "Para incluir en nómina una remuneración, debe comunicarse antes al Registro el acto que la reconoce"],
        ["Acceso al expediente (art. 14.5 DLeg 1/1991)", "Todo el personal inscrito tiene libre acceso a su expediente individual; el uso de los datos respeta el art. 18.4 CE"],
        ["Registros en el EBEP (art. 71)", "Cada Administración constituye un registro de su personal; los contenidos mínimos comunes se fijan por convenio de Conferencia Sectorial; se impulsa la gestión integrada de recursos humanos"],
        ["Anotaciones relevantes", "Se inscriben, por ejemplo, los reconocimientos de grado personal y las resoluciones de los concursos de provisión (arts. 34 y 38 DLeg 1/1991)"],
      ],
      preguntas: [
        ["media", "En el Registro General de Personal de la Administración aragonesa se inscribe:", ["Todo el personal a su servicio y los actos que afectan a su vida administrativa", "Solo el personal funcionario de carrera", "Solo los altos cargos", "Solo el personal laboral"], "Art. 14.1 DLeg 1/1991."],
        ["media", "¿Qué dato NO puede figurar en la documentación individual del personal?", ["Su religión", "Su cuerpo y escala", "Su grado personal", "Sus destinos"], "Art. 14.3 DLeg 1/1991."],
        ["media", "Para incluir una remuneración en nómina, el acto que la reconoce debe:", ["Comunicarse previamente al Registro de Personal", "Publicarse en el BOE", "Ser aprobado por el Gobierno", "Notificarse a los sindicatos"], "Art. 14.4 DLeg 1/1991."],
        ["facil", "El personal inscrito en el Registro tiene derecho a:", ["Libre acceso a su expediente individual", "Modificar sus datos sin control", "Consultar los expedientes de otros compañeros", "Ninguno, el registro es secreto"], "Art. 14.5 DLeg 1/1991."],
        ["media", "Según el EBEP, los contenidos mínimos comunes de los registros de personal se establecen mediante:", ["Convenio de Conferencia Sectorial", "Ley orgánica", "Instrucción de cada departamento", "Acuerdo de la Mesa General"], "Art. 71.3 EBEP."],
      ],
    },
    {
      seccion: S6,
      flashcards: [
        ["Planificación de recursos humanos (art. 69 EBEP)", "Busca la eficacia y la eficiencia mediante la dimensión adecuada de efectivos, distribución, formación, promoción y movilidad; puede concretarse en planes de ordenación"],
        ["Planes de empleo en Aragón (DA 9.ª DLeg 1/1991)", "Recogen actuaciones para la óptima utilización de los recursos humanos; los aprueba el consejero de función pública previa negociación"],
        ["Oferta de empleo público (art. 70 EBEP)", "Necesidades de personal con asignación presupuestaria que deben cubrirse con nuevo ingreso; obliga a convocar las plazas y hasta un 10 % adicional; ejecución en tres años improrrogables"],
        ["Oferta en Aragón (art. 23 DLeg 1/1991)", "La aprueba anualmente el Gobierno de Aragón; las plazas incluidas no pueden suprimirse, amortizarse ni transformarse"],
        ["Convocatoria tras la oferta (art. 24 DLeg 1/1991)", "Según el texto refundido, las pruebas se convocan en los tres meses siguientes a la publicación de la oferta, pudiendo añadir hasta un 10 % de plazas"],
        ["Bases de la convocatoria (art. 24.3 DLeg 1/1991)", "Vinculan a la Administración, a los tribunales y a quienes participan en las pruebas"],
        ["Reserva por discapacidad (art. 59 EBEP)", "No inferior al 7 % de las vacantes (al menos un 2 % para discapacidad intelectual); norma básica que prevalece sobre el 3 % de la DA 6.ª del DLeg 1/1991"],
        ["OEP 2026 de Aragón (Decreto 11/2026)", "839 plazas de turno libre (67 de ellas para personas con discapacidad) y 479 de promoción interna; para Administrativos, 75 de turno libre"],
      ],
      preguntas: [
        ["media", "Según el EBEP, la ejecución de la oferta de empleo público debe desarrollarse en el plazo improrrogable de:", ["Tres años", "Un año", "Cinco años", "Dos años"], "Art. 70.1 EBEP."],
        ["media", "La oferta de empleo público obliga a convocar las plazas comprometidas y hasta un:", ["10 % adicional", "20 % adicional", "5 % adicional", "50 % adicional"], "Art. 70.1 EBEP y art. 24.1 DLeg 1/1991."],
        ["dificil", "En las ofertas de empleo público debe reservarse para personas con discapacidad un cupo no inferior al:", ["7 % de las vacantes, con al menos un 2 % para discapacidad intelectual", "3 % de las vacantes", "5 % de las vacantes", "10 % de las vacantes"], "Art. 59.1 EBEP (básico)."],
        ["media", "Las plazas incorporadas a la oferta de empleo público aragonesa:", ["No pueden suprimirse, amortizarse ni transformarse", "Pueden amortizarse libremente", "Se transforman en laborales al año", "Caducan si no se convocan en un mes"], "Art. 23 DLeg 1/1991."],
        ["media", "Las bases de una convocatoria vinculan:", ["A la Administración, a los tribunales y a los participantes", "Solo a los participantes", "Solo a la Administración", "A nadie hasta que se publiquen los aprobados"], "Art. 24.3 DLeg 1/1991."],
        ["media", "¿Cuántas plazas de Administrativos de turno libre incluye la OEP 2026 de Aragón?", ["75", "144", "53", "100"], "Decreto 11/2026, Anexo I."],
        ["media", "Los planes de empleo de la Administración aragonesa:", ["Se negocian y los aprueba el consejero competente en función pública", "Los aprueban las Cortes", "No requieren negociación", "Los aprueba cada jefe de servicio"], "DA 9.ª DLeg 1/1991."],
      ],
    },
  ],
  glosario: [
    [S1, "Relación estatutaria", "Vínculo del funcionario con la Administración regulado por ley y reglamento (no por contrato), que la Administración puede modificar unilateralmente."],
    [S1, "Personal eventual", "Personal de confianza o asesoramiento especial, de nombramiento y cese libres, que cesa con la autoridad a la que asesora."],
    [S2, "Comisión Interdepartamental de la Función Pública", "Órgano técnico que coordina la gestión de personal entre el departamento de función pública y los demás departamentos."],
    [S3, "Escala", "División de un cuerpo de funcionarios según la naturaleza de sus funciones, como la Escala General Administrativa del Cuerpo Ejecutivo."],
    [S3, "Clase de especialidad", "Agrupación de plazas dentro de una escala para asignar funciones específicas al personal más idóneo."],
    [S4, "Relación de puestos de trabajo (RPT)", "Instrumento público que ordena todos los puestos de un departamento con su nivel, requisitos, forma de provisión y complementos."],
    [S4, "Plantilla presupuestaria", "Conjunto de dotaciones económicas de personal fijadas cada año en la Ley de Presupuestos."],
    [S5, "Registro de Personal", "Registro que inscribe a todos los empleados y anota los actos de su vida administrativa, condición previa para pagar en nómina."],
    [S6, "Oferta de empleo público", "Relación anual de plazas vacantes con dotación que se cubrirán con personal de nuevo ingreso mediante procesos selectivos."],
    [S6, "Plan de empleo", "Programa de medidas (movilidad, formación, reasignación) para adecuar la plantilla a las necesidades de un ámbito."],
  ],
  casos: [
    {
      slug: "nueva-unidad-departamento-rpt",
      titulo: "Una nueva unidad en un departamento",
      supuesto: "Un departamento del Gobierno de Aragón crea una unidad de atención a empresas. Necesita un jefe de servicio, cinco administrativos (C1), dos auxiliares (C2) y un conductor. Mientras se cubren las plazas, quiere nombrar funcionarios interinos y que una persona de confianza del consejero asesore la puesta en marcha.",
      preguntas: [
        [S4, "media", "Para crear los nuevos puestos hay que:", ["Modificar la relación de puestos de trabajo, que aprueba el Gobierno de Aragón", "Firmar contratos directamente", "Dictar una circular del secretario general técnico", "Aprobar una ley"], "Art. 17.1-2 DLeg 1/1991."],
        [S4, "media", "La modificación de la RPT deberá publicarse en:", ["El Boletín Oficial de Aragón", "El BOE", "La intranet", "No requiere publicación"], "Art. 17.3 DLeg 1/1991."],
        [S4, "media", "El puesto de jefe de servicio puede clasificarse para su provisión por:", ["Libre designación", "Contrato laboral temporal", "Personal eventual", "Sorteo"], "Art. 17.5 DLeg 1/1991."],
        [S3, "media", "Los cinco puestos de administrativo se adscribirán, previsiblemente, a funcionarios del:", ["Cuerpo Ejecutivo, Escala General Administrativa", "Cuerpo Auxiliar", "Cuerpo de Funcionarios Superiores", "Cuerpo Subalterno"], "Art. 16 DLeg 1/1991."],
        [S1, "media", "El puesto de conductor, por ser propio de un oficio, puede ser desempeñado por:", ["Personal laboral", "Personal eventual", "Un alto cargo", "Solo funcionarios de carrera"], "Art. 8.2.c) DLeg 1/1991."],
        [S1, "media", "Los funcionarios interinos para las vacantes se seleccionarán:", ["Mediante listas de espera derivadas de los procesos selectivos", "Por libre designación", "A propuesta del consejero", "Por antigüedad en el departamento"], "Art. 7.5 DLeg 1/1991."],
        [S1, "dificil", "Si un interino ocupa una vacante, transcurridos tres años desde su nombramiento, como regla general:", ["Finaliza la interinidad y la vacante solo puede ocuparla un funcionario de carrera, salvo que el proceso quede desierto", "Pasa a ser funcionario de carrera", "Se prorroga automáticamente", "Pasa a personal laboral fijo"], "Art. 10.4 EBEP."],
        [S1, "media", "La persona de confianza del consejero sería personal:", ["Eventual, de nombramiento y cese libres", "Funcionario interino", "Laboral fijo", "Directivo profesional obligatoriamente"], "Art. 6 DLeg 1/1991 y art. 12 EBEP."],
        [S1, "media", "Esa persona cesará, en todo caso:", ["Cuando cese el consejero al que asesora", "A los tres años", "Cuando apruebe una oposición", "Nunca"], "Art. 12.3 EBEP."],
        [S4, "media", "Las retribuciones de los nuevos puestos requieren, además de la RPT:", ["Los créditos presupuestarios necesarios", "Un acuerdo sindical", "Un informe del Justicia", "Un decreto-ley"], "Arts. 17.2 y 18 DLeg 1/1991."],
      ],
    },
    {
      slug: "oferta-empleo-publico-anual",
      titulo: "Preparar la oferta de empleo público",
      supuesto: "La Dirección General de la Función Pública prepara la oferta anual de empleo público: hay 400 vacantes dotadas que no pueden cubrirse con el personal existente. Un sindicato pregunta cuántas plazas deben reservarse para personas con discapacidad, cuándo se convocarán y si pueden luego amortizarse algunas.",
      preguntas: [
        [S6, "media", "La oferta la aprobará:", ["El Gobierno de Aragón", "El director general de la Función Pública", "Las Cortes de Aragón", "La Mesa de la Función Pública"], "Art. 11.2.f) y 23 DLeg 1/1991."],
        [S2, "media", "La propuesta de aprobación corresponde al:", ["Consejero competente en materia de función pública", "Consejero de Sanidad", "Presidente del Consejo Consultivo", "Justicia de Aragón"], "Art. 12.2.e) DLeg 1/1991."],
        [S6, "dificil", "De las 400 plazas, la reserva mínima para personas con discapacidad es de:", ["28 plazas (7 %), de ellas al menos 8 para discapacidad intelectual", "12 plazas (3 %)", "40 plazas (10 %)", "20 plazas (5 %)"], "Art. 59.1 EBEP: 7 % de 400 = 28; 2 % = 8."],
        [S6, "media", "La regla del EBEP sobre esta reserva prevalece sobre la del texto refundido aragonés porque:", ["El EBEP es legislación básica del Estado", "Es más moderna sin más", "Lo decide el sindicato", "La ley aragonesa no está vigente"], "Arts. 149.1.18.ª CE y 59 EBEP."],
        [S6, "media", "La oferta se publicará en:", ["El Boletín Oficial de Aragón", "Solo en la web", "El BOE exclusivamente", "No se publica"], "Art. 24.1 DLeg 1/1991 y art. 70.2 EBEP."],
        [S6, "media", "Las plazas incluidas en la oferta:", ["No podrán suprimirse, amortizarse ni transformarse", "Pueden amortizarse en cualquier momento", "Pueden convertirse en eventuales", "Se reducen a la mitad si no hay presupuesto"], "Art. 23 DLeg 1/1991."],
        [S6, "media", "Además de las plazas comprometidas, las convocatorias pueden incluir hasta:", ["Un 10 % adicional", "Un 25 % adicional", "El doble", "Ninguna más"], "Art. 70.1 EBEP y art. 24.1 DLeg 1/1991."],
        [S6, "media", "La ejecución de la oferta debe completarse en un plazo improrrogable de:", ["Tres años", "Seis meses", "Un año", "Diez años"], "Art. 70.1 EBEP."],
        [S6, "media", "Las bases de las convocatorias que se aprueben vincularán:", ["A la Administración, a los tribunales y a los aspirantes", "Solo a los aspirantes", "Solo a los tribunales", "A nadie"], "Art. 24.3 DLeg 1/1991."],
        [S5, "media", "Cuando los aprobados sean nombrados, su toma de posesión y destino se anotarán en:", ["El Registro General de Personal", "El Registro Mercantil", "El Registro de la Propiedad", "El Registro Civil"], "Art. 14.1 DLeg 1/1991."],
      ],
    },
    {
      slug: "consulta-registro-personal",
      titulo: "Una consulta sobre el Registro de Personal",
      supuesto: "Una administrativa del Gobierno de Aragón quiere comprobar que su expediente recoge bien su grado personal y sus destinos. Al revisarlo, ve que un formulario antiguo preguntaba por su religión. Además, le dicen que una gratificación reconocida no puede pagarse aún porque «no está en el Registro».",
      preguntas: [
        [S5, "facil", "¿Puede consultar su expediente individual?", ["Sí, tiene libre acceso a él", "No, es secreto", "Solo con autorización del consejero", "Solo a través de un abogado"], "Art. 14.5 DLeg 1/1991."],
        [S5, "media", "El dato sobre su religión:", ["No debe figurar en su documentación individual", "Es obligatorio", "Solo puede figurar si lo autoriza", "Debe trasladarse al Registro estatal"], "Art. 14.3 DLeg 1/1991."],
        [S5, "media", "La gratificación no puede incluirse en nómina hasta que:", ["Se comunique al Registro el acto que la reconoce", "La apruebe el Gobierno", "Pasen tres meses", "Lo autorice el sindicato"], "Art. 14.4 DLeg 1/1991."],
        [S5, "media", "Su grado personal reconocido debe quedar anotado en:", ["El Registro de Personal", "La relación de puestos de trabajo", "El BOE", "La oferta de empleo público"], "Art. 38.2 DLeg 1/1991."],
        [S5, "media", "El uso de los datos del Registro está sometido a los límites del artículo de la Constitución que protege:", ["La intimidad frente al uso de la informática (art. 18.4)", "La libertad de expresión", "El derecho a la educación", "La propiedad privada"], "Art. 14.5 DLeg 1/1991."],
        [S3, "media", "Como administrativa, pertenece al subgrupo:", ["C1", "C2", "A2", "A1"], "Art. 76 EBEP y DT 3.ª."],
        [S1, "media", "Como funcionaria de carrera, su relación con la Administración es:", ["Estatutaria, regulada por el Derecho Administrativo", "Un contrato laboral", "Un contrato mercantil", "Un convenio"], "Art. 9.1 EBEP."],
        [S2, "media", "Si quiere proponer mejoras en la gestión de personal, el órgano técnico de coordinación interdepartamental es:", ["La Comisión Interdepartamental de la Función Pública", "El Consejo Consultivo", "La Cámara de Cuentas", "La Junta de Contratación"], "Art. 13 DLeg 1/1991."],
        [S4, "media", "Sus funciones pueden ampliarse a tareas distintas de su puesto si son adecuadas a su clasificación y:", ["Lo justifican las necesidades del servicio, sin merma retributiva", "Lo pide un compañero", "Se reducen sus retribuciones", "Lo acuerda el sindicato"], "Art. 73.2 EBEP."],
        [S5, "media", "Según el EBEP, cada Administración debe constituir:", ["Un Registro de su personal", "Un Registro de Contratistas", "Un Registro Mercantil", "Un Registro de Asociaciones"], "Art. 71.1 EBEP."],
      ],
    },
  ],
});
