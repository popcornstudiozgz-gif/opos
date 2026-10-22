/**
 * Crea tema-358 — Tema 31 de Policía Local: "Políticas de igualdad de
 * Género. La Ley Orgánica para la Igualdad efectiva de mujeres y hombres.
 * Políticas contra la Violencia de género. La Ley Orgánica de Medidas de
 * Protección Integral contra la Violencia de Género."
 *
 * No reutiliza tema-2 (Auxiliar Administrativo): ese tema cubre la LO
 * 3/2007 solo en su título preliminar y título I, junto con la Ley 4/2007
 * de Aragón y el Plan de Igualdad municipal, pero no la LO 1/2004, que aquí
 * es la mitad del enunciado.
 *
 * Fuentes, textos consolidados del BOE leídos en la sesión:
 * - Ley Orgánica 3/2007, de 22 de marzo, para la igualdad efectiva de
 *   mujeres y hombres (BOE-A-2007-6115, título verificado): arts. 1 a 17,
 *   45-46 (planes de igualdad de las empresas), 51 y 64 a 68 (empleo
 *   público, Fuerzas Armadas y Fuerzas y Cuerpos de Seguridad) y rúbricas
 *   de los Títulos.
 * - Ley Orgánica 1/2004, de 28 de diciembre, de Medidas de Protección
 *   Integral contra la Violencia de Género (BOE-A-2004-21760, título
 *   verificado): arts. 1-2, 17-28 ter, 29-32 (con el art. 31 sobre las
 *   Policías Locales), 61-69 (medidas judiciales de protección).
 * - Ley de Enjuiciamiento Criminal (BOE-A-1882-6036), art. 544 ter (orden
 *   de protección), al que remite el art. 62 de la LO 1/2004.
 * Los artículos de la LO 1/2004 sobre los Juzgados de Violencia sobre la
 * Mujer (arts. 43 y ss.) modifican otras leyes y su organización se ha
 * reformado con los Tribunales de Instancia (LO 1/2025); no se desarrollan.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-358-igualdad-violencia-genero.mjs
 */
import { sembrarTema, POLICIA } from "./lib/sembrar-tema.mjs";

const LOI = "https://www.boe.es/buscar/act.php?id=BOE-A-2007-6115";
const LOVG = "https://www.boe.es/buscar/act.php?id=BOE-A-2004-21760";
const LECRIM = "https://www.boe.es/buscar/act.php?id=BOE-A-1882-6036";
const S1 = "loi-principio-igualdad";
const S2 = "loi-politicas-publicas-empleo";
const S3 = "lovg-objeto-derechos";
const S4 = "lovg-tutela-institucional-policia";
const S5 = "lovg-medidas-proteccion";

await sembrarTema({
  tema: {
    slug: "tema-358",
    titulo: "Igualdad efectiva de mujeres y hombres (LO 3/2007) y protección integral contra la violencia de género (LO 1/2004)",
    descripcion: "LO 3/2007: objeto y ámbito, principio de igualdad de trato, discriminación directa e indirecta, acoso sexual y por razón de sexo, embarazo, indemnidad frente a represalias, nulidad, acciones positivas, tutela judicial e inversión de la carga de la prueba; criterios de actuación de los poderes públicos y transversalidad; planes de igualdad de las empresas; igualdad en el empleo público y en las Fuerzas y Cuerpos de Seguridad. LO 1/2004: concepto de violencia de género, principios rectores, derechos de las víctimas (información, asistencia social integral, asistencia jurídica, derechos laborales y de las funcionarias, acreditación, ayudas y reparación), Delegación del Gobierno y Observatorio, papel de las Policías Locales, planes de colaboración y medidas judiciales de protección (orden de protección, salida del domicilio, alejamiento, suspensión de la patria potestad, de visitas y de armas).",
    contenido: "Recorre las dos leyes orgánicas que vertebran las políticas de igualdad y contra la violencia de género: qué es discriminación directa e indirecta y acoso según la LO 3/2007, cómo se aplica la igualdad a las Administraciones y a los cuerpos policiales; y, de la LO 1/2004, qué es violencia de género, qué derechos tienen las víctimas, qué hacen las Policías Locales en la protección de las víctimas, y qué medidas puede adoptar el juez (orden de protección, alejamiento, salida del domicilio, armas).",
    enlaces_boe: [
      { url: LOI, titulo: "Ley Orgánica 3/2007, de 22 de marzo, para la igualdad efectiva de mujeres y hombres (BOE-A-2007-6115)" },
      { url: LOVG, titulo: "Ley Orgánica 1/2004, de 28 de diciembre, de Medidas de Protección Integral contra la Violencia de Género (BOE-A-2004-21760)" },
      { url: `${LECRIM}#a544ter`, titulo: "Ley de Enjuiciamiento Criminal, art. 544 ter (orden de protección)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "LO 3/2007: objeto y principio de igualdad y tutela contra la discriminación", articulos: "arts. 1-13", url: `${LOI}#a1` },
      { seccion: S2, titulo: "LO 3/2007: políticas públicas, planes de igualdad, empleo público y FCS", articulos: "arts. 14-17, 45-46, 51 y 64-68", url: `${LOI}#a14` },
      { seccion: S3, titulo: "LO 1/2004: objeto, principios y derechos de las mujeres víctimas", articulos: "arts. 1-2 y 17-28 ter", url: `${LOVG}#a1` },
      { seccion: S4, titulo: "LO 1/2004: tutela institucional y Fuerzas y Cuerpos de Seguridad", articulos: "arts. 29-32", url: `${LOVG}#a29` },
      { seccion: S5, titulo: "LO 1/2004 y LECrim: medidas judiciales de protección y orden de protección", articulos: "arts. 61-69 LO 1/2004 y 544 ter LECrim", url: `${LOVG}#a61` },
    ],
  },
  vinculo: { oposicion: POLICIA.oposicion, bloqueId: POLICIA.bloqueParte2, numero: 31 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Objeto de la LO 3/2007 (art. 1)", "Hacer efectivo el derecho de igualdad de trato y de oportunidades entre mujeres y hombres, eliminando la discriminación de la mujer, en desarrollo de los arts. 9.2 y 14 CE"],
        ["Ámbito de aplicación (art. 2)", "Toda persona física o jurídica que se encuentre o actúe en territorio español, cualquiera que sea su nacionalidad, domicilio o residencia"],
        ["Principio de igualdad de trato (art. 3)", "Ausencia de toda discriminación directa o indirecta por razón de sexo, especialmente por maternidad, obligaciones familiares y estado civil"],
        ["Discriminación directa (art. 6.1)", "Trato menos favorable a una persona, en atención a su sexo, que a otra en situación comparable"],
        ["Discriminación indirecta (art. 6.2)", "Disposición, criterio o práctica aparentemente neutros que ponen a personas de un sexo en desventaja particular, salvo justificación objetiva y medios necesarios y adecuados"],
        ["Acoso sexual (art. 7.1)", "Comportamiento verbal o físico de naturaleza sexual que atenta contra la dignidad, en particular creando un entorno intimidatorio, degradante u ofensivo"],
        ["Acoso por razón de sexo (art. 7.2)", "Comportamiento realizado en función del sexo de una persona que atenta contra su dignidad y crea un entorno intimidatorio, degradante u ofensivo"],
        ["Embarazo y maternidad (art. 8)", "Todo trato desfavorable relacionado con el embarazo o la maternidad es discriminación directa"],
        ["Indemnidad frente a represalias (art. 9)", "Es discriminación cualquier trato adverso por haber presentado una queja, denuncia o recurso para exigir la igualdad"],
        ["Acciones positivas (art. 11)", "Medidas específicas a favor de las mujeres para corregir desigualdades de hecho, mientras subsistan y de forma razonable y proporcionada"],
        ["Prueba (art. 13)", "En procedimientos por discriminación por razón de sexo, el demandado prueba la ausencia de discriminación; no se aplica en los procesos penales"],
      ],
      preguntas: [
        ["media", "Una práctica aparentemente neutra que pone en desventaja particular a las personas de un sexo sin justificación objetiva es…", ["Discriminación indirecta", "Discriminación directa", "Acción positiva"], "Art. 6.2 LO 3/2007."],
        ["media", "Todo trato desfavorable a las mujeres relacionado con el embarazo constituye…", ["Discriminación directa por razón de sexo", "Discriminación indirecta", "Acoso por razón de sexo"], "Art. 8 LO 3/2007."],
        ["media", "Las medidas específicas a favor de las mujeres para corregir situaciones patentes de desigualdad son…", ["Acciones positivas", "Discriminaciones indirectas", "Represalias"], "Art. 11 LO 3/2007."],
        ["dificil", "¿Se aplica la inversión de la carga de la prueba del art. 13 en los procesos penales?", ["No", "Sí", "Solo en violencia de género"], "Art. 13.2 LO 3/2007."],
        ["media", "¿Quién está legitimado en los litigios sobre acoso sexual?", ["Únicamente la persona acosada", "Cualquier sindicato", "Cualquier ciudadano"], "Art. 12.3 LO 3/2007."],
        ["facil", "¿Se considera discriminatoria la orden de discriminar por razón de sexo?", ["Sí, en cualquier caso", "No", "Solo si se cumple"], "Art. 6.3 LO 3/2007."],
        ["media", "Los actos y cláusulas que causen discriminación por razón de sexo son…", ["Nulos y sin efecto", "Anulables a los cinco años", "Válidos con indemnización"], "Art. 10 LO 3/2007."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Algunos criterios de actuación de los poderes públicos (art. 14)", "Efectividad de la igualdad, participación equilibrada en candidaturas y decisiones, erradicación de la violencia de género y del acoso, atención a colectivos vulnerables, protección de la maternidad, conciliación y lenguaje no sexista en el ámbito administrativo"],
        ["Transversalidad (art. 15)", "La igualdad informa con carácter transversal toda la actuación de los poderes públicos, incluidas normas, presupuestos y políticas"],
        ["Nombramientos (art. 16)", "Los poderes públicos procurarán la presencia equilibrada de mujeres y hombres en los cargos de responsabilidad"],
        ["Planes de igualdad obligatorios (art. 45)", "En empresas de cincuenta o más trabajadores, cuando lo establezca el convenio o cuando lo acuerde la autoridad laboral en un procedimiento sancionador; voluntarios en las demás"],
        ["Plan de igualdad (art. 46)", "Conjunto ordenado de medidas tras un diagnóstico de situación, con objetivos, estrategias y sistemas de seguimiento y evaluación"],
        ["Plan para la Igualdad en la AGE (art. 64)", "Lo aprueba el Gobierno al inicio de cada legislatura, previa negociación con la representación de los empleados públicos"],
        ["Fuerzas y Cuerpos de Seguridad del Estado (art. 67)", "Sus normas promoverán la igualdad efectiva, impidiendo la discriminación profesional en acceso, formación, ascensos, destinos y situaciones administrativas"],
        ["Normas del personal público aplicables a las FCS (art. 68)", "Las de igualdad, prevención de la violencia de género y sexual y conciliación, adaptadas a las peculiaridades de sus funciones"],
      ],
      preguntas: [
        ["media", "¿A partir de cuántas personas trabajadoras está obligada una empresa a tener plan de igualdad?", ["Cincuenta o más", "Doscientas cincuenta o más", "Diez o más"], "Art. 45.2 LO 3/2007."],
        ["media", "Que la igualdad informe toda la actuación de los poderes públicos se denomina principio de…", ["Transversalidad", "Subsidiariedad", "Jerarquía"], "Art. 15 LO 3/2007."],
        ["media", "¿Es criterio de actuación de los poderes públicos la implantación de un lenguaje no sexista en el ámbito administrativo?", ["Sí", "No", "Solo en la AGE"], "Art. 14.11 LO 3/2007."],
        ["dificil", "¿Cuándo aprueba el Gobierno el Plan para la Igualdad en la Administración General del Estado?", ["Al inicio de cada legislatura", "Cada año", "Cada diez años"], "Art. 64 LO 3/2007."],
        ["media", "Según el art. 67, las normas de las FCS del Estado deben impedir la discriminación profesional especialmente en…", ["El acceso, formación, ascensos, destinos y situaciones administrativas", "Solo la jubilación", "Solo el uniforme"], "Art. 67 LO 3/2007."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Objeto de la LO 1/2004 (art. 1.1)", "Actuar contra la violencia que, como manifestación de la discriminación y de las relaciones de poder de los hombres sobre las mujeres, ejercen sobre ellas quienes sean o hayan sido sus cónyuges o parejas, aun sin convivencia"],
        ["Concepto de violencia de género (art. 1.3)", "Todo acto de violencia física y psicológica, incluidas agresiones a la libertad sexual, amenazas, coacciones o privación arbitraria de libertad"],
        ["Violencia vicaria (art. 1.4)", "También la ejercida sobre familiares o allegados menores de edad de la mujer con el objetivo de causarle daño"],
        ["Destinatarios de la asistencia (art. 1.2)", "Las mujeres, sus hijos menores y los menores sujetos a su tutela, guarda o custodia"],
        ["Servicios esenciales (art. 17.3)", "Información y orientación, atención psicosocial inmediata, asesoramiento jurídico 24 horas, acogida y asistencia social integral, y el seguimiento telemático de las prohibiciones de aproximación"],
        ["Atención integral (art. 19)", "Servicios sociales de atención, emergencia, apoyo, acogida y recuperación integral, con atención permanente, actuación urgente, especialización y multidisciplinariedad"],
        ["Asistencia jurídica (art. 20)", "Asesoramiento gratuito inmediatamente antes de denunciar y defensa y representación gratuitas en los procesos derivados de la violencia; puede personarse como acusación en cualquier momento"],
        ["Derechos laborales (art. 21)", "Reducción o reordenación de jornada, movilidad geográfica, cambio de centro, suspensión con reserva de puesto y extinción; las ausencias son justificadas si lo determinan los servicios sociales o de salud"],
        ["Derechos de las funcionarias (arts. 24-25)", "Reducción o reordenación del tiempo de trabajo, movilidad geográfica de centro y excedencia; ausencias justificadas"],
        ["Acreditación (art. 23)", "Sentencia condenatoria, orden de protección u otra resolución judicial cautelar, informe del fiscal, o informe de los servicios sociales, especializados o de acogida"],
        ["Ayuda de pago único (art. 27)", "Para víctimas con rentas inferiores al 75 % del SMI y especiales dificultades de empleo: seis meses de subsidio por desempleo (doce con discapacidad del 33 %)"],
      ],
      preguntas: [
        ["media", "La LO 1/2004 se refiere a la violencia ejercida sobre las mujeres por quienes sean o hayan sido sus cónyuges o parejas…", ["Aun sin convivencia", "Solo si conviven", "Solo si están casados"], "Art. 1.1 LO 1/2004."],
        ["media", "¿Comprende la violencia de género la ejercida sobre los hijos menores para dañar a la mujer?", ["Sí", "No", "Solo si son mayores de 14"], "Art. 1.4 LO 1/2004."],
        ["media", "Las víctimas tienen derecho a asesoramiento jurídico gratuito…", ["En el momento inmediatamente previo a interponer la denuncia", "Solo tras la sentencia", "Solo si tienen hijos"], "Art. 20.1 LO 1/2004."],
        ["media", "¿Cómo puede acreditarse la situación de violencia de género, entre otros medios?", ["Con una orden de protección", "Con una declaración jurada de cualquier vecino", "Con un certificado de empadronamiento"], "Art. 23 LO 1/2004."],
        ["dificil", "¿Pueden las víctimas personarse como acusación particular en cualquier momento del procedimiento?", ["Sí, sin retrotraer las actuaciones ya practicadas", "No, solo al inicio", "Solo con autorización del fiscal"], "Art. 20.7 LO 1/2004."],
        ["media", "¿Tiene la funcionaria víctima de violencia de género derecho a excedencia?", ["Sí, en los términos de su legislación específica", "No", "Solo si tiene hijos"], "Art. 24 LO 1/2004."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Delegación del Gobierno contra la Violencia de Género (art. 29)", "Formula las políticas públicas en la materia, elabora la Macroencuesta y coordina las acciones; su titular está legitimado ante los tribunales"],
        ["Observatorio Estatal de Violencia sobre la Mujer (art. 30)", "Órgano colegiado de asesoramiento, evaluación y estudios; remite un informe anual al Gobierno y a las comunidades autónomas"],
        ["Unidades especializadas (art. 31.1)", "El Gobierno las establece en las FCS del Estado para la prevención de la violencia de género y el control de la ejecución de las medidas judiciales"],
        ["Policías Locales (art. 31.2)", "En colaboración con las FCS del Estado, cooperan para asegurar el cumplimiento de las medidas judiciales previstas en esta ley, en el art. 544 bis LECrim o en el art. 57 CP"],
        ["Protocolo (art. 31.3)", "La actuación de las FCS debe tener en cuenta el Protocolo de Actuación de las FCS y de Coordinación con los Órganos Judiciales para la protección de las víctimas de violencia doméstica y de género"],
        ["Planes de colaboración (art. 32)", "Implican a sanidad, Justicia, FCS, servicios sociales y organismos de igualdad, con protocolos que aseguren una actuación global e integral y la actividad probatoria"],
        ["Mujeres con mayor riesgo (art. 32.4)", "Minorías, inmigrantes, en exclusión social, con discapacidad, mayores o del ámbito rural"],
      ],
      preguntas: [
        ["media", "Según el art. 31.2 LO 1/2004, las Policías Locales…", ["Cooperan en asegurar el cumplimiento de las medidas judiciales de protección, en colaboración con las FCS del Estado", "No tienen ninguna función en violencia de género", "Sustituyen a los juzgados"], "Art. 31.2 LO 1/2004."],
        ["media", "¿Qué órgano elabora la Macroencuesta de Violencia contra las Mujeres?", ["La Delegación del Gobierno contra la Violencia de Género", "El Observatorio Estatal", "El Consejo General del Poder Judicial"], "Art. 29.1 LO 1/2004."],
        ["media", "¿Con qué periodicidad remite el Observatorio su informe al Gobierno y a las comunidades autónomas?", ["Anual", "Mensual", "Cada cinco años"], "Art. 30.2 LO 1/2004."],
        ["dificil", "¿Qué medidas judiciales cita el art. 31.2 cuyo cumplimiento deben ayudar a asegurar las Policías Locales?", ["Las de la LO 1/2004, el art. 544 bis LECrim y el art. 57 CP", "Solo las multas de tráfico", "Las de la Ley de Extranjería"], "Art. 31.2 LO 1/2004."],
        ["media", "¿Quién establece las unidades especializadas en violencia de género en las FCS del Estado?", ["El Gobierno", "Los ayuntamientos", "Los jueces"], "Art. 31.1 LO 1/2004."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["Obligación de pronunciarse (art. 61.2)", "En todo procedimiento de violencia de género, el juez debe pronunciarse sobre la pertinencia de las medidas cautelares, especialmente las de los arts. 64, 65 y 66"],
        ["Orden de protección (art. 62 y art. 544 ter LECrim)", "Se dicta cuando hay indicios fundados de un delito contra la vida, integridad, libertad sexual, libertad o seguridad de las personas del art. 173.2 CP y una situación objetiva de riesgo"],
        ["¿Ante quién se solicita la orden de protección? (art. 544 ter.3 LECrim)", "Ante el juez o el fiscal, o ante las FCS, las oficinas de atención a la víctima o los servicios sociales, que la remiten de inmediato al juez"],
        ["Audiencia urgente (art. 544 ter.4 LECrim)", "Con la víctima, el solicitante, el presunto agresor y el fiscal; en un plazo máximo de 72 horas desde la solicitud, evitando la confrontación"],
        ["Estatuto integral de protección (art. 544 ter.5 LECrim)", "La orden comprende medidas cautelares civiles y penales y de asistencia social, y puede hacerse valer ante cualquier autoridad y Administración"],
        ["Salida del domicilio y alejamiento (art. 64)", "Salida obligatoria del domicilio familiar y prohibición de volver; prohibición de aproximarse a la persona protegida con distancia mínima fijada y control tecnológico; prohibición de comunicación"],
        ["Patria potestad y custodia (art. 65)", "El juez puede suspenderlas; si no lo hace, se pronuncia sobre su ejercicio y adopta medidas de seguridad"],
        ["Régimen de visitas (art. 66)", "El juez ordena su suspensión; si, en interés del menor, no lo hace, debe pronunciarse sobre la forma de ejercerlo"],
        ["Armas (art. 67)", "El juez puede suspender el derecho a la tenencia, porte y uso de armas, con obligación de depositarlas"],
        ["Garantías y mantenimiento (arts. 68-69)", "Auto motivado con intervención del fiscal, proporcionalidad y contradicción; pueden mantenerse tras la sentencia y durante los recursos"],
        ["Protección de datos (art. 63)", "Se protege la intimidad de las víctimas y sus datos; las vistas pueden celebrarse a puerta cerrada"],
      ],
      preguntas: [
        ["media", "¿Ante quién puede solicitar la víctima una orden de protección, además del juez y el fiscal?", ["Ante las Fuerzas y Cuerpos de Seguridad, oficinas de atención a la víctima o servicios sociales", "Solo ante un notario", "Solo ante el Ayuntamiento por registro"], "Art. 544 ter.3 LECrim."],
        ["media", "La audiencia para resolver la orden de protección debe celebrarse en un plazo máximo de…", ["Setenta y dos horas desde la solicitud", "Una semana", "Un mes"], "Art. 544 ter.4 LECrim."],
        ["media", "¿Puede acordarse el alejamiento aunque la víctima ya haya abandonado el domicilio?", ["Sí", "No", "Solo si vuelve"], "Art. 64.4 LO 1/2004."],
        ["media", "Respecto del régimen de visitas del inculpado con los hijos, el juez…", ["Ordena su suspensión, salvo que en interés del menor decida otra cosa y se pronuncie sobre su ejercicio", "Lo mantiene siempre", "No puede pronunciarse"], "Art. 66 LO 1/2004."],
        ["dificil", "Las medidas restrictivas del capítulo IV se adoptan mediante…", ["Auto motivado, con intervención del Ministerio Fiscal", "Providencia sin motivar", "Decisión policial"], "Art. 68 LO 1/2004."],
        ["media", "¿Puede el juez suspender al inculpado el derecho a la tenencia de armas?", ["Sí, con obligación de depositarlas", "No", "Solo si es policía"], "Art. 67 LO 1/2004."],
        ["dificil", "¿Pueden mantenerse las medidas de protección tras la sentencia definitiva?", ["Sí, durante los recursos, haciéndolo constar en la sentencia", "No", "Solo un mes"], "Art. 69 LO 1/2004."],
      ],
    },
  ],
  glosario: [
    [S1, "Discriminación indirecta", "Desventaja particular para un sexo causada por una medida aparentemente neutra sin justificación objetiva."],
    [S1, "Acción positiva", "Medida específica y temporal a favor de las mujeres para corregir desigualdades de hecho."],
    [S2, "Transversalidad", "Integración de la igualdad en todas las políticas y actuaciones públicas."],
    [S2, "Plan de igualdad", "Conjunto ordenado de medidas, tras un diagnóstico, para alcanzar la igualdad en una organización."],
    [S3, "Violencia de género", "Violencia contra la mujer por quien es o fue su pareja, como manifestación de la desigualdad (art. 1 LO 1/2004)."],
    [S3, "Violencia vicaria", "Violencia ejercida sobre los hijos u otros menores para dañar a la mujer (art. 1.4 LO 1/2004)."],
    [S4, "Observatorio Estatal de Violencia sobre la Mujer", "Órgano colegiado de análisis y evaluación de la violencia de género."],
    [S5, "Orden de protección", "Resolución judicial que otorga a la víctima un estatuto integral de protección (art. 544 ter LECrim)."],
    [S5, "Alejamiento", "Prohibición de aproximarse a la víctima, su domicilio, trabajo y lugares que frecuente."],
  ],
  casos: [
    {
      slug: "caso-llamada-violencia-genero-noche",
      titulo: "Una llamada de madrugada",
      supuesto: "Una patrulla de la Policía Local acude a un domicilio tras una llamada al 092. Una mujer relata que su expareja, con la que convivió y tiene dos hijos, ha entrado en casa, la ha amenazado y empujado. Él tiene licencia de armas de caza. La mujer pide protección y no sabe qué hacer con los niños.",
      preguntas: [
        [S3, "media", "¿Es violencia de género aunque ya no convivan?", ["Sí, la ley incluye a quienes han sido pareja, aun sin convivencia", "No", "Solo si estaban casados"], "Art. 1.1 LO 1/2004."],
        [S5, "media", "¿Puede la mujer solicitar la orden de protección ante los propios agentes?", ["Sí, y deben remitirla de inmediato al juez", "No, solo en el juzgado", "Solo por internet"], "Art. 544 ter.3 LECrim."],
        [S5, "media", "El juez celebrará la audiencia urgente en un plazo máximo de…", ["Setenta y dos horas desde la solicitud", "Quince días", "Un mes"], "Art. 544 ter.4 LECrim."],
        [S5, "media", "Sobre las armas de caza del agresor, el juez puede…", ["Suspender su derecho de tenencia y porte con obligación de depositarlas", "Nada", "Regalarlas"], "Art. 67 LO 1/2004."],
        [S5, "media", "El juez puede ordenar al inculpado…", ["La salida del domicilio familiar y la prohibición de volver", "Que se quede en casa", "Que cambie de trabajo"], "Art. 64.1 LO 1/2004."],
        [S5, "media", "En cuanto a los hijos, el juez debe pronunciarse sobre…", ["La suspensión del régimen de visitas o la forma de ejercerlo", "Nada", "Su escolarización exclusivamente"], "Art. 66 LO 1/2004."],
        [S4, "media", "¿Qué papel tiene la Policía Local en el cumplimiento de las medidas que se adopten?", ["Cooperar en asegurar su cumplimiento, en colaboración con las FCS del Estado", "Ninguno", "Solo informar al Ayuntamiento"], "Art. 31.2 LO 1/2004."],
        [S3, "media", "La mujer tiene derecho a asesoramiento jurídico gratuito…", ["Antes incluso de interponer la denuncia", "Solo después del juicio", "Solo si tiene ingresos bajos"], "Art. 20.1 LO 1/2004."],
        [S3, "media", "Para acompañamiento y acogida esa misma noche, la víctima tiene derecho a…", ["Servicios sociales de atención, emergencia y acogida", "Nada", "Solo información escrita"], "Art. 19 LO 1/2004."],
        [S5, "dificil", "Durante la audiencia, el juez evitará…", ["La confrontación entre el presunto agresor y la víctima, que declararán por separado", "Que declare la víctima", "La presencia del fiscal"], "Art. 544 ter.4 LECrim."],
      ],
    },
    {
      slug: "caso-agente-embarazada-destino",
      titulo: "Una agente embarazada",
      supuesto: "Una policía de un cuerpo local comunica su embarazo y su jefe decide retirarla de la convocatoria de una especialidad «porque no le compensa invertir en ella». Otra agente, que presentó una queja por un comentario sexista de un mando, sufre después un cambio de turno perjudicial.",
      preguntas: [
        [S1, "media", "Apartar a la agente de la convocatoria por su embarazo es…", ["Discriminación directa por razón de sexo", "Discriminación indirecta", "Una acción positiva"], "Art. 8 LO 3/2007."],
        [S1, "media", "El cambio de turno perjudicial tras presentar la queja vulnera…", ["La indemnidad frente a represalias", "El principio de jerarquía", "Nada"], "Art. 9 LO 3/2007."],
        [S1, "media", "El comentario sexista que crea un entorno degradante por razón de sexo puede ser…", ["Acoso por razón de sexo", "Acción positiva", "Discriminación indirecta"], "Art. 7.2 LO 3/2007."],
        [S1, "dificil", "En un proceso contencioso por esa discriminación, ¿quién debe probar la ausencia de discriminación?", ["La Administración demandada", "La agente", "Ninguno"], "Art. 13.1 LO 3/2007."],
        [S1, "media", "La decisión discriminatoria del jefe es…", ["Nula y sin efecto", "Válida", "Anulable en diez años"], "Art. 10 LO 3/2007."],
        [S2, "media", "Las normas de igualdad del personal público se aplican a las Fuerzas y Cuerpos de Seguridad…", ["Adaptadas a las peculiaridades de sus funciones", "Nunca", "Solo a la Guardia Civil"], "Art. 68 LO 3/2007."],
        [S2, "media", "Es criterio general de actuación de los poderes públicos…", ["La protección de la maternidad", "La preferencia por los varones en ascensos", "El secreto de las retribuciones"], "Art. 14.7 LO 3/2007."],
        [S1, "media", "¿Puede recurrirse a los tribunales incluso tras terminar la relación en la que hubo discriminación?", ["Sí", "No", "Solo en el mes siguiente"], "Art. 12.1 LO 3/2007."],
        [S2, "media", "Integrar la igualdad en toda la actividad de la Administración es…", ["El principio de transversalidad", "El principio de legalidad penal", "La desconcentración"], "Art. 15 LO 3/2007."],
        [S1, "media", "La LO 3/2007 desarrolla los artículos de la Constitución…", ["9.2 y 14", "103 y 104", "1 y 2"], "Art. 1.1 LO 3/2007."],
      ],
    },
    {
      slug: "caso-trabajadora-victima-derechos",
      titulo: "Derechos de una trabajadora víctima",
      supuesto: "Una trabajadora de un comercio, con orden de protección frente a su expareja, necesita cambiar de horario y de centro porque él la espera a la salida. Además, ha faltado varios días al trabajo por la situación psicológica derivada de la violencia. Sus ingresos son muy bajos.",
      preguntas: [
        [S3, "media", "¿Tiene derecho a la reordenación de su tiempo de trabajo y al cambio de centro?", ["Sí, en los términos del Estatuto de los Trabajadores", "No", "Solo si lo acepta el agresor"], "Art. 21.1 LO 1/2004."],
        [S3, "media", "Sus ausencias derivadas de la situación psicológica se consideran…", ["Justificadas y remuneradas si lo determinan los servicios sociales o de salud", "Siempre injustificadas", "Causa de despido"], "Art. 21.4 LO 1/2004."],
        [S3, "media", "¿Con qué puede acreditar su situación para ejercer estos derechos?", ["Con la orden de protección", "Con una carta del agresor", "No necesita acreditarla"], "Art. 23 LO 1/2004."],
        [S3, "media", "Si suspende su contrato, ¿computa ese tiempo como cotización efectiva?", ["Sí, a efectos de prestaciones y desempleo", "No", "Solo la mitad"], "Art. 21.2 LO 1/2004."],
        [S3, "dificil", "Si sus rentas no superan el 75 % del SMI y tiene especiales dificultades de empleo, puede recibir…", ["Una ayuda de pago único equivalente a seis meses de subsidio por desempleo", "Una pensión vitalicia", "Nada"], "Art. 27 LO 1/2004."],
        [S3, "media", "¿Tiene prioridad en el acceso a viviendas protegidas?", ["Sí, como colectivo prioritario", "No", "Solo si tiene tres hijos"], "Art. 28 LO 1/2004."],
        [S5, "media", "Si la expareja la espera a la salida del trabajo, la orden de alejamiento le impide acercarse…", ["A ella en cualquier lugar, su domicilio, su trabajo y lugares que frecuente", "Solo al domicilio", "Solo de noche"], "Art. 64.3 LO 1/2004."],
        [S5, "media", "Puede acordarse el control del alejamiento mediante…", ["Instrumentos tecnológicos que verifiquen su incumplimiento", "Solo llamadas de la víctima", "Nada"], "Art. 64.3 LO 1/2004."],
        [S4, "media", "La Policía Local, al detectar que él la espera a la salida, debe…", ["Cooperar en asegurar el cumplimiento de la medida judicial", "Ignorarlo", "Avisar solo al empresario"], "Art. 31.2 LO 1/2004."],
        [S3, "media", "La empresa que la sustituya con un contrato de interinidad tiene derecho a…", ["Bonificación del 100 % de las cuotas empresariales por contingencias comunes", "Nada", "Una multa"], "Art. 21.3 LO 1/2004."],
      ],
    },
  ],
});
