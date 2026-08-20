/**
 * Script de seed inicial: vuelca en Supabase los datos que hasta ahora vivían
 * en src/data/{oposiciones,convocatorias,temario/*}.ts.
 *
 * Uso: node --env-file=.env.local scripts/seed.mjs
 *
 * Usa la clave service_role (salta RLS). Idempotente por PK/unique: si algo
 * ya existe, lo actualiza en vez de duplicar (upsert con Prefer: resolution=merge-duplicates).
 */

const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!URL_BASE || !SERVICE_KEY) {
  console.error("❌ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const HEADERS = {
  apikey: SERVICE_KEY,
  Authorization: `Bearer ${SERVICE_KEY}`,
  "Content-Type": "application/json",
};

async function upsert(tabla, filas, onConflict) {
  const res = await fetch(`${URL_BASE}/rest/v1/${tabla}?on_conflict=${onConflict}`, {
    method: "POST",
    headers: {
      ...HEADERS,
      Prefer: "resolution=merge-duplicates,return=representation",
    },
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

// ── 1. OPOSICIONES ────────────────────────────────────────────────────────
console.log("📝 oposiciones...");
await upsert(
  "oposiciones",
  [
    {
      slug: "auxiliar-administrativo",
      nombre: "Auxiliar Administrativo",
      organismo: "Ayuntamiento de Zaragoza",
      descripcion_corta: "Preparación online para Auxiliar Administrativo del Ayuntamiento de Zaragoza.",
      descripcion_larga:
        "Temario interactivo para preparar la oposición de Auxiliar Administrativo del Ayuntamiento de Zaragoza: 20 temas oficiales organizados en 7 bloques.",
      activa: true,
    },
  ],
  "slug"
);

// ── 2. BLOQUES ─────────────────────────────────────────────────────────────
console.log("📝 bloques...");
const BLOQUES = [
  { slug: "bloque-1", titulo: "Bloque 1 — Marco constitucional y territorial", descripcion: "Constitución Española, Estatuto de Autonomía de Aragón y la organización territorial y municipal.", orden: 1 },
  { slug: "bloque-2", titulo: "Bloque 2 — Igualdad y políticas sociales", descripcion: "Políticas públicas de igualdad efectiva de género, tutela contra la discriminación, protección a las víctimas de violencia de género y plan de igualdad de Zaragoza.", orden: 2 },
  { slug: "bloque-3", titulo: "Bloque 3 — Procedimiento administrativo", descripcion: "Disposiciones de la Ley 39/2015 del Procedimiento Administrativo Común de las Administraciones Públicas.", orden: 3 },
  { slug: "bloque-4", titulo: "Bloque 4 — Régimen local", descripcion: "Contratación administrativa, patrimonio de las entidades locales, fomento, participación ciudadana y potestad reglamentaria.", orden: 4 },
  { slug: "bloque-5", titulo: "Bloque 5 — Hacienda local", descripcion: "Presupuestos y recursos de las Haciendas Locales y especialidades del régimen de capitalidad de Zaragoza.", orden: 5 },
  { slug: "bloque-6", titulo: "Bloque 6 — Función pública", descripcion: "Clases de empleados públicos, derechos y deberes, situaciones administrativas, régimen disciplinario y función pública local.", orden: 6 },
  { slug: "bloque-7", titulo: "Bloque 7 — Urbanismo", descripcion: "Aspectos básicos de la Ley de Urbanismo de Aragón.", orden: 7 },
].map((b) => ({ ...b, oposicion_slug: "auxiliar-administrativo" }));
const bloquesInsertados = await upsert("bloques", BLOQUES, "oposicion_slug,slug");
const bloqueIdPorSlug = Object.fromEntries(bloquesInsertados.map((b) => [b.slug, b.id]));

// ── 3. TEMAS (canónicos) ────────────────────────────────────────────────────
console.log("📝 temas...");
const TEMAS = [
  { slug: "tema-1", titulo: "La Constitución Española", descripcion: "Elaboración y aprobación. Estructura y título preliminar. La Administración pública en la Constitución. Organización territorial del Estado: principios generales y Administración local.", contenido: "La Constitución Española de 1978 es la norma suprema del ordenamiento jurídico. Se divide en un Título Preliminar y 10 Títulos numerados (169 artículos). Consagra la soberanía nacional en el pueblo español y la forma política de la Monarquía parlamentaria.", enlaces_boe: [{ titulo: "Constitución Española", url: "https://www.boe.es/buscar/act.php?id=BOE-A-1978-31229" }] },
  { slug: "tema-3", titulo: "El Estatuto de Autonomía de Aragón", descripcion: "Título preliminar. Organización institucional de la Comunidad Autónoma (Cortes, Presidente y Gobierno). Clases de competencias de la Comunidad Autónoma.", contenido: "El Estatuto de Autonomía es la norma institucional básica de Aragón. El Título Preliminar define a Aragón como nacionalidad histórica y regula sus símbolos, derechos y lenguas. Organiza sus Cortes legislativas, la Presidencia y la Diputación General o Gobierno.", enlaces_boe: [{ titulo: "Estatuto de Autonomía de Aragón", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2007-8444" }] },
  { slug: "tema-14", titulo: "El municipio y régimen especial de Zaragoza", descripcion: "El municipio: territorio y población (Padrón). Competencias y servicios mínimos obligatorios. Régimen de municipios de gran población. Ley de régimen especial de Zaragoza.", contenido: "Estudia el término municipal y los vecinos del Padrón. Detalla las competencias exclusivas y delegadas y los servicios mínimos por población. Incorpora la organización de municipios de Gran Población y el Estatuto de Zaragoza como capital aragonesa.", enlaces_boe: [] },
  { slug: "tema-2", titulo: "Igualdad de género y Violencia de Género", descripcion: "La Ley para la igualdad efectiva de mujeres y hombres: el principio de igualdad y la tutela contra la discriminación. La Ley de Prevención y Protección Integral a las Mujeres Víctimas de Violencia en Aragón: disposiciones generales y medidas de protección y apoyo a las víctimas. El Plan de Igualdad para empleadas y empleados del Ayuntamiento de Zaragoza.", contenido: "Regula el principio de igualdad de trato y la tutela contra la discriminación directa o indirecta (LOIEMH), las medidas de protección y apoyo a las víctimas de violencia de género en Aragón (Ley 4/2007) y las directrices internas del II Plan de Igualdad para empleadas y empleados del Ayuntamiento de Zaragoza (2024).", enlaces_boe: [
    { titulo: "Ley para la igualdad efectiva de mujeres y hombres", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2007-6115", pdf: "tema-2-ley-igualdad" },
    { titulo: "Ley de Prevención y Protección Integral a las Mujeres Víctimas de Violencia de Aragón", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2007-11593", pdf: "tema-2-ley-violencia-genero" },
    { titulo: "Plan de Igualdad del Ayuntamiento de Zaragoza", url: "https://www.zaragoza.es/cont/paginas/catalogopublicaciones/doc/12293.pdf", pdf: "tema-2-plan-igualdad-zaragoza" },
  ] },
  { slug: "tema-4", titulo: "Los interesados en el procedimiento", descripcion: "La Ley del Procedimiento Administrativo Común (I): capacidad de obrar, concepto de interesado, representación y pluralidad de interesados.", contenido: "Regula quiénes son considerados interesados ante la administración (titulares de derechos o intereses legítimos), su capacidad de obrar y los mecanismos legales para actuar mediante representantes acreditados.", enlaces_boe: [{ titulo: "Ley 39/2015, del Procedimiento Administrativo Común", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565" }] },
  { slug: "tema-5", titulo: "La actividad de las Administraciones Públicas", descripcion: "La Ley del Procedimiento Administrativo Común (II): normas generales de actuación. Términos y plazos: obligatoriedad, cómputo y ampliación de plazos.", contenido: "Establece las reglas generales de la actividad administrativa, la lengua de los procedimientos, el derecho de acceso, la obligatoriedad de plazos expresados en horas, días, meses o años, y las normas de cómputo.", enlaces_boe: [{ titulo: "Ley 39/2015, del Procedimiento Administrativo Común", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565" }] },
  { slug: "tema-6", titulo: "Los actos administrativos", descripcion: "La Ley del Procedimiento Administrativo Común (III): requisitos de los actos. Eficacia. Nulidad y anulabilidad. Nulidad de pleno derecho.", contenido: "El acto administrativo es la declaración unilateral de voluntad realizada por la Administración en ejercicio de una potestad. Se presumen válidos y eficaces desde que se dictan, salvo supuestos específicos de nulidad de pleno derecho (art. 47) o anulabilidad (art. 48).", enlaces_boe: [{ titulo: "Ley 39/2015, del Procedimiento Administrativo Común", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565" }] },
  { slug: "tema-7", titulo: "Disposiciones sobre el procedimiento administrativo común", descripcion: "La Ley del Procedimiento Administrativo Común (IV): fases del procedimiento común: iniciación (de oficio y a solicitud), ordenación, instrucción y finalización.", contenido: "El procedimiento común discurre por cuatro fases obligatorias: 1. Iniciación (acuerdo o solicitud); 2. Ordenación (impulso de oficio); 3. Instrucción (pruebas, informes y alegaciones); y 4. Finalización (resolución expresa, desistimiento, renuncia o caducidad).", enlaces_boe: [{ titulo: "Ley 39/2015, del Procedimiento Administrativo Común", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565" }] },
  { slug: "tema-8", titulo: "Revisión de actos en vía administrativa", descripcion: "La Ley del Procedimiento Administrativo Común (V): revisión de oficio y recursos administrativos (recurso de alzada, de reposición y extraordinario de revisión).", contenido: "Mecanismos para corregir las actuaciones administrativas sin acudir a los tribunales. Regula la revisión de oficio de actos nulos y la interposición de recursos ordinarios de alzada (ante el superior) o reposición (ante el mismo órgano).", enlaces_boe: [{ titulo: "Ley 39/2015, del Procedimiento Administrativo Común", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565" }] },
  { slug: "tema-9", titulo: "Los contratos del sector público", descripcion: "Delimitación de los tipos contractuales. Competencias en materia de contratación en las Entidades Locales. Normas específicas de contratación local.", contenido: "Regula las tipologías de contratos (obras, servicios, suministros, concesiones) en la administración local, definiendo los órganos de contratación competentes y los trámites de adjudicación simplificados y ordinarios.", enlaces_boe: [{ titulo: "Ley de Contratos del Sector Público", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2017-12902" }] },
  { slug: "tema-10", titulo: "Los bienes de las entidades locales", descripcion: "Clasificación de los bienes locales: bienes de dominio público (uso público y servicio público) y bienes patrimoniales. Conservación y defensa.", contenido: "Los municipios poseen patrimonio propio. Los bienes de dominio público son inalienables, imprescriptibles e inembargables. Los bienes patrimoniales o de propios se rigen por el derecho privado con especialidades locales.", enlaces_boe: [] },
  { slug: "tema-11", titulo: "La actividad de las entidades locales", descripcion: "Formas de actividad de policía y fomento. El servicio público local: concepto, modos de gestión directa e indirecta.", contenido: "Las entidades locales intervienen en la vida ciudadana mediante policía (licencias y órdenes) y fomento (subvenciones). Prestan servicios mínimos bajo gestión directa (por la propia entidad) o indirecta (concesiones a terceros).", enlaces_boe: [] },
  { slug: "tema-15", titulo: "Participación ciudadana y atención al público", descripcion: "El Reglamento de Órganos territoriales y Participación ciudadana de Zaragoza. El Manual de Atención a la ciudadanía del Ayuntamiento de Zaragoza.", contenido: "Analiza los canales de participación colectiva e individual del municipio (Juntas de Distrito y Vecinales, consultas públicas) y el protocolo de calidad en el trato directo e informativo recogido en el Manual de Atención al Ciudadano.", enlaces_boe: [] },
  { slug: "tema-16", titulo: "Reglamentos y ordenanzas de los municipios", descripcion: "Reglamentos y ordenanzas municipales: concepto y procedimiento de elaboración. La aprobación de ordenanzas fiscales y reglamentos en la ley de capitalidad de Zaragoza.", contenido: "Las entidades locales ejercen su potestad reglamentaria a través de Ordenanzas (normas generales) y Reglamentos (autoorganización). Se detallan sus fases de aprobación y las especialidades fiscales simplificadas del Ayuntamiento de Zaragoza.", enlaces_boe: [] },
  { slug: "tema-12", titulo: "Haciendas Locales: Recursos municipales", descripcion: "La Ley reguladora de las Haciendas Locales (I): tributos municipales (tasas, contribuciones especiales e impuestos municipales obligatorios y potestativos) y precios públicos.", contenido: "Clasifica las fuentes de financiación del municipio: tasas por servicios o uso del espacio, contribuciones por obras que revaloricen inmuebles, impuestos locales (IBI, IAE, IVTM, ICIO) y precios públicos.", enlaces_boe: [{ titulo: "Ley reguladora de las Haciendas Locales", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2004-4214" }] },
  { slug: "tema-13", titulo: "Haciendas Locales: El presupuesto municipal", descripcion: "La Ley reguladora de las Haciendas Locales (II): estructura, contenido, aprobación y ejecución del presupuesto. Especialidades en la Ley de Capitalidad de Zaragoza.", contenido: "El presupuesto es la expresión contable anual de gastos y estimación de ingresos del municipio. Su aprobación requiere exposición pública, informe de intervención y el voto favorable del Pleno, con singularidades específicas en la Ley de Capitalidad de Zaragoza.", enlaces_boe: [{ titulo: "Ley reguladora de las Haciendas Locales", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2004-4214" }] },
  { slug: "tema-17", titulo: "Los empleados públicos: clases, derechos y deberes", descripcion: "El Estatuto Básico del Empleado Público (I): personal funcionario de carrera e interino, laboral y eventual. Derechos individuales, deberes y código de conducta.", contenido: "Regula las tipologías de personal al servicio de las administraciones, su régimen de derechos (vacaciones, retribuciones, carrera) y el catálogo ético y de conducta que deben guardar en el ejercicio de sus funciones.", enlaces_boe: [] },
  { slug: "tema-18", titulo: "Situaciones administrativas y régimen disciplinario", descripcion: "El Estatuto Básico del Empleado Público (II): adquisición y pérdida de la relación de servicio. Situaciones administrativas. Régimen disciplinario y faltas.", contenido: "Analiza el ingreso (oposición) y cese (jubilación, sanción). Clasifica las situaciones administrativas (servicio activo, servicios especiales, excedencias) y las faltas disciplinarias clasificadas en muy graves, graves y leves.", enlaces_boe: [] },
  { slug: "tema-19", titulo: "La función pública local", descripcion: "Peculiaridades del régimen de los empleados públicos de las entidades locales: planificación de recursos humanos, estructuración del empleo público y provisión de puestos de trabajo.", contenido: "Organización de los recursos humanos a nivel municipal: planificación de plantillas orgánicas y relaciones de puestos de trabajo (RPT), la oferta de empleo público (OEP), la provisión y movilidad de puestos, y los cuerpos específicos de funcionarios de habilitación nacional y locales.", enlaces_boe: [] },
  { slug: "tema-23", titulo: "La Ley de Urbanismo de Aragón", descripcion: "Aspectos básicos sobre régimen urbanístico del suelo, planeamiento urbanístico, gestión urbanística, edificación y uso del suelo, y disciplina urbanística.", contenido: "El texto refundido de la Ley de Urbanismo de Aragón regula el régimen urbanístico del suelo (clasificación y régimen de derechos y deberes), los instrumentos de planeamiento, los sistemas de gestión urbanística, las condiciones de edificación y uso del suelo, y el régimen de disciplina urbanística (inspección, protección de la legalidad y régimen sancionador).", enlaces_boe: [{ titulo: "Ley de Urbanismo de Aragón", url: "https://www.boe.es/buscar/act.php?id=BOA-d-2014-90410" }] },
];
await upsert("temas", TEMAS, "slug");

// ── 4. TEMA_OPOSICION (asignaciones) ────────────────────────────────────────
console.log("📝 tema_oposicion...");
const ASIGNACIONES = [
  { temaSlug: "tema-1", bloqueSlug: "bloque-1", numero: 1 },
  { temaSlug: "tema-2", bloqueSlug: "bloque-2", numero: 2 },
  { temaSlug: "tema-3", bloqueSlug: "bloque-1", numero: 3 },
  { temaSlug: "tema-4", bloqueSlug: "bloque-3", numero: 4 },
  { temaSlug: "tema-5", bloqueSlug: "bloque-3", numero: 5 },
  { temaSlug: "tema-6", bloqueSlug: "bloque-3", numero: 6 },
  { temaSlug: "tema-7", bloqueSlug: "bloque-3", numero: 7 },
  { temaSlug: "tema-8", bloqueSlug: "bloque-3", numero: 8 },
  { temaSlug: "tema-9", bloqueSlug: "bloque-4", numero: 9 },
  { temaSlug: "tema-10", bloqueSlug: "bloque-4", numero: 10 },
  { temaSlug: "tema-11", bloqueSlug: "bloque-4", numero: 11 },
  { temaSlug: "tema-12", bloqueSlug: "bloque-5", numero: 12 },
  { temaSlug: "tema-13", bloqueSlug: "bloque-5", numero: 13 },
  { temaSlug: "tema-14", bloqueSlug: "bloque-1", numero: 14 },
  { temaSlug: "tema-15", bloqueSlug: "bloque-4", numero: 15 },
  { temaSlug: "tema-16", bloqueSlug: "bloque-4", numero: 16 },
  { temaSlug: "tema-17", bloqueSlug: "bloque-6", numero: 17 },
  { temaSlug: "tema-18", bloqueSlug: "bloque-6", numero: 18 },
  { temaSlug: "tema-19", bloqueSlug: "bloque-6", numero: 19 },
  { temaSlug: "tema-23", bloqueSlug: "bloque-7", numero: 20 },
].map((a) => ({
  tema_slug: a.temaSlug,
  oposicion_slug: "auxiliar-administrativo",
  bloque_id: bloqueIdPorSlug[a.bloqueSlug],
  numero: a.numero,
  orden: a.numero,
  es_premium: false,
  publicado: true,
}));
await upsert("tema_oposicion", ASIGNACIONES, "tema_slug,oposicion_slug");

// ── 5. CONVOCATORIAS ────────────────────────────────────────────────────────
console.log("📝 convocatorias...");
await upsert(
  "convocatorias",
  [
    {
      oposicion_slug: "auxiliar-administrativo",
      numero: "CONV 4/2026",
      organismo: "Ayuntamiento de Zaragoza — Oficina de Recursos Humanos",
      plaza: "Auxiliar Administrativo/a — Escala de Administración General (Grupo/Subgrupo C2)",
      fecha_decreto: "15 de julio de 2026",
      sistema_seleccion: "Oposición, turno libre ordinario y turnos libres de reserva",
      requisito_titulacion: "Graduado/a en Educación Secundaria Obligatoria (ESO), o titulación equivalente a efectos profesionales.",
      plazo_instancias: "20 días naturales a partir del día siguiente a la publicación del extracto de la convocatoria en el Boletín Oficial del Estado (BOE).",
      duracion_maxima_proceso: "6 meses, contados desde la celebración del primer ejercicio.",
      orden_actuacion: "Se inicia por las personas aspirantes cuyo primer apellido comience por la letra «V» (y, si no las hubiera, por la «W», y así sucesivamente).",
      plazas_total: 85,
      desglose_plazas: [
        { turno: "Turno libre ordinario (TLO)", cantidad: 69 },
        { turno: "Turno libre ordinario — ampliación", cantidad: 8 },
        { turno: "Reserva discapacidad física, sensorial u otra", cantidad: 4 },
        { turno: "Reserva personas transexuales", cantidad: 1 },
        { turno: "Reserva discapacidad intelectual", cantidad: 2 },
        { turno: "Reserva discapacidad mental", cantidad: 1 },
      ],
      aspirantes_que_pasan_fase: [
        { fase: "Superan el test teórico y pasan a casos prácticos", cantidad: "1.544 personas aspirantes (1.399 turno libre + 145 turnos de reserva)" },
        { fase: "Superan los casos prácticos y pasan a la prueba de informática", cantidad: "170 personas aspirantes (154 turno libre + 16 turnos de reserva)" },
      ],
      enlaces_oficiales: [
        { titulo: "Bases específicas de la convocatoria (PDF)", url: "https://www.zaragoza.es/cont/paginas/oferta/archivos/bases/bases2081.pdf" },
        { titulo: "Portal de Oferta de Empleo Público del Ayuntamiento de Zaragoza", url: "https://www.zaragoza.es/oferta" },
      ],
      ultima_actualizacion: "17 de agosto de 2026",
      pruebas: [
        { id: "test-teorico", numero: 1, nombre: "Test teórico", icono: "📝", duracion: "55 minutos", formato: "50 preguntas + 5 de reserva", opciones: "3 opciones de respuesta", detalle: "Preguntas tipo test sobre los 20 temas del temario oficial. Las 5 preguntas de reserva solo se corrigen si se anula alguna de las 50 principales." },
        { id: "casos-practicos", numero: 2, nombre: "Casos prácticos", icono: "📋", duracion: "30 minutos", formato: "2 casos prácticos de 10 preguntas cada uno (20 preguntas)", opciones: "4 opciones de respuesta", detalle: "Supuestos prácticos relacionados con las funciones del puesto, resueltos mediante preguntas tipo test asociadas a cada caso." },
        { id: "informatica", numero: 3, nombre: "Prueba de informática", icono: "💻", duracion: "30 minutos", formato: "Prueba práctica con ordenador", opciones: "LibreOffice Writer y Calc (v. 24.2.6 o versión vigente)", detalle: "Solo la realizan quienes superan el test y los casos prácticos (máx. 170 aspirantes). Ejercicio práctico de ofimática y nociones de sistemas operativos (Windows 11 y Ubuntu 24)." },
      ],
    },
  ],
  "oposicion_slug"
);

console.log("\n✅ Seed completado.");
