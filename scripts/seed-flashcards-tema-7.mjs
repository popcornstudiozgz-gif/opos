/**
 * Tema-7: Ley 39/2015 (IV) — Título IV completo: garantías (Cap. I, art. 53),
 * iniciación (Cap. II, arts. 54-69), ordenación (Cap. III, arts. 70-74),
 * instrucción (Cap. IV, arts. 75-83), finalización (Cap. V, arts. 84-95)
 * [temario de esta oposición], más tramitación simplificada (Cap. VI, art. 96)
 * y ejecución (Cap. VII, arts. 97-105) como biblioteca completa (no exigidos
 * en este temario).
 *
 * Uso: node --env-file=.env.local scripts/seed-flashcards-tema-7.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

async function insertBatch(filas) {
  const res = await fetch(`${URL_BASE}/rest/v1/flashcards`, { method: "POST", headers: { ...HEADERS, Prefer: "return=minimal" }, body: JSON.stringify(filas) });
  if (!res.ok) { console.error(`❌ ${res.status} ${await res.text()}`); process.exit(1); }
}

const TEMA = "tema-7";
const c = (seccion, anverso, reverso) => ({ tema_slug: TEMA, seccion, anverso, reverso });

const CARDS = [
  // Cap. I: Garantías (art. 53)
  c("titulo-4-cap-1", "Cita 4 derechos del interesado en el procedimiento según el art. 53.1", "Conocer el estado de tramitación y el sentido del silencio; identificar a las autoridades responsables; no presentar originales ni documentos ya en poder de la AAPP; formular alegaciones y aportar documentos antes de la audiencia"),
  c("titulo-4-cap-1", "¿Qué derechos adicionales tienen los presuntos responsables en procedimientos sancionadores (art. 53.2)?", "Ser notificados de hechos, infracciones y sanciones imputadas, y del instructor; y la presunción de no existencia de responsabilidad mientras no se demuestre lo contrario"),

  // Cap. II: Iniciación (arts. 54-69)
  c("titulo-4-cap-2", "¿De qué formas puede iniciarse un procedimiento (art. 54)?", "De oficio o a solicitud del interesado"),
  c("titulo-4-cap-2", "¿Qué son las actuaciones previas (art. 55.1)?", "Un período de información previo al inicio, para conocer las circunstancias del caso y la conveniencia de iniciar el procedimiento"),
  c("titulo-4-cap-2", "¿Qué son las medidas provisionales (art. 56.1)?", "Medidas motivadas que puede adoptar el órgano competente, iniciado el procedimiento, para asegurar la eficacia de la resolución futura"),
  c("titulo-4-cap-2", "¿Qué límite tienen las medidas provisionales (art. 56.4)?", "No pueden causar perjuicio de difícil o imposible reparación ni violar derechos amparados por las leyes"),
  c("titulo-4-cap-2", "¿Qué es la acumulación de procedimientos (art. 57)?", "Disponer, de oficio o a instancia de parte, la acumulación de procedimientos con identidad sustancial o conexión, tramitados por el mismo órgano"),
  c("titulo-4-cap-2", "¿Cómo se inicia un procedimiento de oficio (art. 58)?", "Por acuerdo del órgano competente: propia iniciativa, orden superior, petición razonada de otros órganos, o denuncia"),
  c("titulo-4-cap-2", "¿Qué es una denuncia según el art. 62.1?", "El acto por el que cualquier persona pone en conocimiento de un órgano administrativo un hecho que pudiera justificar la iniciación de oficio"),
  c("titulo-4-cap-2", "¿Confiere la denuncia la condición de interesado (art. 62.5)?", "No, por sí sola"),
  c("titulo-4-cap-2", "¿Cómo se inician siempre los procedimientos sancionadores (art. 63.1)?", "De oficio, por acuerdo del órgano competente, con separación entre fase instructora y sancionadora"),
  c("titulo-4-cap-2", "Enumera el contenido mínimo del acuerdo de iniciación sancionador (art. 64.2)", "Identificación del responsable; hechos y posible calificación/sanción; identificación del instructor; órgano competente para resolver; medidas provisionales; derecho a alegaciones y audiencia"),
  c("titulo-4-cap-2", "¿Qué debe contener una solicitud de iniciación según el art. 66.1?", "Nombre del interesado, medio de notificación, hechos/razones/petición, lugar y fecha, firma, y órgano al que se dirige"),
  c("titulo-4-cap-2", "¿Qué ocurre si la solicitud no reúne los requisitos (art. 68.1)?", "Se requiere al interesado subsanar en 10 días, con indicación de que si no lo hace se le tendrá por desistido"),
  c("titulo-4-cap-2", "¿Qué es una declaración responsable (art. 69.1)?", "Documento en que el interesado manifiesta, bajo su responsabilidad, que cumple los requisitos para un derecho y dispone de la documentación acreditativa"),
  c("titulo-4-cap-2", "¿Qué es una comunicación (art. 69.2)?", "Documento por el que el interesado pone en conocimiento de la Administración sus datos o un dato relevante para iniciar una actividad o ejercer un derecho"),
  c("titulo-4-cap-2", "¿Qué provoca la inexactitud o falsedad esencial en una declaración responsable (art. 69.4)?", "La imposibilidad de continuar con el ejercicio del derecho o actividad, sin perjuicio de responsabilidades"),

  // Cap. III: Ordenación (arts. 70-74)
  c("titulo-4-cap-3", "¿Qué es el expediente administrativo (art. 70.1)?", "El conjunto ordenado de documentos y actuaciones que sirven de antecedente y fundamento a la resolución"),
  c("titulo-4-cap-3", "¿A qué principio está sometido el impulso del procedimiento (art. 71.1)?", "Al principio de celeridad: se impulsa de oficio en todos sus trámites y por medios electrónicos"),
  c("titulo-4-cap-3", "¿Qué es la concentración de trámites (art. 72.1)?", "Acordar en un solo acto todos los trámites que admitan impulso simultáneo, sin cumplimiento sucesivo obligado"),
  c("titulo-4-cap-3", "¿En qué plazo deben cumplirse los trámites por los interesados (art. 73.1)?", "10 días desde la notificación del acto correspondiente, salvo plazo distinto"),
  c("titulo-4-cap-3", "¿Suspenden la tramitación las cuestiones incidentales (art. 74)?", "No, salvo la recusación"),

  // Cap. IV: Instrucción (arts. 75-83)
  c("titulo-4-cap-4", "¿Cómo se realizan los actos de instrucción (art. 75.1)?", "De oficio y por medios electrónicos, por el órgano que tramita, sin perjuicio del derecho de los interesados a proponer actuaciones"),
  c("titulo-4-cap-4", "¿Hasta cuándo pueden los interesados alegar y aportar documentos (art. 76.1)?", "En cualquier momento anterior al trámite de audiencia"),
  c("titulo-4-cap-4", "¿Cuál es el plazo del período de prueba ordinario (art. 77.2)?", "No superior a 30 días ni inferior a 10; cabe un período extraordinario de hasta 10 días más"),
  c("titulo-4-cap-4", "¿Cuándo puede rechazar el instructor las pruebas propuestas (art. 77.3)?", "Solo cuando sean manifiestamente improcedentes o innecesarias, mediante resolución motivada"),
  c("titulo-4-cap-4", "¿Qué carácter tienen los informes salvo disposición contraria (art. 80.1)?", "Facultativos y no vinculantes"),
  c("titulo-4-cap-4", "¿En qué plazo se emiten los informes (art. 80.2)?", "10 días, salvo que se permita/exija otro plazo"),
  c("titulo-4-cap-4", "¿Qué es el trámite de audiencia (art. 82.1)?", "Poner de manifiesto el expediente a los interesados inmediatamente antes de redactar la propuesta de resolución"),
  c("titulo-4-cap-4", "¿Cuál es el plazo del trámite de audiencia (art. 82.2)?", "No inferior a 10 días ni superior a 15"),
  c("titulo-4-cap-4", "¿Cuándo puede prescindirse del trámite de audiencia (art. 82.4)?", "Cuando no figuren en el procedimiento ni se tengan en cuenta otros hechos ni alegaciones que las aducidas por el interesado"),
  c("titulo-4-cap-4", "¿Qué es la información pública (art. 83.1-2)?", "Un período, mediante anuncio en el diario oficial, para que cualquier persona examine el expediente y formule alegaciones (mínimo 20 días)"),

  // Cap. V: Finalización (arts. 84-95)
  c("titulo-4-cap-5", "¿Qué pone fin al procedimiento según el art. 84.1?", "La resolución, el desistimiento, la renuncia al derecho, y la declaración de caducidad"),
  c("titulo-4-cap-5", "¿Qué reducción mínima se aplica en sanciones pecuniarias por reconocimiento/pago voluntario (art. 85.3)?", "Al menos el 20% sobre el importe propuesto, acumulables"),
  c("titulo-4-cap-5", "¿Qué es la terminación convencional (art. 86.1)?", "Acuerdos, pactos, convenios o contratos con personas públicas o privadas para satisfacer el interés público, que pueden finalizar el procedimiento"),
  c("titulo-4-cap-5", "¿Qué debe decidir la resolución según el art. 88.1?", "Todas las cuestiones planteadas por los interesados y las derivadas del procedimiento"),
  c("titulo-4-cap-5", "¿Puede la Administración abstenerse de resolver (art. 88.5)?", "No, en ningún caso, so pretexto de silencio, oscuridad o insuficiencia de los preceptos legales"),
  c("titulo-4-cap-5", "¿Qué es el desistimiento (art. 94.1)?", "El interesado puede desistir de su solicitud o renunciar a sus derechos cuando no esté prohibido por el ordenamiento"),
  c("titulo-4-cap-5", "¿Cuándo se produce la caducidad por paralización imputable al interesado (art. 95.1)?", "Transcurridos 3 meses desde la advertencia sin que el interesado reanude la tramitación"),
  c("titulo-4-cap-5", "¿Produce la caducidad la prescripción de las acciones (art. 95.3)?", "No por sí sola, pero los procedimientos caducados no interrumpen el plazo de prescripción"),

  // Cap. VI: Tramitación simplificada (art. 96) — biblioteca, fuera del temario
  c("titulo-4-cap-6", "¿Cuándo se acuerda la tramitación simplificada (art. 96.1)?", "Cuando razones de interés público o la falta de complejidad del procedimiento lo aconsejen"),
  c("titulo-4-cap-6", "¿En qué plazo deben resolverse los procedimientos simplificados (art. 96.6)?", "30 días desde que se notifica el acuerdo de tramitación simplificada"),

  // Cap. VII: Ejecución (arts. 97-105) — biblioteca, fuera del temario
  c("titulo-4-cap-7", "¿Cuándo son ejecutivos los actos de las AAPP (art. 98.1)?", "Inmediatamente, salvo suspensión, sanción recurrible, disposición en contrario, o necesidad de aprobación superior"),
  c("titulo-4-cap-7", "Enumera los medios de ejecución forzosa del art. 100.1", "Apremio sobre el patrimonio; ejecución subsidiaria; multa coercitiva; compulsión sobre las personas"),
  c("titulo-4-cap-7", "¿Qué es la ejecución subsidiaria (art. 102.1)?", "Cuando el acto no es personalísimo, puede ser realizado por sujeto distinto del obligado, a costa de este"),
  c("titulo-4-cap-7", "¿Qué es la multa coercitiva (art. 103.1)?", "Multas reiteradas por lapsos de tiempo, cuando lo autoricen las leyes, independientes y compatibles con sanciones"),
];

console.log(`📝 Insertando ${CARDS.length} flashcards de tema-7...`);
await insertBatch(CARDS);

const SECCIONES_AUX_ADMIN = ["titulo-4-cap-1", "titulo-4-cap-2", "titulo-4-cap-3", "titulo-4-cap-4", "titulo-4-cap-5"];
const patchTO = await fetch(`${URL_BASE}/rest/v1/tema_oposicion?tema_slug=eq.tema-7&oposicion_slug=eq.auxiliar-administrativo`, {
  method: "PATCH", headers: { ...HEADERS, Prefer: "return=representation" }, body: JSON.stringify({ secciones_incluidas: SECCIONES_AUX_ADMIN }),
});
if (!patchTO.ok) { console.error(`❌ ${patchTO.status} ${await patchTO.text()}`); process.exit(1); }
console.log("✅ tema_oposicion (auxiliar-administrativo, tema-7) limitado a:", SECCIONES_AUX_ADMIN);
console.log("✅ Tema-7 completado.");
