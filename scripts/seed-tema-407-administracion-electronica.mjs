/**
 * Crea tema-407 — Tema 35 de Administrativo DGA (tema 30 del programa de
 * materias específicas): "La Administración electrónica para mejorar la
 * relación con los ciudadanos. Sujetos obligados a relacionarse
 * electrónicamente con la Administración. Certificados, identificación y
 * firma electrónica. Representación. Oficina de asistencia en materia de
 * registros. Sistema de Interconexión de Registros. Notificación
 * electrónica."
 *
 * No se reutiliza tema-27 (Auxiliar DGA, "La Administración electrónica"):
 * solo cubre documentos y expedientes electrónicos y ofimática, no los
 * puntos de este programa. (tema-406 queda sin usar: el número 34 es el
 * tema-36 reutilizado.)
 *
 * Fuentes (textos consolidados leídos en esta sesión en la API del BOE):
 * - Ley 39/2015, LPAC (BOE-A-2015-10565): arts. 5, 6, 9-14, 16, 41, 43 y
 *   DA 2.ª.
 * - Ley 40/2015, LRJSP (BOE-A-2015-10566): arts. 38, 40, 42 y 43.
 * - RD 203/2021, Reglamento de actuación y funcionamiento del sector
 *   público por medios electrónicos (BOE-A-2021-5032): arts. 37, 38, 40,
 *   41, 42 y 60 (SIR).
 * - Ley 6/2020, de servicios electrónicos de confianza (BOE-A-2020-14046):
 *   arts. 1, 3, 4 y 6 (complementa el Reglamento (UE) 910/2014, eIDAS).
 * El art. 40 RD 203/2021 regula las oficinas de asistencia de la AGE; se
 * usa como descripción de sus funciones, que la LPAC (arts. 12, 16 y 41)
 * exige a todas las Administraciones.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-407-administracion-electronica.mjs
 */
import { sembrarTema, ADMIN_DGA } from "./lib/sembrar-tema.mjs";

const LPAC = "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565";
const LRJSP = "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10566";
const RD203 = "https://www.boe.es/buscar/act.php?id=BOE-A-2021-5032";
const L6 = "https://www.boe.es/buscar/act.php?id=BOE-A-2020-14046";
const S1 = "administracion-electronica-derechos";
const S2 = "sujetos-obligados";
const S3 = "certificados-identificacion-firma";
const S4 = "representacion-apoderamientos";
const S5 = "registros-oficinas-asistencia-sir";
const S6 = "notificacion-electronica";

await sembrarTema({
  tema: {
    slug: "tema-407",
    titulo: "La Administración electrónica: sujetos obligados, certificados, identificación y firma, representación, oficinas de asistencia en materia de registros, SIR y notificación electrónica",
    descripcion: "La Administración electrónica como medio para mejorar la relación con la ciudadanía: derechos de las personas (art. 13 LPAC), asistencia en el uso de medios electrónicos, sede electrónica y Punto de Acceso General. Derecho y obligación de relacionarse electrónicamente (art. 14 LPAC). Certificados electrónicos cualificados (Ley 6/2020 y Reglamento eIDAS), sistemas de identificación y de firma de los interesados (arts. 9-11 LPAC) y de las Administraciones (sello, CSV, firma del personal). Representación y registros electrónicos de apoderamientos. Registro electrónico general, lugares de presentación, oficinas de asistencia en materia de registros y Sistema de Interconexión de Registros. Notificación electrónica: preferencia, comparecencia en sede o dirección electrónica habilitada única, avisos y rechazo a los diez días naturales.",
    contenido: "Cómo se relacionan ciudadanos y empresas con el Gobierno de Aragón por Internet: quién está obligado a hacerlo (empresas, profesionales colegiados, los propios empleados públicos…), cómo se identifica y firma uno (certificado, DNI electrónico, Cl@ve), cómo actuar en nombre de otro, qué hacen las oficinas de registro presenciales, cómo viajan los escritos entre Administraciones (SIR) y cuándo se entiende hecha una notificación electrónica.",
    enlaces_boe: [
      { url: LPAC, titulo: "Ley 39/2015, del Procedimiento Administrativo Común de las Administraciones Públicas (BOE-A-2015-10565)" },
      { url: LRJSP, titulo: "Ley 40/2015, de Régimen Jurídico del Sector Público (BOE-A-2015-10566)" },
      { url: RD203, titulo: "Real Decreto 203/2021, Reglamento de actuación y funcionamiento del sector público por medios electrónicos (BOE-A-2021-5032)" },
      { url: L6, titulo: "Ley 6/2020, reguladora de determinados aspectos de los servicios electrónicos de confianza (BOE-A-2020-14046)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "La Administración electrónica y los derechos de las personas", articulos: "arts. 12-13 LPAC; art. 38 LRJSP", url: `${LPAC}#a13` },
      { seccion: S2, titulo: "Sujetos obligados a relacionarse electrónicamente", articulos: "art. 14 LPAC", url: `${LPAC}#a14` },
      { seccion: S3, titulo: "Certificados, identificación y firma electrónica", articulos: "arts. 9-11 LPAC; arts. 40, 42 y 43 LRJSP; arts. 1, 4 y 6 Ley 6/2020", url: `${LPAC}#a9` },
      { seccion: S4, titulo: "La representación y los registros de apoderamientos", articulos: "arts. 5-6 LPAC", url: `${LPAC}#a5` },
      { seccion: S5, titulo: "Registros, oficinas de asistencia en materia de registros y SIR", articulos: "art. 16 y DA 2.ª LPAC; arts. 37, 40 y 60 RD 203/2021", url: `${LPAC}#a16` },
      { seccion: S6, titulo: "La notificación electrónica", articulos: "arts. 41 y 43 LPAC; art. 42 RD 203/2021", url: `${LPAC}#a43` },
    ],
  },
  vinculo: { oposicion: ADMIN_DGA.oposicion, bloqueId: ADMIN_DGA.bloqueInformatica, numero: 35 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Derechos electrónicos (art. 13 LPAC)", "Comunicarse a través de un Punto de Acceso General electrónico; ser asistido en el uso de medios electrónicos; obtener y usar los medios de identificación y firma; protección de datos y seguridad de los sistemas"],
        ["Garantía de acceso (art. 12.1 LPAC)", "Las Administraciones deben poner a disposición los canales, sistemas y aplicaciones para relacionarse electrónicamente"],
        ["Asistencia (art. 12.2 LPAC)", "Se asiste a los no obligados que lo pidan, en identificación y firma, presentación en el registro y copias auténticas"],
        ["Firma por funcionario habilitado (art. 12.2-3 LPAC)", "Si el interesado no obligado carece de medios, un funcionario habilitado puede identificarle o firmar por él con su consentimiento expreso; constan en un registro de funcionarios habilitados"],
        ["Sede electrónica (art. 38 LRJSP)", "Dirección electrónica de titularidad de una Administración; su titular responde de la integridad, veracidad y actualización de la información y servicios"],
        ["Principios de las sedes (art. 38.3 LRJSP)", "Transparencia, publicidad, responsabilidad, calidad, seguridad, disponibilidad, accesibilidad, neutralidad e interoperabilidad"],
        ["Mejora de la relación", "La tramitación electrónica permite presentar escritos en cualquier momento, consultar el estado de los expedientes, evitar desplazamientos y no aportar documentos que ya tiene la Administración"],
      ],
      preguntas: [
        ["media", "Es un derecho de las personas en sus relaciones con las Administraciones:", ["Ser asistidas en el uso de medios electrónicos", "Elegir el funcionario que tramita", "No identificarse nunca", "Exigir la tramitación en papel aunque estén obligadas a la vía electrónica"], "Art. 13.b) LPAC."],
        ["media", "Un funcionario puede firmar electrónicamente por un interesado no obligado que carece de medios si:", ["Está habilitado y el interesado se identifica y presta su consentimiento expreso", "Lo decide el funcionario sin más", "El interesado es una empresa", "Nunca"], "Art. 12.2 LPAC."],
        ["media", "La dirección electrónica cuya titularidad corresponde a una Administración es su:", ["Sede electrónica", "Dirección electrónica habilitada única", "Cuenta de correo", "Página personal"], "Art. 38.1 LRJSP."],
        ["dificil", "En el registro de funcionarios habilitados deben constar, al menos:", ["Los que prestan servicios en las oficinas de asistencia en materia de registros", "Todos los funcionarios de la Comunidad", "Solo los altos cargos", "Los interinos"], "Art. 12.3 LPAC."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Regla general (art. 14.1 LPAC)", "Las personas físicas eligen en todo momento si se comunican por medios electrónicos o no, salvo obligación, y pueden cambiar de medio"],
        ["Obligados (art. 14.2 LPAC)", "Personas jurídicas; entidades sin personalidad jurídica; profesionales de colegiación obligatoria en su actividad (incluidos notarios y registradores); representantes de obligados; empleados públicos por razón de su condición"],
        ["Ampliación reglamentaria (art. 14.3 LPAC)", "Puede imponerse la vía electrónica a colectivos de personas físicas con capacidad económica, técnica o profesional que acredite acceso a los medios"],
        ["Empleados públicos (art. 14.2.e LPAC)", "Obligados en los trámites que realicen con su Administración como empleados (por ejemplo, participar en procesos de provisión), según determine cada Administración"],
        ["Consecuencia práctica", "Si un obligado presenta en papel, la Administración le requiere la subsanación electrónica y se considera fecha de presentación la de la subsanación (art. 68.4 LPAC)"],
      ],
      preguntas: [
        ["media", "Está obligada a relacionarse electrónicamente con la Administración:", ["Una sociedad limitada", "Una persona física jubilada", "Un estudiante", "Cualquier persona física en todo caso"], "Art. 14.2.a) LPAC."],
        ["media", "Una arquitecta colegiada, en los trámites de su actividad profesional:", ["Está obligada a relacionarse electrónicamente", "Puede elegir siempre el papel", "Solo puede usar el correo postal", "Debe acudir presencialmente"], "Art. 14.2.c) LPAC."],
        ["media", "Las personas físicas, con carácter general:", ["Pueden elegir si se relacionan por medios electrónicos o no", "Están obligadas a la vía electrónica", "Solo pueden usar el papel", "Necesitan representante"], "Art. 14.1 LPAC."],
        ["dificil", "Un funcionario que solicita participar en un concurso de traslados de su Administración:", ["Está obligado a relacionarse electrónicamente en ese trámite, en la forma que determine su Administración", "Puede presentar siempre en papel", "Debe hacerlo por correo postal", "No puede presentar nada"], "Art. 14.2.e) LPAC."],
        ["media", "Quien representa a una empresa ante la Administración:", ["Está obligado a relacionarse electrónicamente", "Puede elegir siempre el papel", "No puede actuar", "Necesita autorización judicial"], "Art. 14.2.d) LPAC."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Marco de los certificados (art. 1 Ley 6/2020)", "La Ley 6/2020 complementa el Reglamento (UE) 910/2014 (eIDAS) sobre identificación electrónica y servicios de confianza"],
        ["Vigencia de certificados cualificados (art. 4 Ley 6/2020)", "No superior a cinco años; se extinguen por caducidad o revocación"],
        ["Identidad en el certificado (art. 6 Ley 6/2020)", "Persona física: nombre, apellidos y DNI, NIE o NIF; persona jurídica (sello): denominación y NIF"],
        ["Identificación de los interesados (art. 9.2 LPAC)", "Certificados cualificados de firma o de sello de prestadores de la Lista de confianza, u otros sistemas válidos con registro previo como usuario (p. ej., claves concertadas)"],
        ["Firma de los interesados (art. 10 LPAC)", "Firma electrónica cualificada y avanzada con certificado cualificado, sello cualificado o avanzado, u otros sistemas admitidos; la firma acredita también la identidad"],
        ["Cuándo se exige firma (art. 11.2 LPAC)", "Para formular solicitudes, presentar declaraciones responsables o comunicaciones, interponer recursos, desistir de acciones y renunciar a derechos; para lo demás basta identificarse"],
        ["Identificación de la Administración (art. 40 LRJSP)", "Mediante sello electrónico basado en certificado cualificado; también se entiende identificada en la información que publica como propia en su portal"],
        ["Actuación automatizada (art. 42 LRJSP)", "Sello electrónico de Administración u órgano, o código seguro de verificación (CSV) que permite comprobar el documento en la sede"],
        ["Firma del personal (art. 43 LRJSP)", "Los empleados firman con los sistemas que determine su Administración; por seguridad pública puede figurar solo el número de identificación profesional"],
      ],
      preguntas: [
        ["media", "Según la LPAC, la firma del interesado es obligatoria para:", ["Interponer un recurso", "Consultar el estado de un expediente", "Obtener información general", "Pedir cita previa"], "Art. 11.2.c) LPAC."],
        ["media", "El periodo de vigencia de los certificados cualificados no puede superar:", ["Cinco años", "Diez años", "Dos años", "Un año"], "Art. 4.2 Ley 6/2020."],
        ["media", "La Ley 6/2020 complementa:", ["El Reglamento (UE) 910/2014 (eIDAS)", "El RGPD", "La Ley 19/2013", "El Código Civil"], "Art. 1 Ley 6/2020."],
        ["dificil", "En la actuación administrativa automatizada puede utilizarse como sistema de firma:", ["El código seguro de verificación (CSV)", "La firma manuscrita escaneada", "Un correo sin firmar", "La clave del usuario interesado"], "Art. 42.b) LRJSP."],
        ["media", "Cuando un interesado firma electrónicamente:", ["Su identidad se entiende acreditada mediante el propio acto de firma", "Debe además identificarse en persona", "Necesita testigos", "La firma no tiene efectos"], "Art. 10.5 LPAC."],
        ["media", "Las Administraciones deben garantizar en todo procedimiento la posibilidad de usar:", ["Sistemas basados en certificados cualificados", "Solo claves concertadas", "Solo el papel", "Solo el correo electrónico"], "Arts. 9.2 y 10.2 LPAC."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Representación (art. 5.1-2 LPAC)", "Los interesados con capacidad de obrar pueden actuar por representante; pueden representar las personas físicas con capacidad de obrar y las jurídicas si sus estatutos lo prevén"],
        ["Cuándo debe acreditarse (art. 5.3 LPAC)", "Para solicitudes, declaraciones responsables o comunicaciones, recursos, desistimientos y renuncias; en los actos de mero trámite se presume"],
        ["Medios de acreditación (art. 5.4 LPAC)", "Cualquier medio válido en Derecho; en particular, apoderamiento apud acta presencial o electrónico, o inscripción en el registro electrónico de apoderamientos"],
        ["Subsanación (art. 5.6 LPAC)", "La falta de acreditación no impide tener por realizado el acto si se subsana en diez días (o plazo mayor)"],
        ["Registro de apoderamientos (art. 6.1 LPAC)", "AGE, CCAA y entidades locales tienen un registro electrónico general de apoderamientos; pueden existir registros particulares por organismo; deben ser interoperables"],
        ["Tipos de poder (art. 6.4 LPAC)", "General ante cualquier Administración; ante una Administración u organismo concreto; o solo para trámites determinados"],
        ["Apud acta (art. 6.5 LPAC)", "Por comparecencia electrónica en la sede con firma electrónica o comparecencia personal en las oficinas de asistencia en materia de registros"],
        ["Vigencia de los poderes (art. 6.6 LPAC)", "Máximo cinco años desde la inscripción, revocables o prorrogables antes de su fin (cada prórroga, máximo cinco años)"],
      ],
      preguntas: [
        ["media", "Para interponer un recurso en nombre de otro:", ["Debe acreditarse la representación", "Se presume siempre", "No se admite representación", "Basta con decirlo verbalmente"], "Art. 5.3 LPAC."],
        ["media", "En los actos de mero trámite, la representación:", ["Se presume", "Debe acreditarse ante notario", "Está prohibida", "Requiere poder general"], "Art. 5.3 LPAC."],
        ["media", "Si la representación no se acredita, se concede un plazo de subsanación de:", ["Diez días", "Un mes", "Tres días", "Quince días naturales"], "Art. 5.6 LPAC."],
        ["dificil", "Los poderes inscritos en el registro electrónico de apoderamientos tienen una validez máxima de:", ["Cinco años desde la inscripción", "Un año", "Diez años", "Indefinida"], "Art. 6.6 LPAC."],
        ["media", "El apoderamiento apud acta puede otorgarse:", ["Por comparecencia electrónica en la sede o personal en una oficina de asistencia en materia de registros", "Solo ante notario", "Solo por correo postal", "Solo ante el juez"], "Art. 6.5 LPAC."],
        ["media", "Un poder para actuar solo en un trámite concreto es uno de los tipos previstos en:", ["El art. 6.4 de la LPAC", "El Código Penal", "La Ley de Contratos", "El EBEP"], "Art. 6.4.c) LPAC."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["Registro Electrónico General (art. 16.1 LPAC)", "Cada Administración tiene uno donde se asienta todo documento presentado o recibido; los organismos pueden tener el suyo interoperable"],
        ["Asiento y recibo (art. 16.2-3 LPAC)", "Orden temporal; número, epígrafe, fecha y hora, interesado, órgano; recibo automático con copia autenticada, fecha, hora y número de entrada"],
        ["Lugares de presentación (art. 16.4 LPAC)", "Registro electrónico de cualquier Administración; oficinas de Correos; representaciones diplomáticas y consulares; oficinas de asistencia en materia de registros; otros previstos"],
        ["Digitalización (art. 16.5 LPAC)", "Lo presentado en papel lo digitaliza la oficina de asistencia, que devuelve los originales salvo excepciones"],
        ["Oficinas de asistencia en materia de registros (art. 40 RD 203/2021, para la AGE)", "Digitalizan y registran escritos, emiten recibos, expiden copias auténticas, informan y asisten en identificación y firma, notifican por comparecencia espontánea, comunican el código del órgano destinatario e inician apoderamientos apud acta"],
        ["SIR (art. 60 RD 203/2021)", "Sistema de Interconexión de Registros: vía por la que se realizan las interconexiones entre los registros de las Administraciones, conforme al Esquema Nacional de Interoperabilidad"],
        ["Adhesión a plataformas estatales (DA 2.ª LPAC)", "Las CCAA pueden adherirse a los registros y plataformas de la AGE; si mantienen los suyos, deben cumplir el ENI y el ENS y garantizar la interconexión"],
        ["Relación de oficinas (art. 16.7 LPAC)", "Las Administraciones publican y mantienen actualizada la relación de oficinas que asisten en la presentación electrónica"],
      ],
      preguntas: [
        ["media", "Un ciudadano puede presentar un escrito dirigido al Gobierno de Aragón:", ["En el registro electrónico de cualquier Administración del art. 2.1 LPAC", "Solo en Zaragoza", "Solo en la sede del departamento", "Solo por correo electrónico"], "Art. 16.4.a) LPAC."],
        ["media", "Los documentos presentados en papel en una oficina de asistencia:", ["Se digitalizan y se devuelven los originales, salvo excepciones", "Se archivan siempre en papel", "Se destruyen", "Se envían por valija"], "Art. 16.5 LPAC."],
        ["media", "Las interconexiones entre registros de distintas Administraciones se realizan a través del:", ["Sistema de Interconexión de Registros (SIR)", "Correo postal", "Fax", "Tablón de anuncios"], "Art. 60.2 RD 203/2021."],
        ["dificil", "Es función de las oficinas de asistencia en materia de registros:", ["Expedir copias electrónicas auténticas de los documentos que se digitalicen", "Resolver los procedimientos", "Imponer sanciones", "Fiscalizar el gasto"], "Art. 40.3.d) RD 203/2021."],
        ["media", "El registro emite automáticamente un recibo que incluye:", ["Fecha y hora de presentación y número de entrada", "Solo el nombre del funcionario", "La resolución del expediente", "Nada"], "Art. 16.3 LPAC."],
        ["media", "Las oficinas de asistencia en materia de registros tienen naturaleza de:", ["Órgano administrativo", "Empresa privada", "Fundación", "Organismo autónomo"], "Art. 40.1 RD 203/2021."],
      ],
    },
    {
      seccion: S6,
      flashcards: [
        ["Preferencia (art. 41.1 LPAC)", "Las notificaciones se practican preferentemente por medios electrónicos y, en todo caso, a los obligados"],
        ["Notificación en papel excepcional (art. 41.1 LPAC)", "Por comparecencia espontánea en la oficina de asistencia que la pida en ese momento, o por entrega directa de un empleado público cuando sea necesario"],
        ["Excluidas de la vía electrónica (art. 41.2 LPAC)", "Actos con elementos no convertibles a formato electrónico y los que contengan medios de pago (cheques)"],
        ["Avisos (art. 41.1 y 6 LPAC)", "Al dispositivo o correo comunicado por el interesado; no sirven para notificar y su falta no invalida la notificación"],
        ["Medios electrónicos (art. 43.1 LPAC)", "Comparecencia en la sede electrónica, dirección electrónica habilitada única o ambos"],
        ["Momento (art. 43.2 LPAC)", "Se entiende practicada al acceder a su contenido; si es obligatoria o elegida, se entiende rechazada a los diez días naturales de la puesta a disposición sin acceso"],
        ["Plazo cumplido (art. 43.3 LPAC)", "La obligación de notificar en plazo se entiende cumplida con la puesta a disposición en la sede o en la DEHú"],
        ["Varios cauces (art. 41.7 LPAC y 42.1 RD 203/2021)", "Se toma la fecha de la notificación producida en primer lugar"],
        ["Acuse (art. 42.3 RD 203/2021)", "Justifica el acceso o el rechazo, con identificación del acto, destinatario, fecha y hora de puesta a disposición y de acceso o rechazo"],
      ],
      preguntas: [
        ["media", "Una notificación electrónica obligatoria se entiende rechazada si no se accede a ella en:", ["Diez días naturales desde su puesta a disposición", "Diez días hábiles", "Un mes", "Quince días naturales"], "Art. 43.2 LPAC."],
        ["media", "La notificación electrónica se entiende practicada:", ["En el momento en que se accede a su contenido", "Al enviarse el aviso", "Al dictarse el acto", "A los tres días"], "Art. 43.2 LPAC."],
        ["media", "El aviso al correo electrónico del interesado:", ["No sirve para practicar la notificación y su falta no la invalida", "Es la notificación", "Es obligatorio para que valga", "Sustituye a la sede"], "Art. 41.1 y 6 LPAC."],
        ["dificil", "No se practicarán por medios electrónicos las notificaciones que:", ["Contengan medios de pago a favor de los obligados, como cheques", "Afecten a empresas", "Se refieran a recursos", "Sean de procedimientos sancionadores"], "Art. 41.2.b) LPAC."],
        ["media", "Si se notifica por varios cauces, la fecha de notificación es:", ["La de la producida en primer lugar", "La última", "La que elija el interesado", "La del aviso"], "Art. 41.7 LPAC."],
        ["media", "Las notificaciones electrónicas se practican mediante:", ["Comparecencia en la sede electrónica, la dirección electrónica habilitada única o ambas", "Correo electrónico ordinario", "SMS", "Fax"], "Art. 43.1 LPAC."],
      ],
    },
  ],
  glosario: [
    [S1, "Sede electrónica", "Dirección electrónica oficial de una Administración para tramitar y consultar."],
    [S1, "Punto de Acceso General", "Portal electrónico que da acceso a los servicios y notificaciones de la Administración."],
    [S2, "Sujeto obligado", "Persona o entidad que debe relacionarse por medios electrónicos con la Administración."],
    [S3, "Certificado cualificado", "Certificado electrónico expedido por un prestador de confianza que cumple los requisitos del Reglamento eIDAS."],
    [S3, "Sello electrónico", "Firma electrónica de una persona jurídica o de una Administración u órgano."],
    [S3, "CSV", "Código seguro de verificación que permite comprobar un documento en la sede electrónica."],
    [S4, "Apoderamiento apud acta", "Poder otorgado ante la propia Administración, presencial o electrónicamente."],
    [S5, "Oficina de asistencia en materia de registros", "Oficina presencial que registra, digitaliza y ayuda a presentar documentos electrónicamente."],
    [S5, "SIR", "Sistema de Interconexión de Registros que transmite asientos y documentos entre Administraciones."],
    [S6, "DEHú", "Dirección Electrónica Habilitada única, buzón para recibir notificaciones electrónicas."],
  ],
  casos: [
    {
      slug: "empresa-subvencion-electronica",
      titulo: "Una empresa solicita una subvención",
      supuesto: "Una sociedad limitada aragonesa quiere pedir una subvención del Gobierno de Aragón. Su gerente acude con la solicitud en papel a una oficina de asistencia en materia de registros. Más tarde, la empresa da poder a una gestoría para tramitar el expediente.",
      preguntas: [
        [S2, "media", "La sociedad limitada está obligada a:", ["Relacionarse electrónicamente con la Administración", "Presentar siempre en papel", "Acudir presencialmente", "Elegir el medio que quiera"], "Art. 14.2.a) LPAC."],
        [S2, "media", "Si presenta la solicitud en papel, la Administración:", ["Le requerirá que la presente electrónicamente; contará la fecha de la subsanación", "La admitirá sin más", "La archivará sin avisar", "La sancionará"], "Art. 68.4 LPAC."],
        [S3, "media", "Para firmar la solicitud la empresa puede usar:", ["Un certificado cualificado de representante o de sello", "Una firma escaneada", "Un correo sin firma", "La firma de un vecino"], "Arts. 10.2 LPAC; art. 6 Ley 6/2020."],
        [S3, "media", "La firma es necesaria porque se trata de:", ["Formular una solicitud", "Una consulta", "Una petición de información", "Un acto de mero trámite"], "Art. 11.2.a) LPAC."],
        [S4, "media", "Para que la gestoría actúe, la empresa debe:", ["Acreditar la representación, por ejemplo con poder inscrito en el registro de apoderamientos", "No hacer nada", "Ir al juzgado", "Cambiar de domicilio"], "Arts. 5.3-4 y 6 LPAC."],
        [S2, "media", "La gestoría, como representante de un obligado, está:", ["Obligada a relacionarse electrónicamente", "Libre de elegir el papel", "Excluida", "Obligada a acudir presencialmente"], "Art. 14.2.d) LPAC."],
        [S4, "dificil", "El poder inscrito tendrá una validez máxima de:", ["Cinco años, prorrogable", "Un año", "Indefinida", "Diez años"], "Art. 6.6 LPAC."],
        [S6, "media", "Las notificaciones a la empresa serán:", ["Electrónicas, al ser obligada", "En papel", "Por teléfono", "Por SMS"], "Art. 41.1 LPAC."],
        [S6, "media", "Si la empresa no accede a la notificación en diez días naturales:", ["Se entenderá rechazada y seguirá el procedimiento", "Se repetirá en papel", "Se anulará", "Se ampliará el plazo"], "Arts. 41.5 y 43.2 LPAC."],
        [S6, "media", "El aviso que recibe en su correo electrónico:", ["Solo informa de la puesta a disposición", "Es la notificación", "Debe contestarse", "Es un requisito de validez"], "Art. 41.6 LPAC."],
      ],
    },
    {
      slug: "oficina-asistencia-registro-ciudadano",
      titulo: "En la oficina de asistencia en materia de registros",
      supuesto: "Un jubilado sin certificado digital acude a la oficina de asistencia en materia de registros del Gobierno de Aragón en Teruel para presentar un recurso dirigido a un ayuntamiento de otra provincia y pide ayuda para firmarlo. También pregunta por una notificación pendiente y quiere dar un poder a su hija.",
      preguntas: [
        [S2, "media", "Al ser persona física, el jubilado:", ["Puede elegir relacionarse en papel o electrónicamente", "Está obligado a la vía electrónica", "Necesita representante", "No puede presentar recursos"], "Art. 14.1 LPAC."],
        [S5, "media", "Puede presentar en esta oficina el recurso dirigido al ayuntamiento:", ["Sí, la oficina lo digitaliza y lo registra para su remisión", "No, solo en ese ayuntamiento", "Solo por correo postal", "Solo si es para el Gobierno de Aragón"], "Art. 16.4 LPAC."],
        [S5, "media", "El escrito llegará al ayuntamiento a través de:", ["El Sistema de Interconexión de Registros (SIR)", "Una valija física", "El tablón de anuncios", "El BOE"], "Art. 60.2 RD 203/2021."],
        [S5, "media", "Al presentarlo, recibirá:", ["Un recibo con fecha, hora y número de entrada", "La resolución del recurso", "Nada", "Una multa"], "Art. 16.3 LPAC."],
        [S1, "media", "Al carecer de certificado, su firma puede realizarla:", ["Un funcionario habilitado, con su identificación y consentimiento expreso", "Cualquier persona de la cola", "Nadie: no puede presentar", "Su vecino"], "Art. 12.2 LPAC."],
        [S5, "media", "Sus documentos originales en papel:", ["Se digitalizan y se le devuelven, salvo excepciones", "Se quedan en la oficina siempre", "Se destruyen", "Se envían en papel al ayuntamiento"], "Art. 16.5 LPAC."],
        [S6, "media", "Si pide en ese momento la notificación pendiente, la oficina:", ["Puede notificársela personalmente por su comparecencia espontánea", "No puede", "Le obliga a usar internet", "Le cobra una tasa"], "Art. 41.1.a) LPAC."],
        [S4, "media", "El poder a su hija puede otorgarlo:", ["Apud acta por comparecencia personal en la propia oficina", "Solo ante notario", "Solo por correo", "No puede"], "Art. 6.5 LPAC."],
        [S4, "media", "La hija podrá presentar en su nombre un recurso porque:", ["La representación estará acreditada mediante el apoderamiento", "Es familiar y basta", "Lo dice verbalmente", "No necesita acreditar nada"], "Art. 5.3-4 LPAC."],
        [S3, "dificil", "Para consultar el estado de su expediente, la LPAC exige con carácter general:", ["Solo identificarse", "Firma cualificada", "Presencia física", "Notario"], "Art. 11.1 LPAC."],
      ],
    },
    {
      slug: "funcionario-concurso-notificacion",
      titulo: "Un funcionario y la notificación de un concurso",
      supuesto: "Un administrativo de la DGA participa en un concurso de traslados. Presenta su solicitud por la sede electrónica con su certificado del DNI electrónico. Meses después, la resolución se pone a disposición en la sede y en la Dirección Electrónica Habilitada única; él accede primero en la DEHú.",
      preguntas: [
        [S2, "media", "Para participar en el concurso, como empleado público:", ["Está obligado a usar medios electrónicos, en la forma que determine su Administración", "Puede elegir el papel siempre", "Debe ir en persona", "Debe enviar un fax"], "Art. 14.2.e) LPAC."],
        [S3, "media", "El certificado del DNI electrónico le permite:", ["Identificarse y firmar electrónicamente", "Solo viajar", "Solo identificarse sin firmar", "Nada ante la Administración"], "Arts. 9-10 LPAC."],
        [S3, "media", "Al firmar su solicitud, su identidad:", ["Queda acreditada por el propio acto de firma", "Debe acreditarse además en persona", "No queda acreditada", "Requiere testigos"], "Art. 10.5 LPAC."],
        [S6, "media", "La resolución se entiende notificada:", ["Cuando accede a su contenido", "Cuando se dicta", "Cuando recibe el aviso", "A los diez días hábiles"], "Art. 43.2 LPAC."],
        [S6, "media", "Como la puso a disposición por dos vías, la fecha de notificación es:", ["La del acceso producido en primer lugar (en la DEHú)", "La del último acceso", "La que elija la Administración", "La del BOA"], "Art. 41.7 LPAC; art. 42.1 RD 203/2021."],
        [S6, "media", "Si no hubiera accedido en diez días naturales:", ["Se entendería rechazada", "Se le notificaría en papel obligatoriamente", "Sería nula", "Se ampliaría el plazo un mes"], "Art. 43.2 LPAC."],
        [S6, "dificil", "La Administración cumple su obligación de notificar en plazo con:", ["La puesta a disposición en la sede o en la DEHú", "El acceso efectivo del interesado", "La publicación en prensa", "El envío del aviso"], "Art. 43.3 LPAC."],
        [S6, "media", "El acuse de la notificación recoge, entre otros datos:", ["La fecha y hora de puesta a disposición y de acceso o rechazo", "Su nómina", "Su expediente disciplinario", "Nada"], "Art. 42.3 RD 203/2021."],
        [S3, "media", "La resolución firmada por el Director General lleva la firma electrónica:", ["Del titular del órgano, con el sistema que determine su Administración", "Del interesado", "De la empresa informática", "De un notario"], "Art. 43 LRJSP."],
        [S3, "media", "Si la copia impresa de la resolución lleva un CSV, sirve para:", ["Comprobar su autenticidad e integridad en la sede electrónica", "Pagar tasas", "Identificar al interesado", "Nada"], "Art. 42.b) LRJSP."],
      ],
    },
  ],
});
