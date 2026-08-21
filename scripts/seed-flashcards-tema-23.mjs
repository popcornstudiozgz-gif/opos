/**
 * Tema-23: Ley de Urbanismo de Aragón (texto refundido, Decreto Legislativo
 * 1/2014) — régimen urbanístico del suelo, planeamiento urbanístico, gestión
 * urbanística, edificación y uso del suelo, y disciplina urbanística.
 *
 * Alcance: la Ley tiene 289 artículos repartidos en 7 títulos. Se cubren los
 * 5 títulos que coinciden con el temario (preliminar, régimen del suelo,
 * planeamiento, gestión, edificación/uso, disciplina) con nivel conceptual
 * (definiciones, competencias, procedimientos clave), condensando los
 * artículos de detalle técnico-procedimental (cálculos de aprovechamiento,
 * documentación exhaustiva de cada instrumento, etc.), igual que se hizo con
 * la Ley de Contratos (tema-9) y la Ley de Haciendas Locales (tema-12). El
 * Título Tercero (instrumentos de política urbanística y suelo) y el Título
 * Séptimo (régimen urbanístico simplificado) no forman parte del temario de
 * esta oposición y quedan fuera de esta primera pasada.
 *
 * Uso: node --env-file=.env.local scripts/seed-flashcards-tema-23.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

async function insertBatch(filas) {
  const res = await fetch(`${URL_BASE}/rest/v1/flashcards`, { method: "POST", headers: { ...HEADERS, Prefer: "return=minimal" }, body: JSON.stringify(filas) });
  if (!res.ok) { console.error(`❌ ${res.status} ${await res.text()}`); process.exit(1); }
}

const TEMA = "tema-23";
const c = (seccion, anverso, reverso) => ({ tema_slug: TEMA, seccion, anverso, reverso });

const CARDS = [
  // ===== Título Preliminar: objeto, principios, competencias (arts. 1-9) =====
  c("titulo-preliminar", "¿Cuál es el objeto de la Ley de Urbanismo de Aragón (art. 1)?", "Regular la actividad urbanística y el régimen urbanístico del suelo, el vuelo y el subsuelo en la Comunidad Autónoma de Aragón"),
  c("titulo-preliminar", "¿Qué comprende la actividad urbanística (art. 1.2)?", "La clasificación, el planeamiento, la urbanización, la intervención en el mercado de la vivienda y del suelo y en el uso del suelo, y la disciplina urbanística"),
  c("titulo-preliminar", "¿Qué naturaleza tiene la dirección y el control de la actividad urbanística (art. 2)?", "Constituyen una función pública"),
  c("titulo-preliminar", "Cita 4 principios de la actividad urbanística (art. 3)", "Desarrollo sostenible; subordinación al interés público; participación ciudadana; transparencia; eficacia y eficiencia; colaboración y coordinación"),
  c("titulo-preliminar", "Cita 3 objetivos de la actividad urbanística (art. 4)", "Lograr un desarrollo sostenible, equilibrado y cohesionado de ciudades y territorio; garantizar la justa distribución de beneficios y cargas; garantizar la participación de la comunidad en las plusvalías; promover el derecho a una vivienda digna"),
  c("titulo-preliminar", "¿Qué órganos urbanísticos activos tiene la Administración de la Comunidad Autónoma (art. 5.2)?", "De carácter unipersonal: el Consejero y el Director General competentes en urbanismo. De carácter colegiado: los Consejos Provinciales de Urbanismo de Huesca, Teruel y Zaragoza"),
  c("titulo-preliminar", "¿Qué son los Consejos Provinciales de Urbanismo (art. 6)?", "Órganos activos y, a la vez, consultivos y de participación de la Comunidad Autónoma; sus acuerdos que ponen fin al procedimiento agotan la vía administrativa"),
  c("titulo-preliminar", "¿A quién corresponde con carácter general la actividad urbanística pública (art. 8.1)?", "A los municipios, para la gestión de los intereses de la comunidad local"),
  c("titulo-preliminar", "Cita 3 atribuciones del Alcalde en materia urbanística (art. 8.3)", "Aprobar instrumentos de planeamiento de desarrollo no atribuidos al Pleno; aprobar instrumentos de gestión urbanística y proyectos de urbanización; otorgar licencias; ejercer la disciplina urbanística salvo sanciones graves y muy graves"),
  c("titulo-preliminar", "Cita 3 atribuciones del Ayuntamiento Pleno en materia urbanística (art. 8.4)", "Aprobación inicial y provisional del planeamiento general; aprobación de ordenanzas de edificación; aprobación de convenios de planeamiento; imposición de sanciones por infracciones graves y muy graves"),

  // ===== Título Primero: clasificación de suelo (arts. 10-18) =====
  c("regimen-suelo", "¿Qué establece el régimen urbanístico del suelo (art. 10.1)?", "El establecido en la legislación estatal de suelo, en esta Ley y, por remisión legal, en el planeamiento, según la situación básica, clasificación y calificación urbanística del predio"),
  c("regimen-suelo", "¿En qué clases y categorías clasifica el suelo el plan general (art. 11.1)?", "Suelo urbano (consolidado o no consolidado), suelo urbanizable (delimitado o no delimitado), y suelo no urbanizable (especial o genérico)"),
  c("regimen-suelo", "¿Qué requisito básico deben cumplir los terrenos para ser suelo urbano (art. 12)?", "Contar con servicios urbanísticos suficientes: red viaria, abastecimiento y evacuación de agua, energía eléctrica, telecomunicaciones y gestión de residuos"),
  c("regimen-suelo", "¿Qué es el suelo urbano no consolidado (art. 13.2)?", "El suelo urbano que soporta actuaciones urbanísticas integradas, de nueva urbanización o de intervención sobre suelos consolidados total o parcialmente por la edificación"),
  c("regimen-suelo", "¿Qué requisitos debe reunir un solar (art. 14.1)?", "Estar urbanizado conforme al planeamiento (o disponer de servicios básicos y alumbrado público con vía pavimentada); tener alineaciones y rasantes señaladas; no requerir cesión de terrenos para regularizar la red viaria"),
  c("regimen-suelo", "¿Qué es el suelo urbanizable delimitado (art. 15.3)?", "Los sectores de urbanización prioritaria previstos por el plan general; el resto del suelo urbanizable es no delimitado"),
  c("regimen-suelo", "Cita 3 circunstancias que determinan la clasificación de suelo no urbanizable (art. 16.1)", "Suelo preservado por legislación de protección medioambiental, cultural o sectorial; terrenos peligrosos por riesgos; terrenos con valores ecológicos, agrícolas o paisajísticos; suelo que el plan general no considere transformable en urbano"),
  c("regimen-suelo", "¿Qué categorías distingue el suelo no urbanizable (art. 16.2)?", "Suelo no urbanizable genérico y suelo no urbanizable especial"),

  // ===== Título Primero: estatuto ciudadanía y propiedad (arts. 19-37) =====
  c("regimen-suelo", "Cita 3 derechos del ciudadano en materia urbanística (art. 19)", "Al desarrollo del derecho a una vivienda digna; al acceso a la información urbanística; a la participación en los procedimientos de aprobación del planeamiento; a colaborar en la actividad de planeamiento o gestión; al ejercicio de la acción pública"),
  c("regimen-suelo", "Cita 3 deberes del ciudadano en relación con la actividad urbanística (art. 20)", "Preservar y mejorar el medio ambiente natural y urbano; preservar el patrimonio cultural aragonés; respetar los bienes de dominio público; colaborar en la actividad de planeamiento, gestión o disciplina"),
  c("regimen-suelo", "¿Qué comprende el derecho de propiedad del suelo (art. 28.1)?", "Las facultades de uso, disfrute y explotación conforme a su clasificación y destino, y la facultad de disposición conforme a las leyes y el planeamiento"),
  c("regimen-suelo", "¿A qué deberes está sujeto el propietario del suelo urbano no consolidado que promueve la edificación (art. 31.4)?", "Completar la urbanización a su costa; ceder gratuitamente los terrenos afectados por alineaciones (máx. 15% de la superficie); regularizar la finca si es preciso"),
  c("regimen-suelo", "¿Puede edificarse en suelo no urbanizable genérico (art. 34)?", "Sí, mediante título habilitante urbanístico, para explotaciones agrarias/ganaderas, obras públicas, o viviendas unifamiliares aisladas si no forman núcleo de población"),
  c("regimen-suelo", "¿Qué está prohibido en suelo no urbanizable especial (art. 37.1)?", "Cualquier construcción, actividad o uso que implique transformación de su destino, lesione el valor protegido o infrinja el régimen limitativo establecido"),

  // ===== Título Segundo: plan general (arts. 38-50) =====
  c("planeamiento", "¿Qué es el plan general de ordenación urbana (art. 38.1)?", "El instrumento de ordenación integral que abarca uno o varios términos municipales, clasifica el suelo y define los elementos fundamentales de la estructura general de la ordenación urbanística"),
  c("planeamiento", "¿Qué horizonte temporal de gestión debe fijar el plan general en defecto de previsión (art. 39.1.b)?", "Veinte años"),
  c("planeamiento", "¿Qué es la ordenación estructural del plan general (art. 40.1)?", "La estructura general y las directrices del modelo de evolución urbana y ocupación del territorio: clasificación del suelo, sistemas generales, usos y edificabilidades globales, reservas de vivienda protegida"),
  c("planeamiento", "¿Qué determina la ordenación pormenorizada en suelo urbano consolidado (art. 41.1)?", "Usos pormenorizados y ordenanzas de edificación, delimitación de espacios y dotaciones, trazado de redes, alineaciones y rasantes, plazos de edificación"),
  c("planeamiento", "Enumera los documentos del plan general (art. 47.1)", "Memoria; planos de información y ordenación (con mapas de riesgos); catálogos urbanísticos; normas urbanísticas; estudio económico; documentación ambiental"),
  c("planeamiento", "¿Con qué documento comienzan los trabajos de elaboración del plan general (art. 48.1)?", "Un avance que contiene los criterios, objetivos y soluciones generales del planeamiento, expuesto al público un mes mínimo"),
  c("planeamiento", "¿A quién corresponde la aprobación definitiva del plan general (art. 49.1)?", "Al Consejo Provincial de Urbanismo (o al Director General competente si el plan afecta a municipios de distintas provincias)"),
  c("planeamiento", "¿En qué plazo debe resolver el órgano competente sobre la aprobación definitiva (art. 49.5)?", "4 meses desde la entrada del expediente completo; transcurrido sin resolución expresa, se entiende producida la aprobación definitiva"),

  // ===== Título Segundo: planes parciales y especiales (arts. 51-66) =====
  c("planeamiento", "¿Cuál es el objeto de los planes parciales (art. 51.1)?", "Establecer, en desarrollo del plan general, la ordenación pormenorizada precisa para la ejecución de sectores enteros en suelo urbano no consolidado y suelo urbanizable"),
  c("planeamiento", "¿A quién corresponde la aprobación inicial de los planes parciales de iniciativa municipal (art. 57.1)?", "Al Alcalde, dando cuenta al Ayuntamiento Pleno; se someten a información pública por plazo mínimo de un mes"),
  c("planeamiento", "¿Quién puede formular planes parciales de iniciativa no municipal (art. 58.1)?", "Cualesquiera personas físicas o jurídicas, públicas o privadas"),
  c("planeamiento", "¿Pueden los planes especiales clasificar suelo (art. 61.3)?", "No; no pueden sustituir al plan general en su función de instrumento de ordenación integral del territorio"),
  c("planeamiento", "Cita 3 finalidades para las que pueden formularse planes especiales en desarrollo del plan general (art. 64.1)", "Desarrollo de sistemas generales; protección del medio ambiente y el paisaje; protección del patrimonio edificado y reforma interior; vinculación de terrenos a vivienda protegida"),

  // ===== Título Cuarto: gestión urbanística - conceptos y sistemas (arts. 118-122) =====
  c("gestion-urbanistica", "¿Qué es la gestión urbanística (art. 118.1)?", "El conjunto de procedimientos para la distribución equitativa de beneficios y cargas y para la transformación del uso del suelo, en ejecución del planeamiento urbanístico"),
  c("gestion-urbanistica", "¿Qué son las actuaciones aisladas (art. 118.2.a)?", "Las que se ejecutan de forma asistemática sobre suelo urbano consolidado, a través del sistema de urbanización de obras ordinarias"),
  c("gestion-urbanistica", "¿Qué son las actuaciones integradas (art. 118.2.b)?", "Las que se ejecutan por desarrollo sistemático del planeamiento, requieren delimitar una unidad de ejecución y afectan a suelo urbano no consolidado o urbanizable delimitado"),
  c("gestion-urbanistica", "¿Qué sistemas de gestión pueden adoptarse para las actuaciones integradas (art. 134.3)?", "Gestión directa (expropiación o cooperación) o gestión indirecta (compensación o adjudicación a urbanizador)"),
  c("gestion-urbanistica", "¿Quién establece el sistema de gestión urbanística a aplicar (art. 122.1)?", "La Administración, al aprobar el planeamiento que establezca la ordenación pormenorizada o al delimitar la unidad de ejecución"),
  c("gestion-urbanistica", "¿Cuál es el plazo mínimo de garantía de las obras de urbanización tras su recepción (art. 123.1)?", "Cinco años"),

  // ===== Título Cuarto: aprovechamiento urbanístico (arts. 124-130) =====
  c("gestion-urbanistica", "¿Qué es el aprovechamiento objetivo (art. 124.3)?", "La superficie edificable homogeneizada que permite el planeamiento sobre un terreno según el uso, tipología e índice de edificabilidad atribuidos"),
  c("gestion-urbanistica", "¿Qué es el aprovechamiento subjetivo (art. 124.4)?", "La superficie edificable que expresa el contenido urbanístico lucrativo de un terreno que su propietario (y, en su caso, el municipio) puede incorporar a su patrimonio"),
  c("gestion-urbanistica", "¿Qué es el aprovechamiento medio (art. 125.1)?", "El promedio de los aprovechamientos objetivos de un ámbito territorial, para distribuir equitativamente entre propietarios los aprovechamientos subjetivos y las cargas"),
  c("gestion-urbanistica", "En suelo urbano no consolidado, ¿qué porcentaje del aprovechamiento medio corresponde al propietario (art. 127.3)?", "El 90%; el resto corresponde a la Administración"),
  c("gestion-urbanistica", "En suelo urbanizable delimitado, ¿qué porcentaje del aprovechamiento medio corresponde al propietario (art. 128.1)?", "El 90%; el resto corresponde a la Administración"),

  // ===== Título Cuarto: actuaciones aisladas e integradas, reparcelación (arts. 131-148) =====
  c("gestion-urbanistica", "¿En qué consiste la normalización de fincas (art. 133.1)?", "Regularizar la configuración física de las fincas para adaptarla al planeamiento, sin ser necesaria la redistribución de beneficios y cargas entre propietarios"),
  c("gestion-urbanistica", "¿Qué límite tiene la superficie afectada por una normalización de fincas (art. 133.2.a)?", "No podrá afectar a más del 15% de la superficie de la finca"),
  c("gestion-urbanistica", "¿En qué consiste la reparcelación (art. 140.1)?", "La agrupación de fincas de la unidad de ejecución para su nueva división ajustada al planeamiento, con adjudicación de parcelas a los interesados y cesión de terrenos obligatorios a la Administración"),
  c("gestion-urbanistica", "¿Cuáles son los tipos de reparcelación según su origen (art. 141.1)?", "Voluntaria (propuesta por junta de compensación, agrupación de propietarios o urbanizador) y forzosa (impuesta por el municipio si no hay propuesta voluntaria)"),
  c("gestion-urbanistica", "¿Qué efecto produce la iniciación del expediente de reparcelación (art. 146.1)?", "La suspensión del otorgamiento de licencias de parcelación y edificación en el ámbito de la unidad de ejecución"),
  c("gestion-urbanistica", "¿Qué efectos produce el acuerdo aprobatorio de la reparcelación (art. 148)?", "Transmisión a la Administración de los terrenos de cesión obligatoria; subrogación de las nuevas por las antiguas parcelas; afectación real de las parcelas al cumplimiento de los deberes urbanísticos"),

  // ===== Título Cuarto: gestión directa e indirecta (arts. 149-154) =====
  c("gestion-urbanistica", "¿En qué consiste la gestión directa por expropiación (art. 149.1)?", "Se aplica por unidades de ejecución completas y comprende todos los bienes y derechos incluidos en las mismas"),
  c("gestion-urbanistica", "¿En qué consiste la gestión directa por cooperación (art. 150.1)?", "Los propietarios aportan el suelo de cesión obligatoria y la Administración ejecuta las obras de urbanización"),
  c("gestion-urbanistica", "¿En qué consiste la gestión indirecta por compensación (art. 151.2)?", "Los propietarios se constituyen en junta de compensación, aportan los terrenos de cesión obligatoria mediante reparcelación y ejecutan a su costa la obra pública de urbanización"),
  c("gestion-urbanistica", "¿Qué requisito de representación deben cumplir los propietarios para asumir la iniciativa en el sistema de compensación (art. 152.1.b)?", "Representar más de la mitad de la superficie de la unidad de ejecución"),

  // ===== Título Quinto: normas de directa aplicación y edificación forzosa (arts. 214-224) =====
  c("edificacion-uso", "Sin plan que lo autorice, ¿cuál es la altura máxima de edificación (art. 215.1)?", "Tres plantas, medidas en cada punto del terreno"),
  c("edificacion-uso", "¿En qué plazo debe edificar el propietario de un solar, en defecto de previsión del planeamiento (art. 217.1)?", "Dos años desde que la parcela merezca la calificación de solar o desde la declaración de ruina o inadecuación"),
  c("edificacion-uso", "¿Qué habilita el incumplimiento del deber de edificar (art. 219)?", "La expropiación por incumplimiento de la función social de la propiedad o la ejecución del planeamiento mediante sustitución del propietario"),
  c("edificacion-uso", "¿Cuándo queda una parcela en situación de ejecución por sustitución (art. 220.2)?", "Transcurridos seis meses desde el requerimiento al propietario incumplidor para que edifique, por ministerio de la Ley"),

  // ===== Título Quinto: títulos habilitantes urbanísticos (arts. 225-240) =====
  c("edificacion-uso", "¿Qué tres títulos habilitantes urbanísticos existen (art. 225)?", "Licencia, declaración responsable o comunicación previa"),
  c("edificacion-uso", "¿Qué es la licencia urbanística (art. 226.1)?", "El acto administrativo por el que el Alcalde autoriza a cualquier persona a realizar un acto de transformación, construcción, edificación o uso del suelo o subsuelo"),
  c("edificacion-uso", "Cita 3 actos sujetos a licencia urbanística (art. 226.2)", "Movimientos de tierra y parcelaciones fuera de reparcelación; obras de nueva planta (salvo declaración responsable); obras que alteren la configuración arquitectónica; obras en edificios protegidos"),
  c("edificacion-uso", "¿Qué es la declaración responsable en materia de urbanismo (art. 227.1)?", "El documento por el que el interesado manifiesta bajo su responsabilidad que cumple los requisitos normativos para el acto pretendido, disponiendo de la documentación acreditativa"),
  c("edificacion-uso", "Cita 3 actos sujetos a declaración responsable (art. 227.2)", "Obras de nueva planta de escasa entidad no residenciales en una sola planta; obras de ampliación/reforma que no alteren la composición general del edificio; renovación de instalaciones; primera ocupación"),
  c("edificacion-uso", "¿Qué es la comunicación previa en materia de urbanismo (art. 228.1)?", "El documento por el que el interesado pone en conocimiento del Alcalde que reúne los requisitos para un acto no sujeto ni a licencia ni a declaración responsable"),
  c("edificacion-uso", "¿Desde cuándo legitima la licencia urbanística (art. 229.1)?", "Desde la fecha en que sea formalmente adoptada por el Alcalde"),
  c("edificacion-uso", "¿En qué plazo máximo deben otorgarse las licencias urbanísticas (art. 238.3)?", "Tres meses"),

  // ===== Título Quinto: parcelaciones y deber de conservación (arts. 241-254) =====
  c("edificacion-uso", "¿Qué es la parcelación urbanística (art. 241.2)?", "La división o segregación de terrenos en dos o más lotes cuya finalidad es permitir o facilitar actos de edificación o uso del suelo sujetos a licencia urbanística"),
  c("edificacion-uso", "¿Cuándo se considera ilegal una parcelación (art. 242.1)?", "Cuando es contraria a la Ley y al planeamiento urbanístico, especialmente si puede dar lugar a la constitución de un núcleo de población"),
  c("edificacion-uso", "¿A qué régimen queda sujeta toda parcelación urbanística (art. 245.1)?", "A licencia o a la aprobación del proyecto de reparcelación que la contenga"),
  c("edificacion-uso", "¿Qué deben mantener los propietarios de edificaciones, terrenos y solares (art. 254.1)?", "Adecuadas condiciones de seguridad, salubridad, ornato público y calidad ambiental, cultural y turística"),

  // ===== Título Sexto: inspección urbanística (arts. 264-267) =====
  c("disciplina-urbanistica", "¿Qué Administraciones ejercen la inspección urbanística (art. 264.1)?", "Los municipios, las comarcas y la Comunidad Autónoma, dentro de su ámbito de competencias y de forma coordinada"),
  c("disciplina-urbanistica", "¿Qué condición tienen los inspectores urbanísticos (art. 265.1)?", "La de agentes de la autoridad, pudiendo solicitar el apoyo de las Fuerzas y Cuerpos de Seguridad"),
  c("disciplina-urbanistica", "¿Qué naturaleza tienen las actas de inspección (art. 266.1)?", "La de documentos públicos, y constituyen prueba de los hechos que motiven su formalización salvo prueba en contrario"),

  // ===== Título Sexto: protección de la legalidad (arts. 268-276) =====
  c("disciplina-urbanistica", "¿Qué debe hacer el Alcalde ante obras en curso sin título habilitante (art. 268.1)?", "Disponer su paralización inmediata y, tras expediente, decretar la demolición o requerir al interesado la legalización en 2 meses"),
  c("disciplina-urbanistica", "¿En qué plazo caduca el procedimiento de protección de la legalidad urbanística si no se resuelve expresamente (art. 268.3)?", "Seis meses desde su inicio"),
  c("disciplina-urbanistica", "¿Qué ocurre con obras terminadas sin título habilitante sobre suelo no urbanizable especial o sistemas generales (art. 269.3)?", "El Alcalde puede actuar sin limitación alguna de plazo, sin perjuicio de dar traslado al Ministerio Fiscal"),
  c("disciplina-urbanistica", "¿Cuál es el plazo máximo para el cumplimiento de las medidas de restablecimiento de la legalidad urbanística (art. 270.3)?", "Seis años desde que adquiera firmeza administrativa el acto que las acuerde"),
  c("disciplina-urbanistica", "¿Cuándo puede subrogarse la comarca en las competencias de protección de la legalidad urbanística (art. 272.1)?", "Previo requerimiento al municipio y en caso de inactividad municipal por plazo de un mes"),

  // ===== Título Sexto: régimen sancionador (arts. 277-287) =====
  c("disciplina-urbanistica", "¿Con qué multa se sancionan las infracciones leves (art. 277)?", "De 600 a 6.000 euros"),
  c("disciplina-urbanistica", "¿Con qué multa se sancionan las infracciones graves (art. 278)?", "De 6.000,01 a 60.000 euros"),
  c("disciplina-urbanistica", "¿Con qué multa se sancionan las infracciones muy graves (art. 279)?", "De 60.000,01 a 300.000 euros"),
  c("disciplina-urbanistica", "Cita un ejemplo de infracción muy grave (art. 279)", "La realización de parcelaciones urbanísticas en suelo urbanizable no delimitado o no urbanizable que puedan dar lugar a un núcleo de población"),
  c("disciplina-urbanistica", "¿Quiénes son responsables en las infracciones de urbanización, uso del suelo y edificación (art. 280.1)?", "La junta de compensación, el urbanizador, el promotor, el constructor y los técnicos directores"),
  c("disciplina-urbanistica", "¿Cuáles son los plazos de prescripción de las infracciones urbanísticas (art. 284.1)?", "Leves: 1 año; graves: 4 años; muy graves: 10 años"),
  c("disciplina-urbanistica", "¿A quién corresponde sancionar las infracciones leves y quién las graves y muy graves (art. 285.1)?", "Al Alcalde las leves; al Ayuntamiento Pleno las graves y muy graves"),
  c("disciplina-urbanistica", "¿Qué reducción de multa se aplica por reposición voluntaria de la realidad física alterada antes del apremio (art. 287.1)?", "Condonación del 50% de su cuantía"),
];

console.log(`📝 Insertando ${CARDS.length} flashcards de tema-23...`);
await insertBatch(CARDS);

const SECCIONES_AUX_ADMIN = ["titulo-preliminar", "regimen-suelo", "planeamiento", "gestion-urbanistica", "edificacion-uso", "disciplina-urbanistica"];
const patchTO = await fetch(`${URL_BASE}/rest/v1/tema_oposicion?tema_slug=eq.tema-23&oposicion_slug=eq.auxiliar-administrativo`, {
  method: "PATCH", headers: { ...HEADERS, Prefer: "return=representation" }, body: JSON.stringify({ secciones_incluidas: SECCIONES_AUX_ADMIN }),
});
if (!patchTO.ok) { console.error(`❌ ${patchTO.status} ${await patchTO.text()}`); process.exit(1); }
console.log("✅ tema_oposicion (auxiliar-administrativo, tema-23) limitado a:", SECCIONES_AUX_ADMIN);
console.log("✅ Tema-23 completado.");
