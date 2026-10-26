/**
 * Crea tema-418 — Tema 4 de Subalterna/o (Ayto. Zaragoza, CONV 5/2026,
 * Anexo I): "Documentación administrativa. Descripción de los principales
 * documentos: instancia, certificado, anuncio, informe, resolución,
 * comunicación y notificación."
 *
 * Tema dedicado: tema-69 (Oficial Mantenimiento) trata tipos de documentos,
 * notificación y archivo, pero no describe cada uno de los siete documentos
 * que pide este enunciado. Lenguaje sencillo (convocatoria para personas
 * con discapacidad intelectual).
 *
 * Fuentes leídas en la API del BOE en esta sesión:
 * - Ley 39/2015 (BOE-A-2015-10565): arts. 16 (registros), 40-45
 *   (notificación, práctica en papel y electrónica, notificación
 *   infructuosa por anuncio en el BOE, publicación), 66 (contenido de la
 *   solicitud), 80 (informes) y 88 (contenido de la resolución).
 * - RD 2568/1986, ROF (BOE-A-1986-33252): arts. 172-175 (informes y su
 *   estructura en forma de propuesta) y 204-206 (certificaciones expedidas
 *   por el Secretario con el visto bueno del Presidente).
 * - La «comunicación» (oficio, nota interior) como documento de relación
 *   entre unidades u organismos se trata como conocimiento administrativo
 *   consolidado: no tiene una regulación única.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-418-documentos-administrativos.mjs
 */
import { sembrarTema, SUBALTERNO } from "./lib/sembrar-tema.mjs";

const LPAC = "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565";
const ROF = "https://www.boe.es/buscar/act.php?id=BOE-A-1986-33252";
const S1 = "documentos-ciudadano-instancia";
const S2 = "documentos-administracion-informe-resolucion-certificado";
const S3 = "comunicacion-notificacion-anuncio";

await sembrarTema({
  tema: {
    slug: "tema-418",
    titulo: "Documentación administrativa: instancia, certificado, anuncio, informe, resolución, comunicación y notificación",
    descripcion: "Qué es un documento administrativo y quién lo hace. Documentos del ciudadano: la instancia o solicitud y su contenido (art. 66 Ley 39/2015), su presentación en el registro y el recibo. Documentos de la Administración: el informe (arts. 80 Ley 39/2015 y 172-175 ROF), la resolución y su contenido (art. 88), el certificado expedido por el Secretario con el visto bueno del Alcalde (arts. 204-206 ROF). Documentos para comunicar: la comunicación u oficio entre unidades, la notificación (arts. 40-43: plazo de 10 días, contenido, en papel o electrónica) y el anuncio en diarios oficiales y tablones (arts. 44 y 45).",
    contenido: "Los papeles que más se ven en una oficina municipal, explicados de forma sencilla: qué es una instancia, un informe, una resolución, un certificado, una comunicación, una notificación y un anuncio, quién los hace y para qué sirven.",
    enlaces_boe: [
      { url: LPAC, titulo: "Ley 39/2015, de 1 de octubre, del Procedimiento Administrativo Común (BOE-A-2015-10565)" },
      { url: ROF, titulo: "Real Decreto 2568/1986, Reglamento de Organización, Funcionamiento y Régimen Jurídico de las Entidades Locales (BOE-A-1986-33252)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "La instancia o solicitud y el registro", articulos: "arts. 16 y 66 Ley 39/2015", url: `${LPAC}#a66` },
      { seccion: S2, titulo: "Informe, resolución y certificado", articulos: "arts. 80 y 88 Ley 39/2015; arts. 172-175 y 204-206 ROF", url: `${LPAC}#a88` },
      { seccion: S3, titulo: "Comunicación, notificación y anuncio", articulos: "arts. 40-45 Ley 39/2015", url: `${LPAC}#a40` },
    ],
  },
  vinculo: { oposicion: SUBALTERNO.oposicion, bloqueId: SUBALTERNO.bloque, numero: 4 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Documento administrativo", "Escrito, en papel o electrónico, que recoge datos o decisiones de la Administración o que el ciudadano dirige a la Administración"],
        ["Instancia o solicitud", "Escrito con el que un ciudadano pide algo a la Administración, por ejemplo una licencia o una ayuda"],
        ["Contenido de la instancia (art. 66)", "Nombre y apellidos; dónde quiere recibir las notificaciones; hechos, razones y lo que pide; lugar y fecha; firma; y órgano al que se dirige"],
        ["Partes de una instancia", "Datos de quien la presenta, EXPONE (los hechos y razones), SOLICITA (lo que pide), lugar, fecha, firma y destinatario"],
        ["Modelos de solicitud", "La Administración puede tener impresos o formularios; si un procedimiento tiene un modelo obligatorio, hay que usarlo"],
        ["Registro", "Lugar donde se apuntan los documentos que entran y salen, con número, fecha y hora; cada Administración tiene un Registro Electrónico General (art. 16)"],
        ["Recibo", "El ciudadano puede pedir un recibo que pruebe la fecha y la hora en que presentó su escrito"],
        ["Dónde presentar documentos (art. 16.4)", "En los registros electrónicos, en Correos, en embajadas y consulados de España y en las oficinas de asistencia en materia de registros"],
      ],
      preguntas: [
        ["facil", "El escrito con el que un vecino pide algo al Ayuntamiento es:", ["Una instancia o solicitud", "Un certificado", "Un anuncio"], "Art. 66 Ley 39/2015."],
        ["media", "En una instancia, la parte donde se dice lo que se pide se llama:", ["Solicita", "Expone", "Antecedentes"], "Conocimiento administrativo."],
        ["media", "¿Cuál de estos datos debe tener una instancia?", ["La firma de quien la presenta", "El sello del Alcalde", "El número de la cuenta del banco"], "Art. 66 Ley 39/2015."],
        ["media", "En el registro, cada documento se anota con:", ["Número, fecha y hora", "Solo el color del papel", "La opinión del funcionario"], "Art. 16 Ley 39/2015."],
        ["media", "¿Se puede presentar un escrito al Ayuntamiento en una oficina de Correos?", ["Sí", "No, nunca", "Solo los domingos"], "Art. 16.4 Ley 39/2015."],
        ["facil", "El papel que prueba que has entregado un escrito y cuándo es:", ["El recibo de presentación", "El volante", "El anuncio"], "Art. 66.3 Ley 39/2015."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Informe", "Documento en el que un técnico o un jefe da su opinión sobre un asunto para ayudar a decidir; salvo norma en contrario, no es obligatorio ni vinculante y se hace en 10 días (art. 80)"],
        ["¿Quién informa en el Ayuntamiento?", "El jefe de la dependencia que tramita el expediente, explicando los antecedentes y las normas (art. 172 ROF)"],
        ["Informe en forma de propuesta (art. 175 ROF)", "Contiene los hechos, las normas que se aplican y lo que debería decidirse"],
        ["Resolución", "Documento con el que el órgano competente decide un asunto y termina el procedimiento"],
        ["Contenido de la resolución (art. 88)", "La decisión (motivada cuando la ley lo exige) y los recursos que caben, el órgano ante el que se presentan y el plazo"],
        ["Certificado o certificación", "Documento que da fe de un dato o de un acuerdo que consta en la Administración"],
        ["¿Quién firma los certificados municipales? (arts. 204-205 ROF)", "El Secretario, por orden del Alcalde y con su visto bueno, con el sello de la Corporación"],
        ["Decreto y acuerdo", "Las resoluciones del Alcalde se llaman decretos; las de órganos colegiados (Pleno, Gobierno de Zaragoza) se llaman acuerdos"],
      ],
      preguntas: [
        ["media", "El documento con el que un técnico da su opinión para ayudar a decidir es:", ["El informe", "La instancia", "El anuncio"], "Art. 80 Ley 39/2015."],
        ["media", "Salvo que una norma diga otra cosa, los informes son:", ["Facultativos y no vinculantes", "Siempre obligatorios y vinculantes", "Secretos"], "Art. 80.1 Ley 39/2015."],
        ["facil", "El documento con el que el órgano competente decide un asunto es:", ["La resolución", "La instancia", "El volante"], "Art. 88 Ley 39/2015."],
        ["media", "La resolución debe decir qué recursos caben y:", ["El órgano ante el que se presentan y el plazo", "El sueldo del funcionario", "El horario de la oficina"], "Art. 88.3 Ley 39/2015."],
        ["media", "Los certificados del Ayuntamiento los expide:", ["El Secretario, con el visto bueno del Alcalde", "Cualquier vecino", "El conserje del edificio"], "Arts. 204-205 ROF."],
        ["dificil", "Según el ROF, el informe en forma de propuesta contiene los hechos, las normas aplicables y:", ["Lo que debe decidirse (la parte dispositiva)", "La opinión de los vecinos", "Una fotografía"], "Art. 175 ROF."],
        ["media", "La resolución del Alcalde se llama habitualmente:", ["Decreto", "Acuerdo de Pleno", "Moción"], "Conocimiento administrativo."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Comunicación u oficio", "Escrito para enviar o pedir información entre unidades u organismos; dentro del mismo organismo suele llamarse nota interior"],
        ["Notificación", "Forma de dar a conocer una resolución a la persona interesada (art. 40)"],
        ["Plazo para notificar", "La notificación se envía en 10 días desde que se dicta el acto (art. 40.2)"],
        ["Contenido de la notificación", "El texto íntegro de la resolución, si pone fin o no a la vía administrativa, los recursos, el órgano y el plazo para presentarlos (art. 40.2)"],
        ["Notificación electrónica", "Es la preferente; se entiende hecha cuando la persona accede a ella y se da por rechazada si pasan 10 días naturales sin abrirla (arts. 41 y 43)"],
        ["Notificación en papel en el domicilio", "Si no está el interesado, puede recogerla cualquier persona mayor de 14 años que diga quién es; si no hay nadie, se intenta una vez más a otra hora (art. 42)"],
        ["Rechazo de la notificación", "Si el interesado la rechaza, se anota en el expediente y se da por hecho el trámite (art. 41.5)"],
        ["Anuncio", "Aviso que se publica en un diario oficial (BOE, BOA, BOPZ) o en un tablón para que lo conozca mucha gente"],
        ["Cuándo se publica (art. 45)", "Cuando el acto va dirigido a muchas personas sin identificar o en los procesos selectivos y de concurrencia competitiva; la publicación tiene los mismos efectos que la notificación"],
        ["Notificación infructuosa (art. 44)", "Si no se conoce al interesado o no se ha podido notificar, se publica un anuncio en el BOE"],
      ],
      preguntas: [
        ["media", "La notificación debe enviarse en un plazo de:", ["10 días desde que se dicta el acto", "1 año", "1 día"], "Art. 40.2 Ley 39/2015."],
        ["media", "Si el interesado no está en casa, puede recoger la notificación:", ["Cualquier persona mayor de 14 años que esté en el domicilio y diga quién es", "Nadie", "Solo un abogado"], "Art. 42.2 Ley 39/2015."],
        ["media", "Una notificación electrónica se da por rechazada si pasan sin abrirla:", ["10 días naturales", "3 meses", "24 horas"], "Art. 43.2 Ley 39/2015."],
        ["facil", "El aviso que se publica en un boletín oficial o en un tablón es:", ["Un anuncio", "Una instancia", "Un informe"], "Arts. 44 y 45 Ley 39/2015."],
        ["dificil", "Si no se ha podido notificar a una persona, la notificación se hace:", ["Por medio de un anuncio en el BOE", "Por teléfono", "No se hace"], "Art. 44 Ley 39/2015."],
        ["media", "En un proceso selectivo, como una oposición, los actos se dan a conocer mediante:", ["Publicación en el medio que indique la convocatoria", "Una carta a cada aspirante", "Una llamada"], "Art. 45.1.b) Ley 39/2015."],
        ["media", "El escrito para pedir datos a otra unidad del Ayuntamiento es:", ["Una comunicación u oficio (nota interior)", "Un certificado", "Una resolución"], "Conocimiento administrativo."],
        ["media", "Si una persona rechaza una notificación:", ["Se anota en el expediente y se da por hecho el trámite", "Se anula el procedimiento", "Se repite cada día"], "Art. 41.5 Ley 39/2015."],
      ],
    },
  ],
  glosario: [
    [S1, "Instancia", "Escrito con el que un ciudadano pide algo a la Administración."],
    [S1, "Registro", "Oficina o sistema donde se anotan los documentos que entran y salen."],
    [S1, "Expone y solicita", "Partes de la instancia: lo que pasa (expone) y lo que se pide (solicita)."],
    [S2, "Informe", "Opinión escrita de un técnico o jefe para ayudar a decidir un asunto."],
    [S2, "Resolución", "Decisión escrita del órgano competente que termina un procedimiento."],
    [S2, "Certificado", "Documento que da fe de un dato o acuerdo que consta en la Administración."],
    [S2, "Visto bueno", "Firma del Alcalde en un certificado que confirma que el Secretario está en su cargo y que su firma es auténtica."],
    [S3, "Notificación", "Comunicación oficial de una resolución a la persona interesada."],
    [S3, "Anuncio", "Aviso publicado en un boletín oficial o en un tablón."],
    [S3, "Tablón de edictos", "Lugar, físico o en la sede electrónica, donde el Ayuntamiento publica sus anuncios."],
    [S3, "Oficio", "Comunicación escrita entre unidades u organismos de la Administración."],
  ],
  casos: [
    {
      slug: "correo-de-la-manana",
      titulo: "El correo de la mañana",
      supuesto: "Trabajas de subalterno en una oficina municipal. Cada mañana repartes los documentos que llegan: un escrito de un vecino que pide arreglar una farola, un informe del técnico de alumbrado, un decreto del Alcalde, un certificado para un vecino y un oficio para otra unidad.",
      preguntas: [
        [S1, "facil", "El escrito del vecino que pide arreglar la farola es:", ["Una instancia o solicitud", "Un certificado", "Un decreto"], "Art. 66 Ley 39/2015."],
        [S1, "media", "Antes de llevarlo a la unidad, ese escrito debe:", ["Anotarse en el registro con número, fecha y hora", "Guardarse en un cajón", "Devolverse al vecino"], "Art. 16 Ley 39/2015."],
        [S2, "media", "El documento del técnico de alumbrado que explica la avería y da su opinión es:", ["Un informe", "Un anuncio", "Una notificación"], "Art. 80 Ley 39/2015."],
        [S2, "media", "El documento del Alcalde que decide arreglar la farola es:", ["Un decreto (una resolución)", "Un informe", "Una instancia"], "Art. 88 Ley 39/2015."],
        [S2, "media", "El certificado para el vecino debe estar firmado por:", ["El Secretario, con el visto bueno del Alcalde", "El subalterno", "El técnico de alumbrado"], "Arts. 204-205 ROF."],
        [S3, "media", "El escrito para enviar información a otra unidad es:", ["Un oficio o comunicación", "Un certificado", "Un volante"], "Conocimiento administrativo."],
        [S3, "media", "La resolución debe darse a conocer al vecino mediante:", ["Una notificación", "Una conversación en el pasillo", "Un mensaje en una red social"], "Art. 40 Ley 39/2015."],
        [S3, "media", "La notificación debe enviarse en un plazo de:", ["10 días", "6 meses", "1 año"], "Art. 40.2 Ley 39/2015."],
        [S3, "dificil", "La notificación debe incluir los recursos que caben y:", ["El órgano y el plazo para presentarlos", "La foto de la farola", "El teléfono del Alcalde"], "Art. 40.2 Ley 39/2015."],
        [S1, "media", "El vecino pide un justificante de que entregó su escrito. Se le da:", ["El recibo de presentación", "Un certificado de empadronamiento", "Un anuncio"], "Art. 66.3 Ley 39/2015."],
      ],
    },
    {
      slug: "notificacion-en-mano",
      titulo: "Una notificación para entregar en mano",
      supuesto: "Te encargan entregar en persona una notificación en el domicilio de un vecino. Cuando llegas, el vecino no está. Abre la puerta su hijo de 16 años.",
      preguntas: [
        [S3, "media", "¿Puede recoger la notificación el hijo de 16 años?", ["Sí, si es mayor de 14 años y dice quién es", "No, nunca", "Solo si es mayor de 30 años"], "Art. 42.2 Ley 39/2015."],
        [S3, "media", "¿Qué debe hacer el hijo al recogerla?", ["Hacer constar su identidad", "Nada", "Pagar una tasa"], "Art. 42.2 Ley 39/2015."],
        [S3, "media", "Si no hubiera nadie en casa:", ["Se anota el día y la hora y se intenta otra vez, a otra hora", "Se deja en el buzón sin anotar nada", "Se tira"], "Art. 42.2 Ley 39/2015."],
        [S3, "media", "¿Cuántas veces más se intenta si no hay nadie?", ["Una vez más", "Ninguna", "Diez veces"], "Art. 42.2 Ley 39/2015."],
        [S3, "dificil", "Si después de los intentos no se ha podido notificar:", ["Se publica un anuncio en el BOE", "Se archiva el expediente", "Se notifica por teléfono"], "Art. 44 Ley 39/2015."],
        [S3, "media", "Si el vecino estuviera y no quisiera recogerla:", ["Se anota el rechazo y se da por hecho el trámite", "Se vuelve al día siguiente", "Se anula la resolución"], "Art. 41.5 Ley 39/2015."],
        [S3, "media", "Además de en papel, la notificación se pone a disposición del vecino en:", ["La sede electrónica", "Un periódico deportivo", "La radio"], "Art. 42.1 Ley 39/2015."],
        [S3, "media", "Hoy en día, las notificaciones se hacen preferentemente:", ["Por medios electrónicos", "Por paloma mensajera", "Por teléfono"], "Art. 41.1 Ley 39/2015."],
        [S2, "media", "Lo que se notifica es normalmente:", ["Una resolución", "Un informe interno", "Una nota de la cafetería"], "Art. 40 Ley 39/2015."],
        [S3, "media", "La notificación contiene:", ["El texto completo de la resolución", "Solo un resumen", "Solo la firma"], "Art. 40.2 Ley 39/2015."],
      ],
    },
    {
      slug: "tablon-de-anuncios-oposicion",
      titulo: "El tablón de anuncios de la oposición",
      supuesto: "En el edificio del Seminario hay un tablón de anuncios. Te piden colocar la lista de personas admitidas en una oposición y un anuncio sobre unas obras. Una persona te pregunta por qué no le han enviado una carta a casa.",
      preguntas: [
        [S3, "media", "¿Por qué la lista de admitidos se publica y no se envía una carta a cada persona?", ["Porque en los procesos selectivos los actos se publican en el medio que indica la convocatoria", "Porque se perdieron las cartas", "Porque es más bonito"], "Art. 45.1.b) Ley 39/2015."],
        [S3, "media", "La publicación de la lista tiene los mismos efectos que:", ["La notificación", "Un informe", "Una instancia"], "Art. 45.1 Ley 39/2015."],
        [S3, "facil", "Un aviso publicado en un tablón o boletín es:", ["Un anuncio", "Un certificado", "Una resolución"], "Arts. 44 y 45 Ley 39/2015."],
        [S3, "media", "Los anuncios del Ayuntamiento también se publican en:", ["El tablón de la sede electrónica y los boletines oficiales", "Las redes sociales de los empleados", "El periódico deportivo"], "Art. 45 Ley 39/2015."],
        [S3, "media", "El anuncio de las obras va dirigido a:", ["Muchas personas sin identificar", "Una sola persona concreta", "El Alcalde"], "Art. 45.1.a) Ley 39/2015."],
        [S1, "media", "Si la persona quiere reclamar, debe presentar:", ["Un escrito o instancia en el registro", "Un anuncio", "Un certificado"], "Arts. 16 y 66 Ley 39/2015."],
        [S1, "media", "Su escrito debe incluir:", ["Su nombre, lo que pide, la fecha y su firma", "Solo un dibujo", "Nada"], "Art. 66 Ley 39/2015."],
        [S2, "media", "La lista de admitidos se aprueba mediante:", ["Una resolución del órgano competente", "Un informe del conserje", "Una instancia"], "Art. 88 Ley 39/2015."],
        [S1, "media", "Si quiere presentar el escrito hoy mismo, puede hacerlo en:", ["La oficina de registro", "La cafetería", "El aparcamiento"], "Art. 16 Ley 39/2015."],
        [S3, "media", "¿Qué tablón indica las bases de la convocatoria de Operario y Subalterno?", ["El tablón de anuncios del edificio Seminario y la sede electrónica", "El tablón del mercado", "Ninguno"], "Base 1.13 de las bases específicas de la CONV 5/2026."],
      ],
    },
  ],
});
