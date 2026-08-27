/**
 * Crea el tema canónico "tema-30: Los órganos de gobierno y administración
 * de la Comunidad Autónoma de Aragón" — contenido nuevo, confirmado antes de
 * escribir que no solapa con ningún tema existente (tema-3, ya asignado a la
 * DGA como Tema 4, cubre el Estatuto de Aragón desde el ángulo estatutario;
 * este tema desarrolla el nivel legal/orgánico de detalle que pide el Tema 5
 * de la DGA, con leyes distintas). Cubre exactamente el enunciado oficial:
 * "Los órganos de gobierno y administración de la Comunidad Autónoma de
 * Aragón. El Presidente y el Gobierno de Aragón. La Administración Pública
 * de la Comunidad Autónoma. El Sector Público autonómico."
 *
 * Fuentes (ambas leídas íntegras para este seed, nunca resumidas de
 * memoria):
 *   - Decreto Legislativo 1/2022, de 6 de abril, del Gobierno de Aragón, por
 *     el que se aprueba el texto refundido de la Ley del Presidente o
 *     Presidenta y del Gobierno de Aragón (BOE-A-2022-7004), texto
 *     consolidado.
 *   - Ley 5/2021, de 29 de junio, de Organización y Régimen Jurídico del
 *     Sector Público Autonómico de Aragón (BOE-A-2021-12701), texto
 *     consolidado.
 *
 * Tres secciones:
 *   - "presidente-gobierno-aragon": arts. 1-12 del Decreto Legislativo
 *     1/2022 (el Presidente, atribuciones, cese; el Gobierno de Aragón y
 *     sus competencias).
 *   - "administracion-comunidad-autonoma": arts. 70-84 de la Ley 5/2021
 *     (Título III: organización departamental, estructura orgánica,
 *     delegaciones territoriales).
 *   - "sector-publico-autonomico": arts. 85, 92-144 de la Ley 5/2021
 *     (Título IV: organismos autónomos, entidades de derecho público,
 *     sociedades mercantiles autonómicas, consorcios y fundaciones del
 *     sector público).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-organos-gobierno-aragon.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!URL_BASE || !SERVICE_KEY) {
  console.error("❌ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-30";

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
      titulo: "Los órganos de gobierno y administración de la Comunidad Autónoma de Aragón",
      descripcion:
        "El Presidente y el Gobierno de Aragón: elección, atribuciones y cese del Presidente; composición y competencias del Gobierno. La Administración Pública de la Comunidad Autónoma: organización departamental, estructura orgánica y órganos territoriales. El Sector Público autonómico: organismos autónomos, entidades de derecho público, sociedades mercantiles autonómicas, consorcios y fundaciones del sector público.",
      contenido:
        "Desarrolla el Decreto Legislativo 1/2022, texto refundido de la Ley del Presidente o Presidenta y del Gobierno de Aragón (elección y atribuciones del Presidente, composición y competencias del Gobierno de Aragón), y la Ley 5/2021, de Organización y Régimen Jurídico del Sector Público Autonómico de Aragón, que regula la organización departamental de la Administración autonómica y la tipología completa de entidades de su sector público institucional.",
      enlaces_boe: [
        { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2022-7004", titulo: "Texto refundido de la Ley del Presidente o Presidenta y del Gobierno de Aragón" },
        { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2021-12701", titulo: "Ley 5/2021, de Organización y Régimen Jurídico del Sector Público Autonómico de Aragón" },
      ],
      indice_estudio: [
        { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2022-7004", titulo: "El Presidente y el Gobierno de Aragón", seccion: "presidente-gobierno-aragon", articulos: "arts. 1-12 Decreto Legislativo 1/2022" },
        { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2021-12701", titulo: "La Administración Pública de la Comunidad Autónoma", seccion: "administracion-comunidad-autonoma", articulos: "arts. 70-84 Ley 5/2021" },
        { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2021-12701", titulo: "El Sector Público autonómico", seccion: "sector-publico-autonomico", articulos: "arts. 85, 92-144 Ley 5/2021" },
      ],
    },
  ],
  "slug"
);

// ── 2. FLASHCARDS ────────────────────────────────────────────────────────
console.log("📝 flashcards (presidente-gobierno-aragon)...");
await insertar(
  "flashcards",
  [
    { anverso: "Según el art. 1.1 del Decreto Legislativo 1/2022, ¿qué representación ostenta el Presidente o Presidenta de Aragón?", reverso: "La suprema representación de Aragón y la ordinaria del Estado en el territorio de esta nacionalidad histórica" },
    { anverso: "Según el art. 2.1 y 2.2, ¿quién elige al Presidente y quién lo nombra?", reverso: "Las Cortes de Aragón lo eligen, en la forma prevista en el Estatuto de Autonomía; el Rey lo nombra a propuesta de la presidencia de las Cortes" },
    { anverso: "Según el art. 3, ¿ante quién responde políticamente el Presidente de Aragón?", reverso: "Ante las Cortes de Aragón" },
    { anverso: "Según el art. 4.4 y 4.10, ¿quién crea, modifica o suprime las vicepresidencias y departamentos, y quién nombra a sus titulares?", reverso: "El Presidente o Presidenta, en ambos casos" },
    { anverso: "Según el art. 6.1, cita tres causas de cese del Presidente de Aragón.", reverso: "Celebración de elecciones a Cortes de Aragón, aprobación de una moción de censura, pérdida de una cuestión de confianza (también dimisión, fallecimiento, incapacidad permanente, sentencia firme inhabilitante, pérdida de la condición de diputado o incompatibilidad no subsanada)" },
    { anverso: "Según el art. 9.1, ¿quién nombra y separa a los Consejeros y Consejeras del Gobierno de Aragón?", reverso: "El Presidente o Presidenta, libremente" },
    { anverso: "Según el art. 11.1, ¿qué establece el Gobierno de Aragón bajo la dirección de su Presidente?", reverso: "La política general y la acción exterior; dirige la Administración de la Comunidad Autónoma y vela por la defensa de la autonomía aragonesa" },
    { anverso: "Según el art. 11.2, ¿de quiénes se compone el Gobierno de Aragón?", reverso: "De las personas titulares de la presidencia, la vicepresidencia o vicepresidencias, en su caso, y los departamentos" },
    { anverso: "Según el art. 11.3, ¿ante quién es responsable el Gobierno de Aragón y con qué carácter?", reverso: "Ante las Cortes de Aragón, de forma solidaria, sin perjuicio de la responsabilidad directa de sus miembros por su gestión" },
    { anverso: "Según el art. 15.1, ¿qué se necesita para la válida constitución del Gobierno y la adopción de sus acuerdos?", reverso: "La presencia de las personas titulares de la presidencia y la secretaría (o quienes les sustituyan) y de la mitad de sus miembros" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: "presidente-gobierno-aragon" })),
);

console.log("📝 flashcards (administracion-comunidad-autonoma)...");
await insertar(
  "flashcards",
  [
    { anverso: "Según el art. 70 de la Ley 5/2021, ¿con qué principios se organiza la Administración de la Comunidad Autónoma de Aragón?", reverso: "División funcional en departamentos y gestión territorial mediante delegaciones territoriales de ámbito provincial" },
    { anverso: "Según el art. 71.1, ¿quiénes son los órganos superiores de la Administración de la comunidad autónoma?", reverso: "Los vicepresidentes o vicepresidentas, en su caso, y las consejeras y consejeros, como titulares de los departamentos" },
    { anverso: "Según el art. 71.2, ¿qué órganos se configuran como órganos directivos?", reverso: "Las personas titulares de la Secretaría General de la Presidencia, de las secretarías generales técnicas y de las direcciones generales" },
    { anverso: "Según el art. 77.2, ¿a quién corresponde la creación, modificación, agrupación y supresión de departamentos?", reverso: "Al presidente o presidenta del Gobierno de Aragón" },
    { anverso: "Según el art. 78.1, ¿en qué órganos se estructuran los departamentos?", reverso: "En secretarías generales técnicas, direcciones generales y servicios, dependientes de la persona titular del departamento" },
    { anverso: "Según el art. 78.3, ¿cuál es la función de la dirección general como división orgánica fundamental de los departamentos?", reverso: "La dirección técnica, la gestión y la coordinación de una o varias áreas funcionalmente homogéneas" },
    { anverso: "Según el art. 82.1, ¿de qué son representantes las delegaciones territoriales del Gobierno de Aragón?", reverso: "Del Gobierno en la respectiva provincia, ejerciendo funciones de dirección, impulso, coordinación y supervisión de servicios y organismos públicos en su ámbito territorial" },
    { anverso: "Según el art. 84.2, ¿quién nombra al director o directora de un servicio provincial y entre qué personal?", reverso: "El Gobierno de Aragón, mediante decreto, entre personal funcionario de carrera de nivel superior" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: "administracion-comunidad-autonoma" })),
);

console.log("📝 flashcards (sector-publico-autonomico)...");
await insertar(
  "flashcards",
  [
    { anverso: "Según el art. 85.1 de la Ley 5/2021, ¿qué cinco tipos de entes integran el sector público institucional de la Comunidad Autónoma de Aragón?", reverso: "Organismos públicos (autónomos y entidades de derecho público), sociedades mercantiles autonómicas, consorcios autonómicos, fundaciones del sector público, y las universidades públicas del Sistema Universitario de Aragón" },
    { anverso: "Según el art. 92, ¿para qué actividades se crean los organismos públicos autonómicos?", reverso: "Actividades administrativas de fomento, prestación o gestión de servicios públicos, producción de bienes de interés público susceptibles de contraprestación, o supervisión/regulación de sectores económicos" },
    { anverso: "Según el art. 95.1, ¿mediante qué instrumento se crean los organismos públicos?", reverso: "Por Ley" },
    { anverso: "Según el art. 103.1, ¿qué son los organismos autónomos?", reverso: "Organismos públicos con personalidad jurídica propia, tesorería y patrimonio propios y autonomía en su gestión, que desarrollan actividades propias de la Administración pública" },
    { anverso: "Según el art. 105.1, ¿tienen los organismos autónomos personal propio?", reverso: "No; su personal, funcionario o laboral, se rige por la normativa de empleados públicos y la normativa laboral" },
    { anverso: "Según el art. 110, ¿qué son las entidades de derecho público?", reverso: "Organismos públicos con personalidad jurídica propia, patrimonio propio y autonomía en su gestión que, junto al ejercicio de potestades administrativas, desarrollan actividades prestacionales, de gestión de servicios o de producción de bienes de interés público susceptibles de contraprestación" },
    { anverso: "Según el art. 117.1, ¿cuándo se consideran mercantiles autonómicas las sociedades mercantiles?", reverso: "Cuando la Administración de la comunidad autónoma, sus organismos públicos u otras sociedades participadas puedan ejercer, directa o indirectamente, una influencia dominante en razón de la propiedad, participación financiera o normas que las rigen" },
    { anverso: "Según el art. 120, ¿pueden las sociedades mercantiles autonómicas ejercer potestades de autoridad pública?", reverso: "No, en ningún caso" },
    { anverso: "Según el art. 127.1, ¿qué son los consorcios autonómicos?", reverso: "Entes de derecho público, con personalidad jurídica propia y diferenciada, creados por varias administraciones o entidades del sector público institucional, entre sí o con entidades privadas, para actividades de interés común" },
    { anverso: "Según el art. 134.1, ¿qué requisito principal define a una fundación como del sector público autonómico?", reverso: "Que se constituya con una aportación mayoritaria a la dotación fundacional del sector público autonómico, o que su patrimonio esté integrado en más de un 50% por bienes aportados por dicho sector, o que la mayoría de derechos de voto de su patronato corresponda a representantes del sector público" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: "sector-publico-autonomico" })),
);

// ── 3. PREGUNTAS DE TEST ─────────────────────────────────────────────────
console.log("📝 preguntas (presidente-gobierno-aragon)...");
await insertar(
  "preguntas",
  [
    {
      enunciado: "Según el art. 1.1 del Decreto Legislativo 1/2022, ¿qué representación ostenta el Presidente o Presidenta de Aragón?",
      explicacion: "Ostenta la suprema representación de Aragón y la ordinaria del Estado en el territorio de esta nacionalidad histórica.",
      dificultad: "media",
    },
    {
      enunciado: "Según el art. 2 del Decreto Legislativo 1/2022, ¿quién elige al Presidente de Aragón y quién lo nombra?",
      explicacion: "Es elegido por las Cortes de Aragón, en la forma prevista en el Estatuto de Autonomía; su nombramiento corresponde al Rey, a propuesta de la presidencia de las Cortes.",
      dificultad: "facil",
    },
    {
      enunciado: "¿Ante quién responde políticamente el Presidente de Aragón, según el art. 3?",
      explicacion: "Ante las Cortes de Aragón, de acuerdo con los procedimientos previstos en el Estatuto de Autonomía y el Reglamento de las Cortes de Aragón.",
      dificultad: "facil",
    },
    {
      enunciado: "Según el art. 9.1, ¿quién nombra y separa a los Consejeros y Consejeras del Gobierno de Aragón?",
      explicacion: "El Presidente o Presidenta los nombra y separa libremente y establece su orden de prelación.",
      dificultad: "facil",
    },
    {
      enunciado: "Según el art. 11.1, además de establecer la política general y la acción exterior, ¿qué otras funciones ejerce el Gobierno de Aragón?",
      explicacion: "Dirige la Administración de la Comunidad Autónoma, vela por la defensa de la autonomía aragonesa y ejerce la función ejecutiva y la potestad reglamentaria de acuerdo con las leyes.",
      dificultad: "media",
    },
    {
      enunciado: "¿De quiénes se compone el Gobierno de Aragón, según el art. 11.2?",
      explicacion: "De las personas titulares de la presidencia, la vicepresidencia o vicepresidencias, en su caso, y los departamentos.",
      dificultad: "facil",
    },
    {
      enunciado: "Según el art. 15.1, ¿qué se exige para la válida constitución del Gobierno de Aragón y la adopción de sus acuerdos?",
      explicacion: "La presencia de las personas titulares de la presidencia y de la secretaría (o de quienes les sustituyan) y de la mitad, al menos, de sus miembros.",
      dificultad: "dificil",
    },
  ].map((p) => ({ ...p, tema_slug: TEMA, seccion: "presidente-gobierno-aragon" })),
);

console.log("📝 preguntas (administracion-comunidad-autonoma)...");
await insertar(
  "preguntas",
  [
    {
      enunciado: "Según el art. 70 de la Ley 5/2021, ¿con qué principios se organiza la Administración de la Comunidad Autónoma de Aragón?",
      explicacion: "Con los principios de división funcional en departamentos y gestión territorial mediante delegaciones territoriales de ámbito provincial, así como otros órganos o unidades administrativas de ámbito comarcal o local.",
      dificultad: "media",
    },
    {
      enunciado: "¿Quiénes son los órganos superiores de la Administración de la comunidad autónoma, según el art. 71.1?",
      explicacion: "Los vicepresidentes o vicepresidentas, en su caso, y las consejeras y consejeros, como titulares de los departamentos.",
      dificultad: "facil",
    },
    {
      enunciado: "Según el art. 77.2, ¿a quién corresponde la creación, modificación, agrupación y supresión de los departamentos de la Administración de la comunidad autónoma?",
      explicacion: "Al presidente o presidenta del Gobierno de Aragón, que también determina el sector o sectores de actividad administrativa de cada uno.",
      dificultad: "media",
    },
    {
      enunciado: "¿En qué órganos se estructuran los departamentos de la Administración aragonesa, según el art. 78.1?",
      explicacion: "En secretarías generales técnicas, direcciones generales y servicios, todos ellos dependientes de la persona titular del departamento.",
      dificultad: "facil",
    },
    {
      enunciado: "Según el art. 82.1, ¿qué representan las delegaciones territoriales del Gobierno de Aragón en su respectiva provincia?",
      explicacion: "Representan al Gobierno, ejerciendo funciones de dirección, impulso, coordinación y supervisión de los servicios y organismos públicos de la Administración autonómica en su ámbito territorial.",
      dificultad: "media",
    },
  ].map((p) => ({ ...p, tema_slug: TEMA, seccion: "administracion-comunidad-autonoma" })),
);

console.log("📝 preguntas (sector-publico-autonomico)...");
await insertar(
  "preguntas",
  [
    {
      enunciado: "Según el art. 85.1 de la Ley 5/2021, ¿qué tipos de entes integran el sector público institucional de la Comunidad Autónoma de Aragón?",
      explicacion: "Los organismos públicos (organismos autónomos y entidades de derecho público), las sociedades mercantiles autonómicas, los consorcios autonómicos, las fundaciones del sector público y las universidades públicas integradas en el Sistema Universitario de Aragón.",
      dificultad: "media",
    },
    {
      enunciado: "¿Mediante qué instrumento se crean los organismos públicos autonómicos, según el art. 95.1?",
      explicacion: "Por Ley.",
      dificultad: "facil",
    },
    {
      enunciado: "¿Tienen los organismos autónomos personal propio, según el art. 105.1?",
      explicacion: "No; su personal, funcionario o laboral, se rige por la normativa reguladora de los empleados públicos y por la normativa laboral.",
      dificultad: "dificil",
    },
    {
      enunciado: "Según el art. 110, ¿qué distingue a las entidades de derecho público de los organismos autónomos?",
      explicacion: "Que, junto con el ejercicio de potestades administrativas, desarrollan actividades prestacionales, de gestión de servicios o de producción de bienes de interés público susceptibles de contraprestación.",
      dificultad: "dificil",
    },
    {
      enunciado: "¿Pueden las sociedades mercantiles autonómicas ejercer facultades que impliquen el ejercicio de autoridad pública, según el art. 120?",
      explicacion: "No; en ningún caso podrán disponer de facultades que impliquen el ejercicio de autoridad pública.",
      dificultad: "media",
    },
    {
      enunciado: "Según el art. 127.1, ¿qué son los consorcios autonómicos?",
      explicacion: "Entes de derecho público, con personalidad jurídica propia y diferenciada, creados por varias administraciones públicas o entidades del sector público institucional, entre sí o con participación de entidades privadas, para el desarrollo de actividades de interés común.",
      dificultad: "media",
    },
  ].map((p) => ({ ...p, tema_slug: TEMA, seccion: "sector-publico-autonomico" })),
);

// ── 4. ASIGNACIÓN A LA DGA (Tema 5 del programa oficial) ──────────────────
console.log("📝 tema_oposicion (DGA)...");
const bloques = await (await fetch(`${URL_BASE}/rest/v1/bloques?oposicion_slug=eq.auxiliar-administrativo-dga&slug=eq.bloque-1&select=id`, { headers: HEADERS })).json();
await upsert(
  "tema_oposicion",
  [
    {
      tema_slug: TEMA,
      oposicion_slug: "auxiliar-administrativo-dga",
      bloque_id: bloques[0].id,
      numero: 5,
      orden: 5,
      es_premium: false,
      publicado: true,
      secciones_incluidas: ["presidente-gobierno-aragon", "administracion-comunidad-autonoma", "sector-publico-autonomico"],
    },
  ],
  "tema_slug,oposicion_slug"
);

console.log("✅ tema-30 (Órganos de gobierno y administración de Aragón) creado y asignado a la DGA como Tema 5.");
