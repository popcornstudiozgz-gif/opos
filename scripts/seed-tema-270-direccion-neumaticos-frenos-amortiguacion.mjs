/**
 * Crea tema-270: "Dirección y neumáticos, funcionamiento. Sistema de
 * frenos. Sistema de amortiguación" — Tema 10 (numero=10, bloque-2) de
 * Oficial Conductor, Especialidad General (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 8 oficial del Anexo I (bases2110.pdf, línea 1576):
 *   "Dirección y neumáticos, funcionamiento. Conceptos y elementos.
 *   Sistema de frenos. Sistema de amortiguación."
 *
 * Sourcing: conocimiento técnico consolidado sin ley única que lo regule
 * como tal (mismo criterio ya aplicado en los temas 267-269 de esta
 * misma oposición). Única excepción real y verificada: el etiquetado
 * europeo de neumáticos (Reglamento UE 2020/740), que regula la
 * información obligatoria sobre eficiencia energética, adherencia en
 * mojado y ruido de los neumáticos comercializados en la UE.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-270-direccion-neumaticos-frenos-amortiguacion.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-270";
const OPOSICION = "oficial-conductor-general-ayto-zaragoza";
const BLOQUE_2_ID = "38c4f100-214c-45c4-8600-841993100e43";

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
  titulo: "Dirección, neumáticos, frenos y amortiguación",
  descripcion: "Sistema de dirección: conceptos y elementos. Neumáticos: estructura, marcado y etiquetado europeo. Sistema de frenos: tipos y elementos. Sistema de amortiguación y suspensión.",
  contenido: "Desarrolla, desde la perspectiva de un conductor profesional, el funcionamiento del sistema de dirección y sus elementos principales, la estructura y el marcado de los neumáticos (incluido el etiquetado europeo de eficiencia energética, adherencia en mojado y ruido), los tipos y elementos del sistema de frenos, y el sistema de amortiguación y suspensión del vehículo.",
  enlaces_boe: [
    { url: "https://www.boe.es/buscar/doc.php?id=DOUE-L-2020-80878", titulo: "Reglamento (UE) 2020/740 (etiquetado de neumáticos)" },
  ],
  indice_estudio: [
    { url: "", titulo: "Sistema de dirección", seccion: "sistema-de-direccion", articulos: "Conceptos fundamentales" },
    { url: "https://www.boe.es/buscar/doc.php?id=DOUE-L-2020-80878", titulo: "Neumáticos: estructura y etiquetado", seccion: "neumaticos-estructura-y-etiquetado", articulos: "Reglamento UE 2020/740" },
    { url: "", titulo: "Sistema de frenos y amortiguación", seccion: "sistema-de-frenos-y-amortiguacion", articulos: "Conceptos fundamentales" },
  ],
}]);

const S1 = "sistema-de-direccion";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué función cumple el sistema de dirección de un vehículo?", reverso: "Permitir al conductor orientar las ruedas directrices (habitualmente las delanteras) para controlar la trayectoria del vehículo, transmitiendo el giro del volante hasta las ruedas mediante el mecanismo de dirección correspondiente" },
  { anverso: "¿Qué es la dirección asistida?", reverso: "Un sistema que reduce el esfuerzo que debe realizar el conductor para girar el volante, mediante asistencia hidráulica (bomba accionada por el motor) o eléctrica (motor eléctrico), facilitando especialmente las maniobras a baja velocidad" },
  { anverso: "¿Qué es la cremallera de dirección?", reverso: "El mecanismo más habitual en turismos que transforma el movimiento giratorio del volante, transmitido a través de la columna de dirección, en un movimiento lineal que desplaza las bielas de dirección y orienta las ruedas" },
  { anverso: "¿Qué es la geometría de la dirección (alineación)?", reverso: "El conjunto de ángulos (convergencia, caída, avance) con los que están montadas las ruedas respecto al chasis, que debe mantenerse dentro de los valores establecidos por el fabricante para garantizar un desgaste uniforme de los neumáticos y una conducción estable" },
  { anverso: "¿Qué síntoma puede indicar un problema en la geometría de la dirección de un vehículo?", reverso: "Que el vehículo tienda a desviarse hacia un lado al circular en línea recta soltando ligeramente el volante, o que los neumáticos presenten un desgaste irregular y más acusado en uno de sus bordes" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué función cumple el sistema de dirección de un vehículo?", explicacion: "Permitir orientar las ruedas directrices para controlar la trayectoria.", dificultad: "facil", opciones: ["Permitir orientar las ruedas directrices para controlar la trayectoria", "Reducir la velocidad del vehículo hasta detenerlo por completo", "Absorber las irregularidades del terreno durante la marcha", "Trasladar la energía del motor hasta las ruedas del vehículo"], correcta: 0 },
  { enunciado: "¿Qué es la dirección asistida?", explicacion: "Un sistema que reduce el esfuerzo necesario para girar el volante.", dificultad: "media", opciones: ["Un sistema que reduce el esfuerzo necesario para girar el volante", "Un sistema exclusivo para frenar el vehículo con mayor rapidez", "Un sistema exclusivo para amortiguar las irregularidades del terreno", "Un sistema que aumenta la velocidad máxima alcanzable del vehículo"], correcta: 0 },
  { enunciado: "¿Qué es la cremallera de dirección?", explicacion: "El mecanismo que transforma el giro del volante en movimiento lineal de las bielas.", dificultad: "media", opciones: ["El mecanismo que transforma el giro del volante en movimiento lineal", "El elemento que transforma la energía cinética en calor al frenar", "El elemento que absorbe las irregularidades del terreno del vehículo", "El mecanismo que traslada la energía del motor hasta las ruedas"], correcta: 0 },
  { enunciado: "¿Qué es la geometría de la dirección o alineación?", explicacion: "El conjunto de ángulos de montaje de las ruedas respecto al chasis.", dificultad: "media", opciones: ["El conjunto de ángulos de montaje de las ruedas respecto al chasis", "El nivel de líquido de frenos del circuito hidráulico del vehículo", "El tipo de neumático homologado para ese modelo de vehículo", "La presión recomendada por el fabricante para cada neumático"], correcta: 0 },
  { enunciado: "¿Qué síntoma puede indicar un problema de geometría de la dirección?", explicacion: "Desviación en línea recta o desgaste irregular de los neumáticos.", dificultad: "dificil", opciones: ["Desviación en línea recta o desgaste irregular de los neumáticos", "Un consumo de combustible siempre inferior al habitual del vehículo", "Un funcionamiento incorrecto exclusivo de las luces del vehículo", "Una pérdida total del nivel de aceite del motor del vehículo"], correcta: 0 },
]);

const S2 = "neumaticos-estructura-y-etiquetado";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué información indica el marcado de un neumático, por ejemplo \"205/55 R16 91V\"?", reverso: "205 es la anchura en milímetros, 55 el perfil (altura del flanco en % de la anchura), R indica construcción radial, 16 el diámetro de la llanta en pulgadas, 91 el índice de carga máxima admisible, y V el índice de velocidad máxima homologada" },
  { anverso: "¿Qué regula el Reglamento (UE) 2020/740 sobre neumáticos?", reverso: "El etiquetado obligatorio de los neumáticos comercializados en la Unión Europea, que informa mediante una escala de clases (A a E) sobre su eficiencia energética (resistencia a la rodadura), su adherencia en superficie mojada y su nivel de ruido exterior" },
  { anverso: "¿Qué es la profundidad del dibujo del neumático y por qué es relevante?", reverso: "La profundidad de las ranuras de la banda de rodadura, que evacúa el agua de la calzada y mantiene la adherencia; en España el límite legal mínimo es de 1,6 mm, por debajo del cual el neumático deja de ser apto para circular" },
  { anverso: "¿Qué diferencia existe entre un neumático de verano y uno de invierno?", reverso: "El neumático de invierno utiliza una mezcla de goma más blanda a bajas temperaturas y un dibujo con mayor número de laminillas, mejorando la adherencia sobre nieve, hielo o suelo frío, frente al de verano, optimizado para temperaturas más altas" },
  { anverso: "¿Por qué es importante rotar periódicamente los neumáticos entre los distintos ejes del vehículo?", reverso: "Porque el desgaste de los neumáticos no es uniforme entre el eje delantero y el trasero, y rotarlos periódicamente ayuda a homogeneizar ese desgaste y a alargar la vida útil del conjunto" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "En el marcado \"205/55 R16\", ¿qué indica el número 205?", explicacion: "La anchura del neumático en milímetros.", dificultad: "facil", opciones: ["La anchura del neumático en milímetros", "El diámetro de la llanta en pulgadas", "El índice de velocidad máxima homologada", "El índice de carga máxima admisible"], correcta: 0 },
  { enunciado: "¿Qué regula el Reglamento (UE) 2020/740?", explicacion: "El etiquetado de neumáticos sobre eficiencia energética, adherencia en mojado y ruido.", dificultad: "media", opciones: ["El etiquetado de neumáticos sobre eficiencia, adherencia y ruido", "La homologación general de vehículos de motor en la Unión Europea", "Los tiempos de conducción y descanso de conductores profesionales", "El régimen de infracciones y sanciones de tráfico en la Unión Europea"], correcta: 0 },
  { enunciado: "¿Cuál es el límite legal mínimo de profundidad del dibujo de un neumático en España?", explicacion: "1,6 mm.", dificultad: "media", opciones: ["1,6 mm", "5 mm", "0,5 mm", "10 mm"], correcta: 0 },
  { enunciado: "¿Qué diferencia principal existe entre un neumático de verano y uno de invierno?", explicacion: "El de invierno usa una goma más blanda en frío y más laminillas para mejorar la adherencia.", dificultad: "media", opciones: ["El de invierno mejora la adherencia sobre nieve, hielo o suelo frío", "Ambos tipos de neumático son técnicamente idénticos entre sí", "El de verano mejora siempre la adherencia sobre nieve y hielo", "El de invierno solo puede utilizarse en vehículos eléctricos"], correcta: 0 },
  { enunciado: "¿Por qué es importante rotar periódicamente los neumáticos entre ejes?", explicacion: "Porque el desgaste no es uniforme entre el eje delantero y el trasero.", dificultad: "dificil", opciones: ["Porque el desgaste no es uniforme entre el eje delantero y el trasero", "Porque la rotación aumenta siempre la velocidad máxima del vehículo", "Porque la normativa española lo exige cada seis meses sin excepción", "Porque el desgaste de los neumáticos es siempre idéntico en ambos ejes"], correcta: 0 },
]);

const S3 = "sistema-de-frenos-y-amortiguacion";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué diferencia existe entre los frenos de disco y los frenos de tambor?", reverso: "El freno de disco actúa apretando unas pastillas contra un disco metálico solidario a la rueda, disipando mejor el calor; el freno de tambor actúa expandiendo unas zapatas contra el interior de un tambor cilíndrico, siendo habitual en el eje trasero de vehículos más pequeños" },
  { anverso: "¿Qué es el sistema ABS (Antilock Braking System)?", reverso: "Un sistema que evita el bloqueo de las ruedas durante una frenada brusca, modulando automáticamente la presión de frenado en cada rueda, lo que permite mantener la capacidad de dirección del vehículo mientras se frena" },
  { anverso: "¿Qué función cumple el amortiguador dentro del sistema de suspensión?", reverso: "Controlar y disipar la energía del movimiento oscilatorio generado por el muelle al absorber una irregularidad del terreno, evitando que la rueda rebote de forma descontrolada y perdiendo el contacto con el suelo" },
  { anverso: "¿Qué diferencia existe entre el muelle y el amortiguador dentro de la suspensión?", reverso: "El muelle almacena y devuelve energía elástica al comprimirse y expandirse absorbiendo una irregularidad; el amortiguador disipa esa energía en forma de calor, frenando el movimiento oscilatorio que generaría el muelle por sí solo" },
  { anverso: "¿Qué consecuencia puede tener un amortiguador desgastado sobre la seguridad del vehículo?", reverso: "Reduce el contacto continuo de la rueda con el suelo, especialmente en curvas o frenadas, lo que puede aumentar la distancia de frenado real y reducir la estabilidad del vehículo" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué diferencia existe entre los frenos de disco y los de tambor?", explicacion: "El de disco aprieta pastillas contra un disco; el de tambor expande zapatas dentro de un tambor.", dificultad: "facil", opciones: ["El de disco usa pastillas y disco; el de tambor, zapatas y tambor", "Ambos tipos de freno son técnicamente idénticos entre sí", "El freno de tambor siempre disipa mejor el calor que el de disco", "El freno de disco solo existe en el eje trasero del vehículo"], correcta: 0 },
  { enunciado: "¿Qué función cumple el sistema ABS?", explicacion: "Evita el bloqueo de las ruedas en frenadas bruscas, manteniendo la capacidad de dirección.", dificultad: "media", opciones: ["Evita el bloqueo de las ruedas en frenadas bruscas", "Aumenta la velocidad máxima alcanzable del vehículo", "Reduce el consumo de combustible del vehículo en frenadas", "Sustituye por completo la necesidad de pisar el pedal de freno"], correcta: 0 },
  { enunciado: "¿Qué función cumple el amortiguador dentro de la suspensión?", explicacion: "Controla y disipa la energía del movimiento oscilatorio generado por el muelle.", dificultad: "media", opciones: ["Controla y disipa la energía del movimiento oscilatorio del muelle", "Transforma el giro del volante en movimiento lineal de las ruedas", "Transforma la energía cinética en calor al frenar el vehículo", "Almacena energía elástica al comprimirse y expandirse el muelle"], correcta: 0 },
  { enunciado: "¿Qué diferencia existe entre el muelle y el amortiguador de la suspensión?", explicacion: "El muelle almacena energía elástica; el amortiguador la disipa como calor.", dificultad: "media", opciones: ["El muelle almacena energía elástica; el amortiguador la disipa", "Ambos elementos cumplen exactamente la misma función dentro del sistema", "El amortiguador almacena energía elástica y el muelle la disipa", "Ninguno de los dos elementos guarda relación con el sistema de suspensión"], correcta: 0 },
  { enunciado: "¿Qué consecuencia puede tener un amortiguador desgastado sobre la seguridad del vehículo?", explicacion: "Reduce el contacto continuo de la rueda con el suelo, aumentando la distancia de frenado.", dificultad: "dificil", opciones: ["Reduce el contacto de la rueda con el suelo y aumenta el frenado", "Mejora siempre la estabilidad del vehículo en curvas y frenadas", "No tiene ninguna consecuencia real sobre la seguridad del vehículo", "Reduce exclusivamente el confort, sin ninguna relación con la seguridad"], correcta: 0 },
]);

console.log(`📖 glosario...`);
await insertar("glosario", [
  { tema_slug: TEMA, seccion: S1, termino: "Cremallera de dirección", definicion: "Mecanismo que transforma el movimiento giratorio del volante en un movimiento lineal que orienta las ruedas del vehículo." },
  { tema_slug: TEMA, seccion: S1, termino: "Convergencia", definicion: "Ángulo de la geometría de dirección que mide si las ruedas de un mismo eje tienden a acercarse o alejarse entre sí por su parte delantera, vistas desde arriba." },
  { tema_slug: TEMA, seccion: S2, termino: "Índice de carga", definicion: "Código numérico del marcado del neumático que indica la carga máxima que puede soportar circulando a la velocidad correspondiente a su índice de velocidad." },
  { tema_slug: TEMA, seccion: S2, termino: "Resistencia a la rodadura", definicion: "Fuerza que se opone al avance del vehículo por el contacto del neumático con la calzada, uno de los tres parámetros que informa el etiquetado europeo de neumáticos (Reglamento UE 2020/740)." },
  { tema_slug: TEMA, seccion: S3, termino: "ABS", definicion: "Antilock Braking System: sistema que evita el bloqueo de las ruedas durante una frenada brusca, manteniendo la capacidad de dirección del vehículo." },
  { tema_slug: TEMA, seccion: S3, termino: "Zapata de freno", definicion: "Elemento del freno de tambor que se expande contra el interior del tambor para generar el rozamiento que frena la rueda." },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 10 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 10, orden: 10, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-270 creado y vinculado como Tema 10 de Oficial Conductor General.");
