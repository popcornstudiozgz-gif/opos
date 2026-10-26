/**
 * Ficha de convocatoria de Operaria/o Especialista (Ayto. Zaragoza), CONV
 * 5/2026.
 *
 * Fuentes primarias leídas íntegras en la sesión:
 * - Bases específicas (bases2125.pdf; decreto de 15-07-2026; BOP de
 *   Zaragoza núm. 170, de 27-07-2026): 18 plazas de Operaria/o Especialista
 *   de la Escala de Administración Especial (OEP 2025 y 2026): 15 TLO, 1 TLO
 *   de ampliación, 1 TLRINTEL y 1 TLRMEN, en convocatoria conjunta (las de
 *   reserva no cubiertas acrecen al TLO); sin requisito de titulación;
 *   oposición con estructura de la base 7.4.E de las bases generales;
 *   periodo de prácticas (base 6.16); orden de actuación por la letra «V»;
 *   362 aspirantes como máximo superan el primer ejercicio (322 TLO, 20
 *   TLRINTEL y 20 TLRMEN); duración máxima de seis meses desde el primer
 *   ejercicio; concurso de traslados simultáneo (art. 27.5.e del Acuerdo de
 *   22-02-2024). Las mismas bases convocan aparte 4 plazas de Subalterna/o
 *   reservadas a personas con discapacidad intelectual, que no se incluyen.
 * - Resolución de 7-09-2026 del Ayuntamiento de Zaragoza (BOE núm. 227, de
 *   14-09-2026, BOE-A-2026-19150), que incluye las dieciocho plazas de
 *   Operaria/o Especialista; plazo de 20 días naturales, del 15-09-2026 al
 *   5-10-2026 según la ficha municipal del proceso (zaragoza.es/oferta,
 *   id=2125).
 * - Texto refundido de las bases generales del turno libre (junio de 2026),
 *   base 7.4.E: dos ejercicios el mismo día; test de 40 preguntas y 5 de
 *   reserva con 3 opciones en 45 minutos; 4 supuestos de 5 preguntas con 4
 *   opciones en 30 minutos; en ambos cada error resta 1/4 del valor de un
 *   acierto y el mínimo es 5 sobre 10; base 5.3 y 5.4 (turnos TLRINTEL y
 *   TLRMEN); base 5.1.b (edad: 16 años).
 *
 * Uso: node --env-file=.env.local scripts/seed-convocatoria-operario-especialista.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const OPOSICION = "operario-especialista-ayto-zaragoza";

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
  numero: "CONV 5/2026",
  organismo: "Ayuntamiento de Zaragoza — Oficina de Recursos Humanos",
  plaza: "Operaria/o Especialista — Escala de Administración Especial, Subescala de Servicios Especiales, Clase Personal de oficios (Agrupación Profesional de la D.A. 6.ª del TREBEP)",
  fecha_decreto: "15 de julio de 2026",
  sistema_seleccion: "Oposición, en convocatoria conjunta del turno libre ordinario y de los turnos libres de reserva para personas con discapacidad intelectual (TLRINTEL) y con discapacidad mental (TLRMEN), seguida de un periodo de prácticas",
  requisito_titulacion:
    "No se exige titulación académica oficial. Requisitos generales de la base quinta de las bases generales: nacionalidad española o de otro Estado en los términos legales, tener 16 años y no superar la edad de jubilación forzosa, capacidad funcional para las tareas y no haber sido separado ni estar inhabilitado. Quien opte por un turno de reserva debe acreditar la discapacidad correspondiente (bases 5.3 y 5.4) y solo puede presentarse por un turno.",
  plazo_instancias:
    "20 días naturales a partir del día siguiente a la publicación del extracto en el Boletín Oficial del Estado — del 15 de septiembre al 5 de octubre de 2026 (BOE núm. 227, de 14 de septiembre de 2026, BOE-A-2026-19150). Plazo ya cerrado.",
  duracion_maxima_proceso: "6 meses, contados desde la celebración del primer ejercicio.",
  orden_actuacion: "Se inicia por las personas aspirantes cuyo primer apellido comience por la letra «V» (y, si no las hubiera, por la «W», y así sucesivamente).",
  plazas_total: 18,
  desglose_plazas: [
    { turno: "Turno libre ordinario (TLO)", cantidad: 15 },
    { turno: "Turno libre ordinario — ampliación", cantidad: 1 },
    { turno: "Reserva para personas con discapacidad intelectual (TLRINTEL)", cantidad: 1 },
    { turno: "Reserva para personas con discapacidad mental (TLRMEN)", cantidad: 1 },
  ],
  aspirantes_que_pasan_fase: [
    { fase: "Superan el primer ejercicio (test) y pasan al segundo", cantidad: "362 personas aspirantes como máximo (322 TLO, 20 TLRINTEL y 20 TLRMEN)" },
  ],
  enlaces_oficiales: [
    { titulo: "Resolución que abre el plazo de instancias (BOE núm. 227, 14 de septiembre de 2026, BOE-A-2026-19150)", url: "https://www.boe.es/boe/dias/2026/09/14/pdfs/BOE-A-2026-19150.pdf" },
    { titulo: "Bases específicas de la convocatoria CONV 5/2026 (BOP núm. 170, 27 de julio de 2026)", url: "https://www.zaragoza.es/cont/paginas/oferta/archivos/bases/bases2125.pdf" },
    { titulo: "Texto refundido de las bases generales del turno libre (TRBGTL)", url: "https://www.zaragoza.es/cont/paginas/oferta/archivos/bases-textorefundido/bases_turno_libre.pdf" },
    { titulo: "Ficha del proceso en el Portal de Oferta de Empleo Público", url: "https://www.zaragoza.es/oferta/ofertaDetalle.jsp?id=2125" },
  ],
  ultima_actualizacion: "26 de octubre de 2026",
  estado: "cerrada",
  plazo_fin: "2026-10-05",
  pruebas: [
    {
      id: "test-teorico",
      numero: 1,
      nombre: "Primer ejercicio: test del temario",
      icono: "📝",
      duracion: "45 minutos",
      formato: "40 preguntas + 5 de reserva",
      opciones: "3 opciones de respuesta",
      detalle: "Sobre los 10 temas del Anexo I. Calificación de 0 a 10 puntos; mínimo 5. Cada error resta 1/4 del valor de un acierto; las no contestadas no penalizan. El tribunal fija una nota de corte: como máximo 362 aspirantes (322 TLO, 20 TLRINTEL y 20 TLRMEN) pasan al segundo ejercicio. Se celebra el mismo día que el segundo, uno a continuación del otro.",
    },
    {
      id: "supuestos-practicos",
      numero: 2,
      nombre: "Segundo ejercicio: supuestos teórico-prácticos tipo test",
      icono: "🔧",
      duracion: "30 minutos",
      formato: "4 supuestos con 5 preguntas cada uno (20 preguntas)",
      opciones: "4 opciones de respuesta",
      detalle: "Supuestos relacionados con las funciones del puesto y/o el temario. Calificación de 0 a 10 puntos; mínimo 5. Cada error resta 1/4 del valor de un acierto; las no contestadas no penalizan. Solo se corrige a quienes superan el primer ejercicio. Después, periodo de prácticas.",
    },
  ],
}], "oposicion_slug");

console.log("\n✅ Convocatoria de Operaria/o Especialista sembrada.");
