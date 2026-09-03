/**
 * Ficha de convocatoria de Oficial Conductor, Especialidad Maquinaria
 * Pesada (Ayto. Zaragoza).
 *
 * Misma convocatoria conjunta (decreto único, CONV 4/2026, BOP núm. 170
 * de 27/07/2026) ya sembrada para las otras oposiciones de esta
 * convocatoria (Auxiliar Administrativo y el resto de puestos "Oficial
 * X").
 *
 * Fuentes primarias, leídas íntegras en esta sesión sobre
 * scripts/tmp-fuentes/bases2110.txt:
 * - Base 1.8 (línea 213): Oficial Conductor Especialidad Maquinaria
 *   Pesada SÍ figura en la lista de plazas/categorías que deben
 *   realizar además la prueba adicional práctica de la base 7.4.D de
 *   las bases generales — su proceso consta de TRES pruebas.
 * - Base 2.2.1.12 (líneas 332-335): exige, además de Graduado/a en ESO,
 *   estar en posesión del permiso de conducción clase «C» y «E», así
 *   como certificado de aptitud profesional (CAP). NOTA de sourcing:
 *   este apartado del documento original está literalmente rotulado
 *   "2.2.1.12. Oficial Conductor Especialidad Gráfica" — una errata de
 *   copia y pega de las propias bases (ya existe un apartado 2.2.1.10
 *   dedicado, con contenido distinto, a Oficial Pintor Especialidad
 *   Gráfica; no existe ningún otro apartado 2.2.1.x para Maquinaria
 *   Pesada). El contenido sustantivo del apartado (permiso C y E + CAP)
 *   es el único compatible con un puesto de conducción de maquinaria
 *   pesada — el mismo exigido, con idéntica redacción, en el apartado
 *   2.2.1.11 para Oficial Conductor Especialidad General — por lo que
 *   se aplica aquí pese al rótulo erróneo del documento fuente.
 * - Base 5.1 (línea 429): 80 aspirantes máximo pasan al segundo
 *   ejercicio (80 TLO, dentro del bloque conjunto de 160 de "Oficial
 *   Conductor" repartido a partes iguales entre sus dos especialidades).
 * - Base 5.2 (línea 447): 9 aspirantes máximo pasan a la prueba
 *   adicional práctica (9 TLO).
 * - Plazas: 2 (2 TLO) — dato ya compilado en
 *   scripts/seed-oficial-x-parte-comun.mjs a partir de la base 1.4 y
 *   confirmado en el Anexo Plazas (códigos 541500067 y 541500068).
 * - Fecha del decreto (15/07/2026), plazo de instancias y orden de
 *   actuación: idénticos a los ya verificados para las otras plazas de
 *   esta misma convocatoria.
 *
 * Uso: node --env-file=.env.local scripts/seed-convocatoria-oficial-conductor-maquinaria-pesada.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!URL_BASE || !SERVICE_KEY) {
  console.error("❌ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const OPOSICION = "oficial-conductor-maquinaria-pesada-ayto-zaragoza";

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
      plaza: "Oficial Conductor, Especialidad Maquinaria Pesada — Escala de Administración Especial, Subescala de Servicios Especiales, Clase Personal de Oficios (Grupo C, Subgrupo C2)",
      fecha_decreto: "15 de julio de 2026",
      sistema_seleccion: "Oposición, turno libre ordinario (TLO)",
      requisito_titulacion:
        "Graduada/o en Educación Secundaria Obligatoria (ESO), o titulación equivalente a efectos profesionales. Además, estar en posesión del permiso de conducción de las clases «C» y «E», así como del certificado de aptitud profesional (CAP). Estos requisitos deben poseerse en la fecha de realización del primer ejercicio.",
      plazo_instancias: "20 días naturales a partir del día siguiente a la publicación del extracto de la convocatoria en el Boletín Oficial del Estado (BOE).",
      duracion_maxima_proceso: "6 meses, contados desde la celebración del primer ejercicio.",
      orden_actuacion: "Se inicia por las personas aspirantes cuyo primer apellido comience por la letra «V» (y, si no las hubiera, por la «W», y así sucesivamente).",
      plazas_total: 2,
      desglose_plazas: [
        { turno: "Turno libre ordinario (TLO)", cantidad: 2 },
      ],
      aspirantes_que_pasan_fase: [
        {
          fase: "Superan el primer ejercicio (test teórico) y pasan al segundo ejercicio",
          cantidad: "80 personas aspirantes (turno libre ordinario)",
        },
        {
          fase: "Superan el segundo ejercicio y pasan a la prueba adicional práctica",
          cantidad: "9 personas aspirantes (turno libre ordinario)",
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
      ultima_actualizacion: "3 de septiembre de 2026",
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
            "Preguntas tipo test sobre los 22 temas del temario oficial (parte primera común + parte segunda de conductor de maquinaria pesada). Calificación de 0 a 10 puntos; mínimo 5 para superarlo. Cada error resta 1/4 del valor de un acierto; las no contestadas no penalizan.",
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
          nombre: "Prueba adicional práctica de conducción de maquinaria pesada",
          icono: "🚜",
          duracion: "Determinada por el tribunal antes de comenzar la prueba",
          formato: "Prueba o pruebas prácticas relacionadas con las funciones del puesto",
          opciones: "Solo la realizan quienes superan los dos ejercicios anteriores (máx. 9 aspirantes)",
          detalle:
            "El tribunal fija forma, estructura y tiempo antes de comenzar y lo comunica a las personas aspirantes. Calificación de 0 a 5 puntos; mínimo 2,5 para superarla.",
        },
      ],
    },
  ],
  "oposicion_slug"
);

console.log("\n✅ Convocatoria de Oficial Conductor Maquinaria Pesada sembrada.");
