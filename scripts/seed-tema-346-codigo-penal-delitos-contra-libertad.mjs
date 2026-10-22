/**
 * Crea tema-346 — Tema 19 de Policía Local: "Delitos contra la libertad
 * (Libro II, Título VI)."
 *
 * Fuente: Ley Orgánica 10/1995, del Código Penal (BOE-A-1995-25444), texto
 * consolidado del BOE leído íntegro en los arts. 163 a 172 quater (el art.
 * 172 quater tiene en el BOE el ancla «a1-8»).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-346-codigo-penal-delitos-contra-libertad.mjs
 */
import { sembrarTema, POLICIA } from "./lib/sembrar-tema.mjs";

const CP = "https://www.boe.es/buscar/act.php?id=BOE-A-1995-25444";
const a = (ancla) => `${CP}#${ancla}`;
const S1 = "detenciones-ilegales-secuestros";
const S2 = "amenazas";
const S3 = "coacciones";
const S4 = "matrimonio-forzado-acoso";

await sembrarTema({
  tema: {
    slug: "tema-346",
    titulo: "Código Penal: delitos contra la libertad",
    descripcion: "Detención ilegal por particular y sus atenuaciones y agravaciones; aprehensión para presentar a la autoridad; secuestro; detención ilegal sin dar razón del paradero; detención ilegal cometida por autoridad o funcionario y desaparición forzada; amenazas de un mal constitutivo de delito, condicionales y no condicionales; amenazas a colectivos; amenazas de un mal no delictivo y chantaje; amenazas leves en violencia de género y doméstica; coacciones; coacciones leves; matrimonio forzado; acoso o stalking; acoso a mujeres que acuden a interrumpir su embarazo.",
    contenido: "Recorre el Título VI del Libro II del Código Penal (arts. 163 a 172 quater): cuándo privar a alguien de libertad es detención ilegal o secuestro, la detención ilegal cometida por un agente fuera de los casos legales, los tipos de amenazas según el mal anunciado y si son condicionales, el chantaje, las coacciones y sus variantes leves en el ámbito de la pareja y familiar, el matrimonio forzado y el delito de acoso.",
    enlaces_boe: [{ url: CP, titulo: "Ley Orgánica 10/1995, de 23 de noviembre, del Código Penal (BOE-A-1995-25444)" }],
    indice_estudio: [
      { seccion: S1, titulo: "Detenciones ilegales y secuestros", articulos: "arts. 163-168", url: a("a163") },
      { seccion: S2, titulo: "Amenazas", articulos: "arts. 169-171", url: a("a169") },
      { seccion: S3, titulo: "Coacciones", articulos: "art. 172", url: a("a172") },
      { seccion: S4, titulo: "Matrimonio forzado y acoso", articulos: "arts. 172 bis-172 quater", url: a("a172bis") },
    ],
  },
  vinculo: { oposicion: POLICIA.oposicion, bloqueId: POLICIA.bloqueParte2, numero: 19 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Detención ilegal por particular (art. 163.1)", "Encerrar o detener a otro privándole de libertad: prisión de cuatro a seis años"],
        ["Liberación en los tres primeros días (art. 163.2)", "Si se da libertad dentro de los tres primeros días sin haber logrado el objeto propuesto: pena inferior en grado"],
        ["Detención de más de quince días (art. 163.3)", "Prisión de cinco a ocho años"],
        ["Aprehensión para presentar a la autoridad (art. 163.4)", "El particular que, fuera de los casos permitidos por las leyes, aprehende a una persona para presentarla inmediatamente a la autoridad: multa de tres a seis meses"],
        ["Secuestro (art. 164)", "Detener exigiendo alguna condición para liberar: prisión de seis a diez años"],
        ["Agravantes del art. 165", "Mitad superior si se simula autoridad o función pública, o la víctima es menor, persona con discapacidad necesitada de especial protección o funcionario en el ejercicio de sus funciones"],
        ["Sin dar razón del paradero (art. 166.1)", "Detención ilegal: prisión de 10 a 15 años; secuestro: de 15 a 20 años"],
        ["Detención ilegal por autoridad o funcionario (art. 167.1)", "Fuera de los casos permitidos por la ley y sin mediar causa por delito: penas en su mitad superior, pudiendo llegar a la superior en grado, e inhabilitación absoluta de ocho a doce años"],
        ["Desaparición forzada (art. 167.2.a)", "Autoridad o funcionario que acuerda, practica o prolonga una privación de libertad y no la reconoce u oculta el paradero de la persona privándola de sus derechos"],
      ],
      preguntas: [
        ["facil", "El particular que encierra o detiene a otro privándole de libertad comete…", ["Detención ilegal", "Coacciones", "Amenazas"], "Art. 163.1."],
        ["media", "¿Qué pena tiene la detención ilegal del art. 163.1?", ["Prisión de cuatro a seis años", "Prisión de seis a diez años", "Multa de tres a seis meses"], "Art. 163.1."],
        ["media", "Si el detenido es liberado dentro de los tres primeros días sin lograr el objeto propuesto…", ["Se impone la pena inferior en grado", "Queda exento el autor", "Se impone la mitad superior"], "Art. 163.2."],
        ["media", "Detener a una persona exigiendo una condición para liberarla es…", ["Secuestro", "Detención ilegal simple", "Coacción leve"], "Art. 164."],
        ["media", "El particular que, fuera de los casos permitidos por las leyes, aprehende a alguien para presentarlo inmediatamente a la autoridad es castigado con…", ["Multa de tres a seis meses", "Prisión de cuatro a seis años", "No comete delito"], "Art. 163.4."],
        ["dificil", "La detención ilegal practicada por un funcionario fuera de los casos permitidos por la ley y sin mediar causa por delito conlleva además…", ["Inhabilitación absoluta de ocho a doce años", "Suspensión de empleo de un año", "Solo multa"], "Art. 167.3."],
        ["media", "Si la víctima de una detención ilegal es un funcionario en el ejercicio de sus funciones…", ["La pena se impone en su mitad superior", "La pena se rebaja", "No hay delito"], "Art. 165."],
        ["dificil", "El reo de secuestro que no da razón del paradero de la víctima es castigado con prisión de…", ["Quince a veinte años", "Diez a quince años", "Seis a diez años"], "Art. 166.1."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Amenaza de un mal constitutivo de delito (art. 169)", "Mal que constituya homicidio, lesiones, aborto, delitos contra la libertad, torturas e integridad moral, libertad sexual, intimidad, honor, patrimonio u orden socioeconómico, al amenazado, su familia o personas íntimamente vinculadas"],
        ["Amenaza condicional (art. 169.1.º)", "Exigiendo cantidad o condición (aunque no sea ilícita): prisión de 1 a 5 años si consigue su propósito; de 6 meses a 3 años si no"],
        ["Mitad superior en la amenaza condicional", "Si se hace por escrito, teléfono, cualquier medio de comunicación o reproducción, o en nombre de grupos reales o supuestos"],
        ["Amenaza no condicional (art. 169.2.º)", "Prisión de seis meses a dos años"],
        ["Amenazas a colectivos (art. 170)", "Dirigidas a atemorizar a una población, grupo étnico, cultural, religioso o colectivo, con gravedad suficiente: pena superior en grado"],
        ["Amenaza de un mal no delictivo (art. 171.1)", "Condicional y con condición que no sea conducta debida: prisión de 3 meses a 1 año o multa de 6 a 24 meses"],
        ["Chantaje (art. 171.2)", "Exigir cantidad o recompensa bajo amenaza de revelar hechos de la vida privada: prisión de 2 a 4 años si lo consigue, de 4 meses a 2 años si no"],
        ["Amenaza leve a la pareja mujer (art. 171.4)", "Prisión de 6 meses a 1 año o TBC de 31 a 80 días y privación de armas de 1 año y 1 día a 3 años"],
        ["Amenaza leve genérica (art. 171.7)", "Multa de uno a tres meses; solo perseguible por denuncia, salvo si el ofendido es persona del art. 173.2"],
      ],
      preguntas: [
        ["media", "Amenazar con matar a alguien si no paga 3.000 euros, consiguiendo el pago, se castiga con prisión de…", ["Uno a cinco años", "Seis meses a dos años", "Tres meses a un año"], "Art. 169.1.º."],
        ["media", "La amenaza de un mal constitutivo de delito no condicional se castiga con prisión de…", ["Seis meses a dos años", "Uno a cinco años", "Dos a cuatro años"], "Art. 169.2.º."],
        ["media", "La amenaza condicional realizada por teléfono…", ["Se castiga en su mitad superior", "Se castiga con pena inferior", "No es delito"], "Art. 169.1.º, párrafo segundo."],
        ["media", "Exigir dinero bajo amenaza de difundir hechos de la vida privada no conocidos es…", ["Chantaje del art. 171.2", "Coacción", "Estafa"], "Art. 171.2."],
        ["dificil", "En el chantaje consistente en amenazar con denunciar un delito, el fiscal puede abstenerse de acusar por ese delito salvo que…", ["Esté castigado con prisión superior a dos años", "Sea un delito leve", "La víctima lo pida"], "Art. 171.3."],
        ["media", "¿Cómo se persigue la amenaza leve genérica del art. 171.7?", ["Mediante denuncia del agraviado o su representante legal", "De oficio siempre", "Por querella del fiscal"], "Art. 171.7."],
        ["media", "La amenaza leve a la expareja mujer se castiga con…", ["Prisión de seis meses a un año o TBC de 31 a 80 días", "Multa de uno a tres meses", "Nada"], "Art. 171.4."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Coacciones (art. 172.1)", "Sin estar legítimamente autorizado, impedir a otro con violencia hacer lo que la ley no prohíbe, o compelerle a efectuar lo que no quiere, sea justo o injusto: prisión de 6 meses a 3 años o multa de 12 a 24 meses"],
        ["Coacción para impedir un derecho fundamental", "Penas en su mitad superior, salvo que otro precepto prevea mayor pena"],
        ["Coacción para impedir el disfrute de la vivienda", "Penas en su mitad superior (art. 172.1, párrafo tercero)"],
        ["Coacción leve a la pareja mujer (art. 172.2)", "Prisión de 6 meses a 1 año o TBC de 31 a 80 días y privación de armas; mitad superior si hay menores, en el domicilio o quebrantando una medida"],
        ["Coacción leve genérica (art. 172.3)", "Multa de uno a tres meses; perseguible solo por denuncia, salvo si el ofendido es persona del art. 173.2"],
      ],
      preguntas: [
        ["facil", "Impedir a otro con violencia hacer lo que la ley no prohíbe es…", ["Coacción", "Amenaza", "Detención ilegal"], "Art. 172.1."],
        ["media", "¿Qué pena tiene la coacción del art. 172.1?", ["Prisión de seis meses a tres años o multa de 12 a 24 meses", "Prisión de cuatro a seis años", "Multa de uno a tres meses"], "Art. 172.1."],
        ["media", "La coacción dirigida a impedir el legítimo disfrute de la vivienda…", ["Se castiga en su mitad superior", "No es delito", "Se castiga como amenaza"], "Art. 172.1."],
        ["media", "Obligar a otro a hacer algo que no quiere, aunque sea justo, ¿puede ser coacción?", ["Sí, sea justo o injusto", "No, si es justo", "Solo si es ilícito"], "Art. 172.1."],
        ["dificil", "En una coacción leve a un hijo conviviente (persona del art. 173.2), ¿se exige denuncia?", ["No", "Sí", "Solo si es mayor de edad"], "Art. 172.3, párrafo segundo."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Matrimonio forzado (art. 172 bis.1)", "Compeler con intimidación grave o violencia a contraer matrimonio: prisión de 6 meses a 3 años y 6 meses o multa de 12 a 24 meses"],
        ["Forzar a abandonar España para casarse (art. 172 bis.2)", "Misma pena para quien use violencia, intimidación grave o engaño para forzar a otro a abandonar el territorio español o no regresar"],
        ["Matrimonio forzado de menor", "Penas en su mitad superior (art. 172 bis.3)"],
        ["Conductas del acoso (art. 172 ter.1)", "De forma insistente y reiterada: vigilar, perseguir o buscar su cercanía; contactar por cualquier medio; usar sus datos para adquirir productos o que terceros contacten; atentar contra su libertad o patrimonio o el de personas próximas"],
        ["Pena del acoso", "Prisión de 3 meses a 2 años o multa de 6 a 24 meses; si la víctima es especialmente vulnerable, prisión de 6 meses a 2 años"],
        ["Acoso a personas del art. 173.2", "Prisión de uno a dos años o TBC de 60 a 120 días; no se exige denuncia"],
        ["Perseguibilidad del acoso", "Solo mediante denuncia de la persona agraviada o su representante legal (salvo personas del art. 173.2)"],
        ["Perfiles falsos con la imagen ajena (art. 172 ter.5)", "Usar sin consentimiento la imagen de una persona para anuncios o perfiles falsos causándole acoso u humillación: prisión de 3 meses a 1 año o multa de 6 a 12 meses"],
        ["Acoso para obstaculizar la interrupción del embarazo (art. 172 quater)", "Prisión de 3 meses a 1 año o TBC de 31 a 80 días; no se necesita denuncia"],
      ],
      preguntas: [
        ["media", "Compeler a otra persona con violencia a contraer matrimonio se castiga con…", ["Prisión de seis meses a tres años y seis meses o multa de 12 a 24 meses", "Prisión de cuatro a seis años", "Multa de uno a tres meses"], "Art. 172 bis.1."],
        ["media", "El acoso del art. 172 ter exige que las conductas se realicen…", ["De forma insistente y reiterada y alteren el normal desarrollo de la vida cotidiana", "Una sola vez", "Solo por internet"], "Art. 172 ter.1."],
        ["media", "Con carácter general, ¿cómo se persigue el delito de acoso?", ["Mediante denuncia de la persona agraviada o su representante legal", "De oficio", "Solo por querella"], "Art. 172 ter.4."],
        ["dificil", "Si la víctima del acoso es la expareja (persona del art. 173.2), la pena es…", ["Prisión de uno a dos años o TBC de 60 a 120 días", "Multa de seis a 24 meses", "Prisión de tres meses a dos años"], "Art. 172 ter.2."],
        ["media", "Abrir un perfil falso en redes con la imagen de otra persona sin su consentimiento, causándole humillación, se castiga con…", ["Prisión de tres meses a un año o multa de seis a doce meses", "Prisión de dos a cuatro años", "No es delito"], "Art. 172 ter.5."],
        ["media", "¿Exige denuncia el delito de acoso a mujeres para obstaculizar la interrupción voluntaria del embarazo?", ["No", "Sí", "Solo si hay violencia"], "Art. 172 quater.5."],
      ],
    },
  ],
  glosario: [
    [S1, "Detención ilegal", "Privación de libertad ambulatoria de una persona fuera de los casos permitidos por la ley."],
    [S1, "Secuestro", "Detención ilegal en la que se exige una condición para liberar a la víctima."],
    [S1, "Desaparición forzada", "Privación de libertad por autoridad o funcionario que no se reconoce u oculta el paradero de la persona."],
    [S2, "Amenaza condicional", "Anuncio de un mal sujeto a que la víctima cumpla una exigencia."],
    [S2, "Chantaje", "Exigir dinero o recompensa bajo amenaza de revelar hechos de la vida privada."],
    [S3, "Coacción", "Impedir con violencia hacer lo que la ley no prohíbe u obligar a hacer lo que no se quiere."],
    [S4, "Acoso (stalking)", "Conductas insistentes y reiteradas de vigilancia, contacto o intromisión que alteran la vida cotidiana de la víctima."],
  ],
  casos: [
    {
      slug: "caso-retencion-cliente-tienda",
      titulo: "Un cliente retenido en la trastienda",
      supuesto: "El encargado de un comercio sorprende a un cliente que, según él, se ha llevado un artículo. Lo encierra en la trastienda durante cuatro horas sin avisar a la policía, exigiéndole que pague el doble del precio para dejarlo salir. Una patrulla acude por el aviso de un testigo.",
      preguntas: [
        [S1, "media", "Encerrar al cliente exigiendo un pago para liberarlo encaja en…", ["Secuestro", "Detención ilegal simple", "Coacción leve"], "Art. 164: se exige una condición para la puesta en libertad."],
        [S1, "media", "La pena básica del secuestro es prisión de…", ["Seis a diez años", "Cuatro a seis años", "Dos a cinco años"], "Art. 164."],
        [S1, "dificil", "Si lo hubiera liberado dentro de los tres primeros días sin lograr el objeto propuesto…", ["Se impondría la pena inferior en grado", "Quedaría exento", "La pena sería la misma"], "Arts. 163.2 y 164."],
        [S1, "media", "¿Podía el encargado retener al cliente para entregarlo inmediatamente a la policía?", ["Sí, en los casos permitidos por la ley; fuera de ellos sería delito del art. 163.4", "No, nunca", "Sí, durante el tiempo que quiera"], "Art. 163.4."],
        [S1, "media", "Si hubiera simulado ser vigilante de seguridad o policía…", ["La pena se impondría en su mitad superior", "Quedaría exento", "Sería solo una falta"], "Art. 165."],
        [S1, "media", "Si el cliente fuera menor de edad…", ["La pena se impondría en su mitad superior", "No habría delito", "Sería un delito leve"], "Art. 165."],
        [S2, "media", "Si se hubiera limitado a decirle que le pegaría si no pagaba, sin encerrarlo, el hecho sería…", ["Amenaza condicional de un mal constitutivo de delito", "Detención ilegal", "Nada"], "Art. 169.1.º."],
        [S3, "media", "Si, sin encerrarlo, le hubiera impedido con violencia salir de la tienda un momento, podría ser…", ["Coacción", "Secuestro", "Chantaje"], "Art. 172.1."],
        [S1, "facil", "¿Es la detención ilegal un delito contra la libertad?", ["Sí, del Título VI del Libro II", "No, contra el patrimonio", "No, contra el orden público"], "Título VI."],
        [S1, "dificil", "Si no diera razón del paradero de la víctima, la pena por el secuestro sería prisión de…", ["Quince a veinte años", "Diez a quince años", "Seis a diez años"], "Art. 166.1."],
      ],
    },
    {
      slug: "caso-expareja-acoso-mensajes",
      titulo: "Mensajes constantes de una expareja",
      supuesto: "Una mujer acude a la Policía Local: su expareja le envía decenas de mensajes al día desde hace semanas, la espera a la salida del trabajo y ha creado un perfil falso en una red de contactos con sus fotos. En el último mensaje le escribe: «si no vuelves conmigo, te vas a enterar». Ha tenido que cambiar de horario y de ruta.",
      preguntas: [
        [S4, "media", "Los mensajes constantes y la espera a la salida del trabajo, que alteran su vida cotidiana, encajan en…", ["Acoso del art. 172 ter", "Coacción leve", "Detención ilegal"], "Art. 172 ter.1."],
        [S4, "media", "Al ser la víctima su expareja (persona del art. 173.2), la pena por el acoso es…", ["Prisión de uno a dos años o TBC de 60 a 120 días", "Multa de uno a tres meses", "Prisión de seis meses a dos años"], "Art. 172 ter.2."],
        [S4, "media", "¿Es necesaria la denuncia de la víctima en este caso?", ["No, por ser persona del art. 173.2", "Sí, siempre", "Solo si hay violencia"], "Art. 172 ter.2."],
        [S4, "media", "El perfil falso con sus fotos que le causa acoso u humillación es…", ["Delito del art. 172 ter.5", "No es delito", "Una infracción administrativa"], "Art. 172 ter.5."],
        [S2, "media", "El mensaje «si no vuelves conmigo, te vas a enterar», de modo leve, a la expareja mujer, puede ser…", ["Amenaza leve del art. 171.4", "Chantaje", "Secuestro"], "Art. 171.4."],
        [S2, "media", "La amenaza leve a la expareja se castiga con…", ["Prisión de seis meses a un año o TBC de 31 a 80 días y privación de armas", "Multa de uno a tres meses", "No es delito"], "Art. 171.4."],
        [S4, "dificil", "¿Excluye la pena del acoso las de los delitos en que se concreten los actos?", ["No, se imponen sin perjuicio de ellas", "Sí", "Solo la del más grave"], "Art. 172 ter.3."],
        [S2, "media", "Si la amenaza se hubiera cometido en el domicilio de ella…", ["La pena se impondría en su mitad superior", "Se rebajaría", "No cambiaría"], "Art. 171.5, último párrafo."],
        [S3, "media", "Si con violencia le impidiera entrar en su vivienda, podría haber…", ["Coacción con pena en su mitad superior", "Solo acoso", "Nada"], "Art. 172.1, párrafo tercero."],
        [S2, "dificil", "¿Puede el juez imponer la pena inferior en grado por la amenaza leve del 171.4?", ["Sí, razonándolo en sentencia", "No", "Solo si hay perdón"], "Art. 171.6."],
      ],
    },
    {
      slug: "caso-piquete-impide-trabajar",
      titulo: "Un piquete que impide entrar a trabajar",
      supuesto: "Durante una protesta, varias personas forman un cordón ante la entrada de una nave del polígono de Malpica e impiden con empujones que un grupo de trabajadores entre a trabajar. Uno de los manifestantes grita a un trabajador que, si entra, le quemarán el coche.",
      preguntas: [
        [S3, "media", "Impedir con violencia a los trabajadores hacer lo que la ley no prohíbe es…", ["Coacción", "Detención ilegal", "Secuestro"], "Art. 172.1."],
        [S3, "dificil", "Si la coacción tiene por objeto impedir el ejercicio de un derecho fundamental…", ["La pena se impone en su mitad superior, salvo que otro precepto prevea mayor pena", "No hay delito", "Se rebaja la pena"], "Art. 172.1, párrafo segundo."],
        [S2, "media", "«Si entras, te quemamos el coche» es una amenaza…", ["Condicional de un mal constitutivo de delito contra el patrimonio", "No condicional de un mal no delictivo", "Que no es delito"], "Art. 169."],
        [S2, "media", "Si el trabajador no entra (el autor consigue su propósito), la pena es…", ["Prisión de uno a cinco años", "Prisión de seis meses a tres años", "Multa"], "Art. 169.1.º."],
        [S2, "media", "Si la amenaza se hiciera en nombre de un grupo real o supuesto…", ["Se impondría la pena en su mitad superior", "Se rebajaría", "No cambiaría"], "Art. 169.1.º, párrafo segundo."],
        [S3, "media", "Pena básica de la coacción…", ["Prisión de seis meses a tres años o multa de 12 a 24 meses", "Prisión de uno a cinco años", "Multa de uno a tres meses"], "Art. 172.1."],
        [S1, "media", "Si encerraran a un trabajador en una caseta durante horas, el hecho podría ser…", ["Detención ilegal", "Coacción leve", "Amenaza leve"], "Art. 163.1."],
        [S2, "dificil", "Si las amenazas se dirigieran a atemorizar a todo un colectivo profesional con gravedad suficiente…", ["Se impondría la pena superior en grado", "La misma pena", "Pena inferior"], "Art. 170.1."],
        [S3, "media", "Si la coacción fuera leve y a un desconocido, se perseguiría…", ["Solo mediante denuncia del agraviado", "De oficio", "Nunca"], "Art. 172.3."],
        [S1, "facil", "¿Qué título del Código recoge estos delitos?", ["El Título VI del Libro II, delitos contra la libertad", "El Título XXII", "El Título XIII"], "Título VI."],
      ],
    },
  ],
});
