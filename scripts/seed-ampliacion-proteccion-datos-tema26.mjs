/**
 * Amplía la sección "proteccion-datos-principios" de `tema-26` (compartida
 * con la DPZ) con contenido nuevo, necesario para que esta sección sirva de
 * base real al Tema 9 de la DGA — "La protección de los datos personales en
 * el ámbito de las Administraciones Públicas al amparo del Reglamento (UE)
 * 2016/679 (RGPD) y de la Ley Orgánica 3/2018 (LOPDGDD)".
 *
 * Antes de esta ampliación, la sección solo cubría 6 flashcards / 10
 * preguntas centradas en un puñado de artículos de la LOPDGDD (objeto,
 * exactitud, confidencialidad, poderes públicos, categorías especiales,
 * derecho de acceso) — suficiente para la DPZ, pero corto para lo que pide
 * el programa de la DGA, que habla de "principios generales" (los 7
 * principios del art. 5 RGPD no estaban cubiertos ninguno) y de "derechos
 * de las personas" (solo el de acceso estaba, faltaban rectificación,
 * supresión, oposición, limitación y portabilidad).
 *
 * Se añade además el ángulo específicamente de Administración Pública que
 * el programa de la DGA subraya y que antes no estaba: el inventario
 * público de actividades de tratamiento (art. 31.2 LOPDGDD, obligación
 * propia del sector público), la designación obligatoria de delegado de
 * protección de datos en las AAPP (art. 34 LOPDGDD + art. 37.1.a RGPD), el
 * régimen sancionador distinto para AAPP —apercibimiento, no multa— (art.
 * 77 LOPDGDD) y el Esquema Nacional de Seguridad como marco de seguridad
 * del sector público (disposición adicional primera LOPDGDD).
 *
 * Fuente: texto consolidado de la Ley Orgánica 3/2018, de 5 de diciembre
 * (BOE núm. 294, de 6 de diciembre de 2018), leído íntegro para este seed
 * (arts. 1-97 y disposiciones), y los principios del art. 5 del Reglamento
 * (UE) 2016/679, citados literalmente por la propia LOPDGDD.
 *
 * No se toca ningún registro de la DPZ: se añade contenido nuevo a la
 * misma sección ya usada por ambas oposiciones — DPZ hereda esta ampliación
 * de forma automática y sin ningún cambio en su recorte.
 *
 * Uso: node --env-file=.env.local scripts/seed-ampliacion-proteccion-datos-tema26.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!URL_BASE || !SERVICE_KEY) {
  console.error("❌ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-26";
const SECCION = "proteccion-datos-principios";

async function insertar(tabla, filas) {
  const res = await fetch(`${URL_BASE}/rest/v1/${tabla}`, {
    method: "POST",
    headers: { ...HEADERS, Prefer: "return=representation" },
    body: JSON.stringify(filas),
  });
  if (!res.ok) {
    console.error(`❌ Error insertando en ${tabla}: ${res.status} ${await res.text()}`);
    process.exit(1);
  }
  const data = await res.json();
  console.log(`   ✓ ${tabla}: ${data.length} filas`);
  return data;
}

console.log("📝 flashcards (principios RGPD, derechos, AAPP)...");
await insertar(
  "flashcards",
  [
    {
      anverso: "Según el art. 5.1.b) del RGPD, ¿qué principio impide tratar los datos de forma incompatible con los fines para los que se recogieron?",
      reverso: "El principio de limitación de la finalidad",
    },
    {
      anverso: "¿Qué principio del art. 5.1.c) RGPD exige que los datos sean adecuados, pertinentes y limitados a lo necesario?",
      reverso: "El principio de minimización de datos",
    },
    {
      anverso: "¿Qué principio del art. 5.1.e) RGPD limita el tiempo que los datos pueden mantenerse identificando al afectado?",
      reverso: "El principio de limitación del plazo de conservación",
    },
    {
      anverso: "Según el art. 5.2 RGPD, ¿qué debe poder demostrar en todo momento el responsable del tratamiento?",
      reverso: "El cumplimiento de los principios del art. 5.1 RGPD (principio de responsabilidad proactiva o \"accountability\")",
    },
    {
      anverso: "Conforme al art. 6.1 LOPDGDD, ¿qué características debe reunir el consentimiento del afectado?",
      reverso: "Ser una manifestación de voluntad libre, específica, informada e inequívoca, mediante declaración o clara acción afirmativa",
    },
    {
      anverso: "Según el art. 7 LOPDGDD, ¿a partir de qué edad puede un menor consentir por sí mismo el tratamiento de sus datos?",
      reverso: "A partir de los catorce años",
    },
    {
      anverso: "Según el art. 14 LOPDGDD, ¿qué debe indicar el afectado al ejercer su derecho de rectificación?",
      reverso: "A qué datos se refiere y la corrección que haya de realizarse, con documentación justificativa si procede",
    },
    {
      anverso: "Conforme al art. 28 LOPDGDD, ¿qué debe valorar el responsable al determinar las medidas técnicas y organizativas apropiadas?",
      reverso: "Si procede la evaluación de impacto en la protección de datos y la consulta previa a la autoridad de control",
    },
    {
      anverso: "Según el art. 31.2 LOPDGDD, ¿qué deben publicar por medios electrónicos las Administraciones Públicas sobre sus tratamientos?",
      reverso: "Un inventario de sus actividades de tratamiento, con la información del art. 30 RGPD y su base legal",
    },
    {
      anverso: "Según el art. 34.1 LOPDGDD y el art. 37.1.a) RGPD, ¿deben las Administraciones Públicas designar un delegado de protección de datos?",
      reverso: "Sí, con carácter general",
    },
    {
      anverso: "Según el art. 77.2 LOPDGDD, ¿qué sanción impone la autoridad de protección de datos a una Administración Pública infractora?",
      reverso: "Un apercibimiento, junto con las medidas para que cese la conducta (no la sanción económica del sector privado)",
    },
    {
      anverso: "Según la disposición adicional primera LOPDGDD, ¿qué instrumento recoge las medidas de seguridad del sector público en el tratamiento de datos?",
      reverso: "El Esquema Nacional de Seguridad (ENS)",
    },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: SECCION })),
);

console.log("📝 preguntas de test (principios RGPD, derechos, AAPP)...");
await insertar(
  "preguntas",
  [
    {
      enunciado: "Según el art. 5.1.b) del RGPD, ¿qué principio impide tratar los datos personales de manera incompatible con los fines para los que fueron recogidos?",
      explicacion: "Es el principio de limitación de la finalidad (art. 5.1.b RGPD): los datos se recogen con fines determinados, explícitos y legítimos, y no se tratan posteriormente de forma incompatible con ellos.",
      dificultad: "media",
    },
    {
      enunciado: "¿Qué principio del art. 5.1.c) RGPD exige que los datos tratados sean adecuados, pertinentes y limitados a lo necesario para la finalidad perseguida?",
      explicacion: "El principio de minimización de datos: solo deben tratarse los datos estrictamente necesarios para el fin del tratamiento, ni más ni menos.",
      dificultad: "media",
    },
    {
      enunciado: "¿Qué principio del art. 5.1.e) RGPD limita el tiempo durante el que unos datos personales pueden mantenerse de forma que permitan identificar al afectado?",
      explicacion: "El principio de limitación del plazo de conservación: los datos no deben conservarse identificando al interesado más tiempo del necesario para los fines del tratamiento.",
      dificultad: "media",
    },
    {
      enunciado: "Según el art. 5.2 RGPD, ¿qué debe poder demostrar en todo momento el responsable del tratamiento?",
      explicacion: "El cumplimiento de los principios del art. 5.1 RGPD — es el principio de responsabilidad proactiva o \"accountability\", que no se limita a cumplir la norma sino a poder acreditarlo.",
      dificultad: "dificil",
    },
    {
      enunciado: "Conforme al art. 6.1 LOPDGDD, ¿qué características debe reunir el consentimiento del afectado para que el tratamiento de sus datos sea lícito por esta vía?",
      explicacion: "Debe ser una manifestación de voluntad libre, específica, informada e inequívoca, mediante declaración o una clara acción afirmativa — queda excluido el llamado \"consentimiento tácito\".",
      dificultad: "media",
    },
    {
      enunciado: "Según el art. 7 LOPDGDD, ¿a partir de qué edad puede un menor consentir por sí mismo el tratamiento de sus datos personales?",
      explicacion: "A partir de los catorce años; por debajo de esa edad, el tratamiento fundado en el consentimiento solo es lícito si consta el del titular de la patria potestad o tutela.",
      dificultad: "facil",
    },
    {
      enunciado: "Un afectado solicita que se corrijan datos suyos inexactos. Según el art. 14 LOPDGDD, ¿qué debe indicar en su solicitud?",
      explicacion: "Debe indicar a qué datos se refiere y la corrección que haya de realizarse, acompañando documentación justificativa de la inexactitud cuando sea preciso — es el ejercicio del derecho de rectificación.",
      dificultad: "facil",
    },
    {
      enunciado: "Según el art. 31.2 LOPDGDD, ¿qué obligación de transparencia específica recae sobre los sujetos del art. 77.1 (entre ellos, la Administración de la Comunidad Autónoma de Aragón) respecto de sus tratamientos de datos?",
      explicacion: "Deben hacer público, por medios electrónicos, un inventario de sus actividades de tratamiento, con la información exigida por el art. 30 RGPD y su base legal — una obligación de publicidad activa propia del sector público.",
      dificultad: "dificil",
    },
    {
      enunciado: "¿Qué sanción impone la autoridad de protección de datos a una Administración Pública que comete una infracción de las tipificadas en los arts. 72 a 74 de la LOPDGDD?",
      explicacion: "Un apercibimiento (art. 77.2 LOPDGDD), junto con las medidas necesarias para que cese la conducta infractora — a diferencia del régimen sancionador económico previsto para responsables privados.",
      dificultad: "media",
    },
    {
      enunciado: "¿Qué instrumento recoge las medidas de seguridad que deben implantarse en el tratamiento de datos personales en el ámbito del sector público, según la disposición adicional primera de la LOPDGDD?",
      explicacion: "El Esquema Nacional de Seguridad (ENS), adaptando sus criterios de determinación del riesgo a lo establecido en el art. 32 RGPD.",
      dificultad: "media",
    },
  ].map((p) => ({ ...p, tema_slug: TEMA, seccion: SECCION })),
);

console.log("✅ Sección proteccion-datos-principios de tema-26 ampliada (12 flashcards + 10 preguntas nuevas).");
