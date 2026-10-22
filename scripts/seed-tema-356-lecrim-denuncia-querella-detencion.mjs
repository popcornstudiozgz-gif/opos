/**
 * Crea tema-356 — Tema 29 de Policía Local: "Ley de Enjuiciamiento Criminal:
 * De la denuncia. De la querella. De la inspección ocular. Del cuerpo del
 * delito. De la identidad del delincuente. Del informe pericial. De la
 * detención."
 *
 * Fuente: Real Decreto de 14 de septiembre de 1882, Ley de Enjuiciamiento
 * Criminal (BOE-A-1882-6036, título verificado), texto consolidado del BOE
 * leído íntegro en los arts. 259 a 281 (denuncia y querella), 326 a 333
 * (inspección ocular), 334 a 367 septies (cuerpo del delito), 368 a 384
 * (identidad del delincuente), 456 a 485 (informe pericial), 489 a 501
 * (detención) y 520 (forma de la detención y derechos del detenido). Se
 * usa la redacción vigente de los arts. 265 y 266 (RDL 6/2023 y LO 1/2025:
 * contenido de la denuncia y denuncia telemática) y del art. 495 (vigente
 * desde el 4-12-2024: delitos leves). El art. 259 sigue expresando la multa
 * en pesetas; se reproduce tal cual.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-356-lecrim-denuncia-querella-detencion.mjs
 */
import { sembrarTema, POLICIA } from "./lib/sembrar-tema.mjs";

const LEY = "https://www.boe.es/buscar/act.php?id=BOE-A-1882-6036";
const a = (ancla) => `${LEY}#${ancla}`;
const S1 = "denuncia";
const S2 = "querella";
const S3 = "inspeccion-ocular-cuerpo-delito";
const S4 = "identidad-informe-pericial";
const S5 = "detencion";

await sembrarTema({
  tema: {
    slug: "tema-356",
    titulo: "Ley de Enjuiciamiento Criminal: denuncia, querella, inspección ocular, cuerpo del delito, identidad del delincuente, informe pericial y detención",
    descripcion: "Obligación de denunciar y sus excepciones; denuncia por razón del cargo; forma y contenido de la denuncia, denuncia telemática y sus límites; querella: legitimación, requisitos formales, fianza y exenciones; inspección ocular; cuerpo del delito, efectos e incautación, restitución a la víctima; autopsia y médico forense; destrucción y realización de efectos judiciales; reconocimiento en rueda e identificación; informe pericial: peritos titulares y no titulares, número, recusación y contenido; detención por particulares y por la policía, delitos leves, plazos, y derechos del detenido del art. 520.",
    contenido: "Recorre los preceptos de la LECrim que la Policía Local aplica como policía judicial: quién está obligado a denunciar y cómo se hace una denuncia, qué es la querella, cómo se practican la inspección ocular y la recogida de los efectos del delito, el reconocimiento en rueda, el informe pericial, los casos en que cualquier persona o la policía pueden o deben detener, los plazos de 24 y 72 horas, y los derechos que hay que leer al detenido.",
    enlaces_boe: [{ url: LEY, titulo: "Real Decreto de 14 de septiembre de 1882, Ley de Enjuiciamiento Criminal (BOE-A-1882-6036)" }],
    indice_estudio: [
      { seccion: S1, titulo: "De la denuncia", articulos: "arts. 259-269", url: a("a259") },
      { seccion: S2, titulo: "De la querella", articulos: "arts. 270-281", url: a("a270") },
      { seccion: S3, titulo: "De la inspección ocular y del cuerpo del delito", articulos: "arts. 326-367 septies", url: a("a326") },
      { seccion: S4, titulo: "De la identidad del delincuente y del informe pericial", articulos: "arts. 368-384 y 456-485", url: a("a368") },
      { seccion: S5, titulo: "De la detención y derechos del detenido", articulos: "arts. 489-501 y 520", url: a("a489") },
    ],
  },
  vinculo: { oposicion: POLICIA.oposicion, bloqueId: POLICIA.bloqueParte2, numero: 29 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Obligación de denunciar (art. 259)", "Quien presencia un delito público debe ponerlo inmediatamente en conocimiento del juez o fiscal más próximo (el texto mantiene una multa de 25 a 250 pesetas)"],
        ["No obligados por edad o razón (art. 260)", "Los impúberes y los que no gozan del pleno uso de su razón"],
        ["No obligados por parentesco (art. 261)", "Cónyuge no separado o pareja conviviente, ascendientes, descendientes y colaterales hasta el segundo grado, salvo delitos graves contra la vida, lesiones de los arts. 149-150, maltrato habitual, libertad sexual o trata cuando la víctima es menor o persona con discapacidad necesitada de especial protección"],
        ["Denuncia por razón del cargo (art. 262)", "Quienes por su cargo, profesión u oficio conozcan un delito público deben denunciarlo inmediatamente al fiscal, al tribunal, al juez o, si es flagrante, al funcionario de policía más próximo"],
        ["Excepciones del art. 263", "Abogados y procuradores respecto de lo que les confían sus clientes, y ministros de culto por lo revelado en el ejercicio de su ministerio"],
        ["Responsabilidad del denunciante (art. 264)", "No está obligado a probar los hechos ni a formalizar querella; solo responde de los delitos que cometa con la denuncia"],
        ["Forma y contenido (art. 265)", "Por escrito o de palabra, personalmente o por mandatario con poder especial; identificación del denunciante y narración circunstanciada del hecho, y, si se conocen, autores, testigos y fuentes de conocimiento"],
        ["Hechos que no pueden denunciarse por vía telemática (art. 266)", "Los cometidos con violencia o intimidación, con autor conocido, con testigos, si el denunciante es menor, si hay delito flagrante o si son hechos violentos o sexuales"],
        ["Denuncia verbal (art. 267)", "Se extiende un acta en forma de declaración firmada por quien la recibe y el denunciante"],
        ["Tras la denuncia (arts. 268-269)", "Se acredita la identidad del denunciante, se le da resguardo si lo pide y se comprueba el hecho, salvo que no sea delito o la denuncia sea manifiestamente falsa"],
      ],
      preguntas: [
        ["facil", "¿Quién está obligado a denunciar un delito público que presencia?", ["Cualquier persona que lo presencie, salvo las excepciones legales", "Solo los policías", "Solo la víctima"], "Art. 259."],
        ["media", "¿Están obligados a denunciar los impúberes?", ["No", "Sí", "Solo si tienen 12 años"], "Art. 260."],
        ["media", "¿Está obligado el hermano del delincuente a denunciarlo por un hurto?", ["No: los colaterales hasta el segundo grado están exentos", "Sí, siempre", "Solo si es mayor de edad"], "Art. 261.2.º."],
        ["dificil", "La excepción de parentesco del art. 261 no se aplica, entre otros casos, cuando…", ["Se trata de un delito de maltrato habitual y la víctima es menor de edad", "El delito es un hurto leve", "El denunciante es mayor de 65 años"], "Art. 261, último párrafo."],
        ["media", "Un abogado, ¿está obligado a denunciar lo que su cliente le ha confiado?", ["No", "Sí", "Solo en delitos graves"], "Art. 263."],
        ["media", "¿Puede presentarse por vía telemática la denuncia de un robo con violencia?", ["No", "Sí", "Solo de día"], "Art. 266, párrafo segundo."],
        ["media", "¿Está obligado el denunciante a probar los hechos que denuncia?", ["No", "Sí", "Solo si son graves"], "Art. 264."],
        ["media", "Si la denuncia es manifiestamente falsa o el hecho no es delito, quien la recibe…", ["Se abstiene de todo procedimiento", "Debe tramitarla igualmente", "Detiene al denunciante siempre"], "Art. 269."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["¿Quién puede querellarse? (art. 270)", "Todos los ciudadanos españoles, ofendidos o no, ejercitando la acción popular; los extranjeros por delitos contra sus personas o bienes o los de sus representados"],
        ["Ministerio Fiscal (art. 271)", "Ejercita también acciones penales en forma de querella cuando está obligado"],
        ["Ante quién se interpone (art. 272)", "Ante el Juez de instrucción competente, o el tribunal especial si el querellado está aforado"],
        ["Diligencias urgentes (art. 273)", "En delito in fraganti, sin señales permanentes o con riesgo de fuga, el particular puede acudir al juez más próximo o a cualquier funcionario de policía para las primeras diligencias y la detención"],
        ["Abandono de la querella (arts. 275-276)", "En delitos solo perseguibles a instancia de parte, si no insta el procedimiento en 10 días tras el auto; por muerte o incapacidad, si nadie comparece en 30 días"],
        ["Requisitos formales (art. 277)", "Por procurador con poder bastante y suscrita por letrado; juez, querellante, querellado, relación circunstanciada del hecho, diligencias, peticiones y firma"],
        ["Conciliación previa (art. 278)", "En delitos solo perseguibles a instancia de parte (salvo violación o rapto), certificación del acto de conciliación"],
        ["Fianza del querellante (arts. 280-281)", "El particular presta fianza; están exentos el ofendido y sus herederos, ciertos familiares en homicidio y asesinato, y las asociaciones de víctimas autorizadas"],
      ],
      preguntas: [
        ["media", "¿Pueden querellarse los españoles que no han sido ofendidos por el delito?", ["Sí, mediante la acción popular", "No", "Solo con autorización del fiscal"], "Art. 270."],
        ["media", "La querella se presenta siempre…", ["Por medio de procurador con poder bastante y suscrita por letrado", "De palabra ante la policía", "Sin necesidad de abogado"], "Art. 277."],
        ["media", "¿Ante quién se interpone con carácter general la querella?", ["Ante el Juez de instrucción competente", "Ante la Policía Local", "Ante el Ayuntamiento"], "Art. 272."],
        ["dificil", "¿Está obligado a prestar fianza el ofendido por el delito que se querella?", ["No, está exento", "Sí", "Solo si es extranjero"], "Art. 281.1.º."],
        ["media", "Ante un delito in fraganti, el particular que intente querellarse puede acudir para las primeras diligencias a…", ["Cualquier funcionario de policía", "Solo al Tribunal Supremo", "Solo a un notario"], "Art. 273."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Inspección ocular (art. 326)", "Si el delito dejó vestigios, se recogen y conservan para el juicio oral y se describen el lugar, los objetos y todos los detalles útiles para la acusación y la defensa"],
        ["Muestras biológicas (art. 326)", "El juez ordena a la Policía Judicial o al forense que su recogida, custodia y examen garanticen su autenticidad (cadena de custodia)"],
        ["Plano y retrato (art. 327)", "Se levanta plano del lugar o se hace retrato o copia de los efectos si conviene para la claridad de los hechos"],
        ["Robo con fractura, escalamiento o violencia (art. 328)", "Se describen los vestigios y se consulta a peritos sobre la manera, instrumentos y tiempo de ejecución"],
        ["Delitos sin huellas (arts. 330-331)", "Se averigua por qué desaparecieron las pruebas o se acredita el hecho por testigos y otros medios, y la preexistencia de la cosa sustraída"],
        ["Cuerpo del delito (art. 334)", "Se recogen en los primeros momentos las armas, instrumentos o efectos relacionados con el delito, con diligencia que describe lugar, tiempo y ocasión del hallazgo"],
        ["Restitución a la víctima (art. 334)", "Sus efectos se le restituyen inmediatamente, salvo que deban conservarse como prueba y no baste imponerle el deber de tenerlos a disposición del juez"],
        ["Muerte violenta o sospechosa (arts. 340-343)", "Identificación del cadáver por testigos; si no los hay, exposición pública al menos 24 horas; autopsia por médicos forenses aunque se presuma la causa"],
        ["Valoración de mercancías sustraídas en comercios (art. 365)", "Se fija por su precio de venta al público"],
        ["Destrucción de drogas intervenidas (art. 367 ter)", "Realizados los análisis y conservadas muestras, la autoridad administrativa la destruye si en un mes el juez no ordena su conservación íntegra"],
      ],
      preguntas: [
        ["media", "Cuando el delito ha dejado vestigios materiales, el juez ordenará…", ["Recogerlos y conservarlos para el juicio oral y practicar inspección ocular", "Destruirlos de inmediato", "Entregarlos al denunciante"], "Art. 326."],
        ["media", "Los efectos sustraídos que pertenecen a la víctima…", ["Se le restituyen inmediatamente, salvo que deban conservarse como prueba", "Nunca se devuelven hasta la sentencia firme", "Se subastan"], "Art. 334."],
        ["media", "¿Cómo se valoran las mercancías sustraídas en un establecimiento comercial?", ["Por su precio de venta al público", "Por su precio de coste", "Por lo que diga el detenido"], "Art. 365."],
        ["dificil", "Si un cadáver no es reconocido por testigos y su estado lo permite, se expondrá al público antes de la autopsia al menos…", ["Veinticuatro horas", "Doce horas", "Tres días"], "Art. 341."],
        ["media", "En un robo con fractura, el juez describirá los vestigios y consultará a…", ["Peritos sobre la manera, instrumentos y tiempo de ejecución", "La víctima exclusivamente", "Al alcalde"], "Art. 328."],
        ["dificil", "Si en un mes el juez no ordena conservar íntegramente la droga intervenida, la autoridad administrativa…", ["La destruye, conservando las muestras necesarias", "La devuelve", "La subasta"], "Art. 367 ter.1."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Reconocimiento judicial (art. 368)", "Quienes dirijan cargo contra una persona deben reconocerla judicialmente si se considera precisa la diligencia para identificarla"],
        ["Rueda de reconocimiento (art. 369)", "La persona se presenta junto a otras de circunstancias exteriores semejantes; el reconocedor la designa clara y determinadamente, a la vista o desde un punto donde no pueda ser visto"],
        ["Varios reconocedores (art. 370)", "La diligencia se practica separadamente con cada uno, sin que se comuniquen hasta el último reconocimiento"],
        ["Deber de quien detiene (art. 371)", "Tomar precauciones para que el detenido no altere su persona o traje y dificulte su reconocimiento"],
        ["Auto de procesamiento (art. 384)", "Se dicta cuando resulta del sumario algún indicio racional de criminalidad contra una persona"],
        ["¿Cuándo se acuerda el informe pericial? (art. 456)", "Cuando son necesarios o convenientes conocimientos científicos o artísticos para apreciar un hecho importante"],
        ["Peritos titulares y no titulares (art. 457)", "Titulares: con título oficial de una ciencia o arte reglamentado. No titulares: sin título, con conocimientos o prácticas especiales; el juez prefiere a los titulares"],
        ["Número de peritos (art. 459)", "Todo reconocimiento pericial lo hacen dos peritos, salvo que solo haya uno y no pueda esperarse a otro"],
        ["Causas de recusación (art. 468)", "Parentesco hasta el cuarto grado con querellante o reo, interés directo o indirecto en la causa, amistad íntima o enemistad manifiesta"],
        ["Contenido del informe (art. 478)", "Descripción de la persona o cosa, relación detallada de las operaciones y su resultado, y conclusiones conforme a su ciencia o arte"],
      ],
      preguntas: [
        ["media", "En la rueda de reconocimiento, la persona a reconocer comparece…", ["Junto con otras de circunstancias exteriores semejantes", "Sola", "Con su abogado únicamente"], "Art. 369."],
        ["media", "Si son varios los que deben reconocer a una persona, la diligencia se practica…", ["Separadamente con cada uno, sin que se comuniquen", "Con todos a la vez", "Por fotografía"], "Art. 370."],
        ["media", "¿Cuántos peritos deben realizar, como regla, el reconocimiento pericial?", ["Dos", "Uno", "Tres"], "Art. 459."],
        ["media", "Un perito con título oficial de una ciencia reglamentada es…", ["Perito titular", "Perito no titular", "Testigo"], "Art. 457."],
        ["dificil", "¿Es causa de recusación de un perito la amistad íntima con el reo?", ["Sí", "No", "Solo si es pariente"], "Art. 468.3.º."],
        ["media", "Quien detiene a un presunto culpable debe evitar que…", ["Altere su persona o traje dificultando su reconocimiento", "Hable con su familia", "Coma"], "Art. 371."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["Principio general (art. 489)", "Ningún español ni extranjero puede ser detenido sino en los casos y forma que las leyes prescriben"],
        ["Cualquier persona puede detener (art. 490)", "Al que intenta cometer un delito al ir a cometerlo; al delincuente in fraganti; a los fugados de establecimiento penal, de la cárcel o durante la conducción; al fugado estando detenido o preso; al procesado o condenado en rebeldía"],
        ["Particular que detiene (art. 491)", "Justifica, si el detenido lo exige, que obró por motivos racionalmente suficientes"],
        ["Obligación de detener de la policía (art. 492)", "Los casos del art. 490; procesados por delito grave o con riesgo de no comparecer; y no procesados si hay motivos racionalmente bastantes del delito y de su participación"],
        ["Si no detiene (art. 493)", "Toma nota del nombre, apellidos, domicilio y circunstancias para identificar al presunto delincuente y la entrega al juez"],
        ["Delitos leves (art. 495)", "No se puede detener por delitos leves, salvo que el presunto reo no tenga domicilio conocido ni dé fianza bastante"],
        ["Plazo de entrega (art. 496)", "Puesta en libertad o entrega al juez más próximo dentro de las 24 horas siguientes a la detención"],
        ["Plazo máximo de la detención preventiva (art. 520.1)", "El tiempo estrictamente necesario y, en todo caso, máximo 72 horas para la libertad o la puesta a disposición judicial"],
        ["Derechos del detenido (art. 520.2)", "Informado por escrito y en lengua que comprenda: silencio, no declarar contra sí mismo, abogado, acceso a lo esencial para impugnar la detención, aviso a familiar o consulado, llamada a un tercero, intérprete, médico forense y justicia gratuita"],
        ["Abogado del detenido (art. 520.5)", "Libre designación o de oficio; ningún agente le recomienda abogado; debe acudir en un máximo de tres horas desde el encargo"],
        ["Renuncia a abogado (art. 520.8)", "Solo cabe si la detención es exclusivamente por delitos contra la seguridad del tráfico, con información clara previa; es revocable"],
        ["Detenido menor (art. 520.4)", "Se pone a disposición de las Secciones de Menores de la Fiscalía y se comunica a quienes ejercen la patria potestad, tutela o guarda"],
      ],
      preguntas: [
        ["facil", "¿Puede un particular detener al delincuente in fraganti?", ["Sí", "No", "Solo si es vigilante de seguridad"], "Art. 490.2.º."],
        ["media", "¿Puede detenerse por la presunta comisión de un delito leve?", ["No, salvo que no tenga domicilio conocido ni dé fianza bastante", "Sí, siempre", "Nunca, en ningún caso"], "Art. 495."],
        ["media", "Quien detiene a una persona debe ponerla en libertad o entregarla al juez más próximo dentro de…", ["Las veinticuatro horas siguientes", "Las setenta y dos horas", "Los tres días hábiles"], "Art. 496."],
        ["media", "El plazo máximo de la detención preventiva hasta la libertad o la puesta a disposición judicial es…", ["Setenta y dos horas", "Cuarenta y ocho horas", "Veinticuatro horas"], "Art. 520.1."],
        ["media", "¿Puede el agente recomendar al detenido un abogado concreto?", ["No, solo informarle de su derecho", "Sí", "Solo si no habla castellano"], "Art. 520.5."],
        ["dificil", "¿En qué caso puede el detenido renunciar a la asistencia de abogado?", ["Si la detención es exclusivamente por delitos contra la seguridad del tráfico", "Siempre que quiera", "Nunca"], "Art. 520.8."],
        ["media", "El abogado designado debe acudir al centro de detención en un plazo máximo de…", ["Tres horas desde la recepción del encargo", "Veinticuatro horas", "Una hora"], "Art. 520.5."],
        ["dificil", "Si la policía no detiene a un presunto delincuente por no estar en los casos del art. 492, debe…", ["Tomar nota de sus datos de identificación y entregarla al juez", "Dejarlo ir sin más", "Detenerlo igualmente"], "Art. 493."],
      ],
    },
  ],
  glosario: [
    [S1, "Denuncia", "Comunicación a la autoridad de un hecho que puede ser delito, sin asumir la condición de parte."],
    [S1, "Delito público", "El perseguible de oficio, sin necesidad de denuncia del agraviado."],
    [S2, "Querella", "Acto por el que se ejercita la acción penal y se adquiere la condición de parte acusadora."],
    [S2, "Acción popular", "Facultad de todo ciudadano español de ejercitar la acción penal aunque no sea ofendido."],
    [S3, "Inspección ocular", "Examen y descripción directa del lugar y vestigios del delito."],
    [S3, "Cuerpo del delito", "Armas, instrumentos y efectos relacionados con el delito que se recogen como prueba."],
    [S3, "Cadena de custodia", "Garantías de recogida, custodia y examen de las muestras que aseguran su autenticidad."],
    [S4, "Rueda de reconocimiento", "Diligencia de identificación del sospechoso entre personas de aspecto semejante."],
    [S4, "Perito titular", "Perito con título oficial de una ciencia o arte reglamentado."],
    [S5, "Habeas corpus", "Procedimiento para poner inmediatamente a disposición judicial a quien se considera detenido ilegalmente (art. 17.4 CE)."],
  ],
  casos: [
    {
      slug: "caso-detencion-flagrante-tienda",
      titulo: "Detención en flagrante delito",
      supuesto: "Un vigilante de un centro comercial sorprende a un hombre saliendo con varias prendas sin pagar (valor de 600 euros) y lo retiene hasta que llega la Policía Local. Los agentes lo detienen, le informan de sus derechos y lo trasladan a dependencias policiales. El detenido es extranjero y no habla bien castellano.",
      preguntas: [
        [S5, "facil", "¿Podía el vigilante retener al autor sorprendido in fraganti?", ["Sí, cualquier persona puede detener al delincuente in fraganti", "No, solo la policía", "Solo con orden judicial"], "Art. 490.2.º."],
        [S5, "media", "Si el detenido lo exige, el vigilante deberá justificar…", ["Que obró por motivos racionalmente suficientes", "Su título de vigilante", "Nada"], "Art. 491."],
        [S5, "media", "Al ser extranjero que no habla bien castellano, tiene derecho a…", ["Ser asistido gratuitamente por un intérprete", "Que no se le detenga", "Elegir el idioma del juicio"], "Art. 520.2.h)."],
        [S5, "media", "También tiene derecho a que se comunique su detención a…", ["La oficina consular de su país", "Su empresa", "Ninguna autoridad"], "Art. 520.2.e) y 520.3."],
        [S5, "media", "La información de derechos se le dará…", ["Por escrito, en lenguaje sencillo y en una lengua que comprenda, de forma inmediata", "Solo de palabra en castellano", "Al llegar al juzgado"], "Art. 520.2."],
        [S5, "dificil", "Si no se dispone de la declaración de derechos en su lengua…", ["Se le informa por intérprete y después se le entrega la declaración escrita en su lengua", "No se le informa", "Se le libera"], "Art. 520.2."],
        [S5, "media", "Plazo máximo para ponerlo en libertad o a disposición judicial…", ["Setenta y dos horas", "Veinticuatro horas desde el juicio", "Una semana"], "Art. 520.1."],
        [S3, "media", "Las prendas recuperadas, que pertenecen a la tienda…", ["Se restituyen inmediatamente, salvo que deban conservarse como prueba", "Se quedan en comisaría hasta la sentencia", "Se destruyen"], "Art. 334."],
        [S3, "media", "Para valorar las prendas sustraídas se atenderá a…", ["Su precio de venta al público", "Su precio de coste", "El criterio del vigilante"], "Art. 365."],
        [S5, "dificil", "Si el hecho fuera un hurto leve (menos de 400 euros) y tuviera domicilio conocido, ¿podría detenerse?", ["No, salvo que no tuviera domicilio conocido ni diera fianza", "Sí, siempre", "Solo de noche"], "Art. 495."],
      ],
    },
    {
      slug: "caso-robo-vivienda-inspeccion",
      titulo: "Inspección de un robo en una vivienda",
      supuesto: "La Policía Local acude a una vivienda de Torrero donde se ha producido un robo. La puerta tiene la cerradura forzada, hay huellas en una ventana y una gota de sangre en un cristal roto. La propietaria denuncia verbalmente los hechos en el lugar. Días después, una vecina cree reconocer al autor.",
      preguntas: [
        [S1, "media", "La denuncia verbal de la propietaria se documenta…", ["En un acta en forma de declaración firmada por quien la recibe y la denunciante", "No se documenta", "Solo con un parte interno"], "Art. 267."],
        [S1, "media", "La denuncia contendrá, entre otros datos…", ["La identificación de la denunciante y la narración circunstanciada del hecho", "Solo la firma", "Solo el valor de lo robado"], "Art. 265.2."],
        [S1, "media", "¿Podría haberse presentado esta denuncia por vía telemática si hubiera testigos?", ["No", "Sí", "Solo de noche"], "Art. 266."],
        [S3, "media", "La gota de sangre debe recogerse garantizando…", ["La autenticidad de la muestra en su recogida, custodia y examen", "Nada en especial", "Que la vea la víctima"], "Art. 326, párrafo tercero."],
        [S3, "media", "En un robo con fractura, además de describir los vestigios, se consulta a peritos sobre…", ["La manera, instrumentos, medios o tiempo de ejecución", "La vida del autor", "El valor del inmueble"], "Art. 328."],
        [S3, "media", "Puede levantarse un plano del lugar…", ["Cuando sea conveniente para mayor claridad de los hechos", "Nunca", "Solo en homicidios"], "Art. 327."],
        [S4, "media", "Para que la vecina identifique al sospechoso, la rueda se formará…", ["Con otras personas de circunstancias exteriores semejantes", "Solo con el sospechoso", "Con familiares del sospechoso"], "Art. 369."],
        [S4, "media", "La vecina puede hacer el reconocimiento…", ["A la vista o desde un punto en que no pueda ser vista", "Solo cara a cara", "Por teléfono"], "Art. 369."],
        [S4, "dificil", "El análisis biológico de la sangre lo realizarán, como regla…", ["Dos peritos", "Un solo perito siempre", "La víctima"], "Art. 459."],
        [S3, "media", "Si un objeto de la vivienda debe conservarse como prueba pero puede quedar a disposición del juez en manos de la propietaria…", ["Se le restituye imponiéndole ese deber", "Se queda en comisaría", "Se destruye"], "Art. 334, último párrafo."],
      ],
    },
    {
      slug: "caso-medico-sospecha-maltrato-menor",
      titulo: "Un médico que sospecha maltrato",
      supuesto: "Un pediatra atiende en urgencias a un niño de 5 años con lesiones compatibles con malos tratos habituales. La madre le pide que no diga nada. El abuelo del niño, que conoce la situación, tampoco quiere denunciar a su hijo, presunto autor.",
      preguntas: [
        [S1, "media", "El pediatra, que conoce el posible delito por razón de su profesión…", ["Está obligado a denunciarlo inmediatamente", "No está obligado", "Solo si se lo pide la madre"], "Art. 262."],
        [S1, "dificil", "¿Puede el abuelo ampararse en la excepción de parentesco del art. 261?", ["No, porque se trata de maltrato habitual y la víctima es menor", "Sí", "Solo si no convive"], "Art. 261, último párrafo."],
        [S1, "media", "Si la denuncia es verbal ante la policía, se extiende…", ["Un acta firmada por el agente y el denunciante", "Nada", "Un parte sin firma"], "Art. 267."],
        [S1, "media", "Tras recibir la denuncia, la policía debe…", ["Proceder inmediatamente a comprobar el hecho", "Esperar a que lo confirme el juez", "Archivarla"], "Art. 269."],
        [S1, "media", "¿Está obligado el pediatra a probar los hechos que denuncia?", ["No", "Sí", "Solo si son graves"], "Art. 264."],
        [S1, "media", "Si el pediatra omite dar parte, el art. 262 prevé…", ["Una multa disciplinaria, sin perjuicio de otras responsabilidades legales", "Nada", "Su inhabilitación automática"], "Art. 262."],
        [S2, "media", "Si la abuela, ofendida por el delito, quisiera querellarse, ¿prestaría fianza?", ["Depende: el ofendido y ciertos familiares están exentos", "Siempre", "Nunca puede querellarse"], "Art. 281."],
        [S2, "media", "La querella deberá presentarse…", ["Por procurador y suscrita por letrado", "De palabra", "Por correo sin firma"], "Art. 277."],
        [S4, "media", "Para valorar las lesiones se acordará un informe pericial porque…", ["Se necesitan conocimientos científicos", "Lo pide la madre", "Es obligatorio en todo delito"], "Art. 456."],
        [S1, "facil", "¿Puede denunciar cualquier persona que conozca el hecho?", ["Sí", "No", "Solo la víctima"], "Art. 264."],
      ],
    },
  ],
});
