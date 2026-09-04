/**
 * Crea tema-291: "Sistemas contra incendios" — Tema 15 (numero=15,
 * bloque-2) de Oficial Fontanero (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 13 oficial del Anexo I (bases1716.pdf, línea 539):
 * "Sistemas contra incendios. Red de distribución. Grupo de presión. Bocas
 * de incendio equipadas. Rociadores. Hidrantes."
 *
 * Sourcing: Real Decreto 513/2017, de 22 de mayo, Reglamento de
 * instalaciones de protección contra incendios (RIPCI, BOE-A-2017-6606,
 * modificado por RD 164/2025) — ya verificado en Oficial Pintor Especialidad
 * Gráfica (tema-266). Normas técnicas armonizadas citadas por el propio
 * RIPCI: UNE-EN 671-1 (BIE de manguera semirrígida DN25) y UNE-EN 671-2
 * (BIE de manguera plana DN45), UNE-EN 14384 (hidrantes de columna, caudal
 * mínimo 500 l/min, presión mínima 100 kPa en zona urbana y 500 kPa en el
 * resto), y UNE-EN 12845 (rociadores automáticos, con periodicidad de
 * inspección anual/3/10/25 años) — verificadas en esta sesión.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-291-sistemas-contra-incendios.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-291";
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
  titulo: "Sistemas contra incendios",
  descripcion: "Bocas de incendio equipadas (BIE) de manguera semirrígida y plana (UNE-EN 671-1 y 671-2). Hidrantes exteriores (UNE-EN 14384): caudal y presión mínimos. Rociadores automáticos (UNE-EN 12845) y su régimen de inspección periódica.",
  contenido: "Desarrolla los sistemas fijos de protección contra incendios que utilizan agua, regulados por el Reglamento de instalaciones de protección contra incendios (RIPCI): las bocas de incendio equipadas (BIE), tanto de manguera semirrígida como de manguera plana, con sus respectivas normas técnicas; los hidrantes exteriores para el suministro a los servicios de bomberos, con sus exigencias de caudal y presión; y los rociadores automáticos, su normativa técnica de referencia y su régimen de inspección periódica.",
  enlaces_boe: [
    { url: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2017-6606", titulo: "Real Decreto 513/2017, de 22 de mayo, Reglamento de instalaciones de protección contra incendios (RIPCI)" },
  ],
  indice_estudio: [
    { url: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2017-6606", titulo: "Bocas de incendio equipadas (BIE)", seccion: "bocas-de-incendio-equipadas-bie", articulos: "RIPCI; UNE-EN 671-1 y UNE-EN 671-2" },
    { url: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2017-6606", titulo: "Hidrantes exteriores", seccion: "hidrantes-exteriores", articulos: "RIPCI; UNE-EN 14384" },
    { url: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2017-6606", titulo: "Rociadores automáticos", seccion: "rociadores-automaticos", articulos: "RIPCI; UNE-EN 12845" },
  ],
}]);

const S1 = "bocas-de-incendio-equipadas-bie";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Por qué elementos está compuesto un sistema de bocas de incendio equipadas (BIE)?", reverso: "Por una red de tuberías para la alimentación de agua y las propias bocas de incendio equipadas necesarias, distribuidas conforme exige el RIPCI" },
  { anverso: "¿Qué diferencia hay entre una BIE de manguera semirrígida y una de manguera plana, en cuanto a diámetro?", reverso: "La BIE de manguera semirrígida es de DN 25 mm (norma UNE-EN 671-1); la de manguera plana es de DN 45 mm (norma UNE-EN 671-2), de mayor diámetro y caudal" },
  { anverso: "¿Qué norma técnica regula la BIE de manguera semirrígida?", reverso: "La UNE-EN 671-1" },
  { anverso: "¿Qué norma técnica regula la BIE de manguera plana?", reverso: "La UNE-EN 671-2" },
  { anverso: "¿Qué tipo de BIE es más habitual en edificios de uso público o administrativo, por su facilidad de manejo?", reverso: "La BIE de manguera semirrígida (DN 25), al ser más fácil de manejar por personal no especializado que la de manguera plana, más propia de instalaciones industriales o de mayor riesgo" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Por qué elementos está compuesto un sistema de BIE?", explicacion: "Por una red de tuberías de alimentación de agua y las propias bocas de incendio equipadas.", dificultad: "facil", opciones: ["Por una red de tuberías de alimentación de agua y las propias bocas de incendio equipadas", "Únicamente por un extintor portátil, sin ninguna red de tuberías asociada", "Únicamente por un detector de humos, sin ninguna manguera asociada", "Únicamente por una sirena de alarma, sin ningún sistema hidráulico asociado"], correcta: 0 },
  { enunciado: "¿Qué diámetro nominal tiene una BIE de manguera semirrígida?", explicacion: "DN 25 mm.", dificultad: "media", opciones: ["DN 25 mm", "DN 45 mm", "DN 100 mm", "DN 10 mm"], correcta: 0 },
  { enunciado: "¿Qué norma regula la BIE de manguera plana?", explicacion: "La UNE-EN 671-2.", dificultad: "media", opciones: ["UNE-EN 671-2", "UNE-EN 671-1", "UNE-EN 14384", "UNE-EN 12845"], correcta: 0 },
  { enunciado: "¿Qué norma regula la BIE de manguera semirrígida?", explicacion: "La UNE-EN 671-1.", dificultad: "media", opciones: ["UNE-EN 671-1", "UNE-EN 671-2", "UNE-EN 14384", "UNE-EN 12845"], correcta: 0 },
  { enunciado: "¿Por qué es más habitual la BIE de manguera semirrígida en edificios de uso público o administrativo?", explicacion: "Por ser más fácil de manejar por personal no especializado.", dificultad: "dificil", opciones: ["Por ser más fácil de manejar por personal no especializado que la de manguera plana", "Porque la manguera plana está reservada exclusivamente a hidrantes exteriores", "Porque la manguera semirrígida no requiere ninguna red de tuberías de alimentación", "Porque la manguera plana no puede instalarse nunca en interior de edificios"], correcta: 0 },
]);

const S2 = "hidrantes-exteriores";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué son los hidrantes exteriores, y a quién van destinados principalmente?", reverso: "Bocas de suministro de agua a presión situadas en el exterior de los edificios (de columna o bajo tierra), destinadas principalmente al uso de los servicios de bomberos en caso de incendio" },
  { anverso: "¿Qué norma técnica regula los hidrantes de columna?", reverso: "La UNE-EN 14384" },
  { anverso: "¿Cuál es el caudal ininterrumpido mínimo que debe suministrar cada boca de un hidrante contra incendios, según el RIPCI?", reverso: "500 litros por minuto (l/min)" },
  { anverso: "¿Qué presión mínima debe tener un hidrante en su boca de salida en zona urbana, según el RIPCI?", reverso: "100 kPa (1 kg/cm²)" },
  { anverso: "¿Qué presión mínima debe tener un hidrante en su boca de salida fuera de zona urbana, según el RIPCI, y por qué es superior a la exigida en zona urbana?", reverso: "500 kPa (5 kg/cm²); es superior porque fuera de zona urbana el acceso de los bomberos y la disponibilidad de otros recursos de presión pueden ser más limitados, exigiendo una mayor garantía de presión propia del hidrante" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿A quién van destinados principalmente los hidrantes exteriores?", explicacion: "A los servicios de bomberos en caso de incendio.", dificultad: "facil", opciones: ["A los servicios de bomberos, como bocas de suministro de agua a presión en el exterior", "Exclusivamente a los propios ocupantes del edificio, nunca a los bomberos", "Exclusivamente al riego de zonas verdes municipales, sin relación con incendios", "Exclusivamente a la limpieza viaria, sin relación con la protección contra incendios"], correcta: 0 },
  { enunciado: "¿Qué norma técnica regula los hidrantes de columna?", explicacion: "La UNE-EN 14384.", dificultad: "media", opciones: ["UNE-EN 14384", "UNE-EN 671-1", "UNE-EN 671-2", "UNE-EN 12845"], correcta: 0 },
  { enunciado: "¿Cuál es el caudal ininterrumpido mínimo exigido por boca de hidrante, según el RIPCI?", explicacion: "500 l/min.", dificultad: "media", opciones: ["500 l/min", "50 l/min", "5.000 l/min", "5 l/min"], correcta: 0 },
  { enunciado: "¿Qué presión mínima exige el RIPCI en la boca de salida de un hidrante en zona urbana?", explicacion: "100 kPa (1 kg/cm²).", dificultad: "media", opciones: ["100 kPa", "500 kPa", "10 kPa", "1.000 kPa"], correcta: 0 },
  { enunciado: "¿Qué presión mínima exige el RIPCI en la boca de salida de un hidrante fuera de zona urbana?", explicacion: "500 kPa (5 kg/cm²), superior a la de zona urbana.", dificultad: "dificil", opciones: ["500 kPa", "100 kPa", "50 kPa", "1.000 kPa"], correcta: 0 },
]);

const S3 = "rociadores-automaticos";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un sistema de rociadores automáticos y cómo actúa frente a un incendio?", reverso: "Un sistema fijo de extinción que detecta el calor de un incendio mediante elementos sensibles a la temperatura (habitualmente una ampolla de líquido que se rompe) y descarga agua automáticamente solo en la zona afectada, sin intervención humana" },
  { anverso: "¿Qué norma técnica regula los sistemas de rociadores automáticos?", reverso: "La UNE-EN 12845" },
  { anverso: "¿Con qué periodicidad deben inspeccionarse los sistemas de rociadores automáticos según la UNE-EN 12845?", reverso: "Con distintas periodicidades según el tipo de comprobación: anual, cada 3 años, cada 10 años y cada 25 años, cada una revisando aspectos distintos de la instalación" },
  { anverso: "¿Qué diferencia hay, en complejidad, entre un sistema de rociadores automáticos y una BIE?", reverso: "El sistema de rociadores actúa automáticamente y sin intervención humana, con una red fija de detección y descarga por zonas; la BIE requiere que una persona la accione manualmente para dirigir el agua hacia el foco del incendio" },
  { anverso: "¿Qué relación tiene el grupo de presión con un sistema de rociadores o de BIE de gran exigencia de caudal?", reverso: "Un grupo de presión contra incendios garantiza que la red disponga en todo momento del caudal y la presión mínimos exigidos por la instalación, de forma similar en su principio a un grupo de presión de agua sanitaria pero dimensionado específicamente para protección contra incendios" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Cómo actúa un sistema de rociadores automáticos frente a un incendio?", explicacion: "Detecta el calor y descarga agua automáticamente solo en la zona afectada.", dificultad: "facil", opciones: ["Detecta el calor de un incendio y descarga agua automáticamente solo en la zona afectada", "Requiere siempre que una persona lo accione manualmente antes de descargar agua", "Descarga agua de forma simultánea en todo el edificio, sin distinguir zonas", "Solo puede detectar humo, nunca calor, para activar la descarga de agua"], correcta: 0 },
  { enunciado: "¿Qué norma técnica regula los sistemas de rociadores automáticos?", explicacion: "La UNE-EN 12845.", dificultad: "media", opciones: ["UNE-EN 12845", "UNE-EN 14384", "UNE-EN 671-1", "UNE-EN 671-2"], correcta: 0 },
  { enunciado: "¿Con qué periodicidades se inspeccionan los sistemas de rociadores según la UNE-EN 12845?", explicacion: "Anual, cada 3, cada 10 y cada 25 años.", dificultad: "dificil", opciones: ["Anual, cada 3, cada 10 y cada 25 años", "Exclusivamente cada 50 años, sin ninguna revisión anual", "Exclusivamente una vez, en el momento de la instalación inicial", "Exclusivamente cada 6 meses, sin ninguna revisión de mayor plazo"], correcta: 0 },
  { enunciado: "¿Qué diferencia principal hay entre un sistema de rociadores y una BIE?", explicacion: "El rociador actúa automáticamente; la BIE requiere accionamiento manual.", dificultad: "media", opciones: ["El rociador actúa automáticamente, sin intervención humana; la BIE requiere accionamiento manual", "Ambos sistemas actúan siempre de forma exclusivamente manual, sin ninguna diferencia real", "Ambos sistemas actúan siempre de forma exclusivamente automática, sin ninguna diferencia real", "La BIE detecta el calor automáticamente igual que un rociador, sin intervención humana"], correcta: 0 },
  { enunciado: "¿Qué función cumple un grupo de presión contra incendios en una instalación de rociadores o BIE de gran exigencia?", explicacion: "Garantizar el caudal y la presión mínimos exigidos por la instalación.", dificultad: "dificil", opciones: ["Garantizar que la red disponga en todo momento del caudal y la presión mínimos exigidos", "Sustituir por completo la necesidad de cualquier red de tuberías en la instalación", "Detectar automáticamente el foco exacto de un incendio en el edificio", "Eliminar por completo la necesidad de inspecciones periódicas de la instalación"], correcta: 0 },
]);

console.log(`📖 glosario...`);
await insertar("glosario", [
  { tema_slug: TEMA, seccion: S1, termino: "BIE", definicion: "Boca de Incendio Equipada: sistema fijo compuesto por una red de tuberías y una manguera (semirrígida DN25 o plana DN45) que permite atacar manualmente un incendio con agua." },
  { tema_slug: TEMA, seccion: S1, termino: "RIPCI", definicion: "Reglamento de instalaciones de protección contra incendios, aprobado por el Real Decreto 513/2017, que regula BIE, hidrantes, rociadores y otros sistemas de protección contra incendios." },
  { tema_slug: TEMA, seccion: S2, termino: "Hidrante", definicion: "Boca de suministro de agua a presión situada en el exterior de los edificios, destinada principalmente al uso de los servicios de bomberos." },
  { tema_slug: TEMA, seccion: S2, termino: "Caudal ininterrumpido", definicion: "Caudal mínimo que un hidrante debe poder suministrar de forma continua, fijado por el RIPCI en 500 l/min por boca." },
  { tema_slug: TEMA, seccion: S3, termino: "Rociador automático", definicion: "Elemento de un sistema fijo de extinción que detecta el calor de un incendio y descarga agua automáticamente sobre la zona afectada, sin intervención humana." },
  { tema_slug: TEMA, seccion: S3, termino: "Grupo de presión contra incendios", definicion: "Grupo de bombeo dimensionado específicamente para garantizar el caudal y la presión exigidos por una instalación de protección contra incendios." },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 15 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 15, orden: 15, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-291 creado y vinculado como Tema 15 de Oficial Fontanero.");
