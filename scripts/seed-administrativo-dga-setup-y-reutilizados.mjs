/**
 * Da de alta administrativo-dga: Administrativo del Gobierno de Aragón
 * (Cuerpo Ejecutivo, Escala General Administrativa, Administrativos, C1),
 * sus 5 bloques y los 7 temas que se cubren reutilizando temas canónicos.
 *
 * Fuente del temario: Anexo XXV de la Resolución de 25-11-2025 del Director
 * General de la Función Pública (BOA núm. 243, de 17-12-2025; el anexo solo
 * se publica en mia.aragon.es con CSV CSVS60B0W34IP1Q0XFIL y como PDF en
 * aragon.es/documents/d/guest/administrativos-1-pdf), leído íntegro: 5 temas
 * de materias comunes y 30 de materias específicas. Laguna del propio PDF:
 * el enunciado del tema específico 24 está cortado a mitad de frase («Pagos
 * por ordenaciones presupuestarias: pagos por»); se completa con el
 * programa anterior (BOA núm. 139, de 19-07-2022), que tiene idénticos los
 * temas 23 y 25 y continúa «…pagos por obligaciones de ejercicios cerrados.
 * Pago "en firme" y "a justificar". Los anticipos de caja fija».
 *
 * `numero` es correlativo (1-35): materias comunes 1-5 y materias
 * específicas 6-35 (específico N = número 5 + N), como en las "Oficial X".
 * Los temas nuevos usan slug = 372 + número (tema-378 a tema-407); quedan
 * libres tema-394 y tema-406 porque esos dos números reutilizan canónicos:
 *  - 1 (Constitución completa, con Corona, Cortes, Poder Judicial, TC y
 *    Defensor del Pueblo) → tema-1 con el recorte de Auxiliar DGA más
 *    `antecedentes-estructura` («estructura, contenido y principios»).
 *  - 2 (organización territorial) → tema-29 completo (enunciado idéntico al
 *    del Tema 2 de Auxiliar DGA).
 *  - 3 (Estatuto, organización institucional, Cortes y Justicia de Aragón)
 *    → tema-3 con el recorte de Auxiliar DGA.
 *  - 4 (órganos de gobierno y administración, sector público, Consejo de
 *    Estado y Consejo Consultivo) → tema-30 completo (mismo enunciado).
 *  - 5 (prevención de riesgos laborales: derechos y obligaciones) →
 *    tema-25 completo.
 *  - 22 (específico 17: representación y negociación de las condiciones
 *    de trabajo, conflictos y convenios colectivos) → tema-32 recortado a
 *    `negociacion-laboral-conflictos-convenios` (EBEP, arts. 31-46).
 *  - 34 (específico 29: Internet, Web, navegadores, URL, buscadores,
 *    seguridad en la Web e IA) → tema-36 recortado a sus dos secciones de
 *    Internet; el específico 28 (hardware, software, almacenamiento,
 *    sistemas operativos y seguridad informática) va como tema nuevo
 *    porque tema-36 solo puede vincularse una vez.
 * El resto (específicos 1-16, 18-28 y 30) no tiene un canónico que cubra
 * entero lo que pide el programa y va como tema nuevo dedicado.
 *
 * Uso: node --env-file=.env.local scripts/seed-administrativo-dga-setup-y-reutilizados.mjs
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

const OPOSICION_SLUG = "administrativo-dga";
const NOMBRE = "Administrativo";

const CONSTITUCION_AUX_DGA = ["titulo-preliminar", "titulo-1-cap-1", "titulo-1-cap-2", "titulo-1-cap-3", "titulo-1-cap-4", "titulo-1-cap-5", "titulo-2", "titulo-3-cap-1", "titulo-3-cap-2", "titulo-3-cap-3", "titulo-6", "titulo-9"];
const ESTATUTO_AUX_DGA = ["titulo-preliminar", "titulo-1-cap-1", "titulo-1-cap-2", "titulo-2-cap-1", "titulo-2-cap-2", "titulo-2-cap-3", "titulo-2-cap-4", "titulo-3", "titulo-4-cap-1", "titulo-4-cap-2", "titulo-5", "titulo-6", "titulo-7-cap-1", "titulo-7-cap-2", "titulo-7-cap-3", "titulo-7-cap-4", "titulo-8-cap-1", "titulo-8-cap-2", "titulo-8-cap-3", "titulo-8-cap-4", "titulo-9"];

const TEMAS_REUTILIZADOS = [
  { temaSlug: "tema-1", numero: 1, bloque: "bloque-1", secciones: ["antecedentes-estructura", ...CONSTITUCION_AUX_DGA] },
  { temaSlug: "tema-29", numero: 2, bloque: "bloque-1", secciones: null },
  { temaSlug: "tema-3", numero: 3, bloque: "bloque-1", secciones: ESTATUTO_AUX_DGA },
  { temaSlug: "tema-30", numero: 4, bloque: "bloque-1", secciones: null },
  { temaSlug: "tema-25", numero: 5, bloque: "bloque-1", secciones: null },
  { temaSlug: "tema-32", numero: 22, bloque: "bloque-3", secciones: ["negociacion-laboral-conflictos-convenios"] },
  { temaSlug: "tema-36", numero: 34, bloque: "bloque-5", secciones: ["internet-protocolos-servicios", "navegadores-buscadores-ia-seguridad"] },
];

console.log(`🏛️  Dando de alta ${NOMBRE} (Gobierno de Aragón)...`);
await upsert("oposiciones", [{
  slug: OPOSICION_SLUG,
  nombre: NOMBRE,
  organismo: "Gobierno de Aragón",
  descripcion_corta: "Preparación online para Administrativo (C1), Cuerpo Ejecutivo, Escala General Administrativa, de la Administración de la Comunidad Autónoma de Aragón: temario, test, casos prácticos y simulacros.",
  descripcion_larga:
    "Temario interactivo para preparar la oposición de Administrativo del Gobierno de Aragón (Cuerpo Ejecutivo de la Administración General de la Comunidad Autónoma de Aragón, Escala General Administrativa, subgrupo C1): los 35 temas oficiales del programa de materias (Resolución de 25 de noviembre de 2025, Anexo XXV) —5 de materias comunes y 30 de materias específicas: derecho y procedimiento administrativo, contratación y bienes públicos, personal de la Administración aragonesa, presupuesto, gasto y contabilidad de la Comunidad Autónoma, informática y administración electrónica.",
  activa: true,
  organismo_slug: "gobierno-aragon",
  puesto_slug: "administrativo",
}], "slug");

console.log("\n📦 Dando de alta los bloques...");
const bloques = await upsert("bloques", [
  {
    oposicion_slug: OPOSICION_SLUG, slug: "bloque-1", orden: 1,
    titulo: "Materias comunes",
    descripcion: "Temas 1 a 5 del programa de materias comunes: Constitución Española, organización territorial del Estado, Estatuto de Autonomía de Aragón, órganos de gobierno y administración de la Comunidad Autónoma y prevención de riesgos laborales.",
  },
  {
    oposicion_slug: OPOSICION_SLUG, slug: "bloque-2", orden: 2,
    titulo: "Materias específicas — Derecho administrativo",
    descripcion: "Temas 6 a 15 (temas 1 a 10 del programa de materias específicas): fuentes del Derecho Administrativo, procedimiento administrativo, interesados y transparencia, acto administrativo, revisión y recursos, jurisdicción contencioso-administrativa, bienes públicos, contratos del sector público, potestad sancionadora y responsabilidad patrimonial.",
  },
  {
    oposicion_slug: OPOSICION_SLUG, slug: "bloque-3", orden: 3,
    titulo: "Materias específicas — Personal de la Administración de Aragón",
    descripcion: "Temas 16 a 23 (temas 11 a 18 del programa de materias específicas): estructura de la Función Pública aragonesa, selección y provisión, situaciones, derechos y deberes, retribuciones, incompatibilidades y régimen disciplinario, personal laboral, Seguridad Social, representación y negociación, personal estatutario y de Justicia.",
  },
  {
    oposicion_slug: OPOSICION_SLUG, slug: "bloque-4", orden: 4,
    titulo: "Materias específicas — Gestión presupuestaria y económica",
    descripcion: "Temas 24 a 32 (temas 19 a 27 del programa de materias específicas): el presupuesto y el de la Comunidad Autónoma de Aragón, financiación autonómica, créditos y modificaciones, ejecución del gasto y del ingreso, pagos, contabilidad pública, control del gasto y nóminas.",
  },
  {
    oposicion_slug: OPOSICION_SLUG, slug: "bloque-5", orden: 5,
    titulo: "Materias específicas — Informática y administración electrónica",
    descripcion: "Temas 33 a 35 (temas 28 a 30 del programa de materias específicas): informática básica, Internet e inteligencia artificial, y administración electrónica.",
  },
], "oposicion_slug,slug");
const bloqueId = Object.fromEntries(bloques.map((b) => [b.slug, b.id]));

console.log("\n📚 Enlazando los temas canónicos reutilizados...");
await upsert("tema_oposicion", TEMAS_REUTILIZADOS.map((t) => ({
  tema_slug: t.temaSlug,
  oposicion_slug: OPOSICION_SLUG,
  bloque_id: bloqueId[t.bloque],
  numero: t.numero,
  orden: t.numero,
  es_premium: false,
  publicado: true,
  secciones_incluidas: t.secciones,
})), "tema_slug,oposicion_slug");

console.log(`\n✅ ${NOMBRE} (DGA) dado de alta.`);
for (const b of bloques) console.log(`   ${b.slug}=${b.id}`);
