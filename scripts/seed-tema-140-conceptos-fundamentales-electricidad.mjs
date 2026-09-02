/**
 * Crea tema-140: "Conceptos fundamentales de electricidad" — Tema 8
 * (numero=8, bloque-2) de Oficial Electricista (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 6 oficial del Anexo I (bases2110.pdf, línea 1320):
 *   "Conceptos Fundamentales de Electricidad. Magnitudes eléctricas
 *   básicas: Tensión, Intensidad, Resistencia, Potencia y Energía. Ley de
 *   Ohm y Leyes de Kirchhoff. Circuitos en serie, paralelo y mixtos.
 *   Corriente continua (CC) y corriente alterna (CA)."
 *
 * Conocimiento técnico consolidado de electrotecnia básica (magnitudes
 * eléctricas, ley de Ohm, leyes de Kirchhoff, análisis de circuitos,
 * corriente continua y alterna): fundamentos de física/electrotecnia de
 * validez universal, sin una ley española específica que los defina —
 * criterio ya aplicado en Oficial Carpintero (ver
 * scripts/seed-tema-108-*.mjs y siguientes) para contenido técnico del
 * oficio sin ley única que lo regule. Búsqueda previa realizada conforme
 * al estándar de sourcing del proyecto: no existe reglamento español que
 * "regule" la ley de Ohm o las leyes de Kirchhoff, al ser leyes físicas,
 * no disposiciones normativas.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-140-conceptos-fundamentales-electricidad.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-140";
const OPOSICION = "oficial-electricista-ayto-zaragoza";
const BLOQUE_2_ID = "4dbd9335-cb26-48e5-a83b-aef9eeb23097";

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
  titulo: "Conceptos fundamentales de electricidad",
  descripcion: "Magnitudes eléctricas básicas: tensión, intensidad, resistencia, potencia y energía. Ley de Ohm y leyes de Kirchhoff. Circuitos en serie, paralelo y mixtos. Corriente continua (CC) y corriente alterna (CA).",
  contenido: "Desarrolla los fundamentos de electrotecnia básica: las magnitudes eléctricas fundamentales (tensión, intensidad, resistencia, potencia y energía) y sus unidades del Sistema Internacional; la Ley de Ohm y las Leyes de Kirchhoff (de nudos o corrientes, y de mallas o tensiones) como herramientas de análisis de circuitos; la resolución de circuitos en serie, en paralelo y mixtos; y las diferencias fundamentales entre corriente continua (CC) y corriente alterna (CA).",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "Magnitudes eléctricas básicas: tensión, intensidad, resistencia, potencia y energía", seccion: "magnitudes-electricas-basicas-tension-intensidad-resistencia", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Ley de Ohm y Leyes de Kirchhoff. Circuitos en serie, paralelo y mixtos", seccion: "ley-ohm-leyes-kirchhoff-circuitos-serie-paralelo-mixto", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Corriente continua (CC) y corriente alterna (CA)", seccion: "corriente-continua-corriente-alterna", articulos: "Conceptos fundamentales" },
  ],
}]);

const S1 = "magnitudes-electricas-basicas-tension-intensidad-resistencia";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es la tensión o diferencia de potencial eléctrico y en qué unidad se mide?", reverso: "La magnitud que expresa la diferencia de energía potencial eléctrica entre dos puntos de un circuito, que impulsa el movimiento de las cargas; se mide en voltios (V)" },
  { anverso: "¿Qué es la intensidad de corriente eléctrica y en qué unidad se mide?", reverso: "La cantidad de carga eléctrica que atraviesa la sección de un conductor por unidad de tiempo; se mide en amperios (A)" },
  { anverso: "¿Qué es la resistencia eléctrica y en qué unidad se mide?", reverso: "La oposición que ofrece un material al paso de la corriente eléctrica; se mide en ohmios (Ω)" },
  { anverso: "¿Qué es la potencia eléctrica y en qué unidad se mide?", reverso: "La cantidad de energía eléctrica consumida o generada por unidad de tiempo; se mide en vatios (W)" },
  { anverso: "¿Qué es la energía eléctrica y en qué unidad se factura habitualmente?", reverso: "El trabajo realizado por la corriente eléctrica a lo largo de un tiempo determinado; se factura habitualmente en kilovatios-hora (kWh)" },
  { anverso: "¿Qué relación existe entre potencia, tensión e intensidad en corriente continua?", reverso: "P = V × I (la potencia en vatios es igual al producto de la tensión en voltios por la intensidad en amperios)" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿En qué unidad se mide la tensión eléctrica?", explicacion: "En voltios (V).", dificultad: "facil", opciones: ["Voltios (V)", "Amperios (A)", "Ohmios (Ω)", "Vatios (W)"], correcta: 0 },
  { enunciado: "¿En qué unidad se mide la intensidad de corriente eléctrica?", explicacion: "En amperios (A).", dificultad: "facil", opciones: ["Amperios (A)", "Voltios (V)", "Ohmios (Ω)", "Julios (J)"], correcta: 0 },
  { enunciado: "¿En qué unidad se mide la resistencia eléctrica?", explicacion: "En ohmios (Ω).", dificultad: "facil", opciones: ["Ohmios (Ω)", "Voltios (V)", "Amperios (A)", "Vatios (W)"], correcta: 0 },
  { enunciado: "¿Qué magnitud expresa la cantidad de energía eléctrica consumida por unidad de tiempo?", explicacion: "La potencia eléctrica, medida en vatios.", dificultad: "media", opciones: ["La potencia", "La resistencia", "La intensidad", "La tensión"], correcta: 0 },
  { enunciado: "¿Cuál es la fórmula de la potencia eléctrica en corriente continua en función de la tensión y la intensidad?", explicacion: "P = V × I.", dificultad: "media", opciones: ["P = V × I", "P = V / I", "P = V + I", "P = V − I"], correcta: 0 },
  { enunciado: "¿En qué unidad se factura habitualmente la energía eléctrica consumida en una vivienda?", explicacion: "En kilovatios-hora (kWh).", dificultad: "facil", opciones: ["Kilovatios-hora (kWh)", "Amperios-hora (Ah)", "Ohmios (Ω)", "Voltios (V)"], correcta: 0 },
]);

const S2 = "ley-ohm-leyes-kirchhoff-circuitos-serie-paralelo-mixto";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué establece la Ley de Ohm?", reverso: "Que la intensidad que circula por un conductor es directamente proporcional a la tensión aplicada e inversamente proporcional a su resistencia: I = V / R" },
  { anverso: "¿Qué establece la primera Ley de Kirchhoff (ley de nudos o de corrientes)?", reverso: "Que la suma de las intensidades que entran en un nudo de un circuito es igual a la suma de las intensidades que salen de él" },
  { anverso: "¿Qué establece la segunda Ley de Kirchhoff (ley de mallas o de tensiones)?", reverso: "Que la suma algebraica de las tensiones (caídas y elevaciones) a lo largo de cualquier malla cerrada de un circuito es igual a cero" },
  { anverso: "¿Cómo se calcula la resistencia total de varias resistencias conectadas en serie?", reverso: "Sumando directamente el valor de cada una de ellas: Rt = R1 + R2 + R3 + ..." },
  { anverso: "¿Cómo se calcula la resistencia total de dos resistencias conectadas en paralelo?", reverso: "Mediante la fórmula del producto entre suma: Rt = (R1 × R2) / (R1 + R2)" },
  { anverso: "¿Qué característica define un circuito en serie respecto a la intensidad que circula por sus elementos?", reverso: "Que la misma intensidad circula por todos los elementos del circuito, mientras que la tensión total se reparte entre ellos" },
  { anverso: "¿Qué característica define un circuito en paralelo respecto a la tensión en sus elementos?", reverso: "Que todos los elementos conectados en paralelo están sometidos a la misma tensión, mientras que la intensidad total se reparte entre las distintas ramas" },
  { anverso: "¿Qué es un circuito mixto?", reverso: "Un circuito que combina agrupaciones de elementos en serie y en paralelo dentro de la misma red, requiriendo su reducción progresiva a un circuito equivalente para su análisis" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué establece la Ley de Ohm?", explicacion: "I = V / R: la intensidad es proporcional a la tensión e inversamente proporcional a la resistencia.", dificultad: "facil", opciones: ["I = V / R", "V = I + R", "R = V + I", "I = V × R"], correcta: 0 },
  { enunciado: "¿Qué establece la primera Ley de Kirchhoff (ley de nudos)?", explicacion: "La suma de intensidades entrantes en un nudo es igual a la suma de las salientes.", dificultad: "media", opciones: ["La suma de intensidades entrantes en un nudo es igual a la de las salientes", "La suma de tensiones en una malla cerrada es igual a la resistencia total", "La resistencia total de un circuito serie es igual al producto de las resistencias", "La intensidad total de un circuito paralelo es igual a la de una sola rama"], correcta: 0 },
  { enunciado: "¿Qué establece la segunda Ley de Kirchhoff (ley de mallas)?", explicacion: "La suma algebraica de tensiones en una malla cerrada es igual a cero.", dificultad: "media", opciones: ["La suma algebraica de tensiones en una malla cerrada es igual a cero", "La suma de intensidades en una malla cerrada es igual a la tensión total", "La resistencia total de un circuito paralelo es la suma de las resistencias", "La potencia total de un circuito es independiente de la tensión aplicada"], correcta: 0 },
  { enunciado: "En un circuito en serie, ¿qué magnitud es igual en todos sus elementos?", explicacion: "La intensidad de corriente.", dificultad: "media", opciones: ["La intensidad de corriente", "La tensión", "La resistencia", "La potencia"], correcta: 0 },
  { enunciado: "En un circuito en paralelo, ¿qué magnitud es igual en todas sus ramas?", explicacion: "La tensión.", dificultad: "media", opciones: ["La tensión", "La intensidad", "La resistencia total", "La energía consumida"], correcta: 0 },
  { enunciado: "¿Cómo se calcula la resistencia total de resistencias conectadas en serie?", explicacion: "Sumando directamente el valor de cada resistencia.", dificultad: "facil", opciones: ["Sumando directamente el valor de cada resistencia", "Mediante la inversa de la suma de las inversas", "Multiplicando el valor de cada resistencia", "Dividiendo la tensión total entre el número de resistencias"], correcta: 0 },
  { enunciado: "¿Qué es un circuito mixto?", explicacion: "Un circuito que combina agrupaciones en serie y en paralelo dentro de la misma red.", dificultad: "media", opciones: ["Un circuito que combina agrupaciones en serie y en paralelo", "Un circuito que solo admite corriente continua", "Un circuito sin ninguna resistencia conectada", "Un circuito compuesto exclusivamente por condensadores"], correcta: 0 },
]);

const S3 = "corriente-continua-corriente-alterna";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué caracteriza a la corriente continua (CC)?", reverso: "Que las cargas eléctricas circulan siempre en el mismo sentido y con un valor constante en el tiempo (por ejemplo, la suministrada por una batería)" },
  { anverso: "¿Qué caracteriza a la corriente alterna (CA)?", reverso: "Que la intensidad y la tensión varían periódicamente de valor y de sentido a lo largo del tiempo, siguiendo habitualmente una forma de onda senoidal" },
  { anverso: "¿Cuál es la frecuencia nominal de la red eléctrica de suministro en España?", reverso: "50 Hz (hercios), es decir, 50 ciclos completos de la onda senoidal por segundo" },
  { anverso: "¿Qué es el valor eficaz (RMS) de una corriente alterna?", reverso: "El valor de una corriente continua equivalente que produciría el mismo efecto térmico (disipación de calor) que la corriente alterna considerada; es el valor que habitualmente indican los aparatos de medida" },
  { anverso: "¿Qué diferencia fundamental existe entre un sistema monofásico y uno trifásico de corriente alterna?", reverso: "El monofásico dispone de una única fase y un neutro; el trifásico dispone de tres fases desfasadas 120° entre sí, permitiendo transportar más potencia con menor sección de conductor y alimentar motores trifásicos" },
  { anverso: "¿Por qué se emplea corriente alterna, y no continua, en el transporte y la distribución de energía eléctrica?", reverso: "Porque permite elevar y reducir su tensión de forma sencilla mediante transformadores, reduciendo las pérdidas en el transporte a largas distancias" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué caracteriza a la corriente continua?", explicacion: "Las cargas circulan siempre en el mismo sentido y con valor constante.", dificultad: "facil", opciones: ["Las cargas circulan siempre en el mismo sentido y con valor constante", "La intensidad varía periódicamente de sentido", "Solo existe en instalaciones de alta tensión", "No puede almacenarse en baterías"], correcta: 0 },
  { enunciado: "¿Qué caracteriza a la corriente alterna?", explicacion: "La intensidad y la tensión varían periódicamente de valor y sentido, habitualmente en forma senoidal.", dificultad: "facil", opciones: ["La intensidad y la tensión varían periódicamente de valor y sentido", "Las cargas circulan siempre en el mismo sentido", "Solo se emplea en circuitos electrónicos de baja potencia", "No puede transformarse mediante transformadores"], correcta: 0 },
  { enunciado: "¿Cuál es la frecuencia nominal de la red eléctrica española?", explicacion: "50 Hz.", dificultad: "media", opciones: ["50 Hz", "60 Hz", "100 Hz", "25 Hz"], correcta: 0 },
  { enunciado: "¿Qué es el valor eficaz (RMS) de una corriente alterna?", explicacion: "El valor de corriente continua equivalente que produciría el mismo efecto térmico.", dificultad: "dificil", opciones: ["El valor de corriente continua equivalente con el mismo efecto térmico", "El valor máximo o de pico de la onda senoidal", "El valor medio aritmético de la onda a lo largo de un ciclo", "La frecuencia de la onda expresada en hercios"], correcta: 0 },
  { enunciado: "¿Cuántas fases desfasadas entre sí tiene un sistema trifásico de corriente alterna, y con qué desfase?", explicacion: "Tres fases desfasadas 120° entre sí.", dificultad: "media", opciones: ["Tres fases desfasadas 120° entre sí", "Dos fases desfasadas 90° entre sí", "Cuatro fases desfasadas 90° entre sí", "Una única fase sin desfase"], correcta: 0 },
  { enunciado: "¿Por qué se emplea corriente alterna en el transporte de energía eléctrica a larga distancia?", explicacion: "Porque permite elevar y reducir su tensión fácilmente mediante transformadores, reduciendo pérdidas.", dificultad: "media", opciones: ["Porque permite elevar y reducir su tensión mediante transformadores", "Porque no genera ningún tipo de pérdida en el transporte", "Porque no puede convertirse nunca a corriente continua", "Porque su frecuencia es siempre constante en cualquier país"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 8 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 8, orden: 8, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-140 creado y vinculado como Tema 8 de Oficial Electricista.");
