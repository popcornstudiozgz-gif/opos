/**
 * Flashcards de tema-2 (Igualdad y Violencia de Género) — parte 1/3:
 * Ley Orgánica 3/2007, de 22 de marzo, para la igualdad efectiva de mujeres
 * y hombres (LOIEMH). Arts. 1 a 78 (articulado sustantivo) + disposiciones
 * clave. Se omiten las disposiciones adicionales 2ª-12ª (enmiendas técnicas
 * a otras 7 leyes: régimen electoral, poder judicial, LEC, Estatuto de los
 * Trabajadores...) por no tener valor de examen para este temario.
 *
 * Uso: node --env-file=.env.local scripts/seed-flashcards-tema-2-loiemh.mjs
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
const S = "loiemh"; // sección única: toda la LOIEMH la usa completa esta oposición

const CARDS = [
  c(S, "¿Cuál es el objeto de la Ley Orgánica 3/2007 (art. 1.1)?", "Hacer efectivo el derecho de igualdad de trato y oportunidades entre mujeres y hombres, eliminando la discriminación de la mujer en cualquier ámbito, en desarrollo de los arts. 9.2 y 14 CE"),
  c(S, "¿Qué establece la Ley para lograr ese objeto (art. 1.2)?", "Principios de actuación de los Poderes Públicos, derechos y deberes de personas físicas y jurídicas, y medidas para corregir toda discriminación por razón de sexo"),
  c(S, "¿A quién se aplican las obligaciones de la Ley según el art. 2.2?", "A toda persona física o jurídica en territorio español, cualquiera que sea su nacionalidad, domicilio o residencia"),
  c(S, "¿Qué supone el principio de igualdad de trato entre mujeres y hombres (art. 3)?", "La ausencia de toda discriminación directa o indirecta por razón de sexo, especialmente las derivadas de maternidad, obligaciones familiares y estado civil"),
  c(S, "¿Cómo se integra el principio de igualdad en el ordenamiento jurídico (art. 4)?", "Es un principio informador que se integra y observa en la interpretación y aplicación de las normas jurídicas"),
  c(S, "¿En qué ámbitos laborales se garantiza la igualdad de trato según el art. 5?", "Acceso al empleo, formación y promoción profesional, condiciones de trabajo (incluidas retributivas y de despido), y afiliación sindical/empresarial"),
  c(S, "¿Qué es la discriminación directa por razón de sexo (art. 6.1)?", "Tratar a una persona de manera menos favorable que a otra en situación comparable, en atención a su sexo"),
  c(S, "¿Qué es la discriminación indirecta por razón de sexo (art. 6.2)?", "Que una disposición, criterio o práctica aparentemente neutros ponga a personas de un sexo en desventaja particular, salvo justificación objetiva y proporcionada"),
  c(S, "¿Qué se considera discriminatorio en todo caso según el art. 6.3?", "Toda orden de discriminar, directa o indirectamente, por razón de sexo"),
  c(S, "¿Qué constituye acoso sexual según el art. 7.1?", "Cualquier comportamiento verbal o físico de naturaleza sexual que atente contra la dignidad de una persona, creando un entorno intimidatorio, degradante u ofensivo"),
  c(S, "¿Qué constituye acoso por razón de sexo (art. 7.2)?", "Cualquier comportamiento realizado en función del sexo de una persona que atente contra su dignidad y cree un entorno intimidatorio, degradante u ofensivo"),
  c(S, "¿Son discriminatorios el acoso sexual y por razón de sexo (art. 7.3)?", "Sí, se consideran en todo caso discriminatorios"),
  c(S, "¿Qué añade el art. 7.4 sobre condicionar un derecho a aceptar el acoso?", "Se considera también acto de discriminación por razón de sexo"),
  c(S, "¿Qué constituye discriminación directa según el art. 8?", "Todo trato desfavorable a las mujeres relacionado con el embarazo o la maternidad"),
  c(S, "¿Qué protege el art. 9 (indemnidad frente a represalias)?", "Cualquier trato adverso derivado de haber presentado queja, reclamación, denuncia o recurso para impedir la discriminación por razón de sexo"),
  c(S, "¿Qué consecuencias jurídicas tienen las conductas discriminatorias (art. 10)?", "Los actos/cláusulas discriminatorios son nulos y sin efecto, generan responsabilidad mediante reparación/indemnización proporcionada y, en su caso, sanciones disuasorias"),
  c(S, "¿Qué son las acciones positivas del art. 11.1?", "Medidas específicas de los Poderes Públicos en favor de las mujeres para corregir desigualdades de hecho, razonables y proporcionadas mientras persistan"),
  c(S, "¿Pueden las entidades privadas adoptar acciones positivas (art. 11.2)?", "Sí, en los términos establecidos en la Ley"),
  c(S, "¿A qué tiene derecho cualquier persona según el art. 12.1 (tutela judicial efectiva)?", "A recabar de los tribunales la tutela del derecho a la igualdad, incluso tras terminar la relación en que se produjo la discriminación"),
  c(S, "¿Quién está legitimado en litigios sobre acoso sexual (art. 12.3)?", "Únicamente la persona acosada"),
  c(S, "¿A quién corresponde la carga de la prueba en discriminación por sexo (art. 13.1)?", "A la persona demandada, que debe probar la ausencia de discriminación y su proporcionalidad"),
  c(S, "¿Se aplica esta inversión de la carga de la prueba a procesos penales (art. 13.2)?", "No"),

  // Título II, Cap. I: Principios generales de las políticas públicas
  c(S, "Cita 4 de los criterios generales de actuación de los Poderes Públicos del art. 14", "Compromiso con la efectividad del derecho de igualdad; integración transversal en políticas económicas/laborales/sociales; colaboración entre Administraciones; participación equilibrada en candidaturas electorales y toma de decisiones"),
  c(S, "¿Qué otros criterios recoge el art. 14 sobre violencia y colectivos vulnerables?", "Erradicación de la violencia de género y el acoso; atención a mujeres de colectivos vulnerables (minorías, migrantes, discapacidad, mayores, víctimas de violencia)"),
  c(S, "¿Qué mandata el art. 14 sobre conciliación y lenguaje?", "Medidas de conciliación y corresponsabilidad doméstica, y fomento de un lenguaje no sexista en la Administración"),
  c(S, "¿Qué es la transversalidad del principio de igualdad (art. 15)?", "Que informa con carácter transversal la actuación de todos los Poderes Públicos, integrándose en normas, presupuestos y actividades"),
  c(S, "¿Qué deben procurar los Poderes Públicos en nombramientos (art. 16)?", "Atender al principio de presencia equilibrada de mujeres y hombres en cargos de responsabilidad"),
  c(S, "¿Qué es el Plan Estratégico de Igualdad de Oportunidades (art. 17)?", "Un plan que el Gobierno aprueba periódicamente con medidas para alcanzar la igualdad y eliminar la discriminación por sexo"),
  c(S, "¿Qué establece el art. 18 sobre el informe periódico del Gobierno?", "Elaborar un informe sobre sus actuaciones de igualdad, dando cuenta a las Cortes Generales"),
  c(S, "¿Qué exige el art. 19 (informes de impacto de género)?", "Que proyectos de disposiciones generales y planes de relevancia sometidos al Consejo de Ministros incorporen informe de impacto por razón de género"),
  c(S, "Cita 3 obligaciones estadísticas del art. 20", "Incluir la variable sexo en estadísticas/encuestas; establecer indicadores sobre diferencias entre mujeres y hombres; diseñar indicadores de discriminación múltiple"),
  c(S, "¿Cómo cooperan las Administraciones según el art. 21?", "AGE y CCAA cooperan en la Conferencia Sectorial de la Mujer; las Entidades Locales integran el derecho de igualdad en sus competencias"),
  c(S, "¿Qué son los Planes Municipales de organización del tiempo (art. 22)?", "Planes que las corporaciones locales pueden establecer para un reparto equitativo de los tiempos entre mujeres y hombres"),

  // Título II, Cap. II: Acción administrativa para la igualdad
  c(S, "¿Qué incluye el sistema educativo según el art. 23?", "Entre sus fines, la educación en el respeto a los derechos fundamentales y en la igualdad de derechos y oportunidades entre mujeres y hombres"),
  c(S, "Cita 3 actuaciones educativas del art. 24.2", "Atención al principio de igualdad en currículos; eliminación de contenidos sexistas en libros de texto; formación del profesorado en igualdad"),
  c(S, "¿Qué fomentan las Administraciones en educación superior (art. 25)?", "Enseñanza e investigación sobre igualdad, inclusión en planes de estudio, postgrados específicos y estudios especializados"),
  c(S, "¿Qué vela el art. 26 en creación y producción artística?", "El principio de igualdad de trato y oportunidades en la creación, producción y difusión artística e intelectual"),
  c(S, "¿Qué integran las políticas de salud según el art. 27.1?", "Las distintas necesidades de mujeres y hombres y las medidas para abordarlas adecuadamente"),
  c(S, "Cita 2 actuaciones sanitarias del art. 27.3", "Promoción de la salud de las mujeres y prevención de su discriminación; integración del principio de igualdad en la formación del personal sanitario, detectando violencia de género"),
  c(S, "¿Qué garantizan los programas de Sociedad de la Información según el art. 28?", "La consideración del principio de igualdad de oportunidades en su diseño y ejecución, y el lenguaje no sexista en proyectos con dinero público"),
  c(S, "¿Qué promueve el Gobierno en materia de deporte (art. 29)?", "El deporte femenino y la apertura efectiva de las disciplinas deportivas a las mujeres, en todos los niveles"),
  c(S, "¿Qué desarrolla el art. 30 sobre desarrollo rural?", "La titularidad compartida en el sector agrario, mejora del nivel educativo, nuevas actividades laborales y servicios sociales para la conciliación en el medio rural"),
  c(S, "¿Qué incluyen las políticas de vivienda y urbanismo según el art. 31?", "Medidas de igualdad en el acceso a la vivienda, atención a víctimas de violencia de género, y perspectiva de género en el planeamiento urbanístico"),
  c(S, "¿Qué incluye la cooperación española para el desarrollo (art. 32)?", "El principio de igualdad como elemento sustancial, con una Estrategia Sectorial de Igualdad actualizada periódicamente"),
  c(S, "¿Qué pueden hacer los órganos de contratación según el art. 33?", "Establecer condiciones especiales en la ejecución de contratos para promover la igualdad en el mercado de trabajo"),
  c(S, "¿Qué determina anualmente el Consejo de Ministros según el art. 34.1?", "Qué contratos de la AGE deben incluir obligatoriamente medidas de igualdad efectiva en el mercado de trabajo"),
  c(S, "¿Qué pueden valorar las subvenciones públicas según el art. 35?", "Actuaciones de consecución de la igualdad: conciliación, responsabilidad social, o el distintivo empresarial en igualdad"),

  // Título III: Igualdad y medios de comunicación
  c(S, "¿Qué velan los medios públicos según el art. 36?", "Una imagen igualitaria, plural y no estereotipada de mujeres y hombres, promoviendo el principio de igualdad"),
  c(S, "¿Qué objetivos persigue RTVE en su programación (art. 37.1)?", "Reflejar la presencia de las mujeres, usar lenguaje no sexista, códigos de conducta de igualdad, y colaborar contra la violencia de género"),
  c(S, "¿Qué debe hacer la Agencia EFE según el art. 38?", "Velar por la igualdad y el lenguaje no sexista, con objetivos similares a los de RTVE"),
  c(S, "¿Qué exige el art. 39 a los medios privados?", "Respetar la igualdad entre mujeres y hombres, evitando cualquier forma de discriminación"),
  c(S, "¿Qué función tiene la Autoridad audiovisual (art. 40)?", "Adoptar medidas para asegurar un tratamiento de las mujeres conforme a los valores constitucionales"),
  c(S, "¿Qué se considera la publicidad discriminatoria (art. 41)?", "Publicidad ilícita, conforme a la legislación general de publicidad"),

  // Título IV, Cap. I: Igualdad laboral
  c(S, "¿Qué objetivo prioritario tienen las políticas de empleo según el art. 42?", "Aumentar la participación de las mujeres en el mercado de trabajo y su empleabilidad"),
  c(S, "¿Qué permite la negociación colectiva según el art. 43?", "Establecer medidas de acción positiva para favorecer el acceso de mujeres al empleo y la igualdad de trato"),

  // Título IV, Cap. II: Igualdad y conciliación
  c(S, "¿Qué reconoce el art. 44 sobre conciliación?", "Derechos de conciliación de vida personal, familiar y laboral para trabajadores y trabajadoras, y permisos de maternidad y paternidad"),

  // Título IV, Cap. III: Planes de igualdad de las empresas
  c(S, "¿Qué empresas están obligadas a tener plan de igualdad (art. 45.2)?", "Las de 50 o más trabajadores"),
  c(S, "¿En qué otros casos debe haber plan de igualdad según el art. 45.3-4?", "Cuando lo establezca el convenio colectivo aplicable, o cuando la autoridad laboral sustituya sanciones accesorias por un plan de igualdad"),
  c(S, "¿Qué es un plan de igualdad según el art. 46.1?", "Un conjunto ordenado de medidas, tras un diagnóstico, para alcanzar la igualdad de trato y oportunidades y eliminar la discriminación por sexo en la empresa"),
  c(S, "Cita 4 materias que debe contener el diagnóstico del art. 46.2", "Selección y contratación, clasificación profesional, formación, promoción profesional, condiciones de trabajo (incluida auditoría salarial), retribuciones y prevención del acoso"),
  c(S, "¿Qué registro crea el art. 46.4?", "El Registro de Planes de Igualdad de las Empresas, dependiente de la Dirección General de Trabajo"),
  c(S, "¿Qué garantiza el art. 47 sobre transparencia?", "El acceso de la representación legal de los trabajadores a la información sobre el contenido y objetivos del plan de igualdad"),
  c(S, "¿Qué deben promover las empresas según el art. 48.1?", "Condiciones de trabajo que eviten el acoso sexual y por razón de sexo, incluido el ámbito digital"),
  c(S, "¿Qué apoyo da el Gobierno según el art. 49?", "Medidas de fomento para la implantación voluntaria de planes de igualdad, especialmente en pymes"),

  // Título IV, Cap. IV: Distintivo empresarial
  c(S, "¿Qué es el distintivo empresarial en igualdad (art. 50)?", "Un reconocimiento del Ministerio de Trabajo a empresas que destaquen en políticas de igualdad, usable con fines publicitarios"),

  // Título V, Cap. I: Criterios de actuación AAPP
  c(S, "Cita 3 obligaciones de las Administraciones Públicas en empleo público (art. 51)", "Remover obstáculos discriminatorios en el acceso y carrera; facilitar la conciliación; fomentar la formación en igualdad; promover presencia equilibrada en órganos de selección"),

  // Título V, Cap. II: Presencia equilibrada en la AGE
  c(S, "¿Qué atiende el Gobierno en nombramientos directivos (art. 52)?", "El principio de presencia equilibrada de mujeres y hombres en los órganos directivos de la AGE y sus organismos"),
  c(S, "¿Qué principio siguen los órganos de selección de la AGE (art. 53)?", "El principio de presencia equilibrada de mujeres y hombres, salvo razones fundadas y objetivas motivadas"),
  c(S, "¿Qué principio rige la designación de representantes de la AGE (art. 54)?", "El principio de presencia equilibrada, también en consejos de administración de empresas participadas"),

  // Título V, Cap. III: Medidas de igualdad en el empleo AGE
  c(S, "¿Qué debe acompañar las convocatorias de acceso al empleo público (art. 55)?", "Un informe de impacto de género, salvo urgencia"),
  c(S, "¿Qué reconoce el art. 56 a los empleados públicos?", "Excedencias, reducciones de jornada, permisos y un permiso de paternidad, para proteger la maternidad y la conciliación"),
  c(S, "¿Qué se computa en los concursos de provisión de puestos (art. 57)?", "El tiempo en situaciones de conciliación, a efectos de méritos"),
  c(S, "¿Qué regula el art. 58 (licencia por riesgo)?", "Licencia por riesgo durante el embarazo y la lactancia natural, con plenitud de derechos económicos"),
  c(S, "¿Qué derecho reconoce el art. 59 sobre vacaciones?", "Disfrutarlas en fecha distinta si coinciden con incapacidad por embarazo/parto/lactancia o con el permiso de maternidad/paternidad"),
  c(S, "¿Qué preferencia da el art. 60 en formación?", "Preferencia durante un año a quienes se reincorporen de permiso de maternidad/paternidad o excedencia por cuidado; reserva de al menos 40% de plazas de cursos directivos para mujeres"),
  c(S, "¿Qué exige el art. 61 sobre formación para la igualdad?", "Las pruebas de acceso contemplarán el principio de igualdad; se impartirán cursos sobre igualdad y prevención de violencia de género"),
  c(S, "¿Qué regula el protocolo de actuación del art. 62?", "Frente al acoso sexual y por razón de sexo: compromiso de no tolerancia, instrucción al personal, tratamiento reservado de denuncias e identificación de responsables"),
  c(S, "¿Qué deben remitir los Departamentos Ministeriales según el art. 63?", "Información anual sobre la aplicación del principio de igualdad, con datos desagregados por sexo"),
  c(S, "¿Qué es el Plan para la Igualdad en la AGE (art. 64)?", "Un plan que el Gobierno aprueba al inicio de cada legislatura, con objetivos y estrategias, negociado con la representación de empleados públicos"),

  // Título V, Cap. IV y V: FFAA y FCSE
  c(S, "¿Qué procuran las normas de personal de las Fuerzas Armadas (art. 65)?", "La efectividad del principio de igualdad, especialmente en acceso, formación, ascensos, destinos y situaciones administrativas"),
  c(S, "¿Se aplican a las FFAA las normas generales de igualdad de las AAPP (art. 66)?", "Sí, con las adaptaciones necesarias según su normativa específica"),
  c(S, "¿Qué promueven las normas de las Fuerzas y Cuerpos de Seguridad (art. 67)?", "La igualdad efectiva, impidiendo discriminación en acceso, formación, ascensos, destinos y situaciones administrativas"),
  c(S, "¿Se aplican a las FCSE las normas generales de igualdad (art. 68)?", "Sí, adaptándose a las peculiaridades de sus funciones"),

  // Título VI: Acceso a bienes y servicios
  c(S, "¿A qué están obligados quienes suministran bienes/servicios al público (art. 69.1)?", "Al cumplimiento del principio de igualdad de trato entre mujeres y hombres, evitando discriminación directa o indirecta"),
  c(S, "¿Afecta esto a la libertad de contratación (art. 69.2)?", "No, salvo que la elección de la otra parte venga determinada por su sexo"),
  c(S, "¿Cuándo son admisibles diferencias de trato en bienes/servicios (art. 69.3)?", "Cuando estén justificadas por un propósito legítimo con medios adecuados y necesarios"),
  c(S, "¿Qué prohíbe el art. 70?", "Indagar sobre la situación de embarazo de una mujer en el acceso a bienes/servicios, salvo por protección de su salud"),
  c(S, "¿Qué prohíbe el art. 71.1 sobre seguros?", "Que el sexo sea factor de cálculo de primas y prestaciones en seguros o servicios financieros"),
  c(S, "¿Qué dice el art. 71.2 sobre embarazo y parto?", "Sus costes no justifican diferencias en primas y prestaciones individuales"),
  c(S, "¿Qué derecho tiene quien sufre discriminación en bienes/servicios (art. 72.1)?", "Derecho a indemnización por daños y perjuicios"),

  // Título VII: Responsabilidad social de las empresas
  c(S, "¿Qué son las acciones de responsabilidad social en igualdad (art. 73)?", "Medidas voluntarias económicas, comerciales, laborales o asistenciales para promover la igualdad en la empresa o su entorno"),
  c(S, "¿Pueden publicitarse estas acciones (art. 74)?", "Sí, conforme a la legislación de publicidad; el Instituto de la Mujer puede ejercer la acción de cesación por publicidad engañosa"),
  c(S, "¿Qué procuran las grandes sociedades según el art. 75?", "Incluir en su Consejo de administración un número de mujeres que permita una presencia equilibrada en 8 años"),

  // Título VIII: Disposiciones organizativas
  c(S, "¿Qué es la Comisión Interministerial de Igualdad (art. 76)?", "El órgano colegiado responsable de coordinar las políticas de igualdad entre los departamentos ministeriales"),
  c(S, "¿Qué son las Unidades de Igualdad (art. 77)?", "Órganos directivos en cada Ministerio encargados de las funciones de igualdad: estadísticas, estudios, informes de impacto de género y formación"),
  c(S, "¿Qué es el Consejo de Participación de la Mujer (art. 78)?", "Órgano colegiado de consulta y asesoramiento para la participación de las mujeres en la igualdad de trato, con participación de AAPP y asociaciones"),

  // Disposiciones seleccionadas
  c(S, "¿Qué es \"composición equilibrada\" según la Disp. adicional primera?", "Que las personas de cada sexo no superen el 60% ni sean menos del 40% del conjunto"),
  c(S, "¿Qué deroga la Disposición derogatoria única?", "Cuantas normas de igual o inferior rango se opongan o contradigan la Ley"),
  c(S, "¿Qué disposiciones de la Ley tienen carácter orgánico (Disp. final segunda)?", "Solo las disposiciones adicionales primera, segunda y tercera; el resto de preceptos no tienen carácter orgánico"),
  c(S, "¿Cuándo entra en vigor la Ley (Disp. final octava)?", "Al día siguiente de su publicación en el BOE, salvo el art. 71.2, que entró en vigor el 31 de diciembre de 2008"),
];

console.log(`📝 Insertando ${CARDS.length} flashcards de tema-2 (LOIEMH)...`);
const BATCH = 200;
for (let i = 0; i < CARDS.length; i += BATCH) {
  await insertBatch(CARDS.slice(i, i + BATCH));
  console.log(`   ✓ ${Math.min(i + BATCH, CARDS.length)}/${CARDS.length}`);
}
console.log("✅ Tema-2 · LOIEMH completado.");
