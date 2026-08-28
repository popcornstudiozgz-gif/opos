/**
 * Crea el tema canónico tema-57: "Medios auxiliares. Trabajos en altura:
 * andamios, plataformas, escaleras de mano. Trabajos en espacios
 * confinados. Medios de izado de cargas" y lo asigna como Tema 19
 * (bloque-2) de la oposición Oficial Albañil (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 17 oficial del Anexo I (bases2110.pdf).
 *
 * Fuente primaria: Real Decreto 1627/1997, de 24 de octubre (BOE-A-1997-
 * 22614), Anexo IV, Parte C (texto leído íntegro en este turno,
 * scripts/tmp-fuentes/rd1627-1997.txt): apartado 3 (caídas de altura),
 * apartado 5 (andamios y escaleras) y apartado 6 (aparatos elevadores).
 * El propio apartado 5.e del RD 1627/1997 remite, para las escaleras de
 * mano, al Real Decreto 486/1997, de 14 de abril, por el que se
 * establecen las disposiciones mínimas de seguridad y salud en los
 * lugares de trabajo.
 *
 * Tres secciones:
 * 1. andamios-plataformas-trabajo — andamios y plataformas de trabajo.
 * 2. escaleras-mano-caidas-altura — escaleras de mano y protección
 *    frente a caídas de altura.
 * 3. espacios-confinados-izado-cargas — trabajos en espacios confinados
 *    y medios de izado de cargas.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-57-medios-auxiliares-trabajos-altura.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!URL_BASE || !SERVICE_KEY) {
  console.error("❌ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-57";
const OPOSICION = "oficial-albanil-ayto-zaragoza";
const BLOQUE_2_ID = "11fb28dc-2b37-42bb-ae51-aeb7421e298c";
const RD_1627_1997 = "https://www.boe.es/buscar/act.php?id=BOE-A-1997-22614";
const RD_486_1997 = "https://www.boe.es/buscar/act.php?id=BOE-A-1997-8669";

async function insertar(tabla, filas) {
  const res = await fetch(`${URL_BASE}/rest/v1/${tabla}`, {
    method: "POST",
    headers: { ...HEADERS, Prefer: "return=representation" },
    body: JSON.stringify(filas),
  });
  if (!res.ok) {
    console.error(`❌ Error insertando en ${tabla}: ${res.status} ${await res.text()}`);
    process.exit(1);
  }
  return res.json();
}

async function upsert(tabla, filas, onConflict) {
  const res = await fetch(`${URL_BASE}/rest/v1/${tabla}?on_conflict=${onConflict}`, {
    method: "POST",
    headers: { ...HEADERS, Prefer: "resolution=merge-duplicates,return=representation" },
    body: JSON.stringify(filas),
  });
  if (!res.ok) {
    console.error(`❌ Error insertando en ${tabla}: ${res.status} ${await res.text()}`);
    process.exit(1);
  }
  return res.json();
}

async function insertarPreguntasConOpciones(seccion, preguntas) {
  const filas = preguntas.map(({ opciones, correcta, ...p }) => ({ ...p, tema_slug: TEMA, seccion }));
  const insertadas = await insertar("preguntas", filas);
  console.log(`   ✓ preguntas: ${insertadas.length} filas`);
  const filasOpciones = insertadas.flatMap((pregunta, i) =>
    preguntas[i].opciones.map((texto, orden) => ({
      pregunta_id: pregunta.id,
      texto,
      es_correcta: orden === preguntas[i].correcta,
      orden,
    })),
  );
  const opcionesInsertadas = await insertar("opciones", filasOpciones);
  console.log(`   ✓ opciones: ${opcionesInsertadas.length} filas`);
}

console.log(`📚 Creando ${TEMA}...`);
await insertar("temas", [
  {
    slug: TEMA,
    titulo: "Medios auxiliares: andamios, escaleras, espacios confinados e izado de cargas",
    descripcion: "Medios auxiliares. Trabajos en altura: andamios, plataformas, escaleras de mano. Trabajos en espacios confinados. Medios de izado de cargas.",
    contenido:
      "Desarrolla los andamios y plataformas de trabajo, las escaleras de mano y la protección frente a caídas de altura, los trabajos en espacios confinados y los medios de izado de cargas, conforme al RD 1627/1997 (Anexo IV, Parte C) y al RD 486/1997 en lo relativo a escaleras de mano.",
    enlaces_boe: [
      { url: RD_1627_1997, titulo: "RD 1627/1997 — Seguridad y salud en obras de construcción (Anexo IV, Parte C)" },
      { url: RD_486_1997, titulo: "RD 486/1997 — Seguridad y salud en los lugares de trabajo (escaleras de mano)" },
    ],
    indice_estudio: [
      { url: RD_1627_1997, titulo: "Andamios y plataformas de trabajo", seccion: "andamios-plataformas-trabajo", articulos: "Anexo IV, Parte C, apdo. 5" },
      { url: RD_486_1997, titulo: "Escaleras de mano y caídas de altura", seccion: "escaleras-mano-caidas-altura", articulos: "RD 1627/1997 apdo. 3 y RD 486/1997" },
      { url: RD_1627_1997, titulo: "Espacios confinados y medios de izado de cargas", seccion: "espacios-confinados-izado-cargas", articulos: "Anexo IV, Parte C, apdo. 6" },
    ],
  },
]);

const S1 = "andamios-plataformas-trabajo";
console.log(`📝 flashcards (${S1})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Qué exige el RD 1627/1997 en el proyecto, construcción y mantenimiento de los andamios?", reverso: "Que se realicen de manera que se evite que se desplomen o se desplacen accidentalmente" },
    { anverso: "¿Qué condición deben cumplir las plataformas de trabajo, pasarelas y escaleras de los andamios?", reverso: "Deben construirse, protegerse y utilizarse de forma que se evite que las personas caigan o estén expuestas a caídas de objetos, ajustando sus medidas al número de trabajadores que las vayan a utilizar" },
    { anverso: "¿Cuándo deben inspeccionarse los andamios, según el RD 1627/1997?", reverso: "Antes de su puesta en servicio, a intervalos regulares en lo sucesivo, y después de cualquier modificación, período de no utilización, exposición a la intemperie, sacudidas sísmicas u otra circunstancia que pudiera afectar a su resistencia o estabilidad" },
    { anverso: "¿Quién debe realizar la inspección de un andamio, según el RD 1627/1997?", reverso: "Una persona competente" },
    { anverso: "¿Qué exige el RD 1627/1997 respecto a los andamios móviles?", reverso: "Que se aseguren contra los desplazamientos involuntarios" },
    { anverso: "¿Qué es un andamio de borriquetas?", reverso: "Un andamio elemental formado por caballetes o borriquetas sobre los que se apoyan tablones, empleado para trabajos a poca altura; su uso está limitado por su escasa capacidad de protección colectiva" },
    { anverso: "¿Qué es un andamio tubular modular?", reverso: "Un andamio metálico formado por tubos y elementos de unión normalizados (abrazaderas, bases, plataformas), que permite montar estructuras de distintas alturas y geometrías con estabilidad certificada" },
    { anverso: "¿Qué es una plataforma elevadora móvil de personal (PEMP)?", reverso: "Una máquina autopropulsada o remolcada que eleva una plataforma de trabajo mediante un brazo articulado, telescópico o tijera, empleada para trabajos en altura sin necesidad de montar un andamio" },
    { anverso: "¿Qué debe garantizar el diseño de una plataforma de trabajo en altura respecto al número de trabajadores?", reverso: "Que sus dimensiones y capacidad de carga sean adecuadas al número de personas que la van a utilizar simultáneamente, evitando sobrecargas" },
    { anverso: "¿Qué precaución exige el RD 1627/1997 tras una modificación o un período de no utilización de un andamio?", reverso: "Volver a inspeccionarlo por una persona competente antes de su nueva puesta en servicio" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })),
);

console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué exige el RD 1627/1997 sobre el proyecto y construcción de los andamios?", explicacion: "Que se evite que se desplomen o se desplacen accidentalmente.", dificultad: "media", opciones: ["Evitar que se desplomen o desplacen accidentalmente", "Que sean siempre de tipo tubular modular", "Que no requieran ninguna inspección posterior", "Que se monten exclusivamente en horario diurno"], correcta: 0 },
  { enunciado: "¿A qué deben ajustarse las medidas de las plataformas de trabajo de los andamios?", explicacion: "Al número de trabajadores que vayan a utilizarlas.", dificultad: "media", opciones: ["Al número de trabajadores que las vayan a utilizar", "Únicamente al peso del propio andamio", "Solo a la altura total de la estructura", "Exclusivamente al tipo de fachada"], correcta: 0 },
  { enunciado: "¿Cuándo deben inspeccionarse los andamios según el RD 1627/1997?", explicacion: "Antes de su puesta en servicio, periódicamente y tras cualquier circunstancia que afecte a su resistencia.", dificultad: "media", opciones: ["Antes de su puesta en servicio, periódicamente y tras incidencias", "Solo al finalizar la obra completa", "Únicamente si lo solicita el promotor", "Nunca, si el fabricante lo certifica"], correcta: 0 },
  { enunciado: "¿Quién debe inspeccionar un andamio según el RD 1627/1997?", explicacion: "Una persona competente.", dificultad: "facil", opciones: ["Una persona competente", "Cualquier operario sin formación específica", "Solo el promotor de la obra", "Exclusivamente el fabricante del andamio"], correcta: 0 },
  { enunciado: "¿Qué exige el RD 1627/1997 respecto a los andamios móviles?", explicacion: "Que se aseguren contra los desplazamientos involuntarios.", dificultad: "media", opciones: ["Asegurarlos contra desplazamientos involuntarios", "Prohibir su uso en cualquier obra de construcción", "Limitar su altura a 2 metros como máximo", "Eximirlos de inspección periódica"], correcta: 0 },
  { enunciado: "¿Qué es un andamio tubular modular?", explicacion: "Un andamio metálico de tubos y elementos normalizados con estabilidad certificada.", dificultad: "media", opciones: ["Un andamio metálico de tubos y elementos normalizados", "Un andamio elemental de caballetes y tablones", "Una plataforma elevadora autopropulsada", "Un sistema de izado de cargas mediante grúa"], correcta: 0 },
  { enunciado: "¿Qué es una plataforma elevadora móvil de personal (PEMP)?", explicacion: "Una máquina que eleva una plataforma de trabajo mediante brazo articulado, telescópico o tijera.", dificultad: "media", opciones: ["Una máquina que eleva una plataforma mediante brazo o tijera", "Un andamio de borriquetas reforzado", "Un tipo de escalera de mano extensible", "Un sistema de ventilación en altura"], correcta: 0 },
  { enunciado: "¿Qué debe hacerse tras un período de no utilización de un andamio antes de volver a usarlo?", explicacion: "Volver a inspeccionarlo por una persona competente.", dificultad: "media", opciones: ["Inspeccionarlo de nuevo por una persona competente", "Desmontarlo y montar uno nuevo obligatoriamente", "No es necesaria ninguna comprobación adicional", "Solo revisar visualmente desde el suelo"], correcta: 0 },
]);

const S2 = "escaleras-mano-caidas-altura";
console.log(`📝 flashcards (${S2})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Qué norma regula las condiciones de diseño y utilización de las escaleras de mano en obras de construcción, según remite el propio RD 1627/1997?", reverso: "El Real Decreto 486/1997, de 14 de abril, por el que se establecen las disposiciones mínimas de seguridad y salud en los lugares de trabajo" },
    { anverso: "¿A partir de qué altura de caída exige el RD 1627/1997 proteger mediante barandillas u otro sistema equivalente los desniveles, huecos y aberturas en los pisos de una obra?", reverso: "A partir de un riesgo de caída de altura superior a 2 metros" },
    { anverso: "¿Qué características mínimas exige el RD 1627/1997 a las barandillas de protección frente a caídas de altura?", reverso: "Ser resistentes, tener una altura mínima de 90 centímetros y disponer de un reborde de protección, un pasamanos y una protección intermedia que impidan el paso o deslizamiento de los trabajadores" },
    { anverso: "¿Qué exige el RD 1627/1997 cuando, por la naturaleza del trabajo en altura, no sea posible usar equipos de protección colectiva?", reverso: "Debe disponerse de medios de acceso seguros y utilizarse cinturones de seguridad con anclaje u otros medios de protección equivalente" },
    { anverso: "¿Qué debe verificarse antes y periódicamente durante el uso de los elementos de soporte y protección frente a caídas de altura?", reverso: "Su estabilidad, solidez y buen estado, tanto previamente a su uso como de forma periódica y cada vez que sus condiciones de seguridad puedan verse afectadas" },
    { anverso: "¿Qué es una escalera de tijera?", reverso: "Una escalera de mano autoportante, formada por dos planos articulados en la parte superior, que no necesita apoyarse en otro elemento y se emplea para trabajos de poca altura de corta duración" },
    { anverso: "¿Qué ángulo de inclinación aproximado se considera adecuado para una escalera de mano apoyada (de un solo plano)?", reverso: "En torno a 75º respecto a la horizontal (relación aproximada de separación de la base de 1 por cada 4 de altura), para garantizar su estabilidad sin riesgo de vuelco" },
    { anverso: "¿Qué precaución debe adoptarse al usar una escalera de mano para acceder a una superficie superior?", reverso: "La escalera debe sobresalir al menos 1 metro por encima del punto de apoyo o desembarco, para facilitar un acceso seguro" },
    { anverso: "¿Qué EPI es habitual emplear como protección individual frente a caídas de altura cuando no es posible la protección colectiva?", reverso: "El arnés anticaídas, conectado mediante un elemento de amarre a un punto de anclaje resistente" },
    { anverso: "¿Por qué las escaleras de mano no se consideran un puesto de trabajo habitual sino un medio de acceso?", reverso: "Porque su uso continuado como puesto de trabajo en altura implica mayor riesgo de caída que otros medios auxiliares (andamios, plataformas), por lo que su empleo debe limitarse a trabajos de corta duración y bajo riesgo" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })),
);

console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué RD regula las condiciones de diseño y utilización de las escaleras de mano, según remite el RD 1627/1997?", explicacion: "El RD 486/1997, de lugares de trabajo.", dificultad: "media", opciones: ["El RD 486/1997", "El RD 1215/1997", "El RD 396/2006", "El RD 485/1997"], correcta: 0 },
  { enunciado: "¿A partir de qué altura de caída exige el RD 1627/1997 proteger los huecos y aberturas en los pisos de una obra?", explicacion: "A partir de un riesgo de caída superior a 2 metros.", dificultad: "media", opciones: ["Superior a 2 metros", "Superior a 1 metro", "Superior a 5 metros", "Cualquier altura, sin excepción"], correcta: 0 },
  { enunciado: "¿Qué altura mínima exige el RD 1627/1997 a las barandillas de protección?", explicacion: "90 centímetros como mínimo.", dificultad: "media", opciones: ["90 centímetros", "70 centímetros", "120 centímetros", "50 centímetros"], correcta: 0 },
  { enunciado: "¿Qué debe usarse cuando no sea posible disponer de protección colectiva en un trabajo en altura?", explicacion: "Medios de acceso seguros y cinturones de seguridad con anclaje u otros medios equivalentes.", dificultad: "media", opciones: ["Cinturones de seguridad con anclaje", "Ninguna medida adicional es necesaria", "Solo casco de protección", "Guantes de protección mecánica"], correcta: 0 },
  { enunciado: "¿Cuándo debe verificarse la estabilidad y solidez de los elementos de protección frente a caídas de altura?", explicacion: "Antes de su uso, periódicamente y ante cualquier circunstancia que afecte a su seguridad.", dificultad: "media", opciones: ["Antes de su uso, periódicamente y ante incidencias", "Solo una vez, al instalarlos por primera vez", "Únicamente al final de la obra", "Nunca, si son de fabricación certificada"], correcta: 0 },
  { enunciado: "¿Qué es una escalera de tijera?", explicacion: "Una escalera autoportante de dos planos articulados que no necesita apoyarse en otro elemento.", dificultad: "media", opciones: ["Una escalera autoportante de dos planos articulados", "Una escalera de un solo plano apoyada en un muro", "Un tipo de andamio tubular modular", "Una plataforma elevadora de tijera"], correcta: 0 },
  { enunciado: "¿Cuánto debe sobresalir una escalera de mano por encima del punto de desembarco?", explicacion: "Al menos 1 metro.", dificultad: "media", opciones: ["Al menos 1 metro", "Al menos 3 metros", "No es necesario que sobresalga", "Al menos 20 centímetros"], correcta: 0 },
  { enunciado: "¿Qué EPI se emplea habitualmente frente a caídas de altura cuando no cabe protección colectiva?", explicacion: "El arnés anticaídas conectado a un punto de anclaje resistente.", dificultad: "facil", opciones: ["El arnés anticaídas", "El calzado de seguridad exclusivamente", "Los guantes de protección mecánica", "Las gafas de protección ocular"], correcta: 0 },
]);

const S3 = "espacios-confinados-izado-cargas";
console.log(`📝 flashcards (${S3})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Qué es un espacio confinado, en materia de prevención de riesgos laborales?", reverso: "Un recinto con aberturas limitadas de entrada y salida, ventilación natural desfavorable, no concebido para una ocupación continuada, en el que pueden acumularse contaminantes tóxicos o inflamables, o darse una atmósfera con deficiencia de oxígeno" },
    { anverso: "Cita ejemplos de espacios confinados habituales en obras de albañilería o instalaciones", reverso: "Arquetas y pozos de registro profundos, depósitos, cámaras de instalaciones, galerías de servicios y zanjas de gran profundidad con acceso restringido" },
    { anverso: "¿Qué riesgo específico caracteriza a los espacios confinados frente a otros lugares de trabajo?", reverso: "El riesgo de asfixia por deficiencia de oxígeno, intoxicación por gases o vapores acumulados, y la dificultad añadida para el rescate de un trabajador afectado" },
    { anverso: "¿Qué medida preventiva básica debe adoptarse antes de entrar a un espacio confinado?", reverso: "Comprobar la atmósfera interior (medición de oxígeno y de posibles gases tóxicos o explosivos) y garantizar una ventilación adecuada antes y durante la permanencia en su interior" },
    { anverso: "¿Qué exige el RD 1627/1997 sobre los aparatos elevadores y accesorios de izado utilizados en las obras?", reverso: "Que se ajusten a su normativa específica; en todo caso, deben ser de buen diseño y construcción, tener resistencia suficiente para el uso al que estén destinados, instalarse y utilizarse correctamente, y mantenerse en buen estado de funcionamiento" },
    { anverso: "¿Qué requisito de formación exige el RD 1627/1997 a los trabajadores que manejan aparatos elevadores?", reverso: "Que sean trabajadores cualificados que hayan recibido una formación adecuada" },
    { anverso: "¿Qué debe indicarse de forma visible en los aparatos elevadores y accesorios de izado, según el RD 1627/1997?", reverso: "El valor de su carga máxima" },
    { anverso: "¿Para qué pueden utilizarse los aparatos elevadores y sus accesorios, según el RD 1627/1997?", reverso: "Únicamente para los fines a los que estén destinados, sin poder emplearse para usos distintos" },
    { anverso: "¿Qué medio de izado de cargas es habitual en obras de albañilería para elevar materiales a plantas superiores?", reverso: "La grúa torre, el montacargas de obra y, para cargas menores, la polea o el cabrestante manual o eléctrico" },
    { anverso: "¿Por qué es especialmente crítica la vigilancia de un trabajador que accede a un espacio confinado?", reverso: "Porque en caso de pérdida de conocimiento por asfixia o intoxicación, el rescate debe ser inmediato; se recomienda mantener un vigilante en el exterior y usar equipos de comunicación y, en su caso, arnés de rescate" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })),
);

console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es un espacio confinado?", explicacion: "Un recinto con aberturas limitadas, ventilación desfavorable y riesgo de acumulación de contaminantes o deficiencia de oxígeno.", dificultad: "media", opciones: ["Un recinto con aberturas limitadas y riesgo de deficiencia de oxígeno", "Cualquier local cerrado con puerta y ventana", "Un tajo situado a más de 2 m de altura", "Un almacén de materiales de obra"], correcta: 0 },
  { enunciado: "¿Cuál es el riesgo específico más característico de los espacios confinados?", explicacion: "Asfixia por deficiencia de oxígeno o intoxicación por gases acumulados.", dificultad: "media", opciones: ["Asfixia o intoxicación por gases acumulados", "Caída desde gran altura exclusivamente", "Electrocución por contacto directo", "Golpe por objetos desprendidos"], correcta: 0 },
  { enunciado: "¿Qué debe comprobarse antes de entrar en un espacio confinado?", explicacion: "La atmósfera interior (oxígeno y gases) y garantizar ventilación adecuada.", dificultad: "media", opciones: ["La atmósfera interior y la ventilación adecuada", "Únicamente la iluminación disponible", "Solo la temperatura ambiente", "Exclusivamente el ruido del entorno"], correcta: 0 },
  { enunciado: "¿Qué exige el RD 1627/1997 sobre los aparatos elevadores utilizados en obra?", explicacion: "Buen diseño, resistencia suficiente, instalación correcta y mantenimiento en buen estado.", dificultad: "media", opciones: ["Buen diseño, resistencia suficiente y buen mantenimiento", "Que sean siempre de fabricación artesanal", "Que no requieran indicación de carga máxima", "Que puedan usarse para cualquier fin no previsto"], correcta: 0 },
  { enunciado: "¿Qué requisito de formación exige el RD 1627/1997 a quienes manejan aparatos elevadores?", explicacion: "Ser trabajadores cualificados con formación adecuada.", dificultad: "media", opciones: ["Ser trabajadores cualificados con formación adecuada", "No se exige formación específica alguna", "Solo se exige mayoría de edad", "Basta con la supervisión de un compañero"], correcta: 0 },
  { enunciado: "¿Qué debe indicarse de forma visible en un aparato elevador según el RD 1627/1997?", explicacion: "El valor de su carga máxima.", dificultad: "media", opciones: ["El valor de su carga máxima", "El nombre del fabricante únicamente", "La fecha de fabricación exclusivamente", "El color reglamentario de seguridad"], correcta: 0 },
  { enunciado: "¿Para qué pueden emplearse los aparatos elevadores y sus accesorios según el RD 1627/1997?", explicacion: "Únicamente para los fines a los que estén destinados.", dificultad: "media", opciones: ["Únicamente para los fines a los que estén destinados", "Para cualquier uso que decida el operario", "Solo para elevar personas, nunca materiales", "Exclusivamente en horario nocturno"], correcta: 0 },
  { enunciado: "¿Qué medida de seguridad se recomienda al acceder a un espacio confinado por el riesgo de rescate?", explicacion: "Mantener un vigilante en el exterior con comunicación y, en su caso, arnés de rescate.", dificultad: "dificil", opciones: ["Mantener un vigilante exterior con comunicación", "No es necesaria ninguna vigilancia adicional", "Bastar con cerrar la entrada tras el acceso", "Trabajar siempre en solitario para mayor rapidez"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 19 de ${OPOSICION}...`);
await upsert(
  "tema_oposicion",
  [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 19, orden: 19, es_premium: false, publicado: true, secciones_incluidas: null }],
  "tema_slug,oposicion_slug"
);

console.log("\n✅ tema-57 creado y vinculado como Tema 19 de Oficial Albañil.");
