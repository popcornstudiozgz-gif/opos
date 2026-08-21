/**
 * Tema-6: Ley 39/2015 (III) — Título III completo: requisitos de los actos
 * (Cap. I, arts. 34-36), eficacia (Cap. II, arts. 37-46), nulidad y
 * anulabilidad (Cap. III, arts. 47-52).
 *
 * Uso: node --env-file=.env.local scripts/seed-flashcards-tema-6.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

async function insertBatch(filas) {
  const res = await fetch(`${URL_BASE}/rest/v1/flashcards`, { method: "POST", headers: { ...HEADERS, Prefer: "return=minimal" }, body: JSON.stringify(filas) });
  if (!res.ok) { console.error(`❌ ${res.status} ${await res.text()}`); process.exit(1); }
}

const TEMA = "tema-6";
const c = (seccion, anverso, reverso) => ({ tema_slug: TEMA, seccion, anverso, reverso });

const CARDS = [
  // Cap. I: Requisitos (arts. 34-36)
  c("titulo-3-cap-1", "¿Cómo se producen los actos administrativos según el art. 34.1?", "Por el órgano competente, ajustándose a los requisitos y procedimiento establecido"),
  c("titulo-3-cap-1", "Enumera 4 tipos de actos que deben motivarse según el art. 35.1", "Los que limiten derechos; los que resuelvan revisión de oficio o recursos; los que se separen del criterio precedente; los de suspensión y medidas provisionales; los sancionadores; los discrecionales"),
  c("titulo-3-cap-1", "¿En qué forma se producen los actos administrativos (art. 36.1)?", "Por escrito, a través de medios electrónicos, salvo que su naturaleza exija otra forma"),
  c("titulo-3-cap-1", "¿Pueden refundirse varios actos de la misma naturaleza (art. 36.3)?", "Sí, en un único acto, especificando las circunstancias que individualicen los efectos para cada interesado"),

  // Cap. II: Eficacia (arts. 37-46)
  c("titulo-3-cap-2", "¿Qué es la inderogabilidad singular (art. 37.1)?", "Las resoluciones particulares no pueden vulnerar una disposición general, aunque procedan de órgano de igual o superior jerarquía"),
  c("titulo-3-cap-2", "¿Cuándo son ejecutivos los actos de las AAPP (art. 38)?", "Con arreglo a lo dispuesto en la Ley"),
  c("titulo-3-cap-2", "¿Desde cuándo producen efectos los actos administrativos (art. 39.1)?", "Desde la fecha en que se dictan, salvo que dispongan otra cosa; se presumen válidos"),
  c("titulo-3-cap-2", "¿Cuándo puede otorgarse eficacia retroactiva a un acto (art. 39.3)?", "Cuando se dicte en sustitución de un acto anulado, o cuando sea favorable al interesado y no lesione derechos de terceros"),
  c("titulo-3-cap-2", "¿En qué plazo debe notificarse una resolución (art. 40.2)?", "Dentro de los 10 días desde que el acto haya sido dictado"),
  c("titulo-3-cap-2", "¿Qué debe contener toda notificación (art. 40.2)?", "El texto íntegro, si pone fin a la vía administrativa, los recursos que procedan, el órgano y el plazo para interponerlos"),
  c("titulo-3-cap-2", "¿Cómo se practican preferentemente las notificaciones (art. 41.1)?", "Por medios electrónicos, y en todo caso cuando el interesado esté obligado a recibirlas así"),
  c("titulo-3-cap-2", "¿Qué notificaciones nunca se hacen por medios electrónicos (art. 41.2)?", "Las que incluyan elementos no convertibles a formato electrónico y las que contengan medios de pago (cheques)"),
  c("titulo-3-cap-2", "En una notificación en papel, ¿quién puede hacerse cargo si el interesado no está (art. 42.2)?", "Cualquier persona mayor de 14 años presente en el domicilio que haga constar su identidad"),
  c("titulo-3-cap-2", "¿Cuándo se entiende practicada una notificación electrónica (art. 43.2)?", "En el momento en que se accede a su contenido; se entiende rechazada tras 10 días naturales sin acceder"),
  c("titulo-3-cap-2", "¿Cómo se notifica cuando el interesado es desconocido o la notificación resultó infructuosa (art. 44)?", "Mediante anuncio publicado en el BOE"),
  c("titulo-3-cap-2", "¿Cuándo se publican los actos administrativos surtiendo efectos de notificación (art. 45.1)?", "Cuando tengan por destinatario a una pluralidad indeterminada de personas, o en procedimientos selectivos/de concurrencia competitiva"),

  // Cap. III: Nulidad y anulabilidad (arts. 47-52) — el más clásico de examen
  c("titulo-3-cap-3", "Enumera las causas de nulidad de pleno derecho del art. 47.1", "a) Lesionar derechos susceptibles de amparo constitucional; b) órgano manifiestamente incompetente; c) contenido imposible; d) infracción penal; e) prescindir total y absolutamente del procedimiento; f) adquirir facultades sin requisitos esenciales; g) lo que establezca una ley"),
  c("titulo-3-cap-3", "¿Qué disposiciones administrativas son nulas de pleno derecho (art. 47.2)?", "Las que vulneren la Constitución, leyes o normas de rango superior, regulen materias reservadas a ley, o establezcan retroactividad de disposiciones sancionadoras desfavorables"),
  c("titulo-3-cap-3", "¿Qué actos son anulables según el art. 48.1?", "Los que incurran en cualquier infracción del ordenamiento jurídico, incluida la desviación de poder"),
  c("titulo-3-cap-3", "¿Cuándo el defecto de forma determina anulabilidad (art. 48.2)?", "Solo cuando el acto carezca de requisitos formales indispensables para su fin o cause indefensión"),
  c("titulo-3-cap-3", "¿Afecta la nulidad de un acto a los actos sucesivos independientes (art. 49.1)?", "No"),
  c("titulo-3-cap-3", "¿Qué es la conversión de actos viciados (art. 50)?", "Los actos nulos o anulables que contengan los elementos de otro distinto producen los efectos de este"),
  c("titulo-3-cap-3", "¿Qué es la conservación de actos y trámites (art. 51)?", "El órgano que declare la nulidad dispondrá la conservación de los actos y trámites cuyo contenido se hubiera mantenido igual sin la infracción"),
  c("titulo-3-cap-3", "¿Qué es la convalidación (art. 52.1)?", "La Administración puede convalidar los actos anulables, subsanando los vicios"),
  c("titulo-3-cap-3", "¿Quién puede convalidar un vicio de incompetencia no determinante de nulidad (art. 52.3)?", "El órgano competente, cuando sea superior jerárquico del que dictó el acto viciado"),
];

console.log(`📝 Insertando ${CARDS.length} flashcards de tema-6...`);
await insertBatch(CARDS);

const SECCIONES_AUX_ADMIN = ["titulo-3-cap-1", "titulo-3-cap-2", "titulo-3-cap-3"];
const patchTO = await fetch(`${URL_BASE}/rest/v1/tema_oposicion?tema_slug=eq.tema-6&oposicion_slug=eq.auxiliar-administrativo`, {
  method: "PATCH", headers: { ...HEADERS, Prefer: "return=representation" }, body: JSON.stringify({ secciones_incluidas: SECCIONES_AUX_ADMIN }),
});
if (!patchTO.ok) { console.error(`❌ ${patchTO.status} ${await patchTO.text()}`); process.exit(1); }
console.log("✅ tema_oposicion (auxiliar-administrativo, tema-6) limitado a:", SECCIONES_AUX_ADMIN);
console.log("✅ Tema-6 completado.");
