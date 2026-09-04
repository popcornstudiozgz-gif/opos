/**
 * Da de alta oficial-fontanero-ayto-zaragoza: la oposición, sus 2 bloques
 * (bloque-1 "parte común" con los 6 temas ya enlazados, bloque-2 "parte
 * específica" vacío) — mismo patrón que scripts/seed-oficial-x-parte-
 * comun.mjs, para el puesto "Oficial Fontanero" que faltaba de esa tanda.
 *
 * Fuente del temario: bases del turno libre del Ayuntamiento de Zaragoza
 * publicadas en el BOPZ núm. 147 de 30-06-2025 (bases1716.pdf — convocatoria
 * ya resuelta, con 4 plazas de Oficial Fontanero de las OEP/22/24/25). La
 * "parte primera" (4 temas oficiales) es, para Oficial Fontanero, literalmente
 * el mismo contenido que ya usan los demás "Oficial X" de esta web —
 * Constitución + Estatuto de Aragón + LPACAP-procedimiento común / Ley de
 * capitalidad de Zaragoza + Haciendas Locales / empleados públicos /
 * igualdad efectiva + PRL —, así que se reutilizan los mismos 6 temas
 * canónicos ya verificados (tema-1, tema-3, tema-7, tema-42, tema-43,
 * tema-44), igual que en seed-oficial-x-parte-comun.mjs.
 *
 * La oferta de empleo 2026 (id=2111 en zaragoza.es/oferta) prevé UNA plaza
 * nueva de Oficial Fontanero, pero sus bases específicas propias no están
 * publicadas todavía (no hay "bases2111.pdf"): por eso este script NO crea
 * fila en `convocatorias` — solo usa bases1716.pdf como fuente del temario
 * oficial (que no cambia de una convocatoria a otra), a la espera de que se
 * publiquen las bases de la convocatoria 2026 para poder sembrar la ficha
 * de convocatoria con datos vigentes (plazo de instancias, etc.).
 *
 * La parte específica (temas 7-22, 16 temas nuevos) se sembrará tema a tema
 * en scripts separados (seed-tema-NNN-*.mjs), reutilizando donde encaje el
 * sourcing ya verificado en otras "Oficial X" con solapamiento temático:
 * CTE-HS4/HS5 (nuevo), OMECGIA y RD 1027/2007 RITE (nuevos), PPRL-1601
 * espacios confinados (ya verificado en Guardallaves/Potabilizadora),
 * RD 396/2006 amianto (ya verificado en Albañil), soldadura/oxicorte
 * (ya sourceado en Herrero, aunque con más profundidad — Fontanero lo pide
 * como "nociones básicas").
 *
 * Uso: node --env-file=.env.local scripts/seed-oficial-fontanero-setup-y-parte-comun.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!URL_BASE || !SERVICE_KEY) {
  console.error("❌ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

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

const PUESTO_SLUG = "oficial-fontanero";
const OPOSICION_SLUG = `${PUESTO_SLUG}-ayto-zaragoza`;
const NOMBRE = "Oficial Fontanero";

// ── Parte común: los mismos 6 temas canónicos, con el mismo recorte, ya
// usados para el resto de "Oficial X" de esta web. ────────────────────────
const TEMAS_PARTE_COMUN = [
  { temaSlug: "tema-1", numero: 1, secciones: ["titulo-preliminar", "titulo-4", "titulo-8-cap-1", "titulo-8-cap-2"] },
  { temaSlug: "tema-3", numero: 2, secciones: ["titulo-preliminar", "titulo-2-cap-1", "titulo-2-cap-2", "titulo-2-cap-3", "titulo-2-cap-4"] },
  { temaSlug: "tema-7", numero: 3, secciones: null },
  { temaSlug: "tema-42", numero: 4, secciones: ["ley-capitalidad-zaragoza-disposiciones-generales", "gobierno-administracion-municipio-zaragoza", "haciendas-locales-recursos-impuestos-municipales"] },
  { temaSlug: "tema-43", numero: 5, secciones: ["clases-empleados-publicos-derechos-deberes", "adquisicion-perdida-relacion-servicio", "regimen-disciplinario-empleados-publicos", "peculiaridades-funcion-publica-local"] },
  { temaSlug: "tema-44", numero: 6, secciones: ["ley-igualdad-efectiva-principio-tutela-discriminacion", "plan-igualdad-ayuntamiento-zaragoza", "ley-prl-objeto-caracter-norma"] },
];

const PARTE_ESPECIFICA_DESCRIPCION =
  "Hidráulica y conceptos fundamentales de fontanería (caudal, presión, golpe de ariete), instalaciones interiores de agua fría, redes generales de distribución a presión, elementos de las instalaciones (tuberías, válvulas, grifería, contadores), acometidas domiciliarias y la Ordenanza municipal para la ecoeficiencia y la calidad de la gestión integral del agua, instalaciones de agua caliente sanitaria, instalaciones de calefacción, bombas y grupos de presión, sistemas contra incendios, redes de evacuación y desagües, máquinas y herramientas, soldadura de metales, corte de metales (oxicorte), normativa de redes de distribución de agua potable y saneamiento, y prevención de riesgos laborales específicos de fontanería (amianto, espacios confinados, entibaciones).";

console.log(`🏛️  Dando de alta ${NOMBRE}...`);
const [oposicion] = await upsert(
  "oposiciones",
  [
    {
      slug: OPOSICION_SLUG,
      nombre: NOMBRE,
      organismo: "Ayuntamiento de Zaragoza",
      descripcion_corta: `Preparación online para ${NOMBRE} del Ayuntamiento de Zaragoza (Escala de Administración Especial, C2).`,
      descripcion_larga:
        `Temario interactivo para preparar la oposición de ${NOMBRE} del Ayuntamiento de Zaragoza (turno libre ordinario, Escala de Administración Especial, C2): 20 temas oficiales organizados en 2 bloques — una parte común compartida con el resto de puestos de "Oficial" de esta convocatoria, y una parte específica de fontanería.`,
      activa: true,
      organismo_slug: "ayuntamiento-zaragoza",
      puesto_slug: PUESTO_SLUG,
    },
  ],
  "slug"
);

console.log("\n📦 Dando de alta los bloques (parte común + parte específica)...");
const bloquesInsertados = await upsert(
  "bloques",
  [
    {
      oposicion_slug: OPOSICION_SLUG,
      slug: "bloque-1",
      titulo: "Bloque 1 — Parte común",
      descripcion:
        "Constitución Española, Estatuto de Autonomía de Aragón y disposiciones sobre el procedimiento administrativo común; Ley de capitalidad de Zaragoza y Haciendas Locales; empleados públicos; igualdad efectiva y prevención de riesgos laborales. Temario idéntico al de los demás puestos de \"Oficial\" de esta convocatoria.",
      orden: 1,
    },
    {
      oposicion_slug: OPOSICION_SLUG,
      slug: "bloque-2",
      titulo: "Bloque 2 — Parte específica",
      descripcion: PARTE_ESPECIFICA_DESCRIPCION,
      orden: 2,
    },
  ],
  "oposicion_slug,slug"
);

const bloque1Id = bloquesInsertados.find((b) => b.slug === "bloque-1").id;
const bloque2Id = bloquesInsertados.find((b) => b.slug === "bloque-2").id;

console.log("\n📚 Enlazando la parte común (6 temas canónicos)...");
const temaOposicionFilas = TEMAS_PARTE_COMUN.map((t) => ({
  tema_slug: t.temaSlug,
  oposicion_slug: OPOSICION_SLUG,
  bloque_id: bloque1Id,
  numero: t.numero,
  orden: t.numero,
  es_premium: false,
  publicado: true,
  secciones_incluidas: t.secciones,
}));
await upsert("tema_oposicion", temaOposicionFilas, "tema_slug,oposicion_slug");

console.log(`\n✅ ${NOMBRE} dado de alta. bloque-1=${bloque1Id} bloque-2=${bloque2Id}`);
console.log("   Pendiente: 16 temas de parte específica (numero 7-22) y convocatoria (a la espera de bases2026 publicadas).");
