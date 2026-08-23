/**
 * Tema-13: documentos contables de las entidades locales (Ley reguladora
 * de las Haciendas Locales, Título VI, Cap. III, arts. 200-212) — la parte
 * del temario oficial que faltaba junto al presupuesto (contenido,
 * créditos, ejecución, ya sembrados) y la capitalidad de Zaragoza. El
 * título oficial del tema menciona expresamente "Documentos contables".
 *
 * Fiel a content-raw/ley-reguladora-haciendas-locales/39-titulo6-cap3-contabilidad.md.
 *
 * Uso: node --env-file=.env.local scripts/seed-flashcards-tema-13-documentos-contables.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

async function insertBatch(filas) {
  const res = await fetch(`${URL_BASE}/rest/v1/flashcards`, { method: "POST", headers: { ...HEADERS, Prefer: "return=minimal" }, body: JSON.stringify(filas) });
  if (!res.ok) { console.error(`❌ ${res.status} ${await res.text()}`); process.exit(1); }
}

const TEMA = "tema-13";
const SECCION = "documentos-contables";
const c = (anverso, reverso) => ({ tema_slug: TEMA, seccion: SECCION, anverso, reverso });

const CARDS = [
  c("¿A qué régimen quedan sometidas las entidades locales y sus organismos autónomos según el art. 200.1 LHL?", "Al régimen de contabilidad pública"),
  c("¿Están las sociedades mercantiles de capital local sometidas a la contabilidad pública (art. 200.2)?", "Sí, sin perjuicio de que se adapten también al Código de Comercio y al Plan General de Contabilidad de la empresa española"),
  c("¿Ante quién deben rendir cuentas las entidades locales por su sujeción al régimen de contabilidad pública (art. 201)?", "Ante el Tribunal de Cuentas"),
  c("¿Con qué coincide el ejercicio contable de una entidad local (art. 202)?", "Con el ejercicio presupuestario"),
  c("¿A quién corresponde aprobar las normas contables generales y el Plan General de Contabilidad Pública para las entidades locales (art. 203.1)?", "Al Ministerio de Hacienda, a propuesta de la Intervención General de la Administración del Estado (IGAE)"),
  c("¿Qué le corresponde a la Intervención de la entidad local en materia contable (art. 204.1)?", "Llevar y desarrollar la contabilidad financiera y el seguimiento, en términos financieros, de la ejecución de los presupuestos"),
  c("Cita 3 de los fines de la contabilidad pública local del art. 205", "Establecer el balance de la entidad; determinar los resultados económico-patrimoniales; registrar la ejecución de los presupuestos (también: resultados analíticos, movimientos de tesorería, datos para el Tribunal de Cuentas, controles de legalidad...)"),
  c("¿Cuándo forman las entidades locales la cuenta general según el art. 208?", "A la terminación del ejercicio presupuestario"),
  c("¿Por qué tres cuentas está integrada la cuenta general según el art. 209.1?", "Por la de la propia entidad, la de sus organismos autónomos, y la de las sociedades mercantiles de capital íntegramente propiedad de la entidad local"),
  c("¿Qué memorias adicionales deben acompañar a la cuenta general los municipios de más de 50.000 habitantes (art. 211)?", "Una memoria justificativa del coste y rendimiento de los servicios públicos, y una memoria demostrativa del grado de cumplimiento de los objetivos programados"),
  c("¿Antes de qué fecha debe rendir el presidente de la entidad local los estados y cuentas del ejercicio anterior (art. 212.1)?", "Antes del 15 de mayo del ejercicio siguiente"),
  c("¿Antes de qué fecha debe informar la Comisión Especial de Cuentas sobre la cuenta general (art. 212.2)?", "Antes del 1 de junio"),
  c("¿Cuántos días está expuesta al público la cuenta general, con el informe de la Comisión Especial, para reclamaciones (art. 212.3)?", "15 días"),
  c("¿Antes de qué fecha debe el Pleno aprobar, en su caso, la cuenta general (art. 212.4)?", "Antes del 1 de octubre"),
  c("Una vez que el Pleno se pronuncia sobre la cuenta general, ¿qué debe hacer el presidente de la corporación (art. 212.5)?", "Rendirla al Tribunal de Cuentas, se haya aprobado o rechazado"),
];

console.log(`📇 Insertando ${CARDS.length} flashcards de ${TEMA}/${SECCION}...`);
await insertBatch(CARDS);
console.log(`✅ ${TEMA}/${SECCION} completado.`);
