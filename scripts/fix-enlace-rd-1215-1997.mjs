/**
 * Corrige el identificador del RD 1215/1997 (equipos de trabajo) en tema-123
 * (PRL en carpintería, Oficial Carpintero) y tema-132 (trabajos en altura,
 * Oficial Cementerio): citaban BOE-A-1997-16776, que es una Orden de
 * 27-06-1997 de cumplimiento de una sentencia del TSJ de Asturias, sin
 * relación con la materia. El identificador correcto, comprobado en la API
 * del BOE, es BOE-A-1997-17824 («Real Decreto 1215/1997, de 18 de julio,
 * por el que se establecen las disposiciones mínimas de seguridad y salud
 * para la utilización por los trabajadores de los equipos de trabajo»).
 *
 * Solo cambia el identificador dentro de `enlaces_boe` e `indice_estudio`
 * (las URL de la fuente); el texto de flashcards y preguntas no lo citaba.
 * Detectado en la sesión de Operario/a Especialista (octubre de 2026).
 *
 * Uso: node --env-file=.env.local scripts/fix-enlace-rd-1215-1997.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

const MAL = "BOE-A-1997-16776";
const BIEN = "BOE-A-1997-17824";

for (const slug of ["tema-123", "tema-132"]) {
  const res = await fetch(`${URL_BASE}/rest/v1/temas?slug=eq.${slug}&select=enlaces_boe,indice_estudio`, { headers: HEADERS });
  const [tema] = await res.json();
  const corregir = (valor) => JSON.parse(JSON.stringify(valor).replaceAll(MAL, BIEN));
  const cambios = { enlaces_boe: corregir(tema.enlaces_boe), indice_estudio: corregir(tema.indice_estudio) };
  const upd = await fetch(`${URL_BASE}/rest/v1/temas?slug=eq.${slug}`, { method: "PATCH", headers: HEADERS, body: JSON.stringify(cambios) });
  if (!upd.ok) { console.error(`❌ ${slug}: ${upd.status} ${await upd.text()}`); process.exit(1); }
  console.log(`✓ ${slug}: ${MAL} → ${BIEN}`);
}
