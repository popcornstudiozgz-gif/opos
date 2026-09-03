/**
 * Crea tema-226: "Mini-excavadoras" — Tema 14 (numero=14, bloque-2) de
 * Oficial Conductor, Especialidad Maquinaria Pesada (Ayto. de Zaragoza).
 *
 * Corresponde al TEMA 12 oficial del Anexo I (bases2110.pdf, línea
 * 2136): "Mini - excavadoras. Tipos, esquema y funcionamiento. Método
 * de trabajo."
 *
 * Conocimiento técnico consolidado del oficio, sin ley española única
 * — mismo criterio que en los temas anteriores de esta oposición.
 * Referencia técnica: NTP 126 (INSST) y RD 1644/2008 (marcado CE), ya
 * citados en temas previos.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-226-mini-excavadoras.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-226";
const OPOSICION = "oficial-conductor-maquinaria-pesada-ayto-zaragoza";
const BLOQUE_2_ID = "388bfbfc-396e-4de2-8897-09532d6a0bcd";

const NTP_126 = "https://www.insst.es/documentacion/colecciones-tecnicas/ntp-notas-tecnicas-de-prevencion/4-serie-ntp-numeros-121-a-155-ano-1985/ntp-126-maquinas-para-movimiento-de-tierras";
const RD_1644_2008 = "https://www.boe.es/buscar/act.php?id=BOE-A-2008-16387";

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
  titulo: "Mini-excavadoras",
  descripcion: "Tipos de mini-excavadoras, esquema y funcionamiento. Método de trabajo. Seguridad y mantenimiento básico de la máquina.",
  contenido: "Desarrolla la mini-excavadora como máquina de movimiento de tierras de reducidas dimensiones: sus tipos según el sistema de rodaje y el tamaño, su esquema constructivo y funcionamiento, similar en lo esencial al de una excavadora convencional pero adaptado a espacios reducidos; su método de trabajo, especialmente indicado para obras urbanas de espacio limitado (zanjas de pequeña sección, interiores de solares, jardines); y las particularidades de seguridad y mantenimiento básico propias de este tipo de máquina.",
  enlaces_boe: [
    { url: NTP_126, titulo: "INSST — NTP 126: Máquinas para movimiento de tierras" },
    { url: RD_1644_2008, titulo: "RD 1644/2008 — comercialización y puesta en servicio de las máquinas" },
  ],
  indice_estudio: [
    { url: NTP_126, titulo: "Tipos, esquema y funcionamiento de la mini-excavadora", seccion: "mini-excavadoras-tipos-esquema-funcionamiento", articulos: "Conocimiento técnico del oficio" },
    { url: NTP_126, titulo: "Método de trabajo de la mini-excavadora", seccion: "mini-excavadoras-metodo-trabajo", articulos: "Conocimiento técnico del oficio" },
    { url: RD_1644_2008, titulo: "Seguridad y mantenimiento básico de la mini-excavadora", seccion: "mini-excavadoras-seguridad-mantenimiento-basico", articulos: "RD 1644/2008" },
  ],
}]);

const S1 = "mini-excavadoras-tipos-esquema-funcionamiento";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es una mini-excavadora?", reverso: "Una excavadora de pequeñas dimensiones, habitualmente de un peso operativo inferior a las 6-7 toneladas, con superestructura giratoria (360° o casi 360°) y equipo de pluma, brazo y cazo, diseñada para trabajar en espacios reducidos donde una excavadora convencional no puede maniobrar" },
  { anverso: "¿Qué tipos de mini-excavadora existen según su sistema de rodaje?", reverso: "Mini-excavadoras de cadenas de caucho o de acero (las más habituales, por su mejor tracción y menor daño al pavimento) y mini-excavadoras sobre ruedas, de uso más limitado por su menor estabilidad en terreno irregular" },
  { anverso: "¿Qué característica distingue a una mini-excavadora de \"cero radio de giro\" (zero tail swing)?", reverso: "Que la parte trasera de su superestructura no sobresale del ancho del tren de rodaje al girar, lo que permite operar con total seguridad junto a paredes, vallas u otros obstáculos en espacios muy confinados" },
  { anverso: "¿Qué componentes básicos comparte la mini-excavadora con una excavadora convencional de mayor tamaño?", reverso: "El tren de rodaje, la superestructura giratoria con cabina y motor, y el equipo de trabajo formado por pluma, brazo y cazo, accionado mediante un sistema hidráulico, si bien todos ellos a escala reducida" },
  { anverso: "¿Qué ventaja ofrece una mini-excavadora frente a una excavadora convencional en obras urbanas de pequeña envergadura?", reverso: "Su reducido tamaño y peso le permiten acceder a espacios estrechos (patios, interiores de solares, aceras), causar un menor impacto sobre pavimentos y jardines existentes, y transportarse con mayor facilidad mediante un remolque ligero" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es una mini-excavadora?", explicacion: "Una excavadora de pequeñas dimensiones para trabajar en espacios reducidos.", dificultad: "facil", opciones: ["Una excavadora de pequeñas dimensiones para espacios reducidos", "Una excavadora exclusiva para trabajos en gran profundidad", "Un tipo de pala cargadora de gran tamaño", "Un tipo de camión específico para movimiento de tierras"], correcta: 0 },
  { enunciado: "¿Qué tipo de rodaje es el más habitual en una mini-excavadora?", explicacion: "Cadenas de caucho o de acero, por su mejor tracción.", dificultad: "media", opciones: ["Cadenas de caucho o de acero", "Ruedas neumáticas exclusivamente", "Patines deslizantes sin rodaje propio", "Raíles fijos instalados en la propia obra"], correcta: 0 },
  { enunciado: "¿Qué caracteriza a una mini-excavadora de \"cero radio de giro\"?", explicacion: "La superestructura no sobresale del ancho del tren de rodaje al girar.", dificultad: "dificil", opciones: ["La superestructura no sobresale del tren de rodaje al girar", "Carece por completo de superestructura giratoria", "Solo puede girar en un único sentido de giro", "No dispone de cazo como equipo de trabajo"], correcta: 0 },
  { enunciado: "¿Qué componentes básicos comparte la mini-excavadora con una excavadora convencional?", explicacion: "Tren de rodaje, superestructura giratoria y equipo de pluma-brazo-cazo.", dificultad: "media", opciones: ["Tren de rodaje, superestructura giratoria y equipo pluma-brazo-cazo", "Únicamente el sistema de iluminación de la cabina", "Únicamente el sistema de frenado de estacionamiento", "Ningún componente común entre ambos tipos de máquina"], correcta: 0 },
  { enunciado: "¿Qué ventaja ofrece la mini-excavadora en obras urbanas de pequeña envergadura?", explicacion: "Acceso a espacios estrechos, menor impacto y mayor facilidad de transporte.", dificultad: "media", opciones: ["Acceso a espacios estrechos y menor impacto sobre el entorno", "Mayor capacidad de excavación que cualquier excavadora convencional", "Mayor velocidad de desplazamiento por carretera", "Mayor autonomía de combustible que una excavadora convencional"], correcta: 0 },
]);

const S2 = "mini-excavadoras-metodo-trabajo";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿En qué tipo de trabajos resulta especialmente adecuada la mini-excavadora?", reverso: "En zanjas de pequeña sección para acometidas o canalizaciones, trabajos de jardinería y ajardinamiento, demoliciones parciales de interior, y cualquier excavación en espacios confinados o de difícil acceso para maquinaria de mayor tamaño" },
  { anverso: "¿Qué es un brazo desplazable lateralmente (offset boom), habitual en muchas mini-excavadoras?", reverso: "Un sistema que permite desplazar el brazo de excavación lateralmente respecto al eje de la máquina sin necesidad de girar la torreta, facilitando excavar junto a un muro o una fachada mientras las cadenas permanecen paralelas a dicho elemento" },
  { anverso: "¿Qué ventaja ofrece el brazo desplazable lateralmente al excavar junto a una fachada o un muro?", reverso: "Permite mantener el tren de rodaje alineado y estable junto al elemento, mientras el brazo se desplaza para excavar exactamente junto a la base del muro sin necesidad de girar toda la máquina, mejorando la precisión y reduciendo el riesgo de contacto accidental" },
  { anverso: "¿Qué precaución especial exige el método de trabajo de la mini-excavadora en un espacio muy confinado (por ejemplo, un patio interior)?", reverso: "Planificar previamente la vía de acceso y de salida de la máquina, verificar que existe espacio suficiente para las maniobras de giro necesarias, y mantener una comunicación constante con el personal auxiliar presente en un espacio de trabajo tan reducido" },
  { anverso: "¿Qué papel cumple habitualmente una persona auxiliar (señalista) en los trabajos con mini-excavadora en espacios confinados o junto a instalaciones existentes?", reverso: "Guiar visualmente a la persona operadora en las maniobras donde la visibilidad es limitada, y advertir de la proximidad de servicios enterrados, personas o elementos que puedan quedar fuera del campo de visión desde la cabina" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿En qué tipo de trabajos resulta especialmente adecuada la mini-excavadora?", explicacion: "Zanjas de pequeña sección, jardinería y trabajos en espacios confinados.", dificultad: "facil", opciones: ["Zanjas de pequeña sección y trabajos en espacios confinados", "Grandes vaciados de solar de gran superficie", "Excavación de túneles de gran longitud", "Transporte de materiales a larga distancia"], correcta: 0 },
  { enunciado: "¿Qué es un brazo desplazable lateralmente (offset boom)?", explicacion: "Un sistema que desplaza el brazo lateralmente sin girar la torreta.", dificultad: "dificil", opciones: ["Un sistema que desplaza el brazo lateralmente sin girar la torreta", "Un sistema que aumenta la potencia hidráulica de la máquina", "Un accesorio exclusivo para el transporte de la máquina", "Un sistema de iluminación adicional para trabajo nocturno"], correcta: 0 },
  { enunciado: "¿Qué ventaja ofrece el brazo desplazable lateralmente al excavar junto a una fachada?", explicacion: "Mantiene el tren de rodaje alineado y estable mientras el brazo se desplaza junto al muro.", dificultad: "media", opciones: ["Mantiene el tren de rodaje estable mientras excava junto al muro", "Elimina por completo la necesidad de un equipo de trabajo", "Aumenta la velocidad máxima de desplazamiento de la máquina", "Reduce el consumo de combustible en cualquier circunstancia"], correcta: 0 },
  { enunciado: "¿Qué debe planificarse antes de trabajar con mini-excavadora en un espacio muy confinado?", explicacion: "La vía de acceso y salida, y el espacio suficiente para las maniobras de giro.", dificultad: "media", opciones: ["La vía de acceso y salida y el espacio para maniobrar", "Únicamente la hora de inicio de la jornada laboral", "Ninguna planificación adicional distinta de un espacio abierto", "Únicamente el color de la máquina a emplear"], correcta: 0 },
  { enunciado: "¿Qué papel cumple una persona auxiliar (señalista) en trabajos con mini-excavadora en espacios confinados?", explicacion: "Guiar a la operadora y advertir de la proximidad de servicios enterrados o personas.", dificultad: "media", opciones: ["Guiar a la operadora y advertir de riesgos no visibles", "Sustituir por completo a la persona operadora de la máquina", "Realizar exclusivamente tareas administrativas de la obra", "Ningún papel relevante distinto del resto del personal de obra"], correcta: 0 },
]);

const S3 = "mini-excavadoras-seguridad-mantenimiento-basico";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué exige el RD 1644/2008 a una mini-excavadora, como a cualquier otra máquina, para su comercialización y puesta en servicio?", reverso: "El cumplimiento de los requisitos esenciales de seguridad y salud recogidos en su Anexo I, acreditado mediante el marcado CE y la declaración CE de conformidad correspondiente" },
  { anverso: "¿Qué comprobaciones básicas de mantenimiento debe realizar el Oficial Conductor en una mini-excavadora antes de comenzar la jornada?", reverso: "El nivel de aceite hidráulico y de motor, la tensión y el estado de las cadenas o el desgaste de los neumáticos, el estado de los dientes del cazo, y el correcto funcionamiento de los mandos, frenos y sistema de seguridad de la cabina" },
  { anverso: "¿Qué riesgo específico presenta una mini-excavadora frente a una excavadora convencional, pese a su menor tamaño?", reverso: "El riesgo de vuelco lateral, dado que su reducida base de apoyo y su elevado centro de gravedad relativo pueden hacerla especialmente sensible a operar sobre terrenos irregulares o con pendiente transversal" },
  { anverso: "¿Qué elemento de protección exige, con carácter general, la cabina o el puesto de conducción de una mini-excavadora?", reverso: "Una estructura de protección contra el vuelco (ROPS) y, según el tipo de trabajo, contra la caída de objetos (FOPS), conforme a los requisitos esenciales de seguridad del RD 1644/2008" },
  { anverso: "¿Por qué es especialmente importante en la mini-excavadora respetar la capacidad de carga indicada por el fabricante al manipular cargas suspendidas?", reverso: "Porque su reducido peso propio y su menor estabilidad relativa hacen que el riesgo de vuelco por sobrecarga sea proporcionalmente mayor que en una máquina de mayor tamaño y peso" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué exige el RD 1644/2008 a una mini-excavadora para su puesta en servicio?", explicacion: "El cumplimiento de los requisitos esenciales de seguridad, acreditado con marcado CE.", dificultad: "media", opciones: ["El cumplimiento de los requisitos esenciales de seguridad", "Ninguna exigencia distinta de la de un vehículo turismo", "Únicamente una revisión anual voluntaria del fabricante", "Únicamente el pago de una tasa administrativa de registro"], correcta: 0 },
  { enunciado: "¿Cuál de las siguientes es una comprobación básica de mantenimiento antes de la jornada?", explicacion: "El nivel de aceite hidráulico y de motor, entre otras comprobaciones básicas.", dificultad: "facil", opciones: ["El nivel de aceite hidráulico y de motor", "Únicamente el color de la carrocería de la máquina", "Únicamente la marca comercial del fabricante", "Ninguna comprobación es necesaria en una máquina nueva"], correcta: 0 },
  { enunciado: "¿Qué riesgo específico presenta la mini-excavadora pese a su menor tamaño?", explicacion: "El riesgo de vuelco lateral por su reducida base de apoyo y centro de gravedad relativo.", dificultad: "dificil", opciones: ["El riesgo de vuelco lateral en terrenos irregulares", "Ningún riesgo adicional distinto de una excavadora convencional", "Únicamente el riesgo derivado del ruido del motor", "Únicamente el riesgo de avería del sistema eléctrico"], correcta: 0 },
  { enunciado: "¿Qué estructura de protección exige la cabina de una mini-excavadora frente al vuelco?", explicacion: "Una estructura ROPS, conforme al RD 1644/2008.", dificultad: "media", opciones: ["Una estructura ROPS", "Un simple techo de tela protector", "Ningún elemento de protección estructural específico", "Un sistema exclusivo de airbags frontales"], correcta: 0 },
  { enunciado: "¿Por qué es especialmente importante respetar la capacidad de carga en una mini-excavadora?", explicacion: "Su menor peso y estabilidad relativa aumentan proporcionalmente el riesgo de vuelco por sobrecarga.", dificultad: "dificil", opciones: ["Su menor estabilidad relativa aumenta el riesgo de vuelco", "La capacidad de carga no es relevante en una máquina pequeña", "Solo es relevante si se emplea un martillo hidráulico", "Solo es relevante en trabajos de más de ocho horas diarias"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 14 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 14, orden: 14, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-226 creado y vinculado como Tema 14 de Oficial Conductor Maquinaria Pesada.");
