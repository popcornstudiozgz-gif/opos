/**
 * Crea tema-409 — Tema 2 de Operario/a Especialista (Ayto. Zaragoza, CONV
 * 5/2026, Anexo I): "La Ley del Procedimiento Administrativo Común de las
 * Administraciones Públicas: disposiciones sobre el procedimiento
 * administrativo común. Los empleados públicos: clases, derechos y deberes,
 * adquisición y pérdida de la relación de servicio, situaciones
 * administrativas y régimen disciplinario."
 *
 * Tema dedicado: tema-7 (Título IV de la LPAC) y tema-43 (empleados
 * públicos, sin situaciones administrativas) son canónicos distintos y cada
 * número solo admite uno.
 *
 * Fuentes leídas en la API del BOE en esta sesión:
 * - Ley 39/2015, de Procedimiento Administrativo Común (BOE-A-2015-10565),
 *   Título IV «De las disposiciones sobre el procedimiento administrativo
 *   común» (arts. 53-105), con lectura literal de los arts. 21, 24, 53, 66,
 *   68, 73, 80, 82, 83, 84 y 96.
 * - Texto refundido del Estatuto Básico del Empleado Público, RDLeg 5/2015
 *   (BOE-A-2015-11719): arts. 8-12 (clases), 14-15 (derechos), 52-54
 *   (deberes y código de conducta), 56 y 62-63 y 67 (adquisición y
 *   pérdida), 85-90 (situaciones) y 93-98 (régimen disciplinario).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-409-procedimiento-empleados-publicos.mjs
 */
import { sembrarTema, OPERARIO } from "./lib/sembrar-tema.mjs";

const LPAC = "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565";
const EBEP = "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11719";
const S1 = "lpac-derechos-iniciacion";
const S2 = "lpac-ordenacion-instruccion";
const S3 = "lpac-finalizacion-plazos-silencio";
const S4 = "ebep-clases-derechos-deberes";
const S5 = "ebep-adquisicion-perdida-situaciones";
const S6 = "ebep-regimen-disciplinario";

await sembrarTema({
  tema: {
    slug: "tema-409",
    titulo: "El procedimiento administrativo común (Título IV de la Ley 39/2015) y los empleados públicos: clases, derechos y deberes, adquisición y pérdida, situaciones y régimen disciplinario",
    descripcion: "Ley 39/2015: derechos del interesado en el procedimiento; iniciación de oficio y a solicitud, contenido de las solicitudes, subsanación en 10 días y declaración responsable; ordenación (expediente, impulso, cumplimiento de trámites en 10 días); instrucción (informes, trámite de audiencia de 10 a 15 días, información pública de al menos 20 días); finalización (resolución, desistimiento, renuncia, caducidad), tramitación simplificada, plazo máximo para resolver y silencio administrativo; ejecución. Texto refundido del EBEP: clases de empleados públicos (funcionarios de carrera e interinos, laborales y eventuales); derechos individuales y colectivos; deberes y código de conducta; requisitos de acceso, adquisición y pérdida de la condición de funcionario; jubilación; situaciones administrativas (servicio activo, servicios especiales, servicio en otras Administraciones, excedencias y suspensión de funciones); régimen disciplinario: faltas, sanciones y prescripción.",
    contenido: "Cómo se tramita un expediente desde la solicitud hasta la resolución (plazos, audiencia, silencio) y qué significa ser empleado público: tipos de personal, derechos y deberes, cómo se entra y se sale, en qué situaciones puedes estar y qué faltas y sanciones existen.",
    enlaces_boe: [
      { url: LPAC, titulo: "Ley 39/2015, de 1 de octubre, del Procedimiento Administrativo Común de las Administraciones Públicas (BOE-A-2015-10565)" },
      { url: EBEP, titulo: "Real Decreto Legislativo 5/2015, de 30 de octubre, texto refundido de la Ley del Estatuto Básico del Empleado Público (BOE-A-2015-11719)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "Derechos del interesado e iniciación del procedimiento", articulos: "arts. 53-69 Ley 39/2015", url: `${LPAC}#a53` },
      { seccion: S2, titulo: "Ordenación e instrucción del procedimiento", articulos: "arts. 70-83 Ley 39/2015", url: `${LPAC}#a70` },
      { seccion: S3, titulo: "Finalización, plazos para resolver y silencio administrativo", articulos: "arts. 21, 24 y 84-105 Ley 39/2015", url: `${LPAC}#a84` },
      { seccion: S4, titulo: "Clases de empleados públicos, derechos y deberes", articulos: "arts. 8-15 y 52-54 TREBEP", url: `${EBEP}#a8` },
      { seccion: S5, titulo: "Adquisición y pérdida de la relación de servicio y situaciones administrativas", articulos: "arts. 56, 62-68 y 85-92 TREBEP", url: `${EBEP}#a62` },
      { seccion: S6, titulo: "Régimen disciplinario", articulos: "arts. 93-98 TREBEP", url: `${EBEP}#a93` },
    ],
  },
  vinculo: { oposicion: OPERARIO.oposicion, bloqueId: OPERARIO.bloque, numero: 2 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Derechos del interesado (art. 53)", "Conocer el estado de tramitación y obtener copia de documentos; identificar al personal responsable; no presentar originales ni documentos que ya tenga la Administración; formular alegaciones antes del trámite de audiencia; actuar asistido de asesor"],
        ["Formas de iniciación (art. 54)", "De oficio (por acuerdo del órgano competente: propia iniciativa, orden superior, petición razonada de otros órganos o denuncia) o a solicitud del interesado"],
        ["Contenido de la solicitud (art. 66)", "Nombre y apellidos; medio o lugar de notificación; hechos, razones y petición; lugar y fecha; firma; y órgano al que se dirige con su código de identificación"],
        ["Subsanación (art. 68)", "Si la solicitud está incompleta se requiere al interesado para que la subsane en 10 días, advirtiendo que si no lo hace se le tendrá por desistido; el plazo puede ampliarse hasta 5 días más salvo en procesos selectivos o de concurrencia competitiva"],
        ["Recibo de presentación (art. 66.3)", "El interesado puede exigir el recibo que acredite la fecha y hora de presentación de solicitudes y escritos"],
        ["Declaración responsable y comunicación (art. 69)", "Declaración responsable: el interesado manifiesta bajo su responsabilidad que cumple los requisitos y que lo acreditará si se le pide. Comunicación: pone en conocimiento de la Administración sus datos o el inicio de una actividad"],
      ],
      preguntas: [
        ["facil", "El plazo general para subsanar una solicitud incompleta es de:", ["10 días", "15 días", "1 mes"], "Art. 68.1 Ley 39/2015."],
        ["media", "Si el interesado no subsana la solicitud en plazo:", ["Se le tiene por desistido de su petición, previa resolución", "Se le impone una multa", "La solicitud se tramita igualmente"], "Art. 68.1 Ley 39/2015."],
        ["media", "El plazo de subsanación puede ampliarse hasta 5 días, salvo en:", ["Procedimientos selectivos o de concurrencia competitiva", "Procedimientos iniciados de oficio", "Procedimientos sancionadores"], "Art. 68.2 Ley 39/2015."],
        ["media", "¿Cuál de estos NO es un derecho del interesado según el art. 53?", ["Elegir al funcionario que tramita su expediente", "No presentar documentos originales salvo excepción", "Actuar asistido de asesor"], "Art. 53.1 Ley 39/2015."],
        ["facil", "Un procedimiento puede iniciarse:", ["De oficio o a solicitud del interesado", "Solo a solicitud del interesado", "Solo por denuncia"], "Art. 54 Ley 39/2015."],
        ["media", "¿Qué dato debe contener la solicitud además de los hechos y la petición?", ["El órgano al que se dirige y su código de identificación", "El número de cuenta bancaria", "La firma de dos testigos"], "Art. 66.1.f) Ley 39/2015."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Expediente administrativo (art. 70)", "Conjunto ordenado de documentos y actuaciones que sirven de antecedente y fundamento a la resolución; se forma por agregación ordenada y se tramita en formato electrónico"],
        ["Impulso de oficio (art. 71)", "El procedimiento se impulsa de oficio en todos sus trámites; se sigue el orden riguroso de incoación en asuntos de naturaleza homogénea, salvo orden motivada en contrario"],
        ["Cumplimiento de trámites (art. 73)", "Los trámites a cargo de los interesados deben realizarse en 10 días desde la notificación, salvo plazo distinto; si no, se les puede declarar decaídos en su derecho al trámite"],
        ["Informes (art. 80)", "Salvo disposición en contrario son facultativos y no vinculantes, y se emiten en 10 días"],
        ["Trámite de audiencia (art. 82)", "Instruido el procedimiento, e inmediatamente antes de la propuesta de resolución, se pone de manifiesto a los interesados, que tienen entre 10 y 15 días para alegar y presentar documentos"],
        ["Información pública (art. 83)", "Se anuncia en el Diario oficial para que cualquier persona examine el expediente; el plazo de alegaciones no puede ser inferior a 20 días; comparecer no da por sí solo la condición de interesado"],
      ],
      preguntas: [
        ["media", "Salvo plazo distinto, los trámites a cargo de los interesados deben cumplirse en:", ["10 días", "5 días", "20 días"], "Art. 73.1 Ley 39/2015."],
        ["media", "En el trámite de audiencia, los interesados disponen de un plazo:", ["No inferior a 10 días ni superior a 15", "De 5 días exactos", "De un mes"], "Art. 82.2 Ley 39/2015."],
        ["media", "El plazo de alegaciones en el trámite de información pública no puede ser inferior a:", ["20 días", "10 días", "15 días"], "Art. 83.2 Ley 39/2015."],
        ["media", "Salvo disposición expresa en contrario, los informes son:", ["Facultativos y no vinculantes", "Preceptivos y vinculantes", "Preceptivos y no vinculantes"], "Art. 80.1 Ley 39/2015."],
        ["dificil", "El trámite de audiencia se realiza:", ["Una vez instruido el procedimiento e inmediatamente antes de redactar la propuesta de resolución", "Al inicio del procedimiento", "Después de notificar la resolución"], "Art. 82.1 Ley 39/2015."],
        ["facil", "El procedimiento se impulsa:", ["De oficio en todos sus trámites", "Solo a instancia del interesado", "Solo si lo pide un juez"], "Art. 71.1 Ley 39/2015."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Terminación (art. 84)", "Ponen fin al procedimiento la resolución, el desistimiento, la renuncia al derecho (si no está prohibida) y la caducidad; también la imposibilidad material de continuarlo por causas sobrevenidas"],
        ["Obligación de resolver (art. 21)", "La Administración debe dictar resolución expresa y notificarla; el plazo máximo lo fija la norma de cada procedimiento y no puede superar 6 meses salvo ley o Derecho de la UE; si no hay plazo fijado, es de 3 meses"],
        ["Silencio en procedimientos a solicitud (art. 24)", "Por regla general es estimatorio; es desestimatorio en el derecho de petición, en la transferencia de facultades sobre dominio o servicio público, en actividades que dañen el medio ambiente, en responsabilidad patrimonial y en la impugnación de actos"],
        ["Desistimiento y renuncia (art. 94)", "Todo interesado puede desistir de su solicitud o, si no está prohibido, renunciar a su derecho; el desistimiento no impide volver a pedir lo mismo y la renuncia sí extingue el derecho"],
        ["Caducidad a instancia del interesado (art. 95)", "Si el procedimiento se paraliza por causa del interesado, se le advierte y, pasados 3 meses sin que haga lo necesario, se acuerda el archivo"],
        ["Tramitación simplificada (art. 96)", "Por interés público o falta de complejidad; debe resolverse en 30 días desde la notificación del acuerdo, con alegaciones de 5 días al inicio y audiencia solo si la resolución va a ser desfavorable"],
        ["Medios de ejecución forzosa (art. 100)", "Apremio sobre el patrimonio, ejecución subsidiaria, multa coercitiva y compulsión sobre las personas, respetando siempre el principio de proporcionalidad"],
      ],
      preguntas: [
        ["facil", "Si la norma del procedimiento no fija plazo máximo para resolver, este es de:", ["3 meses", "6 meses", "1 mes"], "Art. 21.3 Ley 39/2015."],
        ["media", "El plazo máximo para resolver no puede exceder, salvo ley o Derecho de la UE, de:", ["6 meses", "1 año", "3 meses"], "Art. 21.2 Ley 39/2015."],
        ["media", "En los procedimientos iniciados a solicitud del interesado, el silencio es, como regla general:", ["Estimatorio", "Desestimatorio", "Neutro, sin efectos"], "Art. 24.1 Ley 39/2015."],
        ["dificil", "¿En cuál de estos procedimientos el silencio es desestimatorio?", ["En los de responsabilidad patrimonial", "En la solicitud de una licencia de obra menor sin norma especial", "En cualquier procedimiento iniciado a solicitud"], "Art. 24.1 Ley 39/2015."],
        ["media", "Un procedimiento tramitado de forma simplificada debe resolverse en:", ["30 días", "10 días", "3 meses"], "Art. 96.6 Ley 39/2015."],
        ["media", "¿Cuál de estos NO pone fin al procedimiento según el art. 84?", ["El trámite de audiencia", "El desistimiento", "La caducidad"], "Art. 84 Ley 39/2015."],
        ["dificil", "¿Cuál de estos es un medio de ejecución forzosa del art. 100?", ["La multa coercitiva", "La suspensión de empleo", "La revocación del padrón"], "Art. 100 Ley 39/2015."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Empleados públicos (art. 8)", "Quienes desempeñan funciones retribuidas en las Administraciones al servicio de los intereses generales: funcionarios de carrera, funcionarios interinos, personal laboral (fijo, indefinido o temporal) y personal eventual"],
        ["Funcionario de carrera (art. 9)", "Vinculado por nombramiento legal mediante una relación estatutaria de Derecho Administrativo, para servicios permanentes; solo los funcionarios ejercen potestades públicas"],
        ["Funcionario interino (art. 10)", "Nombrado por necesidad y urgencia para plazas vacantes (máximo 3 años), sustituciones, programas temporales (hasta 3 años) o exceso de tareas (9 meses en 18)"],
        ["Personal laboral (art. 11)", "Presta servicios mediante contrato de trabajo por escrito; puede ser fijo, por tiempo indefinido o temporal"],
        ["Personal eventual (art. 12)", "Nombramiento no permanente para funciones de confianza o asesoramiento especial; cesa cuando cesa la autoridad a la que asesora y su condición no es mérito para acceder a la función pública"],
        ["Derechos colectivos (art. 15)", "Libertad sindical, negociación colectiva, huelga (garantizando los servicios esenciales), planteamiento de conflictos colectivos y reunión"],
        ["Derechos individuales (art. 14)", "Inamovilidad en la condición de funcionario de carrera, carrera profesional, retribuciones, formación continua, respeto a su intimidad y dignidad, igualdad, conciliación, vacaciones y permisos, jubilación y protección de su salud"],
        ["Código de conducta (arts. 52-54)", "Los empleados deben actuar con objetividad, integridad, neutralidad, responsabilidad, imparcialidad, confidencialidad, dedicación al servicio, transparencia, ejemplaridad, austeridad, accesibilidad, eficacia, honradez y respeto a la igualdad"],
      ],
      preguntas: [
        ["facil", "¿Cuál de estas NO es una clase de empleado público según el art. 8 del EBEP?", ["Personal autónomo colaborador", "Personal eventual", "Funcionario interino"], "Art. 8.2 TREBEP."],
        ["media", "El personal eventual realiza funciones de:", ["Confianza o asesoramiento especial", "Carácter permanente y estructural", "Ejercicio de potestades públicas"], "Art. 12.1 TREBEP."],
        ["media", "El funcionario interino nombrado por exceso o acumulación de tareas puede estarlo como máximo:", ["9 meses dentro de un periodo de 18 meses", "3 años", "6 meses"], "Art. 10.1.d) TREBEP."],
        ["media", "¿Cuál de estos es un derecho de ejercicio colectivo?", ["La huelga", "La formación continua", "La inamovilidad"], "Art. 15 TREBEP."],
        ["media", "El ejercicio de potestades públicas corresponde exclusivamente a:", ["Los funcionarios públicos", "El personal laboral fijo", "El personal eventual"], "Art. 9.2 TREBEP."],
        ["facil", "El personal laboral presta servicios en virtud de:", ["Un contrato de trabajo formalizado por escrito", "Un nombramiento discrecional del Alcalde", "Un acuerdo verbal"], "Art. 11.1 TREBEP."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["Requisitos de acceso (art. 56)", "Nacionalidad española (con las excepciones del art. 57); capacidad funcional; tener 16 años y no superar la edad de jubilación forzosa; no haber sido separado ni estar inhabilitado; y poseer la titulación exigida"],
        ["Adquisición de la condición de funcionario (art. 62)", "Por este orden: superar el proceso selectivo, nombramiento publicado en el Diario Oficial, acatamiento de la Constitución y del Estatuto de Autonomía, y toma de posesión en plazo"],
        ["Pérdida de la condición de funcionario (art. 63)", "Renuncia, pérdida de la nacionalidad, jubilación total, sanción firme de separación del servicio y pena firme de inhabilitación absoluta o especial"],
        ["Jubilación (art. 67)", "Voluntaria, forzosa (con carácter general a los 65 años o la edad que fije el régimen de Seguridad Social aplicable) o por incapacidad permanente"],
        ["Situaciones administrativas (art. 85)", "Servicio activo, servicios especiales, servicio en otras Administraciones Públicas, excedencia y suspensión de funciones"],
        ["Excedencias (art. 89)", "Voluntaria por interés particular (exige 5 años de servicios), voluntaria por agrupación familiar, por cuidado de familiares (hasta 3 años por hijo), por violencia de género o sexual y por violencia terrorista"],
        ["Suspensión de funciones (art. 90)", "Priva del ejercicio de funciones y de los derechos de la condición; si supera 6 meses se pierde el puesto; la suspensión firme por sanción disciplinaria no puede exceder de 6 años"],
      ],
      preguntas: [
        ["facil", "La edad mínima para acceder al empleo público es de:", ["16 años", "18 años", "21 años"], "Art. 56.1.c) TREBEP."],
        ["media", "¿Cuál es el último requisito para adquirir la condición de funcionario de carrera?", ["La toma de posesión dentro del plazo establecido", "Superar el proceso selectivo", "El nombramiento"], "Art. 62.1 TREBEP."],
        ["media", "¿Cuál de estas NO es causa de pérdida de la condición de funcionario?", ["La excedencia voluntaria por interés particular", "La renuncia", "La jubilación total"], "Art. 63 TREBEP. La excedencia es una situación administrativa."],
        ["media", "Para obtener la excedencia voluntaria por interés particular se exige haber prestado servicios efectivos durante:", ["5 años", "1 año", "10 años"], "Art. 89.2 TREBEP."],
        ["dificil", "La suspensión de funciones determina la pérdida del puesto de trabajo cuando excede de:", ["6 meses", "1 año", "3 meses"], "Art. 90.1 TREBEP."],
        ["media", "¿Cuál de estas es una situación administrativa del art. 85?", ["Servicios especiales", "Baja por enfermedad", "Vacaciones"], "Art. 85.1 TREBEP."],
        ["media", "La excedencia por cuidado de cada hijo tiene una duración no superior a:", ["3 años", "1 año", "5 años"], "Art. 89.4 TREBEP."],
      ],
    },
    {
      seccion: S6,
      flashcards: [
        ["Principios de la potestad disciplinaria (art. 94)", "Legalidad y tipicidad, irretroactividad de lo desfavorable y retroactividad de lo favorable, proporcionalidad, culpabilidad y presunción de inocencia"],
        ["Clases de faltas (art. 95)", "Muy graves, graves y leves; las muy graves las enumera el propio EBEP; las graves las fija la ley o el convenio colectivo; las leves, las leyes de función pública"],
        ["Ejemplos de faltas muy graves (art. 95.2)", "Incumplir el deber de respeto a la Constitución, la discriminación, el abandono del servicio, la publicación o utilización indebida de información, y el notorio incumplimiento de las funciones esenciales del puesto"],
        ["Sanciones (art. 96)", "Separación del servicio (solo por falta muy grave), despido disciplinario del laboral, suspensión firme de funciones (máximo 6 años), traslado forzoso, demérito, apercibimiento y las demás que fije la ley"],
        ["Prescripción de faltas (art. 97)", "Muy graves a los 3 años, graves a los 2 años y leves a los 6 meses, contados desde su comisión o desde el cese si son continuadas"],
        ["Prescripción de sanciones (art. 97)", "Por falta muy grave a los 3 años, por falta grave a los 2 años y por falta leve al año"],
        ["Procedimiento (art. 98)", "No se puede sancionar una falta grave o muy grave sin procedimiento previo; pueden adoptarse medidas provisionales; si se aprecian indicios de delito se suspende y se comunica al Ministerio Fiscal"],
      ],
      preguntas: [
        ["media", "Las faltas muy graves prescriben a los:", ["3 años", "2 años", "6 meses"], "Art. 97.1 TREBEP."],
        ["media", "Las faltas leves prescriben a los:", ["6 meses", "1 año", "1 mes"], "Art. 97.1 TREBEP."],
        ["dificil", "Las sanciones impuestas por faltas leves prescriben:", ["Al año", "A los 6 meses", "A los 2 años"], "Art. 97.1 TREBEP."],
        ["media", "La sanción de separación del servicio solo puede imponerse por:", ["Faltas muy graves", "Faltas graves", "Cualquier falta reiterada"], "Art. 96.1.a) TREBEP."],
        ["media", "La suspensión firme de funciones tiene una duración máxima de:", ["6 años", "3 años", "1 año"], "Art. 96.1.c) TREBEP."],
        ["facil", "¿Cuál de estas conductas es falta muy grave según el EBEP?", ["El abandono del servicio", "Llegar tarde un día", "No llevar el uniforme limpio"], "Art. 95.2.c) TREBEP."],
        ["media", "Si en un expediente disciplinario aparecen indicios fundados de delito:", ["Se suspende su tramitación y se comunica al Ministerio Fiscal", "Se sanciona igualmente y se archiva", "Se traslada al Alcalde para que decida"], "Art. 94.3 TREBEP."],
      ],
    },
  ],
  glosario: [
    [S1, "Interesado", "Persona que promueve un procedimiento o cuyos derechos o intereses legítimos pueden resultar afectados por la resolución (art. 4 Ley 39/2015)."],
    [S1, "Declaración responsable", "Documento en el que el interesado manifiesta, bajo su responsabilidad, que cumple los requisitos para ejercer un derecho o actividad (art. 69 Ley 39/2015)."],
    [S2, "Expediente administrativo", "Conjunto ordenado de documentos y actuaciones que sirven de antecedente y fundamento a la resolución (art. 70 Ley 39/2015)."],
    [S2, "Trámite de audiencia", "Momento en que se enseña el expediente a los interesados antes de la propuesta de resolución para que aleguen lo que convenga (art. 82 Ley 39/2015)."],
    [S3, "Silencio administrativo", "Efecto que la ley atribuye a la falta de resolución expresa en plazo: estimar o desestimar la solicitud."],
    [S3, "Caducidad", "Terminación del procedimiento por inactividad durante el plazo legal, por causa del interesado o por vencimiento del plazo máximo en ciertos procedimientos de oficio."],
    [S3, "Ejecución subsidiaria", "Medio de ejecución forzosa en el que la Administración realiza, a costa del obligado, el acto que este no ha cumplido (art. 102 Ley 39/2015)."],
    [S4, "Relación estatutaria", "Vínculo del funcionario con la Administración regulado por normas de Derecho Administrativo, no por un contrato laboral."],
    [S4, "Personal eventual", "Empleado nombrado libremente para funciones de confianza o asesoramiento especial, que cesa con la autoridad a la que sirve."],
    [S5, "Toma de posesión", "Acto con el que el funcionario se incorpora a su puesto y adquiere la condición de funcionario de carrera (art. 62 TREBEP)."],
    [S5, "Excedencia", "Situación administrativa en la que el funcionario deja temporalmente de prestar servicios, sin perder su condición."],
    [S6, "Apercibimiento", "Sanción disciplinaria más leve: una advertencia formal al empleado."],
    [S6, "Demérito", "Sanción que penaliza al empleado a efectos de carrera, promoción o movilidad voluntaria (art. 96.1.e TREBEP)."],
  ],
  casos: [
    {
      slug: "solicitud-incompleta-vado",
      titulo: "La solicitud de vado que llega incompleta",
      supuesto: "Un vecino presenta en el registro municipal una solicitud de licencia de vado para su garaje, pero no indica el órgano al que se dirige ni adjunta el plano exigido por la ordenanza. Trabajas apoyando a la unidad que tramita estos expedientes y te piden que ayudes a explicar al vecino los pasos del procedimiento.",
      preguntas: [
        [S1, "facil", "¿Qué debe hacer la Administración ante la solicitud incompleta?", ["Requerir al vecino para que la subsane en 10 días", "Archivarla sin más", "Resolverla en sentido negativo", "Devolverla por correo sin explicación"], "Art. 68.1 Ley 39/2015."],
        [S1, "media", "Si el vecino no subsana en plazo:", ["Se le tendrá por desistido de su petición, previa resolución", "Se le multa con 100 euros", "La licencia se concede automáticamente", "Se le declara caducado su derecho a solicitar"], "Art. 68.1 Ley 39/2015."],
        [S1, "media", "El vecino tiene dificultades para conseguir el plano. ¿Puede ampliarse el plazo?", ["Sí, hasta 5 días más, a petición del interesado o del órgano", "No, nunca", "Sí, hasta un mes", "Solo si paga una tasa"], "Art. 68.2 Ley 39/2015."],
        [S1, "media", "El vecino pide un justificante de haber presentado la solicitud. ¿Tiene derecho?", ["Sí, a un recibo que acredite la fecha y hora de presentación", "No, solo se da a empresas", "Solo si la solicitud está completa", "Solo si la presenta en papel"], "Art. 66.3 Ley 39/2015."],
        [S3, "media", "Si la ordenanza no fija plazo para resolver, el plazo máximo será de:", ["3 meses", "6 meses", "1 mes", "1 año"], "Art. 21.3 Ley 39/2015."],
        [S3, "media", "¿Desde cuándo se cuenta ese plazo en un procedimiento a solicitud?", ["Desde que la solicitud entra en el registro electrónico del órgano competente", "Desde que se emite el primer informe", "Desde que se notifica la resolución", "Desde que el vecino paga la tasa"], "Art. 21.3.b) Ley 39/2015."],
        [S3, "dificil", "El vecino pregunta qué pasa si vence el plazo sin resolución. Como regla general del art. 24.1, en los procedimientos a solicitud:", ["Puede entenderla estimada, salvo que una ley o el Derecho de la UE dispongan lo contrario o se trate de los casos tasados de silencio desestimatorio", "Se entiende siempre desestimada", "El procedimiento caduca y debe volver a solicitar", "Debe esperar indefinidamente"], "Art. 24.1 Ley 39/2015. Entre los casos de silencio desestimatorio están los que transfieran facultades relativas al dominio público."],
        [S2, "media", "Durante la tramitación se pide informe al servicio de Movilidad. Salvo norma en contrario, ese informe es:", ["Facultativo y no vinculante, y se emite en 10 días", "Preceptivo y vinculante", "Vinculante, en un mes", "Innecesario"], "Art. 80 Ley 39/2015."],
        [S2, "media", "Si la resolución tiene en cuenta hechos distintos de los alegados por el vecino, antes de la propuesta debe darse:", ["Trámite de audiencia, de 10 a 15 días", "Información pública de 20 días", "Un recurso de alzada", "Nada más"], "Art. 82 Ley 39/2015."],
        [S3, "media", "El vecino decide retirar su solicitud. ¿Qué figura es?", ["Desistimiento, que no le impide volver a solicitarlo", "Renuncia, que extingue para siempre su derecho", "Caducidad", "Silencio"], "Art. 94 Ley 39/2015."],
      ],
    },
    {
      slug: "companero-interino-excedencia",
      titulo: "Preguntas en el vestuario sobre interinidad y excedencias",
      supuesto: "En el vestuario del almacén municipal, varios compañeros comentan su situación: Luis es funcionario interino que sustituye a una compañera; Marta, funcionaria de carrera con 7 años de servicio, quiere dejar temporalmente el trabajo para montar un negocio; y Ana acaba de tener un hijo. Te preguntan qué dice el Estatuto Básico del Empleado Público.",
      preguntas: [
        [S4, "media", "Luis, nombrado para sustituir transitoriamente a una titular, seguirá en el puesto:", ["Durante el tiempo estrictamente necesario", "Un máximo de 9 meses", "Indefinidamente", "Exactamente 3 años"], "Art. 10.1.b) TREBEP."],
        [S4, "media", "¿Cuándo terminará la interinidad de Luis, entre otras causas?", ["Cuando finalice la causa que dio lugar a su nombramiento", "Cuando cumpla 40 años", "Cuando lo decida un compañero", "Nunca"], "Art. 10.3.d) TREBEP."],
        [S5, "media", "Marta quiere montar un negocio. ¿Qué situación puede solicitar?", ["Excedencia voluntaria por interés particular", "Excedencia por cuidado de familiares", "Servicios especiales", "Suspensión de funciones"], "Art. 89 TREBEP."],
        [S5, "media", "¿Cumple Marta el requisito de tiempo de servicios para esa excedencia?", ["Sí, se exigen 5 años y tiene 7", "No, se exigen 10 años", "No, se exigen 8 años", "No hay requisito"], "Art. 89.2 TREBEP."],
        [S5, "media", "Ana quiere cuidar de su hijo. ¿Durante cuánto tiempo puede estar en excedencia por cuidado de hijo?", ["Hasta 3 años", "Hasta 1 año", "Hasta 6 meses", "Hasta que el hijo cumpla 12 años"], "Art. 89.4 TREBEP."],
        [S5, "dificil", "¿En qué situación están los compañeros que trabajan con normalidad en sus puestos?", ["Servicio activo", "Servicios especiales", "Servicio en otras Administraciones", "Excedencia forzosa"], "Arts. 85 y 86 TREBEP."],
        [S4, "media", "Un compañero de Luis es personal laboral fijo. Su relación con el Ayuntamiento se basa en:", ["Un contrato de trabajo por escrito", "Un nombramiento estatutario", "Una relación de confianza política", "Un convenio entre Administraciones"], "Art. 11 TREBEP."],
        [S4, "media", "Comentan si pueden hacer huelga. El derecho de huelga es, según el EBEP:", ["Un derecho individual ejercido colectivamente, garantizando los servicios esenciales", "Un derecho prohibido a los funcionarios", "Un derecho solo del personal eventual", "Una falta muy grave"], "Art. 15.c) TREBEP."],
        [S5, "media", "Marta pregunta si, al pedir la excedencia, pierde su condición de funcionaria:", ["No, la excedencia es una situación administrativa y conserva la condición", "Sí, como en la renuncia", "Sí, si dura más de 1 año", "Solo si es personal laboral"], "Arts. 63 y 85 TREBEP."],
        [S5, "dificil", "¿A qué edad se jubila forzosamente, con carácter general, un funcionario según el art. 67.3 TREBEP?", ["A los 65 años, salvo lo que prevea el régimen de Seguridad Social aplicable", "A los 70 años", "A los 60 años", "No existe jubilación forzosa"], "Art. 67.3 y 4 TREBEP."],
      ],
    },
    {
      slug: "abandono-servicio-expediente",
      titulo: "El expediente disciplinario por abandono del servicio",
      supuesto: "Un operario abandonó su puesto durante un servicio de guardia en una nave municipal sin avisar a nadie, y durante ese tiempo se produjo una inundación que no se atendió. La jefatura ha iniciado un expediente disciplinario. Te piden que, como representante del turno, conozcas los principios y plazos del régimen disciplinario.",
      preguntas: [
        [S6, "media", "El abandono del servicio es, según el art. 95 TREBEP, una falta:", ["Muy grave", "Grave", "Leve", "No es falta"], "Art. 95.2.c) TREBEP."],
        [S6, "media", "¿Puede imponerse la sanción sin procedimiento previo?", ["No, las faltas graves y muy graves exigen procedimiento previo", "Sí, si los hechos son evidentes", "Sí, si lo decide el Alcalde", "Solo si el trabajador lo acepta"], "Art. 98.1 TREBEP."],
        [S6, "media", "¿Qué sanción, entre otras, podría imponerse a un funcionario por esta falta?", ["Separación del servicio", "Una multa de tráfico", "La pérdida de la nacionalidad", "La jubilación anticipada"], "Art. 96.1 TREBEP."],
        [S6, "media", "Si se impone suspensión firme de funciones, su duración máxima es de:", ["6 años", "1 año", "10 años", "6 meses"], "Art. 96.1.c) TREBEP."],
        [S6, "dificil", "¿Cuándo prescribe esta falta muy grave?", ["A los 3 años desde que se cometió", "A los 6 meses", "Al año", "No prescribe"], "Art. 97 TREBEP."],
        [S6, "media", "Durante el expediente, el trabajador debe ser considerado:", ["Inocente mientras no se demuestre lo contrario", "Culpable hasta que pruebe su inocencia", "Suspendido automáticamente", "Despedido provisionalmente"], "Art. 94.2.e) TREBEP."],
        [S6, "media", "La sanción debe graduarse atendiendo, entre otros, a:", ["El grado de intencionalidad, el daño al interés público y la reincidencia", "La antigüedad del jefe", "El número de hijos del trabajador", "La opinión de los vecinos"], "Art. 96.3 TREBEP."],
        [S5, "media", "Si la sanción fuera la separación del servicio firme, el funcionario:", ["Perdería la condición de funcionario de carrera", "Pasaría a excedencia voluntaria", "Quedaría en servicios especiales", "Mantendría su puesto"], "Art. 63.d) TREBEP."],
        [S6, "dificil", "Si durante la instrucción se aprecian indicios de delito, el instructor debe:", ["Suspender la tramitación y ponerlo en conocimiento del Ministerio Fiscal", "Seguir y sancionar dos veces", "Archivar sin más", "Imponer directamente la sanción máxima"], "Art. 94.3 TREBEP."],
        [S4, "media", "Además de las faltas, los empleados deben respetar un código de conducta que incluye el principio de:", ["Dedicación al servicio público", "Lucro personal", "Opacidad", "Parcialidad"], "Art. 53 TREBEP."],
      ],
    },
  ],
});
