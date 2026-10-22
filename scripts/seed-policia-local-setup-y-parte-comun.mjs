/**
 * Da de alta policia-local-ayto-zaragoza: la oposición, sus 2 bloques y los
 * 8 temas de la Parte primera que se cubren reutilizando temas canónicos.
 *
 * Fuente del temario: bases específicas CONV 7.1/2026 (bases2106.pdf, BOP
 * núm. 170 de 27-07-2026; extracto en BOE núm. 227 de 14-09-2026,
 * BOE-A-2026-19150), leídas íntegras: 43 plazas de Policía del Cuerpo de la
 * Policía Local (C1), Anexo I con 50 temas (Parte primera, temas 1-10,
 * materias comunes; Parte segunda, temas 11-50, materias específicas).
 *
 * Como en Bombero/a Conductor/a, `numero` coincide con el número oficial
 * del tema (1-50). Cada tema canónico solo puede vincularse una vez por
 * oposición, así que la Parte primera se reparte así:
 *  - Tema 1 (Constitución: antecedentes, estructura y contenido; principios
 *    y valores; título preliminar; derechos y deberes fundamentales) →
 *    tema-1 recortado a antecedentes, título preliminar y título I.
 *  - Tema 3 (organización territorial; Estatuto de Aragón, títulos
 *    preliminar, II, III, V y VI) → tema-3 con el mismo recorte que Bombero
 *    (enunciado idéntico).
 *  - Tema 4 (Administración Pública en la CE, Leyes 39/2015 y 40/2015) →
 *    tema-299 completo (creado para Bombero, mismo contenido exigido).
 *  - Tema 5 (municipio, derechos y deberes de los vecinos, gran población,
 *    competencias) → tema-14 completo (incluye el art. 18 LBRL).
 *  - Tema 7 (presupuesto, ingresos y gastos locales) → tema-300 sin la
 *    sección de la Ordenanza de Transparencia, que aquí va en el Tema 45.
 *  - Tema 8 (empleo público, estructura y clases) → tema-43 con el mismo
 *    recorte que Bombero.
 *  - Temas 9 y 10 → tema-301 y tema-302 completos (enunciados de Bombero).
 *  - Temas 2 (Corona, Cortes, Poder Judicial, Gobierno: tema-1 ya está
 *    vinculado en el Tema 1) y 6 (bienes locales + reglamentos y
 *    ordenanzas, dos canónicos distintos) van como temas nuevos dedicados
 *    (tema-336 y tema-337). La Parte segunda usa tema-338 a tema-377
 *    (slug = 327 + número oficial).
 *
 * Uso: node --env-file=.env.local scripts/seed-policia-local-setup-y-parte-comun.mjs
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

const PUESTO_SLUG = "policia-local";
const OPOSICION_SLUG = `${PUESTO_SLUG}-ayto-zaragoza`;
const NOMBRE = "Policía Local";

const TEMAS_PARTE_PRIMERA = [
  { temaSlug: "tema-1", numero: 1, secciones: ["antecedentes-estructura", "titulo-preliminar", "titulo-1-cap-1", "titulo-1-cap-2", "titulo-1-cap-3", "titulo-1-cap-4", "titulo-1-cap-5"] },
  { temaSlug: "tema-3", numero: 3, secciones: ["organizacion-territorial-estado", "titulo-preliminar", "titulo-2-cap-1", "titulo-2-cap-2", "titulo-2-cap-3", "titulo-2-cap-4", "titulo-3", "titulo-5", "titulo-6"] },
  { temaSlug: "tema-299", numero: 4, secciones: null },
  { temaSlug: "tema-14", numero: 5, secciones: null },
  { temaSlug: "tema-300", numero: 7, secciones: ["presupuesto-general-entidad-local", "ingresos-gastos-locales"] },
  { temaSlug: "tema-43", numero: 8, secciones: ["clases-empleados-publicos-derechos-deberes", "peculiaridades-funcion-publica-local"] },
  { temaSlug: "tema-301", numero: 9, secciones: null },
  { temaSlug: "tema-302", numero: 10, secciones: null },
];

console.log(`🏛️  Dando de alta ${NOMBRE}...`);
await upsert("oposiciones", [{
  slug: OPOSICION_SLUG,
  nombre: NOMBRE,
  organismo: "Ayuntamiento de Zaragoza",
  descripcion_corta: `Preparación online para ${NOMBRE} del Ayuntamiento de Zaragoza (Cuerpo de la Policía Local, C1): temario, test, casos prácticos y simulacros.`,
  descripcion_larga:
    `Temario interactivo para preparar la oposición de Policía del Cuerpo de la ${NOMBRE} del Ayuntamiento de Zaragoza (turno libre, Escala de Administración Especial, Subescala de Servicios Especiales, Clase Policía Local y sus auxiliares, grupo C1): los 50 temas oficiales del Anexo I —materias comunes y materias específicas: Código Penal, Ley de Enjuiciamiento Criminal, seguridad ciudadana, tráfico y seguridad vial, normativa policial de Aragón y ordenanzas municipales de Zaragoza.`,
  activa: true,
  organismo_slug: "ayuntamiento-zaragoza",
  puesto_slug: PUESTO_SLUG,
}], "slug");

console.log("\n📦 Dando de alta los bloques...");
const bloques = await upsert("bloques", [
  {
    oposicion_slug: OPOSICION_SLUG,
    slug: "bloque-1",
    titulo: "Parte primera — Materias comunes",
    descripcion: "Temas 1 a 10: Constitución, instituciones del Estado, organización territorial y Estatuto de Autonomía de Aragón, Administración Pública y procedimiento administrativo, el municipio, bienes y ordenanzas locales, presupuesto, empleo público, derechos y deberes de los funcionarios, situaciones administrativas, Seguridad Social y prevención de riesgos laborales.",
    orden: 1,
  },
  {
    oposicion_slug: OPOSICION_SLUG,
    slug: "bloque-2",
    titulo: "Parte segunda — Materias específicas",
    descripcion: "Temas 11 a 50: policía y seguridad, marginación y drogas, Código Penal (parte general y delitos), menores, Ley de Enjuiciamiento Criminal, igualdad y violencia de género, Fuerzas y Cuerpos de Seguridad, seguridad ciudadana, armas, Reglamento del Cuerpo y coordinación de Policías Locales de Aragón, tráfico y seguridad vial, ordenanzas municipales de Zaragoza, el municipio, primeros auxilios e informática, transmisiones, potestad sancionadora, espectáculos públicos y disciplina urbanística.",
    orden: 2,
  },
], "oposicion_slug,slug");
const bloqueId = Object.fromEntries(bloques.map((b) => [b.slug, b.id]));

console.log("\n📚 Enlazando los temas canónicos reutilizados de la Parte primera...");
await upsert("tema_oposicion", TEMAS_PARTE_PRIMERA.map((t) => ({
  tema_slug: t.temaSlug,
  oposicion_slug: OPOSICION_SLUG,
  bloque_id: bloqueId["bloque-1"],
  numero: t.numero,
  orden: t.numero,
  es_premium: false,
  publicado: true,
  secciones_incluidas: t.secciones,
})), "tema_slug,oposicion_slug");

console.log(`\n✅ ${NOMBRE} dado de alta.`);
console.log(`   bloque-1=${bloqueId["bloque-1"]}\n   bloque-2=${bloqueId["bloque-2"]}`);
