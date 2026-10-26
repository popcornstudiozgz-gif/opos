/**
 * Crea tema-426 — Tema 4 de Administrativa/o (Ayto. Zaragoza, promoción
 * interna, CONV 5.2bis/2025, Parte primera rectificada en el BOPZ núm. 278 de
 * 3-12-2025): "Derecho a la jornada de trabajo, permisos y vacaciones."
 *
 * Fuentes leídas íntegras en la sesión:
 * - TREBEP, RDLeg 5/2015 (BOE-A-2015-11719), arts. 48, 49, 50 y 51, texto
 *   VIGENTE descargado de la API del BOE el 26-10-2026 (consolidado
 *   actualizado el 14-10-2026): art. 48 con la letra m) añadida por la Ley
 *   6/2024 (en vigor el 3-03-2025); art. 49 con las letras a), b), c) y g) en
 *   la redacción del RDL 9/2025 (permisos por nacimiento de 19 semanas) y la
 *   letra e) en la de la Ley 4/2026, de 1 de octubre (BOE-A-2026-20528,
 *   vigente desde el 23-10-2026). La copia local de content-raw (agosto de
 *   2026) no recoge este último cambio: se ha usado el texto de la API.
 * - Acuerdo sobre condiciones de trabajo del personal funcionario del
 *   Ayuntamiento de Zaragoza 2024-2027 (BOPZ núm. 134 de 13-06-2024), arts.
 *   14, 16, 17, 18, 19 y 20.
 *
 * Discrepancia señalada, no resuelta: el art. 18 del Acuerdo (redactado en
 * 2024) habla de permisos por nacimiento, adopción y del otro progenitor de
 * «dieciséis semanas» «en las condiciones y la forma establecida en el
 * TREBEP»; el TREBEP vigente fija diecinueve semanas. La mejora de
 * maternidad municipal se suma «a las 16 ... o a las semanas que, en su
 * caso, establezca el TREBEP».
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-426-jornada-permisos-vacaciones.mjs
 */
import { sembrarTema, ADMIN_AYTO } from "./lib/sembrar-tema.mjs";

const TREBEP = "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11719";
const BOPZ_ACUERDO = "https://www.boa.aragon.es/cgi-bin/EBOA/BRSCGI?CMD=VEROBJ&MLKOB=1337816230404&type=pdf";
const S1 = "permisos-trebep";
const S2 = "permisos-conciliacion-trebep";
const S3 = "vacaciones";
const S4 = "permisos-licencias-acuerdo";

await sembrarTema({
  tema: {
    slug: "tema-426",
    titulo: "Jornada de trabajo, permisos y vacaciones",
    descripcion: "TREBEP vigente (octubre de 2026): permisos de los funcionarios (art. 48), permisos por conciliación, violencia de género o sexual y terrorismo (art. 49: nacimiento, adopción y otro progenitor de 19 semanas, permiso parental de 8 semanas, cuidado de hijo con cáncer), vacaciones de 22 días hábiles (art. 50) y personal laboral (art. 51). Acuerdo sobre condiciones de trabajo del personal funcionario del Ayuntamiento de Zaragoza 2024-2027: días por exceso de jornada y por antigüedad, vacaciones y su tramitación, vacaciones por antigüedad, permisos y su límite de 16 días, mejoras de conciliación (permiso desde la semana 37, mejora de maternidad, bolsas de horas), licencias y reducciones de jornada.",
    contenido: "Qué permisos y vacaciones tiene un funcionario del Ayuntamiento de Zaragoza. El TREBEP fija los mínimos: por fallecimiento de un familiar de primer grado, tres días hábiles (cinco si es en otra localidad); por enfermedad grave u hospitalización, cinco días (cuatro si es de segundo grado); seis días de asuntos particulares; quince por matrimonio; diecinueve semanas por nacimiento o adopción; y veintidós días hábiles de vacaciones. El Acuerdo municipal los desarrolla y mejora: días por exceso de jornada y por antigüedad, vacaciones partidas en hasta cuatro periodos con diez días entre el 15 de junio y el 15 de septiembre, permiso retribuido desde la semana 37 de embarazo, seis semanas de mejora de maternidad y bolsas de horas para conciliar.",
    enlaces_boe: [
      { url: TREBEP, titulo: "Real Decreto Legislativo 5/2015, texto refundido del Estatuto Básico del Empleado Público (BOE-A-2015-11719), arts. 48 a 51" },
      { url: BOPZ_ACUERDO, titulo: "Acuerdo sobre condiciones de trabajo del personal funcionario del Ayuntamiento de Zaragoza (BOPZ núm. 134, de 13-06-2024)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "Permisos de los funcionarios en el TREBEP", articulos: "art. 48 TREBEP", url: `${TREBEP}#a48` },
      { seccion: S2, titulo: "Permisos por conciliación, violencia de género o sexual y terrorismo", articulos: "art. 49 TREBEP", url: `${TREBEP}#a49` },
      { seccion: S3, titulo: "Vacaciones", articulos: "art. 50 TREBEP; art. 16 del Acuerdo", url: `${TREBEP}#a50` },
      { seccion: S4, titulo: "Permisos, licencias y reducciones de jornada en el Acuerdo municipal", articulos: "arts. 14, 17, 18, 19 y 20 del Acuerdo", url: BOPZ_ACUERDO },
    ],
  },
  vinculo: { oposicion: ADMIN_AYTO.oposicion, bloqueId: ADMIN_AYTO.bloqueParte1, numero: 4 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Accidente o enfermedad graves, hospitalización o intervención con reposo de cónyuge, pareja o familiar de 1.er grado o conviviente (art. 48.a)", "Cinco días hábiles; si es familiar de segundo grado, cuatro días hábiles"],
        ["Fallecimiento (art. 48.a)", "Cónyuge, pareja o familiar de 1.er grado: tres días hábiles en la misma localidad y cinco en distinta; 2.º grado: dos y cuatro días hábiles"],
        ["Traslado de domicilio sin cambio de residencia (art. 48.b)", "Un día"],
        ["Exámenes (art. 48.d)", "Para exámenes finales y demás pruebas definitivas de aptitud, los días de su celebración"],
        ["Lactancia (art. 48.f)", "Una hora diaria de ausencia (divisible en dos) por hijo menor de 12 meses, sustituible por reducción de media hora al inicio y al final o una hora; acumulable en jornadas completas; derecho individual intransferible"],
        ["Hijos prematuros u hospitalizados tras el parto (art. 48.g)", "Ausencia de hasta dos horas diarias retribuidas; además, reducción de hasta dos horas con disminución de retribuciones"],
        ["Guarda legal (art. 48.h)", "Reducción de jornada con disminución de retribuciones por cuidado directo de menor de 12 años, persona mayor que requiera especial dedicación, persona con discapacidad o familiar hasta 2.º grado que no pueda valerse"],
        ["Enfermedad muy grave de familiar de 1.er grado (art. 48.i)", "Reducción de hasta el 50 % de la jornada, retribuida, durante un mes como máximo"],
        ["Asuntos particulares y matrimonio (art. 48.k y l)", "Seis días al año por asuntos particulares; quince días por matrimonio o registro de pareja de hecho"],
        ["Donación de órganos (art. 48.m)", "Tiempo indispensable para los actos preparatorios de la donación de órganos o tejidos dentro de la jornada (desde el 3-03-2025)"],
      ],
      preguntas: [
        ["facil", "Por asuntos particulares, el TREBEP reconoce a los funcionarios:", ["Seis días al año", "Tres días al año", "Diez días al año"], "Art. 48.k) TREBEP."],
        ["media", "Por fallecimiento de un familiar de primer grado en distinta localidad, el permiso es de:", ["Cinco días hábiles", "Tres días hábiles", "Cuatro días naturales"], "Art. 48.a) TREBEP."],
        ["media", "Por hospitalización de un familiar de segundo grado de consanguinidad, el permiso es de:", ["Cuatro días hábiles", "Cinco días hábiles", "Dos días hábiles"], "Art. 48.a) TREBEP."],
        ["media", "Por matrimonio o registro de pareja de hecho, el funcionario tiene un permiso de:", ["Quince días", "Diez días", "Veinte días"], "Art. 48.l) TREBEP."],
        ["dificil", "Para atender a un familiar de primer grado con enfermedad muy grave, el funcionario puede solicitar una reducción retribuida de hasta:", ["El 50 % de la jornada durante un mes como máximo", "El 100 % de la jornada durante tres meses", "El 25 % durante una semana"], "Art. 48.i) TREBEP."],
        ["media", "El permiso por lactancia corresponde por hijo menor de:", ["Doce meses", "Nueve meses", "Dieciocho meses"], "Art. 48.f) TREBEP."],
        ["media", "Por traslado de domicilio sin cambio de residencia, el permiso es de:", ["Un día", "Dos días", "Tres días"], "Art. 48.b) TREBEP."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Permiso por nacimiento de la madre biológica (art. 49.a)", "Diecinueve semanas (treinta y dos en monoparentalidad): seis obligatorias tras el parto a jornada completa, once hasta los 12 meses y dos hasta los 8 años del menor"],
        ["Ampliaciones del permiso por nacimiento (art. 49.a)", "Prematuros u hospitalizados: tantos días como dure la hospitalización, máximo 13 semanas más; discapacidad del hijo o parto múltiple: dos semanas más (una para cada progenitor)"],
        ["Permiso por adopción, guarda o acogimiento (art. 49.b)", "Diecinueve semanas para cada adoptante, guardador o acogedor (treinta y dos en monoparentalidad); en adopción internacional, además hasta dos meses con retribuciones básicas"],
        ["Permiso del progenitor diferente de la madre biológica (art. 49.c)", "Diecinueve semanas (treinta y dos en monoparentalidad), derecho individual e intransferible"],
        ["Efectos de los permisos a), b) y c) (art. 49)", "Computan como servicio efectivo, con plenitud de derechos económicos y derecho a reincorporarse en condiciones no menos favorables"],
        ["Violencia de género o sexual (art. 49.d)", "Faltas justificadas según los servicios sociales o de salud; reducción o reordenación de jornada; retribución íntegra si reduce un tercio o menos"],
        ["Cuidado de hijo con cáncer u otra enfermedad grave (art. 49.e)", "Reducción de al menos la mitad de la jornada con retribuciones íntegras, hasta los 23 años (26 con discapacidad igual o superior al 65 %); prorrogable en gran dependencia (Ley 4/2026)"],
        ["Víctimas de terrorismo (art. 49.f)", "Reducción o reordenación de la jornada"],
        ["Permiso parental (art. 49.g)", "Hasta que el menor cumpla 8 años; no retribuido; hasta ocho semanas, continuas o discontinuas; preaviso de quince días"],
      ],
      preguntas: [
        ["facil", "Según el TREBEP vigente, el permiso por nacimiento para la madre biológica tiene una duración de:", ["Diecinueve semanas", "Dieciséis semanas", "Veinte semanas"], "Art. 49.a) TREBEP, en la redacción del RDL 9/2025."],
        ["media", "Del permiso por nacimiento, son obligatorias e ininterrumpidas inmediatamente posteriores al parto:", ["Seis semanas a jornada completa", "Cuatro semanas", "Diez semanas"], "Art. 49.a).1.º TREBEP."],
        ["media", "En caso de monoparentalidad, el permiso por nacimiento es de:", ["Treinta y dos semanas", "Veintiséis semanas", "Diecinueve semanas"], "Art. 49.a) TREBEP."],
        ["media", "El permiso parental del art. 49.g) TREBEP:", ["No es retribuido y dura como máximo ocho semanas hasta que el menor cumpla ocho años", "Es retribuido y dura un año", "Solo lo disfruta la madre"], "Art. 49.g) TREBEP."],
        ["dificil", "Las funcionarias víctimas de violencia de género que reduzcan su jornada mantienen sus retribuciones íntegras cuando la reducción sea de:", ["Un tercio o menos", "La mitad o menos", "Un cuarto o menos"], "Art. 49.d) TREBEP."],
        ["media", "La reducción de jornada por cuidado de hijo con cáncer u otra enfermedad grave es de al menos:", ["La mitad de la jornada, con retribuciones íntegras", "Una hora diaria", "El 25 % sin retribución"], "Art. 49.e) TREBEP."],
        ["media", "En caso de parto prematuro con hospitalización del neonato, el permiso se amplía como máximo en:", ["Trece semanas", "Cuatro semanas", "Seis meses"], "Art. 49.a) TREBEP."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Vacaciones en el TREBEP (art. 50.1)", "Veintidós días hábiles por año natural (o la parte proporcional); los sábados no son hábiles, salvo adaptaciones en horarios especiales"],
        ["Vacaciones e incapacidad temporal o maternidad (art. 50.2)", "Si impiden disfrutarlas en el año, se disfrutan después, siempre que no pasen más de 18 meses desde el final del año en que se originaron"],
        ["Sustitución por dinero (art. 50.3)", "No es posible, salvo conclusión de la relación de servicios por causas ajenas a la voluntad del funcionario"],
        ["Partición de las vacaciones en el Acuerdo (art. 16.3.a)", "Máximo tres particiones (cuatro periodos), de al menos cinco días consecutivos, con cinco días de trabajo entre periodos, y en general al menos diez días entre el 15 de junio y el 15 de septiembre"],
        ["Plan anual de vacaciones (art. 16.3.b)", "Se elabora en cada servicio antes del 1 de mayo, salvo peculiaridades"],
        ["Elección del turno de vacaciones sin acuerdo (art. 16.3.c.2)", "Eligen primero los más antiguos en el Ayuntamiento, luego en la unidad, y después según el orden de acceso, con sistema rotativo"],
        ["Vacaciones por antigüedad en el Acuerdo (art. 16.5)", "Con quince años de antigüedad: quince días naturales acumulados (y, tras cuatro años, un día adicional anual) o cuatro días al año durante cinco años (y luego un día anual)"],
      ],
      preguntas: [
        ["facil", "Los funcionarios públicos tienen derecho cada año natural a unas vacaciones retribuidas de:", ["Veintidós días hábiles", "Treinta días naturales", "Veinticinco días hábiles"], "Art. 50.1 TREBEP."],
        ["media", "A efectos de vacaciones, los sábados:", ["No se consideran días hábiles, salvo adaptaciones para horarios especiales", "Se consideran hábiles", "Cuentan como medio día"], "Art. 50.1 TREBEP y art. 16.2.a.2 del Acuerdo."],
        ["media", "Según el Acuerdo, cuando las vacaciones se disfrutan partidas, cada periodo debe ser de al menos:", ["Cinco días consecutivos", "Tres días", "Diez días"], "Art. 16.3.a) del Acuerdo."],
        ["media", "Según el Acuerdo, entre el 15 de junio y el 15 de septiembre deben disfrutarse, con carácter general, al menos:", ["Diez días de vacaciones", "Cinco días", "Quince días"], "Art. 16.3.a) del Acuerdo."],
        ["dificil", "Si una incapacidad temporal impide disfrutar las vacaciones en el año, pueden disfrutarse después siempre que no hayan transcurrido más de:", ["Dieciocho meses desde el final del año en que se originaron", "Seis meses", "Tres años"], "Art. 50.2 TREBEP y art. 16.2.b.2 del Acuerdo."],
        ["media", "El plan anual de vacaciones de cada servicio se elabora, con carácter general, antes del:", ["1 de mayo", "1 de enero", "15 de junio"], "Art. 16.3.b) del Acuerdo."],
        ["media", "Las vacaciones por antigüedad del Acuerdo se generan al cumplir en el Ayuntamiento:", ["Quince años", "Diez años", "Veinticinco años"], "Art. 16.5 del Acuerdo."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Días por exceso de jornada (art. 14.1 del Acuerdo)", "Los que resulten del cómputo anual; mismo régimen que los asuntos particulares; hasta cuatro pueden partirse en dos periodos de 3,5 horas"],
        ["Días adicionales por antigüedad (art. 14.2)", "Dos días al cumplir el sexto trienio y uno más por cada trienio a partir del octavo"],
        ["Disfrute de estos días (art. 14.3)", "Parte de ausencia en la intranet validado por la jefatura con 48 horas; presencia del 50 % del personal; hasta el 15 de febrero del año siguiente; máximo seis días entre el 20 de diciembre y el 31 de enero"],
        ["Límite anual de permisos (art. 17.f.1 y 2)", "Los permisos del art. 17 y los de las letras j) a o) del art. 18 no exceden de 16 días al año, excluidos fallecimiento, enfermedad grave, hospitalización, accidente, permiso solidario, matrimonio, asuntos particulares, comisión de servicios, fecundación asistida y exámenes prenatales"],
        ["Mejoras municipales de conciliación (art. 18)", "Permiso retribuido desde la semana 37 de embarazo (35 si es múltiple); mejora de maternidad de hasta 6 semanas más; lactancia acumulable en hasta 30 días naturales; acompañamiento al médico; tutorías escolares (2 horas, 2 veces al año)"],
        ["Bolsas de horas por conciliación (art. 18.p y q)", "No recuperable: hasta 14 horas al año; recuperable: hasta el 5 % de la jornada anual (70 horas), a recuperar en tres meses"],
        ["Licencias (art. 19)", "Sin sueldo (máximo tres meses cada dos años); por estudios; por enfermedad y accidente, con complemento hasta el 100 % de las retribuciones fijas desde el primer día de incapacidad temporal"],
        ["Reducciones de jornada (art. 20)", "Con merma: guarda legal de menor de 12 años, cuidado de mayores o personas con discapacidad, cinco años antes de la jubilación forzosa, interés particular (9 a 14 h); sin merma: enfermedad muy grave de familiar de 1.er grado (50 % un mes o 100 % quince días), hijo con cáncer y recuperación tras tratamiento grave (hasta el 25 %)"],
        ["Discrepancia: permiso por nacimiento en el Acuerdo", "El art. 18 del Acuerdo (2024) habla de 16 semanas «en las condiciones del TREBEP»; el TREBEP vigente fija 19 semanas desde el RDL 9/2025"],
      ],
      preguntas: [
        ["media", "Según el Acuerdo municipal, los días adicionales por antigüedad son:", ["Dos días al cumplir el sexto trienio y uno más por cada trienio a partir del octavo", "Un día por cada trienio desde el primero", "Cinco días al cumplir 25 años"], "Art. 14.2 del Acuerdo."],
        ["media", "Las empleadas municipales tienen un permiso retribuido antes del parto a partir de:", ["El primer día de la semana 37 de embarazo (35 si es gestación múltiple)", "La semana 30", "El séptimo mes"], "Art. 18.a) del Acuerdo."],
        ["media", "La mejora de maternidad del Acuerdo municipal tiene una duración de hasta:", ["Seis semanas más ininterrumpidas", "Dos semanas", "Tres meses"], "Art. 18.f) del Acuerdo."],
        ["dificil", "Con carácter general, para autorizar días por exceso de jornada o adicionales por antigüedad debe estar presente:", ["El 50 % del personal de la unidad", "El 75 % del personal", "Al menos una persona"], "Art. 14.3.d) del Acuerdo."],
        ["media", "La licencia sin sueldo tiene una duración máxima de:", ["Tres meses cada dos años", "Seis meses cada año", "Un año cada cinco años"], "Art. 19.2.a) del Acuerdo."],
        ["media", "La bolsa de horas recuperable por conciliación es de hasta:", ["El 5 % de la jornada anual, es decir, 70 horas", "14 horas", "100 horas"], "Art. 18.q) del Acuerdo."],
        ["dificil", "Sobre la duración del permiso por nacimiento, el Acuerdo municipal de 2024 y el TREBEP vigente:", ["No coinciden: el Acuerdo dice 16 semanas en las condiciones del TREBEP y este fija hoy 19", "Coinciden en 16 semanas", "Coinciden en 19 semanas"], "Art. 18.b) del Acuerdo y art. 49.a) TREBEP (RDL 9/2025)."],
      ],
    },
  ],
  glosario: [
    [S1, "Día hábil (permiso por fallecimiento)", "Para contar los días del permiso por fallecimiento en jornada normalizada no computan sábados, domingos ni días inhábiles (art. 17.2.a.1.3.5 del Acuerdo)."],
    [S1, "Grado de parentesco", "Distancia familiar: primer grado (padres, hijos, suegros); segundo grado (abuelos, nietos, hermanos, cuñados)."],
    [S2, "Monoparentalidad", "Situación de existir una única persona progenitora; amplía los permisos por nacimiento y adopción a treinta y dos semanas (art. 49 TREBEP)."],
    [S2, "Permiso parental", "Permiso no retribuido de hasta ocho semanas para el cuidado de hijos hasta que cumplan ocho años (art. 49.g TREBEP)."],
    [S3, "Vacaciones por antigüedad", "Días de vacaciones adicionales que el Acuerdo reconoce al cumplir quince años de antigüedad (art. 16.5)."],
    [S4, "Días por exceso de jornada", "Días de descanso que resultan cada año de trabajar más horas de las de la jornada anual (art. 14.1 del Acuerdo)."],
    [S4, "Mejora de maternidad", "Ampliación municipal de hasta seis semanas sobre el permiso legal por nacimiento, adopción o acogimiento (art. 18.f del Acuerdo)."],
    [S4, "Bolsa de horas", "Crédito de horas para conciliar; la no recuperable es de hasta 14 horas y la recuperable de hasta 70 horas anuales (art. 18.p y q)."],
  ],
  casos: [
    {
      slug: "adm-ayto-permisos-padre-hospital",
      titulo: "Un padre hospitalizado y después fallecido",
      supuesto: "Raúl, administrativo con jornada normalizada, tiene a su padre hospitalizado en Zaragoza por una enfermedad grave. Pide el permiso correspondiente un lunes. El jueves su padre fallece en el hospital, a las 11:00, cuando Raúl ya había empezado a trabajar porque había vuelto un rato a la oficina.",
      preguntas: [
        [S1, "media", "Por la hospitalización de su padre (primer grado), le corresponden:", ["Cinco días hábiles", "Cuatro días hábiles", "Tres días hábiles"], "Art. 48.a) TREBEP y art. 17.2.a.2.1 del Acuerdo."],
        [S1, "media", "Por el fallecimiento de su padre en la misma localidad le corresponden:", ["Tres días hábiles", "Cinco días hábiles", "Dos días hábiles"], "Art. 48.a) TREBEP y art. 17.2.a.1.1 del Acuerdo."],
        [S4, "dificil", "Según el Acuerdo, el fallecimiento durante el permiso por hospitalización del mismo familiar:", ["Pone fin a ese permiso y empieza el de fallecimiento el primer día hábil siguiente", "No afecta al permiso en curso", "Suma ambos permisos sin más"], "Art. 17.2.a.1.3.1 del Acuerdo."],
        [S4, "media", "Como el fallecimiento se produjo una vez iniciada su jornada, el permiso se computa:", ["A partir del día siguiente", "Desde ese mismo día", "Desde el lunes siguiente"], "Art. 17.2.a.1.3.2 del Acuerdo."],
        [S4, "media", "En jornada normalizada, para contar esos días no computan:", ["Sábados, domingos ni días inhábiles", "Solo los domingos", "Ningún día"], "Art. 17.2.a.1.3.5 del Acuerdo."],
        [S4, "media", "Para acreditar el fallecimiento sirve, entre otros:", ["El certificado médico de defunción o la justificación de la funeraria", "Una declaración verbal", "Una publicación en redes sociales"], "Art. 17.2.a.1.3.3 del Acuerdo."],
        [S4, "media", "El permiso por fallecimiento puede fraccionarse en días dentro de:", ["Seis meses desde el hecho causante", "Un mes", "Un año"], "Art. 17.2.a.1.3.4 del Acuerdo."],
        [S4, "media", "¿Cuenta este permiso para el límite anual de 16 días de permisos del Acuerdo?", ["No, está excluido de ese límite", "Sí", "Solo la mitad"], "Art. 17.f.2 del Acuerdo."],
        [S1, "media", "Si el padre hubiera necesitado cuidados por una enfermedad muy grave, Raúl podría además pedir una reducción retribuida de:", ["Hasta el 50 % de la jornada durante un mes", "El 100 % durante tres meses", "Una hora al día durante un año"], "Art. 48.i) TREBEP y art. 20.2.b.1 del Acuerdo."],
        [S4, "dificil", "En el Ayuntamiento, esa reducción sin merma retributiva por enfermedad muy grave puede ser también:", ["Del 100 % durante quince días", "Del 100 % durante dos meses", "Del 25 % durante un año"], "Art. 20.2.b.1.1 del Acuerdo."],
      ],
    },
    {
      slug: "adm-ayto-permisos-nacimiento",
      titulo: "El nacimiento de una hija",
      supuesto: "Marta y Jorge, ambos funcionarios del Ayuntamiento de Zaragoza, esperan su primera hija para diciembre. Marta está en la semana 36 de embarazo. Quieren saber cuántas semanas de permiso tendrá cada uno, cómo pueden repartirlas y qué mejoras añade el Acuerdo municipal.",
      preguntas: [
        [S4, "media", "Marta tendrá un permiso retribuido antes del parto a partir de:", ["El primer día de la semana 37", "La semana 30", "El día del parto"], "Art. 18.a.1 del Acuerdo."],
        [S2, "facil", "Según el TREBEP vigente, el permiso por nacimiento de Marta será de:", ["Diecinueve semanas", "Dieciséis semanas", "Doce semanas"], "Art. 49.a) TREBEP."],
        [S2, "media", "El permiso de Jorge, como progenitor diferente de la madre biológica, será de:", ["Diecinueve semanas", "Dieciséis semanas", "Diez semanas"], "Art. 49.c) TREBEP."],
        [S2, "media", "En el permiso de cada uno, las seis primeras semanas son:", ["Obligatorias, ininterrumpidas y a jornada completa", "Voluntarias", "Transferibles al otro"], "Art. 49.a).1.º y c).1.º TREBEP."],
        [S2, "media", "¿Puede Jorge ceder a Marta parte de su permiso de 19 semanas?", ["No, es un derecho individual intransferible", "Sí, hasta diez semanas", "Sí, entero"], "Art. 49.c) TREBEP."],
        [S2, "dificil", "De las diecinueve semanas, dos pueden disfrutarse:", ["Hasta que la hija cumpla ocho años", "Solo antes del parto", "Solo el primer mes"], "Art. 49.a).3.º TREBEP."],
        [S4, "media", "Además, el Acuerdo municipal reconoce una mejora de maternidad de hasta:", ["Seis semanas más", "Dos semanas más", "Un mes más"], "Art. 18.f) del Acuerdo."],
        [S4, "media", "Esa mejora de maternidad puede:", ["Disfrutarla la madre o cederla en todo o en parte al otro progenitor si también es empleado municipal", "Disfrutarla solo el padre", "Cobrarse en dinero"], "Art. 18.f.4 del Acuerdo."],
        [S1, "media", "Tras el permiso, la lactancia acumulada en jornadas completas, según el Acuerdo, será como máximo de:", ["Treinta días naturales y consecutivos", "Quince días", "Dos meses"], "Art. 18.g.3 del Acuerdo."],
        [S2, "media", "Además, hasta que la hija cumpla ocho años, cada uno podrá pedir un permiso parental no retribuido de hasta:", ["Ocho semanas", "Cuatro semanas", "Un año"], "Art. 49.g) TREBEP."],
      ],
    },
    {
      slug: "adm-ayto-vacaciones-verano",
      titulo: "El reparto de las vacaciones de verano",
      supuesto: "En una unidad administrativa de seis personas, tres quieren las vacaciones en la segunda quincena de agosto. No se ponen de acuerdo. Una de ellas, con 16 años de antigüedad, quiere además partir sus vacaciones en cinco periodos. Otra causa baja por incapacidad temporal en mitad de sus vacaciones.",
      preguntas: [
        [S3, "facil", "Cada funcionario tiene derecho a unas vacaciones de:", ["Veintidós días hábiles", "Treinta días naturales", "Un mes"], "Art. 50.1 TREBEP."],
        [S3, "media", "Si no hay acuerdo, elige primero:", ["Quien tenga más antigüedad en el Ayuntamiento", "Quien lo pidió antes", "Quien tenga hijos"], "Art. 16.3.c.2 del Acuerdo."],
        [S3, "media", "El sistema de elección de turno, para años sucesivos, es:", ["Rotativo", "Siempre el mismo", "Por sorteo"], "Art. 16.3.c.2 del Acuerdo."],
        [S3, "media", "¿Puede partir sus vacaciones en cinco periodos?", ["No, como máximo cuatro periodos (tres particiones)", "Sí", "Sí, con autorización verbal"], "Art. 16.3.a) del Acuerdo."],
        [S3, "media", "Entre periodo y periodo de vacaciones deberá prestar servicio efectivo al menos:", ["Cinco días", "Un día", "Diez días"], "Art. 16.3.a) del Acuerdo."],
        [S3, "media", "Con 16 años de antigüedad, puede optar a las vacaciones por antigüedad del Acuerdo, por ejemplo:", ["Quince días naturales acumulados en un mismo año", "Treinta días hábiles más cada año", "Un mes sin sueldo"], "Art. 16.5.a.1 del Acuerdo."],
        [S3, "dificil", "La incapacidad temporal sobrevenida durante las vacaciones:", ["Interrumpe las vacaciones, que se disfrutarán tras el alta", "No afecta a las vacaciones", "Hace perder los días restantes"], "Art. 16.2.b.2 del Acuerdo y art. 50.2 TREBEP."],
        [S3, "media", "Las vacaciones no disfrutadas por esa incapacidad podrán disfrutarse siempre que no pasen más de:", ["Dieciocho meses desde el final del año en que se originaron", "Tres meses", "Cinco años"], "Art. 50.2 TREBEP."],
        [S3, "media", "Con carácter general, a las vacaciones se pueden acumular:", ["La licencia por matrimonio, los días por exceso de jornada, asuntos particulares y antigüedad", "Cualquier permiso", "Ningún permiso"], "Art. 16.3.c.3 del Acuerdo."],
        [S3, "media", "Las vacaciones anuales retribuidas, como regla:", ["No pueden sustituirse por una cuantía económica", "Pueden cobrarse si no se disfrutan", "Se pierden si no se piden en enero"], "Art. 50.3 TREBEP."],
      ],
    },
  ],
});
