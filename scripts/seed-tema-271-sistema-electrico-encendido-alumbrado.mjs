/**
 * Crea tema-271: "Sistema eléctrico y encendido de los vehículos a motor.
 * El alumbrado" — Tema 11 (numero=11, bloque-2) de Oficial Conductor,
 * Especialidad General (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 9 oficial del Anexo I (bases2110.pdf, línea 1578):
 *   "Sistema eléctrico y encendido de los vehículos a motor. El
 *   alumbrado"
 *
 * Sourcing: conocimiento técnico consolidado sin ley única que lo regule
 * como tal (mismo criterio ya aplicado en los temas 267-270 de esta
 * misma oposición). Única excepción real y verificada: el Reglamento
 * General de Vehículos (RD 2822/1998, ya citado en tema-270) y su Anexo
 * XI regulan el marcado y las condiciones técnicas de las luces y
 * dispositivos de alumbrado y señalización óptica exigibles, citado en
 * la sección de alumbrado.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-271-sistema-electrico-encendido-alumbrado.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-271";
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
  titulo: "Sistema eléctrico, encendido y alumbrado del vehículo",
  descripcion: "Batería, alternador y motor de arranque. Sistema de encendido en motores de gasolina. Tipos de luces del vehículo y su uso correcto según el Reglamento General de Vehículos.",
  contenido: "Desarrolla, desde la perspectiva de un conductor profesional, los elementos básicos del sistema eléctrico del vehículo (batería, alternador, motor de arranque), el sistema de encendido propio de los motores de gasolina, y los distintos tipos de luces y dispositivos de alumbrado del vehículo, su función y las condiciones de uso exigidas por la normativa de vehículos.",
  enlaces_boe: [
    { url: "https://www.boe.es/buscar/doc.php?id=BOE-A-1999-1826", titulo: "Real Decreto 2822/1998 (Reglamento General de Vehículos, Anexo XI: señales en los vehículos)" },
  ],
  indice_estudio: [
    { url: "", titulo: "Sistema eléctrico del vehículo", seccion: "sistema-electrico-del-vehiculo", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Sistema de encendido", seccion: "sistema-de-encendido", articulos: "Conceptos fundamentales" },
    { url: "https://www.boe.es/buscar/doc.php?id=BOE-A-1999-1826", titulo: "El alumbrado del vehículo", seccion: "el-alumbrado-del-vehiculo", articulos: "RD 2822/1998, Anexo XI" },
  ],
}]);

const S1 = "sistema-electrico-del-vehiculo";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué función cumple la batería de un vehículo?", reverso: "Almacenar energía eléctrica y suministrarla al motor de arranque para poner en marcha el motor, además de alimentar los circuitos eléctricos del vehículo cuando el motor está parado o girando a bajas revoluciones" },
  { anverso: "¿Qué función cumple el alternador?", reverso: "Generar corriente eléctrica mientras el motor está en marcha, tanto para alimentar los circuitos eléctricos del vehículo en funcionamiento como para recargar la batería, sustituyendo la energía consumida en el arranque" },
  { anverso: "¿Qué función cumple el motor de arranque?", reverso: "Un motor eléctrico que, alimentado por la batería, hace girar el motor de combustión al accionar la llave o el botón de arranque, hasta que este alcanza el régimen de revoluciones suficiente para funcionar por sí mismo" },
  { anverso: "¿Qué puede indicar que un vehículo no arranque pero las luces y otros elementos eléctricos sí funcionen con normalidad?", reverso: "Un posible problema localizado en el propio motor de arranque, en su conexión, o en el sistema de encendido, más que en la batería, dado que esta parece tener carga suficiente para alimentar el resto de circuitos eléctricos" },
  { anverso: "¿Qué relación existe entre el alternador y la batería durante un trayecto largo del vehículo?", reverso: "El alternador recarga progresivamente la batería mientras el motor está en marcha, de modo que, salvo avería, la batería debería mantener o recuperar su nivel de carga a lo largo de un trayecto suficientemente largo" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué función cumple la batería de un vehículo?", explicacion: "Almacenar energía eléctrica y alimentar el motor de arranque y los circuitos del vehículo.", dificultad: "facil", opciones: ["Almacenar energía eléctrica y alimentar el motor de arranque", "Transformar el giro del volante en movimiento lineal de las ruedas", "Absorber las irregularidades del terreno durante la marcha", "Transformar la energía cinética en calor al frenar el vehículo"], correcta: 0 },
  { enunciado: "¿Qué función cumple el alternador?", explicacion: "Generar corriente con el motor en marcha y recargar la batería.", dificultad: "media", opciones: ["Generar corriente con el motor en marcha y recargar la batería", "Almacenar energía eléctrica cuando el motor está completamente parado", "Absorber las irregularidades del terreno durante la marcha del vehículo", "Orientar las ruedas delanteras para controlar la trayectoria"], correcta: 0 },
  { enunciado: "¿Qué función cumple el motor de arranque?", explicacion: "Un motor eléctrico que hace girar el motor de combustión hasta que arranca por sí mismo.", dificultad: "media", opciones: ["Hacer girar el motor de combustión hasta que arranca por sí mismo", "Generar la corriente eléctrica necesaria una vez el motor ya arrancó", "Absorber las irregularidades del terreno durante la marcha", "Transformar la energía cinética en calor al frenar el vehículo"], correcta: 0 },
  { enunciado: "¿Qué puede indicar que el vehículo no arranque pero las luces funcionen con normalidad?", explicacion: "Un problema en el motor de arranque o el encendido, más que en la batería.", dificultad: "media", opciones: ["Un problema en el motor de arranque o en el sistema de encendido", "Que la batería está completamente descargada y sin ninguna carga", "Que el alternador está generando corriente de forma excesiva", "Que el sistema de frenos del vehículo presenta una avería grave"], correcta: 0 },
  { enunciado: "¿Qué relación existe entre alternador y batería durante un trayecto largo?", explicacion: "El alternador recarga progresivamente la batería mientras el motor está en marcha.", dificultad: "dificil", opciones: ["El alternador recarga progresivamente la batería durante el trayecto", "La batería se descarga siempre de forma progresiva durante el trayecto", "El alternador y la batería no guardan ninguna relación real entre sí", "La batería recarga al alternador mientras el motor está en marcha"], correcta: 0 },
]);

const S2 = "sistema-de-encendido";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es la bujía y en qué tipo de motor se utiliza?", reverso: "Un elemento situado en la culata, propio de los motores de gasolina, que produce una chispa eléctrica de alta tensión para provocar el encendido de la mezcla aire-combustible comprimida en el cilindro" },
  { anverso: "¿Qué es la bobina de encendido?", reverso: "Un componente del sistema de encendido de gasolina que transforma la tensión relativamente baja de la batería en la alta tensión necesaria para que la bujía pueda generar la chispa eléctrica" },
  { anverso: "¿Por qué el motor diésel no necesita bujías de encendido como las del motor de gasolina?", reverso: "Porque el diésel se autoinflama por la elevada temperatura alcanzada al comprimir el aire, sin necesidad de una chispa eléctrica externa; en su lugar puede llevar bujías de precalentamiento, que solo facilitan el arranque en frío" },
  { anverso: "¿Qué es una bujía de precalentamiento (o calentador) en un motor diésel?", reverso: "Un elemento que calienta previamente la cámara de combustión antes o durante el arranque en frío, facilitando que el motor diésel alcance con mayor rapidez la temperatura necesaria para la autoinflación, especialmente en condiciones de bajas temperaturas" },
  { anverso: "¿Qué síntoma es característico de una bujía de gasolina en mal estado?", reverso: "Un funcionamiento irregular del motor, especialmente al ralentí (fallos o tirones), un mayor consumo de combustible y, en ocasiones, dificultad de arranque, al no producirse correctamente la chispa en uno o varios cilindros" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es la bujía y en qué tipo de motor se utiliza?", explicacion: "Un elemento propio del motor de gasolina que produce la chispa de encendido.", dificultad: "facil", opciones: ["Un elemento del motor de gasolina que produce la chispa de encendido", "Un elemento exclusivo del motor diésel que produce la chispa de encendido", "Un elemento común a cualquier tipo de motor, sin excepción de ningún tipo", "Un elemento exclusivo de los vehículos eléctricos sin motor de combustión"], correcta: 0 },
  { enunciado: "¿Qué función cumple la bobina de encendido?", explicacion: "Transforma la tensión de la batería en la alta tensión necesaria para la chispa.", dificultad: "media", opciones: ["Transforma la tensión de la batería en la alta tensión necesaria", "Almacena energía eléctrica para alimentar el motor de arranque", "Genera corriente eléctrica mientras el motor está en marcha", "Absorbe las irregularidades del terreno durante la marcha"], correcta: 0 },
  { enunciado: "¿Por qué el motor diésel no necesita bujías de encendido como el de gasolina?", explicacion: "Porque se autoinflama por la temperatura de compresión, sin chispa eléctrica.", dificultad: "media", opciones: ["Porque se autoinflama por la temperatura alcanzada en la compresión", "Porque el motor diésel no requiere ningún tipo de encendido en absoluto", "Porque el motor diésel utiliza exactamente el mismo sistema que el de gasolina", "Porque el motor diésel siempre funciona sin ningún tipo de combustión interna"], correcta: 0 },
  { enunciado: "¿Qué es una bujía de precalentamiento en un motor diésel?", explicacion: "Facilita el arranque en frío calentando previamente la cámara de combustión.", dificultad: "media", opciones: ["Un elemento que facilita el arranque en frío del motor diésel", "Un elemento exclusivo del sistema de encendido del motor de gasolina", "Un elemento que sustituye por completo a la batería del vehículo", "Un elemento que genera la chispa de encendido en el motor diésel"], correcta: 0 },
  { enunciado: "¿Qué síntoma es característico de una bujía de gasolina en mal estado?", explicacion: "Funcionamiento irregular al ralentí, mayor consumo y dificultad de arranque.", dificultad: "dificil", opciones: ["Funcionamiento irregular al ralentí y mayor consumo de combustible", "Un funcionamiento siempre más suave y regular del motor de gasolina", "Una reducción del consumo de combustible del vehículo de gasolina", "Ninguna consecuencia real sobre el funcionamiento del motor de gasolina"], correcta: 0 },
]);

const S3 = "el-alumbrado-del-vehiculo";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué luces obligatorias debe llevar un vehículo según el Reglamento General de Vehículos?", reverso: "Entre otras, luces de cruce y de carretera, luces de posición delanteras y traseras, luces de freno, intermitentes, luz de matrícula y, según el tipo de vehículo, luz antiniebla trasera y luz de marcha atrás" },
  { anverso: "¿Cuándo debe utilizarse la luz antiniebla trasera de un vehículo?", reverso: "Únicamente en condiciones de escasa visibilidad (niebla intensa, nieve, lluvia fuerte, humo), no de forma habitual con buena visibilidad, dado que su intensidad puede deslumbrar y confundir a los conductores que circulan detrás" },
  { anverso: "¿Qué diferencia existe entre las luces de cruce y las luces de carretera?", reverso: "Las luces de cruce iluminan una distancia menor sin deslumbrar a los vehículos que circulan en sentido contrario, siendo obligatorias de noche en general; las luces de carretera iluminan a mayor distancia y solo deben usarse cuando no haya riesgo de deslumbrar a otros conductores" },
  { anverso: "¿Qué son los intermitentes y cuándo deben utilizarse?", reverso: "Luces que indican un cambio de dirección o de carril inminente, que deben activarse con la antelación suficiente antes de realizar la maniobra para advertir a los demás usuarios de la vía" },
  { anverso: "¿Qué debería hacer el Oficial si detecta que una luz de freno del vehículo no funciona correctamente?", reverso: "Comunicar la incidencia para su reparación antes de continuar utilizando el vehículo con normalidad, dado que una luz de freno defectuosa reduce la advertencia a los vehículos que circulan detrás durante una frenada" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué luces obligatorias debe llevar un vehículo según el Reglamento General de Vehículos?", explicacion: "Luces de cruce/carretera, posición, freno, intermitentes, matrícula, entre otras.", dificultad: "facil", opciones: ["Luces de cruce, posición, freno, intermitentes y matrícula, entre otras", "Únicamente las luces de posición delanteras del vehículo", "Únicamente las luces de freno traseras del vehículo", "Ninguna luz es obligatoria según la normativa española de vehículos"], correcta: 0 },
  { enunciado: "¿Cuándo debe utilizarse la luz antiniebla trasera de un vehículo?", explicacion: "Solo en condiciones de escasa visibilidad, no de forma habitual.", dificultad: "media", opciones: ["Únicamente en condiciones de escasa visibilidad", "De forma habitual en cualquier condición de circulación nocturna", "Únicamente durante el día con buena visibilidad general", "Nunca, al no existir esta luz en los vehículos actuales"], correcta: 0 },
  { enunciado: "¿Qué diferencia existe entre las luces de cruce y las de carretera?", explicacion: "Las de cruce no deslumbran en sentido contrario; las de carretera iluminan más pero pueden deslumbrar.", dificultad: "media", opciones: ["Las de cruce no deslumbran; las de carretera iluminan más distancia", "Ambos tipos de luz cumplen exactamente la misma función del vehículo", "Las de carretera son obligatorias siempre de noche, nunca las de cruce", "Las luces de cruce solo existen en vehículos eléctricos, no en los demás"], correcta: 0 },
  { enunciado: "¿Cuándo deben activarse los intermitentes del vehículo?", explicacion: "Con antelación suficiente antes de un cambio de dirección o de carril.", dificultad: "media", opciones: ["Con antelación suficiente antes de un cambio de dirección o carril", "Únicamente después de haber completado ya la maniobra realizada", "Nunca, al no ser obligatorio advertir un cambio de dirección o carril", "Únicamente en vías interurbanas, nunca en el núcleo urbano"], correcta: 0 },
  { enunciado: "¿Qué debería hacer el Oficial si detecta que una luz de freno no funciona correctamente?", explicacion: "Comunicar la incidencia para su reparación antes de continuar utilizando el vehículo.", dificultad: "dificil", opciones: ["Comunicar la incidencia para su reparación antes de continuar", "Continuar utilizando el vehículo con normalidad sin comunicar nada", "Sustituir él mismo la bombilla sin comunicar la incidencia detectada", "Circular únicamente de día hasta que se repare esa luz de freno"], correcta: 0 },
]);

console.log(`📖 glosario...`);
await insertar("glosario", [
  { tema_slug: TEMA, seccion: S1, termino: "Alternador", definicion: "Generador eléctrico que produce corriente mientras el motor está en marcha, alimentando los circuitos del vehículo y recargando la batería." },
  { tema_slug: TEMA, seccion: S1, termino: "Motor de arranque", definicion: "Motor eléctrico alimentado por la batería que hace girar el motor de combustión hasta que este arranca y funciona por sí mismo." },
  { tema_slug: TEMA, seccion: S2, termino: "Bujía de precalentamiento", definicion: "Elemento que calienta previamente la cámara de combustión de un motor diésel, facilitando el arranque en frío." },
  { tema_slug: TEMA, seccion: S2, termino: "Bobina de encendido", definicion: "Componente del motor de gasolina que transforma la tensión de la batería en la alta tensión necesaria para que la bujía genere la chispa." },
  { tema_slug: TEMA, seccion: S3, termino: "Luz de cruce", definicion: "Luz delantera que ilumina una distancia menor sin deslumbrar a los vehículos que circulan en sentido contrario; obligatoria de noche con carácter general." },
  { tema_slug: TEMA, seccion: S3, termino: "Luz antiniebla trasera", definicion: "Luz de mayor intensidad reservada a condiciones de escasa visibilidad, que no debe usarse de forma habitual por su riesgo de deslumbrar a los vehículos que circulan detrás." },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 11 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 11, orden: 11, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-271 creado y vinculado como Tema 11 de Oficial Conductor General.");
