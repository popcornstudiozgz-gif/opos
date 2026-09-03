/**
 * Crea tema-216: "Automatización industrial" — Tema 20 (numero=20,
 * bloque-2) de Oficial Planta Potabilizadora (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 18 oficial del Anexo I (bases2110.pdf, línea
 * 1247): "Automatización industrial. Controladores e instrumentación de
 * campo en procesos de potabilización y abastecimiento de agua potable.
 * Comunicaciones en una red de autómatas industriales. Sistemas de
 * comunicaciones remotos."
 *
 * Conocimiento técnico consolidado de automatización industrial y
 * telecontrol, sin una ley española que lo regule como tal a nivel de
 * proceso — búsqueda previa realizada conforme al estándar de sourcing
 * del proyecto (sesión actual): no se ha localizado una norma española
 * específica que regule la automatización o los sistemas SCADA de una
 * planta de tratamiento de agua, más allá de estándares y protocolos de
 * comunicación de uso internacional consolidado, citados por su función
 * (IEC 60870-5-101/104 para telecontrol, Modbus, OPC-UA), no normas
 * legales de obligado cumplimiento. Se reutiliza el dato ya verificado
 * en el proyecto (Oficial Guardallaves) sobre el sistema de telecontrol
 * y sectorización de la red de Zaragoza, con el que la automatización
 * de la propia planta se integra.
 *
 * Tres secciones:
 * 1. controladores-instrumentacion-campo-potabilizacion
 * 2. comunicaciones-red-automatas-industriales
 * 3. sistemas-comunicaciones-remotos-scada
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-216-automatizacion-industrial.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-216";
const OPOSICION = "oficial-planta-potabilizadora-ayto-zaragoza";
const BLOQUE_2_ID = "ca4ed0ad-ab08-4bc9-80b7-fb4e6941b64a";

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
  titulo: "Automatización industrial",
  descripcion: "Controladores e instrumentación de campo en procesos de potabilización y abastecimiento. Comunicaciones en una red de autómatas industriales. Sistemas de comunicaciones remotos y SCADA.",
  contenido: "Desarrolla la automatización industrial aplicada a los procesos de potabilización y de abastecimiento de agua potable: los controladores (autómatas programables) y la instrumentación de campo que miden y actúan sobre el proceso, las comunicaciones dentro de una red de autómatas industriales, y los sistemas de comunicaciones remotos que permiten integrar la planta dentro de un sistema de supervisión y control (SCADA) y de telecontrol como el de la red de Zaragoza.",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "Controladores e instrumentación de campo en potabilización", seccion: "controladores-instrumentacion-campo-potabilizacion", articulos: "Conocimiento técnico de automatización industrial" },
    { url: "", titulo: "Comunicaciones en una red de autómatas industriales", seccion: "comunicaciones-red-automatas-industriales", articulos: "Conocimiento técnico de automatización industrial; protocolos Modbus, OPC-UA" },
    { url: "https://www.zaragoza.es/sede/portal/infraestructuras/agua/red", titulo: "Sistemas de comunicaciones remotos y SCADA", seccion: "sistemas-comunicaciones-remotos-scada", articulos: "Conocimiento técnico; Ayuntamiento de Zaragoza — Red de abastecimiento de agua (telecontrol)" },
  ],
}]);

const S1 = "controladores-instrumentacion-campo-potabilizacion";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un controlador (o autómata programable, PLC) en el contexto de la automatización de una planta potabilizadora?", reverso: "Un dispositivo electrónico programable que recibe señales de la instrumentación de campo, ejecuta una lógica de control programada, y actúa sobre los elementos finales del proceso (válvulas motorizadas, bombas, dosificadores) para mantener el proceso dentro de los parámetros deseados" },
  { anverso: "¿Qué es la instrumentación de campo, en el contexto de la automatización industrial?", reverso: "El conjunto de sensores y transmisores instalados directamente en el proceso (medidores de caudal, presión, nivel, pH, cloro residual, turbidez) que capturan variables físicas o químicas y las convierten en señales que pueden ser leídas por el sistema de control" },
  { anverso: "¿Qué tipo de instrumentación de campo resulta especialmente crítica en el control automático de la etapa de decantación (por ejemplo, en el decantador Accelator)?", reverso: "Los sensores de concentración de sólidos o de nivel de manto de fangos, que permiten activar de forma automática las purgas de fangos cuando se supera un umbral determinado, sin depender exclusivamente de la observación manual" },
  { anverso: "¿Qué tipo de instrumentación de campo resulta especialmente crítica en el control automático de la etapa de desinfección?", reverso: "Los analizadores de cloro residual en continuo, que permiten al sistema de control ajustar automáticamente la dosis de hipoclorito sódico en función de las mediciones reales, en lugar de una dosificación fija" },
  { anverso: "¿Por qué es importante la fiabilidad y el mantenimiento periódico de la instrumentación de campo en una planta automatizada?", reverso: "Porque el sistema de control toma decisiones automáticas basándose en las lecturas de esos instrumentos; una lectura errónea por falta de calibración o avería puede provocar una actuación incorrecta del proceso (por ejemplo, una dosificación insuficiente o excesiva de reactivos), sin que el sistema lo detecte por sí solo" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es un controlador o autómata programable (PLC) en una planta potabilizadora?", explicacion: "Un dispositivo que recibe señales de campo, ejecuta una lógica de control y actúa sobre elementos finales del proceso.", dificultad: "facil", opciones: ["Un dispositivo que recibe señales y actúa sobre el proceso", "Un instrumento que mide exclusivamente la presión de una conducción", "Un reactivo exclusivo empleado en la etapa de coagulación", "Un medio filtrante exclusivo empleado en la etapa de filtración"], correcta: 0 },
  { enunciado: "¿Qué es la instrumentación de campo?", explicacion: "Sensores y transmisores en el proceso que capturan variables y las convierten en señales.", dificultad: "media", opciones: ["Sensores y transmisores que capturan variables del proceso", "El conjunto exclusivo de válvulas manuales de la planta", "El conjunto exclusivo de reactivos químicos almacenados", "El conjunto exclusivo de herramientas del taller de mantenimiento"], correcta: 0 },
  { enunciado: "¿Qué instrumentación resulta especialmente crítica en el control automático de la decantación?", explicacion: "Los sensores de concentración de sólidos o de nivel de manto de fangos.", dificultad: "media", opciones: ["Los sensores de concentración de sólidos o manto de fangos", "Exclusivamente los sensores de temperatura ambiente de la sala", "Exclusivamente los sensores de presión de la red de distribución", "Exclusivamente los sensores de nivel del depósito de Casablanca"], correcta: 0 },
  { enunciado: "¿Qué instrumentación resulta especialmente crítica en el control automático de la desinfección?", explicacion: "Los analizadores de cloro residual en continuo.", dificultad: "media", opciones: ["Los analizadores de cloro residual en continuo", "Exclusivamente los sensores de vibración de los motores", "Exclusivamente los sensores de nivel de los filtros de arena", "Exclusivamente los sensores de presión del aire comprimido"], correcta: 0 },
  { enunciado: "¿Por qué es importante el mantenimiento periódico de la instrumentación de campo en una planta automatizada?", explicacion: "Una lectura errónea puede provocar una actuación automática incorrecta del proceso.", dificultad: "dificil", opciones: ["Una lectura errónea puede provocar una actuación incorrecta", "La instrumentación de campo no requiere ningún mantenimiento real", "El sistema de control siempre detecta por sí solo cualquier error", "Solo es relevante el mantenimiento de los propios controladores"], correcta: 0 },
]);

const S2 = "comunicaciones-red-automatas-industriales";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Por qué necesitan comunicarse entre sí los distintos autómatas programables de una planta potabilizadora?", reverso: "Porque el proceso completo de potabilización se divide en varias etapas (desbaste, coagulación-floculación, decantación, filtración, desinfección) que, aunque puedan controlarse de forma local, necesitan compartir información entre sí y con un sistema de supervisión general para coordinar el funcionamiento conjunto de la planta" },
  { anverso: "¿Qué es Modbus, uno de los protocolos de comunicación industrial de uso más extendido?", reverso: "Un protocolo de comunicación estándar abierto, ampliamente empleado en automatización industrial, que permite el intercambio de datos entre controladores, instrumentación y sistemas de supervisión de distintos fabricantes" },
  { anverso: "¿Qué es OPC-UA, como estándar de comunicación en automatización industrial moderna?", reverso: "Un estándar de comunicación e intercambio de datos orientado a la interoperabilidad entre sistemas de distintos fabricantes, que facilita la integración de controladores, bases de datos y sistemas de supervisión dentro de una misma arquitectura de automatización" },
  { anverso: "¿Qué ventaja aporta que la red de autómatas de la planta emplee protocolos de comunicación estándar (como Modbus u OPC-UA) frente a protocolos propietarios cerrados?", reverso: "Facilita la interoperabilidad entre equipos de distintos fabricantes, reduce la dependencia de un único proveedor para futuras ampliaciones o sustituciones, y simplifica la integración con sistemas de supervisión (SCADA) o de telecontrol de terceros" },
  { anverso: "¿Qué topología de red suele emplearse para conectar los distintos autómatas y sistemas de una planta potabilizadora, en términos generales?", reverso: "Redes de tipo bus, anillo o estrella (según las necesidades de redundancia y fiabilidad), habitualmente sobre infraestructuras de cableado industrial (Ethernet industrial) que permiten la comunicación entre los controladores de cada etapa del proceso y el sistema central de supervisión" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Por qué necesitan comunicarse entre sí los autómatas de las distintas etapas de una planta potabilizadora?", explicacion: "El proceso completo requiere coordinar el funcionamiento conjunto de las distintas etapas.", dificultad: "media", opciones: ["El proceso completo requiere coordinar las distintas etapas", "Cada etapa del proceso funciona de forma completamente aislada", "Los autómatas nunca necesitan compartir información entre sí", "Solo es necesario en plantas de muy pequeño tamaño"], correcta: 0 },
  { enunciado: "¿Qué es Modbus?", explicacion: "Un protocolo de comunicación estándar abierto de uso extendido en automatización industrial.", dificultad: "media", opciones: ["Un protocolo de comunicación estándar abierto", "Un reactivo exclusivo empleado en la etapa de coagulación", "Un tipo de válvula exclusiva de la red de distribución", "Un medio filtrante exclusivo de la etapa de filtración"], correcta: 0 },
  { enunciado: "¿Qué es OPC-UA?", explicacion: "Un estándar de comunicación orientado a la interoperabilidad entre sistemas de distintos fabricantes.", dificultad: "dificil", opciones: ["Un estándar de comunicación orientado a la interoperabilidad", "Un tipo de motor eléctrico de alta eficiencia energética", "Un tipo de válvula reductora de presión de la red", "Un reactivo exclusivo empleado en la etapa de desinfección"], correcta: 0 },
  { enunciado: "¿Qué ventaja aporta emplear protocolos estándar frente a protocolos propietarios cerrados?", explicacion: "Facilita la interoperabilidad y reduce la dependencia de un único proveedor.", dificultad: "media", opciones: ["Facilita la interoperabilidad y reduce la dependencia de un proveedor", "No aporta ninguna ventaja real frente a un protocolo propietario", "Siempre resulta más costoso que un protocolo propietario cerrado", "Elimina por completo la necesidad de cualquier instrumentación"], correcta: 0 },
  { enunciado: "¿Qué topologías de red suelen emplearse para conectar los autómatas de una planta potabilizadora?", explicacion: "Redes de tipo bus, anillo o estrella sobre infraestructuras de cableado industrial.", dificultad: "dificil", opciones: ["Redes de tipo bus, anillo o estrella sobre cableado industrial", "Exclusivamente conexiones inalámbricas sin ningún cableado", "Exclusivamente conexión punto a punto sin ninguna topología de red", "Ninguna topología de red es necesaria en este tipo de instalación"], correcta: 0 },
]);

const S3 = "sistemas-comunicaciones-remotos-scada";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un sistema SCADA (Supervisory Control And Data Acquisition)?", reverso: "Un sistema de supervisión, control y adquisición de datos que permite visualizar el estado del proceso completo de la planta desde una interfaz centralizada, registrar históricos de variables, y en muchos casos actuar de forma remota sobre determinados elementos del proceso" },
  { anverso: "¿Qué relación existe entre el SCADA de la Planta Potabilizadora de Casablanca y el sistema de telecontrol de la red de abastecimiento de Zaragoza?", reverso: "Ambos sistemas comparten la misma filosofía de supervisión y control remoto; el telecontrol de la red permite monitorizar depósitos, bombeos y sectores de distribución, y su integración con el SCADA de la planta permite una visión conjunta de todo el ciclo, desde la potabilización hasta la distribución" },
  { anverso: "¿Qué son los sistemas de comunicaciones remotos empleados para conectar instalaciones alejadas (depósitos, bombeos) con el centro de control de la planta?", reverso: "Enlaces de comunicación (radio, fibra óptica, redes móviles industriales, u otros medios) que transmiten los datos de instrumentación y permiten órdenes de control entre las instalaciones remotas y el sistema central de supervisión, sin necesidad de desplazamiento físico" },
  { anverso: "¿Qué ventaja aporta la centralización de la información en un sistema SCADA para la gestión de una planta como la de Casablanca?", reverso: "Permite al personal de operación conocer en tiempo real el estado de todo el proceso desde una única sala de control, detectar anomalías de forma temprana, y disponer de un histórico de datos útil para el análisis y la mejora continua del proceso" },
  { anverso: "¿Qué precaución debe tenerse en cuenta respecto a la ciberseguridad de un sistema SCADA que controla infraestructuras críticas como una planta potabilizadora?", reverso: "Debe protegerse frente a accesos no autorizados (segmentación de redes, control de acceso, actualización de sistemas) dado que una manipulación indebida del sistema de control podría comprometer el correcto funcionamiento del tratamiento del agua, tratándose de una infraestructura esencial para la ciudad" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es un sistema SCADA?", explicacion: "Un sistema de supervisión, control y adquisición de datos del proceso completo.", dificultad: "facil", opciones: ["Un sistema de supervisión, control y adquisición de datos", "Un reactivo exclusivo empleado en la etapa de desinfección", "Un tipo de motor eléctrico de alta eficiencia energética", "Un instrumento exclusivo de medición de caudal de una bomba"], correcta: 0 },
  { enunciado: "¿Qué relación existe entre el SCADA de la planta y el telecontrol de la red de abastecimiento de Zaragoza?", explicacion: "Comparten la misma filosofía de supervisión y su integración da una visión conjunta del ciclo.", dificultad: "media", opciones: ["Comparten la filosofía de supervisión y dan una visión conjunta", "Son sistemas completamente independientes sin ninguna relación", "El SCADA sustituye por completo la necesidad del telecontrol", "El telecontrol de la red no guarda ninguna relación con la planta"], correcta: 0 },
  { enunciado: "¿Qué son los sistemas de comunicaciones remotos empleados para conectar instalaciones alejadas con el centro de control?", explicacion: "Enlaces de comunicación que transmiten datos y órdenes de control a distancia.", dificultad: "media", opciones: ["Enlaces de comunicación que transmiten datos y órdenes a distancia", "Exclusivamente cables de cobre tendidos físicamente entre puntos", "Exclusivamente sistemas de aire comprimido para instrumentación", "Exclusivamente el propio sistema de riego de la planta"], correcta: 0 },
  { enunciado: "¿Qué ventaja aporta la centralización de información en un sistema SCADA?", explicacion: "Permite conocer en tiempo real el estado del proceso y detectar anomalías de forma temprana.", dificultad: "media", opciones: ["Permite conocer en tiempo real el proceso y detectar anomalías", "No aporta ninguna ventaja real frente a la supervisión manual local", "Elimina por completo la necesidad de personal de operación", "Solo es útil en plantas de muy pequeño tamaño"], correcta: 0 },
  { enunciado: "¿Qué precaución debe tenerse en cuenta respecto a la ciberseguridad de un SCADA de infraestructura crítica?", explicacion: "Protegerlo frente a accesos no autorizados mediante segmentación y control de acceso.", dificultad: "dificil", opciones: ["Protegerlo frente a accesos no autorizados mediante control de acceso", "La ciberseguridad no es relevante en sistemas de tratamiento de agua", "Basta con desconectar el sistema de cualquier red de comunicación", "Solo es relevante la seguridad física de la sala de control"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 20 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 20, orden: 20, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-216 creado y vinculado como Tema 20 de Oficial Planta Potabilizadora.");
