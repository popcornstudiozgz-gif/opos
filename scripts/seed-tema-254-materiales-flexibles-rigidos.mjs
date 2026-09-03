/**
 * Crea tema-254: "Materiales flexibles y rígidos de impresión empleados
 * en Artes Gráficas" — Tema 10 (numero=10, bloque-2) de Oficial Pintor,
 * Especialidad Gráfica (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 8 oficial del Anexo I (bases2110.pdf, línea
 * 1506): "Materiales flexibles y rígidos de impresión empleados en
 * Artes Gráficas. Poliéster. Fichas Técnicas. Adhesivos. Métodos de
 * Aplicación. Normativa."
 *
 * Normativa: Reglamento CLP (DOUE-L-2008-82637), ya citado en el
 * tema-253, de aplicación a los adhesivos de estos materiales. El resto
 * (tipos y usos de cada material) es conocimiento técnico consolidado
 * del oficio.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-254-materiales-flexibles-rigidos.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-254";
const OPOSICION = "oficial-pintor-grafica-ayto-zaragoza";
const BLOQUE_2_ID = "1e5d5916-cf4a-4920-9175-579f18034ad6";

const REGLAMENTO_CLP = "https://www.boe.es/buscar/doc.php?id=DOUE-L-2008-82637";

async function insertar(tabla, filas) {
  const res = await fetch(`${URL_BASE}/rest/v1/${tabla}`, { method: "POST", headers: { ...HEADERS, Prefer: "return=representation" }, body: JSON.stringify(filas) });
  if (!res.ok) { console.error(`❌ Error en ${tabla}: ${res.status} ${await res.text()}`); process.exit(1); }
  return res.json();
}
async function upsert(tabla, filas, onConflict) {
  const res = await fetch(`${URL_BASE}/rest/v1/${tabla}?on_conflict=${onConflict}`, { method: "POST", headers: { ...HEADERS, Prefer: "resolution=merge-duplicates,return=representation" }, body: JSON.stringify(filas) });
  if (!res.ok) { console.error(`❌ Error en ${tabla}: ${res.status} ${await res.text()}`); process.exit(1); }
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

console.log(`📚 Creando ${TEMA}...`);
await insertar("temas", [{
  slug: TEMA,
  titulo: "Materiales flexibles y rígidos de impresión",
  descripcion: "Materiales flexibles de impresión: lona, poliéster. Materiales rígidos: metacrilato, PVC expandido, dibond. Fichas técnicas, adhesivos y métodos de aplicación de cada material.",
  contenido: "Desarrolla los materiales flexibles y rígidos empleados como soporte de impresión en artes gráficas: los materiales flexibles (lona, poliéster, vinilo laminado) empleados en banderolas, pancartas y expositores; los materiales rígidos (metacrilato, PVC expandido, dibond, cartón pluma) empleados en carteles, paneles y señalización; las fichas técnicas de cada material, con sus características de peso, espesor y resistencia; y los adhesivos y métodos de fijación adecuados a cada combinación de material flexible o rígido con su soporte final.",
  enlaces_boe: [
    { url: REGLAMENTO_CLP, titulo: "Reglamento (CE) 1272/2008 (CLP) — clasificación, etiquetado y envasado" },
  ],
  indice_estudio: [
    { url: "", titulo: "Materiales flexibles de impresión: lona y poliéster", seccion: "materiales-flexibles-lona-poliester", articulos: "Conocimiento técnico del oficio" },
    { url: "", titulo: "Materiales rígidos de impresión", seccion: "materiales-rigidos-impresion", articulos: "Conocimiento técnico del oficio" },
    { url: REGLAMENTO_CLP, titulo: "Fichas técnicas, adhesivos y métodos de aplicación", seccion: "fichas-tecnicas-adhesivos-metodos-aplicacion", articulos: "Reglamento CLP" },
  ],
}]);

const S1 = "materiales-flexibles-lona-poliester";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es una lona publicitaria, como material flexible de impresión?", reverso: "Un material textil recubierto de PVC, flexible y resistente a la intemperie, empleado habitualmente en banderolas, pancartas de gran formato y vallas publicitarias, que puede imprimirse directamente y suele reforzarse en los bordes con ojales metálicos para su fijación" },
  { anverso: "¿Qué es el poliéster, como material flexible de impresión gráfica?", reverso: "Un material sintético en forma de lámina fina y flexible, empleado como soporte de impresión para banderolas ligeras, adhesivos especiales o retroiluminados, valorado por su buena estabilidad dimensional y su compatibilidad con distintos sistemas de impresión digital" },
  { anverso: "¿Qué diferencia principal existe entre una lona y una lámina de poliéster como soporte de impresión?", reverso: "La lona ofrece mayor robustez y resistencia mecánica frente a la intemperie, adecuada para banderolas exteriores de gran tamaño; el poliéster resulta más ligero y de menor espesor, adecuado para aplicaciones donde se requiere flexibilidad y un acabado más fino" },
  { anverso: "¿Qué es un ojal metálico, elemento habitual en el acabado de una lona publicitaria?", reverso: "Un refuerzo circular metálico o plástico, insertado en el borde de la lona a intervalos regulares, que permite pasar una cuerda o un mosquetón para fijar la lona a una estructura sin que el material se rasgue por el punto de sujeción" },
  { anverso: "¿Qué precaución debe adoptarse al elegir el material flexible (lona o poliéster) según el uso final previsto, exterior o interior?", reverso: "Verificar en la ficha técnica del fabricante la resistencia a la intemperie, a los rayos UV y la vida útil estimada del material, dado que un material pensado para interior puede degradarse con rapidez si se emplea en exterior sin la protección adecuada" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es una lona publicitaria?", explicacion: "Un material textil recubierto de PVC, flexible y resistente a la intemperie.", dificultad: "facil", opciones: ["Un material textil recubierto de PVC resistente a la intemperie", "Un material rígido empleado en carteles de interior", "Un tipo de vinilo de corte de color uniforme", "Un adhesivo específico para fijar carteles"], correcta: 0 },
  { enunciado: "¿Qué es el poliéster como material flexible de impresión gráfica?", explicacion: "Un material sintético en lámina fina y flexible, con buena estabilidad dimensional.", dificultad: "media", opciones: ["Un material sintético fino y flexible de buena estabilidad", "Un material exclusivamente rígido para señalización", "Un tipo de adhesivo empleado en la fijación de carteles", "Un tipo de laminado exclusivo de protección solar"], correcta: 0 },
  { enunciado: "¿Qué diferencia principal existe entre una lona y una lámina de poliéster?", explicacion: "La lona ofrece mayor robustez exterior; el poliéster es más ligero y de menor espesor.", dificultad: "media", opciones: ["La lona es más robusta; el poliéster, más ligero", "Ambos materiales son exactamente equivalentes", "El poliéster siempre resulta más resistente que la lona", "La lona nunca resulta adecuada para exteriores"], correcta: 0 },
  { enunciado: "¿Qué es un ojal metálico en el acabado de una lona?", explicacion: "Un refuerzo en el borde que permite pasar una cuerda o mosquetón sin rasgar el material.", dificultad: "media", opciones: ["Un refuerzo que permite fijar la lona sin rasgarla", "Un tipo de adhesivo empleado en la impresión de la lona", "Un tipo de laminado protector de la lona impresa", "Un accesorio exclusivo del plotter de corte"], correcta: 0 },
  { enunciado: "¿Qué debe verificarse al elegir entre lona y poliéster según el uso exterior o interior?", explicacion: "La resistencia a la intemperie y rayos UV, y la vida útil estimada, en la ficha técnica.", dificultad: "dificil", opciones: ["La resistencia a la intemperie y la vida útil en la ficha técnica", "El material elegido nunca influye en su durabilidad", "Cualquier material resulta igualmente adecuado en cualquier uso", "Solo resulta relevante el color del material elegido"], correcta: 0 },
]);

const S2 = "materiales-rigidos-impresion";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es el metacrilato, como material rígido de impresión y señalización?", reverso: "Un plástico rígido y transparente (o translúcido), de buena resistencia a la intemperie y a los rayos UV, empleado en carteles, expositores y elementos de señalización que requieren transparencia o un acabado de aspecto más premium que otros materiales rígidos" },
  { anverso: "¿Qué es el PVC expandido (o forex), material rígido muy habitual en cartelería?", reverso: "Una plancha rígida y ligera de PVC celular, de superficie lisa apta para imprimir directamente o para aplicar un vinilo, empleada habitualmente en carteles de interior y en señalización de coste moderado por su buena relación calidad-precio" },
  { anverso: "¿Qué es un panel dibond (compuesto de aluminio), ya introducido en un tema anterior de este bloque?", reverso: "Un panel formado por dos láminas finas de aluminio con un núcleo intermedio de polietileno, ligero, rígido y de elevada resistencia a la intemperie, empleado en señalización exterior y paneles informativos de mayor exigencia que el PVC expandido" },
  { anverso: "¿Qué es el cartón pluma, material rígido de menor coste y menor resistencia que los anteriores?", reverso: "Un panel ligero formado por dos láminas de cartón con un núcleo interior de espuma de poliestireno, empleado en trabajos de interior de carácter temporal o de bajo coste (paneles expositivos puntuales, maquetas), pero de escasa resistencia a la humedad y al uso prolongado" },
  { anverso: "¿Qué criterio debería seguir el Oficial Pintor Especialidad Gráfica al elegir entre PVC expandido, dibond o cartón pluma para un trabajo concreto?", reverso: "Valorar la ubicación (interior o exterior), la duración prevista del trabajo, la exigencia de resistencia mecánica y a la intemperie, y el presupuesto disponible, dado que cada material ofrece un equilibrio distinto entre coste y prestaciones" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es el metacrilato como material rígido de impresión?", explicacion: "Un plástico rígido y transparente de buena resistencia a la intemperie y rayos UV.", dificultad: "facil", opciones: ["Un plástico rígido y transparente resistente a la intemperie", "Un panel ligero de cartón con núcleo de espuma", "Un material flexible empleado en banderolas exteriores", "Un tipo de vinilo de corte de color uniforme"], correcta: 0 },
  { enunciado: "¿Qué es el PVC expandido o forex?", explicacion: "Una plancha rígida y ligera de PVC celular, apta para imprimir o aplicar vinilo.", dificultad: "media", opciones: ["Una plancha rígida y ligera de PVC celular", "Un panel de aluminio con núcleo de polietileno", "Un material textil recubierto de PVC flexible", "Un tipo de laminado exclusivo de protección solar"], correcta: 0 },
  { enunciado: "¿Qué es un panel dibond?", explicacion: "Un panel de dos láminas de aluminio con núcleo de polietileno, ligero y resistente.", dificultad: "media", opciones: ["Un panel de aluminio con núcleo de polietileno", "Una plancha rígida de PVC celular de bajo coste", "Un panel ligero de cartón con núcleo de espuma", "Un material flexible empleado en banderolas exteriores"], correcta: 0 },
  { enunciado: "¿Qué caracteriza al cartón pluma frente a otros materiales rígidos?", explicacion: "Menor coste y menor resistencia, adecuado para trabajos temporales de interior.", dificultad: "media", opciones: ["Menor coste y resistencia, para trabajos temporales de interior", "Mayor resistencia a la intemperie que el dibond", "Mayor coste que el metacrilato o el dibond", "Siempre resulta adecuado para trabajos de larga duración exterior"], correcta: 0 },
  { enunciado: "¿Qué criterio debería seguir el Oficial al elegir entre PVC expandido, dibond o cartón pluma?", explicacion: "Valorar ubicación, duración, resistencia exigida y presupuesto disponible.", dificultad: "dificil", opciones: ["Valorar ubicación, duración, resistencia y presupuesto", "Elegir siempre el material de mayor coste disponible", "El material elegido nunca influye en el resultado del trabajo", "Elegir exclusivamente según el color disponible del material"], correcta: 0 },
]);

const S3 = "fichas-tecnicas-adhesivos-metodos-aplicacion";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué información básica debería recoger la ficha técnica de un material rígido o flexible antes de emplearlo en un trabajo concreto?", reverso: "El espesor y el peso del material, su resistencia a la intemperie y a los rayos UV, la compatibilidad con distintos sistemas de impresión, y las recomendaciones de fijación o adhesivo compatibles con ese material concreto" },
  { anverso: "¿Qué tipo de adhesivo resulta habitual para fijar un vinilo impreso sobre un panel rígido como el dibond o el PVC expandido?", reverso: "Un adhesivo específico de doble cara, en cinta o en spray, formulado para garantizar una adherencia duradera entre el vinilo y la superficie del panel rígido, evitando burbujas o despegues prematuros" },
  { anverso: "¿Qué método de fijación resulta habitual para sujetar un panel rígido de cartelería a una pared o a una estructura de soporte, sin emplear adhesivo directo sobre la impresión?", reverso: "Tornillería con separadores (distanciadores) que mantienen el panel a una distancia de la pared, remaches, o perfiles y sistemas de anclaje específicos según el peso y el tamaño del panel, evitando dañar la superficie impresa" },
  { anverso: "¿Qué precaución debería adoptar el Oficial al aplicar un adhesivo de doble cara sobre un material poroso como el cartón pluma?", reverso: "Verificar que el adhesivo resulta compatible con ese tipo de soporte poroso, dado que algunos adhesivos pueden no ofrecer una adherencia suficiente o pueden deteriorar la superficie del cartón pluma si no están específicamente formulados para ese material" },
  { anverso: "¿Por qué es importante consultar la ficha técnica antes de combinar un material flexible o rígido concreto con un adhesivo o un método de fijación determinado, en lugar de aplicar siempre la misma solución por costumbre?", reverso: "Porque cada combinación de material y adhesivo tiene un comportamiento distinto, y una elección inadecuada puede provocar despegues, burbujas o daños en el material, comprometiendo la durabilidad y el aspecto final del trabajo" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué información básica debería recoger la ficha técnica de un material flexible o rígido?", explicacion: "Espesor, peso, resistencia a la intemperie y recomendaciones de fijación compatibles.", dificultad: "media", opciones: ["Espesor, peso, resistencia y recomendaciones de fijación", "Únicamente el precio de venta del material", "Únicamente el color disponible del material", "Únicamente la marca comercial del fabricante"], correcta: 0 },
  { enunciado: "¿Qué tipo de adhesivo resulta habitual para fijar un vinilo impreso sobre un panel rígido?", explicacion: "Un adhesivo específico de doble cara, en cinta o en spray.", dificultad: "media", opciones: ["Un adhesivo de doble cara, en cinta o en spray", "Un disolvente exclusivo de limpieza de herramientas", "Un tipo de laminado exclusivo de protección solar", "Ningún adhesivo resulta necesario en este tipo de fijación"], correcta: 0 },
  { enunciado: "¿Qué método de fijación resulta habitual para sujetar un panel rígido a una pared sin adhesivo directo?", explicacion: "Tornillería con separadores, remaches o perfiles y sistemas de anclaje específicos.", dificultad: "dificil", opciones: ["Tornillería con separadores, remaches o perfiles de anclaje", "Exclusivamente pegamento líquido aplicado directamente", "Ningún método de fijación distinto del adhesivo resulta posible", "Exclusivamente cinta adhesiva de doble cara sin refuerzo"], correcta: 0 },
  { enunciado: "¿Qué precaución debe adoptarse al aplicar un adhesivo de doble cara sobre un material poroso como el cartón pluma?", explicacion: "Verificar que el adhesivo resulta compatible con ese tipo de soporte poroso.", dificultad: "dificil", opciones: ["Verificar que el adhesivo es compatible con el soporte poroso", "Cualquier adhesivo resulta igualmente válido en cualquier soporte", "El tipo de soporte nunca influye en la elección del adhesivo", "Solo resulta relevante en materiales rígidos no porosos"], correcta: 0 },
  { enunciado: "¿Por qué es importante consultar la ficha técnica antes de combinar un material con un adhesivo determinado?", explicacion: "Cada combinación tiene un comportamiento distinto; una elección inadecuada provoca despegues o daños.", dificultad: "media", opciones: ["Cada combinación tiene un comportamiento distinto y puede fallar", "La combinación de material y adhesivo nunca influye en el resultado", "Siempre resulta indiferente qué adhesivo se emplea en cada material", "Solo resulta relevante en materiales flexibles, nunca en rígidos"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 10 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 10, orden: 10, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-254 creado y vinculado como Tema 10 de Oficial Pintor Gráfica.");
