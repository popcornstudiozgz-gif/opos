/**
 * Ficha de convocatoria de Administrativo del Gobierno de Aragón (Cuerpo
 * Ejecutivo, Escala General Administrativa, C1), código 25/0102.
 *
 * Fuentes primarias leídas íntegras en la sesión:
 * - Resolución de 19-12-2025 del Director General de la Función Pública
 *   (BOA núm. 247, de 23-12-2025, csv BOA20251223011), que convoca a la vez
 *   todas las clases del Cuerpo Ejecutivo (OEP 2023, 2024 y 2025
 *   acumuladas): Anexo I, 144 plazas de Administrativos (3 reservadas a
 *   víctimas de violencia de género, 1 a víctimas de terrorismo y 1 a
 *   personas transexuales); bases 1.3 (oposición + curso selectivo), 1.4
 *   (programa: Resolución de 25-11-2025), 2.1.e (Bachiller, Técnico o
 *   equivalente), 3.4-3.5 (20 días hábiles, tasa 16,94 €), 6 (dos test el
 *   mismo día), 8 (calificación), 10.4 (curso en línea de 20 horas) y
 *   12.2 (letra «Q»).
 * - Ficha oficial de la convocatoria 25/0102 en aplicaciones.aragon.es/oepc:
 *   plazo de solicitudes del 24-12-2025 al 23-01-2026; 139 plazas de turno
 *   libre + 1 + 3 + 1 reservadas (= 144).
 * - Decreto 11/2026, de 28 de enero (BOA núm. 22, de 03-02-2026, csv
 *   BOA20260203004), OEP 2026: 75 plazas de Administrativos por turno libre
 *   (Anexo I), 10 por el turno de discapacidad física o sensorial y 100 de
 *   promoción interna (Anexo VI). Aún sin convocar: se menciona en el plazo
 *   como próximo proceso, sin datos inventados de fechas.
 * Laguna: la fecha del examen de esta convocatoria (las academias la dan
 * el 4-07-2026) no se ha localizado en el BOA en esta sesión, así que no se
 * incluye.
 *
 * Uso: node --env-file=.env.local scripts/seed-convocatoria-administrativo-dga.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const OPOSICION = "administrativo-dga";

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
  numero: "BOA 247/2025 (código 25/0102)",
  organismo: "Gobierno de Aragón",
  plaza: "Administrativo — Cuerpo Ejecutivo de la Administración General de la Comunidad Autónoma de Aragón, Escala General Administrativa, Administrativos (Subgrupo C1)",
  fecha_decreto: "19 de diciembre de 2025",
  sistema_seleccion: "Oposición, turno libre, seguida de un curso de formación selectivo (en línea, 20 horas, calificado como apto o no apto)",
  requisito_titulacion: "Título de Bachiller, Técnico o equivalente.",
  plazo_instancias:
    "20 días hábiles desde el día siguiente a la publicación en el BOA: del 24 de diciembre de 2025 al 23 de enero de 2026 (plazo ya cerrado). Solicitud electrónica con el modelo 524 y tasa de 16,94 €. La Oferta de Empleo Público de 2026 (Decreto 11/2026, BOA núm. 22, de 3 de febrero de 2026) prevé 75 nuevas plazas de turno libre y 10 para personas con discapacidad física o sensorial, todavía sin convocar.",
  duracion_maxima_proceso: "Los ejercicios se celebran entre los tres y los doce meses siguientes a la publicación de la convocatoria (base 1.5).",
  orden_actuacion: "Comienza por la primera persona aspirante cuyo primer apellido se inicie por la letra «Q» (sorteo del Instituto Aragonés de Administración Pública de 8 de abril de 2025).",
  plazas_total: 144,
  desglose_plazas: [
    { turno: "Turno libre ordinario", cantidad: 139 },
    { turno: "Reserva para víctimas de violencia de género", cantidad: 3 },
    { turno: "Reserva para víctimas de terrorismo", cantidad: 1 },
    { turno: "Reserva para personas transexuales", cantidad: 1 },
  ],
  aspirantes_que_pasan_fase: [],
  enlaces_oficiales: [
    { url: "https://www.boa.aragon.es/cgi-bin/EBOA/BRSCGI?CMD=VEROBJ&MLKOB=1427868650404", titulo: "Bases de la convocatoria del Cuerpo Ejecutivo (BOA núm. 247, 23 de diciembre de 2025)" },
    { url: "https://www.aragon.es/documents/d/guest/administrativos-1-pdf", titulo: "Programa de materias de Administrativos (Anexo XXV de la Resolución de 25 de noviembre de 2025)" },
    { url: "https://aplicaciones.aragon.es/oepc/oepc?dga_accion_app=mostrar_convocatoria&convocatoria_codigo=250102", titulo: "Datos básicos de la convocatoria (código 25/0102)" },
    { url: "https://www.boa.aragon.es/cgi-bin/EBOA/BRSCGI?CMD=VEROBJ&MLKOB=1433527770303", titulo: "Oferta de Empleo Público 2026 (Decreto 11/2026, BOA núm. 22, 3 de febrero de 2026)" },
  ],
  ultima_actualizacion: "23 de octubre de 2026",
  pruebas: [
    {
      id: "primer-ejercicio", icono: "📝", numero: 1,
      nombre: "Primer ejercicio (teórico)",
      formato: "Test",
      duracion: "2 horas",
      opciones: "80 preguntas + 10 de reserva, 4 alternativas, 1 válida",
      detalle: "Cuestionario tipo test sobre el programa de materias. Calificación de 0 a 80 puntos; mínimo 40 para superarlo. Cada acierto suma 1 punto, cada error resta 0,3333 y las no contestadas no penalizan. Se celebra el mismo día que el segundo ejercicio.",
    },
    {
      id: "segundo-ejercicio", icono: "📋", numero: 2,
      nombre: "Segundo ejercicio (práctico)",
      formato: "Test sobre supuestos prácticos",
      duracion: "2 horas",
      opciones: "40 preguntas + 5 de reserva, 4 alternativas, 1 válida",
      detalle: "Cuestionario tipo test sobre uno o varios supuestos prácticos formulados por el órgano de selección. Calificación de 0 a 40 puntos; mínimo 20 para superarlo. Mismas reglas de penalización. Solo se corrige a quien haya superado el primero. La nota final es la suma de los dos ejercicios.",
    },
  ],
  estado: "cerrada",
  plazo_fin: "2026-01-23",
}], "oposicion_slug");
console.log("✅ Convocatoria de Administrativo (DGA) sembrada.");
