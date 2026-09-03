/**
 * Crea tema-273: "Certificado de Aptitud Profesional (CAP), para
 * conducción de vehículos. Tacógrafo: Tiempos de conducción y descanso.
 * Sanciones" — Tema 13 (numero=13, bloque-2) de Oficial Conductor,
 * Especialidad General (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 11 oficial del Anexo I (bases2110.pdf, línea
 * 1581):
 *   "Certificado de Aptitud Profesional (CAP), para conducción de
 *   vehículos. Tacógrafo: Tiempos de conducción y descanso. Sanciones."
 *
 * Sourcing: normativa real y verificada — Real Decreto 1032/2007
 * (BOE-A-2007-14726, cualificación inicial y formación continua de
 * conductores profesionales / CAP), Reglamento (CE) 561/2006 (tiempos
 * de conducción y descanso) y Reglamento (UE) 165/2014 (tacógrafos),
 * ambos de aplicación directa en España vía DOUE.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-273-cap-tacografo.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-273";
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
  titulo: "Certificado de Aptitud Profesional (CAP) y tacógrafo",
  descripcion: "El Real Decreto 1032/2007: cualificación inicial y formación continua de conductores profesionales (CAP). El tacógrafo: tiempos de conducción y descanso (Reglamento CE 561/2006 y Reglamento UE 165/2014). Régimen sancionador.",
  contenido: "Desarrolla el Certificado de Aptitud Profesional (CAP) regulado por el Real Decreto 1032/2007, exigido para la conducción profesional de determinados vehículos, incluida su cualificación inicial y formación continua obligatoria; el tacógrafo como dispositivo de control de los tiempos de conducción y descanso, regulado por el Reglamento (UE) 165/2014 y el Reglamento (CE) 561/2006; y el régimen sancionador aplicable al incumplimiento de estas obligaciones.",
  enlaces_boe: [
    { url: "https://www.boe.es/buscar/doc.php?id=BOE-A-2007-14726", titulo: "Real Decreto 1032/2007 (cualificación inicial y formación continua de conductores — CAP)" },
    { url: "https://www.boe.es/buscar/doc.php?id=DOUE-L-2014-80362", titulo: "Reglamento (UE) 165/2014 (tacógrafos)" },
  ],
  indice_estudio: [
    { url: "https://www.boe.es/buscar/doc.php?id=BOE-A-2007-14726", titulo: "El Certificado de Aptitud Profesional (CAP)", seccion: "el-certificado-de-aptitud-profesional-cap", articulos: "RD 1032/2007" },
    { url: "https://www.boe.es/buscar/doc.php?id=DOUE-L-2014-80362", titulo: "El tacógrafo y los tiempos de conducción y descanso", seccion: "el-tacografo-y-tiempos-de-conduccion-y-descanso", articulos: "Reglamento UE 165/2014, Reglamento CE 561/2006" },
    { url: "", titulo: "Sanciones por incumplimiento del CAP y el tacógrafo", seccion: "sanciones-por-incumplimiento-cap-y-tacografo", articulos: "Conceptos fundamentales" },
  ],
}]);

const S1 = "el-certificado-de-aptitud-profesional-cap";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es el Certificado de Aptitud Profesional (CAP)?", reverso: "Un título exigido, además del correspondiente permiso de conducción, para conducir profesionalmente determinados vehículos destinados al transporte de personas o mercancías por carretera, regulado por el Real Decreto 1032/2007" },
  { anverso: "¿Qué es la cualificación inicial del CAP?", reverso: "La formación exigida para obtener por primera vez el CAP, que puede realizarse mediante un curso ordinario (con un número determinado de horas lectivas y examen final) o mediante una modalidad acelerada, con menos horas" },
  { anverso: "¿Qué es la formación continua del CAP?", reverso: "Cursos periódicos que debe realizar el conductor profesional una vez obtenido el CAP, con el fin de actualizar y renovar sus conocimientos, que deben repetirse con la periodicidad establecida (en torno a cada cinco años) para mantener la validez del certificado" },
  { anverso: "¿A qué tipo de vehículos exige el CAP con carácter general?", reverso: "A los vehículos destinados al transporte de mercancías con un peso máximo autorizado superior a un determinado límite, y a los vehículos destinados al transporte de personas con más de un determinado número de plazas, conducidos con fines profesionales" },
  { anverso: "¿Qué consecuencia tiene conducir profesionalmente un vehículo sujeto a la exigencia de CAP sin disponer de él?", reverso: "Constituye una infracción administrativa sancionable, además de la posible responsabilidad derivada de conducir sin la cualificación profesional exigida por la normativa" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es el Certificado de Aptitud Profesional (CAP)?", explicacion: "Un título exigido para conducir profesionalmente determinados vehículos.", dificultad: "facil", opciones: ["Un título exigido para conducir profesionalmente determinados vehículos", "El permiso de conducción ordinario exigido a cualquier conductor", "Un seguro obligatorio de responsabilidad civil del vehículo", "Un distintivo ambiental exigido para circular por zonas urbanas"], correcta: 0 },
  { enunciado: "¿Qué es la cualificación inicial del CAP?", explicacion: "La formación exigida para obtener por primera vez el CAP.", dificultad: "media", opciones: ["La formación exigida para obtener por primera vez el CAP", "La formación periódica exigida una vez ya obtenido el CAP", "El examen exclusivo para obtener el permiso de conducción ordinario", "Un curso exclusivo de mecánica del automóvil sin relación con el CAP"], correcta: 0 },
  { enunciado: "¿Qué es la formación continua del CAP?", explicacion: "Cursos periódicos para actualizar conocimientos y mantener la validez del certificado.", dificultad: "media", opciones: ["Cursos periódicos para mantener la validez del certificado", "La formación exigida únicamente antes de obtener por primera vez el CAP", "Un examen único que sustituye por completo a la cualificación inicial", "Un trámite exclusivamente administrativo sin ninguna formación real"], correcta: 0 },
  { enunciado: "¿A qué tipo de vehículos exige el CAP con carácter general?", explicacion: "A vehículos de transporte de mercancías o personas por encima de ciertos límites, conducidos profesionalmente.", dificultad: "media", opciones: ["A vehículos de transporte de mercancías o personas conducidos profesionalmente", "A cualquier vehículo particular, con independencia de su uso concreto", "Únicamente a los vehículos eléctricos destinados al transporte urbano", "Únicamente a los vehículos de menos de cuatro plazas de pasajeros"], correcta: 0 },
  { enunciado: "¿Qué consecuencia tiene conducir profesionalmente sin el CAP exigido?", explicacion: "Constituye una infracción administrativa sancionable.", dificultad: "dificil", opciones: ["Constituye una infracción administrativa sancionable", "No tiene ninguna consecuencia legal real para el conductor", "Únicamente genera una advertencia verbal sin sanción económica", "Solo afecta a la validez del seguro, sin ninguna sanción administrativa"], correcta: 0 },
]);

const S2 = "el-tacografo-y-tiempos-de-conduccion-y-descanso";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es el tacógrafo?", reverso: "Un dispositivo instalado a bordo de determinados vehículos que registra automáticamente los tiempos de conducción, de pausa y de descanso del conductor, así como la velocidad y la distancia recorrida, regulado por el Reglamento (UE) 165/2014" },
  { anverso: "¿Qué establece el Reglamento (CE) 561/2006 sobre el tiempo máximo de conducción diaria?", reverso: "Con carácter general, un tiempo de conducción diario máximo de 9 horas, ampliable hasta 10 horas un máximo de dos veces por semana" },
  { anverso: "¿Qué pausa exige el Reglamento (CE) 561/2006 tras un determinado tiempo de conducción continuada?", reverso: "Una pausa de al menos 45 minutos tras 4 horas y media de conducción continuada, que puede fraccionarse en dos periodos (15 minutos seguidos de 30 minutos) dentro de ese mismo periodo de conducción" },
  { anverso: "¿Qué es el descanso diario, según esta normativa, y cuál es su duración mínima general?", reverso: "El periodo de descanso ininterrumpido que debe disfrutar el conductor cada 24 horas, con una duración mínima general de 11 horas, reducible en determinadas condiciones hasta un mínimo de 9 horas un número limitado de veces por semana" },
  { anverso: "¿Qué diferencia existe entre el tacógrafo analógico y el tacógrafo digital (o inteligente)?", reverso: "El tacógrafo analógico registra los datos en un disco de papel; el tacógrafo digital los registra electrónicamente en una tarjeta de conductor y en la memoria del propio equipo, siendo el tacógrafo inteligente su versión más reciente, con capacidades adicionales de geolocalización" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es el tacógrafo?", explicacion: "Un dispositivo que registra los tiempos de conducción, pausa y descanso del conductor.", dificultad: "facil", opciones: ["Un dispositivo que registra los tiempos de conducción y descanso", "Un dispositivo exclusivo para medir la presión de los neumáticos", "Un dispositivo exclusivo para medir el nivel de aceite del motor", "Un dispositivo exclusivo para regular la velocidad máxima del vehículo"], correcta: 0 },
  { enunciado: "¿Cuál es el tiempo de conducción diario máximo con carácter general, según el Reglamento (CE) 561/2006?", explicacion: "9 horas, ampliable a 10 horas un máximo de dos veces por semana.", dificultad: "media", opciones: ["9 horas, ampliable a 10 horas un máximo de dos veces por semana", "6 horas, sin ninguna posibilidad de ampliación en ningún caso", "12 horas, sin ningún límite adicional en ninguna circunstancia", "No existe ningún límite máximo de conducción diaria establecido"], correcta: 0 },
  { enunciado: "¿Qué pausa exige el Reglamento (CE) 561/2006 tras 4 horas y media de conducción continuada?", explicacion: "Una pausa de al menos 45 minutos, fraccionable en 15+30 minutos.", dificultad: "media", opciones: ["Una pausa de al menos 45 minutos, fraccionable en 15 y 30 minutos", "Una pausa de al menos 5 minutos, sin ninguna posibilidad de fraccionarla", "No se exige ninguna pausa obligatoria tras ese tiempo de conducción", "Una pausa de al menos 2 horas completas sin ninguna excepción posible"], correcta: 0 },
  { enunciado: "¿Cuál es la duración mínima general del descanso diario del conductor?", explicacion: "11 horas, reducible hasta 9 horas en determinadas condiciones.", dificultad: "media", opciones: ["11 horas, reducible hasta 9 horas en determinadas condiciones", "24 horas completas, sin ninguna posibilidad de reducción en ningún caso", "4 horas, sin ninguna relación real con el tiempo de conducción diario", "No existe ninguna duración mínima de descanso diario establecida"], correcta: 0 },
  { enunciado: "¿Qué diferencia existe entre el tacógrafo analógico y el digital?", explicacion: "El analógico usa un disco de papel; el digital registra electrónicamente en una tarjeta de conductor.", dificultad: "dificil", opciones: ["El analógico usa disco de papel; el digital, tarjeta de conductor", "Ambos tipos de tacógrafo funcionan exactamente de la misma forma", "El digital usa disco de papel y el analógico tarjeta de conductor", "El tacógrafo analógico no existe en ningún vehículo actualmente"], correcta: 0 },
]);

const S3 = "sanciones-por-incumplimiento-cap-y-tacografo";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué tipo de infracción constituye, con carácter general, conducir sin el CAP exigido para el tipo de vehículo utilizado?", reverso: "Una infracción administrativa sancionable, cuya gravedad y cuantía de la sanción se establecen en la normativa de tráfico y transporte correspondiente, con independencia de que el conductor disponga del permiso de conducción ordinario" },
  { anverso: "¿Qué consecuencia puede tener manipular o falsear los datos registrados por el tacógrafo?", reverso: "Constituye una infracción especialmente grave, dado que compromete la finalidad del propio sistema de control de los tiempos de conducción y descanso, orientado a la seguridad vial y a la protección de la salud del conductor" },
  { anverso: "¿Qué consecuencia puede tener superar los tiempos máximos de conducción o no respetar los descansos mínimos exigidos?", reverso: "Constituye una infracción sancionable, tanto para el conductor como, en determinados casos, para la empresa o entidad responsable de organizar el servicio, dado el riesgo que supone la fatiga del conductor para la seguridad vial" },
  { anverso: "¿Por qué se considera especialmente relevante el control del tiempo de conducción y descanso mediante el tacógrafo?", reverso: "Porque la fatiga del conductor es un factor de riesgo directamente relacionado con la seguridad vial, aumentando el tiempo de reacción y reduciendo la capacidad de control del vehículo, especialmente en conducción profesional prolongada" },
  { anverso: "¿Qué debería hacer un conductor profesional si detecta una avería en el tacógrafo de su vehículo durante un servicio?", reverso: "Comunicarlo cuanto antes para su reparación, dado que circular con el tacógrafo averiado sin cumplir determinadas obligaciones alternativas de registro puede constituir igualmente una infracción sancionable" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué tipo de infracción constituye conducir sin el CAP exigido?", explicacion: "Una infracción administrativa sancionable.", dificultad: "facil", opciones: ["Una infracción administrativa sancionable", "Ninguna infracción, si el conductor dispone del permiso ordinario", "Una infracción exclusivamente de carácter penal, nunca administrativa", "Una infracción sancionable solo si se repite en más de una ocasión"], correcta: 0 },
  { enunciado: "¿Qué consecuencia puede tener manipular o falsear los datos del tacógrafo?", explicacion: "Constituye una infracción especialmente grave.", dificultad: "media", opciones: ["Constituye una infracción especialmente grave", "No tiene ninguna consecuencia legal real para el conductor", "Únicamente genera una advertencia verbal sin sanción económica", "Solo sería sancionable si se hiciera de forma reiterada varias veces"], correcta: 0 },
  { enunciado: "¿Qué consecuencia puede tener superar los tiempos máximos de conducción?", explicacion: "Constituye una infracción sancionable para el conductor y, en su caso, la empresa.", dificultad: "media", opciones: ["Constituye una infracción sancionable para conductor y empresa", "No tiene ninguna consecuencia legal si el trayecto se completa con éxito", "Solo sería sancionable si se supera el tiempo máximo en más de 5 horas", "Únicamente sería sancionable la empresa, nunca el propio conductor"], correcta: 0 },
  { enunciado: "¿Por qué se considera especialmente relevante el control de los tiempos de conducción y descanso?", explicacion: "Porque la fatiga del conductor es un factor de riesgo para la seguridad vial.", dificultad: "media", opciones: ["Porque la fatiga del conductor es un factor de riesgo para la seguridad", "Porque reduce exclusivamente el consumo de combustible del vehículo", "Porque no guarda ninguna relación real con la seguridad vial", "Porque afecta exclusivamente al desgaste mecánico del propio vehículo"], correcta: 0 },
  { enunciado: "¿Qué debería hacer un conductor si detecta una avería en el tacógrafo durante un servicio?", explicacion: "Comunicarlo cuanto antes para su reparación.", dificultad: "dificil", opciones: ["Comunicarlo cuanto antes para su reparación", "Continuar el servicio sin comunicarlo, al no tener ninguna relevancia", "Desconectar por completo el tacógrafo hasta finalizar el servicio", "Sustituir él mismo el tacógrafo sin comunicar la avería detectada"], correcta: 0 },
]);

console.log(`📖 glosario...`);
await insertar("glosario", [
  { tema_slug: TEMA, seccion: S1, termino: "CAP", definicion: "Certificado de Aptitud Profesional: título exigido, junto al permiso de conducción, para conducir profesionalmente determinados vehículos de transporte de personas o mercancías, regulado por el RD 1032/2007." },
  { tema_slug: TEMA, seccion: S1, termino: "Formación continua", definicion: "Cursos periódicos que debe realizar el conductor profesional para mantener la validez del CAP una vez obtenido, con la periodicidad establecida por la normativa." },
  { tema_slug: TEMA, seccion: S2, termino: "Tacógrafo", definicion: "Dispositivo instalado a bordo de determinados vehículos que registra automáticamente los tiempos de conducción, pausa y descanso del conductor, la velocidad y la distancia recorrida." },
  { tema_slug: TEMA, seccion: S2, termino: "Tarjeta de conductor", definicion: "Tarjeta personal e intransferible del tacógrafo digital en la que se registran electrónicamente los datos de actividad de cada conductor profesional." },
  { tema_slug: TEMA, seccion: S3, termino: "Fatiga del conductor", definicion: "Estado de cansancio que reduce la capacidad de reacción y de control del vehículo, factor de riesgo directamente relacionado con la seguridad vial y controlado mediante el tacógrafo." },
  { tema_slug: TEMA, seccion: S3, termino: "Infracción sancionable", definicion: "Incumplimiento normativo (como conducir sin el CAP exigido, superar los tiempos de conducción o manipular el tacógrafo) que da lugar a una sanción administrativa según la normativa de tráfico y transporte." },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 13 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 13, orden: 13, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-273 creado y vinculado como Tema 13 de Oficial Conductor General.");
