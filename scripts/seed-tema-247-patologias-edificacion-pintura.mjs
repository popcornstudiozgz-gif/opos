/**
 * Crea tema-247: "Patologías en la edificación afectas a la pintura" —
 * Tema 19 (numero=19, bloque-2) de Oficial Pintor, Especialidad General
 * (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 17 oficial del Anexo I (bases2110.pdf, línea
 * 1480): "Patologías en la edificación afectas a la pintura: Causas.
 * Reparaciones."
 *
 * Normativa: RD 314/2006 (BOE-A-2006-5515, CTE), ya citado en el
 * tema-246 de este mismo bloque, relevante como marco de referencia de
 * las exigencias de salubridad que las patologías incumplen. El resto
 * (identificación y reparación técnica de cada patología) es
 * conocimiento técnico consolidado del oficio.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-247-patologias-edificacion-pintura.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-247";
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
  titulo: "Patologías en la edificación afectas a la pintura",
  descripcion: "Patologías habituales que afectan a la pintura: humedades, eflorescencias, fisuras, desconchados. Causas de cada patología. Técnicas de reparación antes de repintar.",
  contenido: "Desarrolla las patologías constructivas más habituales que afectan al trabajo de pintura: las humedades (de filtración, de capilaridad, de condensación) y su manifestación sobre la pintura; las eflorescencias salinas propias de soportes minerales húmedos; las fisuras y grietas del soporte, y su posible origen estructural o superficial; y los desconchados o pérdidas de adherencia de pinturas anteriores. Se estudian las causas de cada patología y las técnicas de reparación necesarias antes de proceder a un nuevo repintado, con referencia al marco de exigencias de salubridad del CTE ya introducido en el tema anterior.",
  enlaces_boe: [
    { url: RD_314_2006, titulo: "RD 314/2006 — Código Técnico de la Edificación (DB HS-1)" },
  ],
  indice_estudio: [
    { url: RD_314_2006, titulo: "Humedades: tipos, causas y manifestación sobre la pintura", seccion: "humedades-tipos-causas-manifestacion", articulos: "RD 314/2006, DB HS-1" },
    { url: "", titulo: "Eflorescencias, fisuras y grietas del soporte", seccion: "eflorescencias-fisuras-grietas-soporte", articulos: "Conocimiento técnico del oficio" },
    { url: "", titulo: "Desconchados y técnicas de reparación antes de repintar", seccion: "desconchados-tecnicas-reparacion-repintado", articulos: "Conocimiento técnico del oficio" },
  ],
}]);

const S1 = "humedades-tipos-causas-manifestacion";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es una humedad de filtración, como patología que afecta a la pintura?", reverso: "La entrada de agua a través de un cerramiento (cubierta, fachada, junta) por un defecto de estanqueidad o de mantenimiento, que se manifiesta habitualmente como una mancha localizada, a menudo con un contorno irregular, y que suele agravarse tras episodios de lluvia intensa" },
  { anverso: "¿Qué es una humedad de capilaridad, y en qué elementos constructivos resulta más habitual?", reverso: "El ascenso del agua del terreno a través de los poros de un material de construcción por capilaridad, especialmente habitual en la base de muros en contacto con el terreno sin una barrera antihumedad adecuada, manifestándose como una franja de humedad y deterioro de la pintura en la zona inferior del muro" },
  { anverso: "¿Qué es una humedad de condensación, y por qué resulta frecuente en determinados espacios interiores?", reverso: "La formación de agua líquida sobre una superficie fría al entrar en contacto con aire húmedo (por ejemplo, en un puente térmico o en una zona mal ventilada de un baño o cocina), resultando frecuente en espacios con elevada generación de vapor de agua y ventilación insuficiente" },
  { anverso: "¿Por qué es importante identificar correctamente el tipo de humedad antes de repintar una zona afectada, y no limitarse a aplicar una nueva capa de pintura?", reverso: "Porque cada tipo de humedad tiene una causa y una solución distintas (impermeabilización de la filtración, barrera antihumedad para la capilaridad, mejora de la ventilación o del aislamiento para la condensación); repintar sin resolver la causa original solo oculta temporalmente el problema, que reaparecerá con el tiempo" },
  { anverso: "¿Qué relación existe entre las exigencias del DB HS-1 del CTE, ya estudiado en el tema anterior, y las humedades de filtración o capilaridad detectadas en un edificio existente?", reverso: "El DB HS-1 fija las condiciones de diseño y ejecución que deberían haber evitado estas patologías en un edificio de nueva construcción; su aparición en un edificio existente revela habitualmente un defecto de ejecución, de mantenimiento o un envejecimiento de los elementos de protección frente a la humedad originalmente previstos" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es una humedad de filtración?", explicacion: "La entrada de agua a través de un cerramiento por un defecto de estanqueidad o mantenimiento.", dificultad: "facil", opciones: ["La entrada de agua por un defecto de estanqueidad", "El ascenso de agua del terreno por capilaridad", "La condensación de vapor sobre una superficie fría", "Una eflorescencia salina sobre un soporte mineral"], correcta: 0 },
  { enunciado: "¿Qué es una humedad de capilaridad?", explicacion: "El ascenso de agua del terreno por los poros de un material, habitual en la base de muros.", dificultad: "media", opciones: ["El ascenso de agua del terreno por los poros del material", "La entrada de agua por una cubierta defectuosa", "La condensación de vapor de agua en un baño", "Un desconchado de pintura por falta de adherencia"], correcta: 0 },
  { enunciado: "¿Qué es una humedad de condensación?", explicacion: "La formación de agua líquida sobre una superficie fría en contacto con aire húmedo.", dificultad: "media", opciones: ["La formación de agua sobre una superficie fría", "El ascenso de agua del terreno por capilaridad", "La entrada de agua a través de una fachada dañada", "Una fisura estructural del soporte de la pared"], correcta: 0 },
  { enunciado: "¿Por qué es importante identificar el tipo de humedad antes de repintar una zona afectada?", explicacion: "Cada tipo tiene una causa y solución distintas; repintar sin resolverla solo oculta el problema.", dificultad: "dificil", opciones: ["Cada tipo tiene una causa distinta y repintar solo oculta el problema", "Repintar siempre resuelve cualquier tipo de humedad detectada", "El tipo de humedad nunca influye en la solución adecuada", "Solo resulta relevante en humedades de condensación"], correcta: 0 },
  { enunciado: "¿Qué revela la aparición de una humedad de filtración o capilaridad en un edificio existente, en relación con el DB HS-1?", explicacion: "Un defecto de ejecución, mantenimiento o envejecimiento de los elementos de protección previstos.", dificultad: "media", opciones: ["Un defecto de ejecución, mantenimiento o envejecimiento", "El DB HS-1 nunca guarda relación con humedades ya existentes", "Que el edificio cumple correctamente todas las exigencias del CTE", "Que la humedad detectada no tiene ninguna causa identificable"], correcta: 0 },
]);

const S2 = "eflorescencias-fisuras-grietas-soporte";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es una eflorescencia, como patología que afecta a un soporte mineral pintado?", reverso: "Un depósito cristalino blanquecino que aparece en la superficie de un material poroso (ladrillo, mortero, hormigón), formado por sales solubles que, disueltas en el agua presente en el material, migran hacia la superficie y cristalizan al evaporarse el agua, pudiendo dañar la adherencia de la pintura aplicada sobre ellas" },
  { anverso: "¿Por qué resulta problemático pintar directamente sobre una eflorescencia sin tratarla previamente?", reverso: "Porque las sales pueden seguir migrando hacia la superficie desde el interior del material, empujando y desprendiendo la nueva capa de pintura desde su base, además de que la propia eflorescencia sin eliminar dificulta la adherencia inicial de la pintura" },
  { anverso: "¿Qué diferencia existe entre una fisura y una grieta, en el ámbito de las patologías de la edificación?", reverso: "La fisura es una abertura de espesor muy reducido (habitualmente inferior a 1-2 mm) que afecta solo al revestimiento superficial; la grieta es una abertura de mayor espesor que afecta también al elemento estructural o constructivo de base, pudiendo indicar un problema más grave que una fisura meramente superficial" },
  { anverso: "¿Qué debería hacer el Oficial Pintor si, al preparar una superficie, detecta una grieta de cierta entidad en un elemento estructural, en lugar de una simple fisura superficial?", reverso: "Comunicar la incidencia al personal técnico responsable antes de proceder a repararla y repintarla, dado que una grieta estructural puede requerir un estudio y una solución técnica que exceda del ámbito de una simple reparación estética con masilla" },
  { anverso: "¿Qué es una fisura de retracción, habitual en morteros y enlucidos nuevos?", reverso: "Una fisura superficial de trazado habitualmente irregular (a veces en forma de mapa o \"craquelado\"), provocada por la contracción del material durante su proceso de secado y fraguado, sin implicar necesariamente un problema estructural del elemento" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es una eflorescencia, como patología de un soporte mineral?", explicacion: "Un depósito cristalino blanquecino de sales solubles que migran a la superficie y cristalizan.", dificultad: "media", opciones: ["Un depósito cristalino de sales solubles en la superficie", "Una fisura superficial provocada por la retracción del material", "Una grieta estructural del elemento constructivo base", "Un desconchado de pintura por falta de adherencia previa"], correcta: 0 },
  { enunciado: "¿Por qué resulta problemático pintar directamente sobre una eflorescencia sin tratarla?", explicacion: "Las sales pueden seguir migrando y empujar la nueva capa de pintura desde su base.", dificultad: "dificil", opciones: ["Las sales pueden seguir migrando y desprender la pintura", "Pintar sobre una eflorescencia nunca genera ningún problema", "La eflorescencia siempre desaparece por sí sola al pintar", "Solo resulta problemático en pinturas de base disolvente"], correcta: 0 },
  { enunciado: "¿Qué diferencia una fisura de una grieta?", explicacion: "La fisura es de espesor muy reducido y superficial; la grieta afecta al elemento estructural.", dificultad: "media", opciones: ["La grieta afecta al elemento estructural, la fisura es superficial", "Ambos términos son exactamente sinónimos en patología", "La fisura siempre resulta más grave que una grieta", "La grieta nunca afecta a elementos estructurales"], correcta: 0 },
  { enunciado: "¿Qué debería hacer el Oficial Pintor ante una grieta de cierta entidad en un elemento estructural?", explicacion: "Comunicarlo al personal técnico responsable antes de repararla y repintarla.", dificultad: "media", opciones: ["Comunicarlo al personal técnico responsable antes de actuar", "Repararla directamente con masilla sin comunicarlo a nadie", "Ignorarla si no resulta visible tras aplicar la pintura", "Repintar directamente sobre la grieta sin ninguna reparación"], correcta: 0 },
  { enunciado: "¿Qué es una fisura de retracción en un mortero o enlucido nuevo?", explicacion: "Una fisura superficial por contracción del material durante el secado, sin problema estructural necesario.", dificultad: "dificil", opciones: ["Una fisura por contracción del material durante el secado", "Una grieta estructural del elemento constructivo base", "Un depósito cristalino de sales solubles en la superficie", "Un desconchado de pintura por falta de adherencia"], correcta: 0 },
]);

const S3 = "desconchados-tecnicas-reparacion-repintado";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un desconchado, como patología de una pintura ya aplicada?", reverso: "El desprendimiento de una zona de la película de pintura respecto al soporte, dejando este a la vista, provocado habitualmente por una falta de adherencia originada en una preparación insuficiente del soporte, una humedad subyacente o el propio envejecimiento y pérdida de flexibilidad de la pintura antigua" },
  { anverso: "¿Cuál es la secuencia general de reparación de una zona con desconchados antes de repintar?", reverso: "Eliminar por completo la pintura mal adherida en la zona afectada y en su entorno (hasta encontrar pintura firmemente adherida), lijar los bordes para suavizar el escalón resultante, reparar con masilla si existe pérdida de espesor, lijar de nuevo, aplicar imprimación si procede, y repintar toda la zona o el paramento completo según el criterio técnico" },
  { anverso: "¿Por qué conviene, en muchos casos, repintar el paramento completo en lugar de repasar únicamente la zona reparada de un desconchado?", reverso: "Porque un simple repaso localizado puede resultar visible por diferencias de brillo, tono o textura respecto a la pintura antigua circundante, mientras que repintar todo el paramento garantiza un acabado uniforme, especialmente si la pintura original ha perdido brillo o ha cambiado ligeramente de tono con el tiempo" },
  { anverso: "¿Qué debe verificarse antes de repintar sobre una zona previamente afectada por una humedad, aunque esta ya se haya resuelto y la superficie parezca seca?", reverso: "Que el soporte se encuentra realmente seco en profundidad (no solo en superficie), y que la causa original de la humedad ha quedado efectivamente resuelta, dado que repintar sobre una humedad residual o no resuelta provocaría la reaparición de la misma patología a corto plazo" },
  { anverso: "¿Qué relación existe entre este tema de patologías y el tema ya estudiado sobre procesos de trabajo y preparación de superficies?", reverso: "Las técnicas de preparación (limpieza, saneado, masillado, lijado) ya estudiadas son precisamente las herramientas técnicas que se aplican para reparar cada patología concreta antes de repintar, por lo que ambos temas se complementan directamente en la práctica del oficio" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es un desconchado, como patología de una pintura ya aplicada?", explicacion: "El desprendimiento de una zona de la película de pintura respecto al soporte.", dificultad: "facil", opciones: ["El desprendimiento de la película de pintura del soporte", "Un depósito cristalino de sales solubles en la superficie", "Una fisura superficial por contracción del material", "La condensación de vapor de agua sobre una superficie fría"], correcta: 0 },
  { enunciado: "¿Cuál es la secuencia general de reparación de un desconchado antes de repintar?", explicacion: "Eliminar la pintura mal adherida, lijar bordes, reparar con masilla, lijar, imprimar y repintar.", dificultad: "media", opciones: ["Eliminar pintura suelta, lijar, reparar, imprimar y repintar", "Repintar directamente sobre la pintura desconchada existente", "Aplicar únicamente una capa de barniz sobre la zona afectada", "Ninguna secuencia específica distinta de la limpieza superficial"], correcta: 0 },
  { enunciado: "¿Por qué conviene, en muchos casos, repintar el paramento completo tras reparar un desconchado?", explicacion: "Un repaso localizado puede resultar visible por diferencias de brillo, tono o textura.", dificultad: "media", opciones: ["Un repaso localizado puede resultar visible por diferencias de tono", "Repintar el paramento completo nunca resulta necesario", "El repaso localizado siempre resulta indistinguible del resto", "Solo conviene repintar todo si la pintura es de color blanco"], correcta: 0 },
  { enunciado: "¿Qué debe verificarse antes de repintar sobre una zona previamente afectada por humedad?", explicacion: "Que el soporte está realmente seco en profundidad y que la causa original está resuelta.", dificultad: "dificil", opciones: ["Que el soporte está seco en profundidad y la causa resuelta", "Basta con que la superficie parezca seca a simple vista", "La humedad residual nunca afecta al resultado del repintado", "Solo resulta relevante si la humedad era de condensación"], correcta: 0 },
  { enunciado: "¿Qué relación existe entre este tema de patologías y el de procesos de trabajo y preparación de superficies?", explicacion: "Las técnicas de preparación ya estudiadas son las herramientas para reparar cada patología concreta.", dificultad: "media", opciones: ["Las técnicas de preparación se aplican para reparar cada patología", "Ambos temas son completamente independientes entre sí", "La preparación de superficies nunca resulta relevante ante una patología", "Solo se relacionan en el caso concreto de las eflorescencias"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 19 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 19, orden: 19, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-247 creado y vinculado como Tema 19 de Oficial Pintor General.");
