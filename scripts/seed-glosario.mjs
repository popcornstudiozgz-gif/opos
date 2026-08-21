/**
 * Glosario: términos curados (conceptos que puedan resultar complejos o
 * poco claros) para los 20 temas de auxiliar-administrativo, uno por
 * archivo — no, uno solo, a diferencia de las flashcards: el volumen es
 * mucho menor porque esto NO es cobertura exhaustiva párrafo a párrafo,
 * es una selección curada (criterio acordado con el usuario: "los que
 * necesiten una explicación porque puedan ser complejos", sin ruido).
 *
 * Cada término usa la MISMA `seccion` que ya se usó al etiquetar las
 * flashcards de ese tema (ver scripts/seed-flashcards-tema-*.mjs), así que
 * `tema_oposicion.secciones_incluidas` (ya establecido para cada tema)
 * filtra el glosario exactamente igual que filtra las flashcards, sin
 * tocar la tabla tema_oposicion en este script.
 *
 * Uso: node --env-file=.env.local scripts/seed-glosario.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

async function insertBatch(filas) {
  const res = await fetch(`${URL_BASE}/rest/v1/glosario`, { method: "POST", headers: { ...HEADERS, Prefer: "return=minimal" }, body: JSON.stringify(filas) });
  if (!res.ok) { console.error(`❌ ${res.status} ${await res.text()}`); process.exit(1); }
}

const t = (tema_slug, seccion, termino, definicion) => ({ tema_slug, seccion, termino, definicion });

const TERMINOS = [
  // ═══════════════ TEMA 1 — Constitución Española ═══════════════
  t("tema-1", "titulo-preliminar", "Estado social y democrático de Derecho",
    "Fórmula del art. 1.1 CE: España garantiza derechos y libertades (Estado de Derecho), promueve la igualdad real (Estado social) y basa su legitimidad en la voluntad popular (Estado democrático)."),
  t("tema-1", "titulo-preliminar", "Soberanía nacional",
    "Principio del art. 1.2 CE por el que el poder del Estado reside en el pueblo español, del que emanan todos los poderes."),
  t("tema-1", "titulo-preliminar", "Jerarquía normativa",
    "Principio del art. 9.3 CE que ordena la prelación de las normas (Constitución > leyes > reglamentos), de modo que la de rango inferior no puede contradecir a la superior."),
  t("tema-1", "titulo-preliminar", "Irretroactividad de disposiciones sancionadoras",
    "Garantía del art. 9.3 CE: las disposiciones sancionadoras no favorables o restrictivas de derechos individuales no se aplican a hechos anteriores a su entrada en vigor."),
  t("tema-1", "titulo-preliminar", "Interdicción de la arbitrariedad",
    "Principio del art. 9.3 CE que prohíbe que los poderes públicos actúen sin justificación objetiva o de forma caprichosa."),
  t("tema-1", "titulo-4", "Potestad reglamentaria",
    "Facultad del Gobierno (art. 97 CE) para dictar reglamentos, normas de rango inferior a la ley que la desarrollan o ejecutan."),
  t("tema-1", "titulo-4", "Moción de censura constructiva",
    "Mecanismo del art. 113 CE para exigir responsabilidad política al Gobierno: solo prospera si incluye un candidato alternativo a la Presidencia, que resulta investido si la moción se aprueba."),
  t("tema-1", "titulo-4", "Cuestión de confianza",
    "Instrumento del art. 112 CE por el que el Presidente del Gobierno somete su programa o una declaración de política general a la confianza del Congreso."),
  t("tema-1", "titulo-8-cap-1", "Autonomía (municipios, provincias, CCAA)",
    "Capacidad de autogobierno reconocida por el art. 137 CE para la gestión de los intereses respectivos; no equivale a soberanía."),
  t("tema-1", "titulo-8-cap-1", "Principio de solidaridad interterritorial",
    "Principio del art. 138 CE que obliga al Estado a garantizar un equilibrio económico adecuado entre las distintas partes del territorio español."),
  t("tema-1", "titulo-8-cap-2", "Suficiencia financiera",
    "Principio del art. 142 CE: las Haciendas locales deben disponer de medios suficientes para las funciones que la ley atribuye a las Corporaciones."),
  t("tema-1", "titulo-8-cap-2", "Autonomía local",
    "Derecho de los municipios y provincias a intervenir en cuantos asuntos afecten directamente al círculo de sus intereses, con plena personalidad jurídica propia (art. 140-141 CE)."),

  // ═══════════════ TEMA 2 — Igualdad y violencia de género ═══════════════
  t("tema-2", "loiemh-titulo-1", "Discriminación directa",
    "Situación en que una persona es tratada de manera menos favorable que otra en situación comparable, por razón de sexo."),
  t("tema-2", "loiemh-titulo-1", "Discriminación indirecta",
    "Situación en que una disposición, criterio o práctica aparentemente neutros pone a personas de un sexo en desventaja particular respecto de las del otro, salvo justificación objetiva."),
  t("tema-2", "loiemh-titulo-1", "Acoso sexual",
    "Comportamiento verbal, no verbal o físico de naturaleza sexual, no deseado, que atenta contra la dignidad de una persona o crea un entorno intimidatorio, hostil o humillante."),
  t("tema-2", "loiemh-titulo-1", "Acoso por razón de sexo",
    "Comportamiento no deseado relacionado con el sexo de una persona que atenta contra su dignidad o crea un entorno hostil, sin el componente sexual explícito del acoso sexual."),
  t("tema-2", "loiemh-titulo-1", "Transversalidad de género (mainstreaming)",
    "Principio por el que el objetivo de la igualdad de trato y oportunidades se integra de forma activa en todas las políticas públicas, y no solo en medidas específicas."),
  t("tema-2", "loiemh-titulo-1", "Acción positiva",
    "Medidas específicas y temporales a favor de un sexo para corregir situaciones de desigualdad de hecho, sin que se consideren discriminatorias."),
  t("tema-2", "ley4-cap-1-disposiciones-generales", "Violencia de género",
    "Todo acto de violencia física y psicológica ejercido sobre las mujeres por quienes sean o hayan sido sus cónyuges o parejas, como manifestación de la discriminación y la desigualdad en las relaciones de poder de los hombres sobre las mujeres."),
  t("tema-2", "ley4-cap-4-proteccion-apoyo-victimas", "Orden de protección",
    "Resolución judicial que reconoce a la víctima de violencia de género un estatuto integral de protección, activando medidas cautelares penales, civiles y de asistencia social."),
  t("tema-2", "ley4-cap-4-proteccion-apoyo-victimas", "Casas de acogida",
    "Recurso de alojamiento temporal y atención integral para mujeres víctimas de violencia de género y sus hijos e hijas, cuando no pueden permanecer en su domicilio."),
  t("tema-2", "plan-igualdad-zaragoza", "Plan de igualdad",
    "Instrumento estratégico que fija los objetivos y las medidas concretas que una administración adopta para alcanzar la igualdad de trato y oportunidades entre mujeres y hombres en su ámbito de actuación."),

  // ═══════════════ TEMA 3 — Estatuto de Autonomía de Aragón ═══════════════
  t("tema-3", "titulo-preliminar", "Derecho civil aragonés (Derecho foral)",
    "Cuerpo normativo propio de Aragón en materia civil, cuya conservación, modificación y desarrollo es competencia exclusiva de la Comunidad Autónoma."),
  t("tema-3", "titulo-2-cap-1", "Competencia exclusiva",
    "Materia sobre la que la Comunidad Autónoma tiene la potestad legislativa, reglamentaria y ejecutiva en su integridad, sin intervención estatal salvo lo que la Constitución reserve al Estado."),
  t("tema-3", "titulo-2-cap-1", "Competencia compartida",
    "Materia en la que corresponde al Estado la legislación básica y a la Comunidad Autónoma el desarrollo normativo y la ejecución."),
  t("tema-3", "titulo-2-cap-1", "Competencia ejecutiva",
    "Materia en la que la legislación corresponde al Estado o a la UE, y a la Comunidad Autónoma le corresponde solo la función ejecutiva, incluida la potestad reglamentaria de organización."),
  t("tema-3", "titulo-2-cap-2", "Cortes de Aragón",
    "Institución que representa al pueblo aragonés, ejerce la potestad legislativa, aprueba los presupuestos y controla la acción del Gobierno de Aragón."),
  t("tema-3", "titulo-2-cap-2", "Diputación General de Aragón",
    "Órgano colegiado de gobierno de la Comunidad Autónoma, formado por el Presidente y los Consejeros."),
  t("tema-3", "titulo-2-cap-3", "El Justicia de Aragón",
    "Alto comisionado de las Cortes de Aragón que vela por los derechos individuales y colectivos de los aragoneses y supervisa la actividad de la Administración autonómica, de forma similar al Defensor del Pueblo estatal."),
  t("tema-3", "titulo-5", "Régimen local aragonés (competencia autonómica)",
    "Competencia de la Comunidad Autónoma para regular la organización y el funcionamiento de sus entidades locales, dentro del marco de la legislación básica estatal."),

  // ═══════════════ TEMA 4-8 — Ley 39/2015 (procedimiento administrativo) ═══════════════
  t("tema-4", "titulo-1-cap-1", "Capacidad de obrar",
    "Aptitud para ser sujeto activo en un procedimiento administrativo. La tienen quienes la ostentan según el Derecho civil, y también los menores para ejercer y defender derechos e intereses cuya actuación les permita el ordenamiento sin asistencia."),
  t("tema-4", "titulo-1-cap-1", "Interesado",
    "Quien promueve un procedimiento como titular de derechos o intereses legítimos, individuales o colectivos, o quien, sin haberlo iniciado, tiene derechos que puedan resultar afectados por la resolución."),
  t("tema-4", "titulo-1-cap-1", "Representación",
    "Facultad de actuar en nombre de un interesado ante la Administración; se presume para actos de mero trámite, pero debe acreditarse para actos como desistir, renunciar o formular recursos."),

  t("tema-5", "titulo-2-cap-1", "Acto administrativo",
    "Declaración de voluntad, juicio, deseo o conocimiento realizada por la Administración en ejercicio de una potestad administrativa distinta de la reglamentaria."),
  t("tema-5", "titulo-2-cap-1", "Motivación",
    "Obligación de expresar los hechos y fundamentos jurídicos de una resolución, exigida para los actos que limitan derechos, resuelven recursos o se separan del criterio de órganos consultivos, entre otros."),
  t("tema-5", "titulo-2-cap-1", "Nulidad de pleno derecho",
    "Grado máximo de invalidez de un acto administrativo, reservado a los supuestos más graves (art. 47); el acto se considera radicalmente nulo, sin efectos, desde el origen."),
  t("tema-5", "titulo-2-cap-1", "Anulabilidad",
    "Invalidez de un acto que infringe el ordenamiento sin llegar a los supuestos de nulidad de pleno derecho; el acto produce efectos hasta que se anula."),
  t("tema-5", "titulo-2-cap-2", "Notificación",
    "Comunicación formal a los interesados del contenido íntegro de una resolución, con indicación de si pone fin o no a la vía administrativa y de los recursos procedentes."),
  t("tema-5", "titulo-2-cap-2", "Silencio administrativo",
    "Efecto jurídico (estimatorio o desestimatorio, según la norma) que se produce cuando la Administración no resuelve ni notifica expresamente en el plazo máximo de un procedimiento."),

  t("tema-6", "titulo-3-cap-1", "Recurso de alzada",
    "Recurso administrativo ordinario contra resoluciones y actos de trámite cualificados que no ponen fin a la vía administrativa, interpuesto ante el órgano superior jerárquico del que dictó el acto."),
  t("tema-6", "titulo-3-cap-2", "Recurso potestativo de reposición",
    "Recurso administrativo no obligatorio que se interpone ante el mismo órgano que dictó el acto que pone fin a la vía administrativa, antes de acudir a la vía contencioso-administrativa."),
  t("tema-6", "titulo-3-cap-3", "Recurso extraordinario de revisión",
    "Recurso excepcional contra actos firmes en vía administrativa, admisible solo por los motivos tasados del art. 125 (error de hecho, documentos esenciales, prueba falsa, prevaricación...)."),

  t("tema-7", "titulo-4-cap-2", "Trámite de audiencia",
    "Fase del procedimiento en la que se pone de manifiesto el expediente a los interesados para que puedan alegar y presentar documentos antes de la propuesta de resolución."),
  t("tema-7", "titulo-4-cap-3", "Información pública",
    "Trámite por el que se abre un periodo para que cualquier persona, no solo los interesados, pueda examinar un expediente y formular alegaciones."),
  t("tema-7", "titulo-4-cap-4", "Caducidad del procedimiento",
    "Terminación del procedimiento por su paralización: imputable al interesado en los iniciados a solicitud, o a la Administración en los de oficio susceptibles de producir efectos desfavorables, al transcurrir el plazo establecido."),

  t("tema-8", "titulo-5-cap-1", "Ejecutoriedad",
    "Cualidad de los actos administrativos por la que son inmediatamente ejecutivos, salvo que una disposición establezca lo contrario o se suspendan cautelarmente."),
  t("tema-8", "titulo-5-cap-2", "Vía de apremio",
    "Procedimiento administrativo de ejecución forzosa para el cobro de deudas de derecho público, mediante el embargo y la venta de bienes del deudor."),
  t("tema-8", "titulo-5-cap-2", "Multa coercitiva",
    "Medio de ejecución forzosa consistente en multas reiteradas en el tiempo para vencer la resistencia del obligado a un acto personalísimo, distinta de una sanción."),

  // ═══════════════ TEMA 9 — Ley de Contratos del Sector Público ═══════════════
  t("tema-9", "tipos-contractuales", "Órgano de contratación",
    "Órgano que, en nombre de la Administración, tiene atribuida la facultad de celebrar contratos en su representación."),
  t("tema-9", "tipos-contractuales", "Pliego de cláusulas administrativas particulares",
    "Documento que establece los pactos y condiciones jurídicas, económicas y administrativas que rigen un contrato concreto."),
  t("tema-9", "tipos-contractuales", "Contrato menor",
    "Contrato de escasa cuantía (por debajo de los umbrales legales) que puede adjudicarse directamente a cualquier empresario con capacidad de obrar, sin publicidad ni concurrencia formal."),
  t("tema-9", "competencias-entidades-locales", "Contrato de concesión de servicios",
    "Contrato por el que la Administración encomienda a un tercero la gestión de un servicio, transfiriéndole el riesgo operacional derivado de su explotación."),

  // ═══════════════ TEMA 10 — Reglamento de Bienes de las Entidades Locales ═══════════════
  t("tema-10", "cap-1-clasificacion", "Bienes de dominio público",
    "Bienes destinados a un uso o servicio público; son inalienables, inembargables e imprescriptibles."),
  t("tema-10", "cap-1-clasificacion", "Bienes patrimoniales",
    "Bienes de titularidad de la entidad local no destinados a uso o servicio público, susceptibles de producir renta y de enajenarse como los bienes privados."),
  t("tema-10", "cap-1-clasificacion", "Bienes comunales",
    "Bienes cuyo aprovechamiento corresponde al común de los vecinos."),
  t("tema-10", "cap-3-conservacion", "Inventario de bienes",
    "Registro anual en el que las entidades locales relacionan todos sus bienes y derechos, cualquiera que sea su naturaleza."),
  t("tema-10", "cap-3-defensa", "Desafectación",
    "Acto por el que un bien de dominio público pierde esa condición y pasa a ser patrimonial."),
  t("tema-10", "cap-3-defensa", "Recuperación de oficio",
    "Facultad de la entidad local de recuperar por sí misma la posesión indebidamente perdida de sus bienes de dominio público, sin necesidad de acudir a los tribunales."),

  // ═══════════════ TEMA 11 — Formas de actividad administrativa ═══════════════
  t("tema-11", "formas-actividad", "Policía administrativa",
    "Actividad de limitación por la que la Administración restringe la libertad o los derechos de los particulares para salvaguardar el interés general (autorizaciones, licencias, órdenes...)."),
  t("tema-11", "formas-actividad", "Fomento",
    "Actividad por la que la Administración estimula a los particulares para que realicen actividades de interés general sin coacción, mediante subvenciones, premios o beneficios fiscales."),
  t("tema-11", "servicio-publico-concepto", "Servicio público",
    "Actividad de prestación asumida por la Administración para satisfacer una necesidad de interés general de forma regular y continua."),
  t("tema-11", "gestion-directa", "Gestión directa",
    "Modalidad de prestación de un servicio público en la que la propia entidad local, sus organismos autónomos o sus sociedades de capital íntegramente público lo prestan sin intermediación de terceros."),
  t("tema-11", "gestion-indirecta", "Concesión administrativa",
    "Modalidad de gestión indirecta de un servicio público por la que la Administración encomienda a un particular su gestión, asumiendo este el riesgo económico."),

  // ═══════════════ TEMA 12 — Haciendas Locales ═══════════════
  t("tema-12", "tasas", "Hecho imponible",
    "Presupuesto fijado por la ley cuya realización origina el nacimiento de la obligación tributaria."),
  t("tema-12", "tasas", "Sujeto pasivo",
    "Persona obligada al cumplimiento de las prestaciones tributarias, ya sea como contribuyente o como sustituto."),
  t("tema-12", "tasas", "Devengo",
    "Momento en que se entiende realizado el hecho imponible y en el que nace la obligación tributaria principal."),
  t("tema-12", "tasas", "Tasa",
    "Tributo cuyo hecho imponible consiste en la utilización privativa del dominio público o la prestación de un servicio de recepción obligatoria que no presta el sector privado."),
  t("tema-12", "precios-publicos", "Precio público",
    "Contraprestación pecuniaria por servicios o actividades de solicitud o recepción voluntaria que también presta el sector privado, a diferencia de la tasa."),
  t("tema-12", "contribuciones-especiales", "Contribución especial",
    "Tributo cuyo hecho imponible es la obtención por el sujeto pasivo de un beneficio o un aumento de valor de sus bienes como consecuencia de una obra pública o del establecimiento de un servicio público."),
  t("tema-12", "impuestos-enumeracion", "Impuestos obligatorios vs. potestativos",
    "Los municipios exigen siempre el IBI, el IAE y el IVTM (obligatorios); el ICIO y el IIVTNU solo se exigen si el Ayuntamiento aprueba la correspondiente ordenanza fiscal (potestativos)."),
  t("tema-12", "ibi", "IBI (Impuesto sobre Bienes Inmuebles)",
    "Impuesto directo de carácter real que grava el valor de los bienes inmuebles urbanos, rústicos y de características especiales."),
  t("tema-12", "iae", "IAE (Impuesto sobre Actividades Económicas)",
    "Impuesto directo que grava el mero ejercicio de actividades empresariales, profesionales o artísticas en territorio nacional."),
  t("tema-12", "ivtm", "IVTM (Impuesto sobre Vehículos de Tracción Mecánica)",
    "Impuesto que grava la titularidad de vehículos aptos para circular por vías públicas."),
  t("tema-12", "icio", "ICIO (Impuesto sobre Construcciones, Instalaciones y Obras)",
    "Impuesto indirecto que grava la realización de cualquier construcción, instalación u obra para la que se exija licencia urbanística o declaración responsable."),
  t("tema-12", "iivtnu", "IIVTNU (plusvalía municipal)",
    "Impuesto que grava el incremento de valor de los terrenos de naturaleza urbana puesto de manifiesto con ocasión de su transmisión."),

  // ═══════════════ TEMA 13 — Presupuesto ═══════════════
  t("tema-13", "presupuesto-contenido", "Crédito presupuestario",
    "Cantidad consignada en el estado de gastos del presupuesto que representa el límite máximo de las obligaciones que puede reconocer una entidad para una finalidad."),
  t("tema-13", "presupuesto-creditos", "Transferencia de crédito",
    "Modificación presupuestaria que traslada, total o parcialmente, la cuantía de un crédito a otras aplicaciones con distinta vinculación jurídica."),
  t("tema-13", "presupuesto-creditos", "Crédito extraordinario y suplemento de crédito",
    "Modificaciones para gastos que no pueden demorarse: crédito extraordinario cuando no existe crédito para la finalidad, suplemento cuando el existente es insuficiente."),
  t("tema-13", "presupuesto-ejecucion", "Fases del gasto (A, D, O, P)",
    "Autorización, Disposición o compromiso, reconocimiento de la Obligación y Pago: las cuatro fases sucesivas de ejecución de un gasto público."),
  t("tema-13", "presupuesto-ejecucion", "Fiscalización previa (intervención)",
    "Función de control interno por la que el interventor comprueba, antes de la aprobación de un acto, que se ajusta a la normativa presupuestaria aplicable."),
  t("tema-13", "capitalidad-zaragoza", "Régimen de capitalidad",
    "Especialidades organizativas y de financiación que la Ley de Capitalidad reconoce a determinados municipios en atención a las funciones que desempeñan."),

  // ═══════════════ TEMA 14 — Municipio ═══════════════
  t("tema-14", "municipio-territorio-poblacion", "Padrón municipal",
    "Registro administrativo donde constan los vecinos de un municipio; sus datos constituyen prueba de la residencia y del domicilio habitual."),
  t("tema-14", "municipio-territorio-poblacion", "Población de derecho",
    "Conjunto de personas inscritas en el Padrón municipal de un municipio, con independencia de que residan de hecho en él en un momento dado."),
  t("tema-14", "servicios-minimos", "Servicios mínimos obligatorios",
    "Prestaciones que todo municipio debe garantizar por sí mismo según su tramo de población (art. 26 LBRL), desde alumbrado y cementerio hasta transporte colectivo en los de mayor tamaño."),
  t("tema-14", "municipios-gran-poblacion", "Régimen de organización de municipios de gran población",
    "Régimen especial (Título X LBRL) aplicable a municipios que superan un umbral de población, o que lo soliciten, con una organización ejecutiva reforzada (Junta de Gobierno Local con atribuciones propias)."),
  t("tema-14", "capitalidad-zaragoza-general", "Ley de Capitalidad",
    "Norma que regula el régimen especial de un municipio capital de Comunidad Autónoma, con particularidades organizativas, competenciales y financieras respecto al régimen local común."),

  // ═══════════════ TEMA 15 — Participación ciudadana y atención a la ciudadanía ═══════════════
  t("tema-15", "instrumentos-participacion", "Iniciativa ciudadana",
    "Instrumento de participación por el que un número mínimo de vecinos puede proponer al Ayuntamiento la realización de una actividad de interés público."),
  t("tema-15", "instrumentos-participacion", "Audiencia pública",
    "Instrumento de participación oral, en unidad de acto, por el que los ciudadanos proponen acuerdos o reciben información sobre actuaciones municipales."),
  t("tema-15", "instrumentos-participacion", "Consulta popular",
    "Sometimiento a votación de los vecinos de un asunto de especial trascendencia para el municipio, con autorización del Gobierno del Estado."),
  t("tema-15", "consejos-distrito", "Consejo de Distrito",
    "Órgano de desconcentración territorial que agrupa varias Juntas Municipales o Vecinales limítrofes para gestionar asuntos de ámbito supramunicipal reducido."),
  t("tema-15", "comunicacion-atencion", "Escucha activa",
    "Técnica de comunicación que consiste en atender por completo a lo que dice el interlocutor, captando no solo el contenido sino la intención y el sentimiento, sin interrumpir."),

  // ═══════════════ TEMA 16 — Reglamentos y ordenanzas ═══════════════
  t("tema-16", "concepto", "Ordenanza municipal",
    "Norma jurídica de carácter general, con rango de reglamento, aprobada por el Pleno del Ayuntamiento, que regula relaciones con los ciudadanos (ad extra)."),
  t("tema-16", "concepto", "Reglamento orgánico",
    "Norma municipal que regula la organización y funcionamiento interno de la propia Corporación (ad intra), a diferencia de la ordenanza."),
  t("tema-16", "capitalidad-ordenanzas", "Ordenanza fiscal",
    "Ordenanza municipal que regula los elementos de un tributo local (tipo, exenciones, bonificaciones...) dentro del marco fijado por la ley."),

  // ═══════════════ TEMA 17 — TREBEP I (clases de personal, derechos, deberes) ═══════════════
  t("tema-17", "clases-personal", "Funcionario de carrera",
    "Quien, por nombramiento legal, está vinculado a una Administración por una relación estatutaria de Derecho Administrativo, para servicios profesionales retribuidos de carácter permanente."),
  t("tema-17", "clases-personal", "Funcionario interino",
    "Quien ocupa plaza vacante de funcionario de carrera, por razones de necesidad y urgencia, mientras no se provea de forma definitiva o desaparezca la causa de su nombramiento."),
  t("tema-17", "clases-personal", "Personal eventual",
    "Quien, con carácter no permanente, ocupa un puesto de confianza o asesoramiento especial no reservado a funcionarios de carrera, con nombramiento y cese libres."),
  t("tema-17", "deberes-codigo-conducta", "Código de conducta",
    "Conjunto de principios éticos y de conducta que deben regir la actuación de los empleados públicos, cuya infracción puede ser sancionada disciplinariamente."),

  // ═══════════════ TEMA 18 — TREBEP II (adquisición/pérdida, situaciones, disciplina) ═══════════════
  t("tema-18", "situaciones-administrativas", "Servicios especiales",
    "Situación administrativa del funcionario que pasa a desempeñar un cargo público o de confianza (ministro, diputado, alto cargo...), en la que conserva todos sus derechos como si estuviera en servicio activo."),
  t("tema-18", "situaciones-administrativas", "Excedencia voluntaria",
    "Situación en la que el funcionario, por decisión propia, deja temporalmente de prestar servicios, sin reserva de puesto (salvo excepciones) y sin percibir retribuciones."),
  t("tema-18", "regimen-disciplinario", "Falta disciplinaria",
    "Conducta del empleado público tipificada como infracción (leve, grave o muy grave) sancionable dentro del régimen disciplinario."),
  t("tema-18", "regimen-disciplinario", "Separación del servicio",
    "Sanción disciplinaria más grave, reservada a las faltas muy graves, que supone la pérdida de la condición de funcionario."),
  t("tema-18", "perdida-servicio", "Rehabilitación de la condición de funcionario",
    "Posibilidad de recuperar la condición de funcionario tras desaparecer la causa que motivó su pérdida (p. ej. recuperación de la nacionalidad)."),

  // ═══════════════ TEMA 19 — TREBEP III (planificación, empleo, provisión) ═══════════════
  t("tema-19", "planificacion-rrhh", "Oferta de Empleo Público",
    "Instrumento que recoge las necesidades de personal de nuevo ingreso, con asignación presupuestaria, y obliga a convocar los procesos selectivos en el plazo improrrogable de 3 años."),
  t("tema-19", "estructuracion-empleo", "Relación de puestos de trabajo (RPT)",
    "Instrumento organizativo que recoge, de forma pública, la denominación, características esenciales y retribuciones complementarias de cada puesto de trabajo."),
  t("tema-19", "provision-movilidad", "Concurso de provisión de puestos",
    "Procedimiento normal de provisión de puestos entre funcionarios de carrera, basado en la valoración de méritos, capacidades y aptitudes por un órgano colegiado técnico."),
  t("tema-19", "provision-movilidad", "Libre designación",
    "Sistema excepcional de provisión de puestos de especial responsabilidad, basado en la apreciación discrecional de la idoneidad de los candidatos, con convocatoria pública."),

  // ═══════════════ TEMA 23 — Ley de Urbanismo de Aragón ═══════════════
  t("tema-23", "titulo-preliminar", "Función pública urbanística",
    "Consideración de la dirección y el control de la actividad urbanística como una función que corresponde en exclusiva a las Administraciones Públicas, no transferible a los particulares."),
  t("tema-23", "regimen-suelo", "Suelo urbano",
    "Clase de suelo constituida por los terrenos que ya cuentan con los servicios urbanísticos básicos o están integrados en la trama urbana consolidada."),
  t("tema-23", "regimen-suelo", "Suelo urbanizable",
    "Clase de suelo previsto por el planeamiento para su transformación futura mediante la dotación de servicios urbanísticos."),
  t("tema-23", "regimen-suelo", "Suelo no urbanizable",
    "Clase de suelo preservado de la transformación urbanística por sus valores ambientales, culturales o agrícolas, por riesgos, o por decisión motivada del plan general."),
  t("tema-23", "regimen-suelo", "Solar",
    "Superficie de suelo urbano apta para su uso inmediato, por reunir los servicios y condiciones exigidos por el planeamiento."),
  t("tema-23", "planeamiento", "Plan general de ordenación urbana",
    "Instrumento de ordenación integral que clasifica el suelo de uno o varios términos municipales y define la estructura general de la ordenación urbanística."),
  t("tema-23", "planeamiento", "Ordenación estructural vs. pormenorizada",
    "La estructural fija el modelo territorial básico (clasificación del suelo, sistemas generales); la pormenorizada desarrolla el detalle de usos, edificabilidad y trazados dentro de ese modelo."),
  t("tema-23", "gestion-urbanistica", "Reparcelación",
    "Técnica de gestión que agrupa las fincas de una unidad de ejecución para su nueva división ajustada al planeamiento, distribuyendo equitativamente beneficios y cargas entre los propietarios."),
  t("tema-23", "gestion-urbanistica", "Aprovechamiento urbanístico",
    "Medida del contenido lucrativo (edificabilidad) que corresponde a los propietarios de un terreno: el objetivo es el que permite el planeamiento, el subjetivo el que puede apropiarse el propietario."),
  t("tema-23", "edificacion-uso", "Licencia urbanística",
    "Acto administrativo por el que el Ayuntamiento autoriza un acto de transformación, construcción, edificación o uso del suelo, tras comprobar su conformidad con la normativa aplicable."),
  t("tema-23", "edificacion-uso", "Declaración responsable",
    "Documento por el que el interesado manifiesta, bajo su responsabilidad, que cumple los requisitos exigidos para actuaciones urbanísticas de menor entidad, sin necesidad de licencia previa."),
  t("tema-23", "disciplina-urbanistica", "Restablecimiento de la legalidad urbanística",
    "Conjunto de medidas (demolición, cesación del uso...) que adopta la Administración para reponer la realidad física alterada por una actuación urbanística ilegal."),
];

console.log(`📝 Insertando ${TERMINOS.length} términos de glosario en ${new Set(TERMINOS.map((x) => x.tema_slug)).size} temas...`);
await insertBatch(TERMINOS);
console.log("✅ Glosario completado.");
