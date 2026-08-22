/**
 * Casos prácticos — Tema 13 (Haciendas Locales: El presupuesto municipal,
 * Ley reguladora de las Haciendas Locales + especialidades de la Ley
 * 10/2017 de Capitalidad de Zaragoza). 2 casos de 10 preguntas cada uno:
 *   1. El presupuesto del Ayuntamiento: elaboración, aprobación y
 *      reclamaciones (arts. 162-171 LHL)
 *   2. El déficit imprevisto en Deportes: créditos extraordinarios,
 *      ejecución del gasto, liquidación con remanente negativo y
 *      especialidades de financiación de la capitalidad (arts. 172-193
 *      LHL; arts. 54-60 Ley 10/2017)
 *
 * Reutiliza las secciones ya usadas por las preguntas sueltas del tema
 * (presupuesto-contenido, presupuesto-creditos, presupuesto-ejecucion,
 * capitalidad-zaragoza). Misma mecánica que los casos anteriores:
 * preguntas/opciones en las tablas ya existentes, enlazadas vía
 * caso_preguntas con su `orden`. La primera opción de cada pregunta es
 * siempre la correcta (el cliente baraja el orden al mostrarlas).
 *
 * Uso: node --env-file=.env.local scripts/seed-casos-practicos-tema-13.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

const TEMA = "tema-13";
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
// CASO 1 — El presupuesto del Ayuntamiento
// ═══════════════════════════════════════════════════════════════════════
const CASO_1 = {
  slug: "caso-presupuesto-ayuntamiento-aprobacion-reclamaciones",
  titulo: "El presupuesto del Ayuntamiento: elaboración, aprobación y reclamaciones",
  orden: 1,
  supuesto:
    "El Interventor de un Ayuntamiento aragonés informa el proyecto de presupuesto general que el Alcalde ha " +
    "formado para el año siguiente, incluyendo el presupuesto del organismo autónomo de cultura y el estado de " +
    "previsión de una sociedad mercantil íntegramente municipal. El Alcalde lo remite al Pleno el 10 de octubre. " +
    "Tras su aprobación inicial, se expone al público durante 15 días, y una asociación vecinal legalmente " +
    "constituida presenta una reclamación alegando que el presupuesto omite el crédito necesario para atender " +
    "una obligación exigible al Ayuntamiento en virtud de una sentencia firme. Llega el 31 de diciembre sin que " +
    "el Pleno haya resuelto la reclamación ni aprobado definitivamente el presupuesto.",
  preguntas: [
    q("presupuesto-contenido", "facil",
      "¿A quién corresponde formar el presupuesto de la Entidad Local?",
      ["A su Presidente",
       "Al Pleno de la Corporación, en todo caso",
       "Al Interventor municipal",
       "A la Junta de Gobierno Local, con carácter exclusivo"],
      "Art. 168.1 LHL: el presupuesto de la Entidad Local será formado por su Presidente."),
    q("presupuesto-contenido", "media",
      "¿Qué elementos integra el presupuesto general de la Entidad Local, además del presupuesto de la propia entidad?",
      ["Los presupuestos de los organismos autónomos dependientes de ella y los estados de previsión de gastos e ingresos de las sociedades mercantiles cuyo capital social le pertenezca íntegramente",
       "Únicamente el presupuesto de la propia entidad, sin ningún otro elemento",
       "Los presupuestos de todas las empresas privadas que contraten con el Ayuntamiento",
       "Los presupuestos de otras entidades locales limítrofes"],
      "Art. 164.1 LHL: el presupuesto general integrará el presupuesto de la propia entidad, los de sus organismos autónomos y los estados de previsión de las sociedades mercantiles de capital íntegramente municipal."),
    q("presupuesto-contenido", "media",
      "El Alcalde remite el presupuesto general al Pleno el 10 de octubre. ¿Respeta esto el plazo legal?",
      ["Sí, el presidente debe remitir el presupuesto general al Pleno antes del día 15 de octubre para su aprobación, enmienda o devolución",
       "No, el plazo legal para remitirlo al Pleno vence el 1 de septiembre",
       "Sí, pero solo porque coincide con un año de elecciones municipales",
       "No, no existe ningún plazo legal para esa remisión al Pleno"],
      "Art. 168.4 LHL: el presidente remitirá el presupuesto general al Pleno de la corporación antes del día 15 de octubre para su aprobación, enmienda o devolución."),
    q("presupuesto-contenido", "facil",
      "¿Antes de qué fecha debe quedar definitivamente aprobado el presupuesto general por el Pleno de la Corporación?",
      ["Antes del día 31 de diciembre del año anterior al del ejercicio en que deba aplicarse",
       "Antes del día 31 de enero del propio ejercicio en que deba aplicarse",
       "Antes del día 30 de junio del ejercicio anterior",
       "La Ley no fija ningún plazo máximo para la aprobación definitiva"],
      "Art. 169.2 LHL: la aprobación definitiva del presupuesto general por el Pleno habrá de realizarse antes del día 31 de diciembre del año anterior al del ejercicio en que deba aplicarse."),
    q("presupuesto-contenido", "media",
      "La asociación vecinal legalmente constituida, ¿tiene legitimación para presentar una reclamación contra el presupuesto aprobado inicialmente?",
      ["Sí, tienen la consideración de interesados, entre otros, las asociaciones legalmente constituidas para velar por intereses profesionales, económicos o vecinales, cuando actúen en defensa de los que les son propios",
       "No, solo los habitantes del municipio a título individual pueden reclamar contra el presupuesto",
       "No, las asociaciones nunca tienen legitimación para intervenir en materia presupuestaria",
       "Sí, pero únicamente si están inscritas en un registro estatal específico de asociaciones de utilidad pública"],
      "Art. 170.1.c) LHL: tendrán la consideración de interesados los colegios oficiales, cámaras, sindicatos, asociaciones y demás entidades legalmente constituidas para velar por intereses profesionales, económicos o vecinales, cuando actúen en defensa de los que les son propios."),
    q("presupuesto-contenido", "dificil",
      "La reclamación alega que el presupuesto omite el crédito necesario para atender una obligación exigible al Ayuntamiento en virtud de sentencia firme. ¿Es esta una causa admitida legalmente para reclamar contra el presupuesto?",
      ["Sí, por omitir el crédito necesario para el cumplimiento de obligaciones exigibles a la entidad local, en virtud de precepto legal o de cualquier otro título legítimo",
       "No, la única causa admitida es la manifiesta insuficiencia de los ingresos respecto a los gastos presupuestados",
       "No, las reclamaciones contra el presupuesto solo pueden fundarse en defectos de tramitación, nunca en su contenido",
       "Sí, pero únicamente si la sentencia firme procede de un tribunal internacional"],
      "Art. 170.2.b) LHL: únicamente podrán entablarse reclamaciones contra el presupuesto por omitir el crédito necesario para el cumplimiento de obligaciones exigibles a la entidad local, en virtud de precepto legal o de cualquier otro título legítimo."),
    q("presupuesto-contenido", "media",
      "Si durante el plazo de exposición pública no se hubiese presentado ninguna reclamación, ¿qué ocurre con el presupuesto aprobado inicialmente?",
      ["Se considerará definitivamente aprobado",
       "Deberá someterse de nuevo a votación expresa del Pleno, en todo caso",
       "Quedará automáticamente prorrogado el presupuesto del ejercicio anterior",
       "Deberá remitirse en todo caso al Tribunal de Cuentas antes de su aprobación definitiva"],
      "Art. 169.1 LHL: el presupuesto se considerará definitivamente aprobado si durante el plazo de exposición pública no se hubiesen presentado reclamaciones."),
    q("presupuesto-contenido", "dificil",
      "Si se hubiese presentado la reclamación de la asociación vecinal, ¿de qué plazo dispone el Pleno para resolverla?",
      ["De un plazo de un mes",
       "De un plazo de quince días, igual que el de exposición pública",
       "De un plazo de seis meses",
       "La Ley no fija ningún plazo para resolver las reclamaciones presentadas"],
      "Art. 169.1 LHL (in fine): en caso de reclamaciones, el Pleno dispondrá de un plazo de un mes para resolverlas."),
    q("presupuesto-contenido", "media",
      "Si llega el 31 de diciembre sin que el nuevo presupuesto haya entrado en vigor, ¿qué ocurre con la actividad económica del Ayuntamiento a partir del 1 de enero?",
      ["Se considerará automáticamente prorrogado el presupuesto del ejercicio anterior, con sus créditos iniciales, sin perjuicio de las modificaciones que procedan",
       "El Ayuntamiento queda paralizado y no puede realizar ningún gasto hasta la aprobación del nuevo presupuesto",
       "Se aplica directamente el presupuesto del Estado a la entidad local, con carácter supletorio",
       "El Alcalde puede aprobar un presupuesto provisional por decreto, sin intervención del Pleno"],
      "Art. 169.6 LHL: si al iniciarse el ejercicio no hubiese entrado en vigor el presupuesto correspondiente, se considerará automáticamente prorrogado el del anterior, con sus créditos iniciales."),
    q("presupuesto-contenido", "facil",
      "Si finalmente se aprueba definitivamente el presupuesto y la asociación vecinal sigue disconforme, ¿qué vía le queda tras la reclamación administrativa?",
      ["Interponer directamente recurso contencioso-administrativo contra la aprobación definitiva del presupuesto",
       "Ninguna: la resolución de la reclamación administrativa agota definitivamente cualquier vía de impugnación",
       "Un recurso de alzada ante la Comunidad Autónoma correspondiente",
       "Un recurso extraordinario de revisión ante el propio Ayuntamiento"],
      "Art. 171.1 LHL: contra la aprobación definitiva del presupuesto podrá interponerse directamente recurso contencioso-administrativo."),
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// CASO 2 — El déficit imprevisto en Deportes
// ═══════════════════════════════════════════════════════════════════════
const CASO_2 = {
  slug: "caso-deficit-deportes-creditos-extraordinarios-liquidacion",
  titulo: "El déficit imprevisto en Deportes: créditos extraordinarios, ejecución y liquidación",
  orden: 2,
  supuesto:
    "A mitad de ejercicio, el Servicio de Deportes del Ayuntamiento de Zaragoza necesita realizar un gasto " +
    "urgente e inaplazable —la reparación de una piscina municipal— para el que no existe crédito consignado en " +
    "el presupuesto vigente. El Alcalde ordena incoar el expediente correspondiente, que se financiará con " +
    "cargo al remanente líquido de tesorería. Antes de expedir la orden de pago, el funcionario responsable de " +
    "reconocer la obligación exige que se acredite documentalmente la realización de la prestación. Al cierre " +
    "del ejercicio, la liquidación del presupuesto arroja un remanente de tesorería negativo. Por otro lado, " +
    "dentro de las asignaciones que la Comunidad Autónoma de Aragón transfiere trimestralmente al Ayuntamiento " +
    "en aplicación del régimen especial de financiación de la capitalidad, el Gobierno de Aragón se plantea " +
    "compensar de oficio una deuda vencida y líquida que el Ayuntamiento mantiene con la Comunidad Autónoma.",
  preguntas: [
    q("presupuesto-creditos", "facil",
      "Al no existir crédito consignado en el presupuesto vigente para ese gasto urgente e inaplazable, ¿qué expediente debe incoar el Alcalde?",
      ["Un expediente de concesión de crédito extraordinario, pues no existe en el presupuesto crédito para esa finalidad",
       "Un expediente de transferencia de crédito entre partidas del mismo capítulo, exclusivamente",
       "Un expediente de ampliación automática de crédito, sin necesidad de aprobación del Pleno",
       "No es posible realizar ningún gasto que no estuviera previsto inicialmente en el presupuesto"],
      "Art. 177.1 LHL: cuando haya de realizarse un gasto que no pueda demorarse y no exista crédito en el presupuesto, el presidente ordenará la incoación del expediente de crédito extraordinario."),
    q("presupuesto-creditos", "media",
      "Ese expediente de crédito extraordinario, ¿a qué órgano debe someterse para su aprobación, y con qué trámites?",
      ["Al Pleno de la Corporación, con sujeción a los mismos trámites y requisitos que los presupuestos, incluidas las normas sobre información, reclamación y publicidad",
       "A la Junta de Gobierno Local, sin necesidad de intervención del Pleno",
       "Al propio Alcalde, que puede aprobarlo directamente por decreto",
       "Al Interventor, cuyo informe favorable basta para su aprobación definitiva"],
      "Art. 177.2 LHL: el expediente, previamente informado por la Intervención, se someterá a la aprobación del Pleno, con los mismos trámites y requisitos que los presupuestos."),
    q("presupuesto-creditos", "media",
      "¿Con qué recursos puede financiarse ese crédito extraordinario para la reparación de la piscina?",
      ["Con cargo al remanente líquido de tesorería, con nuevos o mayores ingresos sobre los previstos, o mediante anulaciones o bajas de créditos de otras partidas no comprometidas cuya dotación se estime reducible",
       "Únicamente mediante un nuevo impuesto municipal aprobado a tal efecto",
       "Exclusivamente mediante una operación de crédito a largo plazo, sin otra alternativa posible",
       "Con cargo a los remanentes de tesorería de otro municipio limítrofe, mediante convenio"],
      "Art. 177.4 LHL: el aumento se financiará con cargo al remanente líquido de tesorería, con nuevos o mayores ingresos recaudados, o mediante anulaciones o bajas de créditos de otras partidas no comprometidas."),
    q("presupuesto-ejecucion", "facil",
      "¿En qué fase del procedimiento de gestión del gasto se encuentra el reconocimiento y liquidación de la obligación de pagar la reparación, una vez realizada la prestación?",
      ["En la fase de reconocimiento o liquidación de la obligación, tercera de las cuatro fases del procedimiento de gestión de los gastos",
       "En la fase de autorización de gasto, primera de las cuatro fases",
       "En la fase de disposición o compromiso de gasto, segunda de las cuatro fases",
       "En la fase de ordenación de pago, cuarta y última de las fases"],
      "Art. 184.1 LHL: la gestión del presupuesto de gastos se realiza en las fases de autorización, disposición o compromiso, reconocimiento o liquidación de la obligación, y ordenación de pago."),
    q("presupuesto-ejecucion", "media",
      "¿A quién corresponde, con carácter general, el reconocimiento y liquidación de las obligaciones derivadas de compromisos de gastos legalmente adquiridos, como el de esta reparación?",
      ["Al presidente de la Corporación",
       "Al Pleno de la Corporación, en todo caso",
       "Al Interventor municipal, con carácter exclusivo",
       "A la empresa contratista que ejecuta la reparación"],
      "Art. 185.2 LHL: corresponderá al presidente de la corporación el reconocimiento y liquidación de las obligaciones derivadas de compromisos de gastos legalmente adquiridos."),
    q("presupuesto-ejecucion", "media",
      "Antes de expedir la orden de pago, se exige acreditar documentalmente la realización de la prestación. ¿Es esto un requisito legal previo a la expedición de las órdenes de pago?",
      ["Sí, previamente a la expedición de las órdenes de pago habrá de acreditarse documentalmente ante el órgano que haya de reconocer las obligaciones la realización de la prestación o el derecho del acreedor",
       "No, la acreditación documental solo es necesaria en los pagos a justificar",
       "Sí, pero únicamente en los contratos de obras, nunca en los de suministro o servicios",
       "No, ese requisito fue suprimido por la Ley reguladora de las Haciendas Locales"],
      "Art. 189.1 LHL: previamente a la expedición de las órdenes de pago habrá de acreditarse documentalmente la realización de la prestación o el derecho del acreedor."),
    q("presupuesto-ejecucion", "dificil",
      "Si el funcionario ordenador del gasto autoriza un pago sin que exista crédito suficiente, sin advertir por escrito su improcedencia, ¿qué responsabilidad puede llegar a exigírsele?",
      ["Será personalmente responsable de todo gasto que autorice y de toda obligación que reconozca, liquide o pague sin crédito suficiente",
       "Ninguna responsabilidad, pues esta recae siempre exclusivamente en el Interventor",
       "Solo responsabilidad penal, nunca de tipo patrimonial o disciplinario",
       "Ninguna, salvo que el Pleno lo acuerde expresamente para cada caso concreto"],
      "Art. 188 LHL: los ordenadores de gastos y de pagos, y los interventores, cuando no adviertan por escrito su improcedencia, serán personalmente responsables de todo gasto u obligación que autoricen, reconozcan, liquiden o paguen sin crédito suficiente."),
    q("presupuesto-ejecucion", "facil",
      "Al cierre del ejercicio, la liquidación del presupuesto arroja un remanente de tesorería negativo. ¿Antes de qué fecha deben las entidades locales confeccionar la liquidación de su presupuesto?",
      ["Antes del día 1 de marzo del ejercicio siguiente",
       "Antes del día 31 de diciembre del propio ejercicio que se liquida",
       "Antes del día 30 de junio del ejercicio siguiente",
       "La Ley no fija ningún plazo para confeccionar la liquidación"],
      "Art. 191.3 LHL: las entidades locales deberán confeccionar la liquidación de su presupuesto antes del día primero de marzo del ejercicio siguiente."),
    q("presupuesto-ejecucion", "media",
      "Ante ese remanente de tesorería negativo, ¿qué debe hacer el Pleno de la Corporación en la primera sesión que celebre?",
      ["Proceder a la reducción de gastos del nuevo presupuesto por cuantía igual al déficit producido",
       "Disolver automáticamente el organismo autónomo de Deportes responsable del gasto",
       "Elevar de oficio todos los tipos impositivos municipales al máximo legal permitido",
       "Solicitar la intervención directa del Tribunal de Cuentas en la gestión del presupuesto municipal"],
      "Art. 193.1 LHL: en caso de liquidación con remanente de tesorería negativo, el Pleno deberá proceder, en la primera sesión que celebre, a la reducción de gastos del nuevo presupuesto por cuantía igual al déficit producido."),
    q("capitalidad-zaragoza", "dificil",
      "Sobre la compensación de oficio que el Gobierno de Aragón se plantea aplicar a una deuda vencida y líquida del Ayuntamiento, dentro de las asignaciones trimestrales de la capitalidad, ¿lo permite la Ley 10/2017?",
      ["Sí, el Gobierno de Aragón podrá compensar de oficio estos créditos, previa audiencia al Ayuntamiento de Zaragoza, con otras cantidades que este le adeude, siempre que se trate de deudas vencidas, líquidas y exigibles",
       "No, las asignaciones de la capitalidad tienen carácter absolutamente inembargable y no compensable bajo ninguna circunstancia",
       "Sí, pero sin necesidad de dar audiencia previa al Ayuntamiento de Zaragoza",
       "No, cualquier compensación de este tipo exige una ley específica aprobada por las Cortes de Aragón caso por caso"],
      "Art. 59.2 Ley 10/2017: el Gobierno de Aragón podrá compensar de oficio estos créditos, previa audiencia al Ayuntamiento de Zaragoza, con otras cantidades que este le adeude, siempre que se trate de deudas vencidas, líquidas y exigibles."),
  ],
};

for (const caso of [CASO_1, CASO_2]) {
  await crearCaso(caso);
}
console.log("✔ Casos prácticos del tema 13 (Haciendas Locales: El presupuesto municipal) sembrados.");
