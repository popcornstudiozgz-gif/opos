/**
 * Crea tema-203: "Parámetros de calidad del agua y normativa sanitaria" —
 * Tema 7 (numero=7, bloque-2) de Oficial Planta Potabilizadora (Ayto.
 * Zaragoza). Primer tema de la parte específica de esta oposición.
 *
 * Corresponde al TEMA 5 oficial del Anexo I (bases2110.pdf, línea 1097):
 *   "Parámetros más importantes de calidad de un agua. Normativa
 *   vigente, Real Decreto 140/2003, de 7 de febrero, por el que se
 *   establecen los criterios sanitarios de la calidad del agua de
 *   consumo humano. Orden SSI/304/2013, de 19 de febrero, sobre
 *   sustancias para el tratamiento del agua destinada a la producción
 *   de agua de consumo humano. Contaminantes orgánicos. Contaminantes
 *   metálicos. Bacterias y microorganismos patógenos. Las algas."
 *
 * Fuentes primarias verificadas mediante búsqueda en esta sesión:
 * - Real Decreto 140/2003 (BOE-A-2003-3596), ya verificado en el
 *   proyecto (Oficial Guardallaves, tema-195).
 * - **Norma derogada señalada explícitamente**, mismo patrón ya
 *   aplicado en Oficial Agente Inspector: la Orden SSI/304/2013, citada
 *   literalmente por el temario oficial, fue derogada con efectos de
 *   2 de agosto de 2018 por el Real Decreto 902/2018, de 20 de julio,
 *   que modificó el Anexo II del RD 140/2003 (sustancias para el
 *   tratamiento del agua) para adaptarlo al Reglamento (CE) nº
 *   1907/2006 (REACH). Se explica ambas normas: la citada por el
 *   temario y la realmente vigente.
 * - Ayuntamiento de Zaragoza, "Preguntas frecuentes del abastecimiento
 *   del agua" y portal de infraestructuras: la Planta Potabilizadora de
 *   Casablanca dispone de laboratorio propio con análisis de más de 53
 *   parámetros, muchos en continuo.
 *
 * Tres secciones:
 * 1. parametros-calidad-normativa-rd-140-2003-rd-902-2018
 * 2. contaminantes-organicos-metalicos-microorganismos
 * 3. algas-control-laboratorio-planta
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-203-parametros-calidad-agua-normativa-sanitaria.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-203";
const OPOSICION = "oficial-planta-potabilizadora-ayto-zaragoza";
const BLOQUE_2_ID = "ca4ed0ad-ab08-4bc9-80b7-fb4e6941b64a";

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
  titulo: "Parámetros de calidad del agua y normativa sanitaria",
  descripcion: "Criterios sanitarios del RD 140/2003 y su modificación por el RD 902/2018. Contaminantes orgánicos y metálicos. Bacterias y microorganismos patógenos. Las algas y el control de laboratorio de la planta.",
  contenido: "Desarrolla los parámetros más importantes de calidad de un agua destinada al consumo humano, el marco normativo que los regula (Real Decreto 140/2003 y su modificación por el Real Decreto 902/2018, que sustituyó a la Orden SSI/304/2013 citada por el temario oficial), los principales tipos de contaminantes (orgánicos y metálicos), los riesgos de bacterias y microorganismos patógenos, y la presencia de algas, junto con el control de laboratorio que realiza la propia Planta Potabilizadora de Casablanca.",
  enlaces_boe: [
    "https://www.boe.es/buscar/act.php?id=BOE-A-2003-3596",
    "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2018-10940",
  ],
  indice_estudio: [
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2003-3596", titulo: "Parámetros de calidad y normativa: RD 140/2003 y RD 902/2018", seccion: "parametros-calidad-normativa-rd-140-2003-rd-902-2018", articulos: "RD 140/2003; RD 902/2018 (deroga la Orden SSI/304/2013)" },
    { url: "", titulo: "Contaminantes orgánicos, metálicos y microorganismos patógenos", seccion: "contaminantes-organicos-metalicos-microorganismos", articulos: "RD 140/2003, Anexo I" },
    { url: "https://www.zaragoza.es/sede/portal/potabilizadora/servicio/potabilizadora/preguntas", titulo: "Las algas y el control de laboratorio de la planta", seccion: "algas-control-laboratorio-planta", articulos: "Ayuntamiento de Zaragoza — Planta Potabilizadora de Casablanca" },
  ],
}]);

const S1 = "parametros-calidad-normativa-rd-140-2003-rd-902-2018";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué Real Decreto establece los criterios sanitarios de la calidad del agua de consumo humano en España?", reverso: "El Real Decreto 140/2003, de 7 de febrero (BOE-A-2003-3596), que incorpora al derecho español la Directiva europea 98/83/CE" },
  { anverso: "¿Qué norma citaba originalmente el temario oficial de esta oposición para las sustancias empleadas en el tratamiento del agua, y qué ha ocurrido con ella?", reverso: "La Orden SSI/304/2013, de 19 de febrero; esa orden fue derogada con efectos de 2 de agosto de 2018 por el Real Decreto 902/2018, que actualizó directamente el Anexo II del RD 140/2003" },
  { anverso: "¿Por qué modificó el RD 902/2018 el régimen de sustancias para el tratamiento del agua en lugar de mantener la Orden SSI/304/2013?", reverso: "Para adaptar la regulación a la evolución de la normativa europea sobre sustancias químicas, en particular al Reglamento (CE) nº 1907/2006 (REACH)" },
  { anverso: "¿A qué otras dos normas afecta también el Real Decreto 902/2018, además de al RD 140/2003?", reverso: "Al Real Decreto 1798/2010 (aguas minerales naturales y de manantial envasadas) y al Real Decreto 1799/2010 (aguas de bebida envasadas)" },
  { anverso: "¿Cuál es el requisito general que debe cumplir cualquier sustancia o preparado que se añada al agua de consumo humano, conforme a la normativa vigente?", reverso: "Cumplir la norma UNE-EN vigente en cada momento para esa sustancia concreta, además de figurar en el listado positivo actualizado del Anexo II del RD 140/2003" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué Real Decreto establece los criterios sanitarios de la calidad del agua de consumo humano?", explicacion: "El RD 140/2003.", dificultad: "facil", opciones: ["El Real Decreto 140/2003", "El Real Decreto 244/2016", "El Real Decreto 902/2018 exclusivamente, sin relación con el RD 140/2003", "La Orden SSI/304/2013 exclusivamente"], correcta: 0 },
  { enunciado: "¿Qué ha ocurrido con la Orden SSI/304/2013, citada literalmente por el temario oficial de esta oposición?", explicacion: "Fue derogada en 2018 por el RD 902/2018.", dificultad: "media", opciones: ["Fue derogada por el RD 902/2018 con efectos de agosto de 2018", "Sigue plenamente vigente sin ninguna modificación posterior", "Fue elevada a rango de ley orgánica en 2018", "Fue sustituida por una norma autonómica de Aragón"], correcta: 0 },
  { enunciado: "¿A qué reglamento europeo se adaptó el régimen de sustancias para el tratamiento del agua mediante el RD 902/2018?", explicacion: "Al Reglamento (CE) nº 1907/2006 (REACH).", dificultad: "dificil", opciones: ["Al Reglamento (CE) nº 1907/2006 (REACH)", "Al Reglamento (UE) nº 517/2014 sobre gases fluorados", "Al Reglamento (CE) nº 1272/2008 (CLP) exclusivamente", "Al Reglamento (CE) nº 852/2004 sobre higiene alimentaria"], correcta: 0 },
  { enunciado: "Además del RD 140/2003, ¿a qué otro Real Decreto afecta también el RD 902/2018?", explicacion: "Al RD 1798/2010, sobre aguas minerales naturales.", dificultad: "dificil", opciones: ["Al Real Decreto 1798/2010, sobre aguas minerales naturales", "Al Real Decreto 244/2016, sobre metrología legal", "Al Real Decreto 1215/1997, sobre equipos de trabajo", "Al Real Decreto 773/1997, sobre equipos de protección individual"], correcta: 0 },
  { enunciado: "¿Qué requisito general debe cumplir cualquier sustancia añadida al agua de consumo humano?", explicacion: "Cumplir la norma UNE-EN vigente y figurar en el listado positivo del Anexo II del RD 140/2003.", dificultad: "media", opciones: ["Cumplir la norma UNE-EN vigente y figurar en el listado positivo", "Ser de fabricación exclusivamente nacional, sin excepción", "No requerir ningún tipo de norma técnica de referencia", "Estar exenta de cualquier control por parte de la autoridad sanitaria"], correcta: 0 },
]);

const S2 = "contaminantes-organicos-metalicos-microorganismos";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué son los contaminantes orgánicos del agua, en términos generales?", reverso: "Sustancias procedentes de compuestos de carbono (plaguicidas, disolventes, hidrocarburos, subproductos de la desinfección, entre otros) cuya presencia en el agua está limitada por parámetros específicos en el RD 140/2003" },
  { anverso: "¿Qué son los contaminantes metálicos del agua?", reverso: "Elementos metálicos (como plomo, cadmio, níquel, cromo o mercurio) que, por encima de determinados valores, resultan tóxicos para la salud humana y cuya concentración está limitada por parámetros específicos del RD 140/2003" },
  { anverso: "¿Por qué es especialmente relevante el control de bacterias y microorganismos patógenos en el agua de consumo humano?", reverso: "Porque su presencia puede transmitir enfermedades infecciosas graves (gastroenteritis, entre otras) de forma directa a través del consumo de agua contaminada, por lo que su ausencia es uno de los parámetros microbiológicos exigidos por el RD 140/2003" },
  { anverso: "¿Qué parámetro microbiológico se emplea habitualmente como indicador general de contaminación fecal en el agua?", reverso: "La presencia de bacterias coliformes (y, más específicamente, Escherichia coli), cuya ausencia se exige como parámetro obligatorio del agua de consumo humano" },
  { anverso: "¿Por qué la desinfección final (cloración) es especialmente importante frente a los contaminantes microbiológicos, más que frente a los metálicos u orgánicos?", reverso: "Porque el cloro residual actúa específicamente eliminando bacterias y microorganismos patógenos, mientras que los contaminantes metálicos u orgánicos requieren otros procesos previos del tratamiento (coagulación-floculación, filtración con carbón activo) para su eliminación" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué son los contaminantes orgánicos del agua?", explicacion: "Sustancias procedentes de compuestos de carbono, con parámetros limitados en el RD 140/2003.", dificultad: "facil", opciones: ["Sustancias procedentes de compuestos de carbono", "Elementos metálicos como plomo o cadmio exclusivamente", "Bacterias y microorganismos patógenos exclusivamente", "Sales minerales disueltas de origen exclusivamente geológico"], correcta: 0 },
  { enunciado: "¿Qué son los contaminantes metálicos del agua?", explicacion: "Elementos metálicos tóxicos con parámetros limitados en el RD 140/2003.", dificultad: "facil", opciones: ["Elementos metálicos tóxicos por encima de ciertos valores", "Sustancias procedentes de compuestos de carbono exclusivamente", "Bacterias y microorganismos patógenos exclusivamente", "Algas presentes en el agua de origen exclusivamente"], correcta: 0 },
  { enunciado: "¿Por qué es especialmente relevante el control de bacterias y microorganismos patógenos en el agua?", explicacion: "Pueden transmitir enfermedades infecciosas directamente a través del consumo.", dificultad: "media", opciones: ["Pueden transmitir enfermedades infecciosas por consumo directo", "No representan ningún riesgo real para la salud humana", "Solo afectan a la calidad estética del agua, no a la salud", "Su presencia mejora la calidad organoléptica del agua"], correcta: 0 },
  { enunciado: "¿Qué parámetro se emplea habitualmente como indicador de contaminación fecal en el agua?", explicacion: "La presencia de bacterias coliformes, especialmente Escherichia coli.", dificultad: "media", opciones: ["La presencia de bacterias coliformes (E. coli)", "La concentración de plomo disuelto en el agua", "El nivel de cloro residual libre del agua tratada", "La turbidez medida en unidades NTU"], correcta: 0 },
  { enunciado: "¿Por qué es especialmente importante la desinfección final frente a los contaminantes microbiológicos?", explicacion: "El cloro residual elimina específicamente bacterias y microorganismos patógenos.", dificultad: "dificil", opciones: ["El cloro residual elimina específicamente microorganismos patógenos", "La desinfección no tiene ninguna relación con el control microbiológico", "Los contaminantes metálicos se eliminan únicamente mediante cloración", "Los contaminantes orgánicos se eliminan únicamente mediante cloración"], correcta: 0 },
]);

const S3 = "algas-control-laboratorio-planta";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Por qué pueden ser un problema las algas presentes en el agua bruta que llega a la planta potabilizadora?", reverso: "Pueden alterar el sabor y el olor del agua, dificultar la coagulación-floculación, colmatar los filtros con mayor rapidez, y algunas especies pueden liberar toxinas o metabolitos indeseables" },
  { anverso: "¿En qué fuentes de origen del agua de Zaragoza es más probable que aparezcan proliferaciones de algas, según su naturaleza?", reverso: "Especialmente en aguas de origen superficial almacenadas (embalses como el de Yesa) en condiciones de temperatura y luz favorables, más que en aguas de canal en movimiento continuo" },
  { anverso: "¿Cuántos parámetros analiza aproximadamente el laboratorio propio de la Planta Potabilizadora de Casablanca, según la información oficial del Ayuntamiento de Zaragoza?", reverso: "Más de 53 parámetros, muchos de ellos en análisis continuo en el tiempo" },
  { anverso: "¿Qué ventaja aporta que buena parte de esos parámetros se analicen en continuo, y no solo mediante muestras puntuales?", reverso: "Permite detectar variaciones anómalas en la calidad del agua bruta o tratada de forma casi inmediata, facilitando una respuesta operativa más rápida ante cualquier incidencia de calidad" },
  { anverso: "¿Qué relación existe entre el control de laboratorio de la planta y el cumplimiento del RD 140/2003?", reverso: "El laboratorio es la herramienta que permite verificar, de forma continua y documentada, que el agua entregada cumple efectivamente los parámetros y valores límite exigidos por el RD 140/2003, más allá de la mera aplicación teórica del proceso de tratamiento" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Por qué pueden ser un problema las algas en el agua bruta que llega a la planta?", explicacion: "Alteran sabor y olor, dificultan la coagulación y colmatan los filtros.", dificultad: "media", opciones: ["Alteran sabor/olor, dificultan la coagulación y colmatan filtros", "Mejoran automáticamente la calidad sanitaria del agua bruta", "Facilitan la desinfección posterior por cloración del agua", "No representan ningún efecto real sobre el proceso de tratamiento"], correcta: 0 },
  { enunciado: "¿En qué tipo de fuente de origen es más probable la proliferación de algas?", explicacion: "En aguas superficiales almacenadas, como embalses, con condiciones favorables de luz y temperatura.", dificultad: "media", opciones: ["En aguas superficiales almacenadas en embalses", "En aguas de canal en movimiento continuo, exclusivamente", "En aguas subterráneas profundas, exclusivamente", "En ninguna fuente de origen, al no existir riesgo real"], correcta: 0 },
  { enunciado: "¿Cuántos parámetros analiza aproximadamente el laboratorio de la Planta Potabilizadora de Casablanca?", explicacion: "Más de 53 parámetros, según la información oficial del Ayuntamiento.", dificultad: "dificil", opciones: ["Más de 53 parámetros", "Más de 5 parámetros exclusivamente", "Más de 500 parámetros", "Un único parámetro global de calidad"], correcta: 0 },
  { enunciado: "¿Qué ventaja aporta el análisis en continuo de buena parte de esos parámetros?", explicacion: "Permite detectar variaciones anómalas casi de inmediato.", dificultad: "media", opciones: ["Permite detectar variaciones anómalas casi de inmediato", "Sustituye por completo la necesidad de análisis puntuales", "Elimina por completo el riesgo de cualquier contaminación", "Reduce de forma automática el consumo de reactivos de la planta"], correcta: 0 },
  { enunciado: "¿Qué relación existe entre el laboratorio de la planta y el cumplimiento del RD 140/2003?", explicacion: "El laboratorio verifica de forma continua que el agua cumple los parámetros exigidos.", dificultad: "media", opciones: ["El laboratorio verifica que se cumplen los parámetros exigidos", "El laboratorio no guarda ninguna relación real con el RD 140/2003", "El RD 140/2003 prohíbe expresamente el análisis en continuo", "El cumplimiento del RD 140/2003 no requiere ningún control de laboratorio"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 7 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 7, orden: 7, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-203 creado y vinculado como Tema 7 de Oficial Planta Potabilizadora.");
