/**
 * Crea tema-359 — Tema 32 de Policía Local: "Ley Orgánica de Fuerzas y
 * Cuerpos de Seguridad."
 *
 * Fuente: Ley Orgánica 2/1986, de 13 de marzo, de Fuerzas y Cuerpos de
 * Seguridad (BOE-A-1986-6859, título verificado; vigente según los
 * metadatos de la API de legislación consolidada, última actualización
 * diciembre de 2025), texto consolidado leído íntegro. Los arts. 16 a 28
 * (régimen de la Policía: escalas, representación, Consejo de Policía y
 * régimen disciplinario) figuran como derogados en el texto consolidado
 * (2010 y 2015); se indica sin desarrollar su sustituto. Las referencias
 * al «Gobernador Civil» se reproducen tal cual figuran en la ley.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-359-ley-organica-fuerzas-cuerpos-seguridad.mjs
 */
import { sembrarTema, POLICIA } from "./lib/sembrar-tema.mjs";

const LEY = "https://www.boe.es/buscar/act.php?id=BOE-A-1986-6859";
const a = (ancla) => `${LEY}#${ancla}`;
const S1 = "disposiciones-generales-principios";
const S2 = "disposiciones-estatutarias";
const S3 = "fcs-estado-policia-judicial";
const S4 = "policias-autonomicas-coordinacion";
const S5 = "policias-locales";

await sembrarTema({
  tema: {
    slug: "tema-359",
    titulo: "Ley Orgánica 2/1986, de Fuerzas y Cuerpos de Seguridad",
    descripcion: "La seguridad pública como competencia exclusiva del Estado y participación autonómica y local; Fuerzas y Cuerpos de Seguridad; cooperación recíproca y deber de auxilio; principios básicos de actuación (adecuación al ordenamiento, relaciones con la comunidad, uso de las armas, tratamiento de detenidos, dedicación, secreto y responsabilidad); disposiciones estatutarias comunes; carácter de agentes de la autoridad; jurisdicción; Cuerpo Nacional de Policía y Guardia Civil, funciones y distribución territorial y material; Policía Judicial; Policías de las Comunidades Autónomas y coordinación de las Policías Locales; Consejo de Política de Seguridad y Juntas de Seguridad; Policías Locales: naturaleza, ámbito territorial, funciones y Junta Local de Seguridad.",
    contenido: "Recorre la ley que ordena todos los cuerpos policiales de España: los principios que todo agente debe respetar (proporcionalidad, uso de armas solo ante riesgo racionalmente grave, identificarse al detener…), la prohibición de huelga, la condición de agente de la autoridad, las funciones de Policía Nacional y Guardia Civil, la Policía Judicial, el papel de las comunidades autónomas en la coordinación de las Policías Locales y, con especial detalle, el Título V: las funciones de la Policía Local y la Junta Local de Seguridad.",
    enlaces_boe: [{ url: LEY, titulo: "Ley Orgánica 2/1986, de 13 de marzo, de Fuerzas y Cuerpos de Seguridad (BOE-A-1986-6859)" }],
    indice_estudio: [
      { seccion: S1, titulo: "Título I, Caps. I y II: disposiciones generales y principios básicos de actuación", articulos: "arts. 1-5", url: a("aprimero") },
      { seccion: S2, titulo: "Título I, Cap. III: disposiciones estatutarias comunes", articulos: "arts. 6-8", url: a("asexto") },
      { seccion: S3, titulo: "Título II: Fuerzas y Cuerpos de Seguridad del Estado y Policía Judicial", articulos: "arts. 9-36", url: a("anoveno") },
      { seccion: S4, titulo: "Títulos III y IV: Policías autonómicas, coordinación de Policías Locales y órganos de coordinación", articulos: "arts. 37-50", url: a("atreintaysiete") },
      { seccion: S5, titulo: "Título V: de las Policías Locales", articulos: "arts. 51-54", url: a("acincuentayuno") },
    ],
  },
  vinculo: { oposicion: POLICIA.oposicion, bloqueId: POLICIA.bloqueParte2, numero: 32 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Seguridad pública (art. 1)", "Competencia exclusiva del Estado, cuyo mantenimiento corresponde al Gobierno; participan las comunidades autónomas (según sus Estatutos) y las corporaciones locales (según la LBRL)"],
        ["Fuerzas y Cuerpos de Seguridad (art. 2)", "Las FCS del Estado, los cuerpos de policía de las comunidades autónomas y los cuerpos de policía de las corporaciones locales"],
        ["Principio de relación entre cuerpos (art. 3)", "Cooperación recíproca y coordinación a través de los órganos de la ley"],
        ["Deber de auxilio (art. 4)", "Todos deben prestar a las FCS el auxilio necesario en la investigación y persecución de delitos; la seguridad privada tiene especial obligación de colaborar"],
        ["Adecuación al ordenamiento (art. 5.1)", "Respeto a la Constitución, neutralidad política e imparcialidad, integridad y rechazo de la corrupción, jerarquía y subordinación (sin amparar órdenes manifiestamente delictivas o inconstitucionales) y colaboración con la Justicia"],
        ["Relaciones con la comunidad (art. 5.2)", "Impedir prácticas abusivas o discriminatorias; trato correcto y esmerado e información sobre las causas de su intervención; actuar sin demora ante daño grave, con congruencia, oportunidad y proporcionalidad"],
        ["Uso de las armas (art. 5.2.d)", "Solo ante un riesgo racionalmente grave para su vida, integridad o la de terceros, o grave riesgo para la seguridad ciudadana, conforme a congruencia, oportunidad y proporcionalidad"],
        ["Tratamiento de detenidos (art. 5.3)", "Identificarse al detener, velar por la vida e integridad del detenido, respetar su honor y dignidad y cumplir trámites, plazos y requisitos"],
        ["Dedicación profesional (art. 5.4)", "Intervenir siempre, en cualquier tiempo y lugar, de servicio o no, en defensa de la ley y la seguridad ciudadana"],
        ["Secreto y responsabilidad (art. 5.5-6)", "Riguroso secreto de lo conocido por sus funciones sin obligación de revelar fuentes; responsabilidad personal y directa, sin perjuicio de la patrimonial de la Administración"],
      ],
      preguntas: [
        ["facil", "Según el art. 1 LOFCS, la seguridad pública es competencia…", ["Exclusiva del Estado", "Exclusiva de los municipios", "Compartida a partes iguales con las comunidades autónomas"], "Art. 1.1."],
        ["media", "¿Son Fuerzas y Cuerpos de Seguridad los cuerpos de policía de las corporaciones locales?", ["Sí", "No", "Solo en capitales de provincia"], "Art. 2.c)."],
        ["media", "Según el art. 5.2.d), los agentes solo deben utilizar las armas cuando exista…", ["Un riesgo racionalmente grave para su vida, su integridad o la de terceros, o grave riesgo para la seguridad ciudadana", "Cualquier desobediencia", "Una orden verbal de un superior"], "Art. 5.2.d)."],
        ["media", "Los principios que rigen el uso de los medios a su alcance son…", ["Congruencia, oportunidad y proporcionalidad", "Rapidez, eficacia y economía", "Jerarquía, mérito y capacidad"], "Art. 5.2.c)."],
        ["media", "Al efectuar una detención, los agentes deberán…", ["Identificarse debidamente como tales", "Llevar siempre el arma desenfundada", "Esperar a un superior"], "Art. 5.3.a)."],
        ["dificil", "¿Ampara la obediencia debida una orden que manifiestamente constituya delito?", ["No, en ningún caso", "Sí, si la da un superior", "Sí, si es por escrito"], "Art. 5.1.d)."],
        ["media", "¿Debe un agente intervenir en defensa de la ley estando fuera de servicio?", ["Sí, en cualquier tiempo y lugar", "No", "Solo si va uniformado"], "Art. 5.4."],
        ["media", "¿Tienen las personas que ejercen funciones de seguridad privada especial obligación de colaborar con las FCS?", ["Sí", "No", "Solo si se les paga"], "Art. 4.2."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Promoción profesional (art. 6.1)", "Conforme a objetividad, igualdad de oportunidades, mérito y capacidad"],
        ["Formación (art. 6.2)", "Profesional y permanente, adecuada a los principios del art. 5, con colaboración de la Universidad, el Poder Judicial, el Ministerio Fiscal y las Fuerzas Armadas"],
        ["Juramento (art. 6.3)", "Deben jurar o prometer acatamiento a la Constitución"],
        ["Incompatibilidad (art. 6.7)", "La pertenencia a las FCS es incompatible con cualquier otra actividad pública o privada, salvo las exceptuadas por la legislación de incompatibilidades"],
        ["Huelga (art. 6.8)", "No pueden ejercer en ningún caso el derecho de huelga ni acciones sustitutivas o concertadas para alterar los servicios"],
        ["Agentes de la autoridad (art. 7.1)", "En el ejercicio de sus funciones tienen a todos los efectos legales el carácter de agentes de la autoridad"],
        ["Consideración de autoridad (art. 7.2)", "Cuando se comete atentado contra ellos con armas de fuego, explosivos u otros medios de análoga peligrosidad, a efectos de su protección penal"],
        ["Jurisdicción (art. 8.1)", "La ordinaria conoce de los delitos contra miembros de las FCS y de los cometidos por ellos en el ejercicio de sus funciones; con indicios contra agentes, la instrucción pasa a la Audiencia Provincial"],
        ["Prisión de los agentes (art. 8.2)", "En establecimientos penitenciarios ordinarios, separados del resto de detenidos o presos"],
        ["Expediente disciplinario y proceso penal (art. 8.3)", "Pueden tramitarse a la vez, pero la resolución definitiva del expediente espera a la sentencia firme, cuyos hechos probados vinculan a la Administración"],
      ],
      preguntas: [
        ["facil", "¿Pueden los miembros de las FCS ejercer el derecho de huelga?", ["No, en ningún caso", "Sí, con servicios mínimos", "Solo los policías locales"], "Art. 6.8."],
        ["media", "En el ejercicio de sus funciones, los miembros de las FCS tienen el carácter de…", ["Agentes de la autoridad", "Autoridad", "Funcionarios sin carácter especial"], "Art. 7.1."],
        ["dificil", "¿Cuándo tienen los agentes la consideración de autoridad a efectos de su protección penal?", ["Cuando se comete atentado con armas de fuego, explosivos u otros medios de análoga peligrosidad", "Siempre", "Nunca"], "Art. 7.2."],
        ["media", "Si el juez de instrucción aprecia indicios de criminalidad contra un agente por actos en el ejercicio de sus funciones…", ["Remite las actuaciones a la Audiencia Provincial", "Archiva", "Lo remite a la jurisdicción militar"], "Art. 8.1."],
        ["media", "¿Puede tramitarse un expediente disciplinario por los mismos hechos de un proceso penal en curso?", ["Sí, aunque su resolución definitiva espera a la sentencia firme", "No, nunca", "Sí, y se resuelve antes"], "Art. 8.3."],
        ["media", "Los miembros de las FCS deben jurar o prometer acatamiento a…", ["La Constitución", "El Reglamento del Cuerpo", "El alcalde"], "Art. 6.3."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["FCS del Estado (art. 9)", "El Cuerpo Nacional de Policía (instituto armado de naturaleza civil, dependiente del Ministro del Interior) y la Guardia Civil (instituto armado de naturaleza militar)"],
        ["Mando (art. 10)", "Ministro del Interior y, bajo su autoridad, el Director de la Seguridad del Estado; en cada provincia, el Gobernador Civil (según el texto de la ley)"],
        ["Funciones comunes (art. 11.1)", "Velar por las leyes, auxiliar y proteger a personas y bienes, vigilar edificios públicos, proteger altas personalidades, mantener el orden y la seguridad ciudadana, prevenir e investigar delitos, inteligencia y colaborar con protección civil"],
        ["Distribución territorial (art. 11.2)", "Policía Nacional: capitales de provincia y términos y núcleos urbanos que el Gobierno determine. Guardia Civil: resto del territorio y mar territorial"],
        ["Competencias de la Policía Nacional (art. 12.A)", "DNI y pasaportes, control de fronteras, extranjería y asilo, juego, drogas, cooperación policial internacional y control de la seguridad privada"],
        ["Competencias de la Guardia Civil (art. 12.B)", "Armas y explosivos, resguardo fiscal y contrabando, tráfico interurbano, custodia de vías, costas, fronteras, puertos y aeropuertos, naturaleza y medio ambiente, y conducción interurbana de presos"],
        ["Policía Judicial (art. 29)", "La ejercen las FCS del Estado a través de sus unidades; el personal de las policías autonómicas y locales tiene carácter colaborador"],
        ["Dependencia de la Policía Judicial (art. 31.1)", "Orgánica del Ministerio del Interior y funcional de los jueces, tribunales o fiscales que conocen del asunto"],
        ["Inamovilidad en la investigación (art. 34.1)", "No pueden ser apartados de la investigación encomendada hasta que finalice, salvo decisión o autorización del juez o fiscal"],
        ["Comisionados (art. 34.2)", "En las diligencias que practican por encargo judicial o fiscal son comisionados de jueces y fiscales y pueden requerir el auxilio de autoridades y particulares"],
      ],
      preguntas: [
        ["media", "El Cuerpo Nacional de Policía es un instituto armado de naturaleza…", ["Civil", "Militar", "Mixta"], "Art. 9.a)."],
        ["media", "¿A qué cuerpo corresponden las competencias derivadas de la legislación sobre armas y explosivos?", ["A la Guardia Civil", "A la Policía Nacional", "A las Policías Locales"], "Art. 12.B.a)."],
        ["media", "La expedición del DNI corresponde a…", ["El Cuerpo Nacional de Policía", "La Guardia Civil", "Los ayuntamientos"], "Art. 12.A.a)."],
        ["media", "La vigilancia del tráfico en las vías públicas interurbanas corresponde a…", ["La Guardia Civil", "La Policía Nacional", "La Policía Local"], "Art. 12.B.c)."],
        ["media", "El personal de las Policías Locales, en funciones de policía judicial, tiene carácter…", ["Colaborador de las FCS del Estado", "Exclusivo", "Ninguno"], "Art. 29.2."],
        ["dificil", "Los funcionarios de las unidades de Policía Judicial dependen funcionalmente de…", ["Los jueces, tribunales o fiscales que conocen del asunto", "El alcalde", "El Ministro de Defensa"], "Art. 31.1."],
        ["media", "La Policía Nacional ejerce sus funciones territorialmente en…", ["Las capitales de provincia y los términos y núcleos urbanos que el Gobierno determine", "Todo el territorio rural", "Solo en Madrid"], "Art. 11.2.a)."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Creación de policías autonómicas (art. 37)", "Las comunidades cuyos Estatutos lo prevean pueden crear cuerpos de policía para las funciones del art. 148.1.22 CE; las demás pueden ejercerlas por adscripción de unidades del CNP o convenios"],
        ["Naturaleza de las policías autonómicas (art. 41.2)", "Institutos armados de naturaleza civil, con estructura jerarquizada; la licencia de armas la otorga el Gobierno de la Nación"],
        ["Coordinación de las Policías Locales por las CCAA (art. 39)", "Normas-marco de los reglamentos de Policías Locales, homogeneización de medios, uniformes y retribuciones, criterios de selección, formación, promoción y movilidad (nivel mínimo de graduado escolar) y escuelas de formación"],
        ["Adscripción de unidades del CNP (art. 47)", "Unidades operativas completas, con dependencia funcional de la comunidad y orgánica del Ministerio del Interior, bajo el mando de sus jefes naturales"],
        ["Consejo de Política de Seguridad (art. 48)", "Presidido por el Ministro del Interior, con los consejeros autonómicos y un número igual de representantes del Estado; aprueba planes de coordinación y directivas"],
        ["Comité de Expertos (art. 49)", "Ocho representantes (cuatro del Estado y cuatro de las CCAA) que asesoran técnicamente al Consejo"],
        ["Junta de Seguridad autonómica (art. 50)", "En comunidades con policía propia, coordina a las FCS del Estado y a la policía autonómica"],
      ],
      preguntas: [
        ["media", "¿Qué hacen las comunidades autónomas respecto de las Policías Locales según el art. 39 LOFCS?", ["Coordinar su actuación (normas-marco, homogeneización, selección y formación)", "Mandarlas directamente", "Nada"], "Art. 39."],
        ["dificil", "El nivel educativo mínimo exigible para cualquier categoría de Policía Local según el art. 39.c) es…", ["Graduado escolar", "Licenciatura", "Ninguno"], "Art. 39.c)."],
        ["media", "¿Quién preside el Consejo de Política de Seguridad?", ["El Ministro del Interior", "El Presidente del Gobierno", "Un consejero autonómico rotatorio"], "Art. 48.1."],
        ["media", "Las unidades del CNP adscritas a una comunidad autónoma dependen funcionalmente de…", ["Las autoridades de la comunidad autónoma", "El Ministerio de Defensa", "Los ayuntamientos"], "Art. 47."],
        ["media", "¿Quién otorga la licencia de armas a los policías autonómicos?", ["El Gobierno de la Nación", "La comunidad autónoma", "El jefe del cuerpo"], "Art. 41.4."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["Creación de Policías Locales (art. 51.1)", "Los municipios pueden crear cuerpos de policía propios conforme a la LOFCS, la LBRL y la legislación autonómica"],
        ["Municipios sin policía (art. 51.2)", "Sus cometidos los ejercen guardas, vigilantes, agentes, alguaciles o análogos"],
        ["Ámbito territorial (art. 51.3)", "Solo en su municipio, salvo emergencias y previo requerimiento; para proteger a autoridades locales pueden salir con autorización del Ministerio del Interior o de la comunidad con policía propia"],
        ["Naturaleza (art. 52.1)", "Institutos armados de naturaleza civil, con estructura y organización jerarquizada"],
        ["Uniforme (art. 52.3)", "Deben vestir el uniforme reglamentario, salvo casos excepcionales que autorice el Gobernador Civil (según el texto)"],
        ["Funciones (art. 53.1) I", "a) proteger a las autoridades locales y vigilar sus edificios; b) ordenar, señalizar y dirigir el tráfico en el casco urbano; c) instruir atestados por accidentes de circulación en el casco urbano; d) policía administrativa de ordenanzas y bandos"],
        ["Funciones (art. 53.1) II", "e) participar en la policía judicial (art. 29.2); f) auxilio en accidentes, catástrofes y protección civil; g) diligencias de prevención; h) vigilar espacios públicos y colaborar en manifestaciones y grandes concentraciones si se les requiere; i) cooperar en conflictos privados si se les requiere"],
        ["Comunicación obligatoria (art. 53.2)", "Las actuaciones de los apartados c) (atestados de tráfico) y g) (prevención) deben comunicarse a las FCS del Estado competentes"],
        ["Agentes de movilidad (art. 53.3)", "En municipios de gran población, el Pleno puede asignar funcionarios al ejercicio exclusivo de la ordenación del tráfico, como agentes de la autoridad subordinados a la Policía Local, sin integrarse en las FCS"],
        ["Junta Local de Seguridad (art. 54)", "Órgano para establecer la colaboración entre las FCS en el municipio; la preside el alcalde, compartida con la autoridad gubernativa del Estado si asiste"],
      ],
      preguntas: [
        ["facil", "Los Cuerpos de Policía Local son institutos armados de naturaleza…", ["Civil", "Militar", "Paramilitar"], "Art. 52.1."],
        ["media", "¿Es función de la Policía Local instruir atestados por accidentes de circulación dentro del casco urbano?", ["Sí", "No, corresponde siempre a la Guardia Civil", "Solo si hay heridos"], "Art. 53.1.c)."],
        ["media", "Fuera de su término municipal, la Policía Local puede actuar…", ["En situaciones de emergencia y previo requerimiento de las autoridades competentes", "Siempre", "Nunca"], "Art. 51.3."],
        ["media", "¿Qué actuaciones de la Policía Local deben comunicarse a las FCS del Estado?", ["Los atestados por accidentes y las diligencias de prevención", "Todas las multas", "Ninguna"], "Art. 53.2."],
        ["media", "¿Quién preside la Junta Local de Seguridad?", ["El alcalde (compartida con la autoridad gubernativa estatal si asiste)", "El jefe de la Policía Local", "El Delegado del Gobierno siempre"], "Art. 54.2."],
        ["dificil", "En los municipios de gran población, los funcionarios asignados en exclusiva a la ordenación del tráfico…", ["Son agentes de la autoridad subordinados a la Policía Local, sin integrarse en las FCS", "Forman parte de las FCS", "Son vigilantes privados"], "Art. 53.3."],
        ["media", "¿Es función de la Policía Local proteger a las autoridades de las corporaciones locales?", ["Sí", "No", "Solo en elecciones"], "Art. 53.1.a)."],
        ["media", "La policía administrativa que ejerce la Policía Local se refiere a…", ["Las ordenanzas, bandos y demás disposiciones municipales", "Las leyes de extranjería", "El control de fronteras"], "Art. 53.1.d)."],
      ],
    },
  ],
  glosario: [
    [S1, "Seguridad pública", "Actividad dirigida a la protección de personas y bienes y al mantenimiento de la tranquilidad ciudadana; competencia exclusiva del Estado (art. 149.1.29.ª CE y art. 1 LOFCS)."],
    [S1, "Proporcionalidad", "Adecuación del medio empleado a la gravedad de la situación; principio del art. 5.2.c)."],
    [S2, "Agente de la autoridad", "Condición de los miembros de las FCS en el ejercicio de sus funciones (art. 7.1)."],
    [S3, "Policía Judicial", "Función de averiguación del delito y aseguramiento del delincuente bajo dependencia funcional de jueces y fiscales (art. 126 CE)."],
    [S4, "Normas-marco", "Normas autonómicas a las que se ajustan los reglamentos de las Policías Locales (art. 39.a)."],
    [S4, "Consejo de Política de Seguridad", "Órgano de coordinación entre el Estado y las comunidades autónomas en seguridad pública."],
    [S5, "Junta Local de Seguridad", "Órgano de colaboración entre las FCS en el municipio, presidido por el alcalde."],
    [S5, "Agente de movilidad", "Funcionario municipal dedicado en exclusiva a ordenar el tráfico, sin integrarse en las FCS (art. 53.3)."],
  ],
  casos: [
    {
      slug: "caso-agente-franco-servicio-robo",
      titulo: "Un agente franco de servicio",
      supuesto: "Un policía local de Zaragoza, de paseo y fuera de servicio, presencia un robo con violencia a una anciana. Interviene, se identifica como agente y detiene al autor, que se resiste. Después le informa de los motivos de la detención y lo entrega a la patrulla que llega.",
      preguntas: [
        [S1, "media", "¿Debía intervenir aunque estuviera fuera de servicio?", ["Sí, el deber de intervenir existe en cualquier tiempo y lugar", "No", "Solo si llevaba el arma"], "Art. 5.4."],
        [S1, "media", "Al detener, debía…", ["Identificarse debidamente como agente", "Esperar a la patrulla sin intervenir", "Pedir permiso al jefe"], "Art. 5.3.a)."],
        [S1, "media", "Respecto del detenido, debía velar por…", ["Su vida e integridad física y respetar su honor y dignidad", "Nada en especial", "Su patrimonio exclusivamente"], "Art. 5.3.b)."],
        [S1, "media", "Si hubiera tenido que usar la fuerza, debía regirse por los principios de…", ["Congruencia, oportunidad y proporcionalidad", "Rapidez y eficacia", "Jerarquía"], "Art. 5.2.c)."],
        [S2, "media", "En el ejercicio de sus funciones, el agente tiene el carácter de…", ["Agente de la autoridad", "Autoridad", "Particular"], "Art. 7.1."],
        [S1, "dificil", "¿Podía utilizar su arma reglamentaria si el ladrón solo forcejeaba sin poner en riesgo grave su vida o la de otros?", ["No, solo ante riesgo racionalmente grave", "Sí, siempre", "Sí, para intimidar"], "Art. 5.2.d)."],
        [S5, "media", "La Policía Local de Zaragoza actúa, con carácter general, en…", ["El término municipal de Zaragoza", "Toda la provincia", "Todo Aragón"], "Art. 51.3."],
        [S3, "media", "Al participar en funciones de policía judicial, la Policía Local tiene carácter…", ["Colaborador de las FCS del Estado", "Exclusivo", "Militar"], "Art. 29.2."],
        [S1, "media", "Debe informar a los ciudadanos de las causas y finalidad de su intervención…", ["De forma cumplida y tan amplia como sea posible", "Nunca", "Solo por escrito"], "Art. 5.2.b)."],
        [S2, "dificil", "Si el ladrón le hubiera atacado con un arma de fuego, a efectos de su protección penal el agente tendría la consideración de…", ["Autoridad", "Agente de la autoridad solamente", "Particular"], "Art. 7.2."],
      ],
    },
    {
      slug: "caso-junta-local-seguridad-fiestas",
      titulo: "La Junta Local de Seguridad ante las Fiestas del Pilar",
      supuesto: "Ante las Fiestas del Pilar, el alcalde convoca la Junta Local de Seguridad para coordinar a la Policía Local, la Policía Nacional y la Guardia Civil. Se prevén conciertos multitudinarios, cortes de tráfico en el centro y una manifestación comunicada.",
      preguntas: [
        [S5, "media", "¿Qué órgano establece las formas de colaboración entre las FCS en el municipio?", ["La Junta Local de Seguridad", "El Consejo de Política de Seguridad", "La Junta de Seguridad autonómica"], "Art. 54.1."],
        [S5, "media", "¿Quién preside la Junta Local de Seguridad?", ["El alcalde", "El jefe de la Policía Nacional", "El Ministro del Interior"], "Art. 54.2."],
        [S5, "media", "Ordenar y dirigir el tráfico en el casco urbano durante las fiestas corresponde a…", ["La Policía Local", "La Guardia Civil", "El Ejército"], "Art. 53.1.b)."],
        [S5, "media", "En la protección de la manifestación y de las grandes concentraciones, la Policía Local…", ["Colabora con las FCS del Estado cuando se le requiere", "Actúa en exclusiva", "No interviene"], "Art. 53.1.h)."],
        [S3, "media", "En Zaragoza, capital de provincia, las funciones de seguridad ciudadana del Estado corresponden territorialmente a…", ["El Cuerpo Nacional de Policía", "La Guardia Civil", "La Policía Local en exclusiva"], "Art. 11.2.a)."],
        [S3, "media", "Si se detecta tráfico de drogas en los conciertos, la investigación de estos delitos corresponde materialmente a…", ["El Cuerpo Nacional de Policía", "La Guardia Civil", "Los vigilantes privados"], "Art. 12.A.e)."],
        [S1, "media", "Los vigilantes de seguridad privada de los conciertos tienen…", ["Especial obligación de colaborar con las FCS", "Ninguna obligación", "Mando sobre la Policía Local"], "Art. 4.2."],
        [S5, "media", "El auxilio en caso de accidente o catástrofe durante las fiestas, dentro de los planes de protección civil, es función…", ["De la Policía Local, participando conforme a las leyes", "Solo de los bomberos", "De nadie"], "Art. 53.1.f)."],
        [S1, "media", "Las FCS deben ajustar su actuación al principio de…", ["Cooperación recíproca", "Competencia libre", "Independencia total"], "Art. 3."],
        [S5, "dificil", "Las diligencias de prevención de la Policía Local se realizan en el marco de colaboración establecido en…", ["Las Juntas de Seguridad, y deben comunicarse a las FCS del Estado", "El Pleno municipal", "Los juzgados"], "Art. 53.1.g) y 53.2."],
      ],
    },
    {
      slug: "caso-orden-superior-ilegal",
      titulo: "Una orden que no debe cumplirse",
      supuesto: "Un mando ordena a dos agentes que retengan en la comisaría, sin motivo legal, a un vecino que se ha quejado públicamente de la actuación policial. Uno de los agentes se niega. Más tarde, el vecino denuncia y se abre un proceso penal contra el mando.",
      preguntas: [
        [S1, "media", "¿Ampara la obediencia debida la ejecución de una orden manifiestamente delictiva?", ["No", "Sí", "Solo si es por escrito"], "Art. 5.1.d)."],
        [S1, "media", "Retener al vecino por sus críticas vulneraría el principio de…", ["Neutralidad política e imparcialidad, sin discriminación", "Dedicación", "Secreto"], "Art. 5.1.b)."],
        [S1, "media", "Los agentes son responsables personal y directamente de sus actos ilegales…", ["Sin perjuicio de la responsabilidad patrimonial de la Administración", "Solo si lo decide el alcalde", "Nunca"], "Art. 5.6."],
        [S2, "media", "¿Qué jurisdicción conocerá del delito cometido por el mando en el ejercicio de sus funciones?", ["La ordinaria", "La militar", "La administrativa"], "Art. 8.1."],
        [S2, "dificil", "Si el juez de instrucción aprecia indicios racionales de criminalidad contra el mando…", ["Remitirá las actuaciones a la Audiencia Provincial", "Seguirá instruyendo hasta el final", "Archivará"], "Art. 8.1, párrafo segundo."],
        [S2, "media", "¿Puede abrirse a la vez un expediente disciplinario al mando?", ["Sí, pero su resolución definitiva espera a la sentencia penal firme", "No", "Sí, y se resuelve antes"], "Art. 8.3."],
        [S2, "media", "Los hechos declarados probados en la sentencia penal…", ["Vinculan a la Administración en el expediente", "No tienen efecto", "Solo orientan"], "Art. 8.3."],
        [S2, "media", "Si el mando ingresara en prisión preventiva, lo haría…", ["En un establecimiento ordinario, separado del resto de presos", "En un cuartel", "En su domicilio"], "Art. 8.2."],
        [S1, "media", "Los agentes deben actuar con integridad y dignidad, absteniéndose de…", ["Todo acto de corrupción y oponiéndose a él", "Hablar con la prensa", "Usar uniforme"], "Art. 5.1.c)."],
        [S1, "media", "Deben impedir cualquier práctica abusiva, arbitraria o discriminatoria que entrañe…", ["Violencia física o moral", "Gastos", "Retrasos"], "Art. 5.2.a)."],
      ],
    },
  ],
});
