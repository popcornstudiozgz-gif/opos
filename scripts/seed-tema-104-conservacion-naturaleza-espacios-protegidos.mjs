/**
 * Crea tema-104: "Conservación de la naturaleza y espacios protegidos" —
 * Tema 19 (numero=19, bloque-2) de Oficial Agente Inspector (Ayto.
 * Zaragoza).
 *
 * Corresponde al TEMA 17 oficial del Anexo I (bases2110.pdf):
 *   "Estrategia mundial para la conservación de la naturaleza. Convenios
 *   internacionales ratificados por España sobre protección de especies
 *   y de hábitats. Directiva relativa a la conservación de hábitats
 *   naturales y flora y fauna silvestres. Directiva relativa a la
 *   conservación de las aves silvestres. Red Natura 2000: su regulación
 *   nacional y autonómica; planes de gestión. La Ley del Patrimonio
 *   Natural y de la Biodiversidad. Protección de espacios. Espacios
 *   protegidos RN2000. Otras figuras de protección de espacios. Decreto
 *   Legislativo 1/2015... Ley de Espacios Protegidos de Aragón. Espacios
 *   naturales protegidos y áreas naturales singulares en el término
 *   municipal de Zaragoza. Espacios naturales de titularidad municipal
 *   en Zaragoza. Normativa municipal de protección. La Ley del
 *   Patrimonio Natural y de la Biodiversidad. Protección de especies. El
 *   Listado de especies en régimen de protección especial y el catálogo
 *   español de especies amenazadas. Decreto 129/2022 por el que se crea
 *   el Listado Aragonés de Especies Silvestres en Régimen de Protección
 *   Especial (LAESRPE)..."
 *
 * Fuentes primarias verificadas en este turno:
 * - Directiva 92/43/CEE, de 21 de mayo de 1992 (Directiva Hábitats).
 * - Directiva 2009/147/CE, de 30 de noviembre de 2009 (Directiva Aves).
 * - Ley 42/2007, de 13 de diciembre, del Patrimonio Natural y de la
 *   Biodiversidad (BOE-A-2007-21490).
 * - Decreto Legislativo 1/2015, de 29 de julio, del Gobierno de Aragón,
 *   Texto Refundido de la Ley de Espacios Protegidos de Aragón.
 * - Decreto 129/2022, de 5 de septiembre, del Gobierno de Aragón, por el
 *   que se crea el LAESRPE y se regula el Catálogo de Especies
 *   Amenazadas de Aragón.
 * Los espacios naturales protegidos y áreas singulares concretas del
 * término municipal de Zaragoza no se detallan con listados no
 * verificados en esta sesión; se remite a la normativa municipal y
 * autonómica vigente para su consulta actualizada.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-104-conservacion-naturaleza-espacios-protegidos.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-104";
const OPOSICION = "oficial-agente-inspector-ayto-zaragoza";
const BLOQUE_2_ID = "b74ad422-4965-469e-9b9c-ef1a39c26d76";
const LEY_42_2007 = "https://www.boe.es/buscar/doc.php?id=BOE-A-2007-21490";

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
  titulo: "Conservación de la naturaleza y espacios protegidos",
  descripcion: "Directivas europeas de Hábitats y Aves. Red Natura 2000. Ley del Patrimonio Natural y de la Biodiversidad. Ley de Espacios Protegidos de Aragón. Protección de especies: LAESRPE.",
  contenido: "Desarrolla el marco internacional y europeo de conservación de la naturaleza (Directivas Hábitats y Aves, Red Natura 2000), la Ley 42/2007 del Patrimonio Natural y de la Biodiversidad, la Ley de Espacios Protegidos de Aragón (Decreto Legislativo 1/2015), y la protección de especies mediante el Listado Aragonés de Especies Silvestres en Régimen de Protección Especial (Decreto 129/2022).",
  enlaces_boe: [
    { url: LEY_42_2007, titulo: "Ley 42/2007 — Patrimonio Natural y de la Biodiversidad" },
  ],
  indice_estudio: [
    { url: "", titulo: "Directivas europeas de conservación: Hábitats y Aves", seccion: "directivas-europeas-habitats-aves", articulos: "Directiva 92/43/CEE y Directiva 2009/147/CE" },
    { url: LEY_42_2007, titulo: "Red Natura 2000 y Ley del Patrimonio Natural y la Biodiversidad", seccion: "red-natura-2000-patrimonio-natural", articulos: "Ley 42/2007" },
    { url: "", titulo: "Espacios Protegidos de Aragón y protección de especies (LAESRPE)", seccion: "espacios-protegidos-aragon-laesrpe", articulos: "Decreto Legislativo 1/2015 y Decreto 129/2022" },
  ],
}]);

const S1 = "directivas-europeas-habitats-aves";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es la Estrategia Mundial para la Conservación de la Naturaleza?", reverso: "Un documento marco internacional, impulsado por organizaciones como la UICN, que orienta las políticas globales de conservación de la biodiversidad y el uso sostenible de los recursos naturales" },
  { anverso: "¿Qué convenios internacionales sobre protección de especies y hábitats ha ratificado España?", reverso: "Entre otros, el Convenio de Ramsar (humedales), el Convenio de Bonn (especies migratorias), el Convenio de Berna (vida silvestre y hábitats naturales europeos) y el Convenio de Diversidad Biológica de Naciones Unidas" },
  { anverso: "¿Qué es la Directiva 92/43/CEE (Directiva Hábitats)?", reverso: "La directiva europea, de 21 de mayo de 1992, relativa a la conservación de los hábitats naturales y de la fauna y flora silvestres, que establece la base jurídica para la Red Natura 2000 mediante las Zonas Especiales de Conservación" },
  { anverso: "¿Qué es la Directiva 2009/147/CE (Directiva Aves)?", reverso: "La directiva europea, de 30 de noviembre de 2009, relativa a la conservación de las aves silvestres, que establece un régimen de protección para todas las especies de aves silvestres de la UE, incluidas las Zonas de Especial Protección para las Aves (ZEPA)" },
  { anverso: "¿Qué relación tienen ambas directivas europeas con la Red Natura 2000?", reverso: "Son la base jurídica conjunta de la Red Natura 2000: la Directiva Hábitats aporta las Zonas Especiales de Conservación (ZEC) y la Directiva Aves las Zonas de Especial Protección para las Aves (ZEPA)" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es la Estrategia Mundial para la Conservación de la Naturaleza?", explicacion: "Un documento marco internacional que orienta las políticas globales de conservación.", dificultad: "media", opciones: ["Un documento marco internacional de conservación", "Una ley española específica", "Un decreto autonómico de Aragón", "Un catálogo español de especies"], correcta: 0 },
  { enunciado: "¿Cuál de estos es un convenio internacional ratificado por España sobre especies o hábitats?", explicacion: "El Convenio de Ramsar, sobre humedales.", dificultad: "media", opciones: ["El Convenio de Ramsar", "El Convenio de Basilea sobre residuos", "El Convenio de Kioto sobre clima", "El Convenio de Roma sobre patrimonio cultural"], correcta: 0 },
  { enunciado: "¿Qué establece la Directiva 92/43/CEE?", explicacion: "La conservación de hábitats naturales y de la fauna y flora silvestres.", dificultad: "media", opciones: ["Conservación de hábitats y fauna/flora silvestres", "Conservación exclusiva de las aves silvestres", "El régimen de caza en la Unión Europea", "El régimen de vías pecuarias europeas"], correcta: 0 },
  { enunciado: "¿Qué establece la Directiva 2009/147/CE?", explicacion: "La conservación de las aves silvestres, incluidas las ZEPA.", dificultad: "media", opciones: ["Conservación de las aves silvestres (ZEPA)", "Conservación exclusiva de hábitats forestales", "El régimen de vías pecuarias", "El régimen de dominio público hidráulico"], correcta: 0 },
  { enunciado: "¿Qué relación tienen las Directivas Hábitats y Aves con la Red Natura 2000?", explicacion: "Son su base jurídica conjunta: aportan las ZEC y las ZEPA respectivamente.", dificultad: "media", opciones: ["Son la base jurídica conjunta de la Red Natura 2000", "No tienen ninguna relación entre sí", "Solo la Directiva Aves se relaciona con Natura 2000", "Ambas regulan exclusivamente la caza"], correcta: 0 },
]);

const S2 = "red-natura-2000-patrimonio-natural";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es la Red Natura 2000?", reverso: "Una red ecológica europea de espacios naturales protegidos, formada por Zonas Especiales de Conservación (ZEC) y Zonas de Especial Protección para las Aves (ZEPA), destinada a garantizar la conservación de hábitats y especies de interés comunitario" },
  { anverso: "¿Qué norma española traspone el marco europeo de conservación y regula el patrimonio natural?", reverso: "La Ley 42/2007, de 13 de diciembre, del Patrimonio Natural y de la Biodiversidad" },
  { anverso: "¿Qué objetivo general establece la Ley 42/2007?", reverso: "Establecer el régimen jurídico básico de la conservación, uso sostenible, mejora y restauración del patrimonio natural y la biodiversidad españoles, como parte del deber de conservar y garantizar el derecho a un medio ambiente adecuado" },
  { anverso: "¿Qué es un plan de gestión de un espacio de la Red Natura 2000?", reverso: "El instrumento que establece los objetivos de conservación y las medidas necesarias para mantener o restaurar en un estado favorable los hábitats y especies por los que se designó el espacio" },
  { anverso: "¿Qué otras figuras de protección de espacios naturales existen además de la Red Natura 2000?", reverso: "Parques nacionales, parques naturales, reservas naturales, monumentos naturales, paisajes protegidos, y otras figuras de protección autonómica según la Ley de Espacios Protegidos de cada Comunidad Autónoma" },
  { anverso: "¿Qué es un área natural singular, como categoría distinta a un espacio protegido formalmente declarado?", reverso: "Un espacio de valor natural relevante a nivel local (por ejemplo, municipal) que, sin contar necesariamente con una figura de protección autonómica o estatal, recibe algún grado de reconocimiento y protección por su interés ambiental" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es la Red Natura 2000?", explicacion: "Una red ecológica europea formada por ZEC y ZEPA.", dificultad: "facil", opciones: ["Una red ecológica europea de ZEC y ZEPA", "Una ley española de vías pecuarias", "Un catálogo de especies exóticas invasoras", "Un tipo de licencia ambiental municipal"], correcta: 0 },
  { enunciado: "¿Qué norma española regula el patrimonio natural y la biodiversidad?", explicacion: "La Ley 42/2007, de 13 de diciembre.", dificultad: "media", opciones: ["La Ley 42/2007", "La Ley 43/2003 de Montes", "El RDLeg 1/2001 de Aguas", "La Ley 11/2014 de Aragón"], correcta: 0 },
  { enunciado: "¿Qué objetivo general persigue la Ley 42/2007?", explicacion: "Establecer el régimen básico de conservación y uso sostenible del patrimonio natural.", dificultad: "media", opciones: ["Conservación y uso sostenible del patrimonio natural", "Regular exclusivamente la caza en España", "Regular exclusivamente las vías pecuarias", "Regular exclusivamente el dominio hidráulico"], correcta: 0 },
  { enunciado: "¿Qué es un plan de gestión de un espacio Red Natura 2000?", explicacion: "El instrumento con objetivos y medidas de conservación del espacio.", dificultad: "media", opciones: ["El instrumento con objetivos y medidas de conservación", "Un tipo de licencia ambiental municipal", "Un catálogo de especies exóticas invasoras", "Un plan de aprovechamiento cinegético"], correcta: 0 },
  { enunciado: "¿Qué otras figuras de protección de espacios existen además de Red Natura 2000?", explicacion: "Parques nacionales, naturales, reservas, monumentos naturales y paisajes protegidos.", dificultad: "media", opciones: ["Parques nacionales, naturales y reservas naturales", "Únicamente los montes de utilidad pública", "Únicamente las vías pecuarias clasificadas", "No existen otras figuras de protección"], correcta: 0 },
  { enunciado: "¿Qué es un área natural singular a nivel local?", explicacion: "Un espacio de valor natural relevante con reconocimiento local, sin figura de protección formal necesariamente.", dificultad: "media", opciones: ["Un espacio de valor natural con reconocimiento local", "Un sinónimo exacto de Red Natura 2000", "Un tipo de monte de utilidad pública", "Un tipo de vía pecuaria clasificada"], correcta: 0 },
]);

const S3 = "espacios-protegidos-aragon-laesrpe";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué norma aprueba el Texto Refundido de la Ley de Espacios Protegidos de Aragón?", reverso: "El Decreto Legislativo 1/2015, de 29 de julio, del Gobierno de Aragón, que refunde la anterior Ley 6/1998, de 19 de mayo, de Espacios Naturales Protegidos de Aragón, y sus modificaciones posteriores" },
  { anverso: "¿Qué norma crea el Listado Aragonés de Especies Silvestres en Régimen de Protección Especial (LAESRPE)?", reverso: "El Decreto 129/2022, de 5 de septiembre, del Gobierno de Aragón" },
  { anverso: "¿Qué relación tiene el LAESRPE con el Catálogo de Especies Amenazadas de Aragón?", reverso: "El Decreto 129/2022 integra en el LAESRPE al Catálogo de Especies Amenazadas de Aragón, unificando el sistema de protección especial y de amenaza de las especies silvestres aragonesas" },
  { anverso: "¿Qué implica que una especie esté incluida en el Catálogo de Especies Amenazadas de Aragón?", reverso: "Que su estado de conservación es preocupante y requiere medidas específicas de protección, pudiendo exigir la elaboración de planes de recuperación o conservación según su categoría de amenaza" },
  { anverso: "¿Qué es el Catálogo Español de Especies Amenazadas, a nivel estatal, y cómo se relaciona con los catálogos autonómicos como el de Aragón?", reverso: "Es el catálogo de ámbito estatal regulado por la Ley 42/2007 que recoge las especies amenazadas de España; los catálogos autonómicos (como el aragonés) pueden incluir especies adicionales de relevancia en su territorio, complementando la protección estatal" },
  { anverso: "¿Qué papel puede tener un agente inspector municipal en la protección de especies incluidas en el LAESRPE presentes en el término municipal de Zaragoza?", reverso: "Vigilar y detectar posibles afecciones a estas especies o sus hábitats (obras, molestias, capturas no autorizadas), y comunicar las incidencias a los organismos autonómicos competentes en conservación de especies" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué norma aprueba la Ley de Espacios Protegidos de Aragón?", explicacion: "El Decreto Legislativo 1/2015, de 29 de julio.", dificultad: "media", opciones: ["El Decreto Legislativo 1/2015", "El Decreto 129/2022", "La Ley 42/2007", "La Ley 1/2015 de Caza"], correcta: 0 },
  { enunciado: "¿Qué norma crea el LAESRPE en Aragón?", explicacion: "El Decreto 129/2022, de 5 de septiembre.", dificultad: "media", opciones: ["El Decreto 129/2022", "El Decreto Legislativo 1/2015", "La Ley 11/2014 de Aragón", "La Ley 10/2005 de vías pecuarias"], correcta: 0 },
  { enunciado: "¿Qué relación tiene el LAESRPE con el Catálogo de Especies Amenazadas de Aragón?", explicacion: "El Decreto 129/2022 integra ambos sistemas en un único listado.", dificultad: "media", opciones: ["Los integra en un único sistema de protección", "No tienen ninguna relación entre sí", "El LAESRPE sustituye por completo al Catálogo estatal", "Son exactamente el mismo documento europeo"], correcta: 0 },
  { enunciado: "¿Qué implica la inclusión de una especie en el Catálogo de Especies Amenazadas de Aragón?", explicacion: "Su estado de conservación preocupante requiere medidas específicas de protección.", dificultad: "media", opciones: ["Requiere medidas específicas de protección", "No tiene ningún efecto legal práctico", "Implica su eliminación del territorio aragonés", "Solo afecta a especies exóticas invasoras"], correcta: 0 },
  { enunciado: "¿Qué relación existe entre el Catálogo Español y los catálogos autonómicos de especies amenazadas?", explicacion: "Los autonómicos pueden complementar la protección estatal con especies de relevancia territorial.", dificultad: "dificil", opciones: ["Los autonómicos complementan la protección estatal", "Los autonómicos sustituyen por completo al estatal", "No puede haber catálogos autonómicos adicionales", "Solo existe el catálogo estatal en toda España"], correcta: 0 },
  { enunciado: "¿Qué papel puede tener un agente inspector respecto a especies del LAESRPE en Zaragoza?", explicacion: "Vigilar, detectar afecciones y comunicar incidencias a los organismos competentes.", dificultad: "media", opciones: ["Vigilar y comunicar incidencias a organismos competentes", "Ningún papel, es competencia exclusiva estatal", "Solo puede actuar sobre especies exóticas invasoras", "Solo puede actuar dentro de instalaciones deportivas"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 19 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 19, orden: 19, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-104 creado y vinculado como Tema 19 de Oficial Agente Inspector.");
