/**
 * Crea tema-242: "Procesos de los trabajos de pintura" — Tema 14
 * (numero=14, bloque-2) de Oficial Pintor, Especialidad General (Ayto.
 * Zaragoza).
 *
 * Corresponde al TEMA 12 oficial del Anexo I (bases2110.pdf, línea
 * 1465): "Procesos de los trabajos de pintura. Tipos de superficies y
 * características de los materiales. Preparación y limpieza de
 * Superficies. Normativa."
 *
 * Normativa: RD 486/1997 (BOE-A-1997-8669, ya citado en tema-235) para
 * las condiciones del entorno de trabajo durante la preparación de
 * superficies (polvo, ventilación); Reglamento CLP (ya citado) para los
 * productos de limpieza y decapado empleados. El resto (proceso técnico
 * de preparación según el tipo de superficie) es conocimiento técnico
 * consolidado del oficio.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-242-procesos-trabajos-pintura.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-242";
const OPOSICION = "oficial-pintor-general-ayto-zaragoza";
const BLOQUE_2_ID = "77506e2f-f4c6-4512-8bf8-99d0b3bbbafd";

const RD_486_1997 = "https://www.boe.es/buscar/act.php?id=BOE-A-1997-8669";
const REGLAMENTO_CLP = "https://www.boe.es/buscar/doc.php?id=DOUE-L-2008-82637";

async function insertar(tabla, filas) {
  const res = await fetch(`${URL_BASE}/rest/v1/${tabla}`, { method: "POST", headers: { ...HEADERS, Prefer: "return=representation" }, body: JSON.stringify(filas) });
  if (!res.ok) { console.error(`❌ Error en ${tabla}: ${res.status} ${await res.text()}`); process.exit(1); }
  return res.json();
}
async function upsert(tabla, filas, onConflict) {
  const res = await fetch(`${URL_BASE}/rest/v1/${tabla}?on_conflict=${onConflict}`, { method: "POST", headers: { ...HEADERS, Prefer: "resolution=merge-duplicates,return=representation" }, body: JSON.stringify(filas) });
  if (!res.ok) { console.error(`❌ Error en ${tabla}: ${res.status} ${await res.text()}`); process.exit(1); }
  return res.json();
}
async function insertarPreguntasConOpciones(seccion, preguntas) {
  const filas = preguntas.map(({ opciones, correcta, ...p }) => ({ ...p, tema_slug: TEMA, seccion }));
  const insertadas = await insertar("preguntas", filas);
  console.log(`   ✓ preguntas: ${insertadas.length} filas`);
  const filasOpciones = insertadas.flatMap((pregunta, i) => preguntas[i].opciones.map((texto, orden) => ({ pregunta_id: pregunta.id, texto, es_correcta: orden === preguntas[i].correcta, orden })));
  const opcionesInsertadas = await insertar("opciones", filasOpciones);
  console.log(`   ✓ opciones: ${opcionesInsertadas.length} filas`);
}

console.log(`📚 Creando ${TEMA}...`);
await insertar("temas", [{
  slug: TEMA,
  titulo: "Procesos de los trabajos de pintura",
  descripcion: "Tipos de superficies y características de los materiales a pintar. Preparación y limpieza de superficies antes de pintar. Secuencia general de un proceso de pintura.",
  contenido: "Desarrolla el proceso completo de un trabajo de pintura, desde la evaluación inicial de la superficie hasta la aplicación del acabado: los tipos de superficies habituales (yeso, mortero, hormigón, madera, metal) y sus características particulares como soporte de pintura; la preparación y limpieza de superficies previa a la aplicación (eliminación de polvo, grasa, pintura vieja en mal estado, reparación de imperfecciones); y la secuencia general de un proceso de pintura, con referencia a las condiciones de trabajo que exige el RD 486/1997 durante estas operaciones.",
  enlaces_boe: [
    { url: RD_486_1997, titulo: "RD 486/1997 — condiciones de seguridad y salud en los lugares de trabajo" },
    { url: REGLAMENTO_CLP, titulo: "Reglamento (CE) 1272/2008 (CLP) — clasificación, etiquetado y envasado" },
  ],
  indice_estudio: [
    { url: "", titulo: "Tipos de superficies y características de los materiales", seccion: "tipos-superficies-caracteristicas-materiales", articulos: "Conocimiento técnico del oficio" },
    { url: REGLAMENTO_CLP, titulo: "Preparación y limpieza de superficies", seccion: "preparacion-limpieza-superficies", articulos: "Reglamento CLP" },
    { url: RD_486_1997, titulo: "La secuencia general del proceso de trabajo", seccion: "secuencia-general-proceso-trabajo", articulos: "RD 486/1997" },
  ],
}]);

const S1 = "tipos-superficies-caracteristicas-materiales";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué característica del yeso como soporte resulta especialmente relevante antes de pintarlo?", reverso: "Su elevada porosidad y absorción, que exige habitualmente una imprimación selladora previa para evitar una absorción irregular de la pintura de acabado y diferencias de brillo o tono sobre la superficie" },
  { anverso: "¿Qué característica del hormigón o el mortero nuevo debe tenerse en cuenta antes de pintarlo?", reverso: "Su elevada alcalinidad (pH básico) mientras el material está fraguando, que puede degradar determinadas pinturas si se aplican demasiado pronto, por lo que suele exigirse un tiempo mínimo de curado antes de pintar, salvo empleo de pinturas específicamente resistentes a medios alcalinos" },
  { anverso: "¿Qué característica de la madera resulta especialmente relevante como soporte de pintura?", reverso: "Su carácter higroscópico (capacidad de absorber y ceder humedad ambiental), que provoca variaciones dimensionales, y la presencia de nudos, resinas o taninos que pueden manchar o afectar a la adherencia de la pintura si no se tratan previamente" },
  { anverso: "¿Qué característica de las superficies metálicas resulta especialmente relevante antes de pintarlas?", reverso: "Su tendencia a la corrosión en presencia de humedad y oxígeno, que exige una preparación previa (eliminación de óxido, desengrasado) y, habitualmente, una imprimación antioxidante antes de la pintura de acabado" },
  { anverso: "¿Por qué es importante identificar correctamente el tipo de superficie antes de planificar un trabajo de pintura?", reverso: "Porque cada material exige una preparación, una imprimación y, en ocasiones, un tipo de pintura específicos; aplicar un producto inadecuado al soporte puede provocar una falta de adherencia, un desconchado prematuro o una reacción química indeseada con el material base" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué característica del yeso resulta especialmente relevante antes de pintarlo?", explicacion: "Su elevada porosidad y absorción, que exige habitualmente una imprimación selladora.", dificultad: "facil", opciones: ["Su elevada porosidad y absorción", "Su elevada resistencia a la abrasión", "Su tendencia a la corrosión con la humedad", "Su carácter higroscópico frente al ambiente"], correcta: 0 },
  { enunciado: "¿Qué característica del hormigón o mortero nuevo debe tenerse en cuenta antes de pintarlo?", explicacion: "Su elevada alcalinidad mientras el material está fraguando.", dificultad: "media", opciones: ["Su elevada alcalinidad durante el fraguado", "Su nula porosidad frente a cualquier producto", "Su tendencia a la corrosión con la humedad", "Su carácter higroscópico frente al ambiente"], correcta: 0 },
  { enunciado: "¿Qué característica de la madera resulta especialmente relevante como soporte de pintura?", explicacion: "Su carácter higroscópico y la presencia de nudos, resinas o taninos.", dificultad: "media", opciones: ["Su carácter higroscópico y la presencia de nudos o resinas", "Su elevada alcalinidad durante el fraguado", "Su tendencia a la corrosión con la humedad", "Su nula porosidad frente a cualquier producto"], correcta: 0 },
  { enunciado: "¿Qué característica de las superficies metálicas resulta especialmente relevante antes de pintarlas?", explicacion: "Su tendencia a la corrosión en presencia de humedad y oxígeno.", dificultad: "media", opciones: ["Su tendencia a la corrosión en presencia de humedad", "Su elevada porosidad y absorción de pintura", "Su carácter higroscópico frente al ambiente", "Su elevada alcalinidad durante el fraguado"], correcta: 0 },
  { enunciado: "¿Por qué es importante identificar correctamente el tipo de superficie antes de un trabajo de pintura?", explicacion: "Cada material exige una preparación e imprimación específicas; un producto inadecuado provoca fallos.", dificultad: "dificil", opciones: ["Cada material exige una preparación e imprimación específicas", "El tipo de superficie nunca influye en el resultado final", "Todos los materiales exigen exactamente la misma preparación", "Solo resulta relevante en superficies de gran tamaño"], correcta: 0 },
]);

const S2 = "preparacion-limpieza-superficies";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué operaciones básicas comprende, con carácter general, la preparación de una superficie antes de pintarla?", reverso: "La eliminación de polvo, grasa y suciedad superficial; el saneado de pintura vieja en mal estado (desconchada o mal adherida); la reparación de imperfecciones (grietas, agujeros) mediante masilla; y el lijado final para igualar la textura y mejorar la adherencia" },
  { anverso: "¿Qué es el decapado, como operación de preparación de superficies?", reverso: "La eliminación completa de una capa de pintura antigua mediante medios mecánicos (lijado, cepillado, rascado), térmicos (pistola de aire caliente) o químicos (decapante), dejando el soporte original a la vista antes de aplicar un nuevo sistema de pintura" },
  { anverso: "¿Qué precaución debe adoptarse al emplear un decapante químico sobre una superficie con pintura antigua?", reverso: "Verificar previamente, cuando el edificio o elemento sea antiguo, si la pintura pudiera contener plomo (habitual en pinturas anteriores a su prohibición), extremando las medidas de protección respiratoria y de gestión de residuos, dada la toxicidad de este metal" },
  { anverso: "¿Qué es el desengrasado de una superficie metálica, como paso previo a su pintado?", reverso: "La eliminación de grasas, aceites o residuos de mecanizado presentes en la superficie metálica, mediante disolventes desengrasantes específicos, imprescindible para lograr una correcta adherencia de la imprimación antioxidante y de la pintura de acabado" },
  { anverso: "¿Por qué debe dejarse secar completamente una superficie recién limpiada con agua o con un producto de limpieza acuoso antes de aplicar la pintura?", reverso: "Porque la humedad residual puede impedir una correcta adherencia de la pintura, provocar la aparición de burbujas o ampollas en la película, o favorecer el desarrollo de hongos bajo una pintura al agua aplicada sobre un soporte todavía húmedo" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué operaciones comprende, con carácter general, la preparación de una superficie antes de pintarla?", explicacion: "Eliminación de polvo y grasa, saneado, reparación con masilla y lijado final.", dificultad: "facil", opciones: ["Eliminación de suciedad, saneado, reparación y lijado", "Únicamente la aplicación directa de la pintura de acabado", "Únicamente el lijado final, sin ninguna otra operación", "Ninguna preparación resulta necesaria en la práctica"], correcta: 0 },
  { enunciado: "¿Qué es el decapado, como operación de preparación de superficies?", explicacion: "La eliminación completa de una capa de pintura antigua mediante medios mecánicos, térmicos o químicos.", dificultad: "media", opciones: ["La eliminación completa de una capa de pintura antigua", "La aplicación de una nueva capa de imprimación", "La mezcla de dos componentes de una pintura epoxi", "El lijado final de una superficie ya reparada"], correcta: 0 },
  { enunciado: "¿Qué precaución debe adoptarse al decapar químicamente una pintura antigua en un edificio de cierta antigüedad?", explicacion: "Verificar si la pintura pudiera contener plomo, extremando protección respiratoria y gestión de residuos.", dificultad: "dificil", opciones: ["Verificar si la pintura pudiera contener plomo", "Ninguna precaución adicional distinta del decapado habitual", "Solo resulta relevante en edificios de construcción reciente", "Solo resulta relevante si se emplea un decapante mecánico"], correcta: 0 },
  { enunciado: "¿Qué es el desengrasado de una superficie metálica antes de pintarla?", explicacion: "La eliminación de grasas o residuos de mecanizado mediante disolventes desengrasantes.", dificultad: "media", opciones: ["La eliminación de grasas mediante disolventes desengrasantes", "La eliminación del óxido mediante lijado mecánico", "La aplicación de la imprimación antioxidante", "El lijado final de la superficie ya desengrasada"], correcta: 0 },
  { enunciado: "¿Por qué debe secarse completamente una superficie limpiada con agua antes de pintarla?", explicacion: "La humedad residual puede impedir la adherencia o provocar burbujas y hongos.", dificultad: "media", opciones: ["La humedad residual puede impedir la adherencia o generar defectos", "La humedad residual nunca afecta al resultado de la pintura", "Solo resulta relevante en pinturas de base disolvente", "Solo resulta relevante en superficies metálicas"], correcta: 0 },
]);

const S3 = "secuencia-general-proceso-trabajo";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Cuál es, con carácter general, la secuencia lógica de un proceso completo de pintura sobre una superficie deteriorada?", reverso: "Evaluación e identificación del soporte, limpieza y saneado, reparación de imperfecciones con masilla, lijado, aplicación de imprimación, y aplicación de la pintura de acabado en el número de manos necesario, respetando los tiempos de secado entre cada fase" },
  { anverso: "¿Qué exige, con carácter general, el RD 486/1997 respecto a las condiciones ambientales de un espacio en el que se está realizando una operación de lijado que genera polvo?", reverso: "Una ventilación adecuada que evite la acumulación de polvo en suspensión, condición especialmente relevante si el proceso implica el lijado de pintura antigua o de masillas que puedan contener sustancias a controlar (como el plomo en pinturas muy antiguas)" },
  { anverso: "¿Por qué es importante respetar el orden correcto entre la reparación de imperfecciones (masillado) y el lijado dentro de la secuencia del proceso?", reverso: "Porque la masilla debe aplicarse, secar y endurecerse antes de poder lijarla correctamente; lijar antes de tiempo o sin que la masilla haya curado por completo puede arrancarla o dejar un acabado irregular" },
  { anverso: "¿Qué debe comprobar el Oficial Pintor entre la aplicación de la imprimación y la pintura de acabado, dentro de la secuencia del proceso?", reverso: "Que se ha respetado el tiempo de secado mínimo y, en su caso, el tiempo máximo de repintado indicado en la ficha técnica de la imprimación, para garantizar una correcta adherencia entre ambas capas" },
  { anverso: "¿Por qué puede resultar contraproducente saltarse alguna fase de la secuencia general del proceso para acelerar la ejecución del trabajo?", reverso: "Porque cada fase cumple una función específica en la calidad y durabilidad final del acabado; omitir la limpieza, la reparación o el respeto de los tiempos de secado puede provocar defectos visibles o un fallo prematuro de la pintura, obligando a repetir el trabajo" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Cuál es la secuencia lógica general de un proceso completo de pintura sobre una superficie deteriorada?", explicacion: "Evaluación, limpieza, reparación, lijado, imprimación y pintura de acabado.", dificultad: "media", opciones: ["Evaluación, limpieza, reparación, lijado, imprimación y acabado", "Aplicación directa del acabado sin ninguna fase previa", "Únicamente lijado y aplicación directa de la pintura", "El orden de las fases nunca resulta relevante en la práctica"], correcta: 0 },
  { enunciado: "¿Qué exige el RD 486/1997 respecto a las condiciones ambientales durante una operación de lijado que genera polvo?", explicacion: "Una ventilación adecuada que evite la acumulación de polvo en suspensión.", dificultad: "media", opciones: ["Una ventilación adecuada que evite la acumulación de polvo", "Ninguna exigencia específica sobre esta operación", "Solo resulta exigible si el lijado dura más de un día", "Solo resulta exigible en espacios de más de cien metros"], correcta: 0 },
  { enunciado: "¿Por qué es importante respetar el orden entre el masillado y el lijado?", explicacion: "La masilla debe secar y endurecerse antes de poder lijarla correctamente.", dificultad: "dificil", opciones: ["La masilla debe secar y endurecerse antes del lijado", "El orden entre ambas operaciones nunca resulta relevante", "Siempre conviene lijar antes de aplicar la masilla", "La masilla nunca requiere ningún tiempo de secado"], correcta: 0 },
  { enunciado: "¿Qué debe comprobarse entre la aplicación de la imprimación y la pintura de acabado?", explicacion: "Que se ha respetado el tiempo de secado y, en su caso, el máximo de repintado.", dificultad: "media", opciones: ["Que se han respetado los tiempos de secado y repintado", "Ninguna comprobación adicional resulta necesaria", "Solo resulta relevante si se emplea una pistola de pintar", "Solo resulta relevante en superficies metálicas"], correcta: 0 },
  { enunciado: "¿Por qué puede resultar contraproducente saltarse una fase de la secuencia general para acelerar el trabajo?", explicacion: "Cada fase cumple una función en la calidad final; omitirla puede provocar un fallo prematuro.", dificultad: "media", opciones: ["Cada fase cumple una función y omitirla puede provocar fallos", "Ninguna fase resulta realmente necesaria en la práctica", "Omitir fases nunca afecta a la calidad del resultado final", "Solo resulta relevante en trabajos de gran superficie"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 14 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 14, orden: 14, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-242 creado y vinculado como Tema 14 de Oficial Pintor General.");
