/**
 * Crea tema-438 — Tema 16 de Administrativa/o (Ayto. Zaragoza, promoción
 * interna, CONV 5.2bis/2025): "Ley del Procedimiento Administrativo Común de
 * las Administraciones Públicas (VIII): derechos del interesado en el
 * procedimiento administrativo."
 *
 * Tema dedicado: el canónico tema-7 recortado a `titulo-4-cap-1` solo tenía
 * 2 flashcards y 3 preguntas; scripts/fix-administrativo-ayto-temas-
 * dedicados-13-16.mjs retira ese vínculo.
 *
 * Fuente: Ley 39/2015 (BOE-A-2015-10565), Título IV, Capítulo I, art. 53,
 * texto consolidado leído íntegro (content-raw/ley-39-2015-
 * procedimiento-administrativo; consolidado del BOE actualizado a
 * 06-11-2024, sin cambios posteriores). Remisiones al art. 98.2 (pago
 * electrónico) ya leídas para el Tema 27.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-438-derechos-interesado.mjs
 */
import { sembrarTema, ADMIN_AYTO } from "./lib/sembrar-tema.mjs";

const L = ADMIN_AYTO.ley39;
const S1 = "derechos-informacion-acceso";
const S2 = "derechos-documentos-defensa";
const S3 = "derechos-procedimiento-sancionador";

await sembrarTema({
  tema: {
    slug: "tema-438",
    titulo: "Derechos del interesado en el procedimiento administrativo",
    descripcion: "Ley 39/2015, Título IV, Capítulo I (art. 53): derecho a conocer el estado de la tramitación, el sentido del silencio, el órgano competente y los actos de trámite, y a acceder y obtener copia de los documentos (también en el Punto de Acceso General electrónico); identificar a las autoridades y al personal; no presentar originales ni documentos ya en poder de la Administración; alegar y aportar documentos antes de la audiencia; información y orientación; asistencia de asesor; pago electrónico; y, en los procedimientos sancionadores, derecho a ser notificado de la imputación y a la presunción de no existencia de responsabilidad.",
    contenido: "Qué derechos tiene quien es interesado en un procedimiento: saber en todo momento cómo va su expediente, qué efecto tendrá el silencio, qué órgano lo instruye y resuelve, y obtener copia de los documentos; saber quién tramita; no aportar originales ni documentos que ya tenga la Administración; alegar y aportar documentos hasta la audiencia; recibir orientación sobre los requisitos; ir acompañado de un asesor; y pagar por medios electrónicos. En los procedimientos sancionadores, además, a conocer los hechos que se le imputan, la posible sanción, el instructor y el órgano que resuelve, y a que se presuma que no es responsable mientras no se demuestre lo contrario.",
    enlaces_boe: [{ url: L, titulo: "Ley 39/2015, de 1 de octubre, del Procedimiento Administrativo Común de las Administraciones Públicas (BOE-A-2015-10565)" }],
    indice_estudio: [
      { seccion: S1, titulo: "Derecho a conocer el estado de la tramitación, identificar al personal e información", articulos: "art. 53.1.a), b) y f)", url: `${L}#a53` },
      { seccion: S2, titulo: "Documentos, alegaciones, asesoramiento y pago", articulos: "art. 53.1.c), d), e), g), h) e i)", url: `${L}#a53` },
      { seccion: S3, titulo: "Derechos del presunto responsable en el procedimiento sancionador", articulos: "art. 53.2", url: `${L}#a53` },
    ],
  },
  vinculo: { oposicion: ADMIN_AYTO.oposicion, bloqueId: ADMIN_AYTO.bloqueParte2, numero: 16 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Derecho a conocer el estado de la tramitación (art. 53.1.a)", "En cualquier momento: estado del procedimiento, sentido del silencio si no se resuelve en plazo, órgano competente para instruir y resolver y actos de trámite dictados"],
        ["Acceso y copia (art. 53.1.a)", "Derecho a acceder y obtener copia de los documentos del procedimiento"],
        ["Consulta electrónica (art. 53.1.a)", "Quien se relaciona electrónicamente puede consultar esa información en el Punto de Acceso General electrónico; la copia se entiende facilitada al ponerla a disposición allí o en la sede electrónica"],
        ["Identificar al personal (art. 53.1.b)", "Derecho a identificar a las autoridades y al personal bajo cuya responsabilidad se tramitan los procedimientos"],
        ["Información y orientación (art. 53.1.f)", "Sobre los requisitos jurídicos o técnicos que imponen las disposiciones a los proyectos, actuaciones o solicitudes"],
      ],
      preguntas: [
        ["facil", "Los interesados tienen derecho a conocer el estado de la tramitación de sus procedimientos:", ["En cualquier momento", "Solo al finalizar", "Solo en el trámite de audiencia"], "Art. 53.1.a) Ley 39/2015."],
        ["media", "Entre los extremos que el interesado tiene derecho a conocer figura:", ["El sentido del silencio si la Administración no resuelve y notifica en plazo", "El sueldo del instructor", "Los expedientes de otros vecinos"], "Art. 53.1.a) Ley 39/2015."],
        ["media", "Quien se relaciona electrónicamente puede consultar el estado de su expediente en:", ["El Punto de Acceso General electrónico de la Administración", "El BOE", "Las redes sociales del Ayuntamiento"], "Art. 53.1.a), párrafo segundo, Ley 39/2015."],
        ["media", "El derecho a identificar a las autoridades y al personal se refiere a:", ["Aquellos bajo cuya responsabilidad se tramitan los procedimientos", "Todos los empleados del Ayuntamiento", "Los miembros del Gobierno de Aragón"], "Art. 53.1.b) Ley 39/2015."],
        ["dificil", "La obligación de facilitar copias se entiende cumplida:", ["Con su puesta a disposición en el Punto de Acceso General electrónico o en la sede electrónica", "Solo con su entrega en papel", "Solo con su envío por correo postal"], "Art. 53.1.a), párrafo segundo, Ley 39/2015."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Documentos originales (art. 53.1.c)", "Derecho a no presentarlos salvo excepción normativa; si deben presentarse, derecho a obtener copia autenticada"],
        ["Documentos en poder de la Administración (art. 53.1.d)", "Derecho a no presentar datos y documentos no exigidos, ya en poder de las Administraciones o elaborados por ellas"],
        ["Alegaciones (art. 53.1.e)", "Formular alegaciones, usar los medios de defensa y aportar documentos en cualquier fase anterior a la audiencia, que deben tenerse en cuenta en la propuesta de resolución"],
        ["Asesor (art. 53.1.g)", "Derecho a actuar asistido de asesor cuando lo considere conveniente"],
        ["Pago electrónico (art. 53.1.h)", "Cumplir las obligaciones de pago por los medios electrónicos del art. 98.2 (tarjeta, transferencia, domiciliación u otros autorizados)"],
        ["Cláusula abierta (art. 53.1.i)", "Cualesquiera otros que reconozcan la Constitución y las leyes"],
      ],
      preguntas: [
        ["facil", "Como regla, los interesados tienen derecho a:", ["No presentar documentos originales", "Presentar siempre originales", "Presentar fotocopias compulsadas en todo caso"], "Art. 53.1.c) Ley 39/2015."],
        ["media", "Si excepcionalmente deben presentar un documento original, tienen derecho a:", ["Obtener una copia autenticada de este", "Que se les devuelva en el acto sin copia", "Cobrar una indemnización"], "Art. 53.1.c) Ley 39/2015."],
        ["media", "Los interesados tienen derecho a no presentar documentos que:", ["Ya se encuentren en poder de las Administraciones o hayan sido elaborados por estas", "Les resulten incómodos", "Sean anteriores a un año"], "Art. 53.1.d) Ley 39/2015."],
        ["media", "Los interesados pueden aportar documentos:", ["En cualquier fase anterior al trámite de audiencia", "Solo con la solicitud", "Solo en vía de recurso"], "Art. 53.1.e) Ley 39/2015."],
        ["media", "Los interesados tienen derecho a actuar asistidos de asesor:", ["Cuando lo consideren conveniente", "Solo en procedimientos sancionadores", "Nunca"], "Art. 53.1.g) Ley 39/2015."],
        ["dificil", "El derecho a cumplir las obligaciones de pago por medios electrónicos remite a:", ["El art. 98.2 de la Ley 39/2015", "La Ley General Tributaria exclusivamente", "El Código de Comercio"], "Art. 53.1.h) Ley 39/2015."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Derecho a ser notificado de la imputación (art. 53.2.a)", "Hechos imputados, infracciones que pueden constituir, sanciones posibles, identidad del instructor, autoridad competente para sancionar y norma que le atribuye la competencia"],
        ["Presunción de inocencia administrativa (art. 53.2.b)", "Presunción de no existencia de responsabilidad administrativa mientras no se demuestre lo contrario"],
        ["Relación entre art. 53.1 y 53.2", "Los derechos del 53.2 se suman a los del 53.1 para los presuntos responsables en procedimientos sancionadores"],
      ],
      preguntas: [
        ["facil", "En los procedimientos sancionadores, el presunto responsable tiene derecho a:", ["La presunción de no existencia de responsabilidad administrativa mientras no se demuestre lo contrario", "No ser notificado de nada", "Elegir la sanción"], "Art. 53.2.b) Ley 39/2015."],
        ["media", "El presunto responsable tiene derecho a ser notificado, entre otros extremos, de:", ["La identidad del instructor y de la autoridad competente para sancionar", "El domicilio del denunciante", "La opinión del alcalde"], "Art. 53.2.a) Ley 39/2015."],
        ["media", "Los derechos del art. 53.2 se reconocen:", ["Además de los del apartado 1", "En lugar de los del apartado 1", "Solo a las personas jurídicas"], "Art. 53.2 Ley 39/2015."],
        ["dificil", "Debe notificarse al presunto responsable también:", ["La norma que atribuye la competencia para sancionar", "El presupuesto del Ayuntamiento", "La lista de otros sancionados"], "Art. 53.2.a) Ley 39/2015."],
      ],
    },
  ],
  glosario: [
    [S1, "Interesado", "Persona que promueve un procedimiento o cuyos derechos o intereses legítimos pueden verse afectados por la resolución (art. 4 Ley 39/2015)."],
    [S1, "Punto de Acceso General electrónico", "Portal de acceso a la Administración desde el que se puede consultar el estado de los procedimientos y las notificaciones (arts. 43.4 y 53.1.a)."],
    [S2, "Copia autenticada", "Copia con garantía de autenticidad que el interesado puede obtener cuando debe presentar un original (art. 53.1.c)."],
    [S2, "Asesor", "Persona de confianza o profesional que asiste al interesado en el procedimiento (art. 53.1.g)."],
    [S3, "Presunción de no responsabilidad", "Garantía del presunto responsable de no ser considerado culpable mientras no se pruebe lo contrario (art. 53.2.b)."],
  ],
  casos: [
    {
      slug: "adm-ayto-derechos-vecina-expediente",
      titulo: "Una vecina que quiere saber cómo va lo suyo",
      supuesto: "Una vecina solicitó hace dos meses una ayuda municipal de rehabilitación. Llama a la unidad donde trabajas y pide: saber en qué punto está, quién lleva su expediente, qué pasará si no le contestan a tiempo y una copia del informe técnico. También pregunta si tiene que volver a aportar el certificado de empadronamiento y el original de la escritura.",
      preguntas: [
        [S1, "facil", "¿Tiene derecho a conocer el estado de la tramitación?", ["Sí, en cualquier momento", "No, hasta la resolución", "Solo por escrito notarial"], "Art. 53.1.a) Ley 39/2015."],
        [S1, "media", "¿Tiene derecho a saber quién tramita su expediente?", ["Sí, a identificar al personal bajo cuya responsabilidad se tramita", "No, es información reservada", "Solo si es abogada"], "Art. 53.1.b) Ley 39/2015."],
        [S1, "media", "Sobre qué pasará si no le contestan a tiempo, tiene derecho a conocer:", ["El sentido del silencio administrativo", "La fecha de jubilación del tramitador", "Nada"], "Art. 53.1.a) Ley 39/2015."],
        [S1, "media", "¿Puede obtener copia del informe técnico de su expediente?", ["Sí, tiene derecho a acceder y obtener copia de los documentos", "No, los informes son secretos", "Solo tras la resolución"], "Art. 53.1.a) Ley 39/2015."],
        [S2, "media", "El certificado de empadronamiento, que obra en poder del Ayuntamiento:", ["No tiene que volver a presentarlo", "Debe presentarlo de nuevo", "Debe pedirlo al INE"], "Art. 53.1.d) Ley 39/2015."],
        [S2, "media", "El original de la escritura, como regla:", ["No tiene que presentarlo", "Debe presentarlo siempre", "Debe dejarlo en depósito"], "Art. 53.1.c) Ley 39/2015."],
        [S2, "dificil", "Si una norma exigiera excepcionalmente el original, la vecina tendría derecho a:", ["Una copia autenticada", "Que se lo guarden un año", "Nada"], "Art. 53.1.c) Ley 39/2015."],
        [S2, "media", "Antes de la audiencia, la vecina puede:", ["Formular alegaciones y aportar documentos", "Solo esperar", "Solo recurrir"], "Art. 53.1.e) Ley 39/2015."],
        [S1, "media", "Si quiere saber qué requisitos técnicos debe cumplir la obra, tiene derecho a:", ["Obtener información y orientación", "Que le hagan el proyecto gratis", "Nada"], "Art. 53.1.f) Ley 39/2015."],
        [S2, "media", "Si quiere ir acompañada de su arquitecto a una reunión, puede porque tiene derecho a:", ["Actuar asistida de asesor", "Que el Ayuntamiento pague al arquitecto", "Nada"], "Art. 53.1.g) Ley 39/2015."],
      ],
    },
    {
      slug: "adm-ayto-derechos-sancion-ruido",
      titulo: "Un expediente sancionador por ruido",
      supuesto: "Se inicia un procedimiento sancionador contra el titular de un bar por exceso de ruido. La notificación de inicio solo dice «se le abre expediente por ruido», sin indicar qué hechos concretos, qué infracción, qué sanción podría corresponder ni quién es el instructor. El titular quiere ir acompañado de su abogada y pagar, en su caso, con tarjeta.",
      preguntas: [
        [S3, "media", "El titular tiene derecho a ser notificado de:", ["Los hechos imputados, la infracción, la posible sanción, el instructor, el órgano competente y la norma de competencia", "Solo de la sanción final", "Nada hasta la resolución"], "Art. 53.2.a) Ley 39/2015."],
        [S3, "media", "La notificación recibida es insuficiente porque no indica, entre otros:", ["La identidad del instructor", "El nombre del denunciante", "La hora de cierre del bar"], "Art. 53.2.a) Ley 39/2015."],
        [S3, "facil", "Mientras no se demuestre lo contrario, se presume:", ["Que no existe responsabilidad administrativa del titular", "Que es culpable", "Que debe pagar"], "Art. 53.2.b) Ley 39/2015."],
        [S2, "media", "¿Puede ir asistido de su abogada?", ["Sí, tiene derecho a actuar asistido de asesor", "No, el procedimiento es administrativo", "Solo si lo autoriza el instructor"], "Art. 53.1.g) Ley 39/2015."],
        [S2, "media", "¿Puede pagar la multa con tarjeta?", ["Sí, tiene derecho a pagar por medios electrónicos como la tarjeta", "No, solo en efectivo", "Solo con cheque"], "Arts. 53.1.h) y 98.2 Ley 39/2015."],
        [S1, "media", "Puede pedir conocer en cualquier momento:", ["El estado del expediente y los actos de trámite dictados", "Solo la fecha de la resolución", "Nada"], "Art. 53.1.a) Ley 39/2015."],
        [S2, "media", "Puede aportar mediciones de ruido propias:", ["En cualquier fase anterior a la audiencia", "Solo tras la sanción", "Nunca"], "Art. 53.1.e) Ley 39/2015."],
        [S2, "media", "Esas mediciones deben tenerse en cuenta:", ["Al redactar la propuesta de resolución", "Solo si son favorables al Ayuntamiento", "Nunca"], "Art. 53.1.e) Ley 39/2015."],
        [S3, "dificil", "Los derechos del art. 53.2 del titular se suman a:", ["Los del art. 53.1, comunes a todo interesado", "Ningún otro", "Los del Código Penal exclusivamente"], "Art. 53.2 Ley 39/2015."],
        [S1, "media", "El titular puede identificar a:", ["Las autoridades y el personal que tramitan su procedimiento", "Los vecinos que se quejaron, siempre", "El resto de sancionados"], "Art. 53.1.b) Ley 39/2015."],
      ],
    },
    {
      slug: "adm-ayto-derechos-empresa-electronica",
      titulo: "Una empresa que tramita todo por internet",
      supuesto: "Una empresa constructora, obligada a relacionarse electrónicamente, tramita una licencia de obra. Pide copia de todos los documentos del expediente y que no se le exijan otra vez los estatutos de la sociedad, que ya presentó el año pasado en otro expediente municipal.",
      preguntas: [
        [S1, "media", "La empresa puede consultar el estado de su expediente en:", ["El Punto de Acceso General electrónico", "Solo en ventanilla", "Solo por teléfono"], "Art. 53.1.a), párrafo segundo, Ley 39/2015."],
        [S1, "media", "La obligación de darle copias se cumple:", ["Poniéndolas a disposición en el Punto de Acceso General o en la sede electrónica", "Solo enviándolas en papel", "No hay obligación"], "Art. 53.1.a) Ley 39/2015."],
        [S2, "media", "Sobre los estatutos ya presentados en otro expediente municipal:", ["Tiene derecho a no volver a presentarlos, por estar en poder de la Administración", "Debe presentarlos de nuevo siempre", "Debe presentarlos compulsados"], "Art. 53.1.d) Ley 39/2015."],
        [S1, "media", "Si quiere saber qué normas técnicas debe cumplir el proyecto, tiene derecho a:", ["Información y orientación sobre los requisitos jurídicos o técnicos", "Que el Ayuntamiento redacte el proyecto", "Una exención de requisitos"], "Art. 53.1.f) Ley 39/2015."],
        [S1, "facil", "Conocer los actos de trámite dictados en su expediente es un derecho:", ["Del interesado", "Exclusivo de los funcionarios", "Inexistente"], "Art. 53.1.a) Ley 39/2015."],
        [S2, "media", "Las tasas de la licencia podrá pagarlas:", ["Por medios electrónicos como transferencia o domiciliación", "Solo en efectivo", "Solo por giro postal"], "Arts. 53.1.h) y 98.2 Ley 39/2015."],
        [S2, "media", "Además de los derechos enumerados, la empresa tiene:", ["Cualesquiera otros que le reconozcan la Constitución y las leyes", "Ninguno más", "Solo los del convenio de la construcción"], "Art. 53.1.i) Ley 39/2015."],
        [S1, "media", "El órgano competente para instruir y resolver la licencia:", ["Es un dato que la empresa tiene derecho a conocer", "Es secreto", "Solo se comunica al final"], "Art. 53.1.a) Ley 39/2015."],
        [S2, "dificil", "Si la ordenanza exigiera excepcionalmente presentar un original, la empresa tendría derecho a:", ["Obtener una copia autenticada", "Negarse a presentarlo", "Cobrar por presentarlo"], "Art. 53.1.c) Ley 39/2015."],
        [S2, "media", "La empresa puede alegar y aportar documentos:", ["Hasta el trámite de audiencia", "Solo al presentar la solicitud", "Solo después de la resolución"], "Art. 53.1.e) Ley 39/2015."],
      ],
    },
  ],
});
