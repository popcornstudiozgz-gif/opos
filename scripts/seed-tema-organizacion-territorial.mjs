/**
 * Crea el tema canónico "tema-29: La organización territorial del Estado"
 * — contenido nuevo, confirmado antes de escribir que no solapa con ningún
 * tema existente (tema-3 cubre el Estatuto de Aragón desde otro ángulo;
 * tema-22 cubre la LBRL con más detalle pero para la DPZ, no para la DGA).
 * Cubre exactamente el Tema 2 del programa oficial de la DGA: "La
 * organización territorial del Estado. Gobierno de la Nación y
 * Administración General del Estado. Comunidades Autónomas. Administración
 * Local. Las relaciones entre los entes territoriales. Especial referencia
 * a la comarcalización de Aragón."
 *
 * Fuentes (todas leídas íntegras para este seed, nunca resumidas de
 * memoria):
 *   - Constitución Española de 1978, texto consolidado (BOE-A-1978-31229):
 *     Título IV (Del Gobierno y de la Administración, arts. 97-107) y
 *     Título VIII (De la Organización Territorial del Estado, arts.
 *     137-158).
 *   - Decreto Legislativo 1/2006, de 27 de diciembre, del Gobierno de
 *     Aragón, por el que se aprueba el texto refundido de la Ley de
 *     Comarcalización de Aragón (BOA-d-2006-90038), texto consolidado.
 *
 * Seis secciones:
 *   - "organizacion-territorial-general": arts. 137-139 CE (principios
 *     generales del Título VIII).
 *   - "gobierno-nacion-age": arts. 97-103 CE (Gobierno de la Nación,
 *     Administración Pública, principios de actuación).
 *   - "comunidades-autonomas": arts. 143-158 CE (acceso a la autonomía,
 *     Estatutos, competencias, organización institucional, control,
 *     financiación).
 *   - "administracion-local-ce": arts. 140-142 CE (garantía constitucional
 *     de la autonomía municipal y provincial).
 *   - "relaciones-entes-territoriales": arts. 145, 150 y 155 CE
 *     (cooperación entre CCAA, leyes marco/delegación, coerción estatal).
 *   - "comarcalizacion-aragon": Decreto Legislativo 1/2006 (naturaleza y
 *     fines de las comarcas, creación, competencias propias, órganos,
 *     financiación).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-organizacion-territorial.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!URL_BASE || !SERVICE_KEY) {
  console.error("❌ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-29";

async function upsert(tabla, filas, onConflict) {
  const res = await fetch(`${URL_BASE}/rest/v1/${tabla}?on_conflict=${onConflict}`, {
    method: "POST",
    headers: { ...HEADERS, Prefer: "resolution=merge-duplicates,return=representation" },
    body: JSON.stringify(filas),
  });
  if (!res.ok) {
    console.error(`❌ Error insertando en ${tabla}: ${res.status} ${await res.text()}`);
    process.exit(1);
  }
  const data = await res.json();
  console.log(`   ✓ ${tabla}: ${data.length} filas`);
  return data;
}

async function insertar(tabla, filas) {
  const res = await fetch(`${URL_BASE}/rest/v1/${tabla}`, {
    method: "POST",
    headers: { ...HEADERS, Prefer: "return=representation" },
    body: JSON.stringify(filas),
  });
  if (!res.ok) {
    console.error(`❌ Error insertando en ${tabla}: ${res.status} ${await res.text()}`);
    process.exit(1);
  }
  const data = await res.json();
  console.log(`   ✓ ${tabla}: ${data.length} filas`);
  return data;
}

// ── 1. TEMA CANÓNICO ────────────────────────────────────────────────────
console.log("📝 temas...");
await upsert(
  "temas",
  [
    {
      slug: TEMA,
      titulo: "La organización territorial del Estado",
      descripcion:
        "Principios generales de la organización territorial (arts. 137-139 CE). El Gobierno de la Nación y la Administración General del Estado. Las Comunidades Autónomas: acceso a la autonomía, Estatutos, competencias, organización institucional, control y financiación. La Administración Local en la Constitución. Las relaciones entre los entes territoriales. Especial referencia a la comarcalización de Aragón.",
      contenido:
        "Desarrolla el Título VIII de la Constitución (arts. 137-158), que organiza el Estado en municipios, provincias y Comunidades Autónomas, y el Título IV (arts. 97-103), que regula el Gobierno de la Nación y los principios de actuación de la Administración Pública. Completa el tema el Decreto Legislativo 1/2006, texto refundido de la Ley de Comarcalización de Aragón, que desarrolla la previsión del art. 5 del Estatuto de Autonomía y crea las comarcas como una capa de organización territorial propia y específica de Aragón, intermedia entre el municipio y la Comunidad Autónoma.",
      enlaces_boe: [
        { url: "https://www.boe.es/buscar/act.php?id=BOE-A-1978-31229", titulo: "Constitución Española" },
        { url: "https://www.boe.es/buscar/act.php?id=BOA-d-2006-90038", titulo: "Decreto Legislativo 1/2006 — Texto refundido de la Ley de Comarcalización de Aragón" },
      ],
      indice_estudio: [
        { url: "https://www.boe.es/buscar/act.php?id=BOE-A-1978-31229#tviii", titulo: "Principios generales de la organización territorial", seccion: "organizacion-territorial-general", articulos: "arts. 137-139 CE" },
        { url: "https://www.boe.es/buscar/act.php?id=BOE-A-1978-31229#tiv", titulo: "El Gobierno de la Nación y la Administración General del Estado", seccion: "gobierno-nacion-age", articulos: "arts. 97-103 CE" },
        { url: "https://www.boe.es/buscar/act.php?id=BOE-A-1978-31229#tviii", titulo: "Las Comunidades Autónomas", seccion: "comunidades-autonomas", articulos: "arts. 143-158 CE" },
        { url: "https://www.boe.es/buscar/act.php?id=BOE-A-1978-31229#tviii", titulo: "La Administración Local en la Constitución", seccion: "administracion-local-ce", articulos: "arts. 140-142 CE" },
        { url: "https://www.boe.es/buscar/act.php?id=BOE-A-1978-31229#tviii", titulo: "Las relaciones entre los entes territoriales", seccion: "relaciones-entes-territoriales", articulos: "arts. 145, 150 y 155 CE" },
        { url: "https://www.boe.es/buscar/act.php?id=BOA-d-2006-90038", titulo: "La comarcalización de Aragón", seccion: "comarcalizacion-aragon", articulos: "Decreto Legislativo 1/2006" },
      ],
    },
  ],
  "slug"
);

// ── 2. FLASHCARDS ────────────────────────────────────────────────────────
console.log("📝 flashcards (organizacion-territorial-general)...");
await insertar(
  "flashcards",
  [
    { anverso: "Según el art. 137 CE, ¿en qué entidades se organiza territorialmente el Estado?", reverso: "En municipios, en provincias y en las Comunidades Autónomas que se constituyan; todas ellas gozan de autonomía para la gestión de sus respectivos intereses" },
    { anverso: "¿Por qué principio, consagrado en el art. 2 CE, vela el Estado según el art. 138.1 CE al equilibrar económicamente el territorio?", reverso: "Por el principio de solidaridad, atendiendo en particular a las circunstancias del hecho insular" },
    { anverso: "Según el art. 138.2 CE, ¿qué no pueden implicar en ningún caso las diferencias entre los Estatutos de las distintas Comunidades Autónomas?", reverso: "Privilegios económicos o sociales" },
    { anverso: "Según el art. 139.1 CE, ¿qué tienen todos los españoles en cualquier parte del territorio del Estado?", reverso: "Los mismos derechos y obligaciones" },
    { anverso: "Según el art. 139.2 CE, ¿qué no puede obstaculizar ninguna autoridad, directa o indirectamente?", reverso: "La libertad de circulación y establecimiento de las personas y la libre circulación de bienes en todo el territorio español" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: "organizacion-territorial-general" })),
);

console.log("📝 flashcards (gobierno-nacion-age)...");
await insertar(
  "flashcards",
  [
    { anverso: "Según el art. 97 CE, ¿qué dirige el Gobierno y qué funciones ejerce?", reverso: "Dirige la política interior y exterior, la Administración civil y militar y la defensa del Estado; ejerce la función ejecutiva y la potestad reglamentaria" },
    { anverso: "Según el art. 98.1 CE, ¿de quién se compone el Gobierno?", reverso: "Del Presidente, de los Vicepresidentes, en su caso, de los Ministros y de los demás miembros que establezca la ley" },
    { anverso: "Según el art. 98.2 CE, ¿qué hace el Presidente respecto a los demás miembros del Gobierno?", reverso: "Dirige la acción del Gobierno y coordina las funciones de los demás miembros, sin perjuicio de la competencia y responsabilidad directa de éstos en su gestión" },
    { anverso: "Según el art. 100 CE, ¿quién nombra y separa a los miembros del Gobierno distintos del Presidente?", reverso: "El Rey, a propuesta del Presidente del Gobierno" },
    { anverso: "Según el art. 101.2 CE, ¿qué ocurre con el Gobierno cesante hasta la toma de posesión del nuevo Gobierno?", reverso: "Continúa en funciones" },
    { anverso: "Según el art. 103.1 CE, ¿con qué principios actúa la Administración Pública, sirviendo con objetividad los intereses generales?", reverso: "Eficacia, jerarquía, descentralización, desconcentración y coordinación, con sometimiento pleno a la ley y al Derecho" },
    { anverso: "Según el art. 103.2 CE, ¿cómo se crean, rigen y coordinan los órganos de la Administración del Estado?", reverso: "De acuerdo con la ley" },
    { anverso: "Según el art. 103.3 CE, ¿con qué principios debe regularse el acceso a la función pública?", reverso: "Los principios de mérito y capacidad" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: "gobierno-nacion-age" })),
);

console.log("📝 flashcards (comunidades-autonomas)...");
await insertar(
  "flashcards",
  [
    { anverso: "Según el art. 143.1 CE, ¿qué provincias pueden acceder a la autonomía y constituirse en Comunidad Autónoma?", reverso: "Las provincias limítrofes con características históricas, culturales y económicas comunes, los territorios insulares y las provincias con entidad regional histórica" },
    { anverso: "Según el art. 147.1 CE, ¿qué es un Estatuto de Autonomía dentro del ordenamiento jurídico del Estado?", reverso: "La norma institucional básica de cada Comunidad Autónoma, que el Estado reconocerá y amparará como parte integrante de su ordenamiento jurídico" },
    { anverso: "Según el art. 147.2 CE, ¿qué cuatro contenidos deben figurar en todo caso en un Estatuto de Autonomía?", reverso: "La denominación de la Comunidad, la delimitación de su territorio, la denominación, organización y sede de sus instituciones propias, y las competencias asumidas" },
    { anverso: "Según el art. 148.1 CE, ¿en qué tipo de materias pueden asumir competencias las Comunidades Autónomas?", reverso: "En las 22 materias enumeradas en dicho apartado (organización de sus instituciones, urbanismo, agricultura, sanidad e higiene, asistencia social, etc.)" },
    { anverso: "Según el art. 149.3 CE, ¿a quién corresponde la competencia sobre las materias no atribuidas expresamente al Estado y no asumidas por los Estatutos de Autonomía?", reverso: "Al Estado, cuyas normas prevalecerán en caso de conflicto; el derecho estatal será, en todo caso, supletorio del derecho de las Comunidades Autónomas" },
    { anverso: "Según el art. 152.1 CE, ¿en qué tres órganos se basa la organización institucional autonómica de las Comunidades de vía rápida (art. 151)?", reverso: "Una Asamblea Legislativa, un Consejo de Gobierno con funciones ejecutivas y administrativas, y un Presidente elegido por la Asamblea de entre sus miembros y nombrado por el Rey" },
    { anverso: "Según el art. 153 CE, ¿quién controla la constitucionalidad de las disposiciones normativas con fuerza de ley de las Comunidades Autónomas?", reverso: "El Tribunal Constitucional" },
    { anverso: "Según el art. 154 CE, ¿quién dirige la Administración del Estado en el territorio de la Comunidad Autónoma?", reverso: "Un Delegado nombrado por el Gobierno, que la coordinará, cuando proceda, con la administración propia de la Comunidad" },
    { anverso: "Según el art. 155.1 CE, ¿qué mayoría del Senado necesita el Gobierno para obligar a una Comunidad Autónoma al cumplimiento forzoso de sus obligaciones?", reverso: "La mayoría absoluta" },
    { anverso: "Según el art. 156.1 CE, ¿de qué gozan las Comunidades Autónomas para el desarrollo y ejecución de sus competencias?", reverso: "De autonomía financiera, con arreglo a los principios de coordinación con la Hacienda estatal y de solidaridad entre todos los españoles" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: "comunidades-autonomas" })),
);

console.log("📝 flashcards (administracion-local-ce)...");
await insertar(
  "flashcards",
  [
    { anverso: "Según el art. 140 CE, ¿qué garantiza la Constitución a los municipios y cómo se elige a sus Concejales?", reverso: "Garantiza su autonomía; los municipios gozan de personalidad jurídica plena y los Concejales se eligen por los vecinos mediante sufragio universal, igual, libre, directo y secreto" },
    { anverso: "Según el art. 140 CE, ¿de qué dos formas pueden ser elegidos los Alcaldes?", reverso: "Por los Concejales o por los vecinos" },
    { anverso: "Según el art. 141.1 CE, ¿qué es la provincia y con qué rango de ley se puede alterar sus límites?", reverso: "Una entidad local con personalidad jurídica propia, determinada por la agrupación de municipios; su alteración requiere ley orgánica de las Cortes Generales" },
    { anverso: "Según el art. 141.2 CE, ¿a quién están encomendados el gobierno y la administración autónoma de las provincias?", reverso: "A Diputaciones u otras Corporaciones de carácter representativo" },
    { anverso: "Según el art. 141.4 CE, ¿qué forma de administración propia tienen las islas de los archipiélagos, además de la provincial?", reverso: "Cabildos o Consejos" },
    { anverso: "Según el art. 142 CE, ¿de qué deben nutrirse fundamentalmente las Haciendas locales?", reverso: "De tributos propios y de participación en los del Estado y de las Comunidades Autónomas" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: "administracion-local-ce" })),
);

console.log("📝 flashcards (relaciones-entes-territoriales)...");
await insertar(
  "flashcards",
  [
    { anverso: "Según el art. 145.1 CE, ¿qué figura de unión entre Comunidades Autónomas está prohibida en todo caso?", reverso: "La federación de Comunidades Autónomas" },
    { anverso: "Según el art. 145.2 CE, ¿qué necesitan los acuerdos de cooperación entre Comunidades Autónomas que no estén previstos en sus Estatutos?", reverso: "La autorización de las Cortes Generales" },
    { anverso: "Según el art. 150.1 CE, ¿mediante qué tipo de norma estatal puede el Estado atribuir a las Comunidades Autónomas la facultad de dictar normas legislativas en materia de competencia estatal?", reverso: "Mediante una ley marco, que fija los principios, bases y directrices" },
    { anverso: "Según el art. 150.2 CE, ¿mediante qué instrumento puede el Estado transferir o delegar facultades de titularidad estatal en las Comunidades Autónomas?", reverso: "Mediante ley orgánica, que preverá la correspondiente transferencia de medios financieros y las formas de control que se reserve el Estado" },
    { anverso: "Según el art. 150.3 CE, ¿qué puede dictar el Estado para armonizar las disposiciones normativas de las Comunidades Autónomas cuando lo exija el interés general?", reverso: "Leyes de armonización, cuya necesidad aprecian las Cortes Generales por mayoría absoluta de cada Cámara" },
    { anverso: "Según el art. 155.2 CE, para ejecutar las medidas de coerción sobre una Comunidad Autónoma, ¿a quién puede dar instrucciones el Gobierno?", reverso: "A todas las autoridades de las Comunidades Autónomas" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: "relaciones-entes-territoriales" })),
);

console.log("📝 flashcards (comarcalizacion-aragon)...");
await insertar(
  "flashcards",
  [
    { anverso: "Según el art. 1.1 del texto refundido de la Ley de Comarcalización de Aragón, ¿qué municipios pueden constituirse en comarcas y qué condición adquieren éstas?", reverso: "Los municipios limítrofes vinculados por características e intereses comunes; las comarcas gozarán de la condición de entidades locales" },
    { anverso: "Según el art. 1.2 del texto refundido, ¿qué tienen a su cargo las comarcas?", reverso: "La prestación de servicios y la gestión de actividades de ámbito supramunicipal, representando los intereses de la población y territorio comarcales" },
    { anverso: "Según el art. 3.1 del texto refundido, ¿qué naturaleza jurídica tienen las comarcas como entidades locales territoriales?", reverso: "Tienen personalidad jurídica propia y gozan de capacidad y autonomía para el cumplimiento de sus fines" },
    { anverso: "Según el art. 4.2 del texto refundido, ¿puede un municipio pertenecer a más de una comarca?", reverso: "No, un municipio sólo podrá pertenecer a una comarca" },
    { anverso: "Según el art. 6.1 del texto refundido, ¿mediante qué instrumento se crea cada comarca?", reverso: "Por ley de las Cortes de Aragón, que determina su denominación, ámbito territorial, capitalidad, órganos de gobierno, competencias y recursos económicos propios" },
    { anverso: "Según el art. 9.4 del texto refundido, ¿qué requisito exige la ley para poder atribuir competencias a las comarcas?", reverso: "La previsión de la correspondiente financiación; además, el ejercicio efectivo de la competencia requiere la aprobación mediante decreto del acuerdo de la Comisión Mixta de Transferencias" },
    { anverso: "Según el art. 44.1 del texto refundido, ¿qué órganos existen en todas las comarcas?", reverso: "El Presidente, los Vicepresidentes y el Consejo comarcal" },
    { anverso: "Según el art. 45.1 del texto refundido, ¿a quién corresponden el gobierno y la administración comarcal?", reverso: "Al Consejo comarcal, integrado por el Presidente y los Consejeros" },
    { anverso: "Según el art. 48.1 del texto refundido, ¿cómo se elige al Presidente de la comarca?", reverso: "El Consejo comarcal lo elige de entre sus miembros en la misma sesión constitutiva" },
    { anverso: "Según el art. 59.1 del texto refundido, cita dos recursos que integran la Hacienda de las comarcas.", reverso: "Las tasas por prestación de servicios y las transferencias de la Comunidad Autónoma y de las provincias (entre otros: ingresos patrimoniales, contribuciones especiales, subvenciones, aportaciones municipales)" },
    { anverso: "Según el art. 39.1 del texto refundido, ¿qué órgano se constituye en el plazo de un mes tras la constitución del Consejo comarcal para preparar las transferencias de funciones y servicios?", reverso: "La Comisión mixta de transferencias entre la comarca y la Comunidad Autónoma de Aragón" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: "comarcalizacion-aragon" })),
);

// ── 3. PREGUNTAS DE TEST ─────────────────────────────────────────────────
console.log("📝 preguntas (organizacion-territorial-general)...");
await insertar(
  "preguntas",
  [
    {
      enunciado: "Según el art. 137 CE, ¿en qué entidades se organiza territorialmente el Estado?",
      explicacion: "En municipios, en provincias y en las Comunidades Autónomas que se constituyan. Todas estas entidades gozan de autonomía para la gestión de sus respectivos intereses.",
      dificultad: "facil",
    },
    {
      enunciado: "¿Qué principio garantiza el art. 138.1 CE mediante el establecimiento de un equilibrio económico entre las distintas partes del territorio español?",
      explicacion: "El principio de solidaridad, consagrado en el art. 2 CE, atendiendo en particular a las circunstancias del hecho insular.",
      dificultad: "media",
    },
    {
      enunciado: "Según el art. 138.2 CE, ¿qué no pueden implicar en ningún caso las diferencias entre los Estatutos de Autonomía de las distintas Comunidades?",
      explicacion: "Privilegios económicos o sociales entre unas Comunidades y otras.",
      dificultad: "media",
    },
    {
      enunciado: "Según el art. 139 CE, ¿qué principio impide a cualquier autoridad obstaculizar la libre circulación de personas y bienes en todo el territorio español?",
      explicacion: "El principio de igualdad de derechos y obligaciones de todos los españoles en cualquier parte del territorio del Estado (art. 139.1), del que deriva la prohibición del art. 139.2 CE.",
      dificultad: "media",
    },
  ].map((p) => ({ ...p, tema_slug: TEMA, seccion: "organizacion-territorial-general" })),
);

console.log("📝 preguntas (gobierno-nacion-age)...");
await insertar(
  "preguntas",
  [
    {
      enunciado: "Según el art. 97 CE, ¿qué función y qué potestad ejerce el Gobierno, además de dirigir la política interior y exterior?",
      explicacion: "Ejerce la función ejecutiva y la potestad reglamentaria, de acuerdo con la Constitución y las leyes.",
      dificultad: "facil",
    },
    {
      enunciado: "Según el art. 98.1 CE, ¿de quiénes se compone el Gobierno?",
      explicacion: "Del Presidente, de los Vicepresidentes, en su caso, de los Ministros y de los demás miembros que establezca la ley.",
      dificultad: "facil",
    },
    {
      enunciado: "¿Quién nombra y separa, según el art. 100 CE, a los miembros del Gobierno distintos del Presidente?",
      explicacion: "El Rey, a propuesta del Presidente del Gobierno.",
      dificultad: "facil",
    },
    {
      enunciado: "Según el art. 101.2 CE, ¿qué ocurre con el Gobierno cesante hasta que toma posesión el nuevo Gobierno?",
      explicacion: "El Gobierno cesante continuará en funciones hasta la toma de posesión del nuevo Gobierno.",
      dificultad: "media",
    },
    {
      enunciado: "Según el art. 103.1 CE, ¿con qué principios debe actuar la Administración Pública al servir con objetividad los intereses generales?",
      explicacion: "Eficacia, jerarquía, descentralización, desconcentración y coordinación, con sometimiento pleno a la ley y al Derecho.",
      dificultad: "media",
    },
    {
      enunciado: "¿Con qué principios debe regularse, según el art. 103.3 CE, el acceso a la función pública?",
      explicacion: "Los principios de mérito y capacidad, junto con las peculiaridades del derecho de sindicación, el sistema de incompatibilidades y las garantías de imparcialidad.",
      dificultad: "facil",
    },
  ].map((p) => ({ ...p, tema_slug: TEMA, seccion: "gobierno-nacion-age" })),
);

console.log("📝 preguntas (comunidades-autonomas)...");
await insertar(
  "preguntas",
  [
    {
      enunciado: "Según el art. 143.1 CE, ¿qué tipo de provincias o territorios pueden acceder a la autonomía y constituirse en Comunidad Autónoma?",
      explicacion: "Las provincias limítrofes con características históricas, culturales y económicas comunes, los territorios insulares y las provincias con entidad regional histórica.",
      dificultad: "media",
    },
    {
      enunciado: "¿Qué es un Estatuto de Autonomía según el art. 147.1 CE?",
      explicacion: "La norma institucional básica de cada Comunidad Autónoma, que el Estado reconocerá y amparará como parte integrante de su ordenamiento jurídico.",
      dificultad: "facil",
    },
    {
      enunciado: "Según el art. 149.3 CE, ¿qué ocurre con las materias no atribuidas expresamente al Estado por la Constitución y no asumidas por los Estatutos de Autonomía?",
      explicacion: "La competencia corresponderá al Estado, cuyas normas prevalecerán en caso de conflicto sobre las de las Comunidades Autónomas; el derecho estatal será, en todo caso, supletorio del derecho autonómico.",
      dificultad: "dificil",
    },
    {
      enunciado: "Según el art. 152.1 CE, ¿en qué tres órganos se basa la organización institucional de las Comunidades Autónomas de vía rápida?",
      explicacion: "Una Asamblea Legislativa elegida por sufragio universal, un Consejo de Gobierno con funciones ejecutivas y administrativas, y un Presidente elegido por la Asamblea de entre sus miembros y nombrado por el Rey.",
      dificultad: "media",
    },
    {
      enunciado: "¿Qué órgano controla, según el art. 153.a) CE, la constitucionalidad de las disposiciones normativas con fuerza de ley de las Comunidades Autónomas?",
      explicacion: "El Tribunal Constitucional. El Tribunal de Cuentas controla el aspecto económico y presupuestario, y la jurisdicción contencioso-administrativa, la administración autónoma y sus normas reglamentarias.",
      dificultad: "media",
    },
    {
      enunciado: "¿Qué mayoría del Senado necesita el Gobierno, según el art. 155.1 CE, para adoptar medidas que obliguen a una Comunidad Autónoma al cumplimiento forzoso de sus obligaciones constitucionales?",
      explicacion: "La mayoría absoluta del Senado, previo requerimiento al Presidente de la Comunidad Autónoma no atendido.",
      dificultad: "media",
    },
  ].map((p) => ({ ...p, tema_slug: TEMA, seccion: "comunidades-autonomas" })),
);

console.log("📝 preguntas (administracion-local-ce)...");
await insertar(
  "preguntas",
  [
    {
      enunciado: "Según el art. 140 CE, ¿cómo se eligen los Concejales y de qué dos formas puede elegirse al Alcalde?",
      explicacion: "Los Concejales se eligen por los vecinos del municipio mediante sufragio universal, igual, libre, directo y secreto; los Alcaldes serán elegidos por los Concejales o por los vecinos.",
      dificultad: "media",
    },
    {
      enunciado: "¿Qué rango de norma exige el art. 141.1 CE para alterar los límites provinciales?",
      explicacion: "Ley orgánica de las Cortes Generales.",
      dificultad: "media",
    },
    {
      enunciado: "Según el art. 141.2 CE, ¿a quién están encomendados el gobierno y la administración autónoma de las provincias?",
      explicacion: "A Diputaciones u otras Corporaciones de carácter representativo.",
      dificultad: "facil",
    },
    {
      enunciado: "¿De qué deben nutrirse fundamentalmente las Haciendas locales, según el art. 142 CE?",
      explicacion: "De tributos propios y de participación en los del Estado y de las Comunidades Autónomas.",
      dificultad: "facil",
    },
  ].map((p) => ({ ...p, tema_slug: TEMA, seccion: "administracion-local-ce" })),
);

console.log("📝 preguntas (relaciones-entes-territoriales)...");
await insertar(
  "preguntas",
  [
    {
      enunciado: "Según el art. 145.1 CE, ¿qué figura de unión entre Comunidades Autónomas está expresamente prohibida?",
      explicacion: "En ningún caso se admitirá la federación de Comunidades Autónomas.",
      dificultad: "facil",
    },
    {
      enunciado: "¿Mediante qué instrumento puede el Estado, según el art. 150.1 CE, atribuir a las Comunidades Autónomas la facultad de dictar normas legislativas en materia de competencia estatal?",
      explicacion: "Mediante una ley marco, en el marco de los principios, bases y directrices que ella misma fije.",
      dificultad: "dificil",
    },
    {
      enunciado: "Según el art. 150.3 CE, ¿qué mayoría de las Cortes Generales se requiere para apreciar la necesidad de dictar leyes de armonización de las disposiciones normativas de las Comunidades Autónomas?",
      explicacion: "La mayoría absoluta de cada Cámara.",
      dificultad: "dificil",
    },
    {
      enunciado: "Según el art. 155.2 CE, ¿a quién puede dar instrucciones el Gobierno para ejecutar las medidas de coerción adoptadas contra una Comunidad Autónoma?",
      explicacion: "A todas las autoridades de las Comunidades Autónomas.",
      dificultad: "media",
    },
  ].map((p) => ({ ...p, tema_slug: TEMA, seccion: "relaciones-entes-territoriales" })),
);

console.log("📝 preguntas (comarcalizacion-aragon)...");
await insertar(
  "preguntas",
  [
    {
      enunciado: "Según el art. 1.1 del texto refundido de la Ley de Comarcalización de Aragón, ¿qué condición gozarán las comarcas constituidas por municipios limítrofes vinculados por características e intereses comunes?",
      explicacion: "La condición de entidades locales.",
      dificultad: "facil",
    },
    {
      enunciado: "Según el art. 4.2 del texto refundido, ¿puede un municipio pertenecer a más de una comarca?",
      explicacion: "No; un municipio sólo podrá pertenecer a una comarca.",
      dificultad: "facil",
    },
    {
      enunciado: "¿Mediante qué instrumento se crea cada comarca aragonesa, según el art. 6.1 del texto refundido?",
      explicacion: "Por ley de las Cortes de Aragón, que determina su denominación, ámbito territorial, capitalidad, composición y funcionamiento de sus órganos de gobierno, competencias y recursos económicos propios.",
      dificultad: "media",
    },
    {
      enunciado: "Según el art. 9.4 del texto refundido, ¿qué debe preverse necesariamente antes de atribuir una competencia a una comarca?",
      explicacion: "La correspondiente financiación; además, su ejercicio efectivo requiere la aprobación, mediante decreto, del acuerdo de la Comisión Mixta de Transferencias.",
      dificultad: "dificil",
    },
    {
      enunciado: "¿Qué órganos existen en todas las comarcas aragonesas, según el art. 44.1 del texto refundido?",
      explicacion: "El Presidente, los Vicepresidentes y el Consejo comarcal (la Comisión de Gobierno y la Comisión especial de Cuentas son potestativas o de otra naturaleza).",
      dificultad: "media",
    },
    {
      enunciado: "¿Qué órgano se constituye, según el art. 39.1 del texto refundido, en el plazo de un mes tras la constitución del Consejo comarcal, con la finalidad de preparar las transferencias de funciones y servicios?",
      explicacion: "La Comisión mixta de transferencias entre la comarca correspondiente y la Comunidad Autónoma de Aragón.",
      dificultad: "media",
    },
  ].map((p) => ({ ...p, tema_slug: TEMA, seccion: "comarcalizacion-aragon" })),
);

// ── 4. ASIGNACIÓN A LA DGA (Tema 2 del programa oficial) ─────────────────
console.log("📝 tema_oposicion (DGA)...");
const bloques = await (await fetch(`${URL_BASE}/rest/v1/bloques?oposicion_slug=eq.auxiliar-administrativo-dga&slug=eq.bloque-1&select=id`, { headers: HEADERS })).json();
await upsert(
  "tema_oposicion",
  [
    {
      tema_slug: TEMA,
      oposicion_slug: "auxiliar-administrativo-dga",
      bloque_id: bloques[0].id,
      numero: 2,
      orden: 2,
      es_premium: false,
      publicado: true,
      secciones_incluidas: [
        "organizacion-territorial-general",
        "gobierno-nacion-age",
        "comunidades-autonomas",
        "administracion-local-ce",
        "relaciones-entes-territoriales",
        "comarcalizacion-aragon",
      ],
    },
  ],
  "tema_slug,oposicion_slug"
);

console.log("✅ tema-29 (La organización territorial del Estado) creado y asignado a la DGA como Tema 2.");
