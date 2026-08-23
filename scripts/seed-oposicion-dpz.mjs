/**
 * Alta de la segunda oposición: Auxiliar de Administración General de la
 * Diputación Provincial de Zaragoza (DPZ) — 26 plazas, oposición turno
 * libre, 20 temas (BOPZ núm. 57, de 12 de marzo de 2026; bases aprobadas
 * por Decreto núm. 464, de 6 de marzo de 2026; confirmado también en
 * BOE-A-2026-6897).
 *
 * Primera prueba real de la reutilización de temas canónicos entre
 * oposiciones: de los 20 temas oficiales de la DPZ, 10 reutilizan tal cual
 * contenido ya sembrado para `auxiliar-administrativo-ayto-zaragoza`, con
 * su propio recorte (`secciones_incluidas`) — sin duplicar ni una sola
 * pregunta. Los otros 10 quedan sin asignar todavía (necesitan una fuente
 * nueva —Ley de Administración Local de Aragón, Ley General de
 * Subvenciones, Ley de Transparencia, LOPD, Ley de PRL— o un pequeño
 * añadido de contenido a un tema ya existente); se añadirán en tandas
 * siguientes.
 *
 * OJO al recorte de secciones "de Zaragoza capital": `capitalidad-*`
 * (Ley 10/2017, régimen especial del municipio de Zaragoza) NO se incluye
 * en ninguna asignación de esta oposición — la DPZ es la Diputación
 * Provincial, no el Ayuntamiento de la capital, y esas secciones no le
 * conciernen. Por eso tema-16 y tema-13 se asignan aquí con MENOS
 * secciones que las que tienen sembradas.
 *
 * Uso: node --env-file=.env.local scripts/seed-oposicion-dpz.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!URL_BASE || !SERVICE_KEY) {
  console.error("❌ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const OPOSICION = "auxiliar-administrativo-dpz";

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
      organismo: "Diputación Provincial de Zaragoza",
      descripcion_corta: "Preparación online para Auxiliar de Administración General (C2) de la Diputación Provincial de Zaragoza.",
      descripcion_larga:
        "Temario interactivo para preparar la oposición de Auxiliar de Administración General de la Diputación Provincial de Zaragoza (DPZ): 20 temas oficiales del Anexo II de la convocatoria (BOPZ núm. 57, de 12 de marzo de 2026), organizados en 7 bloques.",
      activa: true,
    },
  ],
  "slug"
);

// ── 2. BLOQUES ────────────────────────────────────────────────────────────
console.log("📝 bloques...");
const BLOQUES = [
  { slug: "bloque-1", titulo: "Bloque 1 — Marco constitucional y territorial", descripcion: "Constitución Española, organización territorial del Estado, Estatuto de Autonomía de Aragón, Derecho Administrativo general y régimen local.", orden: 1 },
  { slug: "bloque-2", titulo: "Bloque 2 — Procedimiento administrativo", descripcion: "Expediente administrativo, Procedimiento Administrativo Común, el acto administrativo y la revisión de actos.", orden: 2 },
  { slug: "bloque-3", titulo: "Bloque 3 — Régimen local y contratación", descripcion: "La provincia y el municipio, ordenanzas y reglamentos, contratación pública, formas de acción administrativa y bienes de las entidades locales.", orden: 3 },
  { slug: "bloque-4", titulo: "Bloque 4 — Hacienda y subvenciones", descripcion: "Haciendas Locales y régimen general de las subvenciones.", orden: 4 },
  { slug: "bloque-5", titulo: "Bloque 5 — Función pública y presupuestos", descripcion: "Personal al servicio de las Administraciones Públicas, presupuestos locales y contabilidad.", orden: 5 },
  { slug: "bloque-6", titulo: "Bloque 6 — Transparencia y administración electrónica", descripcion: "Transparencia, protección de datos, igualdad de oportunidades y Administración electrónica.", orden: 6 },
  { slug: "bloque-7", titulo: "Bloque 7 — Prevención de riesgos laborales", descripcion: "Ley de Prevención de Riesgos Laborales.", orden: 7 },
].map((b) => ({ ...b, oposicion_slug: OPOSICION }));
const bloquesInsertados = await upsert("bloques", BLOQUES, "oposicion_slug,slug");
const bloqueIdPorSlug = Object.fromEntries(bloquesInsertados.map((b) => [b.slug, b.id]));

// ── 3. TEMA_OPOSICION — solo los 10 temas listos para reutilizar ya ────────
// (los otros 10 números del Anexo II se añadirán cuando tengan contenido)
console.log("📝 tema_oposicion (10 de 20 — ver cabecera)...");
const ASIGNACIONES = [
  // DPZ Tema 1: la Constitución (principios generales + derechos y deberes fundamentales)
  { temaSlug: "tema-1", bloqueSlug: "bloque-1", numero: 1, secciones: ["titulo-preliminar", "titulo-1-cap-1", "titulo-1-cap-2", "titulo-1-cap-3", "titulo-1-cap-4", "titulo-1-cap-5"] },
  // DPZ Tema 5: expediente administrativo, términos y plazos (Ley 39/2015 Título II completo)
  { temaSlug: "tema-5", bloqueSlug: "bloque-2", numero: 5, secciones: ["titulo-2-cap-1", "titulo-2-cap-2"] },
  // DPZ Tema 7: el acto administrativo (Ley 39/2015 Título III completo)
  { temaSlug: "tema-6", bloqueSlug: "bloque-2", numero: 7, secciones: ["titulo-3-cap-1", "titulo-3-cap-2", "titulo-3-cap-3"] },
  // DPZ Tema 10: ordenanzas y reglamentos (sin capitalidad-ordenanzas: es exclusivo del Ayto. de Zaragoza)
  { temaSlug: "tema-16", bloqueSlug: "bloque-3", numero: 10, secciones: ["concepto", "procedimiento-general"] },
  // DPZ Tema 11: contratación pública
  { temaSlug: "tema-9", bloqueSlug: "bloque-3", numero: 11, secciones: ["tipos-contractuales", "competencias-entidades-locales", "normas-especificas-locales"] },
  // DPZ Tema 12: formas de acción administrativa (policía, fomento, servicio público)
  { temaSlug: "tema-11", bloqueSlug: "bloque-3", numero: 12, secciones: ["formas-actividad", "servicio-publico-concepto", "gestion-directa", "gestion-indirecta"] },
  // DPZ Tema 13: bienes de las entidades locales (aquí SÍ el recorte de la DPZ es más amplio que el del Ayto.: incluye también patrimonio, disfrute y enajenación, ya sembrados pero no usados en el temario del Ayuntamiento)
  { temaSlug: "tema-10", bloqueSlug: "bloque-3", numero: 13, secciones: ["cap-1-clasificacion", "cap-2-patrimonio", "cap-3-conservacion", "cap-3-defensa", "cap-4-disfrute", "cap-5-enajenacion", "titulo-2-desahucio"] },
  // DPZ Tema 14: Haciendas Locales (clasificación de ingresos, tributos)
  { temaSlug: "tema-12", bloqueSlug: "bloque-4", numero: 14, secciones: ["tasas", "contribuciones-especiales", "precios-publicos", "impuestos-enumeracion", "ibi", "iae", "ivtm", "icio", "iivtnu"] },
  // DPZ Tema 16: personal al servicio de las AAPP (clases, derechos, deberes)
  { temaSlug: "tema-17", bloqueSlug: "bloque-5", numero: 16, secciones: ["clases-personal", "derechos", "deberes-codigo-conducta"] },
  // DPZ Tema 17: presupuestos locales y contabilidad (sin capitalidad-zaragoza: exclusivo del Ayto.)
  { temaSlug: "tema-13", bloqueSlug: "bloque-5", numero: 17, secciones: ["presupuesto-contenido", "presupuesto-creditos", "presupuesto-ejecucion", "documentos-contables"] },
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
      numero: "Decreto núm. 464/2026",
      organismo: "Diputación Provincial de Zaragoza (DPZ)",
      plaza: "Auxiliar de Administración General — Escala de Administración General, subescala Auxiliar (Grupo C, Subgrupo C2)",
      fecha_decreto: "6 de marzo de 2026",
      sistema_seleccion: "Oposición, turno libre",
      requisito_titulacion: "Graduado/a en Educación Secundaria Obligatoria (ESO), o titulación equivalente a efectos profesionales.",
      plazo_instancias: "20 días hábiles a contar desde el día siguiente a la publicación de la resolución en el BOE (del 26 de marzo al 27 de abril de 2026).",
      duracion_maxima_proceso: "No especificada en las bases específicas; se remite a las bases generales de los procesos selectivos (Decreto núm. 675, de 19 de marzo de 2021, BOPZ núm. 71, de 29 de marzo de 2021).",
      orden_actuacion: "Se inicia por las personas aspirantes cuyo primer apellido comience por la letra «U», según el sorteo de la Secretaría de Estado de Función Pública de 28 de julio de 2025 (BOE núm. 184, de 1 de agosto de 2025).",
      plazas_total: 26,
      desglose_plazas: [
        { turno: "Oferta de Empleo Público 2023", cantidad: 7 },
        { turno: "Oferta de Empleo Público 2024", cantidad: 10 },
        { turno: "Oferta de Empleo Público 2025", cantidad: 9 },
      ],
      aspirantes_que_pasan_fase: [],
      enlaces_oficiales: [
        { titulo: "Bases específicas de la convocatoria (BOPZ núm. 57, 12 de marzo de 2026)", url: "https://www.boa.aragon.es/cgi-bin/EBOA/BRSCGI?CMD=VEROBJ&MLKOB=1452693050404&type=pdf" },
        { titulo: "Resolución de convocatoria (BOE-A-2026-6897)", url: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-6897" },
        { titulo: "Empleo público — Diputación Provincial de Zaragoza", url: "https://dpz.es/ciudadanos/empleo-publico/" },
      ],
      ultima_actualizacion: "23 de agosto de 2026",
      pruebas: [
        {
          id: "primer-ejercicio",
          icono: "📝",
          nombre: "Primer ejercicio: test",
          numero: 1,
          detalle: "Cuestionario tipo test sobre las materias del Anexo II. Con penalización por error: R = A − E/(n−1), siendo n el número de alternativas (4).",
          formato: "100 preguntas, 4 opciones (1 correcta o la más correcta)",
          duracion: "90 minutos",
          opciones: "Mínimo 5,00 sobre 10,00 para superarlo",
        },
        {
          id: "segundo-ejercicio",
          icono: "📋",
          nombre: "Segundo ejercicio: supuesto práctico",
          numero: 2,
          detalle: "Uno o varios supuestos prácticos sobre el temario del Anexo II y las funciones propias del puesto, con preguntas de respuesta corta y/o tipo test, sin penalización. Solo se corrige si se ha superado el primer ejercicio.",
          formato: "Determinado por el tribunal en el momento del ejercicio",
          duracion: "Determinada por el tribunal",
          opciones: "Mínimo 5,00 sobre 10,00 para superarlo",
        },
      ],
    },
  ],
  "oposicion_slug"
);

console.log("✅ Oposición DPZ dada de alta (10 de 20 temas asignados).");
