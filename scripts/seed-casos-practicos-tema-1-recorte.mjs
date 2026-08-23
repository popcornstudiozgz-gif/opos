/**
 * Casos prácticos — Tema 1 (Constitución Española), TANDA 2.
 *
 * Los 4 casos de `seed-casos-practicos-tema-1.mjs` se escribieron cuando
 * se pensaba usar la Constitución completa en este tema; el temario oficial
 * de esta oposición solo pide 4 secciones (`tema_oposicion.secciones_incluidas`
 * de tema-1): `titulo-preliminar`, `titulo-4`, `titulo-8-cap-1`,
 * `titulo-8-cap-2`. Desde que `getCasosPracticosDeTema`/`getCasoPractico`
 * filtran los casos por ese recorte (igual que el test), los 4 antiguos
 * quedan ocultos para esta oposición — siguen en Supabase por si una
 * oposición futura reutiliza tema-1 con un recorte más amplio.
 *
 * Estos 2 casos nuevos SÍ se ciñen al recorte real:
 *   5. Título Preliminar + Título IV (Gobierno y Administración Pública)
 *   6. Título VIII, Cap. I y II (organización territorial: principios
 *      generales y Administración Local)
 *
 * Mismo formato que la tanda 1: 10 preguntas encadenadas por caso, la
 * primera opción de cada `q(...)` es la correcta.
 *
 * Uso: node --env-file=.env.local scripts/seed-casos-practicos-tema-1-recorte.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

const TEMA = "tema-1";
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
// CASO 5 — Título Preliminar + Título IV (Gobierno y Administración)
// ═══════════════════════════════════════════════════════════════════════
const CASO_5 = {
  slug: "caso-nueva-ministra-administracion-publica",
  titulo: "El caso de la nueva Ministra y la reclamación de Carla",
  orden: 5,
  supuesto:
    "Tras las últimas elecciones generales y completado el proceso de investidura, toma posesión un nuevo " +
    "Gobierno de España. Entre sus primeros nombramientos, se designa Ministra de Transportes a doña Alicia " +
    "Ferrán, que hasta la semana anterior era directora general de una empresa privada de logística. El nuevo " +
    "Ministerio prepara un reglamento que modificará las condiciones de las licencias de transporte de " +
    "mercancías por carretera, y antes de aprobarlo abre un trámite de participación dirigido a las " +
    "asociaciones del sector afectadas. Semanas después, se convoca un proceso selectivo para cubrir una plaza " +
    "técnica en el Ministerio, al que se presenta don Bruno Sesé junto con otros muchos candidatos. Meses más " +
    "tarde, doña Carla Iranzo sufre daños en su vehículo al circular por un tramo de una carretera estatal en " +
    "mal estado, y decide reclamar a la Administración. Antes de resolver, el Ministerio consulta a un órgano " +
    "consultivo. Disconforme con la resolución final, Carla valora acudir a los tribunales.",
  preguntas: [
    q("titulo-preliminar", "facil",
      "Tras completarse la investidura del nuevo Gobierno, ¿cómo define el art. 1.3 CE la forma política del Estado español?",
      ["La Monarquía parlamentaria",
       "La República parlamentaria",
       "La Monarquía constitucional pura, sin control parlamentario",
       "Un Estado federal con Jefatura del Estado electiva"],
      "El art. 1.3 CE es una de las decisiones constituyentes básicas: «La forma política del Estado español es la Monarquía parlamentaria»."),
    q("titulo-preliminar", "media",
      "Antes de aprobar el reglamento sobre licencias de transporte, el Ministerio debe respetar el marco legal vigente y no puede contradecir la ley. ¿Qué principios garantiza el art. 9.3 CE frente a eso?",
      ["El principio de legalidad y el de jerarquía normativa, entre otros (también publicidad de las normas, seguridad jurídica, responsabilidad e interdicción de la arbitrariedad de los poderes públicos)",
       "Únicamente el principio de autonomía municipal",
       "El principio de unidad de mercado del art. 139 CE",
       "El principio de solidaridad interterritorial del art. 138 CE"],
      "El art. 9.3 CE enumera un catálogo de garantías del ordenamiento: legalidad, jerarquía normativa, publicidad de las normas, irretroactividad de las disposiciones sancionadoras no favorables, seguridad jurídica, responsabilidad e interdicción de la arbitrariedad de los poderes públicos."),
    q("titulo-4", "media",
      "¿Qué funciones atribuye el art. 97 CE al Gobierno, del que forma parte la nueva Ministra?",
      ["Dirige la política interior y exterior, la Administración civil y militar y la defensa del Estado, y ejerce la función ejecutiva y la potestad reglamentaria",
       "Únicamente ejerce la función ejecutiva, sin potestad reglamentaria alguna",
       "Dirige la Administración civil, pero no la militar, que corresponde al Rey",
       "Su única función es proponer las leyes a las Cortes Generales"],
      "El art. 97 CE resume las funciones nucleares del Gobierno: dirección política interior y exterior, dirección de la Administración civil y militar, defensa del Estado, función ejecutiva y potestad reglamentaria, todo ello «de acuerdo con la Constitución y las leyes»."),
    q("titulo-4", "media",
      "Doña Alicia Ferrán, ya nombrada Ministra, ¿puede seguir ejerciendo su antiguo cargo directivo en la empresa de logística, conforme al art. 98.3 CE?",
      ["No: los miembros del Gobierno no podrán ejercer otras funciones representativas que las propias del mandato parlamentario, ni cualquier otra función pública que no derive de su cargo, ni actividad profesional o mercantil alguna",
       "Sí, siempre que lo comunique previamente al Presidente del Gobierno",
       "Sí, si la actividad no genera conflicto de intereses con su cartera ministerial",
       "Sí, pero solo durante los primeros seis meses desde su nombramiento"],
      "El art. 98.3 CE es tajante: los miembros del Gobierno no pueden ejercer ninguna actividad profesional o mercantil, sin excepciones ligadas al tipo de actividad o a un plazo de gracia."),
    q("titulo-4", "media",
      "Antes de aprobar el reglamento de licencias de transporte, el Ministerio abre un trámite de participación con las asociaciones del sector afectadas. ¿En qué precepto constitucional encuentra cobertura esa actuación?",
      ["En el art. 105.a) CE, que remite a la ley la audiencia de los ciudadanos, directamente o a través de organizaciones y asociaciones reconocidas por la ley, en el procedimiento de elaboración de disposiciones administrativas que les afecten",
       "En el art. 23 CE, sobre el derecho de participación política directa",
       "En el art. 105.b) CE, sobre acceso a archivos y registros administrativos",
       "En el art. 9.2 CE, sobre la promoción de la igualdad real y efectiva"],
      "El art. 105.a) CE es el que específicamente prevé la audiencia de los ciudadanos y sus organizaciones en la elaboración de disposiciones administrativas que les afecten; el art. 105.b) se refiere, en cambio, al acceso a archivos y registros."),
    q("titulo-4", "media",
      "Don Bruno Sesé se presenta al proceso selectivo de una plaza técnica del Ministerio. ¿Con arreglo a qué principios debe regularse el acceso a la función pública según el art. 103.3 CE?",
      ["Los principios de mérito y capacidad",
       "El principio de libre designación por el titular del Ministerio",
       "El principio de antigüedad en la Administración",
       "El principio de proporcionalidad territorial entre candidatos"],
      "El art. 103.3 CE encomienda a la ley regular el acceso a la función pública «de acuerdo con los principios de mérito y capacidad», además del estatuto de los funcionarios, su derecho de sindicación y el régimen de incompatibilidades."),
    q("titulo-4", "facil",
      "Al margen del proceso selectivo, ¿con arreglo a qué principios generales debe actuar la Administración Pública en la que trabajará Bruno, según el art. 103.1 CE?",
      ["Eficacia, jerarquía, descentralización, desconcentración y coordinación, con sometimiento pleno a la ley y al Derecho",
       "Autonomía, oportunidad y discrecionalidad, sin sometimiento a la ley",
       "Unidad de mando exclusivamente, sin coordinación entre órganos",
       "Eficacia económica únicamente, como único criterio de actuación"],
      "El art. 103.1 CE fija los principios de actuación de toda Administración Pública, sirviendo con objetividad los intereses generales: eficacia, jerarquía, descentralización, desconcentración, coordinación, y sometimiento pleno a la ley y al Derecho."),
    q("titulo-4", "media",
      "Carla sufre daños en su vehículo por el mal estado de una carretera estatal. ¿Qué derecho le reconoce el art. 106.2 CE frente a la Administración?",
      ["Derecho a ser indemnizada por toda lesión que sufra en sus bienes o derechos, salvo en casos de fuerza mayor, siempre que la lesión sea consecuencia del funcionamiento de los servicios públicos",
       "Derecho a exigir la destitución del responsable del mantenimiento de la carretera",
       "Derecho a una indemnización solo si se prueba negligencia grave de un funcionario concreto",
       "Ningún derecho constitucional: la responsabilidad patrimonial de la Administración no está reconocida en la Constitución"],
      "El art. 106.2 CE constitucionaliza la responsabilidad patrimonial de la Administración: basta con que la lesión sea consecuencia del funcionamiento de los servicios públicos (sin exigir culpa de un funcionario concreto), salvo fuerza mayor."),
    q("titulo-4", "dificil",
      "Antes de resolver la reclamación de Carla, el Ministerio consulta a un órgano consultivo. ¿A qué órgano se refiere el art. 107 CE como «supremo órgano consultivo del Gobierno»?",
      ["Al Consejo de Estado",
       "Al Consejo General del Poder Judicial",
       "Al Tribunal de Cuentas",
       "Al Defensor del Pueblo"],
      "El art. 107 CE reserva ese papel al Consejo de Estado, cuya composición y competencia se remiten a una ley orgánica; no debe confundirse con el Consejo General del Poder Judicial (gobierno de los jueces) ni con el Tribunal de Cuentas (fiscalización económica)."),
    q("titulo-4", "media",
      "Disconforme con la resolución final sobre su reclamación, Carla valora acudir a los tribunales. ¿Qué le garantiza el art. 106.1 CE al respecto?",
      ["Que los Tribunales controlan la potestad reglamentaria y la legalidad de la actuación administrativa, así como el sometimiento de esta a los fines que la justifican",
       "Que solo el Defensor del Pueblo puede revisar la actuación de la Administración, no los Tribunales",
       "Que la actuación administrativa firme no puede ser revisada judicialmente en ningún caso",
       "Que únicamente el Tribunal Constitucional puede controlar la legalidad de la actuación administrativa"],
      "El art. 106.1 CE es la base constitucional del control judicial de la Administración: los Tribunales fiscalizan tanto la potestad reglamentaria como la legalidad y la finalidad de la actuación administrativa, control que no sustituye ni queda reservado al Defensor del Pueblo ni al Tribunal Constitucional."),
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// CASO 6 — Título VIII, Cap. I y II (organización territorial: principios
// generales y Administración Local)
// ═══════════════════════════════════════════════════════════════════════
const CASO_6 = {
  slug: "caso-valcierzo-municipio-concejo-abierto",
  titulo: "El caso del pequeño municipio de Valcierzo",
  orden: 6,
  supuesto:
    "Valcierzo es un municipio de la provincia de Soria con apenas 87 habitantes censados. En las últimas " +
    "elecciones municipales, sus vecinos deciden acogerse al régimen de concejo abierto para gestionar los " +
    "asuntos comunes directamente en asamblea vecinal. La Diputación Provincial de Soria, que gestiona buena " +
    "parte de los servicios supramunicipales de la zona, estudia una propuesta para agrupar Valcierzo con dos " +
    "pequeños municipios vecinos en una mancomunidad, sin que ello suponga alterar los límites de la provincia. " +
    "Por su reducida base tributaria, el Ayuntamiento de Valcierzo depende en gran medida de la participación " +
    "en tributos estatales y autonómicos para financiar sus servicios, y ha solicitado ayudas especiales por su " +
    "condición de zona en riesgo de despoblación. Además, el municipio vecino de Robledillo, tras una disputa " +
    "histórica de términos, ha instalado una barrera que dificulta el paso de los vecinos de Valcierzo hacia la " +
    "carretera principal.",
  preguntas: [
    q("titulo-8-cap-1", "facil",
      "¿En qué entidades territoriales se organiza el Estado según el art. 137 CE, y qué reconoce este precepto a todas ellas?",
      ["En municipios, provincias y las Comunidades Autónomas que se constituyan; todas gozan de autonomía para la gestión de sus respectivos intereses",
       "Únicamente en municipios y Comunidades Autónomas, sin mención a las provincias",
       "En municipios, provincias y regiones, sujetas todas ellas a tutela del Estado",
       "En Comunidades Autónomas exclusivamente, de las que dependen municipios y provincias"],
      "El art. 137 CE es el primer precepto del Título VIII: el Estado se organiza en municipios, provincias y Comunidades Autónomas, y las tres gozan de autonomía para gestionar sus propios intereses (no de soberanía, que corresponde solo al Estado)."),
    q("titulo-8-cap-2", "facil",
      "¿A quién corresponde el gobierno y la administración de Valcierzo, y con qué personalidad cuenta el municipio, según el art. 140 CE?",
      ["A su Ayuntamiento, integrado por el Alcalde y los Concejales; el municipio goza de personalidad jurídica plena",
       "A la Diputación Provincial de Soria, de la que depende jerárquicamente",
       "Al Gobierno de la Comunidad Autónoma, por tratarse de un municipio muy pequeño",
       "Al Delegado del Gobierno en la provincia"],
      "El art. 140 CE garantiza la autonomía municipal: personalidad jurídica plena, y gobierno y administración a cargo del Ayuntamiento (Alcalde y Concejales), sin subordinación jerárquica a la Diputación ni a la Comunidad Autónoma."),
    q("titulo-8-cap-2", "media",
      "Los vecinos de Valcierzo deciden acogerse al régimen de concejo abierto. ¿Qué dice el art. 140 CE sobre este régimen?",
      ["Que la ley regulará las condiciones en las que proceda el régimen de concejo abierto",
       "Que el concejo abierto solo puede acordarse por decreto del Gobierno de la Comunidad Autónoma",
       "Que el concejo abierto está reservado a las capitales de provincia",
       "Que el concejo abierto sustituye a la elección de Concejales en cualquier municipio, sea cual sea su población"],
      "El propio art. 140 CE se limita a remitir a la ley la regulación de las condiciones del concejo abierto; es la legislación de régimen local la que concreta a qué municipios (típicamente los de muy escasa población, como Valcierzo) se aplica."),
    q("titulo-8-cap-2", "media",
      "Al margen del concejo abierto, ¿cómo se eligen con carácter general los Concejales de un municipio según el art. 140 CE?",
      ["Por los vecinos del municipio, mediante sufragio universal, igual, libre, directo y secreto",
       "Por la Diputación Provincial, a propuesta de los partidos políticos",
       "Por el Alcalde saliente, entre los vecinos censados",
       "Por sorteo entre los vecinos mayores de edad del municipio"],
      "El art. 140 CE exige para los Concejales el mismo estándar de sufragio universal, igual, libre, directo y secreto que rige las demás elecciones representativas; el Alcalde, a su vez, es elegido por los Concejales o por los vecinos, según la ley."),
    q("titulo-8-cap-2", "media",
      "La Diputación estudia agrupar Valcierzo con otros municipios sin tocar los límites de la provincia de Soria. Si en cambio se planteara alterar esos límites provinciales, ¿mediante qué instrumento debería aprobarse según el art. 141.1 CE?",
      ["Mediante ley orgánica de las Cortes Generales",
       "Mediante acuerdo de la propia Diputación Provincial, sin intervención estatal",
       "Mediante decreto del Consejo de Ministros",
       "Mediante referéndum vecinal en los municipios afectados, sin intervención de las Cortes"],
      "El art. 141.1 CE exige el rango más reforzado, ley orgánica de las Cortes Generales, para alterar los límites provinciales, precisamente para blindar la división provincial frente a cambios discrecionales."),
    q("titulo-8-cap-2", "facil",
      "¿A qué órgano encomienda el art. 141.2 CE el gobierno y la administración autónoma de la provincia de Soria?",
      ["A la Diputación Provincial u otra Corporación de carácter representativo",
       "Al Delegado del Gobierno en la provincia",
       "Al Ayuntamiento de la capital de provincia",
       "Al Gobierno de la Comunidad Autónoma"],
      "El art. 141.2 CE atribuye el gobierno y la administración autónoma de la provincia a las Diputaciones «u otras Corporaciones de carácter representativo», nunca a un órgano de la Administración periférica del Estado."),
    q("titulo-8-cap-2", "media",
      "¿Permite la Constitución que Valcierzo se agrupe con otros municipios en una entidad distinta de la provincia, como plantea la Diputación?",
      ["Sí: el art. 141.3 CE permite expresamente crear agrupaciones de municipios diferentes de la provincia",
       "No: la provincia es la única agrupación de municipios que admite la Constitución",
       "Solo si los tres municipios pertenecen a la misma Comunidad Autónoma y lo autoriza una ley orgánica",
       "Solo en los archipiélagos, mediante Cabildos o Consejos insulares"],
      "El art. 141.3 CE deja abierta la puerta a agrupaciones de municipios distintas de la provincia (mancomunidades, comarcas...), sin exigir ley orgánica ni limitarlo a los archipiélagos, que es el supuesto específico del art. 141.4 CE (Cabildos y Consejos)."),
    q("titulo-8-cap-2", "media",
      "¿De qué debe disponer la Hacienda de Valcierzo según el art. 142 CE para desempeñar sus funciones, y de qué se nutre fundamentalmente?",
      ["De medios suficientes; se nutre fundamentalmente de tributos propios y de la participación en los del Estado y de las Comunidades Autónomas",
       "Exclusivamente de tributos propios, sin participación en tributos de otras Administraciones",
       "De una asignación fija anual del Estado, igual para todos los municipios",
       "De subvenciones europeas, con carácter prioritario sobre cualquier otro recurso"],
      "El art. 142 CE exige medios suficientes para las Haciendas locales y señala sus dos grandes fuentes: tributos propios y participación en los tributos del Estado y de las Comunidades Autónomas — clave para un municipio como Valcierzo, con escasa base tributaria propia."),
    q("titulo-8-cap-1", "media",
      "Valcierzo solicita ayudas especiales por su riesgo de despoblación. ¿Qué principio constitucional ampara esa petición según el art. 138.1 CE?",
      ["El principio de solidaridad, que obliga al Estado a velar por un equilibrio económico adecuado y justo entre las diversas partes del territorio, atendiendo en particular a circunstancias específicas como la insularidad",
       "El principio de igualdad formal, que impide cualquier trato diferenciado entre municipios",
       "El principio de autonomía financiera, que obliga a cada municipio a autofinanciarse sin ayudas externas",
       "El principio de unidad de mercado, que prohíbe cualquier ayuda pública selectiva"],
      "El art. 138.1 CE encomienda al Estado garantizar la solidaridad interterritorial, velando por un equilibrio económico adecuado y justo entre las partes del territorio; menciona expresamente el hecho insular como ejemplo de circunstancia atendible, sin que la lista sea cerrada."),
    q("titulo-8-cap-1", "media",
      "La barrera instalada por Robledillo dificulta el paso de los vecinos de Valcierzo hacia la carretera principal. ¿Es eso compatible con el art. 139.2 CE?",
      ["No: ninguna autoridad puede adoptar medidas que directa o indirectamente obstaculicen la libertad de circulación y establecimiento de las personas, ni la libre circulación de bienes, en todo el territorio español",
       "Sí, siempre que la barrera se justifique por un conflicto histórico de términos municipales",
       "Sí, si la instala una autoridad local y no una autoridad estatal o autonómica",
       "No, pero solo si la barrera afecta también a la circulación de mercancías, no de personas"],
      "El art. 139.2 CE protege la libre circulación de personas y bienes en todo el territorio nacional frente a cualquier autoridad, sin excepción por el nivel territorial de quien adopte la medida ni por la existencia de un litigio de términos que, en todo caso, debe resolverse por otras vías."),
  ],
};

for (const caso of [CASO_5, CASO_6]) {
  await crearCaso(caso);
}
console.log("✔ Segunda tanda de casos prácticos del tema 1 (recorte real de esta oposición) sembrada.");
