/**
 * Tema-16: Reglamentos y ordenanzas municipales — concepto y procedimiento
 * general de elaboración (art. 49 LBRL) y especialidades de aprobación de
 * ordenanzas fiscales y reglamentos en la Ley de Capitalidad de Zaragoza
 * (arts. 48-49).
 *
 * Uso: node --env-file=.env.local scripts/seed-flashcards-tema-16.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

async function insertBatch(filas) {
  const res = await fetch(`${URL_BASE}/rest/v1/flashcards`, { method: "POST", headers: { ...HEADERS, Prefer: "return=minimal" }, body: JSON.stringify(filas) });
  if (!res.ok) { console.error(`❌ ${res.status} ${await res.text()}`); process.exit(1); }
}

const TEMA = "tema-16";
const c = (seccion, anverso, reverso) => ({ tema_slug: TEMA, seccion, anverso, reverso });

const CARDS = [
  // Concepto (doctrinal)
  c("concepto", "¿Qué es una ordenanza municipal?", "Una norma jurídica de carácter general, con rango de reglamento, aprobada por el Pleno del Ayuntamiento en ejercicio de su potestad reglamentaria y de autoorganización"),
  c("concepto", "¿Qué es un reglamento municipal frente a una ordenanza?", "El reglamento regula la organización y funcionamiento interno de la Corporación (autoorganización); la ordenanza regula relaciones con los ciudadanos (ad extra)"),

  // Procedimiento general (art. 49 LBRL)
  c("procedimiento-general", "¿Cuáles son las fases del procedimiento de aprobación de Ordenanzas locales según el art. 49 LBRL?", "a) Aprobación inicial por el Pleno; b) información pública y audiencia a interesados (mínimo 30 días); c) resolución de reclamaciones y aprobación definitiva por el Pleno"),
  c("procedimiento-general", "¿Qué ocurre si no se presenta ninguna reclamación o sugerencia (art. 49 LBRL)?", "Se entiende definitivamente adoptado el acuerdo hasta entonces provisional, sin necesidad de nueva aprobación"),

  // Especialidades en la Ley de Capitalidad de Zaragoza (arts. 48-49)
  c("capitalidad-ordenanzas", "¿A quién corresponde la iniciativa para aprobar ordenanzas y reglamentos de competencia del Pleno en Zaragoza (art. 48.2)?", "Al Gobierno de Zaragoza (proyecto normativo), a los grupos políticos (proposición), y a la iniciativa popular"),
  c("capitalidad-ordenanzas", "Describe el procedimiento de un proyecto normativo del Gobierno de Zaragoza (art. 48.3)", "a) Aprobación del proyecto por el Gobierno de Zaragoza; b) información pública y audiencia (mín. 30 días naturales); c) dictamen de la Comisión plenaria; d) aprobación en acto único por el Pleno; e) publicación íntegra"),
  c("capitalidad-ordenanzas", "¿Qué especialidad tienen las proposiciones de los grupos políticos (art. 48.4)?", "Se remiten primero a dictamen de la Comisión plenaria (con memoria justificativa) y, si son aceptadas, pasan al trámite de información pública de 30 días"),
  c("capitalidad-ordenanzas", "¿Qué requiere toda proposición o enmienda que aumente créditos o disminuya ingresos (art. 48.6)?", "La conformidad del Gobierno de Zaragoza para su tramitación"),
  c("capitalidad-ordenanzas", "¿Cómo se tramitan las ordenanzas fiscales en Zaragoza (art. 49)?", "Igual que el procedimiento general de ordenanzas, con la especialidad de que el proyecto lo aprueba el Gobierno de Zaragoza y se remite directamente a la Comisión plenaria para dictamen y aprobación inicial"),
  c("capitalidad-ordenanzas", "¿Cuál es el plazo de exposición pública de una ordenanza fiscal en Zaragoza (art. 49.b)?", "Mínimo 30 días, mediante anuncio en boletín oficial, tablón de anuncios y sede electrónica municipal"),
  c("capitalidad-ordenanzas", "¿Qué ocurre si no se presentan reclamaciones a una ordenanza fiscal (art. 49.c)?", "Se entiende definitivamente aprobada sin necesidad de nuevo acuerdo del Pleno"),
];

console.log(`📝 Insertando ${CARDS.length} flashcards de tema-16...`);
await insertBatch(CARDS);

const SECCIONES_AUX_ADMIN = ["concepto", "procedimiento-general", "capitalidad-ordenanzas"];
const patchTO = await fetch(`${URL_BASE}/rest/v1/tema_oposicion?tema_slug=eq.tema-16&oposicion_slug=eq.auxiliar-administrativo`, {
  method: "PATCH", headers: { ...HEADERS, Prefer: "return=representation" }, body: JSON.stringify({ secciones_incluidas: SECCIONES_AUX_ADMIN }),
});
if (!patchTO.ok) { console.error(`❌ ${patchTO.status} ${await patchTO.text()}`); process.exit(1); }
console.log("✅ tema_oposicion (auxiliar-administrativo, tema-16) limitado a:", SECCIONES_AUX_ADMIN);
console.log("✅ Tema-16 completado.");
