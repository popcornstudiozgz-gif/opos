/**
 * Crea tema-404 — Tema 32 de Administrativo DGA (tema 27 del programa de
 * materias específicas): "Retribuciones de los funcionarios públicos y del
 * personal laboral de las Administraciones Públicas. Nóminas: estructura y
 * normas de confección. Altas y bajas; su justificación. Conceptos
 * retributivos. Devengo y liquidación de derechos económicos. Pago de las
 * retribuciones del personal en activo. Formas de pago."
 *
 * Fuentes (textos consolidados leídos en esta sesión en la API del BOE):
 * - RDLeg 5/2015, EBEP (BOE-A-2015-11719): arts. 21-27 y 30.
 * - DLeg 1/1991, Función Pública de Aragón (BOA-d-1991-90001): art. 48 y
 *   DA 11.ª (ya verificados en el tema-391, que desarrolla los conceptos
 *   retributivos; aquí solo se resumen).
 * - RDLeg 2/2015, Estatuto de los Trabajadores (BOE-A-2015-11430): arts.
 *   26, 29 y 31.
 * - Ley 33/1987, de PGE para 1988 (BOE-A-1987-28404): arts. 33 (pagas
 *   extraordinarias) y 34 (devengo de retribuciones), vigentes para los
 *   funcionarios del Estado.
 * - Orden de 30 de julio de 1992, sobre instrucciones para la confección de
 *   nóminas (BOE-A-1992-19493): apdos. 1-8 (altas, bajas, modificaciones,
 *   modelos, cierre el día 5, liquidación por treintavos).
 * - DLeg 3/2023, TR Ley de Hacienda de Aragón (BOE-A-2023-14052): arts. 39.2
 *   y 86 (atrasos y medios de pago).
 * LAGUNA: la Ley 33/1987 y la Orden de 1992 son normas de la Administración
 * del Estado. No se ha localizado en el BOA (búsqueda por título "nóminas",
 * "confección de nóminas", "devengo de retribuciones") una norma aragonesa
 * propia equivalente; el tema las presenta como el modelo normativo de
 * referencia y lo advierte, sin afirmar que rijan directamente en la DGA.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-404-retribuciones-nominas.mjs
 */
import { sembrarTema, ADMIN_DGA } from "./lib/sembrar-tema.mjs";

const EBEP = "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11719";
const ET = "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430";
const L33 = "https://www.boe.es/buscar/act.php?id=BOE-A-1987-28404";
const ONOM = "https://www.boe.es/buscar/act.php?id=BOE-A-1992-19493";
const LHA = "https://www.boe.es/buscar/act.php?id=BOE-A-2023-14052";
const LOFPA = "https://www.boe.es/buscar/act.php?id=BOA-d-1991-90001";
const S1 = "retribuciones-funcionarios-laborales";
const S2 = "estructura-nomina";
const S3 = "altas-bajas-nomina";
const S4 = "modificaciones-nomina";
const S5 = "devengo-liquidacion";
const S6 = "pago-formas-pago";

await sembrarTema({
  tema: {
    slug: "tema-404",
    titulo: "Retribuciones del personal de las Administraciones y nóminas: estructura, altas y bajas, conceptos retributivos, devengo, liquidación y formas de pago",
    descripcion: "Retribuciones de los funcionarios (básicas, complementarias y pagas extraordinarias; límites de la ley de presupuestos; interinos y funcionarios en prácticas; deducción de haberes) y del personal laboral (salario, estructura, recibo de salarios, gratificaciones extraordinarias). La nómina: concepto, estructura (cabecera, datos personales, retribuciones, deducciones, líquido), resúmenes y estados justificativos de variaciones. Altas, bajas y modificaciones en nómina y su justificación documental. Devengo por mensualidades completas referido al primer día hábil, supuestos de liquidación por días (treintavos), pagas extraordinarias de junio y diciembre. Pago de las retribuciones y medios de pago. Se toma como referencia la normativa estatal publicada (Ley 33/1987 y Orden de 30-07-1992), al no constar una norma aragonesa propia publicada.",
    contenido: "Cómo se hace y se lee una nómina en la Administración: qué conceptos lleva (sueldo, trienios, complementos, pagas extra), qué descuentos (IRPF, Seguridad Social, huelga o jornada no realizada), qué papeles justifican que alguien entre o salga de nómina, cuándo se cobra el mes completo y cuándo por días, y cómo se paga.",
    enlaces_boe: [
      { url: EBEP, titulo: "Real Decreto Legislativo 5/2015, texto refundido del EBEP, arts. 21-30 (BOE-A-2015-11719)" },
      { url: ET, titulo: "Real Decreto Legislativo 2/2015, Estatuto de los Trabajadores, arts. 26-31 (BOE-A-2015-11430)" },
      { url: L33, titulo: "Ley 33/1987, de Presupuestos Generales del Estado para 1988, arts. 33-34: devengo de retribuciones (BOE-A-1987-28404)" },
      { url: ONOM, titulo: "Orden de 30 de julio de 1992, sobre instrucciones para la confección de nóminas (BOE-A-1992-19493)" },
      { url: LOFPA, titulo: "Decreto Legislativo 1/1991, Ley de Ordenación de la Función Pública de Aragón (BOA-d-1991-90001)" },
      { url: LHA, titulo: "Decreto Legislativo 3/2023, texto refundido de la Ley de Hacienda de Aragón (BOE-A-2023-14052)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "Retribuciones de funcionarios y personal laboral; conceptos retributivos", articulos: "arts. 21-27 y 30 EBEP; art. 48 DLeg 1/1991; arts. 26 y 31 ET", url: `${EBEP}#a22` },
      { seccion: S2, titulo: "La nómina: estructura y normas de confección", articulos: "apdos. 5-8 Orden de 30-07-1992; art. 29.1 ET", url: ONOM },
      { seccion: S3, titulo: "Altas y bajas en nómina y su justificación", articulos: "apdos. 2-3 Orden de 30-07-1992", url: ONOM },
      { seccion: S4, titulo: "Modificaciones en nómina", articulos: "apdo. 4 Orden de 30-07-1992", url: ONOM },
      { seccion: S5, titulo: "Devengo y liquidación de los derechos económicos", articulos: "arts. 33-34 Ley 33/1987; apdo. 8 Orden de 30-07-1992; art. 39.2 LHA", url: L33 },
      { seccion: S6, titulo: "Pago de las retribuciones y formas de pago", articulos: "art. 86 LHA; art. 29 ET", url: `${LHA}#a8-8` },
    ],
  },
  vinculo: { oposicion: ADMIN_DGA.oposicion, bloqueId: ADMIN_DGA.bloquePresupuesto, numero: 32 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Límites presupuestarios (art. 21 EBEP)", "Las cuantías de las básicas y el incremento de las complementarias y de la masa salarial laboral se fijan en cada ley de presupuestos, sin superar los límites de la Ley de PGE"],
        ["Clases (art. 22.1-3 EBEP)", "Básicas (por subgrupo y antigüedad: sueldo y trienios) y complementarias (características del puesto, carrera y desempeño)"],
        ["Pagas extraordinarias (art. 22.4 EBEP)", "Dos al año, cada una con una mensualidad de básicas y de todas las complementarias, salvo productividad y gratificaciones"],
        ["Conceptos en Aragón (art. 48 DLeg 1/1991)", "Sueldo y trienios; complemento de destino (nivel), específico (puesto, con posible componente variable por turnicidad o nocturnidad) y productividad; gratificaciones por servicios extraordinarios"],
        ["Prohibición (art. 22.5 EBEP)", "No se puede percibir participación en tributos, multas u otros ingresos como contraprestación de un servicio"],
        ["Funcionarios en prácticas (art. 26 EBEP)", "Como mínimo, el sueldo del subgrupo al que aspiran"],
        ["Deducción de haberes (art. 30 EBEP)", "La jornada no realizada y el tiempo de huelga dan lugar a deducción proporcional, que no es sanción"],
        ["Salario del laboral (art. 26 ET)", "Percepciones en dinero o especie por el trabajo (especie máximo 30 %); salario base y complementos según convenio; no son salario las indemnizaciones, suplidos ni prestaciones de la Seguridad Social"],
        ["Gratificaciones extraordinarias del laboral (art. 31 ET)", "Dos al año, una en Navidad y otra cuando fije el convenio; pueden prorratearse por convenio"],
      ],
      preguntas: [
        ["media", "Las retribuciones básicas de los funcionarios comprenden:", ["Sueldo y trienios", "Complemento de destino y específico", "Productividad y gratificaciones", "Indemnizaciones por razón del servicio"], "Art. 22.2 y 23 EBEP."],
        ["media", "Las pagas extraordinarias no incluyen:", ["El complemento de productividad ni las gratificaciones", "El sueldo", "Los trienios", "El complemento de destino"], "Art. 22.4 EBEP."],
        ["media", "La deducción de haberes por jornada no realizada:", ["No tiene carácter sancionador", "Es una sanción disciplinaria", "Requiere expediente disciplinario", "Está prohibida"], "Art. 30.1 EBEP."],
        ["media", "Los funcionarios en prácticas perciben, como mínimo:", ["El sueldo del subgrupo al que aspiran", "El salario mínimo", "Nada", "Lo mismo que un alto cargo"], "Art. 26 EBEP."],
        ["dificil", "Según el Estatuto de los Trabajadores, el salario en especie no puede superar:", ["El 30 % de las percepciones salariales", "El 50 %", "El 10 %", "El 20 %"], "Art. 26.1 ET."],
        ["media", "Las dietas por desplazamiento de un trabajador laboral:", ["No tienen la consideración de salario", "Son salario base", "Son complemento salarial", "Son gratificación extraordinaria"], "Art. 26.2 ET."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Nómina", "Documento que relaciona a los perceptores, sus retribuciones, deducciones y líquido a percibir en un mes; soporte del reconocimiento de la obligación de pago del personal"],
        ["Advertencia de fuente", "Las instrucciones publicadas sobre confección de nóminas son las de la Administración del Estado (Orden de 30-07-1992); en Aragón la nómina se gestiona con el sistema de recursos humanos SIRHGA, sin norma de confección propia localizada en el BOA"],
        ["Documentos de la nómina (Orden 1992, 5)", "Cuerpo de la nómina (modelo N1), resúmenes (RN, RRD, RRX, REN) y estados justificativos de variaciones de retribuciones (VR1-VR4) y deducciones (VD1-VD4)"],
        ["Cabecera (Orden 1992, 5.1.2)", "Ministerio u organismo, habilitación, clase de nómina (funcionarios, laborales…), número, mes y año, habilitado, periodo de liquidación y presupuesto"],
        ["Orden de los perceptores (Orden 1992, 5.1.1)", "Alfabético de apellidos y nombre, numerados correlativamente"],
        ["Datos personales (Orden 1992, 5.1.3)", "Nombre, DNI y número de Registro de personal; para funcionarios, clase, trienios, cuerpo, grupo, nivel, grado y puesto; para laborales, contrato, convenio, categoría y nivel"],
        ["Cierre (Orden 1992, 6)", "Las nóminas ordinarias de cada mes se cierran el día 5 de dicho mes"],
        ["Recibo de salarios (art. 29.1 ET)", "Al laboral se le entrega un recibo individual y justificativo del pago, con claridad y separación de percepciones y deducciones"],
        ["Deducciones habituales", "Retención a cuenta del IRPF, cotizaciones del trabajador a la Seguridad Social o mutualismo, y descuentos por huelga o jornada no realizada (art. 30 EBEP)"],
      ],
      preguntas: [
        ["media", "Según las instrucciones de 1992, las nóminas ordinarias de cada mes se cierran el día:", ["5 de dicho mes", "1 del mes", "15 del mes", "Último día del mes"], "Orden de 30-07-1992, apdo. 6."],
        ["media", "En la nómina, los perceptores se ordenan:", ["Alfabéticamente por apellidos y nombre", "Por antigüedad", "Por nivel", "Por fecha de nacimiento"], "Orden de 30-07-1992, apdo. 5.1.1."],
        ["media", "El documento que se entrega al trabajador laboral para justificar el pago es:", ["El recibo individual de salarios", "El contrato", "La vida laboral", "El certificado de retenciones"], "Art. 29.1 ET."],
        ["dificil", "Los estados VR1 a VR4 recogen:", ["Las variaciones mensuales de retribuciones (altas, bajas, modificaciones y resumen)", "Las vacaciones", "Las deducciones de IRPF anuales", "Los trienios de toda la plantilla"], "Orden de 30-07-1992, apdo. 5."],
        ["media", "Es una deducción habitual en la nómina:", ["La retención a cuenta del IRPF", "El complemento de destino", "El trienio", "La paga extraordinaria"], "Doctrina de gestión de nóminas; art. 26.4 ET."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Alta en nómina (Orden 1992, 2)", "Inclusión de un perceptor que no figuraba en la nómina del mes anterior; se justifica documentalmente"],
        ["Alta de funcionario de nuevo ingreso (2.1)", "Título administrativo, nombramiento para el puesto y diligencia de toma de posesión"],
        ["Alta con servicios previos (2.2)", "Además, liquidación de trienios basada en certificaciones de servicios prestados"],
        ["Alta por traslado o cambio de destino (2.4-2.6)", "Nombramiento y toma de posesión (o documento conjunto de cese y nombramiento) y certificado de baja en la nómina de origen"],
        ["Alta de interinos y en prácticas (2.9)", "Hoja de servicios (interinos), nombramiento y toma de posesión o inicio de las prácticas"],
        ["Alta de laboral de nuevo ingreso (2.10)", "Hoja de servicios, contrato laboral y copia del expediente de contratación fiscalizado"],
        ["Baja en nómina (Orden 1992, 3)", "Exclusión de un perceptor que figuraba en la nómina del mes anterior"],
        ["Causas de baja (3)", "Cambio de puesto (cese y su formalización), cambio de situación administrativa, jubilación, pérdida de la condición de funcionario (fallecimiento, renuncia, separación), licencia sin sueldo y bajas de laborales"],
      ],
      preguntas: [
        ["media", "Un alta en nómina es:", ["La inclusión de un perceptor que no figuraba en la nómina del mes anterior", "Un aumento de sueldo", "Una baja médica", "El cobro de una paga extra"], "Orden de 30-07-1992, apdo. 2."],
        ["media", "Para el alta de un funcionario de carrera de nuevo ingreso se une, entre otros:", ["El documento de toma de posesión", "El contrato laboral", "El certificado de baja médica", "La declaración de la renta"], "Orden de 30-07-1992, apdo. 2.1."],
        ["media", "Para el alta de un funcionario procedente de traslado se exige además:", ["El certificado de baja en la nómina de origen", "Un nuevo título administrativo", "Un examen médico", "Nada"], "Orden de 30-07-1992, apdo. 2.4-2.6."],
        ["dificil", "Para el alta de un laboral de nuevo ingreso se une copia del:", ["Plan o expediente de contratación sobre el que se fiscalizó el gasto", "Presupuesto general", "Convenio de otra Administración", "Título universitario siempre"], "Orden de 30-07-1992, apdo. 2.10.c)."],
        ["media", "La jubilación de un funcionario produce:", ["Su baja en nómina, justificada con el acuerdo de jubilación y la formalización del cese", "Un alta", "Una modificación transitoria", "Ningún efecto en nómina"], "Orden de 30-07-1992, apdo. 3.3."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Modificación en nómina (Orden 1992, 4)", "Aumento o disminución de retribuciones o deducciones de un perceptor respecto del mes anterior"],
        ["Definitivas y transitorias", "Definitivas: persisten en nóminas futuras (trienio, cambio de nivel); transitorias: no persisten (productividad puntual, huelga)"],
        ["Aumentos definitivos (4.1.1)", "Reconocimiento de trienios o de grado, cambio de puesto, reclasificación o cambio de nivel, reincorporación tras licencia o reducción de jornada, subidas de la ley de presupuestos o del convenio"],
        ["Aumentos transitorios (4.1.2)", "Productividad y gratificaciones (certificación de la autoridad), pagas extraordinarias (certificación global del habilitado) y atrasos"],
        ["Disminuciones definitivas (4.2.1)", "Excedencia forzosa, suspensión provisional, licencias parcialmente retribuidas, reducción de jornada"],
        ["Disminuciones transitorias (4.2.2)", "Huelga (certificación del personal y tiempo) y licencias no retribuidas o parcialmente retribuidas"],
        ["Atrasos (4.1.2.4)", "Haberes de periodos anteriores derivados de un alta o aumento definitivo; si van en nómina posterior, certificación de que no se incluyeron antes"],
      ],
      preguntas: [
        ["media", "El reconocimiento de un nuevo trienio es una modificación:", ["Definitiva (aumento)", "Transitoria", "Una baja", "Un alta"], "Orden de 30-07-1992, apdo. 4.1.1.3.a)."],
        ["media", "El descuento por un día de huelga es una:", ["Disminución transitoria", "Disminución definitiva", "Baja en nómina", "Sanción disciplinaria"], "Orden de 30-07-1992, apdo. 4.2.2.1; art. 30.2 EBEP."],
        ["media", "El abono de la productividad de un trimestre se justifica con:", ["Certificación expedida por la autoridad competente", "El contrato", "El título administrativo", "Nada"], "Orden de 30-07-1992, apdo. 4.1.2.1.a)."],
        ["dificil", "Una reducción de jornada por cuidado de un hijo supone una:", ["Disminución definitiva mientras dure, justificada con el acuerdo de reducción", "Baja en nómina", "Disminución transitoria de un día", "No afecta a la nómina"], "Orden de 30-07-1992, apdo. 4.2.1.3."],
        ["media", "Las pagas extraordinarias se justifican con:", ["Una certificación global del habilitado del derecho a percibirlas", "Un decreto-ley", "Una resolución judicial", "Nada"], "Orden de 30-07-1992, apdo. 4.1.2.3."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["Devengo mensual (art. 34 Ley 33/1987)", "Las retribuciones fijas y mensuales se abonan por mensualidades completas según la situación del funcionario el primer día hábil del mes"],
        ["Liquidación por días (art. 34 Ley 33/1987)", "En el mes de toma de posesión del primer destino, reingreso o fin de licencia sin sueldo; en el de inicio de licencia sin sueldo; en el de cambio a otra Administración; en el de cese en el servicio activo (salvo fallecimiento, jubilación o retiro)"],
        ["Cálculo diario (Orden 1992, 8)", "Cuando se liquida por días, el importe diario es un treintavo del importe mensual"],
        ["Pagas extraordinarias (art. 33 Ley 33/1987)", "Se devengan el primer día hábil de junio y diciembre según la situación en esa fecha; si no se han prestado los seis meses completos, se reducen proporcionalmente por días"],
        ["Licencia sin sueldo y paga extra (art. 33.b Ley 33/1987)", "Se devenga la paga, pero reducida proporcionalmente"],
        ["Cese y paga extra (art. 33.d Ley 33/1987)", "La última paga se devenga el día del cese, en proporción al tiempo servido; en jubilación o fallecimiento, el mes del cese se computa completo"],
        ["Atrasos (art. 39.2.a LHA)", "Los atrasos de retribuciones del personal se imputan al ejercicio vigente cuando se expiden las órdenes de pago"],
        ["Advertencia de fuente", "La Ley 33/1987 regula a los funcionarios del Estado; es el referente normativo publicado del devengo, sin que se haya localizado norma aragonesa propia en el BOA"],
      ],
      preguntas: [
        ["media", "Con carácter general, las retribuciones mensuales de los funcionarios se devengan:", ["Por mensualidades completas según la situación el primer día hábil del mes", "Por días siempre", "Por semanas", "Al final de cada trimestre"], "Art. 34 Ley 33/1987."],
        ["media", "En el mes de toma de posesión del primer destino, las retribuciones se liquidan:", ["Por días", "Por mes completo", "No se cobran", "Al doble"], "Art. 34.a) Ley 33/1987."],
        ["media", "Cuando se liquida por días, el importe diario es:", ["Un treintavo del importe mensual", "Un treinta y unavo", "Un trescientos sesenta y cincoavo del anual", "Un veintidosavo"], "Orden de 30-07-1992, apdo. 8."],
        ["media", "Las pagas extraordinarias se devengan el primer día hábil de:", ["Junio y diciembre", "Enero y julio", "Marzo y septiembre", "Abril y octubre"], "Art. 33 Ley 33/1987."],
        ["dificil", "Si un funcionario se jubila el día 10, el mes del cese se computa para la paga extraordinaria:", ["Como mes completo", "Solo diez días", "No se computa", "Como medio mes"], "Art. 33.d) Ley 33/1987."],
        ["dificil", "Si un funcionario ingresó el 1 de marzo, la paga extraordinaria de junio:", ["Se reduce proporcionalmente por no haber prestado los seis meses", "Se cobra completa", "No se cobra", "Se cobra doble"], "Art. 33.a) Ley 33/1987."],
      ],
    },
    {
      seccion: S6,
      flashcards: [
        ["Pago del personal en activo", "La nómina se aprueba y se tramita como reconocimiento de la obligación; el pago lo realiza la Tesorería por orden del ordenador de pagos"],
        ["Medios de pago de la Tesorería (art. 86.3 LHA)", "Transferencia, cheque, efectivo, domiciliación y otros autorizados, excepto tarjeta de crédito"],
        ["Forma habitual", "Transferencia bancaria a la cuenta del perceptor"],
        ["Periodicidad del salario laboral (art. 29.1 ET)", "Puntual y documentada; el periodo de las retribuciones periódicas no puede exceder de un mes; derecho a anticipos a cuenta del trabajo realizado"],
        ["Medios en el ámbito laboral (art. 29.4 ET)", "Moneda de curso legal, cheque u otra modalidad a través de entidades de crédito, previo informe a la representación de los trabajadores"],
        ["Interés por mora salarial (art. 29.3 ET)", "El diez por ciento de lo adeudado"],
        ["Anticipos de retribuciones (art. 88.3 LHA)", "El titular de hacienda puede conceder anticipos relativos a retribuciones del personal con los límites reglamentarios"],
      ],
      preguntas: [
        ["media", "La forma habitual de pago de la nómina del personal es:", ["La transferencia bancaria", "El efectivo en ventanilla", "La tarjeta de crédito", "El pagaré"], "Art. 86.3 LHA."],
        ["media", "La Tesorería de la Comunidad no puede pagar obligaciones con:", ["Tarjeta de crédito", "Transferencia", "Cheque", "Domiciliación"], "Art. 86.3 LHA."],
        ["media", "El periodo de abono de las retribuciones periódicas de un laboral no puede exceder de:", ["Un mes", "Tres meses", "Una semana", "Seis meses"], "Art. 29.1 ET."],
        ["dificil", "El interés por mora en el pago del salario es:", ["El diez por ciento de lo adeudado", "El interés legal del dinero", "El cinco por ciento", "El veinte por ciento"], "Art. 29.3 ET."],
        ["media", "Los anticipos relativos a retribuciones de personal puede concederlos:", ["El titular del departamento de hacienda, con los límites reglamentarios", "Cualquier jefe de servicio", "El Pleno de las Cortes", "La Cámara de Cuentas"], "Art. 88.3 LHA."],
      ],
    },
  ],
  glosario: [
    [S1, "Masa salarial", "Conjunto de retribuciones del personal laboral cuyo incremento limita la ley de presupuestos."],
    [S1, "Deducción de haberes", "Descuento proporcional por jornada no realizada o huelga, sin carácter sancionador."],
    [S2, "Nómina", "Documento mensual que recoge perceptores, retribuciones, deducciones y líquido a pagar."],
    [S2, "Habilitado", "Responsable de la confección y pago de la nómina en una habilitación de personal."],
    [S2, "Líquido", "Importe neto que cobra el perceptor: retribuciones íntegras menos deducciones."],
    [S3, "Alta en nómina", "Inclusión de un perceptor que no figuraba en la nómina anterior."],
    [S3, "Baja en nómina", "Exclusión de un perceptor que sí figuraba en la nómina anterior."],
    [S4, "Atrasos", "Retribuciones de meses anteriores que se abonan en una nómina posterior."],
    [S5, "Devengo", "Momento en que nace el derecho a percibir una retribución."],
    [S5, "Liquidación por días", "Cálculo de la retribución a razón de un treintavo mensual por día de servicio."],
  ],
  casos: [
    {
      slug: "alta-nuevo-funcionario-nomina",
      titulo: "La primera nómina de un nuevo administrativo",
      supuesto: "Laura aprueba la oposición de Administrativo y toma posesión de su primer destino el 16 de marzo. Antes había trabajado tres años como funcionaria de carrera en otro cuerpo de otra Administración. Su habilitación debe darle de alta y calcular su nómina de marzo y la paga extraordinaria de junio.",
      preguntas: [
        [S3, "media", "Su inclusión en la nómina de marzo es:", ["Un alta", "Una baja", "Una modificación transitoria", "Un atraso"], "Orden de 30-07-1992, apdo. 2."],
        [S3, "media", "Para el alta se une, entre otros, su:", ["Toma de posesión", "Contrato laboral", "Certificado de huelga", "Declaración de la renta"], "Orden de 30-07-1992, apdo. 2.1."],
        [S3, "media", "Por sus servicios previos se aportará además:", ["La liquidación de trienios con certificación de servicios prestados", "Nada", "Un informe médico", "Una carta de recomendación"], "Orden de 30-07-1992, apdo. 2.2."],
        [S5, "media", "Su retribución de marzo se liquida:", ["Por días, desde la toma de posesión", "Por el mes completo", "No se paga hasta abril", "Al doble"], "Art. 34.a) Ley 33/1987."],
        [S5, "media", "Para calcularla, cada día equivale a:", ["Un treintavo del importe mensual", "Un veintidosavo", "Un trescientos sesenta y cincoavo", "Un día laborable"], "Orden de 30-07-1992, apdo. 8."],
        [S5, "media", "La paga extraordinaria de junio se le abonará:", ["Reducida proporcionalmente por no completar los seis meses", "Completa", "No le corresponde", "Duplicada"], "Art. 33.a) Ley 33/1987."],
        [S1, "media", "Sus retribuciones básicas son:", ["Sueldo y trienios del subgrupo C1", "Complemento de destino y específico", "Productividad", "Gratificaciones"], "Arts. 22-23 EBEP."],
        [S1, "media", "El complemento ligado al nivel de su puesto es el de:", ["Destino", "Específico", "Productividad", "Antigüedad"], "Art. 48 DLeg 1/1991."],
        [S6, "media", "Su nómina se le pagará habitualmente por:", ["Transferencia bancaria", "Efectivo", "Tarjeta de crédito", "Pagaré"], "Art. 86.3 LHA."],
        [S5, "media", "Desde abril, sus retribuciones se devengarán:", ["Por mensualidades completas según su situación el primer día hábil", "Por días", "Trimestralmente", "Semanalmente"], "Art. 34 Ley 33/1987."],
      ],
    },
    {
      slug: "variaciones-nomina-servicio",
      titulo: "Las variaciones del mes en una habilitación",
      supuesto: "En una habilitación se preparan las variaciones de la nómina de noviembre: un funcionario cumple un nuevo trienio, otro hace un día de huelga, una funcionaria obtiene una reducción de jornada, se abona la productividad del trimestre y un funcionario se traslada a otro departamento con su propia habilitación.",
      preguntas: [
        [S4, "media", "El nuevo trienio es una modificación:", ["Definitiva de aumento", "Transitoria", "Baja", "Alta"], "Orden de 30-07-1992, apdo. 4.1.1.3."],
        [S4, "media", "Se justifica con:", ["El acuerdo de reconocimiento del trienio", "Una nómina anterior", "El título universitario", "Nada"], "Orden de 30-07-1992, apdo. 4.1.1.3.a)."],
        [S4, "media", "El día de huelga produce:", ["Una disminución transitoria", "Una baja definitiva", "Un alta", "Un aumento"], "Orden de 30-07-1992, apdo. 4.2.2.1."],
        [S1, "media", "Ese descuento por huelga:", ["No es una sanción ni afecta a sus prestaciones sociales", "Es una sanción", "Exige expediente disciplinario", "Está prohibido"], "Art. 30.2 EBEP."],
        [S4, "media", "La reducción de jornada es una disminución:", ["Definitiva mientras dure", "Transitoria de un día", "Una baja", "Un alta"], "Orden de 30-07-1992, apdo. 4.2.1.3."],
        [S4, "media", "La productividad del trimestre es un aumento:", ["Transitorio, justificado con certificación de la autoridad competente", "Definitivo", "Una baja", "Un alta"], "Orden de 30-07-1992, apdo. 4.1.2.1."],
        [S3, "media", "El funcionario trasladado causa en esta habilitación:", ["Una baja", "Un alta", "Una modificación transitoria", "Ningún movimiento"], "Orden de 30-07-1992, apdo. 3.1."],
        [S3, "media", "La habilitación de destino le dará de alta con, entre otros:", ["El certificado de baja en la nómina de origen", "Un nuevo título", "Una nueva oposición", "Un contrato"], "Orden de 30-07-1992, apdo. 2.6."],
        [S2, "dificil", "Todas estas variaciones se reflejan en los estados justificativos:", ["VR (retribuciones) y VD (deducciones)", "RC y AD", "MC y K", "PR y MD"], "Orden de 30-07-1992, apdo. 5."],
        [S2, "media", "La nómina ordinaria de noviembre se cierra, según las instrucciones de 1992, el día:", ["5 de noviembre", "30 de noviembre", "1 de diciembre", "15 de noviembre"], "Orden de 30-07-1992, apdo. 6."],
      ],
    },
    {
      slug: "laboral-recibo-salario-pagas",
      titulo: "La nómina de un trabajador laboral",
      supuesto: "Un oficial de mantenimiento laboral de la DGA revisa su recibo de salarios: aparecen el salario base, complementos de convenio, una dieta por un desplazamiento, la retención de IRPF y su cotización a la Seguridad Social. Pregunta cuántas pagas extra tiene, si puede pedir un anticipo y qué pasa si se retrasa el pago.",
      preguntas: [
        [S1, "media", "La estructura de su salario la determina:", ["El convenio colectivo o, en su defecto, el contrato", "El Código Civil", "La Cámara de Cuentas", "Él mismo"], "Art. 26.3 ET."],
        [S1, "media", "La dieta por desplazamiento:", ["No es salario: es una indemnización o suplido", "Es salario base", "Es una paga extra", "Es complemento de antigüedad"], "Art. 26.2 ET."],
        [S1, "media", "Tiene derecho a gratificaciones extraordinarias:", ["Dos al año, una en Navidad y otra cuando fije el convenio", "Una al año", "Tres al año", "Ninguna"], "Art. 31 ET."],
        [S2, "media", "El recibo que se le entrega debe:", ["Separar con claridad percepciones y deducciones", "Indicar solo el líquido", "Ser verbal", "Entregarse solo si lo pide"], "Art. 29.1 ET."],
        [S2, "media", "La cotización a la Seguridad Social que aparece en el recibo es una:", ["Deducción a cargo del trabajador", "Percepción", "Indemnización", "Paga extra"], "Art. 26.4 ET; art. 142.2 LGSS."],
        [S6, "media", "Puede pedir anticipos:", ["A cuenta del trabajo ya realizado", "Por cualquier cantidad futura", "No puede", "Solo en diciembre"], "Art. 29.1 ET."],
        [S6, "dificil", "Si el pago del salario se retrasa, el interés por mora es:", ["El diez por ciento de lo adeudado", "El interés legal", "Nada", "El cinco por ciento"], "Art. 29.3 ET."],
        [S1, "media", "Sus retribuciones como laboral de la Administración se rigen por:", ["La legislación laboral, el convenio y el contrato, con los límites de la ley de presupuestos", "Solo el EBEP", "La Ley 33/1987", "El Estatuto Marco"], "Art. 27 EBEP."],
        [S1, "media", "El incremento de la masa salarial del personal laboral se refleja en:", ["La ley de presupuestos de cada ejercicio", "El contrato individual", "La nómina de enero", "El convenio exclusivamente"], "Art. 21.1 EBEP."],
        [S6, "media", "Las pagas extraordinarias del laboral pueden, si lo acuerda el convenio:", ["Prorratearse en las doce mensualidades", "Suprimirse", "Pagarse en especie", "Convertirse en vacaciones"], "Art. 31 ET."],
      ],
    },
  ],
});
