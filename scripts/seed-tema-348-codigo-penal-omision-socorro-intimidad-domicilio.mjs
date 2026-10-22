/**
 * Crea tema-348 — Tema 21 de Policía Local: "De la omisión del deber de
 * socorro (Libro II, Título IX) y Delitos contra la intimidad, el derecho a
 * la propia imagen y la inviolabilidad del domicilio (Libro II, Título X)."
 *
 * Fuente: Ley Orgánica 10/1995, del Código Penal (BOE-A-1995-25444), texto
 * consolidado del BOE leído íntegro en los arts. 195 a 204.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-348-codigo-penal-omision-socorro-intimidad-domicilio.mjs
 */
import { sembrarTema, POLICIA } from "./lib/sembrar-tema.mjs";

const CP = "https://www.boe.es/buscar/act.php?id=BOE-A-1995-25444";
const a = (ancla) => `${CP}#${ancla}`;
const S1 = "omision-deber-socorro";
const S2 = "descubrimiento-revelacion-secretos";
const S3 = "delitos-informaticos-funcionarios-secreto-profesional";
const S4 = "allanamiento-morada-domicilio";

await sembrarTema({
  tema: {
    slug: "tema-348",
    titulo: "Código Penal: omisión del deber de socorro y delitos contra la intimidad, la propia imagen y la inviolabilidad del domicilio",
    descripcion: "Omisión del deber de socorro, no demandar auxilio, omisión tras accidente fortuito o imprudente, denegación de asistencia sanitaria; descubrimiento y revelación de secretos, apoderamiento de comunicaciones, acceso a datos reservados, difusión de imágenes íntimas (sexting); acceso ilícito a sistemas de información e interceptación de datos; delitos de autoridad o funcionario; revelación de secretos profesionales y laborales; perseguibilidad y perdón; allanamiento de morada, de domicilio de personas jurídicas y de establecimientos abiertos al público; allanamiento por autoridad o funcionario.",
    contenido: "Recorre los Títulos IX y X del Libro II del Código Penal (arts. 195 a 204): cuándo es delito no socorrer a una persona en peligro (con pena mayor si quien omite causó el accidente), qué conductas vulneran la intimidad (leer mensajes ajenos, acceder a datos, difundir imágenes íntimas obtenidas con consentimiento), el acceso ilícito a sistemas informáticos, la revelación de secretos por funcionarios y profesionales, y el allanamiento de morada y de locales, también cuando lo comete un agente fuera de los casos legales.",
    enlaces_boe: [{ url: CP, titulo: "Ley Orgánica 10/1995, de 23 de noviembre, del Código Penal (BOE-A-1995-25444)" }],
    indice_estudio: [
      { seccion: S1, titulo: "De la omisión del deber de socorro", articulos: "arts. 195-196", url: a("a195") },
      { seccion: S2, titulo: "Descubrimiento y revelación de secretos", articulos: "art. 197", url: a("a197") },
      { seccion: S3, titulo: "Acceso a sistemas, funcionarios, secretos profesionales y perseguibilidad", articulos: "arts. 197 bis-201", url: a("a197bis") },
      { seccion: S4, titulo: "Allanamiento de morada, domicilio de personas jurídicas y establecimientos abiertos al público", articulos: "arts. 202-204", url: a("a202") },
    ],
  },
  vinculo: { oposicion: POLICIA.oposicion, bloqueId: POLICIA.bloqueParte2, numero: 21 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Omisión del deber de socorro (art. 195.1)", "No socorrer a una persona desamparada y en peligro manifiesto y grave, pudiendo hacerlo sin riesgo propio ni de terceros: multa de tres a doce meses"],
        ["Quien no puede socorrer (art. 195.2)", "Incurre en la misma pena si, impedido de prestar socorro, no demanda con urgencia auxilio ajeno"],
        ["Omisión tras accidente fortuito causado por el omitente (art. 195.3)", "Prisión de seis a dieciocho meses"],
        ["Omisión tras accidente imprudente causado por el omitente (art. 195.3)", "Prisión de seis meses a cuatro años"],
        ["Requisitos de la situación de la víctima", "Desamparada y en peligro manifiesto y grave"],
        ["Denegación de asistencia sanitaria (art. 196)", "El profesional obligado que deniega asistencia o abandona los servicios sanitarios con riesgo grave para la salud: penas del art. 195 en su mitad superior e inhabilitación de seis meses a tres años"],
      ],
      preguntas: [
        ["facil", "No socorrer a una persona desamparada y en peligro manifiesto y grave, pudiendo hacerlo sin riesgo, se castiga con…", ["Multa de tres a doce meses", "Prisión de seis meses a cuatro años", "No es delito"], "Art. 195.1."],
        ["media", "Quien no puede prestar socorro, ¿qué debe hacer para no cometer delito?", ["Demandar con urgencia auxilio ajeno", "Nada", "Esperar a la policía en el lugar"], "Art. 195.2."],
        ["media", "Si el accidente lo causó por imprudencia quien después omite el auxilio, la pena es…", ["Prisión de seis meses a cuatro años", "Multa de tres a doce meses", "Prisión de seis a dieciocho meses"], "Art. 195.3."],
        ["media", "Si el accidente se produjo fortuitamente por quien omite el auxilio, la pena es…", ["Prisión de seis a dieciocho meses", "Multa de tres a doce meses", "Prisión de uno a cuatro años"], "Art. 195.3."],
        ["dificil", "¿Comete omisión del deber de socorro quien no auxilia porque hacerlo supondría un riesgo para sí mismo?", ["No, el tipo exige poder hacerlo sin riesgo propio ni de terceros", "Sí, siempre", "Solo si es funcionario"], "Art. 195.1."],
        ["media", "El médico obligado que deniega asistencia con riesgo grave para la salud…", ["Sufre las penas del art. 195 en su mitad superior e inhabilitación", "Solo comete infracción administrativa", "No comete delito"], "Art. 196."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Apoderamiento e interceptación (art. 197.1)", "Para descubrir secretos o vulnerar la intimidad, sin consentimiento, apoderarse de papeles, cartas, correos u otros efectos, interceptar telecomunicaciones o usar artificios de escucha o grabación: prisión de 1 a 4 años y multa de 12 a 24 meses"],
        ["Datos reservados en ficheros (art. 197.2)", "Apoderarse, utilizar, modificar o acceder sin autorización a datos reservados personales o familiares registrados en ficheros o archivos, en perjuicio del titular o de tercero: mismas penas"],
        ["Difusión de lo descubierto (art. 197.3)", "Prisión de 2 a 5 años; quien difunde conociendo su origen ilícito sin haber participado: prisión de 1 a 3 años y multa"],
        ["Agravación por el responsable del fichero (art. 197.4)", "Prisión de 3 a 5 años si lo cometen los encargados de ficheros o mediante uso no autorizado de datos de la víctima"],
        ["Datos especialmente protegidos (art. 197.5)", "Ideología, religión, creencias, salud, origen racial o vida sexual, o víctima menor o con discapacidad: mitad superior"],
        ["Difusión de imágenes íntimas obtenidas con anuencia (art. 197.7)", "Difundirlas sin autorización si menoscaba gravemente la intimidad: prisión de 3 meses a 1 año o multa de 6 a 12 meses; quien las recibe y reenvía: multa de 1 a 3 meses"],
        ["Agravación del art. 197.7", "Mitad superior si las difunde el cónyuge o pareja (aun sin convivencia), la víctima es menor o con discapacidad, o hay finalidad lucrativa"],
      ],
      preguntas: [
        ["media", "Apoderarse de los mensajes de correo electrónico de otro para vulnerar su intimidad se castiga con prisión de…", ["Uno a cuatro años y multa de 12 a 24 meses", "Seis meses a dos años", "Tres meses a un año"], "Art. 197.1."],
        ["media", "Si se difunden los datos o imágenes descubiertos, la pena es prisión de…", ["Dos a cinco años", "Uno a tres años", "Tres a cinco años"], "Art. 197.3."],
        ["media", "Difundir sin autorización un vídeo íntimo que la víctima grabó con su anuencia en un domicilio, menoscabando gravemente su intimidad, se castiga en el…", ["Art. 197.7", "Art. 197.1", "Art. 199"], "Art. 197.7."],
        ["media", "Quien recibe esas imágenes y las reenvía sin consentimiento de la afectada…", ["Es castigado con multa de uno a tres meses", "No comete delito", "Es castigado con prisión de dos a cinco años"], "Art. 197.7, párrafo segundo."],
        ["dificil", "Si los datos afectados revelan la salud de la víctima…", ["Las penas se imponen en su mitad superior", "No hay delito", "Se rebaja la pena"], "Art. 197.5."],
        ["dificil", "Si el autor es el encargado del fichero donde estaban los datos, la pena es prisión de…", ["Tres a cinco años", "Uno a cuatro años", "Seis meses a dos años"], "Art. 197.4.a)."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Acceso ilícito a sistemas (art. 197 bis.1)", "Acceder o mantenerse sin autorización en un sistema de información vulnerando sus medidas de seguridad: prisión de seis meses a dos años"],
        ["Interceptación de datos (art. 197 bis.2)", "Interceptar transmisiones no públicas de datos informáticos con artificios técnicos: prisión de 3 meses a 2 años o multa de 3 a 12 meses"],
        ["Programas y contraseñas (art. 197 ter)", "Producir, adquirir o facilitar programas concebidos para estos delitos o contraseñas de acceso: prisión de 6 meses a 2 años o multa de 3 a 18 meses"],
        ["Organización o grupo criminal (art. 197 quater)", "Penas superiores en grado"],
        ["Autoridad o funcionario (art. 198)", "Fuera de los casos permitidos, sin causa legal por delito y prevaliéndose del cargo: penas en su mitad superior e inhabilitación absoluta de 6 a 12 años"],
        ["Revelación de secretos laborales (art. 199.1)", "Revelar secretos ajenos conocidos por razón del oficio o relación laboral: prisión de 1 a 3 años y multa de 6 a 12 meses"],
        ["Revelación por profesional (art. 199.2)", "Incumpliendo la obligación de sigilo: prisión de 1 a 4 años, multa de 12 a 24 meses e inhabilitación de 2 a 6 años"],
        ["Perseguibilidad (art. 201)", "Denuncia del agraviado o su representante; no es precisa en el art. 198, si afecta a intereses generales o a una pluralidad de personas, o si la víctima es menor o con discapacidad"],
        ["Perdón del ofendido (art. 201.3)", "Extingue la acción penal (salvo lo previsto para menores en el art. 130.1.5.º)"],
      ],
      preguntas: [
        ["media", "Acceder sin autorización a un sistema de información vulnerando sus medidas de seguridad se castiga con prisión de…", ["Seis meses a dos años", "Uno a cuatro años", "Dos a cinco años"], "Art. 197 bis.1."],
        ["media", "El funcionario que, prevaliéndose de su cargo y sin causa legal, comete los hechos del art. 197 sufre además…", ["Inhabilitación absoluta de seis a doce años", "Suspensión de un mes", "Ninguna pena adicional"], "Art. 198."],
        ["media", "Con carácter general, ¿cómo se persiguen los delitos de descubrimiento y revelación de secretos?", ["Mediante denuncia de la persona agraviada o su representante legal", "De oficio siempre", "Solo por querella del fiscal"], "Art. 201.1."],
        ["dificil", "¿Es precisa la denuncia del agraviado si el delito lo comete un funcionario del art. 198?", ["No", "Sí", "Solo si es grave"], "Art. 201.2."],
        ["media", "En estos delitos, el perdón del ofendido…", ["Extingue la acción penal", "No tiene efecto", "Solo rebaja la pena"], "Art. 201.3."],
        ["media", "El profesional que divulga secretos de otra persona incumpliendo su deber de sigilo es castigado con…", ["Prisión de uno a cuatro años, multa e inhabilitación de dos a seis años", "Multa de uno a tres meses", "No es delito"], "Art. 199.2."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Allanamiento de morada (art. 202.1)", "El particular que, sin habitar en ella, entra en morada ajena o se mantiene en ella contra la voluntad del morador: prisión de seis meses a dos años"],
        ["Allanamiento con violencia o intimidación (art. 202.2)", "Prisión de uno a cuatro años y multa de seis a doce meses"],
        ["Entrada en domicilio de persona jurídica u oficina (art. 203.1)", "Entrar contra la voluntad del titular en domicilio de persona jurídica, despacho, oficina o establecimiento abierto al público fuera de las horas de apertura: prisión de 6 meses a 1 año y multa de 6 a 10 meses"],
        ["Mantenerse fuera de horario (art. 203.2)", "Mantenerse contra la voluntad del titular fuera de las horas de apertura: multa de uno a tres meses"],
        ["Con violencia o intimidación en esos lugares (art. 203.3)", "Prisión de seis meses a tres años (aun en horario de apertura)"],
        ["Allanamiento por autoridad o funcionario (art. 204)", "Fuera de los casos permitidos por la ley y sin causa legal por delito: pena en su mitad superior e inhabilitación absoluta de 6 a 12 años"],
        ["Dos modalidades de conducta", "Entrar sin consentimiento o mantenerse contra la voluntad del morador o titular"],
      ],
      preguntas: [
        ["facil", "El particular que entra en morada ajena contra la voluntad del morador comete…", ["Allanamiento de morada", "Usurpación", "Hurto"], "Art. 202.1."],
        ["media", "El allanamiento de morada básico se castiga con prisión de…", ["Seis meses a dos años", "Uno a cuatro años", "Tres meses a un año"], "Art. 202.1."],
        ["media", "Si el allanamiento de morada se ejecuta con violencia o intimidación, la pena es…", ["Prisión de uno a cuatro años y multa de seis a doce meses", "Prisión de seis meses a dos años", "Multa de uno a tres meses"], "Art. 202.2."],
        ["media", "Entrar en una oficina contra la voluntad del titular fuera del horario de apertura se castiga con…", ["Prisión de seis meses a un año y multa de seis a diez meses", "Multa de uno a tres meses", "No es delito"], "Art. 203.1."],
        ["dificil", "Mantenerse en un local abierto al público, fuera de horario y contra la voluntad del titular, se castiga con…", ["Multa de uno a tres meses", "Prisión de seis meses a tres años", "Prisión de uno a cuatro años"], "Art. 203.2."],
        ["media", "El agente que entra en un domicilio fuera de los casos permitidos por la ley y sin causa legal por delito…", ["Sufre la pena en su mitad superior e inhabilitación absoluta de seis a doce años", "No comete delito", "Solo comete falta disciplinaria"], "Art. 204."],
      ],
    },
  ],
  glosario: [
    [S1, "Peligro manifiesto y grave", "Situación de riesgo evidente y serio para la persona, presupuesto del deber de socorro."],
    [S2, "Intimidad", "Ámbito reservado de la vida personal y familiar protegido por el art. 18 CE."],
    [S2, "Sexting no consentido", "Difusión de imágenes íntimas obtenidas con consentimiento pero sin autorización para divulgarlas (art. 197.7)."],
    [S3, "Sistema de información", "Conjunto de equipos y programas que tratan datos; su acceso no autorizado es delito del art. 197 bis."],
    [S3, "Secreto profesional", "Deber de sigilo sobre lo conocido por razón de la profesión."],
    [S4, "Morada", "Espacio en el que una persona desarrolla su vida privada; protegido frente a entradas no consentidas."],
    [S4, "Allanamiento", "Entrar o mantenerse en morada o local ajeno contra la voluntad de su titular."],
  ],
  casos: [
    {
      slug: "caso-conductor-huye-atropello",
      titulo: "Un conductor que se marcha",
      supuesto: "Un conductor que circulaba distraído con el móvil atropella a un ciclista en la Avenida de Cataluña, lo deja herido en la calzada y se marcha sin auxiliarlo. Un peatón que lo ve todo tampoco se acerca ni llama a emergencias, aunque podía hacerlo sin riesgo.",
      preguntas: [
        [S1, "media", "El conductor que causó por imprudencia el atropello y se marcha sin auxiliar es castigado con…", ["Prisión de seis meses a cuatro años", "Multa de tres a doce meses", "Prisión de seis a dieciocho meses"], "Art. 195.3."],
        [S1, "media", "El peatón que podía auxiliar sin riesgo y no lo hizo comete…", ["Omisión del deber de socorro del art. 195.1", "Nada", "Encubrimiento"], "Art. 195.1."],
        [S1, "facil", "Pena del art. 195.1…", ["Multa de tres a doce meses", "Prisión de seis meses a cuatro años", "Prisión de uno a dos años"], "Art. 195.1."],
        [S1, "media", "Si el peatón no supiera prestar primeros auxilios, debía al menos…", ["Demandar con urgencia auxilio ajeno", "Marcharse", "Esperar a que alguien pregunte"], "Art. 195.2."],
        [S1, "dificil", "Si el atropello hubiera sido fortuito, sin imprudencia del conductor, la pena por no auxiliar sería…", ["Prisión de seis a dieciocho meses", "Multa de tres a doce meses", "Ninguna"], "Art. 195.3."],
        [S1, "media", "El ciclista herido en la calzada se encuentra…", ["Desamparado y en peligro manifiesto y grave", "Fuera de peligro", "En una situación que no obliga a nadie"], "Art. 195.1."],
        [S1, "media", "Si un sanitario de guardia obligado a atenderlo lo denegara con riesgo grave para su salud…", ["Delito del art. 196", "Solo falta disciplinaria", "Nada"], "Art. 196."],
        [S1, "dificil", "¿Cometería delito quien no se acerca porque en ese momento pasaban vehículos a gran velocidad que lo ponían en riesgo?", ["No, si no podía hacerlo sin riesgo propio, aunque debería pedir auxilio", "Sí, siempre", "Solo si es médico"], "Art. 195.1 y 2."],
        [S1, "media", "La omisión del deber de socorro está en el Código Penal en el…", ["Título IX del Libro II", "Título X del Libro II", "Libro I"], "Título IX."],
        [S1, "media", "¿Exige el art. 195.1 que la víctima muera para que haya delito?", ["No, basta la situación de peligro y la omisión", "Sí", "Solo si queda incapacitada"], "Art. 195.1."],
      ],
    },
    {
      slug: "caso-video-intimo-expareja",
      titulo: "Un vídeo íntimo difundido",
      supuesto: "Una mujer denuncia que su expareja ha difundido en un grupo de mensajería un vídeo íntimo que grabaron juntos, con su consentimiento, en su casa. Varios miembros del grupo lo han reenviado a otras personas. Además, sospecha que él accedió a su cuenta de correo con una contraseña que ella nunca le dio.",
      preguntas: [
        [S2, "media", "Difundir sin autorización el vídeo obtenido con su anuencia en el domicilio, menoscabando gravemente su intimidad, es delito del…", ["Art. 197.7", "Art. 197.1", "Art. 173.4"], "Art. 197.7."],
        [S2, "media", "Por ser su expareja, la pena se impone…", ["En su mitad superior", "En su mitad inferior", "Sin cambios"], "Art. 197.7, párrafo tercero."],
        [S2, "media", "Quienes reenviaron el vídeo sin su consentimiento…", ["Pueden ser castigados con multa de uno a tres meses", "No cometen delito", "Son autores del art. 197.1"], "Art. 197.7, párrafo segundo."],
        [S3, "media", "Entrar en su cuenta de correo sin autorización vulnerando la contraseña puede ser…", ["Acceso ilícito a un sistema de información del art. 197 bis", "Nada", "Hurto"], "Art. 197 bis.1."],
        [S2, "media", "Si se apoderó de sus correos para descubrir sus secretos, el delito sería además el del…", ["Art. 197.1", "Art. 199", "Art. 203"], "Art. 197.1."],
        [S3, "media", "¿Es necesaria la denuncia de la víctima para perseguir estos hechos?", ["Sí, con carácter general", "No, nunca", "Solo para el vídeo"], "Art. 201.1."],
        [S3, "media", "Si ella le perdonara, ¿qué ocurriría con la acción penal?", ["Se extinguiría", "Continuaría igual", "Pasaría al fiscal"], "Art. 201.3."],
        [S2, "dificil", "Si la víctima fuera menor de edad, ¿haría falta su denuncia?", ["No", "Sí", "Solo la de sus padres"], "Art. 201.2."],
        [S2, "media", "Si él hubiera difundido el vídeo a cambio de dinero…", ["La pena se impondría en su mitad superior", "No cambiaría", "Sería solo infracción"], "Art. 197.7, párrafo tercero."],
        [S3, "dificil", "Si hubiera comprado un programa diseñado para espiar cuentas ajenas con esa intención, el hecho encajaría en el…", ["Art. 197 ter", "Art. 197 quater", "Art. 200"], "Art. 197 ter.a)."],
      ],
    },
    {
      slug: "caso-ocupacion-vivienda-habitada",
      titulo: "La vivienda habitada",
      supuesto: "Un vecino llama a la Policía Local porque un desconocido ha entrado en la vivienda de una anciana aprovechando que la puerta estaba abierta y se niega a salir. Días antes, otro individuo entró de madrugada en una oficina bancaria cerrada forzando una ventana.",
      preguntas: [
        [S4, "facil", "Entrar y mantenerse en la vivienda de la anciana contra su voluntad es…", ["Allanamiento de morada", "Usurpación de inmueble vacío", "Hurto"], "Art. 202.1."],
        [S4, "media", "Pena del allanamiento de morada sin violencia…", ["Prisión de seis meses a dos años", "Multa de uno a tres meses", "Prisión de uno a cuatro años"], "Art. 202.1."],
        [S4, "media", "Si hubiera empujado a la anciana para entrar…", ["Prisión de uno a cuatro años y multa de seis a doce meses", "La misma pena", "Solo una multa"], "Art. 202.2."],
        [S4, "media", "La entrada de madrugada en la oficina bancaria cerrada encaja en el…", ["Art. 203.1", "Art. 202.1", "Art. 203.2"], "Art. 203.1."],
        [S4, "media", "Pena del art. 203.1…", ["Prisión de seis meses a un año y multa de seis a diez meses", "Prisión de seis meses a tres años", "Multa de uno a tres meses"], "Art. 203.1."],
        [S4, "dificil", "Si en la oficina hubiera entrado con intimidación en horario de apertura…", ["Prisión de seis meses a tres años", "No sería delito por estar abierta", "Multa de uno a tres meses"], "Art. 203.3."],
        [S4, "media", "¿Comete allanamiento quien entra en su propia vivienda habitual?", ["No: el tipo exige morada ajena y no habitar en ella", "Sí", "Solo de noche"], "Art. 202.1."],
        [S4, "media", "Si un agente entrara en la vivienda sin autorización judicial, sin consentimiento ni flagrante delito…", ["Cometería allanamiento agravado del art. 204", "No cometería delito", "Solo falta leve"], "Art. 204."],
        [S4, "dificil", "La inhabilitación del agente en el art. 204 sería…", ["Absoluta de seis a doce años", "Especial de dos a cuatro años", "Suspensión de un año"], "Art. 204."],
        [S4, "media", "El allanamiento puede cometerse entrando o…", ["Manteniéndose contra la voluntad del morador", "Mirando por la ventana", "Llamando al timbre"], "Art. 202.1."],
      ],
    },
  ],
});
