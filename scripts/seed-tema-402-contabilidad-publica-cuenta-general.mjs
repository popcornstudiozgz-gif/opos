/**
 * Crea tema-402 — Tema 30 de Administrativo DGA (tema 25 del programa de
 * materias específicas): "Contabilidad pública: concepto. Contabilidad
 * preventiva, ejecutiva y crítica. Fines. Órganos competentes. Los
 * principios contables. La Cuenta General de la Comunidad Autónoma de
 * Aragón."
 *
 * Fuentes:
 * - DLeg 3/2023, TR Ley de Hacienda de Aragón (BOE-A-2023-14052): arts.
 *   3, 62, 73-82 (API del BOE).
 * - Orden HAP/535/2018, de 14 de marzo, por la que se aprueba el Plan
 *   General de Contabilidad Pública de la Comunidad Autónoma de Aragón
 *   (BOA núm. 67 de 06-04-2018), descargada del BOA y leída: arts. 1-3,
 *   DT 3.ª (aplicación desde el 1-01-2019), disposición derogatoria (Orden
 *   de 30-11-1994) y primera parte (marco conceptual: imagen fiel,
 *   requisitos de la información, principios contables y documentos de
 *   las cuentas anuales).
 * - Orden EHA/1037/2010, PGCP estatal (BOE-A-2010-6710): solo citada como
 *   modelo al que se adapta el plan aragonés (art. 76.a LHA).
 * La clasificación en contabilidad preventiva, ejecutiva y crítica es
 * doctrinal (no la define ninguna norma); se explica como tal y se
 * relaciona con las fases que sí regula la ley.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-402-contabilidad-publica-cuenta-general.mjs
 */
import { sembrarTema, ADMIN_DGA } from "./lib/sembrar-tema.mjs";

const LHA = "https://www.boe.es/buscar/act.php?id=BOE-A-2023-14052";
const PGCPA = "https://www.boa.aragon.es/cgi-bin/EBOA/BRSCGI?CMD=VEROBJ&MLKOB=1013643625339&type=pdf";
const PGCP = "https://www.boe.es/buscar/act.php?id=BOE-A-2010-6710";
const S1 = "contabilidad-publica-concepto-clases";
const S2 = "fines-contabilidad-publica";
const S3 = "organos-contabilidad-publica";
const S4 = "principios-contables-publicos";
const S5 = "cuentas-anuales-pgcp-aragon";
const S6 = "cuenta-general-aragon";

await sembrarTema({
  tema: {
    slug: "tema-402",
    titulo: "Contabilidad pública: concepto, clases, fines, órganos, principios contables y la Cuenta General de la Comunidad Autónoma de Aragón",
    descripcion: "Concepto de contabilidad pública y entidades sometidas a ella; clasificación doctrinal en contabilidad preventiva (presupuesto), ejecutiva (ejecución y registro) y crítica (control y rendición). Fines del art. 75 de la Ley de Hacienda de Aragón. Órganos: departamento de hacienda e Intervención General como centro directivo y centro gestor de la contabilidad; verificación; información trimestral a las Cortes. El Plan General de Contabilidad Pública de Aragón (Orden HAP/535/2018): ámbito, imagen fiel, requisitos de la información, principios económico-patrimoniales (gestión continuada, devengo, uniformidad, prudencia, no compensación, importancia relativa) y presupuestarios (imputación presupuestaria y desafectación); cuentas anuales. La Cuenta General: contenido, formación por la Intervención General y aprobación por las Cortes tras el informe de la Cámara de Cuentas.",
    contenido: "Cómo lleva sus cuentas el Gobierno de Aragón: quién organiza la contabilidad (la Intervención General), con qué reglas (el plan contable aragonés de 2018 y sus principios, como el devengo o la prudencia), qué documentos forman las cuentas anuales y cómo se prepara y aprueba cada año la Cuenta General de la Comunidad.",
    enlaces_boe: [
      { url: LHA, titulo: "Decreto Legislativo 3/2023, texto refundido de la Ley de Hacienda de la Comunidad Autónoma de Aragón (BOE-A-2023-14052)" },
      { url: PGCPA, titulo: "Orden HAP/535/2018, de 14 de marzo, por la que se aprueba el Plan General de Contabilidad Pública de la Comunidad Autónoma de Aragón (BOA núm. 67, de 06-04-2018)" },
      { url: PGCP, titulo: "Orden EHA/1037/2010, Plan General de Contabilidad Pública estatal (BOE-A-2010-6710)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "Concepto de contabilidad pública y sus clases", articulos: "arts. 3.1.c) y 73 LHA; doctrina", url: `${LHA}#a7-5` },
      { seccion: S2, titulo: "Fines de la contabilidad pública", articulos: "arts. 74-75 LHA", url: `${LHA}#a7-7` },
      { seccion: S3, titulo: "Órganos competentes", articulos: "arts. 62, 76-80 LHA", url: `${LHA}#a7-8` },
      { seccion: S4, titulo: "Los principios contables públicos", articulos: "Orden HAP/535/2018, primera parte, 1.º-3.º", url: PGCPA },
      { seccion: S5, titulo: "El Plan General de Contabilidad Pública de Aragón y las cuentas anuales", articulos: "Orden HAP/535/2018, arts. 1-3 y DT 3.ª", url: PGCPA },
      { seccion: S6, titulo: "La Cuenta General de la Comunidad Autónoma de Aragón", articulos: "arts. 81-82 LHA", url: `${LHA}#a8-3` },
    ],
  },
  vinculo: { oposicion: ADMIN_DGA.oposicion, bloqueId: ADMIN_DGA.bloquePresupuesto, numero: 30 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Contabilidad pública: concepto", "Sistema de información que registra las operaciones presupuestarias, patrimoniales y de tesorería del sector público para la gestión, el control y la rendición de cuentas"],
        ["Régimen de contabilidad pública (art. 3.1.c LHA)", "La Hacienda aragonesa se somete a contabilidad pública para reflejar toda clase de operaciones y resultados y facilitar información"],
        ["Entidades sometidas (art. 73 LHA)", "Administración de la Comunidad, organismos públicos, sociedades mercantiles autonómicas, consorcios autonómicos y fundaciones del sector público"],
        ["Contabilidad preventiva (doctrina)", "La que recoge las previsiones: el presupuesto como plan contable de ingresos y gastos antes de ejecutarse"],
        ["Contabilidad ejecutiva (doctrina)", "La que registra la ejecución: fases del gasto y del ingreso, tesorería y variaciones patrimoniales durante el ejercicio"],
        ["Contabilidad crítica (doctrina)", "La que examina y juzga los resultados: liquidación, cuentas, control y rendición ante la Intervención, la Cámara de Cuentas, el Tribunal de Cuentas y las Cortes"],
        ["Sociedades y fundaciones (art. 78.2 LHA)", "Se ajustan al Código de Comercio y al plan de contabilidad que les sea aplicable (empresarial o de entidades sin fines lucrativos)"],
      ],
      preguntas: [
        ["media", "Están sometidas al régimen de contabilidad pública, según la Ley de Hacienda de Aragón:", ["La Administración, sus organismos, sociedades mercantiles, consorcios y fundaciones del sector público", "Solo la Administración General", "Solo los organismos autónomos", "Las empresas privadas contratistas"], "Art. 73 LHA."],
        ["media", "En la clasificación doctrinal, la contabilidad que registra la ejecución del presupuesto durante el ejercicio es la:", ["Ejecutiva", "Preventiva", "Crítica", "Analítica"], "Doctrina hacendística."],
        ["media", "La contabilidad crítica se relaciona con:", ["El examen, control y rendición de las cuentas", "La elaboración del presupuesto", "El cobro de los tributos", "La selección del personal"], "Doctrina hacendística."],
        ["dificil", "Las sociedades mercantiles autonómicas llevan su contabilidad conforme a:", ["El Código de Comercio y el plan de contabilidad que les resulte aplicable", "Solo el PGCP de Aragón", "La Ley de Contratos", "Ninguna norma"], "Art. 78.2 LHA."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Fines (art. 75 LHA)", "Registrar la ejecución del presupuesto; conocer la tesorería; reflejar el patrimonio; dar datos para la Cuenta General y demás cuentas; elaborar las cuentas económicas del sector público; informar para decidir"],
        ["Organización (art. 75 LHA)", "Corresponde al departamento de hacienda la organización de la contabilidad pública y el desarrollo de la contabilidad analítica"],
        ["Rendición de cuentas (art. 74.1 LHA)", "Obliga a rendir cuentas a las Cortes de Aragón, al Tribunal de Cuentas y a la Cámara de Cuentas de Aragón por conducto de la Intervención General"],
        ["Perceptores de subvenciones (art. 74.2 LHA)", "También rinden cuentas los perceptores de subvenciones de funcionamiento con cargo al presupuesto"],
        ["Contabilidad analítica", "La que mide costes y rendimientos de los servicios; base de la memoria de coste y rendimiento de la Cuenta General (art. 81.3.a LHA)"],
      ],
      preguntas: [
        ["media", "Es un fin de la contabilidad pública según la Ley de Hacienda de Aragón:", ["Reflejar las variaciones, composición y situación del patrimonio", "Seleccionar al personal", "Aprobar las leyes", "Adjudicar contratos"], "Art. 75.c) LHA."],
        ["media", "La organización de la contabilidad pública compete a:", ["El departamento competente en materia de hacienda", "Cada servicio gestor", "Las Cortes", "La Cámara de Cuentas"], "Art. 75 LHA."],
        ["media", "Las cuentas se rinden a las Cortes, al Tribunal de Cuentas y a la Cámara de Cuentas por conducto de:", ["La Intervención General", "La Tesorería", "El Justicia de Aragón", "Cada consejero directamente"], "Art. 74.1 LHA."],
        ["dificil", "Además de las entidades públicas, deben rendir cuentas:", ["Los perceptores de subvenciones de funcionamiento con cargo al presupuesto", "Todos los contribuyentes", "Los funcionarios a título personal", "Los partidos políticos ante la Intervención"], "Art. 74.2 LHA."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Centro directivo (art. 76 LHA)", "La Intervención General: propone al consejero de hacienda el Plan General de Contabilidad, promueve las normas de cuentas, aprueba planes parciales, inspecciona la contabilidad y dirige auditorías"],
        ["Centro gestor (art. 77 LHA)", "La Intervención General forma la Cuenta General y la de gestión de tributos cedidos, prepara las cuentas a rendir, elabora las cuentas económicas del sector público y vigila las oficinas de contabilidad"],
        ["Aprobación del plan (art. 76.a LHA)", "El Plan General de Contabilidad lo aprueba el titular del departamento de hacienda a propuesta de la Intervención General, pudiendo seguir el PGCP estatal para permitir la consolidación"],
        ["Verificación (art. 78.1 LHA)", "La contabilidad se lleva en libros, registros y cuentas y se verifica por la Intervención General y, en su caso, el Tribunal de Cuentas y la Cámara de Cuentas"],
        ["Formación de cuentas (art. 79 LHA)", "Anual; la Intervención General fija los periodos de las cuentas parciales"],
        ["Información trimestral (art. 80 LHA)", "Hacienda remite a las Cortes, en el mes siguiente a cada trimestre, y publica en el Portal de Transparencia, la ejecución del presupuesto, la tesorería, los proyectos del FCI y la memoria de control financiero"],
      ],
      preguntas: [
        ["media", "El centro directivo de la contabilidad pública de Aragón es:", ["La Intervención General de la Administración de la Comunidad Autónoma", "La Dirección General de Presupuestos", "La Cámara de Cuentas", "La Tesorería"], "Art. 76 LHA."],
        ["media", "La Cuenta General de la Administración de la Comunidad la forma:", ["La Intervención General", "La Cámara de Cuentas", "Las Cortes", "La Tesorería"], "Art. 77.a) LHA."],
        ["media", "La información sobre ejecución del presupuesto y tesorería se remite a las Cortes:", ["Trimestralmente, en el mes siguiente al vencimiento del trimestre", "Una vez al año", "Cada cinco años", "Solo si las Cortes la piden"], "Art. 80 LHA."],
        ["dificil", "Formar la Cuenta de gestión de tributos cedidos corresponde a:", ["La Intervención General como centro gestor de la contabilidad", "La AEAT", "La Junta de Reclamaciones", "El Tribunal de Cuentas"], "Art. 77.b) LHA."],
        ["media", "El Plan General de Contabilidad Pública de Aragón lo aprueba:", ["El titular del departamento de hacienda, a propuesta de la Intervención General", "Las Cortes por ley", "El Gobierno de la Nación", "La Cámara de Cuentas"], "Art. 76.a) LHA; Orden HAP/535/2018."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Imagen fiel (PGCP Aragón, 1.º)", "Las cuentas anuales deben mostrar la imagen fiel del patrimonio, la situación financiera, el resultado económico-patrimonial y la ejecución del presupuesto; prevalece la realidad económica sobre la forma jurídica"],
        ["Requisitos de la información (2.º)", "Claridad, relevancia, fiabilidad y comparabilidad"],
        ["Gestión continuada (3.º.1.a)", "Se presume que la actividad continúa por tiempo indefinido: no se busca el valor liquidativo"],
        ["Devengo (3.º.1.b)", "Las operaciones se reconocen según la corriente real de bienes y servicios, no cuando se produce la corriente monetaria"],
        ["Uniformidad (3.º.1.c)", "El criterio elegido se mantiene en el tiempo; su cambio justificado se explica en la memoria"],
        ["Prudencia (3.º.1.d)", "Precaución en las estimaciones: no sobrevalorar activos e ingresos ni infravalorar obligaciones y gastos, sin perder neutralidad"],
        ["No compensación e importancia relativa (3.º.1.e-f)", "No se compensan partidas de activo y pasivo ni de gastos e ingresos; puede no aplicarse estrictamente un principio si el efecto es escasamente significativo, sin infringir la ley"],
        ["Principios presupuestarios (3.º.2)", "Imputación presupuestaria (gastos al ejercicio en que se realizan; derechos al ejercicio en que se reconocen) y desafectación (los ingresos financian el conjunto de los gastos, salvo afectación con seguimiento)"],
        ["Conflicto entre principios (3.º)", "Prevalece el que mejor conduzca a la imagen fiel"],
      ],
      preguntas: [
        ["media", "El principio por el que las operaciones se reconocen según la corriente real de bienes y servicios y no según la corriente monetaria es el de:", ["Devengo", "Prudencia", "Uniformidad", "Gestión continuada"], "PGCP Aragón, primera parte, 3.º.1.b)."],
        ["media", "Presumir que la actividad de la entidad continúa por tiempo indefinido es el principio de:", ["Gestión continuada", "Importancia relativa", "No compensación", "Desafectación"], "PGCP Aragón, 3.º.1.a)."],
        ["media", "En caso de conflicto entre principios contables prevalece:", ["El que mejor conduzca a la imagen fiel", "El de prudencia siempre", "El de devengo siempre", "El que elija el contable"], "PGCP Aragón, 3.º.1."],
        ["dificil", "Según el principio de desafectación, con carácter general:", ["Los ingresos presupuestarios financian la totalidad de los gastos sin relación directa entre unos y otros", "Cada ingreso financia un gasto concreto", "Los ingresos no se contabilizan", "Los gastos se compensan con ingresos"], "PGCP Aragón, 3.º.2.b)."],
        ["media", "No compensar partidas del activo con las del pasivo responde al principio de:", ["No compensación", "Uniformidad", "Devengo", "Imputación presupuestaria"], "PGCP Aragón, 3.º.1.e)."],
        ["media", "Son requisitos de la información de las cuentas anuales:", ["Claridad, relevancia, fiabilidad y comparabilidad", "Brevedad y secreto", "Urgencia y oportunidad política", "Unidad y universalidad"], "PGCP Aragón, 2.º."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["Norma vigente", "Orden HAP/535/2018, de 14 de marzo, Plan General de Contabilidad Pública de la Comunidad Autónoma de Aragón (BOA de 06-04-2018); derogó el plan de 1994"],
        ["Aplicación (DT 3.ª)", "Desde el ejercicio contable iniciado el 1 de enero de 2019"],
        ["Ámbito obligatorio (art. 2)", "Administración de la Comunidad, organismos autónomos, entidades de derecho público (salvo las de mercado autorizadas a usar el plan empresarial), consorcios adscritos y la Universidad de Zaragoza"],
        ["Facultades de la Intervención General (art. 3)", "Desglosar y crear cuentas y aprobar planes parciales o adaptaciones especiales"],
        ["Cuentas anuales (1.º)", "Balance, cuenta del resultado económico-patrimonial, estado de cambios en el patrimonio neto, estado de liquidación del presupuesto, estado de flujos de efectivo y memoria"],
        ["Entidad contable (1.º)", "Todo ente con personalidad jurídica y presupuesto propio que deba formar y rendir cuentas"],
      ],
      preguntas: [
        ["media", "El Plan General de Contabilidad Pública de Aragón vigente fue aprobado por:", ["La Orden HAP/535/2018", "La Ley 5/2012", "El Decreto 232/1999", "La Orden EHA/1037/2010 directamente"], "BOA núm. 67 de 06-04-2018."],
        ["media", "El plan contable aragonés es de aplicación desde el ejercicio iniciado el:", ["1 de enero de 2019", "1 de enero de 2010", "1 de enero de 2023", "1 de enero de 2001"], "Orden HAP/535/2018, DT 3.ª."],
        ["dificil", "Está obligada a aplicar el plan contable de la Comunidad Autónoma de Aragón:", ["La Universidad de Zaragoza", "Cualquier sociedad mercantil autonómica", "Los ayuntamientos aragoneses", "Las fundaciones privadas"], "Orden HAP/535/2018, art. 2.e)."],
        ["media", "Forma parte de las cuentas anuales del plan:", ["El estado de liquidación del presupuesto", "El plan estratégico de subvenciones", "La relación de puestos de trabajo", "El inventario de vehículos"], "Orden HAP/535/2018, primera parte, 1.º."],
        ["media", "Desglosar las cuentas del plan y crear otras no previstas corresponde a:", ["La Intervención General", "Cada servicio gestor", "Las Cortes", "La Tesorería"], "Orden HAP/535/2018, art. 3.a)."],
      ],
    },
    {
      seccion: S6,
      flashcards: [
        ["Ámbito (art. 81.1 LHA)", "Comprende la cuenta de la Administración de la Comunidad, sus organismos públicos, sociedades mercantiles autonómicas, consorcios y fundaciones del sector público"],
        ["Cuenta de la Administración (art. 81.2 LHA)", "Liquidación de los presupuestos (cuadro de créditos y modificaciones, liquidación de gastos e ingresos), Cuenta General de Tesorería, de la Deuda y del endeudamiento, estado de ejercicios anteriores, anticipos de tesorería, resultado del ejercicio y compromisos con ejercicios futuros"],
        ["Resultado del ejercicio (art. 81.2.f LHA)", "Saldos de ejecución por obligaciones y derechos reconocidos y por pagos e ingresos; déficit o superávit de tesorería; variación de activos y pasivos"],
        ["Memorias anexas (art. 81.3 LHA)", "Memoria de coste y rendimiento de los servicios, memoria del grado de cumplimiento de objetivos y estado de situación de las inversiones"],
        ["Formación (art. 82.1 LHA)", "La forma la Intervención General y se le unen las cuentas de las entidades del sector público institucional"],
        ["Aprobación (art. 82.2 LHA)", "La aprueban las Cortes de Aragón, previo conocimiento del informe de la Cámara de Cuentas de Aragón"],
        ["Rendición estatutaria (art. 3.2 LHA)", "Las cuentas se rinden a las Cortes según el art. 41.i) del Estatuto, sin perjuicio del Tribunal de Cuentas y la Cámara de Cuentas"],
      ],
      preguntas: [
        ["media", "La Cuenta General de la Comunidad Autónoma de Aragón la aprueban:", ["Las Cortes de Aragón, previo informe de la Cámara de Cuentas", "El Gobierno de Aragón", "La Intervención General", "El Tribunal de Cuentas"], "Art. 82.2 LHA."],
        ["media", "Forma parte de la cuenta de la Administración de la Comunidad:", ["La Cuenta General de Tesorería", "El Reglamento de las Cortes", "La oferta de empleo público", "El catálogo de puestos"], "Art. 81.2.b) LHA."],
        ["media", "A la cuenta de la Administración se une una memoria:", ["Demostrativa del grado de cumplimiento de los objetivos programados", "Del Justicia de Aragón", "De actividad sindical", "De quejas ciudadanas"], "Art. 81.3.b) LHA."],
        ["dificil", "El déficit o superávit de tesorería por operaciones presupuestarias forma parte de:", ["El resultado del ejercicio de la cuenta de la Administración", "El presupuesto del año siguiente", "La Cuenta de la Deuda", "El informe de la Cámara de Cuentas"], "Art. 81.2.f) LHA."],
        ["media", "La Cuenta General incluye también las cuentas de:", ["Organismos públicos, sociedades mercantiles autonómicas, consorcios y fundaciones del sector público", "Solo la Administración General", "Los ayuntamientos", "Las empresas contratistas"], "Art. 81.1 LHA."],
      ],
    },
  ],
  glosario: [
    [S1, "Contabilidad pública", "Sistema que registra y presenta la información económica, presupuestaria y patrimonial del sector público."],
    [S2, "Contabilidad analítica", "Contabilidad de costes que mide lo que cuesta y rinde cada servicio."],
    [S3, "Intervención General", "Órgano de control interno y centro directivo y gestor de la contabilidad pública de la Comunidad."],
    [S4, "Imagen fiel", "Objetivo de que las cuentas reflejen fielmente patrimonio, situación financiera, resultados y ejecución del presupuesto."],
    [S4, "Devengo", "Reconocimiento de gastos e ingresos cuando se produce la corriente real de bienes y servicios."],
    [S4, "Prudencia", "Precaución en las estimaciones para no sobrevalorar ingresos ni infravalorar gastos."],
    [S5, "Balance", "Estado que muestra el activo, el pasivo y el patrimonio neto de la entidad."],
    [S5, "Estado de liquidación del presupuesto", "Estado que muestra la ejecución final de los créditos y previsiones del ejercicio."],
    [S6, "Cuenta General", "Conjunto de cuentas anuales del sector público autonómico que aprueban las Cortes."],
    [S6, "Resultado presupuestario", "Diferencia entre derechos reconocidos netos y obligaciones reconocidas netas del ejercicio."],
  ],
  casos: [
    {
      slug: "factura-diciembre-devengo",
      titulo: "Una factura de diciembre que se paga en febrero",
      supuesto: "Un organismo autónomo recibe en diciembre un servicio de mantenimiento informático cuya factura se conforma en diciembre y se paga en febrero. También cobra en enero una tasa que se devengó en diciembre. La contable debe aplicar el Plan General de Contabilidad Pública de Aragón.",
      preguntas: [
        [S4, "media", "Conforme al principio de devengo, el gasto del mantenimiento se reconoce:", ["Cuando se presta el servicio, en diciembre", "Cuando se paga, en febrero", "Cuando se aprueba la Cuenta General", "Nunca"], "PGCP Aragón, 3.º.1.b)."],
        [S4, "media", "Según el principio de imputación presupuestaria, la obligación se imputa al presupuesto:", ["Del ejercicio en que se realizó el servicio", "Del ejercicio en que se paga", "De dos ejercicios a partes iguales", "Que elija el organismo"], "PGCP Aragón, 3.º.2.a)."],
        [S5, "media", "El organismo autónomo está obligado a aplicar el PGCP de Aragón porque:", ["Lo exige el art. 2 de la Orden HAP/535/2018", "Lo decide su director", "Es voluntario", "Lo exige el Código de Comercio"], "Orden HAP/535/2018, art. 2.b)."],
        [S2, "media", "Registrar ese gasto sirve, entre otros fines, para:", ["Registrar la ejecución del presupuesto", "Seleccionar personal", "Aprobar leyes", "Fijar tributos"], "Art. 75.a) LHA."],
        [S4, "media", "Si al final del año existe una reclamación probable de un proveedor, la prudencia exige:", ["No infravalorar las obligaciones", "Ignorarla", "Sobrevalorar los ingresos", "Compensarla con un activo"], "PGCP Aragón, 3.º.1.d)."],
        [S4, "media", "Los gastos contabilizados pero no efectivamente realizados:", ["No tienen incidencia presupuestaria; solo afectan al resultado económico-patrimonial", "Se imputan al presupuesto", "Se anulan", "Se pagan"], "PGCP Aragón, 3.º.1.d)."],
        [S4, "dificil", "Si el organismo cambia un criterio contable de forma justificada, debe:", ["Explicarlo en la memoria indicando su incidencia", "No decir nada", "Pedir autorización a las Cortes", "Rehacer cinco años de cuentas"], "PGCP Aragón, 3.º.1.c)."],
        [S5, "media", "El efecto del cobro de la tasa en enero se refleja en el:", ["Estado de flujos de efectivo", "Plan estratégico de subvenciones", "Inventario", "Registro de personal"], "PGCP Aragón, 1.º (cuentas anuales)."],
        [S3, "media", "Las cuentas del organismo se unirán a la Cuenta General que forma:", ["La Intervención General", "El propio organismo en exclusiva", "La Cámara de Cuentas", "El Gobierno central"], "Art. 82.1 LHA."],
        [S6, "media", "La Cuenta General será finalmente aprobada por:", ["Las Cortes de Aragón", "El director del organismo", "La Intervención General", "El Interventor Delegado"], "Art. 82.2 LHA."],
      ],
    },
    {
      slug: "formacion-cuenta-general",
      titulo: "Preparar la Cuenta General",
      supuesto: "En el servicio de contabilidad de la Intervención General se prepara la Cuenta General del ejercicio. Hay que reunir la liquidación del presupuesto, la situación de la tesorería y de la deuda, los compromisos con ejercicios futuros y las cuentas de organismos, sociedades, consorcios y fundaciones.",
      preguntas: [
        [S6, "media", "La liquidación del presupuesto se divide en:", ["Cuadro de créditos y modificaciones, liquidación de gastos y liquidación de ingresos", "Solo gastos", "Solo ingresos", "Ingresos y patrimonio"], "Art. 81.2.a) LHA."],
        [S6, "media", "Los compromisos de gasto con cargo a ejercicios futuros se recogen en:", ["Un estado específico de la cuenta de la Administración", "El presupuesto del año siguiente únicamente", "La memoria de la Cámara de Cuentas", "No se recogen"], "Art. 81.2.g) LHA."],
        [S6, "media", "La situación de la deuda se refleja en:", ["La Cuenta General de la Deuda Pública y la del endeudamiento", "El balance de las sociedades", "El inventario", "La cuenta de tributos cedidos"], "Art. 81.2.c) LHA."],
        [S6, "media", "Los valores a cobrar y obligaciones a pagar de ejercicios anteriores se recogen en:", ["Un estado demostrativo de su evolución y situación", "El presupuesto prorrogado", "El plan de disposición de fondos", "No se recogen"], "Art. 81.2.d) LHA."],
        [S6, "media", "A la cuenta de la Administración se une una memoria de:", ["Coste y rendimiento de los servicios públicos", "Actividades sindicales", "Quejas ciudadanas", "Bienes de los consejeros"], "Art. 81.3.a) LHA."],
        [S3, "media", "Formar la Cuenta General es competencia de la Intervención General como:", ["Centro gestor de la contabilidad pública", "Órgano sancionador", "Tesorería", "Tribunal"], "Art. 77.a) LHA."],
        [S6, "media", "Antes de su aprobación por las Cortes, debe conocerse:", ["El informe de la Cámara de Cuentas de Aragón", "La opinión de los sindicatos", "El dictamen del Consejo de Estado", "El voto de los ayuntamientos"], "Art. 82.2 LHA."],
        [S1, "media", "En la clasificación doctrinal, este trabajo pertenece a la contabilidad:", ["Crítica (rendición y control)", "Preventiva", "Ejecutiva", "Analítica de costes"], "Doctrina hacendística."],
        [S2, "dificil", "Proporcionar datos para la Cuenta General es un fin de la contabilidad pública recogido en:", ["El art. 75.d) de la Ley de Hacienda de Aragón", "El Estatuto de los Trabajadores", "La LOPJ", "El Código Civil"], "Art. 75.d) LHA."],
        [S6, "media", "El resultado del ejercicio incluye, entre otros:", ["El déficit o superávit de tesorería por operaciones presupuestarias", "La plantilla de personal", "El número de expedientes", "La deuda de los ayuntamientos"], "Art. 81.2.f) LHA."],
      ],
    },
    {
      slug: "informacion-trimestral-cortes",
      titulo: "Información trimestral a las Cortes",
      supuesto: "Acaba el segundo trimestre del año. La Comisión de Hacienda de las Cortes espera la información de ejecución del presupuesto y la oposición pide además datos de los proyectos financiados con el Fondo de Compensación Interterritorial y el resultado del control financiero.",
      preguntas: [
        [S3, "media", "La información de ejecución del presupuesto se remite a las Cortes:", ["Dentro del mes siguiente al vencimiento del trimestre", "A fin de año", "Cuando lo decida el consejero", "Cada cinco años"], "Art. 80 LHA."],
        [S3, "media", "Además, esa información debe publicarse en:", ["El Portal de Transparencia de Aragón", "Un periódico privado", "El BOE", "El tablón del departamento"], "Art. 80 LHA."],
        [S3, "media", "Debe incluir el movimiento y situación de:", ["La Tesorería", "El personal laboral", "Los contratos menores de cada ayuntamiento", "Las cuentas de los partidos"], "Art. 80.b) LHA."],
        [S3, "media", "También el grado de ejecución de los proyectos financiados por:", ["El Fondo de Compensación Interterritorial u otros fondos de desarrollo", "Los sindicatos", "Las cofradías", "Empresas privadas"], "Art. 80.d) LHA."],
        [S3, "media", "Y la memoria del control financiero realizado, que elabora en su función de control:", ["La Intervención General", "La Cámara de Cuentas", "Las Cortes", "La Tesorería"], "Art. 80.e) LHA (remisión a los arts. 13 y 66)."],
        [S3, "media", "Remite esta información a las Cortes:", ["El departamento competente en materia de hacienda", "Cada consejería por separado", "El Justicia de Aragón", "El Tribunal de Cuentas"], "Art. 80 LHA."],
        [S2, "media", "Este deber conecta con el fin de la contabilidad pública de:", ["Rendir la información económica y financiera necesaria para la toma de decisiones", "Seleccionar al personal", "Fijar tributos", "Adjudicar contratos"], "Art. 75.f) LHA."],
        [S2, "media", "La obligación general de rendir cuentas a las Cortes, al Tribunal de Cuentas y a la Cámara de Cuentas se canaliza a través de:", ["La Intervención General", "Cada consejero", "Los sindicatos", "Los proveedores"], "Art. 74.1 LHA."],
        [S3, "dificil", "La verificación ordinaria o extraordinaria de la contabilidad corresponde a:", ["La Intervención General y, en su caso, el Tribunal de Cuentas y la Cámara de Cuentas", "Solo las Cortes", "Los ciudadanos", "El servicio gestor"], "Art. 78.1 LHA."],
        [S1, "media", "Las fundaciones del sector público autonómico, para su contabilidad, se ajustan a:", ["El Código de Comercio y el plan contable que les resulte aplicable", "Exclusivamente el PGCP de Aragón", "Ninguna norma", "La Ley de Contratos"], "Art. 78.2 LHA."],
      ],
    },
  ],
});
