/**
 * Preguntas de test — Tema 1, parte 2 (Título I Cap. I "De los españoles y
 * los extranjeros" + Cap. IV "Garantías" + Cap. V "Suspensión").
 *
 * Uso: node --env-file=.env.local scripts/seed-preguntas-tema-1b.mjs
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

const TEMA = "tema-1";
const q = (seccion, dificultad, enunciado, opciones, explicacion) => ({ seccion, dificultad, enunciado, opciones, explicacion });

const PREGUNTAS = [
  q("titulo-1-cap-1", "media",
    "¿Qué es fundamento del orden político y de la paz social según el art. 10.1 CE?",
    ["La dignidad de la persona, los derechos inviolables que le son inherentes, el libre desarrollo de la personalidad y el respeto a la ley y a los derechos de los demás",
     "La soberanía nacional y la unidad territorial del Estado",
     "El principio de legalidad y la jerarquía normativa",
     "La separación de poderes y el sistema de partidos políticos"]),
  q("titulo-1-cap-1", "media",
    "¿Cómo se interpretan las normas sobre derechos fundamentales según el art. 10.2 CE?",
    ["De conformidad con la Declaración Universal de Derechos Humanos y los tratados internacionales sobre la materia ratificados por España",
     "Exclusivamente conforme a la jurisprudencia del Tribunal Constitucional",
     "De conformidad con el Derecho comparado de los Estados de la Unión Europea",
     "Conforme al criterio literal de cada precepto, sin referencia a normas internacionales"]),
  q("titulo-1-cap-1", "media",
    "¿Cómo se adquiere, conserva y pierde la nacionalidad española según el art. 11.1 CE?",
    ["De acuerdo con lo que establezca la ley",
     "De acuerdo con lo que determine directamente la Constitución, sin desarrollo legal",
     "Según el criterio exclusivo del ius soli, con independencia de la filiación",
     "Mediante decisión discrecional del Gobierno en cada caso concreto"]),
  q("titulo-1-cap-1", "media",
    "¿Puede un español de origen ser privado de su nacionalidad según el art. 11.2 CE?",
    ["No, ningún español de origen podrá ser privado de su nacionalidad",
     "Sí, mediante sentencia penal firme por delitos graves",
     "Sí, si adquiere voluntariamente otra nacionalidad distinta",
     "Sí, mediante decreto del Consejo de Ministros por razones de seguridad nacional"]),
  q("titulo-1-cap-1", "media",
    "¿Con qué países puede el Estado concertar tratados de doble nacionalidad según el art. 11.3 CE?",
    ["Con países iberoamericanos o con los que hayan tenido o tengan una particular vinculación con España",
     "Únicamente con los Estados miembros de la Unión Europea",
     "Con cualquier país del mundo, sin restricción alguna",
     "Exclusivamente con países de habla hispana en el continente americano"]),
  q("titulo-1-cap-1", "facil",
    "¿A qué edad son mayores de edad los españoles según el art. 12 CE?",
    ["A los dieciocho años",
     "A los dieciséis años",
     "A los veintiún años",
     "A los diecisiete años"]),
  q("titulo-1-cap-1", "media",
    "¿De qué gozan los extranjeros en España según el art. 13.1 CE?",
    ["De las libertades públicas del Título I, en los términos que establezcan los tratados y la ley",
     "De la totalidad de los derechos reconocidos a los españoles, sin excepción alguna",
     "Únicamente del derecho a la tutela judicial efectiva",
     "De ningún derecho hasta que adquieran la nacionalidad española"]),
  q("titulo-1-cap-1", "dificil",
    "¿Qué delitos quedan excluidos de la extradición según el art. 13.3 CE?",
    ["Los delitos políticos; no se consideran como tales los actos de terrorismo",
     "Los delitos políticos, incluyendo en todo caso los actos de terrorismo",
     "Los delitos económicos, con independencia de su gravedad",
     "Ningún delito queda excluido de la extradición según la Constitución"]),
  q("titulo-1-cap-1", "media",
    "¿Qué regula el art. 13.4 CE?",
    ["Que la ley establecerá los términos en que los ciudadanos de otros países y los apátridas podrán gozar del derecho de asilo en España",
     "La concesión automática de la nacionalidad española a los solicitantes de asilo",
     "La prohibición absoluta del derecho de asilo en territorio español",
     "La competencia exclusiva de la Unión Europea para conceder el asilo en España"]),
  q("titulo-1-cap-4", "media",
    "¿A quién vinculan los derechos del Capítulo II del Título I y cómo se protege su contenido esencial según el art. 53.1 CE?",
    ["Vinculan a todos los poderes públicos; solo por ley, que deberá respetar su contenido esencial, puede regularse su ejercicio",
     "Vinculan únicamente al legislador, no a la Administración ni a los tribunales",
     "Vinculan solo a las Administraciones Públicas, no a los poderes legislativo y judicial",
     "No requieren desarrollo legal alguno para su ejercicio efectivo"]),
  q("titulo-1-cap-4", "dificil",
    "¿Cómo se protegen los principios rectores del Capítulo III del Título I según el art. 53.3 CE?",
    ["Informan la legislación positiva, la práctica judicial y la actuación de los poderes públicos; solo son alegables ante la jurisdicción ordinaria según lo que dispongan las leyes que los desarrollen",
     "Son directamente exigibles ante los tribunales sin necesidad de desarrollo legal",
     "Carecen de cualquier eficacia jurídica hasta su desarrollo por ley orgánica",
     "Solo vinculan al Gobierno en el ejercicio de la potestad reglamentaria"]),
  q("titulo-1-cap-4", "media",
    "¿Qué institución regula el art. 54 CE?",
    ["El Defensor del Pueblo, alto comisionado de las Cortes Generales para la defensa de los derechos del Título I, que puede supervisar la actividad de la Administración",
     "El Tribunal Constitucional, como máximo intérprete de la Constitución",
     "El Consejo de Estado, como supremo órgano consultivo del Gobierno",
     "El Ministerio Fiscal, como garante de la legalidad"]),
  q("titulo-1-cap-5", "dificil",
    "¿Cuál de estos derechos puede suspenderse en estado de excepción o sitio según el art. 55.1 CE?",
    ["El derecho a la libertad de expresión reconocido en el art. 20.1.a) y d)",
     "El derecho a la vida reconocido en el art. 15",
     "El derecho a la igualdad reconocido en el art. 14",
     "El derecho a la tutela judicial efectiva reconocido en el art. 24"]),
  q("titulo-1-cap-5", "dificil",
    "¿Qué permite el art. 55.2 CE respecto a las investigaciones sobre terrorismo?",
    ["Que una ley orgánica permita la suspensión individual de determinados derechos para investigaciones sobre bandas armadas o terroristas, con intervención judicial y control parlamentario",
     "La suspensión general e indefinida de todos los derechos fundamentales sin control judicial",
     "Que el Gobierno suspenda derechos individuales mediante decreto-ley, sin intervención judicial",
     "La suspensión automática de la nacionalidad de los condenados por terrorismo"]),
];

console.log(`📝 Insertando ${PREGUNTAS.length} preguntas de ${TEMA} (parte 2)...`);
await insertPreguntas(PREGUNTAS);
console.log(`✅ Parte 2 completada.`);
