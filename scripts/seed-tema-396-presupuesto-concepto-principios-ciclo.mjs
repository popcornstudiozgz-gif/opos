/**
 * Crea tema-396 — Tema 24 de Administrativo DGA (tema 19 del programa de
 * materias específicas): "El Presupuesto: concepto, clases y principios
 * presupuestarios. El ciclo presupuestario. Presupuesto por programas:
 * concepto y objetivos. Programación, presupuestación y control. El
 * presupuesto en base 0."
 *
 * Fuentes (textos consolidados leídos en esta sesión en la API del BOE):
 * - Constitución Española (BOE-A-1978-31229): art. 134.
 * - Estatuto de Autonomía de Aragón (BOE-A-2007-8444): arts. 111 y 112.
 * - Decreto Legislativo 3/2023, texto refundido de la Ley de Hacienda de
 *   la Comunidad Autónoma de Aragón (BOE-A-2023-14052): arts. 3, 5, 29-36
 *   y 39 (sustituye al DLeg 1/2000, que deroga).
 * - Ley 47/2003, General Presupuestaria (BOE-A-2003-21614): arts. 26-29 y
 *   32-35 (programas presupuestarios, presupuestos limitativos y
 *   estimativos).
 * - LO 2/2012, de Estabilidad Presupuestaria y Sostenibilidad Financiera
 *   (BOE-A-2012-5730): arts. 3-7, 11, 12 y 29.
 * Las clases doctrinales de presupuesto, el origen del presupuesto por
 * programas y la técnica del presupuesto en base cero no están reguladas
 * en ninguna norma: se tratan como doctrina hacendística consolidada, sin
 * cifras ni fechas no verificadas, señalándolo así en el propio tema.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-396-presupuesto-concepto-principios-ciclo.mjs
 */
import { sembrarTema, ADMIN_DGA } from "./lib/sembrar-tema.mjs";

const CE = "https://www.boe.es/buscar/act.php?id=BOE-A-1978-31229";
const EAA = "https://www.boe.es/buscar/act.php?id=BOE-A-2007-8444";
const LHA = "https://www.boe.es/buscar/act.php?id=BOE-A-2023-14052";
const LGP = "https://www.boe.es/buscar/act.php?id=BOE-A-2003-21614";
const LOEP = "https://www.boe.es/buscar/act.php?id=BOE-A-2012-5730";
const S1 = "presupuesto-concepto-clases";
const S2 = "principios-presupuestarios-clasicos";
const S3 = "estabilidad-presupuestaria";
const S4 = "ciclo-presupuestario";
const S5 = "presupuesto-por-programas";
const S6 = "presupuesto-base-cero";

await sembrarTema({
  tema: {
    slug: "tema-396",
    titulo: "El presupuesto: concepto, clases, principios y ciclo presupuestario; presupuesto por programas y presupuesto en base cero",
    descripcion: "Concepto de presupuesto en la Ley de Hacienda de Aragón y en la Ley General Presupuestaria; clases (limitativo y estimativo, entre otras doctrinales). Principios presupuestarios clásicos (legalidad, unidad, universalidad, anualidad, especialidad cualitativa, cuantitativa y temporal, equilibrio) y principios de la LO 2/2012 (estabilidad, sostenibilidad, plurianualidad, transparencia y eficiencia; regla de gasto). El ciclo presupuestario: elaboración, aprobación, ejecución y control, con el calendario de Aragón y la prórroga automática. Presupuesto por programas: programas, objetivos e indicadores; programación, presupuestación y control. El presupuesto en base cero.",
    contenido: "Qué es el presupuesto del Gobierno de Aragón y qué reglas lo rigen: por qué un crédito solo puede gastarse en lo que se aprobó y hasta su importe, por qué cada año se prorroga el anterior si las Cortes no aprueban el nuevo, en qué fechas se prepara, y en qué consisten las técnicas del presupuesto por programas (gastar con objetivos medibles) y en base cero (justificar cada gasto desde cero).",
    enlaces_boe: [
      { url: LHA, titulo: "Decreto Legislativo 3/2023, texto refundido de la Ley de Hacienda de la Comunidad Autónoma de Aragón (BOE-A-2023-14052)" },
      { url: EAA, titulo: "Estatuto de Autonomía de Aragón, art. 111 (BOE-A-2007-8444)" },
      { url: CE, titulo: "Constitución Española, art. 134 (BOE-A-1978-31229)" },
      { url: LGP, titulo: "Ley 47/2003, General Presupuestaria (BOE-A-2003-21614)" },
      { url: LOEP, titulo: "Ley Orgánica 2/2012, de Estabilidad Presupuestaria y Sostenibilidad Financiera (BOE-A-2012-5730)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "Concepto y clases de presupuesto", articulos: "art. 29 LHA; arts. 32-33 LGP", url: `${LHA}#a2-11` },
      { seccion: S2, titulo: "Principios presupuestarios clásicos", articulos: "art. 134 CE; art. 111 EAA; arts. 3, 5, 30, 31, 36 y 39 LHA", url: `${LHA}#a3-3` },
      { seccion: S3, titulo: "Principios de estabilidad presupuestaria y sostenibilidad financiera", articulos: "arts. 3-7, 11, 12 y 29 LO 2/2012; art. 26 LGP", url: `${LOEP}#a3` },
      { seccion: S4, titulo: "El ciclo presupuestario", articulos: "art. 111 EAA; arts. 33-35 LHA", url: `${LHA}#a3-5` },
      { seccion: S5, titulo: "Presupuesto por programas: programación, presupuestación y control", articulos: "art. 32.2.c) LHA; arts. 28, 29 y 35 LGP", url: `${LGP}#a35` },
      { seccion: S6, titulo: "El presupuesto en base cero", articulos: "Doctrina hacendística (sin regulación normativa)", url: "" },
    ],
  },
  vinculo: { oposicion: ADMIN_DGA.oposicion, bloqueId: ADMIN_DGA.bloquePresupuesto, numero: 24 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Concepto en Aragón (art. 29 LHA)", "Expresión cifrada, conjunta y sistemática de las obligaciones que, como máximo, se podrán reconocer y de los derechos que se prevean liquidar por la Comunidad y sus entidades y organismos"],
        ["Concepto estatal (art. 32 LGP)", "Expresión cifrada, conjunta y sistemática de los derechos y obligaciones a liquidar durante el ejercicio por los órganos y entidades del sector público estatal"],
        ["Naturaleza jurídica del presupuesto", "Se aprueba por ley de las Cortes de Aragón (art. 5.1.a LHA): para los gastos es una autorización con límite máximo; para los ingresos, una previsión"],
        ["Presupuesto limitativo y estimativo (art. 33 LGP)", "Limitativo: fija las obligaciones que como máximo pueden reconocerse (Administración y organismos); estimativo: el de las entidades empresariales y fundacionales, con previsiones de sus operaciones"],
        ["Contenido en Aragón (art. 31 LHA)", "Estados de gastos, estados de ingresos y estados de recursos y dotaciones del sector público institucional, más el importe de los beneficios fiscales"],
        ["Otras clases doctrinales", "Ordinario y extraordinario; de gastos y de ingresos; administrativo y consolidado; por objeto del gasto, por programas o en base cero, según la técnica de elaboración"],
      ],
      preguntas: [
        ["media", "Según la Ley de Hacienda de Aragón, el Presupuesto es la expresión cifrada, conjunta y sistemática de:", ["Las obligaciones que como máximo se podrán reconocer y los derechos que se prevean liquidar", "Los ingresos máximos y los gastos mínimos", "Solo los gastos de personal", "Los bienes del patrimonio autonómico"], "Art. 29 LHA."],
        ["media", "En el presupuesto, los créditos de gastos tienen carácter:", ["Limitativo", "Estimativo", "Orientativo", "Indefinido"], "Art. 36.2 LHA."],
        ["media", "Los presupuestos de las entidades empresariales y fundacionales del sector público estatal tienen, según la LGP, carácter:", ["Estimativo", "Limitativo", "Prohibitivo", "Facultativo"], "Art. 33.1.b) LGP."],
        ["dificil", "Además de los estados de gastos e ingresos, el Presupuesto de Aragón incluye:", ["El importe de los beneficios fiscales de los tributos que generen rendimientos a la Hacienda aragonesa", "El inventario de bienes", "La plantilla de cada ayuntamiento", "Las cuentas de las empresas privadas"], "Art. 31 LHA y art. 111.2 EAA."],
        ["media", "El Presupuesto de la Comunidad Autónoma de Aragón se aprueba por:", ["Ley de las Cortes de Aragón", "Decreto del Gobierno de Aragón", "Orden del consejero de Hacienda", "Resolución de la Intervención General"], "Art. 5.1.a) LHA y art. 111.1 EAA."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Legalidad presupuestaria (art. 5.1.a LHA)", "El presupuesto y sus modificaciones por créditos extraordinarios y suplementos se aprueban por ley de las Cortes"],
        ["Unidad y universalidad (art. 31 LHA y 111.2 EAA)", "Presupuesto único que incluye la totalidad de los gastos e ingresos del sector público autonómico"],
        ["Anualidad (art. 30 LHA)", "El ejercicio coincide con el año natural: se imputan los derechos liquidados en el año y las obligaciones reconocidas hasta fin de diciembre por gastos del año"],
        ["Equilibrio (art. 31 LHA)", "El presupuesto de la Comunidad será único, equilibrado y de carácter anual"],
        ["Especialidad cualitativa (art. 36.1 LHA)", "Los créditos se destinan exclusivamente a la finalidad específica para la que fueron autorizados"],
        ["Especialidad cuantitativa (art. 36.2 LHA)", "No pueden adquirirse compromisos por cuantía superior al crédito; son nulos de pleno derecho los actos y disposiciones inferiores a ley que lo infrinjan"],
        ["Vinculación de los créditos (art. 36.4 LHA)", "A nivel de concepto, salvo otras vinculaciones de la ley de presupuestos; los ampliables, al nivel de desagregación con que aparecen"],
        ["Especialidad temporal (art. 39.1 LHA)", "Solo pueden contraerse obligaciones por bienes o servicios del año natural; en el primer mes del año siguiente pueden imputarse gastos devengados en el último trimestre"],
        ["Unidad de caja (art. 3.1.a LHA)", "Todos los fondos y valores de la Hacienda autonómica se integran y custodian en la Tesorería"],
        ["Ley de Presupuestos y tributos (art. 5.2 LHA y 134.7 CE)", "No puede crear tributos; puede modificarlos cuando una ley tributaria sustantiva lo prevea"],
      ],
      preguntas: [
        ["media", "El principio por el que los créditos solo pueden destinarse a la finalidad para la que fueron autorizados es el de:", ["Especialidad cualitativa", "Especialidad cuantitativa", "Universalidad", "Unidad de caja"], "Art. 36.1 LHA."],
        ["media", "Los actos administrativos que adquieran compromisos de gasto por encima del crédito disponible son:", ["Nulos de pleno derecho", "Anulables", "Válidos con convalidación posterior", "Irregulares no invalidantes"], "Art. 36.2 LHA."],
        ["media", "Con carácter general, los créditos de los programas de gasto de Aragón vinculan a nivel de:", ["Concepto", "Capítulo", "Sección", "Subconcepto"], "Art. 36.4 LHA."],
        ["dificil", "Durante el primer mes del año siguiente pueden realizarse operaciones en el presupuesto corriente para imputar gastos devengados en:", ["El último trimestre", "Todo el año anterior", "El último semestre", "Solo diciembre"], "Art. 39.1 LHA."],
        ["media", "Que el presupuesto incluya la totalidad de los gastos e ingresos del sector público autonómico responde al principio de:", ["Universalidad", "Especialidad temporal", "Equilibrio", "Plurianualidad"], "Art. 111.2 EAA y art. 31 LHA."],
        ["media", "La Ley de Presupuestos de Aragón:", ["No puede crear tributos", "Puede crear cualquier tributo", "Solo puede crear tasas", "Puede crear recargos sobre impuestos estatales"], "Art. 5.2 LHA."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Estabilidad presupuestaria (art. 3 LO 2/2012)", "Situación de equilibrio o superávit estructural de las Administraciones Públicas"],
        ["Sostenibilidad financiera (art. 4 LO 2/2012)", "Capacidad para financiar compromisos de gasto presentes y futuros dentro de los límites de déficit, deuda y morosidad comercial; el periodo medio de pago no debe superar el máximo legal"],
        ["Plurianualidad (art. 5 LO 2/2012)", "Los presupuestos se encuadran en un marco presupuestario a medio plazo, compatible con la anualidad de aprobación y ejecución"],
        ["Transparencia (art. 6 LO 2/2012)", "Presupuestos, liquidaciones y contabilidad con información suficiente para verificar el cumplimiento de los objetivos"],
        ["Eficiencia (art. 7 LO 2/2012)", "Planificación plurianual, programación y presupuestación; gestión orientada a la eficacia, eficiencia, economía y calidad"],
        ["Déficit estructural (art. 11 LO 2/2012)", "Ninguna Administración puede incurrir en él, salvo reformas estructurales o, excepcionalmente, catástrofes, recesión grave o emergencias apreciadas por mayoría absoluta del Congreso"],
        ["Regla de gasto (art. 12 LO 2/2012)", "El gasto computable no puede crecer por encima de la tasa de referencia de crecimiento del PIB de medio plazo; los ingresos superiores a los previstos se destinan a reducir deuda"],
        ["Plan presupuestario a medio plazo (art. 29 LO 2/2012)", "Abarca al menos tres años e incluye objetivos de estabilidad, deuda y regla de gasto"],
      ],
      preguntas: [
        ["media", "La LO 2/2012 entiende por estabilidad presupuestaria de las Administraciones Públicas:", ["La situación de equilibrio o superávit estructural", "La ausencia total de deuda", "El déficit inferior al 3 %", "El equilibrio de caja mensual"], "Art. 3.2 LO 2/2012."],
        ["media", "Según la regla de gasto, el gasto computable no puede superar:", ["La tasa de referencia de crecimiento del PIB de medio plazo", "El IPC del año anterior", "El 2 % anual en todo caso", "Lo que decida cada consejero"], "Art. 12.1 LO 2/2012."],
        ["dificil", "Los ingresos que se obtengan por encima de lo previsto deben destinarse, según la regla de gasto:", ["Íntegramente a reducir el nivel de deuda pública", "A aumentar el gasto social", "A fondos de reserva de cada departamento", "A incrementar retribuciones"], "Art. 12.5 LO 2/2012."],
        ["media", "El plan presupuestario a medio plazo abarca un periodo mínimo de:", ["Tres años", "Cinco años", "Un año", "Diez años"], "Art. 29.2 LO 2/2012."],
        ["media", "La capacidad para financiar compromisos de gasto presentes y futuros dentro de los límites de déficit y deuda es el principio de:", ["Sostenibilidad financiera", "Transparencia", "Universalidad", "Especialidad"], "Art. 4.2 LO 2/2012."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Fases del ciclo presupuestario", "Elaboración (Gobierno), examen, enmienda y aprobación (Cortes), ejecución (Gobierno y gestores) y control (Intervención, Cámara de Cuentas, Tribunal de Cuentas y Cortes)"],
        ["Competencias (art. 111.1 EAA)", "Al Gobierno de Aragón, la elaboración y ejecución; a las Cortes, el examen, la enmienda, la aprobación y el control"],
        ["Anteproyectos de gastos (art. 33.2 LHA)", "Los órganos superiores y departamentos los remiten al departamento de hacienda antes del 1 de julio"],
        ["Presupuesto de las Cortes (art. 33.1 LHA)", "Las Cortes remiten sus estados de gastos e ingresos antes del 15 de septiembre para su integración"],
        ["Estado de ingresos (art. 33.4 LHA)", "Lo elabora el departamento competente en materia de hacienda"],
        ["Documentación del proyecto (art. 33.6 LHA)", "Memoria explicativa, informe económico-financiero, estado de consolidación, liquidación del año anterior y avance del corriente, informe de impacto de género, plan estratégico de subvenciones y memoria de beneficios fiscales"],
        ["Remisión a las Cortes (art. 34 LHA y 111.4 EAA)", "Antes del último trimestre del ejercicio anterior (es decir, antes del 1 de octubre)"],
        ["Prórroga automática (art. 35 LHA)", "Si no se aprueba antes del 1 de enero, se prorroga el del ejercicio anterior hasta la publicación del nuevo en el BOA; no se prorrogan los créditos de programas que finalizan"],
        ["Comparación con el Estado (art. 134.3 CE)", "El Gobierno de la Nación presenta los Presupuestos Generales del Estado al menos tres meses antes de la expiración de los del año anterior"],
      ],
      preguntas: [
        ["media", "Los departamentos remiten al de hacienda los anteproyectos de sus estados de gastos antes del:", ["1 de julio", "15 de septiembre", "1 de octubre", "31 de diciembre"], "Art. 33.2 LHA."],
        ["media", "El proyecto de Ley de Presupuestos de Aragón debe presentarse a las Cortes:", ["Antes del último trimestre del ejercicio anterior", "Antes del 31 de diciembre", "En enero del mismo año", "Antes del 1 de julio"], "Art. 34 LHA y art. 111.4 EAA."],
        ["media", "Si el 1 de enero no está aprobada la Ley de Presupuestos de Aragón:", ["Se prorrogan automáticamente los del ejercicio anterior", "No se puede gastar nada", "Se aplican los del Estado", "El Gobierno aprueba un decreto de presupuestos"], "Art. 35.1 LHA."],
        ["dificil", "La prórroga automática no afecta a los créditos de:", ["Programas cuya vigencia temporal finaliza en el ejercicio prorrogado", "Personal", "Deuda pública", "Las Cortes de Aragón"], "Art. 35.2 LHA."],
        ["media", "Las Cortes de Aragón remiten sus estados de gastos e ingresos para su integración en el Presupuesto antes del:", ["15 de septiembre", "1 de julio", "1 de octubre", "30 de noviembre"], "Art. 33.1 LHA."],
        ["media", "Al proyecto de Ley de Presupuestos de Aragón se acompaña, entre otros documentos:", ["Un informe de evaluación de impacto de género", "El inventario de bienes muebles", "La memoria del Justicia de Aragón", "Las actas de las Mesas de negociación"], "Art. 33.6.e) LHA."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["Presupuesto por programas: concepto", "Técnica que organiza el gasto en programas dirigidos a objetivos preestablecidos, con medios asignados e indicadores para medir resultados"],
        ["Programa presupuestario (art. 35.2 LGP)", "Conjunto de gastos para actividades orientadas a objetivos preestablecidos: producir bienes y servicios, cumplir obligaciones específicas o realizar otras actividades del centro gestor"],
        ["Programas de apoyo (art. 35.3 LGP)", "Agrupan servicios horizontales e instrumentales para una mejor gestión de sus créditos"],
        ["Programas en Aragón (art. 32.2.c LHA)", "Los servicios presupuestarios establecen un sistema de objetivos que sirve de marco a su gestión y, de acuerdo con ellos, los créditos se clasifican por programas"],
        ["Programación (art. 29 LGP)", "Programas plurianuales con objetivos medibles, actividades, medios, inversiones e indicadores de ejecución"],
        ["Presupuestación", "Concreción anual de los programas: los créditos que se ponen a disposición del gestor para los objetivos del año (art. 35.4 LGP)"],
        ["Control", "Comprobación del grado de cumplimiento por resultados mensurables o, si no lo son, por indicadores indirectos (art. 35.4 LGP); control de eficacia y eficiencia"],
        ["Objetivos de la técnica", "Vincular gasto y resultados, racionalizar la asignación de recursos, responsabilizar a los gestores y facilitar la evaluación de políticas"],
      ],
      preguntas: [
        ["media", "Un programa presupuestario es el conjunto de gastos orientado a:", ["La consecución de objetivos preestablecidos", "Pagar la deuda pública exclusivamente", "Cubrir el déficit de caja", "Registrar los ingresos"], "Art. 35.2 LGP."],
        ["media", "Cuando los resultados de un programa no son mensurables, su efectividad se comprueba mediante:", ["Indicadores que permitan su medición indirecta", "Encuestas al personal", "La opinión del consejero", "No se comprueba"], "Art. 35.4 LGP."],
        ["media", "En Aragón, los créditos se clasifican por programas de acuerdo con:", ["El sistema de objetivos de los servicios presupuestarios", "El número de funcionarios", "La antigüedad del servicio", "La provincia de destino"], "Art. 32.2.c) LHA."],
        ["dificil", "Las actividades de servicios horizontales e instrumentales pueden configurarse como:", ["Programas de apoyo", "Créditos ampliables", "Fondos de contingencia", "Presupuestos estimativos"], "Art. 35.3 LGP."],
        ["media", "Los indicadores de ejecución de los programas plurianuales sirven para medir el resultado en términos de:", ["Eficacia, eficiencia, economía y calidad", "Solo legalidad", "Solo antigüedad", "Solo número de expedientes"], "Art. 29.6.e) LGP."],
      ],
    },
    {
      seccion: S6,
      flashcards: [
        ["Presupuesto en base cero: idea", "Técnica que obliga a justificar cada año la totalidad de los créditos, como si cada actividad empezara de nuevo, en lugar de partir del presupuesto anterior"],
        ["Presupuesto incremental", "Técnica tradicional opuesta: toma como base el gasto del año anterior y solo discute los incrementos o disminuciones"],
        ["Unidades de decisión", "Ámbitos (servicios, actividades) para los que se elaboran las alternativas de gasto en la base cero"],
        ["Paquetes de decisión", "Documentos que describen cada actividad, sus objetivos, alternativas, costes y consecuencias de no realizarla, con distintos niveles de esfuerzo"],
        ["Ordenación por prioridades", "Los paquetes se clasifican por orden de importancia y se financian de arriba abajo hasta agotar los recursos disponibles"],
        ["Ventajas e inconvenientes", "Permite eliminar gastos inerciales y reasignar recursos; exige mucho trabajo y datos, por lo que suele aplicarse de forma parcial o periódica"],
        ["Situación normativa", "No está regulado en la Ley de Hacienda de Aragón ni en la LGP: es una técnica doctrinal de elaboración, compatible con el presupuesto por programas"],
      ],
      preguntas: [
        ["media", "El presupuesto en base cero exige:", ["Justificar la totalidad de los créditos de cada actividad, sin partir del presupuesto anterior", "Partir siempre del gasto del año anterior", "Fijar todos los créditos en cero euros", "Eliminar el control del gasto"], "Doctrina hacendística sobre la base cero."],
        ["media", "La técnica que parte del gasto del año anterior y discute solo las variaciones es el presupuesto:", ["Incremental", "En base cero", "Por programas", "Consolidado"], "Doctrina hacendística."],
        ["media", "En la base cero, los documentos que describen cada actividad con sus alternativas y costes se llaman:", ["Paquetes de decisión", "Créditos ampliables", "Documentos ADOP", "Memorias de impacto"], "Doctrina hacendística."],
        ["dificil", "En la base cero, los paquetes de decisión se:", ["Ordenan por prioridades y se financian hasta agotar los recursos", "Aprueban todos automáticamente", "Sortean", "Envían al Tribunal de Cuentas"], "Doctrina hacendística."],
        ["media", "Una ventaja de la base cero es:", ["Eliminar gastos inerciales injustificados", "Reducir el trabajo de elaboración", "Suprimir la necesidad de objetivos", "Evitar la aprobación parlamentaria"], "Doctrina hacendística."],
      ],
    },
  ],
  glosario: [
    [S1, "Crédito presupuestario", "Asignación individualizada de gasto que se pone a disposición de un centro gestor para una finalidad aprobada."],
    [S1, "Presupuesto estimativo", "Presupuesto que recoge previsiones sin fijar límites jurídicos máximos de gasto, propio de las entidades empresariales."],
    [S2, "Especialidad cuantitativa", "Regla por la que no puede gastarse por encima del importe del crédito aprobado."],
    [S2, "Vinculación", "Nivel de la clasificación presupuestaria (concepto, artículo, capítulo) al que opera el límite del crédito."],
    [S2, "Unidad de caja", "Integración de todos los fondos públicos en una única Tesorería."],
    [S3, "Déficit estructural", "Déficit ajustado del ciclo económico, neto de medidas excepcionales y temporales."],
    [S3, "Regla de gasto", "Límite al crecimiento del gasto computable ligado al crecimiento del PIB a medio plazo."],
    [S4, "Prórroga presupuestaria", "Aplicación automática del presupuesto anterior mientras no se aprueba el nuevo."],
    [S5, "Indicador", "Medida que permite comprobar el grado de cumplimiento de los objetivos de un programa."],
    [S6, "Paquete de decisión", "En la base cero, documento que describe una actividad, sus alternativas, costes y consecuencias."],
  ],
  casos: [
    {
      slug: "elaboracion-presupuesto-aragon",
      titulo: "El calendario del presupuesto de Aragón",
      supuesto: "Un administrativo de la Secretaría General Técnica de un departamento recibe el encargo de preparar el anteproyecto de gastos del departamento para el próximo ejercicio y de seguir su tramitación hasta la aprobación por las Cortes. Las negociaciones políticas se retrasan y llega el 1 de enero sin presupuesto aprobado.",
      preguntas: [
        [S4, "media", "El anteproyecto de gastos del departamento debe remitirse al de hacienda antes del:", ["1 de julio", "15 de septiembre", "1 de octubre", "1 de enero"], "Art. 33.2 LHA."],
        [S4, "media", "El estado de ingresos de la Comunidad lo elabora:", ["El departamento competente en materia de hacienda", "Cada departamento por separado", "Las Cortes", "La Cámara de Cuentas"], "Art. 33.4 LHA."],
        [S4, "media", "El proyecto de ley lo aprueba, para su remisión a las Cortes:", ["El Gobierno de Aragón", "El consejero de cada departamento", "La Intervención General", "El Justicia de Aragón"], "Art. 33.5 LHA."],
        [S4, "media", "El proyecto debía presentarse en las Cortes:", ["Antes del último trimestre del ejercicio anterior", "Antes del 31 de diciembre", "En el mes de enero", "Antes del 1 de julio"], "Art. 34 LHA."],
        [S4, "media", "Al no estar aprobado el 1 de enero:", ["Se prorroga automáticamente el presupuesto del ejercicio anterior", "Se paraliza todo el gasto", "Se aplica el último presupuesto del Estado", "Se aprueba por decreto-ley obligatoriamente"], "Art. 35.1 LHA y art. 111.3 EAA."],
        [S4, "dificil", "Durante la prórroga, un programa temporal que terminaba en el ejercicio prorrogado:", ["No se prorroga", "Se prorroga íntegramente", "Se duplica", "Pasa a ser ampliable"], "Art. 35.2 LHA."],
        [S4, "media", "Las restantes condiciones de la prórroga las determina:", ["El departamento competente en materia de hacienda", "Las Cortes", "El Tribunal de Cuentas", "Cada servicio gestor"], "Art. 35.3 LHA."],
        [S4, "media", "La prórroga dura hasta:", ["La aprobación y publicación de la nueva ley en el BOA", "El 30 de junio", "Un año completo", "La convocatoria de elecciones"], "Art. 35.1 LHA."],
        [S2, "media", "Que el presupuesto se refiera al año natural es manifestación del principio de:", ["Anualidad", "Unidad de caja", "Especialidad cualitativa", "Universalidad"], "Art. 30 LHA."],
        [S1, "media", "Una vez aprobado, el presupuesto de gastos fija:", ["Las obligaciones que como máximo podrán reconocerse", "Los gastos mínimos obligatorios", "Solo previsiones sin valor jurídico", "Los ingresos máximos"], "Art. 29 LHA."],
      ],
    },
    {
      slug: "creditos-limitativos-servicio",
      titulo: "Un servicio sin crédito suficiente",
      supuesto: "El jefe de un servicio quiere contratar en noviembre una campaña de divulgación por 60.000 euros con cargo a un concepto de \"publicidad\" que solo tiene 35.000 euros disponibles, y propone usar el sobrante de un concepto de \"reparaciones\" del mismo programa sin tramitar nada. Además, pide imputar al presupuesto del año unas facturas de servicios que se prestarán en febrero del año siguiente.",
      preguntas: [
        [S2, "media", "Comprometer 60.000 euros con solo 35.000 de crédito vulnera el principio de:", ["Especialidad cuantitativa", "Unidad", "Universalidad", "Transparencia"], "Art. 36.2 LHA."],
        [S2, "media", "El acto que adquiriera ese compromiso sería:", ["Nulo de pleno derecho", "Anulable", "Válido", "Convalidable por el jefe"], "Art. 36.2 LHA."],
        [S2, "media", "Usar libremente el crédito de reparaciones para publicidad vulnera, en principio, la especialidad:", ["Cualitativa, salvo que ambos créditos estén vinculados", "Temporal", "Cuantitativa solamente", "De caja"], "Art. 36.1 y 4 LHA."],
        [S2, "dificil", "Con carácter general, los créditos de los programas vinculan a nivel de:", ["Concepto", "Capítulo", "Programa entero", "Sección"], "Art. 36.4 LHA."],
        [S2, "media", "Para disponer de más crédito habría que tramitar:", ["Una modificación presupuestaria conforme a la ley", "Nada", "Un simple correo al proveedor", "Una queja"], "Art. 36.1 LHA (remisión a las modificaciones)."],
        [S2, "media", "Imputar al presupuesto del año servicios prestados en febrero del siguiente vulnera la especialidad:", ["Temporal", "Cualitativa", "Cuantitativa", "De unidad"], "Art. 39.1 LHA."],
        [S2, "media", "Solo pueden contraerse obligaciones con cargo a los créditos del año por prestaciones realizadas:", ["En el año natural del ejercicio", "En cualquier momento", "En los cinco años siguientes", "En el ejercicio anterior"], "Art. 39.1 LHA."],
        [S2, "dificil", "Excepcionalmente, se imputan al presupuesto vigente al expedir la orden de pago:", ["Los atrasos de retribuciones del personal y las obligaciones de ejercicios cerrados", "Todas las facturas del año siguiente", "Las subvenciones futuras", "Los gastos de otras Administraciones"], "Art. 39.2 LHA."],
        [S3, "media", "Toda actuación que afecte a gastos futuros debe valorar sus efectos y supeditarse a las exigencias de:", ["Estabilidad presupuestaria y sostenibilidad financiera", "Solo la legalidad formal", "La opinión de los proveedores", "La antigüedad"], "Art. 7.3 LO 2/2012."],
        [S1, "media", "En el presupuesto de gastos, los créditos son, para el jefe de servicio:", ["Un límite máximo", "Una obligación de gastar todo", "Una mera estimación", "Un mínimo garantizado"], "Arts. 29 y 36.2 LHA."],
      ],
    },
    {
      slug: "programa-presupuestario-base-cero",
      titulo: "Rediseñar un programa de gasto",
      supuesto: "La Dirección General responsable de un programa de ayudas a la formación del empleo quiere justificar sus créditos ante el departamento de hacienda: define objetivos (número de personas formadas e insertadas), indicadores y medios, y decide revisar todas sus actividades \"desde cero\", ordenándolas por prioridad.",
      preguntas: [
        [S5, "media", "Definir objetivos, medios e indicadores para los créditos es propio del:", ["Presupuesto por programas", "Presupuesto incremental puro", "Presupuesto estimativo", "Presupuesto de caja"], "Art. 35 LGP y art. 32.2.c) LHA."],
        [S5, "media", "El número de personas formadas e insertadas actúa como:", ["Indicador de resultados", "Crédito ampliable", "Concepto de ingreso", "Fase contable"], "Art. 35.4 LGP."],
        [S5, "media", "En Aragón, el sistema de objetivos de los servicios presupuestarios sirve de base para:", ["Clasificar los créditos por programas", "Fijar los tributos", "Nombrar al personal", "Aprobar la Cuenta General"], "Art. 32.2.c) LHA."],
        [S5, "dificil", "La concreción anual de un programa plurianual es:", ["El programa de gasto del presupuesto anual", "El escenario de ingresos", "La liquidación", "El remanente"], "Art. 35.4 LGP."],
        [S5, "media", "Comparar los resultados con los objetivos fijados corresponde a la fase de:", ["Control", "Programación", "Presupuestación", "Elaboración del estado de ingresos"], "Art. 35.4 LGP."],
        [S6, "media", "Revisar todas las actividades \"desde cero\" es la técnica del presupuesto:", ["En base cero", "Incremental", "Consolidado", "Prorrogado"], "Doctrina hacendística."],
        [S6, "media", "Cada actividad se describirá en un:", ["Paquete de decisión", "Documento AD", "Mandamiento de pago", "Libramiento"], "Doctrina hacendística."],
        [S6, "media", "Ordenadas por prioridad, las actividades se financian:", ["De mayor a menor prioridad hasta agotar los recursos", "Todas por igual", "Al azar", "Solo las más baratas"], "Doctrina hacendística."],
        [S6, "dificil", "Un inconveniente práctico de la base cero es:", ["El gran volumen de trabajo e información que exige", "Que impide eliminar gastos", "Que está prohibida por la LHA", "Que suprime la aprobación por las Cortes"], "Doctrina hacendística."],
        [S3, "media", "La gestión orientada a la eficacia, eficiencia, economía y calidad la exige expresamente:", ["La LO 2/2012 de Estabilidad Presupuestaria", "El Código Civil", "La LOPJ", "El Estatuto de los Trabajadores"], "Art. 7.2 LO 2/2012."],
      ],
    },
  ],
});
