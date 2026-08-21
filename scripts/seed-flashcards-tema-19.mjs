/**
 * Tema-19: TREBEP (III) — La función pública local: planificación de
 * recursos humanos, estructuración del empleo público y provisión de
 * puestos de trabajo y movilidad.
 *
 * Uso: node --env-file=.env.local scripts/seed-flashcards-tema-19.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

async function insertBatch(filas) {
  const res = await fetch(`${URL_BASE}/rest/v1/flashcards`, { method: "POST", headers: { ...HEADERS, Prefer: "return=minimal" }, body: JSON.stringify(filas) });
  if (!res.ok) { console.error(`❌ ${res.status} ${await res.text()}`); process.exit(1); }
}

const TEMA = "tema-19";
const c = (seccion, anverso, reverso) => ({ tema_slug: TEMA, seccion, anverso, reverso });

const CARDS = [
  // Planificación de recursos humanos (arts. 69-71)
  c("planificacion-rrhh", "¿Cuál es el objetivo de la planificación de recursos humanos (art. 69.1)?", "Contribuir a la eficacia en la prestación de servicios y la eficiencia en el uso de recursos, mediante la dimensión adecuada de efectivos, su distribución, formación, promoción y movilidad"),
  c("planificacion-rrhh", "Cita 3 medidas que pueden incluir los Planes de ordenación de RRHH (art. 69.2)", "Análisis de disponibilidades y necesidades de personal; previsiones sobre organización del trabajo; medidas de movilidad; medidas de promoción interna y formación; previsión de Oferta de Empleo Público"),
  c("planificacion-rrhh", "¿Qué es la Oferta de Empleo Público (art. 70.1)?", "El instrumento que recoge las necesidades de personal de nuevo ingreso con asignación presupuestaria, obligando a convocar los procesos selectivos correspondientes"),
  c("planificacion-rrhh", "¿En qué plazo debe ejecutarse la Oferta de Empleo Público (art. 70.1)?", "Plazo improrrogable de 3 años"),
  c("planificacion-rrhh", "¿Qué es el Registro de personal (art. 71.1)?", "El registro que cada Administración constituye para inscribir los datos relativos a su personal"),

  // Estructuración del empleo público (arts. 72-77)
  c("estructuracion-empleo", "¿Qué son las relaciones de puestos de trabajo (art. 74)?", "Instrumentos organizativos que comprenden, al menos, la denominación de los puestos, grupos de clasificación, cuerpos/escalas, sistemas de provisión y retribuciones complementarias, con carácter público"),
  c("estructuracion-empleo", "¿En qué se agrupan los funcionarios (art. 75.1)?", "En cuerpos, escalas, especialidades u otros sistemas que incorporen competencias, capacidades y conocimientos comunes acreditados por proceso selectivo"),
  c("estructuracion-empleo", "¿Quién crea, modifica o suprime los cuerpos y escalas (art. 75.2)?", "Ley de las Cortes Generales o de las asambleas legislativas autonómicas"),
  c("estructuracion-empleo", "¿Qué titulación se exige para el Grupo A1/A2 (art. 76)?", "Título universitario de Grado (u otro que exija la ley)"),
  c("estructuracion-empleo", "¿Qué titulación se exige para el Grupo B?", "Título de Técnico Superior"),
  c("estructuracion-empleo", "¿Qué titulación se exige para los Subgrupos C1 y C2?", "C1: Bachiller o Técnico. C2: Graduado en Educación Secundaria Obligatoria"),

  // Provisión de puestos y movilidad (arts. 78-84)
  c("provision-movilidad", "¿Con qué principios se proveen los puestos de trabajo (art. 78.1)?", "Igualdad, mérito, capacidad y publicidad"),
  c("provision-movilidad", "¿Cuáles son los procedimientos de provisión de puestos del funcionario de carrera (art. 78.2)?", "Concurso y libre designación con convocatoria pública"),
  c("provision-movilidad", "¿En qué consiste el concurso de provisión de puestos (art. 79.1)?", "La valoración de méritos, capacidades y aptitudes de los candidatos por órganos colegiados técnicos, con paridad de género"),
  c("provision-movilidad", "¿En qué consiste la libre designación con convocatoria pública (art. 80.1)?", "La apreciación discrecional por el órgano competente de la idoneidad de los candidatos según los requisitos del puesto"),
  c("provision-movilidad", "¿Pueden ser cesados discrecionalmente los puestos de libre designación (art. 80.4)?", "Sí; en caso de cese, se les debe asignar un puesto conforme al sistema de carrera profesional"),
  c("provision-movilidad", "¿Qué es la movilidad del funcionario de carrera (art. 81.2)?", "El traslado motivado por necesidades de servicio a otras unidades, respetando retribuciones y condiciones esenciales de trabajo"),
  c("provision-movilidad", "¿Qué derecho de traslado tienen las víctimas de violencia de género (art. 82.1)?", "Traslado a otro puesto de análogas características, sin necesidad de que sea vacante de necesaria cobertura, con carácter de traslado forzoso"),
  c("provision-movilidad", "¿Cómo se rige la provisión de puestos del personal laboral (art. 83)?", "Por los convenios colectivos aplicables y, en su defecto, por el sistema del personal funcionario de carrera"),
  c("provision-movilidad", "¿Qué es la movilidad voluntaria entre Administraciones Públicas (art. 84.1)?", "Medidas de movilidad interadministrativa, preferentemente mediante convenio de Conferencia Sectorial, para mejor aprovechamiento de los recursos humanos"),
  c("provision-movilidad", "¿En qué situación queda el funcionario que obtiene destino en otra Administración por movilidad (art. 84.3)?", "En situación de servicio en otras Administraciones Públicas respecto de su Administración de origen"),
];

console.log(`📝 Insertando ${CARDS.length} flashcards de tema-19...`);
await insertBatch(CARDS);

const SECCIONES_AUX_ADMIN = ["planificacion-rrhh", "estructuracion-empleo", "provision-movilidad"];
const patchTO = await fetch(`${URL_BASE}/rest/v1/tema_oposicion?tema_slug=eq.tema-19&oposicion_slug=eq.auxiliar-administrativo`, {
  method: "PATCH", headers: { ...HEADERS, Prefer: "return=representation" }, body: JSON.stringify({ secciones_incluidas: SECCIONES_AUX_ADMIN }),
});
if (!patchTO.ok) { console.error(`❌ ${patchTO.status} ${await patchTO.text()}`); process.exit(1); }
console.log("✅ tema_oposicion (auxiliar-administrativo, tema-19) limitado a:", SECCIONES_AUX_ADMIN);
console.log("✅ Tema-19 completado.");
