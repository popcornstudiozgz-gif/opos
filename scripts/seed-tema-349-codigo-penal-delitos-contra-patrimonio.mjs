/**
 * Crea tema-349 — Tema 22 de Policía Local: "Delitos contra el patrimonio
 * (Libro II, Título XIII)."
 *
 * Fuente: Ley Orgánica 10/1995, del Código Penal (BOE-A-1995-25444), texto
 * consolidado del BOE. Leídos íntegros los Capítulos I a VI (arts. 234 a
 * 256), IX y X (arts. 263 a 269) y XIV (arts. 298 a 304) del Título XIII,
 * que son los de aplicación policial cotidiana; de los Capítulos VII, VII
 * bis, VIII y XI a XIII solo se recoge su rúbrica (estructura del Título).
 * Los arts. 234, 235, 248, 250 y 255 se toman en su redacción vigente desde
 * el 10-04-2026 (multirreincidencia en hurtos y estafas leves, hurto de
 * teléfonos móviles y defraudación eléctrica para cultivos de droga).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-349-codigo-penal-delitos-contra-patrimonio.mjs
 */
import { sembrarTema, POLICIA } from "./lib/sembrar-tema.mjs";

const CP = "https://www.boe.es/buscar/act.php?id=BOE-A-1995-25444";
const a = (ancla) => `${CP}#${ancla}`;
const S1 = "hurtos";
const S2 = "robos-extorsion";
const S3 = "uso-vehiculos-usurpacion";
const S4 = "estafas-apropiacion-defraudaciones";
const S5 = "danos-comunes-receptacion";

await sembrarTema({
  tema: {
    slug: "tema-349",
    titulo: "Código Penal: delitos contra el patrimonio",
    descripcion: "Estructura del Título XIII; hurto, hurto leve y multirreincidencia, tipos agravados (incluido el de teléfonos móviles) y furtum possessionis; robo con fuerza en las cosas, llaves falsas, casa habitada; robo con violencia o intimidación; extorsión; robo y hurto de uso de vehículos; usurpación y ocupación de inmuebles; estafa, estafa informática y con tarjetas, tipos agravados, administración desleal y apropiación indebida; defraudación de fluido eléctrico; daños, daños informáticos e incendio; excusa absolutoria entre parientes; receptación y blanqueo de capitales.",
    contenido: "Recorre los delitos patrimoniales de mayor aplicación policial del Título XIII del Libro II del Código Penal: la frontera de los 400 euros entre delito leve y menos grave, las agravantes del hurto y del robo, la diferencia entre robo con fuerza (escalamiento, fractura, llaves falsas, alarmas) y robo con violencia o intimidación, el robo de uso de vehículos, la ocupación de inmuebles, la estafa y sus modalidades informáticas, la apropiación indebida, el enganche ilegal a la luz, los daños, la exención entre familiares y la receptación.",
    enlaces_boe: [{ url: CP, titulo: "Ley Orgánica 10/1995, de 23 de noviembre, del Código Penal (BOE-A-1995-25444)" }],
    indice_estudio: [
      { seccion: S1, titulo: "De los hurtos", articulos: "arts. 234-236", url: a("a234") },
      { seccion: S2, titulo: "De los robos y de la extorsión", articulos: "arts. 237-243", url: a("a237") },
      { seccion: S3, titulo: "Robo y hurto de uso de vehículos y usurpación", articulos: "arts. 244-247", url: a("a244") },
      { seccion: S4, titulo: "Estafas, administración desleal, apropiación indebida y defraudaciones de fluido", articulos: "arts. 248-256", url: a("a248") },
      { seccion: S5, titulo: "Daños, disposiciones comunes, receptación y blanqueo", articulos: "arts. 263-269 y 298-304", url: a("a263") },
    ],
  },
  vinculo: { oposicion: POLICIA.oposicion, bloqueId: POLICIA.bloqueParte2, numero: 22 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Rúbrica y capítulos del Título XIII", "«Delitos contra el patrimonio y contra el orden socioeconómico»: hurtos, robos, extorsión, robo y hurto de uso de vehículos, usurpación, defraudaciones, frustración de la ejecución, insolvencias punibles, alteración de precios en concursos y subastas, daños, disposiciones comunes, propiedad intelectual e industrial, mercado y consumidores, sustracción de cosa propia, delitos societarios, y receptación y blanqueo"],
        ["Hurto (art. 234.1)", "Tomar con ánimo de lucro cosas muebles ajenas sin la voluntad de su dueño: prisión de 6 a 18 meses si lo sustraído excede de 400 euros"],
        ["Hurto leve (art. 234.2)", "Si no excede de 400 euros: multa de uno a tres meses, salvo que concurra una circunstancia del art. 235"],
        ["Multirreincidencia en el hurto leve (art. 234.2, redacción de 2026)", "Si el culpable tiene al menos tres condenas ejecutorias por delitos de la misma naturaleza del Título, siendo al menos una leve, se aplica la pena del 234.1"],
        ["Neutralizar alarmas de la cosa (art. 234.3)", "Neutralizar, eliminar o inutilizar los dispositivos de alarma o seguridad instalados en las cosas sustraídas: penas en su mitad superior"],
        ["Hurto agravado (art. 235)", "Prisión de 1 a 3 años: valor artístico o cultural; primera necesidad con desabastecimiento; cableado de infraestructuras; productos agrarios; especial gravedad; víctima en grave situación o desamparo; tres condenas previas; uso de menores de 16; organización criminal; teléfonos móviles"],
        ["Hurto de teléfonos móviles (art. 235.1.10.º)", "Agravado: móviles y otros dispositivos de comunicación o almacenamiento con datos personales, salvo los que estén a la venta o en exposición en comercios"],
        ["Hurto de la propia cosa (art. 236)", "El dueño que sustrae su cosa mueble de quien la tiene legítimamente, con perjuicio: multa de 3 a 12 meses (de 1 a 3 si no excede de 400 euros)"],
      ],
      preguntas: [
        ["facil", "¿A partir de qué cuantía el hurto deja de ser leve?", ["Cuando lo sustraído excede de 400 euros", "De 1.000 euros", "De 300 euros"], "Art. 234.1 y 2."],
        ["media", "El hurto de 300 euros sin circunstancias agravantes se castiga con…", ["Multa de uno a tres meses", "Prisión de seis a dieciocho meses", "Prisión de uno a tres años"], "Art. 234.2."],
        ["media", "Arrancar la alarma antirrobo de una prenda para hurtarla supone…", ["Imponer la pena en su mitad superior", "Convertirlo en robo con fuerza", "Ningún efecto"], "Art. 234.3."],
        ["media", "Hurtar un teléfono móvil a un viandante es, en la redacción vigente…", ["Hurto agravado del art. 235", "Siempre hurto leve", "Robo con fuerza"], "Art. 235.1.10.º."],
        ["dificil", "Hurtar un móvil expuesto a la venta en un comercio, ¿entra en la agravante del art. 235.1.10.º?", ["No, quedan excluidos los que están a la venta o exposición en comercios", "Sí", "Solo si vale más de 400 euros"], "Art. 235.1.10.º, último inciso."],
        ["media", "Utilizar a un menor de dieciséis años para cometer el hurto…", ["Es una circunstancia agravante del art. 235", "Exime al adulto", "Es irrelevante"], "Art. 235.1.8.º."],
        ["dificil", "Un autor con tres condenas firmes previas por hurto (una leve) hurta 150 euros. ¿Qué pena se aplica?", ["La del art. 234.1 (prisión de 6 a 18 meses)", "Multa de uno a tres meses", "Ninguna"], "Art. 234.2, párrafo primero, segundo inciso."],
        ["media", "El dueño que sustrae su propia cosa de quien la posee legítimamente comete…", ["El delito del art. 236", "Nada", "Robo"], "Art. 236."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Robo (art. 237)", "Apoderarse con ánimo de lucro de cosas muebles ajenas empleando fuerza en las cosas para acceder o abandonar el lugar, o violencia o intimidación en las personas (al cometerlo, en la huida o contra quien auxilia o persigue)"],
        ["Circunstancias de fuerza en las cosas (art. 238)", "1.º escalamiento; 2.º rompimiento de pared, techo o suelo o fractura de puerta o ventana; 3.º fractura de muebles u objetos cerrados o forzamiento de cerraduras; 4.º llaves falsas; 5.º inutilización de alarmas"],
        ["Llaves falsas (art. 239)", "Ganzúas; llaves legítimas perdidas u obtenidas mediante infracción penal; cualquier otra no destinada por el propietario; también tarjetas, mandos a distancia e instrumentos tecnológicos similares"],
        ["Pena del robo con fuerza (art. 240)", "Prisión de uno a tres años; de dos a cinco si concurre alguna circunstancia del art. 235"],
        ["Robo con fuerza en casa habitada o local abierto al público (art. 241.1)", "Prisión de dos a cinco años; en establecimiento abierto al público fuera de horario, de uno a cinco"],
        ["Casa habitada (art. 241.2)", "Todo albergue que constituya morada de una o más personas, aunque estén accidentalmente ausentes"],
        ["Robo con violencia o intimidación (art. 242)", "Prisión de dos a cinco años; en casa habitada o local abierto al público, de tres años y seis meses a cinco; mitad superior con armas o medios peligrosos o si ataca a quien auxilia o persigue"],
        ["Atenuación del robo violento (art. 242.4)", "Pena inferior en grado por la menor entidad de la violencia o intimidación"],
        ["Extorsión (art. 243)", "Obligar con ánimo de lucro, mediante violencia o intimidación, a realizar u omitir un acto o negocio jurídico en perjuicio patrimonial: prisión de uno a cinco años"],
      ],
      preguntas: [
        ["media", "Entrar en una vivienda trepando por la fachada para robar es robo con fuerza por…", ["Escalamiento", "Llave falsa", "Intimidación"], "Art. 238.1.º."],
        ["media", "Abrir un coche con un mando a distancia clonado se considera uso de…", ["Llave falsa", "Escalamiento", "Fractura"], "Art. 239, párrafo final."],
        ["facil", "El robo con fuerza en las cosas básico se castiga con prisión de…", ["Uno a tres años", "Dos a cinco años", "Seis a dieciocho meses"], "Art. 240.1."],
        ["media", "El robo con violencia o intimidación se castiga con prisión de…", ["Dos a cinco años", "Uno a tres años", "Cinco a diez años"], "Art. 242.1."],
        ["media", "Si en el robo con intimidación se usa una navaja…", ["La pena se impone en su mitad superior", "Se rebaja", "Es hurto"], "Art. 242.3."],
        ["dificil", "¿Es casa habitada la vivienda cuyos moradores están de vacaciones?", ["Sí, aunque estén accidentalmente ausentes", "No", "Solo si hay mascotas"], "Art. 241.2."],
        ["media", "Obligar a alguien con intimidación a firmar un documento que perjudica su patrimonio es…", ["Extorsión", "Hurto", "Estafa"], "Art. 243."],
        ["dificil", "La violencia ejercida sobre quien persigue al ladrón tras el apoderamiento convierte el hecho en…", ["Robo con violencia", "Hurto con agravante", "Dos hurtos"], "Art. 237."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Hurto de uso de vehículo (art. 244.1)", "Sustraer o utilizar sin autorización un vehículo a motor o ciclomotor ajeno sin ánimo de apropiárselo, restituyéndolo en 48 horas: TBC de 31 a 90 días o multa de 2 a 12 meses"],
        ["Con fuerza en las cosas (art. 244.2)", "La pena se aplica en su mitad superior"],
        ["Sin restitución en 48 horas (art. 244.3)", "Se castiga como hurto o robo, según los casos"],
        ["Con violencia o intimidación (art. 244.4)", "Se imponen en todo caso las penas del robo con violencia del art. 242"],
        ["Usurpación violenta (art. 245.1)", "Ocupar un inmueble o usurpar un derecho real inmobiliario ajeno con violencia o intimidación: prisión de 1 a 2 años, además de las penas por la violencia"],
        ["Ocupación pacífica (art. 245.2)", "Ocupar sin autorización un inmueble, vivienda o edificio ajeno que no constituya morada, o mantenerse contra la voluntad del titular: multa de tres a seis meses"],
        ["Diferencia entre ocupación y allanamiento", "Si el inmueble es morada de alguien, el hecho es allanamiento de morada (art. 202); si no es morada, usurpación (art. 245.2)"],
        ["Alteración de lindes y distracción de aguas (arts. 246-247)", "Multa de 3 a 18 meses (lindes) o de 3 a 6 meses (aguas); de 1 a 3 meses si la utilidad no excede de 400 euros"],
      ],
      preguntas: [
        ["media", "Coger un coche ajeno para dar una vuelta y devolverlo en 24 horas, sin violencia, es…", ["Hurto de uso de vehículo", "Robo de vehículo", "Apropiación indebida"], "Art. 244.1."],
        ["media", "¿En qué plazo debe restituirse el vehículo para aplicar el art. 244.1?", ["No superior a cuarenta y ocho horas", "Una semana", "Veinticuatro horas"], "Art. 244.1."],
        ["media", "Si no se restituye el vehículo en el plazo legal, el hecho se castiga como…", ["Hurto o robo, según los casos", "Hurto de uso igualmente", "Daños"], "Art. 244.3."],
        ["media", "Ocupar sin violencia una nave vacía que no es morada de nadie se castiga con…", ["Multa de tres a seis meses", "Prisión de seis meses a dos años", "No es delito"], "Art. 245.2."],
        ["dificil", "Si para usar el vehículo ajeno se intimida al conductor…", ["Se imponen en todo caso las penas del art. 242", "Se aplica el art. 244.1", "Solo multa"], "Art. 244.4."],
        ["media", "Ocupar con intimidación un inmueble ajeno se castiga con prisión de…", ["Uno a dos años, además de las penas por la intimidación", "Tres a seis meses", "Dos a cinco años"], "Art. 245.1."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Estafa (art. 248)", "Con ánimo de lucro, utilizar engaño bastante para producir error en otro, induciéndolo a un acto de disposición en perjuicio propio o ajeno: prisión de 6 meses a 3 años"],
        ["Estafa leve (art. 248)", "Si lo defraudado no excede de 400 euros: multa de 1 a 3 meses, salvo circunstancias del art. 250; con multirreincidencia, la pena ordinaria"],
        ["Estafa informática y con tarjetas (art. 249)", "Manipulación informática que logra una transferencia no consentida; uso fraudulento de tarjetas u otros instrumentos de pago distintos del efectivo: prisión de 6 meses a 3 años"],
        ["Estafa agravada (art. 250.1)", "Prisión de 1 a 6 años y multa: primera necesidad o vivienda; abuso de firma; patrimonio artístico; especial gravedad; más de 50.000 euros o elevado número de personas; abuso de relaciones personales; estafa procesal; tres condenas previas"],
        ["Estafa hiperagravada (art. 250.2)", "Prisión de 4 a 8 años si se combinan ciertas circunstancias o la defraudación supera los 250.000 euros"],
        ["Administración desleal (art. 252)", "Infringir las facultades de administrar un patrimonio ajeno excediéndose en su ejercicio y causando perjuicio: penas de la estafa"],
        ["Apropiación indebida (art. 253)", "Apropiarse de dinero o cosa mueble recibida en depósito, comisión, custodia u otro título que obligue a devolver, o negar haberla recibido: penas de la estafa"],
        ["Apropiación de cosa ajena fuera del art. 253 (art. 254)", "Por ejemplo, de una cosa perdida: multa de 3 a 6 meses (de 1 a 2 si no excede de 400 euros)"],
        ["Defraudación de fluidos (art. 255)", "Defraudar electricidad, gas, agua o telecomunicaciones con mecanismos, alterando contadores u otros medios clandestinos: multa de 3 a 12 meses"],
        ["Enganche para cultivos de droga (art. 255.3, redacción de 2026)", "Si la defraudación es para abastecer instalaciones usadas para el tráfico de drogas del art. 368: prisión de 6 a 18 meses o multa de 12 a 24 meses, cualquiera que sea la cuantía"],
      ],
      preguntas: [
        ["media", "Los elementos de la estafa son ánimo de lucro, engaño bastante, error y…", ["Un acto de disposición en perjuicio propio o ajeno", "Violencia", "Fuerza en las cosas"], "Art. 248."],
        ["media", "La estafa básica se castiga con prisión de…", ["Seis meses a tres años", "Uno a seis años", "Uno a cuatro años"], "Art. 248."],
        ["media", "Usar fraudulentamente la tarjeta de crédito de otro para pagar compras es…", ["Estafa del art. 249", "Hurto", "Apropiación indebida"], "Art. 249.1.b)."],
        ["media", "La estafa que supera los 50.000 euros es…", ["Estafa agravada del art. 250", "Estafa leve", "Administración desleal"], "Art. 250.1.5.º."],
        ["media", "Quedarse con el dinero entregado en depósito y negar haberlo recibido es…", ["Apropiación indebida", "Estafa procesal", "Hurto"], "Art. 253.1."],
        ["media", "Engancharse ilegalmente a la red eléctrica es…", ["Defraudación de fluido eléctrico del art. 255", "Robo con fuerza", "Daños"], "Art. 255.1."],
        ["dificil", "Si el enganche ilegal se hace para abastecer un cultivo de marihuana destinado al tráfico, la pena es…", ["Prisión de seis a dieciocho meses o multa de doce a veinticuatro meses", "Multa de uno a tres meses", "La misma que el básico"], "Art. 255.3."],
        ["dificil", "Manipular las pruebas en un juicio para que el juez dicte una resolución que perjudique económicamente a la otra parte es…", ["Estafa procesal (agravada)", "Falso testimonio exclusivamente", "Administración desleal"], "Art. 250.1.7.º."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["Daños (art. 263.1)", "Causar daños en propiedad ajena: multa de 6 a 24 meses; de 1 a 3 meses si no exceden de 400 euros"],
        ["Daños agravados (art. 263.2)", "Prisión de 1 a 3 años y multa: para impedir el ejercicio de la autoridad o en venganza de sus actos; contagio de ganado; sustancias venenosas o corrosivas; bienes de dominio o uso público; ruina del perjudicado; especial gravedad"],
        ["Daños informáticos (art. 264)", "Borrar, dañar o hacer inaccesibles de manera grave datos, programas o documentos electrónicos ajenos con resultado grave: prisión de 6 meses a 3 años"],
        ["Daños por incendio o explosión (art. 266.1)", "Prisión de 1 a 3 años; si se pone en peligro la vida, se aplica el delito de incendio (art. 351)"],
        ["Daños imprudentes (art. 267)", "Por imprudencia grave en cuantía superior a 80.000 euros: multa de 3 a 9 meses; perseguibles por denuncia; el perdón extingue la acción"],
        ["Excusa absolutoria entre parientes (art. 268)", "Exentos de responsabilidad penal (solo civil) los cónyuges no separados, ascendientes, descendientes y hermanos, y afines en primer grado convivientes, si no hay violencia, intimidación ni abuso de vulnerabilidad; no alcanza a extraños partícipes"],
        ["Receptación (art. 298)", "Con ánimo de lucro y sabiendo que se cometió un delito patrimonial en el que no se participó, ayudar a aprovecharse de los efectos o recibirlos, adquirirlos u ocultarlos: prisión de 6 meses a 2 años"],
        ["Límite de la pena de la receptación (art. 298.3)", "Nunca puede superar la privativa de libertad señalada al delito encubierto"],
        ["Blanqueo de capitales (art. 301)", "Adquirir, poseer, utilizar, convertir o transmitir bienes sabiendo que proceden de una actividad delictiva, u ocultar su origen: prisión de 6 meses a 6 años y multa del tanto al triplo"],
      ],
      preguntas: [
        ["facil", "Romper un escaparate valorado en 300 euros es…", ["Delito leve de daños, multa de uno a tres meses", "Delito de robo", "No es delito"], "Art. 263.1."],
        ["media", "Dañar el mobiliario urbano (bienes de uso público) se castiga con…", ["Prisión de uno a tres años y multa", "Solo multa de uno a tres meses", "No es delito"], "Art. 263.2.4.º."],
        ["media", "Dañar el coche particular de un agente en venganza por una multa que impuso es…", ["Daños agravados del art. 263.2.1.º", "Daños leves", "Atentado"], "Art. 263.2.1.º."],
        ["media", "El hijo que sustrae dinero a su padre sin violencia ni intimidación…", ["Está exento de responsabilidad penal, aunque responde civilmente", "Comete hurto agravado", "Comete robo"], "Art. 268.1."],
        ["dificil", "¿Alcanza la excusa absolutoria del art. 268 al amigo que ayudó al hijo?", ["No, no es aplicable a los extraños que participan", "Sí", "Solo si es menor"], "Art. 268.2."],
        ["media", "Comprar sabiendo su origen un móvil robado, con ánimo de lucro y sin haber participado en el robo, es…", ["Receptación", "Robo", "Encubrimiento impune"], "Art. 298.1."],
        ["dificil", "¿Pueden perseguirse de oficio los daños por imprudencia grave de más de 80.000 euros?", ["No, requieren denuncia del agraviado (o del fiscal si es menor o desvalido)", "Sí, siempre", "No son delito"], "Art. 267."],
      ],
    },
  ],
  glosario: [
    [S1, "Ánimo de lucro", "Intención de obtener un beneficio o ventaja patrimonial; elemento común a hurto, robo y estafa."],
    [S1, "Hurto leve", "Hurto de cuantía no superior a 400 euros sin circunstancias del art. 235."],
    [S2, "Escalamiento", "Acceder al lugar por una vía no destinada a ello que exige esfuerzo (trepar, saltar)."],
    [S2, "Llave falsa", "Ganzúa, llave perdida u obtenida ilícitamente, o cualquier otra no destinada por el dueño, incluidos mandos y tarjetas."],
    [S3, "Hurto de uso", "Utilizar un vehículo ajeno sin ánimo de apropiárselo y devolverlo en 48 horas."],
    [S3, "Usurpación", "Ocupación de un inmueble ajeno que no es morada."],
    [S4, "Engaño bastante", "Engaño idóneo para provocar error en una persona normal; requisito de la estafa."],
    [S4, "Apropiación indebida", "Quedarse con lo que se recibió con obligación de devolverlo."],
    [S5, "Excusa absolutoria", "Causa que exime de pena por razones de política criminal, como el parentesco del art. 268."],
    [S5, "Receptación", "Aprovecharse o adquirir los efectos de un delito patrimonial ajeno sabiendo su origen."],
  ],
  casos: [
    {
      slug: "caso-tiron-movil-tranvia",
      titulo: "Un tirón en la parada del tranvía",
      supuesto: "En una parada del tranvía de la Avenida de la Academia General Militar, un joven arranca de la mano el móvil a una mujer y huye corriendo. Un viandante lo persigue y el joven le da un puñetazo para escapar. Una patrulla lo detiene poco después. El móvil vale 250 euros.",
      preguntas: [
        [S2, "media", "Golpear al viandante que le persigue para huir convierte el hecho en…", ["Robo con violencia", "Hurto leve", "Hurto agravado"], "Art. 237: violencia sobre quien persigue."],
        [S2, "media", "Pena básica del robo con violencia o intimidación…", ["Prisión de dos a cinco años", "Multa de uno a tres meses", "Prisión de uno a tres años"], "Art. 242.1."],
        [S2, "media", "¿Se castiga además el puñetazo?", ["Sí, sin perjuicio de la pena que corresponda a la violencia física", "No, queda absorbido", "Solo si hay fractura"], "Art. 242.1."],
        [S1, "media", "Si no hubiera golpeado a nadie, el tirón del móvil sería…", ["Hurto agravado por tratarse de un teléfono móvil", "Hurto leve por valer menos de 400 euros", "Robo con fuerza"], "Art. 235.1.10.º."],
        [S1, "dificil", "¿Por qué no sería hurto leve pese a valer menos de 400 euros?", ["Porque el art. 234.2 excluye los casos con circunstancias del art. 235", "Porque es de noche", "Porque hay testigos"], "Art. 234.2."],
        [S1, "media", "Pena del hurto agravado del art. 235…", ["Prisión de uno a tres años", "Multa de uno a tres meses", "Prisión de seis a dieciocho meses"], "Art. 235.1."],
        [S2, "media", "Si hubiera amenazado con una navaja, la pena del robo se impondría…", ["En su mitad superior", "En su mitad inferior", "Igual"], "Art. 242.3."],
        [S2, "dificil", "Atendiendo a la menor entidad de la violencia, el tribunal podría…", ["Imponer la pena inferior en grado", "Absolverlo", "Convertirlo en delito leve"], "Art. 242.4."],
        [S5, "media", "Si un tercero le comprara después el móvil sabiendo su origen, cometería…", ["Receptación", "Robo", "Nada"], "Art. 298.1."],
        [S5, "media", "La pena de la receptación nunca podrá exceder de…", ["La privativa de libertad señalada al delito encubierto", "Dos años", "La multa del robo"], "Art. 298.3."],
      ],
    },
    {
      slug: "caso-robo-trastero-coche-uso",
      titulo: "Robos en un garaje comunitario",
      supuesto: "Varios vecinos denuncian que alguien ha entrado de madrugada en el garaje comunitario de su edificio abriendo la puerta con un mando clonado. Ha forzado las cerraduras de dos trasteros y se ha llevado herramientas por valor de 900 euros. Además, ha cogido una moto del garaje que apareció al día siguiente aparcada en otra calle.",
      preguntas: [
        [S2, "media", "Abrir la puerta con un mando clonado supone el uso de…", ["Llave falsa", "Escalamiento", "Violencia"], "Art. 239."],
        [S2, "media", "Forzar las cerraduras de los trasteros es una circunstancia de…", ["Fuerza en las cosas del art. 238", "Intimidación", "Hurto"], "Art. 238.3.º."],
        [S2, "dificil", "El garaje y los trasteros comunicados con el edificio y formando unidad física son…", ["Dependencias de casa habitada", "Lugar abierto al público", "Vía pública"], "Art. 241.3."],
        [S2, "media", "El robo con fuerza en dependencias de casa habitada se castiga con prisión de…", ["Dos a cinco años", "Uno a tres años", "Seis a dieciocho meses"], "Art. 241.1."],
        [S3, "media", "Coger la moto y dejarla al día siguiente en otra calle es…", ["Hurto o robo de uso de vehículo", "Robo del vehículo", "Apropiación indebida"], "Art. 244.1."],
        [S3, "media", "Como para cogerla empleó fuerza (mando clonado), la pena del art. 244 se aplica…", ["En su mitad superior", "En su mitad inferior", "Igual"], "Art. 244.2."],
        [S3, "media", "Si no hubiera aparecido la moto en 48 horas, se castigaría como…", ["Hurto o robo, según los casos", "Hurto de uso", "Daños"], "Art. 244.3."],
        [S5, "media", "Si además hubiera roto la puerta del garaje, ¿responde por los daños aparte?", ["La fractura de la puerta es la fuerza típica del robo y queda absorbida por él", "Siempre por separado", "No hay daños"], "Art. 238.2.º (la fractura de puerta es una de las formas de fuerza del robo) y art. 8.3.ª: el precepto más amplio o complejo absorbe las infracciones consumidas en él."],
        [S1, "media", "Si se hubiera llevado herramientas que estaban fuera, sin fuerza ni llave falsa, el hecho sería…", ["Hurto (más de 400 euros)", "Robo con fuerza", "Hurto leve"], "Art. 234.1."],
        [S2, "dificil", "Si los vecinos lo sorprenden y él los intimida para huir, el robo pasaría a ser…", ["Robo con violencia o intimidación", "Hurto", "Extorsión"], "Art. 237."],
      ],
    },
    {
      slug: "caso-estafa-falsa-revisor-gas",
      titulo: "El falso revisor del gas",
      supuesto: "Un hombre se presenta en casa de una anciana haciéndose pasar por revisor del gas, le dice que la instalación es peligrosa y le cobra 350 euros por una revisión falsa. Al salir, se lleva sin que ella lo vea una cartera con 60 euros. Días después, la policía descubre que había repetido el engaño con veinte personas mayores del barrio.",
      preguntas: [
        [S4, "media", "Cobrar por una revisión falsa mediante engaño es…", ["Estafa", "Hurto", "Apropiación indebida"], "Art. 248."],
        [S4, "media", "Un engaño así, capaz de inducir a error a la víctima, se denomina…", ["Engaño bastante", "Engaño leve", "Simulación de autoridad"], "Art. 248."],
        [S4, "media", "Considerando solo esta víctima (350 euros) y sin agravantes, sería…", ["Estafa leve, multa de uno a tres meses", "Estafa agravada", "Estafa procesal"], "Art. 248, párrafo tercero."],
        [S4, "media", "Que afecte a un elevado número de personas permite apreciar…", ["Estafa agravada del art. 250", "Estafa leve", "Administración desleal"], "Art. 250.1.5.º."],
        [S4, "media", "Pena de la estafa agravada del art. 250.1…", ["Prisión de uno a seis años y multa de seis a doce meses", "Prisión de seis meses a tres años", "Multa"], "Art. 250.1."],
        [S1, "media", "Llevarse la cartera sin que ella lo vea es…", ["Hurto", "Robo con fuerza", "Estafa"], "Art. 234."],
        [S1, "media", "Con 60 euros y sin circunstancias agravantes, el hurto sería…", ["Leve", "Agravado", "Robo"], "Art. 234.2."],
        [S1, "dificil", "Si se aprovechó del desamparo de la anciana, el hurto podría ser…", ["Agravado del art. 235.1.6.º", "Siempre leve", "Exento"], "Art. 235.1.6.º."],
        [S5, "media", "Si el autor fuera hijo de la víctima y no hubiera violencia ni abuso de su vulnerabilidad…", ["Quedaría exento penalmente y respondería civilmente", "Se agravaría la pena", "Sería robo"], "Art. 268.1."],
        [S4, "dificil", "Si cobrara con el datáfono manipulando los datos informáticos para obtener más dinero sin consentimiento, sería…", ["Estafa informática del art. 249.1.a)", "Hurto", "Daños informáticos"], "Art. 249.1.a)."],
      ],
    },
  ],
});
