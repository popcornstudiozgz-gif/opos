/**
 * Crea tema-88: "Jardinería: el riego" — Tema 18 (numero=18, bloque-2)
 * de Oficial Polivalente Instalaciones Deportivas (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 16 oficial del Anexo I (bases2110.pdf):
 *   "Jardinería: El riego, elementos, funcionamiento y mantenimiento."
 *
 * Conocimiento técnico consolidado del oficio de jardinería; no requiere
 * cita legal artículo a artículo.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-88-jardineria-riego.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-88";
const OPOSICION = "oficial-instalaciones-deportivas-ayto-zaragoza";
const BLOQUE_2_ID = "cdb0920b-a2d8-4ea8-b3fc-b80168d7361a";

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
  titulo: "Jardinería: el riego",
  descripcion: "Sistemas de riego en zonas verdes: elementos, funcionamiento y mantenimiento.",
  contenido: "Desarrolla los sistemas de riego empleados en zonas verdes de instalaciones deportivas: tipos de riego, elementos que componen una instalación de riego automático, su funcionamiento y las operaciones básicas de mantenimiento.",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "Tipos de riego y elementos de la instalación", seccion: "tipos-riego-elementos-instalacion", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Funcionamiento del riego automático", seccion: "funcionamiento-riego-automatico", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Mantenimiento de sistemas de riego", seccion: "mantenimiento-sistemas-riego", articulos: "Conceptos fundamentales" },
  ],
}]);

const S1 = "tipos-riego-elementos-instalacion";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué tipos básicos de riego se emplean en zonas verdes de instalaciones deportivas?", reverso: "Riego por aspersión (mediante aspersores que proyectan agua en forma de lluvia), riego por goteo (aplicado localmente en plantas y arbustos) y riego manual con manguera" },
  { anverso: "¿Qué es un aspersor y para qué superficies se emplea habitualmente?", reverso: "Un dispositivo que distribuye el agua en forma de lluvia sobre una superficie, habitualmente empleado en céspedes y grandes extensiones de zona verde" },
  { anverso: "¿Qué diferencia hay entre un aspersor emergente y uno fijo?", reverso: "El aspersor emergente sube desde el suelo al activarse el riego y se retrae al terminar (útil en céspedes transitables); el fijo permanece siempre visible sobre el terreno" },
  { anverso: "¿Qué es un gotero en un sistema de riego por goteo?", reverso: "Un pequeño emisor que libera agua gota a gota de forma localizada, junto a la base de una planta o arbusto, minimizando la evaporación y el desperdicio de agua" },
  { anverso: "¿Qué es una electroválvula en una instalación de riego automático?", reverso: "Una válvula accionada eléctricamente que abre o cierra el paso del agua a un sector de riego según las órdenes del programador" },
  { anverso: "¿Qué es un programador (o controlador) de riego?", reverso: "El dispositivo que gestiona automáticamente el encendido y apagado de cada sector de riego, según horarios y duraciones programadas" },
  { anverso: "¿Qué es un sector de riego?", reverso: "Cada una de las zonas independientes en las que se divide una instalación de riego, con sus propios aspersores o goteros, controlada por una electroválvula propia" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué tipos básicos de riego se emplean en zonas verdes?", explicacion: "Aspersión, goteo y riego manual.", dificultad: "facil", opciones: ["Aspersión, goteo y riego manual", "Solo riego manual con manguera", "Solo riego por aspersión", "Solo riego por goteo"], correcta: 0 },
  { enunciado: "¿Para qué superficies se emplea habitualmente el riego por aspersión?", explicacion: "Para céspedes y grandes extensiones de zona verde.", dificultad: "facil", opciones: ["Céspedes y grandes extensiones", "Únicamente macetas de interior", "Únicamente árboles aislados", "Únicamente setos perimetrales"], correcta: 0 },
  { enunciado: "¿Qué diferencia un aspersor emergente de uno fijo?", explicacion: "El emergente sube al activarse y se retrae; el fijo permanece siempre visible.", dificultad: "media", opciones: ["El emergente sube y se retrae; el fijo es siempre visible", "Son exactamente el mismo tipo de aspersor", "El fijo solo se usa en riego por goteo", "El emergente no puede usarse en césped"], correcta: 0 },
  { enunciado: "¿Qué es un gotero en riego por goteo?", explicacion: "Un pequeño emisor que libera agua localmente junto a la planta.", dificultad: "media", opciones: ["Un emisor que libera agua localmente", "Un tipo de aspersor emergente", "El programador del sistema de riego", "La electroválvula del sector"], correcta: 0 },
  { enunciado: "¿Qué función cumple una electroválvula en el riego automático?", explicacion: "Abre o cierra el paso del agua a un sector según el programador.", dificultad: "media", opciones: ["Abre o cierra el paso de agua a un sector", "Genera la presión de la red de riego", "Filtra las partículas del agua de riego", "Sustituye al programador de riego"], correcta: 0 },
  { enunciado: "¿Qué es un programador de riego?", explicacion: "El dispositivo que gestiona el encendido/apagado automático de cada sector.", dificultad: "media", opciones: ["El dispositivo que gestiona el riego automático", "Un tipo de aspersor de largo alcance", "El filtro de la red de riego", "Un gotero de alta capacidad"], correcta: 0 },
]);

const S2 = "funcionamiento-riego-automatico";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Cómo funciona básicamente un ciclo de riego automático programado?", reverso: "El programador activa, en el horario configurado, la electroválvula de cada sector de forma secuencial, manteniéndola abierta durante el tiempo programado y cerrándola al finalizar antes de pasar al siguiente sector" },
  { anverso: "¿Por qué se programa habitualmente el riego automático en horario nocturno o de primeras horas de la mañana?", reverso: "Para minimizar la evaporación del agua (menor temperatura y viento), evitar interferir con el uso diurno de las zonas verdes, y aprovechar mejor la presión de la red de agua" },
  { anverso: "¿Qué es un sensor de lluvia en un sistema de riego automático?", reverso: "Un dispositivo que detecta si ha llovido recientemente y, en tal caso, cancela automáticamente el ciclo de riego programado para evitar un riego innecesario" },
  { anverso: "¿Qué es un sensor de humedad del suelo y qué ventaja aporta a un sistema de riego?", reverso: "Un sensor que mide el nivel de humedad de la tierra, permitiendo ajustar el riego a la necesidad real de la planta y evitar tanto el riego excesivo como el insuficiente" },
  { anverso: "¿Qué es la presión de trabajo de una red de riego y por qué es importante respetarla?", reverso: "La presión con la que debe operar el sistema para que aspersores y goteros funcionen correctamente; una presión insuficiente reduce el alcance y uniformidad del riego, y una excesiva puede dañar los elementos o generar un exceso de pulverización" },
  { anverso: "¿Qué es la programación por sectores en el riego automático y qué ventaja aporta?", reverso: "Dividir la instalación en sectores independientes que riegan de forma secuencial (no simultánea), lo que permite mantener una presión adecuada en cada sector sin sobrecargar la red general" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Cómo funciona básicamente un ciclo de riego automático programado?", explicacion: "El programador activa secuencialmente cada sector según el horario configurado.", dificultad: "media", opciones: ["Activa secuencialmente cada sector según horario", "Riega todos los sectores a la vez siempre", "Funciona solo mediante activación manual", "No depende de ningún programador"], correcta: 0 },
  { enunciado: "¿Por qué se programa el riego automático en horario nocturno o de madrugada?", explicacion: "Para minimizar evaporación, no interferir con el uso diurno y aprovechar la presión.", dificultad: "media", opciones: ["Minimiza evaporación y no interfiere con el uso diurno", "Porque de noche el agua es más barata siempre", "Porque de día está prohibido regar por normativa general", "No influye el horario en el resultado del riego"], correcta: 0 },
  { enunciado: "¿Qué hace un sensor de lluvia en un sistema de riego automático?", explicacion: "Cancela el ciclo de riego programado si ha llovido recientemente.", dificultad: "media", opciones: ["Cancela el riego si ha llovido recientemente", "Aumenta la presión del sistema tras la lluvia", "Activa el riego automáticamente tras la lluvia", "Sustituye al programador de riego"], correcta: 0 },
  { enunciado: "¿Qué ventaja aporta un sensor de humedad del suelo?", explicacion: "Ajusta el riego a la necesidad real, evitando exceso o defecto.", dificultad: "media", opciones: ["Ajusta el riego a la necesidad real de la planta", "Sustituye a la electroválvula del sector", "Aumenta siempre la duración del riego", "Detecta solo la lluvia, no la humedad del suelo"], correcta: 0 },
  { enunciado: "¿Qué efecto tiene una presión de trabajo insuficiente en la red de riego?", explicacion: "Reduce el alcance y la uniformidad del riego.", dificultad: "media", opciones: ["Reduce el alcance y uniformidad del riego", "No tiene ningún efecto sobre el riego", "Aumenta el riesgo de dañar los aspersores", "Mejora la eficiencia del riego por goteo"], correcta: 0 },
  { enunciado: "¿Qué ventaja aporta la programación por sectores del riego automático?", explicacion: "Permite mantener presión adecuada sin sobrecargar la red general.", dificultad: "media", opciones: ["Mantiene presión adecuada sin sobrecargar la red", "Permite regar todos los sectores simultáneamente", "Elimina la necesidad de un programador", "Solo se usa en riego por goteo, no por aspersión"], correcta: 0 },
]);

const S3 = "mantenimiento-sistemas-riego";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué revisión periódica básica debe hacerse sobre los aspersores de una instalación de riego?", reverso: "Comprobar que emergen y se retraen correctamente, que no están obstruidos por tierra o césped, y que el ángulo y alcance de riego cubren la superficie prevista sin proyectar agua fuera de la zona verde" },
  { anverso: "¿Qué avería habitual presenta un aspersor obstruido?", reverso: "Un chorro irregular, débil o inexistente, causado por tierra, arena o residuos que bloquean la boquilla del aspersor" },
  { anverso: "¿Qué mantenimiento preventivo requieren los goteros de un sistema de riego localizado?", reverso: "Revisar periódicamente que no estén obstruidos por cal o sedimentos, sustituyendo los que hayan perdido caudal o dejado de gotear correctamente" },
  { anverso: "¿Qué revisión debe hacerse en las electroválvulas de un sistema de riego automático?", reverso: "Comprobar que abren y cierran correctamente, que no presentan fugas de agua, y que responden adecuadamente a las órdenes del programador" },
  { anverso: "¿Qué mantenimiento estacional requiere un sistema de riego antes de la llegada del invierno en climas con heladas?", reverso: "Vaciar o purgar de agua las tuberías (soplado con aire comprimido u otro método) para evitar que el agua congelada dentro de ellas las agriete o rompa por dilatación" },
  { anverso: "¿Qué debe comprobarse en el programador de riego tras un corte de suministro eléctrico?", reverso: "Que mantiene la programación configurada (o dispone de batería de respaldo) y que la hora y fecha del sistema son correctas, ya que un desajuste puede alterar los horarios de riego programados" },
  { anverso: "¿Por qué es importante ajustar el riego a las necesidades reales de cada zona verde y no aplicar un riego uniforme para toda la instalación?", reverso: "Porque distintas especies vegetales y ubicaciones (sol, sombra, tipo de suelo) tienen necesidades de agua diferentes; un riego excesivo desperdicia agua y puede dañar las plantas, y uno insuficiente perjudica su desarrollo" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué debe comprobarse periódicamente en los aspersores de una instalación de riego?", explicacion: "Que emergen, se retraen y no están obstruidos, y que el alcance es correcto.", dificultad: "media", opciones: ["Que emergen, no están obstruidos y el alcance es correcto", "Solo el color del aspersor", "Solo la marca comercial del aspersor", "No requieren ninguna revisión periódica"], correcta: 0 },
  { enunciado: "¿Qué avería presenta un aspersor obstruido?", explicacion: "Un chorro irregular, débil o inexistente.", dificultad: "facil", opciones: ["Un chorro irregular, débil o inexistente", "Un exceso de presión constante", "Un cambio de color en el agua", "Un aumento del consumo eléctrico"], correcta: 0 },
  { enunciado: "¿Qué mantenimiento requieren los goteros de un riego localizado?", explicacion: "Revisar obstrucciones por cal/sedimentos y sustituir los defectuosos.", dificultad: "media", opciones: ["Revisar obstrucciones y sustituir los defectuosos", "No requieren ningún mantenimiento periódico", "Solo pintarlos periódicamente", "Solo revisarlos una vez al año en invierno"], correcta: 0 },
  { enunciado: "¿Qué mantenimiento estacional requiere el riego antes del invierno en zonas con heladas?", explicacion: "Vaciar o purgar el agua de las tuberías para evitar roturas por congelación.", dificultad: "media", opciones: ["Vaciar o purgar las tuberías de agua", "Aumentar la presión de la red al máximo", "Sustituir todos los aspersores por nuevos", "No requiere ningún mantenimiento especial"], correcta: 0 },
  { enunciado: "¿Qué debe comprobarse en el programador tras un corte eléctrico?", explicacion: "Que mantiene la programación y que hora/fecha son correctas.", dificultad: "media", opciones: ["Que mantiene la programación y la hora es correcta", "Nada, se reinicia solo automáticamente siempre", "Solo el color de la carcasa del programador", "Solo la conexión de la electroválvula"], correcta: 0 },
  { enunciado: "¿Por qué debe ajustarse el riego a las necesidades reales de cada zona verde?", explicacion: "Porque las especies y ubicaciones tienen necesidades de agua distintas.", dificultad: "media", opciones: ["Las especies y ubicaciones tienen necesidades distintas", "Todas las plantas necesitan siempre la misma agua", "El riego uniforme siempre es más eficiente", "No influye en el desarrollo de las plantas"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 18 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 18, orden: 18, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-88 creado y vinculado como Tema 18 de Oficial Polivalente Instalaciones Deportivas.");
