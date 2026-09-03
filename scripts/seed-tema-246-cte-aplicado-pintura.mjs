/**
 * Crea tema-246: "Aplicación de los Documentos Básicos del Código
 * Técnico de la Edificación" — Tema 18 (numero=18, bloque-2) de Oficial
 * Pintor, Especialidad General (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 16 oficial del Anexo I (bases2110.pdf, línea
 * 1477): "Aplicación de los Documentos Básicos del Código Técnico de la
 * Edificación: DB HS-1: Protección Frente a la Humedad. DB SUA-1:
 * Seguridad Frente al Riesgo de Caídas. DB SI: Seguridad en caso de
 * Incendio."
 *
 * Normativa verificada (ya citada y verificada en el proyecto):
 * - RD 314/2006, de 17 de marzo, por el que se aprueba el Código
 *   Técnico de la Edificación (BOE-A-2006-5515), ya citado en
 *   tema-229 de Oficial Conductor Maquinaria Pesada — Documentos
 *   Básicos DB HS-1 (protección frente a la humedad), DB SUA-1
 *   (seguridad frente al riesgo de caídas) y DB SI (seguridad en caso
 *   de incendio).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-246-cte-aplicado-pintura.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-246";
const OPOSICION = "oficial-pintor-general-ayto-zaragoza";
const BLOQUE_2_ID = "77506e2f-f4c6-4512-8bf8-99d0b3bbbafd";

const RD_314_2006 = "https://www.boe.es/buscar/doc.php?id=BOE-A-2006-5515";

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
  titulo: "Aplicación de los Documentos Básicos del Código Técnico de la Edificación",
  descripcion: "El DB HS-1 de protección frente a la humedad. El DB SUA-1 de seguridad frente al riesgo de caídas. El DB SI de seguridad en caso de incendio, aplicados al trabajo de pintura.",
  contenido: "Desarrolla la aplicación práctica de tres Documentos Básicos del Código Técnico de la Edificación (RD 314/2006) al trabajo del Oficial Pintor: el DB HS-1, sobre protección frente a la humedad, relevante para elegir sistemas de pintado transpirables o impermeabilizantes según el elemento constructivo; el DB SUA-1, sobre seguridad frente al riesgo de caídas, relevante tanto para la propia seguridad del pintor al trabajar en altura como para las condiciones de las superficies que pinta (resbaladicidad de pavimentos); y el DB SI, sobre seguridad en caso de incendio, relevante para la reacción al fuego de los propios productos de pintura empleados en determinados elementos constructivos.",
  enlaces_boe: [
    { url: RD_314_2006, titulo: "RD 314/2006 — Código Técnico de la Edificación" },
  ],
  indice_estudio: [
    { url: RD_314_2006, titulo: "DB HS-1: protección frente a la humedad", seccion: "db-hs-1-proteccion-humedad", articulos: "RD 314/2006, DB HS-1" },
    { url: RD_314_2006, titulo: "DB SUA-1: seguridad frente al riesgo de caídas", seccion: "db-sua-1-seguridad-riesgo-caidas", articulos: "RD 314/2006, DB SUA-1" },
    { url: RD_314_2006, titulo: "DB SI: seguridad en caso de incendio", seccion: "db-si-seguridad-caso-incendio", articulos: "RD 314/2006, DB SI" },
  ],
}]);

const S1 = "db-hs-1-proteccion-humedad";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué regula el Documento Básico DB HS-1 del CTE?", reverso: "Las exigencias básicas de salubridad relativas a la protección frente a la humedad, estableciendo condiciones de diseño y ejecución que limiten el riesgo de presencia inadecuada de agua o humedad en el interior de los edificios y en sus cerramientos" },
  { anverso: "¿Qué relación tiene el DB HS-1 con la elección de un sistema de pintado para una fachada?", reverso: "El DB HS-1 exige que los cerramientos limiten el riesgo de humedad, lo que orienta la elección de un sistema de pintado transpirable en fachadas de fábrica o mortero, o de un sistema impermeabilizante en cubiertas o elementos específicamente expuestos, evitando comprometer la protección frente a la humedad exigida al edificio" },
  { anverso: "¿Por qué puede resultar contraproducente, desde la perspectiva del DB HS-1, aplicar un sistema de pintado totalmente impermeable y no transpirable sobre un muro de fábrica antigua?", reverso: "Porque impediría la evacuación del vapor de agua generado en el interior del muro, favoreciendo la acumulación de humedad interna, con el riesgo de desconchones, moho o degradación del propio revestimiento y del muro, en sentido contrario al objetivo de salubridad que persigue el DB HS-1" },
  { anverso: "¿Qué elementos constructivos cita el DB HS-1 como especialmente sensibles a la humedad, y en los que el trabajo de pintura o impermeabilización resulta especialmente relevante?", reverso: "Las fachadas, las cubiertas, los suelos en contacto con el terreno, y los muros y suelos de sótanos y espacios enterrados, todos ellos elementos donde una correcta elección de los productos y sistemas de pintura contribuye a cumplir las exigencias de protección frente a la humedad" },
  { anverso: "¿Qué papel cumple el Oficial Pintor, en la práctica, respecto a las exigencias del DB HS-1 sobre un edificio ya construido?", reverso: "Aunque el DB HS-1 se dirige principalmente al diseño y la ejecución de la obra nueva, el Oficial Pintor contribuye a mantener esa protección frente a la humedad en el mantenimiento del edificio, eligiendo sistemas de pintado adecuados que no comprometan (y en su caso mejoren) el comportamiento del cerramiento frente al agua" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué regula el DB HS-1 del CTE?", explicacion: "La protección frente a la humedad en los edificios y sus cerramientos.", dificultad: "facil", opciones: ["La protección frente a la humedad en los edificios", "La seguridad frente al riesgo de caídas", "La seguridad en caso de incendio", "El aislamiento acústico de los edificios"], correcta: 0 },
  { enunciado: "¿Qué relación tiene el DB HS-1 con la elección de un sistema de pintado de fachada?", explicacion: "Orienta hacia un sistema transpirable en fábrica o mortero, según el riesgo de humedad.", dificultad: "media", opciones: ["Orienta hacia un sistema transpirable según el riesgo de humedad", "No guarda ninguna relación con la elección del sistema de pintado", "Exige siempre un sistema totalmente impermeable en cualquier caso", "Solo resulta relevante en cubiertas, nunca en fachadas"], correcta: 0 },
  { enunciado: "¿Por qué puede ser contraproducente un sistema no transpirable sobre un muro de fábrica antigua?", explicacion: "Impide la evacuación del vapor de agua interno, favoreciendo humedad y degradación.", dificultad: "dificil", opciones: ["Impide la evacuación del vapor de agua interno del muro", "Un sistema no transpirable siempre resulta preferible en fábrica", "La transpirabilidad nunca resulta relevante en muros antiguos", "Solo resulta relevante en muros de construcción reciente"], correcta: 0 },
  { enunciado: "¿Cuál de los siguientes elementos cita el DB HS-1 como especialmente sensible a la humedad?", explicacion: "Las fachadas, entre otros elementos como cubiertas y suelos en contacto con el terreno.", dificultad: "media", opciones: ["Las fachadas", "Las escaleras interiores exclusivamente", "Los falsos techos exclusivamente", "Las puertas interiores exclusivamente"], correcta: 0 },
  { enunciado: "¿Qué papel cumple el Oficial Pintor respecto a las exigencias del DB HS-1 en un edificio ya construido?", explicacion: "Contribuye al mantenimiento de la protección frente a la humedad eligiendo sistemas adecuados.", dificultad: "media", opciones: ["Contribuye al mantenimiento eligiendo sistemas de pintado adecuados", "El DB HS-1 no guarda ninguna relación con el mantenimiento", "Solo resulta relevante durante la construcción del edificio nuevo", "El Oficial Pintor no puede influir en ningún caso en esta materia"], correcta: 0 },
]);

const S2 = "db-sua-1-seguridad-riesgo-caidas";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué regula el Documento Básico DB SUA-1 del CTE?", reverso: "Las exigencias básicas de seguridad de utilización relativas a la limitación del riesgo de caídas, tanto al mismo nivel (resbalones, tropiezos) como a distinto nivel (huecos, desniveles, escaleras)" },
  { anverso: "¿Qué clasificación de la resbaladicidad de los suelos establece el DB SUA-1, relevante para el Oficial Pintor al aplicar un revestimiento de pavimento?", reverso: "Una clasificación por clases (según la resistencia al deslizamiento medida mediante el ensayo del péndulo), exigiendo una clase mínima distinta según la zona del edificio (interior seca, interior húmeda, exterior), que condiciona el tipo de pintura o resina de pavimento y, en su caso, la carga antideslizante a incorporar" },
  { anverso: "¿Qué relación existe entre el DB SUA-1 y la elección de una carga antideslizante en la resina de un pavimento, ya introducida en el tema de pintura para pavimentos?", reverso: "El DB SUA-1 fija los valores mínimos de resistencia al deslizamiento exigibles según la zona del edificio, siendo precisamente la incorporación de una carga antideslizante en la resina o pintura de pavimento uno de los medios técnicos habituales para alcanzar la clase de resbaladicidad exigida" },
  { anverso: "¿Qué exige, con carácter general, el DB SUA-1 respecto a las condiciones de seguridad del propio Oficial Pintor cuando trabaja sobre un andamio o una plataforma elevadora, en relación con el riesgo de caída a distinto nivel?", reverso: "Aunque el DB SUA-1 se dirige principalmente a la seguridad de las personas usuarias del edificio ya construido, el criterio de limitar el riesgo de caída a distinto nivel que inspira este documento es coherente con las exigencias de la normativa de prevención de riesgos laborales (RD 2177/2004) aplicable a los propios trabajos en altura del pintor" },
  { anverso: "¿Por qué es relevante para el Oficial Pintor conocer la clasificación de resbaladicidad del DB SUA-1 antes de recomendar o aplicar un acabado en un pavimento público (por ejemplo, de un edificio municipal)?", reverso: "Porque aplicar un acabado con una resbaladicidad inferior a la clase mínima exigida para esa zona podría incumplir la normativa vigente y generar un riesgo real de caída para las personas usuarias del edificio, más allá de una simple preferencia estética" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué regula el DB SUA-1 del CTE?", explicacion: "La limitación del riesgo de caídas al mismo nivel y a distinto nivel.", dificultad: "facil", opciones: ["La limitación del riesgo de caídas", "La protección frente a la humedad de los edificios", "La seguridad en caso de incendio", "El aislamiento térmico de los edificios"], correcta: 0 },
  { enunciado: "¿Qué establece el DB SUA-1 en relación con la resbaladicidad de los suelos?", explicacion: "Una clasificación por clases según la resistencia al deslizamiento, con exigencia mínima según la zona.", dificultad: "media", opciones: ["Una clasificación por clases según la resistencia al deslizamiento", "Ninguna exigencia específica sobre la resbaladicidad de suelos", "Exige siempre la misma clase en cualquier zona del edificio", "Solo resulta aplicable a suelos de uso exclusivamente exterior"], correcta: 0 },
  { enunciado: "¿Qué relación existe entre el DB SUA-1 y una carga antideslizante en la resina de un pavimento?", explicacion: "La carga antideslizante es uno de los medios técnicos para alcanzar la clase de resbaladicidad exigida.", dificultad: "dificil", opciones: ["La carga antideslizante ayuda a alcanzar la clase exigida por el DB", "Ninguna relación real entre ambos aspectos del pavimento", "El DB SUA-1 nunca resulta aplicable a pavimentos pintados", "La carga antideslizante siempre resulta incompatible con el DB SUA-1"], correcta: 0 },
  { enunciado: "¿Con qué normativa de prevención de riesgos resulta coherente el criterio del DB SUA-1 sobre caídas a distinto nivel, aplicado al propio trabajo del pintor en altura?", explicacion: "Con el RD 2177/2004, sobre trabajos temporales en altura.", dificultad: "dificil", opciones: ["Con el RD 2177/2004 sobre trabajos temporales en altura", "Con el Reglamento CLP de clasificación de sustancias", "Con el RD 227/2006 de límites de COV", "Con ninguna otra normativa de prevención de riesgos"], correcta: 0 },
  { enunciado: "¿Por qué es relevante conocer la clasificación de resbaladicidad antes de aplicar un acabado en un pavimento público?", explicacion: "Un acabado inferior a la clase mínima exigida podría incumplir la normativa y generar riesgo real de caída.", dificultad: "media", opciones: ["Un acabado inadecuado podría incumplir la normativa y generar riesgo", "La resbaladicidad nunca resulta relevante en edificios públicos", "Solo resulta relevante en pavimentos de uso privado", "Solo resulta relevante si el pavimento es de color oscuro"], correcta: 0 },
]);

const S3 = "db-si-seguridad-caso-incendio";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué regula el Documento Básico DB SI del CTE?", reverso: "Las exigencias básicas de seguridad en caso de incendio, incluidas las relativas a la reacción al fuego y a la resistencia al fuego de los elementos constructivos y de los materiales de revestimiento empleados en el edificio" },
  { anverso: "¿Qué es la reacción al fuego de un material, concepto relevante para las pinturas empleadas como revestimiento según el DB SI?", reverso: "La respuesta de un material frente al fuego en cuanto a su contribución al desarrollo del incendio (inflamabilidad, velocidad de propagación de la llama, generación de humo), clasificada mediante euroclases (A1, A2, B, C, D, E, F) que el DB SI exige según la zona y el uso del edificio" },
  { anverso: "¿Por qué puede exigirse una pintura intumescente en determinados elementos constructivos, en relación con las exigencias del DB SI?", reverso: "Porque una pintura intumescente, que se expande formando una capa aislante en caso de incendio, puede contribuir a mejorar la resistencia al fuego de un elemento estructural (por ejemplo, una viga o un pilar metálico), ayudando a cumplir el tiempo de resistencia al fuego exigido por el DB SI para ese elemento" },
  { anverso: "¿Qué debe tener en cuenta el Oficial Pintor al elegir un revestimiento para las vías de evacuación de un edificio público, en relación con las exigencias del DB SI?", reverso: "Que el DB SI exige a los revestimientos de paredes y techos de las vías de evacuación una clase de reacción al fuego determinada (habitualmente más exigente que en otras zonas del edificio), por lo que debe verificarse que el producto elegido cumple la clasificación de reacción al fuego exigida para ese uso concreto" },
  { anverso: "¿Dónde puede consultar el Oficial Pintor la clasificación de reacción al fuego de un producto de pintura o barniz concreto, antes de emplearlo en un elemento sujeto a las exigencias del DB SI?", reverso: "En la ficha técnica o en la documentación de ensayo del propio fabricante, que debe indicar la euroclase de reacción al fuego obtenida por el producto (o por el sistema completo, incluido el soporte sobre el que se ensayó), conforme a la normativa de ensayo europea aplicable" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué regula el DB SI del CTE?", explicacion: "La seguridad en caso de incendio, incluida la reacción y resistencia al fuego de materiales.", dificultad: "facil", opciones: ["La seguridad en caso de incendio", "La protección frente a la humedad", "La limitación del riesgo de caídas", "El aislamiento acústico de los edificios"], correcta: 0 },
  { enunciado: "¿Qué es la reacción al fuego de un material, según el DB SI?", explicacion: "Su contribución al desarrollo del incendio, clasificada mediante euroclases.", dificultad: "media", opciones: ["Su contribución al desarrollo del incendio, en euroclases", "Su resistencia mecánica frente a un impacto", "Su resistencia a la abrasión superficial", "Su capacidad de aislamiento térmico"], correcta: 0 },
  { enunciado: "¿Qué función cumple una pintura intumescente en relación con el DB SI?", explicacion: "Se expande formando una capa aislante, ayudando a mejorar la resistencia al fuego del elemento.", dificultad: "dificil", opciones: ["Se expande formando una capa aislante en caso de incendio", "Reduce la resistencia al fuego del elemento tratado", "Aumenta la inflamabilidad del elemento tratado", "No guarda ninguna relación con la resistencia al fuego"], correcta: 0 },
  { enunciado: "¿Qué debe verificar el Oficial Pintor al elegir un revestimiento para una vía de evacuación de un edificio público?", explicacion: "Que el producto cumple la clase de reacción al fuego exigida por el DB SI para ese uso.", dificultad: "media", opciones: ["Que el producto cumple la clase de reacción al fuego exigida", "Ninguna verificación específica distinta del color elegido", "Que el producto sea el más económico disponible en el mercado", "Que el producto tenga la mayor viscosidad posible"], correcta: 0 },
  { enunciado: "¿Dónde puede consultar el Oficial Pintor la clasificación de reacción al fuego de un producto?", explicacion: "En la ficha técnica o documentación de ensayo del fabricante.", dificultad: "media", opciones: ["En la ficha técnica o documentación de ensayo del fabricante", "Nunca se indica esta información en ningún documento del producto", "Únicamente preguntando directamente al servicio de bomberos", "Únicamente en el propio texto del DB SI, sin consultar al fabricante"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 18 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 18, orden: 18, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-246 creado y vinculado como Tema 18 de Oficial Pintor General.");
