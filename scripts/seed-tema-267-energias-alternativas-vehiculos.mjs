/**
 * Crea tema-267: "Energías alternativas en vehículos" — Tema 7 (numero=7,
 * bloque-2) de Oficial Conductor, Especialidad General (Ayto. Zaragoza).
 * Primer tema de la parte específica de esta oposición.
 *
 * Corresponde al TEMA 5 oficial del Anexo I (bases2110.pdf, línea 1571):
 *   "Energías alternativas en vehículos: Eléctricos. Híbridos. Gas licuado
 *   del petróleo (GLP). Hidrógeno. Gas natural comprimido (GNC)."
 *
 * Sourcing: contenido técnico de electromovilidad sin ley única que lo
 * regule como tal (mismo criterio ya aplicado en Oficial Mecánico,
 * verificado con búsqueda previa conforme al estándar del proyecto), con
 * dos excepciones de normativa real y verificada citadas en la sección de
 * GLP/GNC:
 *   - Reglamentos CEPE/ONU nº 67 (sistemas GLP), nº 110 (sistemas GNC) y
 *     nº 115 (sistemas de adaptación GLP/GNC), publicados en el DOUE
 *     (DOUE-L-2014-83339) y de aplicación directa en España.
 *   - Real Decreto 750/2010, de 4 de junio (BOE-A-2010-9994), que regula
 *     los procedimientos de homologación de vehículos de motor en España,
 *     incluidas las transformaciones a GLP/GNC.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-267-energias-alternativas-vehiculos.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-267";
const OPOSICION = "oficial-conductor-general-ayto-zaragoza";
const BLOQUE_2_ID = "38c4f100-214c-45c4-8600-841993100e43";

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
  titulo: "Energías alternativas en vehículos",
  descripcion: "Vehículos eléctricos e híbridos (BEV, PHEV, HEV, MHEV). Gas licuado del petróleo (GLP) y gas natural comprimido (GNC) como carburantes alternativos. El hidrógeno y la pila de combustible. Comparativa entre energías alternativas.",
  contenido: "Desarrolla las principales energías alternativas al motor de combustión convencional de gasolina o diésel presentes en el parque de vehículos: la propulsión eléctrica pura y los distintos grados de hibridación, los carburantes gaseosos GLP y GNC (su almacenamiento a bordo y su homologación), y el hidrógeno como vector energético mediante la pila de combustible, cerrando con una comparativa práctica entre todas ellas en términos de autonomía, tiempo de repostaje/recarga e infraestructura disponible.",
  enlaces_boe: [
    { url: "https://www.boe.es/buscar/doc.php?id=DOUE-L-2014-83339", titulo: "Reglamentos CEPE/ONU nº 67, 110 y 115 (sistemas GLP/GNC en vehículos)" },
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2010-9994", titulo: "Real Decreto 750/2010, de 4 de junio (homologación de vehículos)" },
  ],
  indice_estudio: [
    { url: "", titulo: "Vehículos eléctricos e híbridos", seccion: "vehiculos-electricos-e-hibridos", articulos: "Conceptos fundamentales" },
    { url: "https://www.boe.es/buscar/doc.php?id=DOUE-L-2014-83339", titulo: "GLP y GNC en vehículos", seccion: "glp-y-gnc-en-vehiculos", articulos: "Reglamentos CEPE/ONU 67, 110 y 115" },
    { url: "", titulo: "Hidrógeno y comparativa de energías alternativas", seccion: "hidrogeno-y-comparativa-energias-alternativas", articulos: "Conceptos fundamentales" },
  ],
}]);

const S1 = "vehiculos-electricos-e-hibridos";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un vehículo eléctrico puro o BEV?", reverso: "Un vehículo cuya única fuente de energía para la propulsión es una batería eléctrica recargable, sin motor de combustión interna, que mueve el vehículo mediante uno o varios motores eléctricos (Battery Electric Vehicle)" },
  { anverso: "¿Qué diferencia a un híbrido enchufable (PHEV) de un híbrido convencional (HEV)?", reverso: "El PHEV (Plug-in Hybrid Electric Vehicle) incorpora una batería de mayor capacidad que se puede recargar enchufándola a una toma externa y permite circular varios kilómetros en modo eléctrico puro; el HEV (Hybrid Electric Vehicle) solo recarga su batería, más pequeña, mediante el propio motor de combustión y la frenada regenerativa, sin enchufe externo" },
  { anverso: "¿Qué es un microhíbrido o MHEV?", reverso: "Un vehículo con un pequeño motor eléctrico (mild hybrid) que asiste al motor de combustión en arranques y aceleraciones y recupera energía en la frenada, pero que no puede circular en modo eléctrico puro" },
  { anverso: "¿Qué es la frenada regenerativa?", reverso: "Un sistema que, al frenar o levantar el pie del acelerador, utiliza el motor eléctrico como generador para transformar la energía cinética del vehículo en electricidad y recargar la batería, en lugar de disiparla solo como calor en los frenos" },
  { anverso: "¿Qué diferencia existe entre la recarga en corriente alterna (CA) y en corriente continua (CC) de un vehículo eléctrico?", reverso: "La recarga en CA es más lenta y utiliza el cargador interno del propio vehículo (habitual en puntos domésticos o públicos de baja/media potencia); la recarga en CC es rápida o ultrarrápida y suministra corriente continua directamente a la batería sin pasar por el cargador del vehículo, reduciendo notablemente el tiempo de recarga" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es un vehículo eléctrico puro o BEV?", explicacion: "Un vehículo propulsado únicamente por batería eléctrica, sin motor de combustión.", dificultad: "facil", opciones: ["Un vehículo propulsado únicamente por batería eléctrica", "Un vehículo con motor de combustión y batería de arranque convencional", "Un vehículo propulsado exclusivamente por gas natural comprimido", "Un vehículo propulsado exclusivamente por gas licuado del petróleo"], correcta: 0 },
  { enunciado: "¿Qué caracteriza a un híbrido enchufable frente a uno convencional?", explicacion: "El PHEV permite recarga externa y varios km en modo eléctrico puro; el HEV no se enchufa.", dificultad: "media", opciones: ["El PHEV se puede enchufar a una toma externa y circula en modo eléctrico puro", "El HEV siempre tiene mayor autonomía eléctrica que cualquier PHEV", "El PHEV nunca incorpora motor de combustión interna", "No existe ninguna diferencia real entre PHEV y HEV"], correcta: 0 },
  { enunciado: "¿Qué es un vehículo microhíbrido o MHEV?", explicacion: "Un vehículo con motor eléctrico de asistencia que no puede circular en modo eléctrico puro.", dificultad: "media", opciones: ["Un vehículo con motor eléctrico de asistencia, sin modo eléctrico puro", "Un vehículo eléctrico puro sin motor de combustión de ningún tipo", "Un vehículo híbrido enchufable con gran autonomía eléctrica", "Un vehículo propulsado exclusivamente por hidrógeno"], correcta: 0 },
  { enunciado: "¿Qué función cumple la frenada regenerativa?", explicacion: "Transforma energía cinética en electricidad al frenar, recargando la batería.", dificultad: "media", opciones: ["Transforma energía cinética en electricidad para recargar la batería", "Aumenta la potencia máxima del motor de combustión del vehículo", "Reduce exclusivamente el desgaste de los neumáticos del vehículo", "Elimina por completo la necesidad de frenos mecánicos convencionales"], correcta: 0 },
  { enunciado: "¿Qué diferencia existe entre la recarga en CA y en CC de un vehículo eléctrico?", explicacion: "La CC es rápida/ultrarrápida y alimenta la batería directamente; la CA es más lenta.", dificultad: "dificil", opciones: ["La CC es más rápida al alimentar la batería directamente sin el cargador del vehículo", "La CA es siempre más rápida que cualquier recarga en corriente continua", "Ambas formas de recarga tardan exactamente el mismo tiempo en todos los casos", "La CC solo puede utilizarse en vehículos híbridos, nunca en eléctricos puros"], correcta: 0 },
]);

const S2 = "glp-y-gnc-en-vehiculos";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es el GLP (gas licuado del petróleo) como carburante de automoción?", reverso: "Una mezcla de propano y butano, subproducto del refino de petróleo, que se almacena en estado líquido a presión moderada en un depósito específico del vehículo (autogas) y se transforma en gas al pasar por el regulador antes de llegar al motor" },
  { anverso: "¿Qué es el GNC (gas natural comprimido) como carburante de automoción?", reverso: "Gas natural (principalmente metano) comprimido a alta presión, en torno a 200 bar, y almacenado en cilindros específicos de gran resistencia a bordo del vehículo, distinto del GLP tanto en su composición como en su forma de almacenamiento" },
  { anverso: "¿Qué son los Reglamentos CEPE/ONU nº 67 y nº 110?", reverso: "Reglamentos internacionales, aplicables en España vía DOUE, que regulan la homologación de los componentes específicos de los sistemas de GLP (nº 67) y de GNC (nº 110) instalados en vehículos de motor para su propulsión" },
  { anverso: "¿Qué regula el Real Decreto 750/2010?", reverso: "Los procedimientos de homologación de vehículos de motor en España, aplicables tanto a vehículos de serie fabricados con GLP/GNC como a las transformaciones posteriores de vehículos de gasolina a GLP o GNC" },
  { anverso: "¿Qué distintivo ambiental de la DGT corresponde, con carácter general, a un vehículo propulsado por GLP o GNC?", reverso: "El distintivo ambiental ECO, la misma categoría que corresponde a los vehículos híbridos no enchufables (HEV), al considerarse carburantes de menor impacto ambiental que la gasolina o el diésel convencionales" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es el GLP como carburante de automoción?", explicacion: "Una mezcla de propano y butano almacenada en estado líquido a presión moderada.", dificultad: "facil", opciones: ["Una mezcla de propano y butano almacenada en estado líquido", "Gas natural comprimido a 200 bar en cilindros específicos", "Hidrógeno almacenado a presión en depósitos de alta resistencia", "Electricidad almacenada en una batería de gran capacidad"], correcta: 0 },
  { enunciado: "¿Qué caracteriza el almacenamiento del GNC en un vehículo?", explicacion: "Se comprime a alta presión, en torno a 200 bar, en cilindros específicos.", dificultad: "media", opciones: ["Se comprime a alta presión en cilindros específicos de gran resistencia", "Se almacena siempre en estado líquido a presión atmosférica normal", "Se almacena en la misma forma exacta que el GLP convencional", "No requiere ningún depósito específico distinto del depósito de gasolina"], correcta: 0 },
  { enunciado: "¿Qué regulan los Reglamentos CEPE/ONU nº 67 y nº 110?", explicacion: "La homologación de los sistemas GLP (67) y GNC (110) instalados en vehículos.", dificultad: "media", opciones: ["La homologación de los sistemas de GLP y de GNC en vehículos", "Exclusivamente el etiquetado ambiental de los vehículos eléctricos", "Exclusivamente los tiempos de conducción y descanso de conductores", "Exclusivamente las masas y dimensiones máximas de los vehículos"], correcta: 0 },
  { enunciado: "¿Qué regula en España el Real Decreto 750/2010?", explicacion: "Los procedimientos de homologación de vehículos, incluidas las transformaciones a GLP/GNC.", dificultad: "media", opciones: ["Los procedimientos de homologación de vehículos de motor en España", "Exclusivamente los tiempos de conducción y descanso de los conductores", "Exclusivamente el régimen sancionador de las infracciones de tráfico", "Exclusivamente el etiquetado energético de los electrodomésticos"], correcta: 0 },
  { enunciado: "¿Qué distintivo ambiental de la DGT corresponde con carácter general a un vehículo GLP o GNC?", explicacion: "El distintivo ECO, igual que los híbridos no enchufables.", dificultad: "dificil", opciones: ["El distintivo ECO, igual que los vehículos híbridos no enchufables", "El distintivo Cero Emisiones, igual que los vehículos eléctricos puros", "El distintivo C, igual que los vehículos de gasolina más recientes", "Ningún distintivo ambiental, al no estar contemplados en el sistema de la DGT"], correcta: 0 },
]);

const S3 = "hidrogeno-y-comparativa-energias-alternativas";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un vehículo de pila de combustible de hidrógeno o FCEV?", reverso: "Un vehículo eléctrico (Fuel Cell Electric Vehicle) que no almacena la electricidad en una batería para toda su energía, sino que la genera a bordo mediante una pila de combustible que combina el hidrógeno almacenado con el oxígeno del aire, produciendo electricidad y, como único residuo, vapor de agua" },
  { anverso: "¿A qué presión suele almacenarse el hidrógeno a bordo de un vehículo FCEV?", reverso: "En torno a 700 bar, en depósitos de alta resistencia específicamente diseñados y homologados para soportar esa presión con las máximas garantías de seguridad" },
  { anverso: "¿Qué ventaja principal ofrece un FCEV frente a un BEV en cuanto a repostaje?", reverso: "Un tiempo de repostaje de hidrógeno mucho más corto (pocos minutos, similar al de un vehículo convencional) frente al tiempo de recarga de la batería de un vehículo eléctrico puro, incluso en recarga rápida" },
  { anverso: "¿Cuál es, en términos generales, la principal limitación actual del hidrógeno como energía alternativa en vehículos?", reverso: "La escasez de infraestructura de repostaje (hidrogeneras), muy inferior en número a los puntos de recarga eléctrica o a las gasolineras convencionales, lo que limita su uso práctico fuera de rutas o flotas concretas" },
  { anverso: "Entre BEV, PHEV, HEV, GLP, GNC y FCEV, ¿cuál es la única opción cuyo único residuo de la reacción energética a bordo es vapor de agua?", reverso: "El vehículo de hidrógeno con pila de combustible (FCEV), ya que la reacción química entre el hidrógeno y el oxígeno del aire dentro de la pila de combustible solo genera electricidad y vapor de agua como residuo" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es un vehículo FCEV?", explicacion: "Un vehículo eléctrico que genera electricidad a bordo mediante una pila de combustible de hidrógeno.", dificultad: "facil", opciones: ["Un vehículo eléctrico que genera electricidad mediante pila de combustible", "Un vehículo propulsado exclusivamente por gas licuado del petróleo", "Un vehículo híbrido enchufable sin ningún depósito de hidrógeno", "Un vehículo propulsado exclusivamente por gas natural comprimido"], correcta: 0 },
  { enunciado: "¿A qué presión aproximada se almacena el hidrógeno en un vehículo FCEV?", explicacion: "En torno a 700 bar, en depósitos de alta resistencia homologados.", dificultad: "media", opciones: ["En torno a 700 bar", "En torno a 200 bar, la misma presión que el GNC", "A presión atmosférica normal, sin ninguna compresión", "En estado líquido a presión moderada, igual que el GLP"], correcta: 0 },
  { enunciado: "¿Qué ventaja ofrece un FCEV frente a un BEV en cuanto a repostaje?", explicacion: "Un repostaje mucho más rápido, similar al de un vehículo convencional.", dificultad: "media", opciones: ["Un tiempo de repostaje mucho más corto que la recarga de una batería", "Una autonomía siempre inferior a la de cualquier vehículo eléctrico puro", "La ausencia total de necesidad de repostar o recargar el vehículo", "Un coste de repostaje siempre inferior al de la recarga eléctrica"], correcta: 0 },
  { enunciado: "¿Cuál es la principal limitación actual del hidrógeno como energía alternativa en vehículos?", explicacion: "La escasa infraestructura de repostaje (hidrogeneras) disponible.", dificultad: "media", opciones: ["La escasa infraestructura de repostaje (hidrogeneras) disponible", "La imposibilidad técnica de almacenar hidrógeno a bordo de un vehículo", "La ausencia total de vehículos de hidrógeno homologados en Europa", "El hecho de que el hidrógeno no pueda usarse en absoluto en automoción"], correcta: 0 },
  { enunciado: "¿Cuál de estas energías alternativas produce únicamente vapor de agua como residuo de su reacción energética a bordo?", explicacion: "El hidrógeno en pila de combustible (FCEV).", dificultad: "dificil", opciones: ["El hidrógeno en pila de combustible (FCEV)", "El gas licuado del petróleo (GLP)", "El gas natural comprimido (GNC)", "La batería de un vehículo híbrido convencional (HEV)"], correcta: 0 },
]);

console.log(`📖 glosario...`);
await insertar("glosario", [
  { tema_slug: TEMA, seccion: S1, termino: "BEV", definicion: "Battery Electric Vehicle: vehículo eléctrico puro, propulsado únicamente por batería, sin motor de combustión interna." },
  { tema_slug: TEMA, seccion: S1, termino: "Frenada regenerativa", definicion: "Sistema que recupera energía cinética durante la frenada o la deceleración, transformándola en electricidad para recargar la batería." },
  { tema_slug: TEMA, seccion: S2, termino: "Autogas", definicion: "Denominación comercial habitual del GLP utilizado como carburante de automoción." },
  { tema_slug: TEMA, seccion: S2, termino: "Regulador de GLP", definicion: "Componente del sistema GLP que transforma el gas licuado almacenado en estado líquido en gas, a la presión adecuada, antes de su entrada en el motor." },
  { tema_slug: TEMA, seccion: S3, termino: "Pila de combustible", definicion: "Dispositivo que genera electricidad mediante una reacción electroquímica entre el hidrógeno almacenado y el oxígeno del aire, produciendo como único residuo vapor de agua." },
  { tema_slug: TEMA, seccion: S3, termino: "Hidrogenera", definicion: "Instalación específica de repostaje de hidrógeno para vehículos FCEV, equivalente en su función a una gasolinera o a un punto de recarga eléctrica." },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 7 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 7, orden: 7, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-267 creado y vinculado como Tema 7 de Oficial Conductor General.");
