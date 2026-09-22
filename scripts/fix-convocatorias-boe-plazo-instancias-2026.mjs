/**
 * Marca como 'abierta' las 16 convocatorias (CONV 4/2026 del Ayuntamiento
 * de Zaragoza) cuyo plazo de instancias arrancó de verdad con la
 * Resolución de 7 de septiembre de 2026 publicada en el BOE núm. 227 de
 * 14 de septiembre de 2026 (BOE-A-2026-19150), y actualiza
 * `plazo_instancias` con las fechas reales y `enlaces_oficiales` con el
 * enlace a esa resolución.
 *
 * Requiere haber aplicado antes supabase/migrations/0016_convocatorias_estado.sql
 * (columna `estado`) en el SQL Editor de Supabase.
 *
 * Fecha de cierre real: 5 de octubre de 2026, no el 4 — el vigésimo día
 * natural cae en domingo y el plazo se prorroga al primer día hábil
 * siguiente (art. 30.5 Ley 39/2015). Verificado en esta sesión.
 *
 * Oficial Fontanero queda fuera a propósito: no está en esta resolución
 * del BOE (sus bases 2026 siguen sin publicarse), sigue en
 * 'pendiente_publicacion'.
 *
 * Uso: node --env-file=.env.local scripts/fix-convocatorias-boe-plazo-instancias-2026.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!URL_BASE || !SERVICE_KEY) {
  console.error("❌ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

const OPOSICIONES = [
  "auxiliar-administrativo-ayto-zaragoza",
  "oficial-mantenimiento-ayto-zaragoza",
  "oficial-instalaciones-deportivas-ayto-zaragoza",
  "oficial-agente-inspector-ayto-zaragoza",
  "oficial-guardallaves-ayto-zaragoza",
  "oficial-albanil-ayto-zaragoza",
  "oficial-herrero-ayto-zaragoza",
  "oficial-electricista-ayto-zaragoza",
  "oficial-mecanico-ayto-zaragoza",
  "oficial-cementerio-ayto-zaragoza",
  "oficial-planta-potabilizadora-ayto-zaragoza",
  "oficial-carpintero-ayto-zaragoza",
  "oficial-conductor-general-ayto-zaragoza",
  "oficial-conductor-maquinaria-pesada-ayto-zaragoza",
  "oficial-pintor-general-ayto-zaragoza",
  "oficial-pintor-grafica-ayto-zaragoza",
];

const PLAZO_INSTANCIAS =
  "20 días naturales a partir del día siguiente a la publicación del extracto de la convocatoria en el Boletín Oficial del Estado (BOE) — del 15 de septiembre al 5 de octubre de 2026 (BOE núm. 227, de 14 de septiembre de 2026, BOE-A-2026-19150). El vigésimo día natural, 4 de octubre, es domingo, por lo que el plazo se prorroga al primer día hábil siguiente conforme al art. 30.5 de la Ley 39/2015.";

const ENLACE_BOE = {
  titulo: "Resolución que abre el plazo de instancias (BOE núm. 227, 14 de septiembre de 2026, BOE-A-2026-19150)",
  url: "https://www.boe.es/boe/dias/2026/09/14/pdfs/BOE-A-2026-19150.pdf",
};

const ULTIMA_ACTUALIZACION = "22 de septiembre de 2026";

let actualizadas = 0;
for (const slug of OPOSICIONES) {
  const res = await fetch(`${URL_BASE}/rest/v1/convocatorias?oposicion_slug=eq.${slug}&select=enlaces_oficiales`, {
    headers: HEADERS,
  });
  const [fila] = await res.json();
  if (!fila) {
    console.error(`❌ No existe convocatoria para ${slug}`);
    process.exit(1);
  }

  const enlaces = fila.enlaces_oficiales ?? [];
  const yaTieneEnlaceBoe = enlaces.some((e) => e.url === ENLACE_BOE.url);
  const nuevosEnlaces = yaTieneEnlaceBoe ? enlaces : [ENLACE_BOE, ...enlaces];

  const patch = await fetch(`${URL_BASE}/rest/v1/convocatorias?oposicion_slug=eq.${slug}`, {
    method: "PATCH",
    headers: { ...HEADERS, Prefer: "return=representation" },
    body: JSON.stringify({
      estado: "abierta",
      plazo_instancias: PLAZO_INSTANCIAS,
      enlaces_oficiales: nuevosEnlaces,
      ultima_actualizacion: ULTIMA_ACTUALIZACION,
    }),
  });
  if (!patch.ok) {
    console.error(`❌ Error actualizando ${slug}: ${patch.status} ${await patch.text()}`);
    process.exit(1);
  }
  console.log(`   ✓ ${slug} → abierta`);
  actualizadas++;
}

console.log(`\n✅ ${actualizadas}/${OPOSICIONES.length} convocatorias marcadas como abiertas.`);
