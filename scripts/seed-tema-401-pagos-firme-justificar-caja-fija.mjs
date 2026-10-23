/**
 * Crea tema-401 — Tema 29 de Administrativo DGA (tema 24 del programa de
 * materias específicas): "Pagos: concepto y clasificación. Pagos por
 * ordenaciones presupuestarias: pagos por obligaciones de ejercicios
 * cerrados. Pago «en firme» y «a justificar». Los anticipos de caja fija."
 * (Texto del Anexo XXV truncado en el PDF; completado con el programa
 * publicado en el BOA de 19-07-2022, ya verificado al preparar la
 * oposición.)
 *
 * Fuentes:
 * - DLeg 3/2023, TR Ley de Hacienda de Aragón (BOE-A-2023-14052): arts.
 *   24, 39, 47, 49-52, 54 y 83-88 (API del BOE).
 * - Decreto 232/1999, de 22 de diciembre, del Gobierno de Aragón, por el
 *   que se regulan los anticipos de caja fija y los pagos a justificar
 *   (BOA núm. 166 de 30-12-1999), descargado del BOA y leído (arts. 1-14).
 * - Decreto 186/2005, de 26 de septiembre (BOA núm. 120 de 07-10-2005),
 *   que modifica sus arts. 4.5 (límite por pago: 3.750 €) y 11.3 (efectivo
 *   en caja: 375 €). No se han localizado en el BOA (búsqueda por título)
 *   modificaciones posteriores; las denominaciones de departamentos del
 *   decreto son las de 1999.
 * - Orden de 27 de diciembre de 1999, de desarrollo del Decreto 232/1999
 *   (BOA), localizada pero no utilizada en detalle.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-401-pagos-firme-justificar-caja-fija.mjs
 */
import { sembrarTema, ADMIN_DGA } from "./lib/sembrar-tema.mjs";

const LHA = "https://www.boe.es/buscar/act.php?id=BOE-A-2023-14052";
const D232 = "https://www.boa.aragon.es/cgi-bin/EBOA/BRSCGI?CMD=VEROBJ&MLKOB=418425454443&type=pdf";
const D186 = "https://www.boa.aragon.es/cgi-bin/EBOA/BRSCGI?CMD=VEROBJ&MLKOB=83902423232&type=pdf";
const S1 = "pagos-concepto-clasificacion";
const S2 = "pagos-ejercicios-cerrados";
const S3 = "pago-en-firme";
const S4 = "pagos-a-justificar";
const S5 = "anticipos-caja-fija";
const S6 = "tesoreria-cajas-pagadoras";

await sembrarTema({
  tema: {
    slug: "tema-401",
    titulo: "Los pagos: concepto y clasificación; pagos de ejercicios cerrados; pago en firme y a justificar; anticipos de caja fija",
    descripcion: "El pago como forma de extinción de las obligaciones y como fase del gasto; clasificación (presupuestarios y extrapresupuestarios; en firme y a justificar; del ejercicio corriente y de ejercicios cerrados). Pagos por obligaciones de ejercicios cerrados y su imputación. El pago en firme: justificación previa de la prestación. Pagos a justificar en Aragón (Decreto 232/1999): concepto, requisitos, plazo de tres meses ampliable a seis, reintegro. Anticipos de caja fija: provisiones extrapresupuestarias y permanentes para gastos periódicos, repetitivos o de menor cuantía; límite del 7 % del capítulo de bienes y servicios; pagos individuales de hasta 3.750 euros (Decreto 186/2005); reposición y aplicación al presupuesto. Cajas pagadoras, cuentas de provisiones de fondos, cuentas justificativas y control de la Intervención. Tesorería, medios de pago y anticipos de Tesorería.",
    contenido: "Cómo se paga en el Gobierno de Aragón: lo normal es el pago «en firme» (primero se acredita que el servicio se prestó y luego paga la Tesorería), pero hay dos excepciones con cajas pagadoras en los departamentos: los pagos «a justificar» (se adelanta el dinero y se justifica en tres meses) y los anticipos de caja fija (una caja permanente para gastos pequeños y repetitivos, de hasta 3.750 euros por pago).",
    enlaces_boe: [
      { url: LHA, titulo: "Decreto Legislativo 3/2023, texto refundido de la Ley de Hacienda de la Comunidad Autónoma de Aragón (BOE-A-2023-14052)" },
      { url: D232, titulo: "Decreto 232/1999, de 22 de diciembre, del Gobierno de Aragón, por el que se regulan los anticipos de caja fija y los pagos a justificar (BOA núm. 166, de 30-12-1999)" },
      { url: D186, titulo: "Decreto 186/2005, de 26 de septiembre, de modificación del Decreto 232/1999 (BOA núm. 120, de 07-10-2005)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "El pago: concepto y clasificación", articulos: "arts. 24, 47.d) y 51 LHA; art. 1 Decreto 232/1999", url: `${LHA}#a4-9` },
      { seccion: S2, titulo: "Pagos por obligaciones de ejercicios cerrados", articulos: "arts. 39.2 y 54 LHA", url: `${LHA}#a3-11` },
      { seccion: S3, titulo: "El pago en firme", articulos: "arts. 24.3, 49 y 51.1 LHA", url: `${LHA}#a5-3` },
      { seccion: S4, titulo: "Los pagos a justificar", articulos: "art. 51.2 y 4 LHA; arts. 6-8 Decreto 232/1999", url: D232 },
      { seccion: S5, titulo: "Los anticipos de caja fija", articulos: "art. 51.3 LHA; arts. 3-5 Decreto 232/1999; Decreto 186/2005", url: D232 },
      { seccion: S6, titulo: "Cajas pagadoras, cuentas justificativas y Tesorería", articulos: "arts. 2, 9-14 Decreto 232/1999; arts. 83-88 LHA", url: `${LHA}#a8-5` },
    ],
  },
  vinculo: { oposicion: ADMIN_DGA.oposicion, bloqueId: ADMIN_DGA.bloquePresupuesto, numero: 29 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Concepto de pago", "Forma habitual de extinguir las obligaciones de la Hacienda: cumplimiento al acreedor o a quien esté autorizado a recibirlo (preámbulo del Decreto 232/1999)"],
        ["Pago ordenado (art. 47.d LHA)", "Fase del gasto en que el ordenador de pagos expide la orden de pago contra la Tesorería respecto de una obligación reconocida"],
        ["Pago material", "Salida efectiva de fondos de la Tesorería, que tiene la función de pagar las obligaciones (art. 84.a LHA)"],
        ["Pagos presupuestarios y extrapresupuestarios", "Presupuestarios: se aplican a créditos del presupuesto; extrapresupuestarios: no se imputan en el momento (p. ej., la provisión de fondos de un anticipo de caja fija)"],
        ["Pagos en firme y a justificar", "En firme: con justificación previa de la prestación; a justificar: los justificantes no pueden aportarse antes de ordenar el pago"],
        ["Pagos del corriente y de cerrados", "Según la obligación pertenezca al ejercicio en curso o a ejercicios ya liquidados"],
        ["Provisiones de fondos (art. 1 Decreto 232/1999)", "Fondos librados a departamentos y organismos autónomos para gastos sin previa justificación: anticipos de caja fija (extrapresupuestarios) y pagos a justificar (presupuestarios)"],
      ],
      preguntas: [
        ["media", "El modo habitual de extinción de las obligaciones de la Hacienda aragonesa es:", ["El pago al acreedor", "La compensación", "La prescripción", "La condonación"], "Preámbulo del Decreto 232/1999."],
        ["media", "La provisión de fondos de un anticipo de caja fija tiene carácter:", ["Extrapresupuestario", "Presupuestario", "Patrimonial", "Tributario"], "Art. 1.2.a) y 3 Decreto 232/1999; art. 51.3 LHA."],
        ["media", "Los pagos a justificar se realizan:", ["Con cargo a los conceptos presupuestarios a los que se imputa el gasto", "Con fondos extrapresupuestarios", "Con fondos del Estado", "Sin ningún control"], "Art. 1.2.b) Decreto 232/1999."],
        ["media", "La función de pagar las obligaciones de la Comunidad corresponde a:", ["La Tesorería", "La Intervención General", "Las Cortes", "El servicio gestor"], "Art. 84.a) LHA."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Ejercicios cerrados (art. 54.2 LHA)", "Las obligaciones pendientes de pago al liquidar el presupuesto quedan afectadas a la Tesorería y se pagan después como obligaciones de presupuestos cerrados"],
        ["Imputación (art. 39.2.c LHA)", "Las obligaciones de ejercicios cerrados se imputan a los créditos del ejercicio vigente en el momento de expedir las órdenes de pago"],
        ["Otras imputaciones al corriente (art. 39.2 LHA)", "También los atrasos de retribuciones del personal y las obligaciones anteriores reconocidas con cargo a créditos ampliables"],
        ["Incorporación tras el pago (art. 39.3 LHA)", "Satisfechas las obligaciones del ejercicio anterior, pueden incorporarse remanentes o saldos de autorizaciones"],
        ["Prescripción de las obligaciones (art. 27 LHA)", "El derecho a exigir el pago de obligaciones reconocidas prescribe a los cuatro años desde la notificación del reconocimiento si no se reclama"],
        ["Bajas por prescripción (art. 27.3 LHA)", "Las obligaciones prescritas se dan de baja en cuentas previo expediente"],
      ],
      preguntas: [
        ["media", "Las obligaciones reconocidas y no pagadas a 31 de diciembre:", ["Quedan afectadas a la Tesorería como obligaciones de presupuestos cerrados", "Se anulan", "Se condonan", "Se trasladan al Estado"], "Art. 54.2 LHA."],
        ["media", "Las obligaciones de ejercicios cerrados se imputan:", ["A los créditos del ejercicio vigente al expedir la orden de pago", "Siempre al ejercicio en que nacieron", "A un crédito extraordinario", "A ninguna partida"], "Art. 39.2.c) LHA."],
        ["dificil", "El derecho del acreedor a exigir el pago de una obligación ya reconocida prescribe, si no lo reclama, a los:", ["Cuatro años desde la notificación del reconocimiento", "Cinco años", "Quince años", "Un año"], "Art. 27.1.b) LHA."],
        ["media", "Los atrasos de retribuciones del personal se imputan:", ["Al ejercicio vigente cuando se expiden las órdenes de pago", "Al ejercicio en que se devengaron", "A los presupuestos del Estado", "No se pagan"], "Art. 39.2.a) LHA."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Pago en firme", "Pago directo al acreedor por la Tesorería, ordenado por la Ordenación General de Pagos, tras acreditar documentalmente el derecho del acreedor o la prestación"],
        ["Justificación previa (art. 51.1 LHA)", "A las órdenes de pago se acompañan los documentos que acreditan la prestación o el derecho del acreedor, conforme a los acuerdos de autorización y compromiso"],
        ["Obligaciones recíprocas (art. 24.3 LHA)", "Si la obligación tiene por causa prestaciones o servicios, no puede pagarse hasta que el acreedor cumpla o garantice su obligación"],
        ["Ordenación de pagos (art. 49 LHA)", "Corresponde al titular de hacienda (Ordenación General de Pagos, delegable) y a las ordenaciones secundarias"],
        ["Plan de disposición de fondos (art. 50 LHA)", "Las órdenes de pago se ajustan al plan de disposición de fondos que pueda aprobar el Gobierno"],
        ["Medios de pago (art. 86.3 LHA)", "Transferencia, cheque, efectivo, domiciliación y otros autorizados, excepto tarjeta de crédito; la tarjeta de débito o prepago por cajero pagador requiere autorización"],
      ],
      preguntas: [
        ["media", "El pago en firme exige:", ["Acreditar antes de ordenar el pago la prestación o el derecho del acreedor", "Pagar antes de recibir el servicio", "Una caja pagadora", "Una ley"], "Art. 51.1 LHA."],
        ["media", "La Tesorería de la Comunidad no puede pagar obligaciones mediante:", ["Tarjeta de crédito", "Transferencia", "Cheque", "Domiciliación"], "Art. 86.3 LHA."],
        ["media", "Las órdenes de pago se ajustan, en su caso, al:", ["Plan de disposición de fondos", "Plan estratégico de subvenciones", "Calendario laboral", "Inventario"], "Art. 50 LHA."],
        ["dificil", "En una obligación derivada de un contrato de servicios, el pago no puede realizarse hasta que:", ["El acreedor haya cumplido o garantizado su obligación", "Pase un mes", "Lo autorice el Pleno de las Cortes", "Se cierre el ejercicio"], "Art. 24.3 LHA."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Pagos a justificar (art. 6 Decreto 232/1999)", "Cantidades que excepcionalmente se libran a cajas pagadoras cuando los justificantes no pueden aportarse antes de ordenar el pago"],
        ["Base legal (art. 51.2 LHA)", "Las órdenes de pago que no pueden acompañarse de los justificantes tienen el carácter de «a justificar», aplicándose a sus créditos"],
        ["Requisitos (art. 7 Decreto 232/1999)", "La Intervención General aprecia las circunstancias al fiscalizar el pago; justificación provisional con la resolución que lo motiva; no se libran nuevos fondos si hay justificaciones vencidas"],
        ["Plazo de justificación (art. 8.1 Decreto 232/1999)", "Tres meses desde la percepción de los fondos y, en todo caso, antes del último día hábil del ejercicio"],
        ["Ampliación del plazo (art. 8.2 Decreto 232/1999)", "El consejero de hacienda puede ampliarlo excepcionalmente hasta seis meses, dentro del ejercicio"],
        ["Falta de justificación (art. 8.3 Decreto 232/1999)", "Se exige el reintegro; si no se reintegra en quince días, se comunica al titular para exigir responsabilidades (Título VI LHA)"],
        ["Responsabilidad (art. 51.4 LHA)", "Los perceptores quedan obligados a justificar en plazo y sujetos al régimen de responsabilidades de la Ley de Hacienda"],
      ],
      preguntas: [
        ["media", "Los pagos a justificar se emplean cuando:", ["Los justificantes no pueden aportarse antes de ordenar el pago", "El gasto es periódico y repetitivo", "El acreedor lo prefiere", "El importe es superior a un millón"], "Art. 6 Decreto 232/1999."],
        ["media", "El plazo general para justificar un pago a justificar es de:", ["Tres meses desde la percepción, y antes del último día hábil del ejercicio", "Seis meses siempre", "Un año", "Quince días"], "Art. 8.1 Decreto 232/1999."],
        ["dificil", "Excepcionalmente, el plazo puede ampliarse hasta:", ["Seis meses, dentro del ejercicio", "Doce meses", "Nueve meses", "Dos años"], "Art. 8.2 Decreto 232/1999."],
        ["media", "Si transcurre el plazo sin justificar:", ["Se exige el reintegro", "Se condona la deuda", "Se amplía automáticamente", "Se archiva"], "Art. 8.3 Decreto 232/1999."],
        ["media", "No pueden expedirse nuevas órdenes a justificar a favor de una caja pagadora que:", ["Tenga pendientes justificaciones de fondos anteriores con plazo vencido", "Haya justificado todo", "Sea de un organismo autónomo", "Tenga cuenta en una entidad aragonesa"], "Art. 7.3 Decreto 232/1999."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["Anticipos de caja fija (art. 3 Decreto 232/1999)", "Provisiones de fondos extrapresupuestarias y permanentes a las cajas pagadoras para atender de inmediato gastos de menor cuantía y periódicos o repetitivos, y aplicarlos después al presupuesto del año"],
        ["Base legal (art. 51.3 LHA)", "Los gastos periódicos y repetitivos y los de menor cuantía pueden pagarse mediante anticipos de caja fija; se aplican al presupuesto al justificarse y, en todo caso, antes de fin de ejercicio"],
        ["Establecimiento (art. 4.1 Decreto 232/1999)", "Por acuerdo del titular del departamento u órgano competente del organismo autónomo"],
        ["Límite global (art. 4.2 Decreto 232/1999)", "No puede exceder del 7 % de los créditos del capítulo de gastos en bienes y servicios del departamento u organismo; la cuantía la fija el consejero de hacienda"],
        ["Límite por pago (art. 4.5, Decreto 186/2005)", "No pueden hacerse pagos individualizados superiores a 3.750 euros, ni fraccionar un gasto para eludir el límite"],
        ["Reposición (art. 5 Decreto 232/1999)", "El cajero rinde cuentas a medida que necesita reponer fondos y, necesariamente, el último día hábil del ejercicio; se expiden documentos contables a favor de la caja con imputación a las aplicaciones de los gastos"],
        ["Efectivo en caja (art. 11.3, Decreto 186/2005)", "Puede autorizarse efectivo para gastos de menor cuantía con el límite de 375 euros, ampliable excepcionalmente por orden razonada del consejero de hacienda"],
      ],
      preguntas: [
        ["media", "Los anticipos de caja fija son provisiones de fondos:", ["Extrapresupuestarias y permanentes", "Presupuestarias y puntuales", "Patrimoniales", "Del Estado"], "Art. 3 Decreto 232/1999."],
        ["media", "Con cargo al anticipo de caja fija no pueden realizarse pagos individualizados superiores a:", ["3.750 euros", "3.005,06 euros", "15.000 euros", "40.000 euros"], "Art. 4.5 Decreto 232/1999, en la redacción del Decreto 186/2005."],
        ["dificil", "La cuantía global de los anticipos de caja fija de un departamento no puede exceder del:", ["7 % de los créditos de su capítulo de gastos en bienes y servicios", "10 % de todo su presupuesto", "2 % del capítulo 1", "50 % del capítulo 6"], "Art. 4.2 Decreto 232/1999."],
        ["media", "El cajero pagador rinde cuentas de los anticipos de caja fija, como mínimo:", ["El último día hábil de cada ejercicio", "Cada cinco años", "Solo cuando se agota la caja", "Nunca"], "Art. 5.1 Decreto 232/1999."],
        ["media", "Un gasto de 5.000 euros dividido en dos facturas de 2.500 euros para pagarlo por caja fija:", ["No está permitido: no puede fraccionarse un único gasto", "Está permitido", "Requiere solo la firma del cajero", "Solo si el proveedor está de acuerdo"], "Art. 4.5 Decreto 232/1999."],
        ["dificil", "El efectivo en las cajas pagadoras para gastos de menor cuantía tiene un límite general de:", ["375 euros", "3.750 euros", "1.000 euros", "100 euros"], "Art. 11.3 Decreto 232/1999, en la redacción del Decreto 186/2005."],
      ],
    },
    {
      seccion: S6,
      flashcards: [
        ["Cajas pagadoras (art. 2 Decreto 232/1999)", "Reciben los fondos de ambas modalidades; al frente, un cajero pagador nombrado por el consejero; sus fondos forman parte de la Tesorería"],
        ["Cuentas de provisiones de fondos (art. 9 Decreto 232/1999)", "Una por departamento u organismo (salvo dependencias dispersas), autorizada por el consejero de hacienda previo informe de la Intervención General"],
        ["Ingresos en estas cuentas (art. 10 Decreto 232/1999)", "Solo de la Tesorería, salvo intereses, retrocesiones o correcciones; los intereses se ingresan en la Tesorería"],
        ["Disposición mancomunada (art. 11 Decreto 232/1999)", "Disponen conjuntamente el responsable de la unidad (SGT, director de servicio provincial o jefe del centro) y el cajero; dos personas facultadas"],
        ["Cuentas justificativas (art. 12 Decreto 232/1999)", "Las forma el cajero, las conforma el responsable de la unidad y se rinden a la Intervención General o sus intervenciones delegadas"],
        ["Fiscalización y aprobación (art. 13 Decreto 232/1999)", "La Intervención informa; alegaciones en quince días; aprobación o reparo por el titular del departamento; no se libran fondos a cajas incumplidoras"],
        ["Estados de situación (art. 14 Decreto 232/1999)", "Al menos trimestralmente (primeras quincenas de enero, abril, julio y octubre) y al cambiar el cajero"],
        ["Anticipos de Tesorería (art. 88 LHA)", "El Gobierno puede concederlos para gastos inaplazables hasta el 2 % de los créditos, entre otros supuestos con un crédito extraordinario o suplemento ya informado por la comisión de hacienda de las Cortes"],
      ],
      preguntas: [
        ["media", "El cajero pagador de un departamento lo nombra:", ["El consejero titular del departamento", "El Interventor General", "El Gobierno de Aragón", "La entidad bancaria"], "Art. 2.2 Decreto 232/1999."],
        ["media", "Las cuentas justificativas se rinden a:", ["La Intervención General o sus intervenciones delegadas", "Las Cortes", "La entidad bancaria", "El Tribunal Supremo"], "Art. 12.1 Decreto 232/1999."],
        ["media", "De las cuentas de provisiones de fondos se dispone:", ["De forma mancomunada por dos personas", "Por el cajero solo", "Por cualquier funcionario", "Por el proveedor"], "Art. 11.1 Decreto 232/1999."],
        ["dificil", "Los estados de situación de tesorería de las cajas pagadoras se formulan, como mínimo, en las primeras quincenas de:", ["Enero, abril, julio y octubre", "Cada mes", "Junio y diciembre", "Solo en enero"], "Art. 14.2 Decreto 232/1999."],
        ["media", "Los anticipos de Tesorería para gastos inaplazables tienen un límite máximo del:", ["2 % de los créditos del presupuesto", "7 % del capítulo 2", "30 % del límite de gasto", "50 % de los ingresos"], "Art. 88.1 LHA."],
        ["media", "Los fondos de las cajas pagadoras, mientras no se aplican a pagos:", ["Forman parte de la Tesorería de la Comunidad", "Son propiedad del cajero", "Pertenecen a la entidad bancaria", "Son fondos privados"], "Art. 2.4 y 10.5 Decreto 232/1999."],
      ],
    },
  ],
  glosario: [
    [S1, "Provisión de fondos", "Entrega de dinero a una caja pagadora para atender gastos antes de justificarlos."],
    [S2, "Obligación de ejercicio cerrado", "Obligación reconocida en un presupuesto ya liquidado y pendiente de pago."],
    [S3, "Pago en firme", "Pago directo al acreedor tras acreditar documentalmente la prestación."],
    [S4, "Pago a justificar", "Libramiento de fondos cuyos justificantes se presentan después del pago."],
    [S4, "Reintegro", "Devolución de fondos públicos no justificados o percibidos indebidamente."],
    [S5, "Anticipo de caja fija", "Fondo permanente extrapresupuestario para gastos pequeños, periódicos o repetitivos."],
    [S5, "Reposición de fondos", "Reintegro a la caja fija de lo gastado una vez justificado y aplicado al presupuesto."],
    [S6, "Caja pagadora", "Unidad de un departamento u organismo que gestiona los fondos de caja fija y a justificar."],
    [S6, "Cuenta justificativa", "Documento con las facturas y justificantes que acredita el destino de los fondos."],
    [S6, "Disposición mancomunada", "Firma conjunta de dos personas para mover fondos de una cuenta."],
  ],
  casos: [
    {
      slug: "caja-pagadora-servicio-provincial",
      titulo: "La caja pagadora de un servicio provincial",
      supuesto: "El Servicio Provincial de Teruel de un departamento tiene una caja pagadora con anticipo de caja fija. Durante el año paga material de oficina, pequeñas reparaciones, dietas de desplazamiento y suscripciones. Un día recibe una factura de 4.200 euros por la reparación de una caldera y el cajero propone pagarla en dos partes.",
      preguntas: [
        [S5, "media", "Los gastos de material y pequeñas reparaciones pueden pagarse por caja fija porque son:", ["Gastos de menor cuantía, periódicos o repetitivos", "Inversiones", "Subvenciones", "Gastos de personal fijo"], "Art. 3 Decreto 232/1999."],
        [S5, "media", "La factura de 4.200 euros:", ["No puede pagarse por caja fija ni fraccionarse para hacerlo", "Puede pagarse en dos partes", "Puede pagarse en efectivo", "Requiere solo la firma del cajero"], "Art. 4.5 Decreto 232/1999 (Decreto 186/2005)."],
        [S3, "media", "Esa factura debe pagarse por el procedimiento:", ["Ordinario, en firme, a través de la Tesorería", "De caja fija fraccionada", "De anticipo de Tesorería", "De reposición"], "Arts. 49 y 51.1 LHA."],
        [S6, "media", "El cajero pagador fue nombrado por:", ["El consejero titular del departamento", "El jefe de sección", "El Interventor", "El Gobierno de Aragón"], "Art. 2.2 Decreto 232/1999."],
        [S6, "media", "De la cuenta de provisiones de fondos disponen conjuntamente el cajero y:", ["El Director del Servicio Provincial", "Cualquier funcionario", "El proveedor", "El Interventor"], "Art. 11.1 Decreto 232/1999."],
        [S5, "media", "Cuando necesita fondos, el cajero rinde cuenta de lo gastado para obtener:", ["La reposición de fondos", "Un crédito extraordinario", "Un suplemento", "Una transferencia"], "Art. 5 Decreto 232/1999."],
        [S5, "media", "Con la reposición, los gastos se aplican:", ["A las aplicaciones presupuestarias que correspondan", "A una cuenta extrapresupuestaria indefinidamente", "Al presupuesto del Estado", "A ninguna partida"], "Art. 5.2 Decreto 232/1999."],
        [S5, "media", "Necesariamente, el cajero rendirá cuentas:", ["El último día hábil del ejercicio", "Cada cinco años", "Al jubilarse", "Solo si se lo pide la Intervención"], "Art. 5.1 Decreto 232/1999."],
        [S6, "media", "Las facturas de las cuentas justificativas deben tener fecha de expedición:", ["Dentro del ejercicio al que se imputan", "De cualquier año", "Posterior al cierre", "Anterior a tres años"], "Art. 12.3.a) Decreto 232/1999."],
        [S6, "dificil", "El efectivo en la caja para gastos menudos no puede superar, con carácter general:", ["375 euros", "3.750 euros", "1.500 euros", "50 euros"], "Art. 11.3 Decreto 232/1999 (Decreto 186/2005)."],
      ],
    },
    {
      slug: "pago-a-justificar-exposicion",
      titulo: "Un pago a justificar para una exposición itinerante",
      supuesto: "Un departamento organiza una exposición itinerante por varias comarcas y necesita disponer de fondos para pagar en el momento transportes, montajes y pequeños servicios cuyo importe exacto no conocerá hasta realizarlos. Se tramita un pago a justificar de 20.000 euros que se recibe el 1 de septiembre.",
      preguntas: [
        [S4, "media", "El pago a justificar procede porque:", ["Los justificantes no pueden aportarse antes de ordenar el pago", "El gasto es periódico", "La Tesorería no tiene fondos", "Lo prefiere el departamento"], "Art. 6 Decreto 232/1999."],
        [S4, "media", "Ese pago se aplica:", ["A los créditos presupuestarios del gasto", "A una cuenta extrapresupuestaria", "Al anticipo de caja fija", "A ingresos"], "Art. 1.2.b) y 7.2 Decreto 232/1999."],
        [S4, "media", "Aprecia que concurren las circunstancias, al fiscalizar el pago:", ["La Intervención General", "El cajero", "El proveedor", "Las Cortes"], "Art. 7.1 Decreto 232/1999."],
        [S4, "media", "Recibidos los fondos el 1 de septiembre, deben justificarse:", ["En tres meses y antes del último día hábil del ejercicio", "Antes del 1 de marzo siguiente", "En un año", "Cuando quiera el cajero"], "Art. 8.1 Decreto 232/1999."],
        [S4, "dificil", "Si se pidiera ampliar el plazo, el consejero de hacienda podría ampliarlo hasta:", ["Seis meses, sin superar el fin del ejercicio", "Nueve meses", "Un año completo", "No puede ampliarse"], "Art. 8.2 Decreto 232/1999."],
        [S4, "media", "Si no se justifica en plazo:", ["Se exige el reintegro", "Se condona", "Se aplica a caja fija", "Se transfiere a otra sección"], "Art. 8.3 Decreto 232/1999."],
        [S4, "media", "Si el reintegro no se realiza en quince días desde su notificación:", ["Se comunica al titular para iniciar acciones de responsabilidad", "Se archiva", "Se perdona", "Se amplía el plazo"], "Art. 8.3 Decreto 232/1999."],
        [S6, "media", "La cuenta justificativa la forma el cajero y la conforma:", ["El Secretario General Técnico o jefe de la unidad", "El proveedor", "El Interventor General", "El consejero de hacienda"], "Art. 12.1 Decreto 232/1999."],
        [S6, "media", "Si la Intervención observa defectos, el cajero puede alegar en:", ["Quince días", "Tres meses", "Un año", "Dos días"], "Art. 13.2 Decreto 232/1999."],
        [S6, "media", "La cuenta se aprueba o repara por:", ["El titular del departamento", "La entidad bancaria", "El Tribunal de Cuentas", "La Mesa de contratación"], "Art. 13.4 Decreto 232/1999."],
      ],
    },
    {
      slug: "pagos-cierre-ejercicio-tesoreria",
      titulo: "Pagos pendientes y Tesorería",
      supuesto: "A comienzos de enero, la Tesorería tiene pendientes de pago varias facturas reconocidas en diciembre del año anterior y debe abonar atrasos de nómina del personal. Además, un servicio pide que se abone una factura con tarjeta de crédito y otro departamento necesita un anticipo de Tesorería para un gasto inaplazable cuyo suplemento de crédito ya ha informado favorablemente la comisión de hacienda de las Cortes.",
      preguntas: [
        [S2, "media", "Las facturas de diciembre pendientes de pago son obligaciones de:", ["Presupuestos cerrados", "Ejercicio futuro", "Tramitación anticipada", "Caja fija"], "Art. 54.2 LHA."],
        [S2, "media", "Su pago se imputa:", ["A los créditos del ejercicio vigente al expedir la orden de pago", "Al presupuesto cerrado", "A un nuevo suplemento", "A ninguna partida"], "Art. 39.2.c) LHA."],
        [S2, "media", "Los atrasos de nómina se imputan:", ["Al ejercicio vigente cuando se ordena el pago", "Al año en que se devengaron", "Al Estado", "Al cajero"], "Art. 39.2.a) LHA."],
        [S3, "media", "La Tesorería no puede pagar con:", ["Tarjeta de crédito", "Transferencia", "Cheque nominativo", "Domiciliación"], "Art. 86.3 LHA."],
        [S6, "media", "El anticipo de Tesorería lo concede:", ["El Gobierno de Aragón a propuesta del titular de hacienda", "El cajero pagador", "La Intervención", "El servicio gestor"], "Art. 88.1 LHA."],
        [S6, "media", "Su límite máximo es del:", ["2 % de los créditos del estado de gastos", "7 % del capítulo 2", "30 % del límite de gasto no financiero", "10 % de los ingresos"], "Art. 88.1 LHA."],
        [S6, "dificil", "Si las Cortes no aprueban finalmente el suplemento, el anticipo:", ["Se cancela con cargo a los créditos del departamento cuya minoración cause menos trastornos", "Se convierte en definitivo", "Se condona", "Lo paga el Estado"], "Art. 88.2 LHA."],
        [S6, "media", "Para cubrir desfases temporales entre cobros y pagos, la Tesorería puede concertar operaciones de tesorería hasta el:", ["30 % del límite de gasto no financiero del ejercicio", "2 % de los créditos", "7 % del capítulo 2", "100 % del presupuesto"], "Art. 87.1 LHA."],
        [S1, "media", "Las operaciones de tesorería tienen carácter:", ["Extrapresupuestario, salvo los intereses", "Presupuestario íntegro", "Patrimonial", "Tributario"], "Art. 87.3 LHA."],
        [S3, "media", "La Ordenación General de Pagos corresponde a:", ["La persona titular del departamento competente en materia de hacienda", "La Tesorería", "El Interventor General", "Cada consejero"], "Art. 49.1 LHA."],
      ],
    },
  ],
});
