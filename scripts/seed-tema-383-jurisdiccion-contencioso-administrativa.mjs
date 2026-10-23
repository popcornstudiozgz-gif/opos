/**
 * Crea tema-383 — Tema 11 de Administrativo DGA (tema 6 del programa de
 * materias específicas): "La jurisdicción contencioso-administrativa. Su
 * organización. Las partes. Actos impugnables. Idea general del proceso."
 *
 * Fuente (texto consolidado leído en esta sesión en la API del BOE):
 * - Ley 29/1998, reguladora de la Jurisdicción Contencioso-administrativa
 *   (BOE-A-1998-16718): arts. 1-3 (ámbito), 6, 8 y 10-13 (órganos y
 *   competencia), 18-21 y 23 (capacidad, legitimación, demandados,
 *   representación y defensa), 25-32 y 43-44 (objeto del recurso y
 *   pretensiones; lesividad; litigios entre Administraciones), 45-46, 48,
 *   51-52, 54, 56, 60, 62 y 67-71 (procedimiento ordinario y sentencia), 78
 *   (abreviado), 129-130 y 135 (medidas cautelares) y 139 (costas).
 * Se trata en "idea general", como pide el programa: no se desarrollan los
 * recursos de apelación y casación ni la ejecución de sentencias más allá
 * de su mención.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-383-jurisdiccion-contencioso-administrativa.mjs
 */
import { sembrarTema, ADMIN_DGA } from "./lib/sembrar-tema.mjs";

const LJCA = "https://www.boe.es/buscar/act.php?id=BOE-A-1998-16718";
const S1 = "ambito-jurisdiccion-contenciosa";
const S2 = "organizacion-competencia-organos";
const S3 = "partes-legitimacion-representacion";
const S4 = "actos-impugnables-pretensiones";
const S5 = "proceso-idea-general";

await sembrarTema({
  tema: {
    slug: "tema-383",
    titulo: "La jurisdicción contencioso-administrativa: ámbito, organización, partes, actos impugnables e idea general del proceso",
    descripcion: "Ámbito del orden contencioso-administrativo y materias excluidas (Ley 29/1998). Órganos: Juzgados, Juzgados Centrales, Salas de los Tribunales Superiores de Justicia, Audiencia Nacional y Tribunal Supremo, y reparto de competencias respecto de la Administración de la Comunidad Autónoma. Las partes: capacidad, legitimación, demandados, representación y defensa. Actividad impugnable: disposiciones, actos, inactividad y vía de hecho; recurso indirecto y cuestión de ilegalidad; pretensiones. Idea general del proceso ordinario y del abreviado: interposición y plazos, expediente, demanda y contestación, prueba, conclusiones, sentencia, medidas cautelares y costas.",
    contenido: "Qué jueces revisan lo que hace la Administración, cómo se reparten los asuntos entre el juzgado de lo contencioso de Zaragoza, el Tribunal Superior de Justicia de Aragón y los tribunales de Madrid, quién puede recurrir y con qué abogado, qué se puede impugnar (incluida la pasividad de la Administración o una actuación sin cobertura legal) y cómo se desarrolla un pleito: desde el escrito inicial y los plazos de dos o seis meses hasta la sentencia y las costas.",
    enlaces_boe: [
      { url: LJCA, titulo: "Ley 29/1998, de 13 de julio, reguladora de la Jurisdicción Contencioso-administrativa (BOE-A-1998-16718)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "Ámbito del orden contencioso-administrativo", articulos: "arts. 1-3", url: `${LJCA}#a1` },
      { seccion: S2, titulo: "Órganos y distribución de competencias", articulos: "arts. 6, 8 y 10-13", url: `${LJCA}#a6` },
      { seccion: S3, titulo: "Las partes: capacidad, legitimación y postulación", articulos: "arts. 18-21 y 23", url: `${LJCA}#a18` },
      { seccion: S4, titulo: "Actividad impugnable y pretensiones", articulos: "arts. 25-32 y 43-44", url: `${LJCA}#a25` },
      { seccion: S5, titulo: "Idea general del proceso", articulos: "arts. 45-71, 78, 129-135 y 139", url: `${LJCA}#a45` },
    ],
  },
  vinculo: { oposicion: ADMIN_DGA.oposicion, bloqueId: ADMIN_DGA.bloqueDerecho, numero: 11 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Objeto del orden contencioso (art. 1.1 LJCA)", "Pretensiones sobre la actuación de las Administraciones sujeta al Derecho Administrativo, las disposiciones generales de rango inferior a la ley y los decretos legislativos que excedan la delegación"],
        ["Administraciones públicas a efectos de la LJCA (art. 1.2)", "AGE, Administraciones de las CCAA, entidades locales y entidades de Derecho público dependientes o vinculadas"],
        ["Actos de órganos constitucionales (art. 1.3)", "También los actos de personal, administración y gestión patrimonial de Congreso, Senado, TC, Tribunal de Cuentas, Defensor del Pueblo, parlamentos autonómicos e instituciones análogas"],
        ["Actos del Gobierno (art. 2.a)", "Protección de derechos fundamentales, elementos reglados e indemnizaciones respecto de los actos del Gobierno o de los Consejos de Gobierno autonómicos, cualquiera que sea su naturaleza"],
        ["Contratos (art. 2.b)", "Contratos administrativos y actos de preparación y adjudicación de los demás contratos sujetos a la legislación de contratación"],
        ["Responsabilidad patrimonial (art. 2.e)", "Corresponde siempre al contencioso, aunque concurran particulares o haya seguro; no puede demandarse a la Administración por ello en lo civil o social"],
        ["Excluido del contencioso (art. 3)", "Lo atribuido a los órdenes civil, penal y social; el contencioso-disciplinario militar; los conflictos de jurisdicción y de atribuciones; y las Normas Forales fiscales vascas"],
      ],
      preguntas: [
        ["media", "¿De qué conoce el orden contencioso-administrativo respecto de los decretos legislativos?", ["De los que excedan los límites de la delegación", "De todos ellos en cualquier caso", "De ninguno; solo los controla el Tribunal Constitucional", "Solo de los autonómicos"], "Art. 1.1 LJCA."],
        ["media", "Una reclamación de responsabilidad patrimonial contra el Gobierno de Aragón en la que también es responsable una empresa privada se conoce por:", ["La jurisdicción contencioso-administrativa", "La jurisdicción civil", "La jurisdicción social", "El Tribunal de Cuentas"], "Art. 2.e) LJCA."],
        ["media", "¿Cuál de estas cuestiones NO corresponde al orden contencioso-administrativo?", ["Los conflictos de atribuciones entre órganos de una misma Administración", "Los actos de preparación de un contrato administrativo", "Los actos de una Corporación de Derecho público en ejercicio de funciones públicas", "La responsabilidad patrimonial de la Administración"], "Art. 3.c) LJCA."],
        ["dificil", "Respecto de los actos del Consejo de Gobierno de una Comunidad Autónoma, el contencioso conoce, cualquiera que sea su naturaleza, de:", ["La protección de los derechos fundamentales, los elementos reglados y las indemnizaciones", "Solo de su oportunidad política", "Nada, son actos políticos inmunes", "Solo de los que son reglamentos"], "Art. 2.a) LJCA."],
        ["media", "Los actos en materia de personal de las Cortes de Aragón son revisables por:", ["La jurisdicción contencioso-administrativa", "La propia Mesa sin control judicial", "El Tribunal Constitucional en exclusiva", "La jurisdicción social"], "Art. 1.3.a) y art. 10.1.c) LJCA."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Órganos del orden contencioso (art. 6 LJCA)", "Juzgados de lo Contencioso-administrativo, Juzgados Centrales, Salas de lo Contencioso de los TSJ, Sala de la Audiencia Nacional y Sala del Tribunal Supremo"],
        ["Juzgados y Administración autonómica (art. 8.2)", "Conocen de actos de la Administración de la CA (no del Consejo de Gobierno) sobre personal (salvo nacimiento o extinción de la relación de funcionarios de carrera), sanciones de hasta 60.000 € y responsabilidad patrimonial de hasta 30.050 €"],
        ["Juzgados y entidades locales (art. 8.1)", "Conocen de los actos de las entidades locales, salvo la impugnación de instrumentos de planeamiento urbanístico"],
        ["Autorización de entrada en domicilio (art. 8.6)", "Los Juzgados autorizan la entrada en domicilios cuando sea necesaria para la ejecución forzosa de actos administrativos"],
        ["Salas de los TSJ (art. 10.1)", "Actos de CCAA y entidades locales no atribuidos a los Juzgados, disposiciones generales autonómicas y locales, resoluciones de los TEAR, convenios entre Administraciones de su territorio y actos de órganos de contratos autonómicos"],
        ["TSJ en segunda instancia (art. 10.2)", "Conocen de las apelaciones contra sentencias y autos de los Juzgados de lo Contencioso-administrativo"],
        ["Audiencia Nacional (art. 11)", "Disposiciones y actos de Ministros y Secretarios de Estado, convenios no atribuidos a los TSJ, actos del TEAC y del Tribunal Administrativo Central de Recursos Contractuales"],
        ["Tribunal Supremo (art. 12)", "Actos y disposiciones del Consejo de Ministros, Comisiones Delegadas, CGPJ y Fiscal General; actos de personal de órganos constitucionales; recursos de casación"],
        ["Criterio de prevalencia (art. 13.c)", "Salvo disposición en contrario, la competencia por razón de la materia prevalece sobre la fijada por razón del órgano autor del acto"],
      ],
      preguntas: [
        ["media", "Un funcionario del Gobierno de Aragón recurre la denegación de un permiso. ¿Qué órgano judicial es competente?", ["Un Juzgado de lo Contencioso-administrativo", "La Sala de lo Contencioso del TSJ de Aragón", "La Audiencia Nacional", "El Tribunal Supremo"], "Art. 8.2.a) LJCA: cuestiones de personal que no afectan al nacimiento o extinción de la relación de servicio."],
        ["dificil", "La impugnación de un decreto del Gobierno de Aragón que aprueba un reglamento corresponde a:", ["La Sala de lo Contencioso-administrativo del TSJ de Aragón", "Un Juzgado de lo Contencioso-administrativo", "La Audiencia Nacional", "El Tribunal Constitucional"], "Art. 10.1.b) LJCA: disposiciones generales de las CCAA."],
        ["media", "Una sanción impuesta por la Administración aragonesa consistente en una multa de 40.000 euros se recurre ante:", ["Un Juzgado de lo Contencioso-administrativo", "El TSJ de Aragón", "La Audiencia Nacional", "El Juzgado de lo Penal"], "Art. 8.2.b) LJCA: multas no superiores a 60.000 €."],
        ["media", "Las apelaciones contra sentencias de los Juzgados de lo Contencioso-administrativo de Aragón las resuelve:", ["La Sala de lo Contencioso-administrativo del TSJ de Aragón", "La Audiencia Provincial", "El Tribunal Supremo directamente", "La Audiencia Nacional"], "Art. 10.2 LJCA."],
        ["media", "Los actos del Consejo de Ministros se recurren ante:", ["La Sala de lo Contencioso-administrativo del Tribunal Supremo", "La Audiencia Nacional", "Los Juzgados Centrales", "El Tribunal Constitucional"], "Art. 12.1.a) LJCA."],
        ["media", "La reclamación de responsabilidad patrimonial de 50.000 euros frente a la Administración de la Comunidad Autónoma corresponde a:", ["La Sala de lo Contencioso-administrativo del TSJ", "Un Juzgado de lo Contencioso-administrativo", "La Audiencia Nacional", "Un Juzgado de Primera Instancia"], "Arts. 8.2.c) y 10.1.a) LJCA: los Juzgados solo hasta 30.050 €."],
        ["facil", "¿Cuál de estos NO es un órgano del orden contencioso-administrativo?", ["La Audiencia Provincial", "Los Juzgados Centrales de lo Contencioso-administrativo", "La Sala de lo Contencioso de la Audiencia Nacional", "La Sala de lo Contencioso de los TSJ"], "Art. 6 LJCA."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Capacidad procesal (art. 18 LJCA)", "La de la Ley de Enjuiciamiento Civil, más los menores para los derechos que pueden ejercer solos y, si la ley lo declara, grupos de afectados y entes sin personalidad"],
        ["Legitimación activa (art. 19.1.a)", "Las personas físicas o jurídicas que ostenten un derecho o interés legítimo"],
        ["Legitimación de Administraciones (art. 19.1.c-e)", "El Estado frente a actos autonómicos y locales; las CCAA frente a lo que afecte a su autonomía; las entidades locales frente a lo que afecte a la suya"],
        ["Acción popular (art. 19.1.h)", "Cualquier ciudadano, en los casos expresamente previstos por las leyes"],
        ["Lesividad (art. 19.2 y 43)", "La Administración autora puede impugnar su propio acto, previa declaración de lesividad"],
        ["No legitimados (art. 20)", "Los órganos de la propia Administración y sus miembros colegiados (salvo ley), los particulares que actúan por delegación de ella y sus entes dependientes respecto de la Administración matriz"],
        ["Parte demandada (art. 21)", "La Administración autora de la actividad recurrida, las personas cuyos derechos puedan quedar afectados por la estimación y las aseguradoras de la Administración"],
        ["Postulación (art. 23.1-2)", "Ante órganos unipersonales: procurador potestativo y abogado obligatorio; ante colegiados: procurador y abogado"],
        ["Funcionarios por sí mismos (art. 23.3)", "Pueden comparecer sin abogado ni procurador en defensa de sus derechos estatutarios, salvo cuestiones de separación de empleados inamovibles"],
      ],
      preguntas: [
        ["media", "Están legitimados ante el orden contencioso-administrativo, con carácter general:", ["Quienes ostenten un derecho o interés legítimo", "Solo los titulares de derechos subjetivos", "Cualquier persona en cualquier caso", "Solo las personas jurídicas"], "Art. 19.1.a) LJCA."],
        ["media", "¿Puede un órgano de la Administración de la Comunidad Autónoma recurrir en el contencioso un acto de esa misma Administración?", ["No, salvo que una ley lo autorice expresamente", "Sí, siempre", "Sí, si lo autoriza el consejero", "Sí, si es un órgano colegiado"], "Art. 20.a) LJCA."],
        ["media", "Ante un Juzgado de lo Contencioso-administrativo (órgano unipersonal), las partes:", ["Pueden conferir la representación a un procurador y deben estar asistidas por abogado", "Deben actuar siempre con procurador y abogado", "No necesitan abogado", "Solo necesitan procurador"], "Art. 23.1 LJCA."],
        ["dificil", "Un funcionario del Gobierno de Aragón que recurre una cuestión de personal que no implica su separación del servicio:", ["Puede comparecer por sí mismo, sin abogado ni procurador", "Debe ir siempre con abogado", "Debe ser representado por el sindicato", "Necesita autorización del consejero"], "Art. 23.3 LJCA."],
        ["media", "Si el demandante funda su recurso en la ilegalidad de una disposición general, se considera también demandada:", ["La Administración autora de la disposición, aunque no sea la autora del acto", "Solo la Administración que dictó el acto", "El Consejo de Estado", "El Ministerio Fiscal"], "Art. 21.4 LJCA."],
        ["media", "La acción popular en el contencioso-administrativo puede ejercerse:", ["En los casos expresamente previstos por las leyes", "En cualquier caso", "Nunca", "Solo por asociaciones"], "Art. 19.1.h) LJCA."],
        ["media", "Las aseguradoras de las Administraciones públicas en un recurso sobre responsabilidad patrimonial son:", ["Siempre parte codemandada junto a la Administración asegurada", "Terceros sin intervención", "Demandantes", "Coadyuvantes voluntarios"], "Art. 21.1.c) LJCA."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Actividad impugnable (art. 25.1 LJCA)", "Disposiciones generales y actos expresos y presuntos que pongan fin a la vía administrativa, definitivos o de trámite cualificados"],
        ["Inactividad y vía de hecho (art. 25.2)", "También son impugnables la inactividad de la Administración y sus actuaciones materiales constitutivas de vía de hecho"],
        ["Recurso indirecto (art. 26)", "Se pueden impugnar los actos de aplicación de una disposición alegando que esta no es conforme a Derecho, aunque no se recurriera directamente"],
        ["Cuestión de ilegalidad (art. 27)", "Si un juez anula un acto por la ilegalidad del reglamento aplicado y no es competente para el recurso directo contra este, la plantea ante el tribunal que lo sea"],
        ["Actos no impugnables (art. 28)", "Los que reproducen otros anteriores definitivos y firmes y los confirmatorios de actos consentidos por no recurridos en tiempo y forma"],
        ["Inactividad prestacional (art. 29.1)", "Si la Administración debe una prestación concreta, se le reclama y, si en tres meses no la cumple o no hay acuerdo, cabe recurso"],
        ["Inejecución de actos firmes (art. 29.2)", "Se pide la ejecución y, si no se produce en un mes, cabe recurso por el procedimiento abreviado"],
        ["Vía de hecho (art. 30)", "Puede requerirse su cese; si no se atiende en 10 días (o sin requerimiento), cabe recurso directo"],
        ["Pretensiones (art. 31)", "Declaración de no conformidad a Derecho y anulación; reconocimiento de una situación jurídica individualizada y su restablecimiento, incluida la indemnización"],
        ["Litigios entre Administraciones (art. 44)", "No cabe recurso administrativo; la Administración puede requerir previamente a la otra en dos meses; el requerimiento se entiende rechazado si no se contesta en un mes"],
      ],
      preguntas: [
        ["media", "¿Qué actos son, en general, impugnables ante la jurisdicción contencioso-administrativa?", ["Los que ponen fin a la vía administrativa, expresos o presuntos, definitivos o de trámite cualificados", "Todos los actos de trámite", "Solo los actos expresos", "Solo las disposiciones generales"], "Art. 25.1 LJCA."],
        ["media", "Un ciudadano no recurrió un reglamento en su día, pero ahora se le aplica en una resolución. Puede:", ["Recurrir la resolución alegando la ilegalidad del reglamento (recurso indirecto)", "Nada, porque el reglamento es firme", "Solo pedir al Gobierno que lo derogue", "Acudir directamente al Tribunal Constitucional"], "Art. 26 LJCA."],
        ["dificil", "Si la Administración no ejecuta un acto firme a favor de un ciudadano, este puede recurrir en el contencioso si, tras pedir la ejecución, esta no se produce en:", ["Un mes", "Tres meses", "Diez días", "Seis meses"], "Art. 29.2 LJCA (se tramita por el procedimiento abreviado)."],
        ["media", "Frente a una vía de hecho, el interesado puede requerir su cese y, si no se atiende en el plazo de ____, interponer recurso:", ["Diez días", "Un mes", "Tres meses", "Veinte días hábiles"], "Art. 30 LJCA."],
        ["media", "NO es admisible el recurso contencioso contra:", ["Los actos confirmatorios de otros consentidos por no haber sido recurridos en tiempo y forma", "Los actos presuntos", "La inactividad de la Administración", "Las disposiciones generales"], "Art. 28 LJCA."],
        ["media", "En un litigio entre el Gobierno de Aragón y un ayuntamiento, antes del recurso contencioso:", ["No cabe recurso administrativo, aunque puede hacerse un requerimiento previo", "Debe interponerse recurso de alzada", "Debe pedirse dictamen al Consejo de Estado", "Debe acudirse a la Comisión Bilateral"], "Art. 44.1 LJCA."],
        ["media", "Además de la anulación del acto, el demandante puede pretender:", ["El reconocimiento de una situación jurídica individualizada y la indemnización de daños y perjuicios", "La sanción penal del funcionario", "La redacción de un nuevo reglamento por el juez", "El cese del consejero"], "Arts. 31 y 71.2 LJCA."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["Escrito de interposición (art. 45.1 LJCA)", "Se reduce a citar la disposición, acto, inactividad o vía de hecho y pedir que se tenga por interpuesto el recurso"],
        ["Plazo general (art. 46.1)", "Dos meses desde la publicación o notificación del acto expreso que ponga fin a la vía administrativa; seis meses si es presunto"],
        ["Plazos especiales (art. 46.3-5)", "Vía de hecho: 10 días tras el requerimiento o 20 días sin él; lesividad: dos meses desde la declaración"],
        ["Remisión del expediente (art. 48.3)", "La Administración debe remitirlo en el plazo improrrogable de 20 días, en soporte electrónico, foliado y con índice"],
        ["Demanda y contestación (arts. 52 y 54)", "Recibido el expediente, el recurrente formula la demanda en 20 días; los demandados contestan en otros 20 días"],
        ["Contenido de demanda y contestación (art. 56.1)", "Hechos, fundamentos de Derecho y pretensiones, pudiendo alegar motivos planteados o no ante la Administración"],
        ["Prueba (art. 60)", "Se pide por otrosí; se abre si hay disconformidad en hechos relevantes (siempre en sanciones); plazo de 30 días"],
        ["Vista o conclusiones (art. 62)", "Las partes pueden pedir vista, conclusiones escritas o que el pleito quede concluso para sentencia"],
        ["Sentencia (arts. 67-70)", "En 10 días desde que el pleito queda concluso; inadmisibilidad, estimación o desestimación; estima si hay infracción del ordenamiento, incluida la desviación de poder"],
        ["Límite de la sentencia (art. 71.2)", "El juez no puede redactar los preceptos de un reglamento anulado ni fijar el contenido discrecional de un acto anulado"],
        ["Procedimiento abreviado (art. 78)", "Ante Juzgados, para personal, extranjería, asilo, dopaje y asuntos de cuantía no superior a 30.000 €: se inicia por demanda y se resuelve en una vista"],
        ["Medidas cautelares (arts. 129-130)", "En cualquier estado del proceso; solo si la ejecución puede hacer perder su finalidad legítima al recurso, ponderando los intereses en conflicto"],
        ["Medidas cautelarísimas (art. 135)", "Por especial urgencia, el juez puede decidir en dos días sin oír a la otra parte"],
        ["Costas (art. 139.1)", "En primera o única instancia, a quien vea rechazadas todas sus pretensiones, salvo serias dudas de hecho o de derecho; en estimación parcial, cada parte las suyas"],
      ],
      preguntas: [
        ["facil", "El plazo para interponer recurso contencioso-administrativo contra un acto expreso que pone fin a la vía administrativa es de:", ["Dos meses", "Un mes", "Seis meses", "Tres meses"], "Art. 46.1 LJCA."],
        ["media", "Si el acto es presunto, el plazo es de:", ["Seis meses desde que se produce el acto presunto", "Dos meses", "Un año", "No hay plazo"], "Art. 46.1 LJCA."],
        ["media", "Si se interpuso recurso potestativo de reposición, el plazo del contencioso se cuenta:", ["Desde que se notifica su resolución expresa o debe entenderse desestimado", "Desde la notificación del acto inicial", "Desde que el interesado lo decida", "Desde la publicación en el BOA"], "Art. 46.4 LJCA."],
        ["media", "La Administración demandada debe remitir el expediente administrativo al juzgado en el plazo improrrogable de:", ["Veinte días", "Diez días", "Un mes", "Dos meses"], "Art. 48.3 LJCA."],
        ["media", "En el procedimiento ordinario, el demandante formula la demanda en el plazo de:", ["Veinte días desde que se le entrega el expediente", "Dos meses", "Diez días", "Un mes"], "Art. 52.1 LJCA."],
        ["dificil", "Si el objeto del recurso es una sanción administrativa y existe disconformidad en los hechos, el proceso:", ["Se recibirá siempre a prueba", "No se recibe a prueba", "Solo se recibe a prueba si lo pide el juez", "Se resuelve sin vista ni prueba"], "Art. 60.3 LJCA."],
        ["media", "Se tramitan por el procedimiento abreviado, entre otros, los asuntos de los Juzgados cuya cuantía no supere:", ["30.000 euros", "60.000 euros", "6.000 euros", "100.000 euros"], "Art. 78.1 LJCA."],
        ["media", "Una medida cautelar solo puede acordarse cuando:", ["La ejecución del acto pueda hacer perder su finalidad legítima al recurso", "Lo pida cualquier parte, sin más", "El acto sea nulo de pleno derecho", "Lo autorice la Administración demandada"], "Art. 130.1 LJCA."],
        ["media", "En primera instancia, si se rechazan todas las pretensiones del demandante, las costas se imponen:", ["A él, salvo que el caso presentara serias dudas de hecho o de derecho", "Siempre a la Administración", "Por mitad", "Nunca hay costas en el contencioso"], "Art. 139.1 LJCA."],
      ],
    },
  ],
  glosario: [
    [S1, "Orden jurisdiccional", "Cada una de las ramas en que se divide el Poder Judicial según la materia: civil, penal, contencioso-administrativo y social."],
    [S2, "Tribunal Superior de Justicia", "Órgano que culmina la organización judicial en el territorio de una Comunidad Autónoma; su Sala de lo Contencioso controla, entre otros, los reglamentos autonómicos."],
    [S3, "Legitimación", "Relación de una persona con el objeto del pleito (derecho o interés legítimo) que le permite ser parte en él."],
    [S3, "Postulación", "Representación y defensa de las partes en el proceso, a cargo de procurador y abogado."],
    [S4, "Vía de hecho", "Actuación material de la Administración sin el acto o el procedimiento que deberían darle cobertura jurídica."],
    [S4, "Recurso indirecto", "Impugnación de un acto de aplicación de un reglamento fundada en la ilegalidad de este."],
    [S4, "Cuestión de ilegalidad", "Trámite por el que el juez que anuló un acto por la ilegalidad del reglamento aplicado lo plantea al tribunal competente para anular el reglamento con efectos generales."],
    [S5, "Expediente administrativo", "Conjunto de documentos del procedimiento que la Administración debe remitir al juzgado para que las partes y el juez conozcan los antecedentes."],
    [S5, "Medida cautelar", "Decisión provisional del juez (como la suspensión del acto) para que la futura sentencia no quede sin efecto."],
    [S5, "Costas procesales", "Gastos del pleito (abogado, procurador, peritos) que el juez puede imponer a la parte que pierde."],
  ],
  casos: [
    {
      slug: "funcionaria-recurre-concurso",
      titulo: "Una funcionaria recurre una decisión de personal",
      supuesto: "Una funcionaria del Gobierno de Aragón ve desestimado expresamente su recurso de alzada contra la denegación de una reducción de jornada. La resolución se le notifica el 3 de junio. Quiere ir a los tribunales sin gastar mucho dinero y teme que, mientras tanto, se le apliquen los efectos de la denegación.",
      preguntas: [
        [S4, "media", "¿Puede recurrir ya ante los tribunales?", ["Sí, la resolución del recurso de alzada pone fin a la vía administrativa", "No, antes debe interponer reposición", "No, debe esperar seis meses", "Solo si el consejero lo autoriza"], "Art. 25.1 LJCA y art. 60.1.c) Ley 5/2021."],
        [S2, "media", "El órgano judicial competente será:", ["Un Juzgado de lo Contencioso-administrativo", "La Sala de lo Contencioso del TSJ de Aragón", "La Audiencia Nacional", "Un Juzgado de lo Social"], "Art. 8.2.a) LJCA: cuestión de personal que no afecta al nacimiento o extinción de la relación de servicio."],
        [S5, "media", "El plazo para interponer el recurso contencioso es de:", ["Dos meses desde el día siguiente a la notificación", "Un mes", "Seis meses", "Veinte días"], "Art. 46.1 LJCA."],
        [S5, "media", "Al ser una cuestión de personal, el recurso se tramitará por el procedimiento:", ["Abreviado, iniciado por demanda y con vista", "Ordinario en todo caso", "Especial de derechos fundamentales", "De casación"], "Art. 78.1 LJCA."],
        [S3, "dificil", "Para reducir gastos, ¿puede comparecer sin abogado ni procurador?", ["Sí, los funcionarios pueden comparecer por sí mismos en defensa de sus derechos estatutarios que no impliquen separación", "No, el abogado es siempre obligatorio", "Solo con procurador", "Solo si gana menos de cierto salario"], "Art. 23.3 LJCA."],
        [S3, "media", "En ese caso, estará obligada a:", ["Usar los sistemas electrónicos para presentar escritos y recibir notificaciones", "Presentar todo en papel", "Pagar una tasa especial", "Ir acompañada de un sindicato"], "Art. 23.3, segundo párrafo, LJCA."],
        [S5, "media", "Para evitar los efectos de la denegación mientras dura el pleito puede pedir:", ["Una medida cautelar", "La revisión de oficio", "Un recurso extraordinario de revisión", "La lesividad"], "Arts. 129-130 LJCA."],
        [S5, "media", "Esa medida se concederá si:", ["La ejecución del acto pudiera hacer perder su finalidad legítima al recurso, ponderando los intereses", "Lo pide por escrito, sin más requisitos", "Lo acepta la Administración", "El acto es de trámite"], "Art. 130.1 LJCA."],
        [S3, "media", "En el pleito, la parte demandada será:", ["La Administración de la Comunidad Autónoma de Aragón", "El jefe de servicio personalmente", "El sindicato", "El Justicia de Aragón"], "Art. 21.1.a) LJCA."],
        [S5, "media", "Si pierde totalmente y no había serias dudas de hecho o de derecho, el juez:", ["Le impondrá las costas", "Repartirá las costas por mitad", "Impondrá las costas a la Administración", "No puede imponer costas en asuntos de personal"], "Art. 139.1 LJCA."],
      ],
    },
    {
      slug: "obras-sin-procedimiento-via-hecho",
      titulo: "Unas obras sin expediente",
      supuesto: "Operarios de una empresa contratada por la Administración autonómica ocupan parte de una finca privada para ampliar un camino, sin que exista expediente de expropiación ni resolución alguna. El propietario quiere que paren y que le indemnicen. Además, una asociación ecologista se plantea recurrir el decreto del Gobierno de Aragón que aprobó el plan de caminos.",
      preguntas: [
        [S4, "media", "La ocupación sin acto ni procedimiento que la ampare es:", ["Una vía de hecho", "Un acto presunto", "Una inactividad", "Un reglamento"], "Arts. 25.2 y 30 LJCA."],
        [S4, "media", "El propietario puede requerir a la Administración que cese y, si no lo hace en el plazo de:", ["Diez días, recurrir directamente al contencioso", "Un mes, presentar alzada", "Tres meses, ir al juzgado civil", "Seis meses, reclamar al Justicia"], "Art. 30 LJCA."],
        [S5, "dificil", "Si el requerimiento no se atiende, el plazo para interponer el recurso es de:", ["Diez días desde que termina el plazo del requerimiento", "Dos meses", "Seis meses", "Veinte días hábiles desde la ocupación, en todo caso"], "Art. 46.3 LJCA."],
        [S5, "media", "Si no hubiera hecho requerimiento, el plazo sería de:", ["Veinte días desde que se inició la vía de hecho", "Diez días", "Dos meses", "Un año"], "Art. 46.3 LJCA."],
        [S4, "media", "En su recurso puede pretender:", ["Que se declare contraria a Derecho, que cese y que se le indemnice", "Solo que cese", "Solo una indemnización civil", "La sanción de los operarios"], "Arts. 31.2 y 32.2 LJCA."],
        [S5, "media", "Por la especial urgencia, puede pedir una medida cautelar que el juez decide:", ["En dos días, sin oír a la otra parte", "En un mes, con vista", "Tras la sentencia", "Solo con informe del Fiscal"], "Art. 135.1 LJCA."],
        [S2, "dificil", "El recurso de la asociación contra el decreto del Gobierno de Aragón que aprueba el plan (disposición general) lo conoce:", ["La Sala de lo Contencioso-administrativo del TSJ de Aragón", "Un Juzgado de lo Contencioso-administrativo", "La Audiencia Nacional", "El Tribunal Supremo"], "Art. 10.1.b) LJCA."],
        [S3, "media", "La asociación estará legitimada si:", ["Resulta afectada o está legalmente habilitada para defender los intereses colectivos en juego", "Tiene más de mil socios", "Se constituyó en Aragón", "Lo autoriza el Gobierno"], "Art. 19.1.b) LJCA."],
        [S3, "media", "Ante la Sala del TSJ (órgano colegiado), la asociación deberá actuar:", ["Representada por procurador y asistida por abogado", "Sin abogado", "Solo con abogado", "Por medio de su presidenta sin profesionales"], "Art. 23.2 LJCA."],
        [S5, "media", "Si la asociación quiere suspender la vigencia del decreto impugnado, debe pedirlo:", ["En el escrito de interposición o en el de demanda", "En cualquier momento después de la sentencia", "Al Consejo Consultivo", "En conclusiones"], "Art. 129.2 LJCA."],
      ],
    },
    {
      slug: "tramitacion-recurso-ordinario",
      titulo: "Seguir un recurso desde la Administración",
      supuesto: "Al servicio jurídico de un departamento llega la comunicación del TSJ de Aragón de que una empresa ha recurrido una orden de la consejera. La persona administrativa encargada debe preparar el envío del expediente y entender qué pasos vendrán después.",
      preguntas: [
        [S5, "media", "El expediente debe remitirse en el plazo improrrogable de:", ["Veinte días desde que la comunicación entra en el registro", "Dos meses", "Diez días hábiles desde la sentencia", "Un mes desde la demanda"], "Art. 48.3 LJCA."],
        [S5, "media", "El expediente se envía:", ["Completo, en soporte electrónico, foliado, autentificado y con índice", "En papel original, sin índice", "Solo los documentos favorables a la Administración", "Resumido por el jefe de servicio"], "Art. 48.4 LJCA."],
        [S5, "dificil", "Si no se envía completo tras la reiteración, el juez puede:", ["Imponer multas coercitivas a la autoridad o empleado responsable", "Archivar el recurso", "Dar la razón automáticamente a la Administración", "Suspender a la consejera"], "Art. 48.7 LJCA."],
        [S5, "media", "Recibido el expediente, la empresa presentará la demanda en:", ["Veinte días", "Dos meses", "Cinco días", "Un mes"], "Art. 52.1 LJCA."],
        [S5, "media", "La Administración contestará a la demanda en el plazo de:", ["Veinte días", "Un mes", "Diez días", "Dos meses"], "Art. 54.1 LJCA."],
        [S5, "media", "En la demanda, la empresa puede alegar:", ["Cualquier motivo, se hubiera planteado o no ante la Administración", "Solo los motivos alegados en vía administrativa", "Solo motivos de forma", "Solo hechos nuevos"], "Art. 56.1 LJCA."],
        [S5, "media", "Si la demanda no se presenta en plazo:", ["Se declara por auto la caducidad del recurso", "Se entiende estimado", "Se amplía el plazo automáticamente", "Se archiva sin efectos"], "Art. 52.2 LJCA."],
        [S5, "media", "La sentencia se dictará en el plazo de:", ["Diez días desde que el pleito queda concluso", "Un mes desde la demanda", "Tres meses desde la interposición", "Seis meses"], "Art. 67.1 LJCA."],
        [S5, "media", "Si la sentencia anula la orden por desviación de poder, la sentencia es:", ["Estimatoria", "De inadmisibilidad", "Desestimatoria", "Absolutoria"], "Art. 70.2 LJCA."],
        [S5, "dificil", "Si la orden anulada era discrecional, el tribunal:", ["No puede determinar el contenido discrecional del acto anulado", "Debe dictar la nueva orden", "Debe redactarla con la empresa", "Debe remitirla al Consejo Consultivo"], "Art. 71.2 LJCA."],
      ],
    },
  ],
});
