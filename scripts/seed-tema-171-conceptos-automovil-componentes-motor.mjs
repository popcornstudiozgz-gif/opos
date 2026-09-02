/**
 * Crea tema-171: "Conceptos del automóvil y componentes del motor" —
 * Tema 7 (numero=7, bloque-2) de Oficial Mecánico (Ayto. Zaragoza).
 * Primer tema de la parte específica de esta oposición.
 *
 * Corresponde al TEMA 5 oficial del Anexo I (bases2110.pdf, línea 1398):
 *   "Conceptos del automóvil. Componentes del motor del automóvil."
 *
 * Conocimiento técnico consolidado de mecánica del automóvil, sin una
 * ley española que lo regule como tal — mismo criterio ya aplicado en
 * Oficial Carpintero y Oficial Herrero (ver scripts/seed-tema-108-*.mjs
 * y scripts/seed-tema-155-*.mjs) para contenido técnico del oficio sin
 * ley única. Búsqueda previa realizada conforme al estándar de sourcing
 * del proyecto: no existe reglamento español que regule la
 * constitución mecánica de un motor como tal (distinto de la normativa
 * de homologación y circulación, ajena al contenido de este tema).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-171-conceptos-automovil-componentes-motor.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-171";
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
  titulo: "Conceptos del automóvil y componentes del motor",
  descripcion: "Conceptos generales del automóvil y clasificación de vehículos. Bloque motor, culata y cárter. Pistones, bielas, cigüeñal y válvulas.",
  contenido: "Desarrolla los conceptos generales del automóvil y la clasificación básica de vehículos según su uso y sistema de propulsión, y los componentes fundamentales del motor de combustión interna: el bloque motor, la culata y el cárter como elementos estructurales, y los elementos móviles internos (pistones, bielas, cigüeñal y válvulas) que hacen posible el ciclo de funcionamiento del motor.",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "Conceptos generales y clasificación de vehículos", seccion: "conceptos-generales-clasificacion-vehiculos", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Bloque motor, culata y cárter", seccion: "bloque-motor-culata-carter", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Pistones, bielas, cigüeñal y válvulas", seccion: "pistones-bielas-cigueñal-valvulas", articulos: "Conceptos fundamentales" },
  ],
}]);

const S1 = "conceptos-generales-clasificacion-vehiculos";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un automóvil, en sentido técnico general?", reverso: "Un vehículo autopropulsado, dotado de motor propio, destinado al transporte de personas o mercancías por carretera, y capaz de circular por sus propios medios sin necesidad de una vía guiada" },
  { anverso: "¿Qué sistemas principales componen, de forma general, un automóvil?", reverso: "El motor (fuente de energía mecánica), la transmisión (que traslada esa energía a las ruedas), la dirección, los frenos, la suspensión, y la carrocería o chasis que da soporte al conjunto" },
  { anverso: "¿Qué es el chasis de un vehículo?", reverso: "La estructura portante sobre la que se montan el motor, la transmisión y demás mecanismos del vehículo, ya sea como un bastidor independiente o integrado en la propia carrocería (carrocería autoportante)" },
  { anverso: "¿Qué diferencia existe entre un vehículo con motor de combustión interna y un vehículo eléctrico, en cuanto a su fuente de energía?", reverso: "El motor de combustión interna obtiene energía mecánica de la combustión de un combustible (gasolina, diésel, entre otros); el vehículo eléctrico obtiene esa energía de la electricidad almacenada en una batería, mediante uno o varios motores eléctricos" },
  { anverso: "¿Qué es la cilindrada de un motor?", reverso: "El volumen total desplazado por todos los pistones del motor en su recorrido completo dentro de los cilindros, expresado habitualmente en centímetros cúbicos (cc) o litros, y relacionado con la potencia y el par que puede desarrollar el motor" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es un automóvil, en sentido técnico general?", explicacion: "Un vehículo autopropulsado, con motor propio, para el transporte por carretera.", dificultad: "facil", opciones: ["Un vehículo autopropulsado, con motor propio", "Un vehículo que solo puede circular sobre raíles fijos", "Un vehículo remolcado exclusivamente por otro vehículo", "Un vehículo exclusivo para el transporte marítimo de mercancías"], correcta: 0 },
  { enunciado: "¿Qué sistemas principales componen un automóvil?", explicacion: "Motor, transmisión, dirección, frenos, suspensión y carrocería o chasis.", dificultad: "media", opciones: ["Motor, transmisión, dirección, frenos, suspensión y chasis", "Únicamente el motor, sin ningún otro sistema relevante", "Únicamente la carrocería, sin ningún otro sistema relevante", "Únicamente los frenos, sin ningún otro sistema relevante"], correcta: 0 },
  { enunciado: "¿Qué es el chasis de un vehículo?", explicacion: "La estructura portante sobre la que se montan el motor, la transmisión y demás mecanismos.", dificultad: "media", opciones: ["La estructura portante que soporta motor y mecanismos", "El sistema exclusivo de frenado del vehículo", "El sistema exclusivo de climatización del vehículo", "El sistema exclusivo de encendido del motor"], correcta: 0 },
  { enunciado: "¿Qué diferencia fundamental existe entre un vehículo de combustión interna y uno eléctrico?", explicacion: "La fuente de energía: combustión de combustible frente a electricidad almacenada en batería.", dificultad: "media", opciones: ["La fuente de energía empleada para el movimiento", "Ninguna diferencia real entre ambos tipos de vehículo", "El eléctrico siempre carece de sistema de frenos propio", "El de combustión siempre carece de sistema de dirección"], correcta: 0 },
  { enunciado: "¿Qué es la cilindrada de un motor?", explicacion: "El volumen total desplazado por todos los pistones en su recorrido dentro de los cilindros.", dificultad: "dificil", opciones: ["El volumen desplazado por los pistones en los cilindros", "El peso total del motor completo del vehículo", "La velocidad máxima que puede alcanzar el vehículo", "El número de marchas disponibles en la caja de cambios"], correcta: 0 },
]);

const S2 = "bloque-motor-culata-carter";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es el bloque motor?", reverso: "La pieza estructural principal del motor, habitualmente de fundición o aleación de aluminio, que aloja los cilindros y sirve de soporte al cigüeñal y a otros elementos internos del motor" },
  { anverso: "¿Qué es un cilindro, dentro del bloque motor?", reverso: "La cavidad cilíndrica mecanizada en el bloque motor, dentro de la cual se desplaza el pistón durante su recorrido, formando la cámara donde se produce el proceso de combustión (junto con la culata)" },
  { anverso: "¿Qué es la culata del motor?", reverso: "La pieza que cierra la parte superior del bloque motor, alojando habitualmente las válvulas, las bujías o los inyectores (según el tipo de motor), y formando junto al pistón la cámara de combustión" },
  { anverso: "¿Qué es la junta de culata?", reverso: "Un elemento de estanqueidad situado entre el bloque motor y la culata, que sella la cámara de combustión y los circuitos de refrigeración y engrase, evitando fugas y mezclas indeseadas entre ambos" },
  { anverso: "¿Qué es el cárter del motor?", reverso: "La pieza inferior del motor, situada bajo el bloque motor, que actúa como depósito del aceite lubricante y cierra por su parte inferior el conjunto del motor" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es el bloque motor?", explicacion: "La pieza estructural principal que aloja los cilindros y soporta el cigüeñal.", dificultad: "facil", opciones: ["La pieza estructural que aloja los cilindros y el cigüeñal", "El depósito de aceite situado en la parte inferior del motor", "La pieza que cierra la parte superior del motor", "El elemento de estanqueidad entre bloque y culata"], correcta: 0 },
  { enunciado: "¿Qué es un cilindro dentro del bloque motor?", explicacion: "La cavidad donde se desplaza el pistón durante su recorrido.", dificultad: "media", opciones: ["La cavidad donde se desplaza el pistón", "El depósito de aceite situado en la parte inferior del motor", "La pieza que cierra la parte superior del motor", "El elemento de estanqueidad entre bloque y culata"], correcta: 0 },
  { enunciado: "¿Qué es la culata del motor?", explicacion: "La pieza que cierra la parte superior del bloque, alojando válvulas y bujías o inyectores.", dificultad: "media", opciones: ["La pieza que cierra la parte superior, con válvulas y bujías", "La pieza estructural principal que aloja los cilindros", "El depósito de aceite situado en la parte inferior del motor", "El elemento de estanqueidad entre bloque y cárter"], correcta: 0 },
  { enunciado: "¿Qué función cumple la junta de culata?", explicacion: "Sella la cámara de combustión y los circuitos de refrigeración y engrase entre bloque y culata.", dificultad: "dificil", opciones: ["Sella la cámara de combustión entre bloque y culata", "Aloja las válvulas de admisión y escape del motor", "Almacena el aceite lubricante del motor", "Aloja el cigüeñal y las bielas del motor"], correcta: 0 },
  { enunciado: "¿Qué es el cárter del motor?", explicacion: "La pieza inferior que actúa como depósito del aceite lubricante.", dificultad: "media", opciones: ["La pieza inferior que actúa como depósito de aceite", "La pieza que cierra la parte superior del motor", "La cavidad donde se desplaza el pistón", "El elemento de estanqueidad entre bloque y culata"], correcta: 0 },
]);

const S3 = "pistones-bielas-cigueñal-valvulas";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es el pistón de un motor?", reverso: "El elemento móvil que se desplaza alternativamente dentro del cilindro, recibiendo el empuje de la combustión y transmitiéndolo a la biela, cerrando además la cámara de combustión por su parte inferior mediante los segmentos" },
  { anverso: "¿Qué son los segmentos de un pistón?", reverso: "Anillos metálicos alojados en ranuras del pistón que garantizan la estanqueidad entre el pistón y la pared del cilindro, evitando fugas de gases de combustión hacia el cárter y controlando el paso de aceite" },
  { anverso: "¿Qué es la biela?", reverso: "El elemento que une el pistón con el cigüeñal, transformando el movimiento alternativo (arriba-abajo) del pistón en el movimiento giratorio del cigüeñal" },
  { anverso: "¿Qué es el cigüeñal?", reverso: "El eje acodado que recibe el movimiento de las bielas de todos los cilindros y lo transforma en un movimiento de rotación continuo, siendo el elemento que finalmente transmite la energía mecánica del motor hacia la transmisión" },
  { anverso: "¿Qué son las válvulas de admisión y de escape de un motor?", reverso: "Elementos móviles alojados en la culata que abren y cierran de forma sincronizada el paso de la mezcla aire-combustible (admisión) y de los gases quemados (escape) en cada cilindro, según el momento del ciclo del motor" },
  { anverso: "¿Qué diferencia existe entre una válvula de admisión y una de escape?", reverso: "La válvula de admisión permite la entrada de aire o mezcla aire-combustible al cilindro; la válvula de escape permite la salida de los gases ya quemados tras la combustión, ambas accionadas de forma sincronizada con el ciclo del motor" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es el pistón de un motor?", explicacion: "El elemento móvil que se desplaza dentro del cilindro y transmite el empuje de la combustión a la biela.", dificultad: "facil", opciones: ["El elemento móvil que transmite el empuje a la biela", "El eje acodado que transforma el movimiento en rotación", "El elemento que une el pistón con el cigüeñal", "La pieza que cierra la parte superior del bloque motor"], correcta: 0 },
  { enunciado: "¿Qué función cumplen los segmentos de un pistón?", explicacion: "Garantizan la estanqueidad entre el pistón y la pared del cilindro.", dificultad: "media", opciones: ["Garantizan la estanqueidad entre pistón y cilindro", "Transforman el movimiento alternativo en rotación continua", "Abren y cierran el paso de la mezcla aire-combustible", "Sellan la cámara de combustión entre bloque y culata"], correcta: 0 },
  { enunciado: "¿Qué es la biela?", explicacion: "El elemento que une el pistón con el cigüeñal, transformando el movimiento alternativo en rotación.", dificultad: "media", opciones: ["El elemento que une el pistón con el cigüeñal", "El eje acodado que recibe el movimiento de todas las bielas", "El elemento móvil que se desplaza dentro del cilindro", "La pieza que aloja las válvulas de admisión y escape"], correcta: 0 },
  { enunciado: "¿Qué es el cigüeñal?", explicacion: "El eje acodado que transforma el movimiento de las bielas en rotación continua.", dificultad: "media", opciones: ["El eje acodado que transforma el movimiento en rotación", "El elemento que une el pistón con la biela", "El elemento móvil que se desplaza dentro del cilindro", "La pieza que aloja las válvulas de admisión y escape"], correcta: 0 },
  { enunciado: "¿Qué diferencia existe entre una válvula de admisión y una de escape?", explicacion: "La de admisión permite la entrada de mezcla; la de escape, la salida de gases quemados.", dificultad: "dificil", opciones: ["La de admisión permite la entrada; la de escape, la salida de gases", "Ambas cumplen exactamente la misma función en el motor", "La válvula de escape permite la entrada de la mezcla aire-combustible", "La válvula de admisión permite la salida de los gases quemados"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 7 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 7, orden: 7, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-171 creado y vinculado como Tema 7 de Oficial Mecánico.");
