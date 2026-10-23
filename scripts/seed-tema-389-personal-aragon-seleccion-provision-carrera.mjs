/**
 * Crea tema-389 — Tema 17 de Administrativo DGA (tema 12 del programa de
 * materias específicas): "El personal de la Administración de la
 * Comunidad Autónoma de Aragón (II). El personal funcionario. Selección.
 * Provisión de puestos de trabajo. Promoción profesional de los
 * funcionarios."
 *
 * Fuentes (textos consolidados leídos en esta sesión en la API del BOE):
 * - Decreto Legislativo 1/1991, texto refundido de la Ley de Ordenación de
 *   la Función Pública de Aragón (BOA-d-1991-90001): arts. 19-22, 24-46 y
 *   disposiciones adicionales decimocuarta y vigésima tercera.
 * - RDLeg 5/2015, texto refundido del EBEP (BOE-A-2015-11719): arts. 16-20,
 *   55-62 y 78-84.
 * - Bases de la convocatoria de 2025 (BOA núm. 247, 23-12-2025), leídas
 *   íntegras: oposición más curso selectivo, como ejemplo real.
 * Laguna señalada: el Reglamento aragonés de provisión de puestos, carrera
 * administrativa y promoción profesional (Decreto 80/1997, modificado por
 * el Decreto 129/2020) y el Decreto 122/1986 del IAAP solo están en el BOA
 * y no se han leído en esta sesión; el tema no desarrolla sus detalles y se
 * limita a mencionar que existen y que la convocatoria los declara
 * aplicables.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-389-personal-aragon-seleccion-provision-carrera.mjs
 */
import { sembrarTema, ADMIN_DGA } from "./lib/sembrar-tema.mjs";

const LOFPA = "https://www.boe.es/buscar/act.php?id=BOA-d-1991-90001";
const EBEP = "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11719";
const S1 = "seleccion-principios-requisitos";
const S2 = "procesos-selectivos-aragon";
const S3 = "provision-concurso-libre-designacion";
const S4 = "movilidad-adscripcion-provisional";
const S5 = "carrera-grado-personal";
const S6 = "promocion-interna";

await sembrarTema({
  tema: {
    slug: "tema-389",
    titulo: "El personal de la Administración de Aragón (II): el personal funcionario; selección, provisión de puestos y promoción profesional",
    descripcion: "Selección del personal funcionario: principios, requisitos de acceso, nacionalidad, discapacidad, órganos de selección y sistemas selectivos (EBEP), convocatorias, tribunales, curso de formación y nombramiento en Aragón, e Instituto Aragonés de Administración Pública. Provisión de puestos: concurso (abierto y permanente en Aragón) y libre designación, plazo mínimo de permanencia, remoción y cese, adscripción provisional, comisión de servicios, movilidad por salud y movilidad entre Administraciones. Promoción profesional: carrera horizontal y vertical, grado personal y su consolidación, niveles, promoción interna y promoción interna temporal.",
    contenido: "Cómo se llega a ser funcionario del Gobierno de Aragón y cómo se progresa después: qué requisitos hay que cumplir, cómo se componen los tribunales, qué es el curso selectivo y cómo se elige el primer destino. Luego, cómo se cambia de puesto (concurso de méritos, libre designación, comisión de servicios), cómo se consolida el grado personal desempeñando un puesto dos años seguidos o tres con interrupciones, y cómo se asciende de grupo por promoción interna.",
    enlaces_boe: [
      { url: LOFPA, titulo: "Decreto Legislativo 1/1991, texto refundido de la Ley de Ordenación de la Función Pública de Aragón (BOA-d-1991-90001)" },
      { url: EBEP, titulo: "Real Decreto Legislativo 5/2015, texto refundido del Estatuto Básico del Empleado Público (BOE-A-2015-11719)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "Acceso al empleo público: principios, requisitos y órganos de selección", articulos: "arts. 55-61 EBEP", url: `${EBEP}#a55` },
      { seccion: S2, titulo: "Procesos selectivos y nombramiento en Aragón", articulos: "arts. 24-29 y 46 DLeg 1/1991; art. 62 EBEP", url: LOFPA },
      { seccion: S3, titulo: "Provisión de puestos: concurso y libre designación", articulos: "arts. 22 y 30-34 DLeg 1/1991; arts. 78-80 EBEP", url: `${EBEP}#a78` },
      { seccion: S4, titulo: "Movilidad, adscripción provisional y otras formas de provisión", articulos: "arts. 19-21 y 43 y DA 14.ª DLeg 1/1991; arts. 81-84 EBEP", url: `${EBEP}#a81` },
      { seccion: S5, titulo: "Carrera administrativa y grado personal", articulos: "arts. 36-43 DLeg 1/1991; arts. 16-17 y 20 EBEP", url: `${EBEP}#a16` },
      { seccion: S6, titulo: "Promoción interna y promoción interna temporal", articulos: "arts. 44-45 y DA 23.ª DLeg 1/1991; art. 18 EBEP", url: `${EBEP}#a18` },
    ],
  },
  vinculo: { oposicion: ADMIN_DGA.oposicion, bloqueId: ADMIN_DGA.bloquePersonal, numero: 17 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Principios de acceso (art. 55 EBEP)", "Igualdad, mérito y capacidad, más publicidad, transparencia, imparcialidad y profesionalidad de los órganos de selección, independencia, adecuación de las pruebas a las funciones y agilidad"],
        ["Requisitos generales (art. 56 EBEP)", "Nacionalidad española (con excepciones), capacidad funcional, 16 años cumplidos y no superar la edad de jubilación forzosa, no estar separado ni inhabilitado y poseer la titulación"],
        ["Nacionales de otros Estados (art. 57 EBEP)", "Los de la UE acceden como funcionarios salvo a empleos con ejercicio de poder público; los extranjeros con residencia legal pueden acceder como personal laboral"],
        ["Discapacidad (art. 59 EBEP)", "Reserva mínima del 7 % de las vacantes y adaptaciones de tiempos y medios en las pruebas y en el puesto"],
        ["Órganos de selección (art. 60 EBEP)", "Colegiados, imparciales y profesionales, tendentes a la paridad; no pueden formar parte el personal de elección o designación política, los interinos ni los eventuales; pertenencia individual"],
        ["Sistemas selectivos de funcionarios (art. 61.6 EBEP)", "Oposición y concurso-oposición; el concurso solo excepcionalmente y en virtud de ley"],
        ["Valoración de méritos (art. 61.3 EBEP)", "Si se valoran méritos, su puntuación será proporcionada y no determinará por sí sola el resultado"],
        ["Aprobados y plazas (art. 61.8 EBEP)", "No pueden proponerse más aprobados que plazas, salvo que lo prevea la convocatoria; ante renuncias puede pedirse una relación complementaria"],
      ],
      preguntas: [
        ["media", "Para participar en procesos selectivos se exige tener cumplidos:", ["Dieciséis años y no exceder de la edad de jubilación forzosa", "Dieciocho años", "Veintiún años", "Dieciséis años y no superar los cuarenta"], "Art. 56.1.c) EBEP."],
        ["media", "¿Quién NO puede formar parte de un órgano de selección?", ["Un funcionario interino", "Un funcionario de carrera del mismo grupo", "Un experto independiente", "Un funcionario de otra Administración"], "Art. 60.2 EBEP."],
        ["media", "Los sistemas selectivos ordinarios de los funcionarios de carrera son:", ["La oposición y el concurso-oposición", "El concurso y la libre designación", "La entrevista y el sorteo", "La libre designación y la oposición"], "Art. 61.6 EBEP."],
        ["dificil", "El sistema de concurso (solo valoración de méritos) para funcionarios de carrera:", ["Solo puede aplicarse excepcionalmente en virtud de ley", "Es el sistema ordinario", "Está prohibido en todo caso", "Puede aplicarlo libremente cada convocatoria"], "Art. 61.6 EBEP."],
        ["media", "Los extranjeros con residencia legal en España pueden acceder a las Administraciones Públicas:", ["Como personal laboral, en igualdad de condiciones", "Como funcionarios de carrera en cualquier cuerpo", "Solo como personal eventual", "No pueden acceder"], "Art. 57.4 EBEP."],
        ["media", "La pertenencia a los órganos de selección es:", ["Siempre a título individual", "En representación de los sindicatos", "En representación del departamento", "Por designación del Parlamento"], "Art. 60.3 EBEP."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Sistemas en Aragón (arts. 25 y 27 DLeg 1/1991)", "Concurso, oposición o concurso-oposición libre; la oposición es la regla, salvo que la naturaleza de las funciones aconseje el concurso-oposición o, excepcionalmente, el concurso"],
        ["Contenido de la convocatoria (art. 26.1 DLeg 1/1991)", "Vacantes y cuerpo, reserva de promoción interna, requisitos, pruebas y programas, calendario, composición del tribunal, derechos de examen y modelo de instancia"],
        ["Tribunales en Aragón (art. 26.2 DLeg 1/1991)", "Mínimo cinco miembros (presidente y secretario incluidos) con otros tantos suplentes; titulación igual o superior a la exigida; al menos tres de la misma área de conocimientos"],
        ["Más aprobados que plazas (art. 26.3 DLeg 1/1991)", "Las propuestas que aprueben a más aspirantes que plazas convocadas son nulas de pleno derecho"],
        ["Fase de concurso (art. 27.3 DLeg 1/1991)", "En el concurso-oposición, la puntuación del concurso no puede aplicarse para superar los ejercicios de la oposición"],
        ["Curso de formación (art. 28.1 DLeg 1/1991)", "Puede exigirse un curso de formación complementaria, que puede tener carácter eliminatorio (la convocatoria de 2025 prevé uno en línea de 20 horas, apto o no apto)"],
        ["Nombramiento (art. 28.2 DLeg 1/1991)", "Por orden del consejero competente en función pública, publicada en el BOA, hasta el límite de plazas convocadas"],
        ["Adquisición de la condición (art. 62 EBEP)", "Superación del proceso, nombramiento publicado, acatamiento de la Constitución y del Estatuto de Autonomía, y toma de posesión en plazo"],
        ["Primer destino (art. 28.3 DLeg 1/1991)", "Según las necesidades del servicio y las preferencias manifestadas por riguroso orden de puntuación final"],
        ["Instituto Aragonés de Administración Pública (art. 46 DLeg 1/1991)", "Desarrolla la selección, formación y perfeccionamiento del personal; organiza los cursos para la obtención de grados superiores"],
      ],
      preguntas: [
        ["media", "Según el texto refundido aragonés, los tribunales de selección tendrán como mínimo:", ["Cinco miembros, con otros tantos suplentes", "Tres miembros", "Siete miembros", "Cuatro miembros"], "Art. 26.2 DLeg 1/1991."],
        ["media", "Si un tribunal declara aprobados a más aspirantes que plazas convocadas, su propuesta es:", ["Nula de pleno derecho", "Anulable", "Válida si hay presupuesto", "Válida con informe sindical"], "Art. 26.3 DLeg 1/1991."],
        ["media", "Los funcionarios del Cuerpo Ejecutivo de nuevo ingreso son nombrados por:", ["Orden del consejero competente en función pública, publicada en el BOA", "Decreto del Presidente", "Resolución del tribunal", "Acuerdo de las Cortes"], "Art. 28.2 DLeg 1/1991."],
        ["media", "¿Cuál de estos NO es requisito para adquirir la condición de funcionario de carrera según el art. 62 del EBEP?", ["Superar un periodo de prueba de seis meses", "Superar el proceso selectivo", "Acatar la Constitución y el Estatuto de Autonomía", "Tomar posesión en plazo"], "Art. 62.1 EBEP."],
        ["dificil", "En un concurso-oposición, la puntuación obtenida en la fase de concurso:", ["No puede aplicarse para superar los ejercicios de la oposición", "Suma para aprobar cada ejercicio", "Sustituye a la oposición", "Solo se usa para desempatar el primer ejercicio"], "Art. 27.3 DLeg 1/1991."],
        ["media", "El primer destino de los nuevos funcionarios se adjudica:", ["Según las preferencias y por riguroso orden de puntuación final", "Por sorteo", "Por antigüedad en el padrón", "Por libre designación"], "Art. 28.3 DLeg 1/1991."],
        ["media", "El órgano que desarrolla en Aragón la selección y formación del personal es:", ["El Instituto Aragonés de Administración Pública", "El INAP estatal en exclusiva", "La Universidad de Zaragoza", "El Consejo Consultivo"], "Art. 46 DLeg 1/1991."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Procedimientos de provisión (art. 78 EBEP)", "Concurso y libre designación con convocatoria pública, con igualdad, mérito, capacidad y publicidad"],
        ["Concurso (art. 79 EBEP y art. 31 DLeg 1/1991)", "Sistema normal de provisión: valoración de méritos (grado, trabajo desarrollado, formación, antigüedad) por órganos técnicos colegiados"],
        ["Concurso abierto y permanente en Aragón (art. 22 DLeg 1/1991)", "Convocatoria única con cuatro turnos anuales trimestrales; los puestos se ofertan en la Plataforma de Provisión de Puestos y se solicitan electrónicamente"],
        ["Méritos en el concurso abierto (art. 22.4 DLeg 1/1991)", "Pueden aportarse en cualquier momento, pero no se valoran los generados en los tres meses anteriores a cada turno"],
        ["Plazo mínimo de permanencia (art. 33.4 DLeg 1/1991)", "No se puede concursar en los dos años siguientes a la toma de posesión del último destino definitivo, salvo excepciones"],
        ["Libre designación (art. 80 EBEP y art. 30 DLeg 1/1991)", "Apreciación discrecional de la idoneidad para puestos de especial responsabilidad y confianza; convocatoria en el BOA; puede declararse desierta"],
        ["Cese en libre designación (art. 30.3-4 DLeg 1/1991)", "Remoción discrecional motivada; el funcionario cesado es adscrito provisionalmente en seis meses a otro puesto de nivel no inferior en más de dos al de su grado"],
        ["Remoción en puestos de concurso (art. 31.3 DLeg 1/1991)", "Por circunstancias sobrevenidas o rendimiento notoriamente insuficiente, con resolución motivada, audiencia y oída la Junta de Personal"],
      ],
      preguntas: [
        ["facil", "El sistema normal de provisión de puestos de trabajo es:", ["El concurso", "La libre designación", "La comisión de servicios", "La adscripción provisional"], "Art. 79.1 EBEP y art. 31.1 DLeg 1/1991."],
        ["media", "En Aragón, el concurso de méritos para puestos de funcionarios de carrera se rige por:", ["Una convocatoria única abierta y permanente con turnos trimestrales", "Una convocatoria cada cinco años", "Sorteo anual", "Propuesta del jefe de servicio"], "Art. 22.1 DLeg 1/1991."],
        ["media", "Como regla general, un funcionario no puede participar en concursos durante los:", ["Dos años siguientes a su toma de posesión en el último destino definitivo", "Cinco años siguientes", "Seis meses siguientes", "Diez años siguientes"], "Art. 33.4 DLeg 1/1991."],
        ["media", "Los funcionarios nombrados por libre designación:", ["Pueden ser removidos discrecionalmente mediante resolución motivada", "Son inamovibles en el puesto", "Solo cesan por sanción", "Cesan automáticamente cada dos años"], "Art. 30.3 DLeg 1/1991 y art. 80.4 EBEP."],
        ["dificil", "En el concurso abierto y permanente aragonés, NO se valoran los méritos generados:", ["Durante los tres meses inmediatamente anteriores a cada turno trimestral", "Durante el último año", "Fuera de Aragón", "Antes del ingreso"], "Art. 22.4 DLeg 1/1991."],
        ["media", "Un funcionario cesado en un puesto de libre designación sin obtener otro será adscrito provisionalmente a un puesto cuyo nivel no sea inferior:", ["En más de dos niveles al de su grado personal consolidado", "En más de cinco niveles", "Al del puesto que ocupaba", "Al nivel 30"], "Art. 30.4 DLeg 1/1991."],
        ["media", "La remoción de un puesto obtenido por concurso por rendimiento insuficiente exige:", ["Resolución motivada, audiencia del interesado y oír a la Junta de Personal", "Solo una orden verbal", "Sentencia judicial", "Acuerdo del Gobierno"], "Art. 31.3 DLeg 1/1991."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Movilidad entre Administraciones (art. 19 DLeg 1/1991 y art. 84 EBEP)", "Las convocatorias pueden abrirse a funcionarios de otras Administraciones dentro de lo que permita la RPT; quienes obtienen destino en otra pasan a servicio en otras Administraciones Públicas"],
        ["Traslado por necesidades del servicio (art. 81.2 EBEP)", "Motivado, a otras unidades u organismos, respetando retribuciones y condiciones esenciales; si implica cambio de residencia, prioridad a la voluntariedad e indemnizaciones"],
        ["Provisión urgente (art. 81.3 EBEP)", "En caso de urgente e inaplazable necesidad, los puestos pueden proveerse provisionalmente y deben convocarse después"],
        ["Supresión del puesto (art. 43.2-4 DLeg 1/1991)", "Adscripción provisional a otro puesto del cuerpo (nivel no inferior en más de dos al grado); si no lo hay, adscripción funcional hasta seis meses"],
        ["Movilidad por salud (DA 14.ª DLeg 1/1991)", "Adscripción a otra unidad o localidad por motivos de salud o rehabilitación del funcionario, su cónyuge o hijos a cargo, con informe médico y reserva del puesto de origen"],
        ["Violencia de género y terrorismo (art. 82 EBEP)", "Derecho al traslado a otro puesto de análogas características, con la consideración de traslado forzoso"],
        ["Permutas (art. 33.5 DLeg 1/1991)", "Excepcionales, entre puestos del mismo nivel que no sean de libre designación, con permanencia mínima de dos años"],
        ["Comisión de servicios", "Forma extraordinaria de provisión temporal regulada en el reglamento aragonés de provisión (Decreto 80/1997); sus acuerdos para puestos de libre designación se publican mensualmente en el BOA (art. 41.1 DLeg 1/1991)"],
      ],
      preguntas: [
        ["media", "Un funcionario aragonés que obtiene por concurso un puesto en otra Administración queda, respecto de la de origen, en situación de:", ["Servicio en otras Administraciones Públicas", "Excedencia forzosa", "Servicios especiales", "Suspensión"], "Art. 84.3 EBEP."],
        ["media", "Si se suprime el puesto de un funcionario que lo obtuvo por concurso, será adscrito provisionalmente a otro puesto cuyo nivel no sea inferior:", ["En más de dos niveles al de su grado personal consolidado", "Al del nivel máximo de su cuerpo", "En más de un nivel", "Al del puesto suprimido"], "Art. 43.2 DLeg 1/1991."],
        ["media", "La adscripción funcional por inexistencia de puesto adecuado no puede superar:", ["Seis meses", "Un año", "Tres meses", "Dos años"], "Art. 43.3 DLeg 1/1991."],
        ["media", "La movilidad por motivos de salud del funcionario o de sus familiares en Aragón requiere, entre otros requisitos:", ["Informe del servicio médico oficial y existencia de vacantes adecuadas", "Autorización judicial", "Acuerdo del Gobierno", "Que el familiar trabaje en la Administración"], "DA 14.ª DLeg 1/1991."],
        ["dificil", "Las permutas de puestos entre funcionarios en Aragón exigen, entre otras condiciones:", ["Que sean puestos del mismo nivel, no de libre designación, y permanecer al menos dos años", "Que sean de distinto grupo", "Que lo pida el jefe de servicio", "Que no hayan cumplido un año de antigüedad"], "Art. 33.5 DLeg 1/1991."],
        ["media", "El traslado de una funcionaria víctima de violencia de género a otro puesto:", ["Es un derecho y tiene la consideración de traslado forzoso", "Requiere concurso", "Requiere vacante de necesaria cobertura en todo caso", "Supone pérdida de retribuciones"], "Art. 82.1 EBEP."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["Carrera profesional (art. 16 EBEP)", "Conjunto ordenado de oportunidades de ascenso y expectativas de progreso: carrera horizontal, carrera vertical, promoción interna vertical y horizontal"],
        ["Carrera horizontal (arts. 16-17 EBEP)", "Progresión de grado, categoría o escalón sin cambiar de puesto, valorando trayectoria, calidad del trabajo, conocimientos y evaluación del desempeño"],
        ["Carrera vertical (art. 16.3.b EBEP)", "Ascenso en la estructura de puestos de trabajo mediante los procedimientos de provisión"],
        ["Evaluación del desempeño (art. 20 EBEP)", "Mide la conducta profesional y el rendimiento; con criterios de transparencia, objetividad, imparcialidad y no discriminación"],
        ["Carrera en Aragón (art. 36 DLeg 1/1991)", "Ascenso de grado personal dentro del cuerpo y promoción a un cuerpo del grupo inmediatamente superior"],
        ["Niveles (art. 37 DLeg 1/1991)", "Los puestos se clasifican en treinta niveles; cada cuerpo tiene un intervalo de niveles"],
        ["Adquisición del grado (art. 39.1 DLeg 1/1991)", "Desempeño de uno o más puestos del nivel durante dos años continuados o tres con interrupción"],
        ["Puesto muy superior (art. 39.2 DLeg 1/1991)", "Si se obtiene un puesto superior en más de dos niveles al grado, se consolida cada dos años el grado superior en dos niveles, sin superar el del puesto"],
        ["Grado inicial (art. 40.1 DLeg 1/1991)", "El nivel mínimo del intervalo de su cuerpo o escala, con independencia del nivel del primer destino"],
        ["Garantía del grado (art. 43.1 DLeg 1/1991)", "Cualquiera que sea el puesto que desempeñe, el funcionario percibe al menos el complemento de destino del nivel de su grado personal"],
        ["Reconocimiento del grado (art. 38.2 DLeg 1/1991)", "Lo reconoce el órgano directivo competente en recursos humanos y se anota en el Registro de Personal"],
      ],
      preguntas: [
        ["media", "En la Administración aragonesa, los puestos de trabajo se clasifican en:", ["Treinta niveles", "Veinte niveles", "Cinco grupos", "Diez categorías"], "Art. 37.1 DLeg 1/1991."],
        ["media", "El grado personal se adquiere por el desempeño de puestos del nivel correspondiente durante:", ["Dos años continuados o tres con interrupción", "Un año continuado", "Cinco años", "Tres años continuados o cuatro con interrupción"], "Art. 39.1 DLeg 1/1991."],
        ["dificil", "Un funcionario con grado 16 obtiene un puesto de nivel 22. Cada dos años de servicios continuados consolidará:", ["El grado superior en dos niveles al que posea, sin superar el 22", "Directamente el grado 22", "Un nivel más cada año", "Nada, porque supera su intervalo"], "Art. 39.2 DLeg 1/1991."],
        ["media", "La carrera horizontal consiste en:", ["Progresar de grado, categoría o escalón sin cambiar de puesto", "Ascender a otro cuerpo", "Cambiar de puesto por concurso", "Trasladarse de localidad"], "Art. 16.3.a) EBEP."],
        ["media", "Cualquiera que sea el puesto que desempeñe, el funcionario tiene derecho a percibir al menos:", ["El complemento de destino del nivel de su grado personal", "El complemento específico máximo", "Las retribuciones del puesto superior", "La productividad media"], "Art. 43.1 DLeg 1/1991."],
        ["media", "El grado personal inicial de un funcionario de nuevo ingreso corresponde al:", ["Nivel mínimo del intervalo de su cuerpo o escala", "Nivel de su primer destino", "Nivel máximo de su grupo", "Nivel 15 en todo caso"], "Art. 40.1 DLeg 1/1991."],
        ["media", "La evaluación del desempeño mide:", ["La conducta profesional y el rendimiento o logro de resultados", "Solo la antigüedad", "Solo la titulación", "La opinión de los ciudadanos"], "Art. 20.1 EBEP."],
      ],
    },
    {
      seccion: S6,
      flashcards: [
        ["Promoción interna (art. 18 EBEP)", "Mediante procesos selectivos con igualdad, mérito y capacidad; requiere los requisitos de ingreso, dos años de servicio activo en el subgrupo inferior y superar las pruebas"],
        ["Promoción interna en Aragón (art. 44.1 DLeg 1/1991)", "Ascenso a una escala del cuerpo del grupo inmediatamente superior con dos años de antigüedad en el inferior y la titulación exigida"],
        ["Plazas de promoción interna (art. 44.2 DLeg 1/1991)", "Las convocatorias reservan plazas; las que quedan vacantes por no alcanzar la puntuación mínima se acumulan al turno libre; pueden convocarse separadamente si lo autoriza el Gobierno"],
        ["Sistema de ascenso (art. 45 DLeg 1/1991)", "Concurso-oposición; en la oposición pueden eximirse conocimientos ya acreditados; la puntuación del concurso no sirve para superar el mínimo de la oposición"],
        ["Del C1 al grupo A (DT 3.ª EBEP)", "Los funcionarios del subgrupo C1 con la titulación exigida pueden promocionar al grupo A sin pasar por el grupo B"],
        ["Promoción interna horizontal (art. 16.3.d EBEP y art. 44.3 DLeg 1/1991)", "Acceso a otro cuerpo o escala del mismo subgrupo, con exención de las pruebas sobre conocimientos ya exigidos"],
        ["Promoción interna temporal (DA 23.ª DLeg 1/1991)", "Desempeño provisional de puestos de escalas del mismo subgrupo o del inmediato superior; el funcionario queda en servicio activo en la nueva escala y en excedencia voluntaria por incompatibilidad en la de origen, con reserva del puesto"],
        ["Promoción cruzada (DA 8.ª DLeg 1/1991)", "Pueden convocarse procesos de promoción interna cruzada a cuerpos del subgrupo C2 con participación del personal laboral fijo del convenio"],
      ],
      preguntas: [
        ["media", "Para la promoción interna se exige, entre otros requisitos, una antigüedad de al menos:", ["Dos años de servicio activo en el subgrupo inferior", "Cinco años", "Un año", "Tres años"], "Art. 18.2 EBEP y art. 44.1 DLeg 1/1991."],
        ["media", "En Aragón, las pruebas selectivas para ascenso por promoción interna se efectúan mediante:", ["Concurso-oposición", "Concurso de méritos exclusivamente", "Libre designación", "Entrevista"], "Art. 45.1 DLeg 1/1991."],
        ["media", "Las plazas de promoción interna que quedan vacantes por no alcanzar los aspirantes la puntuación mínima:", ["Se acumulan a las del turno de acceso libre", "Se pierden", "Se cubren con interinos indefinidamente", "Se reservan para el año siguiente"], "Art. 44.2 DLeg 1/1991."],
        ["dificil", "Un funcionario del subgrupo C1 con título de Grado puede promocionar:", ["Al grupo A sin necesidad de pasar por el grupo B", "Solo al grupo B", "Solo dentro del C1", "Solo al subgrupo C2"], "DT 3.ª.3 EBEP."],
        ["media", "Durante la promoción interna temporal, el funcionario en su escala de origen queda en situación de:", ["Excedencia voluntaria por incompatibilidad, con reserva de su puesto", "Servicios especiales", "Suspensión", "Servicio activo en ambas"], "DA 23.ª DLeg 1/1991."],
        ["media", "El acceso a otro cuerpo o escala del mismo subgrupo se denomina:", ["Promoción interna horizontal", "Carrera vertical", "Promoción interna vertical", "Comisión de servicios"], "Art. 16.3.d) EBEP."],
      ],
    },
  ],
  glosario: [
    [S1, "Órgano de selección", "Tribunal o comisión colegiada, imparcial y profesional, que valora a los aspirantes de un proceso selectivo."],
    [S2, "Concurso-oposición", "Sistema selectivo que combina pruebas de capacidad (oposición) con la valoración de méritos (concurso), que no puede servir para aprobar los ejercicios."],
    [S2, "Curso selectivo", "Formación posterior a las pruebas que forma parte del proceso y que hay que superar para ser nombrado."],
    [S3, "Concurso de méritos", "Procedimiento normal para cambiar de puesto, en el que se valoran grado, trabajo desarrollado, formación y antigüedad."],
    [S3, "Libre designación", "Provisión discrecional, con convocatoria pública, de puestos de especial responsabilidad y confianza; el titular puede ser cesado libremente."],
    [S4, "Adscripción provisional", "Asignación temporal de un puesto a un funcionario que se ha quedado sin destino definitivo, hasta que obtenga otro."],
    [S4, "Comisión de servicios", "Forma temporal y extraordinaria de cubrir un puesto por urgente necesidad con un funcionario que conserva su puesto de origen."],
    [S5, "Grado personal", "Nivel que el funcionario consolida desempeñando puestos de ese nivel y que le garantiza un complemento de destino mínimo."],
    [S5, "Nivel del puesto", "Posición de un puesto en la escala de 1 a 30 que determina su complemento de destino."],
    [S6, "Promoción interna", "Ascenso de un funcionario a un cuerpo o escala de un subgrupo superior (vertical) o del mismo subgrupo (horizontal) mediante pruebas."],
  ],
  casos: [
    {
      slug: "aprobado-oposicion-nombramiento",
      titulo: "De aprobado a funcionario",
      supuesto: "Una aspirante supera los dos ejercicios de la oposición de Administrativos del Gobierno de Aragón con la puntuación 48. El tribunal publica la lista de aprobados. A continuación deberá realizar el curso de formación, presentar documentación y elegir destino.",
      preguntas: [
        [S2, "media", "El tribunal no puede declarar aprobados a más aspirantes que plazas; si lo hiciera, la propuesta sería:", ["Nula de pleno derecho", "Anulable", "Válida", "Irregular sin efectos"], "Art. 26.3 DLeg 1/1991."],
        [S2, "media", "El curso de formación de la convocatoria de 2025 se califica como:", ["Apto o no apto", "De 0 a 10 puntos", "De 0 a 40 puntos", "No se califica"], "Base 8.7 de la convocatoria de 2025 y art. 28.1 DLeg 1/1991."],
        [S2, "media", "Superado todo, será nombrada funcionaria por:", ["Orden del consejero competente en función pública publicada en el BOA", "Resolución del tribunal", "Decreto del Gobierno", "El Justicia de Aragón"], "Art. 28.2 DLeg 1/1991; base 11.1 de la convocatoria."],
        [S2, "media", "Para adquirir la condición de funcionaria debe, además, acatar:", ["La Constitución y el Estatuto de Autonomía de Aragón", "Solo el convenio colectivo", "El reglamento interno del departamento", "Las instrucciones del tribunal"], "Art. 62.1.c) EBEP."],
        [S2, "media", "El último requisito para adquirir la condición es:", ["La toma de posesión en plazo", "La publicación de la oferta", "La superación del periodo de prueba", "La firma de un contrato"], "Art. 62.1.d) EBEP."],
        [S2, "media", "Si no acredita los requisitos de la convocatoria tras superar el proceso:", ["No podrá ser nombrada y quedarán sin efecto las actuaciones", "Se la nombrará igualmente", "Se le dará un año para obtenerlos", "Pasará a la lista de interinos automáticamente"], "Art. 62.2 EBEP."],
        [S2, "media", "Su primer destino se adjudicará:", ["Según sus preferencias y por riguroso orden de puntuación final", "Por sorteo", "Por libre designación", "Según la antigüedad en la lista de espera"], "Art. 28.3 DLeg 1/1991."],
        [S5, "media", "Su grado personal inicial será:", ["El nivel mínimo del intervalo de su cuerpo o escala", "El nivel de su primer destino", "El nivel 30", "Ninguno hasta los dos años"], "Art. 40.1 DLeg 1/1991."],
        [S3, "media", "Tras su primer destino definitivo, no podrá concursar a otro puesto hasta pasados:", ["Dos años desde la toma de posesión, salvo excepciones", "Seis meses", "Cinco años", "Un año"], "Art. 33.4 DLeg 1/1991."],
        [S1, "media", "Si hubiera quedado sin plaza pero el órgano convocante necesitara cubrir renuncias, podría pedirse al tribunal:", ["Una relación complementaria de aspirantes que sigan a los propuestos", "Una nueva oposición", "Su nombramiento sin requisitos", "Nada, no está previsto"], "Art. 61.8 EBEP; base 1.2 de la convocatoria."],
      ],
    },
    {
      slug: "concurso-trimestral-plataforma",
      titulo: "Concursar para cambiar de puesto",
      supuesto: "Un administrativo con grado consolidado 18, que lleva tres años en su puesto de nivel 18 obtenido por concurso, quiere un puesto de nivel 20 en otro departamento. Ve que el puesto aparece en la Plataforma de Provisión de Puestos en el turno de abril y que acaba de terminar un curso de formación en marzo.",
      preguntas: [
        [S3, "media", "¿Puede concursar?", ["Sí, porque han pasado más de dos años desde su toma de posesión", "No, debe esperar cinco años", "Solo si lo autoriza su jefe", "No, nunca puede cambiar de departamento"], "Art. 33.4 DLeg 1/1991."],
        [S3, "media", "Los concursos en Aragón se rigen por una convocatoria:", ["Única, abierta y permanente, con turnos trimestrales", "Anual en enero", "Bienal", "Solo cuando lo decida cada departamento"], "Art. 22.1 DLeg 1/1991."],
        [S3, "media", "La solicitud debe presentarse:", ["Electrónicamente, seleccionando los puestos por orden de preferencia en la Plataforma", "En papel en el registro", "Por correo postal", "Verbalmente al jefe de servicio"], "Art. 22.4 DLeg 1/1991."],
        [S3, "dificil", "El curso terminado en marzo, ¿se valorará en el turno de abril?", ["No, no se valoran los méritos generados en los tres meses anteriores al turno", "Sí, siempre", "Sí, con doble valor", "Solo si es de más de 20 horas"], "Art. 22.4 DLeg 1/1991."],
        [S3, "media", "En el concurso se tienen en cuenta méritos como:", ["Grado personal, trabajo desarrollado, cursos de formación y antigüedad", "La opinión del consejero", "La afiliación sindical", "El lugar de residencia"], "Art. 31.1 DLeg 1/1991."],
        [S5, "media", "Si obtiene el puesto de nivel 20, para consolidar el grado 20 necesitará desempeñarlo:", ["Dos años continuados o tres con interrupción", "Seis meses", "Cinco años", "Un año"], "Art. 39.1 DLeg 1/1991."],
        [S5, "media", "Mientras tanto, cobrará el complemento de destino:", ["Del nivel del puesto que desempeñe (20), y nunca menos que el de su grado", "Del nivel 18 únicamente", "Del nivel 30", "Ninguno"], "Art. 43.1 DLeg 1/1991."],
        [S3, "media", "Si después le removieran del puesto obtenido por concurso por rendimiento insuficiente, sería necesario:", ["Resolución motivada, audiencia y oír a la Junta de Personal", "Una simple orden verbal", "Un expediente disciplinario por falta muy grave", "Una sentencia"], "Art. 31.3 DLeg 1/1991."],
        [S4, "media", "Si, en cambio, su nuevo puesto se suprimiera, sería adscrito provisionalmente a otro de nivel no inferior en más de:", ["Dos niveles a su grado personal consolidado", "Cinco niveles", "Un nivel", "Diez niveles"], "Art. 43.2 DLeg 1/1991."],
        [S4, "media", "Si no hubiera puesto adecuado, se le asignarían funciones en adscripción funcional por un máximo de:", ["Seis meses", "Dos años", "Un mes", "Indefinidamente"], "Art. 43.3 DLeg 1/1991."],
      ],
    },
    {
      slug: "promocion-interna-c2-c1",
      titulo: "De auxiliar a administrativo por promoción interna",
      supuesto: "Una funcionaria del Cuerpo Auxiliar (C2) del Gobierno de Aragón, con cuatro años de servicio y título de Bachiller, quiere ascender al Cuerpo Ejecutivo (C1). Mientras se convoca el proceso, su departamento le ofrece desempeñar provisionalmente un puesto de administrativo.",
      preguntas: [
        [S6, "media", "¿Cumple el requisito de antigüedad para la promoción interna?", ["Sí, se exigen al menos dos años en el subgrupo inferior", "No, se exigen cinco años", "No, se exigen diez años", "No hay requisito de antigüedad"], "Art. 18.2 EBEP y art. 44.1 DLeg 1/1991."],
        [S6, "media", "Además de la antigüedad, debe poseer:", ["La titulación exigida para el ingreso en el Cuerpo Ejecutivo", "Un máster", "Un informe favorable del sindicato", "Diez años de experiencia privada"], "Art. 44.1 DLeg 1/1991."],
        [S6, "media", "El proceso de promoción interna será por:", ["Concurso-oposición", "Libre designación", "Sorteo", "Antigüedad exclusivamente"], "Art. 45.1 DLeg 1/1991."],
        [S6, "media", "En la fase de oposición pueden eximirse:", ["Las pruebas sobre conocimientos ya exigidos para su ingreso en el cuerpo de origen", "Todas las pruebas", "Las pruebas prácticas siempre", "Nada"], "Art. 45.3 DLeg 1/1991."],
        [S6, "dificil", "Los puntos del concurso:", ["No pueden acumularse para superar el mínimo de la fase de oposición", "Sirven para aprobar la oposición", "Se suman al primer ejercicio", "Sustituyen al segundo ejercicio"], "Art. 45.4 DLeg 1/1991."],
        [S6, "media", "El desempeño provisional del puesto de administrativo que le ofrecen es una:", ["Promoción interna temporal", "Comisión de servicios en otra Administración", "Libre designación", "Adscripción por motivos de salud"], "DA 23.ª DLeg 1/1991."],
        [S6, "media", "Durante esa promoción interna temporal, en su escala de origen estará en:", ["Excedencia voluntaria por incompatibilidad, con reserva de su puesto", "Servicio activo", "Servicios especiales", "Suspensión de funciones"], "DA 23.ª.2 DLeg 1/1991."],
        [S6, "media", "Los trienios que devengue durante la promoción interna temporal serán los del:", ["Subgrupo de destino (C1)", "Subgrupo de origen (C2)", "Grupo A1", "No devenga trienios"], "DA 23.ª.2 DLeg 1/1991."],
        [S6, "media", "¿Consolidará derechos retributivos por esa promoción temporal?", ["No, salvo los trienios citados", "Sí, consolida todo", "Sí, el complemento específico", "Sí, el grado máximo"], "DA 23.ª.3 DLeg 1/1991."],
        [S5, "media", "Si supera la promoción interna, conservará su grado personal consolidado siempre que:", ["Esté dentro del intervalo de niveles del nuevo grupo", "Lo autorice el consejero", "Pague una tasa", "Renuncie a los trienios"], "Art. 40.3 DLeg 1/1991."],
      ],
    },
  ],
});
