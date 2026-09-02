/**
 * Crea tema-148: "Receptores eléctricos y motores de corriente alterna" —
 * Tema 16 (numero=16, bloque-2) de Oficial Electricista (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 14 oficial del Anexo I (bases2110.pdf, línea 1355):
 *   "Receptores Eléctricos y Motores de Corriente Alterna. Motores
 *   eléctricos monofásicos y trifásicos: principio de funcionamiento,
 *   constitución y conexionado (estrella y triángulo). Sistemas de
 *   arranque y protección de motores (guardamotores y relés térmicos)."
 *
 * Fuente primaria: Real Decreto 842/2002 (REBT) — BOE-A-2002-18099.
 * ITC-BT-47 (Motores: prescripciones de instalación, protección y
 * conexionado), ITC-BT-43 (receptores, prescripciones generales).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-148-receptores-motores-corriente-alterna.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-148";
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
  titulo: "Receptores eléctricos y motores de corriente alterna",
  descripcion: "Motores eléctricos monofásicos y trifásicos: principio de funcionamiento, constitución y conexionado (estrella y triángulo). Sistemas de arranque y protección de motores (guardamotores y relés térmicos).",
  contenido: "Desarrolla los motores eléctricos de corriente alterna, monofásicos y trifásicos: su principio de funcionamiento (campo magnético giratorio), su constitución (estátor y rotor) y su conexionado en estrella y en triángulo. Desarrolla también los sistemas de arranque de motores (directo, estrella-triángulo) y los dispositivos de protección específicos: guardamotores y relés térmicos, conforme a la ITC-BT-47 del REBT.",
  enlaces_boe: [
    { titulo: "Real Decreto 842/2002, Reglamento electrotécnico para baja tensión (ITC-BT-43, ITC-BT-47)", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2002-18099" },
  ],
  indice_estudio: [
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2002-18099", titulo: "Motores monofásicos y trifásicos: principio de funcionamiento", seccion: "motores-monofasicos-trifasicos-principio-funcionamiento", articulos: "ITC-BT-47" },
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2002-18099", titulo: "Constitución y conexionado: estrella y triángulo", seccion: "conexionado-estrella-triangulo", articulos: "ITC-BT-47" },
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2002-18099", titulo: "Sistemas de arranque y protección de motores", seccion: "sistemas-arranque-proteccion-motores", articulos: "ITC-BT-47" },
  ],
}]);

const S1 = "motores-monofasicos-trifasicos-principio-funcionamiento";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué instrucción técnica complementaria regula la instalación de motores eléctricos?", reverso: "La ITC-BT-47" },
  { anverso: "¿Cuál es el principio de funcionamiento básico de un motor de corriente alterna asíncrono?", reverso: "La creación de un campo magnético giratorio en el estátor, que induce corrientes en el rotor y genera un par de fuerzas que provoca su giro, siguiendo con cierto retraso (deslizamiento) la velocidad del campo giratorio" },
  { anverso: "¿Qué caracteriza a un motor monofásico frente a uno trifásico?", reverso: "El motor monofásico se alimenta con una única fase y neutro, y necesita un elemento auxiliar (condensador de arranque o espira de sombra) para generar el par de arranque inicial, ya que una única fase no crea por sí sola un campo giratorio" },
  { anverso: "¿Por qué un motor trifásico no necesita ningún elemento auxiliar para arrancar, a diferencia de uno monofásico?", reverso: "Porque las tres fases desfasadas 120° entre sí generan de forma natural un campo magnético giratorio capaz de producir par de arranque desde el primer instante" },
  { anverso: "¿Qué aplicaciones son más habituales para los motores monofásicos frente a los trifásicos?", reverso: "Los monofásicos se emplean en receptores de menor potencia y uso doméstico o de pequeño taller (bombas pequeñas, electrodomésticos); los trifásicos, en aplicaciones industriales y de mayor potencia, por su mejor rendimiento y funcionamiento más suave" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué instrucción técnica complementaria regula la instalación de motores eléctricos?", explicacion: "La ITC-BT-47.", dificultad: "media", opciones: ["La ITC-BT-47", "La ITC-BT-44", "La ITC-BT-43", "La ITC-BT-18"], correcta: 0 },
  { enunciado: "¿Cuál es el principio de funcionamiento básico de un motor de corriente alterna asíncrono?", explicacion: "Un campo magnético giratorio en el estátor induce corrientes en el rotor y genera par de giro.", dificultad: "media", opciones: ["Un campo magnético giratorio en el estátor induce corrientes en el rotor", "Una corriente continua constante circula directamente por el rotor", "Un campo eléctrico estático genera directamente el movimiento del eje", "La fricción mecánica entre estátor y rotor genera el movimiento"], correcta: 0 },
  { enunciado: "¿Por qué un motor monofásico necesita un elemento auxiliar para arrancar?", explicacion: "Porque una única fase no crea por sí sola un campo magnético giratorio.", dificultad: "dificil", opciones: ["Porque una única fase no crea por sí sola un campo giratorio", "Porque los motores monofásicos nunca pueden arrancar por sí mismos en ningún caso", "Porque la tensión monofásica es siempre insuficiente para cualquier motor", "Porque los motores monofásicos carecen de rotor en su constitución"], correcta: 0 },
  { enunciado: "¿Por qué un motor trifásico no necesita ningún elemento auxiliar para el arranque?", explicacion: "Las tres fases desfasadas 120° generan de forma natural un campo giratorio.", dificultad: "media", opciones: ["Las tres fases desfasadas generan de forma natural un campo giratorio", "Porque los motores trifásicos carecen de estátor en su constitución", "Porque la corriente trifásica siempre es de menor intensidad", "Porque los motores trifásicos funcionan exclusivamente en corriente continua"], correcta: 0 },
  { enunciado: "¿En qué tipo de aplicaciones son más habituales los motores trifásicos frente a los monofásicos?", explicacion: "Aplicaciones industriales y de mayor potencia.", dificultad: "media", opciones: ["Aplicaciones industriales y de mayor potencia", "Exclusivamente en pequeños electrodomésticos domésticos", "Exclusivamente en instalaciones de alumbrado de emergencia", "Exclusivamente en circuitos de corriente continua de baja tensión"], correcta: 0 },
]);

const S2 = "conexionado-estrella-triangulo";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Cuáles son las dos partes principales de la constitución de un motor eléctrico?", reverso: "El estátor (parte fija, con los devanados que generan el campo magnético) y el rotor (parte móvil, solidaria al eje, sobre la que actúa el par de fuerzas generado)" },
  { anverso: "¿Qué es la conexión en estrella de los devanados de un motor trifásico?", reverso: "La conexión en la que un extremo de cada uno de los tres devanados se une en un punto común (neutro de la conexión), quedando cada devanado sometido a la tensión de fase (menor que la tensión de línea)" },
  { anverso: "¿Qué es la conexión en triángulo de los devanados de un motor trifásico?", reverso: "La conexión en la que los tres devanados se unen formando un circuito cerrado, quedando cada devanado sometido directamente a la tensión de línea (mayor que la tensión de fase)" },
  { anverso: "¿Qué relación existe entre la tensión de línea y la tensión de fase en un sistema trifásico equilibrado?", reverso: "La tensión de línea es √3 (aproximadamente 1,73) veces la tensión de fase" },
  { anverso: "¿Dónde se indican, en la placa de características de un motor trifásico, las tensiones para las que está diseñado en conexión estrella y en triángulo?", reverso: "En la propia placa de características del motor, habitualmente con una indicación del tipo 400/230 V (estrella/triángulo) o similar, según el fabricante y el diseño del motor" },
  { anverso: "¿Qué consecuencia tendría conectar en triángulo un motor diseñado para funcionar en estrella a esa misma tensión de red?", reverso: "Cada devanado quedaría sometido a una tensión superior a la de diseño, generando una intensidad excesiva y un riesgo real de daño al motor por sobrecalentamiento" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Cuáles son las dos partes principales de la constitución de un motor eléctrico?", explicacion: "Estátor (fijo) y rotor (móvil).", dificultad: "facil", opciones: ["Estátor y rotor", "Contactor y relé térmico", "Diferencial y PIA", "Condensador y bobina"], correcta: 0 },
  { enunciado: "¿Qué caracteriza a la conexión en estrella de un motor trifásico?", explicacion: "Un extremo de cada devanado se une en un punto común, quedando cada devanado a tensión de fase.", dificultad: "media", opciones: ["Un extremo de cada devanado se une en un punto común", "Los tres devanados se unen formando un circuito cerrado", "Solo se conecta uno de los tres devanados del motor", "Los devanados se conectan directamente en serie con la red"], correcta: 0 },
  { enunciado: "¿Qué caracteriza a la conexión en triángulo de un motor trifásico?", explicacion: "Los devanados se unen formando un circuito cerrado, quedando cada uno a tensión de línea.", dificultad: "media", opciones: ["Los devanados se unen formando un circuito cerrado", "Un extremo de cada devanado se une en un punto común", "Solo se conecta uno de los tres devanados del motor", "Los devanados quedan completamente aislados entre sí"], correcta: 0 },
  { enunciado: "¿Qué relación existe entre la tensión de línea y la de fase en un sistema trifásico equilibrado?", explicacion: "La tensión de línea es √3 veces la tensión de fase.", dificultad: "dificil", opciones: ["La tensión de línea es √3 veces la tensión de fase", "Ambas tensiones son siempre exactamente iguales", "La tensión de fase es el doble de la tensión de línea", "No existe ninguna relación matemática entre ambas tensiones"], correcta: 0 },
  { enunciado: "¿Qué riesgo conlleva conectar en triángulo un motor diseñado para estrella a esa misma tensión de red?", explicacion: "Una tensión excesiva por devanado, con intensidad excesiva y riesgo de daño por sobrecalentamiento.", dificultad: "dificil", opciones: ["Una tensión excesiva por devanado, con riesgo de sobrecalentamiento", "Ningún riesgo relevante, siendo ambas conexiones equivalentes", "Una reducción automática de la potencia consumida por el motor", "Una inversión automática del sentido de giro del motor"], correcta: 0 },
]);

const S3 = "sistemas-arranque-proteccion-motores";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es el arranque directo de un motor trifásico?", reverso: "El sistema de arranque más sencillo, en el que el motor se conecta directamente a la tensión nominal de la red desde el primer instante, generando una intensidad de arranque elevada (varias veces la nominal)" },
  { anverso: "¿Qué es el arranque estrella-triángulo de un motor trifásico?", reverso: "Un sistema de arranque que conecta inicialmente el motor en estrella (menor tensión por devanado, menor intensidad de arranque) y, tras un breve periodo, conmuta automáticamente a la conexión en triángulo para el funcionamiento nominal" },
  { anverso: "¿Qué ventaja aporta el arranque estrella-triángulo frente al arranque directo?", reverso: "Reduce la intensidad de arranque demandada a la red (aproximadamente a un tercio de la del arranque directo), minimizando la caída de tensión y las perturbaciones que provoca sobre la instalación" },
  { anverso: "¿Qué es un guardamotor?", reverso: "Un dispositivo de protección específico para motores que combina la protección contra cortocircuitos (magnética) y contra sobrecargas (térmica), permitiendo además el mando manual del motor mediante su propio interruptor" },
  { anverso: "¿Qué es un relé térmico aplicado a la protección de motores?", reverso: "Un dispositivo que detecta la intensidad consumida por el motor y actúa desconectándolo cuando esta supera, de forma mantenida, el valor calibrado, protegiéndolo frente a sobrecargas que podrían dañar sus devanados por sobrecalentamiento" },
  { anverso: "¿Qué elemento de maniobra se combina habitualmente con el relé térmico para el control y protección de un motor en una instalación con contactores?", reverso: "Un contactor, que realiza la conexión y desconexión del motor mediante mando eléctrico, en combinación con el relé térmico, que protege frente a sobrecargas" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es el arranque directo de un motor trifásico?", explicacion: "La conexión directa a la tensión nominal de la red desde el primer instante.", dificultad: "facil", opciones: ["La conexión directa a la tensión nominal desde el primer instante", "La conexión inicial en estrella y posterior conmutación a triángulo", "Un arranque exclusivo de motores monofásicos", "Un arranque que requiere siempre un variador de frecuencia"], correcta: 0 },
  { enunciado: "¿Qué ventaja aporta el arranque estrella-triángulo frente al directo?", explicacion: "Reduce la intensidad de arranque demandada a la red.", dificultad: "media", opciones: ["Reduce la intensidad de arranque demandada a la red", "Aumenta la potencia nominal del motor de forma permanente", "Elimina por completo la necesidad de protección térmica", "Solo es aplicable a motores monofásicos de pequeña potencia"], correcta: 0 },
  { enunciado: "¿Qué es un guardamotor?", explicacion: "Combina protección contra cortocircuitos y sobrecargas, con mando manual del motor.", dificultad: "media", opciones: ["Un dispositivo que combina protección contra cortocircuitos y sobrecargas", "Un dispositivo exclusivo de protección contra sobretensiones transitorias", "Un dispositivo que mide únicamente la tensión de alimentación del motor", "Un dispositivo que sustituye por completo al interruptor diferencial"], correcta: 0 },
  { enunciado: "¿Qué función cumple el relé térmico en la protección de un motor?", explicacion: "Desconecta el motor ante una sobrecarga mantenida, protegiéndolo del sobrecalentamiento.", dificultad: "media", opciones: ["Desconecta el motor ante una sobrecarga mantenida", "Conecta y desconecta el motor mediante mando eléctrico habitual", "Genera el campo magnético giratorio necesario para el arranque", "Regula la velocidad de giro del motor de forma continua"], correcta: 0 },
  { enunciado: "¿Qué elemento se combina habitualmente con el relé térmico para el control de un motor mediante contactores?", explicacion: "Un contactor, que realiza la conexión y desconexión mediante mando eléctrico.", dificultad: "dificil", opciones: ["Un contactor", "Un interruptor diferencial exclusivamente", "Un protector contra sobretensiones transitorias", "Un transformador reductor de tensión"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 16 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 16, orden: 16, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-148 creado y vinculado como Tema 16 de Oficial Electricista.");
