/**
 * Alta del tema canónico nuevo: "El Derecho Administrativo: concepto y
 * fuentes" — para el Tema 3 de la oposición de la DPZ ("Derecho
 * Administrativo. Concepto. Fuentes del Derecho Administrativo.
 * Sometimiento de la Administración a la Ley y al Derecho.").
 *
 * A diferencia de casi todo el resto del temario ya sembrado, este no es
 * el desarrollo de un artículo o capítulo de una norma concreta: es
 * doctrina general de Derecho Administrativo I (concepto de la
 * disciplina, sistema de fuentes, relación ley-reglamento), la misma que
 * trae cualquier manual universitario o de preparación de oposiciones. No
 * hay "fuente primaria" que verificar artículo por artículo como en el
 * resto de temas — el contenido se apoya en los dos anclajes
 * constitucionales que sí están fielmente documentados en content-raw
 * (art. 9.3 CE, jerarquía normativa; art. 103.1 CE, sometimiento pleno a
 * la ley y al Derecho) y, para el resto, en doctrina asentada y no
 * controvertida.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-21-derecho-administrativo.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

async function upsert(tabla, filas, onConflict) {
  const res = await fetch(`${URL_BASE}/rest/v1/${tabla}?on_conflict=${onConflict}`, {
    method: "POST",
    headers: { ...HEADERS, Prefer: "resolution=merge-duplicates,return=representation" },
    body: JSON.stringify(filas),
  });
  if (!res.ok) { console.error(`❌ Error insertando en ${tabla}: ${res.status} ${await res.text()}`); process.exit(1); }
  const data = await res.json();
  console.log(`   ✓ ${tabla}: ${data.length} filas`);
  return data;
}

const TEMA = "tema-21";

async function main() {
  console.log("📝 temas...");
  await upsert(
    "temas",
    [
      {
        slug: TEMA,
        titulo: "El Derecho Administrativo: concepto y fuentes",
        descripcion: "Concepto de Derecho Administrativo. El sistema de fuentes: Constitución, tratados, ley, reglamento, costumbre, principios generales y jurisprudencia. La relación entre ley y reglamento. El sometimiento pleno de la Administración a la Ley y al Derecho.",
        contenido: "El Derecho Administrativo es la rama del Derecho Público que regula la organización y el funcionamiento de las Administraciones Públicas, así como sus relaciones con los ciudadanos y con las demás Administraciones. Se apoya en un sistema de fuentes propio, presidido por la Constitución y regido por los principios de jerarquía normativa (art. 9.3 CE) y de sometimiento pleno a la Ley y al Derecho (art. 103.1 CE).",
        enlaces_boe: [{ titulo: "Constitución Española", url: "https://www.boe.es/buscar/act.php?id=BOE-A-1978-31229" }],
        indice_estudio: [],
      },
    ],
    "slug"
  );

  const SECCION = "concepto-fuentes";
  const c = (anverso, reverso) => ({ tema_slug: TEMA, seccion: SECCION, anverso, reverso });
  const CARDS = [
    c("¿Qué es el Derecho Administrativo?", "La rama del Derecho Público que regula la organización y el funcionamiento de las Administraciones Públicas, y sus relaciones con los ciudadanos y con otras Administraciones"),
    c("¿Cuál es la primera fuente del Derecho Administrativo, por encima de cualquier otra norma?", "La Constitución, como norma suprema del ordenamiento jurídico (art. 9.1 CE)"),
    c("Dentro de la ley, ¿qué distingue a la ley orgánica de la ley ordinaria?", "La ley orgánica exige mayoría absoluta del Congreso en una votación final sobre el conjunto del proyecto (art. 81 CE) y se reserva a materias tasadas; la ley ordinaria se aprueba por mayoría simple"),
    c("¿Qué es el reglamento como fuente del Derecho Administrativo?", "Una norma jurídica de rango inferior a la ley, dictada por la Administración en ejercicio de la potestad reglamentaria, subordinada siempre a la ley"),
    c("¿Qué papel tiene la costumbre como fuente del Derecho Administrativo?", "Un papel muy limitado y residual, dado el carácter escrito y formalizado propio del Derecho Administrativo — solo opera en defecto de norma escrita aplicable y sin contradecirla"),
    c("¿Qué función cumplen los principios generales del Derecho en el Derecho Administrativo?", "Una doble función: informadora del ordenamiento (inspiran su interpretación) y supletoria (se aplican en defecto de ley o costumbre)"),
    c("¿Es la jurisprudencia fuente del Derecho en sentido estricto según el art. 1.6 del Código Civil?", "No es fuente en sentido estricto, pero complementa el ordenamiento jurídico con la doctrina que, de modo reiterado, establezca el Tribunal Supremo al interpretar y aplicar la ley, la costumbre y los principios generales"),
    c("¿Qué garantiza el art. 9.3 CE en relación con las normas jurídicas?", "El principio de legalidad, la jerarquía normativa, la publicidad de las normas, la irretroactividad de las disposiciones sancionadoras no favorables, la seguridad jurídica, la responsabilidad y la interdicción de la arbitrariedad de los poderes públicos"),
    c("¿Qué principio consagra el art. 103.1 CE respecto a la actuación de la Administración Pública?", "Que la Administración Pública sirve con objetividad los intereses generales y actúa con sometimiento pleno a la ley y al Derecho"),
    c("¿Qué relación existe entre la ley y el reglamento?", "De jerarquía y subordinación: el reglamento no puede contradecir ni sustituir a la ley, y una norma reglamentaria no puede derogar ni modificar lo dispuesto por una norma de rango de ley"),
    c("¿Qué es la reserva de ley?", "La exigencia constitucional o legal de que determinadas materias (como la regulación de derechos fundamentales o la creación de tributos) solo puedan regularse mediante una norma con rango de ley, no por reglamento"),
    c("¿Qué es la inderogabilidad singular de los reglamentos?", "El principio por el que un órgano administrativo no puede dejar de aplicar un reglamento vigente en un caso concreto mediante un acto singular, aunque ese órgano tenga rango superior a quien dictó el reglamento"),
  ];
  console.log("📇 flashcards...");
  const resF = await fetch(`${URL_BASE}/rest/v1/flashcards`, { method: "POST", headers: { ...HEADERS, Prefer: "return=minimal" }, body: JSON.stringify(CARDS) });
  if (!resF.ok) { console.error(`❌ flashcards ${resF.status} ${await resF.text()}`); process.exit(1); }
  console.log(`   ✓ ${CARDS.length} flashcards`);

  const q = (dificultad, enunciado, opciones, explicacion) => ({ dificultad, enunciado, opciones, explicacion });
  const PREGUNTAS = [
    q("facil",
      "¿Qué es el Derecho Administrativo?",
      ["La rama del Derecho Público que regula la organización y el funcionamiento de las Administraciones Públicas, y sus relaciones con los ciudadanos y con otras Administraciones",
       "La rama del Derecho Privado que regula los contratos entre particulares y empresas públicas",
       "El conjunto de normas que regula exclusivamente el procedimiento sancionador",
       "La rama del Derecho que regula únicamente la organización interna de los Ministerios del Estado"],
      "El Derecho Administrativo es Derecho Público: regula la organización y actividad de las Administraciones Públicas y sus relaciones tanto con los ciudadanos como entre sí, no solo aspectos parciales como el procedimiento sancionador o la organización interna estatal."),
    q("facil",
      "¿Cuál es la fuente primera del Derecho Administrativo, por encima de cualquier otra norma?",
      ["La Constitución, como norma suprema del ordenamiento jurídico",
       "El reglamento, por ser la norma más próxima a la actividad administrativa concreta",
       "La costumbre administrativa, por su carácter tradicional",
       "Los tratados internacionales, con preferencia sobre la Constitución"],
      "El art. 9.1 CE proclama la sujeción de ciudadanos y poderes públicos a la Constitución y al resto del ordenamiento; ninguna otra fuente —ni el reglamento, ni la costumbre, ni siquiera un tratado— puede situarse por encima de ella."),
    q("media",
      "Dentro de la ley como fuente, ¿qué distingue a la ley orgánica de la ley ordinaria?",
      ["La ley orgánica exige mayoría absoluta del Congreso en una votación final sobre el conjunto del proyecto y se reserva a materias tasadas por la Constitución; la ley ordinaria se aprueba por mayoría simple",
       "La ley orgánica la aprueba el Gobierno por decreto, sin intervención de las Cortes",
       "No existe diferencia de procedimiento, solo de nombre",
       "La ley ordinaria tiene rango superior a la ley orgánica"],
      "El art. 81 CE reserva la ley orgánica a materias específicas (desarrollo de derechos fundamentales, Estatutos de Autonomía, régimen electoral general, entre otras) y exige mayoría absoluta en votación final de conjunto, un requisito reforzado que no exige la ley ordinaria."),
    q("media",
      "¿Cómo se relaciona el reglamento con la ley como fuentes del Derecho Administrativo?",
      ["El reglamento es una norma de rango inferior a la ley, dictada por la Administración en ejercicio de la potestad reglamentaria, y siempre subordinada a ella",
       "El reglamento y la ley tienen idéntico rango normativo, pudiendo el reglamento modificar libremente lo dispuesto por una ley",
       "El reglamento es superior a la ley cuando lo dicta el Consejo de Ministros",
       "El reglamento sustituye a la ley en las materias de urgente necesidad"],
      "El reglamento nace de la potestad reglamentaria de la Administración (art. 97 CE para el Gobierno), pero su posición en la jerarquía normativa (art. 9.3 CE) es siempre subordinada a la ley."),
    q("media",
      "¿Qué papel tiene la costumbre como fuente del Derecho Administrativo?",
      ["Un papel muy limitado y residual, dado el carácter escrito y formalizado propio de esta rama del Derecho: solo opera en defecto de norma escrita aplicable y sin contradecirla",
       "El mismo papel central que tiene en el Derecho Civil, como fuente ordinaria y frecuente",
       "Ningún papel: la costumbre está expresamente excluida como fuente del Derecho Administrativo",
       "Un papel superior a la ley, por su arraigo histórico en la práctica administrativa"],
      "A diferencia del Derecho Civil, donde la costumbre tiene mayor peso, en el Derecho Administrativo —de vocación escrita y formalizada— su papel es marginal, y siempre subordinado a la norma escrita."),
    q("media",
      "¿Qué doble función cumplen los principios generales del Derecho en el Derecho Administrativo?",
      ["Una función informadora del ordenamiento jurídico (inspiran su interpretación y aplicación) y una función supletoria (se aplican en defecto de ley o costumbre aplicable)",
       "Únicamente una función decorativa, sin efectos jurídicos vinculantes",
       "Sustituyen íntegramente a la ley cuando esta resulta insuficiente, con preferencia sobre ella",
       "Solo se aplican en el ámbito del Derecho Penal, no en el Derecho Administrativo"],
      "Los principios generales del Derecho (buena fe, proporcionalidad, confianza legítima, interdicción de la arbitrariedad...) informan todo el ordenamiento y actúan como fuente supletoria, nunca sustituyendo a la ley con preferencia sobre ella."),
    q("dificil",
      "¿Es la jurisprudencia fuente del Derecho en sentido estricto según el art. 1.6 del Código Civil?",
      ["No es fuente en sentido estricto, pero complementa el ordenamiento jurídico con la doctrina que, de modo reiterado, establezca el Tribunal Supremo al interpretar y aplicar la ley, la costumbre y los principios generales",
       "Sí, es una fuente del Derecho en idéntico plano que la ley y la costumbre",
       "Solo es fuente del Derecho cuando la dicta el Tribunal Constitucional, nunca el Tribunal Supremo",
       "No tiene ningún valor jurídico, es meramente orientativa y sin efectos prácticos"],
      "El art. 1.6 del Código Civil es la referencia clásica: la jurisprudencia «complementa» el ordenamiento, sin ser fuente autónoma equiparada a la ley, la costumbre y los principios generales del art. 1.1."),
    q("media",
      "¿Qué garantiza el art. 9.3 CE en relación con las normas jurídicas, base del sistema de fuentes?",
      ["El principio de legalidad, la jerarquía normativa, la publicidad de las normas, la irretroactividad de las disposiciones sancionadoras no favorables, la seguridad jurídica, la responsabilidad y la interdicción de la arbitrariedad de los poderes públicos",
       "Únicamente la publicidad de las normas en el Boletín Oficial correspondiente",
       "La posibilidad de que cualquier reglamento derogue una ley anterior si resulta más eficaz",
       "La igualdad estricta de rango entre la ley y el reglamento"],
      "El art. 9.3 CE reúne en un solo precepto el catálogo completo de garantías del sistema de fuentes, entre ellas la jerarquía normativa que ordena la relación entre Constitución, ley y reglamento."),
    q("facil",
      "¿Qué principio consagra el art. 103.1 CE respecto a la actuación de la Administración Pública?",
      ["Que la Administración Pública sirve con objetividad los intereses generales y actúa con sometimiento pleno a la ley y al Derecho",
       "Que la Administración Pública actúa con discrecionalidad plena, sin sujeción a norma alguna",
       "Que la Administración solo está sometida a sus propios reglamentos internos, no a la ley",
       "Que la Administración Pública puede apartarse de la ley cuando lo justifique el interés general"],
      "El art. 103.1 CE es la formulación constitucional del principio de legalidad administrativa: sometimiento pleno (no parcial ni discrecional) a la ley y al Derecho en su conjunto."),
    q("dificil",
      "¿Qué es la inderogabilidad singular de los reglamentos?",
      ["El principio por el que un órgano administrativo no puede dejar de aplicar un reglamento vigente en un caso concreto mediante un acto singular, aunque ese órgano tenga rango jerárquico superior a quien dictó el reglamento",
       "La imposibilidad absoluta de derogar o modificar un reglamento por ningún procedimiento, ni siquiera mediante otro reglamento de igual rango",
       "La facultad del Consejo de Ministros de derogar cualquier reglamento sin necesidad de tramitar un nuevo reglamento",
       "La prohibición de que las Comunidades Autónomas dicten reglamentos propios en materias de su competencia"],
      "La inderogabilidad singular protege el reglamento frente a excepciones ad hoc: ni siquiera un órgano jerárquicamente superior al que lo dictó puede inaplicarlo en un caso concreto por la vía de un acto singular, ha de modificarlo mediante otro reglamento."),
  ];
  console.log("📝 preguntas...");
  for (const p of PREGUNTAS) {
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
  console.log(`   ✓ ${PREGUNTAS.length} preguntas`);
  console.log(`✅ ${TEMA} completado.`);
}

await main();
