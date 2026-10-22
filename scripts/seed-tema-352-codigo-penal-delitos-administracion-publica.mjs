/**
 * Crea tema-352 — Tema 25 de Policía Local: "Delitos contra la
 * Administración Pública (Libro II, Título XIX)."
 *
 * Fuente: Ley Orgánica 10/1995, del Código Penal (BOE-A-1995-25444), texto
 * consolidado del BOE leído íntegro en los arts. 404 a 445. La malversación
 * (arts. 432 a 435 bis) se toma en la redacción de la LO 14/2022, vigente
 * desde el 12-01-2023 (el BOE intercala la redacción anterior como nota; no
 * se usa). Los arts. 432 bis, 433 ter, 435 bis y 438 bis tienen en el BOE
 * las anclas «a4-3», «a4-4», «a4-2» y «a4-5».
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-352-codigo-penal-delitos-administracion-publica.mjs
 */
import { sembrarTema, POLICIA } from "./lib/sembrar-tema.mjs";

const CP = "https://www.boe.es/buscar/act.php?id=BOE-A-1995-25444";
const a = (ancla) => `${CP}#${ancla}`;
const S1 = "prevaricacion-abandono-omision";
const S2 = "desobediencia-denegacion-auxilio";
const S3 = "custodia-documentos-secretos";
const S4 = "cohecho-trafico-influencias";
const S5 = "malversacion-fraudes-actividades-prohibidas";

await sembrarTema({
  tema: {
    slug: "tema-352",
    titulo: "Código Penal: delitos contra la Administración pública",
    descripcion: "Prevaricación administrativa y nombramientos ilegales; abandono de destino y omisión del deber de perseguir delitos; abandono colectivo de un servicio público; desobediencia de funcionarios y su límite; denegación de auxilio a la Justicia o a un particular; infidelidad en la custodia de documentos y violación de secretos; cohecho propio, impropio y de facilitación, cohecho del particular y exención por denuncia; tráfico de influencias; malversación y uso privado del patrimonio público; fraudes y exacciones ilegales; enriquecimiento injustificado; negociaciones prohibidas, uso de información privilegiada y solicitud sexual por funcionario.",
    contenido: "Recorre el Título XIX del Libro II del Código Penal (arts. 404 a 445), los delitos que cometen las autoridades y funcionarios —también los agentes de Policía Local— contra el correcto funcionamiento de la Administración: dictar resoluciones injustas a sabiendas, no perseguir los delitos conocidos, desobedecer o negar el auxilio debido, revelar secretos, aceptar sobornos o regalos, influir para obtener beneficios, apropiarse del patrimonio público o usarlo para fines privados, y otros abusos del cargo.",
    enlaces_boe: [{ url: CP, titulo: "Ley Orgánica 10/1995, de 23 de noviembre, del Código Penal (BOE-A-1995-25444)" }],
    indice_estudio: [
      { seccion: S1, titulo: "Prevaricación, abandono de destino y omisión del deber de perseguir delitos", articulos: "arts. 404-409", url: a("a404") },
      { seccion: S2, titulo: "Desobediencia y denegación de auxilio", articulos: "arts. 410-412", url: a("a410") },
      { seccion: S3, titulo: "Infidelidad en la custodia de documentos y violación de secretos", articulos: "arts. 413-418", url: a("a413") },
      { seccion: S4, titulo: "Cohecho y tráfico de influencias", articulos: "arts. 419-431", url: a("a419") },
      { seccion: S5, titulo: "Malversación, fraudes, exacciones y negociaciones prohibidas", articulos: "arts. 432-445", url: a("a432") },
    ],
  },
  vinculo: { oposicion: POLICIA.oposicion, bloqueId: POLICIA.bloqueParte2, numero: 25 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Prevaricación administrativa (art. 404)", "Autoridad o funcionario que, a sabiendas de su injusticia, dicta una resolución arbitraria en un asunto administrativo: inhabilitación especial para empleo o cargo público y sufragio pasivo de 9 a 15 años"],
        ["Nombramiento ilegal (art. 405)", "Proponer, nombrar o dar posesión a sabiendas a quien no reúne los requisitos legales: multa de 3 a 8 meses y suspensión de 1 a 3 años; quien acepta sabiéndolo, misma multa (art. 406)"],
        ["Abandono de destino (art. 407.1)", "Abandonar el destino para no impedir o perseguir delitos de los Títulos XXI a XXIV: prisión de 1 a 4 años e inhabilitación absoluta de 6 a 10; para otros delitos, inhabilitación especial de 1 a 3 años"],
        ["Omisión del deber de perseguir delitos (art. 408)", "Autoridad o funcionario que, faltando a su obligación, deja intencionadamente de promover la persecución de delitos o de sus responsables: inhabilitación especial de 6 meses a 2 años"],
        ["Abandono colectivo de un servicio público (art. 409)", "Promoverlo, dirigirlo u organizarlo: multa de 8 a 12 meses y suspensión de 6 meses a 2 años; tomar parte en el de un servicio esencial con grave perjuicio: multa de 8 a 12 meses"],
      ],
      preguntas: [
        ["media", "Dictar a sabiendas una resolución arbitraria en un asunto administrativo es…", ["Prevaricación administrativa", "Cohecho", "Malversación"], "Art. 404."],
        ["media", "¿Qué pena tiene la prevaricación administrativa del art. 404?", ["Inhabilitación especial de nueve a quince años", "Prisión de tres a seis años", "Multa de tres a ocho meses"], "Art. 404."],
        ["media", "El agente que, teniendo noticia de un delito, deja intencionadamente de promover su persecución, comete…", ["Omisión del deber de perseguir delitos (art. 408)", "Prevaricación", "Nada"], "Art. 408."],
        ["dificil", "El funcionario que abandona su destino para no perseguir un delito de rebelión (Título XXI y siguientes) es castigado con…", ["Prisión de uno a cuatro años e inhabilitación absoluta de seis a diez", "Solo multa", "Inhabilitación especial de uno a tres años"], "Art. 407.1."],
        ["media", "¿Responde quien acepta un nombramiento sabiendo que no reúne los requisitos legales?", ["Sí, con la misma multa del art. 405", "No", "Solo el que lo nombra"], "Art. 406."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Desobediencia de funcionarios (art. 410.1)", "Negarse abiertamente a cumplir resoluciones judiciales u órdenes de la autoridad superior dictadas en su competencia y con las formalidades legales: multa de 3 a 12 meses e inhabilitación de 6 meses a 2 años"],
        ["Límite de la obediencia (art. 410.2)", "No hay responsabilidad por no cumplir un mandato que constituya una infracción manifiesta, clara y terminante de la ley o de una disposición general"],
        ["Desobediencia tras suspender una orden (art. 411)", "Desobedecer tras haber desaprobado el superior la suspensión: multa de 12 a 24 meses e inhabilitación de 1 a 3 años"],
        ["Denegación de auxilio a la Justicia (art. 412.1)", "Funcionario que, requerido por autoridad competente, no presta el auxilio debido: multa de 3 a 12 meses y suspensión de 6 meses a 2 años"],
        ["Si el requerido es agente de la autoridad (art. 412.2)", "Multa de 12 a 18 meses y suspensión de 2 a 3 años"],
        ["Denegación de auxilio a un particular (art. 412.3)", "Para evitar un delito contra la vida: multa de 18 a 24 meses e inhabilitación de 3 a 6 años; contra la integridad, libertad sexual, salud o libertad: multa de 12 a 18 meses y suspensión de 1 a 3 años; otros: multa de 3 a 12 meses"],
      ],
      preguntas: [
        ["media", "¿Comete desobediencia el funcionario que se niega a cumplir una orden que constituye una infracción manifiesta, clara y terminante de la ley?", ["No", "Sí", "Solo si es policía"], "Art. 410.2."],
        ["media", "El agente de la autoridad que, requerido por un juez, no presta el auxilio debido, es castigado con…", ["Multa de 12 a 18 meses y suspensión de dos a tres años", "Prisión de uno a cuatro años", "Solo sanción disciplinaria"], "Art. 412.2."],
        ["dificil", "El policía que, requerido por un particular para evitar un homicidio, se abstiene de auxiliar, es castigado con…", ["Multa de 18 a 24 meses e inhabilitación especial de tres a seis años", "Multa de tres a doce meses", "Prisión permanente"], "Art. 412.3."],
        ["media", "La desobediencia del art. 410 exige que la orden se haya dictado…", ["Dentro del ámbito de competencia y con las formalidades legales", "Verbalmente siempre", "Por cualquier ciudadano"], "Art. 410.1."],
        ["media", "Si el requerimiento del particular es para evitar un delito contra la libertad sexual, la pena es…", ["Multa de 12 a 18 meses y suspensión de uno a tres años", "Multa de 18 a 24 meses", "Ninguna"], "Art. 412.3, párrafo segundo."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Infidelidad en la custodia de documentos (art. 413)", "Sustraer, destruir, inutilizar u ocultar a sabiendas documentos cuya custodia tiene por razón del cargo: prisión de 1 a 4 años, multa de 7 a 24 meses e inhabilitación de 3 a 6 años"],
        ["Destrucción de medios que restringen el acceso (art. 414)", "Funcionario: prisión de 6 meses a 1 año o multa; particular: multa de 6 a 18 meses"],
        ["Acceso a documentos secretos (art. 415)", "Acceder o permitir acceder sin autorización a documentos secretos confiados por el cargo: multa de 6 a 12 meses e inhabilitación de 1 a 3 años"],
        ["Particulares encargados accidentalmente (art. 416)", "Penas de prisión o multa inmediatamente inferiores"],
        ["Revelación de secretos por funcionario (art. 417.1)", "Revelar secretos o informaciones conocidos por el cargo que no deban divulgarse: multa de 12 a 18 meses e inhabilitación de 1 a 3 años; con grave daño, prisión de 1 a 3 años"],
        ["Secretos de un particular (art. 417.2)", "Prisión de 2 a 4 años, multa de 12 a 18 meses y suspensión de 1 a 3 años"],
        ["Aprovechamiento por particular (art. 418)", "El particular que aprovecha el secreto o información privilegiada obtenida de un funcionario: multa del tanto al triplo del beneficio"],
      ],
      preguntas: [
        ["media", "El agente que hace desaparecer a sabiendas un atestado cuya custodia tiene encomendada comete…", ["Infidelidad en la custodia de documentos (art. 413)", "Hurto", "Desobediencia"], "Art. 413."],
        ["media", "Revelar información de un expediente policial que no deba divulgarse es delito del…", ["Art. 417", "Art. 404", "Art. 410"], "Art. 417.1."],
        ["dificil", "Si el funcionario revela secretos de un particular, la pena es…", ["Prisión de dos a cuatro años, multa y suspensión", "Multa de 12 a 18 meses solo", "Inhabilitación de nueve a quince años"], "Art. 417.2."],
        ["media", "El particular que aprovecha para sí la información privilegiada obtenida de un funcionario…", ["Comete el delito del art. 418", "No comete delito", "Comete cohecho siempre"], "Art. 418."],
        ["media", "Pena del art. 413…", ["Prisión de uno a cuatro años, multa e inhabilitación de tres a seis años", "Multa de seis a doce meses", "Suspensión de un año"], "Art. 413."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Cohecho propio (art. 419)", "Recibir o solicitar dádiva o aceptar promesa para realizar un acto contrario a los deberes del cargo o no realizar o retrasar el debido: prisión de 3 a 6 años, multa e inhabilitación de 9 a 12 años"],
        ["Cohecho para un acto propio del cargo (art. 420)", "Prisión de 2 a 4 años, multa e inhabilitación de 5 a 9 años"],
        ["Cohecho como recompensa (art. 421)", "Las mismas penas si la dádiva se recibe o solicita como recompensa por la conducta"],
        ["Cohecho de facilitación (art. 422)", "Admitir dádiva o regalo ofrecido en consideración al cargo o función: prisión de 6 meses a 1 año y suspensión de 1 a 3 años"],
        ["Cohecho del particular (art. 424)", "Quien ofrece o entrega la dádiva sufre las mismas penas de prisión y multa que la autoridad o funcionario corrompido"],
        ["Exención del particular (art. 426)", "Queda exento si accedió ocasionalmente a la solicitud del funcionario y lo denuncia antes de abrirse el procedimiento y en un plazo no superior a dos meses"],
        ["Tráfico de influencias por funcionario (art. 428)", "Influir en otro funcionario prevaliéndose del cargo o relación jerárquica para obtener una resolución con beneficio económico: prisión de 6 meses a 2 años, multa e inhabilitación de 5 a 9 años"],
        ["Tráfico de influencias por particular (art. 429)", "Influir prevaliéndose de una relación personal: prisión de 6 meses a 2 años, multa y prohibición de contratar con el sector público"],
        ["Vendedores de influencias (art. 430)", "Ofrecerse a influir solicitando dádivas: prisión de 6 meses a 1 año"],
      ],
      preguntas: [
        ["media", "El agente que acepta dinero para no denunciar una infracción que debía denunciar comete…", ["Cohecho del art. 419", "Cohecho del art. 422", "Prevaricación"], "Art. 419: no realizar el acto debido."],
        ["media", "Pena del cohecho del art. 419…", ["Prisión de tres a seis años, multa e inhabilitación de nueve a doce", "Prisión de seis meses a un año", "Multa solo"], "Art. 419."],
        ["media", "Admitir un regalo ofrecido en consideración al cargo, sin pedir nada a cambio, es…", ["Cohecho del art. 422", "No es delito", "Malversación"], "Art. 422."],
        ["media", "El particular que ofrece dinero al funcionario para que realice un acto contrario a sus deberes…", ["Sufre las mismas penas de prisión y multa que el funcionario", "No comete delito", "Solo comete infracción administrativa"], "Art. 424.1."],
        ["dificil", "¿Cuándo queda exento el particular que pagó una dádiva solicitada por un funcionario?", ["Si accedió ocasionalmente y lo denuncia antes del procedimiento y dentro de dos meses", "Siempre que lo confiese en el juicio", "Nunca"], "Art. 426."],
        ["media", "Influir en un funcionario prevaliéndose de una relación personal para obtener una resolución con beneficio económico es…", ["Tráfico de influencias", "Cohecho de facilitación", "Desobediencia"], "Art. 429."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["Malversación (art. 432.1)", "Apropiarse con ánimo de lucro, o consentir que un tercero se apropie, del patrimonio público a su cargo: prisión de 2 a 6 años e inhabilitación de 6 a 10 años"],
        ["Malversación agravada (art. 432.2)", "Prisión de 4 a 8 años e inhabilitación absoluta de 10 a 20 años: daño grave al servicio, perjuicio de más de 50.000 euros, bienes culturales o destinados a aliviar una calamidad; más de 250.000 euros: mitad superior"],
        ["Malversación atenuada (art. 432.3)", "Si el perjuicio es inferior a 4.000 euros: prisión de 1 a 2 años, multa e inhabilitación de 1 a 5 años"],
        ["Uso privado del patrimonio público (art. 432 bis)", "Destinarlo a usos privados sin ánimo de apropiárselo: prisión de 6 meses a 3 años y suspensión; si no se reintegra en 10 días desde la incoación, penas del art. 432"],
        ["Patrimonio público (art. 433 ter)", "Todo el conjunto de bienes y derechos de contenido económico-patrimonial pertenecientes a las Administraciones públicas"],
        ["Atenuación por reparación o colaboración (art. 434)", "Pena inferior en uno o dos grados si se repara íntegramente el perjuicio antes del juicio oral o se colabora activa y eficazmente"],
        ["Exacciones ilegales (art. 437)", "Exigir derechos, tarifas o minutas no debidos o en cuantía mayor: multa de 6 a 24 meses y suspensión de 6 meses a 4 años"],
        ["Negociaciones prohibidas (art. 439)", "Aprovechar su intervención en un contrato o asunto para forzar o facilitarse participación en él: prisión de 6 meses a 2 años"],
        ["Solicitud sexual por funcionario (art. 443.1)", "Solicitar sexualmente a quien tiene pretensiones pendientes de su resolución: prisión de 1 a 2 años e inhabilitación absoluta de 6 a 12 años"],
        ["Actos preparatorios en el Título XIX (art. 445)", "Provocación, conspiración y proposición: pena inferior en uno o dos grados"],
      ],
      preguntas: [
        ["media", "El funcionario que se apropia con ánimo de lucro de fondos públicos a su cargo comete…", ["Malversación", "Hurto", "Apropiación indebida común"], "Art. 432.1."],
        ["media", "Usar el vehículo policial para fines privados, sin ánimo de apropiárselo, es…", ["Uso privado del patrimonio público (art. 432 bis)", "Malversación del art. 432.1", "No es delito"], "Art. 432 bis."],
        ["dificil", "Si la malversación causa un perjuicio inferior a 4.000 euros, la pena es…", ["Prisión de uno a dos años, multa e inhabilitación de uno a cinco años", "Prisión de cuatro a ocho años", "No es delito"], "Art. 432.3."],
        ["media", "Si el malversador repara íntegramente el perjuicio antes del juicio oral…", ["Se impone la pena inferior en uno o dos grados", "Queda exento", "No tiene efecto"], "Art. 434."],
        ["media", "Exigir a un ciudadano una tasa que no se debe es…", ["Exacción ilegal (art. 437)", "Cohecho", "Estafa común"], "Art. 437."],
        ["dificil", "Solicitar sexualmente a una persona que tiene un expediente pendiente de la resolución del funcionario se castiga con…", ["Prisión de uno a dos años e inhabilitación absoluta de seis a doce", "Multa", "Suspensión de un año"], "Art. 443.1."],
      ],
    },
  ],
  glosario: [
    [S1, "Prevaricación", "Dictar a sabiendas una resolución injusta o arbitraria."],
    [S2, "Denegación de auxilio", "Negarse el funcionario a prestar el auxilio debido cuando se le requiere."],
    [S3, "Información privilegiada", "Información concreta conocida exclusivamente por razón del cargo y no divulgada (art. 442)."],
    [S4, "Cohecho", "Soborno: recibir, solicitar u ofrecer dádivas en relación con el ejercicio del cargo público."],
    [S4, "Tráfico de influencias", "Influir en un funcionario prevaliéndose de una relación para obtener una resolución con beneficio económico."],
    [S5, "Malversación", "Apropiación o desvío del patrimonio público por quien lo tiene a su cargo."],
    [S5, "Exacción ilegal", "Cobro de derechos o tarifas no debidos o superiores a los legales."],
  ],
  casos: [
    {
      slug: "caso-agente-acepta-dinero-multa",
      titulo: "Un agente que acepta dinero",
      supuesto: "Durante un servicio de tráfico, un agente para a un conductor que nunca ha obtenido el permiso de conducción (delito del art. 384). El conductor le ofrece 200 euros para que no instruya diligencias, y el agente los acepta y lo deja marchar. Semanas después, un comerciante le regala una cesta navideña de gran valor «por lo bien que vigila la calle».",
      preguntas: [
        [S4, "media", "Aceptar dinero para no formular la denuncia debida es cohecho del…", ["Art. 419", "Art. 420", "Art. 422"], "Art. 419: no realizar el acto que debía practicar."],
        [S4, "media", "El conductor que ofreció el dinero…", ["Sufre las mismas penas de prisión y multa que el agente", "No comete delito", "Comete solo infracción de tráfico"], "Art. 424.1."],
        [S4, "media", "Aceptar la cesta ofrecida en consideración a su función, sin contraprestación pactada, es…", ["Cohecho del art. 422", "No es delito", "Prevaricación"], "Art. 422."],
        [S4, "media", "Pena del art. 422…", ["Prisión de seis meses a un año y suspensión de uno a tres años", "Prisión de tres a seis años", "Multa del tanto al triplo"], "Art. 422."],
        [S1, "media", "Dejar intencionadamente de promover la persecución de una infracción penal conocida sería además…", ["Omisión del deber de perseguir delitos del art. 408", "Nada", "Desobediencia"], "Art. 408."],
        [S4, "dificil", "Si el agente hubiera pedido el dinero y el conductor lo hubiera pagado ocasionalmente, ¿cuándo quedaría exento el conductor?", ["Si lo denuncia antes del procedimiento y dentro de dos meses", "Nunca", "Si paga la multa después"], "Art. 426."],
        [S4, "media", "Si el dinero se hubiera entregado después como recompensa por no denunciar…", ["Se aplicarían igualmente las penas del cohecho", "No habría delito", "Sería solo un regalo"], "Art. 421."],
        [S4, "media", "¿Es el agente funcionario público a efectos penales?", ["Sí", "No", "Solo si es mando"], "Arts. 24.2 y 431."],
        [S3, "media", "Si el agente destruyera después el boletín ya iniciado cuya custodia tenía, cometería…", ["Infidelidad en la custodia de documentos (art. 413)", "Nada", "Daños"], "Art. 413."],
        [S4, "dificil", "La pena de inhabilitación especial en el cohecho del art. 419 es de…", ["Nueve a doce años", "Cinco a nueve años", "Uno a tres años"], "Art. 419."],
      ],
    },
    {
      slug: "caso-orden-ilegal-superior",
      titulo: "Una orden manifiestamente ilegal",
      supuesto: "Un mando ordena por escrito a una patrulla que retire de la vía pública a un grupo de personas que se concentran pacíficamente con la debida comunicación, sin causa legal alguna. Uno de los agentes se niega. Días antes, otro agente se negó a cumplir un mandamiento judicial de auxilio para practicar un desalojo ordenado por el juzgado.",
      preguntas: [
        [S2, "media", "¿Comete delito el agente que se niega a cumplir una orden que es infracción manifiesta, clara y terminante de la ley?", ["No", "Sí, desobediencia", "Sí, prevaricación"], "Art. 410.2."],
        [S2, "media", "El agente que se negó a prestar el auxilio requerido por el juzgado puede cometer…", ["Denegación de auxilio a la Administración de Justicia", "Nada", "Prevaricación judicial"], "Art. 412."],
        [S2, "media", "Al ser agente de la autoridad, la pena por esa denegación es…", ["Multa de 12 a 18 meses y suspensión de dos a tres años", "Multa de tres a doce meses", "Prisión"], "Art. 412.2."],
        [S2, "media", "Para que haya desobediencia del art. 410, la orden debe estar…", ["Dictada en el ámbito de competencia y revestida de las formalidades legales", "Firmada por el alcalde", "Publicada en el BOE"], "Art. 410.1."],
        [S1, "dificil", "El mando que dicta a sabiendas una orden arbitraria en un asunto administrativo podría cometer…", ["Prevaricación del art. 404", "Cohecho", "Nada"], "Art. 404."],
        [S2, "media", "Si un agente suspende una orden y, desaprobada la suspensión por el superior, la desobedece por motivos distintos de su ilegalidad manifiesta…", ["Delito del art. 411", "No es delito", "Abandono de destino"], "Art. 411."],
        [S1, "media", "Si varios agentes promovieran y organizaran el abandono colectivo y manifiestamente ilegal del servicio…", ["Delito del art. 409", "Nada", "Rebelión"], "Art. 409."],
        [S2, "media", "Pena de la desobediencia del art. 410.1…", ["Multa de tres a doce meses e inhabilitación especial de seis meses a dos años", "Prisión de tres a seis años", "Suspensión de un mes"], "Art. 410.1."],
        [S1, "media", "Si el agente abandonara su destino para no impedir un delito común, la pena sería…", ["Inhabilitación especial de uno a tres años", "Prisión de uno a cuatro años", "Nada"], "Art. 407.1, segundo inciso."],
        [S2, "dificil", "Si un particular requiere a un agente para evitar un robo (otro delito) y este se abstiene, la pena es…", ["Multa de tres a doce meses y suspensión de seis meses a dos años", "Multa de 18 a 24 meses", "Ninguna"], "Art. 412.3, párrafo tercero."],
      ],
    },
    {
      slug: "caso-combustible-patrulla-uso-privado",
      titulo: "La tarjeta de combustible",
      supuesto: "Una auditoría descubre que un agente de un servicio municipal ha estado repostando su coche particular con la tarjeta de combustible del Ayuntamiento durante meses, por un total de 3.200 euros. Otro funcionario utilizaba los fines de semana un vehículo municipal para ir a su segunda residencia y lo devolvía el lunes.",
      preguntas: [
        [S5, "media", "Pagar con fondos públicos el combustible del coche particular, con ánimo de lucro, es…", ["Malversación", "Hurto", "Estafa común"], "Art. 432.1."],
        [S5, "media", "Al ser el perjuicio inferior a 4.000 euros, la pena es…", ["Prisión de uno a dos años, multa e inhabilitación de uno a cinco años", "Prisión de cuatro a ocho años", "Multa solo"], "Art. 432.3."],
        [S5, "media", "Usar el vehículo municipal para fines privados, sin ánimo de apropiárselo, es…", ["Uso privado del patrimonio público (art. 432 bis)", "Malversación del 432.1", "Atípico"], "Art. 432 bis."],
        [S5, "media", "Pena del art. 432 bis…", ["Prisión de seis meses a tres años y suspensión de uno a cuatro años", "Prisión de dos a seis años", "Multa de seis meses"], "Art. 432 bis."],
        [S5, "dificil", "Si no reintegra lo distraído en los diez días siguientes a la incoación del proceso…", ["Se le imponen las penas del art. 432", "Se archiva", "No cambia nada"], "Art. 432 bis, párrafo segundo."],
        [S5, "media", "¿Qué es patrimonio público a efectos del Código?", ["El conjunto de bienes y derechos de contenido económico-patrimonial de las Administraciones", "Solo el dinero en efectivo", "Solo los inmuebles"], "Art. 433 ter."],
        [S5, "media", "Si el primer agente devuelve íntegramente los 3.200 euros antes del juicio oral…", ["Pena inferior en uno o dos grados", "Queda exento", "Nada"], "Art. 434."],
        [S5, "dificil", "Si la malversación superara los 50.000 euros, la pena sería…", ["Prisión de cuatro a ocho años e inhabilitación absoluta de diez a veinte", "Prisión de dos a seis años", "Prisión de uno a dos años"], "Art. 432.2.b)."],
        [S5, "media", "Si un tercero se apropiara de los fondos con el consentimiento del funcionario…", ["El funcionario también comete malversación", "Solo responde el tercero", "Nadie"], "Art. 432.1: «consintiere que un tercero… se apropie»."],
        [S5, "media", "La conspiración para malversar se castiga con…", ["La pena inferior en uno o dos grados", "La misma pena", "No se castiga"], "Art. 445."],
      ],
    },
  ],
});
