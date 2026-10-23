/**
 * Crea tema-403 — Tema 31 de Administrativo DGA (tema 26 del programa de
 * materias específicas): "Control del gasto público. Clases. Especial
 * referencia del control de legalidad. El Tribunal de Cuentas y la Cámara
 * de Cuentas de Aragón."
 *
 * Fuentes (textos consolidados leídos en esta sesión en la API del BOE):
 * - DLeg 3/2023, TR Ley de Hacienda de Aragón (BOE-A-2023-14052): arts.
 *   12-14 y 62-72 (control interno, función interventora, reparos).
 * - Constitución Española (BOE-A-1978-31229): art. 136.
 * - LO 2/1982, del Tribunal de Cuentas (BOE-A-1982-11584): arts. 1, 2, 4,
 *   5, 13, 15, 19, 29 y 30.
 * - Ley 11/2009, de la Cámara de Cuentas de Aragón (BOE-A-2010-2162):
 *   arts. 1-16, 20 y 21.
 * - Estatuto de Autonomía de Aragón (BOE-A-2007-8444): art. 112.
 * Las clasificaciones doctrinales del control (interno/externo, previo/
 * posterior, de legalidad/de eficacia) se presentan como tales y se
 * anclan en los preceptos legales.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-403-control-gasto-tribunal-camara-cuentas.mjs
 */
import { sembrarTema, ADMIN_DGA } from "./lib/sembrar-tema.mjs";

const LHA = "https://www.boe.es/buscar/act.php?id=BOE-A-2023-14052";
const CE = "https://www.boe.es/buscar/act.php?id=BOE-A-1978-31229";
const LOTCU = "https://www.boe.es/buscar/act.php?id=BOE-A-1982-11584";
const LCCA = "https://www.boe.es/buscar/act.php?id=BOE-A-2010-2162";
const EAA = "https://www.boe.es/buscar/act.php?id=BOE-A-2007-8444";
const S1 = "control-gasto-clases";
const S2 = "funcion-interventora-legalidad";
const S3 = "reparos-omision-fiscalizacion";
const S4 = "control-financiero-eficacia";
const S5 = "tribunal-de-cuentas";
const S6 = "camara-de-cuentas-aragon";

await sembrarTema({
  tema: {
    slug: "tema-403",
    titulo: "Control del gasto público: clases y control de legalidad; el Tribunal de Cuentas y la Cámara de Cuentas de Aragón",
    descripcion: "Clases de control del gasto: interno y externo, previo, concomitante y posterior, de legalidad, financiero y de eficacia; control parlamentario. El control interno en Aragón: la Intervención General con plena autonomía. El control de legalidad: función interventora (fiscalización previa, intervención formal y material del pago, comprobación de la inversión), excepciones a la fiscalización previa, reparos con y sin efecto suspensivo, discrepancias y omisión de fiscalización. Control financiero, auditorías y control de eficacia. Control externo: el Tribunal de Cuentas (art. 136 CE, LO 2/1982: fiscalización y enjuiciamiento contable, órganos, consejeros) y la Cámara de Cuentas de Aragón (Ley 11/2009: naturaleza, ámbito, funciones, programa anual, Cuenta General antes del 30 de junio, informes, memoria y composición).",
    contenido: "Quién vigila cómo gasta el dinero el Gobierno de Aragón: por dentro, la Intervención General, que revisa cada expediente antes de gastar y puede paralizarlo con un «reparo»; por fuera, la Cámara de Cuentas de Aragón y el Tribunal de Cuentas, que examinan las cuentas después, informan a las Cortes y, en el caso del Tribunal, juzgan la responsabilidad contable.",
    enlaces_boe: [
      { url: LHA, titulo: "Decreto Legislativo 3/2023, texto refundido de la Ley de Hacienda de la Comunidad Autónoma de Aragón (BOE-A-2023-14052)" },
      { url: LCCA, titulo: "Ley 11/2009, de 30 de diciembre, de la Cámara de Cuentas de Aragón (BOE-A-2010-2162)" },
      { url: LOTCU, titulo: "Ley Orgánica 2/1982, de 12 de mayo, del Tribunal de Cuentas (BOE-A-1982-11584)" },
      { url: CE, titulo: "Constitución Española, art. 136 (BOE-A-1978-31229)" },
      { url: EAA, titulo: "Estatuto de Autonomía de Aragón, art. 112 (BOE-A-2007-8444)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "El control del gasto público y sus clases", articulos: "arts. 12, 62-64 LHA; art. 136 CE; doctrina", url: `${LHA}#a1-4` },
      { seccion: S2, titulo: "El control de legalidad: la función interventora", articulos: "arts. 12.2, 65, 68 y 69 LHA", url: `${LHA}#a6-7` },
      { seccion: S3, titulo: "Reparos, discrepancias y omisión de la fiscalización", articulos: "arts. 70-72 LHA", url: `${LHA}#a7-2` },
      { seccion: S4, titulo: "Control financiero, auditoría y control de eficacia", articulos: "arts. 13, 14, 66 y 67 LHA", url: `${LHA}#a6-8` },
      { seccion: S5, titulo: "El Tribunal de Cuentas", articulos: "art. 136 CE; arts. 1, 2, 4, 13, 15, 19, 29 y 30 LO 2/1982", url: `${LOTCU}#aprimero` },
      { seccion: S6, titulo: "La Cámara de Cuentas de Aragón", articulos: "art. 112 EAA; arts. 1-16 y 21 Ley 11/2009", url: `${LCCA}#a1` },
    ],
  },
  vinculo: { oposicion: ADMIN_DGA.oposicion, bloqueId: ADMIN_DGA.bloquePresupuesto, numero: 31 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Control interno y externo", "Interno: lo ejerce un órgano de la propia Administración (la Intervención General); externo: un órgano independiente del controlado (Cámara de Cuentas de Aragón, Tribunal de Cuentas) y el control parlamentario"],
        ["Control previo, concomitante y posterior", "Previo: antes de que el acto produzca efectos (fiscalización previa); concomitante: durante la ejecución; posterior o consuntivo: sobre lo ya realizado (auditorías, fiscalización externa)"],
        ["Control de legalidad, financiero y de eficacia", "Legalidad: ajuste a las normas; financiero: funcionamiento económico-financiero y buena gestión; eficacia: cumplimiento de objetivos en relación con su coste"],
        ["Modalidades del control interno (art. 12.1 LHA)", "Función interventora y control financiero, ejercidos por la Intervención General con plena autonomía"],
        ["Ámbito del control interno (art. 62 LHA)", "Todos los actos, documentos y expedientes de los que se deriven derechos y obligaciones de contenido económico se intervienen y contabilizan"],
        ["La Intervención General (art. 63 LHA)", "Centro directivo del control interno y centro directivo y gestor de la contabilidad pública"],
        ["Control parlamentario", "Las Cortes aprueban la Cuenta General, reciben la información trimestral de ejecución y los informes de la Cámara de Cuentas (arts. 80 y 82 LHA; art. 13 Ley 11/2009)"],
      ],
      preguntas: [
        ["media", "El control que ejerce la Intervención General sobre la Administración de la Comunidad es un control:", ["Interno", "Externo", "Jurisdiccional", "Parlamentario"], "Arts. 12 y 63 LHA."],
        ["media", "El control interno de la gestión económico-financiera en Aragón se realiza mediante:", ["La función interventora y el control financiero", "Solo auditorías privadas", "El control parlamentario", "La jurisdicción contable"], "Art. 12.1 LHA."],
        ["media", "El control que ejerce la Cámara de Cuentas de Aragón es:", ["Externo", "Interno", "Previo", "Jerárquico"], "Art. 1 Ley 11/2009."],
        ["dificil", "La Intervención General ejerce sus funciones de control:", ["Con plena autonomía respecto de los órganos cuya gestión controla", "Bajo la dependencia del órgano controlado", "Por delegación de las Cortes", "Como órgano jurisdiccional"], "Arts. 12.1 y 63 LHA."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Objeto de la función interventora (art. 12.2 LHA)", "Controlar los actos que den lugar al reconocimiento de derechos y obligaciones económicas, los ingresos y pagos y la aplicación de los caudales públicos, para asegurar su legalidad"],
        ["Contenido (art. 65.1 LHA)", "Intervención crítica o previa de actos y expedientes; intervención formal de la ordenación del pago; intervención material del pago; intervención de la aplicación de las cantidades (examen documental y comprobación material)"],
        ["Competencias inherentes (art. 65.2 LHA)", "Interponer recursos, recabar asesoramiento e informes, comprobar efectivos de personal y existencias de metálico y valores, e intervenir la liquidación de los presupuestos"],
        ["Órganos (art. 68 LHA)", "La Intervención General y, por delegación, las Intervenciones Delegadas, que dependen funcionalmente de ella; el Interventor General puede avocar"],
        ["Exentos de fiscalización previa de la A y la D (art. 69.1 LHA)", "Contratos menores, contratos derivados de acuerdos marco sin nueva licitación, subvenciones nominativas, transferencias a entes con control financiero, gastos periódicos tras el primero, ayudas de fondos agrícolas europeos y gastos por caja fija"],
        ["Intervención previa de las obligaciones (art. 69.2 LHA)", "Todas, salvo las de pagos a justificar y caja fija y las facturas de capítulo II por importe no superior al límite de la caja fija"],
        ["Otras exclusiones (art. 69.3 LHA)", "El Gobierno, a propuesta de la Intervención General, puede excluir gastos a los que aplicar otras técnicas de control"],
      ],
      preguntas: [
        ["media", "La función interventora comprende, entre otras, la intervención:", ["Material del pago", "Del programa electoral", "De las sentencias", "De los convenios colectivos privados"], "Art. 65.1.c) LHA."],
        ["media", "No están sometidos a fiscalización previa de su autorización y disposición los:", ["Contratos menores", "Contratos de obras de 2 millones", "Convenios de 1 millón", "Gastos de personal no periódicos"], "Art. 69.1.a) LHA."],
        ["media", "Los gastos satisfechos mediante anticipos de caja fija:", ["No están sometidos a fiscalización previa", "Requieren fiscalización previa uno a uno", "Los fiscaliza la Cámara de Cuentas antes del pago", "Están prohibidos"], "Art. 69.1.g) LHA."],
        ["dificil", "Los gastos de carácter periódico y de tracto sucesivo quedan exentos de fiscalización previa:", ["Una vez fiscalizado el gasto del período inicial", "Desde el primer día", "Nunca", "Solo si superan un millón"], "Art. 69.1.e) LHA."],
        ["media", "Las Intervenciones Delegadas dependen funcionalmente de:", ["La Intervención General", "El consejero del departamento", "La Cámara de Cuentas", "Las Cortes"], "Art. 68.2 LHA."],
        ["media", "Intervenir la liquidación de los presupuestos es una competencia:", ["Inherente a la función interventora", "Del Tribunal Supremo", "De la Tesorería", "De los sindicatos"], "Art. 65.2.d) LHA."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Reparo (art. 70.1 LHA)", "Desacuerdo de la Intervención con el fondo o la forma del acto o expediente, formulado por escrito"],
        ["Reparo sobre derechos (art. 70.2 LHA)", "Si afecta al reconocimiento o liquidación de derechos, se formaliza en nota de reparo y, si persiste, por los recursos que procedan"],
        ["Reparo suspensivo (art. 70.3 LHA)", "Suspende la tramitación si se basa en insuficiencia o inadecuación del crédito, graves irregularidades en la justificación de las órdenes de pago, falta de requisitos esenciales o riesgo de quebranto, o comprobaciones materiales"],
        ["Discrepancia (art. 71.1 LHA)", "Reparo de una Intervención Delegada: resuelve la Intervención General con carácter obligatorio; si el reparo es de la Intervención General o lo confirma: resuelve el Gobierno de Aragón"],
        ["Informe favorable condicionado (art. 71.2 LHA)", "Con defectos no esenciales, la eficacia del acto queda condicionada a su subsanación"],
        ["Omisión de la fiscalización (art. 72 LHA)", "Si la fiscalización era preceptiva y se omitió, no se expiden pagos; la Intervención emite su opinión y el consejero puede someter lo actuado al Gobierno, comunicándolo por conducto de la Intervención General"],
      ],
      preguntas: [
        ["media", "Los reparos de la Intervención se formulan:", ["Por escrito", "Verbalmente", "Por teléfono", "Solo en la Cuenta General"], "Art. 70.1 LHA."],
        ["media", "Un reparo basado en la insuficiencia de crédito:", ["Suspende la tramitación del expediente hasta que se solvente", "No tiene efectos", "Anula el contrato automáticamente", "Solo se comunica a las Cortes"], "Art. 70.3.a) LHA."],
        ["media", "Si un departamento discrepa de un reparo de una Intervención Delegada, resuelve:", ["La Intervención General, con carácter obligatorio", "El propio departamento", "La Cámara de Cuentas", "El Tribunal Superior de Justicia"], "Art. 71.1.a) LHA."],
        ["dificil", "Si persiste la discrepancia con un reparo de la Intervención General, la resolución definitiva corresponde a:", ["El Gobierno de Aragón", "El consejero de hacienda", "Las Cortes de Aragón", "El Tribunal de Cuentas"], "Art. 71.1.b) LHA."],
        ["media", "Si se omitió una fiscalización previa preceptiva:", ["No se expedirán los mandamientos de pago sin acreditar ese trámite", "El pago se hace igualmente", "Se convalida automáticamente", "Se anula todo el presupuesto"], "Art. 72.1 LHA."],
        ["media", "Con defectos no esenciales, la Intervención puede:", ["Emitir informe favorable condicionando la eficacia a su subsanación", "Archivar el expediente", "Sancionar al gestor", "Remitirlo al juzgado"], "Art. 71.2 LHA."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Control financiero (art. 13 LHA)", "Comprueba que el funcionamiento económico-financiero de Administración, organismos, sociedades, consorcios y fundaciones se ajusta a las normas y a la buena gestión financiera"],
        ["Beneficiarios de ayudas (arts. 13.2 y 66.1.b LHA)", "La Intervención General controla también a los beneficiarios de subvenciones, créditos y avales, incluidos los de fondos europeos"],
        ["Informe (art. 66 LHA)", "El control financiero termina con informe; puede ejercerse separadamente de la función interventora y abarcar la regularidad y los estados financieros"],
        ["Auditoría (art. 67 LHA)", "Sustituye a la fiscalización previa en entidades de derecho público, sociedades, consorcios y fundaciones; comprueba cobros, pagos, justificantes y existencias"],
        ["Control de eficacia (art. 14 LHA)", "Analiza el cumplimiento de los objetivos de los programas en relación con su coste y utilidad o rendimiento"],
        ["Comprobación material de subvenciones (art. 52.2 LHA)", "En subvenciones de capital superiores a 200.000 euros se solicita la designación de representante de la Intervención General"],
      ],
      preguntas: [
        ["media", "El control de eficacia analiza:", ["El cumplimiento de los objetivos de los programas en relación con su coste y rendimiento", "Solo la legalidad formal", "La puntualidad del personal", "El número de expedientes"], "Art. 14 LHA."],
        ["media", "En las sociedades mercantiles autonómicas, la fiscalización previa se sustituye por:", ["El control financiero mediante procedimientos de auditoría", "Ningún control", "El control de las Cortes", "La inspección de trabajo"], "Art. 67.1 LHA."],
        ["media", "El control financiero sobre beneficiarios de subvenciones lo ejerce:", ["La Intervención General", "El servicio gestor exclusivamente", "La Cámara de Cuentas en exclusiva", "El Justicia de Aragón"], "Art. 13.2 LHA."],
        ["dificil", "El control financiero:", ["Puede ejercerse separada e independientemente de la función interventora", "Solo puede ejercerse con la función interventora", "Es un control jurisdiccional", "Lo ejercen las Cortes"], "Art. 66.2 LHA."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["Naturaleza (art. 136.1 CE y art. 1 LO 2/1982)", "Supremo órgano fiscalizador de las cuentas y de la gestión económica del Estado y del sector público; depende de las Cortes Generales y es único en su orden"],
        ["Funciones (art. 2 LO 2/1982)", "Fiscalización externa, permanente y consuntiva de la actividad económico-financiera del sector público, y enjuiciamiento de la responsabilidad contable"],
        ["Sector público (art. 4 LO 2/1982)", "Incluye a las Comunidades Autónomas, además de la Administración del Estado, corporaciones locales, Seguridad Social, organismos autónomos y empresas públicas; también fiscaliza ayudas y partidos políticos"],
        ["Informe anual (art. 13 LO 2/1982)", "Se remite a las Cortes Generales y también a las Asambleas Legislativas de las CCAA"],
        ["Jurisdicción contable (art. 15 LO 2/1982)", "Sobre las cuentas de quienes manejan caudales o efectos públicos, incluidos los alcances"],
        ["Órganos (art. 19 LO 2/1982)", "Presidente, Pleno, Comisión de Gobierno, Sección de Fiscalización, Sección de Enjuiciamiento, Consejeros de Cuentas, Fiscalía y Secretaría General"],
        ["Consejeros de Cuentas (art. 30 LO 2/1982)", "Doce: seis por el Congreso y seis por el Senado, por mayoría de tres quintos, para nueve años; independientes e inamovibles"],
        ["Presidente (art. 29 LO 2/1982)", "Nombrado por el Rey de entre sus miembros, a propuesta del Pleno, por tres años"],
      ],
      preguntas: [
        ["media", "El Tribunal de Cuentas depende directamente de:", ["Las Cortes Generales", "El Gobierno", "El Consejo General del Poder Judicial", "El Ministerio de Hacienda"], "Art. 136.1 CE."],
        ["media", "Es función propia del Tribunal de Cuentas, además de la fiscalización:", ["El enjuiciamiento de la responsabilidad contable", "La aprobación del presupuesto", "La gestión de la Tesorería", "La inspección tributaria"], "Art. 2.b) LO 2/1982."],
        ["media", "Los Consejeros de Cuentas son:", ["Doce, designados seis por el Congreso y seis por el Senado", "Nueve, designados por el Gobierno", "Cinco, elegidos por los jueces", "Tres, nombrados por el Rey libremente"], "Art. 30.1 LO 2/1982."],
        ["dificil", "El mandato de los Consejeros de Cuentas dura:", ["Nueve años", "Seis años", "Cuatro años", "Tres años"], "Art. 30.1 LO 2/1982."],
        ["media", "El informe anual del Tribunal de Cuentas se remite también a:", ["Las Asambleas Legislativas de las Comunidades Autónomas", "Los ayuntamientos", "La Comisión Europea", "Los sindicatos"], "Art. 13.2 LO 2/1982."],
        ["media", "El Presidente del Tribunal de Cuentas es nombrado por un periodo de:", ["Tres años", "Nueve años", "Seis años", "Cinco años"], "Art. 29 LO 2/1982."],
      ],
    },
    {
      seccion: S6,
      flashcards: [
        ["Naturaleza (art. 112 EAA y art. 1 Ley 11/2009)", "Órgano de fiscalización externa de la gestión económico-financiera, contable y operativa del sector público de Aragón; depende de las Cortes y actúa por delegación de estas con plena independencia"],
        ["Ámbito (art. 2 Ley 11/2009)", "Administración y organismos de la Comunidad, entidades locales de Aragón y sus organismos, entes participados o financiados mayoritariamente y perceptores de ayudas públicas"],
        ["Funciones (art. 3 Ley 11/2009)", "Fiscalización externa (legalidad, principios contables, eficacia, eficiencia y economía), dictámenes y consultas, fiscalización de privatizaciones; sin perjuicio del Tribunal de Cuentas"],
        ["Programa anual (art. 5 Ley 11/2009)", "Lo aprueba la Cámara previa consulta preceptiva a las Cortes, cuyas prioridades son vinculantes"],
        ["Plazos de rendición (art. 10 Ley 11/2009)", "Cuenta General de la Comunidad antes del 30 de junio siguiente; cuentas locales antes del 15 de octubre; informe definitivo sobre la Cuenta General en seis meses"],
        ["Alegaciones (art. 11 Ley 11/2009)", "Treinta días naturales, prorrogables por igual plazo con justa causa"],
        ["Informes y memoria (arts. 13-14 Ley 11/2009)", "Se elevan a las Cortes, se remiten al Tribunal de Cuentas y se publican; indicios de responsabilidad contable o penal se trasladan al Tribunal de Cuentas y a la Fiscalía; memoria anual a las Cortes en el primer trimestre"],
        ["Composición (arts. 15-16 y 21 Ley 11/2009)", "Tres miembros (uno Presidente), elegidos por el Pleno de las Cortes por tres quintos y nombrados por el Presidente de las Cortes, por seis años reelegibles; órganos: Consejo y Presidente"],
      ],
      preguntas: [
        ["media", "La Cámara de Cuentas de Aragón depende directamente de:", ["Las Cortes de Aragón", "El Gobierno de Aragón", "El Tribunal de Cuentas", "El Justicia de Aragón"], "Art. 112.2 EAA y art. 1.2 Ley 11/2009."],
        ["media", "La Cuenta General de la Comunidad debe presentarse a la Cámara de Cuentas antes del:", ["30 de junio inmediato posterior al ejercicio", "31 de marzo", "15 de octubre", "31 de diciembre"], "Art. 10.1 Ley 11/2009."],
        ["media", "La Cámara de Cuentas de Aragón está compuesta por:", ["Tres miembros, uno de los cuales es el Presidente", "Doce consejeros", "Cinco miembros", "Un único auditor"], "Art. 15.1 Ley 11/2009."],
        ["dificil", "Los miembros de la Cámara de Cuentas son elegidos por el Pleno de las Cortes por mayoría de:", ["Tres quintos", "Mayoría simple", "Dos tercios", "Mayoría absoluta"], "Art. 16.1 Ley 11/2009."],
        ["media", "El mandato de los miembros de la Cámara de Cuentas dura:", ["Seis años, con posible reelección", "Nueve años sin reelección", "Cuatro años", "Tres años"], "Art. 16.2 Ley 11/2009."],
        ["media", "Si la Cámara advierte indicios de responsabilidad contable, los traslada a:", ["El Tribunal de Cuentas", "El Gobierno de Aragón", "La Intervención General", "El Justicia de Aragón"], "Art. 13.4 Ley 11/2009."],
        ["dificil", "Las cuentas de las corporaciones locales deben presentarse a la Cámara antes del:", ["15 de octubre inmediato posterior", "30 de junio", "31 de enero", "1 de marzo"], "Art. 10.2 Ley 11/2009."],
      ],
    },
  ],
  glosario: [
    [S1, "Control interno", "Control ejercido por un órgano de la propia Administración, como la Intervención General."],
    [S1, "Control externo", "Control ejercido por un órgano independiente, como la Cámara de Cuentas o el Tribunal de Cuentas."],
    [S2, "Fiscalización previa", "Examen de legalidad de un acto o expediente antes de que produzca efectos económicos."],
    [S2, "Intervención Delegada", "Órgano de control interno en un departamento u organismo, dependiente funcionalmente de la Intervención General."],
    [S3, "Reparo", "Objeción formal de la Intervención a un expediente por motivos de fondo o forma."],
    [S3, "Omisión de fiscalización", "Situación en que se ha tramitado un gasto sin la fiscalización previa preceptiva."],
    [S4, "Control financiero", "Control posterior del funcionamiento económico-financiero y de la buena gestión de las entidades y beneficiarios."],
    [S5, "Responsabilidad contable", "Obligación de reparar el daño causado a los fondos públicos por quien los maneja, que juzga el Tribunal de Cuentas."],
    [S5, "Alcance", "Saldo deudor injustificado de una cuenta o falta de numerario en quien maneja caudales públicos."],
    [S6, "Programa anual de fiscalización", "Planificación anual de las actuaciones de la Cámara de Cuentas, previa consulta a las Cortes."],
  ],
  casos: [
    {
      slug: "reparo-contrato-sin-credito",
      titulo: "Un reparo a un contrato",
      supuesto: "Un departamento remite a su Intervención Delegada un expediente de contratación de servicios de 300.000 euros. La Intervención observa que el crédito propuesto no es adecuado y que falta el informe jurídico preceptivo. El departamento no está de acuerdo y quiere seguir adelante.",
      preguntas: [
        [S2, "media", "Al examinar el expediente antes de aprobar el gasto, la Intervención ejerce:", ["La fiscalización previa, parte de la función interventora", "Un control externo", "El control de eficacia", "La jurisdicción contable"], "Art. 65.1.a) LHA."],
        [S3, "media", "La Intervención debe formular su disconformidad:", ["Por escrito mediante reparo", "Verbalmente", "En la prensa", "En la Cuenta General"], "Art. 70.1 LHA."],
        [S3, "media", "El reparo por crédito inadecuado:", ["Suspende la tramitación del expediente", "No suspende nada", "Anula el contrato", "Se comunica solo a fin de año"], "Art. 70.3.a) LHA."],
        [S3, "media", "La falta de un trámite esencial también:", ["Suspende la tramitación", "Es irrelevante", "Se subsana sola", "Solo genera una multa"], "Art. 70.3.c) LHA."],
        [S3, "media", "Al discrepar el departamento de un reparo de la Intervención Delegada, resuelve:", ["La Intervención General", "El propio consejero", "Las Cortes", "El Tribunal de Cuentas"], "Art. 71.1.a) LHA."],
        [S3, "dificil", "Si la Intervención General confirma el reparo y persiste la discrepancia, decide:", ["El Gobierno de Aragón", "El Interventor Delegado", "La Cámara de Cuentas", "La Mesa de contratación"], "Art. 71.1.b) LHA."],
        [S2, "media", "Al no ser un contrato menor, este contrato:", ["Está sometido a fiscalización previa", "Está exento de fiscalización", "Solo se controla después", "No se controla"], "Art. 69.1.a) LHA."],
        [S2, "media", "Para su examen, la Intervención puede:", ["Recabar asesoramiento jurídico e informes técnicos", "Sancionar al jefe de servicio", "Adjudicar el contrato", "Modificar el pliego"], "Art. 65.2.b) LHA."],
        [S6, "media", "Más adelante, este contrato podrá ser examinado también por:", ["La Cámara de Cuentas de Aragón en su fiscalización externa", "Ningún órgano más", "Solo el proveedor", "El Consejo de Estado"], "Art. 6.2.c) Ley 11/2009."],
        [S1, "media", "El control de la Intervención Delegada es un control:", ["Interno", "Externo", "Parlamentario", "Jurisdiccional"], "Arts. 12 y 68 LHA."],
      ],
    },
    {
      slug: "fiscalizacion-camara-cuentas-cuenta-general",
      titulo: "La Cámara de Cuentas examina la Cuenta General",
      supuesto: "La Intervención General ha formado la Cuenta General del ejercicio anterior. Debe remitirla a la Cámara de Cuentas, que la examinará, pedirá alegaciones y emitirá su informe antes de que las Cortes la aprueben.",
      preguntas: [
        [S6, "media", "La Cuenta General debe presentarse a la Cámara de Cuentas antes del:", ["30 de junio", "1 de enero", "15 de octubre", "31 de diciembre"], "Art. 10.1 Ley 11/2009."],
        [S6, "media", "La Cámara debe emitir el informe definitivo en el plazo de:", ["Seis meses desde la presentación", "Un mes", "Dos años", "Tres meses"], "Art. 10.5 Ley 11/2009."],
        [S6, "media", "Antes del informe definitivo, el Gobierno puede alegar en:", ["Treinta días naturales, prorrogables con justa causa", "Diez días hábiles", "Seis meses", "No hay alegaciones"], "Art. 11 Ley 11/2009."],
        [S6, "media", "El informe valorará, entre otros, la observancia de la legalidad y:", ["Los criterios de eficacia, eficiencia y economía", "La afiliación sindical", "El número de altos cargos", "La opinión ciudadana"], "Art. 12.3 Ley 11/2009."],
        [S6, "media", "El informe se eleva a las Cortes, se remite al Tribunal de Cuentas y se publica en:", ["El Boletín Oficial de las Cortes de Aragón", "Un periódico privado", "El tablón del departamento", "El BOE exclusivamente"], "Art. 13.1 Ley 11/2009."],
        [S6, "dificil", "Las alegaciones no aceptadas por la Cámara:", ["Se hacen constar en el informe", "Se destruyen", "Se envían al juzgado", "Se publican en el BOE"], "Art. 12.3.e) Ley 11/2009."],
        [S5, "media", "Si se detectan indicios de responsabilidad contable, se enjuiciarán por:", ["El Tribunal de Cuentas", "La Cámara de Cuentas", "La Intervención General", "El Gobierno de Aragón"], "Art. 13.4 Ley 11/2009; art. 2.b) LO 2/1982."],
        [S6, "media", "La Cuenta General la aprueban finalmente:", ["Las Cortes de Aragón, conocido el informe de la Cámara", "La Cámara de Cuentas", "El Gobierno", "El Tribunal de Cuentas"], "Art. 82.2 LHA."],
        [S6, "media", "El programa anual de fiscalización se aprueba previa consulta a las Cortes, cuyas prioridades son:", ["Vinculantes", "Orientativas", "Irrelevantes", "Secretas"], "Art. 5.2 Ley 11/2009."],
        [S1, "media", "El examen de la Cámara de Cuentas es un control:", ["Externo y posterior", "Interno y previo", "Jerárquico", "Judicial penal"], "Arts. 1 y 6 Ley 11/2009."],
      ],
    },
    {
      slug: "subvencion-control-financiero-alcance",
      titulo: "Control de una subvención y responsabilidad",
      supuesto: "Una asociación recibió una subvención de capital de 250.000 euros. La Intervención General realiza un control financiero y comprueba que parte de los fondos no se aplicó a su fin. Además, en una caja pagadora aparece un descubierto de fondos sin justificar.",
      preguntas: [
        [S4, "media", "El control sobre la asociación beneficiaria es un:", ["Control financiero de la Intervención General", "Control parlamentario", "Control jurisdiccional", "Control de las Mesas de negociación"], "Arts. 13.2 y 66.1.b) LHA."],
        [S4, "media", "Ese control tiene por objeto comprobar:", ["La efectiva aplicación de la subvención a su finalidad", "El número de socios", "La ideología de la asociación", "Su calendario de actividades"], "Art. 66.1.b) LHA."],
        [S4, "media", "Antes de pagar la subvención, por superar 200.000 euros, debía:", ["Solicitarse un representante de la Intervención General para comprobar la inversión", "Pedirse una ley", "Consultarse al Tribunal de Cuentas", "Nada"], "Art. 52.2 LHA."],
        [S4, "media", "El control financiero concluye con:", ["La emisión de un informe", "Una sentencia", "Un decreto-ley", "Una multa automática"], "Art. 66.1 LHA."],
        [S6, "media", "La Cámara de Cuentas también puede fiscalizar a la asociación porque:", ["Fiscaliza las ayudas del sector público percibidas por personas físicas o jurídicas", "Fiscaliza toda entidad privada", "Lo pide la asociación", "No puede"], "Art. 2.2 Ley 11/2009."],
        [S5, "media", "El descubierto injustificado en la caja pagadora puede constituir:", ["Un alcance, objeto de la jurisdicción contable", "Un mérito", "Una generación de crédito", "Un remanente"], "Art. 15.2 LO 2/1982."],
        [S5, "media", "La responsabilidad contable la enjuicia:", ["El Tribunal de Cuentas", "La Cámara de Cuentas", "El Gobierno de Aragón", "La Intervención General"], "Art. 2.b) LO 2/1982."],
        [S5, "dificil", "La jurisdicción contable se ejerce respecto de quienes:", ["Recauden, intervengan, administren, custodien, manejen o utilicen caudales públicos", "Solo los altos cargos", "Solo los contribuyentes", "Solo los diputados"], "Art. 15.1 LO 2/1982."],
        [S5, "media", "El Tribunal de Cuentas actúa con:", ["Plena independencia y sometimiento al ordenamiento jurídico", "Dependencia del Gobierno", "Dependencia de la Comunidad", "Dependencia del Ministerio Fiscal"], "Art. 5 LO 2/1982."],
        [S1, "media", "El control del Tribunal de Cuentas es, por su momento, un control:", ["Consuntivo o posterior", "Previo", "Concomitante obligatorio", "Preventivo"], "Art. 2.a) LO 2/1982."],
      ],
    },
  ],
});
