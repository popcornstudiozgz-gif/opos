/**
 * Casos prácticos — Tema 12 (Haciendas Locales: Recursos municipales, Ley
 * reguladora de las Haciendas Locales). 2 casos de 10 preguntas cada uno:
 *   1. La reforma de la calle de San José: tasas, contribuciones
 *      especiales y precios públicos — la clásica distinción entre las
 *      tres figuras (arts. 2, 20-24, 28-36, 41-47)
 *   2. El taller de bicicletas de Alejandro: los impuestos municipales
 *      obligatorios y potestativos aplicados a un pequeño negocio (arts.
 *      2, 59, 61, 82, 92-93, 100-102)
 *
 * Reutiliza las secciones ya usadas por las preguntas sueltas del tema
 * (tasas, contribuciones-especiales, precios-publicos,
 * impuestos-enumeracion, ibi, iae, icio, ivtm). Misma mecánica que los
 * casos anteriores: preguntas/opciones en las tablas ya existentes,
 * enlazadas vía caso_preguntas con su `orden`. La primera opción de cada
 * pregunta es siempre la correcta (el cliente baraja el orden al
 * mostrarlas).
 *
 * Uso: node --env-file=.env.local scripts/seed-casos-practicos-tema-12.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

const TEMA = "tema-12";
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
// CASO 1 — La reforma de la calle de San José
// ═══════════════════════════════════════════════════════════════════════
const CASO_1 = {
  slug: "caso-reforma-calle-san-jose-tasas-contribuciones",
  titulo: "La reforma de la calle de San José: tasas, contribuciones especiales y precios públicos",
  orden: 1,
  supuesto:
    "El Ayuntamiento de Zaragoza repavimenta la calle de San José y, con motivo de la obra, instala además un " +
    "nuevo alumbrado que revaloriza las fachadas de los edificios colindantes. Al mismo tiempo, un vecino " +
    "solicita ocupar un tramo de acera con un andamio para reformar su fachada, y una empresa de catering pide " +
    "utilizar el polideportivo municipal para un evento privado, pagando una contraprestación que solo cubre el " +
    "coste del servicio. Por otro lado, el Ayuntamiento se plantea si puede cobrar una tasa a los vecinos por el " +
    "simple hecho de que la Policía Local vigile la calle durante las obras, y si puede establecer una tasa por " +
    "la recogida de basuras del vecindario.",
  preguntas: [
    q("contribuciones-especiales", "media",
      "La repavimentación y el nuevo alumbrado revalorizan las fachadas de los edificios colindantes. ¿Qué figura tributaria permite al Ayuntamiento repercutir ese beneficio sobre los propietarios?",
      ["La contribución especial, cuyo hecho imponible es la obtención por el sujeto pasivo de un beneficio o de un aumento de valor de sus bienes como consecuencia de la realización de obras públicas o del establecimiento o ampliación de servicios públicos locales",
       "La tasa, en todo caso, con independencia de que exista o no revalorización de los inmuebles",
       "El precio público, por tratarse de una actuación municipal sobre la vía pública",
       "El Impuesto sobre Bienes Inmuebles, mediante un recargo específico sobre la cuota"],
      "Art. 28 LHL: constituye el hecho imponible de las contribuciones especiales la obtención por el sujeto pasivo de un beneficio o de un aumento de valor de sus bienes como consecuencia de obras públicas o del establecimiento o ampliación de servicios públicos locales."),
    q("contribuciones-especiales", "facil",
      "¿Cuál es el límite máximo de la base imponible de esa contribución especial respecto al coste que soporta el Ayuntamiento por la obra?",
      ["El 90 por ciento del coste que la entidad local soporte por la realización de las obras",
       "El 100 por ciento del coste total de la obra, sin ningún límite",
       "El 50 por ciento del coste, como máximo legal",
       "No existe ningún límite legal sobre la base imponible"],
      "Art. 31.1 LHL: la base imponible de las contribuciones especiales está constituida, como máximo, por el 90 por ciento del coste que la entidad local soporte por la realización de las obras."),
    q("contribuciones-especiales", "media",
      "Si los propietarios de las fachadas afectadas quisieran promover ellos mismos la realización de la obra, comprometiéndose a sufragar la parte municipal si la situación financiera del Ayuntamiento no lo permitiera, ¿lo permite la Ley?",
      ["Sí, pueden constituirse en asociación administrativa de contribuyentes y promover la realización de las obras",
       "No, la iniciativa de las obras corresponde en exclusiva al Ayuntamiento, sin participación vecinal posible",
       "Sí, pero solo si aportan la totalidad del coste de la obra, sin excepción alguna",
       "No, las asociaciones de contribuyentes fueron suprimidas por la Ley reguladora de las Haciendas Locales"],
      "Art. 36.1 LHL: los propietarios o titulares afectados por las obras podrán constituirse en asociación administrativa de contribuyentes y promover la realización de obras o el establecimiento o ampliación de servicios."),
    q("tasas", "media",
      "El vecino que solicita ocupar un tramo de acera con un andamio para reformar su fachada, ¿qué figura tributaria le corresponde pagar?",
      ["Una tasa, por la utilización privativa o el aprovechamiento especial del dominio público local",
       "Una contribución especial, por beneficiarse de la mejora de la vía pública",
       "Un precio público, al tratarse de un servicio prestado a instancia del propio vecino",
       "El Impuesto sobre Construcciones, Instalaciones y Obras, exclusivamente"],
      "Art. 20.1 y 20.3.g) LHL: las entidades locales podrán establecer tasas por la ocupación de terrenos de uso público local con materiales de construcción, vallas, puntales, andamios y otras instalaciones análogas."),
    q("tasas", "dificil",
      "¿Podría el Ayuntamiento cobrar una tasa a los vecinos por el simple hecho de que la Policía Local vigile la calle durante las obras, entendida como vigilancia pública en general?",
      ["No, las entidades locales no podrán exigir tasas por el servicio de vigilancia pública en general",
       "Sí, siempre que la ordenanza fiscal correspondiente lo establezca expresamente",
       "Sí, porque toda actuación policial relacionada con una obra municipal es susceptible de tasa",
       "No, pero sí podría exigirse como contribución especial en su lugar"],
      "Art. 21.1.c) LHL: las entidades locales no podrán exigir tasas por el servicio de vigilancia pública en general."),
    q("tasas", "facil",
      "¿Puede el Ayuntamiento establecer una tasa por la recogida de residuos sólidos urbanos del vecindario?",
      ["Sí, las entidades locales pueden establecer tasas por la prestación de servicios de recogida de residuos sólidos urbanos, tratamiento y eliminación de estos",
       "No, la recogida de basuras está expresamente excluida del ámbito de las tasas locales",
       "Sí, pero únicamente mediante un impuesto específico, nunca mediante una tasa",
       "No, ese servicio solo puede financiarse mediante contribuciones especiales"],
      "Art. 20.4.s) LHL: las entidades locales podrán establecer tasas por la recogida de residuos sólidos urbanos, tratamiento y eliminación de estos."),
    q("tasas", "media",
      "Con carácter general, ¿puede el importe conjunto de una tasa por prestación de un servicio exceder del coste real o previsible de ese servicio?",
      ["No, el importe de las tasas por la prestación de un servicio no podrá exceder, en su conjunto, del coste real o previsible del servicio o actividad de que se trate",
       "Sí, siempre que el exceso se destine a otros servicios municipales deficitarios",
       "Sí, sin ningún límite, si así lo decide el Pleno de la Corporación",
       "No, pero el límite se calcula sobre el coste medio de los últimos cinco ejercicios"],
      "Art. 24.2 LHL: el importe de las tasas por la prestación de un servicio o la realización de una actividad no podrá exceder, en su conjunto, del coste real o previsible del servicio o actividad."),
    q("precios-publicos", "media",
      "La empresa de catering que utiliza el polideportivo para un evento privado paga una contraprestación que solo cubre el coste del servicio, sin ánimo de lucro para el Ayuntamiento. ¿Qué figura es esta, y qué cuantía mínima debe cubrir?",
      ["Un precio público, cuyo importe deberá cubrir como mínimo el coste del servicio prestado o de la actividad realizada",
       "Una tasa, que debe cubrir necesariamente el cien por cien del coste del servicio, sin excepción",
       "Una contribución especial, calculada sobre el beneficio obtenido por la propia empresa",
       "Un precio público, que no está sujeto a ningún límite mínimo de cuantía"],
      "Arts. 41 y 44.1 LHL: las entidades locales pueden establecer precios públicos por la prestación de servicios, cuyo importe deberá cubrir como mínimo el coste del servicio prestado."),
    q("precios-publicos", "facil",
      "¿A qué órgano corresponde, con carácter general, el establecimiento o la modificación de los precios públicos municipales?",
      ["Al Pleno de la Corporación, sin perjuicio de sus facultades de delegación",
       "Al Alcalde, con carácter exclusivo e indelegable",
       "A la Junta de Gobierno Local, en todo caso y sin posibilidad de delegación por el Pleno",
       "Al Interventor municipal, como garante del equilibrio presupuestario"],
      "Art. 47.1 LHL: el establecimiento o modificación de los precios públicos corresponderá al Pleno de la Corporación, sin perjuicio de sus facultades de delegación."),
    q("contribuciones-especiales", "dificil",
      "Determinadas las cuotas individuales de la contribución especial de la calle de San José y notificadas a cada propietario, ¿qué recurso pueden interponer los vecinos disconformes, y ante quién?",
      ["Recurso de reposición ante el propio Ayuntamiento, que podrá versar sobre la procedencia de las contribuciones especiales, el porcentaje del coste a satisfacer o las cuotas asignadas",
       "Recurso de alzada ante la Diputación Provincial correspondiente",
       "Recurso contencioso-administrativo directo, sin posibilidad de recurso administrativo previo",
       "Recurso extraordinario de revisión, exclusivamente"],
      "Art. 34.4 LHL: los interesados podrán formular recurso de reposición ante el ayuntamiento, que podrá versar sobre la procedencia de las contribuciones especiales, el porcentaje del coste o las cuotas asignadas."),
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// CASO 2 — El taller de bicicletas de Alejandro
// ═══════════════════════════════════════════════════════════════════════
const CASO_2 = {
  slug: "caso-taller-bicicletas-alejandro-impuestos-municipales",
  titulo: "El taller de bicicletas de Alejandro: IBI, IAE, ICIO e IVTM",
  orden: 2,
  supuesto:
    "Alejandro decide montar un pequeño taller de reparación de bicicletas en un local de su propiedad en " +
    "Zaragoza. Para acondicionarlo, solicita licencia de obras y realiza una reforma interior. Es su primer año " +
    "de actividad, y su cifra de negocio prevista es muy inferior a un millón de euros. Además, adquiere una " +
    "furgoneta de reparto para las entregas a domicilio y un pequeño remolque de 600 kilogramos de carga útil " +
    "para transportar bicicletas, y se pregunta por qué conceptos tendrá que tributar ante el Ayuntamiento.",
  preguntas: [
    q("impuestos-enumeracion", "facil",
      "De los impuestos municipales, ¿cuáles están obligados a exigir todos los ayuntamientos, sin necesidad de acuerdo expreso de imposición?",
      ["El Impuesto sobre Bienes Inmuebles, el Impuesto sobre Actividades Económicas y el Impuesto sobre Vehículos de Tracción Mecánica",
       "El Impuesto sobre Construcciones, Instalaciones y Obras y el Impuesto sobre el Incremento de Valor de los Terrenos de Naturaleza Urbana",
       "Únicamente el Impuesto sobre Bienes Inmuebles",
       "Todos los impuestos municipales son de exigencia potestativa, sin excepción alguna"],
      "Art. 59.1 LHL: los ayuntamientos exigirán, en todo caso, el Impuesto sobre Bienes Inmuebles, el Impuesto sobre Actividades Económicas y el Impuesto sobre Vehículos de Tracción Mecánica."),
    q("impuestos-enumeracion", "media",
      "El Impuesto sobre Construcciones, Instalaciones y Obras que grava la reforma del local de Alejandro, ¿es de exigencia obligatoria para todos los ayuntamientos?",
      ["No, los ayuntamientos podrán establecerlo y exigirlo, junto con el Impuesto sobre el Incremento de Valor de los Terrenos de Naturaleza Urbana, de acuerdo con la Ley y sus ordenanzas fiscales",
       "Sí, es de exigencia obligatoria en todos los municipios, igual que el IBI",
       "No, ha sido derogado por la Ley reguladora de las Haciendas Locales",
       "Sí, pero únicamente en los municipios de gran población"],
      "Art. 59.2 LHL: los ayuntamientos podrán establecer y exigir el Impuesto sobre Construcciones, Instalaciones y Obras y el Impuesto sobre el Incremento de Valor de los Terrenos de Naturaleza Urbana."),
    q("ibi", "facil",
      "Como propietario del local, ¿cuál es el hecho imponible del IBI que le corresponde satisfacer a Alejandro?",
      ["La titularidad del derecho de propiedad sobre el inmueble",
       "El simple ejercicio de una actividad económica en el inmueble",
       "La realización de una obra de reforma en el inmueble",
       "La titularidad de un vehículo afecto a la actividad"],
      "Art. 61.1.d) LHL: constituye el hecho imponible del IBI la titularidad del derecho de propiedad sobre los bienes inmuebles, entre otros derechos que enumera el precepto."),
    q("icio", "media",
      "La reforma interior del local para acondicionarlo como taller, ¿está sujeta al Impuesto sobre Construcciones, Instalaciones y Obras?",
      ["Sí, su hecho imponible está constituido por la realización de cualquier construcción, instalación u obra para la que se exija licencia de obras o urbanística, se haya obtenido o no dicha licencia",
       "No, el ICIO solo grava las obras de nueva construcción, nunca las reformas interiores",
       "Sí, pero únicamente si Alejandro no ha solicitado la licencia correspondiente",
       "No, las reformas de locales comerciales están exentas por su propia naturaleza"],
      "Art. 100.1 LHL: el hecho imponible del ICIO está constituido por la realización de cualquier construcción, instalación u obra para la que se exija licencia de obras o urbanística, se haya obtenido o no dicha licencia."),
    q("icio", "media",
      "¿En qué momento se devenga el ICIO de la reforma del local de Alejandro?",
      ["En el momento de iniciarse la construcción, instalación u obra, aun cuando no se haya obtenido la correspondiente licencia",
       "En el momento en que finalice completamente la obra",
       "En el momento en que se solicita la licencia de obras, exclusivamente",
       "En el momento en que se paga la primera factura al contratista"],
      "Art. 102.4 LHL: el impuesto se devenga en el momento de iniciarse la construcción, instalación u obra, aun cuando no se haya obtenido la correspondiente licencia."),
    q("iae", "media",
      "Al ser Alejandro sujeto pasivo que inicia el ejercicio de su actividad, ¿debe pagar el IAE desde el primer momento?",
      ["No, están exentos del impuesto los sujetos pasivos que inicien el ejercicio de su actividad, durante los dos primeros períodos impositivos en que se desarrolle",
       "Sí, el IAE se paga siempre desde el primer día de actividad, sin excepción alguna",
       "No, el IAE fue suprimido para todas las personas físicas por la Ley reguladora de las Haciendas Locales",
       "Sí, pero solo puede exonerarse mediante bonificación potestativa del ayuntamiento, nunca por exención legal"],
      "Art. 82.1.b) LHL: están exentos del IAE los sujetos pasivos que inicien el ejercicio de su actividad en territorio español, durante los dos primeros períodos impositivos en que se desarrolle."),
    q("iae", "dificil",
      "Además, la cifra de negocio prevista de Alejandro es muy inferior a un millón de euros. Al ser persona física, ¿está también exenta del IAE por esta segunda razón, con independencia de la exención por inicio de actividad?",
      ["Sí, las personas físicas están exentas del IAE en todo caso, con independencia de su cifra de negocio",
       "No, las personas físicas nunca están exentas del IAE, solo las personas jurídicas con cifra de negocio inferior a un millón de euros",
       "Sí, pero únicamente si además inicia su actividad, nunca por su sola condición de persona física",
       "No, la exención por cifra de negocio inferior a un millón de euros solo se aplica durante los dos primeros años de actividad"],
      "Art. 82.1.c) LHL: están exentas del IAE, entre otros sujetos pasivos, las personas físicas, sean o no residentes en territorio español, sin necesidad de que concurra ninguna otra circunstancia adicional."),
    q("ivtm", "facil",
      "La furgoneta que Alejandro adquiere para las entregas a domicilio, ¿cuál es el hecho imponible del IVTM que grava su titularidad?",
      ["La titularidad de vehículos de tracción mecánica aptos para circular por las vías públicas, cualquiera que sea su clase y categoría",
       "El simple uso efectivo del vehículo para repartos comerciales",
       "La circulación del vehículo dentro del término municipal de Zaragoza exclusivamente",
       "La matriculación inicial del vehículo, con independencia de que posteriormente cause baja"],
      "Art. 92.1 LHL: el IVTM es un tributo directo que grava la titularidad de los vehículos de esta naturaleza, aptos para circular por las vías públicas, cualesquiera que sean su clase y categoría."),
    q("ivtm", "media",
      "El remolque de 600 kilogramos de carga útil que Alejandro arrastra con su furgoneta para transportar bicicletas, ¿está sujeto al IVTM?",
      ["No, los remolques y semirremolques arrastrados por vehículos de tracción mecánica cuya carga útil no sea superior a 750 kilogramos no están sujetos a este impuesto",
       "Sí, todo remolque está sujeto al impuesto con independencia de su carga útil",
       "No, ningún remolque está nunca sujeto al IVTM, sea cual sea su carga útil",
       "Sí, pero solo si se utiliza para una actividad económica, como es el caso de Alejandro"],
      "Art. 92.3.b) LHL: no están sujetos a este impuesto los remolques y semirremolques arrastrados por vehículos de tracción mecánica cuya carga útil no sea superior a 750 kilogramos."),
    q("impuestos-enumeracion", "dificil",
      "En conjunto, ¿dentro de qué categoría de recursos de la hacienda municipal se encuadran estos impuestos que puede llegar a pagar Alejandro?",
      ["Son tributos propios del municipio, dentro de la categoría de impuestos, junto con las tasas y las contribuciones especiales",
       "Son ingresos de derecho privado procedentes del patrimonio municipal",
       "Son participaciones en los tributos del Estado y de las comunidades autónomas",
       "Son prestaciones patrimoniales de carácter público no tributario, como los precios públicos"],
      "Art. 2.1.b) LHL: la hacienda de las entidades locales está constituida, entre otros recursos, por los tributos propios clasificados en tasas, contribuciones especiales e impuestos."),
  ],
};

for (const caso of [CASO_1, CASO_2]) {
  await crearCaso(caso);
}
console.log("✔ Casos prácticos del tema 12 (Haciendas Locales: Recursos municipales) sembrados.");
