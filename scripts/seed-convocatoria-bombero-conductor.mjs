/**
 * Ficha de convocatoria de Bombera/o Conductor/a (Ayto. Zaragoza), CONV
 * 8.1/2026.
 *
 * Fuentes primarias leídas íntegras en la sesión:
 * - Bases específicas (bases2107.pdf; BOP de Zaragoza núm. 170, de
 *   27-07-2026; decreto de 15-07-2026): 37 plazas (32 TLO, 3 TLO de
 *   ampliación, 1 TLRTERR y 1 TLRVGEN) de las OEP 2025 y 2026; requisitos
 *   (bachiller o técnico; permisos C, E y ADR; cuadro de exclusiones médicas
 *   de la base 9.5); orden de actuación por la letra «V»; 201 aspirantes
 *   máximo superan el primer ejercicio (191 TLO, 5 TLRTERR y 5 TLRVGEN);
 *   duración máxima de seis meses desde el primer ejercicio; curso selectivo
 *   posterior (Anexo IV).
 * - Resolución de 7-09-2026 del Ayuntamiento de Zaragoza (BOE núm. 227, de
 *   14-09-2026, BOE-A-2026-19150), que incluye las 37 plazas de Bombera/o
 *   Conductor/a y abre el plazo de 20 días naturales: del 15-09-2026 al
 *   5-10-2026 (el vigésimo día cae en domingo), igual que en la ficha
 *   municipal del proceso (zaragoza.es/oferta, id=2107).
 * - Texto refundido de las bases generales del turno libre (junio de 2026),
 *   base 9.3 (25 puntos en total), base 9.4.C (estructura de los cuatro
 *   ejercicios y baremos) y base 9.6.2 (curso selectivo: nota de 10 puntos).
 *
 * Uso: node --env-file=.env.local scripts/seed-convocatoria-bombero-conductor.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const OPOSICION = "bombero-conductor-ayto-zaragoza";

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
  numero: "CONV 8.1/2026",
  organismo: "Ayuntamiento de Zaragoza — Oficina de Recursos Humanos",
  plaza: "Bombera/o Conductor/a — Escala de Administración Especial, Subescala de Servicios Especiales, Clase Servicio contra Incendios, de Salvamento y Protección Civil (Grupo C, Subgrupo C1)",
  fecha_decreto: "15 de julio de 2026",
  sistema_seleccion: "Oposición, turno libre ordinario y turnos libres de reserva, seguida de un curso selectivo de formación",
  requisito_titulacion:
    "Título de bachiller, técnico o equivalente a efectos profesionales. Además, permisos de conducción de las clases «C» y «E» y permiso de mercancías peligrosas (ADR), y no estar incurso en el cuadro de exclusiones médicas de la base 9.5 de las bases generales. Los requisitos deben poseerse el último día del plazo de solicitudes y mantenerse hasta la toma de posesión.",
  plazo_instancias:
    "20 días naturales a partir del día siguiente a la publicación del extracto de la convocatoria en el Boletín Oficial del Estado — del 15 de septiembre al 5 de octubre de 2026 (BOE núm. 227, de 14 de septiembre de 2026, BOE-A-2026-19150). Plazo ya cerrado.",
  duracion_maxima_proceso: "6 meses, contados desde la celebración del primer ejercicio.",
  orden_actuacion: "Se inicia por las personas aspirantes cuyo primer apellido comience por la letra «V» (y, si no las hubiera, por la «W», y así sucesivamente).",
  plazas_total: 37,
  desglose_plazas: [
    { turno: "Turno libre ordinario (TLO)", cantidad: 32 },
    { turno: "Turno libre ordinario — ampliación", cantidad: 3 },
    { turno: "Reserva víctimas de terrorismo (TLRTERR)", cantidad: 1 },
    { turno: "Reserva mujeres víctimas de violencia de género (TLRVGEN)", cantidad: 1 },
  ],
  aspirantes_que_pasan_fase: [
    { fase: "Superan el primer ejercicio (temario + conocimiento del municipio) y pasan al segundo", cantidad: "201 personas aspirantes (191 TLO, 5 TLRTERR y 5 TLRVGEN)" },
  ],
  enlaces_oficiales: [
    { titulo: "Resolución que abre el plazo de instancias (BOE núm. 227, 14 de septiembre de 2026, BOE-A-2026-19150)", url: "https://www.boe.es/boe/dias/2026/09/14/pdfs/BOE-A-2026-19150.pdf" },
    { titulo: "Bases específicas de la convocatoria (BOP núm. 170, 27 de julio de 2026)", url: "https://www.zaragoza.es/cont/paginas/oferta/archivos/bases/bases2107.pdf" },
    { titulo: "Texto refundido de las bases generales del turno libre (TRBGTL)", url: "https://www.zaragoza.es/cont/paginas/oferta/archivos/bases-textorefundido/bases_turno_libre.pdf" },
    { titulo: "Temario de la Escuela de Bomberos del Ayuntamiento de Zaragoza", url: "https://www.zaragoza.es/sede/portal/bomberos/temarios/" },
    { titulo: "Ficha del proceso en el Portal de Oferta de Empleo Público", url: "https://www.zaragoza.es/oferta/ofertaDetalle.jsp?id=2107" },
  ],
  ultima_actualizacion: "20 de octubre de 2026",
  estado: "cerrada",
  plazo_fin: "2026-10-05",
  pruebas: [
    {
      id: "test-teorico",
      numero: 1,
      nombre: "Primer ejercicio, primera prueba: test del temario",
      icono: "📝",
      duracion: "75 minutos",
      formato: "100 preguntas + 12 de reserva",
      opciones: "3 opciones de respuesta",
      detalle: "Sobre los 40 temas del Anexo I. Calificación de 0 a 10 puntos; mínimo 5. Cada error resta 1/4 del valor de un acierto; las no contestadas no penalizan. El tribunal fija una nota de corte: como máximo 201 aspirantes superan el primer ejercicio.",
    },
    {
      id: "conocimiento-municipio",
      numero: 1,
      nombre: "Primer ejercicio, segunda prueba: conocimiento del municipio",
      icono: "🗺️",
      duracion: "30 minutos (a continuación de la primera prueba)",
      formato: "50 preguntas + 5 de reserva",
      opciones: "3 opciones de respuesta",
      detalle: "Ubicación, disposición o trayecto más adecuado entre los parques del Servicio, las calles y polígonos del Anexo III, la malla básica, las Juntas de Distrito y Vecinales, los hospitales y otros puntos que fijan las bases generales. Calificación de 0 a 5 puntos; mínimo 2,5. El primer ejercicio completo se califica de 0 a 15 y exige 7,5.",
    },
    {
      id: "psicotecnico",
      numero: 2,
      nombre: "Segundo ejercicio: prueba psicotécnica",
      icono: "🧠",
      duracion: "Determinada por el tribunal",
      formato: "Capacidad intelectual (razonamiento abstracto y aptitud verbal) y rasgos de personalidad",
      opciones: "Apto / no apto",
      detalle: "Se publica antes el perfil profesiográfico, el sistema de baremación y los criterios de corrección. Hay que superar todos los factores evaluados.",
    },
    {
      id: "pruebas-fisicas",
      numero: 3,
      nombre: "Tercer ejercicio: pruebas físicas",
      icono: "🏃",
      duracion: "Cuatro pruebas sucesivas",
      formato: "Trepa de cuerda lisa de 6 m (máx. 11\"00), natación 100 m libres (máx. 1'38\"00), 1.500 m en pista (máx. 5'50\"00) y circuito de agilidad (máx. 12\"80)",
      opciones: "Cada prueba de 0 a 10 puntos (mínimo 5); nota final = media de las cuatro",
      detalle: "Hay que aportar certificado médico de aptitud expedido como máximo tres meses antes. El tribunal fija una nota de corte sumando primer y tercer ejercicio. Baremos distintos para mujeres y hombres.",
    },
    {
      id: "capacidad-trabajo",
      numero: 4,
      nombre: "Cuarto ejercicio: pruebas de capacidad de trabajo",
      icono: "🧯",
      duracion: "Tres pruebas",
      formato: "Trabajo en altura (escaleras de percha en la torre de maniobras, máx. 60\"), espacios confinados (galería en oscuridad) e incendio de piso (chaleco lastrado de 20 kg, pesas y ascenso a la 7.ª planta)",
      opciones: "Apto / no apto en cada prueba",
      detalle: "Hay que ser apto en las tres. Después, quienes superan la oposición realizan un curso selectivo de formación (Academia Aragonesa de Bomberos y Escuela de Bomberos de Zaragoza), calificado sobre 10 puntos. La oposición suma 25 puntos en total.",
    },
  ],
}], "oposicion_slug");

console.log("\n✅ Convocatoria de Bombera/o Conductor/a sembrada.");
