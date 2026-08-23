/**
 * Casos prácticos — Tema 4 (Los interesados en el procedimiento), caso de
 * recambio.
 *
 * Los 2 casos de `seed-casos-practicos-tema-4.mjs` quedan ocultos para
 * esta oposición: ambos usan `titulo-1-cap-2` (identificación y firma de
 * los interesados), fuera de `secciones_incluidas` de tema-4, que solo
 * pide `titulo-1-cap-1` (Ley 39/2015, arts. 3-8: capacidad de obrar y
 * concepto de interesado). Es el tema con el recorte más estrecho de toda
 * la oposición (un único capítulo), así que basta un caso nuevo, denso, que
 * recorra los 6 artículos completos de ese capítulo.
 *
 * Uso: node --env-file=.env.local scripts/seed-casos-practicos-tema-4-recorte.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

const TEMA = "tema-4";
const q = (seccion, dificultad, enunciado, opciones, explicacion) => ({ seccion, dificultad, enunciado, opciones, explicacion });

async function crearCaso({ slug, titulo, supuesto, orden, preguntas }) {
  const resCaso = await fetch(`${URL_BASE}/rest/v1/casos_practicos`, {
    method: "POST",
    headers: { ...HEADERS, Prefer: "return=representation" },
    body: JSON.stringify({ tema_slug: TEMA, slug, titulo, supuesto, orden }),
  });
  if (!resCaso.ok) { console.error(`❌ caso ${resCaso.status} ${await resCaso.text()}`); process.exit(1); }
  const [caso] = await resCaso.json();

  for (let i = 0; i < preguntas.length; i++) {
    const p = preguntas[i];
    const resP = await fetch(`${URL_BASE}/rest/v1/preguntas`, {
      method: "POST",
      headers: { ...HEADERS, Prefer: "return=representation" },
      body: JSON.stringify({ tema_slug: TEMA, seccion: p.seccion, enunciado: p.enunciado, explicacion: p.explicacion ?? null, dificultad: p.dificultad }),
    });
    if (!resP.ok) { console.error(`❌ pregunta ${resP.status} ${await resP.text()}`); process.exit(1); }
    const [pregunta] = await resP.json();

    const opciones = p.opciones.map((texto, idx) => ({ pregunta_id: pregunta.id, texto, es_correcta: idx === 0, orden: idx }));
    const resO = await fetch(`${URL_BASE}/rest/v1/opciones`, { method: "POST", headers: { ...HEADERS, Prefer: "return=minimal" }, body: JSON.stringify(opciones) });
    if (!resO.ok) { console.error(`❌ opciones ${resO.status} ${await resO.text()}`); process.exit(1); }

    const resCP = await fetch(`${URL_BASE}/rest/v1/caso_preguntas`, {
      method: "POST",
      headers: { ...HEADERS, Prefer: "return=minimal" },
      body: JSON.stringify({ caso_id: caso.id, pregunta_id: pregunta.id, orden: i }),
    });
    if (!resCP.ok) { console.error(`❌ caso_preguntas ${resCP.status} ${await resCP.text()}`); process.exit(1); }
  }
  console.log(`✅ ${titulo} (${preguntas.length} preguntas)`);
}

const CASO = {
  slug: "caso-constructora-ebro-representacion-pluralidad-interesados",
  titulo: "El caso de Constructora Ebro: representación y pluralidad de interesados",
  orden: 3,
  supuesto:
    "Constructora Ebro, S.L. presenta una solicitud de licencia de obras ante el Ayuntamiento a través de su " +
    "gestor administrativo, don Emilio Vidal, sin aportar en ese momento el poder de representación firmado. " +
    "Semanas después, en el mismo expediente comparecen dos hermanos vecinos de 16 años que se oponen a la " +
    "obra alegando que afecta a la vivienda familiar, y una asociación vecinal que se persona para defender el " +
    "entorno del barrio. Revisando el expediente, el Ayuntamiento descubre además que hay un antiguo " +
    "propietario colindante, ya fallecido, cuyo heredero no ha sido notificado, y que en la solicitud figuraban " +
    "dos empresas copromotoras sin que se indicara con cuál de ellas debía entenderse la tramitación.",
  preguntas: [
    q("titulo-1-cap-1", "facil",
      "¿Quiénes tienen capacidad de obrar ante las Administraciones Públicas según el art. 3.a de la Ley 39/2015, empezando por Constructora Ebro?",
      ["Las personas físicas o jurídicas que ostenten capacidad de obrar con arreglo a las normas civiles",
       "Únicamente las personas físicas mayores de edad, sin extenderse a las personas jurídicas",
       "Solo las empresas inscritas en el Registro Mercantil con más de un año de antigüedad",
       "Cualquier persona, sin necesidad de capacidad de obrar civil"],
      "El art. 3.a) de la Ley 39/2015 remite, como regla general, a las normas civiles sobre capacidad de obrar, aplicable tanto a personas físicas como jurídicas, como es el caso de Constructora Ebro, S.L."),
    q("titulo-1-cap-1", "media",
      "Los dos hermanos vecinos de 16 años se oponen a la obra alegando que afecta a su vivienda familiar. ¿Tienen capacidad de obrar para ello según el art. 3.b de la Ley 39/2015?",
      ["Sí: los menores de edad tienen capacidad de obrar para el ejercicio y defensa de aquellos derechos e intereses cuya actuación esté permitida por el ordenamiento jurídico sin la asistencia de quien ejerza la patria potestad, tutela o curatela",
       "No: los menores de edad carecen siempre de capacidad de obrar ante las Administraciones Públicas",
       "Solo si ambos hermanos actúan conjuntamente y de forma unánime",
       "Solo si cuentan con la autorización previa y expresa de sus padres para ese acto concreto"],
      "El art. 3.b) reconoce capacidad de obrar a los menores para defender derechos o intereses cuya actuación les permite el ordenamiento sin asistencia de sus representantes legales; no es una capacidad general, pero tampoco una incapacidad absoluta."),
    q("titulo-1-cap-1", "media",
      "¿Qué condición tiene Constructora Ebro en el procedimiento según el art. 4.1.a de la Ley 39/2015?",
      ["Es interesada por promoverlo, como titular de derechos o intereses legítimos individuales o colectivos",
       "No es interesada, sino solo la destinataria final de la resolución",
       "Solo sería interesada si el Ayuntamiento se lo reconoce expresamente mediante acto administrativo",
       "Es interesada únicamente si la obra se ejecuta finalmente"],
      "El art. 4.1.a) atribuye la condición de interesado a quien promueve el procedimiento como titular de derechos o intereses legítimos, que es exactamente la posición de Constructora Ebro al solicitar la licencia."),
    q("titulo-1-cap-1", "media",
      "La asociación vecinal se persona en el expediente para defender el entorno del barrio. ¿Qué exige el art. 4.1.c de la Ley 39/2015 para que sea considerada interesada?",
      ["Que sus intereses legítimos, individuales o colectivos, puedan resultar afectados por la resolución y se persone en el procedimiento en tanto no haya recaído resolución definitiva",
       "Que haya promovido ella misma el procedimiento desde el inicio",
       "Que cuente con la autorización previa del promotor de la obra para personarse",
       "Que acredite ser propietaria de alguna finca colindante con la obra"],
      "El art. 4.1.c) no exige haber iniciado el procedimiento ni ser propietario colindante: basta con un interés legítimo afectado y personarse antes de que recaiga resolución definitiva, como hace la asociación vecinal."),
    q("titulo-1-cap-1", "dificil",
      "El antiguo propietario colindante ha fallecido sin que su heredero fuera notificado. ¿Qué dice el art. 4.3 de la Ley 39/2015 sobre esta situación?",
      ["Cuando la condición de interesado derive de una relación jurídica transmisible, el derecho-habiente (el heredero) sucede en tal condición, cualquiera que sea el estado del procedimiento",
       "La condición de interesado se extingue automáticamente con el fallecimiento del titular original",
       "El heredero solo puede incorporarse al procedimiento si este no ha comenzado aún",
       "Es necesario que el heredero inicie un procedimiento completamente nuevo, sin poder incorporarse al ya existente"],
      "El art. 4.3) prevé expresamente la sucesión en la condición de interesado cuando la relación jurídica es transmisible, como sucede con la propiedad de un inmueble: el heredero pasa a ocupar la posición de su causante, en el estado en que se encuentre el procedimiento."),
    q("titulo-1-cap-1", "media",
      "Don Emilio Vidal actúa ante el Ayuntamiento en nombre de Constructora Ebro sin aportar en ese momento el poder firmado. ¿Qué exige el art. 5.3 de la Ley 39/2015 al respecto?",
      ["Que se acredite la representación para formular solicitudes, presentar declaraciones, interponer recursos o renunciar a derechos, aunque para los actos y gestiones de mero trámite se presume esa representación",
       "Que la representación se acredite siempre y en todo caso, sin ninguna excepción para trámites menores",
       "Que no sea necesaria ninguna acreditación de representación, bastando la mera comparecencia del gestor",
       "Que la representación solo pueda acreditarse mediante escritura pública notarial"],
      "El art. 5.3) distingue entre actuaciones que exigen acreditar representación (solicitudes, recursos, desistimientos...) y los actos de mero trámite, para los que la representación se presume sin necesidad de acreditación adicional."),
    q("titulo-1-cap-1", "media",
      "Si finalmente no se acredita correctamente la representación de Emilio Vidal, ¿qué prevé el art. 5.6 de la Ley 39/2015?",
      ["Que la falta o insuficiente acreditación de la representación no impedirá que se tenga por realizado el acto, siempre que se aporte o se subsane el defecto dentro del plazo de diez días que debe conceder el órgano administrativo",
       "Que el acto realizado por Emilio Vidal es nulo de pleno derecho, sin posibilidad de subsanación",
       "Que Constructora Ebro pierde automáticamente su condición de interesada en el procedimiento",
       "Que el plazo para subsanar la representación es de un mes en todo caso"],
      "El art. 5.6) opta por la subsanabilidad frente a la nulidad automática: el acto se tiene por realizado si el defecto de representación se corrige dentro del plazo de diez días (o uno mayor, según las circunstancias) que debe conceder la Administración."),
    q("titulo-1-cap-1", "dificil",
      "Al margen de este expediente, si Constructora Ebro quisiera inscribir un apoderamiento general y estable a favor de Emilio Vidal, ¿qué validez máxima tendría ese poder una vez inscrito, según el art. 6.6 de la Ley 39/2015?",
      ["Una validez determinada máxima de cinco años a contar desde la fecha de inscripción, prorrogable antes de su finalización",
       "Una validez indefinida, sin necesidad de renovación ni de fecha límite",
       "Una validez máxima de un año, renovable únicamente por el mismo período",
       "El poder inscrito pierde su validez automáticamente al concluir cada expediente concreto"],
      "El art. 6.6) fija un límite temporal de cinco años para los poderes inscritos en el registro electrónico de apoderamientos, con posibilidad de que el poderdante lo prorrogue (o lo revoque) antes de que expire ese plazo."),
    q("titulo-1-cap-1", "media",
      "En la solicitud figuraban dos empresas copromotoras sin indicar con cuál debía entenderse la tramitación. ¿Cómo resuelve esto el art. 7 de la Ley 39/2015?",
      ["Las actuaciones se entenderán con el representante o el interesado que expresamente hayan señalado y, en su defecto, con el que figure en primer término",
       "El Ayuntamiento debe requerir obligatoriamente a ambas empresas de forma simultánea en todo trámite, sin excepción",
       "El expediente queda paralizado hasta que las dos empresas designen conjuntamente un representante único ante notario",
       "Se entiende automáticamente con la empresa de mayor capital social, sin necesidad de ningún criterio de orden"],
      "El art. 7 da una solución práctica y sencilla a la pluralidad de interesados en una misma solicitud: se actúa con quien se haya señalado expresamente o, si no se señaló a nadie, con quien figure primero en el escrito."),
    q("titulo-1-cap-1", "media",
      "Si durante la instrucción de un procedimiento sin publicidad se advirtiera la existencia de otras personas con derechos o intereses legítimos afectados por la futura resolución, ¿qué exige el art. 8 de la Ley 39/2015?",
      ["Que se les comunique la tramitación del procedimiento, si su identificación resulta del propio expediente",
       "Que el procedimiento se anule y se inicie uno completamente nuevo con todos los interesados desde el principio",
       "Que solo se les comunique si ellos mismos solicitan expresamente su incorporación",
       "Que baste con publicar un anuncio genérico en el Boletín Oficial, sin comunicación individual"],
      "El art. 8 impone una comunicación proactiva a los nuevos interesados detectados durante la instrucción, siempre que su identificación resulte del expediente, precisamente para evitar que queden fuera de un procedimiento que puede afectarles."),
  ],
};

await crearCaso(CASO);
console.log("✔ Caso de recambio del tema 4 sembrado.");
