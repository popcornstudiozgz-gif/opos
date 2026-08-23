/**
 * Tema-19: "la función pública local" — la parte del temario oficial que
 * faltaba junto a planificación de RRHH, estructuración del empleo y
 * provisión de puestos (TREBEP, ya sembradas): lo específicamente "local"
 * de la Ley 7/1985 (LBRL), Título VII, que el temario de otro puesto de
 * la misma convocatoria (Oficial Mantenimiento) resume como "Peculiaridades
 * del régimen de los empleados públicos de las entidades locales.
 * Estructura de la función pública local".
 *
 * Dos secciones nuevas:
 * - estructura-personal-local: Cap. I (arts. 89-91: funcionarios, personal
 *   laboral y eventual; plantilla; RPT; oferta de empleo) + Cap. V (arts.
 *   103-104 bis: personal laboral y, sobre todo, personal eventual —
 *   nombramiento libre, cese automático, límites según población).
 * - habilitacion-nacional: Cap. II, arts. 92, 92 bis y 93-97 (funcionarios
 *   de administración local con habilitación de carácter nacional: las 3
 *   subescalas, selección, retribuciones, jornada). NO se usa el Cap. III
 *   (arts. 98-99): está derogado por el TREBEP y solo vigente
 *   transitoriamente — el art. 92 bis (vigente) ya recoge lo esencial.
 *
 * Fiel a content-raw/ley-7-1985-bases-regimen-local/18,19,22-titulo7-*.md.
 *
 * Uso: node --env-file=.env.local scripts/seed-flashcards-tema-19-funcion-publica-local.mjs
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
  // Estructura del personal local (LBRL, arts. 89-91, 103-104 bis)
  c("estructura-personal-local", "¿Por qué colectivos está integrado el personal al servicio de las entidades locales según el art. 89 LBRL?", "Funcionarios de carrera, personal contratado en régimen de derecho laboral, y personal eventual que desempeña puestos de confianza o asesoramiento especial"),
  c("estructura-personal-local", "¿Cómo se aprueba la plantilla de una Corporación local según el art. 90.1 LBRL?", "Anualmente, a través del Presupuesto; debe comprender todos los puestos reservados a funcionarios, personal laboral y eventual"),
  c("estructura-personal-local", "¿Qué es la relación de puestos de trabajo (RPT) según el art. 90.2 LBRL?", "El instrumento en que las Corporaciones locales forman la relación de todos los puestos de trabajo existentes en su organización, según la legislación básica de función pública"),
  c("estructura-personal-local", "¿Qué determinan los datos inscritos en el Registro de personal de la Corporación (art. 90.3 LBRL)?", "Las nóminas, a efectos de la debida justificación de todas las retribuciones"),
  c("estructura-personal-local", "¿Mediante qué sistemas debe seleccionarse todo el personal, funcionario o laboral, según el art. 91.2 LBRL?", "Concurso, oposición o concurso-oposición libre, garantizando en todo caso igualdad, mérito, capacidad y publicidad"),
  c("estructura-personal-local", "¿Quién selecciona al personal laboral de una Corporación según el art. 103 LBRL?", "La propia Corporación, ateniéndose al art. 91 y con el máximo respeto al principio de igualdad de oportunidades"),
  c("estructura-personal-local", "¿Qué deben respetar las Corporaciones al aprobar anualmente la masa salarial del personal laboral (art. 103 bis.1)?", "Los límites y condiciones que se establezcan con carácter básico en la Ley de Presupuestos Generales del Estado"),
  c("estructura-personal-local", "¿Quién determina el número, características y retribuciones del personal eventual, y cuándo (art. 104.1 LBRL)?", "El Pleno de cada Corporación, al comienzo de su mandato; solo puede modificarse con la aprobación de los presupuestos anuales"),
  c("estructura-personal-local", "¿Cómo es el nombramiento y cese del personal eventual, y qué ocurre cuando cesa la autoridad a la que sirve (art. 104.2 LBRL)?", "Nombramiento y cese libres, por el Alcalde o Presidente; cesan automáticamente cuando cesa o expira el mandato de la autoridad a la que prestan su función de confianza"),
  c("estructura-personal-local", "Un municipio de más de 500.000 habitantes, como Zaragoza, ¿qué límite de personal eventual tiene según el art. 104 bis.1.g LBRL?", "No puede exceder el 0,7% del número total de puestos de trabajo de la plantilla de las respectivas Entidades Locales"),
  c("estructura-personal-local", "¿Con qué periodicidad deben las Corporaciones publicar el número de puestos reservados a personal eventual (art. 104 bis.5)?", "Semestralmente, en su sede electrónica y en el Boletín Oficial de la Provincia"),
  c("estructura-personal-local", "¿Con qué periodicidad informa el Presidente de la Entidad Local al Pleno sobre el personal eventual (art. 104 bis.6)?", "Con carácter trimestral"),

  // Funcionarios de administración local con habilitación de carácter nacional (LBRL, art. 92 y 92 bis)
  c("habilitacion-nacional", "¿A quién corresponde en exclusiva el ejercicio de funciones que impliquen potestades públicas o salvaguardia de intereses generales según el art. 92.3 LBRL?", "A los funcionarios de carrera al servicio de la Administración local"),
  c("habilitacion-nacional", "¿Qué dos funciones públicas necesarias en toda Corporación local están reservadas a funcionarios con habilitación de carácter nacional (art. 92 bis.1)?", "La de Secretaría (fe pública y asesoramiento legal preceptivo) y el control y fiscalización interna de la gestión económico-financiera y presupuestaria, contabilidad, tesorería y recaudación"),
  c("habilitacion-nacional", "¿En qué tres subescalas se divide la escala de funcionarios con habilitación nacional según el art. 92 bis.2?", "Secretaría; Intervención-Tesorería; y Secretaría-Intervención (que asume ambas funciones)"),
  c("habilitacion-nacional", "¿En qué categorías se integran los funcionarios de las subescalas de Secretaría e Intervención-Tesorería (art. 92 bis.3)?", "Entrada o superior"),
  c("habilitacion-nacional", "¿A quién corresponde la oferta de empleo, selección, formación y habilitación de estos funcionarios según el art. 92 bis.5?", "Al Estado, a través del Ministerio de Hacienda y Administraciones Públicas"),
  c("habilitacion-nacional", "¿Cuál es el sistema normal de provisión de puestos de habilitación nacional, y de qué ámbito territorial, según el art. 92 bis.6?", "El concurso, de ámbito estatal; existen dos concursos anuales, el ordinario y el unitario (de naturaleza supletoria)"),
  c("habilitacion-nacional", "¿Qué estructura y cuantía tienen las retribuciones básicas de los funcionarios locales según el art. 93.1 LBRL?", "La misma estructura e idéntica cuantía que las establecidas con carácter general para toda la función pública"),
  c("habilitacion-nacional", "¿Quién fija la cuantía global de las retribuciones complementarias, dentro de qué límites, según el art. 93.2 LBRL?", "El Pleno de la Corporación, dentro de los límites máximos y mínimos que señale el Estado"),
  c("habilitacion-nacional", "¿Con qué jornada de trabajo cuentan los funcionarios de la Administración local según el art. 94 LBRL?", "La misma, en cómputo anual, que la fijada para los funcionarios de la Administración Civil del Estado"),
  c("habilitacion-nacional", "¿Dónde deben publicarse los anuncios de convocatorias de pruebas selectivas para la habilitación de carácter nacional según el art. 97 LBRL?", "En el Boletín Oficial del Estado (a diferencia de las bases del resto de convocatorias locales, que se publican en el Boletín Oficial de la Provincia)"),
];

console.log(`📇 Insertando ${CARDS.length} flashcards de ${TEMA} (función pública local)...`);
await insertBatch(CARDS);
console.log(`✅ ${TEMA} completado.`);
