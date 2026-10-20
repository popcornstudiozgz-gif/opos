/**
 * Da de alta bombero-conductor-ayto-zaragoza: la oposición, sus 3 bloques
 * y los 4 temas de la Parte I que se cubren reutilizando temas canónicos.
 *
 * Fuente del temario: bases específicas CONV 8.1/2026 (bases2107.pdf, BOP
 * núm. 170 de 27-07-2026, BOE núm. 227 de 14-09-2026), leídas íntegras:
 * 37 plazas de Bombera/o Conductor/a (C1), Anexo I con 40 temas (Parte I,
 * temas 1-8, materias comunes; Parte II, temas 9-40, materias del Servicio
 * contra Incendios) y Anexo III (callejero y polígonos de la segunda prueba
 * del primer ejercicio).
 *
 * A diferencia de las "Oficial X", aquí `numero` coincide con el número
 * oficial del tema (1-40; el callejero va como 41), porque con 40 temas un
 * desfase confundiría al opositor. Como cada `numero` admite un solo tema
 * canónico, la Parte I se reparte así:
 *  - Tema 1 (Constitución: antecedentes, estructura, principios, título
 *    preliminar) → tema-1, recortado a título preliminar + la sección
 *    "antecedentes-estructura" (añadida por fix-tema-1-antecedentes-
 *    estructura.mjs, que debe ejecutarse antes que este script).
 *  - Tema 2 (organización territorial del Estado; Estatuto de Aragón:
 *    títulos preliminar, II, III, V y VI) → tema-3 recortado.
 *  - Tema 4 (municipio: población, territorio, organización, gran
 *    población, competencias) → tema-14 completo.
 *  - Tema 6 (empleo público; personal de las corporaciones locales:
 *    estructura y clases) → tema-43 recortado.
 *  - Temas 3, 5, 7 y 8 mezclan materias que en este proyecto viven en 2-3
 *    temas canónicos distintos (LPACAP + LRJSP + CE; presupuesto + Ordenanza
 *    de Transparencia de Zaragoza; incompatibilidades + responsabilidad +
 *    igualdad; situaciones administrativas + Seguridad Social + PRL): van
 *    como temas nuevos dedicados (tema-299 a tema-302), en sus scripts.
 *
 * Uso: node --env-file=.env.local scripts/seed-bombero-conductor-setup-y-parte-comun.mjs
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

const PUESTO_SLUG = "bombero-conductor";
const OPOSICION_SLUG = `${PUESTO_SLUG}-ayto-zaragoza`;
const NOMBRE = "Bombero/a Conductor/a";

const TEMAS_PARTE_I = [
  { temaSlug: "tema-1", numero: 1, secciones: ["antecedentes-estructura", "titulo-preliminar"] },
  { temaSlug: "tema-3", numero: 2, secciones: ["organizacion-territorial-estado", "titulo-preliminar", "titulo-2-cap-1", "titulo-2-cap-2", "titulo-2-cap-3", "titulo-2-cap-4", "titulo-3", "titulo-5", "titulo-6"] },
  { temaSlug: "tema-14", numero: 4, secciones: null },
  { temaSlug: "tema-43", numero: 6, secciones: ["clases-empleados-publicos-derechos-deberes", "peculiaridades-funcion-publica-local"] },
];

console.log(`🏛️  Dando de alta ${NOMBRE}...`);
await upsert("oposiciones", [{
  slug: OPOSICION_SLUG,
  nombre: NOMBRE,
  organismo: "Ayuntamiento de Zaragoza",
  descripcion_corta: `Preparación online para ${NOMBRE} del Ayuntamiento de Zaragoza (Cuerpo de Bomberos, C1): temario, test, callejero y simulacros.`,
  descripcion_larga:
    `Temario interactivo para preparar la oposición de ${NOMBRE} del Ayuntamiento de Zaragoza (turno libre, Escala de Administración Especial, Subescala de Servicios Especiales, Clase Servicio contra Incendios, Salvamento y Protección Civil, grupo C1): los 40 temas oficiales del Anexo I —materias comunes y materias propias del Servicio contra Incendios— y el callejero y los polígonos industriales del Anexo III para la prueba de conocimiento del municipio.`,
  activa: true,
  organismo_slug: "ayuntamiento-zaragoza",
  puesto_slug: PUESTO_SLUG,
}], "slug");

console.log("\n📦 Dando de alta los bloques...");
const bloques = await upsert("bloques", [
  {
    oposicion_slug: OPOSICION_SLUG,
    slug: "bloque-1",
    titulo: "Parte I — Materias comunes",
    descripcion: "Temas 1 a 8: Constitución, organización territorial y Estatuto de Autonomía de Aragón, Administración Pública y procedimiento administrativo, el municipio, presupuesto y transparencia municipal, empleo público, derechos y deberes de los funcionarios, situaciones administrativas, Seguridad Social y prevención de riesgos laborales.",
    orden: 1,
  },
  {
    oposicion_slug: OPOSICION_SLUG,
    slug: "bloque-2",
    titulo: "Parte II — Servicio contra Incendios, de Salvamento y Protección Civil",
    descripcion: "Temas 9 a 40: organización del Servicio, seguridad en la conducción y mecánica, vehículos del SCIS, fuego e incendios de interiores, agentes y materiales de extinción, protección respiratoria, protocolos de intervención, construcción y apeos, electricidad, accidentes de tráfico, mercancías peligrosas, hidráulica y bombas, protección contra incendios, primeros auxilios, comunicaciones, CTE DB-SI, Plan Municipal de Protección Civil y normativa aragonesa de bomberos.",
    orden: 2,
  },
  {
    oposicion_slug: OPOSICION_SLUG,
    slug: "bloque-3",
    titulo: "Conocimiento del municipio de Zaragoza",
    descripcion: "Segunda prueba del primer ejercicio: callejero (calles con su entrada y salida) y polígonos industriales del Anexo III de las bases, además de los parques de bomberos y los puntos de referencia que fijan las bases generales.",
    orden: 3,
  },
], "oposicion_slug,slug");
const bloqueId = Object.fromEntries(bloques.map((b) => [b.slug, b.id]));

console.log("\n📚 Enlazando los temas canónicos reutilizados de la Parte I...");
await upsert("tema_oposicion", TEMAS_PARTE_I.map((t) => ({
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
console.log(`   bloque-1=${bloqueId["bloque-1"]}\n   bloque-2=${bloqueId["bloque-2"]}\n   bloque-3=${bloqueId["bloque-3"]}`);
