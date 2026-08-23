/**
 * Tema-13: preguntas de test de los documentos contables de las entidades
 * locales (LHL, Título VI, Cap. III, arts. 200-212), derivadas 1:1 de
 * seed-flashcards-tema-13-documentos-contables.mjs.
 *
 * Uso: node --env-file=.env.local scripts/seed-preguntas-tema-13-documentos-contables.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

async function insertPreguntas(preguntas) {
  for (const p of preguntas) {
    const resP = await fetch(`${URL_BASE}/rest/v1/preguntas`, {
      method: "POST",
      headers: { ...HEADERS, Prefer: "return=representation" },
      body: JSON.stringify({ tema_slug: TEMA, seccion: SECCION, enunciado: p.enunciado, explicacion: p.explicacion ?? null, dificultad: p.dificultad }),
    });
    if (!resP.ok) { console.error(`❌ pregunta ${resP.status} ${await resP.text()}`); process.exit(1); }
    const [row] = await resP.json();
    const opciones = p.opciones.map((texto, i) => ({ pregunta_id: row.id, texto, es_correcta: i === 0, orden: i }));
    const resO = await fetch(`${URL_BASE}/rest/v1/opciones`, { method: "POST", headers: { ...HEADERS, Prefer: "return=minimal" }, body: JSON.stringify(opciones) });
    if (!resO.ok) { console.error(`❌ opciones ${resO.status} ${await resO.text()}`); process.exit(1); }
  }
}

const TEMA = "tema-13";
const SECCION = "documentos-contables";
const q = (dificultad, enunciado, opciones, explicacion) => ({ dificultad, enunciado, opciones, explicacion });

const PREGUNTAS = [
  q("facil",
    "¿A qué régimen quedan sometidas las entidades locales y sus organismos autónomos según el art. 200.1 de la Ley reguladora de las Haciendas Locales?",
    ["Al régimen de contabilidad pública",
     "Al régimen de contabilidad mercantil, exclusivamente",
     "A un régimen contable libremente elegido por cada Corporación",
     "Al régimen de contabilidad presupuestaria del Estado, sin adaptación local"],
    "El art. 200.1 LHL sujeta a las entidades locales y sus organismos autónomos al régimen de contabilidad pública, con las reglas específicas que desarrolla el propio Título VI."),
  q("media",
    "¿Están las sociedades mercantiles con capital íntegro o mayoritario de una entidad local sometidas también a la contabilidad pública según el art. 200.2?",
    ["Sí, sin perjuicio de que se adapten además a las disposiciones del Código de Comercio y al Plan General de Contabilidad de la empresa española",
     "No, quedan sujetas únicamente al Código de Comercio, como cualquier sociedad mercantil privada",
     "Solo si su capital es íntegramente público, no si es mayoritario",
     "Solo si lo acuerda expresamente el Pleno de la entidad local"],
    "El art. 200.2 LHL combina ambos regímenes: contabilidad pública y, además, adaptación al Código de Comercio y al Plan General de Contabilidad empresarial, precisamente por la naturaleza mercantil de estas sociedades."),
  q("facil",
    "¿Ante qué órgano deben rendir cuentas las entidades locales por su sujeción al régimen de contabilidad pública, según el art. 201?",
    ["Ante el Tribunal de Cuentas",
     "Ante el Ministerio de Hacienda, con carácter exclusivo",
     "Ante las Cortes Generales, directamente",
     "Ante la Cámara de Cuentas de la Comunidad Autónoma, en todo caso"],
    "El art. 201 LHL vincula la sujeción al régimen de contabilidad pública con la obligación de rendir cuentas al Tribunal de Cuentas, cualquiera que sea la naturaleza de las operaciones."),
  q("facil",
    "¿Con qué coincide el ejercicio contable de una entidad local según el art. 202?",
    ["Con el ejercicio presupuestario",
     "Con el año natural, aunque el presupuestario sea distinto",
     "Con el mandato de cuatro años de la Corporación",
     "Lo determina libremente cada entidad local en sus Ordenanzas"],
    "El art. 202 LHL es breve pero clave: el ejercicio contable coincide siempre con el presupuestario, sin margen de decisión para la entidad local."),
  q("media",
    "¿A quién corresponde aprobar las normas contables de carácter general y el Plan General de Contabilidad Pública adaptado a las entidades locales según el art. 203.1?",
    ["Al Ministerio de Hacienda, a propuesta de la Intervención General de la Administración del Estado",
     "A cada entidad local, a través de su propio Reglamento de contabilidad",
     "A la Intervención de cada entidad local, sin necesidad de propuesta estatal",
     "Al Tribunal de Cuentas, como órgano fiscalizador"],
    "El art. 203.1 LHL centraliza en el Ministerio de Hacienda (a propuesta técnica de la IGAE) la aprobación de las normas contables generales y del Plan General de Contabilidad Pública, para garantizar homogeneidad entre todas las entidades locales."),
  q("media",
    "¿Qué función contable corresponde a la Intervención de la entidad local según el art. 204.1?",
    ["Llevar y desarrollar la contabilidad financiera y el seguimiento, en términos financieros, de la ejecución de los presupuestos",
     "Únicamente fiscalizar a posteriori las cuentas ya cerradas, sin llevar la contabilidad del ejercicio",
     "Elaborar el proyecto de presupuesto, función que la LHL atribuye a la Intervención",
     "Aprobar definitivamente la cuenta general, sustituyendo al Pleno"],
    "El art. 204.1 LHL asigna a la Intervención la llevanza activa de la contabilidad financiera y el seguimiento de la ejecución presupuestaria, no solo un control posterior ni la aprobación final (que corresponde al Pleno)."),
  q("dificil",
    "¿Cuál de los siguientes es uno de los fines de la contabilidad pública local que enumera el art. 205?",
    ["Determinar los resultados desde un punto de vista económico-patrimonial",
     "Fijar el tipo de interés legal del dinero aplicable a la entidad local",
     "Sustituir a la fiscalización que corresponde al Tribunal de Cuentas",
     "Determinar la plantilla de personal de la entidad local"],
    "El art. 205 LHL enumera un catálogo amplio de fines (balance, resultados económico-patrimoniales y analíticos, ejecución presupuestaria, tesorería, apoyo a controles de legalidad...), entre los que no figuran ni el tipo de interés legal ni la plantilla de personal, ajenos a la función contable."),
  q("facil",
    "¿Cuándo forman las entidades locales la cuenta general, según el art. 208?",
    ["A la terminación del ejercicio presupuestario",
     "Al inicio de cada ejercicio presupuestario, como previsión",
     "Solo cuando lo solicite expresamente el Tribunal de Cuentas",
     "Cada cuatro años, coincidiendo con el mandato de la Corporación"],
    "El art. 208 LHL sitúa la formación de la cuenta general al cierre del ejercicio presupuestario, como balance retrospectivo de la gestión económica, financiera, patrimonial y presupuestaria realizada."),
  q("media",
    "¿Por qué cuentas está integrada la cuenta general de una entidad local según el art. 209.1?",
    ["Por la de la propia entidad local, la de sus organismos autónomos, y la de las sociedades mercantiles de capital íntegramente propiedad de la entidad local",
     "Únicamente por la de la propia entidad local, sin incluir organismos autónomos ni sociedades mercantiles",
     "Por la de la entidad local y la de todas las empresas privadas con las que contrate, sin excepción",
     "Por la de la entidad local y la de la Comunidad Autónoma a la que pertenece"],
    "El art. 209.1 LHL exige una visión consolidada del grupo local: entidad, organismos autónomos y sociedades mercantiles de capital íntegramente propio, cada una con sus reglas de elaboración."),
  q("media",
    "¿Qué memorias adicionales deben acompañar a la cuenta general los municipios de más de 50.000 habitantes según el art. 211?",
    ["Una memoria justificativa del coste y rendimiento de los servicios públicos, y una memoria demostrativa del grado de cumplimiento de los objetivos programados",
     "Únicamente un informe de auditoría externa, sin memorias de gestión",
     "Una memoria sobre el estado de la deuda pública municipal, exclusivamente",
     "No existe ninguna obligación adicional para los municipios grandes: la cuenta general es idéntica en todos los casos"],
    "El art. 211 LHL refuerza la rendición de cuentas de los municipios de mayor tamaño (y otras entidades de ámbito superior) exigiendo dos memorias adicionales centradas en coste/rendimiento de servicios y en el grado de cumplimiento de objetivos."),
  q("dificil",
    "¿Antes de qué fecha debe el presidente de la entidad local rendir los estados y cuentas del ejercicio anterior, según el art. 212.1?",
    ["Antes del día 15 de mayo del ejercicio siguiente al que correspondan",
     "Antes del día 1 de enero del ejercicio siguiente",
     "Antes del día 31 de diciembre del propio ejercicio, sin esperar al año siguiente",
     "No existe plazo fijado por la ley, lo determina cada entidad local"],
    "El art. 212.1 LHL fija el 15 de mayo del ejercicio siguiente como fecha límite para que el presidente rinda los estados y cuentas, arrancando la secuencia de plazos de todo el procedimiento de aprobación."),
  q("dificil",
    "Tras la rendición por el presidente, ¿antes de qué fecha debe la Comisión Especial de Cuentas emitir su informe sobre la cuenta general, según el art. 212.2?",
    ["Antes del día 1 de junio",
     "Antes del día 15 de mayo, el mismo día que la rendición del presidente",
     "Antes del día 1 de octubre, coincidiendo con la aprobación del Pleno",
     "En el plazo de un año desde la rendición del presidente"],
    "El art. 212.2 LHL encadena los plazos: tras la rendición del presidente (15 de mayo), la Comisión Especial de Cuentas debe informar antes del 1 de junio, previo a la exposición pública."),
  q("media",
    "Con el informe de la Comisión Especial de Cuentas ya emitido, ¿durante cuántos días se expone al público la cuenta general para que los interesados presenten reclamaciones, según el art. 212.3?",
    ["15 días",
     "30 días",
     "10 días",
     "No cabe exposición pública de la cuenta general, solo del presupuesto"],
    "El art. 212.3 LHL prevé un trámite de información pública de 15 días, durante los cuales cualquier interesado puede examinar la cuenta general y presentar reclamaciones, reparos u observaciones."),
  q("dificil",
    "¿Antes de qué fecha debe el Pleno de la corporación aprobar, en su caso, la cuenta general, según el art. 212.4?",
    ["Antes del día 1 de octubre",
     "Antes del día 1 de junio, junto con el informe de la Comisión Especial",
     "Antes del día 31 de diciembre del mismo ejercicio al que se refiere la cuenta",
     "No existe plazo para la aprobación por el Pleno"],
    "El art. 212.4 LHL cierra la secuencia de plazos con la aprobación por el Pleno antes del 1 de octubre, una vez completados los trámites previos de informe y exposición pública."),
  q("media",
    "Una vez que el Pleno se pronuncia sobre la cuenta general, ¿qué debe hacer a continuación el presidente de la corporación según el art. 212.5?",
    ["Rendirla al Tribunal de Cuentas, tanto si el Pleno la aprueba como si la rechaza",
     "Rendirla al Tribunal de Cuentas únicamente si el Pleno la aprueba",
     "Remitirla al Ministerio de Hacienda, no al Tribunal de Cuentas",
     "El procedimiento termina con la decisión del Pleno, sin más trámites posteriores"],
    "El art. 212.5 LHL es claro: la rendición al Tribunal de Cuentas procede en todo caso tras el pronunciamiento del Pleno, sea cual sea el sentido de ese pronunciamiento (aprobación o rechazo)."),
];

console.log(`📝 Insertando ${PREGUNTAS.length} preguntas de ${TEMA}/${SECCION}...`);
await insertPreguntas(PREGUNTAS);
console.log(`✅ ${TEMA}/${SECCION} completado.`);
