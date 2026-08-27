/**
 * Corrige el Tema 10 de la oposición Auxiliar Administrativo DGA
 * ("La protección de datos... igualdad... prevención de riesgos", bloque-3),
 * cuyo recorte publicado (tema-2, LOIEMH) resultó estar INCOMPLETO respecto
 * al programa oficial vigente (Resolución de 25 de noviembre de 2025, ANEXO
 * XXXI, ítem 10 de "materias comunes"), verificado esta sesión leyendo el
 * PDF oficial de mia.aragon.es página por página.
 *
 * Texto oficial exacto del ítem 10:
 *   "Ley Orgánica 3/2007, de 22 de marzo, para la igualdad efectiva de
 *   mujeres y hombres. Título preliminar: Objeto y ámbito de la ley; título
 *   II: El principio de igualdad y la tutela contra la discriminación.
 *   Ley 7/2018, de 28 de junio, de igualdad de oportunidades entre mujeres
 *   y hombres en Aragón. Título II: Políticas Públicas para la igualdad de
 *   género. Ley 5/2019, de 21 de marzo, de derechos y garantías de las
 *   personas con discapacidad en Aragón: medidas en materia de empleo
 *   público."
 *
 * Dos problemas con el recorte anterior:
 *
 * 1) Se habían incluido TODOS los títulos de la LOIEMH (preliminar, 1-8 y
 *    disposiciones) cuando el programa solo pide título preliminar + el
 *    título que trata "el principio de igualdad y la tutela contra la
 *    discriminación". El propio texto del programa lo etiqueta como
 *    "título II", pero esa descripción coincide, verbatim, con el título
 *    que en la LOIEMH real es el TÍTULO I (arts. 3-11: comprobado
 *    consultando el contenido real de `loiemh-titulo-1` en la base de
 *    datos — discriminación, acoso — frente a `loiemh-titulo-2-cap-1/2`,
 *    que trata "políticas públicas para la igualdad": educación, salud,
 *    empleo, urbanismo... — es decir, el programa etiqueta mal el número
 *    de título, pero la MATERIA pedida es inequívoca). Se corrige el
 *    recorte a solo loiemh-titulo-preliminar + loiemh-titulo-1.
 *
 * 2) Faltaban por completo dos leyes exigidas expresamente por el
 *    programa: Ley 7/2018 (Aragón) Título II — políticas públicas para la
 *    igualdad de género (arts. 16-28) — y Ley 5/2019 (discapacidad en
 *    Aragón) en su vertiente de empleo público (arts. 27-28). Se añaden
 *    como dos secciones NUEVAS a `tema-2` (el tema canónico LOIEMH,
 *    compartido con otras oposiciones), siguiendo el mismo patrón de
 *    "ampliación" ya usado para tema-26/proteccion-datos-principios: no se
 *    toca ninguna sección existente de tema-2, así que ninguna otra
 *    oposición que lo use ve alterado su recorte.
 *
 * Fuentes: texto consolidado de la Ley 7/2018, de 28 de junio (BOE-A-2018-
 * 11932) y de la Ley 5/2019, de 21 de marzo (BOE-A-2019-7785), ambas
 * leídas íntegras para este seed vía BOE.
 *
 * A diferencia del script de ampliación de tema-26 (que dejó las preguntas
 * SIN opciones — bug detectado esta sesión), este script inserta también
 * las 4 opciones de cada pregunta de test, con una marcada como correcta.
 *
 * Uso: node --env-file=.env.local scripts/fix-tema10-dga-igualdad.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!URL_BASE || !SERVICE_KEY) {
  console.error("❌ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-2";

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

async function insertarPreguntasConOpciones(seccion, preguntas) {
  const filas = preguntas.map(({ opciones, correcta, ...p }) => ({ ...p, tema_slug: TEMA, seccion }));
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

// ─────────────────────────────────────────────────────────────────────────
// Sección nueva 1: Ley 7/2018, Título II — Políticas públicas para la
// igualdad de género (arts. 16-28)
// ─────────────────────────────────────────────────────────────────────────
const SECCION_LEY7 = "ley7-2018-titulo2-igualdad-genero";

console.log(`📝 flashcards (${SECCION_LEY7})...`);
await insertar(
  "flashcards",
  [
    {
      anverso: "Según el art. 16 de la Ley 7/2018, ¿qué principio deben integrar de forma activa las Administraciones públicas aragonesas en sus disposiciones y políticas públicas?",
      reverso: "El principio de igualdad de género, de forma transversal (transversalidad de género)",
    },
    {
      anverso: "Según el art. 17.2 de la Ley 7/2018, ¿qué colectivos de mujeres se consideran de especial vulnerabilidad a efectos del principio de interseccionalidad?",
      reverso: "Minorías étnicas (especialmente gitana), migrantes, niñas, mujeres con discapacidad, mayores, viudas, de familias monoparentales y víctimas de violencia",
    },
    {
      anverso: "Según el art. 18.1 de la Ley 7/2018 (en relación con el art. 37.3 de la Ley 2/2009), ¿qué deben incorporar todos los proyectos de ley que apruebe el Gobierno de Aragón?",
      reverso: "Un informe sobre su impacto por razón de género",
    },
    {
      anverso: "Según el art. 20.1 de la Ley 7/2018, ¿con qué periodicidad aprueba el Gobierno de Aragón el Plan Estratégico para la Igualdad entre Mujeres y Hombres?",
      reverso: "Cada cuatro años",
    },
    {
      anverso: "Según el art. 22.2 de la Ley 7/2018, ¿quiénes están obligados a hacer un uso integrador y no sexista del lenguaje y las imágenes?",
      reverso: "Los medios de comunicación públicos aragoneses, o los que perciban subvenciones públicas",
    },
    {
      anverso: "Según el art. 24 de la Ley 7/2018, ¿en qué ámbitos se garantiza el principio de representación equilibrada de mujeres y hombres?",
      reverso: "En órganos directivos, órganos colegiados de la Comunidad Autónoma, representantes en comités, consejos de administración de empresas públicas y órganos de selección de personal",
    },
    {
      anverso: "Según el art. 25.1 de la Ley 7/2018, ¿qué debe incorporar el Gobierno de Aragón en la regulación de los contratos de la Administración?",
      reverso: "Cláusulas sociales en igualdad de género",
    },
    {
      anverso: "Según el art. 26.3 de la Ley 7/2018, ¿a qué entidades se les deniega el otorgamiento de subvenciones, becas o ayudas públicas?",
      reverso: "A las sancionadas por resolución administrativa firme o condenadas por sentencia judicial firme por discriminación por razón de género",
    },
    {
      anverso: "Según el art. 28.1 de la Ley 7/2018, ¿qué deben incluir los temarios de las pruebas selectivas para acceder al empleo público en la Administración de la Comunidad Autónoma de Aragón?",
      reverso: "Materias relativas a la normativa sobre igualdad y violencia contra la mujer, así como formación de género vinculada con la transversalidad",
    },
    {
      anverso: "Según el art. 21.a) de la Ley 7/2018, ¿qué informe debe emitirse junto al anteproyecto de ley de presupuestos de la Comunidad Autónoma?",
      reverso: "El informe de evaluación de impacto de género del anteproyecto",
    },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: SECCION_LEY7 })),
);

console.log(`📝 preguntas de test (${SECCION_LEY7})...`);
await insertarPreguntasConOpciones(SECCION_LEY7, [
  {
    enunciado: "Según el art. 16 de la Ley 7/2018, de igualdad de oportunidades entre mujeres y hombres en Aragón, ¿qué principio deben integrar de forma transversal y activa las Administraciones públicas aragonesas en la elaboración de sus disposiciones normativas y políticas públicas?",
    explicacion: "El principio de transversalidad de género, conforme al art. 16, en desarrollo del art. 15 de la LOIEMH (Ley Orgánica 3/2007).",
    dificultad: "media",
    opciones: [
      "El principio de igualdad de género, de forma transversal",
      "El principio de eficiencia presupuestaria, sin más consideraciones",
      "El principio de jerarquía normativa exclusivamente",
      "El principio de descentralización competencial",
    ],
    correcta: 0,
  },
  {
    enunciado: "Según el art. 17.2 de la Ley 7/2018, ¿cuál de los siguientes colectivos de mujeres NO se menciona expresamente entre los de especial vulnerabilidad a efectos del principio de interseccionalidad?",
    explicacion: "El artículo menciona expresamente a las integrantes de minorías étnicas (en especial la comunidad gitana), migrantes, niñas, mujeres con discapacidad, mayores, viudas, de familias monoparentales y víctimas de violencia. No menciona a las funcionarias en prácticas como colectivo de especial vulnerabilidad.",
    dificultad: "dificil",
    opciones: [
      "Las funcionarias en período de prácticas",
      "Las mujeres pertenecientes a la etnia gitana",
      "Las mujeres con discapacidad",
      "Las mujeres víctimas de violencia",
    ],
    correcta: 0,
  },
  {
    enunciado: "Según el art. 18.1 de la Ley 7/2018, en relación con el art. 37.3 de la Ley 2/2009, del Presidente y del Gobierno de Aragón, ¿qué deben incorporar todos los proyectos de ley que apruebe el Gobierno de Aragón?",
    explicacion: "Un informe sobre su impacto por razón de género, como parte de la evaluación previa del impacto de género regulada en el art. 18 de la Ley 7/2018.",
    dificultad: "media",
    opciones: [
      "Un informe sobre su impacto por razón de género",
      "Un informe de impacto medioambiental exclusivamente",
      "Un dictamen previo del Justicia de Aragón",
      "Una memoria de sostenibilidad financiera únicamente",
    ],
    correcta: 0,
  },
  {
    enunciado: "¿Con qué periodicidad debe aprobar el Gobierno de Aragón el Plan Estratégico para la Igualdad entre Mujeres y Hombres, según el art. 20.1 de la Ley 7/2018?",
    explicacion: "Cada cuatro años, a propuesta del departamento competente en materia de igualdad de género.",
    dificultad: "facil",
    opciones: ["Cada cuatro años", "Cada dos años", "Cada seis años", "Cada legislatura, sin plazo fijo"],
    correcta: 0,
  },
  {
    enunciado: "Según el art. 22.2 de la Ley 7/2018, ¿qué medios de comunicación están obligados a hacer un uso integrador y no sexista del lenguaje y las imágenes?",
    explicacion: "Los medios de comunicación públicos aragoneses, o los que perciban subvenciones públicas.",
    dificultad: "media",
    opciones: [
      "Los medios de comunicación públicos aragoneses o que perciban subvenciones públicas",
      "Únicamente la Corporación Aragonesa de Radio y Televisión",
      "Todos los medios de comunicación sin excepción, también los privados sin subvención",
      "Solo los medios digitales, no los impresos ni audiovisuales",
    ],
    correcta: 0,
  },
  {
    enunciado: "Según el art. 25.1 de la Ley 7/2018, ¿qué debe incorporar el Gobierno de Aragón en la regulación de los contratos celebrados por la Administración de la Comunidad Autónoma?",
    explicacion: "Cláusulas sociales en igualdad de género que incorporen el cumplimiento de la normativa en materia de igualdad entre hombres y mujeres.",
    dificultad: "media",
    opciones: [
      "Cláusulas sociales en igualdad de género",
      "Cláusulas de revisión de precios exclusivamente",
      "Cláusulas de exclusividad territorial",
      "Cláusulas de confidencialidad reforzada",
    ],
    correcta: 0,
  },
  {
    enunciado: "Según el art. 26.3 de la Ley 7/2018, ¿a qué empresas o entidades se les deniega el otorgamiento de subvenciones, becas o cualquier otro tipo de ayuda pública?",
    explicacion: "A las sancionadas por resolución administrativa firme o condenadas por sentencia judicial firme, por acciones u omisiones consideradas discriminatorias por razón de género.",
    dificultad: "media",
    opciones: [
      "Las sancionadas por resolución administrativa firme o condenadas por sentencia firme por discriminación de género",
      "Las que no tengan sede social en Aragón",
      "Las que hayan solicitado ayudas en los tres años anteriores",
      "Las que no dispongan de página web corporativa",
    ],
    correcta: 0,
  },
  {
    enunciado: "Según el art. 28.1 de la Ley 7/2018, ¿qué deben incluir los temarios de las pruebas selectivas para el acceso al empleo público en la Administración de la Comunidad Autónoma de Aragón?",
    explicacion: "Materias relativas a la normativa sobre igualdad y violencia contra la mujer, así como formación de género vinculada con la transversalidad — precisamente el fundamento de que este propio tema forme parte del temario.",
    dificultad: "media",
    opciones: [
      "Materias relativas a la normativa sobre igualdad y violencia contra la mujer",
      "Exclusivamente contenidos de ofimática",
      "Solo contenidos de organización administrativa general",
      "Ninguna materia específica; queda a discreción del tribunal",
    ],
    correcta: 0,
  },
]);

// ─────────────────────────────────────────────────────────────────────────
// Sección nueva 2: Ley 5/2019, arts. 27-28 — Empleo público (personas con
// discapacidad)
// ─────────────────────────────────────────────────────────────────────────
const SECCION_LEY5 = "ley5-2019-empleo-publico";

console.log(`📝 flashcards (${SECCION_LEY5})...`);
await insertar(
  "flashcards",
  [
    {
      anverso: "Según el art. 27.2 de la Ley 5/2019, ¿qué porcentaje mínimo de las vacantes de las ofertas de empleo público se reserva para personas con discapacidad?",
      reverso: "Un cupo no inferior al 8%",
    },
    {
      anverso: "Según el art. 27.2 de la Ley 5/2019, ¿qué porcentaje de efectivos totales con discapacidad debe alcanzarse progresivamente en la Administración de la Comunidad Autónoma de Aragón?",
      reverso: "El 2% de los efectivos totales",
    },
    {
      anverso: "Dentro del cupo del 8% del art. 27.2, ¿qué porcentaje mínimo debe reservarse para personas que acrediten discapacidad intelectual?",
      reverso: "Al menos el 2% de las plazas ofertadas",
    },
    {
      anverso: "Dentro del cupo del 8% del art. 27.2, ¿qué porcentaje se reserva para personas con enfermedad mental que acrediten un grado de discapacidad igual o superior al 33%?",
      reverso: "El 1%",
    },
    {
      anverso: "Según el art. 27.3 de la Ley 5/2019, ¿qué ocurre con las plazas reservadas al turno de discapacidad que no lleguen a cubrirse?",
      reverso: "Se acumulan a posteriores ofertas de empleo público, hasta un límite del 8%",
    },
    {
      anverso: "Según el art. 27.5 de la Ley 5/2019, previo informe del IASS, ¿qué puede autorizarse durante las pruebas de acceso a solicitud de la persona interesada?",
      reverso: "El acceso de su asistente personal para la atención de sus necesidades básicas (sin poder intervenir en la cumplimentación de cuestionarios o ejercicios escritos)",
    },
    {
      anverso: "Según el art. 27.7 de la Ley 5/2019, ¿quién tiene preferencia en la elección de los puestos ofertados para su adjudicación en primer destino?",
      reverso: "Las personas aspirantes con discapacidad igual o superior al 65%, o que tengan a su cargo menores de 12 años con necesidades de autonomía por discapacidad atendidos por Atención Temprana del IASS",
    },
    {
      anverso: "Según el art. 27.9 de la Ley 5/2019, ¿qué plan debe aprobar el Gobierno de Aragón?",
      reverso: "El Plan de Función Pública Inclusiva en la Administración de la Comunidad Autónoma de Aragón",
    },
    {
      anverso: "Según el art. 28.1 de la Ley 5/2019, ¿qué organismo fomenta la formación integral de los empleados públicos que trabajan con personas con discapacidad?",
      reverso: "El Instituto Aragonés de Administración Pública (IAAP), incluyendo formación en sistemas de comunicación aumentativa y alternativa",
    },
    {
      anverso: "Según el art. 27.4 de la Ley 5/2019, en los procesos selectivos de clases de especialidad para personas con discapacidad intelectual, ¿qué se puede establecer en lugar de las pruebas de acceso ordinarias?",
      reverso: "Procedimientos alternativos dirigidos a comprobar que se poseen los conocimientos imprescindibles para el desempeño del puesto",
    },
  ].map((f) => ({ ...f, tema_slug: TEMA, seccion: SECCION_LEY5 })),
);

console.log(`📝 preguntas de test (${SECCION_LEY5})...`);
await insertarPreguntasConOpciones(SECCION_LEY5, [
  {
    enunciado: "Según el art. 27.2 de la Ley 5/2019, de derechos y garantías de las personas con discapacidad en Aragón, ¿qué cupo mínimo de las vacantes de las ofertas de empleo público se reserva para personas con discapacidad?",
    explicacion: "Un cupo no inferior al 8% de las vacantes, con el objetivo de alcanzar progresivamente el 2% de los efectivos totales de la Administración.",
    dificultad: "media",
    opciones: ["El 8%", "El 5%", "El 2%", "El 10%"],
    correcta: 0,
  },
  {
    enunciado: "Dentro de ese cupo mínimo del 8%, ¿qué porcentaje debe reservarse, como mínimo, para personas que acrediten discapacidad intelectual, según el art. 27.2?",
    explicacion: "Al menos el 2% de las plazas ofertadas debe reservarse para personas con discapacidad intelectual, y un 1% adicional para personas con enfermedad mental con grado igual o superior al 33%.",
    dificultad: "dificil",
    opciones: ["El 2%", "El 8% íntegro", "El 0,5%", "No existe reserva específica dentro del cupo"],
    correcta: 0,
  },
  {
    enunciado: "Según el art. 27.3 de la Ley 5/2019, si no se cubren las plazas vacantes reservadas para el turno de discapacidad, ¿qué ocurre con ellas?",
    explicacion: "Se acumulan a posteriores ofertas de empleo público, hasta un límite del 8%.",
    dificultad: "media",
    opciones: [
      "Se acumulan a posteriores ofertas hasta un límite del 8%",
      "Se pierden definitivamente y no pueden recuperarse",
      "Pasan automáticamente al turno libre general de la misma convocatoria",
      "Se convierten en plazas de promoción interna",
    ],
    correcta: 0,
  },
  {
    enunciado: "Según el art. 27.5 de la Ley 5/2019, previo informe del Instituto Aragonés de Servicios Sociales, ¿qué puede autorizarse a solicitud de la persona interesada durante la realización de las pruebas de acceso?",
    explicacion: "El acceso de su asistente personal para la atención de sus necesidades básicas, sin que pueda comportar la cumplimentación de cuestionarios o ejercicios escritos inherentes al proceso selectivo.",
    dificultad: "dificil",
    opciones: [
      "El acceso de su asistente personal para la atención de sus necesidades básicas",
      "La sustitución completa del ejercicio escrito por un ejercicio oral",
      "La exención total de la parte teórica del proceso selectivo",
      "La repetición automática de la prueba en una convocatoria posterior",
    ],
    correcta: 0,
  },
  {
    enunciado: "¿Quién tiene preferencia en la elección de los puestos ofertados para su adjudicación en primer destino, según el art. 27.7 de la Ley 5/2019?",
    explicacion: "Las personas aspirantes que, habiendo superado el proceso selectivo, cuenten con una discapacidad igual o superior al 65%, o tengan a su cargo menores de 12 años con necesidades de autonomía personal por discapacidad atendidos por los Servicios de Atención Temprana del IASS.",
    dificultad: "dificil",
    opciones: [
      "Las personas aspirantes con discapacidad igual o superior al 65%, u otras condiciones equivalentes previstas en el artículo",
      "Únicamente quienes hayan obtenido la mejor puntuación en el proceso selectivo",
      "Las personas aspirantes de mayor edad entre las que hayan aprobado",
      "No existe ningún criterio de preferencia en la elección de destino",
    ],
    correcta: 0,
  },
  {
    enunciado: "Según el art. 27.9 de la Ley 5/2019, ¿qué instrumento de planificación debe aprobar el Gobierno de Aragón en materia de función pública y discapacidad?",
    explicacion: "El Plan de Función Pública Inclusiva en la Administración de la Comunidad Autónoma de Aragón.",
    dificultad: "media",
    opciones: [
      "El Plan de Función Pública Inclusiva",
      "El Plan Estratégico para la Igualdad entre Mujeres y Hombres",
      "El Plan de Acción Integral para las Personas con Discapacidad en Aragón",
      "El Plan de Empleo Juvenil de Aragón",
    ],
    correcta: 0,
  },
  {
    enunciado: "Según el art. 28.1 de la Ley 5/2019, ¿qué organismo fomenta la formación integral de los empleados públicos que trabajan con personas con discapacidad, incluyendo formación en sistemas de comunicación aumentativa y alternativa?",
    explicacion: "El Instituto Aragonés de Administración Pública (IAAP), departamento competente en materia de administración pública.",
    dificultad: "media",
    opciones: [
      "El Instituto Aragonés de Administración Pública (IAAP)",
      "El Instituto Aragonés de Servicios Sociales (IASS)",
      "El Instituto Aragonés de Empleo (INAEM)",
      "El Instituto Aragonés de la Mujer",
    ],
    correcta: 0,
  },
  {
    enunciado: "Según el art. 27.4 de la Ley 5/2019, en los procesos selectivos de clases de especialidad para personas con discapacidad intelectual, ¿qué puede establecerse en lugar de las pruebas de acceso ordinarias?",
    explicacion: "Procedimientos alternativos dirigidos a comprobar que se poseen los conocimientos imprescindibles para el desempeño de las funciones propias del puesto de trabajo.",
    dificultad: "dificil",
    opciones: [
      "Procedimientos alternativos que comprueben los conocimientos imprescindibles para el puesto",
      "La exención total de cualquier proceso de selección",
      "Un sorteo entre las personas candidatas inscritas",
      "La convocatoria de una entrevista libre sin criterios objetivos",
    ],
    correcta: 0,
  },
]);

console.log(
  `✅ tema-2 ampliado con 2 secciones nuevas: ${SECCION_LEY7} (10 flashcards + 8 preguntas) y ${SECCION_LEY5} (10 flashcards + 8 preguntas).`,
);

// ─────────────────────────────────────────────────────────────────────────
// Corrige el recorte de DGA numero=10: quita los títulos LOIEMH que el
// programa no pide (2 a 8 y disposiciones) y añade las dos secciones
// nuevas.
// ─────────────────────────────────────────────────────────────────────────
console.log("🔧 Corrigiendo secciones_incluidas de auxiliar-administrativo-dga / tema-2 (numero 10)...");
const nuevasSecciones = ["loiemh-titulo-preliminar", "loiemh-titulo-1", SECCION_LEY7, SECCION_LEY5];

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

console.log("✅ Tema 10 de la DGA corregido: recorte completo y ajustado al programa oficial (Resolución 25-nov-2025).");
