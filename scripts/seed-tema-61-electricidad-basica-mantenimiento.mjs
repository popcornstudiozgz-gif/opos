/**
 * Crea el tema canónico tema-61: "Electricidad básica: unidades, instalaciones
 * interiores de baja tensión y averías" y lo asigna como Tema 7 (primer tema
 * de la parte específica, numero=7, bloque-2) de la oposición Oficial
 * Mantenimiento General (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 5 oficial del Anexo I (bases2110.pdf), "Parte
 * segunda" de Oficial Mantenimiento General:
 *   "Electricidad: Definición de unidades de medida. Instalaciones básicas
 *   interiores de baja tensión. Tipos de averías y reparaciones:
 *   cortocircuitos, clavijas, enchufes e interruptores, fluorescentes.
 *   Reconocimiento de herramientas."
 *
 * Fuente primaria: Real Decreto 842/2002, de 2 de agosto, por el que se
 * aprueba el Reglamento electrotécnico para baja tensión (REBT,
 * BOE-A-2002-18099) — en concreto la ITC-BT-25 (instalaciones interiores en
 * viviendas: grados de electrificación y número de circuitos) y la
 * ITC-BT-24 (protección contra contactos directos e indirectos: interruptor
 * diferencial). Verificado en este turno (búsqueda + confirmación del
 * título e identificador BOE reales). Las unidades de medida (voltio,
 * amperio, ohmio, vatio, ley de Ohm) y las averías/herramientas típicas son
 * conocimiento técnico consolidado del oficio de electricidad, tratado sin
 * forzar cita legal artículo a artículo, igual que el criterio ya aplicado
 * en los temas de materiales y herramientas de Oficial Albañil (ver
 * scripts/seed-tema-45-materiales-herramientas-albanileria.mjs).
 *
 * Tres secciones:
 * 1. unidades-medida-electricas — magnitudes eléctricas básicas y ley de Ohm.
 * 2. instalaciones-basicas-interiores-bt — elementos de una instalación
 *    interior de baja tensión (cuadro, ICP, diferencial, magnetotérmicos,
 *    circuitos independientes) según el REBT.
 * 3. averias-reparaciones-herramientas-electricidad — averías típicas
 *    (cortocircuitos, clavijas, enchufes, interruptores, fluorescentes) y
 *    herramientas del electricista.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-61-electricidad-basica-mantenimiento.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!URL_BASE || !SERVICE_KEY) {
  console.error("❌ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-61";
const OPOSICION = "oficial-mantenimiento-ayto-zaragoza";
const BLOQUE_2_ID = "336de420-fb74-4814-9d50-6e2981ed064f";
const REBT = "https://www.boe.es/buscar/act.php?id=BOE-A-2002-18099";

async function insertar(tabla, filas) {
  const res = await fetch(`${URL_BASE}/rest/v1/${tabla}`, {
    method: "POST",
    headers: { ...HEADERS, Prefer: "return=representation" },
    body: JSON.stringify(filas),
  });
  if (!res.ok) {
    console.error(`❌ Error insertando en ${tabla}: ${res.status} ${await res.text()}`);
    process.exit(1);
  }
  return res.json();
}

async function upsert(tabla, filas, onConflict) {
  const res = await fetch(`${URL_BASE}/rest/v1/${tabla}?on_conflict=${onConflict}`, {
    method: "POST",
    headers: { ...HEADERS, Prefer: "resolution=merge-duplicates,return=representation" },
    body: JSON.stringify(filas),
  });
  if (!res.ok) {
    console.error(`❌ Error insertando en ${tabla}: ${res.status} ${await res.text()}`);
    process.exit(1);
  }
  return res.json();
}

async function insertarPreguntasConOpciones(seccion, preguntas) {
  const filas = preguntas.map(({ opciones, correcta, ...p }) => ({ ...p, tema_slug: TEMA, seccion }));
  const insertadas = await insertar("preguntas", filas);
  console.log(`   ✓ preguntas: ${insertadas.length} filas`);
  const filasOpciones = insertadas.flatMap((pregunta, i) =>
    preguntas[i].opciones.map((texto, orden) => ({
      pregunta_id: pregunta.id,
      texto,
      es_correcta: orden === preguntas[i].correcta,
      orden,
    })),
  );
  const opcionesInsertadas = await insertar("opciones", filasOpciones);
  console.log(`   ✓ opciones: ${opcionesInsertadas.length} filas`);
}

// ─────────────────────────────────────────────────────────────────────────
// Tema canónico
// ─────────────────────────────────────────────────────────────────────────
console.log(`📚 Creando ${TEMA}...`);
await insertar("temas", [
  {
    slug: TEMA,
    titulo: "Electricidad básica: unidades, instalaciones interiores y averías",
    descripcion: "Definición de unidades de medida eléctricas. Instalaciones básicas interiores de baja tensión. Tipos de averías y reparaciones. Reconocimiento de herramientas.",
    contenido:
      "Desarrolla las magnitudes eléctricas básicas (tensión, intensidad, resistencia, potencia) y la ley de Ohm; los elementos de una instalación interior de baja tensión (cuadro general de mando y protección, ICP, interruptor diferencial, interruptores magnetotérmicos, circuitos independientes) según el Reglamento electrotécnico para baja tensión; y las averías más frecuentes (cortocircuitos, clavijas, enchufes, interruptores, fluorescentes) junto con las herramientas básicas del electricista.",
    enlaces_boe: [
      { url: REBT, titulo: "RD 842/2002 — Reglamento electrotécnico para baja tensión (REBT)" },
    ],
    indice_estudio: [
      { url: "", titulo: "Unidades de medida eléctricas y ley de Ohm", seccion: "unidades-medida-electricas", articulos: "Conceptos fundamentales" },
      { url: REBT, titulo: "Instalaciones básicas interiores de baja tensión", seccion: "instalaciones-basicas-interiores-bt", articulos: "ITC-BT-24, ITC-BT-25" },
      { url: "", titulo: "Averías, reparaciones y herramientas del electricista", seccion: "averias-reparaciones-herramientas-electricidad", articulos: "Conceptos fundamentales" },
    ],
  },
]);

// ─────────────────────────────────────────────────────────────────────────
// Sección 1: unidades-medida-electricas
// ─────────────────────────────────────────────────────────────────────────
const S1 = "unidades-medida-electricas";
console.log(`📝 flashcards (${S1})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Qué magnitud mide el voltio (V)?", reverso: "La tensión o diferencia de potencial eléctrico entre dos puntos de un circuito" },
    { anverso: "¿Qué magnitud mide el amperio (A)?", reverso: "La intensidad de corriente eléctrica, es decir, la cantidad de carga que circula por un conductor en la unidad de tiempo" },
    { anverso: "¿Qué magnitud mide el ohmio (Ω)?", reverso: "La resistencia eléctrica, es decir, la oposición de un material al paso de la corriente" },
    { anverso: "¿Qué magnitud mide el vatio (W)?", reverso: "La potencia eléctrica, es decir, la energía consumida o generada por unidad de tiempo" },
    { anverso: "¿Cuál es el enunciado de la ley de Ohm?", reverso: "La intensidad que recorre un conductor es directamente proporcional a la tensión aplicada e inversamente proporcional a su resistencia: I = V / R" },
    { anverso: "¿Cómo se calcula la potencia eléctrica en corriente continua a partir de tensión e intensidad?", reverso: "P = V × I (potencia en vatios = tensión en voltios por intensidad en amperios)" },
    { anverso: "¿Qué diferencia hay entre corriente continua (CC) y corriente alterna (CA)?", reverso: "La corriente continua mantiene siempre el mismo sentido de circulación; la corriente alterna invierte periódicamente su sentido, siguiendo una forma de onda senoidal" },
    { anverso: "¿Qué es la frecuencia de una corriente alterna y en qué unidad se mide?", reverso: "El número de ciclos completos que realiza la onda por segundo; se mide en hercios (Hz). En España la red eléctrica funciona a 50 Hz" },
    { anverso: "¿Qué tensiones nominales son habituales en una vivienda española?", reverso: "230 V en instalación monofásica (entre fase y neutro) y 400 V en instalación trifásica (entre fases)" },
    { anverso: "¿Qué es el kilovatio-hora (kWh) y para qué se usa?", reverso: "Es una unidad de energía (no de potencia): la energía consumida por un aparato de 1 kW de potencia funcionando durante 1 hora; es la unidad en que se factura el consumo eléctrico" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })),
);

console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué magnitud eléctrica se mide en voltios?", explicacion: "El voltio es la unidad de tensión o diferencia de potencial.", dificultad: "facil", opciones: ["La tensión", "La intensidad", "La resistencia", "La potencia"], correcta: 0 },
  { enunciado: "¿Qué magnitud eléctrica se mide en amperios?", explicacion: "El amperio es la unidad de intensidad de corriente.", dificultad: "facil", opciones: ["La intensidad de corriente", "La tensión", "La resistencia", "La energía"], correcta: 0 },
  { enunciado: "Según la ley de Ohm, ¿cómo se relacionan tensión, intensidad y resistencia?", explicacion: "I = V / R: la intensidad es directamente proporcional a la tensión e inversamente proporcional a la resistencia.", dificultad: "media", opciones: ["I = V / R", "V = I / R", "R = I / P", "P = R / V"], correcta: 0 },
  { enunciado: "¿Cómo se calcula la potencia eléctrica a partir de la tensión y la intensidad?", explicacion: "P = V × I.", dificultad: "media", opciones: ["P = V × I", "P = V / I", "P = I / V", "P = V + I"], correcta: 0 },
  { enunciado: "¿Qué caracteriza a la corriente alterna frente a la continua?", explicacion: "Invierte periódicamente su sentido, siguiendo una onda senoidal.", dificultad: "media", opciones: ["Invierte periódicamente su sentido de circulación", "Mantiene siempre el mismo sentido", "No tiene frecuencia", "Solo se usa en corriente de baja tensión"], correcta: 0 },
  { enunciado: "¿A qué frecuencia funciona la red eléctrica en España?", explicacion: "A 50 Hz.", dificultad: "facil", opciones: ["50 Hz", "60 Hz", "100 Hz", "230 Hz"], correcta: 0 },
  { enunciado: "¿Qué tensión nominal es habitual entre fase y neutro en una instalación monofásica de vivienda?", explicacion: "230 V.", dificultad: "facil", opciones: ["230 V", "400 V", "125 V", "24 V"], correcta: 0 },
  { enunciado: "¿Qué mide el kilovatio-hora (kWh)?", explicacion: "Es una unidad de energía, no de potencia: la energía consumida por 1 kW de potencia durante 1 hora.", dificultad: "dificil", opciones: ["Energía consumida", "Potencia instantánea", "Resistencia de un conductor", "Frecuencia de la red"], correcta: 0 },
]);

// ─────────────────────────────────────────────────────────────────────────
// Sección 2: instalaciones-basicas-interiores-bt
// ─────────────────────────────────────────────────────────────────────────
const S2 = "instalaciones-basicas-interiores-bt";
console.log(`📝 flashcards (${S2})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Qué reglamento regula las instalaciones eléctricas de baja tensión en España?", reverso: "El Reglamento electrotécnico para baja tensión (REBT), aprobado por el Real Decreto 842/2002, de 2 de agosto, junto con sus Instrucciones Técnicas Complementarias (ITC-BT)" },
    { anverso: "¿Qué es el Cuadro General de Mando y Protección (CGMP) de una vivienda?", reverso: "El cuadro donde se instalan los dispositivos generales de mando y protección de la instalación interior: ICP, interruptor diferencial y los interruptores magnetotérmicos de cada circuito" },
    { anverso: "¿Qué función tiene el ICP (Interruptor de Control de Potencia)?", reverso: "Limitar automáticamente la potencia consumida a la contratada, desconectando el suministro si se supera" },
    { anverso: "¿Qué función tiene el interruptor diferencial?", reverso: "Proteger a las personas frente a contactos eléctricos indirectos, desconectando el circuito cuando detecta una fuga de corriente hacia tierra por encima de su sensibilidad (habitualmente 30 mA en instalaciones de vivienda)" },
    { anverso: "¿Qué función tiene un interruptor magnetotérmico (PIA)?", reverso: "Proteger cada circuito frente a sobrecargas (mediante su elemento térmico) y cortocircuitos (mediante su elemento magnético), desconectando automáticamente el circuito afectado" },
    { anverso: "¿Qué es la puesta a tierra de una instalación eléctrica?", reverso: "La conexión de las masas metálicas de los aparatos a un electrodo enterrado, para derivar a tierra las corrientes de defecto y permitir que actúe el interruptor diferencial" },
    { anverso: "¿Qué es el grado de electrificación de una vivienda según el REBT?", reverso: "El nivel de previsión de potencia y número mínimo de circuitos independientes de una vivienda (básico o elevado), regulado en la ITC-BT-25" },
    { anverso: "Cita tres circuitos independientes típicos de una vivienda según la ITC-BT-25", reverso: "C1 (iluminación), C2 (tomas de uso general) y C3 (cocina y horno), entre otros circuitos específicos como el de lavadora/lavavajillas o el de baño" },
    { anverso: "¿Por qué se instalan circuitos independientes en una instalación interior?", reverso: "Para que una avería o sobrecarga en un circuito (por ejemplo, la cocina) no deje sin servicio al resto de la vivienda, y para dimensionar cada circuito según su consumo previsto" },
    { anverso: "¿Qué distingue a un contacto eléctrico directo de uno indirecto?", reverso: "El directo es el contacto de una persona con una parte activa en tensión (un cable pelado, por ejemplo); el indirecto es el contacto con una masa metálica que accidentalmente ha quedado en tensión por un fallo de aislamiento" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })),
);

console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué norma aprueba el Reglamento electrotécnico para baja tensión (REBT)?", explicacion: "El Real Decreto 842/2002, de 2 de agosto.", dificultad: "media", opciones: ["El Real Decreto 842/2002, de 2 de agosto", "El Real Decreto 1627/1997", "La Ley 31/1995 de PRL", "El Real Decreto 773/1997"], correcta: 0 },
  { enunciado: "¿Qué elementos se instalan típicamente en el Cuadro General de Mando y Protección de una vivienda?", explicacion: "ICP, interruptor diferencial y los magnetotérmicos de cada circuito.", dificultad: "media", opciones: ["ICP, interruptor diferencial y magnetotérmicos", "Solo el contador de energía", "Solo la toma de tierra", "Solo los fusibles de la acometida"], correcta: 0 },
  { enunciado: "¿Qué función cumple el interruptor diferencial?", explicacion: "Protege a las personas frente a contactos indirectos, detectando fugas de corriente a tierra.", dificultad: "media", opciones: ["Proteger frente a contactos indirectos detectando fugas a tierra", "Limitar la potencia contratada", "Proteger frente a cortocircuitos únicamente", "Medir el consumo de energía"], correcta: 0 },
  { enunciado: "¿Qué protege un interruptor magnetotérmico (PIA)?", explicacion: "Cada circuito frente a sobrecargas y cortocircuitos.", dificultad: "media", opciones: ["Sobrecargas y cortocircuitos de un circuito", "Solo fugas a tierra", "Solo el exceso de potencia contratada", "Solo las subidas de tensión"], correcta: 0 },
  { enunciado: "¿Qué sensibilidad de interruptor diferencial es habitual en instalaciones de vivienda?", explicacion: "30 mA, adecuada para la protección de personas.", dificultad: "dificil", opciones: ["30 mA", "300 mA", "3 A", "30 A"], correcta: 0 },
  { enunciado: "¿Qué instrucción técnica complementaria del REBT regula las instalaciones interiores en viviendas y sus circuitos?", explicacion: "La ITC-BT-25.", dificultad: "dificil", opciones: ["ITC-BT-25", "ITC-BT-52", "ITC-BT-06", "ITC-BT-40"], correcta: 0 },
  { enunciado: "¿Para qué se instalan circuitos independientes en una vivienda?", explicacion: "Para que una avería en uno no afecte al resto y para dimensionar cada circuito según su consumo.", dificultad: "media", opciones: ["Para aislar averías y dimensionar según consumo", "Para reducir el número de enchufes", "Porque lo exige únicamente la compañía eléctrica", "Para evitar instalar el diferencial"], correcta: 0 },
  { enunciado: "¿Qué diferencia hay entre un contacto eléctrico directo y uno indirecto?", explicacion: "El directo es con una parte activa en tensión; el indirecto, con una masa que ha quedado accidentalmente en tensión.", dificultad: "media", opciones: ["El directo es con una parte activa; el indirecto, con una masa en tensión por fallo", "Son sinónimos", "El indirecto solo ocurre en corriente continua", "El directo solo ocurre en instalaciones trifásicas"], correcta: 0 },
]);

// ─────────────────────────────────────────────────────────────────────────
// Sección 3: averias-reparaciones-herramientas-electricidad
// ─────────────────────────────────────────────────────────────────────────
const S3 = "averias-reparaciones-herramientas-electricidad";
console.log(`📝 flashcards (${S3})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Qué es un cortocircuito?", reverso: "Un contacto directo entre dos conductores a distinto potencial (por ejemplo, fase y neutro) que provoca una intensidad muy elevada y el disparo inmediato del elemento magnético del magnetotérmico" },
    { anverso: "¿Qué es una sobrecarga eléctrica?", reverso: "Una circulación de intensidad superior a la nominal del circuito, mantenida en el tiempo (por ejemplo, por conectar demasiados aparatos), que hace actuar el elemento térmico del magnetotérmico" },
    { anverso: "¿Qué es una clavija (o enchufe macho) y qué es una base de enchufe (enchufe hembra)?", reverso: "La clavija es la pieza con los contactos salientes que se conecta a la instalación; la base o enchufe hembra es la pieza fija en la pared o el aparato que recibe la clavija" },
    { anverso: "¿Qué tipo de clavija/base es la estándar (\"schuko\") en instalaciones domésticas españolas?", reverso: "La clavija tipo F (schuko), con dos contactos redondos y toma de tierra lateral, normalizada para 16 A / 250 V" },
    { anverso: "Cita dos averías típicas en un interruptor convencional", reverso: "Desgaste o rotura del mecanismo de conmutación (no hace contacto) y falso contacto por aflojamiento de los bornes de conexión" },
    { anverso: "¿Qué es el cebador (o starter) de un tubo fluorescente y qué avería típica provoca?", reverso: "Un pequeño dispositivo que facilita el encendido del tubo; cuando falla, es la causa más habitual del parpadeo continuo o de que el tubo no encienda" },
    { anverso: "¿Qué es la reactancia (o balasto) de un tubo fluorescente?", reverso: "Un elemento (bobina) que limita la corriente que circula por el tubo una vez encendido; su fallo o zumbido es otra causa habitual de avería en luminarias fluorescentes" },
    { anverso: "¿Para qué se usa un comprobador de fase o buscapolos?", reverso: "Para detectar, mediante un destornillador con neón o electrónico, si un conductor o punto de la instalación está en tensión (es fase) antes de manipularlo" },
    { anverso: "¿Para qué se usa un multímetro (polímetro)?", reverso: "Para medir tensión, intensidad y resistencia (y comprobar continuidad) en un circuito o componente eléctrico, como herramienta básica de diagnóstico de averías" },
    { anverso: "¿Por qué debe usarse herramienta con mango aislado (destornilladores, alicates) en trabajos eléctricos?", reverso: "Para proteger al operario frente al riesgo de contacto eléctrico directo mientras manipula partes de la instalación que puedan estar en tensión" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })),
);

console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué provoca un cortocircuito?", explicacion: "Un contacto directo entre conductores a distinto potencial, con una intensidad muy elevada.", dificultad: "media", opciones: ["Un contacto directo entre conductores a distinto potencial", "Un exceso de consumo mantenido en el tiempo", "Un fallo del interruptor diferencial", "Una bajada de tensión en la red"], correcta: 0 },
  { enunciado: "¿Qué diferencia una sobrecarga de un cortocircuito?", explicacion: "La sobrecarga es una intensidad superior a la nominal mantenida en el tiempo; el cortocircuito es un contacto directo con intensidad muy elevada e instantánea.", dificultad: "media", opciones: ["La sobrecarga es mantenida en el tiempo; el cortocircuito es instantáneo y de mayor intensidad", "Son exactamente el mismo fenómeno", "La sobrecarga solo ocurre en corriente continua", "El cortocircuito nunca hace saltar el magnetotérmico"], correcta: 0 },
  { enunciado: "¿Qué tipo de clavija es la estándar en las instalaciones domésticas españolas?", explicacion: "La clavija tipo F o 'schuko', con toma de tierra lateral.", dificultad: "facil", opciones: ["Tipo F (schuko)", "Tipo A (sin toma de tierra, EE. UU.)", "Tipo G (Reino Unido)", "Tipo C (europlug, sin tierra)"], correcta: 0 },
  { enunciado: "¿Cuál es una causa habitual de que un tubo fluorescente parpadee sin encender?", explicacion: "El fallo del cebador (starter).", dificultad: "media", opciones: ["El fallo del cebador", "El exceso de tensión de red", "Un fallo en el interruptor diferencial", "Un fallo en la toma de tierra"], correcta: 0 },
  { enunciado: "¿Qué función cumple la reactancia (balasto) en una luminaria fluorescente?", explicacion: "Limita la corriente que circula por el tubo una vez encendido.", dificultad: "dificil", opciones: ["Limita la corriente por el tubo encendido", "Enciende el tubo instantáneamente sin cebador", "Sustituye a la clavija de conexión", "Mide el consumo de la luminaria"], correcta: 0 },
  { enunciado: "¿Para qué se emplea un comprobador de fase o buscapolos?", explicacion: "Para detectar si un punto de la instalación está en tensión antes de manipularlo.", dificultad: "facil", opciones: ["Para detectar si un punto está en tensión", "Para medir la potencia contratada", "Para sustituir al interruptor diferencial", "Para amasar mortero eléctrico"], correcta: 0 },
  { enunciado: "¿Qué mide un multímetro (polímetro)?", explicacion: "Tensión, intensidad, resistencia y continuidad.", dificultad: "facil", opciones: ["Tensión, intensidad, resistencia y continuidad", "Solo la potencia contratada", "Solo la frecuencia de red", "Solo el grado de electrificación"], correcta: 0 },
  { enunciado: "¿Por qué es importante que la herramienta usada en trabajos eléctricos tenga el mango aislado?", explicacion: "Para proteger al operario del riesgo de contacto eléctrico directo.", dificultad: "media", opciones: ["Para proteger frente al riesgo de contacto eléctrico directo", "Para que dure más tiempo", "Porque lo exige el fabricante del tubo fluorescente", "Para facilitar la medición con el multímetro"], correcta: 0 },
]);

// ─────────────────────────────────────────────────────────────────────────
// Vincular a la oposición (Tema 7 — primer tema de la parte específica)
// ─────────────────────────────────────────────────────────────────────────
console.log(`\n🔗 Vinculando ${TEMA} como Tema 7 de ${OPOSICION}...`);
await upsert(
  "tema_oposicion",
  [
    {
      tema_slug: TEMA,
      oposicion_slug: OPOSICION,
      bloque_id: BLOQUE_2_ID,
      numero: 7,
      orden: 7,
      es_premium: false,
      publicado: true,
      secciones_incluidas: null,
    },
  ],
  "tema_slug,oposicion_slug"
);

console.log("\n✅ tema-61 creado y vinculado como Tema 7 de Oficial Mantenimiento General.");
