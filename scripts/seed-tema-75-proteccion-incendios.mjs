/**
 * Crea tema-75: "Protección de incendios y evacuación" — Tema 21
 * (numero=21, bloque-2) de Oficial Mantenimiento General (Ayto.
 * Zaragoza).
 *
 * Corresponde al TEMA 19 oficial del Anexo I (bases2110.pdf):
 *   "Protección de incendios. El fuego. Señalización, medios de
 *   extinción y actuación personal en caso de incendio y evacuación de
 *   edificios."
 *
 * Fuentes primarias: Real Decreto 513/2017, de 22 de mayo, por el que se
 * aprueba el Reglamento de instalaciones de protección contra incendios
 * (RIPCI, BOE-A-2017-6606) y Real Decreto 485/1997, de 14 de abril, sobre
 * señalización de seguridad y salud en el trabajo (BOE-A-1997-8668, ya
 * verificado y usado en scripts/seed-tema-58-seguridad-amianto-
 * senalizacion.mjs de Oficial Albañil). Ambos identificadores verificados
 * en este turno mediante búsqueda y confirmación del título real de la
 * norma. Los conceptos de teoría del fuego (triángulo/tetraedro del
 * fuego, clases de fuego) son conocimiento técnico consolidado de
 * seguridad contra incendios, sin cita legal artículo a artículo.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-75-proteccion-incendios.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-75";
const OPOSICION = "oficial-mantenimiento-ayto-zaragoza";
const BLOQUE_2_ID = "336de420-fb74-4814-9d50-6e2981ed064f";
const RD_513_2017 = "https://www.boe.es/buscar/act.php?id=BOE-A-2017-6606";
const RD_485_1997 = "https://www.boe.es/buscar/act.php?id=BOE-A-1997-8668";

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
  titulo: "Protección de incendios y evacuación",
  descripcion: "El fuego: triángulo del fuego y clases de fuego. Señalización y medios de extinción según el RIPCI y el RD 485/1997. Actuación personal en caso de incendio y evacuación de edificios.",
  contenido: "Desarrolla los conceptos básicos de la teoría del fuego (triángulo/tetraedro del fuego, clases de fuego), la señalización de seguridad y los medios de extinción según el Reglamento de instalaciones de protección contra incendios (RD 513/2017) y el RD 485/1997 de señalización de seguridad y salud en el trabajo, y las pautas de actuación personal ante un incendio y de evacuación de edificios.",
  enlaces_boe: [
    { url: RD_513_2017, titulo: "RD 513/2017 — Reglamento de instalaciones de protección contra incendios (RIPCI)" },
    { url: RD_485_1997, titulo: "RD 485/1997 — Señalización de seguridad y salud en el trabajo" },
  ],
  indice_estudio: [
    { url: "", titulo: "El fuego: triángulo del fuego y clases de fuego", seccion: "el-fuego-triangulo-clases-fuego", articulos: "Conceptos fundamentales" },
    { url: RD_513_2017, titulo: "Señalización y medios de extinción de incendios", seccion: "senalizacion-medios-extincion-incendios", articulos: "RD 513/2017 (RIPCI) y RD 485/1997" },
    { url: "", titulo: "Actuación personal en caso de incendio y evacuación", seccion: "actuacion-evacuacion-caso-incendio", articulos: "Conceptos fundamentales" },
  ],
}]);

const S1 = "el-fuego-triangulo-clases-fuego";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es el triángulo del fuego?", reverso: "El modelo que representa los tres elementos necesarios para que se produzca combustión: combustible, comburente (oxígeno) y calor (energía de activación)" },
  { anverso: "¿Qué añade el 'tetraedro del fuego' al triángulo clásico?", reverso: "Un cuarto elemento, la reacción en cadena, que explica cómo el fuego se automantiene una vez iniciado; eliminar cualquiera de los cuatro elementos apaga el incendio" },
  { anverso: "¿Qué es el combustible en el triángulo del fuego?", reverso: "La sustancia capaz de arder (madera, papel, tejidos, líquidos inflamables, gases, metales, entre otros), que aporta el material que se oxida en la combustión" },
  { anverso: "¿Qué es el comburente en el triángulo del fuego?", reverso: "El elemento que permite y sostiene la combustión, habitualmente el oxígeno del aire" },
  { anverso: "¿Qué es la energía de activación en el proceso de combustión?", reverso: "La cantidad mínima de calor necesaria para iniciar la reacción de combustión entre el combustible y el comburente" },
  { anverso: "¿Qué es un fuego de clase A?", reverso: "El que se produce en materiales sólidos comunes (madera, papel, tejidos, plásticos) que dejan brasas o residuos tras la combustión" },
  { anverso: "¿Qué es un fuego de clase B?", reverso: "El que se produce en líquidos o sólidos licuables inflamables (gasolina, disolventes, aceites, ceras)" },
  { anverso: "¿Qué es un fuego de clase C?", reverso: "El que se produce en gases inflamables (butano, propano, gas natural)" },
  { anverso: "¿Qué es un fuego de clase D?", reverso: "El que se produce en metales combustibles (magnesio, sodio, aluminio en polvo), que requieren agentes extintores específicos" },
  { anverso: "¿Qué es un fuego de clase F (antes clase K)?", reverso: "El que se produce en aceites y grasas de cocina, característico de cocinas industriales, que requiere agentes extintores específicos por su comportamiento particular" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué tres elementos representa el triángulo del fuego?", explicacion: "Combustible, comburente y calor.", dificultad: "facil", opciones: ["Combustible, comburente y calor", "Combustible, agua y calor", "Comburente, humo y ceniza", "Oxígeno, humo y llama"], correcta: 0 },
  { enunciado: "¿Qué elemento añade el tetraedro del fuego al triángulo clásico?", explicacion: "La reacción en cadena.", dificultad: "media", opciones: ["La reacción en cadena", "El oxígeno adicional", "La humedad ambiental", "La ventilación del local"], correcta: 0 },
  { enunciado: "¿Qué es el comburente en el proceso de combustión?", explicacion: "El elemento que sostiene la combustión, habitualmente el oxígeno.", dificultad: "media", opciones: ["El elemento que sostiene la combustión (oxígeno)", "La sustancia capaz de arder", "El calor mínimo necesario para iniciar el fuego", "El humo generado por la combustión"], correcta: 0 },
  { enunciado: "¿Qué caracteriza a un fuego de clase A?", explicacion: "Se produce en materiales sólidos comunes que dejan brasas o residuos.", dificultad: "media", opciones: ["Materiales sólidos comunes (madera, papel, tejidos)", "Líquidos inflamables (gasolina, disolventes)", "Gases inflamables (butano, propano)", "Metales combustibles (magnesio, sodio)"], correcta: 0 },
  { enunciado: "¿Qué caracteriza a un fuego de clase B?", explicacion: "Se produce en líquidos o sólidos licuables inflamables.", dificultad: "media", opciones: ["Líquidos o sólidos licuables inflamables", "Materiales sólidos comunes", "Gases inflamables", "Aceites y grasas de cocina"], correcta: 0 },
  { enunciado: "¿Qué caracteriza a un fuego de clase C?", explicacion: "Se produce en gases inflamables.", dificultad: "media", opciones: ["Gases inflamables (butano, propano, gas natural)", "Materiales sólidos comunes", "Metales combustibles", "Aceites y grasas de cocina"], correcta: 0 },
  { enunciado: "¿Qué caracteriza a un fuego de clase D?", explicacion: "Se produce en metales combustibles, requiriendo agentes específicos.", dificultad: "dificil", opciones: ["Metales combustibles (magnesio, sodio, aluminio)", "Líquidos inflamables comunes", "Gases inflamables", "Aceites de cocina"], correcta: 0 },
  { enunciado: "¿A qué corresponde la actual clase F de fuego?", explicacion: "A aceites y grasas de cocina, propia de cocinas industriales.", dificultad: "dificil", opciones: ["Aceites y grasas de cocina", "Metales combustibles", "Gases inflamables", "Materiales sólidos comunes"], correcta: 0 },
]);

const S2 = "senalizacion-medios-extincion-incendios";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué norma aprueba el Reglamento de instalaciones de protección contra incendios (RIPCI) vigente en España?", reverso: "El Real Decreto 513/2017, de 22 de mayo, que sustituyó al anterior RD 1942/1993" },
  { anverso: "¿Qué regula el RIPCI (RD 513/2017)?", reverso: "Las condiciones y requisitos para el diseño, instalación, puesta en funcionamiento, mantenimiento mínimo e inspección periódica de los equipos, sistemas y componentes de protección contra incendios" },
  { anverso: "¿Qué es un extintor portátil y qué agentes extintores son habituales?", reverso: "Un aparato que contiene un agente extintor que puede proyectarse y dirigirse sobre un fuego por acción de una presión interna; los agentes más habituales son el polvo polivalente ABC, el CO2 y el agua pulverizada" },
  { anverso: "¿Qué extintor debe usarse para un fuego de origen eléctrico (equipos en tensión)?", reverso: "Un extintor de CO2 (dióxido de carbono), que no es conductor de electricidad y no deja residuos sobre el equipo, a diferencia del agua o el polvo en algunos casos" },
  { anverso: "¿Qué es una boca de incendio equipada (BIE)?", reverso: "Un sistema fijo de protección contra incendios formado por una manguera conectada a la red de agua del edificio, lista para su uso inmediato por personal o brigadas de extinción" },
  { anverso: "¿Qué es un detector automático de incendios y qué tipos básicos existen?", reverso: "Un dispositivo que detecta automáticamente un incendio (por humo, calor o llama) y activa la señal de alarma; los tipos básicos son detectores de humo, de temperatura (térmicos) y de llama" },
  { anverso: "¿Qué regula el RD 485/1997 respecto a la señalización de seguridad?", reverso: "Las disposiciones mínimas para la señalización de seguridad y salud en el trabajo, incluida la señalización relativa a la lucha contra incendios y las vías de evacuación" },
  { anverso: "¿De qué color es la señalización relativa a los equipos de lucha contra incendios según el RD 485/1997?", reverso: "Roja, con pictograma blanco sobre fondo rojo, forma rectangular o cuadrada" },
  { anverso: "¿De qué color es la señalización de las vías de evacuación y salidas de emergencia?", reverso: "Verde, con pictograma blanco sobre fondo verde, forma rectangular o cuadrada, indicando la dirección de evacuación" },
  { anverso: "¿Qué información básica debe indicar la señalización de un extintor en su ubicación?", reverso: "La localización exacta del extintor mediante el pictograma correspondiente, visible y sin obstáculos que dificulten su identificación o acceso" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué norma aprueba el vigente Reglamento de instalaciones de protección contra incendios (RIPCI)?", explicacion: "El Real Decreto 513/2017, de 22 de mayo.", dificultad: "media", opciones: ["El Real Decreto 513/2017", "El Real Decreto 1942/1993", "El Real Decreto 485/1997", "La Ley 31/1995"], correcta: 0 },
  { enunciado: "¿Qué extintor debe usarse ante un fuego de origen eléctrico?", explicacion: "El de CO2, que no es conductor de electricidad.", dificultad: "media", opciones: ["El extintor de CO2", "El extintor de agua pulverizada", "Cualquier extintor sin distinción", "Ninguno, debe apagarse siempre con agua"], correcta: 0 },
  { enunciado: "¿Qué es una boca de incendio equipada (BIE)?", explicacion: "Un sistema fijo con manguera conectada a la red de agua del edificio.", dificultad: "media", opciones: ["Un sistema fijo con manguera conectada a la red de agua", "Un extintor portátil de CO2", "Un detector automático de humo", "Una señal de evacuación en verde"], correcta: 0 },
  { enunciado: "¿Qué tipos básicos de detector automático de incendios existen?", explicacion: "De humo, de temperatura (térmicos) y de llama.", dificultad: "media", opciones: ["De humo, de temperatura y de llama", "Solo de humo", "Solo de temperatura", "Solo de gas"], correcta: 0 },
  { enunciado: "¿Qué regula el RD 485/1997 en relación con este tema?", explicacion: "La señalización de seguridad y salud en el trabajo, incluida la de incendios y evacuación.", dificultad: "media", opciones: ["La señalización de seguridad, incendios y evacuación", "El diseño de las instalaciones de extinción", "El mantenimiento de extintores exclusivamente", "La inspección periódica de BIEs"], correcta: 0 },
  { enunciado: "¿De qué color es la señalización de los equipos de lucha contra incendios?", explicacion: "Roja.", dificultad: "facil", opciones: ["Roja", "Verde", "Amarilla", "Azul"], correcta: 0 },
  { enunciado: "¿De qué color es la señalización de las vías de evacuación?", explicacion: "Verde.", dificultad: "facil", opciones: ["Verde", "Roja", "Amarilla", "Azul"], correcta: 0 },
  { enunciado: "¿Qué debe garantizarse en la ubicación de un extintor señalizado?", explicacion: "Que sea visible y accesible, sin obstáculos.", dificultad: "media", opciones: ["Que sea visible y accesible, sin obstáculos", "Que esté siempre oculto de la vista", "Que solo lo conozca el personal de mantenimiento", "Que esté bloqueado con mobiliario"], correcta: 0 },
]);

const S3 = "actuacion-evacuacion-caso-incendio";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Cuál es la primera actuación recomendada al detectar un conato de incendio?", reverso: "Dar la alarma (activar el pulsador o avisar verbalmente) y, solo si se dispone de medios y formación adecuados y el fuego es incipiente, intentar la extinción sin poner en riesgo la propia seguridad" },
  { anverso: "¿Qué es un 'conato de incendio'?", reverso: "Un fuego en su fase inicial, de pequeñas dimensiones, que puede ser controlado con los medios de primera intervención disponibles (extintores)" },
  { anverso: "¿Qué debe hacerse si el fuego no puede controlarse con los medios de primera intervención?", reverso: "Abandonar la zona de forma ordenada siguiendo el plan de evacuación, cerrar puertas tras de sí para retardar la propagación, y dar aviso a los servicios de emergencia (112/bomberos)" },
  { anverso: "¿Por qué no debe usarse el ascensor durante una evacuación por incendio?", reverso: "Porque puede quedar bloqueado por un corte de suministro eléctrico o por el propio incendio, atrapando a las personas en su interior; deben usarse siempre las escaleras" },
  { anverso: "¿Qué es un plan de evacuación de un edificio?", reverso: "El documento que establece las vías de evacuación, los puntos de encuentro y el procedimiento organizado para desalojar el edificio de forma segura ante una emergencia" },
  { anverso: "¿Qué es un punto de encuentro en un plan de evacuación?", reverso: "El lugar exterior seguro, predefinido, donde deben reunirse las personas evacuadas para realizar el recuento y verificar que nadie ha quedado dentro del edificio" },
  { anverso: "¿Qué actitud debe evitarse durante una evacuación de emergencia?", reverso: "Correr, empujar o generar situaciones de pánico colectivo, que dificultan la evacuación ordenada y aumentan el riesgo de caídas y atropellos" },
  { anverso: "¿Qué debe hacerse si al evacuar un pasillo o escalera se encuentra lleno de humo?", reverso: "Avanzar agachado o a ras del suelo (el aire más limpio se mantiene más bajo), y cubrirse la boca y nariz con un paño si es posible, buscando la salida más próxima" },
  { anverso: "¿Qué papel puede tener el oficial de mantenimiento general en un simulacro de evacuación de un edificio municipal?", reverso: "Colaborar en la verificación de que las vías de evacuación y salidas de emergencia están libres de obstáculos y en correcto estado de funcionamiento (puertas, señalización, alumbrado de emergencia)" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Cuál es la primera actuación recomendada al detectar un conato de incendio?", explicacion: "Dar la alarma y, si es seguro, intentar la extinción con medios disponibles.", dificultad: "media", opciones: ["Dar la alarma y, si es seguro, intentar extinguirlo", "Abandonar el edificio sin avisar a nadie", "Esperar a que otra persona actúe primero", "Llamar únicamente a un familiar"], correcta: 0 },
  { enunciado: "¿Qué es un conato de incendio?", explicacion: "Un fuego en fase inicial, controlable con medios de primera intervención.", dificultad: "facil", opciones: ["Un fuego inicial controlable con medios de primera intervención", "Un incendio ya generalizado en todo el edificio", "Un simulacro de evacuación programado", "Un fallo del sistema de detección automática"], correcta: 0 },
  { enunciado: "¿Qué debe hacerse si el fuego no puede controlarse con medios de primera intervención?", explicacion: "Evacuar de forma ordenada y avisar a los servicios de emergencia.", dificultad: "media", opciones: ["Evacuar de forma ordenada y avisar a emergencias", "Intentar apagarlo igualmente sin ayuda", "Permanecer en la zona esperando instrucciones", "Usar el ascensor para evacuar más rápido"], correcta: 0 },
  { enunciado: "¿Por qué no debe usarse el ascensor durante una evacuación por incendio?", explicacion: "Porque puede quedar bloqueado por corte eléctrico o el propio incendio.", dificultad: "facil", opciones: ["Porque puede quedar bloqueado y atrapar a personas", "Porque siempre está fuera de servicio", "Porque no puede usarse nunca, en ningún caso", "Porque activa la alarma automáticamente"], correcta: 0 },
  { enunciado: "¿Qué es un punto de encuentro en un plan de evacuación?", explicacion: "El lugar exterior seguro donde se reúnen las personas evacuadas para el recuento.", dificultad: "media", opciones: ["El lugar exterior seguro para el recuento de personas", "La sala donde se guardan los extintores", "El despacho de la dirección del edificio", "La ubicación del cuadro eléctrico general"], correcta: 0 },
  { enunciado: "¿Qué actitud debe evitarse durante una evacuación de emergencia?", explicacion: "Correr, empujar o generar pánico colectivo.", dificultad: "facil", opciones: ["Correr, empujar o generar pánico", "Seguir las indicaciones del plan de evacuación", "Usar las escaleras en lugar del ascensor", "Dirigirse al punto de encuentro exterior"], correcta: 0 },
  { enunciado: "¿Cómo debe avanzarse por un pasillo lleno de humo durante una evacuación?", explicacion: "Agachado o a ras del suelo, cubriéndose la boca y nariz si es posible.", dificultad: "media", opciones: ["Agachado o a ras del suelo", "De pie y corriendo lo más rápido posible", "Usando el ascensor para evitar el humo", "Esperando de pie a que se disipe el humo"], correcta: 0 },
  { enunciado: "¿Qué papel puede tener el oficial de mantenimiento en un simulacro de evacuación?", explicacion: "Verificar que las vías de evacuación están libres de obstáculos y en correcto estado.", dificultad: "media", opciones: ["Verificar que las vías de evacuación están operativas", "Dirigir personalmente todo el simulacro sin apoyo", "No tiene ningún papel en los simulacros", "Sustituir a los servicios de emergencia"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 21 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 21, orden: 21, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-75 creado y vinculado como Tema 21 de Oficial Mantenimiento General.");
