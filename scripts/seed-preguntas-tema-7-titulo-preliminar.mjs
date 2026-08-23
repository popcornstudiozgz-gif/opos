/**
 * Tema-7: preguntas de test del Título Preliminar de la Ley 39/2015
 * (arts. 1-2), derivadas 1:1 de seed-flashcards-tema-7-titulo-preliminar.mjs.
 *
 * Uso: node --env-file=.env.local scripts/seed-preguntas-tema-7-titulo-preliminar.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

async function insertPreguntas(preguntas) {
  for (const p of preguntas) {
    const resP = await fetch(`${URL_BASE}/rest/v1/preguntas`, {
      method: "POST",
      headers: { ...HEADERS, Prefer: "return=representation" },
      body: JSON.stringify({ tema_slug: TEMA, seccion: SECCION, enunciado: p.enunciado, explicacion: p.explicacion ?? null, dificultad: p.dificultad }),
    });
    if (!resP.ok) { console.error(`❌ pregunta ${resP.status} ${await resP.text()}`); process.exit(1); }
    const [row] = await resP.json();
    const opciones = p.opciones.map((texto, i) => ({ pregunta_id: row.id, texto, es_correcta: i === 0, orden: i }));
    const resO = await fetch(`${URL_BASE}/rest/v1/opciones`, { method: "POST", headers: { ...HEADERS, Prefer: "return=minimal" }, body: JSON.stringify(opciones) });
    if (!resO.ok) { console.error(`❌ opciones ${resO.status} ${await resO.text()}`); process.exit(1); }
  }
}

const TEMA = "tema-7";
const SECCION = "titulo-preliminar";
const q = (dificultad, enunciado, opciones, explicacion) => ({ dificultad, enunciado, opciones, explicacion });

const PREGUNTAS = [
  q("facil",
    "¿Qué tiene por objeto la Ley 39/2015 según su art. 1.1?",
    ["Regular los requisitos de validez y eficacia de los actos administrativos, el procedimiento administrativo común (incluido el sancionador y el de responsabilidad) y los principios de la iniciativa legislativa y la potestad reglamentaria",
     "Regular exclusivamente el régimen jurídico interno de la Administración General del Estado",
     "Regular únicamente el procedimiento sancionador, dejando el resto a leyes especiales",
     "Regular la organización territorial del Estado y el régimen de las Comunidades Autónomas"],
    "El art. 1.1 delimita un objeto amplio: no solo el procedimiento administrativo común, sino también los requisitos de los actos, el procedimiento sancionador y de responsabilidad, y los principios de la potestad normativa."),
  q("media",
    "¿En qué condiciones pueden incluirse trámites adicionales o distintos a los previstos en la Ley 39/2015, según el art. 1.2?",
    ["Solo mediante ley, cuando resulte eficaz, proporcionado y necesario para los fines del procedimiento, y de manera motivada",
     "Mediante cualquier disposición reglamentaria, sin necesidad de justificación",
     "Nunca: la Ley 39/2015 no admite ningún trámite adicional bajo ninguna circunstancia",
     "Mediante acuerdo del órgano competente para tramitar el procedimiento, caso por caso"],
    "El art. 1.2 exige rango de ley (no basta un reglamento) y un triple juicio de eficacia, proporcionalidad y necesidad, motivado, para apartarse del procedimiento común."),
  q("media",
    "¿Qué puede establecer un reglamento respecto al procedimiento administrativo, según el art. 1.2?",
    ["Especialidades referidas a los órganos competentes, plazos propios por razón de la materia, formas de iniciación y terminación, y publicación e informes a recabar",
     "Trámites adicionales completos, en pie de igualdad con lo que permite hacer una ley",
     "La derogación total del procedimiento común para un sector concreto",
     "Ningún tipo de especialidad: solo la ley puede modular el procedimiento"],
    "El art. 1.2 reserva a la ley la creación de trámites nuevos, pero permite al reglamento matizar aspectos concretos (órganos, plazos, formas de iniciación/terminación...) dentro del procedimiento ya existente."),
  q("facil",
    "¿A qué se aplica la Ley 39/2015 según el art. 2.1?",
    ["Al sector público: la Administración General del Estado, las Administraciones de las Comunidades Autónomas, las Entidades de la Administración Local, y el sector público institucional",
     "Únicamente a la Administración General del Estado",
     "Únicamente a las Administraciones territoriales, excluyendo cualquier organismo dependiente",
     "A cualquier persona física o jurídica, con independencia de si forma parte del sector público"],
    "El art. 2.1 define un ámbito subjetivo amplio (todo el sector público, en sus cuatro niveles), no restringido a la Administración territorial."),
  q("media",
    "¿Qué integra el sector público institucional según el art. 2.2?",
    ["Organismos públicos y entidades de derecho público dependientes; entidades de derecho privado dependientes (sujetas a la Ley cuando ejerzan potestades administrativas); y las Universidades públicas",
     "Únicamente los organismos autónomos estatales",
     "Las empresas privadas que contraten con el sector público, sin excepción",
     "Solo las entidades de derecho privado, quedando excluidos los organismos públicos"],
    "El art. 2.2 diferencia tres categorías dentro del sector público institucional, con distinto grado de sujeción a la Ley 39/2015 según su naturaleza jurídica."),
  q("media",
    "¿Qué entidades tienen la consideración de «Administraciones Públicas» a los efectos de la Ley 39/2015, según el art. 2.3?",
    ["La Administración General del Estado, las Administraciones de las Comunidades Autónomas, las Entidades de la Administración Local, y los organismos públicos y entidades de derecho público dependientes de ellas",
     "Todo el sector público institucional, incluidas las entidades de derecho privado y las Universidades",
     "Únicamente la Administración General del Estado y las Comunidades Autónomas, sin la Administración Local",
     "Cualquier persona jurídica que preste un servicio de interés general"],
    "El art. 2.3 acota el concepto estricto de «Administración Pública» a las tres Administraciones territoriales más sus organismos públicos de derecho público, dejando fuera a las entidades de derecho privado y a las Universidades (que sí forman parte del sector público institucional, pero no de este concepto más restringido)."),
  q("dificil",
    "¿Por qué normativa se rigen las Corporaciones de Derecho Público en el ejercicio de las funciones públicas atribuidas por ley o delegadas por una Administración Pública, según el art. 2.4?",
    ["Por su normativa específica, y supletoriamente por la Ley 39/2015",
     "Exclusivamente por la Ley 39/2015, sin normativa propia aplicable",
     "Por el Código Civil, al no ser Administraciones Públicas en sentido estricto",
     "Por la normativa de la Comunidad Autónoma en la que tengan su sede, con exclusión de cualquier otra"],
    "El art. 2.4 da prioridad a la normativa específica de estas Corporaciones (colegios profesionales, cámaras...), reservando la Ley 39/2015 para lo no previsto en ella."),
];

console.log(`📝 Insertando ${PREGUNTAS.length} preguntas de ${TEMA}/${SECCION}...`);
await insertPreguntas(PREGUNTAS);
console.log(`✅ ${TEMA}/${SECCION} completado.`);
