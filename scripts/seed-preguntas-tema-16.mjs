/**
 * Preguntas de test — Tema 16 (Reglamentos y ordenanzas municipales),
 * derivadas 1:1 de las flashcards del mismo tema/seccion.
 *
 * Uso: node --env-file=.env.local scripts/seed-preguntas-tema-16.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

async function insertPreguntas(preguntas) {
  for (const p of preguntas) {
    const resP = await fetch(`${URL_BASE}/rest/v1/preguntas`, {
      method: "POST",
      headers: { ...HEADERS, Prefer: "return=representation" },
      body: JSON.stringify({ tema_slug: TEMA, seccion: p.seccion, enunciado: p.enunciado, explicacion: p.explicacion ?? null, dificultad: p.dificultad }),
    });
    if (!resP.ok) { console.error(`❌ pregunta ${resP.status} ${await resP.text()}`); process.exit(1); }
    const [row] = await resP.json();
    const opciones = p.opciones.map((texto, i) => ({ pregunta_id: row.id, texto, es_correcta: i === 0, orden: i }));
    const resO = await fetch(`${URL_BASE}/rest/v1/opciones`, { method: "POST", headers: { ...HEADERS, Prefer: "return=minimal" }, body: JSON.stringify(opciones) });
    if (!resO.ok) { console.error(`❌ opciones ${resO.status} ${await resO.text()}`); process.exit(1); }
  }
}

const TEMA = "tema-16";
const q = (seccion, dificultad, enunciado, opciones, explicacion) => ({ seccion, dificultad, enunciado, opciones, explicacion });

const PREGUNTAS = [
  q("concepto", "facil",
    "¿Qué es una ordenanza municipal?",
    ["Una norma jurídica de carácter general, con rango de reglamento, aprobada por el Pleno del Ayuntamiento en ejercicio de su potestad reglamentaria y de autoorganización",
     "Un acto administrativo singular dirigido a un ciudadano concreto",
     "Una instrucción interna sin rango normativo dictada por el Alcalde",
     "Un convenio entre el Ayuntamiento y una entidad privada"]),
  q("concepto", "media",
    "¿Cuál es la diferencia entre un reglamento municipal y una ordenanza?",
    ["El reglamento regula la organización y funcionamiento interno de la Corporación (autoorganización); la ordenanza regula relaciones con los ciudadanos (ad extra)",
     "El reglamento lo aprueba el Alcalde y la ordenanza el Pleno",
     "No existe diferencia: son sinónimos en el ámbito municipal",
     "La ordenanza regula la organización interna y el reglamento las relaciones con los ciudadanos"]),
  q("procedimiento-general", "media",
    "¿Cuáles son las fases del procedimiento de aprobación de ordenanzas locales según el art. 49 LBRL?",
    ["Aprobación inicial por el Pleno; información pública y audiencia a interesados (mínimo 30 días); resolución de reclamaciones y aprobación definitiva por el Pleno",
     "Aprobación directa por el Alcalde sin trámite de información pública",
     "Aprobación inicial por el Pleno y publicación inmediata, sin trámite de alegaciones",
     "Dictamen vinculante del Consejo de Estado y aprobación por el Pleno"]),
  q("procedimiento-general", "media",
    "¿Qué ocurre si no se presenta ninguna reclamación o sugerencia durante la información pública de una ordenanza (art. 49 LBRL)?",
    ["Se entiende definitivamente adoptado el acuerdo hasta entonces provisional, sin necesidad de nueva aprobación",
     "El procedimiento caduca y debe iniciarse de nuevo",
     "Es necesario un nuevo acuerdo expreso del Pleno para la aprobación definitiva",
     "La ordenanza queda en suspenso hasta que se presente al menos una alegación"]),
  q("capitalidad-ordenanzas", "media",
    "¿A quién corresponde la iniciativa para aprobar ordenanzas y reglamentos de competencia del Pleno en el Ayuntamiento de Zaragoza (art. 48.2)?",
    ["Al Gobierno de Zaragoza (proyecto normativo), a los grupos políticos (proposición), y a la iniciativa popular",
     "Únicamente al Gobierno de Zaragoza, mediante proyecto normativo",
     "Exclusivamente a la iniciativa popular",
     "Solo a los grupos políticos municipales, mediante proposición"]),
  q("capitalidad-ordenanzas", "dificil",
    "¿Cómo se tramita un proyecto normativo del Gobierno de Zaragoza según el art. 48.3?",
    ["Aprobación del proyecto por el Gobierno de Zaragoza; información pública y audiencia (mín. 30 días naturales); dictamen de la Comisión plenaria; aprobación en acto único por el Pleno; publicación íntegra",
     "Aprobación directa por el Pleno sin dictamen previo de ninguna Comisión",
     "Aprobación inicial y provisional por el Pleno, con doble trámite de información pública",
     "Remisión directa a publicación tras la aprobación por el Gobierno de Zaragoza, sin más trámites"]),
  q("capitalidad-ordenanzas", "dificil",
    "¿Qué especialidad tienen las proposiciones normativas de los grupos políticos en Zaragoza (art. 48.4)?",
    ["Se remiten primero a dictamen de la Comisión plenaria (con memoria justificativa) y, si son aceptadas, pasan al trámite de información pública de 30 días",
     "Se aprueban directamente por el Pleno sin dictamen previo",
     "Requieren informe favorable del Gobierno de Zaragoza antes de cualquier trámite",
     "No pueden tramitarse si ya existe un proyecto normativo sobre la misma materia"]),
  q("capitalidad-ordenanzas", "media",
    "¿Qué requiere toda proposición o enmienda que aumente créditos o disminuya ingresos en Zaragoza (art. 48.6)?",
    ["La conformidad del Gobierno de Zaragoza para su tramitación",
     "La aprobación previa del Consejo Provincial de Urbanismo",
     "Un informe vinculante de la Intervención municipal, sin necesidad de conformidad del Gobierno",
     "La mayoría absoluta del Pleno en primera votación"]),
  q("capitalidad-ordenanzas", "dificil",
    "¿Cómo se tramitan las ordenanzas fiscales en el Ayuntamiento de Zaragoza (art. 49)?",
    ["Igual que el procedimiento general de ordenanzas, con la especialidad de que el proyecto lo aprueba el Gobierno de Zaragoza y se remite directamente a la Comisión plenaria para dictamen y aprobación inicial",
     "Mediante un procedimiento totalmente distinto al de las ordenanzas ordinarias, sin información pública",
     "Requieren aprobación previa del Gobierno de Aragón antes de su tramitación municipal",
     "Se aprueban directamente por el Alcalde, sin intervención del Pleno"]),
  q("capitalidad-ordenanzas", "media",
    "¿Cuál es el plazo de exposición pública de una ordenanza fiscal en Zaragoza (art. 49.b)?",
    ["Mínimo 30 días, mediante anuncio en boletín oficial, tablón de anuncios y sede electrónica municipal",
     "Mínimo 15 días, solo mediante anuncio en el tablón de edictos",
     "Mínimo 20 días hábiles, sin necesidad de publicación en boletín oficial",
     "Mínimo 60 días naturales"]),
  q("capitalidad-ordenanzas", "media",
    "¿Qué ocurre si no se presentan reclamaciones a una ordenanza fiscal en Zaragoza (art. 49.c)?",
    ["Se entiende definitivamente aprobada sin necesidad de nuevo acuerdo del Pleno",
     "Debe someterse igualmente a un nuevo acuerdo expreso de aprobación definitiva",
     "La ordenanza fiscal decae y no puede entrar en vigor ese ejercicio",
     "Se remite al Gobierno de Aragón para su aprobación definitiva"]),
];

console.log(`📝 Insertando ${PREGUNTAS.length} preguntas de ${TEMA}...`);
await insertPreguntas(PREGUNTAS);
console.log(`✅ ${TEMA} completado.`);
