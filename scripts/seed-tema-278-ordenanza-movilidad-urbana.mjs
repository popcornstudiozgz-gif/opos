/**
 * Crea tema-278: "Ordenanza de Movilidad Urbana de Zaragoza" — Tema 18
 * (numero=18, bloque-2) de Oficial Conductor, Especialidad General
 * (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 16 oficial del Anexo I (bases2110.pdf, línea
 * 1587):
 *   "Ordenanza de Movilidad Urbana de Zaragoza."
 *
 * Sourcing: normativa municipal real, descargada y leída directamente
 * en esta sesión — Ordenanza de Movilidad Urbana de Zaragoza (texto
 * íntegro publicado en zaragoza.es/contenidos/normativa/
 * ORDENANZA_MOVILIDAD_URBANA_def.pdf, aprobación definitiva Pleno,
 * publicada en el BOPZ núm. 192 de 21-08-2024, en vigor desde el
 * 11-09-2024 — verificada de nuevo en esta sesión). Se cita el artículo
 * exacto de la ordenanza en cada punto del temario. La ordenanza remite
 * a su vez a instrucciones técnicas (IT-MOV-06, IT-MOV-08) y a un
 * Reglamento específico del Servicio de Estacionamiento Regulado, no
 * descargados ni verificados en esta sesión — se cita su existencia sin
 * desarrollar su contenido concreto, siguiendo el mismo criterio de no
 * fabricación aplicado a otros documentos no verificados del proyecto.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-278-ordenanza-movilidad-urbana.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-278";
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
  titulo: "Ordenanza de Movilidad Urbana de Zaragoza",
  descripcion: "Objeto y ámbito de aplicación de la Ordenanza (arts. 1-3). Zonas de acceso restringido y de prioridad peatonal (arts. 20-23). El Servicio de Estacionamiento Regulado (SER) y las operaciones de carga y descarga (arts. 40, 90-93).",
  contenido: "Desarrolla la Ordenanza de Movilidad Urbana de Zaragoza (aprobación definitiva del Pleno, BOPZ núm. 192 de 21-08-2024, en vigor desde el 11-09-2024): su objeto y ámbito de aplicación en todo el término municipal, las zonas de acceso restringido al tráfico rodado y las calles de prioridad peatonal, el Servicio de Estacionamiento Regulado (SER) que fija tiempos máximos de permanencia en determinadas zonas de la vía pública, y las condiciones específicas —horarios, tiempos máximos, autorizaciones— exigidas para las operaciones de carga y descarga en la vía pública.",
  enlaces_boe: [
    { url: "https://www.zaragoza.es/contenidos/normativa/ORDENANZA_MOVILIDAD_URBANA_def.pdf", titulo: "Ordenanza de Movilidad Urbana de Zaragoza (texto íntegro)" },
  ],
  indice_estudio: [
    { url: "https://www.zaragoza.es/contenidos/normativa/ORDENANZA_MOVILIDAD_URBANA_def.pdf#page=17", titulo: "Objeto, ámbito de aplicación y órganos competentes", seccion: "objeto-ambito-y-organos-competentes", articulos: "Ordenanza de Movilidad Urbana, arts. 1-3" },
    { url: "https://www.zaragoza.es/contenidos/normativa/ORDENANZA_MOVILIDAD_URBANA_def.pdf#page=28", titulo: "Zonas de acceso restringido y de prioridad peatonal", seccion: "zonas-acceso-restringido-y-prioridad-peatonal", articulos: "Ordenanza de Movilidad Urbana, arts. 20-23" },
    { url: "https://www.zaragoza.es/contenidos/normativa/ORDENANZA_MOVILIDAD_URBANA_def.pdf#page=42", titulo: "Estacionamiento regulado (SER) y carga y descarga", seccion: "estacionamiento-regulado-y-carga-descarga", articulos: "Ordenanza de Movilidad Urbana, arts. 40, 90-93" },
  ],
}]);

const S1 = "objeto-ambito-y-organos-competentes";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Cuál es el objeto de la Ordenanza de Movilidad Urbana de Zaragoza, según su artículo 1?", reverso: "Regular y ordenar la movilidad de las personas y la circulación de vehículos, compatibilizando la fluidez del tráfico con el uso peatonal de las calles, y regular otros usos y actividades para asegurar la sostenibilidad social, ambiental y económica, preservar la salud y fomentar la seguridad vial" },
  { anverso: "¿Cuál es el ámbito territorial de aplicación de la Ordenanza, según su artículo 2?", reverso: "Todo el término municipal de Zaragoza, en relación con los usos y actividades realizados en vías y espacios aptos para la movilidad o la circulación, incluidas las vías interurbanas de titularidad municipal, los caminos rurales y los espacios abiertos de uso público" },
  { anverso: "¿A qué normativa estatal se remite el artículo 3 de la Ordenanza como fundamento de la competencia municipal en materia de tráfico?", reverso: "A la Ley 7/1985, Reguladora de las Bases del Régimen Local, y al Real Decreto Legislativo 339/1990 (antecesor del actual RDLeg 6/2015), sobre Tráfico, Circulación de Vehículos a Motor y Seguridad Vial" },
  { anverso: "¿Qué órgano municipal tiene, según el artículo 3, la competencia para la regulación general de la Movilidad Urbana en Zaragoza?", reverso: "El Ayuntamiento en Pleno, mediante la aprobación de disposiciones de carácter general en la materia, como la propia Ordenanza de Movilidad Urbana" },
  { anverso: "¿Qué facultad reconoce el artículo 3 a los agentes de la Policía Local en materia de ordenación del tránsito?", reverso: "La de adoptar medidas de ordenación imprescindibles en caso de grave e inminente necesidad, complementando la competencia general del Ayuntamiento en Pleno y del Gobierno de Zaragoza" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Cuál es el objeto de la Ordenanza de Movilidad Urbana de Zaragoza, según su artículo 1?", explicacion: "Regular la movilidad de personas y la circulación de vehículos, compatibilizando fluidez del tráfico y uso peatonal.", dificultad: "facil", opciones: ["Regular la movilidad de personas y la circulación de vehículos", "Regular exclusivamente la Inspección Técnica de Vehículos del municipio", "Regular exclusivamente el Certificado de Aptitud Profesional de los conductores", "Regular exclusivamente el régimen sancionador estatal de tráfico"], correcta: 0 },
  { enunciado: "¿Cuál es el ámbito territorial de aplicación de la Ordenanza, según su artículo 2?", explicacion: "Todo el término municipal de Zaragoza, incluidas vías interurbanas municipales y caminos rurales.", dificultad: "media", opciones: ["Todo el término municipal de Zaragoza", "Únicamente el distrito Centro de la ciudad de Zaragoza", "Únicamente las vías interurbanas de titularidad estatal", "Únicamente los barrios rurales del término municipal"], correcta: 0 },
  { enunciado: "¿A qué normativa estatal se remite el artículo 3 como fundamento de la competencia municipal?", explicacion: "A la Ley 7/1985 (bases del régimen local) y al RDLeg 339/1990 (antecesor del RDLeg 6/2015).", dificultad: "media", opciones: ["A la Ley 7/1985 y al RDLeg 339/1990 sobre tráfico y seguridad vial", "Únicamente al Reglamento General de Vehículos, sin ninguna otra norma", "Únicamente al Reglamento General de Conductores, sin ninguna otra norma", "A ninguna normativa estatal, al ser una competencia exclusivamente municipal"], correcta: 0 },
  { enunciado: "¿Qué órgano tiene la competencia para la regulación general de la Movilidad Urbana en Zaragoza?", explicacion: "El Ayuntamiento en Pleno.", dificultad: "media", opciones: ["El Ayuntamiento en Pleno", "Únicamente la Policía Local de Zaragoza", "Únicamente la Dirección General de Tráfico estatal", "Únicamente el Gobierno de Aragón, sin competencia municipal alguna"], correcta: 0 },
  { enunciado: "¿Qué facultad reconoce el artículo 3 a los agentes de la Policía Local?", explicacion: "Adoptar medidas de ordenación imprescindibles en caso de grave e inminente necesidad.", dificultad: "dificil", opciones: ["Adoptar medidas de ordenación en caso de grave e inminente necesidad", "Aprobar por sí mismos la Ordenanza de Movilidad Urbana completa", "Modificar unilateralmente el articulado de la Ordenanza vigente", "Ninguna facultad específica distinta de la ya asumida por el Pleno"], correcta: 0 },
]);

const S2 = "zonas-acceso-restringido-y-prioridad-peatonal";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué son las zonas de acceso restringido al tráfico rodado, según el artículo 20 de la Ordenanza?", reverso: "Zonas o vías en las que, por su valor patrimonial, razones medioambientales, de seguridad vial, priorización del transporte público o interés público, solo está permitido el acceso, circulación y estacionamiento en lugares habilitados a los vehículos autorizados" },
  { anverso: "¿Cómo se controla el acceso a las zonas de acceso restringido, según el artículo 22 de la Ordenanza?", reverso: "Mediante señalización, semaforización, sistemas tecnológicos, sistemas de bolardos retráctiles o cualquier otra forma que se considere adecuada a cada limitación concreta" },
  { anverso: "¿Qué es una zona peatonal dentro de una calle, según el artículo 23 de la Ordenanza?", reverso: "Una parte de la vía, elevada o delimitada de otra forma, reservada a la circulación de peatones (incluida la acera, el andén y el paseo), en la que está prohibida la circulación y el estacionamiento de vehículos salvo para atravesarla por los lugares habilitados, acceder a fincas o con autorización expresa" },
  { anverso: "¿Qué excepción recoge el artículo 23 sobre la prioridad peatonal en zonas de plataforma única compartida?", reverso: "Que en las zonas de tránsito de plataforma única compartida usadas principalmente por transporte público urbano colectivo (tranvía, autobús), la prioridad peatonal queda restringida en la zona de circulación de esos vehículos de transporte público" },
  { anverso: "¿A qué instrumento técnico remite el artículo 21 de la Ordenanza para el régimen concreto de acceso a las zonas restringidas?", reverso: "A la Instrucción Técnica IT-MOV-06, \"Régimen de acceso a las zonas de acceso restringido del tráfico rodado\", que desarrolla el marco regulatorio específico de cada zona" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué son las zonas de acceso restringido al tráfico rodado, según el artículo 20?", explicacion: "Zonas donde solo pueden acceder, circular y estacionar los vehículos autorizados.", dificultad: "facil", opciones: ["Zonas donde solo pueden circular y estacionar los vehículos autorizados", "Zonas donde está permitida la circulación libre de cualquier vehículo", "Zonas exclusivas para vehículos de transporte público, sin ninguna excepción", "Zonas exclusivas para vehículos de emergencia, sin ninguna otra excepción"], correcta: 0 },
  { enunciado: "¿Cómo se controla el acceso a las zonas de acceso restringido, según el artículo 22?", explicacion: "Mediante señalización, semaforización, sistemas tecnológicos o bolardos retráctiles.", dificultad: "media", opciones: ["Mediante señalización, semaforización o sistemas tecnológicos", "Únicamente mediante la presencia física permanente de un agente", "Únicamente mediante el pago de una tasa previa al acceso a la zona", "No existe ningún sistema de control de acceso a estas zonas restringidas"], correcta: 0 },
  { enunciado: "¿Qué es una zona peatonal dentro de una calle, según el artículo 23?", explicacion: "Parte de la vía reservada a peatones, donde está prohibida la circulación de vehículos salvo excepciones.", dificultad: "media", opciones: ["Parte de la vía reservada a peatones, con circulación de vehículos prohibida", "Toda la calzada de una vía, sin ninguna distinción entre peatones y vehículos", "Una vía exclusiva para vehículos de transporte público urbano colectivo", "Un aparcamiento exclusivo para residentes de la zona correspondiente"], correcta: 0 },
  { enunciado: "¿Qué excepción recoge el artículo 23 sobre la prioridad peatonal en plataforma única compartida?", explicacion: "La prioridad peatonal se restringe en la zona de circulación del transporte público (tranvía, autobús).", dificultad: "media", opciones: ["Se restringe en la zona de circulación del transporte público colectivo", "No existe ninguna excepción a la prioridad peatonal en este tipo de zonas", "La excepción se aplica únicamente a los vehículos privados de residentes", "La excepción se aplica únicamente durante el horario nocturno de la zona"], correcta: 0 },
  { enunciado: "¿A qué instrumento técnico remite el artículo 21 para el régimen de acceso a las zonas restringidas?", explicacion: "A la Instrucción Técnica IT-MOV-06.", dificultad: "dificil", opciones: ["A la Instrucción Técnica IT-MOV-06", "Al Reglamento General de Circulación exclusivamente, sin instrucción adicional", "A la Ordenanza Fiscal municipal correspondiente, sin instrucción técnica alguna", "No existe ningún instrumento técnico adicional distinto de la propia Ordenanza"], correcta: 0 },
]);

const S3 = "estacionamiento-regulado-y-carga-descarga";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es el Servicio de Estacionamiento Regulado (SER), según el artículo 40 de la Ordenanza?", reverso: "El servicio que regula los espacios de aparcamiento en la vía pública y el dominio público, incluidos los asociados a una zona verde o equipamiento municipal, fijando tiempos máximos de permanencia mediante un título físico o telemático que habilita para el estacionamiento" },
  { anverso: "¿Qué horario general establece el artículo 92 para las operaciones de carga y descarga en lugares de estacionamiento autorizado libre?", reverso: "Entre las 7:00 y las 21:00 horas, sin límite de tiempo para vehículos de hasta 3,5 toneladas de MMA; los vehículos de MMA superior a 3,5 y hasta 18 toneladas solo durante el tiempo mínimo necesario para la operación" },
  { anverso: "¿Qué exige el artículo 92 para realizar operaciones de carga y descarga nocturna (entre las 21:00 y las 7:00) con vehículos de MMA superior a 2 toneladas?", reverso: "Disponer del correspondiente permiso especial de descarga nocturna, que puede exigirse también de oficio para vehículos de MMA inferior según el tipo de operación o ante denuncia o queja vecinal" },
  { anverso: "¿Cuál es el tiempo máximo general de uso de las reservas de carga y descarga, según el artículo 93?", reverso: "Treinta minutos, prorrogables en quince minutos adicionales cuando exista un sistema automatizado de control en la reserva, solicitando el transportista esa extensión a través de la aplicación informática habilitada" },
  { anverso: "¿Qué condición general exige el artículo 92 sobre el vuelo de cargas sobre la acera o la calzada durante una operación de carga y descarga?", reverso: "Que está prohibido, salvo que, con autorización previa, se acote totalmente la zona de posible caída y se señalice en los pasos anterior y posterior para facilitar el tránsito por la otra acera" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es el Servicio de Estacionamiento Regulado (SER), según el artículo 40?", explicacion: "Regula los espacios de aparcamiento en vía y dominio público, fijando tiempos máximos de permanencia.", dificultad: "facil", opciones: ["Regula el aparcamiento fijando tiempos máximos de permanencia", "Regula exclusivamente las operaciones de carga y descarga del municipio", "Regula exclusivamente el acceso a las zonas de prioridad peatonal", "Regula exclusivamente el transporte público colectivo del municipio"], correcta: 0 },
  { enunciado: "¿Qué horario general establece el artículo 92 para la carga y descarga en estacionamiento libre?", explicacion: "Entre las 7:00 y las 21:00, sin límite de tiempo para vehículos de hasta 3,5 toneladas de MMA.", dificultad: "media", opciones: ["Entre las 7:00 y las 21:00, sin límite para vehículos de hasta 3,5 t", "Entre las 21:00 y las 7:00, exclusivamente en horario nocturno", "Sin ninguna limitación horaria para ningún tipo de vehículo", "Únicamente entre las 12:00 y las 14:00 horas del mediodía"], correcta: 0 },
  { enunciado: "¿Qué exige el artículo 92 para la carga y descarga nocturna con vehículos de MMA superior a 2 toneladas?", explicacion: "Disponer del permiso especial de descarga nocturna.", dificultad: "media", opciones: ["Disponer del permiso especial de descarga nocturna", "Ninguna exigencia adicional distinta del horario diurno ordinario", "Disponer únicamente del permiso de conducción de la clase C", "Disponer únicamente del Certificado de Aptitud Profesional (CAP)"], correcta: 0 },
  { enunciado: "¿Cuál es el tiempo máximo general de uso de las reservas de carga y descarga, según el artículo 93?", explicacion: "Treinta minutos, prorrogables en 15 minutos con sistema automatizado de control.", dificultad: "media", opciones: ["Treinta minutos, prorrogables en 15 minutos adicionales", "Dos horas, sin ninguna posibilidad de prórroga adicional", "Cinco minutos, sin ninguna posibilidad de prórroga adicional", "No existe ningún tiempo máximo para el uso de estas reservas"], correcta: 0 },
  { enunciado: "¿Qué exige el artículo 92 sobre el vuelo de cargas sobre acera o calzada?", explicacion: "Está prohibido, salvo autorización previa con la zona acotada y señalizada.", dificultad: "dificil", opciones: ["Está prohibido, salvo autorización previa con la zona acotada", "Está permitido libremente, sin ninguna autorización ni señalización previa", "Está permitido únicamente durante el horario nocturno de la operación", "Está prohibido en cualquier caso, sin ninguna excepción posible prevista"], correcta: 0 },
]);

console.log(`📖 glosario...`);
await insertar("glosario", [
  { tema_slug: TEMA, seccion: S1, termino: "PMUS", definicion: "Plan de Movilidad Urbana Sostenible: instrumento de planificación al que remite el artículo 3 de la Ordenanza para el desarrollo de las medidas de ordenación de la movilidad en Zaragoza." },
  { tema_slug: TEMA, seccion: S1, termino: "Sostenibilidad social, ambiental y económica", definicion: "Uno de los fines expresos del artículo 1 de la Ordenanza de Movilidad Urbana, junto con la preservación de la salud y el fomento de la seguridad vial." },
  { tema_slug: TEMA, seccion: S2, termino: "Zona de acceso restringido", definicion: "Zona o vía en la que, según el artículo 20 de la Ordenanza, solo está permitido el acceso, circulación y estacionamiento en lugares habilitados a los vehículos autorizados." },
  { tema_slug: TEMA, seccion: S2, termino: "Bolardo retráctil", definicion: "Sistema tecnológico de control de accesos citado en el artículo 22 de la Ordenanza para restringir físicamente la entrada de vehículos no autorizados a una zona." },
  { tema_slug: TEMA, seccion: S3, termino: "SER", definicion: "Servicio de Estacionamiento Regulado: regula, según el artículo 40 de la Ordenanza, los espacios de aparcamiento en vía y dominio público fijando tiempos máximos de permanencia." },
  { tema_slug: TEMA, seccion: S3, termino: "Permiso de descarga nocturna", definicion: "Autorización exigida por el artículo 92 de la Ordenanza para realizar operaciones de carga y descarga entre las 21:00 y las 7:00 con vehículos de MMA superior a 2 toneladas." },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 18 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 18, orden: 18, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-278 creado y vinculado como Tema 18 de Oficial Conductor General.");
