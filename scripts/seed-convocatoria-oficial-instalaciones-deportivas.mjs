/**
 * Ficha de convocatoria de Oficial Polivalente Instalaciones Deportivas
 * (Ayto. Zaragoza).
 *
 * Misma convocatoria conjunta (decreto único, CONV 4/2026, BOP núm. 170
 * de 27/07/2026) ya sembrada para auxiliar-administrativo-ayto-zaragoza,
 * oficial-albanil-ayto-zaragoza y oficial-mantenimiento-ayto-zaragoza.
 *
 * Fuentes primarias, leídas íntegras en esta sesión sobre
 * scripts/tmp-fuentes/bases2110.txt:
 * - Base 1.4 (líneas 39-40 y 105-106): 13 plazas (11 TLO, 1 TLRDIS, 1
 *   TLRVGEN).
 * - Base 1.8 (líneas 205-221): Oficial Polivalente Instalaciones
 *   Deportivas SÍ figura en la lista de plazas/categorías que deben
 *   realizar además la prueba adicional práctica de la base 7.4.D de
 *   las bases generales (a diferencia de Oficial Mantenimiento General
 *   y Oficial Agente Inspector) — su proceso consta de TRES pruebas.
 * - Base 2.2.1 (líneas 258-260) y ausencia de apartado propio en 2.2.1.x:
 *   no exige certificado de profesionalidad adicional, solo Graduado/a
 *   en ESO o equivalente (igual que Oficial Mantenimiento General).
 * - Base 5.1 (líneas 399-400): 273 aspirantes máximo pasan al segundo
 *   ejercicio (231 TLO, 21 TLRDIS, 21 TLRVGEN).
 * - Base 5.2 (líneas 428-429): 30 aspirantes máximo pasan a la prueba
 *   adicional práctica (26 TLO, 2 TLRDIS, 2 TLRVGEN).
 * - Fecha del decreto (15/07/2026, línea 552), plazo de instancias y
 *   orden de actuación: idénticos a los ya verificados para las otras
 *   plazas de esta misma convocatoria.
 *
 * Uso: node --env-file=.env.local scripts/seed-convocatoria-oficial-instalaciones-deportivas.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!URL_BASE || !SERVICE_KEY) {
  console.error("❌ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const OPOSICION = "oficial-instalaciones-deportivas-ayto-zaragoza";

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
      plaza: "Oficial Polivalente Instalaciones Deportivas — Escala de Administración Especial, Subescala de Servicios Especiales, Clase Personal de Oficios (Grupo C, Subgrupo C2)",
      fecha_decreto: "15 de julio de 2026",
      sistema_seleccion: "Oposición, turno libre ordinario y turnos libres de reserva para personas discapacitadas físicas/sensoriales u otras (TLRDIS) y mujeres víctimas de violencia de género (TLRVGEN)",
      requisito_titulacion:
        "Graduada/o en Educación Secundaria Obligatoria (ESO), o titulación equivalente a efectos profesionales. Al igual que Oficial Mantenimiento General, no se exige ningún certificado de profesionalidad adicional específico del oficio.",
      plazo_instancias: "20 días naturales a partir del día siguiente a la publicación del extracto de la convocatoria en el Boletín Oficial del Estado (BOE).",
      duracion_maxima_proceso: "6 meses, contados desde la celebración del primer ejercicio.",
      orden_actuacion: "Se inicia por las personas aspirantes cuyo primer apellido comience por la letra «V» (y, si no las hubiera, por la «W», y así sucesivamente).",
      plazas_total: 13,
      desglose_plazas: [
        { turno: "Turno libre ordinario (TLO)", cantidad: 11 },
        { turno: "Reserva para personas discapacitadas físicas/sensoriales u otras (TLRDIS)", cantidad: 1 },
        { turno: "Reserva para mujeres víctimas de violencia de género (TLRVGEN)", cantidad: 1 },
      ],
      aspirantes_que_pasan_fase: [
        {
          fase: "Superan el primer ejercicio (test teórico) y pasan al segundo ejercicio",
          cantidad: "273 personas aspirantes (231 turno libre ordinario + 21 TLRDIS + 21 TLRVGEN)",
        },
        {
          fase: "Superan el segundo ejercicio y pasan a la prueba adicional práctica",
          cantidad: "30 personas aspirantes (26 turno libre ordinario + 2 TLRDIS + 2 TLRVGEN)",
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
      ultima_actualizacion: "31 de agosto de 2026",
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
            "Preguntas tipo test sobre los 20 temas del temario oficial (parte primera común + parte segunda de instalaciones deportivas). Calificación de 0 a 10 puntos; mínimo 5 para superarlo. Cada error resta 1/4 del valor de un acierto; las no contestadas no penalizan.",
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
          nombre: "Prueba adicional práctica de instalaciones deportivas",
          icono: "🏊",
          duracion: "Determinada por el tribunal antes de comenzar la prueba",
          formato: "Prueba o pruebas prácticas relacionadas con las funciones del puesto",
          opciones: "Solo la realizan quienes superan los dos ejercicios anteriores (máx. 30 aspirantes)",
          detalle:
            "El tribunal fija forma, estructura y tiempo antes de comenzar y lo comunica a las personas aspirantes. Calificación de 0 a 5 puntos; mínimo 2,5 para superarla.",
        },
      ],
    },
  ],
  "oposicion_slug"
);

console.log("\n✅ Convocatoria de Oficial Polivalente Instalaciones Deportivas sembrada.");
