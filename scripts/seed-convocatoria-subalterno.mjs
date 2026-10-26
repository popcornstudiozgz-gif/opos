/**
 * Ficha de convocatoria de Subalterna/o (Ayto. Zaragoza), CONV 5/2026.
 *
 * Fuentes primarias leídas íntegras en la sesión:
 * - Bases específicas (bases2125.pdf; decreto de 15-07-2026; BOP de
 *   Zaragoza núm. 170, de 27-07-2026), comunes con Operaria/o Especialista:
 *   4 plazas de Subalterna/o de la Escala de Administración General (OEP
 *   2024 y 2025) en convocatoria independiente exclusiva para el turno
 *   libre de reserva de personas con discapacidad intelectual; sin
 *   requisito de titulación; base 1.8: dos ejercicios el mismo día en un
 *   tiempo máximo conjunto de dos horas (test de 20 preguntas y 5 de reserva
 *   con 3 opciones; 3 supuestos de 5 preguntas con 3 opciones; en ambos los
 *   errores y las respuestas en blanco no penalizan y el mínimo es 5);
 *   periodo de prácticas; orden de actuación por la letra «V»; duración
 *   máxima de seis meses; tablón del edificio Seminario (base 1.13).
 * - Resolución de 7-09-2026 (BOE núm. 227, de 14-09-2026, BOE-A-2026-19150):
 *   «Cuatro plazas de Subalterna/o … en turno reservado a personas con
 *   discapacidad»; plazo de 20 días naturales, del 15-09 al 5-10-2026 (el
 *   mismo de Operaria/o, ficha municipal id=2125).
 * - Texto refundido de las bases generales, base 5.3: requisito específico
 *   del turno TLRINTEL.
 * - Ficha municipal id=2082 (Oferta 2026): prevé otras 2 plazas de
 *   Subalterna/o (1 de ellas TLRINTEL) todavía sin bases ni anuncios
 *   publicados en octubre de 2026; se menciona como proceso futuro.
 *
 * Uso: node --env-file=.env.local scripts/seed-convocatoria-subalterno.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const OPOSICION = "subalterno-ayto-zaragoza";

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
  plaza: "Subalterna/o — Escala de Administración General, Subescala Subalterna (Agrupación Profesional de la D.A. 6.ª del TREBEP)",
  fecha_decreto: "15 de julio de 2026",
  sistema_seleccion: "Oposición, en convocatoria independiente exclusiva para el turno libre de reserva de personas con discapacidad intelectual, seguida de un periodo de prácticas",
  requisito_titulacion:
    "No se exige titulación académica oficial. Solo pueden participar personas que acrediten una discapacidad intelectual conforme a la base 5.3 de las bases generales, además de los requisitos generales de la base quinta (entre ellos, tener 16 años y no superar la edad de jubilación forzosa).",
  plazo_instancias:
    "20 días naturales a partir del día siguiente a la publicación del extracto en el Boletín Oficial del Estado — del 15 de septiembre al 5 de octubre de 2026 (BOE núm. 227, de 14 de septiembre de 2026, BOE-A-2026-19150). Plazo ya cerrado. La Oferta de Empleo de 2026 prevé otras 2 plazas de Subalterna/o (ficha municipal id=2082) que todavía no se han convocado.",
  duracion_maxima_proceso: "6 meses, contados desde la celebración del primer ejercicio.",
  orden_actuacion: "Se inicia por las personas aspirantes cuyo primer apellido comience por la letra «V» (y, si no las hubiera, por la «W», y así sucesivamente).",
  plazas_total: 4,
  desglose_plazas: [
    { turno: "Reserva para personas con discapacidad intelectual (convocatoria independiente)", cantidad: 4 },
  ],
  aspirantes_que_pasan_fase: [],
  enlaces_oficiales: [
    { titulo: "Resolución que abre el plazo de instancias (BOE núm. 227, 14 de septiembre de 2026, BOE-A-2026-19150)", url: "https://www.boe.es/boe/dias/2026/09/14/pdfs/BOE-A-2026-19150.pdf" },
    { titulo: "Bases específicas de la convocatoria CONV 5/2026 (BOP núm. 170, 27 de julio de 2026)", url: "https://www.zaragoza.es/cont/paginas/oferta/archivos/bases/bases2125.pdf" },
    { titulo: "Texto refundido de las bases generales del turno libre (TRBGTL)", url: "https://www.zaragoza.es/cont/paginas/oferta/archivos/bases-textorefundido/bases_turno_libre.pdf" },
    { titulo: "Portal de Oferta de Empleo Público del Ayuntamiento de Zaragoza", url: "https://www.zaragoza.es/oferta/" },
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
      duracion: "Dos horas en total para los dos ejercicios",
      formato: "20 preguntas + 5 de reserva",
      opciones: "3 opciones de respuesta",
      detalle: "Sobre los 10 temas del Anexo I. Calificación de 0 a 10 puntos; mínimo 5. Los errores y las respuestas en blanco no penalizan. Se hace el mismo día que el segundo ejercicio, uno a continuación del otro; quien termine el primero puede salir, pero figurará como «no presentada/o» en el segundo.",
    },
    {
      id: "supuestos-practicos",
      numero: 2,
      nombre: "Segundo ejercicio: supuestos teórico-prácticos tipo test",
      icono: "🗂️",
      duracion: "Dentro de las dos horas del conjunto",
      formato: "3 supuestos con 5 preguntas cada uno (15 preguntas)",
      opciones: "3 opciones de respuesta",
      detalle: "Supuestos sobre las funciones y tareas del puesto y/o el temario. Calificación de 0 a 10 puntos; mínimo 5. Los errores y las respuestas en blanco no penalizan. Solo se corrige a quienes superan el primero. Después, periodo de prácticas.",
    },
  ],
}], "oposicion_slug");

console.log("\n✅ Convocatoria de Subalterna/o sembrada.");
