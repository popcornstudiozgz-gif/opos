/**
 * Crea tema-164: "Soldadura eléctrica: arco manual, MAG/MIG/TIG" — Tema 16
 * (numero=16, bloque-2) de Oficial Herrero (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 14 oficial del Anexo I (bases2110.pdf, línea 1273):
 *   "Soldadura de metales. Procesos eléctricos. Soldadura manual con arco
 *   eléctrico. Soldadura con gas y arco protegido (procesos MAG/MIG/TIG).
 *   Equipos y electrodos, fuentes de alimentación, tipos de corriente,
 *   accesorios, gas protector, metales de aportación. Posiciones de
 *   soldadura."
 *
 * Conocimiento técnico consolidado de soldadura eléctrica, sin una ley
 * española específica que lo regule como técnica de taller — mismo
 * criterio que temas anteriores de esta oposición. El riesgo eléctrico
 * inherente a estos procesos se rige con carácter general por el Real
 * Decreto 614/2001, ya verificado y citado en el tema de seguridad
 * eléctrica de Oficial Electricista de esta misma convocatoria (ver
 * scripts/seed-tema-141-*.mjs), citado aquí como referencia
 * complementaria de seguridad. Búsqueda previa realizada conforme al
 * estándar de sourcing del proyecto.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-164-soldadura-electrica-mag-mig-tig.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-164";
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
  titulo: "Soldadura eléctrica: arco manual, MAG/MIG/TIG",
  descripcion: "Procesos eléctricos de soldadura. Soldadura manual con arco eléctrico. Soldadura con gas y arco protegido (MAG/MIG/TIG). Equipos, electrodos, fuentes de alimentación, tipos de corriente, gas protector y posiciones de soldadura.",
  contenido: "Desarrolla los procesos de soldadura eléctrica del oficio de herrero: la soldadura manual con arco eléctrico (electrodo revestido), los procesos de soldadura con gas y arco protegido MAG, MIG y TIG, los equipos y electrodos empleados, las fuentes de alimentación y tipos de corriente, los accesorios y gases de protección, los metales de aportación, y las distintas posiciones de soldadura.",
  enlaces_boe: [
    { titulo: "Real Decreto 614/2001, disposiciones mínimas de protección frente al riesgo eléctrico", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2001-11881" },
  ],
  indice_estudio: [
    { url: "", titulo: "Soldadura manual con arco eléctrico y electrodos", seccion: "soldadura-manual-arco-electrico-electrodos", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Procesos MAG, MIG y TIG. Gas protector", seccion: "procesos-mag-mig-tig-gas-protector", articulos: "Conceptos fundamentales" },
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2001-11881", titulo: "Fuentes de alimentación, tipos de corriente y posiciones de soldadura", seccion: "fuentes-alimentacion-tipos-corriente-posiciones-soldadura", articulos: "RD 614/2001" },
  ],
}]);

const S1 = "soldadura-manual-arco-electrico-electrodos";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es la soldadura manual con arco eléctrico (SMAW)?", reverso: "Un proceso de soldadura que emplea el calor generado por un arco eléctrico establecido entre un electrodo revestido y la pieza a soldar, fundiendo simultáneamente el metal base y el propio electrodo, que actúa también como material de aportación" },
  { anverso: "¿Qué es un electrodo revestido, empleado en la soldadura manual con arco eléctrico?", reverso: "Una varilla metálica (el alma, que aporta el material de soldadura) recubierta de un revestimiento químico que, al fundirse, genera un gas protector, forma una escoria protectora sobre el cordón, y estabiliza el arco eléctrico" },
  { anverso: "¿Qué funciones cumple el revestimiento de un electrodo durante la soldadura?", reverso: "Protege el baño de fusión de la contaminación atmosférica (mediante el gas generado y la escoria formada), estabiliza el arco eléctrico, y en algunos tipos aporta elementos de aleación adicionales al cordón de soldadura" },
  { anverso: "¿Qué es la escoria que aparece sobre un cordón de soldadura con electrodo revestido, y qué debe hacerse con ella?", reverso: "Una capa sólida formada por el revestimiento fundido del electrodo, que protegió el baño de fusión durante la soldadura; debe eliminarse mediante picado y cepillado antes de aplicar un nuevo cordón sobre esa zona o dar la soldadura por finalizada" },
  { anverso: "¿Qué debe tener en cuenta el herrero al elegir el tipo de electrodo para una soldadura concreta?", reverso: "La composición del metal base a soldar, el tipo de corriente disponible en el equipo, la posición de soldadura a realizar, y el acabado y las propiedades mecánicas requeridas en el cordón final" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es la soldadura manual con arco eléctrico?", explicacion: "Emplea el calor de un arco eléctrico entre un electrodo revestido y la pieza para fundir el metal.", dificultad: "facil", opciones: ["Emplea el calor de un arco eléctrico entre electrodo y pieza", "Emplea el calor de la combustión de oxígeno y acetileno", "Emplea presión mecánica sin ningún tipo de calor generado", "Emplea un adhesivo químico sin ningún componente eléctrico"], correcta: 0 },
  { enunciado: "¿Qué es un electrodo revestido?", explicacion: "Una varilla metálica recubierta de un revestimiento químico protector.", dificultad: "media", opciones: ["Una varilla metálica recubierta de un revestimiento químico", "Un instrumento exclusivo de medición de temperatura del arco", "Un dispositivo exclusivo de regulación de la corriente eléctrica", "Una herramienta exclusiva para el corte de chapa metálica"], correcta: 0 },
  { enunciado: "¿Qué funciones cumple el revestimiento de un electrodo durante la soldadura?", explicacion: "Protege el baño de fusión, estabiliza el arco y puede aportar elementos de aleación.", dificultad: "media", opciones: ["Protege el baño de fusión y estabiliza el arco eléctrico", "Aumenta exclusivamente la velocidad de avance de la soldadura", "Reduce a cero la temperatura generada durante el proceso", "Sustituye por completo a la necesidad de corriente eléctrica"], correcta: 0 },
  { enunciado: "¿Qué es la escoria en una soldadura con electrodo revestido?", explicacion: "Una capa sólida formada por el revestimiento fundido, que debe eliminarse tras soldar.", dificultad: "media", opciones: ["Una capa sólida del revestimiento fundido, que debe eliminarse", "El propio material de aportación fundido dentro del cordón", "El gas protector generado durante la soldadura, sin ningún residuo sólido", "Un defecto exclusivo de las soldaduras realizadas con proceso TIG"], correcta: 0 },
  { enunciado: "¿Qué debe tener en cuenta el herrero al elegir el tipo de electrodo para una soldadura concreta?", explicacion: "El metal base, el tipo de corriente, la posición de soldadura y las propiedades requeridas.", dificultad: "dificil", opciones: ["El metal base, la corriente, la posición y las propiedades requeridas", "Únicamente el color del revestimiento del electrodo disponible", "Únicamente el precio del electrodo disponible en el almacén", "Únicamente la longitud total del electrodo disponible"], correcta: 0 },
]);

const S2 = "procesos-mag-mig-tig-gas-protector";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué significan las siglas MIG en soldadura?", reverso: "Metal Inert Gas: un proceso de soldadura con arco eléctrico continuo (hilo consumible) protegido por un gas inerte (como el argón), empleado habitualmente en materiales no férricos (aluminio, entre otros)" },
  { anverso: "¿Qué significan las siglas MAG en soldadura?", reverso: "Metal Active Gas: un proceso similar al MIG, pero empleando un gas activo (como el CO₂, o mezclas de argón con CO₂ u oxígeno), habitual en la soldadura de aceros al carbono" },
  { anverso: "¿Qué significan las siglas TIG en soldadura?", reverso: "Tungsten Inert Gas: un proceso de soldadura con arco eléctrico establecido mediante un electrodo de tungsteno no consumible, protegido por un gas inerte, que permite un control muy preciso del cordón, con o sin material de aportación añadido manualmente" },
  { anverso: "¿Qué ventaja general presentan los procesos MIG/MAG frente a la soldadura manual con electrodo revestido?", reverso: "Una mayor velocidad de soldadura (al emplear un hilo continuo, sin necesidad de sustituir electrodos), y habitualmente un cordón más limpio, sin la escoria propia del electrodo revestido" },
  { anverso: "¿Para qué tipo de trabajos resulta especialmente adecuado el proceso TIG, pese a ser generalmente más lento que el MIG/MAG?", reverso: "Para soldaduras que requieren un acabado de gran calidad y precisión, materiales de espesor reducido, aceros inoxidables, aluminio y otras aplicaciones donde el control fino del aporte de calor resulta especialmente relevante" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué significan las siglas MIG en soldadura?", explicacion: "Metal Inert Gas.", dificultad: "media", opciones: ["Metal Inert Gas", "Metal Active Gas", "Tungsten Inert Gas", "Manual Included Gas"], correcta: 0 },
  { enunciado: "¿Qué significan las siglas MAG en soldadura?", explicacion: "Metal Active Gas.", dificultad: "media", opciones: ["Metal Active Gas", "Metal Inert Gas", "Tungsten Active Gas", "Manual Active Gauge"], correcta: 0 },
  { enunciado: "¿Qué significan las siglas TIG en soldadura?", explicacion: "Tungsten Inert Gas.", dificultad: "media", opciones: ["Tungsten Inert Gas", "Titanium Inert Gauge", "Total Included Gas", "Tungsten Active Gas"], correcta: 0 },
  { enunciado: "¿Qué ventaja presentan los procesos MIG/MAG frente a la soldadura manual con electrodo revestido?", explicacion: "Mayor velocidad al usar hilo continuo, y un cordón más limpio sin escoria.", dificultad: "media", opciones: ["Mayor velocidad y un cordón más limpio sin escoria", "Nunca requieren ningún tipo de gas de protección", "Solo pueden emplearse en materiales no metálicos", "Eliminan por completo la necesidad de corriente eléctrica"], correcta: 0 },
  { enunciado: "¿Para qué tipo de trabajos resulta especialmente adecuado el proceso TIG?", explicacion: "Soldaduras de gran calidad y precisión, materiales finos, inoxidable o aluminio.", dificultad: "dificil", opciones: ["Soldaduras de gran calidad y precisión en materiales finos", "Exclusivamente para soldar grandes estructuras de gran espesor", "Exclusivamente para el corte de chapa de gran espesor", "Exclusivamente para soldaduras que no requieren ningún control"], correcta: 0 },
]);

const S3 = "fuentes-alimentacion-tipos-corriente-posiciones-soldadura";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es la fuente de alimentación (o equipo) de soldadura eléctrica?", reverso: "El equipo que transforma la corriente de la red eléctrica en las características (tensión, intensidad, tipo de corriente) adecuadas para establecer y mantener el arco eléctrico de soldadura de forma estable" },
  { anverso: "¿Qué diferencia existe entre soldar con corriente continua (CC) y con corriente alterna (CA)?", reverso: "La corriente continua ofrece un arco más estable y es la más habitual en los procesos actuales (electrodo revestido, MIG/MAG, TIG); la corriente alterna se emplea en aplicaciones más específicas, siendo menos habitual en los equipos modernos de uso general" },
  { anverso: "¿Qué es la polaridad en soldadura con corriente continua, y qué opciones existen?", reverso: "El sentido de conexión del electrodo y la pieza al circuito de corriente continua: polaridad directa (electrodo al polo negativo) o polaridad inversa (electrodo al polo positivo), cada una con efectos distintos sobre la penetración y el calentamiento del electrodo, según el proceso empleado" },
  { anverso: "¿Qué es la posición de soldadura horizontal (o plana)?", reverso: "La posición en la que el cordón de soldadura se ejecuta sobre una superficie horizontal, con el operario trabajando desde arriba; es la posición más favorable, al aprovechar la gravedad para mantener el material fundido en su lugar" },
  { anverso: "¿Qué es la posición de soldadura vertical y qué dificultad añade respecto a la posición horizontal?", reverso: "La posición en la que el cordón se ejecuta sobre un plano vertical; añade la dificultad de que el material fundido tiende a caer por gravedad, exigiendo una técnica y un control de la velocidad de avance más cuidadosos" },
  { anverso: "¿Qué es la posición de soldadura sobre cabeza (o techo), y por qué es la más exigente?", reverso: "La posición en la que el cordón se ejecuta por encima de la cabeza del operario, con la pieza situada en un plano horizontal superior; es la más exigente porque la gravedad actúa directamente en contra de mantener el material fundido en el punto de soldadura" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es la fuente de alimentación de soldadura eléctrica?", explicacion: "El equipo que transforma la corriente de red en las características adecuadas para el arco de soldadura.", dificultad: "facil", opciones: ["El equipo que transforma la corriente de red para el arco de soldadura", "El material de aportación empleado durante la soldadura", "El gas protector empleado en los procesos MIG/MAG/TIG", "El instrumento de medición de la temperatura del cordón"], correcta: 0 },
  { enunciado: "¿Qué tipo de corriente ofrece habitualmente un arco más estable en los procesos actuales de soldadura?", explicacion: "La corriente continua (CC).", dificultad: "media", opciones: ["La corriente continua (CC)", "La corriente alterna (CA), en todos los procesos actuales", "Ambos tipos de corriente ofrecen exactamente la misma estabilidad", "Ningún tipo de corriente influye en la estabilidad del arco"], correcta: 0 },
  { enunciado: "¿Qué es la polaridad en soldadura con corriente continua?", explicacion: "El sentido de conexión del electrodo y la pieza, directa o inversa.", dificultad: "dificil", opciones: ["El sentido de conexión del electrodo y la pieza al circuito", "El tipo de gas protector empleado durante la soldadura", "La velocidad de avance del cordón durante la soldadura", "El tipo de revestimiento químico del electrodo empleado"], correcta: 0 },
  { enunciado: "¿Por qué la posición horizontal (plana) es la más favorable para soldar?", explicacion: "Aprovecha la gravedad para mantener el material fundido en su lugar.", dificultad: "media", opciones: ["Aprovecha la gravedad para mantener el material fundido", "Porque no requiere ningún tipo de material de aportación", "Porque elimina por completo el riesgo de deformación térmica", "Porque siempre requiere menor intensidad de corriente eléctrica"], correcta: 0 },
  { enunciado: "¿Por qué la posición sobre cabeza (techo) es la más exigente de todas las posiciones de soldadura?", explicacion: "La gravedad actúa en contra de mantener el material fundido en el punto de soldadura.", dificultad: "dificil", opciones: ["La gravedad actúa en contra del material fundido", "Porque siempre requiere el uso exclusivo del proceso TIG", "Porque nunca puede emplearse corriente continua en esta posición", "Porque es la única posición que no requiere ningún EPI"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 16 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 16, orden: 16, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-164 creado y vinculado como Tema 16 de Oficial Herrero.");
