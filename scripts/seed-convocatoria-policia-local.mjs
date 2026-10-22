/**
 * Ficha de convocatoria de Policía Local (Ayto. Zaragoza), CONV 7.1/2026.
 *
 * Fuentes primarias leídas íntegras en la sesión:
 * - Bases específicas (bases2106.pdf; BOP de Zaragoza núm. 170, de
 *   27-07-2026; decreto de 15-07-2026): 43 plazas de Policía de la OEP 2026
 *   (31 TLO, 4 TLO de ampliación y 8 TLRMIL), a las que se suman las que
 *   queden sin cubrir de las 9 plazas del turno de movilidad; requisitos
 *   (bachiller o técnico, permisos A o A2 y B, compromiso de portar armas,
 *   sin condenas por delitos dolosos, cuadro de exclusiones médicas de la
 *   base 8.5); orden de actuación por la letra «V»; 192 aspirantes máximo
 *   superan el primer ejercicio (156 TLO y 36 TLRMIL); duración máxima de
 *   seis meses desde el primer ejercicio; curso de formación posterior.
 * - Resolución de 7-09-2026 del Ayuntamiento de Zaragoza (BOE núm. 227, de
 *   14-09-2026, BOE-A-2026-19150), que incluye las 43 plazas de Policía
 *   Local y abre el plazo de 20 días naturales: del 15-09-2026 al 5-10-2026,
 *   igual que en la ficha municipal del proceso (zaragoza.es/oferta, id=2106).
 * - Texto refundido de las bases generales del turno libre (junio de 2026),
 *   base 8.3 (20 puntos en total), base 8.4.C (estructura de los cuatro
 *   ejercicios de la categoría de Policía y baremos) y base 8.6.2 (curso de
 *   formación en la Academia de la Policía Local: nota de 0 a 10 y
 *   puntuación final = (oposición + curso × 2) / 2).
 *
 * Uso: node --env-file=.env.local scripts/seed-convocatoria-policia-local.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const OPOSICION = "policia-local-ayto-zaragoza";

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
  numero: "CONV 7.1/2026",
  organismo: "Ayuntamiento de Zaragoza — Oficina de Recursos Humanos",
  plaza: "Policía del Cuerpo de la Policía Local — Escala de Administración Especial, Subescala de Servicios Especiales, Clase Policía Local y sus auxiliares (Grupo C, Subgrupo C1)",
  fecha_decreto: "15 de julio de 2026",
  sistema_seleccion: "Oposición, turno libre ordinario y turno libre de reserva de militares profesionales de tropa y marinería, seguida de un curso de formación selectivo y obligatorio",
  requisito_titulacion:
    "Nacionalidad española; tener 18 años y no superar la edad de jubilación forzosa; título de bachiller, técnico o equivalente a efectos profesionales; no haber sido condenado por delitos dolosos; compromiso escrito de portar armas y utilizarlas en los casos previstos; permisos de conducción de las clases «A» o «A2» y «B» (con «A2» hay que comprometerse a obtener el «A» en dos años desde la toma de posesión), y no estar incurso en el cuadro de exclusiones médicas de la base 8.5 de las bases generales. El turno de reserva exige además ser militar profesional de tropa y marinería con más de 5 años de servicios. Los permisos de conducir pueden acreditarse hasta que se publique la relación de quienes superan el curso de formación.",
  plazo_instancias:
    "20 días naturales a partir del día siguiente a la publicación del extracto de la convocatoria en el Boletín Oficial del Estado — del 15 de septiembre al 5 de octubre de 2026 (BOE núm. 227, de 14 de septiembre de 2026, BOE-A-2026-19150). Plazo ya cerrado.",
  duracion_maxima_proceso: "6 meses, contados desde la celebración del primer ejercicio.",
  orden_actuacion: "Se inicia por las personas aspirantes cuyo primer apellido comience por la letra «V» (y, si no las hubiera, por la «W», y así sucesivamente).",
  plazas_total: 43,
  desglose_plazas: [
    { turno: "Turno libre ordinario (TLO)", cantidad: 31 },
    { turno: "Turno libre ordinario — ampliación", cantidad: 4 },
    { turno: "Reserva militares profesionales de tropa y marinería (TLRMIL)", cantidad: 8 },
  ],
  aspirantes_que_pasan_fase: [
    { fase: "Superan el primer ejercicio (test) y pasan a las pruebas físicas", cantidad: "192 personas aspirantes (156 TLO y 36 TLRMIL)" },
  ],
  enlaces_oficiales: [
    { titulo: "Resolución que abre el plazo de instancias (BOE núm. 227, 14 de septiembre de 2026, BOE-A-2026-19150)", url: "https://www.boe.es/boe/dias/2026/09/14/pdfs/BOE-A-2026-19150.pdf" },
    { titulo: "Bases específicas de la convocatoria (BOP núm. 170, 27 de julio de 2026)", url: "https://www.zaragoza.es/cont/paginas/oferta/archivos/bases/bases2106.pdf" },
    { titulo: "Texto refundido de las bases generales del turno libre (TRBGTL)", url: "https://www.zaragoza.es/cont/paginas/oferta/archivos/bases-textorefundido/bases_turno_libre.pdf" },
    { titulo: "Ficha del proceso en el Portal de Oferta de Empleo Público", url: "https://www.zaragoza.es/oferta/ofertaDetalle.jsp?id=2106" },
  ],
  ultima_actualizacion: "22 de octubre de 2026",
  estado: "cerrada",
  plazo_fin: "2026-10-05",
  pruebas: [
    {
      id: "test-teorico",
      numero: 1,
      nombre: "Primer ejercicio: test del temario",
      icono: "📝",
      duracion: "75 minutos",
      formato: "100 preguntas + 12 de reserva",
      opciones: "3 opciones de respuesta",
      detalle: "Sobre los 50 temas del Anexo I. Calificación de 0 a 10 puntos; mínimo 5. Cada error resta 1/4 del valor de un acierto; las no contestadas no penalizan. El tribunal fija una nota de corte: como máximo 192 aspirantes (156 TLO y 36 TLRMIL) superan el ejercicio.",
    },
    {
      id: "pruebas-fisicas",
      numero: 2,
      nombre: "Segundo ejercicio: pruebas físicas",
      icono: "🏃",
      duracion: "Seis pruebas sucesivas",
      formato: "Trepa de cuerda lisa (6 m hombres / 5 m mujeres, máx. 20\"), salto de altura (88 / 73 cm), levantamiento de pesas en dos tiempos (3 repeticiones de 40 / 30 kg), 50 m de natación libre (máx. 40\" / 47\"), salto de longitud con carrera (4,30 / 3,50 m) y 1.500 m lisos (máx. 5'24\" / 6'24\")",
      opciones: "Apto / no apto (hay que superar las seis)",
      detalle: "Hay que aportar certificado médico de aptitud expedido como máximo tres meses antes. Puede haber controles antidopaje. Las aspirantes que no puedan realizarlas por embarazo o parto conservan el resto de calificaciones para la siguiente convocatoria (máximo tres años).",
    },
    {
      id: "psicotecnico",
      numero: 3,
      nombre: "Tercer ejercicio: prueba psicotécnica",
      icono: "🧠",
      duracion: "Determinada por el tribunal",
      formato: "Capacidad intelectual (razonamiento abstracto y aptitud verbal), estabilidad emocional, iniciativa, responsabilidad, sociabilidad y colaboración, y tendencias disfuncionales de personalidad",
      opciones: "Apto / no apto",
      detalle: "Se publica antes el perfil profesiográfico, el sistema de baremación y los criterios de corrección. Hay que superar todos los factores evaluados.",
    },
    {
      id: "supuestos-practicos",
      numero: 4,
      nombre: "Cuarto ejercicio: dos supuestos prácticos por escrito",
      icono: "🚓",
      duracion: "Máximo 1 hora y 30 minutos",
      formato: "Resolución por escrito de dos supuestos relacionados con las funciones del puesto y/o el temario, leídos después ante el tribunal en sesión pública",
      opciones: "De 0 a 10 puntos (mínimo 5)",
      detalle: "Si el tribunal no fija otra ponderación: solución correcta e idónea 55 %, aplicación e interpretación 15 %, capacidad de juicio y síntesis 15 % y claridad de redacción 15 %. La oposición suma 20 puntos (primer y cuarto ejercicio). Después, curso de formación en la Academia de la Policía Local (0 a 10 puntos, mínimo 5); puntuación final = (nota de oposición + nota del curso × 2) / 2.",
    },
  ],
}], "oposicion_slug");

console.log("\n✅ Convocatoria de Policía Local sembrada.");
