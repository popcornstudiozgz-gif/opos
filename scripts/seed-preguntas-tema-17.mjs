/**
 * Preguntas de test — Tema 17 (TREBEP I: clases de personal, derechos,
 * deberes y código de conducta), derivadas 1:1 de las flashcards del mismo
 * tema/seccion.
 *
 * Uso: node --env-file=.env.local scripts/seed-preguntas-tema-17.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

async function insertPreguntas(preguntas) {
  for (const p of preguntas) {
    const resP = await fetch(`${URL_BASE}/rest/v1/preguntas`, {
      method: "POST",
      headers: { ...HEADERS, Prefer: "return=representation" },
      body: JSON.stringify({ tema_slug: TEMA, seccion: p.seccion, enunciado: p.enunciado, explicacion: p.explicacion ?? null, dificultad: p.dificultad }),
    });
    if (!resP.ok) { console.error(`❌ pregunta ${resP.status} ${await resP.text()}`); process.exit(1); }
    const [row] = await resP.json();
    const opciones = p.opciones.map((texto, i) => ({ pregunta_id: row.id, texto, es_correcta: i === 0, orden: i }));
    const resO = await fetch(`${URL_BASE}/rest/v1/opciones`, { method: "POST", headers: { ...HEADERS, Prefer: "return=minimal" }, body: JSON.stringify(opciones) });
    if (!resO.ok) { console.error(`❌ opciones ${resO.status} ${await resO.text()}`); process.exit(1); }
  }
}

const TEMA = "tema-17";
const q = (seccion, dificultad, enunciado, opciones, explicacion) => ({ seccion, dificultad, enunciado, opciones, explicacion });

const PREGUNTAS = [
  q("clases-personal", "facil",
    "¿Quiénes son empleados públicos según el art. 8.1 TREBEP?",
    ["Quienes desempeñan funciones retribuidas en las Administraciones Públicas al servicio de los intereses generales",
     "Únicamente quienes ostentan la condición de funcionario de carrera",
     "Cualquier persona que preste servicios, retribuidos o no, a una Administración Pública",
     "Solo el personal directivo de las Administraciones Públicas"]),
  q("clases-personal", "facil",
    "¿Cuáles son las 4 clases de empleados públicos según el art. 8.2 TREBEP?",
    ["Funcionarios de carrera, funcionarios interinos, personal laboral (fijo, indefinido o temporal), y personal eventual",
     "Funcionarios de carrera, personal directivo, personal laboral y personal de confianza",
     "Funcionarios de carrera, funcionarios interinos y personal laboral, únicamente",
     "Funcionarios de carrera, personal estatutario y personal eventual"]),
  q("clases-personal", "media",
    "¿Qué es un funcionario de carrera según el art. 9.1 TREBEP?",
    ["Quien, por nombramiento legal, está vinculado a una Administración por relación estatutaria de Derecho Administrativo, para servicios profesionales retribuidos de carácter permanente",
     "Quien presta servicios mediante contrato de trabajo por escrito, con carácter fijo",
     "Quien ocupa temporalmente una plaza vacante mientras se provee definitivamente",
     "Quien desempeña funciones de confianza o asesoramiento especial de carácter no permanente"]),
  q("clases-personal", "dificil",
    "¿Qué funciones corresponden exclusivamente a los funcionarios públicos según el art. 9.2 TREBEP?",
    ["Las que impliquen participación directa o indirecta en el ejercicio de potestades públicas o en la salvaguardia de los intereses generales",
     "Todas las funciones administrativas, sin excepción, incluidas las de mero trámite",
     "Únicamente las funciones directivas de cada Administración",
     "Las funciones de asesoramiento técnico no jurídico"]),
  q("clases-personal", "dificil",
    "¿Cuáles son las circunstancias que justifican nombrar un funcionario interino según el art. 10.1 TREBEP?",
    ["Plazas vacantes (máx. 3 años), sustitución transitoria de titulares, ejecución de programas temporales (máx. 3 años) y exceso o acumulación de tareas (máx. 9 meses en 18)",
     "Únicamente la existencia de una plaza vacante sin límite temporal",
     "Solo la sustitución transitoria de un funcionario de carrera en excedencia",
     "La creación de un nuevo cuerpo o escala, sin necesidad de más requisitos"]),
  q("clases-personal", "media",
    "¿Qué ocurre transcurridos 3 años desde el nombramiento de un interino por vacante, según el art. 10.4 TREBEP?",
    ["Se produce el fin de la relación de interinidad; la vacante solo puede ocuparla un funcionario de carrera, salvo que el proceso selectivo quede desierto",
     "El interino adquiere automáticamente la condición de funcionario de carrera",
     "La plaza queda amortizada de forma automática",
     "El interino puede prorrogar su nombramiento otros 3 años sin nueva convocatoria"]),
  q("clases-personal", "facil",
    "¿Qué es el personal laboral según el art. 11.1 TREBEP?",
    ["Quien, mediante contrato de trabajo por escrito, presta servicios retribuidos a las Administraciones Públicas; puede ser fijo, indefinido o temporal",
     "Quien ejerce funciones que implican el ejercicio de potestades públicas",
     "Quien, con carácter no permanente, solo realiza funciones de confianza o asesoramiento especial",
     "Quien ocupa una plaza vacante de funcionario de carrera con carácter provisional"]),
  q("clases-personal", "media",
    "¿Qué es el personal eventual según el art. 12.1 TREBEP?",
    ["Quien, con carácter no permanente, solo realiza funciones de confianza o asesoramiento especial, retribuido con créditos presupuestarios consignados para ese fin",
     "Quien sustituye transitoriamente a un funcionario de carrera en su puesto",
     "Quien accede a la función pública mediante concurso-oposición con carácter temporal",
     "Quien presta servicios mediante contrato de trabajo indefinido"]),
  q("clases-personal", "media",
    "¿Cómo son el nombramiento y el cese del personal eventual según el art. 12.3 TREBEP?",
    ["Libres; el cese se produce, en todo caso, cuando cesa la autoridad a la que presta la función de confianza",
     "Reglados, mediante concurso público de méritos",
     "Libres el nombramiento, pero el cese requiere expediente disciplinario",
     "Sujetos a los mismos requisitos que el funcionario de carrera"]),
  q("clases-personal", "facil",
    "¿Puede la condición de personal eventual constituir mérito para el acceso a la función pública, según el art. 12.4 TREBEP?",
    ["No",
     "Sí, siempre que se hayan desempeñado funciones de asesoramiento",
     "Sí, pero solo para el acceso a cuerpos del Subgrupo A1",
     "Sí, si el desempeño ha sido valorado positivamente"]),
  q("derechos", "dificil",
    "¿Cuál de los siguientes es un derecho individual de los empleados públicos según el art. 14 TREBEP?",
    ["La inamovilidad en la condición de funcionario de carrera",
     "El derecho a elegir libremente su puesto de trabajo sin proceso de provisión",
     "El derecho a la promoción automática cada cinco años",
     "El derecho a percibir retribuciones idénticas en todas las Administraciones"]),
  q("derechos", "media",
    "¿Qué derecho reconoce el art. 14.f) TREBEP sobre defensa jurídica?",
    ["A la defensa jurídica y protección de la Administración en procedimientos judiciales derivados del ejercicio legítimo de sus funciones",
     "A la defensa jurídica gratuita en cualquier procedimiento, tenga o no relación con el servicio",
     "A la contratación libre de abogado particular con cargo a la Administración en todo caso",
     "A no comparecer ante los tribunales sin autorización expresa de su superior"]),
  q("derechos", "media",
    "¿Cuáles de estos derechos individuales se ejercen de forma colectiva según el art. 15 TREBEP?",
    ["Libertad sindical, negociación colectiva, ejercicio de la huelga, planteamiento de conflictos colectivos y de reunión",
     "La inamovilidad en la condición de funcionario de carrera",
     "La formación continua y la progresión en la carrera profesional",
     "La percepción de retribuciones y las vacaciones y permisos"]),
  q("deberes-codigo-conducta", "media",
    "¿Con qué principios deben actuar los empleados públicos según el art. 52 TREBEP?",
    ["Objetividad, integridad, neutralidad, responsabilidad, imparcialidad, confidencialidad, dedicación al servicio público, transparencia, ejemplaridad, austeridad, accesibilidad, eficacia y honradez",
     "Jerarquía, disciplina, obediencia ciega y confidencialidad absoluta",
     "Eficiencia económica, rentabilidad y competitividad",
     "Antigüedad, lealtad personal y discreción"]),
  q("deberes-codigo-conducta", "media",
    "¿Qué papel tienen los principios del Código de Conducta en el régimen disciplinario según el art. 52 TREBEP?",
    ["Informan la interpretación y aplicación del régimen disciplinario de los empleados públicos",
     "No tienen ninguna relación con el régimen disciplinario",
     "Sustituyen íntegramente a la tipificación legal de las faltas disciplinarias",
     "Solo se aplican al personal directivo, no al resto de empleados públicos"]),
  q("deberes-codigo-conducta", "dificil",
    "¿Cuál de estos es un principio ético recogido en el art. 53 TREBEP?",
    ["Abstenerse en asuntos en los que tengan interés personal y no aceptar tratos de favor",
     "Anteponer el interés particular al interés general cuando exista conflicto",
     "Guardar silencio ante cualquier irregularidad detectada en el servicio",
     "Aceptar regalos de valor simbólico si no condicionan su actuación"]),
  q("deberes-codigo-conducta", "dificil",
    "¿Cuál de estos es un principio de conducta recogido en el art. 54 TREBEP?",
    ["Obedecer las instrucciones de los superiores, salvo que constituyan una infracción manifiesta del ordenamiento jurídico",
     "Obedecer siempre a los superiores, sin excepción alguna",
     "Rechazar cualquier instrucción con la que no estén de acuerdo",
     "Administrar los recursos públicos sin sujeción a criterios de austeridad"]),
  q("deberes-codigo-conducta", "media",
    "¿Qué deben hacer los empleados públicos ante una orden que constituya infracción manifiesta del ordenamiento jurídico, según el art. 54.3 TREBEP?",
    ["No obedecerla y ponerla inmediatamente en conocimiento de los órganos de inspección",
     "Obedecerla igualmente y comunicarlo después a su superior jerárquico",
     "Solicitar la orden por escrito antes de decidir si la cumplen",
     "Recurrirla ante los tribunales antes de negarse a cumplirla"]),
];

console.log(`📝 Insertando ${PREGUNTAS.length} preguntas de ${TEMA}...`);
await insertPreguntas(PREGUNTAS);
console.log(`✅ ${TEMA} completado.`);
