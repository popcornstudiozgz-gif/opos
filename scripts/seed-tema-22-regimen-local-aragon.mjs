/**
 * Alta del tema canónico nuevo: "Régimen local español y de Aragón" — para
 * el Tema 4 de la oposición de la DPZ ("Régimen local español. Principios
 * constitucionales y regulación jurídica. El régimen jurídico de la
 * Administración Local de Aragón. Normativa de la Comunidad Autónoma de
 * Aragón en materia de Régimen Local.").
 *
 * Dos secciones, dos normas distintas:
 * - regimen-local-general: LBRL (Ley 7/1985), Título I "Disposiciones
 *   generales" (arts. 1-10) — autonomía local, entidades locales,
 *   potestades y competencias propias/delegadas. Nadie lo había sembrado
 *   todavía: el Ayuntamiento de Zaragoza no lo necesitaba porque, siendo
 *   el propio municipio, entra directamente en los temas de organización
 *   local concretos.
 * - administracion-local-aragon: Ley 7/1999, de Administración Local de
 *   Aragón, Título I "Disposiciones generales" (arts. 1-6) — verificado
 *   contra el texto consolidado del BOE (BOE-A-1999-10151), no una
 *   paráfrasis.
 *
 * Fiel a content-raw/ley-7-1985-bases-regimen-local/01-titulo1-disposiciones-generales.md
 * y al texto literal de la Ley 7/1999 (BOE-A-1999-10151, arts. 1-6),
 * extraído directamente del HTML consolidado del BOE.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-22-regimen-local-aragon.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

async function upsert(tabla, filas, onConflict) {
  const res = await fetch(`${URL_BASE}/rest/v1/${tabla}?on_conflict=${onConflict}`, {
    method: "POST",
    headers: { ...HEADERS, Prefer: "resolution=merge-duplicates,return=representation" },
    body: JSON.stringify(filas),
  });
  if (!res.ok) { console.error(`❌ Error insertando en ${tabla}: ${res.status} ${await res.text()}`); process.exit(1); }
  const data = await res.json();
  console.log(`   ✓ ${tabla}: ${data.length} filas`);
  return data;
}

const TEMA = "tema-22";
const p = (seccion, dificultad, pregunta, opciones, explicacion) => ({ seccion, dificultad, pregunta, opciones, explicacion });

const ITEMS = [
  // ── Régimen local general (LBRL, Título I, arts. 1-10) ──────────────────
  p("regimen-local-general", "facil",
    "¿Cómo define el art. 1.1 LBRL a los Municipios?",
    ["Entidades básicas de la organización territorial del Estado y cauces inmediatos de participación ciudadana, que institucionalizan y gestionan con autonomía los intereses propios de sus colectividades",
     "Divisiones puramente administrativas, sin autonomía para gestionar sus propios intereses",
     "Delegaciones territoriales de la Comunidad Autónoma correspondiente",
     "Entidades cuya autonomía depende de lo que decida en cada caso la Diputación Provincial"],
    "El art. 1.1 LBRL vincula al municipio dos rasgos: ser cauce de participación ciudadana y gestionar con autonomía (no por delegación) los intereses propios de su comunidad."),
  p("regimen-local-general", "media",
    "¿Con qué principios debe atribuirse a las entidades locales su derecho a intervenir en los asuntos que afecten a sus intereses, según el art. 2.1 LBRL?",
    ["Descentralización, proximidad, eficacia y eficiencia, con sujeción a la normativa de estabilidad presupuestaria",
     "Centralización, jerarquía y subordinación a la Administración autonómica",
     "Exclusivamente el principio de eficacia económica, sin otros criterios",
     "El principio de antigüedad de la entidad local en el ejercicio de la competencia"],
    "El art. 2.1 LBRL formula la llamada «garantía institucional» de la autonomía local: la legislación sectorial debe atribuir competencias según estos principios, no de forma arbitraria."),
  p("regimen-local-general", "facil",
    "¿Cuáles son las Entidades Locales territoriales según el art. 3.1 LBRL?",
    ["El Municipio, la Provincia, y la Isla en los archipiélagos balear y canario",
     "Únicamente el Municipio y la Comarca",
     "El Municipio, la Provincia y la Comunidad Autónoma",
     "El Municipio y la Mancomunidad de municipios, exclusivamente"],
    "El art. 3.1 LBRL reserva la condición de Entidades Locales «territoriales» (el núcleo duro) a Municipio, Provincia e Isla; comarcas, áreas metropolitanas y mancomunidades tienen la condición de Entidades Locales pero no esa naturaleza territorial básica (art. 3.2)."),
  p("regimen-local-general", "media",
    "¿Qué entidades tienen la condición de Entidades Locales, sin ser territoriales, según el art. 3.2 LBRL?",
    ["Las Comarcas, las Áreas Metropolitanas y las Mancomunidades de Municipios",
     "Las Comunidades Autónomas y el Estado",
     "Los organismos autónomos dependientes de un Ayuntamiento",
     "Las sociedades mercantiles de capital municipal"],
    "El art. 3.2 LBRL añade estas tres figuras como Entidades Locales adicionales, de creación posible por las Comunidades Autónomas (comarcas) o de agrupación voluntaria u obligatoria de municipios (mancomunidades, áreas metropolitanas)."),
  p("regimen-local-general", "media",
    "¿Cuál de estas es una potestad que corresponde en todo caso a municipios, provincias e islas según el art. 4.1 LBRL?",
    ["La potestad reglamentaria y de autoorganización",
     "La potestad legislativa plena, en pie de igualdad con las Cortes Generales",
     "La potestad de reforma constitucional",
     "La potestad de acuñar moneda propia"],
    "El art. 4.1 LBRL enumera un catálogo de potestades administrativas (reglamentaria, tributaria, expropiatoria, sancionadora, de revisión de oficio...), nunca potestades propias de la soberanía estatal como la legislativa plena o la de acuñar moneda."),
  p("regimen-local-general", "facil",
    "Según el art. 6.1 LBRL, ¿con qué sometimiento actúan las entidades locales?",
    ["Sometimiento pleno a la ley y al Derecho, sirviendo con objetividad los intereses públicos que les están encomendados",
     "Sometimiento únicamente a sus propias ordenanzas, sin subordinación a la ley estatal",
     "Sometimiento a las instrucciones de la Diputación Provincial en toda circunstancia",
     "Ningún sometimiento especial, gozan de plena discrecionalidad en su actuación"],
    "El art. 6.1 LBRL traslada al ámbito local el mismo principio de legalidad del art. 103.1 CE: sometimiento pleno a la ley y al Derecho, con objetividad en el servicio al interés público."),
  p("regimen-local-general", "media",
    "¿Cómo se determinan las competencias propias de los Municipios, Provincias e Islas según el art. 7.2 LBRL?",
    ["Solo pueden ser determinadas por Ley, y se ejercen en régimen de autonomía y bajo la propia responsabilidad de la entidad",
     "Se determinan libremente por cada entidad local mediante su reglamento orgánico",
     "Las fija en cada caso la Diputación Provincial correspondiente",
     "Se presumen todas las competencias no atribuidas expresamente a otra Administración"],
    "El art. 7.2 LBRL exige rango de ley para las competencias propias (no basta un reglamento), y las ejerce la entidad local con autonomía y responsabilidad propias, sin necesidad de autorización de otra Administración."),
  p("regimen-local-general", "dificil",
    "¿En qué condiciones puede una Entidad Local ejercer competencias distintas de las propias y de las delegadas, según el art. 7.4 LBRL?",
    ["Cuando no se ponga en riesgo la sostenibilidad financiera de la Hacienda local, no se incurra en ejecución simultánea del servicio con otra Administración, y existan los informes previos vinculantes exigidos",
     "En cualquier momento y sin ningún requisito adicional, por libre decisión del Pleno",
     "Nunca: la Ley lo prohíbe de forma absoluta en todo caso",
     "Solo si lo autoriza expresamente el Estado mediante real decreto singular"],
    "El art. 7.4 LBRL, tras la reforma de racionalización de 2013, condiciona el ejercicio de competencias «impropias» a un triple filtro: sostenibilidad financiera, ausencia de duplicidad, e informes previos vinculantes."),
  p("regimen-local-general", "media",
    "¿A qué deberes deben ajustar sus relaciones recíprocas la Administración Local y las demás Administraciones Públicas según el art. 10.1 LBRL?",
    ["Información mutua, colaboración, coordinación y respeto a los ámbitos competenciales respectivos",
     "Subordinación jerárquica de la Administración Local a la autonómica en cualquier materia",
     "Silencio administrativo recíproco, sin obligación de comunicarse",
     "Unificación de todos los servicios en una única Administración"],
    "El art. 10.1 LBRL formula el principio de relaciones interadministrativas (no de jerarquía, sino de cooperación) entre los distintos niveles de la Administración Pública."),
  // ── La Administración Local de Aragón (Ley 7/1999, Título I, arts. 1-6) ──
  p("administracion-local-aragon", "facil",
    "¿En qué marco organiza la Comunidad Autónoma de Aragón su Administración Local según el art. 1 de la Ley 7/1999?",
    ["En el marco de la Constitución Española, el Estatuto de Autonomía de Aragón y la legislación básica de régimen local",
     "Con plena libertad, sin sujeción a la legislación básica estatal de régimen local",
     "Únicamente conforme a su propia ley, sin referencia a la Constitución ni al Estatuto",
     "Conforme a lo que decida en cada momento la Federación Aragonesa de Municipios"],
    "El art. 1 de la Ley 7/1999 sitúa la Administración Local aragonesa dentro de un triple marco: Constitución, Estatuto de Autonomía y legislación básica estatal — no es un régimen autónomo al margen de ellos."),
  p("administracion-local-aragon", "media",
    "¿Cuál es la entidad local básica de Aragón según el art. 2.1 de la Ley 7/1999?",
    ["El municipio, dotado de personalidad jurídica, naturaleza territorial y autonomía para la gestión de sus intereses peculiares",
     "La comarca, por ser una figura propia del régimen local aragonés",
     "La provincia, por coincidir con el ámbito de la Diputación",
     "La Comunidad Autónoma, como entidad territorial de referencia"],
    "El art. 2.1 de la Ley 7/1999 reproduce para Aragón el mismo criterio de la LBRL estatal: el municipio es la entidad local básica, con autonomía propia."),
  p("administracion-local-aragon", "media",
    "Además de las provincias, ¿qué otras entidades tienen la condición de entidades locales de Aragón según el art. 2.2 de la Ley 7/1999?",
    ["Las comarcas, la entidad metropolitana de Zaragoza, las mancomunidades de municipios, las comunidades de villa y tierra, y las entidades locales menores",
     "Únicamente los distritos y barrios de la ciudad de Zaragoza",
     "Las Diputaciones de Huesca y Teruel, con exclusión de la de Zaragoza",
     "Los departamentos del Gobierno de Aragón con competencias en régimen local"],
    "El art. 2.2 de la Ley 7/1999 enumera un catálogo amplio y propio de Aragón, con figuras específicas como las comarcas, la entidad metropolitana de Zaragoza y las comunidades de villa y tierra (herencia histórica aragonesa)."),
  p("administracion-local-aragon", "media",
    "¿Qué potestades corresponden a los municipios y provincias aragoneses según el art. 3.2 de la Ley 7/1999?",
    ["La reglamentaria y de autoorganización, la tributaria y financiera, la de programación, la expropiatoria, la de investigación/deslinde/recuperación de oficio de bienes, la de ejecución forzosa, la sancionadora y la de revisión de oficio",
     "Únicamente la potestad reglamentaria, sin las demás potestades administrativas clásicas",
     "La potestad legislativa, en pie de igualdad con las Cortes de Aragón",
     "Solo las potestades expresamente delegadas caso por caso por el Gobierno de Aragón"],
    "El art. 3.2 de la Ley 7/1999 reproduce, para el ámbito aragonés, el mismo catálogo de potestades administrativas clásicas que la LBRL reconoce a nivel estatal (art. 4 LBRL)."),
  p("administracion-local-aragon", "facil",
    "¿Qué prerrogativa reconoce a los bienes y derechos de las entidades locales aragonesas el art. 3.3 de la Ley 7/1999?",
    ["La inembargabilidad, en los términos previstos en las Leyes, junto con las prelaciones y preferencias reconocidas a la Hacienda Pública para sus créditos",
     "Ninguna prerrogativa especial: se rigen por las mismas reglas que los bienes de un particular",
     "La exención total de cualquier control judicial sobre su patrimonio",
     "La imposibilidad absoluta de que un tercero adquiera derechos sobre esos bienes, incluso mediante compraventa"],
    "El art. 3.3 de la Ley 7/1999 traslada al ámbito aragonés las garantías clásicas del patrimonio público local: inembargabilidad y preferencia de créditos, sin llegar a excluir cualquier transmisión válida de derechos."),
  p("administracion-local-aragon", "media",
    "¿Qué principios presiden la distribución de competencias entre las Administraciones Públicas que actúan en el territorio aragonés según el art. 4.2 de la Ley 7/1999?",
    ["Descentralización, economía y eficacia, y máxima proximidad de la gestión administrativa a los ciudadanos",
     "Centralización de todas las competencias en el Gobierno de Aragón",
     "Reparto igualitario de competencias entre todos los municipios, con independencia de su tamaño",
     "Subordinación de las comarcas a las Diputaciones provinciales"],
    "El art. 4.2 de la Ley 7/1999 reproduce el mismo trípode de principios (descentralización, eficacia/economía, proximidad) que rige a nivel estatal, sin perjuicio de las facultades de coordinación de la Diputación General de Aragón que el propio precepto salva expresamente."),
  p("administracion-local-aragon", "media",
    "¿Qué derecho reconoce el art. 5.1 de la Ley 7/1999 a los ciudadanos residentes en municipios aragoneses?",
    ["A disfrutar de los servicios públicos esenciales, sin discriminación por razón de su situación en el territorio",
     "A elegir libremente a qué municipio pertenecer, con independencia de su domicilio real",
     "A recibir una compensación económica si su municipio no presta un servicio concreto",
     "A vetar individualmente cualquier decisión del Pleno de su Ayuntamiento"],
    "El art. 5.1 de la Ley 7/1999 formula una garantía de igualdad territorial en el acceso a los servicios esenciales, sea cual sea el tamaño o la ubicación del municipio de residencia."),
  p("administracion-local-aragon", "dificil",
    "¿A qué Departamento está adscrito el Registro de entidades locales de Aragón, y qué carácter tienen sus datos, según el art. 6 de la Ley 7/1999?",
    ["Al Departamento de Presidencia y Relaciones Institucionales; sus datos son de libre acceso y sirven de base jurídico-administrativa al mapa local de Aragón",
     "Al Departamento de Hacienda, con datos reservados y de acceso restringido",
     "A cada Diputación Provincial, con un registro distinto e independiente en cada una",
     "A las Cortes de Aragón, como órgano de control parlamentario del mapa local"],
    "El art. 6 de la Ley 7/1999 configura el Registro como una herramienta única, adscrita a Presidencia y de acceso libre, que constituye la base oficial del mapa local aragonés, no un registro fragmentado por provincias."),
];

async function main() {
  console.log("📝 temas (alta del tema canónico)...");
  await upsert(
    "temas",
    [
      {
        slug: TEMA,
        titulo: "Régimen local español y de Aragón",
        descripcion: "Principios constitucionales y regulación jurídica del régimen local español (Ley 7/1985). El régimen jurídico de la Administración Local de Aragón: entidades locales aragonesas, potestades y principios de actuación (Ley 7/1999).",
        contenido: "Combina las disposiciones generales del régimen local estatal (autonomía local, entidades locales, potestades, competencias propias y delegadas) con las de la propia Comunidad Autónoma de Aragón, que añade figuras propias como la comarca, la entidad metropolitana de Zaragoza o las comunidades de villa y tierra.",
        enlaces_boe: [
          { titulo: "Ley 7/1985, de Bases del Régimen Local", url: "https://www.boe.es/buscar/act.php?id=BOE-A-1985-5392" },
          { titulo: "Ley 7/1999, de Administración Local de Aragón", url: "https://www.boe.es/buscar/act.php?id=BOE-A-1999-10151" },
        ],
        indice_estudio: [
          { seccion: "regimen-local-general", titulo: "LBRL, Título I: disposiciones generales del régimen local", articulos: "arts. 1-10", url: "https://www.boe.es/buscar/act.php?id=BOE-A-1985-5392#a1" },
          { seccion: "administracion-local-aragon", titulo: "Ley 7/1999, Título I: disposiciones generales de la Administración Local de Aragón", articulos: "arts. 1-6", url: "https://www.boe.es/buscar/act.php?id=BOE-A-1999-10151#a1" },
        ],
      },
    ],
    "slug"
  );

  console.log("📇 flashcards + 📝 preguntas...");
  const flashcards = ITEMS.map((it) => ({ tema_slug: TEMA, seccion: it.seccion, anverso: it.pregunta, reverso: it.opciones[0] }));
  const resF = await fetch(`${URL_BASE}/rest/v1/flashcards`, { method: "POST", headers: { ...HEADERS, Prefer: "return=minimal" }, body: JSON.stringify(flashcards) });
  if (!resF.ok) { console.error(`❌ flashcards ${resF.status} ${await resF.text()}`); process.exit(1); }
  console.log(`   ✓ flashcards: ${flashcards.length}`);

  for (const it of ITEMS) {
    const resP = await fetch(`${URL_BASE}/rest/v1/preguntas`, {
      method: "POST", headers: { ...HEADERS, Prefer: "return=representation" },
      body: JSON.stringify({ tema_slug: TEMA, seccion: it.seccion, enunciado: it.pregunta, explicacion: it.explicacion, dificultad: it.dificultad }),
    });
    if (!resP.ok) { console.error(`❌ pregunta ${resP.status} ${await resP.text()}`); process.exit(1); }
    const [row] = await resP.json();
    const opciones = it.opciones.map((texto, i) => ({ pregunta_id: row.id, texto, es_correcta: i === 0, orden: i }));
    const resO = await fetch(`${URL_BASE}/rest/v1/opciones`, { method: "POST", headers: { ...HEADERS, Prefer: "return=minimal" }, body: JSON.stringify(opciones) });
    if (!resO.ok) { console.error(`❌ opciones ${resO.status} ${await resO.text()}`); process.exit(1); }
  }
  console.log(`   ✓ preguntas: ${ITEMS.length}`);
  console.log(`✅ ${TEMA} completado.`);
}

await main();
