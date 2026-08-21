/**
 * Tema-17: TREBEP (I) — Clases de personal (funcionario de carrera e
 * interino, laboral, eventual), derechos individuales, deberes y código de
 * conducta.
 *
 * Uso: node --env-file=.env.local scripts/seed-flashcards-tema-17.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

async function insertBatch(filas) {
  const res = await fetch(`${URL_BASE}/rest/v1/flashcards`, { method: "POST", headers: { ...HEADERS, Prefer: "return=minimal" }, body: JSON.stringify(filas) });
  if (!res.ok) { console.error(`❌ ${res.status} ${await res.text()}`); process.exit(1); }
}

const TEMA = "tema-17";
const c = (seccion, anverso, reverso) => ({ tema_slug: TEMA, seccion, anverso, reverso });

const CARDS = [
  // Clases de personal (arts. 8-12)
  c("clases-personal", "¿Quiénes son empleados públicos según el art. 8.1?", "Quienes desempeñan funciones retribuidas en las Administraciones Públicas al servicio de los intereses generales"),
  c("clases-personal", "Enumera las 4 clases de empleados públicos (art. 8.2)", "Funcionarios de carrera, funcionarios interinos, personal laboral (fijo, indefinido o temporal), y personal eventual"),
  c("clases-personal", "¿Qué es un funcionario de carrera (art. 9.1)?", "Quien, por nombramiento legal, está vinculado a una Administración por relación estatutaria de Derecho Administrativo, para servicios profesionales retribuidos de carácter permanente"),
  c("clases-personal", "¿Qué funciones corresponden exclusivamente a funcionarios públicos (art. 9.2)?", "Las que impliquen participación en el ejercicio de potestades públicas o en la salvaguardia de los intereses generales"),
  c("clases-personal", "Enumera las 4 circunstancias que justifican nombrar un funcionario interino (art. 10.1)", "Plazas vacantes (máx. 3 años); sustitución transitoria de titulares; ejecución de programas temporales (máx. 3 años); exceso o acumulación de tareas (máx. 9 meses en 18)"),
  c("clases-personal", "¿Qué ocurre transcurridos 3 años desde el nombramiento de un interino por vacante (art. 10.4)?", "Se produce el fin de la relación de interinidad; la vacante solo puede ocuparla un funcionario de carrera, salvo proceso desierto"),
  c("clases-personal", "¿Qué es personal laboral (art. 11.1)?", "Quien, mediante contrato de trabajo por escrito, presta servicios retribuidos a las AAPP; puede ser fijo, indefinido o temporal"),
  c("clases-personal", "¿Qué es personal eventual (art. 12.1)?", "Quien, con carácter no permanente, solo realiza funciones de confianza o asesoramiento especial, retribuido con créditos presupuestarios para ese fin"),
  c("clases-personal", "¿Cómo son el nombramiento y cese del personal eventual (art. 12.3)?", "Libres; el cese se produce, en todo caso, cuando cesa la autoridad a la que presta la función de confianza"),
  c("clases-personal", "¿Puede la condición de personal eventual constituir mérito para el acceso a la función pública (art. 12.4)?", "No"),

  // Derechos individuales (arts. 14-15)
  c("derechos", "Cita 5 derechos individuales de los empleados públicos (art. 14)", "Inamovilidad en la condición de funcionario de carrera; desempeño efectivo de funciones; progresión en la carrera; percibir retribuciones; formación continua; respeto a la intimidad y no discriminación; conciliación; vacaciones y permisos"),
  c("derechos", "¿Qué derecho reconoce el art. 14.f) sobre defensa jurídica?", "A la defensa jurídica y protección de la Administración en procedimientos judiciales derivados del ejercicio legítimo de sus funciones"),
  c("derechos", "Enumera los derechos individuales que se ejercen de forma colectiva (art. 15)", "Libertad sindical; negociación colectiva; ejercicio de la huelga (con mantenimiento de servicios esenciales); planteamiento de conflictos colectivos; y de reunión"),

  // Deberes y Código de Conducta (arts. 52-54)
  c("deberes-codigo-conducta", "¿Con qué principios deben actuar los empleados públicos según el art. 52?", "Objetividad, integridad, neutralidad, responsabilidad, imparcialidad, confidencialidad, dedicación al servicio público, transparencia, ejemplaridad, austeridad, accesibilidad, eficacia y honradez"),
  c("deberes-codigo-conducta", "¿Qué papel tienen los principios del Código de Conducta en el régimen disciplinario (art. 52)?", "Informan la interpretación y aplicación del régimen disciplinario de los empleados públicos"),
  c("deberes-codigo-conducta", "Cita 4 principios éticos del art. 53", "Respetar la Constitución; perseguir el interés general con objetividad; actuar con lealtad y buena fe; abstenerse en asuntos con interés personal; no aceptar tratos de favor; guardar secreto de lo conocido por razón del cargo"),
  c("deberes-codigo-conducta", "Cita 4 principios de conducta del art. 54", "Tratar con atención y respeto; desempeñar las tareas con diligencia cumpliendo jornada y horario; obedecer instrucciones de superiores (salvo infracción manifiesta); administrar recursos públicos con austeridad; rechazar regalos o favores"),
  c("deberes-codigo-conducta", "¿Qué deben hacer los empleados públicos ante una orden que constituya infracción manifiesta del ordenamiento (art. 54.3)?", "No obedecerla y ponerla inmediatamente en conocimiento de los órganos de inspección"),
];

console.log(`📝 Insertando ${CARDS.length} flashcards de tema-17...`);
await insertBatch(CARDS);

const SECCIONES_AUX_ADMIN = ["clases-personal", "derechos", "deberes-codigo-conducta"];
const patchTO = await fetch(`${URL_BASE}/rest/v1/tema_oposicion?tema_slug=eq.tema-17&oposicion_slug=eq.auxiliar-administrativo`, {
  method: "PATCH", headers: { ...HEADERS, Prefer: "return=representation" }, body: JSON.stringify({ secciones_incluidas: SECCIONES_AUX_ADMIN }),
});
if (!patchTO.ok) { console.error(`❌ ${patchTO.status} ${await patchTO.text()}`); process.exit(1); }
console.log("✅ tema_oposicion (auxiliar-administrativo, tema-17) limitado a:", SECCIONES_AUX_ADMIN);
console.log("✅ Tema-17 completado.");
