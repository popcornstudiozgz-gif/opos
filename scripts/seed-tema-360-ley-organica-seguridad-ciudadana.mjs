/**
 * Crea tema-360 — Tema 33 de Policía Local: "Ley Orgánica de Protección de
 * la Seguridad Ciudadana."
 *
 * Fuente: Ley Orgánica 4/2015, de 30 de marzo, de protección de la
 * seguridad ciudadana (BOE-A-2015-3442, título verificado; vigente según
 * los metadatos de la API de legislación consolidada), texto consolidado
 * leído íntegro en los arts. 1 a 54. Se recogen las dos interpretaciones
 * conformes de la STC 13/2021 que el propio texto consolidado anota (arts.
 * 36.23 y 37.7). Las remisiones de la ley a la Ley 30/1992 y a la LO
 * 15/1999 se reproducen tal como figuran en su texto.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-360-ley-organica-seguridad-ciudadana.mjs
 */
import { sembrarTema, POLICIA } from "./lib/sembrar-tema.mjs";

const LEY = "https://www.boe.es/buscar/act.php?id=BOE-A-2015-3442";
const a = (ancla) => `${LEY}#${ancla}`;
const S1 = "disposiciones-generales-documentacion";
const S2 = "potestades-policia-seguridad";
const S3 = "reuniones-policia-administrativa";
const S4 = "infracciones";
const S5 = "sanciones-procedimiento";

await sembrarTema({
  tema: {
    slug: "tema-360",
    titulo: "Ley Orgánica 4/2015, de protección de la seguridad ciudadana",
    descripcion: "Objeto, ámbito, fines y principios rectores; autoridades competentes, entre ellas las locales; deber de colaboración; DNI, pasaporte y documentación de extranjeros; órdenes y prohibiciones; entrada en domicilio por catástrofe o ruina; identificación de personas y traslado a dependencias (máximo seis horas); restricción del tránsito y controles; comprobaciones y registros en lugares públicos; registros corporales externos; medidas de seguridad extraordinarias; videocámaras; reuniones y manifestaciones; registro documental, espectáculos y armas; régimen sancionador: sujetos responsables, órganos (también los alcaldes), graduación, infracciones muy graves, graves y leves, prescripción, sanciones y accesorias, Registro Central, subsidiariedad respecto del penal, medidas provisionales, valor probatorio de las denuncias de los agentes y procedimiento abreviado con reducción del 50 %.",
    contenido: "Recorre la llamada ley de seguridad ciudadana, de aplicación diaria para la Policía Local: cuándo se puede pedir la identificación y llevar a alguien a dependencias para identificarlo, cómo se hacen los cacheos (registro corporal externo), los controles y las medidas en reuniones y manifestaciones, qué conductas son infracciones muy graves, graves y leves (desobediencia, negativa a identificarse, consumo de drogas en la vía pública, faltas de respeto a los agentes, botellón con perturbación grave…), quién sanciona (también el alcalde), las multas y la reducción por pronto pago.",
    enlaces_boe: [{ url: LEY, titulo: "Ley Orgánica 4/2015, de 30 de marzo, de protección de la seguridad ciudadana (BOE-A-2015-3442)" }],
    indice_estudio: [
      { seccion: S1, titulo: "Cap. I y II: disposiciones generales y documentación e identificación personal", articulos: "arts. 1-13", url: a("a1") },
      { seccion: S2, titulo: "Cap. III, Sección 1.ª: potestades generales de policía de seguridad", articulos: "arts. 14-22", url: a("a14") },
      { seccion: S3, titulo: "Cap. III, Sección 2.ª y Cap. IV: reuniones y manifestaciones y policía administrativa especial", articulos: "arts. 23-29", url: a("a23") },
      { seccion: S4, titulo: "Cap. V: sujetos, órganos, graduación e infracciones", articulos: "arts. 30-37", url: a("a30") },
      { seccion: S5, titulo: "Cap. V: prescripción, sanciones y procedimiento sancionador", articulos: "arts. 38-54", url: a("a38") },
    ],
  },
  vinculo: { oposicion: POLICIA.oposicion, bloqueId: POLICIA.bloqueParte2, numero: 33 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Seguridad ciudadana (art. 1.1)", "Requisito indispensable para el pleno ejercicio de los derechos fundamentales; su salvaguarda, como bien jurídico colectivo, es función del Estado"],
        ["Principios rectores (art. 4.1)", "Legalidad, igualdad de trato y no discriminación, oportunidad, proporcionalidad, eficacia, eficiencia y responsabilidad, con control administrativo y jurisdiccional"],
        ["Justificación de la intervención (art. 4.3)", "Una amenaza concreta o un comportamiento objetivamente peligroso que razonablemente pueda provocar un perjuicio real para la seguridad ciudadana"],
        ["Autoridades estatales (art. 5.2)", "Ministro del Interior, Secretario de Estado de Seguridad, órganos directivos del Ministerio, Delegados y Subdelegados del Gobierno y Directores Insulares"],
        ["Autoridades locales (art. 5.4)", "Ejercen las facultades que les atribuyen la LOFCS y la legislación de régimen local, espectáculos públicos, actividades recreativas y clasificadas"],
        ["Deber de colaboración (art. 7)", "Autoridades y funcionarios deben colaborar y comunicar las perturbaciones graves; los particulares pueden ser requeridos sin riesgo personal; la seguridad privada tiene especial deber de auxilio"],
        ["DNI (arts. 8-9)", "Único documento con valor suficiente por sí solo para acreditar la identidad; obligatorio desde los catorce años; hay que exhibirlo cuando lo requieran la autoridad o sus agentes"],
        ["Extranjeros (art. 13)", "Derecho y obligación de portar su documentación de identidad y la de su situación regular; no pueden ser privados de la de origen salvo en investigaciones penales"],
      ],
      preguntas: [
        ["facil", "¿A partir de qué edad es obligatorio el DNI?", ["Catorce años", "Dieciséis años", "Dieciocho años"], "Art. 9.1."],
        ["media", "¿Qué documento es el único con valor suficiente por sí solo para acreditar la identidad de los españoles?", ["El DNI", "El permiso de conducir", "La tarjeta sanitaria"], "Art. 8.1."],
        ["media", "¿Son autoridades competentes en seguridad ciudadana los Subdelegados del Gobierno en las provincias?", ["Sí", "No", "Solo en Ceuta y Melilla"], "Art. 5.2.e)."],
        ["media", "Las autoridades locales ejercen sus facultades en seguridad ciudadana conforme a…", ["La LOFCS y la legislación de régimen local, espectáculos y actividades recreativas y clasificadas", "Solo sus ordenanzas fiscales", "Ninguna norma"], "Art. 5.4."],
        ["dificil", "¿Puede privarse a un extranjero de su documentación de origen?", ["Solo en el curso de investigaciones judiciales de carácter penal", "Siempre que la policía lo decida", "Nunca, en ningún caso"], "Art. 13.2."],
        ["media", "La intervención policial se justifica por la existencia de…", ["Una amenaza concreta o un comportamiento objetivamente peligroso", "Cualquier sospecha genérica", "Una denuncia anónima siempre"], "Art. 4.3."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Entrada en domicilio (art. 15)", "Solo en los casos permitidos por la Constitución y las leyes; es causa legítima evitar daños inminentes y graves en catástrofe, calamidad, ruina inminente u otros de extrema y urgente necesidad, remitiendo el acta al juez"],
        ["Supuestos de identificación (art. 16.1)", "Indicios de haber participado en una infracción, o cuando sea razonablemente necesario para prevenir un delito; incluye a personas con el rostro cubierto"],
        ["Principios de la identificación (art. 16.1)", "Proporcionalidad, igualdad de trato y no discriminación por nacimiento, nacionalidad, origen, sexo, religión, edad, discapacidad, orientación u otra circunstancia"],
        ["Traslado para identificar (art. 16.2)", "Si no es posible identificar por ningún medio o se niega, se le puede requerir que acompañe a dependencias, por el tiempo estrictamente necesario y nunca más de seis horas"],
        ["Libro-registro y volante (art. 16.3-4)", "Se anotan las identificaciones, se envía extracto mensual al fiscal y los asientos se cancelan a los tres años; a la salida se entrega un volante con tiempo, causa e identidad de los agentes"],
        ["Controles en vías públicas (art. 17.2)", "Para prevenir delitos de especial gravedad o alarma social, con identificación, registro de vehículos y control superficial de efectos personales"],
        ["Comprobaciones y ocupación de objetos (art. 18)", "Comprobaciones en personas, bienes y vehículos para impedir el porte ilegal de armas u objetos peligrosos, y ocupación temporal, incluso de armas con licencia"],
        ["Formalidades (art. 19)", "Las identificaciones, registros y comprobaciones no están sujetos a las formalidades de la detención; el acta de aprehensión goza de presunción de veracidad"],
        ["Registro corporal externo (art. 20)", "Con indicios racionales; por agente del mismo sexo y en lugar reservado si hay que dejar a la vista partes cubiertas, salvo urgencia por riesgo grave; se puede hacer contra la voluntad con compulsión proporcionada"],
        ["Medidas de seguridad extraordinarias (art. 21)", "Cierre o desalojo de locales, prohibición de paso, evacuación o depósito de explosivos en emergencias; los agentes pueden adoptarlas incluso con órdenes verbales si la urgencia lo exige"],
      ],
      preguntas: [
        ["media", "¿Cuánto tiempo máximo puede permanecer en dependencias policiales una persona trasladada solo para identificarla?", ["Seis horas", "Veinticuatro horas", "Setenta y dos horas"], "Art. 16.2."],
        ["media", "A la salida de dependencias tras una identificación, a la persona se le entrega…", ["Un volante acreditativo del tiempo, la causa y la identidad de los agentes", "Una citación judicial", "Nada"], "Art. 16.4."],
        ["media", "Salvo urgencia por riesgo grave, el registro corporal externo lo realiza…", ["Un agente del mismo sexo que la persona registrada", "Cualquier agente", "Un médico"], "Art. 20.2.a)."],
        ["media", "¿Están sujetas las diligencias de identificación a las mismas formalidades que la detención?", ["No", "Sí", "Solo de noche"], "Art. 19.1."],
        ["dificil", "Los asientos del libro-registro de identificaciones se cancelan de oficio a los…", ["Tres años", "Seis meses", "Diez años"], "Art. 16.3."],
        ["media", "¿Es causa legítima para entrar en un domicilio la necesidad de evitar daños graves por una ruina inminente?", ["Sí", "No", "Solo con orden escrita del alcalde"], "Art. 15.2."],
        ["media", "En una emergencia, los agentes pueden ordenar el desalojo de un local…", ["Incluso mediante órdenes verbales si la urgencia lo hace imprescindible", "Solo con resolución escrita", "Nunca"], "Art. 21."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Protección de reuniones (art. 23.1)", "Las autoridades protegen la celebración de reuniones y manifestaciones y pueden disolverlas en los supuestos del art. 5 de la LO 9/1983"],
        ["Gradualidad (art. 23.2)", "Las medidas de intervención serán graduales y proporcionadas; la disolución es el último recurso"],
        ["Aviso previo (art. 23.3)", "Las unidades deben avisar a los afectados (verbalmente si urge), salvo alteración con armas, explosivos u objetos contundentes o peligrosos"],
        ["Concentraciones de vehículos (art. 23.1)", "Pueden disolverse y retirarse los vehículos u obstáculos que impidan o dificulten la circulación"],
        ["Registro documental (art. 25)", "Hospedaje, transporte, cibercafés, compraventa de objetos usados, alquiler o desguace de vehículos, joyas y metales, cerrajería, chatarra o venta de productos químicos peligrosos"],
        ["Espectáculos (art. 27.2)", "Pueden prohibirse o suspenderse si hay peligro cierto para personas y bienes o graves alteraciones de la seguridad ciudadana"],
        ["Armas y explosivos (art. 28.2)", "Su intervención corresponde al Ministerio del Interior, que la ejerce a través de la Dirección General de la Guardia Civil"],
        ["Licencias de armas de defensa personal (art. 29.1.b)", "Expedición restrictiva, limitada a supuestos de estricta necesidad, teniendo en cuenta conducta y antecedentes"],
      ],
      preguntas: [
        ["media", "Según el art. 23.2, la disolución de reuniones y manifestaciones constituye…", ["El último recurso", "La primera medida", "Una medida automática"], "Art. 23.2."],
        ["media", "¿Cuándo pueden las FCS disolver una manifestación sin previo aviso?", ["Cuando se altera la seguridad con armas, explosivos u objetos contundentes o peligrosos", "Siempre", "Nunca"], "Art. 23.3, párrafo segundo."],
        ["media", "¿Qué organismo ejerce la intervención de armas y explosivos?", ["La Dirección General de la Guardia Civil", "La Policía Local", "El Ministerio de Industria"], "Art. 28.2."],
        ["media", "¿Están sujetos a obligaciones de registro documental los establecimientos de hospedaje?", ["Sí", "No", "Solo los hoteles de cinco estrellas"], "Art. 25.1."],
        ["dificil", "La expedición de licencias para armas de defensa personal tiene carácter…", ["Restrictivo, limitado a supuestos de estricta necesidad", "Libre", "Automático para mayores de edad"], "Art. 29.1.b)."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Responsables (art. 30)", "El autor del hecho; están exentos los menores de catorce años (se informa al Ministerio Fiscal); en reuniones y manifestaciones, los organizadores o promotores"],
        ["Órganos estatales (art. 32.1)", "Ministro del Interior (muy graves en grado máximo), Secretario de Estado de Seguridad (muy graves en grados medio y mínimo), Delegados del Gobierno (graves y leves)"],
        ["Competencia de los alcaldes (art. 32.3)", "Pueden imponer sanciones de esta ley si las infracciones se cometen en espacios públicos municipales o afectan a bienes locales y tienen competencia; las ordenanzas pueden graduar el cuadro"],
        ["Grado medio de la multa (art. 33.2)", "Reincidencia en dos años, violencia o intimidación, rostro cubierto o uso de menores o personas vulnerables"],
        ["Algunas infracciones muy graves (art. 35)", "Reuniones no comunicadas o prohibidas en infraestructuras de servicios básicos con riesgo para la vida; espectáculos quebrantando su prohibición; deslumbrar con haces de luz a pilotos o conductores"],
        ["Graves: desobediencia e identificación (art. 36.6)", "Desobediencia o resistencia a la autoridad o sus agentes no constitutivas de delito, negativa a identificarse y aportar datos falsos"],
        ["Graves: drogas (art. 36.16-19)", "Consumo o tenencia ilícitos de drogas en lugares públicos y abandono de sus útiles; traslado de personas para acceder a drogas; cultivo visible; tolerancia del consumo en locales"],
        ["Otras graves (art. 36)", "Desórdenes con alteración grave, obstrucción a la autoridad, obstaculizar los servicios de emergencia, portar armas prohibidas o de modo temerario, uso indebido de uniformes, falta de colaboración con las FCS"],
        ["Graves: imágenes de agentes (art. 36.23)", "Uso no autorizado de imágenes o datos de agentes que ponga en peligro su seguridad o una operación; constitucional según la interpretación de la STC 13/2021"],
        ["Algunas leves (art. 37)", "Faltas de respeto a agentes de las FCS; ocupación de inmuebles o de la vía pública (incluida venta ambulante no autorizada); daños o deslucimiento de bienes públicos; consumo de alcohol en la vía pública que perturbe gravemente la tranquilidad; dejar sueltos animales peligrosos"],
      ],
      preguntas: [
        ["media", "La negativa a identificarse a requerimiento de un agente es una infracción…", ["Grave", "Leve", "Muy grave"], "Art. 36.6."],
        ["media", "El consumo de drogas en la vía pública, aunque no sea para traficar, es una infracción…", ["Grave", "Leve", "No es infracción"], "Art. 36.16."],
        ["media", "Las faltas de respeto a un agente de las FCS en el ejercicio de sus funciones, si no son delito, son infracción…", ["Leve", "Grave", "Muy grave"], "Art. 37.4."],
        ["media", "El consumo de alcohol en la vía pública que perturba gravemente la tranquilidad ciudadana es una infracción…", ["Leve", "Grave", "Muy grave"], "Art. 37.17."],
        ["media", "¿Pueden los alcaldes imponer sanciones de la LO 4/2015?", ["Sí, por infracciones en espacios públicos municipales o que afecten a bienes locales, si tienen competencia", "No, nunca", "Solo por infracciones muy graves"], "Art. 32.3."],
        ["dificil", "Cometer la infracción con el rostro cubierto para dificultar la identificación supone…", ["Imponer la multa en grado medio", "Agravarla a muy grave", "Ningún efecto"], "Art. 33.2.c)."],
        ["media", "¿Responden de las infracciones de esta ley los menores de catorce años?", ["No, están exentos y se informa al Ministerio Fiscal", "Sí, como los adultos", "Sí, sus padres pagan siempre la multa"], "Art. 30.2."],
        ["dificil", "Proyectar un láser sobre el conductor de un autobús que pueda deslumbrarle y provocar un accidente es infracción…", ["Muy grave", "Grave", "Leve"], "Art. 35.4."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["Prescripción de las infracciones (art. 38.1)", "Leves: seis meses; graves: un año; muy graves: dos años"],
        ["Cuantía de las multas (art. 39.1)", "Muy graves: 30.001 a 600.000 euros; graves: 601 a 30.000; leves: 100 a 600"],
        ["Tramos de las graves (art. 39.1.b)", "Mínimo: 601 a 10.400; medio: 10.401 a 20.200; máximo: 20.201 a 30.000 euros"],
        ["Sanciones accesorias (art. 39.2)", "Retirada de armas y licencias, comiso de instrumentos y efectos, suspensión de licencias y clausura de establecimientos"],
        ["Prescripción de las sanciones (art. 40)", "Muy graves: tres años; graves: dos años; leves: un año, desde la firmeza administrativa"],
        ["Registro Central de Infracciones (art. 43)", "En el Ministerio del Interior, solo para apreciar la reincidencia; cancelación a los 3, 2 o 1 años según la gravedad"],
        ["Subsidiariedad respecto del penal (art. 45)", "No se sancionan hechos ya sancionados con identidad de sujeto, hecho y fundamento; si pueden ser delito, se pasa el tanto de culpa y se suspende el procedimiento"],
        ["Medidas provisionales de los agentes (art. 47)", "Aprehenden cautelarmente los instrumentos de la infracción y el dinero o productos obtenidos; en grave riesgo pueden adoptar medidas previas que deben ratificarse en quince días"],
        ["Caducidad (art. 50)", "Un año desde la incoación sin notificar la resolución"],
        ["Valor probatorio (art. 52)", "Las denuncias, atestados o actas de los agentes que presenciaron los hechos son base suficiente para resolver, salvo prueba en contrario, previa ratificación si se niegan"],
        ["Procedimiento abreviado (art. 54)", "En graves y leves, pago voluntario en quince días con reducción del 50 %, renuncia a alegar y fin del procedimiento; no se aplica a las muy graves"],
      ],
      preguntas: [
        ["media", "Las infracciones graves de la LO 4/2015 prescriben…", ["Al año", "A los seis meses", "A los dos años"], "Art. 38.1."],
        ["media", "Las infracciones leves se sancionan con multa de…", ["100 a 600 euros", "601 a 30.000 euros", "30 a 300 euros"], "Art. 39.1."],
        ["media", "Si el infractor paga voluntariamente en quince días una sanción grave, obtiene…", ["Una reducción del 50 %", "Una reducción del 20 %", "Ninguna reducción"], "Art. 54.3.a)."],
        ["dificil", "¿Se aplica el procedimiento abreviado a las infracciones muy graves?", ["No", "Sí", "Solo si es la primera vez"], "Art. 54.2."],
        ["media", "Las denuncias de los agentes que presenciaron los hechos son base suficiente para resolver…", ["Salvo prueba en contrario, previa ratificación si el denunciado los niega", "Nunca", "Solo con testigos"], "Art. 52."],
        ["media", "Si los hechos pueden ser delito, el órgano administrativo…", ["Pasa el tanto de culpa al juez o al fiscal y se abstiene de seguir", "Sanciona igualmente", "Archiva sin más"], "Art. 45.2."],
        ["media", "El procedimiento sancionador caduca si no se notifica la resolución en…", ["Un año desde la incoación", "Seis meses", "Tres años"], "Art. 50.1."],
      ],
    },
  ],
  glosario: [
    [S1, "Seguridad ciudadana", "Bien jurídico colectivo consistente en la protección de personas y bienes y la tranquilidad ciudadana (art. 1)."],
    [S2, "Identificación", "Requerimiento para acreditar la identidad, sin las formalidades de la detención (arts. 16 y 19)."],
    [S2, "Registro corporal externo", "Cacheo superficial de la persona con indicios racionales, respetando su intimidad y dignidad (art. 20)."],
    [S2, "Zona de seguridad", "Espacio en que se limita la circulación o permanencia por alteración de la seguridad (art. 17.1)."],
    [S3, "Registro documental", "Obligación de ciertas actividades de anotar datos relevantes para la seguridad ciudadana (art. 25)."],
    [S4, "Reincidencia administrativa", "Comisión en dos años de más de una infracción de la misma naturaleza declarada en firme; eleva la multa al grado medio."],
    [S5, "Comiso", "Pérdida de los instrumentos y efectos de la infracción, como sanción accesoria."],
    [S5, "Procedimiento abreviado", "Terminación anticipada por pago voluntario con reducción del 50 % (art. 54)."],
  ],
  casos: [
    {
      slug: "caso-identificacion-negativa-parque",
      titulo: "Una identificación en un parque",
      supuesto: "Una patrulla de la Policía Local observa en el Parque Grande a un grupo de jóvenes consumiendo lo que parece hachís. Al pedirles la identificación, uno se niega y no lleva documentación; otro llama «payasos» a los agentes. Un tercero tira al suelo una pipa con restos de droga.",
      preguntas: [
        [S4, "media", "El consumo de drogas en la vía pública es una infracción…", ["Grave", "Leve", "Muy grave"], "Art. 36.16."],
        [S4, "media", "Abandonar en el lugar la pipa empleada para consumir es…", ["Parte de la infracción grave del art. 36.16", "Una infracción leve de daños", "No es infracción"], "Art. 36.16."],
        [S2, "media", "Si no es posible identificar al joven por ningún medio, los agentes pueden…", ["Requerirle que les acompañe a dependencias por el tiempo estrictamente necesario, máximo seis horas", "Detenerlo 72 horas", "Dejarlo marchar sin más"], "Art. 16.2."],
        [S2, "media", "Debe informársele…", ["De modo inmediato y comprensible de las razones de la solicitud y del requerimiento", "Por escrito al día siguiente", "No es necesario"], "Art. 16.2, párrafo segundo."],
        [S4, "media", "Su negativa a identificarse es una infracción…", ["Grave", "Leve", "Delito siempre"], "Art. 36.6."],
        [S4, "media", "Llamar «payasos» a los agentes, si no es delito, es…", ["Una infracción leve por falta de respeto", "Una infracción muy grave", "Atípico"], "Art. 37.4."],
        [S5, "media", "Los agentes pueden aprehender cautelarmente…", ["La droga y los instrumentos utilizados para la infracción", "El móvil de los jóvenes siempre", "Nada"], "Art. 47.1."],
        [S5, "media", "Si se prueba la infracción grave y se paga en quince días, la multa se reduce…", ["Un 50 %", "Un 25 %", "No se reduce"], "Art. 54.3.a)."],
        [S4, "dificil", "Si alguno de los jóvenes tuviera 13 años…", ["Estaría exento y se informaría al Ministerio Fiscal", "Se le multaría igual", "Se multaría al instituto"], "Art. 30.2."],
        [S2, "dificil", "En la identificación deben respetarse, entre otros, los principios de…", ["Proporcionalidad, igualdad de trato y no discriminación", "Rapidez y eficacia solamente", "Jerarquía"], "Art. 16.1, último párrafo."],
      ],
    },
    {
      slug: "caso-cacheo-control-noche",
      titulo: "Un control nocturno con cacheo",
      supuesto: "Tras varios atracos con arma blanca en la zona de El Tubo, se establece un control en el que se identifica a las personas y se registran los vehículos. Un agente varón aprecia un bulto en la cintura de una mujer y quiere cachearla. En otro vehículo se encuentra una navaja de grandes dimensiones.",
      preguntas: [
        [S2, "media", "¿Puede establecerse un control en la vía pública para prevenir delitos de especial gravedad o alarma social?", ["Sí, con identificación, registro de vehículos y control superficial de efectos", "No", "Solo con orden judicial"], "Art. 17.2."],
        [S2, "media", "Salvo urgencia por riesgo grave, el cacheo de la mujer debe realizarlo…", ["Una agente del mismo sexo", "El agente varón", "Cualquier persona presente"], "Art. 20.2.a)."],
        [S2, "media", "Si el registro exige dejar a la vista partes del cuerpo cubiertas por la ropa…", ["Se hará en lugar reservado y fuera de la vista de terceros, dejando constancia escrita", "Se hará en la calle", "No puede hacerse"], "Art. 20.2.b)."],
        [S2, "media", "¿Puede practicarse el registro corporal externo contra la voluntad de la persona?", ["Sí, con las medidas de compulsión indispensables y proporcionadas", "No, nunca", "Solo con orden del alcalde"], "Art. 20.4."],
        [S2, "media", "La navaja puede ser objeto de…", ["Ocupación temporal para prevenir delitos", "Devolución inmediata", "Nada"], "Art. 18.2."],
        [S2, "media", "El acta de aprehensión de la navaja debe…", ["Firmarla el interesado; si se niega, se deja constancia", "Firmarla solo el agente", "No hace falta acta"], "Art. 19.2."],
        [S2, "dificil", "El acta que se extiende goza de…", ["Presunción de veracidad salvo prueba en contrario", "Ningún valor", "Valor de sentencia"], "Art. 19.2."],
        [S4, "media", "Portar un arma prohibida en la vía pública, si no es delito, es una infracción…", ["Grave", "Leve", "Muy grave"], "Art. 36.10."],
        [S5, "media", "Como sanción accesoria, puede acordarse…", ["El comiso del arma", "La retirada del permiso de conducir", "Ninguna"], "Art. 39.2.b)."],
        [S2, "media", "Los registros corporales deben hacerse del modo que cause…", ["El menor perjuicio a la intimidad y dignidad", "Mayor rapidez", "Más visibilidad"], "Art. 20.3."],
      ],
    },
    {
      slug: "caso-manifestacion-plaza-pilar",
      titulo: "Una manifestación en la Plaza del Pilar",
      supuesto: "Una manifestación comunicada transcurre por el centro. Al final, un grupo bloquea la calle Alfonso con contenedores y provoca desórdenes con alteración grave de la seguridad ciudadana. Otros lanzan objetos contundentes contra los agentes. Un manifestante proyecta un láser sobre los agentes para impedirles actuar.",
      preguntas: [
        [S3, "media", "Las medidas de intervención en la manifestación deben ser…", ["Graduales y proporcionadas, siendo la disolución el último recurso", "Inmediatas y máximas", "Libres"], "Art. 23.2."],
        [S3, "media", "Ante el lanzamiento de objetos contundentes, ¿necesitan las FCS avisar antes de disolver?", ["No", "Sí, siempre por escrito", "Sí, con 24 horas"], "Art. 23.3."],
        [S4, "media", "Obstaculizar la vía pública con contenedores causando alteración grave de la seguridad es infracción…", ["Grave", "Leve", "Muy grave"], "Art. 36.3."],
        [S4, "media", "Proyectar un láser sobre los agentes para impedir sus funciones es infracción…", ["Leve", "Grave", "Muy grave"], "Art. 37.6."],
        [S4, "media", "Los responsables de las infracciones de reuniones y manifestaciones son…", ["Los organizadores o promotores, cuando así lo establece la infracción", "Siempre la policía", "El Ayuntamiento"], "Arts. 30.3 y 37.1."],
        [S4, "dificil", "La negativa a disolverse cuando lo ordena la autoridad en los supuestos del art. 5 de la LO 9/1983 es infracción…", ["Grave", "Leve", "Muy grave"], "Art. 36.7."],
        [S5, "media", "Si los hechos pudieran ser también delito de desórdenes públicos, la Administración…", ["Pasa el tanto de culpa y suspende el procedimiento sancionador", "Sanciona primero", "Archiva"], "Art. 45.2."],
        [S5, "media", "Si se causan daños a bienes municipales, la resolución sancionadora se pronunciará sobre…", ["La reposición o la indemnización de daños y perjuicios", "Nada", "La expulsión del infractor"], "Art. 42.1."],
        [S5, "dificil", "Si el autor de los daños es un menor no emancipado, de los daños responden solidariamente con él…", ["Sus padres o tutores", "El Estado", "Nadie"], "Art. 42.3."],
        [S3, "media", "¿Pueden disolverse las concentraciones de vehículos que impidan la circulación?", ["Sí, y retirarse los vehículos u obstáculos", "No", "Solo de noche"], "Art. 23.1."],
      ],
    },
  ],
});
