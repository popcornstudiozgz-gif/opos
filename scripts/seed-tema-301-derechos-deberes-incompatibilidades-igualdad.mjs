/**
 * Crea tema-301: "Derechos y deberes del funcionario. Incompatibilidades.
 * Responsabilidad. Régimen disciplinario. Igualdad" — Tema 7 (numero=7,
 * bloque-1) de Bombero/a Conductor/a.
 *
 * Tema 7 oficial (bases2107.pdf, Anexo I): "Derechos y deberes del
 * funcionario público. Incompatibilidades. El régimen de responsabilidad
 * civil y penal del personal al servicio de las Administraciones Públicas.
 * Régimen disciplinario. Plan de Igualdad para las empleadas y empleados del
 * Ayuntamiento de Zaragoza. Ley 7/2018, de 28 de junio, de igualdad de
 * oportunidades entre mujeres y hombres en Aragón."
 *
 * Tema dedicado: la materia está repartida entre tema-17/tema-43
 * (derechos y deberes, disciplinario), tema-2 (Plan de Igualdad, Ley
 * 7/2018) y ningún tema cubría incompatibilidades ni responsabilidad.
 *
 * Fuentes leídas en la sesión (texto consolidado del BOE):
 * - RDLeg 5/2015, TREBEP (BOE-A-2015-11719): arts. 14, 15, 52-54, 93, 95-98.
 * - Ley 53/1984, de Incompatibilidades (BOE-A-1985-151): arts. 1, 3, 11,
 *   14, 16, 19 y 20.
 * - Ley 40/2015 (BOE-A-2015-10566): art. 36 (responsabilidad de autoridades
 *   y personal; apartado 6, "tanto de culpa" a los Tribunales). La
 *   responsabilidad penal se trata en ese marco (pase del tanto de culpa),
 *   sin desarrollar tipos penales concretos que el temario no enumera.
 * - Ley 7/2018 de Aragón (BOE-A-2018-11932): arts. 1-4, 7 y 51.
 * - II Plan de Igualdad para Empleadas y Empleados Municipales (PIEEM) del
 *   Ayuntamiento de Zaragoza: datos ya verificados y sembrados en tema-2
 *   (sección plan-igualdad-zaragoza) sobre el documento municipal
 *   zaragoza.es/cont/paginas/catalogopublicaciones/doc/12293.pdf.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-301-derechos-deberes-incompatibilidades-igualdad.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-301";
const OPOSICION = "bombero-conductor-ayto-zaragoza";
const BLOQUE_1_ID = "653513ce-b965-421a-a408-7bcc01058baf";
const NUMERO = 7;

const EBEP = "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11719";
const INCOMPAT = "https://www.boe.es/buscar/act.php?id=BOE-A-1985-151";
const LRJSP = "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10566";
const LEY_7_2018 = "https://www.boe.es/buscar/act.php?id=BOE-A-2018-11932";
const PIEEM = "https://www.zaragoza.es/cont/paginas/catalogopublicaciones/doc/12293.pdf";

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
  const insertadas = await insertar("preguntas", preguntas.map(({ opciones, correcta, ...p }) => ({ ...p, tema_slug: TEMA, seccion })));
  await insertar("opciones", insertadas.flatMap((pregunta, i) => preguntas[i].opciones.map((texto, orden) => ({ pregunta_id: pregunta.id, texto, es_correcta: orden === preguntas[i].correcta, orden }))));
  console.log(`   ✓ preguntas (${seccion}): ${insertadas.length}`);
}
const q = (seccion, dificultad, enunciado, opciones, explicacion) => ({ seccion, dificultad, enunciado, opciones, explicacion });
async function crearCaso({ slug, titulo, supuesto, orden, preguntas }) {
  if (preguntas.length !== 10) { console.error(`❌ ${titulo}: ${preguntas.length} preguntas (se esperaban 10)`); process.exit(1); }
  const [caso] = await insertar("casos_practicos", [{ tema_slug: TEMA, slug, titulo, supuesto, orden }]);
  const insertadas = await insertar("preguntas", preguntas.map((p) => ({ tema_slug: TEMA, seccion: p.seccion, enunciado: p.enunciado, explicacion: p.explicacion, dificultad: p.dificultad })));
  await insertar("opciones", insertadas.flatMap((pregunta, i) => preguntas[i].opciones.map((texto, idx) => ({ pregunta_id: pregunta.id, texto, es_correcta: idx === 0, orden: idx }))));
  await insertar("caso_preguntas", insertadas.map((pregunta, i) => ({ caso_id: caso.id, pregunta_id: pregunta.id, orden: i })));
  console.log(`   ✓ caso: ${titulo}`);
}

const S1 = "derechos-deberes-codigo-conducta";
const S2 = "incompatibilidades-responsabilidad";
const S3 = "regimen-disciplinario";
const S4 = "plan-igualdad-ley-7-2018";

console.log(`📚 Creando ${TEMA}...`);
await insertar("temas", [{
  slug: TEMA,
  titulo: "Derechos y deberes del funcionario, incompatibilidades, responsabilidad, régimen disciplinario e igualdad",
  descripcion: "Derechos individuales y colectivos y código de conducta de los empleados públicos. Incompatibilidades (Ley 53/1984). Responsabilidad patrimonial, civil y penal del personal. Régimen disciplinario del EBEP. Plan de Igualdad del Ayuntamiento de Zaragoza y Ley 7/2018 de igualdad de Aragón.",
  contenido: "Reúne el estatuto del funcionario visto desde sus obligaciones y garantías: qué derechos tiene y qué deberes y principios de conducta debe cumplir; cuándo puede compatibilizar otra actividad y qué requiere para ello; cómo responde por los daños que cause en el ejercicio de sus funciones; qué faltas y sanciones prevé el régimen disciplinario y con qué plazos prescriben; y el marco de igualdad de oportunidades del Ayuntamiento de Zaragoza y de la Comunidad Autónoma.",
  enlaces_boe: [
    { url: EBEP, titulo: "Texto refundido de la Ley del Estatuto Básico del Empleado Público (RDLeg 5/2015)" },
    { url: INCOMPAT, titulo: "Ley 53/1984, de Incompatibilidades del personal al servicio de las Administraciones Públicas" },
    { url: LRJSP, titulo: "Ley 40/2015, de Régimen Jurídico del Sector Público (art. 36)" },
    { url: LEY_7_2018, titulo: "Ley 7/2018, de igualdad de oportunidades entre mujeres y hombres en Aragón" },
    { url: PIEEM, titulo: "II Plan de Igualdad para Empleadas y Empleados Municipales del Ayuntamiento de Zaragoza" },
  ],
  indice_estudio: [
    { seccion: S1, titulo: "Derechos y deberes. Código de conducta", articulos: "TREBEP, arts. 14, 15 y 52-54", url: `${EBEP}#a14` },
    { seccion: S2, titulo: "Incompatibilidades y responsabilidad del personal", articulos: "Ley 53/1984, arts. 1, 3, 11, 14, 16, 19 y 20; Ley 40/2015, art. 36", url: `${INCOMPAT}#aprimero` },
    { seccion: S3, titulo: "Régimen disciplinario", articulos: "TREBEP, arts. 93-98", url: `${EBEP}#a93` },
    { seccion: S4, titulo: "Plan de Igualdad del Ayuntamiento y Ley 7/2018", articulos: "Ley 7/2018, arts. 1-4, 7 y 51; II PIEEM", url: `${LEY_7_2018}#ar-51` },
  ],
}]);

console.log(`📝 ${S1}...`);
await insertar("flashcards", [
  { anverso: "Cita cinco derechos individuales de los empleados públicos (art. 14 TREBEP)", reverso: "Por ejemplo: inamovilidad en la condición de funcionario de carrera; progresión en la carrera; percibir retribuciones e indemnizaciones; formación continua; protección eficaz en seguridad y salud en el trabajo; vacaciones, permisos y licencias; defensa jurídica por la Administración" },
  { anverso: "¿Qué derechos individuales se ejercen colectivamente (art. 15 TREBEP)?", reverso: "La libertad sindical; la negociación colectiva; la huelga, con mantenimiento de los servicios esenciales; el planteamiento de conflictos colectivos; y el derecho de reunión" },
  { anverso: "¿Qué establece el art. 52 TREBEP sobre los deberes de los empleados públicos?", reverso: "Que deben desempeñar con diligencia sus tareas y velar por los intereses generales con sujeción a la Constitución y al ordenamiento, conforme a principios como objetividad, integridad, neutralidad, responsabilidad, imparcialidad, confidencialidad o ejemplaridad: es el Código de Conducta" },
  { anverso: "¿Qué debe hacer un empleado público ante una orden de un superior que constituya una infracción manifiesta del ordenamiento (art. 54.3 TREBEP)?", reverso: "No obedecerla y ponerla inmediatamente en conocimiento de los órganos de inspección procedentes" },
  { anverso: "¿Qué dice el art. 54 TREBEP sobre regalos y sobre seguridad laboral?", reverso: "Que se rechazará cualquier regalo, favor o servicio en condiciones ventajosas que vaya más allá de los usos habituales, sociales y de cortesía; y que se observarán las normas sobre seguridad y salud laboral" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Cuál de estos es un derecho individual ejercido colectivamente según el art. 15 TREBEP?", explicacion: "La huelga, con la garantía del mantenimiento de los servicios esenciales de la comunidad.", dificultad: "facil", opciones: ["El ejercicio de la huelga, con mantenimiento de los servicios esenciales", "La inamovilidad en la condición de funcionario", "La formación continua"], correcta: 0 },
  { enunciado: "La inamovilidad en la condición de funcionario de carrera es, según el TREBEP:", explicacion: "Un derecho individual (art. 14.a).", dificultad: "facil", opciones: ["Un derecho individual", "Un deber del código de conducta", "Un derecho ejercido colectivamente"], correcta: 0 },
  { enunciado: "Según el art. 53 TREBEP, los empleados públicos se abstendrán en los asuntos en que:", explicacion: "Tengan un interés personal, así como de toda actividad privada que pueda suponer conflicto de intereses (art. 53.5).", dificultad: "media", opciones: ["Tengan un interés personal", "Lo ordene un compañero de igual categoría", "Se tramiten fuera de su horario"], correcta: 0 },
  { enunciado: "¿Qué deben hacer los empleados públicos con los recursos y bienes públicos según el art. 54.5 TREBEP?", explicacion: "Administrarlos con austeridad, no usarlos en provecho propio y velar por su conservación.", dificultad: "media", opciones: ["Administrarlos con austeridad y velar por su conservación", "Usarlos libremente fuera del horario de servicio", "Cederlos a personas allegadas si no se usan"], correcta: 0 },
  { enunciado: "El derecho a recibir protección eficaz en materia de seguridad y salud en el trabajo está en:", explicacion: "El art. 14.l) TREBEP, entre los derechos individuales.", dificultad: "media", opciones: ["El art. 14 TREBEP, como derecho individual", "El art. 95 TREBEP, como falta muy grave", "La Ley 53/1984"], correcta: 0 },
]);

console.log(`📝 ${S2}...`);
await insertar("flashcards", [
  { anverso: "¿Cuál es la regla general de la Ley 53/1984 sobre un segundo puesto en el sector público?", reverso: "Que el personal incluido no puede compatibilizar su actividad con un segundo puesto, cargo o actividad en el sector público, salvo en los supuestos previstos en la propia Ley, y no puede percibir más de una remuneración pública" },
  { anverso: "¿Qué requiere el ejercicio de actividades privadas por un empleado público (art. 14 Ley 53/1984)?", reverso: "El previo reconocimiento de compatibilidad, que en la Administración local corresponde al Pleno de la Corporación, por resolución motivada en el plazo de dos meses" },
  { anverso: "Cita tres actividades exceptuadas del régimen de incompatibilidades (art. 19 Ley 53/1984)", reverso: "Por ejemplo: la administración del patrimonio personal o familiar; la participación en tribunales calificadores de pruebas selectivas; la producción y creación literaria, artística, científica y técnica; la participación ocasional en programas de medios de comunicación" },
  { anverso: "¿A quién reclaman los particulares los daños causados por el personal de una Administración (art. 36.1 Ley 40/2015)?", reverso: "Directamente a la Administración Pública correspondiente, no al empleado" },
  { anverso: "¿Cuándo exige la Administración responsabilidad a su personal tras indemnizar a un particular (art. 36.2 Ley 40/2015)?", reverso: "Cuando hubieran incurrido en dolo, culpa o negligencia graves; lo exige de oficio, en vía administrativa y previo procedimiento, sin perjuicio de pasar el tanto de culpa a los Tribunales si procede" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
await insertarPreguntasConOpciones(S2, [
  { enunciado: "En la Administración local, ¿quién reconoce la compatibilidad para ejercer una actividad privada?", explicacion: "El Pleno de la Corporación Local (art. 14 Ley 53/1984).", dificultad: "media", opciones: ["El Pleno de la Corporación", "El jefe del servicio", "La Inspección de Trabajo"], correcta: 0 },
  { enunciado: "¿En qué plazo debe dictarse la resolución sobre la compatibilidad de una actividad privada?", explicacion: "Dos meses (art. 14 Ley 53/1984).", dificultad: "media", opciones: ["Dos meses", "Diez días", "Seis meses"], correcta: 0 },
  { enunciado: "¿Es incompatible para un funcionario participar en un tribunal calificador de unas pruebas selectivas?", explicacion: "No, es una actividad exceptuada del régimen de incompatibilidades (art. 19.c).", dificultad: "facil", opciones: ["No, está exceptuada del régimen de incompatibilidades", "Sí, siempre", "Solo si es retribuida"], correcta: 0 },
  { enunciado: "Un vecino sufre un daño por la actuación de un empleado municipal en servicio. ¿A quién reclama?", explicacion: "Directamente a la Administración (art. 36.1 Ley 40/2015).", dificultad: "facil", opciones: ["Directamente al Ayuntamiento", "Directamente al empleado", "Al sindicato del empleado"], correcta: 0 },
  { enunciado: "¿En qué casos repetirá la Administración contra su empleado lo indemnizado?", explicacion: "Cuando haya incurrido en dolo, o culpa o negligencia graves (art. 36.2 Ley 40/2015).", dificultad: "dificil", opciones: ["Si hubo dolo, o culpa o negligencia graves", "En todos los casos, sin excepción", "Solo si el empleado lo acepta"], correcta: 0 },
]);

console.log(`📝 ${S3}...`);
await insertar("flashcards", [
  { anverso: "¿Cómo se clasifican las faltas disciplinarias (art. 95 TREBEP)?", reverso: "En muy graves, graves y leves" },
  { anverso: "Cita cuatro faltas muy graves del art. 95.2 TREBEP", reverso: "Por ejemplo: el abandono del servicio; la desobediencia abierta a órdenes de un superior (salvo infracción manifiesta); el incumplimiento de la obligación de atender los servicios esenciales en caso de huelga; el acoso laboral; el incumplimiento de las normas de incompatibilidades que dé lugar a una situación de incompatibilidad" },
  { anverso: "¿Qué sanciones prevé el art. 96 TREBEP?", reverso: "Separación del servicio (solo por faltas muy graves); despido disciplinario del personal laboral; suspensión firme de funciones (máximo 6 años); traslado forzoso; demérito; apercibimiento; y cualquier otra establecida por ley" },
  { anverso: "¿Cuándo prescriben las faltas (art. 97 TREBEP)?", reverso: "Las muy graves a los tres años, las graves a los dos años y las leves a los seis meses" },
  { anverso: "¿Qué garantía exige el art. 98 TREBEP en el procedimiento disciplinario?", reverso: "Que no se imponga sanción por falta grave o muy grave sin el procedimiento establecido, con separación entre la fase instructora y la sancionadora, encomendadas a órganos distintos; las leves, por procedimiento sumario con audiencia al interesado" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Por qué faltas puede imponerse la separación del servicio?", explicacion: "Solo por faltas muy graves (art. 96.1.a TREBEP).", dificultad: "facil", opciones: ["Solo por faltas muy graves", "Por faltas graves o muy graves", "Por cualquier falta reiterada"], correcta: 0 },
  { enunciado: "¿Cuál es la duración máxima de la suspensión firme de funciones como sanción?", explicacion: "Seis años (art. 96.1.c TREBEP).", dificultad: "media", opciones: ["Seis años", "Dos años", "Seis meses"], correcta: 0 },
  { enunciado: "Las faltas leves prescriben a:", explicacion: "Los seis meses (art. 97 TREBEP).", dificultad: "media", opciones: ["Los seis meses", "Un año", "Dos años"], correcta: 0 },
  { enunciado: "El incumplimiento de la obligación de atender los servicios esenciales en caso de huelga es una falta:", explicacion: "Muy grave (art. 95.2.m TREBEP).", dificultad: "media", opciones: ["Muy grave", "Grave", "Leve"], correcta: 0 },
  { enunciado: "La suspensión provisional como medida cautelar en un expediente disciplinario no puede exceder, salvo paralización imputable al interesado, de:", explicacion: "Seis meses (art. 98.3 TREBEP).", dificultad: "dificil", opciones: ["Seis meses", "Un año", "Tres meses"], correcta: 0 },
]);

console.log(`📝 ${S4}...`);
await insertar("flashcards", [
  { anverso: "¿Cuál es el objeto de la Ley 7/2018 de igualdad de oportunidades entre mujeres y hombres en Aragón?", reverso: "Hacer efectivo el derecho de igualdad de trato y de oportunidades entre mujeres y hombres en Aragón y remover los obstáculos que impidan o dificulten su plenitud" },
  { anverso: "¿Se aplica la Ley 7/2018 a los ayuntamientos?", reverso: "Sí: su art. 2 la aplica a las entidades que integran la Administración local, sus organismos autónomos, consorcios, fundaciones y demás entidades en las que sea mayoritaria su representación" },
  { anverso: "¿Qué obliga el art. 51 de la Ley 7/2018 a las Administraciones aragonesas con más de 250 empleados?", reverso: "A aprobar cada cuatro años un Plan de igualdad de oportunidades en la función pública y de conciliación de la vida personal, familiar y laboral para todos sus centros de trabajo" },
  { anverso: "¿Qué es el PIEEM del Ayuntamiento de Zaragoza?", reverso: "El Plan de Igualdad para Empleadas y Empleados Municipales; el vigente es el II Plan, cuyo texto aprobó la Comisión Negociadora el 1 de marzo de 2023" },
  { anverso: "¿Qué órgano permanente de igualdad se constituyó en el Ayuntamiento de Zaragoza el 26 de octubre de 2014?", reverso: "La Comisión para la Igualdad, con representantes de la organización, de las secciones sindicales y agentes de igualdad" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S4 })));
await insertarPreguntasConOpciones(S4, [
  { enunciado: "Según el art. 51 de la Ley 7/2018, ¿cada cuánto deben aprobar un plan de igualdad las Administraciones aragonesas con más de 250 empleados?", explicacion: "Cada cuatro años.", dificultad: "facil", opciones: ["Cada cuatro años", "Cada año", "Cada diez años"], correcta: 0 },
  { enunciado: "¿A partir de cuántos empleados obliga el art. 51 de la Ley 7/2018 a aprobar un plan de igualdad?", explicacion: "Más de doscientos cincuenta empleados.", dificultad: "media", opciones: ["Más de 250", "Más de 50", "Más de 1.000"], correcta: 0 },
  { enunciado: "¿Cuál es el plan de igualdad vigente para el personal del Ayuntamiento de Zaragoza?", explicacion: "El II Plan de Igualdad para Empleadas y Empleados Municipales (II PIEEM), aprobado por la Comisión Negociadora el 1 de marzo de 2023.", dificultad: "media", opciones: ["El II Plan de Igualdad para Empleadas y Empleados Municipales", "El I Plan de Igualdad de 2013, sin revisión posterior", "El Plan de Igualdad del Gobierno de Aragón, aplicado directamente"], correcta: 0 },
  { enunciado: "Según el art. 7 de la Ley 7/2018, ¿qué deben hacer las entidades locales respecto a los planes de igualdad para su personal?", explicacion: "Elaborarlos, aprobarlos, ejecutarlos y evaluarlos (art. 7.5.f).", dificultad: "media", opciones: ["Elaborarlos, aprobarlos, ejecutarlos y evaluarlos", "Solo aplicar el plan que apruebe el Estado", "Nada, es competencia exclusiva de la Comunidad Autónoma"], correcta: 0 },
  { enunciado: "¿Cuál de estos es un principio general de actuación de los poderes públicos aragoneses según el art. 3 de la Ley 7/2018?", explicacion: "La transversalización del enfoque de género en el diseño, implantación y evaluación de todas las políticas públicas (art. 3.13), entre otros.", dificultad: "dificil", opciones: ["La transversalización del enfoque de género en todas las políticas públicas", "La separación de las políticas de igualdad del resto de políticas", "La aplicación de la igualdad solo en el empleo privado"], correcta: 0 },
]);

console.log("📖 glosario...");
await insertar("glosario", [
  { tema_slug: TEMA, seccion: S1, termino: "Código de Conducta", definicion: "Conjunto de deberes, principios éticos y principios de conducta de los empleados públicos de los arts. 52 a 54 del TREBEP; informa la aplicación del régimen disciplinario." },
  { tema_slug: TEMA, seccion: S2, termino: "Compatibilidad", definicion: "Autorización o reconocimiento previo que permite a un empleado público desempeñar una segunda actividad pública o privada en los casos que admite la Ley 53/1984." },
  { tema_slug: TEMA, seccion: S2, termino: "Acción de regreso", definicion: "Exigencia por la Administración a su personal de lo que ha indemnizado a un particular, cuando el empleado actuó con dolo, culpa o negligencia graves (art. 36.2 Ley 40/2015)." },
  { tema_slug: TEMA, seccion: S3, termino: "Demérito", definicion: "Sanción disciplinaria que penaliza al empleado a efectos de carrera, promoción o movilidad voluntaria (art. 96.1.e TREBEP)." },
  { tema_slug: TEMA, seccion: S3, termino: "Prescripción de la falta", definicion: "Extinción de la posibilidad de sancionar por el paso del tiempo: 3 años las muy graves, 2 las graves y 6 meses las leves (art. 97 TREBEP)." },
  { tema_slug: TEMA, seccion: S4, termino: "PIEEM", definicion: "Plan de Igualdad para Empleadas y Empleados Municipales del Ayuntamiento de Zaragoza." },
]);

console.log("🧩 casos prácticos...");
await crearCaso({
  slug: "caso-bombero-segunda-actividad-privada",
  titulo: "Un bombero quiere trabajar como monitor en sus días libres",
  orden: 1,
  supuesto: "Un bombero-conductor del Ayuntamiento quiere impartir clases como monitor de natación en un club privado en sus días de descanso y pregunta qué debe hacer.",
  preguntas: [
    q(S2, "facil", "¿Puede empezar a trabajar en el club sin más trámite?", ["No, necesita el previo reconocimiento de compatibilidad", "Sí, en sus días libres no hay ningún límite", "Sí, basta con comunicarlo verbalmente al jefe de turno"], "Art. 14 Ley 53/1984."),
    q(S2, "media", "¿Qué órgano resolverá su solicitud de compatibilidad?", ["El Pleno de la Corporación", "El jefe del parque", "El Gobierno de Aragón"], "Art. 14 Ley 53/1984, para la Administración local."),
    q(S2, "media", "¿En qué plazo debe resolverse?", ["Dos meses", "Veinte días", "Un año"], "Art. 14 Ley 53/1984."),
    q(S2, "media", "Si se le reconoce la compatibilidad, ¿puede modificarse por ello su turno o jornada en el Servicio?", ["No, el reconocimiento no puede modificar la jornada ni el horario", "Sí, el club fija el horario", "Sí, si lo pide por escrito"], "Art. 14 Ley 53/1984."),
    q(S2, "dificil", "¿Qué ocurre con ese reconocimiento si cambia de puesto en el sector público?", ["Queda automáticamente sin efecto", "Se mantiene indefinidamente", "Se convierte en autorización de segundo puesto público"], "Art. 14 Ley 53/1984."),
    q(S2, "media", "¿Qué límite general marca el art. 1.3 de la Ley 53/1984 a cualquier actividad?", ["Que no impida o menoscabe el cumplimiento de sus deberes ni comprometa su imparcialidad", "Que no supere los 1.000 euros mensuales", "Que se realice fuera de Aragón"], "Art. 1.3 Ley 53/1984."),
    q(S2, "media", "Si el bombero escribiera y publicara un libro técnico sobre rescate acuático, ¿necesitaría compatibilidad?", ["No, la creación literaria y técnica está exceptuada", "Sí, siempre", "Solo si lo vende"], "Art. 19.f) Ley 53/1984, siempre que no derive de una relación de empleo o prestación de servicios."),
    q(S3, "dificil", "Si trabajara en el club sin compatibilidad y se diera una situación de incompatibilidad, ¿qué falta podría cometer?", ["Falta muy grave por incumplimiento de las normas de incompatibilidades", "Ninguna falta", "Una falta leve en todo caso"], "Art. 95.2.n) TREBEP."),
    q(S1, "media", "¿Qué derecho del art. 14 TREBEP se relaciona con el descanso entre guardias que el bombero quiere aprovechar?", ["El derecho a las vacaciones, descansos, permisos y licencias", "El derecho a la inamovilidad", "El derecho de huelga"], "Art. 14.m) TREBEP."),
    q(S2, "media", "¿Podría el ejercicio de esa actividad compatible justificar llegar tarde a una guardia?", ["No, la actividad compatible no excusa atrasos ni negligencias", "Sí, si avisa con antelación", "Sí, si el club lo certifica"], "Art. 20.2 Ley 53/1984: además, la falta conlleva la revocación de la compatibilidad."),
  ],
});
await crearCaso({
  slug: "caso-expediente-disciplinario-abandono-servicio",
  titulo: "Un expediente disciplinario por abandono del servicio",
  orden: 2,
  supuesto: "Un funcionario abandona su puesto durante una guardia sin autorización. La jefatura comunica los hechos y se valora la apertura de un expediente disciplinario.",
  preguntas: [
    q(S3, "facil", "¿Cómo califica el TREBEP el abandono del servicio?", ["Falta muy grave", "Falta leve", "No es falta"], "Art. 95.2.c) TREBEP."),
    q(S3, "media", "¿Puede imponerse una sanción por falta muy grave sin procedimiento?", ["No, solo mediante el procedimiento previamente establecido", "Sí, si los hechos son evidentes", "Sí, por decisión del jefe de turno"], "Art. 98.1 TREBEP."),
    q(S3, "media", "¿Quién instruye y quién sanciona en el procedimiento?", ["Órganos distintos, con separación entre fase instructora y sancionadora", "El mismo órgano, para mayor celeridad", "El propio funcionario expedientado"], "Art. 98.2 TREBEP."),
    q(S3, "media", "¿Qué medida provisional podría acordarse durante el expediente?", ["La suspensión provisional, con un máximo general de 6 meses", "La separación del servicio provisional", "El despido inmediato"], "Art. 98.3 TREBEP."),
    q(S3, "dificil", "Durante la suspensión provisional, ¿qué retribuciones percibe?", ["Las básicas y, en su caso, las prestaciones familiares por hijo a cargo", "Ninguna", "Todas, incluidas las complementarias"], "Art. 98.3 TREBEP."),
    q(S3, "media", "¿Cuál es la sanción más grave que podría imponerse por esta falta?", ["La separación del servicio", "El apercibimiento", "El demérito"], "Art. 96.1.a) TREBEP: solo por faltas muy graves."),
    q(S3, "media", "¿Qué criterios gradúan el alcance de la sanción?", ["Intencionalidad, daño al interés público, reiteración o reincidencia y grado de participación", "Solo la antigüedad del funcionario", "La opinión de sus compañeros"], "Art. 96.3 TREBEP."),
    q(S3, "media", "¿En qué plazo prescribe una falta muy grave?", ["Tres años", "Dos años", "Seis meses"], "Art. 97 TREBEP."),
    q(S3, "dificil", "Si un compañero le hubiera inducido a abandonar el puesto, ¿qué responsabilidad tendría?", ["La misma que el autor", "Ninguna", "Solo una falta leve"], "Art. 93.2 TREBEP."),
    q(S1, "media", "¿Qué deber del art. 54 TREBEP incumple el funcionario que abandona su puesto?", ["Desempeñar sus tareas con diligencia cumpliendo la jornada y el horario", "Mantener actualizada su formación", "Atender al ciudadano en la lengua oficial que solicite"], "Art. 54.2 TREBEP."),
  ],
});
await crearCaso({
  slug: "caso-plan-igualdad-parque-bomberos",
  titulo: "La aplicación del Plan de Igualdad en un parque de bomberos",
  orden: 3,
  supuesto: "Con la incorporación de nuevas bomberas a la plantilla, la jefatura revisa vestuarios, turnos y protocolos a la luz del Plan de Igualdad municipal y de la Ley 7/2018.",
  preguntas: [
    q(S4, "facil", "¿Qué plan de igualdad se aplica al personal del Ayuntamiento?", ["El II Plan de Igualdad para Empleadas y Empleados Municipales", "Un plan propio de cada parque", "Ninguno, solo la ley estatal"], "El II PIEEM, aprobado por la Comisión Negociadora el 1 de marzo de 2023."),
    q(S4, "media", "¿Qué ley autonómica obliga al Ayuntamiento a tener un plan de igualdad para su personal?", ["La Ley 7/2018, de igualdad de oportunidades entre mujeres y hombres en Aragón", "La Ley 53/1984", "La Ley 40/2015"], "Arts. 7.5.f) y 51 de la Ley 7/2018."),
    q(S4, "media", "¿Qué debe incluir ese plan según el art. 51.3 de la Ley 7/2018?", ["Principios, objetivos, medidas y mecanismos de seguimiento y evaluación del impacto de género", "Solo un listado de vestuarios", "Solo las retribuciones"], "Art. 51.3 Ley 7/2018."),
    q(S4, "media", "¿Qué órgano municipal permanente vela por la igualdad en el Ayuntamiento desde 2014?", ["La Comisión para la Igualdad", "El Pleno en exclusiva", "La Junta de Distrito"], "Constituida el 26 de octubre de 2014."),
    q(S1, "media", "¿Qué derecho del art. 14 TREBEP protege a las nuevas bomberas frente al acoso por razón de sexo?", ["El respeto a su intimidad, propia imagen y dignidad en el trabajo", "La inamovilidad", "La libre asociación profesional"], "Art. 14.h) TREBEP."),
    q(S3, "media", "¿Cómo califica el TREBEP el acoso por razón de sexo?", ["Falta muy grave", "Falta leve", "Mera infracción administrativa ajena al régimen disciplinario"], "Art. 95.2.b) TREBEP."),
    q(S1, "media", "¿Qué derecho del art. 14 TREBEP tiene en cuenta la revisión de turnos para facilitar la vida familiar?", ["La adopción de medidas que favorezcan la conciliación", "La progresión en la carrera", "La defensa jurídica"], "Art. 14.j) TREBEP."),
    q(S4, "dificil", "¿Qué principio del art. 3 de la Ley 7/2018 promueve el uso de lenguaje e imágenes no sexistas en los documentos del Servicio?", ["La implantación del uso integrador y no sexista de los lenguajes y de las imágenes", "La protección de la maternidad", "La cooperación internacional"], "Art. 3.11 Ley 7/2018."),
    q(S4, "media", "¿Es la Ley 7/2018 aplicable a una empresa privada que tenga un contrato con el Ayuntamiento?", ["Sí, en los términos de la ley, a las entidades privadas que contraten con las Administraciones aragonesas", "No, nunca", "Solo si tiene más de 1.000 trabajadores"], "Art. 2.2.e) Ley 7/2018."),
    q(S1, "media", "¿Qué principio ético del art. 53 TREBEP exige evitar cualquier discriminación por razón de sexo?", ["El respeto de los derechos fundamentales, evitando toda discriminación", "La austeridad", "La confidencialidad"], "Art. 53.4 TREBEP."),
  ],
});

console.log(`\n🔗 Vinculando ${TEMA} como Tema ${NUMERO} de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_1_ID, numero: NUMERO, orden: NUMERO, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log(`\n✅ ${TEMA} creado y vinculado como Tema ${NUMERO} de Bombero/a Conductor/a.`);
