/**
 * Crea tema-292: "Red de evacuación y desagües" — Tema 16 (numero=16,
 * bloque-2) de Oficial Fontanero (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 14 oficial del Anexo I (bases1716.pdf, línea 541):
 * "Red de evacuación y desagües. Instalaciones, dimensionamiento y
 * materiales. CTE-HS5."
 *
 * Sourcing: CTE, Documento Básico HS Salubridad, Sección HS5 (Evacuación
 * de aguas) — texto oficial descargado íntegro de codigotecnico.org en
 * esta sesión (mismo documento que contiene la Sección HS4 ya usada en
 * temas anteriores): apartado 3.3.1.1 (cierres hidráulicos), 3.3.1.2
 * (redes de pequeña evacuación), 3.3.1.3-3.3.1.5 (bajantes, colectores y
 * arquetas) y 4.1.1.1 (tabla 4.1, unidades de desagüe por aparato).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-292-red-evacuacion-desagues.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-292";
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
  titulo: "Red de evacuación y desagües",
  descripcion: "Cierres hidráulicos (sifones, botes sifónicos) y redes de pequeña evacuación: distancias y pendientes exigidas. Bajantes y colectores, colgados y enterrados. Dimensionado por unidades de desagüe (UD) y ventilación primaria.",
  contenido: "Desarrolla la red de evacuación de aguas residuales conforme al CTE DB-HS5: los cierres hidráulicos que impiden el paso de gases desde la red hacia los locales habitados, las redes de pequeña evacuación y sus exigencias de distancia y pendiente, las bajantes y los colectores —colgados y enterrados— con sus elementos de conexión, y el procedimiento de dimensionado mediante unidades de desagüe (UD) junto con el sistema de ventilación primaria.",
  enlaces_boe: [
    { url: "https://www.codigotecnico.org/pdf/Documentos/HS/DBHS.pdf", titulo: "CTE, Documento Básico HS Salubridad, Sección HS5 (Evacuación de aguas)" },
  ],
  indice_estudio: [
    { url: "https://www.codigotecnico.org/pdf/Documentos/HS/DBHS.pdf", titulo: "Cierres hidráulicos y pequeña evacuación", seccion: "cierres-hidraulicos-y-pequena-evacuacion", articulos: "CTE DB-HS5, apartados 3.3.1.1 y 3.3.1.2" },
    { url: "https://www.codigotecnico.org/pdf/Documentos/HS/DBHS.pdf", titulo: "Bajantes y colectores", seccion: "bajantes-y-colectores", articulos: "CTE DB-HS5, apartados 3.3.1.3 a 3.3.1.5" },
    { url: "https://www.codigotecnico.org/pdf/Documentos/HS/DBHS.pdf", titulo: "Dimensionado (UD) y ventilación primaria", seccion: "dimensionado-ud-y-ventilacion-primaria", articulos: "CTE DB-HS5, tabla 4.1 y apartado 3.3.3.1" },
  ],
}]);

const S1 = "cierres-hidraulicos-y-pequena-evacuacion";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué función cumplen los cierres hidráulicos en una red de evacuación, según el CTE DB-HS5?", reverso: "Impedir el paso del aire (y de los gases mefíticos) contenido en la red de evacuación hacia los locales ocupados, sin afectar al flujo normal de los residuos" },
  { anverso: "¿Qué tipos de cierres hidráulicos contempla el CTE DB-HS5?", reverso: "Sifones individuales (propios de cada aparato), botes sifónicos (que pueden servir a varios aparatos), sumideros sifónicos, y arquetas sifónicas (en encuentros de conductos enterrados de pluviales y residuales)" },
  { anverso: "¿Cuál es la altura mínima de cierre hidráulico exigida por el CTE DB-HS5, y varía según el tipo de uso?", reverso: "Sí: 50 mm para usos continuos y 70 mm para usos discontinuos; la altura máxima en cualquier caso es de 100 mm" },
  { anverso: "¿Qué distancia máxima puede haber entre un bote sifónico y la bajante a la que se conecta, según el CTE DB-HS5?", reverso: "2,00 metros como máximo" },
  { anverso: "¿Qué inclinación mínima deben tener las uniones de los desagües a las bajantes, según el CTE DB-HS5?", reverso: "45 grados como mínimo, para favorecer una circulación más natural del agua hacia la bajante" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué función cumplen los cierres hidráulicos según el CTE DB-HS5?", explicacion: "Impedir el paso de gases de la red de evacuación a los locales ocupados.", dificultad: "facil", opciones: ["Impedir el paso del aire y los gases de la red de evacuación hacia los locales ocupados", "Aumentar la velocidad de circulación del agua residual en toda la red", "Medir el caudal exacto de aguas residuales evacuadas por cada aparato", "Filtrar las partículas sólidas del agua antes de su entrada en el edificio"], correcta: 0 },
  { enunciado: "¿Qué tipos de cierres hidráulicos contempla el CTE DB-HS5?", explicacion: "Sifones individuales, botes sifónicos, sumideros sifónicos y arquetas sifónicas.", dificultad: "media", opciones: ["Sifones individuales, botes sifónicos, sumideros sifónicos y arquetas sifónicas", "Únicamente válvulas antirretorno, sin ningún otro tipo de cierre hidráulico", "Únicamente contadores divisionarios, sin ningún otro tipo de cierre hidráulico", "Únicamente ventosas, sin ningún otro tipo de cierre hidráulico"], correcta: 0 },
  { enunciado: "¿Cuál es la altura mínima de cierre hidráulico para usos continuos, según el CTE DB-HS5?", explicacion: "50 mm.", dificultad: "media", opciones: ["50 mm", "70 mm", "100 mm", "10 mm"], correcta: 0 },
  { enunciado: "¿Qué distancia máxima puede haber entre un bote sifónico y la bajante a la que se conecta?", explicacion: "2,00 metros.", dificultad: "dificil", opciones: ["2,00 metros", "4,00 metros", "1,00 metro", "15,00 metros"], correcta: 0 },
  { enunciado: "¿Qué inclinación mínima deben tener las uniones de los desagües a las bajantes?", explicacion: "45 grados.", dificultad: "dificil", opciones: ["45º", "10º", "90º", "No se exige ninguna inclinación mínima"], correcta: 0 },
]);

const S2 = "bajantes-y-colectores";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Cómo debe ser el diámetro de una bajante a lo largo de toda su altura, según el CTE DB-HS5?", reverso: "Uniforme, sin disminuir en el sentido de la corriente, salvo excepciones justificadas por obstáculos insalvables; puede aumentar cuando acometan caudales de magnitud mucho mayor que los del tramo situado aguas arriba" },
  { anverso: "¿Qué pendiente mínima deben tener los colectores colgados, según el CTE DB-HS5?", reverso: "1% como mínimo" },
  { anverso: "¿Qué pendiente mínima deben tener los colectores enterrados, según el CTE DB-HS5, y en qué se diferencia de la de los colgados?", reverso: "2% como mínimo, superior a la exigida en los colectores colgados (1%), precisamente por transportar el agua sin la ayuda añadida de discurrir «colgados» con mayor libertad de trazado" },
  { anverso: "¿Cuántos colectores como máximo pueden acometer en un mismo punto de un colector colgado?", reverso: "No más de dos colectores" },
  { anverso: "¿Qué es la arqueta a pie de bajante, y qué característica NO debe tener?", reverso: "La arqueta que recibe la acometida de una bajante a la red enterrada; no debe ser de tipo sifónico" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Cómo debe ser el diámetro de una bajante a lo largo de toda su altura?", explicacion: "Uniforme, sin disminuir en el sentido de la corriente.", dificultad: "facil", opciones: ["Uniforme, sin disminuir en el sentido de la corriente", "Decreciente, reduciéndose progresivamente hacia la base de la bajante", "Variable sin ninguna restricción, según el criterio del instalador", "Siempre idéntico al diámetro de la acometida de saneamiento"], correcta: 0 },
  { enunciado: "¿Qué pendiente mínima deben tener los colectores colgados?", explicacion: "1% como mínimo.", dificultad: "media", opciones: ["1%", "2%", "5%", "10%"], correcta: 0 },
  { enunciado: "¿Qué pendiente mínima deben tener los colectores enterrados?", explicacion: "2% como mínimo, superior a la de los colgados.", dificultad: "media", opciones: ["2%", "1%", "10%", "0,5%"], correcta: 0 },
  { enunciado: "¿Cuántos colectores como máximo pueden acometer en un mismo punto de un colector colgado?", explicacion: "No más de dos.", dificultad: "dificil", opciones: ["No más de dos", "No más de cinco", "Un número ilimitado, sin ninguna restricción", "Solo uno, sin ninguna excepción posible"], correcta: 0 },
  { enunciado: "¿Qué característica NO debe tener la arqueta a pie de bajante?", explicacion: "No debe ser de tipo sifónico.", dificultad: "dificil", opciones: ["No debe ser de tipo sifónico", "No debe tener tapa practicable de ningún tipo", "No debe estar dispuesta sobre cimiento de hormigón", "No debe permitir el registro de la bajante en ningún caso"], correcta: 0 },
]);

const S3 = "dimensionado-ud-y-ventilacion-primaria";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es una Unidad de Desagüe (UD) en el método de dimensionado del CTE DB-HS5?", reverso: "Un valor convencional asignado a cada tipo de aparato sanitario que permite calcular el diámetro necesario de sifones, derivaciones, bajantes y colectores, sin tener que calcular directamente el caudal de cada aparato" },
  { anverso: "Según la tabla 4.1 del CTE DB-HS5, ¿varían las UD de un lavabo según el uso sea privado o público?", reverso: "Sí: 1 UD en uso privado, con diámetro mínimo de sifón y derivación de 32 mm, frente a 2 UD en uso público, con diámetro mínimo de 40 mm" },
  { anverso: "¿Cuántas UD se asignan a los desagües de tipo continuo o semicontinuo (equipos de climatización, bandejas de condensación), según el CTE DB-HS5?", reverso: "1 UD por cada 0,03 dm³/s de caudal estimado" },
  { anverso: "¿En qué edificios se considera suficiente la ventilación primaria como único sistema de ventilación de la red de evacuación, según el CTE DB-HS5?", reverso: "En edificios de menos de 7 plantas, o de menos de 11 si la bajante está sobredimensionada, y con ramales de desagüe de menos de 5 metros" },
  { anverso: "¿Cuánto debe prolongarse la bajante de aguas residuales por encima de la cubierta del edificio, según sea esta transitable o no, en el sistema de ventilación primaria?", reverso: "Al menos 1,30 m si la cubierta no es transitable, y al menos 2,00 m sobre el pavimento si la cubierta es transitable" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es una Unidad de Desagüe (UD) en el CTE DB-HS5?", explicacion: "Un valor convencional por aparato para calcular diámetros sin calcular el caudal directamente.", dificultad: "media", opciones: ["Un valor convencional asignado a cada aparato para calcular diámetros de sifones, derivaciones, bajantes y colectores", "Una unidad de medida de la presión del agua en la red de evacuación", "Una unidad de medida de la temperatura del agua residual evacuada", "Un sinónimo exacto del caudal instantáneo mínimo de agua fría de la tabla 2.1"], correcta: 0 },
  { enunciado: "Según la tabla 4.1 del CTE DB-HS5, ¿cuántas UD tiene un lavabo de uso privado?", explicacion: "1 UD (frente a 2 UD en uso público).", dificultad: "media", opciones: ["1 UD", "2 UD", "5 UD", "10 UD"], correcta: 0 },
  { enunciado: "¿Cuántas UD se asignan a un desagüe de tipo continuo o semicontinuo por cada 0,03 dm³/s de caudal estimado?", explicacion: "1 UD.", dificultad: "dificil", opciones: ["1 UD", "5 UD", "0,5 UD", "10 UD"], correcta: 0 },
  { enunciado: "¿En qué edificios se considera suficiente la ventilación primaria como único sistema?", explicacion: "En edificios de menos de 7 plantas (o 11 con bajante sobredimensionada) y ramales de menos de 5 m.", dificultad: "dificil", opciones: ["En edificios de menos de 7 plantas, o de menos de 11 con bajante sobredimensionada, con ramales de menos de 5 m", "En cualquier edificio, sin ninguna condición de altura ni de longitud de ramales", "Exclusivamente en edificios de una única planta, sin excepción posible", "Exclusivamente en edificios de más de 15 plantas de altura"], correcta: 0 },
  { enunciado: "¿Cuánto debe prolongarse la bajante de residuales sobre una cubierta NO transitable?", explicacion: "Al menos 1,30 m.", dificultad: "media", opciones: ["Al menos 1,30 m", "Al menos 2,00 m", "Al menos 0,50 m", "No se exige ninguna prolongación sobre la cubierta"], correcta: 0 },
]);

console.log(`📖 glosario...`);
await insertar("glosario", [
  { tema_slug: TEMA, seccion: S1, termino: "Bote sifónico", definicion: "Cierre hidráulico que puede dar servicio a varios aparatos sanitarios de un mismo cuarto húmedo, a diferencia de un sifón individual propio de un solo aparato." },
  { tema_slug: TEMA, seccion: S1, termino: "Cierre hidráulico", definicion: "Elemento (sifón, bote sifónico, sumidero o arqueta sifónica) que impide el paso de gases de la red de evacuación hacia los locales ocupados." },
  { tema_slug: TEMA, seccion: S2, termino: "Colector colgado", definicion: "Colector de la red de evacuación que discurre visto, habitualmente bajo forjado, con una pendiente mínima del 1%." },
  { tema_slug: TEMA, seccion: S2, termino: "Arqueta a pie de bajante", definicion: "Arqueta, no sifónica, que recibe la acometida de una bajante cuando la conducción a partir de ese punto pasa a discurrir enterrada." },
  { tema_slug: TEMA, seccion: S3, termino: "Unidad de Desagüe (UD)", definicion: "Valor convencional asignado a cada tipo de aparato sanitario para el dimensionado de la red de evacuación, según la tabla 4.1 del CTE DB-HS5." },
  { tema_slug: TEMA, seccion: S3, termino: "Ventilación primaria", definicion: "Sistema de ventilación de la red de evacuación mediante la prolongación de la propia bajante por encima de la cubierta del edificio." },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 16 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 16, orden: 16, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-292 creado y vinculado como Tema 16 de Oficial Fontanero.");
