/**
 * Casos prácticos — Tema 2 (Igualdad de género y Violencia de Género:
 * LOIEMH + Ley 4/2007 de Aragón + II Plan de Igualdad del Ayuntamiento
 * de Zaragoza). 3 casos de 10 preguntas cada uno, uno por instrumento
 * normativo, cierra la cobertura de casos prácticos de los 20 temas:
 *   1. El caso de Marisa en la empresa: discriminación, acoso sexual y
 *      tutela judicial efectiva (LOIEMH, arts. 1-13)
 *   2. Los recursos de protección de Aragón: formas y situaciones de
 *      violencia contra las mujeres, y centros de protección y apoyo
 *      (Ley 4/2007, arts. 1-4, 18-22)
 *   3. La denuncia de acoso en el Ayuntamiento: el Protocolo del II Plan
 *      de Igualdad de Zaragoza (Asesoría Confidencial, Comité de
 *      Asesoramiento)
 *
 * Reutiliza las secciones ya usadas por las preguntas sueltas del tema
 * (loiemh-titulo-preliminar, loiemh-titulo-1, ley4-cap-1-disposiciones-
 * generales, ley4-cap-4-proteccion-apoyo-victimas, plan-igualdad-
 * zaragoza). Misma mecánica que los casos anteriores: preguntas/opciones
 * en las tablas ya existentes, enlazadas vía caso_preguntas con su
 * `orden`. La primera opción de cada pregunta es siempre la correcta (el
 * cliente baraja el orden al mostrarlas).
 *
 * Uso: node --env-file=.env.local scripts/seed-casos-practicos-tema-2.mjs
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

// ═══════════════════════════════════════════════════════════════════════
// CASO 1 — El caso de Marisa en la empresa
// ═══════════════════════════════════════════════════════════════════════
const CASO_1 = {
  slug: "caso-marisa-empresa-discriminacion-acoso-tutela",
  titulo: "El caso de Marisa en la empresa: discriminación, acoso y tutela judicial",
  orden: 1,
  supuesto:
    "Marisa trabaja en una empresa privada. Su superior le dirige reiteradamente comentarios de naturaleza " +
    "sexual que le generan un ambiente incómodo y degradante en su puesto de trabajo. Cuando Marisa presenta " +
    "una queja formal, es apartada de un proyecto importante como represalia. Además, la empresa aplica un " +
    "criterio «neutro» de disponibilidad horaria total para las promociones internas que, en la práctica, " +
    "perjudica desproporcionadamente a las mujeres con cargas familiares. Marisa decide finalmente acudir a los " +
    "tribunales para reclamar la tutela de su derecho a la igualdad.",
  preguntas: [
    q("loiemh-titulo-preliminar", "facil",
      "La Ley Orgánica para la Igualdad Efectiva de Mujeres y Hombres, ¿qué objeto tiene?",
      ["Hacer efectivo el derecho de igualdad de trato y de oportunidades entre mujeres y hombres, en particular mediante la eliminación de la discriminación de la mujer en cualesquiera de los ámbitos de la vida",
       "Regular exclusivamente las condiciones de trabajo en el ámbito de la función pública",
       "Sancionar penalmente las conductas de discriminación por razón de sexo, con exclusión de cualquier otra vía",
       "Establecer cuotas obligatorias de representación en todos los ámbitos, sin otro contenido adicional"],
      "Art. 1.1 LOIEMH: la Ley tiene por objeto hacer efectivo el derecho de igualdad de trato y de oportunidades entre mujeres y hombres, mediante la eliminación de la discriminación de la mujer."),
    q("loiemh-titulo-preliminar", "media",
      "¿A quién resultan de aplicación las obligaciones establecidas en la Ley Orgánica?",
      ["A toda persona, física o jurídica, que se encuentre o actúe en territorio español, cualquiera que fuese su nacionalidad, domicilio o residencia",
       "Únicamente a las Administraciones Públicas españolas",
       "Solo a las empresas de más de 250 personas trabajadoras",
       "Exclusivamente a las personas de nacionalidad española"],
      "Art. 2.2 LOIEMH: las obligaciones establecidas en la Ley serán de aplicación a toda persona, física o jurídica, que se encuentre o actúe en territorio español."),
    q("loiemh-titulo-1", "facil",
      "Los comentarios de naturaleza sexual reiterados que crean un entorno degradante para Marisa, ¿qué figura constituyen conforme a la Ley?",
      ["Acoso sexual, entendido como cualquier comportamiento verbal o físico de naturaleza sexual que tenga el propósito o produzca el efecto de atentar contra la dignidad de una persona, creando un entorno intimidatorio, degradante u ofensivo",
       "Una simple discriminación indirecta, sin mayor entidad",
       "Una diferencia de trato justificada por un requisito profesional esencial",
       "Una acción positiva admitida por la Ley en favor de la igualdad"],
      "Art. 7.1 LOIEMH: constituye acoso sexual cualquier comportamiento, verbal o físico, de naturaleza sexual que tenga el propósito o produzca el efecto de atentar contra la dignidad de una persona."),
    q("loiemh-titulo-1", "media",
      "¿Se considera en todo caso discriminatorio el acoso sexual sufrido por Marisa?",
      ["Sí, se considerarán en todo caso discriminatorios el acoso sexual y el acoso por razón de sexo",
       "No, el acoso sexual es una figura autónoma sin relación con la discriminación por razón de sexo",
       "Solo se considera discriminatorio si el acosador ostenta un cargo jerárquico superior a la víctima",
       "No, la discriminación y el acoso sexual son categorías legales mutuamente excluyentes"],
      "Art. 7.3 LOIEMH: se considerarán en todo caso discriminatorios el acoso sexual y el acoso por razón de sexo."),
    q("loiemh-titulo-1", "dificil",
      "Cuando Marisa es apartada de un proyecto importante como represalia por presentar su queja, ¿cómo califica la Ley esa actuación de la empresa?",
      ["También se considerará discriminación por razón de sexo cualquier trato adverso o efecto negativo que se produzca como consecuencia de la presentación de una queja, reclamación, denuncia o demanda destinada a exigir el cumplimiento del principio de igualdad de trato",
       "Es una decisión empresarial legítima dentro de su poder de organización, sin ninguna relevancia jurídica bajo esta Ley",
       "Solo constituiría discriminación si la represalia consistiera en un despido, nunca en otra medida distinta",
       "Esta conducta únicamente podría sancionarse por la vía penal, nunca conforme a la LOIEMH"],
      "Art. 9 LOIEMH: se considerará discriminación por razón de sexo cualquier trato adverso o efecto negativo derivado de la presentación de una queja, reclamación, denuncia o demanda destinada a exigir el cumplimiento del principio de igualdad de trato."),
    q("loiemh-titulo-1", "media",
      "El criterio «neutro» de disponibilidad horaria total que la empresa aplica para las promociones, y que perjudica desproporcionadamente a las mujeres con cargas familiares, ¿qué figura podría constituir?",
      ["Discriminación indirecta por razón de sexo, pues una disposición, criterio o práctica aparentemente neutros pone a personas de un sexo en desventaja particular respecto a las del otro, salvo justificación objetiva, legítima, necesaria y adecuada",
       "Discriminación directa, pues cualquier criterio que afecte de forma distinta a hombres y mujeres es directo por definición",
       "Una acción positiva legítima en favor de la conciliación",
       "No constituye ninguna forma de discriminación, al tratarse de un criterio formalmente neutro"],
      "Art. 6.2 LOIEMH: se considera discriminación indirecta la situación en que una disposición, criterio o práctica aparentemente neutros pone a personas de un sexo en desventaja particular, salvo justificación objetiva."),
    q("loiemh-titulo-1", "facil",
      "Si finalmente se determinase que ese criterio de disponibilidad horaria es discriminatorio, ¿qué consecuencia tendría la cláusula correspondiente del negocio jurídico?",
      ["Se consideraría nula y sin efecto, dando lugar a responsabilidad a través de un sistema de reparaciones o indemnizaciones reales, efectivas y proporcionadas",
       "Sería simplemente anulable a instancia exclusiva de la empresa",
       "Mantendría su validez mientras no se declare inconstitucional por el Tribunal Constitucional",
       "Solo perdería su eficacia respecto a Marisa, conservando plena validez para el resto de la plantilla"],
      "Art. 10 LOIEMH: los actos y cláusulas que constituyan o causen discriminación por razón de sexo se considerarán nulos y sin efecto, dando lugar a un sistema de reparaciones o indemnizaciones."),
    q("loiemh-titulo-1", "media",
      "Cuando Marisa acude a los tribunales para reclamar la tutela de su derecho a la igualdad, ¿puede hacerlo incluso después de haber finalizado su relación laboral con la empresa?",
      ["Sí, cualquier persona podrá recabar de los tribunales la tutela del derecho a la igualdad, incluso tras la terminación de la relación en la que supuestamente se ha producido la discriminación",
       "No, la acción de tutela solo puede ejercitarse mientras subsista la relación laboral",
       "Sí, pero únicamente dentro de las 48 horas siguientes a la finalización del contrato",
       "No, una vez extinguida la relación laboral solo cabe la vía penal"],
      "Art. 12.1 LOIEMH: cualquier persona podrá recabar de los tribunales la tutela del derecho a la igualdad, incluso tras la terminación de la relación en la que se ha producido la discriminación."),
    q("loiemh-titulo-1", "dificil",
      "En el proceso judicial derivado de la denuncia de acoso sexual de Marisa, ¿quién estará legitimada para ser parte en el litigio?",
      ["La persona acosada será la única legitimada en los litigios sobre acoso sexual y acoso por razón de sexo",
       "Cualquier compañero de trabajo que hubiera presenciado los hechos, indistintamente de la voluntad de Marisa",
       "Únicamente el sindicato al que esté afiliada Marisa, con exclusión de esta",
       "La empresa, como responsable de garantizar un entorno laboral libre de acoso"],
      "Art. 12.3 LOIEMH: la persona acosada será la única legitimada en los litigios sobre acoso sexual y acoso por razón de sexo."),
    q("loiemh-titulo-1", "media",
      "Si Marisa fundamenta sus alegaciones en actuaciones discriminatorias por razón de sexo, ¿a quién corresponde probar la ausencia de discriminación en el procedimiento?",
      ["A la persona demandada, que deberá probar la ausencia de discriminación en las medidas adoptadas y su proporcionalidad",
       "Exclusivamente a Marisa, como parte demandante, sin ninguna excepción a la regla general de la carga de la prueba",
       "Al Ministerio Fiscal, con independencia de la voluntad de las partes",
       "A ambas partes por igual, sin ninguna regla especial de distribución de la carga probatoria"],
      "Art. 13.1 LOIEMH: en los procedimientos en que las alegaciones se fundamenten en actuaciones discriminatorias por razón de sexo, corresponderá a la persona demandada probar la ausencia de discriminación."),
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// CASO 2 — Los recursos de protección de Aragón
// ═══════════════════════════════════════════════════════════════════════
const CASO_2 = {
  slug: "caso-recursos-proteccion-aragon-formas-situaciones-violencia",
  titulo: "Los recursos de protección de Aragón: formas de violencia y centros de protección",
  orden: 2,
  supuesto:
    "Una mujer residente en Aragón sufre malos tratos psicológicos continuados por parte de su pareja, " +
    "incluyendo humillaciones, control económico y aislamiento social, aunque nunca ha recibido agresiones " +
    "físicas. Tras decidir abandonar el domicilio familiar con sus dos hijos menores, sin medios propios, acude " +
    "a los servicios sociales, que valoran derivarla a un centro de protección. En otro caso, una compañera de " +
    "trabajo de la misma empresa sufre acoso sexual por parte de un superior jerárquico, quien condiciona una " +
    "mejora salarial a la aceptación de sus insinuaciones.",
  preguntas: [
    q("ley4-cap-1-disposiciones-generales", "facil",
      "Los malos tratos psicológicos que sufre la mujer, sin agresión física, ¿están comprendidos entre las formas de violencia contra las mujeres reguladas por la Ley aragonesa?",
      ["Sí, los malos tratos psicológicos, que incluyen conductas intencionales que producen falta de autoestima o sufrimiento a través de amenazas, humillaciones, control o aislamiento, son una forma de violencia contra las mujeres",
       "No, la Ley aragonesa solo contempla la violencia física, no la psicológica",
       "Sí, pero únicamente si además concurre violencia física simultánea",
       "No, los malos tratos psicológicos solo se regulan en el ámbito penal, no en esta Ley autonómica"],
      "Art. 2.b) Ley 4/2007: los malos tratos psicológicos incluyen toda conducta intencional que produce falta de autoestima o sufrimiento a través de amenazas, humillaciones, coerción, aislamiento u otros medios semejantes."),
    q("ley4-cap-1-disposiciones-generales", "media",
      "El maltrato económico mediante el control de los recursos, ¿se considera también una forma de violencia contra las mujeres conforme a la Ley?",
      ["Sí, el maltrato económico consiste en la privación intencionada y no justificada de recursos para el bienestar físico o psicológico de la víctima y sus hijas e hijos, así como la discriminación en la disposición de los recursos compartidos",
       "No, el control económico queda fuera del ámbito de esta Ley, al no producir daño físico directo",
       "Sí, pero únicamente si se acredita mediante sentencia penal firme previa",
       "No, esta forma de violencia solo se contempla en la legislación estatal, no en la aragonesa"],
      "Art. 2.i) Ley 4/2007: el maltrato económico consiste en la privación intencionada y no justificada legalmente de recursos para el bienestar de la víctima y sus hijos, y la discriminación en la disposición de recursos compartidos."),
    q("ley4-cap-1-disposiciones-generales", "facil",
      "La situación de violencia que la mujer sufre por parte de su pareja, ¿cómo se clasifica conforme a la Ley aragonesa, en función del vínculo con el agresor?",
      ["Como situación de violencia doméstica, al tratarse de violencia ejercida por quien sostiene o ha sostenido un vínculo afectivo o de pareja con la víctima",
       "Como situación de violencia social, por defecto, al no existir convivencia legalmente formalizada",
       "Como situación de violencia laboral, dado que ambos comparten el mismo domicilio familiar",
       "La Ley aragonesa no distingue ninguna clasificación según el vínculo con el agresor"],
      "Art. 3.a) Ley 4/2007: son situaciones de violencia doméstica las que se operan por quienes sostienen o han sostenido un vínculo afectivo, conyugal o de pareja con la víctima."),
    q("ley4-cap-1-disposiciones-generales", "media",
      "La compañera de trabajo que sufre acoso sexual por parte de su superior jerárquico, condicionando una mejora salarial a la aceptación de sus insinuaciones, ¿en qué situación de violencia se encuentra conforme a la clasificación de la Ley?",
      ["En una situación de violencia laboral, pues se opera por quien sostiene con la víctima un vínculo laboral, prevaliéndose de una posición de dependencia o debilidad de esta",
       "En una situación de violencia doméstica, por tratarse de una relación de convivencia diaria en el entorno laboral",
       "En una situación de violencia social, al no existir ningún vínculo entre agresor y víctima",
       "Esta situación queda fuera del ámbito de aplicación de la Ley, al no producirse en el domicilio familiar"],
      "Art. 3.b) Ley 4/2007: son situaciones de violencia laboral las que se operan por quienes sostienen con la víctima un vínculo laboral, prevaliéndose de una posición de dependencia o debilidad de esta."),
    q("ley4-cap-1-disposiciones-generales", "dificil",
      "El acoso sexual que sufre la compañera de trabajo, ¿está expresamente comprendido entre las formas de violencia reguladas por la Ley aragonesa?",
      ["Sí, el acoso sexual, entendido como cualquier comportamiento verbal, no verbal o físico no deseado de índole sexual que atente contra la dignidad de la persona, creando un entorno intimidatorio, hostil o degradante, es una forma expresa de violencia contra las mujeres",
       "No, el acoso sexual solo se regula por la legislación laboral y penal, quedando fuera del ámbito de esta Ley autonómica",
       "Sí, pero únicamente si se produce fuera del ámbito estrictamente laboral",
       "No, la Ley aragonesa excluye expresamente el acoso sexual de su ámbito de aplicación"],
      "Art. 2.e) Ley 4/2007: el acoso sexual, entendido como cualquier comportamiento no deseado de índole sexual que atente contra la dignidad de la persona, es una forma expresa de violencia contra las mujeres."),
    q("ley4-cap-4-proteccion-apoyo-victimas", "facil",
      "La mujer que abandona el domicilio familiar con sus hijos y carece de medios propios, ¿a qué recurso de protección podría ser derivada, destinado a acoger por un período de tiempo determinado a mujeres solas o acompañadas de menores a su cargo?",
      ["A una casa de acogida",
       "A un punto de encuentro",
       "A un piso tutelado, exclusivamente y sin posibilidad de otro recurso previo",
       "A un centro de emergencia únicamente, sin posibilidad de otros recursos posteriores"],
      "Art. 19.1 Ley 4/2007: las casas de acogida se configuran como un servicio destinado a acoger, por un período de tiempo determinado, a mujeres solas o acompañadas de menores a su cargo víctimas de violencia doméstica."),
    q("ley4-cap-4-proteccion-apoyo-victimas", "media",
      "¿Cuántas casas de acogida, como mínimo, deben establecerse conforme a la Ley en la Comunidad Autónoma de Aragón?",
      ["Al menos, una casa de acogida en cada provincia",
       "Una única casa de acogida para toda la Comunidad Autónoma",
       "Una casa de acogida en cada municipio de más de 20.000 habitantes",
       "La Ley no exige ningún número mínimo de casas de acogida"],
      "Art. 19.4 Ley 4/2007: se establecerá, al menos, una casa de acogida en cada provincia de la Comunidad Autónoma de Aragón."),
    q("ley4-cap-4-proteccion-apoyo-victimas", "facil",
      "Si la situación de la mujer fuera de riesgo inminente y necesitara asistencia permanente e inmediata, ¿a qué recurso podría acudir en primer lugar?",
      ["A un centro de emergencia, que facilita alojamiento y protección inmediata, orientando y derivando a los recursos sociales, psicológicos y jurídicos adecuados",
       "Directamente a un piso tutelado, destinado a mujeres que ya no requieren tratamiento especializado",
       "A un punto de encuentro, destinado a las visitas de menores en supuestos de ruptura de pareja",
       "A ningún recurso específico, debiendo acudir directamente a la vía judicial"],
      "Art. 18.1 Ley 4/2007: los centros de emergencia son centros de asistencia permanente e inmediata que facilitan alojamiento y protección a mujeres víctimas de violencia o en situación de riesgo inminente."),
    q("ley4-cap-4-proteccion-apoyo-victimas", "dificil",
      "Cuando la mujer avance en su proceso y ya no requiera el tratamiento especializado de la casa de acogida, pero aún necesite apoyo transitorio para su autonomía, ¿a qué recurso podría acceder?",
      ["A un piso tutelado, hogar funcional y temporal que otorga alojamiento transitorio junto con apoyo social, psicológico y jurídico",
       "A un punto de encuentro, pensado para las visitas de menores en procesos de separación",
       "A un centro de emergencia, reservado en exclusiva a situaciones de riesgo inminente",
       "La Ley no prevé ningún recurso intermedio entre la casa de acogida y la plena autonomía"],
      "Art. 20.1 Ley 4/2007: los pisos tutelados son hogares funcionales y temporales para mujeres víctimas de violencia que ya no requieren en su totalidad el tratamiento de la casa de acogida, pero necesitan apoyo transitorio."),
    q("ley4-cap-4-proteccion-apoyo-victimas", "media",
      "Si la mujer tuviera hijos que precisaran visitar a su padre tras la ruptura de la pareja, en un contexto de antecedentes de violencia, ¿qué recurso específico prevé la Ley para esas visitas?",
      ["Los puntos de encuentro, atendidos por personal especializado que emitirá los informes que procedan a la autoridad judicial",
       "Las casas de acogida, que asumen también la función de gestionar el régimen de visitas",
       "Los centros de emergencia, cuya función principal es la de facilitar las visitas familiares",
       "La Ley no prevé ningún recurso específico para este supuesto, remitiendo a la legislación civil general"],
      "Art. 22 Ley 4/2007: los puntos de encuentro son lugares para las visitas de madres y/o padres a sus hijas e hijos con antecedentes de conductas violentas en la pareja, atendidos por personal especializado."),
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// CASO 3 — La denuncia de acoso en el Ayuntamiento
// ═══════════════════════════════════════════════════════════════════════
const CASO_3 = {
  slug: "caso-denuncia-acoso-ayuntamiento-protocolo-plan-igualdad",
  titulo: "La denuncia de acoso en el Ayuntamiento: el Protocolo del Plan de Igualdad",
  orden: 3,
  supuesto:
    "Una funcionaria del Ayuntamiento de Zaragoza sufre comentarios de contenido sexual de un compañero de su " +
    "mismo servicio, que crean un ambiente hostil en su puesto de trabajo. Decide presentar una denuncia ante la " +
    "Asesoría Confidencial, que realiza un primer análisis de los hechos. Al apreciar indicios de acoso, se " +
    "convoca de forma urgente al Comité de Asesoramiento, que debe investigar el caso, dar audiencia a ambas " +
    "partes y, finalmente, emitir un informe de valoración con sus conclusiones.",
  preguntas: [
    q("plan-igualdad-zaragoza", "facil",
      "Los comportamientos de acoso sexual, acoso por razón de sexo y acoso por orientación sexual, ¿cómo pueden llegar a ser calificados conforme al Protocolo del Ayuntamiento de Zaragoza, con independencia de lo establecido en la legislación penal?",
      ["Como falta muy grave, dando lugar a las sanciones que el Protocolo y el Estatuto Básico del Empleado Público prevén para este tipo de conductas",
       "Como falta leve, salvo reiteración de la conducta",
       "El Protocolo no contempla ninguna calificación disciplinaria, remitiendo en exclusiva a la vía penal",
       "Como mera infracción administrativa de tráfico, sin relación con el régimen disciplinario"],
      "Anexo II del II Plan de Igualdad: estas conductas pueden ser consideradas, con independencia de la legislación penal, como falta muy grave, con las sanciones que el Protocolo y el TREBEP prevén."),
    q("plan-igualdad-zaragoza", "media",
      "¿A quién resulta de aplicación este Protocolo, además de al personal propiamente municipal?",
      ["Las empresas externas contratadas por el Ayuntamiento, empresas colaboradoras, sociedades y patronatos municipales son informadas de su existencia, aplicándose mecanismos de coordinación empresarial en los casos que impliquen a su personal",
       "Únicamente al personal funcionario de carrera, excluyendo al personal laboral y eventual",
       "Solo a los cargos electos del Ayuntamiento, sin extenderse al resto de la plantilla",
       "El Protocolo no contempla ningún supuesto de coordinación con empresas externas"],
      "Anexo II del II Plan de Igualdad, Alcance: las empresas externas contratadas, colaboradoras, sociedades y patronatos municipales son informadas del Protocolo, aplicándose mecanismos de coordinación empresarial."),
    q("plan-igualdad-zaragoza", "facil",
      "La denuncia de la funcionaria es recibida en primer lugar por la Asesoría Confidencial. ¿Cuál es una de sus funciones conforme al Protocolo?",
      ["Recibir las denuncias por acoso sexual, acoso por razón de sexo y acoso por orientación sexual, e informar a la persona denunciante sobre sus derechos y formas de actuación posibles",
       "Imponer directamente la sanción disciplinaria correspondiente, sin intervención de ningún otro órgano",
       "Sustituir en todas sus funciones al Comité de Asesoramiento, que queda así vacío de contenido",
       "Representar judicialmente a la persona denunciante ante los tribunales laborales"],
      "Anexo II del II Plan de Igualdad: la Asesoría Confidencial recibe las denuncias e informa a la persona denunciante sobre sus derechos y formas de actuación posibles."),
    q("plan-igualdad-zaragoza", "media",
      "¿Cuál es el número máximo de personas que puede integrar la Asesoría Confidencial?",
      ["Un máximo de diez personas",
       "Un máximo de tres personas",
       "No existe ningún límite máximo de integrantes",
       "Un máximo de veinte personas"],
      "Anexo II del II Plan de Igualdad: la Asesoría Confidencial estará compuesta por un máximo de diez personas."),
    q("plan-igualdad-zaragoza", "dificil",
      "Si del análisis inicial de la Asesoría Confidencial se obtuvieran indicios de acoso, ¿qué debe hacer a continuación?",
      ["Solicitar la constitución de forma urgente del Comité de Asesoramiento",
       "Archivar directamente la denuncia sin más trámite, al no ser competente para valorar indicios",
       "Remitir el expediente directamente a la jurisdicción penal, sin posibilidad de procedimiento interno",
       "Esperar un plazo mínimo de seis meses antes de dar cualquier traslado del caso"],
      "Anexo II del II Plan de Igualdad: si del análisis inicial se obtuviesen indicios de acoso, la Asesoría Confidencial solicitará la constitución urgente del Comité de Asesoramiento."),
    q("plan-igualdad-zaragoza", "media",
      "El Comité de Asesoramiento, órgano colegiado que desarrolla el procedimiento formal, ¿por quiénes está formado, entre otros?",
      ["Por dos técnicos/as del Servicio de Prevención y Salud Laboral, una persona de la Asesoría Confidencial, un abogado/a de la Asesoría Jurídica, un psicólogo/a del Servicio de Igualdad y dos representantes sindicales",
       "Exclusivamente por el Alcalde y los portavoces de los grupos municipales",
       "Únicamente por personal de la Asesoría Jurídica, sin ningún otro perfil profesional",
       "Por el Justicia de Aragón y dos vocales designados por este"],
      "Anexo II del II Plan de Igualdad: el Comité de Asesoramiento está formado por técnicos de Prevención, una persona de la Asesoría Confidencial, un abogado, un psicólogo del Servicio de Igualdad y dos representantes sindicales."),
    q("plan-igualdad-zaragoza", "facil",
      "Entre las funciones del Comité de Asesoramiento, ¿figura dar audiencia tanto a la persona denunciante como a la denunciada?",
      ["Sí, entre sus funciones están dar audiencia a la persona denunciante y notificar por escrito a la persona denunciada la existencia de la denuncia, dándole también audiencia",
       "No, el Comité solo escucha a la persona denunciante, sin dar audiencia a la persona denunciada",
       "No, la audiencia a las partes corresponde en exclusiva a la Asesoría Confidencial, no al Comité",
       "Sí, pero únicamente si ambas partes lo solicitan expresamente por escrito"],
      "Anexo II del II Plan de Igualdad: el Comité da audiencia a la persona denunciante y notifica por escrito a la denunciada, dándole también audiencia."),
    q("plan-igualdad-zaragoza", "media",
      "Si finalmente el informe del Comité de Asesoramiento revela con claridad la existencia de acoso, ¿qué efecto tiene ese informe de valoración?",
      ["Tendrá, a todos los efectos, carácter de iniciación de Expediente Informativo a resolver por el Servicio de Relaciones Laborales u órgano competente, instando la adopción de medidas correctoras y, si fuese necesario, sancionadoras",
       "Carece de cualquier efecto jurídico, siendo un documento meramente orientativo sin consecuencias",
       "Únicamente puede dar lugar a una recomendación no vinculante dirigida a la persona denunciada",
       "Obliga automáticamente al cese inmediato de la persona denunciada, sin ningún trámite adicional"],
      "Anexo II del II Plan de Igualdad: el informe de valoración tendrá carácter de iniciación de Expediente Informativo a resolver por el Servicio de Relaciones Laborales, instando medidas correctoras y sancionadoras."),
    q("plan-igualdad-zaragoza", "dificil",
      "Notificada la resolución del Comité de Asesoramiento a las partes implicadas, ¿de qué plazo disponen para presentar alegaciones?",
      ["Del plazo máximo de cinco días",
       "Del plazo máximo de un mes",
       "No se prevé ningún trámite de alegaciones tras la resolución del Comité",
       "Del plazo máximo de veinticuatro horas"],
      "Anexo II del II Plan de Igualdad: las partes implicadas podrán alegar en el plazo máximo de cinco días desde el traslado de la resolución."),
    q("plan-igualdad-zaragoza", "media",
      "Con carácter general, ¿bajo qué principios debe realizarse la asistencia y protección de las víctimas conforme al Protocolo?",
      ["Sigilo, respeto, profesionalidad, objetividad e imparcialidad y celeridad",
       "Publicidad, oralidad y contradicción, como en cualquier procedimiento judicial",
       "Economía procesal exclusivamente, sin ninguna otra garantía adicional",
       "El Protocolo no establece ningún principio rector para la asistencia a las víctimas"],
      "Anexo II del II Plan de Igualdad: se garantiza que la asistencia y protección de las víctimas se realice siguiendo los principios de sigilo, respeto, profesionalidad, objetividad e imparcialidad y celeridad."),
  ],
};

for (const caso of [CASO_1, CASO_2, CASO_3]) {
  await crearCaso(caso);
}
console.log("✔ Casos prácticos del tema 2 (Igualdad de género y Violencia de Género) sembrados.");
