/**
 * Crea tema-103: "Normativa forestal, de aguas y de prevención
 * ambiental" — Tema 18 (numero=18, bloque-2) de Oficial Agente Inspector
 * (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 16 oficial del Anexo I (bases2110.pdf):
 *   "Normativa forestal. Concepto legal de monte. Clasificación legal de
 *   los montes según su propiedad y su naturaleza jurídica. Consorcios y
 *   Convenios. Los montes de utilidad pública: el Catálogo de Montes de
 *   Utilidad Pública. Infracciones en materia de montes. Montes
 *   patrimoniales del Ayuntamiento de Zaragoza. Texto refundido de la
 *   Ley de Aguas: Conceptos básicos. El dominio público hidráulico:
 *   bienes que lo integran, zonas de policía y de servidumbre y régimen
 *   de utilización. Infracciones y sanciones en materia de dominio
 *   público hidráulico. Ley de Prevención y Protección Ambiental de
 *   Aragón. Procedimientos y autorizaciones. Licencia Ambiental de
 *   Actividad Clasificada."
 *
 * Fuentes primarias verificadas en este turno:
 * - Ley 43/2003, de 21 de noviembre, de Montes (BOE-A-2003-21339).
 * - Real Decreto Legislativo 1/2001, de 20 de julio, Texto Refundido de
 *   la Ley de Aguas (BOE-A-2001-14276).
 * - Ley 11/2014, de 4 de diciembre, de Prevención y Protección
 *   Ambiental de Aragón (BOE-A-2015-186).
 * Los montes patrimoniales concretos del Ayuntamiento de Zaragoza y el
 * detalle exacto del Catálogo de Montes de Utilidad Pública aragonés no
 * se citan con denominaciones o cifras no verificadas en esta sesión.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-103-normativa-forestal-aguas-ambiental.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-103";
const OPOSICION = "oficial-agente-inspector-ayto-zaragoza";
const BLOQUE_2_ID = "b74ad422-4965-469e-9b9c-ef1a39c26d76";
const LEY_MONTES = "https://www.boe.es/buscar/act.php?id=BOE-A-2003-21339";
const TR_LEY_AGUAS = "https://www.boe.es/buscar/act.php?id=BOE-A-2001-14276";
const LEY_PREVENCION_AMBIENTAL = "https://www.boe.es/buscar/act.php?id=BOE-A-2015-186";

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
  titulo: "Normativa forestal, de aguas y de prevención ambiental",
  descripcion: "Concepto legal de monte y montes de utilidad pública (Ley de Montes). Dominio público hidráulico (Texto Refundido de la Ley de Aguas). Ley de Prevención y Protección Ambiental de Aragón.",
  contenido: "Desarrolla el concepto legal de monte y su clasificación según la Ley 43/2003 de Montes, el Catálogo de Montes de Utilidad Pública, el dominio público hidráulico según el Texto Refundido de la Ley de Aguas (zonas de policía y servidumbre), y la Ley de Prevención y Protección Ambiental de Aragón, con la Licencia Ambiental de Actividad Clasificada.",
  enlaces_boe: [
    { url: LEY_MONTES, titulo: "Ley 43/2003 — Ley de Montes" },
    { url: TR_LEY_AGUAS, titulo: "RDLeg 1/2001 — Texto Refundido de la Ley de Aguas" },
    { url: LEY_PREVENCION_AMBIENTAL, titulo: "Ley 11/2014 — Prevención y Protección Ambiental de Aragón" },
  ],
  indice_estudio: [
    { url: LEY_MONTES, titulo: "Concepto legal de monte y montes de utilidad pública", seccion: "concepto-monte-utilidad-publica", articulos: "Ley 43/2003" },
    { url: TR_LEY_AGUAS, titulo: "Dominio público hidráulico: zonas de policía y servidumbre", seccion: "dominio-publico-hidraulico-zonas", articulos: "RDLeg 1/2001" },
    { url: LEY_PREVENCION_AMBIENTAL, titulo: "Ley de Prevención y Protección Ambiental de Aragón: Licencia Ambiental", seccion: "prevencion-ambiental-licencia-actividad-clasificada", articulos: "Ley 11/2014" },
  ],
}]);

const S1 = "concepto-monte-utilidad-publica";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué norma estatal establece el concepto legal de monte y su régimen básico?", reverso: "La Ley 43/2003, de 21 de noviembre, de Montes" },
  { anverso: "¿Qué es un monte según su concepto legal?", reverso: "Todo terreno en el que vegetan especies forestales arbóreas, arbustivas, de matorral o herbáceas, sea espontáneamente o procedan de siembra o plantación, que cumplan o puedan cumplir funciones ambientales, protectoras, productoras, paisajísticas o recreativas" },
  { anverso: "¿Cómo se clasifican los montes según su propiedad?", reverso: "En montes públicos (de titularidad de una Administración pública) y montes privados (de titularidad de particulares, personas físicas o jurídicas)" },
  { anverso: "¿Qué son los montes de utilidad pública?", reverso: "Los montes públicos que, por sus características especiales de protección o interés general, son declarados de utilidad pública y quedan inscritos en el Catálogo de Montes de Utilidad Pública, gozando de un régimen jurídico de mayor protección" },
  { anverso: "¿Qué es el Catálogo de Montes de Utilidad Pública?", reverso: "El registro público administrativo, de carácter jurídico, en el que se inscriben los montes de utilidad pública, incluyendo su descripción, deslinde y titularidad" },
  { anverso: "¿Qué son los consorcios y convenios forestales?", reverso: "Instrumentos de colaboración entre la Administración forestal y los titulares de montes (públicos o privados) para la repoblación, mejora o gestión forestal, compartiendo derechos y obligaciones sobre el aprovechamiento" },
  { anverso: "¿Qué tipo de infracciones contempla la normativa en materia de montes?", reverso: "Infracciones administrativas relacionadas con la corta ilegal de arbolado, incendios provocados, ocupación indebida de terrenos forestales, o incumplimiento de las condiciones de aprovechamiento, sancionables según su gravedad" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué norma estatal regula el concepto legal de monte?", explicacion: "La Ley 43/2003, de 21 de noviembre, de Montes.", dificultad: "media", opciones: ["La Ley 43/2003 de Montes", "El RDLeg 1/2001 de Aguas", "La Ley 11/2014 de Aragón", "La Ley 1/2015 de Caza de Aragón"], correcta: 0 },
  { enunciado: "¿Qué es un monte según su concepto legal?", explicacion: "Terreno con vegetación forestal que cumple funciones ambientales, protectoras o productoras.", dificultad: "media", opciones: ["Terreno con vegetación forestal con funciones ambientales", "Cualquier terreno urbano sin edificar", "Un tipo de vía pecuaria clasificada", "Un bien exclusivamente patrimonial municipal"], correcta: 0 },
  { enunciado: "¿Cómo se clasifican los montes según su propiedad?", explicacion: "En montes públicos y montes privados.", dificultad: "facil", opciones: ["Públicos y privados", "Demaniales y comunales exclusivamente", "Urbanos y no urbanizables", "Cinegéticos y no cinegéticos"], correcta: 0 },
  { enunciado: "¿Qué son los montes de utilidad pública?", explicacion: "Montes públicos declarados de especial protección o interés general.", dificultad: "media", opciones: ["Montes públicos de especial protección declarados", "Cualquier monte privado catalogado", "Un tipo de vía pecuaria", "Un terreno cinegético exclusivamente"], correcta: 0 },
  { enunciado: "¿Qué es el Catálogo de Montes de Utilidad Pública?", explicacion: "El registro donde se inscriben los montes de utilidad pública.", dificultad: "media", opciones: ["El registro de montes de utilidad pública", "El registro de licencias de caza", "El Catastro Inmobiliario", "El Registro de la Propiedad"], correcta: 0 },
  { enunciado: "¿Qué son los consorcios y convenios forestales?", explicacion: "Instrumentos de colaboración entre la Administración y titulares de montes.", dificultad: "media", opciones: ["Instrumentos de colaboración para gestión forestal", "Un tipo de infracción en materia de montes", "Un tipo de licencia ambiental", "Un sinónimo de deslinde de vía pecuaria"], correcta: 0 },
]);

const S2 = "dominio-publico-hidraulico-zonas";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué norma aprueba el Texto Refundido de la Ley de Aguas?", reverso: "El Real Decreto Legislativo 1/2001, de 20 de julio" },
  { anverso: "¿Qué bienes integran el dominio público hidráulico?", reverso: "Las aguas continentales (superficiales y subterráneas renovables), los cauces de corrientes naturales, los lechos de lagos y lagunas, y los acuíferos subterráneos, entre otros bienes definidos por la ley" },
  { anverso: "¿Qué es la zona de servidumbre de un cauce público?", reverso: "Una franja lateral de 5 metros de anchura, contigua al cauce, destinada a usos de vigilancia, pesca, salvamento y paso público, con limitaciones de uso para el propietario colindante" },
  { anverso: "¿Qué es la zona de policía de un cauce público?", reverso: "Una franja lateral de 100 metros de anchura, contigua al cauce, en la que se condicionan ciertos usos y actividades (obras, plantaciones, extracciones) que puedan afectar al régimen del río o al dominio público hidráulico" },
  { anverso: "¿Qué autorización es necesaria para realizar determinadas actuaciones dentro de la zona de policía de un cauce?", reverso: "La autorización del organismo de cuenca competente (Confederación Hidrográfica correspondiente), que valora si la actuación puede afectar al régimen de corrientes o al dominio público hidráulico" },
  { anverso: "¿Qué tipo de infracciones contempla la normativa de aguas en materia de dominio público hidráulico?", reverso: "Infracciones relacionadas con vertidos no autorizados, ocupación indebida del dominio público hidráulico, extracciones ilegales de agua, o incumplimiento de las condiciones de una concesión, sancionables según su gravedad y el daño causado" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué norma aprueba el Texto Refundido de la Ley de Aguas?", explicacion: "El RDLeg 1/2001, de 20 de julio.", dificultad: "media", opciones: ["El RDLeg 1/2001", "La Ley 43/2003 de Montes", "La Ley 11/2014 de Aragón", "El RD 1372/1986"], correcta: 0 },
  { enunciado: "¿Qué bienes integran el dominio público hidráulico?", explicacion: "Aguas continentales, cauces, lechos de lagos y acuíferos subterráneos.", dificultad: "media", opciones: ["Aguas continentales, cauces y acuíferos", "Únicamente las vías pecuarias", "Únicamente los montes catalogados", "Únicamente los bienes patrimoniales municipales"], correcta: 0 },
  { enunciado: "¿Qué anchura tiene la zona de servidumbre de un cauce público?", explicacion: "5 metros.", dificultad: "media", opciones: ["5 metros", "100 metros", "500 metros", "1 metro"], correcta: 0 },
  { enunciado: "¿Qué anchura tiene la zona de policía de un cauce público?", explicacion: "100 metros.", dificultad: "media", opciones: ["100 metros", "5 metros", "50 metros", "1.000 metros"], correcta: 0 },
  { enunciado: "¿Qué organismo autoriza actuaciones en la zona de policía de un cauce?", explicacion: "El organismo de cuenca competente (Confederación Hidrográfica).", dificultad: "media", opciones: ["El organismo de cuenca (Confederación Hidrográfica)", "El Ayuntamiento exclusivamente", "El Gobierno de Aragón exclusivamente", "No se requiere ninguna autorización"], correcta: 0 },
  { enunciado: "¿Qué tipo de infracción contempla la normativa de aguas?", explicacion: "Vertidos no autorizados, ocupación indebida o extracciones ilegales.", dificultad: "media", opciones: ["Vertidos no autorizados y ocupación indebida", "Solo infracciones de tráfico rodado", "Solo infracciones de caza", "No contempla ningún régimen sancionador"], correcta: 0 },
]);

const S3 = "prevencion-ambiental-licencia-actividad-clasificada";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué norma regula la prevención y protección ambiental en Aragón?", reverso: "La Ley 11/2014, de 4 de diciembre, de Prevención y Protección Ambiental de Aragón" },
  { anverso: "¿Qué objetivo general persigue la Ley 11/2014 de Prevención y Protección Ambiental de Aragón?", reverso: "Establecer un marco integrado de instrumentos de intervención ambiental (evaluación de impacto, autorizaciones, licencias) para prevenir y controlar los efectos de las actividades sobre el medio ambiente" },
  { anverso: "¿Qué es la Licencia Ambiental de Actividad Clasificada?", reverso: "La autorización municipal previa exigida para el ejercicio de determinadas actividades (por su potencial molestia, insalubridad, nocividad o peligrosidad) antes de su puesta en marcha, conforme a la Ley 11/2014" },
  { anverso: "¿Qué tipo de actividades suelen requerir Licencia Ambiental de Actividad Clasificada?", reverso: "Actividades con potencial impacto ambiental medio (ruido, olores, vertidos, residuos), como determinadas instalaciones industriales, ganaderas, de hostelería con horario o aforo relevante, o de gestión de residuos" },
  { anverso: "¿Qué procedimiento sigue habitualmente el otorgamiento de una Licencia Ambiental de Actividad Clasificada?", reverso: "Solicitud con proyecto técnico, informe/valoración de los servicios técnicos municipales sobre el cumplimiento de los requisitos ambientales, y resolución municipal que autoriza (con condiciones, si procede) o deniega la actividad" },
  { anverso: "¿Qué papel puede tener un agente inspector municipal en relación con las actividades sujetas a esta normativa ambiental?", reverso: "Verificar in situ que una actividad se desarrolla conforme a las condiciones de su licencia ambiental, detectar actividades no autorizadas o incumplimientos, y elaborar los informes correspondientes para su tramitación" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué norma regula la prevención y protección ambiental en Aragón?", explicacion: "La Ley 11/2014, de 4 de diciembre.", dificultad: "media", opciones: ["La Ley 11/2014", "La Ley 43/2003 de Montes", "El RDLeg 1/2001 de Aguas", "La Ley 1/2015 de Caza"], correcta: 0 },
  { enunciado: "¿Qué objetivo persigue la Ley 11/2014 de Aragón?", explicacion: "Un marco integrado de instrumentos para prevenir y controlar efectos ambientales.", dificultad: "media", opciones: ["Un marco integrado de prevención ambiental", "Regular exclusivamente la caza en Aragón", "Regular exclusivamente el dominio hidráulico", "Sustituir a la Ley de Montes estatal"], correcta: 0 },
  { enunciado: "¿Qué es la Licencia Ambiental de Actividad Clasificada?", explicacion: "Autorización municipal previa para actividades con potencial impacto ambiental.", dificultad: "media", opciones: ["Autorización municipal previa a la actividad", "Un tipo de licencia de caza", "Un permiso de deslinde de vía pecuaria", "Un tipo de concesión de bienes comunales"], correcta: 0 },
  { enunciado: "¿Qué tipo de actividades requieren habitualmente esta licencia?", explicacion: "Actividades con potencial ruido, olores, vertidos o residuos.", dificultad: "media", opciones: ["Actividades con potencial impacto ambiental medio", "Únicamente actividades agrícolas de subsistencia", "Únicamente actividades deportivas municipales", "Ninguna actividad requiere esta licencia"], correcta: 0 },
  { enunciado: "¿Qué sigue el procedimiento de otorgamiento de esta licencia?", explicacion: "Solicitud con proyecto, informe técnico municipal y resolución.", dificultad: "media", opciones: ["Solicitud, informe técnico y resolución municipal", "Solo una comunicación sin ningún trámite", "Solo una inspección posterior sin solicitud previa", "No existe ningún procedimiento reglado"], correcta: 0 },
  { enunciado: "¿Qué papel puede tener un agente inspector respecto a esta normativa ambiental?", explicacion: "Verificar el cumplimiento de condiciones y detectar incumplimientos.", dificultad: "media", opciones: ["Verificar cumplimiento y detectar incumplimientos", "Ningún papel, es competencia autonómica exclusiva", "Solo tramitar la solicitud inicial", "Solo redactar el proyecto técnico"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 18 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 18, orden: 18, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-103 creado y vinculado como Tema 18 de Oficial Agente Inspector.");
