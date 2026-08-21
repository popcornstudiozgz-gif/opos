/**
 * Asigna la columna `seccion` a las flashcards de tema-1 ya cargadas
 * (según el título/capítulo de origen en content-raw/constitucion-espanola/),
 * y limita el alcance de tema-1 para la oposición auxiliar-administrativo
 * a las secciones que de verdad entran en su temario oficial.
 *
 * Uso: node --env-file=.env.local scripts/seed-flashcards-tema-1-secciones.mjs
 */

const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const HEADERS = {
  apikey: SERVICE_KEY,
  Authorization: `Bearer ${SERVICE_KEY}`,
  "Content-Type": "application/json",
};

// Rangos de artículos → sección, en el orden real del texto constitucional.
// (anverso empieza siempre citando "art. N" o "arts. N-M", así que basta con
// mirar el primer número de artículo que aparece en el anverso.)
const RANGOS = [
  { hasta: 9, seccion: "titulo-preliminar" },
  { hasta: 13, seccion: "titulo-1-cap-1" }, // incluye el art. 10 (disp. generales)
  { hasta: 38, seccion: "titulo-1-cap-2" },
  { hasta: 52, seccion: "titulo-1-cap-3" },
  { hasta: 54, seccion: "titulo-1-cap-4" },
  { hasta: 55, seccion: "titulo-1-cap-5" },
  { hasta: 65, seccion: "titulo-2" },
  { hasta: 80, seccion: "titulo-3-cap-1" },
  { hasta: 92, seccion: "titulo-3-cap-2" },
  { hasta: 96, seccion: "titulo-3-cap-3" },
  { hasta: 107, seccion: "titulo-4" },
  { hasta: 116, seccion: "titulo-5" },
  { hasta: 127, seccion: "titulo-6" },
  { hasta: 136, seccion: "titulo-7" },
  { hasta: 139, seccion: "titulo-8-cap-1" },
  { hasta: 142, seccion: "titulo-8-cap-2" },
  { hasta: 158, seccion: "titulo-8-cap-3" },
  { hasta: 165, seccion: "titulo-9" },
  { hasta: 169, seccion: "titulo-10" },
  { hasta: Infinity, seccion: "disposiciones" },
];

function seccionDeArticulo(n) {
  return RANGOS.find((r) => n <= r.hasta).seccion;
}

async function main() {
  // Traemos todas las flashcards de tema-1 con su anverso, para extraer el nº de artículo.
  const res = await fetch(
    `${URL_BASE}/rest/v1/flashcards?tema_slug=eq.tema-1&select=id,anverso`,
    { headers: HEADERS }
  );
  const filas = await res.json();
  console.log(`📝 ${filas.length} flashcards de tema-1 a etiquetar...`);

  let sinArticulo = 0;
  const porSeccion = {};

  for (const fila of filas) {
    const m = fila.anverso.match(/art(?:s|ículo|ículos)?\.?\s*(\d+)/i);
    let seccion;
    if (m) {
      seccion = seccionDeArticulo(parseInt(m[1], 10));
    } else {
      // Cards de disposiciones adicionales/transitorias/derogatoria/final,
      // que no citan "art." en el anverso.
      seccion = "disposiciones";
      sinArticulo++;
    }
    porSeccion[seccion] = (porSeccion[seccion] || 0) + 1;

    const patch = await fetch(`${URL_BASE}/rest/v1/flashcards?id=eq.${fila.id}`, {
      method: "PATCH",
      headers: { ...HEADERS, Prefer: "return=minimal" },
      body: JSON.stringify({ seccion }),
    });
    if (!patch.ok) {
      console.error(`❌ Error en ${fila.id}: ${patch.status} ${await patch.text()}`);
      process.exit(1);
    }
  }

  console.log("✓ Reparto por sección:");
  for (const [s, n] of Object.entries(porSeccion)) console.log(`   ${s}: ${n}`);
  console.log(`   (${sinArticulo} sin número de artículo detectado → "disposiciones")`);

  // Limitar el alcance para auxiliar-administrativo: según su descripción de
  // temario ("Elaboración y aprobación. Estructura y título preliminar. La
  // Administración pública en la Constitución. Organización territorial del
  // Estado: principios generales y Administración local.")
  const SECCIONES_AUX_ADMIN = ["titulo-preliminar", "titulo-4", "titulo-8-cap-1", "titulo-8-cap-2"];
  const patchTO = await fetch(
    `${URL_BASE}/rest/v1/tema_oposicion?tema_slug=eq.tema-1&oposicion_slug=eq.auxiliar-administrativo`,
    {
      method: "PATCH",
      headers: { ...HEADERS, Prefer: "return=representation" },
      body: JSON.stringify({ secciones_incluidas: SECCIONES_AUX_ADMIN }),
    }
  );
  if (!patchTO.ok) {
    console.error(`❌ Error actualizando tema_oposicion: ${patchTO.status} ${await patchTO.text()}`);
    process.exit(1);
  }
  console.log("✅ tema_oposicion (auxiliar-administrativo, tema-1) limitado a:", SECCIONES_AUX_ADMIN);
}

main();
