/**
 * Tema-8: Ley 39/2015 (V) — Título V completo: revisión de oficio (Cap. I,
 * arts. 106-111) y recursos administrativos (Cap. II, arts. 112-126)
 * [temario de esta oposición], más Título VI (iniciativa legislativa y
 * potestad reglamentaria, arts. 127-133) como biblioteca completa (no
 * exigido en este temario).
 *
 * Uso: node --env-file=.env.local scripts/seed-flashcards-tema-8.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

async function insertBatch(filas) {
  const res = await fetch(`${URL_BASE}/rest/v1/flashcards`, { method: "POST", headers: { ...HEADERS, Prefer: "return=minimal" }, body: JSON.stringify(filas) });
  if (!res.ok) { console.error(`❌ ${res.status} ${await res.text()}`); process.exit(1); }
}

const TEMA = "tema-8";
const c = (seccion, anverso, reverso) => ({ tema_slug: TEMA, seccion, anverso, reverso });

const CARDS = [
  // Cap. I: Revisión de oficio (arts. 106-111)
  c("titulo-5-cap-1", "¿Qué requiere la revisión de oficio de actos nulos (art. 106.1)?", "Previo dictamen favorable del Consejo de Estado u órgano consultivo equivalente de la CCAA"),
  c("titulo-5-cap-1", "¿Qué plazo produce la caducidad en la revisión de oficio iniciada de oficio (art. 106.5)?", "6 meses desde su inicio sin dictarse resolución"),
  c("titulo-5-cap-1", "¿Qué es la declaración de lesividad (art. 107.1)?", "El medio para que la Administración impugne ante lo contencioso-administrativo sus propios actos favorables pero anulables"),
  c("titulo-5-cap-1", "¿En qué plazo debe adoptarse la declaración de lesividad (art. 107.2)?", "Dentro de los 4 años desde que se dictó el acto"),
  c("titulo-5-cap-1", "¿Puede la Administración revocar sus actos de gravamen (art. 109.1)?", "Sí, mientras no prescriba la acción, si no constituye dispensa no permitida ni es contraria a la igualdad o al interés público"),
  c("titulo-5-cap-1", "¿Pueden rectificarse errores materiales o aritméticos (art. 109.2)?", "Sí, en cualquier momento, de oficio o a instancia de los interesados"),
  c("titulo-5-cap-1", "¿Cuáles son los límites de la revisión (art. 110)?", "No puede ejercerse cuando por prescripción, tiempo transcurrido u otras circunstancias resulte contraria a la equidad, buena fe, derecho de particulares o las leyes"),

  // Cap. II: Recursos administrativos (arts. 112-126)
  c("titulo-5-cap-2", "¿Qué recursos caben contra resoluciones y actos de trámite cualificados (art. 112.1)?", "Los recursos de alzada y potestativo de reposición, fundados en las causas de nulidad o anulabilidad de los arts. 47-48"),
  c("titulo-5-cap-2", "¿Cabe recurso contra disposiciones administrativas de carácter general (art. 112.3)?", "No, en vía administrativa"),
  c("titulo-5-cap-2", "Enumera las causas de inadmisión de un recurso (art. 116)", "Incompetencia del órgano; falta de legitimación; acto no susceptible de recurso; plazo transcurrido; carecer manifiestamente de fundamento"),
  c("titulo-5-cap-2", "¿Suspende la ejecución la interposición de un recurso (art. 117.1)?", "No, salvo disposición en contrario"),
  c("titulo-5-cap-2", "¿Cuándo puede suspenderse la ejecución de un acto recurrido (art. 117.2)?", "Si la ejecución causa perjuicios de imposible/difícil reparación, o el recurso se funda en causa de nulidad de pleno derecho"),
  c("titulo-5-cap-2", "¿Ante qué órgano se recurre en alzada (art. 121.1)?", "Ante el órgano superior jerárquico del que dictó el acto, cuando este no ponga fin a la vía administrativa"),
  c("titulo-5-cap-2", "¿Cuál es el plazo para interponer el recurso de alzada (art. 122.1)?", "1 mes si el acto es expreso; en cualquier momento si no lo es (tras el silencio)"),
  c("titulo-5-cap-2", "¿Cuál es el plazo máximo para resolver el recurso de alzada (art. 122.2)?", "3 meses, transcurridos los cuales se puede entender desestimado"),
  c("titulo-5-cap-2", "¿Cómo es el recurso de reposición (art. 123.1)?", "Potestativo, contra actos que pongan fin a la vía administrativa, ante el mismo órgano que los dictó"),
  c("titulo-5-cap-2", "¿Cuál es el plazo para el recurso de reposición (art. 124)?", "1 mes para interponerlo (si es expreso) y 1 mes máximo para resolverlo"),
  c("titulo-5-cap-2", "Enumera las causas del recurso extraordinario de revisión (art. 125.1)", "a) Error de hecho de los documentos del expediente; b) documentos esenciales posteriores que evidencien error; c) documentos/testimonios declarados falsos por sentencia firme; d) resolución por prevaricación, cohecho, violencia u otra conducta punible declarada por sentencia firme"),
  c("titulo-5-cap-2", "¿En qué plazo se interpone el recurso extraordinario de revisión por error de hecho (art. 125.2)?", "4 años desde la notificación de la resolución impugnada; en los demás casos, 3 meses"),
  c("titulo-5-cap-2", "¿Qué órgano resuelve el recurso extraordinario de revisión (art. 125.1)?", "El mismo órgano administrativo que dictó el acto firme"),

  // Título VI: Iniciativa legislativa y potestad reglamentaria (arts. 127-133) — biblioteca, fuera del temario
  c("titulo-6", "¿A quién corresponde la potestad reglamentaria según el art. 128.1?", "Al Gobierno de la Nación, a los órganos de Gobierno de las CCAA y a los órganos de gobierno locales"),
  c("titulo-6", "¿Qué no pueden hacer los reglamentos según el art. 128.2?", "Vulnerar la Constitución o las leyes, ni tipificar delitos/infracciones, establecer sanciones o tributos"),
  c("titulo-6", "Enumera los principios de buena regulación del art. 129.1", "Necesidad, eficacia, proporcionalidad, seguridad jurídica, transparencia y eficiencia"),
  c("titulo-6", "¿Qué exige el principio de transparencia según el art. 129.5?", "Acceso sencillo a la normativa en vigor, justificar objetivos en el preámbulo, y participación activa de los destinatarios"),
  c("titulo-6", "¿Cuándo entran en vigor las normas según el art. 131?", "Cuando se publican en el diario oficial correspondiente"),
  c("titulo-6", "¿Qué es la consulta pública previa del art. 133.1?", "Un trámite, a través del portal web, para recabar la opinión sobre problemas, necesidad, objetivos y alternativas de una futura norma"),
];

console.log(`📝 Insertando ${CARDS.length} flashcards de tema-8...`);
await insertBatch(CARDS);

const SECCIONES_AUX_ADMIN = ["titulo-5-cap-1", "titulo-5-cap-2"];
const patchTO = await fetch(`${URL_BASE}/rest/v1/tema_oposicion?tema_slug=eq.tema-8&oposicion_slug=eq.auxiliar-administrativo`, {
  method: "PATCH", headers: { ...HEADERS, Prefer: "return=representation" }, body: JSON.stringify({ secciones_incluidas: SECCIONES_AUX_ADMIN }),
});
if (!patchTO.ok) { console.error(`❌ ${patchTO.status} ${await patchTO.text()}`); process.exit(1); }
console.log("✅ tema_oposicion (auxiliar-administrativo, tema-8) limitado a:", SECCIONES_AUX_ADMIN);
console.log("✅ Tema-8 completado.");
