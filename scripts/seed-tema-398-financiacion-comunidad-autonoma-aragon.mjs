/**
 * Crea tema-398 — Tema 26 de Administrativo DGA (tema 21 del programa de
 * materias específicas): "Régimen de financiación de la Comunidad
 * Autónoma de Aragón: fondos del modelo de financiación."
 *
 * Fuentes (textos consolidados leídos en esta sesión en la API del BOE):
 * - Constitución Española (BOE-A-1978-31229): arts. 156-158.
 * - LO 8/1980, de Financiación de las Comunidades Autónomas, LOFCA
 *   (BOE-A-1980-21166): arts. 1, 4, 15 y 16.
 * - Ley 22/2009, del sistema de financiación de las CCAA de régimen común
 *   (BOE-A-2009-20375): arts. 1, 2, 7-11, 19-25 (vigente; sin
 *   modificaciones posteriores a 2022 en el BOE a 23-10-2026).
 * - Estatuto de Autonomía de Aragón (BOE-A-2007-8444): arts. 103-109.
 * - DLeg 3/2023, TR Ley de Hacienda de Aragón (BOE-A-2023-14052): art. 16.
 * - Ley 22/2001, reguladora de los FCI (BOE-A-2001-24963): solo citada.
 * - Nota de prensa del Ministerio de Hacienda de 4-09-2026 sobre el
 *   acuerdo del Consejo de Política Fiscal y Financiera para un nuevo
 *   modelo (hacienda.gob.es): NO es norma vigente; a la fecha del tema
 *   quedaba pendiente su aprobación como ley. Se trata en una sección
 *   aparte, señalándolo expresamente.
 * No se incluyen importes de Aragón en cada fondo (cambian cada año con
 * las entregas a cuenta y liquidaciones) ni se afirma si Aragón es o no
 * beneficiaria de cada fondo de convergencia o del FCI, que no se ha
 * verificado en una fuente primaria.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-398-financiacion-comunidad-autonoma-aragon.mjs
 */
import { sembrarTema, ADMIN_DGA } from "./lib/sembrar-tema.mjs";

const CE = "https://www.boe.es/buscar/act.php?id=BOE-A-1978-31229";
const LOFCA = "https://www.boe.es/buscar/act.php?id=BOE-A-1980-21166";
const L22 = "https://www.boe.es/buscar/act.php?id=BOE-A-2009-20375";
const EAA = "https://www.boe.es/buscar/act.php?id=BOE-A-2007-8444";
const NOTA = "https://www.hacienda.gob.es/en-GB/Prensa/Noticias/Paginas/2026/20260904-NP-CPFF-DIRECTO.aspx";
const S1 = "marco-constitucional-estatutario";
const S2 = "recursos-tributarios-cesion";
const S3 = "fondo-garantia-servicios-fundamentales";
const S4 = "fondo-suficiencia-global";
const S5 = "fondos-convergencia-fci";
const S6 = "reforma-modelo-2026";

await sembrarTema({
  tema: {
    slug: "tema-398",
    titulo: "Régimen de financiación de la Comunidad Autónoma de Aragón: fondos del modelo de financiación",
    descripcion: "Marco constitucional (arts. 156-158 CE), LOFCA y Estatuto de Autonomía de Aragón (arts. 103-109: principios, recursos, potestad tributaria, nivelación, acuerdo bilateral y Comisión Mixta). El sistema de la Ley 22/2009: necesidades globales de financiación, capacidad tributaria y tributos cedidos (IRPF 50 %, IVA 50 %, impuestos especiales 58 %, electricidad 100 %…), Fondo de Garantía de Servicios Públicos Fundamentales (75 % de los recursos tributarios y población ajustada), Fondo de Suficiencia Global, entregas a cuenta y liquidación, Fondos de Convergencia (Competitividad y Cooperación) y Fondos de Compensación Interterritorial. La reforma acordada en el CPFF el 4-09-2026, pendiente de ley.",
    contenido: "De dónde saca el dinero el Gobierno de Aragón: qué parte de los impuestos que pagan los aragoneses se queda la Comunidad (la mitad del IRPF y del IVA, por ejemplo), y cómo funcionan los fondos que reparten el dinero entre comunidades para que la sanidad, la educación y los servicios sociales tengan un nivel parecido en toda España. Incluye la reforma del modelo acordada en septiembre de 2026, que todavía no es ley.",
    enlaces_boe: [
      { url: L22, titulo: "Ley 22/2009, por la que se regula el sistema de financiación de las Comunidades Autónomas de régimen común (BOE-A-2009-20375)" },
      { url: LOFCA, titulo: "Ley Orgánica 8/1980, de Financiación de las Comunidades Autónomas (BOE-A-1980-21166)" },
      { url: EAA, titulo: "Estatuto de Autonomía de Aragón, arts. 103-109 (BOE-A-2007-8444)" },
      { url: CE, titulo: "Constitución Española, arts. 156-158 (BOE-A-1978-31229)" },
      { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2001-24963", titulo: "Ley 22/2001, reguladora de los Fondos de Compensación Interterritorial (BOE-A-2001-24963)" },
      { url: NOTA, titulo: "Ministerio de Hacienda: acuerdo del CPFF de 4-09-2026 sobre la reforma del sistema de financiación autonómica (nota de prensa)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "Marco constitucional, LOFCA y Estatuto de Autonomía", articulos: "arts. 156-158 CE; arts. 1 y 4 LOFCA; arts. 103-109 EAA", url: `${EAA}#a103` },
      { seccion: S2, titulo: "Necesidades de financiación, capacidad tributaria y tributos cedidos", articulos: "arts. 2, 7, 8 y 25 Ley 22/2009; art. 105 EAA", url: `${L22}#a8` },
      { seccion: S3, titulo: "Fondo de Garantía de Servicios Públicos Fundamentales", articulos: "art. 15 LOFCA; arts. 9 y 19 Ley 22/2009", url: `${L22}#a9` },
      { seccion: S4, titulo: "Fondo de Suficiencia Global; entregas a cuenta y liquidación", articulos: "arts. 10, 11, 20 y 21 Ley 22/2009", url: `${L22}#a10` },
      { seccion: S5, titulo: "Fondos de Convergencia y Fondos de Compensación Interterritorial", articulos: "arts. 22-24 Ley 22/2009; art. 16 LOFCA; art. 158.2 CE", url: `${L22}#a22` },
      { seccion: S6, titulo: "La reforma del modelo acordada en 2026 (pendiente de ley)", articulos: "Acuerdo del CPFF de 4-09-2026", url: NOTA },
    ],
  },
  vinculo: { oposicion: ADMIN_DGA.oposicion, bloqueId: ADMIN_DGA.bloquePresupuesto, numero: 26 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Autonomía financiera (art. 156.1 CE)", "Las CCAA gozan de autonomía financiera para sus competencias, con arreglo a los principios de coordinación con la Hacienda estatal y solidaridad entre todos los españoles"],
        ["Recursos de las CCAA (art. 157.1 CE)", "Impuestos cedidos, recargos y participaciones en ingresos del Estado; impuestos propios, tasas y contribuciones especiales; FCI y asignaciones del Estado; patrimonio y derecho privado; operaciones de crédito"],
        ["Ley orgánica de financiación (art. 157.3 CE)", "Regula el ejercicio de las competencias financieras: es la LOFCA (LO 8/1980)"],
        ["Asignación de nivelación (art. 158.1 CE)", "Asignación en los Presupuestos del Estado según los servicios asumidos y la garantía de un nivel mínimo de los servicios públicos fundamentales"],
        ["Principios en el Estatuto (art. 103 EAA)", "Suficiencia de recursos, equidad, solidaridad, coordinación, equilibrio financiero y lealtad institucional"],
        ["Potestad tributaria (art. 105 EAA)", "Aragón puede establecer tributos propios y recargos; en los tributos cedidos totalmente, competencia normativa en tipos, exenciones, reducciones y deducciones"],
        ["Criterios estatutarios (art. 107.5 EAA)", "Para fijar la financiación de Aragón se atiende al esfuerzo fiscal, la estructura territorial y poblacional (envejecimiento, dispersión y baja densidad) y los desequilibrios territoriales"],
        ["Acuerdo bilateral (art. 108 EAA)", "La AGE y Aragón suscriben un acuerdo económico-financiero, formalizado en Comisión Mixta y revisable periódicamente"],
        ["Comisión Mixta de Asuntos Económico-Financieros (art. 109 EAA)", "Órgano bilateral Estado-Aragón: acuerda el alcance de la cesión de tributos, valora traspasos, estudia inversiones del Estado y sigue el acuerdo bilateral"],
      ],
      preguntas: [
        ["media", "La autonomía financiera de las Comunidades Autónomas se ejerce, según la Constitución, con arreglo a los principios de:", ["Coordinación con la Hacienda estatal y solidaridad entre todos los españoles", "Soberanía fiscal y competencia", "Unidad de mercado y libre competencia", "Autarquía y suficiencia"], "Art. 156.1 CE."],
        ["media", "La ley orgánica prevista en el art. 157.3 de la Constitución es:", ["La LOFCA (LO 8/1980)", "La Ley General Tributaria", "La Ley 47/2003", "La LO 2/2012"], "Art. 157.3 CE y art. 1 LOFCA."],
        ["media", "El órgano bilateral Estado-Aragón en materia de financiación es:", ["La Comisión Mixta de Asuntos Económico-Financieros", "El Consejo de Política Fiscal y Financiera", "La Cámara de Cuentas", "La Junta de Reclamaciones Económico-Administrativas"], "Art. 109 EAA."],
        ["dificil", "Según el Estatuto, para determinar la financiación de Aragón se atiende especialmente a:", ["El envejecimiento, la dispersión y la baja densidad de población", "Solo el PIB per cápita", "El número de funcionarios", "La deuda acumulada"], "Art. 107.5 EAA."],
        ["media", "En los tributos cedidos totalmente, Aragón tiene competencia normativa, en todo caso, sobre:", ["Tipo impositivo, exenciones, reducciones en la base y deducciones en la cuota", "La gestión del IVA", "La creación del IRPF", "Los aranceles"], "Art. 105.2 EAA."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Objeto de la Ley 22/2009 (art. 1)", "Regula desde el 1 de enero de 2009 el sistema de financiación de las CCAA de régimen común y Ciudades con Estatuto: garantía de servicios fundamentales, fondos de convergencia y cesión de tributos"],
        ["Necesidades globales de financiación (art. 2)", "Las del año 2007 más los recursos adicionales del sistema: es la suficiencia estática en el año base"],
        ["Recursos del sistema (art. 7)", "Capacidad tributaria, transferencia del Fondo de Garantía y Fondo de Suficiencia Global"],
        ["Capacidad tributaria (art. 8)", "Recursos tributarios de cada Comunidad: ITPAJD, Sucesiones y Donaciones, juego, tasas, matriculación, tarifa autonómica del IRPF, IVA e impuestos especiales cedidos"],
        ["Porcentajes de cesión (art. 8)", "IRPF 50 %, IVA 50 %, impuestos especiales sobre cerveza, productos intermedios, alcohol, hidrocarburos y tabaco 58 %, electricidad 100 %"],
        ["Criterio de imputación del IVA (art. 8.e)", "Recaudación líquida estatal × 50 % × índice de consumo de la Comunidad certificado por el INE"],
        ["Tributos cedidos (art. 25)", "Entre otros, IRPF, Patrimonio, Sucesiones y Donaciones, ITPAJD, IVA, impuestos especiales, determinados medios de transporte, electricidad y tributos sobre el juego"],
        ["Gestión (art. 106 EAA)", "Aragón gestiona sus tributos propios y, por delegación, los cedidos totalmente; los cedidos parcialmente los gestiona el Estado"],
      ],
      preguntas: [
        ["media", "En el sistema de la Ley 22/2009, el porcentaje cedido a las CCAA del rendimiento del IRPF es del:", ["50 %", "33 %", "58 %", "100 %"], "Art. 8.d) Ley 22/2009."],
        ["media", "El porcentaje cedido de la recaudación líquida del IVA es del:", ["50 %", "35 %", "58 %", "75 %"], "Art. 8.e) Ley 22/2009."],
        ["media", "El Impuesto sobre la Electricidad está cedido en un:", ["100 %", "58 %", "50 %", "0 %"], "Art. 8.k) Ley 22/2009."],
        ["dificil", "El Impuesto sobre Hidrocarburos está cedido en un:", ["58 %", "50 %", "100 %", "40 %"], "Art. 8.i) Ley 22/2009."],
        ["media", "Los tributos cedidos parcialmente (como el IVA) los gestiona:", ["La Administración del Estado", "La Comunidad Autónoma", "Las comarcas", "Los ayuntamientos"], "Art. 106.2 EAA."],
        ["media", "El sistema de la Ley 22/2009 se aplica desde:", ["El 1 de enero de 2009", "El 1 de enero de 2002", "El 1 de enero de 2015", "El 1 de enero de 2027"], "Art. 1 Ley 22/2009."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Servicios públicos fundamentales (art. 15.1 LOFCA)", "La educación, la sanidad y los servicios sociales esenciales"],
        ["Objeto del Fondo de Garantía (art. 9 Ley 22/2009)", "Asegurar que cada Comunidad recibe los mismos recursos por habitante ajustado para financiar los servicios públicos fundamentales"],
        ["Dotación del Fondo de Garantía (art. 9.a)", "El 75 % de los recursos tributarios de cada Comunidad, en términos normativos, más la aportación de recursos adicionales del Estado"],
        ["Población ajustada (art. 9.b)", "Población 30 %; población protegida equivalente (sanitaria) 38 %; población de 0 a 16 años 20,5 %; mayores de 65 años 8,5 %; superficie 1,8 %; dispersión 0,6 %; insularidad 0,6 %"],
        ["Transferencia de garantía (art. 9.c)", "Saldo positivo o negativo entre la participación de la Comunidad en el Fondo y el 75 % de sus recursos tributarios normativos"],
        ["Valor normativo", "Rendimiento de un tributo sin tener en cuenta el ejercicio de competencias normativas por la Comunidad (subidas o rebajas propias)"],
        ["Entregas a cuenta del Fondo (art. 19)", "Se reciben por doceavas partes mensuales; si la transferencia es negativa, se compensa con las entregas del resto de recursos"],
      ],
      preguntas: [
        ["media", "El Fondo de Garantía de Servicios Públicos Fundamentales se forma con:", ["El 75 % de los recursos tributarios normativos de las CCAA y la aportación del Estado", "El 100 % del IRPF", "Solo aportaciones del Estado", "El 50 % del IVA"], "Art. 9.a) Ley 22/2009."],
        ["media", "Son servicios públicos fundamentales, según la LOFCA:", ["La educación, la sanidad y los servicios sociales esenciales", "La justicia y la defensa", "El transporte y la vivienda", "La cultura y el deporte"], "Art. 15.1 LOFCA."],
        ["dificil", "En el reparto del Fondo de Garantía, la variable con mayor ponderación es:", ["La población protegida equivalente (38 %)", "La población (30 %)", "La superficie (1,8 %)", "La población de 0 a 16 años (20,5 %)"], "Art. 9.b) Ley 22/2009."],
        ["dificil", "La variable dispersión pondera en el reparto del Fondo de Garantía un:", ["0,6 %", "1,8 %", "8,5 %", "20,5 %"], "Art. 9.b) Ley 22/2009."],
        ["media", "La transferencia del Fondo de Garantía puede ser:", ["Positiva o negativa", "Solo positiva", "Solo negativa", "Siempre igual para todas las CCAA"], "Art. 9.c) Ley 22/2009."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Fondo de Suficiencia Global (art. 10)", "Diferencia, positiva o negativa, entre las necesidades globales de financiación de la Comunidad y la suma de su capacidad tributaria y su transferencia del Fondo de Garantía"],
        ["Función del Fondo de Suficiencia", "Cierra el sistema: garantiza que cada Comunidad cubra sus necesidades del año base"],
        ["Evolución (art. 20)", "Se actualiza con el ITE (Ingresos Tributarios del Estado), excluidos los tributos cedidos; las entregas a cuenta se calculan con el 98 % de la fórmula"],
        ["Revisión del Fondo de Suficiencia (art. 21)", "Por traspasos de nuevos servicios aprobados por real decreto, por la cesión efectiva de nuevos tributos y por cambios en los tipos estatales del IVA o de los impuestos especiales"],
        ["Entregas a cuenta y liquidación (art. 11)", "Cada año se reciben entregas a cuenta con las previsiones del anteproyecto de presupuestos del Estado; cuando se conocen los valores definitivos, se practica la liquidación por diferencia"],
        ["Liquidación conjunta (art. 11.3)", "La liquidación definitiva de todos los recursos y de los fondos de convergencia se practica en un solo acto; las negativas se compensan"],
        ["Sección 32 de los PGE", "Recoge los créditos de las entregas a cuenta del Fondo de Suficiencia Global positivo, pagados por doceavas partes"],
      ],
      preguntas: [
        ["media", "El Fondo de Suficiencia Global es la diferencia entre las necesidades globales de financiación y:", ["La capacidad tributaria más la transferencia del Fondo de Garantía", "Los gastos de personal", "La deuda pública", "Los ingresos patrimoniales"], "Art. 10.1 Ley 22/2009."],
        ["media", "El Fondo de Suficiencia Global evoluciona con:", ["El ITE (Ingresos Tributarios del Estado)", "El IPC regional", "El PIB de Aragón", "Los salarios públicos"], "Art. 20 Ley 22/2009."],
        ["dificil", "Es causa de revisión del Fondo de Suficiencia Global:", ["El traspaso de nuevos servicios aprobado por real decreto", "El cambio de consejero de hacienda", "Un aumento de la población", "La aprobación de la Cuenta General"], "Art. 21.1 Ley 22/2009."],
        ["media", "Las CCAA reciben cada año los recursos del sistema mediante:", ["Entregas a cuenta y una liquidación definitiva posterior", "Un único pago anual definitivo", "Subvenciones discrecionales", "Préstamos del Estado"], "Art. 11.2 Ley 22/2009."],
        ["media", "La liquidación definitiva de los recursos del sistema y de los fondos de convergencia se practica:", ["De forma conjunta en un solo acto", "Mensualmente", "Por cada impuesto por separado", "Cada cinco años"], "Art. 11.3 Ley 22/2009."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["Fondos de Convergencia (art. 22)", "Dos fondos con recursos adicionales del Estado para aproximar la financiación por habitante ajustado y favorecer el equilibrio territorial: el de Competitividad y el de Cooperación"],
        ["Fondo de Competitividad (art. 23)", "Reduce diferencias de financiación homogénea per cápita: beneficia a las CCAA con financiación por habitante ajustado inferior a la media o a su capacidad fiscal, repartido por población ajustada"],
        ["Fondo de Cooperación (art. 24)", "Equilibra el desarrollo regional; beneficia a CCAA con PIB per cápita inferior al 90 % de la media, densidad inferior al 50 % de la media, o bajo crecimiento de población con densidad inferior a 1,25 veces la media"],
        ["Subfondos de Cooperación (art. 24.3)", "Dos tercios para todas las beneficiarias por población y distancia de PIB per cápita; un tercio para las de crecimiento de población inferior al 50 % de la media"],
        ["Fondo de Compensación (art. 158.2 CE y 16 LOFCA)", "Con destino a gastos de inversión para corregir desequilibrios; lo distribuyen las Cortes Generales; carga general del Estado; no inferior al 22,5 % de la base de cálculo de la inversión pública"],
        ["Fondo Complementario (art. 16.5 LOFCA)", "Equivale al 33,33 % del Fondo de Compensación de cada territorio; puede financiar gastos de funcionamiento asociados a las inversiones"],
        ["Destino de los FCI (art. 16.6 LOFCA)", "Infraestructuras, obras públicas, regadíos, vivienda, transportes y demás inversiones que reduzcan diferencias de renta; regulados por la Ley 22/2001"],
      ],
      preguntas: [
        ["media", "Los Fondos de Convergencia Autonómica de la Ley 22/2009 son:", ["El Fondo de Competitividad y el Fondo de Cooperación", "El Fondo de Garantía y el de Suficiencia", "El FCI y el Fondo Complementario", "El FLA y el Fondo de Facilidad Financiera"], "Art. 22 Ley 22/2009."],
        ["media", "Es condición para beneficiarse del Fondo de Cooperación:", ["Tener una densidad de población inferior al 50 % de la media", "Tener más de cinco millones de habitantes", "No tener deuda", "Tener costa"], "Art. 24.2.b) Ley 22/2009."],
        ["media", "El Fondo de Compensación Interterritorial se destina a:", ["Gastos de inversión", "Gastos de personal", "Pago de deuda", "Subvenciones a familias"], "Art. 158.2 CE y art. 16.1 LOFCA."],
        ["dificil", "El Fondo Complementario equivale, para cada territorio, al:", ["33,33 % de su Fondo de Compensación", "22,5 % de la inversión pública", "50 % de su Fondo de Suficiencia", "75 % de sus tributos"], "Art. 16.5 LOFCA."],
        ["media", "Los Fondos de Compensación Interterritorial los distribuyen:", ["Las Cortes Generales", "El Consejo de Ministros", "Las Cortes de Aragón", "El Banco de España"], "Art. 158.2 CE y art. 16.1 LOFCA."],
      ],
    },
    {
      seccion: S6,
      flashcards: [
        ["Situación a octubre de 2026", "Sigue vigente el sistema de la Ley 22/2009; el CPFF aprobó el 4-09-2026 un acuerdo para un nuevo modelo, que debe convertirse en ley (reforma de la LOFCA por ley orgánica) para aplicarse"],
        ["Cesión de IRPF e IVA propuesta", "El IRPF cedido pasaría del 50 % al 55 % y el IVA del 50 % al 56,5 %, según la nota de Hacienda de 4-09-2026"],
        ["Nivelación horizontal propuesta", "Garantía a cada Comunidad del 75 % de los recursos medios por habitante ajustado según su capacidad tributaria"],
        ["Aportación del Estado propuesta", "19.000 millones de euros, financiados con el 5 % del rendimiento del IRPF más una transferencia adicional; 20.975 millones adicionales en total para las comunidades"],
        ["Garantía de statu quo propuesta", "Ninguna comunidad recibiría menos que con el modelo anterior"],
        ["Por qué importa en el examen", "Hay que conocer el modelo vigente (Ley 22/2009) y saber que la reforma no es todavía derecho aplicable mientras no se apruebe y publique la ley"],
      ],
      preguntas: [
        ["media", "A octubre de 2026, el sistema de financiación autonómica vigente es el regulado por:", ["La Ley 22/2009", "El acuerdo del CPFF de 4-09-2026, ya en vigor", "La Ley 21/2001", "El Estatuto de Autonomía exclusivamente"], "Ley 22/2009 (BOE-A-2009-20375); nota de Hacienda de 4-09-2026."],
        ["media", "Según el acuerdo del CPFF de septiembre de 2026, la cesión del IRPF pasaría:", ["Del 50 % al 55 %", "Del 50 % al 100 %", "Del 33 % al 50 %", "Del 58 % al 70 %"], "Nota de Hacienda de 4-09-2026."],
        ["dificil", "Para aplicarse, el nuevo modelo acordado en el CPFF necesita:", ["Su aprobación como ley, incluida la reforma de la LOFCA por ley orgánica", "Solo el acuerdo del CPFF", "Una orden ministerial", "Un decreto del Gobierno de Aragón"], "Art. 157.3 CE; nota de Hacienda de 4-09-2026."],
        ["media", "La cesión del IVA propuesta en el acuerdo de 2026 sería del:", ["56,5 %", "50 %", "58 %", "75 %"], "Nota de Hacienda de 4-09-2026."],
      ],
    },
  ],
  glosario: [
    [S1, "LOFCA", "Ley Orgánica 8/1980, de Financiación de las Comunidades Autónomas, que desarrolla el art. 157.3 CE."],
    [S1, "Comunidades de régimen común", "Todas salvo País Vasco y Navarra, que tienen régimen foral de concierto y convenio."],
    [S2, "Capacidad tributaria", "Conjunto de recursos tributarios que corresponden a cada Comunidad en el sistema."],
    [S2, "Tarifa autonómica del IRPF", "Parte del IRPF que corresponde a la Comunidad y sobre la que tiene capacidad normativa."],
    [S3, "Población ajustada", "Población ponderada por variables que reflejan necesidades de gasto (edad, superficie, dispersión…)."],
    [S3, "Valor normativo", "Recaudación teórica de un tributo sin las rebajas o subidas aprobadas por la Comunidad."],
    [S4, "ITE", "Ingresos Tributarios del Estado, excluidos los cedidos, que sirven para actualizar el Fondo de Suficiencia."],
    [S4, "Entrega a cuenta", "Anticipo mensual de los recursos del sistema, regularizado después en la liquidación."],
    [S5, "Fondo de Compensación Interterritorial", "Fondo estatal para inversiones en los territorios menos desarrollados."],
    [S6, "CPFF", "Consejo de Política Fiscal y Financiera, órgano de coordinación entre el Estado y las CCAA en materia financiera."],
  ],
  casos: [
    {
      slug: "origen-ingresos-aragon",
      titulo: "¿De dónde viene el dinero de Aragón?",
      supuesto: "Un grupo de estudiantes de un instituto visita la Dirección General de Presupuestos y pregunta qué parte de sus impuestos se queda la Comunidad y cómo se reparte el dinero entre comunidades. Un administrativo les explica el sistema vigente.",
      preguntas: [
        [S2, "media", "Del IRPF que pagan los residentes en Aragón, corresponde a la Comunidad:", ["El 50 % (tarifa autonómica)", "El 100 %", "El 25 %", "Nada"], "Art. 8.d) Ley 22/2009."],
        [S2, "media", "Del IVA, la Comunidad recibe:", ["El 50 % de la recaudación líquida según su índice de consumo", "El 100 % de lo pagado en Aragón", "El 10 %", "Nada"], "Art. 8.e) Ley 22/2009."],
        [S2, "media", "Del Impuesto sobre la Electricidad, la Comunidad recibe:", ["El 100 %", "El 58 %", "El 50 %", "El 0 %"], "Art. 8.k) Ley 22/2009."],
        [S3, "media", "Para que la sanidad y la educación tengan recursos parecidos en todas las CCAA existe:", ["El Fondo de Garantía de Servicios Públicos Fundamentales", "El Fondo de Contingencia", "La Caja de Depósitos", "El Fondo Social Europeo"], "Art. 9 Ley 22/2009."],
        [S3, "media", "Cada Comunidad aporta a ese fondo:", ["El 75 % de sus recursos tributarios normativos", "El 100 % del IVA", "El 10 % del presupuesto", "Nada"], "Art. 9.a) Ley 22/2009."],
        [S3, "media", "El reparto del fondo se hace según:", ["La población ajustada", "El PIB", "El número de funcionarios", "La superficie exclusivamente"], "Art. 9.b) Ley 22/2009."],
        [S1, "dificil", "El Estatuto pide atender especialmente en Aragón a:", ["El envejecimiento, la dispersión y la baja densidad", "La insularidad", "La condición fronteriza", "La ultraperiferia"], "Art. 107.5 EAA."],
        [S4, "media", "El fondo que cierra el sistema para cubrir las necesidades de cada Comunidad es el:", ["Fondo de Suficiencia Global", "Fondo de Competitividad", "FCI", "Fondo de Contingencia"], "Art. 10 Ley 22/2009."],
        [S4, "media", "La Comunidad recibe estos recursos durante el año como:", ["Entregas a cuenta, con liquidación posterior", "Un pago único en diciembre", "Préstamos", "Subvenciones nominativas"], "Art. 11 Ley 22/2009."],
        [S6, "media", "Si un estudiante pregunta por el nuevo modelo de 2026, debe aclararse que:", ["Se acordó en el CPFF pero aún debe aprobarse por ley", "Ya está en vigor desde septiembre de 2026", "Fue rechazado definitivamente", "Solo afecta a Navarra"], "Nota de Hacienda de 4-09-2026."],
      ],
    },
    {
      slug: "comision-mixta-traspaso",
      titulo: "Un nuevo traspaso de servicios",
      supuesto: "El Estado y Aragón negocian el traspaso de un nuevo servicio. La Comunidad quiere asegurarse de que el coste se incorpore a su financiación y, además, plantea en la Comisión Mixta la ejecución de inversiones estatales en su territorio.",
      preguntas: [
        [S1, "media", "La valoración del traspaso se acuerda en:", ["La Comisión Mixta de Asuntos Económico-Financieros Estado-Aragón", "El Pleno de las Cortes de Aragón", "La Cámara de Cuentas", "El Tribunal Constitucional"], "Art. 109.2.e) EAA."],
        [S4, "media", "El traspaso, aprobado por real decreto, es causa de revisión del:", ["Fondo de Suficiencia Global", "Fondo de Garantía", "Fondo de Cooperación", "FCI"], "Art. 21.1 Ley 22/2009."],
        [S4, "dificil", "La revisión surte efectos, con carácter general:", ["Desde el comienzo del ejercicio siguiente a la aprobación del real decreto", "Desde el día del acuerdo", "A los cinco años", "Nunca"], "Art. 21.1 Ley 22/2009."],
        [S1, "media", "Estudiar las inversiones del Estado en Aragón corresponde a:", ["La Comisión Mixta de Asuntos Económico-Financieros", "El Consejo de Ministros solo", "La Diputación Provincial", "El Justicia de Aragón"], "Art. 109.2.d) EAA."],
        [S1, "media", "Los miembros de la delegación aragonesa en la Comisión rinden cuentas ante:", ["Las Cortes de Aragón", "El Senado", "El Tribunal de Cuentas", "El Gobierno central"], "Art. 109.3 EAA."],
        [S1, "media", "Si el Estado adopta una medida tributaria que reduce los ingresos de Aragón, el Estatuto prevé:", ["Medidas de compensación, por el principio de lealtad institucional", "Nada", "Que Aragón suba el IVA", "La suspensión del Estatuto"], "Art. 107.4 EAA."],
        [S1, "media", "El acuerdo bilateral económico-financiero con el Estado se formaliza en:", ["Comisión Mixta", "Ley de presupuestos de Aragón", "Decreto-ley", "Convenio con los ayuntamientos"], "Art. 108 EAA."],
        [S5, "media", "Las inversiones para reducir desequilibrios territoriales pueden financiarse, en los territorios beneficiarios, con:", ["Los Fondos de Compensación Interterritorial", "El Fondo de Contingencia", "Las tasas", "El capítulo 1"], "Art. 16 LOFCA."],
        [S5, "dificil", "Los proyectos que se financian con los FCI se determinan:", ["De común acuerdo entre el Estado y las CCAA", "Solo por el Estado", "Solo por la Comunidad", "Por sorteo"], "Art. 16.7 LOFCA."],
        [S5, "media", "Cada territorio da cuenta anualmente del destino de los FCI ante:", ["Las Cortes Generales", "La Comisión Europea", "El Gobierno de Aragón", "El Banco de España"], "Art. 16.8 LOFCA."],
      ],
    },
    {
      slug: "rebaja-impuesto-cedido",
      titulo: "Una rebaja de un impuesto cedido",
      supuesto: "Las Cortes de Aragón aprueban una bonificación en el Impuesto sobre Sucesiones y Donaciones y una deducción autonómica en el IRPF. Un técnico debe explicar cómo afectan al sistema de financiación.",
      preguntas: [
        [S1, "media", "Aragón puede aprobar la deducción en el IRPF porque:", ["Tiene capacidad normativa en los tributos cedidos según la ley de cesión", "El IRPF es un tributo propio de Aragón", "Lo autoriza el Ayuntamiento", "No puede hacerlo"], "Art. 105 EAA."],
        [S2, "media", "El Impuesto sobre Sucesiones y Donaciones es:", ["Un tributo cedido", "Un tributo propio de Aragón", "Un tributo local", "Un arancel"], "Art. 25 Ley 22/2009."],
        [S3, "media", "En el Fondo de Garantía, la recaudación de Aragón se computa por su:", ["Valor normativo, sin tener en cuenta la rebaja aprobada", "Recaudación real tras la rebaja", "Doble del valor real", "Valor de hace diez años"], "Arts. 3 y 9 Ley 22/2009."],
        [S3, "dificil", "Por tanto, la rebaja aprobada por Aragón:", ["Reduce sus ingresos reales sin reducir su aportación normativa al sistema", "Aumenta automáticamente su Fondo de Suficiencia", "La compensa el Estado", "No tiene efectos"], "Art. 3 y 9 Ley 22/2009 (valor normativo)."],
        [S2, "media", "La gestión del Impuesto sobre Sucesiones, cedido totalmente, corresponde:", ["A Aragón, por delegación del Estado", "A la AEAT en exclusiva", "A los notarios", "Al Ayuntamiento"], "Art. 106.1 EAA."],
        [S2, "media", "Las reclamaciones contra actos tributarios dictados por Aragón se revisan por:", ["Sus propios órganos económico-administrativos", "El Tribunal Económico-Administrativo Central siempre", "La Cámara de Cuentas", "El Justicia de Aragón"], "Art. 106.3 EAA."],
        [S1, "media", "Los principios de la potestad tributaria de Aragón son:", ["Generalidad, progresividad y equitativa distribución de la carga fiscal", "Unidad y especialidad", "Anualidad y universalidad", "Eficacia y jerarquía"], "Art. 105.4 EAA."],
        [S2, "media", "El IRPF está cedido, en el sistema vigente, en un:", ["50 %", "55 %", "100 %", "58 %"], "Art. 8.d) Ley 22/2009."],
        [S6, "dificil", "Si se aprobara la reforma acordada en 2026, la cesión del IRPF pasaría a ser del:", ["55 %", "50 %", "60 %", "45 %"], "Nota de Hacienda de 4-09-2026."],
        [S1, "media", "La Comunidad no puede adoptar medidas tributarias que:", ["Graven bienes situados fuera de su territorio u obstaculicen la libre circulación", "Reduzcan tipos", "Afecten a residentes", "Aprueben las Cortes"], "Art. 157.2 CE."],
      ],
    },
  ],
});
