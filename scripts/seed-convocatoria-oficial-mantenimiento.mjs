/**
 * Ficha de convocatoria de Oficial Mantenimiento General (Ayto.
 * Zaragoza).
 *
 * Es la MISMA convocatoria conjunta (decreto único, CONV 4/2026, BOP núm.
 * 170 de 27/07/2026) que ya está sembrada para auxiliar-administrativo-
 * ayto-zaragoza y oficial-albanil-ayto-zaragoza — bases2110.pdf recoge en
 * un solo documento las bases específicas de las 15 plazas/categorías
 * convocadas (auxiliar administrativo + 14 "Oficial X"). De ahí que
 * numero, organismo, fecha_decreto, plazo_instancias,
 * duracion_maxima_proceso y orden_actuacion coincidan con los ya usados
 * para las otras dos.
 *
 * Fuentes primarias, leídas íntegras en este turno sobre
 * scripts/tmp-fuentes/bases2110.txt (texto ya extraído del PDF con
 * pdftotext -layout):
 * - Base 1.4 (líneas 36-37 y 102-103): desglose de plazas de Oficial
 *   Mantenimiento General — 29 (27 TLO, 1 TLRINTEL, 1 TLRMEN).
 * - Base 1.8 (líneas 205-221): lista explícita de plazas/categorías que
 *   deben realizar ADEMÁS la prueba adicional prevista en la base 7.4.D
 *   de las bases generales. Oficial Mantenimiento General NO figura en
 *   esa lista (a diferencia de Oficial Albañil, Herrero, Electricista,
 *   etc.) — por tanto su proceso selectivo consta solo de DOS ejercicios
 *   (test teórico + supuestos teórico-prácticos), sin prueba adicional
 *   práctica de oficio. Confirmado también en la base 5.2 (líneas
 *   422-448): Oficial Mantenimiento General no aparece en el listado de
 *   plazas con número máximo de aspirantes que pasan a la prueba
 *   adicional.
 * - Base 2.2.1 (líneas 258-260) y ausencia de un apartado 2.2.1.x propio
 *   para Oficial Mantenimiento General (a diferencia de Guardallaves,
 *   Cementerio, Albañil, Mecánico, Herrero, Electricista, Planta
 *   Potabilizadora, Carpintero, Pintor y Conductor, que sí tienen
 *   requisito de titulación/certificado adicional en 2.2.1.1 a 2.2.1.12):
 *   el único requisito de titulación es el común a todas las
 *   plazas/categorías, Graduado/a en ESO o equivalente — sin certificado
 *   de profesionalidad adicional.
 * - Base 5.1 (líneas 397-398): número máximo de aspirantes que superan
 *   el primer ejercicio — 556 (518 TLO, 19 TLRINTEL, 19 TLRMEN).
 * - Base 3.3 (plazo de instancias), base 3.5 (orden de actuación), línea
 *   552 (fecha del decreto, 15 de julio de 2026).
 * - Texto refundido de las bases generales del turno libre (TRBGTL,
 *   https://www.zaragoza.es/contenidos/oferta/bases_turno_libre.pdf):
 *   base 7.4.D, que define el formato de los dos ejercicios para
 *   Grupo/Subgrupo C2 (idéntico al ya usado en auxiliar-administrativo-
 *   ayto-zaragoza y oficial-albanil-ayto-zaragoza: 50 preguntas/3
 *   opciones/55 min el primero, 2 supuestos de 10 preguntas/4
 *   opciones/30 min el segundo).
 *
 * Uso: node --env-file=.env.local scripts/seed-convocatoria-oficial-mantenimiento.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!URL_BASE || !SERVICE_KEY) {
  console.error("❌ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const OPOSICION = "oficial-mantenimiento-ayto-zaragoza";

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
      plaza: "Oficial Mantenimiento General — Escala de Administración Especial, Subescala de Servicios Especiales, Clase Personal de Oficios (Grupo C, Subgrupo C2)",
      fecha_decreto: "15 de julio de 2026",
      sistema_seleccion: "Oposición, turno libre ordinario y turnos libres de reserva para personas discapacitadas intelectuales (TLRINTEL) y personas discapacitadas mentales (TLRMEN)",
      requisito_titulacion:
        "Graduada/o en Educación Secundaria Obligatoria (ESO), o titulación equivalente a efectos profesionales. A diferencia de otras plazas de esta misma convocatoria (Oficial Albañil, Herrero, Electricista, etc.), no se exige ningún certificado de profesionalidad ni titulación adicional específica del oficio.",
      plazo_instancias: "20 días naturales a partir del día siguiente a la publicación del extracto de la convocatoria en el Boletín Oficial del Estado (BOE).",
      duracion_maxima_proceso: "6 meses, contados desde la celebración del primer ejercicio.",
      orden_actuacion: "Se inicia por las personas aspirantes cuyo primer apellido comience por la letra «V» (y, si no las hubiera, por la «W», y así sucesivamente).",
      plazas_total: 29,
      desglose_plazas: [
        { turno: "Turno libre ordinario (TLO)", cantidad: 27 },
        { turno: "Reserva para personas discapacitadas intelectuales (TLRINTEL)", cantidad: 1 },
        { turno: "Reserva para personas discapacitadas mentales (TLRMEN)", cantidad: 1 },
      ],
      aspirantes_que_pasan_fase: [
        {
          fase: "Superan el primer ejercicio (test teórico) y pasan al segundo ejercicio",
          cantidad: "556 personas aspirantes (518 turno libre ordinario + 19 TLRINTEL + 19 TLRMEN)",
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
            "Preguntas tipo test sobre los 20 temas del temario oficial (parte primera común + parte segunda de mantenimiento general). Calificación de 0 a 10 puntos; mínimo 5 para superarlo. Cada error resta 1/4 del valor de un acierto; las no contestadas no penalizan.",
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
            "Solo se corrige a quienes superan el primer ejercicio. Preguntas relacionadas con las funciones, tareas y cometidos del puesto y con el temario oficial. Calificación de 0 a 10 puntos; mínimo 5 para superarlo. A diferencia de otras plazas de esta convocatoria (Oficial Albañil, Herrero, Electricista, etc.), Oficial Mantenimiento General NO tiene una tercera prueba adicional práctica: el proceso selectivo concluye con este segundo ejercicio.",
        },
      ],
    },
  ],
  "oposicion_slug"
);

console.log("\n✅ Convocatoria de Oficial Mantenimiento General sembrada.");
