/**
 * Crea tema-220: "Prevención de riesgos laborales en la utilización de
 * maquinaria pesada" — Tema 8 (numero=8, bloque-2) de Oficial Conductor,
 * Especialidad Maquinaria Pesada (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 6 oficial del Anexo I (bases2110.pdf, línea 2097):
 *   "Prevención de riesgos laborales en la utilización de maquinaria
 *   pesada, riesgos y medidas de prevención. Seguridad intrínseca de la
 *   maquinaria: requisitos de protección contra el vuelco. Zonas muertas
 *   en la diversa maquinaria de obra pública. Distancia de seguridad en
 *   la ejecución de los trabajos. Manipulación de cargas. Cables de
 *   acero: constitución y aplicación. Protección personal."
 *
 * Normativa verificada (parte ya citada en otras "Oficial X" del
 * proyecto — Ley 31/1995, RD 1215/1997, RD 773/1997 — y verificada de
 * nuevo en esta sesión para RD 1644/2008 y RD 1311/2005):
 * - Ley 31/1995, de 8 de noviembre, de Prevención de Riesgos Laborales
 *   (BOE-A-1995-24292).
 * - RD 1215/1997, de 18 de julio, sobre equipos de trabajo
 *   (BOE-A-1997-17824).
 * - RD 1644/2008, de 10 de octubre, normas para la comercialización y
 *   puesta en servicio de las máquinas (BOE-A-2008-16387) — requisitos
 *   esenciales de seguridad (Anexo I), incluida la protección contra el
 *   vuelco (estructuras ROPS/FOPS) de la maquinaria móvil.
 * - RD 773/1997, de 30 de mayo, sobre equipos de protección individual
 *   (BOE-A-1997-12735).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-220-prl-maquinaria-pesada.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-220";
const OPOSICION = "oficial-conductor-maquinaria-pesada-ayto-zaragoza";
const BLOQUE_2_ID = "388bfbfc-396e-4de2-8897-09532d6a0bcd";

const LEY_31_1995 = "https://www.boe.es/buscar/act.php?id=BOE-A-1995-24292";
const RD_1215_1997 = "https://www.boe.es/buscar/act.php?id=BOE-A-1997-17824";
const RD_1644_2008 = "https://www.boe.es/buscar/act.php?id=BOE-A-2008-16387";
const RD_773_1997 = "https://www.boe.es/buscar/act.php?id=BOE-A-1997-12735";

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
  titulo: "Prevención de riesgos laborales en la utilización de maquinaria pesada",
  descripcion: "Riesgos y medidas de prevención en el uso de maquinaria pesada. Seguridad intrínseca: protección contra el vuelco, zonas muertas y distancia de seguridad. Manipulación de cargas, cables de acero y protección personal.",
  contenido: "Desarrolla la prevención de riesgos laborales aplicada al uso de maquinaria pesada de obra pública: los riesgos característicos de este trabajo y sus medidas de prevención; la seguridad intrínseca de la propia máquina exigida por el RD 1644/2008 (estructuras de protección contra el vuelco ROPS y contra la caída de objetos FOPS), las zonas muertas o ángulos ciegos de cada tipo de maquinaria y la distancia de seguridad que debe respetarse durante la ejecución de los trabajos; y los riesgos asociados a la manipulación de cargas y al uso de cables de acero, junto con los equipos de protección individual exigidos por el RD 773/1997.",
  enlaces_boe: [
    { url: LEY_31_1995, titulo: "Ley 31/1995 — Prevención de Riesgos Laborales" },
    { url: RD_1215_1997, titulo: "RD 1215/1997 — equipos de trabajo" },
    { url: RD_1644_2008, titulo: "RD 1644/2008 — comercialización y puesta en servicio de las máquinas" },
    { url: RD_773_1997, titulo: "RD 773/1997 — equipos de protección individual" },
  ],
  indice_estudio: [
    { url: LEY_31_1995, titulo: "Riesgos y medidas de prevención en el uso de maquinaria pesada", seccion: "riesgos-medidas-prevencion-maquinaria-pesada", articulos: "Ley 31/1995, RD 1215/1997" },
    { url: RD_1644_2008, titulo: "Seguridad intrínseca: protección contra el vuelco, zonas muertas y distancia de seguridad", seccion: "seguridad-intrinseca-vuelco-zonas-muertas-distancia", articulos: "RD 1644/2008" },
    { url: RD_773_1997, titulo: "Manipulación de cargas, cables de acero y protección personal", seccion: "manipulacion-cargas-cables-acero-proteccion-personal", articulos: "RD 773/1997" },
  ],
}]);

const S1 = "riesgos-medidas-prevencion-maquinaria-pesada";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué norma establece el marco general de la prevención de riesgos laborales en España?", reverso: "La Ley 31/1995, de 8 de noviembre, de Prevención de Riesgos Laborales, que impone al empresario el deber de garantizar la seguridad y la salud de los trabajadores en todos los aspectos relacionados con el trabajo" },
  { anverso: "¿Qué regula el RD 1215/1997 en relación con el uso de maquinaria pesada?", reverso: "Las disposiciones mínimas de seguridad y salud para la utilización de los equipos de trabajo por los trabajadores, exigiendo que reúnan las condiciones técnicas necesarias, se mantengan en buen estado y se utilicen conforme a las instrucciones del fabricante" },
  { anverso: "¿Cuáles son algunos de los riesgos más característicos del trabajo con maquinaria pesada de obra pública?", reverso: "El vuelco de la máquina, el atropello o atrapamiento de personas en las zonas muertas, la caída de objetos o de la propia máquina, el contacto con líneas eléctricas, y los riesgos derivados de la manipulación de cargas y de los cables de acero" },
  { anverso: "¿Qué es una evaluación de riesgos, aplicada al puesto de operador de maquinaria pesada?", reverso: "El proceso dirigido a identificar los peligros específicos de este puesto (vuelco, atropello, atrapamiento, contacto eléctrico) y a valorar la magnitud de los riesgos que no hayan podido evitarse, como base para planificar las medidas preventivas adecuadas" },
  { anverso: "¿Qué obligación tiene la persona operadora de maquinaria pesada respecto a la formación e información recibida, según la Ley 31/1995?", reverso: "El deber de utilizar la máquina conforme a las instrucciones y a la formación recibidas, cumpliendo las medidas de prevención establecidas y velando por su propia seguridad y por la de terceros afectados por su actividad" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué norma establece el marco general de la prevención de riesgos laborales?", explicacion: "La Ley 31/1995, de Prevención de Riesgos Laborales.", dificultad: "facil", opciones: ["La Ley 31/1995, de Prevención de Riesgos Laborales", "El Reglamento General de Circulación", "El Reglamento General de Vehículos", "La Ley de Tráfico y Seguridad Vial"], correcta: 0 },
  { enunciado: "¿Qué regula el RD 1215/1997 en relación con la maquinaria pesada?", explicacion: "Las disposiciones mínimas de seguridad para la utilización de los equipos de trabajo.", dificultad: "media", opciones: ["Las disposiciones mínimas para la utilización de equipos de trabajo", "Los equipos de protección individual de los trabajadores", "El marcado CE y la comercialización de las máquinas", "El régimen de infracciones y sanciones de tráfico"], correcta: 0 },
  { enunciado: "¿Cuál de los siguientes es un riesgo característico del trabajo con maquinaria pesada de obra pública?", explicacion: "El vuelco de la máquina, entre otros riesgos característicos de este trabajo.", dificultad: "media", opciones: ["El vuelco de la máquina", "El riesgo de deslumbramiento en oficinas", "El riesgo de caída al mismo nivel en un despacho", "El riesgo derivado del uso de pantallas de visualización"], correcta: 0 },
  { enunciado: "¿Qué es una evaluación de riesgos aplicada al puesto de operador de maquinaria pesada?", explicacion: "El proceso de identificar los peligros específicos del puesto y valorar la magnitud de los riesgos no evitables.", dificultad: "dificil", opciones: ["Identificar los peligros del puesto y valorar sus riesgos", "Un simple listado de equipos de protección disponibles", "Un documento exclusivamente contable de costes preventivos", "Un trámite exigido solo tras un accidente ya ocurrido"], correcta: 0 },
  { enunciado: "¿Qué deber tiene la persona operadora respecto a la formación e información recibida en materia preventiva?", explicacion: "Utilizar la máquina conforme a las instrucciones y formación recibidas, cumpliendo las medidas de prevención.", dificultad: "media", opciones: ["Utilizar la máquina conforme a la formación e instrucciones recibidas", "Ningún deber específico distinto de portar el permiso de conducir", "Únicamente informar a la empresa si detecta un riesgo evidente", "Únicamente asistir a la formación cuando lo solicite expresamente"], correcta: 0 },
]);

const S2 = "seguridad-intrinseca-vuelco-zonas-muertas-distancia";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué regula el RD 1644/2008 en relación con la seguridad intrínseca de la maquinaria pesada?", reverso: "Los requisitos esenciales de seguridad y salud que deben cumplir las máquinas para su comercialización y puesta en servicio (recogidos en su Anexo I), entre ellos las exigencias de protección contra el vuelco y contra la caída de objetos en la maquinaria móvil de obras públicas" },
  { anverso: "¿Qué es una estructura ROPS (Roll-Over Protective Structure)?", reverso: "La estructura de protección contra el vuelco montada sobre la cabina o el puesto de conducción de una máquina, diseñada para mantener un espacio vital que proteja a la persona operadora en caso de vuelco de la máquina" },
  { anverso: "¿Qué es una estructura FOPS (Falling-Object Protective Structure)?", reverso: "La estructura de protección contra la caída de objetos, diseñada para proteger a la persona operadora frente al impacto de materiales, piedras u otros elementos que puedan caer sobre la cabina durante los trabajos" },
  { anverso: "¿Qué son las zonas muertas o ángulos ciegos de una máquina de obra pública?", reverso: "Las áreas alrededor de la máquina que no resultan visibles para la persona operadora desde su puesto de conducción, ni de forma directa ni mediante los espejos o cámaras de que disponga, y que constituyen una de las principales causas de atropello en obra" },
  { anverso: "¿Por qué es especialmente relevante respetar una distancia de seguridad adecuada durante los trabajos con maquinaria pesada?", reverso: "Porque evita que otras personas (operarios de apoyo, peatones) permanezcan dentro del radio de acción de la máquina o de sus zonas muertas, reduciendo el riesgo de atropello, atrapamiento o golpe por el propio equipo de trabajo o por los materiales que manipula" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué regula el RD 1644/2008 en relación con la seguridad intrínseca de la maquinaria?", explicacion: "Los requisitos esenciales de seguridad y salud para su comercialización y puesta en servicio.", dificultad: "media", opciones: ["Los requisitos esenciales de seguridad para su puesta en servicio", "Exclusivamente el régimen de matriculación de vehículos especiales", "Exclusivamente los límites de velocidad de la maquinaria", "Exclusivamente el marco de la prevención de riesgos laborales"], correcta: 0 },
  { enunciado: "¿Qué es una estructura ROPS?", explicacion: "La estructura de protección contra el vuelco de la máquina.", dificultad: "media", opciones: ["La estructura de protección contra el vuelco", "La estructura de protección contra la caída de objetos", "El sistema de frenado de emergencia de la máquina", "El sistema de iluminación nocturna de la máquina"], correcta: 0 },
  { enunciado: "¿Qué es una estructura FOPS?", explicacion: "La estructura de protección contra la caída de objetos sobre la cabina.", dificultad: "media", opciones: ["La estructura de protección contra la caída de objetos", "La estructura de protección contra el vuelco de la máquina", "El sistema de retrovisores de la máquina", "El sistema de frenado de estacionamiento de la máquina"], correcta: 0 },
  { enunciado: "¿Qué son las zonas muertas de una máquina de obra pública?", explicacion: "Las áreas no visibles para la persona operadora desde su puesto de conducción.", dificultad: "facil", opciones: ["Las áreas no visibles desde el puesto de conducción", "Las áreas exclusivamente traseras de cualquier vehículo", "Las zonas de la obra ya excavadas y sin actividad", "Las zonas donde la máquina no puede desplazarse físicamente"], correcta: 0 },
  { enunciado: "¿Por qué es relevante respetar la distancia de seguridad durante los trabajos con maquinaria pesada?", explicacion: "Evita que otras personas permanezcan dentro del radio de acción o de las zonas muertas de la máquina.", dificultad: "dificil", opciones: ["Evita que otras personas permanezcan en el radio de acción de la máquina", "Solo tiene relevancia estética, sin ninguna función preventiva real", "Únicamente resulta exigible en trabajos nocturnos de obra", "Únicamente resulta exigible si la máquina supera cierto peso"], correcta: 0 },
]);

const S3 = "manipulacion-cargas-cables-acero-proteccion-personal";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué riesgos característicos conlleva la manipulación de cargas con maquinaria pesada (por ejemplo, con una cuchara bivalva o una pluma)?", reverso: "El riesgo de caída de la carga por rotura o mal anclaje de los elementos de sujeción, el riesgo de golpe o atrapamiento de personas por la carga en movimiento, y el riesgo de vuelco de la propia máquina si se supera su capacidad de carga o se opera fuera de sus condiciones de estabilidad" },
  { anverso: "¿Qué es un cable de acero, en el contexto de la maquinaria de obra pública?", reverso: "Un elemento constituido por varios cordones de alambres de acero trenzados en torno a un alma central, empleado para izar, arrastrar o sujetar cargas, cuya resistencia depende de su diámetro, composición y estado de conservación" },
  { anverso: "¿Qué comprobaciones deben realizarse periódicamente sobre un cable de acero antes de su uso?", reverso: "Comprobar que no presenta hilos rotos en exceso, deformaciones, aplastamientos, corrosión ni reducción de diámetro por encima de los límites admisibles, retirándolo de servicio si supera los criterios de descarte establecidos por el fabricante o la normativa aplicable" },
  { anverso: "¿Qué equipos de protección individual son habituales en el trabajo con maquinaria pesada de obra pública?", reverso: "Casco de protección, calzado de seguridad, chaleco de alta visibilidad, guantes de protección mecánica y, según la tarea, protección auditiva o guantes específicos para la manipulación de cables de acero" },
  { anverso: "¿Cuándo deben emplearse los equipos de protección individual, según el RD 773/1997?", reverso: "Cuando los riesgos no puedan evitarse o limitarse suficientemente por medios de protección colectiva o mediante medidas, métodos o procedimientos de organización del trabajo" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué riesgo puede provocar el vuelco de una máquina durante la manipulación de cargas?", explicacion: "Superar su capacidad de carga u operar fuera de sus condiciones de estabilidad.", dificultad: "media", opciones: ["Superar la capacidad de carga u operar fuera de estabilidad", "Utilizar exclusivamente cargas de peso muy reducido", "Realizar la manipulación siempre en terreno horizontal", "Ninguna manipulación de cargas conlleva riesgo de vuelco"], correcta: 0 },
  { enunciado: "¿Qué es un cable de acero en el contexto de la maquinaria de obra pública?", explicacion: "Un elemento de cordones de alambres de acero trenzados, usado para izar o sujetar cargas.", dificultad: "facil", opciones: ["Un elemento de cordones de acero trenzados para izar cargas", "Un componente exclusivo del sistema eléctrico de la máquina", "Un componente exclusivo del sistema de frenado de la máquina", "Un elemento decorativo sin ninguna función mecánica real"], correcta: 0 },
  { enunciado: "¿Qué debe comprobarse periódicamente en un cable de acero antes de su uso?", explicacion: "Hilos rotos, deformaciones, corrosión y reducción de diámetro por encima de los límites admisibles.", dificultad: "media", opciones: ["Hilos rotos, deformaciones, corrosión y reducción de diámetro", "Únicamente el color exterior del cable de acero", "Únicamente la longitud total del cable de acero", "Ninguna comprobación es necesaria si el cable es reciente"], correcta: 0 },
  { enunciado: "¿Qué EPI es habitual en el trabajo con maquinaria pesada de obra pública?", explicacion: "Casco, calzado de seguridad y chaleco de alta visibilidad, entre otros.", dificultad: "facil", opciones: ["Casco, calzado de seguridad y chaleco de alta visibilidad", "Traje de neopreno, exclusivo de trabajos acuáticos", "Arnés anticaídas, exclusivo de trabajos verticales", "Ningún EPI resulta exigible en el trabajo de obra pública"], correcta: 0 },
  { enunciado: "¿Cuándo deben emplearse los equipos de protección individual, según el RD 773/1997?", explicacion: "Cuando los riesgos no puedan evitarse o limitarse por protección colectiva u organización del trabajo.", dificultad: "dificil", opciones: ["Cuando no puedan evitarse por protección colectiva u organización", "Siempre, en cualquier circunstancia y con independencia del riesgo", "Nunca, al ser siempre preferible exclusivamente la protección colectiva", "Solo cuando lo solicite expresamente la persona trabajadora"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 8 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 8, orden: 8, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-220 creado y vinculado como Tema 8 de Oficial Conductor Maquinaria Pesada.");
