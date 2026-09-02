/**
 * Crea tema-161: "Mecanizado manual básico: limado, cincelado, taladrado,
 * escariado, roscado, remachado, punzonado y chaflanado" — Tema 13
 * (numero=13, bloque-2) de Oficial Herrero (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 11 oficial del Anexo I (bases2110.pdf, línea 1267):
 *   "Limados, cincelado, talador, escariado, roscado, remachado,
 *   punzonado, chaflanado."
 *
 * Conocimiento técnico consolidado de mecanizado manual del oficio de
 * herrero, sin una ley española que lo regule como tal — mismo criterio
 * que temas anteriores de esta oposición. Búsqueda previa realizada
 * conforme al estándar de sourcing del proyecto.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-161-limados-cincelado-roscado-punzonado.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-161";
const OPOSICION = "oficial-herrero-ayto-zaragoza";
const BLOQUE_2_ID = "b0312afa-8a49-41a8-a672-99793edcc74e";

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
  titulo: "Mecanizado manual básico: limado, cincelado, taladrado, roscado y otras operaciones",
  descripcion: "Limados, cincelado, taladrado, escariado, roscado, remachado, punzonado, chaflanado.",
  contenido: "Desarrolla las operaciones básicas de mecanizado manual propias del oficio de herrero: el limado y el cincelado; el taladrado, el escariado y el roscado; y el remachado, el punzonado y el chaflanado, con sus herramientas, técnicas de ejecución y precauciones específicas de cada operación.",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "Limado y cincelado", seccion: "limado-cincelado", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Taladrado, escariado y roscado", seccion: "taladrado-escariado-roscado", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Remachado, punzonado y chaflanado", seccion: "remachado-punzonado-chaflanado", articulos: "Conceptos fundamentales" },
  ],
}]);

const S1 = "limado-cincelado";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es el limado en el mecanizado manual?", reverso: "La operación de arranque de pequeñas virutas de material mediante el frotamiento de una lima sobre la superficie de una pieza, empleada para ajustar dimensiones, eliminar rebabas o mejorar el acabado superficial" },
  { anverso: "¿Qué es una lima, como herramienta de mecanizado manual?", reverso: "Una herramienta de acero endurecido con una superficie provista de dientes o picado, que corta material por arranque de viruta al frotarla sobre la pieza en un único sentido de trabajo" },
  { anverso: "¿Qué tipos de picado (grado de dentado) presentan habitualmente las limas, según la finalidad del trabajo?", reverso: "Picado basto (para desbaste rápido de material), picado medio (para un mecanizado intermedio) y picado fino o de acabado (para un acabado superficial más cuidado, con menor arranque de material por pasada)" },
  { anverso: "¿Qué es el cincelado en el mecanizado manual?", reverso: "La operación de corte o labrado de material mediante el golpeo de un cincel con un martillo, empleada para eliminar material sobrante, cortar chapa o labrar decoraciones sobre la superficie de una pieza" },
  { anverso: "¿Qué precaución básica de seguridad debe tenerse presente al utilizar un cincel golpeado con martillo?", reverso: "Sujetar firmemente el cincel, mantener la mirada y la atención en el punto de golpeo, y emplear gafas de protección frente al riesgo de proyección de pequeñas partículas de material" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es el limado en el mecanizado manual?", explicacion: "El arranque de pequeñas virutas mediante el frotamiento de una lima sobre la pieza.", dificultad: "facil", opciones: ["El arranque de pequeñas virutas mediante una lima", "El corte de material mediante el golpeo de un cincel", "La perforación de un agujero mediante una broca", "La unión de dos piezas mediante un remache"], correcta: 0 },
  { enunciado: "¿Qué tipos de picado presentan habitualmente las limas?", explicacion: "Basto, medio y fino, según la finalidad del trabajo.", dificultad: "media", opciones: ["Basto, medio y fino", "Únicamente un tipo de picado estándar sin variantes", "Circular, cuadrado y hexagonal", "Interior, exterior y mixto"], correcta: 0 },
  { enunciado: "¿Qué es el cincelado en el mecanizado manual?", explicacion: "El corte o labrado de material mediante el golpeo de un cincel con un martillo.", dificultad: "media", opciones: ["El corte o labrado de material mediante el golpeo de un cincel", "El arranque de virutas mediante el frotamiento de una lima", "La perforación de un agujero mediante una broca", "La unión de dos piezas mediante soldadura"], correcta: 0 },
  { enunciado: "¿Qué precaución básica de seguridad debe tenerse al utilizar un cincel golpeado con martillo?", explicacion: "Sujetarlo firmemente y emplear gafas de protección frente a proyección de partículas.", dificultad: "media", opciones: ["Sujetarlo firmemente y usar gafas de protección", "Ninguna precaución específica es necesaria para esta operación", "Emplear siempre guantes de jardinería convencionales exclusivamente", "Realizar la operación siempre sin ninguna herramienta de sujeción de la pieza"], correcta: 0 },
  { enunciado: "¿Para qué se emplea habitualmente una lima de picado fino o de acabado?", explicacion: "Para un acabado superficial más cuidado, con menor arranque de material por pasada.", dificultad: "dificil", opciones: ["Para un acabado superficial más cuidado", "Para el desbaste rápido de grandes cantidades de material", "Exclusivamente para perforar agujeros de pequeño diámetro", "Exclusivamente para cortar chapa de gran espesor"], correcta: 0 },
]);

const S2 = "taladrado-escariado-roscado";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es el taladrado?", reverso: "La operación de mecanizado que consiste en perforar un agujero cilíndrico en una pieza mediante una herramienta de corte rotativa (broca), habitualmente montada en un taladro portátil o de columna" },
  { anverso: "¿Qué es el escariado?", reverso: "Una operación de acabado que se realiza tras el taladrado, empleando una herramienta específica (escariador) para conseguir un agujero de dimensión y acabado superficial más precisos que los obtenidos directamente con la broca" },
  { anverso: "¿Por qué no se puede conseguir directamente, mediante taladrado, la precisión dimensional que aporta un escariado posterior?", reverso: "Porque el propio proceso de taladrado, especialmente con brocas de uso general, admite una tolerancia dimensional y un acabado superficial más amplios que los que exige una aplicación de ajuste preciso, siendo el escariado el proceso específico para refinar esa medida" },
  { anverso: "¿Qué es el roscado?", reverso: "La operación de mecanizado que genera una rosca (hilo helicoidal) en el interior de un agujero (rosca interior, mediante un macho de roscar) o en la superficie exterior de una barra o eje (rosca exterior, mediante una terraja)" },
  { anverso: "¿Qué es un macho de roscar?", reverso: "La herramienta empleada para tallar manualmente una rosca interior en un agujero previamente taladrado, habitualmente empleando un juego progresivo de varios machos (de desbaste, intermedio y de acabado) para roscas de mayor diámetro" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es el taladrado?", explicacion: "La perforación de un agujero cilíndrico mediante una broca.", dificultad: "facil", opciones: ["La perforación de un agujero cilíndrico mediante una broca", "El arranque de virutas mediante el frotamiento de una lima", "El corte de material mediante el golpeo de un cincel", "La unión de dos piezas mediante un remache"], correcta: 0 },
  { enunciado: "¿Qué es el escariado?", explicacion: "Una operación de acabado tras el taladrado que refina la precisión del agujero.", dificultad: "media", opciones: ["Una operación de acabado que refina la precisión del agujero", "La operación inicial que sustituye por completo al taladrado", "El proceso de generar una rosca en el interior de un agujero", "El proceso de unir dos piezas mediante un remache"], correcta: 0 },
  { enunciado: "¿Por qué es necesario el escariado si ya se ha taladrado el agujero previamente?", explicacion: "Porque el taladrado admite una tolerancia y acabado más amplios que los que exige una aplicación de ajuste preciso.", dificultad: "dificil", opciones: ["Porque el taladrado admite una tolerancia más amplia", "Porque el taladrado nunca puede realizar ningún agujero circular", "Porque el escariado siempre precede al propio taladrado", "Porque el escariado sustituye completamente a la necesidad de una broca"], correcta: 0 },
  { enunciado: "¿Qué es el roscado?", explicacion: "La generación de una rosca interior o exterior mediante macho de roscar o terraja.", dificultad: "media", opciones: ["La generación de una rosca interior o exterior", "La perforación inicial de un agujero cilíndrico", "El corte de material mediante el golpeo de un cincel", "El acabado superficial mediante el frotamiento de una lima"], correcta: 0 },
  { enunciado: "¿Qué herramienta se emplea para tallar manualmente una rosca interior en un agujero?", explicacion: "El macho de roscar.", dificultad: "media", opciones: ["El macho de roscar", "La terraja", "El escariador", "La broca de taladrar"], correcta: 0 },
]);

const S3 = "remachado-punzonado-chaflanado";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es el remachado?", reverso: "Una técnica de unión mecánica permanente que emplea un remache (una pieza cilíndrica con cabeza) insertado en un agujero pasante de dos piezas, deformando su extremo opuesto para formar una segunda cabeza que las mantiene unidas" },
  { anverso: "¿Qué ventaja presenta el remachado frente a la soldadura como método de unión de dos piezas metálicas?", reverso: "No requiere calor, por lo que no genera tensiones térmicas ni afecta a las propiedades del material en la zona de unión, y permite unir materiales de distinta naturaleza que no serían soldables entre sí" },
  { anverso: "¿Qué es el punzonado?", reverso: "Una operación que consiste en perforar o recortar un agujero en una chapa u otra pieza mediante el golpeo o la presión de un punzón, sin necesidad de arrancar viruta como en el taladrado" },
  { anverso: "¿Qué diferencia fundamental existe entre el punzonado y el taladrado a la hora de generar un agujero en una pieza?", reverso: "El punzonado corta el material por cizallamiento mediante presión o golpeo, sin generar viruta; el taladrado arranca viruta mediante el giro y avance de una broca" },
  { anverso: "¿Qué es el chaflanado?", reverso: "Una operación de mecanizado que consiste en eliminar la arista viva de una pieza, sustituyéndola por una pequeña superficie plana inclinada (chaflán), mejorando la seguridad al manipular la pieza y facilitando operaciones posteriores como el roscado o el ensamblaje" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es el remachado?", explicacion: "Una técnica de unión mecánica permanente mediante un remache deformado.", dificultad: "facil", opciones: ["Una técnica de unión mecánica permanente mediante un remache", "Una técnica de corte de chapa mediante presión o golpeo", "Una técnica de acabado superficial mediante una lima", "Una técnica de perforación mediante una broca giratoria"], correcta: 0 },
  { enunciado: "¿Qué ventaja presenta el remachado frente a la soldadura?", explicacion: "No requiere calor, evitando tensiones térmicas, y permite unir materiales distintos.", dificultad: "media", opciones: ["No requiere calor y permite unir materiales distintos", "Siempre resulta más resistente que cualquier unión soldada", "Elimina por completo la necesidad de cualquier agujero previo", "Solo puede aplicarse a un único tipo de material metálico"], correcta: 0 },
  { enunciado: "¿Qué es el punzonado?", explicacion: "Perforar o recortar mediante el golpeo o presión de un punzón, sin arrancar viruta.", dificultad: "media", opciones: ["Perforar o recortar mediante golpeo o presión de un punzón", "Perforar mediante el giro y avance de una broca", "Unir dos piezas mediante un remache deformado", "Acabar la superficie mediante el frotamiento de una lima"], correcta: 0 },
  { enunciado: "¿Qué diferencia fundamental existe entre punzonado y taladrado?", explicacion: "El punzonado corta por cizallamiento sin viruta; el taladrado arranca viruta con una broca.", dificultad: "dificil", opciones: ["El punzonado corta sin viruta; el taladrado arranca viruta", "Ambos procesos son exactamente equivalentes entre sí", "El taladrado nunca genera ningún tipo de viruta durante el proceso", "El punzonado siempre requiere una broca de mayor diámetro"], correcta: 0 },
  { enunciado: "¿Qué es el chaflanado?", explicacion: "Eliminar la arista viva de una pieza sustituyéndola por una pequeña superficie inclinada.", dificultad: "media", opciones: ["Eliminar la arista viva de una pieza mediante una superficie inclinada", "Perforar un agujero cilíndrico mediante una broca giratoria", "Generar una rosca interior mediante un macho de roscar", "Unir dos piezas mediante un remache deformado"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 13 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 13, orden: 13, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-161 creado y vinculado como Tema 13 de Oficial Herrero.");
