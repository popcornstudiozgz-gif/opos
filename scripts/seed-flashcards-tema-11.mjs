/**
 * Tema-11: Actividad de las entidades locales — formas de policía y fomento
 * (doctrina clásica), y el servicio público local: concepto y modos de
 * gestión directa e indirecta (Reglamento de Servicios de las Corporaciones
 * Locales, RD 1955). Los artículos de mecánica muy procedimental (secuestro,
 * caducidad, tasación de rescate...) se condensan: aportan poco valor de
 * examen frente al esfuerzo de transcribirlos íntegros.
 *
 * Uso: node --env-file=.env.local scripts/seed-flashcards-tema-11.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

async function insertBatch(filas) {
  const res = await fetch(`${URL_BASE}/rest/v1/flashcards`, { method: "POST", headers: { ...HEADERS, Prefer: "return=minimal" }, body: JSON.stringify(filas) });
  if (!res.ok) { console.error(`❌ ${res.status} ${await res.text()}`); process.exit(1); }
}

const TEMA = "tema-11";
const c = (seccion, anverso, reverso) => ({ tema_slug: TEMA, seccion, anverso, reverso });

const CARDS = [
  // Formas de actividad administrativa: policía y fomento (doctrina clásica)
  c("formas-actividad", "¿Cuáles son las 3 formas clásicas de actividad administrativa (clasificación de Jordana de Pozas)?", "Policía (limitación), fomento (promoción) y servicio público (prestación)"),
  c("formas-actividad", "¿Qué es la actividad de policía?", "La actividad de limitación por la que la Administración restringe, condiciona o vigila la actividad de los particulares mediante autorizaciones, licencias, órdenes y sanciones, en garantía del interés general"),
  c("formas-actividad", "¿Qué instrumentos típicos utiliza la actividad de policía local?", "Licencias y autorizaciones, órdenes, prohibiciones y la potestad sancionadora"),
  c("formas-actividad", "¿Qué es la actividad de fomento?", "La actividad por la que la Administración promueve o estimula actividades de los particulares que considera de utilidad pública, sin coacción ni prestación directa del servicio"),
  c("formas-actividad", "Cita medios de fomento habituales de las entidades locales", "Subvenciones, ayudas económicas, honoríficos, premios, y beneficios fiscales o exenciones"),
  c("formas-actividad", "¿Qué es la actividad de servicio público?", "La actividad prestacional por la que la Administración asume directa o indirectamente la satisfacción de una necesidad de interés general mediante una prestación regular y continua"),

  // Servicio público local: concepto (art. 25 Ley 7/1985)
  c("servicio-publico-concepto", "¿Qué puede hacer el Municipio para gestionar sus intereses según el art. 25.1 LBRL?", "Promover actividades y prestar los servicios públicos que contribuyan a satisfacer las necesidades y aspiraciones de la comunidad vecinal"),
  c("servicio-publico-concepto", "¿Qué principios deben evaluarse antes de atribuir un servicio local (art. 25.3 LBRL)?", "Descentralización, eficiencia, estabilidad y sostenibilidad financiera"),
  c("servicio-publico-concepto", "¿Qué exige la Ley que determine la competencia municipal según el art. 25.5 LBRL?", "Que no se produzca una atribución simultánea de la misma competencia a otra Administración Pública"),
  c("servicio-publico-concepto", "¿Qué potestad tienen las Corporaciones locales sobre sus servicios (art. 30 RSCL)?", "Plena potestad para constituir, organizar, modificar y suprimir los servicios de su competencia"),
  c("servicio-publico-concepto", "¿Pueden declararse obligatorios la recepción y uso de un servicio (art. 34 RSCL)?", "Sí, por disposición reglamentaria o acuerdo, cuando sea necesario para garantizar tranquilidad, seguridad o salubridad ciudadanas"),
  c("servicio-publico-concepto", "¿Qué jurisdicción conoce las cuestiones sobre constitución/organización/modificación/supresión de servicios (art. 36 RSCL)?", "La jurisdicción contencioso-administrativa"),

  // Gestión directa (Cap. III RSCL)
  c("gestion-directa", "¿Qué es la gestión directa de un servicio (art. 41 RSCL)?", "La que para prestar los servicios de su competencia realizan las Corporaciones locales por sí mismas o mediante Organismos exclusivamente dependientes de ellas"),
  c("gestion-directa", "¿Qué funciones deben atenderse necesariamente por gestión directa (art. 43.1 RSCL)?", "Las que impliquen ejercicio de autoridad"),
  c("gestion-directa", "Enumera las formas de gestión directa según el art. 67 RSCL", "1) Gestión por la Corporación, sin o con órgano especial de administración; 2) Fundación pública del servicio; 3) Sociedad privada municipal o provincial"),
  c("gestion-directa", "¿Cómo es la gestión directa sin órgano especial de administración (art. 68.1 RSCL)?", "La Corporación asume su propio riesgo y ejerce sin intermediarios todos los poderes de decisión y gestión, con funcionarios de plantilla"),
  c("gestion-directa", "¿A cargo de quién están los servicios en gestión directa con órgano especial (art. 71 RSCL)?", "De un Consejo de Administración y un Gerente"),
  c("gestion-directa", "¿Qué es la fundación pública del servicio (art. 85 RSCL)?", "Servicios de la Corporación dotados de personalidad jurídica pública, con patrimonio especial afecto a sus fines"),
  c("gestion-directa", "¿Cómo puede constituirse la gestión directa en forma de empresa privada (art. 89.1 RSCL)?", "Como sociedad de responsabilidad limitada o sociedad anónima, cuyo capital pertenece en exclusiva a la Corporación"),

  // Gestión indirecta (Cap. V RSCL)
  c("gestion-indirecta", "Enumera las formas de gestión indirecta según el art. 113 RSCL", "Concesión, arrendamiento y concierto"),
  c("gestion-indirecta", "¿Qué es la concesión de servicios (art. 114.1-2 RSCL)?", "Prestación mediante concesión administrativa, que puede comprender la construcción de la obra/instalación y su gestión, o el mero ejercicio del servicio"),
  c("gestion-indirecta", "¿Cuál es la duración máxima de una concesión de servicios (art. 115.4ª RSCL)?", "50 años"),
  c("gestion-indirecta", "¿Quién otorga la concesión de un servicio (art. 124 RSCL)?", "El Ayuntamiento Pleno o la Diputación Provincial"),
  c("gestion-indirecta", "Cita 3 potestades de la Corporación concedente sobre la concesión (art. 127.1 RSCL)", "Ordenar modificaciones por interés público; fiscalizar la gestión; asumir temporalmente la ejecución directa; imponer correcciones; rescatar la concesión; suprimir el servicio"),
  c("gestion-indirecta", "¿Qué es el secuestro de una concesión (art. 133 RSCL)?", "La medida por la que, ante infracción grave del concesionario, la Administración se encarga directamente del funcionamiento del servicio con carácter temporal"),
  c("gestion-indirecta", "¿Cuándo procede la declaración de caducidad de una concesión (art. 136.1 RSCL)?", "Si tras el secuestro el concesionario reincide en las infracciones, o incurre en infracción gravísima de sus obligaciones esenciales"),
  c("gestion-indirecta", "¿Qué es el arrendamiento como forma de gestión indirecta (art. 138.1 RSCL)?", "La prestación del servicio mediante arrendamiento de las instalaciones de pertenencia de la Corporación"),
  c("gestion-indirecta", "¿Qué servicios no pueden prestarse por arrendamiento (art. 138.2 RSCL)?", "Beneficencia y asistencia sanitaria, incendios y Establecimientos de Crédito"),
  c("gestion-indirecta", "¿Cuál es la duración máxima del arrendamiento de instalaciones (art. 139.1 RSCL)?", "10 años"),
  c("gestion-indirecta", "¿Qué es el concierto como forma de gestión indirecta (art. 143 RSCL)?", "La prestación de servicios mediante concierto con otras Entidades públicas o privadas o particulares, utilizando los servicios que estos tuvieran establecidos, sin crear nueva persona jurídica"),
  c("gestion-indirecta", "¿Cuál es la duración máxima de los conciertos (art. 144.1 RSCL)?", "10 años, quedando sin efecto si la Corporación instala un servicio análogo propio"),
];

console.log(`📝 Insertando ${CARDS.length} flashcards de tema-11...`);
await insertBatch(CARDS);

const SECCIONES_AUX_ADMIN = ["formas-actividad", "servicio-publico-concepto", "gestion-directa", "gestion-indirecta"];
const patchTO = await fetch(`${URL_BASE}/rest/v1/tema_oposicion?tema_slug=eq.tema-11&oposicion_slug=eq.auxiliar-administrativo`, {
  method: "PATCH", headers: { ...HEADERS, Prefer: "return=representation" }, body: JSON.stringify({ secciones_incluidas: SECCIONES_AUX_ADMIN }),
});
if (!patchTO.ok) { console.error(`❌ ${patchTO.status} ${await patchTO.text()}`); process.exit(1); }
console.log("✅ tema_oposicion (auxiliar-administrativo, tema-11) limitado a:", SECCIONES_AUX_ADMIN);
console.log("✅ Tema-11 completado.");
