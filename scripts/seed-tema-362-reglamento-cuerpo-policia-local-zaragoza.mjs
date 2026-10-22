/**
 * Crea tema-362 — Tema 35 de Policía Local: "Reglamento del Cuerpo de la
 * Policía Local."
 *
 * Fuente: Reglamento del Cuerpo de la Policía Local de Zaragoza (aprobación
 * definitiva del Ayuntamiento Pleno de 26-01-1995, BOPZ núm. 67 de
 * 22-03-1995), texto vigente publicado en la sede electrónica municipal
 * (zaragoza.es/sede/servicio/normativa/115, ELI es-ar-01502973/reg/1995/
 * 03/22/(1)), descargado y leído íntegro en la sesión (arts. 1 a 183 y
 * disposiciones transitorias y derogatoria). La sede lo rotula «Texto
 * Vigente» sin listar modificaciones. Su art. 171 remite, para el régimen
 * disciplinario, a la Sección 4.ª del Capítulo IV del Título II de la LO
 * 2/1986, cuyos arts. 27 y 28 figuran hoy derogados en el texto consolidado
 * de esa ley; se reproduce la remisión tal como está, señalándolo. Su art.
 * 127 remite a la Ley 26/1994 de segunda actividad; se cita sin desarrollar.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-362-reglamento-cuerpo-policia-local-zaragoza.mjs
 */
import { sembrarTema, POLICIA } from "./lib/sembrar-tema.mjs";

const URL = "https://www.zaragoza.es/sede/servicio/normativa/115";
const S1 = "naturaleza-principios-estructura";
const S2 = "uniformidad-equipo-armas";
const S3 = "seleccion-formacion-academia";
const S4 = "funcionamiento-destinos-horarios-uso-armas";
const S5 = "derechos-deberes-premios-disciplina";

await sembrarTema({
  tema: {
    slug: "tema-362",
    titulo: "Reglamento del Cuerpo de la Policía Local de Zaragoza",
    descripcion: "Objeto, naturaleza y funciones del Cuerpo; principios básicos de actuación; jefatura del Alcalde y mando del Superintendente; estructura, conducto reglamentario, plantilla y condición de agente de la autoridad; funciones del Superintendente y Junta de Mandos; expediente personal; uniformidad, emblemas y distintivos; equipo personal, licencia A y armamento; vehículos y transmisiones; selección, promoción interna y Academia; normas de funcionamiento (saludo, comunicaciones); destinos y movilidad; horarios y turnos; normativa sobre uso de armas; bajas y segunda actividad; derechos y deberes; premios, medallas y régimen disciplinario.",
    contenido: "Recorre el Reglamento del Cuerpo de la Policía Local de Zaragoza (1995): quién manda el Cuerpo (el Alcalde y, de forma inmediata, el Superintendente), cuándo se tiene la condición de agente de la autoridad, cómo se viste y equipa al agente, cómo se usa el arma de fuego (requerimientos, disparo intimidatorio, disparos a partes no vitales), cómo se asignan destinos y turnos, qué funciones tiene la Academia, qué derechos y deberes tienen los policías, qué medallas existen y cómo son las faltas y sanciones disciplinarias.",
    enlaces_boe: [{ url: URL, titulo: "Reglamento del Cuerpo de la Policía Local de Zaragoza (Pleno 26-01-1995, BOPZ núm. 67 de 22-03-1995)" }],
    indice_estudio: [
      { seccion: S1, titulo: "Títulos I y II: disposiciones generales, estructura, plantilla, funciones y expediente", articulos: "arts. 1-23", url: URL },
      { seccion: S2, titulo: "Título III: uniformidad, equipo personal, armamento, vehículos e instalaciones", articulos: "arts. 24-64", url: URL },
      { seccion: S3, titulo: "Título IV: selección, formación, promoción y Academia del Cuerpo", articulos: "arts. 65-87", url: URL },
      { seccion: S4, titulo: "Título V, Caps. I-VI: funcionamiento interno, destinos, horarios, uso de armas, bajas y segunda actividad", articulos: "arts. 88-127", url: URL },
      { seccion: S5, titulo: "Título V, Caps. VII-VIII y Título VI: derechos, deberes, premios y régimen disciplinario", articulos: "arts. 128-183", url: URL },
    ],
  },
  vinculo: { oposicion: POLICIA.oposicion, bloqueId: POLICIA.bloqueParte2, numero: 35 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Naturaleza (art. 2)", "Cuerpo de seguridad, armado, de naturaleza civil, con estructura y organización jerarquizada, bajo la superior autoridad del Alcalde"],
        ["Misión (art. 3)", "Desempeñar las funciones propias de las Policías Locales y mantener la seguridad pública y proteger el libre ejercicio de derechos y libertades en el término municipal"],
        ["Códigos internacionales vinculantes (art. 4)", "El Código de Conducta de la ONU para funcionarios encargados de hacer cumplir la ley (17-12-1979) y la Resolución 690/79 del Consejo de Europa"],
        ["Jefatura y mando (art. 6)", "Cuerpo único; jefatura superior del Alcalde (delegable en un miembro de la Corporación); mando inmediato del Superintendente, funcionario de mayor graduación"],
        ["Ausencia del Superintendente (art. 6)", "Asume sus funciones automáticamente el mando de la categoría inmediata inferior de mayor antigüedad"],
        ["Conducto reglamentario (art. 8)", "La jerarquía obliga a transmitir órdenes, informes y solicitudes por conducto reglamentario; las órdenes trascendentes o complejas, por escrito salvo urgencia"],
        ["Agentes de la autoridad (arts. 10-11)", "Son funcionarios de carrera con carácter de agentes de la autoridad: de servicio y uniformados (o de paisano autorizados) y también fuera de servicio cuando intervienen para evitar delitos o detener a sus autores"],
        ["Identificación (art. 11)", "Sin uniforme, exhibiendo el carné profesional; de uniforme y si se le requiere, dando su número"],
        ["Funciones del Superintendente (art. 17)", "Proponer medidas organizativas, dirigir e inspeccionar los servicios, mandar al personal, acudir a la Junta Local de Seguridad, proponer expedientes y recompensas, memoria anual, presupuestos, planes de formación y relaciones con jueces y fiscales"],
        ["Junta de Mandos (arts. 18-20)", "Concejal Delegado, Superintendente, Intendentes Principales e Intendentes; la convoca el Concejal, se reúne mensualmente y es consultiva y de coordinación"],
      ],
      preguntas: [
        ["facil", "El Cuerpo de Policía Local de Zaragoza está bajo la superior autoridad de…", ["El Alcalde", "El Delegado del Gobierno", "El Superintendente"], "Art. 2."],
        ["media", "¿Quién ejerce el mando inmediato de la Policía Local de Zaragoza?", ["El Superintendente", "El Concejal Delegado", "El Intendente más antiguo"], "Art. 6."],
        ["media", "En ausencia del Superintendente, asume sus funciones…", ["El mando de la categoría inmediata inferior de mayor antigüedad", "El Alcalde", "El policía más joven"], "Art. 6."],
        ["media", "¿Tiene el policía local fuera de servicio el carácter de agente de la autoridad si interviene para evitar un delito?", ["Sí", "No", "Solo si va uniformado"], "Art. 11."],
        ["media", "¿Con qué periodicidad ordinaria se reúne la Junta de Mandos?", ["Mensualmente", "Semanalmente", "Anualmente"], "Art. 19."],
        ["dificil", "¿Quién convoca la Junta de Mandos?", ["El Concejal Delegado", "El Superintendente", "El Alcalde"], "Art. 19."],
        ["media", "Las órdenes que por su trascendencia lo requieran deben cursarse…", ["Por escrito, salvo urgencia con ratificación posterior", "Siempre verbalmente", "Por radio"], "Art. 8."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Uso del uniforme (art. 26)", "Obligatorio durante el servicio y prohibido su uso incompleto; de paisano solo si se está autorizado, y entonces sin ninguna prenda de uniforme"],
        ["Fuera de servicio (art. 27)", "Prohibido usar prendas de uniformidad fuera del horario de servicio o de los actos autorizados por el Alcalde o Delegado"],
        ["Servicio de paisano (art. 29)", "Lo propone el Superintendente al Alcalde o Delegado para obtener, si procede, la autorización del Delegado del Gobierno"],
        ["Uniformidad de gala (art. 32)", "Se usa el 12 de octubre y el 29 de enero (salvo servicios nocturnos) y en actos protocolarios designados"],
        ["Placa de pecho (art. 36)", "Con el escudo del municipio, la leyenda «Policía Local» y el empleo, sobre el bolsillo derecho"],
        ["Emblema de brazo (art. 37)", "Con el escudo de la Comunidad Autónoma, en la parte superior de la manga izquierda"],
        ["Equipo personal (art. 43)", "Silbato, defensa, grilletes, pistola o revólver y equipo reflectante"],
        ["Licencia A (art. 45)", "La tarjeta de identidad profesional se considera licencia de tipo A mientras se esté en activo"],
        ["Depósito del arma (art. 46)", "Al dejar el servicio activo, por enfermedad o defecto que anule la licencia, por suspensión preventiva o decisión disciplinaria y en otros supuestos legales"],
        ["Prácticas de tiro (art. 53)", "Obligatorias al menos dos veces al año, en horario de servicio"],
        ["Al finalizar el servicio (art. 48)", "Como norma general, el arma se deja en el armero asignado, salvo autorización expresa de la Jefatura"],
      ],
      preguntas: [
        ["media", "¿Qué días se usa la uniformidad de gala según el Reglamento?", ["El 12 de octubre y el 29 de enero", "El 1 de mayo y el 23 de abril", "Solo en Navidad"], "Art. 32."],
        ["media", "El emblema de brazo contiene el escudo de…", ["La Comunidad Autónoma", "El municipio", "España"], "Art. 37."],
        ["media", "¿Cuántas prácticas de tiro obligatorias al año como mínimo establece el Reglamento?", ["Dos", "Una", "Cuatro"], "Art. 53."],
        ["facil", "¿Forman parte del equipo personal los grilletes?", ["Sí", "No", "Solo para mandos"], "Art. 43."],
        ["media", "Vistiendo de paisano autorizado, ¿pueden llevarse prendas del uniforme?", ["No, está prohibido", "Sí, la gorra", "Sí, el chaleco"], "Art. 26."],
        ["dificil", "¿Quién autoriza, si procede, la prestación del servicio de paisano a propuesta del Alcalde o Delegado?", ["El Delegado del Gobierno", "El Superintendente", "El Juez de guardia"], "Art. 29."],
        ["media", "La tarjeta de identidad profesional de los policías locales en activo se considera…", ["Licencia de tipo A", "Licencia de tipo B", "Tarjeta de armas"], "Art. 45."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Selección (arts. 65-67)", "Convocatoria pública conforme a mérito y capacidad; el ingreso como Policía es por oposición"],
        ["Promoción a Oficial, Subinspector e Inspector (art. 72)", "Promoción interna por concurso-oposición, con dos años de antigüedad en el empleo inferior"],
        ["Promoción a Intendente e Intendente Principal (art. 73)", "Concurso-oposición, con dos años en el empleo de Inspector o Intendente, respectivamente, y la titulación exigida"],
        ["Sistemas subsidiarios (art. 74)", "Si no se cubren, convocatoria entre policías locales de Aragón de la misma categoría, después de la inferior y, en último término, acceso libre"],
        ["La Academia (art. 76)", "Unidad de la Policía Local bajo dependencia directa del Superintendente, para la enseñanza, perfeccionamiento y especialización"],
        ["Cursos de la Academia (art. 78)", "Obligatorios para el acceso o la promoción, de especialidades, de actualización y los derivados de pactos o convenios"],
        ["Expediente académico (art. 80)", "Con datos personales, asistencia, aprovechamiento y faltas; acceden el Superintendente, el Coordinador, el Director y el interesado"],
        ["Comisión Asesora de Enseñanza (arts. 86-87)", "Presidida por el Concejal Delegado y con el Superintendente como vicepresidente; se reúne trimestralmente"],
      ],
      preguntas: [
        ["media", "El ingreso como Policía en el Cuerpo se realiza por el sistema de…", ["Oposición", "Concurso", "Libre designación"], "Art. 67."],
        ["media", "Para optar a Oficial por promoción interna se exige una antigüedad mínima como Policía de…", ["Dos años", "Cinco años", "Un año"], "Art. 72.a)."],
        ["media", "¿De quién depende directamente la Academia del Cuerpo?", ["Del Superintendente", "Del Consejero de Interior de Aragón", "Del Juez decano"], "Art. 76."],
        ["dificil", "¿Quién preside la Comisión Asesora de Enseñanza?", ["El Concejal Delegado de la Policía Local", "El Director de la Academia", "El Alcalde"], "Art. 86."],
        ["media", "¿Con qué periodicidad ordinaria se reúne la Comisión Asesora de Enseñanza?", ["Una vez por trimestre", "Mensualmente", "Anualmente"], "Art. 87."],
        ["media", "Si no se cubren las vacantes por promoción interna, se convoca en primer lugar entre…", ["Policías locales de Aragón de la misma categoría", "Militares", "Cualquier ciudadano"], "Art. 74."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Saludo (arts. 90-91)", "Manifestación de respeto a la Constitución, a los superiores y a los ciudadanos; lo inicia el de inferior categoría orgánica y lo corresponde el superior"],
        ["Comunicaciones por radio (art. 94)", "Siempre breves, claras, concisas e impersonales"],
        ["Grupos de destinos (art. 98)", "1: libre designación; 2: especialidades; 3: destinos generales"],
        ["Provisión (arts. 99-101)", "Libre designación por el Concejal a propuesta del Superintendente; especialidades por convocatoria; generales por rigurosa antigüedad; a falta de voluntarios, forzosos por orden inverso de antigüedad"],
        ["Permanencia mínima (art. 106)", "Dos años en destinos voluntarios y un año en forzosos"],
        ["Emergencias (art. 117)", "Todo el personal debe prestar servicio permanente mientras duren, pudiendo suprimirse fiestas, vacaciones y descansos"],
        ["Arma en la funda (art. 122)", "Durante el servicio se lleva en la funda reglamentaria y no se hace alarde de ella, ni con fines intimidatorios, salvo daño grave, inmediato e irreparable"],
        ["Tras usar el arma (art. 123)", "Informar de inmediato al mando superior y a la Jefatura, y reflejarlo en el parte"],
        ["Requisitos del uso del arma (art. 124)", "Agresión ilegítima que atente contra la vida o ponga en grave peligro la integridad; único medio racional; requerimiento previo si es posible; disparo al aire o al suelo; y, si no basta, disparos mínimos a partes no vitales"],
        ["Delincuente en fuga (art. 124)", "Solo si la gravedad del delito y la peligrosidad lo justifican, previo «alto»; disparo a partes no vitales solo ante delincuentes armados; con dudas, ningún disparo"],
        ["Normas de manipulación (art. 125)", "No dejar el arma al alcance de otros, dedo fuera del guardamonte, nunca apuntar a personas salvo para disparar, y asegurar que el disparo intimidatorio no dañe a terceros"],
        ["Segunda actividad (art. 127)", "Conforme a la Ley 26/1994, con las equiparaciones que establezca el Ayuntamiento"],
      ],
      preguntas: [
        ["media", "¿Quién inicia el saludo entre miembros del Cuerpo?", ["El de inferior categoría orgánica", "El superior", "El de mayor edad"], "Art. 91."],
        ["media", "Las vacantes de destinos generales (grupo 3) se proveen por…", ["Rigurosa antigüedad", "Libre designación", "Sorteo"], "Art. 101."],
        ["media", "Tras obtener un destino voluntario, la permanencia mínima antes de pedir otro es de…", ["Dos años", "Un año", "Seis meses"], "Art. 106."],
        ["media", "Uno de los requisitos para usar el arma de fuego es que constituya…", ["El único medio racional para impedir o repeler la agresión", "El medio más rápido", "Una orden del superior"], "Art. 124.b)."],
        ["dificil", "Si los requerimientos no son atendidos, el Reglamento prevé antes de disparar al agresor…", ["Un disparo al aire o al suelo, en este orden, con carácter disuasorio", "Disparar directamente a las piernas", "Retirarse siempre"], "Art. 124.d)."],
        ["media", "Si existen dudas sobre la gravedad del delito o la identidad del presunto delincuente en fuga…", ["No procede efectuar ningún disparo", "Se dispara al aire", "Se dispara a las piernas"], "Art. 124, último párrafo."],
        ["media", "Las comunicaciones por radio deben ser…", ["Breves, claras, concisas e impersonales", "Detalladas y extensas", "Informales"], "Art. 94."],
        ["media", "Después de usar el arma de fuego, el agente debe…", ["Informar de inmediato a su mando y a la Jefatura y hacerlo constar en el parte", "No decir nada", "Informar solo al juez"], "Art. 123."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["Defensa jurídica (art. 132)", "Si un agente es inculpado penalmente por actos del servicio, el Ayuntamiento asume su defensa con abogado y procurador de libre elección, presta las fianzas y paga costas e indemnizaciones"],
        ["Afiliación (art. 134)", "Pueden afiliarse a partidos, sindicatos y asociaciones sin discriminación y sin que conste en su expediente"],
        ["Seguro (art. 138)", "El Ayuntamiento concierta una póliza de vida, accidente e invalidez"],
        ["Obediencia (art. 141)", "Obedecer las órdenes de los mandos salvo que contradigan manifiestamente la Constitución o las leyes, dando entonces cuenta al superior de quien la dio"],
        ["Deberes de conducta (arts. 144-151)", "Trato correcto, prudencia sin prejuicios, informes fieles, formalidades de detención y registro, puntualidad sin abandonar el servicio sin relevo, no permanecer en bares de servicio salvo motivo, postura correcta y no fumar con ostentación"],
        ["Estados excepcionales (art. 153)", "Presentarse inmediatamente en su dependencia al declararse los estados de alarma, excepción o sitio, o en calamidad o grave alteración de la seguridad"],
        ["Distinciones (art. 157)", "Felicitación personal (pública o privada), premio en metálico y Medalla de Servicios"],
        ["Medalla al mérito profesional (art. 163)", "Oro por servicios destacados con riesgo o especial relevancia (con premio del 10 %); plata a los 25 años de servicio sin faltas graves o muy graves"],
        ["Medalla al sacrificio en el cumplimiento del deber (art. 164)", "Por lesiones importantes en acto de servicio no debidas a imprudencia propia; oro si causan fallecimiento, pérdida de un miembro principal o incapacidad permanente"],
        ["Concesión de medallas (art. 166)", "Acuerdo del Pleno a propuesta del Alcalde; se imponen preferentemente el día de la Patrona del Cuerpo, Nuestra Señora del Portillo"],
        ["Prescripción de faltas (art. 173)", "Leves: un mes; graves: dos años; muy graves: seis años"],
        ["Algunas faltas muy graves (art. 174)", "Infidelidad a la Constitución, delito doloso, abuso y tratos inhumanos a custodiados, insubordinación, no auxiliar con urgencia, abandono del servicio, violar el secreto, huelga, tres faltas graves en un año, embriagarse o drogarse en servicio"],
        ["Sanciones (art. 177)", "Apercibimiento y deducción de retribuciones (leves); deducción y suspensión de funciones (graves); suspensión y separación del servicio (muy graves)"],
        ["Órgano sancionador (art. 181)", "El Alcalde-Presidente; el procedimiento se inicia siempre de oficio por acuerdo del Alcalde"],
        ["Remisión del art. 171", "El régimen disciplinario remite a la LOFCS (Sección 4.ª del Cap. IV del Título II, hoy derogada), a la normativa autonómica, a este Reglamento y, subsidiariamente, a la función pública local"],
      ],
      preguntas: [
        ["media", "Si un policía local es inculpado penalmente por un acto de servicio, el Ayuntamiento…", ["Asume su defensa jurídica, fianzas, costas e indemnizaciones", "No interviene", "Lo suspende siempre"], "Art. 132."],
        ["media", "La Medalla al mérito profesional en su modalidad plata se concede con…", ["25 años de servicio sin faltas graves ni muy graves anotadas", "10 años de servicio", "Cualquier felicitación"], "Art. 163."],
        ["media", "Las faltas graves prescriben, según el Reglamento, a los…", ["Dos años", "Seis meses", "Seis años"], "Art. 173."],
        ["media", "Embriagarse durante el servicio es una falta…", ["Muy grave", "Leve", "Grave"], "Art. 174.l)."],
        ["media", "¿Qué sanciones pueden imponerse por faltas leves?", ["Apercibimiento y deducción proporcional de retribuciones", "Suspensión de funciones", "Separación del servicio"], "Art. 177."],
        ["dificil", "¿Quién es competente para imponer sanciones disciplinarias?", ["El Alcalde-Presidente", "El Superintendente", "La Junta de Mandos"], "Art. 181."],
        ["media", "¿Quién es la Patrona del Cuerpo según el Reglamento?", ["Nuestra Señora del Portillo", "La Virgen del Pilar", "Santa Engracia"], "Art. 166."],
        ["dificil", "Quien encubre una falta y no la comunica por escrito a su superior incurre en…", ["Falta de inferior grado", "La misma falta", "Ninguna falta"], "Art. 176."],
      ],
    },
  ],
  glosario: [
    [S1, "Superintendente", "Funcionario de mayor graduación que ejerce el mando inmediato del Cuerpo."],
    [S1, "Conducto reglamentario", "Vía jerárquica para transmitir órdenes, informes y solicitudes."],
    [S1, "Junta de Mandos", "Órgano consultivo y de coordinación formado por el Concejal, el Superintendente y los Intendentes."],
    [S2, "Uniformidad de gala", "Uniforme de actos solemnes, usado el 12 de octubre y el 29 de enero."],
    [S3, "Academia del Cuerpo", "Unidad formativa de la Policía Local dependiente del Superintendente."],
    [S4, "Disparo intimidatorio", "Disparo al aire o al suelo con carácter disuasorio, previo al uso del arma contra el agresor (art. 124)."],
    [S4, "Destino de libre designación", "Puesto de especial confianza designado por el Concejal a propuesta del Superintendente."],
    [S5, "Medalla al sacrificio en el cumplimiento del deber", "Distinción por lesiones importantes sufridas en acto de servicio."],
    [S5, "Separación del servicio", "Sanción por falta muy grave que extingue la relación funcionarial."],
  ],
  casos: [
    {
      slug: "caso-agresor-armado-cuchillo-calle",
      titulo: "Un agresor armado con un cuchillo",
      supuesto: "Una patrulla acude a una pelea en la calle Delicias. Un hombre amenaza con un cuchillo a una mujer y avanza hacia ella. Los agentes le requieren a voces que suelte el arma; no obedece y se lanza contra uno de los policías.",
      preguntas: [
        [S4, "media", "Antes de usar el arma, si es posible, el Reglamento exige…", ["Requerimientos al agresor para que desista", "Esperar a un superior", "Llamar al juez"], "Art. 124.c)."],
        [S4, "media", "Si no atiende los requerimientos, la siguiente medida prevista es…", ["Un disparo al aire o al suelo con carácter disuasorio", "Disparar a la cabeza", "Retirarse"], "Art. 124.d)."],
        [S4, "media", "Si las medidas previas no son posibles por la rapidez y violencia de la agresión, los disparos deben ser…", ["Los mínimos indispensables y dirigidos a partes no vitales", "Varios para asegurar", "Al aire únicamente"], "Art. 124.e)."],
        [S4, "media", "Uno de los requisitos es la existencia de…", ["Una agresión ilegítima que atente contra la vida o ponga en grave peligro la integridad", "Un insulto", "Una desobediencia leve"], "Art. 124.a)."],
        [S4, "media", "En el disparo intimidatorio debe asegurarse…", ["Que no se causen daños a terceras personas", "Que se oiga lejos", "Nada"], "Art. 125."],
        [S4, "media", "Tras usar el arma, el agente debe…", ["Informar de inmediato al mando y a la Jefatura y reflejarlo en el parte", "Esperar al día siguiente", "Informar solo a la prensa"], "Art. 123."],
        [S1, "media", "El uso del arma debe ajustarse a los principios de…", ["Proporcionalidad, congruencia y oportunidad", "Rapidez y eficacia", "Jerarquía"], "Arts. 4 y 124."],
        [S5, "media", "Si el agente fuera inculpado penalmente por esta actuación, el Ayuntamiento…", ["Asumiría su defensa jurídica", "Lo dejaría solo", "Lo cesaría"], "Art. 132."],
        [S5, "dificil", "Si el agente resultara gravemente herido con incapacidad permanente, podría concedérsele…", ["La Medalla al sacrificio en el cumplimiento del deber, categoría oro", "La Medalla al mérito profesional plata", "Una felicitación privada solamente"], "Art. 164."],
        [S2, "media", "Durante el servicio, el arma se lleva…", ["En la funda reglamentaria, sin extraerla salvo circunstancias excepcionales", "En la mano", "En el vehículo"], "Art. 122."],
      ],
    },
    {
      slug: "caso-agente-bar-servicio-uniforme",
      titulo: "Un agente en un bar durante el servicio",
      supuesto: "Un vecino denuncia que ha visto a dos agentes uniformados tomando cerveza en un bar durante su turno, y que uno de ellos se marchó a casa antes de que llegara el relevo. Además, otro agente usa la cazadora del uniforme los fines de semana fuera de servicio.",
      preguntas: [
        [S5, "media", "Durante el servicio, salvo motivo justificado, los agentes…", ["No permanecerán en establecimientos de bebidas y se abstendrán de beber alcohol", "Pueden tomar una cerveza", "Pueden jugar a las cartas"], "Art. 149."],
        [S5, "media", "Embriagarse durante el servicio sería una falta…", ["Muy grave", "Leve", "No es falta"], "Art. 174.l)."],
        [S5, "media", "Marcharse sin esperar al relevo vulnera el deber de…", ["Cumplir íntegramente la jornada sin abandonar el servicio sin entrega o relevo", "Saludar", "Llevar la gorra"], "Art. 147."],
        [S5, "media", "El abandono del servicio es una falta…", ["Muy grave", "Grave", "Leve"], "Art. 174.f)."],
        [S2, "media", "Usar la cazadora del uniforme fuera de servicio sin autorización…", ["Está prohibido", "Está permitido", "Solo en invierno"], "Art. 27."],
        [S5, "dificil", "¿Quién inicia el procedimiento disciplinario?", ["El Alcalde, siempre de oficio", "El vecino denunciante", "El Superintendente por sí solo"], "Art. 182."],
        [S5, "media", "Las faltas muy graves pueden sancionarse con…", ["Suspensión de funciones o separación del servicio", "Solo apercibimiento", "Deducción de haberes"], "Art. 177."],
        [S5, "media", "El jefe que tolera la falta…", ["Incurre en la misma responsabilidad que los autores", "No responde", "Recibe una felicitación"], "Art. 176."],
        [S5, "media", "Las sanciones se anotan…", ["En los expedientes personales con indicación de la falta", "En el BOE", "En ningún sitio"], "Art. 179."],
        [S5, "dificil", "Las faltas muy graves prescriben a los…", ["Seis años", "Dos años", "Un mes"], "Art. 173."],
      ],
    },
    {
      slug: "caso-provision-destino-unidad-trafico",
      titulo: "La provisión de destinos en una unidad",
      supuesto: "La Jefatura convoca plazas en la Unidad de Atestados (especialidad) y en la unidad de distrito (destinos generales). Para la de Atestados no hay suficientes voluntarios. Un agente que obtuvo destino voluntario hace un año quiere cambiarse, y otro pide cambio por un problema físico que le impide su tarea.",
      preguntas: [
        [S4, "media", "Las plazas de especialidades (grupo 2) se proveen…", ["Entre solicitantes conforme a las condiciones de la convocatoria", "Por libre designación", "Por sorteo"], "Art. 100."],
        [S4, "media", "Si no hay suficientes voluntarios para la especialidad, se cubren…", ["Con carácter forzoso por orden inverso de antigüedad entre quienes reúnan los requisitos", "Con personal ajeno", "Se dejan vacantes"], "Art. 100."],
        [S4, "media", "Los destinos generales se proveen por…", ["Rigurosa antigüedad", "Libre designación", "Mérito exclusivamente"], "Art. 101."],
        [S4, "media", "Las vacantes de los grupos 2 y 3 deben convocarse con un plazo mínimo de…", ["Diez días", "Un mes", "Dos días"], "Art. 102."],
        [S4, "media", "El agente con destino voluntario desde hace un año…", ["No puede pedir nuevo destino hasta los dos años, salvo segunda convocatoria o causas previstas", "Puede cambiar cuando quiera", "Debe esperar cinco años"], "Art. 106."],
        [S4, "media", "Al margen de convocatoria, ¿puede pedirse cambio por problemas físicos justificados que impidan la tarea?", ["Sí, ante la Jefatura", "No", "Solo al juez"], "Art. 107."],
        [S4, "dificil", "¿Genera la adjudicación de un destino derecho de inamovilidad?", ["No, en ningún caso", "Sí", "Solo los de libre designación"], "Art. 108."],
        [S4, "media", "¿Quién designa los destinos de libre designación?", ["El Concejal Delegado a propuesta del Superintendente", "La Junta de Personal", "El propio agente"], "Art. 99."],
        [S4, "media", "En caso de igualdad de antigüedad, tiene preferencia en primer lugar…", ["El tiempo servido en la Policía Local de Zaragoza", "El más joven", "El que tenga más hijos"], "Art. 105."],
        [S1, "media", "¿Quién designa al personal a los distintos destinos o especialidades?", ["El Superintendente del Cuerpo", "El Alcalde personalmente", "Los sindicatos"], "Art. 15."],
      ],
    },
  ],
});
