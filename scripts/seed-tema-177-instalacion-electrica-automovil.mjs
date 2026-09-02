/**
 * Crea tema-177: "Instalación eléctrica del automóvil" — Tema 13
 * (numero=13, bloque-2) de Oficial Mecánico.
 *
 * Corresponde al TEMA 11 oficial: "Instalación eléctrica del
 * automóvil."
 *
 * Conocimiento técnico consolidado de mecánica del automóvil, sin una
 * ley española que lo regule como tal.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-177-instalacion-electrica-automovil.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-177";
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
  titulo: "Instalación eléctrica del automóvil",
  descripcion: "La batería, el sistema de arranque y el sistema de carga del automóvil; los circuitos eléctricos de luces y señalización; la electrónica embarcada, sensores y actuadores.",
  contenido: "Desarrolla la instalación eléctrica del automóvil: la batería y los sistemas de arranque y carga (motor de arranque, alternador), los circuitos eléctricos de luces y señalización del vehículo, y una introducción a la electrónica embarcada moderna, con sus principales sensores y actuadores gestionados por las distintas centralitas del vehículo.",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "Batería, arranque y carga", seccion: "bateria-arranque-carga", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Circuitos eléctricos de luces y señalización", seccion: "circuitos-electricos-luces-senalizacion", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Electrónica embarcada: sensores y actuadores", seccion: "electronica-embarcada-sensores-actuadores", articulos: "Conceptos fundamentales" },
  ],
}]);

const S1 = "bateria-arranque-carga";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Cuál es la función de la batería del automóvil?", reverso: "Almacenar energía eléctrica y suministrarla al motor de arranque para poner en marcha el motor, además de alimentar los sistemas eléctricos del vehículo cuando el motor está parado o el alternador no genera suficiente carga" },
  { anverso: "¿Qué es el motor de arranque (motor de arranque eléctrico)?", reverso: "Un motor eléctrico alimentado por la batería que hace girar el cigüeñal del motor térmico a través de una corona dentada, con la fuerza suficiente para iniciar el ciclo de combustión" },
  { anverso: "¿Qué es el alternador?", reverso: "Un generador eléctrico, accionado por el motor mediante una correa, que produce corriente alterna (rectificada a continua internamente) para recargar la batería y alimentar el sistema eléctrico del vehículo mientras el motor está en marcha" },
  { anverso: "¿Qué es el regulador de tensión del alternador?", reverso: "El elemento que controla la tensión de salida del alternador, manteniéndola dentro de un rango adecuado (en torno a 14 V en un sistema de 12 V) para proteger la batería y el resto de componentes eléctricos del vehículo" },
  { anverso: "¿Qué es el bendix (o piñón de arranque)?", reverso: "El mecanismo del motor de arranque que engrana la corona dentada del volante motor solo durante el arranque, desengranándose automáticamente una vez el motor arranca, para evitar dañar el motor de arranque" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Cuál es la función principal de la batería del automóvil?", explicacion: "Almacenar energía eléctrica y suministrarla al motor de arranque y a los sistemas eléctricos.", dificultad: "facil", opciones: ["Almacenar y suministrar energía eléctrica al vehículo", "Impulsar el combustible a presión hacia los inyectores", "Evacuar el calor generado por la combustión del motor", "Regular la apertura y cierre de las válvulas del motor"], correcta: 0 },
  { enunciado: "¿Qué función cumple el motor de arranque?", explicacion: "Hace girar el cigüeñal del motor térmico con fuerza suficiente para iniciar la combustión.", dificultad: "media", opciones: ["Hace girar el cigüeñal para iniciar la combustión del motor", "Recarga la batería mientras el motor está en marcha", "Filtra las impurezas presentes en el combustible del motor", "Regula la tensión de salida del sistema eléctrico"], correcta: 0 },
  { enunciado: "¿Qué función cumple el alternador?", explicacion: "Genera corriente para recargar la batería y alimentar el sistema eléctrico con el motor en marcha.", dificultad: "media", opciones: ["Genera corriente para recargar la batería en marcha", "Hace girar el cigüeñal para iniciar la combustión del motor", "Impulsa el combustible a presión hacia los inyectores", "Filtra las impurezas presentes en el aceite del motor"], correcta: 0 },
  { enunciado: "¿Qué función cumple el regulador de tensión del alternador?", explicacion: "Mantiene la tensión de salida del alternador dentro de un rango adecuado para proteger los componentes eléctricos.", dificultad: "media", opciones: ["Mantiene la tensión de salida en un rango adecuado", "Genera directamente la energía eléctrica del vehículo", "Filtra las impurezas presentes en el combustible del motor", "Regula la temperatura del líquido refrigerante del motor"], correcta: 0 },
  { enunciado: "¿Qué es el bendix del motor de arranque?", explicacion: "El mecanismo que engrana la corona dentada del volante motor solo durante el arranque.", dificultad: "dificil", opciones: ["El mecanismo que engrana la corona dentada durante el arranque", "El elemento que almacena la energía eléctrica del vehículo", "El elemento que regula la tensión de salida del alternador", "El elemento que filtra las impurezas del combustible del motor"], correcta: 0 },
]);

const S2 = "circuitos-electricos-luces-senalizacion";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué son las luces de cruce (o cortas) de un vehículo?", reverso: "Las luces delanteras diseñadas para iluminar la calzada sin deslumbrar a los conductores que circulan en sentido contrario, de uso obligatorio en circulación nocturna o con visibilidad reducida" },
  { anverso: "¿Qué son los intermitentes o luces de posición direccional?", reverso: "Luces de destello, delanteras y traseras (y en muchos vehículos también laterales), que indican la intención del conductor de cambiar de dirección o de carril" },
  { anverso: "¿Qué es un fusible, en el circuito eléctrico del automóvil?", reverso: "Un elemento de protección que interrumpe el paso de corriente cuando esta supera un valor determinado, protegiendo así el circuito y los componentes eléctricos frente a sobrecargas o cortocircuitos" },
  { anverso: "¿Qué es un relé, en el circuito eléctrico del automóvil?", reverso: "Un interruptor accionado eléctricamente que permite controlar un circuito de alta corriente (como el de los faros o el motor de arranque) mediante una señal de baja corriente, protegiendo así el resto del cableado" },
  { anverso: "¿Qué es el sistema CAN-Bus (Controller Area Network), presente en los vehículos modernos?", reverso: "Un protocolo de comunicación en red que permite que las distintas centralitas electrónicas del vehículo (motor, ABS, airbag, climatización, etc.) se comuniquen entre sí mediante un cableado reducido, en lugar de un cable dedicado para cada señal" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué función cumplen las luces de cruce de un vehículo?", explicacion: "Iluminan la calzada sin deslumbrar a los vehículos que circulan en sentido contrario.", dificultad: "facil", opciones: ["Iluminan la calzada sin deslumbrar al tráfico en sentido contrario", "Indican la intención de cambiar de dirección del vehículo", "Protegen el circuito eléctrico frente a sobrecargas", "Comunican entre sí las centralitas electrónicas del vehículo"], correcta: 0 },
  { enunciado: "¿Qué función cumplen los intermitentes de un vehículo?", explicacion: "Indican la intención del conductor de cambiar de dirección o de carril.", dificultad: "facil", opciones: ["Indican la intención de cambiar de dirección o de carril", "Iluminan la calzada durante la circulación nocturna", "Protegen el circuito eléctrico frente a sobrecargas", "Almacenan la energía eléctrica del sistema del vehículo"], correcta: 0 },
  { enunciado: "¿Qué función cumple un fusible en el circuito eléctrico del vehículo?", explicacion: "Interrumpe el paso de corriente ante una sobrecarga, protegiendo el circuito.", dificultad: "media", opciones: ["Interrumpe el paso de corriente ante una sobrecarga", "Genera la energía eléctrica del sistema del vehículo", "Ilumina la calzada durante la circulación nocturna", "Comunica entre sí las centralitas electrónicas del vehículo"], correcta: 0 },
  { enunciado: "¿Qué función cumple un relé en el circuito eléctrico del vehículo?", explicacion: "Permite controlar un circuito de alta corriente mediante una señal de baja corriente.", dificultad: "media", opciones: ["Permite controlar un circuito de alta corriente con baja corriente", "Almacena la energía eléctrica del sistema del vehículo", "Ilumina directamente la calzada del vehículo", "Filtra las impurezas presentes en el combustible del motor"], correcta: 0 },
  { enunciado: "¿Qué ventaja aporta el sistema CAN-Bus frente al cableado tradicional dedicado?", explicacion: "Permite la comunicación de múltiples centralitas con un cableado reducido, en lugar de un cable por cada señal.", dificultad: "dificil", opciones: ["Permite comunicación de centralitas con un cableado reducido", "No aporta ninguna ventaja real frente al cableado tradicional", "Elimina por completo la necesidad de batería en el vehículo", "Solo se emplea en el sistema de frenos del vehículo"], correcta: 0 },
]);

const S3 = "electronica-embarcada-sensores-actuadores";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un sensor, en el contexto de la electrónica embarcada del automóvil?", reverso: "Un dispositivo que capta una magnitud física (temperatura, presión, posición, velocidad) y la convierte en una señal eléctrica que puede ser interpretada por una centralita electrónica" },
  { anverso: "¿Qué es un actuador, en el contexto de la electrónica embarcada del automóvil?", reverso: "Un dispositivo que recibe una orden eléctrica de la centralita y la transforma en una acción física (por ejemplo, abrir un inyector, mover una válvula de mariposa, activar un electroventilador)" },
  { anverso: "¿Qué es la centralita electrónica de gestión del motor (ECU)?", reverso: "El elemento que recibe las señales de múltiples sensores del motor y calcula, en tiempo real, las órdenes que envía a los distintos actuadores para optimizar el funcionamiento del motor" },
  { anverso: "¿Qué es el conector OBD (On Board Diagnostics)?", reverso: "Un conector normalizado, presente en todos los vehículos modernos, que permite conectar un equipo de diagnóstico electrónico para leer los códigos de avería almacenados y otros parámetros de funcionamiento del vehículo" },
  { anverso: "¿Qué es un código de avería (o código DTC, Diagnostic Trouble Code)?", reverso: "Un código alfanumérico normalizado que la centralita almacena cuando detecta un funcionamiento anómalo en algún sistema del vehículo, y que puede leerse mediante un equipo de diagnóstico conectado al conector OBD" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es un sensor en el contexto de la electrónica embarcada del automóvil?", explicacion: "Un dispositivo que capta una magnitud física y la convierte en una señal eléctrica interpretable.", dificultad: "media", opciones: ["Un dispositivo que capta una magnitud física y la convierte en señal", "Un dispositivo que ejecuta directamente una acción mecánica", "Un dispositivo que almacena la energía eléctrica del vehículo", "Un dispositivo que ilumina la calzada durante la conducción"], correcta: 0 },
  { enunciado: "¿Qué es un actuador en el contexto de la electrónica embarcada del automóvil?", explicacion: "Un dispositivo que transforma una orden eléctrica de la centralita en una acción física.", dificultad: "media", opciones: ["Un dispositivo que transforma una orden eléctrica en acción física", "Un dispositivo que capta una magnitud física del entorno", "Un dispositivo que almacena la energía eléctrica del vehículo", "Un dispositivo exclusivo del sistema de frenos del vehículo"], correcta: 0 },
  { enunciado: "¿Qué función cumple la centralita electrónica de gestión del motor (ECU)?", explicacion: "Recibe señales de sensores y calcula las órdenes que envía a los actuadores.", dificultad: "media", opciones: ["Recibe señales de sensores y calcula órdenes para los actuadores", "Almacena la energía eléctrica que consume el vehículo", "Ilumina la calzada durante la circulación nocturna", "Filtra las impurezas presentes en el combustible del motor"], correcta: 0 },
  { enunciado: "¿Para qué sirve el conector OBD de un vehículo moderno?", explicacion: "Permite conectar un equipo de diagnóstico para leer códigos de avería y parámetros de funcionamiento.", dificultad: "facil", opciones: ["Permite conectar un equipo para leer códigos de avería", "Sirve exclusivamente para cargar la batería del vehículo", "Sirve exclusivamente para conectar el sistema de audio", "Sirve exclusivamente para regular la presión de neumáticos"], correcta: 0 },
  { enunciado: "¿Qué es un código de avería (DTC)?", explicacion: "Un código alfanumérico normalizado almacenado por la centralita ante un funcionamiento anómalo detectado.", dificultad: "media", opciones: ["Un código normalizado almacenado ante un funcionamiento anómalo", "Un código exclusivo del sistema de climatización del vehículo", "Un código que identifica el color de la carrocería del vehículo", "Un código que identifica exclusivamente el modelo del vehículo"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 13 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 13, orden: 13, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-177 creado y vinculado como Tema 13 de Oficial Mecánico.");
