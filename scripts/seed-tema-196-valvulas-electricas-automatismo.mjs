/**
 * Crea tema-196: "Válvulas eléctricas y automatismo" — Tema 16
 * (numero=16, bloque-2) de Oficial Guardallaves (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 14 oficial del Anexo I (bases2110.pdf, línea 929):
 *   "Válvulas eléctricas. Electrónica y mecánica aplicada en actuadores
 *   reductores. Corriente eléctrica, Funcionamiento de los motores
 *   eléctricos, Introducción al automatismo, descripción del contactor,
 *   Elementos de mando, Elementos de protección, Cuadro de maniobras
 *   para válvulas motorizadas, Válvulas motorizadas (montaje y ajuste)."
 *
 * Conocimiento técnico consolidado de electrotecnia básica y automatismo
 * industrial, sin una ley española que lo regule como tal en su
 * vertiente conceptual — mismo criterio que otros temas de electrotecnia
 * básica sin ley única de este proyecto (ver scripts/seed-tema-141-*.mjs
 * de Oficial Electricista, "conceptos fundamentales de electricidad").
 * Sí existe, para la instalación eléctrica física de estos cuadros y
 * actuadores, el marco general del Reglamento Electrotécnico para Baja
 * Tensión (Real Decreto 842/2002, BOE-A-2002-18099) y su ITC-BT-47
 * ("Instalaciones con fines especiales. Receptores. Motores"), ya
 * verificado y citado en el proyecto para la protección de motores
 * eléctricos (ver scripts/seed-tema-139-*.mjs y siguientes de Oficial
 * Electricista) — se cita por su función general de protección de
 * motores, aplicable también a los motores de las válvulas motorizadas
 * de este tema.
 *
 * Tres secciones:
 * 1. corriente-electrica-motores-electricos
 * 2. automatismo-contactor-elementos-mando-proteccion
 * 3. cuadro-maniobras-valvulas-motorizadas-montaje-ajuste
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-196-valvulas-electricas-automatismo.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-196";
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
  titulo: "Válvulas eléctricas y automatismo",
  descripcion: "Corriente eléctrica y funcionamiento de los motores eléctricos. Automatismo: el contactor, elementos de mando y de protección. Cuadro de maniobras y válvulas motorizadas: montaje y ajuste.",
  contenido: "Desarrolla los fundamentos de electrotecnia necesarios para trabajar con válvulas motorizadas en la red de abastecimiento: la corriente eléctrica y el funcionamiento básico de los motores eléctricos, los elementos del automatismo industrial (el contactor, los elementos de mando y de protección), el cuadro de maniobras que gobierna una válvula motorizada, y el montaje y ajuste de estas válvulas.",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "Corriente eléctrica y motores eléctricos", seccion: "corriente-electrica-motores-electricos", articulos: "Conceptos fundamentales de electrotecnia" },
    { url: "", titulo: "Automatismo: el contactor, elementos de mando y de protección", seccion: "automatismo-contactor-elementos-mando-proteccion", articulos: "Conceptos fundamentales de automatismo industrial" },
    { url: "", titulo: "Cuadro de maniobras y válvulas motorizadas: montaje y ajuste", seccion: "cuadro-maniobras-valvulas-motorizadas-montaje-ajuste", articulos: "REBT (RD 842/2002), ITC-BT-47" },
  ],
}]);

const S1 = "corriente-electrica-motores-electricos";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es la corriente eléctrica?", reverso: "El movimiento ordenado de cargas eléctricas (electrones) a través de un conductor, cuya intensidad se mide en amperios (A)" },
  { anverso: "¿Qué es la tensión (o voltaje) eléctrica?", reverso: "La diferencia de potencial entre dos puntos de un circuito, que es la que impulsa el movimiento de las cargas eléctricas; se mide en voltios (V)" },
  { anverso: "¿Qué diferencia existe entre corriente continua (CC) y corriente alterna (CA)?", reverso: "La corriente continua mantiene siempre el mismo sentido de circulación; la corriente alterna invierte periódicamente su sentido, siendo esta última la habitual en la red eléctrica y en la mayoría de motores industriales" },
  { anverso: "¿Cómo funciona, de forma básica, un motor eléctrico?", reverso: "Transforma energía eléctrica en energía mecánica (movimiento de rotación), mediante la interacción entre los campos magnéticos generados por sus bobinados (estátor y rótor)" },
  { anverso: "¿Qué es un motorreductor, aplicado a una válvula motorizada?", reverso: "Un conjunto formado por un motor eléctrico y un reductor de velocidad (engranajes), que transforma el giro rápido y de bajo par del motor en un giro lento y de mayor par, adecuado para maniobrar el husillo o el eje de la válvula" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es la corriente eléctrica?", explicacion: "El movimiento ordenado de cargas eléctricas a través de un conductor.", dificultad: "facil", opciones: ["El movimiento ordenado de cargas eléctricas por un conductor", "La diferencia de potencial entre dos puntos de un circuito", "La resistencia que opone un conductor al paso de la corriente", "La potencia consumida por un receptor eléctrico"], correcta: 0 },
  { enunciado: "¿En qué unidad se mide la tensión eléctrica?", explicacion: "En voltios (V).", dificultad: "facil", opciones: ["Voltios", "Amperios", "Vatios", "Ohmios"], correcta: 0 },
  { enunciado: "¿Qué diferencia existe entre corriente continua y corriente alterna?", explicacion: "La continua mantiene siempre el mismo sentido; la alterna lo invierte periódicamente.", dificultad: "media", opciones: ["La alterna invierte periódicamente su sentido; la continua no", "La continua invierte periódicamente su sentido; la alterna no", "Ambas mantienen siempre exactamente el mismo sentido", "Ambos términos son equivalentes y describen el mismo fenómeno"], correcta: 0 },
  { enunciado: "¿Cómo funciona, de forma básica, un motor eléctrico?", explicacion: "Transforma energía eléctrica en energía mecánica mediante campos magnéticos.", dificultad: "media", opciones: ["Transforma energía eléctrica en energía mecánica de rotación", "Transforma energía mecánica en energía eléctrica almacenada", "Transforma energía térmica en energía eléctrica de salida", "Transforma energía hidráulica en energía eléctrica de salida"], correcta: 0 },
  { enunciado: "¿Qué es un motorreductor aplicado a una válvula motorizada?", explicacion: "Un conjunto de motor y reductor que transforma giro rápido en giro lento de mayor par.", dificultad: "dificil", opciones: ["Un conjunto que transforma giro rápido en giro lento de mayor par", "Un dispositivo que mide exclusivamente el caudal de la conducción", "Un dispositivo que purga exclusivamente el aire de la conducción", "Un elemento que sella exclusivamente la estanqueidad de la válvula"], correcta: 0 },
]);

const S2 = "automatismo-contactor-elementos-mando-proteccion";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un automatismo, en el ámbito de las instalaciones eléctricas?", reverso: "Un conjunto de elementos (mando, control y potencia) que permite que una máquina o instalación funcione de forma automática, sin necesidad de que una persona accione manualmente cada operación" },
  { anverso: "¿Qué es un contactor?", reverso: "Un interruptor accionado electromagnéticamente (mediante una bobina) que permite conectar o desconectar un circuito de potencia (por ejemplo, el motor de una válvula motorizada) desde un circuito de mando de menor potencia" },
  { anverso: "¿Qué son los elementos de mando en un automatismo?", reverso: "Los dispositivos que el operador o el propio sistema emplean para dar la orden de actuación: pulsadores, selectores, finales de carrera o señales procedentes de un sistema de telecontrol" },
  { anverso: "¿Qué son los elementos de protección en un automatismo, y qué función cumplen?", reverso: "Dispositivos como el interruptor magnetotérmico o el relé térmico, que protegen el circuito y el motor frente a sobrecargas o cortocircuitos, desconectando automáticamente la alimentación cuando se supera un valor de corriente peligroso" },
  { anverso: "¿Qué diferencia existe entre un elemento de mando y un elemento de protección en un automatismo?", reverso: "El elemento de mando da la orden voluntaria de actuar (arrancar, parar, abrir, cerrar); el elemento de protección actúa de forma automática para evitar un daño, con independencia de la voluntad del operador" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es un automatismo en el ámbito de las instalaciones eléctricas?", explicacion: "Un conjunto de elementos que permite funcionar de forma automática sin acción manual continua.", dificultad: "facil", opciones: ["Un conjunto de elementos que permite el funcionamiento automático", "Un tipo de válvula exclusivo para redes de gran diámetro", "Un elemento exclusivo de medición de caudal en la conducción", "Un elemento exclusivo de purga de aire en la conducción"], correcta: 0 },
  { enunciado: "¿Qué es un contactor?", explicacion: "Un interruptor accionado electromagnéticamente que conecta o desconecta un circuito de potencia.", dificultad: "media", opciones: ["Un interruptor electromagnético que conecta un circuito de potencia", "Un sensor que mide la temperatura del motor eléctrico", "Un elemento que sella la estanqueidad de la válvula motorizada", "Un dispositivo que purga el aire acumulado en la conducción"], correcta: 0 },
  { enunciado: "¿Qué son los elementos de mando en un automatismo?", explicacion: "Pulsadores, selectores, finales de carrera o señales de telecontrol.", dificultad: "media", opciones: ["Pulsadores, selectores, finales de carrera o señales de telecontrol", "Exclusivamente el interruptor magnetotérmico del circuito", "Exclusivamente el relé térmico de protección del motor", "Exclusivamente el propio motorreductor de la válvula"], correcta: 0 },
  { enunciado: "¿Qué función cumple un relé térmico en un automatismo?", explicacion: "Protege el motor frente a sobrecargas, desconectando la alimentación.", dificultad: "dificil", opciones: ["Protege el motor frente a sobrecargas, desconectando la alimentación", "Da la orden voluntaria de arranque del motor eléctrico", "Mide el caudal de agua que circula por la válvula", "Sustituye por completo la función del contactor en el circuito"], correcta: 0 },
  { enunciado: "¿Qué diferencia existe entre un elemento de mando y uno de protección en un automatismo?", explicacion: "El de mando da la orden voluntaria; el de protección actúa automáticamente ante un riesgo.", dificultad: "media", opciones: ["El de mando da la orden; el de protección actúa ante un riesgo", "Ambos cumplen exactamente la misma función en el automatismo", "El de protección da la orden; el de mando actúa ante un riesgo", "Ninguno de los dos elementos es necesario en un automatismo básico"], correcta: 0 },
]);

const S3 = "cuadro-maniobras-valvulas-motorizadas-montaje-ajuste";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es el cuadro de maniobras de una válvula motorizada?", reverso: "El armario eléctrico que agrupa los elementos de mando, protección y control necesarios para gobernar el motorreductor de la válvula, ya sea de forma local (con pulsadores) o remota (mediante telecontrol)" },
  { anverso: "¿Qué función cumplen los finales de carrera en una válvula motorizada?", reverso: "Detectar cuándo la válvula ha alcanzado su posición de totalmente abierta o totalmente cerrada, para detener automáticamente el motor en ese punto y evitar forzar el mecanismo" },
  { anverso: "¿Qué debe comprobarse durante el montaje de una válvula motorizada antes de su puesta en servicio?", reverso: "El correcto acoplamiento mecánico entre el motorreductor y el husillo o eje de la válvula, el sentido de giro correcto (para que \"abrir\" y \"cerrar\" correspondan realmente a esas maniobras), y el conexionado eléctrico conforme al esquema del fabricante" },
  { anverso: "¿En qué consiste el ajuste de los finales de carrera de una válvula motorizada?", reverso: "En regular su posición exacta para que el motor se detenga justo cuando la válvula alcanza el cierre o la apertura totales, sin forzar el mecanismo por un exceso de recorrido ni dejar la válvula sin cerrar o abrir del todo por defecto" },
  { anverso: "¿Qué norma general regula la instalación eléctrica de baja tensión de un cuadro de maniobras y sus motores, en cuanto a la protección de estos últimos?", reverso: "El Reglamento Electrotécnico para Baja Tensión (REBT, RD 842/2002) y, específicamente para la protección de motores, su ITC-BT-47" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es el cuadro de maniobras de una válvula motorizada?", explicacion: "El armario eléctrico que agrupa los elementos de mando, protección y control del motorreductor.", dificultad: "facil", opciones: ["El armario que agrupa los elementos de mando, protección y control", "El cuerpo metálico exterior de la propia válvula motorizada", "El elemento que sella la estanqueidad de la válvula motorizada", "El punto donde se purga el aire de la conducción cercana"], correcta: 0 },
  { enunciado: "¿Qué función cumplen los finales de carrera en una válvula motorizada?", explicacion: "Detectar la posición de apertura o cierre totales y detener el motor.", dificultad: "media", opciones: ["Detectar la posición de apertura o cierre y detener el motor", "Medir el caudal exacto que atraviesa la válvula motorizada", "Proteger el circuito frente a sobrecargas eléctricas del motor", "Dar la orden voluntaria de arranque del motorreductor"], correcta: 0 },
  { enunciado: "¿Qué debe comprobarse durante el montaje de una válvula motorizada?", explicacion: "El acoplamiento mecánico, el sentido de giro y el conexionado eléctrico.", dificultad: "media", opciones: ["El acoplamiento mecánico, el sentido de giro y el conexionado", "Únicamente el color exterior del motorreductor instalado", "Únicamente el peso total del conjunto motorreductor-válvula", "Únicamente la fecha de fabricación de la válvula motorizada"], correcta: 0 },
  { enunciado: "¿En qué consiste el ajuste de los finales de carrera de una válvula motorizada?", explicacion: "Regular su posición para que el motor se detenga justo en apertura o cierre totales.", dificultad: "dificil", opciones: ["Regular su posición para detener el motor en apertura o cierre totales", "Sustituir por completo el motorreductor de la válvula", "Aumentar de forma permanente la velocidad de giro del motor", "Desconectar de forma permanente la protección térmica del motor"], correcta: 0 },
  { enunciado: "¿Qué norma regula, en su vertiente eléctrica, la protección de los motores de un cuadro de maniobras?", explicacion: "El REBT (RD 842/2002) y su ITC-BT-47.", dificultad: "dificil", opciones: ["El REBT (RD 842/2002) y su ITC-BT-47", "La Ordenanza Municipal para la Ecoeficiencia del Agua", "El Real Decreto 140/2003 de calidad del agua de consumo humano", "La norma UNE-EN 1074 sobre válvulas para el suministro de agua"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 16 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 16, orden: 16, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-196 creado y vinculado como Tema 16 de Oficial Guardallaves.");
