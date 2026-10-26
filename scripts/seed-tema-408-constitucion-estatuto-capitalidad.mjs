/**
 * Crea tema-408 — Tema 1 de Operario/a Especialista (Ayto. Zaragoza, CONV
 * 5/2026, Anexo I): "La Constitución española: estructura y título
 * preliminar. La Administración pública en la Constitución. Organización
 * territorial del Estado en la Constitución: principios generales y
 * Administración local. El Estatuto de Autonomía de Aragón: título
 * preliminar. La Ley de régimen especial del municipio de Zaragoza como
 * capital de Aragón: disposiciones generales, gobierno y administración del
 * municipio de Zaragoza."
 *
 * Tema dedicado: mezcla tres normas que en el catálogo viven en canónicos
 * distintos (tema-1, tema-3 y tema-14/tema-42) y cada número solo admite un
 * canónico.
 *
 * Fuentes leídas en la API del BOE en esta sesión:
 * - Constitución Española (BOE-A-1978-31229): arts. 1-9 (título preliminar),
 *   103-106 (Administración pública) y 137-142 (principios generales de la
 *   organización territorial y Administración local).
 * - LO 5/2007, Estatuto de Autonomía de Aragón (BOE-A-2007-8444): título
 *   preliminar, arts. 1-10.
 * - Ley 10/2017, de 30 de noviembre, de régimen especial del municipio de
 *   Zaragoza como capital de Aragón (BOE-A-2018-1683): capítulo I
 *   (disposiciones generales, arts. 1-6) y capítulo II, secciones 1.ª a 4.ª
 *   (gobierno y administración, Pleno, Alcalde y Gobierno de Zaragoza,
 *   arts. 7-14). El art. 14.1.u) fue anulado por la STC 137/2018.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-408-constitucion-estatuto-capitalidad.mjs
 */
import { sembrarTema, OPERARIO } from "./lib/sembrar-tema.mjs";

const CE = "https://www.boe.es/buscar/act.php?id=BOE-A-1978-31229";
const EAAR = "https://www.boe.es/buscar/act.php?id=BOE-A-2007-8444";
const CAP = "https://www.boe.es/buscar/act.php?id=BOE-A-2018-1683";
const S1 = "ce-estructura-titulo-preliminar";
const S2 = "ce-administracion-publica";
const S3 = "ce-organizacion-territorial-local";
const S4 = "estatuto-aragon-titulo-preliminar";
const S5 = "capitalidad-zaragoza-gobierno";

await sembrarTema({
  tema: {
    slug: "tema-408",
    titulo: "La Constitución (estructura, título preliminar, Administración y organización territorial), el título preliminar del Estatuto de Aragón y la Ley de capitalidad de Zaragoza",
    descripcion: "Constitución Española de 1978: estructura (preámbulo, título preliminar y diez títulos, disposiciones) y título preliminar (arts. 1-9: Estado social y democrático de Derecho, soberanía nacional, monarquía parlamentaria, unidad y autonomía, lenguas, bandera, capital, partidos, sindicatos, Fuerzas Armadas y principios del art. 9). La Administración pública en la Constitución (arts. 103-106). Organización territorial: principios generales (arts. 137-139) y Administración local (arts. 140-142). Estatuto de Autonomía de Aragón: título preliminar (arts. 1-10). Ley 10/2017 de régimen especial del municipio de Zaragoza como capital de Aragón: disposiciones generales (arts. 1-6) y gobierno y administración del municipio (Pleno, Alcalde y Gobierno de Zaragoza, arts. 7-14).",
    contenido: "Lo esencial de las tres normas que organizan el poder público que verás cada día como empleado municipal: cómo está hecha la Constitución y qué dice su título preliminar, qué principios debe seguir toda Administración, cómo se reparte el territorio entre municipios, provincias y comunidades autónomas, cómo empieza el Estatuto de Aragón y quién gobierna el Ayuntamiento de Zaragoza según su Ley de capitalidad.",
    enlaces_boe: [
      { url: CE, titulo: "Constitución Española (BOE-A-1978-31229)" },
      { url: EAAR, titulo: "Ley Orgánica 5/2007, de 20 de abril, de reforma del Estatuto de Autonomía de Aragón (BOE-A-2007-8444)" },
      { url: CAP, titulo: "Ley 10/2017, de 30 de noviembre, de régimen especial del municipio de Zaragoza como capital de Aragón (BOE-A-2018-1683)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "La Constitución: estructura y título preliminar", articulos: "arts. 1-9 CE", url: `${CE}#a1` },
      { seccion: S2, titulo: "La Administración pública en la Constitución", articulos: "arts. 103-106 CE", url: `${CE}#a103` },
      { seccion: S3, titulo: "Organización territorial: principios generales y Administración local", articulos: "arts. 137-142 CE", url: `${CE}#a137` },
      { seccion: S4, titulo: "El Estatuto de Autonomía de Aragón: título preliminar", articulos: "arts. 1-10 EAAr", url: `${EAAR}#a1` },
      { seccion: S5, titulo: "Ley de capitalidad: disposiciones generales, gobierno y administración de Zaragoza", articulos: "arts. 1-14 Ley 10/2017", url: `${CAP}#a1` },
    ],
  },
  vinculo: { oposicion: OPERARIO.oposicion, bloqueId: OPERARIO.bloque, numero: 1 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Estructura de la Constitución", "Preámbulo, 169 artículos repartidos en un título preliminar y diez títulos, y disposiciones: 4 adicionales, 9 transitorias, 1 derogatoria y 1 final"],
        ["Art. 1.1 CE", "España se constituye en un Estado social y democrático de Derecho, que propugna como valores superiores la libertad, la justicia, la igualdad y el pluralismo político"],
        ["Soberanía y forma política (art. 1.2 y 1.3)", "La soberanía nacional reside en el pueblo español, del que emanan los poderes del Estado; la forma política del Estado español es la Monarquía parlamentaria"],
        ["Art. 2 CE", "Indisoluble unidad de la Nación española; reconoce y garantiza el derecho a la autonomía de las nacionalidades y regiones y la solidaridad entre todas ellas"],
        ["Lenguas (art. 3)", "El castellano es la lengua oficial del Estado y todos tienen el deber de conocerla y el derecho a usarla; las demás lenguas españolas son también oficiales en sus Comunidades según sus Estatutos"],
        ["Bandera y capital (arts. 4 y 5)", "Bandera de tres franjas horizontales, roja, amarilla y roja, siendo la amarilla de doble anchura que cada una de las rojas; la capital del Estado es la villa de Madrid"],
        ["Partidos, sindicatos y FF. AA. (arts. 6-8)", "Partidos: expresan el pluralismo político (estructura y funcionamiento democráticos). Sindicatos y asociaciones empresariales: defienden sus intereses económicos y sociales. Fuerzas Armadas (Tierra, Armada y Aire): garantizan la soberanía, la integridad territorial y el ordenamiento constitucional"],
        ["Art. 9.1 CE", "Los ciudadanos y los poderes públicos están sujetos a la Constitución y al resto del ordenamiento jurídico"],
        ["Art. 9.3 CE", "Garantiza la legalidad, la jerarquía normativa, la publicidad de las normas, la irretroactividad de las disposiciones sancionadoras no favorables o restrictivas de derechos, la seguridad jurídica, la responsabilidad y la interdicción de la arbitrariedad de los poderes públicos"],
      ],
      preguntas: [
        ["facil", "Según el art. 1.3 de la Constitución, la forma política del Estado español es:", ["La Monarquía parlamentaria", "La República federal", "La Monarquía constitucional absoluta"], "Art. 1.3 CE."],
        ["facil", "¿Cuál de estos NO es un valor superior del ordenamiento según el art. 1.1 CE?", ["La solidaridad", "El pluralismo político", "La justicia"], "Art. 1.1: libertad, justicia, igualdad y pluralismo político. La solidaridad aparece en el art. 2, entre nacionalidades y regiones."],
        ["media", "La Constitución se estructura en:", ["Un título preliminar y diez títulos, con 169 artículos", "Doce títulos y 200 artículos", "Un título preliminar y ocho títulos, con 150 artículos"], "Estructura de la CE."],
        ["facil", "La soberanía nacional reside en:", ["El pueblo español", "Las Cortes Generales", "El Rey"], "Art. 1.2 CE."],
        ["media", "Según el art. 3 CE, el castellano:", ["Es la lengua oficial del Estado y todos tienen el deber de conocerla y el derecho a usarla", "Es la única lengua oficial en todo el territorio", "Solo es obligatoria en la Administración del Estado"], "Art. 3.1 CE."],
        ["media", "En la bandera de España, la franja amarilla:", ["Es de doble anchura que cada una de las rojas", "Tiene la misma anchura que las rojas", "Es de triple anchura que las rojas"], "Art. 4.1 CE."],
        ["media", "¿Qué artículo de la Constitución garantiza la interdicción de la arbitrariedad de los poderes públicos?", ["El 9.3", "El 14", "El 103.1"], "Art. 9.3 CE."],
        ["dificil", "La misión de garantizar la soberanía, la integridad territorial y el ordenamiento constitucional corresponde, según el título preliminar, a:", ["Las Fuerzas Armadas", "Las Fuerzas y Cuerpos de Seguridad", "El Gobierno"], "Art. 8.1 CE. Las Fuerzas y Cuerpos de Seguridad aparecen en el art. 104, fuera del título preliminar."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Art. 103.1 CE", "La Administración Pública sirve con objetividad los intereses generales y actúa según los principios de eficacia, jerarquía, descentralización, desconcentración y coordinación, con sometimiento pleno a la ley y al Derecho"],
        ["Acceso a la función pública (art. 103.3)", "La ley regulará el estatuto de los funcionarios, el acceso según los principios de mérito y capacidad, su derecho a sindicación, las incompatibilidades y las garantías de imparcialidad"],
        ["Fuerzas y Cuerpos de Seguridad (art. 104)", "Bajo la dependencia del Gobierno, protegen el libre ejercicio de los derechos y libertades y garantizan la seguridad ciudadana; una ley orgánica regula sus funciones y estatutos"],
        ["Art. 105 CE", "La ley regulará la audiencia de los ciudadanos en la elaboración de disposiciones administrativas, su acceso a archivos y registros y el procedimiento de los actos administrativos, con audiencia del interesado cuando proceda"],
        ["Control judicial (art. 106.1)", "Los Tribunales controlan la potestad reglamentaria y la legalidad de la actuación administrativa, así como su sometimiento a los fines que la justifican"],
        ["Responsabilidad patrimonial (art. 106.2)", "Los particulares tienen derecho a ser indemnizados por toda lesión en sus bienes y derechos causada por el funcionamiento de los servicios públicos, salvo fuerza mayor"],
      ],
      preguntas: [
        ["media", "¿Cuál de estos NO es un principio de actuación de la Administración del art. 103.1 CE?", ["Autonomía", "Jerarquía", "Desconcentración"], "Art. 103.1: eficacia, jerarquía, descentralización, desconcentración y coordinación."],
        ["facil", "El acceso a la función pública se rige, según el art. 103.3 CE, por los principios de:", ["Mérito y capacidad", "Antigüedad y confianza", "Publicidad y libre designación"], "Art. 103.3 CE."],
        ["media", "Si un vecino sufre un daño por el funcionamiento de un servicio público municipal, tiene derecho a ser indemnizado salvo en caso de:", ["Fuerza mayor", "Que el servicio sea gratuito", "Que el daño sea inferior a 600 euros"], "Art. 106.2 CE."],
        ["media", "¿Quién controla, según la Constitución, la legalidad de la actuación administrativa?", ["Los Tribunales", "El Defensor del Pueblo", "El Consejo de Estado"], "Art. 106.1 CE."],
        ["dificil", "El acceso de los ciudadanos a archivos y registros administrativos lo regula:", ["El art. 105 CE, salvo lo que afecte a seguridad y defensa, averiguación de delitos e intimidad", "El art. 9 CE, sin excepciones", "El art. 140 CE, solo para los municipios"], "Art. 105.b) CE."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Art. 137 CE", "El Estado se organiza territorialmente en municipios, provincias y Comunidades Autónomas; todas gozan de autonomía para la gestión de sus respectivos intereses"],
        ["Solidaridad (art. 138)", "El Estado garantiza un equilibrio económico adecuado y justo entre las partes del territorio; las diferencias entre Estatutos no pueden implicar privilegios económicos o sociales"],
        ["Igualdad territorial (art. 139)", "Todos los españoles tienen los mismos derechos y obligaciones en cualquier parte del territorio, y ninguna autoridad puede obstaculizar la libre circulación de personas y bienes"],
        ["El municipio (art. 140)", "La Constitución garantiza su autonomía y le da personalidad jurídica plena; lo gobierna el Ayuntamiento (Alcalde y Concejales); los concejales se eligen por sufragio universal, igual, libre, directo y secreto, y el Alcalde por los concejales o por los vecinos"],
        ["La provincia (art. 141)", "Entidad local con personalidad jurídica propia, agrupación de municipios y división territorial para las actividades del Estado; la gobiernan las Diputaciones; alterar sus límites exige ley orgánica"],
        ["Haciendas locales (art. 142)", "Deben tener medios suficientes y se nutren fundamentalmente de tributos propios y de participación en los del Estado y de las Comunidades Autónomas"],
      ],
      preguntas: [
        ["facil", "Según el art. 137 CE, el Estado se organiza territorialmente en:", ["Municipios, provincias y Comunidades Autónomas", "Municipios, comarcas y regiones", "Provincias y Comunidades Autónomas solamente"], "Art. 137 CE. Las comarcas las crea la legislación autonómica."],
        ["media", "El gobierno y la administración de los municipios corresponde, según la Constitución, a:", ["Sus Ayuntamientos, integrados por Alcaldes y Concejales", "Las Diputaciones provinciales", "Los Plenos y las Juntas de Distrito"], "Art. 140 CE."],
        ["media", "Cualquier alteración de los límites provinciales requiere:", ["Ley orgánica aprobada por las Cortes Generales", "Acuerdo de las Diputaciones afectadas", "Decreto del Gobierno de la Comunidad Autónoma"], "Art. 141.1 CE."],
        ["media", "Las Haciendas locales se nutren fundamentalmente de:", ["Tributos propios y participación en los del Estado y de las Comunidades Autónomas", "Multas y sanciones", "Préstamos bancarios"], "Art. 142 CE."],
        ["dificil", "Según el art. 140 CE, el Alcalde es elegido:", ["Por los Concejales o por los vecinos", "Siempre directamente por los vecinos", "Por el Pleno de la Diputación"], "Art. 140 CE."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Art. 1 EAAr", "Aragón, nacionalidad histórica, ejerce su autogobierno según el Estatuto; sus poderes emanan del pueblo aragonés y de la Constitución, y tiene identidad propia por sus instituciones tradicionales, el Derecho foral y su cultura"],
        ["Territorio (art. 2)", "El histórico de Aragón: el de los municipios, comarcas y provincias de Huesca, Teruel y Zaragoza"],
        ["Símbolos y capitalidad (art. 3)", "Bandera de cuatro barras rojas horizontales sobre fondo amarillo con el escudo en el centro; la capital es Zaragoza; el Día de Aragón es el 23 de abril"],
        ["Condición política de aragonés (art. 4)", "La tienen los españoles con vecindad administrativa en cualquier municipio de Aragón; también los residentes en el extranjero cuya última vecindad fue en Aragón, y sus descendientes si lo solicitan"],
        ["Organización territorial de Aragón (art. 5)", "Municipios, comarcas y provincias"],
        ["Lenguas (art. 7)", "Las lenguas y modalidades lingüísticas propias son patrimonio histórico y cultural; una ley de Cortes fija sus zonas de uso predominante; nadie puede ser discriminado por razón de la lengua"],
        ["Eficacia de las normas (art. 9)", "Las normas aragonesas tienen eficacia territorial; el Derecho foral aragonés tiene eficacia personal y se aplica a quienes tienen vecindad civil aragonesa, residan donde residan"],
      ],
      preguntas: [
        ["facil", "Según el Estatuto, el Día de Aragón es:", ["El 23 de abril", "El 12 de octubre", "El 5 de marzo"], "Art. 3.4 EAAr."],
        ["facil", "La capital de Aragón es:", ["Zaragoza", "Huesca", "Teruel"], "Art. 3.3 EAAr."],
        ["media", "Según el art. 5 del Estatuto, Aragón estructura su organización territorial en:", ["Municipios, comarcas y provincias", "Municipios y provincias", "Comarcas y mancomunidades"], "Art. 5 EAAr."],
        ["media", "Tienen la condición política de aragoneses:", ["Los españoles con vecindad administrativa en cualquier municipio de Aragón", "Todos los nacidos en Aragón, residan donde residan, aunque no sean españoles", "Solo quienes llevan diez años empadronados en Aragón"], "Art. 4.1 EAAr."],
        ["dificil", "El Derecho foral de Aragón tiene eficacia:", ["Personal: se aplica a quienes tienen vecindad civil aragonesa, residan donde residan", "Solo territorial, dentro de Aragón", "Solo para los extranjeros residentes en Aragón"], "Art. 9.2 EAAr."],
        ["media", "La bandera de Aragón es:", ["La de las cuatro barras rojas horizontales sobre fondo amarillo", "La de cuatro barras amarillas sobre fondo rojo", "La de franjas roja y amarilla de igual anchura"], "Art. 3.1 EAAr."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["Objeto de la Ley 10/2017 (art. 1)", "El municipio de Zaragoza, capital de la Comunidad Autónoma de Aragón, goza del régimen especial que establece esta Ley"],
        ["Títulos de la ciudad (art. 6)", "Muy Noble, Muy Leal, Muy Heroica, Siempre Heroica, Muy Benéfica e Inmortal, y «Sitio Emblemático de la Cultura de Paz» (UNESCO); habitualmente se usa el de Inmortal"],
        ["Término municipal (art. 3)", "Zaragoza ejerce sus competencias en su término municipal; su alteración corresponde al Gobierno de Aragón según la legislación de régimen local"],
        ["Gobierno y administración (art. 7.2)", "Corresponden al Ayuntamiento de Zaragoza, integrado por el Alcalde y los Concejales"],
        ["Órganos (art. 8)", "El Pleno (máxima representación política), los órganos ejecutivos (Alcalde, Gobierno de Zaragoza, Vicealcalde, Tenientes de Alcalde y Concejales con responsabilidades de gobierno) y los órganos directivos"],
        ["El Alcalde (art. 12)", "Dirige la acción del Gobierno de Zaragoza, ostenta la máxima representación del municipio, responde ante el Pleno, dicta bandos y decretos y tiene la jefatura de la Policía Local"],
        ["Gobierno de Zaragoza (art. 13)", "Órgano colegiado ejecutivo presidido por el Alcalde; sus miembros no pueden superar un tercio del número legal de miembros del Pleno, además del Alcalde; sus deliberaciones son secretas"],
        ["Pleno (arts. 10-11)", "Lo preside el Alcalde; tiene Comisiones y un Secretario General; aprueba ordenanzas, reglamentos orgánicos y presupuestos, y controla a los órganos de gobierno"],
      ],
      preguntas: [
        ["media", "Según la Ley 10/2017, el título que usa habitualmente la ciudad de Zaragoza es el de:", ["Inmortal", "Muy Noble", "Siempre Heroica"], "Art. 6 Ley 10/2017."],
        ["media", "Los miembros del Gobierno de Zaragoza, además del Alcalde, no pueden exceder de:", ["Un tercio del número legal de miembros del Pleno", "La mitad de los concejales", "Diez personas"], "Art. 13.2 Ley 10/2017."],
        ["facil", "La jefatura de la Policía Local de Zaragoza corresponde a:", ["El Alcalde", "El Pleno", "El Gobierno de Aragón"], "Art. 12.1.j) Ley 10/2017."],
        ["media", "¿Qué órgano es el de máxima representación política de los ciudadanos de Zaragoza?", ["El Pleno", "El Gobierno de Zaragoza", "La Junta de Portavoces"], "Art. 8.1.a) Ley 10/2017."],
        ["dificil", "La alteración del término municipal de Zaragoza corresponde a:", ["El Gobierno de Aragón, según la legislación de régimen local", "El Pleno del Ayuntamiento por mayoría simple", "Las Cortes Generales"], "Art. 3 Ley 10/2017."],
        ["media", "Las deliberaciones del Gobierno de Zaragoza son:", ["Secretas, salvo en las atribuciones delegadas por el Pleno", "Siempre públicas", "Públicas solo cuando lo pide un grupo municipal"], "Art. 13.5 Ley 10/2017."],
        ["media", "¿Quién dicta los bandos municipales en Zaragoza?", ["El Alcalde", "El Secretario General del Pleno", "El Gobierno de Zaragoza"], "Art. 12.1.g) Ley 10/2017."],
      ],
    },
  ],
  glosario: [
    [S1, "Estado social y democrático de Derecho", "Fórmula del art. 1.1 CE: el poder está sometido a la ley (Derecho), procede del pueblo (democrático) y debe procurar el bienestar y la igualdad real (social)."],
    [S1, "Monarquía parlamentaria", "Forma política en la que el Rey es Jefe del Estado sin poder ejecutivo, y el Gobierno depende de la confianza del Parlamento."],
    [S1, "Interdicción de la arbitrariedad", "Prohibición de que los poderes públicos actúen por capricho o sin justificación razonable (art. 9.3 CE)."],
    [S2, "Desconcentración", "Traspaso de competencias de un órgano superior a otro inferior de la misma Administración."],
    [S2, "Responsabilidad patrimonial", "Obligación de la Administración de indemnizar los daños que cause el funcionamiento de sus servicios públicos, salvo fuerza mayor (art. 106.2 CE)."],
    [S3, "Autonomía local", "Capacidad de municipios y provincias de gestionar sus propios intereses bajo su responsabilidad, garantizada por los arts. 137 y 140 CE."],
    [S3, "Concejo abierto", "Régimen de gobierno municipal en el que los vecinos, reunidos en asamblea, ejercen directamente el gobierno; la ley regula cuándo procede (art. 140 CE)."],
    [S4, "Vecindad administrativa", "Condición de quien está empadronado en un municipio; en Aragón da la condición política de aragonés a los españoles (art. 4 EAAr)."],
    [S4, "Derecho foral aragonés", "Derecho civil propio de Aragón, que se aplica a quienes tienen vecindad civil aragonesa (art. 9.2 EAAr)."],
    [S5, "Gobierno de Zaragoza", "Órgano colegiado ejecutivo del Ayuntamiento, presidido por el Alcalde; equivale a la Junta de Gobierno Local de los municipios de gran población."],
    [S5, "Bando", "Disposición del Alcalde dirigida a la ciudadanía para recordar normas o adoptar medidas, que solo él puede dictar (art. 12 Ley 10/2017)."],
  ],
  casos: [
    {
      slug: "visita-escolar-ayuntamiento",
      titulo: "La visita escolar al Ayuntamiento",
      supuesto: "Trabajas como operario/a en el edificio del Seminario y te piden acompañar a un grupo de alumnos de secundaria que visita el Ayuntamiento. La profesora ha preparado un cuestionario sobre la Constitución, el Estatuto de Aragón y la organización municipal, y te pide ayuda para resolver las dudas de los alumnos durante el recorrido.",
      preguntas: [
        [S1, "facil", "Un alumno pregunta qué forma política tiene España según la Constitución. La respuesta correcta es:", ["Monarquía parlamentaria", "República parlamentaria", "Monarquía absoluta", "Estado federal"], "Art. 1.3 CE."],
        [S1, "media", "Otro alumno pregunta cuántos artículos tiene la Constitución:", ["169", "150", "200", "112"], "Estructura de la CE."],
        [S1, "media", "Preguntan dónde reside la soberanía nacional:", ["En el pueblo español", "En el Rey", "En las Cortes Generales", "En el Gobierno"], "Art. 1.2 CE."],
        [S4, "facil", "La profesora pregunta qué día se celebra el Día de Aragón:", ["El 23 de abril", "El 12 de octubre", "El 6 de diciembre", "El 1 de mayo"], "Art. 3.4 EAAr."],
        [S4, "media", "¿Cómo estructura Aragón su organización territorial según su Estatuto?", ["En municipios, comarcas y provincias", "En municipios y comarcas", "En provincias y regiones", "En distritos y barrios"], "Art. 5 EAAr."],
        [S5, "media", "Un alumno quiere saber qué órgano es la máxima representación política de los zaragozanos:", ["El Pleno", "El Alcalde", "El Gobierno de Zaragoza", "La Junta de Portavoces"], "Art. 8.1.a) Ley 10/2017."],
        [S5, "media", "Al pasar por el despacho de Alcaldía preguntan quién manda la Policía Local:", ["El Alcalde, que tiene su jefatura", "El Pleno", "El Gobierno de Aragón", "El Delegado del Gobierno"], "Art. 12.1.j) Ley 10/2017."],
        [S5, "dificil", "¿Qué título honorífico usa habitualmente la ciudad de Zaragoza?", ["Inmortal", "Muy Noble", "Siempre Heroica", "Muy Benéfica"], "Art. 6 Ley 10/2017."],
        [S3, "media", "La profesora pregunta cómo se eligen los concejales:", ["Por los vecinos, mediante sufragio universal, igual, libre, directo y secreto", "Por el Alcalde", "Por las Cortes de Aragón", "Por sorteo entre los vecinos"], "Art. 140 CE."],
        [S1, "dificil", "Un alumno pregunta de qué color es la franja central de la bandera de España y cómo es:", ["Amarilla, de doble anchura que cada una de las rojas", "Roja, de doble anchura que las amarillas", "Amarilla, de igual anchura que las rojas", "Blanca, con el escudo"], "Art. 4.1 CE."],
      ],
    },
    {
      slug: "reclamacion-dano-acera",
      titulo: "La reclamación por una caída en la acera",
      supuesto: "Una vecina se ha caído en una acera en la que el servicio municipal de mantenimiento había dejado una tapa de arqueta mal colocada. Viene a una dependencia municipal donde trabajas y pregunta si el Ayuntamiento debe responder, quién controla lo que hace la Administración y qué principios debe respetar el Ayuntamiento. Tu responsable te pide que la orientes con lo que dice la Constitución.",
      preguntas: [
        [S2, "media", "¿Tiene derecho la vecina a ser indemnizada?", ["Sí, si la lesión es consecuencia del funcionamiento del servicio público, salvo fuerza mayor", "No, el Ayuntamiento nunca responde de las aceras", "Solo si el operario es condenado penalmente", "Solo si la caída fue en día laborable"], "Art. 106.2 CE."],
        [S2, "media", "¿Qué artículo de la Constitución recoge ese derecho a indemnización?", ["El 106.2", "El 9.1", "El 140", "El 3.2"], "Art. 106.2 CE."],
        [S2, "media", "Si el Ayuntamiento rechaza la reclamación, ¿quién puede controlar esa decisión?", ["Los Tribunales", "El Rey", "La Diputación Provincial", "El Consejo Bilateral de Capitalidad"], "Art. 106.1 CE."],
        [S2, "media", "La vecina pregunta cómo debe actuar la Administración. Según el art. 103.1 CE sirve con objetividad los intereses generales y actúa, entre otros, con el principio de:", ["Eficacia", "Rentabilidad", "Discrecionalidad", "Secreto"], "Art. 103.1 CE."],
        [S2, "dificil", "¿Cuál de estos principios NO aparece en el art. 103.1 CE?", ["Publicidad", "Jerarquía", "Descentralización", "Coordinación"], "Art. 103.1 CE."],
        [S1, "media", "La vecina dice que «los funcionarios hacen lo que quieren». El art. 9.1 CE establece que los ciudadanos y los poderes públicos están sujetos a:", ["La Constitución y al resto del ordenamiento jurídico", "Las órdenes del Alcalde", "Los convenios colectivos", "Las costumbres locales"], "Art. 9.1 CE."],
        [S1, "media", "El art. 9.3 CE garantiza también:", ["La responsabilidad de los poderes públicos", "La irresponsabilidad de los funcionarios", "La retroactividad de las sanciones", "El secreto de las normas"], "Art. 9.3 CE."],
        [S3, "media", "La vecina pregunta si el Ayuntamiento puede organizar sus servicios a su manera. La Constitución garantiza a los municipios:", ["Autonomía para gestionar sus intereses y personalidad jurídica plena", "Soberanía propia", "Independencia de la ley", "Capacidad de dictar leyes"], "Arts. 137 y 140 CE."],
        [S5, "media", "¿Qué órgano municipal resuelve, según la Ley 10/2017, los procedimientos de responsabilidad patrimonial?", ["El Gobierno de Zaragoza", "El Pleno", "La Junta de Portavoces", "El Consejo Jurídico Municipal"], "Art. 14.1.t) Ley 10/2017."],
        [S2, "dificil", "¿En qué caso no habría responsabilidad aunque hubiera daño?", ["Fuerza mayor", "Que la vecina no esté empadronada", "Que el servicio lo preste personal laboral", "Que la acera sea antigua"], "Art. 106.2 CE."],
      ],
    },
    {
      slug: "nuevo-vecino-empadronamiento",
      titulo: "El nuevo vecino que quiere saber cómo funciona su ciudad",
      supuesto: "Un ciudadano español que acaba de mudarse desde Madrid a Zaragoza y se ha empadronado pregunta, mientras arreglas un enchufe en la Junta de Distrito, qué significa ahora ser aragonés, quién gobierna su nueva ciudad y qué relación hay entre el Ayuntamiento y el Gobierno de Aragón.",
      preguntas: [
        [S4, "media", "Por estar empadronado en Zaragoza y ser español, el vecino:", ["Adquiere la condición política de aragonés", "Debe esperar diez años para ser aragonés", "Solo es aragonés si nació en Aragón", "Pierde la nacionalidad madrileña"], "Art. 4.1 EAAr."],
        [S4, "dificil", "¿Se le aplica automáticamente el Derecho foral aragonés?", ["No: el Derecho foral se aplica a quienes tienen vecindad civil aragonesa, que no se adquiere solo por empadronarse", "Sí, desde el primer día de empadronamiento", "Sí, pero solo en materia de tráfico", "No existe Derecho foral en Aragón"], "Art. 9.2 EAAr."],
        [S5, "facil", "¿Quién gobierna y administra el municipio de Zaragoza?", ["Su Ayuntamiento, integrado por el Alcalde y los Concejales", "El Gobierno de Aragón", "La Diputación Provincial", "La Delegación del Gobierno"], "Art. 7.2 Ley 10/2017."],
        [S5, "media", "¿Quién nombra y cesa a los miembros del Gobierno de Zaragoza?", ["El Alcalde", "El Pleno", "Los vecinos", "Las Cortes de Aragón"], "Arts. 12.1.e) y 13.2 Ley 10/2017."],
        [S5, "media", "¿Qué órgano aprueba los presupuestos municipales?", ["El Pleno", "El Alcalde", "El Gobierno de Zaragoza", "El Secretario General"], "Art. 11.1.h) Ley 10/2017. El Gobierno de Zaragoza aprueba el proyecto (art. 14.1.b)."],
        [S5, "media", "Según la Ley 10/2017, ¿qué régimen tiene el municipio de Zaragoza?", ["Un régimen especial por ser capital de Aragón", "El mismo que cualquier municipio de menos de 5.000 habitantes", "Un régimen de concejo abierto", "El de una comarca"], "Art. 1 Ley 10/2017."],
        [S3, "media", "El vecino pregunta qué son las provincias. Según la CE son:", ["Entidades locales con personalidad jurídica propia, agrupación de municipios", "Órganos de las Comunidades Autónomas sin personalidad", "Distritos de los Ayuntamientos", "Delegaciones del Gobierno central"], "Art. 141.1 CE."],
        [S3, "media", "¿Qué órgano gobierna la provincia de Zaragoza?", ["La Diputación Provincial", "El Ayuntamiento de Zaragoza", "El Gobierno de Aragón", "El Cabildo"], "Art. 141.2 CE."],
        [S3, "media", "Según el art. 139 CE, al mudarse a Zaragoza el vecino:", ["Tiene los mismos derechos y obligaciones que en cualquier parte del territorio", "Pierde parte de sus derechos", "Necesita autorización para establecerse", "Debe pagar un tributo de entrada"], "Art. 139 CE."],
        [S1, "media", "Pregunta qué lengua es oficial en todo el Estado:", ["El castellano", "El aragonés", "El catalán", "Ninguna"], "Art. 3.1 CE."],
      ],
    },
  ],
});
