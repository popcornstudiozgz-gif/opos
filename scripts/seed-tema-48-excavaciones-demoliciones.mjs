/**
 * Crea el tema canónico tema-48: "Excavaciones en zanjas, acodalamientos y
 * entibaciones. Demolición de pavimentos, fábricas, tabiquería y
 * revestimientos" y lo asigna como Tema 10 (bloque-2) de la oposición
 * Oficial Albañil (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 8 oficial del Anexo I (bases2110.pdf): "Excavaciones
 * en zanjas, acodalamientos y entibaciones. Demolición de pavimentos,
 * fábricas, tabiquería y revestimientos. Procedimiento PPRL 1606 del
 * Ayuntamiento de Zaragoza para ejecución de zanjas."
 *
 * Fuente primaria: Real Decreto 1627/1997, de 24 de octubre, por el que se
 * establecen disposiciones mínimas de seguridad y de salud en las obras de
 * construcción (BOE-A-1997-22614), Anexo IV, Parte C (texto descargado y
 * leído íntegro en este turno, scripts/tmp-fuentes/rd1627-1997.txt):
 * apartado 9 ("Movimientos de tierras, excavaciones, pozos, trabajos
 * subterráneos y túneles") y apartado 12.a ("Otros trabajos específicos":
 * derribo o demolición).
 *
 * AVISO IMPORTANTE — el "Procedimiento PPRL-1606 del Ayuntamiento de
 * Zaragoza para ejecución de zanjas" citado expresamente en el enunciado
 * oficial del tema es un documento INTERNO de prevención de riesgos
 * laborales del propio Ayuntamiento, no publicado en ningún boletín
 * oficial ni accesible en su sede electrónica. NO se ha podido localizar
 * ni verificar su contenido, y por tanto NO se ha fabricado ni inventado
 * texto alguno en su nombre. Se señala expresamente esta laguna en el
 * tema (sección 3) en vez de simular contenido que no puede verificarse;
 * quien opte a la plaza deberá obtenerlo por los cauces internos del
 * propio proceso selectivo o, en su caso, mediante solicitud de acceso a
 * la información pública (Ley 19/2013).
 *
 * Tres secciones:
 * 1. excavaciones-zanjas-tipos — conceptos y tipos de excavación (zanja,
 *    pozo) y precauciones generales según el RD 1627/1997.
 * 2. entibaciones-apuntalamientos-taludes — entibación cuajada, ligera y
 *    semicuajada, blindaje, apeo y taludes.
 * 3. demolicion-pavimentos-fabricas-revestimientos — tipos y método de
 *    demolición, y el aviso sobre el procedimiento interno PPRL-1606.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-48-excavaciones-demoliciones.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!URL_BASE || !SERVICE_KEY) {
  console.error("❌ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-48";
const OPOSICION = "oficial-albanil-ayto-zaragoza";
const BLOQUE_2_ID = "11fb28dc-2b37-42bb-ae51-aeb7421e298c";
const RD_1627_1997 = "https://www.boe.es/buscar/act.php?id=BOE-A-1997-22614";

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

// ─────────────────────────────────────────────────────────────────────────
// Tema canónico
// ─────────────────────────────────────────────────────────────────────────
console.log(`📚 Creando ${TEMA}...`);
await insertar("temas", [
  {
    slug: TEMA,
    titulo: "Excavaciones en zanjas y entibaciones. Demolición de pavimentos, fábricas y revestimientos",
    descripcion:
      "Excavaciones en zanjas, acodalamientos y entibaciones. Demolición de pavimentos, fábricas, tabiquería y revestimientos. Procedimiento PPRL-1606 del Ayuntamiento de Zaragoza para ejecución de zanjas.",
    contenido:
      "Desarrolla los tipos de excavación (zanjas, pozos), los sistemas de contención de tierras (entibación cuajada, ligera y semicuajada, blindaje, apeo y taludes) y las precauciones exigidas por el RD 1627/1997 en movimientos de tierras y excavaciones, así como los tipos y métodos de demolición de pavimentos, fábricas, tabiquería y revestimientos. El procedimiento interno PPRL-1606 del Ayuntamiento de Zaragoza para ejecución de zanjas, citado expresamente en el temario oficial, es un documento interno no publicado que no ha podido verificarse ni reproducirse: se señala esta laguna de forma expresa en la sección 3.",
    enlaces_boe: [
      { url: RD_1627_1997, titulo: "RD 1627/1997 — Disposiciones mínimas de seguridad y salud en las obras de construcción (Anexo IV, Parte C)" },
    ],
    indice_estudio: [
      { url: RD_1627_1997, titulo: "Excavaciones: conceptos y tipos", seccion: "excavaciones-zanjas-tipos", articulos: "Anexo IV, Parte C, apdo. 9" },
      { url: "", titulo: "Entibaciones, apuntalamientos y taludes", seccion: "entibaciones-apuntalamientos-taludes", articulos: "Anexo IV, Parte C, apdo. 9.1º" },
      { url: RD_1627_1997, titulo: "Demolición de pavimentos, fábricas y revestimientos; aviso sobre el PPRL-1606", seccion: "demolicion-pavimentos-fabricas-revestimientos", articulos: "Anexo IV, Parte C, apdo. 12.a" },
    ],
  },
]);

// ─────────────────────────────────────────────────────────────────────────
// Sección 1: excavaciones-zanjas-tipos
// ─────────────────────────────────────────────────────────────────────────
const S1 = "excavaciones-zanjas-tipos";
console.log(`📝 flashcards (${S1})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Qué es una zanja?", reverso: "Una excavación alargada y estrecha en relación con su longitud, abierta generalmente para alojar cimentaciones corridas, tuberías o conducciones" },
    { anverso: "¿Qué es un pozo, a efectos de excavación?", reverso: "Una excavación de planta reducida y considerable profundidad respecto a sus dimensiones en planta, empleada por ejemplo para cimentaciones puntuales o registros" },
    { anverso: "¿Qué debe hacerse antes de comenzar cualquier trabajo de movimiento de tierras, según el RD 1627/1997?", reverso: "Tomar medidas para localizar y reducir al mínimo los peligros debidos a cables subterráneos y demás sistemas de distribución (agua, gas, electricidad, telecomunicaciones)" },
    { anverso: "¿Qué precauciones exige el RD 1627/1997 en excavaciones, pozos, trabajos subterráneos o túneles frente al riesgo de sepultamiento?", reverso: "Sistemas de entibación, blindaje, apeo, taludes u otras medidas adecuadas para prevenir desprendimientos de tierras y caídas de personas, tierras, materiales u objetos" },
    { anverso: "¿Qué otras precauciones exige el RD 1627/1997 en excavaciones además de evitar el sepultamiento?", reverso: "Prevenir la irrupción accidental de agua, garantizar ventilación suficiente, permitir que los trabajadores puedan ponerse a salvo ante incendio, agua o caída de materiales, y prever vías seguras de entrada y salida" },
    { anverso: "¿Qué medida exige el RD 1627/1997 respecto a las acumulaciones de tierras o materiales cerca de una excavación?", reverso: "Mantenerlas alejadas de la excavación o tomar medidas adecuadas (por ejemplo, barreras) para evitar su caída en ella o el derrumbamiento del terreno" },
    { anverso: "¿Qué son los acodalamientos en una zanja?", reverso: "Elementos de arriostramiento horizontal (codales) que transmiten el empuje de las paredes de la entibación de un lado de la zanja al opuesto, manteniendo la separación y estabilidad de ambas caras" },
    { anverso: "¿Qué factor del terreno condiciona principalmente el sistema de contención necesario en una excavación?", reverso: "La cohesión y consistencia del terreno: terrenos poco consistentes o sueltos requieren entibaciones más cerradas, mientras que terrenos muy cohesivos pueden admitir taludes sin entibar" },
    { anverso: "¿Por qué son especialmente peligrosas las zanjas de escasa anchura y considerable profundidad?", reverso: "Porque el riesgo de sepultamiento por desprendimiento de tierras es mayor y el espacio para escapar o para instalar medios de contención es más reducido" },
    { anverso: "¿Qué norma establece las disposiciones mínimas de seguridad en excavaciones dentro de obras de construcción?", reverso: "El Real Decreto 1627/1997, de 24 de octubre, en su Anexo IV, Parte C, apartado 9" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })),
);

console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es una zanja?", explicacion: "Una excavación alargada y estrecha respecto a su longitud, para cimentaciones corridas o conducciones.", dificultad: "facil", opciones: ["Una excavación alargada y estrecha respecto a su longitud", "Una excavación de planta reducida y gran profundidad", "Un tipo de cimentación superficial", "Un sistema de entibación metálico"], correcta: 0 },
  { enunciado: "¿Qué debe hacerse antes de iniciar un movimiento de tierras según el RD 1627/1997?", explicacion: "Localizar y reducir al mínimo los peligros por cables subterráneos y otros sistemas de distribución.", dificultad: "media", opciones: ["Localizar y reducir los peligros de cables subterráneos y redes de distribución", "Solicitar únicamente el certificado de profesionalidad del oficial", "Redactar el cuadro de precios de la obra", "Contratar un seguro de responsabilidad civil"], correcta: 0 },
  { enunciado: "Según el RD 1627/1997, ¿qué medidas se exigen frente al riesgo de sepultamiento en excavaciones?", explicacion: "Sistemas de entibación, blindaje, apeo, taludes u otras medidas adecuadas.", dificultad: "media", opciones: ["Entibación, blindaje, apeo, taludes u otras medidas adecuadas", "Únicamente el uso de casco de protección", "Solo la señalización perimetral", "Exclusivamente vigilancia de un técnico"], correcta: 0 },
  { enunciado: "¿Qué otro riesgo, además del sepultamiento, debe prevenirse en excavaciones y pozos según el RD 1627/1997?", explicacion: "La irrupción accidental de agua.", dificultad: "media", opciones: ["La irrupción accidental de agua", "El exceso de humedad en el mortero", "La corrosión de las armaduras", "El fraguado prematuro del hormigón"], correcta: 0 },
  { enunciado: "¿Qué exige el RD 1627/1997 respecto a las vías de entrada y salida de una excavación?", explicacion: "Deben preverse vías seguras para entrar y salir de la excavación.", dificultad: "media", opciones: ["Deben preverse vías seguras de entrada y salida", "No es necesario si la excavación es poco profunda", "Solo se exigen en pozos, no en zanjas", "Deben coincidir siempre con la rampa de acceso de vehículos"], correcta: 0 },
  { enunciado: "¿Qué son los acodalamientos en una zanja entibada?", explicacion: "Elementos que arriostran horizontalmente ambas caras de la entibación transmitiendo el empuje de una a otra.", dificultad: "media", opciones: ["Elementos de arriostramiento horizontal entre ambas caras de la entibación", "Piezas cerámicas usadas en fábricas vistas", "Un tipo de mortero de agarre", "El sistema de drenaje del fondo de la zanja"], correcta: 0 },
  { enunciado: "¿Qué factor condiciona principalmente el sistema de contención necesario en una excavación?", explicacion: "La cohesión y consistencia del terreno.", dificultad: "media", opciones: ["La cohesión y consistencia del terreno", "El color del terreno excavado", "El precio del metro cúbico de excavación", "La orientación de la fachada del edificio"], correcta: 0 },
  { enunciado: "¿Qué norma regula las disposiciones mínimas de seguridad en movimientos de tierras y excavaciones en obras de construcción?", explicacion: "El RD 1627/1997, Anexo IV, Parte C, apartado 9.", dificultad: "dificil", opciones: ["El RD 1627/1997", "La Ley 31/1995 de Prevención de Riesgos Laborales exclusivamente", "El Código Técnico de la Edificación", "El RD 486/1997 de lugares de trabajo"], correcta: 0 },
]);

// ─────────────────────────────────────────────────────────────────────────
// Sección 2: entibaciones-apuntalamientos-taludes
// ─────────────────────────────────────────────────────────────────────────
const S2 = "entibaciones-apuntalamientos-taludes";
console.log(`📝 flashcards (${S2})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Qué es la entibación de una zanja o pozo?", reverso: "El conjunto de elementos (paneles, tablones, codales, puntales) que sostienen y contienen las paredes de una excavación para evitar su desprendimiento" },
    { anverso: "¿Qué es una entibación cuajada?", reverso: "La que cubre de forma continua toda la superficie de las paredes de la excavación, sin dejar huecos; se emplea en terrenos poco consistentes o sueltos" },
    { anverso: "¿Qué es una entibación ligera?", reverso: "La que se coloca solo en puntos determinados de las paredes de la excavación, dejando huecos entre los elementos de contención; se emplea en terrenos de mayor consistencia" },
    { anverso: "¿Qué es una entibación semicuajada?", reverso: "Una solución intermedia entre la entibación cuajada y la ligera, que cubre la mayor parte de la superficie de las paredes dejando algunos huecos" },
    { anverso: "¿Qué es el blindaje de una zanja?", reverso: "Un sistema de contención de tierras mediante paneles metálicos (a menudo prefabricados e hincados o desplegados hidráulicamente) que sustituye a la entibación tradicional de madera, permitiendo un montaje más rápido y seguro" },
    { anverso: "¿Qué es un apeo en el contexto de excavaciones o intervenciones en construcciones existentes?", reverso: "Un apuntalamiento provisional que sostiene un elemento constructivo (muro, forjado, cimentación) mientras se ejecutan trabajos que podrían comprometer su estabilidad" },
    { anverso: "¿Qué es un talud, como alternativa a la entibación?", reverso: "El corte del terreno en pendiente, sin elementos de contención, cuyo ángulo debe ser lo suficientemente tendido para que el terreno se mantenga estable por sí mismo según su naturaleza y cohesión" },
    { anverso: "¿Por qué un talud en terreno poco cohesivo debe ser más tendido (menos vertical) que uno en terreno cohesivo?", reverso: "Porque el terreno poco cohesivo tiene menor capacidad de mantenerse estable por sí mismo, por lo que necesita una pendiente menor para evitar desprendimientos" },
    { anverso: "¿Qué comprobaciones deben hacerse sobre los elementos de entibación antes y durante su uso?", reverso: "Verificar su estabilidad y solidez antes de su puesta en servicio, de forma periódica posteriormente, y cada vez que sus condiciones de seguridad puedan verse afectadas por modificaciones u otras circunstancias" },
    { anverso: "¿Qué relación hay entre la profundidad de una zanja y el riesgo que exige adoptar medidas de contención?", reverso: "A mayor profundidad de la zanja, mayor es el riesgo de desprendimiento y sepultamiento, por lo que resulta más necesario adoptar entibación, blindaje u otras medidas de contención adecuadas" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })),
);

console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es la entibación de una zanja?", explicacion: "El conjunto de elementos que sostienen y contienen las paredes de una excavación.", dificultad: "facil", opciones: ["El conjunto de elementos que sostienen las paredes de la excavación", "El relleno posterior de la zanja con grava-cemento", "El sistema de riego de una obra de jardinería", "Un tipo de cimentación superficial"], correcta: 0 },
  { enunciado: "¿Qué caracteriza a la entibación cuajada?", explicacion: "Cubre de forma continua toda la superficie de las paredes, sin huecos, para terrenos poco consistentes.", dificultad: "media", opciones: ["Cubre de forma continua toda la superficie, sin huecos", "Solo se coloca en puntos determinados dejando huecos", "Se emplea exclusivamente en pozos, nunca en zanjas", "Sustituye siempre al talud en cualquier terreno"], correcta: 0 },
  { enunciado: "¿En qué tipo de terreno es más adecuada una entibación ligera?", explicacion: "En terrenos de mayor consistencia, donde no es necesario cubrir toda la superficie.", dificultad: "media", opciones: ["En terrenos de mayor consistencia", "En terrenos sueltos o poco consistentes", "Únicamente en terrenos rocosos", "Nunca se usa en zanjas de albañilería"], correcta: 0 },
  { enunciado: "¿Qué es el blindaje de una zanja?", explicacion: "Un sistema de contención con paneles metálicos, alternativa a la entibación tradicional de madera.", dificultad: "media", opciones: ["Un sistema de contención con paneles metálicos", "Un tratamiento anticorrosión del terreno", "Un tipo de mortero impermeabilizante", "Un sistema de drenaje profundo"], correcta: 0 },
  { enunciado: "¿Qué es un apeo?", explicacion: "Un apuntalamiento provisional que sostiene un elemento constructivo existente durante una intervención.", dificultad: "media", opciones: ["Un apuntalamiento provisional de un elemento existente", "Un tipo de entibación exclusivo de pozos", "Un documento del plan de seguridad y salud", "Una unidad de medición de excavaciones"], correcta: 0 },
  { enunciado: "¿Qué es un talud como alternativa a la entibación?", explicacion: "El corte del terreno en pendiente, sin elementos de contención, con un ángulo adecuado a su estabilidad natural.", dificultad: "facil", opciones: ["El corte del terreno en pendiente sin elementos de contención", "Un panel metálico hincado en el terreno", "Un elemento de arriostramiento horizontal", "Un tipo de cimentación profunda"], correcta: 0 },
  { enunciado: "¿Por qué un talud en terreno poco cohesivo debe ser más tendido que en terreno cohesivo?", explicacion: "Porque tiene menor capacidad de mantenerse estable por sí mismo.", dificultad: "media", opciones: ["Porque tiene menor capacidad de mantenerse estable por sí mismo", "Porque siempre es más barato de excavar", "Porque así se reduce el volumen de excavación", "Porque lo exige únicamente el pliego de condiciones"], correcta: 0 },
  { enunciado: "¿Cuándo deben verificarse la estabilidad y solidez de los elementos de entibación según el RD 1627/1997?", explicacion: "Antes de su puesta en servicio, periódicamente después, y ante cualquier circunstancia que pueda afectar a su seguridad.", dificultad: "dificil", opciones: ["Antes de su puesta en servicio, periódicamente y tras cualquier incidencia", "Solo una vez, al finalizar la obra", "Únicamente si lo solicita el promotor", "Nunca, si el fabricante certifica el sistema"], correcta: 0 },
]);

// ─────────────────────────────────────────────────────────────────────────
// Sección 3: demolicion-pavimentos-fabricas-revestimientos
// ─────────────────────────────────────────────────────────────────────────
const S3 = "demolicion-pavimentos-fabricas-revestimientos";
console.log(`📝 flashcards (${S3})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Qué exige el RD 1627/1997 para los trabajos de derribo o demolición que puedan suponer un peligro para los trabajadores?", reverso: "Que se estudien, planifiquen y emprendan bajo la supervisión de una persona competente, adoptando las precauciones, métodos y procedimientos apropiados" },
    { anverso: "¿Qué diferencia hay entre demolición manual y demolición mecánica?", reverso: "La manual se ejecuta con herramientas de mano (martillo, maza, cincel) y es propia de elementos pequeños o de entornos con poco espacio; la mecánica emplea maquinaria (martillo picador, retroexcavadora con pinza o martillo hidráulico) para grandes volúmenes" },
    { anverso: "¿Qué precauciones específicas requiere la demolición de un pavimento existente antes de intervenir bajo él?", reverso: "Comprobar la posible existencia de instalaciones enterradas (agua, gas, electricidad) y delimitar y señalizar la zona antes de picar o levantar el pavimento" },
    { anverso: "¿Qué es la demolición de fábricas?", reverso: "El derribo de elementos construidos con piezas de albañilería (ladrillo, bloque, piedra) tomadas con mortero, que puede requerir apeo previo si la fábrica es portante o soporta cargas de elementos superiores" },
    { anverso: "¿Qué precaución debe tenerse al demoler tabiquería en un edificio en uso?", reverso: "Comprobar que la tabiquería a derribar no es portante ni contiene instalaciones activas, proteger las zonas colindantes y controlar el polvo y los ruidos generados" },
    { anverso: "¿Qué se entiende por demolición de revestimientos?", reverso: "La retirada de los materiales que recubren un paramento (enfoscados, alicatados, pinturas, aplacados) para dejar el soporte visto, previa a su sustitución o reparación" },
    { anverso: "¿Por qué el orden de la demolición es importante en una obra de rehabilitación?", reverso: "Porque una secuencia incorrecta puede comprometer la estabilidad de elementos que dependen de otros (por ejemplo, retirar un elemento portante antes de apear la carga que soporta)" },
    { anverso: "¿Qué documento cita expresamente el temario oficial de Oficial Albañil como procedimiento interno del Ayuntamiento de Zaragoza para la ejecución de zanjas?", reverso: "El procedimiento PPRL-1606" },
    { anverso: "¿Es de acceso público el procedimiento PPRL-1606 del Ayuntamiento de Zaragoza para ejecución de zanjas?", reverso: "No. Es un documento interno de prevención de riesgos laborales del propio Ayuntamiento, no publicado en boletines oficiales ni en su sede electrónica; su contenido concreto no puede verificarse ni reproducirse aquí" },
    { anverso: "¿Con qué normativa general de seguridad en excavaciones se relaciona previsiblemente el contenido de un procedimiento interno como el PPRL-1606?", reverso: "Con las disposiciones del RD 1627/1997 (Anexo IV, Parte C, apartado 9) sobre movimientos de tierras y excavaciones, que todo procedimiento interno de una Administración pública debe respetar como mínimo legal" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })),
);

console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué exige el RD 1627/1997 para los trabajos de derribo o demolición que puedan suponer un peligro?", explicacion: "Que se estudien, planifiquen y emprendan bajo la supervisión de una persona competente.", dificultad: "media", opciones: ["Que se estudien, planifiquen y supervisen por persona competente", "Que se realicen siempre de forma manual", "Que se comuniquen únicamente al Ayuntamiento", "Que se ejecuten fuera del horario laboral"], correcta: 0 },
  { enunciado: "¿Qué diferencia hay entre demolición manual y mecánica?", explicacion: "La manual usa herramientas de mano; la mecánica emplea maquinaria para grandes volúmenes.", dificultad: "facil", opciones: ["La manual usa herramientas de mano, la mecánica maquinaria", "Son términos sinónimos e intercambiables", "La mecánica solo se aplica a tabiquería interior", "La manual solo se aplica a pavimentos exteriores"], correcta: 0 },
  { enunciado: "¿Qué debe comprobarse antes de picar o levantar un pavimento existente?", explicacion: "La posible existencia de instalaciones enterradas.", dificultad: "media", opciones: ["La posible existencia de instalaciones enterradas", "El color del pavimento original", "El precio de mercado del material a retirar", "La fecha de construcción exacta del edificio"], correcta: 0 },
  { enunciado: "¿Cuándo puede requerir apeo previo la demolición de una fábrica?", explicacion: "Cuando la fábrica es portante o soporta cargas de elementos superiores.", dificultad: "media", opciones: ["Cuando la fábrica es portante o soporta cargas superiores", "Siempre, sin excepción, aunque no sea portante", "Nunca, el apeo solo se usa en cimentaciones", "Solo si la fábrica es de mampostería"], correcta: 0 },
  { enunciado: "¿Por qué es importante el orden de demolición en una rehabilitación?", explicacion: "Porque una secuencia incorrecta puede comprometer la estabilidad de elementos dependientes entre sí.", dificultad: "media", opciones: ["Porque una secuencia incorrecta puede comprometer la estabilidad", "Porque determina el precio final de la obra", "Porque lo exige exclusivamente el pliego administrativo", "Porque no tiene ninguna relevancia técnica"], correcta: 0 },
  { enunciado: "¿Qué procedimiento interno del Ayuntamiento de Zaragoza cita expresamente el temario oficial de Oficial Albañil para la ejecución de zanjas?", explicacion: "El PPRL-1606, citado en el Anexo I de las bases.", dificultad: "facil", opciones: ["El PPRL-1606", "El PPRL-1602", "El PPRL-1605", "El PPRL-1608"], correcta: 0 },
  { enunciado: "¿Está publicado el contenido del procedimiento PPRL-1606 en el BOE, el BOPZ o la sede electrónica del Ayuntamiento de Zaragoza?", explicacion: "No; es un documento interno de prevención de riesgos laborales no publicado, cuyo contenido concreto no puede verificarse aquí.", dificultad: "media", opciones: ["No, es un documento interno no publicado", "Sí, está publicado íntegramente en el BOE", "Sí, figura como anexo de las bases específicas", "Sí, se publica cada año junto a la convocatoria"], correcta: 0 },
  { enunciado: "¿Qué normativa general de seguridad en excavaciones debe respetar como mínimo cualquier procedimiento interno de una Administración pública sobre ejecución de zanjas?", explicacion: "El RD 1627/1997, Anexo IV, Parte C, apartado 9.", dificultad: "dificil", opciones: ["El RD 1627/1997 sobre seguridad en obras de construcción", "El Código Técnico de la Edificación exclusivamente", "La Ley de Contratos del Sector Público", "El Reglamento Electrotécnico de Baja Tensión"], correcta: 0 },
]);

// ─────────────────────────────────────────────────────────────────────────
// Vincular a la oposición (Tema 10)
// ─────────────────────────────────────────────────────────────────────────
console.log(`\n🔗 Vinculando ${TEMA} como Tema 10 de ${OPOSICION}...`);
await upsert(
  "tema_oposicion",
  [
    {
      tema_slug: TEMA,
      oposicion_slug: OPOSICION,
      bloque_id: BLOQUE_2_ID,
      numero: 10,
      orden: 10,
      es_premium: false,
      publicado: true,
      secciones_incluidas: null,
    },
  ],
  "tema_slug,oposicion_slug"
);

console.log("\n✅ tema-48 creado y vinculado como Tema 10 de Oficial Albañil.");
