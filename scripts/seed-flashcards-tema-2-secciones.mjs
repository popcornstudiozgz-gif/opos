/**
 * Re-etiqueta con secciones finas (título/capítulo) las flashcards de
 * tema-2 que se cargaron con una sección única por norma, y limita el
 * alcance para auxiliar-administrativo según su temario:
 * - LOIEMH: solo "el principio de igualdad y la tutela contra la
 *   discriminación" = Título I (arts. 3-13).
 * - Ley 4/2007 Aragón: solo "disposiciones generales" (Cap. I, arts. 1-4)
 *   y "medidas de protección y apoyo a las víctimas" (Cap. IV, arts. 18-31).
 * - Plan de Igualdad de Zaragoza: completo, sin restricción.
 *
 * Uso: node --env-file=.env.local scripts/seed-flashcards-tema-2-secciones.mjs
 */

const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const HEADERS = {
  apikey: SERVICE_KEY,
  Authorization: `Bearer ${SERVICE_KEY}`,
  "Content-Type": "application/json",
};

const RANGOS_LOIEMH = [
  { hasta: 2, seccion: "loiemh-titulo-preliminar" },
  { hasta: 13, seccion: "loiemh-titulo-1" },
  { hasta: 22, seccion: "loiemh-titulo-2-cap-1" },
  { hasta: 35, seccion: "loiemh-titulo-2-cap-2" },
  { hasta: 41, seccion: "loiemh-titulo-3" },
  { hasta: 50, seccion: "loiemh-titulo-4" },
  { hasta: 68, seccion: "loiemh-titulo-5" },
  { hasta: 72, seccion: "loiemh-titulo-6" },
  { hasta: 75, seccion: "loiemh-titulo-7" },
  { hasta: 78, seccion: "loiemh-titulo-8" },
  { hasta: Infinity, seccion: "loiemh-disposiciones" },
];

const RANGOS_LEY4 = [
  { hasta: 4, seccion: "ley4-cap-1-disposiciones-generales" },
  { hasta: 11, seccion: "ley4-cap-2-prevencion" },
  { hasta: 17, seccion: "ley4-cap-3-informacion-asesoramiento" },
  { hasta: 31, seccion: "ley4-cap-4-proteccion-apoyo-victimas" },
  { hasta: 36, seccion: "ley4-cap-5-prestaciones-economicas" },
  { hasta: Infinity, seccion: "ley4-disposiciones" },
];

function seccionDe(rangos, n) {
  return rangos.find((r) => n <= r.hasta).seccion;
}

async function retag(seccionActual, rangos) {
  const res = await fetch(
    `${URL_BASE}/rest/v1/flashcards?tema_slug=eq.tema-2&seccion=eq.${seccionActual}&select=id,anverso`,
    { headers: HEADERS }
  );
  const filas = await res.json();
  console.log(`📝 Re-etiquetando ${filas.length} flashcards de "${seccionActual}"...`);
  const porSeccion = {};
  for (const fila of filas) {
    const m = fila.anverso.match(/art(?:s|ículo|ículos)?\.?\s*(\d+)/i);
    const seccion = m ? seccionDe(rangos, parseInt(m[1], 10)) : rangos[rangos.length - 1].seccion;
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
  console.log("   Reparto:", porSeccion);
}

async function main() {
  await retag("loiemh", RANGOS_LOIEMH);
  await retag("ley-4-2007-aragon", RANGOS_LEY4);

  const SECCIONES_AUX_ADMIN = [
    "loiemh-titulo-1",
    "ley4-cap-1-disposiciones-generales",
    "ley4-cap-4-proteccion-apoyo-victimas",
    "plan-igualdad-zaragoza",
  ];
  const patchTO = await fetch(
    `${URL_BASE}/rest/v1/tema_oposicion?tema_slug=eq.tema-2&oposicion_slug=eq.auxiliar-administrativo`,
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
  console.log("✅ tema_oposicion (auxiliar-administrativo, tema-2) limitado a:", SECCIONES_AUX_ADMIN);
}

main();
