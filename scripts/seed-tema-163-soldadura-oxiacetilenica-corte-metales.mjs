/**
 * Crea tema-163: "Soldadura oxiacetilénica y corte de metales" — Tema 15
 * (numero=15, bloque-2) de Oficial Herrero (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 13 oficial del Anexo I (bases2110.pdf, línea 1271):
 *   "Soldadura y corte de metales. Procesos con oxígeno y gas
 *   combustible. Gases utilizados. Equipo para oxiacetileno. Corte de
 *   metales (oxicorte). Uniones básicas."
 *
 * Conocimiento técnico consolidado de soldadura y corte oxiacetilénico,
 * sin una ley española específica que lo regule como técnica de taller
 * — mismo criterio que temas anteriores de esta oposición. El manejo de
 * botellas de gases a presión (oxígeno, acetileno) se rige por buenas
 * prácticas técnicas del sector y por la Ley 31/1995 de PRL con
 * carácter general (ya citada en otras oposiciones de este proyecto),
 * sin que exista una ITC específica citable con precisión en esta
 * sesión; se señala expresamente en el contenido como conocimiento
 * técnico y de seguridad del oficio. Búsqueda previa realizada conforme
 * al estándar de sourcing del proyecto.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-163-soldadura-oxiacetilenica-corte-metales.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-163";
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
  titulo: "Soldadura oxiacetilénica y corte de metales",
  descripcion: "Procesos con oxígeno y gas combustible. Gases utilizados. Equipo para oxiacetileno. Corte de metales (oxicorte). Uniones básicas.",
  contenido: "Desarrolla la soldadura y el corte de metales mediante procesos con oxígeno y gas combustible: los gases habitualmente utilizados (oxígeno y acetileno), el equipo empleado en la soldadura oxiacetilénica (botellas, manorreductores, mangueras, soplete), el corte de metales por oxicorte, y las uniones básicas que pueden ejecutarse mediante estos procesos.",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "Procesos con oxígeno y gas combustible. Gases utilizados", seccion: "procesos-oxigeno-gas-combustible-gases-utilizados", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Equipo para oxiacetileno y corte de metales (oxicorte)", seccion: "equipo-oxiacetileno-corte-metales", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Uniones básicas de soldadura", seccion: "uniones-basicas-soldadura", articulos: "Conceptos fundamentales" },
  ],
}]);

const S1 = "procesos-oxigeno-gas-combustible-gases-utilizados";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es la soldadura oxiacetilénica?", reverso: "Un proceso de soldadura que emplea el calor producido por la combustión de acetileno (gas combustible) con oxígeno, alcanzando temperaturas suficientes para fundir el metal base y, en su caso, un material de aportación" },
  { anverso: "¿Qué es el acetileno, en el contexto de la soldadura oxiacetilénica?", reverso: "Un gas combustible (hidrocarburo) que, al combinarse con oxígeno en las proporciones adecuadas, produce una llama de temperatura muy elevada, empleada para fundir el metal en la soldadura y el corte" },
  { anverso: "¿Qué función cumple el oxígeno en el proceso de soldadura oxiacetilénica?", reverso: "Actuar como comburente, es decir, como el gas que reacciona con el acetileno en la combustión, siendo indispensable para generar la llama de alta temperatura necesaria para fundir el metal" },
  { anverso: "¿Qué tipos de llama pueden obtenerse regulando la proporción de oxígeno y acetileno en el soplete?", reverso: "La llama neutra (proporción equilibrada, la más habitual para soldar), la llama carburante (exceso de acetileno, con un dardo más largo) y la llama oxidante (exceso de oxígeno, con un dardo más corto y agresivo, empleada en aplicaciones específicas)" },
  { anverso: "¿Por qué es importante ajustar correctamente el tipo de llama antes de comenzar a soldar?", reverso: "Porque una llama inadecuada (carburante u oxidante en exceso) puede alterar la composición química del cordón de soldadura, introduciendo carbono o eliminando elementos de aleación del metal fundido, y comprometiendo la calidad de la unión" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es la soldadura oxiacetilénica?", explicacion: "Un proceso que emplea el calor de la combustión de acetileno con oxígeno para fundir el metal.", dificultad: "facil", opciones: ["Un proceso que emplea el calor de la combustión de acetileno y oxígeno", "Un proceso exclusivo de soldadura eléctrica por arco", "Un proceso exclusivo de unión mediante remaches metálicos", "Un proceso exclusivo de tratamiento térmico posterior a la soldadura"], correcta: 0 },
  { enunciado: "¿Qué función cumple el oxígeno en el proceso de soldadura oxiacetilénica?", explicacion: "Actúa como comburente, reaccionando con el acetileno en la combustión.", dificultad: "media", opciones: ["Actúa como comburente en la combustión con el acetileno", "Actúa exclusivamente como gas de protección sin ninguna combustión", "Sustituye por completo a la necesidad de acetileno en el proceso", "Enfría la zona soldada tras finalizar el proceso de combustión"], correcta: 0 },
  { enunciado: "¿Qué tipo de llama es la más habitual para soldar, con una proporción equilibrada de oxígeno y acetileno?", explicacion: "La llama neutra.", dificultad: "media", opciones: ["La llama neutra", "La llama carburante, con exceso de acetileno", "La llama oxidante, con exceso de oxígeno", "Ninguna de las anteriores es válida para soldar"], correcta: 0 },
  { enunciado: "¿Qué caracteriza a la llama carburante en el proceso de soldadura oxiacetilénica?", explicacion: "Un exceso de acetileno, con un dardo más largo.", dificultad: "dificil", opciones: ["Un exceso de acetileno, con un dardo más largo", "Un exceso de oxígeno, con un dardo más corto", "Una proporción exactamente equilibrada de ambos gases", "La ausencia total de acetileno en la mezcla de gases"], correcta: 0 },
  { enunciado: "¿Por qué es importante ajustar correctamente el tipo de llama antes de soldar?", explicacion: "Una llama inadecuada puede alterar la composición química del cordón de soldadura.", dificultad: "media", opciones: ["Una llama inadecuada puede alterar la composición del cordón", "El tipo de llama nunca influye en la calidad final de la soldadura", "Solo es relevante el tipo de llama en el proceso de corte, no de soldadura", "El tipo de llama solo afecta al color visual de la soldadura resultante"], correcta: 0 },
]);

const S2 = "equipo-oxiacetileno-corte-metales";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué elementos componen el equipo básico de soldadura oxiacetilénica?", reverso: "Las botellas de oxígeno y de acetileno, los manorreductores (reguladores de presión) de cada botella, las mangueras específicas de cada gas, y el soplete, donde se mezclan ambos gases para generar la llama" },
  { anverso: "¿Qué es un manorreductor?", reverso: "El dispositivo que se acopla a la salida de cada botella de gas, reduciendo la elevada presión de almacenamiento a una presión de trabajo segura y regulable para su uso en el soplete" },
  { anverso: "¿Por qué las mangueras de oxígeno y de acetileno tienen colores distintos y normalizados?", reverso: "Para evitar confusiones y conexiones incorrectas entre ambos gases, siendo el color habitual azul o negro para el oxígeno y rojo para el acetileno" },
  { anverso: "¿Qué son las válvulas antirretorno en un equipo de soldadura oxiacetilénica, y por qué son importantes?", reverso: "Dispositivos de seguridad que impiden el retroceso de la llama o de un gas hacia la manguera o la botella del gas contrario, evitando una posible explosión por mezcla incontrolada de ambos gases" },
  { anverso: "¿Qué es el oxicorte?", reverso: "Un proceso de corte de metales que combina el precalentamiento del acero mediante una llama oxiacetilénica con un chorro de oxígeno puro a presión, que oxida y elimina rápidamente el metal a lo largo de la línea de corte" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué elementos componen el equipo básico de soldadura oxiacetilénica?", explicacion: "Botellas, manorreductores, mangueras y soplete.", dificultad: "facil", opciones: ["Botellas, manorreductores, mangueras y soplete", "Únicamente un electrodo y una pinza de masa", "Únicamente un yunque y un martillo de forja", "Únicamente una máquina de torno y sus herramientas"], correcta: 0 },
  { enunciado: "¿Qué función cumple el manorreductor de una botella de gas?", explicacion: "Reduce la presión de almacenamiento a una presión de trabajo segura y regulable.", dificultad: "media", opciones: ["Reduce la presión de almacenamiento a una presión de trabajo segura", "Aumenta la presión del gas antes de su salida de la botella", "Mezcla directamente ambos gases dentro de la propia botella", "Sustituye por completo a la necesidad del soplete en el proceso"], correcta: 0 },
  { enunciado: "¿Por qué las mangueras de oxígeno y acetileno tienen colores distintos?", explicacion: "Para evitar confusiones y conexiones incorrectas entre ambos gases.", dificultad: "media", opciones: ["Para evitar confusiones y conexiones incorrectas", "Por motivos exclusivamente estéticos sin ninguna función de seguridad", "Porque cada color indica una presión de trabajo distinta", "Porque cada color indica un fabricante distinto de manguera"], correcta: 0 },
  { enunciado: "¿Qué función cumplen las válvulas antirretorno en un equipo de soldadura oxiacetilénica?", explicacion: "Impiden el retroceso de la llama o el gas hacia la manguera o botella contraria.", dificultad: "dificil", opciones: ["Impiden el retroceso de la llama o el gas hacia el lado contrario", "Aumentan la presión de trabajo del soplete durante la soldadura", "Sustituyen por completo a la necesidad de un manorreductor", "Regulan exclusivamente la temperatura final de la llama"], correcta: 0 },
  { enunciado: "¿Qué es el oxicorte?", explicacion: "Un proceso de corte que combina precalentamiento con llama y un chorro de oxígeno puro.", dificultad: "media", opciones: ["Un proceso de corte con precalentamiento y chorro de oxígeno puro", "Un proceso de soldadura exclusivo para materiales no férricos", "Un proceso de tratamiento térmico posterior al corte de metales", "Un proceso exclusivo de medición de temperatura del metal"], correcta: 0 },
]);

const S3 = "uniones-basicas-soldadura";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es una unión a tope en soldadura?", reverso: "La unión entre dos piezas colocadas en el mismo plano, con sus bordes enfrentados, soldadas a lo largo de la línea de contacto entre ambas" },
  { anverso: "¿Qué es una unión en ángulo (o en T) en soldadura?", reverso: "La unión entre dos piezas dispuestas formando un ángulo entre sí (habitualmente 90°), soldadas a lo largo de la línea de contacto en ese ángulo" },
  { anverso: "¿Qué es una unión solapada en soldadura?", reverso: "La unión entre dos piezas que se superponen parcialmente una sobre otra, soldadas a lo largo del borde de la zona de solape" },
  { anverso: "¿Qué es el material de aportación en una soldadura oxiacetilénica?", reverso: "La varilla metálica que se funde junto con el metal base durante la soldadura, aportando material adicional al cordón para rellenar la unión, elegida con una composición compatible con el metal base a soldar" },
  { anverso: "¿Qué debe tener en cuenta el herrero al elegir el tipo de unión (a tope, en ángulo, solapada) para dos piezas concretas?", reverso: "El esfuerzo que debe soportar la unión, el espesor de las piezas a unir, la accesibilidad para soldar por uno o ambos lados, y el acabado estético requerido en la zona de unión" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es una unión a tope en soldadura?", explicacion: "La unión entre dos piezas en el mismo plano, con sus bordes enfrentados.", dificultad: "facil", opciones: ["La unión entre dos piezas en el mismo plano, bordes enfrentados", "La unión entre dos piezas formando un ángulo de 90° entre sí", "La unión entre dos piezas que se superponen parcialmente", "La unión mediante un remache deformado en ambos extremos"], correcta: 0 },
  { enunciado: "¿Qué es una unión en ángulo o en T?", explicacion: "La unión entre dos piezas dispuestas formando un ángulo entre sí.", dificultad: "media", opciones: ["La unión entre dos piezas formando un ángulo entre sí", "La unión entre dos piezas en el mismo plano, bordes enfrentados", "La unión entre dos piezas que se superponen parcialmente", "La unión mediante un remache deformado en ambos extremos"], correcta: 0 },
  { enunciado: "¿Qué es una unión solapada en soldadura?", explicacion: "La unión entre dos piezas que se superponen parcialmente una sobre otra.", dificultad: "media", opciones: ["La unión entre dos piezas que se superponen parcialmente", "La unión entre dos piezas en el mismo plano, bordes enfrentados", "La unión entre dos piezas formando un ángulo de 90° entre sí", "La unión mediante un remache deformado en ambos extremos"], correcta: 0 },
  { enunciado: "¿Qué es el material de aportación en una soldadura oxiacetilénica?", explicacion: "La varilla metálica que se funde para rellenar el cordón de la unión.", dificultad: "media", opciones: ["La varilla metálica que se funde para rellenar el cordón", "El propio metal base de las piezas, sin ningún material adicional", "El gas combustible empleado para generar la llama de soldadura", "El instrumento empleado para medir la temperatura de la llama"], correcta: 0 },
  { enunciado: "¿Qué debe tener en cuenta el herrero al elegir el tipo de unión para dos piezas concretas?", explicacion: "El esfuerzo a soportar, el espesor, la accesibilidad y el acabado estético requerido.", dificultad: "dificil", opciones: ["El esfuerzo, el espesor, la accesibilidad y el acabado requerido", "Únicamente el color final deseado para la unión soldada", "Únicamente el precio del material de aportación disponible", "Únicamente la marca comercial del soplete empleado en la unión"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 15 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 15, orden: 15, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-163 creado y vinculado como Tema 15 de Oficial Herrero.");
