/**
 * Crea el tema canónico tema-55: "Obras de pavimentación de vías urbanas.
 * Aceras, bordillos, sumideros, alcorques" y lo asigna como Tema 17
 * (bloque-2) de la oposición Oficial Albañil (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 15 oficial del Anexo I (bases2110.pdf).
 *
 * Contenido técnico consolidado de urbanización y pavimentación de vías
 * públicas (aceras, bordillos, sumideros, alcorques), sin una norma única
 * citada en las bases para este tema; tratado como conocimiento técnico
 * del oficio, igual que el tema-49 (rellenos y terraplenes).
 *
 * Tres secciones:
 * 1. pavimentos-acerado-materiales — tipos de pavimento de acera y sus
 *    capas.
 * 2. bordillos-encintados — bordillos, encintados y rigolas.
 * 3. sumideros-alcorques-mobiliario — sumideros, alcorques y elementos
 *    singulares de la vía pública.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-55-pavimentacion-vias-urbanas.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!URL_BASE || !SERVICE_KEY) {
  console.error("❌ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-55";
const OPOSICION = "oficial-albanil-ayto-zaragoza";
const BLOQUE_2_ID = "11fb28dc-2b37-42bb-ae51-aeb7421e298c";

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

console.log(`📚 Creando ${TEMA}...`);
await insertar("temas", [
  {
    slug: TEMA,
    titulo: "Pavimentación de vías urbanas: aceras, bordillos, sumideros y alcorques",
    descripcion: "Obras de pavimentación de vías urbanas. Aceras, bordillos, sumideros, alcorques.",
    contenido:
      "Desarrolla los pavimentos de acerado y sus capas, los bordillos y encintados que delimitan calzada y acera, los sumideros de recogida de pluviales en vía pública y los alcorques para el arbolado urbano.",
    enlaces_boe: [],
    indice_estudio: [
      { url: "", titulo: "Pavimentos de acera y sus capas", seccion: "pavimentos-acerado-materiales", articulos: "Conceptos fundamentales" },
      { url: "", titulo: "Bordillos y encintados", seccion: "bordillos-encintados", articulos: "Conceptos fundamentales" },
      { url: "", titulo: "Sumideros, alcorques y mobiliario urbano", seccion: "sumideros-alcorques-mobiliario", articulos: "Conceptos fundamentales" },
    ],
  },
]);

const S1 = "pavimentos-acerado-materiales";
console.log(`📝 flashcards (${S1})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Qué capas suele tener un pavimento de acera convencional, de abajo a arriba?", reverso: "Explanada compactada, capa granular de base (zahorra), capa de asiento (mortero o arena) y capa de acabado (baldosa, loseta hidráulica, adoquín u otro material)" },
    { anverso: "¿Qué es una loseta hidráulica?", reverso: "Una pieza de pavimento prefabricada de mortero de cemento, de cara vista con acabado (botón, terrazo, etc.) y trasdós más basto, muy habitual en aceras urbanas por su resistencia y coste" },
    { anverso: "¿Qué pendiente transversal suele darse a una acera hacia la calzada?", reverso: "Una pendiente suave (en torno al 1-2 %) hacia la calzada, para facilitar la evacuación del agua de lluvia sin generar encharcamientos ni incomodidad al peatón" },
    { anverso: "¿Qué es el adoquinado?", reverso: "Un pavimento formado por piezas (adoquines) de piedra natural o de hormigón prefabricado, de tamaño relativamente pequeño, colocadas sobre una cama de arena y rejuntadas, habitual en calzadas y aceras de carácter histórico o de bajo tráfico" },
    { anverso: "¿Qué es un vado peatonal (rebaje de acera)?", reverso: "Una rampa que salva el desnivel entre la acera y la calzada en los pasos de peatones, para garantizar la accesibilidad de personas con movilidad reducida" },
    { anverso: "¿Qué es un pavimento continuo de hormigón impreso?", reverso: "Un pavimento de hormigón vertido in situ, sobre el que se estampa una textura y se aplican pigmentos antes del fraguado, imitando el aspecto de otros materiales (adoquín, piedra) con la resistencia del hormigón" },
    { anverso: "¿Qué precaución debe tenerse en la ejecución de un pavimento de acera junto a fachadas o mobiliario urbano?", reverso: "Respetar las juntas de dilatación y los encuentros singulares, evitando que el pavimento quede en contacto rígido con elementos que puedan sufrir movimientos diferenciales" },
    { anverso: "¿Qué es la base granular de un pavimento de acera?", reverso: "Una capa de material granular (zahorra natural o artificial) compactada sobre la explanada, que reparte las cargas y sirve de asiento estable para las capas superiores" },
    { anverso: "¿Qué es la capa de rodadura en un pavimento?", reverso: "La capa superior, en contacto directo con el tránsito, que debe ser resistente al desgaste y ofrecer las condiciones adecuadas de seguridad y confort" },
    { anverso: "¿Qué anchura mínima suele exigirse a un itinerario peatonal accesible en vía urbana?", reverso: "En torno a 1,80-2,00 m libres de obstáculos, según la normativa de accesibilidad aplicable, para permitir el cruce de dos personas o de una persona usuaria de silla de ruedas con holgura" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })),
);

console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué capas componen habitualmente un pavimento de acera convencional?", explicacion: "Explanada, base granular, capa de asiento y capa de acabado.", dificultad: "media", opciones: ["Explanada, base granular, asiento y acabado", "Únicamente una capa de hormigón armado", "Solo arena y adoquín sin base granular", "Exclusivamente asfalto en caliente"], correcta: 0 },
  { enunciado: "¿Qué es una loseta hidráulica?", explicacion: "Una pieza prefabricada de mortero de cemento, muy usada en aceras urbanas.", dificultad: "facil", opciones: ["Una pieza prefabricada de mortero de cemento para aceras", "Una pieza de piedra natural exclusivamente", "Un tipo de bordillo de hormigón", "Una capa de asfalto en caliente"], correcta: 0 },
  { enunciado: "¿Hacia dónde se orienta habitualmente la pendiente transversal de una acera?", explicacion: "Hacia la calzada, para facilitar la evacuación del agua de lluvia.", dificultad: "media", opciones: ["Hacia la calzada", "Hacia la fachada de los edificios", "No se da pendiente transversal", "Hacia el centro de la acera"], correcta: 0 },
  { enunciado: "¿Qué es el adoquinado?", explicacion: "Un pavimento de piezas relativamente pequeñas colocadas sobre cama de arena y rejuntadas.", dificultad: "media", opciones: ["Un pavimento de piezas pequeñas sobre cama de arena", "Un pavimento continuo de hormigón vertido", "Una capa granular sin compactar", "Un tipo de bordillo prefabricado"], correcta: 0 },
  { enunciado: "¿Para qué sirve un vado peatonal o rebaje de acera?", explicacion: "Para salvar el desnivel entre acera y calzada y garantizar la accesibilidad.", dificultad: "facil", opciones: ["Para salvar el desnivel entre acera y calzada", "Para delimitar un alcorque", "Para recoger el agua de lluvia", "Para señalizar una zona de obras"], correcta: 0 },
  { enunciado: "¿Qué es un pavimento de hormigón impreso?", explicacion: "Hormigón vertido in situ sobre el que se estampa una textura y se pigmenta antes del fraguado.", dificultad: "media", opciones: ["Hormigón vertido in situ con textura estampada y pigmentado", "Un pavimento exclusivamente de adoquín de piedra", "Una capa de zahorra sin tratar", "Un pavimento de madera para exteriores"], correcta: 0 },
  { enunciado: "¿Cuál es la función principal de la base granular de un pavimento?", explicacion: "Repartir las cargas y servir de asiento estable a las capas superiores.", dificultad: "media", opciones: ["Repartir cargas y servir de asiento estable", "Servir de acabado estético final", "Sustituir la necesidad de capa de rodadura", "Impermeabilizar totalmente el terreno"], correcta: 0 },
  { enunciado: "¿Qué característica debe tener la capa de rodadura de un pavimento?", explicacion: "Resistencia al desgaste y condiciones adecuadas de seguridad y confort.", dificultad: "media", opciones: ["Resistencia al desgaste y confort para el tránsito", "Ser siempre de tierra vegetal", "No requerir ningún mantenimiento", "Ser exclusivamente permeable al agua"], correcta: 0 },
]);

const S2 = "bordillos-encintados";
console.log(`📝 flashcards (${S2})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Qué es un bordillo?", reverso: "Una pieza longitudinal de piedra u hormigón prefabricado que delimita y separa la acera de la calzada u otras superficies, conteniendo lateralmente el pavimento" },
    { anverso: "¿Qué es el encintado de una acera?", reverso: "El conjunto formado por el bordillo y la rigola (o caz), que delimita el borde de la acera junto a la calzada y conduce el agua de escorrentía hacia los sumideros" },
    { anverso: "¿Qué es una rigola o caz?", reverso: "Una franja pavimentada, ligeramente hundida, situada junto al bordillo en el borde de la calzada, que canaliza el agua de lluvia hacia los sumideros" },
    { anverso: "¿Sobre qué elemento se asienta habitualmente un bordillo?", reverso: "Sobre un cimiento o solera de hormigón, que le proporciona estabilidad y resistencia frente al tráfico y los empujes laterales del pavimento" },
    { anverso: "¿Qué es el 'riñón' de hormigón de un bordillo?", reverso: "El refuerzo de hormigón colocado en la parte posterior (trasdós) del bordillo, para sujetarlo y evitar su desplazamiento por empujes o impactos" },
    { anverso: "¿Qué tipos de bordillo son habituales según su sección?", reverso: "Bordillo recto (de sección rectangular, para separaciones a nivel), bordillo montable o achaflanado (con un plano inclinado, para permitir el paso ocasional de vehículos) y bordillo de jardín (más bajo, para separar zonas verdes)" },
    { anverso: "¿Qué junta debe dejarse entre piezas consecutivas de bordillo?", reverso: "Una junta reducida (habitualmente de pocos milímetros), rejuntada con mortero, que permite pequeños movimientos sin perder la alineación ni la estanqueidad" },
    { anverso: "¿Por qué es importante el replanteo y la alineación en la colocación de bordillos?", reverso: "Porque el bordillo define la geometría final de la calzada y la acera; un mal replanteo genera desalineaciones visibles y problemas de encuentro con vados, sumideros y pasos de peatones" },
    { anverso: "¿Qué es un bordillo de granito y en qué se diferencia de uno de hormigón prefabricado?", reverso: "Un bordillo de piedra natural (granito), de mayor resistencia y durabilidad, habitual en cascos históricos o vías de alto tránsito, frente al de hormigón prefabricado, más económico y de fabricación industrial" },
    { anverso: "¿Qué relación de altura suele haber entre la rasante de la acera y la de la calzada en un bordillo estándar?", reverso: "La acera queda elevada respecto a la calzada, con un resalto (altura del bordillo visto) habitual en torno a 10-15 cm, salvo en vados y zonas rebajadas por accesibilidad" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })),
);

console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es un bordillo?", explicacion: "Una pieza longitudinal que delimita y separa la acera de la calzada.", dificultad: "facil", opciones: ["Una pieza que delimita acera y calzada", "Una pieza de pavimento de acera", "Un sumidero de recogida de pluviales", "Un elemento de alcorque"], correcta: 0 },
  { enunciado: "¿Qué es la rigola o caz?", explicacion: "Una franja hundida junto al bordillo que canaliza el agua hacia los sumideros.", dificultad: "media", opciones: ["Una franja que canaliza el agua hacia los sumideros", "El cimiento de hormigón del bordillo", "Un tipo de bordillo montable", "El refuerzo trasero del bordillo"], correcta: 0 },
  { enunciado: "¿Sobre qué se asienta habitualmente un bordillo?", explicacion: "Sobre un cimiento o solera de hormigón.", dificultad: "media", opciones: ["Sobre un cimiento o solera de hormigón", "Directamente sobre tierra vegetal", "Sobre una capa de grava suelta sin compactar", "Sobre un encofrado permanente de madera"], correcta: 0 },
  { enunciado: "¿Qué es el 'riñón' de un bordillo?", explicacion: "El refuerzo de hormigón en el trasdós del bordillo para evitar su desplazamiento.", dificultad: "dificil", opciones: ["El refuerzo de hormigón en el trasdós", "La junta entre dos piezas consecutivas", "El acabado visto de la cara superior", "El sumidero adosado al bordillo"], correcta: 0 },
  { enunciado: "¿Para qué se emplea un bordillo montable o achaflanado?", explicacion: "Para permitir el paso ocasional de vehículos gracias a su plano inclinado.", dificultad: "media", opciones: ["Para permitir el paso ocasional de vehículos", "Exclusivamente para separar zonas verdes", "Para sustituir la rigola de drenaje", "Para señalizar pasos de peatones"], correcta: 0 },
  { enunciado: "¿Por qué es crítico el replanteo correcto al colocar bordillos?", explicacion: "Porque define la geometría de calzada y acera, evitando desalineaciones y problemas en vados y sumideros.", dificultad: "media", opciones: ["Porque define la geometría de calzada y acera", "Porque determina el color del pavimento", "Porque no influye en el resto de elementos urbanos", "Porque solo afecta al coste de la obra"], correcta: 0 },
  { enunciado: "¿Qué caracteriza a un bordillo de granito frente a uno de hormigón prefabricado?", explicacion: "Mayor resistencia y durabilidad, habitual en cascos históricos o vías de alto tránsito.", dificultad: "media", opciones: ["Mayor resistencia y durabilidad", "Menor coste de fabricación siempre", "No requiere cimiento de hormigón", "Se emplea exclusivamente en jardines"], correcta: 0 },
  { enunciado: "¿Dónde se reduce habitualmente el resalto del bordillo respecto a la calzada?", explicacion: "En vados y zonas rebajadas por accesibilidad.", dificultad: "media", opciones: ["En vados y zonas rebajadas por accesibilidad", "En toda la longitud de la acera por igual", "Nunca se reduce el resalto del bordillo", "Solo en zonas ajardinadas"], correcta: 0 },
]);

const S3 = "sumideros-alcorques-mobiliario";
console.log(`📝 flashcards (${S3})...`);
await insertar(
  "flashcards",
  [
    { anverso: "¿Qué es un sumidero en la vía urbana?", reverso: "Un dispositivo de captación de aguas pluviales, generalmente situado junto al bordillo, que recoge el agua de escorrentía de calzada y acera y la conduce a la red de saneamiento mediante un albañal" },
    { anverso: "¿Qué es una arqueta sumidero de calzada?", reverso: "Una arqueta con rejilla en su parte superior (a nivel de la rigola) que capta el agua superficial y la deriva, mediante un ramal, al colector general de pluviales o mixto" },
    { anverso: "¿Qué se debe comprobar periódicamente en un sumidero de vía pública?", reverso: "Que la rejilla y el interior de la arqueta no estén obstruidos por hojas, residuos o sedimentos, ya que su colmatación provoca encharcamientos en la calzada" },
    { anverso: "¿Qué es un alcorque?", reverso: "El hueco dejado en el pavimento urbano, generalmente delimitado por un marco o rejilla, alrededor del tronco de un árbol, para permitir el riego, la aireación de las raíces y su crecimiento" },
    { anverso: "¿Qué dimensiones orientativas suele tener un alcorque para arbolado de alineación urbana?", reverso: "Entre 1 x 1 m y 1,20 x 1,20 m aproximadamente, aunque puede variar según la especie y el criterio del proyecto de urbanización" },
    { anverso: "¿Qué función cumple la rejilla o marco de un alcorque?", reverso: "Proteger el hueco del alcorque para que sea transitable por los peatones, evitando caídas y daños al pavimento, sin impedir el paso de agua y aire hasta las raíces" },
    { anverso: "¿Qué elementos de mobiliario urbano suelen encontrarse asociados a la pavimentación de una acera?", reverso: "Bancos, papeleras, farolas, señales verticales, bolardos, pilonas y elementos de jardinería, cuyos anclajes y cimentaciones deben coordinarse con el pavimento" },
    { anverso: "¿Qué es un bolardo o pilona?", reverso: "Un elemento vertical de corta altura, fijo o abatible, instalado en la acera o en accesos peatonales, para impedir el paso o el estacionamiento de vehículos" },
    { anverso: "¿Qué precaución debe tenerse al pavimentar alrededor de un sumidero o alcorque?", reverso: "Respetar la cota y la pendiente hacia el elemento de captación, y dejar la junta perimetral adecuada para permitir pequeños movimientos sin fisurar el pavimento circundante" },
    { anverso: "¿Qué relación existe entre el diseño del alcorque y la red de servicios urbanos (agua, gas, electricidad, telecomunicaciones)?", reverso: "El alcorque debe ubicarse y dimensionarse teniendo en cuenta las canalizaciones de servicios existentes, para no dañarlas ni comprometer el desarrollo radicular ni el mantenimiento de dichas redes" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })),
);

console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es un sumidero en la vía urbana?", explicacion: "Un dispositivo que recoge el agua de escorrentía y la conduce a la red de saneamiento.", dificultad: "facil", opciones: ["Un dispositivo que recoge y conduce el agua de escorrentía", "Una pieza que delimita acera y calzada", "Un hueco para el arbolado urbano", "Un elemento de mobiliario urbano"], correcta: 0 },
  { enunciado: "¿A través de qué elemento se conecta un sumidero al colector general?", explicacion: "Mediante un ramal o albañal.", dificultad: "media", opciones: ["Mediante un ramal o albañal", "Directamente sin ningún conducto", "A través de un alcorque", "Mediante un bordillo montable"], correcta: 0 },
  { enunciado: "¿Qué problema provoca la colmatación de un sumidero por hojas o residuos?", explicacion: "Encharcamientos en la calzada.", dificultad: "facil", opciones: ["Encharcamientos en la calzada", "Un aumento de la resistencia del pavimento", "La rotura del bordillo adyacente", "Ninguna consecuencia relevante"], correcta: 0 },
  { enunciado: "¿Qué es un alcorque?", explicacion: "El hueco en el pavimento alrededor de un árbol, para riego y aireación de raíces.", dificultad: "facil", opciones: ["El hueco en el pavimento alrededor de un árbol", "Una arqueta de registro de pluviales", "Un tipo de bordillo montable", "Un elemento de mobiliario urbano fijo"], correcta: 0 },
  { enunciado: "¿Qué dimensiones orientativas suele tener un alcorque de alineación urbana?", explicacion: "Entre 1x1 m y 1,20x1,20 m aproximadamente.", dificultad: "media", opciones: ["Entre 1x1 m y 1,20x1,20 m aproximadamente", "Siempre 3x3 m como mínimo", "Menos de 20x20 cm", "No tiene dimensión estandarizada alguna"], correcta: 0 },
  { enunciado: "¿Para qué sirve la rejilla o marco de un alcorque?", explicacion: "Para hacerlo transitable evitando caídas, sin impedir el paso de agua y aire a las raíces.", dificultad: "media", opciones: ["Para hacerlo transitable sin impedir agua y aire a las raíces", "Para impedir totalmente el riego del árbol", "Para sustituir la necesidad de bordillo", "Para captar aguas pluviales de la calzada"], correcta: 0 },
  { enunciado: "¿Qué es un bolardo o pilona?", explicacion: "Un elemento vertical que impide el paso o estacionamiento de vehículos en la acera.", dificultad: "media", opciones: ["Un elemento que impide el paso de vehículos", "Un dispositivo de captación de pluviales", "Un tipo de rejilla de alcorque", "Una pieza de bordillo montable"], correcta: 0 },
  { enunciado: "¿Qué debe tenerse en cuenta al ubicar un alcorque respecto a las redes de servicios urbanos?", explicacion: "Las canalizaciones existentes, para no dañarlas ni comprometer su mantenimiento ni el desarrollo radicular.", dificultad: "dificil", opciones: ["Las canalizaciones de servicios existentes", "Únicamente el color del pavimento circundante", "Solo la orientación solar de la calle", "Exclusivamente la anchura de la acera"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 17 de ${OPOSICION}...`);
await upsert(
  "tema_oposicion",
  [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 17, orden: 17, es_premium: false, publicado: true, secciones_incluidas: null }],
  "tema_slug,oposicion_slug"
);

console.log("\n✅ tema-55 creado y vinculado como Tema 17 de Oficial Albañil.");
