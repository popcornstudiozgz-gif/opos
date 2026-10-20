/**
 * Crea tema-332 — Tema 37 de Bombero/a Conductor/a: "Reglamento de la
 * Agrupación de Voluntarios de Protección Civil del Servicio contra
 * Incendios, de Salvamento y Protección Civil del Ayuntamiento de Zaragoza."
 *
 * Fuente: texto consolidado del Reglamento en la sede electrónica del
 * Ayuntamiento de Zaragoza (normativa/252), leído íntegro: aprobación
 * definitiva por el Pleno de 30-09-2005 (BOPZ núm. 251, de 02-11-2005), con
 * modificaciones de 2005 (BOPZ núm. 275), 2011 (Pleno 05-05-2011, BOPZ núm.
 * 108, de 16-05-2011) y 2016 (Pleno 23-12-2015, BOPZ núm. 58, de
 * 12-03-2016, art. 8.1.3).
 *
 * Norma derogada señalada: el art. 5 y el art. 11.e) remiten a la Ley
 * 30/2002 de Protección Civil de Aragón, hoy sustituida por la Ley 4/2024,
 * de 28 de junio (BOE-A-2024-15350, verificada en esta sesión); el art. 5
 * cita además leyes estatales de 1985 y 1996 también sustituidas. Se dice
 * expresamente en la sección de disposiciones generales.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-332-reglamento-voluntarios-proteccion-civil.mjs
 */
import { sembrarTema, BOMBERO } from "./lib/sembrar-tema.mjs";

const REG = "https://www.zaragoza.es/sede/servicio/normativa/252";
const S1 = "voluntarios-disposiciones-generales";
const S2 = "incorporacion-cese";
const S3 = "derechos-deberes-voluntarios";
const S4 = "organizacion-movilizacion-formacion";
const S5 = "recompensas-sanciones-funciones";

await sembrarTema({
  tema: {
    slug: "tema-332",
    titulo: "Reglamento de la Agrupación de Voluntarios de Protección Civil de Zaragoza",
    descripcion: "Ámbito, finalidad y régimen jurídico de la Agrupación; requisitos de incorporación (18-65 años, empadronamiento, curso), periodo provisional de un año, baja temporal y cese; gratuidad, vestuario, seguros, deberes (mínimo de dos servicios al mes), incompatibilidades y prohibiciones; dependencia del Servicio contra Incendios, responsables operativos, turnos semanales y disponibilidad en emergencia; formación; recompensas, faltas y sanciones; funciones del voluntario (primera intervención, socorrismo, evacuación, apoyo a Policía Local).",
    contenido: "Explica cómo funciona la Agrupación de Voluntarios de Protección Civil que depende de los bomberos de Zaragoza: quién puede entrar y cómo, qué derechos y obligaciones tienen los voluntarios, quién los dirige (el inspector jefe del Servicio es el jefe de la Agrupación), cómo se organizan los turnos y qué faltas y sanciones existen. La ley aragonesa que cita el Reglamento (Ley 30/2002) está derogada: hoy rige la Ley 4/2024.",
    enlaces_boe: [
      { url: REG, titulo: "Ayuntamiento de Zaragoza — Reglamento de la Agrupación de Voluntarios de Protección Civil (texto consolidado)" },
      { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2024-15350", titulo: "Ley 4/2024 del Sistema de Protección Civil y Gestión de Emergencias de Aragón (BOE-A-2024-15350), vigente en lugar de la Ley 30/2002" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "Disposiciones generales", articulos: "arts. 1-5", url: REG },
      { seccion: S2, titulo: "Incorporación y cese", articulos: "arts. 6-11", url: REG },
      { seccion: S3, titulo: "Derechos y deberes de los voluntarios", articulos: "arts. 12-19", url: REG },
      { seccion: S4, titulo: "Organización, movilización y formación", articulos: "arts. 20-30", url: REG },
      { seccion: S5, titulo: "Recompensas, sanciones y funciones del voluntario", articulos: "arts. 31-35 y anexos 1-3", url: REG },
    ],
  },
  vinculo: { oposicion: BOMBERO.oposicion, bloqueId: BOMBERO.bloqueParteII, numero: 37 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["¿Qué regula el Reglamento?", "La organización, funciones y actividad de la Agrupación de Voluntarios de Protección Civil de Zaragoza y los derechos, deberes, incorporación, separación, formación y régimen disciplinario de sus voluntarios"],
        ["¿Qué es la Agrupación? (art. 3)", "Una organización creada por el Ayuntamiento al servicio de los ciudadanos en las misiones de protección civil, que no puede desviarse de sus fines; su nombre y símbolos no pueden usarlos otras asociaciones"],
        ["Finalidad de la Agrupación (art. 4)", "Colaborar de forma colegiada y subordinada en las misiones de la protección civil municipal y favorecer la participación ciudadana libre, altruista y solidaria"],
        ["Cuándo se aprobó y publicó el Reglamento", "Pleno de 30 de septiembre de 2005; BOPZ núm. 251, de 2 de noviembre de 2005; modificado en 2005, 2011 y 2016"],
        ["Ley autonómica que cita y cuál está vigente", "Cita la Ley 30/2002 de Protección Civil de Aragón, derogada; hoy rige la Ley 4/2024, de 28 de junio"],
      ],
      preguntas: [
        ["facil", "¿Quién creó la Agrupación de Voluntarios de Protección Civil de Zaragoza?", ["El Ayuntamiento de Zaragoza", "El Gobierno de Aragón", "Cruz Roja"], "Art. 3."],
        ["media", "¿Pueden otras asociaciones usar el nombre y los símbolos de la Agrupación?", ["No", "Sí", "Solo con permiso verbal"], "Art. 3."],
        ["media", "¿Cómo colabora la Agrupación en las misiones de protección civil?", ["De forma colegiada y subordinada", "De forma independiente", "Solo dando consejos"], "Art. 4."],
        ["dificil", "¿En qué BOPZ se publicó la aprobación definitiva?", ["Núm. 251, de 2 de noviembre de 2005", "Núm. 58, de 12 de marzo de 2016", "Núm. 108, de 16 de mayo de 2011"], "Ficha de la norma."],
        ["media", "¿Qué norma aragonesa de protección civil está vigente hoy?", ["La Ley 4/2024", "La Ley 30/2002", "La Ley 2/1985"], "La Ley 30/2002 citada en el art. 5 fue sustituida."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Naturaleza de la relación (art. 7)", "No es laboral ni administrativa, sino de colaboración voluntaria, gratuita y altruista"],
        ["Requisitos de incorporación (art. 8)", "Nacionalidad española o UE, empadronamiento y residencia en Zaragoza, 18 a 65 años, disponibilidad, superar el curso de selección y formación y no pertenecer a otra organización de voluntarios de emergencias"],
        ["Periodo provisional", "Un año desde el nombramiento tras superar el curso; después, incorporación estable"],
        ["Baja temporal (art. 10)", "Suspensión por causa justificada, nunca superior a dos años sumando todas las bajas temporales en cinco años"],
        ["Causas de cese definitivo (art. 11)", "Petición escrita, fallecimiento, incapacidad acreditada, incumplimiento sobrevenido de requisitos o sanción"],
        ["¿Quién acuerda el cese?", "La Alcaldía-Presidencia, con expediente y audiencia salvo en caso de petición propia o fallecimiento"],
      ],
      preguntas: [
        ["facil", "¿Qué edad hay que tener para incorporarse?", ["Entre 18 y 65 años", "Entre 16 y 70 años", "Más de 25 años"], "Art. 8."],
        ["media", "¿Cuánto dura el periodo provisional del nuevo voluntario?", ["Un año", "Un mes", "Cinco años"], "Art. 8."],
        ["media", "¿Cuánto pueden sumar como máximo las bajas temporales en cinco años?", ["Dos años", "Seis meses", "Cinco años"], "Art. 10."],
        ["media", "¿Es laboral la relación del voluntario con el Ayuntamiento?", ["No, es de colaboración voluntaria", "Sí", "Es funcionarial"], "Art. 7."],
        ["dificil", "¿Quién aprueba la baja temporal?", ["La Alcaldía o el concejal delegado del Servicio, a propuesta del jefe de la Agrupación", "El propio voluntario", "Un compañero"], "Art. 10."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["¿Cobran los voluntarios? (art. 12)", "No: la pertenencia es gratuita y honorífica, salvo las indemnizaciones por accidente"],
        ["Seguros de los voluntarios (art. 16)", "Seguro de accidentes (disminución física, invalidez, fallecimiento y asistencia médico-farmacéutica) y de responsabilidad civil por los daños que causen"],
        ["Uso del uniforme y equipo (art. 14)", "Pueden usarlo en los actos públicos a que se les requiera y es obligatorio en intervenciones especiales, siniestros o calamidades"],
        ["Servicios mínimos del voluntario (art. 17)", "Un mínimo de dos servicios mensuales, sin contar cursos ni las fiestas, alertas y emergencias, que son servicios extraordinarios"],
        ["Otros deberes (art. 17)", "Incorporarse con la mayor brevedad si es convocado, avisar de riesgos, identificarse con el carné, cuidar el material y guardar confidencialidad"],
        ["Prohibiciones (art. 19)", "Solo puede actuar en riesgo, emergencia, calamidad, catástrofe o servicios programados por el Servicio, y nunca con fines personales, religiosos, ideológicos, políticos o sindicales"],
      ],
      preguntas: [
        ["facil", "¿Cuántos servicios mensuales mínimos debe cubrir un voluntario?", ["Dos", "Diez", "Ninguno"], "Art. 17."],
        ["media", "¿Cuentan las fiestas de la ciudad para ese mínimo?", ["No, son servicios extraordinarios", "Sí", "Solo el pregón"], "Art. 17."],
        ["media", "¿Es compatible ser voluntario con pertenecer a otra organización de voluntarios de emergencias?", ["No", "Sí", "Solo los fines de semana"], "Art. 18."],
        ["media", "¿A quién eleva el voluntario sus peticiones y reclamaciones?", ["Al alcalde o concejal delegado a través de los mandos", "Directamente a la prensa", "A nadie"], "Art. 15."],
        ["dificil", "¿Quién paga los daños al material por mal trato del voluntario?", ["El propio voluntario, a su cargo", "El Ayuntamiento siempre", "El seguro de vida"], "Art. 17."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Dependencia de la Agrupación (art. 20)", "Orgánica y funcionalmente del Servicio contra Incendios, de Salvamento y Protección Civil y de su Jefatura; políticamente, del concejal delegado"],
        ["Responsables operativos (art. 22)", "El inspector jefe del Servicio como jefe de la Agrupación, el subinspector como subjefe, los técnicos como coordinadores y los voluntarios responsables de cada evento"],
        ["¿Pueden los voluntarios hacer servicios no autorizados? (art. 25)", "No; solo en situaciones inesperadas de protección civil, identificándose y bajo el mando del responsable si lo hay"],
        ["Turnos (art. 27)", "Turnos semanales para los servicios preventivos, con el otro turno de retén; el calendario lo fijan los técnicos de Protección Civil"],
        ["Disponibilidad en emergencia (art. 28)", "Obligatoria y plena para las emergencias del Plan de emergencia municipal"],
        ["Niveles de formación (art. 29)", "Básico, perfeccionamiento, reciclaje, especialidades y capacitación para los niveles de mando"],
      ],
      preguntas: [
        ["facil", "¿Quién es el jefe de la Agrupación?", ["El inspector jefe del Servicio contra Incendios", "El alcalde", "El voluntario más antiguo"], "Art. 22."],
        ["media", "¿Qué pasa con el uniforme al darse de baja?", ["Se devuelve todo el vestuario y equipo", "Se queda en propiedad", "Se vende"], "Art. 24."],
        ["media", "¿Cómo se cubren los servicios preventivos en normalidad?", ["Con turnos semanales y otro turno de retén", "Por sorteo diario", "Solo en emergencias"], "Art. 27."],
        ["media", "¿Quién organiza cada semana los servicios preventivos?", ["Los técnicos de Protección Civil del Servicio", "Los propios voluntarios", "La Policía Local"], "Art. 21."],
        ["dificil", "¿Son vinculantes las sugerencias de cursos de los voluntarios?", ["No", "Sí", "Solo las del jefe de grupo"], "Art. 30."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["Recompensas (art. 32)", "Reconocimiento público mediante felicitación de Alcaldía o del teniente de alcalde delegado, diploma al mérito y, en casos especiales, otras condecoraciones"],
        ["Algunas faltas muy graves (art. 33)", "Incumplir sin causa el servicio, dos faltas graves, condena por delito doloso, agresión a un miembro, no cumplir una suspensión, vulnerar el art. 19, faltar cinco veces a servicios preventivos o no acudir en emergencia"],
        ["Faltas graves", "Usar el material fuera del servicio, deteriorarlo o perderlo por negligencia, faltar tres veces sin causa y acumular tres leves en un año"],
        ["Faltas leves", "Descuido del material, desobediencia sin maltrato ni afectación al servicio, usar insignias fuera del servicio y otras no calificadas"],
        ["Sanciones (art. 34)", "Leves: apercibimiento o suspensión hasta un mes. Graves: suspensión de uno a seis meses. Muy graves: cese en la Agrupación"],
        ["Funciones del voluntario (anexo 1)", "Primera intervención en incendios, socorrismo, alarma y evacuación y apoyo a la Policía Local (tráfico, accesos, acordonamiento)"],
      ],
      preguntas: [
        ["facil", "¿Qué sanción corresponde a una falta muy grave?", ["El cese en la Agrupación", "Un apercibimiento", "Una multa"], "Art. 34."],
        ["media", "No acudir a un servicio requerido en emergencia es una falta…", ["Muy grave", "Leve", "Grave"], "Art. 33.1.h)."],
        ["media", "¿Cuántas faltas a servicios preventivos sin causa son falta muy grave?", ["Cinco", "Una", "Veinte"], "Art. 33.1.g)."],
        ["media", "¿Quién instruye los expedientes sancionadores?", ["El inspector jefe del Servicio", "El voluntario afectado", "La Policía"], "Art. 35.3."],
        ["dificil", "En una evacuación, ¿qué no permite el voluntario?", ["Recoger objetos personales, volver a zonas evacuadas ni usar ascensores", "Usar las escaleras", "Ayudar a heridos"], "Anexo 1."],
        ["media", "¿Quién sanciona las faltas leves según el anexo 3?", ["El jefe de la Agrupación, con audiencia y resolución motivada", "El alcalde siempre", "Nadie"], "Anexo 3."],
      ],
    },
  ],
  glosario: [
    [S1, "Agrupación de Voluntarios de Protección Civil", "Organización municipal de ciudadanos que colaboran de forma altruista en las misiones de protección civil."],
    [S2, "Baja temporal", "Suspensión de la actividad del voluntario por tiempo limitado y causa justificada."],
    [S3, "Servicio extraordinario", "Servicio en fiestas de la ciudad, alertas o emergencias, que no cuenta para el mínimo mensual."],
    [S4, "Turno de retén", "Turno que queda disponible para reforzar al turno de servicio de esa semana."],
    [S4, "Responsable del evento", "Voluntario designado para cada servicio que responde de las órdenes recibidas."],
    [S5, "Apercibimiento", "Sanción leve consistente en una advertencia formal."],
  ],
  casos: [
    {
      slug: "caso-nuevo-voluntario-solicitud",
      titulo: "Un vecino quiere ser voluntario",
      supuesto: "Un vecino de 63 años, empadronado en Zaragoza y miembro de otra asociación de voluntarios de emergencias, quiere ingresar en la Agrupación.",
      preguntas: [
        [S2, "facil", "¿Cumple el requisito de edad?", ["Sí, está entre 18 y 65 años", "No", "Solo con permiso del alcalde"], "Art. 8."],
        [S3, "media", "¿Qué problema plantea su pertenencia a otra asociación de emergencias?", ["Es incompatible: debería dejarla", "Ninguno", "Le da puntos extra"], "Arts. 8 y 18."],
        [S2, "media", "¿Qué debe superar para incorporarse?", ["Un curso de formación y selección municipal", "Un examen de conducir", "Nada"], "Art. 8."],
        [S2, "media", "¿Qué declaraciones acompañan la solicitud?", ["De no estar inhabilitado y de conocer y aceptar el Reglamento", "De bienes", "Ninguna"], "Art. 9."],
        [S2, "media", "Tras el curso, ¿cómo queda incorporado?", ["Con carácter provisional durante un año", "Definitivamente", "Como funcionario"], "Art. 8."],
        [S3, "media", "¿Cobrará por sus servicios?", ["No, es gratuito y honorífico", "Sí, por horas", "Solo en fiestas"], "Art. 12."],
        [S3, "media", "¿Qué seguros le cubrirán?", ["Accidentes y responsabilidad civil", "Ninguno", "Solo vida"], "Art. 16."],
        [S4, "media", "¿De qué Servicio dependerá?", ["Del Servicio contra Incendios, de Salvamento y Protección Civil", "De Policía Local", "De Cultura"], "Art. 20."],
        [S2, "dificil", "Al cumplir 66 años, ¿qué ocurriría según el art. 11?", ["Podría cesar por incumplimiento sobrevenido de un requisito", "Nada", "Pasaría a jefe"], "Art. 11.d)."],
        [S4, "media", "¿Qué formación inicial recibirá?", ["Curso de selección y formación básica", "Ninguna", "Un máster"], "Art. 30."],
      ],
    },
    {
      slug: "caso-voluntario-faltas-servicios",
      titulo: "Un voluntario que no acude",
      supuesto: "Un voluntario ha faltado sin justificación a tres servicios preventivos este año y no acudió cuando se le convocó durante una emergencia por inundaciones. Además usó el chaleco de la Agrupación en una fiesta privada.",
      preguntas: [
        [S5, "facil", "No acudir en emergencia es una falta…", ["Muy grave", "Leve", "No es falta"], "Art. 33.1.h)."],
        [S5, "media", "Faltar tres veces sin causa a servicios requeridos es una falta…", ["Grave", "Leve", "Muy grave"], "Art. 33.2.c)."],
        [S5, "media", "Usar insignias o distintivos fuera del servicio es una falta…", ["Leve", "Muy grave", "Grave"], "Art. 33.3.d)."],
        [S5, "media", "¿Qué sanción corresponde a la falta muy grave?", ["Cese en la Agrupación", "Apercibimiento", "Suspensión de una semana"], "Art. 34.1.c)."],
        [S5, "media", "¿Qué se requiere para imponer la sanción?", ["Expediente con audiencia del interesado", "Nada", "Una votación de compañeros"], "Art. 35.1."],
        [S5, "media", "¿Quién inicia y resuelve el procedimiento?", ["La Alcaldía-Presidencia, sin perjuicio de delegación", "El voluntario", "Cruz Roja"], "Art. 35.3."],
        [S4, "media", "¿Qué disponibilidad se exige en emergencias del Plan municipal?", ["Plena y obligatoria", "Voluntaria", "Ninguna"], "Art. 28."],
        [S5, "dificil", "¿Es compatible la sanción del Reglamento con otras administrativas o penales?", ["Sí", "No", "Solo con las penales"], "Art. 34.3."],
        [S3, "media", "¿Qué deber incumplió al no acudir convocado?", ["Incorporarse con la mayor brevedad a su lugar de concentración", "Guardar confidencialidad", "Identificarse"], "Art. 17."],
        [S5, "media", "¿Qué suspensión corresponde a una falta grave?", ["De uno a seis meses", "De un día", "De cinco años"], "Art. 34.1.b)."],
      ],
    },
    {
      slug: "caso-evacuacion-concierto-voluntarios",
      titulo: "Evacuación en un concierto",
      supuesto: "Durante un concierto en un pabellón con voluntarios de servicio, se declara un pequeño incendio en un almacén y el responsable ordena preparar la evacuación.",
      preguntas: [
        [S5, "facil", "¿Qué hace primero el voluntario que descubre el fuego?", ["Avisar inmediatamente al responsable de la Agrupación en el evento", "Grabarlo", "Irse"], "Anexo 1."],
        [S5, "media", "¿Con qué medios puede atacarlo?", ["Extintores y BIE si las hay", "Agua de botellas únicamente", "No puede actuar"], "Anexo 1."],
        [S5, "media", "Al llegar los bomberos, ¿qué hace?", ["Les informa, cede la extinción y colabora si se le pide", "Sigue al mando", "Se marcha"], "Anexo 1."],
        [S5, "media", "¿Qué revisa el equipo de evacuación antes del evento?", ["Que las vías estén expeditas y las puertas listas para abrirse", "Las taquillas", "El sonido"], "Anexo 1."],
        [S5, "media", "Durante la evacuación, ¿se permite usar ascensores?", ["No", "Sí", "Solo a mayores"], "Anexo 1."],
        [S5, "media", "¿Qué hace al terminar la evacuación?", ["Comprobar que no quedan rezagados y dirigirse al punto de reunión", "Volver a la sala", "Irse a casa"], "Anexo 1."],
        [S4, "media", "¿Quién designa al voluntario responsable de cada servicio?", ["El jefe de la Unidad de Coordinación de la Agrupación", "El público", "El cantante"], "Art. 23."],
        [S3, "dificil", "¿Puede el voluntario actuar en este concierto con fines publicitarios propios?", ["No, está prohibido usar la Agrupación para fines personales", "Sí", "Solo si es benéfico"], "Art. 19."],
        [S5, "media", "¿Bajo qué órdenes actúa excepcionalmente el voluntario?", ["De mandos de otros servicios, previa confirmación del jefe de la Agrupación", "De cualquier espectador", "De nadie"], "Anexo 1."],
        [S3, "media", "¿Es obligatorio llevar el uniforme en un siniestro?", ["Sí, por protección e identificación", "No", "Solo de noche"], "Art. 14."],
      ],
    },
  ],
});
