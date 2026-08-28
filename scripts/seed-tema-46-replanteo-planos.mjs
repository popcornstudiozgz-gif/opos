/**
 * Crea el tema canónico tema-46: "Replanteo de obra e interpretación de
 * planos, documentación gráfica" y lo asigna como Tema 8 (bloque-2) de la
 * oposición Oficial Albañil (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 6 oficial del Anexo I (bases2110.pdf): "Replanteo de
 * obra e interpretación de planos, documentación gráfica."
 *
 * Fuente primaria: Real Decreto 1212/2009, de 17 de julio (BOE-A-2009-
 * 13743), Anexo I — certificado EOCB0108 "Fábricas de Albañilería",
 * módulo formativo MF0141_2 "Trabajos de albañilería" (asociado a
 * UC0141_2 "Organizar trabajos de albañilería"). Texto descargado y leído
 * en este turno (scripts/tmp-fuentes/rd1212-2009.txt): el contenido
 * formativo 1 ("Estudio de documentos de referencia sobre fábricas de
 * albañilería") cubre expresamente la documentación de proyecto (memoria,
 * pliegos de condiciones, planos y mediciones, orden de prevalencia y
 * revisiones), los tipos de obra y la "interpretación de planos y
 * realización de croquis sencillos de obras de fábrica"; las capacidades
 * CE2.1 a CE2.5 detallan además relacionar planos de conjunto con los de
 * detalle, distintas vistas y proyecciones, y dibujar croquis de despiece
 * y replanteo.
 *
 * Tres secciones:
 * 1. documentacion-proyecto-tipos-obra — documentos de un proyecto
 *    (memoria, pliegos, planos, mediciones), orden de prevalencia, y
 *    tipos de obra (nueva planta, conservación, remodelación/
 *    rehabilitación).
 * 2. interpretacion-planos-escalas-acotacion — planos de conjunto y de
 *    detalle, vistas y proyecciones, escalas, acotación y simbología
 *    normalizada en planos de construcción.
 * 3. replanteo-obra-croquis — el replanteo de obra: puntos y ejes de
 *    referencia, escuadra 3-4-5, niveles y cotas de replanteo, croquis de
 *    despiece y esquemas de distribución en planta.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-46-replanteo-planos.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!URL_BASE || !SERVICE_KEY) {
  console.error("❌ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-46";
const OPOSICION = "oficial-albanil-ayto-zaragoza";
const BLOQUE_2_ID = "11fb28dc-2b37-42bb-ae51-aeb7421e298c";
const RD_1212_2009 = "https://www.boe.es/buscar/act.php?id=BOE-A-2009-13743";

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
    titulo: "Replanteo de obra e interpretación de planos, documentación gráfica",
    descripcion: "Replanteo de obra e interpretación de planos, documentación gráfica.",
    contenido:
      "Desarrolla la documentación técnica de un proyecto de construcción (memoria, pliegos de condiciones, planos y mediciones), los tipos de obra según su naturaleza, la interpretación de planos (vistas, proyecciones, escalas y acotación) y el replanteo de obra: la transferencia al terreno de los datos del proyecto mediante puntos y ejes de referencia, niveles y croquis de despiece.",
    enlaces_boe: [
      { url: RD_1212_2009, titulo: "RD 1212/2009 — Certificado de profesionalidad EOCB0108, Fábricas de Albañilería (MF0141_2)" },
    ],
    indice_estudio: [
      { url: RD_1212_2009, titulo: "Documentación de proyecto y tipos de obra", seccion: "documentacion-proyecto-tipos-obra", articulos: "MF0141_2, contenido 1" },
      { url: RD_1212_2009, titulo: "Interpretación de planos: escalas y acotación", seccion: "interpretacion-planos-escalas-acotacion", articulos: "MF0141_2, CE2.1-CE2.3" },
      { url: RD_1212_2009, titulo: "El replanteo de obra y los croquis", seccion: "replanteo-obra-croquis", articulos: "MF0141_2, CE2.4-CE2.5" },
    ],
  },
]);

// ─────────────────────────────────────────────────────────────────────────
// Sección 1: documentacion-proyecto-tipos-obra
// ─────────────────────────────────────────────────────────────────────────
const S1 = "documentacion-proyecto-tipos-obra";
console.log(`📝 flashcards (${S1})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Qué documentos básicos componen un proyecto de construcción?", reverso: "Memoria, planos, pliego de condiciones y mediciones (presupuesto), a los que suele añadirse el estudio de seguridad y salud" },
    { anverso: "¿Qué contiene la memoria de un proyecto?", reverso: "La descripción del objeto, las soluciones adoptadas y su justificación técnica, así como los cálculos y antecedentes que fundamentan el proyecto" },
    { anverso: "¿Qué recoge el pliego de condiciones de un proyecto?", reverso: "Las prescripciones técnicas, administrativas y facultativas que deben cumplirse en la ejecución de la obra: calidad de materiales, forma de ejecución, condiciones de recepción, etc." },
    { anverso: "¿Qué es el 'orden de prevalencia' de los documentos de un proyecto?", reverso: "El criterio que establece qué documento prevalece en caso de contradicción entre ellos; habitualmente prevalecen los planos sobre la memoria en cuestiones de definición geométrica y el pliego de condiciones en cuestiones de ejecución" },
    { anverso: "¿Qué es un proyecto básico?", reverso: "El documento técnico que define las características generales de la obra mediante la adopción de soluciones concretas, suficiente para solicitar licencia, pero no para la ejecución material de la obra" },
    { anverso: "¿Qué es un proyecto de ejecución?", reverso: "El documento que desarrolla el proyecto básico con la definición constructiva completa de la obra necesaria para su ejecución material" },
    { anverso: "¿Qué es un proyecto modificado?", reverso: "El documento que recoge las variaciones introducidas sobre el proyecto de ejecución original durante el desarrollo de la obra" },
    { anverso: "¿Qué se entiende por obra de 'nueva planta'?", reverso: "La construcción completa de una edificación en un solar, sin partir de una edificación preexistente" },
    { anverso: "¿Qué diferencia hay entre remodelación y rehabilitación de un edificio?", reverso: "La remodelación implica cambios sustanciales en la distribución o el uso del edificio; la rehabilitación se centra en recuperar sus condiciones de habitabilidad, estructurales o funcionales, con o sin cambio de uso" },
    { anverso: "¿Qué es una obra de conservación?", reverso: "El conjunto de trabajos de mantenimiento periódico destinados a mantener un edificio o construcción en buen estado, sin modificar sustancialmente sus características" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })),
);

console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Cuáles son los documentos básicos de un proyecto de construcción?", explicacion: "Memoria, planos, pliego de condiciones y mediciones/presupuesto.", dificultad: "facil", opciones: ["Memoria, planos, pliego de condiciones y mediciones", "Solo memoria y planos", "Solo el presupuesto y el plan de seguridad", "Únicamente los planos de detalle"], correcta: 0 },
  { enunciado: "¿Qué recoge el pliego de condiciones de un proyecto?", explicacion: "Las prescripciones técnicas, administrativas y facultativas de la ejecución.", dificultad: "media", opciones: ["Las prescripciones técnicas, administrativas y facultativas de la ejecución", "Únicamente el listado de materiales", "Solo los cálculos estructurales", "El calendario de pagos al contratista"], correcta: 0 },
  { enunciado: "¿Para qué sirve el 'orden de prevalencia' de los documentos de un proyecto?", explicacion: "Para resolver qué documento prevalece en caso de contradicción entre ellos.", dificultad: "media", opciones: ["Para resolver contradicciones entre documentos", "Para fijar el orden de entrega al cliente", "Para numerar los planos", "Para calcular el presupuesto"], correcta: 0 },
  { enunciado: "¿Qué documento define las características generales de una obra y es suficiente para solicitar licencia, pero no para ejecutarla?", explicacion: "El proyecto básico.", dificultad: "media", opciones: ["El proyecto básico", "El proyecto de ejecución", "El proyecto modificado", "El plan de obra"], correcta: 0 },
  { enunciado: "¿Qué documento contiene la definición constructiva completa necesaria para ejecutar materialmente la obra?", explicacion: "El proyecto de ejecución.", dificultad: "media", opciones: ["El proyecto de ejecución", "El proyecto básico", "La memoria descriptiva", "El pliego de condiciones administrativas"], correcta: 0 },
  { enunciado: "¿Qué es una obra de 'nueva planta'?", explicacion: "La construcción completa de una edificación en un solar sin partir de una edificación preexistente.", dificultad: "facil", opciones: ["La construcción completa de un edificio en un solar", "La reparación de una fachada existente", "El mantenimiento periódico de un edificio", "La demolición parcial de una estructura"], correcta: 0 },
  { enunciado: "¿En qué se centra principalmente una obra de rehabilitación?", explicacion: "En recuperar las condiciones de habitabilidad, estructurales o funcionales del edificio.", dificultad: "media", opciones: ["En recuperar condiciones de habitabilidad o estructurales", "En cambiar exclusivamente el uso del edificio", "En construir una edificación nueva en un solar vacío", "En elaborar únicamente el pliego de condiciones"], correcta: 0 },
  { enunciado: "¿Qué certificado de profesionalidad regula el contenido sobre documentación de proyecto en el módulo 'Trabajos de albañilería'?", explicacion: "EOCB0108 'Fábricas de Albañilería' (RD 1212/2009), módulo MF0141_2.", dificultad: "dificil", opciones: ["EOCB0108, Fábricas de Albañilería", "EOCB0210, Revestimientos con pastas y morteros", "EOCB0211, Impermeabilización", "EOCB0209, Acabados rígidos y urbanización"], correcta: 0 },
]);

// ─────────────────────────────────────────────────────────────────────────
// Sección 2: interpretacion-planos-escalas-acotacion
// ─────────────────────────────────────────────────────────────────────────
const S2 = "interpretacion-planos-escalas-acotacion";
console.log(`📝 flashcards (${S2})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Qué diferencia hay entre un plano de conjunto y uno de detalle?", reverso: "El plano de conjunto muestra el elemento constructivo en su totalidad (con menor nivel de precisión gráfica); el de detalle amplía y precisa una parte concreta, a mayor escala, para su correcta ejecución" },
    { anverso: "¿Qué es la escala de un plano?", reverso: "La relación numérica entre las dimensiones representadas en el plano y las dimensiones reales del objeto (por ejemplo, 1:50 significa que 1 cm del plano equivale a 50 cm reales)" },
    { anverso: "¿Qué escalas son habituales en planos de plantas de edificación?", reverso: "1:50 y 1:100, mientras que los planos de detalle constructivo suelen dibujarse a escalas mayores, como 1:10, 1:5 o 1:1" },
    { anverso: "¿Qué es la acotación en un plano?", reverso: "El conjunto de líneas, cifras y símbolos que indican las medidas reales de un elemento representado, permitiendo construirlo sin necesidad de medir directamente sobre el dibujo" },
    { anverso: "¿Qué son las 'vistas' o 'proyecciones' de un elemento constructivo?", reverso: "Las representaciones del elemento observado desde distintas direcciones (planta, alzado, sección/perfil), que en conjunto permiten definir su forma tridimensional" },
    { anverso: "¿Qué es un plano de planta?", reverso: "La representación de un edificio o elemento visto en sección horizontal, mostrando su distribución vista desde arriba" },
    { anverso: "¿Qué es un plano de alzado?", reverso: "La representación de una fachada o elemento visto en proyección vertical, mostrando su aspecto exterior desde un lado" },
    { anverso: "¿Qué es un plano de sección (o corte)?", reverso: "La representación de un edificio o elemento cortado por un plano vertical imaginario, que muestra su estructura interior y las relaciones entre alturas y niveles" },
    { anverso: "¿Qué información aporta la simbología normalizada de un plano de construcción?", reverso: "Representa de forma abreviada y homogénea elementos constructivos (puertas, ventanas, escaleras, instalaciones...), facilitando la lectura del plano sin necesidad de describir cada elemento" },
    { anverso: "¿Qué relación deben guardar los planos de conjunto y los de detalle según el certificado EOCB0108?", reverso: "Deben ser coherentes entre sí y con las distintas vistas y proyecciones de un mismo elemento constructivo, de modo que la información se pueda extraer combinando ambos niveles de definición" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })),
);

console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué diferencia hay entre un plano de conjunto y uno de detalle?", explicacion: "El de conjunto muestra el elemento completo; el de detalle amplía una parte concreta a mayor escala.", dificultad: "media", opciones: ["El de detalle amplía una parte concreta a mayor escala", "Son exactamente el mismo tipo de plano", "El de conjunto siempre se dibuja a escala 1:1", "El de detalle nunca lleva acotación"], correcta: 0 },
  { enunciado: "En un plano a escala 1:50, ¿a cuántos centímetros reales equivale 1 cm del plano?", explicacion: "A 50 cm reales.", dificultad: "facil", opciones: ["50 cm", "5 cm", "500 cm", "1 cm"], correcta: 0 },
  { enunciado: "¿Qué escalas son habituales para planos de detalle constructivo?", explicacion: "Escalas mayores como 1:10, 1:5 o 1:1, frente al 1:50 o 1:100 de plantas generales.", dificultad: "media", opciones: ["1:10, 1:5 o 1:1", "1:1000 o 1:2000", "Siempre 1:50", "No se usa escala en los detalles"], correcta: 0 },
  { enunciado: "¿Para qué sirve la acotación de un plano?", explicacion: "Para indicar las medidas reales del elemento sin necesidad de medir sobre el dibujo.", dificultad: "facil", opciones: ["Para indicar las medidas reales del elemento", "Para indicar el color de los materiales", "Para numerar las páginas del proyecto", "Para calcular el presupuesto de la obra"], correcta: 0 },
  { enunciado: "¿Qué muestra un plano de alzado?", explicacion: "La fachada o elemento visto en proyección vertical, su aspecto exterior desde un lado.", dificultad: "media", opciones: ["La fachada vista en proyección vertical", "La distribución vista desde arriba", "Un corte vertical del interior del edificio", "Solo la cimentación del edificio"], correcta: 0 },
  { enunciado: "¿Qué muestra un plano de sección o corte?", explicacion: "El edificio cortado por un plano vertical imaginario, mostrando su estructura interior.", dificultad: "media", opciones: ["El edificio cortado por un plano vertical, mostrando su interior", "Únicamente la fachada exterior", "La distribución en planta baja", "El emplazamiento del solar"], correcta: 0 },
  { enunciado: "¿Para qué sirve la simbología normalizada en los planos de construcción?", explicacion: "Para representar de forma abreviada y homogénea elementos constructivos, facilitando la lectura del plano.", dificultad: "media", opciones: ["Para representar de forma abreviada elementos constructivos", "Para sustituir la necesidad de acotación", "Para indicar exclusivamente las escaleras", "Para calcular las mediciones de la obra"], correcta: 0 },
  { enunciado: "¿Qué combinación de vistas permite definir por completo la forma de un elemento constructivo?", explicacion: "Planta, alzado y sección/perfil, en conjunto.", dificultad: "media", opciones: ["Planta, alzado y sección", "Solo la planta", "Solo el alzado principal", "Únicamente la vista en perspectiva"], correcta: 0 },
]);

// ─────────────────────────────────────────────────────────────────────────
// Sección 3: replanteo-obra-croquis
// ─────────────────────────────────────────────────────────────────────────
const S3 = "replanteo-obra-croquis";
console.log(`📝 flashcards (${S3})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Qué es el replanteo de una obra?", reverso: "La operación de trasladar al terreno, con la mayor exactitud posible, las medidas y referencias definidas en los planos del proyecto, marcando físicamente ejes, alineaciones y niveles antes de comenzar la construcción" },
    { anverso: "¿Qué son las 'miras' o 'puntos de referencia' en un replanteo?", reverso: "Elementos fijos (estacas, hitos, puntos topográficos) que sirven de base estable para trasladar al terreno las medidas y ejes del proyecto" },
    { anverso: "¿Qué es el método de la escuadra 3-4-5 y para qué se usa?", reverso: "Un método práctico para trazar ángulos rectos en el terreno basado en el teorema de Pitágoras: un triángulo con lados de 3, 4 y 5 unidades (o sus múltiplos) tiene siempre un ángulo recto entre los lados de 3 y 4 unidades" },
    { anverso: "¿Qué es una cota de replanteo?", reverso: "La medida (de distancia o de nivel/altura) tomada como referencia para situar con precisión un elemento constructivo respecto a un punto o eje fijo" },
    { anverso: "¿Qué es un eje de replanteo en un edificio?", reverso: "Una línea de referencia (normalmente coincidente con la directriz de pilares, muros de carga o fachadas) a partir de la cual se sitúan el resto de elementos constructivos del edificio" },
    { anverso: "¿Qué instrumento se emplea habitualmente para transmitir niveles (cotas de altura) en obra?", reverso: "El nivel óptico o el nivel láser, que permiten materializar un plano horizontal de referencia desde el que medir alturas en distintos puntos de la obra" },
    { anverso: "¿Qué es un croquis de despiece según el certificado EOCB0108?", reverso: "Un dibujo esquemático, no necesariamente a escala exacta, que concreta las piezas y medidas de un elemento constructivo propuesto, partiendo de la información del proyecto y el plan de obra" },
    { anverso: "¿Qué debe incluir un esquema de distribución en planta de un tajo de obra?", reverso: "La ubicación de acopios de materiales, máquinas, medios auxiliares, señales y medios de protección colectiva requeridos, según establece el certificado EOCB0108" },
    { anverso: "¿Por qué es importante comprobar el replanteo antes de iniciar la cimentación?", reverso: "Porque un error de replanteo se traslada y amplifica en todas las fases posteriores de la obra, pudiendo obligar a demoliciones o generar invasiones de linderos y desajustes con el proyecto" },
    { anverso: "¿Qué relación existe entre el replanteo y los planos de detalle?", reverso: "El replanteo se ejecuta a partir de las cotas y referencias fijadas en los planos de detalle y de conjunto, trasladando al terreno la geometría exacta que en el plano solo está representada a escala" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })),
);

console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es el replanteo de una obra?", explicacion: "Trasladar al terreno las medidas y referencias del proyecto, marcando ejes, alineaciones y niveles.", dificultad: "facil", opciones: ["Trasladar al terreno las medidas y referencias del proyecto", "Elaborar el presupuesto de la obra", "Redactar el pliego de condiciones", "Dibujar el plano de alzado principal"], correcta: 0 },
  { enunciado: "¿Para qué sirve el método de la escuadra 3-4-5?", explicacion: "Para trazar ángulos rectos en el terreno, basado en el teorema de Pitágoras.", dificultad: "media", opciones: ["Para trazar ángulos rectos en el terreno", "Para calcular la resistencia del hormigón", "Para medir la humedad del terreno", "Para nivelar el mortero de asiento"], correcta: 0 },
  { enunciado: "¿Qué es una cota de replanteo?", explicacion: "La medida de distancia o nivel tomada como referencia para situar un elemento respecto a un punto o eje fijo.", dificultad: "media", opciones: ["Una medida de referencia para situar un elemento", "El precio unitario de una partida de obra", "Un tipo de mortero de agarre", "Un instrumento óptico de medición"], correcta: 0 },
  { enunciado: "¿Qué es un eje de replanteo en un edificio?", explicacion: "Una línea de referencia a partir de la cual se sitúan el resto de elementos constructivos.", dificultad: "media", opciones: ["Una línea de referencia para situar los elementos constructivos", "Un tipo de junta de dilatación", "Un documento del proyecto de ejecución", "Una escala normalizada de planos"], correcta: 0 },
  { enunciado: "¿Qué instrumento permite materializar un plano horizontal de referencia para transmitir niveles en obra?", explicacion: "El nivel óptico o el nivel láser.", dificultad: "media", opciones: ["El nivel óptico o láser", "La escuadra 3-4-5", "La llana dentada", "El pliego de condiciones"], correcta: 0 },
  { enunciado: "Según el certificado EOCB0108, ¿qué es un croquis de despiece?", explicacion: "Un dibujo esquemático que concreta piezas y medidas de un elemento propuesto, a partir del proyecto y el plan de obra.", dificultad: "media", opciones: ["Un dibujo esquemático que concreta piezas y medidas de un elemento", "Un plano oficial siempre a escala 1:1", "Un documento exclusivamente contractual", "Un tipo de plano de instalaciones"], correcta: 0 },
  { enunciado: "¿Qué debe reflejar un esquema de distribución en planta de un tajo de obra?", explicacion: "Acopios, máquinas, medios auxiliares, señales y medios de protección colectiva.", dificultad: "media", opciones: ["Acopios, máquinas, medios auxiliares, señales y protección colectiva", "Únicamente la ubicación de los operarios", "Solo el trazado de las instalaciones eléctricas", "Exclusivamente los ejes estructurales"], correcta: 0 },
  { enunciado: "¿Por qué es especialmente crítico comprobar bien el replanteo antes de cimentar?", explicacion: "Porque un error se traslada y amplifica en las fases posteriores, pudiendo generar invasiones de linderos o desajustes con el proyecto.", dificultad: "dificil", opciones: ["Porque un error se amplifica en las fases posteriores de la obra", "Porque no afecta a las fases posteriores", "Porque solo afecta al acabado estético", "Porque el replanteo no tiene relación con los planos"], correcta: 0 },
]);

// ─────────────────────────────────────────────────────────────────────────
// Vincular a la oposición (Tema 8)
// ─────────────────────────────────────────────────────────────────────────
console.log(`\n🔗 Vinculando ${TEMA} como Tema 8 de ${OPOSICION}...`);
await upsert(
  "tema_oposicion",
  [
    {
      tema_slug: TEMA,
      oposicion_slug: OPOSICION,
      bloque_id: BLOQUE_2_ID,
      numero: 8,
      orden: 8,
      es_premium: false,
      publicado: true,
      secciones_incluidas: null,
    },
  ],
  "tema_slug,oposicion_slug"
);

console.log("\n✅ tema-46 creado y vinculado como Tema 8 de Oficial Albañil.");
