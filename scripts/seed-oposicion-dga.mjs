/**
 * Alta de la tercera oposición: Auxiliar Administrativo del Gobierno de
 * Aragón (DGA) — Cuerpo Auxiliar, Escala Auxiliar Administrativa (C2).
 * 28 plazas (27 turno libre + 1 reserva víctimas de violencia de género),
 * convocatoria código 25/0109 (BOA núm. 247, de 23 de diciembre de 2025).
 * Temario: Resolución de 25 de noviembre de 2025 del Director General de la
 * Función Pública (programas de materias A2-C1-C2), 20 temas.
 *
 * A diferencia de Zaragoza/DPZ (mismo tipo de organismo, Administración
 * Local, con casi todo reutilizable), la DGA es Administración autonómica:
 * el enfoque institucional es distinto (Aragón como Comunidad Autónoma, no
 * como municipio/provincia), así que el solape con el temario ya sembrado
 * es mucho menor. Primer lote: solo 5 de los 20 temas, los únicos donde el
 * recorte por `secciones_incluidas` queda COMPLETO frente a lo que pide el
 * programa oficial de la DGA — nunca un recorte a medias que deje al
 * usuario con una falsa sensación de tema terminado:
 *
 *   - Tema 1 (Constitución completa: incluye Corona, Cortes Generales,
 *     Poder Judicial y Tribunal Constitucional): `tema-1` ya tenía
 *     sembrado el contenido de esos títulos aunque Zaragoza/DPZ no los
 *     usen en su propio recorte — sorpresa buena, cero contenido nuevo.
 *   - Tema 4 (Estatuto de Aragón): `tema-3`, recorte prácticamente
 *     completo (se excluye solo la sección "organizacion-territorial-
 *     estado", que no es específica del Estatuto).
 *   - Tema 6 (actividad de las AAPP, silencio administrativo, plazos):
 *     `tema-5` (Ley 39/2015, título II completo).
 *   - Tema 11 (Prevención de Riesgos Laborales): `tema-25` (ya sembrado
 *     para la DPZ). Único aviso: `tema-25` no está partido por capítulos,
 *     así que puede cubrir algo más que los Capítulos I-III que pide
 *     exactamente el programa de la DGA — de más, nunca de menos.
 *   - Tema 12 (acceso al empleo público, provisión, situaciones
 *     administrativas, régimen disciplinario, pérdida de la condición de
 *     funcionario): `tema-18`. Queda sin cubrir "clases de personal"
 *     (está en `tema-17`, no en `tema-18`) — hueco menor, pendiente.
 *
 * Quedan sin asignar 15 de los 20 temas: unos porque el recorte existente
 * no llega a cubrir lo que pide la DGA (temas 10 y 13, que necesitarían
 * Ley 7/2018 y Ley 5/2019 de Aragón, y carrera/retribución/seguridad
 * social respectivamente — leyes que `tema-2`/`tema-17` no tienen), y
 * otros porque son contenido totalmente nuevo sin ninguna fuente sembrada
 * todavía (Unión Europea, organización territorial del Estado +
 * comarcalización de Aragón, órganos de gobierno de la CA de Aragón,
 * RGPD/LOPD, negociación laboral, y los 5 de ofimática). Se añadirán en
 * tandas siguientes.
 *
 * Uso: node --env-file=.env.local scripts/seed-oposicion-dga.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!URL_BASE || !SERVICE_KEY) {
  console.error("❌ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const OPOSICION = "auxiliar-administrativo-dga";

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

// ── 1. OPOSICIÓN ─────────────────────────────────────────────────────────
console.log("📝 oposiciones...");
await upsert(
  "oposiciones",
  [
    {
      slug: OPOSICION,
      nombre: "Auxiliar Administrativo",
      organismo: "Gobierno de Aragón",
      organismo_slug: "gobierno-aragon",
      puesto_slug: "aux-administrativo",
      descripcion_corta: "Preparación online para Auxiliar Administrativo (C2), Cuerpo Auxiliar, Escala Auxiliar Administrativa, de la Administración de la Comunidad Autónoma de Aragón.",
      descripcion_larga:
        "Temario interactivo para preparar la oposición de Auxiliar Administrativo del Gobierno de Aragón: 20 temas oficiales del programa de materias (Resolución de 25 de noviembre de 2025), organizados en 6 bloques — contenido institucional autonómico, procedimiento administrativo, función pública y ofimática.",
      activa: true,
    },
  ],
  "slug"
);

// ── 2. BLOQUES ────────────────────────────────────────────────────────────
console.log("📝 bloques...");
const BLOQUES = [
  { slug: "bloque-1", titulo: "Bloque 1 — Marco constitucional y autonómico", descripcion: "Constitución Española, organización territorial del Estado, Unión Europea, Estatuto de Autonomía de Aragón y órganos de gobierno de la Comunidad Autónoma.", orden: 1 },
  { slug: "bloque-2", titulo: "Bloque 2 — Derecho y procedimiento administrativo", descripcion: "Derecho administrativo, disposiciones y actos administrativos, eficacia y revisión de actos.", orden: 2 },
  { slug: "bloque-3", titulo: "Bloque 3 — Protección de datos, igualdad y prevención de riesgos", descripcion: "Protección de datos personales, igualdad efectiva y Ley de Prevención de Riesgos Laborales.", orden: 3 },
  { slug: "bloque-4", titulo: "Bloque 4 — Función pública", descripcion: "Estatuto Básico del Empleado Público, derechos y deberes de los funcionarios, negociación laboral.", orden: 4 },
  { slug: "bloque-5", titulo: "Bloque 5 — Gobierno abierto", descripcion: "Transparencia, participación ciudadana, atención al público y gestión documental.", orden: 5 },
  { slug: "bloque-6", titulo: "Bloque 6 — Ofimática e informática", descripcion: "Informática básica, sistema operativo Windows, Word, Excel y correo electrónico.", orden: 6 },
].map((b) => ({ ...b, oposicion_slug: OPOSICION }));
const bloquesInsertados = await upsert("bloques", BLOQUES, "oposicion_slug,slug");
const bloqueIdPorSlug = Object.fromEntries(bloquesInsertados.map((b) => [b.slug, b.id]));

// ── 3. TEMA_OPOSICION — solo los 5 de 20 temas con recorte COMPLETO ────────
console.log("📝 tema_oposicion (5 de 20 — ver cabecera)...");
const ASIGNACIONES = [
  // DGA Tema 1: la Constitución (estructura, principios, derechos fundamentales,
  // Corona, Cortes Generales, Poder Judicial, Tribunal Constitucional)
  {
    temaSlug: "tema-1",
    bloqueSlug: "bloque-1",
    numero: 1,
    secciones: [
      "titulo-preliminar",
      "titulo-1-cap-1", "titulo-1-cap-2", "titulo-1-cap-3", "titulo-1-cap-4", "titulo-1-cap-5",
      "titulo-2",
      "titulo-3-cap-1", "titulo-3-cap-2", "titulo-3-cap-3",
      "titulo-6",
      "titulo-9",
    ],
  },
  // DGA Tema 4: el Estatuto de Autonomía de Aragón (todo excepto la sección
  // "organizacion-territorial-estado", que no es específica del Estatuto)
  {
    temaSlug: "tema-3",
    bloqueSlug: "bloque-1",
    numero: 4,
    secciones: [
      "titulo-preliminar",
      "titulo-1-cap-1", "titulo-1-cap-2",
      "titulo-2-cap-1", "titulo-2-cap-2", "titulo-2-cap-3", "titulo-2-cap-4",
      "titulo-3",
      "titulo-4-cap-1", "titulo-4-cap-2",
      "titulo-5",
      "titulo-6",
      "titulo-7-cap-1", "titulo-7-cap-2", "titulo-7-cap-3", "titulo-7-cap-4",
      "titulo-8-cap-1", "titulo-8-cap-2", "titulo-8-cap-3", "titulo-8-cap-4",
      "titulo-9",
    ],
  },
  // DGA Tema 6: la actividad de las Administraciones Públicas, silencio
  // administrativo, términos y plazos (Ley 39/2015, título II completo)
  {
    temaSlug: "tema-5",
    bloqueSlug: "bloque-2",
    numero: 6,
    secciones: ["titulo-2-cap-1", "titulo-2-cap-2"],
  },
  // DGA Tema 11: Prevención de Riesgos Laborales (tema-25, ya sembrado para
  // la DPZ; no está partido por capítulos, puede cubrir algo más que los
  // Capítulos I-III que pide exactamente el programa de la DGA)
  {
    temaSlug: "tema-25",
    bloqueSlug: "bloque-3",
    numero: 11,
    secciones: ["prevencion-riesgos-laborales"],
  },
  // DGA Tema 12: acceso al empleo público, provisión de puestos, situaciones
  // administrativas, régimen disciplinario, pérdida de la condición de
  // funcionario (tema-18; queda sin cubrir "clases de personal", que está
  // en tema-17 — hueco menor, pendiente de completar)
  {
    temaSlug: "tema-18",
    bloqueSlug: "bloque-4",
    numero: 12,
    secciones: ["adquisicion-servicio", "perdida-servicio", "regimen-disciplinario", "situaciones-administrativas"],
  },
].map((a) => ({
  tema_slug: a.temaSlug,
  oposicion_slug: OPOSICION,
  bloque_id: bloqueIdPorSlug[a.bloqueSlug],
  numero: a.numero,
  orden: a.numero,
  es_premium: false,
  publicado: true,
  secciones_incluidas: a.secciones,
}));
await upsert("tema_oposicion", ASIGNACIONES, "tema_slug,oposicion_slug");

// ── 4. CONVOCATORIA ─────────────────────────────────────────────────────────
console.log("📝 convocatorias...");
await upsert(
  "convocatorias",
  [
    {
      oposicion_slug: OPOSICION,
      numero: "BOA 247/2025",
      organismo: "Gobierno de Aragón",
      plaza: "Auxiliar Administrativo — Cuerpo Auxiliar, Escala Auxiliar Administrativa (Subgrupo C2)",
      fecha_decreto: "19 de diciembre de 2025",
      sistema_seleccion: "Oposición, turno libre",
      requisito_titulacion: "Graduado/a en Educación Secundaria Obligatoria, título de Técnico o equivalente.",
      plazo_instancias: "Del 24 de diciembre de 2025 al 23 de enero de 2026 (plazo ya cerrado).",
      duracion_maxima_proceso: "No especificada de forma expresa en las bases específicas.",
      orden_actuacion: "Comienza por la primera persona aspirante cuyo primer apellido se inicie por la letra «Q» (sorteo del Instituto Aragonés de Administración Pública, 8 de abril de 2025).",
      plazas_total: 28,
      desglose_plazas: [
        { turno: "Turno libre ordinario", cantidad: 27 },
        { turno: "Reserva para víctimas de violencia de género", cantidad: 1 },
      ],
      aspirantes_que_pasan_fase: [],
      enlaces_oficiales: [
        { titulo: "Bases de la convocatoria (BOA núm. 247, 23 de diciembre de 2025)", url: "https://www.boa.aragon.es/cgi-bin/EBOA/BRSCGI?CMD=VEROBJ&MLKOB=1427870670404" },
        { titulo: "Programa de materias (Resolución de 25 de noviembre de 2025)", url: "https://mia.aragon.es/documentos?csv=CSVS60B0W34IP1Q0XFIL" },
        { titulo: "Datos básicos de la convocatoria (código 25/0109)", url: "https://aplicaciones.aragon.es/oepc/oepc?dga_accion_app=mostrar_convocatoria&convocatoria_codigo=250109" },
      ],
      ultima_actualizacion: "27 de agosto de 2026",
      pruebas: [
        {
          id: "primer-ejercicio",
          numero: 1,
          nombre: "Primer ejercicio (teórico)",
          icono: "📝",
          duracion: "2 horas",
          formato: "Test",
          opciones: "70 preguntas + 5 de reserva, 4 alternativas, 1 válida",
          detalle: "Preguntas tipo test sobre el programa de materias comunes y específicas. Calificación de 0 a 70 puntos; mínimo 35 para superarlo. Cada acierto suma 1 punto, cada error resta 0,3333, las no contestadas no penalizan.",
        },
        {
          id: "segundo-ejercicio",
          numero: 2,
          nombre: "Segundo ejercicio (práctico)",
          icono: "📋",
          duracion: "1 hora",
          formato: "Test sobre supuestos prácticos",
          opciones: "30 preguntas + 5 de reserva, 4 alternativas, 1 válida",
          detalle: "Cuestionario tipo test sobre uno o varios supuestos prácticos formulados por el órgano de selección. Calificación de 0 a 30 puntos; mínimo 15 para superarlo. Solo se corrige a quien haya superado el primer ejercicio.",
        },
      ],
    },
  ],
  "oposicion_slug"
);

console.log("✅ Oposición DGA dada de alta (5 de 20 temas asignados).");
