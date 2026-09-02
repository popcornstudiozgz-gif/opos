/**
 * Crea tema-178: "Sobrealimentación" — Tema 14 (numero=14, bloque-2)
 * de Oficial Mecánico.
 *
 * Corresponde al TEMA 12 oficial: "Sobrealimentación."
 *
 * Conocimiento técnico consolidado de mecánica del automóvil, sin una
 * ley española que lo regule como tal.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-178-sobrealimentacion.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-178";
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
  titulo: "Sobrealimentación",
  descripcion: "El principio de funcionamiento del turbocompresor, los elementos de control de la presión de sobrealimentación (intercooler, wastegate) y la sobrealimentación mecánica como alternativa al turbo.",
  contenido: "Desarrolla el concepto de sobrealimentación de un motor de combustión, el principio de funcionamiento del turbocompresor (movido por los gases de escape), los elementos que regulan y optimizan la presión de sobrealimentación (intercooler, válvula wastegate) y, de forma comparativa, la sobrealimentación mecánica (compresor volumétrico) como alternativa al turbocompresor.",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "El turbocompresor: principio de funcionamiento", seccion: "turbocompresor-principio-funcionamiento", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Intercooler y válvula wastegate", seccion: "intercooler-wastegate-control-presion", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Sobrealimentación mecánica: el compresor volumétrico", seccion: "sobrealimentacion-mecanica-comparativa", articulos: "Conceptos fundamentales" },
  ],
}]);

const S1 = "turbocompresor-principio-funcionamiento";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es la sobrealimentación de un motor?", reverso: "Una técnica que consiste en introducir aire a mayor presión de la atmosférica en los cilindros del motor, permitiendo quemar más combustible en cada ciclo y, por tanto, obtener más potencia con la misma cilindrada" },
  { anverso: "¿Qué es un turbocompresor?", reverso: "Un dispositivo compuesto por dos turbinas unidas por un eje común: una turbina de escape, movida por los gases de escape del motor, que a su vez hace girar una turbina de compresión, que introduce aire a presión en el colector de admisión" },
  { anverso: "¿Por qué el turbocompresor aprovecha energía que de otro modo se perdería?", reverso: "Porque emplea la energía cinética de los gases de escape, que en un motor atmosférico simplemente se expulsa a la atmósfera, para mover la turbina de compresión y generar la presión de sobrealimentación" },
  { anverso: "¿Qué es el 'turbo lag' (retardo del turbo)?", reverso: "El breve retraso que se produce entre el momento en que el conductor pisa el acelerador y el momento en que el turbocompresor alcanza la velocidad de giro necesaria para generar una presión de sobrealimentación efectiva" },
  { anverso: "¿Por qué el turbocompresor requiere una lubricación y refrigeración específicas?", reverso: "Porque el eje del turbocompresor gira a velocidades extremadamente altas (decenas de miles de revoluciones por minuto) y alcanza temperaturas muy elevadas por el contacto con los gases de escape, requiriendo aceite a presión y, en muchos casos, refrigeración por líquido" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es la sobrealimentación de un motor?", explicacion: "Introducir aire a mayor presión de la atmosférica en los cilindros para obtener más potencia.", dificultad: "facil", opciones: ["Introducir aire a mayor presión de la atmosférica en los cilindros", "Reducir la cantidad de aire que entra en los cilindros", "Eliminar por completo la necesidad de combustible en el motor", "Aumentar exclusivamente la temperatura del motor en marcha"], correcta: 0 },
  { enunciado: "¿Cómo está compuesto un turbocompresor?", explicacion: "Dos turbinas unidas por un eje común: una de escape y otra de compresión.", dificultad: "media", opciones: ["Dos turbinas unidas por un eje común, de escape y de compresión", "Una única turbina movida directamente por el cigüeñal", "Un compresor accionado exclusivamente por una correa", "Un sistema exclusivamente eléctrico sin partes móviles"], correcta: 0 },
  { enunciado: "¿Qué energía aprovecha el turbocompresor para funcionar?", explicacion: "La energía cinética de los gases de escape del motor.", dificultad: "media", opciones: ["La energía cinética de los gases de escape del motor", "La energía eléctrica almacenada en la batería del vehículo", "La energía mecánica transmitida directamente por una correa", "La energía térmica del líquido refrigerante del motor"], correcta: 0 },
  { enunciado: "¿Qué es el 'turbo lag'?", explicacion: "El breve retraso entre pisar el acelerador y que el turbo genere presión de sobrealimentación efectiva.", dificultad: "dificil", opciones: ["El retraso entre acelerar y que el turbo genere presión efectiva", "El tiempo que tarda el motor en enfriarse tras su uso", "El tiempo que tarda la batería en cargarse completamente", "El retraso en el cambio de marchas de la caja de cambios"], correcta: 0 },
  { enunciado: "¿Por qué el turbocompresor requiere una lubricación específica?", explicacion: "Porque su eje gira a velocidades extremadamente altas y soporta temperaturas muy elevadas.", dificultad: "dificil", opciones: ["Su eje gira a velocidades muy altas y soporta temperaturas elevadas", "El turbocompresor no requiere ningún tipo de lubricación", "Solo requiere lubricación en motores diésel, no en gasolina", "La lubricación del turbo es idéntica a la de un neumático"], correcta: 0 },
]);

const S2 = "intercooler-wastegate-control-presion";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es el intercooler?", reverso: "Un intercambiador de calor situado entre la salida del turbocompresor y la admisión del motor, que enfría el aire comprimido (que se calienta al ser comprimido) antes de que entre en los cilindros, aumentando su densidad y mejorando el rendimiento" },
  { anverso: "¿Por qué es importante enfriar el aire de sobrealimentación antes de que entre en el motor?", reverso: "Porque el aire caliente es menos denso (contiene menos oxígeno por unidad de volumen) y aumenta el riesgo de detonación (autoencendido no deseado); un aire más frío permite quemar más combustible de forma más eficiente y segura" },
  { anverso: "¿Qué es la válvula wastegate?", reverso: "Una válvula que desvía parte de los gases de escape para que no pasen por la turbina del turbocompresor, limitando así su velocidad de giro y evitando que la presión de sobrealimentación supere el límite de diseño del motor" },
  { anverso: "¿Qué es la válvula de descarga (o dump valve / blow-off valve)?", reverso: "Una válvula que libera el exceso de presión de aire acumulado en el colector de admisión cuando el conductor suelta el acelerador de forma brusca, evitando que esa presión retenida dañe el turbocompresor" },
  { anverso: "¿Qué es un turbocompresor de geometría variable (VGT)?", reverso: "Un tipo de turbocompresor avanzado, habitual en motores diésel modernos, cuyas aletas orientables permiten regular el flujo de gases de escape hacia la turbina en función del régimen del motor, reduciendo el turbo lag y mejorando la respuesta en todo el rango de revoluciones" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué función cumple el intercooler?", explicacion: "Enfría el aire comprimido antes de que entre en los cilindros, aumentando su densidad.", dificultad: "media", opciones: ["Enfría el aire comprimido antes de entrar en los cilindros", "Genera la presión de sobrealimentación del motor", "Filtra las impurezas presentes en el aceite del motor", "Impulsa el líquido refrigerante por el circuito del motor"], correcta: 0 },
  { enunciado: "¿Por qué es importante enfriar el aire de sobrealimentación?", explicacion: "El aire más frío es más denso y reduce el riesgo de detonación.", dificultad: "dificil", opciones: ["El aire más frío es más denso y reduce el riesgo de detonación", "El aire caliente siempre resulta más beneficioso para el motor", "Enfriar el aire no aporta ninguna ventaja real al motor", "Solo influye en el color de los gases de escape del motor"], correcta: 0 },
  { enunciado: "¿Qué función cumple la válvula wastegate?", explicacion: "Desvía parte de los gases de escape para limitar la velocidad de giro del turbo y la presión de sobrealimentación.", dificultad: "media", opciones: ["Desvía gases de escape para limitar la presión de sobrealimentación", "Enfría el aire comprimido antes de entrar en los cilindros", "Filtra las impurezas presentes en el combustible del motor", "Impulsa el aceite lubricante por el circuito de engrase"], correcta: 0 },
  { enunciado: "¿Qué función cumple la válvula de descarga (dump valve)?", explicacion: "Libera el exceso de presión acumulado al soltar el acelerador bruscamente, protegiendo el turbo.", dificultad: "dificil", opciones: ["Libera el exceso de presión al soltar el acelerador bruscamente", "Genera directamente la presión de sobrealimentación del motor", "Enfría el líquido refrigerante del sistema de refrigeración", "Regula la apertura y cierre de las válvulas del motor"], correcta: 0 },
  { enunciado: "¿Qué ventaja aporta un turbocompresor de geometría variable (VGT)?", explicacion: "Reduce el turbo lag y mejora la respuesta en todo el rango de revoluciones, regulando el flujo de gases hacia la turbina.", dificultad: "dificil", opciones: ["Reduce el turbo lag y mejora la respuesta en todo el rango", "No aporta ninguna ventaja real frente a un turbo convencional", "Elimina por completo la necesidad de intercooler en el motor", "Solo se emplea en motores de gasolina de baja cilindrada"], correcta: 0 },
]);

const S3 = "sobrealimentacion-mecanica-comparativa";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un compresor volumétrico (o compresor mecánico, 'supercharger')?", reverso: "Un dispositivo de sobrealimentación accionado mecánicamente, habitualmente mediante una correa conectada al cigüeñal del motor, que comprime el aire de admisión de forma proporcional al régimen de giro del motor" },
  { anverso: "¿Cuál es la principal diferencia de funcionamiento entre un turbocompresor y un compresor volumétrico?", reverso: "El turbocompresor se mueve por los gases de escape (energía que de otro modo se perdería); el compresor volumétrico se mueve mecánicamente por el propio motor (correa), consumiendo directamente parte de la potencia que genera el motor" },
  { anverso: "¿Qué ventaja tiene el compresor volumétrico frente al turbocompresor en cuanto a respuesta?", reverso: "Al estar conectado mecánicamente al motor, responde de forma prácticamente instantánea al acelerador, sin el retardo (turbo lag) característico del turbocompresor" },
  { anverso: "¿Qué desventaja tiene el compresor volumétrico frente al turbocompresor en cuanto a eficiencia?", reverso: "Al ser accionado mecánicamente por el propio motor, consume parte de la potencia generada para su propio funcionamiento, resultando en general menos eficiente energéticamente que el turbocompresor" },
  { anverso: "¿Qué es un sistema de sobrealimentación biturbo (o twin-turbo)?", reverso: "Un sistema que emplea dos turbocompresores, bien trabajando en paralelo (cada uno para una parte de los cilindros) o en secuencia (uno pequeño de respuesta rápida a bajas revoluciones y otro mayor a altas revoluciones), para optimizar la respuesta en todo el rango de uso del motor" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es un compresor volumétrico?", explicacion: "Un dispositivo de sobrealimentación accionado mecánicamente, habitualmente por correa desde el cigüeñal.", dificultad: "media", opciones: ["Un dispositivo de sobrealimentación accionado mecánicamente por correa", "Un dispositivo movido exclusivamente por los gases de escape", "Un dispositivo exclusivamente eléctrico sin partes móviles", "Un dispositivo que forma parte del sistema de frenos del vehículo"], correcta: 0 },
  { enunciado: "¿Cuál es la diferencia principal entre turbocompresor y compresor volumétrico?", explicacion: "El turbo se mueve con los gases de escape; el compresor volumétrico se mueve mecánicamente por el propio motor.", dificultad: "media", opciones: ["El turbo usa gases de escape, el volumétrico se mueve mecánicamente", "Ambos sistemas funcionan de forma exactamente idéntica", "El compresor volumétrico también se mueve por gases de escape", "El turbocompresor se mueve siempre mediante una correa"], correcta: 0 },
  { enunciado: "¿Qué ventaja de respuesta tiene el compresor volumétrico frente al turbocompresor?", explicacion: "Responde de forma prácticamente instantánea, sin el retardo característico del turbo.", dificultad: "media", opciones: ["Responde de forma prácticamente instantánea al acelerador", "Siempre responde con más retardo que un turbocompresor", "No existe ninguna diferencia de respuesta entre ambos sistemas", "El compresor volumétrico nunca responde de forma inmediata"], correcta: 0 },
  { enunciado: "¿Qué desventaja de eficiencia tiene el compresor volumétrico frente al turbocompresor?", explicacion: "Consume parte de la potencia del motor para su propio funcionamiento, siendo menos eficiente energéticamente.", dificultad: "dificil", opciones: ["Consume parte de la potencia del motor para funcionar", "Es siempre más eficiente energéticamente que el turbocompresor", "No consume ninguna energía del motor para funcionar", "Su eficiencia es exactamente idéntica a la del turbocompresor"], correcta: 0 },
  { enunciado: "¿Qué es un sistema de sobrealimentación biturbo?", explicacion: "Un sistema que emplea dos turbocompresores, en paralelo o en secuencia, para optimizar la respuesta en todo el rango del motor.", dificultad: "dificil", opciones: ["Un sistema que emplea dos turbocompresores para optimizar la respuesta", "Un sistema que emplea un único compresor volumétrico grande", "Un sistema exclusivo de motores de gasolina atmosféricos", "Un sistema que elimina por completo la necesidad de intercooler"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 14 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 14, orden: 14, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-178 creado y vinculado como Tema 14 de Oficial Mecánico.");
