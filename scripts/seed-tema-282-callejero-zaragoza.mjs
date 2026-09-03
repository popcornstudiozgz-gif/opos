/**
 * Crea tema-282: "Conocimiento del municipio: callejero de Zaragoza" —
 * Tema 22 (numero=22, bloque-2) de Oficial Conductor, Especialidad
 * General (Ayto. Zaragoza). Último tema de la parte específica.
 *
 * Corresponde al TEMA 20 oficial del Anexo I (bases2110.pdf, líneas
 * 1595-1598 en adelante):
 *   "Conocimiento del municipio: Ubicaciones, disposición o trayecto
 *   más adecuado para moverse entre los puntos, establecimientos o
 *   calles que se describen a continuación: CALLEJERO DE ZARAGOZA"
 *   — seguido de un listado literal de varios miles de vías (columnas
 *   VÍA/NOMBRE) que ocupa el resto del documento oficial.
 *
 * Sourcing y enfoque (decisión tomada con el usuario en esta sesión,
 * ver AskUserQuestion): este TEMA 20 oficial no es abordable con el
 * mismo patrón de flashcards/preguntas puntuales que el resto de temas
 * — no tiene sentido pedagógico generar una muestra aleatoria de
 * preguntas sobre 15 calles sueltas de una lista de varios miles, ni
 * fabricar contenido no verificable calle a calle. Se ha optado por un
 * tratamiento CONCEPTUAL Y METODOLÓGICO: cómo se organiza el propio
 * documento oficial del callejero, un repaso verificado de las
 * principales vías estructurales de la ciudad (extraídas literalmente
 * de bases2110.pdf, sección CALLEJERO DE ZARAGOZA, sin inventar ningún
 * nombre), y una estrategia general de estudio y orientación en el
 * municipio. Se señala explícitamente, en el propio contenido del tema
 * y en enlaces_boe, que el listado calle a calle completo (miles de
 * vías) debe estudiarse directamente sobre bases2110.pdf y no está
 * reproducido aquí — siguiendo el mismo criterio de no fabricación ya
 * aplicado a otros documentos del proyecto cuyo contenido íntegro no es
 * razonable reproducir en el formato de flashcards/preguntas del sitio.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-282-callejero-zaragoza.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-282";
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
  titulo: "Conocimiento del municipio: el callejero de Zaragoza",
  descripcion: "Cómo se organiza el callejero oficial de la convocatoria. Las principales vías estructurales de Zaragoza (paseos, avenidas y gran vía). Estrategia de estudio y orientación en el municipio para un Oficial Conductor.",
  contenido: "Este TEMA 20 oficial no es un punto de temario convencional, sino un listado literal de varios miles de vías del municipio de Zaragoza (Anexo I de bases2110.pdf), que el aspirante debe conocer para ubicarse y trazar el trayecto más adecuado entre puntos concretos. Ese listado completo, calle a calle, NO está reproducido en este tema — debe estudiarse directamente sobre el documento oficial de la convocatoria (bases2110.pdf), la única fuente fiable y completa. Este tema desarrolla, en su lugar, tres aspectos transversales imprescindibles para abordar ese estudio: cómo está organizado el propio documento oficial, un repaso verificado de las principales vías estructurales de la ciudad (los grandes ejes que articulan el resto del callejero), y una estrategia general de orientación en el municipio que aproveche la estructura territorial ya estudiada en el tema de distritos y barrios rurales.",
  enlaces_boe: [
    { url: "https://www.zaragoza.es/cont/paginas/oferta/archivos/bases/bases2110.pdf", titulo: "bases2110.pdf — Anexo I, sección \"Callejero de Zaragoza\" (listado oficial completo, TEMA 20)" },
  ],
  indice_estudio: [
    { url: "https://www.zaragoza.es/cont/paginas/oferta/archivos/bases/bases2110.pdf", titulo: "Cómo se organiza el callejero oficial de la convocatoria", seccion: "organizacion-del-callejero-oficial", articulos: "bases2110.pdf, Anexo I" },
    { url: "https://www.zaragoza.es/cont/paginas/oferta/archivos/bases/bases2110.pdf", titulo: "Las principales vías estructurales de Zaragoza", seccion: "principales-vias-estructurales-de-zaragoza", articulos: "bases2110.pdf, Anexo I (callejero)" },
    { url: "", titulo: "Estrategia de estudio y orientación en el municipio", seccion: "estrategia-de-estudio-y-orientacion", articulos: "Conceptos fundamentales" },
  ],
}]);

const S1 = "organizacion-del-callejero-oficial";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Dónde se encuentra el listado oficial y completo del callejero de Zaragoza exigido por el TEMA 20 de esta oposición?", reverso: "En el Anexo I de bases2110.pdf (bases de la convocatoria CONV 4/2026), en la sección específica titulada \"CALLEJERO DE ZARAGOZA\", que recoge varios miles de vías organizadas en dos columnas: el tipo de vía y su nombre" },
  { anverso: "¿En qué formato aparece cada entrada del callejero oficial de la convocatoria?", reverso: "En dos columnas: el tipo de vía (calle, avenida, paseo, plaza, glorieta, entre otros) y el nombre de la vía, ordenadas alfabéticamente por el nombre dentro de cada bloque del documento" },
  { anverso: "¿Por qué no está reproducido en este tema el listado completo de miles de vías del callejero oficial?", reverso: "Porque no es abordable de forma fiable ni útil mediante flashcards o preguntas puntuales sobre una muestra aleatoria de un listado tan extenso — el estudio de ese listado completo debe hacerse directamente sobre el propio documento oficial de la convocatoria" },
  { anverso: "¿Qué tipos de vía son los más habituales en el callejero oficial de Zaragoza, a la vista de su estructura?", reverso: "Calle es, con diferencia, el tipo más numeroso, seguido de avenida y paseo para las vías principales, y de glorieta, plaza, camino o travesía para tipos más específicos de vía" },
  { anverso: "¿Qué utilidad práctica tiene, de cara al examen, comprender la propia estructura del documento del callejero antes de intentar memorizar vías concretas?", reverso: "Permite abordar el estudio de forma ordenada (por bloques alfabéticos, por distritos o por tipo de vía) en lugar de memorizar nombres sueltos sin ningún criterio, facilitando también localizar con rapidez una vía concreta durante el propio examen" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Dónde se encuentra el listado oficial y completo del callejero exigido por el TEMA 20?", explicacion: "En el Anexo I de bases2110.pdf, sección \"Callejero de Zaragoza\".", dificultad: "facil", opciones: ["En el Anexo I de bases2110.pdf, sección \"Callejero de Zaragoza\"", "En el Reglamento General de Vehículos, Anexo IX", "En la Ordenanza de Movilidad Urbana de Zaragoza", "En el Reglamento General de Circulación, artículo 51"], correcta: 0 },
  { enunciado: "¿En qué formato aparece cada entrada del callejero oficial?", explicacion: "Dos columnas: tipo de vía y nombre de la vía.", dificultad: "media", opciones: ["Dos columnas: tipo de vía y nombre de la vía", "Una única columna con el nombre completo de la vía", "Tres columnas: tipo de vía, nombre y código postal", "Ninguna estructura de columnas, en texto corrido sin formato"], correcta: 0 },
  { enunciado: "¿Por qué no está reproducido en este tema el listado completo del callejero oficial?", explicacion: "No es abordable de forma fiable mediante flashcards sobre una muestra aleatoria de miles de vías.", dificultad: "media", opciones: ["No es abordable de forma fiable con flashcards sobre una muestra aleatoria", "Porque el callejero oficial de Zaragoza no existe en ningún documento público", "Porque el callejero no forma parte del temario oficial de esta oposición", "Porque el callejero solo es exigible a la especialidad de Maquinaria Pesada"], correcta: 0 },
  { enunciado: "¿Qué tipos de vía son los más habituales en el callejero oficial de Zaragoza?", explicacion: "Calle es el tipo más numeroso, seguido de avenida y paseo.", dificultad: "media", opciones: ["Calle, seguido de avenida y paseo para las vías principales", "Autopista, siendo el único tipo de vía recogido en el callejero", "Glorieta, siendo el tipo más numeroso de todo el callejero oficial", "Ningún tipo de vía se especifica en el callejero oficial de la convocatoria"], correcta: 0 },
  { enunciado: "¿Qué utilidad tiene comprender la estructura del documento antes de memorizar vías concretas?", explicacion: "Permite un estudio ordenado y localizar vías con rapidez durante el examen.", dificultad: "dificil", opciones: ["Permite un estudio ordenado y localizar vías con rapidez en el examen", "Ninguna utilidad real, siendo preferible memorizar nombres sueltos sin criterio", "Solo sería útil si el examen permitiera consultar el documento original", "La estructura del documento no tiene ninguna relación con la forma de estudiarlo"], correcta: 0 },
]);

const S2 = "principales-vias-estructurales-de-zaragoza";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué paseo, verificado en el callejero oficial, es tradicionalmente uno de los ejes más conocidos y centrales de Zaragoza?", reverso: "El Paseo de la Independencia, recogido en el callejero oficial como \"PASEO INDEPENDENCIA\", uno de los ejes más conocidos y centrales de la ciudad" },
  { anverso: "¿Qué gran vía, verificada en el callejero oficial, articula una parte importante del centro de Zaragoza?", reverso: "La Gran Vía de Don Santiago Ramón y Cajal, recogida en el callejero oficial como \"PASEO GRAN VÍA DE DON SANTIAGO RAMÓN Y CAJAL\"" },
  { anverso: "¿Qué avenida, verificada en el callejero oficial, lleva el nombre del fundador romano de la ciudad?", reverso: "La Avenida César Augusto, recogida en el callejero oficial como \"AVENIDA CÉSAR AUGUSTO\"" },
  { anverso: "¿Qué avenidas, verificadas en el callejero oficial, llevan el nombre de otras ciudades o comunidades autónomas españolas?", reverso: "Entre otras, Avenida Madrid, Avenida Valencia, Avenida Navarra y Avenida Cataluña, todas ellas recogidas literalmente en el callejero oficial" },
  { anverso: "¿Qué otros paseos y avenidas, verificados en el callejero oficial, conviene tener presentes como ejes conocidos de la ciudad?", reverso: "Entre otros, el Paseo de Colón, el Paseo de la Constitución, el Paseo de las Damas, la Avenida de América, la Avenida de los Pirineos, la Avenida de Casablanca y la Avenida de la Autonomía, todos ellos recogidos literalmente en el callejero oficial" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué paseo es tradicionalmente uno de los ejes más conocidos y centrales de Zaragoza?", explicacion: "El Paseo de la Independencia.", dificultad: "facil", opciones: ["El Paseo de la Independencia", "El Paseo de los Arqueros", "El Paseo de Cuéllar", "El Paseo del Canal"], correcta: 0 },
  { enunciado: "¿Qué gran vía articula una parte importante del centro de Zaragoza, según el callejero oficial?", explicacion: "La Gran Vía de Don Santiago Ramón y Cajal.", dificultad: "media", opciones: ["La Gran Vía de Don Santiago Ramón y Cajal", "La Avenida de la Ilustración", "La Avenida de Francia", "El Paseo de Aragón, Reyes de"], correcta: 0 },
  { enunciado: "¿Qué avenida lleva el nombre del fundador romano de Zaragoza, según el callejero oficial?", explicacion: "La Avenida César Augusto.", dificultad: "media", opciones: ["La Avenida César Augusto", "La Avenida de Cataluña", "La Avenida de Goya, Francisco de", "La Avenida del Cierzo"], correcta: 0 },
  { enunciado: "¿Cuál de las siguientes avenidas, verificadas en el callejero oficial, lleva el nombre de una comunidad autónoma española?", explicacion: "Avenida Cataluña.", dificultad: "media", opciones: ["Avenida Cataluña", "Avenida César Augusto", "Avenida de la Ilustración", "Avenida de Francia"], correcta: 0 },
  { enunciado: "¿Cuál de los siguientes es un paseo verificado en el callejero oficial de Zaragoza?", explicacion: "Paseo de Colón.", dificultad: "dificil", opciones: ["Paseo de Colón", "Avenida del Real Zaragoza", "Avenida de la Autonomía", "Avenida de los Pirineos, Los"], correcta: 0 },
]);

const S3 = "estrategia-de-estudio-y-orientacion";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué relación práctica existe entre este tema y el ya estudiado sobre los distritos urbanos y los barrios rurales de Zaragoza?", reverso: "Conocer los distritos urbanos y los barrios rurales ayuda a agrupar mentalmente el callejero por zonas geográficas, en lugar de memorizar nombres de calles sin ningún criterio territorial que los relacione entre sí" },
  { anverso: "¿Qué ventaja tiene estudiar el callejero apoyándose en un mapa real de Zaragoza, en lugar de memorizar solo la lista de nombres del documento oficial?", reverso: "Permite visualizar la posición relativa de cada vía respecto a los grandes ejes y distritos ya conocidos, facilitando deducir un trayecto razonable entre dos puntos aunque no se recuerde con exactitud la ubicación de cada calle concreta" },
  { anverso: "¿Por qué es recomendable priorizar el estudio de las vías principales (avenidas, paseos, grandes ejes) antes que el de las calles secundarias del callejero?", reverso: "Porque las vías principales son las que con mayor probabilidad definen el trayecto más adecuado entre dos puntos alejados del municipio, mientras que las calles secundarias suelen ser relevantes solo en el tramo final de un trayecto concreto" },
  { anverso: "¿Qué estrategia general recomienda este tema para abordar el estudio de un listado tan extenso como el callejero oficial de Zaragoza?", reverso: "Combinar el estudio por bloques (alfabético o por distrito) del documento oficial con la práctica activa sobre un mapa real de la ciudad, en lugar de intentar memorizar el listado completo de forma lineal sin ningún apoyo visual" },
  { anverso: "¿Por qué no sustituye este tema conceptual al estudio directo del listado oficial completo de bases2110.pdf?", reverso: "Porque el examen puede preguntar por vías concretas del listado oficial que no están recogidas aquí, por lo que este tema debe entenderse como una guía de método y de orientación general, no como un resumen que dispense de consultar el documento oficial completo" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué relación existe entre este tema y el ya estudiado sobre distritos urbanos y barrios rurales?", explicacion: "Conocer los distritos ayuda a agrupar el callejero por zonas geográficas.", dificultad: "facil", opciones: ["Conocer los distritos ayuda a agrupar el callejero por zonas", "Ninguna relación real entre ambos temas de la oposición", "Los distritos urbanos sustituyen por completo al callejero oficial", "El callejero solo es relevante para los barrios rurales, no los distritos"], correcta: 0 },
  { enunciado: "¿Qué ventaja tiene estudiar el callejero apoyándose en un mapa real de la ciudad?", explicacion: "Permite visualizar la posición relativa de cada vía respecto a ejes y distritos ya conocidos.", dificultad: "media", opciones: ["Permite visualizar la posición relativa de cada vía respecto a ejes conocidos", "Ninguna ventaja real frente a memorizar la lista de nombres sin ningún apoyo", "Un mapa real solo sería útil para los barrios rurales, no los distritos urbanos", "Estudiar con mapa sustituye por completo la necesidad de consultar el documento oficial"], correcta: 0 },
  { enunciado: "¿Por qué es recomendable priorizar el estudio de las vías principales antes que las calles secundarias?", explicacion: "Las vías principales definen con mayor probabilidad el trayecto entre puntos alejados.", dificultad: "media", opciones: ["Las vías principales definen el trayecto entre puntos alejados", "Las calles secundarias siempre son más relevantes que cualquier vía principal", "No existe ninguna diferencia real de prioridad entre ambos tipos de vía", "Las vías principales solo son relevantes dentro del distrito Centro de la ciudad"], correcta: 0 },
  { enunciado: "¿Qué estrategia general recomienda este tema para el estudio del callejero?", explicacion: "Combinar el estudio por bloques del documento oficial con la práctica sobre un mapa real.", dificultad: "media", opciones: ["Combinar el estudio por bloques con la práctica sobre un mapa real", "Memorizar el listado completo de forma estrictamente lineal, sin ningún apoyo visual", "Ignorar por completo el documento oficial, confiando solo en el conocimiento previo", "Estudiar exclusivamente las calles del distrito donde resida el propio aspirante"], correcta: 0 },
  { enunciado: "¿Por qué no sustituye este tema conceptual al estudio directo del listado oficial completo?", explicacion: "El examen puede preguntar por vías concretas no recogidas aquí; es una guía de método, no un resumen sustitutivo.", dificultad: "dificil", opciones: ["El examen puede preguntar por vías concretas no recogidas en este tema", "Porque este tema conceptual ya recoge la totalidad del listado oficial completo", "Porque el listado oficial completo ha quedado derogado por la propia convocatoria", "Porque el examen de esta oposición no incluye preguntas sobre el callejero oficial"], correcta: 0 },
]);

console.log(`📖 glosario...`);
await insertar("glosario", [
  { tema_slug: TEMA, seccion: S1, termino: "Callejero", definicion: "Listado ordenado de las vías (calles, avenidas, paseos, plazas...) de un municipio; en esta convocatoria, recogido en el Anexo I de bases2110.pdf como TEMA 20 oficial." },
  { tema_slug: TEMA, seccion: S1, termino: "Tipo de vía", definicion: "Categoría que precede al nombre de cada entrada del callejero oficial (calle, avenida, paseo, plaza, glorieta, camino, travesía, entre otras)." },
  { tema_slug: TEMA, seccion: S2, termino: "Vía estructural", definicion: "Avenida, paseo o gran vía que actúa como eje principal de circulación de la ciudad, articulando el trayecto entre zonas alejadas del municipio." },
  { tema_slug: TEMA, seccion: S2, termino: "Gran Vía de Don Santiago Ramón y Cajal", definicion: "Vía estructural del centro de Zaragoza, recogida en el callejero oficial de la convocatoria como una de las principales arterias de la ciudad." },
  { tema_slug: TEMA, seccion: S3, termino: "Orientación por distrito", definicion: "Estrategia de estudio del callejero que aprovecha la organización territorial de Zaragoza en distritos urbanos y barrios rurales para agrupar mentalmente las vías por zona." },
  { tema_slug: TEMA, seccion: S3, termino: "Trayecto más adecuado", definicion: "Concepto central del TEMA 20 oficial: no basta con ubicar una vía aislada, sino con determinar la ruta razonable entre dos puntos concretos del municipio." },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 22 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 22, orden: 22, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-282 creado y vinculado como Tema 22 de Oficial Conductor General.");
console.log("\n🎉 ¡Parte específica completa! 16/16 temas (numero 7-22).");
