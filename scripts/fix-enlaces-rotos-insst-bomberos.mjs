/**
 * Corrige los tres enlaces de fuente que daban 404 en la auditoría de
 * enlaces de `temas` y `convocatorias` (29-10-2026, 419 URL comprobadas):
 *
 * - tema-280 (Oficial Conductor General): el índice genérico de NTP del
 *   INSST ya no existe; se enlaza la propia NTP 126 «Máquinas para
 *   movimiento de tierras», la que cita el tema (URL ya usada en los
 *   temas 222-227 de Maquinaria Pesada).
 * - tema-295 (Oficial Fontanero): el PDF antiguo de la NTP 495 se movió;
 *   nueva ficha del INSST, serie 14 (NTP 471 a 505, año 1999).
 * - tema-371 y tema-372 (Policía Local): la página de temarios de la
 *   Escuela de Bomberos solo responde con barra final
 *   (`/bomberos/temarios/`); lista los PDF de los temas 32, 33 y 34 citados.
 *
 * Falsos positivos de la misma auditoría, sin cambios: iso.org (bloquea
 * peticiones automáticas, 403), dpz.es (responde 200 con curl) y el Manual
 * IVASPE de valencia.es (503 temporal del servidor).
 *
 * Solo cambia las URL dentro de `enlaces_boe` e `indice_estudio`.
 *
 * Uso: node --env-file=.env.local scripts/fix-enlaces-rotos-insst-bomberos.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

const NTP = "https://www.insst.es/documentacion/colecciones-tecnicas/ntp-notas-tecnicas-de-prevencion";
const CAMBIOS = [
  {
    slugs: ["tema-280"],
    mal: "https://www.insst.es/documentacion/documentacion-tecnica-en-linea/notas-tecnicas-de-prevencion",
    bien: `${NTP}/4-serie-ntp-numeros-121-a-155-ano-1985/ntp-126-maquinas-para-movimiento-de-tierras`,
  },
  {
    slugs: ["tema-295"],
    mal: "https://www.insst.es/documents/94886/326962/ntp_495.pdf",
    bien: `${NTP}/14-serie-ntp-numeros-471-a-505-ano-1999/ntp-495-soldadura-oxiacetilenica-y-oxicorte-normas-de-seguridad`,
  },
  {
    slugs: ["tema-371", "tema-372"],
    // Las comillas evitan tocar la URL si ya lleva la barra final.
    mal: '"https://www.zaragoza.es/sede/portal/bomberos/temarios"',
    bien: '"https://www.zaragoza.es/sede/portal/bomberos/temarios/"',
  },
];

for (const { slugs, mal, bien } of CAMBIOS) {
  for (const slug of slugs) {
    const res = await fetch(`${URL_BASE}/rest/v1/temas?slug=eq.${slug}&select=enlaces_boe,indice_estudio`, { headers: HEADERS });
    const [tema] = await res.json();
    const corregir = (valor) => JSON.parse(JSON.stringify(valor).replaceAll(mal, bien));
    const cambios = { enlaces_boe: corregir(tema.enlaces_boe), indice_estudio: corregir(tema.indice_estudio) };
    const upd = await fetch(`${URL_BASE}/rest/v1/temas?slug=eq.${slug}`, { method: "PATCH", headers: HEADERS, body: JSON.stringify(cambios) });
    if (!upd.ok) { console.error(`❌ ${slug}: ${upd.status} ${await upd.text()}`); process.exit(1); }
    console.log(`✓ ${slug}: ${mal} → ${bien}`);
  }
}
