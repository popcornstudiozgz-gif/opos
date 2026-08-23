/**
 * Alta del tema canónico nuevo: "La Administración electrónica" — para el
 * Tema 19 de la oposición de la DPZ ("La Administración electrónica.
 * Documentos y expedientes electrónicos. Conceptos básicos sobre
 * LibreOffice, Procesadores de textos, Hojas de cálculo y Bases de
 * Datos.").
 *
 * Solo la parte legal por ahora (documentos y expedientes electrónicos:
 * Ley 39/2015, arts. 26-28 y 70, verificados contra el consolidado del
 * BOE). La parte de LibreOffice/ofimática no es contenido legal — no hay
 * preguntas ni flashcards todavía, a la espera de decidir cómo tratar
 * ese tipo de contenido (ver comentario del usuario) — pero SÍ se añade
 * ya como punto del índice de estudio, enlazando a la web oficial de
 * LibreOffice (https://es.libreoffice.org/), tal como se pidió.
 *
 * Fiel a content-raw/ley-39-2015-procedimiento-administrativo/
 * titulo-2-cap-1-normas-generales-de-actuacion.md (arts. 26-28) y
 * titulo-4-cap-3-ordenacion-del-procedimiento.md (art. 70).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-27-administracion-electronica.mjs
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

const TEMA = "tema-27";
const SECCION = "administracion-electronica";
const p = (dificultad, pregunta, opciones, explicacion) => ({ dificultad, pregunta, opciones, explicacion });

const ITEMS = [
  p("facil",
    "¿Cómo deben emitir las Administraciones Públicas sus documentos administrativos según el art. 26.1 de la Ley 39/2015?",
    ["Por escrito, a través de medios electrónicos, a menos que su naturaleza exija otra forma más adecuada de expresión y constancia",
     "Siempre en soporte papel, quedando el formato electrónico como excepción residual",
     "Verbalmente, formalizándose por escrito solo a petición del interesado",
     "En el formato que decida cada funcionario, sin criterio general alguno"],
    "El art. 26.1 invierte la regla clásica: el medio electrónico es ahora el ordinario, y el papel (u otra forma) la excepción justificada por la naturaleza del documento."),
  p("media",
    "¿Cuál de estos es un requisito para que un documento electrónico administrativo sea válido según el art. 26.2 de la Ley 39/2015?",
    ["Incorporar una referencia temporal del momento en que ha sido emitido",
     "Estar firmado siempre por el titular del órgano de mayor rango de la Administración",
     "Constar necesariamente en un único fichero, sin posibilidad de metadatos asociados",
     "Haber sido notificado ya al interesado antes de considerarse válido"],
    "El art. 26.2 exige varios requisitos acumulativos (información identificable, datos de individualización, referencia temporal, metadatos mínimos, firma electrónica correspondiente), no la notificación previa ni la firma de la máxima autoridad."),
  p("media",
    "¿Qué documentos electrónicos de las Administraciones Públicas no requieren firma electrónica según el art. 26.3 de la Ley 39/2015?",
    ["Los que se publiquen con carácter meramente informativo y los que no formen parte de un expediente administrativo, debiendo en todo caso identificarse su origen",
     "Ningún documento electrónico puede prescindir de la firma electrónica, sin excepción alguna",
     "Únicamente los documentos internos entre distintos departamentos de la misma Administración",
     "Los documentos que se envíen a otra Administración Pública, pero no los dirigidos a un ciudadano"],
    "El art. 26.3 exime de firma a los documentos meramente informativos o ajenos a un expediente, pero exige siempre poder identificar su origen, aunque carezcan de firma."),
  p("facil",
    "¿A qué Administraciones se extiende la validez de las copias auténticas realizadas por una de ellas, según el art. 27.1 de la Ley 39/2015?",
    ["A las restantes Administraciones Públicas, sin necesidad de que cada una expida su propia copia",
     "Únicamente a la Administración que expidió la copia, sin efectos frente a otras",
     "Solo a la Administración General del Estado, con independencia de quién expidiera la copia",
     "A ninguna otra Administración: cada una debe expedir sus propias copias auténticas"],
    "El art. 27.1 reconoce eficacia general a las copias auténticas: una vez expedidas válidamente por cualquier Administración, valen frente a todas las demás, sin duplicar trámites."),
  p("media",
    "¿Qué se entiende por «digitalización» según el art. 27.3.b de la Ley 39/2015?",
    ["El proceso tecnológico que permite convertir un documento en soporte papel u otro soporte no electrónico en un fichero electrónico que contiene la imagen codificada, fiel e íntegra del documento",
     "La destrucción del documento original en soporte papel tras su escaneo",
     "La firma electrónica de un documento ya existente en formato PDF",
     "La creación de un documento nuevo directamente en formato electrónico, sin origen en papel"],
    "El art. 27.3.b define la digitalización con precisión técnica: conversión fiel e íntegra a fichero electrónico, sin implicar en sí misma la destrucción del original en papel."),
  p("media",
    "¿En qué plazo debe expedirse una copia auténtica solicitada por un interesado, según el art. 27.4 de la Ley 39/2015?",
    ["Quince días desde la recepción de la solicitud en el registro electrónico de la Administración competente, salvo excepciones de la Ley 19/2013",
     "Un mes, en todo caso, sin excepciones posibles",
     "No existe plazo legal, se expide según la disponibilidad del órgano",
     "Tres días hábiles, con carácter improrrogable"],
    "El art. 27.4 fija un plazo de 15 días para la expedición de copias auténticas, remitiéndose a las excepciones que pueda establecer la Ley de Transparencia (Ley 19/2013) para determinados supuestos."),
  p("media",
    "¿Tienen los interesados derecho a no aportar documentos que ya obren en poder de la Administración actuante o hayan sido elaborados por otra Administración, según el art. 28.2 de la Ley 39/2015?",
    ["Sí, y la Administración actuante podrá consultarlos o recabarlos, salvo que el interesado se oponga (oposición que no cabe en potestades sancionadoras o de inspección)",
     "No: el interesado debe aportar siempre todos los documentos exigidos, sin excepción",
     "Solo si el documento fue elaborado por la misma Administración, nunca si lo fue por otra distinta",
     "Solo si han transcurrido menos de treinta días desde que se elaboró el documento"],
    "El art. 28.2 es una manifestación del principio de no duplicidad administrativa: el interesado no tiene que volver a aportar lo que la Administración ya tiene o puede obtener, con la única excepción relevante de los procedimientos sancionadores o de inspección."),
  p("facil",
    "¿Pueden las Administraciones exigir a los interesados la presentación de documentos originales según el art. 28.3 de la Ley 39/2015?",
    ["No, salvo que, con carácter excepcional, la normativa reguladora aplicable establezca lo contrario",
     "Sí, siempre y en todo caso, como regla general del procedimiento",
     "Solo si el interesado es una persona jurídica, nunca si es una persona física",
     "Solo en los procedimientos de responsabilidad patrimonial"],
    "El art. 28.3 invierte la carga: la regla general es no exigir originales, y solo excepcionalmente, si una norma reguladora específica lo prevé, cabe exigirlos."),
  p("media",
    "¿Qué es el expediente administrativo según el art. 70.1 de la Ley 39/2015?",
    ["El conjunto ordenado de documentos y actuaciones que sirven de antecedente y fundamento a la resolución administrativa, así como las diligencias encaminadas a ejecutarla",
     "Únicamente la resolución final del procedimiento, sin los documentos previos",
     "El escrito de solicitud inicial presentado por el interesado, exclusivamente",
     "El conjunto de normas jurídicas aplicables a un procedimiento concreto"],
    "El art. 70.1 define el expediente en sentido amplio: no es solo la resolución final, sino todo el conjunto ordenado de documentos y actuaciones, incluidas las diligencias de ejecución."),
  p("media",
    "¿En qué formato deben tener los expedientes administrativos según el art. 70.2 de la Ley 39/2015?",
    ["Formato electrónico, formándose mediante la agregación ordenada de todos los documentos que deban integrarlos, con un índice numerado",
     "Formato papel como regla general, admitiéndose el electrónico solo excepcionalmente",
     "El formato queda a elección discrecional de cada funcionario instructor",
     "Formato mixto obligatorio: la mitad de los documentos en papel y la mitad en electrónico"],
    "El art. 70.2 generaliza el formato electrónico para todos los expedientes, exigiendo además un índice numerado de los documentos que lo integran."),
  p("dificil",
    "Cuando deba remitirse un expediente electrónico en virtud de una norma, ¿cómo debe enviarse según el art. 70.3 de la Ley 39/2015?",
    ["Completo, foliado, autentificado y acompañado de un índice también autentificado, de acuerdo con el Esquema Nacional de Interoperabilidad",
     "Basta con remitir un resumen de su contenido, sin necesidad de foliarlo ni autentificarlo",
     "Únicamente la resolución final, sin el resto de documentos del expediente",
     "Sin ningún requisito formal específico, bastando el correo electrónico ordinario"],
    "El art. 70.3 exige garantías reforzadas de integridad (foliado, autenticación del expediente y de su índice) conforme al Esquema Nacional de Interoperabilidad, no una remisión informal o parcial."),
  p("dificil",
    "¿Cuál de estos elementos NO forma parte del expediente administrativo según el art. 70.4 de la Ley 39/2015?",
    ["La información de carácter auxiliar o de apoyo, como notas, borradores, opiniones o comunicaciones internas entre órganos administrativos",
     "Los informes preceptivos emitidos en el procedimiento",
     "La resolución administrativa que pone fin al procedimiento",
     "Las notificaciones practicadas a los interesados durante la tramitación"],
    "El art. 70.4 excluye expresamente del expediente la documentación meramente auxiliar o de apoyo interno (borradores, notas, opiniones...), salvo que se trate de informes preceptivos o facultativos, que sí forman parte de él."),
];

async function main() {
  console.log("📝 temas (alta del tema canónico)...");
  await upsert(
    "temas",
    [
      {
        slug: TEMA,
        titulo: "La Administración electrónica",
        descripcion: "Documentos administrativos electrónicos: requisitos de validez, copias auténticas y digitalización. El expediente administrativo electrónico. (Pendiente: conceptos básicos de ofimática — LibreOffice Writer, Calc y bases de datos.)",
        contenido: "Desarrolla las disposiciones de la Ley 39/2015 sobre el documento administrativo electrónico como forma ordinaria de actuación de las Administraciones Públicas: sus requisitos de validez, el régimen de copias auténticas y digitalización, y la conformación del expediente administrativo en formato electrónico.",
        enlaces_boe: [{ titulo: "Ley 39/2015, del Procedimiento Administrativo Común", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565" }],
        indice_estudio: [
          { seccion: SECCION, titulo: "Ley 39/2015: documentos y expedientes electrónicos", articulos: "arts. 26-28, 70", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565#a26" },
          { seccion: "ofimatica-libreoffice", titulo: "Conceptos básicos de LibreOffice (Writer, Calc, Bases de Datos) — sin test todavía", url: "https://es.libreoffice.org/" },
        ],
      },
    ],
    "slug"
  );

  console.log("📇 flashcards + 📝 preguntas...");
  const flashcards = ITEMS.map((it) => ({ tema_slug: TEMA, seccion: SECCION, anverso: it.pregunta, reverso: it.opciones[0] }));
  const resF = await fetch(`${URL_BASE}/rest/v1/flashcards`, { method: "POST", headers: { ...HEADERS, Prefer: "return=minimal" }, body: JSON.stringify(flashcards) });
  if (!resF.ok) { console.error(`❌ flashcards ${resF.status} ${await resF.text()}`); process.exit(1); }
  console.log(`   ✓ flashcards: ${flashcards.length}`);

  for (const it of ITEMS) {
    const resP = await fetch(`${URL_BASE}/rest/v1/preguntas`, {
      method: "POST", headers: { ...HEADERS, Prefer: "return=representation" },
      body: JSON.stringify({ tema_slug: TEMA, seccion: SECCION, enunciado: it.pregunta, explicacion: it.explicacion, dificultad: it.dificultad }),
    });
    if (!resP.ok) { console.error(`❌ pregunta ${resP.status} ${await resP.text()}`); process.exit(1); }
    const [row] = await resP.json();
    const opciones = it.opciones.map((texto, i) => ({ pregunta_id: row.id, texto, es_correcta: i === 0, orden: i }));
    const resO = await fetch(`${URL_BASE}/rest/v1/opciones`, { method: "POST", headers: { ...HEADERS, Prefer: "return=minimal" }, body: JSON.stringify(opciones) });
    if (!resO.ok) { console.error(`❌ opciones ${resO.status} ${await resO.text()}`); process.exit(1); }
  }
  console.log(`   ✓ preguntas: ${ITEMS.length}`);
  console.log(`✅ ${TEMA} completado.`);
}

await main();
