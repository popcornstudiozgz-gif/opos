/**
 * Tema-4: Ley 39/2015 (I) — Título Preliminar + Título I completo (interesados:
 * capacidad de obrar, concepto de interesado, representación, pluralidad de
 * interesados [Cap. I, en el temario de esta oposición] + identificación y
 * firma [Cap. II, biblioteca completa, no exigido en este temario]).
 *
 * Uso: node --env-file=.env.local scripts/seed-flashcards-tema-4.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

async function insertBatch(filas) {
  const res = await fetch(`${URL_BASE}/rest/v1/flashcards`, { method: "POST", headers: { ...HEADERS, Prefer: "return=minimal" }, body: JSON.stringify(filas) });
  if (!res.ok) { console.error(`❌ ${res.status} ${await res.text()}`); process.exit(1); }
}

const TEMA = "tema-4";
const c = (seccion, anverso, reverso) => ({ tema_slug: TEMA, seccion, anverso, reverso });

const CARDS = [
  // Título Preliminar (arts. 1-2)
  c("titulo-preliminar", "¿Qué tiene por objeto la Ley 39/2015 (art. 1.1)?", "Regular los requisitos de validez y eficacia de los actos administrativos, el procedimiento administrativo común (incluido el sancionador y de responsabilidad patrimonial) y los principios de la iniciativa legislativa y potestad reglamentaria"),
  c("titulo-preliminar", "¿Cuándo pueden incluirse trámites adicionales al procedimiento (art. 1.2)?", "Solo mediante ley, cuando sea eficaz, proporcionado y necesario, de forma motivada"),
  c("titulo-preliminar", "¿Qué comprende el sector público a efectos de la Ley (art. 2.1)?", "AGE, Administraciones de las CCAA, Entidades de la Administración Local, y el sector público institucional"),
  c("titulo-preliminar", "¿Qué integra el sector público institucional (art. 2.2)?", "Organismos públicos y entidades de derecho público vinculados; entidades de derecho privado vinculadas; y las Universidades públicas"),
  c("titulo-preliminar", "¿Qué tiene la consideración de Administraciones Públicas (art. 2.3)?", "AGE, Administraciones de las CCAA, Entidades de la Administración Local, y organismos públicos/entidades de derecho público vinculados"),

  // Título I, Cap. I: Capacidad de obrar y concepto de interesado (arts. 3-8)
  c("titulo-1-cap-1", "¿Quién tiene capacidad de obrar ante las AAPP según el art. 3?", "Personas físicas/jurídicas con capacidad civil; menores de edad para derechos que puedan ejercer sin asistencia; y, si la ley lo declara, grupos de afectados y entidades sin personalidad jurídica"),
  c("titulo-1-cap-1", "Enumera los 3 supuestos de interesado del art. 4.1", "a) Quienes promuevan el procedimiento como titulares de derechos/intereses legítimos; b) quienes tengan derechos que puedan resultar afectados sin haberlo iniciado; c) quienes se personen por intereses legítimos afectados antes de la resolución definitiva"),
  c("titulo-1-cap-1", "¿Qué ocurre si la condición de interesado deriva de una relación jurídica transmisible (art. 4.3)?", "El derecho-habiente sucede en tal condición cualquiera que sea el estado del procedimiento"),
  c("titulo-1-cap-1", "¿Puede actuarse por medio de representante (art. 5.1)?", "Sí, entendiéndose con él las actuaciones administrativas salvo manifestación expresa en contra del interesado"),
  c("titulo-1-cap-1", "¿Para qué actuaciones debe acreditarse la representación (art. 5.3)?", "Formular solicitudes, presentar declaraciones responsables o comunicaciones, interponer recursos, desistir de acciones y renunciar a derechos"),
  c("titulo-1-cap-1", "¿Qué ocurre si falta o es insuficiente la acreditación de representación (art. 5.6)?", "No impide tener por realizado el acto si se aporta o subsana en el plazo de 10 días que debe concederse"),
  c("titulo-1-cap-1", "¿Qué es el registro electrónico de apoderamientos (art. 6.1)?", "Un registro donde se inscriben, al menos, los poderes generales otorgados apud acta para actuar en nombre de un interesado ante las AAPP"),
  c("titulo-1-cap-1", "¿Cuál es la validez máxima de los poderes inscritos en el registro (art. 6.6)?", "5 años desde la inscripción, prorrogables antes de su finalización"),
  c("titulo-1-cap-1", "¿Con quién se entienden las actuaciones si hay varios interesados (art. 7)?", "Con el representante o interesado que expresamente hayan señalado, y en su defecto, con el que figure en primer término"),
  c("titulo-1-cap-1", "¿Qué ocurre si aparecen nuevos interesados durante la instrucción (art. 8)?", "Si el procedimiento no tuvo publicidad, se les comunicará la tramitación del procedimiento"),

  // Título I, Cap. II: Identificación y firma (arts. 9-12) — biblioteca, fuera del temario de esta oposición
  c("titulo-1-cap-2", "¿Cómo verifican las AAPP la identidad de los interesados (art. 9.1)?", "Comprobando nombre y apellidos o denominación/razón social que consten en el DNI o documento equivalente"),
  c("titulo-1-cap-2", "Enumera los sistemas de identificación electrónica del art. 9.2", "a) Certificados cualificados de firma electrónica; b) certificados cualificados de sello electrónico; c) cualquier otro sistema válido con registro previo de usuario"),
  c("titulo-1-cap-2", "¿Con qué medios pueden firmar los interesados según el art. 10.1?", "Cualquier medio que acredite la autenticidad de su voluntad y consentimiento, y la integridad e inalterabilidad del documento"),
  c("titulo-1-cap-2", "¿Cuándo es obligatorio el uso de firma según el art. 11.2?", "Formular solicitudes, presentar declaraciones responsables/comunicaciones, interponer recursos, desistir de acciones y renunciar a derechos"),
  c("titulo-1-cap-2", "¿Qué garantizan las AAPP según el art. 12 (asistencia en medios electrónicos)?", "Asistencia a los interesados no obligados a relacionarse electrónicamente, incluso mediante identificación/firma por un funcionario habilitado con consentimiento del interesado"),
];

console.log(`📝 Insertando ${CARDS.length} flashcards de tema-4...`);
await insertBatch(CARDS);

const SECCIONES_AUX_ADMIN = ["titulo-1-cap-1"];
const patchTO = await fetch(`${URL_BASE}/rest/v1/tema_oposicion?tema_slug=eq.tema-4&oposicion_slug=eq.auxiliar-administrativo`, {
  method: "PATCH", headers: { ...HEADERS, Prefer: "return=representation" }, body: JSON.stringify({ secciones_incluidas: SECCIONES_AUX_ADMIN }),
});
if (!patchTO.ok) { console.error(`❌ ${patchTO.status} ${await patchTO.text()}`); process.exit(1); }
console.log("✅ tema_oposicion (auxiliar-administrativo, tema-4) limitado a:", SECCIONES_AUX_ADMIN);
console.log("✅ Tema-4 completado.");
