/**
 * Crea tema-425 — Tema 3 de Administrativa/o (Ayto. Zaragoza, promoción
 * interna, CONV 5.2bis/2025, Parte primera rectificada en el BOPZ núm. 278 de
 * 3-12-2025): "Gestión del calendario laboral: normas básicas y regulación en
 * el Acuerdo sobre condiciones de trabajo del personal municipal."
 *
 * Fuentes leídas íntegras en la sesión:
 * - TREBEP, RDLeg 5/2015 (BOE-A-2015-11719), art. 47 (redacción del RDL
 *   2/2024), texto vigente comprobado en la API del BOE el 26-10-2026.
 * - Ley 39/2015 (BOE-A-2015-10565), art. 30.8 (los días hábiles a efectos de
 *   plazos no determinan el funcionamiento de los centros ni la jornada).
 * - Acuerdo sobre condiciones de trabajo del personal funcionario del
 *   Ayuntamiento de Zaragoza (aprobado por el Gobierno de Zaragoza el
 *   22-02-2024, vigencia 2024-2027), articulado publicado en el BOPZ núm. 134
 *   de 13-06-2024 (copia descargada del BOA): Capítulo III, arts. 10 a 13 y
 *   15.
 *
 * Laguna señalada: el art. 17.f.3 del Acuerdo remite a la «Instrucción sobre
 * gestión y control de calendario laboral, jornada, horarios, pausas,
 * permisos, vacaciones, licencias y reducciones de jornada» del personal
 * municipal (firmada el 18-01-2023 según una moción municipal de 2023). Se
 * buscó y no se ha localizado su texto publicado, así que no se reproduce su
 * contenido: el tema solo señala que existe y que se aplica a través de la
 * aplicación de partes de ausencia de la intranet.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-425-calendario-laboral.mjs
 */
import { sembrarTema, ADMIN_AYTO } from "./lib/sembrar-tema.mjs";

const TREBEP = "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11719";
const L = ADMIN_AYTO.ley39;
const BOPZ_ACUERDO = "https://www.boa.aragon.es/cgi-bin/EBOA/BRSCGI?CMD=VEROBJ&MLKOB=1337816230404&type=pdf";
const S1 = "jornada-normas-basicas";
const S2 = "calendario-laboral-acuerdo";
const S3 = "pausas-tipos-jornada-horarios";
const S4 = "flexibilidad-horaria-teletrabajo";

await sembrarTema({
  tema: {
    slug: "tema-425",
    titulo: "La gestión del calendario laboral en el Ayuntamiento de Zaragoza",
    descripcion: "Normas básicas: art. 47 TREBEP (jornada general y especiales, a tiempo completo o parcial, y flexibilización horaria para la conciliación) y art. 30.8 de la Ley 39/2015. Acuerdo sobre condiciones de trabajo del personal funcionario del Ayuntamiento de Zaragoza 2024-2027 (BOPZ 134, de 13-06-2024), Capítulo III: jornada de 35 horas semanales de promedio; calendario laboral, calendarios parciales por servicio y sus principios (comunicación semestral, preaviso de dos meses, días inhábiles no recuperables, descansos); pausas; tipos de jornada y horario; Comisión de Seguimiento; flexibilidad horaria y su procedimiento; teletrabajo; garantía de la jornada máxima anual. Instrucción municipal de control horario (no publicada).",
    contenido: "El calendario laboral es el documento que, tras negociarse en la Mesa General de Negociación, fija los días de trabajo, festivos, descansos, vacaciones y horas de cada jornada. En el Ayuntamiento de Zaragoza la jornada es de 35 horas semanales de promedio y el calendario general se compone de calendarios parciales de cada servicio, que se comunican al personal al menos cada semestre; los cambios sobrevenidos se avisan con dos meses. Hay pausa de 30 minutos (15 en jornadas continuadas de al menos cinco horas), descanso semanal de 48 horas y 12 horas entre jornadas. El horario común va de 7 a 15 horas, con flexibilidad de 7 a 18 y permanencia obligatoria de 9:30 a 14:00.",
    enlaces_boe: [
      { url: TREBEP, titulo: "Real Decreto Legislativo 5/2015, texto refundido del Estatuto Básico del Empleado Público (BOE-A-2015-11719), art. 47" },
      { url: L, titulo: "Ley 39/2015, del Procedimiento Administrativo Común (BOE-A-2015-10565), art. 30.8" },
      { url: BOPZ_ACUERDO, titulo: "Acuerdo sobre condiciones de trabajo del personal funcionario del Ayuntamiento de Zaragoza (BOPZ núm. 134, de 13-06-2024)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "Normas básicas sobre jornada y garantía de la jornada máxima", articulos: "art. 47 TREBEP; art. 30.8 Ley 39/2015; arts. 10 y 15 del Acuerdo", url: `${TREBEP}#a47` },
      { seccion: S2, titulo: "El calendario laboral en el Acuerdo", articulos: "art. 11.1, 11.2 y 11.7 del Acuerdo", url: BOPZ_ACUERDO },
      { seccion: S3, titulo: "Pausas, tipos de jornada y horarios", articulos: "art. 11.3 a 11.6 del Acuerdo", url: BOPZ_ACUERDO },
      { seccion: S4, titulo: "Flexibilidad horaria y teletrabajo", articulos: "arts. 12 y 13 del Acuerdo", url: BOPZ_ACUERDO },
    ],
  },
  vinculo: { oposicion: ADMIN_AYTO.oposicion, bloqueId: ADMIN_AYTO.bloqueParte1, numero: 3 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Jornada en el TREBEP (art. 47.1)", "Cada Administración establece la jornada general y las especiales de sus funcionarios, a tiempo completo o parcial"],
        ["Flexibilización horaria en el TREBEP (art. 47.2)", "Obligatoria para conciliar: hijos menores de 12 años y cuidado de hijos mayores de 12, cónyuge o pareja, familiares hasta segundo grado u otros convivientes que no puedan valerse por sí mismos"],
        ["Días hábiles y funcionamiento de los centros (art. 30.8 Ley 39/2015)", "Declarar un día hábil o inhábil a efectos de plazos no determina por sí solo el funcionamiento de los centros ni la jornada y horarios"],
        ["Jornada en el Acuerdo municipal (art. 10)", "La que fije el órgano competente, con la voluntad de mantener un promedio semanal de 35 horas, adaptado a colectivos con horarios especiales"],
        ["Garantía de jornada (art. 15 del Acuerdo)", "El Acuerdo no aumenta ni disminuye la jornada máxima anual; al final de cada año se revisan los incumplimientos y cualquier permiso adicional se descuenta de esa jornada"],
        ["Acuerdo sobre condiciones de trabajo (identificación)", "Aprobado por el Gobierno de Zaragoza el 22-02-2024, vigencia 2024-2027; articulado publicado en el BOPZ núm. 134 de 13-06-2024"],
      ],
      preguntas: [
        ["facil", "Según el Acuerdo sobre condiciones de trabajo, la jornada laboral del personal funcionario del Ayuntamiento de Zaragoza tiene un promedio semanal de:", ["35 horas", "37,5 horas", "40 horas"], "Art. 10.1 del Acuerdo (BOPZ 134/2024)."],
        ["media", "Según el art. 47 TREBEP, la jornada general y las especiales de los funcionarios las establecen:", ["Las Administraciones Públicas", "Las Cortes Generales para todos", "Los sindicatos"], "Art. 47.1 TREBEP."],
        ["media", "Las medidas de flexibilización horaria del art. 47.2 TREBEP se dirigen, entre otros, a quienes tengan a su cargo:", ["Hijos menores de doce años", "Hijos menores de dieciocho años en todo caso", "Mascotas"], "Art. 47.2 TREBEP."],
        ["dificil", "La declaración de un día como inhábil a efectos de plazos administrativos:", ["No determina por sí sola el funcionamiento de los centros ni la jornada", "Obliga a cerrar las oficinas", "Convierte el día en festivo laboral"], "Art. 30.8 Ley 39/2015."],
        ["media", "Según el Acuerdo, todo permiso que se conceda además de los establecidos:", ["Se entiende en detrimento de la jornada máxima anual", "Amplía la jornada", "No afecta a la jornada"], "Art. 15 del Acuerdo."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Concepto de calendario laboral (art. 11.1.a)", "Documento elaborado y acordado o resuelto por el Ayuntamiento, previa negociación en la Mesa General de Negociación, con los días de trabajo, festivos, descansos, vacaciones y horas por jornada (también en cómputo anual)"],
        ["Estructura del calendario general (art. 11.1.b)", "Lo integran los calendarios laborales parciales de cada servicio municipal"],
        ["Responsables de aplicar el calendario (art. 11.2.b)", "Las jefaturas de áreas técnicas, oficinas, departamentos o servicios"],
        ["Comunicación del calendario (art. 11.2.c)", "Al menos con carácter semestral; las modificaciones operativas sobrevenidas, con dos meses de antelación"],
        ["Publicación de calendarios de turnos y especiales (art. 11.2.d)", "En la intranet municipal y/o en el tablón de las dependencias"],
        ["Días inhábiles no recuperables (art. 11.2.e)", "Los señalados cada año por el Gobierno de Aragón y por el Pleno del Ayuntamiento; trabajarlos se compensa con un día de permiso u horas equivalentes"],
        ["5 de enero y 31 de octubre (art. 11.2.f)", "Se compensan con un día de permiso al personal a turnos de servicios de jornada anual, según determine la Comisión de Seguimiento"],
        ["Descansos (art. 11.2.g y h)", "Descanso semanal de 48 horas ininterrumpidas, con dos fines de semana al mes, por lo general alternos; mínimo de 12 horas entre jornadas"],
        ["Comisión de Seguimiento de calendarios (art. 11.7)", "Representantes de la Administración y sindicales; acuerda la adaptación y mejora de los calendarios y criterios de jornada, vacaciones, excesos y servicios extraordinarios en horarios especiales"],
        ["Instrucción municipal de control del calendario", "Existe una instrucción interna de gestión y control del calendario, jornada, pausas, permisos y vacaciones (citada en el art. 17.f.3 del Acuerdo); su texto no se ha localizado publicado, por lo que no se estudia su contenido"],
      ],
      preguntas: [
        ["facil", "Según el Acuerdo, el calendario laboral se elabora previa negociación colectiva en:", ["La Mesa General de Negociación", "El Pleno municipal", "La Junta de Gobierno exclusivamente"], "Art. 11.1.a) del Acuerdo."],
        ["media", "El calendario general laboral del Ayuntamiento de Zaragoza está integrado por:", ["Los calendarios laborales parciales de cada servicio municipal", "Un único calendario para todos los empleados", "Los calendarios de cada empleado"], "Art. 11.1.b) del Acuerdo."],
        ["media", "Las modificaciones operativas sobrevenidas en los calendarios deben conocerse por el personal afectado con una antelación mínima de:", ["Dos meses", "Quince días", "Una semana"], "Art. 11.2.c) del Acuerdo."],
        ["media", "Según el Acuerdo, el descanso semanal será de:", ["Cuarenta y ocho horas ininterrumpidas", "Veinticuatro horas", "Treinta y seis horas"], "Art. 11.2.g) del Acuerdo."],
        ["media", "Con carácter general, el descanso mínimo entre jornadas consecutivas será de:", ["Doce horas", "Ocho horas", "Diez horas"], "Art. 11.2.h) del Acuerdo."],
        ["dificil", "Son días inhábiles no recuperables los señalados expresamente cada año por:", ["El Gobierno de Aragón y el Pleno del Ayuntamiento de Zaragoza", "El Ministerio de Trabajo", "Cada jefatura de servicio"], "Art. 11.2.e) del Acuerdo."],
        ["media", "La aplicación de los calendarios laborales (horario, turno, ciclo) corresponde a:", ["Las jefaturas de áreas, oficinas, departamentos o servicios", "Cada empleado", "El Servicio de Prevención"], "Art. 11.2.b) del Acuerdo."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Pausa en la jornada (art. 11.3.a y b)", "Ausencia puntual computable como trabajo efectivo; en horario común con o sin turnos, 30 minutos (no en jornada reducida)"],
        ["Límite de ausencia simultánea en la pausa (art. 11.3.c)", "No puede estar ausente a la vez más del 50 % del personal del servicio"],
        ["Pausa en jornada continuada de al menos 5 horas (art. 11.3.d)", "Quince minutos"],
        ["Pausas en turno de noche (art. 11.3.e)", "Dos pausas de veinte minutos no acumulables"],
        ["Pausa adicional por discapacidad (art. 11.3.g)", "Quince minutos más, con discapacidad asociada a movilidad del 33 % o superior"],
        ["Jornada de 12 horas o más (art. 11.3.h)", "Media hora de pausa por la mañana y media hora por la tarde"],
        ["Jornada normalizada y jornadas especiales (art. 11.4)", "Normalizada: de lunes a viernes, de mañana, continuada; especiales: a turnos, especial o nocturna"],
        ["Horario laboral común (art. 11.5.b.1)", "Centros administrativos y asimilados, entre las 7:00 y las 15:00, de lunes a viernes"],
        ["Otros horarios (art. 11.5.b.2 a b.5)", "Común con o sin turnos (7:00 a 22:00, lunes a viernes); especiales (también fines de semana); especiales continuos (24 horas, todo el año); nocturno (al menos 3 horas entre las 22:00 y las 6:00)"],
      ],
      preguntas: [
        ["facil", "El personal con horario laboral común con o sin turnos disfruta de una pausa de:", ["Treinta minutos, computables como trabajo efectivo", "Quince minutos no computables", "Una hora"], "Art. 11.3.b) del Acuerdo."],
        ["media", "Durante la pausa no podrá estar ausente al mismo tiempo más del:", ["50 % del personal adscrito al servicio", "25 % del personal", "75 % del personal"], "Art. 11.3.c) del Acuerdo."],
        ["media", "El horario laboral común de los centros administrativos se adecuará a la franja:", ["De 7:00 a 15:00 horas, de lunes a viernes", "De 8:00 a 15:00 horas, de lunes a sábado", "De 9:00 a 14:00 horas"], "Art. 11.5.b.1 del Acuerdo."],
        ["media", "En las jornadas de turno de noche se disfrutan:", ["Dos pausas de veinte minutos que no podrán acumularse", "Una pausa de una hora", "Tres pausas de diez minutos"], "Art. 11.3.e) del Acuerdo."],
        ["dificil", "Se considera horario nocturno el que realiza al menos:", ["Tres horas de su tiempo de trabajo diario entre las 22:00 y las 6:00", "Una hora después de las 20:00", "Toda la jornada después de las 15:00"], "Art. 11.5.b.5 del Acuerdo."],
        ["media", "La jornada normalizada es la que se desarrolla:", ["De lunes a viernes en horario común de mañanas, continuada o intensiva", "En turnos rotatorios", "Solo en fines de semana"], "Art. 11.4.b.1 del Acuerdo."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Flexibilidad horaria (art. 12.1 y 2 del Acuerdo)", "Derecho de carácter general a adaptar temporalmente jornada u horario para conciliar, garantizando la prestación del servicio"],
        ["Margen general de flexibilidad (art. 12.3.d)", "Hasta 2 horas"],
        ["Flexibilidad en horario común (art. 12.4.a)", "Franja de 7:00 a 18:00, con permanencia obligatoria de 9:30 a 14:00, completando la jornada en cómputo diario, semanal o mensual"],
        ["Flexibilidad excepcional por conciliación (art. 12.4.c)", "Media hora sobre la permanencia obligatoria (entrar a las 10:00 y/o salir a las 13:30) con mayores hasta 2.º grado, hijos menores de 12 años, personas con discapacidad o familiar con enfermedad grave"],
        ["Procedimiento de flexibilidad (art. 12.5)", "Solicitud al Servicio de Relaciones Laborales; informe preceptivo del servicio en 20 días; informe-propuesta; resolución autorizadora expresa del órgano competente"],
        ["Teletrabajo (art. 13 del Acuerdo)", "Prestación a distancia del contenido del puesto mediante TIC (art. 47 bis TREBEP), regulada por la Instrucción municipal de teletrabajo de 18-01-2021 (BOPZ n.º 16, de 21-01-2021)"],
      ],
      preguntas: [
        ["facil", "Con carácter general, el personal municipal puede flexibilizar su jornada hasta:", ["2 horas", "30 minutos", "4 horas"], "Art. 12.3.d) del Acuerdo."],
        ["media", "En horario laboral común, el tramo de permanencia obligatoria es:", ["De 9:30 a 14:00 horas", "De 8:00 a 15:00 horas", "De 10:00 a 13:00 horas"], "Art. 12.4.a) del Acuerdo."],
        ["media", "La flexibilidad en horario laboral común puede ejercerse en la franja:", ["De 7:00 a 18:00 horas", "De 6:00 a 22:00 horas", "De 8:00 a 16:00 horas"], "Art. 12.4.a) del Acuerdo."],
        ["media", "Excepcionalmente, por conciliación, quien tenga hijos menores de 12 años puede:", ["Iniciar la jornada a las 10:00 y/o finalizarla a las 13:30", "No cumplir la permanencia obligatoria", "Trabajar solo 4 horas"], "Art. 12.4.c) del Acuerdo."],
        ["dificil", "En el procedimiento de flexibilidad, el servicio municipal debe emitir informe preceptivo en el plazo de:", ["Veinte días", "Diez días", "Un mes"], "Art. 12.5.c) del Acuerdo."],
        ["media", "La flexibilidad horaria se hace efectiva:", ["Con resolución autorizadora expresa del órgano municipal competente", "Con la simple comunicación del empleado", "Con el visto bueno verbal del jefe"], "Art. 12.5.e) del Acuerdo."],
        ["media", "El teletrabajo en el Ayuntamiento de Zaragoza se regula, además de por la normativa general, por:", ["La Instrucción aprobada por decreto de 18-01-2021 (BOPZ n.º 16 de 21-01-2021) o la que la sustituya", "El Código Civil", "Ninguna norma municipal"], "Art. 13.2 del Acuerdo."],
      ],
    },
  ],
  glosario: [
    [S1, "Jornada máxima anual", "Número total de horas de trabajo exigibles en el año, que el Acuerdo no altera y que se revisa al final de cada año (art. 15)."],
    [S1, "Mesa General de Negociación", "Órgano de negociación entre el Ayuntamiento y los sindicatos en el que se negocia, entre otras cosas, el calendario laboral."],
    [S2, "Calendario laboral", "Documento negociado que fija días de trabajo, festivos, descansos, vacaciones y horas de jornada (art. 11.1 del Acuerdo)."],
    [S2, "Día inhábil no recuperable", "Festivo señalado por el Gobierno de Aragón o el Pleno municipal; si se trabaja se compensa con un día de permiso (art. 11.2.e)."],
    [S3, "Pausa", "Ausencia puntual durante la jornada, computable como trabajo efectivo (art. 11.3)."],
    [S3, "Horario especial continuo", "Horario de centros que prestan servicio 24 horas todos los días del año (art. 11.5.b.4)."],
    [S4, "Permanencia obligatoria", "Tramo del horario en que todo el personal con flexibilidad debe estar en su puesto: de 9:30 a 14:00 en horario común (art. 12.4.a)."],
    [S4, "Teletrabajo", "Modalidad de prestación a distancia del contenido del puesto mediante tecnologías de la información (art. 47 bis TREBEP y art. 13 del Acuerdo)."],
  ],
  casos: [
    {
      slug: "adm-ayto-calendario-cambio-turnos",
      titulo: "Un cambio de turnos sin avisar",
      supuesto: "En un centro municipal con horarios especiales, la jefatura comunica el 1 de marzo que, desde el 15 de marzo, el personal pasará de turno de mañana a turno de tarde. Además, el calendario del centro no se ha publicado en la intranet y algunos trabajadores no han disfrutado dos fines de semana libres en febrero.",
      preguntas: [
        [S2, "media", "Las modificaciones operativas sobrevenidas en el calendario deben comunicarse con una antelación mínima de:", ["Dos meses", "Quince días", "Un mes"], "Art. 11.2.c) del Acuerdo."],
        [S2, "media", "Con carácter general, el calendario debe darse a conocer al personal:", ["Como mínimo con carácter semestral", "Anualmente en diciembre", "Solo si se pide"], "Art. 11.2.c) del Acuerdo."],
        [S2, "media", "Una vez aprobado, el calendario de un servicio con turnos debe publicarse en:", ["La intranet municipal y/o el tablón de sus dependencias", "El BOE", "Ningún sitio"], "Art. 11.2.d) del Acuerdo."],
        [S2, "media", "Según el Acuerdo, se deben disfrutar al mes:", ["Dos fines de semana de descanso, con carácter general alternos", "Un fin de semana", "Ningún fin de semana en horarios especiales"], "Art. 11.2.g) del Acuerdo."],
        [S2, "facil", "La aplicación del calendario es responsabilidad de:", ["La jefatura del servicio", "Cada trabajador", "El Pleno"], "Art. 11.2.b) del Acuerdo."],
        [S2, "media", "Los criterios de aplicación de jornada y vacaciones en colectivos con horarios especiales pueden determinarse en:", ["La Comisión de Seguimiento", "El Justicia de Aragón", "El tribunal de selección"], "Art. 11.7.b) del Acuerdo."],
        [S2, "dificil", "Un objetivo de los horarios y turnos fijados en los calendarios, según el Acuerdo, es:", ["Reducir los servicios extraordinarios fuera de la jornada", "Aumentar las horas extraordinarias", "Eliminar las pausas"], "Art. 11.2.a) del Acuerdo."],
        [S3, "media", "Los horarios que incluyen sábados y/o domingos se denominan:", ["Horarios especiales", "Horario laboral común", "Horario nocturno"], "Art. 11.5.b.3 del Acuerdo."],
        [S3, "media", "Si en el turno de tarde la jornada es continuada de al menos cinco horas y habitual, la pausa es de:", ["Quince minutos", "Treinta minutos", "Una hora"], "Art. 11.3.d) del Acuerdo."],
        [S2, "media", "El descanso mínimo entre la jornada de mañana del 14 y la de tarde del 15 debe ser, con carácter general, de:", ["Doce horas", "Seis horas", "Veinticuatro horas"], "Art. 11.2.h) del Acuerdo."],
      ],
    },
    {
      slug: "adm-ayto-calendario-flexibilidad-hijos",
      titulo: "Una administrativa con dos hijos pequeños",
      supuesto: "Lucía, administrativa en una oficina municipal con horario común, tiene dos hijos de 5 y 9 años. Quiere entrar a las 10:00 para llevarlos al colegio y salir a las 17:00 dos días a la semana. Pide información sobre cómo solicitarlo y si podría teletrabajar algún día.",
      preguntas: [
        [S4, "media", "Con carácter general, la flexibilidad horaria permite adaptar la jornada hasta:", ["2 horas", "1 hora", "3 horas"], "Art. 12.3.d) del Acuerdo."],
        [S4, "media", "En horario común, el tramo de permanencia obligatoria es de:", ["9:30 a 14:00", "8:00 a 15:00", "10:00 a 13:30"], "Art. 12.4.a) del Acuerdo."],
        [S4, "dificil", "Entrar a las 10:00 es posible solo:", ["Excepcionalmente, como medida de conciliación por tener hijos menores de 12 años", "Siempre, sin requisitos", "Nunca"], "Art. 12.4.c) del Acuerdo."],
        [S4, "media", "Salir a las 17:00 está dentro de la franja flexible, que va de:", ["7:00 a 18:00", "7:00 a 15:00", "8:00 a 16:00"], "Art. 12.4.a) del Acuerdo."],
        [S4, "media", "Lucía debe dirigir su solicitud a:", ["El Servicio de Relaciones Laborales", "El Pleno", "La Junta Municipal de Distrito"], "Art. 12.5.a) del Acuerdo."],
        [S4, "media", "En la solicitud debe expresar:", ["Las adaptaciones, el plazo de disfrute y la fórmula de compensar las horas", "Solo su nombre", "El sueldo que desea"], "Art. 12.5.a) del Acuerdo."],
        [S4, "media", "La flexibilidad solo será efectiva cuando:", ["Se dicte resolución autorizadora expresa", "Pase un mes sin respuesta", "Lo diga su jefa verbalmente"], "Art. 12.5.e) del Acuerdo."],
        [S4, "media", "Si hubiera dificultades para la adaptación en su unidad, la jefatura podría:", ["Estudiar la adaptación en otro ámbito funcional del servicio", "Denegarla sin motivación", "Sancionar a Lucía"], "Art. 12.3.e) del Acuerdo."],
        [S1, "media", "El TREBEP obliga a las Administraciones a adoptar medidas de flexibilización para quienes tengan hijos menores de:", ["Doce años", "Tres años", "Dieciocho años"], "Art. 47.2 TREBEP."],
        [S4, "media", "Sobre el teletrabajo, el Acuerdo remite a:", ["El art. 47 bis TREBEP y la Instrucción municipal de 18-01-2021", "Solo la voluntad de cada jefe", "El convenio de oficinas privadas"], "Art. 13 del Acuerdo."],
      ],
    },
    {
      slug: "adm-ayto-calendario-festivo-trabajado",
      titulo: "Trabajar un festivo y la pausa",
      supuesto: "Un administrativo de un servicio de jornada de cómputo anual trabaja el 12 de octubre, festivo, para atender un evento. Ese mes también presta servicio por turno el 31 de octubre. Un compañero suyo con discapacidad del 40 % asociada a problemas de movilidad pregunta cuánto dura su pausa. Ambos trabajan en horario común con turnos.",
      preguntas: [
        [S2, "media", "El 12 de octubre trabajado, como día inhábil no recuperable, se compensará con:", ["Un día de permiso o las horas correspondientes", "Nada", "Una sanción"], "Art. 11.2.e) del Acuerdo."],
        [S2, "media", "El día de compensación se disfruta, con carácter general:", ["En el régimen previsto para los días por asuntos particulares", "Solo en agosto", "En el mismo día"], "Art. 11.2.e) del Acuerdo."],
        [S2, "dificil", "Si excepcionalmente no se disfrutara ese día compensatorio en el año:", ["No se pierde", "Se pierde", "Se paga a mitad de precio"], "Art. 11.2.e) del Acuerdo."],
        [S2, "media", "El trabajo por turno el 31 de octubre en un servicio de jornada anual:", ["Se compensa con un día de permiso, según determine la Comisión de Seguimiento", "No se compensa", "Se paga como hora extra obligatoriamente"], "Art. 11.2.f) del Acuerdo."],
        [S3, "media", "La pausa ordinaria del compañero en horario común con turnos es de:", ["Treinta minutos", "Quince minutos", "Veinte minutos"], "Art. 11.3.b) del Acuerdo."],
        [S3, "dificil", "Por su discapacidad asociada a problemas de movilidad del 33 % o más, el compañero disfruta además de:", ["Quince minutos más de pausa", "Una hora más", "Nada más"], "Art. 11.3.g) del Acuerdo."],
        [S3, "media", "La pausa computa:", ["Como trabajo efectivo", "Como permiso no retribuido", "Como vacaciones"], "Art. 11.3.a) del Acuerdo."],
        [S3, "media", "Si por necesidades del servicio no pudiera disfrutar la pausa:", ["Acumularía ese tiempo en una bolsa de horas, previa autorización expresa", "Lo perdería", "Podría irse antes sin avisar"], "Art. 11.3.f) del Acuerdo."],
        [S1, "media", "Los festivos que se señalan cada año como inhábiles a efectos laborales los fijan:", ["El Gobierno de Aragón y el Pleno del Ayuntamiento", "Los sindicatos", "Cada trabajador"], "Art. 11.2.e) del Acuerdo."],
        [S1, "media", "Si se le concediera un permiso adicional no previsto, según el Acuerdo:", ["Se descontaría de la jornada máxima anual", "Ampliaría sus vacaciones sin más", "Sería ilegal"], "Art. 15 del Acuerdo."],
      ],
    },
  ],
});
