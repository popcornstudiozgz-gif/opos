/**
 * Casos prácticos — Tema 10 (Los bienes de las entidades locales,
 * Reglamento de Bienes de las Entidades Locales). 3 casos de 10
 * preguntas cada uno:
 *   1. La parcela sobrante de la Almozara: clasificación y patrimonio
 *      (arts. 1-16)
 *   2. El inventario municipal y la finca usurpada: conservación
 *      (inventario) y defensa (investigación, deslinde, recuperación de
 *      oficio) (arts. 17-73)
 *   3. El quiosco de la plaza y la cesión del solar: disfrute y
 *      aprovechamiento, enajenación y desahucio por vía administrativa
 *      (arts. 74-79, 109-112, 120-126)
 *
 * Reutiliza las secciones ya usadas por las preguntas sueltas del tema
 * (cap-1-clasificacion, cap-2-patrimonio, cap-3-conservacion,
 * cap-3-defensa, cap-4-disfrute, cap-5-enajenacion, titulo-2-desahucio).
 * Misma mecánica que los casos anteriores: preguntas/opciones en las
 * tablas ya existentes, enlazadas vía caso_preguntas con su `orden`. La
 * primera opción de cada pregunta es siempre la correcta (el cliente
 * baraja el orden al mostrarlas).
 *
 * Uso: node --env-file=.env.local scripts/seed-casos-practicos-tema-10.mjs
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
// CASO 1 — La parcela sobrante de la Almozara
// ═══════════════════════════════════════════════════════════════════════
const CASO_1 = {
  slug: "caso-parcela-sobrante-almozara-clasificacion-patrimonio",
  titulo: "La parcela sobrante de la Almozara: clasificación y patrimonio",
  orden: 1,
  supuesto:
    "El Ayuntamiento de Zaragoza es propietario de una plaza pública en el barrio de la Almozara, de un " +
    "edificio destinado a centro cívico, y de una pequeña porción de terreno colindante, de forma irregular, " +
    "que no resulta apta para ningún uso adecuado. También hereda de un particular fallecido sin herederos " +
    "forzosos un solar, aceptando la herencia a beneficio de inventario. Por otro lado, un terreno que llevaba " +
    "veintiséis años adscrito de hecho a un uso público, sin haberse tramitado expediente formal de alteración " +
    "de su calificación jurídica, plantea dudas sobre su naturaleza actual.",
  preguntas: [
    q("cap-1-clasificacion", "facil",
      "La plaza pública del barrio, de uso general de los vecinos, ¿en qué categoría de bienes se clasifica?",
      ["Bienes de dominio público de uso público",
       "Bienes de dominio público de servicio público",
       "Bienes patrimoniales o de propios",
       "Bienes comunales, exclusivamente"],
      "Art. 3 RBEL: son bienes de uso público local los caminos, plazas, calles, paseos, parques y demás obras públicas de aprovechamiento o utilización generales."),
    q("cap-1-clasificacion", "media",
      "El edificio destinado a centro cívico, directamente afectado a la prestación de un servicio público municipal, ¿en qué categoría se clasifica?",
      ["Bienes de dominio público de servicio público",
       "Bienes de dominio público de uso público, igual que la plaza",
       "Bienes patrimoniales, al ser un edificio de titularidad municipal",
       "Bienes comunales, por beneficiar al conjunto de los vecinos"],
      "Art. 4 RBEL: son bienes de servicio público los destinados directamente al cumplimiento de fines públicos, como Casas Consistoriales y demás edificios directamente destinados a la prestación de servicios públicos."),
    q("cap-1-clasificacion", "facil",
      "¿Qué características jurídicas comparten los bienes comunales y los demás bienes de dominio público, como la plaza y el centro cívico?",
      ["Son inalienables, inembargables e imprescriptibles y no están sujetos a tributo alguno",
       "Pueden enajenarse libremente sin ningún requisito especial",
       "Pueden embargarse judicialmente en caso de deudas del Ayuntamiento",
       "Están sujetos al pago del Impuesto sobre Bienes Inmuebles, como cualquier otro inmueble"],
      "Art. 5 RBEL: los bienes comunales y demás bienes de dominio público son inalienables, inembargables e imprescriptibles y no están sujetos a tributo alguno."),
    q("cap-1-clasificacion", "media",
      "La pequeña porción de terreno de forma irregular que no resulta apta para ningún uso adecuado, ¿cómo se clasifica conforme al Reglamento?",
      ["Como parcela sobrante, que tiene la consideración de bien patrimonial",
       "Como bien de dominio público de uso público, igual que cualquier otro terreno municipal",
       "Como bien comunal, al tratarse de un terreno de reducida extensión",
       "Como efecto no utilizable, categoría reservada exclusivamente a bienes muebles"],
      "Art. 7.1 y 7.2 RBEL: se clasificarán como bienes patrimoniales las parcelas sobrantes, entendiendo por tales las porciones de terreno que, por su reducida extensión, forma irregular o emplazamiento, no fueren susceptibles de uso adecuado."),
    q("cap-1-clasificacion", "dificil",
      "Para declarar formalmente esa porción de terreno como parcela sobrante, ¿qué exige el Reglamento?",
      ["Un expediente de calificación jurídica",
       "Basta con una simple anotación del Secretario en el inventario, sin expediente alguno",
       "Es necesaria una ley autonómica específica para cada parcela",
       "No se exige ningún trámite, la calificación es automática por el mero transcurso del tiempo"],
      "Art. 7.3 RBEL: para declarar un terreno parcela sobrante se requerirá expediente de calificación jurídica."),
    q("cap-2-patrimonio", "media",
      "El Ayuntamiento hereda un solar de un particular fallecido sin herederos forzosos. ¿A título de qué se entiende aceptada esa herencia?",
      ["A beneficio de inventario",
       "Pura y simplemente, sin ningún beneficio ni limitación",
       "Bajo condición resolutoria automática a los diez años",
       "El Reglamento no permite a las Entidades locales aceptar herencias"],
      "Art. 12.3 RBEL: la aceptación de herencias se entenderá a beneficio de inventario."),
    q("cap-2-patrimonio", "facil",
      "Entre los modos de adquisición de bienes por las Corporaciones locales, ¿figura la herencia, legado o donación?",
      ["Sí, es uno de los modos expresamente previstos, junto con la atribución de la Ley, el título oneroso, la prescripción y la ocupación",
       "No, las Entidades locales solo pueden adquirir bienes a título oneroso",
       "No, la herencia y el legado están reservados exclusivamente a las Comunidades Autónomas",
       "Sí, pero únicamente si el causante era funcionario de la propia Corporación"],
      "Art. 10.c) RBEL: las Corporaciones Locales pueden adquirir bienes y derechos por herencia, legado o donación."),
    q("cap-2-patrimonio", "media",
      "Si la adquisición de un bien llevara aneja alguna condición o modalidad onerosa, ¿en qué caso podrá aceptarse?",
      ["Solo podrán aceptarse previo expediente en el que se acredite que el valor del gravamen impuesto no excede del valor de lo que se adquiere",
       "Nunca podrán aceptarse bienes con condiciones onerosas, en ningún caso",
       "Podrán aceptarse siempre, sin necesidad de ningún expediente previo",
       "Solo podrán aceptarse si el gravamen supera el valor del bien adquirido"],
      "Art. 12.2 RBEL: si la adquisición llevare aneja alguna condición o modalidad onerosa, solo podrán aceptarse los bienes previo expediente en el que se acredite que el valor del gravamen no excede del valor de lo adquirido."),
    q("cap-1-clasificacion", "dificil",
      "Sobre el terreno adscrito de hecho a un uso público durante veintiséis años sin expediente formal, ¿qué efecto produce el Reglamento cuando se supera ese plazo de adscripción?",
      ["La alteración de la calificación jurídica se produce automáticamente cuando la adscripción de bienes patrimoniales a un uso o servicio público o comunal se prolonga por más de veinticinco años",
       "No se produce ningún efecto mientras no se tramite expresamente el expediente de alteración",
       "El terreno revierte automáticamente a su antiguo propietario privado",
       "La adscripción de hecho nunca puede alterar la calificación jurídica de un bien, cualquiera que sea su duración"],
      "Art. 8.4.b) RBEL: la alteración se produce automáticamente por la adscripción de bienes patrimoniales por más de veinticinco años a un uso o servicio público o comunal."),
    q("cap-2-patrimonio", "facil",
      "Con carácter general, ¿tienen las Entidades locales capacidad jurídica plena para adquirir y poseer bienes de todas las clases?",
      ["Sí, las Entidades locales tendrán capacidad jurídica plena para adquirir y poseer bienes de todas las clases y ejercitar las acciones y recursos procedentes en defensa de su patrimonio",
       "No, esa capacidad está limitada a los bienes de dominio público, nunca a los patrimoniales",
       "Sí, pero únicamente previa autorización expresa de las Cortes Generales",
       "No, la capacidad jurídica para adquirir bienes corresponde en exclusiva a la Comunidad Autónoma"],
      "Art. 9.1 RBEL: las Entidades locales tendrán capacidad jurídica plena para adquirir y poseer bienes de todas las clases y ejercitar las acciones y recursos procedentes en defensa de su patrimonio."),
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// CASO 2 — El inventario municipal y la finca usurpada
// ═══════════════════════════════════════════════════════════════════════
const CASO_2 = {
  slug: "caso-inventario-finca-usurpada-conservacion-defensa",
  titulo: "El inventario municipal y la finca usurpada: conservación y defensa",
  orden: 2,
  supuesto:
    "El Ayuntamiento revisa su inventario de bienes, en el que debe figurar, entre otros datos de cada " +
    "inmueble, su situación, superficie y naturaleza jurídica. La rectificación anual del inventario está " +
    "pendiente de aprobación por el órgano competente. Al mismo tiempo, un particular ocupa sin título una " +
    "porción de una finca de dominio público municipal colindante con su propiedad, cuyos límites resultan " +
    "imprecisos. El Ayuntamiento se plantea recuperar la posesión de esa finca y, además, promover el deslinde " +
    "con el terreno colindante.",
  preguntas: [
    q("cap-3-conservacion", "facil",
      "¿Están las Corporaciones locales obligadas a formar inventario de todos sus bienes y derechos?",
      ["Sí, cualquiera que sea su naturaleza o forma de adquisición",
       "No, solo están obligadas a inventariar los bienes inmuebles, nunca los muebles",
       "Sí, pero únicamente respecto a los bienes de dominio público, nunca los patrimoniales",
       "No, la formación de inventario es una facultad meramente potestativa"],
      "Art. 17.1 RBEL: las Corporaciones locales están obligadas a formar inventario de todos sus bienes y derechos, cualquiera que sea su naturaleza o forma de adquisición."),
    q("cap-3-conservacion", "media",
      "Entre los datos que debe expresar el inventario de un bien inmueble, ¿figura su naturaleza de dominio público o patrimonial?",
      ["Sí, debe expresar la naturaleza de dominio público o patrimonial, con indicación de si se trata de bienes de uso o servicio público, patrimoniales o comunales",
       "No, el inventario solo recoge datos físicos del inmueble, sin calificación jurídica",
       "Sí, pero solo si el bien está inscrito en el Registro de la Propiedad",
       "No, esa información se reserva a un registro distinto del inventario municipal"],
      "Art. 20.i) RBEL: el inventario de bienes inmuebles expresará la naturaleza de dominio público o patrimonial, con expresión de si se trata de bienes de uso o servicio público, patrimoniales o comunales."),
    q("cap-3-conservacion", "facil",
      "¿Con qué periodicidad debe verificarse la rectificación del inventario?",
      ["Anualmente",
       "Cada cinco años",
       "Solo cuando lo solicite expresamente algún vecino",
       "El Reglamento no establece ninguna periodicidad para la rectificación"],
      "Art. 33.1 RBEL: la rectificación del inventario se verificará anualmente."),
    q("cap-3-conservacion", "media",
      "¿Qué órgano de la Corporación es competente para acordar la aprobación del inventario, su rectificación y comprobación?",
      ["El Pleno de la Corporación local",
       "El Alcalde, con carácter exclusivo e indelegable",
       "El Secretario de la Corporación, sin necesidad de acuerdo del Pleno",
       "El Interventor municipal, como responsable del control económico"],
      "Art. 34 RBEL: el Pleno de la Corporación local será el órgano competente para acordar la aprobación del inventario, su rectificación y comprobación."),
    q("cap-3-conservacion", "dificil",
      "Además de la comprobación anual, ¿en qué otro momento debe efectuarse la comprobación del inventario, según el Reglamento?",
      ["Siempre que se renueve la Corporación",
       "Únicamente cuando lo solicite expresamente el Tribunal de Cuentas",
       "Solo en caso de fusión con otro municipio",
       "El Reglamento no prevé ninguna comprobación adicional a la anual"],
      "Art. 33.2 RBEL: la comprobación se efectuará siempre que se renueve la Corporación."),
    q("cap-3-defensa", "media",
      "El Ayuntamiento se plantea recuperar la posesión de la finca de dominio público usurpada por el particular. ¿En qué plazo puede ejercer esa facultad?",
      ["Tratándose de bienes de dominio público, las Corporaciones locales podrán recobrar por sí la tenencia en cualquier tiempo",
       "Dispone de un plazo máximo de un año desde la usurpación, igual que para los bienes patrimoniales",
       "Dispone de un plazo máximo de treinta días desde que tenga conocimiento de la usurpación",
       "No puede recuperar la posesión por vía administrativa en ningún caso, debiendo acudir siempre a los Tribunales"],
      "Art. 70.1 RBEL: las Corporaciones locales podrán recobrar por sí la tenencia de sus bienes de dominio público en cualquier tiempo."),
    q("cap-3-defensa", "facil",
      "Si en cambio se tratara de un bien patrimonial usurpado, ¿en qué plazo debe ejercerse la recuperación en vía administrativa?",
      ["En el plazo de un año, a contar del día siguiente a la fecha en que se hubiera producido la usurpación",
       "En un plazo de cinco años, igual que en los bienes de dominio público",
       "No existe plazo alguno para los bienes patrimoniales, pudiendo recuperarse en cualquier momento",
       "En el plazo de tres meses, coincidiendo con el plazo general de caducidad de los procedimientos administrativos"],
      "Art. 70.2 RBEL: cuando se tratare de bienes patrimoniales, el plazo para recobrarlos será de un año, a contar del día siguiente de la fecha en que se hubiera producido la usurpación."),
    q("cap-3-defensa", "media",
      "Contra las actuaciones de los agentes de la autoridad en materia de recuperación de la posesión, ¿son admisibles los interdictos?",
      ["No, no se admiten interdictos contra las actuaciones de los Agentes de la autoridad en esta materia",
       "Sí, cualquier particular afectado puede interponer interdictos sin ninguna limitación",
       "Sí, pero únicamente si se trata de bienes patrimoniales, nunca de dominio público",
       "Los interdictos son el único cauce admitido para oponerse a la recuperación de oficio"],
      "Art. 70.3 RBEL: no se admiten interdictos contra las actuaciones de los Agentes de la autoridad en esta materia."),
    q("cap-3-defensa", "facil",
      "El Ayuntamiento también quiere promover el deslinde con el terreno colindante cuyos límites resultan imprecisos. ¿Tiene esa facultad?",
      ["Sí, las Corporaciones locales tendrán la facultad de promover y ejecutar el deslinde entre los bienes de su pertenencia y los de los particulares, cuyos límites aparecieren imprecisos o sobre los que existieren indicios de usurpación",
       "No, el deslinde solo puede iniciarse a instancia del propietario colindante particular",
       "Sí, pero únicamente mediante un procedimiento judicial, nunca administrativo",
       "No, la facultad de deslinde fue derogada respecto a los bienes de las Entidades locales"],
      "Art. 56.1 RBEL: las Corporaciones locales tendrán la facultad de promover y ejecutar el deslinde entre sus bienes y los de los particulares, cuyos límites aparecieren imprecisos o sobre los que existieren indicios de usurpación."),
    q("cap-3-defensa", "dificil",
      "Una vez iniciado el procedimiento administrativo de deslinde, ¿puede el particular colindante instar simultáneamente un procedimiento judicial con la misma pretensión?",
      ["No, iniciado el procedimiento administrativo de deslinde, no podrá instarse procedimiento judicial con igual pretensión ni se admitirán interdictos sobre el estado posesorio de las fincas mientras no se lleve a cabo dicho deslinde",
       "Sí, ambos procedimientos, administrativo y judicial, pueden tramitarse simultáneamente sin ninguna limitación",
       "Sí, siempre que el particular lo solicite expresamente ante el Juzgado competente",
       "No, pero solo durante los primeros treinta días desde el inicio del expediente administrativo"],
      "Art. 66 RBEL: iniciado el procedimiento administrativo de deslinde, no podrá instarse procedimiento judicial con igual pretensión ni se admitirán interdictos mientras no se lleve a cabo dicho deslinde."),
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// CASO 3 — El quiosco de la plaza y la cesión del solar
// ═══════════════════════════════════════════════════════════════════════
const CASO_3 = {
  slug: "caso-quiosco-plaza-cesion-solar-disfrute-enajenacion-desahucio",
  titulo: "El quiosco de la plaza y la cesión del solar: disfrute, enajenación y desahucio",
  orden: 3,
  supuesto:
    "Un vecino solicita al Ayuntamiento una concesión para instalar un quiosco de prensa en una plaza pública, " +
    "ocupando de forma privativa una porción del dominio público. El Ayuntamiento también decide vender un " +
    "solar patrimonial cuyo valor supera el 25 % de sus recursos ordinarios del presupuesto anual. Por otro " +
    "lado, cede gratuitamente otro solar patrimonial a una fundación privada sin ánimo de lucro para la " +
    "construcción de un centro social. Finalmente, decide extinguir por vía administrativa una antigua " +
    "concesión sobre un terreno de dominio público cuyo titular ha dejado de cumplir las condiciones de la " +
    "autorización.",
  preguntas: [
    q("cap-4-disfrute", "facil",
      "La ocupación privativa de una porción de la plaza pública para instalar el quiosco de prensa, ¿a qué título jurídico está sujeta conforme al Reglamento?",
      ["A concesión administrativa, pues el uso privativo de bienes de dominio público está sujeto a concesión",
       "A una simple licencia, igual que el uso común especial",
       "A ningún título, pues el uso privativo del dominio público es libre para cualquier vecino",
       "A un contrato de arrendamiento de naturaleza civil"],
      "Art. 78.1.a) RBEL: estará sujeto a concesión administrativa el uso privativo de bienes de dominio público."),
    q("cap-4-disfrute", "media",
      "¿Cómo debe otorgarse esa concesión para el quiosco?",
      ["Previa licitación, con arreglo a la normativa reguladora de la contratación de las Corporaciones locales",
       "Por adjudicación directa, sin ningún procedimiento de concurrencia",
       "Por sorteo entre todos los vecinos empadronados, sin excepción",
       "Automáticamente, en cuanto se presente la solicitud"],
      "Art. 78.2 RBEL: las concesiones se otorgarán previa licitación, con arreglo a la normativa reguladora de la contratación de las Corporaciones locales."),
    q("cap-4-disfrute", "dificil",
      "¿Puede el Ayuntamiento otorgar esa concesión por tiempo indefinido?",
      ["No, en ningún caso podrá otorgarse concesión o licencia alguna por tiempo indefinido; el plazo máximo de las concesiones será de noventa y nueve años, salvo que la normativa especial señale otro menor",
       "Sí, las concesiones sobre dominio público pueden otorgarse sin límite temporal alguno",
       "No, el plazo máximo legal es siempre de cinco años, sin excepción",
       "Sí, siempre que el concesionario sea una entidad sin ánimo de lucro"],
      "Art. 79 RBEL: en ningún caso podrá otorgarse concesión o licencia por tiempo indefinido; el plazo máximo será de noventa y nueve años, salvo que la normativa especial señale otro menor."),
    q("cap-5-enajenacion", "media",
      "El solar patrimonial que el Ayuntamiento decide vender tiene un valor superior al 25 % de los recursos ordinarios del presupuesto anual. ¿Qué exige el Reglamento en ese caso?",
      ["Autorización del órgano competente de la Comunidad Autónoma para poder enajenarlo, gravarlo o permutarlo",
       "Ninguna autorización adicional, basta con el acuerdo del Pleno municipal",
       "Autorización de las Cortes Generales, al superar ese umbral porcentual",
       "Autorización del Consejo de Ministros, en todo caso"],
      "Art. 109.1 RBEL: los bienes inmuebles patrimoniales no podrán enajenarse, gravarse ni permutarse sin autorización de la Comunidad Autónoma cuando su valor exceda del 25 % de los recursos ordinarios del presupuesto."),
    q("cap-5-enajenacion", "facil",
      "¿A quiénes puede el Ayuntamiento ceder gratuitamente sus bienes inmuebles patrimoniales, como el solar destinado al centro social?",
      ["A Entidades o Instituciones públicas para fines que redunden en beneficio de los habitantes del municipio, así como a Instituciones privadas de interés público sin ánimo de lucro",
       "A cualquier persona física o jurídica, sin ninguna limitación ni requisito",
       "Únicamente a otras Administraciones Públicas, nunca a entidades privadas",
       "Solo a empresas mercantiles que se comprometan a generar empleo en el municipio"],
      "Art. 109.2 RBEL: los bienes inmuebles patrimoniales no podrán cederse gratuitamente sino a Entidades o Instituciones públicas, o a Instituciones privadas de interés público sin ánimo de lucro."),
    q("cap-5-enajenacion", "media",
      "Para acordar esa cesión gratuita, ¿qué mayoría exige el Reglamento en el acuerdo de la Corporación?",
      ["El voto favorable de la mayoría absoluta del número legal de miembros de la Corporación",
       "Mayoría simple de los miembros presentes en la sesión",
       "Unanimidad de todos los miembros de la Corporación",
       "No se exige ninguna mayoría cualificada, basta con el acuerdo del Alcalde"],
      "Art. 110.1 RBEL: la cesión gratuita de los bienes requerirá acuerdo adoptado con el voto favorable de la mayoría absoluta del número legal de miembros de la Corporación."),
    q("cap-5-enajenacion", "dificil",
      "Si en el acuerdo de cesión no se estipula otra cosa, ¿en qué plazo deben cumplirse los fines para los que se otorgó la cesión gratuita, y durante cuánto tiempo debe mantenerse ese destino?",
      ["Los fines deben cumplirse en el plazo máximo de cinco años, debiendo mantenerse el destino durante los treinta años siguientes",
       "Los fines deben cumplirse en el plazo de un año, sin ninguna obligación de mantenimiento posterior",
       "No existe ningún plazo, la cesión gratuita es indefinida por naturaleza",
       "Los fines deben cumplirse en el plazo de diez años, manteniéndose el destino durante otros diez años más"],
      "Art. 111.2 RBEL: si en el acuerdo de cesión no se estipula otra cosa, se entenderá que los fines deberán cumplirse en el plazo máximo de cinco años, debiendo mantenerse el destino durante los treinta años siguientes."),
    q("titulo-2-desahucio", "media",
      "Sobre la antigua concesión sobre el terreno de dominio público cuyo titular incumple las condiciones, ¿mediante qué vía debe el Ayuntamiento extinguir esos derechos?",
      ["Por vía administrativa, mediante el ejercicio de sus facultades coercitivas, previa indemnización o sin ella según proceda con arreglo a derecho",
       "Únicamente mediante un procedimiento judicial ante los Tribunales civiles ordinarios",
       "Mediante un simple requerimiento verbal, sin necesidad de ningún procedimiento formal",
       "La extinción de estos derechos no está prevista en el Reglamento de Bienes"],
      "Art. 120 RBEL: la extinción de los derechos constituidos sobre bienes de dominio público o comunales se efectuará por las Corporaciones, en todo caso, por vía administrativa, mediante el ejercicio de sus facultades coercitivas."),
    q("titulo-2-desahucio", "facil",
      "¿Qué carácter tienen la competencia y el procedimiento para disponer el desahucio administrativo, fijar la indemnización y llevar a cabo el lanzamiento?",
      ["Carácter administrativo y sumario, con competencia exclusiva de las Corporaciones locales",
       "Carácter exclusivamente judicial, correspondiendo a los Juzgados de lo Contencioso-administrativo",
       "Carácter arbitral, debiendo someterse a un árbitro designado de común acuerdo",
       "Carácter puramente civil, aplicándose las normas de la Ley de Enjuiciamiento Civil"],
      "Art. 122 RBEL: la competencia y el procedimiento para disponer el desahucio, fijar la indemnización y llevar a cabo el lanzamiento tendrán carácter administrativo y sumario, con competencia exclusiva de las Corporaciones locales."),
    q("titulo-2-desahucio", "dificil",
      "Para fijar la indemnización del desahucio, ¿debe el Ayuntamiento intentar antes una avenencia con los interesados?",
      ["Sí, para fijar la indemnización se intentará una avenencia con los interesados, requiriéndoles para que en el plazo de quince días formulen proposición sobre la cuantía y el plazo para desalojar",
       "No, la indemnización se fija siempre de forma unilateral por el Ayuntamiento, sin ninguna negociación previa",
       "Sí, pero el plazo para formular la proposición es de seis meses",
       "No, el Reglamento no prevé ningún trámite de avenencia en el desahucio administrativo"],
      "Art. 126.1 RBEL: para fijar la indemnización se intentará una avenencia con los interesados, requiriéndoles para que en el plazo de quince días formulen proposición sobre la cuantía y el plazo para desalojar."),
  ],
};

for (const caso of [CASO_1, CASO_2, CASO_3]) {
  await crearCaso(caso);
}
console.log("✔ Casos prácticos del tema 10 (Los bienes de las entidades locales) sembrados.");
