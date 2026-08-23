/**
 * Alta del tema canónico nuevo: "La provincia y el municipio: organización
 * y competencias" (Ley 7/1985, LBRL, Título II Cap. II-III y Título III
 * completo). Necesario para el Tema 9 de la oposición de la DPZ ("La
 * provincia en el régimen local: Organización y Competencias. El
 * municipio en el régimen local: Organización y Competencias") — el
 * Ayuntamiento de Zaragoza nunca necesitó este contenido porque, siendo
 * el propio municipio, no se examina de "cómo se organiza un municipio"
 * en abstracto ni de la Diputación Provincial.
 *
 * 4 secciones (fieles a content-raw/ley-7-1985-bases-regimen-local/03,04,06,07-*.md):
 *   - municipio-organizacion (arts. 19-24 bis)
 *   - municipio-competencias (arts. 25-28)
 *   - provincia-organizacion (arts. 31-35)
 *   - provincia-competencias (arts. 36-38)
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-20-provincia-municipio.mjs
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

async function insertPreguntasYFlashcards(temaSlug, items) {
  const flashcards = items.map((it) => ({ tema_slug: temaSlug, seccion: it.seccion, anverso: it.pregunta, reverso: it.respuestaCorta }));
  const resF = await fetch(`${URL_BASE}/rest/v1/flashcards`, { method: "POST", headers: { ...HEADERS, Prefer: "return=minimal" }, body: JSON.stringify(flashcards) });
  if (!resF.ok) { console.error(`❌ flashcards ${resF.status} ${await resF.text()}`); process.exit(1); }
  console.log(`   ✓ flashcards: ${flashcards.length}`);

  for (const it of items) {
    const resP = await fetch(`${URL_BASE}/rest/v1/preguntas`, {
      method: "POST",
      headers: { ...HEADERS, Prefer: "return=representation" },
      body: JSON.stringify({ tema_slug: temaSlug, seccion: it.seccion, enunciado: it.pregunta, explicacion: it.explicacion, dificultad: it.dificultad }),
    });
    if (!resP.ok) { console.error(`❌ pregunta ${resP.status} ${await resP.text()}`); process.exit(1); }
    const [row] = await resP.json();
    const opciones = it.opciones.map((texto, i) => ({ pregunta_id: row.id, texto, es_correcta: i === 0, orden: i }));
    const resO = await fetch(`${URL_BASE}/rest/v1/opciones`, { method: "POST", headers: { ...HEADERS, Prefer: "return=minimal" }, body: JSON.stringify(opciones) });
    if (!resO.ok) { console.error(`❌ opciones ${resO.status} ${await resO.text()}`); process.exit(1); }
  }
  console.log(`   ✓ preguntas: ${items.length}`);
}

const TEMA = "tema-20";
const p = (seccion, dificultad, pregunta, opciones, explicacion, respuestaCorta) => ({ seccion, dificultad, pregunta, opciones, explicacion, respuestaCorta: respuestaCorta ?? opciones[0] });

const ITEMS = [
  // ── Organización municipal (LBRL arts. 19-24 bis) ──────────────────────
  p("municipio-organizacion", "facil",
    "¿A quién corresponde el gobierno y la administración municipal según el art. 19.1 LBRL, salvo en concejo abierto?",
    ["Al ayuntamiento, integrado por el Alcalde y los Concejales",
     "A la Diputación Provincial correspondiente",
     "Al Gobierno de la Comunidad Autónoma",
     "A una Junta Vecinal elegida por sorteo"],
    "El art. 19.1 LBRL atribuye el gobierno y la administración municipal al ayuntamiento (Alcalde + Concejales), salvo en el régimen especial de concejo abierto."),
  p("municipio-organizacion", "media",
    "¿En qué municipios existe obligatoriamente la Junta de Gobierno Local según el art. 20.1.b LBRL?",
    ["En todos los de población superior a 5.000 habitantes, y en los de menos cuando lo disponga su reglamento orgánico o lo acuerde el Pleno",
     "Únicamente en los municipios de gran población del Título X",
     "En todos los municipios, sin excepción, independientemente de su población",
     "Solo en las capitales de provincia"],
    "El art. 20.1.b LBRL fija el umbral de 5.000 habitantes como obligatorio, dejando la Junta de Gobierno como potestativa por debajo de ese umbral."),
  p("municipio-organizacion", "facil",
    "¿Qué órganos existen en todos los ayuntamientos, sin excepción, según el art. 20.1.a LBRL?",
    ["El Alcalde, los Tenientes de Alcalde y el Pleno",
     "El Alcalde y la Junta de Gobierno Local, únicamente",
     "El Pleno y la Comisión Especial de Sugerencias y Reclamaciones",
     "Solo el Alcalde, como órgano unipersonal"],
    "El art. 20.1.a LBRL reserva a Alcalde, Tenientes de Alcalde y Pleno la condición de órganos necesarios en todos los municipios, con independencia de su población."),
  p("municipio-organizacion", "media",
    "¿Quién puede ser Alcalde según el art. 19.2 LBRL?",
    ["Es elegido por los Concejales o por los vecinos, en los términos que establezca la legislación electoral general",
     "Es designado directamente por la Comunidad Autónoma",
     "Es elegido exclusivamente por los vecinos, nunca por los Concejales",
     "Es nombrado por el Delegado del Gobierno en la provincia"],
    "El art. 19.2 LBRL deja a la legislación electoral general la concreción del sistema (elección por los Concejales, como es habitual, o por los vecinos en concejo abierto)."),
  p("municipio-organizacion", "media",
    "¿Cuál de estas es una atribución del Alcalde según el art. 21.1 LBRL?",
    ["Dirigir el gobierno y la administración municipal y representar al ayuntamiento",
     "Aprobar el reglamento orgánico y las ordenanzas municipales",
     "Aprobar y modificar los presupuestos municipales",
     "Declarar la lesividad de los actos del propio Ayuntamiento"],
    "El art. 21.1.a-b LBRL atribuye al Alcalde la dirección del gobierno/administración y la representación municipal; aprobar ordenanzas, presupuestos y declarar la lesividad son competencias del Pleno (art. 22.2)."),
  p("municipio-organizacion", "dificil",
    "¿Puede el Alcalde delegar la jefatura superior de todo el personal, según el art. 21.3 LBRL?",
    ["No: es una de las atribuciones expresamente excluidas de la delegación",
     "Sí, sin ninguna limitación",
     "Sí, pero solo en la Junta de Gobierno Local, nunca en un Teniente de Alcalde",
     "Sí, siempre que lo autorice el Pleno por mayoría absoluta"],
    "El art. 21.3 LBRL excluye expresamente de la delegación, entre otras, la jefatura superior de todo el personal, junto con convocar/presidir el Pleno y la Junta de Gobierno, decidir empates y la separación de funcionarios."),
  p("municipio-competencias", "facil",
    "¿Con qué objeto puede el Municipio promover actividades y prestar servicios públicos según el art. 25.1 LBRL?",
    ["Para la gestión de sus intereses y en el ámbito de sus competencias, satisfaciendo las necesidades y aspiraciones de la comunidad vecinal",
     "Únicamente cuando se lo delegue expresamente el Estado",
     "Solo en materias no reguladas por ninguna otra Administración",
     "Exclusivamente en materia de urbanismo"],
    "El art. 25.1 LBRL formula la cláusula general de actuación municipal: gestión de sus intereses, dentro de sus competencias, al servicio de la comunidad vecinal."),
  p("municipio-competencias", "media",
    "¿Cuál de las siguientes es una competencia propia municipal enumerada en el art. 25.2 LBRL?",
    ["Urbanismo: planeamiento, gestión, ejecución y disciplina urbanística",
     "La Seguridad Social, en su régimen económico",
     "Las relaciones internacionales del Estado",
     "La política monetaria"],
    "El art. 25.2.a LBRL sitúa el urbanismo (planeamiento, gestión, ejecución, disciplina) entre las competencias propias municipales; las otras opciones son ajenas por completo al ámbito local."),
  p("municipio-competencias", "media",
    "¿Qué deben prestar todos los Municipios sin excepción según el art. 26.1.a LBRL?",
    ["Alumbrado público, cementerio, recogida de residuos, limpieza viaria, abastecimiento domiciliario de agua potable, alcantarillado, acceso a los núcleos de población y pavimentación de las vías públicas",
     "Transporte colectivo urbano de viajeros",
     "Protección civil y prevención de incendios",
     "Parque público y biblioteca pública"],
    "El art. 26.1.a LBRL fija el catálogo mínimo universal de servicios; los demás apartados del art. 26.1 añaden servicios adicionales según tramos de población."),
  p("municipio-competencias", "dificil",
    "En los municipios de menos de 20.000 habitantes, ¿quién coordina la prestación de servicios como la recogida de residuos o el abastecimiento de agua, según el art. 26.2 LBRL?",
    ["La Diputación provincial o entidad equivalente",
     "El propio municipio, sin intervención de la Diputación",
     "El Gobierno de la Comunidad Autónoma, con carácter exclusivo",
     "El Ministerio de Hacienda directamente"],
    "El art. 26.2 LBRL encomienda esta labor de coordinación a la Diputación (o entidad equivalente) para los municipios pequeños, con posibilidad de que el propio municipio asuma la prestación si justifica un coste menor."),
  p("municipio-competencias", "media",
    "¿Qué plazo mínimo de duración exige el art. 27.1 LBRL para las competencias delegadas por el Estado o la Comunidad Autónoma en un Municipio?",
    ["Cinco años",
     "Un año",
     "Diez años",
     "No se exige un plazo mínimo, puede ser indefinida desde el primer momento"],
    "El art. 27.1 LBRL exige que la delegación determine su duración, que no podrá ser inferior a cinco años, para dar estabilidad a la competencia delegada."),
  // ── Organización provincial (LBRL arts. 31-35) ──────────────────────────
  p("provincia-organizacion", "facil",
    "¿Cómo define el art. 31.1 LBRL a la Provincia?",
    ["Una entidad local determinada por la agrupación de Municipios, con personalidad jurídica propia y plena capacidad para el cumplimiento de sus fines",
     "Una división puramente estadística, sin personalidad jurídica propia",
     "Un organismo autónomo dependiente del Gobierno de la Comunidad Autónoma",
     "Una demarcación exclusivamente electoral, sin funciones de gobierno"],
    "El art. 31.1 LBRL constituye a la Provincia como entidad local de pleno derecho, con personalidad jurídica y capacidad propias, no como una simple división administrativa."),
  p("provincia-organizacion", "media",
    "¿Cuáles son los fines propios y específicos de la Provincia según el art. 31.2 LBRL?",
    ["Garantizar los principios de solidaridad y equilibrio intermunicipales, asegurando la prestación integral de los servicios municipales en todo el territorio provincial y participando en la coordinación con la Comunidad Autónoma y el Estado",
     "Sustituir a los municipios en la totalidad de sus competencias",
     "Ejercer la tutela financiera sobre los presupuestos autonómicos",
     "Legislar en materia de régimen local dentro de su territorio"],
    "El art. 31.2 LBRL centra la razón de ser de la Provincia en la solidaridad y el equilibrio entre municipios, no en sustituirlos ni en competir con la Comunidad Autónoma."),
  p("provincia-organizacion", "facil",
    "¿A quién corresponde el gobierno y la administración autónoma de la Provincia según el art. 31.3 LBRL?",
    ["A la Diputación u otras Corporaciones de carácter representativo",
     "Al Delegado del Gobierno en la Comunidad Autónoma",
     "Al municipio con mayor población de la provincia",
     "Directamente al Gobierno de España"],
    "El art. 31.3 LBRL reserva el gobierno provincial a un órgano de carácter representativo (típicamente la Diputación), nunca a un órgano periférico del Estado ni a un municipio concreto."),
  p("provincia-organizacion", "media",
    "¿Qué órganos existen en todas las Diputaciones según el art. 32.1 LBRL?",
    ["El Presidente, los Vicepresidentes, la Junta de Gobierno y el Pleno",
     "Únicamente el Presidente y el Pleno, sin Junta de Gobierno",
     "El Presidente y una Asamblea de Alcaldes de la provincia",
     "Solo el Pleno, como órgano colegiado único"],
    "El art. 32.1 LBRL replica en el ámbito provincial el mismo esquema básico que el art. 20.1 fija para los municipios: Presidente, Vicepresidentes, Junta de Gobierno y Pleno."),
  p("provincia-organizacion", "media",
    "¿Cómo se integra la Junta de Gobierno de la Diputación según el art. 35.1 LBRL?",
    ["Por el Presidente y un número de Diputados no superior al tercio del número legal de los mismos, nombrados y separados libremente por aquel",
     "Por todos los Diputados de la Corporación, sin excepción",
     "Por el Presidente y los portavoces de cada grupo político, en todo caso",
     "Por Diputados elegidos directamente por los vecinos de la provincia"],
    "El art. 35.1 LBRL replica para la Diputación el mismo criterio que el art. 23.1 fija para la Junta de Gobierno Local municipal: límite de un tercio y libre nombramiento/cese por el Presidente."),
  p("provincia-organizacion", "dificil",
    "¿Con qué criterios debe efectuarse el nombramiento del personal directivo de las Diputaciones según el art. 32 bis LBRL?",
    ["Criterios de competencia profesional y experiencia, entre funcionarios de carrera del Estado, las CCAA, las Entidades Locales o con habilitación de carácter nacional del subgrupo A1",
     "Libre designación política, sin necesidad de que el nombrado sea funcionario",
     "Concurso-oposición libre, abierto a cualquier titulado universitario",
     "Elección directa por el Pleno de la Diputación, entre sus propios Diputados"],
    "El art. 32 bis LBRL profesionaliza el nombramiento del personal directivo, exigiendo en principio la condición de funcionario de carrera de máximo nivel (A1), salvo previsión distinta del Reglamento Orgánico."),
  // ── Competencias provinciales (LBRL arts. 36-38) ────────────────────────
  p("provincia-competencias", "facil",
    "¿Cuál de estas es una competencia propia de la Diputación según el art. 36.1.a-b LBRL?",
    ["La coordinación de los servicios municipales entre sí, y la asistencia y cooperación jurídica, económica y técnica a los Municipios",
     "La aprobación de los presupuestos generales del Estado",
     "El nombramiento del Alcalde de cada municipio de la provincia",
     "La representación exterior de España ante la Unión Europea"],
    "El art. 36.1.a-b LBRL sitúa la coordinación intermunicipal y la asistencia/cooperación con los municipios (especialmente los de menor capacidad) en el núcleo de las competencias provinciales."),
  p("provincia-competencias", "media",
    "¿Qué debe garantizar en todo caso la Diputación en los municipios de menos de 1.000 habitantes según el art. 36.1.b LBRL?",
    ["La prestación de los servicios de secretaría e intervención",
     "La prestación del servicio de transporte urbano colectivo",
     "La gestión íntegra del presupuesto municipal, sustituyendo al Ayuntamiento",
     "La designación directa del Alcalde"],
    "El art. 36.1.b LBRL identifica secretaría e intervención (las funciones públicas necesarias de habilitación nacional) como el mínimo que la Diputación debe garantizar en los municipios más pequeños."),
  p("provincia-competencias", "media",
    "¿Qué instrumento aprueba anualmente la Diputación para la cooperación a las obras y servicios municipales, según el art. 36.2.a LBRL?",
    ["Un plan provincial de cooperación, en cuya elaboración deben participar los Municipios de la Provincia",
     "Un presupuesto único que sustituye a los presupuestos municipales",
     "Un decreto de intervención directa sobre los servicios deficitarios",
     "Un informe anual remitido únicamente al Tribunal de Cuentas"],
    "El art. 36.2.a LBRL exige que el plan provincial de cooperación se elabore con participación municipal y contenga una memoria justificativa de objetivos y criterios de reparto de fondos."),
  p("provincia-competencias", "dificil",
    "¿En qué municipios asume la Diputación la prestación de los servicios de tratamiento de residuos, según el art. 36.1.c LBRL, cuando estos no procedan a su prestación?",
    ["En los municipios de menos de 5.000 habitantes",
     "En los municipios de menos de 20.000 habitantes, sin distinción de servicio",
     "En todos los municipios de la provincia, sin excepción",
     "Únicamente en los municipios que lo soliciten expresamente cada año"],
    "El art. 36.1.c LBRL fija umbrales distintos según el servicio: 5.000 habitantes para tratamiento de residuos, y 20.000 habitantes para prevención y extinción de incendios."),
  p("provincia-competencias", "media",
    "¿Puede el Estado delegar competencias de mera ejecución en las Diputaciones según el art. 37.2 LBRL?",
    ["Sí, previa consulta e informe de la Comunidad Autónoma interesada, cuando el ámbito provincial sea el más idóneo para prestar el servicio",
     "No, el Estado solo puede delegar competencias en las Comunidades Autónomas, nunca en las Diputaciones",
     "Sí, pero sin necesidad de consultar a la Comunidad Autónoma en ningún caso",
     "Solo si lo solicita expresamente cada uno de los municipios de la provincia"],
    "El art. 37.2 LBRL habilita también al Estado (no solo a la Comunidad Autónoma) a delegar en las Diputaciones, exigiendo la consulta previa a la Comunidad Autónoma como garantía del reparto competencial."),
];

async function main() {
  console.log("📝 temas (alta del tema canónico)...");
  await upsert(
    "temas",
    [
      {
        slug: TEMA,
        titulo: "La provincia y el municipio: organización y competencias",
        descripcion: "Organización municipal (Alcalde, Pleno, Junta de Gobierno Local) y provincial (Presidente, Pleno, Junta de Gobierno). Competencias propias y delegadas del municipio y de la Diputación.",
        contenido: "Desarrolla el Título II (Cap. II-III) y el Título III completo de la Ley 7/1985, Reguladora de las Bases del Régimen Local: cómo se organizan y qué competencias tienen, respectivamente, el municipio y la provincia — con especial atención a las funciones de coordinación y asistencia de la Diputación a los municipios más pequeños.",
        enlaces_boe: [{ titulo: "Ley 7/1985, de Bases del Régimen Local", url: "https://www.boe.es/buscar/act.php?id=BOE-A-1985-5392" }],
        indice_estudio: [
          { seccion: "municipio-organizacion", titulo: "LBRL, Título II, Cap. II: organización municipal", articulos: "arts. 19-24 bis", url: "https://www.boe.es/buscar/act.php?id=BOE-A-1985-5392#a19" },
          { seccion: "municipio-competencias", titulo: "LBRL, Título II, Cap. III: competencias del municipio", articulos: "arts. 25-28", url: "https://www.boe.es/buscar/act.php?id=BOE-A-1985-5392#a25" },
          { seccion: "provincia-organizacion", titulo: "LBRL, Título III, Cap. I: organización provincial", articulos: "arts. 31-35", url: "https://www.boe.es/buscar/act.php?id=BOE-A-1985-5392#a31" },
          { seccion: "provincia-competencias", titulo: "LBRL, Título III, Cap. II: competencias de la Diputación", articulos: "arts. 36-38", url: "https://www.boe.es/buscar/act.php?id=BOE-A-1985-5392#a36" },
        ],
      },
    ],
    "slug"
  );

  console.log("📝 flashcards + preguntas...");
  await insertPreguntasYFlashcards(TEMA, ITEMS);

  console.log(`✅ ${TEMA} dado de alta: ${ITEMS.length} preguntas + ${ITEMS.length} flashcards en 4 secciones.`);
}

await main();
