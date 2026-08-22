/**
 * Casos prácticos — Tema 16 (Reglamentos y ordenanzas de los municipios,
 * Ley 7/1985 + especialidades de la Ley 10/2017 de Capitalidad de
 * Zaragoza). 2 casos de 10 preguntas cada uno:
 *   1. La ordenanza de terrazas del municipio pequeño: potestad
 *      reglamentaria y procedimiento general de aprobación (arts. 4-6,
 *      49 LBRL)
 *   2. La ordenanza fiscal de Zaragoza: especialidades de la capitalidad
 *      en la aprobación de ordenanzas, reglamentos y presupuesto (arts.
 *      48-50 Ley 10/2017)
 *
 * Reutiliza las secciones ya usadas por las preguntas sueltas del tema
 * (concepto, procedimiento-general, capitalidad-ordenanzas). Misma
 * mecánica que los casos anteriores: preguntas/opciones en las tablas ya
 * existentes, enlazadas vía caso_preguntas con su `orden`. La primera
 * opción de cada pregunta es siempre la correcta (el cliente baraja el
 * orden al mostrarlas).
 *
 * Uso: node --env-file=.env.local scripts/seed-casos-practicos-tema-16.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

const TEMA = "tema-16";
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
// CASO 1 — La ordenanza de terrazas del municipio pequeño
// ═══════════════════════════════════════════════════════════════════════
const CASO_1 = {
  slug: "caso-ordenanza-terrazas-potestad-reglamentaria-procedimiento",
  titulo: "La ordenanza de terrazas del municipio pequeño: potestad reglamentaria y procedimiento",
  orden: 1,
  supuesto:
    "Un pequeño municipio aragonés decide aprobar una nueva ordenanza reguladora de terrazas y veladores en la " +
    "vía pública. El Pleno aprueba inicialmente el texto y lo somete a información pública. Durante el plazo de " +
    "exposición, una asociación de hostelería presenta alegaciones sobre los horarios propuestos. Transcurrido " +
    "el plazo, el Pleno debe pronunciarse sobre esas alegaciones antes de aprobar definitivamente la ordenanza. " +
    "Un segundo municipio vecino, en cambio, no recibe ninguna alegación durante el plazo de exposición pública " +
    "de su propia ordenanza.",
  preguntas: [
    q("concepto", "facil",
      "La potestad de dictar esta ordenanza de terrazas, ¿qué potestad municipal ejercita el Ayuntamiento?",
      ["La potestad reglamentaria y de autoorganización",
       "La potestad tributaria y financiera, exclusivamente",
       "La potestad de programación o planificación",
       "La potestad expropiatoria"],
      "Art. 4.1.a) LBRL: corresponden en todo caso a los municipios las potestades reglamentaria y de autoorganización."),
    q("concepto", "media",
      "Esta potestad reglamentaria, ¿corresponde a los municipios en todo caso, en su calidad de Administraciones públicas de carácter territorial?",
      ["Sí, en su calidad de Administraciones públicas de carácter territorial, y dentro de la esfera de sus competencias, corresponden en todo caso a los municipios las potestades reglamentaria y de autoorganización, entre otras",
       "No, la potestad reglamentaria municipal exige siempre una habilitación específica y expresa de cada ley sectorial",
       "No, esa potestad corresponde en exclusiva a las Comunidades Autónomas",
       "Sí, pero únicamente en los municipios de gran población"],
      "Art. 4.1 LBRL: en su calidad de Administraciones públicas de carácter territorial, corresponden en todo caso a los municipios las potestades reglamentaria y de autoorganización, entre otras."),
    q("procedimiento-general", "facil",
      "¿Cuál es el primer trámite del procedimiento de aprobación de esta ordenanza local?",
      ["La aprobación inicial por el Pleno",
       "La publicación directa en el Boletín Oficial, sin trámite previo",
       "El informe preceptivo y vinculante del Consejo de Estado",
       "La aprobación por el Alcalde, sin intervención del Pleno"],
      "Art. 49.a) LBRL: la aprobación de las Ordenanzas locales se ajustará al siguiente procedimiento: aprobación inicial por el Pleno."),
    q("procedimiento-general", "media",
      "Tras la aprobación inicial, ¿qué trámite debe seguir la ordenanza antes de su aprobación definitiva?",
      ["Información pública y audiencia a los interesados por el plazo mínimo de treinta días para la presentación de reclamaciones y sugerencias",
       "Un referéndum vecinal vinculante, obligatorio en todo caso",
       "La aprobación previa de la Diputación Provincial",
       "Ningún trámite adicional: la aprobación inicial produce ya plenos efectos"],
      "Art. 49.b) LBRL: información pública y audiencia a los interesados por el plazo mínimo de treinta días para la presentación de reclamaciones y sugerencias."),
    q("procedimiento-general", "dificil",
      "La asociación de hostelería presenta alegaciones sobre los horarios propuestos dentro del plazo. ¿Qué debe hacer el Pleno antes de la aprobación definitiva?",
      ["Resolver todas las reclamaciones y sugerencias presentadas dentro del plazo, y aprobar definitivamente la ordenanza",
       "Puede ignorar las alegaciones y aprobar directamente el texto inicial sin pronunciarse sobre ellas",
       "Debe remitir automáticamente el expediente a los Tribunales para que resuelvan las alegaciones",
       "Debe iniciar necesariamente un nuevo procedimiento completo desde el principio"],
      "Art. 49.c) LBRL: resolución de todas las reclamaciones y sugerencias presentadas dentro del plazo y aprobación definitiva por el Pleno."),
    q("procedimiento-general", "facil",
      "En el municipio vecino, que no recibe ninguna alegación durante el plazo de exposición pública, ¿qué ocurre con la ordenanza aprobada inicialmente?",
      ["Se entenderá definitivamente adoptado el acuerdo hasta entonces provisional",
       "Debe someterse igualmente a una segunda votación expresa del Pleno para su aprobación definitiva",
       "Caduca automáticamente por falta de alegaciones, debiendo tramitarse de nuevo",
       "Debe remitirse en todo caso a la Comunidad Autónoma para su aprobación definitiva"],
      "Art. 49.c) LBRL (párrafo segundo): si no se hubiera presentado ninguna reclamación o sugerencia, se entenderá definitivamente adoptado el acuerdo hasta entonces provisional."),
    q("procedimiento-general", "media",
      "¿Cuál es el plazo mínimo de información pública y audiencia a los interesados que exige la Ley de Bases de Régimen Local para las ordenanzas locales?",
      ["Treinta días",
       "Quince días",
       "Un mes y medio, en todo caso",
       "La Ley no fija ningún plazo mínimo, quedando a criterio de cada municipio"],
      "Art. 49.b) LBRL: el plazo mínimo de información pública y audiencia a los interesados es de treinta días."),
    q("concepto", "media",
      "Además de la potestad reglamentaria, ¿qué otra potestad enumera expresamente el art. 4.1 de la Ley de Bases entre las que corresponden en todo caso a los municipios?",
      ["La potestad de revisión de oficio de sus actos y acuerdos, entre otras",
       "La potestad legislativa plena, equiparable a la de las Cortes Generales",
       "La potestad de acuñación de moneda propia",
       "La potestad de disolución de otros municipios limítrofes"],
      "Art. 4.1.g) LBRL: corresponde en todo caso a los municipios la potestad de revisión de oficio de sus actos y acuerdos."),
    q("concepto", "facil",
      "¿Tienen las Entidades locales plena capacidad jurídica para celebrar contratos y establecer y explotar obras o servicios públicos?",
      ["Sí, para el cumplimiento de sus fines y en el ámbito de sus competencias, las Entidades locales tendrán plena capacidad jurídica para ello, de acuerdo con la Constitución y las leyes",
       "No, esa capacidad jurídica corresponde en exclusiva al Estado",
       "Sí, pero únicamente si cuentan con autorización previa y expresa de la Comunidad Autónoma para cada contrato",
       "No, las Entidades locales carecen de capacidad jurídica propia, distinta de la del Estado"],
      "Art. 5 LBRL: las Entidades locales tendrán plena capacidad jurídica para adquirir, poseer, celebrar contratos y establecer y explotar obras o servicios públicos, entre otras facultades."),
    q("procedimiento-general", "dificil",
      "¿Quién ejerce el control de legalidad de los acuerdos y actos de las Entidades locales, como esta ordenanza?",
      ["Los Tribunales",
       "Exclusivamente la Comunidad Autónoma, mediante tutela administrativa previa",
       "El Delegado del Gobierno, mediante veto directo",
       "Ningún órgano externo: el control es puramente interno de cada Corporación"],
      "Art. 6.2 LBRL: los Tribunales ejercen el control de legalidad de los acuerdos y actos de las entidades locales."),
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// CASO 2 — La ordenanza fiscal de Zaragoza
// ═══════════════════════════════════════════════════════════════════════
const CASO_2 = {
  slug: "caso-ordenanza-fiscal-zaragoza-especialidades-capitalidad",
  titulo: "La ordenanza fiscal de Zaragoza: especialidades de la capitalidad",
  orden: 2,
  supuesto:
    "El Gobierno de Zaragoza (equivalente a la Junta de Gobierno Local en el régimen de gran población) " +
    "elabora el proyecto de una nueva ordenanza fiscal reguladora de una tasa municipal. El proyecto se remite " +
    "a la Comisión plenaria competente para su dictamen y aprobación inicial, y posteriormente se expone al " +
    "público. Al mismo tiempo, un grupo político presenta una proposición de reglamento sobre un asunto " +
    "distinto, acompañada de una memoria justificativa. Por otro lado, se tramita también el proyecto de " +
    "presupuesto general del Ayuntamiento para el año siguiente.",
  preguntas: [
    q("capitalidad-ordenanzas", "facil",
      "¿A quién corresponde aprobar el proyecto de la ordenanza fiscal antes de remitirlo a la Comisión plenaria?",
      ["Al Gobierno de Zaragoza",
       "Directamente al Pleno, sin intervención previa del Gobierno de Zaragoza",
       "A la Diputación Provincial de Zaragoza",
       "Al Justicia de Aragón, como garante de los derechos de los contribuyentes"],
      "Art. 49.a) Ley 10/2017: aprobación del proyecto de ordenanza fiscal por el Gobierno de Zaragoza y remisión a la Comisión plenaria para su dictamen y aprobación inicial."),
    q("capitalidad-ordenanzas", "media",
      "Una vez aprobada inicialmente la ordenanza fiscal por la Comisión plenaria, ¿qué plazo mínimo de exposición al público establece la Ley de Capitalidad?",
      ["Treinta días",
       "Quince días",
       "Sesenta días",
       "La Ley de Capitalidad no fija ningún plazo específico, remitiéndose al general de la LBRL"],
      "Art. 49.b) Ley 10/2017: aprobada inicialmente la ordenanza fiscal, se expondrá al público por el plazo mínimo de treinta días."),
    q("capitalidad-ordenanzas", "dificil",
      "Si no se hubieran presentado reclamaciones durante ese plazo de exposición pública, ¿qué ocurre con la ordenanza fiscal?",
      ["Se entenderá definitivamente aprobada",
       "Debe someterse igualmente a una nueva votación expresa del Pleno",
       "Caduca el procedimiento, debiendo iniciarse de nuevo",
       "Se remite automáticamente al Gobierno de Aragón para su aprobación definitiva"],
      "Art. 49.c) Ley 10/2017: en caso de que no se hubieren presentado reclamaciones, la ordenanza fiscal se entenderá definitivamente aprobada."),
    q("capitalidad-ordenanzas", "media",
      "La iniciativa para la aprobación de ordenanzas y reglamentos de competencia del Pleno, ¿a quién corresponde en el régimen de capitalidad de Zaragoza?",
      ["Al Gobierno de Zaragoza, a los grupos políticos y a la iniciativa popular, en los términos previstos en la normativa básica",
       "Únicamente al Alcalde, con carácter exclusivo y excluyente",
       "Únicamente a los grupos políticos, nunca al propio Gobierno de Zaragoza",
       "Exclusivamente a la iniciativa popular, sin intervención de los órganos de gobierno"],
      "Art. 48.2 Ley 10/2017: la iniciativa corresponde al Gobierno de Zaragoza, a los grupos políticos y a la iniciativa popular, en los términos previstos en la normativa básica."),
    q("capitalidad-ordenanzas", "facil",
      "El grupo político que presenta su proposición de reglamento, ¿debe acompañarla de algún documento específico?",
      ["Sí, de una memoria suscrita por el Grupo político que la presente",
       "No, basta la mera presentación del texto articulado, sin documentación adicional",
       "Sí, pero únicamente un informe económico del Interventor, sin memoria explicativa",
       "No, las proposiciones de los grupos políticos están exentas de cualquier requisito documental"],
      "Art. 48.4.a) Ley 10/2017: la proposición se acompañará de una memoria suscrita por el Grupo político que la presente."),
    q("capitalidad-ordenanzas", "media",
      "Una vez dictaminada por la Comisión y aceptada la proposición del grupo político, ¿a qué trámite debe someterse antes de su aprobación definitiva?",
      ["Al trámite de información pública y audiencia a los interesados durante un plazo mínimo de treinta días naturales",
       "Directamente a votación final del Pleno, sin ningún trámite de participación",
       "A referéndum municipal vinculante",
       "A un informe previo y vinculante del Tribunal Constitucional"],
      "Art. 48.4.b) Ley 10/2017: una vez dictaminada por la Comisión, si la proposición es aceptada, se someterá al trámite de información pública y audiencia a los interesados durante un plazo mínimo de treinta días naturales."),
    q("capitalidad-ordenanzas", "dificil",
      "Si una enmienda presentada por un Concejal a la ordenanza fiscal supusiera una disminución de los ingresos presupuestarios del ejercicio en curso, ¿qué requisito exige la Ley de Capitalidad para su tramitación?",
      ["Requerirá la conformidad del Gobierno de Zaragoza para su tramitación",
       "No requiere ningún requisito adicional, cualquier Concejal puede presentarla libremente",
       "Requiere la aprobación previa de las Cortes de Aragón",
       "Requiere un informe favorable y vinculante del Justicia de Aragón"],
      "Art. 48.6 Ley 10/2017: toda proposición o enmienda que suponga aumento de los créditos o disminución de los ingresos presupuestarios del ejercicio en curso requerirá la conformidad del Gobierno de Zaragoza."),
    q("capitalidad-ordenanzas", "media",
      "El proyecto de presupuesto general del Ayuntamiento, ¿antes de qué fecha debe remitirse al Pleno según la Ley de Capitalidad?",
      ["Antes del día quince de octubre de cada año",
       "Antes del día 31 de diciembre del ejercicio anterior",
       "Antes del día 1 de enero del ejercicio al que se refiera",
       "La Ley de Capitalidad no fija ninguna fecha específica de remisión al Pleno"],
      "Art. 50.c) Ley 10/2017: el proyecto de presupuesto se remitirá al Pleno antes del día quince de octubre de cada año."),
    q("capitalidad-ordenanzas", "facil",
      "¿Durante cuántos días se expone al público el proyecto de presupuesto general antes de su aprobación, conforme a la Ley de Capitalidad?",
      ["Durante un período de quince días",
       "Durante un período de treinta días, igual que las ordenanzas fiscales",
       "Durante un período de sesenta días",
       "No se prevé ningún período de exposición pública para el presupuesto"],
      "Art. 50.b) Ley 10/2017: el proyecto de presupuesto se expondrá al público durante un período de quince días."),
    q("capitalidad-ordenanzas", "media",
      "Si el presupuesto general no hubiera entrado en vigor al iniciarse el nuevo ejercicio económico, ¿qué ocurre conforme a la Ley de Capitalidad?",
      ["Se considerará automáticamente prorrogado el del ejercicio anterior",
       "El Ayuntamiento queda sin presupuesto operativo hasta la aprobación definitiva",
       "Se aplica automáticamente el presupuesto de la Comunidad Autónoma de Aragón",
       "El Gobierno de Zaragoza puede aprobar un presupuesto provisional por decreto, sin intervención del Pleno"],
      "Art. 50.f) Ley 10/2017: si el presupuesto correspondiente no hubiera entrado en vigor una vez iniciado el ejercicio económico, se considerará automáticamente prorrogado el del ejercicio anterior."),
  ],
};

for (const caso of [CASO_1, CASO_2]) {
  await crearCaso(caso);
}
console.log("✔ Casos prácticos del tema 16 (Reglamentos y ordenanzas de los municipios) sembrados.");
