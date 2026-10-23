/**
 * Crea tema-397 — Tema 25 de Administrativo DGA (tema 20 del programa de
 * materias específicas): "El Presupuesto de la Comunidad Autónoma de
 * Aragón. Elaboración y aprobación. Ingresos y gastos públicos: estructura
 * y clasificación orgánica, funcional y económica."
 *
 * Fuentes:
 * - Estatuto de Autonomía de Aragón (BOE-A-2007-8444): art. 111.
 * - DLeg 3/2023, TR Ley de Hacienda de Aragón (BOE-A-2023-14052): arts.
 *   5, 16, 17, 29-35 (leídos en la API del BOE).
 * - Ley 5/2012, de Estabilidad Presupuestaria de Aragón (BOE-A-2012-9063):
 *   arts. 10, 12, 13 y 15 (límite de gasto no financiero, fondo de
 *   contingencia mínimo del 0,5 %).
 * - Orden HAP/883/2026, de 19 de junio, de instrucciones para la
 *   elaboración de los Presupuestos de Aragón para 2027 (BOA núm. 117 de
 *   22-06-2026), descargada del BOA y leída: apartados primero a undécimo
 *   y anexo I (secciones, organismos autónomos y entidades de derecho
 *   público), anexo III (clasificación funcional, sustituido por la
 *   corrección de errores del BOA núm. 124 de 01-07-2026), anexo IV
 *   (capítulos y artículos de gastos) y anexo VII (capítulos de ingresos).
 *   Las secciones y departamentos citados son los de esa orden; cambian
 *   con cada reorganización del Gobierno.
 * La tramitación parlamentaria se rige por el Reglamento de las Cortes de
 * Aragón, que no se ha leído en esta sesión: no se detallan sus plazos.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-397-presupuesto-aragon-elaboracion-clasificacion.mjs
 */
import { sembrarTema, ADMIN_DGA } from "./lib/sembrar-tema.mjs";

const EAA = "https://www.boe.es/buscar/act.php?id=BOE-A-2007-8444";
const LHA = "https://www.boe.es/buscar/act.php?id=BOE-A-2023-14052";
const LEPA = "https://www.boe.es/buscar/act.php?id=BOE-A-2012-9063";
const ORDEN = "https://www.boa.aragon.es/cgi-bin/EBOA/BRSCGI?CMD=VEROBJ&MLKOB=1453630510303&type=pdf";
const S1 = "elaboracion-presupuesto-aragon";
const S2 = "aprobacion-contenido-presupuesto";
const S3 = "recursos-hacienda-aragon";
const S4 = "clasificacion-organica";
const S5 = "clasificacion-funcional-programas";
const S6 = "clasificacion-economica";

await sembrarTema({
  tema: {
    slug: "tema-397",
    titulo: "El Presupuesto de la Comunidad Autónoma de Aragón: elaboración y aprobación; ingresos y gastos: clasificación orgánica, funcional y económica",
    descripcion: "Elaboración del Presupuesto de Aragón: escenario plurianual y límite de gasto no financiero (Ley 5/2012), orden anual de instrucciones (Orden HAP/883/2026 para 2027), anteproyectos, plazos y documentación; aprobación por el Gobierno como proyecto de ley, remisión a las Cortes antes del último trimestre y prórroga. Contenido y ámbito del presupuesto. Recursos de la Hacienda aragonesa. Estructura de los gastos: clasificación orgánica (secciones, servicios, organismos autónomos y entidades de derecho público), funcional por programas (grupos de función) y económica (capítulos 1 a 9); fondo financiador, clasificación territorial y proyectos de gasto. Estructura de los ingresos: orgánica y económica (capítulos 1 a 9).",
    contenido: "Cómo se prepara cada verano el presupuesto del Gobierno de Aragón (quién lo hace, con qué plazos y documentos) y cómo se lee una partida presupuestaria: qué significa la sección (el departamento), el programa (para qué se gasta) y el capítulo (en qué se gasta: personal, bienes corrientes, inversiones…), y de dónde vienen los ingresos (impuestos, tasas, transferencias, deuda).",
    enlaces_boe: [
      { url: LHA, titulo: "Decreto Legislativo 3/2023, texto refundido de la Ley de Hacienda de la Comunidad Autónoma de Aragón (BOE-A-2023-14052)" },
      { url: LEPA, titulo: "Ley 5/2012, de 7 de junio, de Estabilidad Presupuestaria de Aragón (BOE-A-2012-9063)" },
      { url: EAA, titulo: "Estatuto de Autonomía de Aragón, art. 111 (BOE-A-2007-8444)" },
      { url: ORDEN, titulo: "Orden HAP/883/2026, de instrucciones para la elaboración de los Presupuestos de Aragón para 2027 (BOA núm. 117, de 22-06-2026)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "Elaboración: escenario, límite de gasto, orden de instrucciones y plazos", articulos: "arts. 12, 13 y 15 Ley 5/2012; art. 33 LHA; Orden HAP/883/2026", url: `${LEPA}#a1-5` },
      { seccion: S2, titulo: "Aprobación, contenido y prórroga", articulos: "art. 111 EAA; arts. 5, 29-31, 34 y 35 LHA", url: `${LHA}#a3-6` },
      { seccion: S3, titulo: "Los recursos de la Hacienda de Aragón", articulos: "arts. 16-17 LHA", url: `${LHA}#a1-8` },
      { seccion: S4, titulo: "Clasificación orgánica", articulos: "art. 32.2.a) LHA; anexos I y II Orden HAP/883/2026", url: `${LHA}#a3-4` },
      { seccion: S5, titulo: "Clasificación funcional por programas", articulos: "art. 32.2.b-c) LHA; anexo III Orden HAP/883/2026", url: `${LHA}#a3-4` },
      { seccion: S6, titulo: "Clasificación económica de gastos e ingresos", articulos: "art. 32.2.d) y 3 LHA; anexos IV y VII Orden HAP/883/2026", url: ORDEN },
    ],
  },
  vinculo: { oposicion: ADMIN_DGA.oposicion, bloqueId: ADMIN_DGA.bloquePresupuesto, numero: 25 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Escenario plurianual (art. 12 Ley 5/2012)", "Antes de elaborar el presupuesto, el departamento de hacienda confecciona escenarios de ingresos y gastos para los tres ejercicios siguientes, ajustados al objetivo de estabilidad"],
        ["Límite de gasto no financiero (art. 13 Ley 5/2012)", "Aprobado el objetivo de estabilidad, el Gobierno lo acuerda a propuesta del consejero de hacienda y lo remite a las Cortes para su aprobación por el Pleno"],
        ["Fondo de contingencia (art. 15 Ley 5/2012)", "Dentro del límite de gasto no financiero, mínimo del 0,5 %; solo financia ampliaciones, incorporaciones, créditos extraordinarios y suplementos; su remanente no se incorpora"],
        ["Orden de instrucciones", "Cada año el departamento de hacienda dicta una orden con los criterios de presupuestación, la estructura del presupuesto y el calendario (para 2027, la Orden HAP/883/2026)"],
        ["Órgano que elabora (Orden HAP/883/2026)", "La Dirección General de Presupuestos elabora los estados de gastos e ingresos del anteproyecto"],
        ["Plazos para 2027 (Orden HAP/883/2026)", "Propuestas de ingresos antes del 6 de julio de 2026, de gastos antes del 22 de julio y del articulado, memorias, objetivos e indicadores y plan de contratación antes del 28 de julio"],
        ["Aplicaciones informáticas", "Las propuestas se graban en ESPRES, en los módulos de presupuestos de SERPA y, para el capítulo 1, en SIRHGA"],
        ["Plazo legal de anteproyectos (art. 33.2 LHA)", "Los departamentos remiten sus anteproyectos de gastos antes del 1 de julio, documentados y ajustados a las directrices del Gobierno"],
        ["Criterios para 2027", "Estabilidad, sostenibilidad y eficiencia; revisión del gasto; prudencia con los fondos finalistas; objetivos, actuaciones e indicadores medibles en cada programa"],
      ],
      preguntas: [
        ["media", "El límite máximo de gasto no financiero del Presupuesto de Aragón lo aprueba, a propuesta del Gobierno:", ["El Pleno de las Cortes de Aragón", "El consejero de hacienda", "La Intervención General", "El Consejo de Política Fiscal y Financiera"], "Art. 13.1 Ley 5/2012."],
        ["media", "El fondo de contingencia del presupuesto aragonés debe tener un importe mínimo del:", ["0,5 % del límite de gasto no financiero", "2 % del presupuesto", "1 % de los ingresos", "5 % de los gastos de personal"], "Art. 15.1 Ley 5/2012."],
        ["dificil", "El remanente del fondo de contingencia al final del ejercicio:", ["No puede incorporarse a ejercicios posteriores", "Se incorpora automáticamente", "Se transfiere a las Cortes", "Se destina a gastos de personal"], "Art. 15.5 Ley 5/2012."],
        ["media", "Los estados de gastos e ingresos del anteproyecto de presupuestos para 2027 los elabora:", ["La Dirección General de Presupuestos", "La Cámara de Cuentas", "Cada servicio por separado sin coordinación", "La Dirección General de la Función Pública"], "Orden HAP/883/2026, apartado sexto."],
        ["media", "Según la Ley de Hacienda, los departamentos remiten sus anteproyectos de gastos antes del:", ["1 de julio", "1 de octubre", "15 de septiembre", "31 de enero"], "Art. 33.2 LHA."],
        ["dificil", "Para el presupuesto de 2027, las propuestas de gastos debían remitirse antes del:", ["22 de julio de 2026", "6 de julio de 2026", "28 de julio de 2026", "1 de octubre de 2026"], "Orden HAP/883/2026, apartado noveno."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Elaboración y aprobación (art. 111.1 EAA)", "El Gobierno de Aragón elabora y ejecuta el presupuesto; las Cortes lo examinan, enmiendan, aprueban y controlan"],
        ["Proyecto de ley (art. 33.5 LHA)", "El departamento de hacienda formula el proyecto con separación de los estados de la Comunidad y de sus organismos autónomos y lo somete al acuerdo del Gobierno"],
        ["Remisión a las Cortes (art. 34 LHA)", "Antes del último trimestre del ejercicio anterior, con su documentación complementaria"],
        ["Tramitación parlamentaria", "Conforme al Reglamento de las Cortes de Aragón (Orden HAP/883/2026, apartado sexto, que remite al art. 35 del TR de la Ley del Presidente y del Gobierno)"],
        ["Contenido (art. 31 LHA)", "Presupuesto único, equilibrado y anual con todos los gastos e ingresos del sector público autonómico y el importe de los beneficios fiscales"],
        ["Ámbito institucional (Orden HAP/883/2026)", "Administración, organismos autónomos, entidades de derecho público con presupuesto administrativo y empresarial, sociedades mercantiles, fundaciones, consorcios adscritos y demás entidades del sector público"],
        ["Reserva de ley (art. 5 LHA)", "El presupuesto y los créditos extraordinarios y suplementos se aprueban por ley; la ley de presupuestos no puede crear tributos"],
        ["Prórroga (art. 35 LHA y 111.3 EAA)", "Si no se aprueba antes del 1 de enero, se prorroga automáticamente el anterior hasta la publicación del nuevo en el BOA"],
      ],
      preguntas: [
        ["media", "Según el Estatuto de Autonomía, el examen, enmienda y aprobación del presupuesto corresponde a:", ["Las Cortes de Aragón", "El Gobierno de Aragón", "El Justicia de Aragón", "La Cámara de Cuentas"], "Art. 111.1 EAA."],
        ["media", "El anteproyecto de Ley de Presupuestos se eleva al Gobierno de Aragón, para su aprobación como proyecto de ley, por:", ["La persona titular del departamento competente en materia de hacienda", "El presidente de las Cortes", "La Directora General de Presupuestos directamente", "El Interventor General"], "Orden HAP/883/2026, apartado sexto; art. 33.5 LHA."],
        ["media", "Los presupuestos de las sociedades mercantiles autonómicas forman parte de:", ["Los Presupuestos del sector público de la Comunidad", "Ningún presupuesto público", "El presupuesto del Estado", "El de las comarcas"], "Orden HAP/883/2026, apartado tercero; art. 31 LHA."],
        ["dificil", "La tramitación parlamentaria de la Ley de Presupuestos de Aragón se realiza conforme a:", ["El Reglamento de las Cortes de Aragón", "La Ley 39/2015", "El Reglamento del Congreso", "Una orden del consejero de hacienda"], "Orden HAP/883/2026, apartado sexto."],
        ["media", "El presupuesto de la Comunidad Autónoma de Aragón debe ser:", ["Único, equilibrado y anual", "Plural, deficitario y bienal", "Solo de gastos", "Aprobado por decreto"], "Art. 31 LHA."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Recursos tributarios (art. 16.1-3 LHA)", "Tributos propios, recargos sobre tributos del Estado y tributos cedidos total o parcialmente por el Estado"],
        ["Sistema de financiación (art. 16.4-6 LHA)", "Otros recursos del sistema de financiación autonómica, el Fondo de Compensación Interterritorial y las asignaciones del art. 158.1 CE"],
        ["Otras asignaciones (art. 16.7 LHA)", "Con cargo a los Presupuestos Generales del Estado, de la Unión Europea o de otros entes"],
        ["Recursos estatutarios (art. 16.8-9 LHA)", "Ingresos derivados de los arts. 107 (transferencias, nivelación y solidaridad) y 108 (acuerdo bilateral económico-financiero con el Estado) del Estatuto"],
        ["Deuda y patrimonio (art. 16.10-13 LHA)", "Producto de la deuda y operaciones de crédito, rendimiento del patrimonio, precios por servicios, ingresos de derecho privado, herencias, legados y donaciones"],
        ["Destino de los recursos (art. 17 LHA)", "Satisfacer el conjunto de las obligaciones, salvo afectación legal de algunos recursos a fines determinados (principio de no afectación)"],
      ],
      preguntas: [
        ["media", "Los tributos cedidos por el Estado a Aragón son, para la Hacienda aragonesa:", ["Un recurso propio de la Comunidad", "Un ingreso del Estado", "Una deuda", "Un ingreso de las comarcas"], "Art. 16.3 LHA."],
        ["media", "Con carácter general, los recursos de la Comunidad se destinan:", ["A satisfacer el conjunto de sus obligaciones, salvo afectación por ley", "Cada uno a un gasto concreto", "Solo a inversiones", "Solo a personal"], "Art. 17.1 LHA."],
        ["dificil", "El acuerdo bilateral económico-financiero con el Estado está previsto en el artículo del Estatuto:", ["108", "111", "67", "41"], "Art. 16.9 LHA."],
        ["media", "El producto de la emisión de deuda es:", ["Un recurso de la Hacienda de la Comunidad", "Un gasto corriente", "Una transferencia de capital", "No puede ser un recurso"], "Art. 16.10 LHA."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Clasificación orgánica (art. 32.2.a LHA)", "Agrupa los créditos por departamentos y servicios presupuestarios: responde a la pregunta \"quién gasta\""],
        ["Centros gestores (Orden HAP/883/2026)", "Unidades orgánicas con diferenciación presupuestaria y responsabilidad en la gestión: Administración (secciones y servicios), organismos autónomos y entidades de derecho público con presupuesto administrativo"],
        ["Secciones presupuestarias", "Los departamentos, los órganos superiores y otras con créditos de naturaleza específica: p. ej. 01 Cortes de Aragón, 02 Presidencia, 26 A las Administraciones Comarcales, 30 Diversos Departamentos"],
        ["Servicios", "El servicio 01 recoge los órganos de apoyo al consejero y la gestión general (Secretaría General Técnica); los demás coinciden con las direcciones generales"],
        ["Organismos autónomos (códigos 51-55)", "51 Instituto Aragonés de Empleo, 52 Servicio Aragonés de Salud, 53 Instituto Aragonés de Servicios Sociales, 54 Instituto Aragonés de la Mujer y 55 Instituto Aragonés de la Juventud"],
        ["Entidades de derecho público con presupuesto administrativo (71-78)", "Entre ellas, Aragonesa de Servicios Telemáticos (71), Instituto Aragonés del Agua (72), INAGA (75) e Instituto Aragonés de Fomento (78)"],
        ["Sector público empresarial y fundacional", "Sus presupuestos de explotación y capital figuran separadamente"],
      ],
      preguntas: [
        ["media", "La clasificación orgánica de los gastos agrupa los créditos:", ["Por departamentos y servicios presupuestarios", "Según su naturaleza económica", "Según las finalidades a conseguir", "Por provincias"], "Art. 32.2.a) LHA."],
        ["media", "En la estructura de 2027, el Servicio Aragonés de Salud figura como:", ["Organismo autónomo (código 52)", "Sección 16", "Sociedad mercantil", "Entidad de derecho público con presupuesto empresarial"], "Orden HAP/883/2026, anexo I."],
        ["media", "En cada sección, el servicio 01 recoge los créditos de:", ["Los órganos de apoyo al consejero y la gestión general del departamento", "La deuda pública", "Las comarcas", "Las Cortes de Aragón"], "Orden HAP/883/2026, anexo I."],
        ["dificil", "La sección presupuestaria 26 se denomina:", ["A las Administraciones Comarcales", "Diversos Departamentos", "Cortes de Aragón", "Departamento de Sanidad"], "Orden HAP/883/2026, anexo I."],
        ["media", "Aragonesa de Servicios Telemáticos es, presupuestariamente:", ["Una entidad de derecho público con presupuesto administrativo", "Un organismo autónomo", "Una sección", "Una fundación"], "Orden HAP/883/2026, anexo I."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["Clasificación funcional (art. 32.2.b LHA)", "Agrupa los créditos según la naturaleza de las actividades a realizar: responde a la pregunta \"para qué se gasta\""],
        ["Programas (art. 32.2.c LHA)", "Los servicios fijan un sistema de objetivos y, conforme a él, los créditos se clasifican por programas"],
        ["Niveles funcionales (anexo III Orden HAP/883/2026)", "Grupo de función, función, subfunción y programa (cuatro dígitos, p. ej. 1231 Selección, Formación y Perfeccionamiento del Personal)"],
        ["Grupos de función", "0 Deuda pública; 1 Servicios de carácter general; 3 Seguridad, protección y promoción social; 4 Bienes públicos de carácter social; 5 Bienes públicos de carácter económico; 6 Regulación económica general; 7 Regulación de sectores productivos; 9 Transferencias a otras Administraciones"],
        ["Ejemplos de funciones", "41 Sanidad, 42 Educación, 45 Cultura, 51 Infraestructuras básicas y del transporte, 71 Agricultura, ganadería y medio ambiente, 75 Turismo"],
        ["Proyectos de gasto (Orden HAP/883/2026)", "Conjunto de actuaciones para un fin definido, anual o plurianual; pueden ser ejecutables (definidos) o bolsa (no determinados en algún extremo)"],
      ],
      preguntas: [
        ["media", "La clasificación funcional agrupa los créditos según:", ["La naturaleza de las actividades a realizar", "El órgano que gasta", "La naturaleza económica del gasto", "La provincia"], "Art. 32.2.b) LHA."],
        ["media", "En la clasificación funcional de Aragón, el grupo de función 4 es:", ["Producción de bienes públicos de carácter social", "Deuda pública", "Servicios de carácter general", "Regulación económica de sectores productivos"], "Orden HAP/883/2026, anexo III."],
        ["dificil", "La función 42 corresponde a:", ["Educación", "Sanidad", "Cultura", "Turismo"], "Orden HAP/883/2026, anexo III."],
        ["media", "El programa 1231 se refiere a:", ["Selección, formación y perfeccionamiento del personal", "Amortización de la deuda", "Turismo", "Carreteras"], "Orden HAP/883/2026, anexo III."],
        ["media", "Un proyecto de gasto cuyo objetivo es concreto pero no está determinado en alguno de sus extremos se denomina:", ["Bolsa", "Ejecutable", "Ampliable", "Extraordinario"], "Orden HAP/883/2026, anexo I.3."],
      ],
    },
    {
      seccion: S6,
      flashcards: [
        ["Clasificación económica de gastos (art. 32.2.d LHA)", "Agrupa los gastos según su naturaleza, separando corrientes y de capital: responde a la pregunta \"en qué se gasta\"; niveles de capítulo, artículo, concepto y subconcepto"],
        ["Capítulos de gastos corrientes", "1 Gastos de personal; 2 Gastos en bienes corrientes y servicios; 3 Gastos financieros; 4 Transferencias corrientes; 5 Fondo de contingencia de ejecución presupuestaria"],
        ["Capítulos de gastos de capital y financieros", "6 Inversiones reales; 7 Transferencias de capital; 8 Activos financieros; 9 Pasivos financieros"],
        ["Artículos del capítulo 1", "10 Altos cargos; 11 Personal eventual de gabinete; 12 Funcionarios; 13 Laborales; 14 Otro personal; 15 Incentivos al rendimiento; 16 Cuotas sociales; 18 Personal de instituciones sanitarias"],
        ["Artículos del capítulo 2", "20 Arrendamientos; 21 Reparación y conservación; 22 Material, suministros y otros; 23 Indemnizaciones por razón del servicio; 26 Servicios asistenciales con medios ajenos"],
        ["Capítulos de ingresos (anexo VII)", "1 Impuestos directos; 2 Impuestos indirectos; 3 Tasas y otros ingresos; 4 Transferencias corrientes; 5 Ingresos patrimoniales; 6 Enajenación de inversiones reales; 7 Transferencias de capital; 8 Activos financieros; 9 Pasivos financieros"],
        ["Estructura de ingresos", "Orgánica (centros gestores con presupuesto de ingresos propio) y económica (capítulos, artículos, conceptos y subconceptos), más el fondo financiador"],
        ["Fondo financiador y territorialización", "Campo que identifica la financiación de cada aplicación de gasto e ingreso; las operaciones de capital se presentan territorializadas"],
        ["Operaciones no financieras y financieras", "No financieras: capítulos 1 a 7 (corrientes 1-5 y de capital 6-7); financieras: capítulos 8 y 9"],
      ],
      preguntas: [
        ["facil", "En la clasificación económica de gastos, el capítulo 1 corresponde a:", ["Gastos de personal", "Inversiones reales", "Gastos financieros", "Transferencias corrientes"], "Orden HAP/883/2026, anexo IV."],
        ["media", "La compra de material de oficina se imputa al capítulo:", ["2, Gastos en bienes corrientes y servicios", "6, Inversiones reales", "1, Gastos de personal", "4, Transferencias corrientes"], "Orden HAP/883/2026, anexo IV (art. 22)."],
        ["media", "Las dietas y gastos de viaje del personal (indemnizaciones por razón del servicio) se imputan al artículo:", ["23", "12", "60", "48"], "Orden HAP/883/2026, anexo IV."],
        ["media", "Una subvención a una familia para gastos corrientes se imputa al capítulo:", ["4, Transferencias corrientes", "7, Transferencias de capital", "2, Bienes corrientes", "8, Activos financieros"], "Orden HAP/883/2026, anexo IV (art. 48)."],
        ["media", "En la clasificación económica de ingresos, las tasas figuran en el capítulo:", ["3", "1", "2", "5"], "Orden HAP/883/2026, anexo VII."],
        ["dificil", "En el presupuesto aragonés, el capítulo 5 de gastos es:", ["Fondo de contingencia de ejecución presupuestaria", "Ingresos patrimoniales", "Inversiones reales", "Pasivos financieros"], "Orden HAP/883/2026, anexo IV."],
        ["media", "La amortización de préstamos se imputa al capítulo de gastos:", ["9, Pasivos financieros", "3, Gastos financieros", "8, Activos financieros", "6, Inversiones reales"], "Orden HAP/883/2026, anexo IV."],
      ],
    },
  ],
  glosario: [
    [S1, "Límite de gasto no financiero", "Techo de gasto no financiero del presupuesto, acordado por el Gobierno y aprobado por las Cortes antes de elaborarlo."],
    [S1, "Fondo de contingencia", "Dotación para atender necesidades imprevistas mediante modificaciones presupuestarias."],
    [S2, "Proyecto de ley de presupuestos", "Texto que aprueba el Gobierno y remite a las Cortes para su tramitación como ley."],
    [S3, "Tributo cedido", "Impuesto estatal cuyo rendimiento, total o parcial, se atribuye a la Comunidad Autónoma."],
    [S4, "Sección presupuestaria", "Primer nivel de la clasificación orgánica: un departamento u órgano superior."],
    [S4, "Centro gestor", "Unidad con diferenciación presupuestaria y responsabilidad en la gestión de los créditos."],
    [S5, "Programa de gasto", "Conjunto de créditos dirigidos a unos objetivos, identificados con un código funcional de cuatro dígitos."],
    [S6, "Aplicación presupuestaria", "Combinación de las clasificaciones orgánica, funcional y económica que identifica un crédito."],
    [S6, "Capítulo", "Primer nivel de la clasificación económica de gastos o ingresos."],
    [S6, "Fondo financiador", "Campo de la aplicación presupuestaria que identifica la fuente de financiación del gasto o ingreso."],
  ],
  casos: [
    {
      slug: "lectura-aplicacion-presupuestaria",
      titulo: "Leer una aplicación presupuestaria",
      supuesto: "Una nueva administrativa de la Secretaría General Técnica del Departamento de Hacienda, Interior y Administración Pública debe tramitar varios gastos: la compra de papel, las dietas de un viaje de un técnico, una subvención corriente a una asociación sin ánimo de lucro, la compra de ordenadores y el pago de los cursos del programa de selección y formación del personal.",
      preguntas: [
        [S4, "media", "En la clasificación orgánica, su departamento es la sección:", ["12", "02", "30", "26"], "Orden HAP/883/2026, anexo I."],
        [S4, "media", "Dentro de la sección, la Secretaría General Técnica corresponde al servicio:", ["01", "51", "71", "99"], "Orden HAP/883/2026, anexo I."],
        [S6, "media", "La compra de papel se imputa al capítulo:", ["2", "6", "1", "4"], "Orden HAP/883/2026, anexo IV."],
        [S6, "media", "Las dietas del viaje se imputan al artículo:", ["23, Indemnizaciones por razón del servicio", "12, Funcionarios", "22, Material", "48, A familias"], "Orden HAP/883/2026, anexo IV."],
        [S6, "media", "La subvención corriente a la asociación se imputa al artículo:", ["48, A familias e instituciones sin fines de lucro", "78", "47, A empresas privadas", "26"], "Orden HAP/883/2026, anexo IV."],
        [S6, "media", "La compra de ordenadores, como bien inventariable, se imputa al capítulo:", ["6, Inversiones reales", "2, Bienes corrientes", "8, Activos financieros", "7, Transferencias de capital"], "Orden HAP/883/2026, anexo IV."],
        [S5, "media", "Los cursos de formación del personal se cargan al programa funcional:", ["1231 Selección, Formación y Perfeccionamiento del Personal", "0111 Deuda Pública", "4121 Sanidad", "7511 Turismo"], "Orden HAP/883/2026, anexo III."],
        [S5, "media", "Ese programa pertenece al grupo de función:", ["1, Servicios de carácter general", "4, Bienes públicos sociales", "6, Regulación económica", "9, Transferencias"], "Orden HAP/883/2026, anexo III."],
        [S6, "media", "La combinación de clasificación orgánica, funcional y económica de un crédito se llama:", ["Aplicación presupuestaria", "Fondo financiador", "Proyecto de gasto", "Remanente"], "Orden HAP/883/2026, apartado cuarto."],
        [S6, "dificil", "La fuente de financiación de cada aplicación se identifica mediante:", ["El fondo financiador", "El NIF del proveedor", "El código de la cuenta bancaria", "El número de expediente de contratación"], "Orden HAP/883/2026, anexo I."],
      ],
    },
    {
      slug: "calendario-presupuesto-2027",
      titulo: "El presupuesto para 2027",
      supuesto: "En junio de 2026 se publica la orden de instrucciones para el presupuesto de 2027. Una Dirección General del Departamento de Medio Ambiente y Turismo, que tiene adscrito el Instituto Aragonés de Gestión Ambiental, prepara sus propuestas.",
      preguntas: [
        [S1, "media", "La orden de instrucciones para 2027 es la:", ["Orden HAP/883/2026", "Orden HAP/658/2025", "Ley 5/2012", "Orden de prórroga"], "BOA núm. 117 de 22-06-2026."],
        [S1, "media", "El presupuesto debe ajustarse al límite de gasto no financiero aprobado por:", ["Las Cortes de Aragón", "La Unión Europea", "El Ministerio de Hacienda", "La propia Dirección General"], "Orden HAP/883/2026, apartado segundo; art. 13 Ley 5/2012."],
        [S1, "media", "Sus propuestas de gasto debían remitirse antes del:", ["22 de julio de 2026", "6 de julio de 2026", "1 de octubre de 2026", "31 de diciembre de 2026"], "Orden HAP/883/2026, apartado noveno."],
        [S1, "media", "Para cada programa debe formular:", ["Objetivos, actuaciones e indicadores medibles", "Solo el importe global", "La lista de funcionarios", "Nada adicional"], "Orden HAP/883/2026, apartado segundo.4."],
        [S1, "media", "Los créditos con fondos europeos deben presupuestarse con criterios de:", ["Prudencia, según la senda financiera y el grado real de ejecución", "Máxima ambición", "Libre estimación", "Indiferencia"], "Orden HAP/883/2026, apartado segundo.3."],
        [S4, "dificil", "El Instituto Aragonés de Gestión Ambiental figura en la estructura como:", ["Entidad de derecho público con presupuesto administrativo (75)", "Organismo autónomo (53)", "Sociedad mercantil", "Sección 22"], "Orden HAP/883/2026, anexo I."],
        [S2, "media", "El anteproyecto, una vez completo, lo aprueba como proyecto de ley:", ["El Gobierno de Aragón", "La Dirección General de Presupuestos", "Las Cortes", "La Cámara de Cuentas"], "Orden HAP/883/2026, apartado sexto."],
        [S2, "media", "Al proyecto se acompaña, entre otros, el informe de:", ["Evaluación de impacto de género", "Auditoría de la Cámara de Cuentas", "El Justicia de Aragón", "Los sindicatos"], "Art. 33.6 LHA y Orden HAP/883/2026."],
        [S2, "media", "El proyecto debe estar en las Cortes:", ["Antes del 1 de octubre de 2026", "Antes del 1 de julio de 2026", "En enero de 2027", "Antes del 31 de diciembre de 2026"], "Art. 34 LHA y art. 111.4 EAA."],
        [S2, "media", "Si el 1 de enero de 2027 no estuviera aprobado:", ["Se prorrogaría automáticamente el presupuesto anterior", "No podría pagarse ninguna nómina", "Se aplicaría el estatal", "Se aprobaría por el consejero"], "Art. 35 LHA."],
      ],
    },
    {
      slug: "ingresos-comunidad-aragon",
      titulo: "Clasificar los ingresos",
      supuesto: "En el servicio de presupuestos se clasifican los ingresos previstos: el rendimiento del IRPF cedido, el IVA cedido, unas tasas por expedición de títulos, una transferencia del Estado para un programa corriente, el alquiler de un local de la Comunidad, la venta de un solar y un préstamo bancario a largo plazo.",
      preguntas: [
        [S6, "media", "El rendimiento del IRPF cedido se clasifica en el capítulo de ingresos:", ["1, Impuestos directos", "2, Impuestos indirectos", "3, Tasas", "4, Transferencias corrientes"], "Orden HAP/883/2026, anexo VII."],
        [S6, "media", "El IVA cedido se clasifica en el capítulo:", ["2, Impuestos indirectos", "1, Impuestos directos", "5, Ingresos patrimoniales", "9, Pasivos financieros"], "Orden HAP/883/2026, anexo VII."],
        [S6, "media", "Las tasas por expedición de títulos van al capítulo:", ["3", "1", "6", "8"], "Orden HAP/883/2026, anexo VII."],
        [S6, "media", "La transferencia corriente del Estado va al capítulo:", ["4", "7", "2", "5"], "Orden HAP/883/2026, anexo VII."],
        [S6, "media", "El alquiler de un local de la Comunidad es un ingreso del capítulo:", ["5, Ingresos patrimoniales", "6, Enajenación de inversiones", "3, Tasas", "8, Activos financieros"], "Orden HAP/883/2026, anexo VII."],
        [S6, "media", "La venta del solar va al capítulo:", ["6, Enajenación de inversiones reales", "5, Ingresos patrimoniales", "9, Pasivos financieros", "7, Transferencias de capital"], "Orden HAP/883/2026, anexo VII."],
        [S6, "media", "El préstamo bancario a largo plazo va al capítulo:", ["9, Pasivos financieros", "8, Activos financieros", "3, Tasas", "5, Ingresos patrimoniales"], "Orden HAP/883/2026, anexo VII."],
        [S3, "media", "Los tributos cedidos son un recurso de la Hacienda aragonesa según:", ["El art. 16 de la Ley de Hacienda de Aragón", "El Código Civil", "La LOPJ", "La Ley 5/2012"], "Art. 16.3 LHA."],
        [S5, "dificil", "El préstamo, como operación de crédito superior a un año, requiere autorización por:", ["Ley de las Cortes de Aragón", "Orden del consejero", "Resolución del jefe de servicio", "Acuerdo de la Mesa de negociación"], "Art. 5.1.d) LHA."],
        [S3, "media", "Salvo afectación legal, todos estos ingresos se destinan a:", ["Satisfacer el conjunto de las obligaciones de la Comunidad", "Un gasto concreto cada uno", "Las comarcas exclusivamente", "Las Cortes"], "Art. 17.1 LHA."],
      ],
    },
  ],
});
