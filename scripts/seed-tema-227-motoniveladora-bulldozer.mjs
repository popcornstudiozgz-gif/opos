/**
 * Crea tema-227: "Moto-niveladoras, bulldozer y angledozer" — Tema 15
 * (numero=15, bloque-2) de Oficial Conductor, Especialidad Maquinaria
 * Pesada (Ayto. de Zaragoza).
 *
 * Corresponde al TEMA 13 oficial del Anexo I (bases2110.pdf, línea
 * 2140): "Moto-niveladoras. Tipos, esquema y funcionamiento. Método de
 * trabajo. Bulldozer y Angledozer. Tipos, esquema y funcionamiento.
 * Método de trabajo."
 *
 * Conocimiento técnico consolidado del oficio, sin ley española única
 * — mismo criterio que en los temas anteriores. Referencia técnica
 * verificada mediante WebSearch en esta sesión: la Nota Técnica de
 * Prevención NTP 1.114 "Niveladora. Seguridad" del INSST (serie
 * NTP 1101-1135, año 2018), específica sobre este tipo de máquina;
 * también NTP 126 ya citada.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-227-motoniveladora-bulldozer.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-227";
const OPOSICION = "oficial-conductor-maquinaria-pesada-ayto-zaragoza";
const BLOQUE_2_ID = "388bfbfc-396e-4de2-8897-09532d6a0bcd";

const NTP_1114 = "https://www.insst.es/documentacion/colecciones-tecnicas/ntp-notas-tecnicas-de-prevencion/32-serie-ntp-numeros-1101-a-1135-ano-2018/ntp-1.114-niveladora.-seguridad";
const NTP_126 = "https://www.insst.es/documentacion/colecciones-tecnicas/ntp-notas-tecnicas-de-prevencion/4-serie-ntp-numeros-121-a-155-ano-1985/ntp-126-maquinas-para-movimiento-de-tierras";

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
  titulo: "Moto-niveladoras, bulldozer y angledozer",
  descripcion: "La motoniveladora: tipos, esquema, funcionamiento y método de trabajo. El bulldozer y el angledozer: tipos, esquema, funcionamiento y método de trabajo.",
  contenido: "Desarrolla dos familias de maquinaria de obra pública distintas de la excavadora y la pala cargadora: la motoniveladora, máquina especializada en el refino y nivelación de superficies mediante su hoja central orientable; y el bulldozer y el angledozer, máquinas de empuje frontal sobre cadenas empleadas para desbroce, extendido de tierras y apertura de accesos, con la particularidad de que el angledozer permite orientar su hoja en ángulo respecto al eje de la máquina. Se incluyen sus tipos, esquema constructivo, funcionamiento y método de trabajo característico, con referencia a la Nota Técnica de Prevención NTP 1.114 del INSST, específica sobre la niveladora.",
  enlaces_boe: [
    { url: NTP_1114, titulo: "INSST — NTP 1.114: Niveladora. Seguridad" },
    { url: NTP_126, titulo: "INSST — NTP 126: Máquinas para movimiento de tierras" },
  ],
  indice_estudio: [
    { url: NTP_1114, titulo: "La motoniveladora: tipos, esquema y funcionamiento", seccion: "motoniveladora-tipos-esquema-funcionamiento", articulos: "NTP 1.114 (INSST)" },
    { url: NTP_1114, titulo: "Método de trabajo de la motoniveladora", seccion: "motoniveladora-metodo-trabajo", articulos: "NTP 1.114 (INSST)" },
    { url: NTP_126, titulo: "El bulldozer y el angledozer: tipos, funcionamiento y método de trabajo", seccion: "bulldozer-angledozer-tipos-funcionamiento-metodo-trabajo", articulos: "NTP 126 (INSST)" },
  ],
}]);

const S1 = "motoniveladora-tipos-esquema-funcionamiento";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es una motoniveladora?", reverso: "Una máquina autopropulsada sobre neumáticos, de chasis alargado y articulado, dotada de una hoja central orientable en planta, en altura y en inclinación (mould-board), diseñada para el refino, nivelación y perfilado de superficies de tierra o de firmes" },
  { anverso: "¿Qué es el chasis articulado de una motoniveladora?", reverso: "La unión entre el bastidor delantero (donde se sitúan los ejes delanteros de dirección) y el bastidor trasero (donde se sitúan el motor y los ejes motrices), que permite plegar la máquina lateralmente para mejorar su maniobrabilidad y el seguimiento de curvas" },
  { anverso: "¿Qué es la hoja o cuchilla (mould-board) de una motoniveladora?", reverso: "El elemento de trabajo principal de la máquina, situado entre los ejes delantero y trasero, que puede girar, inclinarse lateralmente y desplazarse en altura para adaptar el ángulo de ataque y la posición exactos al tipo de labor de nivelación requerida" },
  { anverso: "¿Qué tipos de motoniveladora pueden distinguirse según su sistema de tracción?", reverso: "Motoniveladoras de tracción simple (solo en el eje trasero) y motoniveladoras de tracción total o \"all wheel drive\" (en todos los ejes), estas últimas con mayor capacidad de tracción en terrenos blandos o con pendiente" },
  { anverso: "¿Qué accesorios adicionales puede incorporar una motoniveladora, además de su hoja central?", reverso: "Un escarificador trasero (para aflojar terreno compacto antes de nivelarlo) y, en algunos modelos, una hoja de empuje frontal adicional para labores de desbroce o extendido previo" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es una motoniveladora?", explicacion: "Una máquina con hoja central orientable para el refino y nivelación de superficies.", dificultad: "facil", opciones: ["Una máquina con hoja central orientable para nivelar superficies", "Una máquina exclusiva para la excavación de zanjas profundas", "Una máquina exclusiva para el transporte de materiales", "Una máquina exclusiva para la compactación de firmes"], correcta: 0 },
  { enunciado: "¿Qué es el chasis articulado de una motoniveladora?", explicacion: "La unión entre bastidor delantero y trasero que permite plegar la máquina lateralmente.", dificultad: "media", opciones: ["La unión entre bastidores que permite plegar la máquina", "El sistema exclusivo de frenado de la máquina", "El sistema exclusivo de iluminación nocturna", "El acoplamiento de la hoja al bastidor trasero"], correcta: 0 },
  { enunciado: "¿Qué es la hoja o cuchilla de una motoniveladora?", explicacion: "El elemento de trabajo que gira, se inclina y se desplaza en altura para nivelar.", dificultad: "media", opciones: ["El elemento de trabajo que gira, inclina y desplaza en altura", "El elemento exclusivo de arranque del motor de la máquina", "El elemento exclusivo de dirección de los ejes delanteros", "Un accesorio exclusivo para el transporte de la máquina"], correcta: 0 },
  { enunciado: "¿Qué ventaja ofrece una motoniveladora de tracción total frente a una de tracción simple?", explicacion: "Mayor capacidad de tracción en terrenos blandos o con pendiente.", dificultad: "dificil", opciones: ["Mayor capacidad de tracción en terrenos blandos o con pendiente", "Ninguna ventaja real distinta del coste de adquisición", "Menor precisión en el trabajo de nivelación", "Menor velocidad máxima de desplazamiento"], correcta: 0 },
  { enunciado: "¿Qué accesorio puede incorporar la motoniveladora para aflojar terreno compacto antes de nivelarlo?", explicacion: "Un escarificador trasero.", dificultad: "media", opciones: ["Un escarificador trasero", "Una cuchara bivalva delantera", "Un martillo hidráulico trasero", "Un rodillo compactador delantero"], correcta: 0 },
]);

const S2 = "motoniveladora-metodo-trabajo";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿En qué consiste el método de trabajo básico de una motoniveladora para refinar una superficie?", reverso: "Desplazar la máquina hacia adelante con la hoja orientada e inclinada con el ángulo de ataque adecuado, arrastrando el material sobrante hacia un lateral en pasadas sucesivas y paralelas hasta alcanzar la rasante y el perfil transversal previstos" },
  { anverso: "¿Qué es el ángulo de ataque de la hoja de una motoniveladora?", reverso: "El ángulo que forma la hoja respecto a la dirección de avance de la máquina, que determina la agresividad del corte: un ángulo más cerrado favorece el corte y arrastre del material, mientras que uno más abierto favorece el esparcido" },
  { anverso: "¿Qué es el bombeo o pendiente transversal que debe dar la motoniveladora a un firme o a una explanada?", reverso: "Una ligera inclinación transversal de la superficie acabada (habitualmente entre un 2% y un 4%) que facilita la evacuación del agua de lluvia hacia los laterales, evitando encharcamientos sobre la superficie nivelada" },
  { anverso: "¿Qué precaución debe adoptar la persona operadora al aproximarse con la motoniveladora a un borde de talud o a una zanja abierta?", reverso: "Mantener una distancia de seguridad suficiente respecto al borde, especialmente cuando la hoja trabaja próxima al lateral, dado que la longitud y el peso de la máquina la hacen especialmente sensible a la pérdida de apoyo del terreno" },
  { anverso: "¿Por qué es habitual realizar varias pasadas sucesivas con la motoniveladora en lugar de intentar alcanzar la rasante final en una única pasada?", reverso: "Porque permite un control más preciso del perfil final, reduce el esfuerzo exigido a la máquina en cada pasada, y facilita corregir progresivamente las irregularidades del terreno de partida" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿En qué consiste el método básico de trabajo de una motoniveladora?", explicacion: "Desplazarse arrastrando material con la hoja en pasadas sucesivas hasta alcanzar la rasante.", dificultad: "media", opciones: ["Desplazarse arrastrando material en pasadas sucesivas", "Excavar material mediante el movimiento de un brazo articulado", "Compactar el terreno mediante vibración de un rodillo", "Transportar material a un punto de descarga alejado"], correcta: 0 },
  { enunciado: "¿Qué es el ángulo de ataque de la hoja de una motoniveladora?", explicacion: "El ángulo respecto a la dirección de avance que determina la agresividad del corte.", dificultad: "dificil", opciones: ["El ángulo respecto a la dirección de avance de la máquina", "El ángulo de giro máximo del chasis articulado", "El ángulo de inclinación del asiento de la cabina", "El ángulo de las ruedas delanteras respecto al suelo"], correcta: 0 },
  { enunciado: "¿Qué es el bombeo o pendiente transversal que da la motoniveladora a una superficie?", explicacion: "Una ligera inclinación que facilita la evacuación del agua de lluvia.", dificultad: "media", opciones: ["Una ligera inclinación que facilita la evacuación del agua", "Una elevación puntual en el centro de la calzada sin función real", "Un defecto de nivelación que debe evitarse siempre", "Un ángulo exclusivo para el escarificador trasero"], correcta: 0 },
  { enunciado: "¿Qué precaución debe adoptarse al aproximarse con la motoniveladora a un borde de talud?", explicacion: "Mantener una distancia de seguridad, dado que la máquina es sensible a la pérdida de apoyo.", dificultad: "media", opciones: ["Mantener una distancia de seguridad respecto al borde", "Aproximarse al máximo para mejorar la precisión del refino", "No existe ningún riesgo adicional junto a un talud", "Aumentar la velocidad de avance junto al borde del talud"], correcta: 0 },
  { enunciado: "¿Por qué es habitual realizar varias pasadas sucesivas en lugar de una única pasada final?", explicacion: "Permite un control más preciso del perfil y reduce el esfuerzo exigido a la máquina.", dificultad: "dificil", opciones: ["Permite un control más preciso y reduce el esfuerzo de la máquina", "No aporta ninguna ventaja frente a una única pasada", "Solo se realiza así en superficies de gran longitud", "Solo resulta necesario si el terreno es completamente llano"], correcta: 0 },
]);

const S3 = "bulldozer-angledozer-tipos-funcionamiento-metodo-trabajo";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un bulldozer (o topadora)?", reverso: "Una máquina autopropulsada sobre cadenas (o, en algunos modelos, sobre neumáticos), dotada de una hoja frontal rígida y perpendicular al eje de la máquina, empleada para empujar y desplazar grandes volúmenes de material, desbrozar terreno o abrir accesos" },
  { anverso: "¿Qué es un angledozer?", reverso: "Una variante del bulldozer cuya hoja frontal puede orientarse en ángulo (girar en planta) respecto al eje longitudinal de la máquina, lo que permite desplazar el material lateralmente durante el propio avance, en lugar de empujarlo únicamente hacia adelante" },
  { anverso: "¿Qué ventaja ofrece el angledozer frente al bulldozer de hoja fija en trabajos de apertura de pistas o zanjeo lateral?", reverso: "Permite proyectar el material excavado o desplazado hacia uno de los laterales de la máquina mientras avanza, sin necesidad de maniobras adicionales de giro, resultando especialmente útil para abrir pistas en ladera o para el relleno lateral de zanjas" },
  { anverso: "¿En qué consiste el método de trabajo básico de un bulldozer para el extendido de material?", reverso: "Avanzar con la hoja bajada empujando el material acumulado por delante, en pasadas sucesivas, retirando la hoja al final de cada pasada y retrocediendo para iniciar una nueva pasada paralela, hasta conseguir el extendido y la nivelación previstos" },
  { anverso: "¿Qué riesgo específico presenta el trabajo con bulldozer en terreno con pendiente pronunciada?", reverso: "El riesgo de deslizamiento o vuelco de la máquina, especialmente al trabajar transversalmente a la pendiente o al descender con la hoja cargada, por lo que debe evitarse operar por encima del ángulo máximo de pendiente admisible indicado por el fabricante" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es un bulldozer?", explicacion: "Una máquina sobre cadenas con hoja frontal rígida para empujar y desplazar material.", dificultad: "facil", opciones: ["Una máquina con hoja frontal rígida para empujar material", "Una máquina exclusiva para la excavación de zanjas profundas", "Una máquina exclusiva para el transporte de materiales", "Una máquina exclusiva para la nivelación fina de firmes"], correcta: 0 },
  { enunciado: "¿Qué distingue a un angledozer de un bulldozer de hoja fija?", explicacion: "Su hoja puede orientarse en ángulo respecto al eje de la máquina.", dificultad: "media", opciones: ["Su hoja puede orientarse en ángulo respecto al eje de la máquina", "Carece por completo de hoja frontal de trabajo", "Se desplaza exclusivamente sobre neumáticos, nunca sobre cadenas", "No dispone de motor propio, siendo remolcado por otra máquina"], correcta: 0 },
  { enunciado: "¿Qué ventaja ofrece el angledozer en la apertura de pistas en ladera?", explicacion: "Permite proyectar el material hacia un lateral mientras avanza, sin maniobras adicionales.", dificultad: "dificil", opciones: ["Permite proyectar el material hacia un lateral al avanzar", "No ofrece ninguna ventaja real frente al bulldozer de hoja fija", "Solo resulta útil en terreno completamente horizontal", "Solo resulta útil para labores de compactación del terreno"], correcta: 0 },
  { enunciado: "¿En qué consiste el método básico de un bulldozer para el extendido de material?", explicacion: "Avanzar empujando el material en pasadas sucesivas hasta lograr el extendido previsto.", dificultad: "media", opciones: ["Avanzar empujando el material en pasadas sucesivas", "Excavar material mediante el movimiento de un brazo articulado", "Elevar el material mediante un cazo frontal basculante", "Vibrar sobre el terreno para compactarlo progresivamente"], correcta: 0 },
  { enunciado: "¿Qué riesgo específico presenta el trabajo con bulldozer en terreno con pendiente pronunciada?", explicacion: "El riesgo de deslizamiento o vuelco, especialmente al trabajar transversalmente a la pendiente.", dificultad: "dificil", opciones: ["El riesgo de deslizamiento o vuelco de la máquina", "Ningún riesgo adicional distinto del trabajo en terreno llano", "Únicamente el riesgo derivado del ruido del motor", "Únicamente el riesgo de avería del sistema hidráulico"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 15 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 15, orden: 15, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-227 creado y vinculado como Tema 15 de Oficial Conductor Maquinaria Pesada.");
