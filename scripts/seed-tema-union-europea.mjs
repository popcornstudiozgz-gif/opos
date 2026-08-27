/**
 * Crea el tema canónico "tema-28: La Unión Europea" — contenido genuinamente
 * nuevo, sin ningún solape con lo ya sembrado (confirmado antes de escribir
 * este script: no existe ningún tema-1..27 sobre la UE). Cubre exactamente
 * el Tema 3 del programa oficial de la DGA: "La Unión Europea: sus
 * Instituciones. Las fuentes del derecho comunitario: Reglamentos,
 * Directivas, Decisiones y Dictámenes."
 *
 * Fuente: texto consolidado del Tratado de la Unión Europea (TUE, arts.
 * 13-19, instituciones) y del Tratado de Funcionamiento de la Unión
 * Europea (TFUE, art. 288, fuentes del derecho), Diario Oficial de la
 * Unión Europea C 83, 30 de marzo de 2010 — leídos íntegros para este
 * seed, no resumidos de memoria ni tomados de fuentes secundarias.
 *
 * Dos secciones:
 *   - "instituciones-ue": las 7 instituciones del art. 13.1 TUE (Parlamento
 *     Europeo, Consejo Europeo, Consejo, Comisión, TJUE, BCE, Tribunal de
 *     Cuentas) y los dos órganos consultivos (Comité Económico y Social,
 *     Comité de las Regiones) que NO son instituciones.
 *   - "fuentes-derecho-ue": los 5 actos jurídicos del art. 288 TFUE
 *     (reglamento, directiva, decisión, recomendación, dictamen).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-union-europea.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!URL_BASE || !SERVICE_KEY) {
  console.error("❌ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-28";

async function upsert(tabla, filas, onConflict) {
  const res = await fetch(`${URL_BASE}/rest/v1/${tabla}?on_conflict=${onConflict}`, {
    method: "POST",
    headers: { ...HEADERS, Prefer: "resolution=merge-duplicates,return=representation" },
    body: JSON.stringify(filas),
  });
  if (!res.ok) {
    console.error(`❌ Error insertando en ${tabla}: ${res.status} ${await res.text()}`);
    process.exit(1);
  }
  const data = await res.json();
  console.log(`   ✓ ${tabla}: ${data.length} filas`);
  return data;
}

async function insertar(tabla, filas) {
  const res = await fetch(`${URL_BASE}/rest/v1/${tabla}`, {
    method: "POST",
    headers: { ...HEADERS, Prefer: "return=representation" },
    body: JSON.stringify(filas),
  });
  if (!res.ok) {
    console.error(`❌ Error insertando en ${tabla}: ${res.status} ${await res.text()}`);
    process.exit(1);
  }
  const data = await res.json();
  console.log(`   ✓ ${tabla}: ${data.length} filas`);
  return data;
}

// ── 1. TEMA CANÓNICO ────────────────────────────────────────────────────
console.log("📝 temas...");
await upsert(
  "temas",
  [
    {
      slug: TEMA,
      titulo: "La Unión Europea",
      descripcion:
        "Las instituciones de la Unión Europea (Parlamento Europeo, Consejo Europeo, Consejo, Comisión Europea, Tribunal de Justicia de la Unión Europea, Banco Central Europeo y Tribunal de Cuentas): composición y funciones. Las fuentes del derecho de la Unión: reglamentos, directivas, decisiones, recomendaciones y dictámenes.",
      contenido:
        "Desarrolla el Título III del Tratado de la Unión Europea (TUE), que enumera las siete instituciones de la Unión y define su composición y sus funciones respectivas, distinguiéndolas de los órganos consultivos (Comité Económico y Social y Comité de las Regiones), que no tienen la consideración de instituciones. Completa el tema el artículo 288 del Tratado de Funcionamiento de la Unión Europea (TFUE), que enumera los cinco tipos de actos jurídicos que las instituciones pueden adoptar para ejercer las competencias de la Unión y define el alcance obligatorio de cada uno.",
      enlaces_boe: [
        { url: "https://www.boe.es/doue/2010/083/Z00013-00046.pdf", titulo: "Versión consolidada del Tratado de la Unión Europea (TUE)" },
        { url: "https://www.boe.es/doue/2010/083/Z00047-00199.pdf", titulo: "Versión consolidada del Tratado de Funcionamiento de la Unión Europea (TFUE)" },
      ],
      indice_estudio: [
        { url: "https://www.boe.es/doue/2010/083/Z00013-00046.pdf", titulo: "Las instituciones de la Unión Europea", seccion: "instituciones-ue", articulos: "arts. 13-19 TUE" },
        { url: "https://www.boe.es/doue/2010/083/Z00047-00199.pdf", titulo: "Las fuentes del derecho de la Unión", seccion: "fuentes-derecho-ue", articulos: "art. 288 TFUE" },
      ],
    },
  ],
  "slug"
);

// ── 2. FLASHCARDS ────────────────────────────────────────────────────────
console.log("📝 flashcards (instituciones-ue)...");
await insertar(
  "flashcards",
  [
    { anverso: "Según el art. 13.1 TUE, ¿cuáles son las siete instituciones de la Unión Europea?", reverso: "El Parlamento Europeo, el Consejo Europeo, el Consejo, la Comisión Europea, el Tribunal de Justicia de la Unión Europea, el Banco Central Europeo y el Tribunal de Cuentas" },
    { anverso: "¿Qué dos funciones ejerce el Parlamento Europeo conjuntamente con el Consejo, según el art. 14.1 TUE?", reverso: "La función legislativa y la función presupuestaria" },
    { anverso: "Según el art. 14.2 TUE, ¿cuál es el número máximo de diputados del Parlamento Europeo y el máximo de escaños por Estado miembro?", reverso: "No más de 750 diputados (más el Presidente); ningún Estado miembro tendrá más de 96 escaños" },
    { anverso: "¿Qué función tiene el Consejo Europeo según el art. 15.1 TUE, y qué función NO ejerce nunca?", reverso: "Da a la Unión los impulsos necesarios para su desarrollo y define sus orientaciones y prioridades políticas generales; no ejerce función legislativa alguna" },
    { anverso: "¿Quiénes componen el Consejo Europeo según el art. 15.2 TUE?", reverso: "Los Jefes de Estado o de Gobierno de los Estados miembros, su Presidente y el Presidente de la Comisión (participa también el Alto Representante para Asuntos Exteriores)" },
    { anverso: "¿Cuántas veces al semestre se reúne el Consejo Europeo, según el art. 15.3 TUE?", reverso: "Dos veces por semestre" },
    { anverso: "¿Por cuánto tiempo se elige al Presidente del Consejo Europeo, según el art. 15.5 TUE, y es renovable?", reverso: "Por un mandato de dos años y medio, renovable una sola vez" },
    { anverso: "¿Qué dos funciones ejerce el Consejo (de la UE) conjuntamente con el Parlamento Europeo, según el art. 16.1 TUE?", reverso: "La función legislativa y la función presupuestaria" },
    { anverso: "¿Cómo está compuesto el Consejo, según el art. 16.2 TUE?", reverso: "Por un representante de cada Estado miembro, de rango ministerial, facultado para comprometer al Gobierno de ese Estado y para ejercer el derecho de voto" },
    { anverso: "Según el art. 17.1 TUE, ¿qué institución vela por la aplicación de los Tratados y asume la representación exterior de la Unión (salvo en PESC)?", reverso: "La Comisión Europea" },
    { anverso: "Según el art. 17.2 TUE, ¿quién puede proponer los actos legislativos de la Unión, salvo que los Tratados dispongan otra cosa?", reverso: "Solo la Comisión (los actos legislativos únicamente podrán adoptarse a propuesta de la Comisión)" },
    { anverso: "¿Cuál es la duración del mandato de la Comisión, según el art. 17.3 TUE?", reverso: "Cinco años" },
    { anverso: "Según el art. 19.1 TUE, ¿qué tres órganos comprende el Tribunal de Justicia de la Unión Europea?", reverso: "El Tribunal de Justicia, el Tribunal General y los tribunales especializados" },
    { anverso: "¿Cómo está compuesto el Tribunal de Justicia, según el art. 19.2 TUE?", reverso: "Por un juez por Estado miembro, asistido por abogados generales" },
    { anverso: "¿El Comité Económico y Social y el Comité de las Regiones son instituciones de la Unión?", reverso: "No: según el art. 13.4 TUE son órganos que ejercen funciones consultivas, distintos de las siete instituciones enumeradas en el art. 13.1" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: "instituciones-ue" })),
);

console.log("📝 flashcards (fuentes-derecho-ue)...");
await insertar(
  "flashcards",
  [
    { anverso: "Según el art. 288 TFUE, ¿qué cinco tipos de actos pueden adoptar las instituciones para ejercer las competencias de la Unión?", reverso: "Reglamentos, directivas, decisiones, recomendaciones y dictámenes" },
    { anverso: "Según el art. 288 TFUE, ¿qué alcance tiene el reglamento y cómo se aplica en los Estados miembros?", reverso: "Tiene alcance general; es obligatorio en todos sus elementos y directamente aplicable en cada Estado miembro" },
    { anverso: "Según el art. 288 TFUE, ¿en qué obliga la directiva al Estado miembro destinatario, y qué margen conserva ese Estado?", reverso: "Obliga en cuanto al resultado que deba conseguirse, dejando a las autoridades nacionales la elección de la forma y de los medios" },
    { anverso: "Según el art. 288 TFUE, ¿a quién obliga la decisión cuando designa destinatarios?", reverso: "Solo será obligatoria para los destinatarios que designe (aunque es obligatoria en todos sus elementos)" },
    { anverso: "Según el art. 288 TFUE, ¿son vinculantes las recomendaciones y los dictámenes?", reverso: "No, las recomendaciones y los dictámenes no serán vinculantes" },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: "fuentes-derecho-ue" })),
);

// ── 3. PREGUNTAS DE TEST ─────────────────────────────────────────────────
console.log("📝 preguntas (instituciones-ue)...");
await insertar(
  "preguntas",
  [
    {
      enunciado: "¿Cuáles son las siete instituciones de la Unión Europea enumeradas en el art. 13.1 del TUE?",
      explicacion: "El Parlamento Europeo, el Consejo Europeo, el Consejo, la Comisión Europea, el Tribunal de Justicia de la Unión Europea, el Banco Central Europeo y el Tribunal de Cuentas. El Comité Económico y Social y el Comité de las Regiones no figuran en esta lista: son órganos consultivos, no instituciones.",
      dificultad: "media",
    },
    {
      enunciado: "¿Qué dos funciones ejerce el Parlamento Europeo conjuntamente con el Consejo, según el art. 14.1 TUE?",
      explicacion: "La función legislativa y la función presupuestaria. Además, ejerce funciones de control político y consultivas, y elige al Presidente de la Comisión.",
      dificultad: "facil",
    },
    {
      enunciado: "Según el art. 15.1 TUE, ¿qué función NO ejerce nunca el Consejo Europeo?",
      explicacion: "El Consejo Europeo no ejerce función legislativa alguna. Su papel es dar a la Unión los impulsos necesarios para su desarrollo y definir sus orientaciones y prioridades políticas generales.",
      dificultad: "media",
    },
    {
      enunciado: "¿Quiénes componen el Consejo Europeo, según el art. 15.2 TUE?",
      explicacion: "Los Jefes de Estado o de Gobierno de los Estados miembros, su Presidente y el Presidente de la Comisión. En sus trabajos participa también el Alto Representante de la Unión para Asuntos Exteriores y Política de Seguridad.",
      dificultad: "media",
    },
    {
      enunciado: "¿Cuál es la duración del mandato del Presidente del Consejo Europeo y es renovable, según el art. 15.5 TUE?",
      explicacion: "Dos años y medio, renovable una sola vez. Es elegido por el propio Consejo Europeo por mayoría cualificada.",
      dificultad: "media",
    },
    {
      enunciado: "¿Cómo está compuesto el Consejo (de la Unión Europea), según el art. 16.2 TUE?",
      explicacion: "Por un representante de cada Estado miembro, de rango ministerial, facultado para comprometer al Gobierno de dicho Estado miembro y para ejercer el derecho de voto.",
      dificultad: "facil",
    },
    {
      enunciado: "Según el art. 17.2 TUE, ¿quién debe proponer, con carácter general, los actos legislativos de la Unión?",
      explicacion: "Los actos legislativos de la Unión solo podrán adoptarse a propuesta de la Comisión, excepto cuando los Tratados dispongan otra cosa.",
      dificultad: "media",
    },
    {
      enunciado: "¿Cuál es la duración del mandato de la Comisión Europea, según el art. 17.3 TUE?",
      explicacion: "Cinco años. Sus miembros son elegidos en razón de su competencia general y su compromiso europeo, entre personalidades que ofrezcan plenas garantías de independencia.",
      dificultad: "facil",
    },
    {
      enunciado: "Según el art. 19.1 TUE, ¿qué tres órganos comprende el Tribunal de Justicia de la Unión Europea?",
      explicacion: "El Tribunal de Justicia, el Tribunal General y los tribunales especializados. Su función es garantizar el respeto del Derecho en la interpretación y aplicación de los Tratados.",
      dificultad: "media",
    },
    {
      enunciado: "¿El Comité Económico y Social forma parte de las instituciones de la Unión Europea?",
      explicacion: "No. El art. 13.4 TUE lo menciona junto con el Comité de las Regiones como órganos que asisten al Parlamento Europeo, al Consejo y a la Comisión ejerciendo funciones consultivas, pero no están incluidos en la lista de instituciones del art. 13.1.",
      dificultad: "media",
    },
  ].map((p) => ({ ...p, tema_slug: TEMA, seccion: "instituciones-ue" })),
);

console.log("📝 preguntas (fuentes-derecho-ue)...");
await insertar(
  "preguntas",
  [
    {
      enunciado: "Según el art. 288 TFUE, ¿qué característica distingue al reglamento de la directiva en cuanto a su aplicación en los Estados miembros?",
      explicacion: "El reglamento es obligatorio en todos sus elementos y directamente aplicable en cada Estado miembro (no necesita transposición), mientras que la directiva solo obliga en cuanto al resultado, dejando a las autoridades nacionales la elección de la forma y los medios.",
      dificultad: "media",
    },
    {
      enunciado: "Según el art. 288 TFUE, ¿qué margen de actuación conservan las autoridades nacionales al aplicar una directiva?",
      explicacion: "La directiva obliga al Estado miembro destinatario en cuanto al resultado que deba conseguirse, dejando a las autoridades nacionales la elección de la forma y de los medios para alcanzarlo.",
      dificultad: "facil",
    },
    {
      enunciado: "¿Es obligatoria una decisión que designe destinatarios concretos, según el art. 288 TFUE, para todos los Estados miembros o solo para los destinatarios que designe?",
      explicacion: "Cuando la decisión designe destinatarios, solo será obligatoria para éstos, aunque es obligatoria en todos sus elementos.",
      dificultad: "media",
    },
    {
      enunciado: "¿Tienen carácter vinculante las recomendaciones y los dictámenes de las instituciones de la Unión, según el art. 288 TFUE?",
      explicacion: "No. El propio art. 288 TFUE establece expresamente que las recomendaciones y los dictámenes no serán vinculantes.",
      dificultad: "facil",
    },
    {
      enunciado: "¿Cuáles son los cinco tipos de actos jurídicos que, según el art. 288 TFUE, pueden adoptar las instituciones para ejercer las competencias de la Unión?",
      explicacion: "Reglamentos, directivas, decisiones, recomendaciones y dictámenes. Los tres primeros son jurídicamente vinculantes (con distinto alcance cada uno); los dos últimos no lo son.",
      dificultad: "facil",
    },
  ].map((p) => ({ ...p, tema_slug: TEMA, seccion: "fuentes-derecho-ue" })),
);

// ── 4. ASIGNACIÓN A LA DGA (Tema 3 del programa oficial) ─────────────────
console.log("📝 tema_oposicion (DGA)...");
const bloques = await (await fetch(`${URL_BASE}/rest/v1/bloques?oposicion_slug=eq.auxiliar-administrativo-dga&slug=eq.bloque-1&select=id`, { headers: HEADERS })).json();
await upsert(
  "tema_oposicion",
  [
    {
      tema_slug: TEMA,
      oposicion_slug: "auxiliar-administrativo-dga",
      bloque_id: bloques[0].id,
      numero: 3,
      orden: 3,
      es_premium: false,
      publicado: true,
      secciones_incluidas: ["instituciones-ue", "fuentes-derecho-ue"],
    },
  ],
  "tema_slug,oposicion_slug"
);

console.log("✅ tema-28 (La Unión Europea) creado y asignado a la DGA como Tema 3.");
