/**
 * Crea tema-215: "Equipos neumáticos" — Tema 19 (numero=19, bloque-2)
 * de Oficial Planta Potabilizadora (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 17 oficial del Anexo I (bases2110.pdf, línea
 * 1237): "Equipos neumáticos. Cilindros. Distribuidores. Valvulería.
 * Compresores de aire. Secadores. Esquema general de un sistema de
 * producción de aire comprimido para accionamiento de válvulas e
 * instrumentación. Ventiladores y soplantes."
 *
 * Fuente primaria verificada mediante búsqueda en esta sesión: el
 * Real Decreto 809/2021, de 21 de septiembre, por el que se aprueba el
 * vigente Reglamento de equipos a presión y sus instrucciones técnicas
 * complementarias (sustituye al derogado RD 2060/2008), aplicable a los
 * compresores y depósitos de aire comprimido de la planta. El resto del
 * contenido (cilindros, distribuidores, valvulería neumática,
 * secadores, ventiladores y soplantes) es conocimiento técnico
 * consolidado de neumática industrial, sin una norma española
 * específica adicional que lo regule a ese nivel operativo.
 *
 * Tres secciones:
 * 1. cilindros-distribuidores-valvuleria-neumatica
 * 2. compresores-aire-rd-809-2021-secadores
 * 3. ventiladores-soplantes-esquema-produccion-aire-comprimido
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-215-equipos-neumaticos.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-215";
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
  titulo: "Equipos neumáticos",
  descripcion: "Cilindros, distribuidores y valvulería neumática. Compresores de aire (Reglamento de equipos a presión, RD 809/2021) y secadores. Ventiladores y soplantes, y esquema de un sistema de aire comprimido.",
  contenido: "Desarrolla los equipos neumáticos empleados en una planta potabilizadora, principalmente para el accionamiento de válvulas y para instrumentación de campo: los cilindros, los distribuidores y la valvulería neumática; los compresores de aire (regulados, en su vertiente de seguridad de equipos a presión, por el Real Decreto 809/2021) y los secadores de aire comprimido; y los ventiladores y soplantes, junto con el esquema general de un sistema de producción de aire comprimido para el accionamiento de válvulas e instrumentación.",
  enlaces_boe: [
    "https://www.boe.es/buscar/act.php?id=BOE-A-2021-16407",
  ],
  indice_estudio: [
    { url: "", titulo: "Cilindros, distribuidores y valvulería neumática", seccion: "cilindros-distribuidores-valvuleria-neumatica", articulos: "Conocimiento técnico de neumática industrial" },
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2021-16407", titulo: "Compresores de aire y secadores", seccion: "compresores-aire-rd-809-2021-secadores", articulos: "RD 809/2021, Reglamento de equipos a presión" },
    { url: "", titulo: "Ventiladores, soplantes y esquema de producción de aire comprimido", seccion: "ventiladores-soplantes-esquema-produccion-aire-comprimido", articulos: "Conocimiento técnico de neumática industrial" },
  ],
}]);

const S1 = "cilindros-distribuidores-valvuleria-neumatica";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un cilindro neumático, elemento básico de accionamiento en un sistema de aire comprimido?", reverso: "Un actuador que transforma la energía del aire comprimido en un movimiento lineal (de avance y retroceso de un vástago), empleado habitualmente para el accionamiento de válvulas u otros mecanismos de la planta" },
  { anverso: "¿Qué diferencia existe entre un cilindro de simple efecto y uno de doble efecto?", reverso: "El cilindro de simple efecto recibe aire comprimido en un único sentido de movimiento, regresando a su posición inicial por la acción de un muelle u otra fuerza externa; el de doble efecto recibe aire comprimido en ambos sentidos, permitiendo un control activo tanto del avance como del retroceso" },
  { anverso: "¿Qué es un distribuidor (o electroválvula neumática), en un sistema de accionamiento por aire comprimido?", reverso: "Una válvula que dirige el flujo de aire comprimido hacia uno u otro lado de un cilindro (o lo bloquea), controlando así el sentido de movimiento del actuador, habitualmente accionada eléctricamente desde el sistema de control" },
  { anverso: "¿Qué es la valvulería neumática, en un sentido más amplio que el propio distribuidor?", reverso: "El conjunto de válvulas empleadas en un circuito neumático para regular el paso, la presión o el caudal del aire comprimido: válvulas de regulación de caudal, reguladoras de presión, antirretorno neumáticas, y las propias electroválvulas distribuidoras" },
  { anverso: "¿Por qué es importante una correcta lubricación (o el empleo de aire limpio y seco) en los circuitos neumáticos de una planta?", reverso: "Porque la presencia de humedad, partículas o una lubricación inadecuada puede provocar corrosión interna, desgaste prematuro de sellos y juntas, y fallos de funcionamiento en cilindros y distribuidores, comprometiendo la fiabilidad del accionamiento de válvulas críticas de la planta" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es un cilindro neumático?", explicacion: "Un actuador que transforma la energía del aire comprimido en movimiento lineal.", dificultad: "facil", opciones: ["Un actuador que transforma el aire comprimido en movimiento lineal", "Un instrumento que mide exclusivamente la presión de una red", "Un instrumento que mide exclusivamente el caudal de una conducción", "Un depósito exclusivo de almacenamiento de agua tratada"], correcta: 0 },
  { enunciado: "¿Qué diferencia existe entre un cilindro de simple efecto y uno de doble efecto?", explicacion: "El de simple efecto regresa por un muelle; el de doble efecto se controla activamente en ambos sentidos.", dificultad: "media", opciones: ["El de doble efecto se controla activamente en ambos sentidos", "Ambos tipos de cilindro son exactamente equivalentes en todo caso", "El de simple efecto siempre requiere una electroválvula adicional", "El de doble efecto nunca puede emplearse para accionar válvulas"], correcta: 0 },
  { enunciado: "¿Qué es un distribuidor o electroválvula neumática?", explicacion: "Una válvula que dirige el flujo de aire comprimido hacia un cilindro, controlando su movimiento.", dificultad: "media", opciones: ["Una válvula que dirige el flujo de aire hacia un cilindro", "Un compresor exclusivo de generación de aire comprimido", "Un secador exclusivo de eliminación de humedad del aire", "Un instrumento exclusivo de medición de caudal de aire"], correcta: 0 },
  { enunciado: "¿Qué incluye, en sentido amplio, la valvulería neumática de un circuito?", explicacion: "Válvulas de regulación de caudal, reguladoras de presión, antirretorno y distribuidoras.", dificultad: "dificil", opciones: ["Válvulas de caudal, de presión, antirretorno y distribuidoras", "Únicamente los cilindros neumáticos del circuito", "Únicamente los compresores de aire de la instalación", "Únicamente los secadores de aire comprimido de la instalación"], correcta: 0 },
  { enunciado: "¿Por qué es importante emplear aire limpio y seco en los circuitos neumáticos?", explicacion: "Evita corrosión interna y desgaste prematuro de sellos y juntas.", dificultad: "media", opciones: ["Evita corrosión interna y desgaste prematuro de sellos", "No aporta ninguna ventaja real frente al aire sin tratar", "Aumenta de forma directa la velocidad máxima del cilindro", "Solo es relevante en circuitos de muy gran tamaño"], correcta: 0 },
]);

const S2 = "compresores-aire-rd-809-2021-secadores";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué función cumple un compresor de aire en el sistema neumático de una planta potabilizadora?", reverso: "Aspirar aire atmosférico y comprimirlo a la presión necesaria para el accionamiento de válvulas y otros equipos neumáticos, almacenándolo habitualmente en un depósito (calderín) para amortiguar las variaciones de demanda" },
  { anverso: "¿Qué reglamento español regula, en su vertiente de seguridad, los equipos y depósitos a presión de un sistema de aire comprimido?", reverso: "El Real Decreto 809/2021, de 21 de septiembre, por el que se aprueba el vigente Reglamento de equipos a presión y sus instrucciones técnicas complementarias, que sustituyó al anterior RD 2060/2008" },
  { anverso: "¿Por qué es importante que los depósitos de aire comprimido de la planta se sometan a las inspecciones periódicas exigidas por la normativa de equipos a presión?", reverso: "Porque un depósito a presión mal mantenido o con corrosión interna no detectada representa un riesgo de explosión, dado que almacena una cantidad significativa de energía en forma de aire comprimido" },
  { anverso: "¿Qué es un secador de aire comprimido, y por qué es necesario en muchas instalaciones neumáticas?", reverso: "Un equipo que elimina la humedad contenida en el aire comprimido tras su compresión, evitando que esa humedad condense dentro de los circuitos neumáticos y provoque corrosión, fallos en válvulas o instrumentación, o congelación en ambientes fríos" },
  { anverso: "¿Qué tipos de secadores de aire comprimido son habituales en instalaciones industriales?", reverso: "Los secadores frigoríficos (que enfrían el aire para condensar y eliminar la humedad) y los secadores por adsorción (que emplean un material desecante para retener la humedad), cada uno adecuado según el grado de sequedad requerido por la aplicación" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué función cumple un compresor de aire en el sistema neumático de la planta?", explicacion: "Aspira aire atmosférico y lo comprime a la presión necesaria para el accionamiento de válvulas.", dificultad: "facil", opciones: ["Aspira y comprime aire para el accionamiento de válvulas", "Dosifica exclusivamente el hipoclorito de la desinfección final", "Mide exclusivamente el caudal de la red de agua potable", "Filtra exclusivamente las partículas sólidas del agua tratada"], correcta: 0 },
  { enunciado: "¿Qué reglamento español vigente regula la seguridad de los equipos y depósitos a presión de aire comprimido?", explicacion: "El Real Decreto 809/2021.", dificultad: "media", opciones: ["El Real Decreto 809/2021", "El Real Decreto 2060/2008, actualmente vigente sin modificaciones", "El Real Decreto 244/2016, sobre metrología legal", "El Real Decreto 140/2003, sobre calidad del agua de consumo"], correcta: 0 },
  { enunciado: "¿Por qué es importante inspeccionar periódicamente los depósitos de aire comprimido de la planta?", explicacion: "Un depósito mal mantenido representa un riesgo de explosión por la energía almacenada.", dificultad: "media", opciones: ["Representan un riesgo de explosión por la energía almacenada", "No representan ningún riesgo real distinto de una fuga de aire", "Solo requieren inspección si presentan un fallo ya evidente", "La inspección periódica no está prevista en ninguna normativa"], correcta: 0 },
  { enunciado: "¿Qué es un secador de aire comprimido?", explicacion: "Un equipo que elimina la humedad del aire comprimido tras su compresión.", dificultad: "media", opciones: ["Un equipo que elimina la humedad del aire comprimido", "Un equipo que comprime el aire atmosférico a la presión de trabajo", "Un equipo que filtra exclusivamente el agua de la red de la planta", "Un equipo que dosifica exclusivamente reactivos de coagulación"], correcta: 0 },
  { enunciado: "¿Qué tipos de secadores de aire comprimido son habituales en instalaciones industriales?", explicacion: "Secadores frigoríficos y secadores por adsorción.", dificultad: "dificil", opciones: ["Secadores frigoríficos y por adsorción", "Únicamente secadores frigoríficos, sin ninguna otra alternativa", "Únicamente secadores por adsorción, sin ninguna otra alternativa", "Ningún tipo de secador es realmente necesario en la práctica"], correcta: 0 },
]);

const S3 = "ventiladores-soplantes-esquema-produccion-aire-comprimido";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un ventilador, dentro de los equipos neumáticos de una planta de tratamiento de agua?", reverso: "Una máquina que impulsa aire (u otro gas) a baja presión y caudal relativamente elevado, empleada habitualmente para la ventilación de espacios cerrados o para aportar aire a procesos que no requieren una presión elevada" },
  { anverso: "¿Qué es una soplante, y en qué se diferencia de un ventilador convencional?", reverso: "Una máquina que impulsa aire a una presión mayor que la de un ventilador convencional, aunque inferior a la de un compresor, empleada habitualmente en procesos de aireación (como la agitación de reactivos o el tratamiento de fangos) que requieren un caudal elevado a presión moderada" },
  { anverso: "¿Qué elementos básicos integra el esquema general de un sistema de producción de aire comprimido para el accionamiento de válvulas e instrumentación?", reverso: "Un compresor de aire, un depósito acumulador (calderín), un secador, filtros de partículas y de aceite, una red de distribución con sus válvulas de corte, y los reguladores de presión en cada punto de consumo (cilindros, instrumentación)" },
  { anverso: "¿Por qué es importante disponer de un depósito acumulador (calderín) en un sistema de aire comprimido, y no depender solo del compresor en marcha?", reverso: "Porque amortigua las variaciones de demanda instantánea de aire, reduce el número de arranques y paradas del compresor (prolongando su vida útil), y garantiza una reserva de aire disponible incluso durante paradas breves del compresor" },
  { anverso: "¿Qué papel cumple la instrumentación de campo alimentada por aire comprimido en una planta potabilizadora, junto con el accionamiento de válvulas?", reverso: "Algunos instrumentos de medida o control tradicionales (posicionadores neumáticos de válvulas, ciertos transmisores antiguos) emplean señales neumáticas para su funcionamiento, aunque hoy predominan cada vez más las señales eléctricas o digitales en la instrumentación de nueva instalación" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es un ventilador, dentro de los equipos neumáticos de la planta?", explicacion: "Una máquina que impulsa aire a baja presión y caudal relativamente elevado.", dificultad: "facil", opciones: ["Una máquina que impulsa aire a baja presión y caudal elevado", "Una máquina que comprime aire a alta presión de trabajo", "Un instrumento que mide exclusivamente la presión de una red", "Un depósito exclusivo de almacenamiento de aire comprimido"], correcta: 0 },
  { enunciado: "¿Qué es una soplante, y en qué se diferencia de un ventilador convencional?", explicacion: "Impulsa aire a mayor presión que un ventilador, útil en procesos de aireación.", dificultad: "media", opciones: ["Impulsa aire a mayor presión, útil en procesos de aireación", "Impulsa aire a menor presión que cualquier ventilador convencional", "Cumple exactamente la misma función que un compresor de aire", "Solo se emplea para el accionamiento directo de válvulas de la red"], correcta: 0 },
  { enunciado: "¿Qué elementos básicos integra el esquema de un sistema de producción de aire comprimido?", explicacion: "Compresor, calderín, secador, filtros, red de distribución y reguladores de presión.", dificultad: "media", opciones: ["Compresor, calderín, secador, filtros y reguladores de presión", "Únicamente un compresor, sin ningún otro elemento adicional", "Únicamente un depósito de almacenamiento de agua tratada", "Únicamente un sistema de dosificación de hipoclorito sódico"], correcta: 0 },
  { enunciado: "¿Por qué es importante disponer de un depósito acumulador (calderín) en un sistema de aire comprimido?", explicacion: "Amortigua la demanda, reduce arranques del compresor y garantiza reserva de aire.", dificultad: "dificil", opciones: ["Amortigua la demanda y garantiza una reserva de aire disponible", "No aporta ninguna ventaja real frente a un compresor sin calderín", "Aumenta de forma directa la presión máxima del compresor", "Sustituye por completo la necesidad del propio compresor"], correcta: 0 },
  { enunciado: "¿Qué papel puede cumplir la instrumentación de campo alimentada por aire comprimido en la planta?", explicacion: "Algunos instrumentos tradicionales emplean señales neumáticas para su funcionamiento.", dificultad: "media", opciones: ["Algunos instrumentos tradicionales emplean señales neumáticas", "Toda la instrumentación de la planta funciona exclusivamente por aire", "La instrumentación neumática ha sido prohibida en cualquier planta", "El aire comprimido nunca se emplea para instrumentación de campo"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 19 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 19, orden: 19, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-215 creado y vinculado como Tema 19 de Oficial Planta Potabilizadora.");
