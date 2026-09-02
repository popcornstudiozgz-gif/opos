/**
 * Crea tema-197: "Procedimientos para la detección y localización de
 * averías en la red" — Tema 17 (numero=17, bloque-2) de Oficial
 * Guardallaves (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 15 oficial del Anexo I (bases2110.pdf, línea 937):
 *   "Procedimientos para la detección y localización de averías en la
 *   red (método acústico, otros métodos)."
 *
 * Conocimiento técnico consolidado del oficio de guardallaves (técnicas
 * de detección de fugas), sin una ley española que lo regule como tal —
 * mismo criterio que otros temas técnicos sin ley única de este
 * proyecto. Búsqueda previa realizada conforme al estándar de sourcing:
 * no existe una norma española específica sobre métodos de detección de
 * fugas en redes de abastecimiento; sí existe, de forma indirecta, la
 * referencia al sistema de sectorización y telecontrol del Ayuntamiento
 * de Zaragoza ya citada en tema-187 y tema-198 (zaragoza.es, "Red de
 * abastecimiento de agua"), que constituye la base organizativa sobre la
 * que se apoyan estos métodos de detección a nivel municipal.
 *
 * Tres secciones:
 * 1. deteccion-indirecta-analisis-caudales-nocturnos
 * 2. metodo-acustico-localizacion-fugas
 * 3. otros-metodos-deteccion-localizacion-averias
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-197-deteccion-localizacion-averias.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-197";
const OPOSICION = "oficial-guardallaves-ayto-zaragoza";
const BLOQUE_2_ID = "5bb8da57-00c3-4865-a0a1-651b70c85ba0";

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
  titulo: "Procedimientos para la detección y localización de averías en la red",
  descripcion: "Detección indirecta mediante el análisis de caudales nocturnos y la sectorización de la red. El método acústico de localización de fugas. Otros métodos: correlación acústica, gas trazador y termografía.",
  contenido: "Desarrolla los procedimientos empleados para detectar y localizar averías (fugas no visibles) en la red de abastecimiento: la detección indirecta mediante el análisis de los caudales mínimos nocturnos por sector, el método acústico (el más extendido, basado en el sonido característico que genera el agua al escapar a presión) y otros métodos complementarios como la correlación acústica, el gas trazador o la termografía.",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "Detección indirecta: análisis de caudales nocturnos y sectorización", seccion: "deteccion-indirecta-analisis-caudales-nocturnos", articulos: "Conocimiento técnico del oficio de guardallaves" },
    { url: "", titulo: "El método acústico de localización de fugas", seccion: "metodo-acustico-localizacion-fugas", articulos: "Conocimiento técnico del oficio de guardallaves" },
    { url: "", titulo: "Otros métodos de detección y localización de averías", seccion: "otros-metodos-deteccion-localizacion-averias", articulos: "Conocimiento técnico del oficio de guardallaves" },
  ],
}]);

const S1 = "deteccion-indirecta-analisis-caudales-nocturnos";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es el caudal mínimo nocturno (o caudal de la madrugada) en un sector de la red?", reverso: "El caudal registrado en las horas de menor consumo (habitualmente entre las 2 y las 4 de la madrugada), cuando el consumo real de los abonados es mínimo, por lo que un caudal anormalmente alto en ese periodo es indicio de una fuga en el sector" },
  { anverso: "¿Por qué es útil la sectorización de la red para la detección indirecta de fugas?", reverso: "Porque al dividir la red en sectores con su propio caudal de entrada medido, permite comparar el consumo esperado de cada sector con el caudal realmente suministrado, acotando así en qué sector concreto se produce una posible fuga antes de buscarla sobre el terreno" },
  { anverso: "¿Qué papel cumple el telecontrol en la detección indirecta de averías?", reverso: "Permite monitorizar de forma continua y a distancia los caudales de entrada de cada sector, generando alertas automáticas cuando se detectan variaciones anómalas que puedan indicar una fuga, sin necesidad de desplazarse físicamente a comprobarlo" },
  { anverso: "¿Qué es el índice de agua no registrada (o agua no facturada) en un sector de la red?", reverso: "La diferencia entre el volumen de agua que entra en el sector y el volumen realmente facturado a los abonados de ese sector, que incluye tanto las fugas físicas de la red como otros factores (errores de medición, consumos no autorizados)" },
  { anverso: "¿Qué ventaja tiene detectar una fuga de forma indirecta (por sector) frente a esperar a que aflore visiblemente en superficie?", reverso: "Permite reparar la avería antes, reduciendo el volumen de agua perdida, el riesgo de daños a terceros (socavones, humedades) y el coste total de la reparación, al no tener que esperar a que la fuga sea visible en la calle" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es el caudal mínimo nocturno de un sector de la red?", explicacion: "El caudal registrado en las horas de menor consumo, útil para detectar fugas.", dificultad: "facil", opciones: ["El caudal registrado en las horas de menor consumo de la madrugada", "El caudal máximo registrado durante las horas punta del día", "El caudal facturado a los abonados durante todo el trimestre", "El caudal que circula exclusivamente por la red de riego"], correcta: 0 },
  { enunciado: "¿Por qué es útil la sectorización de la red para la detección indirecta de fugas?", explicacion: "Permite comparar el consumo esperado con el caudal real de cada sector.", dificultad: "media", opciones: ["Permite comparar el consumo esperado con el caudal real por sector", "Elimina por completo la necesidad de reparar ninguna avería", "Aumenta de forma directa la presión disponible en toda la ciudad", "Sustituye por completo la necesidad de personal de guardallaves"], correcta: 0 },
  { enunciado: "¿Qué papel cumple el telecontrol en la detección indirecta de averías?", explicacion: "Monitoriza a distancia los caudales y genera alertas ante variaciones anómalas.", dificultad: "media", opciones: ["Monitoriza a distancia los caudales y genera alertas automáticas", "Repara automáticamente cualquier fuga detectada en la red", "Sustituye por completo la necesidad del método acústico", "Factura de forma automática el consumo de cada abonado"], correcta: 0 },
  { enunciado: "¿Qué es el índice de agua no registrada en un sector de la red?", explicacion: "La diferencia entre el agua que entra en el sector y la realmente facturada.", dificultad: "dificil", opciones: ["La diferencia entre el agua que entra y la realmente facturada", "El caudal máximo que puede transportar la conducción del sector", "El número de averías reparadas en ese sector durante el año", "El número de abonados dados de alta en ese sector concreto"], correcta: 0 },
  { enunciado: "¿Qué ventaja tiene detectar una fuga de forma indirecta antes de que aflore en superficie?", explicacion: "Reduce el agua perdida, el riesgo de daños y el coste de la reparación.", dificultad: "media", opciones: ["Reduce el agua perdida, el riesgo de daños y el coste de reparación", "No aporta ninguna ventaja real frente a esperar a que sea visible", "Aumenta de forma directa el coste total de la reparación necesaria", "Solo es relevante en sectores de muy reciente urbanización"], correcta: 0 },
]);

const S2 = "metodo-acustico-localizacion-fugas";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿En qué se basa el método acústico de localización de fugas?", reverso: "En el sonido característico (silbido o ruido de fricción) que genera el agua al escapar a presión a través de una fisura en la tubería, que se transmite y amplifica a través del propio material de la conducción y del terreno circundante" },
  { anverso: "¿Qué es una varilla o bastón de escucha (geófono mecánico simple)?", reverso: "Un instrumento sencillo que permite auscultar directamente elementos de la red (válvulas, hidrantes, acometidas) apoyándolo sobre ellos y escuchando si transmiten el ruido característico de una fuga cercana" },
  { anverso: "¿Qué es un geófono electrónico, y qué ventaja aporta frente a un bastón de escucha mecánico?", reverso: "Un aparato que amplifica y filtra electrónicamente el sonido captado por un sensor, permitiendo distinguir mejor el ruido de la fuga del ruido ambiente y estimar con mayor precisión la proximidad y la intensidad de la fuga" },
  { anverso: "¿Cómo varía el ruido detectado por el geófono a medida que el guardallaves se acerca al punto exacto de la fuga?", reverso: "El ruido aumenta progresivamente de intensidad conforme el punto de escucha se acerca a la fuga, alcanzando su máximo justo sobre el punto donde se produce la rotura" },
  { anverso: "¿Qué factores pueden dificultar el uso del método acústico para localizar una fuga?", reverso: "El ruido ambiente (tráfico, actividad urbana), el tipo de material de la tubería (los materiales plásticos transmiten peor el sonido que los metálicos), la profundidad de la conducción y el tipo de terreno circundante" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿En qué se basa el método acústico de localización de fugas?", explicacion: "En el sonido que genera el agua al escapar a presión a través de una fisura.", dificultad: "facil", opciones: ["En el sonido que genera el agua al escapar a presión", "En la medición directa del caudal de entrada del sector", "En el análisis químico de muestras de agua de la zona", "En la comparación de la factura de consumo del abonado"], correcta: 0 },
  { enunciado: "¿Qué es un bastón de escucha o geófono mecánico simple?", explicacion: "Un instrumento sencillo para auscultar elementos de la red apoyándolo sobre ellos.", dificultad: "media", opciones: ["Un instrumento sencillo para auscultar elementos de la red", "Un aparato para medir la presión exacta en un punto de la red", "Un aparato para purgar el aire acumulado en la conducción", "Un aparato para facturar el consumo del sector afectado"], correcta: 0 },
  { enunciado: "¿Qué ventaja aporta un geófono electrónico frente a un bastón de escucha mecánico?", explicacion: "Amplifica y filtra el sonido, distinguiendo mejor la fuga del ruido ambiente.", dificultad: "media", opciones: ["Amplifica y filtra el sonido, distinguiendo mejor la fuga", "Repara automáticamente la fuga una vez detectada su posición", "Elimina por completo la necesidad de excavar para reparar", "Sustituye por completo la necesidad del análisis de caudales"], correcta: 0 },
  { enunciado: "¿Cómo varía el ruido detectado al acercarse al punto exacto de una fuga?", explicacion: "Aumenta progresivamente de intensidad hasta el máximo sobre el punto de rotura.", dificultad: "media", opciones: ["Aumenta progresivamente hasta el máximo sobre la fuga", "Disminuye progresivamente hasta desaparecer sobre la fuga", "Se mantiene exactamente constante en toda la zona explorada", "Desaparece por completo al acercarse al punto de fuga"], correcta: 0 },
  { enunciado: "¿Qué factor puede dificultar especialmente el uso del método acústico en una tubería concreta?", explicacion: "El material plástico transmite peor el sonido que el metálico.", dificultad: "dificil", opciones: ["Que la tubería sea de un material plástico, que transmite peor el sonido", "Que la tubería sea de fundición dúctil, que transmite mejor el sonido", "Que la fuga sea de gran caudal, lo que dificulta siempre su detección", "Que la avería se produzca durante el horario diurno de trabajo"], correcta: 0 },
]);

const S3 = "otros-metodos-deteccion-localizacion-averias";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿En qué consiste la correlación acústica para localizar fugas?", reverso: "En colocar dos sensores a ambos lados de la zona sospechosa (por ejemplo, en dos válvulas o hidrantes) y comparar electrónicamente el tiempo que tarda el sonido de la fuga en llegar a cada sensor, calculando así la distancia exacta a la fuga desde cada punto" },
  { anverso: "¿En qué consiste el método del gas trazador para localizar fugas?", reverso: "En introducir en la conducción (previamente vaciada de agua a presión) un gas inocuo y de fácil detección (como una mezcla de hidrógeno), que escapa por la fisura y se detecta en superficie con un aparato sensible a ese gas, localizando así el punto exacto de la fuga" },
  { anverso: "¿En qué consiste la termografía aplicada a la detección de fugas?", reverso: "En el uso de cámaras que detectan diferencias de temperatura superficial del terreno, ya que una fuga de agua puede generar zonas de humedad con una temperatura distinta a la del entorno seco, visibles con este tipo de cámaras" },
  { anverso: "¿Qué ventaja tiene el método del gas trazador frente al método acústico en materiales que transmiten mal el sonido, como el polietileno?", reverso: "No depende de la transmisión del sonido a través del material de la tubería, por lo que resulta especialmente útil quatndo el método acústico da resultados poco fiables por el tipo de material o por el ruido ambiente" },
  { anverso: "¿Por qué conviene combinar varios métodos de detección de averías en lugar de emplear uno solo de forma exclusiva?", reverso: "Porque cada método tiene limitaciones distintas (ruido ambiente, tipo de material, profundidad, coste o tiempo de preparación), y su combinación permite contrastar resultados y aumentar la fiabilidad de la localización antes de excavar" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿En qué consiste la correlación acústica para localizar fugas?", explicacion: "Comparar el tiempo de llegada del sonido a dos sensores para calcular la distancia a la fuga.", dificultad: "dificil", opciones: ["Comparar el tiempo de llegada del sonido a dos sensores", "Medir exclusivamente el caudal de entrada de un único sector", "Analizar exclusivamente muestras de agua tomadas en laboratorio", "Comparar la factura del consumo de dos abonados distintos"], correcta: 0 },
  { enunciado: "¿En qué consiste el método del gas trazador para localizar fugas?", explicacion: "Introducir un gas inocuo en la conducción y detectarlo en superficie donde escapa.", dificultad: "media", opciones: ["Introducir un gas inocuo en la conducción y detectarlo en superficie", "Introducir un colorante permanente en el agua de la conducción", "Aumentar de forma artificial la presión de toda la conducción", "Vaciar por completo el sector durante un mes para observarlo"], correcta: 0 },
  { enunciado: "¿En qué se basa la termografía aplicada a la detección de fugas?", explicacion: "En detectar diferencias de temperatura superficial causadas por la humedad de la fuga.", dificultad: "media", opciones: ["En detectar diferencias de temperatura superficial del terreno", "En medir el sonido generado por el agua al escapar a presión", "En medir el caudal exacto de entrada de un sector concreto", "En analizar la composición química del agua de la conducción"], correcta: 0 },
  { enunciado: "¿Qué ventaja tiene el gas trazador frente al método acústico en tuberías de polietileno?", explicacion: "No depende de la transmisión del sonido a través del material.", dificultad: "dificil", opciones: ["No depende de la transmisión del sonido a través del material", "Es siempre más rápido de aplicar que el método acústico", "No requiere en ningún caso vaciar previamente la conducción", "Elimina por completo la necesidad de excavar tras la localización"], correcta: 0 },
  { enunciado: "¿Por qué conviene combinar varios métodos de detección de averías?", explicacion: "Porque cada método tiene limitaciones distintas y su combinación aumenta la fiabilidad.", dificultad: "media", opciones: ["Porque cada método tiene limitaciones distintas y se complementan", "Porque la normativa exige aplicar como mínimo tres métodos distintos", "Porque un único método siempre resulta más caro que combinar varios", "No existe ninguna ventaja real en combinar distintos métodos"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 17 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 17, orden: 17, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-197 creado y vinculado como Tema 17 de Oficial Guardallaves.");
