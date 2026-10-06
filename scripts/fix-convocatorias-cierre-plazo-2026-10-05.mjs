/**
 * Marca como 'cerrada' las 16 convocatorias de la CONV 4/2026 del
 * Ayuntamiento de Zaragoza que abrió scripts/fix-convocatorias-boe-plazo-instancias-2026.mjs:
 * su plazo de instancias terminó el 5 de octubre de 2026 (BOE-A-2026-19150).
 *
 * A partir de la migración 0017 (columna `plazo_fin`) este paso ya no hace
 * falta: la app deja de mostrar una convocatoria como abierta en cuanto
 * pasa su `plazo_fin`. Este script solo deja el dato `estado` coherente.
 *
 * Uso: node --env-file=.env.local scripts/fix-convocatorias-cierre-plazo-2026-10-05.mjs
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

const ULTIMA_ACTUALIZACION = "6 de octubre de 2026";

let actualizadas = 0;
for (const slug of OPOSICIONES) {
  const patch = await fetch(`${URL_BASE}/rest/v1/convocatorias?oposicion_slug=eq.${slug}`, {
    method: "PATCH",
    headers: { ...HEADERS, Prefer: "return=representation" },
    body: JSON.stringify({ estado: "cerrada", ultima_actualizacion: ULTIMA_ACTUALIZACION }),
  });
  const filas = patch.ok ? await patch.json() : [];
  if (!patch.ok || filas.length !== 1) {
    console.error(`❌ Error actualizando ${slug}: ${patch.status} ${patch.ok ? "fila no encontrada" : await patch.text()}`);
    process.exit(1);
  }
  console.log(`   ✓ ${slug} → cerrada`);
  actualizadas++;
}

console.log(`\n✅ ${actualizadas}/${OPOSICIONES.length} convocatorias marcadas como cerradas.`);
