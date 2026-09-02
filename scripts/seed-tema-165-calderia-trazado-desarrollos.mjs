/**
 * Crea tema-165: "Calderería: trazado y desarrollos de cuerpos y chapa" —
 * Tema 17 (numero=17, bloque-2) de Oficial Herrero (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 15 oficial del Anexo I (bases2110.pdf, línea 1276):
 *   "Calderería. Trazado de cuerpos y chapa. Cuerpos cilíndricos y
 *   cónicos (virolas). Tubos curvos. Tubería embridadas. Desarrollos por
 *   triangulación."
 *
 * Conocimiento técnico consolidado de calderería, sin una ley española
 * específica que lo regule como técnica de taller — mismo criterio que
 * temas anteriores de esta oposición. Búsqueda previa realizada
 * conforme al estándar de sourcing del proyecto.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-165-calderia-trazado-desarrollos.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-165";
const OPOSICION = "oficial-herrero-ayto-zaragoza";
const BLOQUE_2_ID = "b0312afa-8a49-41a8-a672-99793edcc74e";

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
  titulo: "Calderería: trazado y desarrollos de cuerpos y chapa",
  descripcion: "Trazado de cuerpos y chapa. Cuerpos cilíndricos y cónicos (virolas). Tubos curvos. Tubería embridada. Desarrollos por triangulación.",
  contenido: "Desarrolla las técnicas básicas de calderería: el trazado de cuerpos y chapa como paso previo a su conformado, los cuerpos cilíndricos y cónicos (virolas), los tubos curvos, la tubería embridada, y el desarrollo geométrico por triangulación empleado para obtener la forma plana desplegada de piezas de geometría compleja.",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "Trazado de cuerpos y chapa", seccion: "trazado-cuerpos-chapa-calderia", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Cuerpos cilíndricos y cónicos (virolas). Tubos curvos", seccion: "cuerpos-cilindricos-conicos-virolas-tubos-curvos", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Tubería embridada. Desarrollos por triangulación", seccion: "tuberia-embridada-desarrollos-triangulacion", articulos: "Conceptos fundamentales" },
  ],
}]);

const S1 = "trazado-cuerpos-chapa-calderia";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es la calderería, como especialidad del trabajo del metal?", reverso: "La rama del oficio dedicada al conformado de chapa y perfiles metálicos mediante corte, plegado, curvado y unión, para fabricar cuerpos huecos (depósitos, tubos, conductos) y estructuras de forma compleja" },
  { anverso: "¿Qué es el desarrollo de una pieza de calderería?", reverso: "La representación, sobre una superficie plana, de la forma que debe tener la chapa antes de conformarla, de manera que al curvarla o plegarla adopte exactamente la forma tridimensional final requerida" },
  { anverso: "¿Por qué es imprescindible obtener un desarrollo preciso antes de cortar la chapa en calderería?", reverso: "Porque un desarrollo incorrecto provoca que la pieza conformada no adopte la forma o las dimensiones deseadas, generando un desperdicio de material y de tiempo de trabajo" },
  { anverso: "¿Qué es una plantilla, en el contexto del trazado de calderería?", reverso: "Una guía física (de cartón, chapa fina u otro material) que reproduce el desarrollo calculado de una pieza, empleada para trasladar de forma precisa y repetible ese desarrollo sobre la chapa definitiva a cortar" },
  { anverso: "¿Qué debe tener en cuenta el calderero al trazar el desarrollo de una pieza que se va a plegar, respecto al espesor de la chapa?", reverso: "Que el plegado de una chapa de cierto espesor provoca un ligero estiramiento del material en la zona del pliegue, por lo que el desarrollo debe compensar esa deformación mediante un factor de corrección (bonificación de plegado) para obtener las dimensiones finales exactas" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es la calderería?", explicacion: "La rama del oficio dedicada al conformado de chapa y perfiles para fabricar cuerpos huecos y estructuras complejas.", dificultad: "facil", opciones: ["El conformado de chapa y perfiles para cuerpos huecos y estructuras", "El tratamiento térmico exclusivo de piezas ya conformadas", "La medición exclusiva de la dureza de los materiales", "El proceso exclusivo de galvanización de piezas terminadas"], correcta: 0 },
  { enunciado: "¿Qué es el desarrollo de una pieza de calderería?", explicacion: "La representación plana de la chapa antes de conformarla, para que adopte la forma final requerida.", dificultad: "media", opciones: ["La representación plana de la chapa antes de conformarla", "El tratamiento térmico aplicado tras el conformado de la pieza", "La medición de la dureza final de la pieza ya conformada", "El proceso de soldadura empleado para unir la pieza conformada"], correcta: 0 },
  { enunciado: "¿Por qué es imprescindible un desarrollo preciso antes de cortar la chapa?", explicacion: "Un desarrollo incorrecto provoca que la pieza no adopte la forma o dimensiones deseadas.", dificultad: "media", opciones: ["Un desarrollo incorrecto provoca una pieza con forma o medidas erróneas", "El desarrollo nunca influye en el resultado final de la pieza conformada", "El desarrollo solo es relevante para piezas de gran tamaño", "El desarrollo sustituye por completo a la necesidad de cualquier corte"], correcta: 0 },
  { enunciado: "¿Qué es una plantilla en el trazado de calderería?", explicacion: "Una guía física que reproduce el desarrollo calculado para trasladarlo a la chapa definitiva.", dificultad: "media", opciones: ["Una guía física que reproduce el desarrollo calculado", "Un instrumento exclusivo de medición de dureza superficial", "Un dispositivo exclusivo de sujeción eléctrica de piezas", "Una máquina exclusiva de corte de chapa de gran espesor"], correcta: 0 },
  { enunciado: "¿Qué debe compensar el desarrollo de una pieza que se va a plegar, respecto al espesor de la chapa?", explicacion: "El ligero estiramiento del material en la zona del pliegue (bonificación de plegado).", dificultad: "dificil", opciones: ["El ligero estiramiento del material en la zona del pliegue", "El peso final de la pieza tras el conformado completo", "La dureza superficial de la chapa antes del plegado", "El color final de la chapa tras el proceso de plegado"], correcta: 0 },
]);

const S2 = "cuerpos-cilindricos-conicos-virolas-tubos-curvos";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es una virola, en calderería?", reverso: "Cada uno de los anillos o segmentos de chapa curvada que, unidos entre sí, forman el cuerpo cilíndrico o cónico de un depósito, tubo de gran diámetro u otra pieza similar" },
  { anverso: "¿Cómo se obtiene el desarrollo plano de un cuerpo cilíndrico (por ejemplo, una virola cilíndrica)?", reverso: "Mediante un rectángulo cuya longitud coincide con el perímetro (la circunferencia) de la base del cilindro, y cuya anchura coincide con la altura o generatriz del cuerpo cilíndrico" },
  { anverso: "¿Qué es un cuerpo cónico, en calderería?", reverso: "Una pieza de calderería con forma de cono, cuyo diámetro varía de forma progresiva y uniforme a lo largo de su altura, empleada habitualmente como pieza de transición entre dos diámetros distintos (reducción) o como tapa o fondo de un depósito" },
  { anverso: "¿Cómo se obtiene, de forma general, el desarrollo plano de un cuerpo cónico?", reverso: "Mediante un sector circular (un 'trozo de tarta') cuyo radio corresponde a la generatriz del cono, y cuyo arco corresponde al perímetro de la base del cono, calculado geométricamente a partir de sus dimensiones" },
  { anverso: "¿Qué es un tubo curvo, en calderería, y qué técnicas se emplean habitualmente para conformarlo?", reverso: "Un tramo de tubería con un cambio de dirección (un codo), conformado habitualmente mediante el curvado de un tubo recto con máquina curvadora, o mediante la unión soldada de varios segmentos de tubo cortados en ángulo (codo segmentado o 'a gajos')" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es una virola en calderería?", explicacion: "Cada anillo de chapa curvada que forma el cuerpo cilíndrico o cónico de una pieza.", dificultad: "facil", opciones: ["Cada anillo de chapa curvada que forma un cuerpo cilíndrico", "Un instrumento exclusivo de medición de espesores", "Un tipo exclusivo de electrodo de soldadura eléctrica", "Un tipo exclusivo de tratamiento térmico del acero"], correcta: 0 },
  { enunciado: "¿Cómo se obtiene el desarrollo plano de un cuerpo cilíndrico?", explicacion: "Mediante un rectángulo cuya longitud es el perímetro de la base y cuya anchura es la altura del cuerpo.", dificultad: "media", opciones: ["Un rectángulo con la longitud del perímetro y la anchura de la altura", "Un círculo completo, sin ninguna relación con un rectángulo", "Un sector circular, igual que en un cuerpo cónico", "Un triángulo equilátero, sin relación con las dimensiones reales"], correcta: 0 },
  { enunciado: "¿Qué es un cuerpo cónico en calderería?", explicacion: "Una pieza cuyo diámetro varía de forma progresiva a lo largo de su altura.", dificultad: "media", opciones: ["Una pieza cuyo diámetro varía progresivamente en altura", "Una pieza de diámetro constante en toda su longitud", "Un instrumento exclusivo de medición de ángulos", "Un tipo exclusivo de unión soldada entre dos chapas"], correcta: 0 },
  { enunciado: "¿Cómo se obtiene de forma general el desarrollo plano de un cuerpo cónico?", explicacion: "Mediante un sector circular calculado a partir de la generatriz y el perímetro de la base.", dificultad: "dificil", opciones: ["Un sector circular calculado a partir de la generatriz y la base", "Un rectángulo, igual que en un cuerpo cilíndrico", "Un cuadrado perfecto, sin relación con las dimensiones del cono", "Un desarrollo idéntico en todos los casos al de un cilindro"], correcta: 0 },
  { enunciado: "¿Qué técnica se emplea habitualmente para conformar un tubo curvo o codo?", explicacion: "El curvado con máquina curvadora, o la unión soldada de segmentos cortados en ángulo.", dificultad: "media", opciones: ["Curvado con máquina, o unión soldada de segmentos en ángulo", "Exclusivamente el temple del propio tubo recto original", "Exclusivamente la galvanización del tubo ya conformado", "Ningún proceso de conformado es posible para obtener un tubo curvo"], correcta: 0 },
]);

const S3 = "tuberia-embridada-desarrollos-triangulacion";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es la tubería embridada?", reverso: "Un sistema de unión de tramos de tubería mediante bridas (discos metálicos perforados) atornilladas entre sí en cada extremo, con una junta de estanqueidad intermedia, permitiendo el montaje y desmontaje del tramo sin necesidad de soldadura" },
  { anverso: "¿Qué ventaja aporta la tubería embridada frente a la unión soldada de los tramos de tubería?", reverso: "Permite el desmontaje posterior del tramo para su mantenimiento, inspección o sustitución, algo que una unión soldada no permite sin cortar el propio tubo" },
  { anverso: "¿Qué elementos componen una unión embridada típica?", reverso: "Dos bridas (una en cada extremo de tubo a unir), una junta de estanqueidad intermedia, y un conjunto de tornillos y tuercas que aprietan ambas bridas comprimiendo la junta" },
  { anverso: "¿Qué es el desarrollo por triangulación?", reverso: "Un método gráfico de desarrollo empleado para piezas de geometría compleja (no puramente cilíndricas ni cónicas), que divide la superficie de la pieza en una serie de pequeños triángulos de dimensiones conocidas o calculables, cuya suma reproduce el desarrollo plano completo de la pieza" },
  { anverso: "¿En qué tipo de piezas resulta especialmente útil el desarrollo por triangulación, frente a los métodos más simples de un cilindro o un cono?", reverso: "En piezas de transición entre secciones de forma distinta (por ejemplo, de sección cuadrada a sección circular), o en piezas de geometría irregular donde no es aplicable directamente el desarrollo simple de un cuerpo cilíndrico o cónico" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es la tubería embridada?", explicacion: "Un sistema de unión de tramos de tubería mediante bridas atornilladas con junta de estanqueidad.", dificultad: "facil", opciones: ["Unión de tramos de tubería mediante bridas atornilladas", "Unión de tramos de tubería exclusivamente mediante soldadura", "Un tipo exclusivo de tubo curvo conformado a máquina", "Un instrumento exclusivo de medición del caudal de un fluido"], correcta: 0 },
  { enunciado: "¿Qué ventaja aporta la tubería embridada frente a la unión soldada?", explicacion: "Permite el desmontaje posterior del tramo para mantenimiento o sustitución.", dificultad: "media", opciones: ["Permite el desmontaje posterior del tramo", "Siempre resulta más económica que cualquier unión soldada", "Elimina por completo la necesidad de cualquier junta de estanqueidad", "Solo puede emplearse en tuberías de diámetro muy reducido"], correcta: 0 },
  { enunciado: "¿Qué elementos componen una unión embridada típica?", explicacion: "Dos bridas, una junta de estanqueidad y un conjunto de tornillos y tuercas.", dificultad: "media", opciones: ["Dos bridas, una junta de estanqueidad y tornillos con tuercas", "Únicamente dos bridas soldadas directamente entre sí", "Únicamente una junta de estanqueidad sin ningún otro elemento", "Únicamente un conjunto de remaches sin ninguna brida"], correcta: 0 },
  { enunciado: "¿Qué es el desarrollo por triangulación?", explicacion: "Un método que divide la superficie de la pieza en pequeños triángulos para obtener su desarrollo plano.", dificultad: "dificil", opciones: ["Divide la superficie en pequeños triángulos calculables", "Es idéntico en todos los casos al desarrollo de un cilindro simple", "Solo es aplicable a piezas de sección circular constante", "Sustituye por completo a la necesidad de cualquier plantilla física"], correcta: 0 },
  { enunciado: "¿En qué tipo de piezas resulta especialmente útil el desarrollo por triangulación?", explicacion: "En piezas de transición entre secciones de forma distinta o de geometría irregular.", dificultad: "dificil", opciones: ["En piezas de transición entre secciones de forma distinta", "Exclusivamente en cuerpos puramente cilíndricos simples", "Exclusivamente en cuerpos puramente cónicos simples", "En ninguna pieza real de calderería, siendo un método solo teórico"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 17 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 17, orden: 17, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-165 creado y vinculado como Tema 17 de Oficial Herrero.");
