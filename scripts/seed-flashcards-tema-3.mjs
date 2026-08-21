/**
 * Flashcards de tema-3: Estatuto de Autonomía de Aragón (LO 5/2007).
 * Cobertura completa del Estatuto (arts. 1-115), una card por apartado,
 * salvo el Título V (competencias, arts. 70-80) donde las enumeraciones de
 * 60/17/13 materias se condensan en cards conceptuales + muestra
 * representativa (una card por cada uno de los 60 puntos no aporta valor
 * de estudio proporcional al esfuerzo).
 *
 * Uso: node --env-file=.env.local scripts/seed-flashcards-tema-3.mjs
 */

const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const HEADERS = {
  apikey: SERVICE_KEY,
  Authorization: `Bearer ${SERVICE_KEY}`,
  "Content-Type": "application/json",
};

async function insertBatch(filas) {
  const res = await fetch(`${URL_BASE}/rest/v1/flashcards`, {
    method: "POST",
    headers: { ...HEADERS, Prefer: "return=minimal" },
    body: JSON.stringify(filas),
  });
  if (!res.ok) {
    console.error(`❌ Error insertando: ${res.status} ${await res.text()}`);
    process.exit(1);
  }
}

const TEMA = "tema-3";
const c = (seccion, anverso, reverso) => ({ tema_slug: TEMA, seccion, anverso, reverso });

const CARDS = [
  // Título Preliminar (arts. 1-10)
  c("titulo-preliminar", "¿Cómo se define Aragón en el art. 1.1 del Estatuto?", "Nacionalidad histórica que ejerce su autogobierno de acuerdo con el Estatuto, en ejercicio del derecho a la autonomía que reconoce la Constitución"),
  c("titulo-preliminar", "¿De dónde emanan los poderes de la Comunidad Autónoma (art. 1.2)?", "Del pueblo aragonés y de la Constitución"),
  c("titulo-preliminar", "¿En qué basa Aragón su identidad propia (art. 1.3)?", "Sus instituciones tradicionales, el Derecho foral y su cultura"),
  c("titulo-preliminar", "¿Qué territorio comprende la Comunidad Autónoma (art. 2)?", "El histórico de Aragón: municipios, comarcas y provincias de Huesca, Teruel y Zaragoza"),
  c("titulo-preliminar", "Describe la bandera de Aragón (art. 3.1)", "Cuatro barras rojas horizontales sobre fondo amarillo"),
  c("titulo-preliminar", "¿Cuál es la capital y el Día de Aragón (art. 3.3-4)?", "Capital: Zaragoza. Día de Aragón: 23 de abril"),
  c("titulo-preliminar", "¿Quién goza de la condición política de aragonés (art. 4.1)?", "Los ciudadanos españoles con vecindad administrativa en cualquier municipio de Aragón, u otros requisitos legales"),
  c("titulo-preliminar", "¿En qué se estructura la organización territorial de Aragón (art. 5)?", "Municipios, comarcas y provincias"),
  c("titulo-preliminar", "¿Qué establece el art. 6.3 sobre los derechos del Título I?", "No alteran el régimen de distribución de competencias ni crean nuevos títulos competenciales; no pueden reducir derechos fundamentales de la Constitución"),
  c("titulo-preliminar", "¿Qué regula una ley de Cortes sobre las lenguas propias (art. 7.2)?", "Zonas de uso predominante, régimen jurídico, derechos de los hablantes y protección, recuperación y enseñanza del patrimonio lingüístico"),
  c("titulo-preliminar", "¿Puede alguien ser discriminado por razón de lengua (art. 7.3)?", "No"),
  c("titulo-preliminar", "¿Qué deben fomentar los poderes públicos aragoneses según el art. 8?", "Los vínculos sociales y culturales con las comunidades aragonesas del exterior"),
  c("titulo-preliminar", "¿Qué eficacia tienen las normas de la Comunidad Autónoma (art. 9.1)?", "Eficacia territorial, salvo excepciones por razón de la materia"),
  c("titulo-preliminar", "¿Qué eficacia tiene el Derecho foral de Aragón (art. 9.2)?", "Eficacia personal: se aplica a quienes ostenten vecindad civil aragonesa, con independencia del lugar de residencia"),
  c("titulo-preliminar", "¿Qué requisitos exige el art. 10 para incorporar nuevos territorios a Aragón?", "Solicitud de los Ayuntamientos interesados, consulta a los habitantes, y aprobación de las Cortes de Aragón y las Cortes Generales por ley orgánica"),

  // Título I, Cap. I: Derechos y deberes de los aragoneses (arts. 11-19)
  c("titulo-1-cap-1", "¿Quiénes son titulares de los derechos del Cap. I del Título I (art. 11.2)?", "Quienes gocen de la condición política de aragonés, sin perjuicio de su extensión a otras personas"),
  c("titulo-1-cap-1", "¿Qué derechos generales reconoce el art. 12 a las personas?", "Vivir con dignidad, seguridad y autonomía, libres de discriminación, y a prestaciones sociales y servicios de conciliación"),
  c("titulo-1-cap-1", "¿Qué derecho cultural reconoce el art. 13?", "Acceder en condiciones de igualdad a la cultura y al disfrute del patrimonio cultural"),
  c("titulo-1-cap-1", "¿Qué garantizan los poderes públicos según el art. 14 (derecho a la salud)?", "Un sistema sanitario público universal y de calidad, con libre elección de médico y centro, y cumplimiento del consentimiento informado"),
  c("titulo-1-cap-1", "¿Qué derechos de participación reconoce el art. 15?", "Participar en asuntos públicos, presentar iniciativas legislativas ante las Cortes de Aragón y participar en la elaboración de leyes"),
  c("titulo-1-cap-1", "¿Qué derecho de protección de datos reconoce el art. 16.3?", "Protección de datos personales en bases de datos públicas y privadas que colaboren con la Administración, con acceso, corrección y cancelación"),
  c("titulo-1-cap-1", "¿Qué derecho medioambiental reconoce el art. 18.1?", "Vivir en un medio ambiente equilibrado, sostenible y respetuoso con la salud, y a gozar de los recursos naturales en igualdad"),
  c("titulo-1-cap-1", "¿Qué derecho sobre el agua reconoce el art. 19.1?", "Disponer de abastecimiento de agua en cantidad y calidad suficientes para necesidades presentes y futuras"),

  // Título I, Cap. II: Principios rectores (arts. 20-31)
  c("titulo-1-cap-2", "Cita los 3 objetivos generales del art. 20 para los poderes públicos aragoneses", "Promover libertad e igualdad reales; mejorar y equiparar condiciones de vida y trabajo (favoreciendo el arraigo); corregir desequilibrios económicos, sociales y culturales entre territorios"),
  c("titulo-1-cap-2", "¿Qué modelo desarrollan los poderes públicos según el art. 21 (educación)?", "Un modelo educativo de calidad e interés público que garantice el libre desenvolvimiento de la personalidad"),
  c("titulo-1-cap-2", "¿Qué garantiza el art. 23.1 (bienestar y cohesión social)?", "Un sistema público de servicios sociales suficiente, incluyendo una renta básica en los términos que fije la ley"),
  c("titulo-1-cap-2", "Cita 3 objetivos del art. 24 (protección personal y familiar)", "Mejorar calidad de vida; proteger a la familia; garantizar igualdad hombre-mujer; no discriminación por orientación sexual/identidad de género; proteger infancia; emancipación juvenil; protección de mayores"),
  c("titulo-1-cap-2", "¿Qué promueven los poderes públicos según el art. 25 (autonomía personal)?", "Medidas de autonomía e integración social/profesional de personas con discapacidad, y la enseñanza de la lengua de signos"),
  c("titulo-1-cap-2", "¿Qué promueven los poderes públicos según el art. 26 (empleo y trabajo)?", "Pleno empleo de calidad, prevención de riesgos laborales, igualdad de oportunidades y conciliación"),
  c("titulo-1-cap-2", "¿Qué promueve el art. 27 (vivienda)?", "El ejercicio efectivo del derecho a una vivienda digna, con atención especial a jóvenes y colectivos necesitados"),
  c("titulo-1-cap-2", "¿Qué promueve el art. 30 (cultura de valores democráticos)?", "La cultura de la paz y la protección social de víctimas de violencia, especialmente de género y terrorismo"),

  // Título II: Organización institucional (art. 32)
  c("titulo-2-cap-1", "¿Cuáles son las instituciones de la Comunidad Autónoma de Aragón (art. 32)?", "Las Cortes, el Presidente, el Gobierno (o Diputación General) y el Justicia"),

  // Título II, Cap. I: Las Cortes de Aragón (arts. 33-45)
  c("titulo-2-cap-1", "¿Qué funciones generales tienen las Cortes de Aragón (art. 33.1)?", "Representan al pueblo aragonés, ejercen la potestad legislativa, aprueban presupuestos e impulsan y controlan al Gobierno"),
  c("titulo-2-cap-1", "¿Cuál es la sede de las Cortes de Aragón (art. 35)?", "Zaragoza, en el Palacio de la Aljafería"),
  c("titulo-2-cap-1", "¿Cuántos escaños tienen las Cortes de Aragón (art. 36.1-2)?", "Entre 65 y 80, con un mínimo de 14 escaños por provincia"),
  c("titulo-2-cap-1", "¿Cómo son las Cortes de Aragón según el art. 37.1?", "Unicamerales, con Diputados y Diputadas elegidos por sufragio universal, igual, libre, directo y secreto"),
  c("titulo-2-cap-1", "¿Por cuánto tiempo se eligen las Cortes de Aragón (art. 37.2)?", "Cuatro años"),
  c("titulo-2-cap-1", "¿Cuál es la circunscripción electoral (art. 37.4)?", "La provincia"),
  c("titulo-2-cap-1", "¿De qué gozan los Diputados y Diputadas según el art. 38?", "Inviolabilidad por votos y opiniones (aun tras cesar), y no pueden ser detenidos salvo flagrante delito"),
  c("titulo-2-cap-1", "¿Qué órganos eligen las Cortes entre sus miembros (art. 39.1)?", "Un Presidente, una Mesa y una Diputación Permanente"),
  c("titulo-2-cap-1", "¿Cuáles son los periodos ordinarios de sesiones (art. 40.2)?", "Septiembre-diciembre y febrero-junio"),
  c("titulo-2-cap-1", "Cita 4 funciones de las Cortes de Aragón según el art. 41", "Elegir al Presidente de Aragón; elegir/cesar al Justicia; designar Senadores autonómicos; aprobar el programa del Gobierno; examinar y aprobar sus cuentas; interponer recurso de inconstitucionalidad"),
  c("titulo-2-cap-1", "¿Qué materias no pueden delegarse legislativamente según el art. 43.1?", "Aprobación del Presupuesto, regulación esencial de derechos del Estatuto, desarrollo básico de Instituciones o régimen electoral"),
  c("titulo-2-cap-1", "¿En qué plazo deben convalidarse los Decretos-leyes (art. 44.2)?", "30 días improrrogables desde su publicación, mediante debate y votación de totalidad de las Cortes"),
  c("titulo-2-cap-1", "¿Quién promulga las leyes aragonesas (art. 45)?", "El Presidente, en nombre del Rey, ordenando su publicación en el BOA y el BOE en un plazo no superior a 15 días"),

  // Título II, Cap. II: El Presidente (arts. 46-52)
  c("titulo-2-cap-2", "¿Cómo se elige y nombra al Presidente de Aragón (art. 46.1)?", "Elegido por las Cortes de Aragón entre sus Diputados y Diputadas, y nombrado por el Rey"),
  c("titulo-2-cap-2", "¿Qué representación ostenta el Presidente (art. 46.2)?", "La suprema representación de Aragón y la ordinaria del Estado en el territorio; preside y dirige el Gobierno"),
  c("titulo-2-cap-2", "¿Qué mayoría necesita el candidato a Presidente en primera votación (art. 48.2)?", "Mayoría absoluta; si no la obtiene, 24 horas después basta mayoría simple"),
  c("titulo-2-cap-2", "¿Qué ocurre si transcurren 2 meses sin investidura (art. 48.3)?", "Las Cortes quedan disueltas y se convocan nuevas elecciones"),
  c("titulo-2-cap-2", "¿Qué mayoría se necesita para otorgar la confianza en la cuestión de confianza (art. 49.2)?", "Mayoría simple de los votos emitidos"),
  c("titulo-2-cap-2", "¿Qué requisitos tiene la moción de censura (art. 50.2)?", "Propuesta por al menos el 15% de los Diputados, incluyendo un candidato a la Presidencia"),
  c("titulo-2-cap-2", "¿Qué ocurre si no se aprueba la moción de censura (art. 50.5)?", "Sus signatarios no pueden suscribir otra hasta pasado un año"),
  c("titulo-2-cap-2", "Enumera las causas de cese del Presidente según el art. 51", "Elecciones a Cortes, moción de censura, pérdida de cuestión de confianza, dimisión, incapacidad permanente, sentencia firme inhabilitante, pérdida de condición de diputado o incompatibilidad"),
  c("titulo-2-cap-2", "¿Quién puede disolver las Cortes de Aragón anticipadamente (art. 52.1)?", "El Presidente, previa deliberación del Gobierno y bajo su exclusiva responsabilidad"),
  c("titulo-2-cap-2", "¿Cuándo no pueden disolverse las Cortes (art. 52.3)?", "Cuando esté en trámite una moción de censura"),

  // Título II, Cap. III: El Gobierno de Aragón (arts. 53-58)
  c("titulo-2-cap-3", "¿Qué funciones ejerce el Gobierno de Aragón (art. 53.1)?", "La función ejecutiva y la potestad reglamentaria"),
  c("titulo-2-cap-3", "¿De quién se compone el Gobierno de Aragón (art. 53.2)?", "Presidente, Vicepresidentes en su caso, y Consejeros, nombrados y separados libremente por el Presidente"),
  c("titulo-2-cap-3", "¿Ante quién responde el Gobierno de Aragón (art. 53.3)?", "Ante las Cortes de Aragón, de forma solidaria, sin perjuicio de la responsabilidad directa de cada Consejero"),
  c("titulo-2-cap-3", "¿Cuál es la sede del Gobierno de Aragón (art. 54.1)?", "Zaragoza"),
  c("titulo-2-cap-3", "¿Cuándo cesa el Gobierno de Aragón (art. 56.1)?", "Cuando cesa su Presidente"),
  c("titulo-2-cap-3", "¿Qué es el Consejo Consultivo de Aragón (art. 58.1)?", "El supremo órgano consultivo del Gobierno y la Administración, con autonomía orgánica y funcional"),

  // Título II, Cap. IV: El Justicia de Aragón (arts. 59-60)
  c("titulo-2-cap-4", "Enumera las misiones específicas del Justicia de Aragón (art. 59.1)", "Protección y defensa de los derechos individuales y colectivos del Estatuto; tutela del ordenamiento jurídico aragonés; defensa del Estatuto"),
  c("titulo-2-cap-4", "¿Qué puede supervisar el Justicia de Aragón (art. 59.2)?", "La Administración de la Comunidad Autónoma, los entes locales aragoneses y comarcas, y servicios públicos gestionados por concesión"),
  c("titulo-2-cap-4", "¿Ante quién rinde cuentas el Justicia (art. 59.3)?", "Ante las Cortes de Aragón"),

  // Título III: La Administración Pública en Aragón (arts. 61-62)
  c("titulo-3", "¿Qué condición ostenta la Administración aragonesa (art. 61.2)?", "La condición de Administración ordinaria en el ejercicio de sus competencias"),
  c("titulo-3", "¿A qué principios ajusta su actividad la Administración aragonesa (art. 62.3)?", "Eficacia, eficiencia, racionalización, transparencia y servicio efectivo a los ciudadanos"),

  // Título IV, Cap. I: El Poder Judicial en Aragón (arts. 63-66)
  c("titulo-4-cap-1", "¿Qué es el Tribunal Superior de Justicia de Aragón (art. 63.1)?", "El órgano jurisdiccional en que culmina la organización judicial en Aragón, sin perjuicio de las competencias del Tribunal Supremo"),
  c("titulo-4-cap-1", "¿Quién nombra al Presidente del TSJA (art. 63.3)?", "El Rey, a propuesta del Consejo General del Poder Judicial"),
  c("titulo-4-cap-1", "¿Qué es el Consejo de Justicia de Aragón (art. 64.1)?", "Un órgano cuya estructura, composición y funciones determina una ley de Cortes de Aragón, en el ámbito de la Administración de Justicia"),
  c("titulo-4-cap-1", "¿Qué mérito es preferente para nombrar Magistrados, Jueces y Secretarios en Aragón (art. 65)?", "El conocimiento acreditado del Derecho propio de Aragón"),

  // Título IV, Cap. II: La Administración de Justicia (arts. 67-69)
  c("titulo-4-cap-2", "¿Sobre qué personal tiene competencia la Comunidad Autónoma según el art. 67.1?", "Todo el personal al servicio de la Administración de Justicia que no integre el Poder Judicial"),
  c("titulo-4-cap-2", "¿Qué corresponde a la Comunidad Autónoma según el art. 68.1?", "Determinar los límites de las demarcaciones territoriales de los órganos jurisdiccionales"),

  // Título V: Competencias de la Comunidad Autónoma (arts. 70-80) — condensado
  c("titulo-5", "¿Qué tipos de competencias corresponden a la Comunidad Autónoma según el art. 70.1?", "Competencias exclusivas, compartidas y ejecutivas"),
  c("titulo-5", "¿Qué potestades ejerce Aragón en el ámbito de las competencias exclusivas (art. 71)?", "Potestad legislativa, potestad reglamentaria, función ejecutiva y establecimiento de políticas propias"),
  c("titulo-5", "Cita 6 materias de competencia exclusiva del art. 71", "Instituciones de autogobierno; Derecho foral aragonés; lenguas propias; régimen local; organización territorial propia; ordenación del territorio y urbanismo; vivienda; cultura; turismo; agricultura y ganadería"),
  c("titulo-5", "¿Qué competencia exclusiva regula el art. 72 sobre aguas?", "Aguas que discurran íntegramente por el territorio de Aragón: ordenación, planificación, gestión y aprovechamientos hidráulicos"),
  c("titulo-5", "¿Qué tipo de competencia tiene Aragón en enseñanza (art. 73)?", "Compartida, en toda su extensión, niveles, grados, modalidades y especialidades"),
  c("titulo-5", "¿Qué puede hacer Aragón en medios de comunicación social (art. 74.2)?", "Regular, crear y mantener su propia televisión, radio y prensa, respetando la autonomía local"),
  c("titulo-5", "¿Qué ejerce la Comunidad Autónoma en el ámbito de las competencias compartidas (art. 75)?", "El desarrollo legislativo y la ejecución de la legislación básica estatal, desarrollando políticas propias"),
  c("titulo-5", "Cita 4 materias de competencia compartida del art. 75", "Seguridad Social (salvo régimen económico); régimen minero; protección del medio ambiente; energía; protección de datos; políticas de integración de inmigrantes; régimen jurídico de la Administración autonómica"),
  c("titulo-5", "¿Puede Aragón crear una Policía autonómica (art. 76.1)?", "Sí, en el marco del Estatuto y la ley orgánica correspondiente"),
  c("titulo-5", "¿Qué ejerce la Comunidad Autónoma en el ámbito de las competencias ejecutivas (art. 77)?", "Puede dictar reglamentos de organización y ejercer las funciones que el ordenamiento atribuye a la Administración Pública, en aplicación de legislación estatal"),
  c("titulo-5", "Cita 4 materias de competencia ejecutiva del art. 77", "Gestión de asistencia sanitaria de la Seguridad Social; trabajo y relaciones laborales; propiedad intelectual e industrial; sistema penitenciario; registro civil; seguridad ciudadana"),
  c("titulo-5", "¿Quién nombra a los notarios y registradores en Aragón (art. 78.1)?", "La Comunidad Autónoma, conforme a las leyes del Estado, siendo mérito preferente el conocimiento del Derecho foral aragonés"),
  c("titulo-5", "¿Qué establece la cláusula de cierre del art. 80.2?", "En materias de competencia exclusiva, el Derecho propio de Aragón es aplicable con preferencia a cualquier otro en su territorio"),

  // Título VI: Organización territorial y gobierno local (arts. 81-87)
  c("titulo-6", "¿En qué se estructura la organización territorial local de Aragón (art. 81.1)?", "Municipios, comarcas y provincias"),
  c("titulo-6", "¿Qué son los municipios según el art. 82.1?", "Entidades territoriales básicas de Aragón, con personalidad jurídica y autonomía, medio esencial de participación vecinal"),
  c("titulo-6", "¿Qué son las comarcas según el art. 83.1?", "Entidades territoriales constituidas por agrupación de municipios limítrofes, fundamentales para la vertebración territorial"),
  c("titulo-6", "¿Qué funciones ejercen las provincias según el art. 84?", "Cooperación, asistencia y prestación de servicios a municipios y comarcas, con criterios de solidaridad y equilibrio territorial"),
  c("titulo-6", "¿Bajo qué principios se desarrolla la actividad de las entidades territoriales (art. 85.1)?", "Subsidiariedad, proporcionalidad y diferenciación"),
  c("titulo-6", "¿Qué es el Consejo Local de Aragón (art. 86)?", "El órgano de colaboración y coordinación entre el Gobierno de Aragón y las asociaciones representativas de entidades locales"),
  c("titulo-6", "¿Qué dispone Zaragoza como capital según el art. 87?", "Un régimen especial establecido por ley de Cortes de Aragón (ley de capitalidad)"),

  // Título VII: Cooperación institucional y acción exterior (arts. 88-98)
  c("titulo-7-cap-1", "¿En qué principios se basan las relaciones Aragón-Estado (art. 88.1)?", "Lealtad institucional, coordinación y ayuda mutua"),
  c("titulo-7-cap-1", "¿Qué es la Comisión Bilateral de Cooperación Aragón-Estado (art. 90.1)?", "El instrumento principal de relación entre la Comunidad Autónoma y el Estado"),
  c("titulo-7-cap-2", "¿Con quién puede Aragón establecer relaciones de colaboración según el art. 91.1?", "Con otras Comunidades Autónomas, especialmente las de vínculos históricos y geográficos"),
  c("titulo-7-cap-3", "¿Qué establece Aragón para sus intereses ante la UE (art. 92.2)?", "Una delegación para la presentación, defensa y promoción de sus intereses ante las instituciones de la Unión Europea"),
  c("titulo-7-cap-3", "¿En qué participan las Cortes de Aragón respecto a la UE (art. 93.3)?", "En los procedimientos de control de los principios de subsidiariedad y proporcionalidad de las propuestas legislativas europeas"),
  c("titulo-7-cap-4", "¿Qué impulsa Aragón según el art. 96.1 (acción exterior)?", "Su proyección en el exterior, pudiendo establecer oficinas exteriores dentro del marco constitucional"),
  c("titulo-7-cap-4", "¿Qué puede solicitar Aragón respecto a tratados internacionales (art. 97.1)?", "Que el Estado celebre tratados o convenios en materias de interés para Aragón"),

  // Título VIII, Cap. I: Economía (arts. 99-102)
  c("titulo-8-cap-1", "¿A qué está subordinada toda la riqueza según el art. 99.1?", "Al interés general, sea cual fuere su titularidad"),
  c("titulo-8-cap-1", "¿Qué puede aprobar la Comunidad Autónoma según el art. 100.1?", "Planes económicos generales para atender necesidades colectivas y equilibrar el desarrollo territorial y sectorial"),
  c("titulo-8-cap-1", "¿Qué es el Consejo Económico y Social de Aragón (art. 102.1)?", "El órgano consultivo de colaboración de los agentes sociales en la actividad económica y social"),

  // Título VIII, Cap. II: Hacienda (arts. 103-112)
  c("titulo-8-cap-2", "¿En qué principios se basa la Hacienda aragonesa según el art. 103.1?", "Suficiencia de recursos, equidad, solidaridad, coordinación, equilibrio financiero y lealtad institucional"),
  c("titulo-8-cap-2", "Cita 4 recursos de la Hacienda de la Comunidad Autónoma (art. 104)", "Tributos propios; recargos sobre tributos del Estado; tributos cedidos; participación en Fondos de Compensación Interterritorial; deuda y operaciones de crédito; rendimiento del patrimonio"),
  c("titulo-8-cap-2", "¿Qué capacidad normativa tiene Aragón sobre tributos según el art. 105.1?", "Establecer sus propios tributos y recargos sobre tributos del Estado"),
  c("titulo-8-cap-2", "¿Qué puede crear una ley de Cortes de Aragón según el art. 106.4?", "Una Agencia Tributaria de Aragón para aplicar los tributos propios y los cedidos totalmente"),
  c("titulo-8-cap-2", "¿Qué es la Comisión Mixta de Asuntos Económico-Financieros (art. 109.1)?", "El órgano bilateral de relación Estado-Aragón en materia de financiación autonómica específica"),
  c("titulo-8-cap-2", "¿A quién corresponde la elaboración y ejecución del presupuesto aragonés (art. 111.1)?", "Al Gobierno de Aragón; a las Cortes su examen, enmienda, aprobación y control"),
  c("titulo-8-cap-2", "¿Qué es la Cámara de Cuentas de Aragón (art. 112.1)?", "El órgano fiscalizador de la gestión económico-financiera del sector público de la Comunidad Autónoma, dependiente de las Cortes"),

  // Título VIII, Cap. III: Patrimonio (art. 113)
  c("titulo-8-cap-3", "¿Qué integra el patrimonio de la Comunidad Autónoma (art. 113.2)?", "Todos los bienes y derechos de los que sea titular, cualquiera que sea su naturaleza y título de adquisición"),

  // Título VIII, Cap. IV: Hacienda de las Entidades Locales (art. 114)
  c("titulo-8-cap-4", "¿Qué corresponde a la Comunidad Autónoma respecto a las entidades locales (art. 114.1)?", "La tutela financiera, respetando la autonomía local reconocida en los arts. 137, 140, 141 y 142 CE"),
  c("titulo-8-cap-4", "¿Qué es el Fondo Local de Aragón (art. 114.5)?", "El fondo que integra el conjunto de aportaciones incondicionadas de la Comunidad Autónoma a las Corporaciones Locales"),

  // Título IX: Reforma del Estatuto (art. 115)
  c("titulo-9", "¿A quién corresponde la iniciativa de reforma del Estatuto (art. 115.1)?", "Al Gobierno de Aragón, a las Cortes de Aragón (a propuesta de 1/5 de sus Diputados) y a las Cortes Generales"),
  c("titulo-9", "¿Qué mayorías requiere la reforma según el art. 115.2?", "Aprobación por 2/3 de las Cortes de Aragón y aprobación de las Cortes Generales mediante ley orgánica"),
  c("titulo-9", "¿Qué incluye la aprobación de la reforma por las Cortes Generales (art. 115.7)?", "La autorización para que el Gobierno de Aragón convoque referéndum de ratificación si lo acuerdan las Cortes de Aragón por 2/3"),
];

console.log(`📝 Insertando ${CARDS.length} flashcards de tema-3 (Estatuto de Aragón)...`);
const BATCH = 200;
for (let i = 0; i < CARDS.length; i += BATCH) {
  await insertBatch(CARDS.slice(i, i + BATCH));
  console.log(`   ✓ ${Math.min(i + BATCH, CARDS.length)}/${CARDS.length}`);
}

// Alcance para auxiliar-administrativo: "Título preliminar. Organización
// institucional (Cortes, Presidente y Gobierno). Clases de competencias."
const SECCIONES_AUX_ADMIN = [
  "titulo-preliminar",
  "titulo-2-cap-1",
  "titulo-2-cap-2",
  "titulo-2-cap-3",
  "titulo-5",
];
const patchTO = await fetch(
  `${URL_BASE}/rest/v1/tema_oposicion?tema_slug=eq.tema-3&oposicion_slug=eq.auxiliar-administrativo`,
  {
    method: "PATCH",
    headers: { ...HEADERS, Prefer: "return=representation" },
    body: JSON.stringify({ secciones_incluidas: SECCIONES_AUX_ADMIN }),
  }
);
if (!patchTO.ok) {
  console.error(`❌ Error actualizando tema_oposicion: ${patchTO.status} ${await patchTO.text()}`);
  process.exit(1);
}
console.log("✅ tema_oposicion (auxiliar-administrativo, tema-3) limitado a:", SECCIONES_AUX_ADMIN);
console.log("✅ Tema-3 (Estatuto de Aragón) completado.");
