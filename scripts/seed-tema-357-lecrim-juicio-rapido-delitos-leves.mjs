/**
 * Crea tema-357 — Tema 30 de Policía Local: "Del procedimiento para el
 * enjuiciamiento rápido de determinados delitos (Libro IV, Título III), y el
 * procedimiento para el juicio de delitos leves."
 *
 * Fuente: Ley de Enjuiciamiento Criminal (BOE-A-1882-6036), texto
 * consolidado del BOE leído íntegro en los arts. 795 a 803 (juicio rápido;
 * el art. 795 en su redacción de la LO 1/2025, vigente desde el 3-04-2025,
 * que añade el allanamiento de morada y la usurpación) y 962 a 977 (Libro
 * VI, juicio sobre delitos leves, en la redacción de la LO 1/2015 y la Ley
 * 41/2015). El BOE intercala como notas las redacciones anteriores (juicio
 * de faltas); no se usan.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-357-lecrim-juicio-rapido-delitos-leves.mjs
 */
import { sembrarTema, POLICIA } from "./lib/sembrar-tema.mjs";

const LEY = "https://www.boe.es/buscar/act.php?id=BOE-A-1882-6036";
const a = (ancla) => `${LEY}#${ancla}`;
const S1 = "juicio-rapido-ambito";
const S2 = "juicio-rapido-policia-judicial";
const S3 = "juicio-rapido-juzgado-guardia-conformidad";
const S4 = "juicio-delitos-leves";

await sembrarTema({
  tema: {
    slug: "tema-357",
    titulo: "Ley de Enjuiciamiento Criminal: juicio rápido de determinados delitos y juicio sobre delitos leves",
    descripcion: "Ámbito del enjuiciamiento rápido: penas, atestado policial, detenido o citado ante el Juzgado de guardia, y delitos flagrantes, catálogo de delitos o instrucción sencilla; concepto legal de flagrancia; exclusiones; diligencias de la Policía Judicial (informes médicos, abogado, citaciones, análisis de sustancias, alcoholemia y drogas, tasación), atestado de cinco días; diligencias urgentes del Juzgado de guardia; resoluciones, apertura del juicio oral y señalamiento en quince días; conformidad con reducción de un tercio; juicio oral, sentencia y apelación; juicio sobre delitos leves: citaciones inmediatas por la policía, sobreseimiento por escasa gravedad, celebración inmediata o en siete días, asistencia de abogado, multa por incomparecencia, desarrollo del juicio, sentencia y apelación.",
    contenido: "Recorre los dos procedimientos de la LECrim en los que el atestado y las citaciones de la Policía Local son decisivos: el juicio rápido (arts. 795 a 803), para delitos con pena de hasta cinco años cuando hay detenido o denunciado citado ante el juzgado de guardia y el delito es flagrante, figura en la lista legal o es de instrucción sencilla; y el juicio sobre delitos leves (arts. 962 a 977), en el que la policía cita directamente a todos ante el juzgado de guardia.",
    enlaces_boe: [{ url: LEY, titulo: "Real Decreto de 14 de septiembre de 1882, Ley de Enjuiciamiento Criminal (BOE-A-1882-6036)" }],
    indice_estudio: [
      { seccion: S1, titulo: "Juicio rápido: ámbito de aplicación", articulos: "art. 795", url: a("a795") },
      { seccion: S2, titulo: "Juicio rápido: actuaciones de la Policía Judicial", articulos: "art. 796", url: a("a796") },
      { seccion: S3, titulo: "Juicio rápido: Juzgado de guardia, juicio oral, conformidad y sentencia", articulos: "arts. 797-803", url: a("a797") },
      { seccion: S4, titulo: "Procedimiento para el juicio sobre delitos leves", articulos: "arts. 962-977", url: a("a962") },
    ],
  },
  vinculo: { oposicion: POLICIA.oposicion, bloqueId: POLICIA.bloqueParte2, numero: 30 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Límite de pena del juicio rápido (art. 795.1)", "Delitos con pena privativa de libertad de hasta cinco años o con otras penas (únicas, conjuntas o alternativas) de hasta diez años, cualquiera que sea su cuantía"],
        ["Requisitos procesales (art. 795.1)", "Proceso incoado por atestado policial, y que la Policía Judicial haya detenido y puesto a disposición del juzgado de guardia a una persona o la haya citado ante él como denunciada"],
        ["Circunstancias alternativas (art. 795.1)", "1.ª delito flagrante; 2.ª delito del catálogo legal; 3.ª hecho cuya instrucción se presuma sencilla"],
        ["Delito flagrante (art. 795.1.1.ª)", "El que se está cometiendo o se acaba de cometer cuando el delincuente es sorprendido en el acto, detenido o perseguido inmediatamente después sin perderlo de vista, o sorprendido inmediatamente después con efectos, instrumentos o vestigios"],
        ["Catálogo del art. 795.1.2.ª (I)", "Lesiones, coacciones, amenazas o violencia habitual sobre personas del art. 173.2 CP; hurto; robo; hurto y robo de uso de vehículos; delitos contra la seguridad del tráfico"],
        ["Catálogo del art. 795.1.2.ª (II)", "Daños del art. 263 CP; salud pública del art. 368 inciso segundo (drogas que no causan grave daño); propiedad intelectual e industrial flagrantes; allanamiento de morada (art. 202) y usurpación (art. 245), añadidos por la LO 1/2025"],
        ["Exclusiones (art. 795.2-3)", "No se aplica a delitos conexos con otros no comprendidos, ni cuando proceda el secreto de las actuaciones"],
        ["Derecho supletorio (art. 795.4)", "Las normas del procedimiento abreviado (Título II del Libro IV)"],
      ],
      preguntas: [
        ["media", "El juicio rápido se aplica a delitos castigados con pena privativa de libertad que no exceda de…", ["Cinco años", "Tres años", "Diez años"], "Art. 795.1."],
        ["media", "Para el juicio rápido, el proceso debe incoarse en virtud de…", ["Un atestado policial", "Una querella del ofendido", "Una denuncia anónima"], "Art. 795.1."],
        ["media", "¿Cuál de estos delitos está en el catálogo del juicio rápido?", ["El robo", "El homicidio", "La malversación"], "Art. 795.1.2.ª.c)."],
        ["media", "Al delincuente sorprendido inmediatamente después del delito con efectos o instrumentos que permitan presumir su participación se le considera…", ["Delincuente in fraganti", "Simple sospechoso sin flagrancia", "Testigo"], "Art. 795.1.1.ª."],
        ["dificil", "¿Se aplica el juicio rápido si procede acordar el secreto de las actuaciones?", ["No", "Sí", "Solo si hay detenido"], "Art. 795.3."],
        ["dificil", "¿Qué delitos añadió la LO 1/2025 al catálogo del juicio rápido?", ["El allanamiento de morada del art. 202 y la usurpación del art. 245", "El homicidio y el asesinato", "La estafa y la apropiación indebida"], "Art. 795.1.2.ª, letras i) y j)."],
        ["media", "Los delitos contra la seguridad del tráfico, ¿pueden tramitarse por juicio rápido?", ["Sí, están en el catálogo", "No", "Solo si hay muertos"], "Art. 795.1.2.ª.e)."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Cuándo actúa la policía (art. 796.1)", "En el tiempo imprescindible y, en todo caso, durante el tiempo de la detención"],
        ["Informe médico (art. 796.1.1.ª)", "Solicita copia del informe de asistencia al ofendido y, si no puede desplazarse, la presencia del médico forense"],
        ["Información al denunciado (art. 796.1.2.ª)", "Del derecho a comparecer ante el juzgado de guardia asistido de abogado; si no manifiesta expresamente su voluntad, se pide al Colegio un letrado de oficio"],
        ["Citaciones (art. 796.1.3.ª-5.ª)", "Al denunciado no detenido, a los testigos y a las entidades responsables civiles del art. 117 CP, con apercibimiento de las consecuencias de no comparecer; no es necesario citar a los agentes cuya declaración conste en el atestado"],
        ["Sustancias aprehendidas (art. 796.1.6.ª)", "Se remiten al Instituto de Toxicología, de Medicina Legal o laboratorio; si no llega a tiempo, la Policía Judicial puede analizarlas por sí misma con control judicial"],
        ["Pruebas de drogas a conductores (art. 796.1.7.ª)", "Las realizan agentes de la policía judicial de tráfico con formación específica; si el test salival es positivo o hay signos, el conductor debe facilitar saliva para análisis en laboratorio homologado con cadena de custodia; puede pedir contraste de sangre u orina"],
        ["Tasación (art. 796.1.8.ª)", "Si un objeto no puede remitirse al juzgado, se pide al perito que lo examine; el informe puede emitirse oralmente"],
        ["Autor no detenido pero identificable (art. 796.4)", "Se continúan las investigaciones en un único atestado que se remite al juzgado de guardia al detenerlo o citarlo, y en todo caso en cinco días"],
      ],
      preguntas: [
        ["media", "En el juicio rápido, la policía debe practicar sus diligencias…", ["En el tiempo imprescindible y, en todo caso, durante el tiempo de la detención", "En el plazo de un mes", "Cuando lo ordene el juez"], "Art. 796.1."],
        ["media", "Si el denunciado no manifiesta expresamente que quiere comparecer con abogado, la Policía Judicial…", ["Recaba del Colegio de Abogados la designación de un letrado de oficio", "Lo cita sin abogado", "No lo cita"], "Art. 796.1.2.ª."],
        ["media", "¿Es necesario citar ante el juzgado de guardia a los agentes cuya declaración consta en el atestado?", ["No", "Sí, siempre", "Solo al jefe de la unidad"], "Art. 796.1.4.ª."],
        ["dificil", "Si no hay detenido pero se prevé la rápida identificación del autor, el atestado se remitirá al juzgado de guardia en todo caso dentro de…", ["Los cinco días siguientes", "Las 24 horas", "Un mes"], "Art. 796.4."],
        ["media", "¿Quién realiza las pruebas de detección de drogas a los conductores?", ["Agentes de la policía judicial de tráfico con formación específica", "Cualquier ciudadano", "El médico de familia"], "Art. 796.1.7.ª."],
        ["media", "Ante un test salival positivo, el conductor…", ["Está obligado a facilitar saliva suficiente para su análisis en laboratorio homologado", "Puede marcharse", "Debe pagar una multa en el acto"], "Art. 796.1.7.ª."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Diligencias urgentes (art. 797)", "El juzgado de guardia, recibido el atestado, incoa diligencias urgentes (auto irrecurrible) y practica: antecedentes penales, informes periciales y forenses, tasación, declaraciones, rueda de reconocimiento, careos y demás diligencias posibles"],
        ["Prueba anticipada (art. 797.2)", "Si es de temer que una prueba no podrá practicarse en el juicio oral, el juez de guardia la practica inmediatamente con contradicción y la documenta"],
        ["Resoluciones del juez de guardia (art. 798.2)", "Si las diligencias bastan, auto oral irrecurrible para seguir el procedimiento; si no, continuación como diligencias previas del procedimiento abreviado; si el hecho es delito leve, enjuiciamiento inmediato"],
        ["Plazo de las diligencias (art. 799)", "Durante el servicio de guardia; prorrogable 72 horas en partidos con guardia no permanente de más de 24 horas"],
        ["Señalamiento del juicio oral (art. 800.3)", "En la fecha más próxima posible y, en todo caso, dentro de los quince días siguientes"],
        ["Conformidad ante el juzgado de guardia (art. 801)", "Sin acusación particular, delito con pena de hasta 3 años de prisión, multa o pena distinta de hasta 10 años, y pena pedida que, reducida en un tercio, no supere 2 años: sentencia de conformidad con la pena reducida en un tercio"],
        ["Juicio oral y sentencia (art. 802)", "Como en el procedimiento abreviado (sin audiencia preliminar); suspensión, como mucho, a 15 días; sentencia en los tres días siguientes"],
        ["Apelación (art. 803)", "Formalización en cinco días, alegaciones en cinco días, sentencia en tres días tras la vista; tramitación preferente"],
      ],
      preguntas: [
        ["media", "En el juicio rápido, el juicio oral debe señalarse, en todo caso, dentro de los…", ["Quince días siguientes", "Treinta días", "Tres meses"], "Art. 800.3."],
        ["dificil", "Si el acusado presta conformidad ante el juzgado de guardia, la pena solicitada se impone…", ["Reducida en un tercio", "Reducida a la mitad", "Sin reducción"], "Art. 801.2."],
        ["media", "Si el juez de guardia considera insuficientes las diligencias, ordena que el procedimiento continúe como…", ["Diligencias previas del procedimiento abreviado", "Sumario ordinario", "Juicio de delitos leves"], "Art. 798.2.2.º."],
        ["media", "¿En qué plazo se dicta la sentencia del juicio rápido tras la vista?", ["Dentro de los tres días siguientes", "En un mes", "En el acto siempre"], "Art. 802.3."],
        ["dificil", "Uno de los requisitos de la conformidad del art. 801 es que…", ["No se haya constituido acusación particular", "Haya acusación particular", "El delito tenga pena de hasta cinco años"], "Art. 801.1.1.º."],
        ["media", "El plazo para formalizar la apelación contra la sentencia del juicio rápido es de…", ["Cinco días", "Diez días", "Veinte días"], "Art. 803.1.1.ª."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Citación inmediata por la policía (art. 962.1)", "En delitos leves de lesiones o maltrato de obra, hurto flagrante, amenazas, coacciones o injurias, la Policía Judicial cita ante el juzgado de guardia a ofendidos, denunciante, denunciado y testigos, con apercibimientos"],
        ["Apercibimientos de la citación (art. 962.1)", "Consecuencias de no comparecer, que el juicio puede celebrarse inmediatamente aunque no comparezcan y que deben acudir con sus medios de prueba"],
        ["Información al denunciado (art. 962.2)", "Sucintamente de los hechos y del derecho a comparecer con abogado, en todo caso por escrito"],
        ["Sobreseimiento por escasa gravedad (art. 963.1.1.ª)", "A petición del fiscal, si el delito leve es de muy escasa gravedad y no hay interés público relevante; en los patrimoniales, no lo hay si se reparó el daño y no hay denuncia del perjudicado"],
        ["Otros delitos leves (art. 964)", "La policía forma inmediatamente el atestado y lo remite al juzgado de guardia, con el ofrecimiento de acciones al ofendido"],
        ["Si no se celebra en la guardia (art. 965)", "Señalamiento para el día hábil más próximo, en un plazo no superior a siete días"],
        ["Abogado en delitos leves (art. 967.1)", "Pueden ser asistidos si lo desean; si la multa tiene un límite máximo de al menos seis meses, rigen las reglas generales de defensa y representación"],
        ["Incomparecencia injustificada (art. 967.2)", "Partes, testigos y peritos que no comparecen sin justa causa pueden ser multados de 200 a 2.000 euros"],
        ["Ausencia del acusado (art. 971)", "No suspende el juicio si consta citado en forma, salvo que el juez crea necesaria su declaración"],
        ["Sentencia y recursos (arts. 973-977)", "Sentencia al finalizar el juicio o en tres días; apelable en cinco días; contra la sentencia de segunda instancia no cabe recurso"],
      ],
      preguntas: [
        ["media", "En un hurto flagrante leve, la Policía Judicial…", ["Cita de forma inmediata ante el juzgado de guardia a ofendidos, denunciante, denunciado y testigos", "Detiene siempre al autor", "Archiva el asunto"], "Art. 962.1."],
        ["media", "La información al denunciado sobre los hechos y su derecho a abogado se practica…", ["En todo caso por escrito", "Solo verbalmente", "No es necesaria"], "Art. 962.2."],
        ["dificil", "En los delitos leves patrimoniales, no existe interés público relevante en su persecución cuando…", ["Se ha reparado el daño y no hay denuncia del perjudicado", "El autor es menor", "El valor es inferior a 50 euros"], "Art. 963.1.1.ª.b)."],
        ["media", "Si el juicio por delito leve no se celebra durante la guardia, debe señalarse en un plazo no superior a…", ["Siete días", "Quince días", "Un mes"], "Art. 965.1.1.ª."],
        ["media", "Un testigo citado a un juicio por delito leve que no comparece sin justa causa puede ser multado con…", ["De 200 a 2.000 euros", "De 50 a 100 euros", "No puede ser multado"], "Art. 967.2."],
        ["media", "¿Suspende el juicio la ausencia injustificada del acusado citado en forma?", ["No, salvo que el juez crea necesaria su declaración", "Sí, siempre", "Solo si es extranjero"], "Art. 971."],
        ["media", "La sentencia del juicio sobre delitos leves es apelable en el plazo de…", ["Cinco días", "Diez días", "Tres días"], "Art. 976.1."],
      ],
    },
  ],
  glosario: [
    [S1, "Juicio rápido", "Procedimiento para enjuiciar en pocos días determinados delitos de hasta cinco años de prisión iniciados por atestado policial."],
    [S1, "Flagrancia", "Situación en la que el delito se está cometiendo o se acaba de cometer y el autor es sorprendido."],
    [S2, "Atestado", "Documento en el que la policía recoge las diligencias practicadas sobre un hecho delictivo."],
    [S2, "Test indiciario salival", "Prueba inicial de detección de drogas en conductores, a la que obligatoriamente deben someterse."],
    [S3, "Diligencias urgentes", "Actuaciones del juzgado de guardia en el juicio rápido."],
    [S3, "Conformidad", "Aceptación por el acusado de la acusación y la pena, que en el juicio rápido reduce la pena en un tercio."],
    [S4, "Delito leve", "Infracción castigada con pena leve; sustituyó a las antiguas faltas desde 2015."],
    [S4, "Juzgado de guardia", "Juzgado de instrucción que atiende las actuaciones urgentes en turno de guardia."],
  ],
  casos: [
    {
      slug: "caso-juicio-rapido-alcoholemia",
      titulo: "Un conductor ebrio al juzgado de guardia",
      supuesto: "La Policía Local interviene en un control y un conductor da una tasa de alcohol superior a la penal. No se le detiene: se instruye atestado y se le cita para comparecer ante el juzgado de guardia. En el control, un agente fue testigo de su forma de conducir.",
      preguntas: [
        [S1, "media", "¿Puede tramitarse por juicio rápido?", ["Sí: delito contra la seguridad del tráfico, atestado y denunciado citado ante el juzgado de guardia", "No, porque no hay detenido", "No, es un delito leve"], "Art. 795.1."],
        [S2, "media", "La policía debe informar al conductor de su derecho a…", ["Comparecer ante el juzgado de guardia asistido de abogado", "No comparecer", "Elegir el juez"], "Art. 796.1.2.ª."],
        [S2, "media", "¿Hay que citar al agente testigo si su declaración consta en el atestado?", ["No es necesario", "Sí, siempre", "Solo si lo pide el conductor"], "Art. 796.1.4.ª."],
        [S2, "media", "Al citar al conductor, se le apercibirá de…", ["Las consecuencias de no comparecer", "Que perderá el vehículo", "Nada"], "Art. 796.1.3.ª."],
        [S3, "media", "Si presta conformidad ante el juzgado de guardia y se cumplen los requisitos, la pena se reducirá…", ["En un tercio", "A la mitad", "No se reduce"], "Art. 801.2."],
        [S3, "media", "Si las diligencias son suficientes y se abre juicio oral, se señalará dentro de…", ["Quince días", "Un año", "Tres meses"], "Art. 800.3."],
        [S2, "dificil", "Si hubiera dado positivo en un test salival de drogas, ¿qué debería hacer?", ["Facilitar saliva en cantidad suficiente para su análisis en laboratorio homologado", "Nada más", "Firmar una renuncia"], "Art. 796.1.7.ª."],
        [S2, "media", "¿Puede el conductor pedir una prueba de contraste?", ["Sí, análisis de sangre, orina u otras análogas", "No", "Solo si es abogado"], "Art. 796.1.7.ª."],
        [S3, "media", "¿Es recurrible el auto que incoa diligencias urgentes?", ["No", "Sí, en apelación", "Sí, en casación"], "Art. 797.1."],
        [S1, "dificil", "Si el hecho fuera conexo con otro delito no incluido en el ámbito del juicio rápido…", ["No se aplicaría el juicio rápido", "Se aplicaría igual", "Se archivaría"], "Art. 795.2."],
      ],
    },
    {
      slug: "caso-hurto-leve-supermercado",
      titulo: "Un hurto leve en un supermercado",
      supuesto: "Un vigilante sorprende a una mujer saliendo de un supermercado con productos por valor de 45 euros sin pagar. La Policía Local acude; la mujer devuelve los productos y el supermercado manifiesta que no quiere denunciar. Los agentes deben decidir cómo tramitarlo.",
      preguntas: [
        [S4, "media", "Al tratarse de un hurto flagrante leve, la policía…", ["Cita de forma inmediata ante el juzgado de guardia a los implicados y testigos", "Detiene a la mujer en todo caso", "Lo archiva sin más"], "Art. 962.1."],
        [S4, "media", "A la denunciada se le informará de los hechos y de su derecho a abogado…", ["Por escrito", "Solo de palabra", "No es necesario"], "Art. 962.2."],
        [S4, "dificil", "Como se reparó el daño y no hay denuncia del perjudicado, el fiscal puede pedir…", ["El sobreseimiento por no existir interés público relevante", "Prisión", "Juicio rápido"], "Art. 963.1.1.ª."],
        [S4, "media", "Si el juicio no se celebra en la guardia, debe señalarse en un plazo no superior a…", ["Siete días", "Quince días", "Tres meses"], "Art. 965.1.1.ª."],
        [S4, "media", "Si la mujer, citada en forma, no acude al juicio sin justificación…", ["El juicio puede celebrarse igualmente", "Se suspende siempre", "Se archiva"], "Art. 971."],
        [S4, "media", "La sentencia puede dictarse…", ["Al finalizar el juicio o, si no es posible, en los tres días siguientes", "En un mes", "Solo por escrito en diez días"], "Art. 973.1."],
        [S4, "media", "Si el vigilante, citado como testigo, no comparece sin justa causa…", ["Puede ser multado con 200 a 2.000 euros", "No pasa nada", "Es detenido"], "Art. 967.2."],
        [S4, "media", "En las citaciones se pide a los citados…", ["Un correo electrónico y un teléfono para notificaciones, si disponen de ellos", "Su nómina", "Nada"], "Art. 962.1, párrafo segundo."],
        [S4, "dificil", "¿Necesita la mujer abogado obligatoriamente si la multa máxima del delito leve es inferior a seis meses?", ["No, puede ser asistida si lo desea", "Sí, siempre", "Solo si es reincidente"], "Art. 967.1."],
        [S4, "media", "Contra la sentencia de segunda instancia en un juicio por delito leve…", ["No cabe recurso alguno", "Cabe casación", "Cabe amparo directo ante el juez"], "Art. 977."],
      ],
    },
    {
      slug: "caso-robo-movil-persecucion",
      titulo: "Una persecución tras un robo",
      supuesto: "Un joven arrebata un bolso con violencia en la calle Don Jaime. Dos agentes lo ven y lo persiguen sin perderlo de vista hasta detenerlo tres calles más allá con el bolso en la mano. Lo trasladan a dependencias y lo ponen a disposición del juzgado de guardia.",
      preguntas: [
        [S1, "media", "¿Es un delito flagrante a efectos del juicio rápido?", ["Sí: fue perseguido inmediatamente sin que la persecución se suspendiera", "No, porque no se le detuvo en el acto exacto", "Solo si confiesa"], "Art. 795.1.1.ª."],
        [S1, "media", "Además, el robo figura en el catálogo de delitos del…", ["Art. 795.1.2.ª", "Art. 962", "Art. 796.4"], "Art. 795.1.2.ª.c)."],
        [S1, "media", "El robo con violencia tiene pena de prisión de dos a cinco años, por lo que…", ["Entra en el límite de cinco años del juicio rápido", "Excede el límite", "Es delito leve"], "Arts. 242 CP y 795.1 LECrim."],
        [S2, "media", "Si la víctima fue atendida en un centro de salud, la policía solicitará…", ["Copia del informe de asistencia para unirlo al atestado", "Nada", "Su historia clínica completa"], "Art. 796.1.1.ª."],
        [S2, "media", "Si el bolso no puede remitirse al juzgado y debe tasarse…", ["Se pide al perito que lo examine; el informe puede ser oral", "No se tasa", "Lo tasa el detenido"], "Art. 796.1.8.ª."],
        [S3, "media", "Si es de temer que la víctima, turista extranjera, no podrá declarar en el juicio oral…", ["El juez de guardia practica inmediatamente esa prueba con contradicción", "Se renuncia a su declaración", "Se suspende todo"], "Art. 797.2."],
        [S3, "media", "En el juzgado de guardia puede practicarse una rueda de reconocimiento si…", ["Resulta pertinente y ha comparecido el testigo", "Lo decide la policía sola", "Nunca en el juicio rápido"], "Art. 797.1.6.ª."],
        [S3, "dificil", "Para la conformidad en el juzgado de guardia, la pena pedida reducida en un tercio no puede superar…", ["Dos años de prisión", "Tres años", "Cinco años"], "Art. 801.1.3.º."],
        [S3, "media", "Si el juicio oral no puede concluirse en un solo acto, se continuará como máximo dentro de…", ["Los quince días siguientes", "Un mes", "Tres días"], "Art. 802.2."],
        [S3, "media", "El juicio oral del juicio rápido se desarrolla según las normas del…", ["Procedimiento abreviado, salvo la audiencia preliminar", "Sumario ordinario", "Juicio de faltas"], "Art. 802.1."],
      ],
    },
  ],
});
