/**
 * Da de alta la oposición "Oficial Albañil" del Ayuntamiento de Zaragoza
 * (bases BOP núm. 170, 27/07/2026 — https://www.zaragoza.es/cont/paginas/oferta/archivos/bases/bases2110.pdf)
 * y construye los 4 temas canónicos de la "parte primera" (común), que
 * el Anexo I de las bases reproduce IDÉNTICOS para todos los puestos de
 * "Oficial X" de esta misma convocatoria (Mantenimiento General,
 * Instalaciones Deportivas, Agente Inspector, Guardallaves, Cementerio,
 * Albañil, Mecánico, Herrero, Electricista, Planta Potabilizadora,
 * Carpintero, Pintor, Conductor...). Al construirse como temas
 * canónicos independientes (tema-41 a tema-44), podrán reutilizarse sin
 * duplicar contenido cuando se aborden esos otros puestos.
 *
 * Fuentes primarias verificadas en este mismo turno (BOE, texto
 * consolidado, leído íntegro):
 * - Constitución Española (BOE-A-1978-31229)
 * - Estatuto de Autonomía de Aragón (BOE-A-2007-8444)
 * - Ley 10/2017, de régimen especial del municipio de Zaragoza como
 *   capital de Aragón (BOE-A-2018-1683)
 * - RDL 5/2015, Estatuto Básico del Empleado Público (BOE-A-2015-11719)
 * - Ley 31/1995, de Prevención de Riesgos Laborales (BOE-A-1995-24292)
 * - Ley Orgánica 3/2007, para la igualdad efectiva de mujeres y hombres,
 *   y Plan de Igualdad del Ayuntamiento de Zaragoza: contenido ya
 *   verificado y publicado en tema-2 de esta misma web (auxiliar
 *   administrativo Ayto. Zaragoza); se reutilizan aquí los mismos
 *   hechos jurídicos, sin volver a descargar el texto.
 * - Ley reguladora de las Haciendas Locales (recursos e impuestos
 *   municipales): contenido de dominio consolidado (IBI, IAE, IVTM,
 *   ICIO, IIVTNU como los cinco impuestos municipales; los dos
 *   primeros obligatorios, los tres últimos potestativos), ya usado en
 *   tema-12 de esta web.
 *
 * Uso: node --env-file=.env.local scripts/seed-oficial-albanil-setup-y-parte-comun.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!URL_BASE || !SERVICE_KEY) {
  console.error("❌ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const OPOSICION = "oficial-albanil-ayto-zaragoza";

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
  return res.json();
}

async function insertarPreguntasConOpciones(temaSlug, seccion, preguntas) {
  const filas = preguntas.map(({ opciones, correcta, ...p }) => ({ ...p, tema_slug: temaSlug, seccion }));
  const insertadas = await insertar("preguntas", filas);
  console.log(`   ✓ preguntas: ${insertadas.length} filas`);
  const filasOpciones = insertadas.flatMap((pregunta, i) =>
    preguntas[i].opciones.map((texto, orden) => ({
      pregunta_id: pregunta.id,
      texto,
      es_correcta: orden === preguntas[i].correcta,
      orden,
    })),
  );
  const opcionesInsertadas = await insertar("opciones", filasOpciones);
  console.log(`   ✓ opciones: ${opcionesInsertadas.length} filas`);
}

// ─────────────────────────────────────────────────────────────────────────
// 1. Oposición y bloques
// ─────────────────────────────────────────────────────────────────────────
console.log("🏛️  Creando oposición Oficial Albañil (Ayto. Zaragoza)...");
await insertar("oposiciones", [
  {
    slug: OPOSICION,
    nombre: "Oficial Albañil",
    organismo: "Ayuntamiento de Zaragoza",
    descripcion_corta: "Preparación online para Oficial Albañil del Ayuntamiento de Zaragoza (Escala de Administración Especial, C2).",
    descripcion_larga:
      "Temario interactivo para preparar la oposición de Oficial Albañil del Ayuntamiento de Zaragoza (turno libre ordinario, convocatoria 2026, BOP núm. 170 de 27/07/2026): 20 temas oficiales organizados en 2 bloques — una parte común compartida con el resto de puestos de \"Oficial\" de esta convocatoria, y una parte específica de albañilería.",
    activa: true,
    organismo_slug: "ayuntamiento-zaragoza",
    puesto_slug: "oficial-albanil",
  },
]);

console.log("📦 Creando bloques...");
const bloquesInsertados = await insertar("bloques", [
  {
    oposicion_slug: OPOSICION,
    slug: "bloque-1",
    titulo: "Bloque 1 — Parte común",
    descripcion:
      "Constitución Española, Estatuto de Autonomía de Aragón y disposiciones sobre el procedimiento administrativo común; Ley de capitalidad de Zaragoza y Haciendas Locales; empleados públicos; igualdad efectiva y prevención de riesgos laborales. Temario idéntico al de los demás puestos de \"Oficial\" de esta convocatoria.",
    orden: 1,
  },
  {
    oposicion_slug: OPOSICION,
    slug: "bloque-2",
    titulo: "Bloque 2 — Parte específica de albañilería",
    descripcion:
      "Materiales, herramientas, replanteo, mediciones, excavaciones, cimentaciones, tabiquería, cubiertas, impermeabilizaciones, pavimentación, organización de obra, medios auxiliares, seguridad y prevención de riesgos específicos de la profesión de albañil.",
    orden: 2,
  },
]);
const bloque1 = bloquesInsertados.find((b) => b.slug === "bloque-1");
console.log(`   ✓ bloque-1 id: ${bloque1.id}`);

// ─────────────────────────────────────────────────────────────────────────
// TEMA 41 — La Constitución Española, el Estatuto de Autonomía de Aragón
// y la Ley del Procedimiento Administrativo Común
// ─────────────────────────────────────────────────────────────────────────
const T41 = "tema-41";
console.log(`\n📚 Creando ${T41}...`);
await insertar("temas", [
  {
    slug: T41,
    titulo: "La Constitución Española, el Estatuto de Autonomía de Aragón y la Ley del Procedimiento Administrativo Común",
    descripcion:
      "La Constitución española: estructura y título preliminar. La Administración pública en la Constitución. Organización territorial del Estado en la Constitución: principios generales y Administración local. El Estatuto de Autonomía de Aragón: título preliminar y aspectos básicos de la organización institucional de la Comunidad autónoma. La Ley del Procedimiento Administrativo Común de las Administraciones Públicas: disposiciones sobre el procedimiento administrativo común.",
    contenido:
      "Desarrolla, de forma conjunta, tres bloques normativos básicos: la estructura y el título preliminar de la Constitución española, junto con la posición de la Administración pública y la organización territorial del Estado; el título preliminar y la organización institucional del Estatuto de Autonomía de Aragón; y las disposiciones generales del procedimiento administrativo común reguladas por la Ley 39/2015.",
    enlaces_boe: [
      { url: "https://www.boe.es/buscar/act.php?id=BOE-A-1978-31229", titulo: "Constitución Española" },
      { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2007-8444", titulo: "Estatuto de Autonomía de Aragón" },
      { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565", titulo: "Ley 39/2015, del Procedimiento Administrativo Común" },
    ],
    indice_estudio: [
      { url: "https://www.boe.es/buscar/act.php?id=BOE-A-1978-31229", titulo: "La Constitución española: estructura, título preliminar y Administración pública", seccion: "constitucion-estructura-titulo-preliminar-administracion", articulos: "Título preliminar (arts. 1-9); art. 103" },
      { url: "https://www.boe.es/buscar/act.php?id=BOE-A-1978-31229", titulo: "Organización territorial del Estado: principios generales y Administración local", seccion: "organizacion-territorial-administracion-local", articulos: "Título VIII, Cap. I y II (arts. 137-142)" },
      { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2007-8444", titulo: "El Estatuto de Autonomía de Aragón: título preliminar y organización institucional", seccion: "estatuto-autonomia-aragon-titulo-preliminar-organizacion", articulos: "Título preliminar (arts. 1-10); Título II (arts. 32 y ss.)" },
      { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565", titulo: "Disposiciones sobre el procedimiento administrativo común", seccion: "lpacap-disposiciones-procedimiento-administrativo-comun", articulos: "Arts. 53-105, 129-133" },
    ],
  },
]);

// Sección 1: Constitución — estructura, título preliminar, Administración pública
const S1_41 = "constitucion-estructura-titulo-preliminar-administracion";
console.log(`📝 flashcards (${S1_41})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Cuántos títulos tiene la Constitución Española de 1978, sin contar el preliminar?", reverso: "Diez títulos (Título I a Título X), además de un Título Preliminar, un Preámbulo y disposiciones adicionales, transitorias, derogatorias y finales" },
    { anverso: "¿Qué establece el artículo 1 de la Constitución sobre la forma del Estado español?", reverso: "Que España se constituye en un Estado social y democrático de Derecho, que propugna como valores superiores la libertad, la justicia, la igualdad y el pluralismo político; que la soberanía nacional reside en el pueblo español; y que la forma política del Estado es la Monarquía parlamentaria" },
    { anverso: "¿Dónde reside la soberanía nacional según el artículo 1.2 CE?", reverso: "En el pueblo español, del que emanan los poderes del Estado" },
    { anverso: "¿Qué principio consagra el artículo 9.3 CE respecto de la actuación de los poderes públicos?", reverso: "El principio de legalidad, la jerarquía normativa, la publicidad de las normas, la irretroactividad de las disposiciones sancionadoras no favorables, la seguridad jurídica, la responsabilidad y la interdicción de la arbitrariedad de los poderes públicos" },
    { anverso: "¿Cuál es la lengua española oficial del Estado según el artículo 3 CE?", reverso: "El castellano; todos los españoles tienen el deber de conocerla y el derecho a usarla, sin perjuicio de la oficialidad de otras lenguas en las respectivas comunidades autónomas" },
    { anverso: "¿Qué principios establece el artículo 103.1 CE para la actuación de la Administración Pública?", reverso: "Que sirve con objetividad los intereses generales y actúa de acuerdo con los principios de eficacia, jerarquía, descentralización, desconcentración y coordinación, con sometimiento pleno a la ley y al Derecho" },
    { anverso: "¿Qué órgano dirige la política interior y exterior, la Administración civil y militar y la defensa del Estado, según el artículo 97 CE?", reverso: "El Gobierno, que ejerce la función ejecutiva y la potestad reglamentaria de acuerdo con la Constitución y las leyes" },
    { anverso: "¿Qué principios rigen el acceso a la función pública según el artículo 103.3 CE?", reverso: "Los principios de mérito y capacidad" },
    { anverso: "¿Qué es la Administración General del Estado en relación con el artículo 103 CE?", reverso: "El conjunto de órganos que, bajo la dirección del Gobierno, ejercen la función ejecutiva y la potestad reglamentaria, sirviendo con objetividad los intereses generales" },
    { anverso: "¿Qué controlan los Tribunales respecto de la Administración, según el artículo 106.1 CE?", reverso: "La potestad reglamentaria y la legalidad de la actuación administrativa, así como el sometimiento de ésta a los fines que la justifican" },
  ].map((f) => ({ ...f, tema_slug: T41, seccion: S1_41 })),
);
console.log(`📝 preguntas de test (${S1_41})...`);
await insertarPreguntasConOpciones(T41, S1_41, [
  { enunciado: "¿Cuántos títulos numerados (I a X) tiene la Constitución Española, además del Título Preliminar?", explicacion: "Diez títulos, del I al X.", dificultad: "facil", opciones: ["Diez", "Ocho", "Doce", "Nueve"], correcta: 0 },
  { enunciado: "¿Dónde reside la soberanía nacional según el artículo 1.2 de la Constitución?", explicacion: "En el pueblo español, del que emanan los poderes del Estado.", dificultad: "facil", opciones: ["En el pueblo español", "En las Cortes Generales exclusivamente", "En el Rey", "En el Gobierno"], correcta: 0 },
  { enunciado: "¿Cuál es la forma política del Estado español según el artículo 1.3 CE?", explicacion: "La Monarquía parlamentaria.", dificultad: "facil", opciones: ["La Monarquía parlamentaria", "La República parlamentaria", "La Monarquía absoluta", "La Confederación de Estados"], correcta: 0 },
  { enunciado: "¿Qué principio garantiza el artículo 9.3 CE frente a la actuación arbitraria de los poderes públicos?", explicacion: "La interdicción de la arbitrariedad de los poderes públicos, junto con la seguridad jurídica y la jerarquía normativa.", dificultad: "media", opciones: ["La interdicción de la arbitrariedad de los poderes públicos", "La reserva de ley orgánica", "El principio de unidad de mercado", "El principio de subsidiariedad"], correcta: 0 },
  { enunciado: "¿Con arreglo a qué principios actúa la Administración Pública según el artículo 103.1 CE?", explicacion: "Eficacia, jerarquía, descentralización, desconcentración y coordinación, con sometimiento pleno a la ley y al Derecho.", dificultad: "media", opciones: ["Eficacia, jerarquía, descentralización, desconcentración y coordinación", "Autonomía, soberanía y unidad de caja", "Confidencialidad, celeridad y economía procesal exclusivamente", "Proporcionalidad y reserva de ley exclusivamente"], correcta: 0 },
  { enunciado: "¿A qué principios debe sujetarse el acceso a la función pública según el artículo 103.3 CE?", explicacion: "Mérito y capacidad.", dificultad: "facil", opciones: ["Mérito y capacidad", "Antigüedad exclusivamente", "Libre designación exclusivamente", "Sorteo entre candidatos"], correcta: 0 },
  { enunciado: "¿Qué órgano ejerce la función ejecutiva y la potestad reglamentaria según el artículo 97 CE?", explicacion: "El Gobierno.", dificultad: "facil", opciones: ["El Gobierno", "Las Cortes Generales", "El Rey", "El Tribunal Constitucional"], correcta: 0 },
  { enunciado: "¿Qué controlan los Tribunales respecto de la Administración según el artículo 106.1 CE?", explicacion: "La potestad reglamentaria y la legalidad de la actuación administrativa.", dificultad: "media", opciones: ["La potestad reglamentaria y la legalidad de la actuación administrativa", "Únicamente los actos de trámite", "Solo las sanciones económicas", "Los actos del poder legislativo"], correcta: 0 },
]);

// Sección 2: Organización territorial del Estado — principios generales y Administración local
const S2_41 = "organizacion-territorial-administracion-local";
console.log(`📝 flashcards (${S2_41})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿En qué entidades se organiza territorialmente el Estado según el artículo 137 CE?", reverso: "En municipios, en provincias y en las Comunidades Autónomas que se constituyan; todas ellas gozan de autonomía para la gestión de sus respectivos intereses" },
    { anverso: "¿Qué principio garantiza el Estado en el artículo 138.1 CE respecto de las diversas partes del territorio español?", reverso: "El principio de solidaridad, velando por el establecimiento de un equilibrio económico adecuado y justo entre las diversas partes del territorio, atendiendo en particular a las circunstancias del hecho insular" },
    { anverso: "¿Qué garantiza el artículo 139.1 CE a todos los españoles en cualquier parte del territorio del Estado?", reverso: "Los mismos derechos y obligaciones" },
    { anverso: "¿Qué garantiza el artículo 140 CE respecto de los municipios?", reverso: "Su autonomía, con personalidad jurídica plena; su gobierno y administración corresponde a sus Ayuntamientos, integrados por Alcaldes y Concejales" },
    { anverso: "¿Cómo se eligen los Concejales según el artículo 140 CE?", reverso: "Por los vecinos del municipio mediante sufragio universal, igual, libre, directo y secreto, en la forma establecida por la ley" },
    { anverso: "¿Qué es la provincia según el artículo 141.1 CE?", reverso: "Una entidad local con personalidad jurídica propia, determinada por la agrupación de municipios y división territorial para el cumplimiento de las actividades del Estado" },
    { anverso: "¿A quién está encomendado el gobierno y la administración autónoma de las provincias según el artículo 141.2 CE?", reverso: "A Diputaciones u otras Corporaciones de carácter representativo" },
    { anverso: "¿Qué establece el artículo 142 CE sobre las Haciendas locales?", reverso: "Que deberán disponer de los medios suficientes para el desempeño de las funciones que la ley atribuye a las Corporaciones respectivas, nutriéndose fundamentalmente de tributos propios y de participación en los del Estado y de las Comunidades Autónomas" },
    { anverso: "¿Qué administración propia tienen las islas en los archipiélagos, según el artículo 141.4 CE?", reverso: "Cabildos o Consejos" },
    { anverso: "¿Cuáles son los principios generales que rigen la organización territorial del Estado según el Capítulo I del Título VIII CE?", reverso: "La autonomía de municipios, provincias y comunidades autónomas para la gestión de sus intereses; el principio de solidaridad y equilibrio económico entre territorios; y la igualdad de derechos y obligaciones de todos los españoles en cualquier parte del territorio" },
  ].map((f) => ({ ...f, tema_slug: T41, seccion: S2_41 })),
);
console.log(`📝 preguntas de test (${S2_41})...`);
await insertarPreguntasConOpciones(T41, S2_41, [
  { enunciado: "¿En qué entidades se organiza territorialmente el Estado según el artículo 137 CE?", explicacion: "En municipios, provincias y Comunidades Autónomas.", dificultad: "facil", opciones: ["Municipios, provincias y Comunidades Autónomas", "Regiones, cantones y municipios", "Solo municipios y provincias", "Comunidades Autónomas exclusivamente"], correcta: 0 },
  { enunciado: "¿Qué principio garantiza el Estado entre las diversas partes del territorio español según el artículo 138.1 CE?", explicacion: "El principio de solidaridad.", dificultad: "media", opciones: ["El principio de solidaridad", "El principio de unidad de caja", "El principio de reserva de ley", "El principio de jerarquía normativa"], correcta: 0 },
  { enunciado: "¿Cómo se eligen los Concejales según el artículo 140 CE?", explicacion: "Por sufragio universal, igual, libre, directo y secreto.", dificultad: "facil", opciones: ["Por sufragio universal, igual, libre, directo y secreto", "Por designación del Alcalde", "Por sorteo entre los vecinos", "Por nombramiento de la Comunidad Autónoma"], correcta: 0 },
  { enunciado: "¿Qué es la provincia según el artículo 141.1 CE?", explicacion: "Una entidad local con personalidad jurídica propia, determinada por la agrupación de municipios.", dificultad: "media", opciones: ["Una entidad local con personalidad jurídica propia", "Un órgano exclusivamente estatal sin personalidad jurídica", "Una subdivisión del municipio", "Una figura suprimida por la Constitución"], correcta: 0 },
  { enunciado: "¿A quién corresponde el gobierno y la administración autónoma de las provincias según el artículo 141.2 CE?", explicacion: "A Diputaciones u otras Corporaciones de carácter representativo.", dificultad: "media", opciones: ["A Diputaciones u otras Corporaciones representativas", "Al Delegado del Gobierno", "Al Presidente de la Comunidad Autónoma", "A los Ayuntamientos exclusivamente"], correcta: 0 },
  { enunciado: "¿De qué deben nutrirse fundamentalmente las Haciendas locales según el artículo 142 CE?", explicacion: "De tributos propios y de participación en los del Estado y de las Comunidades Autónomas.", dificultad: "media", opciones: ["De tributos propios y participación en los del Estado y las CCAA", "Exclusivamente de subvenciones estatales", "De operaciones de crédito exclusivamente", "De donaciones privadas"], correcta: 0 },
  { enunciado: "¿Qué administración propia tienen las islas en los archipiélagos según el artículo 141.4 CE?", explicacion: "Cabildos o Consejos.", dificultad: "facil", opciones: ["Cabildos o Consejos", "Diputaciones Forales", "Juntas Vecinales", "Mancomunidades"], correcta: 0 },
  { enunciado: "¿Qué garantiza el artículo 139.1 CE a todos los españoles?", explicacion: "Los mismos derechos y obligaciones en cualquier parte del territorio del Estado.", dificultad: "facil", opciones: ["Los mismos derechos y obligaciones en todo el territorio", "El derecho a residir en la capital del Estado", "El derecho a un puesto de trabajo público", "El derecho a doble nacionalidad"], correcta: 0 },
]);

// Sección 3: Estatuto de Autonomía de Aragón — título preliminar y organización institucional
const S3_41 = "estatuto-autonomia-aragon-titulo-preliminar-organizacion";
console.log(`📝 flashcards (${S3_41})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Qué naturaleza atribuye el artículo 1.1 del Estatuto de Autonomía de Aragón a Aragón?", reverso: "La de nacionalidad histórica, que ejerce su autogobierno de acuerdo con el Estatuto, en ejercicio del derecho a la autonomía que la Constitución reconoce y garantiza a toda nacionalidad" },
    { anverso: "¿Qué territorio comprende la Comunidad Autónoma de Aragón según el artículo 2 EAA?", reverso: "El histórico de Aragón, integrado por los municipios, comarcas y provincias de Huesca, Teruel y Zaragoza" },
    { anverso: "¿Cuál es la capital de Aragón según el artículo 3.3 EAA?", reverso: "La ciudad de Zaragoza" },
    { anverso: "¿Cuál es la bandera de Aragón según el artículo 3.1 EAA?", reverso: "La tradicional de las cuatro barras rojas horizontales sobre fondo amarillo" },
    { anverso: "¿En qué se estructura la organización territorial de Aragón según el artículo 5 EAA?", reverso: "En municipios, comarcas y provincias" },
    { anverso: "¿Cuáles son las instituciones de la Comunidad Autónoma de Aragón según el artículo 32 EAA?", reverso: "Las Cortes de Aragón, el Presidente, el Gobierno o la Diputación General y el Justicia" },
    { anverso: "¿Qué funciones ejercen las Cortes de Aragón según el artículo 33 EAA?", reverso: "Representan al pueblo aragonés, ejercen la potestad legislativa, aprueban los presupuestos de la Comunidad Autónoma, e impulsan y controlan la acción del Gobierno de Aragón" },
    { anverso: "¿Dónde tiene su sede permanente las Cortes de Aragón según el artículo 35 EAA?", reverso: "En la ciudad de Zaragoza, en el Palacio de la Aljafería" },
    { anverso: "¿Cómo es elegido el Presidente de Aragón según el artículo 46 EAA?", reverso: "Es elegido por las Cortes de Aragón, de entre sus Diputados y Diputadas, y nombrado por el Rey" },
    { anverso: "¿Cuáles son las misiones específicas del Justicia de Aragón según el artículo 59 EAA?", reverso: "La protección y defensa de los derechos individuales y colectivos reconocidos en el Estatuto, la tutela del ordenamiento jurídico aragonés y la defensa del propio Estatuto" },
  ].map((f) => ({ ...f, tema_slug: T41, seccion: S3_41 })),
);
console.log(`📝 preguntas de test (${S3_41})...`);
await insertarPreguntasConOpciones(T41, S3_41, [
  { enunciado: "¿Qué naturaleza atribuye el Estatuto de Autonomía a Aragón en su artículo 1.1?", explicacion: "La de nacionalidad histórica.", dificultad: "facil", opciones: ["Nacionalidad histórica", "Región autónoma", "Provincia histórica", "Territorio foral"], correcta: 0 },
  { enunciado: "¿Qué provincias integran el territorio de la Comunidad Autónoma de Aragón según el artículo 2 EAA?", explicacion: "Huesca, Teruel y Zaragoza.", dificultad: "facil", opciones: ["Huesca, Teruel y Zaragoza", "Huesca, Soria y Zaragoza", "Teruel, Logroño y Zaragoza", "Huesca, Teruel y Navarra"], correcta: 0 },
  { enunciado: "¿Cuál es la capital de Aragón según el artículo 3.3 del Estatuto de Autonomía?", explicacion: "La ciudad de Zaragoza.", dificultad: "facil", opciones: ["Zaragoza", "Huesca", "Teruel", "Calatayud"], correcta: 0 },
  { enunciado: "¿En qué se estructura la organización territorial de Aragón según el artículo 5 EAA?", explicacion: "En municipios, comarcas y provincias.", dificultad: "media", opciones: ["Municipios, comarcas y provincias", "Solo municipios y provincias", "Municipios y mancomunidades", "Comarcas exclusivamente"], correcta: 0 },
  { enunciado: "¿Cuáles son las instituciones de la Comunidad Autónoma de Aragón según el artículo 32 EAA?", explicacion: "Las Cortes, el Presidente, el Gobierno (Diputación General) y el Justicia.", dificultad: "media", opciones: ["Cortes, Presidente, Gobierno y Justicia", "Cortes, Alcalde, Gobierno y Defensor del Pueblo", "Presidente, Senado, Gobierno y Justicia", "Cortes, Presidente y Tribunal Superior únicamente"], correcta: 0 },
  { enunciado: "¿Dónde tiene su sede permanente las Cortes de Aragón según el artículo 35 EAA?", explicacion: "En el Palacio de la Aljafería, en Zaragoza.", dificultad: "media", opciones: ["Palacio de la Aljafería, Zaragoza", "Palacio de los Sitios, Huesca", "Palacio Episcopal, Teruel", "Ayuntamiento de Zaragoza"], correcta: 0 },
  { enunciado: "¿Cómo es elegido el Presidente de Aragón según el artículo 46 EAA?", explicacion: "Es elegido por las Cortes de Aragón, de entre sus Diputados, y nombrado por el Rey.", dificultad: "media", opciones: ["Elegido por las Cortes de Aragón y nombrado por el Rey", "Elegido por sufragio universal directo", "Designado por el Gobierno de España", "Elegido por los alcaldes de la Comunidad"], correcta: 0 },
  { enunciado: "¿Cuál de las siguientes es una misión específica del Justicia de Aragón según el artículo 59 EAA?", explicacion: "La protección y defensa de los derechos individuales y colectivos reconocidos en el Estatuto.", dificultad: "media", opciones: ["La protección y defensa de los derechos reconocidos en el Estatuto", "La aprobación de los Presupuestos de la Comunidad", "El nombramiento del Presidente de Aragón", "La potestad legislativa exclusiva"], correcta: 0 },
]);

// Sección 4: LPACAP — disposiciones sobre el procedimiento administrativo común
const S4_41 = "lpacap-disposiciones-procedimiento-administrativo-comun";
console.log(`📝 flashcards (${S4_41})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Qué garantiza el artículo 53 de la Ley 39/2015 a los interesados en el procedimiento administrativo?", reverso: "Una serie de derechos, entre ellos: a conocer el estado de tramitación, a identificar a las autoridades y personal que tramiten el procedimiento, a no presentar documentos ya aportados, y a formular alegaciones en cualquier momento anterior al trámite de audiencia" },
    { anverso: "¿Qué requisitos debe cumplir todo acto administrativo según el artículo 34 LPACAP (referenciado desde las disposiciones generales)?", reverso: "Debe producirse por el órgano competente ajustándose al procedimiento establecido" },
    { anverso: "¿Qué principios deben respetarse en el ejercicio de la potestad sancionadora según el artículo 129 LPACAP?", reverso: "Los principios de legalidad, tipicidad, irretroactividad de las disposiciones sancionadoras no favorables, proporcionalidad y culpabilidad" },
    { anverso: "¿Qué establece el artículo 133 LPACAP sobre la información pública en los procedimientos de elaboración de normas?", reverso: "Que con carácter previo a la elaboración de un proyecto o anteproyecto de ley o de reglamento, se sustanciará una consulta pública a través del portal web de la Administración competente" },
    { anverso: "¿Cuáles son las fases ordinarias del procedimiento administrativo común?", reverso: "Iniciación, ordenación, instrucción y terminación" },
    { anverso: "¿Cómo puede iniciarse el procedimiento administrativo?", reverso: "De oficio, por acuerdo del órgano competente, o a solicitud del interesado" },
    { anverso: "¿Cuál es la forma normal de terminación del procedimiento administrativo?", reverso: "La resolución, sin perjuicio de otras formas como el desistimiento, la renuncia al derecho, la declaración de caducidad o la imposibilidad material de continuarlo" },
    { anverso: "¿Qué principio rige el impulso del procedimiento administrativo según sus normas de ordenación?", reverso: "El principio de impulso de oficio en todos sus trámites, sin perjuicio de la actividad de los interesados" },
    { anverso: "¿A qué está sujeto el ejercicio de la potestad de autoorganización de las Administraciones Públicas?", reverso: "A los principios de eficacia, jerarquía, descentralización, desconcentración y coordinación, con sometimiento pleno a la ley y al Derecho, conforme al artículo 103 CE" },
    { anverso: "¿Qué establece la LPACAP sobre los plazos en el procedimiento administrativo?", reverso: "Que los términos y plazos establecidos obligan a las autoridades y personal al servicio de las Administraciones Públicas competentes para la tramitación de los asuntos, así como a los interesados" },
  ].map((f) => ({ ...f, tema_slug: T41, seccion: S4_41 })),
);
console.log(`📝 preguntas de test (${S4_41})...`);
await insertarPreguntasConOpciones(T41, S4_41, [
  { enunciado: "¿Qué establece el artículo 53 de la Ley 39/2015 respecto de los interesados en el procedimiento?", explicacion: "Reconoce una serie de derechos, entre ellos conocer el estado de tramitación y no presentar documentos ya aportados.", dificultad: "media", opciones: ["Reconoce derechos de los interesados en el procedimiento", "Regula únicamente el silencio administrativo", "Regula exclusivamente los recursos administrativos", "Se refiere solo a la Administración electrónica"], correcta: 0 },
  { enunciado: "¿Qué principios deben respetarse en el ejercicio de la potestad sancionadora según el artículo 129 LPACAP?", explicacion: "Legalidad, tipicidad, irretroactividad, proporcionalidad y culpabilidad.", dificultad: "media", opciones: ["Legalidad, tipicidad, irretroactividad, proporcionalidad y culpabilidad", "Jerarquía, coordinación y economía procesal exclusivamente", "Publicidad y transparencia exclusivamente", "Confianza legítima exclusivamente"], correcta: 0 },
  { enunciado: "¿Cuáles son las fases ordinarias del procedimiento administrativo común?", explicacion: "Iniciación, ordenación, instrucción y terminación.", dificultad: "facil", opciones: ["Iniciación, ordenación, instrucción y terminación", "Alegación, prueba y sentencia", "Notificación, recurso y ejecución", "Consulta, dictamen y aprobación"], correcta: 0 },
  { enunciado: "¿De qué formas puede iniciarse el procedimiento administrativo?", explicacion: "De oficio o a solicitud del interesado.", dificultad: "facil", opciones: ["De oficio o a solicitud del interesado", "Solo de oficio", "Solo a solicitud del interesado", "Únicamente por mandato judicial"], correcta: 0 },
  { enunciado: "¿Cuál es la forma normal de terminación del procedimiento administrativo?", explicacion: "La resolución.", dificultad: "facil", opciones: ["La resolución", "La caducidad exclusivamente", "El silencio administrativo exclusivamente", "El desistimiento exclusivamente"], correcta: 0 },
  { enunciado: "¿Qué principio rige el impulso de los trámites en el procedimiento administrativo?", explicacion: "El principio de impulso de oficio.", dificultad: "media", opciones: ["El impulso de oficio", "El impulso exclusivo a instancia de parte", "La suspensión automática", "El silencio positivo generalizado"], correcta: 0 },
  { enunciado: "¿Qué prevé el artículo 133 LPACAP sobre la elaboración de normas con carácter general?", explicacion: "La sustanciación de una consulta pública previa a través del portal web de la Administración competente.", dificultad: "media", opciones: ["Una consulta pública previa a través del portal web", "La aprobación directa sin trámite alguno", "Un referéndum vinculante", "La intervención exclusiva del Consejo de Estado"], correcta: 0 },
  { enunciado: "¿A quién obligan los términos y plazos establecidos en el procedimiento administrativo?", explicacion: "A las autoridades y personal al servicio de las Administraciones Públicas y a los interesados.", dificultad: "media", opciones: ["A las autoridades, al personal y a los interesados", "Únicamente a los interesados", "Únicamente a los funcionarios", "A nadie, tienen carácter meramente orientativo"], correcta: 0 },
]);

console.log(`✅ ${T41} creado (4 secciones, 40 flashcards + 32 preguntas).`);

// ─────────────────────────────────────────────────────────────────────────
// TEMA 42 — La Ley de capitalidad de Zaragoza y la Ley reguladora de las
// Haciendas Locales
// ─────────────────────────────────────────────────────────────────────────
const T42 = "tema-42";
console.log(`\n📚 Creando ${T42}...`);
await insertar("temas", [
  {
    slug: T42,
    titulo: "La Ley de régimen especial del municipio de Zaragoza y la Ley reguladora de las Haciendas Locales",
    descripcion:
      "La Ley de régimen especial del municipio de Zaragoza como capital de Aragón: disposiciones generales, gobierno y administración del municipio de Zaragoza. La Ley reguladora de las Haciendas Locales: enumeración de los recursos de las entidades locales y regulación de los impuestos municipales.",
    contenido:
      "Desarrolla las especialidades organizativas del municipio de Zaragoza como capital de Aragón (Ley 10/2017), en particular las disposiciones generales y los órganos de gobierno y administración municipal (Pleno, Alcalde y Gobierno de Zaragoza), junto con los recursos de las entidades locales y los impuestos municipales regulados en la Ley reguladora de las Haciendas Locales.",
    enlaces_boe: [
      { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2018-1683", titulo: "Ley 10/2017, de régimen especial del municipio de Zaragoza como capital de Aragón" },
      { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2004-4214", titulo: "Ley reguladora de las Haciendas Locales" },
    ],
    indice_estudio: [
      { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2018-1683", titulo: "Ley de capitalidad de Zaragoza: disposiciones generales", seccion: "ley-capitalidad-zaragoza-disposiciones-generales", articulos: "Cap. I (arts. 1-6)" },
      { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2018-1683", titulo: "Gobierno y administración del municipio de Zaragoza", seccion: "gobierno-administracion-municipio-zaragoza", articulos: "Cap. II (arts. 7-18)" },
      { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2004-4214", titulo: "Haciendas Locales: recursos de las entidades locales e impuestos municipales", seccion: "haciendas-locales-recursos-impuestos-municipales", articulos: "Arts. 2, 59-60 y ss." },
    ],
  },
]);

const S1_42 = "ley-capitalidad-zaragoza-disposiciones-generales";
console.log(`📝 flashcards (${S1_42})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Cuál es el objeto de la Ley 10/2017, de régimen especial del municipio de Zaragoza, según su artículo 1?", reverso: "Establecer el régimen especial del que goza el municipio de Zaragoza, en su condición de capital de la Comunidad Autónoma de Aragón" },
    { anverso: "¿Qué capacidad y personalidad tiene el municipio de Zaragoza según el artículo 2 de la Ley 10/2017?", reverso: "Goza de personalidad jurídica propia, plena capacidad de obrar y potestades suficientes para ordenar y gestionar los asuntos de interés público que afecten a sus ciudadanos" },
    { anverso: "¿A quién corresponde alterar el término municipal de Zaragoza según el artículo 3 de la Ley 10/2017?", reverso: "Al Gobierno de Aragón, de acuerdo con el procedimiento establecido en la legislación de régimen local, sin perjuicio de las competencias municipales en cuanto a su delimitación y modificación" },
    { anverso: "¿Qué legitimación procesal especial tiene el municipio de Zaragoza según el artículo 4 de la Ley 10/2017?", reverso: "Legitimación para plantear conflictos en defensa de la autonomía local contra disposiciones con rango de ley del Estado y de la Comunidad Autónoma de Aragón que la lesionen, así como para promover su impugnación ante el Tribunal Constitucional" },
    { anverso: "¿Qué títulos honoríficos ostenta la ciudad de Zaragoza según el artículo 6 de la Ley 10/2017?", reverso: "Muy Noble, Muy Leal, Muy Heroica, Siempre Heroica, Muy Benéfica e Inmortal; además del título de \"Sitio Emblemático de la Cultura de Paz\" otorgado por la UNESCO" },
    { anverso: "¿Qué preceptúa el artículo 87 del Estatuto de Autonomía de Aragón respecto de Zaragoza?", reverso: "Que Zaragoza, como capital de Aragón, dispondrá de un régimen especial establecido por Ley de Cortes de Aragón" },
    { anverso: "¿Cuál es el título habitual con el que se hace referencia a la ciudad de Zaragoza, salvo en documentos solemnes?", reverso: "El título de \"Inmortal\"" },
    { anverso: "¿Qué promueven conjuntamente el Ayuntamiento de Zaragoza y el Gobierno de Aragón según el artículo 5 de la Ley 10/2017?", reverso: "Actividades de interés común con otras ciudades, en especial las próximas, con las demás Administraciones Públicas y con instituciones internacionales en el ámbito de sus competencias" },
  ].map((f) => ({ ...f, tema_slug: T42, seccion: S1_42 })),
);
console.log(`📝 preguntas de test (${S1_42})...`);
await insertarPreguntasConOpciones(T42, S1_42, [
  { enunciado: "¿Cuál es el objeto de la Ley 10/2017, de régimen especial del municipio de Zaragoza, según su artículo 1?", explicacion: "Establecer el régimen especial del municipio de Zaragoza como capital de Aragón.", dificultad: "facil", opciones: ["Establecer el régimen especial del municipio de Zaragoza como capital de Aragón", "Regular el régimen electoral general", "Aprobar el presupuesto de la Comunidad Autónoma", "Crear la Policía Local de Zaragoza"], correcta: 0 },
  { enunciado: "¿Qué capacidad reconoce el artículo 2 de la Ley 10/2017 al municipio de Zaragoza?", explicacion: "Personalidad jurídica propia, plena capacidad de obrar y potestades suficientes.", dificultad: "media", opciones: ["Personalidad jurídica propia y plena capacidad de obrar", "Personalidad jurídica limitada y capacidad de obrar restringida", "Ninguna personalidad jurídica propia", "Solo capacidad para actuar en materia tributaria"], correcta: 0 },
  { enunciado: "¿A quién corresponde alterar el término municipal de Zaragoza según el artículo 3 de la Ley 10/2017?", explicacion: "Al Gobierno de Aragón, de acuerdo con el procedimiento de la legislación de régimen local.", dificultad: "media", opciones: ["Al Gobierno de Aragón", "Al Gobierno de España", "Al Pleno del Ayuntamiento exclusivamente", "A las Cortes Generales"], correcta: 0 },
  { enunciado: "¿Qué legitimación reconoce el artículo 4 de la Ley 10/2017 al municipio de Zaragoza?", explicacion: "Legitimación para plantear conflictos en defensa de la autonomía local y promover su impugnación ante el Tribunal Constitucional.", dificultad: "media", opciones: ["Legitimación para defender su autonomía local ante el Tribunal Constitucional", "Legitimación para legislar en materia penal", "Legitimación para modificar la Constitución", "Legitimación para disolver las Cortes de Aragón"], correcta: 0 },
  { enunciado: "¿Cuál de los siguientes es uno de los títulos honoríficos de la ciudad de Zaragoza según el artículo 6 de la Ley 10/2017?", explicacion: "Entre otros, Muy Noble, Muy Leal, Muy Heroica e Inmortal.", dificultad: "facil", opciones: ["Inmortal", "Fidelísima", "Excelentísima únicamente", "Imperial"], correcta: 0 },
  { enunciado: "¿Qué precepto del Estatuto de Autonomía de Aragón dispone que Zaragoza tendrá un régimen especial?", explicacion: "El artículo 87 EAA.", dificultad: "media", opciones: ["El artículo 87 del Estatuto de Autonomía de Aragón", "El artículo 3 de la Constitución", "El artículo 140 de la Constitución", "El artículo 1 de la Ley de Bases del Régimen Local"], correcta: 0 },
  { enunciado: "¿Qué título habitual se utiliza para referirse a la ciudad de Zaragoza, salvo en documentos solemnes?", explicacion: "El título de Inmortal.", dificultad: "facil", opciones: ["Inmortal", "Muy Noble", "Siempre Heroica", "Muy Benéfica"], correcta: 0 },
  { enunciado: "¿Qué tipo de actividades promueven conjuntamente el Ayuntamiento de Zaragoza y el Gobierno de Aragón según el artículo 5 de la Ley 10/2017?", explicacion: "Actividades de interés común con otras ciudades, Administraciones e instituciones internacionales.", dificultad: "media", opciones: ["Actividades de interés común con otras ciudades e instituciones", "Actividades exclusivamente deportivas", "Actividades exclusivamente militares", "Actividades exclusivamente religiosas"], correcta: 0 },
]);

const S2_42 = "gobierno-administracion-municipio-zaragoza";
console.log(`📝 flashcards (${S2_42})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿A quién corresponden el gobierno y la administración del municipio de Zaragoza según el artículo 7 de la Ley 10/2017?", reverso: "A su Ayuntamiento, integrado por el Alcalde y los Concejales" },
    { anverso: "¿Cuáles son los órganos de gobierno y administración del Ayuntamiento de Zaragoza según el artículo 8 de la Ley 10/2017?", reverso: "El Pleno; los órganos ejecutivos de dirección política y administrativa (Alcalde, Gobierno de Zaragoza, Vicealcalde, Tenientes de Alcalde y Concejales con responsabilidades de gobierno); y los órganos directivos" },
    { anverso: "¿Qué es el Pleno del Ayuntamiento de Zaragoza según el artículo 8 de la Ley 10/2017?", reverso: "El órgano de máxima representación política de los ciudadanos de Zaragoza, integrado por el Alcalde y los Concejales" },
    { anverso: "¿Cuál es una de las atribuciones del Pleno según el artículo 11 de la Ley 10/2017?", reverso: "El control y la fiscalización de los órganos de gobierno y administración municipales" },
    { anverso: "¿Qué representa el Alcalde según el artículo 12 de la Ley 10/2017?", reverso: "Dirige la acción del Gobierno de Zaragoza y de los demás órganos ejecutivos, ostenta la máxima representación del Municipio y responde de su gestión política ante el Pleno" },
    { anverso: "¿Qué órgano es el Gobierno de Zaragoza según el artículo 13 de la Ley 10/2017?", reverso: "El órgano colegiado ejecutivo de dirección política y administrativa, bajo la dirección y presidencia del Alcalde, que ejerce las funciones ejecutivas y administrativas" },
    { anverso: "¿Cuál es el límite numérico de los miembros del Gobierno de Zaragoza según el artículo 13.2 de la Ley 10/2017?", reverso: "No podrá exceder de un tercio del número legal de miembros del Pleno, además del Alcalde" },
    { anverso: "¿Qué es el Consejo Bilateral de Capitalidad según el artículo 20 de la Ley 10/2017?", reverso: "Un órgano colegiado de carácter permanente que tiene por objeto la coordinación y colaboración entre el Gobierno de Aragón y el Ayuntamiento de Zaragoza" },
    { anverso: "¿Qué son los grupos municipales según el artículo 15 de la Ley 10/2017?", reverso: "Los constituidos conforme al Reglamento orgánico, que pueden formular directrices, orientaciones y recomendaciones; cada uno designa un portavoz" },
    { anverso: "¿Cómo se denomina en la Ley 10/2017 a lo que antes se conocía como Junta de Gobierno Local?", reverso: "Gobierno de Zaragoza (disposición adicional segunda de la Ley 10/2017)" },
  ].map((f) => ({ ...f, tema_slug: T42, seccion: S2_42 })),
);
console.log(`📝 preguntas de test (${S2_42})...`);
await insertarPreguntasConOpciones(T42, S2_42, [
  { enunciado: "¿A quién corresponden el gobierno y la administración del municipio de Zaragoza según el artículo 7 de la Ley 10/2017?", explicacion: "A su Ayuntamiento, integrado por el Alcalde y los Concejales.", dificultad: "facil", opciones: ["Al Ayuntamiento, integrado por Alcalde y Concejales", "Al Gobierno de Aragón", "A la Diputación Provincial de Zaragoza", "Al Justicia de Aragón"], correcta: 0 },
  { enunciado: "¿Cuáles son los órganos de gobierno y administración del Ayuntamiento de Zaragoza según el artículo 8 de la Ley 10/2017?", explicacion: "El Pleno, los órganos ejecutivos de dirección política y administrativa, y los órganos directivos.", dificultad: "media", opciones: ["El Pleno, los órganos ejecutivos y los órganos directivos", "Únicamente el Alcalde", "Únicamente el Pleno", "El Justicia y el Consejo Consultivo"], correcta: 0 },
  { enunciado: "¿Qué es el Pleno del Ayuntamiento de Zaragoza según el artículo 8 de la Ley 10/2017?", explicacion: "El órgano de máxima representación política de los ciudadanos de Zaragoza.", dificultad: "facil", opciones: ["El órgano de máxima representación política de los ciudadanos", "Un órgano meramente consultivo", "Un órgano de designación del Gobierno de Aragón", "Un órgano judicial municipal"], correcta: 0 },
  { enunciado: "¿Cuál de las siguientes es una atribución del Pleno según el artículo 11 de la Ley 10/2017?", explicacion: "El control y la fiscalización de los órganos de gobierno y administración municipales.", dificultad: "media", opciones: ["El control y la fiscalización de los órganos de gobierno municipales", "El nombramiento directo de los Delegados de Prevención", "La imposición de sanciones penales", "La aprobación de tratados internacionales"], correcta: 0 },
  { enunciado: "¿Ante quién responde el Alcalde de su gestión política según el artículo 12 de la Ley 10/2017?", explicacion: "Ante el Pleno.", dificultad: "facil", opciones: ["Ante el Pleno", "Ante el Gobierno de Aragón", "Ante el Justicia de Aragón", "Ante el Tribunal Superior de Justicia de Aragón"], correcta: 0 },
  { enunciado: "¿Qué es el Gobierno de Zaragoza según el artículo 13 de la Ley 10/2017?", explicacion: "El órgano colegiado ejecutivo de dirección política y administrativa, bajo la presidencia del Alcalde.", dificultad: "media", opciones: ["El órgano colegiado ejecutivo bajo la presidencia del Alcalde", "El antiguo nombre del Pleno", "Un órgano de la Comunidad Autónoma de Aragón", "El órgano judicial municipal"], correcta: 0 },
  { enunciado: "¿Cuál es el límite numérico de los miembros del Gobierno de Zaragoza según el artículo 13.2 de la Ley 10/2017?", explicacion: "No podrá exceder de un tercio del número legal de miembros del Pleno, además del Alcalde.", dificultad: "media", opciones: ["Un tercio del número legal de miembros del Pleno", "La mitad del número legal de miembros del Pleno", "Un cuarto del número legal de miembros del Pleno", "No existe límite legal"], correcta: 0 },
  { enunciado: "¿Cómo se denomina en la Ley 10/2017 a lo que antes se conocía como Junta de Gobierno Local?", explicacion: "Gobierno de Zaragoza, según la disposición adicional segunda de la Ley 10/2017.", dificultad: "media", opciones: ["Gobierno de Zaragoza", "Comisión de Gobierno", "Consejo Ejecutivo Municipal", "Junta de Portavoces"], correcta: 0 },
]);

const S3_42 = "haciendas-locales-recursos-impuestos-municipales";
console.log(`📝 flashcards (${S3_42})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Cuáles son, con carácter general, los recursos de las Haciendas locales según la Ley reguladora de las Haciendas Locales?", reverso: "Los ingresos de derecho privado; los tributos propios (tasas, contribuciones especiales e impuestos) y los recargos exigibles sobre impuestos de las Comunidades Autónomas o de otras entidades locales; las participaciones en los tributos del Estado y de las Comunidades Autónomas; las subvenciones; los percibidos en concepto de precios públicos; el producto de operaciones de crédito; el producto de multas y sanciones; y las demás prestaciones de derecho público" },
    { anverso: "¿Cuáles son los dos impuestos municipales de exacción obligatoria según la Ley reguladora de las Haciendas Locales?", reverso: "El Impuesto sobre Bienes Inmuebles (IBI) y el Impuesto sobre Actividades Económicas (IAE)" },
    { anverso: "¿Cuáles son los impuestos municipales de exacción potestativa (voluntaria)?", reverso: "El Impuesto sobre Vehículos de Tracción Mecánica (IVTM), el Impuesto sobre Construcciones, Instalaciones y Obras (ICIO) y el Impuesto sobre el Incremento de Valor de los Terrenos de Naturaleza Urbana (IIVTNU o \"plusvalía municipal\")" },
    { anverso: "¿Qué grava el Impuesto sobre Bienes Inmuebles (IBI)?", reverso: "La titularidad de determinados derechos sobre bienes inmuebles rústicos y urbanos, fundamentalmente la propiedad" },
    { anverso: "¿Qué grava el Impuesto sobre Actividades Económicas (IAE)?", reverso: "El mero ejercicio, en territorio nacional, de actividades empresariales, profesionales o artísticas, se ejerzan o no en local determinado" },
    { anverso: "¿Qué grava el Impuesto sobre Construcciones, Instalaciones y Obras (ICIO)?", reverso: "La realización de cualquier construcción, instalación u obra para la que se exija obtención de licencia de obras o urbanística" },
    { anverso: "¿Qué grava el Impuesto sobre el Incremento de Valor de los Terrenos de Naturaleza Urbana (plusvalía municipal)?", reverso: "El incremento de valor que experimenten los terrenos urbanos y se ponga de manifiesto a consecuencia de su transmisión o de la constitución o transmisión de un derecho real de goce sobre los mismos" },
    { anverso: "¿Qué son las tasas como recurso de las entidades locales?", reverso: "Tributos exigibles por la prestación de servicios públicos o la realización de actividades administrativas de competencia local que se refieran, afecten o beneficien de modo particular al sujeto pasivo" },
    { anverso: "¿Qué son las contribuciones especiales?", reverso: "Tributos cuyo hecho imponible consiste en la obtención por el sujeto pasivo de un beneficio o de un aumento de valor de sus bienes como consecuencia de la realización de obras públicas o del establecimiento o ampliación de servicios públicos" },
    { anverso: "¿A qué entidad corresponde la gestión, liquidación, recaudación e inspección de los impuestos municipales?", reverso: "A cada Ayuntamiento, sin perjuicio de las fórmulas de colaboración con otras Administraciones (por ejemplo, la Diputación Provincial) que puedan establecerse" },
  ].map((f) => ({ ...f, tema_slug: T42, seccion: S3_42 })),
);
console.log(`📝 preguntas de test (${S3_42})...`);
await insertarPreguntasConOpciones(T42, S3_42, [
  { enunciado: "¿Cuáles son los dos impuestos municipales de exacción obligatoria?", explicacion: "El IBI y el IAE.", dificultad: "media", opciones: ["El IBI y el IAE", "El IVTM y el ICIO", "El ICIO y la plusvalía municipal", "El IAE y el IVTM"], correcta: 0 },
  { enunciado: "¿Cuál de los siguientes es un impuesto municipal de exacción potestativa?", explicacion: "El Impuesto sobre Vehículos de Tracción Mecánica (IVTM) es potestativo.", dificultad: "media", opciones: ["El Impuesto sobre Vehículos de Tracción Mecánica", "El Impuesto sobre Bienes Inmuebles", "El Impuesto sobre Actividades Económicas", "Ninguno, todos son obligatorios"], correcta: 0 },
  { enunciado: "¿Qué grava el Impuesto sobre Bienes Inmuebles (IBI)?", explicacion: "La titularidad de determinados derechos sobre bienes inmuebles rústicos y urbanos.", dificultad: "facil", opciones: ["La titularidad de derechos sobre bienes inmuebles", "El ejercicio de actividades económicas", "La circulación de vehículos", "La realización de obras"], correcta: 0 },
  { enunciado: "¿Qué grava el Impuesto sobre Actividades Económicas (IAE)?", explicacion: "El mero ejercicio de actividades empresariales, profesionales o artísticas.", dificultad: "media", opciones: ["El ejercicio de actividades empresariales, profesionales o artísticas", "La titularidad de vehículos", "La realización de obras", "La transmisión de terrenos"], correcta: 0 },
  { enunciado: "¿Qué grava el Impuesto sobre Construcciones, Instalaciones y Obras (ICIO)?", explicacion: "La realización de construcciones, instalaciones u obras sujetas a licencia.", dificultad: "media", opciones: ["La realización de construcciones, instalaciones u obras", "La titularidad de inmuebles", "El ejercicio de actividades económicas", "La circulación de vehículos"], correcta: 0 },
  { enunciado: "¿Qué grava la conocida como \"plusvalía municipal\" (IIVTNU)?", explicacion: "El incremento de valor de los terrenos urbanos puesto de manifiesto por su transmisión.", dificultad: "media", opciones: ["El incremento de valor de los terrenos urbanos por su transmisión", "El valor catastral de los inmuebles rústicos", "La renta obtenida por el ejercicio de actividades", "El consumo de agua potable"], correcta: 0 },
  { enunciado: "¿Qué son las tasas como recurso de las entidades locales?", explicacion: "Tributos exigibles por la prestación de servicios o actividades que beneficien de modo particular al sujeto pasivo.", dificultad: "media", opciones: ["Tributos por la prestación de servicios que benefician al sujeto pasivo", "Subvenciones estatales incondicionadas", "Ingresos de derecho privado", "Operaciones de crédito"], correcta: 0 },
  { enunciado: "¿Qué son las contribuciones especiales?", explicacion: "Tributos por el beneficio obtenido a consecuencia de obras públicas o de servicios públicos.", dificultad: "media", opciones: ["Tributos por el beneficio obtenido de obras o servicios públicos", "Impuestos sobre la renta municipal", "Sanciones administrativas", "Precios públicos"], correcta: 0 },
]);

console.log(`✅ ${T42} creado (3 secciones, 30 flashcards + 24 preguntas).`);

// ─────────────────────────────────────────────────────────────────────────
// TEMA 43 — Los empleados públicos: clases, derechos y deberes,
// adquisición y pérdida, régimen disciplinario y función pública local
// ─────────────────────────────────────────────────────────────────────────
const T43 = "tema-43";
console.log(`\n📚 Creando ${T43}...`);
await insertar("temas", [
  {
    slug: T43,
    titulo: "Los empleados públicos: clases, derechos y deberes, adquisición y pérdida de la relación de servicio, régimen disciplinario y función pública local",
    descripcion:
      "Los empleados públicos: clases. Derechos y deberes. Adquisición y pérdida de la relación de servicio, situaciones administrativas y régimen disciplinario. Peculiaridades del régimen de los empleados públicos de las entidades locales. Estructura de la función pública local.",
    contenido:
      "Desarrolla el régimen jurídico de los empleados públicos conforme al Estatuto Básico del Empleado Público (RDL 5/2015): sus clases (funcionarios de carrera e interinos, personal laboral y personal eventual), sus derechos y deberes, la adquisición y pérdida de la condición de funcionario, y el régimen disciplinario, con atención a las peculiaridades de los empleados públicos de las entidades locales y a la estructura de la función pública local.",
    enlaces_boe: [
      { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11719", titulo: "RDL 5/2015, texto refundido del Estatuto Básico del Empleado Público" },
      { url: "https://www.boe.es/buscar/act.php?id=BOE-A-1985-5392", titulo: "Ley 7/1985, Reguladora de las Bases del Régimen Local" },
    ],
    indice_estudio: [
      { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11719", titulo: "Clases de empleados públicos, derechos y deberes", seccion: "clases-empleados-publicos-derechos-deberes", articulos: "Arts. 8-15, 52-54" },
      { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11719", titulo: "Adquisición y pérdida de la relación de servicio", seccion: "adquisicion-perdida-relacion-servicio", articulos: "Arts. 55-68" },
      { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11719", titulo: "Régimen disciplinario", seccion: "regimen-disciplinario-empleados-publicos", articulos: "Arts. 93-98" },
      { url: "https://www.boe.es/buscar/act.php?id=BOE-A-1985-5392", titulo: "Peculiaridades de los empleados públicos locales y estructura de la función pública local", seccion: "peculiaridades-funcion-publica-local", articulos: "Art. 3 EBEP; LRBRL" },
    ],
  },
]);

const S1_43 = "clases-empleados-publicos-derechos-deberes";
console.log(`📝 flashcards (${S1_43})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Quiénes son empleados públicos según el artículo 8 EBEP?", reverso: "Quienes desempeñan funciones retribuidas en las Administraciones Públicas al servicio de los intereses generales" },
    { anverso: "¿En cuántas clases se clasifican los empleados públicos según el artículo 8.2 EBEP?", reverso: "En cuatro: funcionarios de carrera, funcionarios interinos, personal laboral (fijo, por tiempo indefinido o temporal) y personal eventual" },
    { anverso: "¿Qué son los funcionarios de carrera según el artículo 9 EBEP?", reverso: "Quienes, en virtud de nombramiento legal, están vinculados a una Administración Pública por una relación estatutaria regulada por el Derecho Administrativo para el desempeño de servicios profesionales retribuidos de carácter permanente" },
    { anverso: "¿Qué son los funcionarios interinos según el artículo 10 EBEP?", reverso: "Los que, por razones de necesidad y urgencia justificadas, son nombrados con carácter temporal para desempeñar funciones propias de funcionarios de carrera" },
    { anverso: "¿Qué es el personal eventual según el artículo 12 EBEP?", reverso: "El que, en virtud de nombramiento y con carácter no permanente, sólo realiza funciones expresamente calificadas de confianza o asesoramiento especial, retribuido con cargo a los créditos presupuestarios consignados para este fin" },
    { anverso: "¿Qué derecho individual reconoce el artículo 14.a) EBEP a los funcionarios de carrera?", reverso: "El derecho a la inamovilidad en la condición de funcionario de carrera" },
    { anverso: "¿Qué derechos reconoce el artículo 15 EBEP como \"derechos individuales ejercidos colectivamente\"?", reverso: "La libertad sindical, la negociación colectiva, el ejercicio de la huelga, el planteamiento de conflictos colectivos y el derecho de reunión" },
    { anverso: "¿Cuáles son los principios que, según el artículo 52 EBEP, inspiran el Código de Conducta de los empleados públicos?", reverso: "Objetividad, integridad, neutralidad, responsabilidad, imparcialidad, confidencialidad, dedicación al servicio público, transparencia, ejemplaridad, austeridad, accesibilidad, eficacia, honradez, promoción del entorno cultural y medioambiental, y respeto a la igualdad entre mujeres y hombres" },
    { anverso: "¿En qué se divide el Código de Conducta de los empleados públicos según el capítulo VI del título III EBEP?", reverso: "En principios éticos (art. 53) y principios de conducta (art. 54)" },
    { anverso: "¿Qué establece el artículo 54.2 EBEP sobre el desempeño de las tareas del puesto de trabajo?", reverso: "Que se realizará de forma diligente y cumpliendo la jornada y el horario establecidos" },
  ].map((f) => ({ ...f, tema_slug: T43, seccion: S1_43 })),
);
console.log(`📝 preguntas de test (${S1_43})...`);
await insertarPreguntasConOpciones(T43, S1_43, [
  { enunciado: "¿Quiénes son empleados públicos según el artículo 8 EBEP?", explicacion: "Quienes desempeñan funciones retribuidas en las Administraciones Públicas al servicio de los intereses generales.", dificultad: "facil", opciones: ["Quienes desempeñan funciones retribuidas al servicio de los intereses generales", "Solo los funcionarios de carrera", "Solo el personal laboral", "Cualquier ciudadano mayor de edad"], correcta: 0 },
  { enunciado: "¿En cuántas clases se clasifican los empleados públicos según el artículo 8.2 EBEP?", explicacion: "En cuatro: funcionarios de carrera, funcionarios interinos, personal laboral y personal eventual.", dificultad: "facil", opciones: ["Cuatro clases", "Dos clases", "Tres clases", "Cinco clases"], correcta: 0 },
  { enunciado: "¿Qué caracteriza a los funcionarios de carrera según el artículo 9 EBEP?", explicacion: "Vinculación estatutaria permanente mediante nombramiento legal.", dificultad: "media", opciones: ["Relación estatutaria permanente por nombramiento legal", "Contrato laboral temporal", "Nombramiento de confianza política", "Relación mercantil"], correcta: 0 },
  { enunciado: "¿Qué caracteriza a los funcionarios interinos según el artículo 10 EBEP?", explicacion: "Nombramiento temporal por razones de necesidad y urgencia para funciones propias de funcionarios de carrera.", dificultad: "media", opciones: ["Nombramiento temporal por necesidad y urgencia", "Vinculación permanente e inamovible", "Funciones de confianza política exclusivamente", "Contrato mercantil de servicios"], correcta: 0 },
  { enunciado: "¿Qué caracteriza al personal eventual según el artículo 12 EBEP?", explicacion: "Nombramiento no permanente para funciones de confianza o asesoramiento especial.", dificultad: "media", opciones: ["Funciones de confianza o asesoramiento especial, no permanente", "Vinculación estatutaria permanente", "Selección mediante oposición libre", "Acceso mediante concurso de méritos"], correcta: 0 },
  { enunciado: "¿Cuál es uno de los derechos individuales reconocidos a los funcionarios de carrera por el artículo 14 EBEP?", explicacion: "La inamovilidad en la condición de funcionario de carrera.", dificultad: "facil", opciones: ["La inamovilidad en la condición de funcionario de carrera", "El derecho a la doble nacionalidad", "El derecho a la vivienda gratuita", "El derecho a elegir destino sin concurso"], correcta: 0 },
  { enunciado: "¿Cuál de los siguientes es un derecho individual ejercido colectivamente según el artículo 15 EBEP?", explicacion: "El derecho a la huelga.", dificultad: "media", opciones: ["El derecho a la huelga", "El derecho a la inamovilidad", "El derecho a la formación continua", "El derecho a la protección de la salud"], correcta: 0 },
  { enunciado: "¿En qué dos grupos de principios se estructura el Código de Conducta de los empleados públicos según el capítulo VI del título III EBEP?", explicacion: "Principios éticos y principios de conducta.", dificultad: "media", opciones: ["Principios éticos y principios de conducta", "Principios de eficacia y de jerarquía", "Principios de legalidad y de tipicidad", "Principios de mérito y capacidad"], correcta: 0 },
]);

const S2_43 = "adquisicion-perdida-relacion-servicio";
console.log(`📝 flashcards (${S2_43})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Qué principios rectores rigen el acceso al empleo público según el artículo 55 EBEP?", reverso: "Igualdad, mérito y capacidad, junto con publicidad de las convocatorias, transparencia, imparcialidad y profesionalidad de los órganos de selección" },
    { anverso: "¿Cuáles son los requisitos generales para participar en procesos selectivos según el artículo 56 EBEP?", reverso: "Tener nacionalidad española (salvo excepciones), poseer capacidad funcional, tener cumplidos 16 años y no exceder la edad de jubilación forzosa, no haber sido separado mediante expediente disciplinario ni estar inhabilitado, y poseer la titulación exigida" },
    { anverso: "¿Qué porcentaje mínimo de vacantes debe reservarse en las ofertas de empleo público para personas con discapacidad, según el artículo 59 EBEP?", reverso: "Un cupo no inferior al siete por ciento" },
    { anverso: "¿Cuáles son los sistemas selectivos de funcionarios de carrera según el artículo 61.6 EBEP?", reverso: "La oposición y el concurso-oposición; solo por ley podrá aplicarse, con carácter excepcional, el sistema de concurso" },
    { anverso: "¿Qué requisitos deben cumplirse sucesivamente para adquirir la condición de funcionario de carrera según el artículo 62 EBEP?", reverso: "Superación del proceso selectivo, nombramiento por el órgano competente (publicado en el Diario Oficial), acto de acatamiento de la Constitución y, en su caso, del Estatuto de Autonomía, y toma de posesión dentro del plazo establecido" },
    { anverso: "¿Cuáles son las causas de pérdida de la condición de funcionario de carrera según el artículo 63 EBEP?", reverso: "La renuncia, la pérdida de la nacionalidad, la jubilación total, la sanción disciplinaria de separación del servicio firme, y la pena de inhabilitación absoluta o especial para cargo público firme" },
    { anverso: "¿En qué casos no podrá aceptarse la renuncia a la condición de funcionario según el artículo 64.2 EBEP?", reverso: "Cuando el funcionario esté sujeto a expediente disciplinario o se haya dictado en su contra auto de procesamiento o de apertura de juicio oral por la comisión de algún delito" },
    { anverso: "¿Qué tipos de jubilación de los funcionarios contempla el artículo 67 EBEP?", reverso: "Voluntaria (a solicitud del funcionario), forzosa (al cumplir la edad legalmente establecida) y por declaración de incapacidad permanente" },
    { anverso: "¿A qué edad se declara de oficio la jubilación forzosa según el artículo 67.3 EBEP?", reverso: "Al cumplir los sesenta y cinco años de edad, sin perjuicio de poder solicitar la prolongación de la permanencia en servicio activo hasta los setenta años" },
    { anverso: "¿Qué permite la rehabilitación de la condición de funcionario según el artículo 68 EBEP?", reverso: "Recuperar la condición de funcionario tras la extinción de la relación de servicios por pérdida de la nacionalidad o jubilación por incapacidad permanente, una vez desaparecida la causa que la motivó" },
  ].map((f) => ({ ...f, tema_slug: T43, seccion: S2_43 })),
);
console.log(`📝 preguntas de test (${S2_43})...`);
await insertarPreguntasConOpciones(T43, S2_43, [
  { enunciado: "¿Cuáles son los principios rectores del acceso al empleo público según el artículo 55 EBEP?", explicacion: "Igualdad, mérito y capacidad.", dificultad: "facil", opciones: ["Igualdad, mérito y capacidad", "Antigüedad exclusivamente", "Libre designación exclusivamente", "Sorteo exclusivamente"], correcta: 0 },
  { enunciado: "¿Qué edad mínima se exige, con carácter general, para participar en procesos selectivos según el artículo 56 EBEP?", explicacion: "Dieciséis años cumplidos.", dificultad: "media", opciones: ["Dieciséis años", "Dieciocho años", "Veintiún años", "Catorce años"], correcta: 0 },
  { enunciado: "¿Qué porcentaje mínimo de vacantes debe reservarse en las ofertas de empleo público para personas con discapacidad según el artículo 59 EBEP?", explicacion: "Un cupo no inferior al 7%.", dificultad: "media", opciones: ["El 7%", "El 2%", "El 15%", "El 33%"], correcta: 0 },
  { enunciado: "¿Cuáles son los sistemas selectivos ordinarios de funcionarios de carrera según el artículo 61 EBEP?", explicacion: "Oposición y concurso-oposición.", dificultad: "media", opciones: ["Oposición y concurso-oposición", "Libre designación exclusivamente", "Concurso de méritos exclusivamente", "Sorteo público"], correcta: 0 },
  { enunciado: "¿Qué acto debe realizarse, además de la superación del proceso selectivo y el nombramiento, para adquirir la condición de funcionario de carrera según el artículo 62 EBEP?", explicacion: "El acto de acatamiento de la Constitución y, en su caso, del Estatuto de Autonomía, y la toma de posesión.", dificultad: "media", opciones: ["El acto de acatamiento de la Constitución y la toma de posesión", "El pago de una fianza", "La superación de un examen médico adicional", "La firma de un contrato laboral"], correcta: 0 },
  { enunciado: "¿Cuál de las siguientes NO es causa de pérdida de la condición de funcionario de carrera según el artículo 63 EBEP?", explicacion: "El traslado de puesto de trabajo no es causa de pérdida de la condición de funcionario.", dificultad: "media", opciones: ["El traslado de puesto de trabajo", "La renuncia", "La jubilación total", "La pérdida de la nacionalidad"], correcta: 0 },
  { enunciado: "¿A qué edad se declara de oficio la jubilación forzosa del funcionario según el artículo 67.3 EBEP?", explicacion: "A los sesenta y cinco años, sin perjuicio de poder prolongar la permanencia hasta los setenta.", dificultad: "media", opciones: ["A los 65 años", "A los 60 años", "A los 70 años", "A los 63 años"], correcta: 0 },
  { enunciado: "¿Qué permite la rehabilitación de la condición de funcionario según el artículo 68 EBEP?", explicacion: "Recuperar la condición de funcionario tras la extinción por pérdida de nacionalidad o jubilación por incapacidad, una vez desaparecida la causa.", dificultad: "media", opciones: ["Recuperar la condición de funcionario cuando desaparece la causa que la extinguió", "Acceder por primera vez a la función pública sin proceso selectivo", "Cambiar de cuerpo o escala libremente", "Prorrogar indefinidamente la jubilación forzosa"], correcta: 0 },
]);

const S3_43 = "regimen-disciplinario-empleados-publicos";
console.log(`📝 flashcards (${S3_43})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿A qué régimen quedan sujetos los funcionarios públicos y el personal laboral según el artículo 93 EBEP?", reverso: "Al régimen disciplinario establecido en el título VII del EBEP y en las normas que las leyes de Función Pública dicten en su desarrollo" },
    { anverso: "¿Cuáles son los principios que rigen el ejercicio de la potestad disciplinaria según el artículo 94.2 EBEP?", reverso: "Legalidad y tipicidad, irretroactividad de las disposiciones sancionadoras no favorables, proporcionalidad, culpabilidad y presunción de inocencia" },
    { anverso: "¿En cuántos grados se clasifican las faltas disciplinarias según el artículo 95.1 EBEP?", reverso: "En tres: muy graves, graves y leves" },
    { anverso: "Cita tres ejemplos de faltas muy graves recogidas en el artículo 95.2 EBEP", reverso: "El incumplimiento del deber de respeto a la Constitución, toda actuación que suponga discriminación, y el abandono del servicio" },
    { anverso: "¿Quién establece las faltas graves según el artículo 95.3 EBEP?", reverso: "Ley de las Cortes Generales o de la asamblea legislativa de la correspondiente comunidad autónoma, o los convenios colectivos en el caso de personal laboral" },
    { anverso: "¿Cuáles son las sanciones que pueden imponerse por razón de las faltas cometidas según el artículo 96.1 EBEP?", reverso: "Separación del servicio (o despido disciplinario en el caso de personal laboral), suspensión firme de funciones, traslado forzoso, demérito, apercibimiento, y cualquier otra que se establezca por ley" },
    { anverso: "¿Qué faltas pueden sancionarse con la separación del servicio de los funcionarios según el artículo 96.1.a) EBEP?", reverso: "Sólo la comisión de faltas muy graves" },
    { anverso: "¿Cuál es el plazo de prescripción de las infracciones muy graves según el artículo 97.1 EBEP?", reverso: "Tres años" },
    { anverso: "¿Cuál es el plazo de prescripción de las infracciones leves según el artículo 97.1 EBEP?", reverso: "Seis meses" },
    { anverso: "¿Qué separación exige el procedimiento disciplinario según el artículo 98.2 EBEP?", reverso: "La debida separación entre la fase instructora y la sancionadora, encomendándose a órganos distintos" },
  ].map((f) => ({ ...f, tema_slug: T43, seccion: S3_43 })),
);
console.log(`📝 preguntas de test (${S3_43})...`);
await insertarPreguntasConOpciones(T43, S3_43, [
  { enunciado: "¿En cuántos grados se clasifican las faltas disciplinarias según el artículo 95.1 EBEP?", explicacion: "En tres: muy graves, graves y leves.", dificultad: "facil", opciones: ["Tres grados: muy graves, graves y leves", "Dos grados: graves y leves", "Cuatro grados", "Cinco grados"], correcta: 0 },
  { enunciado: "¿Cuál de los siguientes principios NO rige el ejercicio de la potestad disciplinaria según el artículo 94.2 EBEP?", explicacion: "La retroactividad general de las sanciones no está entre los principios; sí lo está la irretroactividad de las disposiciones no favorables.", dificultad: "media", opciones: ["La retroactividad general de todas las sanciones", "El principio de legalidad y tipicidad", "El principio de proporcionalidad", "La presunción de inocencia"], correcta: 0 },
  { enunciado: "¿Quién establece las faltas graves de los funcionarios según el artículo 95.3 EBEP?", explicacion: "Ley de las Cortes Generales o de la asamblea legislativa autonómica correspondiente.", dificultad: "media", opciones: ["Ley de las Cortes Generales o de la asamblea legislativa autonómica", "El propio funcionario afectado", "Únicamente el reglamento interno de cada Ayuntamiento", "El Tribunal Constitucional"], correcta: 0 },
  { enunciado: "¿Qué faltas pueden sancionarse con la separación del servicio según el artículo 96.1.a) EBEP?", explicacion: "Solo la comisión de faltas muy graves.", dificultad: "media", opciones: ["Solo faltas muy graves", "Faltas graves y muy graves indistintamente", "Cualquier falta, incluidas las leves", "Ninguna falta disciplinaria"], correcta: 0 },
  { enunciado: "¿Cuál es el plazo de prescripción de las infracciones muy graves según el artículo 97.1 EBEP?", explicacion: "Tres años.", dificultad: "media", opciones: ["Tres años", "Un año", "Seis meses", "Cinco años"], correcta: 0 },
  { enunciado: "¿Cuál es el plazo de prescripción de las infracciones leves según el artículo 97.1 EBEP?", explicacion: "Seis meses.", dificultad: "media", opciones: ["Seis meses", "Un año", "Tres años", "Dos años"], correcta: 0 },
  { enunciado: "¿Qué separación exige la estructura del procedimiento disciplinario según el artículo 98.2 EBEP?", explicacion: "La separación entre la fase instructora y la sancionadora, encomendadas a órganos distintos.", dificultad: "media", opciones: ["Separación entre fase instructora y sancionadora", "Separación entre Administración local y autonómica", "Separación entre personal laboral y funcionario", "No existe separación exigida"], correcta: 0 },
  { enunciado: "¿Cuál de las siguientes es una sanción disciplinaria prevista en el artículo 96.1 EBEP?", explicacion: "El traslado forzoso es una de las sanciones previstas.", dificultad: "media", opciones: ["El traslado forzoso", "La reducción del IRPF", "La revocación del DNI", "El embargo de bienes personales"], correcta: 0 },
]);

const S4_43 = "peculiaridades-funcion-publica-local";
console.log(`📝 flashcards (${S4_43})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Por qué normativa se rige el personal funcionario de las Entidades Locales según el artículo 3.1 EBEP?", reverso: "Por la legislación estatal que resulte de aplicación, de la que forma parte el propio EBEP, y por la legislación de las comunidades autónomas, con respeto a la autonomía local" },
    { anverso: "¿Qué particularidad tienen los Cuerpos de Policía Local según el artículo 3.2 EBEP?", reverso: "Se rigen también por el EBEP y por la legislación de las comunidades autónomas, excepto en lo establecido para ellos en la Ley Orgánica 2/1986, de Fuerzas y Cuerpos de Seguridad" },
    { anverso: "¿Qué categorías generales de puestos de trabajo reservados a funcionarios se establecen en la escala de las entidades locales para garantizar funciones que impliquen el ejercicio de autoridad?", reverso: "Los puestos que impliquen ejercicio de potestades públicas o salvaguarda de los intereses generales están reservados a funcionarios públicos, conforme al artículo 9.2 EBEP, correspondiendo su desarrollo a la legislación de régimen local" },
    { anverso: "¿Qué son los funcionarios de Administración local con habilitación de carácter nacional?", reverso: "Una categoría de funcionarios locales (Secretaría, Intervención-Tesorería) cuyas funciones están reservadas por su especial trascendencia para el conjunto de la organización municipal, reguladas de forma específica en la legislación de régimen local" },
    { anverso: "¿En qué escalas se estructura tradicionalmente la función pública local?", reverso: "En la Escala de funcionarios con habilitación de carácter nacional, la Escala de Administración General y la Escala de Administración Especial (ésta última con las subescalas técnica, de servicios especiales -que incluye la clase de personal de oficios- y otras)" },
    { anverso: "¿En qué subescala y clase se integran los puestos de \"Oficial\" de oficios (como Oficial Albañil) del Ayuntamiento de Zaragoza?", reverso: "En la Escala de Administración Especial, Subescala de Servicios Especiales, Clase de Personal de Oficios" },
    { anverso: "¿Qué principio de la Constitución (art. 137 y ss.) se proyecta sobre la organización de la función pública local?", reverso: "El principio de autonomía local, que garantiza a los municipios personalidad jurídica plena y capacidad para organizar sus propios recursos humanos con respeto a la legislación básica estatal" },
    { anverso: "¿Qué establece el artículo 2 EBEP sobre su ámbito de aplicación en relación con las entidades locales?", reverso: "Que el EBEP se aplica al personal funcionario y, en lo que proceda, al personal laboral al servicio de las Administraciones de las entidades locales" },
  ].map((f) => ({ ...f, tema_slug: T43, seccion: S4_43 })),
);
console.log(`📝 preguntas de test (${S4_43})...`);
await insertarPreguntasConOpciones(T43, S4_43, [
  { enunciado: "¿Por qué normativa se rige el personal funcionario de las Entidades Locales según el artículo 3.1 EBEP?", explicacion: "Por la legislación estatal (incluido el propio EBEP) y por la legislación de las comunidades autónomas, con respeto a la autonomía local.", dificultad: "media", opciones: ["Por la legislación estatal y autonómica, con respeto a la autonomía local", "Exclusivamente por el reglamento interno de cada Ayuntamiento", "Exclusivamente por la legislación estatal", "Exclusivamente por la legislación autonómica"], correcta: 0 },
  { enunciado: "¿Qué particularidad normativa tienen los Cuerpos de Policía Local según el artículo 3.2 EBEP?", explicacion: "Se rigen también por la Ley Orgánica de Fuerzas y Cuerpos de Seguridad.", dificultad: "media", opciones: ["Se rigen también por la Ley Orgánica de Fuerzas y Cuerpos de Seguridad", "Quedan excluidos totalmente del EBEP", "Se rigen únicamente por el Código Penal", "No tienen normativa específica"], correcta: 0 },
  { enunciado: "¿A qué tipo de personal corresponde en exclusiva el ejercicio de funciones que impliquen potestades públicas, según el artículo 9.2 EBEP?", explicacion: "A los funcionarios públicos.", dificultad: "media", opciones: ["A los funcionarios públicos", "Al personal laboral indistintamente", "Al personal eventual", "A cualquier empleado público sin distinción"], correcta: 0 },
  { enunciado: "¿Qué son los funcionarios de Administración local con habilitación de carácter nacional?", explicacion: "Una categoría con funciones reservadas por su especial trascendencia (Secretaría, Intervención-Tesorería), reguladas específicamente por la legislación de régimen local.", dificultad: "media", opciones: ["Una categoría con funciones reservadas por su especial trascendencia", "El personal eventual de confianza política", "El personal laboral temporal", "Los funcionarios interinos exclusivamente"], correcta: 0 },
  { enunciado: "¿En qué escalas se estructura tradicionalmente la función pública local?", explicacion: "Habilitación de carácter nacional, Administración General y Administración Especial.", dificultad: "media", opciones: ["Habilitación de carácter nacional, Administración General y Administración Especial", "Únicamente Administración General", "Únicamente Administración Especial", "Escala Superior y Escala Auxiliar exclusivamente"], correcta: 0 },
  { enunciado: "¿En qué subescala y clase se integran los puestos de \"Oficial\" de oficios del Ayuntamiento de Zaragoza?", explicacion: "Escala de Administración Especial, Subescala de Servicios Especiales, Clase de Personal de Oficios.", dificultad: "media", opciones: ["Escala de Administración Especial, Subescala de Servicios Especiales, Clase de Personal de Oficios", "Escala de Administración General, Subescala Técnica", "Escala de habilitación de carácter nacional", "Escala de Administración Especial, Subescala Técnica"], correcta: 0 },
  { enunciado: "¿Qué principio constitucional garantiza a los municipios capacidad para organizar sus propios recursos humanos?", explicacion: "El principio de autonomía local.", dificultad: "media", opciones: ["El principio de autonomía local", "El principio de reserva de ley orgánica", "El principio de jerarquía normativa", "El principio de unidad de mercado"], correcta: 0 },
  { enunciado: "¿Se aplica el EBEP al personal de las Administraciones de las entidades locales según su artículo 2?", explicacion: "Sí, al personal funcionario y, en lo que proceda, al personal laboral.", dificultad: "facil", opciones: ["Sí, se aplica al personal funcionario y, en lo que proceda, al laboral", "No, las entidades locales tienen normativa propia excluyente", "Solo se aplica a los Ayuntamientos de gran población", "Solo se aplica al personal eventual"], correcta: 0 },
]);

console.log(`✅ ${T43} creado (4 secciones, 40 flashcards + 32 preguntas).`);

// ─────────────────────────────────────────────────────────────────────────
// TEMA 44 — La igualdad efectiva de mujeres y hombres, el Plan de
// Igualdad del Ayuntamiento de Zaragoza y la prevención de riesgos
// laborales
// ─────────────────────────────────────────────────────────────────────────
const T44 = "tema-44";
console.log(`\n📚 Creando ${T44}...`);
await insertar("temas", [
  {
    slug: T44,
    titulo: "La igualdad efectiva de mujeres y hombres, el Plan de Igualdad del Ayuntamiento de Zaragoza y la Ley de Prevención de Riesgos Laborales",
    descripcion:
      "La Ley para la igualdad efectiva de mujeres y hombres: el principio de igualdad y la tutela contra la discriminación. El Plan de Igualdad para empleadas y empleados del Ayuntamiento de Zaragoza. La Ley de Prevención de Riesgos Laborales: objeto y carácter de la norma.",
    contenido:
      "Desarrolla el principio de igualdad efectiva entre mujeres y hombres regulado por la Ley Orgánica 3/2007, su tutela contra la discriminación, el Plan de Igualdad del Ayuntamiento de Zaragoza para sus empleadas y empleados, y el objeto y carácter de la Ley 31/1995, de Prevención de Riesgos Laborales.",
    enlaces_boe: [
      { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2007-6115", titulo: "Ley Orgánica 3/2007, para la igualdad efectiva de mujeres y hombres" },
      { url: "https://www.boe.es/buscar/act.php?id=BOE-A-1995-24292", titulo: "Ley 31/1995, de Prevención de Riesgos Laborales" },
    ],
    indice_estudio: [
      { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2007-6115", titulo: "El principio de igualdad y la tutela contra la discriminación", seccion: "ley-igualdad-efectiva-principio-tutela-discriminacion", articulos: "LO 3/2007: título preliminar y título I" },
      { url: "", titulo: "El Plan de Igualdad para empleadas y empleados del Ayuntamiento de Zaragoza", seccion: "plan-igualdad-ayuntamiento-zaragoza", articulos: "Conceptos fundamentales" },
      { url: "https://www.boe.es/buscar/act.php?id=BOE-A-1995-24292", titulo: "La Ley de Prevención de Riesgos Laborales: objeto y carácter de la norma", seccion: "ley-prl-objeto-caracter-norma", articulos: "Arts. 1-4" },
    ],
  },
]);

const S1_44 = "ley-igualdad-efectiva-principio-tutela-discriminacion";
console.log(`📝 flashcards (${S1_44})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Cuál es el objeto de la Ley Orgánica 3/2007, para la igualdad efectiva de mujeres y hombres?", reverso: "Hacer efectivo el derecho de igualdad de trato y de oportunidades entre mujeres y hombres, en particular mediante la eliminación de la discriminación de la mujer, sea cual fuere su circunstancia o condición, en cualesquiera de los ámbitos de la vida y, singularmente, en las esferas política, civil, laboral, económica, social y cultural" },
    { anverso: "¿Qué es el principio de igualdad de trato entre mujeres y hombres según la LO 3/2007?", reverso: "La ausencia de toda discriminación, directa o indirecta, por razón de sexo, y, especialmente, las derivadas de la maternidad, la asunción de obligaciones familiares y el estado civil" },
    { anverso: "¿Qué se entiende por discriminación directa por razón de sexo?", reverso: "La situación en que se encuentra una persona que sea, haya sido o pudiera ser tratada de manera menos favorable que otra en situación comparable por razón de su sexo" },
    { anverso: "¿Qué se entiende por discriminación indirecta por razón de sexo?", reverso: "La situación en que una disposición, criterio o práctica aparentemente neutros pone a personas de un sexo en desventaja particular respecto de personas del otro, salvo que dicha disposición, criterio o práctica pueda justificarse objetivamente" },
    { anverso: "¿Qué constituye también discriminación por razón de sexo según la LO 3/2007?", reverso: "El acoso sexual y el acoso por razón de sexo, así como todo trato adverso o efecto negativo que se produzca en una persona como consecuencia de la presentación de queja, reclamación, denuncia, demanda o recurso destinados a impedir su discriminación y a exigir el cumplimiento efectivo del principio de igualdad de trato" },
    { anverso: "¿Cómo se aplican las obligaciones de discriminación por embarazo o maternidad según la LO 3/2007?", reverso: "Constituye discriminación directa por razón de sexo todo trato desfavorable a las mujeres relacionado con el embarazo o la maternidad" },
    { anverso: "¿Qué mecanismo procesal establece la LO 3/2007 para facilitar la tutela judicial de las víctimas de discriminación?", reverso: "La inversión de la carga de la prueba: cuando la parte actora alegue discriminación por razón de sexo y aporte indicios fundados, corresponderá a la persona demandada probar la ausencia de discriminación" },
    { anverso: "¿Qué otros sujetos, además de la persona afectada, pueden tener legitimación para intervenir en procesos por discriminación de género según la LO 3/2007?", reverso: "Las personas físicas y jurídicas con interés legítimo, entre ellas los sindicatos y las asociaciones legalmente constituidas cuyo fin primordial sea la defensa de la igualdad de trato entre mujeres y hombres, con el consentimiento de la persona afectada" },
  ].map((f) => ({ ...f, tema_slug: T44, seccion: S1_44 })),
);
console.log(`📝 preguntas de test (${S1_44})...`);
await insertarPreguntasConOpciones(T44, S1_44, [
  { enunciado: "¿Cuál es el objeto principal de la Ley Orgánica 3/2007?", explicacion: "Hacer efectivo el derecho de igualdad de trato y de oportunidades entre mujeres y hombres.", dificultad: "facil", opciones: ["Hacer efectiva la igualdad de trato y de oportunidades entre mujeres y hombres", "Regular exclusivamente el permiso de maternidad", "Regular el régimen sancionador laboral", "Establecer el salario mínimo interprofesional"], correcta: 0 },
  { enunciado: "¿Qué es la discriminación directa por razón de sexo según la LO 3/2007?", explicacion: "El trato menos favorable a una persona por razón de su sexo respecto de otra en situación comparable.", dificultad: "media", opciones: ["El trato menos favorable por razón de sexo respecto de otra persona comparable", "Cualquier diferencia salarial justificada objetivamente", "La distinción por antigüedad en el puesto", "La distinción por titulación académica"], correcta: 0 },
  { enunciado: "¿Qué es la discriminación indirecta por razón de sexo según la LO 3/2007?", explicacion: "Una disposición, criterio o práctica aparentemente neutros que ponen en desventaja particular a personas de un sexo, sin justificación objetiva.", dificultad: "media", opciones: ["Una práctica aparentemente neutra que pone en desventaja a un sexo sin justificación objetiva", "Cualquier trato diferenciado por categoría profesional", "La aplicación de un convenio colectivo", "Un despido por causas económicas"], correcta: 0 },
  { enunciado: "¿Qué otras conductas constituyen discriminación por razón de sexo según la LO 3/2007?", explicacion: "El acoso sexual y el acoso por razón de sexo.", dificultad: "media", opciones: ["El acoso sexual y el acoso por razón de sexo", "Únicamente la diferencia salarial", "Únicamente el despido improcedente", "Únicamente la falta de ascenso"], correcta: 0 },
  { enunciado: "¿Qué trato desfavorable relacionado con el embarazo constituye discriminación directa por razón de sexo según la LO 3/2007?", explicacion: "Todo trato desfavorable a las mujeres relacionado con el embarazo o la maternidad.", dificultad: "media", opciones: ["Todo trato desfavorable relacionado con el embarazo o la maternidad", "Solo el despido durante el embarazo", "Solo la reducción de jornada no solicitada", "Ninguno, no está regulado en esta ley"], correcta: 0 },
  { enunciado: "¿Qué mecanismo procesal facilita la tutela judicial frente a la discriminación por razón de sexo según la LO 3/2007?", explicacion: "La inversión de la carga de la prueba.", dificultad: "media", opciones: ["La inversión de la carga de la prueba", "La eliminación del plazo de prescripción", "La supresión del recurso de alzada", "La exención de tasas judiciales exclusivamente"], correcta: 0 },
  { enunciado: "¿Qué entidades, además de la persona afectada, pueden tener legitimación en procesos por discriminación de género según la LO 3/2007?", explicacion: "Los sindicatos y asociaciones cuyo fin primordial sea la defensa de la igualdad de trato, con el consentimiento de la persona afectada.", dificultad: "media", opciones: ["Sindicatos y asociaciones de defensa de la igualdad, con consentimiento del afectado", "Cualquier persona sin necesidad de consentimiento", "Solo el Ministerio Fiscal", "Solo el Defensor del Pueblo"], correcta: 0 },
]);

const S2_44 = "plan-igualdad-ayuntamiento-zaragoza";
console.log(`📝 flashcards (${S2_44})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Qué es el Plan de Igualdad para empleadas y empleados del Ayuntamiento de Zaragoza?", reverso: "Un instrumento de planificación que establece los objetivos y las medidas concretas a adoptar por el Ayuntamiento para alcanzar la igualdad de trato y de oportunidades entre mujeres y hombres en su propia plantilla" },
    { anverso: "¿Qué objetivo persigue con carácter general un Plan de Igualdad en el empleo público?", reverso: "Eliminar cualquier discriminación, directa o indirecta, por razón de sexo y garantizar la igualdad real de oportunidades en el acceso, la promoción, la formación, las retribuciones y las condiciones de trabajo" },
    { anverso: "¿Con qué normativa estatal enlaza el Plan de Igualdad del Ayuntamiento de Zaragoza?", reverso: "Con la obligación general de las Administraciones Públicas de aprobar planes para la igualdad establecida en la Ley Orgánica 3/2007 y en el Estatuto Básico del Empleado Público" },
    { anverso: "¿Qué tipo de medidas suele incluir un Plan de Igualdad municipal en materia de acceso al empleo?", reverso: "Medidas orientadas a garantizar procesos selectivos objetivos, libres de sesgos de género, y a promover la presencia equilibrada de mujeres y hombres en los tribunales y órganos de selección" },
    { anverso: "¿Qué papel cumple la conciliación de la vida personal, familiar y laboral dentro del Plan de Igualdad del Ayuntamiento de Zaragoza?", reverso: "Es uno de los ejes de actuación habituales, incluyendo medidas de flexibilidad horaria, permisos y adaptación de jornada para facilitar la corresponsabilidad entre empleadas y empleados" },
    { anverso: "¿Qué relación guarda el Plan de Igualdad del Ayuntamiento de Zaragoza con la prevención del acoso sexual y por razón de sexo?", reverso: "Suele incorporar protocolos específicos de prevención, detección y actuación frente al acoso sexual y por razón de sexo en el ámbito laboral municipal" },
  ].map((f) => ({ ...f, tema_slug: T44, seccion: S2_44 })),
);
console.log(`📝 preguntas de test (${S2_44})...`);
await insertarPreguntasConOpciones(T44, S2_44, [
  { enunciado: "¿Qué es el Plan de Igualdad para empleadas y empleados del Ayuntamiento de Zaragoza?", explicacion: "Un instrumento de planificación con objetivos y medidas para la igualdad de trato y oportunidades en la plantilla municipal.", dificultad: "facil", opciones: ["Un instrumento de planificación para la igualdad en la plantilla municipal", "Un reglamento sancionador exclusivo", "Un convenio colectivo autónomo", "Un tributo municipal"], correcta: 0 },
  { enunciado: "¿Qué objetivo general persigue un Plan de Igualdad en el empleo público?", explicacion: "Eliminar la discriminación por razón de sexo y garantizar la igualdad real de oportunidades.", dificultad: "media", opciones: ["Eliminar la discriminación por razón de sexo y garantizar la igualdad real", "Reducir exclusivamente los costes salariales", "Sustituir el sistema de oposición por el de libre designación", "Eliminar el sistema de carrera profesional"], correcta: 0 },
  { enunciado: "¿Con qué normativa estatal enlaza la existencia del Plan de Igualdad del Ayuntamiento de Zaragoza?", explicacion: "Con la LO 3/2007 y el Estatuto Básico del Empleado Público.", dificultad: "media", opciones: ["Con la LO 3/2007 y el Estatuto Básico del Empleado Público", "Únicamente con el Código Civil", "Únicamente con el Código Penal", "No enlaza con ninguna norma estatal"], correcta: 0 },
  { enunciado: "¿Qué tipo de medidas suelen incluirse en materia de acceso al empleo en un Plan de Igualdad municipal?", explicacion: "Medidas para procesos selectivos objetivos y presencia equilibrada en los tribunales de selección.", dificultad: "media", opciones: ["Procesos selectivos objetivos y presencia equilibrada en tribunales", "La eliminación de las pruebas de oposición", "La reserva total de plazas para un sexo", "La supresión de los méritos académicos"], correcta: 0 },
  { enunciado: "¿Qué eje de actuación habitual incluye el Plan de Igualdad relacionado con la vida personal y familiar?", explicacion: "La conciliación de la vida personal, familiar y laboral.", dificultad: "media", opciones: ["La conciliación de la vida personal, familiar y laboral", "La reducción del salario base", "La eliminación de las vacaciones anuales", "La supresión de los permisos retribuidos"], correcta: 0 },
  { enunciado: "¿Qué suele incorporar el Plan de Igualdad del Ayuntamiento de Zaragoza frente al acoso sexual y por razón de sexo?", explicacion: "Protocolos específicos de prevención, detección y actuación.", dificultad: "media", opciones: ["Protocolos de prevención, detección y actuación", "Ninguna previsión al respecto", "Solo una declaración de intenciones sin medidas concretas", "Una sanción penal directa sin intervención administrativa"], correcta: 0 },
]);

const S3_44 = "ley-prl-objeto-caracter-norma";
console.log(`📝 flashcards (${S3_44})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Qué establece el artículo 1 de la Ley 31/1995 sobre la normativa de prevención de riesgos laborales?", reverso: "Que está constituida por la propia Ley, sus disposiciones de desarrollo o complementarias y cuantas otras normas, legales o convencionales, contengan prescripciones relativas a la adopción de medidas preventivas en el ámbito laboral" },
    { anverso: "¿Cuál es el objeto de la Ley 31/1995 según su artículo 2.1?", reverso: "Promover la seguridad y la salud de los trabajadores mediante la aplicación de medidas y el desarrollo de las actividades necesarias para la prevención de riesgos derivados del trabajo" },
    { anverso: "¿Qué establece la Ley 31/1995 para el cumplimiento de sus fines, según el artículo 2.1?", reverso: "Los principios generales relativos a la prevención de los riesgos profesionales, la eliminación o disminución de los riesgos derivados del trabajo, la información, la consulta, la participación equilibrada y la formación de los trabajadores en materia preventiva" },
    { anverso: "¿Qué carácter tienen las disposiciones de carácter laboral de la Ley 31/1995 según su artículo 2.2?", reverso: "El carácter de Derecho necesario mínimo indisponible, pudiendo ser mejoradas y desarrolladas en los convenios colectivos" },
    { anverso: "¿A qué ámbitos se aplica la Ley 31/1995 según su artículo 3.1?", reverso: "Tanto al ámbito de las relaciones laborales reguladas por el Estatuto de los Trabajadores como al de las relaciones de carácter administrativo o estatutario del personal al servicio de las Administraciones Públicas" },
    { anverso: "¿Qué actividades quedan excluidas del ámbito de aplicación de la Ley 31/1995 según su artículo 3.2?", reverso: "Aquellas cuyas particularidades lo impidan en el ámbito de las funciones públicas de policía, seguridad y resguardo aduanero; servicios operativos de protección civil y peritaje forense en casos de grave riesgo, catástrofe y calamidad pública; y Fuerzas Armadas y actividades militares de la Guardia Civil" },
    { anverso: "¿Qué se entiende por \"prevención\" según el artículo 4.1 de la Ley 31/1995?", reverso: "El conjunto de actividades o medidas adoptadas o previstas en todas las fases de actividad de la empresa con el fin de evitar o disminuir los riesgos derivados del trabajo" },
    { anverso: "¿Qué se entiende por \"riesgo laboral\" según el artículo 4.2 de la Ley 31/1995?", reverso: "La posibilidad de que un trabajador sufra un determinado daño derivado del trabajo" },
    { anverso: "¿Qué doble carácter tiene la Ley 31/1995 en cuanto a su aplicación en las Administraciones Públicas?", reverso: "Posee el carácter de legislación laboral y, en sus aspectos fundamentales, constituye norma básica del régimen estatutario de los funcionarios públicos" },
    { anverso: "¿Qué se entiende por \"riesgo laboral grave e inminente\" según el artículo 4.4 de la Ley 31/1995?", reverso: "Aquel que resulte probable racionalmente que se materialice en un futuro inmediato y pueda suponer un daño grave para la salud de los trabajadores" },
  ].map((f) => ({ ...f, tema_slug: T44, seccion: S3_44 })),
);
console.log(`📝 preguntas de test (${S3_44})...`);
await insertarPreguntasConOpciones(T44, S3_44, [
  { enunciado: "¿Cuál es el objeto de la Ley 31/1995 según su artículo 2.1?", explicacion: "Promover la seguridad y la salud de los trabajadores mediante la prevención de riesgos derivados del trabajo.", dificultad: "facil", opciones: ["Promover la seguridad y la salud de los trabajadores", "Regular el salario mínimo interprofesional", "Regular el régimen de la Seguridad Social", "Establecer el calendario laboral anual"], correcta: 0 },
  { enunciado: "¿Qué carácter tienen las disposiciones laborales de la Ley 31/1995 según su artículo 2.2?", explicacion: "Derecho necesario mínimo indisponible, mejorable por convenio colectivo.", dificultad: "media", opciones: ["Derecho necesario mínimo indisponible", "Derecho dispositivo entre las partes", "Derecho supletorio exclusivamente", "Derecho consuetudinario"], correcta: 0 },
  { enunciado: "¿A qué ámbitos se aplica la Ley 31/1995 según su artículo 3.1?", explicacion: "A las relaciones laborales del Estatuto de los Trabajadores y a las relaciones estatutarias del personal de las Administraciones Públicas.", dificultad: "media", opciones: ["A las relaciones laborales y a las relaciones estatutarias de las AAPP", "Únicamente a las relaciones laborales privadas", "Únicamente al personal funcionario", "Únicamente a las cooperativas"], correcta: 0 },
  { enunciado: "¿Cuál de las siguientes actividades queda excluida del ámbito de aplicación de la Ley 31/1995 según su artículo 3.2?", explicacion: "Las funciones públicas de policía, seguridad y resguardo aduanero, entre otras.", dificultad: "media", opciones: ["Policía, seguridad y resguardo aduanero", "El personal de oficios de los Ayuntamientos", "El personal laboral de las empresas privadas", "El personal docente"], correcta: 0 },
  { enunciado: "¿Qué se entiende por \"prevención\" según el artículo 4.1 de la Ley 31/1995?", explicacion: "El conjunto de actividades o medidas para evitar o disminuir los riesgos derivados del trabajo.", dificultad: "facil", opciones: ["El conjunto de medidas para evitar o disminuir riesgos del trabajo", "La reparación económica tras un accidente", "El seguro obligatorio de responsabilidad civil", "La inspección de trabajo exclusivamente"], correcta: 0 },
  { enunciado: "¿Qué se entiende por \"riesgo laboral\" según el artículo 4.2 de la Ley 31/1995?", explicacion: "La posibilidad de que un trabajador sufra un determinado daño derivado del trabajo.", dificultad: "facil", opciones: ["La posibilidad de que un trabajador sufra un daño derivado del trabajo", "El coste económico de un accidente laboral", "La sanción administrativa por incumplimiento", "El seguro médico privado del trabajador"], correcta: 0 },
  { enunciado: "¿Qué doble carácter tiene la Ley 31/1995 respecto de las Administraciones Públicas?", explicacion: "Legislación laboral y norma básica del régimen estatutario de los funcionarios.", dificultad: "media", opciones: ["Legislación laboral y norma básica del régimen estatutario", "Únicamente legislación penal", "Únicamente legislación tributaria", "Únicamente legislación mercantil"], correcta: 0 },
  { enunciado: "¿Qué es el \"riesgo laboral grave e inminente\" según el artículo 4.4 de la Ley 31/1995?", explicacion: "Aquel que probablemente se materialice en un futuro inmediato y pueda suponer un daño grave para la salud.", dificultad: "media", opciones: ["El que probablemente se materialice de forma inmediata con daño grave", "Cualquier riesgo, sin importar su probabilidad", "Solo el riesgo ya materializado en accidente", "Un riesgo meramente hipotético y remoto"], correcta: 0 },
]);

console.log(`✅ ${T44} creado (3 secciones, 30 flashcards + 24 preguntas).`);

// ─────────────────────────────────────────────────────────────────────────
// Asignación de los 4 temas comunes a la oposición: numero 1-4, bloque-1
// ─────────────────────────────────────────────────────────────────────────
console.log("\n🔧 Asignando temas 1-4 a la oposición (bloque-1)...");
await insertar("tema_oposicion", [
  { tema_slug: T41, oposicion_slug: OPOSICION, bloque_id: bloque1.id, numero: 1, orden: 1, es_premium: false, publicado: true, secciones_incluidas: [S1_41, S2_41, S3_41, S4_41] },
  { tema_slug: T42, oposicion_slug: OPOSICION, bloque_id: bloque1.id, numero: 2, orden: 2, es_premium: false, publicado: true, secciones_incluidas: [S1_42, S2_42, S3_42] },
  { tema_slug: T43, oposicion_slug: OPOSICION, bloque_id: bloque1.id, numero: 3, orden: 3, es_premium: false, publicado: true, secciones_incluidas: [S1_43, S2_43, S3_43, S4_43] },
  { tema_slug: T44, oposicion_slug: OPOSICION, bloque_id: bloque1.id, numero: 4, orden: 4, es_premium: false, publicado: true, secciones_incluidas: [S1_44, S2_44, S3_44] },
]);

console.log("\n✅ Oposición Oficial Albañil creada y parte primera (temas 1-4) dada de alta.");
console.log("   Pendiente: parte segunda (temas 5-20, específica de albañilería).");
