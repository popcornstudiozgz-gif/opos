/**
 * Crea tema-252: "Herramientas en trabajos de posimpresión, manipulación
 * y corte de productos gráficos y soportes. Equipos de impresión y
 * corte. Laminadoras" — Tema 8 (numero=8, bloque-2) de Oficial Pintor,
 * Especialidad Gráfica (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 6 oficial del Anexo I (bases2110.pdf, línea
 * 1500): "Herramientas en trabajos de posimpresión, manipulación y
 * corte de productos gráficos y soportes. Equipos de impresión y corte.
 * Laminadoras. Normativa."
 *
 * Normativa: RD 1215/1997 (BOE-A-1997-17824, ya citado en el proyecto),
 * equipos de trabajo, de aplicación a los equipos de impresión, corte y
 * laminado de este taller. El resto (herramientas y técnica) es
 * conocimiento técnico consolidado del oficio.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-252-herramientas-posimpresion.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-252";
const OPOSICION = "oficial-pintor-grafica-ayto-zaragoza";
const BLOQUE_2_ID = "1e5d5916-cf4a-4920-9175-579f18034ad6";

const RD_1215_1997 = "https://www.boe.es/buscar/act.php?id=BOE-A-1997-17824";

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
  titulo: "Herramientas de posimpresión, equipos de impresión y corte, laminadoras",
  descripcion: "Herramientas manuales para la manipulación y corte de productos gráficos. Equipos de impresión digital y plotter de corte. Laminadoras y su función de protección del material impreso.",
  contenido: "Desarrolla las herramientas y equipos empleados en los trabajos de posimpresión (las operaciones posteriores a la impresión, como el corte, el laminado o el acabado) del taller de rotulación: las herramientas manuales de manipulación y corte de productos gráficos y soportes; los equipos de impresión digital (impresora de gran formato) y de corte (plotter de corte), su funcionamiento básico; y las laminadoras, empleadas para proteger el material impreso mediante una lámina transparente adicional, con referencia al RD 1215/1997 sobre las condiciones de seguridad exigibles a estos equipos de trabajo.",
  enlaces_boe: [
    { url: RD_1215_1997, titulo: "RD 1215/1997 — equipos de trabajo" },
  ],
  indice_estudio: [
    { url: "", titulo: "Herramientas manuales de manipulación y corte de productos gráficos", seccion: "herramientas-manuales-manipulacion-corte", articulos: "Conocimiento técnico del oficio" },
    { url: RD_1215_1997, titulo: "Equipos de impresión digital y de corte (plotter)", seccion: "equipos-impresion-digital-corte-plotter", articulos: "RD 1215/1997" },
    { url: RD_1215_1997, titulo: "Laminadoras: función y mantenimiento básico", seccion: "laminadoras-funcion-mantenimiento-basico", articulos: "RD 1215/1997" },
  ],
}]);

const S1 = "herramientas-manuales-manipulacion-corte";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un cúter (o cutter) de precisión, herramienta básica de posimpresión?", reverso: "Una herramienta de corte manual con una hoja fina y muy afilada, habitualmente recambiable, empleada para recortar con precisión vinilos, laminados y otros materiales gráficos, tanto sobre mesa de corte como directamente sobre la superficie de aplicación" },
  { anverso: "¿Qué es una regla de corte metálica, empleada junto con el cúter?", reverso: "Una regla rígida, habitualmente de acero o de aluminio con canto protector, que guía la hoja del cúter en línea recta durante el corte de vinilos, láminas o cartulinas, garantizando un corte limpio y preciso" },
  { anverso: "¿Qué es un tapete o base de corte autocicatrizante, herramienta habitual en la mesa de trabajo de posimpresión?", reverso: "Una superficie de corte especial, fabricada con materiales que se autorregeneran tras cada corte, que protege tanto la mesa de trabajo como el filo de la herramienta de corte, prolongando su vida útil" },
  { anverso: "¿Qué es una espátula de aplicación (o rasqueta de vinilo), empleada en la manipulación de material gráfico?", reverso: "Una herramienta de borde plano, habitualmente de plástico o fieltro, empleada para presionar y alisar un vinilo durante su colocación, eliminando burbujas de aire y garantizando una adherencia uniforme sobre el soporte" },
  { anverso: "¿Qué precaución debe adoptarse al manipular un cúter de precisión, dado el riesgo de corte que presenta esta herramienta?", reverso: "Mantener siempre la hoja alejada de las manos y dedos durante el corte, guardarla con la hoja protegida o retraída cuando no se utilice, y sustituir la hoja en cuanto pierda el filo, dado que una hoja desafilada exige mayor presión y aumenta el riesgo de resbalón" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es un cúter de precisión?", explicacion: "Una herramienta de corte manual con hoja fina y afilada, empleada para recortar vinilos y laminados.", dificultad: "facil", opciones: ["Una herramienta de corte manual con hoja fina y afilada", "Un equipo de impresión de gran formato", "Una máquina de corte automatizada mediante plotter", "Un tipo de laminadora de rodillos calientes"], correcta: 0 },
  { enunciado: "¿Qué es una regla de corte metálica?", explicacion: "Una regla rígida que guía la hoja del cúter en línea recta durante el corte.", dificultad: "media", opciones: ["Una regla rígida que guía el cúter en línea recta", "Un equipo de impresión de gran formato", "Una herramienta exclusiva para el laminado de vinilos", "Un tipo de espátula de aplicación de vinilos"], correcta: 0 },
  { enunciado: "¿Qué es un tapete o base de corte autocicatrizante?", explicacion: "Una superficie de corte que se autorregenera, protegiendo la mesa y el filo de la herramienta.", dificultad: "media", opciones: ["Una superficie de corte que se autorregenera tras cada corte", "Un equipo de impresión de gran formato", "Una herramienta exclusiva para pulverizar pintura", "Un tipo de laminadora de rodillos calientes"], correcta: 0 },
  { enunciado: "¿Qué función cumple una espátula de aplicación o rasqueta de vinilo?", explicacion: "Presiona y alisa el vinilo eliminando burbujas de aire durante su colocación.", dificultad: "media", opciones: ["Presiona y alisa el vinilo eliminando burbujas de aire", "Corta el vinilo antes de su colocación en la superficie", "Imprime el diseño gráfico sobre el vinilo", "Lamina el vinilo tras su colocación en la superficie"], correcta: 0 },
  { enunciado: "¿Qué precaución debe adoptarse al manipular un cúter de precisión?", explicacion: "Mantener la hoja alejada de manos y dedos, y sustituirla en cuanto pierda el filo.", dificultad: "dificil", opciones: ["Mantener la hoja alejada y sustituirla al perder el filo", "Ninguna precaución específica resulta necesaria en la práctica", "Utilizar siempre la hoja hasta que se rompa por completo", "Guardar siempre el cúter con la hoja completamente expuesta"], correcta: 0 },
]);

const S2 = "equipos-impresion-digital-corte-plotter";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un plotter de corte, equipo fundamental en un taller de rotulación?", reverso: "Una máquina que, mediante una pequeña cuchilla controlada por ordenador, recorta con precisión el contorno de letras, formas o logotipos sobre una lámina de vinilo, siguiendo el trazado de un diseño vectorial previamente elaborado" },
  { anverso: "¿Qué es una impresora de gran formato, empleada para la impresión de vinilos y carteles en este taller?", reverso: "Un equipo de impresión digital capaz de imprimir sobre materiales de gran anchura (vinilo, lona, papel), habitualmente mediante tecnología de inyección de tinta, empleado para reproducir diseños gráficos a gran escala antes de su corte o aplicación" },
  { anverso: "¿Qué es la presión de corte del plotter, parámetro que debe ajustarse antes de cada trabajo?", reverso: "El nivel de fuerza que ejerce la cuchilla del plotter sobre el material, que debe ajustarse según el grosor y la dureza del vinilo empleado, para lograr un corte limpio del vinilo sin llegar a cortar por completo el papel siliconado de soporte" },
  { anverso: "¿Qué es una prueba de corte, recomendable antes de lanzar un trabajo completo en el plotter?", reverso: "Un pequeño corte de prueba realizado sobre el mismo material antes del trabajo definitivo, que permite comprobar que la presión y la profundidad de corte ajustadas son correctas, evitando desperdiciar material en un trabajo completo mal ajustado" },
  { anverso: "¿Qué mantenimiento básico exige, con carácter general, un plotter de corte para garantizar la calidad de sus cortes a lo largo del tiempo?", reverso: "La limpieza periódica de los rodillos de arrastre del material, la sustitución de la cuchilla cuando pierda el filo, y la calibración del equipo conforme a las indicaciones del fabricante, evitando cortes irregulares o desplazamientos del material durante el trabajo" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es un plotter de corte?", explicacion: "Una máquina que recorta con precisión un vinilo mediante una cuchilla controlada por ordenador.", dificultad: "facil", opciones: ["Una máquina que recorta un vinilo con cuchilla controlada por ordenador", "Un equipo exclusivo de impresión de gran formato", "Una herramienta manual de corte de precisión", "Un tipo de laminadora de rodillos calientes"], correcta: 0 },
  { enunciado: "¿Qué es una impresora de gran formato en este taller?", explicacion: "Un equipo de impresión digital capaz de imprimir sobre materiales de gran anchura.", dificultad: "media", opciones: ["Un equipo de impresión digital de gran anchura", "Una máquina exclusiva de corte mediante cuchilla", "Una herramienta manual de aplicación de vinilos", "Un tipo de laminadora de rodillos calientes"], correcta: 0 },
  { enunciado: "¿Qué es la presión de corte del plotter?", explicacion: "El nivel de fuerza de la cuchilla, ajustado según el grosor y dureza del vinilo.", dificultad: "media", opciones: ["El nivel de fuerza de la cuchilla, ajustado al material", "La velocidad máxima de desplazamiento del plotter", "El color del vinilo empleado en el corte", "El tamaño máximo del rollo de vinilo admitido"], correcta: 0 },
  { enunciado: "¿Qué es una prueba de corte antes de un trabajo completo en el plotter?", explicacion: "Un corte de prueba que verifica que la presión y profundidad de corte son correctas.", dificultad: "media", opciones: ["Un corte de prueba que verifica presión y profundidad correctas", "Una impresión de prueba realizada en la impresora de gran formato", "Una limpieza previa de los rodillos del plotter", "Una calibración exclusiva del color del vinilo"], correcta: 0 },
  { enunciado: "¿Qué mantenimiento básico exige un plotter de corte?", explicacion: "Limpieza de rodillos, sustitución de la cuchilla y calibración periódica.", dificultad: "dificil", opciones: ["Limpieza de rodillos, sustitución de cuchilla y calibración", "Ningún mantenimiento específico distinto de mantenerlo encendido", "Únicamente cambiar el color del vinilo empleado", "Únicamente actualizar el software del ordenador conectado"], correcta: 0 },
]);

const S3 = "laminadoras-funcion-mantenimiento-basico";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es una laminadora, en el contexto de un taller de rotulación?", reverso: "Un equipo que aplica una lámina protectora transparente (laminado) sobre un material ya impreso, habitualmente mediante rodillos que ejercen presión y, en algunos modelos, calor, protegiendo la impresión frente a la abrasión, los rayos UV y la humedad" },
  { anverso: "¿Qué es un laminado en frío, frente a uno en caliente?", reverso: "Un laminado que se aplica sin necesidad de calor, mediante la presión de los rodillos sobre una lámina autoadhesiva, adecuado para materiales sensibles al calor; el laminado en caliente, en cambio, emplea calor para activar el adhesivo de la lámina y mejorar su adherencia" },
  { anverso: "¿Qué ventaja aporta el laminado a un vinilo impreso destinado a exterior?", reverso: "Prolonga significativamente la durabilidad de la impresión frente a la exposición solar, la lluvia y el roce, además de aportar un acabado adicional (brillante, mate o satinado) que puede mejorar el aspecto final del trabajo" },
  { anverso: "¿Qué precaución debe adoptarse al laminar un vinilo impreso recién salido de la impresora, sin dejarlo secar el tiempo suficiente?", reverso: "Debe respetarse el tiempo de secado indicado por el fabricante de la tinta antes de laminar, dado que laminar sobre una tinta aún húmeda puede provocar defectos de adherencia entre el laminado y la impresión, o incluso arrastrar la tinta y estropear el resultado" },
  { anverso: "¿Qué mantenimiento básico exige una laminadora para garantizar un resultado uniforme en cada trabajo?", reverso: "La limpieza periódica de los rodillos para eliminar restos de adhesivo o de material acumulado, y la comprobación de que la presión y, en su caso, la temperatura de los rodillos están correctamente ajustadas según el tipo de laminado empleado" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es una laminadora?", explicacion: "Un equipo que aplica una lámina protectora transparente sobre un material ya impreso.", dificultad: "facil", opciones: ["Un equipo que aplica una lámina protectora sobre lo impreso", "Una máquina exclusiva de corte mediante cuchilla", "Un equipo exclusivo de impresión de gran formato", "Una herramienta manual de aplicación de vinilos"], correcta: 0 },
  { enunciado: "¿Qué diferencia un laminado en frío de uno en caliente?", explicacion: "El de frío no requiere calor; el de caliente emplea calor para activar el adhesivo de la lámina.", dificultad: "media", opciones: ["El de frío no requiere calor; el de caliente sí lo emplea", "Ambos tipos de laminado son exactamente equivalentes", "El de caliente nunca resulta adecuado para exteriores", "El de frío siempre ofrece menor durabilidad que el de caliente"], correcta: 0 },
  { enunciado: "¿Qué ventaja aporta el laminado a un vinilo impreso de exterior?", explicacion: "Prolonga la durabilidad frente al sol, la lluvia y el roce.", dificultad: "media", opciones: ["Prolonga la durabilidad frente al sol, lluvia y roce", "Reduce siempre la durabilidad del vinilo impreso", "No aporta ninguna ventaja real en exteriores", "Solo resulta relevante en trabajos de interior"], correcta: 0 },
  { enunciado: "¿Qué precaución debe adoptarse antes de laminar un vinilo recién impreso?", explicacion: "Respetar el tiempo de secado de la tinta indicado por el fabricante.", dificultad: "dificil", opciones: ["Respetar el tiempo de secado de la tinta antes de laminar", "Laminar siempre de inmediato tras la impresión", "El tiempo de secado nunca resulta relevante para el laminado", "Solo resulta relevante en laminados en caliente"], correcta: 0 },
  { enunciado: "¿Qué mantenimiento básico exige una laminadora?", explicacion: "Limpieza periódica de rodillos y comprobación de presión y temperatura ajustadas.", dificultad: "media", opciones: ["Limpieza de rodillos y comprobación de presión y temperatura", "Ningún mantenimiento específico distinto de mantenerla encendida", "Únicamente cambiar el color del laminado empleado", "Únicamente actualizar el software del ordenador conectado"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 8 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 8, orden: 8, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-252 creado y vinculado como Tema 8 de Oficial Pintor Gráfica.");
