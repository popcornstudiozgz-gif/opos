/**
 * Alta del tema canónico nuevo: "La Ley de Prevención de Riesgos
 * Laborales" — para el Tema 20 de la oposición de la DPZ ("Ley de
 * Prevención de Riesgos Laborales: objeto y conceptos básicos. Derechos
 * y obligaciones. Prevención de riesgos laborales en la Administración
 * Pública.").
 *
 * Ley 31/1995, de 8 de noviembre (BOE-A-1995-24292): objeto y ámbito
 * (arts. 2-3, con mención expresa al personal funcionario/estatutario y
 * a las Administraciones Públicas), definiciones (art. 4), derecho a la
 * protección (art. 14, con el deber correlativo de las AAPP respecto a
 * su personal), principios de la acción preventiva (art. 15), formación
 * (art. 19) y obligaciones de los trabajadores, incluida su conexión con
 * el régimen disciplinario de los funcionarios (art. 29).
 *
 * Texto verificado contra el consolidado del BOE, no una paráfrasis.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-25-prevencion-riesgos-laborales.mjs
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

const TEMA = "tema-25";
const SECCION = "prevencion-riesgos-laborales";
const p = (dificultad, pregunta, opciones, explicacion) => ({ dificultad, pregunta, opciones, explicacion });

const ITEMS = [
  p("facil",
    "¿Qué tiene por objeto la Ley 31/1995 según su art. 2.1?",
    ["Promover la seguridad y la salud de los trabajadores mediante la aplicación de medidas y el desarrollo de las actividades necesarias para la prevención de riesgos derivados del trabajo",
     "Regular exclusivamente las relaciones laborales del personal de la Administración General del Estado",
     "Establecer el régimen sancionador de las empresas por accidentes laborales, sin regular la prevención",
     "Regular únicamente la Seguridad Social en su vertiente de prestaciones por incapacidad"],
    "El art. 2.1 LPRL centra el objeto de la Ley en la promoción de la seguridad y salud mediante la prevención, no en la sanción posterior ni en la regulación de las prestaciones de Seguridad Social."),
  p("media",
    "¿Qué carácter tienen las disposiciones laborales de la Ley 31/1995 según su art. 2.2?",
    ["Derecho necesario mínimo indisponible, pudiendo ser mejoradas y desarrolladas en los convenios colectivos",
     "Derecho dispositivo, que las partes pueden excluir libremente por pacto individual",
     "Meras recomendaciones sin fuerza vinculante para las empresas",
     "Normas de aplicación exclusivamente supletoria, solo si no hay convenio colectivo"],
    "El art. 2.2 LPRL fija un suelo mínimo de protección irrenunciable (indisponible), que los convenios colectivos pueden mejorar pero nunca rebajar."),
  p("media",
    "¿Es aplicable la Ley 31/1995 al personal con relación de carácter administrativo o estatutario al servicio de las Administraciones Públicas, según su art. 3.1?",
    ["Sí, con las peculiaridades que la propia Ley o sus normas de desarrollo contemplen para este colectivo",
     "No: la Ley se aplica exclusivamente a las relaciones laborales del Estatuto de los Trabajadores",
     "Solo si el empleado público tiene la condición de personal laboral, nunca si es funcionario",
     "Solo en las Comunidades Autónomas que lo hayan asumido expresamente mediante ley propia"],
    "El art. 3.1 LPRL extiende expresamente su aplicación al personal funcionario y estatutario, equiparando a estos efectos a la Administración empleadora con la figura del empresario."),
  p("dificil",
    "¿En qué actividades de las Administraciones Públicas no es de aplicación la Ley 31/1995, según su art. 3.2?",
    ["Policía, seguridad y resguardo aduanero; servicios operativos de protección civil y peritaje forense en casos de grave riesgo, catástrofe o calamidad pública; y Fuerzas Armadas y actividades militares de la Guardia Civil",
     "En ninguna actividad: la Ley se aplica sin excepción a todo el personal de las Administraciones Públicas",
     "Únicamente en la Administración General del Estado, siendo de aplicación plena en las Comunidades Autónomas y Entidades Locales",
     "En los servicios sanitarios públicos, por su normativa sectorial propia"],
    "El art. 3.2 LPRL excluye un catálogo tasado de funciones públicas cuyas particularidades impiden la aplicación directa de la Ley (aunque esta inspirará su normativa específica), sin que ello suponga excluir a las Administraciones Públicas en su conjunto."),
  p("media",
    "¿Qué se entiende por «prevención» según el art. 4.1º LPRL?",
    ["El conjunto de actividades o medidas adoptadas o previstas en todas las fases de actividad de la empresa con el fin de evitar o disminuir los riesgos derivados del trabajo",
     "Únicamente las medidas adoptadas después de haberse producido un accidente de trabajo",
     "La contratación de un seguro de accidentes laborales, exclusivamente",
     "El conjunto de sanciones impuestas a la empresa por incumplir la normativa de seguridad"],
    "El art. 4.1º LPRL define la prevención en sentido amplio y proactivo: medidas en todas las fases de la actividad, no una reacción posterior al daño ya producido."),
  p("media",
    "¿Cómo define el art. 4.2º LPRL el «riesgo laboral»?",
    ["La posibilidad de que un trabajador sufra un determinado daño derivado del trabajo, valorando conjuntamente la probabilidad del daño y su severidad",
     "Cualquier incomodidad menor en el puesto de trabajo, sin relación con la salud",
     "Únicamente los accidentes de trabajo ya materializados y reconocidos oficialmente",
     "La posibilidad de sanción administrativa a la empresa por infracción de la normativa laboral"],
    "El art. 4.2º LPRL combina dos variables (probabilidad y severidad) para calificar la gravedad de un riesgo, que por definición es una posibilidad futura, no un daño ya producido."),
  p("dificil",
    "¿Cómo define el art. 4.4º LPRL el «riesgo laboral grave e inminente»?",
    ["Aquel que resulte probable racionalmente que se materialice en un futuro inmediato y pueda suponer un daño grave para la salud de los trabajadores",
     "Cualquier riesgo laboral, sin distinción de gravedad ni de inmediatez temporal",
     "Únicamente el riesgo que ya se ha materializado en un accidente con baja médica",
     "El riesgo cuya probabilidad de materializarse es inferior al 1 por ciento"],
    "El art. 4.4º LPRL exige dos elementos acumulativos: probabilidad racional de materializarse en un futuro inmediato, y gravedad del daño potencial — sin ambos, no hay riesgo «grave e inminente» en sentido técnico."),
  p("media",
    "¿Qué deber correlativo genera el derecho de los trabajadores a una protección eficaz en materia de seguridad y salud, según el art. 14.1 LPRL, también respecto del personal de las Administraciones Públicas?",
    ["Un deber de protección del empresario, que constituye igualmente un deber de las Administraciones Públicas respecto del personal a su servicio",
     "Ningún deber correlativo: el derecho de los trabajadores no genera obligaciones para el empresario",
     "Un deber que recae exclusivamente sobre el propio trabajador, de autoprotección",
     "Un deber que solo alcanza a las empresas privadas, no a las Administraciones Públicas"],
    "El art. 14.1 LPRL extiende expresamente el deber de protección empresarial a las Administraciones Públicas en su condición de empleadoras del personal funcionario y estatutario."),
  p("media",
    "¿Sobre quién no debe recaer, en ningún caso, el coste de las medidas relativas a la seguridad y la salud en el trabajo, según el art. 14.5 LPRL?",
    ["Sobre los trabajadores",
     "Sobre el empresario o la Administración empleadora, que puede repercutirlo libremente en los trabajadores",
     "Sobre las mutuas colaboradoras con la Seguridad Social",
     "Sobre el Estado, que nunca participa en la financiación de estas medidas"],
    "El art. 14.5 LPRL protege al trabajador (o al empleado público) frente a cualquier repercusión económica de las medidas preventivas, que corren siempre a cargo del empresario o Administración."),
  p("media",
    "¿Cuál de estos es uno de los principios de la acción preventiva que debe aplicar el empresario según el art. 15.1 LPRL?",
    ["Evitar los riesgos y, cuando no sea posible, evaluar los que no se puedan evitar",
     "Trasladar siempre el riesgo al trabajador mediante equipos de protección individual, sin actuar sobre su origen",
     "Aplicar las medidas preventivas únicamente tras producirse un accidente",
     "Priorizar la protección individual sobre la colectiva en todos los casos"],
    "El art. 15.1 LPRL ordena jerárquicamente los principios preventivos: primero evitar el riesgo, después evaluarlo si no puede evitarse, combatirlo en su origen, y solo como última instancia recurrir a la protección individual (que además debe posponerse a la colectiva, art. 15.1.h)."),
  p("dificil",
    "¿Qué principio consagra el art. 15.1.d LPRL en relación con la organización del puesto de trabajo?",
    ["Adaptar el trabajo a la persona, en particular en la concepción de los puestos y en la elección de equipos y métodos, para atenuar el trabajo monótono y repetitivo",
     "Adaptar a la persona al puesto de trabajo existente, sin modificar nunca su diseño",
     "Priorizar siempre la producción sobre las condiciones ergonómicas del puesto",
     "Excluir a los trabajadores con menor experiencia de los puestos más exigentes, sin posibilidad de adaptación"],
    "El art. 15.1.d LPRL invierte la lógica clásica: no es el trabajador quien debe adaptarse al puesto, sino el puesto (su diseño, equipos y métodos) el que debe adaptarse a la persona."),
  p("media",
    "¿En qué momentos debe garantizar el empresario que el trabajador reciba formación en materia preventiva según el art. 19.1 LPRL?",
    ["En el momento de la contratación, cualquiera que sea su modalidad o duración, y cuando se produzcan cambios de funciones o se introduzcan nuevas tecnologías o cambios en los equipos de trabajo",
     "Únicamente en el momento de la contratación inicial, sin necesidad de formación posterior",
     "Solo cuando el trabajador lo solicite expresamente por escrito",
     "Solo tras haber sufrido un accidente de trabajo, con carácter correctivo"],
    "El art. 19.1 LPRL exige formación tanto al inicio de la relación como ante cualquier cambio relevante (funciones, tecnología, equipos) que pueda alterar los riesgos a los que se expone el trabajador."),
  p("media",
    "¿Debe impartirse la formación preventiva dentro de la jornada de trabajo según el art. 19.2 LPRL?",
    ["Siempre que sea posible sí, y si se imparte fuera de la jornada se descontará de ella el tiempo invertido, sin que su coste recaiga sobre el trabajador",
     "No, se imparte siempre fuera de la jornada laboral y a cargo del propio trabajador",
     "Solo si el trabajador es personal laboral, nunca si es funcionario público",
     "Únicamente si lo autoriza expresamente el comité de empresa"],
    "El art. 19.2 LPRL protege el tiempo y el coste del trabajador: formación dentro de la jornada siempre que sea posible, o compensación del tiempo si se imparte fuera de ella, y coste siempre a cargo de la empresa."),
  p("media",
    "Cita una de las obligaciones de los trabajadores en materia de prevención según el art. 29.2 LPRL",
    ["Usar adecuadamente las máquinas, aparatos, herramientas y sustancias peligrosas de acuerdo con su naturaleza y los riesgos previsibles",
     "Asumir personalmente el coste de los equipos de protección individual que necesite",
     "Diseñar por sí mismo el plan de prevención de riesgos laborales de su puesto de trabajo",
     "Sustituir al servicio de prevención en la evaluación de los riesgos de su puesto"],
    "El art. 29.2 LPRL enumera obligaciones concretas del trabajador (uso correcto de equipos, no anular dispositivos de seguridad, informar de riesgos, cooperar con el empresario...), sin trasladarle responsabilidades que son propias del empresario, como costear los EPI o elaborar el plan de prevención."),
  p("dificil",
    "¿Qué consecuencia tiene el incumplimiento por un funcionario público de sus obligaciones en materia de prevención de riesgos, según el art. 29.3 LPRL?",
    ["Tendrá la consideración de falta conforme a lo establecido en la normativa sobre régimen disciplinario de los funcionarios públicos o del personal estatutario al servicio de las Administraciones Públicas",
     "No tiene ninguna consecuencia disciplinaria, solo puede dar lugar a responsabilidad civil",
     "Se sanciona exclusivamente conforme al Estatuto de los Trabajadores, con independencia de la condición de funcionario",
     "Solo tiene consecuencias si se produce un accidente de trabajo efectivo, nunca de forma preventiva"],
    "El art. 29.3 LPRL conecta expresamente el incumplimiento preventivo del empleado público con su propio régimen disciplinario estatutario o funcionarial, no con el régimen laboral común del Estatuto de los Trabajadores."),
];

async function main() {
  console.log("📝 temas (alta del tema canónico)...");
  await upsert(
    "temas",
    [
      {
        slug: TEMA,
        titulo: "La Ley de Prevención de Riesgos Laborales",
        descripcion: "Objeto y ámbito de aplicación (con especial atención al personal funcionario y estatutario). Conceptos básicos: prevención, riesgo laboral, riesgo grave e inminente. Derechos y obligaciones de trabajadores y Administración. Principios de la acción preventiva.",
        contenido: "Desarrolla la Ley 31/1995, de Prevención de Riesgos Laborales, con especial atención a su aplicación al personal al servicio de las Administraciones Públicas: el deber de protección se extiende también a la Administración como empleadora, y el incumplimiento de las obligaciones preventivas por un empleado público se sanciona conforme a su propio régimen disciplinario.",
        enlaces_boe: [{ titulo: "Ley 31/1995, de Prevención de Riesgos Laborales", url: "https://www.boe.es/buscar/act.php?id=BOE-A-1995-24292" }],
        indice_estudio: [
          { seccion: SECCION, titulo: "Objeto, ámbito, conceptos básicos, derechos y obligaciones", articulos: "arts. 2-4, 14-15, 19, 29", url: "https://www.boe.es/buscar/act.php?id=BOE-A-1995-24292#a2" },
        ],
      },
    ],
    "slug"
  );

  console.log("📇 flashcards + 📝 preguntas...");
  const flashcards = ITEMS.map((it) => ({ tema_slug: TEMA, seccion: SECCION, anverso: it.pregunta, reverso: it.opciones[0] }));
  const resF = await fetch(`${URL_BASE}/rest/v1/flashcards`, { method: "POST", headers: { ...HEADERS, Prefer: "return=minimal" }, body: JSON.stringify(flashcards) });
  if (!resF.ok) { console.error(`❌ flashcards ${resF.status} ${await resF.text()}`); process.exit(1); }
  console.log(`   ✓ flashcards: ${flashcards.length}`);

  for (const it of ITEMS) {
    const resP = await fetch(`${URL_BASE}/rest/v1/preguntas`, {
      method: "POST", headers: { ...HEADERS, Prefer: "return=representation" },
      body: JSON.stringify({ tema_slug: TEMA, seccion: SECCION, enunciado: it.pregunta, explicacion: it.explicacion, dificultad: it.dificultad }),
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
