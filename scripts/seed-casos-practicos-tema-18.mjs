/**
 * Casos prácticos — Tema 18 (Situaciones administrativas y régimen
 * disciplinario, TREBEP Títulos IV, VI y VII). 3 casos de 10 preguntas
 * cada uno, cada uno centrado en un bloque distinto del tema:
 *   1. El funcionario que difundió datos confidenciales: faltas,
 *      sanciones, prescripción, procedimiento y suspensión provisional
 *      (régimen disciplinario, arts. 93-98)
 *   2. La excedencia de la funcionaria y su reingreso: servicio activo,
 *      servicios especiales y modalidades de excedencia (situaciones
 *      administrativas, arts. 85-89)
 *   3. Del acceso a la jubilación: adquisición de la condición de
 *      funcionario, renuncia, inhabilitación y jubilación (arts. 55-56,
 *      62-64, 66-67)
 *
 * Reutiliza las secciones ya usadas por las preguntas sueltas del tema
 * (regimen-disciplinario, situaciones-administrativas,
 * adquisicion-servicio, perdida-servicio). Misma mecánica que los casos
 * anteriores: preguntas/opciones en las tablas ya existentes, enlazadas
 * vía caso_preguntas con su `orden`. La primera opción de cada pregunta
 * es siempre la correcta (el cliente baraja el orden al mostrarlas).
 *
 * Uso: node --env-file=.env.local scripts/seed-casos-practicos-tema-18.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

const TEMA = "tema-18";
const q = (seccion, dificultad, enunciado, opciones, explicacion) => ({ seccion, dificultad, enunciado, opciones, explicacion });

async function crearCaso({ slug, titulo, supuesto, orden, preguntas }) {
  const resCaso = await fetch(`${URL_BASE}/rest/v1/casos_practicos`, {
    method: "POST",
    headers: { ...HEADERS, Prefer: "return=representation" },
    body: JSON.stringify({ tema_slug: TEMA, slug, titulo, supuesto, orden }),
  });
  if (!resCaso.ok) { console.error(`❌ caso ${resCaso.status} ${await resCaso.text()}`); process.exit(1); }
  const [caso] = await resCaso.json();

  for (let i = 0; i < preguntas.length; i++) {
    const p = preguntas[i];
    const resP = await fetch(`${URL_BASE}/rest/v1/preguntas`, {
      method: "POST",
      headers: { ...HEADERS, Prefer: "return=representation" },
      body: JSON.stringify({ tema_slug: TEMA, seccion: p.seccion, enunciado: p.enunciado, explicacion: p.explicacion ?? null, dificultad: p.dificultad }),
    });
    if (!resP.ok) { console.error(`❌ pregunta ${resP.status} ${await resP.text()}`); process.exit(1); }
    const [pregunta] = await resP.json();

    const opciones = p.opciones.map((texto, idx) => ({ pregunta_id: pregunta.id, texto, es_correcta: idx === 0, orden: idx }));
    const resO = await fetch(`${URL_BASE}/rest/v1/opciones`, { method: "POST", headers: { ...HEADERS, Prefer: "return=minimal" }, body: JSON.stringify(opciones) });
    if (!resO.ok) { console.error(`❌ opciones ${resO.status} ${await resO.text()}`); process.exit(1); }

    const resCP = await fetch(`${URL_BASE}/rest/v1/caso_preguntas`, {
      method: "POST",
      headers: { ...HEADERS, Prefer: "return=minimal" },
      body: JSON.stringify({ caso_id: caso.id, pregunta_id: pregunta.id, orden: i }),
    });
    if (!resCP.ok) { console.error(`❌ caso_preguntas ${resCP.status} ${await resCP.text()}`); process.exit(1); }
  }
  console.log(`✅ ${titulo} (${preguntas.length} preguntas)`);
}

// ═══════════════════════════════════════════════════════════════════════
// CASO 1 — El funcionario que difundió datos confidenciales
// ═══════════════════════════════════════════════════════════════════════
const CASO_1 = {
  slug: "caso-funcionario-datos-confidenciales-regimen-disciplinario",
  titulo: "El funcionario que difundió datos confidenciales: régimen disciplinario",
  orden: 1,
  supuesto:
    "Un funcionario del Ayuntamiento de Zaragoza, con acceso a expedientes de subvenciones, filtra a un medio " +
    "de comunicación información confidencial sobre los datos personales de varios solicitantes, obtenida por " +
    "razón de su cargo. Se le incoa expediente disciplinario. Durante la instrucción, el instructor detecta " +
    "indicios de un posible delito y lo pone en conocimiento del Ministerio Fiscal. Mientras se resuelve el " +
    "expediente, la Administración acuerda su suspensión provisional como medida cautelar. Pasados cinco meses " +
    "desde el inicio de la suspensión, sin que el procedimiento se haya paralizado por causa imputable al " +
    "funcionario, este se pregunta si esa suspensión puede prolongarse indefinidamente.",
  preguntas: [
    q("regimen-disciplinario", "facil",
      "La publicación o utilización indebida de información a la que el funcionario tuvo acceso por razón de su cargo, ¿qué tipo de falta constituye?",
      ["Una falta muy grave",
       "Una falta grave, nunca muy grave",
       "Una falta leve, salvo que se repita en el tiempo",
       "No constituye falta disciplinaria, sino solo un ilícito penal"],
      "Art. 95.2.e) TREBEP: es falta muy grave la publicación o utilización indebida de la documentación o información a que se tenga o haya tenido acceso por razón del cargo o función."),
    q("regimen-disciplinario", "media",
      "¿Con arreglo a qué principios debe ejercerse la potestad disciplinaria frente a este funcionario?",
      ["Legalidad y tipicidad de las faltas y sanciones, irretroactividad de las disposiciones no favorables (y retroactividad de las favorables), proporcionalidad, culpabilidad y presunción de inocencia",
       "Únicamente el principio de proporcionalidad, sin ningún otro límite aplicable",
       "Discrecionalidad absoluta del órgano sancionador, sin sujeción a principios previos",
       "Presunción de culpabilidad del funcionario expedientado"],
      "Art. 94.2 TREBEP: la potestad disciplinaria se ejercerá de acuerdo con los principios de legalidad y tipicidad, irretroactividad/retroactividad favorable, proporcionalidad, culpabilidad y presunción de inocencia."),
    q("regimen-disciplinario", "dificil",
      "El instructor detecta indicios de un posible delito y lo pone en conocimiento del Ministerio Fiscal. ¿Qué efecto tiene esto sobre la tramitación del expediente disciplinario?",
      ["Se suspenderá la tramitación del procedimiento disciplinario",
       "El procedimiento disciplinario continúa sin ninguna alteración, en paralelo al proceso penal",
       "El expediente disciplinario se archiva automática y definitivamente",
       "Se convierte automáticamente en un procedimiento penal, perdiendo su naturaleza administrativa"],
      "Art. 94.3 TREBEP: cuando de la instrucción de un procedimiento disciplinario resulte la existencia de indicios fundados de criminalidad, se suspenderá su tramitación poniéndolo en conocimiento del Ministerio Fiscal."),
    q("regimen-disciplinario", "media",
      "Si finalmente se le impone la sanción de separación del servicio por esta falta muy grave, ¿qué exige la Ley para que pueda imponerse esa sanción concreta?",
      ["La separación del servicio solo podrá sancionar la comisión de faltas muy graves",
       "Puede imponerse también por la comisión de faltas graves, si el órgano sancionador lo considera oportuno",
       "Puede imponerse por faltas leves reiteradas, sin necesidad de que sean muy graves",
       "Solo puede imponerse a personal laboral, nunca a funcionarios de carrera"],
      "Art. 96.1.a) TREBEP: la separación del servicio de los funcionarios solo podrá sancionar la comisión de faltas muy graves."),
    q("regimen-disciplinario", "facil",
      "¿Cuál es el plazo de prescripción de esta falta muy grave, si no se instruye a tiempo el expediente?",
      ["Tres años",
       "Un año",
       "Seis meses",
       "Cinco años"],
      "Art. 97.1 TREBEP: las infracciones muy graves prescribirán a los tres años."),
    q("regimen-disciplinario", "media",
      "¿Desde cuándo empieza a contarse ese plazo de prescripción de la falta?",
      ["Desde que se hubiera cometido la falta",
       "Desde que se dicte la resolución sancionadora",
       "Desde que el expediente disciplinario adquiera firmeza",
       "Desde que el Ministerio Fiscal archive las diligencias penales"],
      "Art. 97.2 TREBEP: el plazo de prescripción de las faltas comenzará a contarse desde que se hubieran cometido."),
    q("regimen-disciplinario", "dificil",
      "Al no poder imponerse una sanción por falta muy grave sin procedimiento previo, ¿qué exige la Ley respecto a la instrucción y la resolución del expediente?",
      ["Quedará establecida la debida separación entre la fase instructora y la sancionadora, encomendándose a órganos distintos",
       "Pueden encomendarse ambas fases al mismo órgano sin ningún inconveniente",
       "La instrucción corresponde siempre al superior jerárquico directo del funcionario expedientado",
       "No es necesario ningún procedimiento previo si el funcionario reconoce los hechos"],
      "Art. 98.2 TREBEP: en el procedimiento quedará establecida la debida separación entre la fase instructora y la sancionadora, encomendándose a órganos distintos."),
    q("regimen-disciplinario", "media",
      "La suspensión provisional acordada como medida cautelar durante la tramitación del expediente, ¿qué duración máxima tiene, con carácter general?",
      ["No podrá exceder de 6 meses, salvo en caso de paralización del procedimiento imputable al interesado",
       "No tiene ningún límite temporal máximo, mientras dure la tramitación del expediente",
       "Un máximo de un mes, prorrogable indefinidamente por el órgano instructor",
       "Un máximo de tres años, coincidiendo con el plazo de prescripción de la falta"],
      "Art. 98.3 TREBEP: la suspensión provisional como medida cautelar no podrá exceder de 6 meses, salvo paralización del procedimiento imputable al interesado."),
    q("regimen-disciplinario", "facil",
      "Durante esa suspensión provisional, ¿tiene el funcionario derecho a percibir alguna retribución?",
      ["Sí, tendrá derecho a percibir durante la suspensión las retribuciones básicas y, en su caso, las prestaciones familiares por hijo a cargo",
       "No, durante la suspensión provisional no se percibe ninguna retribución",
       "Sí, tiene derecho a percibir la totalidad de sus retribuciones, incluidos los complementos específicos",
       "Solo si la suspensión finalmente no se convierte en sanción definitiva"],
      "Art. 98.3 TREBEP (párrafo tercero): el funcionario suspenso provisional tendrá derecho a percibir durante la suspensión las retribuciones básicas y, en su caso, las prestaciones familiares por hijo a cargo."),
    q("regimen-disciplinario", "dificil",
      "Si finalmente la suspensión provisional no llega a convertirse en sanción definitiva, ¿qué debe hacer la Administración respecto a las retribuciones no percibidas durante ese período?",
      ["Debe restituir al funcionario la diferencia entre los haberes realmente percibidos y los que hubiera debido percibir si se hubiera encontrado con plenitud de derechos",
       "No debe restituir nada, pues el riesgo de la suspensión provisional lo asume siempre el funcionario",
       "Debe restituir únicamente el 50 % de la diferencia dejada de percibir",
       "Debe restituir la diferencia solo si el funcionario lo reclama judicialmente"],
      "Art. 98.4 TREBEP: si la suspensión provisional no llegara a convertirse en sanción definitiva, la Administración deberá restituir al funcionario la diferencia entre los haberes realmente percibidos y los que hubiera debido percibir con plenitud de derechos."),
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// CASO 2 — La excedencia de la funcionaria y su reingreso
// ═══════════════════════════════════════════════════════════════════════
const CASO_2 = {
  slug: "caso-excedencia-funcionaria-reingreso-situaciones-administrativas",
  titulo: "La excedencia de la funcionaria y su reingreso: situaciones administrativas",
  orden: 2,
  supuesto:
    "Marta, funcionaria de carrera del Ayuntamiento de Zaragoza con ocho años de servicios efectivos, solicita " +
    "la excedencia voluntaria por interés particular para dedicarse a un proyecto personal, sin tener ningún " +
    "expediente disciplinario en curso. Dos años después, su compañero David es nombrado alto cargo de la " +
    "Diputación General de Aragón, por lo que pasa a una situación administrativa distinta a la de servicio " +
    "activo. Al mismo tiempo, otra compañera, Sara, solicita una excedencia de tres años para el cuidado de su " +
    "hijo recién nacido. Por último, un cuarto funcionario, Rubén, es autorizado a realizar una misión de " +
    "cooperación internacional durante ocho meses en un organismo dependiente de Naciones Unidas.",
  preguntas: [
    q("situaciones-administrativas", "facil",
      "¿En cuál de estas situaciones administrativas se encuentra un funcionario que presta servicios efectivos en su puesto habitual, sin que le corresponda quedar en otra situación?",
      ["Servicio activo",
       "Servicios especiales",
       "Excedencia voluntaria por interés particular",
       "Servicio en otras Administraciones Públicas"],
      "Art. 86.1 TREBEP: se hallarán en servicio activo quienes presten servicios en su condición de funcionarios públicos y no les corresponda quedar en otra situación."),
    q("situaciones-administrativas", "media",
      "Marta tiene ocho años de servicios efectivos y ningún expediente disciplinario en curso. ¿Puede obtener la excedencia voluntaria por interés particular?",
      ["Sí, los funcionarios de carrera pueden obtener esta excedencia cuando hayan prestado servicios efectivos durante un periodo mínimo de cinco años inmediatamente anteriores, siempre que no se les esté instruyendo expediente disciplinario",
       "No, el periodo mínimo exigido con carácter general por el Estatuto es de diez años de servicios efectivos",
       "Sí, sin necesidad de haber prestado ningún periodo mínimo de servicios efectivos",
       "No, la excedencia voluntaria por interés particular fue suprimida por el Estatuto Básico del Empleado Público"],
      "Art. 89.2 TREBEP: los funcionarios podrán obtener la excedencia voluntaria por interés particular cuando hayan prestado servicios efectivos durante un periodo mínimo de cinco años inmediatamente anteriores, y no se les instruya expediente disciplinario."),
    q("situaciones-administrativas", "dificil",
      "Durante esa excedencia voluntaria por interés particular, ¿devenga Marta retribuciones o se le computa el tiempo a efectos de trienios?",
      ["No, quienes se encuentren en esta situación no devengarán retribuciones, ni les será computable el tiempo a efectos de ascensos, trienios y derechos en el régimen de Seguridad Social",
       "Sí, percibe la totalidad de sus retribuciones básicas durante toda la excedencia",
       "Sí, aunque no percibe retribuciones, el tiempo sí se computa a efectos de trienios",
       "No percibe retribuciones, pero conserva el derecho a la reserva de su puesto de trabajo concreto"],
      "Art. 89.2 TREBEP (párrafo final): quienes se encuentren en excedencia por interés particular no devengarán retribuciones, ni les será computable el tiempo a efectos de ascensos, trienios y Seguridad Social."),
    q("situaciones-administrativas", "media",
      "David es nombrado alto cargo de la Diputación General de Aragón. ¿En qué situación administrativa queda como funcionario de carrera?",
      ["En situación de servicios especiales",
       "En situación de excedencia voluntaria por interés particular",
       "Continúa en situación de servicio activo, sin ninguna alteración",
       "En situación de suspensión de funciones"],
      "Art. 87.1.a) TREBEP: los funcionarios de carrera serán declarados en servicios especiales cuando sean nombrados altos cargos de las Administraciones Públicas o Instituciones."),
    q("situaciones-administrativas", "facil",
      "Mientras David está en servicios especiales, ¿qué retribuciones percibe?",
      ["Las retribuciones del puesto o cargo que efectivamente desempeñe, no las que le corresponderían como funcionario de carrera, sin perjuicio de los trienios que tenga reconocidos",
       "Las retribuciones de su puesto de funcionario de carrera, exactamente como si estuviera en servicio activo",
       "No percibe ninguna retribución mientras dure la situación de servicios especiales",
       "Percibe simultáneamente ambas retribuciones, la de su puesto de origen y la del cargo desempeñado"],
      "Art. 87.2 TREBEP: quienes se encuentren en servicios especiales percibirán las retribuciones del puesto o cargo que desempeñen, sin perjuicio del derecho a percibir los trienios reconocidos."),
    q("situaciones-administrativas", "media",
      "Cuando David cese en ese alto cargo, ¿qué derecho tiene como funcionario de carrera que estuvo en servicios especiales?",
      ["Derecho a reingresar al servicio activo en la misma localidad, en las condiciones y con las retribuciones correspondientes a la categoría, nivel o escalón de la carrera consolidados",
       "Ningún derecho especial: debe superar de nuevo un proceso selectivo completo para reingresar",
       "Derecho únicamente a una indemnización económica, sin posibilidad de reingreso al servicio activo",
       "Derecho a reingresar solo si existe vacante presupuestada en su puesto de origen"],
      "Art. 87.3 TREBEP: quienes se encuentren en servicios especiales tendrán derecho, al menos, a reingresar al servicio activo en la misma localidad, con las condiciones y retribuciones de la carrera consolidada."),
    q("situaciones-administrativas", "media",
      "Sara solicita una excedencia de tres años para el cuidado de su hijo recién nacido. ¿Reconoce el Estatuto ese derecho, y con qué duración máxima?",
      ["Sí, los funcionarios de carrera tienen derecho a un período de excedencia de duración no superior a tres años para atender al cuidado de cada hijo",
       "Sí, pero la duración máxima reconocida por el Estatuto es de un año",
       "No, el cuidado de hijos solo da derecho a permisos retribuidos, nunca a una excedencia",
       "Sí, con una duración máxima de tres años, pero solo si la solicita el progenitor varón"],
      "Art. 89.4 TREBEP: los funcionarios tendrán derecho a un período de excedencia de duración no superior a tres años para atender al cuidado de cada hijo."),
    q("situaciones-administrativas", "facil",
      "Durante esa excedencia por cuidado de hijo, ¿se le reserva a Sara su puesto de trabajo?",
      ["Sí, el puesto de trabajo desempeñado se reservará al menos durante dos años; transcurrido ese periodo, la reserva será a un puesto en la misma localidad y de igual retribución",
       "No, pierde cualquier derecho de reserva desde el primer día de la excedencia",
       "Sí, se le reserva el mismo puesto durante los tres años completos de la excedencia, sin excepción",
       "La reserva de puesto solo se aplica a la excedencia por interés particular"],
      "Art. 89.4 TREBEP: el puesto de trabajo desempeñado se reservará, al menos, durante dos años; transcurrido este periodo, la reserva será a un puesto en la misma localidad y de igual retribución."),
    q("situaciones-administrativas", "dificil",
      "Rubén es autorizado a realizar una misión de cooperación internacional durante ocho meses en un organismo de Naciones Unidas. ¿En qué situación administrativa queda?",
      ["En situación de servicios especiales, pues se le autoriza para realizar una misión por periodo determinado superior a seis meses en organismos internacionales o programas de cooperación internacional",
       "En situación de excedencia voluntaria por interés particular, al tratarse de una ausencia voluntaria",
       "Continúa en situación de servicio activo, por tratarse de una misión de menos de un año",
       "En situación de servicio en otras Administraciones Públicas"],
      "Art. 87.1.b) TREBEP: los funcionarios serán declarados en servicios especiales cuando sean autorizados a realizar una misión por periodo superior a seis meses en organismos internacionales o programas de cooperación internacional."),
    q("situaciones-administrativas", "media",
      "Si la misión de Rubén hubiera sido, en cambio, de solo cuatro meses de duración, ¿le correspondería igualmente la situación de servicios especiales por esa causa concreta?",
      ["No, esa causa concreta de servicios especiales exige que la misión tenga una duración superior a seis meses",
       "Sí, la duración de la misión es irrelevante para declarar los servicios especiales",
       "Sí, siempre que la misión se realice en un organismo internacional, sea cual sea su duración",
       "No, en ese caso pasaría directamente a la situación de suspensión de funciones"],
      "Art. 87.1.b) TREBEP: esta causa de servicios especiales exige expresamente que la misión tenga una duración superior a seis meses."),
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// CASO 3 — Del acceso a la jubilación
// ═══════════════════════════════════════════════════════════════════════
const CASO_3 = {
  slug: "caso-acceso-renuncia-jubilacion-funcionario",
  titulo: "Del acceso a la jubilación: adquisición y pérdida de la condición de funcionario",
  orden: 3,
  supuesto:
    "Beatriz supera un proceso selectivo para ingresar como funcionaria de carrera en el Ayuntamiento de " +
    "Zaragoza, es nombrada por el órgano competente y su nombramiento se publica en el boletín oficial " +
    "correspondiente. Antes de tomar posesión, debe realizar el acto de acatamiento de la Constitución. Años " +
    "después, un compañero suyo, Ignacio, decide presentar por escrito su renuncia voluntaria a la condición de " +
    "funcionario para dedicarse a la empresa privada, sin que exista ningún expediente disciplinario abierto " +
    "contra él. Otro compañero, Fermín, es condenado mediante sentencia firme a la pena de inhabilitación " +
    "especial para el cargo público que ocupaba. Finalmente, doña Pilar, con 65 años de edad, se plantea si " +
    "puede seguir en activo o debe jubilarse forzosamente.",
  preguntas: [
    q("adquisicion-servicio", "facil",
      "¿Con arreglo a qué principios constitucionales deben seleccionar su personal las Administraciones Públicas, como en el proceso selectivo que supera Beatriz?",
      ["Los principios de igualdad, mérito y capacidad",
       "Los principios de antigüedad y confianza política, exclusivamente",
       "El principio de libre designación, sin sujeción a ningún otro criterio",
       "El principio de proporcionalidad territorial entre candidatos"],
      "Art. 55.1 TREBEP: todos los ciudadanos tienen derecho al acceso al empleo público de acuerdo con los principios constitucionales de igualdad, mérito y capacidad."),
    q("adquisicion-servicio", "media",
      "Entre los requisitos generales para participar en el proceso selectivo, ¿qué exige la Ley respecto a la edad de los aspirantes?",
      ["Tener cumplidos dieciséis años y no exceder, en su caso, de la edad máxima de jubilación forzosa",
       "Tener cumplidos veintiún años, sin excepción alguna",
       "No existe ningún requisito de edad para participar en procesos selectivos",
       "Tener cumplidos dieciocho años y no exceder de los cincuenta años de edad"],
      "Art. 56.1.c) TREBEP: para participar en procesos selectivos será necesario tener cumplidos dieciséis años y no exceder, en su caso, de la edad máxima de jubilación forzosa."),
    q("adquisicion-servicio", "dificil",
      "Beatriz supera el proceso selectivo y es nombrada por el órgano competente. ¿Basta esto para que adquiera ya la condición de funcionaria de carrera?",
      ["No, además del nombramiento, debe realizar el acto de acatamiento de la Constitución y, en su caso, del Estatuto de Autonomía correspondiente, y tomar posesión dentro del plazo establecido",
       "Sí, la superación del proceso selectivo y el nombramiento agotan por sí solos todos los requisitos exigidos",
       "No, además debe transcurrir un periodo de prueba de un año desde el nombramiento",
       "Sí, basta con el nombramiento, sin que sea necesario ningún otro trámite adicional"],
      "Art. 62.1 TREBEP: la condición de funcionario de carrera se adquiere por la superación del proceso selectivo, el nombramiento, el acto de acatamiento y la toma de posesión, sucesivamente."),
    q("adquisicion-servicio", "media",
      "El nombramiento de Beatriz, ¿debe publicarse en algún medio oficial?",
      ["Sí, el nombramiento por el órgano o autoridad competente será publicado en el Diario Oficial correspondiente",
       "No, el nombramiento tiene carácter interno y no requiere publicación oficial",
       "Sí, pero únicamente si Beatriz lo solicita expresamente",
       "No, solo se publican los nombramientos de personal directivo o de libre designación"],
      "Art. 62.1.b) TREBEP: el nombramiento por el órgano o autoridad competente será publicado en el Diario Oficial correspondiente."),
    q("perdida-servicio", "facil",
      "Ignacio presenta por escrito su renuncia voluntaria a la condición de funcionario. ¿Debe ser aceptada automáticamente por la Administración?",
      ["No, la renuncia habrá de ser manifestada por escrito y será aceptada expresamente por la Administración",
       "Sí, la renuncia produce sus efectos de forma automática, sin necesidad de aceptación",
       "No, la renuncia de un funcionario de carrera nunca puede ser aceptada por la Administración",
       "Sí, pero solo si Ignacio lleva más de veinte años de servicios efectivos"],
      "Art. 64.1 TREBEP: la renuncia voluntaria a la condición de funcionario habrá de ser manifestada por escrito y será aceptada expresamente por la Administración."),
    q("perdida-servicio", "media",
      "Si en el momento de presentar su renuncia Ignacio tuviera abierto un expediente disciplinario, ¿podría la Administración aceptarla?",
      ["No, la renuncia no podrá ser aceptada cuando el funcionario esté sujeto a expediente disciplinario o tenga dictado en su contra auto de procesamiento o de apertura de juicio oral por delito",
       "Sí, la existencia de un expediente disciplinario es irrelevante para aceptar la renuncia",
       "Sí, siempre que el propio funcionario asuma expresamente las consecuencias del expediente",
       "No, salvo que el expediente disciplinario se refiera a una falta leve"],
      "Art. 64.2 TREBEP: no podrá ser aceptada la renuncia cuando el funcionario esté sujeto a expediente disciplinario o haya sido dictado en su contra auto de procesamiento o de apertura de juicio oral por delito."),
    q("perdida-servicio", "facil",
      "Tras su renuncia aceptada, ¿queda Ignacio inhabilitado para volver a ingresar en la Administración Pública en el futuro?",
      ["No, la renuncia a la condición de funcionario no inhabilita para ingresar de nuevo en la Administración Pública a través del procedimiento de selección establecido",
       "Sí, la renuncia voluntaria inhabilita de forma permanente para el acceso al empleo público",
       "Sí, pero únicamente durante un plazo de cinco años desde la renuncia",
       "Solo podría reingresar mediante rehabilitación expresa concedida por el Consejo de Ministros"],
      "Art. 64.3 TREBEP: la renuncia a la condición de funcionario no inhabilita para ingresar de nuevo en la Administración Pública a través del procedimiento de selección establecido."),
    q("perdida-servicio", "media",
      "Fermín es condenado mediante sentencia firme a la pena de inhabilitación especial para el cargo público que ocupaba. ¿Qué alcance tiene esa pérdida de la condición de funcionario?",
      ["Produce la pérdida de la condición de funcionario respecto de aquellos empleos o cargos especificados en la sentencia, a diferencia de la inhabilitación absoluta, que afecta a todos los empleos o cargos",
       "Produce la pérdida de la condición de funcionario respecto de todos los empleos y cargos que tuviera, exactamente igual que la inhabilitación absoluta",
       "No produce ningún efecto sobre su condición de funcionario mientras no se dicte una segunda sentencia específica",
       "Solo produce efectos si la pena es superior a diez años de duración"],
      "Art. 66 TREBEP (párrafo segundo): la inhabilitación especial produce la pérdida de la condición de funcionario respecto de aquellos empleos o cargos especificados en la sentencia."),
    q("perdida-servicio", "facil",
      "Doña Pilar tiene 65 años. Salvo que existan normas específicas distintas, ¿a qué edad se declara de oficio la jubilación forzosa de un funcionario?",
      ["Al cumplir los sesenta y cinco años de edad",
       "Al cumplir los setenta años de edad, en todo caso",
       "Al cumplir los sesenta años de edad",
       "No existe edad de jubilación forzosa para los funcionarios de carrera"],
      "Art. 67.3 TREBEP: la jubilación forzosa se declarará de oficio al cumplir el funcionario los sesenta y cinco años de edad."),
    q("perdida-servicio", "media",
      "¿Podría doña Pilar solicitar prolongar su permanencia en servicio activo más allá de los sesenta y cinco años?",
      ["Sí, en los términos que establezcan las leyes de Función Pública, se podrá solicitar la prolongación de la permanencia en el servicio activo como máximo hasta que se cumplan setenta años de edad",
       "No, cumplidos los sesenta y cinco años la jubilación forzosa es siempre inmediata y automática, sin excepción",
       "Sí, sin ningún límite máximo de edad para la prolongación",
       "No, la prolongación solo está prevista para el personal laboral, nunca para los funcionarios de carrera"],
      "Art. 67.3 TREBEP (párrafo segundo): se podrá solicitar la prolongación de la permanencia en el servicio activo como máximo hasta que se cumplan setenta años de edad."),
  ],
};

for (const caso of [CASO_1, CASO_2, CASO_3]) {
  await crearCaso(caso);
}
console.log("✔ Casos prácticos del tema 18 (Situaciones administrativas y régimen disciplinario) sembrados.");
