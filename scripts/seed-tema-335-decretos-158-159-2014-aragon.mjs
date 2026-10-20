/**
 * Crea tema-335 — Tema 40 de Bombero/a Conductor/a: "Normativa de los
 * servicios de prevención, extinción de incendios y salvamento de Aragón.
 * Decreto 158/2014, del Gobierno de Aragón, por el que se regula la
 * organización y funcionamiento de los Servicios de Prevención, Extinción de
 * Incendios y Salvamento y Decreto 159/2014, del Gobierno de Aragón, por los
 * que se regula la organización y funcionamiento de la Academia Aragonesa de
 * Bomberos."
 *
 * Fuentes (BOA núm. 204, de 17-10-2014, ambos leídos íntegros en el PDF
 * oficial):
 *  - Decreto 158/2014, de 6 de octubre (csv BOA20141017002).
 *  - Decreto 159/2014, de 6 de octubre (enlace ELI del BOA
 *    eli/es-ar/d/2014/10/06/159).
 * Ninguno de los dos está en el BOE (son normas autonómicas). Se cita el
 * texto original publicado; no se ha localizado una versión consolidada que
 * recoja modificaciones posteriores. Algunas referencias internas de los
 * decretos a normas ya derogadas (Ley 30/1992, Ley 7/2007 del EBEP original,
 * Ley 30/2002 de Aragón) se mencionan solo como las cita el texto.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-335-decretos-158-159-2014-aragon.mjs
 */
import { sembrarTema, BOMBERO } from "./lib/sembrar-tema.mjs";

const D158 = "https://www.boa.aragon.es/cgi-bin/EBOA/BRSCGI?CMD=VEROBJ&MLKOB=816131643434";
const D159 = "https://www.boa.aragon.es/cgi-bin/EBOA/BRSCGI?CMD=VEROBJ&MLKOB=816133663535";
const S1 = "d158-objeto-estructura-parques";
const S2 = "d158-cuerpos-categorias-funciones";
const S3 = "d158-mando-ordenes-partes";
const S4 = "d158-ingreso-uniformidad-disciplina";
const S5 = "d159-academia-aragonesa-bomberos";

await sembrarTema({
  tema: {
    slug: "tema-335",
    titulo: "Decretos 158/2014 y 159/2014 de Aragón: organización de los SPEIS y Academia Aragonesa de Bomberos",
    descripcion: "Decreto 158/2014: objeto, ámbito, principios y definiciones; zonas de intervención, servicios centrales y parques; intervenciones de primer y segundo nivel y tiempo máximo de 35 minutos; parques principales, secundarios y de apoyo y sus dotaciones; cuerpos, categorías, grupos y funciones; mando único, órdenes, partes y comunicaciones; ingreso, curso selectivo, tribunal, movilidad; uniformidad, vehículos y transmisiones. Decreto 159/2014: finalidad, naturaleza y funciones de la Academia Aragonesa de Bomberos, Consejo Rector, Director, formación y alumnos.",
    contenido: "Recorre los dos decretos que desarrollan la Ley 1/2013: cómo se organizan los parques de bomberos de Aragón (con un tiempo máximo de intervención de 35 minutos), qué dotación mínima tiene cada tipo de parque, qué funciones tiene el bombero y cada mando, cómo funcionan el mando único, las órdenes y los partes (incluido el parte de vehículos del bombero-conductor), cómo se ingresa en el cuerpo y cómo se organiza la Academia Aragonesa de Bomberos.",
    enlaces_boe: [
      { url: D158, titulo: "Decreto 158/2014, de 6 de octubre — organización y funcionamiento de los SPEIS de Aragón (BOA núm. 204, 17-10-2014)" },
      { url: D159, titulo: "Decreto 159/2014, de 6 de octubre — creación, organización y funcionamiento de la Academia Aragonesa de Bomberos (BOA núm. 204, 17-10-2014)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "D. 158/2014: objeto, definiciones, estructura territorial y parques", articulos: "arts. 1-11", url: D158 },
      { seccion: S2, titulo: "D. 158/2014: cuerpos, categorías, grupos, funciones, derechos y deberes", articulos: "arts. 12-17", url: D158 },
      { seccion: S3, titulo: "D. 158/2014: mando, órdenes, partes y comunicaciones", articulos: "arts. 18-29", url: D158 },
      { seccion: S4, titulo: "D. 158/2014: ingreso, provisión, uniformidad, medios y disciplina", articulos: "arts. 30-47", url: D158 },
      { seccion: S5, titulo: "D. 159/2014: Academia Aragonesa de Bomberos", articulos: "arts. 1-17", url: D159 },
    ],
  },
  vinculo: { oposicion: BOMBERO.oposicion, bloqueId: BOMBERO.bloqueParteII, numero: 40 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Objeto del Decreto 158/2014", "Establecer los criterios básicos de organización, funcionamiento y coordinación de los SPEIS de Aragón y el régimen de su personal, desarrollando la Ley 1/2013"],
        ["Tipos de bombero que define el art. 4", "Operativo o profesional, voluntario (sin salario, solo gastos), de empresa y a tiempo parcial"],
        ["¿Qué es el tiempo de intervención?", "El intervalo desde la salida de la dotación hasta su llegada al lugar del siniestro en cualquier núcleo habitado de Aragón"],
        ["Organización de los SPEIS (art. 7)", "Servicios Centrales (administración, prevención, intervención y formación), Zonas de Intervención y Parques de Bomberos"],
        ["Intervención de primer y de segundo nivel", "Primer nivel: una dotación con un vehículo ligero o pesado. Segundo nivel: al menos dos dotaciones de primer nivel, una con vehículo pesado; siempre con un mando"],
        ["Tiempo máximo de intervención de primer nivel", "35 minutos (art. 8)"],
        ["Clasificación de los parques (art. 9)", "Principales (referencia de la Zona), secundarios, de apoyo (para la isócrona de 35 min) y almacenes de material"],
        ["Dotación mínima por turno de un parque principal", "Cinco bomberos y un mando, dos autobombas, una autobomba forestal, vehículo de mando, de rescate/excarcelación, autoescala y nodriza"],
      ],
      preguntas: [
        ["facil", "¿Cuál es el tiempo máximo de una intervención de primer nivel en Aragón?", ["35 minutos", "15 minutos", "2 horas"], "D. 158/2014, art. 8.1."],
        ["media", "¿Cuántas dotaciones intervienen como mínimo en una intervención de segundo nivel?", ["Dos, al menos una con vehículo pesado", "Una", "Diez"], "Art. 7.2.b)."],
        ["media", "¿Cuál es la dotación mínima de personal de un parque secundario por turno?", ["Tres bomberos y un mando", "Cinco bomberos y un mando", "Dos bomberos"], "Art. 11.2."],
        ["media", "¿Qué dotación mínima tiene un parque de apoyo?", ["Dos bomberos y un vehículo de extinción con depósito de 500 litros", "Una autoescala", "Diez bomberos"], "Art. 11.3."],
        ["dificil", "¿Pueden cobrar salario los bomberos voluntarios?", ["No, aunque pueden recibir gastos de manutención, transporte o alojamiento", "Sí", "Solo los fines de semana"], "Art. 4."],
        ["media", "¿Quién dirige un parque?", ["Un Jefe de Parque", "El alcalde", "Un voluntario"], "Art. 10.1."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Cuerpos y categorías (art. 13)", "Inspección (Inspector, Subinspector), Mando (Jefe y Subjefe de Mando) e Intervención (Jefe y Subjefe de Intervención, Oficial y Bombero)"],
        ["Grupo de la categoría de bombero (art. 14)", "Grupo C, subgrupo C1, igual que el resto del cuerpo de intervención"],
        ["Funciones de la categoría de Bombero (art. 16.8)", "Asistir a intervenciones, velar por la seguridad, conducir los vehículos para los que se le exigió permiso, revisar vehículos y material, reponer lo gastado, informar de anomalías y mantener la forma física"],
        ["Funciones del Oficial", "Asistir y dirigir las intervenciones asumiendo el mando, valorar y comunicar la situación, tomar datos, supervisar la recogida y elaborar informes"],
        ["¿Quién propone sanciones por faltas leves según el art. 16?", "El Inspector"],
        ["Derecho que añade el decreto respecto a la ley", "La adaptación del puesto en caso de accidente de trabajo o enfermedad, preferentemente en el mismo SPEIS (art. 17.1.n)"],
        ["Formación en horario laboral", "La formación de mejora se hace dentro del horario, salvo la optativa (art. 12.4)"],
      ],
      preguntas: [
        ["facil", "¿En qué grupo se clasifica el Oficial?", ["C1", "A1", "C2"], "Art. 14."],
        ["media", "¿Qué vehículos conduce el bombero?", ["Los del parque para los que se le exigió permiso en la selección", "Ninguno", "Solo los ligeros"], "Art. 16.8.c)."],
        ["media", "¿Quién sustituye al Jefe del Servicio en su ausencia?", ["El Subinspector", "El Oficial", "El bombero más antiguo"], "Art. 16.2.g)."],
        ["media", "¿Quién repone el material dañado y los consumibles tras una intervención?", ["El bombero, inmediatamente", "El proveedor", "El jefe de servicio"], "Art. 16.8.i)."],
        ["dificil", "¿Qué categoría elabora la propuesta de presupuesto anual del Servicio?", ["Inspector", "Oficial", "Subjefe de Intervención"], "Art. 16.1.b)."],
        ["media", "En situaciones de catástrofe, ¿es obligada la continuidad del servicio?", ["Sí, con los turnos necesarios hasta que cesen los motivos", "No", "Solo los voluntarios"], "Art. 12.3."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Principio de cumplimiento de órdenes (art. 18)", "Todo el personal cumple sin dilación las órdenes de sus superiores; si cree que alguna no se ajusta a la norma, lo comunica al superior por el cauce establecido"],
        ["¿De quién recibe órdenes el personal?", "Única y exclusivamente de sus propios mandos; si otra autoridad da una orden, se le indica a qué mando dirigirse"],
        ["Mando único (art. 19)", "Cuando actúan dos o más SPEIS, siempre bajo el mando único de una sola persona según la sucesión jerárquica"],
        ["Reglas de simultaneidad del mando (art. 21)", "Manda quien tenga mayor grado del Servicio titular del territorio; a igual grado, mayor antigüedad; a igual antigüedad, mayor edad"],
        ["Clases de órdenes", "Verbales o escritas, generales o particulares, ordinarias o extraordinarias; la orden escrita general y ordinaria es la orden del servicio"],
        ["Clases de partes", "Ordinarios (por conducto regular) y extraordinarios (directos al mando que deba resolver); de actuación, de guardia, de vehículos, de personal y otros"],
        ["Parte de vehículos", "Lo cumplimentan a diario los bomberos-conductores, con el kilometraje; las averías se comunican de inmediato al Oficial y los accidentes, por triplicado"],
      ],
      preguntas: [
        ["facil", "¿Quién cumplimenta a diario el parte de cada vehículo?", ["El bombero-conductor", "El Inspector", "El taller"], "Art. 27, partes de vehículos."],
        ["media", "Si dos mandos tienen igual grado y antigüedad, ¿quién manda?", ["El de mayor edad", "El más joven", "El que llegue antes"], "Art. 21.2.c)."],
        ["media", "¿Puede alegarse desconocimiento de una orden del servicio?", ["No", "Sí", "Solo si se estaba de vacaciones"], "Art. 25.1."],
        ["media", "¿Cuándo se redacta el parte de actuación?", ["Nada más regresar del siniestro", "Al final del mes", "Al día siguiente"], "Art. 27."],
        ["dificil", "¿Por cuántas copias se da parte de un accidente del vehículo?", ["Por triplicado", "Una sola", "Ninguna"], "Art. 27."],
        ["media", "¿Puede salir del Servicio un documento oficial sin visto bueno del Jefe?", ["No, salvo delegaciones a Jefes de Parque", "Sí, siempre", "Solo por correo"], "Art. 29."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Acceso al cuerpo de intervención (art. 30)", "Oposición libre y superación de un curso selectivo de la Academia Aragonesa de Bomberos con prácticas de al menos cuatro meses"],
        ["Pruebas eliminatorias de la oposición", "Reconocimiento médico, pruebas físicas, pruebas psicotécnicas y pruebas de conocimientos generales y específicos"],
        ["Requisito de conducción para el acceso", "Permisos de conducir del puesto y autorización para conducir vehículos prioritarios (BTP) o equivalentes"],
        ["¿Quién no puede formar parte del tribunal?", "Personal político, eventual, interino o laboral temporal de los SPEIS, y quien haya preparado aspirantes en los cinco años anteriores"],
        ["Promoción interna a Mando e Inspección", "Titulación requerida y dos años de servicio activo en el cuerpo inferior (art. 39.4)"],
        ["Uniformidad (art. 41)", "Homogénea, con emblema de Aragón, de la entidad local y número del Registro de Bomberos de Aragón en el pecho izquierdo"],
        ["Mantenimiento de primer nivel del vehículo (art. 43.4)", "Corresponde al conductor, que vela por su uso adecuado e informa de las anomalías"],
        ["Comunicaciones por radio (art. 44.4)", "Breves, claras, concisas e impersonales, con los indicativos oficiales del Jefe del Servicio"],
      ],
      preguntas: [
        ["facil", "¿Qué duración mínima tiene el curso selectivo con prácticas?", ["Cuatro meses", "Una semana", "Dos años"], "Arts. 30.1 y 33.2."],
        ["media", "¿Qué autorización de conducción se exige para el acceso?", ["La de vehículos prioritarios (BTP) o equivalente", "Ninguna", "La de motocicleta únicamente"], "Art. 30.3.e)."],
        ["media", "¿Puede el tribunal aprobar más aspirantes que vacantes?", ["No; esas propuestas serían nulas de pleno derecho", "Sí", "Solo uno más"], "Art. 31.7."],
        ["media", "¿Qué número figura en la uniformidad?", ["El del Registro de Bomberos de Aragón", "El DNI", "El teléfono del parque"], "Art. 41.3."],
        ["dificil", "¿Cada cuánto puede autorizarse una nueva permuta a los mismos interesados?", ["No antes de cinco años", "Cada año", "Nunca"], "Art. 37.3."],
        ["media", "¿A quién corresponde el mantenimiento de primer nivel de los vehículos?", ["Al conductor", "Al taller municipal", "Al Inspector"], "Art. 43.4."],
        ["media", "¿Cómo se tramitan las sanciones por falta leve?", ["Por procedimiento sumario con audiencia al interesado", "Sin audiencia", "Por juicio"], "Art. 47.2."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["Finalidad de la Academia (D. 159/2014, art. 2)", "Crear las condiciones y medios para la formación de los empleados públicos de los SPEIS, extenderla a quienes sin pertenecer a ellos inciden en el servicio y participar en la selección"],
        ["Naturaleza jurídica de la Academia (art. 3)", "Unidad administrativa sin personalidad jurídica, dependiente del Departamento de protección civil e integrada en la Escuela de Seguridad Pública de Aragón"],
        ["Funciones destacadas (art. 4)", "Cursos selectivos, de ascenso y especialización, formación permanente, habilitar bomberos voluntarios y de empresa, colaborar en la selección, homologar títulos de otras Escuelas y expedir diplomas"],
        ["Órganos directivos (art. 6)", "El Consejo Rector y el Director"],
        ["¿Quién preside el Consejo Rector?", "El titular del Departamento competente en protección civil; vicepresidente, el Director General de protección civil; secretario, el Director de la Academia (con voz y sin voto)"],
        ["Funciones del Consejo Rector (art. 8)", "Fijar objetivos, aprobar la memoria anual y el plan de estudios, aprobar baremos docentes, homologar diplomas y supervisar la Academia"],
        ["¿Qué hace el Director? (art. 10)", "Dirige y gestiona la Academia, ejecuta los programas, elabora la memoria y el plan de estudios y propone gastos y presupuestos"],
        ["Formación básica (art. 11)", "Capacita a funcionarios en prácticas y aspirantes a voluntarios; para el nombramiento definitivo hay que obtener la calificación de apto"],
      ],
      preguntas: [
        ["facil", "¿Quién aprueba el plan de estudios de la Academia?", ["El Consejo Rector", "El Director", "Cada alumno"], "D. 159/2014, art. 8.c)."],
        ["media", "¿Con qué frecuencia mínima se reúne el Consejo Rector?", ["Una vez al año", "Cada semana", "Cada diez años"], "Art. 9.1."],
        ["media", "¿Cobran los miembros del Consejo Rector por su cargo?", ["No", "Sí", "Solo el presidente"], "Art. 9.2."],
        ["media", "¿Quién designa al personal docente?", ["El Director General de protección civil, a propuesta del Director de la Academia", "Los alumnos", "El alcalde"], "Art. 14.1."],
        ["dificil", "¿Quién expide finalmente los certificados y diplomas?", ["El Consejero competente en protección civil", "El profesor", "La universidad"], "Art. 10.2.h)."],
        ["media", "¿Qué escuelas forman mientras la Academia no funcione?", ["Las de Bomberos del Ayuntamiento y de la Diputación de Zaragoza", "Ninguna", "Las de Madrid"], "DA única."],
        ["media", "¿Son voluntarios los cursos de especialización?", ["Sí, según el art. 11.3", "No, nunca", "Solo para mandos"], "Art. 11.3."],
      ],
    },
  ],
  glosario: [
    [S1, "Zona de Intervención", "Ámbito territorial de un conjunto de parques que actúan coordinados para garantizar una intervención eficaz."],
    [S1, "Isócrona de 35 minutos", "Área a la que puede llegar una dotación en el tiempo máximo de intervención de primer nivel."],
    [S2, "Cuerpo de intervención", "Cuerpo que agrupa las categorías operativas básicas: jefe y subjefe de intervención, oficial y bombero."],
    [S3, "Mando único", "Principio por el que una intervención conjunta de varios SPEIS se dirige por una sola persona."],
    [S3, "Orden del servicio", "Orden escrita, general y ordinaria por la que se comunican las instrucciones a todo el personal."],
    [S3, "Parte extraordinario", "Comunicación de un hecho que exige decisión urgente del mando y se remite directamente a quien deba resolver."],
    [S4, "BTP", "Autorización para conducir vehículos prioritarios exigida en el acceso."],
    [S5, "Consejo Rector", "Órgano directivo de la Academia Aragonesa de Bomberos que fija sus objetivos y aprueba el plan de estudios."],
  ],
  casos: [
    {
      slug: "caso-intervencion-conjunta-dos-speis",
      titulo: "Intervención conjunta de dos servicios",
      supuesto: "Un incendio industrial en un municipio limítrofe obliga a actuar a una dotación del SPEIS local y otra del Ayuntamiento de Zaragoza. Llegan dos oficiales.",
      preguntas: [
        [S3, "facil", "¿Bajo qué principio se desarrolla la intervención?", ["Mando único de una sola persona", "Mando compartido", "Sin mando"], "Art. 19.2."],
        [S3, "media", "¿Quién tendrá el mando si ambos tienen el mismo grado?", ["El de mayor antigüedad", "El de Zaragoza siempre", "El más joven"], "Art. 21.2.b)."],
        [S3, "media", "¿Qué criterio prima en primer lugar?", ["El mayor grado del Servicio titular del territorio", "El tamaño del vehículo", "La hora de llegada"], "Art. 21.2.a)."],
        [S1, "media", "Con dos dotaciones, una con vehículo pesado, ¿qué nivel de intervención es?", ["Segundo nivel", "Primer nivel", "Especial"], "Art. 7.2.b)."],
        [S3, "media", "Si un agente de otra administración da una orden a un bombero, ¿qué hace?", ["Le indica a qué mando del Servicio debe dirigirse", "La cumple sin más", "La ignora"], "Art. 18.6."],
        [S3, "media", "¿Quién redacta el parte de actuación?", ["Quien estuvo al mando de la dotación", "Cualquier bombero", "El alcalde"], "Art. 27."],
        [S2, "media", "¿Qué hace el oficial al llegar?", ["Dirigir la intervención, valorar y pedir apoyos si procede", "Esperar órdenes del público", "Conducir la autoescala"], "Art. 16.7."],
        [S4, "media", "¿Cómo deben ser las comunicaciones por radio?", ["Breves, claras, concisas e impersonales", "Largas y detalladas", "Con nombres propios"], "Art. 44.4."],
        [S3, "dificil", "¿Quién permanece al mando de un grupo de intervención?", ["Quien esté al frente, hasta que termine o sea relevado formalmente", "El primero que llegue", "Nadie"], "Art. 20."],
        [S2, "media", "¿Qué deber tiene el bombero si el siniestro se prolonga tras su turno?", ["Permanecer hasta ser relevado", "Irse a su hora", "Avisar a la prensa"], "Art. 17.2.d)."],
      ],
    },
    {
      slug: "caso-bombero-conductor-guardia",
      titulo: "La guardia de un bombero-conductor",
      supuesto: "Al empezar su guardia, un bombero-conductor revisa la autobomba asignada y detecta un ruido en los frenos. Por la tarde, durante una salida, golpea un retrovisor contra un muro.",
      preguntas: [
        [S3, "facil", "¿Qué debe hacer con el ruido de frenos?", ["Dar parte inmediato al Oficial de servicio", "Ignorarlo", "Arreglarlo él mismo sin avisar"], "Art. 27, partes de vehículos."],
        [S2, "media", "¿Qué revisa el bombero en su turno?", ["Vehículos, materiales y herramientas asignados según listado", "Solo su taquilla", "Nada"], "Art. 16.8.e)-f)."],
        [S3, "media", "¿Qué dato consta en el parte diario del vehículo?", ["El kilometraje", "El precio del combustible", "El nombre del alcalde"], "Art. 27."],
        [S3, "media", "¿Cómo se comunica el golpe del retrovisor?", ["Con el parte de accidente, por triplicado", "Verbalmente a un vecino", "No se comunica"], "Art. 27."],
        [S4, "media", "¿A quién corresponde el mantenimiento de primer nivel?", ["Al conductor", "Al Inspector", "A los voluntarios"], "Art. 43.4."],
        [S1, "media", "¿Qué hace el personal de guardia dentro del parque?", ["Estar preparado y uniformado para salir en cualquier momento", "Descansar sin uniforme", "Salir a comprar"], "Art. 10.3."],
        [S1, "media", "¿Quién puede usar el material del Servicio?", ["Su propio personal para sus fines, salvo autorización expresa", "Cualquier vecino", "Las empresas"], "Art. 10.4."],
        [S2, "media", "Tras la salida, ¿qué hace con el material gastado?", ["Reponerlo inmediatamente y limpiar lo necesario", "Dejarlo para el siguiente turno", "Tirarlo"], "Art. 16.8.i)."],
        [S2, "dificil", "¿En qué grupo profesional está el bombero-conductor?", ["C1", "C2", "A2"], "Art. 14."],
        [S4, "media", "¿Puede el bombero vestir el uniforme fuera del servicio libremente?", ["No, solo con autorización del Jefe y por motivos justificados", "Sí", "Solo en verano"], "Art. 42.3."],
      ],
    },
    {
      slug: "caso-proceso-selectivo-academia",
      titulo: "Del aprobado al nombramiento",
      supuesto: "Una aspirante aprueba la oposición de bombero en un SPEIS aragonés y es nombrada funcionaria en prácticas. Debe pasar por la Academia Aragonesa de Bomberos.",
      preguntas: [
        [S4, "facil", "¿Qué condición tiene tras aprobar la oposición?", ["Funcionaria en prácticas", "Funcionaria de carrera", "Voluntaria"], "Art. 32."],
        [S4, "media", "¿Cuánto dura como mínimo el curso de nuevo ingreso?", ["Cuatro meses", "Un mes", "Tres años"], "Art. 33.2."],
        [S4, "media", "¿Qué fases tiene el curso?", ["Formación en la Academia y prácticas en el SPEIS", "Solo teoría", "Solo prácticas"], "Art. 33.3."],
        [S4, "media", "¿Cómo se determina el orden final?", ["Sumando la nota del curso a la de la oposición", "Por sorteo", "Por edad"], "Art. 33.4."],
        [S5, "media", "¿Qué calificación necesita para el nombramiento definitivo?", ["Apto en la formación básica", "Sobresaliente", "Ninguna"], "D. 159/2014, art. 11.2."],
        [S5, "media", "¿Qué derecho tiene como alumna sobre la evaluación?", ["A criterios objetivos conocidos de antemano", "A elegir su nota", "Ninguno"], "D. 159/2014, art. 17.1.c)."],
        [S5, "media", "¿Qué deber tiene en clase?", ["Asistir a todas, salvo causa justificada", "Asistir cuando quiera", "Ninguno"], "D. 159/2014, art. 17.2.b)."],
        [S4, "media", "¿Dónde se publica su nombramiento como funcionaria de carrera?", ["En el Boletín Oficial que corresponda", "En la prensa local", "En el tablón del parque únicamente"], "Art. 34.2."],
        [S5, "dificil", "¿Dónde está integrada la Academia que la forma?", ["En la Escuela de Seguridad Pública de Aragón", "En la Universidad de Zaragoza", "En el Ayuntamiento"], "D. 159/2014, art. 3.1."],
        [S4, "media", "Si no superase el curso, ¿qué ocurriría?", ["Quedaría eliminada y devolvería el uniforme recibido", "Pasaría igualmente", "Repetiría la oposición automáticamente"], "Arts. 33.4 y 41.15."],
      ],
    },
  ],
});
