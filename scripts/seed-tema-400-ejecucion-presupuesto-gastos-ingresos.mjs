/**
 * Crea tema-400 — Tema 28 de Administrativo DGA (tema 23 del programa de
 * materias específicas): "La ejecución del presupuesto: fases. Ordenación
 * del gasto y ordenación del pago: órganos competentes, fases del
 * procedimiento y documentos contables que intervienen. Gastos de carácter
 * plurianual. La ejecución del presupuesto de ingresos: reconocimiento y
 * liquidación de derechos. Liquidación y cierre del ejercicio."
 *
 * Fuentes (textos consolidados leídos en esta sesión en la API del BOE):
 * - DLeg 3/2023, TR Ley de Hacienda de Aragón (BOE-A-2023-14052): arts.
 *   8-11, 20-27, 38, 47-55.
 * - Orden de 1 de febrero de 1996, por la que se aprueban los documentos
 *   contables a utilizar por la Administración General del Estado
 *   (BOE-A-1996-2749): apartados segundo a sexto y noveno (RC, A, D, AD,
 *   OK, ADOK, K, MC…). Es la norma ESTATAL: no se ha localizado una orden
 *   aragonesa publicada que regule los documentos contables de SERPA, así
 *   que el tema presenta los documentos como el modelo estatal de
 *   referencia y advierte de ello; no se afirman códigos propios de Aragón.
 * - Orden de 1 de febrero de 1996, Instrucción de operatoria contable del
 *   gasto del Estado (BOE-A-1996-2627): solo citada.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-400-ejecucion-presupuesto-gastos-ingresos.mjs
 */
import { sembrarTema, ADMIN_DGA } from "./lib/sembrar-tema.mjs";

const LHA = "https://www.boe.es/buscar/act.php?id=BOE-A-2023-14052";
const DOC = "https://www.boe.es/buscar/act.php?id=BOE-A-1996-2749";
const S1 = "fases-ejecucion-gasto";
const S2 = "organos-ordenacion-gasto-pago";
const S3 = "documentos-contables";
const S4 = "gastos-plurianuales";
const S5 = "ejecucion-presupuesto-ingresos";
const S6 = "liquidacion-cierre-ejercicio";

await sembrarTema({
  tema: {
    slug: "tema-400",
    titulo: "La ejecución del presupuesto: fases del gasto, ordenación del gasto y del pago, documentos contables, gastos plurianuales, ejecución de ingresos y cierre del ejercicio",
    descripcion: "Fases de la gestión de los créditos en la Ley de Hacienda de Aragón: autorización, disposición, reconocimiento de la obligación y pago ordenado (ADOP). Órganos: Gobierno de Aragón (gastos de más de 3 millones en contratos, 900.000 euros en subvenciones directas y convenios, 5 millones en convocatorias), consejeros y órganos superiores, organismos autónomos; ordenación general de pagos por el titular de hacienda y ordenaciones secundarias; plan de disposición de fondos. Documentos contables (modelo estatal de referencia: RC, A, D, AD, OK, ADOK, K, MC). Gastos plurianuales: supuestos, órganos, cuatro ejercicios y porcentajes del 70/60/50/50 %. Ejecución del presupuesto de ingresos: derechos de la Hacienda, recaudación, apremio, intereses y prescripción de cuatro años. Obligaciones de la Hacienda. Liquidación y cierre a 31 de diciembre.",
    contenido: "El recorrido de un gasto público en el Gobierno de Aragón, de la reserva de crédito al pago: quién autoriza, quién se compromete, cuándo se reconoce la deuda con el proveedor y quién ordena el pago; qué documentos contables se usan (RC, AD, OK…); cuántos años puede comprometer un contrato plurianual y con qué porcentajes; cómo se cobran los ingresos y qué pasa el 31 de diciembre.",
    enlaces_boe: [
      { url: LHA, titulo: "Decreto Legislativo 3/2023, texto refundido de la Ley de Hacienda de la Comunidad Autónoma de Aragón (BOE-A-2023-14052)" },
      { url: DOC, titulo: "Orden de 1 de febrero de 1996, de documentos contables de la Administración General del Estado (BOE-A-1996-2749) — modelo estatal de referencia" },
      { url: "https://www.boe.es/buscar/act.php?id=BOE-A-1996-2627", titulo: "Orden de 1 de febrero de 1996, Instrucción de operatoria contable del gasto del Estado (BOE-A-1996-2627)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "Fases de la ejecución del gasto", articulos: "art. 47 LHA", url: `${LHA}#a4-9` },
      { seccion: S2, titulo: "Órganos de ordenación del gasto y del pago", articulos: "arts. 8-11 y 48-51 LHA", url: `${LHA}#a4-10` },
      { seccion: S3, titulo: "Documentos contables (modelo estatal de referencia)", articulos: "Orden de 1-02-1996 (BOE-A-1996-2749), apdos. 5.º, 6.º y 9.º", url: DOC },
      { seccion: S4, titulo: "Gastos de carácter plurianual", articulos: "arts. 6 y 38 LHA", url: `${LHA}#a3-10` },
      { seccion: S5, titulo: "Ejecución del presupuesto de ingresos; derechos y obligaciones de la Hacienda", articulos: "arts. 20-27 y 53 LHA", url: `${LHA}#a2-2` },
      { seccion: S6, titulo: "Liquidación y cierre del ejercicio", articulos: "arts. 54-55 LHA", url: `${LHA}#a5-6` },
    ],
  },
  vinculo: { oposicion: ADMIN_DGA.oposicion, bloqueId: ADMIN_DGA.bloquePresupuesto, numero: 28 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Fases del gasto (art. 47 LHA)", "Autorización (A), disposición o compromiso (D), reconocimiento de la obligación (O) y pago ordenado (P)"],
        ["Autorización (art. 47.a LHA)", "Acto por el que se acuerda realizar un gasto calculado de forma cierta o aproximada, reservando para ello todo o parte del crédito"],
        ["Disposición (art. 47.b LHA)", "Acto que, tras los trámites legales, fija la cuantía concreta y compromete el crédito para una prestación determinada: el gasto queda comprometido con un tercero"],
        ["Reconocimiento de la obligación (art. 47.c LHA)", "Contraer en cuentas los créditos exigibles a la Comunidad una vez realizada y justificada la prestación"],
        ["Pago ordenado (art. 47.d LHA)", "Orden de pago contra la Tesorería que expide el ordenador de pagos respecto de una obligación reconocida"],
        ["Pago material", "Salida efectiva de fondos de la Tesorería que extingue la obligación (función de la Tesorería, arts. 83-86 LHA)"],
        ["Acumulación de fases", "Pueden acumularse en un solo acto (AD, ADO), por ejemplo en gastos de importe y acreedor ciertos desde el inicio"],
        ["Exigibilidad de los pagos (art. 24 LHA)", "Solo son exigibles los que resultan de la ejecución del presupuesto, de sentencia firme o de operaciones de tesorería autorizadas; si derivan de prestaciones, tras cumplir el acreedor"],
      ],
      preguntas: [
        ["media", "La fase en la que queda comprometido el crédito con un tercero por una cuantía concreta es la:", ["Disposición", "Autorización", "Reconocimiento de la obligación", "Ordenación del pago"], "Art. 47.b) LHA."],
        ["media", "El reconocimiento de la obligación se produce:", ["Una vez realizada y justificada la prestación", "Al iniciar el expediente", "Al publicar la licitación", "Al aprobar el presupuesto"], "Art. 47.c) LHA."],
        ["media", "La autorización del gasto supone:", ["Acordar su realización reservando crédito para ello", "Pagar al proveedor", "Comprometer el gasto con un tercero", "Recaudar un ingreso"], "Art. 47.a) LHA."],
        ["dificil", "Si una obligación deriva de una prestación a la Comunidad, el pago no puede realizarse hasta que:", ["El acreedor haya cumplido o garantizado su obligación", "Pase un año", "Lo autorice el Tribunal de Cuentas", "Se apruebe la Cuenta General"], "Art. 24.3 LHA."],
        ["media", "El orden correcto de las fases del gasto es:", ["Autorización, disposición, reconocimiento de la obligación y pago", "Disposición, autorización, pago y reconocimiento", "Pago, reconocimiento, disposición y autorización", "Reconocimiento, autorización, pago y disposición"], "Art. 47 LHA."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Gastos del Gobierno de Aragón (art. 48.1 LHA)", "Contratos, encargos y conciertos de valor estimado superior a 3 millones; subvenciones directas y convenios de más de 900.000 euros; convocatorias de subvenciones de más de 5 millones"],
        ["Órganos superiores (art. 48.2 LHA)", "En los demás casos autorizan los gastos de sus servicios, disponen el crédito, reconocen la obligación y proponen el pago al titular de hacienda"],
        ["Organismos autónomos (art. 48.3 LHA)", "El titular de su máximo órgano de dirección autoriza y dispone, reconoce obligaciones y ordena los pagos de su actividad"],
        ["Delegación (art. 48.4 LHA)", "Las facultades de gasto pueden delegarse en los términos reglamentarios"],
        ["Funciones de los consejeros (art. 10 LHA)", "Gestionar los créditos de su sección, contraer obligaciones, autorizar los gastos que no sean del Gobierno y proponer el pago"],
        ["Ordenación general de pagos (arts. 9.e y 49.1 LHA)", "Corresponde a la persona titular del departamento de hacienda, delegable; pueden habilitarse ordenaciones secundarias"],
        ["Plan de disposición de fondos (art. 50 LHA)", "Lo puede aprobar el Gobierno a propuesta del titular de hacienda; a él se ajusta la expedición de las órdenes de pago"],
        ["Justificación de las órdenes de pago (art. 51.1-2 LHA)", "Se acompañan de los documentos que acreditan la prestación; si no pueden acompañarse, son pagos «a justificar»"],
      ],
      preguntas: [
        ["media", "La autorización de un contrato de valor estimado superior a tres millones de euros corresponde a:", ["El Gobierno de Aragón", "El consejero del departamento", "El Director General", "La Intervención General"], "Art. 48.1.a) LHA."],
        ["media", "La ordenación general de pagos de la Comunidad corresponde a:", ["La persona titular del departamento competente en materia de hacienda", "Cada consejero", "El Presidente de las Cortes", "El Tribunal de Cuentas"], "Art. 49.1 LHA."],
        ["dificil", "Una convocatoria de subvenciones necesita autorización del Gobierno de Aragón cuando su importe supera:", ["Cinco millones de euros", "Novecientos mil euros", "Tres millones de euros", "Un millón de euros"], "Art. 48.1.c) LHA."],
        ["dificil", "La concesión directa de una subvención requiere autorización del Gobierno cuando supera:", ["900.000 euros", "3.000.000 euros", "5.000.000 euros", "200.000 euros"], "Art. 48.1.b) LHA."],
        ["media", "En un organismo autónomo, la ordenación de los pagos de su actividad corresponde a:", ["El titular de su máximo órgano de dirección", "El consejero de hacienda siempre", "El Gobierno de Aragón", "El Interventor Delegado"], "Art. 48.3 LHA."],
        ["media", "Las órdenes de pago que al expedirse no pueden acompañarse de sus justificantes tienen carácter:", ["A justificar", "Definitivo", "Extrapresupuestario sin control", "Nulo"], "Art. 51.2 LHA."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Advertencia de fuente", "Los modelos de documentos contables publicados en el BOE son los de la Administración General del Estado (Orden de 1-02-1996); el sistema contable aragonés (SERPA) sigue la misma lógica por fases, pero no se ha localizado una orden aragonesa publicada con sus modelos"],
        ["Documento RC (Orden 1-02-1996, 6.º.c)", "Retención de crédito: certificado de existencia y retención de crédito en los expedientes de gasto, transferencias y bajas"],
        ["Documentos A, D y AD", "A: autorización del gasto; D: compromiso o disposición; AD: autorización y compromiso en un mismo acto"],
        ["Documento OK", "Reconocimiento de la obligación con propuesta de pago"],
        ["Documento ADOK", "Acumula autorización, compromiso, reconocimiento de la obligación y propuesta de pago (por ejemplo, reposiciones de anticipos de caja fija)"],
        ["Documento MC", "Registra las modificaciones presupuestarias que aumentan o disminuyen los créditos"],
        ["Agrupaciones (Orden 1-02-1996, 5.º)", "Presupuesto corriente, presupuestos cerrados, ejercicios posteriores y tramitación anticipada"],
        ["Firma electrónica", "Los documentos contables son electrónicos y se autorizan con firma electrónica de quien tenga la competencia (apdo. 3.º)"],
      ],
      preguntas: [
        ["media", "En el modelo de documentos contables, el certificado de existencia y retención de crédito se tramita con el documento:", ["RC", "OK", "MC", "AD"], "Orden de 1-02-1996, apdo. 6.º.c) (BOE-A-1996-2749)."],
        ["media", "El documento que acumula autorización y disposición del gasto es el:", ["AD", "OK", "RC", "ADOK"], "Orden de 1-02-1996, apdo. 6.º.g)."],
        ["media", "El reconocimiento de la obligación con propuesta de pago se registra con el documento:", ["OK", "A", "D", "RC"], "Orden de 1-02-1996, apdo. 6.º.n)."],
        ["dificil", "Las modificaciones presupuestarias se registran con el documento:", ["MC", "RC", "K", "PR"], "Orden de 1-02-1996, apdo. 6.º.a)."],
        ["media", "Las reposiciones de fondos de los anticipos de caja fija se tramitan con documentos:", ["ADOK", "RC", "MC", "A"], "Orden de 1-02-1996, apdo. 3.º.4."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Subordinación al crédito (art. 38.1 LHA)", "Los gastos plurianuales se subordinan al crédito que cada ley de presupuestos autorice para cada ejercicio"],
        ["Supuestos (art. 38.2 LHA)", "Inversiones y transferencias de capital; contratos, encargos y conciertos; convenios plurianuales; arrendamientos de inmuebles; cargas financieras de la deuda; subvenciones que lo requieran; excepcionalmente, otros justificados"],
        ["Autoriza el Gobierno (art. 38.3 LHA)", "Contratos, encargos y conciertos de más de 3 millones; subvenciones directas y convenios de más de 900.000 euros; convocatorias de más de 5 millones"],
        ["Autoriza el consejero de hacienda (art. 38.4 LHA)", "Los demás gastos plurianuales"],
        ["Número de anualidades (art. 38.5 LHA)", "No más de cuatro ejercicios futuros, salvo arrendamientos y cargas financieras de la deuda"],
        ["Porcentajes (art. 38.5 LHA)", "Sobre el crédito inicial: 70 % en el ejercicio siguiente, 60 % en el segundo y 50 % en el tercero y en el cuarto"],
        ["Excepciones (art. 38.6 LHA)", "El Gobierno, a propuesta del titular de hacienda, puede ampliar anualidades o modificar porcentajes en casos especialmente justificados"],
        ["Control (art. 38.7-8 LHA)", "Contabilización diferenciada y dación de cuenta a la comisión de hacienda de las Cortes"],
      ],
      preguntas: [
        ["media", "Con carácter general, los gastos plurianuales no pueden extenderse a más de:", ["Cuatro ejercicios futuros", "Diez ejercicios", "Dos ejercicios", "Seis ejercicios"], "Art. 38.5 LHA."],
        ["media", "El límite para el ejercicio inmediato siguiente es el:", ["70 % del crédito inicial", "100 %", "50 %", "60 %"], "Art. 38.5 LHA."],
        ["dificil", "En el tercer y cuarto ejercicio futuro, el límite es del:", ["50 %", "60 %", "70 %", "30 %"], "Art. 38.5 LHA."],
        ["media", "Pueden superar el límite de cuatro anualidades:", ["Los arrendamientos de inmuebles y las cargas financieras de la deuda", "Los contratos de suministro", "Las subvenciones", "Los convenios"], "Art. 38.5 LHA."],
        ["media", "Ampliar el número de anualidades o modificar los porcentajes corresponde:", ["Al Gobierno de Aragón, excepcionalmente", "A cada consejero", "A la Mesa de contratación", "A las Cortes siempre"], "Art. 38.6 LHA."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["Fases del ingreso", "Reconocimiento del derecho (contracción), liquidación y recaudación o cobro; pueden coincidir en el tiempo (ingresos sin contraído previo)"],
        ["Derechos indisponibles (art. 20 LHA)", "No se enajenan ni gravan salvo por ley; no se conceden exenciones, perdones ni moratorias salvo por ley; transigir o someter a arbitraje requiere decreto del Gobierno"],
        ["Apremio (art. 21 LHA)", "La certificación de descubierto es título ejecutivo; el recurso no suspende el apremio salvo pago, consignación o garantía, o error material o aritmético"],
        ["Intereses de demora (art. 22 LHA)", "Se devengan desde el día siguiente al vencimiento, al interés legal del dinero vigente ese día"],
        ["Prescripción de derechos (art. 23 LHA)", "Cuatro años para reconocer o liquidar y para recaudar; se aplica de oficio y se interrumpe según la Ley General Tributaria"],
        ["Importe íntegro (art. 53 LHA)", "Derechos y obligaciones se aplican por su importe íntegro; no se atienden obligaciones minorando derechos, salvo devoluciones de ingresos indebidos"],
        ["Obligaciones de la Hacienda (arts. 25-27 LHA)", "No cabe apremio contra la Hacienda; sentencias: crédito extraordinario o suplemento en tres meses; interés legal si no paga en tres meses; prescripción de cuatro años"],
        ["Deudas de escasa cuantía (art. 23.5 LHA)", "El titular de hacienda puede no liquidar o anular las deudas inferiores a la cuantía que no cubra el coste de su cobro"],
      ],
      preguntas: [
        ["media", "El derecho de la Hacienda aragonesa a recaudar créditos ya liquidados prescribe, con carácter general, a los:", ["Cuatro años", "Cinco años", "Diez años", "Quince años"], "Art. 23.1.b) LHA."],
        ["media", "Las certificaciones de descubierto de deudas de derecho público son:", ["Título suficiente para iniciar el apremio", "Meros informes", "Actos de trámite sin efectos", "Recursos"], "Art. 21.2 LHA."],
        ["media", "Transigir judicialmente sobre derechos de la Hacienda de la Comunidad exige:", ["Decreto del Gobierno de Aragón", "Orden del consejero", "Ley", "Acuerdo de la Mesa"], "Art. 20.3 LHA."],
        ["dificil", "Para pagar una sentencia que exige crédito extraordinario, este debe solicitarse a las Cortes dentro de:", ["Los tres meses siguientes a la notificación", "Un año", "Quince días", "Seis meses"], "Art. 25.4 LHA."],
        ["media", "Los derechos y obligaciones se aplican al presupuesto:", ["Por su importe íntegro", "Netos de compensaciones", "Solo si se cobran", "Al 50 %"], "Art. 53.1 LHA."],
        ["media", "Contra la Hacienda de la Comunidad:", ["No puede seguirse el procedimiento de apremio", "Puede seguirse el apremio como contra un particular", "Solo cabe embargo de cuentas", "No cabe reclamación judicial"], "Art. 25.1 LHA."],
      ],
    },
    {
      seccion: S6,
      flashcards: [
        ["Fecha de liquidación (art. 54.1 LHA)", "El presupuesto se liquida, en cuanto a cobros y pagos, el 31 de diciembre"],
        ["Pendientes de cobro y pago (art. 54.2 LHA)", "Los derechos pendientes de cobro y obligaciones pendientes de pago quedan afectados a la Tesorería (presupuestos cerrados)"],
        ["Ingresos tras el cierre (art. 54.4 LHA)", "Quedan desafectados de su destino específico, sin perjuicio de su nueva afectación en el presupuesto en curso"],
        ["Orden de cierre (art. 54.5 LHA)", "Las operaciones de cierre se regulan por orden del titular del departamento de hacienda"],
        ["Anulación de créditos (art. 41.1 LHA)", "Tras el cierre, los créditos no afectados a obligaciones reconocidas quedan anulados, salvo incorporación"],
        ["Sector público institucional (art. 55 LHA)", "Organismos, sociedades, consorcios y fundaciones liquidan a 31 de diciembre con tendencia al equilibrio; ajustes de transferencias corrientes si sobran"],
        ["Obligaciones de ejercicios cerrados (art. 39.2.c LHA)", "Se imputan a los créditos del ejercicio vigente al expedir la orden de pago"],
      ],
      preguntas: [
        ["media", "El presupuesto de cada ejercicio se liquida, en cuanto a cobros y pagos, el:", ["31 de diciembre", "31 de enero siguiente", "30 de junio", "1 de marzo siguiente"], "Art. 54.1 LHA."],
        ["media", "Las obligaciones pendientes de pago al cerrar el ejercicio:", ["Quedan afectadas a la Tesorería", "Se anulan", "Se pagan con el presupuesto del Estado", "Prescriben"], "Art. 54.2 LHA."],
        ["dificil", "Si la liquidación de un organismo autónomo arroja resultado positivo, la Intervención General puede:", ["Anular de oficio obligaciones reconocidas a su favor en el presupuesto de la Administración", "Sancionar al organismo", "Disolverlo", "Aumentar su presupuesto"], "Art. 55.3 LHA."],
        ["media", "Las operaciones de cierre del ejercicio se regulan por:", ["Orden del titular del departamento de hacienda", "Ley de las Cortes", "Decreto del Presidente", "Instrucción del Tribunal de Cuentas"], "Art. 54.5 LHA."],
        ["media", "Los ingresos realizados una vez cerrado el ejercicio:", ["Quedan desafectados de su destino específico", "Se devuelven", "Se ingresan en el Estado", "No se contabilizan"], "Art. 54.4 LHA."],
      ],
    },
  ],
  glosario: [
    [S1, "ADOP", "Siglas de las fases del gasto: autorización, disposición, obligación y pago."],
    [S1, "Compromiso de gasto", "Disposición del crédito a favor de un tercero determinado por una cuantía concreta."],
    [S2, "Ordenador de pagos", "Órgano que expide las órdenes de pago contra la Tesorería."],
    [S2, "Pago a justificar", "Orden de pago que se expide sin los justificantes, que deberán presentarse después."],
    [S3, "Documento RC", "Documento contable de retención de crédito que certifica su existencia para un expediente."],
    [S3, "Documento OK", "Documento contable de reconocimiento de la obligación y propuesta de pago."],
    [S4, "Gasto plurianual", "Gasto comprometido con cargo a presupuestos de ejercicios futuros."],
    [S5, "Contracción", "Reconocimiento contable de un derecho a favor de la Hacienda."],
    [S5, "Certificación de descubierto", "Título ejecutivo que acredita una deuda impagada y permite el apremio."],
    [S6, "Presupuestos cerrados", "Derechos y obligaciones de ejercicios anteriores pendientes de cobro o pago."],
  ],
  casos: [
    {
      slug: "contrato-servicio-limpieza-plurianual",
      titulo: "Un contrato de limpieza plurianual",
      supuesto: "La Secretaría General Técnica de un departamento licita en 2026 un contrato de limpieza de sus edificios para 2027-2030, con un valor estimado de 2,4 millones de euros. Tras la adjudicación, cada mes la empresa presenta su factura y, una vez conformada, se paga.",
      preguntas: [
        [S4, "media", "El contrato compromete créditos de ejercicios futuros: es un gasto:", ["Plurianual", "De ejercicios cerrados", "Extraordinario", "A justificar"], "Art. 38 LHA."],
        [S4, "media", "Por su valor estimado (2,4 millones), el gasto plurianual lo autoriza:", ["La persona titular del departamento de hacienda", "El Gobierno de Aragón", "Las Cortes", "La Mesa de contratación"], "Art. 38.3-4 LHA."],
        [S4, "media", "Los ejercicios futuros comprometidos no pueden ser más de:", ["Cuatro", "Dos", "Seis", "Diez"], "Art. 38.5 LHA."],
        [S4, "dificil", "En el primer ejercicio futuro no puede comprometerse más del:", ["70 % del crédito inicial de la partida", "100 %", "50 %", "30 %"], "Art. 38.5 LHA."],
        [S3, "media", "Al iniciar el expediente se solicita el certificado de existencia de crédito con el documento:", ["RC", "OK", "MC", "K"], "Orden de 1-02-1996, apdo. 6.º.c-d) (modelo estatal)."],
        [S1, "media", "Al aprobar el expediente y el gasto se produce la fase de:", ["Autorización", "Disposición", "Obligación", "Pago"], "Art. 47.a) LHA."],
        [S1, "media", "Con la adjudicación a la empresa se produce la fase de:", ["Disposición o compromiso", "Autorización", "Pago", "Liquidación"], "Art. 47.b) LHA."],
        [S1, "media", "Con la conformidad de cada factura mensual se produce:", ["El reconocimiento de la obligación", "La autorización", "La disposición", "La retención de crédito"], "Art. 47.c) LHA."],
        [S2, "media", "La orden de pago la expide:", ["El ordenador de pagos dependiente del titular de hacienda", "La empresa", "La Mesa de contratación", "El Interventor"], "Art. 49 LHA."],
        [S4, "media", "Los compromisos plurianuales deben:", ["Contabilizarse de forma diferenciada", "Ocultarse hasta su vencimiento", "Imputarse todos al primer año", "Aprobarse por ley"], "Art. 38.7 LHA."],
      ],
    },
    {
      slug: "subvenciones-gobierno-aragon",
      titulo: "Subvenciones y órgano competente",
      supuesto: "Un departamento prepara tres expedientes: una convocatoria de ayudas de 6 millones de euros, una subvención directa a una entidad de 1,2 millones y un convenio de 400.000 euros con un ayuntamiento. Además, debe pagar una subvención de capital de 250.000 euros ya concedida.",
      preguntas: [
        [S2, "media", "La convocatoria de 6 millones debe autorizarla:", ["El Gobierno de Aragón", "El consejero", "El Director General", "La Intervención"], "Art. 48.1.c) LHA."],
        [S2, "media", "La subvención directa de 1,2 millones debe autorizarla:", ["El Gobierno de Aragón", "El consejero", "El jefe de servicio", "Las Cortes"], "Art. 48.1.b) LHA."],
        [S2, "media", "El convenio de 400.000 euros lo autoriza:", ["El órgano superior del departamento", "El Gobierno de Aragón", "Las Cortes", "La Cámara de Cuentas"], "Art. 48.1-2 LHA."],
        [S2, "dificil", "Para pagar una subvención de capital de más de 200.000 euros es preceptivo:", ["Solicitar la designación de un representante de la Intervención General para la comprobación material de la inversión", "Una ley", "Un aval del beneficiario", "Nada especial"], "Art. 52.2 LHA."],
        [S2, "media", "Con carácter general, a la orden de pago de una subvención se acompaña:", ["La acreditación de la actividad y una certificación del órgano gestor", "Solo la solicitud", "El presupuesto del beneficiario", "Nada"], "Art. 52.1 LHA."],
        [S2, "media", "Los anticipos de pago de subvenciones superiores a 60.000 euros exigen, con carácter general:", ["Garantías", "Autorización de las Cortes", "Un decreto-ley", "Nada"], "Art. 52.3 LHA."],
        [S1, "media", "Cuando la entidad acredite la actividad subvencionada, se reconocerá:", ["La obligación", "El derecho", "El crédito extraordinario", "La disposición"], "Art. 47.c) LHA."],
        [S3, "media", "En el modelo de documentos contables, el reconocimiento de la obligación con propuesta de pago es el documento:", ["OK", "RC", "AD", "MC"], "Orden de 1-02-1996, apdo. 6.º.n) (modelo estatal)."],
        [S4, "media", "Si la convocatoria compromete fondos de ejercicios futuros, por su importe la autorización plurianual corresponde a:", ["El Gobierno de Aragón", "El consejero de hacienda", "El Director General", "La Intervención"], "Art. 38.3.c) LHA."],
        [S2, "media", "Las facultades de autorización de gastos de los órganos superiores:", ["Pueden delegarse según el reglamento", "Son indelegables", "Solo puede ejercerlas el Presidente", "Corresponden al Tribunal de Cuentas"], "Art. 48.4 LHA."],
      ],
    },
    {
      slug: "cobro-tasa-cierre-ejercicio",
      titulo: "Ingresos pendientes al cierre",
      supuesto: "Un servicio liquida en noviembre unas tasas a varios particulares; algunos no pagan en plazo. Al llegar el 31 de diciembre, quedan derechos pendientes de cobro y facturas reconocidas pendientes de pago. Un particular recurre y pide suspender el apremio sin garantía.",
      preguntas: [
        [S5, "media", "Las cantidades no pagadas devengan intereses de demora desde:", ["El día siguiente al vencimiento", "El año siguiente", "La notificación del apremio", "No devengan intereses"], "Art. 22.1 LHA."],
        [S5, "media", "El tipo de esos intereses es:", ["El interés legal del dinero vigente el día del vencimiento", "El euríbor", "El 20 % fijo", "El que fije el servicio"], "Art. 22.2 LHA."],
        [S5, "media", "Para iniciar el apremio es título suficiente:", ["La certificación de descubierto", "Una carta al deudor", "Una sentencia penal", "Nada"], "Art. 21.2 LHA."],
        [S5, "dificil", "El recurso del particular suspende el apremio sin garantía solo si:", ["Demuestra error material o aritmético en la deuda", "Lo pide por escrito", "Es residente en Aragón", "Recurre en plazo"], "Art. 21.3 y 5 LHA."],
        [S5, "media", "El derecho a recaudar esas tasas prescribe, salvo norma especial, a los:", ["Cuatro años desde la notificación o vencimiento", "Quince años", "Un año", "Diez años"], "Art. 23.1.b) LHA."],
        [S6, "media", "A 31 de diciembre, los derechos pendientes de cobro:", ["Quedan afectados a la Tesorería y se gestionan como presupuestos cerrados", "Se anulan", "Prescriben", "Se condonan"], "Art. 54.2 LHA."],
        [S6, "media", "Las facturas reconocidas pendientes de pago a 31 de diciembre:", ["Quedan afectadas a la Tesorería como obligaciones pendientes", "Se pierden", "Se pagan con el presupuesto del Estado", "Pasan a la Cámara de Cuentas"], "Art. 54.2 LHA."],
        [S6, "media", "El pago de esas obligaciones de ejercicios cerrados se imputa:", ["A los créditos del ejercicio vigente al expedir la orden de pago", "Al presupuesto ya cerrado", "A un crédito extraordinario", "No se paga"], "Art. 39.2.c) LHA."],
        [S5, "media", "Conceder una moratoria a un deudor solo es posible:", ["En los casos que determinen expresamente las leyes", "Si lo decide el jefe de servicio", "Siempre que lo pida", "Nunca"], "Art. 20.2 LHA."],
        [S5, "media", "El titular de hacienda puede anular deudas que no cubran:", ["El coste de su exacción y recaudación", "El 10 % del presupuesto", "El salario mínimo", "Los intereses"], "Art. 23.5 LHA."],
      ],
    },
  ],
});
