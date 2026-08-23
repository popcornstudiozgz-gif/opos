/**
 * Tema-14: preguntas de test de las especialidades en materia de
 * organización de la Ley de Capitalidad de Zaragoza (Ley 10/2017,
 * Capítulo II, arts. 7-18), derivadas 1:1 de
 * seed-flashcards-tema-14-organizacion-zaragoza.mjs.
 *
 * Uso: node --env-file=.env.local scripts/seed-preguntas-tema-14-organizacion-zaragoza.mjs
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

const TEMA = "tema-14";
const SECCION = "capitalidad-zaragoza-organizacion";
const q = (dificultad, enunciado, opciones, explicacion) => ({ dificultad, enunciado, opciones, explicacion });

const PREGUNTAS = [
  q("media",
    "¿En qué instrumentos se desarrolla la potestad de autoorganización del Ayuntamiento de Zaragoza según el art. 7 de su Ley de Capitalidad?",
    ["En los Reglamentos de naturaleza orgánica municipales y sus normas complementarias y de desarrollo",
     "Únicamente en las ordenanzas fiscales",
     "En un Decreto del Gobierno de Aragón",
     "En el Plan General de Ordenación Urbana"]),
  q("media",
    "¿Cuáles son los órganos de gobierno y administración del Ayuntamiento de Zaragoza según el art. 8.1 de su Ley de Capitalidad?",
    ["El Pleno; los órganos ejecutivos de dirección política y administrativa; y los órganos directivos",
     "Únicamente el Alcalde y el Secretario General",
     "El Pleno y la Junta de Portavoces, exclusivamente",
     "El Gobierno de Aragón y el Ayuntamiento, de forma compartida"]),
  q("media",
    "¿Dónde se establecen las competencias del Pleno, el Gobierno de Zaragoza, el Alcalde y los demás órganos ejecutivos según el art. 9.1?",
    ["En la regulación básica de régimen local y demás disposiciones normativas vigentes de aplicación",
     "Exclusivamente en el Reglamento orgánico municipal, sin remisión a otra normativa",
     "En un convenio anual entre el Ayuntamiento y el Gobierno de Aragón",
     "En la Ley de Bases del Régimen Local, con exclusión de cualquier otra norma"]),
  q("media",
    "¿Cómo se forman las Comisiones del Pleno del Ayuntamiento de Zaragoza según el art. 10.3?",
    ["Por los miembros que designen los grupos políticos, en proporción al número de concejales que tengan en el Pleno",
     "Por sorteo entre todos los concejales electos",
     "Por libre designación del Alcalde",
     "Por elección directa de los vecinos en las elecciones municipales"]),
  q("dificil",
    "¿Cuál de estas materias reviste en todo caso naturaleza orgánica según el art. 11.1.c?",
    ["La regulación del Pleno y la del Consejo Social de la ciudad",
     "La aprobación del presupuesto anual",
     "El otorgamiento de licencias urbanísticas",
     "La aprobación de los precios del transporte urbano"]),
  q("media",
    "¿Cómo se vota la moción de censura al Alcalde de Zaragoza según el art. 11.1.b?",
    ["Es pública, mediante llamamiento nominal en todo caso, rigiéndose por la legislación electoral general",
     "Es secreta, mediante papeleta, para preservar la libertad de voto de los concejales",
     "Solo puede plantearse una vez por mandato, sin posibilidad de repetirla",
     "Se decide exclusivamente por el Gobierno de Aragón, a propuesta del Pleno"]),
  q("facil",
    "¿Qué jefatura corresponde al Alcalde de Zaragoza según el art. 12.1.j?",
    ["La Jefatura de la Policía Local",
     "La Jefatura de la Policía Nacional en el término municipal",
     "La Jefatura de la Guardia Civil de tráfico urbano",
     "El Alcalde no tiene ninguna jefatura sobre cuerpos policiales"]),
  q("media",
    "¿Qué límite tiene el número de miembros del Gobierno de Zaragoza según el art. 13.2?",
    ["No puede exceder de un tercio del número legal de miembros del Pleno, además del Alcalde",
     "No puede exceder de la mitad del número legal de miembros del Pleno",
     "Es fijo: siempre 10 miembros, además del Alcalde",
     "No existe límite legal alguno, lo fija libremente el Alcalde"]),
  q("media",
    "¿Cómo son las deliberaciones del Gobierno de Zaragoza según el art. 13.5?",
    ["Secretas, excepto en las decisiones relativas a las atribuciones delegadas por el Pleno",
     "Públicas en todo caso, con retransmisión obligatoria",
     "Secretas sin excepción alguna",
     "Públicas salvo cuando lo decida el Alcalde discrecionalmente"]),
  q("media",
    "¿Qué corresponde al Gobierno de Zaragoza respecto a las ordenanzas y reglamentos según el art. 14.1.a?",
    ["La aprobación de los proyectos de ordenanzas y reglamentos, incluidos los orgánicos, salvo las normas reguladoras del Pleno y sus Comisiones",
     "La aprobación definitiva de todas las ordenanzas, sin intervención del Pleno",
     "Solo puede informar los proyectos, sin capacidad de aprobarlos",
     "La aprobación de las ordenanzas fiscales, exclusivamente"]),
  q("facil",
    "¿Qué es la Junta de Portavoces del Ayuntamiento de Zaragoza según el art. 16?",
    ["El órgano formado por los portavoces de los grupos municipales, presidido por el Alcalde o el Teniente de Alcalde en quien delegue",
     "La comisión que resuelve los recursos administrativos del Ayuntamiento",
     "El órgano que sustituye al Pleno durante el periodo vacacional",
     "El conjunto de los Tenientes de Alcalde, sin los portavoces de los grupos"]),
  q("media",
    "¿Qué naturaleza tienen los informes y dictámenes del Consejo Jurídico Municipal según el art. 17?",
    ["No vinculante",
     "Vinculante para el Gobierno de Zaragoza",
     "Vinculante solo en materia de contratación",
     "Vinculante únicamente si lo ratifica el Pleno"]),
];

console.log(`📝 Insertando ${PREGUNTAS.length} preguntas de ${TEMA}/${SECCION}...`);
await insertPreguntas(PREGUNTAS);
console.log(`✅ ${TEMA}/${SECCION} completado.`);
