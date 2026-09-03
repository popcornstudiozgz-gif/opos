/**
 * Crea tema-233: "Motores diésel en maquinaria de obras" — Tema 21
 * (numero=21, bloque-2) de Oficial Conductor, Especialidad Maquinaria
 * Pesada (Ayto. de Zaragoza).
 *
 * Corresponde al TEMA 19 oficial del Anexo I (bases2110.pdf, línea
 * 2181): "Motores diésel en excavadoras, palas cargadoras y mini
 * excavadoras. Motores térmicos, componentes y funcionamiento. Sistemas
 * hidráulicos. Transmisiones mecánicas e hidráulicas. Refrigeración de
 * motores. Combustibles y circuitos de combustible. Frenos de disco y
 * tambor. Circuitos eléctricos. Neumáticos. Cadenas. Cabina."
 *
 * Normativa verificada mediante WebSearch en esta sesión:
 * - Reglamento (UE) 2016/1628 del Parlamento Europeo y del Consejo, de
 *   14 de septiembre de 2016, sobre los límites de emisiones de gases y
 *   partículas contaminantes y la homologación de tipo para los motores
 *   de combustión interna que se instalen en las máquinas móviles no de
 *   carretera (NRMM) — por el que se deroga la Directiva 97/68/CE.
 * El resto (componentes y funcionamiento del motor, sistemas
 * hidráulicos, transmisiones, frenos, cadenas) es conocimiento técnico
 * consolidado del oficio, mismo criterio que en Oficial Mecánico (ver
 * scripts/seed-tema-171-*.mjs a seed-tema-186-*.mjs).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-233-motores-diesel-maquinaria.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-233";
const OPOSICION = "oficial-conductor-maquinaria-pesada-ayto-zaragoza";
const BLOQUE_2_ID = "388bfbfc-396e-4de2-8897-09532d6a0bcd";

const REGLAMENTO_UE_2016_1628 = "https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:32016R1628";

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
  titulo: "Motores diésel en maquinaria de obras",
  descripcion: "El motor diésel de la maquinaria de obras: componentes, funcionamiento y sistemas hidráulicos. Transmisiones, refrigeración, combustible y frenos. Circuitos eléctricos, neumáticos, cadenas y cabina.",
  contenido: "Desarrolla el motor diésel característico de excavadoras, palas cargadoras y mini-excavadoras, y el resto de sistemas mecánicos de la máquina: los motores térmicos, sus componentes y funcionamiento, y los sistemas hidráulicos que accionan el equipo de trabajo; las transmisiones mecánicas e hidráulicas, la refrigeración del motor, y los combustibles y circuitos de combustible, con referencia a la normativa europea de emisiones para maquinaria móvil no de carretera (Reglamento UE 2016/1628); y los frenos de disco y tambor, los circuitos eléctricos, los neumáticos y las cadenas del tren de rodaje, junto con la cabina de la máquina.",
  enlaces_boe: [
    { url: REGLAMENTO_UE_2016_1628, titulo: "Reglamento (UE) 2016/1628 — emisiones de motores de maquinaria móvil no de carretera (NRMM)" },
  ],
  indice_estudio: [
    { url: REGLAMENTO_UE_2016_1628, titulo: "El motor diésel: componentes, funcionamiento y sistemas hidráulicos", seccion: "motor-diesel-componentes-funcionamiento-hidraulico", articulos: "Reglamento UE 2016/1628" },
    { url: "", titulo: "Transmisiones, refrigeración, combustible y frenos", seccion: "transmisiones-refrigeracion-combustible-frenos", articulos: "Conocimiento técnico del oficio" },
    { url: "", titulo: "Circuitos eléctricos, neumáticos, cadenas y cabina", seccion: "circuitos-electricos-neumaticos-cadenas-cabina", articulos: "Conocimiento técnico del oficio" },
  ],
}]);

const S1 = "motor-diesel-componentes-funcionamiento-hidraulico";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un motor térmico, en el sentido general aplicado a la maquinaria de obras?", reverso: "Un motor que transforma la energía química de un combustible en energía mecánica mediante un proceso de combustión, siendo el motor diésel de ciclo de cuatro tiempos el tipo predominante en excavadoras, palas cargadoras y mini-excavadoras" },
  { anverso: "¿Cuál es la diferencia esencial entre el ciclo del motor diésel y el del motor de gasolina (ciclo Otto)?", reverso: "En el motor diésel el combustible se inyecta directamente en la cámara de combustión y se autoinflama por la elevada temperatura del aire fuertemente comprimido, sin necesidad de bujía de encendido, a diferencia del motor de gasolina, que comprime una mezcla aire-combustible que se enciende mediante una chispa" },
  { anverso: "¿Qué ventaja principal ofrece el motor diésel frente al de gasolina para su uso en maquinaria pesada?", reverso: "Un mayor par motor a bajas revoluciones y una mayor eficiencia en el consumo de combustible, características especialmente adecuadas para el trabajo continuado a baja velocidad y con grandes esfuerzos que exige la maquinaria de obra pública" },
  { anverso: "¿Qué regula el Reglamento (UE) 2016/1628 en relación con los motores instalados en maquinaria como excavadoras o palas cargadoras?", reverso: "Los límites de emisiones de gases y partículas contaminantes y los requisitos de homologación de tipo para los motores de combustión interna instalados en máquinas móviles no de carretera (NRMM), categoría en la que se incluye la maquinaria de movimiento de tierras" },
  { anverso: "¿Qué función cumple el sistema hidráulico de una excavadora o pala cargadora, en relación con el motor diésel?", reverso: "Convertir la energía mecánica generada por el motor, a través de una bomba hidráulica accionada por el propio motor, en energía de presión de un fluido hidráulico, que después se transforma de nuevo en movimiento mecánico en los cilindros y motores hidráulicos que accionan el equipo de trabajo" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es un motor térmico?", explicacion: "Un motor que transforma la energía química de un combustible en energía mecánica mediante combustión.", dificultad: "facil", opciones: ["Un motor que transforma energía química en energía mecánica", "Un motor que funciona exclusivamente con energía eléctrica", "Un sistema exclusivo de refrigeración de la máquina", "Un sistema exclusivo de frenado de la máquina"], correcta: 0 },
  { enunciado: "¿Cuál es la diferencia esencial entre el motor diésel y el de gasolina?", explicacion: "En el diésel el combustible se autoinflama por la temperatura del aire comprimido, sin bujía.", dificultad: "media", opciones: ["El diésel se autoinflama por compresión, sin bujía de encendido", "Ambos motores funcionan exactamente de la misma manera", "El motor de gasolina no requiere ningún tipo de combustible", "El motor diésel siempre carece de sistema de refrigeración"], correcta: 0 },
  { enunciado: "¿Qué ventaja ofrece el motor diésel frente al de gasolina en maquinaria pesada?", explicacion: "Mayor par motor a bajas revoluciones y mayor eficiencia de consumo.", dificultad: "media", opciones: ["Mayor par a bajas revoluciones y mayor eficiencia", "Un funcionamiento silencioso sin ninguna otra ventaja real", "Una menor necesidad de mantenimiento en cualquier circunstancia", "Un menor peso total del conjunto del motor"], correcta: 0 },
  { enunciado: "¿Qué regula el Reglamento (UE) 2016/1628?", explicacion: "Los límites de emisiones y la homologación de motores instalados en máquinas móviles no de carretera.", dificultad: "dificil", opciones: ["Emisiones y homologación de motores en maquinaria no de carretera", "Exclusivamente el régimen de matriculación de vehículos", "Exclusivamente el régimen de infracciones de tráfico", "Exclusivamente los equipos de protección individual"], correcta: 0 },
  { enunciado: "¿Qué función cumple el sistema hidráulico en relación con el motor diésel de una excavadora?", explicacion: "Convertir la energía mecánica del motor en presión hidráulica que mueve el equipo de trabajo.", dificultad: "media", opciones: ["Convertir la energía mecánica en presión hidráulica de trabajo", "Sustituir por completo la función del motor diésel", "Refrigerar exclusivamente el circuito eléctrico de la máquina", "Filtrar exclusivamente el combustible del motor"], correcta: 0 },
]);

const S2 = "transmisiones-refrigeracion-combustible-frenos";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es una transmisión mecánica, en el contexto de la maquinaria de obras?", reverso: "El conjunto de elementos (ejes, engranajes, embrague) que transmite el movimiento del motor a las ruedas o al sistema de propulsión mediante un acoplamiento directo o mecánico, sin la interposición de un fluido como elemento de transmisión de potencia" },
  { anverso: "¿Qué es una transmisión hidrostática, habitual en excavadoras y mini-excavadoras?", reverso: "Un sistema de transmisión en el que el motor acciona una o varias bombas hidráulicas que impulsan un fluido a presión hacia motores hidráulicos situados en las ruedas o en las cadenas, transmitiendo así la potencia sin ningún acoplamiento mecánico directo entre el motor y el elemento de propulsión" },
  { anverso: "¿Qué función cumple el sistema de refrigeración del motor de una máquina pesada?", reverso: "Evacuar el calor generado por la combustión y por el propio funcionamiento mecánico del motor, manteniendo su temperatura dentro de un rango seguro mediante la circulación de un líquido refrigerante a través de un radiador, con la ayuda de un ventilador" },
  { anverso: "¿Qué elementos componen el circuito de combustible de un motor diésel de maquinaria pesada?", reverso: "El depósito de combustible, la bomba de alimentación de baja presión, los filtros de combustible (que retienen impurezas y agua), la bomba de inyección de alta presión, y los inyectores que introducen el combustible pulverizado en la cámara de combustión de cada cilindro" },
  { anverso: "¿Qué diferencia existe entre un freno de disco y un freno de tambor, ambos empleados en distinta maquinaria de obras?", reverso: "El freno de disco actúa mediante unas pinzas que aprietan un disco solidario a la rueda o al eje, disipando mejor el calor generado; el freno de tambor actúa mediante unas zapatas que se expanden contra el interior de un tambor cilíndrico, siendo habitual en frenos de estacionamiento o en maquinaria de menor exigencia" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es una transmisión mecánica en la maquinaria de obras?", explicacion: "El conjunto de ejes, engranajes y embrague que transmite el movimiento de forma directa.", dificultad: "media", opciones: ["El conjunto de ejes y engranajes que transmite el movimiento directo", "Un sistema exclusivo de transmisión mediante fluido a presión", "Un sistema exclusivo de refrigeración del motor", "Un sistema exclusivo de frenado de la máquina"], correcta: 0 },
  { enunciado: "¿Qué es una transmisión hidrostática?", explicacion: "Un sistema donde bombas hidráulicas impulsan fluido hacia motores hidráulicos, sin acoplamiento mecánico directo.", dificultad: "dificil", opciones: ["Un sistema que transmite potencia mediante fluido a presión", "Un sistema de transmisión exclusivamente mecánico y directo", "Un sistema exclusivo de frenado de emergencia", "Un sistema exclusivo de arranque en frío del motor"], correcta: 0 },
  { enunciado: "¿Qué función cumple el sistema de refrigeración del motor?", explicacion: "Evacuar el calor generado, manteniendo la temperatura del motor dentro de un rango seguro.", dificultad: "media", opciones: ["Evacuar el calor y mantener la temperatura en un rango seguro", "Transmitir la potencia del motor a las ruedas de la máquina", "Filtrar el combustible antes de su inyección en el motor", "Frenar la máquina en caso de emergencia"], correcta: 0 },
  { enunciado: "¿Cuál de los siguientes elementos forma parte del circuito de combustible de un motor diésel?", explicacion: "Los inyectores, entre otros elementos del circuito de combustible.", dificultad: "media", opciones: ["Los inyectores", "El radiador de refrigeración", "El disco de freno delantero", "El alternador del circuito eléctrico"], correcta: 0 },
  { enunciado: "¿Qué diferencia existe entre un freno de disco y uno de tambor?", explicacion: "El de disco usa pinzas sobre un disco; el de tambor usa zapatas dentro de un tambor cilíndrico.", dificultad: "dificil", opciones: ["El de disco usa pinzas; el de tambor usa zapatas internas", "Ambos sistemas funcionan exactamente de la misma manera", "El freno de tambor disipa siempre mejor el calor generado", "El freno de disco no existe en maquinaria de obras"], correcta: 0 },
]);

const S3 = "circuitos-electricos-neumaticos-cadenas-cabina";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué elementos básicos componen el circuito eléctrico de una máquina de obra pública?", reverso: "La batería (fuente de energía y arranque), el alternador (que recarga la batería y alimenta el sistema con el motor en marcha), el motor de arranque, y el cableado y los fusibles que protegen y distribuyen la corriente a los distintos sistemas eléctricos y electrónicos de la máquina" },
  { anverso: "¿Qué característica distingue a un neumático de maquinaria de obras (por ejemplo, de una pala cargadora sobre ruedas) frente a uno de un vehículo convencional?", reverso: "Un dibujo de banda de rodadura más robusto y profundo, diseñado para mejorar la tracción en terrenos irregulares o embarrados, y una carcasa reforzada que resiste mejor los cortes y pinchazos propios del entorno de una obra" },
  { anverso: "¿Qué es una cadena de rodaje, en una excavadora o un bulldozer?", reverso: "Un conjunto de eslabones metálicos articulados entre sí, que forman un circuito cerrado alrededor de las ruedas motrices, guía y de los rodillos del tren de rodaje, proporcionando a la máquina tracción y estabilidad sobre terrenos blandos o irregulares donde una rueda neumática perdería agarre" },
  { anverso: "¿Qué comprobación de mantenimiento debe realizarse periódicamente sobre las cadenas de una máquina, además de su tensión?", reverso: "El desgaste de los eslabones, de los pasadores y de las zapatas, así como la presencia de grietas o deformaciones, dado que un desgaste excesivo compromete la tracción y puede provocar la salida de la cadena de su recorrido durante el trabajo" },
  { anverso: "¿Qué elementos de seguridad y confort son característicos de la cabina de una máquina de obra pública moderna?", reverso: "La estructura de protección contra el vuelco (ROPS) y contra la caída de objetos (FOPS), el cinturón de seguridad, un sistema de climatización, retrovisores y, en muchos modelos, cámaras de visión trasera o de zonas muertas para mejorar la visibilidad de la persona operadora" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué función cumple el alternador en el circuito eléctrico de una máquina de obras?", explicacion: "Recargar la batería y alimentar el sistema eléctrico con el motor en marcha.", dificultad: "media", opciones: ["Recargar la batería y alimentar el sistema con el motor en marcha", "Arrancar el motor exclusivamente en frío", "Filtrar el combustible antes de su inyección", "Frenar la máquina en caso de emergencia"], correcta: 0 },
  { enunciado: "¿Qué característica distingue a un neumático de maquinaria de obras frente a uno convencional?", explicacion: "Banda de rodadura más robusta y carcasa reforzada frente a cortes y pinchazos.", dificultad: "media", opciones: ["Banda de rodadura robusta y carcasa reforzada", "Un menor tamaño que el de un vehículo turismo", "Una presión de inflado siempre inferior a la de un turismo", "Ninguna diferencia real frente a un neumático convencional"], correcta: 0 },
  { enunciado: "¿Qué es una cadena de rodaje en una excavadora?", explicacion: "Un conjunto de eslabones articulados que da tracción y estabilidad sobre terrenos irregulares.", dificultad: "facil", opciones: ["Un conjunto de eslabones que da tracción y estabilidad", "Un componente exclusivo del sistema eléctrico de la máquina", "Un componente exclusivo del sistema de frenado de la máquina", "Un accesorio acoplable al brazo de la excavadora"], correcta: 0 },
  { enunciado: "¿Qué debe comprobarse periódicamente en las cadenas de una máquina, además de la tensión?", explicacion: "El desgaste de eslabones, pasadores y zapatas, y la presencia de grietas o deformaciones.", dificultad: "media", opciones: ["El desgaste de eslabones, pasadores y zapatas", "Únicamente el color de las cadenas de la máquina", "Ninguna comprobación adicional distinta de la tensión", "Únicamente la marca comercial del fabricante de las cadenas"], correcta: 0 },
  { enunciado: "¿Qué estructura de protección es característica de la cabina de una máquina de obra pública moderna?", explicacion: "Una estructura ROPS contra el vuelco y FOPS contra la caída de objetos.", dificultad: "media", opciones: ["Una estructura ROPS y FOPS", "Un simple techo de tela protector sin más elementos", "Ningún elemento de protección estructural específico", "Un sistema exclusivo de airbags laterales"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 21 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 21, orden: 21, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-233 creado y vinculado como Tema 21 de Oficial Conductor Maquinaria Pesada.");
