/**
 * Crea tema-432 — Tema 10 de Administrativa/o (Ayto. Zaragoza, promoción
 * interna, CONV 5.2bis/2025): "Ley del Procedimiento Administrativo Común de
 * las Administraciones Públicas (II): identificación y firma de los
 * interesados en el procedimiento administrativo."
 *
 * Fuente: Ley 39/2015 (BOE-A-2015-10565), Título I, Capítulo II, arts. 9 a
 * 12, texto consolidado leído íntegro (content-raw/ley-39-2015-
 * procedimiento-administrativo, descargado el 20-08-2026; última
 * actualización del consolidado en el BOE: 06-11-2024).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-432-identificacion-firma-interesados.mjs
 */
import { sembrarTema, ADMIN_AYTO } from "./lib/sembrar-tema.mjs";

const L = ADMIN_AYTO.ley39;
const S1 = "identificacion-interesados";
const S2 = "firma-interesados";
const S3 = "asistencia-medios-electronicos";

await sembrarTema({
  tema: {
    slug: "tema-432",
    titulo: "Identificación y firma de los interesados en el procedimiento administrativo",
    descripcion: "Ley 39/2015, Título I, Capítulo II (arts. 9 a 12): obligación de verificar la identidad del interesado y sistemas de identificación electrónica (certificados cualificados de firma y de sello y otros sistemas con registro previo); sistemas de firma admitidos y su efecto de acreditar la identidad; actuaciones para las que es obligatoria la firma; asistencia en el uso de medios electrónicos y firma por funcionario habilitado.",
    contenido: "Cómo se identifica y cómo firma quien actúa ante la Administración: la Administración siempre verifica la identidad; electrónicamente se usan certificados cualificados u otros sistemas con registro previo; la firma acredita la voluntad y, a la vez, la identidad; solo se exige firmar para solicitudes, declaraciones responsables o comunicaciones, recursos, desistimientos y renuncias; y quien no está obligado a relacionarse electrónicamente puede pedir ayuda, incluso que un funcionario habilitado firme por él con su consentimiento expreso.",
    enlaces_boe: [{ url: L, titulo: "Ley 39/2015, de 1 de octubre, del Procedimiento Administrativo Común de las Administraciones Públicas (BOE-A-2015-10565)" }],
    indice_estudio: [
      { seccion: S1, titulo: "Sistemas de identificación de los interesados", articulos: "art. 9", url: `${L}#a9` },
      { seccion: S2, titulo: "Sistemas de firma y uso obligatorio de la firma", articulos: "arts. 10 y 11", url: `${L}#a10` },
      { seccion: S3, titulo: "Asistencia en el uso de medios electrónicos", articulos: "art. 12", url: `${L}#a12` },
    ],
  },
  vinculo: { oposicion: ADMIN_AYTO.oposicion, bloqueId: ADMIN_AYTO.bloqueParte2, numero: 10 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["¿Qué deben verificar siempre las Administraciones sobre los interesados (art. 9.1)?", "Su identidad, comprobando nombre y apellidos o denominación o razón social que consten en el DNI o documento identificativo equivalente"],
        ["Sistemas de identificación electrónica (art. 9.2)", "a) certificados electrónicos cualificados de firma electrónica; b) certificados electrónicos cualificados de sello electrónico (ambos de prestadores de la «Lista de confianza»); c) cualquier otro sistema que la Administración considere válido, con registro previo como usuario"],
        ["Requisitos de los sistemas de la letra c) del art. 9.2", "Registro previo como usuario y comunicación previa a la Secretaría General de Administración Digital con declaración responsable; no son eficaces hasta pasados dos meses desde la comunicación"],
        ["¿Qué sistemas deben poder usarse siempre (art. 9.2, último párrafo)?", "Los de las letras a) y b) (certificados cualificados de firma y de sello) deben ser posibles en todo procedimiento, aunque se admitan también otros de la letra c)"],
        ["Localización de los datos de los sistemas de la letra c) (art. 9.3)", "En territorio de la Unión Europea; si son categorías especiales de datos del art. 9 RGPD, en territorio español"],
        ["Efecto de que la Administración General del Estado acepte un sistema de identificación (art. 9.4)", "Sirve para acreditar frente a todas las Administraciones, salvo prueba en contrario, la identificación electrónica del interesado"],
      ],
      preguntas: [
        ["facil", "Según el art. 9.1 de la Ley 39/2015, las Administraciones Públicas están obligadas a verificar la identidad de los interesados comprobando:", ["Su nombre y apellidos o denominación o razón social que consten en el DNI o documento equivalente", "Su domicilio fiscal y su número de la Seguridad Social", "Únicamente su firma manuscrita"], "Art. 9.1 Ley 39/2015."],
        ["media", "¿Cuál de estos NO es uno de los sistemas de identificación electrónica del art. 9.2?", ["La simple indicación del nombre en un correo electrónico sin registro previo", "Los certificados electrónicos cualificados de firma electrónica", "Los certificados electrónicos cualificados de sello electrónico"], "Art. 9.2: la letra c) exige siempre registro previo como usuario."],
        ["media", "Los sistemas de identificación de la letra c) del art. 9.2 tienen eficacia jurídica:", ["Transcurridos dos meses desde la comunicación a la Secretaría General de Administración Digital", "Desde el mismo día de su comunicación", "Transcurridos seis meses desde su publicación en el BOE"], "Art. 9.2.c) Ley 39/2015."],
        ["dificil", "Los recursos técnicos de los sistemas de identificación de la letra c) que traten categorías especiales de datos del art. 9 del RGPD deben estar situados:", ["En territorio español", "En cualquier Estado de la Unión Europea", "En cualquier país con decisión de adecuación"], "Art. 9.3 Ley 39/2015."],
        ["media", "La aceptación de un sistema de identificación por la Administración General del Estado:", ["Sirve para acreditar la identificación frente a todas las Administraciones, salvo prueba en contrario", "Solo vale ante la Administración General del Estado", "Obliga a las entidades locales a crear un sistema propio"], "Art. 9.4 Ley 39/2015."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["¿Qué debe permitir acreditar cualquier medio de firma (art. 10.1)?", "La autenticidad de la expresión de la voluntad y consentimiento del interesado y la integridad e inalterabilidad del documento"],
        ["Sistemas de firma electrónica válidos (art. 10.2)", "a) firma electrónica cualificada y avanzada basada en certificados cualificados de firma; b) sello electrónico cualificado y avanzado basado en certificados cualificados de sello; c) otros sistemas con registro previo como usuario"],
        ["¿Pueden los sistemas de identificación usarse como firma (art. 10.4)?", "Sí, cuando lo disponga expresamente la normativa reguladora aplicable y permitan acreditar la autenticidad de la voluntad y consentimiento"],
        ["Efecto del acto de firmar sobre la identidad (art. 10.5)", "Cuando el interesado usa un sistema de firma del art. 10, su identidad se entiende ya acreditada por el propio acto de la firma"],
        ["Regla general para actuar en el procedimiento (art. 11.1)", "Basta con acreditar previamente la identidad por cualquiera de los medios de identificación de la Ley"],
        ["¿Para qué actuaciones es obligatoria la firma (art. 11.2)?", "a) formular solicitudes; b) presentar declaraciones responsables o comunicaciones; c) interponer recursos; d) desistir de acciones; e) renunciar a derechos"],
      ],
      preguntas: [
        ["facil", "Según el art. 11.2 de la Ley 39/2015, las Administraciones solo requerirán el uso obligatorio de firma para, entre otras actuaciones:", ["Interponer recursos", "Consultar el estado de tramitación del expediente", "Pedir cita previa"], "Art. 11.2.c) Ley 39/2015."],
        ["media", "¿Cuál de estas actuaciones NO exige firma según el art. 11.2?", ["Aportar un documento solicitado durante la instrucción", "Desistir de acciones", "Renunciar a derechos"], "El art. 11.2 enumera solo solicitudes, declaraciones responsables o comunicaciones, recursos, desistimiento y renuncia; para lo demás basta acreditar la identidad (art. 11.1)."],
        ["media", "Cuando el interesado utiliza un sistema de firma de los previstos en el art. 10:", ["Su identidad se entiende ya acreditada mediante el propio acto de la firma", "Debe además identificarse con otro sistema distinto", "Debe presentar copia del DNI en papel"], "Art. 10.5 Ley 39/2015."],
        ["media", "Los sistemas de identificación pueden admitirse como sistema de firma:", ["Cuando así lo disponga expresamente la normativa reguladora aplicable y permitan acreditar la voluntad y consentimiento", "Siempre, en cualquier procedimiento", "Nunca, porque identificación y firma son incompatibles"], "Art. 10.4 Ley 39/2015."],
        ["dificil", "En materia de firma, las Administraciones deben garantizar que los sistemas de las letras a) y b) del art. 10.2 puedan utilizarse:", ["Para todos los procedimientos en todos sus trámites", "Solo en la presentación de solicitudes", "Solo cuando no se admita ningún sistema de la letra c)"], "Art. 10.2, último párrafo, Ley 39/2015."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Deber de las Administraciones del art. 12.1", "Garantizar que los interesados puedan relacionarse por medios electrónicos, poniendo a su disposición los canales de acceso, sistemas y aplicaciones necesarios"],
        ["¿A quién se presta la asistencia del art. 12.2?", "A los interesados no incluidos en los apartados 2 y 3 del art. 14 (no obligados a relacionarse electrónicamente) que lo soliciten"],
        ["¿En qué se asiste especialmente (art. 12.2)?", "En la identificación y firma electrónica, la presentación de solicitudes por el registro electrónico general y la obtención de copias auténticas"],
        ["Firma por funcionario habilitado (art. 12.2)", "Si el interesado no tiene medios electrónicos, un funcionario puede identificarle o firmar por él con su propio sistema de firma, previa identificación del interesado y su consentimiento expreso, del que debe quedar constancia"],
        ["Registro de funcionarios habilitados (art. 12.3)", "Lo mantienen la AGE, las comunidades autónomas y las entidades locales; debe ser interoperable y en él constan, al menos, los funcionarios de las oficinas de asistencia en materia de registros"],
      ],
      preguntas: [
        ["media", "La asistencia en el uso de medios electrónicos del art. 12.2 se presta:", ["A los interesados no obligados a relacionarse electrónicamente que así lo soliciten", "A todas las personas jurídicas", "Solo a los empleados públicos"], "Art. 12.2 Ley 39/2015, en relación con el art. 14.2 y 3."],
        ["media", "Para que un funcionario firme electrónicamente en nombre de un interesado sin medios electrónicos es necesario que:", ["El interesado se identifique ante el funcionario y preste su consentimiento expreso, quedando constancia", "El interesado aporte un poder notarial", "Lo autorice el alcalde mediante decreto"], "Art. 12.2, párrafo segundo, Ley 39/2015."],
        ["facil", "Deben constar, al menos, en el registro de funcionarios habilitados del art. 12.3:", ["Los funcionarios que presten servicios en las oficinas de asistencia en materia de registros", "Todos los funcionarios del grupo A1", "Los funcionarios con habilitación de carácter nacional"], "Art. 12.3 Ley 39/2015."],
        ["media", "Los registros de funcionarios habilitados de las distintas Administraciones deben ser:", ["Plenamente interoperables e interconectados entre sí", "Secretos y de uso interno de cada Administración", "Únicos para todo el Estado y gestionados por la AGE"], "Art. 12.3 Ley 39/2015."],
      ],
    },
  ],
  glosario: [
    [S1, "Certificado electrónico cualificado", "Certificado expedido por un prestador incluido en la «Lista de confianza de prestadores de servicios de certificación»; puede ser de firma electrónica (personas físicas) o de sello electrónico (personas jurídicas o entidades)."],
    [S1, "Registro previo como usuario", "Alta previa que exigen los sistemas de identificación y firma de la letra c) de los arts. 9.2 y 10.2 para garantizar la identidad de quien los usa."],
    [S2, "Sello electrónico", "Equivalente electrónico de la firma para personas jurídicas o entidades, basado en un certificado cualificado de sello electrónico."],
    [S2, "Integridad e inalterabilidad", "Garantía de que el documento firmado no ha sido modificado después de la firma; es uno de los fines de todo sistema de firma (art. 10.1)."],
    [S3, "Funcionario habilitado", "Funcionario inscrito en el registro del art. 12.3 que puede identificar o firmar electrónicamente en nombre de un interesado sin medios electrónicos, con su consentimiento expreso."],
  ],
  casos: [
    {
      slug: "adm-ayto-registro-sin-certificado",
      titulo: "Una vecina sin certificado en la oficina de registro",
      supuesto: "Doña Pilar, jubilada y sin certificado electrónico, acude a la oficina de asistencia en materia de registros de una Junta Municipal para solicitar una ayuda municipal y, días después, para interponer un recurso contra otra resolución. Le atiende un administrativo inscrito en el registro de funcionarios habilitados del Ayuntamiento.",
      preguntas: [
        [S3, "facil", "Doña Pilar, persona física, ¿está obligada a relacionarse electrónicamente con la Administración?", ["No, salvo que esté en alguno de los supuestos de los apartados 2 y 3 del art. 14", "Sí, siempre", "Sí, por ser mayor de 65 años"], "Art. 12.2 en relación con el art. 14 Ley 39/2015."],
        [S3, "media", "Si doña Pilar lo pide, el Ayuntamiento debe asistirle especialmente en:", ["La identificación y firma electrónica, la presentación por el registro electrónico general y la obtención de copias auténticas", "La redacción del contenido de su recurso", "El pago de las tasas"], "Art. 12.2 Ley 39/2015."],
        [S3, "media", "Para que el administrativo firme electrónicamente la solicitud por doña Pilar hace falta:", ["Que ella se identifique ante él y preste su consentimiento expreso, del que quede constancia", "Que ella firme un poder notarial", "Que el jefe de servicio dicte una resolución previa"], "Art. 12.2 Ley 39/2015."],
        [S3, "media", "El administrativo puede firmar por doña Pilar porque:", ["Está inscrito en el registro de funcionarios habilitados", "Es funcionario de carrera de cualquier grupo", "Lleva más de dos años en la oficina"], "Art. 12.3 Ley 39/2015."],
        [S1, "facil", "Antes de nada, el administrativo debe verificar la identidad de doña Pilar comprobando:", ["Nombre y apellidos que consten en su DNI o documento equivalente", "Su número de cuenta bancaria", "Su firma en un documento antiguo"], "Art. 9.1 Ley 39/2015."],
        [S2, "media", "La solicitud de la ayuda, ¿exige firma?", ["Sí, formular solicitudes exige firma", "No, basta con identificarse", "Solo si supera 3.000 euros"], "Art. 11.2.a) Ley 39/2015."],
        [S2, "media", "El recurso que quiere interponer doña Pilar, ¿exige firma?", ["Sí, interponer recursos exige firma", "No, porque ya está identificada", "Solo si es de alzada"], "Art. 11.2.c) Ley 39/2015."],
        [S2, "media", "Si después doña Pilar solo quiere consultar cómo va su expediente:", ["Basta con que acredite su identidad", "Debe firmar con certificado cualificado", "Debe presentar una solicitud firmada"], "Art. 11.1 Ley 39/2015."],
        [S3, "dificil", "La constancia del consentimiento de doña Pilar sirve, según la Ley, para:", ["Los casos de discrepancia o litigio", "Calcular las tasas", "Inscribirla en el padrón"], "Art. 12.2, párrafo segundo, Ley 39/2015."],
        [S2, "media", "Una vez firmada la solicitud, la firma debe acreditar:", ["La voluntad y consentimiento de la interesada y la integridad del documento", "Solo la fecha de presentación", "La solvencia económica de la interesada"], "Art. 10.1 Ley 39/2015."],
      ],
    },
    {
      slug: "adm-ayto-empresa-sede-electronica",
      titulo: "Una empresa presenta documentación en la sede electrónica",
      supuesto: "Una sociedad limitada que gestiona un centro deportivo presenta en la sede electrónica del Ayuntamiento una declaración responsable de inicio de actividad. Su gerente pregunta qué certificados puede usar y si vale el sistema de usuario y contraseña que el Ayuntamiento ofrece para otros trámites.",
      preguntas: [
        [S1, "media", "Para identificarse como persona jurídica, la sociedad puede usar:", ["Un certificado electrónico cualificado de sello electrónico", "Solo el DNI del gerente fotocopiado", "Un correo electrónico corporativo"], "Art. 9.2.b) Ley 39/2015."],
        [S1, "media", "Los prestadores que expiden los certificados cualificados deben estar incluidos en:", ["La «Lista de confianza de prestadores de servicios de certificación»", "El Registro Mercantil", "El padrón municipal"], "Art. 9.2.a) y b) Ley 39/2015."],
        [S1, "media", "El sistema de usuario y contraseña del Ayuntamiento es válido si:", ["Cuenta con registro previo como usuario y se cumplen los requisitos de la letra c)", "Lo usa cualquier persona sin darse de alta", "Lo aprueba el gerente de la empresa"], "Art. 9.2.c) Ley 39/2015."],
        [S1, "dificil", "Aunque el Ayuntamiento admita su sistema propio, debe garantizar que en el trámite:", ["También puedan usarse certificados cualificados de firma y de sello", "Solo se use el sistema propio", "Se exija además presencia física"], "Arts. 9.2 y 10.2, último párrafo, Ley 39/2015."],
        [S2, "facil", "La declaración responsable, ¿exige firma?", ["Sí, presentar declaraciones responsables o comunicaciones exige firma", "No, basta con la identificación", "Solo si la actividad es peligrosa"], "Art. 11.2.b) Ley 39/2015."],
        [S2, "media", "La sociedad puede firmar con:", ["Un sello electrónico cualificado o avanzado basado en certificado cualificado de sello", "Una imagen escaneada de la firma del gerente", "El logotipo de la empresa"], "Art. 10.2.b) Ley 39/2015."],
        [S2, "media", "Al firmar con su sello electrónico, la identidad de la sociedad:", ["Queda acreditada por el propio acto de la firma", "Debe acreditarse después por otro medio", "No queda acreditada nunca"], "Art. 10.5 Ley 39/2015."],
        [S1, "dificil", "Los datos del sistema de usuario y contraseña del Ayuntamiento (letra c) deben alojarse:", ["En territorio de la Unión Europea", "En cualquier país del mundo", "Necesariamente en el propio edificio municipal"], "Art. 9.3 Ley 39/2015."],
        [S2, "media", "Si el gerente después quiere desistir de la declaración presentada:", ["Debe firmar el desistimiento", "Basta con no hacer nada", "Basta con una llamada telefónica"], "Art. 11.2.d) Ley 39/2015."],
        [S2, "media", "La admisión de un sistema de identificación como sistema de firma exige:", ["Que lo disponga expresamente la normativa reguladora aplicable", "Que lo pida el interesado", "Que lo apruebe el Pleno municipal en cada caso"], "Art. 10.4 Ley 39/2015."],
      ],
    },
    {
      slug: "adm-ayto-nuevo-sistema-identificacion",
      titulo: "El Ayuntamiento implanta un nuevo sistema de identificación",
      supuesto: "El Servicio de Administración Electrónica propone implantar un sistema propio de identificación con registro previo de usuarios para trámites sencillos. Te piden, como administrativo de la unidad, preparar una nota sobre los requisitos legales y sobre qué trámites podrán hacerse con ese sistema.",
      preguntas: [
        [S1, "media", "El nuevo sistema se encuadra en:", ["La letra c) del art. 9.2", "La letra a) del art. 9.2", "El art. 12.3"], "Art. 9.2.c) Ley 39/2015."],
        [S1, "media", "Antes de su eficacia, el sistema debe comunicarse:", ["A la Secretaría General de Administración Digital, con declaración responsable de cumplimiento", "Al Registro de la Propiedad", "Al Justicia de Aragón"], "Art. 9.2.c) Ley 39/2015."],
        [S1, "media", "El sistema tendrá eficacia jurídica:", ["Transcurridos dos meses desde la comunicación", "Inmediatamente", "Tras un año de pruebas"], "Art. 9.2.c) Ley 39/2015."],
        [S1, "dificil", "Durante esos dos meses, por motivos de seguridad pública, el órgano estatal competente puede:", ["Acudir a la vía jurisdiccional, previo informe vinculante de la Secretaría de Estado de Seguridad", "Anular directamente el sistema por decreto", "Imponer una multa al Ayuntamiento"], "Art. 9.2.c) Ley 39/2015."],
        [S1, "media", "Los datos del sistema no pueden transferirse a un tercer país salvo:", ["Los que tengan decisión de adecuación de la Comisión Europea o lo exijan obligaciones internacionales de España", "Que lo autorice el alcalde", "Que el usuario no se oponga"], "Art. 9.3 Ley 39/2015."],
        [S2, "media", "Con ese sistema, para consultar un expediente bastará con:", ["Acreditar la identidad", "Firmar con certificado cualificado", "Presentar una instancia en papel"], "Art. 11.1 Ley 39/2015."],
        [S2, "media", "Para que ese sistema sirva también para firmar solicitudes hace falta:", ["Que lo disponga expresamente la normativa reguladora y permita acreditar la voluntad y consentimiento", "Nada: identificación y firma son lo mismo", "Que el usuario lo acepte en un formulario"], "Art. 10.4 Ley 39/2015."],
        [S2, "facil", "Renunciar a un derecho a través de la sede electrónica requiere:", ["Firma", "Solo identificación", "Comparecencia personal obligatoria"], "Art. 11.2.e) Ley 39/2015."],
        [S3, "media", "La nota debe recordar que el Ayuntamiento tiene que poner a disposición de los ciudadanos:", ["Los canales de acceso, sistemas y aplicaciones necesarios para relacionarse electrónicamente", "Un certificado gratuito para cada vecino", "Un funcionario en cada domicilio"], "Art. 12.1 Ley 39/2015."],
        [S3, "media", "El registro de funcionarios habilitados del Ayuntamiento debe estar:", ["Actualizado, y ser interoperable e interconectado con los de otras Administraciones", "Publicado en el BOE con nombres y DNI", "Limitado a los funcionarios de habilitación nacional"], "Art. 12.3 Ley 39/2015."],
      ],
    },
  ],
});
