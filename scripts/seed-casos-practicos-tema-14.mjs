/**
 * Casos prácticos — Tema 14 (El municipio y régimen especial de Zaragoza,
 * Ley 7/1985 de Bases del Régimen Local + Ley 10/2017 de Capitalidad).
 * 2 casos de 10 preguntas cada uno, abre el bloque de régimen local:
 *   1. El nuevo vecino de Torrero: territorio, población, Padrón y
 *      servicios mínimos obligatorios (arts. 11-17, 25-26 LBRL)
 *   2. Zaragoza, municipio de gran población: organización de los
 *      municipios de gran población y régimen especial de capitalidad
 *      (arts. 121-123 LBRL; arts. 1-6 Ley 10/2017)
 *
 * Reutiliza las secciones ya usadas por las preguntas sueltas del tema
 * (municipio-territorio-poblacion, servicios-minimos,
 * municipios-gran-poblacion, capitalidad-zaragoza-general). Misma
 * mecánica que los casos anteriores: preguntas/opciones en las tablas ya
 * existentes, enlazadas vía caso_preguntas con su `orden`. La primera
 * opción de cada pregunta es siempre la correcta (el cliente baraja el
 * orden al mostrarlas).
 *
 * Uso: node --env-file=.env.local scripts/seed-casos-practicos-tema-14.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

const TEMA = "tema-14";
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
// CASO 1 — El nuevo vecino de Torrero
// ═══════════════════════════════════════════════════════════════════════
const CASO_1 = {
  slug: "caso-nuevo-vecino-torrero-territorio-poblacion-servicios",
  titulo: "El nuevo vecino de Torrero: territorio, población y servicios mínimos",
  orden: 1,
  supuesto:
    "Hassan se traslada a vivir de forma habitual al barrio de Torrero, en Zaragoza, procedente de otra ciudad " +
    "donde también estuvo empadronado. Solicita su inscripción en el Padrón municipal, aportando su nombre y " +
    "apellidos, domicilio con referencia catastral, nacionalidad y documento de identidad. El Ayuntamiento " +
    "comprueba que a Zaragoza, con más de 650.000 habitantes, le corresponde prestar todos los servicios " +
    "mínimos obligatorios previstos en la ley, incluidos los reservados a los municipios de mayor población. En " +
    "un municipio vecino, de apenas 800 habitantes, los responsables municipales se preguntan qué servicios " +
    "mínimos deben prestar obligatoriamente, y si la Diputación Provincial puede coordinar alguno de ellos.",
  preguntas: [
    q("municipio-territorio-poblacion", "facil",
      "Al trasladarse a vivir de forma habitual a Zaragoza, ¿está Hassan obligado a inscribirse en el Padrón municipal?",
      ["Sí, toda persona que viva en España está obligada a inscribirse en el Padrón del municipio en el que resida habitualmente",
       "No, la inscripción en el Padrón es siempre voluntaria para cualquier persona",
       "Sí, pero únicamente si es de nacionalidad española",
       "No, solo están obligados a empadronarse quienes sean propietarios de una vivienda"],
      "Art. 15 LBRL: toda persona que viva en España está obligada a inscribirse en el Padrón del municipio en el que resida habitualmente."),
    q("municipio-territorio-poblacion", "media",
      "Como procede de otra ciudad donde también estuvo empadronado, ¿en cuántos municipios puede figurar inscrito Hassan al mismo tiempo?",
      ["Únicamente en uno: quien viva en varios municipios deberá inscribirse solo en el que habite durante más tiempo al año",
       "En todos los municipios en los que haya residido a lo largo de su vida",
       "En dos municipios como máximo, sin más condición",
       "El número de inscripciones simultáneas depende de si es propietario o inquilino"],
      "Art. 15 LBRL: quien viva en varios municipios deberá inscribirse únicamente en el que habite durante más tiempo al año."),
    q("municipio-territorio-poblacion", "facil",
      "¿Qué condición adquiere Hassan en el mismo momento de su inscripción en el Padrón?",
      ["La condición de vecino del municipio",
       "La condición de residente fiscal, a todos los efectos tributarios",
       "Ninguna condición jurídica específica, más allá de un mero registro estadístico",
       "La condición de elector, con independencia de su nacionalidad"],
      "Art. 15 LBRL: los inscritos en el Padrón municipal son los vecinos del municipio, y la condición de vecino se adquiere en el mismo momento de su inscripción."),
    q("municipio-territorio-poblacion", "media",
      "Entre los datos que Hassan aporta, ¿es su nacionalidad un dato obligatorio de la inscripción padronal?",
      ["Sí, la nacionalidad figura expresamente entre los datos obligatorios de la inscripción en el Padrón municipal",
       "No, la nacionalidad es un dato de aportación exclusivamente voluntaria",
       "Sí, pero solo se exige a los ciudadanos extranjeros, nunca a los españoles",
       "No, ese dato fue suprimido del contenido obligatorio del Padrón"],
      "Art. 16.2.d) LBRL: la inscripción en el Padrón municipal contendrá como dato obligatorio la nacionalidad."),
    q("municipio-territorio-poblacion", "dificil",
      "¿A quién corresponde la formación, mantenimiento, revisión y custodia del Padrón municipal de Zaragoza?",
      ["Al Ayuntamiento, de acuerdo con lo que establezca la legislación del Estado",
       "Al Instituto Nacional de Estadística, con carácter exclusivo y excluyente",
       "A la Diputación Provincial de Zaragoza, en todo caso",
       "Al Gobierno de Aragón, como Administración autonómica competente"],
      "Art. 17.1 LBRL: la formación, mantenimiento, revisión y custodia del Padrón municipal corresponde al Ayuntamiento, de acuerdo con la legislación del Estado."),
    q("municipio-territorio-poblacion", "facil",
      "¿Qué carácter tienen las certificaciones que expide el Ayuntamiento con los datos del Padrón?",
      ["Carácter de documento público y fehaciente para todos los efectos administrativos",
       "Carácter meramente informativo, sin ningún valor probatorio",
       "Carácter reservado, no pudiendo expedirse certificaciones a los propios interesados",
       "Carácter provisional, sujeto siempre a ratificación notarial posterior"],
      "Art. 16.1 LBRL: las certificaciones de los datos padronales tendrán carácter de documento público y fehaciente para todos los efectos administrativos."),
    q("servicios-minimos", "facil",
      "Al tener Zaragoza más de 650.000 habitantes, ¿qué nivel de servicios mínimos obligatorios le corresponde prestar?",
      ["Todos los niveles previstos en la Ley: los de todos los municipios, los de más de 5.000, más de 20.000 y más de 50.000 habitantes, incluidos transporte colectivo urbano y medio ambiente urbano",
       "Únicamente los servicios mínimos exigidos a los municipios de más de 5.000 habitantes",
       "Solo los servicios que decida discrecionalmente el Pleno municipal, sin sujeción a ningún mínimo legal",
       "Los mismos servicios mínimos que un municipio de 3.000 habitantes, sin ninguna diferencia"],
      "Art. 26.1 LBRL: los municipios con población superior a 50.000 habitantes deben prestar, además de los servicios de los tramos inferiores, transporte colectivo urbano de viajeros y medio ambiente urbano."),
    q("servicios-minimos", "media",
      "El municipio vecino de apenas 800 habitantes, ¿qué servicios mínimos debe prestar en todo caso?",
      ["Alumbrado público, cementerio, recogida de residuos, limpieza viaria, abastecimiento domiciliario de agua potable, alcantarillado, acceso a los núcleos de población y pavimentación de las vías públicas",
       "Ningún servicio mínimo obligatorio, al tratarse de un municipio de menos de 1.000 habitantes",
       "Únicamente el servicio de recogida de residuos, siendo el resto potestativos",
       "Los mismos servicios exigidos a los municipios de más de 20.000 habitantes"],
      "Art. 26.1.a) LBRL: en todos los municipios deben prestarse, como mínimo, alumbrado público, cementerio, recogida de residuos, limpieza viaria, abastecimiento de agua, alcantarillado, acceso a los núcleos de población y pavimentación de vías públicas."),
    q("servicios-minimos", "dificil",
      "Al tener menos de 20.000 habitantes, ¿puede la Diputación Provincial coordinar la prestación de algunos de esos servicios mínimos en ese municipio?",
      ["Sí, en los municipios con población inferior a 20.000 habitantes será la Diputación Provincial la que coordinará servicios como la recogida y tratamiento de residuos, el abastecimiento de agua, la limpieza viaria o el alumbrado público",
       "No, cada municipio debe prestar en solitario todos sus servicios mínimos, sea cual sea su población",
       "Sí, pero únicamente si el municipio tiene menos de 100 habitantes",
       "No, la coordinación de servicios por la Diputación fue suprimida por la Ley de Bases de Régimen Local"],
      "Art. 26.2 LBRL: en los municipios con población inferior a 20.000 habitantes será la Diputación Provincial la que coordinará la prestación de determinados servicios mínimos."),
    q("servicios-minimos", "media",
      "¿Puede el municipio vecino asumir por sí mismo la prestación de esos servicios en lugar de la Diputación, si demuestra un coste efectivo menor?",
      ["Sí, cuando el municipio justifique ante la Diputación que puede prestar estos servicios con un coste efectivo menor que el derivado de la forma de gestión propuesta, podrá asumir su prestación y coordinación si la Diputación lo considera acreditado",
       "No, una vez que la Diputación asume la coordinación de un servicio, el municipio pierde definitivamente esa posibilidad",
       "Sí, sin necesidad de acreditar nada ante la Diputación Provincial",
       "No, esa posibilidad solo está prevista para los municipios de más de 20.000 habitantes"],
      "Art. 26.2 LBRL: cuando el municipio justifique un coste efectivo menor, podrá asumir la prestación y coordinación de estos servicios si la Diputación lo considera acreditado."),
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// CASO 2 — Zaragoza, municipio de gran población
// ═══════════════════════════════════════════════════════════════════════
const CASO_2 = {
  slug: "caso-zaragoza-municipio-gran-poblacion-capitalidad",
  titulo: "Zaragoza, municipio de gran población: organización y régimen especial",
  orden: 2,
  supuesto:
    "El Ayuntamiento de Zaragoza, capital de la Comunidad Autónoma de Aragón y con una población muy superior a " +
    "175.000 habitantes, se rige por el régimen especial de organización de los municipios de gran población, " +
    "además de por su propia Ley de Capitalidad. El Pleno municipal, formado por el Alcalde y los concejales, " +
    "aprueba su reglamento orgánico y crea varias Comisiones formadas por los distintos grupos políticos en " +
    "proporción a su representación. El Ayuntamiento se plantea también plantear un conflicto en defensa de su " +
    "autonomía local frente a una disposición legal que considera lesiva, y reivindica sus títulos honoríficos " +
    "históricos en los documentos solemnes.",
  preguntas: [
    q("municipios-gran-poblacion", "facil",
      "¿Por qué motivo, entre otros, resulta de aplicación a Zaragoza el régimen especial de organización de los municipios de gran población?",
      ["Por ser capital de provincia con población superior a 175.000 habitantes, y además capital autonómica",
       "Únicamente porque su población supera los 250.000 habitantes, sin ningún otro criterio relevante",
       "Porque así lo decidió unilateralmente el Ayuntamiento, sin intervención de las Cortes de Aragón",
       "Porque se trata de un municipio fronterizo con otra Comunidad Autónoma"],
      "Art. 121.1.b) y c) LBRL: el régimen se aplica a los municipios capitales de provincia con más de 175.000 habitantes y a los que sean capitales autonómicas."),
    q("municipios-gran-poblacion", "media",
      "Si Zaragoza, en un hipotético futuro, redujera su población oficial por debajo del límite establecido en la Ley, ¿dejaría de aplicársele el régimen de municipios de gran población?",
      ["No, los municipios a los que resulte de aplicación este régimen continuarán rigiéndose por el mismo aun cuando su cifra oficial de población se reduzca posteriormente por debajo del límite establecido",
       "Sí, dejaría de aplicarse automáticamente en el ejercicio siguiente a la reducción de población",
       "Sí, pero solo si la reducción se mantiene durante más de cuatro mandatos consecutivos",
       "No se aplica ninguna regla especial para este supuesto en la Ley de Bases de Régimen Local"],
      "Art. 121.3 LBRL: los municipios a los que resulte de aplicación este régimen continuarán rigiéndose por el mismo aun cuando su población se reduzca posteriormente."),
    q("municipios-gran-poblacion", "facil",
      "¿Cuál es el órgano de máxima representación política de los ciudadanos en el gobierno municipal de Zaragoza?",
      ["El Pleno, formado por el Alcalde y los Concejales",
       "La Junta de Gobierno Local, formada por los concejales designados libremente por el Alcalde",
       "El Consejo Social de la Ciudad, como órgano de participación ciudadana",
       "El Secretario General del Pleno, como máxima autoridad técnica municipal"],
      "Art. 122.1 LBRL: el Pleno, formado por el Alcalde y los Concejales, es el órgano de máxima representación política de los ciudadanos en el gobierno municipal."),
    q("municipios-gran-poblacion", "media",
      "¿Qué naturaleza tiene el reglamento propio con el que se dota el Pleno de Zaragoza?",
      ["Naturaleza orgánica",
       "Naturaleza puramente reglamentaria ordinaria, sin ninguna especialidad",
       "Naturaleza de mera instrucción interna, sin eficacia jurídica externa",
       "Naturaleza de ordenanza fiscal, al regular también aspectos económicos"],
      "Art. 122.3 LBRL: el Pleno se dotará de su propio reglamento, que tendrá la naturaleza de orgánico."),
    q("municipios-gran-poblacion", "dificil",
      "Las Comisiones del Pleno, formadas por los miembros que designen los grupos políticos en proporción a su representación, ¿qué funciones tienen, entre otras?",
      ["El estudio, informe o consulta de los asuntos que hayan de someterse al Pleno, y el seguimiento de la gestión del Alcalde y su equipo de gobierno, sin perjuicio del control que corresponde al Pleno",
       "Únicamente funciones decorativas y protocolarias, sin ninguna función sustantiva",
       "La aprobación definitiva del presupuesto municipal, en sustitución del Pleno",
       "La representación exclusiva del Ayuntamiento ante los tribunales de justicia"],
      "Art. 122.4 LBRL: corresponde a las comisiones el estudio, informe o consulta de los asuntos a someter al Pleno, y el seguimiento de la gestión del Alcalde y su equipo de gobierno."),
    q("municipios-gran-poblacion", "media",
      "¿A qué funcionarios quedan reservadas las funciones de asesoramiento legal, fe pública y las demás propias del Secretario General del Pleno?",
      ["A funcionarios de Administración local con habilitación de carácter nacional",
       "A cualquier funcionario del Grupo A designado libremente por el Alcalde",
       "A un abogado externo contratado específicamente para cada mandato",
       "Al personal eventual de confianza política del equipo de gobierno"],
      "Art. 122.5 LBRL (in fine): dichas funciones quedan reservadas a funcionarios de Administración local con habilitación de carácter nacional."),
    q("capitalidad-zaragoza-general", "facil",
      "¿Qué régimen específico goza el municipio de Zaragoza, según el artículo 1 de su Ley de Capitalidad?",
      ["El régimen especial establecido en la propia Ley 10/2017, por su condición de capital de la Comunidad Autónoma de Aragón",
       "El mismo régimen general que cualquier otro municipio aragonés, sin ninguna especialidad",
       "Un régimen de capitalidad compartido a partes iguales con la ciudad de Huesca",
       "Un régimen provisional, pendiente de aprobación definitiva por las Cortes Generales"],
      "Art. 1 Ley 10/2017: el municipio de Zaragoza, capital de la Comunidad Autónoma de Aragón, goza del régimen especial establecido en esta Ley."),
    q("capitalidad-zaragoza-general", "media",
      "¿Goza el municipio de Zaragoza de personalidad jurídica propia y plena capacidad de obrar para gestionar los asuntos de interés público que afecten a sus ciudadanos?",
      ["Sí, de acuerdo con la autonomía garantizada constitucionalmente, el municipio de Zaragoza goza de personalidad jurídica propia, plena capacidad de obrar y potestades suficientes para ordenar y gestionar esos asuntos",
       "No, esa capacidad corresponde en exclusiva al Gobierno de Aragón, actuando el Ayuntamiento como mero órgano desconcentrado",
       "Sí, pero únicamente en materia de urbanismo, no en el resto de competencias municipales",
       "No, la Ley de Capitalidad limita la capacidad de obrar del municipio respecto al régimen general"],
      "Art. 2 Ley 10/2017: el municipio de Zaragoza goza de personalidad jurídica propia, plena capacidad de obrar y potestades suficientes para ordenar y gestionar los asuntos de interés público que afecten a sus ciudadanos."),
    q("capitalidad-zaragoza-general", "dificil",
      "Si el Ayuntamiento de Zaragoza quisiera plantear un conflicto en defensa de su autonomía local frente a una disposición legal del Estado o de la Comunidad Autónoma que la lesionara, ¿tiene legitimación para ello?",
      ["Sí, tiene legitimación para plantear conflictos en defensa de la autonomía local contra disposiciones con rango de Ley que la lesionen, y para promover su impugnación ante el Tribunal Constitucional",
       "No, esa legitimación corresponde en exclusiva a la Federación Aragonesa de Municipios, Comarcas y Provincias",
       "Sí, pero únicamente respecto de disposiciones autonómicas, nunca frente a leyes del Estado",
       "No, el municipio de Zaragoza carece de legitimación procesal ante el Tribunal Constitucional"],
      "Art. 4 Ley 10/2017: el municipio de Zaragoza tiene legitimación para plantear conflictos en defensa de la autonomía local contra disposiciones con rango de Ley que la lesionen, y para impugnarlas ante el Tribunal Constitucional."),
    q("capitalidad-zaragoza-general", "media",
      "Salvo en documentos solemnes, ¿qué título honorífico utiliza habitualmente la ciudad de Zaragoza según su Ley de Capitalidad?",
      ["El título de Inmortal",
       "El título de Muy Noble, exclusivamente",
       "El título de Siempre Heroica, con carácter preferente sobre los demás",
       "La Ley de Capitalidad no reconoce ningún título honorífico a la ciudad"],
      "Art. 6 Ley 10/2017: salvo en documentos solemnes, en los que se consignarán todos los títulos, habitualmente se utilizará el título de Inmortal."),
  ],
};

for (const caso of [CASO_1, CASO_2]) {
  await crearCaso(caso);
}
console.log("✔ Casos prácticos del tema 14 (El municipio y régimen especial de Zaragoza) sembrados.");
