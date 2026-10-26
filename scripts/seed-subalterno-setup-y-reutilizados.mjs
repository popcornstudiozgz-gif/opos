/**
 * Da de alta subalterno-ayto-zaragoza: Subalterna/o del Ayuntamiento de
 * Zaragoza (Escala de Administración General, Subescala Subalterna;
 * Agrupación Profesional D.A. 6.ª TREBEP), convocatoria independiente
 * exclusiva para el turno libre de reserva de personas con discapacidad
 * intelectual; su bloque y los 4 temas que reutilizan canónicos.
 *
 * Fuente del temario: Anexo I de las bases específicas de la CONV 5/2026
 * (bases2125.pdf, decreto de 15-07-2026, BOP de Zaragoza núm. 170 de
 * 27-07-2026), leído íntegro: 10 temas para Subalterna/o (las mismas bases
 * convocan Operaria/o Especialista, ya incorporada).
 *
 * `numero` = número oficial del tema (1-10), un único bloque. Temas nuevos:
 * slug = 414 + número (tema-417, 418, 420, 421, 422 y 423); reutilizan
 * canónicos los temas 1, 2, 5 y 10, cuyo enunciado es literalmente el mismo
 * que en Operaria/o Especialista o lo contiene:
 *  - 1 → tema-408 (enunciado idéntico al Tema 1 de Operario).
 *  - 2 → tema-409 (enunciado idéntico al Tema 2 de Operario).
 *  - 5 (Manual de Atención a la Ciudadanía, web municipal, quejas y
 *    sugerencias, cita previa) → tema-410 completo, ampliado con la sección
 *    `web-quejas-cita-previa` por
 *    seed-tema-410-ampliacion-web-quejas-cita-previa.mjs; en Operario (cuyo
 *    Tema 3 es solo el Manual) se recorta a las cinco secciones del Manual.
 *  - 10 → tema-2 con el mismo recorte que en Operario (enunciado idéntico).
 *
 * Uso: node --env-file=.env.local scripts/seed-subalterno-setup-y-reutilizados.mjs
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

const OPOSICION_SLUG = "subalterno-ayto-zaragoza";
const NOMBRE = "Subalterno/a";

const TEMAS_REUTILIZADOS = [
  { temaSlug: "tema-408", numero: 1, secciones: null },
  { temaSlug: "tema-409", numero: 2, secciones: null },
  { temaSlug: "tema-410", numero: 5, secciones: null },
  { temaSlug: "tema-2", numero: 10, secciones: ["loiemh-titulo-preliminar", "loiemh-titulo-1", "ley4-cap-1-disposiciones-generales", "ley4-cap-4-proteccion-apoyo-victimas", "plan-igualdad-zaragoza"] },
];

console.log(`🏛️  Dando de alta ${NOMBRE} (Ayuntamiento de Zaragoza)...`);
await upsert("oposiciones", [{
  slug: OPOSICION_SLUG,
  nombre: NOMBRE,
  organismo: "Ayuntamiento de Zaragoza",
  descripcion_corta: `Preparación online para ${NOMBRE} del Ayuntamiento de Zaragoza (turno reservado a personas con discapacidad intelectual, sin titulación exigida): temario, test, casos prácticos y simulacros.`,
  descripcion_larga:
    "Temario interactivo para preparar la oposición de Subalterna/o del Ayuntamiento de Zaragoza (Escala de Administración General, Subescala Subalterna, Agrupación Profesional de la D.A. 6.ª del TREBEP), convocada en exclusiva para el turno de reserva de personas con discapacidad intelectual: los 10 temas del Anexo I de la convocatoria CONV 5/2026 —Constitución, Estatuto y Ley de capitalidad; procedimiento y empleados públicos; el padrón municipal; documentos administrativos; atención a la ciudadanía, web municipal, quejas y cita previa; nociones de mantenimiento; trabajo de oficina, encuadernación y papel; sedes municipales, juntas y centros; prevención de riesgos del personal subalterno; e igualdad— con flashcards, preguntas tipo test de 3 opciones como en el examen y supuestos prácticos.",
  activa: true,
  organismo_slug: "ayuntamiento-zaragoza",
  puesto_slug: "subalterno",
}], "slug");

console.log("\n📦 Dando de alta el bloque...");
const [bloque] = await upsert("bloques", [{
  oposicion_slug: OPOSICION_SLUG, slug: "bloque-1", orden: 1,
  titulo: "Temario (Anexo I)",
  descripcion: "Los 10 temas del Anexo I de las bases específicas de la CONV 5/2026 para Subalterna/o: organización del Estado, de Aragón y de Zaragoza; procedimiento y empleados públicos; padrón; documentos administrativos; atención a la ciudadanía; mantenimiento básico; trabajo de oficina; sedes y centros municipales; prevención de riesgos; e igualdad.",
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
