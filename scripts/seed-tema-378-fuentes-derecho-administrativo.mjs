/**
 * Crea tema-378 — Tema 6 de Administrativo DGA (tema 1 del programa de
 * materias específicas): "Fuentes del Derecho Administrativo. La
 * Constitución. Leyes orgánicas y ordinarias. Disposiciones administrativas
 * con fuerza de Ley. El reglamento: concepto, naturaleza y clases. Límites
 * de la potestad reglamentaria. Autonomía y sistema de fuentes."
 *
 * Fuentes (textos consolidados leídos en esta sesión en la API del BOE):
 * - Constitución Española (BOE-A-1978-31229): arts. 9, 81-86, 93, 96, 97,
 *   106, 147, 149.3, 150, 153 y 161.
 * - Código Civil (BOE-A-1889-4763): art. 1 (fuentes del ordenamiento).
 * - Ley 39/2015 (BOE-A-2015-10565): arts. 37, 47.2 y 128-133. Los arts.
 *   129, 130, 132 y 133 (salvo incisos) se declararon contrarios al orden
 *   constitucional de competencias por la STC 55/2018 (BOE-A-2018-8574):
 *   no obligan a las Comunidades Autónomas, que tienen su propia regulación.
 * - Ley 50/1997, del Gobierno (BOE-A-1997-25336): arts. 24 y 26 (forma y
 *   jerarquía de las normas del Gobierno de la Nación y procedimiento).
 * - Estatuto de Autonomía de Aragón, LO 5/2007 (BOE-A-2007-8444): arts. 9,
 *   42-45 y 53.
 * - Decreto Legislativo 1/2022, texto refundido de la Ley del Presidente o
 *   Presidenta y del Gobierno de Aragón (BOE-A-2022-7004): Título VIII,
 *   arts. 33-49 (normas con rango de ley, potestad reglamentaria, forma y
 *   jerarquía, buena regulación, Plan Anual Normativo y procedimiento).
 * La clasificación de los reglamentos (ejecutivos, independientes y de
 * necesidad; jurídicos y organizativos) es doctrina administrativista
 * consolidada, no una lista legal: se presenta así, apoyada en los
 * preceptos que le dan base (art. 36 del DLeg 1/2022, art. 128 LPAC).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-378-fuentes-derecho-administrativo.mjs
 */
import { sembrarTema, ADMIN_DGA } from "./lib/sembrar-tema.mjs";

const CE = "https://www.boe.es/buscar/act.php?id=BOE-A-1978-31229";
const CC = "https://www.boe.es/buscar/act.php?id=BOE-A-1889-4763";
const L39 = "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565";
const LG = "https://www.boe.es/buscar/act.php?id=BOE-A-1997-25336";
const EAA = "https://www.boe.es/buscar/act.php?id=BOE-A-2007-8444";
const LPGA = "https://www.boe.es/buscar/act.php?id=BOE-A-2022-7004";
const S1 = "fuentes-constitucion-tratados";
const S2 = "ley-organica-ordinaria-fuerza-ley";
const S3 = "reglamento-concepto-clases-limites";
const S4 = "autonomia-sistema-fuentes-aragon";

await sembrarTema({
  tema: {
    slug: "tema-378",
    titulo: "Fuentes del Derecho Administrativo: Constitución, leyes, normas con fuerza de ley, reglamento y sistema de fuentes autonómico",
    descripcion: "Las fuentes del ordenamiento (art. 1 del Código Civil) y su aplicación al Derecho Administrativo. La Constitución como norma suprema y los principios del art. 9.3. Los tratados internacionales. Leyes orgánicas y ordinarias. Decretos legislativos y decretos-leyes. El reglamento: concepto, naturaleza, clases y límites de la potestad reglamentaria (nulidad, inderogabilidad singular, control judicial). Autonomía y sistema de fuentes: el Estatuto como norma institucional básica, prevalencia y supletoriedad, leyes de los arts. 150 CE, normas con rango de ley del Gobierno de Aragón y forma, jerarquía y procedimiento de sus reglamentos.",
    contenido: "De dónde salen las normas que aplica la Administración y en qué orden mandan: la Constitución, las leyes de las Cortes y de las Cortes de Aragón, las normas con fuerza de ley que puede dictar el Gobierno y los reglamentos. Explica qué puede y qué no puede hacer un reglamento, por qué un decreto del Gobierno de Aragón está por encima de una orden de un consejero y qué pasos hay que dar para aprobar una norma aragonesa.",
    enlaces_boe: [
      { url: CE, titulo: "Constitución Española (BOE-A-1978-31229)" },
      { url: CC, titulo: "Código Civil, art. 1 (BOE-A-1889-4763)" },
      { url: L39, titulo: "Ley 39/2015, del Procedimiento Administrativo Común, Título VI (BOE-A-2015-10565)" },
      { url: LG, titulo: "Ley 50/1997, del Gobierno (BOE-A-1997-25336)" },
      { url: EAA, titulo: "Estatuto de Autonomía de Aragón, LO 5/2007 (BOE-A-2007-8444)" },
      { url: LPGA, titulo: "Decreto Legislativo 1/2022, texto refundido de la Ley del Presidente o Presidenta y del Gobierno de Aragón (BOE-A-2022-7004)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "Fuentes del ordenamiento, la Constitución y los tratados", articulos: "art. 1 CC; arts. 9, 93 y 96 CE", url: `${CC}#a1` },
      { seccion: S2, titulo: "Leyes orgánicas y ordinarias, decretos legislativos y decretos-leyes", articulos: "arts. 81-86 CE", url: `${CE}#a81` },
      { seccion: S3, titulo: "El reglamento: concepto, clases y límites de la potestad reglamentaria", articulos: "arts. 97 y 106 CE; arts. 37, 47.2 y 128-133 Ley 39/2015; art. 24 Ley 50/1997", url: `${L39}#a128` },
      { seccion: S4, titulo: "Autonomía y sistema de fuentes: Estatuto y normas del Gobierno de Aragón", articulos: "arts. 147, 149.3, 150 y 153 CE; arts. 42-45 y 53 EAA; arts. 33-49 DLeg 1/2022", url: `${LPGA}#tv-4` },
    ],
  },
  vinculo: { oposicion: ADMIN_DGA.oposicion, bloqueId: ADMIN_DGA.bloqueDerecho, numero: 6 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Fuentes del ordenamiento (art. 1.1 CC)", "La ley, la costumbre y los principios generales del derecho"],
        ["Jerarquía normativa (art. 1.2 CC)", "Carecen de validez las disposiciones que contradigan otra de rango superior"],
        ["Costumbre (art. 1.3 CC)", "Solo rige en defecto de ley aplicable, si no es contraria a la moral o al orden público y resulta probada"],
        ["Principios generales del derecho (art. 1.4 CC)", "Se aplican en defecto de ley o costumbre, sin perjuicio de su carácter informador de todo el ordenamiento"],
        ["Jurisprudencia (art. 1.6 CC)", "No es fuente: complementa el ordenamiento con la doctrina que, de modo reiterado, establezca el Tribunal Supremo"],
        ["Sujeción a la Constitución (art. 9.1 CE)", "Los ciudadanos y los poderes públicos están sujetos a la Constitución y al resto del ordenamiento jurídico"],
        ["Principios del art. 9.3 CE", "Legalidad, jerarquía normativa, publicidad de las normas, irretroactividad de las sancionadoras no favorables o restrictivas de derechos, seguridad jurídica, responsabilidad e interdicción de la arbitrariedad"],
        ["Tratados internacionales (art. 96.1 CE)", "Válidamente celebrados y publicados oficialmente en España, forman parte del ordenamiento interno; solo se derogan o modifican según el propio tratado o el Derecho internacional"],
        ["Aplicación de los tratados (art. 1.5 CC)", "No son de aplicación directa hasta su publicación íntegra en el «Boletín Oficial del Estado»"],
        ["Cesión de competencias (art. 93 CE)", "Por ley orgánica puede autorizarse un tratado que atribuya a una organización internacional el ejercicio de competencias derivadas de la Constitución (es la vía de la Unión Europea)"],
      ],
      preguntas: [
        ["facil", "Según el art. 1.1 del Código Civil, son fuentes del ordenamiento jurídico español:", ["La ley, la costumbre y los principios generales del derecho", "La ley, la jurisprudencia y la doctrina científica", "La Constitución, los reglamentos y las circulares", "La ley, la costumbre y la jurisprudencia del Tribunal Constitucional"], "Art. 1.1 CC. La jurisprudencia solo complementa el ordenamiento (art. 1.6)."],
        ["media", "La costumbre solo rige:", ["En defecto de ley aplicable, si no es contraria a la moral o al orden público y resulta probada", "Por encima de la ley si es inmemorial", "Cuando la reconoce un reglamento", "En defecto de principios generales del derecho"], "Art. 1.3 CC."],
        ["media", "¿Qué valor da el Código Civil a la doctrina reiterada del Tribunal Supremo?", ["Complementa el ordenamiento jurídico", "Es la primera fuente del ordenamiento", "Deroga las leyes que contradiga", "Solo vincula a los tribunales inferiores de su sala"], "Art. 1.6 CC."],
        ["media", "¿Cuál de estos principios NO figura en el art. 9.3 de la Constitución?", ["Principio de autonomía local", "Principio de jerarquía normativa", "Interdicción de la arbitrariedad de los poderes públicos", "Publicidad de las normas"], "El art. 9.3 CE garantiza legalidad, jerarquía, publicidad, irretroactividad de lo sancionador desfavorable, seguridad jurídica, responsabilidad e interdicción de la arbitrariedad. La autonomía local está en el art. 140."],
        ["media", "Un tratado internacional válidamente celebrado forma parte del ordenamiento interno español:", ["Una vez publicado oficialmente en España", "Desde su firma por el Jefe del Estado", "Cuando lo desarrolla un reglamento", "Desde que lo ratifica el Consejo de Estado"], "Art. 96.1 CE y art. 1.5 CC."],
        ["dificil", "¿Mediante qué norma se autoriza un tratado por el que se atribuye a una organización internacional el ejercicio de competencias derivadas de la Constitución?", ["Ley orgánica", "Ley ordinaria", "Real decreto acordado en Consejo de Ministros", "Decreto legislativo"], "Art. 93 CE."],
        ["media", "Los principios generales del derecho se aplican:", ["En defecto de ley o costumbre, sin perjuicio de su carácter informador del ordenamiento", "Solo si los invoca un tratado", "Antes que la ley cuando son más favorables", "Únicamente en el Derecho Penal"], "Art. 1.4 CC."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Leyes orgánicas (art. 81.1 CE)", "Las relativas al desarrollo de los derechos fundamentales y libertades públicas, las que aprueban los Estatutos de Autonomía y el régimen electoral general, y las demás previstas en la Constitución"],
        ["Aprobación de una ley orgánica (art. 81.2 CE)", "Mayoría absoluta del Congreso en una votación final sobre el conjunto del proyecto (también para modificarla o derogarla)"],
        ["Ley ordinaria", "La que aprueban las Cortes Generales por mayoría simple en las materias no reservadas a ley orgánica"],
        ["Delegación legislativa (art. 82.1-2 CE)", "Las Cortes pueden delegar en el Gobierno dictar normas con rango de ley: por ley de bases para textos articulados, por ley ordinaria para refundir textos"],
        ["Requisitos de la delegación (art. 82.3 CE)", "Expresa, para materia concreta y con plazo; se agota por el uso; no implícita ni por tiempo indeterminado; no cabe subdelegar en autoridades distintas del Gobierno"],
        ["Límites de las leyes de bases (art. 83 CE)", "No pueden autorizar la modificación de la propia ley de bases ni facultar para dictar normas retroactivas"],
        ["Decreto legislativo (art. 85 CE)", "Nombre de las disposiciones del Gobierno que contienen legislación delegada (texto articulado o texto refundido)"],
        ["Decreto-ley: presupuesto (art. 86.1 CE)", "Extraordinaria y urgente necesidad; disposición legislativa provisional"],
        ["Decreto-ley: materias vedadas (art. 86.1 CE)", "Ordenamiento de las instituciones básicas del Estado, derechos, deberes y libertades del Título I, régimen de las CCAA y Derecho electoral general"],
        ["Convalidación del decreto-ley (art. 86.2-3 CE)", "Debate y votación de totalidad en el Congreso en los 30 días siguientes a su promulgación; además puede tramitarse como proyecto de ley por urgencia"],
      ],
      preguntas: [
        ["facil", "La aprobación, modificación o derogación de una ley orgánica exige:", ["Mayoría absoluta del Congreso en una votación final sobre el conjunto del proyecto", "Mayoría de tres quintos de cada Cámara", "Mayoría simple del Senado", "Mayoría absoluta de ambas Cámaras en sesión conjunta"], "Art. 81.2 CE."],
        ["media", "¿Cuál de estas materias está reservada a ley orgánica?", ["La aprobación de los Estatutos de Autonomía", "La legislación sobre contratos del sector público", "Los Presupuestos Generales del Estado", "La regulación de la Seguridad Social"], "Art. 81.1 CE."],
        ["media", "Si las Cortes quieren que el Gobierno refunda varios textos legales en uno solo, deben otorgar la delegación mediante:", ["Una ley ordinaria", "Una ley de bases", "Una ley orgánica", "Un acuerdo del Pleno del Congreso"], "Art. 82.2 CE: ley de bases para textos articulados; ley ordinaria para refundir."],
        ["media", "La delegación legislativa se agota:", ["Por el uso que de ella haga el Gobierno mediante la publicación de la norma", "A los cinco años de su otorgamiento", "Cuando el Consejo de Estado emite dictamen", "Solo por derogación expresa de la ley delegante"], "Art. 82.3 CE."],
        ["dificil", "Una ley de bases NO puede:", ["Facultar para dictar normas con carácter retroactivo", "Fijar los principios y criterios de la delegación", "Delimitar el objeto y alcance de la delegación", "Establecer fórmulas adicionales de control"], "Art. 83 CE; las demás opciones están permitidas por el art. 82.4 y 6."],
        ["media", "¿En qué plazo debe el Congreso pronunciarse sobre la convalidación o derogación de un decreto-ley?", ["Treinta días siguientes a su promulgación", "Quince días hábiles desde su publicación", "Dos meses", "Antes de que termine el periodo de sesiones"], "Art. 86.2 CE."],
        ["media", "Un decreto-ley del Gobierno de la Nación NO puede afectar a:", ["Los derechos, deberes y libertades de los ciudadanos regulados en el Título I", "La organización de un ministerio", "Medidas económicas urgentes", "Normas tributarias en general"], "Art. 86.1 CE: instituciones básicas del Estado, derechos, deberes y libertades del Título I, régimen de las CCAA y Derecho electoral general."],
        ["facil", "Las disposiciones del Gobierno que contienen legislación delegada se denominan:", ["Decretos legislativos", "Decretos-leyes", "Reales decretos", "Órdenes ministeriales"], "Art. 85 CE."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Reglamento (concepto)", "Norma escrita de rango inferior a la ley dictada por una Administración Pública en ejercicio de la potestad reglamentaria"],
        ["Titulares de la potestad reglamentaria (art. 128.1 LPAC)", "El Gobierno de la Nación, los órganos de gobierno de las CCAA según sus Estatutos y los órganos de gobierno locales"],
        ["Potestad reglamentaria del Gobierno (art. 97 CE)", "El Gobierno ejerce la función ejecutiva y la potestad reglamentaria de acuerdo con la Constitución y las leyes"],
        ["Clases de reglamentos según su relación con la ley (doctrina)", "Ejecutivos (desarrollan una ley), independientes (regulan materias no reservadas a ley, sobre todo organizativas) y de necesidad (situaciones de emergencia)"],
        ["Límites materiales (art. 128.2 LPAC)", "No pueden vulnerar la CE ni las leyes, ni regular materias reservadas a ley, ni tipificar delitos o infracciones, establecer penas o sanciones, tributos u otras prestaciones patrimoniales públicas"],
        ["Jerarquía de los reglamentos estatales (art. 24.2 Ley 50/1997)", "1.º real decreto del Presidente del Gobierno o acordado en Consejo de Ministros; 2.º orden ministerial"],
        ["Nulidad de los reglamentos (art. 47.2 LPAC)", "Son nulos de pleno derecho si vulneran la CE, las leyes u otras disposiciones superiores, regulan materias reservadas a ley o establecen retroactividad sancionadora desfavorable"],
        ["Inderogabilidad singular (art. 37 LPAC)", "Una resolución particular no puede vulnerar una disposición general, aunque la dicte un órgano de igual o superior jerarquía al que la aprobó"],
        ["Publicación (art. 131 LPAC)", "Leyes, reglamentos y disposiciones deben publicarse en el diario oficial para entrar en vigor y producir efectos"],
        ["Control de los reglamentos (art. 106.1 CE)", "Los tribunales controlan la potestad reglamentaria y la legalidad de la actuación administrativa"],
        ["Consulta pública previa (art. 133.1 LPAC)", "Antes de elaborar el proyecto de ley o reglamento se recaba en el portal web la opinión de los afectados sobre problemas, necesidad, objetivos y alternativas"],
      ],
      preguntas: [
        ["media", "Según el art. 128.2 de la Ley 39/2015, los reglamentos NO pueden:", ["Establecer tributos, penas o sanciones", "Desarrollar una ley", "Regular la organización interna de la Administración", "Colaborar con la ley en la tipificación ya establecida por ella"], "Los reglamentos pueden desarrollar o colaborar con la ley, pero no tipificar ni establecer sanciones, penas o tributos por sí mismos."],
        ["media", "En la Administración General del Estado, ¿qué reglamento tiene mayor jerarquía?", ["El aprobado por real decreto acordado en Consejo de Ministros", "El aprobado por orden ministerial", "La instrucción de un subsecretario", "La resolución de un secretario de Estado"], "Art. 24.2 Ley 50/1997."],
        ["dificil", "Una consejera dicta una resolución singular que contradice un decreto aprobado por ella misma tiempo atrás como reglamento. La resolución es:", ["Nula, por el principio de inderogabilidad singular", "Válida, porque procede del mismo órgano", "Anulable solo si la recurre un interesado", "Válida si se publica en el boletín oficial"], "Art. 37 LPAC: aunque proceda de órgano de igual o superior jerarquía, es nula."],
        ["media", "Un reglamento que regula una materia reservada a la ley es:", ["Nulo de pleno derecho", "Anulable", "Irregular no invalidante", "Válido hasta que lo declare el Tribunal Constitucional"], "Art. 47.2 LPAC."],
        ["media", "Según la doctrina, un reglamento que desarrolla una ley y la complementa para su aplicación es un reglamento:", ["Ejecutivo", "Independiente", "De necesidad", "Organizativo"], "Clasificación doctrinal por su relación con la ley."],
        ["media", "¿Qué órgano controla la legalidad de los reglamentos de las Administraciones Públicas?", ["Los tribunales de la jurisdicción contencioso-administrativa", "El Tribunal Constitucional en exclusiva", "El Consejo de Estado", "Las Cortes Generales"], "Arts. 106.1 y 153.c) CE. El TC controla las normas con fuerza de ley."],
        ["facil", "Para que un reglamento entre en vigor debe:", ["Publicarse en el diario oficial correspondiente", "Notificarse a cada interesado", "Ser convalidado por el Parlamento", "Ser informado por el Tribunal Supremo"], "Art. 131 LPAC."],
        ["dificil", "La STC 55/2018 declaró contrarios al orden constitucional de competencias buena parte de los arts. 129 a 133 de la Ley 39/2015. Su consecuencia es que:", ["Esos preceptos no obligan a las Comunidades Autónomas, que regulan su propio procedimiento de elaboración de normas", "Quedaron derogados para todas las Administraciones", "Solo se aplican a los entes locales", "Se convirtieron en normas reglamentarias"], "Por eso Aragón regula la buena regulación y el procedimiento en el Título VIII del DLeg 1/2022."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Estatuto de Autonomía (art. 147.1 CE)", "Norma institucional básica de cada Comunidad Autónoma, que el Estado reconoce y ampara como parte de su ordenamiento"],
        ["Prevalencia y supletoriedad (art. 149.3 CE)", "En caso de conflicto prevalecen las normas del Estado en lo no atribuido en exclusiva a las CCAA; el derecho estatal es en todo caso supletorio del autonómico"],
        ["Leyes del art. 150 CE", "Leyes marco (150.1), leyes orgánicas de transferencia o delegación (150.2) y leyes de armonización (150.3, necesidad apreciada por mayoría absoluta de cada Cámara)"],
        ["Control de los órganos de las CCAA (art. 153 CE)", "TC (normas con fuerza de ley), Gobierno previo dictamen del Consejo de Estado (funciones delegadas del 150.2), contencioso (administración y reglamentos) y Tribunal de Cuentas (económico y presupuestario)"],
        ["Delegación legislativa en Aragón (art. 43 EAA)", "Las Cortes de Aragón pueden delegar en el Gobierno; no cabe para el Presupuesto, la regulación esencial de los derechos estatutarios, el desarrollo básico de las Instituciones ni el régimen electoral"],
        ["Agotamiento de la delegación en Aragón (art. 43.3 EAA)", "Por transcurso del plazo o aprobación del decreto legislativo; no puede usarse si el Gobierno está en funciones por disolución de las Cortes"],
        ["Decretos-leyes en Aragón (art. 44 EAA)", "Necesidad urgente y extraordinaria; quedan derogados si las Cortes de Aragón no los convalidan expresamente en el plazo improrrogable de 30 días desde su publicación"],
        ["Materias vedadas al decreto-ley aragonés (art. 44.1 EAA)", "Desarrollo de los derechos, deberes y libertades de los aragoneses y de las instituciones del Título II, régimen electoral, tributos y Presupuesto"],
        ["Leyes aragonesas (art. 45 EAA)", "Las promulga el Presidente en nombre del Rey y ordena su publicación en el BOA y el BOE en 15 días; la vigencia se cuenta desde el BOA"],
        ["Forma de las disposiciones en Aragón (art. 37 DLeg 1/2022)", "Decreto: las del Gobierno o del Presidente; Orden: las de las comisiones delegadas y las de los titulares de vicepresidencias y departamentos"],
        ["Jerarquía de los reglamentos aragoneses (art. 38 DLeg 1/2022)", "a) Presidente o Gobierno; b) comisiones delegadas del Gobierno; c) titulares de vicepresidencias y departamentos"],
        ["Lo que no es reglamento (art. 36.7-8 DLeg 1/2022)", "Resoluciones, circulares e instrucciones de los órganos administrativos; además, la potestad reglamentaria no es delegable"],
        ["Plazos de elaboración de normas en Aragón (arts. 43 y 47 DLeg 1/2022)", "Consulta pública previa: 15 a 30 días naturales en el Portal de Participación Ciudadana; audiencia e información pública: mínimo 15 días hábiles (anuncio en el BOA)"],
      ],
      preguntas: [
        ["media", "Según el art. 149.3 de la Constitución, el derecho estatal es, respecto del de las Comunidades Autónomas:", ["En todo caso supletorio", "Siempre prevalente", "Inaplicable", "Supletorio solo si lo prevé el Estatuto"], "Art. 149.3 CE."],
        ["media", "¿Quién controla la constitucionalidad de las disposiciones normativas con fuerza de ley de las Comunidades Autónomas?", ["El Tribunal Constitucional", "La jurisdicción contencioso-administrativa", "El Gobierno, previo dictamen del Consejo de Estado", "El Tribunal de Cuentas"], "Art. 153.a) CE."],
        ["dificil", "¿Para cuál de estas materias NO cabe delegación legislativa de las Cortes de Aragón en el Gobierno de Aragón?", ["La aprobación del Presupuesto de la Comunidad Autónoma", "La refundición de la normativa de función pública", "La aprobación del texto refundido de la Ley de Hacienda", "La refundición de la normativa sobre comarcalización"], "Art. 43.1 EAA: tampoco para la regulación esencial de derechos estatutarios, el desarrollo básico de las Instituciones ni el régimen electoral."],
        ["media", "Un decreto-ley del Gobierno de Aragón queda derogado si no es convalidado expresamente por las Cortes de Aragón en el plazo de:", ["30 días improrrogables desde su publicación", "30 días hábiles desde su aprobación", "Dos meses desde su publicación", "Tres meses, prorrogables"], "Art. 44.2 EAA."],
        ["media", "¿Qué forma adoptan las disposiciones de carácter general de un consejero del Gobierno de Aragón?", ["Orden", "Decreto", "Resolución", "Instrucción"], "Art. 37.3 DLeg 1/2022."],
        ["media", "En la jerarquía de los reglamentos aragoneses, las disposiciones de las comisiones delegadas del Gobierno se sitúan:", ["Por debajo de las del Gobierno o del Presidente y por encima de las de los consejeros", "Por encima de las del Gobierno", "Al mismo nivel que las de los consejeros", "Por debajo de las circulares"], "Art. 38.2 DLeg 1/2022."],
        ["facil", "Según el art. 36.7 del texto refundido de la Ley del Presidente y del Gobierno de Aragón, las circulares e instrucciones:", ["No tienen en ningún caso la consideración de disposiciones reglamentarias", "Son reglamentos de rango inferior a la orden", "Son reglamentos si se publican en el BOA", "Equivalen a un decreto"], "Art. 36.7 DLeg 1/2022."],
        ["dificil", "¿Cuánto dura la consulta pública previa en la elaboración de una norma aragonesa?", ["Un mínimo de 15 y un máximo de 30 días naturales", "Exactamente 10 días hábiles", "Un mínimo de 20 días hábiles", "Un mes, prorrogable por otro"], "Art. 43.2 DLeg 1/2022; se hace en el Portal de Participación Ciudadana."],
        ["media", "A efectos de su vigencia, las leyes aragonesas toman como referencia la fecha de publicación en:", ["El Boletín Oficial de Aragón", "El Boletín Oficial del Estado", "El Diario Oficial de la Unión Europea", "El Boletín Oficial de las Cortes de Aragón"], "Art. 45 EAA."],
      ],
    },
  ],
  glosario: [
    [S1, "Principio de jerarquía normativa", "Regla por la que una norma de rango inferior no puede contradecir a otra de rango superior; si lo hace, carece de validez (art. 9.3 CE y art. 1.2 CC)."],
    [S1, "Interdicción de la arbitrariedad", "Prohibición constitucional (art. 9.3 CE) de que los poderes públicos actúen de forma caprichosa o sin una justificación racional."],
    [S2, "Ley de bases", "Ley de las Cortes que delega en el Gobierno la elaboración de un texto articulado y fija con precisión su objeto, alcance, principios y criterios."],
    [S2, "Texto refundido", "Decreto legislativo que reúne en un solo texto varias leyes dispersas, con la autorización de una ley ordinaria que determina si solo se unifican o también se regularizan, aclaran y armonizan."],
    [S2, "Convalidación", "Acuerdo del Parlamento que confirma un decreto-ley dentro del plazo fijado; sin él, el decreto-ley queda derogado."],
    [S3, "Potestad reglamentaria", "Poder de las Administraciones Públicas para dictar normas jurídicas de rango inferior a la ley."],
    [S3, "Reglamento independiente", "Según la doctrina, el que regula una materia no reservada a la ley sin desarrollar una ley concreta, típicamente la organización interna de la Administración."],
    [S3, "Inderogabilidad singular", "Prohibición de que una resolución dirigida a un caso concreto deje sin aplicar un reglamento, aunque la dicte el mismo órgano que lo aprobó (art. 37 LPAC)."],
    [S4, "Supletoriedad", "Regla del art. 149.3 CE por la que el derecho estatal se aplica para cubrir los vacíos del derecho autonómico."],
    [S4, "Memoria justificativa", "Documento que acompaña a un borrador de norma aragonesa y justifica su adecuación a los principios de buena regulación, su tramitación electrónica y su impacto (art. 44 DLeg 1/2022)."],
  ],
  casos: [
    {
      slug: "decreto-ley-aragon-urgente",
      titulo: "Una norma urgente del Gobierno de Aragón",
      supuesto: "Tras unas inundaciones en la ribera del Ebro, el Gobierno de Aragón quiere aprobar con rapidez ayudas a los afectados y, de paso, subir un impuesto propio para financiarlas. Un técnico de la Secretaría General Técnica plantea varias dudas sobre qué tipo de norma usar y qué controles tendrá.",
      preguntas: [
        [S4, "media", "Para aprobar con rango de ley las ayudas por necesidad urgente y extraordinaria, el Gobierno de Aragón puede dictar:", ["Un decreto-ley", "Un decreto legislativo sin delegación previa", "Una orden de la consejera de Hacienda", "Una ley de bases"], "Art. 44.1 EAA."],
        [S4, "dificil", "¿Puede incluir la subida del impuesto propio en ese decreto-ley?", ["No, los tributos no pueden ser objeto de decreto-ley aragonés", "Sí, siempre que sea temporal", "Sí, con informe favorable del Consejo Consultivo", "Sí, porque los decretos-leyes estatales sí pueden hacerlo"], "Art. 44.1 EAA: excluye expresamente los tributos y el Presupuesto."],
        [S4, "media", "Una vez publicado, el decreto-ley debe ser convalidado por:", ["Las Cortes de Aragón, en 30 días improrrogables", "El Congreso de los Diputados, en 30 días", "El Consejo Consultivo de Aragón", "El Justicia de Aragón"], "Art. 44.2 EAA."],
        [S4, "media", "Si las Cortes no lo convalidan expresamente en plazo, el decreto-ley:", ["Queda derogado", "Se convierte en reglamento", "Sigue vigente hasta que se apruebe una ley", "Se entiende convalidado por silencio"], "Art. 44.2 EAA."],
        [S4, "media", "Las Cortes pueden, además de convalidarlo, tramitarlo como:", ["Proyecto de ley, si lo acuerdan dentro del plazo de convalidación", "Moción", "Proposición no de ley", "Reglamento de las Cortes"], "Art. 44.3 EAA."],
        [S4, "dificil", "¿Quién controlaría la constitucionalidad del decreto-ley aragonés si se recurriera?", ["El Tribunal Constitucional", "El Tribunal Superior de Justicia de Aragón", "El Consejo de Estado", "El Tribunal de Cuentas"], "Art. 153.a) CE: es una disposición con fuerza de ley."],
        [S3, "media", "Después, la consejera competente regula por orden el modelo de solicitud de las ayudas. Esa orden debe respetar:", ["El decreto-ley, el decreto del Gobierno que lo desarrolle y la Constitución", "Solo la Constitución", "Únicamente las instrucciones internas del departamento", "Nada, porque es una norma organizativa"], "Arts. 128.3 LPAC y 38 DLeg 1/2022."],
        [S3, "media", "Para que la orden entre en vigor tiene que:", ["Publicarse en el Boletín Oficial de Aragón", "Notificarse a cada ayuntamiento", "Ser convalidada por las Cortes", "Ser firmada por el Presidente de Aragón"], "Art. 131 LPAC."],
        [S1, "facil", "Toda esta actuación debe respetar la interdicción de la arbitrariedad, principio recogido en:", ["El art. 9.3 de la Constitución", "El art. 1 del Código Civil", "El art. 86 de la Constitución", "El art. 44 del Estatuto de Autonomía"], "Art. 9.3 CE."],
        [S2, "media", "Si fuese el Gobierno de la Nación el que dictara un real decreto-ley, ¿qué Cámara lo convalidaría?", ["El Congreso de los Diputados", "El Senado", "Ambas Cámaras en sesión conjunta", "La Comisión Mixta Congreso-Senado"], "Art. 86.2 CE."],
      ],
    },
    {
      slug: "reglamento-departamento-tramitacion",
      titulo: "Tramitar un reglamento en un departamento",
      supuesto: "El Departamento de Hacienda, Interior y Administración Pública prepara un nuevo decreto que regulará el registro de convenios de la Administración autonómica. A la persona administrativa del servicio le encargan preparar el expediente y revisar que el texto no se pase de lo que puede regular un reglamento.",
      preguntas: [
        [S4, "media", "Antes de redactar el borrador, una vez aprobada la orden de inicio, debe abrirse:", ["Una consulta pública previa de 15 a 30 días naturales", "Un trámite de audiencia de 10 días hábiles", "Una información pública de dos meses", "Un periodo de alegaciones ante el Justicia de Aragón"], "Art. 43 DLeg 1/2022."],
        [S4, "dificil", "¿Se puede prescindir de la consulta pública por tratarse de una norma organizativa?", ["Sí, y debe motivarse en la memoria justificativa", "No, nunca", "Sí, sin necesidad de motivarlo", "Solo con autorización del Presidente"], "Art. 43.3.a) y 4 DLeg 1/2022."],
        [S4, "media", "El borrador debe ir acompañado de:", ["Una memoria justificativa y una memoria económica, entre otros documentos", "Solo de un índice", "Un dictamen del Tribunal Constitucional", "Un acuerdo de las Cortes"], "Art. 44 DLeg 1/2022."],
        [S4, "media", "¿Qué forma tendrá la norma si la aprueba el Gobierno de Aragón?", ["Decreto", "Orden", "Resolución", "Instrucción"], "Art. 37.1 DLeg 1/2022."],
        [S4, "dificil", "El jefe de servicio propone resolverlo con una circular interna para ir más rápido. La circular:", ["No tendría valor de reglamento", "Sería un reglamento de rango inferior", "Equivaldría a una orden si la firma el consejero", "Sería válida si se publica en la intranet"], "Art. 36.7 DLeg 1/2022."],
        [S3, "media", "El borrador incluye una multa por no inscribir los convenios, sin que ninguna ley la prevea. Esa previsión:", ["Es nula: los reglamentos no pueden establecer sanciones por sí mismos", "Es válida si la multa es pequeña", "Es anulable solo si se recurre en un mes", "Es válida porque el decreto es del Gobierno"], "Arts. 128.2 y 47.2 LPAC; art. 36.3 DLeg 1/2022."],
        [S4, "media", "Si el decreto afecta a derechos e intereses de la ciudadanía, el trámite de audiencia e información pública tendrá un plazo mínimo de:", ["15 días hábiles", "7 días naturales", "30 días hábiles", "2 meses"], "Art. 47.2 DLeg 1/2022."],
        [S4, "media", "Cuando sea preceptivo según su normativa, se recabará dictamen de:", ["El Consejo Consultivo de Aragón", "El Consejo de Estado en todo caso", "El Tribunal Supremo", "La Cámara de Cuentas"], "Art. 48.6 DLeg 1/2022."],
        [S4, "media", "¿Puede la consejera delegar en un director general la aprobación del decreto?", ["No, la potestad reglamentaria no es susceptible de delegación", "Sí, mediante resolución publicada en el BOA", "Sí, si lo autoriza el Presidente", "Solo en casos de urgencia"], "Art. 36.8 DLeg 1/2022."],
        [S3, "facil", "Si el decreto se aprueba y un ciudadano cree que vulnera una ley, puede impugnarlo ante:", ["La jurisdicción contencioso-administrativa", "El Tribunal Constitucional", "El Consejo Consultivo de Aragón", "La Comisión de Reglamento de las Cortes"], "Arts. 106.1 y 153.c) CE."],
      ],
    },
    {
      slug: "texto-refundido-delegacion",
      titulo: "Un texto refundido y sus límites",
      supuesto: "Las Cortes de Aragón aprueban una ley que autoriza al Gobierno a refundir en un año la normativa dispersa sobre una materia. Pasado el plazo sin hacerlo, y ya convocadas elecciones, un alto cargo propone aprobar el texto igualmente y aprovechar para cambiar el fondo de algunas reglas.",
      preguntas: [
        [S2, "media", "La norma que aprueba el Gobierno en uso de la delegación recibe el nombre de:", ["Decreto legislativo", "Decreto-ley", "Ley de bases", "Orden"], "Art. 85 CE y art. 43.2 EAA."],
        [S4, "dificil", "Si ha transcurrido el plazo de un año, la delegación:", ["Se ha agotado y el Gobierno ya no puede usarla", "Se prorroga automáticamente", "Se puede usar con informe del Consejo Consultivo", "Sigue vigente hasta que la derogue otra ley"], "Art. 43.3 EAA: se agota por transcurso del plazo o por aprobación del decreto legislativo."],
        [S4, "dificil", "Con las Cortes disueltas por la convocatoria de elecciones y el Gobierno en funciones, ¿puede usarse una delegación aún vigente?", ["No", "Sí, sin límites", "Sí, solo para textos refundidos", "Sí, con autorización de la Diputación Permanente"], "Art. 43.3 EAA."],
        [S2, "media", "Cuando la delegación es para refundir textos, la ley habilitante debe determinar:", ["El ámbito y si se limita a formular un texto único o incluye regularizar, aclarar y armonizar", "Solo el plazo", "Únicamente el órgano que aprueba", "Las sanciones aplicables"], "Art. 82.5 CE; en Aragón, art. 43.4 EAA."],
        [S2, "media", "En el ámbito estatal, para que el Gobierno elabore un texto articulado, la delegación se hace por:", ["Ley de bases", "Ley ordinaria", "Ley orgánica", "Real decreto"], "Art. 82.2 CE."],
        [S2, "media", "¿Puede una ley de bases autorizar al Gobierno a modificar la propia ley de bases?", ["No", "Sí, si lo dice expresamente", "Sí, con mayoría absoluta", "Solo en el ámbito autonómico"], "Art. 83.a) CE."],
        [S2, "dificil", "Según la Constitución, la delegación legislativa en el Gobierno de la Nación no puede permitir:", ["La subdelegación a autoridades distintas del propio Gobierno", "Fijar un plazo", "Delimitar la materia", "El control por los tribunales"], "Art. 82.3 CE."],
        [S1, "media", "Si el decreto legislativo cambiara el fondo de las reglas sin autorización, se apartaría de la ley delegante. El principio constitucional en juego es, entre otros:", ["El de legalidad y jerarquía normativa", "El de autonomía local", "El de reserva de jurisdicción", "El de unidad de caja"], "Art. 9.3 CE."],
        [S4, "media", "La ley aragonesa que autoriza la refundición debe publicarse en el BOA y el BOE en un plazo no superior a:", ["15 días desde su aprobación", "30 días desde su aprobación", "Un mes desde su promulgación", "10 días hábiles"], "Art. 45 EAA."],
        [S4, "facil", "Las leyes aragonesas las promulga:", ["El Presidente de Aragón, en nombre del Rey", "El Rey directamente", "La Presidenta de las Cortes de Aragón", "El Justicia de Aragón"], "Art. 45 EAA."],
      ],
    },
  ],
});
