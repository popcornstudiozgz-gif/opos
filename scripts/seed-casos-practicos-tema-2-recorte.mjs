/**
 * Casos prácticos — Tema 2 (Igualdad de género y Violencia de Género), caso
 * de recambio.
 *
 * `caso-marisa-empresa-discriminacion-acoso-tutela` (tanda 1) queda oculto
 * para esta oposición porque 2 de sus 10 preguntas usan `loiemh-titulo-preliminar`,
 * fuera de `secciones_incluidas` de tema-2. Este caso nuevo cubre el mismo
 * supuesto (discriminación laboral y acoso sexual) pero ceñido enteramente a
 * `loiemh-titulo-1` (LO 3/2007, arts. 3-13: el principio de igualdad y la
 * tutela contra la discriminación), que sí entra en el temario oficial.
 *
 * Uso: node --env-file=.env.local scripts/seed-casos-practicos-tema-2-recorte.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

const TEMA = "tema-2";
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

const CASO = {
  slug: "caso-marisa-ascenso-denegado-tutela-antidiscriminacion",
  titulo: "El caso de Marisa: el ascenso denegado y la tutela contra la discriminación",
  orden: 4,
  supuesto:
    "Marisa Andreu trabaja como operaria en una empresa aragonesa de distribución. Al quedar vacante el puesto " +
    "de jefa de almacén, solicita el ascenso, para el que cumple los mismos requisitos que sus compañeros " +
    "varones. La empresa se lo deniega alegando que «el puesto requiere fuerza física, mejor para un hombre». " +
    "Poco después, un compañero empieza a hacerle comentarios de contenido sexual reiterados que la incomodan " +
    "profundamente. Cuando Marisa se queja ante Recursos Humanos, empieza a notar que la excluyen de reuniones " +
    "y le reducen encargos. Meses más tarde, tras quedarse embarazada, la empresa no le renueva el contrato " +
    "temporal. Marisa decide acudir a los tribunales.",
  preguntas: [
    q("loiemh-titulo-1", "facil",
      "¿Qué supone el principio de igualdad de trato entre mujeres y hombres según el art. 3 LOIEMH?",
      ["La ausencia de toda discriminación, directa o indirecta, por razón de sexo, y en especial las derivadas de la maternidad, la asunción de obligaciones familiares y el estado civil",
       "La obligación de contratar el mismo número de hombres que de mujeres en cada empresa",
       "Un principio orientativo, sin efectos jurídicos vinculantes para las empresas privadas",
       "La prohibición de valorar el mérito y la capacidad al cubrir un puesto de trabajo"],
      "El art. 3 LOIEMH define el principio de igualdad de trato como ausencia de discriminación directa o indirecta por razón de sexo, mencionando expresamente la maternidad, las obligaciones familiares y el estado civil como causas frecuentes de discriminación encubierta."),
    q("loiemh-titulo-1", "media",
      "La empresa deniega el ascenso a Marisa pese a que cumple los mismos requisitos que sus compañeros varones. ¿Qué tipo de discriminación describe el art. 6.1 LOIEMH para este supuesto?",
      ["Discriminación directa: la situación en que una persona es tratada, en atención a su sexo, de manera menos favorable que otra en situación comparable",
       "Discriminación indirecta: una práctica aparentemente neutra que perjudica a un sexo",
       "No hay discriminación si la empresa no lo reconoce expresamente por escrito",
       "Discriminación por razón de estado civil, no de sexo"],
      "El art. 6.1 LOIEMH define la discriminación directa como el trato menos favorable en atención al sexo en una situación comparable; aquí no hay un criterio aparentemente neutro (eso sería indirecta), sino un trato peor explícitamente basado en el sexo."),
    q("loiemh-titulo-1", "dificil",
      "Si en lugar de negarlo abiertamente, la empresa hubiera exigido para el ascenso un requisito de fuerza física aparentemente neutro que en la práctica excluyera casi siempre a las mujeres, ¿qué figura del art. 6.2 LOIEMH describiría eso?",
      ["Discriminación indirecta: una disposición, criterio o práctica aparentemente neutros que pone a personas de un sexo en desventaja particular, salvo que se justifique objetivamente con una finalidad legítima y medios proporcionados",
       "Discriminación directa, exactamente igual que negarlo abiertamente",
       "No sería discriminación, al tratarse de un requisito aplicable por igual a ambos sexos",
       "Acoso por razón de sexo, al afectar mayoritariamente a las mujeres"],
      "El art. 6.2 LOIEMH reserva la calificación de discriminación indirecta a los criterios formalmente neutros que generan un impacto desigual, distinguiéndola de la discriminación directa (trato explícitamente diferente) del art. 6.1."),
    q("loiemh-titulo-1", "media",
      "¿Qué constituye acoso sexual según el art. 7.1 LOIEMH, aplicado a los comentarios que recibe Marisa de su compañero?",
      ["Cualquier comportamiento, verbal o físico, de naturaleza sexual que tenga el propósito o produzca el efecto de atentar contra la dignidad de una persona, en particular cuando se crea un entorno intimidatorio, degradante u ofensivo",
       "Únicamente el contacto físico no consentido, no los comentarios verbales",
       "Solo si los comentarios se repiten más de diez veces documentadas",
       "Solo si el compañero ocupa un puesto de superior jerárquico sobre Marisa"],
      "El art. 7.1 LOIEMH no exige contacto físico ni una relación jerárquica: basta un comportamiento verbal o físico de naturaleza sexual que, por su propósito o efecto, atente contra la dignidad y cree un entorno intimidatorio, degradante u ofensivo."),
    q("loiemh-titulo-1", "facil",
      "¿Qué calificación otorga el art. 7.3 LOIEMH al acoso sexual y al acoso por razón de sexo?",
      ["Se consideran en todo caso discriminatorios",
       "Solo son discriminatorios si además constituyen delito penal",
       "Son ilícitos laborales, pero no discriminación por razón de sexo",
       "Depende de la valoración subjetiva de cada caso concreto"],
      "El art. 7.3 LOIEMH zanja la cuestión: el acoso sexual y el acoso por razón de sexo se consideran en todo caso discriminatorios, sin necesidad de una valoración adicional caso por caso."),
    q("loiemh-titulo-1", "media",
      "Tras quejarse a Recursos Humanos, Marisa empieza a notar que la excluyen de reuniones y le reducen encargos. ¿Qué figura del art. 9 LOIEMH describe esta reacción de la empresa?",
      ["La indemnidad frente a represalias: se considera discriminación por razón de sexo cualquier trato adverso o efecto negativo como consecuencia de una queja, reclamación, denuncia o recurso destinados a exigir el cumplimiento del principio de igualdad",
       "No es discriminación, al no tratarse de un despido formal",
       "Es una simple reorganización empresarial ajena a la LOIEMH",
       "Solo sería discriminación si la reducción de encargos supusiera una rebaja salarial expresa"],
      "El art. 9 LOIEMH protege frente a las represalias: cualquier trato adverso que sea consecuencia de haber reclamado por una discriminación se considera, en sí mismo, un nuevo acto de discriminación por razón de sexo."),
    q("loiemh-titulo-1", "media",
      "Meses después, tras quedarse embarazada, la empresa no renueva el contrato temporal de Marisa. ¿Qué establece el art. 8 LOIEMH al respecto?",
      ["Constituye discriminación directa por razón de sexo todo trato desfavorable a las mujeres relacionado con el embarazo o la maternidad",
       "Solo sería discriminación si la empresa reconociera expresamente el motivo del embarazo",
       "No hay discriminación si el contrato era temporal y estaba próximo a su fin",
       "Es discriminación indirecta, no directa, al no ir dirigida específicamente contra Marisa"],
      "El art. 8 LOIEMH califica de forma tajante y directa (no indirecta) cualquier trato desfavorable ligado al embarazo o la maternidad, con independencia de que el contrato fuera temporal."),
    q("loiemh-titulo-1", "dificil",
      "Si Marisa gana el litigio, ¿qué consecuencias jurídicas prevé el art. 10 LOIEMH para los actos discriminatorios de la empresa?",
      ["La nulidad de los actos y cláusulas que constituyan o causen la discriminación, y responsabilidad a través de un sistema de reparaciones o indemnizaciones reales, efectivas y proporcionadas al perjuicio, además de sanciones disuasorias",
       "Únicamente una sanción administrativa, sin nulidad de los actos ni indemnización a Marisa",
       "La empresa solo debe readmitir a Marisa, sin ninguna otra consecuencia",
       "La discriminación por razón de sexo no genera responsabilidad civil, solo laboral"],
      "El art. 10 LOIEMH combina dos planos: la nulidad civil de los actos y cláusulas discriminatorios, y un sistema de reparación (indemnizaciones reales y proporcionadas) reforzado, en su caso, con sanciones disuasorias."),
    q("loiemh-titulo-1", "media",
      "¿Ante quién y hasta cuándo puede Marisa recabar la tutela judicial de su derecho a la igualdad según el art. 12.1 LOIEMH?",
      ["Ante los tribunales, incluso tras la terminación de la relación laboral en la que se produjo la discriminación",
       "Únicamente mientras dure la relación laboral, perdiendo el derecho al extinguirse el contrato",
       "Solo ante la Inspección de Trabajo, sin acceso directo a la vía judicial",
       "Solo si la empresa reconoce previamente los hechos por escrito"],
      "El art. 12.1 LOIEMH permite recabar la tutela judicial incluso después de terminada la relación en la que se produjo la discriminación, precisamente para casos como el de Marisa, en el que la no renovación coincide con el cese del vínculo laboral."),
    q("loiemh-titulo-1", "dificil",
      "En el litigio, ¿a quién corresponde probar la ausencia de discriminación según el art. 13.1 LOIEMH, una vez que Marisa fundamenta sus alegaciones en indicios de trato discriminatorio?",
      ["A la parte demandada (la empresa), que deberá probar la ausencia de discriminación en las medidas adoptadas y su proporcionalidad",
       "A Marisa, que deberá probar plenamente la intención discriminatoria de la empresa",
       "Al Ministerio Fiscal, de oficio, sin intervención de las partes",
       "La carga de la prueba no se altera respecto a las reglas procesales generales"],
      "El art. 13.1 LOIEMH invierte la carga de la prueba en estos procedimientos: basta con que la parte actora presente indicios fundados de discriminación para que sea la demandada quien deba probar que su actuación fue ajena a cualquier motivo discriminatorio."),
  ],
};

await crearCaso(CASO);
console.log("✔ Caso de recambio del tema 2 sembrado.");
