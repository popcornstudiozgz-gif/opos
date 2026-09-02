/**
 * Crea tema-154: "Introducción a las instalaciones solares fotovoltaicas"
 * — Tema 22 (numero=22, bloque-2) de Oficial Electricista (Ayto.
 * Zaragoza). Último tema de la parte específica de esta oposición.
 *
 * Corresponde al TEMA 20 oficial del Anexo I (bases2110.pdf, línea 1372):
 *   "Introducción a las Instalaciones Solares Fotovoltaicas. Componentes
 *   de una instalación fotovoltaica: módulos, inversores, reguladores y
 *   baterías. Modalidades de autoconsumo (con y sin excedentes).
 *   Conceptos básicos de conexionado y mantenimiento de sistemas
 *   solares."
 *
 * Fuente primaria verificada en esta sesión (WebSearch sobre boe.es):
 * - Real Decreto 244/2019, de 5 de abril, por el que se regulan las
 *   condiciones administrativas, técnicas y económicas del autoconsumo
 *   de energía eléctrica — BOE-A-2019-5089. Define las modalidades de
 *   autoconsumo sin excedentes y con excedentes (estas últimas
 *   subdivididas en acogidas y no acogidas a compensación), y el
 *   mecanismo de compensación simplificada de excedentes.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-154-instalaciones-solares-fotovoltaicas.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-154";
const OPOSICION = "oficial-electricista-ayto-zaragoza";
const BLOQUE_2_ID = "4dbd9335-cb26-48e5-a83b-aef9eeb23097";

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
  titulo: "Introducción a las instalaciones solares fotovoltaicas",
  descripcion: "Componentes de una instalación fotovoltaica: módulos, inversores, reguladores y baterías. Modalidades de autoconsumo (con y sin excedentes). Conceptos básicos de conexionado y mantenimiento de sistemas solares.",
  contenido: "Desarrolla los componentes básicos de una instalación solar fotovoltaica (módulos, inversores, reguladores de carga y baterías), las modalidades de autoconsumo reguladas en el Real Decreto 244/2019 (con y sin excedentes, y dentro de esta última la acogida o no a compensación), y los conceptos básicos de conexionado y mantenimiento de estos sistemas.",
  enlaces_boe: [
    { titulo: "Real Decreto 244/2019, condiciones del autoconsumo de energía eléctrica", url: "https://www.boe.es/buscar/doc.php?id=BOE-A-2019-5089" },
    { titulo: "Real Decreto 842/2002, Reglamento electrotécnico para baja tensión (ITC-BT-40)", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2002-18099" },
  ],
  indice_estudio: [
    { url: "", titulo: "Componentes de una instalación fotovoltaica", seccion: "componentes-instalacion-fotovoltaica", articulos: "Conceptos fundamentales; ITC-BT-40" },
    { url: "https://www.boe.es/buscar/doc.php?id=BOE-A-2019-5089", titulo: "Modalidades de autoconsumo (con y sin excedentes)", seccion: "modalidades-autoconsumo-con-sin-excedentes", articulos: "RD 244/2019" },
    { url: "", titulo: "Conexionado y mantenimiento de sistemas solares", seccion: "conexionado-mantenimiento-sistemas-solares", articulos: "Conceptos fundamentales" },
  ],
}]);

const S1 = "componentes-instalacion-fotovoltaica";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un módulo (o panel) fotovoltaico?", reverso: "El elemento que transforma directamente la radiación solar en energía eléctrica de corriente continua, mediante el efecto fotovoltaico que se produce en sus células de material semiconductor (habitualmente silicio)" },
  { anverso: "¿Qué es un inversor en una instalación fotovoltaica?", reverso: "El equipo que transforma la corriente continua generada por los módulos fotovoltaicos en corriente alterna, compatible con la red eléctrica y con los receptores habituales de la instalación" },
  { anverso: "¿Qué es un regulador de carga en una instalación fotovoltaica con baterías?", reverso: "El dispositivo que controla la carga y descarga de las baterías, evitando sobrecargas o descargas excesivas que puedan dañarlas y reducir su vida útil" },
  { anverso: "¿Qué es una batería en una instalación fotovoltaica, y cuándo resulta necesaria?", reverso: "El elemento que almacena la energía eléctrica generada para su uso posterior (cuando no hay generación solar, por ejemplo de noche); resulta necesaria en instalaciones aisladas de la red, y opcional en instalaciones de autoconsumo conectadas a red que quieran almacenar excedentes" },
  { anverso: "¿Qué instrucción técnica complementaria del REBT resulta de aplicación a las instalaciones generadoras de baja tensión, como una instalación fotovoltaica?", reverso: "La ITC-BT-40" },
  { anverso: "¿Qué elemento de seguridad debe incorporar el inversor de una instalación fotovoltaica conectada a la red eléctrica, para evitar el riesgo de isla eléctrica?", reverso: "Una protección anti-isla, que desconecta automáticamente la instalación fotovoltaica de la red en caso de que esta quede sin tensión, evitando que la instalación siga inyectando energía en una red que se supone sin servicio (con el riesgo que ello conllevaría para el personal de mantenimiento de la red)" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es un módulo o panel fotovoltaico?", explicacion: "Transforma la radiación solar en energía eléctrica de corriente continua.", dificultad: "facil", opciones: ["Transforma la radiación solar en energía eléctrica de corriente continua", "Transforma la corriente continua en corriente alterna", "Almacena la energía eléctrica generada para su uso posterior", "Mide la resistencia de tierra de la instalación fotovoltaica"], correcta: 0 },
  { enunciado: "¿Qué función cumple el inversor de una instalación fotovoltaica?", explicacion: "Transforma la corriente continua generada en corriente alterna.", dificultad: "facil", opciones: ["Transforma la corriente continua generada en corriente alterna", "Transforma la radiación solar directamente en corriente alterna", "Almacena la energía eléctrica generada para su uso posterior", "Controla la carga y descarga de las baterías del sistema"], correcta: 0 },
  { enunciado: "¿Qué función cumple un regulador de carga en una instalación fotovoltaica con baterías?", explicacion: "Controla la carga y descarga de las baterías, evitando sobrecargas o descargas excesivas.", dificultad: "media", opciones: ["Controla la carga y descarga de las baterías", "Transforma la corriente continua en corriente alterna", "Transforma la radiación solar en energía eléctrica", "Mide la resistencia de aislamiento de la instalación"], correcta: 0 },
  { enunciado: "¿Qué instrucción técnica complementaria del REBT resulta de aplicación a las instalaciones generadoras de baja tensión?", explicacion: "La ITC-BT-40.", dificultad: "media", opciones: ["La ITC-BT-40", "La ITC-BT-47", "La ITC-BT-18", "La ITC-BT-24"], correcta: 0 },
  { enunciado: "¿Qué función cumple la protección anti-isla del inversor de una instalación fotovoltaica conectada a red?", explicacion: "Desconecta la instalación de una red que ha quedado sin tensión, evitando seguir inyectando energía.", dificultad: "dificil", opciones: ["Desconecta la instalación de una red que ha quedado sin tensión", "Aumenta la producción del inversor ante un fallo de la red", "Protege exclusivamente frente a sobretensiones transitorias", "Regula la carga y descarga de las baterías del sistema"], correcta: 0 },
]);

const S2 = "modalidades-autoconsumo-con-sin-excedentes";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué Real Decreto regula las condiciones administrativas, técnicas y económicas del autoconsumo de energía eléctrica en España?", reverso: "El Real Decreto 244/2019, de 5 de abril" },
  { anverso: "¿Qué es la modalidad de autoconsumo sin excedentes?", reverso: "La modalidad en la que la instalación de autoconsumo dispone de un mecanismo antivertido que impide, en cualquier momento, que la energía producida y no consumida se vierta a la red de distribución" },
  { anverso: "¿Qué es la modalidad de autoconsumo con excedentes?", reverso: "La modalidad en la que la instalación puede verter a la red de distribución la energía producida y no consumida en el momento de su generación, pudiendo estar o no acogida a un mecanismo de compensación económica de esos excedentes" },
  { anverso: "¿Qué es el mecanismo de compensación simplificada de excedentes, dentro de la modalidad de autoconsumo con excedentes?", reverso: "Un mecanismo que permite compensar, en la factura eléctrica del periodo, el valor económico de la energía excedentaria vertida a la red con el de la energía consumida de la red, para consumidores que cumplen determinados requisitos (potencia no superior a 100 kW, entre otros)" },
  { anverso: "¿Qué es el autoconsumo individual, a diferencia del colectivo, según el Real Decreto 244/2019?", reverso: "El autoconsumo en el que existe un único consumidor asociado a las instalaciones de generación próximas; el autoconsumo colectivo permite que varios consumidores compartan la energía generada por una misma instalación, con el reparto correspondiente entre ellos" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué Real Decreto regula las condiciones del autoconsumo de energía eléctrica en España?", explicacion: "El Real Decreto 244/2019, de 5 de abril.", dificultad: "media", opciones: ["El Real Decreto 244/2019, de 5 de abril", "El Real Decreto 842/2002, de 2 de agosto", "El Real Decreto 346/2011, de 11 de marzo", "El Real Decreto 614/2001, de 8 de junio"], correcta: 0 },
  { enunciado: "¿Qué caracteriza a la modalidad de autoconsumo sin excedentes?", explicacion: "Dispone de un mecanismo antivertido que impide verter energía a la red.", dificultad: "media", opciones: ["Dispone de un mecanismo antivertido que impide verter energía a la red", "Permite siempre verter libremente la energía sobrante a la red", "Obliga a disponer siempre de baterías de almacenamiento", "Solo puede aplicarse a instalaciones de más de 100 kW"], correcta: 0 },
  { enunciado: "¿Qué caracteriza a la modalidad de autoconsumo con excedentes?", explicacion: "Permite verter a la red la energía producida y no consumida.", dificultad: "media", opciones: ["Permite verter a la red la energía producida y no consumida", "Impide siempre cualquier vertido de energía a la red", "Obliga a disponer siempre de baterías de almacenamiento", "Solo puede aplicarse a instalaciones aisladas de la red"], correcta: 0 },
  { enunciado: "¿Qué es el mecanismo de compensación simplificada de excedentes?", explicacion: "Compensa en factura el valor de la energía excedentaria vertida con la consumida de la red.", dificultad: "dificil", opciones: ["Compensa en factura el valor de la energía excedentaria con la consumida", "Obliga a instalar siempre baterías de almacenamiento adicionales", "Elimina por completo la necesidad de contratar suministro eléctrico", "Solo es aplicable a instalaciones de más de 100 kW de potencia"], correcta: 0 },
  { enunciado: "¿Qué diferencia existe entre autoconsumo individual y colectivo según el RD 244/2019?", explicacion: "El colectivo permite que varios consumidores compartan la energía de una misma instalación.", dificultad: "media", opciones: ["El colectivo permite compartir la energía entre varios consumidores", "El individual permite compartir la energía entre varios consumidores", "Ambos son exactamente equivalentes en su regulación", "El autoconsumo colectivo no está regulado por el RD 244/2019"], correcta: 0 },
]);

const S3 = "conexionado-mantenimiento-sistemas-solares";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es la conexión de módulos fotovoltaicos en serie?", reverso: "La conexión que suma la tensión de cada módulo, manteniendo la misma intensidad en todos ellos, formando lo que se conoce como una 'string' o cadena fotovoltaica" },
  { anverso: "¿Qué es la conexión de módulos fotovoltaicos en paralelo?", reverso: "La conexión que suma la intensidad de cada módulo (o cada string), manteniendo la misma tensión en todos ellos" },
  { anverso: "¿Qué tipo de corriente circula por el cableado entre los módulos fotovoltaicos y el inversor?", reverso: "Corriente continua, ya que el inversor todavía no ha realizado la transformación a corriente alterna en ese tramo de la instalación" },
  { anverso: "¿Qué comprobación básica de mantenimiento debe realizarse periódicamente sobre los módulos fotovoltaicos, más allá de la parte eléctrica?", reverso: "La limpieza de su superficie, eliminando suciedad, polvo o depósitos que reduzcan la radiación solar que reciben y, en consecuencia, su producción eléctrica" },
  { anverso: "¿Qué comprobación de mantenimiento eléctrico es recomendable realizar periódicamente sobre las conexiones de una instalación fotovoltaica?", reverso: "La revisión del apriete y el estado de los conectores y bornes, dado que un mal contacto puede generar calentamientos localizados, pérdidas de producción o incluso un riesgo de incendio" },
  { anverso: "¿Qué precaución de seguridad debe tener presente el electricista al manipular el cableado de corriente continua entre módulos e inversor, incluso con el inversor desconectado?", reverso: "Que los módulos fotovoltaicos generan tensión mientras reciben luz, con independencia del estado del inversor, por lo que ese tramo de la instalación puede seguir en tensión aunque el resto del sistema esté desconectado" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué caracteriza a la conexión de módulos fotovoltaicos en serie?", explicacion: "Suma la tensión de cada módulo, manteniendo la misma intensidad.", dificultad: "media", opciones: ["Suma la tensión de cada módulo, manteniendo la misma intensidad", "Suma la intensidad de cada módulo, manteniendo la misma tensión", "Elimina por completo la necesidad de inversor en la instalación", "Solo es aplicable a instalaciones con baterías de almacenamiento"], correcta: 0 },
  { enunciado: "¿Qué caracteriza a la conexión de módulos fotovoltaicos en paralelo?", explicacion: "Suma la intensidad de cada módulo o string, manteniendo la misma tensión.", dificultad: "media", opciones: ["Suma la intensidad de cada módulo, manteniendo la misma tensión", "Suma la tensión de cada módulo, manteniendo la misma intensidad", "Elimina por completo la necesidad de regulador de carga", "Solo es aplicable a instalaciones aisladas de la red"], correcta: 0 },
  { enunciado: "¿Qué tipo de corriente circula entre los módulos fotovoltaicos y el inversor?", explicacion: "Corriente continua.", dificultad: "facil", opciones: ["Corriente continua", "Corriente alterna monofásica", "Corriente alterna trifásica", "Ningún tipo de corriente hasta la salida del inversor"], correcta: 0 },
  { enunciado: "¿Qué comprobación básica de mantenimiento debe realizarse periódicamente sobre los módulos fotovoltaicos?", explicacion: "La limpieza de su superficie.", dificultad: "facil", opciones: ["La limpieza de su superficie", "La sustitución periódica programada, con independencia de su estado", "El aumento de su inclinación cada mes", "La pintura periódica de su superficie exterior"], correcta: 0 },
  { enunciado: "¿Qué precaución de seguridad debe tener presente el electricista al manipular el cableado de corriente continua entre módulos e inversor?", explicacion: "Los módulos generan tensión mientras reciben luz, con independencia del estado del inversor.", dificultad: "dificil", opciones: ["Los módulos generan tensión mientras reciben luz, aunque el inversor esté desconectado", "El cableado de corriente continua nunca puede estar en tensión si el inversor está desconectado", "Los módulos solo generan tensión si están conectados directamente a la red eléctrica", "El cableado de corriente continua no requiere ninguna precaución especial de seguridad"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 22 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 22, orden: 22, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-154 creado y vinculado como Tema 22 de Oficial Electricista.");
