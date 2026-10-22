/**
 * Crea tema-354 — Tema 27 de Policía Local: "Delitos contra el orden
 * público: De los atentados contra la autoridad, sus agentes y los
 * funcionarios públicos, y de la resistencia y desobediencia (Libro II,
 * Título XXII)."
 *
 * Fuente: Ley Orgánica 10/1995, del Código Penal (BOE-A-1995-25444), texto
 * consolidado del BOE: leídos íntegros los arts. 550 a 556 (Capítulo II del
 * Título XXII, el que cita el temario) y las rúbricas de los demás
 * capítulos del Título para situarlo. Los arts. 552 y 555 están suprimidos
 * desde la LO 1/2015.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-354-codigo-penal-atentados-resistencia-desobediencia.mjs
 */
import { sembrarTema, POLICIA } from "./lib/sembrar-tema.mjs";

const CP = "https://www.boe.es/buscar/act.php?id=BOE-A-1995-25444";
const a = (ancla) => `${CP}#${ancla}`;
const S1 = "atentado";
const S2 = "atentado-agravado-equiparados";
const S3 = "resistencia-desobediencia-falta-respeto";

await sembrarTema({
  tema: {
    slug: "tema-354",
    titulo: "Código Penal: atentados contra la autoridad, sus agentes y los funcionarios públicos, resistencia y desobediencia",
    descripcion: "Estructura del Título XXII (delitos contra el orden público); concepto de atentado: agresión, resistencia grave con intimidación grave o violencia, y acometimiento; atentados contra docentes y sanitarios; penas según se atente contra autoridad, autoridades cualificadas, agentes o funcionarios; atentado agravado por armas, violencia potencialmente peligrosa, vehículo de motor o motín penitenciario; actos preparatorios; extensión a militares de uniforme, a quienes auxilian a la autoridad, a bomberos, sanitarios y equipos de socorro y a seguridad privada; resistencia y desobediencia graves; falta de respeto y consideración a la autoridad.",
    contenido: "Recorre el Capítulo II del Título XXII del Libro II del Código Penal (arts. 550 a 556), el de mayor relevancia práctica para la Policía Local como víctima de estos delitos: qué es atentado (agredir, acometer u oponer resistencia grave con violencia o intimidación grave a la autoridad o a sus agentes en el ejercicio de sus funciones), cuándo se agrava (armas, vehículo, objetos peligrosos), a quién más protege, y cuándo hay solo resistencia o desobediencia grave o una falta de respeto a la autoridad.",
    enlaces_boe: [{ url: CP, titulo: "Ley Orgánica 10/1995, de 23 de noviembre, del Código Penal (BOE-A-1995-25444)" }],
    indice_estudio: [
      { seccion: S1, titulo: "Concepto y penas del atentado", articulos: "art. 550", url: a("a550") },
      { seccion: S2, titulo: "Atentado agravado, actos preparatorios y sujetos equiparados", articulos: "arts. 551, 553 y 554", url: a("a551") },
      { seccion: S3, titulo: "Resistencia, desobediencia y falta de respeto a la autoridad", articulos: "art. 556", url: a("a556") },
    ],
  },
  vinculo: { oposicion: POLICIA.oposicion, bloqueId: POLICIA.bloqueParte2, numero: 27 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Capítulos del Título XXII (delitos contra el orden público)", "I sedición; II atentados, resistencia y desobediencia; III desórdenes públicos; IV disposición común; V tenencia, tráfico y depósito de armas, municiones o explosivos; VI organizaciones y grupos criminales; VII organizaciones y grupos terroristas y terrorismo"],
        ["Atentado (art. 550.1)", "Agredir, o con intimidación grave o violencia oponer resistencia grave, a la autoridad, sus agentes o funcionarios públicos, o acometerlos, cuando se hallen en el ejercicio de sus funciones o con ocasión de ellas"],
        ["Atentados contra docentes y sanitarios (art. 550.1)", "Se consideran en todo caso atentado los cometidos contra funcionarios docentes o sanitarios en el ejercicio de sus funciones o con ocasión de ellas"],
        ["Pena del atentado contra autoridad (art. 550.2)", "Prisión de uno a cuatro años y multa de tres a seis meses"],
        ["Pena del atentado en los demás casos (art. 550.2)", "Contra agentes o funcionarios: prisión de seis meses a tres años"],
        ["Autoridades cualificadas (art. 550.3)", "Miembros del Gobierno y Consejos de Gobierno autonómicos, Cortes y Asambleas autonómicas, Corporaciones locales, CGPJ, magistrados del TC, jueces, magistrados y fiscales: prisión de 1 a 6 años y multa de 6 a 12 meses"],
        ["«En el ejercicio de sus funciones o con ocasión de ellas»", "Protege al agente mientras actúa y también cuando la agresión responde a su actuación profesional, aunque ya no esté de servicio"],
      ],
      preguntas: [
        ["facil", "Agredir a un agente de Policía Local en el ejercicio de sus funciones es…", ["Atentado", "Desobediencia leve", "Desórdenes públicos"], "Art. 550.1."],
        ["media", "El atentado contra un agente de la autoridad (no autoridad) se castiga con prisión de…", ["Seis meses a tres años", "Uno a cuatro años y multa", "Uno a seis años"], "Art. 550.2."],
        ["media", "El atentado contra una autoridad se castiga con…", ["Prisión de uno a cuatro años y multa de tres a seis meses", "Prisión de seis meses a tres años", "Multa de uno a tres meses"], "Art. 550.2."],
        ["media", "Agredir a un concejal en el ejercicio de su cargo (miembro de una Corporación local) se castiga con…", ["Prisión de uno a seis años y multa de seis a doce meses", "Prisión de seis meses a tres años", "Multa"], "Art. 550.3."],
        ["media", "La agresión a un médico de un centro de salud público en el ejercicio de su función es…", ["Atentado en todo caso", "Lesiones solamente", "Desobediencia"], "Art. 550.1, párrafo segundo."],
        ["dificil", "¿Exige el atentado por resistencia que esta sea grave y con intimidación grave o violencia?", ["Sí", "No, basta cualquier resistencia", "Solo si hay armas"], "Art. 550.1."],
        ["media", "¿Qué capítulo del Título XXII regula los atentados?", ["El Capítulo II", "El Capítulo I", "El Capítulo III"], "Título XXII, Capítulo II."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Atentado agravado (art. 551)", "Penas superiores en grado si se cometen: 1.º con armas u objetos peligrosos; 2.º con violencia potencialmente peligrosa para la vida o que pueda causar lesiones graves (objetos contundentes, líquidos inflamables, incendio, explosivos); 3.º acometiendo con un vehículo de motor; 4.º en un motín o incidente colectivo en prisión"],
        ["Actos preparatorios (art. 553)", "Provocación, conspiración y proposición: pena inferior en uno o dos grados"],
        ["Militares de uniforme (art. 554.1)", "Las penas de los arts. 550 y 551 se aplican a los hechos contra miembros de las Fuerzas Armadas que, de uniforme, presten un servicio legalmente encomendado"],
        ["Quienes auxilian a la autoridad (art. 554.2)", "Mismas penas a quienes acometan, empleen violencia o intimiden a las personas que acudan en auxilio de la autoridad o sus agentes"],
        ["Bomberos, sanitarios y equipos de socorro (art. 554.3.a)", "Acometerlos, emplear violencia o intimidarlos gravemente mientras intervienen en un siniestro, calamidad o emergencia, para impedir sus funciones"],
        ["Seguridad privada (art. 554.3.b)", "Personal de seguridad privada debidamente identificado que actúa en cooperación y bajo el mando de las Fuerzas y Cuerpos de Seguridad"],
        ["Artículos suprimidos", "Los arts. 552 y 555 están suprimidos"],
      ],
      preguntas: [
        ["media", "Atropellar intencionadamente a un agente con un coche para escapar de un control supone…", ["Atentado con pena superior en grado (art. 551.3.º)", "Atentado básico", "Desobediencia"], "Art. 551.3.º."],
        ["media", "Lanzar líquidos inflamables contra los agentes es una circunstancia del…", ["Art. 551.2.º", "Art. 556", "Art. 553"], "Art. 551.2.º."],
        ["media", "Intimidar gravemente a unos bomberos que apagan un incendio para impedirles trabajar…", ["Se castiga con las penas del atentado", "No es delito", "Es una falta leve"], "Art. 554.3.a)."],
        ["media", "Agredir al ciudadano que ayuda a un agente a reducir a un detenido es…", ["Delito castigado con las penas del atentado (art. 554.2)", "Lesiones solamente", "Desórdenes"], "Art. 554.2."],
        ["dificil", "¿Se extiende la protección del atentado al vigilante de seguridad privada?", ["Sí, si está identificado y actúa en cooperación y bajo el mando de las FCS", "Sí, siempre", "No, nunca"], "Art. 554.3.b)."],
        ["media", "La conspiración para atentar contra un agente se castiga con…", ["La pena inferior en uno o dos grados", "La misma pena", "No se castiga"], "Art. 553."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Resistencia y desobediencia graves (art. 556.1)", "Quienes, sin estar comprendidos en el art. 550, resistan o desobedezcan gravemente a la autoridad o sus agentes en el ejercicio de sus funciones: prisión de 3 meses a 1 año o multa de 6 a 18 meses"],
        ["Extensión a la seguridad privada (art. 556.1)", "También la resistencia o desobediencia grave al personal de seguridad privada identificado que actúa en cooperación y bajo el mando de las FCS"],
        ["Falta de respeto a la autoridad (art. 556.2)", "Faltar al respeto y consideración debida a la autoridad en el ejercicio de sus funciones: multa de uno a tres meses"],
        ["Diferencia entre resistencia del 550 y del 556", "El atentado exige resistencia grave con intimidación grave o violencia; la del 556 es una resistencia o desobediencia grave sin esos elementos"],
        ["¿A quién se refiere el art. 556.2?", "A la autoridad (no a sus agentes)"],
      ],
      preguntas: [
        ["media", "Negarse reiterada y gravemente a obedecer las órdenes de un agente, sin violencia ni intimidación grave, es…", ["Desobediencia grave del art. 556.1", "Atentado", "No es delito"], "Art. 556.1."],
        ["media", "Pena del art. 556.1…", ["Prisión de tres meses a un año o multa de seis a dieciocho meses", "Prisión de seis meses a tres años", "Multa de uno a tres meses"], "Art. 556.1."],
        ["media", "Faltar al respeto y consideración debida a la autoridad en el ejercicio de sus funciones se castiga con…", ["Multa de uno a tres meses", "Prisión de tres meses a un año", "No es delito"], "Art. 556.2."],
        ["dificil", "¿Qué distingue la resistencia del atentado (art. 550) de la del art. 556?", ["Que la del 550 es grave y con intimidación grave o violencia", "Que la del 556 tiene armas", "No hay diferencia"], "Arts. 550.1 y 556.1."],
        ["media", "¿Protege el art. 556.1 al vigilante de seguridad privada?", ["Sí, si está identificado y actúa en cooperación y bajo mando de las FCS", "No", "Solo en centros comerciales"], "Art. 556.1."],
      ],
    },
  ],
  glosario: [
    [S1, "Atentado", "Agresión, acometimiento o resistencia grave con violencia o intimidación grave contra la autoridad o sus agentes."],
    [S1, "Acometimiento", "Lanzarse o arremeter contra el agente, aunque no llegue a producirse el contacto o la lesión."],
    [S1, "Agente de la autoridad", "Quien, sin ser autoridad, ejecuta las órdenes de esta y vela por el orden y la seguridad, como los policías."],
    [S2, "Objeto peligroso", "Instrumento apto para causar lesiones graves o la muerte; agrava el atentado (art. 551.1.º)."],
    [S3, "Resistencia", "Oposición al cumplimiento de una orden o actuación de la autoridad o de sus agentes."],
    [S3, "Desobediencia", "Incumplimiento de una orden legítima de la autoridad o sus agentes."],
  ],
  casos: [
    {
      slug: "caso-control-trafico-atropello-agente",
      titulo: "Un conductor que embiste en un control",
      supuesto: "En un control de tráfico en la Ronda Hispanidad, un conductor recibe la orden de detenerse. Acelera y embiste a un agente, que se aparta a tiempo y sufre solo una contusión leve. Detenido más adelante, se resiste dando patadas y empujones a los agentes que lo reducen.",
      preguntas: [
        [S2, "media", "Acometer a un agente con un vehículo de motor es…", ["Atentado agravado del art. 551.3.º", "Desobediencia", "Lesiones leves"], "Art. 551.3.º."],
        [S2, "media", "La agravación del art. 551 implica…", ["Las penas superiores en grado a las del art. 550", "La pena inferior en grado", "La misma pena"], "Art. 551."],
        [S1, "media", "El delito se comete aunque el agente no sufra lesiones graves porque…", ["El acometimiento ya es atentado", "Siempre hace falta un resultado", "Solo hay delito si hay muerte"], "Art. 550.1."],
        [S1, "media", "La pena básica del atentado contra un agente es…", ["Prisión de seis meses a tres años", "Prisión de uno a cuatro años", "Multa"], "Art. 550.2."],
        [S1, "media", "Las patadas y empujones durante la detención pueden constituir…", ["Atentado por agresión o resistencia grave con violencia", "Falta de respeto", "Desórdenes"], "Art. 550.1."],
        [S3, "media", "Si se hubiera limitado a no detenerse sin embestir a nadie, podría cometer…", ["Desobediencia grave del art. 556", "Atentado", "Nada"], "Art. 556.1."],
        [S2, "dificil", "Si un ciudadano que ayuda a los agentes a reducirlo recibe un golpe, el autor…", ["Responde con las penas del atentado (art. 554.2)", "Solo por lesiones", "No responde"], "Art. 554.2."],
        [S1, "media", "Para que haya atentado, los agentes deben hallarse…", ["En el ejercicio de sus funciones o con ocasión de ellas", "De uniforme siempre", "Fuera de servicio"], "Art. 550.1."],
        [S2, "media", "Si hubiera acordado antes con otro arremeter contra el control…", ["La conspiración se castiga con pena inferior en uno o dos grados", "No se castiga", "Igual que el atentado"], "Art. 553."],
        [S1, "dificil", "Si la persona embestida fuera el alcalde que presenciaba el control (Corporación local)…", ["Prisión de uno a seis años y multa (base), agravable por el art. 551", "Pena de agente", "No hay atentado"], "Arts. 550.3 y 551."],
      ],
    },
    {
      slug: "caso-agresion-sanitario-urgencias",
      titulo: "Agresiones durante una emergencia",
      supuesto: "En un accidente en la vía pública, un familiar de un herido increpa y empuja violentamente a los sanitarios de una ambulancia y a los bomberos que excarcelan al conductor para que «se den prisa». Cuando llega la Policía Local, insulta a un concejal presente en el lugar y desobedece gravemente las órdenes de los agentes de apartarse.",
      preguntas: [
        [S2, "media", "Emplear violencia contra los bomberos y sanitarios que intervienen en una emergencia, para impedirles sus funciones…", ["Se castiga con las penas del atentado", "Es solo coacción leve", "No es delito"], "Art. 554.3.a)."],
        [S1, "media", "Si los sanitarios fueran funcionarios públicos en el ejercicio de su función, la agresión sería…", ["Atentado en todo caso", "Lesiones", "Desobediencia"], "Art. 550.1, párrafo segundo."],
        [S3, "media", "Desobedecer gravemente a los agentes, sin violencia ni intimidación grave, es…", ["Delito del art. 556.1", "Atentado", "Atípico"], "Art. 556.1."],
        [S3, "media", "Insultar al concejal, autoridad en el ejercicio de sus funciones, puede ser…", ["Falta de respeto y consideración del art. 556.2", "Atentado", "Nada"], "Art. 556.2."],
        [S3, "media", "Pena del art. 556.2…", ["Multa de uno a tres meses", "Prisión de tres meses a un año", "Prisión de seis meses a tres años"], "Art. 556.2."],
        [S3, "dificil", "¿Se aplica el art. 556.2 a las faltas de respeto a los agentes de la autoridad?", ["No, se refiere a la autoridad", "Sí", "Solo de noche"], "Art. 556.2."],
        [S3, "media", "Pena de la desobediencia grave del art. 556.1…", ["Prisión de tres meses a un año o multa de seis a dieciocho meses", "Multa de uno a tres meses", "Prisión de uno a cuatro años"], "Art. 556.1."],
        [S2, "media", "Si hubiera lanzado un objeto contundente contra los agentes…", ["Atentado agravado del art. 551.2.º", "Desobediencia", "Falta de respeto"], "Art. 551.2.º."],
        [S1, "media", "Los delitos de este caso pertenecen al Título…", ["XXII, delitos contra el orden público", "XIX, contra la Administración pública", "XIII, contra el patrimonio"], "Título XXII."],
        [S2, "dificil", "Para aplicar el art. 554.3.a) a bomberos y sanitarios, la violencia o intimidación grave debe tener la finalidad de…", ["Impedirles el ejercicio de sus funciones", "Robarles", "Cualquiera"], "Art. 554.3.a)."],
      ],
    },
    {
      slug: "caso-agente-fuera-servicio-venganza",
      titulo: "Una venganza contra un agente fuera de servicio",
      supuesto: "Un individuo al que un agente denunció semanas atrás lo reconoce en un supermercado, cuando el agente está de compras y fuera de servicio, y le golpea con una botella mientras le grita que es «por la denuncia». El agente sufre una brecha.",
      preguntas: [
        [S1, "media", "¿Puede haber atentado aunque el agente esté fuera de servicio?", ["Sí, si la agresión se produce con ocasión de sus funciones", "No, nunca", "Solo si va uniformado"], "Art. 550.1: «o con ocasión de ellas»."],
        [S2, "media", "Golpear con una botella es usar…", ["Un objeto peligroso, que agrava el atentado", "Un medio inocuo", "Un arma de fuego"], "Art. 551.1.º."],
        [S2, "media", "Con la agravación, la pena será…", ["Superior en grado a la del art. 550", "La básica", "Inferior en grado"], "Art. 551."],
        [S1, "media", "Si no hubiera relación con su actuación profesional, la agresión sería…", ["Un delito de lesiones común, no atentado", "Atentado igualmente", "Falta de respeto"], "Art. 550.1."],
        [S1, "facil", "Un agente de Policía Local es, a efectos del atentado…", ["Agente de la autoridad", "Autoridad", "Particular"], "Art. 550."],
        [S1, "media", "La pena básica del atentado contra agente es…", ["Prisión de seis meses a tres años", "Prisión de uno a cuatro años", "Prisión de uno a seis años"], "Art. 550.2."],
        [S3, "media", "Si solo le hubiera insultado sin agredirle, ¿sería delito del art. 556.2?", ["No, el 556.2 se refiere a la autoridad en el ejercicio de sus funciones", "Sí", "Sería atentado"], "Art. 556.2."],
        [S2, "dificil", "Si hubiera actuado contra un militar de uniforme prestando servicio, ¿se aplicarían las mismas penas?", ["Sí", "No", "Solo multas"], "Art. 554.1."],
        [S1, "media", "Agredir es una de las conductas del atentado junto a…", ["Acometer y oponer resistencia grave con violencia o intimidación grave", "Insultar", "No obedecer"], "Art. 550.1."],
        [S2, "media", "¿Están vigentes los arts. 552 y 555 del Código Penal?", ["No, están suprimidos", "Sí", "Solo el 552"], "Arts. 552 y 555 (suprimidos)."],
      ],
    },
  ],
});
