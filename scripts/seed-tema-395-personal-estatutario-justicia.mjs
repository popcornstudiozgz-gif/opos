/**
 * Crea tema-395 — Tema 23 de Administrativo DGA (tema 18 del programa de
 * materias específicas): "El personal de la Administración de la
 * Comunidad Autónoma de Aragón (VIII). El personal estatutario. El
 * personal al servicio de la Administración de Justicia."
 *
 * Fuentes (textos consolidados leídos en esta sesión en la API del BOE):
 * - Ley 55/2003, del Estatuto Marco del personal estatutario de los
 *   servicios de salud (BOE-A-2003-23101): arts. 1-3, 5-9, 12, 17, 19-21,
 *   29, 30, 33, 40, 41 y 72 (art. 9 y 33 en la redacción del RDL 12/2022,
 *   BOE-A-2022-11132).
 * - RDLeg 5/2015, EBEP (BOE-A-2015-11719): art. 2.3-5.
 * - LO 6/1985, del Poder Judicial (BOE-A-1985-12666): Libro VI, arts. 470-
 *   478, 482-484, 489, 495, 500 y 501.
 * - Estatuto de Autonomía de Aragón (LO 5/2007, BOE-A-2007-8444): arts. 67
 *   y 68.
 * - RD 1702/2007, de traspaso a Aragón de medios personales, materiales y
 *   económicos para la Administración de Justicia (BOE-A-2007-22538),
 *   efectividad 1-01-2008; ampliado por RD 254/2010 (BOE-A-2010-5267).
 * No se ha localizado un estatuto autonómico propio del personal
 * estatutario del Servicio Aragonés de Salud; el tema se apoya en el
 * Estatuto Marco básico.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-395-personal-estatutario-justicia.mjs
 */
import { sembrarTema, ADMIN_DGA } from "./lib/sembrar-tema.mjs";

const EM = "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23101";
const EBEP = "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11719";
const LOPJ = "https://www.boe.es/buscar/act.php?id=BOE-A-1985-12666";
const EAA = "https://www.boe.es/buscar/act.php?id=BOE-A-2007-8444";
const RD1702 = "https://www.boe.es/buscar/doc.php?id=BOE-A-2007-22538";
const S1 = "estatutario-concepto-clasificacion";
const S2 = "estatutario-fijo-temporal-seleccion";
const S3 = "estatutario-derechos-deberes-disciplina";
const S4 = "justicia-cuerpos-funciones";
const S5 = "justicia-regimen-seleccion-derechos";
const S6 = "justicia-competencias-aragon";

await sembrarTema({
  tema: {
    slug: "tema-395",
    titulo: "El personal de la Administración de Aragón (VIII): el personal estatutario y el personal al servicio de la Administración de Justicia",
    descripcion: "El personal estatutario de los servicios de salud: Estatuto Marco (Ley 55/2003), relación funcionarial especial, aplicación del EBEP, clasificación (sanitario y de gestión y servicios; fijo y temporal), nombramientos temporales tras el RDL 12/2022, selección, derechos, deberes, pérdida de la condición, carrera, retribuciones y régimen disciplinario. El personal al servicio de la Administración de Justicia: cuerpos nacionales del Libro VI de la LOPJ, cuerpos generales y especiales y sus funciones, régimen jurídico, selección, interinos, derechos y jornada. Competencias de Aragón: art. 67 del Estatuto y traspaso del RD 1702/2007.",
    contenido: "Dos colectivos que no son funcionarios \"normales\" de la DGA pero sí gestiona la Comunidad: el personal de los hospitales y centros de salud (personal estatutario del Servicio Aragonés de Salud) y el de los juzgados (Gestión Procesal, Tramitación Procesal y Auxilio Judicial), cuya gestión pasó a Aragón el 1 de enero de 2008.",
    enlaces_boe: [
      { url: EM, titulo: "Ley 55/2003, del Estatuto Marco del personal estatutario de los servicios de salud (BOE-A-2003-23101)" },
      { url: LOPJ, titulo: "Ley Orgánica 6/1985, del Poder Judicial — Libro VI (BOE-A-1985-12666)" },
      { url: EBEP, titulo: "Real Decreto Legislativo 5/2015, texto refundido del EBEP (BOE-A-2015-11719)" },
      { url: EAA, titulo: "Estatuto de Autonomía de Aragón, art. 67 (BOE-A-2007-8444)" },
      { url: RD1702, titulo: "Real Decreto 1702/2007, de traspaso a Aragón de medios para la Administración de Justicia (BOE-A-2007-22538)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "Personal estatutario: concepto, normativa y clasificación", articulos: "arts. 1-3 y 5-7 Ley 55/2003; art. 2.3-4 EBEP", url: `${EM}#a1` },
      { seccion: S2, titulo: "Personal estatutario fijo y temporal; selección y provisión", articulos: "arts. 8, 9, 20, 29, 30 y 33 Ley 55/2003", url: `${EM}#a9` },
      { seccion: S3, titulo: "Derechos, deberes, pérdida de la condición, carrera, retribuciones y faltas", articulos: "arts. 17, 19, 21, 40, 41 y 72 Ley 55/2003", url: `${EM}#a17` },
      { seccion: S4, titulo: "Cuerpos al servicio de la Administración de Justicia y sus funciones", articulos: "arts. 470, 475-478 LOPJ", url: `${LOPJ}#acuatrocientossetenta` },
      { seccion: S5, titulo: "Régimen jurídico, selección, interinos, derechos y jornada", articulos: "arts. 471-474, 482-484, 489, 495, 500 y 501 LOPJ", url: `${LOPJ}#acuatrocientossetentaycuatro` },
      { seccion: S6, titulo: "Competencias de Aragón y traspaso de medios", articulos: "arts. 67-68 EAA; RD 1702/2007", url: `${EAA}#a67` },
    ],
  },
  vinculo: { oposicion: ADMIN_DGA.oposicion, bloqueId: ADMIN_DGA.bloquePersonal, numero: 23 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Objeto del Estatuto Marco (art. 1 Ley 55/2003)", "Establecer las bases de la relación funcionarial especial del personal estatutario de los servicios de salud del Sistema Nacional de Salud"],
        ["Ámbito (art. 2.1 Ley 55/2003)", "Personal estatutario de los centros e instituciones sanitarias de los servicios de salud de las CCAA y de los centros sanitarios de la AGE"],
        ["Supletoriedad (art. 2.2 Ley 55/2003)", "En lo no previsto, se aplican las disposiciones y principios generales de función pública de la Administración correspondiente"],
        ["Desarrollo (art. 3 Ley 55/2003)", "El Estado y las CCAA aprueban los estatutos y demás normas del personal estatutario de cada servicio de salud"],
        ["EBEP y personal estatutario (art. 2.3-4 EBEP)", "Se rige por su legislación específica y por el EBEP, salvo el capítulo II del título III (excepto el art. 20) y los arts. 22.3, 24 y 84; las menciones al funcionario de carrera lo incluyen"],
        ["Criterios de clasificación (art. 5 Ley 55/2003)", "La función desarrollada, el nivel del título exigido para el ingreso y el tipo de nombramiento"],
        ["Personal estatutario sanitario (art. 6 Ley 55/2003)", "Nombrado para una profesión o especialidad sanitaria: de formación universitaria (licenciados y diplomados, con o sin especialidad) o de formación profesional (técnicos superiores y técnicos)"],
        ["Personal de gestión y servicios (art. 7 Ley 55/2003)", "Funciones de gestión u oficios no sanitarios: formación universitaria, formación profesional y otro personal (ESO o equivalente)"],
      ],
      preguntas: [
        ["media", "La relación del personal estatutario con los servicios de salud es:", ["Una relación funcionarial especial", "Una relación laboral común", "Una relación mercantil", "Una relación civil de arrendamiento de servicios"], "Art. 1 Ley 55/2003."],
        ["media", "En lo no previsto por el Estatuto Marco ni por sus normas de desarrollo, se aplican al personal estatutario:", ["Las disposiciones y principios generales de función pública de la Administración correspondiente", "El Estatuto de los Trabajadores", "El Código de Comercio", "Solo el convenio colectivo"], "Art. 2.2 Ley 55/2003."],
        ["dificil", "Según el EBEP, cuando este menciona al personal funcionario de carrera se entiende comprendido:", ["El personal estatutario de los Servicios de Salud", "El personal laboral temporal", "El personal eventual", "El personal directivo"], "Art. 2.4 EBEP."],
        ["media", "Un celador o un administrativo de un hospital del sistema público es personal estatutario:", ["De gestión y servicios", "Sanitario de formación universitaria", "Sanitario de formación profesional", "Laboral"], "Art. 7 Ley 55/2003."],
        ["media", "El personal estatutario se clasifica atendiendo a la función, al título exigido y:", ["Al tipo de nombramiento", "A la antigüedad", "Al centro de destino", "Al sindicato"], "Art. 5 Ley 55/2003."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Personal estatutario fijo (art. 8 Ley 55/2003)", "Tras superar el proceso selectivo, obtiene un nombramiento para desempeñar con carácter permanente las funciones correspondientes"],
        ["Personal estatutario temporal (art. 9.1 Ley 55/2003, RDL 12/2022)", "Interino por necesidad y urgencia justificadas: vacante (máximo tres años), programas temporales (máximo tres años) o exceso o acumulación de tareas (máximo nueve meses en dieciocho)"],
        ["Fin de la interinidad (art. 9.2 Ley 55/2003)", "Cobertura por fijo, supresión de la plaza, fin del plazo o de la causa; a los tres años del nombramiento en vacante termina la interinidad, salvo excepción ligada a un proceso selectivo"],
        ["Adquisición de la condición fija (art. 20 Ley 55/2003)", "Superación de las pruebas, nombramiento por el órgano competente e incorporación a la plaza en el plazo de la convocatoria"],
        ["Principios de provisión (art. 29 Ley 55/2003)", "Igualdad, mérito, capacidad y publicidad; planificación; movilidad en el conjunto del SNS; coordinación; participación sindical"],
        ["Requisitos de acceso (art. 30.5 Ley 55/2003)", "Nacionalidad española o de la UE, titulación, capacidad funcional, 18 años sin exceder la jubilación forzosa y no haber sido separado en los seis años anteriores"],
        ["Cupo de discapacidad (art. 30.6 Ley 55/2003)", "No inferior al 5 % de las plazas, o el general vigente en la función pública, para discapacidad igual o superior al 33 %"],
        ["Periodo de prueba del temporal (art. 33.3 Ley 55/2003)", "Máximo tres meses para personal universitario y dos meses para el resto, sin exceder la mitad del nombramiento"],
      ],
      preguntas: [
        ["media", "El nombramiento de personal estatutario interino por vacante tiene un plazo máximo de:", ["Tres años", "Un año", "Cinco años", "Nueve meses"], "Art. 9.1.a) Ley 55/2003."],
        ["dificil", "El nombramiento por exceso o acumulación de tareas tiene un plazo máximo de:", ["Nueve meses dentro de un periodo de dieciocho", "Seis meses", "Tres años", "Doce meses dentro de veinticuatro"], "Art. 9.1.c) Ley 55/2003."],
        ["media", "La condición de personal estatutario fijo se adquiere con la superación de las pruebas, el nombramiento y:", ["La incorporación a la plaza en plazo", "El primer trienio", "La firma de un contrato", "La afiliación sindical"], "Art. 20.1 Ley 55/2003."],
        ["media", "Para acceder como personal estatutario fijo no se puede haber sido separado del servicio en los:", ["Seis años anteriores a la convocatoria", "Dos años anteriores", "Diez años anteriores", "Doce meses anteriores"], "Art. 30.5.e) Ley 55/2003."],
        ["dificil", "El periodo de prueba del personal estatutario temporal no universitario no puede superar:", ["Dos meses", "Tres meses", "Seis meses", "Un mes"], "Art. 33.3 Ley 55/2003."],
        ["media", "El nombramiento de personal estatutario temporal:", ["Nunca da lugar al reconocimiento de la condición de fijo", "Se convierte en fijo a los tres años", "Equivale a un contrato indefinido", "Requiere oposición previa"], "Art. 33.1 Ley 55/2003."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Derechos individuales (art. 17 Ley 55/2003)", "Estabilidad, retribución puntual, formación continuada, protección en seguridad y salud, movilidad y promoción, dignidad, descanso, encuadramiento en el Régimen General, información, no discriminación, jubilación y acción social"],
        ["Seguridad Social del estatutario (art. 17.1.i Ley 55/2003)", "Encuadramiento en el Régimen General de la Seguridad Social"],
        ["Deberes (art. 19 Ley 55/2003)", "Respetar la Constitución y el Estatuto, actuar con lealtad y eficacia, actualizar conocimientos, cumplir instrucciones, colaborar en urgencias, informar a los pacientes, respetar su intimidad, guardar confidencialidad, cumplir incompatibilidades y ser identificable"],
        ["Pérdida de la condición fija (art. 21 Ley 55/2003)", "Renuncia, pérdida de la nacionalidad, separación del servicio firme, inhabilitación, jubilación e incapacidad permanente"],
        ["Carrera profesional (art. 40 Ley 55/2003)", "La establecen las CCAA, previa negociación, como derecho a progresar de forma individualizada por conocimientos, experiencia y objetivos"],
        ["Retribuciones (art. 41 Ley 55/2003)", "Básicas y complementarias; las complementarias se orientan a la motivación, actividad, calidad, dedicación y objetivos; deducción proporcional por jornada no realizada sin carácter sancionador"],
        ["Faltas y prescripción (art. 72 Ley 55/2003)", "Muy graves, graves y leves; prescriben a los cuatro años, dos años y seis meses; las CCAA pueden tipificar otras por ley"],
      ],
      preguntas: [
        ["media", "El personal estatutario de los servicios de salud está encuadrado en:", ["El Régimen General de la Seguridad Social", "MUFACE", "Clases Pasivas", "El régimen de autónomos"], "Art. 17.1.i) Ley 55/2003."],
        ["media", "En el Estatuto Marco, la falta de asistencia sin causa durante más de cinco días continuados es falta:", ["Muy grave", "Grave", "Leve", "No es falta"], "Art. 72.2.e) Ley 55/2003."],
        ["media", "Las faltas muy graves del personal estatutario prescriben a los:", ["Cuatro años", "Seis años", "Dos años", "Tres años"], "Art. 72.6 Ley 55/2003."],
        ["dificil", "En el Estatuto Marco, el abuso de autoridad en el ejercicio de sus funciones es falta:", ["Grave", "Muy grave en todo caso", "Leve", "No está tipificado"], "Art. 72.3.b) Ley 55/2003."],
        ["media", "La carrera profesional del personal estatutario la establecen:", ["Las comunidades autónomas, previa negociación", "El Ministerio de Hacienda", "Cada hospital libremente", "Los colegios profesionales"], "Art. 40.1 Ley 55/2003."],
        ["media", "Es causa de pérdida de la condición de personal estatutario fijo:", ["La sanción firme de separación del servicio", "La excedencia voluntaria", "Una falta leve", "El cambio de centro"], "Art. 21.c) Ley 55/2003."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Cuerpos del Libro VI (art. 470 LOPJ)", "Médicos Forenses, Facultativos y Técnicos Especialistas y Ayudantes de Laboratorio del INTCF, Gestión Procesal y Administrativa, Tramitación Procesal y Administrativa y Auxilio Judicial; son Cuerpos Nacionales"],
        ["Cuerpos Generales (art. 475.a LOPJ)", "Tareas procesales: Gestión Procesal (diplomado o equivalente), Tramitación Procesal (bachiller) y Auxilio Judicial (ESO)"],
        ["Cuerpos Especiales (art. 475.b LOPJ)", "Funciones de una profesión específica: Médicos Forenses, Facultativos, Técnicos Especialistas y Ayudantes de Laboratorio del INTCF"],
        ["Gestión Procesal y Administrativa (art. 476 LOPJ)", "Colabora en la actividad procesal de nivel superior: gestiona la tramitación dando cuenta al Letrado, firma comparecencias, documenta embargos y desempeña la Secretaría de las Oficinas de Justicia en los municipios"],
        ["Tramitación Procesal y Administrativa (art. 477 LOPJ)", "Apoyo a la gestión procesal: tramitación general, registro de correspondencia, formación de autos y confección de cédulas de comunicación"],
        ["Auxilio Judicial (art. 478 LOPJ)", "Practica los actos de comunicación, ejecuta embargos y lanzamientos como agente de la autoridad, actúa como policía judicial, archiva autos y mantiene el orden en las salas"],
        ["Letrado sustituto (art. 476.2 LOPJ)", "Los funcionarios de Gestión Procesal pueden ser nombrados Letrados de la Administración de Justicia sustitutos si reúnen los requisitos"],
      ],
      preguntas: [
        ["media", "Los cuerpos de funcionarios al servicio de la Administración de Justicia del Libro VI de la LOPJ tienen el carácter de:", ["Cuerpos Nacionales", "Cuerpos autonómicos", "Cuerpos locales", "Escalas a extinguir"], "Art. 470.2 LOPJ."],
        ["media", "Para el acceso al Cuerpo de Tramitación Procesal y Administrativa se exige:", ["El título de Bachiller o equivalente", "El de Diplomado universitario", "El graduado en ESO", "La licenciatura en Derecho"], "Art. 475.a) LOPJ."],
        ["media", "La práctica de notificaciones, citaciones y emplazamientos corresponde, con carácter general, al Cuerpo de:", ["Auxilio Judicial", "Gestión Procesal", "Médicos Forenses", "Tramitación Procesal"], "Art. 478.a) LOPJ."],
        ["media", "Es un Cuerpo Especial de la Administración de Justicia:", ["El de Médicos Forenses", "El de Auxilio Judicial", "El de Gestión Procesal", "El de Tramitación Procesal"], "Art. 475.b) LOPJ."],
        ["dificil", "Desempeñar la Secretaría de las Oficinas de Justicia en los municipios corresponde al Cuerpo de:", ["Gestión Procesal y Administrativa", "Auxilio Judicial", "Tramitación Procesal", "Facultativos del INTCF"], "Art. 476.1.i) LOPJ."],
        ["media", "Actuar como policía judicial con carácter de agente de la autoridad es función del Cuerpo de:", ["Auxilio Judicial", "Tramitación Procesal", "Gestión Procesal", "Técnicos Especialistas"], "Art. 478.c) LOPJ."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["Competencias (art. 471 LOPJ)", "Corresponden al Ministerio de Justicia o a las CCAA con competencias asumidas en el estatuto y régimen jurídico: selección, formación, provisión, retribuciones, situaciones y disciplina, en los términos de la LOPJ"],
        ["Relación (art. 472 LOPJ)", "Los funcionarios de carrera están vinculados por nombramiento legal en relación estatutaria permanente; por urgencia o necesidad cabe nombrar interinos"],
        ["Régimen jurídico (art. 474 LOPJ)", "La LOPJ y su desarrollo y, supletoriamente, la normativa del Estado sobre función pública; los interinos no están en Clases Pasivas; el laboral, por la legislación laboral y su convenio"],
        ["Oferta de empleo (art. 482 LOPJ)", "Única oferta anual, que elabora el Ministerio integrando las necesidades comunicadas por las CCAA; reserva no inferior al 7 % para personas con discapacidad"],
        ["Selección (art. 483 LOPJ)", "Temario y pruebas únicos en todo el Estado; el Ministerio convoca y resuelve de forma territorializada; la lengua y el derecho propios autonómicos son optativos y no eliminatorios"],
        ["Interinos (art. 489 LOPJ)", "Por vacante, sustitución o exceso de asuntos; nombrados por el Ministerio o la CA con traspasos; mismos derechos salvo la fijeza y mismas retribuciones"],
        ["Seguridad Social (art. 495.1.k y 2 LOPJ)", "Régimen General o Clases Pasivas según la fecha de ingreso, más el Mutualismo Judicial (RDLeg 3/2000); los interinos, en el Régimen General"],
        ["Jornada y calendario (art. 500 LOPJ)", "Jornada semanal igual a la de la AGE; calendario laboral anual aprobado por el Ministerio y por las CCAA con competencias, previo informe del CGPJ y negociación"],
      ],
      preguntas: [
        ["media", "Las pruebas selectivas de los cuerpos de la Administración de Justicia las convoca y resuelve:", ["El Ministerio de Justicia, de forma territorializada", "Cada Comunidad Autónoma por separado", "El Consejo General del Poder Judicial", "Cada Tribunal Superior de Justicia"], "Art. 483.3 LOPJ."],
        ["dificil", "Las pruebas de conocimiento del derecho civil foral propio de una Comunidad con competencias asumidas son:", ["Optativas y nunca eliminatorias", "Obligatorias y eliminatorias", "Obligatorias pero no eliminatorias", "Inexistentes"], "Art. 483.2 LOPJ."],
        ["media", "En la oferta de empleo de la Administración de Justicia se reserva para personas con discapacidad un cupo no inferior al:", ["7 %", "5 %", "2 %", "10 %"], "Art. 482.5 LOPJ."],
        ["media", "Los funcionarios interinos de la Administración de Justicia tienen los mismos derechos que los de carrera, salvo:", ["La fijeza en el puesto de trabajo", "Las vacaciones", "Las retribuciones básicas", "Los permisos"], "Art. 489.2 LOPJ."],
        ["media", "El mutualismo de los funcionarios de la Administración de Justicia es:", ["El Mutualismo Judicial", "MUFACE", "ISFAS", "No tienen mutualismo"], "Art. 495.1.k) LOPJ."],
        ["media", "Supletoriamente, al personal funcionario de la Administración de Justicia se aplica:", ["La normativa del Estado sobre función pública", "La normativa de cada Comunidad Autónoma", "El Estatuto de los Trabajadores", "El Estatuto Marco"], "Art. 474.1 LOPJ."],
      ],
    },
    {
      seccion: S6,
      flashcards: [
        ["Personal de Justicia en el Estatuto de Aragón (art. 67.1 EAA)", "Corresponde a Aragón la competencia sobre todo el personal al servicio de la Administración de Justicia que no integre el Poder Judicial, según la LOPJ"],
        ["Medios y oficina judicial (art. 67.2-4 EAA)", "Aragón tiene competencia sobre los medios materiales, la organización, dotación y gestión de las oficinas judiciales y la justicia gratuita"],
        ["Demarcación y planta (art. 68 EAA)", "Aragón fija los límites de las demarcaciones judiciales; la capitalidad se fija por ley de las Cortes de Aragón"],
        ["Traspaso (RD 1702/2007)", "Traspaso a Aragón de la provisión de medios personales, materiales y económicos de la Administración de Justicia, incluidos los Juzgados de Paz; efectivo desde el 1 de enero de 2008; ampliado por el RD 254/2010"],
        ["Lo que se reservó el Estado (RD 1702/2007)", "Entre otras, la gestión del Cuerpo de Secretarios Judiciales (hoy Letrados de la Administración de Justicia), la creación de órganos judiciales y el Instituto Nacional de Toxicología y Ciencias Forenses"],
        ["Personal de otras Administraciones (art. 473 LOPJ)", "Pueden prestar servicios en la Justicia funcionarios de otras Administraciones para actividades técnicas especializadas y personal laboral para oficios o mantenimiento"],
      ],
      preguntas: [
        ["media", "La gestión del personal de los cuerpos generales de Justicia en Aragón se traspasó a la Comunidad con efectos desde:", ["El 1 de enero de 2008", "El 1 de enero de 2002", "El 1 de enero de 2011", "El 1 de enero de 1995"], "RD 1702/2007, apartado de efectividad."],
        ["media", "Según el Estatuto de Autonomía, la competencia de Aragón alcanza al personal de la Administración de Justicia:", ["Que no integre el Poder Judicial", "Incluidos jueces y magistrados", "Solo laboral", "Solo de los Juzgados de Paz"], "Art. 67.1 EAA."],
        ["dificil", "Con el traspaso de 2007, permaneció en el Estado la gestión de:", ["El Cuerpo de Secretarios Judiciales", "El Cuerpo de Auxilio Judicial", "Los Juzgados de Paz", "Los edificios judiciales de Aragón"], "RD 1702/2007, apartado B.2.a)."],
        ["media", "La capitalidad de las demarcaciones judiciales en Aragón se fija:", ["Por ley de las Cortes de Aragón", "Por decreto del Ministerio de Justicia", "Por el CGPJ", "Por orden del consejero"], "Art. 68.1 EAA."],
        ["media", "El personal de oficios y mantenimiento de edificios judiciales puede ser:", ["Personal laboral", "Solo Auxilio Judicial", "Solo Médicos Forenses", "Personal eventual"], "Art. 473.2 LOPJ."],
      ],
    },
  ],
  glosario: [
    [S1, "Personal estatutario", "Personal de los servicios de salud vinculado por una relación funcionarial especial regida por el Estatuto Marco."],
    [S1, "Estatuto Marco", "Ley 55/2003, que fija las bases comunes del personal estatutario de todos los servicios de salud."],
    [S2, "Nombramiento de interinidad", "Nombramiento temporal de personal estatutario por necesidad y urgencia (vacante, programa o acumulación de tareas)."],
    [S3, "Carrera profesional", "Progresión individual del profesional sanitario por conocimientos, experiencia y objetivos, regulada por cada Comunidad."],
    [S4, "Cuerpos Nacionales", "Cuerpos de funcionarios de Justicia comunes a todo el Estado, aunque su gestión pueda haberse traspasado a las CCAA."],
    [S4, "Gestión Procesal y Administrativa", "Cuerpo general de Justicia que colabora en la actividad procesal de nivel superior; exige diplomatura o equivalente."],
    [S4, "Auxilio Judicial", "Cuerpo general de Justicia que practica notificaciones y embargos y actúa como policía judicial; exige ESO."],
    [S5, "Mutualismo Judicial", "Mutualidad (MUGEJU) que da cobertura a los funcionarios de la Administración de Justicia."],
    [S6, "Traspaso de funciones", "Transferencia formal de servicios, personal y medios del Estado a una Comunidad mediante real decreto."],
    [S6, "Oficina judicial", "Organización de apoyo a jueces y tribunales cuya organización y gestión corresponde a Aragón."],
  ],
  casos: [
    {
      slug: "interina-servicio-salud",
      titulo: "Nombramientos en un hospital",
      supuesto: "Un hospital del Servicio Aragonés de Salud necesita cubrir una vacante de técnico en cuidados de enfermería que no puede ocupar personal fijo y reforzar la unidad de urgencias durante el invierno por acumulación de tareas. Además, un administrativo estatutario fijo del hospital falta a su trabajo seis días seguidos sin justificación.",
      preguntas: [
        [S2, "media", "Para la vacante procede un nombramiento:", ["De personal estatutario interino por vacante", "De personal laboral indefinido", "De funcionario en prácticas", "De personal eventual"], "Art. 9.1.a) Ley 55/2003."],
        [S2, "media", "Ese nombramiento tiene un plazo máximo de:", ["Tres años", "Nueve meses", "Un año", "Cinco años"], "Art. 9.1.a) Ley 55/2003."],
        [S2, "media", "Para el refuerzo de invierno procede un nombramiento por:", ["Exceso o acumulación de tareas", "Vacante", "Programa temporal de tres años", "Libre designación"], "Art. 9.1.c) Ley 55/2003."],
        [S2, "dificil", "Ese nombramiento no podrá superar:", ["Nueve meses dentro de un periodo de dieciocho", "Tres años", "Seis meses dentro de doce", "Dos años"], "Art. 9.1.c) Ley 55/2003."],
        [S2, "media", "La selección de este personal temporal se basa en igualdad, mérito, capacidad, competencia, publicidad y:", ["Celeridad", "Antigüedad", "Libre elección", "Proximidad"], "Art. 33.1 Ley 55/2003."],
        [S1, "media", "La técnico en cuidados de enfermería es personal estatutario:", ["Sanitario de formación profesional", "De gestión y servicios", "Sanitario universitario", "Laboral"], "Art. 6.2.b) Ley 55/2003."],
        [S3, "media", "La ausencia injustificada de seis días seguidos del administrativo es falta:", ["Muy grave", "Grave", "Leve", "No sancionable"], "Art. 72.2.e) Ley 55/2003."],
        [S3, "media", "Esa falta prescribe a los:", ["Cuatro años", "Dos años", "Seis meses", "Un año"], "Art. 72.6 Ley 55/2003."],
        [S3, "media", "Además, por la jornada no realizada procede:", ["La deducción proporcional de haberes, sin carácter sancionador", "Nada", "Una multa", "La pérdida automática de la plaza"], "Art. 41.6 Ley 55/2003."],
        [S3, "media", "Los tres trabajadores están encuadrados en la Seguridad Social en:", ["El Régimen General", "MUFACE", "Clases Pasivas", "MUGEJU"], "Art. 17.1.i) Ley 55/2003."],
      ],
    },
    {
      slug: "oficina-judicial-zaragoza",
      titulo: "Una oficina judicial en Zaragoza",
      supuesto: "En un juzgado de Zaragoza prestan servicio una funcionaria de Gestión Procesal, un funcionario de Tramitación Procesal, una funcionaria de Auxilio Judicial y un interino de Tramitación por acumulación de asuntos. La Dirección General competente del Gobierno de Aragón gestiona su personal.",
      preguntas: [
        [S6, "media", "El Gobierno de Aragón gestiona a este personal porque:", ["Asumió la competencia (art. 67 EAA) y recibió el traspaso del RD 1702/2007", "Son funcionarios de cuerpos autonómicos", "Lo decidió el CGPJ", "Son personal laboral de la DGA"], "Art. 67.1 EAA y RD 1702/2007."],
        [S4, "media", "Sus cuerpos tienen carácter:", ["Nacional", "Autonómico", "Local", "Interino"], "Art. 470.2 LOPJ."],
        [S4, "media", "Gestionar la tramitación de los procedimientos dando cuenta al Letrado corresponde a:", ["La funcionaria de Gestión Procesal", "La funcionaria de Auxilio Judicial", "El interino", "El juez"], "Art. 476.1.a) LOPJ."],
        [S4, "media", "Confeccionar las cédulas para los actos de comunicación corresponde a:", ["El funcionario de Tramitación Procesal", "La funcionaria de Gestión Procesal", "El Letrado", "La policía"], "Art. 477.d) LOPJ."],
        [S4, "media", "Practicar un embargo como agente de la autoridad corresponde, en particular, a:", ["La funcionaria de Auxilio Judicial", "El funcionario de Tramitación", "La Dirección General", "El procurador"], "Art. 478.b) LOPJ."],
        [S4, "media", "Mantener el orden en la sala de vistas corresponde a:", ["La funcionaria de Auxilio Judicial", "La funcionaria de Gestión Procesal", "El interino de Tramitación", "El abogado"], "Art. 478.e) LOPJ."],
        [S5, "media", "El interino podrá ser nombrado, además, por:", ["Vacante o sustitución transitoria del titular", "Libre designación", "Comisión de servicios", "Contrato mercantil"], "Art. 489.1 LOPJ."],
        [S5, "media", "El interino cesará, entre otros supuestos, cuando:", ["Desaparezcan las razones de urgencia que motivaron el nombramiento", "Cumpla un año", "Lo pida el abogado", "Cambie el juez"], "Art. 489.3 LOPJ."],
        [S5, "media", "En Seguridad Social, el interino está en:", ["El Régimen General", "Clases Pasivas", "MUFACE", "Régimen de autónomos"], "Art. 495.2 LOPJ."],
        [S5, "media", "El calendario laboral de la oficina se aprueba por el órgano competente de Aragón, previo informe de:", ["El Consejo General del Poder Judicial y negociación sindical", "El Tribunal Constitucional", "El Justicia de Aragón", "El Colegio de Abogados solo"], "Art. 500.4 LOPJ."],
      ],
    },
    {
      slug: "oposicion-justicia-aragon",
      titulo: "Una opositora a Justicia en Aragón",
      supuesto: "Lucía, con el título de Bachiller, quiere presentarse a Tramitación Procesal y Administrativa para trabajar en Aragón; su hermano, con ESO, prefiere Auxilio Judicial. Ambos se preguntan quién convoca, qué temario hay y si deben examinarse de derecho civil aragonés.",
      preguntas: [
        [S4, "media", "Con el título de Bachiller, Lucía puede acceder a:", ["Tramitación Procesal y Administrativa", "Gestión Procesal solo con ese título", "Médicos Forenses", "Facultativos del INTCF"], "Art. 475.a) LOPJ."],
        [S4, "media", "Su hermano, con ESO, puede acceder a:", ["Auxilio Judicial", "Tramitación Procesal", "Gestión Procesal", "Técnicos Especialistas del INTCF"], "Art. 475.a) LOPJ."],
        [S5, "media", "Las necesidades de personal de Aragón para estos cuerpos:", ["Las determina la Comunidad y las comunica al Ministerio, que elabora una oferta única", "Las fija el CGPJ", "Se convocan en una OEP autonómica separada", "No existen"], "Art. 482.2-3 LOPJ."],
        [S5, "media", "Las pruebas las convoca:", ["El Ministerio de Justicia", "El Gobierno de Aragón", "El Tribunal Superior de Justicia de Aragón", "Las Cortes de Aragón"], "Art. 483.3 LOPJ."],
        [S5, "media", "El temario es:", ["Único para cada cuerpo en todo el Estado", "Distinto en cada Comunidad", "Elegido por el aspirante", "Fijado por cada juzgado"], "Art. 483.2 LOPJ."],
        [S5, "dificil", "Una prueba de derecho civil aragonés, si se establece, sería:", ["Optativa y no eliminatoria, con puntuación para el ámbito territorial", "Obligatoria y eliminatoria", "Obligatoria en todo el Estado", "Exigida solo a Gestión Procesal"], "Art. 483.2 LOPJ."],
        [S5, "media", "Lucía solo puede presentarse por:", ["Uno de los ámbitos territoriales de la convocatoria", "Todos los ámbitos a la vez", "Tres ámbitos", "El ámbito que le asigne el tribunal"], "Art. 483.5 LOPJ."],
        [S5, "media", "Si aprueba por el ámbito de Aragón, obtendrá destino:", ["En vacantes radicadas en ese mismo territorio", "En cualquier lugar de España", "En Madrid obligatoriamente", "En el Ministerio"], "Art. 483.5 LOPJ."],
        [S5, "media", "El acceso a estos cuerpos se efectúa por los sistemas establecidos en:", ["El texto refundido del EBEP", "El Estatuto de los Trabajadores", "El Estatuto Marco", "La Ley de Contratos"], "Art. 484 LOPJ."],
        [S5, "media", "Una vez funcionaria, Lucía tendrá derecho a un mutualismo propio, que es:", ["El Mutualismo Judicial", "MUFACE", "ISFAS", "Ninguno"], "Art. 495.1.k) LOPJ."],
      ],
    },
  ],
});
