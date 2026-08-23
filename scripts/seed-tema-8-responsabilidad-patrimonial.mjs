/**
 * Tema-8: nueva sección "responsabilidad-patrimonial" — lo que le faltaba
 * para el Tema 8 de la DPZ ("La revisión de los actos administrativos.
 * Revisión de oficio. Recursos administrativos. La responsabilidad
 * patrimonial de la Administración."). tema-8 ya cubre revisión de oficio
 * y recursos (Ley 39/2015, Título V); la responsabilidad patrimonial no
 * la regula ya en detalle la Ley 39/2015 (se trasladó a la Ley 40/2015,
 * de Régimen Jurídico del Sector Público, que no está en content-raw), así
 * que este añadido se ciñe a su base constitucional, ya fielmente
 * documentada en content-raw/constitucion-espanola/titulo-4-gobierno-y-administracion.md
 * (art. 106.2 CE) — sin inventar desarrollo legal que no he verificado.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-8-responsabilidad-patrimonial.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

const TEMA = "tema-8";
const SECCION = "responsabilidad-patrimonial";

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
  c("¿Qué derecho reconoce el art. 106.2 CE a los particulares frente a la Administración?", "A ser indemnizados por toda lesión que sufran en cualquiera de sus bienes y derechos, salvo en casos de fuerza mayor, siempre que la lesión sea consecuencia del funcionamiento de los servicios públicos"),
  c("¿Es necesario probar culpa de un funcionario concreto para que nazca la responsabilidad patrimonial del art. 106.2 CE?", "No: basta con que la lesión sea consecuencia del funcionamiento (normal o anormal) de los servicios públicos — es una responsabilidad objetiva, no basada en la culpa"),
  c("¿Qué único supuesto excluye expresamente la responsabilidad patrimonial según el art. 106.2 CE?", "Los casos de fuerza mayor"),
  c("¿Qué controlan los Tribunales sobre la actuación administrativa según el art. 106.1 CE?", "La potestad reglamentaria y la legalidad de la actuación administrativa, así como el sometimiento de esta a los fines que la justifican"),
];
await insertFlashcards(CARDS);
console.log(`📇 ${CARDS.length} flashcards insertadas.`);

const q = (dificultad, enunciado, opciones, explicacion) => ({ dificultad, enunciado, opciones, explicacion });
const PREGUNTAS = [
  q("facil",
    "¿Qué derecho reconoce el art. 106.2 CE a los particulares frente a la Administración?",
    ["A ser indemnizados por toda lesión que sufran en cualquiera de sus bienes y derechos, salvo en casos de fuerza mayor, siempre que la lesión sea consecuencia del funcionamiento de los servicios públicos",
     "A exigir la destitución del funcionario responsable del daño causado",
     "A una indemnización solo si se acredita dolo o negligencia grave de un funcionario concreto",
     "A recurrir directamente ante el Tribunal Constitucional cualquier daño causado por la Administración"],
    "El art. 106.2 CE constitucionaliza la responsabilidad patrimonial de la Administración con un único límite expreso (la fuerza mayor), sin exigir identificar culpa de un funcionario concreto."),
  q("media",
    "¿Es necesario probar culpa o negligencia de un funcionario concreto para que nazca la responsabilidad patrimonial del art. 106.2 CE?",
    ["No: basta con que la lesión sea consecuencia del funcionamiento de los servicios públicos, sea este normal o anormal — es una responsabilidad objetiva",
     "Sí: sin identificar y probar la culpa de un empleado público concreto no hay responsabilidad patrimonial posible",
     "Solo es necesario si el daño se produjo en el ejercicio de una función pública, no en la prestación de un servicio",
     "Depende de si el funcionario responsable sigue prestando servicio en la misma Administración"],
    "La responsabilidad patrimonial regulada en el art. 106.2 CE es objetiva: no exige culpa, basta el nexo causal entre el funcionamiento del servicio público (normal o anormal) y la lesión sufrida."),
  q("media",
    "¿Qué único supuesto excluye expresamente la responsabilidad patrimonial de la Administración según el art. 106.2 CE?",
    ["Los casos de fuerza mayor",
     "Los casos de caso fortuito, con independencia de la fuerza mayor",
     "Los daños causados fuera del horario habitual de prestación del servicio",
     "Los daños de cuantía inferior a un umbral económico fijado por ley"],
    "El art. 106.2 CE solo excluye expresamente la fuerza mayor; no menciona el caso fortuito como excepción autónoma, ni fija ningún umbral económico ni límite horario."),
  q("facil",
    "Al margen de la responsabilidad patrimonial, ¿qué controlan los Tribunales sobre la actuación administrativa según el art. 106.1 CE?",
    ["La potestad reglamentaria y la legalidad de la actuación administrativa, así como su sometimiento a los fines que la justifican",
     "Únicamente la legalidad de los actos administrativos, sin extenderse a los reglamentos",
     "Solo la actuación de la Administración General del Estado, no la de las entidades locales",
     "La oportunidad política de las decisiones administrativas, sustituyendo el criterio del órgano competente"],
    "El art. 106.1 CE es la base constitucional del control judicial de la Administración: alcanza tanto a los reglamentos como a los actos, y se limita a la legalidad y a la finalidad (nunca a sustituir la valoración de oportunidad del órgano administrativo)."),
];
await insertPreguntas(PREGUNTAS);
console.log(`📝 ${PREGUNTAS.length} preguntas insertadas.`);
console.log(`✅ ${TEMA}/${SECCION} completado.`);
