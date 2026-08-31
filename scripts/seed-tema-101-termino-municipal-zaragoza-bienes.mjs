/**
 * Crea tema-101: "El Término Municipal de Zaragoza: geografía, PGOU y
 * bienes patrimoniales" — Tema 16 (numero=16, bloque-2) de Oficial
 * Agente Inspector (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 14 oficial del Anexo I (bases2110.pdf):
 *   "El Término Municipal de Zaragoza. Características geográficas de
 *   territorio y población. Barrios Rurales, El medio natural, Clima,
 *   relieve, geología, red hidrográfica, ecosistemas, biodiversidad.
 *   Normativa reguladora del suelo no urbanizable en el PGOU de
 *   Zaragoza. Bienes patrimoniales, demaniales y comunales: legislación
 *   y características. Normativa catastral, hipotecaria y civil
 *   relacionada, con especial incidencia en los caminos municipales.
 *   Normativas sobre arrendamientos y concesiones administrativas en el
 *   término municipal de Zaragoza, con especial referencia a pastos,
 *   caza, cultivo de labor y siembra, otros cultivos y arrendamientos."
 *
 * Fuentes primarias verificadas en este turno:
 * - Real Decreto 1372/1986, de 13 de junio, Reglamento de Bienes de las
 *   Entidades Locales (RBEL, BOE-A-1986-17958): clasifica los bienes
 *   locales en demaniales, patrimoniales y comunales, y regula (Título
 *   II) el aprovechamiento de bienes comunales, incluidos pastos y
 *   aprovechamientos agrícolas.
 * - Real Decreto Legislativo 1/2004, de 5 de marzo, Texto Refundido de
 *   la Ley del Catastro Inmobiliario (BOE-A-2004-4163).
 * - Plan General de Ordenación Urbana de Zaragoza (PGOUZ, texto
 *   consolidado de 2007/2008 con modificaciones posteriores): clasifica
 *   el suelo no urbanizable en especial y genérico.
 * Las características geográficas concretas (clima, relieve, superficie
 * exacta, número de barrios rurales) se describen de forma general y
 * conocida públicamente, sin fabricar cifras no verificadas en esta
 * sesión. La Ley Hipotecaria (Decreto de 8 de febrero de 1946) se cita
 * de forma genérica como marco de la inscripción registral de bienes
 * locales, exigida por el propio RBEL.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-101-termino-municipal-zaragoza-bienes.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-101";
const OPOSICION = "oficial-agente-inspector-ayto-zaragoza";
const BLOQUE_2_ID = "b74ad422-4965-469e-9b9c-ef1a39c26d76";
const RBEL = "https://www.boe.es/buscar/act.php?id=BOE-A-1986-17958";
const LEY_CATASTRO = "https://www.boe.es/buscar/act.php?id=BOE-A-2004-4163";

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
  titulo: "El Término Municipal de Zaragoza: geografía, PGOU y bienes patrimoniales",
  descripcion: "Características geográficas y barrios rurales. Suelo no urbanizable en el PGOU de Zaragoza. Bienes demaniales, patrimoniales y comunales. Arrendamientos y concesiones (pastos, caza, cultivo).",
  contenido: "Desarrolla las características geográficas del término municipal de Zaragoza (medio natural, barrios rurales), la normativa del suelo no urbanizable en el PGOU de Zaragoza, la clasificación de los bienes de las entidades locales (demaniales, patrimoniales y comunales) según el Reglamento de Bienes de las Entidades Locales, y las normas sobre arrendamientos y concesiones administrativas en el término municipal, con referencia a pastos, caza y cultivo.",
  enlaces_boe: [
    { url: RBEL, titulo: "RD 1372/1986 — Reglamento de Bienes de las Entidades Locales (RBEL)" },
    { url: LEY_CATASTRO, titulo: "RDLeg 1/2004 — Texto Refundido de la Ley del Catastro Inmobiliario" },
  ],
  indice_estudio: [
    { url: "", titulo: "Geografía del término municipal y suelo no urbanizable en el PGOU", seccion: "geografia-termino-municipal-suelo-no-urbanizable", articulos: "PGOU de Zaragoza (2007/2008 y modificaciones)" },
    { url: RBEL, titulo: "Bienes demaniales, patrimoniales y comunales", seccion: "bienes-demaniales-patrimoniales-comunales", articulos: "RBEL" },
    { url: LEY_CATASTRO, titulo: "Normativa catastral, hipotecaria y arrendamientos/concesiones", seccion: "normativa-catastral-arrendamientos-concesiones", articulos: "RDLeg 1/2004 y RBEL (aprovechamiento de comunales)" },
  ],
}]);

const S1 = "geografia-termino-municipal-suelo-no-urbanizable";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué caracteriza al medio natural del término municipal de Zaragoza en cuanto a clima?", reverso: "Un clima mediterráneo continentalizado, con tendencia semiárida, marcado por veranos calurosos, inviernos fríos, precipitaciones escasas e irregulares, y la influencia del viento del cierzo" },
  { anverso: "¿Qué elemento hidrográfico principal atraviesa el término municipal de Zaragoza?", reverso: "El río Ebro, con sus afluentes principales el Gállego y el Huerva, que conforman una red hidrográfica relevante para la biodiversidad y el paisaje del término municipal" },
  { anverso: "¿Qué son los Barrios Rurales de Zaragoza?", reverso: "Los núcleos de población tradicionalmente agrícola situados en el entorno rural del término municipal, gestionados a través de sus Juntas Vecinales (ver tema-74 de Oficial Mantenimiento General), con un peso relevante en la superficie total del municipio" },
  { anverso: "¿Qué es el Plan General de Ordenación Urbana de Zaragoza (PGOUZ)?", reverso: "El instrumento de planeamiento urbanístico municipal que clasifica y regula los usos del suelo del término municipal, distinguiendo entre suelo urbano, urbanizable y no urbanizable" },
  { anverso: "¿Cómo clasifica el PGOU de Zaragoza el suelo no urbanizable?", reverso: "En suelo no urbanizable especial (con condiciones especiales para preservar sus características naturales o productivas) y suelo no urbanizable genérico" },
  { anverso: "¿Qué ecosistemas relevantes para la biodiversidad se encuentran en el suelo no urbanizable del término municipal de Zaragoza?", reverso: "Sotos y riberas fluviales del Ebro y sus afluentes, espacios esteparios periurbanos, y zonas de secano y regadío tradicional del entorno rural" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué clima caracteriza al término municipal de Zaragoza?", explicacion: "Mediterráneo continentalizado con tendencia semiárida.", dificultad: "media", opciones: ["Mediterráneo continentalizado semiárido", "Oceánico húmedo", "Tropical de sabana", "Polar de alta montaña"], correcta: 0 },
  { enunciado: "¿Qué río principal atraviesa el término municipal de Zaragoza?", explicacion: "El Ebro, con sus afluentes Gállego y Huerva.", dificultad: "facil", opciones: ["El Ebro", "El Duero", "El Tajo", "El Guadalquivir"], correcta: 0 },
  { enunciado: "¿Qué son los Barrios Rurales de Zaragoza?", explicacion: "Núcleos de población del entorno rural gestionados por sus Juntas Vecinales.", dificultad: "media", opciones: ["Núcleos rurales gestionados por Juntas Vecinales", "Distritos urbanos del centro de la ciudad", "Instalaciones deportivas municipales", "Un tipo de bien demanial"], correcta: 0 },
  { enunciado: "¿Qué es el PGOUZ?", explicacion: "El instrumento de planeamiento que clasifica y regula los usos del suelo.", dificultad: "media", opciones: ["El instrumento que clasifica los usos del suelo", "El Reglamento de Bienes de las Entidades Locales", "La Ley del Catastro Inmobiliario", "Un tipo de concesión administrativa"], correcta: 0 },
  { enunciado: "¿Cómo clasifica el PGOU de Zaragoza el suelo no urbanizable?", explicacion: "En especial y genérico.", dificultad: "media", opciones: ["Especial y genérico", "Urbano y urbanizable exclusivamente", "Demanial y patrimonial", "Rústico y forestal exclusivamente"], correcta: 0 },
  { enunciado: "¿Qué ecosistemas de biodiversidad relevante hay en el suelo no urbanizable municipal?", explicacion: "Sotos fluviales, espacios esteparios y zonas de secano/regadío tradicional.", dificultad: "media", opciones: ["Sotos fluviales y espacios esteparios", "Únicamente polígonos industriales", "Únicamente zonas urbanas densas", "Ningún ecosistema relevante"], correcta: 0 },
]);

const S2 = "bienes-demaniales-patrimoniales-comunales";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué norma clasifica los bienes de las entidades locales?", reverso: "El Real Decreto 1372/1986, de 13 de junio, por el que se aprueba el Reglamento de Bienes de las Entidades Locales (RBEL)" },
  { anverso: "¿Qué son los bienes de dominio público (o demaniales) de una entidad local?", reverso: "Los bienes destinados a un uso o servicio público (calles, plazas, parques, edificios administrativos), caracterizados por ser inalienables, imprescriptibles e inembargables" },
  { anverso: "¿Qué son los bienes patrimoniales de una entidad local?", reverso: "Los bienes de titularidad local que no están destinados a un uso o servicio público, y que se rigen por el derecho privado con las especialidades propias de la legislación local (por ejemplo, en cuanto a su enajenación)" },
  { anverso: "¿Qué son los bienes comunales?", reverso: "Una categoría específica dentro de los bienes de dominio público, cuyo aprovechamiento corresponde al común de los vecinos de un municipio o entidad local (por ejemplo, pastos, leñas o aprovechamientos agrícolas comunales)" },
  { anverso: "¿Qué régimen jurídico rige sobre los bienes comunales frente a los patrimoniales?", reverso: "Los bienes comunales, al ser una modalidad de dominio público, comparten sus notas de inalienabilidad, imprescriptibilidad e inembargabilidad, a diferencia de los bienes patrimoniales, que sí pueden enajenarse conforme a procedimiento" },
  { anverso: "¿Qué obligación impone el RBEL a las entidades locales respecto a sus bienes?", reverso: "Mantener un inventario detallado y actualizado de todos sus bienes (inmuebles, muebles de valor y derechos), con revisión periódica, e inscribir sus inmuebles y derechos reales en el Registro de la Propiedad conforme a la legislación hipotecaria" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué norma clasifica los bienes de las entidades locales?", explicacion: "El RD 1372/1986, Reglamento de Bienes de las Entidades Locales.", dificultad: "media", opciones: ["El RD 1372/1986 (RBEL)", "El RDLeg 1/2004", "La Ley 7/1985 (LBRL)", "La Ley Hipotecaria de 1946"], correcta: 0 },
  { enunciado: "¿Qué caracteriza a los bienes de dominio público local?", explicacion: "Inalienables, imprescriptibles e inembargables.", dificultad: "media", opciones: ["Inalienables, imprescriptibles e inembargables", "Libremente enajenables sin restricción", "Sujetos únicamente al derecho privado", "Prescriptibles tras 30 años de uso"], correcta: 0 },
  { enunciado: "¿Qué son los bienes patrimoniales de una entidad local?", explicacion: "Los que no están destinados a uso o servicio público, regidos por derecho privado.", dificultad: "media", opciones: ["Los no destinados a uso público, con derecho privado", "Los destinados exclusivamente a pastos comunales", "Los inscritos exclusivamente en el Catastro", "Un sinónimo de bienes demaniales"], correcta: 0 },
  { enunciado: "¿Qué son los bienes comunales?", explicacion: "Bienes de dominio público cuyo aprovechamiento corresponde al común de vecinos.", dificultad: "media", opciones: ["Bienes cuyo aprovechamiento corresponde a los vecinos", "Bienes exclusivamente urbanos edificados", "Bienes libremente enajenables", "Un sinónimo de bienes patrimoniales"], correcta: 0 },
  { enunciado: "¿Qué notas comparten los bienes comunales con el resto del dominio público?", explicacion: "Inalienabilidad, imprescriptibilidad e inembargabilidad.", dificultad: "media", opciones: ["Inalienabilidad, imprescriptibilidad e inembargabilidad", "Ninguna, se rigen por derecho privado", "Solo la inembargabilidad", "Solo la posibilidad de enajenación libre"], correcta: 0 },
  { enunciado: "¿Qué obligación impone el RBEL sobre los bienes de una entidad local?", explicacion: "Mantener inventario actualizado e inscribir inmuebles en el Registro de la Propiedad.", dificultad: "media", opciones: ["Inventario actualizado e inscripción registral", "Ninguna obligación específica de registro", "Solo inventariar bienes muebles", "Solo inscribir bienes patrimoniales, no demaniales"], correcta: 0 },
]);

const S3 = "normativa-catastral-arrendamientos-concesiones";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué norma aprueba el Texto Refundido de la Ley del Catastro Inmobiliario?", reverso: "El Real Decreto Legislativo 1/2004, de 5 de marzo" },
  { anverso: "¿Qué es el Catastro Inmobiliario?", reverso: "Un registro administrativo, dependiente del Ministerio de Hacienda, en el que se describen los bienes inmuebles rústicos, urbanos y de características especiales, con su ubicación, superficie y titularidad a efectos fundamentalmente fiscales" },
  { anverso: "¿Qué diferencia hay entre el Catastro y el Registro de la Propiedad?", reverso: "El Catastro es un registro administrativo de naturaleza fundamentalmente fiscal (dependiente de Hacienda); el Registro de la Propiedad es un registro jurídico (dependiente del Ministerio de Justicia) que da fe de la titularidad y cargas de los inmuebles conforme a la legislación hipotecaria" },
  { anverso: "¿Por qué es relevante la normativa catastral e hipotecaria en relación con los caminos municipales?", reverso: "Porque permite delimitar con precisión la titularidad pública o privada de un camino, resolver conflictos de linderos, y verificar si un camino está correctamente inventariado e inscrito como bien de la entidad local" },
  { anverso: "¿Qué es un aprovechamiento comunal de pastos y qué norma lo regula?", reverso: "El uso o disfrute que el vecindario realiza de los pastos de un bien comunal municipal, regulado por el Reglamento de Bienes de las Entidades Locales (Título II), que establece las formas de adjudicación de estos aprovechamientos" },
  { anverso: "¿Qué es una concesión administrativa aplicada a un bien de dominio público municipal?", reverso: "El acto por el que la entidad local autoriza a una persona física o jurídica el uso privativo o el aprovechamiento especial de un bien de dominio público (por ejemplo, un terreno para cultivo o para caza), a cambio de una contraprestación y por un plazo determinado" },
  { anverso: "¿Qué tipos de aprovechamientos agrícolas o cinegéticos son habituales en terrenos municipales de Zaragoza según indica el temario oficial?", reverso: "Arrendamientos y concesiones referidos a pastos, caza, cultivo de labor y siembra, y otros cultivos, gestionados conforme a la normativa de bienes de las entidades locales y, en su caso, la normativa sectorial de caza (Ley 1/2015, ver tema-102)" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué norma aprueba el Texto Refundido de la Ley del Catastro Inmobiliario?", explicacion: "El RDLeg 1/2004, de 5 de marzo.", dificultad: "media", opciones: ["El RDLeg 1/2004", "El RD 1372/1986", "La Ley 42/2007", "La Ley 43/2003 de Montes"], correcta: 0 },
  { enunciado: "¿Qué es el Catastro Inmobiliario?", explicacion: "Un registro administrativo de naturaleza fundamentalmente fiscal.", dificultad: "media", opciones: ["Un registro administrativo de naturaleza fiscal", "Un registro exclusivamente judicial", "Un sinónimo del Registro de la Propiedad", "Un catálogo de especies protegidas"], correcta: 0 },
  { enunciado: "¿Qué diferencia hay entre Catastro y Registro de la Propiedad?", explicacion: "El Catastro es fiscal/administrativo; el Registro es jurídico y da fe de titularidad.", dificultad: "media", opciones: ["El Catastro es fiscal; el Registro es jurídico", "Son exactamente el mismo registro", "El Registro depende de Hacienda", "El Catastro da fe de titularidad jurídica"], correcta: 0 },
  { enunciado: "¿Por qué es relevante la normativa catastral e hipotecaria para los caminos municipales?", explicacion: "Permite delimitar su titularidad y verificar su correcta inscripción como bien local.", dificultad: "media", opciones: ["Permite delimitar titularidad e inscripción", "No tiene ninguna relación con los caminos", "Solo aplica a bienes patrimoniales urbanos", "Solo aplica a inmuebles de uso privado"], correcta: 0 },
  { enunciado: "¿Qué norma regula el aprovechamiento comunal de pastos?", explicacion: "El RBEL (Título II), que establece las formas de adjudicación.", dificultad: "media", opciones: ["El RBEL (Título II)", "La Ley del Catastro Inmobiliario", "La Ley Hipotecaria exclusivamente", "El Código Civil exclusivamente"], correcta: 0 },
  { enunciado: "¿Qué es una concesión administrativa sobre un bien de dominio público municipal?", explicacion: "La autorización del uso privativo o aprovechamiento especial a cambio de contraprestación y por plazo determinado.", dificultad: "media", opciones: ["Autorización de uso privativo por plazo determinado", "La venta definitiva del bien a un particular", "Un sinónimo de bien patrimonial", "Un tipo de inventario municipal"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 16 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 16, orden: 16, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-101 creado y vinculado como Tema 16 de Oficial Agente Inspector.");
