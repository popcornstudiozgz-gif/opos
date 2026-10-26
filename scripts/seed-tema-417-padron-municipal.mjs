/**
 * Crea tema-417 — Tema 3 de Subalterna/o (Ayto. Zaragoza, CONV 5/2026,
 * Anexo I): "El Padrón municipal. Información sobre realización de trámites
 * padronales. Alta padronal. Cambio de domicilio. Renovación de residentes
 * extranjeros. Certificados y volantes de empadronamiento."
 *
 * La convocatoria es exclusiva para personas con discapacidad intelectual:
 * el texto de flashcards y preguntas usa frases cortas y lenguaje sencillo.
 *
 * Fuentes leídas en esta sesión:
 * - Ley 7/1985, de Bases del Régimen Local (BOE-A-1985-5392), arts. 15-18
 *   (API del BOE).
 * - RD 1690/1986, Reglamento de Población y Demarcación Territorial
 *   (BOE-A-1986-21944), arts. 53-55, 59, 61, 68, 70 y 72, en su redacción
 *   tras el RD 141/2024 (API del BOE).
 * - Resolución de 17-02-2020 del INE y la DG de Cooperación Autonómica y
 *   Local, publicada por Resolución de 29-04-2020 (BOE-A-2020-4784):
 *   tramitación del alta (comprobación en tres meses y silencio positivo),
 *   renovación y caducidad de los ENCSARP, certificados y volantes
 *   (comprobación durante al menos tres meses, sin cláusula de caducidad,
 *   certificados colectivos y protección de datos).
 * - Fichas municipales de zaragoza.es: «Padrón: Altas» (tramite/3317),
 *   «Padrón: Cambio de domicilio» (tramite/3319) y sus preguntas
 *   frecuentes (materia/1001): el alta es solo presencial; el cambio de
 *   domicilio también por internet; documentos de identidad, domicilio y
 *   representación; impresos M004 y M005; alta de recién nacidos de oficio;
 *   lugares y horarios; usos del volante y del certificado.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-417-padron-municipal.mjs
 */
import { sembrarTema, SUBALTERNO } from "./lib/sembrar-tema.mjs";

const LBRL = "https://www.boe.es/buscar/act.php?id=BOE-A-1985-5392";
const RPDTEL = "https://www.boe.es/buscar/act.php?id=BOE-A-1986-21944";
const INE = "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2020-4784";
const ALTAS = "https://www.zaragoza.es/sede/servicio/tramite/3317";
const S1 = "padron-concepto-vecinos";
const S2 = "alta-cambio-domicilio";
const S3 = "renovacion-extranjeros";
const S4 = "certificados-volantes";

await sembrarTema({
  tema: {
    slug: "tema-417",
    titulo: "El Padrón municipal: alta, cambio de domicilio, renovación de residentes extranjeros y certificados y volantes",
    descripcion: "Qué es el Padrón municipal y quién debe inscribirse (Ley 7/1985, arts. 15-18; RD 1690/1986). Los vecinos y sus derechos y deberes. Trámites padronales en Zaragoza: alta (solo presencial), cambio de domicilio (en persona o por internet), documentos de identidad, de domicilio y de representación, empadronamiento en casa de otra persona y de menores, alta de recién nacidos. Renovación cada dos años de los extranjeros no comunitarios sin residencia de larga duración y baja por caducidad. Certificados y volantes de empadronamiento: diferencias, quién los firma y para qué sirven.",
    contenido: "Qué es el padrón, quién tiene que apuntarse, cómo se da de alta una persona o se cambia de casa, qué tiene que renovar un vecino extranjero y en qué se diferencian un certificado y un volante de empadronamiento.",
    enlaces_boe: [
      { url: LBRL, titulo: "Ley 7/1985, de 2 de abril, Reguladora de las Bases del Régimen Local, arts. 15-18 (BOE-A-1985-5392)" },
      { url: RPDTEL, titulo: "Real Decreto 1690/1986, de 11 de julio, Reglamento de Población y Demarcación Territorial de las Entidades Locales (BOE-A-1986-21944)" },
      { url: INE, titulo: "Resolución de 29 de abril de 2020: instrucciones técnicas sobre la gestión del Padrón municipal (BOE-A-2020-4784)" },
      { url: ALTAS, titulo: "Padrón: Altas. Trámites y servicios, Ayuntamiento de Zaragoza" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "El Padrón municipal y los vecinos", articulos: "arts. 15-18 Ley 7/1985; arts. 53-55 RD 1690/1986", url: `${LBRL}#a15` },
      { seccion: S2, titulo: "Alta padronal y cambio de domicilio", articulos: "arts. 59, 68 y 70 RD 1690/1986; fichas municipales", url: ALTAS },
      { seccion: S3, titulo: "Renovación de residentes extranjeros", articulos: "art. 16.1 Ley 7/1985; Resolución INE 2020, apdo. 6", url: `${LBRL}#a16` },
      { seccion: S4, titulo: "Certificados y volantes de empadronamiento", articulos: "art. 61 RD 1690/1986; Resolución INE 2020, apdo. 8.1.1", url: RPDTEL },
    ],
  },
  vinculo: { oposicion: SUBALTERNO.oposicion, bloqueId: SUBALTERNO.bloque, numero: 3 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["¿Qué es el Padrón municipal?", "Es el registro del Ayuntamiento donde aparecen los vecinos del municipio. Prueba dónde vive cada persona (art. 16 Ley 7/1985)"],
        ["¿Quién debe empadronarse?", "Toda persona que vive en España, en el municipio donde vive habitualmente. Si vive en varios, en el que pasa más tiempo al año (art. 15)"],
        ["¿Cuándo se es vecino?", "Desde el momento en que la persona se inscribe en el Padrón. Solo se puede ser vecino de un municipio"],
        ["Población del municipio", "Es el conjunto de personas inscritas en su Padrón"],
        ["Datos obligatorios del Padrón", "Nombre y apellidos, sexo, domicilio, nacionalidad, lugar y fecha de nacimiento, número de DNI o documento de extranjero y título escolar o académico (art. 16.2)"],
        ["¿Quién lleva el Padrón?", "El Ayuntamiento lo forma, lo mantiene, lo revisa y lo custodia, con medios informáticos, y envía los datos al Instituto Nacional de Estadística (INE) (art. 17)"],
        ["Menores", "Los menores no emancipados tienen la misma vecindad que los padres que tienen su guarda y custodia (art. 54 RD 1690/1986)"],
        ["Padrón y extranjeros", "Estar empadronado no prueba que un extranjero resida legalmente en España ni le da derechos que no tenga por ley (art. 18.2)"],
      ],
      preguntas: [
        ["facil", "El Padrón municipal es:", ["El registro donde aparecen los vecinos del municipio", "La lista de coches del municipio", "El registro de empresas"], "Art. 16.1 Ley 7/1985."],
        ["facil", "Una persona es vecina del municipio:", ["Desde que se inscribe en el Padrón", "Después de vivir allí cinco años", "Cuando compra una casa"], "Art. 15 Ley 7/1985."],
        ["media", "Si una persona vive en dos municipios, se empadrona:", ["En el que vive más tiempo al año", "En los dos", "En el que prefiera aunque no viva allí"], "Art. 15 Ley 7/1985."],
        ["media", "¿Cuántos municipios puede tener una persona como vecindad?", ["Solo uno", "Dos", "Todos los que quiera"], "Art. 55.2 RD 1690/1986."],
        ["media", "¿Quién se encarga de mantener el Padrón de Zaragoza?", ["El Ayuntamiento de Zaragoza", "El Gobierno de Aragón", "La Policía Nacional"], "Art. 17 Ley 7/1985."],
        ["dificil", "Estar empadronado, para una persona extranjera:", ["No prueba que resida legalmente en España", "Le da permiso de trabajo", "Le da la nacionalidad española"], "Art. 18.2 Ley 7/1985."],
        ["media", "¿Cuál es un dato obligatorio del Padrón?", ["El domicilio", "El color de pelo", "La profesión de los padres"], "Art. 16.2 Ley 7/1985."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Alta en el Padrón en Zaragoza", "Se hace solo en persona: en la Oficina de Relaciones con la Ciudadanía (Plaza del Pilar, 18) o en las Juntas Municipales y Vecinales"],
        ["Cambio de domicilio", "Si te mudas dentro de Zaragoza, debes comunicarlo. Se puede hacer en persona o por internet con certificado electrónico o Cl@ve"],
        ["Documentos para el alta o el cambio", "1) Identidad: DNI, NIE o pasaporte. 2) Domicilio: contrato de alquiler, escritura o un recibo de luz o agua. 3) Representación, si el trámite lo hace otra persona"],
        ["Hacer el trámite por otra persona", "Hace falta una autorización: el impreso M004"],
        ["Vivir en casa de otra persona sin contrato", "El titular de la vivienda autoriza el empadronamiento con el impreso M005, y se presenta con los DNI y un documento que pruebe que es propietario o inquilino"],
        ["Bebés recién nacidos", "Normalmente el Ayuntamiento los da de alta de oficio cuando recibe sus datos del Registro Civil a través del INE"],
        ["Comprobación de los datos", "El Ayuntamiento puede comprobar los datos; tiene tres meses para resolver. Si no responde en ese plazo, la persona queda empadronada (silencio positivo)"],
        ["Obligación de comunicar cambios", "Todos los vecinos deben comunicar los cambios de sus datos; dar datos falsos o no comunicar cambios puede tener multa (art. 68 RD 1690/1986)"],
        ["Cambio de municipio", "Quien se va a vivir a otro municipio pide el alta en el nuevo; ese Ayuntamiento lo comunica al INE y el municipio anterior le da de baja sin más trámite (art. 70)"],
      ],
      preguntas: [
        ["facil", "En Zaragoza, el alta en el Padrón se hace:", ["Solo en persona", "Solo por internet", "Solo por teléfono"], "Ficha «Padrón: Altas»."],
        ["media", "El cambio de domicilio dentro de Zaragoza se puede hacer:", ["En persona o por internet con certificado o Cl@ve", "Solo por carta", "Solo en el Gobierno de Aragón"], "Ficha «Padrón: Cambio de domicilio»."],
        ["media", "Para empadronarse hay que llevar un documento de identidad y otro que pruebe:", ["Que se vive en esa vivienda", "Que se tiene trabajo", "Que se tiene coche"], "Fichas municipales del padrón."],
        ["media", "Si otra persona hace el trámite por ti, necesita el impreso:", ["M004 (autorización)", "M005", "M001"], "Fichas municipales del padrón."],
        ["media", "Si vives en casa de un amigo sin contrato, el amigo debe firmar el impreso:", ["M005", "M004", "Ninguno"], "Preguntas frecuentes del padrón."],
        ["media", "Normalmente, ¿quién empadrona a un bebé recién nacido?", ["El Ayuntamiento, de oficio, con los datos del Registro Civil", "El hospital", "El colegio"], "Preguntas frecuentes del padrón."],
        ["dificil", "Si el Ayuntamiento no resuelve la solicitud de alta en tres meses:", ["La persona queda empadronada (silencio positivo)", "La solicitud se anula", "La persona recibe una multa"], "Resolución INE 2020, apdo. 1.13."],
        ["media", "Si te vas a vivir a otro municipio, debes pedir:", ["El alta en el nuevo municipio", "La baja en todos los municipios de España", "Nada"], "Art. 70 RD 1690/1986."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["¿Quién debe renovar el empadronamiento?", "Las personas extranjeras de fuera de la Unión Europea que no tienen autorización de residencia permanente (de larga duración). Se les llama ENCSARP"],
        ["¿Cada cuánto se renueva?", "Cada dos años desde la última inscripción o renovación (art. 16.1 Ley 7/1985)"],
        ["¿Cómo saber la fecha?", "Mirando la fecha que aparece en el último volante o certificado de empadronamiento"],
        ["Si no se renueva", "La inscripción caduca y la persona es dada de baja del Padrón. La caducidad puede declararse sin audiencia previa"],
        ["Consecuencias de la baja", "Se pierde la condición de vecino; puede afectar a la asistencia sanitaria, a la matrícula de los niños en el colegio o a ayudas"],
        ["Renovar por medio de otra persona", "Es posible, pero el representante debe llevar el formulario M007-bis, su DNI, copia del documento del interesado y un poder legal (por ejemplo, notarial). No basta una autorización simple"],
        ["Aviso del Ayuntamiento", "El INE avisa al Ayuntamiento de las inscripciones que caducan en tres meses, y el Ayuntamiento puede avisar a la persona antes"],
        ["Ciudadanos de la Unión Europea", "No tienen que renovar cada dos años, pero el Ayuntamiento comprueba periódicamente que siguen viviendo en el municipio"],
      ],
      preguntas: [
        ["media", "¿Cada cuánto deben renovar su empadronamiento los extranjeros no comunitarios sin residencia permanente?", ["Cada dos años", "Cada año", "Cada diez años"], "Art. 16.1 Ley 7/1985."],
        ["media", "Si no renuevan a tiempo:", ["Su inscripción caduca y se les da de baja", "No pasa nada", "Se les renueva automáticamente"], "Art. 16.1 Ley 7/1985."],
        ["facil", "La fecha para renovar se puede ver en:", ["El último volante o certificado de empadronamiento", "El recibo del agua", "El carné de la biblioteca"], "Preguntas frecuentes del padrón."],
        ["media", "¿Deben renovar cada dos años los ciudadanos de la Unión Europea?", ["No", "Sí", "Solo los mayores de 65 años"], "Art. 16.1 Ley 7/1985."],
        ["dificil", "Si otra persona renueva en nombre del extranjero, necesita:", ["Un poder legal, como un poder notarial", "Solo una nota firmada", "Nada, basta con ir"], "Preguntas frecuentes del padrón."],
        ["media", "¿Qué puede pasar si una persona pierde el empadronamiento?", ["Puede tener problemas con la sanidad, el colegio o las ayudas", "Gana derechos", "Nada"], "Preguntas frecuentes del padrón."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Certificado de empadronamiento", "Documento público que prueba de forma oficial (fehaciente) dónde vive una persona"],
        ["¿Quién firma el certificado?", "El Secretario del Ayuntamiento, con el visto bueno del Alcalde (o quien los sustituya). Por eso tarda más (art. 61 RD 1690/1986)"],
        ["Volante de empadronamiento", "Documento solo informativo sobre el domicilio. No necesita firma de ningún funcionario"],
        ["¿Para qué sirve el volante?", "Para la mayoría de trámites: tarjeta sanitaria, colegio, becas, pareja de hecho, residencia y trabajo, dependencia, familia numerosa, entre otros"],
        ["¿Cuándo se pide el certificado?", "Para matrimonio civil, embajadas y consulados, nacionalidad y prestación por hijo a cargo, entre otros"],
        ["Certificado histórico", "Indica todo el tiempo que una persona ha estado empadronada en Zaragoza"],
        ["¿Caducan?", "No llevan fecha de caducidad; el Ayuntamiento puede permitir comprobar su autenticidad durante al menos tres meses"],
        ["Certificado o volante colectivo", "Incluye a todas las personas de un domicilio. Si lo pide un particular, necesita el consentimiento de todos o un interés legítimo, por la protección de datos"],
      ],
      preguntas: [
        ["facil", "El documento que prueba de forma oficial dónde vive una persona es:", ["El certificado de empadronamiento", "El volante de empadronamiento", "El recibo de la luz"], "Art. 53.1 RD 1690/1986."],
        ["media", "El volante de empadronamiento:", ["Es solo informativo y no necesita firma de ningún funcionario", "Lo firma el Alcalde", "Solo sirve para casarse"], "Art. 61 RD 1690/1986."],
        ["media", "El certificado de empadronamiento lo firma:", ["El Secretario del Ayuntamiento con el visto bueno del Alcalde", "El propio vecino", "El conserje"], "Art. 61 RD 1690/1986 y arts. 204-205 ROF."],
        ["media", "¿Qué documento suele bastar para matricular a un niño en el colegio?", ["El volante", "El certificado histórico", "Ninguno"], "Preguntas frecuentes del padrón."],
        ["media", "Para la nacionalidad o un trámite en un consulado se suele pedir:", ["El certificado", "El volante", "Una fotocopia del DNI"], "Preguntas frecuentes del padrón."],
        ["dificil", "Un certificado o volante de todas las personas de una casa, pedido por un particular, necesita:", ["El consentimiento de todos o un interés legítimo", "Solo pagar una tasa", "Nada especial"], "Resolución INE 2020, apdo. 8.1.1."],
        ["media", "El certificado que indica todo el tiempo que alguien ha estado empadronado se llama:", ["Certificado histórico", "Volante colectivo", "Hoja padronal"], "Preguntas frecuentes del padrón."],
      ],
    },
  ],
  glosario: [
    [S1, "Padrón", "Lista oficial del Ayuntamiento con las personas que viven en el municipio."],
    [S1, "Vecino", "Persona que vive en un municipio y está inscrita en su Padrón."],
    [S1, "INE", "Instituto Nacional de Estadística: recibe los datos de todos los Padrones de España."],
    [S2, "Alta", "Inscripción de una persona en el Padrón."],
    [S2, "Baja", "Salida de una persona del Padrón, por ejemplo al irse a otro municipio."],
    [S2, "De oficio", "Que lo hace el Ayuntamiento por su cuenta, sin que lo pida la persona."],
    [S2, "Representación", "Permiso para hacer un trámite en nombre de otra persona."],
    [S3, "ENCSARP", "Extranjeros de fuera de la Unión Europea sin autorización de residencia permanente; deben renovar el padrón cada dos años."],
    [S3, "Caducidad", "Pérdida de la inscripción en el Padrón por no renovarla a tiempo."],
    [S4, "Certificado de empadronamiento", "Documento oficial firmado que prueba dónde vive una persona."],
    [S4, "Volante de empadronamiento", "Documento informativo, sin firma, que indica el domicilio."],
    [S4, "Fehaciente", "Que sirve como prueba oficial."],
  ],
  casos: [
    {
      slug: "familia-nueva-en-zaragoza",
      titulo: "Una familia nueva en Zaragoza",
      supuesto: "Trabajas de subalterno en la Oficina de Relaciones con la Ciudadanía, en la Plaza del Pilar. Llega una familia que viene de Huesca: el padre, la madre y un bebé de dos meses. Han alquilado un piso en Zaragoza y quieren empadronarse. Te preguntan qué tienen que hacer.",
      preguntas: [
        [S2, "facil", "¿Cómo se hace el alta en el Padrón de Zaragoza?", ["En persona", "Por correo postal", "Por teléfono"], "Ficha «Padrón: Altas»."],
        [S2, "media", "¿Qué documento prueba que viven en el piso?", ["El contrato de alquiler", "La tarjeta sanitaria", "El carné de conducir"], "Fichas municipales del padrón."],
        [S2, "media", "¿Qué documentos de identidad deben llevar?", ["Los de todas las personas que se empadronan", "Solo el del padre", "Ninguno"], "Ficha «Padrón: Altas»."],
        [S2, "media", "Para empadronar al bebé deben presentar, además:", ["Documentos que acrediten la filiación (que es su hijo)", "Su DNI de adulto", "Nada"], "Ficha «Padrón: Altas»."],
        [S2, "media", "¿Tienen que darse de baja en Huesca?", ["No: Zaragoza lo comunica al INE y Huesca les da de baja", "Sí, antes de venir", "Sí, por carta al INE"], "Art. 70 RD 1690/1986."],
        [S1, "media", "¿Desde cuándo serán vecinos de Zaragoza?", ["Desde que se inscriban en el Padrón", "Dentro de un año", "Cuando cobren el primer sueldo"], "Art. 15 Ley 7/1985."],
        [S2, "media", "¿Necesitan cita previa en esta oficina?", ["No, la Oficina de Plaza del Pilar atiende sin cita previa", "Sí, siempre", "Solo por la tarde"], "Ficha «Padrón: Altas»."],
        [S4, "media", "Después quieren pedir plaza en una escuela infantil. ¿Qué documento suele bastar?", ["El volante de empadronamiento", "El certificado histórico", "El certificado de matrimonio"], "Preguntas frecuentes del padrón."],
        [S1, "media", "¿Es obligatorio que se empadronen?", ["Sí, toda persona debe inscribirse donde vive", "No, es voluntario", "Solo si trabajan en Zaragoza"], "Art. 15 Ley 7/1985."],
        [S2, "dificil", "Si el Ayuntamiento quiere comprobar sus datos, ¿cuánto tiempo tiene para resolver?", ["Tres meses", "Un año", "Una semana"], "Resolución INE 2020, apdo. 1.11."],
      ],
    },
    {
      slug: "vecino-extranjero-renovacion",
      titulo: "Un vecino que tiene que renovar",
      supuesto: "Un vecino de Colombia, sin residencia permanente, viene a la Junta Municipal donde trabajas. Lleva casi dos años empadronado y le han dicho que tiene que «renovar el padrón». Además, su hermana se va de viaje y quiere que él renueve también por ella.",
      preguntas: [
        [S3, "media", "¿Por qué tiene que renovar?", ["Porque es extranjero de fuera de la UE sin residencia permanente", "Porque ha cambiado de piso", "Porque ha cumplido años"], "Art. 16.1 Ley 7/1985."],
        [S3, "media", "¿Cada cuánto tiempo debe renovar?", ["Cada dos años", "Cada cinco años", "Cada mes"], "Art. 16.1 Ley 7/1985."],
        [S3, "facil", "¿Dónde puede ver la fecha límite?", ["En su último volante o certificado de empadronamiento", "En su pasaporte", "En el recibo del gas"], "Preguntas frecuentes del padrón."],
        [S3, "media", "Si no renueva a tiempo:", ["Le darán de baja por caducidad", "Le renuevan solo", "Le ponen una multa de tráfico"], "Art. 16.1 Ley 7/1985."],
        [S3, "dificil", "Para renovar por su hermana necesita:", ["Un poder legal, el formulario M007-bis, su DNI y copia del documento de ella", "Solo una nota de ella", "Nada, basta con decirlo"], "Preguntas frecuentes del padrón."],
        [S3, "media", "Si le dan de baja, puede tener problemas con:", ["La sanidad, el colegio de sus hijos o las ayudas", "El color de su coche", "Su equipo de fútbol"], "Preguntas frecuentes del padrón."],
        [S1, "media", "Estar empadronado, ¿le da permiso de residencia?", ["No", "Sí", "Sí, si lleva dos años"], "Art. 18.2 Ley 7/1985."],
        [S2, "media", "En la Junta Municipal, el horario con cita previa es:", ["De 8:30 a 9:30", "De 16 a 19 h", "Todo el día"], "Fichas municipales del padrón."],
        [S2, "media", "¿Cómo se pide la cita previa en la Junta?", ["En línea o por teléfono", "Solo por carta", "No se puede pedir"], "Fichas municipales del padrón."],
        [S4, "media", "Después quiere un documento para su embajada. ¿Cuál suele pedirse?", ["El certificado de empadronamiento", "El volante", "Una foto de la casa"], "Preguntas frecuentes del padrón."],
      ],
    },
    {
      slug: "mudanza-certificado-colectivo",
      titulo: "La mudanza de Marta",
      supuesto: "Marta vive en Zaragoza y se muda a casa de su amiga Laura, en otro barrio. No tiene contrato, porque el piso es de Laura. Además, Marta quiere un papel con todas las personas que viven en su casa nueva para una beca.",
      preguntas: [
        [S2, "media", "¿Qué trámite debe hacer Marta?", ["Cambio de domicilio en el Padrón", "Alta nueva como si viniera de fuera", "Ninguno"], "Ficha «Padrón: Cambio de domicilio»."],
        [S2, "media", "¿Cómo puede hacerlo?", ["En persona o por internet con certificado o Cl@ve", "Solo en Madrid", "Solo por fax"], "Ficha «Padrón: Cambio de domicilio»."],
        [S2, "media", "Como no tiene contrato, Laura debe firmar:", ["La autorización M005", "El impreso M004", "Nada"], "Preguntas frecuentes del padrón."],
        [S2, "media", "Laura debe presentar además un documento que pruebe que:", ["Es propietaria o inquilina del piso", "Tiene trabajo", "Tiene coche"], "Preguntas frecuentes del padrón."],
        [S2, "media", "¿Es obligatorio comunicar el cambio de casa?", ["Sí, aunque no hay un plazo concreto", "No", "Solo si cambia de ciudad"], "Preguntas frecuentes del padrón."],
        [S2, "dificil", "Si Marta da datos falsos en el Padrón:", ["Puede ser sancionada con multa", "No pasa nada", "Le dan un premio"], "Fichas municipales y art. 68 RD 1690/1986."],
        [S4, "media", "Un volante con todas las personas de la casa se llama:", ["Volante colectivo", "Volante histórico", "Certificado de nacimiento"], "Resolución INE 2020."],
        [S4, "dificil", "Para pedir ese volante colectivo necesita:", ["El consentimiento de todas las personas de la casa o un interés legítimo", "Solo su DNI", "Pagar una multa"], "Resolución INE 2020, apdo. 8.1.1."],
        [S4, "media", "Para la beca, ¿suele bastar el volante?", ["Sí, el volante sirve para la mayoría de trámites, incluidas las becas", "No, siempre hace falta el certificado", "No sirve ningún documento"], "Preguntas frecuentes del padrón."],
        [S4, "media", "¿El volante lleva fecha de caducidad?", ["No", "Sí, caduca a los 7 días", "Sí, caduca al año"], "Resolución INE 2020, apdo. 8.1.1."],
      ],
    },
  ],
});
