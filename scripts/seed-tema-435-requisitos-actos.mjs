/**
 * Crea tema-435 — Tema 13 de Administrativa/o (Ayto. Zaragoza, promoción
 * interna, CONV 5.2bis/2025): "Ley del Procedimiento Administrativo Común de
 * las Administraciones Públicas (V): requisitos de los actos
 * administrativos."
 *
 * Tema dedicado: el canónico tema-6 recortado a `titulo-3-cap-1` solo tenía
 * 4 flashcards y 9 preguntas, insuficiente para un tema completo de examen;
 * scripts/fix-administrativo-ayto-temas-dedicados-13-16.mjs retira ese
 * vínculo.
 *
 * Fuente: Ley 39/2015 (BOE-A-2015-10565), Título III, Capítulo I, arts. 34 a
 * 36, texto consolidado leído íntegro (content-raw/ley-39-2015-
 * procedimiento-administrativo; consolidado del BOE actualizado a
 * 06-11-2024, sin cambios posteriores).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-435-requisitos-actos.mjs
 */
import { sembrarTema, ADMIN_AYTO } from "./lib/sembrar-tema.mjs";

const L = ADMIN_AYTO.ley39;
const S1 = "produccion-contenido-actos";
const S2 = "motivacion-actos";
const S3 = "forma-actos";

await sembrarTema({
  tema: {
    slug: "tema-435",
    titulo: "Requisitos de los actos administrativos",
    descripcion: "Ley 39/2015, Título III, Capítulo I (arts. 34 a 36): producción de los actos por el órgano competente conforme a los requisitos y al procedimiento; contenido ajustado al ordenamiento, determinado y adecuado a sus fines; actos que deben motivarse con sucinta referencia de hechos y fundamentos de derecho y motivación en procedimientos selectivos y de concurrencia competitiva; forma escrita por medios electrónicos, actos verbales y su constancia, y refundición de actos de la misma naturaleza.",
    contenido: "Qué requisitos debe cumplir un acto administrativo para ser válido. Lo dicta el órgano competente siguiendo el procedimiento establecido, y su contenido debe ajustarse al ordenamiento y ser determinado y adecuado a su fin. Deben motivarse, con una breve referencia a los hechos y al Derecho aplicado, los actos que limitan derechos, resuelven recursos o revisiones, se apartan del criterio anterior o de un dictamen, suspenden actos o adoptan medidas provisionales, acuerdan urgencia, ampliaciones o actuaciones complementarias, rechazan pruebas, terminan por imposibilidad o desistimiento, sancionan o resuelven responsabilidad patrimonial, o son discrecionales. Los actos se producen por escrito y por medios electrónicos; los verbales se documentan después, y los de la misma naturaleza pueden refundirse en uno.",
    enlaces_boe: [{ url: L, titulo: "Ley 39/2015, de 1 de octubre, del Procedimiento Administrativo Común de las Administraciones Públicas (BOE-A-2015-10565)" }],
    indice_estudio: [
      { seccion: S1, titulo: "Producción y contenido", articulos: "art. 34", url: `${L}#a34` },
      { seccion: S2, titulo: "Motivación", articulos: "art. 35", url: `${L}#a35` },
      { seccion: S3, titulo: "Forma", articulos: "art. 36", url: `${L}#a36` },
    ],
  },
  vinculo: { oposicion: ADMIN_AYTO.oposicion, bloqueId: ADMIN_AYTO.bloqueParte2, numero: 13 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Producción de los actos (art. 34.1)", "De oficio o a instancia del interesado, por el órgano competente y ajustándose a los requisitos y al procedimiento establecidos"],
        ["Contenido de los actos (art. 34.2)", "Ajustado al ordenamiento jurídico, determinado y adecuado a los fines del acto"],
        ["Elementos del acto que se derivan del art. 34", "Subjetivo (órgano competente), objetivo (contenido lícito, determinado y adecuado), formal (procedimiento) y teleológico (fin)"],
      ],
      preguntas: [
        ["facil", "Los actos administrativos se producirán:", ["Por el órgano competente ajustándose a los requisitos y al procedimiento establecido", "Por cualquier empleado de la Administración", "Solo a instancia del interesado"], "Art. 34.1 Ley 39/2015."],
        ["media", "El contenido de los actos administrativos debe ser:", ["Ajustado al ordenamiento, determinado y adecuado a sus fines", "Libre, según el criterio del órgano", "Siempre favorable al interesado"], "Art. 34.2 Ley 39/2015."],
        ["media", "Los actos administrativos pueden dictarse:", ["De oficio o a instancia del interesado", "Solo de oficio", "Solo a instancia del interesado"], "Art. 34.1 Ley 39/2015."],
        ["dificil", "Un acto cuyo contenido es indeterminado y no permite saber qué obliga a hacer al interesado incumple el requisito del:", ["Art. 34.2: contenido determinado", "Art. 36: forma escrita", "Art. 35: motivación"], "Art. 34.2 Ley 39/2015."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Forma de la motivación (art. 35.1)", "Sucinta referencia de hechos y fundamentos de derecho"],
        ["Actos motivados (art. 35.1.a a c)", "Los que limitan derechos subjetivos o intereses legítimos; los que resuelven revisiones de oficio, recursos y arbitrajes o declaran su inadmisión; los que se separan del criterio precedente o del dictamen de órganos consultivos"],
        ["Actos motivados (art. 35.1.d a f)", "Suspensión de actos y medidas provisionales; tramitación de urgencia, ampliación de plazos y actuaciones complementarias; rechazo de pruebas propuestas por los interesados"],
        ["Actos motivados (art. 35.1.g a i)", "Terminación por imposibilidad material sobrevenida y desistimiento de la Administración; propuestas y resoluciones sancionadoras y de responsabilidad patrimonial; actos discrecionales y los que exija una norma"],
        ["Motivación en procedimientos selectivos y de concurrencia competitiva (art. 35.2)", "Según las normas de la convocatoria, quedando acreditados en el procedimiento los fundamentos de la resolución"],
      ],
      preguntas: [
        ["facil", "La motivación de los actos administrativos se hará:", ["Con sucinta referencia de hechos y fundamentos de derecho", "Con una exposición extensa de doctrina", "Solo con la cita de la norma"], "Art. 35.1 Ley 39/2015."],
        ["media", "Deben ser motivados los actos que:", ["Se separen del criterio seguido en actuaciones precedentes", "Concedan íntegramente lo solicitado sin limitar derechos de nadie", "Acuerden la acumulación de procedimientos"], "Art. 35.1.c) Ley 39/2015."],
        ["media", "Deben motivarse los actos dictados en el ejercicio de:", ["Potestades discrecionales", "Potestades regladas en todo caso", "Funciones de registro"], "Art. 35.1.i) Ley 39/2015."],
        ["media", "Deben motivarse los acuerdos de:", ["Aplicación de la tramitación de urgencia y de ampliación de plazos", "Remisión de un expediente al archivo central", "Envío de un aviso por correo"], "Art. 35.1.e) Ley 39/2015."],
        ["dificil", "La motivación de los actos que ponen fin a los procedimientos selectivos se realizará:", ["Conforme a las normas que regulen sus convocatorias, acreditando en el procedimiento sus fundamentos", "Siempre con informe jurídico", "No es necesaria"], "Art. 35.2 Ley 39/2015."],
        ["media", "Deben motivarse las propuestas de resolución en los procedimientos:", ["Sancionadores", "Iniciados a solicitud y estimados", "De información pública"], "Art. 35.1.h) Ley 39/2015."],
        ["media", "El acto que rechaza una prueba propuesta por el interesado:", ["Debe ser motivado", "No requiere motivación", "Es nulo siempre"], "Art. 35.1.f) Ley 39/2015."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Forma de los actos (art. 36.1)", "Por escrito a través de medios electrónicos, salvo que su naturaleza exija otra forma más adecuada"],
        ["Actos verbales (art. 36.2)", "Si es necesaria su constancia escrita, la efectúa y firma el titular del órgano inferior o funcionario que la recibe oralmente, indicando la autoridad de la que procede"],
        ["Resoluciones verbales (art. 36.2)", "El titular de la competencia debe autorizar una relación de las dictadas de forma verbal, con su contenido"],
        ["Refundición de actos (art. 36.3)", "Una serie de actos de la misma naturaleza (nombramientos, concesiones, licencias) puede refundirse en un único acto que individualice los efectos para cada interesado"],
      ],
      preguntas: [
        ["facil", "Los actos administrativos se producirán, como regla:", ["Por escrito a través de medios electrónicos", "Verbalmente", "Por escrito en papel"], "Art. 36.1 Ley 39/2015."],
        ["media", "Cuando un órgano ejerza su competencia de forma verbal y sea necesaria la constancia escrita, la efectuará y firmará:", ["El titular del órgano inferior o funcionario que la reciba oralmente", "El interesado", "Un notario"], "Art. 36.2 Ley 39/2015."],
        ["media", "Una serie de nombramientos de la misma naturaleza puede:", ["Refundirse en un único acto que individualice los efectos para cada interesado", "Dictarse sin forma escrita", "Publicarse sin identificar a nadie"], "Art. 36.3 Ley 39/2015."],
        ["dificil", "Si se trata de resoluciones dictadas verbalmente, el titular de la competencia deberá:", ["Autorizar una relación de las que haya dictado de forma verbal, con expresión de su contenido", "Repetirlas por escrito una a una ante notario", "Comunicarlas al Pleno"], "Art. 36.2 Ley 39/2015."],
      ],
    },
  ],
  glosario: [
    [S1, "Acto administrativo", "Declaración de voluntad, juicio, conocimiento o deseo de una Administración en ejercicio de una potestad administrativa distinta de la reglamentaria."],
    [S1, "Órgano competente", "Órgano al que el ordenamiento atribuye la potestad para dictar un acto; es el primer requisito de validez (art. 34.1)."],
    [S2, "Motivación", "Expresión sucinta de los hechos y fundamentos de derecho que justifican un acto (art. 35)."],
    [S2, "Potestad discrecional", "Facultad que permite a la Administración elegir entre varias soluciones válidas; su ejercicio debe motivarse (art. 35.1.i)."],
    [S3, "Refundición de actos", "Agrupación en un único acto de varios de la misma naturaleza, individualizando sus efectos (art. 36.3)."],
  ],
  casos: [
    {
      slug: "adm-ayto-requisitos-denegacion-terraza",
      titulo: "La denegación de una terraza sin explicar por qué",
      supuesto: "Un hostelero recibe una resolución electrónica que dice solo: «Se deniega la autorización de terraza solicitada». No menciona hechos ni normas. El año anterior, en la misma calle y con las mismas condiciones, se le había concedido. El órgano que firma es el competente.",
      preguntas: [
        [S2, "facil", "¿Debe motivarse la denegación?", ["Sí, porque limita derechos o intereses legítimos", "No, las denegaciones no se motivan", "Solo si lo pide el interesado"], "Art. 35.1.a) Ley 39/2015."],
        [S2, "media", "Además, debe motivarse porque:", ["Se separa del criterio seguido en actuaciones precedentes", "Es un acto favorable", "Lo dicta un órgano colegiado"], "Art. 35.1.c) Ley 39/2015."],
        [S2, "media", "La motivación debía contener:", ["Una sucinta referencia de hechos y fundamentos de derecho", "Un informe de cien páginas", "Solo la firma"], "Art. 35.1 Ley 39/2015."],
        [S1, "media", "Que el órgano sea competente cumple el requisito del:", ["Art. 34.1", "Art. 36.3", "Art. 35.2"], "Art. 34.1 Ley 39/2015."],
        [S3, "facil", "Dictar la resolución por medios electrónicos y por escrito es:", ["La forma ordinaria de los actos", "Una excepción", "Un defecto"], "Art. 36.1 Ley 39/2015."],
        [S2, "dificil", "Si la autorización de terrazas fuera una potestad discrecional del Ayuntamiento, la denegación:", ["Debería motivarse igualmente por ser ejercicio de potestad discrecional", "No necesitaría motivación", "Sería nula siempre"], "Art. 35.1.i) Ley 39/2015."],
        [S1, "media", "El contenido de la resolución debe ser, además:", ["Determinado y adecuado a sus fines", "Indeterminado", "Favorable"], "Art. 34.2 Ley 39/2015."],
        [S2, "media", "Si el hostelero recurre y el Ayuntamiento resuelve el recurso, esa resolución:", ["Debe motivarse", "No necesita motivación", "Solo se motiva si se estima"], "Art. 35.1.b) Ley 39/2015."],
        [S2, "media", "Si se suspendiera cautelarmente la autorización de otro local mientras se tramita un expediente, el acuerdo:", ["Debería motivarse", "No necesitaría motivación", "Sería verbal"], "Art. 35.1.d) Ley 39/2015."],
        [S1, "media", "El acto puede producirse de oficio o:", ["A instancia del interesado, como en este caso", "Solo por el Pleno", "Solo por sorteo"], "Art. 34.1 Ley 39/2015."],
      ],
    },
    {
      slug: "adm-ayto-requisitos-orden-verbal",
      titulo: "Una orden verbal en una emergencia",
      supuesto: "Durante una tormenta, el concejal competente ordena por teléfono al jefe de Policía Local que cierre un parque por riesgo de caída de árboles. Al día siguiente, la unidad administrativa debe documentar esa orden. Ese mismo mes, el servicio tiene que conceder 40 licencias de kiosco idénticas.",
      preguntas: [
        [S3, "media", "¿Puede el concejal ejercer su competencia de forma verbal?", ["Sí, aunque la constancia escrita, cuando sea necesaria, debe efectuarse después", "No, nunca", "Solo con permiso judicial"], "Art. 36.2 Ley 39/2015."],
        [S3, "media", "La constancia escrita la efectúa y firma:", ["El titular del órgano inferior o funcionario que recibió la orden oralmente", "El concejal en todo caso", "Un vecino"], "Art. 36.2 Ley 39/2015."],
        [S3, "media", "En esa constancia debe expresarse:", ["La autoridad de la que procede la orden", "Solo la hora de la tormenta", "La opinión del funcionario"], "Art. 36.2 Ley 39/2015."],
        [S3, "dificil", "Si lo dictado verbalmente fueran resoluciones, el concejal deberá:", ["Autorizar una relación de ellas con expresión de su contenido", "Repetirlas ante el Pleno", "Publicarlas en el BOE"], "Art. 36.2 Ley 39/2015."],
        [S3, "media", "Las 40 licencias de kiosco idénticas pueden:", ["Refundirse en un único acto que especifique a cada titular", "Darse sin forma escrita", "Concederse sin identificar a los titulares"], "Art. 36.3 Ley 39/2015."],
        [S3, "facil", "La forma ordinaria de los actos es:", ["Escrita y por medios electrónicos", "Verbal", "Gestual"], "Art. 36.1 Ley 39/2015."],
        [S3, "media", "Una forma distinta de la escrita solo procede cuando:", ["La naturaleza del acto exija otra forma más adecuada", "Lo prefiera el funcionario", "No haya ordenador"], "Art. 36.1 Ley 39/2015."],
        [S2, "media", "El cierre del parque, que limita el derecho de uso de los vecinos, debe:", ["Motivarse", "No motivarse", "Consultarse a los vecinos"], "Art. 35.1.a) Ley 39/2015."],
        [S1, "media", "El cierre debe acordarlo:", ["El órgano competente", "Cualquier policía por su cuenta", "Un vecino afectado"], "Art. 34.1 Ley 39/2015."],
        [S2, "media", "Si el concejal se apartara de un dictamen técnico que aconsejaba no cerrar, el acto:", ["Debería motivarse", "No necesitaría motivación", "Sería automáticamente nulo"], "Art. 35.1.c) Ley 39/2015."],
      ],
    },
    {
      slug: "adm-ayto-requisitos-proceso-selectivo",
      titulo: "La motivación en un proceso selectivo",
      supuesto: "Un tribunal de selección publica la lista de aprobados del ejercicio de una promoción interna con las puntuaciones. Un aspirante pide que le expliquen por qué una pregunta suya se ha considerado incorrecta. Las bases de la convocatoria regulan la publicación de plantillas provisionales y definitivas.",
      preguntas: [
        [S2, "media", "La motivación de los actos que ponen fin al proceso selectivo se realiza:", ["Conforme a lo que dispongan las normas de la convocatoria", "Siempre con un informe individual extenso", "No se motiva"], "Art. 35.2 Ley 39/2015."],
        [S2, "media", "En todo caso, en el procedimiento deben quedar acreditados:", ["Los fundamentos de la resolución", "Los datos personales de los tribunales", "Las preferencias del presidente"], "Art. 35.2 Ley 39/2015."],
        [S2, "media", "La publicación de la plantilla de respuestas contribuye a:", ["Acreditar los fundamentos de la calificación", "Ocultar el criterio del tribunal", "Nada"], "Art. 35.2 Ley 39/2015, en relación con las bases."],
        [S2, "media", "Si el tribunal rechaza una prueba propuesta por un aspirante en un recurso, el rechazo:", ["Debe motivarse", "No se motiva", "Es irrecurrible"], "Art. 35.1.f) Ley 39/2015."],
        [S2, "dificil", "Si el órgano resuelve inadmitir un recurso de un aspirante, esa inadmisión:", ["Debe motivarse", "No requiere motivación", "Solo se notifica verbalmente"], "Art. 35.1.b) Ley 39/2015."],
        [S1, "facil", "La lista de aprobados la dicta:", ["El órgano competente, que es el tribunal de selección", "Cualquier aspirante", "La empresa de limpieza"], "Art. 34.1 Ley 39/2015."],
        [S1, "media", "El tribunal debe ajustarse a:", ["Los requisitos y el procedimiento establecidos en las bases y la ley", "Su libre criterio sin límites", "La opinión de los aspirantes"], "Art. 34.1 Ley 39/2015."],
        [S3, "media", "Las calificaciones de muchos aspirantes pueden recogerse en:", ["Un único acto que individualice la puntuación de cada uno", "Actos verbales", "Un correo a cada uno sin acto formal"], "Art. 36.3 Ley 39/2015."],
        [S3, "media", "El acto de calificación se producirá:", ["Por escrito y por medios electrónicos", "Verbalmente en el aula", "Solo en papel"], "Art. 36.1 Ley 39/2015."],
        [S2, "media", "Si el tribunal se separara del criterio de corrección que aplicó en ejercicios anteriores de la misma convocatoria:", ["Debería motivarlo", "No tendría que explicarlo", "Sería nulo siempre"], "Art. 35.1.c) Ley 39/2015."],
      ],
    },
  ],
});
