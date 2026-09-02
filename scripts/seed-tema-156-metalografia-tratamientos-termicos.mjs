/**
 * Crea tema-156: "Metalografía y tratamientos térmicos" — Tema 8
 * (numero=8, bloque-2) de Oficial Herrero (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 6 oficial del Anexo I (bases2110.pdf, línea 1251):
 *   "Metalografía. Teoría de tratamientos térmicos. Endurecimiento
 *   superficial. Control de temperaturas. Nociones de resistencia de
 *   materiales."
 *
 * Conocimiento técnico consolidado de metalografía y tratamientos
 * térmicos del acero, sin una ley española que lo regule como tal —
 * mismo criterio que tema-155. Búsqueda previa realizada conforme al
 * estándar de sourcing del proyecto.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-156-metalografia-tratamientos-termicos.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-156";
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
  titulo: "Metalografía y tratamientos térmicos",
  descripcion: "Metalografía. Teoría de tratamientos térmicos. Endurecimiento superficial. Control de temperaturas. Nociones de resistencia de materiales.",
  contenido: "Desarrolla la metalografía como disciplina que estudia la estructura interna de los metales, la teoría de los tratamientos térmicos del acero (temple, revenido, recocido y normalizado), las técnicas de endurecimiento superficial y el control de temperaturas propio de estos procesos, y las nociones básicas de resistencia de materiales necesarias para el oficio de herrero.",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "Metalografía. Teoría de tratamientos térmicos", seccion: "metalografia-teoria-tratamientos-termicos", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Endurecimiento superficial y control de temperaturas", seccion: "endurecimiento-superficial-control-temperaturas", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Nociones de resistencia de materiales", seccion: "nociones-resistencia-materiales", articulos: "Conceptos fundamentales" },
  ],
}]);

const S1 = "metalografia-teoria-tratamientos-termicos";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es la metalografía?", reverso: "La disciplina técnica que estudia la estructura interna (microestructura) de los metales y sus aleaciones, y la relación entre esa estructura y sus propiedades mecánicas" },
  { anverso: "¿Qué es un tratamiento térmico del acero?", reverso: "Un proceso controlado de calentamiento y enfriamiento del acero, sin cambiar su composición química, con el fin de modificar sus propiedades mecánicas (dureza, resistencia, ductilidad)" },
  { anverso: "¿Qué es el temple del acero?", reverso: "Un tratamiento térmico que consiste en calentar el acero hasta una temperatura determinada y enfriarlo bruscamente (en agua, aceite o aire, según el caso), aumentando notablemente su dureza a costa de una mayor fragilidad" },
  { anverso: "¿Qué es el revenido del acero?", reverso: "Un tratamiento térmico que se aplica tras el temple, calentando la pieza a una temperatura inferior a la de temple y enfriándola de forma más lenta, con el fin de reducir la fragilidad excesiva del temple manteniendo buena parte de la dureza ganada" },
  { anverso: "¿Qué es el recocido del acero?", reverso: "Un tratamiento térmico que calienta el acero y lo enfría muy lentamente, con el fin de reducir su dureza, eliminar tensiones internas y facilitar su mecanizado o conformado posterior" },
  { anverso: "¿Qué es el normalizado del acero?", reverso: "Un tratamiento térmico similar al recocido pero con un enfriamiento al aire (más rápido que el del recocido), que homogeneiza la estructura interna del acero tras procesos de forja, laminación o soldadura" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es la metalografía?", explicacion: "El estudio de la estructura interna de los metales y su relación con sus propiedades mecánicas.", dificultad: "facil", opciones: ["El estudio de la estructura interna de los metales", "El estudio exclusivo del precio de mercado de los metales", "El estudio exclusivo del color superficial de los metales", "El estudio exclusivo del peso de las piezas metálicas"], correcta: 0 },
  { enunciado: "¿Qué es un tratamiento térmico del acero?", explicacion: "Un proceso de calentamiento y enfriamiento controlado que modifica sus propiedades mecánicas.", dificultad: "media", opciones: ["Un proceso de calentamiento y enfriamiento controlado", "Un proceso que cambia la composición química del acero", "Un proceso exclusivo de corte de piezas metálicas", "Un proceso exclusivo de medición de piezas metálicas"], correcta: 0 },
  { enunciado: "¿Qué caracteriza al temple del acero?", explicacion: "Calentamiento y enfriamiento brusco, que aumenta la dureza a costa de la fragilidad.", dificultad: "media", opciones: ["Calentamiento y enfriamiento brusco, aumenta dureza y fragilidad", "Un enfriamiento siempre muy lento, sin ningún calentamiento previo", "Un proceso que reduce siempre la dureza del acero", "Un proceso exclusivo para eliminar tensiones internas"], correcta: 0 },
  { enunciado: "¿Para qué se aplica el revenido tras el temple del acero?", explicacion: "Para reducir la fragilidad excesiva del temple, manteniendo buena parte de la dureza.", dificultad: "media", opciones: ["Para reducir la fragilidad excesiva del temple", "Para aumentar aún más la fragilidad conseguida con el temple", "Para eliminar por completo la dureza conseguida con el temple", "Para cambiar la composición química del acero templado"], correcta: 0 },
  { enunciado: "¿Qué finalidad tiene el recocido del acero?", explicacion: "Reducir su dureza, eliminar tensiones internas y facilitar su mecanizado.", dificultad: "media", opciones: ["Reducir su dureza y facilitar su mecanizado", "Aumentar al máximo su dureza superficial", "Cambiar la composición química del acero", "Aumentar la fragilidad de la pieza tratada"], correcta: 0 },
]);

const S2 = "endurecimiento-superficial-control-temperaturas";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es el endurecimiento superficial de una pieza de acero?", reverso: "Un tratamiento que aumenta la dureza de la capa más externa de una pieza, manteniendo un núcleo interior más blando y tenaz, adecuado para piezas que requieren resistencia al desgaste superficial sin perder tenacidad global" },
  { anverso: "¿Qué es la cementación como técnica de endurecimiento superficial?", reverso: "Un tratamiento que enriquece en carbono la capa superficial de una pieza de acero de bajo contenido en carbono, para después templar esa capa enriquecida y conseguir una superficie dura sobre un núcleo tenaz" },
  { anverso: "¿Qué es el temple superficial (por ejemplo, por inducción o a la llama)?", reverso: "Una técnica de endurecimiento que calienta rápidamente solo la capa superficial de una pieza (mediante una llama o una corriente inducida) y la enfría de inmediato, endureciendo esa capa sin afectar en profundidad al núcleo de la pieza" },
  { anverso: "¿Por qué es fundamental el control preciso de la temperatura durante un tratamiento térmico?", reverso: "Porque cada tratamiento requiere alcanzar un rango de temperatura específico (por debajo o por encima del cual el resultado buscado no se consigue) y porque la velocidad de calentamiento y enfriamiento determina en gran medida las propiedades finales de la pieza" },
  { anverso: "¿Qué instrumentos emplea habitualmente el herrero para controlar la temperatura durante un tratamiento térmico artesanal?", reverso: "La observación del color de incandescencia del acero al calentarse (código de colores orientativo), complementada, en talleres con mayor equipamiento, por pirómetros u hornos con control de temperatura" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es el endurecimiento superficial de una pieza de acero?", explicacion: "Aumenta la dureza de la capa externa, manteniendo un núcleo más blando y tenaz.", dificultad: "media", opciones: ["Aumenta la dureza de la capa externa, con núcleo tenaz", "Aumenta la dureza de toda la pieza de forma homogénea", "Reduce la dureza de la capa externa exclusivamente", "Elimina por completo la necesidad de cualquier tratamiento térmico"], correcta: 0 },
  { enunciado: "¿Qué es la cementación como técnica de endurecimiento superficial?", explicacion: "Enriquece en carbono la capa superficial antes de templarla.", dificultad: "dificil", opciones: ["Enriquece en carbono la capa superficial antes de templarla", "Elimina el carbono de la capa superficial de la pieza", "Aplica un recubrimiento de zinc sobre la superficie", "Reduce la temperatura de fusión del acero tratado"], correcta: 0 },
  { enunciado: "¿Qué caracteriza al temple superficial por inducción o a la llama?", explicacion: "Calienta y enfría rápidamente solo la capa superficial, sin afectar al núcleo.", dificultad: "media", opciones: ["Calienta y enfría rápidamente solo la capa superficial", "Calienta y enfría de forma homogénea toda la pieza", "Solo puede aplicarse a piezas de aluminio, nunca de acero", "Elimina por completo la necesidad de control de temperatura"], correcta: 0 },
  { enunciado: "¿Por qué es fundamental el control preciso de la temperatura en un tratamiento térmico?", explicacion: "Cada tratamiento requiere un rango de temperatura específico que determina el resultado.", dificultad: "media", opciones: ["Cada tratamiento requiere un rango de temperatura específico", "La temperatura no influye en el resultado del tratamiento térmico", "Solo es relevante la temperatura ambiente del taller, no la de la pieza", "El control de temperatura solo es relevante en el revenido"], correcta: 0 },
  { enunciado: "¿Qué método orientativo emplea tradicionalmente el herrero para estimar la temperatura del acero al calentarlo?", explicacion: "La observación del color de incandescencia del metal.", dificultad: "media", opciones: ["La observación del color de incandescencia del metal", "La medición exclusiva con un termómetro de mercurio", "El sonido que produce la pieza al ser golpeada en frío", "El peso de la pieza antes y después del calentamiento"], correcta: 0 },
]);

const S3 = "nociones-resistencia-materiales";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es la resistencia de materiales, como disciplina técnica?", reverso: "La disciplina que estudia el comportamiento de los materiales sometidos a distintos tipos de esfuerzos (tracción, compresión, flexión, torsión, cortadura), y su capacidad para soportarlos sin romperse ni deformarse en exceso" },
  { anverso: "¿Qué es un esfuerzo de tracción sobre una pieza metálica?", reverso: "El esfuerzo que tiende a alargar o estirar la pieza, aplicado en sentidos opuestos sobre sus extremos" },
  { anverso: "¿Qué es un esfuerzo de compresión sobre una pieza metálica?", reverso: "El esfuerzo que tiende a acortar o aplastar la pieza, aplicado en sentidos opuestos hacia el interior de la misma" },
  { anverso: "¿Qué es un esfuerzo de flexión sobre una pieza metálica?", reverso: "El esfuerzo que tiende a curvar la pieza, generando tracción en una de sus caras y compresión en la opuesta, habitual en elementos como vigas o barandas sometidas a carga transversal" },
  { anverso: "¿Qué es el límite elástico de un material?", reverso: "El valor de esfuerzo hasta el cual el material recupera su forma original al cesar la carga aplicada; superado ese límite, el material sufre una deformación permanente (deformación plástica)" },
  { anverso: "¿Qué es la resistencia a la rotura de un material?", reverso: "El valor máximo de esfuerzo que puede soportar el material antes de romperse, siempre superior al límite elástico" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué estudia la resistencia de materiales?", explicacion: "El comportamiento de los materiales sometidos a distintos tipos de esfuerzos.", dificultad: "facil", opciones: ["El comportamiento de los materiales sometidos a esfuerzos", "Exclusivamente el precio de mercado de los materiales", "Exclusivamente el color superficial de los materiales", "Exclusivamente el peso de las piezas fabricadas"], correcta: 0 },
  { enunciado: "¿Qué es un esfuerzo de tracción sobre una pieza metálica?", explicacion: "El esfuerzo que tiende a alargar o estirar la pieza.", dificultad: "media", opciones: ["El esfuerzo que tiende a alargar o estirar la pieza", "El esfuerzo que tiende a acortar o aplastar la pieza", "El esfuerzo que tiende a curvar la pieza", "El esfuerzo que tiende a retorcer la pieza sobre su eje"], correcta: 0 },
  { enunciado: "¿Qué es un esfuerzo de flexión sobre una pieza metálica?", explicacion: "El que tiende a curvarla, generando tracción en una cara y compresión en la opuesta.", dificultad: "media", opciones: ["El que tiende a curvarla, con tracción y compresión combinadas", "El que tiende a alargar la pieza de forma uniforme", "El que tiende a acortar la pieza de forma uniforme", "El que tiende a retorcer la pieza sobre su propio eje"], correcta: 0 },
  { enunciado: "¿Qué es el límite elástico de un material?", explicacion: "El esfuerzo hasta el cual recupera su forma original al cesar la carga.", dificultad: "dificil", opciones: ["El esfuerzo hasta el cual recupera su forma original", "El esfuerzo máximo que provoca siempre la rotura inmediata", "El peso máximo que puede soportar la pieza sin fundirse", "La temperatura máxima que soporta el material sin deformarse"], correcta: 0 },
  { enunciado: "¿Qué relación existe entre el límite elástico y la resistencia a la rotura de un material?", explicacion: "La resistencia a la rotura es siempre superior al límite elástico.", dificultad: "dificil", opciones: ["La resistencia a la rotura es siempre superior al límite elástico", "Ambos valores son siempre exactamente iguales", "El límite elástico es siempre superior a la resistencia a la rotura", "No existe ninguna relación entre ambos valores"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 8 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 8, orden: 8, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-156 creado y vinculado como Tema 8 de Oficial Herrero.");
