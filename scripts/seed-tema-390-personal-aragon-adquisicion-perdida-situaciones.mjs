/**
 * Crea tema-390 — Tema 18 de Administrativo DGA (tema 13 del programa de
 * materias específicas): "El personal de la Administración de la
 * Comunidad Autónoma de Aragón (III). Adquisición y pérdida de la
 * condición de funcionario. Situaciones de los funcionarios: supuestos y
 * efectos de cada una de ellas."
 *
 * Fuentes (textos consolidados leídos en esta sesión en la API del BOE):
 * - RDLeg 5/2015, texto refundido del EBEP (BOE-A-2015-11719): arts. 62-68
 *   (adquisición, pérdida, renuncia, nacionalidad, inhabilitación,
 *   jubilación, rehabilitación) y 85-92 (situaciones administrativas).
 * - Decreto Legislativo 1/1991, texto refundido de la Ley de Ordenación de
 *   la Función Pública de Aragón (BOA-d-1991-90001): arts. 20-21, 32-33 y
 *   disposiciones adicionales decimoctava y decimonovena (servicios
 *   especiales de altos cargos aragoneses y prolongación del servicio
 *   activo).
 * Las situaciones del EBEP son legislación básica y directamente aplicable
 * en Aragón; el tema no atribuye a la normativa aragonesa reglas que no se
 * han leído (por ejemplo, plazos reglamentarios de reingreso).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-390-personal-aragon-adquisicion-perdida-situaciones.mjs
 */
import { sembrarTema, ADMIN_DGA } from "./lib/sembrar-tema.mjs";

const EBEP = "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11719";
const LOFPA = "https://www.boe.es/buscar/act.php?id=BOA-d-1991-90001";
const S1 = "adquisicion-condicion-funcionario";
const S2 = "perdida-condicion-jubilacion-rehabilitacion";
const S3 = "servicio-activo-servicios-especiales";
const S4 = "servicio-otras-administraciones";
const S5 = "excedencias";
const S6 = "suspension-funciones-reingreso";

await sembrarTema({
  tema: {
    slug: "tema-390",
    titulo: "El personal de la Administración de Aragón (III): adquisición y pérdida de la condición de funcionario y situaciones administrativas",
    descripcion: "Adquisición de la condición de funcionario de carrera. Causas de pérdida: renuncia, pérdida de la nacionalidad, jubilación, separación del servicio e inhabilitación; rehabilitación. Jubilación voluntaria, forzosa y por incapacidad y prolongación del servicio activo en Aragón. Situaciones administrativas (EBEP): servicio activo, servicios especiales (con su aplicación a los altos cargos aragoneses), servicio en otras Administraciones Públicas, excedencias (por interés particular, agrupación familiar, cuidado de familiares, violencia de género o sexual y violencia terrorista) y suspensión de funciones; efectos de cada una y reingreso. Situaciones del personal laboral.",
    contenido: "Cuándo se es funcionario (y cuándo se deja de serlo: por renuncia, jubilación, sanción o inhabilitación) y en qué situación puede estar un funcionario a lo largo de su vida profesional: trabajando (servicio activo), ocupando un cargo político (servicios especiales), destinado en otra Administración, en excedencia para cuidar a un hijo o por interés particular, o suspendido. Para cada situación, qué pasa con el sueldo, la antigüedad y la reserva del puesto.",
    enlaces_boe: [
      { url: EBEP, titulo: "Real Decreto Legislativo 5/2015, texto refundido del Estatuto Básico del Empleado Público (BOE-A-2015-11719)" },
      { url: LOFPA, titulo: "Decreto Legislativo 1/1991, texto refundido de la Ley de Ordenación de la Función Pública de Aragón (BOA-d-1991-90001)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "Adquisición de la condición de funcionario de carrera", articulos: "art. 62 EBEP", url: `${EBEP}#a62` },
      { seccion: S2, titulo: "Pérdida de la condición, jubilación y rehabilitación", articulos: "arts. 63-68 EBEP; DA 19.ª DLeg 1/1991", url: `${EBEP}#a63` },
      { seccion: S3, titulo: "Servicio activo y servicios especiales", articulos: "arts. 85-87 EBEP; art. 32 y DA 18.ª DLeg 1/1991", url: `${EBEP}#a85` },
      { seccion: S4, titulo: "Servicio en otras Administraciones Públicas", articulos: "art. 88 EBEP; arts. 20-21 DLeg 1/1991", url: `${EBEP}#a88` },
      { seccion: S5, titulo: "Excedencias", articulos: "art. 89 EBEP", url: `${EBEP}#a89` },
      { seccion: S6, titulo: "Suspensión de funciones, reingreso y personal laboral", articulos: "arts. 90-92 EBEP", url: `${EBEP}#a90` },
    ],
  },
  vinculo: { oposicion: ADMIN_DGA.oposicion, bloqueId: ADMIN_DGA.bloquePersonal, numero: 18 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Requisitos sucesivos (art. 62.1 EBEP)", "Superar el proceso selectivo, ser nombrado (publicación en el diario oficial), acatar la Constitución y el Estatuto de Autonomía, y tomar posesión en plazo"],
        ["Falta de requisitos (art. 62.2 EBEP)", "Quien no acredite los requisitos de la convocatoria tras superar el proceso no puede ser funcionario y quedan sin efecto sus actuaciones"],
        ["Nombramiento en Aragón (art. 28.2 DLeg 1/1991)", "Por orden del consejero competente en función pública publicada en el BOA, tras acatar la Constitución y el Estatuto, declarar sobre incompatibilidades y tomar posesión"],
        ["Funcionarios transferidos (art. 20 DLeg 1/1991)", "Se integran plenamente como funcionarios propios de Aragón en servicio activo, respetando su grupo y su grado personal"],
        ["Funcionarios trasladados de otras Administraciones (art. 20.2 DLeg 1/1991)", "Conservan la condición de funcionarios de su Administración de origen, pero se les aplica la normativa aragonesa mientras estén destinados en Aragón (salvo la separación del servicio)"],
      ],
      preguntas: [
        ["media", "¿Cuál es el último requisito para adquirir la condición de funcionario de carrera?", ["La toma de posesión dentro del plazo establecido", "El nombramiento", "La superación del proceso selectivo", "El acatamiento de la Constitución"], "Art. 62.1 EBEP."],
        ["media", "El nombramiento como funcionario de carrera debe publicarse en:", ["El diario oficial correspondiente (en Aragón, el BOA)", "Un periódico regional", "El tablón del tribunal", "No se publica"], "Art. 62.1.b) EBEP y art. 28.2 DLeg 1/1991."],
        ["dificil", "Un funcionario del Estado que obtiene por concurso un puesto en el Gobierno de Aragón sin integrarse:", ["Conserva la condición de funcionario estatal, pero se le aplica la normativa aragonesa salvo en la separación del servicio", "Pasa a ser funcionario aragonés automáticamente", "Se rige solo por la normativa estatal", "Pierde su condición de funcionario"], "Art. 20.2 DLeg 1/1991."],
        ["media", "Los funcionarios transferidos a la Comunidad Autónoma:", ["Se integran plenamente como funcionarios propios en servicio activo", "Quedan en excedencia en el Estado", "Pasan a personal laboral", "Mantienen solo un vínculo temporal"], "Art. 20.1 DLeg 1/1991 y art. 88.2 EBEP."],
        ["media", "Si tras superar el proceso no se acreditan los requisitos de la convocatoria:", ["No puede adquirirse la condición de funcionario", "Se adquiere igualmente", "Se concede un plazo de un año", "Se nombra interino"], "Art. 62.2 EBEP."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Causas de pérdida (art. 63 EBEP)", "Renuncia, pérdida de la nacionalidad, jubilación total, separación del servicio firme y pena firme de inhabilitación absoluta o especial"],
        ["Renuncia (art. 64 EBEP)", "Por escrito y aceptada expresamente; no se acepta si hay expediente disciplinario o auto de procesamiento o apertura de juicio oral; no impide volver a ingresar"],
        ["Pérdida de la nacionalidad (art. 65 EBEP)", "Supone la pérdida de la condición salvo que simultáneamente se adquiera la de otro Estado de la UE o asimilado"],
        ["Inhabilitación (art. 66 EBEP)", "La absoluta firme supone perder todos los empleos; la especial, los especificados en la sentencia"],
        ["Clases de jubilación (art. 67.1 EBEP)", "Voluntaria, forzosa por edad y por incapacidad permanente para las funciones del cuerpo o escala"],
        ["Jubilación forzosa (art. 67.3-4 EBEP)", "A los 65 años; en el Régimen General de la Seguridad Social, a la edad ordinaria de acceso a la pensión sin coeficiente reductor"],
        ["Prolongación en Aragón (DA 19.ª DLeg 1/1991)", "El funcionario puede pedir seguir en activo hasta los 70 años; se resuelve motivadamente en un mes, con reconocimiento médico; se concede por un año revisable"],
        ["Silencio en la prolongación (DA 19.ª.5 DLeg 1/1991)", "Si no se resuelve en plazo, la solicitud se entiende desestimada"],
        ["Rehabilitación (art. 68 EBEP)", "Se concede si desaparece la causa de pérdida de nacionalidad o incapacidad; excepcionalmente puede concederse tras inhabilitación penal (silencio desestimatorio)"],
      ],
      preguntas: [
        ["media", "¿Cuál de estas NO es causa de pérdida de la condición de funcionario de carrera?", ["La excedencia por interés particular", "La renuncia", "La jubilación total", "La separación del servicio firme"], "Art. 63 EBEP."],
        ["media", "No puede aceptarse la renuncia de un funcionario cuando:", ["Está sujeto a expediente disciplinario o se ha dictado contra él auto de procesamiento o apertura de juicio oral", "Lleva menos de un año de servicio", "No ha cumplido 65 años", "Tiene deudas con Hacienda"], "Art. 64.2 EBEP."],
        ["media", "La pena firme de inhabilitación especial supone la pérdida de la condición de funcionario:", ["Respecto de los empleos o cargos especificados en la sentencia", "Respecto de todos los empleos", "Solo durante seis meses", "Nunca"], "Art. 66 EBEP."],
        ["media", "En Aragón, el funcionario puede solicitar prolongar su permanencia en activo como máximo hasta los:", ["70 años", "67 años", "72 años", "65 años"], "DA 19.ª DLeg 1/1991 y art. 67.3 EBEP."],
        ["dificil", "La resolución que acepta la prolongación en el servicio activo en Aragón se concede:", ["Por un año, revisable anualmente con reconocimiento médico", "Hasta los 70 años sin revisión", "Por cinco años", "Por seis meses improrrogables"], "DA 19.ª.4 DLeg 1/1991."],
        ["media", "Quien perdió la condición de funcionario por jubilación por incapacidad permanente puede, al desaparecer la causa:", ["Solicitar la rehabilitación, que le será concedida", "Reingresar sin trámite", "Solo opositar de nuevo", "Nada"], "Art. 68.1 EBEP."],
        ["media", "La renuncia a la condición de funcionario:", ["No inhabilita para ingresar de nuevo mediante el procedimiento de selección", "Impide volver a la Administración", "Supone una sanción", "Requiere autorización judicial"], "Art. 64.3 EBEP."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Situaciones administrativas (art. 85.1 EBEP)", "Servicio activo, servicios especiales, servicio en otras Administraciones Públicas, excedencia y suspensión de funciones"],
        ["Otras situaciones (art. 85.2 EBEP)", "Las leyes de función pública pueden crear otras por reestructuración, exceso de personal o acceso a otros cuerpos"],
        ["Servicio activo (art. 86 EBEP)", "Quien presta servicios como funcionario en cualquier Administración y no le corresponde otra situación; goza de todos los derechos"],
        ["Servicios especiales: supuestos (art. 87.1 EBEP)", "Miembros del Gobierno o de los gobiernos autonómicos, altos cargos, parlamentarios retribuidos, cargos locales con dedicación exclusiva, órganos constitucionales o estatutarios, eventuales que no opten por el activo, entre otros"],
        ["Servicios especiales: efectos (art. 87.2-3 EBEP)", "Se cobran las retribuciones del cargo (y los trienios); el tiempo computa para ascensos, trienios, promoción y Seguridad Social; derecho a reingresar en la misma localidad"],
        ["Altos cargos de Aragón (art. 32 DLeg 1/1991)", "Pasan a servicios especiales con reserva del puesto que tuvieran en destino definitivo; se asimilan a director general los presidentes y directores de organismos públicos nombrados por el Gobierno"],
        ["Órganos estatutarios aragoneses (DA 18.ª DLeg 1/1991)", "Los efectos del art. 87.3 EBEP se extienden al Justicia de Aragón, miembros de la Cámara de Cuentas y del Consejo Consultivo, presidentes de comarcas y presidente del CESA"],
      ],
      preguntas: [
        ["media", "Un funcionario aragonés nombrado director general del Gobierno de Aragón pasa a la situación de:", ["Servicios especiales, con reserva del puesto que tenía en destino definitivo", "Excedencia voluntaria", "Servicio activo", "Suspensión de funciones"], "Art. 87.1.a) EBEP y art. 32.1 DLeg 1/1991."],
        ["media", "En servicios especiales, el funcionario percibe:", ["Las retribuciones del cargo que desempeña, más los trienios reconocidos", "Las retribuciones de su puesto de funcionario", "Ninguna retribución", "Ambas retribuciones sumadas"], "Art. 87.2 EBEP."],
        ["media", "El tiempo en servicios especiales computa a efectos de:", ["Ascensos, trienios, promoción interna y Seguridad Social", "Nada", "Solo trienios", "Solo Seguridad Social"], "Art. 87.2 EBEP."],
        ["dificil", "Un funcionario designado personal eventual de confianza:", ["Pasa a servicios especiales salvo que opte por permanecer en servicio activo", "Pasa siempre a excedencia", "Pierde la condición de funcionario", "Queda suspenso"], "Art. 87.1.i) EBEP."],
        ["media", "¿Cuál de estas NO es una situación administrativa del art. 85 EBEP?", ["Comisión de servicios", "Servicio en otras Administraciones Públicas", "Suspensión de funciones", "Excedencia"], "Art. 85.1 EBEP; la comisión de servicios es una forma de provisión."],
        ["media", "Según el DLeg 1/1991, se asimilan a director general a efectos de servicios especiales:", ["Los presidentes, directores y directores gerentes de organismos públicos nombrados por el Gobierno de Aragón", "Los jefes de servicio", "Los jefes de sección", "Los miembros de las mesas de contratación"], "Art. 32.2 DLeg 1/1991."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Supuesto (art. 88.1 EBEP)", "Funcionarios que, por transferencia o por los procedimientos de provisión, obtienen destino en otra Administración Pública"],
        ["Transferidos (art. 88.2 EBEP)", "Se integran plenamente en la función pública autonómica en servicio activo, respetando su grupo y derechos de carrera; se reconoce la igualdad de todos los funcionarios propios"],
        ["Régimen aplicable (art. 88.3 EBEP)", "Se rigen por la legislación de la Administración de destino, conservan su condición en la de origen y pueden concursar en ella; el tiempo computa como servicio activo en su cuerpo"],
        ["Reingreso y carrera (art. 88.4 EBEP)", "Al reingresar, se les reconocen los progresos de carrera según los convenios de Conferencia Sectorial o, en su defecto, por la Administración de reingreso"],
        ["Integración en otra Administración (art. 21.2 DLeg 1/1991)", "Si el funcionario aragonés trasladado se integra en la función pública de destino, pasa en Aragón a excedencia voluntaria"],
        ["Cese en libre designación en otra Administración (art. 84.3 EBEP)", "La de destino tiene un mes para adscribirle a otro puesto; si no, debe pedir el reingreso en la de origen en un mes o pasa a excedencia por interés particular"],
      ],
      preguntas: [
        ["media", "El tiempo de servicio en otra Administración Pública computa:", ["Como de servicio activo en su cuerpo o escala de origen", "Como excedencia", "No computa", "Solo a efectos de Seguridad Social"], "Art. 88.3 EBEP."],
        ["media", "Un funcionario en servicio en otras Administraciones se rige por:", ["La legislación de la Administración en la que está destinado efectivamente", "La de su Administración de origen en todo caso", "El Código Civil", "Su convenio colectivo"], "Art. 88.3 EBEP."],
        ["dificil", "Si un funcionario aragonés trasladado a otra Administración se integra en la función pública de esta, en Aragón pasa a:", ["Excedencia voluntaria", "Servicios especiales", "Servicio activo", "Suspensión"], "Art. 21.2 DLeg 1/1991."],
        ["media", "Si cesa en un puesto de libre designación de la Administración de destino y esta no le adscribe a otro puesto en un mes, el funcionario debe:", ["Solicitar el reingreso en su Administración de origen en el plazo máximo de un mes", "Esperar indefinidamente", "Renunciar a su condición", "Pedir la jubilación"], "Art. 84.3 EBEP."],
        ["media", "Si no solicita ese reingreso en plazo, será declarado de oficio en:", ["Excedencia voluntaria por interés particular", "Servicios especiales", "Suspensión de funciones", "Servicio activo"], "Art. 84.3 EBEP."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["Modalidades de excedencia (art. 89.1 EBEP)", "Por interés particular, por agrupación familiar, por cuidado de familiares, por violencia de género o sexual y por violencia terrorista"],
        ["Por interés particular (art. 89.2 EBEP)", "Requiere cinco años de servicios efectivos inmediatamente anteriores (las leyes de función pública pueden reducirlo); subordinada a las necesidades del servicio; no si hay expediente disciplinario"],
        ["Efectos del interés particular (art. 89.2)", "No se cobran retribuciones ni computa el tiempo para ascensos, trienios ni Seguridad Social; se declara de oficio si no se pide el reingreso en plazo"],
        ["Por agrupación familiar (art. 89.3 EBEP)", "Sin requisito de servicios previos, si el cónyuge reside en otra localidad por tener destino definitivo como funcionario o laboral fijo en el sector público; mismos efectos económicos que la anterior"],
        ["Por cuidado de familiares (art. 89.4 EBEP)", "Hasta tres años por cada hijo o menor en guarda o acogimiento y hasta tres años por familiar a cargo hasta el segundo grado que no pueda valerse por sí mismo"],
        ["Efectos del cuidado de familiares (art. 89.4)", "Computa para trienios, carrera y Seguridad Social; reserva del puesto al menos dos años; después, puesto en la misma localidad y retribución; puede hacer cursos"],
        ["Por violencia de género o sexual (art. 89.5 EBEP)", "Sin tiempo mínimo de servicios ni de permanencia; reserva del puesto seis meses (prorrogable de tres en tres hasta dieciocho); los dos primeros meses con retribuciones íntegras"],
        ["Por violencia terrorista (art. 89.6 EBEP)", "En las mismas condiciones que la de violencia de género, mientras sea necesaria para la protección y asistencia social integral"],
      ],
      preguntas: [
        ["media", "Para la excedencia voluntaria por interés particular, el EBEP exige con carácter general haber prestado servicios efectivos durante:", ["Cinco años inmediatamente anteriores", "Un año", "Diez años", "Dos años"], "Art. 89.2 EBEP."],
        ["media", "La excedencia por cuidado de hijos tiene una duración máxima de:", ["Tres años por cada hijo", "Un año", "Cinco años", "Hasta que el hijo cumpla 12 años"], "Art. 89.4 EBEP."],
        ["media", "Durante la excedencia por cuidado de familiares, el puesto de trabajo se reserva al menos durante:", ["Dos años", "Seis meses", "Tres años", "Un año"], "Art. 89.4 EBEP."],
        ["dificil", "Durante los dos primeros meses de la excedencia por violencia de género o sexual, la funcionaria:", ["Percibe las retribuciones íntegras y, en su caso, las prestaciones por hijo a cargo", "No percibe retribuciones", "Percibe la mitad", "Percibe solo las básicas"], "Art. 89.5 EBEP."],
        ["media", "El tiempo de excedencia por interés particular:", ["No computa para ascensos, trienios ni Seguridad Social", "Computa para todo", "Computa solo para trienios", "Computa solo para carrera"], "Art. 89.2 EBEP."],
        ["media", "La excedencia por agrupación familiar procede cuando el cónyuge:", ["Reside en otra localidad por tener un puesto definitivo como funcionario o laboral fijo en el sector público", "Trabaja en una empresa privada en otra provincia", "Está desempleado", "Es estudiante"], "Art. 89.3 EBEP."],
        ["media", "¿Puede concederse la excedencia por interés particular a un funcionario al que se instruye expediente disciplinario?", ["No", "Sí, siempre", "Sí, si paga una fianza", "Solo con informe del instructor"], "Art. 89.2 EBEP."],
      ],
    },
    {
      seccion: S6,
      flashcards: [
        ["Suspensión de funciones (art. 90.1 EBEP)", "Priva del ejercicio de las funciones y de todos los derechos; supone la pérdida del puesto si excede de seis meses"],
        ["Suspensión firme (art. 90.2 EBEP)", "Por sentencia en causa criminal o por sanción disciplinaria; la disciplinaria no puede exceder de seis años"],
        ["Prohibición durante la suspensión (art. 90.3 EBEP)", "No se pueden prestar servicios en ninguna Administración ni entidad pública mientras se cumple la pena o sanción"],
        ["Suspensión provisional (arts. 90.4 y 98.3 EBEP)", "Durante un expediente disciplinario (máximo seis meses salvo paralización imputable) o un procedimiento judicial; se cobran las retribuciones básicas"],
        ["Si la suspensión provisional no se confirma (art. 98.4 EBEP)", "Computa como servicio activo y se restituyen las diferencias retributivas"],
        ["Reingreso (art. 91 EBEP)", "Plazos, procedimientos y condiciones se regulan reglamentariamente, respetando la reserva del puesto cuando proceda"],
        ["Reingreso por provisión en Aragón (art. 33.2 DLeg 1/1991)", "Los excedentes forzosos, los voluntarios que puedan cesar en esa situación y los suspensos que hayan cumplido la suspensión reingresan a través de los procedimientos de provisión o, si es urgente, con destino provisional"],
        ["Personal laboral (art. 92 EBEP)", "Sus situaciones se rigen por el Estatuto de los Trabajadores y los convenios colectivos, que pueden aplicar el régimen del EBEP en lo compatible"],
      ],
      preguntas: [
        ["media", "La suspensión de funciones determina la pérdida del puesto de trabajo cuando excede de:", ["Seis meses", "Un año", "Tres meses", "Dos años"], "Art. 90.1 EBEP."],
        ["media", "La suspensión firme por sanción disciplinaria no puede exceder de:", ["Seis años", "Tres años", "Diez años", "Un año"], "Art. 90.2 EBEP."],
        ["media", "Durante la suspensión provisional, el funcionario percibe:", ["Las retribuciones básicas y, en su caso, las prestaciones familiares por hijo a cargo", "Todas sus retribuciones", "Nada", "Solo el complemento específico"], "Art. 98.3 EBEP."],
        ["dificil", "Si la suspensión provisional no llega a ser declarada firme:", ["El tiempo computa como servicio activo y se restituyen las diferencias retributivas", "Se pierde el puesto", "Se descuenta de las vacaciones", "Se convierte en excedencia"], "Art. 98.4 EBEP."],
        ["media", "Las situaciones administrativas del personal laboral se rigen por:", ["El Estatuto de los Trabajadores y los convenios colectivos", "Solo el EBEP", "El Código Civil", "El reglamento disciplinario estatal"], "Art. 92 EBEP."],
        ["media", "¿Puede un funcionario suspenso trabajar en otra Administración mientras cumple la sanción?", ["No, en ninguna Administración ni entidad pública", "Sí, en otra comunidad", "Sí, como personal laboral", "Sí, si lo autoriza el consejero"], "Art. 90.3 EBEP."],
      ],
    },
  ],
  glosario: [
    [S1, "Toma de posesión", "Acto por el que el funcionario nombrado se incorpora a su puesto; es el último requisito para adquirir la condición de funcionario."],
    [S2, "Inhabilitación", "Pena que priva del ejercicio de empleos o cargos públicos: la absoluta, de todos; la especial, de los indicados en la sentencia."],
    [S2, "Rehabilitación", "Recuperación de la condición de funcionario cuando desaparece la causa por la que se perdió."],
    [S3, "Situación administrativa", "Posición del funcionario respecto de su relación de servicio en cada momento (activo, excedencia, suspensión…), con sus efectos propios."],
    [S3, "Servicios especiales", "Situación del funcionario que ocupa un cargo político, institucional o internacional, con derecho a reingresar y a que el tiempo le compute."],
    [S4, "Servicio en otras Administraciones Públicas", "Situación del funcionario que obtiene destino en una Administración distinta de la suya por transferencia o por provisión de puestos."],
    [S5, "Excedencia por cuidado de familiares", "Excedencia de hasta tres años por cada hijo o familiar dependiente, que computa a efectos de trienios y Seguridad Social y reserva el puesto dos años."],
    [S5, "Excedencia por interés particular", "Excedencia voluntaria sin sueldo ni cómputo de antigüedad, que exige cinco años previos de servicios."],
    [S6, "Suspensión provisional", "Medida cautelar que aparta al funcionario de su puesto mientras se tramita un expediente disciplinario o un proceso penal."],
    [S6, "Reingreso", "Vuelta del funcionario al servicio activo desde otra situación administrativa."],
  ],
  casos: [
    {
      slug: "funcionaria-cuidado-hijo-excedencia",
      titulo: "Una funcionaria que quiere cuidar a su hijo",
      supuesto: "Una administrativa del Gobierno de Aragón, con siete años de servicio, tiene un hijo. Tras el permiso por nacimiento, quiere dejar de trabajar un tiempo para cuidarlo. Más adelante se plantea pedir una excedencia por interés particular para emprender un negocio.",
      preguntas: [
        [S5, "media", "Para cuidar a su hijo puede solicitar una excedencia por cuidado de familiares de hasta:", ["Tres años desde el nacimiento", "Un año", "Cinco años", "Seis meses"], "Art. 89.4 EBEP."],
        [S5, "media", "Durante esa excedencia, el tiempo computa a efectos de:", ["Trienios, carrera y Seguridad Social", "Nada", "Solo vacaciones", "Solo jubilación"], "Art. 89.4 EBEP."],
        [S5, "media", "Su puesto de trabajo se le reserva al menos durante:", ["Dos años; después, un puesto en la misma localidad y retribución", "Seis meses", "Tres años completos", "No hay reserva"], "Art. 89.4 EBEP."],
        [S5, "media", "Durante la excedencia por cuidado del hijo, ¿cobra sueldo?", ["No, aunque el tiempo le computa", "Sí, íntegro", "Sí, la mitad", "Sí, las básicas"], "Art. 89.4 EBEP (no prevé retribuciones)."],
        [S5, "media", "¿Puede hacer cursos de formación de la Administración durante esa excedencia?", ["Sí", "No", "Solo si paga", "Solo en línea"], "Art. 89.4 EBEP."],
        [S5, "dificil", "Si durante esa excedencia tiene otro hijo y pide una nueva excedencia:", ["El inicio de la nueva pone fin a la que venía disfrutando", "Se suman ambas", "No puede pedirla", "Se aplaza hasta terminar la primera"], "Art. 89.4 EBEP."],
        [S5, "media", "Con siete años de servicio, ¿cumple el requisito general para la excedencia por interés particular?", ["Sí, se exigen cinco años de servicios inmediatamente anteriores", "No, se exigen diez", "No hay requisito", "Solo si es del grupo A"], "Art. 89.2 EBEP."],
        [S5, "media", "La concesión de la excedencia por interés particular:", ["Queda subordinada a las necesidades del servicio debidamente motivadas", "Es automática", "Requiere informe del Justicia", "Requiere autorización judicial"], "Art. 89.2 EBEP."],
        [S5, "media", "En excedencia por interés particular, el tiempo:", ["No computa para ascensos, trienios ni Seguridad Social", "Computa para todo", "Computa la mitad", "Solo computa para trienios"], "Art. 89.2 EBEP."],
        [S6, "media", "Para volver de la excedencia por interés particular deberá:", ["Solicitar el reingreso, que en Aragón se produce por los procedimientos de provisión", "Volver sin trámite", "Opositar de nuevo", "Esperar a ser llamada"], "Art. 91 EBEP y art. 33.2 DLeg 1/1991."],
      ],
    },
    {
      slug: "funcionario-alto-cargo-servicios-especiales",
      titulo: "Un funcionario nombrado alto cargo",
      supuesto: "Un funcionario del Cuerpo Ejecutivo, con destino definitivo en un servicio provincial, es nombrado director general en el Gobierno de Aragón. Cuatro años después cesa en el cargo. Un compañero, por su parte, obtiene por concurso un puesto en el Ayuntamiento de Huesca.",
      preguntas: [
        [S3, "media", "Al ser nombrado director general pasa a:", ["Servicios especiales", "Excedencia voluntaria", "Servicio activo en su puesto", "Suspensión"], "Art. 87.1.a) EBEP y art. 32.1 DLeg 1/1991."],
        [S3, "media", "Su puesto de destino definitivo:", ["Queda reservado", "Se pierde", "Se adjudica a un interino en propiedad", "Se suprime"], "Art. 32.1 DLeg 1/1991."],
        [S3, "media", "Mientras es director general cobra:", ["Las retribuciones del cargo más los trienios reconocidos", "Las de administrativo", "Ambas", "Nada"], "Art. 87.2 EBEP."],
        [S3, "media", "Los cuatro años como alto cargo le computan para:", ["Ascensos, trienios, promoción interna y Seguridad Social", "Nada", "Solo para jubilación", "Solo para vacaciones"], "Art. 87.2 EBEP."],
        [S3, "media", "Al cesar tiene derecho, al menos, a reingresar:", ["En la misma localidad, con las condiciones de la carrera consolidada", "En cualquier localidad que decida la Administración", "Solo tras una nueva oposición", "Solo como interino"], "Art. 87.3 EBEP."],
        [S3, "dificil", "En cuanto a la consolidación del grado y complementos, la ley garantiza a los funcionarios que han sido altos cargos:", ["Al menos el mismo tratamiento que se establezca para quienes han sido directores generales", "El grado 30 automático", "Nada especial", "El doble de trienios"], "Art. 87.3 EBEP."],
        [S4, "media", "El compañero que obtiene destino en el Ayuntamiento de Huesca queda, respecto de Aragón, en:", ["Servicio en otras Administraciones Públicas", "Servicios especiales", "Excedencia por interés particular", "Servicio activo"], "Art. 88.1 EBEP."],
        [S4, "media", "En el Ayuntamiento se regirá por:", ["La legislación de la Administración donde está destinado", "Solo la normativa aragonesa autonómica", "El convenio colectivo del Gobierno de Aragón", "El Código Civil"], "Art. 88.3 EBEP."],
        [S4, "media", "¿Puede seguir participando en concursos del Gobierno de Aragón?", ["Sí, conserva el derecho a participar en las convocatorias de su Administración de origen", "No", "Solo si renuncia al Ayuntamiento", "Solo en libre designación"], "Art. 88.3 EBEP."],
        [S4, "media", "Su tiempo de servicio en el Ayuntamiento computará:", ["Como servicio activo en su cuerpo de origen", "Como excedencia", "No computará", "Solo a efectos municipales"], "Art. 88.3 EBEP."],
      ],
    },
    {
      slug: "expediente-disciplinario-suspension",
      titulo: "Un funcionario expedientado",
      supuesto: "A un funcionario del Gobierno de Aragón se le abre expediente disciplinario por una posible falta muy grave y se acuerda su suspensión provisional. Al conocerlo, presenta su renuncia a la condición de funcionario. Meses después, el expediente concluye con una sanción de suspensión firme de dos años.",
      preguntas: [
        [S2, "media", "¿Puede aceptarse su renuncia mientras se tramita el expediente?", ["No", "Sí, siempre", "Sí, si lo pide por escrito", "Solo si el expediente es por falta leve"], "Art. 64.2 EBEP."],
        [S6, "media", "La suspensión provisional durante el expediente no puede exceder, salvo paralización imputable a él, de:", ["Seis meses", "Un año", "Tres meses", "Seis años"], "Art. 98.3 EBEP."],
        [S6, "media", "Durante la suspensión provisional cobrará:", ["Las retribuciones básicas y, en su caso, las prestaciones por hijo a cargo", "Todo su sueldo", "Nada", "El complemento específico"], "Art. 98.3 EBEP."],
        [S6, "media", "El tiempo de suspensión provisional:", ["Será de abono para cumplir la suspensión firme", "Se suma a la sanción", "Se pierde", "Se convierte en excedencia"], "Art. 98.4 EBEP."],
        [S6, "media", "Al imponerse la suspensión firme, debe devolver:", ["Lo percibido durante la suspensión provisional", "Nada", "El doble", "Solo los trienios"], "Art. 98.4 EBEP."],
        [S6, "media", "Como la suspensión firme (dos años) excede de seis meses, el funcionario:", ["Pierde su puesto de trabajo", "Conserva su puesto", "Pasa a servicios especiales", "Pierde la condición de funcionario"], "Art. 90.1 EBEP."],
        [S6, "media", "Durante la suspensión firme, ¿puede trabajar para otra Administración?", ["No", "Sí", "Solo como laboral", "Solo en otra comunidad"], "Art. 90.3 EBEP."],
        [S6, "media", "Cumplida la sanción, podrá reingresar:", ["A través de los procedimientos de provisión o, si es urgente, con destino provisional", "Directamente en su antiguo puesto", "Solo tras nueva oposición", "Nunca"], "Art. 33.2 DLeg 1/1991."],
        [S2, "dificil", "Si en lugar de suspensión se le hubiera impuesto la separación del servicio firme:", ["Habría perdido la condición de funcionario de carrera", "Pasaría a excedencia", "Quedaría suspenso seis años", "Pasaría a interino"], "Art. 63.d) EBEP."],
        [S2, "media", "En Aragón, la propuesta de separación definitiva del servicio la decide:", ["El Gobierno de Aragón", "El instructor", "El jefe de servicio", "La Junta de Personal"], "Art. 11.2.l) DLeg 1/1991."],
      ],
    },
  ],
});
