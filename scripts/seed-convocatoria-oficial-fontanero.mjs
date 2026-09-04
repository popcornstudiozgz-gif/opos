/**
 * Ficha de convocatoria de Oficial Fontanero (Ayto. Zaragoza).
 *
 * A diferencia del resto de "Oficial X" (todas con CONV 4/2026 ya
 * publicada y resuelta en bases2110.pdf), Oficial Fontanero NO forma
 * parte de esa convocatoria conjunta: no aparece en oferta2026.htm salvo
 * como "Oficial Fontanero/a" con id=2111 en zaragoza.es/oferta, con "N°
 * Total de Plazas: 1" — pero SIN bases específicas publicadas todavía
 * (verificado: no existe bases2111.pdf en la ruta habitual, la página de
 * detalle no enlaza a ningún PDF de bases).
 *
 * Por indicación expresa del usuario: esta ficha se construye con la
 * información real del PROCESO YA RESUELTO de 2025 (bases1716.pdf, BOPZ
 * núm. 147 de 30-06-2025, decreto de 27-05-2025 — 4 plazas de las
 * OEP/22/24/25, ya adjudicadas) para todo lo que es información
 * estructural estable (requisitos de titulación, sistema de selección,
 * estructura y reglas de las pruebas, orden de actuación). Los datos que
 * son propios y exclusivos del proceso 2026 en curso (fecha de decreto,
 * plazo de instancias, plazas exactas convocadas y su desglose, número de
 * aspirantes que pasan cada corte) se marcan explícitamente como
 * pendientes de publicación, en vez de reutilizar sin más las cifras de
 * 2025 (que corresponden a un proceso distinto, ya cerrado, con 4 plazas
 * en vez de la 1 prevista para 2026).
 *
 * Uso: node --env-file=.env.local scripts/seed-convocatoria-oficial-fontanero.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!URL_BASE || !SERVICE_KEY) {
  console.error("❌ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const OPOSICION = "oficial-fontanero-ayto-zaragoza";

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
      numero: "Pendiente convocatoria 2026",
      organismo: "Ayuntamiento de Zaragoza — Oficina de Recursos Humanos",
      plaza: "Oficial Fontanero — Escala de Administración Especial, Subescala de Servicios Especiales, Clase Personal de Oficios (Grupo C, Subgrupo C2)",
      fecha_decreto: "Pendiente de publicación (la Oferta de Empleo Público 2026 del Ayuntamiento de Zaragoza prevé 1 plaza de Oficial Fontanero — id 2111 en zaragoza.es/oferta — pero sus bases específicas todavía no se han publicado)",
      sistema_seleccion: "Oposición, turno libre ordinario y, en su caso, turnos libres de reserva (a confirmar con las bases 2026)",
      requisito_titulacion:
        "Graduada/o en Educación Secundaria Obligatoria (ESO), o titulación equivalente a efectos profesionales. Además, estar en posesión del certificado de profesionalidad de la familia profesional de Energía y Agua, o de formación profesional de la familia de Energía y Agua, o de la familia de Edificación y Obra Civil. Este certificado o titulación debe poseerse en la fecha de realización del primer ejercicio. (Requisito verificado en las bases del proceso 2025, BOPZ núm. 147 de 30-06-2025; a confirmar que no varíe con la publicación de las bases 2026.)",
      plazo_instancias:
        "Pendiente de publicación. Como referencia, el plazo del proceso de 2025 (ya resuelto) fue de 20 días naturales a partir del día siguiente a la publicación del extracto de la convocatoria en el Boletín Oficial del Estado (BOE) — previsiblemente la nueva convocatoria seguirá el mismo esquema, pero el plazo real solo se conocerá con la publicación de las bases 2026.",
      duracion_maxima_proceso: "6 meses, contados desde la celebración del primer ejercicio (dato del proceso 2025, regla general de las bases generales del turno libre; pendiente de confirmar para 2026).",
      orden_actuacion: "Se inicia por las personas aspirantes cuyo primer apellido comience por la letra «V» (y, si no las hubiera, por la «W», y así sucesivamente) — regla general de las bases generales del turno libre, estable entre convocatorias.",
      plazas_total: 1,
      desglose_plazas: [
        { turno: "Previsión Oferta de Empleo Público 2026 — pendiente de bases específicas", cantidad: 1 },
      ],
      aspirantes_que_pasan_fase: [
        {
          fase: "Aspirantes que pasan de fase",
          cantidad: "Pendiente — se determinará al publicarse las bases específicas de la convocatoria 2026 (dependen directamente del número de plazas y de solicitudes)",
        },
      ],
      enlaces_oficiales: [
        {
          titulo: "Oficial Fontanero/a — ficha de la plaza en la Oferta de Empleo Público 2026 (bases pendientes)",
          url: "https://www.zaragoza.es/oferta/ofertaDetalle.jsp?id=2111",
        },
        {
          titulo: "Bases específicas del proceso 2025 ya resuelto (BOPZ núm. 147, 30-06-2025) — referencia histórica",
          url: "https://www.zaragoza.es/cont/paginas/oferta/archivos/bases/bases1716.pdf",
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
      ultima_actualizacion: "4 de septiembre de 2026",
      pruebas: [
        {
          id: "test-teorico",
          numero: 1,
          nombre: "Primer ejercicio: test teórico",
          icono: "📝",
          duracion: "A confirmar con las bases 2026",
          formato: "Preguntas tipo test sobre el temario oficial",
          opciones: "A confirmar con las bases 2026",
          detalle:
            "Preguntas tipo test sobre los 22 temas del temario oficial (parte común + parte específica de fontanería). En el proceso de 2025, calificación de 0 a 10 puntos, con un mínimo de 5 para superarlo, y penalización por error; estructura previsiblemente estable, pendiente de confirmar con las bases 2026.",
        },
        {
          id: "supuestos-practicos",
          numero: 2,
          nombre: "Segundo ejercicio: supuestos teórico-prácticos",
          icono: "📋",
          duracion: "A confirmar con las bases 2026",
          formato: "Supuestos relacionados con las funciones del puesto",
          opciones: "Solo se corrige a quienes superan el primer ejercicio",
          detalle:
            "Preguntas relacionadas con las funciones, tareas y cometidos del puesto de Oficial Fontanero y con el temario oficial. En el proceso de 2025, calificación de 0 a 10 puntos, con un mínimo de 5 para superarlo; estructura previsiblemente estable, pendiente de confirmar con las bases 2026.",
        },
        {
          id: "prueba-adicional",
          numero: 3,
          nombre: "Prueba adicional práctica de fontanería",
          icono: "🔧",
          duracion: "Determinada por el tribunal antes de comenzar la prueba",
          formato: "Prueba o pruebas prácticas relacionadas con las funciones del puesto",
          opciones: "Solo la realizan quienes superan los dos ejercicios anteriores",
          detalle:
            "Oficial Fontanero figura entre las plazas que deben realizar esta prueba adicional práctica, tanto en el proceso de 2025 como, previsiblemente, en el de 2026. El tribunal fija forma, estructura y tiempo antes de comenzar. En 2025, calificación de 0 a 5 puntos, con un mínimo de 2,5 para superarla.",
        },
      ],
    },
  ],
  "oposicion_slug"
);

console.log("\n✅ Convocatoria de Oficial Fontanero sembrada (con los datos exclusivos de 2026 marcados como pendientes de publicación).");
