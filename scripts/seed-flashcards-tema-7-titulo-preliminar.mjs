/**
 * Tema-7: Título Preliminar de la Ley 39/2015 (arts. 1-2: objeto y ámbito
 * subjetivo de aplicación). Añadido para la oposición de la DPZ (Tema 6:
 * "estructura, ámbito de aplicación y principios generales" del
 * Procedimiento Administrativo Común) — el Ayuntamiento de Zaragoza no
 * pedía esta parte en su temario, así que tema-7 no la tenía sembrada.
 *
 * Fiel a content-raw/ley-39-2015-procedimiento-administrativo/titulo-preliminar-disposiciones-generales.md.
 *
 * Uso: node --env-file=.env.local scripts/seed-flashcards-tema-7-titulo-preliminar.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

async function insertBatch(filas) {
  const res = await fetch(`${URL_BASE}/rest/v1/flashcards`, { method: "POST", headers: { ...HEADERS, Prefer: "return=minimal" }, body: JSON.stringify(filas) });
  if (!res.ok) { console.error(`❌ ${res.status} ${await res.text()}`); process.exit(1); }
}

const TEMA = "tema-7";
const SECCION = "titulo-preliminar";
const c = (anverso, reverso) => ({ tema_slug: TEMA, seccion: SECCION, anverso, reverso });

const CARDS = [
  c("¿Qué tiene por objeto la Ley 39/2015 según su art. 1.1?", "Regular los requisitos de validez y eficacia de los actos administrativos, el procedimiento administrativo común (incluido el sancionador y el de responsabilidad), y los principios de la iniciativa legislativa y la potestad reglamentaria"),
  c("¿En qué condiciones pueden incluirse trámites adicionales o distintos a los de la Ley, según el art. 1.2?", "Solo mediante ley, cuando resulte eficaz, proporcionado y necesario, y de manera motivada"),
  c("¿Qué puede establecer un reglamento respecto al procedimiento, según el art. 1.2?", "Especialidades referidas a órganos competentes, plazos propios por razón de la materia, formas de iniciación y terminación, publicación e informes a recabar"),
  c("¿A qué sector se aplica la Ley 39/2015 según el art. 2.1?", "Al sector público: AGE, Administraciones de las CCAA, Entidades de la Administración Local, y el sector público institucional"),
  c("¿Qué integra el sector público institucional según el art. 2.2?", "Organismos públicos y entidades de derecho público dependientes; entidades de derecho privado dependientes (sujetas a la Ley cuando ejerzan potestades administrativas); y las Universidades públicas"),
  c("¿Qué entidades tienen la consideración de «Administraciones Públicas» según el art. 2.3?", "La AGE, las Administraciones de las CCAA, las Entidades de la Administración Local, y los organismos públicos y entidades de derecho público dependientes de ellas"),
  c("¿Por qué normativa se rigen las Corporaciones de Derecho Público en el ejercicio de funciones públicas atribuidas por ley, según el art. 2.4?", "Por su normativa específica, y supletoriamente por la Ley 39/2015"),
];

console.log(`📇 Insertando ${CARDS.length} flashcards de ${TEMA}/${SECCION}...`);
await insertBatch(CARDS);
console.log(`✅ ${TEMA}/${SECCION} completado.`);
