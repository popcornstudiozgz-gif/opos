/**
 * Crea tema-144: "Cables y conductores eléctricos" — Tema 12
 * (numero=12, bloque-2) de Oficial Electricista (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 10 oficial del Anexo I (bases2110.pdf, línea 1336):
 *   "Cables y Conductores Eléctricos. Tipos de conductores, aislamientos
 *   y designación normalizada de los cables. Secciones normalizadas.
 *   Criterios de cálculo de secciones: caída de tensión y densidad de
 *   corriente (intensidad máxima admisible)."
 *
 * Fuente primaria: Real Decreto 842/2002 (REBT) — BOE-A-2002-18099.
 * ITC-BT-19 (prescripciones generales de las instalaciones interiores o
 * receptoras, con las tablas de intensidades máximas admisibles y los
 * criterios de caída de tensión); ITC-BT-06 y ITC-BT-07 (redes aéreas y
 * subterráneas de distribución, con la designación normalizada de
 * cables).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-144-cables-conductores-electricos.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-144";
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
  titulo: "Cables y conductores eléctricos",
  descripcion: "Tipos de conductores, aislamientos y designación normalizada de los cables. Secciones normalizadas. Criterios de cálculo de secciones: caída de tensión y densidad de corriente (intensidad máxima admisible).",
  contenido: "Desarrolla los tipos de conductores y aislamientos empleados en instalaciones eléctricas de baja tensión, su designación normalizada, las secciones normalizadas de conductores, y los dos criterios técnicos fundamentales para el cálculo de la sección de un conductor: la caída de tensión máxima admisible y la densidad de corriente o intensidad máxima admisible, conforme a la ITC-BT-19 del REBT.",
  enlaces_boe: [
    { titulo: "Real Decreto 842/2002, Reglamento electrotécnico para baja tensión (ITC-BT-06, ITC-BT-07, ITC-BT-19)", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2002-18099" },
  ],
  indice_estudio: [
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2002-18099", titulo: "Tipos de conductores, aislamientos y designación normalizada", seccion: "tipos-conductores-aislamientos-designacion-normalizada", articulos: "ITC-BT-06, ITC-BT-07" },
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2002-18099", titulo: "Secciones normalizadas de conductores", seccion: "secciones-normalizadas-conductores", articulos: "ITC-BT-19" },
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2002-18099", titulo: "Criterios de cálculo de secciones: caída de tensión e intensidad máxima admisible", seccion: "criterios-calculo-secciones-caida-tension-intensidad-admisible", articulos: "ITC-BT-19" },
  ],
}]);

const S1 = "tipos-conductores-aislamientos-designacion-normalizada";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué materiales se emplean habitualmente como conductor en los cables eléctricos de baja tensión?", reverso: "El cobre, por su elevada conductividad, y el aluminio, más ligero y económico, empleado principalmente en secciones grandes de redes de distribución" },
  { anverso: "¿Qué función cumple el aislamiento de un cable eléctrico?", reverso: "Impedir el contacto directo con el conductor y evitar derivaciones o cortocircuitos entre conductores, soportando además los esfuerzos térmicos, mecánicos y químicos previsibles" },
  { anverso: "¿Qué materiales de aislamiento son habituales en los cables de baja tensión?", reverso: "El PVC (policloruro de vinilo) y el XLPE o EPR (polietileno reticulado o goma etilenopropileno), este último con mejores características térmicas que el PVC" },
  { anverso: "¿Qué es un cable unipolar?", reverso: "Un cable formado por un único conductor aislado, sin cubierta común con otros conductores" },
  { anverso: "¿Qué es un cable multipolar?", reverso: "Un cable que agrupa varios conductores aislados bajo una cubierta común (por ejemplo, un cable de tres o cuatro conductores)" },
  { anverso: "¿Qué indica la designación normalizada de un cable, por ejemplo, del tipo H07V-K?", reverso: "Información codificada sobre su tensión asignada, tipo de aislamiento, tipo de cubierta y flexibilidad del conductor, conforme a la normalización europea armonizada de cables (por ejemplo, H = armonizado; 07 = 450/750 V; V = aislamiento de PVC; K = conductor flexible para instalación fija)" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué materiales se emplean habitualmente como conductor en cables de baja tensión?", explicacion: "Cobre y aluminio.", dificultad: "facil", opciones: ["Cobre y aluminio", "Hierro y plomo", "Acero inoxidable y zinc", "Latón y estaño"], correcta: 0 },
  { enunciado: "¿Qué función cumple el aislamiento de un cable eléctrico?", explicacion: "Impedir el contacto directo con el conductor y evitar cortocircuitos.", dificultad: "facil", opciones: ["Impedir el contacto directo con el conductor", "Aumentar la conductividad eléctrica del cable", "Reducir el peso total del cable instalado", "Facilitar la medida de la intensidad que circula"], correcta: 0 },
  { enunciado: "¿Qué materiales de aislamiento son habituales en cables de baja tensión?", explicacion: "PVC y XLPE/EPR.", dificultad: "media", opciones: ["PVC y XLPE/EPR", "Madera y corcho", "Vidrio y cerámica", "Papel y cartón"], correcta: 0 },
  { enunciado: "¿Qué es un cable unipolar?", explicacion: "Un cable formado por un único conductor aislado.", dificultad: "media", opciones: ["Un cable formado por un único conductor aislado", "Un cable que agrupa varios conductores bajo una cubierta común", "Un cable sin ningún tipo de aislamiento", "Un cable exclusivo para instalaciones de alta tensión"], correcta: 0 },
  { enunciado: "¿Qué información codifica la designación normalizada de un cable?", explicacion: "Tensión asignada, tipo de aislamiento, cubierta y flexibilidad del conductor.", dificultad: "dificil", opciones: ["Tensión asignada, aislamiento, cubierta y flexibilidad del conductor", "Únicamente el color exterior del cable", "Únicamente el fabricante del cable", "Únicamente el país de origen del cable"], correcta: 0 },
]);

const S2 = "secciones-normalizadas-conductores";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿En qué unidad se expresa la sección de un conductor eléctrico?", reverso: "En milímetros cuadrados (mm²)" },
  { anverso: "¿Qué son las secciones normalizadas de conductores?", reverso: "Los valores de sección estandarizados que fabrican y comercializan los fabricantes de cables (por ejemplo, 1,5 / 2,5 / 4 / 6 / 10 / 16 / 25 mm², entre otros), a los que debe ajustarse el resultado del cálculo de sección de un circuito" },
  { anverso: "¿Qué debe hacer el instalador si el cálculo teórico de la sección de un conductor no coincide exactamente con ninguna sección normalizada?", reverso: "Elegir la sección normalizada inmediatamente superior al valor calculado, nunca una inferior, para garantizar el cumplimiento de los criterios de caída de tensión e intensidad máxima admisible" },
  { anverso: "¿Qué sección mínima es habitual para el circuito de alumbrado de una vivienda?", reverso: "1,5 mm², conforme a las prescripciones de la ITC-BT-25 para viviendas" },
  { anverso: "¿Qué sección mínima es habitual para el circuito de tomas de corriente de uso general de una vivienda?", reverso: "2,5 mm², conforme a las prescripciones de la ITC-BT-25 para viviendas" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿En qué unidad se expresa la sección de un conductor eléctrico?", explicacion: "En milímetros cuadrados (mm²).", dificultad: "facil", opciones: ["Milímetros cuadrados (mm²)", "Amperios (A)", "Voltios (V)", "Ohmios por metro (Ω/m)"], correcta: 0 },
  { enunciado: "¿Qué debe hacer el instalador si el cálculo teórico no coincide con ninguna sección normalizada?", explicacion: "Elegir la sección normalizada inmediatamente superior.", dificultad: "media", opciones: ["Elegir la sección normalizada inmediatamente superior", "Elegir la sección normalizada inmediatamente inferior", "Promediar entre la superior y la inferior más próximas", "Utilizar cualquier sección disponible en el almacén"], correcta: 0 },
  { enunciado: "¿Qué sección mínima es habitual para el circuito de alumbrado de una vivienda?", explicacion: "1,5 mm².", dificultad: "media", opciones: ["1,5 mm²", "6 mm²", "0,5 mm²", "16 mm²"], correcta: 0 },
  { enunciado: "¿Qué sección mínima es habitual para el circuito de tomas de corriente de uso general de una vivienda?", explicacion: "2,5 mm².", dificultad: "media", opciones: ["2,5 mm²", "1 mm²", "10 mm²", "0,75 mm²"], correcta: 0 },
  { enunciado: "¿Por qué nunca debe elegirse una sección normalizada inferior a la calculada teóricamente?", explicacion: "Porque incumpliría los criterios de caída de tensión e intensidad máxima admisible, comprometiendo la seguridad.", dificultad: "dificil", opciones: ["Porque incumpliría los criterios de caída de tensión e intensidad admisible", "Porque los fabricantes no comercializan secciones inferiores a la calculada", "Porque encarecería innecesariamente el coste de la instalación", "Porque el REBT lo prohíbe únicamente en instalaciones de alta tensión"], correcta: 0 },
]);

const S3 = "criterios-calculo-secciones-caida-tension-intensidad-admisible";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Cuáles son los dos criterios fundamentales para el cálculo de la sección de un conductor según la ITC-BT-19?", reverso: "La caída de tensión máxima admisible y la intensidad máxima admisible (densidad de corriente), calculando ambos y eligiendo la sección más desfavorable (mayor) de las dos" },
  { anverso: "¿Qué es la caída de tensión en un conductor?", reverso: "La pérdida de tensión que se produce a lo largo de un conductor debido a su resistencia eléctrica, proporcional a la longitud del conductor y a la intensidad que circula por él" },
  { anverso: "¿Por qué es importante limitar la caída de tensión de un circuito?", reverso: "Para garantizar que los receptores conectados al final del circuito reciban una tensión suficientemente próxima a la nominal para funcionar correctamente" },
  { anverso: "¿Qué es la intensidad máxima admisible de un conductor?", reverso: "El valor máximo de intensidad que puede circular de forma permanente por un conductor sin que su temperatura supere el límite que garantiza la integridad de su aislamiento, en función de su sección, material y condiciones de instalación" },
  { anverso: "¿Qué factores influyen en la intensidad máxima admisible de un conductor, además de su sección?", reverso: "El material del conductor (cobre o aluminio), el tipo de aislamiento, la temperatura ambiente, y el modo de instalación (al aire, empotrado, bajo tubo, agrupado con otros cables)" },
  { anverso: "¿Qué criterio de cálculo suele resultar más restrictivo en circuitos de gran longitud?", reverso: "El criterio de caída de tensión máxima admisible, ya que a mayor longitud del conductor, mayor es la caída de tensión resultante para una misma intensidad" },
  { anverso: "¿Qué criterio de cálculo suele resultar más restrictivo en circuitos cortos pero con elevada intensidad demandada?", reverso: "El criterio de intensidad máxima admisible (densidad de corriente), al ser la longitud reducida menos determinante en la caída de tensión resultante" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Cuáles son los dos criterios fundamentales para calcular la sección de un conductor según la ITC-BT-19?", explicacion: "Caída de tensión máxima admisible e intensidad máxima admisible.", dificultad: "media", opciones: ["Caída de tensión máxima admisible e intensidad máxima admisible", "Color del aislamiento y longitud del conductor exclusivamente", "Precio del conductor y disponibilidad en almacén", "Marca del fabricante y país de origen del cable"], correcta: 0 },
  { enunciado: "Al calcular una sección por ambos criterios y obtener resultados distintos, ¿qué sección debe elegirse?", explicacion: "La mayor de las dos, la más desfavorable.", dificultad: "media", opciones: ["La mayor de las dos secciones calculadas", "La menor de las dos secciones calculadas", "La media aritmética entre ambas secciones", "Cualquiera de las dos, a criterio del instalador"], correcta: 0 },
  { enunciado: "¿Por qué es importante limitar la caída de tensión de un circuito?", explicacion: "Para que los receptores reciban una tensión suficientemente próxima a la nominal.", dificultad: "media", opciones: ["Para que los receptores reciban una tensión próxima a la nominal", "Para reducir el precio final de la instalación eléctrica", "Para aumentar la velocidad de transmisión de datos del circuito", "Para eliminar por completo la necesidad de protecciones eléctricas"], correcta: 0 },
  { enunciado: "¿Qué factores influyen en la intensidad máxima admisible de un conductor, además de su sección?", explicacion: "Material, aislamiento, temperatura ambiente y modo de instalación.", dificultad: "dificil", opciones: ["Material, aislamiento, temperatura ambiente y modo de instalación", "Únicamente el color exterior del cable", "Únicamente el fabricante del cable instalado", "Únicamente la marca del interruptor automático asociado"], correcta: 0 },
  { enunciado: "¿Qué criterio de cálculo suele resultar más restrictivo en circuitos de gran longitud?", explicacion: "El de caída de tensión máxima admisible.", dificultad: "dificil", opciones: ["El criterio de caída de tensión máxima admisible", "El criterio de intensidad máxima admisible", "Ambos criterios son siempre igualmente restrictivos", "Ninguno de los dos criterios se ve afectado por la longitud"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 12 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 12, orden: 12, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-144 creado y vinculado como Tema 12 de Oficial Electricista.");
