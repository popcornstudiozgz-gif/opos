/**
 * Flashcards de tema-2 (Igualdad y Violencia de Género) — parte 3/3:
 * II Plan de Igualdad para empleadas y empleados del Ayuntamiento de
 * Zaragoza (PIEEM). Es un documento de planificación municipal, no una
 * norma articulada: se priorizan los conceptos, estructura, cifras del
 * diagnóstico y el glosario (muy útil como material de examen), en vez de
 * las ~44 acciones operativas tabuladas (poco memorizables, alto volumen).
 *
 * Uso: node --env-file=.env.local scripts/seed-flashcards-tema-2-plan-zaragoza.mjs
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
const S = "plan-igualdad-zaragoza";

const CARDS = [
  c(S, "¿Qué es el PIEEM?", "El (II) Plan de Igualdad para Empleadas y Empleados Municipales del Ayuntamiento de Zaragoza"),
  c(S, "¿Cuándo se elaboró y aprobó el Primer Plan de Igualdad (PIEEM I)?", "Elaborado en 2010 tras el primer diagnóstico, con vigencia prevista 2011-2015, aprobado el 18 de abril de 2013"),
  c(S, "¿Qué órgano se constituyó el 26 de octubre de 2014?", "La Comisión para la Igualdad de carácter permanente, con representantes de la organización, secciones sindicales y agentes de igualdad"),
  c(S, "¿Cuándo se aprobó el diagnóstico previo al II PIEEM?", "El 23 de febrero de 2021, por la Comisión de Igualdad"),
  c(S, "¿Cuándo se constituyó la Comisión Negociadora del II Plan y cuándo aprobó el texto definitivo?", "Se constituyó el 20 de febrero de 2023 y aprobó el texto el 1 de marzo de 2023"),
  c(S, "¿En cuántas partes y anexos se estructura el Plan?", "12 partes y 4 anexos"),
  c(S, "¿Qué son la segregación horizontal y vertical (marco normativo/introducción)?", "Horizontal: concentración de mujeres/hombres en ocupaciones distintas según roles sociales. Vertical: techo de cristal — los hombres predominan en puestos directivos"),

  // Marco normativo
  c(S, "¿Qué es la CEDAW (marco normativo internacional)?", "La Convención sobre la eliminación de todas las formas de discriminación contra la mujer (1979), conocida como Carta de Derechos de las Mujeres"),
  c(S, "¿Qué recogió la Declaración de Beijing (1995)?", "La transversalidad del principio de igualdad entre hombres y mujeres (Mainstreaming) en todos los niveles de la Administración Pública"),
  c(S, "¿Qué ODS recoge la igualdad de género en la Agenda 2030?", "El ODS 5: lograr la igualdad entre los géneros y empoderar a todas las mujeres y niñas"),
  c(S, "¿Desde cuándo está consagrado el principio de igualdad de retribución en los Tratados de la UE?", "Desde 1957"),
  c(S, "¿Qué establece la Ley 7/2018 de Aragón en su art. 51?", "La obligación de las AAPP aragonesas con más de 250 empleados de aprobar cada 4 años un Plan de igualdad de oportunidades y conciliación"),
  c(S, "¿Qué recoge el Pacto Convenio 2016-2019 del Ayuntamiento de Zaragoza (art. 65)?", "El impulso del Plan de Igualdad municipal mediante la Comisión para la Igualdad, con el compromiso de garantizar la igualdad real de oportunidades"),

  // Marco conceptual (glosario)
  c(S, "¿Qué es la acción positiva? (marco conceptual)", "Conjunto de medidas correctoras temporales que benefician a las mujeres en el mercado de trabajo para favorecer la igualdad de oportunidades (art. 11 LO 3/2007)"),
  c(S, "¿Qué es la brecha salarial?", "La diferencia entre las retribuciones de hombres y mujeres, expresada como porcentaje del salario masculino (OCDE) o diferencia relativa del ingreso bruto promedio (Comisión Europea)"),
  c(S, "¿Qué es la corresponsabilidad?", "Reparto equilibrado de tareas domésticas y responsabilidades familiares entre todas las personas del grupo familiar, superando roles de género asignados"),
  c(S, "¿Qué es el diagnóstico de igualdad?", "Estudio cuantitativo y cualitativo de la situación de una entidad respecto a la igualdad, que detecta desigualdades y sustenta el Plan de Igualdad (art. 46 LO 3/2007)"),
  c(S, "¿Qué es el género (como concepto, distinto de sexo)?", "Los papeles, comportamientos y atribuciones socialmente construidos que una sociedad considera propios de mujeres u hombres"),
  c(S, "¿Qué es el informe de impacto de género?", "Análisis previo de un proyecto normativo o intervención para verificar su efecto diferenciado en mujeres y hombres, y proponer mejoras (art. 19 LO 3/2007)"),
  c(S, "¿Qué es la presencia o composición equilibrada (paridad)?", "Que las personas de cada sexo no superen el 60% ni sean menos del 40% del conjunto (Disp. adicional 1ª LO 3/2007)"),
  c(S, "¿Qué es la transversalidad de género o mainstreaming?", "Incorporación de la perspectiva de igualdad en todos los niveles y etapas de las políticas públicas (art. 15 LO 3/2007)"),
  c(S, "¿Cómo define la Ley Orgánica 1/2004 la violencia de género?", "La que se ejerce por los hombres contra las mujeres que sean o hayan sido sus cónyuges o estén/hayan estado ligadas por análoga afectividad, aun sin convivencia (art. 1)"),

  // Partes suscriptoras y ámbito
  c(S, "¿Qué organizaciones sindicales forman parte de la Comisión Negociadora del II PIEEM?", "CCOO, CGT, CSIF, FORZAPOL, OSTA, STAZ y UGT"),
  c(S, "¿A quién alcanza el ámbito personal del Plan?", "Todo el personal funcionario y laboral del Ayuntamiento de Zaragoza y sus organismos autónomos que se adhieran"),
  c(S, "¿Cuál es el ámbito temporal (vigencia) del II Plan?", "4 años desde su aprobación y registro, entrando en vigor tras su aprobación por el Gobierno de Zaragoza y publicación en el BOP"),

  // Metodología
  c(S, "Cita 4 características metodológicas del II PIEEM", "Transversal (todas las Áreas), específico (para la plantilla municipal), colectivo (beneficia a mujeres y hombres), participativo, flexible/dinámico, coherente, y en proceso continuo"),

  // Diagnóstico
  c(S, "¿Cuál era la composición de la plantilla municipal a 30 de junio de 2019?", "5.019 personas: 3.179 (63,3%) hombres y 1.840 (36,7%) mujeres"),
  c(S, "¿Qué áreas están más masculinizadas según el diagnóstico?", "Bomberos, seguida de Policía Local e Infraestructuras y Medio Ambiente"),
  c(S, "¿Qué áreas tienen mayor porcentaje de mujeres?", "Economía y Hacienda, Alcaldía y Recursos Humanos"),
  c(S, "¿Cómo es la composición del Gobierno de Zaragoza analizado (9 personas)?", "Paritaria con mayor presencia de mujeres, aunque la Alcaldía la ostenta un hombre"),
  c(S, "¿Cómo es la composición del personal directivo?", "El grupo más desequilibrado analizado: 67% hombres y 33% mujeres"),
  c(S, "¿Cómo se reparte la representación sindical entre Junta de Personal y Comité de Empresa?", "Junta de Personal: 27,6% mujeres / 72,4% hombres. Comité de Empresa: 77,8% mujeres / 22,2% hombres"),
  c(S, "¿Cómo evolucionó la diferencia entre hombres y mujeres en la plantilla de 2008 a 2019?", "Se redujo del 36,4% al 26,7%"),
  c(S, "¿Qué diferencia retributiva se detectó en el diagnóstico?", "2,3 puntos porcentuales a favor de los hombres en retribuciones totales; en 15 de 19 bandas retributivas el promedio favorece a los hombres"),
  c(S, "¿Qué se observó sobre el uso de permisos de conciliación?", "Las reducciones de jornada con merma retributiva para cuidado son solicitadas mayoritariamente por mujeres"),
  c(S, "¿Cuántas denuncias por acoso sexual hubo entre 2016-2019 según el diagnóstico?", "Ninguna denuncia formal, solo consultas; sí se detectaron indicios en procedimientos de acoso laboral sin poder evidenciarse por falta de denuncia"),

  // Objetivos y estructura de ejes
  c(S, "¿Cuál es el objetivo general del II PIEEM?", "Garantizar la igualdad real y efectiva de oportunidades entre mujeres y hombres y evitar cualquier discriminación por razón de sexo en el Ayuntamiento de Zaragoza"),
  c(S, "¿Cuáles son los 4 Ejes de actuación del II PIEEM?", "A) Cultura de la organización; B) Gestión de Recursos Humanos; C) Conciliación y corresponsabilidad; D) Prevención, salud laboral y protección frente al acoso"),
  c(S, "¿Cuál es el objetivo del Eje A (Cultura de la organización)?", "Garantizar la igualdad de trato y oportunidades como uno de los valores fundamentales de la organización municipal"),
  c(S, "¿Cuál es el objetivo del Eje B (Gestión de Recursos Humanos)?", "Garantizar la implementación de la perspectiva de género en la gestión de personal en todos sus procesos"),
  c(S, "¿Cuál es el objetivo del Eje C (Conciliación y corresponsabilidad)?", "Garantizar el derecho a la conciliación de la vida laboral, familiar y personal, e impulsar la corresponsabilidad"),
  c(S, "¿Cuál es el objetivo del Eje D (Prevención y protección frente al acoso)?", "Garantizar un entorno laboral adecuado para mejorar la calidad de vida de las personas trabajadoras"),
  c(S, "¿En qué líneas de actuación se divide el Eje A?", "A.1 Comunicación y sensibilización; A.2 Participación y negociación; A.3 Formación; A.4 Estructura y órganos municipales de seguimiento"),
  c(S, "¿En qué líneas de actuación se divide el Eje B?", "B.1 Acceso; B.2 Plantilla, RPT y promoción profesional; B.3 Retribuciones"),
  c(S, "¿En qué líneas de actuación se divide el Eje C?", "C.1 Conciliación; C.2 Corresponsabilidad"),
  c(S, "¿En qué líneas de actuación se divide el Eje D?", "D.1 Prevención y salud laboral; D.2 Clima laboral; D.3 Protección frente al acoso sexual, por razón de sexo y por orientación sexual"),
  c(S, "¿Cuántas líneas, objetivos específicos y acciones tiene en total el II PIEEM?", "4 Ejes, 12 Líneas de Actuación, 21 objetivos específicos y 44 acciones"),

  // Implementación y Comisión de Igualdad
  c(S, "¿Quién presta asesoramiento técnico a la Comisión de Igualdad?", "La Unidad Municipal de Igualdad (UMI)"),
  c(S, "¿Cómo se compone la Comisión de Igualdad?", "Representantes del equipo de Gobierno, servicios municipales implicados, sindicatos con derecho a negociación colectiva, y agentes de igualdad; representación paritaria corporación-sindicatos"),
  c(S, "Cita 3 funciones de la Comisión de Igualdad", "Hacer seguimiento y evaluar el Plan; impulsar las acciones de igualdad; comunicar el Plan a la estructura municipal; elaborar propuestas contra la segregación ocupacional; realizar memoria anual pública"),
  c(S, "¿Qué es el seguimiento anual del Plan?", "Un informe elaborado por la UMI, incluido en la Memoria anual de la Comisión de Igualdad, que mide la ejecución de acciones mediante las fichas de recogida de datos (Anexo III)"),
  c(S, "¿Qué realiza la evaluación final del Plan?", "La Comisión de Igualdad, valorando el logro de objetivos y sirviendo de base para el siguiente Plan, comparando el diagnóstico inicial con los datos finales"),

  // Calendario
  c(S, "¿Cuál es el periodo de vigencia del II Plan y qué ocurre en el último año?", "4 años desde su aprobación; en el último año se realiza un nuevo diagnóstico de la plantilla que inicia el proceso del siguiente Plan"),

  // Protocolo de acoso
  c(S, "¿Cuándo aprobó el Ayuntamiento de Zaragoza el Protocolo de Prevención y Actuación frente al Acoso Sexual?", "El 24 de junio de 2016, en la Comisión de Igualdad, incorporándose al pacto convenio vigente"),
  c(S, "¿Qué órganos crea el Protocolo de acoso para garantizar el procedimiento?", "La Asesoría Confidencial y el Comité de Asesoramiento"),
  c(S, "¿Bajo qué principios se garantiza la asistencia y protección a las víctimas en el Protocolo?", "Sigilo, respeto, profesionalidad, objetividad e imparcialidad y celeridad"),
  c(S, "¿Qué información periódica tiene derecho a recibir la Comisión de Igualdad sobre el Protocolo?", "Número de denuncias por acoso sexual/por razón de sexo/por orientación sexual, resultados de investigaciones y medidas adoptadas"),
];

console.log(`📝 Insertando ${CARDS.length} flashcards de tema-2 (Plan Igualdad Zaragoza)...`);
await insertBatch(CARDS);
console.log("✅ Tema-2 · Plan de Igualdad Zaragoza completado.");
