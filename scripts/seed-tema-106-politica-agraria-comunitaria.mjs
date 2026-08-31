/**
 * Crea tema-106: "Política Agraria Comunitaria y legislación agraria de
 * Aragón" — Tema 21 (numero=21, bloque-2) de Oficial Agente Inspector
 * (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 19 oficial del Anexo I (bases2110.pdf):
 *   "La Política Agraria Comunitaria (PAC), Aplicación de medidas de la
 *   PAC en Aragón, Líneas de Ayudas, Regiones y Derechos, el tripartito,
 *   Eco-regímenes, su legislación sectorial, concepto y legislación de
 *   Jóvenes agricultores. Ley 6/2023, de 23 de febrero, de protección y
 *   modernización de la agricultura social y familiar y del patrimonio
 *   agrario de Aragón. Ley 19/1995, de 4 de julio, de Modernización de
 *   las Explotaciones Agrarias y ordenes que las desarrollan."
 *
 * Fuentes primarias verificadas en este turno:
 * - Ley 6/2023, de 23 de febrero, de protección y modernización de la
 *   agricultura social y familiar y del patrimonio agrario de Aragón
 *   (BOE-A-2023-7735).
 * - Ley 19/1995, de 4 de julio, de Modernización de las Explotaciones
 *   Agrarias (BOE-A-1995-16257).
 * La PAC 2023-2027 (Reglamentos UE 2021/2115, 2021/2116 y 2021/2117) y
 * su aplicación concreta en Aragón (líneas de ayuda, regionalización de
 * derechos, ecorregímenes) se describe en sus conceptos generales y
 * conocidos, sin fabricar cifras de importes o convocatorias concretas
 * no verificadas en esta sesión.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-106-politica-agraria-comunitaria.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-106";
const OPOSICION = "oficial-agente-inspector-ayto-zaragoza";
const BLOQUE_2_ID = "b74ad422-4965-469e-9b9c-ef1a39c26d76";
const LEY_6_2023 = "https://www.boe.es/buscar/doc.php?id=BOE-A-2023-7735";
const LEY_19_1995 = "https://www.boe.es/buscar/act.php?id=BOE-A-1995-16257";

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
  titulo: "Política Agraria Comunitaria y legislación agraria de Aragón",
  descripcion: "La PAC y su aplicación en Aragón: líneas de ayudas, derechos y ecorregímenes. Jóvenes agricultores. Ley de agricultura social y familiar de Aragón. Ley de Modernización de las Explotaciones Agrarias.",
  contenido: "Desarrolla la Política Agraria Comunitaria (PAC) y su aplicación en Aragón (líneas de ayudas, regionalización de derechos, ecorregímenes), el concepto de jóvenes agricultores, la Ley 6/2023 de protección y modernización de la agricultura social y familiar de Aragón, y la Ley 19/1995 de Modernización de las Explotaciones Agrarias.",
  enlaces_boe: [
    { url: LEY_6_2023, titulo: "Ley 6/2023 — Protección y modernización de la agricultura social y familiar de Aragón" },
    { url: LEY_19_1995, titulo: "Ley 19/1995 — Modernización de las Explotaciones Agrarias" },
  ],
  indice_estudio: [
    { url: "", titulo: "La PAC y su aplicación en Aragón: ayudas, derechos y ecorregímenes", seccion: "pac-aplicacion-aragon-ayudas-ecoregimenes", articulos: "Conceptos fundamentales" },
    { url: LEY_6_2023, titulo: "Ley 6/2023: agricultura social y familiar de Aragón", seccion: "ley-6-2023-agricultura-social-familiar", articulos: "Ley 6/2023, de 23 de febrero" },
    { url: LEY_19_1995, titulo: "Ley 19/1995: Modernización de las Explotaciones Agrarias", seccion: "ley-19-1995-modernizacion-explotaciones", articulos: "Ley 19/1995, de 4 de julio" },
  ],
}]);

const S1 = "pac-aplicacion-aragon-ayudas-ecoregimenes";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es la Política Agraria Comunitaria (PAC)?", reverso: "El conjunto de instrumentos y ayudas de la Unión Europea destinados a apoyar la renta de las personas agricultoras y ganaderas, fomentar prácticas agrarias sostenibles, y garantizar el desarrollo del medio rural" },
  { anverso: "¿Qué son las líneas de ayuda de la PAC?", reverso: "Los distintos tipos de pagos y subvenciones a los que puede optar una persona agricultora o ganadera según su actividad, tipo de explotación y compromisos asumidos (ayudas directas, desarrollo rural, ecorregímenes, entre otras)" },
  { anverso: "¿Qué son los derechos de pago (o derechos de la PAC) y qué es la regionalización?", reverso: "Los derechos de pago son el título que habilita a recibir determinadas ayudas directas por hectárea; la regionalización agrupa el territorio en regiones con un importe de derecho similar según sus características agronómicas" },
  { anverso: "¿Qué es el 'tripartito' en el sistema de ayudas directas de la PAC?", reverso: "El modelo de ayuda básica a la renta que combina tres componentes: el pago básico a la renta, un pago redistributivo adicional para las primeras hectáreas, y otros complementos según el perfil de la explotación" },
  { anverso: "¿Qué son los ecorregímenes de la PAC?", reverso: "Un régimen de ayudas voluntario, vinculado al primer pilar de la PAC, que retribuye a las personas agricultoras y ganaderas por adoptar prácticas agrícolas y ganaderas beneficiosas para el clima y el medio ambiente" },
  { anverso: "¿Qué es un/a joven agricultor/a a efectos de la legislación agraria y de las ayudas de la PAC?", reverso: "Una persona que se instala por primera vez al frente de una explotación agraria, habitualmente antes de una edad máxima determinada por la normativa (en torno a los 40 años), y que cumple los requisitos de formación y dedicación exigidos, pudiendo optar a ayudas específicas de primera instalación" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es la Política Agraria Comunitaria (PAC)?", explicacion: "El conjunto de instrumentos y ayudas de la UE para apoyar la renta agraria y el desarrollo rural.", dificultad: "facil", opciones: ["Instrumentos y ayudas de la UE para la renta agraria", "Una ley exclusivamente española de caza", "Un catálogo de especies amenazadas", "Un plan de protección civil"], correcta: 0 },
  { enunciado: "¿Qué son los derechos de pago de la PAC?", explicacion: "El título que habilita a recibir determinadas ayudas directas por hectárea.", dificultad: "media", opciones: ["El título que habilita ayudas directas por hectárea", "Un tipo de licencia ambiental", "Un tipo de vía pecuaria clasificada", "Un permiso de caza específico"], correcta: 0 },
  { enunciado: "¿Qué es el 'tripartito' del sistema de ayudas directas?", explicacion: "El modelo que combina pago básico, redistributivo y otros complementos.", dificultad: "media", opciones: ["Pago básico, redistributivo y complementos", "Un tipo de licencia de caza mayor", "Un tipo de vía pecuaria", "Un catálogo de especies protegidas"], correcta: 0 },
  { enunciado: "¿Qué son los ecorregímenes de la PAC?", explicacion: "Un régimen voluntario que retribuye prácticas beneficiosas para clima y medio ambiente.", dificultad: "media", opciones: ["Retribución voluntaria por prácticas ambientales", "Una sanción por incumplimiento agrario", "Un tipo de concesión administrativa", "Un sinónimo de derechos de pago"], correcta: 0 },
  { enunciado: "¿Qué es un/a joven agricultor/a a efectos de la PAC?", explicacion: "Quien se instala por primera vez al frente de una explotación, con requisitos de edad y formación.", dificultad: "media", opciones: ["Quien se instala por primera vez con requisitos", "Cualquier persona menor de 18 años", "Un sinónimo de titular de coto de caza", "Un cargo técnico de la Administración agraria"], correcta: 0 },
]);

const S2 = "ley-6-2023-agricultura-social-familiar";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué norma regula la protección y modernización de la agricultura social y familiar en Aragón?", reverso: "La Ley 6/2023, de 23 de febrero, de protección y modernización de la agricultura social y familiar y del patrimonio agrario de Aragón" },
  { anverso: "¿Qué modelo de explotación busca proteger específicamente la Ley 6/2023 de Aragón?", reverso: "El modelo de agricultura social y familiar, caracterizado por una dimensión económica intermedia (entre unos umbrales mínimo y máximo de producción estándar total), frente a otros modelos de explotación de gran escala" },
  { anverso: "¿Qué es el 'banco de tierras' que configura la Ley 6/2023 de Aragón?", reverso: "Un instrumento que permite concentrar, a favor del modelo de agricultura social y familiar, el patrimonio agrario disponible de la Comunidad Autónoma, facilitando el acceso a la tierra de este tipo de explotaciones" },
  { anverso: "¿Qué papel otorga la Ley 6/2023 al cooperativismo agrario aragonés?", reverso: "Lo promueve y adapta como solución institucional preferente para facilitar el acceso competitivo del modelo de agricultura familiar a mercados, tecnología y conocimiento" },
  { anverso: "¿Ha sido modificada la Ley 6/2023 desde su aprobación?", reverso: "Sí, ha sido modificada por la Ley 2/2025, de 15 de mayo, que suprime o modifica varios de sus artículos" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué norma regula la protección de la agricultura social y familiar en Aragón?", explicacion: "La Ley 6/2023, de 23 de febrero.", dificultad: "media", opciones: ["La Ley 6/2023", "La Ley 19/1995", "La Ley 1/2015 de Caza", "El RD 1372/1986"], correcta: 0 },
  { enunciado: "¿Qué modelo de explotación protege específicamente la Ley 6/2023?", explicacion: "El de agricultura social y familiar, con dimensión económica intermedia.", dificultad: "media", opciones: ["Agricultura social y familiar de dimensión intermedia", "Exclusivamente grandes explotaciones industriales", "Exclusivamente explotaciones cinegéticas", "Exclusivamente montes de utilidad pública"], correcta: 0 },
  { enunciado: "¿Qué es el 'banco de tierras' de la Ley 6/2023?", explicacion: "Un instrumento para concentrar patrimonio agrario a favor del modelo familiar.", dificultad: "media", opciones: ["Un instrumento para concentrar patrimonio agrario", "Un tipo de licencia de caza", "Un catálogo de especies amenazadas", "Un plan de protección civil"], correcta: 0 },
  { enunciado: "¿Qué papel otorga la Ley 6/2023 al cooperativismo agrario?", explicacion: "Lo promueve como solución institucional preferente de acceso a mercados.", dificultad: "media", opciones: ["Solución preferente para acceso a mercados", "Ningún papel específico", "Lo prohíbe expresamente", "Solo aplica a explotaciones de gran escala"], correcta: 0 },
  { enunciado: "¿Ha sido modificada la Ley 6/2023 desde su aprobación?", explicacion: "Sí, por la Ley 2/2025, de 15 de mayo.", dificultad: "dificil", opciones: ["Sí, por la Ley 2/2025", "No, permanece intacta desde 2023", "Sí, pero fue derogada por completo", "No, fue derogada por la Ley 19/1995"], correcta: 0 },
]);

const S3 = "ley-19-1995-modernizacion-explotaciones";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué norma regula la Modernización de las Explotaciones Agrarias a nivel estatal?", reverso: "La Ley 19/1995, de 4 de julio, de Modernización de las Explotaciones Agrarias" },
  { anverso: "¿Cuál es el objetivo fundamental de la Ley 19/1995?", reverso: "Corregir los desequilibrios y deficiencias estructurales de las explotaciones agrarias españolas, fomentando explotaciones viables y competitivas" },
  { anverso: "¿Qué es una 'persona agricultora profesional' según la Ley 19/1995?", reverso: "Una de las definiciones básicas que establece la ley en su título preliminar, referida a quien obtiene al menos el 50% de su renta total de actividades agrarias y dedica a ellas al menos el 50% de su tiempo de trabajo (según los términos concretos de la ley)" },
  { anverso: "¿Qué es el 'cabeza de explotación con título principal' (o agricultor a título principal) según la Ley 19/1995?", reverso: "Otra de las categorías definidas por la ley para el titular de una explotación agraria que cumple determinados requisitos de dedicación y procedencia de renta agraria, con relevancia para el acceso a determinados beneficios y ayudas" },
  { anverso: "¿Qué es el Catálogo General de Explotaciones Prioritarias, regulado por la Ley 19/1995?", reverso: "Un registro de carácter público, encomendado por el artículo 16 de la ley al Ministerio competente en agricultura, que recoge las explotaciones consideradas prioritarias por cumplir determinados requisitos de viabilidad y dedicación" },
  { anverso: "¿Qué relación tiene la Ley 19/1995 con las órdenes de desarrollo que la complementan?", reverso: "Estas órdenes ministeriales desarrollan aspectos técnicos y de procedimiento de la ley (por ejemplo, la determinación de las unidades de trabajo agrario o los módulos de renta), concretando su aplicación práctica" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué norma regula la Modernización de las Explotaciones Agrarias a nivel estatal?", explicacion: "La Ley 19/1995, de 4 de julio.", dificultad: "media", opciones: ["La Ley 19/1995", "La Ley 6/2023", "La Ley 1/2015 de Caza", "La Ley 42/2007"], correcta: 0 },
  { enunciado: "¿Cuál es el objetivo fundamental de la Ley 19/1995?", explicacion: "Corregir desequilibrios estructurales fomentando explotaciones viables y competitivas.", dificultad: "media", opciones: ["Corregir desequilibrios estructurales agrarios", "Regular exclusivamente la caza en España", "Regular exclusivamente el dominio hidráulico", "Sustituir a la Ley de Montes estatal"], correcta: 0 },
  { enunciado: "¿Qué define la Ley 19/1995 como 'persona agricultora profesional'?", explicacion: "Quien obtiene al menos el 50% de su renta y dedica al menos el 50% de su tiempo a la actividad agraria.", dificultad: "dificil", opciones: ["Al menos 50% de renta y tiempo dedicado a la actividad", "Cualquier propietario de terreno rústico", "Solo quien posee más de 100 hectáreas", "Solo quien tiene licencia de caza mayor"], correcta: 0 },
  { enunciado: "¿Qué es el Catálogo General de Explotaciones Prioritarias?", explicacion: "Un registro de explotaciones consideradas prioritarias por su viabilidad y dedicación.", dificultad: "media", opciones: ["Un registro de explotaciones prioritarias", "Un catálogo de especies amenazadas", "Un registro de montes de utilidad pública", "Un catálogo de vías pecuarias clasificadas"], correcta: 0 },
  { enunciado: "¿Qué función cumplen las órdenes de desarrollo de la Ley 19/1995?", explicacion: "Desarrollan aspectos técnicos y de procedimiento de la ley.", dificultad: "media", opciones: ["Desarrollan aspectos técnicos y de procedimiento", "Derogan por completo la ley original", "Sustituyen a la Ley 6/2023 de Aragón", "No tienen ninguna función práctica"], correcta: 0 },
  { enunciado: "¿Qué es el 'agricultor a título principal' según la Ley 19/1995?", explicacion: "El titular de una explotación que cumple requisitos de dedicación y renta agraria.", dificultad: "dificil", opciones: ["Titular con requisitos de dedicación y renta agraria", "Cualquier propietario de una vivienda rural", "Un cargo técnico del Gobierno de Aragón", "Un sinónimo de joven agricultor"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 21 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 21, orden: 21, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-106 creado y vinculado como Tema 21 de Oficial Agente Inspector.");
