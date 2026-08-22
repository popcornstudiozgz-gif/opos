/**
 * Casos prácticos — Tema 11 (La actividad de las entidades locales,
 * Reglamento de Servicios de las Corporaciones Locales: policía,
 * fomento, y concepto y modos de gestión del servicio público local).
 * 2 casos de 10 preguntas cada uno:
 *   1. La terraza sin licencia y la subvención a la asociación vecinal:
 *      policía y fomento (arts. 1-17, 23-26)
 *   2. La piscina municipal: gestión directa o concesión (arts. 30-36,
 *      41-46, 113-117)
 *
 * Reutiliza las secciones ya usadas por las preguntas sueltas del tema
 * (formas-actividad, servicio-publico-concepto, gestion-directa,
 * gestion-indirecta). Misma mecánica que los casos anteriores:
 * preguntas/opciones en las tablas ya existentes, enlazadas vía
 * caso_preguntas con su `orden`. La primera opción de cada pregunta es
 * siempre la correcta (el cliente baraja el orden al mostrarlas).
 *
 * Uso: node --env-file=.env.local scripts/seed-casos-practicos-tema-11.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

const TEMA = "tema-11";
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
// CASO 1 — La terraza sin licencia y la subvención a la asociación vecinal
// ═══════════════════════════════════════════════════════════════════════
const CASO_1 = {
  slug: "caso-terraza-subvencion-vecinal-policia-fomento",
  titulo: "La terraza sin licencia y la subvención a la asociación vecinal: policía y fomento",
  orden: 1,
  supuesto:
    "Un bar de la ciudad instala una terraza en la vía pública sin haber solicitado la preceptiva licencia, " +
    "generando quejas vecinales por ruido y ocupación excesiva del espacio. El Ayuntamiento decide intervenir " +
    "para restablecer la tranquilidad y seguridad ciudadanas. Otro bar, en cambio, sí solicita correctamente la " +
    "licencia de apertura de una terraza pequeña, y transcurren dos meses sin que el Ayuntamiento resuelva " +
    "expresamente. Al mismo tiempo, una asociación de vecinos solicita una subvención municipal para organizar " +
    "unas jornadas culturales, cuyo coste ya está cubierto en parte por otros medios.",
  preguntas: [
    q("formas-actividad", "facil",
      "¿En qué supuesto, entre otros, pueden los Ayuntamientos intervenir la actividad de sus administrados en ejercicio de la función de policía?",
      ["Cuando existiere perturbación o peligro de perturbación grave de la tranquilidad, seguridad, salubridad o moralidad ciudadanas, con el fin de restablecerlas o conservarlas",
       "En cualquier caso y sin necesidad de motivo alguno, por la sola discrecionalidad del Alcalde",
       "Únicamente cuando lo solicite expresamente el interesado afectado",
       "Solo cuando exista sentencia judicial previa que lo autorice"],
      "Art. 1.1º RSCL: los Ayuntamientos podrán intervenir la actividad de sus administrados en el ejercicio de la función de policía, cuando existiere perturbación o peligro de perturbación grave de la tranquilidad, seguridad, salubridad o moralidad ciudadanas."),
    q("formas-actividad", "media",
      "La intervención defensiva del orden, ¿frente a quién se ejerce con carácter general?",
      ["Frente a los sujetos que perturbaren el orden",
       "Frente a cualquier ciudadano, sea o no responsable de la perturbación",
       "Exclusivamente frente a personas jurídicas, nunca frente a personas físicas",
       "Frente al conjunto de la ciudadanía del municipio, sin distinción"],
      "Art. 3.1 RSCL: la intervención defensiva del orden, en cualquiera de sus aspectos, se ejercerá frente a los sujetos que lo perturbaren."),
    q("formas-actividad", "dificil",
      "Si excepcionalmente, por no existir otro medio de restaurar el orden, la intervención hubiera de dirigirse frente a un vecino que ejerciera legítimamente sus derechos, ¿qué procede?",
      ["Procederá la justa indemnización",
       "No procede ninguna compensación, pues el interés general prevalece siempre sobre el particular",
       "El vecino debe soportar la medida sin derecho a reclamación de ningún tipo",
       "Solo procede indemnización si el vecino es propietario del inmueble afectado"],
      "Art. 3.2 RSCL: excepcionalmente, cuando la intervención hubiere de dirigirse frente a quienes legítimamente ejercieren sus derechos, procederá la justa indemnización."),
    q("formas-actividad", "media",
      "Si fueren varios los medios de intervención admisibles frente a la terraza sin licencia, ¿cuál debe elegir el Ayuntamiento?",
      ["El menos restrictivo de la libertad individual",
       "El que resulte económicamente más barato para las arcas municipales, sin otro criterio",
       "El que decida discrecionalmente el agente actuante, sin ningún criterio previo",
       "Siempre el más restrictivo, para disuadir futuras infracciones"],
      "Art. 6.2 RSCL: si fueren varios los medios admisibles, se elegirá el menos restrictivo de la libertad individual."),
    q("formas-actividad", "facil",
      "El otro bar solicita correctamente la licencia para una terraza pequeña. ¿En qué plazo general debe resolverse una solicitud de este tipo (apertura de pequeños establecimientos)?",
      ["En el plazo de un mes, a contar de la fecha en que la solicitud hubiere ingresado en el Registro general",
       "En el plazo de dos meses, igual que para las obras de nueva construcción",
       "En el plazo de quince días, sin excepción",
       "No existe ningún plazo máximo para resolver este tipo de solicitudes"],
      "Art. 9.1.5º RSCL: las licencias para el ejercicio de actividades personales y apertura de pequeños establecimientos habrán de otorgarse o denegarse en el plazo de un mes."),
    q("formas-actividad", "dificil",
      "Transcurridos dos meses sin resolución expresa sobre esa licencia de terraza en la vía pública, un bien de dominio público, ¿qué sentido tiene el silencio administrativo?",
      ["Se entenderá denegada por silencio administrativo, al referirse la licencia a actividades en la vía pública o en bienes de dominio público",
       "Se entenderá otorgada por silencio administrativo, como en cualquier otra licencia de apertura",
       "El procedimiento caduca automáticamente, debiendo iniciarse uno nuevo",
       "El silencio administrativo no produce ningún efecto en materia de licencias municipales"],
      "Art. 9.1.7º.b) RSCL: si la licencia solicitada se refiere a actividades en la vía pública o en bienes de dominio público o patrimoniales, se entenderá denegada por silencio administrativo."),
    q("formas-actividad", "media",
      "¿A quién corresponde expedir los documentos en que se formalicen las licencias municipales y sus posibles transmisiones?",
      ["Al Secretario de la Corporación",
       "Al Alcalde, personal y exclusivamente, sin posibilidad de delegación",
       "A cualquier funcionario del servicio de licencias, sin necesidad de que sea el Secretario",
       "Al Interventor municipal, como garantía del cumplimiento presupuestario"],
      "Art. 9.3 RSCL: los documentos en que se formalicen las licencias y sus posibles transmisiones serán expedidos por el Secretario de la Corporación."),
    q("formas-actividad", "facil",
      "Las licencias municipales, ¿se entienden otorgadas sin perjuicio de los derechos de terceros y del derecho de propiedad?",
      ["Sí, las autorizaciones y licencias se entenderán otorgadas salvo el derecho de propiedad y sin perjuicio del de tercero",
       "No, la licencia municipal purga cualquier derecho de propiedad o de terceros existente",
       "Sí, pero únicamente respecto al derecho de propiedad, no respecto a otros derechos de terceros",
       "No, esa salvedad solo se aplica a las licencias de obras, nunca a las de apertura"],
      "Art. 12.1 RSCL: las autorizaciones y licencias se entenderán otorgadas salvo el derecho de propiedad y sin perjuicio del de tercero."),
    q("formas-actividad", "media",
      "Las disposiciones que dicte el Ayuntamiento con carácter general en esta materia, ¿qué forma deben revestir?",
      ["La forma de Ordenanza o Reglamento",
       "La forma de simple circular interna, sin necesidad de publicación",
       "La forma de decreto del Alcalde, exclusivamente",
       "No existe ninguna forma jurídica prevista para estas disposiciones generales"],
      "Art. 7.1 RSCL: las disposiciones acordadas por las Corporaciones locales para regir con carácter general revestirán la forma de Ordenanza o Reglamento."),
    q("formas-actividad", "dificil",
      "Sobre la subvención que la asociación de vecinos solicita para sus jornadas culturales, cuyo coste ya está cubierto en parte por otros medios, ¿qué límite máximo tiene el importe de esa subvención respecto al coste de la actividad?",
      ["No excederá, en ningún caso, del cincuenta por ciento del coste de la actividad a que se aplique",
       "Puede cubrir el cien por cien del coste total de la actividad, sin ningún límite",
       "No puede superar el diez por ciento del coste de la actividad",
       "El Reglamento no establece ningún límite porcentual para las subvenciones locales"],
      "Art. 26.1.4ª RSCL: las subvenciones no excederán, en ningún caso, del cincuenta por ciento del coste de la actividad a que se apliquen."),
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// CASO 2 — La piscina municipal
// ═══════════════════════════════════════════════════════════════════════
const CASO_2 = {
  slug: "caso-piscina-municipal-gestion-directa-indirecta",
  titulo: "La piscina municipal: gestión directa o concesión",
  orden: 2,
  supuesto:
    "El Ayuntamiento decide construir una nueva piscina municipal. Se plantea dos alternativas: gestionarla " +
    "directamente con personal y medios propios, o bien encomendar su explotación a una empresa privada " +
    "mediante concesión administrativa, que se encargaría también de construir las instalaciones. Como servicio " +
    "de nueva creación, el Ayuntamiento debe decidir el modo de gestión más adecuado. En paralelo, se plantea si " +
    "la actividad de socorrismo y vigilancia del orden en la piscina, al implicar cierto ejercicio de autoridad " +
    "frente a los usuarios, puede gestionarse de forma distinta al resto del servicio.",
  preguntas: [
    q("servicio-publico-concepto", "facil",
      "¿Tienen las Corporaciones locales plena potestad para constituir, organizar, modificar y suprimir los servicios de su competencia, como la nueva piscina municipal?",
      ["Sí, las Corporaciones locales tendrán plena potestad para constituir, organizar, modificar y suprimir los servicios de su competencia, tanto en el orden personal como en el económico o en cualesquiera otros aspectos",
       "No, esa potestad corresponde en exclusiva a la Comunidad Autónoma respectiva",
       "Sí, pero únicamente si cuentan con la autorización previa del Ministerio de Hacienda",
       "No, la creación de nuevos servicios exige siempre una ley estatal específica"],
      "Art. 30 RSCL: las Corporaciones locales tendrán plena potestad para constituir, organizar, modificar y suprimir los servicios de su competencia."),
    q("servicio-publico-concepto", "media",
      "Al reglamentar el nuevo servicio de la piscina, ¿qué debe determinar el Ayuntamiento respecto a sus usuarios?",
      ["Las modalidades de prestación, situación, deberes y derechos de los usuarios",
       "Únicamente el precio de la entrada, sin ninguna otra determinación",
       "Nada, pues el Reglamento no exige regular la posición de los usuarios de un servicio",
       "Solo el horario de apertura, sin regular derechos ni deberes"],
      "Art. 33 RSCL: las Corporaciones locales determinarán en la reglamentación de todo servicio las modalidades de prestación, situación, deberes y derechos de los usuarios."),
    q("servicio-publico-concepto", "facil",
      "Si un vecino discrepa de la resolución municipal sobre la modificación de este servicio, ¿ante qué orden jurisdiccional puede impugnarla?",
      ["Ante la jurisdicción contencioso-administrativa",
       "Ante la jurisdicción civil ordinaria, exclusivamente",
       "Ante la jurisdicción social, por tratarse de personal municipal",
       "Ninguna: las decisiones sobre constitución y modificación de servicios son irrecurribles"],
      "Art. 36 RSCL: las cuestiones sobre resoluciones de las Corporaciones locales relativas a constitución, organización, modificación y supresión de servicios públicos serán deferidas a la jurisdicción contencioso-administrativa."),
    q("gestion-directa", "media",
      "Si el Ayuntamiento decide gestionar la piscina por sí mismo o mediante un organismo exclusivamente dependiente, ¿cómo se denomina esa forma de gestión?",
      ["Gestión directa",
       "Gestión indirecta por concesión",
       "Gestión indirecta por concierto",
       "Municipalización con intervención de capital privado"],
      "Art. 41 RSCL: se entenderá por gestión directa la que para prestar los servicios de su competencia realicen las Corporaciones locales por sí mismas o mediante Organismos exclusivamente dependientes de ellas."),
    q("gestion-directa", "facil",
      "Para establecer la gestión directa de un servicio de la piscina, que no tiene carácter económico, mercantil o industrial, ¿qué basta conforme al Reglamento?",
      ["Basta el acuerdo de la Corporación en Pleno",
       "Es necesaria una autorización previa de la Comunidad Autónoma en todo caso",
       "Es necesario un referéndum vecinal previo",
       "Es necesaria una ley estatal específica para cada servicio"],
      "Art. 42.1 RSCL: para el establecimiento de la gestión directa de servicios que no tengan carácter económico, mercantil o industrial bastará el acuerdo de la Corporación en Pleno."),
    q("gestion-directa", "dificil",
      "Sobre la actividad de vigilancia del orden en la piscina, que implica cierto ejercicio de autoridad, ¿qué exige el Reglamento respecto a su modo de gestión?",
      ["Serán atendidas necesariamente por gestión directa las funciones que impliquen ejercicio de autoridad",
       "Pueden gestionarse indistintamente mediante concesión o concierto, sin ninguna limitación",
       "Deben gestionarse siempre mediante concierto con una entidad privada especializada",
       "El Reglamento no distingue el modo de gestión según el tipo de función desempeñada"],
      "Art. 43.1 RSCL: serán atendidas necesariamente por gestión directa las funciones que impliquen ejercicio de autoridad."),
    q("gestion-indirecta", "facil",
      "Si el Ayuntamiento opta por encomendar la construcción y explotación de la piscina a una empresa privada, ¿cuál de las siguientes es una forma de gestión indirecta admitida por el Reglamento?",
      ["La concesión",
       "La municipalización con participación total del capital público",
       "La gestión directa sin personalidad jurídica propia",
       "La desconcentración de funciones en un órgano interno"],
      "Art. 113.a) RSCL: los servicios de competencia de las Corporaciones locales podrán prestarse indirectamente mediante concesión, entre otras formas."),
    q("gestion-indirecta", "media",
      "La concesión otorgada a la empresa privada para construir y explotar la piscina, ¿puede comprender tanto la construcción de la instalación como la gestión posterior del servicio?",
      ["Sí, la concesión podrá comprender la construcción de una obra o instalación y la subsiguiente gestión del servicio a que estuviere afecta",
       "No, la concesión solo puede referirse a la gestión del servicio si la instalación ya existe previamente",
       "No, la construcción y la explotación deben ser objeto siempre de dos concesiones independientes",
       "Sí, pero solo si la empresa concesionaria es de capital íntegramente público"],
      "Art. 114.2.a) RSCL: la concesión podrá comprender la construcción de una obra o instalación y la subsiguiente gestión del servicio a que estuviere afecta."),
    q("gestion-indirecta", "dificil",
      "¿Cuál es el plazo máximo que puede fijarse para esa concesión, según las características del servicio y las inversiones a realizar por el concesionario?",
      ["No podrá exceder de cincuenta años",
       "No podrá exceder de diez años, en ningún caso",
       "No existe ningún límite máximo de duración para las concesiones de servicios locales",
       "El plazo máximo coincide siempre con la duración del mandato corporativo vigente"],
      "Art. 115.4ª RSCL: el plazo de la concesión, según las características del servicio y las inversiones que hubiere de realizar el concesionario, no podrá exceder de cincuenta años."),
    q("gestion-indirecta", "media",
      "Entre las cláusulas mínimas que deben fijarse en la concesión, ¿deben establecerse las tarifas que hubieren de percibirse del público?",
      ["Sí, deben fijarse las tarifas que hubieren de percibirse del público, con descomposición de sus factores constitutivos, como base de futuras revisiones",
       "No, las tarifas quedan a la libre determinación posterior del concesionario",
       "Sí, pero solo de forma orientativa, sin vinculación para el concesionario",
       "No, las tarifas de servicios públicos locales nunca pueden fijarse en el contrato de concesión"],
      "Art. 115.6ª RSCL: en toda concesión se fijarán, como mínimo, las tarifas que hubieren de percibirse del público, con descomposición de sus factores constitutivos, como base de futuras revisiones."),
  ],
};

for (const caso of [CASO_1, CASO_2]) {
  await crearCaso(caso);
}
console.log("✔ Casos prácticos del tema 11 (La actividad de las entidades locales) sembrados.");
