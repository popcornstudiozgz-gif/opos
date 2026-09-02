/**
 * Crea tema-186: "Prevención de riesgos laborales en trabajos de
 * oficial mecánico. Condiciones generales de seguridad en el lugar de
 * trabajo" — Tema 22 (numero=22, bloque-2, último tema de la parte
 * específica) de Oficial Mecánico.
 *
 * Corresponde al TEMA 20 oficial: "Prevención de riesgos laborales en
 * trabajos de oficial mecánico. Condiciones generales de seguridad en
 * el lugar de trabajo."
 *
 * Normativa verificada en esta sesión (y en sesiones anteriores del
 * proyecto, ya citada en Oficial Albañil, Herrero, etc.):
 * - Ley 31/1995, de 8 de noviembre, de Prevención de Riesgos Laborales
 *   (BOE-A-1995-24292).
 * - RD 486/1997, de 14 de abril, sobre disposiciones mínimas de
 *   seguridad y salud en los lugares de trabajo (BOE-A-1997-8669) —
 *   verificado mediante WebSearch en esta sesión.
 * - RD 1215/1997, de 18 de julio, sobre equipos de trabajo
 *   (BOE-A-1997-17824).
 * - RD 773/1997, de 30 de mayo, sobre equipos de protección individual
 *   (BOE-A-1997-12735).
 * - RD 614/2001, de 8 de junio, sobre riesgo eléctrico
 *   (BOE-A-2001-11881).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-186-prl-oficial-mecanico.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-186";
const OPOSICION = "oficial-mecanico-ayto-zaragoza";
const BLOQUE_2_ID = "aa6cf0d6-e9fd-4e52-837d-15fab35cbcbe";

const LEY_31_1995 = "https://www.boe.es/buscar/act.php?id=BOE-A-1995-24292";
const RD_486_1997 = "https://www.boe.es/buscar/act.php?id=BOE-A-1997-8669";
const RD_1215_1997 = "https://www.boe.es/buscar/act.php?id=BOE-A-1997-17824";
const RD_773_1997 = "https://www.boe.es/buscar/act.php?id=BOE-A-1997-12735";
const RD_614_2001 = "https://www.boe.es/buscar/act.php?id=BOE-A-2001-11881";

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
  titulo: "Prevención de riesgos laborales en trabajos de oficial mecánico",
  descripcion: "El marco normativo general de la Ley 31/1995, las condiciones generales de seguridad en el lugar de trabajo del RD 486/1997, y los riesgos específicos y equipos de protección individual del oficial mecánico.",
  contenido: "Desarrolla el marco normativo de la prevención de riesgos laborales aplicable al puesto de oficial mecánico: la Ley 31/1995, de Prevención de Riesgos Laborales, como norma marco; el RD 486/1997, sobre condiciones generales de seguridad y salud en los lugares de trabajo (orden, limpieza, señalización, condiciones ambientales del taller); y los riesgos específicos del trabajo de taller mecánico de automoción (riesgo eléctrico, mecánico, químico, ergonómico) junto con los equipos de protección individual exigidos por el RD 773/1997 para cada uno de ellos.",
  enlaces_boe: [
    { url: LEY_31_1995, titulo: "Ley 31/1995 — Prevención de Riesgos Laborales" },
    { url: RD_486_1997, titulo: "RD 486/1997 — condiciones de seguridad y salud en los lugares de trabajo" },
    { url: RD_1215_1997, titulo: "RD 1215/1997 — equipos de trabajo" },
    { url: RD_773_1997, titulo: "RD 773/1997 — equipos de protección individual" },
    { url: RD_614_2001, titulo: "RD 614/2001 — riesgo eléctrico" },
  ],
  indice_estudio: [
    { url: LEY_31_1995, titulo: "El marco normativo: la Ley 31/1995 de Prevención de Riesgos Laborales", seccion: "marco-normativo-prl-ley-31-1995", articulos: "Ley 31/1995" },
    { url: RD_486_1997, titulo: "Condiciones generales de seguridad en el lugar de trabajo (RD 486/1997)", seccion: "condiciones-seguridad-lugar-trabajo-rd-486-1997", articulos: "RD 486/1997" },
    { url: RD_773_1997, titulo: "Riesgos específicos del taller mecánico y equipos de protección individual", seccion: "riesgos-especificos-oficial-mecanico-epi", articulos: "RD 1215/1997, RD 773/1997, RD 614/2001" },
  ],
}]);

const S1 = "marco-normativo-prl-ley-31-1995";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué norma establece el marco general de la prevención de riesgos laborales en España?", reverso: "La Ley 31/1995, de 8 de noviembre, de Prevención de Riesgos Laborales, que establece los principios generales relativos a la prevención de riesgos profesionales, la eliminación o disminución de los riesgos derivados del trabajo, y la información, consulta y formación de los trabajadores" },
  { anverso: "¿Qué es el deber de protección del empresario, según la Ley 31/1995?", reverso: "La obligación del empresario de garantizar la seguridad y la salud de los trabajadores a su servicio en todos los aspectos relacionados con el trabajo, adoptando cuantas medidas sean necesarias para la protección de la seguridad y la salud, incluida la evaluación de riesgos y la formación e información a los trabajadores" },
  { anverso: "¿Qué son los principios de la acción preventiva recogidos en el artículo 15 de la Ley 31/1995?", reverso: "Un conjunto ordenado de criterios que debe aplicar el empresario, entre ellos: evitar los riesgos, evaluar los riesgos que no se puedan evitar, combatir los riesgos en su origen, adaptar el trabajo a la persona, tener en cuenta la evolución técnica, sustituir lo peligroso por lo que entrañe poco o ningún peligro, y adoptar medidas que antepongan la protección colectiva a la individual" },
  { anverso: "¿Qué son los derechos y obligaciones de los trabajadores en materia de prevención, según la Ley 31/1995?", reverso: "El trabajador tiene derecho a una protección eficaz en materia de seguridad y salud, y correlativamente el deber de velar por su propia seguridad y salud y por la de otras personas afectadas por su actividad profesional, cumpliendo las medidas de prevención adoptadas y usando adecuadamente los equipos de trabajo y de protección puestos a su disposición" },
  { anverso: "¿Qué es el recurso preventivo, regulado en el artículo 32 bis de la Ley 31/1995?", reverso: "Una figura, designada por el empresario, presente en el centro de trabajo cuando concurren determinadas circunstancias de riesgo especial, con la función de vigilar el cumplimiento de las actividades preventivas en esas situaciones concretas de mayor peligrosidad" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué norma establece el marco general de la prevención de riesgos laborales en España?", explicacion: "La Ley 31/1995, de 8 de noviembre, de Prevención de Riesgos Laborales.", dificultad: "facil", opciones: ["La Ley 31/1995, de Prevención de Riesgos Laborales", "El Real Decreto 486/1997, de lugares de trabajo", "El Real Decreto 773/1997, de equipos de protección individual", "El Real Decreto 1215/1997, de equipos de trabajo"], correcta: 0 },
  { enunciado: "¿Qué establece el deber de protección del empresario según la Ley 31/1995?", explicacion: "La obligación de garantizar la seguridad y salud de los trabajadores en todos los aspectos relacionados con el trabajo.", dificultad: "media", opciones: ["Garantizar la seguridad y salud de los trabajadores en el trabajo", "Únicamente proporcionar el equipo de protección individual básico", "Únicamente informar verbalmente de los riesgos existentes", "No existe ningún deber de protección regulado por esta ley"], correcta: 0 },
  { enunciado: "¿Qué principio de la acción preventiva antepone la protección colectiva a la individual?", explicacion: "Es uno de los principios recogidos en el artículo 15 de la Ley 31/1995.", dificultad: "media", opciones: ["Anteponer la protección colectiva a la individual", "Anteponer siempre la protección individual a la colectiva", "Ignorar cualquier tipo de protección colectiva disponible", "Este principio no forma parte de la Ley 31/1995"], correcta: 0 },
  { enunciado: "¿Qué obligación tiene el trabajador, según la Ley 31/1995, en materia de prevención?", explicacion: "Velar por su propia seguridad y la de otras personas afectadas por su actividad, cumpliendo las medidas de prevención adoptadas.", dificultad: "media", opciones: ["Velar por su propia seguridad y la de otras personas afectadas", "El trabajador no tiene ninguna obligación en materia de prevención", "Únicamente informar a la empresa de cualquier riesgo detectado", "Únicamente asistir a formación cuando lo solicite expresamente"], correcta: 0 },
  { enunciado: "¿Qué es el recurso preventivo regulado en el artículo 32 bis de la Ley 31/1995?", explicacion: "Una figura designada por el empresario presente en el centro de trabajo ante circunstancias de riesgo especial.", dificultad: "dificil", opciones: ["Una figura presente ante circunstancias de riesgo especial", "Un documento que sustituye a la evaluación de riesgos", "Un equipo de protección individual específico obligatorio", "Un tipo de seguro obligatorio para los trabajadores"], correcta: 0 },
]);

const S2 = "condiciones-seguridad-lugar-trabajo-rd-486-1997";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué regula el RD 486/1997?", reverso: "Las disposiciones mínimas de seguridad y salud en los lugares de trabajo, incluyendo condiciones de orden, limpieza, mantenimiento, señalización, iluminación, condiciones ambientales, vías de circulación y servicios de primeros auxilios" },
  { anverso: "¿Qué exige el RD 486/1997 respecto al orden, limpieza y mantenimiento del lugar de trabajo, como un taller de mecánica?", reverso: "Que las zonas de paso, salidas y vías de circulación permanezcan libres de obstáculos, que los suelos se mantengan limpios y libres de sustancias resbaladizas o desperdicios, y que las operaciones de limpieza no supongan un riesgo para los trabajadores que las realicen o para terceros" },
  { anverso: "¿Qué exigencias establece el RD 486/1997 sobre la iluminación de los lugares de trabajo?", reverso: "Que la iluminación de cada zona se adapte a las características de la actividad que se efectúe en ella, garantizando unos niveles mínimos de iluminación adecuados para las tareas de detalle (como la reparación mecánica de precisión), evitando deslumbramientos y contrastes excesivos" },
  { anverso: "¿Qué exige el RD 486/1997 sobre las vías de circulación en un taller?", reverso: "Que estén dimensionadas de forma adecuada al número de personas y vehículos que puedan circular por ellas, con anchuras mínimas suficientes y, en caso de coexistir tránsito de vehículos y de personas, una separación clara entre ambos tipos de circulación" },
  { anverso: "¿Qué establece el RD 486/1997 sobre los servicios de primeros auxilios en el lugar de trabajo?", reverso: "Que el lugar de trabajo debe disponer de material y locales de primeros auxilios adecuados al número de trabajadores y a los riesgos existentes, incluyendo al menos un botiquín portátil con material de primeros auxilios suficiente" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué regula el RD 486/1997?", explicacion: "Las disposiciones mínimas de seguridad y salud en los lugares de trabajo.", dificultad: "facil", opciones: ["Las disposiciones mínimas de seguridad en los lugares de trabajo", "Los equipos de protección individual de los trabajadores", "Los equipos de trabajo empleados en la actividad laboral", "El riesgo eléctrico en los trabajos con electricidad"], correcta: 0 },
  { enunciado: "¿Qué exige el RD 486/1997 respecto a las zonas de paso y vías de circulación del taller?", explicacion: "Que permanezcan libres de obstáculos y los suelos limpios y libres de sustancias resbaladizas.", dificultad: "media", opciones: ["Que permanezcan libres de obstáculos y sustancias resbaladizas", "No existe ninguna exigencia específica sobre esta materia", "Solo deben mantenerse limpias una vez al mes, sin más frecuencia", "Las vías de circulación no requieren ningún mantenimiento particular"], correcta: 0 },
  { enunciado: "¿Qué exige el RD 486/1997 sobre la iluminación de los lugares de trabajo?", explicacion: "Que se adapte a las características de la actividad, con niveles mínimos adecuados y evitando deslumbramientos.", dificultad: "media", opciones: ["Que se adapte a la actividad, con niveles mínimos adecuados", "No existe ninguna exigencia específica sobre iluminación", "Solo debe garantizarse iluminación natural, nunca artificial", "La iluminación solo es relevante en trabajos nocturnos"], correcta: 0 },
  { enunciado: "¿Qué exige el RD 486/1997 sobre las vías de circulación cuando coexisten vehículos y personas?", explicacion: "Una separación clara entre la circulación de vehículos y de personas.", dificultad: "media", opciones: ["Una separación clara entre circulación de vehículos y personas", "No existe ninguna exigencia específica al respecto", "Solo deben separarse en horario nocturno de trabajo", "Basta con una señal visual sin ninguna separación física"], correcta: 0 },
  { enunciado: "¿Qué exige el RD 486/1997 sobre los servicios de primeros auxilios en el lugar de trabajo?", explicacion: "Disponer de material y locales adecuados al número de trabajadores y a los riesgos existentes, incluyendo un botiquín portátil.", dificultad: "media", opciones: ["Disponer de material adecuado al número de trabajadores y riesgos", "No existe ninguna exigencia sobre primeros auxilios en el trabajo", "Solo es obligatorio en empresas de más de mil trabajadores", "Basta con conocer el número de teléfono de emergencias"], correcta: 0 },
]);

const S3 = "riesgos-especificos-oficial-mecanico-epi";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué riesgos específicos son característicos del trabajo de un oficial mecánico de automoción?", reverso: "Riesgo mecánico (atrapamientos, golpes, cortes con herramientas y elementos móviles del vehículo), riesgo eléctrico (especialmente relevante en vehículos híbridos y eléctricos), riesgo químico (exposición a aceites, disolventes, gases de escape) y riesgo ergonómico (posturas forzadas, manipulación de cargas)" },
  { anverso: "¿Qué regula el RD 1215/1997 en relación con el trabajo de un oficial mecánico?", reverso: "Las disposiciones mínimas de seguridad y salud para la utilización de los equipos de trabajo (herramientas, elevadores, gatos, compresores), exigiendo que estos cumplan los requisitos técnicos necesarios y reciban el mantenimiento adecuado para su uso seguro" },
  { anverso: "¿Qué establece el RD 773/1997 respecto a los equipos de protección individual (EPI)?", reverso: "Las disposiciones mínimas de seguridad y salud relativas a la elección, uso y mantenimiento de los equipos de protección individual, que solo deben emplearse cuando los riesgos no puedan evitarse o limitarse suficientemente por medios de protección colectiva o de organización del trabajo" },
  { anverso: "¿Qué EPI son habituales en el trabajo diario de un oficial mecánico?", reverso: "Guantes de protección mecánica (y aislantes eléctricos cuando corresponda), calzado de seguridad con puntera reforzada, gafas o pantalla de protección ocular, y ropa de trabajo adecuada; en tareas específicas, protección auditiva o respiratoria según la exposición al ruido o a sustancias" },
  { anverso: "¿Por qué es importante el elevador de vehículos como equipo de trabajo desde el punto de vista de la prevención de riesgos?", reverso: "Porque un fallo o un uso inadecuado del elevador puede provocar la caída del vehículo con el trabajador debajo, siendo uno de los riesgos más graves del taller; debe someterse a inspecciones y mantenimiento periódicos, y respetar siempre su capacidad de carga máxima" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué riesgo específico es especialmente relevante en el trabajo con vehículos híbridos y eléctricos?", explicacion: "El riesgo eléctrico, dada la presencia de sistemas de alta tensión en estos vehículos.", dificultad: "media", opciones: ["El riesgo eléctrico por los sistemas de alta tensión", "El riesgo derivado exclusivamente del ruido ambiental", "El riesgo derivado exclusivamente de la manipulación de cargas", "Ningún riesgo adicional distinto de un vehículo convencional"], correcta: 0 },
  { enunciado: "¿Qué regula el RD 1215/1997 en relación con el trabajo de taller?", explicacion: "Las disposiciones mínimas de seguridad para la utilización de los equipos de trabajo.", dificultad: "media", opciones: ["Las disposiciones mínimas para la utilización de equipos de trabajo", "Los equipos de protección individual de los trabajadores", "Las condiciones generales de los lugares de trabajo", "El marco general de la prevención de riesgos laborales"], correcta: 0 },
  { enunciado: "¿Cuándo deben emplearse los equipos de protección individual (EPI), según el RD 773/1997?", explicacion: "Cuando los riesgos no puedan evitarse o limitarse suficientemente por medios de protección colectiva o de organización del trabajo.", dificultad: "dificil", opciones: ["Cuando no puedan evitarse por protección colectiva u organización", "Siempre, en cualquier circunstancia y con independencia del riesgo", "Nunca, al ser siempre preferible la protección colectiva exclusivamente", "Solo cuando lo solicite expresamente el propio trabajador"], correcta: 0 },
  { enunciado: "¿Qué EPI es habitual en el trabajo diario de un oficial mecánico frente al riesgo de golpes en los pies?", explicacion: "Calzado de seguridad con puntera reforzada.", dificultad: "facil", opciones: ["Calzado de seguridad con puntera reforzada", "Protección auditiva de forma permanente", "Arnés anticaídas de forma permanente", "Guantes aislantes de alta tensión en cualquier tarea"], correcta: 0 },
  { enunciado: "¿Por qué es especialmente crítico el mantenimiento periódico del elevador de vehículos en un taller mecánico?", explicacion: "Un fallo puede provocar la caída del vehículo con el trabajador debajo, uno de los riesgos más graves del taller.", dificultad: "dificil", opciones: ["Un fallo puede provocar la caída del vehículo sobre el trabajador", "El elevador de vehículos no presenta ningún riesgo relevante", "Solo requiere mantenimiento si se aprecia un fallo evidente", "El mantenimiento del elevador no está regulado por ninguna norma"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 22 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 22, orden: 22, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-186 creado y vinculado como Tema 22 de Oficial Mecánico.");
