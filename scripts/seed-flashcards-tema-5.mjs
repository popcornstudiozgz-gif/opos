/**
 * Tema-5: Ley 39/2015 (II) — Título II completo: normas generales de
 * actuación (Cap. I, arts. 13-28) y términos y plazos (Cap. II, arts. 29-33).
 *
 * Uso: node --env-file=.env.local scripts/seed-flashcards-tema-5.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

async function insertBatch(filas) {
  const res = await fetch(`${URL_BASE}/rest/v1/flashcards`, { method: "POST", headers: { ...HEADERS, Prefer: "return=minimal" }, body: JSON.stringify(filas) });
  if (!res.ok) { console.error(`❌ ${res.status} ${await res.text()}`); process.exit(1); }
}

const TEMA = "tema-5";
const c = (seccion, anverso, reverso) => ({ tema_slug: TEMA, seccion, anverso, reverso });

const CARDS = [
  // Cap. I: Normas generales de actuación (arts. 13-28)
  c("titulo-2-cap-1", "Cita 4 derechos de las personas en sus relaciones con las AAPP (art. 13)", "Comunicarse a través del Punto de Acceso General electrónico; ser asistidos en medios electrónicos; usar las lenguas cooficiales; acceder a información pública; ser tratados con respeto; protección de datos"),
  c("titulo-2-cap-1", "¿Pueden las personas físicas elegir relacionarse electrónicamente (art. 14.1)?", "Sí, en todo momento, salvo obligación legal de hacerlo, y pueden modificar su elección"),
  c("titulo-2-cap-1", "¿Quiénes están obligados a relacionarse electrónicamente con las AAPP (art. 14.2)?", "Personas jurídicas; entidades sin personalidad jurídica; profesionales con colegiación obligatoria (notarios, registradores); representantes de obligados; empleados públicos por razón de su cargo"),
  c("titulo-2-cap-1", "¿Cuál es la lengua de los procedimientos de la AGE (art. 15.1)?", "El castellano, aunque en territorios con lengua cooficial los interesados pueden usar también esa lengua"),
  c("titulo-2-cap-1", "¿Qué es el Registro Electrónico General (art. 16.1)?", "El registro de cada Administración donde se asienta todo documento presentado o recibido en cualquier órgano, organismo o entidad vinculada"),
  c("titulo-2-cap-1", "Enumera 3 lugares donde pueden presentarse documentos según el art. 16.4", "Registro electrónico de la Administración u Organismo destinatario; oficinas de Correos; representaciones diplomáticas/consulares; oficinas de asistencia en materia de registros"),
  c("titulo-2-cap-1", "¿Qué deben mantener las Administraciones según el art. 17.1?", "Un archivo electrónico único de los documentos de procedimientos finalizados"),
  c("titulo-2-cap-1", "¿Qué deber tienen las personas según el art. 18.1?", "Colaborar con la Administración facilitando informes, inspecciones y otros actos de investigación que requieran"),
  c("titulo-2-cap-1", "¿Cuándo es obligatoria la comparecencia de las personas (art. 19.1)?", "Solo cuando esté prevista en una norma con rango de ley"),
  c("titulo-2-cap-1", "¿Quiénes son responsables directos de la tramitación (art. 20.1)?", "Los titulares de las unidades administrativas y el personal a cargo de la resolución o despacho de los asuntos"),
  c("titulo-2-cap-1", "¿Está obligada la Administración a resolver (art. 21.1)?", "Sí, a dictar resolución expresa y notificarla en todos los procedimientos, salvo pacto/convenio o declaración responsable/comunicación"),
  c("titulo-2-cap-1", "¿Cuál es el plazo máximo general para resolver si la norma no lo fija (art. 21.2-3)?", "El fijado por la norma reguladora, sin exceder de 6 meses salvo ley o Derecho UE; si no se fija, 3 meses"),
  c("titulo-2-cap-1", "Enumera 4 causas de suspensión potestativa del plazo máximo para resolver (art. 22.1)", "Subsanación de deficiencias; pronunciamiento previo de la UE; informes preceptivos (máx. 3 meses); pruebas técnicas o análisis contradictorios; negociación de pacto o convenio; pronunciamiento judicial previo"),
  c("titulo-2-cap-1", "¿Cuándo puede ampliarse el plazo máximo para resolver (art. 23.1)?", "Excepcionalmente, agotados los medios disponibles, mediante acuerdo motivado, sin superar el plazo de tramitación"),
  c("titulo-2-cap-1", "¿Qué efecto tiene el silencio en procedimientos iniciados a solicitud del interesado (art. 24.1)?", "Estimación por silencio administrativo, salvo que una norma con rango de ley establezca lo contrario"),
  c("titulo-2-cap-1", "¿En qué casos el silencio es desestimatorio según el art. 24.1?", "Derecho de petición, transferencia de facultades sobre dominio/servicio público, actividades que dañen el medio ambiente, y responsabilidad patrimonial"),
  c("titulo-2-cap-1", "¿Qué consideración tiene la estimación por silencio (art. 24.2)?", "La de acto administrativo finalizador del procedimiento a todos los efectos"),
  c("titulo-2-cap-1", "¿Qué ocurre en procedimientos iniciados de oficio de los que puedan derivar derechos favorables (art. 25.1.a)?", "Los interesados podrán entender desestimadas sus pretensiones por silencio administrativo"),
  c("titulo-2-cap-1", "¿Qué ocurre en procedimientos sancionadores/de intervención iniciados de oficio sin resolución en plazo (art. 25.1.b)?", "Se produce la caducidad, con archivo de las actuaciones"),
  c("titulo-2-cap-1", "¿Cómo se emiten los documentos administrativos según el art. 26.1?", "Por escrito, a través de medios electrónicos, salvo que su naturaleza exija otra forma"),
  c("titulo-2-cap-1", "¿Qué validez tienen las copias auténticas realizadas por una Administración (art. 27.1)?", "Validez en las restantes Administraciones Públicas"),
  c("titulo-2-cap-1", "¿Tienen derecho los interesados a no aportar documentos ya en poder de la Administración (art. 28.2)?", "Sí, salvo que se opongan a la consulta; no cabe oposición en potestades sancionadoras o de inspección"),
  c("titulo-2-cap-1", "¿Pueden las AAPP exigir documentos originales (art. 28.3)?", "No, salvo excepción de la normativa aplicable; tampoco datos ya aportados anteriormente por el interesado"),

  // Cap. II: Términos y plazos (arts. 29-33)
  c("titulo-2-cap-2", "¿A quién obligan los términos y plazos según el art. 29?", "A las autoridades y personal de las Administraciones competentes para la tramitación, y a los interesados"),
  c("titulo-2-cap-2", "¿Cómo se computan los plazos señalados por horas (art. 30.1)?", "De hora en hora y minuto en minuto desde la notificación/publicación; no pueden durar más de 24 horas"),
  c("titulo-2-cap-2", "¿Qué días se excluyen del cómputo de plazos por días (art. 30.2)?", "Sábados, domingos y festivos (los plazos por días se entienden hábiles salvo que se digan naturales)"),
  c("titulo-2-cap-2", "¿Desde cuándo se cuentan los plazos por días (art. 30.3)?", "Desde el día siguiente a la notificación, publicación, o a la estimación/desestimación por silencio"),
  c("titulo-2-cap-2", "¿Cómo concluye un plazo fijado en meses o años (art. 30.4)?", "El mismo día en que se produjo la notificación en el mes/año de vencimiento; si no hay día equivalente, el último día del mes"),
  c("titulo-2-cap-2", "¿Qué ocurre si el último día del plazo es inhábil (art. 30.5)?", "Se prorroga al primer día hábil siguiente"),
  c("titulo-2-cap-2", "¿Qué ocurre si un día es hábil donde reside el interesado pero inhábil en la sede del órgano (art. 30.6)?", "Se considera inhábil en todo caso"),
  c("titulo-2-cap-2", "¿Cómo funciona el registro electrónico a efectos de cómputo (art. 31.2)?", "Permite presentar documentos 24h todos los días del año; lo presentado en día inhábil se entiende hecho la primera hora del día hábil siguiente"),
  c("titulo-2-cap-2", "¿Hasta cuánto puede ampliarse un plazo según el art. 32.1?", "Hasta la mitad del plazo original, si las circunstancias lo aconsejan y no se perjudican derechos de terceros"),
  c("titulo-2-cap-2", "¿Cuándo debe solicitarse/decidirse la ampliación de un plazo (art. 32.3)?", "Siempre antes del vencimiento del plazo; nunca puede ampliarse un plazo ya vencido"),
  c("titulo-2-cap-2", "¿Qué reduce la tramitación de urgencia (art. 33.1)?", "A la mitad los plazos del procedimiento ordinario, salvo los de presentación de solicitudes y recursos"),
];

console.log(`📝 Insertando ${CARDS.length} flashcards de tema-5...`);
await insertBatch(CARDS);

const SECCIONES_AUX_ADMIN = ["titulo-2-cap-1", "titulo-2-cap-2"];
const patchTO = await fetch(`${URL_BASE}/rest/v1/tema_oposicion?tema_slug=eq.tema-5&oposicion_slug=eq.auxiliar-administrativo`, {
  method: "PATCH", headers: { ...HEADERS, Prefer: "return=representation" }, body: JSON.stringify({ secciones_incluidas: SECCIONES_AUX_ADMIN }),
});
if (!patchTO.ok) { console.error(`❌ ${patchTO.status} ${await patchTO.text()}`); process.exit(1); }
console.log("✅ tema_oposicion (auxiliar-administrativo, tema-5) limitado a:", SECCIONES_AUX_ADMIN);
console.log("✅ Tema-5 completado.");
