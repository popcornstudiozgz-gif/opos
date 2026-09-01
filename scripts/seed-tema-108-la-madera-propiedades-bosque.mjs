/**
 * Crea el tema canónico tema-108: "La madera: propiedades físicas y
 * mecánicas, el bosque y partes del árbol, tala y defectos de sierra" y lo
 * asigna como Tema 5 (bloque-2, numero=7) de la oposición Oficial
 * Carpintero (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 5 oficial del Anexo I (bases2110.pdf): "La madera.
 * Propiedades físicas y mecánicas. El Bosque. Partes del árbol. La madera
 * como género al por menor: tala, desmoche, troceo de la madera, defectos
 * de la madera de sierra."
 *
 * Contenido técnico consolidado del oficio de carpintería sin una única
 * norma legal que lo regule específicamente para este temario (búsqueda
 * realizada en esta sesión: no se ha localizado ningún RD o reglamento
 * público que fije "propiedades de la madera" o "partes del árbol" como
 * materia normada). Como referencia técnica general del sector se cita
 * AITIM (Asociación de Investigación Técnica de las Industrias de la
 * Madera, el Mueble y el Corcho), entidad técnica española de referencia
 * con publicaciones técnicas de libre consulta (infomadera.net), sin
 * atribuirle artículos o apartados concretos no verificados directamente.
 *
 * Tres secciones:
 * 1. propiedades-fisicas-mecanicas-madera
 * 2. bosque-partes-arbol
 * 3. tala-desmoche-troceo-defectos-sierra
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-108-la-madera-propiedades-bosque.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!URL_BASE || !SERVICE_KEY) {
  console.error("❌ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-108";
const OPOSICION = "oficial-carpintero-ayto-zaragoza";
const BLOQUE_2_ID = "57328a33-1930-4433-a890-5de4a8056e1a";

async function insertar(tabla, filas) {
  const res = await fetch(`${URL_BASE}/rest/v1/${tabla}`, { method: "POST", headers: { ...HEADERS, Prefer: "return=representation" }, body: JSON.stringify(filas) });
  if (!res.ok) { console.error(`❌ Error insertando en ${tabla}: ${res.status} ${await res.text()}`); process.exit(1); }
  return res.json();
}
async function upsert(tabla, filas, onConflict) {
  const res = await fetch(`${URL_BASE}/rest/v1/${tabla}?on_conflict=${onConflict}`, { method: "POST", headers: { ...HEADERS, Prefer: "resolution=merge-duplicates,return=representation" }, body: JSON.stringify(filas) });
  if (!res.ok) { console.error(`❌ Error insertando en ${tabla}: ${res.status} ${await res.text()}`); process.exit(1); }
  return res.json();
}
async function insertarPreguntasConOpciones(seccion, preguntas) {
  const filas = preguntas.map(({ opciones, correcta, ...p }) => ({ ...p, tema_slug: TEMA, seccion }));
  const insertadas = await insertar("preguntas", filas);
  console.log(`   ✓ preguntas: ${insertadas.length} filas`);
  const filasOpciones = insertadas.flatMap((pregunta, i) => preguntas[i].opciones.map((texto, orden) => ({ pregunta_id: pregunta.id, texto, es_correcta: orden === preguntas[i].correcta, orden })));
  const opcionesInsertadas = await insertar("opciones", filasOpciones);
  console.log(`   ✓ opciones: ${opcionesInsertadas.length} filas`);
}
async function crearCaso({ slug, titulo, supuesto, orden, preguntas }) {
  const resCaso = await fetch(`${URL_BASE}/rest/v1/casos_practicos`, { method: "POST", headers: { ...HEADERS, Prefer: "return=representation" }, body: JSON.stringify({ tema_slug: TEMA, slug, titulo, supuesto, orden }) });
  if (!resCaso.ok) { console.error(`❌ caso ${resCaso.status} ${await resCaso.text()}`); process.exit(1); }
  const [caso] = await resCaso.json();
  for (let i = 0; i < preguntas.length; i++) {
    const p = preguntas[i];
    const resP = await fetch(`${URL_BASE}/rest/v1/preguntas`, { method: "POST", headers: { ...HEADERS, Prefer: "return=representation" }, body: JSON.stringify({ tema_slug: TEMA, seccion: p.seccion, enunciado: p.enunciado, explicacion: p.explicacion ?? null, dificultad: p.dificultad }) });
    if (!resP.ok) { console.error(`❌ pregunta ${resP.status} ${await resP.text()}`); process.exit(1); }
    const [pregunta] = await resP.json();
    const opciones = p.opciones.map((texto, idx) => ({ pregunta_id: pregunta.id, texto, es_correcta: idx === 0, orden: idx }));
    const resO = await fetch(`${URL_BASE}/rest/v1/opciones`, { method: "POST", headers: { ...HEADERS, Prefer: "return=minimal" }, body: JSON.stringify(opciones) });
    if (!resO.ok) { console.error(`❌ opciones ${resO.status} ${await resO.text()}`); process.exit(1); }
    const resCP = await fetch(`${URL_BASE}/rest/v1/caso_preguntas`, { method: "POST", headers: { ...HEADERS, Prefer: "return=minimal" }, body: JSON.stringify({ caso_id: caso.id, pregunta_id: pregunta.id, orden: i }) });
    if (!resCP.ok) { console.error(`❌ caso_preguntas ${resCP.status} ${await resCP.text()}`); process.exit(1); }
  }
  console.log(`   ✅ ${titulo} (${preguntas.length} preguntas)`);
}

console.log(`📚 Creando ${TEMA}...`);
await insertar("temas", [
  {
    slug: TEMA,
    titulo: "La madera: propiedades, el bosque y defectos de sierra",
    descripcion: "Propiedades físicas y mecánicas de la madera. El bosque y las partes del árbol. La madera como género al por menor: tala, desmoche, troceo y defectos de la madera de sierra.",
    contenido:
      "Desarrolla las propiedades físicas (densidad, humedad, higroscopicidad) y mecánicas (resistencia a flexión, compresión, tracción) que caracterizan a la madera como material, la estructura del árbol y del bosque del que procede, y el proceso de obtención de madera en rollo hasta su troceo, con los defectos más habituales que presenta la madera aserrada.",
    enlaces_boe: [],
    indice_estudio: [
      { url: "https://infomadera.net/", titulo: "Propiedades físicas y mecánicas de la madera", seccion: "propiedades-fisicas-mecanicas-madera", articulos: "Referencia técnica: AITIM" },
      { url: "", titulo: "El bosque y las partes del árbol", seccion: "bosque-partes-arbol", articulos: "Conceptos fundamentales" },
      { url: "", titulo: "Tala, desmoche, troceo y defectos de la madera de sierra", seccion: "tala-desmoche-troceo-defectos-sierra", articulos: "Conceptos fundamentales" },
    ],
  },
]);

const S1 = "propiedades-fisicas-mecanicas-madera";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es la densidad de la madera, y por qué varía tanto entre especies?", reverso: "La relación entre su masa y su volumen; varía según la especie, la proporción de madera temprana y tardía, y el contenido de humedad, siendo un indicador básico de su calidad mecánica" },
  { anverso: "¿Qué es la higroscopicidad de la madera?", reverso: "La capacidad de la madera de absorber o ceder humedad del ambiente hasta alcanzar un equilibrio con la humedad relativa del aire que la rodea" },
  { anverso: "¿Qué es el punto de saturación de las fibras (PSF)?", reverso: "El contenido de humedad (en torno al 28-30%) a partir del cual la madera comienza a variar sus dimensiones al perder o ganar agua; por debajo de ese punto se producen la contracción o el hinchazón" },
  { anverso: "¿Qué es la contracción de la madera?", reverso: "La reducción de sus dimensiones al perder humedad por debajo del punto de saturación de las fibras, distinta según la dirección (radial, tangencial o axial) considerada" },
  { anverso: "¿Por qué la contracción de la madera no es igual en todas las direcciones?", reverso: "Porque su estructura celular anisótropa hace que la contracción tangencial sea generalmente mayor que la radial, y esta a su vez mucho mayor que la longitudinal (axial)" },
  { anverso: "¿Qué es la resistencia a flexión de la madera?", reverso: "La capacidad de una pieza de madera para soportar cargas perpendiculares a su eje longitudinal sin romperse, una propiedad mecánica clave en vigas y elementos estructurales" },
  { anverso: "¿Qué es la resistencia a compresión paralela a la fibra?", reverso: "La capacidad de la madera de soportar esfuerzos de compresión aplicados en la misma dirección de sus fibras, generalmente mayor que la resistencia perpendicular a la fibra" },
  { anverso: "¿Qué relación existe entre la densidad de una madera y su resistencia mecánica general?", reverso: "En términos generales, a mayor densidad suele corresponder una mayor resistencia mecánica, aunque esta relación varía según la especie y otros factores como los defectos presentes" },
  { anverso: "¿Qué es la dureza de la madera, y qué ensayo se emplea habitualmente para medirla?", reverso: "La resistencia que opone la madera a ser penetrada o rayada; se mide habitualmente mediante ensayos normalizados como el de Brinell o el de Janka, que aplican una fuerza controlada sobre la superficie" },
  { anverso: "¿Por qué es importante conocer las propiedades físicas y mecánicas de una madera antes de emplearla en un elemento concreto de carpintería?", reverso: "Porque permiten elegir la especie y las dimensiones adecuadas según el uso previsto (estructural, decorativo, exterior), evitando fallos por insuficiente resistencia o por movimientos dimensionales excesivos" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));

console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es la densidad de la madera?", explicacion: "La relación entre su masa y su volumen, un indicador básico de calidad mecánica.", dificultad: "facil", opciones: ["La relación entre su masa y su volumen", "La capacidad de absorber humedad del ambiente", "La resistencia a la flexión de una viga", "El color natural de la especie considerada"], correcta: 0 },
  { enunciado: "¿Qué es la higroscopicidad de la madera?", explicacion: "La capacidad de absorber o ceder humedad del ambiente hasta un equilibrio.", dificultad: "facil", opciones: ["La capacidad de absorber o ceder humedad del ambiente", "La resistencia a la compresión paralela a la fibra", "La dureza superficial medida con el ensayo Janka", "La densidad relativa de la madera seca"], correcta: 0 },
  { enunciado: "¿Qué es el punto de saturación de las fibras?", explicacion: "El contenido de humedad (en torno al 28-30%) a partir del cual la madera empieza a variar de dimensiones.", dificultad: "media", opciones: ["El contenido de humedad a partir del cual varían las dimensiones de la madera", "La densidad máxima que puede alcanzar una madera", "La resistencia máxima a flexión de una especie", "El punto de combustión de la madera seca"], correcta: 0 },
  { enunciado: "¿Por qué la contracción de la madera no es igual en todas las direcciones?", explicacion: "Por su estructura celular anisótropa: la contracción tangencial suele ser mayor que la radial y esta mayor que la longitudinal.", dificultad: "dificil", opciones: ["Por su estructura celular anisótropa", "Porque toda la madera se contrae exactamente igual en cualquier dirección", "Porque solo se contrae en sentido longitudinal", "Porque la contracción depende únicamente del color de la madera"], correcta: 0 },
  { enunciado: "¿Qué mide la resistencia a flexión de la madera?", explicacion: "La capacidad de soportar cargas perpendiculares a su eje longitudinal sin romperse.", dificultad: "media", opciones: ["La capacidad de soportar cargas perpendiculares a su eje sin romperse", "La capacidad de absorber humedad del ambiente", "La densidad relativa de la madera seca", "El color y el veteado natural de la madera"], correcta: 0 },
  { enunciado: "¿Qué ensayo se emplea habitualmente para medir la dureza de la madera?", explicacion: "Ensayos normalizados como el de Brinell o el de Janka.", dificultad: "media", opciones: ["El ensayo de Brinell o el de Janka", "El ensayo Proctor de compactación", "El ensayo de tracción del acero", "El ensayo de fraguado del cemento"], correcta: 0 },
  { enunciado: "¿Qué relación general existe entre densidad y resistencia mecánica de la madera?", explicacion: "A mayor densidad suele corresponder mayor resistencia mecánica, aunque varía según la especie.", dificultad: "media", opciones: ["A mayor densidad, generalmente mayor resistencia mecánica", "No existe ninguna relación entre densidad y resistencia", "A mayor densidad, siempre menor resistencia mecánica", "La densidad solo afecta al color de la madera"], correcta: 0 },
  { enunciado: "¿Por qué es importante conocer las propiedades físicas y mecánicas de una madera antes de emplearla?", explicacion: "Para elegir la especie y dimensiones adecuadas al uso previsto, evitando fallos de resistencia o movimientos excesivos.", dificultad: "media", opciones: ["Para elegir la especie y dimensiones adecuadas al uso previsto", "Porque lo exige siempre un trámite administrativo previo", "Solo por motivos estéticos, sin relación con su comportamiento real", "Porque determina exclusivamente el precio de mercado"], correcta: 0 },
]);

const S2 = "bosque-partes-arbol";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es la corteza de un árbol, y qué función cumple?", reverso: "La capa externa que protege al árbol de agentes externos (clima, insectos, hongos), formada por tejido muerto en su parte exterior (súber o corcho) y tejido vivo en su parte interior (líber)" },
  { anverso: "¿Qué es el cambium de un árbol?", reverso: "La fina capa de células vivas situada entre la corteza y la madera, responsable del crecimiento en grosor del tronco mediante la formación de nuevas células cada año" },
  { anverso: "¿Qué diferencia hay entre la albura y el duramen de un tronco?", reverso: "La albura es la madera más joven y periférica, todavía viva y con función de conducción de savia; el duramen es la madera más interna y antigua, ya sin función fisiológica activa, generalmente más oscura y duradera" },
  { anverso: "¿Qué son los anillos de crecimiento de un árbol?", reverso: "Las capas concéntricas que se forman cada año por la actividad del cambium, visibles en la sección transversal del tronco, y que permiten estimar la edad del árbol" },
  { anverso: "¿Qué son la madera temprana y la madera tardía dentro de un mismo anillo de crecimiento?", reverso: "La madera temprana (o de primavera) se forma al inicio de la temporada de crecimiento, con células de paredes más finas; la madera tardía (o de verano) se forma después, con células de paredes más gruesas y mayor densidad" },
  { anverso: "¿Qué es la médula de un tronco?", reverso: "El tejido central del tronco, formado en los primeros años de vida del árbol, generalmente blando y de menor interés para la obtención de madera de calidad" },
  { anverso: "¿Qué es un bosque, en su acepción forestal básica?", reverso: "Una superficie de terreno poblada de árboles que forman una masa forestal, con un ecosistema propio de flora y fauna asociado" },
  { anverso: "¿Qué diferencia general existe entre una masa forestal de coníferas y una de frondosas?", reverso: "Las coníferas (pino, abeto) suelen ser árboles de hoja perenne y madera blanda; las frondosas (roble, haya) suelen tener hoja caduca y madera generalmente más dura, aunque existen numerosas excepciones" },
  { anverso: "¿Qué es la silvicultura?", reverso: "La disciplina técnica que se ocupa del cultivo, cuidado y aprovechamiento ordenado de los bosques, buscando su conservación y producción sostenible" },
  { anverso: "¿Por qué es relevante para el carpintero conocer las partes del árbol y su estructura, más allá de un interés puramente botánico?", reverso: "Porque la posición de una pieza de madera dentro del tronco original (cerca de la médula, en la albura o en el duramen) condiciona sus propiedades, su comportamiento frente a la humedad y su calidad para distintos usos" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));

console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué función cumple la corteza de un árbol?", explicacion: "Proteger al árbol de agentes externos como el clima, los insectos o los hongos.", dificultad: "facil", opciones: ["Proteger al árbol de agentes externos", "Realizar la fotosíntesis principal del árbol", "Formar los anillos de crecimiento anuales", "Transportar el agua desde las raíces a las hojas"], correcta: 0 },
  { enunciado: "¿Qué es el cambium de un árbol?", explicacion: "La capa de células vivas responsable del crecimiento en grosor del tronco.", dificultad: "media", opciones: ["La capa de células vivas responsable del crecimiento en grosor", "El tejido central y más antiguo del tronco", "La corteza exterior muerta del árbol", "El conjunto de hojas de la copa del árbol"], correcta: 0 },
  { enunciado: "¿Qué diferencia hay entre la albura y el duramen de un tronco?", explicacion: "La albura es más joven y periférica, con función de conducción; el duramen es más interno y antiguo, sin función fisiológica activa.", dificultad: "media", opciones: ["La albura es periférica y activa; el duramen es interno y sin función activa", "Son exactamente el mismo tejido con distinto nombre", "El duramen siempre es más claro que la albura", "La albura solo existe en árboles de hoja caduca"], correcta: 0 },
  { enunciado: "¿Qué son los anillos de crecimiento de un árbol?", explicacion: "Capas concéntricas formadas cada año por la actividad del cambium, visibles en la sección del tronco.", dificultad: "facil", opciones: ["Capas concéntricas formadas cada año por el cambium", "El tejido central y blando del tronco", "La corteza externa muerta del árbol", "Las raíces superficiales del árbol"], correcta: 0 },
  { enunciado: "¿Qué diferencia hay entre la madera temprana y la madera tardía de un anillo?", explicacion: "La temprana se forma al inicio de la temporada, con paredes celulares más finas; la tardía después, con paredes más gruesas y mayor densidad.", dificultad: "dificil", opciones: ["La temprana tiene paredes celulares más finas que la tardía", "Son exactamente el mismo tipo de tejido sin ninguna diferencia real", "La tardía siempre se forma antes que la temprana en cada anillo", "La madera temprana solo existe en coníferas, nunca en frondosas"], correcta: 0 },
  { enunciado: "¿Qué es la médula de un tronco?", explicacion: "El tejido central, formado en los primeros años de vida del árbol, generalmente blando.", dificultad: "facil", opciones: ["El tejido central del tronco, generalmente blando", "La capa exterior de corteza muerta", "El anillo de crecimiento más reciente", "La capa de células vivas del cambium"], correcta: 0 },
  { enunciado: "¿Qué diferencia general existe entre coníferas y frondosas?", explicacion: "Las coníferas suelen ser de hoja perenne y madera blanda; las frondosas de hoja caduca y madera generalmente más dura.", dificultad: "media", opciones: ["Las coníferas suelen tener madera más blanda que las frondosas", "Las frondosas nunca pierden la hoja en ninguna época del año", "Las coníferas nunca se emplean en carpintería estructural", "No existe ninguna diferencia relevante entre ambos grupos"], correcta: 0 },
  { enunciado: "¿Qué es la silvicultura?", explicacion: "La disciplina que se ocupa del cultivo, cuidado y aprovechamiento ordenado de los bosques.", dificultad: "media", opciones: ["La disciplina que se ocupa del cultivo y aprovechamiento del bosque", "El proceso de secado artificial de la madera aserrada", "La técnica de ensamblaje de piezas de carpintería", "El estudio de las propiedades mecánicas de la madera"], correcta: 0 },
  { enunciado: "¿Por qué es relevante para un carpintero conocer las partes del árbol?", explicacion: "Porque la posición de la pieza en el tronco original condiciona sus propiedades y su calidad para distintos usos.", dificultad: "media", opciones: ["Porque condiciona las propiedades y la calidad de la pieza obtenida", "Porque determina exclusivamente el precio de venta de la madera", "Solo tiene un interés botánico, sin ninguna aplicación práctica", "Porque lo exige un trámite administrativo antes de tallar el árbol"], correcta: 0 },
]);

const S3 = "tala-desmoche-troceo-defectos-sierra";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es la tala de un árbol, dentro del proceso de obtención de madera en rollo?", reverso: "El corte del árbol por su base para su derribo, primer paso del aprovechamiento maderero antes de las operaciones posteriores de desmoche y troceo" },
  { anverso: "¿Qué es el desmoche de un árbol talado?", reverso: "La operación de retirar las ramas del tronco derribado, dejando limpio el fuste principal para su posterior troceo y transporte" },
  { anverso: "¿Qué es el troceo de la madera?", reverso: "El corte del fuste ya desmochado en trozos de longitud determinada (trozas), según las dimensiones comerciales previstas para su aserrado posterior" },
  { anverso: "¿Qué es una troza, en el vocabulario del aserrado de madera?", reverso: "Cada uno de los trozos de tronco resultantes del troceo, listos para ser transportados al aserradero y convertidos en madera aserrada" },
  { anverso: "¿Qué es un nudo, como defecto habitual de la madera de sierra?", reverso: "La sección de una rama incluida en el tronco, que al aserrarse aparece como una zona de fibra desviada y mayor dureza, pudiendo debilitar la pieza según su tamaño y posición" },
  { anverso: "¿Qué diferencia hay entre un nudo vivo y un nudo muerto?", reverso: "El nudo vivo está firmemente unido a la madera circundante, ya que procedía de una rama viva en el momento de la tala; el nudo muerto procede de una rama ya seca o desprendida, y puede soltarse dejando un agujero" },
  { anverso: "¿Qué es una grieta o fenda, como defecto de la madera aserrada?", reverso: "Una separación de las fibras de la madera, habitualmente originada por tensiones de secado o por el propio proceso de tala, que reduce la resistencia y el aprovechamiento de la pieza" },
  { anverso: "¿Qué es el alabeo de una tabla, como defecto habitual tras el aserrado y secado?", reverso: "La deformación de la pieza respecto a su forma plana original (curvatura, torcedura o combadura), causada generalmente por un secado desigual o por tensiones internas de la madera" },
  { anverso: "¿Qué es la médula incluida, como defecto de una pieza aserrada?", reverso: "La presencia del tejido central y blando del tronco (médula) dentro de una tabla o listón, que suele representar una zona de menor resistencia y mayor riesgo de agrietamiento" },
  { anverso: "¿Por qué es importante que el carpintero sepa identificar los defectos habituales de la madera de sierra antes de emplearla?", reverso: "Porque permite seleccionar el material adecuado a cada uso, descartando o reubicando las piezas con defectos que comprometan su resistencia o su aspecto en elementos vistos" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));

console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es la tala de un árbol?", explicacion: "El corte del árbol por su base para su derribo, primer paso del aprovechamiento maderero.", dificultad: "facil", opciones: ["El corte del árbol por su base para su derribo", "La retirada de las ramas del tronco derribado", "El corte del fuste en trozos de longitud determinada", "El secado del tronco antes de su transporte"], correcta: 0 },
  { enunciado: "¿Qué es el desmoche de un árbol talado?", explicacion: "La retirada de las ramas del tronco derribado, dejando limpio el fuste principal.", dificultad: "facil", opciones: ["La retirada de las ramas del tronco derribado", "El corte del árbol por su base", "El corte del fuste en trozas comerciales", "El proceso de secado natural de la madera"], correcta: 0 },
  { enunciado: "¿Qué es el troceo de la madera?", explicacion: "El corte del fuste desmochado en trozos de longitud determinada, según las dimensiones comerciales previstas.", dificultad: "media", opciones: ["El corte del fuste en trozos de longitud determinada", "La retirada de las ramas del árbol talado", "El proceso de secado artificial en cámara", "El corte del árbol por su base para el derribo"], correcta: 0 },
  { enunciado: "¿Qué es un nudo vivo, como defecto de la madera de sierra?", explicacion: "El nudo firmemente unido a la madera circundante, procedente de una rama viva en el momento de la tala.", dificultad: "media", opciones: ["El nudo firmemente unido a la madera circundante", "El nudo que se suelta dejando un agujero", "Una grieta originada por tensiones de secado", "La deformación de una tabla tras el secado"], correcta: 0 },
  { enunciado: "¿Qué diferencia hay entre un nudo vivo y un nudo muerto?", explicacion: "El vivo está firmemente unido a la madera; el muerto procede de una rama ya seca y puede soltarse dejando un agujero.", dificultad: "media", opciones: ["El nudo muerto puede soltarse dejando un agujero, el vivo no", "Son exactamente el mismo tipo de defecto con distinto nombre", "El nudo vivo siempre es mayor en tamaño que el muerto", "El nudo muerto solo aparece en madera de coníferas"], correcta: 0 },
  { enunciado: "¿Qué es una grieta o fenda en la madera aserrada?", explicacion: "Una separación de las fibras, originada por tensiones de secado o por el propio proceso de tala.", dificultad: "media", opciones: ["Una separación de las fibras de la madera", "La presencia de la médula dentro de una tabla", "La deformación curva de una tabla tras el secado", "Un nudo firmemente unido a la madera circundante"], correcta: 0 },
  { enunciado: "¿Qué es el alabeo de una tabla?", explicacion: "La deformación respecto a su forma plana original, causada por secado desigual o tensiones internas.", dificultad: "media", opciones: ["La deformación respecto a su forma plana original", "La separación de las fibras por tensiones de secado", "La presencia de la médula dentro de la pieza", "El corte del fuste en trozos de longitud determinada"], correcta: 0 },
  { enunciado: "¿Por qué es importante identificar los defectos de la madera de sierra antes de emplearla?", explicacion: "Permite seleccionar el material adecuado a cada uso, descartando piezas con defectos que comprometan resistencia o aspecto.", dificultad: "media", opciones: ["Permite seleccionar el material adecuado a cada uso concreto", "Solo tiene relevancia estética, sin relación con la resistencia real", "Porque lo exige siempre un trámite administrativo previo", "Porque determina exclusivamente el precio final de venta"], correcta: 0 },
]);

console.log("📖 glosario...");
await insertar("glosario", [
  { tema_slug: TEMA, seccion: S1, termino: "Anisotropía", definicion: "Propiedad de un material, como la madera, de comportarse de forma distinta según la dirección en que se mida o solicite (radial, tangencial, longitudinal)." },
  { tema_slug: TEMA, seccion: S1, termino: "Higroscopicidad", definicion: "Capacidad de un material de absorber o ceder humedad del ambiente hasta alcanzar un equilibrio con la humedad relativa del aire." },
  { tema_slug: TEMA, seccion: S2, termino: "Cambium", definicion: "Capa de células vivas entre la corteza y la madera responsable del crecimiento en grosor del tronco." },
  { tema_slug: TEMA, seccion: S2, termino: "Duramen", definicion: "Madera más interna y antigua del tronco, sin función fisiológica activa, generalmente más oscura y duradera que la albura." },
  { tema_slug: TEMA, seccion: S3, termino: "Troza", definicion: "Trozo de tronco resultante del troceo, listo para ser transportado al aserradero y convertido en madera aserrada." },
  { tema_slug: TEMA, seccion: S3, termino: "Alabeo", definicion: "Deformación de una pieza de madera respecto a su forma plana original, por curvatura, torcedura o combadura." },
]);

console.log("💼 casos prácticos...");
await crearCaso({
  slug: "caso-eleccion-tablon-roble-mesa-macizo-nudos",
  titulo: "La elección de un tablón de roble para una mesa maciza con nudos visibles",
  orden: 1,
  supuesto: "El oficial carpintero debe seleccionar, entre varios tablones de roble disponibles en el taller, el más adecuado para la tapa de una mesa maciza que quedará vista, evaluando sus propiedades y los posibles defectos presentes en cada pieza.",
  preguntas: [
    q(S1, "facil", "¿Qué propiedad del roble sería razonable comprobar antes de elegirlo para una mesa de uso diario, dado el trato continuado que recibirá su superficie?", ["Su dureza superficial, dado que una mesa de uso diario recibe roces y golpes frecuentes", "Únicamente su color, sin ninguna relación con la dureza real de la superficie del tablón", "Únicamente su precio de mercado, sin ninguna consideración sobre sus propiedades mecánicas reales", "Ninguna propiedad concreta es relevante si el tablón parece visualmente en buen estado"], "Comprobar la dureza superficial del roble es razonable dado el trato continuado que recibirá la superficie de una mesa de uso diario, con roces y golpes frecuentes."),
    q(S3, "facil", "Si el oficial detecta un nudo grande y suelto cerca del borde de uno de los tablones, ¿qué debería considerar antes de emplearlo tal cual en la tapa de la mesa?", ["Que ese nudo suelto representa un punto débil y un posible agujero futuro, por lo que convendría descartarlo o reubicarlo en una zona menos comprometida de la pieza final", "Que el nudo no tiene ninguna relevancia real para la resistencia o el aspecto final de la mesa terminada", "Que debe emplear directamente ese tablón sin ninguna otra consideración, dado que el nudo forma parte del aspecto natural de la madera", "Que solo los nudos vivos representan algún problema real, sin ninguna relevancia de los nudos sueltos o muertos"], "Un nudo grande y suelto representa un punto débil y un posible agujero futuro, por lo que conviene descartarlo o reubicarlo en una zona menos comprometida antes de emplear la pieza en la tapa de la mesa."),
    q(S1, "media", "¿Por qué es relevante conocer el contenido de humedad del tablón de roble antes de fabricar la mesa, más allá de su aspecto exterior?", ["Porque una madera con humedad inadecuada puede seguir moviéndose (contrayéndose o hinchándose) tras el montaje, deformando la tapa terminada", "Porque el contenido de humedad no tiene ninguna relación real con el comportamiento futuro de la pieza ya montada", "Porque solo es relevante la humedad si la mesa se va a ubicar en el exterior, sin ninguna relación en un uso interior habitual", "Porque la humedad del tablón solo afecta al color final del acabado aplicado, sin ninguna relación con su estabilidad dimensional"], "Conocer el contenido de humedad es relevante porque una madera con humedad inadecuada puede seguir moviéndose tras el montaje, deformando la tapa de la mesa ya terminada."),
    q(S2, "media", "¿Qué debería tener en cuenta el oficial si detecta que un tablón procede de una zona muy cercana a la médula del tronco original?", ["Que esa zona suele presentar mayor riesgo de agrietamiento y menor estabilidad, por lo que conviene valorarla con especial atención antes de emplearla en la tapa vista de la mesa", "Que la proximidad a la médula no tiene ninguna relevancia real para la calidad de la pieza obtenida de ese tronco original", "Que debe emplear esa zona preferentemente, dado que suele ofrecer una mayor resistencia mecánica que el resto del tronco", "Que solo es relevante la posición respecto a la médula si se trata de madera de coníferas, sin ninguna relevancia en el roble"], "Una zona muy cercana a la médula suele presentar mayor riesgo de agrietamiento y menor estabilidad dimensional, por lo que conviene valorarla con especial atención antes de emplearla en una pieza vista como la tapa de esta mesa."),
    q(S3, "media", "¿Qué debería hacer el oficial si, al revisar los tablones, detecta una grieta visible que recorre parte de uno de ellos?", ["Valorar si la grieta compromete una zona estructuralmente relevante de la pieza, descartando ese tramo concreto o el tablón completo si el riesgo para la resistencia final es demasiado alto", "Ignorar la grieta detectada si el resto del tablón presenta un aspecto visualmente adecuado para la tapa de la mesa prevista", "Emplear directamente el tablón agrietado sin ninguna consideración adicional, confiando en que el acabado final ocultará la grieta detectada", "Rellenar la grieta con cualquier material disponible en el taller, sin ninguna valoración previa sobre si compromete realmente la resistencia de la pieza"], "Ante una grieta visible, lo adecuado es valorar si compromete una zona estructuralmente relevante de la pieza, descartando ese tramo o el tablón completo si el riesgo para la resistencia final es demasiado alto."),
    q(S1, "dificil", "Si dos tablones de roble tienen un aspecto exterior muy similar pero uno resulta perceptiblemente más pesado que el otro para un mismo tamaño, ¿qué podría indicar esa diferencia de peso?", ["Que ambos tablones podrían tener una densidad distinta, lo que puede traducirse en un comportamiento mecánico y una estabilidad dimensional diferentes entre ambos, aunque procedan de la misma especie", "Que uno de los dos tablones necesariamente está podrido por dentro, sin ninguna otra explicación posible para esa diferencia de peso detectada", "Que la diferencia de peso no tiene ninguna relación real con las propiedades mecánicas de cada tablón concreto", "Que el tablón más pesado es siempre el de peor calidad para la fabricación de la mesa prevista"], "Una diferencia de peso perceptible entre dos tablones de aspecto similar puede indicar una densidad distinta, lo que puede traducirse en un comportamiento mecánico y una estabilidad dimensional diferentes, aunque procedan de la misma especie de roble."),
    q(S2, "facil", "¿Por qué puede ser útil que el oficial observe los anillos de crecimiento visibles en el canto de cada tablón antes de elegir el más adecuado para la mesa?", ["Porque la anchura y regularidad de los anillos aporta información sobre el crecimiento del árbol y puede relacionarse con la densidad y estabilidad de la madera obtenida", "Porque los anillos de crecimiento no aportan ninguna información relevante para la elección de un tablón destinado a una mesa maciza", "Porque solo es relevante observar los anillos de crecimiento en maderas de coníferas, sin ninguna relevancia en una madera de roble como esta", "Porque los anillos de crecimiento determinan exclusivamente el color final de la madera, sin ninguna relación con su densidad o estabilidad"], "Observar la anchura y regularidad de los anillos de crecimiento aporta información sobre el crecimiento del árbol, que puede relacionarse con la densidad y la estabilidad de la madera obtenida en cada tablón."),
    q(S3, "media", "¿Qué debe comprobar el oficial en el conjunto de los tablones disponibles, más allá de examinarlos de forma completamente aislada uno a uno?", ["Si existe suficiente cantidad de material sin defectos graves para completar la tapa de la mesa con un aspecto homogéneo, combinando piezas de características similares", "Basta con examinar un único tablón al azar, sin ninguna comparación con el resto de piezas disponibles para la fabricación de la mesa", "Ninguna comprobación adicional es necesaria si el primer tablón examinado presenta un aspecto visualmente adecuado para la mesa prevista", "Únicamente el precio conjunto de todos los tablones disponibles, sin ninguna comprobación real sobre sus propiedades o posibles defectos"], "Es importante comprobar si existe suficiente cantidad de material sin defectos graves para completar la tapa con un aspecto homogéneo, combinando piezas de características similares entre los distintos tablones disponibles."),
    q(S1, "media", "¿Qué relación existe entre la resistencia a flexión del roble y su idoneidad para la tapa de una mesa que deberá soportar objetos apoyados sobre ella?", ["Una buena resistencia a flexión permite que la tapa soporte el peso de los objetos apoyados sin deformarse ni romperse, siendo una propiedad relevante para este uso concreto", "La resistencia a flexión del roble no tiene ninguna relación real con la idoneidad de la madera para la tapa de una mesa de uso habitual", "Solo es relevante la resistencia a flexión si la mesa se va a emplear como banco de trabajo industrial, sin ninguna relevancia en un uso doméstico habitual", "La resistencia a flexión del roble depende exclusivamente del acabado superficial aplicado, sin ninguna relación con las propiedades naturales de la madera"], "Una buena resistencia a flexión permite que la tapa de la mesa soporte el peso de los objetos apoyados sin deformarse ni romperse, siendo una propiedad mecánica relevante para este uso concreto de la pieza."),
    q(S3, "dificil", "Si, tras montar la mesa con los tablones seleccionados, aparece con el tiempo una ligera curvatura en la tapa pese a haber descartado los defectos más evidentes en su momento, ¿qué debería considerar el oficial como posible causa?", ["Que la humedad de la madera en el momento del montaje pudiera no haber estado suficientemente estabilizada, provocando un movimiento posterior pese a la ausencia de defectos visibles inicialmente", "Que la curvatura aparecida no tiene ninguna relación posible con el contenido de humedad de la madera en el momento del montaje de la mesa", "Que la curvatura solo puede deberse a un defecto de fabricación del propio mueble, sin ninguna relación con las propiedades naturales de la madera empleada", "Que debe sustituirse directamente toda la tapa de la mesa sin plantearse ninguna causa concreta de la curvatura aparecida con el tiempo"], "Una posible causa de esa curvatura posterior es que la humedad de la madera en el momento del montaje no estuviera suficientemente estabilizada, provocando un movimiento dimensional pese a la ausencia de defectos visibles en el momento de la selección de los tablones."),
  ].map(([seccion, dificultad, enunciado, opciones, explicacion]) => ({ seccion, dificultad, enunciado, opciones, explicacion })),
});
function q(seccion, dificultad, enunciado, opciones, explicacion) { return [seccion, dificultad, enunciado, opciones, explicacion]; }

console.log(`\n🔗 Vinculando ${TEMA} como Tema 5 (numero=7) de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 7, orden: 7, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");

console.log("\n✅ tema-108 creado y vinculado como Tema 5 de Oficial Carpintero.");
