/**
 * Tema-14: especialidades en materia de organización de la Ley de
 * Capitalidad de Zaragoza (Ley 10/2017, Capítulo II, arts. 7-18) — la
 * parte del temario oficial que faltaba junto a "disposiciones generales"
 * (seccion `capitalidad-zaragoza-general`, ya sembrada).
 *
 * Fiel a content-raw/ley-10-2017-capitalidad-zaragoza/02-cap2-especialidades-organizacion.md.
 *
 * Uso: node --env-file=.env.local scripts/seed-flashcards-tema-14-organizacion-zaragoza.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

async function insertBatch(filas) {
  const res = await fetch(`${URL_BASE}/rest/v1/flashcards`, { method: "POST", headers: { ...HEADERS, Prefer: "return=minimal" }, body: JSON.stringify(filas) });
  if (!res.ok) { console.error(`❌ ${res.status} ${await res.text()}`); process.exit(1); }
}

const TEMA = "tema-14";
const SECCION = "capitalidad-zaragoza-organizacion";
const c = (anverso, reverso) => ({ tema_slug: TEMA, seccion: SECCION, anverso, reverso });

const CARDS = [
  c("¿En qué instrumentos se desarrolla la potestad de autoorganización del Ayuntamiento de Zaragoza (art. 7)?", "En los Reglamentos de naturaleza orgánica municipales y sus normas complementarias y de desarrollo"),
  c("¿Cuáles son los órganos de gobierno y administración del Ayuntamiento de Zaragoza (art. 8.1)?", "El Pleno; los órganos ejecutivos de dirección política y administrativa (Alcalde, Gobierno de Zaragoza, Vicealcalde, Tenientes de Alcalde y Concejales de gobierno); y los órganos directivos"),
  c("¿Dónde se establecen las competencias del Pleno, el Gobierno de Zaragoza, el Alcalde y los demás órganos ejecutivos (art. 9.1)?", "En la regulación básica de régimen local y demás disposiciones normativas vigentes de aplicación"),
  c("¿Cómo se forman las Comisiones del Pleno (art. 10.3)?", "Por los miembros que designen los grupos políticos, en proporción al número de concejales que tengan en el Pleno"),
  c("Cita 2 materias que revisten en todo caso naturaleza orgánica según el art. 11.1.c", "La regulación del Pleno y la regulación del Consejo Social de la ciudad (también: Comisión de Sugerencias y Reclamaciones, órganos de participación, división en distritos, niveles esenciales de la organización municipal, órgano de reclamaciones económico-administrativas)"),
  c("¿Cómo se vota la moción de censura al Alcalde de Zaragoza (art. 11.1.b)?", "Es pública, mediante llamamiento nominal en todo caso, y se rige por la legislación electoral general"),
  c("¿Qué jefatura corresponde al Alcalde de Zaragoza (art. 12.1.j)?", "La Jefatura de la Policía Local"),
  c("¿Qué límite tiene el número de miembros del Gobierno de Zaragoza (art. 13.2)?", "No puede exceder de un tercio del número legal de miembros del Pleno, además del Alcalde"),
  c("¿Cómo son las deliberaciones del Gobierno de Zaragoza (art. 13.5)?", "Secretas, excepto en las decisiones relativas a las atribuciones delegadas por el Pleno"),
  c("¿Qué corresponde al Gobierno de Zaragoza sobre ordenanzas y reglamentos (art. 14.1.a)?", "La aprobación de los proyectos de ordenanzas y reglamentos, incluidos los orgánicos, salvo las normas reguladoras del Pleno y sus Comisiones"),
  c("¿Qué es la Junta de Portavoces (art. 16)?", "El órgano formado por los portavoces de los grupos municipales, presidido por el Alcalde o el Teniente de Alcalde en quien delegue"),
  c("¿Qué naturaleza tienen los informes y dictámenes del Consejo Jurídico Municipal (art. 17)?", "No vinculante"),
];

console.log(`📇 Insertando ${CARDS.length} flashcards de ${TEMA}/${SECCION}...`);
await insertBatch(CARDS);
console.log(`✅ ${TEMA}/${SECCION} completado.`);
