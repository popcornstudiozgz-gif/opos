/**
 * Crea tema-185: "Sistema de climatización en vehículos" — Tema 21
 * (numero=21, bloque-2) de Oficial Mecánico.
 *
 * Corresponde al TEMA 19 oficial: "Sistema de climatización en
 * vehículos."
 *
 * El circuito frigorífico y sus componentes son conocimiento técnico
 * consolidado del automóvil, sin una ley española que los regule como
 * tales. La sección 3, sobre gases refrigerantes, sí tiene normativa
 * pública real y verificada mediante búsqueda expresa en esta sesión:
 * el Reglamento (UE) nº 517/2014 sobre gases fluorados de efecto
 * invernadero y su desarrollo en España mediante el RD 115/2017, de 17
 * de febrero (BOE-A-2017-1679), que exige certificación profesional
 * para manipular estos gases — coincide, además, con el requisito de
 * titulación de la propia convocatoria de Oficial Mecánico (base
 * 2.2.1.4: certificado de profesionalidad de manipulación de
 * refrigerantes fluorados en vehículos). El propio RD 115/2017 remite,
 * para el personal que recupera gases de climatizadores de vehículos
 * en centros autorizados, al Reglamento (CE) nº 307/2008.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-185-climatizacion-vehiculos.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-185";
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
  titulo: "Sistema de climatización en vehículos",
  descripcion: "El principio de funcionamiento del circuito frigorífico, sus componentes y mantenimiento, y la normativa de gases refrigerantes fluorados y su manipulación profesional.",
  contenido: "Desarrolla el sistema de climatización (aire acondicionado) del automóvil: el principio de funcionamiento del circuito frigorífico, sus componentes principales (compresor, condensador, evaporador, válvula de expansión) y su mantenimiento, y la normativa sobre gases refrigerantes fluorados de efecto invernadero, cuya manipulación profesional exige una certificación específica regulada por el Reglamento (UE) nº 517/2014 y su desarrollo español, el Real Decreto 115/2017.",
  enlaces_boe: [
    { url: "https://www.boe.es/buscar/doc.php?id=BOE-A-2017-1679", titulo: "Real Decreto 115/2017 — gases fluorados y equipos basados en los mismos" },
  ],
  indice_estudio: [
    { url: "", titulo: "Principio de funcionamiento del circuito frigorífico", seccion: "circuito-frigorifico-principio-funcionamiento", articulos: "Conceptos fundamentales" },
    { url: "", titulo: "Componentes de la climatización y su mantenimiento", seccion: "componentes-climatizacion-mantenimiento", articulos: "Conceptos fundamentales" },
    { url: "https://www.boe.es/buscar/doc.php?id=BOE-A-2017-1679", titulo: "Gases refrigerantes: normativa y manipulación profesional", seccion: "gases-refrigerantes-normativa-manipulacion", articulos: "RD 115/2017" },
  ],
}]);

const S1 = "circuito-frigorifico-principio-funcionamiento";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Cuál es el principio físico en el que se basa el circuito frigorífico del aire acondicionado del automóvil?", reverso: "Un gas refrigerante absorbe calor al evaporarse (cambiar de líquido a gas) a baja presión, y lo cede al condensarse (cambiar de gas a líquido) a alta presión, permitiendo trasladar calor desde el interior del habitáculo hacia el exterior del vehículo" },
  { anverso: "¿Cuáles son las cuatro fases básicas del ciclo frigorífico?", reverso: "Compresión (el compresor eleva la presión y temperatura del gas), condensación (el gas cede calor al exterior y se licúa), expansión (el líquido pierde presión bruscamente en la válvula de expansión) y evaporación (el líquido absorbe calor del habitáculo y se evapora)" },
  { anverso: "¿Por qué el aire que sale por las rejillas del climatizador está frío, en términos del ciclo frigorífico?", reverso: "Porque el aire del habitáculo pasa a través del evaporador, cediendo su calor al refrigerante líquido que se está evaporando en su interior a baja presión, y saliendo por tanto más frío hacia el habitáculo" },
  { anverso: "¿Qué relación existe entre la presión y la temperatura de cambio de estado de un gas refrigerante?", reverso: "A mayor presión, mayor es la temperatura a la que el refrigerante cambia de estado (se condensa o se evapora); el circuito frigorífico aprovecha precisamente esta relación, variando la presión del refrigerante en distintos puntos del circuito para controlar dónde absorbe y dónde cede calor" },
  { anverso: "¿Por qué el sistema de climatización de un vehículo también contribuye a desempañar los cristales, incluso sin necesidad de calefacción?", reverso: "Porque al pasar por el evaporador, el aire no solo se enfría sino que también se deshumidifica (el vapor de agua se condensa sobre la superficie fría del evaporador), reduciendo la humedad del aire que después se dirige hacia el parabrisas" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿En qué principio físico se basa el circuito frigorífico del aire acondicionado?", explicacion: "Un gas absorbe calor al evaporarse a baja presión y lo cede al condensarse a alta presión.", dificultad: "media", opciones: ["Un gas absorbe calor al evaporarse y lo cede al condensarse", "Un gas siempre mantiene la misma temperatura en cualquier estado", "El aire acondicionado no se basa en ningún principio físico concreto", "Un gas nunca cambia de temperatura al cambiar de presión"], correcta: 0 },
  { enunciado: "¿Cuáles son las cuatro fases básicas del ciclo frigorífico?", explicacion: "Compresión, condensación, expansión y evaporación.", dificultad: "media", opciones: ["Compresión, condensación, expansión y evaporación", "Admisión, compresión, explosión y escape", "Carga, descarga, filtrado y regeneración", "Aspiración, impulsión, filtrado y refrigeración"], correcta: 0 },
  { enunciado: "¿Por qué el aire que sale por las rejillas del climatizador está frío?", explicacion: "Porque pasa a través del evaporador, cediendo calor al refrigerante que se evapora en su interior.", dificultad: "media", opciones: ["Pasa por el evaporador, cediendo calor al refrigerante", "El aire se enfría exclusivamente por la velocidad del ventilador", "El aire se enfría al pasar por el compresor del sistema", "El aire nunca cambia realmente de temperatura en este sistema"], correcta: 0 },
  { enunciado: "¿Qué relación existe entre presión y temperatura de cambio de estado de un refrigerante?", explicacion: "A mayor presión, mayor es la temperatura a la que el refrigerante cambia de estado.", dificultad: "dificil", opciones: ["A mayor presión, mayor temperatura de cambio de estado", "La presión no influye en absoluto en la temperatura de cambio", "A mayor presión, siempre menor temperatura de cambio de estado", "El cambio de estado no depende nunca de la presión del sistema"], correcta: 0 },
  { enunciado: "¿Por qué el aire acondicionado ayuda también a desempañar los cristales?", explicacion: "El aire se deshumidifica al pasar por el evaporador frío, reduciendo la humedad que llega al parabrisas.", dificultad: "dificil", opciones: ["El aire se deshumidifica al pasar por el evaporador frío", "El aire acondicionado nunca influye en el empañamiento de cristales", "Solo la calefacción puede desempañar los cristales del vehículo", "El desempañado depende exclusivamente de la velocidad del vehículo"], correcta: 0 },
]);

const S2 = "componentes-climatizacion-mantenimiento";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es el compresor del sistema de climatización?", reverso: "El elemento, accionado habitualmente por una correa desde el motor (o eléctricamente en vehículos híbridos y eléctricos), que aspira el gas refrigerante a baja presión y lo comprime, elevando su presión y temperatura antes de enviarlo al condensador" },
  { anverso: "¿Qué es el condensador del sistema de climatización?", reverso: "Un intercambiador de calor, situado habitualmente junto al radiador del motor y expuesto al aire exterior, donde el refrigerante a alta presión cede calor al ambiente y se condensa, pasando de gas a líquido" },
  { anverso: "¿Qué es la válvula de expansión (o el tubo de orificio, según el sistema)?", reverso: "El elemento que provoca una caída brusca de presión del refrigerante líquido justo antes de entrar en el evaporador, lo que reduce también su temperatura y prepara el refrigerante para absorber calor eficazmente" },
  { anverso: "¿Qué es el evaporador del sistema de climatización?", reverso: "Un intercambiador de calor, situado en el interior del salpicadero, por el que circula el aire que se dirige al habitáculo; el refrigerante, a baja presión y temperatura, se evapora en su interior absorbiendo el calor del aire que lo atraviesa, enfriándolo" },
  { anverso: "¿Por qué es recomendable hacer funcionar el aire acondicionado periódicamente, incluso en invierno?", reverso: "Porque el compresor necesita lubricarse con el aceite que circula disuelto en el propio refrigerante; un periodo muy prolongado sin uso puede resecar las juntas y retenes del sistema, favoreciendo fugas de gas refrigerante" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué función cumple el compresor del sistema de climatización?", explicacion: "Aspira el gas refrigerante a baja presión y lo comprime, elevando su presión y temperatura.", dificultad: "media", opciones: ["Aspira el gas y lo comprime elevando presión y temperatura", "Enfría el refrigerante hasta condensarlo a líquido", "Reduce bruscamente la presión del refrigerante líquido", "Absorbe el calor del aire del habitáculo directamente"], correcta: 0 },
  { enunciado: "¿Qué función cumple el condensador del sistema de climatización?", explicacion: "El refrigerante a alta presión cede calor al ambiente exterior y se condensa a líquido.", dificultad: "media", opciones: ["El refrigerante cede calor al ambiente y se condensa a líquido", "Comprime el gas refrigerante elevando su presión", "Reduce bruscamente la presión del refrigerante líquido", "Absorbe el calor del aire del habitáculo directamente"], correcta: 0 },
  { enunciado: "¿Qué función cumple la válvula de expansión?", explicacion: "Provoca una caída brusca de presión del refrigerante líquido antes del evaporador.", dificultad: "media", opciones: ["Provoca una caída brusca de presión antes del evaporador", "Comprime el gas refrigerante elevando su presión", "Condensa el refrigerante cediendo calor al exterior", "Filtra las impurezas presentes en el refrigerante"], correcta: 0 },
  { enunciado: "¿Qué función cumple el evaporador del sistema de climatización?", explicacion: "El refrigerante se evapora absorbiendo el calor del aire del habitáculo, enfriándolo.", dificultad: "media", opciones: ["El refrigerante se evapora absorbiendo calor del aire del habitáculo", "Comprime el gas refrigerante elevando su presión", "Condensa el refrigerante cediendo calor al exterior", "Reduce bruscamente la presión del refrigerante líquido"], correcta: 0 },
  { enunciado: "¿Por qué es recomendable hacer funcionar el aire acondicionado periódicamente, incluso en invierno?", explicacion: "El compresor necesita lubricarse; un periodo prolongado sin uso puede resecar juntas y retenes, favoreciendo fugas.", dificultad: "dificil", opciones: ["Evita que se resequen juntas y retenes, favoreciendo fugas", "No existe ninguna razón técnica real para esta recomendación", "Solo es relevante en climas muy cálidos, nunca en invierno", "El compresor nunca requiere ningún tipo de lubricación"], correcta: 0 },
]);

const S3 = "gases-refrigerantes-normativa-manipulacion";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué son los gases fluorados de efecto invernadero (gases F), como los refrigerantes empleados en el aire acondicionado de los vehículos?", reverso: "Un grupo de gases de origen industrial (entre ellos los hidrofluorocarburos, HFC, usados como refrigerantes) que, aunque no dañan la capa de ozono, tienen un elevado potencial de calentamiento atmosférico si se liberan a la atmósfera, por lo que su uso y manipulación están regulados" },
  { anverso: "¿Qué reglamento europeo regula los gases fluorados de efecto invernadero, incluidos los empleados en climatización de vehículos?", reverso: "El Reglamento (UE) nº 517/2014, sobre gases fluorados de efecto invernadero, que establece obligaciones de control de fugas, recuperación del gas y certificación de los profesionales que los manipulan" },
  { anverso: "¿Qué norma española desarrolla el sistema de certificación de profesionales que manipulan gases fluorados, incluidos los del aire acondicionado de vehículos?", reverso: "El Real Decreto 115/2017, de 17 de febrero (BOE-A-2017-1679), que regula la comercialización y manipulación de gases fluorados y equipos basados en los mismos, así como la certificación de los profesionales que los utilizan" },
  { anverso: "¿Por qué está prohibido liberar el gas refrigerante del climatizador de un vehículo directamente a la atmósfera al intervenir en el sistema?", reverso: "Porque, al tratarse de un gas fluorado de efecto invernadero, su liberación intencionada a la atmósfera está prohibida por la normativa vigente; debe recuperarse siempre con un equipo específico de recuperación de gases refrigerantes, para su reciclaje o destrucción controlada" },
  { anverso: "¿Qué certificación profesional exige la normativa para poder manipular el circuito de gases fluorados del aire acondicionado de un vehículo?", reverso: "Un certificado de profesionalidad o cualificación específica que acredite la competencia para la manipulación de refrigerantes fluorados destinados a confort térmico en vehículos, conforme a lo exigido por el RD 115/2017; sin esa certificación, no está permitido intervenir en el circuito de gas" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué son los gases fluorados de efecto invernadero (gases F)?", explicacion: "Gases con un elevado potencial de calentamiento atmosférico, aunque no dañan la capa de ozono.", dificultad: "media", opciones: ["Gases con elevado potencial de calentamiento atmosférico", "Gases que dañan directamente la capa de ozono", "Gases sin ningún efecto relevante sobre el clima", "Gases exclusivos del sistema de escape de los vehículos"], correcta: 0 },
  { enunciado: "¿Qué reglamento europeo regula los gases fluorados de efecto invernadero?", explicacion: "El Reglamento (UE) nº 517/2014.", dificultad: "media", opciones: ["El Reglamento (UE) nº 517/2014", "El Reglamento (CE) nº 715/2007 de emisiones Euro", "El Reglamento (UE) nº 168/2013 de vehículos", "No existe ningún reglamento europeo sobre esta materia"], correcta: 0 },
  { enunciado: "¿Qué norma española desarrolla la certificación de profesionales que manipulan gases fluorados?", explicacion: "El Real Decreto 115/2017, de 17 de febrero (BOE-A-2017-1679).", dificultad: "media", opciones: ["El Real Decreto 115/2017, de 17 de febrero", "El Real Decreto 842/2002, de 2 de agosto (REBT)", "El Real Decreto 1215/1997, de equipos de trabajo", "No existe ninguna norma española sobre esta materia"], correcta: 0 },
  { enunciado: "¿Por qué está prohibido liberar el gas refrigerante a la atmósfera al intervenir en el climatizador de un vehículo?", explicacion: "Es un gas fluorado de efecto invernadero cuya liberación intencionada está prohibida; debe recuperarse con equipo específico.", dificultad: "dificil", opciones: ["Es un gas de efecto invernadero cuya liberación está prohibida", "No existe ninguna restricción legal sobre la liberación de este gas", "Solo está prohibido liberarlo en interiores, no al aire libre", "El gas refrigerante no tiene ningún efecto ambiental relevante"], correcta: 0 },
  { enunciado: "¿Qué se requiere para poder manipular legalmente el circuito de gases fluorados del aire acondicionado de un vehículo?", explicacion: "Un certificado de profesionalidad o cualificación específica que acredite la competencia para manipular refrigerantes fluorados en vehículos.", dificultad: "media", opciones: ["Un certificado de profesionalidad específico para refrigerantes fluorados", "No se requiere ninguna certificación específica para esta tarea", "Basta con la formación general de mecánica de automoción", "Solo se requiere certificación en instalaciones fijas, no en vehículos"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 21 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 21, orden: 21, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-185 creado y vinculado como Tema 21 de Oficial Mecánico.");
