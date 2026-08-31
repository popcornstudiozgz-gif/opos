/**
 * Crea tema-81: "Fontanería básica en instalaciones deportivas" — Tema 11
 * (numero=11, bloque-2) de Oficial Polivalente Instalaciones Deportivas
 * (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 9 oficial del Anexo I (bases2110.pdf):
 *   "Fontanería: nociones básicas, reconocimiento de herramientas.
 *   operaciones básicas de mantenimiento en instalaciones deportivas."
 *
 * Conocimiento técnico consolidado del oficio de fontanería, aplicado al
 * contexto específico de instalaciones deportivas (vestuarios, duchas,
 * circuitos de llenado/vaciado de vasos); no requiere cita legal
 * artículo a artículo, en línea con tema-62 (fontanería y calefacción de
 * Oficial Mantenimiento General), del que se diferencia por el enfoque
 * en instalaciones específicamente deportivas (duchas colectivas, redes
 * de llenado de vasos) en lugar de vivienda/edificio general.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-81-fontaneria-instalaciones-deportivas.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-81";
const OPOSICION = "oficial-instalaciones-deportivas-ayto-zaragoza";
const BLOQUE_2_ID = "cdb0920b-a2d8-4ea8-b3fc-b80168d7361a";

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
  titulo: "Fontanería básica en instalaciones deportivas",
  descripcion: "Nociones básicas de fontanería, reconocimiento de herramientas y operaciones básicas de mantenimiento aplicadas a instalaciones deportivas (vestuarios, duchas, vasos de piscina).",
  contenido: "Desarrolla las nociones básicas de fontanería aplicadas a instalaciones deportivas: averías y mantenimiento en redes de vestuarios y duchas colectivas, herramientas del oficio, y operaciones básicas de mantenimiento en circuitos de llenado y vaciado de vasos de piscina.",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "Nociones básicas de fontanería en instalaciones deportivas", seccion: "fontaneria-nociones-basicas-deportivas", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Herramientas de fontanería", seccion: "herramientas-fontaneria-deportivas", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Operaciones básicas de mantenimiento en instalaciones deportivas", seccion: "operaciones-mantenimiento-fontaneria-deportivas", articulos: "Conceptos fundamentales" },
  ],
}]);

const S1 = "fontaneria-nociones-basicas-deportivas";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué elementos de fontanería son especialmente exigentes en un centro deportivo con vestuarios colectivos?", reverso: "Las redes de duchas (con uso intensivo y simultáneo), los grifos temporizados de ahorro de agua, y los desagües de gran caudal de las zonas de duchas" },
  { anverso: "¿Qué es un grifo temporizado y por qué es habitual en vestuarios deportivos?", reverso: "Un grifo que cierra automáticamente tras un tiempo determinado desde su apertura, empleado en vestuarios colectivos para ahorrar agua y evitar que quede abierto sin control" },
  { anverso: "¿Qué avería es habitual en los desagües de zonas de duchas colectivas de un centro deportivo?", reverso: "Atascos por acumulación de pelo, jabón y restos orgánicos, dado el uso intensivo y simultáneo de varias duchas" },
  { anverso: "¿Qué es la red de llenado de un vaso de piscina?", reverso: "El conjunto de tuberías y válvulas que permite introducir agua nueva en el vaso, ya sea para su llenado inicial o para reponer el agua perdida por evaporación, salpicaduras y purgas del sistema de depuración" },
  { anverso: "¿Qué es una válvula de vaciado (o fondo) de un vaso de piscina?", reverso: "La válvula situada en el punto más bajo del vaso que permite vaciarlo completamente para labores de limpieza a fondo o mantenimiento" },
  { anverso: "¿Qué es un rebosadero (o canal perimetral) en una piscina y qué función de fontanería cumple?", reverso: "El canal situado en el borde del vaso que recoge el agua superficial (con mayor concentración de suciedad) y la conduce al circuito de depuración, manteniendo constante el nivel del agua" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué elementos de fontanería son especialmente exigentes en vestuarios colectivos?", explicacion: "Las redes de duchas de uso intensivo, grifos temporizados y desagües de gran caudal.", dificultad: "media", opciones: ["Redes de duchas, grifos temporizados y desagües", "Únicamente los grifos monomando individuales", "Únicamente la red de llenado del vaso", "Ningún elemento especialmente exigente"], correcta: 0 },
  { enunciado: "¿Qué es un grifo temporizado?", explicacion: "Un grifo que cierra automáticamente tras un tiempo determinado.", dificultad: "facil", opciones: ["Un grifo que cierra automáticamente tras un tiempo", "Un grifo que solo funciona con agua caliente", "Una válvula de vaciado del vaso de piscina", "Un tipo de rebosadero perimetral"], correcta: 0 },
  { enunciado: "¿Qué avería es habitual en desagües de duchas colectivas?", explicacion: "Atascos por pelo, jabón y restos orgánicos.", dificultad: "facil", opciones: ["Atascos por pelo, jabón y restos orgánicos", "Fugas exclusivamente en la red de llenado", "Rotura del rebosadero perimetral", "Fallo del grifo temporizado únicamente"], correcta: 0 },
  { enunciado: "¿Para qué sirve la red de llenado de un vaso de piscina?", explicacion: "Para introducir agua nueva, en el llenado inicial o reponiendo pérdidas.", dificultad: "media", opciones: ["Para introducir agua nueva en el vaso", "Para vaciar completamente el vaso", "Para recoger el agua superficial del borde", "Para calentar el agua del vaso"], correcta: 0 },
  { enunciado: "¿Qué función cumple una válvula de vaciado o fondo de un vaso de piscina?", explicacion: "Permite vaciarlo completamente para limpieza o mantenimiento.", dificultad: "media", opciones: ["Permite vaciar completamente el vaso", "Introduce agua nueva en el vaso", "Recoge el agua superficial del borde", "Regula la temperatura del agua"], correcta: 0 },
  { enunciado: "¿Qué función cumple el rebosadero de una piscina?", explicacion: "Recoge el agua superficial y la conduce al circuito de depuración.", dificultad: "media", opciones: ["Recoge el agua superficial hacia depuración", "Vacía completamente el vaso", "Calienta el agua de la piscina", "Sustituye a la red de llenado"], correcta: 0 },
]);

const S2 = "herramientas-fontaneria-deportivas";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Para qué se usa una llave de tubo (Stillson) en fontanería de instalaciones deportivas?", reverso: "Para apretar o aflojar tuberías y racores roscados de las redes de agua y desagüe" },
  { anverso: "¿Para qué se usa un cortatubos en el mantenimiento de instalaciones deportivas?", reverso: "Para cortar de forma limpia tramos de tubería (cobre, plástico) al reparar o modificar tramos de la red de fontanería" },
  { anverso: "¿Para qué se usa una desatascadora de sonda o serpiente en un centro deportivo?", reverso: "Para eliminar atascos en los desagües de duchas colectivas o sumideros de vestuarios, introduciendo un cable flexible hasta el punto de obstrucción" },
  { anverso: "¿Para qué se usa el teflón en la reparación de fontanería de instalaciones deportivas?", reverso: "Para sellar y hacer estancas las uniones roscadas de tuberías, grifería o racores, evitando fugas de agua" },
  { anverso: "¿Para qué se usa una máquina de electrosoldadura o termofusión en las redes de fontanería de un centro deportivo?", reverso: "Para unir tramos de tubería de polietileno o polipropileno (habituales en circuitos de piscina) mediante fusión por calor, creando una unión estanca y permanente" },
  { anverso: "¿Qué EPI básico debe usarse al manipular herramientas de fontanería en zonas húmedas de un centro deportivo?", reverso: "Guantes de protección adecuados y calzado antideslizante, dado el suelo mojado habitual en vestuarios y zonas de piscina" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Para qué se usa una llave de tubo (Stillson)?", explicacion: "Para apretar o aflojar tuberías y racores roscados.", dificultad: "facil", opciones: ["Para apretar o aflojar tuberías y racores", "Para cortar tubería de cobre", "Para desatascar un desagüe", "Para soldar por termofusión"], correcta: 0 },
  { enunciado: "¿Para qué se usa un cortatubos?", explicacion: "Para cortar de forma limpia tramos de tubería.", dificultad: "facil", opciones: ["Para cortar de forma limpia tramos de tubería", "Para eliminar atascos en desagües", "Para sellar uniones roscadas", "Para apretar racores roscados"], correcta: 0 },
  { enunciado: "¿Para qué se usa una desatascadora de sonda en un centro deportivo?", explicacion: "Para eliminar atascos en desagües de duchas o sumideros.", dificultad: "media", opciones: ["Para eliminar atascos en desagües", "Para cortar tuberías de PVC", "Para sellar uniones con teflón", "Para soldar tramos de tubería"], correcta: 0 },
  { enunciado: "¿Para qué se usa el teflón en fontanería?", explicacion: "Para sellar y hacer estancas las uniones roscadas.", dificultad: "facil", opciones: ["Para sellar y hacer estancas las uniones", "Para cortar tuberías de cobre", "Para desatascar un desagüe", "Para soldar por termofusión"], correcta: 0 },
  { enunciado: "¿Con qué herramienta se unen tramos de tubería de polietileno de un circuito de piscina?", explicacion: "Con una máquina de electrosoldadura o termofusión.", dificultad: "media", opciones: ["Con electrosoldadura o termofusión", "Con una llave Stillson", "Con teflón únicamente", "Con un cortatubos"], correcta: 0 },
  { enunciado: "¿Qué EPI básico es recomendable en zonas húmedas de un centro deportivo?", explicacion: "Guantes y calzado antideslizante.", dificultad: "media", opciones: ["Guantes y calzado antideslizante", "No es necesaria ninguna protección", "Solo gafas de protección", "Solo mascarilla respiratoria"], correcta: 0 },
]);

const S3 = "operaciones-mantenimiento-fontaneria-deportivas";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué revisión periódica básica debe hacerse en las duchas de un vestuario deportivo?", reverso: "Comprobar el correcto funcionamiento de los grifos temporizados, la presión y temperatura del agua, y el estado de los desagües individuales" },
  { anverso: "¿Qué mantenimiento preventivo básico se recomienda en la red de llenado del vaso de una piscina?", reverso: "Revisar periódicamente el estado de las válvulas, comprobar la ausencia de fugas en las conexiones, y verificar el correcto cierre tras cada operación de llenado" },
  { anverso: "¿Qué comprobación debe hacerse antes de vaciar completamente un vaso de piscina para mantenimiento?", reverso: "Verificar que la válvula de vaciado y el circuito de desagüe funcionan correctamente y que el punto de vertido puede absorber el caudal, evitando inundaciones en el entorno" },
  { anverso: "¿Por qué es importante purgar de aire una red de fontanería tras una reparación en un circuito de piscina?", reverso: "Porque el aire acumulado puede reducir el caudal, generar ruidos y afectar al funcionamiento de bombas y equipos de depuración conectados a la red" },
  { anverso: "¿Qué operación de mantenimiento debe realizarse periódicamente en el rebosadero perimetral de una piscina?", reverso: "Limpiar las rejillas y canales de posibles acumulaciones de hojas, pelo o residuos que puedan reducir su capacidad de recogida de agua" },
  { anverso: "¿Qué relación tiene el buen mantenimiento de fontanería con la seguridad higiénico-sanitaria de una piscina?", reverso: "Un fallo en el llenado, vaciado o rebosadero puede alterar el nivel y renovación del agua, afectando a la calidad sanitaria exigida para piscinas de uso público" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué debe revisarse periódicamente en las duchas de un vestuario deportivo?", explicacion: "Grifos temporizados, presión/temperatura del agua y estado de desagües.", dificultad: "facil", opciones: ["Grifos temporizados, presión y desagües", "Solo el color de los azulejos", "Solo la iluminación del vestuario", "Solo el sistema de megafonía"], correcta: 0 },
  { enunciado: "¿Qué mantenimiento preventivo se recomienda en la red de llenado del vaso?", explicacion: "Revisar válvulas, ausencia de fugas y correcto cierre tras el llenado.", dificultad: "media", opciones: ["Revisar válvulas y ausencia de fugas", "No requiere ningún mantenimiento preventivo", "Solo revisar el rebosadero perimetral", "Solo revisar los grifos temporizados"], correcta: 0 },
  { enunciado: "¿Qué debe comprobarse antes de vaciar completamente un vaso de piscina?", explicacion: "Que la válvula y el circuito de desagüe funcionan y absorben el caudal.", dificultad: "media", opciones: ["Que la válvula y desagüe absorben el caudal", "Solo la temperatura del agua", "Solo el estado del rebosadero", "No es necesaria ninguna comprobación previa"], correcta: 0 },
  { enunciado: "¿Por qué es importante purgar el aire de una red tras una reparación?", explicacion: "Porque el aire reduce el caudal, genera ruidos y afecta a bombas y equipos.", dificultad: "media", opciones: ["Reduce caudal, genera ruidos y afecta a equipos", "No tiene ningún efecto relevante", "Solo afecta a la temperatura del agua", "Solo afecta a la iluminación del centro"], correcta: 0 },
  { enunciado: "¿Qué mantenimiento requiere el rebosadero perimetral de una piscina?", explicacion: "Limpieza periódica de rejillas y canales de residuos.", dificultad: "media", opciones: ["Limpieza periódica de rejillas y canales", "No requiere ningún mantenimiento", "Solo revisión eléctrica anual", "Solo pintura periódica"], correcta: 0 },
  { enunciado: "¿Qué relación tiene el mantenimiento de fontanería con la calidad sanitaria de una piscina?", explicacion: "Un fallo en llenado/vaciado/rebosadero afecta a la renovación y calidad del agua.", dificultad: "media", opciones: ["Afecta a la renovación y calidad del agua", "No tiene relación con la calidad sanitaria", "Solo afecta a la temperatura ambiente", "Solo afecta al consumo eléctrico"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 11 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 11, orden: 11, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-81 creado y vinculado como Tema 11 de Oficial Polivalente Instalaciones Deportivas.");
