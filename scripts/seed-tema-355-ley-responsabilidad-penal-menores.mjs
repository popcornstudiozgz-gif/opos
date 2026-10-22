/**
 * Crea tema-355 — Tema 28 de Policía Local: "Ley Reguladora de la
 * Responsabilidad Penal de los Menores: Títulos I y II."
 *
 * Fuente: Ley Orgánica 5/2000, de 12 de enero, reguladora de la
 * responsabilidad penal de los menores (BOE-A-2000-641, título verificado),
 * texto consolidado del BOE leído íntegro en los arts. 1 a 15 (Títulos I y
 * II). Incluye la redacción del art. 4 dada por la LO 1/2025 (vigente desde
 * el 3-04-2025) y la del art. 10.2 tras la LO 10/2022. La ley conserva el
 * término «falta» (arts. 9.1 y 15), pese a que el Código Penal suprimió las
 * faltas en 2015 y hoy distingue delitos graves, menos graves y leves; se
 * reproduce tal cual, señalándolo.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-355-ley-responsabilidad-penal-menores.mjs
 */
import { sembrarTema, POLICIA } from "./lib/sembrar-tema.mjs";

const LEY = "https://www.boe.es/buscar/act.php?id=BOE-A-2000-641";
const a = (ancla) => `${LEY}#${ancla}`;
const S1 = "ambito-aplicacion";
const S2 = "catalogo-medidas";
const S3 = "reglas-aplicacion-duracion";
const S4 = "modificacion-mayoria-edad-prescripcion";

await sembrarTema({
  tema: {
    slug: "tema-355",
    titulo: "Ley Orgánica 5/2000, de responsabilidad penal de los menores: ámbito de aplicación y medidas",
    descripcion: "Ámbito de aplicación (mayores de 14 y menores de 18 años); competencia de los Jueces de Menores y del Juzgado Central de Menores; menores de 14 años y protección; derechos de las víctimas y perjudicados; bases de la responsabilidad y momento de la edad; intervención del Ministerio Fiscal; catálogo de medidas (internamientos, tratamiento ambulatorio, centro de día, permanencia de fin de semana, libertad vigilada y reglas de conducta, alejamiento, convivencia educativa, prestaciones en beneficio de la comunidad, tareas socioeducativas, amonestación, privación de permisos e inhabilitación absoluta); principio acusatorio; régimen general y reglas especiales de duración; pluralidad de infracciones; modificación; mayoría de edad; prescripción.",
    contenido: "Recorre los Títulos I y II de la Ley Orgánica 5/2000 (arts. 1 a 15): a quién se aplica la ley (de 14 a 17 años en el momento de los hechos), qué ocurre con los menores de 14, quién investiga (el Fiscal, con la policía judicial), las medidas que puede imponer el Juez de Menores ordenadas de mayor a menor restricción, cuándo cabe el internamiento en régimen cerrado, las duraciones máximas según la edad y la gravedad, y qué pasa cuando el menor cumple 18 o 21 años.",
    enlaces_boe: [{ url: LEY, titulo: "Ley Orgánica 5/2000, de 12 de enero, reguladora de la responsabilidad penal de los menores (BOE-A-2000-641)" }],
    indice_estudio: [
      { seccion: S1, titulo: "Título I: ámbito de aplicación, competencia, víctimas y Ministerio Fiscal", articulos: "arts. 1-6", url: a("ti") },
      { seccion: S2, titulo: "Título II: definición de las medidas y reglas generales", articulos: "arts. 7-8", url: a("a7") },
      { seccion: S3, titulo: "Régimen general y reglas especiales de duración; pluralidad de infracciones", articulos: "arts. 9-12", url: a("a9") },
      { seccion: S4, titulo: "Modificación de la medida, mayoría de edad y prescripción", articulos: "arts. 13-15", url: a("a13") },
    ],
  },
  vinculo: { oposicion: POLICIA.oposicion, bloqueId: POLICIA.bloqueParte2, numero: 28 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Ámbito de aplicación (art. 1.1)", "Exigir la responsabilidad de las personas mayores de 14 años y menores de 18 por hechos tipificados como delito en el Código Penal o las leyes penales especiales"],
        ["Derechos de los menores (art. 1.2)", "Todos los de la Constitución y el ordenamiento, en particular la LO 1/1996 de Protección Jurídica del Menor y la Convención sobre los Derechos del Niño de 1989"],
        ["Juez competente (art. 2)", "El Juez de Menores del lugar de comisión del hecho, también para la responsabilidad civil y la ejecución"],
        ["Juzgado Central de Menores de la Audiencia Nacional (art. 2.4)", "Delitos de terrorismo (arts. 571 a 580 CP) y delitos cometidos por menores en el extranjero cuya competencia corresponda a España"],
        ["Menores de 14 años (art. 3)", "No se les exige responsabilidad con esta ley: se aplican las normas de protección de menores; el Fiscal remite testimonio a la entidad pública de protección"],
        ["Derechos de las víctimas (art. 4)", "Fiscal y Juez velan por ellas; pueden personarse en el expediente; si no lo hacen ni renuncian, el Fiscal ejercita la acción civil; declaraciones telemáticas en violencia de género, sexual, trata o víctimas menores o con discapacidad"],
        ["Bases de la responsabilidad (art. 5.1)", "Responden si cometieron los hechos y no concurre ninguna causa de exención o extinción del Código Penal"],
        ["Eximentes 1.ª a 3.ª del art. 20 CP en menores (art. 5.2)", "Se les pueden aplicar, si es necesario, las medidas terapéuticas: internamiento terapéutico y tratamiento ambulatorio"],
        ["Momento de la edad (art. 5.3)", "Las edades se refieren siempre al momento de la comisión de los hechos"],
        ["Ministerio Fiscal (art. 6)", "Defiende los derechos del menor, vigila las garantías, dirige personalmente la investigación y ordena a la policía judicial las actuaciones necesarias"],
      ],
      preguntas: [
        ["facil", "La LO 5/2000 se aplica a las personas…", ["Mayores de catorce años y menores de dieciocho", "Menores de dieciséis años", "Mayores de doce y menores de dieciocho"], "Art. 1.1."],
        ["media", "Si el autor de un delito tiene trece años…", ["No se le exige responsabilidad con esta ley y se aplican las normas de protección de menores", "Se le aplica la ley con medidas leves", "Responde conforme al Código Penal"], "Art. 3."],
        ["media", "¿Quién dirige personalmente la investigación de los hechos cometidos por menores?", ["El Ministerio Fiscal", "El Juez de Menores", "La Policía Local"], "Art. 6."],
        ["media", "Un menor comete un delito con 17 años y es juzgado con 19. ¿Qué ley se le aplica?", ["La LO 5/2000, porque la edad se refiere al momento de los hechos", "El Código Penal de adultos", "Ninguna"], "Art. 5.3."],
        ["dificil", "¿Qué órgano es competente para los delitos de terrorismo cometidos por menores?", ["El Juzgado Central de Menores de la Audiencia Nacional", "El Juez de Menores del lugar", "El Tribunal Supremo"], "Art. 2.4."],
        ["media", "¿Qué juez es competente con carácter general?", ["El Juez de Menores del lugar donde se cometió el hecho", "El del domicilio del menor", "El del domicilio de la víctima"], "Art. 2.3."],
        ["media", "Si la víctima no se persona ni renuncia a la acción civil…", ["La ejercitará el Ministerio Fiscal si corresponde", "Se pierde la acción", "La ejercita la policía"], "Art. 4."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Orden de las medidas (art. 7.1)", "Ordenadas según la restricción de derechos: de mayor (internamiento cerrado) a menor (amonestación), más privación de permisos e inhabilitación absoluta"],
        ["Internamiento cerrado, semiabierto y abierto", "Cerrado: todas las actividades en el centro. Semiabierto: reside en el centro y puede hacer fuera algunas actividades. Abierto: actividades en el entorno, con el centro como domicilio habitual"],
        ["Internamiento terapéutico y tratamiento ambulatorio", "Para anomalías psíquicas, dependencias o alteraciones de la percepción; si rechaza la deshabituación, el juez aplica otra medida"],
        ["Permanencia de fin de semana (art. 7.1.g)", "En su domicilio o en un centro hasta un máximo de 36 horas entre la tarde o noche del viernes y la noche del domingo"],
        ["Libertad vigilada (art. 7.1.h)", "Seguimiento de la actividad del menor y su asistencia a la escuela o trabajo, con pautas socioeducativas y, en su caso, reglas de conducta (asistir a clase, programas formativos, prohibición de acudir a lugares, de ausentarse, residir en un lugar, comparecer…)"],
        ["Prohibición de aproximarse o comunicarse con la víctima (art. 7.1.i)", "Impide acercarse a ella en cualquier lugar, su domicilio, centro docente o trabajo, y cualquier contacto escrito, verbal o visual"],
        ["Prestaciones en beneficio de la comunidad (art. 7.1.k)", "Actividades no retribuidas de interés social; no puede imponerse sin consentimiento del menor"],
        ["Amonestación (art. 7.1.m)", "Reprensión del Juez de Menores para que comprenda la gravedad de los hechos y no los repita"],
        ["Dos periodos del internamiento (art. 7.2)", "Primero en el centro y después en libertad vigilada; la duración total no excede de los máximos de los arts. 9 y 10"],
        ["Delitos sexuales (art. 7.5)", "Si la medida es por delitos de los Capítulos I y II del Título VIII CP, se impone en todo caso la obligación de seguir programas de educación sexual y en igualdad"],
        ["Principio acusatorio (art. 8)", "El juez no puede imponer una medida más restrictiva ni más larga que la pedida por el Fiscal o el acusador particular, ni superar la pena que correspondería a un adulto"],
      ],
      preguntas: [
        ["media", "La medida más restrictiva del catálogo del art. 7.1 es…", ["Internamiento en régimen cerrado", "Libertad vigilada", "Amonestación"], "Art. 7.1.a)."],
        ["media", "La permanencia de fin de semana dura como máximo…", ["Treinta y seis horas entre la tarde o noche del viernes y la noche del domingo", "Cuarenta y ocho horas", "Todo el fin de semana sin límite"], "Art. 7.1.g)."],
        ["media", "¿Pueden imponerse prestaciones en beneficio de la comunidad sin consentimiento del menor?", ["No", "Sí", "Solo si tiene 16 años"], "Art. 7.1.k)."],
        ["media", "En el internamiento en régimen semiabierto el menor…", ["Reside en el centro y puede realizar fuera algunas actividades", "Reside en su casa", "No sale nunca del centro"], "Art. 7.1.b)."],
        ["dificil", "¿Puede el Juez de Menores imponer una medida más grave que la solicitada por el Fiscal o el acusador particular?", ["No, por el principio acusatorio", "Sí", "Solo si es reincidente"], "Art. 8."],
        ["media", "Las medidas de internamiento constan de dos periodos: en el centro y…", ["En libertad vigilada", "En prisión", "En el domicilio familiar"], "Art. 7.2."],
        ["dificil", "¿Puede imponerse a un menor en una misma resolución más de una medida de la misma clase?", ["No", "Sí", "Solo internamientos"], "Art. 7.4."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Hechos calificados de «falta» (art. 9.1)", "Solo libertad vigilada (máx. 6 meses), amonestación, permanencia de fin de semana (máx. 4), prestaciones (máx. 50 horas), privación de permisos (máx. 1 año), alejamiento (máx. 6 meses) y tareas socioeducativas (máx. 6 meses)"],
        ["¿Cuándo cabe el internamiento en régimen cerrado? (art. 9.2)", "Delito grave; delito menos grave con violencia o intimidación o grave riesgo para la vida o integridad; o delito cometido en grupo o por miembro de banda u organización"],
        ["Duración general máxima (art. 9.3)", "Dos años; prestaciones en beneficio de la comunidad: 100 horas; permanencia de fin de semana: 8 fines de semana"],
        ["Imprudencia (art. 9.4)", "Las acciones u omisiones imprudentes no pueden sancionarse con internamiento en régimen cerrado"],
        ["Menores de 14 o 15 años en hechos del art. 9.2 (art. 10.1.a)", "La medida puede llegar a 3 años (150 horas de prestaciones o 12 fines de semana)"],
        ["Menores de 16 o 17 años en hechos del art. 9.2 (art. 10.1.b)", "Hasta 6 años (200 horas o 16 fines de semana); con extrema gravedad, internamiento cerrado de 1 a 6 años más libertad vigilada hasta 5; la reincidencia es siempre extrema gravedad"],
        ["Delitos del art. 10.2", "Homicidio, asesinato, ciertas agresiones sexuales y violación, terrorismo y delitos con prisión de 15 años o más: 14-15 años, internamiento cerrado de 1 a 5 años (+ libertad vigilada hasta 3); 16-17 años, de 1 a 8 años (+ hasta 5)"],
        ["Pluralidad de infracciones del art. 10.2 (art. 11.2)", "El internamiento cerrado puede llegar a 10 años para mayores de 16 y a 6 para menores de esa edad"],
      ],
      preguntas: [
        ["media", "Con carácter general, la duración de las medidas no puede exceder de…", ["Dos años", "Cinco años", "Un año"], "Art. 9.3."],
        ["media", "¿Puede imponerse internamiento en régimen cerrado por un hecho imprudente?", ["No", "Sí", "Solo si hay muertos"], "Art. 9.4."],
        ["media", "El internamiento en régimen cerrado cabe en un delito menos grave cuando…", ["Se ha empleado violencia o intimidación o se ha generado grave riesgo para la vida", "Siempre", "Nunca"], "Art. 9.2.b)."],
        ["dificil", "Un menor de 17 años comete un asesinato. ¿Qué medida debe imponerse?", ["Internamiento en régimen cerrado de uno a ocho años, más libertad vigilada de hasta cinco", "Internamiento de hasta dos años", "Libertad vigilada"], "Art. 10.2.b)."],
        ["dificil", "Si el menor de 16 o 17 años es reincidente en un hecho del art. 9.2, el caso se considera…", ["De extrema gravedad", "Leve", "Ordinario"], "Art. 10.1.b), último párrafo."],
        ["media", "Un menor de 15 años comete un robo con violencia (art. 9.2). La medida puede alcanzar…", ["Tres años", "Seis años", "Dos años"], "Art. 10.1.a)."],
        ["media", "Las prestaciones en beneficio de la comunidad, con carácter general, no pueden superar…", ["Cien horas", "Cincuenta horas", "Doscientas horas"], "Art. 9.3."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Modificación de la medida (art. 13)", "El juez de la ejecución puede dejarla sin efecto, reducirla o sustituirla en cualquier momento si redunda en interés del menor y se le expresa el reproche merecido; por auto motivado"],
        ["Delitos sexuales y modificación (art. 13.1)", "Solo puede dejarse sin efecto si se acredita el cumplimiento de los programas de educación sexual e igualdad"],
        ["Mayoría de edad (art. 14.1)", "Al cumplir 18 años continúa el cumplimiento de la medida hasta alcanzar sus objetivos"],
        ["Internamiento cerrado al cumplir 18 (art. 14.2)", "El juez puede ordenar que siga en centro penitenciario si la conducta no responde a los objetivos"],
        ["Internamiento cerrado al cumplir 21 (art. 14.3)", "Se ordena su cumplimiento en centro penitenciario, salvo que excepcionalmente proceda modificarla o que siga en el centro"],
        ["Prescripción de los hechos (art. 15.1)", "Según el Código Penal en homicidio, asesinato, violación, terrorismo y delitos con 15 años o más; 5 años los graves con pena superior a 10; 3 años los demás graves; 1 año los menos graves; 3 meses las «faltas»"],
        ["Prescripción de las medidas (art. 15.2)", "Las de más de dos años, a los tres años; las restantes, a los dos, salvo amonestación, prestaciones y permanencia de fin de semana, que prescriben al año"],
        ["Terminología de la ley", "La ley mantiene el término «falta», aunque el Código Penal suprimió las faltas en 2015 y hoy distingue delitos graves, menos graves y leves"],
      ],
      preguntas: [
        ["media", "Si un menor cumple 18 años durante el cumplimiento de una medida…", ["Continúa cumpliéndola hasta alcanzar los objetivos", "Queda extinguida", "Pasa automáticamente a prisión"], "Art. 14.1."],
        ["dificil", "Si el internamiento en régimen cerrado no ha terminado al cumplir 21 años, como regla general…", ["Se ordena su cumplimiento en centro penitenciario", "Se extingue", "Se convierte en libertad vigilada"], "Art. 14.3."],
        ["media", "Un delito menos grave cometido por un menor prescribe…", ["Al año", "A los tres años", "A los cinco años"], "Art. 15.1.4.º."],
        ["media", "La amonestación prescribe…", ["Al año", "A los dos años", "A los tres años"], "Art. 15.2."],
        ["media", "¿Quién puede modificar la medida impuesta?", ["El juez competente para la ejecución, por auto motivado", "El director del centro", "La policía"], "Art. 13."],
        ["dificil", "Un delito grave con pena superior a diez años cometido por un menor prescribe…", ["A los cinco años", "Al año", "Según el Código Penal en todo caso"], "Art. 15.1.2.º."],
      ],
    },
  ],
  glosario: [
    [S1, "Juez de Menores", "Órgano judicial especializado competente para los hechos cometidos por mayores de 14 y menores de 18 años."],
    [S1, "Entidad pública de protección de menores", "Administración autonómica que asume la protección de los menores, también de los menores de 14 años que cometen hechos delictivos."],
    [S2, "Libertad vigilada", "Medida de seguimiento del menor con pautas socioeducativas y reglas de conducta."],
    [S2, "Amonestación", "Reprensión del juez al menor; la medida menos restrictiva."],
    [S2, "Principio acusatorio", "Prohibición de imponer una medida más grave que la solicitada por la acusación."],
    [S3, "Equipo técnico", "Profesionales que informan al juez sobre la situación del menor y la medida adecuada."],
    [S3, "Extrema gravedad", "Supuesto agravado del art. 10.1.b); se aprecia siempre en caso de reincidencia."],
    [S4, "Prescripción", "Extinción de la posibilidad de perseguir el hecho o de ejecutar la medida por el paso del tiempo."],
  ],
  casos: [
    {
      slug: "caso-robo-movil-grupo-menores",
      titulo: "Un robo cometido por un grupo de menores",
      supuesto: "La Policía Local detiene a tres jóvenes que, en grupo, han intimidado a otro chico en un parque para quitarle el móvil. Uno tiene 13 años, otro 15 y el tercero 17. El de 17 ya había sido condenado antes por un hecho similar. Los agentes informan a la Fiscalía de Menores.",
      preguntas: [
        [S1, "media", "Respecto del joven de 13 años…", ["No se le exige responsabilidad con la LO 5/2000 y se aplican las normas de protección", "Se le aplica la LO 5/2000", "Responde como adulto"], "Art. 3."],
        [S1, "media", "¿Quién dirige la investigación de los hechos de los de 15 y 17 años?", ["El Ministerio Fiscal, con la policía judicial", "La Policía Local por sí sola", "El Juez de Instrucción"], "Art. 6."],
        [S3, "media", "Como el robo es con intimidación y en grupo, cabe…", ["Internamiento en régimen cerrado", "Solo amonestación", "Solo prestaciones en beneficio de la comunidad"], "Art. 9.2.b) y c)."],
        [S3, "media", "Para el de 15 años, la medida puede alcanzar…", ["Tres años", "Seis años", "Dos años"], "Art. 10.1.a)."],
        [S3, "dificil", "Para el de 17 años, al ser reincidente, el caso se considera…", ["De extrema gravedad: internamiento cerrado de uno a seis años más libertad vigilada", "Ordinario", "Leve"], "Art. 10.1.b)."],
        [S2, "media", "Si el juez decide imponer libertad vigilada, una regla de conducta posible es…", ["La obligación de asistir regularmente al centro docente", "La prisión de fin de semana en comisaría", "Una multa a los padres"], "Art. 7.1.h).1.ª."],
        [S2, "media", "Para proteger a la víctima, el juez puede imponer…", ["La prohibición de aproximarse o comunicarse con ella", "La expulsión del barrio", "Nada"], "Art. 7.1.i)."],
        [S1, "media", "¿Qué juez será competente?", ["El Juez de Menores de Zaragoza, lugar de los hechos", "El del domicilio de los padres", "El de Madrid"], "Art. 2.3."],
        [S2, "dificil", "Si el Fiscal pide 1 año de internamiento semiabierto, ¿puede el juez imponer 2 años de cerrado?", ["No, por el principio acusatorio", "Sí", "Solo si la víctima lo pide"], "Art. 8."],
        [S4, "media", "Si el de 17 cumple 18 años durante la medida…", ["Continúa cumpliéndola", "Queda libre", "Pasa a prisión automáticamente"], "Art. 14.1."],
      ],
    },
    {
      slug: "caso-menor-ciclomotor-alcohol",
      titulo: "Un menor en ciclomotor tras beber",
      supuesto: "Un menor de 16 años es interceptado conduciendo un ciclomotor con una tasa de alcohol superior a la penal. Al ser trasladado, se observa que tiene un problema de consumo de alcohol habitual. Sus padres piden que se le ayude con un tratamiento.",
      preguntas: [
        [S1, "facil", "¿Se le puede exigir responsabilidad con la LO 5/2000?", ["Sí, porque tiene entre 14 y 17 años", "No", "Solo civil"], "Art. 1.1."],
        [S2, "media", "Una medida adecuada a su problema de alcohol, sin internamiento, es…", ["Tratamiento ambulatorio", "Internamiento cerrado", "Amonestación"], "Art. 7.1.e)."],
        [S2, "media", "Como el delito se cometió con un ciclomotor, puede imponerse como accesoria…", ["La privación del permiso de conducir ciclomotores o del derecho a obtenerlo", "La inhabilitación absoluta", "La convivencia con otra familia"], "Art. 7.1.n)."],
        [S2, "media", "Si rechazara el tratamiento de deshabituación…", ["El juez le aplicaría otra medida adecuada", "Se le obligaría por la fuerza", "Quedaría libre de toda medida"], "Art. 7.1.e)."],
        [S3, "media", "¿Cabe internamiento cerrado si el hecho es un delito menos grave sin violencia ni grave riesgo ni grupo?", ["No", "Sí, siempre", "Solo si tiene 16 años"], "Art. 9.2."],
        [S2, "dificil", "El tratamiento ambulatorio, ¿puede aplicarse como complemento de otra medida?", ["Sí", "No", "Solo con internamiento"], "Art. 7.1.e)."],
        [S2, "media", "El juez elige la medida atendiendo, especialmente, a…", ["La edad, circunstancias familiares y sociales, personalidad e interés del menor", "Solo a la gravedad del hecho", "La opinión de la policía"], "Art. 7.3."],
        [S4, "media", "Si se considera delito menos grave, prescribe…", ["Al año", "A los tres meses", "A los cinco años"], "Art. 15.1.4.º."],
        [S2, "media", "Las prestaciones en beneficio de la comunidad requieren…", ["El consentimiento del menor", "El consentimiento de la policía", "Nada"], "Art. 7.1.k)."],
        [S1, "dificil", "Si concurriera en él una eximente del art. 20.2 CP (intoxicación plena), se le podrían aplicar…", ["Solo las medidas terapéuticas del art. 7.1.d) y e)", "Ninguna medida", "Internamiento cerrado ordinario"], "Arts. 5.2 y 9.5."],
      ],
    },
    {
      slug: "caso-agresion-sexual-menor-instituto",
      titulo: "Una agresión sexual entre adolescentes",
      supuesto: "Una alumna de 15 años denuncia que un compañero de 17 la agredió sexualmente en el baño del instituto. La víctima está muy afectada y teme encontrarse con él en clase. La familia quiere personarse en el expediente.",
      preguntas: [
        [S1, "media", "¿Puede la familia de la víctima personarse en el expediente?", ["Sí, las víctimas tienen derecho a personarse y ser parte", "No", "Solo el Fiscal"], "Art. 4."],
        [S1, "media", "La declaración de la víctima menor de edad se garantizará especialmente…", ["De forma telemática, salvo que se estime necesaria su presencia", "Siempre presencial ante el agresor", "Por escrito"], "Art. 4."],
        [S2, "media", "Para que no coincida con él, el juez puede imponer…", ["La prohibición de aproximarse o comunicarse con la víctima, incluido su centro docente", "Nada", "Una multa"], "Art. 7.1.i)."],
        [S2, "dificil", "Por ser un delito del Capítulo I o II del Título VIII CP, el juez impondrá en todo caso como accesoria…", ["La obligación de seguir programas de educación sexual y en igualdad", "La inhabilitación absoluta", "La privación del permiso"], "Art. 7.5."],
        [S3, "dificil", "Si el hecho fuera una violación con violencia (art. 179 CP, incluido en el art. 10.2), al tener 17 años la medida sería…", ["Internamiento cerrado de uno a ocho años más libertad vigilada de hasta cinco", "Libertad vigilada hasta dos años", "Amonestación"], "Art. 10.2.b)."],
        [S4, "media", "¿Puede dejarse sin efecto la medida sin acreditar que cumplió los programas de educación sexual?", ["No", "Sí", "Solo si pasa un año"], "Art. 13.1."],
        [S3, "media", "En el caso del art. 10.2.b), ¿cuándo pueden modificarse o suspenderse las medidas?", ["Cuando haya transcurrido al menos la mitad del internamiento impuesto", "En cualquier momento", "Nunca"], "Art. 10.2.b)."],
        [S1, "media", "¿Adónde debe derivar el Letrado de la Administración de Justicia a la víctima de violencia?", ["A la Oficina de Atención a la Víctima competente", "Al centro de salud", "A la comisaría"], "Art. 4, párrafo segundo."],
        [S4, "media", "La violación (art. 179 CP) cometida por un menor prescribe…", ["Con arreglo a las normas del Código Penal", "Al año", "A los tres meses"], "Art. 15.1.1.º."],
        [S1, "media", "¿A quién corresponde velar por los derechos de las víctimas?", ["Al Ministerio Fiscal y al Juez de Menores", "Solo a la policía", "Al instituto"], "Art. 4."],
      ],
    },
  ],
});
