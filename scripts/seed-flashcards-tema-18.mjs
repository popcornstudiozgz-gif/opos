/**
 * Tema-18: TREBEP (II) — Adquisición y pérdida de la relación de servicio,
 * situaciones administrativas, régimen disciplinario y faltas.
 *
 * Uso: node --env-file=.env.local scripts/seed-flashcards-tema-18.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

async function insertBatch(filas) {
  const res = await fetch(`${URL_BASE}/rest/v1/flashcards`, { method: "POST", headers: { ...HEADERS, Prefer: "return=minimal" }, body: JSON.stringify(filas) });
  if (!res.ok) { console.error(`❌ ${res.status} ${await res.text()}`); process.exit(1); }
}

const TEMA = "tema-18";
const c = (seccion, anverso, reverso) => ({ tema_slug: TEMA, seccion, anverso, reverso });

const CARDS = [
  // Adquisición de la relación de servicio (arts. 55-62, condensado)
  c("adquisicion-servicio", "¿Con qué principios debe garantizarse el acceso al empleo público (art. 55.1)?", "Igualdad, mérito y capacidad"),
  c("adquisicion-servicio", "Cita 3 requisitos generales para participar en procesos selectivos (art. 56.1)", "Nacionalidad española (salvo excepciones); capacidad funcional; tener 16 años cumplidos y no exceder la edad de jubilación forzosa; no haber sido separado por expediente disciplinario; poseer la titulación exigida"),
  c("adquisicion-servicio", "¿Qué cupo se reserva a personas con discapacidad en las ofertas de empleo público (art. 59.1)?", "No inferior al 7% de las vacantes, con al menos el 2% para discapacidad intelectual"),
  c("adquisicion-servicio", "¿Quién no puede formar parte de los órganos de selección (art. 60.2)?", "El personal de elección o designación política, los funcionarios interinos y el personal eventual"),
  c("adquisicion-servicio", "¿Cuáles son los sistemas selectivos de funcionarios de carrera (art. 61.6)?", "Oposición y concurso-oposición; excepcionalmente, por ley, el concurso de solo valoración de méritos"),
  c("adquisicion-servicio", "Enumera los 4 requisitos sucesivos para adquirir la condición de funcionario de carrera (art. 62.1)", "Superación del proceso selectivo; nombramiento por el órgano competente (publicado en el Diario Oficial); acatamiento de la Constitución; toma de posesión en plazo"),

  // Pérdida de la relación de servicio (arts. 63-68)
  c("perdida-servicio", "Enumera las causas de pérdida de la condición de funcionario de carrera (art. 63)", "Renuncia; pérdida de la nacionalidad; jubilación total; sanción disciplinaria firme de separación del servicio; pena firme de inhabilitación absoluta o especial"),
  c("perdida-servicio", "¿Cuándo no puede aceptarse la renuncia de un funcionario (art. 64.2)?", "Cuando esté sujeto a expediente disciplinario o tenga auto de procesamiento o apertura de juicio oral por delito"),
  c("perdida-servicio", "¿A qué edad se declara de oficio la jubilación forzosa (art. 67.3)?", "A los 65 años, pudiendo solicitarse prolongación hasta los 70"),
  c("perdida-servicio", "¿Qué es la rehabilitación de la condición de funcionario (art. 68.1)?", "La posibilidad de recuperar la condición de funcionario, tras desaparecer la causa objetiva, en casos de pérdida de nacionalidad o jubilación por incapacidad"),

  // Situaciones administrativas (arts. 85-92)
  c("situaciones-administrativas", "Enumera las situaciones administrativas de los funcionarios de carrera (art. 85.1)", "Servicio activo, servicios especiales, servicio en otras Administraciones Públicas, excedencia, y suspensión de funciones"),
  c("situaciones-administrativas", "¿Qué es el servicio activo (art. 86.1)?", "La situación de quienes prestan servicios en su condición de funcionarios, cualquiera que sea la Administración en que estén destinados, sin corresponderles otra situación"),
  c("situaciones-administrativas", "Cita 3 supuestos de declaración de servicios especiales (art. 87.1)", "Ser designado miembro del Gobierno o de gobiernos autonómicos; ser autorizado a misión internacional superior a 6 meses; acceder a Diputado/Senador retribuido; ser designado personal eventual de confianza"),
  c("situaciones-administrativas", "¿Qué retribuciones perciben quienes están en servicios especiales (art. 87.2)?", "Las del puesto o cargo que desempeñen, no las de funcionario de carrera, salvo trienios"),
  c("situaciones-administrativas", "Enumera las modalidades de excedencia del art. 89.1", "Voluntaria por interés particular, voluntaria por agrupación familiar, por cuidado de familiares, por violencia de género/sexual, y por violencia terrorista"),
  c("situaciones-administrativas", "¿Qué antigüedad mínima se exige para la excedencia voluntaria por interés particular (art. 89.2)?", "5 años de servicios efectivos inmediatamente anteriores en cualquier Administración Pública"),
  c("situaciones-administrativas", "¿Cuál es la duración máxima de la excedencia por cuidado de hijo o familiar (art. 89.4)?", "3 años; el puesto se reserva durante los primeros 2 años"),
  c("situaciones-administrativas", "¿Qué efecto tiene la suspensión de funciones (art. 90.1)?", "Priva del ejercicio de funciones y derechos durante su permanencia; determina la pérdida del puesto si excede de 6 meses"),
  c("situaciones-administrativas", "¿Cuál es la duración máxima de la suspensión firme por sanción disciplinaria (art. 90.2)?", "6 años"),

  // Régimen disciplinario (arts. 93-98)
  c("regimen-disciplinario", "Enumera los principios de la potestad disciplinaria (art. 94.2)", "Legalidad y tipicidad; irretroactividad de lo desfavorable (y retroactividad de lo favorable); proporcionalidad; culpabilidad; presunción de inocencia"),
  c("regimen-disciplinario", "¿En qué clases se dividen las faltas disciplinarias (art. 95.1)?", "Muy graves, graves y leves"),
  c("regimen-disciplinario", "Cita 4 faltas muy graves del art. 95.2", "Incumplir el deber de respeto a la Constitución; discriminación o acoso; abandono del servicio; adopción de acuerdos manifiestamente ilegales con perjuicio grave; desobediencia abierta a un superior; acoso laboral"),
  c("regimen-disciplinario", "¿Quién tipifica las faltas graves y leves (art. 95.3-4)?", "Ley de las Cortes Generales o de la asamblea legislativa autonómica correspondiente (o convenios colectivos para personal laboral)"),
  c("regimen-disciplinario", "Enumera las sanciones disciplinarias del art. 96.1", "Separación del servicio (funcionarios) / despido disciplinario (laboral); suspensión firme de funciones (máx. 6 años); traslado forzoso; demérito; apercibimiento"),
  c("regimen-disciplinario", "¿Cuándo procede la separación del servicio (art. 96.1.a)?", "Solo puede sancionar la comisión de faltas muy graves"),
  c("regimen-disciplinario", "¿En qué plazos prescriben las infracciones disciplinarias (art. 97.1)?", "Muy graves: 3 años; graves: 2 años; leves: 6 meses"),
  c("regimen-disciplinario", "¿En qué plazos prescriben las sanciones disciplinarias (art. 97.1)?", "Impuestas por faltas muy graves: 3 años; graves: 2 años; leves: 1 año"),
  c("regimen-disciplinario", "¿Qué separación debe existir en el procedimiento disciplinario (art. 98.2)?", "Separación entre la fase instructora y la sancionadora, encomendadas a órganos distintos"),
  c("regimen-disciplinario", "¿Cuál es la duración máxima de la suspensión provisional cautelar (art. 98.3)?", "6 meses, salvo paralización imputable al interesado"),
];

console.log(`📝 Insertando ${CARDS.length} flashcards de tema-18...`);
await insertBatch(CARDS);

const SECCIONES_AUX_ADMIN = ["adquisicion-servicio", "perdida-servicio", "situaciones-administrativas", "regimen-disciplinario"];
const patchTO = await fetch(`${URL_BASE}/rest/v1/tema_oposicion?tema_slug=eq.tema-18&oposicion_slug=eq.auxiliar-administrativo`, {
  method: "PATCH", headers: { ...HEADERS, Prefer: "return=representation" }, body: JSON.stringify({ secciones_incluidas: SECCIONES_AUX_ADMIN }),
});
if (!patchTO.ok) { console.error(`❌ ${patchTO.status} ${await patchTO.text()}`); process.exit(1); }
console.log("✅ tema_oposicion (auxiliar-administrativo, tema-18) limitado a:", SECCIONES_AUX_ADMIN);
console.log("✅ Tema-18 completado.");
