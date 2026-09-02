/**
 * Crea tema-145: "Instalaciones interiores en viviendas y locales" — Tema 13
 * (numero=13, bloque-2) de Oficial Electricista (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 11 oficial del Anexo I (bases2110.pdf, línea 1340):
 *   "Instalaciones Interiores en Viviendas y Locales. Instalaciones de
 *   electrificación básica y elevada. Circuitos independientes. Puntos de
 *   utilización y prescripciones de confort. Tubos y canales protectoras:
 *   tipos y características de instalación."
 *
 * Fuente primaria: Real Decreto 842/2002 (REBT) — BOE-A-2002-18099.
 * ITC-BT-25 (viviendas: número de circuitos y características, grados de
 * electrificación), ITC-BT-26 (viviendas: prescripciones generales de
 * instalación), ITC-BT-21 (tubos y canales protectoras).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-145-instalaciones-interiores-viviendas-locales.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-145";
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
  titulo: "Instalaciones interiores en viviendas y locales",
  descripcion: "Instalaciones de electrificación básica y elevada. Circuitos independientes. Puntos de utilización y prescripciones de confort. Tubos y canales protectoras: tipos y características de instalación.",
  contenido: "Desarrolla las instalaciones interiores en viviendas: los grados de electrificación básica y elevada regulados en la ITC-BT-25, los circuitos independientes exigidos según cada grado, los puntos de utilización mínimos y las prescripciones de confort de cada estancia, y los tubos y canales protectoras empleados para alojar los conductores, con sus tipos y características de instalación conforme a la ITC-BT-21.",
  enlaces_boe: [
    { titulo: "Real Decreto 842/2002, Reglamento electrotécnico para baja tensión (ITC-BT-21, ITC-BT-25, ITC-BT-26)", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2002-18099" },
  ],
  indice_estudio: [
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2002-18099", titulo: "Electrificación básica y elevada. Circuitos independientes", seccion: "electrificacion-basica-elevada-circuitos-independientes", articulos: "ITC-BT-25" },
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2002-18099", titulo: "Puntos de utilización y prescripciones de confort", seccion: "puntos-utilizacion-prescripciones-confort", articulos: "ITC-BT-25, ITC-BT-26" },
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2002-18099", titulo: "Tubos y canales protectoras: tipos y características", seccion: "tubos-canales-protectoras-tipos-caracteristicas", articulos: "ITC-BT-21" },
  ],
}]);

const S1 = "electrificacion-basica-elevada-circuitos-independientes";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué instrucción técnica complementaria regula el número de circuitos y las características de la instalación eléctrica de una vivienda?", reverso: "La ITC-BT-25" },
  { anverso: "¿Qué es el grado de electrificación básica de una vivienda?", reverso: "El grado mínimo exigido, que garantiza la utilización de los aparatos eléctricos de uso habitual en una vivienda, con una previsión de potencia mínima de 5.750 W" },
  { anverso: "¿Qué es el grado de electrificación elevada de una vivienda?", reverso: "El grado exigible en viviendas con superficie superior a 160 m², o cuando se prevé la instalación de sistemas de calefacción o aire acondicionado eléctricos, secadora independiente, u otros circuitos adicionales, con una previsión de potencia mínima de 9.200 W" },
  { anverso: "¿Qué es un circuito independiente en una instalación de vivienda?", reverso: "Cada uno de los circuitos derivados del cuadro general de mando y protección que alimenta a un uso específico (alumbrado, tomas de corriente de uso general, cocina y horno, lavadora, entre otros), protegido individualmente por su propio PIA" },
  { anverso: "¿Cuántos circuitos independientes exige, como mínimo, el grado de electrificación básica de una vivienda?", reverso: "Cinco circuitos: C1 (alumbrado), C2 (tomas de uso general), C3 (cocina y horno), C4 (lavadora, lavavajillas y termo eléctrico) y C5 (tomas de cuarto de baño y auxiliares de cocina)" },
  { anverso: "¿Qué circuitos adicionales exige, respecto a la electrificación básica, el grado de electrificación elevada de una vivienda?", reverso: "Circuitos adicionales según los usos previstos, como C8 (calefacción), C9 (aire acondicionado), C10 (secadora independiente), C11 (automatización, gestión técnica de la energía y seguridad), o duplicados de circuitos ya existentes según la superficie de la vivienda" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué instrucción técnica complementaria regula el número de circuitos de una vivienda?", explicacion: "La ITC-BT-25.", dificultad: "media", opciones: ["La ITC-BT-25", "La ITC-BT-21", "La ITC-BT-17", "La ITC-BT-24"], correcta: 0 },
  { enunciado: "¿Cuál es la previsión de potencia mínima del grado de electrificación básica de una vivienda?", explicacion: "5.750 W.", dificultad: "media", opciones: ["5.750 W", "9.200 W", "3.450 W", "15.000 W"], correcta: 0 },
  { enunciado: "¿Cuál es la previsión de potencia mínima del grado de electrificación elevada de una vivienda?", explicacion: "9.200 W.", dificultad: "media", opciones: ["9.200 W", "5.750 W", "2.300 W", "20.000 W"], correcta: 0 },
  { enunciado: "¿Qué circuito independiente C1 alimenta, con carácter general, en una vivienda de electrificación básica?", explicacion: "El alumbrado.", dificultad: "facil", opciones: ["El alumbrado", "La cocina y el horno", "La lavadora, el lavavajillas y el termo eléctrico", "Las tomas de cuarto de baño"], correcta: 0 },
  { enunciado: "¿Cuándo resulta exigible el grado de electrificación elevada de una vivienda?", explicacion: "Superficie superior a 160 m², o previsión de calefacción/aire acondicionado eléctrico, entre otros supuestos.", dificultad: "dificil", opciones: ["Superficie superior a 160 m², o previsión de calefacción/aire acondicionado eléctrico", "En cualquier vivienda, sin excepción alguna", "Únicamente en viviendas unifamiliares aisladas", "Únicamente cuando lo solicita expresamente el propietario"], correcta: 0 },
]);

const S2 = "puntos-utilizacion-prescripciones-confort";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué son los puntos de utilización en una instalación interior de vivienda?", reverso: "Las tomas de corriente, puntos de luz y demás mecanismos eléctricos previstos en cada estancia, cuyo número mínimo establece la ITC-BT-25 según el tipo de estancia" },
  { anverso: "¿Cuál es el número mínimo de puntos de luz exigido en una cocina, según la ITC-BT-25?", reverso: "Al menos un punto de luz en el techo" },
  { anverso: "¿Qué prescripción de confort exige la ITC-BT-25 respecto a las tomas de corriente en un cuarto de baño?", reverso: "Al menos una toma de corriente, situada fuera de los volúmenes de prohibición y de un modo compatible con los requisitos de seguridad de la ITC-BT-27 (locales que contienen bañera o ducha)" },
  { anverso: "¿Qué es un punto de luz en el contexto de las prescripciones de confort de una vivienda?", reverso: "Cada uno de los puntos de utilización destinados a alumbrado, ya sea en techo, pared o mediante base de enchufe controlada por interruptor" },
  { anverso: "¿Qué número mínimo de tomas de corriente de uso general exige, con carácter orientativo, un salón o estancia principal de una vivienda?", reverso: "Un número mínimo proporcional a su superficie, con al menos una toma de corriente por cada 6 m² o fracción, redondeando al entero superior, según los criterios de la ITC-BT-25" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué son los puntos de utilización de una instalación interior de vivienda?", explicacion: "Las tomas de corriente, puntos de luz y demás mecanismos previstos en cada estancia.", dificultad: "media", opciones: ["Las tomas de corriente, puntos de luz y demás mecanismos previstos", "Únicamente los interruptores generales del cuadro de la vivienda", "Únicamente las tomas de corriente de la cocina", "Los puntos donde se ubican los contadores del edificio"], correcta: 0 },
  { enunciado: "¿Qué número mínimo de puntos de luz exige la ITC-BT-25 en una cocina?", explicacion: "Al menos un punto de luz en el techo.", dificultad: "media", opciones: ["Al menos un punto de luz en el techo", "Ningún punto de luz mínimo exigido", "Al menos cinco puntos de luz distribuidos", "Únicamente puntos de luz de pared, nunca de techo"], correcta: 0 },
  { enunciado: "¿Qué instrucción técnica complementaria debe tenerse en cuenta al ubicar una toma de corriente en un cuarto de baño?", explicacion: "La ITC-BT-27, sobre locales que contienen bañera o ducha.", dificultad: "dificil", opciones: ["La ITC-BT-27", "La ITC-BT-21", "La ITC-BT-17", "La ITC-BT-13"], correcta: 0 },
  { enunciado: "¿Qué criterio orientativo establece la ITC-BT-25 para el número mínimo de tomas de corriente de uso general en un salón, según su superficie?", explicacion: "Una toma por cada 6 m² o fracción, redondeando al entero superior.", dificultad: "dificil", opciones: ["Una toma por cada 6 m² o fracción", "Una única toma, independientemente de la superficie", "Una toma por cada 20 m² o fracción", "Diez tomas fijas en cualquier salón, sin relación con su superficie"], correcta: 0 },
  { enunciado: "¿Qué son los puntos de luz de una vivienda?", explicacion: "Los puntos de utilización destinados a alumbrado.", dificultad: "facil", opciones: ["Los puntos de utilización destinados a alumbrado", "Las tomas de corriente de uso general de la cocina", "Los elementos de protección del cuadro general", "Los puntos de conexión de la toma de tierra"], correcta: 0 },
]);

const S3 = "tubos-canales-protectoras-tipos-caracteristicas";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué instrucción técnica complementaria regula los tubos y canales protectoras?", reverso: "La ITC-BT-21" },
  { anverso: "¿Qué función cumplen los tubos y canales protectoras en una instalación eléctrica?", reverso: "Alojar y proteger mecánicamente a los conductores eléctricos frente a golpes, aplastamiento y otros agentes externos, facilitando además su tendido, sustitución o ampliación" },
  { anverso: "¿Qué características se emplean para clasificar un tubo protector según la ITC-BT-21?", reverso: "Su resistencia a la compresión, al impacto, su temperatura mínima y máxima de instalación y servicio, su resistencia a la propagación de la llama, y su resistencia a la penetración de objetos sólidos y de agua" },
  { anverso: "¿Qué es un tubo protector rígido?", reverso: "Un tubo que no puede curvarse manualmente sin deformarse permanentemente, empleado habitualmente en instalaciones vistas o en montaje superficial" },
  { anverso: "¿Qué es un tubo protector flexible?", reverso: "Un tubo que puede curvarse con relativa facilidad, adaptándose al recorrido de la instalación, empleado habitualmente en instalaciones empotradas" },
  { anverso: "¿Qué es una canal protectora?", reverso: "Un perfil hueco, cerrado por una tapa desmontable, destinado a la instalación de conductores en superficie, permitiendo un fácil acceso a estos" },
  { anverso: "¿Qué debe evitarse al instalar tubos protectores en un mismo circuito?", reverso: "Cambios bruscos en la sección del tubo o curvas de radio insuficiente, que puedan dificultar o impedir el tendido o la posterior sustitución de los conductores" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué instrucción técnica complementaria regula los tubos y canales protectoras?", explicacion: "La ITC-BT-21.", dificultad: "media", opciones: ["La ITC-BT-21", "La ITC-BT-25", "La ITC-BT-17", "La ITC-BT-19"], correcta: 0 },
  { enunciado: "¿Qué función cumplen los tubos y canales protectoras?", explicacion: "Alojar y proteger mecánicamente a los conductores.", dificultad: "facil", opciones: ["Alojar y proteger mecánicamente a los conductores", "Medir la intensidad que circula por el circuito", "Sustituir a la necesidad de aislamiento en el conductor", "Limitar la potencia contratada del usuario"], correcta: 0 },
  { enunciado: "¿Qué es un tubo protector rígido?", explicacion: "Un tubo que no puede curvarse manualmente sin deformarse, habitual en montaje superficial.", dificultad: "media", opciones: ["Un tubo que no puede curvarse manualmente sin deformarse", "Un tubo que se curva con facilidad, habitual en instalaciones empotradas", "Un tubo exclusivo para instalaciones de alta tensión", "Un tubo sin ninguna característica de resistencia mecánica"], correcta: 0 },
  { enunciado: "¿Qué es una canal protectora?", explicacion: "Un perfil hueco con tapa desmontable para instalación de conductores en superficie.", dificultad: "media", opciones: ["Un perfil hueco con tapa desmontable para conductores en superficie", "Un tubo exclusivamente empleado en instalaciones empotradas", "Un dispositivo de protección contra sobretensiones", "Un elemento exclusivo de las instalaciones de puesta a tierra"], correcta: 0 },
  { enunciado: "¿Qué características se emplean para clasificar un tubo protector según la ITC-BT-21?", explicacion: "Resistencia a la compresión, al impacto, temperatura de instalación y resistencia a la llama, entre otras.", dificultad: "dificil", opciones: ["Resistencia a la compresión, al impacto y a la propagación de la llama", "Únicamente su color exterior identificativo", "Únicamente su longitud comercial disponible", "Únicamente el fabricante que lo comercializa"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 13 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 13, orden: 13, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-145 creado y vinculado como Tema 13 de Oficial Electricista.");
