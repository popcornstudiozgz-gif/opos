/**
 * Crea tema-434 — Tema 12 de Administrativa/o (Ayto. Zaragoza, promoción
 * interna, CONV 5.2bis/2025): "Ley del Procedimiento Administrativo Común de
 * las Administraciones Públicas (IV): términos y plazos."
 *
 * Fuente: Ley 39/2015 (BOE-A-2015-10565), Título II, Capítulo II, arts. 29 a
 * 33, texto consolidado leído íntegro (content-raw/ley-39-2015-
 * procedimiento-administrativo; consolidado del BOE actualizado a
 * 06-11-2024, sin cambios posteriores).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-434-terminos-plazos.mjs
 */
import { sembrarTema, ADMIN_AYTO } from "./lib/sembrar-tema.mjs";

const L = ADMIN_AYTO.ley39;
const S1 = "obligatoriedad-computo-plazos";
const S2 = "computo-plazos-registros";
const S3 = "ampliacion-tramitacion-urgencia";

await sembrarTema({
  tema: {
    slug: "tema-434",
    titulo: "Términos y plazos en el procedimiento administrativo",
    descripcion: "Ley 39/2015, Título II, Capítulo II (arts. 29 a 33): obligatoriedad de los términos y plazos; cómputo por horas, días, meses y años; días hábiles e inhábiles (sábados excluidos), prórroga al primer día hábil y calendario de días inhábiles; cómputo en los registros electrónicos; ampliación de plazos (hasta la mitad, antes del vencimiento, incidencias técnicas y ciberincidentes) y tramitación de urgencia (plazos a la mitad salvo solicitudes y recursos).",
    contenido: "Cómo se cuentan los plazos administrativos: obligan a la Administración y a los interesados; las horas y los días son hábiles salvo que una ley diga otra cosa; los sábados, domingos y festivos no cuentan; los plazos en días empiezan al día siguiente de la notificación y los de meses terminan el mismo día del mes de vencimiento; si el último día es inhábil se prorroga al siguiente hábil. El registro electrónico admite documentos las 24 horas, pero lo presentado en día inhábil se entiende presentado a primera hora del primer día hábil siguiente. Los plazos pueden ampliarse hasta la mitad antes de que venzan, y la tramitación de urgencia los reduce a la mitad, salvo los de solicitudes y recursos.",
    enlaces_boe: [{ url: L, titulo: "Ley 39/2015, de 1 de octubre, del Procedimiento Administrativo Común de las Administraciones Públicas (BOE-A-2015-10565)" }],
    indice_estudio: [
      { seccion: S1, titulo: "Obligatoriedad y cómputo de plazos", articulos: "arts. 29 y 30", url: `${L}#a29` },
      { seccion: S2, titulo: "Cómputo de plazos en los registros", articulos: "art. 31", url: `${L}#a31` },
      { seccion: S3, titulo: "Ampliación y tramitación de urgencia", articulos: "arts. 32 y 33", url: `${L}#a32` },
    ],
  },
  vinculo: { oposicion: ADMIN_AYTO.oposicion, bloqueId: ADMIN_AYTO.bloqueParte2, numero: 12 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["¿A quién obligan los términos y plazos (art. 29)?", "A las autoridades y personal al servicio de las Administraciones competentes para tramitar los asuntos y a los interesados"],
        ["Plazos por horas (art. 30.1)", "Son hábiles todas las horas de un día hábil; se cuentan de hora en hora y de minuto en minuto desde la notificación o publicación; no pueden durar más de 24 horas (si no, se expresan en días)"],
        ["Plazos por días (art. 30.2)", "Se entienden hábiles, excluyendo sábados, domingos y festivos, salvo que una ley o el Derecho de la UE disponga otra cosa"],
        ["Plazos en días naturales (art. 30.2)", "Solo cuando lo declare una ley o el Derecho de la UE, y debe hacerse constar en las notificaciones"],
        ["Inicio del cómputo en días (art. 30.3)", "Desde el día siguiente a la notificación o publicación, o al de la estimación o desestimación por silencio"],
        ["Fin de los plazos en meses o años (art. 30.4)", "El mismo día en que se produjo la notificación, publicación o silencio en el mes o año de vencimiento; si no hay día equivalente, el último día del mes"],
        ["Último día inhábil (art. 30.5)", "El plazo se prorroga al primer día hábil siguiente"],
        ["Día hábil en el municipio del interesado e inhábil en la sede del órgano, o al revés (art. 30.6)", "Se considera inhábil en todo caso"],
        ["Calendario de días inhábiles (art. 30.7)", "Lo fijan la AGE y las comunidades autónomas; el autonómico incluye los días inhábiles de las entidades locales de su territorio y se publica antes del comienzo de cada año"],
        ["Efecto de declarar un día hábil o inhábil (art. 30.8)", "No determina por sí solo el funcionamiento de los centros de trabajo ni la jornada y horarios de la Administración"],
      ],
      preguntas: [
        ["facil", "Salvo que una ley disponga otro cómputo, cuando los plazos se señalan por días se entiende que son:", ["Hábiles, excluyendo sábados, domingos y festivos", "Naturales", "Hábiles, excluyendo solo domingos y festivos"], "Art. 30.2 Ley 39/2015."],
        ["media", "Un plazo expresado por horas no puede tener una duración superior a:", ["Veinticuatro horas", "Cuarenta y ocho horas", "Setenta y dos horas"], "Art. 30.1 Ley 39/2015."],
        ["media", "Un plazo de un mes notificado el 31 de enero de un año no bisiesto vence:", ["El 28 de febrero", "El 1 de marzo", "El 3 de marzo"], "Art. 30.4: si en el mes de vencimiento no hay día equivalente, el plazo expira el último día del mes."],
        ["media", "Si el último día del plazo es inhábil:", ["Se prorroga al primer día hábil siguiente", "El plazo vence el día hábil anterior", "El plazo se entiende caducado"], "Art. 30.5 Ley 39/2015."],
        ["dificil", "Si un día es hábil en el municipio de residencia del interesado e inhábil en la sede del órgano administrativo:", ["Se considera inhábil en todo caso", "Se considera hábil en todo caso", "Se aplica el calendario del interesado"], "Art. 30.6 Ley 39/2015."],
        ["media", "El calendario de días inhábiles de las comunidades autónomas:", ["Comprende los días inhábiles de las entidades locales de su ámbito territorial", "No incluye a las entidades locales, que aprueban el suyo propio", "Lo aprueba el Ministerio de Hacienda"], "Art. 30.7 Ley 39/2015."],
        ["media", "Cuando un plazo se señala en días naturales por así declararlo una ley:", ["Debe hacerse constar en las notificaciones", "Se convierte automáticamente en días hábiles", "Solo se aplica a la Administración"], "Art. 30.2, párrafo segundo, Ley 39/2015."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Oficinas de asistencia (art. 31.1)", "Cada Administración publicará los días y el horario de apertura de las oficinas que asisten en la presentación electrónica de documentos"],
        ["Fecha y hora que rige el registro electrónico (art. 31.2)", "La fecha y hora oficial de la sede electrónica de acceso, que debe figurar de modo accesible y visible"],
        ["Horario del registro electrónico (art. 31.2.a)", "Permite presentar documentos todos los días del año durante las 24 horas"],
        ["Presentación en día inhábil (art. 31.2.b)", "Se entiende realizada en la primera hora del primer día hábil siguiente, salvo que una norma permita expresamente la recepción en día inhábil; los documentos se reputan anteriores a los presentados ese día hábil"],
        ["Plazos que debe cumplir la Administración (art. 31.2.c)", "Empiezan a computarse desde la fecha y hora de presentación en su registro electrónico, que debe comunicarse a quien presentó el documento"],
        ["Calendario de días inhábiles del registro electrónico (art. 31.3)", "Lo determina su sede electrónica según su ámbito territorial y el calendario del art. 30.7; es el único aplicable y no se aplica el art. 30.6"],
      ],
      preguntas: [
        ["facil", "El registro electrónico permite la presentación de documentos:", ["Todos los días del año durante las veinticuatro horas", "Solo en días hábiles de 9 a 14 horas", "Solo en el horario de las oficinas de asistencia"], "Art. 31.2.a) Ley 39/2015."],
        ["media", "Un documento presentado en el registro electrónico un domingo, a efectos del cumplimiento de plazos en días hábiles por el interesado, se entiende presentado:", ["En la primera hora del primer día hábil siguiente", "El domingo a la hora efectiva", "El último día hábil anterior"], "Art. 31.2.b) Ley 39/2015."],
        ["media", "A efectos de cómputo de plazos, el registro electrónico se rige por:", ["La fecha y hora oficial de la sede electrónica de acceso", "La hora del ordenador del interesado", "La hora del servidor del proveedor de internet"], "Art. 31.2 Ley 39/2015."],
        ["dificil", "En el cómputo de plazos en los registros electrónicos, la regla del art. 30.6 (día hábil en un lugar e inhábil en otro):", ["No resulta de aplicación", "Se aplica siempre", "Solo se aplica a las personas jurídicas"], "Art. 31.3 Ley 39/2015."],
        ["media", "Los documentos presentados en un día inhábil se reputan, respecto de los presentados el primer día hábil posterior:", ["Anteriores, por el orden de hora efectiva", "Posteriores", "Simultáneos"], "Art. 31.2.b), párrafo segundo, Ley 39/2015."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Límite de la ampliación de plazos (art. 32.1)", "No puede exceder de la mitad del plazo; se concede de oficio o a petición, si las circunstancias lo aconsejan y no se perjudican derechos de tercero, y se notifica"],
        ["Ampliación por el máximo en todo caso (art. 32.2)", "Procedimientos tramitados por misiones diplomáticas y oficinas consulares, los que exijan un trámite en el extranjero o con interesados residentes fuera de España"],
        ["¿Cuándo debe pedirse y acordarse la ampliación (art. 32.3)?", "Antes del vencimiento del plazo; nunca puede ampliarse un plazo ya vencido"],
        ["¿Son recurribles los acuerdos sobre ampliación (art. 32.3)?", "No, sin perjuicio del recurso contra la resolución que ponga fin al procedimiento"],
        ["Incidencia técnica (art. 32.4)", "La Administración puede ampliar los plazos no vencidos y debe publicar en la sede electrónica la incidencia y la ampliación concreta"],
        ["Ciberincidente (art. 32.5)", "Si afecta gravemente a los sistemas de tramitación, la Administración puede acordar una ampliación general de plazos"],
        ["Tramitación de urgencia (art. 33.1)", "Por razones de interés público, de oficio o a petición: reduce a la mitad los plazos del procedimiento ordinario, salvo los de presentación de solicitudes y recursos"],
        ["¿Es recurrible el acuerdo de tramitación de urgencia (art. 33.2)?", "No cabe recurso alguno, sin perjuicio del procedente contra la resolución final"],
      ],
      preguntas: [
        ["facil", "La ampliación de los plazos no puede exceder de:", ["La mitad de los mismos", "El doble de los mismos", "Un mes en todo caso"], "Art. 32.1 Ley 39/2015."],
        ["media", "Un plazo ya vencido:", ["En ningún caso puede ser objeto de ampliación", "Puede ampliarse si lo pide el interesado", "Puede ampliarse por la mitad si hay causa justificada"], "Art. 32.3 Ley 39/2015."],
        ["media", "Contra el acuerdo que deniega la ampliación de un plazo:", ["No cabe recurso, sin perjuicio del procedente contra la resolución que ponga fin al procedimiento", "Cabe recurso de alzada", "Cabe recurso potestativo de reposición"], "Art. 32.3 Ley 39/2015."],
        ["media", "La tramitación de urgencia reduce a la mitad los plazos del procedimiento ordinario, salvo los relativos a:", ["La presentación de solicitudes y recursos", "La audiencia a los interesados", "La emisión de informes"], "Art. 33.1 Ley 39/2015."],
        ["dificil", "La ampliación por el tiempo máximo permitido se aplica en todo caso a los procedimientos:", ["En los que intervengan interesados residentes fuera de España", "De concesión de subvenciones", "Iniciados de oficio"], "Art. 32.2 Ley 39/2015."],
        ["media", "Ante una incidencia técnica que impide el funcionamiento ordinario de la aplicación, la Administración puede:", ["Ampliar los plazos no vencidos, publicando la incidencia y la ampliación en la sede electrónica", "Declarar caducados todos los procedimientos", "Ampliar también los plazos ya vencidos"], "Art. 32.4 Ley 39/2015."],
      ],
    },
  ],
  glosario: [
    [S1, "Día hábil", "Día que cuenta en los plazos administrativos: todos salvo sábados, domingos y festivos declarados (art. 30.2)."],
    [S1, "Día natural", "Cualquier día del calendario; solo se usa para computar plazos cuando lo declara una ley o el Derecho de la UE, y debe advertirse en la notificación."],
    [S1, "Calendario de días inhábiles", "Relación de días inhábiles a efectos de plazos que aprueban la AGE y cada comunidad autónoma (incluyendo los de sus entidades locales) y que se publica antes de empezar el año."],
    [S2, "Sede electrónica", "Dirección electrónica de titularidad de una Administración por la que se accede a sus servicios; su fecha y hora oficial rigen el cómputo de plazos del registro electrónico."],
    [S3, "Tramitación de urgencia", "Régimen acordado por razones de interés público que reduce a la mitad los plazos del procedimiento ordinario, salvo los de solicitudes y recursos (art. 33)."],
    [S3, "Ciberincidente", "Incidente de seguridad informática; si afecta gravemente a los sistemas de tramitación permite una ampliación general de plazos (art. 32.5)."],
  ],
  casos: [
    {
      slug: "adm-ayto-alegaciones-fin-de-semana",
      titulo: "Unas alegaciones presentadas en fin de semana",
      supuesto: "Al vecino Javier se le notifica electrónicamente el martes 3 de marzo un trámite de audiencia de diez días para presentar alegaciones en un expediente de la Oficina de Recursos Humanos. No hay festivos en esas fechas en Zaragoza ni en Aragón. Javier presenta sus alegaciones en el registro electrónico el sábado 14 de marzo a las 23:40.",
      preguntas: [
        [S1, "facil", "El plazo de diez días se cuenta:", ["En días hábiles, excluidos sábados, domingos y festivos", "En días naturales", "En días hábiles, excluidos solo domingos"], "Art. 30.2 Ley 39/2015."],
        [S1, "media", "El primer día del cómputo es:", ["El miércoles 4 de marzo", "El martes 3 de marzo", "El lunes 9 de marzo"], "Art. 30.3: desde el día siguiente a la notificación."],
        [S1, "media", "El último día del plazo es:", ["El martes 17 de marzo", "El viernes 13 de marzo", "El sábado 14 de marzo"], "Días hábiles: 4, 5, 6, 9, 10, 11, 12, 13, 16 y 17 de marzo (art. 30.2 y 30.3)."],
        [S2, "media", "¿Puede Javier presentar el escrito un sábado en el registro electrónico?", ["Sí, el registro electrónico admite documentos todos los días durante las 24 horas", "No, solo de lunes a viernes", "Solo si lo autoriza el instructor"], "Art. 31.2.a) Ley 39/2015."],
        [S2, "media", "A efectos del cumplimiento del plazo, las alegaciones del sábado se entienden presentadas:", ["En la primera hora del lunes 16 de marzo", "El sábado 14 a las 23:40", "El viernes 13 a última hora"], "Art. 31.2.b) Ley 39/2015."],
        [S1, "facil", "¿Ha presentado Javier sus alegaciones dentro de plazo?", ["Sí", "No, el plazo terminó el viernes 13", "No, porque se presentaron en día inhábil"], "Arts. 30 y 31.2.b) Ley 39/2015."],
        [S2, "media", "La hora que cuenta para el registro es la de:", ["La sede electrónica de acceso", "El ordenador de Javier", "El reloj de la oficina de registro"], "Art. 31.2 Ley 39/2015."],
        [S3, "media", "Si el día 10 Javier hubiera pedido ampliación del plazo, podría concedérsele como máximo:", ["Cinco días más", "Diez días más", "Quince días más"], "Art. 32.1: no puede exceder de la mitad del plazo."],
        [S3, "media", "Si pidiera la ampliación el 18 de marzo:", ["No podría concederse porque el plazo ya ha vencido", "Se concedería de forma automática", "Se concedería por la mitad del plazo"], "Art. 32.3 Ley 39/2015."],
        [S3, "dificil", "Si se denegara la ampliación pedida en plazo, Javier:", ["No podría recurrir esa denegación, sin perjuicio de recurrir la resolución final", "Podría interponer recurso de alzada", "Podría interponer recurso de reposición en un mes"], "Art. 32.3 Ley 39/2015."],
      ],
    },
    {
      slug: "adm-ayto-plazo-meses-y-festivos",
      titulo: "Un recurso con plazo de un mes y unos festivos",
      supuesto: "Una resolución de la Concejalía de Personal se notifica a una funcionaria el 31 de marzo y le indica que puede interponer recurso en el plazo de un mes. Ella vive en Huesca, donde un día de abril es festivo local que no lo es en Zaragoza, sede del órgano. Además, en el expediente hay un plazo de 48 horas para aportar un documento.",
      preguntas: [
        [S1, "media", "El plazo de un mes empieza a computarse:", ["El día siguiente a la notificación", "El mismo día de la notificación", "El primer día hábil del mes siguiente"], "Art. 30.4 Ley 39/2015."],
        [S1, "dificil", "Un plazo de un mes notificado el 31 de marzo vence:", ["El 30 de abril, último día del mes, al no existir el 31 de abril", "El 1 de mayo", "El 2 de mayo"], "Art. 30.4, párrafo segundo, Ley 39/2015."],
        [S1, "media", "Si el día de vencimiento fuera domingo:", ["Se prorrogaría al primer día hábil siguiente", "Vencería el viernes anterior", "Vencería ese domingo"], "Art. 30.5 Ley 39/2015."],
        [S1, "dificil", "El festivo local de Huesca, hábil en Zaragoza, a efectos de los plazos presenciales del art. 30:", ["Se considera inhábil en todo caso", "Se considera hábil porque lo es en la sede del órgano", "No afecta porque el plazo es en meses"], "Art. 30.6 Ley 39/2015."],
        [S2, "dificil", "Si presenta el recurso por registro electrónico, la regla del art. 30.6:", ["No se aplica: rige solo el calendario de la sede electrónica", "Se aplica igualmente", "Obliga a usar el calendario de Huesca"], "Art. 31.3 Ley 39/2015."],
        [S1, "media", "El plazo de 48 horas para aportar el documento:", ["Debería expresarse en días, porque los plazos por horas no pueden superar 24 horas", "Es correcto y se cuenta en horas naturales", "Es correcto y se cuenta en horas hábiles"], "Art. 30.1, párrafo segundo, Ley 39/2015."],
        [S1, "media", "Las horas de un plazo fijado por horas se cuentan:", ["De hora en hora y de minuto en minuto desde la notificación", "Desde las 0:00 del día siguiente", "Solo dentro del horario de oficina"], "Art. 30.1 Ley 39/2015."],
        [S1, "media", "¿Qué horas son hábiles en un plazo señalado por horas?", ["Todas las horas del día que formen parte de un día hábil", "Solo de 9 a 14 horas", "Solo de 8 a 20 horas"], "Art. 30.1 Ley 39/2015."],
        [S1, "media", "El calendario de días inhábiles que incluye los festivos locales de Zaragoza lo aprueba:", ["La Comunidad Autónoma de Aragón", "El Ayuntamiento de Zaragoza", "La Delegación del Gobierno"], "Art. 30.7 Ley 39/2015."],
        [S1, "facil", "Los términos y plazos obligan:", ["Tanto a la Administración como a los interesados", "Solo a los interesados", "Solo a la Administración"], "Art. 29 Ley 39/2015."],
      ],
    },
    {
      slug: "adm-ayto-caida-aplicacion-urgencia",
      titulo: "La caída de la aplicación y un procedimiento urgente",
      supuesto: "Durante dos días la aplicación de presentación de solicitudes de una convocatoria municipal de ayudas deja de funcionar por una incidencia técnica. A la vez, la Alcaldía decide tramitar por urgencia un procedimiento de contratación de personal interino por razones de interés público.",
      preguntas: [
        [S3, "media", "Ante la incidencia técnica, el Ayuntamiento puede:", ["Ampliar los plazos no vencidos", "Ampliar todos los plazos, incluso los vencidos", "Suspender la convocatoria sin más"], "Art. 32.4 Ley 39/2015."],
        [S3, "media", "Al acordar esa ampliación, el Ayuntamiento debe publicar en la sede electrónica:", ["La incidencia técnica y la ampliación concreta del plazo", "Solo el nuevo plazo", "Nada, basta con un correo interno"], "Art. 32.4 Ley 39/2015."],
        [S3, "dificil", "Si la caída se debiera a un ciberincidente que afectara gravemente a los sistemas, el Ayuntamiento podría:", ["Acordar la ampliación general de plazos de los procedimientos", "Declarar inhábil todo el mes", "Anular las solicitudes ya presentadas"], "Art. 32.5 Ley 39/2015."],
        [S3, "facil", "La tramitación de urgencia puede acordarse:", ["De oficio o a petición del interesado, cuando razones de interés público lo aconsejen", "Solo a petición del interesado", "Solo por ley"], "Art. 33.1 Ley 39/2015."],
        [S3, "media", "Con la tramitación de urgencia, un plazo de audiencia de diez días queda en:", ["Cinco días", "Diez días", "Tres días"], "Art. 33.1 Ley 39/2015."],
        [S3, "media", "El plazo para presentar solicitudes en el procedimiento urgente:", ["No se reduce", "Se reduce a la mitad", "Se reduce a un tercio"], "Art. 33.1 Ley 39/2015."],
        [S3, "media", "El plazo para interponer recursos contra la resolución del procedimiento urgente:", ["No se reduce", "Se reduce a quince días", "Se reduce a la mitad"], "Art. 33.1 Ley 39/2015."],
        [S3, "media", "Contra el acuerdo que declara la tramitación de urgencia:", ["No cabe recurso alguno, sin perjuicio del procedente contra la resolución final", "Cabe recurso de alzada", "Cabe recurso de reposición"], "Art. 33.2 Ley 39/2015."],
        [S2, "media", "En el registro electrónico, los plazos que debe cumplir el Ayuntamiento empiezan a contar desde:", ["La fecha y hora de presentación en su registro electrónico", "La fecha en que el expediente llega al servicio gestor", "El día siguiente hábil a la presentación"], "Art. 31.2.c) Ley 39/2015."],
        [S2, "media", "Esa fecha y hora efectiva de inicio del cómputo:", ["Debe comunicarse a quien presentó el documento", "Es reservada", "Solo se comunica si se solicita por escrito"], "Art. 31.2.c) Ley 39/2015."],
      ],
    },
  ],
});
