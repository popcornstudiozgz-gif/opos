/**
 * Casos prácticos — Tema 10 (Los bienes de las entidades locales), tanda
 * de recambio.
 *
 * 2 de los 3 casos de `seed-casos-practicos-tema-10.mjs` quedan ocultos
 * para esta oposición: usan `cap-2-patrimonio` (fuera de
 * `secciones_incluidas` de tema-10) y/o `cap-5-enajenacion`/
 * `titulo-2-desahucio`/`cap-4-disfrute` (también fuera). El recorte real
 * de tema-10 es `cap-1-clasificacion` (RBEL, arts. 1-8), `cap-3-conservacion`
 * (arts. 17-36: inventario y registro) y `cap-3-defensa` (arts. 44-73:
 * potestades de investigación, deslinde y recuperación).
 *
 * Estos 2 casos nuevos se ciñen a esas tres secciones:
 *   1. Clasificación de bienes + inventario (cap-1-clasificacion + cap-3-conservacion)
 *   2. Las potestades de defensa del patrimonio local (cap-3-defensa)
 *
 * Uso: node --env-file=.env.local scripts/seed-casos-practicos-tema-10-recorte.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

const TEMA = "tema-10";
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
// CASO 4 — Clasificación de bienes e inventario
// ═══════════════════════════════════════════════════════════════════════
const CASO_4 = {
  slug: "caso-villaflor-clasificacion-inventario-bienes",
  titulo: "El caso del inventario de bienes de Villaflor",
  orden: 4,
  supuesto:
    "El Ayuntamiento de Villaflor revisa el estado de su patrimonio antes de que se renueve la Corporación tras " +
    "las próximas elecciones municipales. Entre sus bienes figuran: una fuente pública situada en la plaza " +
    "mayor, de libre acceso para todos los vecinos; la Casa Consistorial, donde tiene su sede el Ayuntamiento; " +
    "y una nave industrial en desuso que el Ayuntamiento tiene arrendada a una empresa local, generando " +
    "ingresos para las arcas municipales. El Secretario municipal advierte que hace más de un año no se " +
    "actualiza el inventario de bienes, y se dispone a regularizarlo.",
  preguntas: [
    q("cap-1-clasificacion", "facil",
      "¿En qué dos grandes categorías se clasifican los bienes de las Entidades locales según el art. 2.1 RBEL?",
      ["Bienes de dominio público y bienes patrimoniales",
       "Bienes muebles y bienes inmuebles, exclusivamente",
       "Bienes municipales y bienes provinciales",
       "Bienes urbanos y bienes rústicos"],
      "El art. 2.1 RBEL fija la summa divisio de todo el Título: dominio público (uso o servicio público) frente a patrimoniales (los demás, susceptibles de generar ingresos)."),
    q("cap-1-clasificacion", "media",
      "La fuente pública de la plaza mayor, de libre acceso para todos los vecinos, ¿qué tipo de bien es según el art. 3.1 RBEL?",
      ["Un bien de uso público local, como los caminos, plazas, calles, paseos, parques y aguas de fuentes cuya conservación corresponde a la Entidad local",
       "Un bien patrimonial, al no estar afectado a un servicio público concreto",
       "Un bien comunal, al beneficiar únicamente a los vecinos empadronados",
       "Un bien de servicio público, al estar situado en un edificio municipal"],
      "El art. 3.1 RBEL menciona expresamente las «aguas de fuentes» entre los ejemplos de bienes de uso público local: de aprovechamiento general de todos, no reservado a un colectivo concreto (eso sería un bien comunal) ni afecto a un servicio administrativo (eso sería de servicio público)."),
    q("cap-1-clasificacion", "media",
      "La Casa Consistorial, sede del Ayuntamiento, ¿qué tipo de bien es según el art. 4 RBEL?",
      ["Un bien de servicio público, al estar destinado directamente al cumplimiento de fines públicos de responsabilidad de la Entidad local",
       "Un bien de uso público, al poder entrar cualquier vecino a realizar gestiones",
       "Un bien patrimonial, al generar valor económico para el Ayuntamiento",
       "Un bien comunal, al pertenecer al común de los vecinos de Villaflor"],
      "El art. 4 RBEL cita expresamente las «Casas Consistoriales» como ejemplo paradigmático de bien de servicio público: no es de aprovechamiento libre y general como una plaza, sino un edificio afecto a la función administrativa municipal."),
    q("cap-1-clasificacion", "media",
      "La nave industrial arrendada, que genera ingresos para el Ayuntamiento sin estar afecta a ningún uso ni servicio público, ¿qué tipo de bien es según el art. 6.1 RBEL?",
      ["Un bien patrimonial o de propios, al no estar destinado a uso público ni afectado a un servicio público, y poder constituir fuente de ingresos para el erario municipal",
       "Un bien de dominio público, al estar dentro del término municipal de Villaflor",
       "Un bien comunal, al beneficiar indirectamente a todos los vecinos a través de sus ingresos",
       "No puede clasificarse hasta que se resuelva un expediente judicial previo"],
      "El art. 6.1 RBEL define los bienes patrimoniales precisamente por exclusión (ni uso ni servicio público) y por su aptitud para generar ingresos, que es justo la situación de la nave arrendada."),
    q("cap-1-clasificacion", "dificil",
      "¿Qué características especiales tienen los bienes comunales y demás bienes de dominio público, a diferencia de los patrimoniales, según el art. 5 RBEL?",
      ["Son inalienables, inembargables e imprescriptibles, y no están sujetos a tributo alguno",
       "Pueden venderse libremente por la Corporación local sin ningún expediente previo",
       "Están sujetos a embargo si la Entidad local tiene deudas pendientes con terceros",
       "Prescriben a favor de quien los posea de buena fe durante más de treinta años"],
      "El art. 5 RBEL blinda los bienes demaniales y comunales con tres garantías clásicas del dominio público (inalienabilidad, inembargabilidad, imprescriptibilidad) más la exención tributaria, un régimen mucho más protector que el de los bienes patrimoniales."),
    q("cap-3-conservacion", "facil",
      "¿Qué obligación tienen las Corporaciones locales respecto a sus bienes según el art. 17.1 RBEL, que el Secretario de Villaflor quiere regularizar?",
      ["Formar inventario de todos sus bienes y derechos, cualquiera que sea su naturaleza o forma de adquisición",
       "Formar inventario únicamente de los bienes inmuebles, no de los muebles ni derechos",
       "Formar inventario solo si el bien tiene un valor superior a un umbral económico fijado por ley",
       "El inventario es un trámite voluntario, no una obligación legal"],
      "El art. 17.1 RBEL no distingue por tipo ni valor del bien: la obligación de inventariar alcanza a todos los bienes y derechos de la Corporación, sin excepción."),
    q("cap-3-conservacion", "media",
      "¿Qué epígrafes debe reflejar el inventario, por separado, según el art. 18 RBEL?",
      ["Inmuebles, derechos reales, muebles de carácter histórico o de considerable valor, valores mobiliarios y créditos, vehículos, semovientes, otros muebles, y bienes y derechos revertibles",
       "Únicamente inmuebles y vehículos, como bienes de mayor valor patrimonial",
       "Solo los bienes de dominio público, quedando los patrimoniales fuera del inventario",
       "Un único epígrafe genérico de «bienes municipales», sin desglose por naturaleza"],
      "El art. 18 RBEL exige un desglose detallado por naturaleza del bien (hasta ocho epígrafes distintos), no una simple lista genérica, precisamente para dar una imagen fiel y ordenada del patrimonio municipal."),
    q("cap-3-conservacion", "media",
      "El inventario de Villaflor lleva más de un año sin actualizarse. ¿Con qué periodicidad debe rectificarse según el art. 33.1 RBEL, y qué exige además el art. 33.2 cuando se renueva la Corporación?",
      ["Se rectifica anualmente, reflejando las vicisitudes del período; además, debe comprobarse siempre que se renueve la Corporación, dejando constancia del resultado",
       "Se rectifica solo cada cuatro años, coincidiendo con el mandato de la Corporación",
       "No existe obligación de rectificación periódica, solo de formación inicial",
       "Se rectifica cada seis meses, con independencia de que haya habido cambios en el patrimonio"],
      "El art. 33.1 RBEL fija la rectificación anual como regla general, y el art. 33.2 añade una comprobación adicional obligatoria en cada renovación de la Corporación, oportunidad que el Secretario de Villaflor no puede dejar pasar antes de las próximas elecciones."),
    q("cap-3-conservacion", "facil",
      "¿A quién corresponde aprobar el inventario de bienes de Villaflor, su rectificación y su comprobación, según el art. 34 RBEL?",
      ["Al Pleno de la Corporación local",
       "Al Alcalde, por decreto, sin intervención del Pleno",
       "A la Junta de Gobierno Local, en todo caso",
       "Al Secretario de la Corporación, por sí solo, sin necesidad de acuerdo corporativo"],
      "El art. 34 RBEL reserva al Pleno —el órgano de máxima representación política de la Corporación— la aprobación del inventario, su rectificación y su comprobación, sin que baste una decisión unilateral del Alcalde o del Secretario."),
    q("cap-3-conservacion", "media",
      "Una vez aprobado el inventario, ¿qué obligación registral impone el art. 36.1 RBEL sobre los bienes inmuebles y derechos reales de Villaflor?",
      ["Deben inscribirse en el Registro de la Propiedad, de acuerdo con lo previsto en la legislación hipotecaria",
       "No existe obligación de inscripción registral para los bienes de las Entidades locales",
       "Solo deben inscribirse los bienes de dominio público, quedando los patrimoniales exentos",
       "La inscripción registral es potestativa y queda a criterio discrecional del Pleno"],
      "El art. 36.1 RBEL exige la inscripción registral de inmuebles y derechos reales municipales, reforzando la seguridad jurídica del patrimonio local frente a terceros, con un procedimiento simplificado (certificación del Secretario) que detalla el propio artículo."),
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// CASO 5 — Las potestades de defensa del patrimonio local
// ═══════════════════════════════════════════════════════════════════════
const CASO_5 = {
  slug: "caso-torreznal-investigacion-deslinde-recuperacion-bienes",
  titulo: "El caso de la finca de Torreznal: investigación, deslinde y recuperación",
  orden: 5,
  supuesto:
    "El Ayuntamiento de Torreznal sospecha que una antigua finca, cuya titularidad nunca quedó clara en sus " +
    "archivos, podría pertenecerle. Decide abrir de oficio un expediente para investigarlo. Poco después, un " +
    "vecino presenta una denuncia sobre otra parcela que cree también municipal. Mientras tanto, surge una " +
    "disputa con el propietario colindante de una tercera finca sobre dónde discurre exactamente el lindero " +
    "entre ambas propiedades. Por último, el Ayuntamiento descubre que un particular ha ocupado sin título, " +
    "desde hace pocos meses, un terreno de dominio público situado junto al río, y decide actuar para recobrar " +
    "su posesión.",
  preguntas: [
    q("cap-3-defensa", "facil",
      "¿Qué potestades reconoce el art. 44.1 RBEL a los municipios en relación con sus bienes, más allá de la investigación que abre Torreznal?",
      ["La potestad de investigación, la potestad de deslinde, la potestad de recuperación de oficio y la potestad de desahucio administrativo",
       "Únicamente la potestad de investigación, careciendo de las demás potestades demaniales",
       "La potestad de expropiación forzosa, como única prerrogativa reconocida",
       "Ninguna potestad especial: los municipios deben acudir siempre a los tribunales ordinarios"],
      "El art. 44.1 RBEL enumera un catálogo cerrado de cuatro potestades exorbitantes que permiten a la Entidad local defender su patrimonio sin necesidad de acudir previamente a los tribunales: investigación, deslinde, recuperación de oficio y desahucio administrativo."),
    q("cap-3-defensa", "facil",
      "¿En qué consiste la facultad de investigar que ejerce Torreznal sobre la finca de titularidad dudosa, según el art. 45 RBEL?",
      ["Investigar la situación de los bienes y derechos que se presuman de su propiedad, siempre que esta no conste, a fin de determinar su titularidad",
       "Investigar cualquier bien del municipio, conste o no su titularidad, con carácter general",
       "Solicitar directamente al Registro de la Propiedad la inscripción a su favor, sin expediente previo",
       "Expropiar de inmediato cualquier finca de titularidad dudosa"],
      "El art. 45 RBEL circunscribe la investigación a los bienes cuya propiedad se presume municipal pero no consta con certeza, precisamente el supuesto de la finca de Torreznal, y su finalidad es aclarar la titularidad, no expropiar."),
    q("cap-3-defensa", "media",
      "Además de la iniciativa de oficio de Torreznal, ¿de qué otra forma puede acordarse el ejercicio de la acción investigadora según el art. 46 RBEL, como ocurre con la denuncia del vecino?",
      ["Por denuncia de los particulares",
       "Únicamente de oficio; los particulares no pueden promoverla en ningún caso",
       "Solo a instancia del Registro de la Propiedad",
       "Solo si lo ordena expresamente la Comunidad Autónoma"],
      "El art. 46 RBEL prevé dos vías: de oficio (por la propia Corporación, incluso a iniciativa de otra Administración) o por denuncia de particulares, como la que presenta el vecino de Torreznal sobre la otra parcela."),
    q("cap-3-defensa", "media",
      "Si la investigación sobre la denuncia del vecino concluye con la recuperación e incorporación del bien al patrimonio municipal, ¿qué premio prevé el art. 54.1 RBEL para quien promovió la acción investigadora?",
      ["El 10 por 100 del valor líquido que la Corporación obtenga de la enajenación de los bienes investigados",
       "El 50 por 100 del valor de tasación de la finca, como incentivo reforzado",
       "Ningún premio: la denuncia es un deber cívico sin contraprestación económica",
       "Un premio fijo de cuantía idéntica en todos los casos, con independencia del valor del bien"],
      "El art. 54.1 RBEL fija un incentivo proporcional (10% del valor líquido obtenido en la enajenación) para quien promueve la acción investigadora, sustituido por el 10% del valor de tasación si la finca no llega a venderse (art. 54.2)."),
    q("cap-3-defensa", "facil",
      "¿En qué consiste la potestad de deslinde que Torreznal ejerce frente al propietario colindante, según el art. 56.1 RBEL?",
      ["La facultad de promover y ejecutar el deslinde entre los bienes de su pertenencia y los de los particulares, cuyos límites aparecieren imprecisos o sobre los que existieren indicios de usurpación",
       "La facultad de expropiar directamente la finca colindante, sin necesidad de expediente de deslinde",
       "La facultad exclusiva de los propietarios particulares, sin intervención municipal alguna",
       "Una potestad que solo puede ejercerse mediante sentencia judicial previa"],
      "El art. 56.1 RBEL habilita a la Corporación a promover y ejecutar por sí misma el deslinde ante límites imprecisos, sin necesidad de acudir primero a un juez — precisamente la vía que emplea Torreznal frente a su vecino colindante."),
    q("cap-3-defensa", "dificil",
      "Una vez dictado, ¿qué naturaleza tiene el acuerdo resolutorio de deslinde y cómo puede impugnarse según el art. 65 RBEL?",
      ["Es ejecutivo y solo puede impugnarse en vía contencioso-administrativa, sin perjuicio de que quien se sienta lesionado en sus derechos pueda acudir a la jurisdicción ordinaria",
       "No es ejecutivo hasta que lo confirme un juez civil",
       "Solo puede recurrirse en vía administrativa, sin acceso a los tribunales",
       "Es firme e inatacable desde el momento de su aprobación, sin posibilidad de recurso alguno"],
      "El art. 65 RBEL combina ejecutividad inmediata (rasgo típico de las prerrogativas administrativas) con doble vía de control: la contencioso-administrativa contra el acuerdo, y la ordinaria para quien defienda derechos civiles afectados por el deslinde."),
    q("cap-3-defensa", "media",
      "El particular ha ocupado sin título, hace pocos meses, un terreno de dominio público junto al río. ¿En qué plazo puede Torreznal recobrar por sí mismo la tenencia de ese bien según el art. 70.1 RBEL?",
      ["En cualquier tiempo, al tratarse de un bien de dominio público",
       "En el plazo de un año desde la usurpación, igual que si fuera un bien patrimonial",
       "En el plazo de treinta días desde que tuvo conocimiento de la ocupación",
       "No puede recobrarlo por sí mismo: debe acudir siempre a un procedimiento judicial"],
      "El art. 70.1 RBEL no somete a plazo la recuperación de oficio de los bienes de dominio público —a diferencia de los patrimoniales, que el art. 70.2 limita a un año—, precisamente por la protección reforzada que la demanialidad otorga a este terreno junto al río."),
    q("cap-3-defensa", "media",
      "Si en cambio el terreno ocupado fuera un bien patrimonial de Torreznal, ¿qué plazo tendría el Ayuntamiento para recobrarlo por sí mismo según el art. 70.2 RBEL?",
      ["Un año, a contar del día siguiente a la fecha en que se hubiera producido la usurpación; transcurrido ese plazo, procedería la acción ante los Tribunales ordinarios",
       "También podría recobrarlo en cualquier tiempo, sin límite, igual que un bien demanial",
       "Seis meses, con posibilidad de una única prórroga de otros seis",
       "El plazo es indiferente porque los bienes patrimoniales no admiten recuperación de oficio"],
      "El art. 70.2 RBEL marca la diferencia clave entre ambos regímenes: el año de plazo para recuperar por sí misma la posesión de un bien patrimonial, agotado el cual la Corporación ya no puede actuar de oficio y debe litigar ante la jurisdicción ordinaria."),
    q("cap-3-defensa", "dificil",
      "Al recobrar la posesión del terreno de dominio público, ¿qué privilegio reconoce el art. 71.3 RBEL al Ayuntamiento de Torreznal?",
      ["Utilizar todos los medios compulsorios legalmente admitidos, sin perjuicio de poner los hechos en conocimiento de la autoridad judicial si tuvieran apariencia de delito",
       "Emplear la fuerza que estime necesaria sin ningún límite legal, al tratarse de dominio público",
       "Ninguno especial: debe emplear exactamente los mismos medios que un particular frente a otro",
       "Solicitar primero autorización judicial expresa antes de ejecutar cualquier medida de recuperación"],
      "El art. 71.3 RBEL habilita a la Corporación a servirse de medios compulsorios propios de la actuación administrativa (sin acudir previamente a un juez), reservando la vía judicial únicamente para cuando los hechos usurpatorios pudieran ser constitutivos de delito."),
    q("cap-3-defensa", "media",
      "Si el afectado por el primer expediente de investigación (la finca de titularidad dudosa) no está de acuerdo con la resolución, ¿qué vía le reconoce el art. 55.2 RBEL para impugnarla?",
      ["Puede impugnarla en vía contencioso-administrativa",
       "No cabe impugnación alguna: la resolución del expediente de investigación es firme desde su dictado",
       "Solo puede reclamar en vía civil ordinaria, sin acceso a la jurisdicción contencioso-administrativa",
       "Únicamente puede recurrir en alzada ante la Comunidad Autónoma, sin acceso a los tribunales"],
      "El art. 55.2 RBEL cierra el círculo de garantías del expediente de investigación abierto al principio del caso: quien resulte afectado por su resolución puede impugnarla ante la jurisdicción contencioso-administrativa, sin quedar indefenso frente a la potestad municipal."),
  ],
};

for (const caso of [CASO_4, CASO_5]) {
  await crearCaso(caso);
}
console.log("✔ Tanda de recambio de casos prácticos del tema 10 (bienes de las entidades locales) sembrada.");
