/**
 * Crea tema-190: "Conceptos fundamentales de hidráulica: masa, volumen,
 * densidad, caudal y velocidad" — Tema 10 (numero=10, bloque-2) de
 * Oficial Guardallaves (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 8 oficial del Anexo I (bases2110.pdf, línea 908):
 *   "Conocimientos fundamentales. Conceptos básicos: masa y volumen,
 *   densidad, peso y peso específico, caudal y velocidad del agua en las
 *   conducciones. Relación entre caudal, velocidad y sección. Unidades.
 *   Conversión de unidades. Simbología."
 *
 * Conocimiento técnico consolidado de física e hidráulica básica, sin
 * una ley española que lo regule como tal — mismo criterio ya aplicado
 * en otras oposiciones "Oficial X" para contenido técnico de base sin
 * ley única (ver, p. ej., scripts/seed-tema-171-*.mjs de Oficial
 * Mecánico). Búsqueda previa realizada conforme al estándar de sourcing
 * del proyecto: no existe una norma española específica que regule estos
 * conceptos físicos generales (masa, densidad, caudal); el Sistema
 * Internacional de Unidades (SI) es un estándar de medida universal, no
 * una norma sectorial del abastecimiento de agua.
 *
 * Tres secciones:
 * 1. masa-volumen-densidad-peso-especifico
 * 2. caudal-velocidad-agua-conducciones
 * 3. relacion-caudal-velocidad-seccion-unidades
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-190-conceptos-fundamentales-hidraulica.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-190";
const OPOSICION = "oficial-guardallaves-ayto-zaragoza";
const BLOQUE_2_ID = "5bb8da57-00c3-4865-a0a1-651b70c85ba0";

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
  titulo: "Conceptos fundamentales de hidráulica: masa, volumen, densidad, caudal y velocidad",
  descripcion: "Masa, volumen, densidad, peso y peso específico. Caudal y velocidad del agua en las conducciones. Relación entre caudal, velocidad y sección. Unidades, conversión de unidades y simbología.",
  contenido: "Desarrolla los conceptos físicos básicos necesarios para entender el comportamiento del agua en una red de abastecimiento: masa, volumen, densidad, peso y peso específico; el caudal y la velocidad del agua dentro de las conducciones; y la relación matemática entre caudal, velocidad y sección de una tubería, junto con las unidades habituales del Sistema Internacional, sus conversiones y la simbología empleada.",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "Masa, volumen, densidad, peso y peso específico", seccion: "masa-volumen-densidad-peso-especifico", articulos: "Conceptos fundamentales de física e hidráulica" },
    { url: "", titulo: "Caudal y velocidad del agua en las conducciones", seccion: "caudal-velocidad-agua-conducciones", articulos: "Conceptos fundamentales de física e hidráulica" },
    { url: "", titulo: "Relación entre caudal, velocidad y sección. Unidades", seccion: "relacion-caudal-velocidad-seccion-unidades", articulos: "Conceptos fundamentales de física e hidráulica" },
  ],
}]);

const S1 = "masa-volumen-densidad-peso-especifico";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es la masa de un cuerpo?", reverso: "La cantidad de materia que contiene, medida en el Sistema Internacional en kilogramos (kg), y que no varía con la posición del cuerpo (a diferencia del peso)" },
  { anverso: "¿Qué es el volumen?", reverso: "El espacio que ocupa un cuerpo, medido en el Sistema Internacional en metros cúbicos (m³), aunque en el ámbito del agua se emplean también litros (1 m³ = 1.000 litros)" },
  { anverso: "¿Qué es la densidad de una sustancia?", reverso: "La relación entre su masa y su volumen (densidad = masa / volumen); la densidad del agua a 4 °C es de aproximadamente 1.000 kg/m³ (1 kg/litro)" },
  { anverso: "¿Qué diferencia existe entre masa y peso?", reverso: "La masa es la cantidad de materia (constante); el peso es la fuerza con la que la gravedad atrae a esa masa (peso = masa × gravedad), y sí varía según la gravedad del lugar" },
  { anverso: "¿Qué es el peso específico de una sustancia?", reverso: "El peso de esa sustancia por unidad de volumen (peso específico = peso / volumen); para el agua es de aproximadamente 9.810 N/m³ (o, en unidades técnicas antiguas, 1.000 kg/m³)" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es la masa de un cuerpo?", explicacion: "La cantidad de materia que contiene, medida en kg, constante con la posición.", dificultad: "facil", opciones: ["La cantidad de materia que contiene, medida en kilogramos", "La fuerza con la que la gravedad atrae a ese cuerpo", "El espacio que ocupa ese cuerpo en metros cúbicos", "La velocidad a la que se desplaza ese cuerpo"], correcta: 0 },
  { enunciado: "¿Cuántos litros contiene un metro cúbico?", explicacion: "1 m³ equivale a 1.000 litros.", dificultad: "facil", opciones: ["1.000 litros", "100 litros", "10.000 litros", "10 litros"], correcta: 0 },
  { enunciado: "¿Cómo se calcula la densidad de una sustancia?", explicacion: "Densidad = masa / volumen.", dificultad: "media", opciones: ["Dividiendo su masa entre su volumen", "Multiplicando su masa por su volumen", "Dividiendo su peso entre la gravedad", "Multiplicando su peso por la gravedad"], correcta: 0 },
  { enunciado: "¿Qué diferencia existe entre masa y peso?", explicacion: "La masa es constante; el peso depende de la gravedad.", dificultad: "media", opciones: ["La masa es constante; el peso depende de la gravedad", "Ambos términos son exactamente equivalentes en física", "El peso es constante; la masa depende de la gravedad", "La masa se mide en newtons y el peso en kilogramos"], correcta: 0 },
  { enunciado: "¿Qué es el peso específico de una sustancia?", explicacion: "El peso de esa sustancia por unidad de volumen.", dificultad: "dificil", opciones: ["El peso de esa sustancia por unidad de volumen", "La masa de esa sustancia por unidad de volumen", "El volumen de esa sustancia por unidad de masa", "La velocidad de esa sustancia por unidad de tiempo"], correcta: 0 },
]);

const S2 = "caudal-velocidad-agua-conducciones";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es el caudal en una conducción de agua?", reverso: "El volumen de agua que atraviesa una sección de la tubería por unidad de tiempo, expresado habitualmente en litros por segundo (l/s) o metros cúbicos por hora (m³/h)" },
  { anverso: "¿Qué es la velocidad del agua en una conducción?", reverso: "La distancia que recorre el agua por unidad de tiempo dentro de la tubería, expresada habitualmente en metros por segundo (m/s)" },
  { anverso: "¿Por qué no conviene diseñar una conducción con velocidades de agua excesivamente altas?", reverso: "Porque aumentan las pérdidas de carga por fricción, el riesgo de erosión interna de la tubería y la magnitud de un posible golpe de ariete ante un cierre brusco" },
  { anverso: "¿Por qué tampoco conviene una velocidad de agua excesivamente baja en una conducción?", reverso: "Porque favorece la sedimentación de partículas, el estancamiento del agua y la pérdida de calidad (por ejemplo, de cloro residual), afectando a la calidad sanitaria del suministro" },
  { anverso: "¿Qué rango de velocidades es habitual en el diseño de conducciones de abastecimiento de agua?", reverso: "Generalmente entre 0,5 y 2 m/s de forma orientativa, aunque el valor concreto depende del diámetro, la función de la conducción y el criterio del proyectista" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es el caudal en una conducción de agua?", explicacion: "El volumen de agua que atraviesa una sección por unidad de tiempo.", dificultad: "facil", opciones: ["El volumen de agua que atraviesa una sección por unidad de tiempo", "La distancia que recorre el agua por unidad de tiempo", "El peso total del agua contenida en la conducción", "La presión que ejerce el agua sobre las paredes de la tubería"], correcta: 0 },
  { enunciado: "¿En qué unidades se expresa habitualmente el caudal?", explicacion: "Litros por segundo (l/s) o metros cúbicos por hora (m³/h).", dificultad: "media", opciones: ["Litros por segundo o metros cúbicos por hora", "Metros por segundo exclusivamente", "Kilogramos por metro cúbico exclusivamente", "Newtons por metro cuadrado exclusivamente"], correcta: 0 },
  { enunciado: "¿Por qué no conviene una velocidad del agua excesivamente alta en una conducción?", explicacion: "Aumenta pérdidas de carga, erosión interna y el riesgo de golpe de ariete.", dificultad: "media", opciones: ["Aumenta pérdidas de carga, erosión interna y golpe de ariete", "No genera ningún inconveniente técnico real en la conducción", "Reduce el consumo de agua de los abonados de la zona", "Elimina por completo la necesidad de mantenimiento de válvulas"], correcta: 0 },
  { enunciado: "¿Por qué no conviene una velocidad del agua excesivamente baja en una conducción?", explicacion: "Favorece la sedimentación y la pérdida de calidad del agua.", dificultad: "dificil", opciones: ["Favorece la sedimentación y la pérdida de calidad del agua", "Aumenta de forma directa e inevitable la presión en toda la red", "Provoca siempre la rotura inmediata de la conducción afectada", "No genera ningún inconveniente técnico real en la conducción"], correcta: 0 },
  { enunciado: "¿Qué rango de velocidades es orientativamente habitual en conducciones de abastecimiento?", explicacion: "Generalmente entre 0,5 y 2 m/s, de forma orientativa.", dificultad: "dificil", opciones: ["Generalmente entre 0,5 y 2 m/s", "Generalmente entre 20 y 50 m/s", "Generalmente entre 0,005 y 0,02 m/s", "Generalmente entre 100 y 200 m/s"], correcta: 0 },
]);

const S3 = "relacion-caudal-velocidad-seccion-unidades";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Cuál es la relación matemática entre caudal, velocidad y sección de una conducción?", reverso: "Caudal = Velocidad × Sección (Q = v · S); a igualdad de caudal, a menor sección de tubería corresponde mayor velocidad del agua, y viceversa" },
  { anverso: "Si se reduce el diámetro de una conducción manteniendo el mismo caudal, ¿qué ocurre con la velocidad del agua?", reverso: "Aumenta, ya que la sección disminuye y el caudal debe mantenerse constante (Q = v · S), de modo que la velocidad debe crecer para compensar la menor sección" },
  { anverso: "¿Cómo se calcula la sección de una tubería de sección circular a partir de su diámetro?", reverso: "Sección = π × (diámetro/2)², es decir, el área del círculo que forma la sección transversal interior de la tubería" },
  { anverso: "¿Qué unidades del Sistema Internacional se emplean habitualmente para caudal, velocidad y sección en hidráulica de abastecimiento?", reverso: "El caudal en m³/s o l/s, la velocidad en m/s y la sección en m², de modo que la ecuación Q = v · S resulta dimensionalmente coherente" },
  { anverso: "¿Por qué es útil para un guardallaves conocer la relación entre caudal, velocidad y sección de las conducciones?", reverso: "Porque permite anticipar, ante un cambio de diámetro o un estrechamiento de la red, cómo variará la velocidad del agua y valorar sus consecuencias (pérdida de carga, riesgo de golpe de ariete, capacidad de suministro de la zona)" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Cuál es la relación matemática entre caudal, velocidad y sección de una conducción?", explicacion: "Caudal = Velocidad × Sección (Q = v · S).", dificultad: "facil", opciones: ["Caudal = Velocidad × Sección", "Caudal = Velocidad / Sección", "Caudal = Sección / Velocidad", "Caudal = Velocidad + Sección"], correcta: 0 },
  { enunciado: "Si se reduce el diámetro de una conducción manteniendo el mismo caudal, ¿qué ocurre con la velocidad?", explicacion: "Aumenta, para compensar la menor sección.", dificultad: "media", opciones: ["Aumenta, para compensar la menor sección", "Disminuye, al reducirse el diámetro de la conducción", "Se mantiene exactamente igual, sin ninguna variación", "Se vuelve imposible de calcular sin más datos adicionales"], correcta: 0 },
  { enunciado: "¿Cómo se calcula la sección de una tubería de sección circular a partir de su diámetro?", explicacion: "Sección = π × (diámetro/2)².", dificultad: "media", opciones: ["Sección = π × (diámetro/2)²", "Sección = diámetro × π", "Sección = 2 × π × diámetro", "Sección = diámetro² / π"], correcta: 0 },
  { enunciado: "¿En qué unidades se expresa habitualmente la sección de una conducción en la ecuación Q = v · S?", explicacion: "En metros cuadrados (m²).", dificultad: "dificil", opciones: ["Metros cuadrados (m²)", "Metros cúbicos (m³)", "Metros lineales (m)", "Kilogramos (kg)"], correcta: 0 },
  { enunciado: "¿Por qué es útil conocer la relación entre caudal, velocidad y sección en la gestión de la red?", explicacion: "Permite anticipar cómo varía la velocidad ante un cambio de diámetro.", dificultad: "media", opciones: ["Permite anticipar cómo varía la velocidad ante un cambio de diámetro", "No tiene ninguna utilidad práctica en la gestión diaria de la red", "Solo es relevante para el diseño de nuevas urbanizaciones", "Solo es relevante para el cálculo de la facturación del consumo"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 10 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 10, orden: 10, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-190 creado y vinculado como Tema 10 de Oficial Guardallaves.");
