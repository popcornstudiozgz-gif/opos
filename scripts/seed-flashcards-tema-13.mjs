/**
 * Tema-13: Ley Reguladora de las Haciendas Locales (II) — estructura,
 * contenido, aprobación y ejecución del presupuesto (Título VI Cap. I) +
 * especialidades de financiación de la Ley de Capitalidad de Zaragoza
 * (Cap. VII). Los artículos de créditos/modificaciones y ejecución
 * (arts. 172-193) se condensan a lo conceptual.
 *
 * Uso: node --env-file=.env.local scripts/seed-flashcards-tema-13.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

async function insertBatch(filas) {
  const res = await fetch(`${URL_BASE}/rest/v1/flashcards`, { method: "POST", headers: { ...HEADERS, Prefer: "return=minimal" }, body: JSON.stringify(filas) });
  if (!res.ok) { console.error(`❌ ${res.status} ${await res.text()}`); process.exit(1); }
}

const TEMA = "tema-13";
const c = (seccion, anverso, reverso) => ({ tema_slug: TEMA, seccion, anverso, reverso });

const CARDS = [
  // Sección 1ª: Contenido y aprobación (arts. 162-171)
  c("presupuesto-contenido", "¿Qué son los presupuestos generales de las entidades locales (art. 162)?", "La expresión cifrada, conjunta y sistemática de las obligaciones máximas a reconocer y los derechos que prevean liquidar en el ejercicio, incluidas sus sociedades mercantiles íntegramente participadas"),
  c("presupuesto-contenido", "¿Con qué coincide el ejercicio presupuestario (art. 163)?", "Con el año natural"),
  c("presupuesto-contenido", "¿Qué integra el presupuesto general (art. 164.1)?", "El presupuesto de la propia entidad, los de sus organismos autónomos, y los estados de previsión de las sociedades mercantiles íntegramente participadas"),
  c("presupuesto-contenido", "¿Qué principio debe cumplir el presupuesto general (art. 165.1)?", "El principio de estabilidad presupuestaria"),
  c("presupuesto-contenido", "¿Con qué déficit debe aprobarse cada presupuesto integrante (art. 165.4)?", "Sin déficit inicial"),
  c("presupuesto-contenido", "Cita 3 anexos que se unen al presupuesto general (art. 166.1)", "Planes y programas de inversión y financiación a 4 años; programas anuales de las sociedades mercantiles; estado de consolidación; estado de previsión de la deuda"),
  c("presupuesto-contenido", "¿Quién forma el presupuesto de la Entidad Local (art. 168.1)?", "Su Presidente"),
  c("presupuesto-contenido", "¿Antes de qué fecha deben remitir su presupuesto los organismos autónomos a la Entidad Local (art. 168.2)?", "Antes del 15 de septiembre de cada año"),
  c("presupuesto-contenido", "¿Antes de qué fecha debe el Presidente remitir el presupuesto general al Pleno (art. 168.4)?", "Antes del 15 de octubre, para su aprobación, enmienda o devolución"),
  c("presupuesto-contenido", "¿Cuánto dura la exposición pública tras la aprobación inicial (art. 169.1)?", "15 días, durante los cuales los interesados pueden examinar el presupuesto y presentar reclamaciones"),
  c("presupuesto-contenido", "¿Antes de qué fecha debe aprobarse definitivamente el presupuesto (art. 169.2)?", "Antes del 31 de diciembre del año anterior al del ejercicio en que deba aplicarse"),
  c("presupuesto-contenido", "¿Cuándo entra en vigor el presupuesto (art. 169.5)?", "Una vez publicado, resumido por capítulos, en el boletín oficial de la provincia (o CCAA uniprovincial)"),
  c("presupuesto-contenido", "¿Qué ocurre si al iniciarse el ejercicio no ha entrado en vigor el nuevo presupuesto (art. 169.6)?", "Se considera automáticamente prorrogado el del ejercicio anterior, con sus créditos iniciales"),
  c("presupuesto-contenido", "¿Quiénes tienen legitimación para reclamar contra el presupuesto (art. 170.1)?", "Los habitantes del territorio, los directamente afectados aunque no habiten en él, y colegios/cámaras/sindicatos/asociaciones en defensa de sus intereses"),
  c("presupuesto-contenido", "¿Suspende la aplicación del presupuesto la interposición de un recurso (art. 171.3)?", "No, por sí sola no la suspende"),

  // Sección 2ª: Créditos y modificaciones (arts. 172-182, condensado)
  c("presupuesto-creditos", "¿Qué carácter tienen los créditos autorizados en el presupuesto (art. 172.2)?", "Carácter limitativo y vinculante"),
  c("presupuesto-creditos", "¿Cuándo son exigibles las obligaciones de pago de la hacienda local (art. 173.1)?", "Solo cuando resulten de la ejecución de sus presupuestos, o de sentencia judicial firme"),
  c("presupuesto-creditos", "¿Qué son los créditos extraordinarios y suplementos de crédito (art. 177.1)?", "Los que se tramitan cuando debe realizarse un gasto inaplazable sin crédito (extraordinario) o con crédito insuficiente (suplemento)"),
  c("presupuesto-creditos", "¿Quién aprueba los créditos extraordinarios y suplementos (art. 177.2)?", "El Pleno de la corporación, con los mismos trámites que los presupuestos"),
  c("presupuesto-creditos", "¿Qué son los créditos ampliables (art. 178)?", "Los que, relacionados taxativamente en las bases de ejecución, pueden incrementarse en función de la efectividad de los recursos afectados"),
  c("presupuesto-creditos", "¿A quién corresponde aprobar las transferencias de crédito entre grupos de función (art. 179.2)?", "Al Pleno de la corporación, salvo que afecten a créditos de personal"),

  // Sección 3ª: Ejecución y liquidación (arts. 183-193, condensado)
  c("presupuesto-ejecucion", "Enumera las fases de gestión del presupuesto de gastos (art. 184.1)", "Autorización del gasto; disposición o compromiso del gasto; reconocimiento o liquidación de la obligación; ordenación del pago"),
  c("presupuesto-ejecucion", "¿A quién corresponde el reconocimiento y liquidación de obligaciones (art. 185.2)?", "Al presidente de la corporación"),
  c("presupuesto-ejecucion", "¿A quién competen las funciones de ordenación de pagos (art. 186.1)?", "Al presidente de la entidad local"),
  c("presupuesto-ejecucion", "¿Cuándo se liquida el presupuesto de cada ejercicio (art. 191.1)?", "El 31 de diciembre del año natural correspondiente"),
  c("presupuesto-ejecucion", "¿Qué configura el remanente de tesorería (art. 191.2)?", "Las obligaciones reconocidas no satisfechas, los derechos pendientes de cobro y los fondos líquidos a 31 de diciembre"),
  c("presupuesto-ejecucion", "¿Antes de qué fecha debe confeccionarse la liquidación del presupuesto (art. 191.3)?", "Antes del 1 de marzo del ejercicio siguiente; su aprobación corresponde al presidente, previo informe de Intervención"),
  c("presupuesto-ejecucion", "¿Qué debe hacer el Pleno si la liquidación arroja remanente de tesorería negativo (art. 193.1)?", "Reducir gastos del nuevo presupuesto por cuantía igual al déficit, en la primera sesión que celebre"),

  // Especialidades de financiación: Ley de Capitalidad de Zaragoza (arts. 54-60)
  c("capitalidad-zaragoza", "¿Qué establece el art. 54 de la Ley de Capitalidad de Zaragoza?", "Un régimen especial de financiación propio para el municipio de Zaragoza, sin perjuicio del modelo general de haciendas locales"),
  c("capitalidad-zaragoza", "Enumera los instrumentos de participación de la CA de Aragón en la financiación de Zaragoza (art. 55)", "Asignaciones por participación en ingresos autonómicos; asignaciones para competencias atribuidas por la Ley (vía convenio bilateral); créditos por competencias delegadas; inversiones en infraestructuras supramunicipales"),
  c("capitalidad-zaragoza", "¿Qué debe garantizar la ley de participación de entes locales aragoneses respecto a Zaragoza (art. 56.2-3)?", "Reconocer la singularidad de Zaragoza y vincular la participación a la evolución de los ingresos no financieros de la Comunidad Autónoma"),
  c("capitalidad-zaragoza", "¿Qué es el Convenio bilateral económico-financiero (art. 57.1)?", "El convenio entre el Gobierno de Aragón y el Ayuntamiento de Zaragoza que fija las asignaciones para las competencias atribuidas por la Ley, previo informe del Consejo Bilateral de Capitalidad"),
  c("capitalidad-zaragoza", "¿Cuál es la vigencia mínima del Convenio bilateral económico-financiero (art. 57.3)?", "4 años"),
  c("capitalidad-zaragoza", "¿Cuál es la duración mínima de la delegación de competencias entre Gobierno de Aragón y Ayuntamiento de Zaragoza (art. 58.2)?", "4 años, con la correspondiente dotación presupuestaria adecuada y suficiente"),
  c("capitalidad-zaragoza", "¿Con qué periodicidad se abonan las asignaciones al Ayuntamiento de Zaragoza (art. 59.1)?", "Trimestralmente, salvo previsiones o acuerdos específicos"),
  c("capitalidad-zaragoza", "¿En qué puede colaborar la Diputación Provincial de Zaragoza con el municipio (art. 60.1)?", "En la financiación de infraestructuras, equipamientos, obras y servicios municipales en barrios rurales o de interés general, mediante convenio de mínimo 4 años"),
];

console.log(`📝 Insertando ${CARDS.length} flashcards de tema-13...`);
await insertBatch(CARDS);

const SECCIONES_AUX_ADMIN = ["presupuesto-contenido", "presupuesto-creditos", "presupuesto-ejecucion", "capitalidad-zaragoza"];
const patchTO = await fetch(`${URL_BASE}/rest/v1/tema_oposicion?tema_slug=eq.tema-13&oposicion_slug=eq.auxiliar-administrativo`, {
  method: "PATCH", headers: { ...HEADERS, Prefer: "return=representation" }, body: JSON.stringify({ secciones_incluidas: SECCIONES_AUX_ADMIN }),
});
if (!patchTO.ok) { console.error(`❌ ${patchTO.status} ${await patchTO.text()}`); process.exit(1); }
console.log("✅ tema_oposicion (auxiliar-administrativo, tema-13) limitado a:", SECCIONES_AUX_ADMIN);
console.log("✅ Tema-13 completado.");
