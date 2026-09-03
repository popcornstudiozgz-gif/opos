/**
 * Crea tema-272: "Ley de tráfico. Normas de comportamiento en la
 * circulación. Reglamento General de Circulación" — Tema 12 (numero=12,
 * bloque-2) de Oficial Conductor, Especialidad General (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 10 oficial del Anexo I (bases2110.pdf, línea 1579):
 *   "Ley de tráfico. Normas de comportamiento en la circulación.
 *   Reglamento General de Circulación. De la circulación de vehículos."
 *
 * Sourcing: normativa real y verificada — Real Decreto Legislativo
 * 6/2015 (BOE-A-2015-11722, texto refundido de la Ley sobre Tráfico,
 * Circulación de Vehículos a Motor y Seguridad Vial) y Real Decreto
 * 1428/2003 (BOE-A-2003-23514, Reglamento General de Circulación).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-272-ley-trafico-reglamento-circulacion.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-272";
const OPOSICION = "oficial-conductor-general-ayto-zaragoza";
const BLOQUE_2_ID = "38c4f100-214c-45c4-8600-841993100e43";

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
  titulo: "Ley de tráfico y Reglamento General de Circulación",
  descripcion: "El Real Decreto Legislativo 6/2015 (texto refundido de la Ley sobre Tráfico, Circulación de Vehículos a Motor y Seguridad Vial): normas generales de comportamiento. El Real Decreto 1428/2003 (Reglamento General de Circulación): normas de circulación de vehículos.",
  contenido: "Desarrolla el marco normativo básico de la circulación en España: el Real Decreto Legislativo 6/2015, texto refundido de la Ley sobre Tráfico, Circulación de Vehículos a Motor y Seguridad Vial, con sus normas generales de comportamiento en la circulación, y el Real Decreto 1428/2003, Reglamento General de Circulación, que desarrolla y concreta las normas específicas sobre la circulación de vehículos (velocidad, prioridad, adelantamientos, cambios de dirección, entre otras).",
  enlaces_boe: [
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11722", titulo: "Real Decreto Legislativo 6/2015 (Ley sobre Tráfico, Circulación de Vehículos a Motor y Seguridad Vial)" },
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514", titulo: "Real Decreto 1428/2003 (Reglamento General de Circulación)" },
  ],
  indice_estudio: [
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11722", titulo: "El Real Decreto Legislativo 6/2015: normas generales de comportamiento", seccion: "rdleg-6-2015-normas-generales-de-comportamiento", articulos: "RDLeg 6/2015" },
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514", titulo: "El Reglamento General de Circulación: velocidad y prioridad de paso", seccion: "rgc-velocidad-y-prioridad-de-paso", articulos: "RD 1428/2003" },
    { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514", titulo: "El Reglamento General de Circulación: adelantamientos y cambios de dirección", seccion: "rgc-adelantamientos-y-cambios-de-direccion", articulos: "RD 1428/2003" },
  ],
}]);

const S1 = "rdleg-6-2015-normas-generales-de-comportamiento";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es el Real Decreto Legislativo 6/2015?", reverso: "El texto refundido de la Ley sobre Tráfico, Circulación de Vehículos a Motor y Seguridad Vial, que constituye el marco legal básico español en materia de tráfico y seguridad vial, aprobado el 30 de octubre de 2015" },
  { anverso: "¿Qué principio general de comportamiento establece esta Ley para todo usuario de la vía?", reverso: "El deber de comportarse de forma que no entorpezca indebidamente la circulación ni cause peligro, perjuicio o molestias innecesarias a las personas o daños a los bienes, junto con el deber de obedecer las señales de circulación" },
  { anverso: "¿Qué es la prioridad de paso, como principio general de la circulación?", reverso: "El derecho de un usuario de la vía a avanzar en una situación de posible conflicto con otro, establecido por las normas de circulación, la señalización, o en su defecto por reglas generales como la prioridad de la derecha en cruces sin señalizar" },
  { anverso: "¿Qué establece esta Ley sobre la utilización de dispositivos como el teléfono móvil durante la conducción?", reverso: "Prohíbe conducir utilizando manualmente dispositivos como el teléfono móvil u otros sistemas de comunicación, salvo mediante dispositivos de manos libres que no obliguen a apartar la vista de la vía" },
  { anverso: "¿Qué es el permiso o licencia de conducción, según esta Ley?", reverso: "La autorización administrativa que habilita a su titular para conducir vehículos de motor, otorgada tras superar las pruebas de aptitud correspondientes, sujeta a un sistema de control por puntos que puede implicar su pérdida de vigencia" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es el Real Decreto Legislativo 6/2015?", explicacion: "El texto refundido de la Ley sobre Tráfico, Circulación de Vehículos a Motor y Seguridad Vial.", dificultad: "facil", opciones: ["El texto refundido de la Ley de Tráfico y Seguridad Vial", "El Reglamento General de Circulación de vehículos en España", "El Reglamento General de Vehículos y su homologación", "El Reglamento General de Conductores y sus autorizaciones"], correcta: 0 },
  { enunciado: "¿Qué principio general de comportamiento establece esta Ley?", explicacion: "No entorpecer indebidamente la circulación ni causar peligro, perjuicio o molestias.", dificultad: "media", opciones: ["No entorpecer la circulación ni causar peligro o molestias", "Circular siempre a la velocidad máxima permitida en cada vía", "Prohibir el uso de cualquier tipo de señalización en la vía", "Prohibir el adelantamiento en cualquier circunstancia de la vía"], correcta: 0 },
  { enunciado: "¿Qué es la prioridad de paso como principio general de la circulación?", explicacion: "El derecho a avanzar en una situación de posible conflicto con otro usuario.", dificultad: "media", opciones: ["El derecho a avanzar en una situación de posible conflicto", "La obligación de detenerse siempre en cualquier intersección", "La prohibición absoluta de circular por cualquier intersección", "El derecho exclusivo de los vehículos de emergencia a circular"], correcta: 0 },
  { enunciado: "¿Qué establece esta Ley sobre el uso manual del teléfono móvil al conducir?", explicacion: "Lo prohíbe, salvo mediante dispositivos de manos libres.", dificultad: "media", opciones: ["Lo prohíbe, salvo mediante dispositivos de manos libres", "Lo permite sin ninguna restricción en cualquier circunstancia", "Lo permite únicamente en vías interurbanas de la red estatal", "Lo prohíbe de forma absoluta, incluso con manos libres homologado"], correcta: 0 },
  { enunciado: "¿Qué es el permiso o licencia de conducción según esta Ley?", explicacion: "La autorización administrativa que habilita a conducir, sujeta al sistema de puntos.", dificultad: "dificil", opciones: ["La autorización administrativa que habilita a conducir vehículos", "Un documento exclusivamente informativo sin ningún valor legal real", "Un seguro obligatorio de responsabilidad civil del vehículo", "Un certificado exclusivo de aptitud profesional para el transporte"], correcta: 0 },
]);

const S2 = "rgc-velocidad-y-prioridad-de-paso";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es el Reglamento General de Circulación (RD 1428/2003)?", reverso: "La norma que desarrolla y concreta las disposiciones de la Ley sobre Tráfico en materia de circulación de vehículos: velocidad, prioridad, señalización, adelantamientos, estacionamiento y demás normas específicas de comportamiento en la vía" },
  { anverso: "¿Qué regla general de prioridad se aplica en una intersección sin señalización específica, según el RGC?", reverso: "Con carácter general, tiene prioridad el vehículo que circula por la derecha del conductor que llega a la intersección (prioridad de la derecha), salvo que exista una señal que establezca otra cosa" },
  { anverso: "¿Qué establece con carácter general el RGC sobre la velocidad de circulación?", reverso: "Que todo conductor debe circular a una velocidad que le permita conservar en todo momento el control del vehículo, adaptándola a las condiciones de la vía, el tráfico, la visibilidad y las circunstancias meteorológicas, además de respetar los límites genéricos y específicos de cada vía" },
  { anverso: "¿Qué es un vehículo prioritario, según el RGC?", reverso: "Un vehículo de los servicios de urgencia (policía, bomberos, sanitarios) que, en servicio urgente y haciendo uso de la señalización luminosa y acústica correspondiente, puede circular incumpliendo determinadas normas de circulación con las máximas precauciones posibles" },
  { anverso: "¿Qué obligación general tiene el conductor frente a un vehículo prioritario que se aproxima con las señales activadas?", reverso: "Facilitarle el paso, cediéndole prioridad y, si es necesario, apartándose o deteniéndose en un lugar donde no entorpezca su circulación" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es el Reglamento General de Circulación (RD 1428/2003)?", explicacion: "La norma que desarrolla y concreta la Ley sobre Tráfico en materia de circulación.", dificultad: "facil", opciones: ["La norma que desarrolla la Ley sobre Tráfico en materia de circulación", "La norma que regula exclusivamente la homologación de vehículos", "La norma que regula exclusivamente el permiso de conducción por puntos", "La norma que regula exclusivamente el Certificado de Aptitud Profesional"], correcta: 0 },
  { enunciado: "¿Qué regla general de prioridad se aplica en una intersección sin señalizar, según el RGC?", explicacion: "Prioridad de la derecha, salvo que una señal establezca otra cosa.", dificultad: "media", opciones: ["Prioridad de la derecha, salvo que una señal establezca otra cosa", "Prioridad siempre del vehículo de mayor tamaño en la intersección", "Prioridad siempre del vehículo que circula por la izquierda", "Ninguna regla de prioridad se aplica en una intersección sin señalizar"], correcta: 0 },
  { enunciado: "¿Qué establece con carácter general el RGC sobre la velocidad de circulación?", explicacion: "Que debe permitir conservar el control del vehículo, adaptada a las circunstancias.", dificultad: "media", opciones: ["Que debe permitir conservar el control del vehículo en todo momento", "Que debe ser siempre la máxima permitida en cada tipo de vía", "Que no existe ningún límite de velocidad en vías urbanas", "Que la velocidad solo se regula en autovías y autopistas"], correcta: 0 },
  { enunciado: "¿Qué es un vehículo prioritario según el RGC?", explicacion: "Un vehículo de urgencia que en servicio urgente puede incumplir ciertas normas con precaución.", dificultad: "media", opciones: ["Un vehículo de urgencia en servicio con señalización activada", "Cualquier vehículo de gran tamaño que circule por la vía pública", "Cualquier vehículo de titularidad municipal, con independencia de su uso", "Un vehículo exclusivamente de transporte de mercancías peligrosas"], correcta: 0 },
  { enunciado: "¿Qué obligación tiene el conductor frente a un vehículo prioritario que se aproxima con señales activadas?", explicacion: "Facilitarle el paso, cediéndole prioridad y apartándose si es necesario.", dificultad: "dificil", opciones: ["Facilitarle el paso, cediéndole prioridad si es necesario", "Ninguna obligación específica distinta de la circulación habitual", "Aumentar la velocidad para alejarse cuanto antes de ese vehículo", "Detenerse siempre de forma inmediata, con independencia del lugar"], correcta: 0 },
]);

const S3 = "rgc-adelantamientos-y-cambios-de-direccion";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué condiciones generales debe cumplir un adelantamiento según el RGC?", reverso: "Disponer de espacio suficiente para completarlo sin peligro, contar con visibilidad adecuada del tramo, advertirlo con el intermitente correspondiente, y no realizarlo en tramos donde esté expresamente prohibido (curvas, cambios de rasante, pasos de peatones, entre otros)" },
  { anverso: "¿Qué debe hacer un conductor antes de realizar un cambio de dirección o de carril, según el RGC?", reverso: "Advertirlo con la debida antelación mediante el intermitente correspondiente, comprobar que puede realizar la maniobra sin peligro para el resto de usuarios de la vía, y realizarla de forma progresiva" },
  { anverso: "¿En qué lugares está expresamente prohibido adelantar según el RGC?", reverso: "Entre otros, en curvas y cambios de rasante de visibilidad reducida, en pasos de peatones o de ciclistas señalizados, en intersecciones, y en general en cualquier tramo donde la maniobra no pueda completarse con la visibilidad y el espacio necesarios" },
  { anverso: "¿Qué es la distancia de seguridad, tal como la recoge el RGC, y por qué se relaciona con el adelantamiento?", reverso: "El espacio que debe mantenerse respecto al vehículo precedente para poder detenerse sin colisionar; el RGC exige recuperar esa distancia con el vehículo adelantado tras completar el adelantamiento antes de reincorporarse a su carril" },
  { anverso: "¿Qué debe hacer un conductor que va a ser adelantado, según el RGC?", reverso: "Facilitar la maniobra al vehículo que adelanta, sin aumentar su velocidad ni realizar maniobras que dificulten o impidan el adelantamiento" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué condiciones generales debe cumplir un adelantamiento según el RGC?", explicacion: "Espacio suficiente, visibilidad adecuada, y advertirlo con el intermitente.", dificultad: "facil", opciones: ["Espacio suficiente, visibilidad adecuada y advertirlo con intermitente", "Ninguna condición específica, siendo libre en cualquier tramo de la vía", "Únicamente disponer de espacio suficiente, sin ninguna otra condición", "Únicamente contar con visibilidad, sin necesidad de advertir la maniobra"], correcta: 0 },
  { enunciado: "¿Qué debe hacer un conductor antes de un cambio de dirección o de carril?", explicacion: "Advertirlo con antelación mediante el intermitente y comprobar que puede hacerlo sin peligro.", dificultad: "media", opciones: ["Advertirlo con antelación y comprobar que puede hacerlo sin peligro", "Realizar la maniobra sin ninguna advertencia previa a otros conductores", "Detenerse siempre por completo antes de realizar cualquier cambio de carril", "Aumentar la velocidad antes de realizar el cambio de dirección previsto"], correcta: 0 },
  { enunciado: "¿En qué lugares está expresamente prohibido adelantar según el RGC?", explicacion: "En curvas y cambios de rasante de visibilidad reducida, pasos de peatones, intersecciones.", dificultad: "media", opciones: ["En curvas y cambios de rasante de visibilidad reducida", "En cualquier tramo recto de una vía interurbana señalizada", "En ningún lugar, al estar siempre permitido el adelantamiento", "Únicamente en autovías y autopistas de la red estatal española"], correcta: 0 },
  { enunciado: "¿Qué exige el RGC tras completar un adelantamiento respecto al vehículo adelantado?", explicacion: "Recuperar la distancia de seguridad antes de reincorporarse a su carril.", dificultad: "media", opciones: ["Recuperar la distancia de seguridad antes de reincorporarse al carril", "Ninguna exigencia adicional una vez completada la maniobra realizada", "Detenerse inmediatamente después de completar el adelantamiento realizado", "Mantener la misma velocidad que el vehículo adelantado de forma indefinida"], correcta: 0 },
  { enunciado: "¿Qué debe hacer un conductor que va a ser adelantado, según el RGC?", explicacion: "Facilitar la maniobra sin aumentar la velocidad ni dificultarla.", dificultad: "dificil", opciones: ["Facilitar la maniobra sin aumentar la velocidad ni dificultarla", "Aumentar la velocidad para dificultar la maniobra de adelantamiento", "Cambiar de carril de forma brusca durante la maniobra de adelantamiento", "Detenerse por completo mientras el otro vehículo realiza el adelantamiento"], correcta: 0 },
]);

console.log(`📖 glosario...`);
await insertar("glosario", [
  { tema_slug: TEMA, seccion: S1, termino: "RDLeg 6/2015", definicion: "Real Decreto Legislativo 6/2015: texto refundido de la Ley sobre Tráfico, Circulación de Vehículos a Motor y Seguridad Vial, marco legal básico español en esta materia." },
  { tema_slug: TEMA, seccion: S1, termino: "Permiso por puntos", definicion: "Sistema de control de las infracciones de tráfico mediante la resta de puntos del permiso de conducción, que puede llevar a su pérdida de vigencia al agotarse el saldo." },
  { tema_slug: TEMA, seccion: S2, termino: "Prioridad de la derecha", definicion: "Regla general de prioridad de paso en una intersección sin señalizar, según la cual tiene preferencia el vehículo que circula por la derecha del conductor que llega a la intersección." },
  { tema_slug: TEMA, seccion: S2, termino: "Vehículo prioritario", definicion: "Vehículo de los servicios de urgencia que, en servicio urgente y con la señalización luminosa y acústica activada, puede circular incumpliendo ciertas normas con las máximas precauciones." },
  { tema_slug: TEMA, seccion: S3, termino: "Cambio de rasante", definicion: "Punto de la vía donde varía la pendiente longitudinal, reduciendo la visibilidad del tramo siguiente y por tanto un lugar donde suele estar prohibido adelantar." },
  { tema_slug: TEMA, seccion: S3, termino: "Distancia de seguridad", definicion: "Espacio que debe mantenerse respecto al vehículo precedente para poder detenerse sin colisionar, que el RGC exige recuperar tras completar un adelantamiento." },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 12 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 12, orden: 12, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-272 creado y vinculado como Tema 12 de Oficial Conductor General.");
