/**
 * Crea tema-392 — Tema 20 de Administrativo DGA (tema 15 del programa de
 * materias específicas): "El personal de la Administración de la
 * Comunidad Autónoma de Aragón (V). El personal laboral. Selección.
 * Derechos, deberes e incompatibilidades. El contrato laboral: contenido,
 * duración y suspensión."
 *
 * Fuentes (textos consolidados leídos en esta sesión en la API del BOE):
 * - RDLeg 5/2015, texto refundido del EBEP (BOE-A-2015-11719): arts. 7, 11,
 *   14-15, 27, 55, 57.4, 61.7, 83, 92 y 93.4.
 * - Decreto Legislativo 1/1991, Ley de Ordenación de la Función Pública de
 *   Aragón (BOA-d-1991-90001): arts. 8, 9, 25 y disposiciones adicionales
 *   octava y vigésima segunda.
 * - RDLeg 2/2015, texto refundido del Estatuto de los Trabajadores
 *   (BOE-A-2015-11430): arts. 1, 4, 5, 8, 12, 14, 15 y 45-48 (con la
 *   suspensión por nacimiento de diecinueve semanas vigente).
 * - Ley 53/1984, de Incompatibilidades (BOE-A-1985-151): arts. 1-2.
 * - VIII Convenio Colectivo del personal laboral de la Administración de la
 *   Comunidad Autónoma de Aragón: solo los datos ya verificados al sembrar
 *   el tema-32 (art. 1, ámbito y exclusiones; art. 2, prórroga; arts.
 *   108-111, régimen disciplinario). No se ha releído en esta sesión.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-392-personal-laboral-contrato-trabajo.mjs
 */
import { sembrarTema, ADMIN_DGA } from "./lib/sembrar-tema.mjs";

const EBEP = "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11719";
const LOFPA = "https://www.boe.es/buscar/act.php?id=BOA-d-1991-90001";
const ET = "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430";
const L53 = "https://www.boe.es/buscar/act.php?id=BOE-A-1985-151";
const CONV = "https://www.boa.aragon.es/cgi-bin/EBOA/BRSCGI?CMD=VEROBJ&MLKOB=1277434930505";
const S1 = "regimen-juridico-personal-laboral";
const S2 = "seleccion-personal-laboral";
const S3 = "derechos-deberes-personal-laboral";
const S4 = "incompatibilidades-personal-laboral";
const S5 = "contrato-forma-contenido-prueba";
const S6 = "duracion-contrato-trabajo";
const S7 = "suspension-excedencias-laboral";

await sembrarTema({
  tema: {
    slug: "tema-392",
    titulo: "El personal de la Administración de Aragón (V): el personal laboral; selección, derechos, deberes, incompatibilidades y contrato de trabajo",
    descripcion: "Régimen jurídico del personal laboral de las Administraciones (legislación laboral, convenio colectivo y preceptos del EBEP) y puestos que puede ocupar en Aragón; el VIII Convenio Colectivo del personal laboral de la Comunidad Autónoma. Selección: principios, sistemas (oposición, concurso-oposición y concurso), personal temporal, extranjeros y promoción cruzada. Derechos y deberes laborales (Estatuto de los Trabajadores) y como empleados públicos (EBEP); régimen disciplinario. Incompatibilidades. El contrato de trabajo: forma, contenido, tiempo parcial y periodo de prueba; duración (indefinido y temporal por circunstancias de la producción o sustitución); suspensión con reserva de puesto y excedencias.",
    contenido: "Quiénes son los trabajadores con contrato laboral del Gobierno de Aragón (oficios, mantenimiento, conductores…), cómo se les selecciona, qué derechos y deberes tienen y cómo es su contrato: cuándo debe ser por escrito, cuánto puede durar el periodo de prueba, cuándo un contrato puede ser temporal y qué ocurre con el puesto si el trabajador está de baja, de permiso por nacimiento o en excedencia.",
    enlaces_boe: [
      { url: EBEP, titulo: "Real Decreto Legislativo 5/2015, texto refundido del Estatuto Básico del Empleado Público (BOE-A-2015-11719)" },
      { url: ET, titulo: "Real Decreto Legislativo 2/2015, texto refundido del Estatuto de los Trabajadores (BOE-A-2015-11430)" },
      { url: LOFPA, titulo: "Decreto Legislativo 1/1991, Ley de Ordenación de la Función Pública de Aragón (BOA-d-1991-90001)" },
      { url: L53, titulo: "Ley 53/1984, de Incompatibilidades del personal al servicio de las Administraciones Públicas (BOE-A-1985-151)" },
      { url: CONV, titulo: "VIII Convenio Colectivo para el Personal Laboral de la Administración de la Comunidad Autónoma de Aragón (BOA)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "Régimen jurídico del personal laboral", articulos: "arts. 7, 11, 27, 83 y 92 EBEP; art. 8 DLeg 1/1991; art. 1 ET", url: `${EBEP}#a11` },
      { seccion: S2, titulo: "Selección del personal laboral", articulos: "arts. 55, 57.4 y 61.7 EBEP; arts. 9 y 25 y DA 8.ª DLeg 1/1991", url: `${EBEP}#a61` },
      { seccion: S3, titulo: "Derechos y deberes; régimen disciplinario", articulos: "arts. 4-5 ET; arts. 14-15 y 93 EBEP; DA 22.ª DLeg 1/1991", url: `${ET}#a4` },
      { seccion: S4, titulo: "Incompatibilidades del personal laboral", articulos: "arts. 1-2 Ley 53/1984", url: `${L53}#aprimero` },
      { seccion: S5, titulo: "El contrato de trabajo: forma, contenido, tiempo parcial y periodo de prueba", articulos: "arts. 8, 12 y 14 ET", url: `${ET}#a8` },
      { seccion: S6, titulo: "Duración del contrato de trabajo", articulos: "art. 15 ET", url: `${ET}#a15` },
      { seccion: S7, titulo: "Suspensión del contrato y excedencias", articulos: "arts. 45-48 ET", url: `${ET}#a45` },
    ],
  },
  vinculo: { oposicion: ADMIN_DGA.oposicion, bloqueId: ADMIN_DGA.bloquePersonal, numero: 20 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Personal laboral (art. 11.1 EBEP)", "Presta servicios retribuidos por contrato de trabajo escrito, en cualquier modalidad laboral; puede ser fijo, por tiempo indefinido o temporal"],
        ["Normativa aplicable (art. 7 EBEP)", "La legislación laboral, los convenios colectivos y los preceptos del EBEP que así lo dispongan; en permisos por nacimiento, adopción, lactancia y parental se aplica el EBEP"],
        ["Puestos laborales en Aragón (art. 8.2 DLeg 1/1991)", "No permanentes o discontinuos, urgentes sin dotación (máximo seis meses), oficios, vigilancia y custodia, mantenimiento, artes gráficas, servicios sociales, docencia no reglada, investigación y especialidades sin cuerpo"],
        ["Límite de los puestos laborales (art. 11.2 EBEP)", "No pueden implicar el ejercicio de potestades públicas, reservado a funcionarios (art. 9.2)"],
        ["Exclusión del ET (art. 1.3.a ET)", "Queda fuera del Estatuto de los Trabajadores la relación de servicio de los funcionarios y la del personal regulado por normas administrativas o estatutarias"],
        ["Retribuciones (art. 27 EBEP)", "Según la legislación laboral, el convenio colectivo y el contrato, respetando los límites de masa salarial de la ley de presupuestos"],
        ["Provisión y movilidad (art. 83 EBEP)", "Conforme a los convenios colectivos y, en su defecto, al sistema del personal funcionario"],
        ["VIII Convenio Colectivo de la DGA (art. 1)", "Regula las relaciones laborales con la Administración de la Comunidad Autónoma en todo Aragón; excluye al personal sanitario en formación, profesorado de religión, laboral docente con funciones docentes y alta dirección"],
      ],
      preguntas: [
        ["media", "El personal laboral al servicio de las Administraciones se rige por:", ["La legislación laboral, los convenios colectivos y los preceptos del EBEP que lo dispongan", "Solo el EBEP", "Solo el Código Civil", "Solo la ley aragonesa de función pública"], "Art. 7 EBEP."],
        ["media", "¿Cuál de estos puestos puede ser ocupado por personal laboral en la Administración aragonesa?", ["Un puesto de mantenimiento y conservación de edificios", "Un puesto de letrado de los Servicios Jurídicos", "Un puesto de inspección tributaria", "Un puesto de jefe de servicio de personal"], "Art. 8.2.d) DLeg 1/1991."],
        ["media", "En materia de permiso por nacimiento, el personal laboral de las Administraciones se rige por:", ["El EBEP", "El Estatuto de los Trabajadores", "El convenio exclusivamente", "El Código Civil"], "Art. 7 EBEP."],
        ["dificil", "Según el DLeg 1/1991, la contratación laboral para puestos adscritos a funcionarios que deban cubrirse con urgencia inaplazable sin dotación adecuada tiene un límite de:", ["Seis meses", "Un año", "Tres meses", "Dos años"], "Art. 8.2.b) DLeg 1/1991."],
        ["media", "¿Qué personal queda excluido del VIII Convenio Colectivo de la DGA?", ["El personal de alta dirección", "Los conductores", "El personal de mantenimiento", "El personal de oficios"], "Art. 1.2 VIII Convenio (verificado en el tema-32)."],
        ["media", "El contrato del personal laboral de la Administración aragonesa se formaliza:", ["Siempre por escrito", "De palabra", "Por correo electrónico informal", "Solo si dura más de un año"], "Art. 8.1 DLeg 1/1991 y art. 11.1 EBEP."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Principios (arts. 11.3 y 55 EBEP)", "Procedimientos públicos con igualdad, mérito y capacidad; el personal temporal, además, con celeridad y para necesidades justificadas de necesidad y urgencia"],
        ["Sistemas del personal laboral fijo (art. 61.7 EBEP)", "Oposición, concurso-oposición o concurso de valoración de méritos"],
        ["Selección en Aragón (art. 25 DLeg 1/1991)", "Según la oferta de empleo público, con convocatoria pública y concurso, oposición o concurso-oposición libre, garantizando igualdad, mérito, capacidad y publicidad"],
        ["Mérito del temporal (art. 9 DLeg 1/1991)", "Los servicios como interino o laboral temporal no son mérito preferente para el acceso, aunque pueden valorarse en los baremos de concursos"],
        ["Extranjeros (art. 57.4 EBEP)", "Los extranjeros con residencia legal en España pueden acceder como personal laboral en igualdad de condiciones que los españoles"],
        ["Colaboración sindical (art. 61.7 EBEP)", "Puede negociarse la forma de colaboración de los sindicatos en el desarrollo de los procesos selectivos de personal laboral"],
        ["Promoción cruzada (DA 8.ª DLeg 1/1991)", "El personal laboral fijo del convenio puede participar en procesos de promoción interna cruzada a cuerpos y escalas del subgrupo C2; si accede, queda en excedencia como laboral"],
      ],
      preguntas: [
        ["media", "¿Cuál de estos sistemas puede utilizarse para seleccionar personal laboral fijo y no, con carácter general, funcionarios de carrera?", ["El concurso de valoración de méritos", "La oposición", "El concurso-oposición", "La libre designación"], "Art. 61.6-7 EBEP."],
        ["media", "Los extranjeros con residencia legal en España pueden acceder a las Administraciones como:", ["Personal laboral, en igualdad de condiciones", "Funcionarios de carrera en cualquier cuerpo", "Solo personal eventual", "No pueden acceder"], "Art. 57.4 EBEP."],
        ["media", "La selección del personal laboral temporal se rige, además de por igualdad, mérito y capacidad, por el principio de:", ["Celeridad", "Libre designación", "Antigüedad", "Proximidad"], "Art. 11.3 EBEP."],
        ["dificil", "Según el DLeg 1/1991, haber trabajado como laboral temporal:", ["No es mérito preferente para el acceso, aunque puede valorarse en baremos de concursos", "Da acceso directo a laboral fijo", "Es mérito preferente en la oposición", "Impide presentarse a las pruebas"], "Art. 9 DLeg 1/1991."],
        ["media", "El personal laboral fijo puede acceder a cuerpos del subgrupo C2 mediante:", ["Procesos de promoción interna cruzada", "Libre designación", "Comisión de servicios", "Integración automática"], "DA 8.ª DLeg 1/1991."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Derechos básicos del trabajador (art. 4.1 ET)", "Trabajo y libre elección de profesión, libre sindicación, negociación colectiva, conflicto colectivo, huelga, reunión e información, consulta y participación"],
        ["Derechos en la relación de trabajo (art. 4.2 ET)", "Ocupación efectiva, promoción y formación, no discriminación, integridad física y prevención, intimidad y dignidad (frente al acoso), remuneración puntual y ejercicio de acciones"],
        ["Deberes básicos (art. 5 ET)", "Cumplir las obligaciones del puesto con buena fe y diligencia, observar la prevención de riesgos, cumplir las órdenes empresariales, no concurrir con la empresa y contribuir a la productividad"],
        ["Derechos y deberes como empleado público (arts. 14-15 y 52-54 EBEP)", "El personal laboral, como empleado público, tiene los derechos del EBEP y está sujeto a su código de conducta"],
        ["Régimen disciplinario (art. 93 EBEP y DA 22.ª DLeg 1/1991)", "El del EBEP y, en lo no previsto, la legislación laboral y el convenio colectivo"],
        ["Convenio DGA y disciplina (arts. 108-111 VIII Convenio)", "Faltas muy graves, graves y leves; el código de conducta del EBEP informa su interpretación; añade como muy graves, entre otras, el abuso de autoridad, la violación del sigilo y la violencia de género o sexual"],
        ["Despido disciplinario (art. 96.1.b EBEP)", "Solo por faltas muy graves; comporta inhabilitación para un nuevo contrato con funciones similares; si se declara improcedente, procede la readmisión del laboral fijo"],
      ],
      preguntas: [
        ["media", "Según el Estatuto de los Trabajadores, es un deber básico del trabajador:", ["Cumplir las obligaciones de su puesto conforme a la buena fe y diligencia", "Elegir su horario", "Fijar su salario", "Negociar individualmente el convenio"], "Art. 5.a) ET."],
        ["media", "El derecho a la ocupación efectiva es un derecho:", ["De los trabajadores en la relación de trabajo", "Solo de los funcionarios", "Del empresario", "De los sindicatos"], "Art. 4.2.a) ET."],
        ["media", "La sanción de despido disciplinario del personal laboral de las Administraciones solo puede imponerse por:", ["Faltas muy graves", "Faltas graves", "Faltas leves reiteradas", "Cualquier falta"], "Art. 96.1.b) EBEP."],
        ["dificil", "Si se declara improcedente el despido de un laboral fijo acordado por falta muy grave, procede:", ["La readmisión", "La indemnización obligatoria sin readmisión", "La conversión en funcionario", "La suspensión indefinida"], "Art. 96.2 EBEP."],
        ["media", "En Aragón, el régimen disciplinario del personal laboral se rige por:", ["La legislación laboral y, en su caso, el convenio colectivo", "El RD 33/1986 en exclusiva", "El Código Penal", "La Ley de Contratos"], "DA 22.ª DLeg 1/1991 y art. 93.4 EBEP."],
        ["media", "No concurrir con la actividad de la empresa es:", ["Un deber básico del trabajador", "Un derecho", "Una causa de suspensión", "Una modalidad de excedencia"], "Art. 5.d) ET."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Ámbito de la Ley 53/1984 (art. 2)", "Se aplica a todo el personal de las Administraciones, cualquiera que sea la naturaleza jurídica de su relación de empleo, incluido el laboral"],
        ["Regla general (art. 1 Ley 53/1984)", "Incompatibilidad con un segundo puesto público y con más de una remuneración pública, salvo excepciones; y con actividades que comprometan la imparcialidad"],
        ["Segundo puesto público laboral (art. 3.1 Ley 53/1984)", "En los casos de interés público fijados por el Gobierno autonómico, la segunda actividad solo puede prestarse en régimen laboral, a tiempo parcial y con duración determinada"],
        ["Compatibilidad previa", "Las actividades privadas del personal laboral requieren también reconocimiento previo de compatibilidad, como las del funcionario"],
        ["Sanción del incumplimiento (art. 20 Ley 53/1984 y art. 95.2.n EBEP)", "Se sanciona por el régimen disciplinario; dar lugar a una situación de incompatibilidad es falta muy grave"],
      ],
      preguntas: [
        ["media", "La Ley de Incompatibilidades se aplica al personal laboral de la Administración aragonesa:", ["Sí, cualquiera que sea la naturaleza jurídica de su relación de empleo", "No, solo a funcionarios", "Solo si es fijo", "Solo si es del grupo A"], "Art. 2 Ley 53/1984."],
        ["media", "Un trabajador laboral de la DGA que quiera ejercer una actividad privada necesita:", ["Reconocimiento previo de compatibilidad", "Nada", "Autorización del comité de empresa", "Excedencia obligatoria"], "Art. 14 Ley 53/1984."],
        ["media", "Incumplir las normas de incompatibilidad dando lugar a una situación de incompatibilidad es falta:", ["Muy grave", "Leve", "Grave", "No es falta"], "Art. 95.2.n) EBEP."],
        ["dificil", "Cuando el Gobierno autonómico autoriza por interés público un segundo puesto, esa actividad solo puede prestarse:", ["En régimen laboral, a tiempo parcial y con duración determinada", "Como funcionario de carrera", "A tiempo completo e indefinido", "Sin ninguna limitación"], "Art. 3.1 Ley 53/1984."],
        ["media", "Con carácter general, no puede percibirse más de una remuneración:", ["Con cargo a presupuestos públicos", "De empresas privadas", "Por derechos de autor", "Por administración del patrimonio personal"], "Art. 1.2 Ley 53/1984."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["Forma del contrato (art. 8.1 ET)", "Por escrito o de palabra; se presume su existencia entre quien presta un servicio por cuenta y dentro de la organización de otro a cambio de retribución"],
        ["Contratos que deben ser escritos (art. 8.2 ET)", "Prácticas, formación y aprendizaje, tiempo parcial, fijos-discontinuos, relevo, obra o servicio, temporales de más de cuatro semanas, a distancia y otros"],
        ["Falta de forma escrita (art. 8.2 ET)", "El contrato se presume indefinido y a jornada completa, salvo prueba en contrario"],
        ["Comunicación y copia básica (art. 8.3-4 ET)", "El empresario comunica el contrato a la oficina de empleo en diez días y entrega copia básica a la representación de los trabajadores en diez días"],
        ["Información por escrito (art. 8.5 ET)", "Si la relación dura más de cuatro semanas, el empresario informa por escrito de los elementos esenciales no recogidos en el contrato"],
        ["Tiempo parcial (art. 12 ET)", "Menos horas que un trabajador a tiempo completo comparable; por escrito con las horas y su distribución; sin horas extraordinarias salvo excepciones; conversión siempre voluntaria"],
        ["Periodo de prueba (art. 14 ET)", "Por escrito, según convenio; en su defecto, máximo seis meses para técnicos titulados y dos meses para los demás (tres en empresas de menos de 25); un mes en temporales de hasta seis meses"],
        ["Efectos del periodo de prueba (art. 14.2-3 ET)", "Mismos derechos que la plantilla; cualquier parte puede resolver; es nulo si ya se desempeñaron las mismas funciones; el tiempo computa en la antigüedad"],
      ],
      preguntas: [
        ["media", "Si un contrato que debía formalizarse por escrito no lo está, se presume:", ["Celebrado por tiempo indefinido y a jornada completa, salvo prueba en contrario", "Nulo", "Temporal a tiempo parcial", "Mercantil"], "Art. 8.2 ET."],
        ["media", "En defecto de convenio, el periodo de prueba de un técnico titulado no puede exceder de:", ["Seis meses", "Dos meses", "Tres meses", "Un año"], "Art. 14.1 ET."],
        ["media", "En defecto de convenio, el periodo de prueba de los trabajadores que no son técnicos titulados no puede exceder, con carácter general, de:", ["Dos meses", "Seis meses", "Un mes", "Quince días"], "Art. 14.1 ET."],
        ["dificil", "Es nulo el pacto de periodo de prueba cuando:", ["El trabajador ya desempeñó las mismas funciones antes en la empresa bajo cualquier modalidad", "El contrato es indefinido", "El trabajador es técnico titulado", "El contrato es a tiempo parcial"], "Art. 14.1 ET."],
        ["media", "Los trabajadores a tiempo parcial, con carácter general:", ["No pueden realizar horas extraordinarias, salvo las del art. 35.3", "Pueden hacer todas las horas extraordinarias que quieran", "No tienen derecho a vacaciones", "No pueden tener contrato indefinido"], "Art. 12.4.c) ET."],
        ["media", "El empresario debe comunicar el contenido del contrato a la oficina pública de empleo en el plazo de:", ["Diez días siguientes a su concertación", "Un mes", "Tres días", "Quince días hábiles"], "Art. 8.3 ET."],
      ],
    },
    {
      seccion: S6,
      flashcards: [
        ["Presunción de indefinido (art. 15.1 ET)", "El contrato de trabajo se presume concertado por tiempo indefinido"],
        ["Causas de temporalidad (art. 15.1 ET)", "Solo por circunstancias de la producción o por sustitución de persona trabajadora, especificando con precisión la causa, las circunstancias y su conexión con la duración"],
        ["Circunstancias de la producción imprevisibles (art. 15.2 ET)", "Incremento ocasional e imprevisible o desajustes temporales (incluidas vacaciones); máximo seis meses, ampliable a un año por convenio sectorial; una sola prórroga"],
        ["Situaciones ocasionales previsibles (art. 15.2 ET)", "Hasta noventa días en el año natural, no continuados (120 en el sector agrario y agroalimentario)"],
        ["Contrato de sustitución (art. 15.3 ET)", "Para sustituir a una persona con reserva de puesto, indicando su nombre y la causa; puede iniciarse hasta quince días antes de la ausencia; también para completar una jornada reducida"],
        ["Temporales en la Administración (arts. 10-11 EBEP)", "El personal laboral temporal atiende necesidades justificadas de necesidad y urgencia y se selecciona con celeridad"],
      ],
      preguntas: [
        ["facil", "El contrato de trabajo se presume concertado:", ["Por tiempo indefinido", "Por seis meses", "Por un año", "Por obra o servicio"], "Art. 15.1 ET."],
        ["media", "El contrato de duración determinada solo puede celebrarse por:", ["Circunstancias de la producción o sustitución de persona trabajadora", "Cualquier causa que acuerden las partes", "Obra o servicio determinado en todo caso", "Lanzamiento de nueva actividad"], "Art. 15.1 ET."],
        ["media", "Un contrato por circunstancias imprevisibles de la producción tiene una duración máxima legal de:", ["Seis meses, ampliable hasta un año por convenio sectorial", "Tres años", "Dos años", "Un mes"], "Art. 15.2 ET."],
        ["dificil", "El contrato por circunstancias ocasionales previsibles puede utilizarse por la empresa, con carácter general, un máximo de:", ["Noventa días en el año natural, no continuados", "Seis meses seguidos", "Ciento ochenta días", "Treinta días"], "Art. 15.2 ET."],
        ["media", "En el contrato de sustitución debe especificarse:", ["El nombre de la persona sustituida y la causa de la sustitución", "Solo la fecha de fin", "El salario del sustituto", "Nada especial"], "Art. 15.3 ET."],
        ["media", "El contrato de sustitución puede iniciarse antes de la ausencia de la persona sustituida como máximo:", ["Quince días", "Un mes", "Tres días", "No puede iniciarse antes"], "Art. 15.3 ET."],
      ],
    },
    {
      seccion: S7,
      flashcards: [
        ["Causas de suspensión (art. 45.1 ET)", "Mutuo acuerdo, causas del contrato, incapacidad temporal, nacimiento y adopción, riesgos en embarazo y lactancia, cargo público, privación de libertad sin condena, sanción, fuerza mayor, causas ETOP, excedencia forzosa, huelga, cierre legal, violencia de género o sexual y permiso parental"],
        ["Efecto de la suspensión (art. 45.2 ET)", "Exonera de las obligaciones recíprocas de trabajar y remunerar el trabajo"],
        ["Reincorporación (art. 48.1 ET)", "Al cesar la causa legal, derecho a volver al puesto reservado (salvo mutuo acuerdo y causas del contrato, en que se estará a lo pactado)"],
        ["Incapacidad permanente revisable (art. 48.2 ET)", "Si se prevé mejoría, subsiste la suspensión con reserva de puesto durante dos años"],
        ["Nacimiento (art. 48.4 ET)", "Suspende el contrato de cada progenitor diecinueve semanas (treinta y dos en monoparentalidad), seis obligatorias tras el parto"],
        ["Excedencia forzosa (art. 46.1 ET)", "Por designación o elección para un cargo público; conserva el puesto y la antigüedad; reingreso en el mes siguiente al cese"],
        ["Excedencia voluntaria (art. 46.2 y 5 ET)", "Con un año de antigüedad, de cuatro meses a cinco años; nueva solo tras cuatro años; solo da derecho preferente al reingreso en vacantes"],
        ["Excedencia por cuidado (art. 46.3 ET)", "Hasta tres años por hijo y hasta dos años por familiar dependiente (más por convenio); computa antigüedad; reserva del puesto el primer año (15 o 18 meses en familias numerosas)"],
      ],
      preguntas: [
        ["media", "La suspensión del contrato de trabajo exonera de:", ["Las obligaciones recíprocas de trabajar y remunerar el trabajo", "El pago de cotizaciones en todo caso", "La antigüedad", "El deber de buena fe"], "Art. 45.2 ET."],
        ["media", "La excedencia voluntaria exige una antigüedad en la empresa de al menos:", ["Un año", "Cinco años", "Seis meses", "Tres años"], "Art. 46.2 ET."],
        ["media", "La excedencia voluntaria tiene una duración:", ["No menor de cuatro meses ni mayor de cinco años", "De uno a tres años", "Indefinida", "Máxima de un año"], "Art. 46.2 ET."],
        ["dificil", "Durante la excedencia por cuidado de hijos del ET, la reserva del puesto de trabajo concreto alcanza, con carácter general:", ["El primer año", "Los tres años", "Seis meses", "Dos años"], "Art. 46.3 ET."],
        ["media", "El trabajador en excedencia voluntaria tiene:", ["Solo un derecho preferente al reingreso en vacantes de igual o similar categoría", "Reserva de su puesto concreto", "Derecho a cobrar el salario", "Derecho a reingresar en cualquier puesto"], "Art. 46.5 ET."],
        ["media", "El nacimiento suspende el contrato de cada progenitor durante:", ["Diecinueve semanas", "Dieciséis semanas", "Diez semanas", "Doce semanas"], "Art. 48.4 ET."],
        ["media", "¿Cuál de estas es causa de suspensión del contrato de trabajo?", ["La incapacidad temporal", "La jubilación", "El despido", "La dimisión"], "Art. 45.1.c) ET."],
      ],
    },
  ],
  glosario: [
    [S1, "Personal laboral fijo", "Trabajador de la Administración con contrato indefinido obtenido tras un proceso selectivo, regido por la legislación laboral y el convenio."],
    [S1, "Convenio colectivo", "Acuerdo negociado entre la Administración y los representantes de los trabajadores que fija sus condiciones de trabajo."],
    [S2, "Concurso de valoración de méritos", "Sistema selectivo, admitido para el personal laboral fijo, que consiste solo en valorar méritos."],
    [S3, "Ocupación efectiva", "Derecho del trabajador a que se le dé trabajo real conforme a su categoría, no solo a cobrar."],
    [S4, "Compatibilidad", "Autorización para que un empleado público ejerza una segunda actividad, pública o privada, en los casos que permite la ley."],
    [S5, "Periodo de prueba", "Tiempo inicial del contrato durante el cual cualquiera de las partes puede resolverlo sin causa ni indemnización."],
    [S5, "Copia básica", "Copia del contrato, sin datos personales, que el empresario entrega a la representación de los trabajadores."],
    [S6, "Contrato de sustitución", "Contrato temporal para cubrir a un trabajador con derecho a reserva de puesto o completar su jornada reducida."],
    [S7, "Suspensión del contrato", "Interrupción temporal de la obligación de trabajar y de pagar el salario sin que el contrato se extinga."],
    [S7, "Excedencia forzosa", "Excedencia por cargo público que conserva el puesto y la antigüedad."],
  ],
  casos: [
    {
      slug: "contratacion-conductor-temporal",
      titulo: "Contratar a un conductor temporal",
      supuesto: "Un servicio provincial del Gobierno de Aragón necesita sustituir a un conductor (laboral fijo) que está de baja por incapacidad temporal, y además reforzar durante tres meses el parque móvil por una campaña de vacunación imprevista. Contrata a dos personas.",
      preguntas: [
        [S6, "media", "Para cubrir al conductor de baja procede un contrato de:", ["Sustitución de persona trabajadora", "Obra o servicio", "Circunstancias de la producción", "Fijo discontinuo"], "Art. 15.3 ET."],
        [S6, "media", "En ese contrato debe figurar:", ["El nombre del trabajador sustituido y la causa de la sustitución", "Solo la fecha de inicio", "La categoría del jefe de servicio", "El nombre del médico"], "Art. 15.3 ET."],
        [S6, "media", "Para el refuerzo de tres meses por la campaña imprevista procede un contrato por:", ["Circunstancias de la producción (incremento ocasional e imprevisible)", "Sustitución", "Formación", "Relevo"], "Art. 15.2 ET."],
        [S6, "media", "Ese contrato no podrá superar, salvo ampliación por convenio sectorial:", ["Seis meses", "Tres años", "Un mes", "Dos años"], "Art. 15.2 ET."],
        [S5, "media", "Ambos contratos, al durar más de cuatro semanas, deben:", ["Formalizarse por escrito", "Ser verbales", "Firmarse ante notario", "Publicarse en el BOA"], "Art. 8.2 ET y art. 8.1 DLeg 1/1991."],
        [S5, "media", "Si se pactara periodo de prueba en el contrato de tres meses, sin convenio que diga otra cosa, no podría exceder de:", ["Un mes", "Seis meses", "Dos meses", "Tres meses"], "Art. 14.1 ET."],
        [S2, "media", "La selección de este personal temporal debe regirse por igualdad, mérito, capacidad y:", ["Celeridad", "Libre elección del jefe", "Antigüedad en el paro", "Sorteo"], "Art. 11.3 EBEP."],
        [S7, "media", "Mientras dura la baja del conductor fijo, su contrato está:", ["Suspendido, con reserva del puesto", "Extinguido", "Convertido en temporal", "Prorrogado automáticamente"], "Arts. 45.1.c) y 48.1 ET."],
        [S7, "media", "Al terminar la incapacidad temporal, el conductor tiene derecho a:", ["Reincorporarse a su puesto reservado", "Una indemnización", "Elegir otro puesto", "Nada"], "Art. 48.1 ET."],
        [S5, "media", "El contenido de los contratos debe comunicarse a la oficina de empleo en:", ["Diez días desde su concertación", "Un mes", "Tres días", "Al finalizar el contrato"], "Art. 8.3 ET."],
      ],
    },
    {
      slug: "trabajadora-laboral-excedencias",
      titulo: "Una trabajadora laboral con hijos",
      supuesto: "Una oficial de mantenimiento, laboral fija del Gobierno de Aragón con seis años de antigüedad, tiene un hijo. Disfruta la suspensión por nacimiento y después pide una excedencia para cuidarlo. Años más tarde, ya con el hijo en el colegio, quiere una excedencia voluntaria para trabajar en el extranjero.",
      preguntas: [
        [S7, "media", "La suspensión de su contrato por nacimiento dura:", ["Diecinueve semanas, seis de ellas obligatorias tras el parto", "Dieciséis semanas", "Un año", "Ocho semanas"], "Art. 48.4 ET; en las Administraciones, art. 7 y 49 EBEP."],
        [S1, "dificil", "En materia de permiso por nacimiento, al ser personal laboral de una Administración se le aplica:", ["El EBEP, no las suspensiones del Estatuto de los Trabajadores", "Solo el Estatuto de los Trabajadores", "Solo el convenio", "El Código Civil"], "Art. 7 EBEP."],
        [S7, "media", "La excedencia por cuidado de hijo del Estatuto de los Trabajadores puede durar hasta:", ["Tres años desde el nacimiento", "Un año", "Cinco años", "Seis meses"], "Art. 46.3 ET."],
        [S7, "media", "Durante esa excedencia, el tiempo computa a efectos de:", ["Antigüedad", "Nada", "Solo vacaciones", "Solo jubilación anticipada"], "Art. 46.3 ET."],
        [S7, "media", "Según el Estatuto de los Trabajadores, la reserva de su puesto concreto alcanza:", ["El primer año; después, un puesto del mismo grupo o categoría equivalente", "Los tres años", "Seis meses", "Ninguna reserva"], "Art. 46.3 ET."],
        [S7, "media", "Para la excedencia voluntaria necesita una antigüedad de al menos:", ["Un año", "Cinco años", "Diez años", "No hay requisito"], "Art. 46.2 ET."],
        [S7, "media", "La excedencia voluntaria podrá durar:", ["Entre cuatro meses y cinco años", "Hasta diez años", "Hasta un año", "Indefinidamente"], "Art. 46.2 ET."],
        [S7, "media", "Al terminar la excedencia voluntaria tendrá:", ["Solo un derecho preferente al reingreso en vacantes de igual o similar categoría", "Su puesto reservado", "Derecho a indemnización", "Derecho a cambiar de categoría"], "Art. 46.5 ET."],
        [S7, "dificil", "¿Podría pedir otra excedencia voluntaria al año de volver?", ["No, deben pasar cuatro años desde el final de la anterior", "Sí, sin límite", "Sí, tras seis meses", "Solo si cambia de puesto"], "Art. 46.2 ET."],
        [S3, "media", "Como empleada pública, además de los derechos del Estatuto de los Trabajadores, tiene:", ["Los derechos y el código de conducta del EBEP", "Solo los del convenio", "Los derechos de los funcionarios de carrera, incluida la inamovilidad", "Ninguno más"], "Arts. 14-15 y 52-54 EBEP."],
      ],
    },
    {
      slug: "falta-muy-grave-laboral",
      titulo: "Un trabajador laboral y una falta muy grave",
      supuesto: "Un trabajador laboral fijo de un centro del Gobierno de Aragón, con funciones de vigilancia, abusa de su autoridad sobre sus compañeros y revela datos confidenciales de usuarios. Además, se descubre que trabaja por las tardes para una empresa que presta servicios al mismo centro, sin compatibilidad.",
      preguntas: [
        [S3, "media", "El régimen disciplinario aplicable es el del EBEP y, en lo no previsto:", ["La legislación laboral y el convenio colectivo", "El RD 33/1986", "El Código Penal", "La Ley de Contratos"], "Art. 93.4 EBEP y DA 22.ª DLeg 1/1991."],
        [S3, "media", "Según el VIII Convenio de la DGA, el abuso de autoridad y la violación del sigilo profesional son faltas:", ["Muy graves", "Leves", "Graves", "No son faltas"], "Art. 111 VIII Convenio (verificado en el tema-32)."],
        [S4, "media", "Trabajar sin compatibilidad para una empresa que presta servicios a su centro:", ["Vulnera la Ley de Incompatibilidades", "Es libre por ser laboral", "Solo requiere avisar al jefe", "Está permitido si es por la tarde"], "Arts. 2, 11 y 14 Ley 53/1984."],
        [S4, "media", "Que esa situación dé lugar a una incompatibilidad es falta:", ["Muy grave", "Leve", "Grave", "No sancionable"], "Art. 95.2.n) EBEP."],
        [S3, "media", "Por faltas muy graves puede imponérsele:", ["El despido disciplinario", "Solo un apercibimiento", "La separación del servicio de los funcionarios", "Una multa económica"], "Art. 96.1.b) EBEP."],
        [S3, "media", "El despido disciplinario comporta además:", ["La inhabilitación para un nuevo contrato con funciones similares", "La pérdida de la nacionalidad", "La prohibición de trabajar en el sector privado", "Nada más"], "Art. 96.1.b) EBEP."],
        [S3, "dificil", "Si el despido se declara improcedente por los tribunales, al ser laboral fijo procede:", ["Su readmisión", "Solo una indemnización", "Su conversión en funcionario", "Una suspensión de seis años"], "Art. 96.2 EBEP."],
        [S3, "media", "La interpretación del régimen disciplinario del convenio se informa por:", ["Los principios del código de conducta del EBEP", "El Código Civil", "Las instrucciones del jefe", "La jurisprudencia penal"], "Art. 108.2 VIII Convenio y art. 52 EBEP."],
        [S3, "media", "Revelar datos confidenciales de usuarios vulnera, entre otros, el deber de:", ["Guardar secreto y discreción", "Ocupación efectiva", "Libre sindicación", "Reunión"], "Art. 53.12 EBEP."],
        [S1, "media", "Su puesto de vigilancia puede ser laboral porque, según la ley aragonesa:", ["La vigilancia y custodia pueden desempeñarse por personal laboral", "Todos los puestos son laborales", "Lo decide el trabajador", "Es un puesto de libre designación"], "Art. 8.2.c) DLeg 1/1991."],
      ],
    },
  ],
});
