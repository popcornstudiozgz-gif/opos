/**
 * Alta del tema canónico nuevo: "Las subvenciones: régimen general y de
 * Aragón" (slug tema-24, el 23 ya está en uso por Urbanismo de Aragón) —
 * para el Tema 15 de la oposición de la DPZ ("La Ley General de
 * Subvenciones y Ley de Subvenciones de Aragón. Concepto, naturaleza y
 * clasificación de las subvenciones. Elementos personales. Bases
 * reguladoras. Procedimiento de concesión, pago y justificación.
 * Reintegro.").
 *
 * Dos secciones, dos normas distintas, ambas verificadas contra el texto
 * consolidado del BOE (no paráfrasis):
 * - ley-general-subvenciones: Ley 38/2003, General de Subvenciones
 *   (BOE-A-2003-20977) — concepto (arts. 1-3), elementos personales
 *   (arts. 11-12), bases reguladoras (art. 17), procedimiento de
 *   concesión (art. 22), justificación (arts. 30-31), reintegro
 *   (arts. 37-38).
 * - ley-subvenciones-aragon: Decreto Legislativo 2/2023, de 3 de mayo,
 *   texto refundido de la Ley de Subvenciones de Aragón
 *   (BOE-A-2023-12919) — sustituyó a la Ley 5/2015; ámbito de
 *   aplicación y principios generales (arts. 1-4).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-23-subvenciones.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

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

const TEMA = "tema-24";
const p = (seccion, dificultad, pregunta, opciones, explicacion) => ({ seccion, dificultad, pregunta, opciones, explicacion });

const ITEMS = [
  // ── Ley General de Subvenciones (Ley 38/2003) ───────────────────────────
  p("ley-general-subvenciones", "facil",
    "¿Qué tiene por objeto la Ley 38/2003 según su art. 1?",
    ["La regulación del régimen jurídico general de las subvenciones otorgadas por las Administraciones públicas",
     "Regular exclusivamente las subvenciones de la Unión Europea gestionadas en España",
     "Regular únicamente las subvenciones concedidas por las Corporaciones Locales",
     "Regular el régimen fiscal de las donaciones entre particulares"],
    "El art. 1 LGS fija un objeto general: el régimen jurídico común a toda subvención pública, sea cual sea la Administración que la conceda."),
  p("ley-general-subvenciones", "media",
    "¿Cuáles son los tres requisitos que debe cumplir una disposición dineraria para tener la consideración de subvención según el art. 2.1 LGS?",
    ["Que se entregue sin contraprestación directa del beneficiario, que esté sujeta al cumplimiento de un objetivo o actividad determinados, y que tenga por objeto el fomento de una actividad de utilidad pública o interés social",
     "Que se entregue con contraprestación directa del beneficiario, sin condiciones ni finalidad pública",
     "Que provenga exclusivamente de fondos de la Unión Europea",
     "Que su cuantía supere un umbral mínimo fijado reglamentariamente"],
    "El art. 2.1 LGS define la subvención por tres notas acumulativas: ausencia de contraprestación directa, sujeción a un objetivo/actividad, y finalidad de fomento de interés público o social — sin las tres, no hay subvención en sentido técnico."),
  p("ley-general-subvenciones", "dificil",
    "¿Están comprendidas en el ámbito de la LGS las aportaciones dinerarias entre diferentes Administraciones Públicas para financiar globalmente la actividad de la Administración destinataria, según el art. 2.2?",
    ["No: quedan expresamente excluidas del ámbito de aplicación de la Ley",
     "Sí, sin ninguna excepción",
     "Sí, pero solo si superan una determinada cuantía",
     "Solo si la aportación procede de fondos europeos"],
    "El art. 2.2 LGS excluye estas transferencias interadministrativas de financiación global, al no responder a la lógica de fomento de una actividad concreta de un tercero que define la subvención."),
  p("ley-general-subvenciones", "media",
    "¿Quién tiene la consideración de beneficiario de una subvención según el art. 11.1 LGS?",
    ["La persona que haya de realizar la actividad que fundamentó su otorgamiento o que se encuentre en la situación que legitima su concesión",
     "Únicamente el órgano administrativo que tramita el expediente de concesión",
     "Cualquier persona que lo solicite, con independencia de si cumple los requisitos",
     "Solo las personas jurídicas, quedando excluidas las personas físicas"],
    "El art. 11.1 LGS liga la condición de beneficiario a la ejecución de la actividad o a encontrarse en la situación que justifica la subvención, no a un mero acto formal de solicitud."),
  p("ley-general-subvenciones", "dificil",
    "¿Qué es una entidad colaboradora según el art. 12.1 LGS?",
    ["La que, actuando en nombre y por cuenta del órgano concedente, entrega y distribuye los fondos públicos a los beneficiarios, o colabora en la gestión sin llegar a recibir y distribuir esos fondos",
     "Cualquier empresa privada que asesore al beneficiario en la solicitud de la subvención",
     "El órgano administrativo que resuelve el procedimiento de concesión",
     "El beneficiario final de la subvención, bajo otra denominación"],
    "El art. 12.1 LGS distingue a la entidad colaboradora del beneficiario: actúa como intermediaria del órgano concedente (entregando fondos o colaborando en la gestión), sin que esos fondos pasen a integrar su propio patrimonio."),
  p("ley-general-subvenciones", "media",
    "¿Cómo deben aprobarse las bases reguladoras de las subvenciones de las corporaciones locales según el art. 17.2 LGS?",
    ["En el marco de las bases de ejecución del presupuesto, a través de una ordenanza general de subvenciones o de una ordenanza específica",
     "Mediante orden ministerial, igual que en la Administración General del Estado",
     "No necesitan bases reguladoras: basta el acuerdo puntual del Pleno para cada subvención",
     "Mediante decreto del Presidente de la Corporación, sin intervención del Pleno"],
    "El art. 17.2 LGS diferencia el instrumento normativo de las bases reguladoras según el nivel de Administración: en la AGE, orden ministerial; en las corporaciones locales, ordenanza (general o específica), integrada en las bases de ejecución del presupuesto."),
  p("ley-general-subvenciones", "media",
    "¿Cuál de estos es un extremo que debe concretar, como mínimo, la norma reguladora de las bases de concesión según el art. 17.3 LGS?",
    ["Los criterios objetivos de otorgamiento de la subvención y, en su caso, su ponderación",
     "El nombre concreto de la persona que resultará beneficiaria",
     "El color corporativo que debe usar el beneficiario en su publicidad",
     "La afiliación política de los miembros del órgano concedente"],
    "El art. 17.3 LGS enumera un catálogo extenso (objeto, requisitos de los beneficiarios, procedimiento, criterios de otorgamiento, cuantía, órganos competentes, plazos de justificación, reintegro...) que garantiza la objetividad y publicidad de la concesión, nunca detalles ajenos como la identidad predeterminada del beneficiario."),
  p("ley-general-subvenciones", "facil",
    "¿Cuál es el procedimiento ordinario de concesión de subvenciones según el art. 22.1 LGS?",
    ["El régimen de concurrencia competitiva, comparando las solicitudes presentadas conforme a los criterios de valoración de las bases reguladoras",
     "La concesión directa, sin comparación entre solicitudes",
     "El sorteo público entre todos los solicitantes que cumplan los requisitos mínimos",
     "La subasta al mejor postor entre los solicitantes"],
    "El art. 22.1 LGS erige la concurrencia competitiva en procedimiento ordinario: solo excepcionalmente, en los supuestos tasados del art. 22.2, cabe la concesión directa (subvenciones nominativas, impuestas por norma legal, o de interés público justificado)."),
  p("ley-general-subvenciones", "media",
    "¿Cómo puede documentarse la justificación del cumplimiento de las condiciones de una subvención según el art. 30.1 LGS?",
    ["Mediante cuenta justificativa del gasto realizado, acreditación del gasto por módulos, o presentación de estados contables, según disponga la normativa reguladora",
     "Únicamente mediante una declaración jurada del beneficiario, sin más soporte documental",
     "Mediante la simple comunicación verbal al órgano concedente",
     "No es necesaria justificación alguna una vez abonada la subvención"],
    "El art. 30.1 LGS ofrece varias vías de justificación (cuenta justificativa, módulos, estados contables), que la normativa reguladora concretará en cada caso, sin admitir la falta absoluta de justificación."),
  p("ley-general-subvenciones", "media",
    "¿En qué plazo, a falta de previsión de las bases reguladoras, debe presentarse la cuenta justificativa según el art. 30.2 LGS?",
    ["Como máximo, en el plazo de tres meses desde la finalización del plazo para realizar la actividad",
     "En el plazo de un año desde la concesión de la subvención, en todo caso",
     "No existe plazo supletorio: si las bases no lo prevén, no hay obligación de justificar",
     "En el plazo de diez días hábiles desde la resolución de concesión"],
    "El art. 30.2 LGS fija un plazo supletorio de tres meses desde el fin del plazo de ejecución de la actividad, aplicable quando las bases reguladoras no hayan establecido uno propio."),
  p("ley-general-subvenciones", "media",
    "¿Cuál de estas es una causa de reintegro de una subvención según el art. 37.1 LGS?",
    ["El incumplimiento total o parcial del objetivo, actividad o proyecto que fundamentó la concesión",
     "El fallecimiento del funcionario que tramitó el expediente de concesión",
     "Un cambio de gobierno en la Administración concedente",
     "La revalorización del valor de mercado del bien adquirido con la subvención"],
    "El art. 37.1 LGS enumera un catálogo tasado de causas de reintegro (falseamiento de condiciones, incumplimiento del objetivo, falta de justificación, obstrucción al control...), todas ellas ligadas al comportamiento del beneficiario o entidad colaboradora, no a circunstancias ajenas como un cambio de gobierno."),
  p("ley-general-subvenciones", "dificil",
    "¿Qué naturaleza tienen las cantidades a reintegrar y qué interés de demora se aplica, según el art. 38.1-2 LGS?",
    ["Tienen la consideración de ingresos de derecho público, aplicándose para su cobro la Ley General Presupuestaria, con un interés de demora igual al interés legal del dinero incrementado en un 25 por ciento",
     "Tienen la consideración de créditos privados, exigibles solo por vía civil ordinaria",
     "No devengan ningún interés de demora, solo el principal reintegrado",
     "Se cobran exclusivamente mediante compensación con futuras subvenciones al mismo beneficiario"],
    "El art. 38.1-2 LGS refuerza el carácter público de estos créditos (vía de apremio administrativa, no civil) y fija un interés de demora agravado (interés legal +25%) frente al reintegro tardío."),
  // ── Ley de Subvenciones de Aragón (texto refundido, DLeg 2/2023) ────────
  p("ley-subvenciones-aragon", "facil",
    "¿Cuál es el objeto de la Ley de Subvenciones de Aragón según su art. 1.1?",
    ["Regular el régimen jurídico de las subvenciones que se concedan en el ámbito territorial de la Comunidad Autónoma de Aragón, en el marco de la normativa básica estatal",
     "Sustituir por completo a la Ley General de Subvenciones estatal en todo el territorio aragonés",
     "Regular únicamente las subvenciones de la Administración General del Estado en Aragón",
     "Regular exclusivamente las ayudas europeas gestionadas por el Gobierno de Aragón"],
    "El art. 1.1 de la Ley de Subvenciones de Aragón se sitúa expresamente dentro del marco de la normativa básica estatal (la LGS), no como un régimen alternativo o excluyente de esta."),
  p("ley-subvenciones-aragon", "media",
    "¿Es aplicable la Ley de Subvenciones de Aragón a las entidades locales de la Comunidad Autónoma, como la Diputación Provincial de Zaragoza, según su art. 2.3?",
    ["Sí: sus disposiciones son de aplicación a las entidades locales de la Comunidad Autónoma de Aragón, así como a sus organismos autónomos y entidades de derecho público",
     "No: la Ley de Subvenciones de Aragón se aplica exclusivamente a la Administración autonómica, nunca a las entidades locales",
     "Solo se aplica a los municipios, quedando excluidas las Diputaciones Provinciales",
     "Solo es de aplicación si la entidad local lo asume expresamente mediante ordenanza propia"],
    "El art. 2.3 extiende expresamente el ámbito de aplicación a las entidades locales aragonesas (municipios, comarcas, Diputaciones) y a sus organismos dependientes, no solo a la Administración autonómica."),
  p("ley-subvenciones-aragon", "media",
    "¿Qué texto normativo es actualmente la Ley de Subvenciones de Aragón?",
    ["El texto refundido aprobado por el Decreto Legislativo 2/2023, de 3 de mayo, del Gobierno de Aragón, que sustituyó a la Ley 5/2015, de 25 de marzo",
     "La Ley 5/2015, de 25 de marzo, que sigue vigente sin ninguna modificación posterior",
     "Un reglamento aprobado por cada Departamento del Gobierno de Aragón de forma independiente",
     "La misma Ley General de Subvenciones estatal, sin ninguna norma autonómica propia"],
    "La Ley 5/2015 fue objeto de un texto refundido posterior, aprobado por Decreto Legislativo 2/2023, que es la norma actualmente vigente en Aragón sobre esta materia."),
  p("ley-subvenciones-aragon", "media",
    "¿Están comprendidas en el ámbito de aplicación de la Ley de Subvenciones de Aragón las aportaciones entre diferentes Administraciones Públicas para financiar globalmente la actividad de la destinataria, según su art. 1.3?",
    ["No: quedan expresamente excluidas del ámbito de aplicación de la Ley",
     "Sí, sin excepción alguna",
     "Solo si la aportación la realiza la Administración del Estado",
     "Solo si supera una determinada cuantía fijada reglamentariamente"],
    "El art. 1.3 de la Ley de Subvenciones de Aragón reproduce la misma exclusión que la LGS estatal (art. 2.2) para las transferencias interadministrativas de financiación global."),
  p("ley-subvenciones-aragon", "media",
    "¿Cuál de estos es uno de los principios generales de gestión de las subvenciones según el art. 4 de la Ley de Subvenciones de Aragón?",
    ["Publicidad, transparencia, concurrencia, objetividad, igualdad y no discriminación",
     "Discrecionalidad absoluta del órgano concedente, sin necesidad de motivación",
     "Confidencialidad total del proceso de concesión, sin publicidad de las resoluciones",
     "Prioridad automática para quien primero presente la solicitud, sin comparación de méritos"],
    "El art. 4 recoge un catálogo de principios (publicidad, transparencia, concurrencia, objetividad, igualdad, no discriminación, eficacia, eficiencia) que reproduce y refuerza los que ya inspiran la LGS estatal, incompatibles con la discrecionalidad absoluta o la falta de publicidad."),
  p("ley-subvenciones-aragon", "dificil",
    "¿Qué régimen jurídico se aplica a las subvenciones financiadas total o parcialmente con fondos de la Unión Europea, según el art. 3.3 de la Ley de Subvenciones de Aragón?",
    ["La normativa comunitaria aplicable en cada caso y las normas nacionales y autonómicas de desarrollo o transposición, teniendo carácter supletorio la propia Ley de Subvenciones de Aragón",
     "Exclusivamente la Ley de Subvenciones de Aragón, sin ninguna referencia a la normativa comunitaria",
     "El régimen general de contratos públicos, no el de subvenciones",
     "El régimen de subvenciones nominativas en todo caso, sin necesidad de convocatoria"],
    "El art. 3.3 ordena las fuentes de estas subvenciones «europeas» dando prioridad a la normativa comunitaria y a su desarrollo estatal/autonómico, quedando la Ley de Subvenciones de Aragón en un papel meramente supletorio."),
];

async function main() {
  console.log("📝 temas (alta del tema canónico)...");
  await upsert(
    "temas",
    [
      {
        slug: TEMA,
        titulo: "Las subvenciones: régimen general y de Aragón",
        descripcion: "Concepto, naturaleza y clasificación de las subvenciones. Elementos personales: beneficiarios y entidades colaboradoras. Bases reguladoras. Procedimiento de concesión, pago, justificación y reintegro (Ley General de Subvenciones y Ley de Subvenciones de Aragón).",
        contenido: "Desarrolla el régimen jurídico común de las subvenciones públicas establecido por la Ley 38/2003, General de Subvenciones, junto con las especialidades de la Comunidad Autónoma de Aragón (texto refundido aprobado por Decreto Legislativo 2/2023), aplicable también a las entidades locales aragonesas.",
        enlaces_boe: [
          { titulo: "Ley 38/2003, General de Subvenciones", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2003-20977" },
          { titulo: "Decreto Legislativo 2/2023, texto refundido de la Ley de Subvenciones de Aragón", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2023-12919" },
        ],
        indice_estudio: [
          { seccion: "ley-general-subvenciones", titulo: "Ley 38/2003, General de Subvenciones: concepto, elementos personales, procedimiento y reintegro", articulos: "arts. 1-3, 11-12, 17, 22, 30-31, 37-38", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2003-20977#a1" },
          { seccion: "ley-subvenciones-aragon", titulo: "Ley de Subvenciones de Aragón (texto refundido): ámbito de aplicación y principios generales", articulos: "arts. 1-4", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2023-12919#a1" },
        ],
      },
    ],
    "slug"
  );

  console.log("📇 flashcards + 📝 preguntas...");
  const flashcards = ITEMS.map((it) => ({ tema_slug: TEMA, seccion: it.seccion, anverso: it.pregunta, reverso: it.opciones[0] }));
  const resF = await fetch(`${URL_BASE}/rest/v1/flashcards`, { method: "POST", headers: { ...HEADERS, Prefer: "return=minimal" }, body: JSON.stringify(flashcards) });
  if (!resF.ok) { console.error(`❌ flashcards ${resF.status} ${await resF.text()}`); process.exit(1); }
  console.log(`   ✓ flashcards: ${flashcards.length}`);

  for (const it of ITEMS) {
    const resP = await fetch(`${URL_BASE}/rest/v1/preguntas`, {
      method: "POST", headers: { ...HEADERS, Prefer: "return=representation" },
      body: JSON.stringify({ tema_slug: TEMA, seccion: it.seccion, enunciado: it.pregunta, explicacion: it.explicacion, dificultad: it.dificultad }),
    });
    if (!resP.ok) { console.error(`❌ pregunta ${resP.status} ${await resP.text()}`); process.exit(1); }
    const [row] = await resP.json();
    const opciones = it.opciones.map((texto, i) => ({ pregunta_id: row.id, texto, es_correcta: i === 0, orden: i }));
    const resO = await fetch(`${URL_BASE}/rest/v1/opciones`, { method: "POST", headers: { ...HEADERS, Prefer: "return=minimal" }, body: JSON.stringify(opciones) });
    if (!resO.ok) { console.error(`❌ opciones ${resO.status} ${await resO.text()}`); process.exit(1); }
  }
  console.log(`   ✓ preguntas: ${ITEMS.length}`);
  console.log(`✅ ${TEMA} completado.`);
}

await main();
