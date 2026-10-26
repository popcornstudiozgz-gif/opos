/**
 * Crea tema-424 — Tema 2 de Administrativa/o (Ayto. Zaragoza, promoción
 * interna, CONV 5.2bis/2025, Parte primera rectificada en el BOPZ núm. 278 de
 * 3-12-2025): "Código de conducta."
 *
 * Tema dedicado: tema-17 (sección deberes-codigo-conducta) se reutiliza para
 * el Tema 1 «Deberes de los empleados públicos»; aquí se estudia el Código
 * de Conducta principio por principio y su desarrollo aragonés y municipal.
 *
 * Fuentes leídas íntegras en la sesión:
 * - TREBEP, RDLeg 5/2015 (BOE-A-2015-11719), arts. 52, 53 y 54, texto vigente
 *   comprobado en la API del BOE el 26-10-2026 (consolidado actualizado el
 *   14-10-2026; art. 53.4 en la redacción de la Ley 4/2023).
 * - Ley 5/2017, de 1 de junio, de Integridad y Ética Públicas de Aragón
 *   (BOE-A-2017-10292), arts. 3.1.b), 42, 43 y 44 (API del BOE): las
 *   entidades locales de Aragón forman parte de su «sector público de
 *   Aragón». No se afirma nada sobre el funcionamiento efectivo de la Agencia
 *   de Integridad y Ética Públicas que prevé.
 * - «Bases de comportamiento ético de las/os empleadas/os públicas/os» del
 *   Ayuntamiento de Zaragoza (zaragoza.es, PRTR-Bases-comportam-etico-
 *   empleados-publicos.pdf), dentro del Plan de Medidas Antifraude de los
 *   proyectos financiados con el Plan de Recuperación. No se ha localizado un
 *   código ético general aprobado para todo el personal municipal; el Código
 *   de Buen Gobierno de 14-11-2014 se dirige al equipo de gobierno, no al
 *   personal.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-424-codigo-conducta.mjs
 */
import { sembrarTema, ADMIN_AYTO } from "./lib/sembrar-tema.mjs";

const TREBEP = "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11719";
const LEY5_2017 = "https://www.boe.es/buscar/act.php?id=BOE-A-2017-10292";
const BASES_ETICAS = "https://www.zaragoza.es/contenidos/normativa/PRTR-Bases-comportam-etico-empleados-publicos.pdf";
const S1 = "codigo-conducta-art-52";
const S2 = "principios-eticos";
const S3 = "principios-conducta";
const S4 = "integridad-etica-aragon-zaragoza";

await sembrarTema({
  tema: {
    slug: "tema-424",
    titulo: "El Código de Conducta de los empleados públicos",
    descripcion: "TREBEP, arts. 52 a 54: principios que inspiran el Código de Conducta y su función en el régimen disciplinario; los doce principios éticos (art. 53) y los once principios de conducta (art. 54). Ley 5/2017 de Integridad y Ética Públicas de Aragón, aplicable a las entidades locales aragonesas: principios de actuación y código de conducta (arts. 42 y 44). Bases de comportamiento ético del Ayuntamiento de Zaragoza para la gestión de fondos del Plan de Recuperación.",
    contenido: "El Código de Conducta del TREBEP está formado por los principios éticos (art. 53: respeto a la Constitución, interés general, lealtad y buena fe, no discriminación, abstención ante conflictos de intereses, rechazo de privilegios, eficacia, no influir en trámites sin justa causa, diligencia, neutralidad y secreto o discreción) y por los principios de conducta (art. 54: respeto, diligencia y cumplimiento del horario, obediencia salvo infracción manifiesta, información al ciudadano, austeridad, rechazo de regalos, conservación de documentos, formación, seguridad y salud, propuestas de mejora y lengua oficial). Sus principios informan el régimen disciplinario. En Aragón, la Ley 5/2017 de Integridad y Ética Públicas lo hace obligatorio también en las entidades locales, y el Ayuntamiento de Zaragoza lo ha recogido en sus bases de comportamiento ético antifraude.",
    enlaces_boe: [
      { url: TREBEP, titulo: "Real Decreto Legislativo 5/2015, texto refundido del Estatuto Básico del Empleado Público (BOE-A-2015-11719)" },
      { url: LEY5_2017, titulo: "Ley 5/2017, de 1 de junio, de Integridad y Ética Públicas de Aragón (BOE-A-2017-10292)" },
      { url: BASES_ETICAS, titulo: "Ayuntamiento de Zaragoza: Bases de comportamiento ético de las/os empleadas/os públicas/os (Plan de Medidas Antifraude)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "Deberes y principios del Código de Conducta", articulos: "art. 52 TREBEP", url: `${TREBEP}#a52` },
      { seccion: S2, titulo: "Principios éticos", articulos: "art. 53 TREBEP", url: `${TREBEP}#a53` },
      { seccion: S3, titulo: "Principios de conducta", articulos: "art. 54 TREBEP", url: `${TREBEP}#a54` },
      { seccion: S4, titulo: "Integridad y ética pública en Aragón y en el Ayuntamiento de Zaragoza", articulos: "arts. 3, 42 y 44 Ley 5/2017; bases municipales", url: `${LEY5_2017}#a44` },
    ],
  },
  vinculo: { oposicion: ADMIN_AYTO.oposicion, bloqueId: ADMIN_AYTO.bloqueParte1, numero: 2 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Deber general de los empleados públicos (art. 52)", "Desempeñar con diligencia sus tareas y velar por los intereses generales con sujeción a la Constitución y al resto del ordenamiento"],
        ["Principios del art. 52 (lista)", "Objetividad, integridad, neutralidad, responsabilidad, imparcialidad, confidencialidad, dedicación al servicio público, transparencia, ejemplaridad, austeridad, accesibilidad, eficacia, honradez, promoción del entorno cultural y medioambiental y respeto a la igualdad entre mujeres y hombres"],
        ["¿Qué forma el Código de Conducta (art. 52)?", "Los principios éticos (art. 53) y los principios de conducta (art. 54)"],
        ["Código de Conducta y régimen disciplinario (art. 52)", "Sus principios y reglas informan la interpretación y aplicación del régimen disciplinario"],
      ],
      preguntas: [
        ["facil", "El Código de Conducta de los empleados públicos está configurado por:", ["Los principios éticos y los principios de conducta de los arts. 53 y 54 TREBEP", "Solo los derechos del art. 14", "Las faltas del art. 95"], "Art. 52 TREBEP."],
        ["media", "Los principios y reglas del Código de Conducta:", ["Informan la interpretación y aplicación del régimen disciplinario", "No tienen relación con el régimen disciplinario", "Sustituyen al régimen disciplinario"], "Art. 52, párrafo segundo, TREBEP."],
        ["media", "¿Cuál de estos NO figura entre los principios del art. 52 TREBEP?", ["Rentabilidad", "Ejemplaridad", "Austeridad"], "Art. 52 TREBEP."],
        ["dificil", "Entre los principios del art. 52 TREBEP figura expresamente:", ["La promoción del entorno cultural y medioambiental", "La productividad económica", "La jerarquía sindical"], "Art. 52 TREBEP."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Art. 53.1 y 2", "Respetar la Constitución y el ordenamiento; perseguir el interés general con criterios objetivos, al margen de posiciones personales, familiares, corporativas o clientelares"],
        ["Art. 53.3", "Lealtad y buena fe con la Administración, superiores, compañeros, subordinados y ciudadanos"],
        ["Art. 53.4", "Respeto a los derechos fundamentales, evitando toda discriminación (nacimiento, origen racial o étnico, género, sexo, orientación e identidad sexual, expresión de género, características sexuales, religión, opinión, discapacidad, edad...)"],
        ["Art. 53.5 y 6: conflictos de intereses", "Abstenerse en asuntos con interés personal y de actividades que puedan generar conflicto; no contraer obligaciones económicas ni negocios que puedan suponer conflicto con el puesto"],
        ["Art. 53.7", "No aceptar trato de favor o situación de privilegio o ventaja injustificada de particulares o entidades privadas"],
        ["Art. 53.8", "Actuar según eficacia, economía y eficiencia y vigilar el interés general y los objetivos de la organización"],
        ["Art. 53.9", "No influir en agilizar o resolver trámites sin justa causa, y nunca para privilegiar a cargos públicos o su entorno o en perjuicio de terceros"],
        ["Art. 53.10 y 11", "Diligencia y resolución en plazo; dedicación al servicio público y neutralidad"],
        ["Art. 53.12", "Secreto de las materias clasificadas o de difusión prohibida y discreción sobre lo conocido por el cargo, sin usar la información en beneficio propio o de terceros"],
      ],
      preguntas: [
        ["facil", "Según el art. 53 TREBEP, los empleados públicos se abstendrán:", ["En aquellos asuntos en los que tengan un interés personal", "De atender a ciudadanos de otros municipios", "De participar en la formación"], "Art. 53.5 TREBEP."],
        ["media", "No influir en la agilización o resolución de un trámite sin justa causa es un:", ["Principio ético del art. 53", "Principio de conducta del art. 54", "Derecho individual del art. 14"], "Art. 53.9 TREBEP."],
        ["media", "Guardar secreto de materias clasificadas y discreción sobre lo conocido por razón del cargo es un:", ["Principio ético", "Principio de conducta", "Derecho retributivo"], "Art. 53.12 TREBEP."],
        ["media", "El principio de lealtad y buena fe se exige respecto de:", ["La Administración, superiores, compañeros, subordinados y ciudadanos", "Solo los superiores", "Solo los ciudadanos"], "Art. 53.3 TREBEP."],
        ["dificil", "Contraer obligaciones económicas con personas cuando pueda suponer un conflicto de intereses con el puesto:", ["Está vedado por los principios éticos", "Está permitido si se comunica", "Solo está prohibido a los directivos"], "Art. 53.6 TREBEP."],
        ["media", "Resolver dentro de plazo los procedimientos de su competencia forma parte del principio ético de:", ["Diligencia", "Austeridad", "Accesibilidad"], "Art. 53.10 TREBEP."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Art. 54.1 y 2", "Tratar con atención y respeto a ciudadanos, superiores y compañeros; desempeño diligente cumpliendo la jornada y el horario"],
        ["Art. 54.3: obediencia", "Obedecer las órdenes profesionales salvo infracción manifiesta del ordenamiento, que se pondrá inmediatamente en conocimiento de los órganos de inspección"],
        ["Art. 54.4", "Informar a los ciudadanos sobre lo que tengan derecho a conocer y facilitarles el ejercicio de derechos y obligaciones"],
        ["Art. 54.5", "Administrar los recursos y bienes públicos con austeridad, sin usarlos en provecho propio o de allegados, y velar por su conservación"],
        ["Art. 54.6: regalos", "Rechazar cualquier regalo, favor o servicio en condiciones ventajosas que vaya más allá de los usos habituales, sociales y de cortesía, sin perjuicio del Código Penal"],
        ["Art. 54.7 a 9", "Garantizar la constancia y permanencia de los documentos; mantener actualizada la formación; observar las normas de seguridad y salud laboral"],
        ["Art. 54.10 y 11", "Proponer mejoras para el funcionamiento de la unidad; atender al ciudadano en la lengua oficial que solicite"],
      ],
      preguntas: [
        ["facil", "Ante una orden de un superior que constituya una infracción manifiesta del ordenamiento, el empleado público:", ["No la obedecerá y la pondrá inmediatamente en conocimiento de los órganos de inspección", "La obedecerá en todo caso", "La obedecerá y la comunicará después"], "Art. 54.3 TREBEP."],
        ["media", "Respecto a los regalos, el empleado público rechazará:", ["Los que vayan más allá de los usos habituales, sociales y de cortesía", "Cualquier regalo, incluso de cortesía", "Solo los superiores a 100 euros"], "Art. 54.6 TREBEP."],
        ["media", "Mantener actualizada la formación y cualificación es un:", ["Principio de conducta", "Principio ético", "Derecho exclusivamente"], "Art. 54.8 TREBEP."],
        ["media", "Garantizar la constancia y permanencia de los documentos para entregarlos a sus posteriores responsables es un principio de:", ["Conducta", "Ética", "Retribución"], "Art. 54.7 TREBEP."],
        ["dificil", "Según el art. 54.11 TREBEP, los empleados públicos garantizarán la atención al ciudadano:", ["En la lengua que lo solicite siempre que sea oficial en el territorio", "Solo en castellano", "En cualquier lengua que solicite"], "Art. 54.11 TREBEP."],
        ["media", "Observar las normas sobre seguridad y salud laboral es, según el TREBEP:", ["Un principio de conducta", "Una mera recomendación", "Una obligación solo del personal de oficios"], "Art. 54.9 TREBEP."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Ley aragonesa de integridad (identificación)", "Ley 5/2017, de 1 de junio, de Integridad y Ética Públicas (BOE-A-2017-10292)"],
        ["¿Se aplica la Ley 5/2017 al Ayuntamiento de Zaragoza?", "Sí: el «sector público de Aragón» incluye las entidades locales de Aragón y sus organismos públicos (art. 3.1.b)"],
        ["Principios de actuación de la Ley 5/2017 (art. 42.1)", "Legalidad; dedicación al servicio público; eficacia; profesionalidad; integridad y responsabilidad; transparencia y rendición de cuentas; ejemplaridad, austeridad y honradez; servicio efectivo al ciudadano; igualdad entre hombres y mujeres; objetividad, neutralidad e imparcialidad; confidencialidad; accesibilidad; entorno cultural y medioambiental"],
        ["Código de conducta en la Ley 5/2017 (art. 44.1 y 2)", "Los empleados ajustan su actuación al código de conducta del TREBEP y de la legislación aragonesa de función pública; pueden aprobarse códigos específicos para colectivos"],
        ["Publicación y formación (art. 44.3 y 4)", "Los códigos de conducta se publican íntegros en el BOA; los planes de formación incluyen acciones anuales para su divulgación"],
        ["Bases de comportamiento ético del Ayuntamiento de Zaragoza", "Parte del Plan de Medidas Antifraude de los proyectos financiados con el Plan de Recuperación: recogen los arts. 52-54 TREBEP y 42-44 de la Ley 5/2017 y añaden pautas de transparencia y confidencialidad para quien gestiona esos fondos"],
      ],
      preguntas: [
        ["media", "La Ley aragonesa 5/2017, de Integridad y Ética Públicas, se aplica al Ayuntamiento de Zaragoza porque:", ["Su sector público de Aragón incluye a las entidades locales aragonesas", "Lo aprobó el Pleno municipal", "Solo se aplica a la Administración autonómica"], "Art. 3.1.b) Ley 5/2017."],
        ["media", "Según la Ley 5/2017, los códigos de conducta se publicarán íntegros en:", ["El Boletín Oficial de Aragón", "El BOE", "Solo la intranet"], "Art. 44.3 Ley 5/2017."],
        ["dificil", "Entre los principios de actuación del art. 42 de la Ley 5/2017 figura expresamente:", ["La transparencia y rendición de cuentas", "La competitividad", "La reserva de información al ciudadano"], "Art. 42.1.f) Ley 5/2017."],
        ["media", "Las «Bases de comportamiento ético» del Ayuntamiento de Zaragoza se enmarcan en:", ["El Plan de Medidas Antifraude de los proyectos del Plan de Recuperación", "El Reglamento Orgánico Municipal", "El Código Penal"], "Bases de comportamiento ético (zaragoza.es)."],
        ["media", "Según la Ley 5/2017, los sistemas de gestión del rendimiento deben incluir, al valorar la conducta profesional:", ["Criterios que garanticen la observancia de los deberes y principios del código", "Solo criterios de productividad", "Nada relativo a la ética"], "Art. 44.5 Ley 5/2017."],
      ],
    },
  ],
  glosario: [
    [S1, "Código de Conducta", "Conjunto de principios éticos y de conducta de los arts. 52 a 54 del TREBEP que guían la actuación de los empleados públicos."],
    [S2, "Conflicto de intereses", "Situación en que un interés personal o privado puede influir en la actuación pública del empleado; obliga a abstenerse (art. 53.5)."],
    [S2, "Neutralidad", "Actuación al margen de preferencias políticas, ideológicas o personales en el ejercicio del servicio público (art. 53.11)."],
    [S2, "Deber de discreción", "Obligación de no divulgar ni aprovechar la información conocida por razón del cargo (art. 53.12)."],
    [S3, "Usos sociales y de cortesía", "Límite que separa los obsequios admisibles de los regalos que deben rechazarse (art. 54.6)."],
    [S4, "Integridad pública", "Actuación de los servidores públicos conforme a valores éticos y al interés general, objeto de la Ley aragonesa 5/2017."],
  ],
  casos: [
    {
      slug: "adm-ayto-codigo-regalo-proveedor",
      titulo: "El regalo de un proveedor",
      supuesto: "Trabajas como administrativa en la unidad que tramita contratos menores de material de oficina. En Navidad, un proveedor habitual te envía una caja con un jamón y una tarjeta en la que te agradece «lo rápido que salieron sus facturas». Días después, un concejal te pide que adelantes el expediente de una empresa de un familiar suyo, saltándote el orden.",
      preguntas: [
        [S3, "media", "Ante el jamón del proveedor, lo adecuado es:", ["Rechazarlo, porque va más allá de los usos habituales, sociales y de cortesía", "Aceptarlo, porque es Navidad", "Aceptarlo y repartirlo en la oficina sin decir nada"], "Art. 54.6 TREBEP."],
        [S2, "media", "No aceptar trato de favor o ventaja injustificada de particulares es un principio:", ["Ético", "De conducta", "Retributivo"], "Art. 53.7 TREBEP."],
        [S2, "media", "Adelantar el expediente de la empresa del familiar del concejal sin justa causa vulnera el principio ético de:", ["No influir en la agilización de trámites para privilegiar a cargos públicos o su entorno", "Formación continua", "Atención en lengua oficial"], "Art. 53.9 TREBEP."],
        [S3, "media", "Si el concejal lo ordena de forma expresa y supone una infracción manifiesta:", ["No debe obedecerse y debe comunicarse a los órganos de inspección", "Debe obedecerse siempre", "Debe obedecerse y luego quejarse"], "Art. 54.3 TREBEP."],
        [S1, "facil", "Estos principios, además de orientar tu conducta:", ["Informan la aplicación del régimen disciplinario", "No tienen efecto alguno", "Solo se aplican al personal directivo"], "Art. 52 TREBEP."],
        [S2, "media", "Si el proveedor fuera tu hermano, en sus expedientes deberías:", ["Abstenerte por tener un interés personal", "Tramitarlos con preferencia", "Firmarlos sin revisar"], "Art. 53.5 TREBEP."],
        [S1, "media", "Velar por los intereses generales con sujeción a la Constitución y al ordenamiento es un deber del:", ["Art. 52 TREBEP", "Art. 95 TREBEP", "Art. 48 TREBEP"], "Art. 52 TREBEP."],
        [S4, "media", "Como empleada de una entidad local aragonesa, también te afecta el código de conducta según:", ["La Ley 5/2017 de Integridad y Ética Públicas de Aragón", "Solo el Código Civil", "Ninguna norma autonómica"], "Arts. 3.1.b) y 44 Ley 5/2017."],
        [S2, "dificil", "Actuar con criterios objetivos al margen de posiciones personales, familiares, corporativas o clientelares responde al principio ético de:", ["Persecución del interés general con imparcialidad", "Austeridad", "Formación"], "Art. 53.2 TREBEP."],
        [S3, "media", "Tratar con atención y respeto al proveedor al devolverle el regalo es un principio de:", ["Conducta", "Ética exclusivamente", "Retribución"], "Art. 54.1 TREBEP."],
      ],
    },
    {
      slug: "adm-ayto-codigo-datos-vecino",
      titulo: "Los datos de un vecino conocido",
      supuesto: "En la Junta Municipal donde trabajas, un compañero consulta por curiosidad el expediente de ayudas sociales de un vecino famoso del barrio y lo comenta en el bar. Además, se lleva a casa el portátil municipal para uso familiar los fines de semana y no ha hecho ningún curso de formación en cinco años.",
      preguntas: [
        [S2, "media", "Comentar en el bar datos del expediente vulnera el principio de:", ["Discreción sobre lo conocido por razón del cargo", "Austeridad", "Accesibilidad"], "Art. 53.12 TREBEP."],
        [S2, "dificil", "Además, usar la información obtenida en beneficio propio o de terceros:", ["Está expresamente vedado por el art. 53.12", "Está permitido si no hay perjuicio", "Solo es una falta de cortesía"], "Art. 53.12 TREBEP."],
        [S3, "media", "Usar el portátil municipal para la familia vulnera el principio de:", ["Administrar los bienes públicos con austeridad, sin usarlos en provecho propio o de allegados", "Lealtad sindical", "Formación"], "Art. 54.5 TREBEP."],
        [S3, "media", "Además, el empleado tiene el deber de velar por:", ["La conservación de los bienes públicos", "El precio de mercado de los bienes", "La venta de los bienes viejos"], "Art. 54.5 TREBEP."],
        [S3, "media", "No hacer formación en cinco años choca con el principio de:", ["Mantener actualizada la formación y cualificación", "Neutralidad política", "Lengua oficial"], "Art. 54.8 TREBEP."],
        [S1, "media", "La confidencialidad figura entre los principios:", ["Del art. 52 que inspiran el Código de Conducta", "Retributivos", "De la Ley de Contratos"], "Art. 52 TREBEP."],
        [S1, "media", "Si estas conductas dieran lugar a un expediente disciplinario, los principios del código:", ["Informarían la interpretación del régimen disciplinario", "No podrían tenerse en cuenta", "Anularían el expediente"], "Art. 52, párrafo segundo, TREBEP."],
        [S3, "media", "Si un ciudadano pregunta por el estado de su propio expediente, el empleado debe:", ["Informarle de lo que tiene derecho a conocer", "Negarse siempre", "Remitirle al juzgado"], "Art. 54.4 TREBEP."],
        [S4, "media", "Según la Ley 5/2017, el incumplimiento del código de conducta:", ["Podrá ser objeto de denuncia ante la Agencia de Integridad y Ética Públicas que prevé esa ley", "No puede denunciarse", "Solo puede denunciarse ante el juzgado"], "Art. 44.6 Ley 5/2017."],
        [S2, "facil", "Respetar la Constitución y el resto del ordenamiento jurídico es el primer:", ["Principio ético", "Principio de conducta", "Derecho del empleado"], "Art. 53.1 TREBEP."],
      ],
    },
    {
      slug: "adm-ayto-codigo-fondos-europeos",
      titulo: "Gestionar un proyecto con fondos europeos",
      supuesto: "Te asignan a la unidad que gestiona un proyecto municipal financiado con el Plan de Recuperación, Transformación y Resiliencia. Tu jefa te entrega las «Bases de comportamiento ético» del Ayuntamiento. Una empresa licitadora te pide información adelantada sobre la valoración de las ofertas de sus competidores.",
      preguntas: [
        [S4, "media", "Las bases que te entregan forman parte de:", ["El Plan de Medidas Antifraude del Ayuntamiento para proyectos del Plan de Recuperación", "El Reglamento de Honores", "El convenio colectivo del personal laboral"], "Bases de comportamiento ético (zaragoza.es)."],
        [S4, "media", "Esas bases recogen como marco general:", ["Los arts. 52 a 54 del TREBEP y los arts. 42 a 44 de la Ley 5/2017", "Solo el Código Penal", "Solo el Reglamento europeo de protección de datos"], "Bases de comportamiento ético (zaragoza.es)."],
        [S2, "media", "Facilitar a la licitadora información sobre ofertas ajenas vulneraría el principio ético de:", ["Discreción y no uso de la información en beneficio de terceros", "Formación", "Lengua oficial"], "Art. 53.12 TREBEP."],
        [S4, "media", "Según las bases municipales, la transparencia en estos proyectos:", ["No puede ir en detrimento del uso correcto de la información confidencial", "Obliga a difundir todo, incluso datos confidenciales", "No se aplica"], "Bases de comportamiento ético, apartado 4."],
        [S2, "media", "Si tuvieras participaciones en la empresa licitadora, deberías:", ["Abstenerte por conflicto de intereses", "Valorar sus ofertas con preferencia", "Ocultarlo"], "Art. 53.5 y 6 TREBEP."],
        [S4, "dificil", "Entre las materias en que las bases piden un cumplimiento riguroso de la normativa figuran:", ["La prevención del fraude y el control de los conflictos de interés y la contratación pública", "Solo el horario de trabajo", "Solo la imagen corporativa"], "Bases de comportamiento ético, apartado 1."],
        [S3, "media", "Garantizar que los documentos del proyecto se conserven para quien te sustituya es un principio de:", ["Conducta", "Retribución", "Negociación colectiva"], "Art. 54.7 TREBEP."],
        [S2, "media", "Vigilar la consecución del interés general y los objetivos de la organización con eficacia, economía y eficiencia es un principio:", ["Ético", "De conducta", "Disciplinario"], "Art. 53.8 TREBEP."],
        [S1, "media", "La transparencia figura entre los principios del art. 52 TREBEP:", ["Sí", "No", "Solo para altos cargos"], "Art. 52 TREBEP."],
        [S3, "media", "Si se te ocurre una forma de mejorar el control de las facturas del proyecto, debes:", ["Ponerla en conocimiento de tus superiores o de los órganos competentes", "Aplicarla por tu cuenta sin decir nada", "Callarla"], "Art. 54.10 TREBEP."],
      ],
    },
  ],
});
