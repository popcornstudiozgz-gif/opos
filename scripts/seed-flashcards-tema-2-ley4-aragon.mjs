/**
 * Flashcards de tema-2 (Igualdad y Violencia de Género) — parte 2/3:
 * Ley 4/2007, de 22 de marzo, de Prevención y Protección Integral a las
 * Mujeres Víctimas de Violencia en Aragón. Arts. 1 a 36 + disposiciones.
 *
 * Uso: node --env-file=.env.local scripts/seed-flashcards-tema-2-ley4-aragon.mjs
 */

const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const HEADERS = {
  apikey: SERVICE_KEY,
  Authorization: `Bearer ${SERVICE_KEY}`,
  "Content-Type": "application/json",
};

async function insertBatch(filas) {
  const res = await fetch(`${URL_BASE}/rest/v1/flashcards`, {
    method: "POST",
    headers: { ...HEADERS, Prefer: "return=minimal" },
    body: JSON.stringify(filas),
  });
  if (!res.ok) {
    console.error(`❌ Error insertando: ${res.status} ${await res.text()}`);
    process.exit(1);
  }
}

const TEMA = "tema-2";
const c = (seccion, anverso, reverso) => ({ tema_slug: TEMA, seccion, anverso, reverso });
const S = "ley-4-2007-aragon";

const CARDS = [
  c(S, "¿Cuál es el objeto de la Ley 4/2007 de Aragón (art. 1.1)?", "Adoptar medidas integrales de sensibilización, prevención y erradicación de la violencia contra las mujeres, y de protección, asistencia y seguimiento a las víctimas"),
  c(S, "¿Qué se entiende por violencia ejercida contra las mujeres (art. 1.2)?", "Todo acto o agresión motivado por la pertenencia al sexo femenino, con daño físico/psicológico o agresión a la libertad e indemnidad sexual, al amparo de una situación de debilidad o dependencia de la víctima"),
  c(S, "Enumera las formas de violencia contra las mujeres del art. 2 (primera mitad)", "a) Malos tratos físicos; b) malos tratos psicológicos; c) malos tratos sexuales; d) agresiones/abusos a niñas o adolescentes; e) acoso sexual"),
  c(S, "Enumera las formas de violencia contra las mujeres del art. 2 (segunda mitad)", "f) Tráfico/explotación sexual; g) mutilación genital femenina; h) violencia contra derechos sexuales y reproductivos; i) maltrato económico; j) otras formas análogas"),
  c(S, "¿Qué es la violencia doméstica según el art. 3.a?", "La ejercida por quien sostiene o ha sostenido vínculo afectivo, conyugal, de pareja o paterno-filial con la víctima (incluye descendientes, ascendientes, hermanas y menores bajo su guarda)"),
  c(S, "¿Qué es la violencia laboral o docente según el art. 3.b?", "La ejercida por quien tiene con la víctima un vínculo laboral, docente o de prestación de servicios, prevaliéndose de dependencia, debilidad o proximidad"),
  c(S, "¿Qué es la violencia social según el art. 3.c?", "La ejercida por quien carece de los vínculos anteriores, incluyendo a personas del núcleo de convivencia familiar y personas vulnerables bajo custodia en centros"),
  c(S, "¿A quién se aplica la Ley según el art. 4?", "A las mujeres que, dentro de Aragón, sean víctimas de cualquiera de las formas de violencia del art. 2"),
  c(S, "¿Qué promueve la Administración aragonesa según el art. 5?", "Estudios e investigaciones sobre las formas de violencia contra las mujeres, sus causas, características, costes sociales y eficacia de las medidas"),
  c(S, "¿Qué impulsa el art. 6.1 sobre campañas?", "Campañas de sensibilización sobre violencia e igualdad, con atención especial a mujeres del medio rural"),
  c(S, "¿Qué garantiza el Gobierno de Aragón en medios públicos según el art. 6.3?", "Que no emitan contenidos vejatorios que inciten a la violencia o promuevan estereotipos sexistas"),
  c(S, "¿Qué se considera ilícita según el art. 6.5?", "La publicidad que atente contra la dignidad de la mujer o la presente de forma vejatoria"),
  c(S, "¿Qué incluyen los diseños curriculares según el art. 7.2?", "Contenidos para promover la educación en igualdad de oportunidades como instrumento de prevención de la violencia"),
  c(S, "¿Qué revisa el Departamento educativo según el art. 7.4?", "Los materiales educativos, para excluir contenidos e imágenes estereotipadas que fomenten violencia o desigualdad"),
  c(S, "¿Qué hace la Inspección de Trabajo según el art. 8.2?", "Actúa de oficio en todos los casos de violencia contra la mujer en el ámbito laboral"),
  c(S, "¿Qué pone en marcha la Administración según el art. 9 (formación de profesionales)?", "Programas de coordinación y formación para profesionales del ámbito policial, social, docente, laboral, sanitario y jurídico"),
  c(S, "¿Qué apoya el art. 10?", "A los colectivos y entidades sociales que lleven a cabo programas de prevención y erradicación de la violencia"),
  c(S, "¿Qué es el Servicio Social Integral y Especializado en Violencia contra la Mujer (art. 12.1)?", "Un servicio dependiente del Instituto Aragonés de la Mujer que presta información, atención, emergencia, apoyo, acogida y recuperación integral"),
  c(S, "Enumera 4 de las prestaciones de atención multidisciplinar del art. 12.2", "Información con asesoramiento jurídico; atención psicológica; apoyo social; seguimiento de reclamaciones de derechos; apoyo educativo a la unidad familiar; apoyo a formación e inserción laboral"),
  c(S, "¿Qué son los centros comarcales de información y servicios a la mujer (art. 13)?", "Servicios sociales dependientes de las comarcas que ofrecen, de forma gratuita, asesoría jurídica, psicológica y social a mujeres víctimas de violencia"),
  c(S, "¿Qué atienden los servicios sociales comunitarios (art. 14)?", "A las mujeres víctimas de violencia, informando y asesorando sobre los recursos existentes"),
  c(S, "¿Qué garantiza el art. 16 sobre asistencia jurídica?", "Un servicio de atención especializada y gratuita que oriente a las mujeres sobre aspectos jurídicos"),
  c(S, "¿Qué es el servicio de guardia del art. 17?", "Asistencia jurídica y social de emergencia 24 horas mediante teléfono gratuito, atendida por profesionales especialistas"),
  c(S, "¿Qué son los centros de emergencia (art. 18)?", "Centros de asistencia permanente e inmediata que dan alojamiento y protección a víctimas en riesgo inminente; al menos uno por provincia"),
  c(S, "¿Qué son las casas de acogida (art. 19)?", "Servicio social especializado que acoge temporalmente a mujeres (solas o con menores) que hayan abandonado el domicilio y carezcan de medios; al menos una por provincia"),
  c(S, "¿Qué son los pisos tutelados (art. 20)?", "Hogares funcionales y temporales para mujeres víctimas que ya no requieren el tratamiento de la casa de acogida pero necesitan apoyo para su autonomía"),
  c(S, "¿Qué son los puntos de encuentro (art. 22)?", "Lugares para las visitas de madres/padres a sus hijos en casos de separación/divorcio con antecedentes de violencia, atendidos por personal especializado"),
  c(S, "¿Qué es el dispositivo de alarma (art. 24)?", "Una unidad de teleasistencia que la víctima en alto riesgo puede activar, conectada a una central receptora"),
  c(S, "¿Qué es el servicio de mediación familiar (art. 25)?", "Un proceso alternativo de resolución de conflictos familiares mediante una persona mediadora neutral e imparcial"),
  c(S, "¿Qué ofrece el servicio de atención psicológica a hombres maltratadores (art. 26)?", "Tratamiento específico para dotarles de habilidades de resolución de conflictos por vías no violentas"),
  c(S, "¿Qué derecho tienen las víctimas y sus hijos según el art. 27?", "Asistencia psicológica gratuita, desde la atención inicial hasta el seguimiento del proceso de recuperación"),
  c(S, "¿Qué elabora el Departamento de salud según el art. 28?", "Un protocolo con pautas uniformes de actuación sanitaria para las víctimas de violencia, revisado periódicamente"),
  c(S, "¿Qué establece el art. 29 sobre vivienda?", "Reserva de viviendas protegidas en arrendamiento o precario para víctimas de violencia doméstica sin vivienda adecuada"),
  c(S, "¿Qué prioridad tienen las víctimas en formación laboral según el art. 30.2?", "Inclusión preferente y específica en programas de formación e inserción laboral, inscribiéndose como demandantes de empleo"),
  c(S, "¿Cuándo ejerce el Gobierno de Aragón la acción popular (art. 31)?", "En los casos más graves de violencia, si la víctima lo solicita o si la acción delictiva provoca su muerte"),
  c(S, "¿Qué es el Ingreso Aragonés de Inserción para víctimas (art. 32)?", "Una prestación por procedimiento abreviado, con reconocimiento y abono en máximo 45 días naturales desde la solicitud"),
  c(S, "¿Qué destinan las comarcas según el art. 33?", "Una partida específica de ayudas de urgente necesidad para emergencias sociales de víctimas sin medios económicos"),
  c(S, "¿Qué es la renta activa de inserción del art. 34?", "Una ayuda estatal específica sobre la que la Administración aragonesa informa y colabora en su gestión"),
  c(S, "¿Qué facilita el art. 35 sobre ayudas escolares?", "La escolarización de hijos de víctimas, valorando la violencia familiar como factor cualificado para ayudas y matriculación"),
  c(S, "¿Qué es el Observatorio Aragonés de Violencia sobre la Mujer (Disp. adicional segunda)?", "Un órgano colegiado adscrito al Departamento de mujer, para asesoramiento, evaluación, informes y propuestas en materia de violencia sobre la mujer"),
  c(S, "¿Qué informe anual remite el Departamento de mujer a las Cortes de Aragón (Disp. adicional cuarta)?", "Recursos destinados a prevención y protección, número de denuncias, actuaciones de asistencia, readaptación de maltratadores, y órdenes de protección dictadas"),
  c(S, "¿Cuándo entra en vigor la Ley 4/2007 (Disp. final tercera)?", "El día siguiente al de su publicación en el Boletín Oficial de Aragón"),
];

console.log(`📝 Insertando ${CARDS.length} flashcards de tema-2 (Ley 4/2007 Aragón)...`);
await insertBatch(CARDS);
console.log("✅ Tema-2 · Ley 4/2007 Aragón completado.");
