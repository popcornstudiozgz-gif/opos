/**
 * Crea el tema canónico tema-47: "Mediciones y criterios de valoración en
 * la construcción" y lo asigna como Tema 9 (bloque-2) de la oposición
 * Oficial Albañil (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 7 oficial del Anexo I (bases2110.pdf): "Mediciones
 * y criterios de valoración en la construcción."
 *
 * Fuente primaria: Real Decreto 1212/2009, de 17 de julio (BOE-A-2009-
 * 13743), Anexo I — certificado EOCB0108 "Fábricas de Albañilería",
 * módulo MF0141_2 "Trabajos de albañilería" (texto descargado y leído en
 * este turno, scripts/tmp-fuentes/rd1212-2009.txt): contenido formativo 3
 * ("Medición y valoración de fábricas de albañilería": ofertas,
 * mediciones y certificaciones; criterios y unidades de medición; precios
 * simples, auxiliares, unitarios y descompuestos; costes directos e
 * indirectos, gastos generales, beneficio industrial e impuestos;
 * presupuestos de ejecución, contratación y licitación) y capacidades
 * CE4.1 a CE4.8.
 *
 * Tres secciones:
 * 1. criterios-unidades-medicion — criterios y unidades de medición,
 *    unidades y partidas de obra, criterios habituales de medición de
 *    fábricas y ayudas de albañilería.
 * 2. precios-costes-presupuestos — precios simples, auxiliares,
 *    unitarios y descompuestos; partidas alzadas; costes directos e
 *    indirectos; tipos de presupuesto.
 * 3. ofertas-mediciones-certificaciones — elaboración de ofertas y
 *    certificaciones de obra a partir de las mediciones.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-47-mediciones-valoracion.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!URL_BASE || !SERVICE_KEY) {
  console.error("❌ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-47";
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
    titulo: "Mediciones y criterios de valoración en la construcción",
    descripcion: "Mediciones y criterios de valoración en la construcción.",
    contenido:
      "Desarrolla los criterios y unidades de medición de las unidades de obra, la composición de precios (simples, auxiliares, unitarios y descompuestos), los costes directos e indirectos, gastos generales y beneficio industrial, los distintos tipos de presupuesto (ejecución, contratación y licitación) y el proceso de elaboración de ofertas y certificaciones de obra a partir de las mediciones.",
    enlaces_boe: [
      { url: RD_1212_2009, titulo: "RD 1212/2009 — Certificado de profesionalidad EOCB0108, Fábricas de Albañilería (MF0141_2)" },
    ],
    indice_estudio: [
      { url: RD_1212_2009, titulo: "Criterios y unidades de medición", seccion: "criterios-unidades-medicion", articulos: "MF0141_2, contenido 3 y CE4.1-CE4.3" },
      { url: RD_1212_2009, titulo: "Precios, costes y presupuestos", seccion: "precios-costes-presupuestos", articulos: "MF0141_2, contenido 3 y CE4.4-CE4.6" },
      { url: RD_1212_2009, titulo: "Ofertas, mediciones y certificaciones de obra", seccion: "ofertas-mediciones-certificaciones", articulos: "MF0141_2, CE4.7-CE4.8" },
    ],
  },
]);

// ─────────────────────────────────────────────────────────────────────────
// Sección 1: criterios-unidades-medicion
// ─────────────────────────────────────────────────────────────────────────
const S1 = "criterios-unidades-medicion";
console.log(`📝 flashcards (${S1})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Qué es una unidad de obra?", reverso: "Cada uno de los elementos o trabajos elementales en que se descompone un proyecto de construcción a efectos de medición y valoración (por ejemplo, m² de fábrica de ladrillo, m³ de excavación, ud. de arqueta)" },
    { anverso: "¿Qué es una partida de obra?", reverso: "El registro que recoge, para una unidad de obra concreta, su código, descripción, unidad de medida, cantidad medida y precio, formando la base de mediciones y presupuestos" },
    { anverso: "¿Qué unidades de medida son habituales en las partidas de fábricas de albañilería?", reverso: "El metro cuadrado (m²) para fábricas y revestimientos, el metro cúbico (m³) para excavaciones y hormigones, el metro lineal (ml) para elementos lineales y la unidad (ud.) para elementos discretos" },
    { anverso: "¿Qué son los 'descuentos' en un criterio de medición de fábricas?", reverso: "Las superficies o volúmenes que se restan de la medición bruta por huecos (puertas, ventanas) u otros elementos que no forman parte de la unidad de obra medida, según el criterio establecido" },
    { anverso: "¿Qué son las 'labores auxiliares incluidas' en una partida de albañilería?", reverso: "Los trabajos complementarios (por ejemplo, la limpieza de la fábrica, el rejuntado o la formación de mochetas) que se consideran ya incluidos en el precio de la unidad de obra, sin medirse ni pagarse aparte" },
    { anverso: "¿Qué es un cuadro de precios?", reverso: "El documento del proyecto que recoge, ordenados y codificados, los precios de todas las unidades de obra que intervienen; suele distinguirse entre cuadro de precios n.º 1 (en letra) y n.º 2 (descompuesto)" },
    { anverso: "¿Qué son las 'bases de precios de construcción'?", reverso: "Publicaciones técnicas (de organismos públicos, colegios profesionales o editoriales especializadas) que recopilan precios actualizados de materiales, mano de obra y unidades de obra, usadas como referencia para presupuestar" },
    { anverso: "¿Por qué es importante la claridad y precisión en los documentos de medición y certificación?", reverso: "Porque de ellos depende la correcta valoración económica de la obra ejecutada y evitan discrepancias entre contratista y propiedad sobre lo realmente construido" },
    { anverso: "¿Qué campos suele incluir un documento de medición y certificación?", reverso: "Código de la partida, unidad de medida, descripción (sucinta y detallada), cantidades, importes parciales y totales, y líneas de desglose de la medición" },
    { anverso: "¿Qué es medir 'por proyecto' frente a medir 'sobre el terreno' o 'in situ'?", reverso: "Medir por proyecto es obtener las cantidades a partir de los planos y documentos del proyecto; medir sobre el terreno consiste en comprobar o levantar las cantidades reales ejecutadas directamente en obra" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })),
);

console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es una unidad de obra?", explicacion: "Cada elemento o trabajo elemental en que se descompone un proyecto a efectos de medición y valoración.", dificultad: "facil", opciones: ["Un elemento o trabajo elemental del proyecto a medir y valorar", "El documento contractual entre propiedad y contratista", "El plano de detalle de una fábrica", "El seguro de responsabilidad civil de la obra"], correcta: 0 },
  { enunciado: "¿Qué unidad de medida es habitual para una fábrica de ladrillo?", explicacion: "El metro cuadrado (m²).", dificultad: "facil", opciones: ["El metro cuadrado (m²)", "El kilogramo (kg)", "El litro (l)", "La hora (h)"], correcta: 0 },
  { enunciado: "¿Qué son los 'descuentos' en un criterio de medición de fábricas?", explicacion: "Las superficies o volúmenes que se restan de la medición bruta por huecos u otros elementos no computables.", dificultad: "media", opciones: ["Superficies o volúmenes que se restan por huecos u otros elementos", "Rebajas comerciales aplicadas al presupuesto final", "El IVA aplicado a la unidad de obra", "El beneficio industrial del contratista"], correcta: 0 },
  { enunciado: "¿Qué se entiende por 'labores auxiliares incluidas' en una partida?", explicacion: "Trabajos complementarios que ya están incluidos en el precio de la unidad de obra, sin medirse aparte.", dificultad: "media", opciones: ["Trabajos complementarios ya incluidos en el precio de la partida", "Trabajos que siempre se facturan aparte", "Los medios de protección colectiva de toda la obra", "El transporte de escombros a vertedero"], correcta: 0 },
  { enunciado: "¿Qué es un cuadro de precios en un proyecto?", explicacion: "El documento que recoge, ordenados y codificados, los precios de todas las unidades de obra.", dificultad: "media", opciones: ["El documento que recoge los precios de las unidades de obra", "El plano general de la instalación eléctrica", "El listado de trabajadores de la obra", "El certificado final de obra"], correcta: 0 },
  { enunciado: "¿Para qué se utilizan las bases de precios de construcción?", explicacion: "Como referencia actualizada de precios de materiales, mano de obra y unidades de obra para presupuestar.", dificultad: "media", opciones: ["Como referencia de precios para presupuestar", "Como normativa de seguridad obligatoria", "Como sustituto legal del pliego de condiciones", "Como certificado de calidad de los materiales"], correcta: 0 },
  { enunciado: "¿Qué diferencia hay entre medir 'por proyecto' y medir 'in situ'?", explicacion: "Por proyecto se mide sobre planos; in situ se comprueba o levanta directamente en obra.", dificultad: "media", opciones: ["Por proyecto se mide sobre planos, in situ se comprueba en obra", "Son exactamente el mismo procedimiento", "In situ solo se aplica a excavaciones", "Por proyecto solo se aplica a certificaciones finales"], correcta: 0 },
  { enunciado: "¿Por qué debe ser precisa la documentación de medición y certificación de una obra?", explicacion: "Porque de ella depende la valoración económica correcta y se evitan discrepancias entre contratista y propiedad.", dificultad: "media", opciones: ["Porque de ella depende la valoración económica correcta de lo ejecutado", "Porque lo exige exclusivamente el plan de seguridad y salud", "Porque sustituye a los planos de detalle", "Porque determina el color de los acabados"], correcta: 0 },
]);

// ─────────────────────────────────────────────────────────────────────────
// Sección 2: precios-costes-presupuestos
// ─────────────────────────────────────────────────────────────────────────
const S2 = "precios-costes-presupuestos";
console.log(`📝 flashcards (${S2})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Qué es un precio simple?", reverso: "El precio unitario de un recurso elemental empleado en la obra: materiales, transportes, jornales (mano de obra), maquinaria, energía o seguridad" },
    { anverso: "¿Qué es un precio auxiliar?", reverso: "El precio de una unidad intermedia (por ejemplo, 1 m³ de mortero) obtenida a partir de precios simples, que a su vez se utiliza para componer precios unitarios más complejos" },
    { anverso: "¿Qué es un precio unitario o descompuesto?", reverso: "El precio de una unidad de obra completa, obtenido sumando los precios simples y/o auxiliares de todos los recursos (materiales, mano de obra, maquinaria) necesarios para ejecutarla, junto con sus rendimientos" },
    { anverso: "¿Qué es una partida alzada?", reverso: "Una partida de obra valorada en un importe global fijo, sin descomposición detallada en precios unitarios, habitual para trabajos difíciles de medir con precisión de antemano" },
    { anverso: "¿Qué son los costes directos de una unidad de obra?", reverso: "Los costes de materiales, mano de obra, maquinaria y medios auxiliares que se emplean e imputan directamente a la ejecución de esa unidad de obra concreta" },
    { anverso: "¿Qué son los costes indirectos de una obra?", reverso: "Los costes que no se imputan a una unidad de obra concreta sino al conjunto de la obra (instalaciones generales, personal técnico, vigilancia, etc.), repartiéndose proporcionalmente entre todas las unidades" },
    { anverso: "¿Qué son los gastos generales en un presupuesto de construcción?", reverso: "Los gastos de estructura de la empresa constructora no imputables a una obra concreta (administración, oficinas centrales, financiación), que se aplican como un porcentaje sobre el presupuesto de ejecución material" },
    { anverso: "¿Qué es el beneficio industrial?", reverso: "El margen de beneficio que percibe el contratista, aplicado también como un porcentaje sobre el presupuesto de ejecución material" },
    { anverso: "¿Qué diferencia hay entre presupuesto de ejecución material, de contratación y de licitación?", reverso: "El de ejecución material es la suma de los costes directos e indirectos de las unidades de obra; el de contratación añade gastos generales y beneficio industrial; el de licitación añade además el IVA y otros impuestos aplicables" },
    { anverso: "¿Qué recursos suelen incluirse al calcular un precio simple de mano de obra (jornal)?", reverso: "El coste horario del trabajador según su categoría profesional, incluyendo salario y cargas sociales, referido al rendimiento en la unidad de obra correspondiente" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })),
);

console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es un precio simple?", explicacion: "El precio unitario de un recurso elemental: materiales, transportes, jornales, maquinaria, energía o seguridad.", dificultad: "media", opciones: ["El precio unitario de un recurso elemental", "El precio final de una unidad de obra completa", "El presupuesto total de la obra", "El importe de una partida alzada"], correcta: 0 },
  { enunciado: "¿Qué es un precio auxiliar?", explicacion: "El precio de una unidad intermedia obtenida a partir de precios simples, usado para componer precios unitarios.", dificultad: "media", opciones: ["El precio de una unidad intermedia a partir de precios simples", "El precio final que paga el promotor", "El coste de la maquinaria exclusivamente", "El precio de licitación de la obra"], correcta: 0 },
  { enunciado: "¿Cómo se obtiene el precio unitario o descompuesto de una unidad de obra?", explicacion: "Sumando los precios simples y/o auxiliares de los recursos necesarios, con sus rendimientos.", dificultad: "media", opciones: ["Sumando precios simples y/o auxiliares con sus rendimientos", "Aplicando un porcentaje fijo al presupuesto total", "Multiplicando el coste de mano de obra por el IVA", "Restando el beneficio industrial al coste directo"], correcta: 0 },
  { enunciado: "¿Qué es una partida alzada?", explicacion: "Una partida valorada en un importe global fijo, sin descomposición detallada.", dificultad: "media", opciones: ["Una partida valorada en un importe global fijo", "Una partida medida exclusivamente en metros cuadrados", "El cuadro de precios n.º 1 de un proyecto", "El presupuesto de licitación completo"], correcta: 0 },
  { enunciado: "¿Qué diferencia hay entre costes directos e indirectos de una unidad de obra?", explicacion: "Los directos se imputan directamente a la unidad de obra; los indirectos se reparten entre todas las unidades.", dificultad: "media", opciones: ["Los directos se imputan a la unidad; los indirectos se reparten entre todas", "Son exactamente lo mismo", "Los indirectos incluyen siempre el IVA", "Los directos solo incluyen mano de obra"], correcta: 0 },
  { enunciado: "¿Sobre qué magnitud se aplican habitualmente los gastos generales y el beneficio industrial?", explicacion: "Sobre el presupuesto de ejecución material, como porcentajes.", dificultad: "media", opciones: ["Sobre el presupuesto de ejecución material", "Sobre el precio simple de la mano de obra", "Sobre el coste indirecto exclusivamente", "Sobre el IVA repercutido"], correcta: 0 },
  { enunciado: "¿Qué añade el presupuesto de contratación respecto al de ejecución material?", explicacion: "Gastos generales y beneficio industrial.", dificultad: "media", opciones: ["Gastos generales y beneficio industrial", "Únicamente el IVA", "Solo los costes indirectos", "Los precios simples de mano de obra"], correcta: 0 },
  { enunciado: "¿Qué añade el presupuesto de licitación respecto al de contratación?", explicacion: "El IVA y otros impuestos aplicables.", dificultad: "media", opciones: ["El IVA y otros impuestos aplicables", "Los costes directos de las unidades de obra", "El beneficio industrial exclusivamente", "Los precios auxiliares de los morteros"], correcta: 0 },
]);

// ─────────────────────────────────────────────────────────────────────────
// Sección 3: ofertas-mediciones-certificaciones
// ─────────────────────────────────────────────────────────────────────────
const S3 = "ofertas-mediciones-certificaciones";
console.log(`📝 flashcards (${S3})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Qué es una oferta de obra?", reverso: "El documento en el que el contratista propone el precio y las condiciones para ejecutar los trabajos, partiendo de la medición de las unidades de obra del proyecto y valorando las circunstancias específicas de la obra" },
    { anverso: "¿Qué es una certificación de obra?", reverso: "El documento periódico (normalmente mensual) que recoge y valora las unidades de obra realmente ejecutadas hasta una fecha determinada, sirviendo de base para el pago al contratista" },
    { anverso: "¿Cómo se organiza habitualmente una certificación de obra?", reverso: "Agrupando las partidas ejecutadas en capítulos (según el tipo de trabajo: cimentación, estructura, albañilería, acabados...) y resumiéndolas en un cuadro resumen final" },
    { anverso: "¿Qué es el 'origen de certificación'?", reverso: "La referencia acumulada desde el inicio de la obra hasta la fecha de la certificación, de modo que cada certificación refleja tanto lo ejecutado en el periodo como el acumulado total" },
    { anverso: "¿Qué es la retención a cuenta por garantías en una certificación?", reverso: "Un porcentaje (habitualmente en torno al 5 %) que se descuenta de cada certificación y se retiene hasta la recepción definitiva de la obra, como garantía frente a posibles defectos" },
    { anverso: "¿Qué relación hay entre las mediciones y una certificación de obra?", reverso: "La certificación se elabora aplicando los precios del cuadro de precios a las cantidades realmente medidas y ejecutadas de cada unidad de obra en el periodo certificado" },
    { anverso: "¿Qué diferencia hay entre una medición y un presupuesto?", reverso: "La medición cuantifica las unidades de obra (cuánto hay de cada cosa); el presupuesto es el resultado de valorar esas cantidades aplicando los precios correspondientes" },
    { anverso: "¿Por qué se agrupan las partidas por capítulos en una certificación?", reverso: "Para facilitar el seguimiento económico de la obra por fases o tipos de trabajo y comparar el avance real con la planificación prevista" },
    { anverso: "¿Qué debe hacer el oficial de albañilería si detecta una discrepancia entre lo medido y lo realmente ejecutado?", reverso: "Comunicarlo al responsable técnico de la obra para su comprobación y, en su caso, corrección de la medición o certificación antes de su aprobación" },
    { anverso: "¿Qué documentos deben custodiarse tras la elaboración de una oferta o certificación?", reverso: "Las mediciones, croquis y comprobaciones que sustentan las cantidades certificadas, para poder justificarlas ante posibles revisiones o discrepancias posteriores" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })),
);

console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es una oferta de obra?", explicacion: "El documento en que el contratista propone precio y condiciones, partiendo de la medición del proyecto.", dificultad: "media", opciones: ["El documento en que el contratista propone precio y condiciones", "El documento final de recepción de la obra", "El plan de seguridad y salud de la obra", "El cuadro de precios n.º 1"], correcta: 0 },
  { enunciado: "¿Qué es una certificación de obra?", explicacion: "El documento periódico que valora las unidades de obra ejecutadas hasta una fecha, base del pago al contratista.", dificultad: "media", opciones: ["El documento que valora lo ejecutado hasta una fecha, base del pago", "El documento inicial de oferta económica", "El pliego de condiciones técnicas", "El certificado de profesionalidad del oficial"], correcta: 0 },
  { enunciado: "¿Cómo se organizan habitualmente las partidas en una certificación de obra?", explicacion: "Agrupadas en capítulos según el tipo de trabajo y resumidas en un cuadro resumen.", dificultad: "media", opciones: ["Agrupadas en capítulos y resumidas en un cuadro resumen", "En orden alfabético exclusivamente", "Sin ningún tipo de agrupación", "Solo por fecha de ejecución"], correcta: 0 },
  { enunciado: "¿Qué es el 'origen de certificación'?", explicacion: "La referencia acumulada desde el inicio de la obra hasta la fecha de la certificación.", dificultad: "dificil", opciones: ["La referencia acumulada desde el inicio de la obra", "El precio simple de la mano de obra", "El primer día de la certificación mensual", "El capítulo inicial del presupuesto"], correcta: 0 },
  { enunciado: "¿Qué es la retención a cuenta por garantías?", explicacion: "Un porcentaje descontado de cada certificación y retenido hasta la recepción definitiva de la obra.", dificultad: "media", opciones: ["Un porcentaje retenido hasta la recepción definitiva de la obra", "El IVA aplicado a cada certificación", "El beneficio industrial del contratista", "Un descuento por errores de medición"], correcta: 0 },
  { enunciado: "¿Cómo se elabora una certificación a partir de las mediciones?", explicacion: "Aplicando los precios del cuadro de precios a las cantidades realmente ejecutadas en el periodo.", dificultad: "media", opciones: ["Aplicando los precios del cuadro de precios a lo ejecutado", "Repitiendo siempre el importe de la oferta inicial", "Sin relación alguna con las mediciones", "Aplicando solo el coste de materiales"], correcta: 0 },
  { enunciado: "¿Qué diferencia una medición de un presupuesto?", explicacion: "La medición cuantifica unidades de obra; el presupuesto valora esas cantidades aplicando precios.", dificultad: "facil", opciones: ["La medición cuantifica; el presupuesto valora aplicando precios", "Son términos sinónimos e intercambiables", "El presupuesto no depende de la medición", "La medición incluye siempre el IVA"], correcta: 0 },
  { enunciado: "¿Qué debe hacer un oficial de albañilería ante una discrepancia entre lo medido y lo ejecutado?", explicacion: "Comunicarlo al responsable técnico para su comprobación y corrección.", dificultad: "media", opciones: ["Comunicarlo al responsable técnico de la obra", "Ignorarlo si el importe es pequeño", "Modificar la certificación por su cuenta", "Detener toda la obra sin avisar"], correcta: 0 },
]);

// ─────────────────────────────────────────────────────────────────────────
// Vincular a la oposición (Tema 9)
// ─────────────────────────────────────────────────────────────────────────
console.log(`\n🔗 Vinculando ${TEMA} como Tema 9 de ${OPOSICION}...`);
await upsert(
  "tema_oposicion",
  [
    {
      tema_slug: TEMA,
      oposicion_slug: OPOSICION,
      bloque_id: BLOQUE_2_ID,
      numero: 9,
      orden: 9,
      es_premium: false,
      publicado: true,
      secciones_incluidas: null,
    },
  ],
  "tema_slug,oposicion_slug"
);

console.log("\n✅ tema-47 creado y vinculado como Tema 9 de Oficial Albañil.");
