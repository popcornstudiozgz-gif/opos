/**
 * Da de alta operario-especialista-ayto-zaragoza: Operaria/o Especialista del
 * Ayuntamiento de Zaragoza (Escala de Administración Especial, Subescala de
 * Servicios Especiales, Clase Personal de oficios; Agrupación Profesional
 * D.A. 6.ª TREBEP), su bloque y los 2 temas que se cubren reutilizando
 * canónicos.
 *
 * Fuente del temario: Anexo I de las bases específicas de la CONV 5/2026
 * (bases2125.pdf, decreto de 15-07-2026, BOP de Zaragoza núm. 170 de
 * 27-07-2026), leído íntegro: 10 temas para Operaria/o Especialista (las
 * mismas bases convocan aparte 4 plazas de Subalterna/o, con otro temario,
 * reservadas a personas con discapacidad intelectual; no se incluye aquí).
 * El temario no se divide en partes, así que va en un único bloque.
 *
 * `numero` = número oficial del tema (1-10), como en Bombero y Policía Local.
 * Los temas nuevos usan slug = 407 + número (tema-408 a tema-416); quedan
 * libres tema-413 y tema-417 porque esos dos números reutilizan canónicos:
 *  - 6 (Albañilería: nociones básicas, herramientas y tipos de materiales)
 *    → tema-45 completo («Conceptos fundamentales de albañilería: materiales
 *    y herramientas», de Oficial Albañil: conglomerantes, áridos y morteros;
 *    piezas cerámicas y bloques; herramientas y máquinas del albañil).
 *  - 10 (LO 3/2007: principio de igualdad y tutela contra la discriminación;
 *    Ley 4/2007 de Aragón: medidas de protección y apoyo a las víctimas; Plan
 *    de Igualdad del Ayuntamiento) → tema-2 recortado a esas tres normas
 *    (fuera quedan la Ley 7/2018 y la Ley 5/2019, que no pide este temario).
 *    El capítulo IV de la Ley 4/2007 (BOE-A-2007-11593, arts. 18-31) se ha
 *    vuelto a leer en la API del BOE y coincide con las flashcards de tema-2.
 * El resto (temas 1-5, 7-9) mezcla materias que ningún canónico cubre
 * entero y va como tema nuevo dedicado.
 *
 * Uso: node --env-file=.env.local scripts/seed-operario-especialista-setup-y-reutilizados.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

async function upsert(tabla, filas, onConflict) {
  const res = await fetch(`${URL_BASE}/rest/v1/${tabla}?on_conflict=${onConflict}`, {
    method: "POST",
    headers: { ...HEADERS, Prefer: "resolution=merge-duplicates,return=representation" },
    body: JSON.stringify(filas),
  });
  if (!res.ok) { console.error(`❌ Error insertando en ${tabla}: ${res.status} ${await res.text()}`); process.exit(1); }
  const data = await res.json();
  console.log(`   ✓ ${tabla}: ${data.length} filas`);
  return data;
}

const OPOSICION_SLUG = "operario-especialista-ayto-zaragoza";
const NOMBRE = "Operario/a Especialista";

const TEMAS_REUTILIZADOS = [
  { temaSlug: "tema-45", numero: 6, secciones: null },
  { temaSlug: "tema-2", numero: 10, secciones: ["loiemh-titulo-preliminar", "loiemh-titulo-1", "ley4-cap-1-disposiciones-generales", "ley4-cap-4-proteccion-apoyo-victimas", "plan-igualdad-zaragoza"] },
];

console.log(`🏛️  Dando de alta ${NOMBRE} (Ayuntamiento de Zaragoza)...`);
await upsert("oposiciones", [{
  slug: OPOSICION_SLUG,
  nombre: NOMBRE,
  organismo: "Ayuntamiento de Zaragoza",
  descripcion_corta: `Preparación online para ${NOMBRE} del Ayuntamiento de Zaragoza (Agrupación Profesional, sin titulación exigida): temario, test, casos prácticos y simulacros.`,
  descripcion_larga:
    "Temario interactivo para preparar la oposición de Operaria/o Especialista del Ayuntamiento de Zaragoza (Escala de Administración Especial, Personal de oficios, Agrupación Profesional de la D.A. 6.ª del TREBEP; no se exige titulación): los 10 temas del Anexo I de la convocatoria CONV 5/2026 —Constitución, Estatuto de Autonomía y Ley de capitalidad de Zaragoza; procedimiento administrativo y empleados públicos; Manual de Atención a la Ciudadanía; nociones básicas, herramientas y materiales de electricidad, fontanería, albañilería y carpintería de madera; sistemas contra incendios y grupos de presión; medios auxiliares, trabajos en altura y manipulación de cargas; e igualdad— con flashcards, preguntas tipo test de 3 opciones como en el examen y supuestos prácticos.",
  activa: true,
  organismo_slug: "ayuntamiento-zaragoza",
  puesto_slug: "operario-especialista",
}], "slug");

console.log("\n📦 Dando de alta el bloque...");
const [bloque] = await upsert("bloques", [{
  oposicion_slug: OPOSICION_SLUG, slug: "bloque-1", orden: 1,
  titulo: "Temario (Anexo I)",
  descripcion: "Los 10 temas del Anexo I de las bases específicas de la CONV 5/2026: organización del Estado, de Aragón y del municipio de Zaragoza; procedimiento administrativo y empleados públicos; atención a la ciudadanía; oficios básicos (electricidad, fontanería, albañilería, carpintería de madera); protección contra incendios y grupos de presión; medios auxiliares y trabajos en altura; e igualdad.",
}], "oposicion_slug,slug");

console.log("\n📚 Enlazando los temas canónicos reutilizados...");
await upsert("tema_oposicion", TEMAS_REUTILIZADOS.map((t) => ({
  tema_slug: t.temaSlug,
  oposicion_slug: OPOSICION_SLUG,
  bloque_id: bloque.id,
  numero: t.numero,
  orden: t.numero,
  es_premium: false,
  publicado: true,
  secciones_incluidas: t.secciones,
})), "tema_slug,oposicion_slug");

console.log(`\n✅ ${NOMBRE} dado de alta. bloque-1=${bloque.id}`);
