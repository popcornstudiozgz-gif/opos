/**
 * Crea tema-366 — Tema 39 de Policía Local: "Reglamento General de
 * Conductores: De las autorizaciones administrativas para conducir."
 *
 * Fuente: Real Decreto 818/2009, de 8 de mayo, Reglamento General de
 * Conductores (BOE-A-2009-9481), texto consolidado descargado de la API de
 * legislación consolidada del BOE (octubre de 2026). El enunciado oficial
 * coincide con el Título I del reglamento ("De las autorizaciones
 * administrativas para conducir", arts. 1-40), leído íntegro: permiso y
 * licencia, clases y edades (art. 4, en la redacción vigente desde
 * 12-11-2020), condiciones de expedición, licencias, requisitos, vigencia y
 * prórroga, permisos de la UE y de terceros países, autorización especial
 * ADR, permiso internacional, nulidad, lesividad, pérdida de vigencia y
 * suspensión cautelar. Laguna señalada: los arts. 34, 37 y 39 siguen
 * remitiendo a la Ley 30/1992, derogada por las Leyes 39/2015 y 40/2015;
 * se indica en la flashcard correspondiente.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-366-reglamento-general-conductores.mjs
 */
import { sembrarTema, POLICIA } from "./lib/sembrar-tema.mjs";

const RGCOND = "https://www.boe.es/buscar/act.php?id=BOE-A-2009-9481";
const a = (ancla) => `${RGCOND}#${ancla}`;
const S1 = "permiso-licencia-clases";
const S2 = "requisitos-vigencia-prorroga";
const S3 = "permisos-extranjeros";
const S4 = "autorizaciones-especiales-internacional";
const S5 = "nulidad-perdida-vigencia";

await sembrarTema({
  tema: {
    slug: "tema-366",
    titulo: "Reglamento General de Conductores: autorizaciones administrativas para conducir (RD 818/2009)",
    descripcion: "Título I del Reglamento General de Conductores: el permiso y la licencia de conducción, competencia para expedirlos y deberes de sus titulares; clases de permiso (AM, A1, A2, A, B, B+E, C1, C1+E, C, C+E, D1, D1+E, D, D+E) y edades; condiciones de expedición y permisos que se conceden implícitamente; licencias de conducción; requisitos para obtenerlos; vigencia y prórroga; permisos de la Unión Europea y de terceros países, canje; autorización especial para mercancías peligrosas (ADR) y permiso internacional; nulidad, lesividad, pérdida de vigencia y suspensión cautelar.",
    contenido: "Qué documento hace falta para conducir cada tipo de vehículo y a qué edad, cuánto dura un permiso y cómo se renueva, qué permisos extranjeros valen en España y durante cuánto tiempo, y qué ocurre cuando un conductor pierde todos los puntos o su permiso caduca. Es lo que el agente comprueba en un control al pedir la documentación del conductor.",
    enlaces_boe: [{ url: RGCOND, titulo: "Real Decreto 818/2009, de 8 de mayo, por el que se aprueba el Reglamento General de Conductores (BOE-A-2009-9481)" }],
    indice_estudio: [
      { seccion: S1, titulo: "Título I, Cap. I: permiso y licencia, clases y edades", articulos: "arts. 1-6", url: a("a1") },
      { seccion: S2, titulo: "Título I, Cap. I: requisitos, vigencia y prórroga", articulos: "arts. 7-14", url: a("a7") },
      { seccion: S3, titulo: "Título I, Cap. II: permisos de la UE, de terceros países y de diplomáticos", articulos: "arts. 15-24", url: a("a15") },
      { seccion: S4, titulo: "Título I, Cap. III: autorización especial ADR y permiso internacional", articulos: "arts. 25-33", url: a("a25") },
      { seccion: S5, titulo: "Título I, Cap. IV: nulidad, lesividad, pérdida de vigencia y suspensión cautelar", articulos: "arts. 34-40", url: a("a34") },
    ],
  },
  vinculo: { oposicion: POLICIA.oposicion, bloqueId: POLICIA.bloqueParte2, numero: 39 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Exigencia (art. 1.1-2)", "Para conducir vehículos de motor y ciclomotores hace falta permiso o licencia, de otorgamiento y contenido reglados"],
        ["Un solo permiso (art. 1.4)", "Nadie puede ser titular de más de un permiso o licencia expedido en la UE o el EEE; si tiene varios, se le retira el que proceda"],
        ["Quién los expide (art. 2)", "Las Jefaturas Provinciales de Tráfico, salvo los de las Fuerzas Armadas, la Dirección General de la Policía y la Guardia Civil"],
        ["Deberes del titular (art. 3)", "Conducir respetando las menciones y restricciones codificadas del anexo I, y llevar consigo el permiso vigente y exhibirlo a los agentes"],
        ["AM (art. 4)", "Ciclomotores de dos o tres ruedas, cuatriciclos ligeros y vehículos para personas de movilidad reducida; 15 años"],
        ["A1 y A2 (art. 4)", "A1: motos de hasta 125 cm³ y 11 kW, triciclos de hasta 15 kW, a los 16 años; A2: motos de hasta 35 kW, a los 18 años"],
        ["A (art. 4)", "Motocicletas y triciclos de motor; 20 años; exige A2 con dos años de antigüedad y una formación"],
        ["B (art. 4)", "Automóviles de hasta 3.500 kg y ocho pasajeros más el conductor, con remolque de hasta 750 kg o conjunto de hasta 4.250 kg; 18 años"],
        ["B con antigüedad (art. 4)", "Con más de tres años, permite conducir en España motos de la clase A1; con más de dos, furgonetas de combustibles alternativos de hasta 4.250 kg sin remolque"],
        ["C1 y C (art. 4)", "C1: más de 3.500 y hasta 7.500 kg, a los 18 años; C: más de 3.500 kg, a los 21 años (18 con CAP ordinario)"],
        ["D1 y D (art. 4)", "D1: hasta dieciséis pasajeros y 8 m de longitud, 21 años; D: más de ocho pasajeros, 24 años (21 con CAP ordinario)"],
        ["Permisos implícitos (art. 5.2)", "A1 incluye AM; A2 incluye A1; C y D incluyen C1 y D1; los +E de C1, C, D1 y D incluyen B+E"],
        ["Licencias (art. 6)", "Vehículos para personas de movilidad reducida, desde los 14 años (pasajeros desde los 16); vehículos especiales agrícolas, desde los 16 años"],
      ],
      preguntas: [
        ["facil", "¿Quién expide, con carácter general, los permisos de conducción?", ["Las Jefaturas Provinciales de Tráfico", "Los Ayuntamientos", "Las comunidades autónomas"], "Art. 2."],
        ["media", "¿A qué edad puede obtenerse el permiso AM?", ["15 años", "14 años", "16 años"], "Art. 4.2."],
        ["media", "¿Qué antigüedad mínima de permiso B permite conducir en España motocicletas de la clase A1?", ["Más de tres años", "Más de un año", "Más de cinco años"], "Art. 4.2, clase B."],
        ["media", "¿A qué edad general puede obtenerse el permiso D?", ["24 años", "21 años", "18 años"], "Art. 4.2."],
        ["media", "¿Qué permiso se necesita previamente para obtener el permiso A?", ["A2 con al menos dos años de antigüedad", "B con tres años", "A1 con un año"], "Art. 5.1.a)."],
        ["media", "¿Qué masa máxima puede tener el remolque enganchado a un turismo con permiso B sin más requisitos?", ["750 kg", "1.500 kg", "3.500 kg"], "Art. 4.2, clase B."],
        ["dificil", "¿Autoriza el permiso C a conducir motocicletas?", ["No: los permisos B a D+E no autorizan a conducir motocicletas", "Sí", "Solo de hasta 125 cm³"], "Art. 5.7."],
        ["media", "¿A partir de qué edad puede obtenerse la licencia para vehículos de personas de movilidad reducida?", ["Catorce años", "Doce años", "Dieciséis años"], "Art. 6.1.a)."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Requisitos (art. 7.1)", "Residencia normal o estancia por estudios de seis meses si es extranjero, edad, no estar privado ni suspendido, haber cumplido el plazo tras perder los puntos, aptitud psicofísica, superar las pruebas y no tener otro permiso de la UE"],
        ["Permisos extraordinarios (art. 7.2)", "Para quien padece una enfermedad o deficiencia que le impide el ordinario, con condiciones restrictivas"],
        ["Vigencia de C y D (art. 12.1)", "Cinco años hasta los 65 años y tres años desde esa edad"],
        ["Vigencia del resto (art. 12.2)", "Permisos AM, A y B y licencias: diez años hasta los 65 y cinco desde esa edad"],
        ["Permiso caducado (art. 12.4)", "No autoriza a conducir; el agente lo interviene de inmediato y lo remite a la Jefatura Provincial de Tráfico"],
        ["Condiciones de la vigencia (art. 12.5-6)", "No haber perdido todos los puntos y mantener los requisitos del otorgamiento"],
        ["Prórroga (art. 13)", "Acreditando las aptitudes psicofísicas; puede pedirse hasta tres meses antes de la caducidad, contando el nuevo plazo desde esta"],
        ["Grupos 1 y 2 (art. 13.1)", "Prorrogar un permiso del grupo 2 (profesionales) implica prorrogar los del grupo 1 de su titular"],
      ],
      preguntas: [
        ["media", "¿Cuál es el periodo de vigencia del permiso B de un titular de 40 años?", ["Diez años", "Cinco años", "Quince años"], "Art. 12.2."],
        ["media", "¿Cuál es la vigencia del permiso C de un titular menor de 65 años?", ["Cinco años", "Diez años", "Tres años"], "Art. 12.1."],
        ["media", "¿Y la del permiso B de un mayor de 65 años?", ["Cinco años", "Tres años", "Diez años"], "Art. 12.2."],
        ["media", "¿Qué hace el agente ante un permiso de conducción caducado?", ["Lo interviene de inmediato y lo remite a la Jefatura Provincial de Tráfico", "Lo devuelve con una advertencia", "Lo destruye"], "Art. 12.4."],
        ["media", "¿Con cuánta antelación máxima puede pedirse ordinariamente la prórroga?", ["Tres meses", "Un mes", "Un año"], "Art. 13.1."],
        ["dificil", "¿Qué residencia mínima en España debe acreditar un extranjero para obtener permiso español?", ["Residencia normal o estancia por estudios de al menos seis meses", "Un año", "Cinco años"], "Art. 7.1.a)."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Permisos UE y EEE (art. 15.1)", "Válidos en España en sus condiciones de origen, pero la edad exigida es la del permiso español equivalente"],
        ["Excepciones (art. 15.2-3)", "No valen si están restringidos, suspendidos o retirados en algún Estado o en España, ni si se obtuvieron tras perder la vigencia uno anterior en España"],
        ["Residentes con permiso UE (art. 15.4)", "Quedan sujetos a las normas españolas de vigencia, aptitud psicofísica y puntos; si su permiso no caduca, deben renovarlo a los dos años de residir aquí"],
        ["Canje (arts. 18-19)", "El titular de un permiso de la UE puede canjearlo por el español equivalente; hay canje de oficio en ciertos supuestos"],
        ["Terceros países (art. 21.1)", "Valen los conformes a los Convenios de Ginebra 1949 o Viena 1968, los redactados en castellano o con traducción oficial, los internacionales y los reconocidos en convenios"],
        ["Requisitos (art. 21.2)", "Permiso en vigor, edad española equivalente y no haber pasado seis meses desde la residencia normal (o desde la entrada si no se acredita)"],
        ["Pasados seis meses (art. 21.3)", "El permiso de un tercer país deja de valer: hay que obtener el español o canjearlo si existe convenio"],
      ],
      preguntas: [
        ["media", "¿Vale en España un permiso de conducción expedido en Francia?", ["Sí, en las condiciones de origen y con la edad española equivalente", "No, hay que canjearlo siempre", "Solo seis meses"], "Art. 15.1."],
        ["media", "¿Durante cuánto tiempo vale el permiso de un tercer país desde que su titular adquiere la residencia normal en España?", ["Seis meses como máximo", "Un año", "Indefinidamente"], "Art. 21.2.c)."],
        ["media", "¿Vale un permiso de un tercer país redactado en una lengua extranjera sin traducción oficial ni modelo de los Convenios?", ["No", "Sí", "Solo de día"], "Art. 21.1.a)-b)."],
        ["dificil", "Un residente en España con un permiso alemán sin fecha de caducidad debe renovarlo…", ["Transcurridos dos años desde que establece su residencia normal en España", "Inmediatamente", "Nunca"], "Art. 15.4."],
        ["media", "¿Vale en España un permiso de la UE suspendido en otro Estado miembro?", ["No", "Sí", "Solo para turismos"], "Art. 15.2."],
        ["media", "¿Qué se considera traducción oficial?", ["La de intérpretes jurados, cónsules o entidades autorizadas", "Cualquier traducción", "La traducción automática"], "Art. 21.1.b)."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Autorización ADR (art. 25)", "Necesaria para conducir vehículos de mercancías peligrosas cuando lo exige el ADR; no autoriza por sí sola a conducir sin el permiso ordinario"],
        ["Llevar y exhibir (art. 25.2)", "El titular debe llevarla junto con el permiso y exhibirla a los agentes"],
        ["Vigencia ADR (art. 28)", "Cinco años, prorrogables por periodos iguales con un curso de reciclaje y las pruebas correspondientes"],
        ["Permiso internacional (art. 31)", "Autoriza a conducir temporalmente en los Estados del Convenio de Ginebra de 1949, excepto en el que lo expidió; vale un año"],
        ["Requisitos (art. 32)", "Residencia normal en España, permiso nacional de igual clase en vigor y no estar privado ni suspendido"],
      ],
      preguntas: [
        ["media", "¿Cuál es la vigencia del permiso internacional para conducir?", ["Un año", "Cinco años", "Diez años"], "Art. 31.2."],
        ["media", "¿Autoriza el permiso internacional expedido en España a conducir en España?", ["No, solo en otros Estados contratantes", "Sí", "Solo en Ceuta y Melilla"], "Art. 31.1."],
        ["media", "¿Cuál es la vigencia de la autorización especial para mercancías peligrosas?", ["Cinco años", "Diez años", "Dos años"], "Art. 28.1."],
        ["media", "¿Puede conducirse un camión de mercancías peligrosas solo con la autorización ADR?", ["No, hace falta además el permiso ordinario en vigor", "Sí", "Solo en ciudad"], "Art. 25.2."],
        ["dificil", "¿Qué hay que hacer para prorrogar la autorización ADR?", ["Un curso de reciclaje (o de formación inicial) y superar las pruebas", "Nada", "Un reconocimiento médico solamente"], "Art. 28.3."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["Nulidad y lesividad (art. 34)", "Las autorizaciones pueden declararse nulas o lesivas; el reglamento remite a la Ley 30/1992, hoy sustituida por las Leyes 39/2015 y 40/2015"],
        ["Pérdida de vigencia (art. 35)", "Si el titular deja de reunir los requisitos o pierde todos los puntos; la declara el Jefe Provincial de Tráfico y debe notificarse en seis meses"],
        ["Pérdida total de puntos (art. 37)", "La Jefatura inicia el procedimiento con la relación de sanciones firmes, da diez días de audiencia y resuelve; el permiso se entrega o lo retiran los agentes"],
        ["Plazo para volver a obtenerlo (art. 38.3)", "Seis meses desde la notificación (tres para profesionales); si vuelve a perder todos los puntos en tres años, doce meses (seis para profesionales)"],
        ["Cómo recuperarlo (art. 38.1)", "Curso de sensibilización y reeducación vial y prueba de conocimientos; se obtiene la misma clase con la misma antigüedad"],
        ["Condena de más de dos años (art. 38.4)", "Tras cumplir la condena, puede obtenerse de nuevo la misma clase con la misma antigüedad cumpliendo los requisitos legales"],
        ["Suspensión cautelar (art. 39)", "Cuando mantener el permiso supone grave peligro para el tráfico; el agente retira la autorización al notificar la resolución; conducir entonces equivale a conducir con el permiso suspendido"],
        ["Alcance (art. 40.3)", "La pérdida por puntos o por condena de más de dos años afecta a todas las clases del permiso y a los documentos que dependan de él"],
      ],
      preguntas: [
        ["media", "¿Quién declara la pérdida de vigencia del permiso por pérdida total de puntos?", ["El Jefe Provincial de Tráfico del domicilio del titular", "El alcalde", "El juez"], "Arts. 35.2 y 37.3."],
        ["media", "¿Cuánto tiempo debe esperar un conductor no profesional para volver a obtener el permiso tras perder todos los puntos?", ["Seis meses desde la notificación", "Tres meses", "Dos años"], "Art. 38.3."],
        ["dificil", "Si en los tres años siguientes vuelve a perder todos los puntos, el plazo para un conductor no profesional pasa a ser…", ["Doce meses", "Seis meses", "Tres años"], "Art. 38.3, párrafo segundo."],
        ["media", "¿Qué debe superar para recuperar el permiso?", ["Un curso de sensibilización y reeducación vial y una prueba de conocimientos", "Un examen práctico completo", "Nada"], "Art. 38.1."],
        ["media", "Conducir durante la suspensión cautelar del permiso equivale a…", ["Conducir con el permiso suspendido por sanción", "Conducir sin haber obtenido nunca el permiso", "Una infracción leve"], "Art. 39.3."],
        ["media", "¿A qué clases afecta la pérdida de vigencia por pérdida total de puntos?", ["A todas las clases de las que es titular", "Solo a la B", "Solo a la clase con la que cometió la infracción"], "Art. 40.3."],
      ],
    },
  ],
  glosario: [
    [S1, "Permiso de conducción", "Autorización administrativa reglada que habilita para conducir vehículos de motor y ciclomotores de determinadas clases."],
    [S1, "Licencia de conducción", "Autorización para conducir vehículos para personas de movilidad reducida o vehículos especiales agrícolas."],
    [S1, "CAP", "Certificado de aptitud profesional exigido para la conducción profesional de vehículos de las clases C y D."],
    [S2, "Prórroga de vigencia", "Renovación del permiso por un nuevo periodo tras acreditar las aptitudes psicofísicas."],
    [S2, "Permiso extraordinario", "Permiso sujeto a condiciones restrictivas para quien no puede obtener el ordinario por enfermedad o deficiencia."],
    [S3, "Canje", "Sustitución de un permiso extranjero por el permiso español equivalente."],
    [S3, "Residencia normal", "Lugar donde una persona vive habitualmente, determinante para la validez de los permisos extranjeros."],
    [S4, "ADR", "Acuerdo Europeo sobre Transporte Internacional de mercancías peligrosas por carretera."],
    [S5, "Pérdida de vigencia", "Declaración por la que el permiso deja de habilitar para conducir por perder todos los puntos o los requisitos."],
    [S5, "Suspensión cautelar", "Medida provisional que priva temporalmente de la vigencia del permiso durante un procedimiento."],
  ],
  casos: [
    {
      slug: "caso-control-documentacion-conductores",
      titulo: "Control de documentación en la avenida de Cataluña",
      supuesto: "En un control rutinario, un agente comprueba la documentación de varios conductores: un joven de 17 años que conduce un ciclomotor; una mujer de 45 años con un permiso B que caducó hace dos meses; un hombre que conduce una motocicleta de 125 cm³ con un permiso B de cinco años de antigüedad; y un camionero de 63 años con un permiso C vigente.",
      preguntas: [
        [S1, "media", "¿Qué permiso necesita el joven de 17 años para conducir un ciclomotor?", ["El AM (o uno superior que lo incluya)", "Ninguno", "El B"], "Art. 4.2."],
        [S1, "media", "¿Está obligado a llevar consigo el permiso y exhibirlo?", ["Sí", "No, basta con los datos", "Solo si lo pide el juez"], "Art. 3.2."],
        [S2, "media", "¿Puede la mujer seguir conduciendo con el permiso caducado?", ["No: un permiso caducado no autoriza a conducir", "Sí, hay tres meses de gracia", "Sí, si lo renueva ese mes"], "Art. 12.4."],
        [S2, "media", "¿Qué hace el agente con ese permiso caducado?", ["Lo interviene de inmediato y lo remite a la Jefatura Provincial de Tráfico", "Lo destruye", "Se lo devuelve"], "Art. 12.4."],
        [S2, "media", "¿Puede pedir la prórroga aunque el permiso ya esté caducado?", ["Sí", "No, debe examinarse de nuevo", "Solo en un año"], "Art. 13.3."],
        [S1, "media", "¿Puede el hombre conducir la moto de 125 cm³ con su permiso B de cinco años?", ["Sí, en territorio nacional, si la moto es de las que autoriza el A1", "No", "Solo con sidecar"], "Art. 4.2, clase B."],
        [S1, "dificil", "¿Podría conducir esa moto en Francia con el mismo permiso B?", ["No: la habilitación para motos A1 con el B solo vale dentro del territorio nacional", "Sí", "Solo de día"], "Art. 4.2, clase B: 'dentro del territorio nacional'."],
        [S2, "media", "¿Cuál es la vigencia del permiso C del camionero de 63 años?", ["Cinco años hasta los 65", "Diez años", "Tres años"], "Art. 12.1."],
        [S2, "media", "¿Y a partir de los 65 años?", ["Tres años", "Cinco años", "Un año"], "Art. 12.1."],
        [S1, "media", "¿Su permiso C incluye la clase C1?", ["Sí, la obtención del C implica la del C1", "No", "Solo con examen"], "Art. 5.2.c)."],
      ],
    },
    {
      slug: "caso-conductor-extranjero-permiso",
      titulo: "Un conductor con permiso extranjero",
      supuesto: "La Policía Local da el alto a un conductor de nacionalidad marroquí que reside legalmente en Zaragoza desde hace diez meses. Muestra un permiso marroquí en árabe y francés, sin traducción oficial. Días después, en otro control, una ciudadana portuguesa residente desde hace tres años presenta su permiso portugués en vigor.",
      preguntas: [
        [S3, "media", "¿Cuánto tiempo puede conducir en España con un permiso de un tercer país quien adquiere la residencia normal?", ["Seis meses como máximo, salvo lo que disponga un convenio", "Un año", "Indefinidamente"], "Art. 21.2.c)."],
        [S3, "media", "Con diez meses de residencia, ¿le habilita su permiso marroquí para conducir, a falta de convenio específico?", ["No, ha superado los seis meses", "Sí", "Sí, con traducción"], "Art. 21.3."],
        [S3, "media", "¿Qué debe hacer para seguir conduciendo?", ["Obtener permiso español o canjear el suyo si hay convenio", "Nada", "Pagar una tasa municipal"], "Arts. 21.3 y 22."],
        [S3, "media", "Además, ¿qué requisito formal se exige a un permiso no redactado en castellano?", ["Que se ajuste a los modelos de los Convenios o vaya acompañado de traducción oficial", "Ninguno", "Que esté plastificado"], "Art. 21.1."],
        [S3, "media", "¿Vale en España el permiso portugués de la ciudadana residente?", ["Sí, en sus condiciones de origen", "No", "Solo seis meses"], "Art. 15.1."],
        [S3, "media", "Como residente, ¿a qué normas españolas queda sometida?", ["A las de vigencia, aptitud psicofísica y crédito de puntos", "A ninguna", "Solo a las de velocidad"], "Art. 15.4."],
        [S1, "media", "¿Puede una persona tener a la vez permiso español y permiso portugués?", ["No, solo uno expedido en la UE o el EEE", "Sí", "Solo dos años"], "Art. 1.4."],
        [S3, "dificil", "¿Valdría el permiso portugués si estuviera suspendido en España?", ["No", "Sí", "Solo en Portugal y España"], "Art. 15.2."],
        [S3, "media", "¿Qué edad se exige al titular de un permiso de la UE para conducir en España?", ["La exigida para el permiso español equivalente", "La del país de origen", "18 años siempre"], "Art. 15.1."],
        [S2, "media", "Para obtener un permiso español, un extranjero debe acreditar…", ["Residencia normal o estancia por estudios de al menos seis meses", "Diez años de residencia", "Nacionalidad española"], "Art. 7.1.a)."],
      ],
    },
    {
      slug: "caso-perdida-total-puntos",
      titulo: "Sin puntos y al volante",
      supuesto: "Un repartidor no profesional acumula sanciones firmes hasta perder todos sus puntos. La Jefatura Provincial de Tráfico le notifica la pérdida de vigencia, pero dos meses después la Policía Local lo sorprende conduciendo su furgoneta. Quiere saber cuándo y cómo podrá volver a conducir.",
      preguntas: [
        [S5, "media", "¿Quién inicia el procedimiento de pérdida de vigencia?", ["La Jefatura Provincial de Tráfico", "El Ayuntamiento", "El juzgado"], "Art. 37.1."],
        [S5, "media", "¿Qué plazo de audiencia se le concede en el procedimiento?", ["Diez días como máximo", "Un mes", "Ninguno"], "Art. 37.1."],
        [S5, "media", "Declarada la pérdida de vigencia, si no entrega el permiso…", ["La Jefatura ordena su retirada por los agentes de la autoridad", "Puede seguir usándolo", "Se archiva"], "Art. 37.2."],
        [S5, "media", "¿Cuándo podrá obtener un nuevo permiso?", ["Seis meses después de la notificación", "Tres meses después", "Al día siguiente"], "Art. 38.3."],
        [S5, "media", "¿Qué debe superar?", ["Un curso de sensibilización y reeducación vial y la prueba de conocimientos", "Todas las pruebas de nuevo", "Solo el reconocimiento médico"], "Art. 38.1."],
        [S5, "media", "¿Con qué antigüedad recuperará el permiso?", ["Con la misma antigüedad que tenía", "Como conductor novel de cero", "Con un año menos"], "Art. 38.1."],
        [S5, "media", "¿A qué clases de permiso afecta la pérdida de vigencia?", ["A todas", "Solo a la B", "Solo a la que usaba"], "Art. 40.3."],
        [S2, "media", "¿Sigue vigente un permiso cuyo titular ha perdido todos los puntos?", ["No, la vigencia está condicionada a no perderlos todos", "Sí, hasta su caducidad", "Sí, durante un año"], "Art. 12.5."],
        [S5, "dificil", "Si en los tres años siguientes a recuperarlo vuelve a perder todos los puntos, ¿cuánto deberá esperar?", ["Doce meses", "Seis meses", "Dos años"], "Art. 38.3."],
        [S5, "media", "¿Quién es competente para declarar la pérdida de vigencia?", ["El Jefe de Tráfico de la provincia del domicilio del titular", "El alcalde de Zaragoza", "El Director General de Tráfico"], "Art. 37.3."],
      ],
    },
  ],
});
