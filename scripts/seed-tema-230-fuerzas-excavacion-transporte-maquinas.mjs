/**
 * Crea tema-230: "Fuerzas de excavación, centro de gravedad y transporte
 * de máquinas" — Tema 18 (numero=18, bloque-2) de Oficial Conductor,
 * Especialidad Maquinaria Pesada (Ayto. de Zaragoza).
 *
 * Corresponde al TEMA 16 oficial del Anexo I (bases2110.pdf, línea
 * 2166): "Fuerzas de excavación. Centro de gravedad. Interrelación y
 * disposición de los camiones. Carga por detrás. Transporte de
 * máquinas."
 *
 * Normativa verificada mediante WebSearch en esta sesión (transporte de
 * máquinas — autorizaciones complementarias de circulación, ya
 * introducidas en tema-219):
 * - RD 1428/2003, Reglamento General de Circulación (BOE-A-2003-23514)
 *   — autorizaciones complementarias de circulación (ACC) para
 *   vehículos del grupo 3 (maquinaria de obras y servicios).
 * - RD 2822/1998, Reglamento General de Vehículos (BOE-A-1999-1826).
 * El resto (fuerzas de excavación, centro de gravedad, disposición de
 * camiones) es conocimiento técnico consolidado del oficio.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-230-fuerzas-excavacion-transporte-maquinas.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-230";
const OPOSICION = "oficial-conductor-maquinaria-pesada-ayto-zaragoza";
const BLOQUE_2_ID = "388bfbfc-396e-4de2-8897-09532d6a0bcd";

const RD_1428_2003 = "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514";
const RD_2822_1998 = "https://www.boe.es/buscar/act.php?id=BOE-A-1999-1826";

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
  titulo: "Fuerzas de excavación, centro de gravedad y transporte de máquinas",
  descripcion: "Fuerzas de excavación y centro de gravedad de la máquina. Interrelación y disposición de los camiones durante la carga. La carga por detrás. El transporte de máquinas y las autorizaciones complementarias de circulación.",
  contenido: "Desarrolla los fundamentos físicos que condicionan la operación segura de la maquinaria pesada: las fuerzas de excavación que puede desarrollar el equipo de trabajo y su relación con la estabilidad de la máquina, y el concepto de centro de gravedad como factor determinante del riesgo de vuelco; la interrelación y disposición de los camiones durante las operaciones de carga, incluida la técnica de carga por detrás; y el transporte de la propia máquina entre obras, con sus autorizaciones complementarias de circulación conforme al Reglamento General de Circulación y al Reglamento General de Vehículos.",
  enlaces_boe: [
    { url: RD_1428_2003, titulo: "RD 1428/2003 — Reglamento General de Circulación (autorizaciones complementarias de circulación)" },
    { url: RD_2822_1998, titulo: "RD 2822/1998 — Reglamento General de Vehículos" },
  ],
  indice_estudio: [
    { url: "", titulo: "Fuerzas de excavación y centro de gravedad", seccion: "fuerzas-excavacion-centro-gravedad", articulos: "Conocimiento técnico del oficio" },
    { url: "", titulo: "Interrelación y disposición de los camiones. La carga por detrás", seccion: "interrelacion-disposicion-camiones-carga-por-detras", articulos: "Conocimiento técnico del oficio" },
    { url: RD_1428_2003, titulo: "El transporte de máquinas y las autorizaciones complementarias de circulación", seccion: "transporte-maquinas-autorizaciones-circulacion", articulos: "RD 1428/2003, RD 2822/1998" },
  ],
}]);

const S1 = "fuerzas-excavacion-centro-gravedad";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es la fuerza de excavación de una excavadora?", reverso: "La fuerza máxima que es capaz de ejercer el cazo (o, según se mida, el brazo) contra el material a excavar, determinada por la presión del sistema hidráulico y la geometría del equipo de trabajo en cada posición angular de la pluma y el brazo" },
  { anverso: "¿En qué posición del equipo de trabajo (pluma, brazo, cazo) se obtiene generalmente la máxima fuerza de excavación de una excavadora?", reverso: "En una posición intermedia, ni completamente extendida ni completamente recogida, donde la geometría de los cilindros hidráulicos permite transmitir el máximo par de fuerza al cazo; en posiciones extremas la fuerza disponible se reduce sensiblemente" },
  { anverso: "¿Qué es el centro de gravedad de una máquina de obra pública?", reverso: "El punto en el que se considera concentrado, a efectos de cálculo, el peso total de la máquina, cuya posición varía según la carga que porte el equipo de trabajo y la orientación de dicho equipo respecto al chasis" },
  { anverso: "¿Cómo influye la posición del centro de gravedad en la estabilidad de una máquina como una excavadora o una pala cargadora?", reverso: "Cuanto más se desplaza el centro de gravedad conjunto (máquina más carga) hacia el exterior de la base de apoyo (o del polígono formado por el tren de rodaje), mayor es el riesgo de vuelco; por ello se limita la carga máxima admisible según la posición y el alcance del equipo de trabajo" },
  { anverso: "¿Por qué resulta más crítica la estabilidad de una máquina cuando trabaja sobre terreno inclinado o irregular?", reverso: "Porque la inclinación del terreno desplaza adicionalmente la proyección del centro de gravedad respecto a la base de apoyo, reduciendo el margen de estabilidad disponible antes de que se produzca el vuelco, en comparación con el mismo trabajo realizado sobre terreno horizontal" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es la fuerza de excavación de una excavadora?", explicacion: "La fuerza máxima que ejerce el cazo o el brazo contra el material, según presión hidráulica y geometría.", dificultad: "media", opciones: ["La fuerza máxima que ejerce el equipo contra el material", "La velocidad máxima de desplazamiento de la máquina", "El peso total en vacío de la propia máquina", "La capacidad del depósito de combustible de la máquina"], correcta: 0 },
  { enunciado: "¿En qué posición del equipo de trabajo se obtiene generalmente la máxima fuerza de excavación?", explicacion: "En una posición intermedia, ni completamente extendida ni completamente recogida.", dificultad: "dificil", opciones: ["En una posición intermedia del equipo de trabajo", "Siempre con el equipo completamente extendido", "Siempre con el equipo completamente recogido", "La posición del equipo no influye en la fuerza disponible"], correcta: 0 },
  { enunciado: "¿Qué es el centro de gravedad de una máquina de obra pública?", explicacion: "El punto en el que se considera concentrado el peso total de la máquina.", dificultad: "media", opciones: ["El punto en el que se considera concentrado el peso total", "El punto más alto de la cabina de la máquina", "El punto de anclaje del equipo de trabajo al chasis", "El punto central del motor de la máquina"], correcta: 0 },
  { enunciado: "¿Cómo influye el desplazamiento del centro de gravedad hacia el exterior de la base de apoyo?", explicacion: "Aumenta el riesgo de vuelco de la máquina.", dificultad: "media", opciones: ["Aumenta el riesgo de vuelco de la máquina", "No influye en ningún caso en la estabilidad de la máquina", "Reduce siempre el riesgo de vuelco de la máquina", "Solo influye en el consumo de combustible de la máquina"], correcta: 0 },
  { enunciado: "¿Por qué es más crítica la estabilidad de una máquina en terreno inclinado?", explicacion: "La inclinación reduce el margen de estabilidad disponible antes del vuelco.", dificultad: "dificil", opciones: ["La inclinación reduce el margen de estabilidad disponible", "El terreno inclinado nunca afecta a la estabilidad de la máquina", "Solo afecta a la velocidad de desplazamiento de la máquina", "Solo resulta relevante en máquinas sobre neumáticos"], correcta: 0 },
]);

const S2 = "interrelacion-disposicion-camiones-carga-por-detras";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué se entiende por interrelación entre la excavadora (o pala cargadora) y los camiones de transporte durante una operación de carga?", reverso: "La coordinación necesaria entre el ciclo de trabajo de la máquina de carga y los tiempos de llegada, posicionamiento y salida de los camiones, de modo que ninguno de los dos elementos permanezca esperando innecesariamente al otro, optimizando el rendimiento conjunto" },
  { anverso: "¿Qué disposición habitual adoptan los camiones respecto a una excavadora durante la carga, cuando el espacio disponible lo permite?", reverso: "Situarse a un lado de la excavadora, dentro de su ángulo de giro cómodo (idealmente entre 60° y 90° respecto a la posición de excavación), minimizando el ángulo de giro de la torreta en cada ciclo y, por tanto, el tiempo de carga" },
  { anverso: "¿Qué es la \"carga por detrás\" en el contexto de las operaciones con pala cargadora?", reverso: "Una técnica en la que el camión se sitúa detrás de la pala cargadora en el momento de la descarga, de modo que la máquina, tras cargar el material, retrocede o gira mínimamente para verter la carga en la caja del camión situado a su espalda, reduciendo el desplazamiento necesario en cada ciclo" },
  { anverso: "¿Qué ventaja ofrece, cuando el espacio de la obra lo permite, disponer los camiones de forma que minimicen el ángulo de giro de la excavadora?", reverso: "Reduce el tiempo de cada ciclo de carga (menor recorrido angular de la torreta), aumentando la producción horaria del conjunto excavadora-camiones y reduciendo el desgaste de los componentes de giro de la máquina" },
  { anverso: "¿Qué precaución de seguridad debe respetarse en la disposición de los camiones durante una operación de carga con excavadora o pala cargadora?", reverso: "Que ningún camión permanezca situado dentro del radio de giro o de la zona muerta de la máquina de carga mientras esta se encuentra en movimiento, y que la persona conductora del camión permanezca en la cabina o en una zona segura durante la propia operación de carga" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué se entiende por interrelación entre la máquina de carga y los camiones de transporte?", explicacion: "La coordinación de tiempos entre ambos para evitar esperas innecesarias.", dificultad: "media", opciones: ["La coordinación de tiempos para evitar esperas innecesarias", "La instalación de un sistema de comunicación por radio obligatorio", "El uso exclusivo de camiones de la misma marca comercial", "La coordinación exclusiva del combustible entre ambas máquinas"], correcta: 0 },
  { enunciado: "¿Qué disposición de los camiones respecto a la excavadora reduce el tiempo de ciclo de carga?", explicacion: "Situarse dentro de un ángulo de giro cómodo (60°-90°) respecto a la posición de excavación.", dificultad: "media", opciones: ["Situarse dentro de un ángulo de giro cómodo respecto a la excavación", "Situarse siempre a 180° respecto a la posición de excavación", "La disposición de los camiones no influye en el tiempo de ciclo", "Situarse siempre a la máxima distancia posible de la excavadora"], correcta: 0 },
  { enunciado: "¿Qué es la \"carga por detrás\" en el trabajo con pala cargadora?", explicacion: "El camión se sitúa detrás de la pala, que gira mínimamente para descargar en su caja.", dificultad: "dificil", opciones: ["El camión se sitúa detrás de la pala en el momento de descargar", "El camión se sitúa siempre delante de la pala cargadora", "Una técnica exclusiva de la excavadora, no de la pala cargadora", "Un método exclusivo para la carga de materiales líquidos"], correcta: 0 },
  { enunciado: "¿Qué ventaja ofrece minimizar el ángulo de giro de la excavadora respecto a los camiones dispuestos?", explicacion: "Reduce el tiempo de ciclo y el desgaste de los componentes de giro de la máquina.", dificultad: "media", opciones: ["Reduce el tiempo de ciclo y el desgaste de los componentes de giro", "No aporta ninguna ventaja real en la operación de carga", "Solo influye en el consumo de combustible del camión", "Solo resulta relevante si se emplea un martillo hidráulico"], correcta: 0 },
  { enunciado: "¿Qué precaución de seguridad debe respetarse en la disposición de los camiones durante la carga?", explicacion: "Que ningún camión permanezca dentro del radio de giro o zona muerta de la máquina en movimiento.", dificultad: "media", opciones: ["Ningún camión debe permanecer en el radio de giro de la máquina", "Los camiones pueden situarse libremente sin ninguna restricción", "Solo es relevante de noche, no durante el día", "Solo es relevante si se trabaja con más de dos camiones"], correcta: 0 },
]);

const S3 = "transporte-maquinas-autorizaciones-circulacion";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué opciones existen para trasladar una máquina pesada (excavadora, bulldozer) entre dos obras distintas?", reverso: "Desplazarla por sus propios medios, circulando por vía pública conforme a las normas de tráfico aplicables a los vehículos especiales (si su tamaño y velocidad lo permiten y la distancia es reducida), o transportarla sobre un vehículo o remolque específico (góndola o plataforma baja) cuando la distancia, el tamaño o la normativa de tráfico así lo exijan" },
  { anverso: "¿En qué grupo de vehículos que precisan autorización complementaria de circulación (ACC) se clasifica, según el Reglamento General de Circulación, la maquinaria de obras que supera de forma permanente las masas o dimensiones máximas?", reverso: "En el grupo 3, junto a los vehículos especiales agrícolas (grupo 2) y los vehículos en régimen de transporte especial de cargas indivisibles (grupo 1); esta clasificación ya se introdujo en el tema 7 de esta oposición" },
  { anverso: "¿Qué es una plataforma baja o góndola, empleada para el transporte de maquinaria pesada?", reverso: "Un remolque o semirremolque de plataforma muy baja respecto al suelo, diseñado para facilitar la carga y el transporte por carretera de máquinas de gran peso y altura (excavadoras, bulldozers), reduciendo la altura total del conjunto transportado" },
  { anverso: "¿Qué comprobaciones debe realizar el Oficial Conductor antes de cargar la máquina sobre una góndola o plataforma para su transporte?", reverso: "Verificar que la góndola dispone de la capacidad de carga suficiente para el peso de la máquina, que las rampas de acceso están correctamente dispuestas y ancladas, y que la máquina queda debidamente calzada y sujeta con cadenas o cinchas de amarre homologadas una vez cargada" },
  { anverso: "¿Qué elementos de la máquina deben revisarse antes de un desplazamiento de la propia máquina por vía pública, distintos de los propios de su trabajo habitual?", reverso: "Las luces y catadióptricos exigibles, la señalización de vehículo lento si corresponde, la anchura y altura de la máquina respecto a los límites de su autorización, y el correcto plegado o retirada de cualquier equipo de trabajo que pueda sobresalir del gálibo autorizado" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué opciones existen para trasladar una máquina pesada entre dos obras?", explicacion: "Desplazarla por sus propios medios o transportarla sobre una plataforma o góndola específica.", dificultad: "media", opciones: ["Desplazamiento propio o transporte sobre góndola específica", "Únicamente el desplazamiento por sus propios medios", "Únicamente el transporte sobre góndola específica", "El desmontaje completo de la máquina para su traslado"], correcta: 0 },
  { enunciado: "¿En qué grupo de vehículos que precisan autorización complementaria se clasifica la maquinaria de obras?", explicacion: "En el grupo 3, junto a vehículos especiales agrícolas y transporte especial de cargas.", dificultad: "media", opciones: ["Grupo 3, vehículos especiales de obras y servicios", "Grupo 1, transporte especial de cargas indivisibles", "Grupo 2, vehículos especiales agrícolas exclusivamente", "No existe ninguna clasificación por grupos en esta materia"], correcta: 0 },
  { enunciado: "¿Qué es una plataforma baja o góndola?", explicacion: "Un remolque de plataforma muy baja diseñado para el transporte de máquinas de gran peso y altura.", dificultad: "facil", opciones: ["Un remolque de plataforma muy baja para máquinas de gran altura", "Un tipo de excavadora de gran tamaño", "Un accesorio acoplable al brazo de una excavadora", "Un tipo de compactador de rodillo vibratorio"], correcta: 0 },
  { enunciado: "¿Qué debe comprobarse antes de cargar una máquina sobre una góndola para su transporte?", explicacion: "La capacidad de carga, las rampas de acceso y la sujeción con cadenas o cinchas homologadas.", dificultad: "media", opciones: ["Capacidad de carga, rampas de acceso y sujeción homologada", "Únicamente el color de la propia góndola de transporte", "Ninguna comprobación adicional distinta de un desplazamiento propio", "Únicamente la marca comercial de la góndola empleada"], correcta: 0 },
  { enunciado: "¿Qué debe revisarse antes de un desplazamiento de la propia máquina por vía pública?", explicacion: "Luces, señalización de vehículo lento y que la anchura y altura respeten la autorización.", dificultad: "dificil", opciones: ["Luces, señalización y respeto de anchura y altura autorizadas", "Únicamente el nivel de combustible disponible en la máquina", "Ninguna revisión adicional distinta del trabajo habitual en obra", "Únicamente la presión de los neumáticos de la máquina"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 18 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 18, orden: 18, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-230 creado y vinculado como Tema 18 de Oficial Conductor Maquinaria Pesada.");
