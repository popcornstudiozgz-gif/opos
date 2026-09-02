/**
 * Crea tema-192: "Estructura y materiales de las conducciones de agua" —
 * Tema 12 (numero=12, bloque-2) de Oficial Guardallaves (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 10 oficial del Anexo I (bases2110.pdf, línea 913):
 *   "Estructura de las conducciones. Elementos de las conducciones:
 *   tuberías de fundición, uniones, tuberías de hormigón, uniones,
 *   tuberías de fibrocemento, uniones, tuberías de acero, uniones,
 *   tuberías de polietileno, uniones, tuberías de PVC, uniones. Pruebas
 *   a realizar en la red de conducción de agua."
 *
 * Sourcing verificado mediante búsqueda en esta sesión: existen normas
 * UNE-EN específicas para tres de los materiales citados —
 * UNE-EN 545 (tuberías de fundición dúctil), UNE-EN ISO 1452 (tuberías
 * de PVC no plastificado) y UNE-EN 12201 (tuberías de polietileno para
 * conducción de agua) —, citadas por su función y alcance general sin
 * reproducir contenido técnico no verificado directamente en detalle.
 * Para las tuberías de hormigón y de fibrocemento no se ha localizado en
 * esta sesión una norma UNE-EN concreta con la misma certeza, y el
 * fibrocemento, además, está hoy fuera de uso en obra nueva por su
 * contenido en amianto (regulado, en su vertiente de riesgo laboral, por
 * el RD 396/2006, ya verificado en otras oposiciones del proyecto) —
 * ambos materiales se explican como parte del parque histórico de la
 * red, sin atribuirles una norma UNE-EN concreta no verificada.
 *
 * Tres secciones:
 * 1. materiales-tradicionales-fundicion-hormigon-fibrocemento-acero
 * 2. materiales-plasticos-polietileno-pvc
 * 3. uniones-pruebas-red-conduccion-agua
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-192-estructura-materiales-conducciones.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-192";
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
  titulo: "Estructura y materiales de las conducciones de agua",
  descripcion: "Tuberías de fundición, hormigón, fibrocemento y acero: características y uniones. Tuberías plásticas de polietileno y PVC (UNE-EN 545, UNE-EN ISO 1452, UNE-EN 12201). Pruebas a realizar en la red de conducción de agua.",
  contenido: "Describe los materiales empleados en las conducciones de la red de abastecimiento de agua a lo largo de su historia y en la actualidad: los materiales tradicionales (fundición, hormigón, fibrocemento y acero) y sus sistemas de unión, los materiales plásticos hoy predominantes en obra nueva (polietileno y PVC, normalizados respectivamente por UNE-EN 12201 y UNE-EN ISO 1452, junto con la fundición dúctil normalizada por UNE-EN 545), y las pruebas que deben realizarse sobre una conducción antes de su puesta en servicio.",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "Materiales tradicionales: fundición, hormigón, fibrocemento y acero", seccion: "materiales-tradicionales-fundicion-hormigon-fibrocemento-acero", articulos: "UNE-EN 545 (fundición dúctil); resto, conocimiento técnico del oficio" },
    { url: "", titulo: "Materiales plásticos: polietileno y PVC", seccion: "materiales-plasticos-polietileno-pvc", articulos: "UNE-EN 12201 (polietileno); UNE-EN ISO 1452 (PVC)" },
    { url: "", titulo: "Uniones y pruebas en la red de conducción de agua", seccion: "uniones-pruebas-red-conduccion-agua", articulos: "Conocimiento técnico del oficio de guardallaves" },
  ],
}]);

const S1 = "materiales-tradicionales-fundicion-hormigon-fibrocemento-acero";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué norma regula los tubos, racores y accesorios de fundición dúctil para conducciones de agua?", reverso: "La norma UNE-EN 545, que especifica requisitos y métodos de ensayo para canalizaciones exteriores de agua no tratada, tratada o regenerada, con o sin presión" },
  { anverso: "¿Qué ventaja tiene la fundición dúctil frente a la fundición gris que empleaban las conducciones más antiguas?", reverso: "Una resistencia mecánica y una ductilidad (capacidad de deformarse sin romperse) muy superiores, lo que reduce el riesgo de rotura frágil ante golpes o movimientos del terreno" },
  { anverso: "¿Qué características tienen las tuberías de hormigón empleadas en algunas conducciones antiguas de gran diámetro?", reverso: "Buena resistencia a la compresión y a la corrosión externa, pero mayor peso y fragilidad ante esfuerzos de tracción o flexión que las tuberías metálicas o plásticas" },
  { anverso: "¿Qué es el fibrocemento y por qué está hoy fuera de uso en obra nueva de abastecimiento?", reverso: "Un material compuesto de cemento reforzado con fibras que tradicionalmente incluían amianto; su fabricación e instalación en obra nueva está descartada por el riesgo para la salud del amianto, regulado en materia de prevención de riesgos laborales por el RD 396/2006" },
  { anverso: "¿En qué circunstancias siguen empleándose tuberías de acero en la red de abastecimiento?", reverso: "En tramos que requieren especial resistencia mecánica (grandes presiones, cruces de infraestructuras, tramos vistos o en instalaciones de bombeo), por su elevada resistencia frente a esfuerzos mecánicos" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué norma regula los tubos y accesorios de fundición dúctil para conducciones de agua?", explicacion: "La norma UNE-EN 545.", dificultad: "media", opciones: ["La norma UNE-EN 545", "La norma UNE-EN 12201", "La norma UNE-EN ISO 1452", "La norma UNE-EN 124"], correcta: 0 },
  { enunciado: "¿Qué ventaja tiene la fundición dúctil frente a la fundición gris más antigua?", explicacion: "Una resistencia y ductilidad muy superiores, reduciendo el riesgo de rotura frágil.", dificultad: "media", opciones: ["Una resistencia y ductilidad muy superiores", "Un coste de fabricación siempre inferior en cualquier diámetro", "Una resistencia nula a la corrosión externa del terreno", "Una necesidad de mantenimiento prácticamente inexistente"], correcta: 0 },
  { enunciado: "¿Qué característica define a las tuberías de hormigón de gran diámetro?", explicacion: "Buena resistencia a compresión, pero mayor peso y fragilidad ante tracción o flexión.", dificultad: "dificil", opciones: ["Buena resistencia a compresión, pero mayor peso y fragilidad a flexión", "Una ligereza excepcional frente al resto de materiales tradicionales", "Una resistencia nula a los esfuerzos de compresión del terreno", "Una flexibilidad superior a la de las tuberías de polietileno"], correcta: 0 },
  { enunciado: "¿Por qué está hoy descartado el fibrocemento en obra nueva de abastecimiento?", explicacion: "Por el riesgo para la salud del amianto que tradicionalmente incluía.", dificultad: "media", opciones: ["Por el riesgo para la salud del amianto que tradicionalmente incluía", "Porque su fabricación fue prohibida exclusivamente por motivos estéticos", "Porque no soporta ninguna presión de servicio en la red municipal", "Porque su coste de fabricación es siempre superior al del acero"], correcta: 0 },
  { enunciado: "¿En qué tramos de la red suelen emplearse tuberías de acero?", explicacion: "En tramos que requieren especial resistencia mecánica.", dificultad: "media", opciones: ["En tramos que requieren especial resistencia mecánica", "Exclusivamente en las acometidas domiciliarias de menor calibre", "Exclusivamente en las instalaciones de riego de zonas verdes", "Nunca se emplean tuberías de acero en la red de abastecimiento"], correcta: 0 },
]);

const S2 = "materiales-plasticos-polietileno-pvc";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué norma regula las tuberías de polietileno (PE) para el abastecimiento de agua?", reverso: "La norma UNE-EN 12201, que en sus distintas partes recoge las características físicas y mecánicas que debe cumplir la tubería de polietileno para conducción de agua" },
  { anverso: "¿Qué ventajas presenta el polietileno frente a materiales tradicionales como la fundición o el hormigón?", reverso: "Ligereza, flexibilidad (permite cierta curvatura sin accesorios), buena resistencia a la corrosión y facilidad de unión por termofusión o electrofusión, lo que agiliza su instalación" },
  { anverso: "¿Qué norma regula las tuberías de PVC no plastificado empleadas en conducciones de agua?", reverso: "La norma UNE-EN ISO 1452, en sus distintas partes" },
  { anverso: "¿Qué característica distingue al PVC del polietileno en cuanto a su comportamiento mecánico?", reverso: "El PVC es más rígido y menos flexible que el polietileno, lo que condiciona su instalación (menor capacidad de absorber pequeños movimientos del terreno) y su sistema de unión habitual (encolado o junta elástica, frente a la termofusión del polietileno)" },
  { anverso: "¿Por qué el polietileno y el PVC son hoy los materiales predominantes en las nuevas conducciones de abastecimiento de agua?", reverso: "Por su ligereza, su resistencia a la corrosión (a diferencia de los materiales metálicos), su menor coste de instalación y su larga vida útil en servicio" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué norma regula las tuberías de polietileno para el abastecimiento de agua?", explicacion: "La norma UNE-EN 12201.", dificultad: "media", opciones: ["La norma UNE-EN 12201", "La norma UNE-EN 545", "La norma UNE-EN 14339", "La norma UNE-EN 1074"], correcta: 0 },
  { enunciado: "¿Qué ventaja del polietileno agiliza especialmente su instalación en obra?", explicacion: "La facilidad de unión por termofusión o electrofusión.", dificultad: "media", opciones: ["La facilidad de unión por termofusión o electrofusión", "La necesidad de soldadura eléctrica con arco manual", "La necesidad de un acabado exterior pintado obligatorio", "La imposibilidad de curvarse en ningún tramo de la traza"], correcta: 0 },
  { enunciado: "¿Qué norma regula las tuberías de PVC no plastificado para conducciones de agua?", explicacion: "La norma UNE-EN ISO 1452.", dificultad: "media", opciones: ["La norma UNE-EN ISO 1452", "La norma UNE-EN 12201", "La norma UNE-EN 545", "La norma UNE-EN 124"], correcta: 0 },
  { enunciado: "¿Qué diferencia mecánica distingue al PVC del polietileno?", explicacion: "El PVC es más rígido y menos flexible que el polietileno.", dificultad: "dificil", opciones: ["El PVC es más rígido y menos flexible que el polietileno", "El PVC es siempre más flexible que el polietileno", "Ambos materiales tienen exactamente el mismo comportamiento mecánico", "El polietileno no admite ningún tipo de curvatura en su trazado"], correcta: 0 },
  { enunciado: "¿Por qué el polietileno y el PVC son hoy los materiales predominantes en obra nueva?", explicacion: "Por su ligereza, resistencia a la corrosión, menor coste y larga vida útil.", dificultad: "media", opciones: ["Por su ligereza, resistencia a la corrosión y menor coste de instalación", "Porque son los únicos materiales admitidos por la normativa vigente", "Porque no requieren ninguna prueba de presión antes de su puesta en servicio", "Porque no pueden emplearse en ningún caso en tramos de gran diámetro"], correcta: 0 },
]);

const S3 = "uniones-pruebas-red-conduccion-agua";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué tipos de unión son habituales en tuberías de fundición dúctil?", reverso: "La unión por junta elástica automática (con anillo de goma) y la unión embridada (mediante bridas atornilladas), esta última habitual en piezas especiales y en tramos vistos" },
  { anverso: "¿Qué tipos de unión son habituales en tuberías de polietileno?", reverso: "La unión por electrofusión (mediante un manguito con resistencia eléctrica interna) y la unión por termofusión a tope (calentando y uniendo directamente los extremos de la tubería)" },
  { anverso: "¿Qué tipos de unión son habituales en tuberías de PVC?", reverso: "La unión por encolado (con adhesivo específico) y la unión por junta elástica (con anillo de goma en un extremo abocardado), según el diámetro y la presión de servicio" },
  { anverso: "¿En qué consiste la prueba de presión (o prueba hidráulica) de una conducción antes de su puesta en servicio?", reverso: "En llenar de agua el tramo instalado y someterlo a una presión superior a la de servicio durante un tiempo determinado, comprobando que no se producen fugas ni pérdidas de presión significativas en las uniones ni en el propio material" },
  { anverso: "¿Qué otra prueba, además de la de presión, debe realizarse antes de poner en servicio una conducción nueva de agua potable?", reverso: "La desinfección de la conducción (habitualmente con cloro) y la comprobación posterior de la calidad del agua, conforme a los criterios sanitarios del Real Decreto 140/2003, antes de autorizar su uso para consumo humano" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué tipos de unión son habituales en tuberías de fundición dúctil?", explicacion: "Junta elástica automática y unión embridada.", dificultad: "media", opciones: ["Junta elástica automática y unión embridada", "Termofusión y electrofusión exclusivamente", "Encolado exclusivamente, sin ninguna otra alternativa", "Soldadura eléctrica con arco manual exclusivamente"], correcta: 0 },
  { enunciado: "¿Qué tipos de unión son habituales en tuberías de polietileno?", explicacion: "Electrofusión y termofusión a tope.", dificultad: "media", opciones: ["Electrofusión y termofusión a tope", "Junta embridada exclusivamente", "Encolado con adhesivo específico exclusivamente", "Remachado exclusivamente, sin ninguna otra alternativa"], correcta: 0 },
  { enunciado: "¿Qué tipos de unión son habituales en tuberías de PVC?", explicacion: "Encolado y junta elástica.", dificultad: "media", opciones: ["Encolado y junta elástica", "Electrofusión exclusivamente", "Soldadura oxiacetilénica exclusivamente", "Remachado exclusivamente, sin ninguna otra alternativa"], correcta: 0 },
  { enunciado: "¿En qué consiste la prueba de presión de una conducción antes de su puesta en servicio?", explicacion: "Someterla a una presión superior a la de servicio, comprobando ausencia de fugas.", dificultad: "facil", opciones: ["Someterla a una presión superior a la de servicio, comprobando fugas", "Medir exclusivamente el peso total de la tubería instalada", "Medir exclusivamente el color exterior de la tubería instalada", "Comprobar exclusivamente la fecha de fabricación de la tubería"], correcta: 0 },
  { enunciado: "¿Qué debe comprobarse, además de la prueba de presión, antes de poner en servicio una conducción nueva de agua potable?", explicacion: "La desinfección y la calidad del agua, conforme al RD 140/2003.", dificultad: "dificil", opciones: ["La desinfección y la calidad del agua, conforme al RD 140/2003", "Únicamente el precio final de los materiales empleados en la obra", "Únicamente la fecha de finalización de las obras de urbanización", "Ninguna comprobación adicional distinta de la prueba de presión"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 12 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 12, orden: 12, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-192 creado y vinculado como Tema 12 de Oficial Guardallaves.");
