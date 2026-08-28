/**
 * Crea el tema canónico tema-53: "Cubiertas inclinadas y planas. Terrazas"
 * y lo asigna como Tema 15 (bloque-2) de la oposición Oficial Albañil
 * (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 13 oficial del Anexo I (bases2110.pdf).
 *
 * Fuente primaria: Código Técnico de la Edificación (CTE), Documento
 * Básico HS Salubridad, apartado 2.4 "Cubiertas" (RD 314/2006 y sus
 * modificaciones). Texto descargado y leído íntegro en este turno
 * (scripts/tmp-fuentes/cte-hs1-cubiertas.pdf): grado de impermeabilidad,
 * elementos que deben componer una cubierta (formación de pendientes,
 * barrera de vapor, aislante térmico, capa de impermeabilización, capa de
 * protección, tejado), pendientes mínimas de cubiertas planas (tabla 2.9)
 * e inclinadas según el tipo de teja o placa (tabla 2.10), y condiciones
 * de los puntos singulares (juntas de dilatación, encuentro con paramento
 * vertical, sumideros y canalones, rebosaderos, elementos pasantes,
 * aleros, limahoyas, cumbreras y limatesas).
 *
 * Tres secciones:
 * 1. cubiertas-planas-pendientes-capas — cubiertas planas, terrazas y sus
 *    capas.
 * 2. cubiertas-inclinadas-tejados — cubiertas inclinadas y tipos de
 *    tejado.
 * 3. puntos-singulares-cubiertas — puntos singulares comunes a ambos
 *    tipos de cubierta.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-53-cubiertas.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!URL_BASE || !SERVICE_KEY) {
  console.error("❌ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-53";
const OPOSICION = "oficial-albanil-ayto-zaragoza";
const BLOQUE_2_ID = "11fb28dc-2b37-42bb-ae51-aeb7421e298c";
const CTE_HS1 = "https://www.codigotecnico.org/pdf/Documentos/HS/DBHS.pdf";

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
    titulo: "Cubiertas inclinadas y planas. Terrazas",
    descripcion: "Cubiertas inclinadas y planas. Terrazas.",
    contenido:
      "Desarrolla las cubiertas planas y sus capas (formación de pendientes, aislante térmico, impermeabilización, capa de protección), las terrazas como cubiertas transitables, las cubiertas inclinadas y sus tipos de tejado con las pendientes mínimas exigidas según el material de cobertura, y los puntos singulares comunes a ambos tipos de cubierta (juntas de dilatación, encuentros con paramentos verticales, sumideros, canalones y rebosaderos), conforme al Documento Básico HS 1 del Código Técnico de la Edificación.",
    enlaces_boe: [
      { url: CTE_HS1, titulo: "CTE, Documento Básico HS Salubridad — HS 1: Protección frente a la humedad, apdo. 2.4 Cubiertas" },
    ],
    indice_estudio: [
      { url: CTE_HS1, titulo: "Cubiertas planas, terrazas y sus capas", seccion: "cubiertas-planas-pendientes-capas", articulos: "DB HS1, apdos. 2.4.1-2.4.3" },
      { url: CTE_HS1, titulo: "Cubiertas inclinadas y tipos de tejado", seccion: "cubiertas-inclinadas-tejados", articulos: "DB HS1, apdo. 2.4.3, tabla 2.10" },
      { url: CTE_HS1, titulo: "Puntos singulares de las cubiertas", seccion: "puntos-singulares-cubiertas", articulos: "DB HS1, apdo. 2.4.4" },
    ],
  },
]);

// ─────────────────────────────────────────────────────────────────────────
// Sección 1: cubiertas-planas-pendientes-capas
// ─────────────────────────────────────────────────────────────────────────
const S1 = "cubiertas-planas-pendientes-capas";
console.log(`📝 flashcards (${S1})...`);
await insertar(
  "flashcards",
  [
    { anverso: "Según el CTE DB HS1, ¿el grado de impermeabilidad exigido a las cubiertas depende del clima?", reverso: "No. Para las cubiertas, el grado de impermeabilidad exigido es único e independiente de factores climáticos" },
    { anverso: "¿Qué es el 'sistema de formación de pendientes' de una cubierta?", reverso: "El elemento que da a la cubierta la inclinación necesaria hacia los puntos de evacuación de agua, cuando la cubierta es plana o cuando el soporte resistente de una inclinada no tiene la pendiente adecuada" },
    { anverso: "¿Qué pendiente exige el CTE a una cubierta plana transitable para peatones con solado fijo?", reverso: "Entre el 1 % y el 5 %, según la tabla 2.9 del DB HS1" },
    { anverso: "¿Qué pendiente exige el CTE a una cubierta plana no transitable con grava como protección?", reverso: "Entre el 1 % y el 5 % (igual que con solado fijo transitable), según la tabla 2.9 del DB HS1" },
    { anverso: "¿Qué pendiente exige el CTE a una cubierta plana no transitable con lámina autoprotegida?", reverso: "Entre el 1 % y el 15 %, según la tabla 2.9 del DB HS1" },
    { anverso: "¿Qué pendiente exige el CTE a una cubierta ajardinada con tierra vegetal como protección?", reverso: "Entre el 1 % y el 5 %, según la tabla 2.9 del DB HS1" },
    { anverso: "¿Qué es una terraza, en términos constructivos?", reverso: "Una cubierta plana transitable, habitualmente para peatones, dotada de un solado fijo o flotante como capa de protección" },
    { anverso: "¿Cuándo exige el CTE disponer una barrera contra el vapor en una cubierta?", reverso: "Cuando, según el cálculo de la sección HE1 del DB 'Ahorro de energía', se prevea que van a producirse condensaciones en el aislante térmico; la barrera se coloca inmediatamente por debajo de dicho aislante" },
    { anverso: "¿Cuándo exige el CTE una capa de impermeabilización en una cubierta plana?", reverso: "Siempre que la cubierta sea plana; en cubiertas inclinadas, cuando el sistema de formación de pendientes no alcance la pendiente mínima exigida o el solapo de las piezas de protección sea insuficiente" },
    { anverso: "¿Cuándo puede prescindirse de una capa de protección específica en una cubierta plana?", reverso: "Cuando la capa de impermeabilización sea autoprotegida (es decir, cuando el propio material impermeabilizante ya cumple la función de protección frente a la intemperie)" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })),
);

console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "Según el CTE DB HS1, ¿el grado de impermeabilidad exigido a las cubiertas varía según el clima?", explicacion: "No, es único e independiente de factores climáticos.", dificultad: "media", opciones: ["No, es único e independiente del clima", "Sí, varía según la zona pluviométrica", "Sí, pero solo en cubiertas inclinadas", "Sí, varía según la altitud del edificio"], correcta: 0 },
  { enunciado: "¿Qué pendiente mínima y máxima exige el CTE a una cubierta plana transitable con solado fijo?", explicacion: "Entre el 1 % y el 5 %.", dificultad: "media", opciones: ["Entre el 1 % y el 5 %", "Entre el 1 % y el 15 %", "Entre el 5 % y el 15 %", "No se exige pendiente mínima"], correcta: 0 },
  { enunciado: "¿Qué pendiente admite el CTE a una cubierta plana no transitable con lámina autoprotegida?", explicacion: "Entre el 1 % y el 15 %.", dificultad: "media", opciones: ["Entre el 1 % y el 15 %", "Entre el 1 % y el 5 %", "Exactamente el 5 %", "Entre el 15 % y el 32 %"], correcta: 0 },
  { enunciado: "¿Qué es una terraza en términos constructivos?", explicacion: "Una cubierta plana transitable, con solado fijo o flotante como protección.", dificultad: "facil", opciones: ["Una cubierta plana transitable con solado como protección", "Una cubierta inclinada con teja curva", "Un sistema de aislamiento térmico exterior", "Un tipo de cimentación superficial"], correcta: 0 },
  { enunciado: "¿Cuándo exige el CTE disponer una barrera contra el vapor en una cubierta?", explicacion: "Cuando el cálculo del DB HE1 prevea condensaciones en el aislante térmico.", dificultad: "dificil", opciones: ["Cuando se prevean condensaciones en el aislante térmico", "Siempre, en cualquier tipo de cubierta", "Únicamente en cubiertas ajardinadas", "Solo cuando la cubierta es transitable para vehículos"], correcta: 0 },
  { enunciado: "¿En qué casos exige el CTE una capa de impermeabilización en una cubierta inclinada?", explicacion: "Cuando la pendiente no alcance la mínima exigida o el solapo de piezas sea insuficiente.", dificultad: "media", opciones: ["Cuando la pendiente sea insuficiente o el solapo inadecuado", "Nunca, las cubiertas inclinadas no la requieren", "Siempre, sin excepción alguna", "Solo si la cubierta es transitable"], correcta: 0 },
  { enunciado: "¿Cuándo puede prescindirse de una capa de protección específica en una cubierta plana?", explicacion: "Cuando la capa de impermeabilización sea autoprotegida.", dificultad: "media", opciones: ["Cuando la impermeabilización sea autoprotegida", "Nunca, siempre es obligatoria", "Solo en cubiertas ajardinadas", "Solo en cubiertas transitables para vehículos"], correcta: 0 },
  { enunciado: "¿Qué documento del CTE regula las condiciones de las cubiertas frente a la humedad?", explicacion: "El Documento Básico HS Salubridad, HS 1 (apartado 2.4).", dificultad: "media", opciones: ["El DB HS 1, apartado 2.4", "El DB SE-C de cimentaciones", "El DB SUA de seguridad de utilización", "El DB SI de seguridad en caso de incendio"], correcta: 0 },
]);

// ─────────────────────────────────────────────────────────────────────────
// Sección 2: cubiertas-inclinadas-tejados
// ─────────────────────────────────────────────────────────────────────────
const S2 = "cubiertas-inclinadas-tejados";
console.log(`📝 flashcards (${S2})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Qué pendiente mínima exige el CTE (tabla 2.10) a un tejado de teja curva?", reverso: "32 %" },
    { anverso: "¿Qué pendiente mínima exige el CTE a un tejado de teja plana marsellesa o alicantina?", reverso: "40 %" },
    { anverso: "¿Qué pendiente mínima exige el CTE a un tejado de pizarra?", reverso: "60 %, la mayor de todas las recogidas en la tabla 2.10" },
    { anverso: "¿Qué pendiente mínima exige el CTE a un tejado de cinc?", reverso: "10 %" },
    { anverso: "¿Qué es el 'tejado', como componente de una cubierta inclinada según el CTE?", reverso: "El conjunto de piezas de cobertura (tejas, pizarra, placas, etc.) que se colocan sobre el sistema de formación de pendientes, cuya presencia es obligatoria en cubiertas inclinadas salvo que la impermeabilización sea autoprotegida" },
    { anverso: "¿Qué es el 'alero' de una cubierta inclinada?", reverso: "El borde inferior del faldón, donde las piezas del tejado deben sobresalir 5 cm como mínimo (y media pieza como máximo) del soporte, para dirigir el agua fuera de la fachada" },
    { anverso: "¿Qué es una limahoya?", reverso: "La línea de encuentro entrante entre dos faldones de una cubierta inclinada, por donde discurre el agua de ambos faldones y que exige elementos de protección específicos" },
    { anverso: "¿Qué es una limatesa?", reverso: "La línea de encuentro saliente entre dos faldones de una cubierta inclinada (la arista superior convexa), opuesta a la limahoya" },
    { anverso: "¿Qué es la cumbrera de una cubierta inclinada?", reverso: "La línea horizontal más alta de la cubierta, donde se encuentran las partes superiores de dos faldones opuestos, rematada con piezas especiales que solapan sobre las tejas de ambos lados" },
    { anverso: "¿Qué solape mínimo exige el CTE entre las piezas especiales de cumbrera o limatesa y las piezas del tejado de los faldones?", reverso: "5 cm como mínimo" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })),
);

console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué pendiente mínima exige el CTE a un tejado de teja curva?", explicacion: "32 %, según la tabla 2.10 del DB HS1.", dificultad: "media", opciones: ["32 %", "10 %", "60 %", "40 %"], correcta: 0 },
  { enunciado: "¿Qué pendiente mínima exige el CTE a la teja plana marsellesa o alicantina?", explicacion: "40 %.", dificultad: "dificil", opciones: ["40 %", "30 %", "50 %", "60 %"], correcta: 0 },
  { enunciado: "¿Cuál es el material con mayor pendiente mínima exigida en la tabla 2.10 del CTE?", explicacion: "La pizarra, con un 60 %.", dificultad: "media", opciones: ["La pizarra (60 %)", "El cinc (10 %)", "La teja curva (32 %)", "Los perfiles de grecado grande (5 %)"], correcta: 0 },
  { enunciado: "¿Qué es el tejado como componente de una cubierta inclinada según el CTE?", explicacion: "El conjunto de piezas de cobertura, obligatorio salvo impermeabilización autoprotegida.", dificultad: "media", opciones: ["El conjunto de piezas de cobertura de la cubierta", "El sistema de formación de pendientes exclusivamente", "La capa de aislante térmico bajo la impermeabilización", "El sistema de evacuación de aguas pluviales"], correcta: 0 },
  { enunciado: "¿Cuánto deben sobresalir las piezas del tejado en el alero según el CTE?", explicacion: "5 cm como mínimo y media pieza como máximo.", dificultad: "media", opciones: ["5 cm como mínimo y media pieza como máximo", "20 cm como mínimo siempre", "No deben sobresalir en ningún caso", "Como mínimo una pieza completa"], correcta: 0 },
  { enunciado: "¿Qué es una limahoya?", explicacion: "La línea de encuentro entrante entre dos faldones, por donde discurre el agua.", dificultad: "media", opciones: ["La línea de encuentro entrante entre dos faldones", "La línea de encuentro saliente entre dos faldones", "El borde inferior de un faldón", "La línea horizontal más alta de la cubierta"], correcta: 0 },
  { enunciado: "¿Qué es la cumbrera de una cubierta inclinada?", explicacion: "La línea horizontal más alta, donde se encuentran dos faldones opuestos.", dificultad: "facil", opciones: ["La línea horizontal más alta de la cubierta", "La línea de encuentro entrante entre faldones", "El borde lateral de un faldón", "El sistema de evacuación de aguas"], correcta: 0 },
  { enunciado: "¿Qué solape mínimo exige el CTE entre las piezas de cumbrera o limatesa y el tejado de los faldones?", explicacion: "5 cm como mínimo.", dificultad: "dificil", opciones: ["5 cm como mínimo", "20 cm como mínimo", "50 cm como mínimo", "No se exige solape alguno"], correcta: 0 },
]);

// ─────────────────────────────────────────────────────────────────────────
// Sección 3: puntos-singulares-cubiertas
// ─────────────────────────────────────────────────────────────────────────
const S3 = "puntos-singulares-cubiertas";
console.log(`📝 flashcards (${S3})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Qué distancia máxima exige el CTE entre juntas de dilatación contiguas en una cubierta plana?", reverso: "15 m como máximo" },
    { anverso: "¿Cuándo exige el CTE disponer una junta de dilatación coincidiendo con un elemento del edificio?", reverso: "Siempre que exista un encuentro con un paramento vertical o una junta estructural, debe disponerse una junta de dilatación de la cubierta coincidiendo con ellos" },
    { anverso: "¿Qué altura mínima exige el CTE para la impermeabilización en el encuentro de una cubierta plana con un paramento vertical?", reverso: "Debe prolongarse por el paramento vertical hasta una altura de 20 cm como mínimo por encima de la protección de la cubierta" },
    { anverso: "¿Qué anchura mínima de ala exige el CTE a un sumidero o canalón en su borde superior?", reverso: "10 cm de anchura como mínimo" },
    { anverso: "¿En qué casos exige el CTE disponer rebosaderos en una cubierta plana delimitada por paramentos verticales?", reverso: "Cuando exista una sola bajante, cuando la obturación de una bajante impida evacuar el agua por otras, o cuando dicha obturación pueda comprometer la estabilidad del soporte por sobrecarga" },
    { anverso: "¿A qué distancia mínima de un paramento vertical deben situarse los elementos pasantes de una cubierta, según el CTE?", reverso: "50 cm como mínimo de los encuentros con paramentos verticales y de otros elementos que sobresalgan de la cubierta" },
    { anverso: "¿Cuánto deben ascender los elementos de protección alrededor de un elemento pasante por encima de la protección de la cubierta?", reverso: "20 cm como mínimo" },
    { anverso: "¿Qué pendiente mínima exige el CTE a un canalón hacia el desagüe en una cubierta inclinada?", reverso: "1 % como mínimo" },
    { anverso: "¿Qué separación mínima exige el CTE entre las piezas del tejado de los dos faldones que confluyen en una limahoya?", reverso: "20 cm como mínimo" },
    { anverso: "¿Qué altura mínima de protección exige el CTE en el encuentro de una cubierta inclinada con un paramento vertical?", reverso: "Una banda del paramento vertical de 25 cm de altura como mínimo por encima del tejado" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })),
);

console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué distancia máxima exige el CTE entre juntas de dilatación contiguas en una cubierta plana?", explicacion: "15 m como máximo.", dificultad: "dificil", opciones: ["15 m", "5 m", "30 m", "50 m"], correcta: 0 },
  { enunciado: "¿Cuándo exige el CTE una junta de dilatación coincidiendo con un elemento del edificio?", explicacion: "Siempre que exista un encuentro con paramento vertical o junta estructural.", dificultad: "media", opciones: ["En encuentros con paramento vertical o junta estructural", "Únicamente en cubiertas ajardinadas", "Solo en cubiertas transitables para vehículos", "Nunca es obligatorio, es siempre opcional"], correcta: 0 },
  { enunciado: "¿Cuánto debe prolongarse la impermeabilización en el encuentro de una cubierta plana con un paramento vertical?", explicacion: "20 cm como mínimo por encima de la protección de la cubierta.", dificultad: "media", opciones: ["20 cm como mínimo", "5 cm como mínimo", "50 cm como mínimo", "No se exige altura mínima"], correcta: 0 },
  { enunciado: "¿Qué anchura mínima de ala exige el CTE a un sumidero o canalón?", explicacion: "10 cm de anchura como mínimo en el borde superior.", dificultad: "media", opciones: ["10 cm", "5 cm", "20 cm", "50 cm"], correcta: 0 },
  { enunciado: "¿Cuándo exige el CTE disponer rebosaderos en una cubierta plana con paramentos perimetrales?", explicacion: "Cuando exista una sola bajante o su obturación impida evacuar por otras o comprometa la estabilidad.", dificultad: "dificil", opciones: ["Cuando una única bajante obturada no pueda evacuarse de otro modo", "Siempre, en toda cubierta plana sin excepción", "Únicamente en cubiertas ajardinadas", "Nunca, no lo exige el CTE"], correcta: 0 },
  { enunciado: "¿A qué distancia mínima de un paramento vertical deben situarse los elementos pasantes de una cubierta?", explicacion: "50 cm como mínimo.", dificultad: "media", opciones: ["50 cm", "10 cm", "20 cm", "5 cm"], correcta: 0 },
  { enunciado: "¿Qué pendiente mínima exige el CTE a un canalón hacia el desagüe en cubiertas inclinadas?", explicacion: "1 % como mínimo.", dificultad: "media", opciones: ["1 %", "5 %", "10 %", "No se exige pendiente"], correcta: 0 },
  { enunciado: "¿Qué separación mínima exige el CTE entre las piezas del tejado de los dos faldones en una limahoya?", explicacion: "20 cm como mínimo.", dificultad: "dificil", opciones: ["20 cm", "5 cm", "10 cm", "50 cm"], correcta: 0 },
]);

// ─────────────────────────────────────────────────────────────────────────
// Vincular a la oposición (Tema 15)
// ─────────────────────────────────────────────────────────────────────────
console.log(`\n🔗 Vinculando ${TEMA} como Tema 15 de ${OPOSICION}...`);
await upsert(
  "tema_oposicion",
  [
    {
      tema_slug: TEMA,
      oposicion_slug: OPOSICION,
      bloque_id: BLOQUE_2_ID,
      numero: 15,
      orden: 15,
      es_premium: false,
      publicado: true,
      secciones_incluidas: null,
    },
  ],
  "tema_slug,oposicion_slug"
);

console.log("\n✅ tema-53 creado y vinculado como Tema 15 de Oficial Albañil.");
