/**
 * Crea tema-385 — Tema 13 de Administrativo DGA (tema 8 del programa de
 * materias específicas): "Los Contratos del Sector Público (I): Legislación
 * aplicable. Objeto y ámbito de aplicación. Negocios y contratos excluidos.
 * Tipos de contratos y régimen jurídico aplicable. Partes en el contrato.
 * Objeto, precio y cuantía. Garantías exigibles y modificación de los
 * contratos. Normas de la Comunidad Autónoma de Aragón."
 *
 * Fuentes (textos consolidados leídos en esta sesión en la API del BOE):
 * - Ley 9/2017, de Contratos del Sector Público (BOE-A-2017-12902), que
 *   transpone las Directivas 2014/23/UE y 2014/24/UE: arts. 1-11, 12-22
 *   (con los umbrales de regulación armonizada vigentes en el texto
 *   consolidado: 5.404.000 €, 140.000 € y 216.000 €, y 750.000 € para los
 *   servicios del anexo IV), 25-27, 29, 31-32, 61-62, 65-66, 71, 74, 77,
 *   99-102, 106-111 y 203-207.
 * - Ley 11/2023, de 30 de marzo, de uso estratégico de la contratación
 *   pública de la Comunidad Autónoma de Aragón (BOE-A-2023-10876): arts.
 *   1-5, 89-98 y 117-120. Hecho señalado: la Ley 3/2011 de medidas en
 *   materia de Contratos del Sector Público de Aragón (BOE-A-2011-6241),
 *   que todavía citan muchos temarios, está derogada desde el 17-05-2023
 *   por la Ley 11/2023 (dato del propio BOE).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-385-contratos-sector-publico-i.mjs
 */
import { sembrarTema, ADMIN_DGA } from "./lib/sembrar-tema.mjs";

const LCSP = "https://www.boe.es/buscar/act.php?id=BOE-A-2017-12902";
const L11 = "https://www.boe.es/buscar/act.php?id=BOE-A-2023-10876";
const S1 = "legislacion-objeto-ambito-contratos";
const S2 = "negocios-contratos-excluidos";
const S3 = "tipos-contratos-regimen-juridico";
const S4 = "partes-contrato-aptitud-solvencia";
const S5 = "objeto-precio-cuantia-duracion";
const S6 = "garantias-modificacion-contratos";
const S7 = "normas-contratacion-aragon";

await sembrarTema({
  tema: {
    slug: "tema-385",
    titulo: "Contratos del Sector Público (I): legislación, ámbito, exclusiones, tipos de contratos, partes, precio, garantías, modificación y normas de Aragón",
    descripcion: "Legislación aplicable: Ley 9/2017 de Contratos del Sector Público y Ley 11/2023 de uso estratégico de la contratación pública de Aragón. Objeto, principios y ámbito subjetivo. Negocios y contratos excluidos, convenios y encargos a medios propios. Tipos de contratos (obras, concesión de obras, concesión de servicios, suministro, servicios y mixtos), contratos sujetos a regulación armonizada y umbrales, contratos administrativos y privados y jurisdicción. Partes: órgano de contratación, responsable del contrato, aptitud, prohibiciones, solvencia y clasificación. Objeto, presupuesto base, valor estimado, precio y duración. Garantías provisional, definitiva y complementaria. Modificación de los contratos. Órganos de contratación, mesas, Junta de Contratación Pública y Tribunal Administrativo de Contratos Públicos de Aragón.",
    contenido: "Qué contratos firma la Administración y con qué reglas: cuándo un encargo es de obras, de suministro o de servicios, a partir de qué importe se aplican las normas europeas, quién puede contratar con el Gobierno de Aragón y qué garantías debe depositar, cómo se calculan el valor estimado y el precio y cuánto se puede modificar un contrato ya firmado. Incluye los órganos aragoneses que intervienen: consejeros como órganos de contratación, mesas de contratación con representantes de Servicios Jurídicos e Intervención, la Junta de Contratación Pública y el tribunal que resuelve los recursos.",
    enlaces_boe: [
      { url: LCSP, titulo: "Ley 9/2017, de 8 de noviembre, de Contratos del Sector Público (BOE-A-2017-12902)" },
      { url: L11, titulo: "Ley 11/2023, de 30 de marzo, de uso estratégico de la contratación pública de la Comunidad Autónoma de Aragón (BOE-A-2023-10876)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "Legislación aplicable, objeto, principios y ámbito subjetivo", articulos: "arts. 1-3 LCSP; arts. 1-3 Ley 11/2023", url: `${LCSP}#a1` },
      { seccion: S2, titulo: "Negocios y contratos excluidos; convenios y encargos a medios propios", articulos: "arts. 4-11 y 31-32 LCSP", url: `${LCSP}#a4` },
      { seccion: S3, titulo: "Tipos de contratos, regulación armonizada y régimen jurídico", articulos: "arts. 12-22 y 25-27 LCSP", url: `${LCSP}#a1-4` },
      { seccion: S4, titulo: "Partes: órgano de contratación y contratista", articulos: "arts. 61-62, 65-66, 71, 74 y 77 LCSP", url: `${LCSP}#a6-3` },
      { seccion: S5, titulo: "Objeto, presupuesto, valor estimado, precio y duración", articulos: "arts. 29 y 99-102 LCSP", url: `${LCSP}#a9-11` },
      { seccion: S6, titulo: "Garantías y modificación de los contratos", articulos: "arts. 106-111 y 203-207 LCSP", url: `${LCSP}#a1-18` },
      { seccion: S7, titulo: "Normas de la Comunidad Autónoma de Aragón", articulos: "arts. 1-5, 89-98 y 117-120 Ley 11/2023", url: `${L11}#a1` },
    ],
  },
  vinculo: { oposicion: ADMIN_DGA.oposicion, bloqueId: ADMIN_DGA.bloqueDerecho, numero: 13 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Ley de Contratos del Sector Público", "Ley 9/2017, de 8 de noviembre, que transpone las Directivas 2014/23/UE y 2014/24/UE"],
        ["Principios de la contratación (art. 1.1 LCSP)", "Libertad de acceso a las licitaciones, publicidad y transparencia, no discriminación e igualdad de trato, integridad, estabilidad presupuestaria y selección de la oferta económicamente más ventajosa"],
        ["Criterios sociales y medioambientales (art. 1.3 LCSP)", "Se incorporan de manera transversal y preceptiva cuando guarden relación con el objeto; se facilita el acceso de pymes y economía social"],
        ["Contratos del sector público (art. 2.1 LCSP)", "Los contratos onerosos, cualquiera que sea su naturaleza, que celebren las entidades del art. 3; onerosidad: el contratista obtiene un beneficio económico directo o indirecto"],
        ["Ámbito subjetivo (art. 3 LCSP)", "AGE, CCAA, entidades locales, organismos autónomos, universidades públicas, consorcios, fundaciones públicas, entidades públicas empresariales y sociedades con más del 50 % de capital público, entre otros"],
        ["Vocabulario común (art. 2.4 LCSP)", "Las prestaciones se identifican con el CPV, Vocabulario común de contratos públicos de la Unión Europea"],
        ["Ley 11/2023 de Aragón: objeto (art. 1)", "Regula el uso estratégico de la contratación pública en Aragón (planificada, ecológica, social, innovadora) y su sistema de gobernanza"],
        ["Ley 11/2023: ámbito (art. 2)", "Entes del sector público autonómico y local de Aragón que tengan la condición de poder adjudicador"],
      ],
      preguntas: [
        ["facil", "La norma básica estatal vigente en materia de contratación pública es:", ["La Ley 9/2017, de Contratos del Sector Público", "El Real Decreto Legislativo 3/2011", "La Ley 30/2007", "La Ley 3/2011 de Aragón"], "LCSP, BOE-A-2017-12902."],
        ["media", "Según el art. 2 LCSP, un contrato es oneroso cuando:", ["El contratista obtiene algún tipo de beneficio económico, directo o indirecto", "Se paga siempre en metálico", "Supera los 15.000 euros", "Lo firma una Administración territorial"], "Art. 2.1 LCSP."],
        ["media", "¿Cuál de estos principios figura en el art. 1 LCSP?", ["Libertad de acceso a las licitaciones", "Preferencia de las empresas locales", "Secreto de las ofertas una vez adjudicado", "Adjudicación siempre al precio más bajo"], "Art. 1.1 LCSP."],
        ["media", "Una sociedad mercantil con un 60 % de capital del Gobierno de Aragón:", ["Forma parte del sector público a efectos de la LCSP", "Queda fuera de la LCSP", "Es una Administración Pública", "Solo se rige por el Código de Comercio"], "Art. 3.1.h) LCSP."],
        ["media", "La Ley 11/2023 de Aragón se aplica a:", ["Los entes del sector público autonómico y local de Aragón con condición de poder adjudicador", "Solo a la Administración de la Comunidad Autónoma", "Solo a los ayuntamientos", "A todas las empresas privadas aragonesas"], "Art. 2 Ley 11/2023."],
        ["dificil", "Según la LCSP, los criterios sociales y medioambientales en la contratación:", ["Se incorporan de manera transversal y preceptiva siempre que guarden relación con el objeto del contrato", "Son opcionales", "Están prohibidos por restringir la competencia", "Solo se aplican a contratos armonizados"], "Art. 1.3 LCSP; en Aragón, art. 3.2 Ley 11/2023."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Régimen de lo excluido (art. 4 LCSP)", "Se rige por sus normas especiales; los principios de la LCSP se aplican para resolver dudas y lagunas"],
        ["Convenios excluidos (art. 6 LCSP)", "Los convenios entre entidades públicas cuyo contenido no sea contractual, siempre que no tengan vocación de mercado (se presume si hacen en el mercado el 20 % o más de la actividad)"],
        ["Dominio público y patrimonio (art. 9 LCSP)", "Excluidas las autorizaciones y concesiones demaniales y la compraventa, donación, permuta o arrendamiento de inmuebles, valores y propiedades incorporales (salvo programas de ordenador)"],
        ["Ámbito financiero (art. 10 LCSP)", "Excluidos los servicios financieros relativos a valores, los prestados por el Banco de España y los préstamos y operaciones de tesorería"],
        ["Relaciones de servicio y laborales (art. 11.1 LCSP)", "La relación de servicio de los funcionarios y los contratos laborales están excluidos"],
        ["Otros excluidos (art. 11 LCSP)", "Servicios públicos con tarifa o tasa general para el usuario, arbitraje y conciliación, servicios de campañas políticas de partidos y prestación de servicios sociales sin contrato"],
        ["Cooperación vertical y horizontal (art. 31 LCSP)", "Las entidades del sector público pueden cooperar mediante encargos a medios propios (vertical) o convenios (horizontal), sin que sea un contrato"],
        ["Encargo a medio propio (art. 32 LCSP)", "Ejecución directa de prestaciones contractuales a través de otra persona jurídica que es medio propio (control análogo, más del 80 % de actividad para el ente que encarga); no es un contrato"],
      ],
      preguntas: [
        ["media", "La relación de servicio de un funcionario con la Administración:", ["Está excluida de la LCSP", "Es un contrato de servicios", "Es un contrato administrativo especial", "Es un contrato privado de la Administración"], "Art. 11.1 LCSP."],
        ["media", "El arrendamiento de un local por parte del Gobierno de Aragón para oficinas:", ["Está excluido de la LCSP y se rige por la legislación patrimonial", "Es un contrato de suministro", "Es un contrato de servicios", "Es un contrato de obras"], "Art. 9.2 LCSP."],
        ["media", "Una concesión de uso privativo sobre un bien de dominio público autonómico:", ["Está excluida de la LCSP y se rige por su legislación específica", "Es un contrato de concesión de servicios", "Es un contrato mixto", "Es un contrato de obras"], "Art. 9.1 LCSP."],
        ["dificil", "Un encargo a un medio propio personificado que cumple los requisitos legales:", ["No tiene la consideración de contrato", "Es un contrato de servicios sujeto a licitación", "Es un convenio de colaboración en todo caso", "Es una subvención"], "Art. 32.1 LCSP."],
        ["media", "Los convenios entre Administraciones quedan excluidos de la LCSP, entre otras condiciones, si las entidades:", ["No tienen vocación de mercado", "Superan el umbral armonizado", "Son de distintos Estados", "Lo autoriza el Tribunal de Cuentas"], "Art. 6.1.a) LCSP."],
        ["media", "Los negocios excluidos de la LCSP se rigen por sus normas especiales y:", ["Los principios de la LCSP se aplican para resolver dudas y lagunas", "No se les aplica nunca la LCSP", "Se rigen por el Código Civil exclusivamente", "Se someten al Derecho de la UE directamente"], "Art. 4 LCSP."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Contrato de obras (art. 13 LCSP)", "Ejecución de una obra (resultado de trabajos de construcción o ingeniería civil sobre un inmueble), aislada o con la redacción del proyecto; debe referirse a una obra completa"],
        ["Concesión de obras (art. 14 LCSP)", "Realización de obras cuya contraprestación es el derecho a explotarlas (con o sin precio), con transferencia del riesgo operacional al concesionario"],
        ["Concesión de servicios (art. 15 LCSP)", "Gestión de un servicio de titularidad del poder adjudicador cuya contrapartida es el derecho a explotarlo, con riesgo operacional para el concesionario"],
        ["Contrato de suministro (art. 16 LCSP)", "Adquisición, arrendamiento financiero o arrendamiento de productos o bienes muebles; incluye equipos informáticos, programas no hechos a medida, fabricación y energía"],
        ["Contrato de servicios (art. 17 LCSP)", "Prestaciones de hacer (actividad o resultado distinto de obra o suministro); no pueden implicar ejercicio de autoridad"],
        ["Contrato mixto (art. 18 LCSP)", "Contiene prestaciones de distinta clase; para su adjudicación se atiende, en general, a la prestación principal"],
        ["Regulación armonizada: obras y concesiones (art. 20 LCSP)", "Valor estimado igual o superior a 5.404.000 €"],
        ["Regulación armonizada: suministros y servicios (arts. 21-22 LCSP)", "140.000 € (AGE, organismos autónomos, Seguridad Social) o 216.000 € (resto, como las CCAA); 750.000 € para servicios sociales y del anexo IV"],
        ["Contratos administrativos (art. 25 LCSP)", "Obras, concesiones, suministro y servicios celebrados por una Administración Pública (salvo ciertos servicios financieros, artísticos y suscripciones) y los administrativos especiales"],
        ["Contratos privados (art. 26 LCSP)", "Los demás de las Administraciones y todos los de poderes adjudicadores que no son Administración y de entidades que no son poder adjudicador"],
        ["Jurisdicción (art. 27 LCSP)", "Contencioso: preparación, adjudicación, efectos y extinción de los administrativos y preparación y adjudicación de los privados de las Administraciones; civil: efectos y extinción de los privados"],
      ],
      preguntas: [
        ["media", "La adquisición de ordenadores y programas estándar por el Gobierno de Aragón es un contrato de:", ["Suministro", "Servicios", "Obras", "Concesión de servicios"], "Art. 16.3.b) LCSP."],
        ["media", "La adquisición de un programa informático desarrollado a medida es un contrato de:", ["Servicios", "Suministro", "Obras", "Contrato privado excluido"], "Art. 16.3.b) LCSP."],
        ["dificil", "¿Qué elemento distingue la concesión de servicios del contrato de servicios?", ["La transferencia al concesionario del riesgo operacional en la explotación", "El importe", "La duración inferior a un año", "Que la firme un ayuntamiento"], "Arts. 14.4 y 15.2 LCSP."],
        ["media", "Un contrato de servicios del Gobierno de Aragón está sujeto a regulación armonizada si su valor estimado es igual o superior a:", ["216.000 euros", "140.000 euros", "5.404.000 euros", "750.000 euros"], "Art. 22.1.b) LCSP: entidades distintas de la AGE."],
        ["media", "Un contrato de obras está sujeto a regulación armonizada cuando su valor estimado es igual o superior a:", ["5.404.000 euros", "216.000 euros", "1.000.000 euros", "500.000 euros"], "Art. 20.1 LCSP."],
        ["media", "Los contratos de servicios no pueden tener por objeto:", ["Servicios que impliquen ejercicio de la autoridad inherente a los poderes públicos", "Prestaciones de hacer", "Servicios a precio unitario", "Servicios de limpieza"], "Art. 17 LCSP."],
        ["media", "Las controversias sobre efectos y extinción de un contrato privado de una Administración Pública corresponden a:", ["La jurisdicción civil", "La jurisdicción contencioso-administrativa", "La jurisdicción social", "El Tribunal de Cuentas"], "Art. 27.2.a) LCSP."],
        ["facil", "Un contrato de obras celebrado por una Administración Pública tiene carácter:", ["Administrativo", "Privado", "Laboral", "Mercantil"], "Art. 25.1.a) LCSP."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Órgano de contratación (art. 61 LCSP)", "Órgano unipersonal o colegiado que tiene atribuida la facultad de celebrar contratos en nombre de la entidad; puede delegar o desconcentrar"],
        ["Responsable del contrato (art. 62 LCSP)", "Designado por el órgano de contratación para supervisar la ejecución y dictar instrucciones; en obras, el Director Facultativo"],
        ["Condiciones de aptitud (art. 65 LCSP)", "Plena capacidad de obrar, no estar incurso en prohibición de contratar y acreditar solvencia económica, financiera y técnica o, cuando se exija, clasificación"],
        ["Personas jurídicas (art. 66 LCSP)", "Solo pueden ser adjudicatarias de contratos cuyas prestaciones estén dentro de sus fines u objeto según sus estatutos"],
        ["Prohibiciones de contratar (art. 71 LCSP)", "Condenas por delitos como corrupción, cohecho o fraude; sanciones graves; concurso o insolvencia; no estar al corriente con Hacienda y Seguridad Social; falsedad; incompatibilidades de altos cargos; entre otras"],
        ["Solvencia (art. 74 LCSP)", "Condiciones mínimas económicas y técnicas fijadas por el órgano de contratación, vinculadas al objeto y proporcionales, indicadas en el anuncio y en el pliego"],
        ["Clasificación (art. 77 LCSP)", "Obligatoria en contratos de obras de valor estimado igual o superior a 500.000 €; por debajo, es una forma alternativa de acreditar la solvencia"],
      ],
      preguntas: [
        ["media", "Para contratar con el sector público, el empresario debe, entre otros requisitos:", ["Tener plena capacidad de obrar, no estar incurso en prohibición y acreditar solvencia", "Estar domiciliado en España", "Tener más de diez trabajadores", "Haber contratado antes con la misma Administración"], "Art. 65.1 LCSP."],
        ["media", "La clasificación del empresario es requisito indispensable en los contratos de obras de valor estimado igual o superior a:", ["500.000 euros", "40.000 euros", "5.404.000 euros", "1.000.000 euros"], "Art. 77.1.a) LCSP."],
        ["media", "No hallarse al corriente de las obligaciones tributarias o con la Seguridad Social es:", ["Una prohibición de contratar", "Un criterio de adjudicación", "Una causa de modificación del contrato", "Irrelevante para contratar"], "Art. 71.1.d) LCSP."],
        ["media", "En un contrato de obras, las facultades del responsable del contrato las ejerce:", ["El Director Facultativo", "El interventor", "El jefe de la mesa de contratación", "El contratista"], "Art. 62.2 LCSP."],
        ["dificil", "Una sociedad cuyo objeto social es exclusivamente la limpieza industrial puede ser adjudicataria de:", ["Contratos cuyas prestaciones estén comprendidas en sus fines u objeto estatutario", "Cualquier contrato", "Solo contratos menores", "Solo contratos de obras"], "Art. 66.1 LCSP."],
        ["media", "Los requisitos mínimos de solvencia deben ser:", ["Vinculados al objeto del contrato y proporcionales a él", "Iguales para todos los contratos", "Fijados libremente por la empresa", "Secretos hasta la adjudicación"], "Art. 74.2 LCSP."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["Objeto del contrato (art. 99 LCSP)", "Debe ser determinado; puede definirse por necesidades o funcionalidades; prohibido fraccionarlo para eludir publicidad o procedimiento"],
        ["División en lotes (art. 99.3 LCSP)", "Regla general siempre que el objeto lo permita; no dividir debe justificarse en el expediente"],
        ["Presupuesto base de licitación (art. 100 LCSP)", "Límite máximo de gasto que puede comprometerse, IVA incluido salvo disposición en contrario; adecuado a precios de mercado y desglosado"],
        ["Valor estimado (art. 101 LCSP)", "Importe total sin IVA pagadero según estimaciones, incluidas prórrogas, opciones, primas y modificaciones previstas; determina umbrales y procedimientos"],
        ["Precio (art. 102 LCSP)", "Siempre cierto; se abona según la prestación realmente ejecutada; el IVA se indica como partida independiente; adecuado al mercado"],
        ["Prórroga (art. 29.2 LCSP)", "Obligatoria para el empresario si se preavisa con al menos dos meses; nunca por consentimiento tácito"],
        ["Duración de suministros y servicios (art. 29.4 LCSP)", "Máximo cinco años incluidas prórrogas (salvo excepciones por recuperación de inversiones y otras)"],
        ["Duración de concesiones (art. 29.6 LCSP)", "Hasta 40 años (obras o servicios con obras), 25 años (servicios no sanitarios) o 10 años (servicios sanitarios), incluidas prórrogas"],
      ],
      preguntas: [
        ["media", "El presupuesto base de licitación es:", ["El límite máximo de gasto que puede comprometer el órgano de contratación, IVA incluido salvo disposición en contrario", "El precio ofertado por el adjudicatario", "El valor estimado sin IVA", "El importe de la garantía"], "Art. 100.1 LCSP."],
        ["media", "El valor estimado del contrato se calcula:", ["Sin incluir el IVA y teniendo en cuenta prórrogas y modificaciones previstas", "Con IVA y sin prórrogas", "Solo con el primer año", "Sumando la garantía definitiva"], "Art. 101 LCSP."],
        ["media", "Fraccionar un contrato para disminuir su cuantía y eludir la publicidad:", ["Está prohibido", "Está permitido si se justifica", "Es obligatorio en contratos menores", "Solo lo puede hacer el Gobierno"], "Art. 99.2 LCSP."],
        ["media", "La duración máxima de un contrato de servicios de prestación sucesiva, incluidas prórrogas, es con carácter general de:", ["Cinco años", "Cuatro años", "Diez años", "Dos años"], "Art. 29.4 LCSP."],
        ["dificil", "Para que la prórroga sea obligatoria para el empresario, el preaviso debe producirse al menos con una antelación de:", ["Dos meses a la finalización del contrato, salvo que el pliego fije uno mayor", "Un mes", "Quince días", "Seis meses"], "Art. 29.2 LCSP."],
        ["media", "Según el art. 102 LCSP, en el precio del contrato:", ["Se incluye el IVA, que se indicará como partida independiente", "No se incluye nunca el IVA", "Solo se incluye el beneficio industrial", "Se incluye la garantía definitiva"], "Art. 102.1 LCSP."],
      ],
    },
    {
      seccion: S6,
      flashcards: [
        ["Garantía provisional (art. 106 LCSP)", "Excepcional y motivada por interés público; máximo del 3 % del presupuesto base de licitación sin IVA; responde del mantenimiento de las ofertas"],
        ["Garantía definitiva (art. 107 LCSP)", "5 % del precio final ofertado sin IVA, a cargo del licitador con la mejor oferta; el órgano puede eximir justificadamente, pero no en obras ni concesiones de obras"],
        ["Garantía complementaria (art. 107.2 LCSP)", "Hasta otro 5 % en casos especiales (por ejemplo, oferta inicialmente anormal), pudiendo llegar la total al 10 %"],
        ["Formas de la garantía (art. 108 LCSP)", "Efectivo o valores de Deuda Pública, aval de entidad de crédito o sociedad de garantía recíproca, o seguro de caución"],
        ["Reposición de la garantía (art. 109 LCSP)", "Si se cobran penalidades sobre ella, debe reponerse en 15 días; también se reajusta en 15 días si cambia el precio por modificación"],
        ["Qué cubre la garantía definitiva (art. 110 LCSP)", "Formalización en plazo, penalidades, correcta ejecución, daños por demora o incumplimiento, incautación por resolución y vicios durante el plazo de garantía"],
        ["Devolución (art. 111 LCSP)", "Tras vencer el plazo de garantía y cumplir el contrato; el acuerdo se adopta en dos meses o se pagan intereses"],
        ["Potestad de modificación (art. 203 LCSP)", "Solo por interés público y si está prevista en el pliego (art. 204) o, excepcionalmente, en los supuestos del art. 205; si no, resolución y nuevo contrato"],
        ["Modificaciones previstas (art. 204 LCSP)", "Hasta el 20 % del precio inicial, con cláusula clara, precisa e inequívoca en el pliego; sin nuevos precios unitarios"],
        ["Modificaciones no previstas (art. 205 LCSP)", "Prestaciones adicionales o circunstancias imprevisibles (cada una hasta el 50 % del precio inicial) y modificaciones no sustanciales; solo lo estrictamente indispensable"],
        ["Obligatoriedad (art. 206 LCSP)", "Las modificaciones del art. 205 son obligatorias para el contratista si no superan el 20 % del precio inicial; si lo superan, requieren su conformidad o se resuelve"],
        ["Publicidad de la modificación (art. 207.3 LCSP)", "Anuncio en el perfil de contratante en 5 días desde su aprobación; en armonizados, en ciertos casos, también en el DOUE"],
      ],
      preguntas: [
        ["media", "La garantía definitiva en los contratos de las Administraciones Públicas es, con carácter general, del:", ["5 % del precio final ofertado, IVA excluido", "3 % del presupuesto base", "10 % del valor estimado", "2 % del precio con IVA"], "Art. 107.1 LCSP."],
        ["media", "La garantía provisional:", ["Solo se exige excepcionalmente, de forma motivada, y no puede superar el 3 % del presupuesto base sin IVA", "Es siempre obligatoria", "Es del 5 % del precio", "Sustituye a la definitiva"], "Art. 106 LCSP."],
        ["dificil", "¿En qué contratos NO puede eximirse de la garantía definitiva?", ["En los de obras y concesión de obras", "En los de suministro de consumibles", "En los de servicios sociales", "En los privados del art. 25.1.a)"], "Art. 107.1 LCSP."],
        ["media", "Si se hacen efectivas penalidades sobre la garantía definitiva, el contratista debe reponerla en:", ["Quince días", "Un mes", "Dos meses", "Diez días hábiles"], "Art. 109.2 LCSP."],
        ["media", "Las modificaciones previstas en el pliego pueden alcanzar como máximo:", ["El 20 % del precio inicial", "El 50 % del precio inicial", "El 10 % del precio inicial", "El 100 % del precio"], "Art. 204.1 LCSP."],
        ["media", "Una modificación no prevista del art. 205 es obligatoria para el contratista cuando:", ["No excede del 20 % del precio inicial, IVA excluido", "No excede del 50 %", "Lo decide la mesa", "Siempre"], "Art. 206.1 LCSP."],
        ["media", "Si es necesario ejecutar un contrato de forma distinta a la pactada fuera de los supuestos legales de modificación:", ["Debe resolverse y celebrarse otro contrato", "Se modifica sin límites", "Se prorroga", "Se convierte en contrato menor"], "Art. 203.2 LCSP."],
        ["media", "¿Cuál de estas NO es una forma admisible de prestar la garantía definitiva?", ["Un pagaré del propio contratista", "Aval bancario", "Seguro de caución", "Efectivo en la Caja General de Depósitos"], "Art. 108.1 LCSP."],
      ],
    },
    {
      seccion: S7,
      flashcards: [
        ["Ley 3/2011 de Aragón", "Antigua ley aragonesa de medidas en contratación; derogada desde el 17 de mayo de 2023 por la Ley 11/2023"],
        ["Principios de la Ley 11/2023 (art. 3)", "Buena administración e integridad, acceso y transparencia, igualdad de trato, acceso de pymes y economía social, eficiencia, estabilidad presupuestaria, racionalización, competencia y diseño universal"],
        ["Órganos de contratación en Aragón (art. 89 Ley 11/2023)", "Los titulares de los departamentos y los órganos de los organismos públicos que digan sus estatutos"],
        ["Autorización del Gobierno de Aragón (art. 89.4 Ley 11/2023)", "Preceptiva para licitar, modificar y resolver contratos y encargos de valor estimado superior a tres millones de euros"],
        ["Mesa de contratación (art. 91 Ley 11/2023)", "Obligatoria en procedimientos abierto, simplificado, restringido, diálogo competitivo, licitación con negociación y asociación para la innovación; potestativa en el simplificado abreviado y negociados no armonizados con criterios automáticos"],
        ["Composición de la mesa (art. 92 Ley 11/2023)", "Presidencia (voto de calidad), secretaría y al menos tres vocales; en la Administración autonómica, dos vocales representan a Servicios Jurídicos y a la Intervención General; no pueden formar parte cargos electos, de designación política ni eventuales"],
        ["Comité de expertos (art. 95 Ley 11/2023)", "Valora los criterios sujetos a juicio de valor; número impar no inferior a tres; composición publicada en el perfil de contratante"],
        ["Junta de Contratación Pública de Aragón (arts. 97-98 Ley 11/2023)", "Órgano consultivo y de supervisión en contratación del sector público autonómico y local; adscrito al departamento competente"],
        ["Tribunal Administrativo de Contratos Públicos de Aragón (arts. 117-119 Ley 11/2023)", "Órgano colegiado con independencia funcional que resuelve los recursos especiales en materia de contratación; presidencia y al menos dos vocales con mandato de seis años improrrogables"],
      ],
      preguntas: [
        ["media", "La norma autonómica vigente sobre contratación pública en Aragón es:", ["La Ley 11/2023, de uso estratégico de la contratación pública de la Comunidad Autónoma de Aragón", "La Ley 3/2011, de medidas en materia de Contratos del Sector Público de Aragón", "El Decreto Legislativo 1/2023", "La Ley 5/2021"], "La Ley 3/2011 está derogada desde el 17-05-2023."],
        ["media", "En la Administración de la Comunidad Autónoma de Aragón son órganos de contratación, en todo caso:", ["Los titulares de los departamentos", "Los jefes de servicio", "Las mesas de contratación", "El Tribunal Administrativo de Contratos Públicos"], "Art. 89.1 Ley 11/2023."],
        ["dificil", "Es preceptiva la autorización del Gobierno de Aragón para licitar contratos cuyo valor estimado sea superior a:", ["Tres millones de euros", "Un millón de euros", "5.404.000 euros", "216.000 euros"], "Art. 89.4 Ley 11/2023."],
        ["media", "En las mesas de contratación de la Administración autonómica, dos de los vocales representan a:", ["La Dirección General de Servicios Jurídicos y la Intervención General", "Las Cortes de Aragón y el Justicia", "Los sindicatos y las empresas", "La Cámara de Cuentas y el Consejo Consultivo"], "Art. 92.1 Ley 11/2023."],
        ["media", "¿Quién NO puede formar parte de una mesa de contratación según la Ley 11/2023?", ["Una persona con cargo de designación política", "Un funcionario técnico del servicio", "Un representante de la Intervención General", "Un letrado de los Servicios Jurídicos"], "Art. 92.3 Ley 11/2023."],
        ["media", "Los recursos especiales en materia de contratación en el ámbito autonómico aragonés los resuelve:", ["El Tribunal Administrativo de Contratos Públicos de Aragón", "La Junta de Contratación Pública de Aragón", "El consejero de Hacienda", "El TSJ de Aragón directamente"], "Art. 118 Ley 11/2023."],
        ["media", "El mandato de los miembros del Tribunal Administrativo de Contratos Públicos de Aragón es de:", ["Seis años improrrogables", "Cuatro años prorrogables", "Cinco años", "Indefinido"], "Art. 119.3 Ley 11/2023."],
      ],
    },
  ],
  glosario: [
    [S1, "Poder adjudicador", "Entidad del sector público (como una Administración o un organismo creado para necesidades de interés general) sometida a las reglas más estrictas de adjudicación de la LCSP."],
    [S1, "CPV", "Vocabulario común de contratos públicos de la Unión Europea, con códigos que identifican cada tipo de prestación."],
    [S2, "Medio propio personificado", "Entidad pública o privada controlada por un poder adjudicador como si fuera un servicio propio, a la que este puede hacer encargos sin licitar."],
    [S3, "Riesgo operacional", "Riesgo de que el concesionario no recupere su inversión porque la demanda o el suministro reales no sean los esperados; distingue las concesiones de los contratos de obras y servicios."],
    [S3, "Regulación armonizada", "Régimen reforzado de publicidad y procedimiento, derivado de las directivas europeas, para contratos que superan determinados umbrales."],
    [S4, "Solvencia", "Capacidad económica, financiera y técnica o profesional del empresario para ejecutar el contrato."],
    [S4, "Clasificación", "Acreditación oficial de la solvencia de un empresario por grupos, subgrupos y categorías, exigible en obras de 500.000 € o más."],
    [S5, "Valor estimado", "Importe total sin IVA que se prevé pagar durante toda la vida del contrato, incluidas prórrogas y modificaciones previstas."],
    [S5, "Presupuesto base de licitación", "Importe máximo, IVA incluido, que la Administración puede gastar en el contrato."],
    [S6, "Seguro de caución", "Seguro por el que una aseguradora garantiza a la Administración el pago de la garantía si el contratista incumple."],
    [S7, "Mesa de contratación", "Órgano técnico que asiste al órgano de contratación: califica la documentación, valora las ofertas y propone la adjudicación."],
    [S7, "Perfil de contratante", "Espacio web donde el órgano de contratación publica la información de sus licitaciones y contratos."],
  ],
  casos: [
    {
      slug: "contrato-limpieza-edificios",
      titulo: "Contratar la limpieza de varios edificios",
      supuesto: "Un departamento del Gobierno de Aragón quiere contratar la limpieza de sus edificios durante tres años, con posibilidad de prorrogar otros dos, por un importe anual de 120.000 euros sin IVA. El jefe de servicio sugiere firmar tres contratos de un año para «agilizar».",
      preguntas: [
        [S3, "facil", "Este contrato es de:", ["Servicios", "Suministro", "Obras", "Concesión de servicios"], "Art. 17 LCSP."],
        [S5, "media", "El valor estimado, incluidas las prórrogas, es de:", ["600.000 euros", "360.000 euros", "120.000 euros", "726.000 euros"], "Art. 101 LCSP: 5 años × 120.000 €, sin IVA."],
        [S3, "media", "Con ese valor estimado, ¿está sujeto a regulación armonizada?", ["Sí, porque supera 216.000 euros", "No, porque no supera 5.404.000 euros", "No, porque cada año son 120.000 euros", "Solo si lo decide la mesa"], "Arts. 19 y 22.1.b) LCSP."],
        [S5, "media", "La propuesta de firmar tres contratos anuales para rebajar la cuantía:", ["Supondría un fraccionamiento prohibido", "Es correcta", "Es obligatoria", "Solo requiere informe de la Intervención"], "Art. 99.2 LCSP."],
        [S5, "media", "La duración total prevista (tres años más dos de prórroga):", ["Respeta el máximo general de cinco años", "Supera el máximo legal", "Solo sería posible en una concesión", "Requiere ley"], "Art. 29.4 LCSP."],
        [S5, "media", "Para que la prórroga sea obligatoria para la empresa, el preaviso debe hacerse al menos con:", ["Dos meses de antelación", "Un mes", "Quince días", "Seis meses"], "Art. 29.2 LCSP."],
        [S6, "media", "La empresa adjudicataria deberá constituir una garantía definitiva del:", ["5 % del precio final ofertado, IVA excluido", "3 % del presupuesto", "10 % del valor estimado", "No hay garantía en servicios"], "Art. 107.1 LCSP."],
        [S7, "media", "Como no supera tres millones de euros, ¿necesita autorización del Gobierno de Aragón?", ["No; basta la del órgano de contratación", "Sí, siempre", "Sí, porque es armonizado", "Solo si hay prórroga"], "Art. 89.4 Ley 11/2023."],
        [S7, "media", "El órgano de contratación será:", ["El titular del departamento", "El jefe de servicio", "La mesa de contratación", "El Gobierno de Aragón en todo caso"], "Art. 89.1 Ley 11/2023."],
        [S4, "media", "Una empresa de limpieza que no está al corriente con la Seguridad Social:", ["Está incursa en prohibición de contratar", "Puede ser adjudicataria si ofrece el mejor precio", "Solo pierde puntos", "Debe aportar una garantía mayor"], "Art. 71.1.d) LCSP."],
      ],
    },
    {
      slug: "obra-centro-salud-modificacion",
      titulo: "La obra de un centro de salud que necesita cambios",
      supuesto: "El Gobierno de Aragón adjudicó por 2.000.000 euros sin IVA la construcción de un centro de salud. El pliego preveía una posible modificación del 10 % por cambios en la normativa técnica. Durante la obra aparecen restos arqueológicos imprevisibles y hay que rediseñar la cimentación.",
      preguntas: [
        [S3, "facil", "Es un contrato de:", ["Obras", "Servicios", "Concesión de obras", "Suministro"], "Art. 13 LCSP."],
        [S4, "media", "Por su valor estimado, la empresa debió estar:", ["Clasificada como contratista de obras", "Inscrita solo en el registro mercantil", "Exenta de solvencia", "Clasificada solo si es extranjera"], "Art. 77.1.a) LCSP: obras de 500.000 € o más."],
        [S6, "media", "La modificación prevista en el pliego por cambios técnicos podía alcanzar hasta:", ["El 10 % previsto, dentro del límite legal del 20 %", "El 50 % del precio", "Cualquier importe", "El 5 %"], "Art. 204.1 LCSP."],
        [S6, "media", "Los restos arqueológicos imprevisibles podrían justificar una modificación no prevista del art. 205 por:", ["Circunstancias sobrevenidas e imprevisibles", "Mera conveniencia del director de obra", "Petición del contratista", "Cambio de consejero"], "Art. 205.2.b) LCSP."],
        [S6, "dificil", "Esa modificación por circunstancias imprevisibles no puede superar, aislada o conjuntamente con otras del art. 205:", ["El 50 % del precio inicial, IVA excluido", "El 20 %", "El 10 %", "El 100 %"], "Art. 205.2.b) LCSP."],
        [S6, "media", "Si la modificación supone un 15 % del precio, ¿es obligatoria para el contratista?", ["Sí, porque no excede del 20 % del precio inicial", "No, nunca es obligatoria", "Solo si la acepta por escrito", "Solo con autorización judicial"], "Art. 206.1 LCSP."],
        [S6, "media", "La modificación debe limitarse a:", ["Las variaciones estrictamente indispensables para responder a la causa", "Lo que pida la empresa", "Cualquier mejora útil", "Un máximo de diez unidades de obra"], "Art. 205.1.b) LCSP."],
        [S6, "media", "Al cambiar el precio por la modificación, la garantía definitiva:", ["Debe reajustarse en quince días desde la notificación", "No cambia nunca", "Se devuelve", "Se duplica automáticamente"], "Art. 109.3 LCSP."],
        [S6, "media", "Aprobada la modificación, debe publicarse un anuncio en el perfil de contratante en el plazo de:", ["Cinco días", "Un mes", "Quince días", "Tres meses"], "Art. 207.3 LCSP."],
        [S6, "media", "En este contrato de obras, ¿podía el órgano de contratación haber eximido a la empresa de la garantía definitiva?", ["No, en las obras no cabe la exención", "Sí, justificándolo en el pliego", "Sí, si la empresa es pyme", "Sí, si es armonizado"], "Art. 107.1 LCSP."],
      ],
    },
    {
      slug: "mesa-contratacion-composicion",
      titulo: "Preparar la mesa de contratación",
      supuesto: "Para un procedimiento abierto de suministro de mobiliario de oficinas por 300.000 euros sin IVA, la secretaria general técnica de un departamento prepara la mesa de contratación. El director general propone incluir a un asesor eventual de su gabinete «porque conoce bien el tema». Además, el contrato requerirá valorar el diseño con criterios de juicio de valor.",
      preguntas: [
        [S7, "media", "En un procedimiento abierto, la mesa de contratación es:", ["De constitución obligatoria", "Potestativa", "Sustituida por una unidad técnica", "Innecesaria si hay comité de expertos"], "Art. 91.1 Ley 11/2023."],
        [S7, "media", "La mesa estará formada al menos por:", ["Presidencia, secretaría y tres vocales", "Presidencia y un vocal", "Cinco vocales sin presidencia", "El órgano de contratación y el interventor"], "Art. 92.1 Ley 11/2023."],
        [S7, "media", "Dos vocales obligatorios en la Administración autonómica son representantes de:", ["Servicios Jurídicos e Intervención General", "Las empresas licitadoras", "Las Cortes de Aragón", "El Consejo Consultivo"], "Art. 92.1 Ley 11/2023."],
        [S7, "dificil", "¿Puede formar parte de la mesa el asesor eventual del gabinete?", ["No, el personal eventual no puede formar parte de las mesas", "Sí, si tiene titulación", "Sí, con voz pero sin voto", "Sí, si lo autoriza el Gobierno"], "Art. 92.3 Ley 11/2023."],
        [S7, "media", "En caso de empate en la mesa:", ["La presidencia tiene voto de calidad", "Decide el órgano de contratación", "Se repite la votación hasta desempatar", "Decide la secretaría"], "Art. 92.1 Ley 11/2023."],
        [S7, "media", "La composición de la mesa debe publicarse:", ["En el perfil de contratante antes de su constitución, con el cargo de sus miembros", "Solo en el BOA tras la adjudicación", "No se publica", "En el tablón del departamento"], "Art. 92.5 Ley 11/2023."],
        [S7, "media", "Para valorar el diseño con criterios de juicio de valor puede intervenir:", ["Un comité de expertos de número impar no inferior a tres", "El propio director general", "Un único experto externo", "La Junta de Contratación Pública"], "Art. 95 Ley 11/2023."],
        [S3, "media", "La compra de mobiliario es un contrato de:", ["Suministro", "Servicios", "Obras", "Concesión de servicios"], "Art. 16.1 LCSP."],
        [S3, "media", "Con un valor estimado de 300.000 euros, el suministro del Gobierno de Aragón:", ["Está sujeto a regulación armonizada (umbral de 216.000 €)", "No está sujeto (umbral de 5.404.000 €)", "No está sujeto (umbral de 750.000 €)", "Está excluido de la LCSP"], "Art. 21.1.b) LCSP."],
        [S7, "media", "Si una empresa quiere recurrir la adjudicación por la vía del recurso especial, lo resolverá:", ["El Tribunal Administrativo de Contratos Públicos de Aragón", "La propia mesa", "El consejero", "La Junta de Contratación Pública"], "Art. 118 Ley 11/2023."],
      ],
    },
  ],
});
