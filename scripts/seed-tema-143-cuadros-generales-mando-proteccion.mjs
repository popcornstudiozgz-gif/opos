/**
 * Crea tema-143: "Cuadros Generales de Mando y Protección (CGMP)" — Tema 11
 * (numero=11, bloque-2) de Oficial Electricista (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 9 oficial del Anexo I (bases2110.pdf, línea 1332):
 *   "Cuadros Generales de Mando y Protección (CGMP). Composición y
 *   funciones de los elementos de protección: Interruptor General
 *   Automático (IGA), Interruptor Diferencial (ID), Pequeños
 *   Interruptores Automáticos (PIA) y Protectores contra Sobretensiones
 *   (permanentes y transitorias)."
 *
 * Fuente primaria: Real Decreto 842/2002 (REBT) — BOE-A-2002-18099.
 * ITC-BT-17 (dispositivos generales e individuales de mando y
 * protección), ITC-BT-22 (protección contra sobreintensidades),
 * ITC-BT-23 (protección contra sobretensiones), ITC-BT-24 (protección
 * contra contactos directos e indirectos, aplicable al interruptor
 * diferencial).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-143-cuadros-generales-mando-proteccion.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-143";
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
  titulo: "Cuadros Generales de Mando y Protección (CGMP)",
  descripcion: "Composición y funciones de los elementos de protección: Interruptor General Automático (IGA), Interruptor Diferencial (ID), Pequeños Interruptores Automáticos (PIA) y protectores contra sobretensiones (permanentes y transitorias).",
  contenido: "Desarrolla el Cuadro General de Mando y Protección (CGMP) de una instalación interior, situado tras la Derivación Individual, y los elementos de protección que aloja: el Interruptor General Automático (IGA), el Interruptor Diferencial (ID), los Pequeños Interruptores Automáticos (PIA) de cada circuito, y los protectores contra sobretensiones permanentes y transitorias.",
  enlaces_boe: [
    { titulo: "Real Decreto 842/2002, Reglamento electrotécnico para baja tensión (ITC-BT-17, ITC-BT-22, ITC-BT-23)", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2002-18099" },
  ],
  indice_estudio: [
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2002-18099", titulo: "Composición del CGMP e Interruptor General Automático (IGA)", seccion: "composicion-cuadro-general-mando-proteccion-iga", articulos: "ITC-BT-17" },
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2002-18099", titulo: "Interruptor Diferencial (ID) y Pequeños Interruptores Automáticos (PIA)", seccion: "interruptor-diferencial-pia", articulos: "ITC-BT-17, ITC-BT-22, ITC-BT-24" },
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2002-18099", titulo: "Protectores contra sobretensiones permanentes y transitorias", seccion: "protectores-sobretensiones-permanentes-transitorias", articulos: "ITC-BT-23" },
  ],
}]);

const S1 = "composicion-cuadro-general-mando-proteccion-iga";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es el Cuadro General de Mando y Protección (CGMP)?", reverso: "El conjunto de dispositivos generales e individuales de mando y protección de una instalación interior, situado inmediatamente después de la Derivación Individual y el ICP" },
  { anverso: "¿Qué instrucción técnica complementaria regula los dispositivos generales e individuales de mando y protección del CGMP?", reverso: "La ITC-BT-17" },
  { anverso: "¿Qué es el Interruptor General Automático (IGA)?", reverso: "El dispositivo que permite el corte omnipolar (de todas las fases y el neutro) de la instalación interior completa, protegiendo frente a sobrecargas y cortocircuitos en el origen de la instalación" },
  { anverso: "¿Qué función principal cumple el IGA dentro del CGMP?", reverso: "Proteger la instalación interior frente a sobreintensidades (sobrecargas y cortocircuitos) y permitir su desconexión general de forma manual" },
  { anverso: "¿Dónde se sitúa el IGA respecto al resto de elementos del CGMP?", reverso: "En el origen del cuadro, aguas arriba del resto de dispositivos de protección (diferencial y pequeños interruptores automáticos de cada circuito)" },
  { anverso: "¿Qué es el corte omnipolar de un dispositivo de protección?", reverso: "La capacidad de interrumpir simultáneamente todos los conductores activos (fases y, en su caso, neutro) de un circuito o instalación" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es el Cuadro General de Mando y Protección (CGMP)?", explicacion: "El conjunto de dispositivos de mando y protección de la instalación interior, tras la DI y el ICP.", dificultad: "facil", opciones: ["El conjunto de dispositivos de mando y protección de la instalación interior", "El armario donde se agrupan los contadores de todo el edificio", "El conductor que enlaza la CGP con la centralización de contadores", "El dispositivo que limita el suministro a la potencia contratada"], correcta: 0 },
  { enunciado: "¿Qué instrucción técnica complementaria regula los dispositivos del CGMP?", explicacion: "La ITC-BT-17.", dificultad: "media", opciones: ["La ITC-BT-17", "La ITC-BT-13", "La ITC-BT-15", "La ITC-BT-16"], correcta: 0 },
  { enunciado: "¿Qué es el Interruptor General Automático (IGA)?", explicacion: "El dispositivo de corte omnipolar que protege el origen de la instalación frente a sobreintensidades.", dificultad: "media", opciones: ["El dispositivo de corte omnipolar que protege el origen de la instalación", "El dispositivo que limita el suministro a la potencia contratada", "El dispositivo que protege exclusivamente frente a contactos indirectos", "El dispositivo que mide la energía activa consumida"], correcta: 0 },
  { enunciado: "¿Dónde se sitúa el IGA respecto al resto de elementos del CGMP?", explicacion: "En el origen del cuadro, aguas arriba de los demás dispositivos.", dificultad: "media", opciones: ["En el origen del cuadro, aguas arriba de los demás dispositivos", "Al final del cuadro, aguas abajo de todos los circuitos", "Fuera del propio cuadro, en la centralización de contadores", "En paralelo con cada uno de los PIA de los circuitos"], correcta: 0 },
  { enunciado: "¿Qué es el corte omnipolar?", explicacion: "La interrupción simultánea de todos los conductores activos de un circuito.", dificultad: "dificil", opciones: ["La interrupción simultánea de todos los conductores activos", "La interrupción de un único conductor de fase", "La conexión simultánea de todos los circuitos de la instalación", "La medida simultánea de tensión e intensidad en un circuito"], correcta: 0 },
]);

const S2 = "interruptor-diferencial-pia";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es el Interruptor Diferencial (ID) dentro del CGMP?", reverso: "El dispositivo que detecta la corriente de fuga o de defecto de un circuito (diferencia entre la intensidad de entrada y de salida) y desconecta automáticamente la instalación cuando esta supera un valor preestablecido, protegiendo frente a contactos indirectos" },
  { anverso: "¿Qué sensibilidad es habitual en los interruptores diferenciales de las instalaciones interiores de viviendas?", reverso: "30 mA (miliamperios), sensibilidad adecuada para la protección de personas frente a contactos indirectos en instalaciones domésticas" },
  { anverso: "¿Qué son los Pequeños Interruptores Automáticos (PIA)?", reverso: "Los interruptores automáticos que protegen individualmente cada uno de los circuitos derivados del CGMP frente a sobrecargas y cortocircuitos, dimensionados según la sección del conductor de cada circuito" },
  { anverso: "¿Qué diferencia existe entre la protección que aporta el ID y la que aporta un PIA?", reverso: "El ID protege frente a corrientes de fuga o de defecto (contactos indirectos), mientras que el PIA protege frente a sobrecargas y cortocircuitos (sobreintensidades) de un circuito concreto" },
  { anverso: "¿Cuántos PIA se instalan, con carácter general, en una instalación interior de vivienda?", reverso: "Uno por cada circuito independiente de la vivienda (alumbrado, tomas de corriente de uso general, cocina y horno, lavadora/lavavajillas/termo, entre otros, según la electrificación de la vivienda)" },
  { anverso: "¿Qué instrucción técnica complementaria regula la protección contra sobreintensidades, propia de los PIA e IGA?", reverso: "La ITC-BT-22" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué protege el Interruptor Diferencial (ID)?", explicacion: "Frente a contactos indirectos, detectando corrientes de fuga o defecto.", dificultad: "facil", opciones: ["Frente a contactos indirectos, detectando corrientes de fuga", "Frente a sobrecargas de un circuito concreto exclusivamente", "Frente a sobretensiones transitorias de origen atmosférico", "Frente al consumo excesivo de energía activa"], correcta: 0 },
  { enunciado: "¿Qué sensibilidad es habitual en los interruptores diferenciales de instalaciones de vivienda?", explicacion: "30 mA.", dificultad: "media", opciones: ["30 mA", "300 mA", "3 mA", "3.000 mA"], correcta: 0 },
  { enunciado: "¿Qué son los Pequeños Interruptores Automáticos (PIA)?", explicacion: "Protegen individualmente cada circuito frente a sobrecargas y cortocircuitos.", dificultad: "media", opciones: ["Protegen individualmente cada circuito frente a sobrecargas y cortocircuitos", "Protegen frente a contactos indirectos de toda la instalación", "Miden la energía reactiva consumida por cada circuito", "Limitan la potencia contratada de toda la instalación"], correcta: 0 },
  { enunciado: "¿Qué diferencia fundamental existe entre el ID y un PIA?", explicacion: "El ID protege frente a contactos indirectos; el PIA frente a sobreintensidades de un circuito.", dificultad: "dificil", opciones: ["El ID protege frente a contactos indirectos; el PIA frente a sobreintensidades", "Ambos protegen exactamente frente al mismo tipo de riesgo eléctrico", "El PIA protege frente a contactos indirectos; el ID frente a sobrecargas", "No existe ninguna diferencia funcional real entre ambos dispositivos"], correcta: 0 },
  { enunciado: "¿Qué instrucción técnica complementaria regula la protección contra sobreintensidades?", explicacion: "La ITC-BT-22.", dificultad: "media", opciones: ["La ITC-BT-22", "La ITC-BT-23", "La ITC-BT-24", "La ITC-BT-17"], correcta: 0 },
]);

const S3 = "protectores-sobretensiones-permanentes-transitorias";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué instrucción técnica complementaria regula la protección contra sobretensiones?", reverso: "La ITC-BT-23" },
  { anverso: "¿Qué es una sobretensión permanente?", reverso: "Una elevación anómala y mantenida de la tensión de la instalación por encima de su valor nominal, habitualmente originada por un fallo en la red de distribución (por ejemplo, pérdida del neutro)" },
  { anverso: "¿Qué es una sobretensión transitoria?", reverso: "Una elevación breve e intensa de la tensión, de corta duración (microsegundos o milisegundos), habitualmente originada por descargas atmosféricas (rayos) o por maniobras de conexión y desconexión en la red" },
  { anverso: "¿Qué es un protector o descargador contra sobretensiones transitorias (DPS)?", reverso: "Un dispositivo que deriva a tierra el exceso de tensión producido por una sobretensión transitoria, limitando la tensión que llega a los equipos y protegiéndolos de posibles daños" },
  { anverso: "¿En qué tipo de instalaciones resulta especialmente recomendable, o exigible, instalar protección contra sobretensiones transitorias?", reverso: "En instalaciones con líneas aéreas de suministro, en zonas de riesgo de impacto directo o inducido de rayo, o en instalaciones con equipos electrónicos sensibles" },
  { anverso: "¿Qué protección frente a una sobretensión permanente es habitual en determinadas instalaciones?", reverso: "Dispositivos de protección contra sobretensiones permanentes, que detectan la elevación mantenida de tensión y desconectan automáticamente la instalación para proteger los equipos conectados" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué instrucción técnica complementaria regula la protección contra sobretensiones?", explicacion: "La ITC-BT-23.", dificultad: "media", opciones: ["La ITC-BT-23", "La ITC-BT-22", "La ITC-BT-17", "La ITC-BT-24"], correcta: 0 },
  { enunciado: "¿Qué es una sobretensión permanente?", explicacion: "Una elevación anómala y mantenida de la tensión por encima de su valor nominal.", dificultad: "media", opciones: ["Una elevación anómala y mantenida de la tensión", "Una elevación breve de tensión originada por un rayo", "Una caída brusca y momentánea de la tensión", "La interrupción total del suministro eléctrico"], correcta: 0 },
  { enunciado: "¿Qué es una sobretensión transitoria?", explicacion: "Una elevación breve e intensa de la tensión, habitualmente por descargas atmosféricas o maniobras.", dificultad: "media", opciones: ["Una elevación breve e intensa de la tensión", "Una elevación mantenida de la tensión por fallo del neutro", "Una disminución progresiva de la tensión de la red", "Un aumento constante de la frecuencia de la red"], correcta: 0 },
  { enunciado: "¿Qué función cumple un protector contra sobretensiones transitorias (DPS)?", explicacion: "Deriva a tierra el exceso de tensión, limitando la que llega a los equipos.", dificultad: "dificil", opciones: ["Deriva a tierra el exceso de tensión, protegiendo los equipos", "Aumenta la tensión de la instalación para compensar la caída", "Mide la energía reactiva consumida por la instalación", "Sustituye por completo al Interruptor Diferencial de la instalación"], correcta: 0 },
  { enunciado: "¿Qué origen habitual tienen las sobretensiones transitorias?", explicacion: "Descargas atmosféricas (rayos) o maniobras de conexión/desconexión en la red.", dificultad: "media", opciones: ["Descargas atmosféricas o maniobras de conexión en la red", "Un exceso de iluminación artificial en la instalación", "Un defecto de aislamiento en el conductor de tierra", "Un exceso de humedad ambiental en el interior del cuadro"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 11 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 11, orden: 11, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-143 creado y vinculado como Tema 11 de Oficial Electricista.");
