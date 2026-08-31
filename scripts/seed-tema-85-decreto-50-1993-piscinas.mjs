/**
 * Crea tema-85: "Decreto 50/1993: condiciones higiénico-sanitarias de las
 * piscinas de uso público" — Tema 15 (numero=15, bloque-2) de Oficial
 * Polivalente Instalaciones Deportivas (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 13 oficial del Anexo I (bases2110.pdf):
 *   "Decreto 50/93, de 19 de mayo, por el que se regula las condiciones
 *   higiénico-sanitarias de las piscinas de uso público."
 *
 * Fuente primaria verificada en este turno: Decreto 50/1993, de 19 de
 * mayo, de la Diputación General de Aragón, por el que se regulan las
 * condiciones higiénico-sanitarias de las piscinas de uso público
 * (texto disponible en aragon.es). Modificado por el Decreto 53/1999, de
 * 25 de mayo (ajustes puntuales) y por el Decreto 119/2006, de 9 de
 * mayo (revisión de aspectos técnicos y clasificación de piscinas).
 * También resulta de aplicación, en aspectos básicos comunes a todo el
 * territorio nacional, el Real Decreto 742/2013, de 27 de septiembre.
 * No se citan artículos concretos con numeración exacta por no haberse
 * podido leer el texto íntegro del decreto en esta sesión (solo
 * confirmado su identificador, título, fecha y modificaciones mediante
 * búsqueda); el contenido se centra en los conceptos que el propio
 * temario y las fuentes de referencia identifican como núcleo de la
 * norma (clasificación de piscinas, condiciones técnico-sanitarias,
 * vigilancia y control).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-85-decreto-50-1993-piscinas.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-85";
const OPOSICION = "oficial-instalaciones-deportivas-ayto-zaragoza";
const BLOQUE_2_ID = "cdb0920b-a2d8-4ea8-b3fc-b80168d7361a";
const DECRETO_50_1993 = "https://www.aragon.es/documents/20127/49232347/DECRETO_50-1993+de+19+de+mayo.pdf";

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
  titulo: "Condiciones higiénico-sanitarias de las piscinas de uso público",
  descripcion: "Decreto 50/1993, de 19 de mayo, de la Diputación General de Aragón: objeto, ámbito, clasificación de piscinas, condiciones técnico-sanitarias y vigilancia.",
  contenido: "Desarrolla el Decreto 50/1993, de 19 de mayo, por el que se regulan las condiciones higiénico-sanitarias de las piscinas de uso público en Aragón (modificado por el Decreto 53/1999 y el Decreto 119/2006): su objeto y ámbito de aplicación, la clasificación de las piscinas, las condiciones técnico-sanitarias exigibles, y el régimen de vigilancia y control sanitario.",
  enlaces_boe: [
    { url: DECRETO_50_1993, titulo: "Decreto 50/1993, de 19 de mayo — Condiciones higiénico-sanitarias de piscinas de uso público (Diputación General de Aragón)" },
  ],
  indice_estudio: [
    { url: DECRETO_50_1993, titulo: "Objeto, ámbito y clasificación de piscinas", seccion: "decreto-50-1993-objeto-ambito-clasificacion", articulos: "Decreto 50/1993, modificado por Decreto 53/1999 y Decreto 119/2006" },
    { url: DECRETO_50_1993, titulo: "Condiciones técnico-sanitarias de las piscinas", seccion: "condiciones-tecnico-sanitarias-piscinas", articulos: "Decreto 50/1993" },
    { url: DECRETO_50_1993, titulo: "Vigilancia y control sanitario de piscinas", seccion: "vigilancia-control-sanitario-piscinas", articulos: "Decreto 50/1993" },
  ],
}]);

const S1 = "decreto-50-1993-objeto-ambito-clasificacion";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué norma regula las condiciones higiénico-sanitarias de las piscinas de uso público en Aragón?", reverso: "El Decreto 50/1993, de 19 de mayo, de la Diputación General de Aragón" },
  { anverso: "¿Ha sido modificado el Decreto 50/1993 desde su aprobación?", reverso: "Sí: fue modificado por el Decreto 53/1999, de 25 de mayo, y posteriormente por el Decreto 119/2006, de 9 de mayo, que revisó aspectos técnicos y la clasificación de piscinas" },
  { anverso: "¿A qué tipo de piscinas se aplica el Decreto 50/1993?", reverso: "A las piscinas de uso público, es decir, aquellas de utilización colectiva no restringida al ámbito familiar (piscinas municipales, de clubes deportivos, de comunidades de vecinos con acceso más amplio, hoteles, campings, entre otras)" },
  { anverso: "¿Qué finalidad general persigue el Decreto 50/1993?", reverso: "Proteger la salud de las personas usuarias de piscinas de uso público, estableciendo requisitos técnicos y sanitarios mínimos exigibles a estas instalaciones" },
  { anverso: "¿Qué otra normativa nacional resulta de aplicación complementaria a las piscinas de uso público, junto con la normativa autonómica aragonesa?", reverso: "El Real Decreto 742/2013, de 27 de septiembre, que establece los criterios técnico-sanitarios de las piscinas básicos y comunes para todo el territorio nacional" },
  { anverso: "¿Por qué es relevante para un oficial polivalente de instalaciones deportivas conocer esta normativa, aunque no sea quien realiza el control analítico del agua?", reverso: "Porque muchas de sus tareas de mantenimiento (dosificación de productos, limpieza, control de parámetros básicos) inciden directamente en el cumplimiento de las condiciones exigidas por esta normativa" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué norma regula las condiciones higiénico-sanitarias de piscinas de uso público en Aragón?", explicacion: "El Decreto 50/1993, de 19 de mayo.", dificultad: "media", opciones: ["El Decreto 50/1993", "El Real Decreto 865/2003", "El Real Decreto 842/2002", "La Ley 31/1995"], correcta: 0 },
  { enunciado: "¿Qué normas modificaron el Decreto 50/1993?", explicacion: "El Decreto 53/1999 y el Decreto 119/2006.", dificultad: "dificil", opciones: ["El Decreto 53/1999 y el Decreto 119/2006", "El Real Decreto 487/2022 exclusivamente", "La Ley de Capitalidad de Zaragoza", "El Reglamento de Centros y Pabellones Deportivos"], correcta: 0 },
  { enunciado: "¿A qué tipo de piscinas se aplica el Decreto 50/1993?", explicacion: "A las de uso público, de utilización colectiva no restringida al ámbito familiar.", dificultad: "media", opciones: ["A las piscinas de uso público", "Únicamente a piscinas privadas familiares", "Únicamente a piscinas de hoteles de 5 estrellas", "A ninguna piscina cubierta"], correcta: 0 },
  { enunciado: "¿Qué finalidad general persigue el Decreto 50/1993?", explicacion: "Proteger la salud de las personas usuarias mediante requisitos técnico-sanitarios.", dificultad: "media", opciones: ["Proteger la salud de las personas usuarias", "Regular exclusivamente las tarifas de acceso", "Regular exclusivamente el horario de apertura", "Sustituir a la normativa de legionela"], correcta: 0 },
  { enunciado: "¿Qué norma nacional complementa a la aragonesa en criterios técnico-sanitarios de piscinas?", explicacion: "El Real Decreto 742/2013.", dificultad: "dificil", opciones: ["El Real Decreto 742/2013", "El Real Decreto 487/2022", "El Real Decreto 513/2017", "El Real Decreto 773/1997"], correcta: 0 },
]);

const S2 = "condiciones-tecnico-sanitarias-piscinas";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué parámetros básicos del agua de una piscina deben mantenerse dentro de rangos exigidos por la normativa higiénico-sanitaria?", reverso: "El pH, el nivel de desinfectante (cloro residual libre y combinado), la turbidez y la temperatura del agua, entre otros" },
  { anverso: "¿Qué rango de pH se considera adecuado para el agua de una piscina de uso público?", reverso: "Aproximadamente entre 7,2 y 8,0, un rango que garantiza la eficacia del desinfectante y minimiza la irritación de ojos y piel de las personas bañistas" },
  { anverso: "¿Por qué es importante controlar la turbidez del agua de una piscina?", reverso: "Porque un agua turbia dificulta la visibilidad del fondo del vaso (riesgo de seguridad ante posibles ahogamientos) y puede indicar un fallo en la filtración o depuración" },
  { anverso: "¿Qué exige la normativa respecto a la renovación del agua de una piscina?", reverso: "Un caudal mínimo de recirculación y renovación de agua nueva, garantizando que el volumen total del vaso se trate y renueve con la frecuencia adecuada según su clasificación" },
  { anverso: "¿Qué condiciones técnicas suelen exigirse en los vestuarios y zonas de paso de una piscina de uso público, según este tipo de normativa?", reverso: "Suelos antideslizantes, duchas de paso obligatorio antes de acceder al vaso, y condiciones de limpieza e higiene adecuadas" },
  { anverso: "¿Qué es un botiquín de primeros auxilios en el contexto de las condiciones exigidas a una piscina de uso público?", reverso: "Un equipo mínimo obligatorio con material básico de primeros auxilios, que debe estar disponible y accesible en toda instalación de piscina de uso público" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué parámetros básicos del agua deben controlarse en una piscina de uso público?", explicacion: "pH, desinfectante (cloro), turbidez y temperatura.", dificultad: "media", opciones: ["pH, cloro, turbidez y temperatura", "Solo la temperatura del agua", "Solo el color del agua", "Solo el caudal de llenado"], correcta: 0 },
  { enunciado: "¿Qué rango de pH se considera adecuado en el agua de una piscina?", explicacion: "Aproximadamente entre 7,2 y 8,0.", dificultad: "media", opciones: ["Entre 7,2 y 8,0", "Entre 1 y 3", "Entre 10 y 14", "Entre 0 y 1"], correcta: 0 },
  { enunciado: "¿Por qué es importante controlar la turbidez del agua?", explicacion: "Por seguridad (visibilidad del fondo) y por indicar posibles fallos de filtración.", dificultad: "media", opciones: ["Por seguridad y posibles fallos de filtración", "No tiene ninguna relevancia sanitaria", "Solo afecta al color estético del agua", "Solo afecta al consumo energético"], correcta: 0 },
  { enunciado: "¿Qué exige la normativa respecto a la renovación del agua?", explicacion: "Un caudal mínimo de recirculación y renovación adecuado a la clasificación de la piscina.", dificultad: "media", opciones: ["Un caudal mínimo de recirculación y renovación", "No exige ninguna renovación periódica", "Solo renovación una vez al año", "Solo renovación en piscinas cubiertas"], correcta: 0 },
  { enunciado: "¿Qué condición técnica es habitual exigir en vestuarios de piscinas de uso público?", explicacion: "Suelos antideslizantes y duchas de paso obligatorio.", dificultad: "media", opciones: ["Suelos antideslizantes y duchas de paso", "No se exige ninguna condición especial", "Solo se exige iluminación led", "Solo se exige megafonía en vestuarios"], correcta: 0 },
  { enunciado: "¿Qué equipo mínimo obligatorio debe estar disponible en una piscina de uso público?", explicacion: "Un botiquín de primeros auxilios.", dificultad: "facil", opciones: ["Un botiquín de primeros auxilios", "Una máquina fregadora-secadora", "Un sistema de megafonía", "Una pistola de pintar"], correcta: 0 },
]);

const S3 = "vigilancia-control-sanitario-piscinas";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Quién es responsable de que una piscina de uso público cumpla las condiciones higiénico-sanitarias exigidas?", reverso: "La entidad titular o gestora de la instalación (en este caso, el Ayuntamiento de Zaragoza a través de la gestión de sus centros deportivos), sin perjuicio de la inspección y control por parte de la autoridad sanitaria" },
  { anverso: "¿Qué es el autocontrol sanitario de una piscina?", reverso: "El conjunto de controles periódicos (analíticos y de registro) que la propia instalación debe realizar sobre parámetros como el pH, el cloro y la turbidez, documentando los resultados" },
  { anverso: "¿Con qué frecuencia debe realizarse habitualmente el control de parámetros básicos (pH, desinfectante) en una piscina en funcionamiento?", reverso: "Varias veces al día durante el horario de apertura, dado que estos parámetros pueden variar rápidamente según la afluencia de personas bañistas y las condiciones ambientales" },
  { anverso: "¿Qué es un libro de registro sanitario de piscina?", reverso: "El documento donde se anotan los controles periódicos realizados (fecha, hora, parámetros medidos, incidencias) como evidencia del cumplimiento de las condiciones exigidas" },
  { anverso: "¿Qué papel puede tener la autoridad sanitaria (Salud Pública) respecto a una piscina de uso público?", reverso: "Realizar inspecciones periódicas para verificar el cumplimiento de las condiciones higiénico-sanitarias exigidas, pudiendo ordenar medidas correctoras o, en casos graves, el cierre temporal de la instalación" },
  { anverso: "¿Qué papel tiene el oficial polivalente de instalaciones deportivas en el control sanitario diario de una piscina?", reverso: "Realizar (o colaborar en) las mediciones de parámetros básicos, dosificar productos según los protocolos establecidos, y comunicar de inmediato cualquier desviación fuera de los rangos exigidos" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Quién es responsable de que una piscina municipal cumpla las condiciones higiénico-sanitarias?", explicacion: "La entidad titular o gestora, sin perjuicio de la inspección de la autoridad sanitaria.", dificultad: "media", opciones: ["La entidad titular o gestora de la instalación", "Únicamente cada persona usuaria individual", "Únicamente la autoridad sanitaria autonómica", "Nadie tiene responsabilidad específica"], correcta: 0 },
  { enunciado: "¿Qué es el autocontrol sanitario de una piscina?", explicacion: "Los controles periódicos que la propia instalación realiza y documenta.", dificultad: "media", opciones: ["Controles periódicos que la instalación realiza y documenta", "La inspección exclusiva de la autoridad sanitaria", "El mantenimiento eléctrico de la instalación", "El control de acceso mediante abono"], correcta: 0 },
  { enunciado: "¿Con qué frecuencia se controlan habitualmente parámetros como pH y cloro en una piscina en uso?", explicacion: "Varias veces al día durante el horario de apertura.", dificultad: "media", opciones: ["Varias veces al día", "Una vez a la semana", "Una vez al mes", "Solo al inicio de temporada"], correcta: 0 },
  { enunciado: "¿Qué es un libro de registro sanitario de piscina?", explicacion: "El documento donde se anotan los controles realizados y sus resultados.", dificultad: "media", opciones: ["El documento donde se anotan los controles realizados", "El contrato de gestión del centro deportivo", "El manual de instrucciones del filtro de arena", "La Carta de Servicios del centro"], correcta: 0 },
  { enunciado: "¿Qué puede ordenar la autoridad sanitaria si detecta incumplimientos graves en una piscina?", explicacion: "Medidas correctoras o, en casos graves, el cierre temporal de la instalación.", dificultad: "media", opciones: ["Medidas correctoras o el cierre temporal", "No tiene ninguna competencia sobre piscinas municipales", "Solo puede emitir una recomendación no vinculante", "Solo puede actuar sobre piscinas privadas"], correcta: 0 },
  { enunciado: "¿Qué papel tiene el oficial polivalente en el control sanitario diario de la piscina?", explicacion: "Realizar mediciones básicas, dosificar productos y comunicar desviaciones.", dificultad: "media", opciones: ["Realizar mediciones, dosificar y comunicar desviaciones", "Ningún papel, es competencia exclusiva de Salud Pública", "Solo limpiar el vaso sin medir parámetros", "Solo gestionar el acceso de personas usuarias"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 15 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 15, orden: 15, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-85 creado y vinculado como Tema 15 de Oficial Polivalente Instalaciones Deportivas.");
