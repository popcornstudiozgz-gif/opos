/**
 * Crea tema-391 — Tema 19 de Administrativo DGA (tema 14 del programa de
 * materias específicas): "El personal de la Administración de la
 * Comunidad Autónoma de Aragón (IV). Derechos y deberes de los
 * funcionarios. Sistema de retribuciones. Indemnizaciones. Las
 * incompatibilidades. El régimen disciplinario: faltas, sanciones y
 * procedimiento."
 *
 * Fuentes (textos consolidados leídos en esta sesión en la API del BOE):
 * - RDLeg 5/2015, texto refundido del EBEP (BOE-A-2015-11719): arts. 14-15,
 *   21-30, 47-54 y 93-98 (en la redacción vigente: permiso por nacimiento de
 *   diecinueve semanas y permiso parental de ocho semanas).
 * - Decreto Legislativo 1/1991, Ley de Ordenación de la Función Pública de
 *   Aragón (BOA-d-1991-90001): arts. 12.2.j), 47-48 y disposiciones
 *   adicionales undécima, decimotercera y vigésima segunda (esta remite,
 *   para las faltas graves y leves, al Reglamento estatal de Régimen
 *   Disciplinario).
 * - Ley 53/1984, de Incompatibilidades (BOE-A-1985-151): arts. 1-4, 9, 11,
 *   12, 14, 16, 19 y 20.
 * - RD 33/1986, Reglamento de Régimen Disciplinario de los Funcionarios de
 *   la Administración del Estado (BOE-A-1986-1216): arts. 6-8 y 14-17.
 * - RD 462/2002, sobre indemnizaciones por razón del servicio
 *   (BOE-A-2002-10337): arts. 1, 3, 5, 27 y 30. La convocatoria aragonesa de
 *   2025 lo cita para clasificar el tribunal (categoría segunda).
 * Laguna señalada: fuentes sindicales mencionan un decreto aragonés propio
 * de dietas y kilometraje negociado recientemente en la Mesa General, pero
 * no se ha localizado su texto oficial en el BOA en esta sesión; el tema no
 * da cuantías de dietas y se limita a los conceptos.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-391-personal-aragon-derechos-retribuciones-disciplina.mjs
 */
import { sembrarTema, ADMIN_DGA } from "./lib/sembrar-tema.mjs";

const EBEP = "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11719";
const LOFPA = "https://www.boe.es/buscar/act.php?id=BOA-d-1991-90001";
const L53 = "https://www.boe.es/buscar/act.php?id=BOE-A-1985-151";
const RD33 = "https://www.boe.es/buscar/act.php?id=BOE-A-1986-1216";
const RD462 = "https://www.boe.es/buscar/act.php?id=BOE-A-2002-10337";
const S1 = "derechos-empleados-publicos";
const S2 = "deberes-codigo-conducta";
const S3 = "jornada-permisos-vacaciones";
const S4 = "sistema-retributivo";
const S5 = "indemnizaciones-razon-servicio";
const S6 = "incompatibilidades";
const S7 = "regimen-disciplinario";

await sembrarTema({
  tema: {
    slug: "tema-391",
    titulo: "El personal de la Administración de Aragón (IV): derechos y deberes, retribuciones, indemnizaciones, incompatibilidades y régimen disciplinario",
    descripcion: "Derechos individuales y ejercidos colectivamente; deberes y código de conducta (principios éticos y de conducta). Jornada, permisos y vacaciones (EBEP). Sistema de retribuciones: básicas (sueldo y trienios), complementarias, pagas extraordinarias, interinos y funcionarios en prácticas, deducciones; régimen aragonés (complemento de destino, específico con componente variable y productividad). Indemnizaciones por razón del servicio: comisiones de servicio, desplazamientos, traslados y asistencias. Incompatibilidades (Ley 53/1984): segundo puesto público, actividades privadas, compatibilidad y actividades exceptuadas. Régimen disciplinario: principios, faltas muy graves (EBEP), graves y leves (RD 33/1986, aplicable en Aragón por remisión legal), sanciones, prescripción, procedimiento y suspensión provisional.",
    contenido: "Lo que el funcionario puede exigir (inamovilidad, sueldo, formación, conciliación, vacaciones de veintidós días hábiles, seis días de asuntos propios) y lo que debe cumplir (código de conducta, obediencia, sigilo). Cómo se compone la nómina, qué se cobra cuando se viaja por trabajo o se forma parte de un tribunal, cuándo se puede compaginar el puesto con otra actividad y qué faltas pueden acabar en apercibimiento, suspensión o separación del servicio.",
    enlaces_boe: [
      { url: EBEP, titulo: "Real Decreto Legislativo 5/2015, texto refundido del Estatuto Básico del Empleado Público (BOE-A-2015-11719)" },
      { url: LOFPA, titulo: "Decreto Legislativo 1/1991, Ley de Ordenación de la Función Pública de Aragón (BOA-d-1991-90001)" },
      { url: L53, titulo: "Ley 53/1984, de Incompatibilidades del personal al servicio de las Administraciones Públicas (BOE-A-1985-151)" },
      { url: RD33, titulo: "Real Decreto 33/1986, Reglamento de Régimen Disciplinario de los Funcionarios de la Administración del Estado (BOE-A-1986-1216)" },
      { url: RD462, titulo: "Real Decreto 462/2002, sobre indemnizaciones por razón del servicio (BOE-A-2002-10337)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "Derechos individuales y colectivos", articulos: "arts. 14-15 EBEP", url: `${EBEP}#a14` },
      { seccion: S2, titulo: "Deberes y código de conducta", articulos: "arts. 52-54 EBEP", url: `${EBEP}#a52` },
      { seccion: S3, titulo: "Jornada, permisos y vacaciones", articulos: "arts. 47-50 EBEP", url: `${EBEP}#a47` },
      { seccion: S4, titulo: "Sistema de retribuciones", articulos: "arts. 21-30 EBEP; arts. 47-48 y DA 11.ª y 13.ª DLeg 1/1991", url: `${EBEP}#a21` },
      { seccion: S5, titulo: "Indemnizaciones por razón del servicio", articulos: "art. 28 EBEP; arts. 1, 3, 5, 27 y 30 RD 462/2002", url: `${RD462}#a1` },
      { seccion: S6, titulo: "Incompatibilidades", articulos: "Ley 53/1984", url: `${L53}#aprimero` },
      { seccion: S7, titulo: "Régimen disciplinario", articulos: "arts. 93-98 EBEP; DA 22.ª DLeg 1/1991; arts. 6-8 y 14-17 RD 33/1986", url: `${EBEP}#a93` },
    ],
  },
  vinculo: { oposicion: ADMIN_DGA.oposicion, bloqueId: ADMIN_DGA.bloquePersonal, numero: 19 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Derechos individuales (art. 14 EBEP)", "Inamovilidad, desempeño efectivo de funciones, carrera y promoción, retribuciones e indemnizaciones, defensa jurídica, formación continua, intimidad y dignidad, no discriminación, conciliación, desconexión digital, libertad de expresión, seguridad y salud, vacaciones y permisos, jubilación, Seguridad Social y libre asociación profesional"],
        ["Derechos individuales ejercidos colectivamente (art. 15 EBEP)", "Libertad sindical, negociación colectiva, huelga con servicios esenciales, conflictos colectivos y reunión"],
        ["Inamovilidad (art. 14.a EBEP)", "Derecho propio del funcionario de carrera: solo pierde su condición por las causas legales"],
        ["Defensa jurídica (art. 14.f EBEP)", "Derecho a la defensa y protección de la Administración en procedimientos judiciales derivados del ejercicio legítimo de sus funciones"],
        ["Formación (art. 14.g EBEP)", "Derecho a la formación continua y actualización permanente, preferentemente en horario laboral"],
        ["Desconexión digital (art. 14.j bis EBEP)", "Derecho a la intimidad en el uso de dispositivos digitales y frente a videovigilancia y geolocalización, y a la desconexión digital"],
      ],
      preguntas: [
        ["media", "¿Cuál de estos es un derecho individual que se ejerce de forma colectiva según el EBEP?", ["El derecho de huelga", "La inamovilidad", "La formación continua", "La defensa jurídica"], "Art. 15.c) EBEP."],
        ["media", "El derecho a la inamovilidad corresponde a:", ["Los funcionarios de carrera", "Todo el personal laboral", "El personal eventual", "Los interinos"], "Art. 14.a) EBEP."],
        ["media", "La formación continua debe realizarse preferentemente:", ["En horario laboral", "Fuera del horario", "En vacaciones", "Los fines de semana"], "Art. 14.g) EBEP."],
        ["facil", "El derecho a la desconexión digital está reconocido en:", ["El art. 14 del EBEP", "El Código Penal", "La Ley de Contratos", "La Constitución, art. 103"], "Art. 14.j bis) EBEP."],
        ["media", "La Administración debe prestar defensa jurídica al empleado en procedimientos judiciales derivados:", ["Del ejercicio legítimo de sus funciones", "De cualquier asunto personal", "Solo de causas penales", "Solo si lo pide el sindicato"], "Art. 14.f) EBEP."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Deberes y código de conducta (art. 52 EBEP)", "Desempeñar con diligencia las tareas, velar por los intereses generales y actuar con objetividad, integridad, neutralidad, responsabilidad, imparcialidad, confidencialidad, dedicación, transparencia, ejemplaridad, austeridad, accesibilidad, eficacia, honradez e igualdad"],
        ["Valor del código (art. 52 EBEP)", "Sus principios informan la interpretación y aplicación del régimen disciplinario"],
        ["Principios éticos (art. 53 EBEP)", "Respeto a la Constitución, interés general, lealtad y buena fe, no discriminación, abstención en conflictos de intereses, no aceptar tratos de favor, eficacia, no influir sin justa causa, diligencia, neutralidad y secreto"],
        ["Principios de conducta (art. 54 EBEP)", "Trato atento, diligencia y cumplimiento de la jornada, obediencia salvo infracción manifiesta, información a los ciudadanos, austeridad, rechazo de regalos fuera de los usos sociales, custodia de documentos, formación y seguridad laboral"],
        ["Obediencia (art. 54.3 EBEP)", "Se obedecen las instrucciones profesionales salvo que constituyan una infracción manifiesta del ordenamiento, que se comunicará a los órganos de inspección"],
        ["Regalos (art. 54.6 EBEP)", "Se rechazará cualquier regalo, favor o servicio en condiciones ventajosas que vaya más allá de los usos habituales, sociales y de cortesía"],
      ],
      preguntas: [
        ["media", "Un funcionario recibe una orden de un superior que constituye una infracción manifiesta del ordenamiento jurídico. Debe:", ["No obedecerla y ponerla en conocimiento de los órganos de inspección", "Obedecerla siempre", "Obedecerla y luego recurrir", "Consultar a un compañero"], "Art. 54.3 EBEP."],
        ["media", "Los principios del código de conducta:", ["Informan la interpretación y aplicación del régimen disciplinario", "Son meras recomendaciones sin efecto", "Solo se aplican a altos cargos", "Sustituyen al régimen disciplinario"], "Art. 52 EBEP."],
        ["media", "¿Qué debe hacer un empleado ante un regalo que excede de los usos habituales, sociales y de cortesía?", ["Rechazarlo", "Aceptarlo si es de poco valor", "Compartirlo con la unidad", "Aceptarlo y declararlo después"], "Art. 54.6 EBEP."],
        ["media", "Abstenerse en los asuntos en que se tenga un interés personal es un:", ["Principio ético", "Derecho colectivo", "Permiso", "Complemento retributivo"], "Art. 53.5 EBEP."],
        ["dificil", "¿Cuál de estos es un principio de conducta del art. 54 EBEP?", ["Garantizar la atención al ciudadano en la lengua oficial que solicite", "Recibir regalos de cortesía ilimitados", "No informar a los ciudadanos", "Usar bienes públicos para fines personales si no hay perjuicio"], "Art. 54.11 EBEP."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Jornada (art. 47 EBEP)", "La fija cada Administración, a tiempo completo o parcial, con flexibilización horaria para el cuidado de menores de 12 años y familiares dependientes"],
        ["Asuntos particulares (art. 48.k EBEP)", "Seis días al año"],
        ["Matrimonio o pareja de hecho (art. 48.l EBEP)", "Quince días"],
        ["Enfermedad grave u hospitalización (art. 48.a EBEP)", "Cinco días hábiles para cónyuge, pareja o primer grado (o conviviente que requiera cuidado); cuatro para el segundo grado"],
        ["Fallecimiento (art. 48.a EBEP)", "Primer grado: tres días hábiles en la misma localidad y cinco en distinta; segundo grado: dos y cuatro"],
        ["Lactancia (art. 48.f EBEP)", "Una hora diaria por hijo menor de doce meses (divisible o como reducción de jornada), acumulable en jornadas completas"],
        ["Permiso por nacimiento (art. 49.a y c EBEP)", "Diecinueve semanas para la madre biológica y también para el otro progenitor (treinta y dos en monoparentalidad); seis semanas obligatorias tras el parto"],
        ["Permiso parental (art. 49.g EBEP)", "Hasta ocho semanas no retribuidas para el cuidado de hijos hasta que cumplan ocho años"],
        ["Vacaciones (art. 50 EBEP)", "Veintidós días hábiles por año natural (los sábados no son hábiles); no se sustituyen por dinero salvo cese ajeno a la voluntad del funcionario"],
      ],
      preguntas: [
        ["facil", "Los funcionarios tienen derecho a unas vacaciones anuales retribuidas de:", ["Veintidós días hábiles", "Treinta días naturales", "Veinte días hábiles", "Un mes"], "Art. 50.1 EBEP."],
        ["facil", "El permiso por asuntos particulares es de:", ["Seis días al año", "Cuatro días al año", "Diez días al año", "Tres días al año"], "Art. 48.k) EBEP."],
        ["media", "El permiso por matrimonio o constitución de pareja de hecho es de:", ["Quince días", "Diez días", "Cinco días", "Un mes"], "Art. 48.l) EBEP."],
        ["media", "Por fallecimiento de un familiar de primer grado en distinta localidad, el permiso es de:", ["Cinco días hábiles", "Tres días hábiles", "Dos días hábiles", "Cuatro días hábiles"], "Art. 48.a) EBEP."],
        ["dificil", "En la redacción vigente del EBEP, el permiso por nacimiento para la madre biológica dura:", ["Diecinueve semanas", "Dieciséis semanas", "Veinte semanas", "Doce semanas"], "Art. 49.a) EBEP."],
        ["media", "El permiso parental para el cuidado de hijos hasta los ocho años:", ["No es retribuido y dura como máximo ocho semanas", "Es retribuido y dura un año", "Solo lo disfruta la madre", "Dura dos semanas retribuidas"], "Art. 49.g) EBEP."],
        ["media", "Las vacaciones de los funcionarios:", ["No pueden sustituirse por una compensación económica, salvo cese por causas ajenas a su voluntad", "Pueden cambiarse por dinero libremente", "Se pierden si no se disfrutan en el mes de agosto", "Son de veintidós días naturales"], "Art. 50.3 EBEP."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Clases de retribuciones (art. 22 EBEP)", "Básicas (según el subgrupo y la antigüedad) y complementarias (características del puesto, carrera y desempeño)"],
        ["Retribuciones básicas (art. 23 EBEP)", "Sueldo del subgrupo y trienios (una cantidad igual por subgrupo por cada tres años de servicio); se fijan en la Ley de Presupuestos Generales del Estado"],
        ["Retribuciones complementarias (art. 24 EBEP)", "Atienden a la carrera, a la dificultad, responsabilidad y dedicación del puesto, al rendimiento y a los servicios extraordinarios"],
        ["Pagas extraordinarias (art. 22.4 EBEP)", "Dos al año, cada una con una mensualidad de básicas y de las complementarias (salvo productividad y gratificaciones)"],
        ["Régimen aragonés (art. 48 DLeg 1/1991)", "Básicas iguales a las del Estado; complementos de destino (por nivel), específico (por puesto) y de productividad, con cuantías en el Presupuesto de la Comunidad Autónoma"],
        ["Componente variable del específico (DA 11.ª DLeg 1/1991)", "Puede retribuir la turnicidad, atención continuada, nocturnidad o trabajo en domingos y festivos, reflejado en la RPT"],
        ["Interinos y en prácticas (arts. 25-26 EBEP)", "Interinos: básicas, extras y complementarias de puesto, rendimiento y servicios extraordinarios; en prácticas: como mínimo el sueldo del subgrupo"],
        ["Deducción de retribuciones (art. 30 EBEP y DA 13.ª DLeg 1/1991)", "La jornada no realizada y la huelga dan lugar a deducción proporcional, que no es sanción"],
        ["Prohibición de premios (art. 22.5 EBEP)", "No pueden percibirse participaciones en tributos ni premios en multas como contraprestación de un servicio"],
      ],
      preguntas: [
        ["media", "Las retribuciones básicas de los funcionarios están integradas por:", ["El sueldo y los trienios", "El complemento de destino y el específico", "La productividad y las gratificaciones", "El sueldo y el complemento específico"], "Art. 23 EBEP."],
        ["media", "Los trienios consisten en una cantidad:", ["Igual para cada subgrupo por cada tres años de servicio", "Que fija cada jefe de servicio", "Proporcional al puesto desempeñado", "Que solo cobran los interinos"], "Art. 23.b) EBEP."],
        ["media", "Las pagas extraordinarias son:", ["Dos al año", "Tres al año", "Una al año", "Catorce al año"], "Art. 22.4 EBEP."],
        ["dificil", "En Aragón, la turnicidad o la nocturnidad pueden retribuirse mediante:", ["Un componente variable del complemento específico", "Un complemento de destino adicional", "Trienios extraordinarios", "Indemnizaciones por razón del servicio"], "DA 11.ª DLeg 1/1991."],
        ["media", "La deducción de haberes por la parte de jornada no realizada:", ["No tiene carácter de sanción", "Es una sanción leve", "Es una sanción grave", "Exige expediente disciplinario"], "Art. 30.1 EBEP y DA 13.ª DLeg 1/1991."],
        ["media", "El complemento que retribuye las condiciones particulares de un puesto concreto (dificultad, responsabilidad, dedicación) es:", ["El complemento específico", "El complemento de destino", "El sueldo", "Los trienios"], "Art. 24.b) EBEP y art. 48 DLeg 1/1991."],
        ["media", "Las retribuciones básicas de los funcionarios aragoneses son:", ["Iguales a las de los funcionarios del Estado para cada grupo", "Fijadas libremente por Aragón", "Diferentes por provincias", "Negociadas en cada departamento"], "Art. 48.1 DLeg 1/1991."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["Derecho a indemnizaciones (arts. 14.d y 28 EBEP)", "Los funcionarios perciben las indemnizaciones correspondientes por razón del servicio"],
        ["Supuestos indemnizables (art. 1 RD 462/2002)", "Comisiones de servicio, desplazamientos dentro del término municipal, traslados de residencia y asistencias a órganos colegiados, tribunales y formación"],
        ["Comisión de servicio con indemnización (art. 3 RD 462/2002)", "Cometido especial ordenado circunstancialmente fuera del término municipal de la residencia oficial; no lo es el desplazamiento habitual a casa"],
        ["Duración (art. 5 RD 462/2002)", "Salvo excepciones, no más de un mes en territorio nacional y tres en el extranjero, con posible prórroga"],
        ["Asistencias (art. 27 RD 462/2002)", "Por reuniones de órganos colegiados, participación en tribunales y colaboración no habitual en formación; en conjunto no más del 50 % de las retribuciones anuales del puesto"],
        ["Categorías de tribunales (art. 30 RD 462/2002)", "Primera (grupo A), segunda (grupos B y C) y tercera (D y E); el tribunal de la convocatoria aragonesa de 2025 es de categoría segunda"],
        ["Nulidad (art. 1.2 RD 462/2002)", "Toda indemnización que no se ajuste en cuantía o requisitos a la norma es nula"],
      ],
      preguntas: [
        ["media", "¿Cuál de estos supuestos da derecho a indemnización por razón del servicio según el RD 462/2002?", ["La participación en tribunales de oposiciones", "El desplazamiento habitual de casa al trabajo", "La asistencia a un curso voluntario por iniciativa propia en vacaciones", "Las horas de trabajo ordinarias"], "Arts. 1 y 3 RD 462/2002."],
        ["media", "Una comisión de servicio con derecho a indemnización se desarrolla:", ["Fuera del término municipal donde radica la residencia oficial", "En el propio puesto de trabajo", "En el domicilio del funcionario", "Solo en el extranjero"], "Art. 3.1 RD 462/2002."],
        ["media", "Salvo casos excepcionales, una comisión de servicio en territorio nacional no durará más de:", ["Un mes", "Tres meses", "Una semana", "Seis meses"], "Art. 5.1 RD 462/2002."],
        ["dificil", "El tribunal de la oposición de Administrativos (C1) de la convocatoria aragonesa de 2025 tiene, a efectos de asistencias, la categoría:", ["Segunda", "Primera", "Tercera", "Especial"], "Base 5.6 de la convocatoria y art. 30.1.b) RD 462/2002."],
        ["media", "Las asistencias percibidas por un empleado en un año no pueden superar en conjunto:", ["El 50 % de sus retribuciones anuales del puesto, excluida la antigüedad", "El 10 % del sueldo", "El 100 % del sueldo", "Mil euros"], "Art. 27.3 RD 462/2002."],
      ],
    },
    {
      seccion: S6,
      flashcards: [
        ["Principio general (art. 1.1 Ley 53/1984)", "No se puede compatibilizar el puesto con un segundo puesto, cargo o actividad en el sector público, salvo los supuestos previstos en la ley"],
        ["Una sola remuneración pública (art. 1.2 Ley 53/1984)", "No se puede percibir más de una remuneración con cargo a presupuestos públicos, salvo excepciones legales"],
        ["Ámbito (art. 2 Ley 53/1984)", "Personal de todas las Administraciones, organismos, empresas con más del 50 % de capital público y entidades financiadas mayoritariamente con fondos públicos"],
        ["Segundo puesto público (art. 3 Ley 53/1984)", "Solo en docencia y sanidad y otros casos legales, con autorización previa y expresa por razón de interés público, sin modificar jornada ni horario"],
        ["Pensión y puesto público (art. 3.2 Ley 53/1984)", "El desempeño de un puesto público es incompatible con la pensión de jubilación, que queda en suspenso"],
        ["Actividades privadas prohibidas (arts. 11-12 Ley 53/1984)", "Las relacionadas directamente con el departamento; los asuntos en que se interviene o se ha intervenido en los dos últimos años; cargos en contratistas y participación superior al 10 % en ellos"],
        ["Reconocimiento de compatibilidad (art. 14 Ley 53/1984)", "Las actividades privadas requieren reconocimiento previo, resuelto en dos meses por el órgano competente de la Comunidad Autónoma; en Aragón, el consejero de función pública"],
        ["Complemento específico e incompatibilidad (art. 16 Ley 53/1984)", "No se reconoce compatibilidad cuando las retribuciones complementarias incluyan el factor de incompatibilidad (según la redacción del EBEP)"],
        ["Actividades exceptuadas (art. 19 Ley 53/1984)", "Administración del patrimonio personal, cursos no habituales (hasta 75 horas al año), tribunales de oposiciones, creación literaria o artística, colaboración ocasional en medios y congresos"],
      ],
      preguntas: [
        ["media", "¿Cuál de estas actividades está exceptuada del régimen de incompatibilidades?", ["La participación en tribunales calificadores de pruebas selectivas", "Trabajar para una empresa contratista del propio departamento", "Ser administrador de una empresa concesionaria", "Asesorar a particulares en expedientes que tramita el funcionario"], "Art. 19.c) Ley 53/1984."],
        ["media", "El reconocimiento de compatibilidad para una actividad privada debe resolverse en el plazo de:", ["Dos meses", "Un mes", "Quince días", "Seis meses"], "Art. 14 Ley 53/1984."],
        ["dificil", "Está prohibida la participación en el capital de empresas contratistas o concesionarias de la Administración cuando es superior al:", ["10 %", "5 %", "25 %", "50 %"], "Art. 12.1.d) Ley 53/1984."],
        ["media", "La impartición de cursos en centros oficiales de formación de funcionarios está exceptuada si no es permanente ni habitual y no supera al año:", ["Setenta y cinco horas", "Cien horas", "Cincuenta horas", "Doscientas horas"], "Art. 19.b) Ley 53/1984."],
        ["media", "Desempeñar un puesto en el sector público es incompatible con:", ["Percibir una pensión de jubilación, que queda en suspenso", "Recibir trienios", "Hacer cursos de formación", "Escribir libros"], "Art. 3.2 Ley 53/1984."],
        ["media", "En la Administración aragonesa, los expedientes de incompatibilidades los resuelve:", ["El consejero competente en materia de función pública", "El Gobierno de Aragón", "El jefe de servicio", "El Justicia de Aragón"], "Art. 12.2.j) DLeg 1/1991 y art. 14 Ley 53/1984."],
      ],
    },
    {
      seccion: S7,
      flashcards: [
        ["Sujetos (art. 93 EBEP)", "Funcionarios y personal laboral; también responden quienes inducen a cometer faltas y quienes encubren faltas muy graves o graves con daño grave"],
        ["Principios (art. 94.2 EBEP)", "Legalidad y tipicidad, irretroactividad de lo desfavorable, proporcionalidad, culpabilidad y presunción de inocencia"],
        ["Indicios de delito (art. 94.3 EBEP)", "Se suspende el procedimiento disciplinario y se comunica al Ministerio Fiscal; los hechos probados judicialmente vinculan a la Administración"],
        ["Faltas muy graves (art. 95.2 EBEP)", "Entre otras: incumplir el deber de respeto a la Constitución y al Estatuto, discriminación y acoso, abandono del servicio, acuerdos manifiestamente ilegales, uso indebido de información, desobediencia abierta, incompatibilidad, acoso laboral"],
        ["Faltas graves y leves en Aragón (DA 22.ª DLeg 1/1991)", "Son las tipificadas como tales en el Reglamento de Régimen Disciplinario de los Funcionarios de la Administración del Estado (RD 33/1986)"],
        ["Ejemplos de faltas graves (art. 7 RD 33/1986)", "Falta de obediencia, abuso de autoridad, intervenir con causa de abstención, incumplir la jornada al menos diez horas al mes, grave desconsideración, falta de sigilo con perjuicio"],
        ["Faltas leves (art. 8 RD 33/1986)", "Incumplimiento injustificado del horario, falta de asistencia de un día, incorrección con el público o compañeros, descuido o negligencia"],
        ["Sanciones (art. 96 EBEP)", "Separación del servicio (solo faltas muy graves), despido del laboral, suspensión firme hasta seis años, traslado forzoso, demérito, apercibimiento y las que establezca una ley"],
        ["Prescripción (art. 97 EBEP)", "Faltas: muy graves 3 años, graves 2, leves 6 meses; sanciones: muy graves 3 años, graves 2, leves 1"],
        ["Procedimiento (art. 98 EBEP)", "Obligatorio para faltas muy graves y graves, con separación entre instrucción y resolución; las leves, procedimiento sumario con audiencia"],
        ["Suspensión provisional (art. 98.3 EBEP)", "Máximo seis meses salvo paralización imputable al interesado; se perciben las retribuciones básicas"],
      ],
      preguntas: [
        ["media", "¿Cuál de estas es una falta muy grave según el EBEP?", ["El acoso laboral", "La falta de asistencia injustificada de un día", "La incorrección con el público", "El descuido en el ejercicio de las funciones"], "Art. 95.2.o) EBEP."],
        ["media", "En Aragón, las faltas graves y leves de los funcionarios son las tipificadas en:", ["El Reglamento de Régimen Disciplinario de los Funcionarios de la Administración del Estado (RD 33/1986)", "El convenio colectivo del personal laboral", "Una orden del consejero", "El Código Penal"], "DA 22.ª DLeg 1/1991."],
        ["media", "La sanción de separación del servicio solo puede imponerse por:", ["Faltas muy graves", "Faltas graves", "Faltas leves reiteradas", "Cualquier falta"], "Art. 96.1.a) EBEP."],
        ["media", "Las faltas graves prescriben a los:", ["Dos años", "Seis meses", "Tres años", "Un año"], "Art. 97.1 EBEP."],
        ["dificil", "El incumplimiento injustificado de la jornada que, acumulado, suponga un mínimo de diez horas al mes es:", ["Falta grave", "Falta leve", "Falta muy grave", "No es falta"], "Art. 7.1.l) RD 33/1986."],
        ["media", "Si durante la instrucción de un expediente disciplinario aparecen indicios fundados de delito:", ["Se suspende el procedimiento y se pone en conocimiento del Ministerio Fiscal", "Se continúa sin más", "Se archiva", "Se impone la sanción máxima"], "Art. 94.3 EBEP."],
        ["media", "Las faltas leves se sancionan mediante:", ["Procedimiento sumario con audiencia al interesado", "Expediente ordinario con instructor y secretario", "Sin ningún procedimiento", "Sentencia judicial"], "Art. 98.1 EBEP."],
        ["media", "La suspensión firme de funciones por falta disciplinaria tiene una duración máxima de:", ["Seis años", "Tres años", "Un año", "Diez años"], "Art. 96.1.c) EBEP."],
      ],
    },
  ],
  glosario: [
    [S1, "Inamovilidad", "Garantía del funcionario de carrera de no perder su condición salvo por las causas previstas en la ley."],
    [S2, "Código de conducta", "Conjunto de principios éticos y de conducta del EBEP que deben guiar la actuación de los empleados públicos."],
    [S3, "Permiso parental", "Permiso no retribuido de hasta ocho semanas para cuidar a hijos hasta los ocho años."],
    [S4, "Trienio", "Retribución básica por cada tres años de servicio, de importe igual para todos los funcionarios del mismo subgrupo."],
    [S4, "Complemento de destino", "Retribución complementaria que corresponde al nivel del puesto que se desempeña."],
    [S4, "Complemento específico", "Retribución complementaria que remunera las condiciones particulares de un puesto concreto."],
    [S5, "Asistencia", "Indemnización por participar en un órgano colegiado, un tribunal de oposiciones o actividades de formación no habituales."],
    [S6, "Reconocimiento de compatibilidad", "Autorización previa necesaria para ejercer una actividad privada siendo empleado público."],
    [S7, "Demérito", "Sanción disciplinaria que penaliza a efectos de carrera, promoción o movilidad voluntaria."],
    [S7, "Separación del servicio", "Sanción máxima, solo por falta muy grave, que supone la pérdida de la condición de funcionario."],
  ],
  casos: [
    {
      slug: "funcionaria-segunda-actividad",
      titulo: "Una funcionaria que quiere trabajar por las tardes",
      supuesto: "Una administrativa del Gobierno de Aragón, cuyo puesto tiene complemento específico sin factor de incompatibilidad, quiere dar clases particulares de contabilidad por las tardes, escribir un libro y formar parte del tribunal de unas oposiciones de su ayuntamiento. Un amigo le propone, además, entrar como socia con un 15 % en una empresa que suministra material a su departamento.",
      preguntas: [
        [S6, "media", "Para dar clases particulares necesita:", ["El reconocimiento previo de compatibilidad", "Nada, es libre", "Autorización del Justicia", "Pedir excedencia"], "Art. 14 Ley 53/1984."],
        [S6, "media", "El reconocimiento de compatibilidad debe resolverse en:", ["Dos meses", "Diez días", "Un año", "Seis meses"], "Art. 14 Ley 53/1984."],
        [S6, "media", "Si se le reconoce, la compatibilidad:", ["No puede modificar su jornada ni su horario", "Le permite salir antes", "Le exime de fichar", "Le reduce la jornada"], "Art. 14 Ley 53/1984."],
        [S6, "media", "Escribir un libro es una actividad:", ["Exceptuada del régimen de incompatibilidades, si no deriva de una relación de empleo", "Prohibida", "Que exige autorización del Gobierno", "Incompatible con el complemento específico"], "Art. 19.f) Ley 53/1984."],
        [S6, "media", "Formar parte del tribunal de oposiciones del ayuntamiento:", ["Está exceptuado del régimen de incompatibilidades", "Requiere compatibilidad previa", "Está prohibido", "Exige excedencia"], "Art. 19.c) Ley 53/1984."],
        [S5, "media", "Por formar parte de ese tribunal podría percibir:", ["Asistencias como indemnización por razón del servicio", "Un segundo sueldo", "Trienios adicionales", "Nada"], "Arts. 1 y 27 RD 462/2002."],
        [S6, "dificil", "La participación del 15 % en una empresa suministradora de su departamento:", ["Está prohibida por superar el 10 % en una empresa contratista", "Es libre", "Requiere solo comunicarlo", "Se permite si no trabaja allí"], "Art. 12.1.d) Ley 53/1984."],
        [S7, "media", "Si ejerciera una actividad incompatible, cometería:", ["Una falta muy grave", "Una falta leve", "Ninguna falta", "Una falta grave en todo caso"], "Art. 95.2.n) EBEP."],
        [S2, "media", "Aceptar regalos de esa empresa más allá de los usos sociales:", ["Contravendría el código de conducta", "Sería un derecho", "Estaría permitido si son de poco valor", "Es obligatorio declararlo pero se puede aceptar"], "Art. 54.6 EBEP."],
        [S6, "media", "En Aragón, el expediente de compatibilidad lo resolverá:", ["El consejero competente en función pública", "El Gobierno de Aragón", "Su jefe de sección", "El ayuntamiento"], "Art. 12.2.j) DLeg 1/1991."],
      ],
    },
    {
      slug: "nomina-administrativo-c1",
      titulo: "Entender la nómina",
      supuesto: "Un administrativo (C1) del Gobierno de Aragón con nueve años de servicio, que ocupa un puesto de nivel 18 con complemento específico y trabaja a turnos, revisa su nómina de junio y no entiende todos los conceptos. Además, un mes faltó dos horas sin justificar y vio un descuento.",
      preguntas: [
        [S4, "media", "Su sueldo depende de:", ["Su subgrupo (C1)", "Su puesto concreto", "Su antigüedad exclusivamente", "Su rendimiento"], "Art. 23.a) EBEP."],
        [S4, "media", "Con nueve años de servicio tiene derecho a:", ["Tres trienios", "Nueve trienios", "Un trienio", "Ninguno"], "Art. 23.b) EBEP: un trienio por cada tres años."],
        [S4, "media", "El complemento ligado al nivel 18 de su puesto es:", ["El complemento de destino", "El complemento específico", "La productividad", "Un trienio"], "Art. 48 DLeg 1/1991."],
        [S4, "media", "La retribución por trabajar a turnos puede figurar como:", ["Componente variable del complemento específico", "Trienio", "Paga extraordinaria", "Indemnización por razón del servicio"], "DA 11.ª DLeg 1/1991."],
        [S4, "media", "En junio cobra una paga extraordinaria que incluye:", ["Una mensualidad de básicas y de las complementarias, salvo productividad y gratificaciones", "Solo el sueldo", "Solo los trienios", "El doble de todo"], "Art. 22.4 EBEP."],
        [S4, "media", "El descuento por las dos horas no trabajadas:", ["Es una deducción proporcional que no es sanción", "Es una sanción leve", "Es ilegal", "Requiere expediente disciplinario"], "Art. 30.1 EBEP y DA 13.ª DLeg 1/1991."],
        [S4, "dificil", "En Aragón, ese descuento requiere previamente:", ["El trámite de audiencia del interesado", "Una sentencia", "Un acuerdo del Gobierno", "Nada"], "DA 13.ª.3 DLeg 1/1991."],
        [S7, "media", "Si los incumplimientos de jornada no justificados llegaran a diez horas en un mes, podría incurrir en:", ["Falta grave", "Falta leve", "Falta muy grave", "Ninguna falta"], "Art. 7.1.l) RD 33/1986."],
        [S4, "media", "Las cuantías de su complemento de destino y específico figuran en:", ["El Presupuesto de la Comunidad Autónoma", "El convenio colectivo", "La Ley de Presupuestos Generales del Estado exclusivamente", "Un acuerdo sindical"], "Art. 48.1 DLeg 1/1991."],
        [S1, "media", "Percibir sus retribuciones es:", ["Un derecho individual del art. 14 EBEP", "Un derecho colectivo", "Una gracia", "Un deber"], "Art. 14.d) EBEP."],
      ],
    },
    {
      slug: "expediente-faltas-asistencia",
      titulo: "Un expediente por faltas reiteradas",
      supuesto: "Un funcionario del Gobierno de Aragón falta un día sin justificar en enero (sancionado por falta leve), otro en febrero (de nuevo falta leve) y un tercero en marzo. Además, ha tratado con grave desconsideración a una compañera. La unidad de personal se plantea qué hacer.",
      preguntas: [
        [S7, "media", "La primera falta de asistencia injustificada de un día es:", ["Falta leve", "Falta grave", "Falta muy grave", "No es falta"], "Art. 8.b) RD 33/1986."],
        [S7, "dificil", "La tercera falta injustificada en tres meses, habiendo sido sancionadas las dos anteriores como leves, es:", ["Falta grave", "Falta leve", "Falta muy grave", "No es falta"], "Art. 7.1.m) RD 33/1986."],
        [S7, "media", "La grave desconsideración con una compañera es:", ["Falta grave", "Falta leve", "Falta muy grave", "Un derecho"], "Art. 7.1.e) RD 33/1986."],
        [S7, "media", "Para sancionar las faltas graves es obligatorio:", ["Tramitar el procedimiento disciplinario, con separación entre instrucción y resolución", "Un apercibimiento verbal", "Solo una audiencia", "Nada"], "Art. 98 EBEP."],
        [S7, "media", "Por una falta grave puede imponerse, entre otras sanciones:", ["Suspensión de funciones de hasta tres años o traslado con cambio de residencia", "Separación del servicio", "Despido", "Solo apercibimiento"], "Arts. 14 y 16 RD 33/1986."],
        [S7, "media", "Las faltas leves se sancionan con:", ["Apercibimiento (u otras sanciones que permita la norma para leves)", "Separación", "Suspensión de seis años", "Traslado con cambio de residencia"], "Art. 17 RD 33/1986 y art. 96 EBEP."],
        [S7, "media", "La falta grave prescribe a los:", ["Dos años", "Seis meses", "Tres años", "Un año"], "Art. 97 EBEP."],
        [S7, "media", "Durante el expediente puede acordarse su suspensión provisional por un máximo de:", ["Seis meses, salvo paralización imputable a él", "Dos años", "Un mes", "Tres años"], "Art. 98.3 EBEP."],
        [S7, "media", "En el procedimiento rigen, entre otros, los principios de:", ["Presunción de inocencia y proporcionalidad", "Secreto y arbitrariedad", "Culpabilidad presunta", "Retroactividad desfavorable"], "Art. 94.2 EBEP."],
        [S2, "media", "Tratar con atención y respeto a superiores y compañeros es:", ["Un principio de conducta del art. 54 EBEP", "Un derecho", "Un permiso", "Una recomendación sin efecto"], "Art. 54.1 EBEP."],
      ],
    },
  ],
});
