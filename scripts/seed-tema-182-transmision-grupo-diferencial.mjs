/**
 * Crea tema-182: "Árbol de transmisión, grupo y diferencial del
 * automóvil" — Tema 18 (numero=18, bloque-2) de Oficial Mecánico.
 *
 * Corresponde al TEMA 16 oficial: "Árbol de transmisión, grupo y
 * diferencial del automóvil."
 *
 * Conocimiento técnico consolidado de mecánica del automóvil, sin una
 * ley española que lo regule como tal.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-182-transmision-grupo-diferencial.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-182";
const OPOSICION = "oficial-mecanico-ayto-zaragoza";
const BLOQUE_2_ID = "aa6cf0d6-e9fd-4e52-837d-15fab35cbcbe";

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
  titulo: "Árbol de transmisión, grupo y diferencial del automóvil",
  descripcion: "El árbol de transmisión y las juntas homocinéticas, el grupo cónico-corona y piñón de ataque, y el diferencial: funcionamiento y tipos.",
  contenido: "Desarrolla los elementos de la transmisión que llevan el movimiento desde la caja de cambios hasta las ruedas: el árbol de transmisión y las juntas homocinéticas, el grupo formado por el piñón de ataque y la corona (que reduce la velocidad y cambia la dirección de la transmisión en los vehículos de propulsión trasera), y el diferencial, que permite que las ruedas de un mismo eje giren a distinta velocidad en las curvas.",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "El árbol de transmisión y las juntas homocinéticas", seccion: "arbol-transmision-juntas-homocineticas", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "El grupo cónico-corona y piñón de ataque", seccion: "grupo-conico-corona-pinion", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "El diferencial: funcionamiento y tipos", seccion: "diferencial-funcionamiento-tipos", articulos: "Conceptos fundamentales" },
  ],
}]);

const S1 = "arbol-transmision-juntas-homocineticas";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Cuál es la función del árbol de transmisión (palier), en un vehículo de tracción delantera?", reverso: "Transmitir el movimiento de giro desde el diferencial de la caja de cambios hasta cada una de las ruedas motrices, permitiendo además el movimiento vertical de la suspensión y el giro de la dirección" },
  { anverso: "¿Qué es una junta homocinética?", reverso: "Un mecanismo articulado situado en los extremos del palier que permite transmitir el movimiento de giro a velocidad constante entre dos ejes que no están perfectamente alineados, absorbiendo el movimiento de la suspensión y de la dirección" },
  { anverso: "¿Por qué se emplean juntas homocinéticas en lugar de una junta cardán convencional en los paliers de tracción delantera?", reverso: "Porque la junta homocinética mantiene una velocidad de giro constante en toda la vuelta, incluso con ángulos de trabajo pronunciados (como al girar el volante a fondo), mientras que una junta cardán convencional introduce pequeñas variaciones de velocidad no deseadas" },
  { anverso: "¿Qué es el fuelle (o guardapolvo) de una junta homocinética?", reverso: "Una funda de goma flexible que protege la junta homocinética, manteniendo la grasa lubricante en su interior y evitando la entrada de agua, polvo o suciedad que dañarían rápidamente el mecanismo" },
  { anverso: "¿Qué síntoma característico presenta una junta homocinética desgastada o con el fuelle roto?", reverso: "Un ruido metálico tipo 'clac-clac', especialmente perceptible al girar el volante a fondo (por ejemplo, al aparcar), debido a la entrada de suciedad y la pérdida de lubricación en el mecanismo" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Cuál es la función del árbol de transmisión (palier)?", explicacion: "Transmitir el movimiento de giro desde el diferencial hasta cada rueda motriz.", dificultad: "facil", opciones: ["Transmitir el movimiento de giro hasta cada rueda motriz", "Generar la chispa que enciende la mezcla del motor", "Impulsar el combustible a presión hacia los inyectores", "Evacuar el calor generado por la combustión del motor"], correcta: 0 },
  { enunciado: "¿Qué es una junta homocinética?", explicacion: "Un mecanismo que transmite el movimiento de giro a velocidad constante entre ejes no alineados.", dificultad: "media", opciones: ["Un mecanismo que transmite giro a velocidad constante entre ejes", "Un elemento que genera la presión de sobrealimentación del motor", "Un elemento que filtra las impurezas del aceite del motor", "Un elemento que regula la temperatura del líquido refrigerante"], correcta: 0 },
  { enunciado: "¿Por qué se prefiere una junta homocinética a una junta cardán convencional en los paliers de tracción delantera?", explicacion: "Mantiene una velocidad de giro constante incluso con ángulos de trabajo pronunciados.", dificultad: "dificil", opciones: ["Mantiene velocidad de giro constante con ángulos pronunciados", "Una junta cardán siempre resulta más adecuada en cualquier caso", "Ambos tipos de junta son exactamente equivalentes en su función", "La junta homocinética nunca se emplea en vehículos reales"], correcta: 0 },
  { enunciado: "¿Qué función cumple el fuelle (guardapolvo) de una junta homocinética?", explicacion: "Protege la junta manteniendo la grasa en su interior y evitando la entrada de suciedad.", dificultad: "media", opciones: ["Protege la junta manteniendo la grasa y evitando suciedad", "Genera directamente el movimiento de giro de la rueda", "Filtra las impurezas presentes en el combustible del motor", "Regula la apertura y cierre de las válvulas del motor"], correcta: 0 },
  { enunciado: "¿Qué síntoma es característico de una junta homocinética desgastada?", explicacion: "Un ruido metálico tipo 'clac-clac' al girar el volante a fondo.", dificultad: "media", opciones: ["Un ruido metálico tipo 'clac-clac' al girar el volante a fondo", "Un aumento notable de la temperatura del líquido refrigerante", "Una pérdida de presión en el sistema de frenos del vehículo", "Un cambio en el color de los gases de escape del vehículo"], correcta: 0 },
]);

const S2 = "grupo-conico-corona-pinion";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es el grupo cónico-corona (o simplemente 'el grupo'), en un vehículo de propulsión trasera?", reverso: "Un conjunto de engranajes, formado por un piñón de ataque y una corona dentada, que recibe el movimiento del árbol de transmisión longitudinal y lo desvía 90 grados hacia los paliers de las ruedas traseras, además de reducir la velocidad de giro" },
  { anverso: "¿Qué es el piñón de ataque, dentro del grupo cónico-corona?", reverso: "El engranaje más pequeño del grupo, solidario al árbol de transmisión, que engrana directamente con la corona y le transmite el movimiento de giro" },
  { anverso: "¿Qué es la corona, dentro del grupo cónico-corona?", reverso: "El engranaje de mayor tamaño del grupo, sobre el que va montada la caja del diferencial, que recibe el movimiento del piñón de ataque a una velocidad de giro reducida respecto a la de entrada" },
  { anverso: "¿Por qué es importante el aceite específico del grupo cónico-corona (aceite de diferencial)?", reverso: "Porque los engranajes del grupo trabajan bajo cargas y presiones muy elevadas de contacto entre dientes, requiriendo un aceite de alta viscosidad y aditivos de extrema presión (EP) específicos, distintos del aceite de motor" },
  { anverso: "¿Qué configuración de vehículo incorpora habitualmente un grupo cónico-corona independiente, a diferencia de la tracción delantera transversal?", reverso: "Los vehículos de propulsión trasera (motor delantero longitudinal, tracción trasera) o tracción total, en los que es necesario desviar 90 grados el movimiento longitudinal del árbol de transmisión hacia el eje trasero" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Cuál es la función del grupo cónico-corona en un vehículo de propulsión trasera?", explicacion: "Desviar 90 grados el movimiento del árbol de transmisión hacia los paliers, reduciendo la velocidad de giro.", dificultad: "media", opciones: ["Desviar 90 grados el movimiento hacia los paliers traseros", "Generar la chispa que enciende la mezcla del motor", "Impulsar el combustible a presión hacia los inyectores", "Evacuar el calor generado por la combustión del motor"], correcta: 0 },
  { enunciado: "¿Qué es el piñón de ataque dentro del grupo cónico-corona?", explicacion: "El engranaje más pequeño, solidario al árbol de transmisión, que engrana con la corona.", dificultad: "media", opciones: ["El engranaje más pequeño, que engrana con la corona", "El engranaje de mayor tamaño sobre el que va el diferencial", "El elemento que filtra las impurezas del aceite del motor", "El elemento que regula la temperatura del motor"], correcta: 0 },
  { enunciado: "¿Qué es la corona dentro del grupo cónico-corona?", explicacion: "El engranaje de mayor tamaño, sobre el que va montada la caja del diferencial.", dificultad: "media", opciones: ["El engranaje de mayor tamaño sobre el que va el diferencial", "El engranaje más pequeño solidario al árbol de transmisión", "El elemento que transmite el giro del volante a la columna", "El elemento que genera la presión de sobrealimentación"], correcta: 0 },
  { enunciado: "¿Por qué se requiere un aceite específico para el grupo cónico-corona?", explicacion: "Los engranajes trabajan bajo cargas y presiones muy elevadas, requiriendo un aceite de alta viscosidad y aditivos EP.", dificultad: "dificil", opciones: ["Los engranajes trabajan bajo cargas y presiones muy elevadas", "El grupo cónico-corona nunca requiere ningún tipo de lubricación", "Puede emplearse el mismo aceite que el del motor sin problema", "El aceite del grupo solo tiene una función estética"], correcta: 0 },
  { enunciado: "¿En qué tipo de configuración de vehículo es más habitual encontrar un grupo cónico-corona independiente?", explicacion: "Vehículos de propulsión trasera o tracción total.", dificultad: "dificil", opciones: ["Vehículos de propulsión trasera o tracción total", "Exclusivamente en vehículos de tracción delantera transversal", "Exclusivamente en motocicletas de pequeña cilindrada", "Ningún vehículo actual incorpora este tipo de grupo"], correcta: 0 },
]);

const S3 = "diferencial-funcionamiento-tipos";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Cuál es la función del diferencial?", reverso: "Permitir que las dos ruedas de un mismo eje motriz giren a velocidades distintas cuando el vehículo toma una curva, ya que la rueda exterior recorre una distancia mayor que la interior en el mismo tiempo" },
  { anverso: "¿Por qué sería problemático que las dos ruedas motrices de un mismo eje estuvieran unidas rígidamente, sin diferencial?", reverso: "En una curva, ambas ruedas se verían obligadas a girar exactamente a la misma velocidad pese a recorrer distancias distintas, provocando que una de ellas patine o arrastre, generando un desgaste anómalo de neumáticos y dificultando la conducción" },
  { anverso: "¿Qué es un diferencial abierto (o convencional)?", reverso: "El tipo de diferencial más habitual, que reparte el par motor por igual entre ambas ruedas mientras tienen buena adherencia, pero que puede transmitir la mayor parte de la fuerza a la rueda con menos agarre si una de ellas patina, perdiendo tracción efectiva" },
  { anverso: "¿Qué es un diferencial autoblocante (o de deslizamiento limitado, LSD)?", reverso: "Un tipo de diferencial que limita la diferencia de velocidad de giro permitida entre las dos ruedas, transfiriendo más par hacia la rueda con más agarre en situaciones de baja adherencia, mejorando la tracción respecto a un diferencial abierto convencional" },
  { anverso: "¿Qué es el diferencial central, en un vehículo con tracción total (4x4)?", reverso: "Un diferencial adicional que reparte el par motor entre el eje delantero y el trasero, permitiendo que ambos ejes giren a velocidades ligeramente distintas cuando es necesario, además del reparto habitual del diferencial de cada eje entre sus dos ruedas" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Cuál es la función del diferencial?", explicacion: "Permitir que las ruedas de un mismo eje giren a velocidades distintas en una curva.", dificultad: "facil", opciones: ["Permitir que las ruedas de un eje giren a distinta velocidad en curva", "Generar la chispa que enciende la mezcla del motor", "Impulsar el combustible a presión hacia los inyectores", "Evacuar el calor generado por la combustión del motor"], correcta: 0 },
  { enunciado: "¿Por qué sería problemático que las ruedas motrices estuvieran unidas rígidamente sin diferencial?", explicacion: "En una curva se verían obligadas a girar a la misma velocidad pese a recorrer distancias distintas, provocando patinaje.", dificultad: "media", opciones: ["Se verían obligadas a girar igual pese a recorrer distinta distancia", "No existiría ningún problema real en esa configuración", "Las ruedas girarían siempre a la velocidad óptima sin diferencial", "Solo afectaría a la velocidad máxima del vehículo"], correcta: 0 },
  { enunciado: "¿Qué caracteriza a un diferencial abierto convencional?", explicacion: "Reparte el par por igual mientras hay buena adherencia, pero puede perder tracción si una rueda patina.", dificultad: "media", opciones: ["Puede perder tracción si una rueda patina y pierde adherencia", "Nunca permite que una rueda gire más rápido que la otra", "Bloquea siempre ambas ruedas a la misma velocidad exacta", "Es un sistema exclusivo de los vehículos de tracción total"], correcta: 0 },
  { enunciado: "¿Qué ventaja aporta un diferencial autoblocante (LSD) frente a uno abierto convencional?", explicacion: "Mejora la tracción en baja adherencia al transferir más par a la rueda con más agarre.", dificultad: "dificil", opciones: ["Mejora la tracción en baja adherencia transfiriendo par a la rueda con agarre", "No aporta ninguna ventaja real frente al diferencial abierto", "Impide por completo que las ruedas giren a distinta velocidad", "Solo se emplea en vehículos sin ningún tipo de tracción"], correcta: 0 },
  { enunciado: "¿Qué función cumple el diferencial central en un vehículo de tracción total?", explicacion: "Reparte el par motor entre el eje delantero y trasero, permitiendo velocidades ligeramente distintas entre ambos.", dificultad: "dificil", opciones: ["Reparte el par entre el eje delantero y trasero del vehículo", "Reparte el par únicamente entre las dos ruedas de un mismo eje", "Genera la presión de sobrealimentación del motor", "Filtra las impurezas presentes en el aceite del motor"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 18 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 18, orden: 18, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-182 creado y vinculado como Tema 18 de Oficial Mecánico.");
