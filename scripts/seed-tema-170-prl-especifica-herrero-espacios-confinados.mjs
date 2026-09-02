/**
 * Crea tema-170: "Prevención de riesgos laborales específica de herrero.
 * Trabajos en espacios confinados" — Tema 22 (numero=22, bloque-2) de
 * Oficial Herrero (Ayto. Zaragoza). Último tema de la parte específica
 * de esta oposición.
 *
 * Corresponde al TEMA 20 oficial del Anexo I (bases2110.pdf, línea 1287):
 *   "Prevención de riesgos laborales. Riesgos laborales específicos en
 *   las funciones de herrero, medidas de protección individuales y
 *   colectivas a las funciones de la categoría. Trabajos en espacios
 *   confinados."
 *
 * Fuentes primarias verificadas en esta sesión y en sesiones anteriores
 * del proyecto (ver scripts/seed-tema-160-*.mjs, seed-tema-141-*.mjs de
 * Oficial Electricista, y seed-tema-60-*.mjs de Oficial Albañil):
 * - Ley 31/1995, de 8 de noviembre, de Prevención de Riesgos Laborales
 *   (marco general, ya verificada en múltiples temas de este proyecto).
 * - Real Decreto 773/1997, sobre utilización de equipos de protección
 *   individual — BOE-A-1997-12735.
 * - Real Decreto 1215/1997, sobre utilización de equipos de trabajo
 *   (maquinaria y herramientas del taller) — BOE-A-1997-17824.
 * - Real Decreto 614/2001, sobre riesgo eléctrico (aplicable a los
 *   procesos de soldadura eléctrica) — BOE-A-2001-11881.
 * Los trabajos en espacios confinados no cuentan con un reglamento
 * español específico y único que los regule como tales: se rigen por
 * los principios generales de la Ley 31/1995 y por guías técnicas del
 * INSST, criterio ya aplicado en el tema de PRL de Oficial Albañil
 * (tema-60) de este mismo proyecto.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-170-prl-especifica-herrero-espacios-confinados.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-170";
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
  titulo: "Prevención de riesgos laborales específica de herrero. Trabajos en espacios confinados",
  descripcion: "Riesgos laborales específicos en las funciones de herrero. Medidas de protección individuales y colectivas propias de la categoría. Trabajos en espacios confinados.",
  contenido: "Desarrolla la prevención de riesgos laborales específica del oficio de herrero: los riesgos laborales propios de sus funciones (mecánicos, térmicos, eléctricos, químicos y de ruido), las medidas de protección individuales y colectivas aplicables, y los trabajos en espacios confinados, con sus riesgos específicos y precauciones básicas.",
  enlaces_boe: [
    { titulo: "Ley 31/1995, de Prevención de Riesgos Laborales", url: "https://www.boe.es/buscar/act.php?id=BOE-A-1995-24292" },
    { titulo: "Real Decreto 773/1997, utilización de equipos de protección individual", url: "https://www.boe.es/buscar/act.php?id=BOE-A-1997-12735" },
    { titulo: "Real Decreto 1215/1997, utilización de equipos de trabajo", url: "https://www.boe.es/buscar/doc.php?id=BOE-A-1997-17824" },
    { titulo: "Real Decreto 614/2001, disposiciones mínimas de protección frente al riesgo eléctrico", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2001-11881" },
  ],
  indice_estudio: [
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-1995-24292", titulo: "Riesgos laborales específicos en las funciones de herrero", seccion: "riesgos-laborales-especificos-herrero", articulos: "Ley 31/1995" },
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-1997-12735", titulo: "Medidas de protección individuales y colectivas", seccion: "medidas-proteccion-individual-colectiva-herreria", articulos: "RD 773/1997, RD 1215/1997" },
    { url: "", titulo: "Trabajos en espacios confinados", seccion: "trabajos-espacios-confinados", articulos: "Ley 31/1995 (principios generales)" },
  ],
}]);

const S1 = "riesgos-laborales-especificos-herrero";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué son los riesgos mecánicos propios de las funciones de herrero?", reverso: "Los derivados del contacto con elementos móviles de maquinaria (tornos, sierras, taladros), cortes con herramientas o material, golpes por proyección de piezas o virutas, y atrapamientos en zonas de mecanizado" },
  { anverso: "¿Qué son los riesgos térmicos propios de las funciones de herrero?", reverso: "Los derivados del calor generado en operaciones de forja, soldadura y corte de metales: quemaduras por contacto con metal caliente, radiación de la llama o el arco eléctrico, y proyección de partículas incandescentes" },
  { anverso: "¿Qué son los riesgos eléctricos propios de las funciones de herrero?", reverso: "Los derivados del uso de equipos de soldadura eléctrica y de maquinaria eléctrica del taller: contactos eléctricos directos o indirectos, y quemaduras eléctricas asociadas al arco de soldadura" },
  { anverso: "¿Qué riesgos químicos pueden estar presentes en las funciones de herrero?", reverso: "La exposición a humos de soldadura (que pueden contener partículas metálicas y gases nocivos), a gases empleados en soldadura oxiacetilénica, y a disolventes o productos empleados en la limpieza y el tratamiento de superficies" },
  { anverso: "¿Qué riesgo de ruido está presente habitualmente en un taller de herrería?", reverso: "El generado por la maquinaria (esmeriladoras, sierras, tornos), el golpeo de forja y las operaciones de calderería, que puede provocar daño auditivo con exposiciones prolongadas sin protección adecuada" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué son los riesgos mecánicos propios de las funciones de herrero?", explicacion: "Contacto con elementos móviles, cortes, golpes por proyección y atrapamientos.", dificultad: "facil", opciones: ["Contacto con elementos móviles, cortes, golpes y atrapamientos", "Exclusivamente riesgos derivados de la exposición al ruido", "Exclusivamente riesgos derivados de la exposición química", "Exclusivamente riesgos derivados del uso de electricidad"], correcta: 0 },
  { enunciado: "¿Qué son los riesgos térmicos propios de las funciones de herrero?", explicacion: "Quemaduras por contacto con metal caliente, radiación y proyección de partículas incandescentes.", dificultad: "media", opciones: ["Quemaduras, radiación y proyección de partículas incandescentes", "Exclusivamente riesgos derivados del ruido de la maquinaria", "Exclusivamente riesgos derivados de golpes mecánicos", "Exclusivamente riesgos derivados de productos químicos"], correcta: 0 },
  { enunciado: "¿Qué riesgo eléctrico específico está asociado a la soldadura eléctrica?", explicacion: "Contactos eléctricos directos o indirectos, y quemaduras eléctricas del arco.", dificultad: "media", opciones: ["Contactos eléctricos y quemaduras asociadas al arco de soldadura", "Exclusivamente riesgo de proyección de virutas metálicas", "Exclusivamente riesgo de exposición a humos de soldadura", "Exclusivamente riesgo de ruido generado por el equipo de soldadura"], correcta: 0 },
  { enunciado: "¿Qué riesgos químicos pueden estar presentes en las funciones de herrero?", explicacion: "Exposición a humos de soldadura, gases de soldadura oxiacetilénica y disolventes.", dificultad: "media", opciones: ["Exposición a humos de soldadura, gases y disolventes", "Exclusivamente riesgo de contacto con elementos móviles de maquinaria", "Exclusivamente riesgo de proyección de partículas incandescentes", "Exclusivamente riesgo de descarga eléctrica por contacto directo"], correcta: 0 },
  { enunciado: "¿Qué operaciones del taller de herrería generan habitualmente riesgo de ruido?", explicacion: "Maquinaria, golpeo de forja y operaciones de calderería.", dificultad: "media", opciones: ["Maquinaria, golpeo de forja y operaciones de calderería", "Exclusivamente el uso de instrumentos de medición de precisión", "Exclusivamente el trazado de piezas sobre chapa metálica", "Exclusivamente el almacenamiento de materiales en el taller"], correcta: 0 },
]);

const S2 = "medidas-proteccion-individual-colectiva-herreria";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué son las medidas de protección colectiva, frente a las individuales, en el contexto de la prevención de riesgos laborales?", reverso: "Las medidas que protegen a la vez a todas las personas expuestas a un riesgo, actuando en el origen o en el entorno del peligro (resguardos de máquinas, ventilación general, señalización), frente a los EPI, que protegen individualmente a cada trabajador" },
  { anverso: "¿Qué criterio de prioridad establece la Ley 31/1995 entre las medidas de protección colectiva y los EPI?", reverso: "Las medidas de protección colectiva deben priorizarse sobre los equipos de protección individual, que se emplean cuando los riesgos no pueden evitarse o reducirse suficientemente por otros medios, incluidas las medidas colectivas" },
  { anverso: "¿Qué EPI son habituales en las operaciones de soldadura de un herrero?", reverso: "Careta o pantalla de soldadura con filtro adecuado, guantes específicos resistentes al calor, mandil o delantal de cuero, y ropa de trabajo ignífuga o resistente a chispas y proyecciones" },
  { anverso: "¿Qué EPI son habituales en las operaciones de mecanizado (torno, sierra, esmeriladora) de un herrero?", reverso: "Gafas de protección frente a proyección de virutas, protección auditiva frente al ruido, y calzado de seguridad, evitando en cambio el uso de guantes en la zona de rotación de máquinas como el torno" },
  { anverso: "¿Qué medida de protección colectiva es habitual frente a los humos de soldadura en un taller cerrado?", reverso: "Un sistema de extracción localizada de humos, que capta los humos en el propio punto de generación antes de que se dispersen por el ambiente del taller, complementado con una ventilación general adecuada" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué caracteriza a las medidas de protección colectiva frente a las individuales?", explicacion: "Protegen a la vez a todas las personas expuestas, actuando en el origen o el entorno del riesgo.", dificultad: "media", opciones: ["Protegen a la vez a todas las personas expuestas al riesgo", "Protegen únicamente a un trabajador concreto de forma individual", "Sustituyen siempre por completo a la necesidad de cualquier EPI", "Solo son aplicables a riesgos de tipo eléctrico en el taller"], correcta: 0 },
  { enunciado: "¿Qué prioridad establece la Ley 31/1995 entre las medidas colectivas y los EPI?", explicacion: "Las medidas colectivas deben priorizarse sobre los EPI.", dificultad: "media", opciones: ["Las medidas colectivas deben priorizarse sobre los EPI", "Los EPI deben priorizarse siempre sobre las medidas colectivas", "Ambas medidas tienen exactamente la misma prioridad legal", "La Ley 31/1995 no establece ninguna prioridad entre ambos tipos"], correcta: 0 },
  { enunciado: "¿Qué EPI son habituales en las operaciones de soldadura de un herrero?", explicacion: "Careta con filtro, guantes resistentes al calor, mandil de cuero y ropa ignífuga.", dificultad: "facil", opciones: ["Careta con filtro, guantes resistentes al calor y ropa ignífuga", "Únicamente gafas de sol convencionales, sin ninguna otra protección", "Únicamente un chaleco reflectante, sin ninguna otra protección adicional", "Ningún EPI específico distinto del habitual en cualquier otra tarea"], correcta: 0 },
  { enunciado: "¿Por qué debe evitarse el uso de guantes en la zona de rotación de un torno?", explicacion: "Por el riesgo de que el guante quede atrapado, arrastrando la mano del operario.", dificultad: "dificil", opciones: ["Por el riesgo de que el guante quede atrapado por la pieza en rotación", "Porque los guantes reducen siempre la precisión sin ningún riesgo real", "Porque los guantes están prohibidos en cualquier tarea del taller", "Porque los guantes aumentan siempre el riesgo de descarga eléctrica"], correcta: 0 },
  { enunciado: "¿Qué medida de protección colectiva es habitual frente a los humos de soldadura en un taller cerrado?", explicacion: "Un sistema de extracción localizada de humos, complementado con ventilación general.", dificultad: "media", opciones: ["Un sistema de extracción localizada de humos", "Únicamente el uso de una careta de soldadura por cada trabajador", "Únicamente la reducción de la jornada laboral del personal del taller", "Ninguna medida colectiva es posible frente a los humos de soldadura"], correcta: 0 },
]);

const S3 = "trabajos-espacios-confinados";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un espacio confinado, en el ámbito de la prevención de riesgos laborales?", reverso: "Un recinto con aberturas limitadas de entrada y salida, ventilación natural desfavorable, no concebido para una ocupación humana continuada, en el que pueden acumularse contaminantes o darse una atmósfera con déficit o exceso de oxígeno" },
  { anverso: "¿Qué tipo de intervenciones puede requerir a un herrero trabajar en un espacio confinado?", reverso: "Reparaciones o instalaciones de elementos metálicos en arquetas, pozos, cámaras, depósitos u otros recintos de acceso restringido de las instalaciones municipales" },
  { anverso: "¿Qué riesgo atmosférico es especialmente relevante en un espacio confinado, más allá de los riesgos mecánicos o térmicos propios del oficio?", reverso: "El riesgo de una atmósfera peligrosa: déficit de oxígeno (asfixia), exceso de oxígeno (mayor riesgo de incendio), presencia de gases tóxicos, o presencia de gases o vapores inflamables con riesgo de explosión" },
  { anverso: "¿Por qué es especialmente delicado realizar trabajos de soldadura o corte con llama dentro de un espacio confinado?", reverso: "Porque el propio proceso puede generar o agravar una atmósfera peligrosa (consumo de oxígeno, generación de gases y humos que no se dispersan fácilmente en un espacio con ventilación limitada), sumándose al riesgo atmosférico ya propio de este tipo de recintos" },
  { anverso: "¿Qué precauciones básicas deben aplicarse antes y durante un trabajo en espacio confinado?", reverso: "Obtener el permiso de trabajo correspondiente, medir la atmósfera del recinto antes de entrar, mantener una vigilancia externa continua por parte de un vigilante o ayudante, disponer de equipos de rescate y comunicación, y garantizar una ventilación forzada adecuada durante toda la intervención" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es un espacio confinado?", explicacion: "Un recinto con aberturas limitadas y ventilación desfavorable, no concebido para ocupación humana continuada.", dificultad: "facil", opciones: ["Un recinto con aberturas limitadas y ventilación desfavorable", "Cualquier estancia cerrada de un edificio municipal, sin excepción", "Un recinto exclusivamente al aire libre, sin ninguna limitación de acceso", "Un recinto exclusivamente destinado al almacenamiento de herramientas"], correcta: 0 },
  { enunciado: "¿Qué tipo de intervenciones puede requerir a un herrero trabajar en un espacio confinado?", explicacion: "Reparaciones o instalaciones metálicas en arquetas, pozos, cámaras o depósitos.", dificultad: "media", opciones: ["Reparaciones en arquetas, pozos, cámaras o depósitos", "Exclusivamente operaciones de torneado en el propio taller municipal", "Exclusivamente operaciones de dibujo técnico sobre plano", "Exclusivamente operaciones de medición con pie de rey en el taller"], correcta: 0 },
  { enunciado: "¿Qué riesgo atmosférico es especialmente relevante en un espacio confinado?", explicacion: "Déficit o exceso de oxígeno, gases tóxicos o gases inflamables.", dificultad: "media", opciones: ["Déficit o exceso de oxígeno, gases tóxicos o inflamables", "Exclusivamente el riesgo de ruido generado por la maquinaria", "Exclusivamente el riesgo de proyección de virutas metálicas", "Exclusivamente el riesgo de contacto eléctrico directo"], correcta: 0 },
  { enunciado: "¿Por qué es especialmente delicado soldar o cortar con llama dentro de un espacio confinado?", explicacion: "Puede generar o agravar una atmósfera peligrosa por consumo de oxígeno y generación de gases.", dificultad: "dificil", opciones: ["Puede generar o agravar una atmósfera peligrosa en el recinto", "Porque la soldadura nunca puede realizarse dentro de ningún espacio confinado", "Porque el riesgo eléctrico desaparece por completo dentro de un espacio confinado", "Porque la ventilación de un espacio confinado siempre es excelente por definición"], correcta: 0 },
  { enunciado: "¿Qué precaución básica debe aplicarse antes de entrar a un espacio confinado?", explicacion: "Medir la atmósfera del recinto antes de entrar, entre otras precauciones.", dificultad: "media", opciones: ["Medir la atmósfera del recinto antes de entrar", "Ninguna precaución específica distinta de cualquier otra tarea del taller", "Aumentar la velocidad de trabajo para reducir el tiempo de exposición", "Prescindir de cualquier vigilancia externa durante la intervención"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 22 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 22, orden: 22, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-170 creado y vinculado como Tema 22 de Oficial Herrero.");
