/**
 * Corrige el Tema 5 de la oposición Auxiliar Administrativo DGA
 * ("Los órganos de gobierno y administración de la Comunidad Autónoma de
 * Aragón", bloque-1), cuyo recorte publicado (tema-30) resultó estar
 * INCOMPLETO respecto al programa oficial vigente (Resolución de 25 de
 * noviembre de 2025, ANEXO XXXI, ítem 5 de "materias comunes"), verificado
 * esta sesión leyendo el PDF oficial de mia.aragon.es página por página.
 *
 * Texto oficial exacto del ítem 5:
 *   "Los órganos de gobierno y administración de la Comunidad Autónoma de
 *   Aragón. El Presidente y el Gobierno de Aragón. La Administración
 *   Pública de la Comunidad Autónoma. La estructura administrativa. El
 *   Sector Público de la Comunidad Autónoma de Aragón. La Administración
 *   consultiva: el Consejo de Estado y el Consejo Consultivo de Aragón."
 *
 * tema-30 (creado esta misma sesión) cubría ya el Presidente y Gobierno de
 * Aragón, la Administración Pública/estructura administrativa y el Sector
 * Público autonómico — pero le faltaba por completo la última frase: "La
 * Administración consultiva: el Consejo de Estado y el Consejo Consultivo
 * de Aragón". Se añade como sección NUEVA a tema-30.
 *
 * Fuentes: texto consolidado de la Ley Orgánica 3/1980, de 22 de abril,
 * del Consejo de Estado (BOE-A-1980-8648), y de la Ley 1/2009, de 30 de
 * marzo, del Consejo Consultivo de Aragón (BOE-A-2009-7196), ambas leídas
 * íntegras para este seed vía BOE.
 *
 * Igual que el fix del Tema 10, este script inserta también las 4
 * opciones de cada pregunta de test, con una marcada como correcta.
 *
 * Uso: node --env-file=.env.local scripts/fix-tema5-dga-administracion-consultiva.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!URL_BASE || !SERVICE_KEY) {
  console.error("❌ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-30";
const SECCION = "administracion-consultiva";

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
  return res.json();
}

async function insertarPreguntasConOpciones(preguntas) {
  const filas = preguntas.map(({ opciones, correcta, ...p }) => ({ ...p, tema_slug: TEMA, seccion: SECCION }));
  const insertadas = await insertar("preguntas", filas);
  console.log(`   ✓ preguntas: ${insertadas.length} filas`);

  const filasOpciones = insertadas.flatMap((pregunta, i) =>
    preguntas[i].opciones.map((texto, orden) => ({
      pregunta_id: pregunta.id,
      texto,
      es_correcta: orden === preguntas[i].correcta,
      orden,
    })),
  );
  const opcionesInsertadas = await insertar("opciones", filasOpciones);
  console.log(`   ✓ opciones: ${opcionesInsertadas.length} filas`);
}

console.log(`📝 flashcards (${SECCION})...`);
await insertar(
  "flashcards",
  [
    {
      anverso: "Según el art. primero de la Ley Orgánica 3/1980, ¿qué es el Consejo de Estado?",
      reverso: "El supremo órgano consultivo del Gobierno, que ejerce la función consultiva con autonomía orgánica y funcional",
    },
    {
      anverso: "Según el art. segundo.2 de la LO 3/1980, ¿cuándo es preceptiva la consulta al Consejo de Estado y son vinculantes sus dictámenes?",
      reverso: "Es preceptiva cuando esta u otras leyes así lo establecen (facultativa en los demás casos); los dictámenes no son vinculantes salvo que la ley disponga lo contrario",
    },
    {
      anverso: "Según el art. tercero de la LO 3/1980, ¿en qué órganos actúa el Consejo de Estado?",
      reverso: "En Pleno, en Comisión Permanente o en Comisión de Estudios, y también en Secciones",
    },
    {
      anverso: "Según el art. cuarto de la LO 3/1980, ¿quiénes integran el Consejo de Estado en Pleno?",
      reverso: "El Presidente, los Consejeros permanentes, los Consejeros natos, los Consejeros electivos y el Secretario general",
    },
    {
      anverso: "Según el art. veinticuatro de la LO 3/1980, ¿cuándo es preceptivo el dictamen del Consejo de Estado para una Comunidad Autónoma?",
      reverso: "Cuando la Comunidad Autónoma carezca de órgano consultivo propio, en los mismos casos previstos por la ley para el Estado, y haya asumido las competencias correspondientes",
    },
    {
      anverso: "Según el art. 1 de la Ley 1/2009, ¿qué es el Consejo Consultivo de Aragón y a qué órgano está adscrito?",
      reverso: "El supremo órgano consultivo del Gobierno y de la Administración de la Comunidad Autónoma; está adscrito a la Presidencia del Gobierno de Aragón (sin dependencia jerárquica)",
    },
    {
      anverso: "Según el art. 4 de la Ley 1/2009, ¿cómo está integrado el Consejo Consultivo de Aragón y qué requisito deben cumplir sus miembros?",
      reverso: "Por el Presidente y ocho miembros, nombrados por el Gobierno de Aragón mediante Decreto; deben ostentar la condición política de aragonés",
    },
    {
      anverso: "Según el art. 6 de la Ley 1/2009, ¿cómo se distribuyen los ocho miembros del Consejo Consultivo de Aragón?",
      reverso: "Seis entre juristas de reconocido prestigio con más de diez años de experiencia profesional, y dos entre quienes hayan desempeñado determinados cargos públicos de relevancia (p. ej. Presidente de Aragón, Justicia de Aragón, Consejero...)",
    },
    {
      anverso: "Según el art. 8 de la Ley 1/2009, ¿cuál es la duración del mandato del Presidente y los miembros del Consejo Consultivo de Aragón?",
      reverso: "Tres años, con posibilidad de reelección por dos períodos más",
    },
    {
      anverso: "Según el art. 14 de la Ley 1/2009, ¿son vinculantes los dictámenes del Consejo Consultivo de Aragón?",
      reverso: "No, salvo que la ley disponga expresamente lo contrario (la consulta es preceptiva o facultativa según establezca la ley)",
    },
    {
      anverso: "Según el art. 18 de la Ley 1/2009, ¿cómo actúa el Consejo Consultivo de Aragón y cómo se compone cada órgano?",
      reverso: "En Pleno (Presidente y todos los miembros) y en Comisión (Presidente y los seis miembros juristas de reconocido prestigio)",
    },
    {
      anverso: "Según el art. 15.1 de la Ley 1/2009, ¿sobre qué anteproyecto debe dictaminar preceptivamente el Consejo Consultivo de Aragón?",
      reverso: "Sobre los anteproyectos de reforma del Estatuto de Autonomía de Aragón",
    },
    {
      anverso: "Según el art. 3 de la Ley 1/2009, ¿dónde tiene su sede el Consejo Consultivo de Aragón?",
      reverso: "En la ciudad de Zaragoza",
    },
    {
      anverso: "Según el preámbulo de la Ley 1/2009, ¿qué órgano precedió al Consejo Consultivo de Aragón, creado por la Ley 1/1995 del Presidente y del Gobierno de Aragón?",
      reverso: "La Comisión Jurídica Asesora",
    },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: SECCION })),
);

console.log(`📝 preguntas de test (${SECCION})...`);
await insertarPreguntasConOpciones([
  {
    enunciado: "Según el art. primero de la Ley Orgánica 3/1980, ¿qué naturaleza tiene el Consejo de Estado?",
    explicacion: "Es el supremo órgano consultivo del Gobierno, que ejerce la función consultiva con autonomía orgánica y funcional para garantizar su objetividad e independencia.",
    dificultad: "facil",
    opciones: [
      "El supremo órgano consultivo del Gobierno",
      "Un órgano de la Administración de Justicia con funciones jurisdiccionales",
      "Una cámara legislativa de segunda lectura",
      "Un órgano de control económico-presupuestario",
    ],
    correcta: 0,
  },
  {
    enunciado: "Según el art. segundo.2 de la LO 3/1980, ¿en qué casos es preceptiva la consulta al Consejo de Estado?",
    explicacion: "La consulta será preceptiva cuando en la propia ley del Consejo de Estado o en otras leyes así se establezca, y facultativa en los demás casos.",
    dificultad: "media",
    opciones: [
      "Cuando esta u otras leyes así lo establezcan",
      "Siempre, en todo proyecto normativo del Gobierno sin excepción",
      "Únicamente cuando lo pida el Congreso de los Diputados",
      "Nunca; toda consulta al Consejo de Estado es facultativa",
    ],
    correcta: 0,
  },
  {
    enunciado: "Según el art. tercero de la LO 3/1980, ¿en qué órganos actúa el Consejo de Estado?",
    explicacion: "Actúa en Pleno, en Comisión Permanente o en Comisión de Estudios, y también puede actuar en Secciones conforme a su reglamento orgánico.",
    dificultad: "media",
    opciones: [
      "En Pleno, Comisión Permanente o Comisión de Estudios (y en Secciones)",
      "Únicamente en Pleno, sin órganos internos de trabajo",
      "En Junta de Gobierno y Junta General exclusivamente",
      "En Comisión Ejecutiva y Comisión de Vigilancia",
    ],
    correcta: 0,
  },
  {
    enunciado: "Según el art. veinticuatro de la LO 3/1980, ¿cuándo es preceptivo el dictamen del Consejo de Estado para una Comunidad Autónoma?",
    explicacion: "Cuando la Comunidad Autónoma carezca de órgano consultivo propio, en los mismos casos previstos por la ley orgánica para el Estado, siempre que haya asumido las competencias correspondientes — de ahí que Aragón, al contar con su propio Consejo Consultivo, no dependa del Consejo de Estado para sus dictámenes preceptivos.",
    dificultad: "dificil",
    opciones: [
      "Cuando la Comunidad Autónoma carezca de órgano consultivo propio",
      "En ningún caso; el dictamen del Consejo de Estado nunca alcanza a las Comunidades Autónomas",
      "Solo cuando lo autorice expresamente el Senado",
      "Únicamente para las Comunidades Autónomas de régimen foral",
    ],
    correcta: 0,
  },
  {
    enunciado: "Según el art. 1 de la Ley 1/2009, del Consejo Consultivo de Aragón, ¿qué es este órgano y a qué está adscrito?",
    explicacion: "Es el supremo órgano consultivo del Gobierno y de la Administración de la Comunidad Autónoma de Aragón, adscrito a la Presidencia del Gobierno de Aragón, sin que ello suponga dependencia jerárquica en el ejercicio de sus funciones.",
    dificultad: "facil",
    opciones: [
      "El supremo órgano consultivo del Gobierno y la Administración de Aragón, adscrito a Presidencia",
      "Un órgano jurisdiccional adscrito al Tribunal Superior de Justicia de Aragón",
      "Un órgano de fiscalización económica adscrito a la Cámara de Cuentas",
      "Un órgano parlamentario adscrito a las Cortes de Aragón",
    ],
    correcta: 0,
  },
  {
    enunciado: "Según el art. 4 de la Ley 1/2009, ¿cómo está integrado el Consejo Consultivo de Aragón?",
    explicacion: "Por el Presidente y ocho miembros, nombrados por el Gobierno de Aragón mediante Decreto, siendo necesario ostentar la condición política de aragonés para formar parte de él.",
    dificultad: "media",
    opciones: [
      "Por el Presidente y ocho miembros",
      "Por el Presidente y quince miembros",
      "Por el Presidente y cuatro miembros",
      "Por el Presidente, sin miembros adicionales, asistido por letrados",
    ],
    correcta: 0,
  },
  {
    enunciado: "Según el art. 6 de la Ley 1/2009, ¿cómo se distribuyen los ocho miembros del Consejo Consultivo de Aragón (aparte del Presidente)?",
    explicacion: "Seis son nombrados entre juristas de reconocido prestigio con más de diez años de experiencia profesional, y dos entre quienes hayan desempeñado con anterioridad determinados cargos públicos de relevancia para Aragón.",
    dificultad: "dificil",
    opciones: [
      "Seis juristas de reconocido prestigio y dos que hayan desempeñado determinados cargos públicos",
      "Cuatro juristas y cuatro representantes de las entidades locales",
      "Todos los miembros deben ser, sin excepción, juristas de reconocido prestigio",
      "Cinco designados por el Gobierno y tres por las Cortes de Aragón directamente",
    ],
    correcta: 0,
  },
  {
    enunciado: "¿Cuál es la duración del mandato del Presidente y los miembros del Consejo Consultivo de Aragón, según el art. 8 de la Ley 1/2009?",
    explicacion: "Tres años, con posibilidad de reelección por dos períodos más.",
    dificultad: "facil",
    opciones: ["Tres años, reelegibles por dos períodos más", "Cuatro años, sin posibilidad de reelección", "Cinco años, reelegibles indefinidamente", "Un año, prorrogable tácitamente"],
    correcta: 0,
  },
  {
    enunciado: "Según el art. 18 de la Ley 1/2009, ¿cómo se compone la Comisión del Consejo Consultivo de Aragón, a diferencia del Pleno?",
    explicacion: "El Pleno lo forman el Presidente y todos los miembros; la Comisión la forman el Presidente y los miembros nombrados por ser juristas de reconocido prestigio y experiencia profesional (es decir, sin los dos miembros de perfil de cargo público).",
    dificultad: "dificil",
    opciones: [
      "El Presidente y los seis miembros juristas de reconocido prestigio",
      "El Presidente y los dos miembros de perfil de cargo público exclusivamente",
      "Los ocho miembros, sin el Presidente",
      "Un tercio de los miembros elegido por sorteo cada sesión",
    ],
    correcta: 0,
  },
  {
    enunciado: "Según el art. 15.1 de la Ley 1/2009, ¿sobre cuál de los siguientes asuntos debe ser consultado PRECEPTIVAMENTE el Consejo Consultivo de Aragón?",
    explicacion: "Los anteproyectos de reforma del Estatuto de Autonomía de Aragón figuran en primer lugar entre los dictámenes preceptivos del art. 15.",
    dificultad: "media",
    opciones: [
      "Los anteproyectos de reforma del Estatuto de Autonomía de Aragón",
      "Los contratos menores de cualquier cuantía",
      "Las circulares internas de organización de cada departamento",
      "Los nombramientos de personal eventual de gabinete",
    ],
    correcta: 0,
  },
]);

// ─────────────────────────────────────────────────────────────────────────
// Añade la sección nueva al recorte de DGA numero=5.
// ─────────────────────────────────────────────────────────────────────────
console.log("🔧 Añadiendo la sección nueva a secciones_incluidas de auxiliar-administrativo-dga / tema-30 (numero 5)...");

const getRes = await fetch(
  `${URL_BASE}/rest/v1/tema_oposicion?oposicion_slug=eq.auxiliar-administrativo-dga&tema_slug=eq.${TEMA}&select=secciones_incluidas`,
  { headers: HEADERS },
);
const [row] = await getRes.json();
if (!row) {
  console.error("❌ No se encontró la fila tema_oposicion para auxiliar-administrativo-dga / tema-30.");
  process.exit(1);
}
const nuevasSecciones = [...row.secciones_incluidas, SECCION];

const patchRes = await fetch(
  `${URL_BASE}/rest/v1/tema_oposicion?oposicion_slug=eq.auxiliar-administrativo-dga&tema_slug=eq.${TEMA}`,
  {
    method: "PATCH",
    headers: { ...HEADERS, Prefer: "return=representation" },
    body: JSON.stringify({ secciones_incluidas: nuevasSecciones }),
  },
);
if (!patchRes.ok) {
  console.error(`❌ Error actualizando tema_oposicion: ${patchRes.status} ${await patchRes.text()}`);
  process.exit(1);
}
const patched = await patchRes.json();
console.log(`   ✓ tema_oposicion actualizado: ${JSON.stringify(patched[0]?.secciones_incluidas)}`);

console.log("✅ Tema 5 de la DGA corregido: recorte completo y ajustado al programa oficial (Resolución 25-nov-2025).");
