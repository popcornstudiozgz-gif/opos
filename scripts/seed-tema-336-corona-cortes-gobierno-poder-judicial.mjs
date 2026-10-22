/**
 * Crea tema-336 — Tema 2 de Policía Local: "La Corona. Las Cortes
 * Generales. El Poder Judicial. El Gobierno."
 *
 * Tema dedicado: el canónico tema-1 (Constitución) ya contiene estas
 * secciones, pero está vinculado como Tema 1 de esta oposición (recortado
 * a antecedentes, Título Preliminar y Título I) y cada canónico solo puede
 * vincularse una vez por oposición.
 *
 * Fuente: Constitución Española (BOE-A-1978-31229), texto consolidado
 * descargado de la API del BOE (octubre de 2026). Leídos los arts. 56-65,
 * 66-79, 81, 86-87, 90, 97-104, 108-116 y 117-127. Incluye la reforma
 * constitucional de 19 de mayo de 2026 (BOE-A-2026-10881, citada por el
 * propio texto consolidado), que modifica el art. 69.3 para que Ibiza y
 * Formentera sean circunscripciones separadas, con eficacia diferida a las
 * primeras elecciones al Senado posteriores.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-336-corona-cortes-gobierno-poder-judicial.mjs
 */
import { sembrarTema, POLICIA } from "./lib/sembrar-tema.mjs";

const CE = "https://www.boe.es/buscar/act.php?id=BOE-A-1978-31229";
const a = (n) => `${CE}#a${n}`;
const S1 = "ce-corona";
const S2 = "ce-cortes-generales";
const S3 = "ce-elaboracion-leyes";
const S4 = "ce-gobierno";
const S5 = "ce-relaciones-gobierno-cortes";
const S6 = "ce-poder-judicial";

await sembrarTema({
  tema: {
    slug: "tema-336",
    titulo: "La Corona, las Cortes Generales, el Gobierno y el Poder Judicial en la Constitución",
    descripcion: "Título II (la Corona: el Rey, sucesión, Regencia, funciones y refrendo); Título III (Cortes Generales: Congreso y Senado, composición, estatuto de los parlamentarios, funcionamiento; leyes orgánicas y ordinarias, decretos-leyes, iniciativa legislativa y procedimiento); Título IV (Gobierno: funciones, composición, investidura, cese y responsabilidad; Administración y Fuerzas y Cuerpos de Seguridad); Título V (relaciones Gobierno-Cortes: cuestión de confianza, moción de censura, disolución, estados de alarma, excepción y sitio); Título VI (Poder Judicial: principios, CGPJ, Tribunal Supremo, Ministerio Fiscal, Jurado y policía judicial).",
    contenido: "Las instituciones básicas del Estado según la Constitución: qué hace el Rey y quién responde de sus actos, cómo se componen el Congreso y el Senado, cómo se aprueba una ley, cómo se elige y cesa al Presidente del Gobierno, qué son la moción de censura y los estados de alarma, excepción y sitio, y cómo se organiza la Justicia. Incluye lo que más toca al policía: la inmunidad de los parlamentarios, el art. 104 sobre las Fuerzas y Cuerpos de Seguridad y el art. 126 sobre la policía judicial.",
    enlaces_boe: [
      { url: CE, titulo: "Constitución Española de 1978 (BOE-A-1978-31229)" },
      { url: "https://www.boe.es/buscar/doc.php?id=BOE-A-2026-10881", titulo: "Reforma del artículo 69.3 de la Constitución, de 19 de mayo de 2026 (BOE-A-2026-10881)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "Título II: De la Corona", articulos: "arts. 56-65", url: a(56) },
      { seccion: S2, titulo: "Título III, Cap. I: De las Cámaras", articulos: "arts. 66-80", url: a(66) },
      { seccion: S3, titulo: "Título III, Cap. II: De la elaboración de las leyes", articulos: "arts. 81-92", url: a(81) },
      { seccion: S4, titulo: "Título IV: Del Gobierno y de la Administración", articulos: "arts. 97-107", url: a(97) },
      { seccion: S5, titulo: "Título V: Relaciones entre el Gobierno y las Cortes Generales", articulos: "arts. 108-116", url: a(108) },
      { seccion: S6, titulo: "Título VI: Del Poder Judicial", articulos: "arts. 117-127", url: a(117) },
    ],
  },
  vinculo: { oposicion: POLICIA.oposicion, bloqueId: POLICIA.bloqueParte1, numero: 2 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["El Rey (art. 56.1)", "Jefe del Estado, símbolo de su unidad y permanencia; arbitra y modera el funcionamiento de las instituciones y asume la más alta representación internacional"],
        ["Inviolabilidad y refrendo (art. 56.3)", "La persona del Rey es inviolable y no está sujeta a responsabilidad; sus actos deben refrendarse o carecen de validez (salvo el nombramiento de su Casa)"],
        ["Sucesión (art. 57.1)", "Hereditaria en los sucesores de Don Juan Carlos I: primogenitura y representación; línea anterior, grado más próximo, varón sobre mujer y mayor edad"],
        ["Príncipe heredero (art. 57.2)", "Tiene la dignidad de Príncipe de Asturias"],
        ["Abdicaciones (art. 57.5)", "Las abdicaciones, renuncias y dudas en la sucesión se resuelven por ley orgánica"],
        ["Regencia (art. 59)", "Por minoría de edad del Rey (padre, madre o pariente mayor de edad más próximo) o por inhabilitación reconocida por las Cortes; si nadie corresponde, la nombran las Cortes (una, tres o cinco personas); español y mayor de edad"],
        ["Funciones (art. 62)", "Sancionar y promulgar las leyes, convocar y disolver las Cortes, convocar referéndum, proponer y nombrar al Presidente del Gobierno, expedir decretos, mando supremo de las Fuerzas Armadas, derecho de gracia (sin indultos generales)"],
        ["Refrendo (art. 64)", "Por el Presidente del Gobierno o los Ministros; la propuesta y nombramiento del Presidente y la disolución del art. 99, por el Presidente del Congreso; responden quienes refrendan"],
        ["Casa del Rey (art. 65)", "Recibe una cantidad global de los Presupuestos que distribuye libremente y nombra y releva libremente a los miembros de su Casa"],
      ],
      preguntas: [
        ["facil", "¿Quién es el Jefe del Estado según la Constitución?", ["El Rey", "El Presidente del Gobierno", "El Presidente del Congreso"], "CE, art. 56.1."],
        ["media", "¿Quién responde de los actos del Rey?", ["Las personas que los refrendan", "El propio Rey", "Nadie"], "Art. 64.2."],
        ["media", "¿Quién refrenda la propuesta y el nombramiento del Presidente del Gobierno?", ["El Presidente del Congreso", "El Presidente del Senado", "El Ministro de Justicia"], "Art. 64.1."],
        ["media", "¿Cómo se resuelven las abdicaciones en el orden de sucesión?", ["Por una ley orgánica", "Por decreto del Gobierno", "Por referéndum"], "Art. 57.5."],
        ["media", "¿Puede el Rey conceder indultos generales?", ["No", "Sí", "Solo con refrendo"], "Art. 62.i)."],
        ["dificil", "Si no hay ninguna persona a quien corresponda la Regencia, ¿de cuántas personas puede componerse la nombrada por las Cortes?", ["Una, tres o cinco", "Dos o cuatro", "Siete"], "Art. 59.3."],
        ["media", "¿Qué dignidad tiene el heredero de la Corona?", ["Príncipe de Asturias", "Príncipe de Viana", "Duque de Aragón"], "Art. 57.2."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Cortes Generales (art. 66)", "Representan al pueblo español; las forman el Congreso y el Senado; ejercen la potestad legislativa, aprueban los Presupuestos y controlan al Gobierno; son inviolables"],
        ["Incompatibilidades (art. 67)", "No se puede ser miembro de las dos Cámaras ni acumular el acta autonómica con la de Diputado; sin mandato imperativo"],
        ["Congreso (art. 68)", "Entre 300 y 400 Diputados, circunscripción provincial, Ceuta y Melilla un Diputado cada una, representación proporcional, cuatro años"],
        ["Senado (art. 69)", "Cámara de representación territorial: cuatro Senadores por provincia, dos por Ceuta y Melilla, insulares por isla y uno por Comunidad Autónoma más otro por cada millón de habitantes"],
        ["Reforma de 2026 (art. 69.3)", "Ibiza y Formentera pasan a ser circunscripciones separadas (una por isla), con efectos en las primeras elecciones al Senado posteriores a la reforma de 19 de mayo de 2026"],
        ["Inviolabilidad e inmunidad (art. 71)", "Inviolables por sus opiniones; solo detenidos en flagrante delito; para inculparlos o procesarlos hace falta autorización de la Cámara; los juzga la Sala de lo Penal del Tribunal Supremo"],
        ["Policía de las Cámaras (art. 72.3)", "Los Presidentes de las Cámaras ejercen los poderes administrativos y las facultades de policía en sus sedes"],
        ["Periodos de sesiones (art. 73)", "Septiembre-diciembre y febrero-junio; extraordinarias a petición del Gobierno, la Diputación Permanente o la mayoría absoluta de una Cámara"],
        ["Comisiones de investigación (art. 76)", "Sus conclusiones no vinculan a los Tribunales; es obligatorio comparecer a requerimiento de las Cámaras"],
        ["Acuerdos (art. 79)", "Cámara reunida reglamentariamente con mayoría de sus miembros; mayoría de presentes; voto personal e indelegable"],
      ],
      preguntas: [
        ["media", "¿Cuántos Diputados puede tener el Congreso?", ["Entre 300 y 400", "Exactamente 350", "Entre 200 y 300"], "CE, art. 68.1."],
        ["media", "¿Cuántos Senadores se eligen en cada provincia peninsular?", ["Cuatro", "Tres", "Dos"], "Art. 69.2."],
        ["media", "¿Puede detenerse a un Diputado durante su mandato?", ["Solo en caso de flagrante delito", "Nunca", "Siempre"], "Art. 71.2."],
        ["media", "¿Qué tribunal es competente en las causas contra Diputados y Senadores?", ["La Sala de lo Penal del Tribunal Supremo", "El Tribunal Constitucional", "La Audiencia Nacional"], "Art. 71.3."],
        ["dificil", "Tras la reforma de mayo de 2026, ¿cómo se eligen los Senadores de Ibiza y Formentera?", ["Cada isla es una circunscripción separada, con efectos en las primeras elecciones al Senado posteriores", "Siguen en una circunscripción conjunta", "Los designa el Parlamento balear"], "Art. 69.3 y disposición transitoria de la reforma (BOE-A-2026-10881)."],
        ["media", "¿Quién ejerce las facultades de policía en el interior del Congreso?", ["Su Presidente", "La Policía Nacional", "El Ministro del Interior"], "Art. 72.3."],
        ["media", "¿Vinculan a los Tribunales las conclusiones de una comisión de investigación?", ["No", "Sí", "Solo si son unánimes"], "Art. 76.1."],
        ["media", "¿Cuáles son los periodos ordinarios de sesiones?", ["Septiembre-diciembre y febrero-junio", "Enero-junio", "Todo el año"], "Art. 73.1."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Leyes orgánicas (art. 81)", "Desarrollo de derechos fundamentales y libertades públicas, Estatutos de Autonomía, régimen electoral y otras previstas; exigen mayoría absoluta del Congreso en votación final"],
        ["Comisiones legislativas (art. 75)", "Pueden aprobar leyes por delegación, salvo reforma constitucional, cuestiones internacionales, leyes orgánicas y de bases y Presupuestos"],
        ["Decretos-leyes (art. 86)", "Por extraordinaria y urgente necesidad; no pueden afectar a instituciones básicas, derechos del Título I, régimen autonómico ni derecho electoral; el Congreso los convalida o deroga en 30 días"],
        ["Iniciativa legislativa (art. 87)", "Gobierno, Congreso y Senado; Asambleas autonómicas; iniciativa popular con al menos 500.000 firmas (no en materias orgánicas, tributarias, internacionales ni de gracia)"],
        ["Senado (art. 90)", "Dos meses para vetar (por mayoría absoluta) o enmendar; veinte días naturales si es urgente; el Congreso levanta el veto por mayoría absoluta o, a los dos meses, por mayoría simple"],
      ],
      preguntas: [
        ["media", "¿Qué mayoría exige la aprobación de una ley orgánica?", ["Mayoría absoluta del Congreso en una votación final sobre el conjunto", "Mayoría simple", "Tres quintos"], "CE, art. 81.2."],
        ["media", "¿En qué plazo debe el Congreso convalidar o derogar un decreto-ley?", ["Treinta días", "Dos meses", "Diez días"], "Art. 86.2."],
        ["media", "¿Cuántas firmas exige como mínimo la iniciativa legislativa popular?", ["500.000", "100.000", "1.000.000"], "Art. 87.3."],
        ["media", "¿Puede un decreto-ley regular los derechos del Título I?", ["No, no puede afectarlos", "Sí", "Solo los del capítulo III"], "Art. 86.1."],
        ["dificil", "¿De qué plazo dispone el Senado para vetar un proyecto declarado urgente?", ["Veinte días naturales", "Dos meses", "Diez días"], "Art. 90.3."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Funciones del Gobierno (art. 97)", "Dirige la política interior y exterior, la Administración civil y militar y la defensa; ejerce la función ejecutiva y la potestad reglamentaria"],
        ["Composición (art. 98)", "Presidente, Vicepresidentes en su caso, Ministros y demás miembros que establezca la ley; el Presidente dirige y coordina"],
        ["Investidura (art. 99)", "El Rey, tras consultas y a través del Presidente del Congreso, propone candidato; confianza por mayoría absoluta o, 48 horas después, por mayoría simple; si en dos meses no hay investidura, disolución"],
        ["Nombramiento de ministros (art. 100)", "Los nombra y separa el Rey a propuesta del Presidente"],
        ["Cese (art. 101)", "Tras elecciones, pérdida de la confianza parlamentaria, dimisión o fallecimiento del Presidente; continúa en funciones hasta el nuevo Gobierno"],
        ["Responsabilidad criminal (art. 102)", "Ante la Sala de lo Penal del Tribunal Supremo; por traición o delitos contra la seguridad del Estado, a iniciativa de la cuarta parte del Congreso y con su mayoría absoluta; sin indulto"],
        ["Administración (art. 103)", "Sirve con objetividad los intereses generales con eficacia, jerarquía, descentralización, desconcentración y coordinación, sometida a la ley y al Derecho"],
        ["Fuerzas y Cuerpos de Seguridad (art. 104)", "Bajo la dependencia del Gobierno, protegen el libre ejercicio de los derechos y libertades y garantizan la seguridad ciudadana; sus funciones y estatutos se regulan por ley orgánica"],
      ],
      preguntas: [
        ["media", "¿Qué mayoría se necesita en la primera votación de investidura?", ["Mayoría absoluta", "Mayoría simple", "Dos tercios"], "CE, art. 99.3."],
        ["media", "Si no se alcanza, ¿cuándo se repite la votación y con qué mayoría?", ["48 horas después, por mayoría simple", "Al mes, por mayoría absoluta", "Nunca"], "Art. 99.3."],
        ["media", "¿Qué misión atribuye la Constitución a las Fuerzas y Cuerpos de Seguridad?", ["Proteger el libre ejercicio de los derechos y libertades y garantizar la seguridad ciudadana", "Defender la integridad territorial", "Recaudar impuestos"], "Art. 104.1."],
        ["media", "¿Quién nombra a los Ministros?", ["El Rey, a propuesta del Presidente del Gobierno", "El Congreso", "El Presidente directamente"], "Art. 100."],
        ["media", "¿Ante qué tribunal responde penalmente el Presidente del Gobierno?", ["La Sala de lo Penal del Tribunal Supremo", "La Audiencia Nacional", "El Tribunal Constitucional"], "Art. 102.1."],
        ["dificil", "¿Qué pasa si a los dos meses de la primera votación de investidura ningún candidato ha obtenido la confianza?", ["El Rey disuelve ambas Cámaras y convoca elecciones con el refrendo del Presidente del Congreso", "Gobierna el más votado", "Decide el Senado"], "Art. 99.5."],
        ["media", "¿Qué principios rigen la actuación de la Administración Pública?", ["Eficacia, jerarquía, descentralización, desconcentración y coordinación", "Solo legalidad", "Discrecionalidad"], "Art. 103.1."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["Responsabilidad política (art. 108)", "El Gobierno responde solidariamente de su gestión política ante el Congreso"],
        ["Cuestión de confianza (art. 112)", "La plantea el Presidente, previa deliberación del Consejo de Ministros; se otorga por mayoría simple"],
        ["Moción de censura (art. 113)", "Por mayoría absoluta del Congreso; la propone al menos una décima parte de los Diputados con un candidato; no se vota hasta cinco días después; si fracasa, sus firmantes no pueden presentar otra en el mismo periodo"],
        ["Efectos (art. 114)", "Si se niega la confianza, el Gobierno dimite y se procede según el art. 99; si prospera la censura, el candidato queda investido"],
        ["Disolución (art. 115)", "La propone el Presidente bajo su exclusiva responsabilidad y la decreta el Rey; no durante una moción de censura ni antes de un año de la anterior (salvo art. 99.5)"],
        ["Estado de alarma (art. 116.2)", "Lo declara el Gobierno por decreto, máximo quince días, dando cuenta al Congreso, que debe autorizar la prórroga"],
        ["Estado de excepción (art. 116.3)", "Lo declara el Gobierno previa autorización del Congreso; máximo treinta días prorrogables por otros treinta"],
        ["Estado de sitio (art. 116.4)", "Lo declara el Congreso por mayoría absoluta a propuesta exclusiva del Gobierno"],
        ["Garantías (art. 116.5-6)", "No se puede disolver el Congreso durante estos estados y no se modifica la responsabilidad del Gobierno y sus agentes"],
      ],
      preguntas: [
        ["media", "¿Qué mayoría exige la aprobación de una moción de censura?", ["Mayoría absoluta del Congreso", "Mayoría simple", "Tres quintos"], "CE, art. 113.1."],
        ["media", "¿Qué fracción de Diputados debe proponerla como mínimo?", ["Una décima parte", "Un tercio", "La mitad"], "Art. 113.2."],
        ["media", "¿Qué mayoría otorga la confianza en una cuestión de confianza?", ["Mayoría simple", "Mayoría absoluta", "Dos tercios"], "Art. 112."],
        ["media", "¿Cuál es la duración máxima inicial del estado de alarma?", ["Quince días", "Treinta días", "Sesenta días"], "Art. 116.2."],
        ["media", "¿Quién declara el estado de sitio?", ["El Congreso por mayoría absoluta, a propuesta del Gobierno", "El Rey", "El Gobierno solo"], "Art. 116.4."],
        ["dificil", "¿Puede disolverse el Congreso mientras está declarado el estado de excepción?", ["No", "Sí", "Solo con referéndum"], "Art. 116.5."],
        ["media", "¿Puede presentarse una propuesta de disolución mientras se tramita una moción de censura?", ["No", "Sí", "Solo el último mes de la legislatura"], "Art. 115.2."],
      ],
    },
    {
      seccion: S6,
      flashcards: [
        ["Principios (art. 117)", "La justicia emana del pueblo y se administra en nombre del Rey por Jueces y Magistrados independientes, inamovibles, responsables y sometidos solo a la ley; unidad jurisdiccional; prohibidos los Tribunales de excepción"],
        ["Cumplir las resoluciones (art. 118)", "Es obligado cumplir las sentencias firmes y colaborar con Jueces y Tribunales"],
        ["Justicia gratuita (art. 119)", "Cuando lo disponga la ley y, siempre, para quien acredite insuficiencia de recursos"],
        ["Publicidad y oralidad (art. 120)", "Actuaciones públicas, procedimiento predominantemente oral (sobre todo en lo penal) y sentencias motivadas pronunciadas en audiencia pública"],
        ["CGPJ (art. 122)", "Órgano de gobierno del Poder Judicial: Presidente del Tribunal Supremo y veinte miembros nombrados por el Rey para cinco años (doce jueces, cuatro a propuesta del Congreso y cuatro del Senado)"],
        ["Tribunal Supremo (art. 123)", "Órgano jurisdiccional superior en todos los órdenes, salvo en garantías constitucionales; su Presidente lo nombra el Rey a propuesta del CGPJ"],
        ["Ministerio Fiscal (art. 124)", "Promueve la acción de la justicia en defensa de la legalidad; unidad de actuación y dependencia jerárquica; el Fiscal General lo nombra el Rey a propuesta del Gobierno, oído el CGPJ"],
        ["Participación ciudadana (art. 125)", "Acción popular, Jurado y Tribunales consuetudinarios y tradicionales"],
        ["Policía judicial (art. 126)", "Depende de los Jueces, Tribunales y Ministerio Fiscal en la averiguación del delito y el descubrimiento y aseguramiento del delincuente"],
        ["Incompatibilidades (art. 127)", "Jueces, Magistrados y Fiscales en activo no pueden desempeñar otros cargos públicos ni pertenecer a partidos o sindicatos"],
      ],
      preguntas: [
        ["media", "¿De quién depende la policía judicial en la averiguación del delito?", ["De los Jueces, Tribunales y Ministerio Fiscal", "Del Ministro del Interior", "Del Alcalde"], "CE, art. 126."],
        ["media", "¿Cuál es el órgano de gobierno del Poder Judicial?", ["El Consejo General del Poder Judicial", "El Tribunal Supremo", "El Ministerio de Justicia"], "Art. 122.2."],
        ["media", "¿Cuántos miembros, además de su Presidente, tiene el CGPJ?", ["Veinte", "Doce", "Quince"], "Art. 122.3."],
        ["media", "¿Quién nombra al Fiscal General del Estado?", ["El Rey, a propuesta del Gobierno, oído el CGPJ", "El Congreso", "El CGPJ"], "Art. 124.4."],
        ["media", "¿Están permitidos los Tribunales de excepción?", ["No", "Sí, en estado de sitio", "Sí, con ley orgánica"], "Art. 117.6."],
        ["dificil", "¿Pueden los Jueces en activo pertenecer a un sindicato?", ["No", "Sí", "Solo a asociaciones profesionales y sindicatos"], "Art. 127.1."],
        ["media", "¿Cómo debe ser, predominantemente, el procedimiento en materia criminal?", ["Oral", "Escrito", "Secreto"], "Art. 120.2."],
      ],
    },
  ],
  glosario: [
    [S1, "Refrendo", "Firma del Presidente del Gobierno, un Ministro o el Presidente del Congreso que da validez a un acto del Rey y traslada la responsabilidad."],
    [S1, "Regencia", "Ejercicio de las funciones de la Corona en nombre del Rey durante su minoría de edad o inhabilitación."],
    [S2, "Inmunidad parlamentaria", "Garantía por la que un parlamentario solo puede ser detenido en flagrante delito y no puede ser procesado sin autorización de su Cámara."],
    [S2, "Diputación Permanente", "Órgano de cada Cámara que asume sus funciones cuando está disuelta o fuera de periodo de sesiones."],
    [S3, "Decreto-ley", "Norma con rango de ley dictada por el Gobierno en caso de extraordinaria y urgente necesidad."],
    [S4, "Investidura", "Otorgamiento por el Congreso de su confianza al candidato a Presidente del Gobierno."],
    [S5, "Moción de censura", "Instrumento para exigir la responsabilidad política del Gobierno, que incluye un candidato alternativo."],
    [S5, "Estado de alarma", "Estado excepcional declarado por el Gobierno por un máximo de quince días prorrogables con autorización del Congreso."],
    [S6, "Unidad jurisdiccional", "Principio por el que la potestad de juzgar corresponde a un único Poder Judicial."],
    [S6, "Policía judicial", "Función policial de averiguación del delito bajo la dependencia de Jueces, Tribunales y Fiscales."],
  ],
  casos: [
    {
      slug: "caso-diputado-control-alcoholemia",
      titulo: "Un diputado en un control de alcoholemia",
      supuesto: "En un control de la Policía Local, un conductor que se identifica como Diputado al Congreso da positivo en alcohol por encima de la tasa que constituye delito. Exige que le dejen marchar 'por su inmunidad'.",
      preguntas: [
        [S2, "media", "¿Qué protege la inviolabilidad de los parlamentarios?", ["Las opiniones manifestadas en el ejercicio de sus funciones", "Cualquier conducta", "Sus vehículos"], "CE, art. 71.1."],
        [S2, "media", "¿Cuándo puede detenerse a un Diputado durante su mandato?", ["Solo en caso de flagrante delito", "Nunca", "Con permiso del Rey"], "Art. 71.2."],
        [S2, "media", "¿Qué hace falta para inculparlo o procesarlo?", ["Autorización previa de la Cámara (suplicatorio)", "Nada", "Orden del Gobierno"], "Art. 71.2."],
        [S2, "media", "¿Qué tribunal es competente en las causas penales contra un Diputado?", ["La Sala de lo Penal del Tribunal Supremo", "El Juzgado de guardia siempre", "El Tribunal Constitucional"], "Art. 71.3."],
        [S6, "media", "En la instrucción, los agentes que actúan como policía judicial dependen de…", ["Jueces, Tribunales y Ministerio Fiscal", "El Congreso", "El Ministerio del Interior exclusivamente"], "Art. 126."],
        [S4, "media", "¿Qué artículo de la Constitución encomienda a las Fuerzas y Cuerpos de Seguridad garantizar la seguridad ciudadana?", ["El 104", "El 56", "El 117"], "Art. 104.1."],
        [S6, "media", "¿Están obligados todos a colaborar con los Tribunales en el proceso?", ["Sí", "No", "Solo los funcionarios"], "Art. 118."],
        [S2, "dificil", "Un senador que lo es también de un Parlamento autonómico… ¿puede ser a la vez Diputado al Congreso?", ["No: no se puede ser miembro de las dos Cámaras ni acumular acta autonómica y de Diputado", "Sí", "Solo un año"], "Art. 67.1."],
        [S6, "media", "¿Qué principio impide crear un tribunal especial para el caso?", ["La prohibición de los Tribunales de excepción", "La inmunidad", "El refrendo"], "Art. 117.6."],
        [S6, "media", "¿Cómo deben ser las sentencias?", ["Motivadas y pronunciadas en audiencia pública", "Secretas", "Orales sin motivar"], "Art. 120.3."],
      ],
    },
    {
      slug: "caso-estado-alarma-ciudad",
      titulo: "La declaración de un estado de alarma",
      supuesto: "Ante una catástrofe que afecta a Zaragoza, el Gobierno declara el estado de alarma. La Policía Local recibe instrucciones de las autoridades competentes. Un ciudadano pregunta cuánto puede durar y quién controla la medida.",
      preguntas: [
        [S5, "media", "¿Quién declara el estado de alarma?", ["El Gobierno, por decreto acordado en Consejo de Ministros", "El Congreso", "El Rey"], "CE, art. 116.2."],
        [S5, "media", "¿Cuál es su plazo máximo inicial?", ["Quince días", "Treinta días", "Tres meses"], "Art. 116.2."],
        [S5, "media", "¿Quién debe autorizar su prórroga?", ["El Congreso de los Diputados", "El Senado", "El Tribunal Supremo"], "Art. 116.2."],
        [S5, "media", "¿Qué norma regula los estados de alarma, excepción y sitio?", ["Una ley orgánica", "Un decreto-ley", "Una ordenanza"], "Art. 116.1."],
        [S5, "media", "¿Se modifica la responsabilidad del Gobierno y de sus agentes durante el estado de alarma?", ["No", "Sí, desaparece", "Solo la de los agentes"], "Art. 116.6."],
        [S5, "dificil", "Si el Congreso estuviera disuelto, ¿quién asumiría sus competencias?", ["Su Diputación Permanente", "El Senado", "El Gobierno"], "Art. 116.5."],
        [S5, "media", "¿Quién declararía, en su caso, el estado de excepción?", ["El Gobierno, previa autorización del Congreso", "El Rey", "El Alcalde"], "Art. 116.3."],
        [S5, "media", "¿Qué duración máxima tiene el estado de excepción?", ["Treinta días, prorrogables por otros treinta", "Quince días", "Un año"], "Art. 116.3."],
        [S4, "media", "¿Bajo la dependencia de quién están las Fuerzas y Cuerpos de Seguridad?", ["Del Gobierno", "Del Congreso", "Del Rey"], "Art. 104.1."],
        [S5, "media", "¿Puede interrumpirse el funcionamiento de los poderes del Estado durante estos estados?", ["No", "Sí", "Solo el judicial"], "Art. 116.5."],
      ],
    },
    {
      slug: "caso-ley-investidura",
      titulo: "De las elecciones a la ley",
      supuesto: "En una clase de la academia de Policía se repasa el camino desde unas elecciones generales hasta la aprobación de una ley orgánica que modifica la Ley de Seguridad Ciudadana, pasando por la investidura del Presidente del Gobierno.",
      preguntas: [
        [S2, "media", "¿Por cuánto tiempo se elige el Congreso?", ["Cuatro años", "Cinco años", "Seis años"], "CE, art. 68.4."],
        [S4, "media", "¿Quién propone al candidato a Presidente del Gobierno?", ["El Rey, tras consultar a los grupos y a través del Presidente del Congreso", "El partido más votado", "El Senado"], "Art. 99.1."],
        [S4, "media", "En la primera votación, el candidato necesita…", ["Mayoría absoluta del Congreso", "Mayoría simple", "Unanimidad"], "Art. 99.3."],
        [S1, "media", "¿Quién refrenda el nombramiento del Presidente del Gobierno?", ["El Presidente del Congreso", "El Presidente saliente", "El Fiscal General"], "Art. 64.1."],
        [S3, "media", "Una ley sobre derechos fundamentales como la de Seguridad Ciudadana es…", ["Una ley orgánica", "Una ley ordinaria", "Un reglamento"], "Art. 81.1."],
        [S3, "media", "¿Puede aprobarla una Comisión Legislativa Permanente por delegación?", ["No, las leyes orgánicas están excluidas", "Sí", "Solo en verano"], "Art. 75.3."],
        [S3, "media", "¿Cuánto tiempo tiene el Senado para vetarla o enmendarla?", ["Dos meses", "Un año", "Diez días"], "Art. 90.2."],
        [S1, "media", "¿Quién sanciona y promulga la ley aprobada?", ["El Rey", "El Presidente del Gobierno", "El Presidente del Congreso"], "Art. 62.a)."],
        [S3, "dificil", "¿Por qué mayoría puede el Congreso levantar inmediatamente un veto del Senado?", ["Mayoría absoluta", "Mayoría simple", "Tres quintos"], "Art. 90.2."],
        [S4, "media", "¿Cuándo cesa el Gobierno?", ["Tras las elecciones generales, por pérdida de confianza, dimisión o fallecimiento del Presidente", "Cada año", "Nunca"], "Art. 101.1."],
      ],
    },
  ],
});
