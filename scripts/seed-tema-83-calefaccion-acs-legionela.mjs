/**
 * Crea tema-83: "Calefacción, agua caliente sanitaria y prevención de la
 * legionela" — Tema 13 (numero=13, bloque-2) de Oficial Polivalente
 * Instalaciones Deportivas (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 11 oficial del Anexo I (bases2110.pdf):
 *   "Calefacción y agua caliente sanitaria. Control y prevención de la
 *   legionela (RD 865/2003 del 4 de julio)."
 *
 * Fuente primaria verificada en este turno: el temario oficial cita
 * literalmente el "RD 865/2003 del 4 de julio" (Real Decreto 865/2003,
 * de 4 de julio, por el que se establecen los criterios higiénico-
 * sanitarios para la prevención y control de la legionelosis,
 * BOE-A-2003-14408). IMPORTANTE — este RD 865/2003 ha sido DEROGADO y
 * sustituido por el Real Decreto 487/2022, de 21 de junio, por el que se
 * establecen los requisitos sanitarios para la prevención y el control de
 * la legionelosis (BOE-A-2022-10297), actualmente en vigor. Se mantiene
 * el RD 865/2003 como referencia porque es la que cita literalmente el
 * temario oficial de esta convocatoria, pero se señala explícitamente en
 * el contenido (con flashcard y pregunta dedicadas) que la norma vigente
 * es el RD 487/2022, para no enseñar como actual una norma derogada sin
 * advertirlo.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-83-calefaccion-acs-legionela.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-83";
const OPOSICION = "oficial-instalaciones-deportivas-ayto-zaragoza";
const BLOQUE_2_ID = "cdb0920b-a2d8-4ea8-b3fc-b80168d7361a";
const RD_865_2003 = "https://www.boe.es/buscar/act.php?id=BOE-A-2003-14408";
const RD_487_2022 = "https://www.boe.es/buscar/act.php?id=BOE-A-2022-10297";

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
  titulo: "Calefacción, agua caliente sanitaria y prevención de la legionela",
  descripcion: "Sistemas de calefacción y agua caliente sanitaria en instalaciones deportivas. Control y prevención de la legionela (RD 865/2003, actualmente sustituido por el RD 487/2022).",
  contenido: "Desarrolla los sistemas de calefacción y producción de agua caliente sanitaria (ACS) propios de instalaciones deportivas con piscina y vestuarios, y las medidas de control y prevención de la legionela: el temario oficial cita el RD 865/2003, actualmente derogado y sustituido por el RD 487/2022, vigente en la materia.",
  enlaces_boe: [
    { url: RD_865_2003, titulo: "RD 865/2003 — Criterios higiénico-sanitarios para la prevención de la legionelosis (citado por el temario oficial, DEROGADO)" },
    { url: RD_487_2022, titulo: "RD 487/2022 — Requisitos sanitarios para la prevención y control de la legionelosis (norma VIGENTE)" },
  ],
  indice_estudio: [
    { url: "", titulo: "Calefacción y agua caliente sanitaria en instalaciones deportivas", seccion: "calefaccion-acs-instalaciones-deportivas", articulos: "Conceptos fundamentales" },
    { url: RD_487_2022, titulo: "Legionela: qué es y marco normativo (RD 865/2003 → RD 487/2022)", seccion: "legionela-marco-normativo", articulos: "RD 865/2003 (citado por el temario, derogado) y RD 487/2022 (vigente)" },
    { url: "", titulo: "Mantenimiento preventivo frente a la legionela", seccion: "mantenimiento-preventivo-legionela", articulos: "Conceptos fundamentales" },
  ],
}]);

const S1 = "calefaccion-acs-instalaciones-deportivas";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es el agua caliente sanitaria (ACS) en una instalación deportiva?", reverso: "El agua caliente destinada al consumo humano y al aseo personal (duchas, lavabos), diferenciada del agua del circuito de calefacción, aunque ambas puedan compartir el mismo generador de calor" },
  { anverso: "¿Qué elemento genera habitualmente el calor tanto para calefacción como para ACS en un centro deportivo?", reverso: "Una caldera (de gas, gasóleo, biomasa) o una bomba de calor, que puede dar servicio combinado a ambos circuitos mediante un intercambiador" },
  { anverso: "¿Qué es un acumulador de ACS y por qué es habitual en un centro deportivo con vestuarios?", reverso: "Un depósito que almacena agua caliente ya preparada, permitiendo atender picos de demanda simultánea (por ejemplo, muchas duchas a la vez tras una actividad) sin depender solo de la potencia instantánea de la caldera" },
  { anverso: "¿Qué es un intercambiador de calor en un sistema combinado de calefacción/ACS?", reverso: "Un elemento que transfiere el calor de un circuito primario (agua de caldera) a un circuito secundario (agua de consumo o de la piscina) sin que ambas aguas se mezclen" },
  { anverso: "¿Qué temperatura de referencia se recomienda para el agua de las duchas en vestuarios deportivos, equilibrando confort y ahorro energético?", reverso: "En torno a 38-40 °C, ajustable por termostato, evitando temperaturas excesivas que aumenten el consumo energético sin mejorar el confort" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es el agua caliente sanitaria (ACS)?", explicacion: "El agua caliente destinada al consumo humano y al aseo personal.", dificultad: "facil", opciones: ["El agua caliente para consumo y aseo personal", "El agua del circuito exclusivo de calefacción", "El agua del vaso de la piscina", "El agua de la red de riego de jardines"], correcta: 0 },
  { enunciado: "¿Qué genera habitualmente el calor para calefacción y ACS en un centro deportivo?", explicacion: "Una caldera o bomba de calor con intercambiador.", dificultad: "media", opciones: ["Una caldera o bomba de calor", "Únicamente paneles solares fotovoltaicos", "Únicamente resistencias eléctricas individuales", "El sistema de depuración de la piscina"], correcta: 0 },
  { enunciado: "¿Para qué sirve un acumulador de ACS en un centro con vestuarios?", explicacion: "Para atender picos de demanda simultánea de agua caliente.", dificultad: "media", opciones: ["Para atender picos de demanda simultánea", "Para filtrar el agua de la piscina", "Para generar electricidad", "Para desinfectar el agua de las duchas"], correcta: 0 },
  { enunciado: "¿Qué función cumple un intercambiador de calor?", explicacion: "Transfiere calor entre circuitos sin mezclar las aguas.", dificultad: "media", opciones: ["Transfiere calor entre circuitos sin mezclar aguas", "Genera electricidad para el centro", "Filtra impurezas del agua de piscina", "Sustituye a la caldera por completo"], correcta: 0 },
  { enunciado: "¿Qué temperatura de referencia es habitual para el agua de duchas en vestuarios deportivos?", explicacion: "En torno a 38-40 °C.", dificultad: "media", opciones: ["En torno a 38-40 °C", "En torno a 60-70 °C", "En torno a 10-15 °C", "En torno a 90-100 °C"], correcta: 0 },
]);

const S2 = "legionela-marco-normativo";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es la legionela?", reverso: "Una bacteria presente de forma natural en el agua que, en condiciones favorables (agua estancada, temperatura entre 20 y 45 °C, presencia de biofilm), puede proliferar y causar legionelosis al inhalarse en aerosoles contaminados" },
  { anverso: "¿Qué norma cita literalmente el temario oficial de esta plaza sobre control de la legionela?", reverso: "El Real Decreto 865/2003, de 4 de julio, por el que se establecen los criterios higiénico-sanitarios para la prevención y control de la legionelosis" },
  { anverso: "¿Sigue vigente el RD 865/2003 citado por el temario oficial?", reverso: "No: ha sido derogado y sustituido por el Real Decreto 487/2022, de 21 de junio, por el que se establecen los requisitos sanitarios para la prevención y el control de la legionelosis, actualmente en vigor" },
  { anverso: "¿Qué tipo de instalaciones son consideradas de riesgo frente a la legionela según esta normativa?", reverso: "Instalaciones que usan agua, pueden producir aerosoles, y favorecen la proliferación bacteriana: torres de refrigeración, sistemas de agua caliente sanitaria, duchas, piscinas de hidromasaje o spa, y otros equipos similares" },
  { anverso: "¿Por qué las duchas de un vestuario deportivo se consideran una instalación de riesgo frente a la legionela?", reverso: "Porque generan aerosoles de agua que, si el sistema de ACS no mantiene las condiciones adecuadas (temperatura, limpieza, renovación), pueden ser un foco de proliferación y transmisión de la bacteria" },
  { anverso: "¿Qué obligación básica impone la normativa a los titulares de instalaciones de riesgo frente a la legionela?", reverso: "Realizar el mantenimiento higiénico-sanitario adecuado de las instalaciones (limpieza, desinfección, control de parámetros) y registrar documentalmente las operaciones realizadas" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es la legionela?", explicacion: "Una bacteria del agua que puede proliferar en condiciones favorables y causar legionelosis.", dificultad: "facil", opciones: ["Una bacteria del agua que puede causar legionelosis", "Un producto químico de desinfección de piscinas", "Un tipo de filtro de arena de sílice", "Un componente de la red de calefacción"], correcta: 0 },
  { enunciado: "¿Qué norma cita literalmente el temario oficial sobre control de legionela?", explicacion: "El Real Decreto 865/2003, de 4 de julio.", dificultad: "media", opciones: ["El Real Decreto 865/2003", "El Real Decreto 487/2022", "El Decreto 50/1993", "El Real Decreto 842/2002"], correcta: 0 },
  { enunciado: "¿Está vigente actualmente el RD 865/2003?", explicacion: "No, fue derogado y sustituido por el RD 487/2022.", dificultad: "media", opciones: ["No, fue derogado por el RD 487/2022", "Sí, sigue plenamente vigente sin cambios", "Sí, pero solo para piscinas municipales", "No, fue sustituido por el Decreto 50/1993"], correcta: 0 },
  { enunciado: "¿Qué instalaciones se consideran de riesgo frente a la legionela?", explicacion: "Torres de refrigeración, sistemas de ACS, duchas, piscinas de hidromasaje, entre otras.", dificultad: "media", opciones: ["Instalaciones que usan agua y generan aerosoles", "Únicamente las torres de refrigeración industriales", "Únicamente las piscinas exteriores de verano", "Ninguna instalación deportiva está en riesgo"], correcta: 0 },
  { enunciado: "¿Por qué las duchas de un vestuario son instalación de riesgo frente a la legionela?", explicacion: "Generan aerosoles que pueden transmitir la bacteria si no se mantienen las condiciones adecuadas.", dificultad: "media", opciones: ["Generan aerosoles que pueden transmitir la bacteria", "No representan ningún riesgo real", "Solo son de riesgo si usan agua fría", "Solo son de riesgo en piscinas exteriores"], correcta: 0 },
  { enunciado: "¿Qué obligación básica impone la normativa a los titulares de instalaciones de riesgo?", explicacion: "Mantenimiento higiénico-sanitario adecuado y registro documental.", dificultad: "media", opciones: ["Mantenimiento higiénico-sanitario y registro documental", "Ninguna obligación específica", "Solo cerrar la instalación de forma preventiva", "Solo informar a los usuarios verbalmente"], correcta: 0 },
]);

const S3 = "mantenimiento-preventivo-legionela";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué rango de temperatura favorece especialmente la proliferación de la legionela?", reverso: "Entre 20 °C y 45 °C aproximadamente; por debajo de 20 °C su crecimiento se ralentiza mucho, y por encima de 60 °C la bacteria muere" },
  { anverso: "¿Por qué se recomienda mantener el agua caliente sanitaria por encima de 60 °C en el acumulador?", reverso: "Porque a esa temperatura la legionela no sobrevive, reduciendo el riesgo de proliferación en el depósito, aunque después se atempere el agua antes de llegar al grifo o ducha" },
  { anverso: "¿Qué es la desinfección térmica (choque térmico) como medida preventiva frente a la legionela?", reverso: "Una operación periódica que consiste en elevar la temperatura del agua del circuito (habitualmente a 70 °C o más durante un tiempo determinado) para eliminar la carga bacteriana acumulada" },
  { anverso: "¿Qué es la desinfección química como medida preventiva frente a la legionela?", reverso: "La aplicación de productos desinfectantes (como el cloro) en el circuito de agua, en concentración y tiempo de contacto suficientes para eliminar la bacteria" },
  { anverso: "¿Qué es el biofilm y qué relación tiene con la legionela?", reverso: "Una película de microorganismos y materia orgánica que se forma en las paredes internas de tuberías y depósitos; sirve de refugio y nutriente a la legionela, favoreciendo su proliferación si no se elimina periódicamente" },
  { anverso: "¿Por qué deben evitarse los tramos de tubería sin uso ('agua estancada') en una instalación de agua caliente?", reverso: "Porque el agua estancada, sin renovación ni circulación, favorece la bajada de temperatura y la proliferación de legionela en esos tramos" },
  { anverso: "¿Qué registro documental es habitual en el mantenimiento preventivo frente a la legionela?", reverso: "Un libro o registro de mantenimiento donde se anotan las operaciones de limpieza, desinfección, purgas y controles de temperatura realizados, junto con sus fechas y resultados" },
  { anverso: "¿Qué papel tiene el oficial polivalente de instalaciones deportivas en la prevención de la legionela?", reverso: "Ejecutar las operaciones de mantenimiento preventivo programadas (purgas, limpiezas, controles de temperatura) y comunicar cualquier anomalía detectada, sin sustituir el análisis técnico especializado cuando este sea necesario" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué rango de temperatura favorece la proliferación de la legionela?", explicacion: "Entre 20 °C y 45 °C aproximadamente.", dificultad: "media", opciones: ["Entre 20 °C y 45 °C", "Entre 0 °C y 5 °C", "Entre 70 °C y 90 °C", "Solo por encima de 100 °C"], correcta: 0 },
  { enunciado: "¿Por qué se mantiene el ACS por encima de 60 °C en el acumulador?", explicacion: "Porque a esa temperatura la legionela no sobrevive.", dificultad: "media", opciones: ["Porque a esa temperatura la legionela no sobrevive", "Porque así se ahorra energía", "Porque lo exige exclusivamente el REBT", "Porque mejora el sabor del agua"], correcta: 0 },
  { enunciado: "¿Qué es la desinfección térmica (choque térmico)?", explicacion: "Elevar la temperatura del agua periódicamente para eliminar la carga bacteriana.", dificultad: "media", opciones: ["Elevar periódicamente la temperatura del agua", "Aplicar cloro en el agua de forma continua", "Vaciar completamente el circuito cada semana", "Sustituir todas las tuberías periódicamente"], correcta: 0 },
  { enunciado: "¿Qué es el biofilm y su relación con la legionela?", explicacion: "Una película de microorganismos en tuberías que favorece la proliferación de legionela.", dificultad: "media", opciones: ["Una película en tuberías que favorece la legionela", "Un producto químico desinfectante", "Un tipo de filtro de la piscina", "Un componente eléctrico del sistema"], correcta: 0 },
  { enunciado: "¿Por qué deben evitarse tramos de tubería con agua estancada?", explicacion: "Porque favorecen la bajada de temperatura y la proliferación de legionela.", dificultad: "media", opciones: ["Favorecen la proliferación de legionela", "No tienen ninguna relevancia sanitaria", "Solo afectan al consumo eléctrico", "Solo afectan a la presión del agua"], correcta: 0 },
  { enunciado: "¿Qué papel tiene el oficial polivalente en la prevención de la legionela?", explicacion: "Ejecutar el mantenimiento preventivo programado y comunicar anomalías.", dificultad: "media", opciones: ["Ejecutar el mantenimiento preventivo y comunicar anomalías", "Realizar el análisis microbiológico especializado él mismo", "No tiene ningún papel en esta materia", "Sustituir siempre a la empresa especializada"], correcta: 0 },
  { enunciado: "¿Qué se anota en el registro de mantenimiento frente a la legionela?", explicacion: "Operaciones de limpieza, desinfección, purgas y controles de temperatura con fechas.", dificultad: "media", opciones: ["Operaciones realizadas con sus fechas y resultados", "Solo el nombre del personal de mantenimiento", "Solo las quejas de las personas usuarias", "Solo las tarifas de la instalación"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 13 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 13, orden: 13, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-83 creado y vinculado como Tema 13 de Oficial Polivalente Instalaciones Deportivas.");
