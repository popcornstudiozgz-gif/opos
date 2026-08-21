/**
 * Preguntas de test — Tema 4 (Ley 39/2015, Título Preliminar + Título I
 * Cap. I y II), derivadas 1:1 de las flashcards del mismo tema/seccion.
 *
 * Uso: node --env-file=.env.local scripts/seed-preguntas-tema-4.mjs
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

const TEMA = "tema-4";
// opciones[0] es SIEMPRE la correcta en este array de origen; el cliente
// baraja el orden de visualización, así que aquí no importa el orden.
const q = (seccion, dificultad, enunciado, opciones, explicacion) => ({ seccion, dificultad, enunciado, opciones, explicacion });

const PREGUNTAS = [
  q("titulo-preliminar", "facil",
    "¿Cuál es el objeto de la Ley 39/2015, del Procedimiento Administrativo Común (art. 1.1)?",
    ["Regular los requisitos de validez y eficacia de los actos administrativos, el procedimiento administrativo común y los principios de la potestad reglamentaria",
     "Regular exclusivamente el régimen jurídico del sector público institucional",
     "Regular el régimen de contratación de las Administraciones Públicas",
     "Regular la organización y funcionamiento del Gobierno y de la Administración General del Estado"],
    "El art. 1.1 define el objeto de la Ley: validez y eficacia de los actos, procedimiento administrativo común (incluidos sancionador y responsabilidad patrimonial) y principios de la potestad reglamentaria."),
  q("titulo-preliminar", "media",
    "¿Cuándo pueden incluirse trámites adicionales o distintos a los previstos en el procedimiento (art. 1.2)?",
    ["Solo mediante ley, cuando resulte eficaz, proporcionado y necesario para los fines del procedimiento, de forma motivada",
     "Mediante reglamento, siempre que lo apruebe el órgano competente",
     "Mediante ordenanza municipal, sin necesidad de motivación",
     "Nunca pueden incluirse trámites adicionales a los previstos en la Ley 39/2015"]),
  q("titulo-preliminar", "facil",
    "¿Qué comprende el sector público a efectos de la Ley 39/2015 (art. 2.1)?",
    ["La AGE, las Administraciones de las CCAA, las Entidades de la Administración Local y el sector público institucional",
     "Únicamente la Administración General del Estado y sus organismos autónomos",
     "La AGE, las Administraciones de las CCAA y los partidos políticos",
     "Solo las entidades de derecho privado vinculadas a una Administración Pública"]),
  q("titulo-preliminar", "media",
    "¿Qué integra el sector público institucional según el art. 2.2?",
    ["Organismos públicos y entidades de derecho público vinculados, entidades de derecho privado vinculadas, y las Universidades públicas",
     "Únicamente los organismos autónomos y las entidades públicas empresariales",
     "Las Universidades públicas y privadas indistintamente",
     "Solo las sociedades mercantiles de capital íntegramente público"]),
  q("titulo-preliminar", "media",
    "¿Qué entidades tienen la consideración de Administraciones Públicas a efectos de la Ley (art. 2.3)?",
    ["La AGE, las Administraciones de las CCAA, las Entidades de la Administración Local, y los organismos públicos y entidades de derecho público vinculados a ellas",
     "Todas las entidades del sector público institucional, incluidas las de derecho privado",
     "Solo la Administración General del Estado y las Comunidades Autónomas",
     "Las Universidades públicas y las entidades de derecho privado vinculadas"]),
  q("titulo-1-cap-1", "media",
    "¿Quién tiene capacidad de obrar ante las Administraciones Públicas según el art. 3?",
    ["Las personas físicas y jurídicas con capacidad de obrar civil; los menores para derechos que puedan ejercer sin asistencia; y, si la ley lo declara, grupos de afectados y entidades sin personalidad jurídica",
     "Únicamente las personas mayores de edad con capacidad de obrar civil plena",
     "Cualquier persona física, sin excepción, con independencia de su edad",
     "Solo las personas jurídicas debidamente inscritas en el registro correspondiente"]),
  q("titulo-1-cap-1", "dificil",
    "Según el art. 4.1 de la Ley 39/2015, ¿quién tiene la condición de interesado en un procedimiento administrativo?",
    ["Quienes lo promuevan como titulares de derechos o intereses legítimos, quienes tengan derechos que puedan resultar afectados sin haberlo iniciado, y quienes se personen antes de la resolución definitiva por intereses legítimos afectados",
     "Únicamente quienes hayan promovido el procedimiento como titulares de derechos",
     "Cualquier ciudadano, tenga o no un interés legítimo en el asunto",
     "Solo quienes se personen en el procedimiento antes de su inicio formal"]),
  q("titulo-1-cap-1", "media",
    "¿Qué ocurre si la condición de interesado deriva de una relación jurídica transmisible (art. 4.3)?",
    ["El derecho-habiente sucede en tal condición cualquiera que sea el estado del procedimiento",
     "El procedimiento se archiva automáticamente al no poder transmitirse esa condición",
     "El derecho-habiente solo puede sucedan en esa condición si el procedimiento aún no se ha iniciado",
     "Es necesario iniciar un nuevo procedimiento con el derecho-habiente como promotor"]),
  q("titulo-1-cap-1", "facil",
    "¿Puede actuarse ante la Administración por medio de representante (art. 5.1)?",
    ["Sí; se entenderán con el representante las actuaciones administrativas, salvo manifestación expresa en contra del interesado",
     "No, la actuación ante la Administración es siempre personalísima",
     "Sí, pero solo en los procedimientos sancionadores",
     "Sí, pero las actuaciones se entienden siempre con el interesado y no con el representante"]),
  q("titulo-1-cap-1", "media",
    "¿Para qué actuaciones debe acreditarse la representación según el art. 5.3?",
    ["Formular solicitudes, presentar declaraciones responsables o comunicaciones, interponer recursos, desistir de acciones y renunciar a derechos",
     "Para cualquier actuación ante la Administración, sin excepción",
     "Únicamente para interponer recursos administrativos",
     "Solo para actos de mero trámite como aportar documentos"]),
  q("titulo-1-cap-1", "media",
    "¿Qué ocurre si falta o es insuficiente la acreditación de la representación (art. 5.6)?",
    ["No impide que se tenga por realizado el acto, siempre que se aporte o subsane en el plazo de 10 días que debe concederse al efecto",
     "El acto se considera nulo de pleno derecho de forma automática",
     "El interesado pierde la condición de parte en el procedimiento",
     "Se concede un plazo de un mes para subsanar la falta de representación"]),
  q("titulo-1-cap-1", "media",
    "¿Qué es el registro electrónico de apoderamientos (art. 6.1)?",
    ["El registro donde se inscriben, al menos, los poderes generales otorgados apud acta para actuar en nombre de un interesado ante las AAPP",
     "El registro donde constan todos los funcionarios habilitados de una Administración",
     "El censo de personas obligadas a relacionarse electrónicamente con la Administración",
     "El registro donde se inscriben las sedes electrónicas de cada Administración Pública"]),
  q("titulo-1-cap-1", "media",
    "¿Cuál es la validez máxima de los poderes inscritos en el registro electrónico de apoderamientos (art. 6.6)?",
    ["5 años desde la fecha de inscripción, prorrogables antes de su finalización",
     "2 años desde la fecha de inscripción, no prorrogables",
     "10 años desde la fecha de inscripción",
     "Indefinida, mientras no se revoquen expresamente"]),
  q("titulo-1-cap-1", "media",
    "Si en un procedimiento hay varios interesados, ¿con quién se entienden las actuaciones (art. 7)?",
    ["Con el representante o interesado que expresamente hayan señalado y, en su defecto, con el que figure en primer término",
     "Con todos los interesados simultáneamente, mediante notificación conjunta",
     "Con el interesado de mayor edad entre los que figuren en la solicitud",
     "La Administración elige libremente con cuál de los interesados se entiende"]),
  q("titulo-1-cap-1", "media",
    "¿Qué ocurre si aparecen nuevos interesados durante la instrucción de un procedimiento (art. 8)?",
    ["Si el procedimiento no tuvo publicidad, se les comunicará su tramitación para que puedan personarse",
     "El procedimiento debe iniciarse de nuevo desde el principio",
     "No se les comunica nada, salvo que lo soliciten expresamente",
     "Se les excluye del procedimiento por no haber comparecido desde el inicio"]),
  q("titulo-1-cap-2", "facil",
    "¿Cómo verifican las Administraciones Públicas la identidad de los interesados según el art. 9.1?",
    ["Comprobando el nombre y apellidos o la denominación o razón social que consten en el DNI o documento equivalente",
     "Exigiendo siempre la comparecencia personal del interesado ante el funcionario",
     "Mediante huella dactilar en todos los procedimientos",
     "Únicamente a través de certificado electrónico cualificado, sin otra alternativa"]),
  q("titulo-1-cap-2", "dificil",
    "¿Qué sistemas de identificación electrónica pueden utilizar los interesados según el art. 9.2 de la Ley 39/2015?",
    ["Certificados cualificados de firma electrónica, certificados cualificados de sello electrónico, y cualquier otro sistema que la Administración considere válido con registro previo de usuario",
     "Únicamente el DNI electrónico, sin otras alternativas posibles",
     "Solo los sistemas de firma manuscrita digitalizada",
     "Cualquier contraseña personal, sin necesidad de registro previo"]),
  q("titulo-1-cap-2", "media",
    "¿Con qué medios pueden firmar los interesados según el art. 10.1?",
    ["Con cualquier medio que permita acreditar la autenticidad de la voluntad y consentimiento, así como la integridad e inalterabilidad del documento",
     "Únicamente con firma electrónica cualificada",
     "Solo con firma manuscrita sobre soporte papel",
     "Exclusivamente mediante clave concertada previamente con la Administración"]),
  q("titulo-1-cap-2", "media",
    "¿Para qué actuaciones es obligatorio el uso de firma según el art. 11.2?",
    ["Formular solicitudes, presentar declaraciones responsables o comunicaciones, interponer recursos, desistir de acciones y renunciar a derechos",
     "Para cualquier actuación ante la Administración, sin excepción alguna",
     "Únicamente para presentar recursos de alzada",
     "Solo cuando el importe económico del expediente supere una determinada cuantía"]),
  q("titulo-1-cap-2", "media",
    "¿Qué deben garantizar las Administraciones Públicas según el art. 12 (asistencia en el uso de medios electrónicos)?",
    ["Asistencia a los interesados no obligados a relacionarse electrónicamente, incluso mediante identificación o firma por un funcionario habilitado, con consentimiento del interesado",
     "El acceso gratuito a un ordenador en cualquier oficina pública, sin más obligaciones",
     "La obligación de que todos los interesados se relacionen electrónicamente",
     "La formación obligatoria en medios electrónicos para todos los ciudadanos"]),
];

console.log(`📝 Insertando ${PREGUNTAS.length} preguntas de ${TEMA}...`);
await insertPreguntas(PREGUNTAS);
console.log(`✅ ${TEMA} completado.`);
