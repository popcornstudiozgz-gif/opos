/**
 * Crea el tema canónico tema-54: "Impermeabilizaciones. Tratamientos y
 * protección frente a humedades (capilaridad, filtraciones, fugas)" y lo
 * asigna como Tema 16 (bloque-2) de la oposición Oficial Albañil (Ayto.
 * Zaragoza).
 *
 * Corresponde al TEMA 14 oficial del Anexo I (bases2110.pdf).
 *
 * Fuente primaria: CTE, Documento Básico HS 1 (Protección frente a la
 * humedad), apartados 2.1 "Muros" y 2.2 "Suelos" (texto descargado y
 * leído íntegro en este turno, scripts/tmp-fuentes/cte-dbhs-completo.pdf):
 * grado de impermeabilidad de muros y suelos en contacto con el terreno
 * según la presencia de agua y el coeficiente de permeabilidad (tablas
 * 2.1 y 2.3), soluciones constructivas (impermeabilización, drenaje,
 * ventilación de cámara), y puntos singulares (arranque de fachada desde
 * la cimentación, barrera impermeable contra el ascenso por capilaridad).
 * El apartado 2.4 "Cubiertas" ya fue tratado en el tema-53 (Tema 15); este
 * tema se centra en muros, suelos y sistemas generales de
 * impermeabilización, filtraciones y fugas, evitando la duplicidad.
 *
 * Tres secciones:
 * 1. humedad-capilaridad-muros — ascenso capilar y protección de muros en
 *    contacto con el terreno.
 * 2. impermeabilizacion-suelos-soleras — impermeabilización y drenaje de
 *    suelos en contacto con el terreno.
 * 3. sistemas-impermeabilizacion-filtraciones-fugas — tipos de
 *    impermeabilización, tratamiento de filtraciones y reparación de
 *    fugas.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-54-impermeabilizaciones-humedades.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!URL_BASE || !SERVICE_KEY) {
  console.error("❌ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-54";
const OPOSICION = "oficial-albanil-ayto-zaragoza";
const BLOQUE_2_ID = "11fb28dc-2b37-42bb-ae51-aeb7421e298c";
const CTE_HS1 = "https://www.codigotecnico.org/pdf/Documentos/HS/DBHS.pdf";

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
  return res.json();
}

async function upsert(tabla, filas, onConflict) {
  const res = await fetch(`${URL_BASE}/rest/v1/${tabla}?on_conflict=${onConflict}`, {
    method: "POST",
    headers: { ...HEADERS, Prefer: "resolution=merge-duplicates,return=representation" },
    body: JSON.stringify(filas),
  });
  if (!res.ok) {
    console.error(`❌ Error insertando en ${tabla}: ${res.status} ${await res.text()}`);
    process.exit(1);
  }
  return res.json();
}

async function insertarPreguntasConOpciones(seccion, preguntas) {
  const filas = preguntas.map(({ opciones, correcta, ...p }) => ({ ...p, tema_slug: TEMA, seccion }));
  const insertadas = await insertar("preguntas", filas);
  console.log(`   ✓ preguntas: ${insertadas.length} filas`);
  const filasOpciones = insertadas.flatMap((pregunta, i) =>
    preguntas[i].opciones.map((texto, orden) => ({
      pregunta_id: pregunta.id,
      texto,
      es_correcta: orden === preguntas[i].correcta,
      orden,
    })),
  );
  const opcionesInsertadas = await insertar("opciones", filasOpciones);
  console.log(`   ✓ opciones: ${opcionesInsertadas.length} filas`);
}

// ─────────────────────────────────────────────────────────────────────────
// Tema canónico
// ─────────────────────────────────────────────────────────────────────────
console.log(`📚 Creando ${TEMA}...`);
await insertar("temas", [
  {
    slug: TEMA,
    titulo: "Impermeabilizaciones. Tratamientos frente a humedades",
    descripcion: "Impermeabilizaciones. Tratamientos y protección frente a humedades (capilaridad, filtraciones, fugas).",
    contenido:
      "Desarrolla la protección de muros y suelos en contacto con el terreno frente a la humedad, según el CTE DB HS1: grado de impermeabilidad exigido según la presencia de agua y la permeabilidad del terreno, sistemas de impermeabilización y drenaje, la barrera impermeable contra el ascenso de agua por capilaridad en el arranque de muros y fachadas, y los tratamientos generales frente a filtraciones y fugas.",
    enlaces_boe: [
      { url: CTE_HS1, titulo: "CTE, Documento Básico HS Salubridad — HS 1: Protección frente a la humedad, apdos. 2.1 y 2.2" },
    ],
    indice_estudio: [
      { url: CTE_HS1, titulo: "Humedad por capilaridad en muros", seccion: "humedad-capilaridad-muros", articulos: "DB HS1, apdo. 2.1" },
      { url: CTE_HS1, titulo: "Impermeabilización y drenaje de suelos", seccion: "impermeabilizacion-suelos-soleras", articulos: "DB HS1, apdo. 2.2" },
      { url: "", titulo: "Sistemas de impermeabilización, filtraciones y fugas", seccion: "sistemas-impermeabilizacion-filtraciones-fugas", articulos: "Conceptos fundamentales" },
    ],
  },
]);

// ─────────────────────────────────────────────────────────────────────────
// Sección 1: humedad-capilaridad-muros
// ─────────────────────────────────────────────────────────────────────────
const S1 = "humedad-capilaridad-muros";
console.log(`📝 flashcards (${S1})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Qué es la capilaridad, según el CTE?", reverso: "El fenómeno según el cual la superficie de un líquido en contacto con un sólido se eleva o se deprime debido a la fuerza resultante de las atracciones entre las moléculas del líquido (cohesión) y las de éste con las del sólido (adhesión)" },
    { anverso: "¿De qué depende el grado de impermeabilidad mínimo exigido a los muros en contacto con el terreno, según el CTE DB HS1?", reverso: "De la presencia de agua (baja, media o alta, según la posición del nivel freático) y del coeficiente de permeabilidad del terreno (tabla 2.1)" },
    { anverso: "¿Cuándo se considera 'alta' la presencia de agua frente a un muro, según el CTE?", reverso: "Cuando la cara inferior del suelo en contacto con el terreno se encuentra a dos o más metros por debajo del nivel freático" },
    { anverso: "¿Qué altura mínima exige el CTE a la barrera impermeable en el arranque de una fachada desde la cimentación, para evitar el ascenso de agua por capilaridad?", reverso: "Debe cubrir todo el espesor de la fachada a más de 15 cm por encima del nivel del suelo exterior" },
    { anverso: "¿Cuándo exige el CTE disponer un zócalo en el arranque de una fachada de material poroso?", reverso: "Para protegerla de las salpicaduras; el zócalo debe ser de un material con coeficiente de succión menor que el 3 %, con más de 30 cm de altura sobre el nivel del suelo exterior" },
    { anverso: "¿Qué es un 'muro parcialmente estanco' según el CTE?", reverso: "Un muro compuesto por una hoja exterior resistente, una cámara de aire y una hoja interior, en el que no se impermeabiliza sino que se permite el paso del agua del terreno hasta la cámara, donde se recoge y se evacua" },
    { anverso: "¿Cada cuántos metros como máximo exige el CTE disponer un pozo drenante próximo a un muro?", reverso: "Cada 50 m como máximo" },
    { anverso: "¿Qué diámetro interior mínimo exige el CTE a un pozo drenante junto a un muro?", reverso: "0,7 m como mínimo, con una capa filtrante que impida el arrastre de finos" },
    { anverso: "¿Qué es una capa drenante, en el contexto de la protección de un muro frente a la humedad?", reverso: "Una capa (lámina drenante, grava, fábrica de bloques porosos u otro material similar) que se dispone entre el muro y el terreno para facilitar la evacuación del agua y aliviar la presión hidrostática sobre el muro" },
    { anverso: "¿Qué diferencia hay entre un muro de gravedad y un muro flexorresistente, según la terminología del CTE?", reverso: "El muro de gravedad no está armado y resiste esfuerzos principalmente de compresión; el muro flexorresistente está armado y resiste esfuerzos de compresión y de flexión" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })),
);

console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es la capilaridad según el CTE?", explicacion: "El fenómeno por el que la superficie de un líquido en contacto con un sólido se eleva o deprime por las fuerzas de cohesión y adhesión.", dificultad: "media", opciones: ["La elevación o depresión de un líquido en contacto con un sólido", "La evacuación forzada del agua mediante bombas", "El vertido de agua de lluvia sobre una cubierta", "La condensación de vapor de agua en una cámara"], correcta: 0 },
  { enunciado: "¿De qué depende el grado de impermeabilidad exigido a los muros en contacto con el terreno?", explicacion: "De la presencia de agua y del coeficiente de permeabilidad del terreno.", dificultad: "media", opciones: ["De la presencia de agua y la permeabilidad del terreno", "Únicamente de la altura del edificio", "Solo del material del muro", "Exclusivamente de la zona pluviométrica"], correcta: 0 },
  { enunciado: "¿Cuándo se considera 'alta' la presencia de agua frente a un muro según el CTE?", explicacion: "Cuando la cara inferior del suelo está dos o más metros por debajo del nivel freático.", dificultad: "dificil", opciones: ["Cuando el suelo está 2 m o más por debajo del nivel freático", "Cuando llueve más de 100 mm/h", "Cuando el muro supera los 3 m de altura", "Cuando el terreno es arcilloso"], correcta: 0 },
  { enunciado: "¿Cuánto debe cubrir la barrera impermeable en el arranque de una fachada para evitar el ascenso de agua por capilaridad?", explicacion: "Todo el espesor de la fachada, a más de 15 cm por encima del nivel del suelo exterior.", dificultad: "media", opciones: ["Todo el espesor, a más de 15 cm sobre el suelo exterior", "Solo la mitad del espesor de la fachada", "20 cm por debajo del nivel del suelo", "No se exige barrera impermeable en el arranque"], correcta: 0 },
  { enunciado: "¿Qué altura mínima exige el CTE a un zócalo protector en una fachada de material poroso?", explicacion: "Más de 30 cm de altura sobre el nivel del suelo exterior.", dificultad: "media", opciones: ["Más de 30 cm", "Más de 15 cm", "Más de 50 cm", "Más de 5 cm"], correcta: 0 },
  { enunciado: "¿Qué es un muro parcialmente estanco según el CTE?", explicacion: "Un muro con hoja exterior, cámara de aire y hoja interior, donde se permite el paso de agua a la cámara para recogerla y evacuarla.", dificultad: "dificil", opciones: ["Un muro con cámara que recoge y evacúa el agua filtrada", "Un muro completamente impermeabilizado por el exterior", "Un muro sin ningún tipo de protección frente al agua", "Un muro pantalla hormigonado in situ"], correcta: 0 },
  { enunciado: "¿Cada cuántos metros exige el CTE un pozo drenante próximo a un muro, como máximo?", explicacion: "Cada 50 m como máximo.", dificultad: "dificil", opciones: ["50 m", "25 m", "100 m", "15 m"], correcta: 0 },
  { enunciado: "¿Qué diámetro interior mínimo exige el CTE a un pozo drenante junto a un muro?", explicacion: "0,7 m como mínimo.", dificultad: "dificil", opciones: ["0,7 m", "0,3 m", "1,5 m", "0,2 m"], correcta: 0 },
]);

// ─────────────────────────────────────────────────────────────────────────
// Sección 2: impermeabilizacion-suelos-soleras
// ─────────────────────────────────────────────────────────────────────────
const S2 = "impermeabilizacion-suelos-soleras";
console.log(`📝 flashcards (${S2})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿De qué depende el grado de impermeabilidad mínimo exigido a los suelos en contacto con el terreno, según el CTE?", reverso: "De la presencia de agua y del coeficiente de permeabilidad del terreno (tabla 2.3 del DB HS1), de forma análoga a los muros" },
    { anverso: "¿Qué es una solera, según la terminología del CTE?", reverso: "Una capa gruesa de hormigón apoyada sobre el terreno, que se dispone como pavimento o como base para un solado" },
    { anverso: "¿Qué es una placa, según la terminología del CTE, frente a una solera?", reverso: "Una solera armada para resistir mayores esfuerzos de flexión, como consecuencia, entre otros, del empuje vertical del agua freática" },
    { anverso: "¿Qué es un encachado?", reverso: "Una capa de grava de diámetro grande que sirve de base a una solera apoyada en el terreno, con el fin de dificultar la ascensión del agua del terreno por capilaridad hacia ésta" },
    { anverso: "¿Qué función cumple la capa drenante y filtrante bajo un suelo en contacto con el terreno?", reverso: "Facilitar la evacuación del agua del terreno situado bajo el suelo, evitando su acumulación y la presión hidrostática sobre la solera o placa" },
    { anverso: "¿Qué es un 'suelo elevado', según la definición del CTE?", reverso: "Un suelo situado en la base del edificio en el que la relación entre la superficie de contacto con el terreno más la de apoyo, y la superficie del suelo, es inferior a 1/7; se considera suelo en contacto con el terreno a efectos de esta normativa" },
    { anverso: "¿Qué tratamiento perimétrico exige el CTE en ocasiones para limitar el aporte de agua superficial al terreno junto a un muro o suelo?", reverso: "Disponer una acera, una zanja drenante u otro elemento que produzca un efecto análogo alrededor del perímetro del edificio" },
    { anverso: "¿Con qué material deben sellarse habitualmente los encuentros del suelo con el muro y las juntas del suelo, según el CTE?", reverso: "Con banda de PVC o con perfiles de caucho expansivo o de bentonita de sodio" },
    { anverso: "¿Qué elemento debe disponerse cuando la conexión de un tubo drenante bajo suelo esté situada por encima de la red de drenaje general?", reverso: "Al menos una cámara de bombeo con dos bombas de achique, para poder evacuar el agua igualmente" },
    { anverso: "¿Qué diferencia hay entre el tratamiento de un encuentro suelo-muro cuando ambos se hormigonan in situ y cuando el muro es prefabricado?", reverso: "Si ambos se hormigonan in situ, se sella la junta con una banda elástica embebida en la masa del hormigón; si el muro es prefabricado, la junta se sella con un perfil expansivo situado en el interior de la misma" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })),
);

console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿De qué depende el grado de impermeabilidad exigido a los suelos en contacto con el terreno?", explicacion: "De la presencia de agua y del coeficiente de permeabilidad del terreno, igual que en los muros.", dificultad: "media", opciones: ["De la presencia de agua y la permeabilidad del terreno", "Únicamente del tipo de pavimento elegido", "Solo del número de plantas del edificio", "Exclusivamente de la orientación del edificio"], correcta: 0 },
  { enunciado: "¿Qué es una solera según el CTE?", explicacion: "Una capa gruesa de hormigón apoyada sobre el terreno, como pavimento o base de un solado.", dificultad: "facil", opciones: ["Una capa gruesa de hormigón apoyada sobre el terreno", "Una lámina impermeabilizante flexible", "Un muro de contención perimetral", "Una capa granular de zahorra"], correcta: 0 },
  { enunciado: "¿Qué distingue a una placa de una solera según el CTE?", explicacion: "La placa está armada para resistir mayores esfuerzos de flexión, como el empuje del agua freática.", dificultad: "dificil", opciones: ["La placa está armada para resistir mayor flexión", "La placa nunca lleva hormigón", "La solera siempre es más gruesa que la placa", "No hay ninguna diferencia entre ambas"], correcta: 0 },
  { enunciado: "¿Qué es un encachado?", explicacion: "Una capa de grava gruesa bajo una solera, para dificultar el ascenso capilar del agua del terreno.", dificultad: "media", opciones: ["Una capa de grava bajo la solera contra el ascenso capilar", "Un tipo de mortero impermeabilizante", "Una lámina de PVC bajo el pavimento", "Un sistema de bombeo de achique"], correcta: 0 },
  { enunciado: "¿Qué es un 'suelo elevado' según el CTE?", explicacion: "Un suelo en la base del edificio con una relación de superficie de apoyo/contacto inferior a 1/7, considerado en contacto con el terreno.", dificultad: "dificil", opciones: ["Un suelo con relación de apoyo/contacto inferior a 1/7", "Cualquier suelo situado en planta baja", "Un suelo que no requiere impermeabilización", "Un suelo exclusivo de cubiertas transitables"], correcta: 0 },
  { enunciado: "¿Qué tratamiento perimétrico puede exigir el CTE junto a un muro o suelo para limitar el aporte de agua superficial?", explicacion: "Una acera, zanja drenante u otro elemento de efecto análogo.", dificultad: "media", opciones: ["Una acera o zanja drenante perimetral", "Una capa de grava suelta exclusivamente", "Un enfoscado de mortero hidrófugo", "Una barrera de vapor bajo el aislante"], correcta: 0 },
  { enunciado: "¿Con qué materiales deben sellarse las juntas del suelo y su encuentro con el muro, según el CTE?", explicacion: "Con banda de PVC o perfiles de caucho expansivo o de bentonita de sodio.", dificultad: "media", opciones: ["Banda de PVC o perfiles de caucho expansivo o bentonita de sodio", "Únicamente con mortero de cemento", "Con pintura impermeabilizante exclusivamente", "Con lechada de cal apagada"], correcta: 0 },
  { enunciado: "¿Qué debe disponerse cuando la conexión de un tubo drenante esté por encima de la red de drenaje general?", explicacion: "Al menos una cámara de bombeo con dos bombas de achique.", dificultad: "dificil", opciones: ["Una cámara de bombeo con dos bombas de achique", "Un segundo tubo drenante paralelo obligatoriamente", "Una válvula de seguridad únicamente", "Un aislante térmico adicional"], correcta: 0 },
]);

// ─────────────────────────────────────────────────────────────────────────
// Sección 3: sistemas-impermeabilizacion-filtraciones-fugas
// ─────────────────────────────────────────────────────────────────────────
const S3 = "sistemas-impermeabilizacion-filtraciones-fugas";
console.log(`📝 flashcards (${S3})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Qué dos grandes familias de sistemas de impermeabilización recoge el CTE según su forma de aplicación?", reverso: "Impermeabilización mediante láminas (bituminosas, de PVC, de EPDM, de poliolefinas, etc.) e impermeabilización mediante aplicaciones líquidas (productos como polímeros acrílicos, caucho acrílico o resinas sintéticas)" },
    { anverso: "¿Qué es un 'sistema adherido' de impermeabilización, según el CTE?", reverso: "Aquel en el que la impermeabilización se adhiere al elemento que sirve de soporte en toda su superficie" },
    { anverso: "¿Qué es un 'sistema no adherido' de impermeabilización?", reverso: "Aquel en el que la impermeabilización se coloca sobre el soporte sin adherirse a él, salvo en elementos singulares (juntas, desagües, petos, bordes) y en el perímetro de elementos sobresalientes" },
    { anverso: "¿Qué es una filtración, en el sentido constructivo del término?", reverso: "El paso o penetración no deseada de agua a través de un elemento constructivo (muro, cubierta, junta) que debería ser estanco, generalmente por un fallo o defecto de la impermeabilización o de sus puntos singulares" },
    { anverso: "¿Cuál es la causa más habitual de filtraciones en los puntos singulares de una impermeabilización (encuentros, juntas, remates)?", reverso: "Un tratamiento insuficiente de bandas de refuerzo, terminación o sellado en esos puntos, que son los más expuestos a movimientos diferenciales y concentración de tensiones" },
    { anverso: "¿Qué debe comprobarse ante una fuga localizada en una instalación de fontanería o saneamiento antes de reparar el revestimiento?", reverso: "Localizar y reparar primero el origen exacto de la fuga (tubería, junta, accesorio), ya que reparar solo el revestimiento sin atajar la causa no resuelve el problema y puede ocultarlo temporalmente" },
    { anverso: "¿Qué es una eflorescencia, como patología asociada a la humedad?", reverso: "Un depósito o mancha blanquecina de sales solubles (generalmente carbonatos o sulfatos) que aflora en la superficie de un material poroso al evaporarse el agua que las transportaba desde el interior" },
    { anverso: "¿Qué es un producto colmatador de poros, en la hidrofugación complementaria de un suelo según el CTE?", reverso: "Un producto líquido que se aplica sobre la superficie terminada del suelo para reducir su porosidad superficial y disminuir la entrada de agua, complementando la impermeabilización principal" },
    { anverso: "¿Qué relación hay entre un correcto sistema de evacuación de aguas y la prevención de filtraciones?", reverso: "Un sistema de evacuación (canalones, sumideros, pendientes adecuadas) bien dimensionado evita la acumulación de agua estancada sobre los elementos constructivos, reduciendo el tiempo de exposición y el riesgo de filtración" },
    { anverso: "¿Qué debe hacerse cuando se detecta una fuga en una tubería empotrada antes de proceder a su reparación definitiva?", reverso: "Cortar el suministro de la instalación afectada, localizar con precisión el punto de la fuga (por ejemplo mediante inspección o detectores) y picar el paramento solo en la zona estrictamente necesaria para acceder a ella" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })),
);

console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué dos grandes familias de impermeabilización recoge el CTE según su forma de aplicación?", explicacion: "Impermeabilización con láminas e impermeabilización con aplicaciones líquidas.", dificultad: "media", opciones: ["Con láminas y con aplicaciones líquidas", "Con grava y con mortero exclusivamente", "Con hormigón armado y con acero", "Con placas de yeso laminado y aislante"], correcta: 0 },
  { enunciado: "¿Qué es un sistema adherido de impermeabilización?", explicacion: "Aquel en que la impermeabilización se adhiere al soporte en toda su superficie.", dificultad: "media", opciones: ["El que se adhiere al soporte en toda su superficie", "El que nunca entra en contacto con el soporte", "El que se fija solo mediante fijaciones mecánicas", "El que se aplica exclusivamente en frío"], correcta: 0 },
  { enunciado: "¿Qué caracteriza a un sistema no adherido de impermeabilización?", explicacion: "Se coloca sobre el soporte sin adherirse, salvo en elementos singulares y perímetros.", dificultad: "media", opciones: ["Se coloca sin adherirse salvo en puntos singulares", "Se adhiere siempre en toda su superficie", "No requiere capa de protección nunca", "Solo se usa en impermeabilizaciones líquidas"], correcta: 0 },
  { enunciado: "¿Qué es una filtración en el sentido constructivo?", explicacion: "El paso no deseado de agua a través de un elemento que debería ser estanco.", dificultad: "facil", opciones: ["El paso no deseado de agua a través de un elemento estanco", "La evacuación programada de aguas pluviales", "El ascenso capilar controlado en un muro", "Un tipo de mortero hidrófugo"], correcta: 0 },
  { enunciado: "¿Cuál es la causa más habitual de filtraciones en los puntos singulares de una impermeabilización?", explicacion: "Un tratamiento insuficiente de bandas de refuerzo, terminación o sellado.", dificultad: "media", opciones: ["Tratamiento insuficiente de bandas de refuerzo y sellado", "El uso de grava como capa de protección", "La ventilación excesiva de la cámara de aire", "El uso de hormigón hidrófugo"], correcta: 0 },
  { enunciado: "¿Qué debe hacerse antes de reparar el revestimiento ante una fuga de una instalación?", explicacion: "Localizar y reparar primero el origen exacto de la fuga.", dificultad: "media", opciones: ["Localizar y reparar primero el origen de la fuga", "Reponer directamente el revestimiento sin más comprobación", "Aplicar únicamente pintura impermeabilizante", "Esperar a que la fuga se seque por sí sola"], correcta: 0 },
  { enunciado: "¿Qué es una eflorescencia?", explicacion: "Un depósito blanquecino de sales solubles que aflora en la superficie de un material poroso.", dificultad: "media", opciones: ["Un depósito blanquecino de sales solubles en superficie", "Una grieta estructural en un muro de carga", "Un tipo de aislante térmico reflectante", "Un sistema de drenaje perimetral"], correcta: 0 },
  { enunciado: "¿Para qué sirve un producto colmatador de poros en la hidrofugación complementaria de un suelo?", explicacion: "Para reducir la porosidad superficial y disminuir la entrada de agua.", dificultad: "dificil", opciones: ["Para reducir la porosidad superficial y la entrada de agua", "Para aumentar la resistencia mecánica del hormigón", "Para acelerar el fraguado de la solera", "Para sustituir la necesidad de junta de dilatación"], correcta: 0 },
]);

// ─────────────────────────────────────────────────────────────────────────
// Vincular a la oposición (Tema 16)
// ─────────────────────────────────────────────────────────────────────────
console.log(`\n🔗 Vinculando ${TEMA} como Tema 16 de ${OPOSICION}...`);
await upsert(
  "tema_oposicion",
  [
    {
      tema_slug: TEMA,
      oposicion_slug: OPOSICION,
      bloque_id: BLOQUE_2_ID,
      numero: 16,
      orden: 16,
      es_premium: false,
      publicado: true,
      secciones_incluidas: null,
    },
  ],
  "tema_slug,oposicion_slug"
);

console.log("\n✅ tema-54 creado y vinculado como Tema 16 de Oficial Albañil.");
