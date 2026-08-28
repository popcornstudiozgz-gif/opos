/**
 * Ficha de convocatoria de Oficial Albañil (Ayto. Zaragoza).
 *
 * Es la MISMA convocatoria conjunta (decreto único, CONV 4/2026, BOP núm.
 * 170 de 27/07/2026) que ya está sembrada para auxiliar-administrativo-ayto-
 * zaragoza — bases2110.pdf recoge en un solo documento las bases
 * específicas de las 14 plazas/categorías convocadas (auxiliar
 * administrativo + 13 "Oficial X"). De ahí que numero, organismo,
 * fecha_decreto, plazo_instancias, duracion_maxima_proceso y orden_actuacion
 * coincidan con los ya usados para auxiliar-administrativo-ayto-zaragoza.
 *
 * Fuentes primarias, leídas íntegras en este turno:
 * - Bases específicas (bases2110.pdf): base 1.4 (desglose de plazas de
 *   Oficial Albañil: 2 TLO + 3 TLO-D + 1 TLRTRAN = 6), base 2.2.1.3
 *   (requisito de titulación + certificado de profesionalidad), base 3.3
 *   (plazo de instancias), base 3.5 (orden de actuación), base 5.1/5.2
 *   (número máximo de aspirantes que superan cada fase, específico de
 *   Oficial Albañil: 150 tras el 1º ejercicio, 17 tras el 2º).
 * - Texto refundido de las bases generales del turno libre (TRBGTL,
 *   https://www.zaragoza.es/contenidos/oferta/bases_turno_libre.pdf):
 *   base 7.4.D, que define el formato exacto de los dos ejercicios para
 *   Grupo/Subgrupo C2 (idéntico al ya usado en auxiliar-administrativo-
 *   ayto-zaragoza: 50 preguntas/3 opciones/55 min el primero, 2 supuestos
 *   de 10 preguntas/4 opciones/30 min el segundo) y la "prueba adicional
 *   para las plazas/categorías profesionales de la clase de Personal de
 *   Oficios... (oficial de oficios)": el propio tribunal fija forma,
 *   estructura y tiempo antes de empezarla; se califica de 0 a 5 puntos,
 *   mínimo 2,5 para superarla.
 *
 * Uso: node --env-file=.env.local scripts/seed-convocatoria-oficial-albanil.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!URL_BASE || !SERVICE_KEY) {
  console.error("❌ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const OPOSICION = "oficial-albanil-ayto-zaragoza";

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

console.log("📝 convocatorias...");
await upsert(
  "convocatorias",
  [
    {
      oposicion_slug: OPOSICION,
      numero: "CONV 4/2026",
      organismo: "Ayuntamiento de Zaragoza — Oficina de Recursos Humanos",
      plaza: "Oficial Albañil — Escala de Administración Especial, Subescala de Servicios Especiales, Clase Personal de Oficios (Grupo C, Subgrupo C2)",
      fecha_decreto: "15 de julio de 2026",
      sistema_seleccion: "Oposición, turno libre ordinario y turno libre de reserva para personas transexuales (TLRTRAN)",
      requisito_titulacion:
        "Graduada/o en Educación Secundaria Obligatoria (ESO), o titulación equivalente a efectos profesionales. Además, certificado de profesionalidad de la familia profesional de Edificación y obra civil del área profesional de Albañilería y acabados, o formación profesional de la familia de Edificación y obra civil. Este certificado deberá poseerse en la fecha de realización del primer ejercicio.",
      plazo_instancias: "20 días naturales a partir del día siguiente a la publicación del extracto de la convocatoria en el Boletín Oficial del Estado (BOE).",
      duracion_maxima_proceso: "6 meses, contados desde la celebración del primer ejercicio.",
      orden_actuacion: "Se inicia por las personas aspirantes cuyo primer apellido comience por la letra «V» (y, si no las hubiera, por la «W», y así sucesivamente).",
      plazas_total: 6,
      desglose_plazas: [
        { turno: "Turno libre ordinario (TLO)", cantidad: 2 },
        { turno: "Turno libre ordinario — plazas declaradas desiertas en proceso anterior (TLO-D)", cantidad: 3 },
        { turno: "Reserva para personas transexuales (TLRTRAN)", cantidad: 1 },
      ],
      aspirantes_que_pasan_fase: [
        {
          fase: "Superan el primer ejercicio (test teórico) y pasan al segundo ejercicio",
          cantidad: "150 personas aspirantes (125 turno libre ordinario + 25 turno de reserva TLRTRAN)",
        },
        {
          fase: "Superan el segundo ejercicio y pasan a la prueba adicional práctica",
          cantidad: "17 personas aspirantes (14 turno libre ordinario + 3 turno de reserva TLRTRAN)",
        },
      ],
      enlaces_oficiales: [
        {
          titulo: "Bases específicas de la convocatoria (BOP núm. 170, 27 de julio de 2026)",
          url: "https://www.zaragoza.es/cont/paginas/oferta/archivos/bases/bases2110.pdf",
        },
        {
          titulo: "Texto refundido de las bases generales del turno libre (TRBGTL)",
          url: "https://www.zaragoza.es/contenidos/oferta/bases_turno_libre.pdf",
        },
        {
          titulo: "Portal de Oferta de Empleo Público del Ayuntamiento de Zaragoza",
          url: "https://www.zaragoza.es/oferta",
        },
      ],
      ultima_actualizacion: "28 de agosto de 2026",
      pruebas: [
        {
          id: "test-teorico",
          numero: 1,
          nombre: "Primer ejercicio: test teórico",
          icono: "📝",
          duracion: "55 minutos",
          formato: "50 preguntas + 5 de reserva",
          opciones: "3 opciones de respuesta",
          detalle:
            "Preguntas tipo test sobre los 20 temas del temario oficial (parte primera común + parte segunda de albañilería). Calificación de 0 a 10 puntos; mínimo 5 para superarlo. Cada error resta 1/4 del valor de un acierto; las no contestadas no penalizan.",
        },
        {
          id: "supuestos-practicos",
          numero: 2,
          nombre: "Segundo ejercicio: supuestos teórico-prácticos",
          icono: "📋",
          duracion: "30 minutos",
          formato: "2 supuestos de 10 preguntas cada uno (20 preguntas)",
          opciones: "4 opciones de respuesta",
          detalle:
            "Solo se corrige a quienes superan el primer ejercicio. Preguntas relacionadas con las funciones, tareas y cometidos del puesto y con el temario oficial. Calificación de 0 a 10 puntos; mínimo 5 para superarlo.",
        },
        {
          id: "prueba-adicional",
          numero: 3,
          nombre: "Prueba adicional práctica de albañilería",
          icono: "🧱",
          duracion: "Determinada por el tribunal antes de comenzar la prueba",
          formato: "Prueba o pruebas prácticas relacionadas con las funciones de albañil",
          opciones: "Solo la realizan quienes superan los dos ejercicios anteriores (máx. 17 aspirantes)",
          detalle:
            "El tribunal fija forma, estructura y tiempo antes de comenzar y lo comunica a las personas aspirantes. Calificación de 0 a 5 puntos; mínimo 2,5 para superarla.",
        },
      ],
    },
  ],
  "oposicion_slug"
);

console.log("\n✅ Convocatoria de Oficial Albañil sembrada.");
