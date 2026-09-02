/**
 * Crea tema-184: "Vehículos híbridos. Vehículos eléctricos" — Tema 20
 * (numero=20, bloque-2) de Oficial Mecánico.
 *
 * Corresponde al TEMA 18 oficial: "Vehículos híbridos. Vehículos
 * eléctricos."
 *
 * Conocimiento técnico consolidado de mecánica del automóvil, sin una
 * ley española que lo regule como tal.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-184-vehiculos-hibridos-electricos.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-184";
const OPOSICION = "oficial-mecanico-ayto-zaragoza";
const BLOQUE_2_ID = "aa6cf0d6-e9fd-4e52-837d-15fab35cbcbe";

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
  titulo: "Vehículos híbridos. Vehículos eléctricos",
  descripcion: "Los tipos y el funcionamiento de los vehículos híbridos, la batería y el motor eléctrico de tracción de los vehículos eléctricos, y la seguridad y el mantenimiento de sistemas de alta tensión.",
  contenido: "Desarrolla los tipos y el funcionamiento de los vehículos híbridos (combinación de motor térmico y motor eléctrico, en sus distintas configuraciones), los elementos fundamentales de un vehículo eléctrico puro (batería de tracción, motor eléctrico, electrónica de potencia), y las precauciones de seguridad y mantenimiento específicas exigidas por los sistemas de alta tensión presentes en estos vehículos, cada vez más frecuentes en la flota municipal.",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "Vehículos híbridos: tipos y funcionamiento", seccion: "vehiculos-hibridos-tipos-funcionamiento", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Vehículos eléctricos: batería y motor de tracción", seccion: "vehiculos-electricos-bateria-motor", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Seguridad en sistemas de alta tensión y su mantenimiento", seccion: "seguridad-alta-tension-mantenimiento", articulos: "Conceptos fundamentales" },
  ],
}]);

const S1 = "vehiculos-hibridos-tipos-funcionamiento";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un vehículo híbrido?", reverso: "Un vehículo que combina dos fuentes de energía para su propulsión, habitualmente un motor de combustión interna (gasolina o diésel) y uno o más motores eléctricos alimentados por una batería, que pueden funcionar de forma conjunta o alternativa" },
  { anverso: "¿Qué es un híbrido convencional (HEV, Hybrid Electric Vehicle) no enchufable?", reverso: "Un vehículo híbrido cuya batería se recarga exclusivamente mediante el propio motor térmico y la frenada regenerativa, sin posibilidad de conectarse a la red eléctrica para su recarga" },
  { anverso: "¿Qué es un híbrido enchufable (PHEV, Plug-in Hybrid Electric Vehicle)?", reverso: "Un vehículo híbrido con una batería de mayor capacidad que un HEV convencional, que puede recargarse conectándolo a la red eléctrica, permitiendo recorrer una autonomía significativa en modo exclusivamente eléctrico" },
  { anverso: "¿Qué es la frenada regenerativa?", reverso: "Un sistema presente en vehículos híbridos y eléctricos que, durante la deceleración o el frenado, emplea el motor eléctrico como generador, transformando parte de la energía cinética del vehículo en energía eléctrica que se almacena en la batería, en lugar de disiparse completamente como calor en los frenos convencionales" },
  { anverso: "¿Qué diferencia hay entre una configuración híbrida en serie y una en paralelo?", reverso: "En la configuración en serie, el motor térmico solo genera electricidad (no mueve directamente las ruedas), siendo el motor eléctrico el único que propulsa el vehículo; en la configuración en paralelo, tanto el motor térmico como el eléctrico pueden mover las ruedas, de forma conjunta o alternativa" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es un vehículo híbrido?", explicacion: "Un vehículo que combina un motor de combustión interna con uno o más motores eléctricos para su propulsión.", dificultad: "facil", opciones: ["Un vehículo que combina motor de combustión y motor eléctrico", "Un vehículo propulsado exclusivamente por energía eléctrica", "Un vehículo propulsado exclusivamente por combustión de gasolina", "Un vehículo sin ningún tipo de sistema de propulsión motorizado"], correcta: 0 },
  { enunciado: "¿Qué caracteriza a un híbrido convencional (HEV) no enchufable?", explicacion: "Su batería se recarga exclusivamente mediante el motor térmico y la frenada regenerativa, sin conexión a la red eléctrica.", dificultad: "media", opciones: ["Se recarga solo mediante el motor y la frenada regenerativa", "Se recarga exclusivamente conectándolo a la red eléctrica", "No dispone de ningún tipo de batería en su configuración", "Solo puede circular en modo exclusivamente eléctrico"], correcta: 0 },
  { enunciado: "¿Qué caracteriza a un híbrido enchufable (PHEV)?", explicacion: "Dispone de una batería de mayor capacidad que puede recargarse conectándolo a la red eléctrica.", dificultad: "media", opciones: ["Dispone de batería de mayor capacidad recargable en la red eléctrica", "No dispone de ningún tipo de batería en su configuración", "Solo puede recargarse mediante el propio motor térmico", "Es idéntico en todo a un híbrido convencional no enchufable"], correcta: 0 },
  { enunciado: "¿Qué es la frenada regenerativa?", explicacion: "Un sistema que transforma parte de la energía cinética en energía eléctrica durante la frenada, almacenándola en la batería.", dificultad: "media", opciones: ["Transforma energía cinética en eléctrica durante la frenada", "Aumenta la potencia del motor térmico durante la frenada", "Reduce la capacidad de la batería durante la frenada", "Genera la chispa que enciende la mezcla del motor"], correcta: 0 },
  { enunciado: "¿Qué diferencia una configuración híbrida en serie de una en paralelo?", explicacion: "En serie, el motor térmico solo genera electricidad; en paralelo, ambos motores pueden mover las ruedas.", dificultad: "dificil", opciones: ["En serie el térmico solo genera electricidad, en paralelo ambos mueven ruedas", "Ambas configuraciones funcionan de forma exactamente idéntica", "En paralelo el motor térmico nunca mueve las ruedas del vehículo", "En serie ambos motores mueven siempre las ruedas conjuntamente"], correcta: 0 },
]);

const S2 = "vehiculos-electricos-bateria-motor";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un vehículo eléctrico puro (BEV, Battery Electric Vehicle)?", reverso: "Un vehículo propulsado exclusivamente por uno o más motores eléctricos, alimentados por una batería de tracción de alta capacidad, sin ningún motor de combustión interna a bordo" },
  { anverso: "¿Qué es la batería de tracción de un vehículo eléctrico?", reverso: "Un conjunto de celdas de iones de litio (la tecnología más habitual actualmente), que almacena la energía eléctrica necesaria para alimentar el motor de tracción del vehículo, gestionado por un sistema electrónico específico (BMS) que controla su carga, descarga y temperatura" },
  { anverso: "¿Qué es el BMS (Battery Management System, sistema de gestión de batería)?", reverso: "El sistema electrónico que monitoriza y gestiona el estado de la batería de tracción: nivel de carga de cada celda, temperatura, y protección frente a sobrecargas, descargas excesivas o temperaturas inadecuadas" },
  { anverso: "¿Qué es el motor eléctrico de tracción?", reverso: "El motor que propulsa el vehículo eléctrico, generalmente de tipo síncrono de imanes permanentes o de inducción, caracterizado por entregar el máximo par motor desde muy bajas revoluciones (incluso desde parado), a diferencia de un motor de combustión" },
  { anverso: "¿Qué es el cargador de a bordo de un vehículo eléctrico?", reverso: "El elemento que convierte la corriente alterna de la red eléctrica (en una recarga de tipo lento o semirrápido) en corriente continua compatible con la batería de tracción del vehículo, para su correcta recarga" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es un vehículo eléctrico puro (BEV)?", explicacion: "Un vehículo propulsado exclusivamente por motores eléctricos, sin motor de combustión a bordo.", dificultad: "facil", opciones: ["Un vehículo propulsado exclusivamente por motores eléctricos", "Un vehículo que combina motor eléctrico y motor de combustión", "Un vehículo propulsado exclusivamente por combustión de gasolina", "Un vehículo sin ningún tipo de sistema de propulsión motorizado"], correcta: 0 },
  { enunciado: "¿Qué tecnología de celdas es la más habitual en las baterías de tracción actuales?", explicacion: "Las celdas de iones de litio.", dificultad: "media", opciones: ["Celdas de iones de litio", "Celdas de plomo-ácido convencionales", "Celdas de níquel-cadmio exclusivamente", "Celdas de combustible de hidrógeno exclusivamente"], correcta: 0 },
  { enunciado: "¿Qué función cumple el BMS de un vehículo eléctrico?", explicacion: "Monitoriza y gestiona el estado de la batería: carga, temperatura y protección frente a condiciones inadecuadas.", dificultad: "media", opciones: ["Monitoriza y gestiona el estado de la batería de tracción", "Genera la chispa que enciende la mezcla de combustible", "Impulsa el combustible a presión hacia los inyectores", "Filtra las impurezas presentes en el aceite del motor"], correcta: 0 },
  { enunciado: "¿Qué caracteriza al motor eléctrico de tracción frente a un motor de combustión?", explicacion: "Entrega el máximo par motor desde muy bajas revoluciones, incluso desde parado.", dificultad: "dificil", opciones: ["Entrega el máximo par desde muy bajas revoluciones", "Necesita alcanzar un régimen elevado para entregar par motor", "No es capaz de generar ningún par motor desde parado", "Funciona de forma idéntica a un motor de combustión interna"], correcta: 0 },
  { enunciado: "¿Qué función cumple el cargador de a bordo de un vehículo eléctrico?", explicacion: "Convierte la corriente alterna de la red en corriente continua compatible con la batería.", dificultad: "dificil", opciones: ["Convierte corriente alterna de la red en corriente continua", "Genera directamente la energía eléctrica sin necesidad de red", "Filtra las impurezas presentes en el combustible del vehículo", "Regula la temperatura del habitáculo del vehículo"], correcta: 0 },
]);

const S3 = "seguridad-alta-tension-mantenimiento";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Por qué los sistemas de alta tensión de vehículos híbridos y eléctricos requieren precauciones específicas de seguridad?", reverso: "Porque manejan tensiones muy superiores a las del sistema eléctrico convencional de 12 V (habitualmente entre 200 y 800 V), con riesgo real de electrocución grave o mortal si se manipulan sin la formación y el equipo de protección adecuados" },
  { anverso: "¿Qué es el cableado de alta tensión de color naranja en un vehículo híbrido o eléctrico?", reverso: "Un código de color normalizado en la industria del automóvil que identifica visualmente los cables y componentes que forman parte del circuito de alta tensión, para advertir de su peligrosidad y diferenciarlo del cableado convencional de baja tensión" },
  { anverso: "¿Qué es el procedimiento de desconexión segura (o 'apagado' del sistema de alta tensión) antes de intervenir en estos vehículos?", reverso: "Un procedimiento específico del fabricante, que incluye habitualmente la retirada de un conector o fusible de servicio (service plug) y un tiempo de espera de seguridad, para descargar los condensadores del sistema antes de manipular cualquier componente de alta tensión" },
  { anverso: "¿Qué formación específica se requiere para intervenir de forma segura en el sistema de alta tensión de un vehículo híbrido o eléctrico?", reverso: "Una formación específica en seguridad eléctrica de vehículos electrificados, habitualmente estructurada en niveles de cualificación reconocidos por el sector, que capacita para trabajar de forma segura según el tipo de intervención a realizar" },
  { anverso: "¿Qué equipo de protección individual (EPI) específico se emplea al intervenir en el sistema de alta tensión?", reverso: "Guantes aislantes de la clase de tensión correspondiente (verificados periódicamente), herramientas con aislamiento eléctrico certificado, y, según el procedimiento, otros elementos como gafas de protección o pantallas faciales" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Por qué los sistemas de alta tensión de vehículos híbridos y eléctricos requieren precauciones específicas?", explicacion: "Manejan tensiones muy superiores a los 12 V convencionales, con riesgo real de electrocución grave.", dificultad: "media", opciones: ["Manejan tensiones muy superiores con riesgo de electrocución grave", "No presentan ningún riesgo distinto al sistema eléctrico convencional", "Solo son peligrosos si el vehículo está circulando en marcha", "El riesgo de estos sistemas es idéntico al de la batería de 12 V"], correcta: 0 },
  { enunciado: "¿Qué identifica el color naranja del cableado en un vehículo híbrido o eléctrico?", explicacion: "Los cables y componentes del circuito de alta tensión, para advertir de su peligrosidad.", dificultad: "media", opciones: ["Los cables y componentes del circuito de alta tensión", "El cableado del sistema de audio del vehículo", "El cableado del sistema de luces del vehículo", "El cableado del sistema de frenos del vehículo"], correcta: 0 },
  { enunciado: "¿Qué es el procedimiento de desconexión segura del sistema de alta tensión?", explicacion: "Un procedimiento del fabricante que incluye retirar un conector de servicio y esperar un tiempo de seguridad antes de manipular componentes.", dificultad: "dificil", opciones: ["Retirar un conector de servicio y esperar antes de manipular", "Basta con apagar el vehículo con la llave para intervenir con seguridad", "No existe ningún procedimiento específico necesario en estos vehículos", "Solo es necesario en vehículos híbridos, nunca en eléctricos puros"], correcta: 0 },
  { enunciado: "¿Qué tipo de formación se requiere para intervenir de forma segura en el sistema de alta tensión?", explicacion: "Una formación específica en seguridad eléctrica de vehículos electrificados, estructurada en niveles de cualificación.", dificultad: "media", opciones: ["Una formación específica en seguridad eléctrica de vehículos electrificados", "No se requiere ninguna formación específica para esta tarea", "Basta con la formación general de mecánica de automoción convencional", "Solo se requiere formación para vehículos eléctricos, no híbridos"], correcta: 0 },
  { enunciado: "¿Qué equipo de protección individual específico se emplea al intervenir en alta tensión?", explicacion: "Guantes aislantes de la clase adecuada y herramientas con aislamiento eléctrico certificado.", dificultad: "media", opciones: ["Guantes aislantes y herramientas con aislamiento certificado", "No se requiere ningún equipo de protección específico adicional", "Basta con guantes de trabajo convencionales de cualquier tipo", "Solo se requiere protección auditiva para este tipo de intervención"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 20 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 20, orden: 20, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-184 creado y vinculado como Tema 20 de Oficial Mecánico.");
