/**
 * Ficha de convocatoria de Administrativa/o (Ayto. Zaragoza), promoción
 * interna, CONV 5.2bis/2025.
 *
 * Fuentes primarias leídas íntegras en la sesión:
 * - Bases específicas (bases1739.pdf; firmadas el 28-10-2025; BOP de Zaragoza
 *   núm. 267, de 20-11-2025): 63 plazas de Administrativa/o (OEP 2023, 2024 y
 *   2025) y 1 de Técnica/o Auxiliar Información, turno de promoción interna,
 *   concurso-oposición con la fase de concurso ANTES del ejercicio (base
 *   1.7); ejercicio único de 40 preguntas + 5 de reserva con 3 opciones en 45
 *   minutos, máximo un 10 % de preguntas de la Parte primera, penalización
 *   de 1/4 por error y blancas sin penalizar (base 1.9 bis); exención del
 *   ejercicio práctico para las 63 mejores puntuaciones (concurso + primer
 *   ejercicio) mediante un curso formativo de 100 horas semipresencial, apto
 *   o no apto; requisitos de la base segunda; orden de actuación por la «V»;
 *   duración máxima de seis meses; tablón del edificio Seminario.
 * - Rectificación (decreto de 21-11-2025; BOP núm. 278 de 3-12-2025): la
 *   calificación del ejercicio pasa de 0-50 (mínimo 25) a 0-100 (mínimo 50)
 *   y se sustituye la Parte primera del temario.
 * - Resolución de 17-12-2025 (BOE núm. 312, de 27-12-2025, BOE-A-2025-26760):
 *   abre el plazo de 20 días naturales e informa de que las bases se
 *   rectificaron también en el BOPZ núm. 286 de 15-12-2025 (esa segunda
 *   rectificación no se ha localizado; la del BOPZ 278 es la que publica el
 *   propio portal municipal para esta plaza).
 * - Ficha municipal id=1739: plazo del 28-12-2025 al 16-01-2026; lista
 *   definitiva el 9-07-2026; calificaciones del ejercicio único el
 *   21-10-2026. La ficha no publica el número de aprobados, así que
 *   `aspirantes_que_pasan_fase` queda vacío.
 * - Texto refundido de las bases generales de promoción interna (TRBGPI,
 *   bases_promocion_interna.pdf).
 *
 * Uso: node --env-file=.env.local scripts/seed-convocatoria-administrativo-ayto.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const OPOSICION = "administrativo-ayto-zaragoza";

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

console.log("📝 convocatorias...");
await upsert("convocatorias", [{
  oposicion_slug: OPOSICION,
  numero: "CONV 5.2bis/2025",
  organismo: "Ayuntamiento de Zaragoza — Oficina de Recursos Humanos",
  plaza: "Administrativa/o — Escala de Administración General, Subescala Administrativa (grupo C, subgrupo C1)",
  fecha_decreto: "28 de octubre de 2025 (rectificado por decreto de 21 de noviembre de 2025)",
  sistema_seleccion: "Concurso-oposición por el turno de promoción interna. La fase de concurso (méritos según la base novena de las bases generales) se valora antes del ejercicio; después, periodo de prácticas",
  requisito_titulacion:
    "Ser funcionaria o funcionario de carrera del Ayuntamiento de Zaragoza en la plaza de Auxiliar Administrativo (grupo C2, Escala de Administración General, Subescala Auxiliar), con al menos dos años de servicio activo en ella, y tener el título de Bachiller, Técnico o equivalente (bases 2.2.1, 2.3 y 2.4).",
  plazo_instancias:
    "20 días naturales desde el día siguiente a la publicación del extracto en el Boletín Oficial del Estado — del 28 de diciembre de 2025 al 16 de enero de 2026 (BOE núm. 312, de 27 de diciembre de 2025, BOE-A-2025-26760). Plazo cerrado; el ejercicio único ya se ha celebrado y sus calificaciones se publicaron el 21 de octubre de 2026.",
  duracion_maxima_proceso: "6 meses, contados desde la celebración del primer ejercicio.",
  orden_actuacion: "Se inicia por las personas aspirantes cuyo primer apellido comience por la letra «V» (y, si no las hubiera, por la «W», y así sucesivamente).",
  plazas_total: 63,
  desglose_plazas: [
    { turno: "Promoción interna — OEP 2023", cantidad: 5 },
    { turno: "Promoción interna — OEP 2024", cantidad: 26 },
    { turno: "Promoción interna — OEP 2025", cantidad: 32 },
  ],
  aspirantes_que_pasan_fase: [],
  enlaces_oficiales: [
    { titulo: "Bases específicas de la convocatoria CONV 5.2bis/2025 (BOP núm. 267, 20 de noviembre de 2025)", url: "https://www.zaragoza.es/cont/paginas/oferta/archivos/bases/bases1739.pdf" },
    { titulo: "Rectificación de las bases: nueva Parte primera del temario y calificación de 0 a 100 (BOP núm. 278, 3 de diciembre de 2025)", url: "https://www.zaragoza.es/cont/paginas/oferta/archivos/5%205%20BOP%20RECTIFICACION%20BASES%20PI%20ADMINISTRATIVO.pdf" },
    { titulo: "Resolución que abre el plazo de instancias (BOE núm. 312, 27 de diciembre de 2025, BOE-A-2025-26760)", url: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2025-26760" },
    { titulo: "Texto refundido de las bases generales del turno de promoción interna (TRBGPI)", url: "https://www.zaragoza.es/contenidos/oferta/bases_promocion_interna.pdf" },
    { titulo: "Ficha de la convocatoria en el Portal de Oferta de Empleo Público del Ayuntamiento de Zaragoza", url: "https://www.zaragoza.es/oferta/ofertaDetalle.jsp?id=1739" },
  ],
  ultima_actualizacion: "26 de octubre de 2026",
  estado: "cerrada",
  plazo_fin: "2026-01-16",
  pruebas: [
    {
      id: "concurso",
      numero: 1,
      nombre: "Fase de concurso (previa al ejercicio)",
      icono: "📋",
      duracion: "Antes del ejercicio",
      formato: "Valoración de méritos",
      opciones: "—",
      detalle: "Méritos según la base novena de las bases generales de promoción interna (experiencia profesional por el apartado 1.2.1.b, entre otros). Se valora y se hace definitiva antes del ejercicio. Sus puntos no sirven para aprobar el ejercicio si se suspende.",
    },
    {
      id: "test-unico",
      numero: 2,
      nombre: "Primer ejercicio (único): test del temario",
      icono: "📝",
      duracion: "45 minutos",
      formato: "40 preguntas + 5 de reserva",
      opciones: "3 opciones de respuesta",
      detalle: "Sobre los 32 temas del Anexo I; como máximo el 10 % de las preguntas (4) sobre la Parte primera. Calificación de 0 a 100 puntos y mínimo de 50 (rectificación del BOPZ 278/2025). Cada error resta 1/4 del valor de un acierto; las respuestas en blanco no penalizan.",
    },
    {
      id: "curso-formativo",
      numero: 3,
      nombre: "Segundo ejercicio (práctico) o exención mediante curso",
      icono: "💻",
      duracion: "100 horas lectivas, semipresencial",
      formato: "Curso sobre aplicaciones informáticas de gestión",
      opciones: "Apto / no apto",
      detalle: "Las 63 personas con mejor puntuación sumada (concurso definitivo + primer ejercicio) quedan exentas del ejercicio práctico si superan con aprovechamiento un curso de 100 horas en horario no laboral, organizado por el Centro de Formación Municipal. El «no apto» elimina y se llama a la siguiente persona que superó el primer ejercicio. Después, periodo de prácticas.",
    },
  ],
}], "oposicion_slug");

console.log("\n✅ Convocatoria de Administrativa/o (promoción interna) sembrada.");
