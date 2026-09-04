/**
 * Crea tema-290: "Bombas y grupos de presión" — Tema 14 (numero=14,
 * bloque-2) de Oficial Fontanero (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 12 oficial del Anexo I (bases1716.pdf, línea 537):
 * "Bombas y grupos de presión. Tipos y funcionamiento de las bombas,
 * componentes de un grupo de presión."
 *
 * Sourcing: tipos y funcionamiento de bombas centrífugas — conocimiento
 * técnico consolidado del oficio, verificado con búsqueda previa (curva
 * característica, cebado, altura de aspiración). Componentes del grupo de
 * presión convencional y de accionamiento regulable: CTE DB-HS4, apartado
 * 3.2.1.5.1 (Sistemas de sobreelevación), texto oficial ya descargado de
 * codigotecnico.org en esta sesión (mismo documento usado en tema-284,
 * tema-285 y tema-288).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-290-bombas-grupos-presion.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-290";
const OPOSICION = "oficial-fontanero-ayto-zaragoza";
const BLOQUE_2_ID = "417e77bc-e7ac-4984-ae49-3a35de79350d";

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
  titulo: "Bombas y grupos de presión",
  descripcion: "Tipos y funcionamiento de las bombas centrífugas: impulsor, altura manométrica, curva característica, cebado. Componentes del grupo de presión convencional (depósito auxiliar, equipo de bombeo, depósito de membrana) y del grupo de accionamiento regulable (variador de frecuencia).",
  contenido: "Desarrolla las bombas empleadas en fontanería y los grupos de presión que las integran: los tipos de bombas y su funcionamiento (bomba centrífuga, impulsor, altura manométrica, curva característica, cebado y altura de aspiración), y los componentes de un grupo de presión convencional (depósito auxiliar de alimentación, equipo de bombeo con dos bombas en paralelo, depósitos de presión con membrana) y de un grupo de accionamiento regulable o de caudal variable, conforme al CTE DB-HS4.",
  enlaces_boe: [
    { url: "https://www.codigotecnico.org/pdf/Documentos/HS/DBHS.pdf", titulo: "CTE, Documento Básico HS Salubridad, Sección HS4, apartado 3.2.1.5.1 (Sistemas de sobreelevación: grupos de presión)" },
  ],
  indice_estudio: [
    { url: "", titulo: "Tipos y funcionamiento de las bombas", seccion: "tipos-y-funcionamiento-de-las-bombas", articulos: "Conocimiento técnico del oficio" },
    { url: "https://www.codigotecnico.org/pdf/Documentos/HS/DBHS.pdf", titulo: "El grupo de presión convencional", seccion: "el-grupo-de-presion-convencional", articulos: "CTE DB-HS4, apartado 3.2.1.5.1.a" },
    { url: "https://www.codigotecnico.org/pdf/Documentos/HS/DBHS.pdf", titulo: "El grupo de accionamiento regulable", seccion: "el-grupo-de-accionamiento-regulable", articulos: "CTE DB-HS4, apartado 3.2.1.5.1.b" },
  ],
}]);

const S1 = "tipos-y-funcionamiento-de-las-bombas";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es una bomba centrífuga y cómo transmite energía al agua?", reverso: "Una bomba con un rodete o impulsor giratorio que, al rotar, comunica energía cinética al agua, transformándola después en energía de presión al frenarse el flujo en la voluta o carcasa de la bomba" },
  { anverso: "¿Qué es la curva característica de una bomba?", reverso: "La representación gráfica de la relación entre la altura manométrica (o carga) que es capaz de dar la bomba y el caudal que suministra a esa altura, a una velocidad de giro determinada del impulsor: a mayor caudal exigido, menor altura disponible, y viceversa" },
  { anverso: "¿Qué es el cebado de una bomba y por qué es necesario en algunos tipos de bombas?", reverso: "Es el llenado previo de agua del cuerpo de la bomba y de la tubería de aspiración, necesario porque una bomba centrífuga convencional no puede aspirar aire de forma eficaz: sin cebar, gira en vacío y no impulsa agua" },
  { anverso: "¿Qué diferencia a una bomba autocebante de una que no lo es?", reverso: "La bomba autocebante es capaz de purgar por sí misma el aire de la tubería de aspiración y cebarse automáticamente al ponerse en marcha, sin necesidad de que el operario la llene de agua manualmente antes de arrancarla" },
  { anverso: "¿Qué es la altura de aspiración de una bomba?", reverso: "La diferencia de nivel, en metros, entre el eje de la rueda impulsora de la bomba y el nivel del líquido en el depósito inferior del que aspira, sin contar las pérdidas de carga de la tubería de aspiración" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Cómo transmite energía al agua una bomba centrífuga?", explicacion: "Mediante un rodete/impulsor giratorio que comunica energía cinética, convertida después en presión.", dificultad: "facil", opciones: ["Mediante un rodete o impulsor giratorio que comunica energía cinética al agua", "Exclusivamente mediante la gravedad, sin ningún elemento giratorio", "Exclusivamente mediante compresión de aire, sin ningún rodete", "Exclusivamente mediante calentamiento del agua a alta temperatura"], correcta: 0 },
  { enunciado: "¿Qué representa la curva característica de una bomba?", explicacion: "La relación entre altura manométrica y caudal a una velocidad de giro dada.", dificultad: "media", opciones: ["La relación entre la altura manométrica y el caudal que suministra la bomba", "Exclusivamente el consumo eléctrico de la bomba en cualquier condición", "Exclusivamente el nivel de ruido que produce la bomba en funcionamiento", "Exclusivamente el peso y las dimensiones físicas de la bomba"], correcta: 0 },
  { enunciado: "¿Qué es el cebado de una bomba centrífuga convencional?", explicacion: "El llenado previo de agua del cuerpo de la bomba y la aspiración, necesario porque no aspira aire eficazmente.", dificultad: "media", opciones: ["El llenado previo de agua del cuerpo de la bomba y de la tubería de aspiración", "El vaciado completo de la bomba antes de cada puesta en marcha", "La sustitución periódica del rodete o impulsor de la bomba", "La instalación de una válvula antirretorno en la impulsión de la bomba"], correcta: 0 },
  { enunciado: "¿Qué caracteriza a una bomba autocebante?", explicacion: "Se ceba automáticamente, purgando el aire de la aspiración sin intervención manual.", dificultad: "dificil", opciones: ["Se ceba automáticamente, purgando el aire de la tubería de aspiración sin intervención manual", "Nunca requiere ningún tipo de cebado en ninguna circunstancia", "Solo puede emplearse en instalaciones de agua caliente sanitaria", "Requiere siempre más cebado manual que una bomba convencional"], correcta: 0 },
  { enunciado: "¿Qué es la altura de aspiración de una bomba?", explicacion: "La diferencia de nivel entre el eje del rodete y el nivel del líquido en el depósito inferior.", dificultad: "dificil", opciones: ["La diferencia de nivel entre el eje del rodete y el nivel del líquido en el depósito inferior", "La altura total del edificio al que abastece la bomba", "El diámetro de la tubería de impulsión de la bomba", "La presión máxima que puede alcanzar la bomba en cualquier condición"], correcta: 0 },
]);

const S2 = "el-grupo-de-presion-convencional";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "Según el CTE DB-HS4, ¿qué elementos debe tener, como mínimo, un grupo de presión de tipo convencional?", reverso: "Depósito auxiliar de alimentación, equipo de bombeo (al menos dos bombas de iguales prestaciones y funcionamiento alterno, montadas en paralelo), y depósitos de presión con membrana conectados a dispositivos de valoración de la presión" },
  { anverso: "¿Qué función cumple el depósito auxiliar de alimentación de un grupo de presión convencional?", reverso: "Evitar que el equipo de bombeo tome el agua directamente de la red de suministro, actuando como depósito intermedio del que aspiran las bombas" },
  { anverso: "¿Por qué debe el equipo de bombeo de un grupo convencional tener al menos dos bombas de funcionamiento alterno?", reverso: "Para garantizar el servicio de forma continuada: si una bomba falla o está en mantenimiento, la otra puede seguir suministrando presión sin interrumpir el abastecimiento" },
  { anverso: "¿Qué función cumple el depósito de presión con membrana en un grupo convencional?", reverso: "Mantener la presión de la instalación entre unos límites, permitiendo la puesta en marcha y parada automáticas de las bombas según los parámetros de presión detectados, y amortiguar además los golpes de ariete" },
  { anverso: "¿Dónde debe instalarse el grupo de presión, según el CTE DB-HS4, y qué otro sistema puede compartir ese espacio?", reverso: "En un local de uso exclusivo, con dimensiones suficientes para su mantenimiento; ese local puede albergar también el sistema de tratamiento de agua, si lo hubiera" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué elementos mínimos debe tener un grupo de presión de tipo convencional según el CTE DB-HS4?", explicacion: "Depósito auxiliar, equipo de bombeo con al menos 2 bombas en paralelo, y depósitos de presión con membrana.", dificultad: "media", opciones: ["Depósito auxiliar, equipo de bombeo con al menos dos bombas en paralelo, y depósitos de presión con membrana", "Únicamente una bomba individual, sin ningún depósito auxiliar ni de membrana", "Únicamente un depósito de membrana, sin ningún equipo de bombeo", "Únicamente un variador de frecuencia, sin ninguna bomba física instalada"], correcta: 0 },
  { enunciado: "¿Qué función cumple el depósito auxiliar de alimentación de un grupo de presión convencional?", explicacion: "Evitar que las bombas tomen el agua directamente de la red.", dificultad: "media", opciones: ["Evitar que el equipo de bombeo tome el agua directamente de la red de suministro", "Medir el caudal exacto de agua que entra en el grupo de presión", "Filtrar las partículas sólidas del agua antes de su entrada en el edificio", "Amortiguar exclusivamente el ruido generado por las bombas en funcionamiento"], correcta: 0 },
  { enunciado: "¿Por qué el equipo de bombeo de un grupo convencional debe tener al menos dos bombas de funcionamiento alterno?", explicacion: "Para garantizar el servicio de forma continuada ante fallo o mantenimiento de una de ellas.", dificultad: "facil", opciones: ["Para garantizar el servicio de forma continuada si una de las bombas falla o está en mantenimiento", "Porque el CTE DB-HS4 prohíbe expresamente instalar una única bomba en cualquier circunstancia", "Para duplicar exactamente el caudal máximo que puede suministrar una sola bomba", "Porque una sola bomba nunca sería capaz de cebarse correctamente"], correcta: 0 },
  { enunciado: "¿Qué función cumple el depósito de presión con membrana en un grupo convencional?", explicacion: "Mantener la presión entre límites y permitir arranque/parada automáticos, amortiguando además el golpe de ariete.", dificultad: "dificil", opciones: ["Mantener la presión entre límites, permitir el arranque/parada automáticos de las bombas y amortiguar el golpe de ariete", "Medir exclusivamente el consumo eléctrico total del grupo de presión", "Filtrar exclusivamente las partículas sólidas del agua de la instalación", "Impedir por completo cualquier tipo de arranque automático de las bombas"], correcta: 0 },
  { enunciado: "¿Dónde debe instalarse el grupo de presión según el CTE DB-HS4?", explicacion: "En un local de uso exclusivo, con dimensiones suficientes para su mantenimiento.", dificultad: "media", opciones: ["En un local de uso exclusivo, con dimensiones suficientes para su mantenimiento", "En cualquier punto visible de la fachada del edificio, sin ninguna exigencia de local específico", "Exclusivamente en la azotea del edificio, sin excepción posible", "En el interior de la vivienda del punto de consumo más desfavorable"], correcta: 0 },
]);

const S3 = "el-grupo-de-accionamiento-regulable";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un grupo de presión de accionamiento regulable, también llamado de caudal variable?", reverso: "Un grupo de presión que incorpora un variador de frecuencia que acciona las bombas manteniendo constante la presión de salida, con independencia del caudal solicitado o disponible en cada momento" },
  { anverso: "¿Puede un grupo de accionamiento regulable prescindir del depósito auxiliar de alimentación exigido en el grupo convencional?", reverso: "Sí: el CTE DB-HS4 permite que el grupo de accionamiento regulable prescinda del depósito auxiliar de alimentación, a diferencia del grupo convencional, que sí lo exige" },
  { anverso: "¿Qué papel cumple una de las bombas del grupo de accionamiento regulable de forma específica?", reverso: "Mantiene la parte de caudal necesario para el mantenimiento de la presión adecuada, mientras el variador de frecuencia ajusta la velocidad de giro según la demanda real" },
  { anverso: "¿Qué ventaja práctica aporta el variador de frecuencia de un grupo de caudal variable frente a un grupo convencional de arranque y parada?", reverso: "Adapta la velocidad de las bombas a la demanda real en cada momento, evitando los ciclos bruscos de arranque y parada del grupo convencional y ajustando mejor el consumo eléctrico a la necesidad real" },
  { anverso: "¿Qué tienen en común, pese a sus diferencias, el grupo de presión convencional y el de accionamiento regulable, según el CTE DB-HS4?", reverso: "Ambos deben poder suministrar a las zonas del edificio alimentables con la presión de red, sin necesidad de poner en marcha el grupo, y ambos deben instalarse en un local con dimensiones suficientes para su mantenimiento" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué caracteriza a un grupo de presión de accionamiento regulable o caudal variable?", explicacion: "Incorpora un variador de frecuencia que mantiene constante la presión de salida.", dificultad: "media", opciones: ["Incorpora un variador de frecuencia que mantiene constante la presión de salida con independencia del caudal", "Carece por completo de cualquier tipo de bomba, funcionando exclusivamente por gravedad", "Solo puede instalarse en edificios de una única planta, sin excepción posible", "Requiere siempre más de cuatro bombas montadas en paralelo, a diferencia del convencional"], correcta: 0 },
  { enunciado: "¿Puede el grupo de accionamiento regulable prescindir del depósito auxiliar de alimentación exigido en el convencional?", explicacion: "Sí, según el CTE DB-HS4.", dificultad: "media", opciones: ["Sí, el CTE DB-HS4 permite esa posibilidad en el grupo de accionamiento regulable", "No, ambos tipos de grupo exigen exactamente los mismos elementos sin excepción", "No, el depósito auxiliar es exclusivo del grupo de accionamiento regulable", "Sí, pero solo si el grupo de accionamiento regulable carece de cualquier bomba"], correcta: 0 },
  { enunciado: "¿Qué función cumple una de las bombas del grupo de accionamiento regulable de forma específica?", explicacion: "Mantiene el caudal necesario para conservar la presión adecuada.", dificultad: "dificil", opciones: ["Mantiene la parte de caudal necesario para el mantenimiento de la presión adecuada", "Actúa exclusivamente como bomba de reserva, sin funcionar nunca en condiciones normales", "Se dedica en exclusiva a la purga de aire de todo el sistema de presión", "Sustituye por completo al variador de frecuencia en cualquier circunstancia"], correcta: 0 },
  { enunciado: "¿Qué ventaja aporta el variador de frecuencia frente a un grupo convencional de arranque y parada?", explicacion: "Adapta la velocidad a la demanda real, evitando ciclos bruscos de arranque/parada.", dificultad: "media", opciones: ["Adapta la velocidad de las bombas a la demanda real, evitando ciclos bruscos de arranque y parada", "Elimina por completo la necesidad de cualquier bomba física en la instalación", "Reduce a cero el consumo eléctrico total del grupo de presión en cualquier condición", "Impide por completo que el grupo de presión pueda suministrar caudal variable"], correcta: 0 },
  { enunciado: "¿Qué exigencia comparten el grupo de presión convencional y el de accionamiento regulable, según el CTE DB-HS4?", explicacion: "Ambos deben instalarse en un local con dimensiones suficientes para su mantenimiento.", dificultad: "dificil", opciones: ["Ambos deben instalarse en un local con dimensiones suficientes para su mantenimiento", "Ambos deben prescindir obligatoriamente de cualquier depósito auxiliar de alimentación", "Ambos deben carecer obligatoriamente de válvulas antirretorno en su instalación", "Ambos deben instalarse exclusivamente en la azotea del edificio, sin excepción"], correcta: 0 },
]);

console.log(`📖 glosario...`);
await insertar("glosario", [
  { tema_slug: TEMA, seccion: S1, termino: "Impulsor o rodete", definicion: "Elemento giratorio de una bomba centrífuga que comunica energía cinética al agua, transformada después en presión." },
  { tema_slug: TEMA, seccion: S1, termino: "Curva característica", definicion: "Representación gráfica de la relación entre altura manométrica y caudal que ofrece una bomba a una velocidad de giro determinada." },
  { tema_slug: TEMA, seccion: S2, termino: "Depósito auxiliar de alimentación", definicion: "Depósito intermedio de un grupo de presión convencional que evita que las bombas tomen el agua directamente de la red de suministro." },
  { tema_slug: TEMA, seccion: S2, termino: "Depósito de presión con membrana", definicion: "Elemento del grupo de presión que mantiene la presión de la instalación entre límites, permite el arranque/parada automáticos de las bombas y amortigua el golpe de ariete." },
  { tema_slug: TEMA, seccion: S3, termino: "Variador de frecuencia", definicion: "Dispositivo que ajusta la velocidad de giro de las bombas de un grupo de accionamiento regulable, manteniendo constante la presión de salida según la demanda real." },
  { tema_slug: TEMA, seccion: S3, termino: "Grupo de accionamiento regulable", definicion: "Grupo de presión de caudal variable que, mediante variador de frecuencia, puede prescindir del depósito auxiliar de alimentación exigido en el grupo convencional." },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 14 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 14, orden: 14, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-290 creado y vinculado como Tema 14 de Oficial Fontanero.");
