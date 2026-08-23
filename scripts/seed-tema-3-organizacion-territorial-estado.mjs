/**
 * Tema-3: nueva sección "organizacion-territorial-estado" — la parte del
 * Tema 2 de la DPZ ("Organización territorial del Estado. Los Estatutos
 * de autonomía: su significado.") que precede a "El Estatuto de Autonomía
 * de Aragón" propiamente dicho. Se añade aquí (y no en tema-1, que ya
 * tiene sembrado el resto del Título VIII CE) porque `tema_oposicion` solo
 * admite un tema canónico por número de tema, y este contenido es el
 * puente natural hacia el resto de tema-3.
 *
 * Fiel a la Constitución Española (arts. 2, 137 y 143.1, ya vistos en
 * content-raw/constitucion-espanola/titulo-preliminar.md y
 * titulo-8-cap-1-principios-generales.md) y al art. 147 CE (naturaleza y
 * contenido mínimo del Estatuto de Autonomía, título-8-cap-3 en
 * content-raw, no sembrado hasta ahora bajo tema-3).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-3-organizacion-territorial-estado.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

const TEMA = "tema-3";
const SECCION = "organizacion-territorial-estado";

async function insertFlashcards(cards) {
  const res = await fetch(`${URL_BASE}/rest/v1/flashcards`, { method: "POST", headers: { ...HEADERS, Prefer: "return=minimal" }, body: JSON.stringify(cards) });
  if (!res.ok) { console.error(`❌ flashcards ${res.status} ${await res.text()}`); process.exit(1); }
}
async function insertPreguntas(preguntas) {
  for (const p of preguntas) {
    const resP = await fetch(`${URL_BASE}/rest/v1/preguntas`, {
      method: "POST", headers: { ...HEADERS, Prefer: "return=representation" },
      body: JSON.stringify({ tema_slug: TEMA, seccion: SECCION, enunciado: p.enunciado, explicacion: p.explicacion ?? null, dificultad: p.dificultad }),
    });
    if (!resP.ok) { console.error(`❌ pregunta ${resP.status} ${await resP.text()}`); process.exit(1); }
    const [row] = await resP.json();
    const opciones = p.opciones.map((texto, i) => ({ pregunta_id: row.id, texto, es_correcta: i === 0, orden: i }));
    const resO = await fetch(`${URL_BASE}/rest/v1/opciones`, { method: "POST", headers: { ...HEADERS, Prefer: "return=minimal" }, body: JSON.stringify(opciones) });
    if (!resO.ok) { console.error(`❌ opciones ${resO.status} ${await resO.text()}`); process.exit(1); }
  }
}

const c = (anverso, reverso) => ({ tema_slug: TEMA, seccion: SECCION, anverso, reverso });
const CARDS = [
  c("¿En qué se organiza territorialmente el Estado según el art. 137 CE?", "En municipios, provincias y las Comunidades Autónomas que se constituyan; todas gozan de autonomía para la gestión de sus respectivos intereses"),
  c("¿En qué funda la Constitución la unidad de España, y qué reconoce al mismo tiempo, según el art. 2 CE?", "Se fundamenta en la indisoluble unidad de la Nación española, y reconoce y garantiza el derecho a la autonomía de las nacionalidades y regiones que la integran, así como la solidaridad entre todas ellas"),
  c("¿A quién corresponde la iniciativa del proceso autonómico por la vía general del art. 143.1-2 CE?", "A las Diputaciones u órganos interinsulares y a las dos terceras partes de los municipios cuya población represente la mayoría del censo electoral de cada provincia"),
  c("¿Qué es un Estatuto de Autonomía según el art. 147.1 CE?", "La norma institucional básica de cada Comunidad Autónoma; el Estado la reconocerá y amparará como parte integrante de su ordenamiento jurídico"),
  c("¿Qué debe contener en todo caso un Estatuto de Autonomía según el art. 147.2 CE?", "La denominación de la Comunidad; la delimitación de su territorio; la denominación, organización y sede de sus instituciones autónomas propias; y las competencias asumidas dentro del marco de la Constitución"),
  c("¿Con qué rango de ley se aprueban los Estatutos de Autonomía según el art. 147.3 CE?", "Ley orgánica; su reforma se ajustará al procedimiento establecido en el propio Estatuto y requerirá, en todo caso, la aprobación por las Cortes Generales mediante ley orgánica"),
];
await insertFlashcards(CARDS);
console.log(`📇 ${CARDS.length} flashcards insertadas.`);

const q = (dificultad, enunciado, opciones, explicacion) => ({ dificultad, enunciado, opciones, explicacion });
const PREGUNTAS = [
  q("facil",
    "¿En qué entidades se organiza territorialmente el Estado según el art. 137 CE?",
    ["Municipios, provincias y las Comunidades Autónomas que se constituyan",
     "Únicamente Comunidades Autónomas, sin mención a municipios ni provincias",
     "Regiones históricas, sin base municipal ni provincial",
     "Departamentos administrativos designados directamente por el Gobierno"],
    "El art. 137 CE es el primer precepto del Título VIII: organiza el Estado en tres niveles territoriales, los tres dotados de autonomía para gestionar sus propios intereses."),
  q("media",
    "¿Qué dos principios, aparentemente en tensión, combina el art. 2 CE?",
    ["La indisoluble unidad de la Nación española y el derecho a la autonomía de las nacionalidades y regiones",
     "La soberanía compartida entre el Estado y las Comunidades Autónomas",
     "El derecho de autodeterminación de los territorios históricos",
     "La federación voluntaria de los antiguos reinos peninsulares"],
    "El art. 2 CE es la fórmula de equilibrio constitucional entre unidad nacional (indisoluble) y autonomía territorial (reconocida y garantizada), sin que ninguna de las dos anule a la otra."),
  q("media",
    "¿A quién corresponde la iniciativa del proceso autonómico por la vía del art. 143.2 CE?",
    ["A las Diputaciones interesadas y a las dos terceras partes de los municipios de cada provincia cuya población represente la mayoría del censo electoral",
     "Exclusivamente al Gobierno central, a propuesta de las Cortes Generales",
     "A una mayoría simple de los municipios de la provincia, sin intervención de la Diputación",
     "Al Rey, a propuesta del Presidente del Gobierno saliente"],
    "El art. 143.2 CE exige la concurrencia de las Diputaciones (u órganos interinsulares) y de las dos terceras partes de los municipios que representen la mayoría del censo, no basta cualquiera de los dos requisitos por separado."),
  q("facil",
    "¿Qué es un Estatuto de Autonomía según el art. 147.1 CE?",
    ["La norma institucional básica de cada Comunidad Autónoma, que el Estado reconocerá y amparará como parte integrante de su ordenamiento jurídico",
     "Un simple reglamento interno de organización de cada Comunidad Autónoma, sin valor de ley",
     "Un tratado entre el Estado y cada Comunidad Autónoma, revisable unilateralmente por esta",
     "La ley que regula únicamente el régimen electoral autonómico"],
    "El art. 147.1 CE define al Estatuto como «norma institucional básica»: no es un simple reglamento interno, sino la pieza central del ordenamiento jurídico de cada Comunidad Autónoma, integrada en el ordenamiento estatal."),
  q("media",
    "¿Cuál de estos elementos debe contener en todo caso un Estatuto de Autonomía según el art. 147.2 CE?",
    ["La denominación, organización y sede de las instituciones autónomas propias",
     "El nombre de los partidos políticos con representación en sus Cortes o Asamblea",
     "El importe exacto de su presupuesto anual",
     "La composición nominal de su primer Gobierno autonómico"],
    "El art. 147.2 CE fija un contenido mínimo obligatorio (denominación, territorio, instituciones, competencias), no detalles coyunturales como los partidos con representación o cifras presupuestarias concretas."),
  q("dificil",
    "¿Con qué rango se aprueban los Estatutos de Autonomía, y qué exige su reforma, según el art. 147.3 CE?",
    ["Se aprueban mediante ley orgánica; su reforma requiere, en todo caso, la aprobación de las Cortes Generales también mediante ley orgánica",
     "Se aprueban mediante ley ordinaria, y se reforman por acuerdo exclusivo del Parlamento autonómico",
     "Se aprueban mediante decreto del Gobierno, sin intervención de las Cortes Generales",
     "Se aprueban mediante referéndum estatal, sin necesidad de tramitación parlamentaria"],
    "El art. 147.3 CE exige ley orgánica tanto para la aprobación inicial como, en todo caso, para la reforma del Estatuto — aunque el procedimiento concreto de reforma lo fija cada Estatuto, la intervención final de las Cortes Generales mediante ley orgánica es siempre necesaria."),
];
await insertPreguntas(PREGUNTAS);
console.log(`📝 ${PREGUNTAS.length} preguntas insertadas.`);
console.log(`✅ ${TEMA}/${SECCION} completado.`);
