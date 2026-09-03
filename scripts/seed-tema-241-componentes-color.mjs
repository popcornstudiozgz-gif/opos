/**
 * Crea tema-241: "Componentes del color en pinturas" — Tema 13
 * (numero=13, bloque-2) de Oficial Pintor, Especialidad General (Ayto.
 * Zaragoza).
 *
 * Corresponde al TEMA 11 oficial del Anexo I (bases2110.pdf, línea
 * 1462): "Componentes del color en pinturas. Sistemas de Color.
 * Mezclas. Cartas de Color. Normativa."
 *
 * Conocimiento técnico consolidado del oficio (teoría del color y
 * sistemas de identificación cromática, de naturaleza técnica e
 * industrial —RAL, NCS— sin regulación legal propia en España), sin
 * ley española única que lo regule — búsqueda previa realizada
 * conforme al estándar de sourcing del proyecto: los sistemas de color
 * citados (RAL, NCS) son estándares industriales privados, no normas
 * jurídicas, análogos a otras referencias técnicas ya empleadas en el
 * proyecto (UNE-EN, AITIM).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-241-componentes-color.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-241";
const OPOSICION = "oficial-pintor-general-ayto-zaragoza";
const BLOQUE_2_ID = "77506e2f-f4c6-4512-8bf8-99d0b3bbbafd";

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
  titulo: "Componentes del color en pinturas",
  descripcion: "Los colores primarios, secundarios y terciarios. Sistemas de identificación del color (RAL, NCS). Mezclas de color y cartas de color de referencia.",
  contenido: "Desarrolla los fundamentos del color aplicados al oficio de pintor: los colores primarios, secundarios y terciarios, y las propiedades del color (tono, saturación, luminosidad); los sistemas de identificación y comunicación del color más empleados en el sector (RAL, NCS), que permiten especificar un color de forma inequívoca entre fabricante y cliente; las técnicas de mezcla de color para igualar un tono de referencia; y las cartas de color como herramienta de consulta y de comprobación del acabado final.",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "Los colores primarios, secundarios y terciarios. Propiedades del color", seccion: "colores-primarios-secundarios-terciarios-propiedades", articulos: "Conocimiento técnico del oficio" },
    { url: "", titulo: "Sistemas de identificación del color: RAL y NCS", seccion: "sistemas-color-ral-ncs", articulos: "Conocimiento técnico del oficio" },
    { url: "", titulo: "Mezclas de color y cartas de color", seccion: "mezclas-color-cartas-color", articulos: "Conocimiento técnico del oficio" },
  ],
}]);

const S1 = "colores-primarios-secundarios-terciarios-propiedades";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Cuáles son los colores primarios en la síntesis sustractiva (mezcla de pigmentos), la que aplica al trabajo con pintura?", reverso: "El cian (azul), el magenta (rojo-violeta) y el amarillo, colores que no pueden obtenerse mezclando otros, y a partir de los cuales se generan el resto de colores por mezcla sustractiva de pigmentos" },
  { anverso: "¿Qué es un color secundario?", reverso: "El color obtenido mezclando dos colores primarios en igual proporción: el verde (cian más amarillo), el naranja (magenta más amarillo) y el violeta (cian más magenta)" },
  { anverso: "¿Qué es un color terciario?", reverso: "El color obtenido mezclando un color primario con un color secundario adyacente en el círculo cromático, dando lugar a tonos intermedios como el amarillo-verdoso, el rojo-anaranjado o el azul-violáceo" },
  { anverso: "¿Qué es el tono, como propiedad del color?", reverso: "La cualidad que distingue un color de otro (rojo, azul, verde), determinada por la longitud de onda dominante que refleja o transmite un objeto, y que identificamos habitualmente con el nombre común del color" },
  { anverso: "¿Qué diferencia existe entre la saturación y la luminosidad de un color?", reverso: "La saturación es la pureza o intensidad de un color (cuánto se aleja de un gris del mismo tono); la luminosidad es el grado de claridad u oscuridad de ese color, independientemente de su tono o saturación" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Cuáles son los colores primarios en la mezcla de pigmentos (síntesis sustractiva)?", explicacion: "Cian, magenta y amarillo.", dificultad: "facil", opciones: ["Cian, magenta y amarillo", "Rojo, verde y azul", "Blanco, negro y gris", "Naranja, violeta y verde"], correcta: 0 },
  { enunciado: "¿Qué es un color secundario?", explicacion: "El obtenido mezclando dos colores primarios en igual proporción.", dificultad: "media", opciones: ["El obtenido mezclando dos primarios en igual proporción", "El obtenido mezclando un primario con blanco puro", "El obtenido mezclando un primario con negro puro", "Un color que no puede obtenerse por mezcla alguna"], correcta: 0 },
  { enunciado: "¿Qué es un color terciario?", explicacion: "El obtenido mezclando un primario con un secundario adyacente.", dificultad: "media", opciones: ["El obtenido mezclando un primario con un secundario adyacente", "El obtenido mezclando dos colores terciarios entre sí", "Un color idéntico a un color primario puro", "Un color que solo existe en sistemas digitales de color"], correcta: 0 },
  { enunciado: "¿Qué es el tono, como propiedad del color?", explicacion: "La cualidad que distingue un color de otro, determinada por la longitud de onda dominante.", dificultad: "media", opciones: ["La cualidad que distingue un color de otro", "El grado de claridad u oscuridad de un color", "La pureza o intensidad de un color", "La cantidad de pigmento disuelto en la pintura"], correcta: 0 },
  { enunciado: "¿Qué diferencia existe entre la saturación y la luminosidad de un color?", explicacion: "La saturación es la pureza del color; la luminosidad, su grado de claridad u oscuridad.", dificultad: "dificil", opciones: ["Una es la pureza del color; la otra, su claridad u oscuridad", "Ambos términos son exactamente sinónimos en teoría del color", "La saturación depende exclusivamente de la marca del fabricante", "La luminosidad solo se aplica a colores primarios puros"], correcta: 0 },
]);

const S2 = "sistemas-color-ral-ncs";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es el sistema RAL de identificación del color?", reverso: "Un sistema de clasificación cromática, de origen alemán, muy utilizado en el sector de la pintura y la construcción en Europa, que identifica cada color mediante un código numérico de cuatro cifras (por ejemplo, RAL 9010 blanco puro), permitiendo especificar un color de forma inequívoca" },
  { anverso: "¿Qué es el sistema NCS (Natural Colour System)?", reverso: "Un sistema de identificación del color basado en la percepción visual humana, que describe cada color según su semejanza con los colores elementales (blanco, negro, amarillo, rojo, azul y verde), mediante un código que expresa el grado de negrura, cromaticidad y matiz" },
  { anverso: "¿Por qué es útil trabajar con un sistema de identificación de color como el RAL o el NCS, en lugar de referirse solo al nombre común de un color?", reverso: "Porque el nombre común de un color (\"azul\", \"verde oscuro\") es ambiguo y varía según la percepción de cada persona, mientras que un código RAL o NCS identifica el color de forma exacta y reproducible entre distintos fabricantes, proveedores y personas del equipo" },
  { anverso: "¿Qué es un espectrofotómetro, empleado en ocasiones para verificar el color de una pintura?", reverso: "Un instrumento de medición que analiza la luz reflejada por una superficie pintada y determina su color de forma objetiva y numérica, permitiendo comprobar que coincide con precisión con el código de color de referencia (por ejemplo, un RAL determinado)" },
  { anverso: "¿Qué exige, con carácter general, la Administración municipal cuando especifica un color RAL concreto para el acabado de un elemento del mobiliario urbano o de una instalación pública?", reverso: "Que el Oficial Pintor reproduzca ese color con la mayor fidelidad posible, mezclando o solicitando al fabricante la pintura correspondiente a ese código exacto, dado que ese color forma parte de la identidad visual homogénea del conjunto de instalaciones municipales" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es el sistema RAL de identificación del color?", explicacion: "Un sistema de clasificación cromática que identifica cada color mediante un código numérico.", dificultad: "facil", opciones: ["Un sistema que identifica cada color mediante un código numérico", "Un tipo de pintura epoxi de alta resistencia", "Un aditivo empleado para acelerar el secado", "Un disolvente exclusivo para pinturas al agua"], correcta: 0 },
  { enunciado: "¿En qué se basa el sistema NCS (Natural Colour System)?", explicacion: "En la percepción visual humana y la semejanza con los colores elementales.", dificultad: "media", opciones: ["En la percepción visual humana y los colores elementales", "Exclusivamente en la longitud de onda medida con láser", "Exclusivamente en el precio de mercado del pigmento", "Exclusivamente en el nombre comercial del fabricante"], correcta: 0 },
  { enunciado: "¿Por qué es útil un sistema de identificación como el RAL frente al nombre común de un color?", explicacion: "Identifica el color de forma exacta y reproducible entre distintos fabricantes y personas.", dificultad: "media", opciones: ["Identifica el color de forma exacta y reproducible", "El nombre común siempre resulta más preciso que un código", "Ambos sistemas identifican el color de forma idéntica", "Un código RAL nunca resulta reproducible entre fabricantes"], correcta: 0 },
  { enunciado: "¿Qué es un espectrofotómetro, aplicado a la verificación del color de una pintura?", explicacion: "Un instrumento que mide objetivamente el color de una superficie pintada.", dificultad: "dificil", opciones: ["Un instrumento que mide objetivamente el color de una superficie", "Una herramienta exclusiva para mezclar pigmentos a mano", "Un tipo de pistola de pintar de alta precisión", "Un aditivo que estabiliza el color de una pintura"], correcta: 0 },
  { enunciado: "¿Qué exige la Administración municipal al especificar un color RAL concreto para mobiliario urbano?", explicacion: "Reproducir ese color con la mayor fidelidad posible, conforme a la identidad visual homogénea del conjunto.", dificultad: "media", opciones: ["Reproducir el color con la mayor fidelidad posible", "Ninguna exigencia específica sobre la fidelidad del color", "Emplear siempre el color más económico disponible", "Sustituir siempre el RAL por un color aproximado a ojo"], correcta: 0 },
]);

const S3 = "mezclas-color-cartas-color";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es una carta de color?", reverso: "Un documento o muestrario, en papel o formato digital, que presenta una selección de colores disponibles de un fabricante o de un sistema de identificación (RAL, NCS), permitiendo elegir o verificar visualmente un color antes de su aplicación definitiva" },
  { anverso: "¿Qué es un sistema de tintometría (o dosificación automática de color), habitual en los puntos de venta de pintura?", reverso: "Un sistema que, mediante una máquina dosificadora y una fórmula asociada a un código de color, añade automáticamente las cantidades exactas de cada colorante concentrado a una base de pintura neutra, reproduciendo con precisión el color solicitado (por ejemplo, un RAL concreto)" },
  { anverso: "¿Qué precaución debe adoptar el Oficial Pintor al mezclar manualmente varios botes de la misma pintura y color para un trabajo de gran superficie?", reverso: "Homogeneizar previamente todos los botes en un recipiente común (técnica conocida como \"boxing\"), evitando pequeñas variaciones de tono entre distintos lotes de fabricación que podrían resultar visibles si cada bote se aplicara por separado sin mezclar" },
  { anverso: "¿Por qué puede variar ligeramente el color final aplicado respecto al que muestra la carta de color impresa?", reverso: "Porque el proceso de impresión de la carta puede introducir pequeñas variaciones cromáticas respecto al color real del producto, y porque el aspecto final también depende del soporte, del brillo de acabado, del método de aplicación y de las condiciones de iluminación en que se observe" },
  { anverso: "¿Qué es una \"prueba de color\" o muestra aplicada, recomendable antes de pintar una gran superficie con un color nuevo?", reverso: "La aplicación previa del producto sobre una pequeña zona representativa (o sobre una probeta), dejándola secar por completo, para comprobar el color, el brillo y el acabado reales antes de comprometer toda la superficie del trabajo" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es una carta de color?", explicacion: "Un muestrario que presenta los colores disponibles de un fabricante o sistema de identificación.", dificultad: "facil", opciones: ["Un muestrario de los colores disponibles de un fabricante", "Un documento exclusivo con el precio de cada color", "Un instrumento de medición óptica del color", "Un tipo de resina empleada en pavimentos"], correcta: 0 },
  { enunciado: "¿Qué es un sistema de tintometría?", explicacion: "Un sistema que dosifica automáticamente colorantes concentrados en una base neutra según una fórmula.", dificultad: "media", opciones: ["Un sistema que dosifica automáticamente colorantes en una base neutra", "Un instrumento manual de mezcla de pigmentos", "Un tipo de disolvente exclusivo de pinturas al agua", "Un aditivo que aumenta la viscosidad de la pintura"], correcta: 0 },
  { enunciado: "¿Qué precaución debe adoptarse al mezclar varios botes de la misma pintura para una gran superficie?", explicacion: "Homogeneizarlos en un recipiente común (boxing) para evitar variaciones de tono entre lotes.", dificultad: "dificil", opciones: ["Homogeneizarlos en un recipiente común antes de aplicar", "Aplicar cada bote por separado sin ninguna mezcla previa", "Ninguna precaución adicional distinta de agitar cada bote", "Solo resulta relevante si los botes son de distinta marca"], correcta: 0 },
  { enunciado: "¿Por qué puede variar el color final aplicado respecto al mostrado en una carta de color impresa?", explicacion: "El proceso de impresión y factores como el soporte, el brillo o la iluminación influyen en el resultado.", dificultad: "media", opciones: ["La impresión y factores del soporte o iluminación influyen en el resultado", "El color aplicado siempre coincide exactamente con la carta", "La carta de color nunca puede diferir del resultado final", "Solo varía si se emplea una pistola de pintar"], correcta: 0 },
  { enunciado: "¿Qué es recomendable hacer antes de pintar una gran superficie con un color nuevo?", explicacion: "Aplicar una prueba de color sobre una zona representativa y comprobar el resultado ya seco.", dificultad: "media", opciones: ["Aplicar una prueba de color sobre una zona representativa", "Pintar directamente toda la superficie sin ninguna prueba previa", "Confiar exclusivamente en la carta de color impresa", "Ninguna comprobación adicional resulta necesaria en la práctica"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 13 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 13, orden: 13, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-241 creado y vinculado como Tema 13 de Oficial Pintor General.");
