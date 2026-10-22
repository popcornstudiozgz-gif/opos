/**
 * Crea tema-377 — Tema 50 de Policía Local: "La Disciplina urbanística.
 * Título VI del Decreto Legislativo por el que se aprueba el Texto
 * Refundido de la Ley Urbanística de Aragón. El Título II de la Ordenanza
 * Municipal de Medios de Intervención de la Actividad Urbanística."
 *
 * Fuentes leídas en esta sesión:
 * - Decreto Legislativo 1/2014, de 8 de julio, texto refundido de la Ley de
 *   Urbanismo de Aragón (identificador BOE de la versión consolidada:
 *   BOA-d-2014-90410; título verificado en la API del BOE, actualización de
 *   febrero de 2025, incluye la reforma de la Ley 2/2023, BOE-A-2023-6659).
 *   Título VI, arts. 264-287: leídos 264-270, 274 y 277-285.
 * - Ordenanza Municipal de Medios de Intervención en la Actividad
 *   Urbanística de Zaragoza (aprobación definitiva BOPZ nº 116 de
 *   25-05-2011; modificaciones de 2013, 2016 y 2019), texto consolidado de
 *   zaragoza.es/sede/servicio/normativa/1622. Título II ("Intervención
 *   previa al inicio de la actividad"), arts. 31 bis-58.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-377-disciplina-urbanistica.mjs
 */
import { sembrarTema, POLICIA } from "./lib/sembrar-tema.mjs";

const TR = "https://www.boe.es/buscar/act.php?id=BOA-d-2014-90410";
const OM = "https://www.zaragoza.es/sede/servicio/normativa/1622";
const S1 = "inspeccion-urbanistica";
const S2 = "proteccion-legalidad-urbanistica";
const S3 = "infracciones-sanciones-urbanisticas";
const S4 = "ordenanza-licencia-urbanistica";
const S5 = "comunicacion-previa-declaracion-responsable";

await sembrarTema({
  tema: {
    slug: "tema-377",
    titulo: "Disciplina urbanística: Ley de Urbanismo de Aragón (Título VI) y medios de intervención municipales",
    descripcion: "Texto refundido de la Ley de Urbanismo de Aragón (Decreto Legislativo 1/2014), Título VI: inspección urbanística (inspectores como agentes de la autoridad, actas, obstrucción); protección de la legalidad (paralización de obras en curso, obras terminadas, demolición o legalización, multas coercitivas, suspensión de suministros); infracciones leves, graves y muy graves, responsables, graduación, prescripción y competencias. Ordenanza de Medios de Intervención en la Actividad Urbanística de Zaragoza, Título II: clasificación de las obras y título habilitante, licencia urbanística (actos sujetos y no sujetos, vigencia, prórroga, caducidad, transmisión, inicio de obras), comunicación previa y declaración responsable (efectos, plazos, ocupación de aceras con vallas y andamios).",
    contenido: "Qué papeles hacen falta para hacer una obra en Zaragoza (licencia, declaración responsable o comunicación previa), qué plazos tiene cada uno y qué ocurre cuando alguien construye sin permiso: el Alcalde ordena parar la obra, se puede cortar el suministro, y la obra se legaliza o se derriba. Incluye las infracciones y multas urbanísticas y la colaboración de la Policía Local con los inspectores, por ejemplo cuando ve una obra sin licencia o una valla que ocupa demasiada acera.",
    enlaces_boe: [
      { url: TR, titulo: "Decreto Legislativo 1/2014, de 8 de julio, texto refundido de la Ley de Urbanismo de Aragón (BOA nº 140, 18-07-2014; versión consolidada BOA-d-2014-90410)" },
      { url: OM, titulo: "Ordenanza Municipal de Medios de Intervención en la Actividad Urbanística de Zaragoza (BOPZ nº 116, 25-05-2011, texto consolidado)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "Título VI, Cap. I: inspección urbanística", articulos: "arts. 264-267", url: `${TR}#a264` },
      { seccion: S2, titulo: "Título VI: protección de la legalidad urbanística", articulos: "arts. 268-276", url: `${TR}#a268` },
      { seccion: S3, titulo: "Título VI: infracciones y sanciones urbanísticas", articulos: "arts. 277-287", url: `${TR}#a277` },
      { seccion: S4, titulo: "Ordenanza, Título II, Caps. I-II: clasificación de obras y licencia urbanística", articulos: "arts. 31 bis-51", url: OM },
      { seccion: S5, titulo: "Ordenanza, Título II: comunicación previa y declaración responsable", articulos: "arts. 52-58", url: OM },
    ],
  },
  vinculo: { oposicion: POLICIA.oposicion, bloqueId: POLICIA.bloqueParte2, numero: 50 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Competencia de inspección (art. 264)", "Municipios, comarcas y Comunidad Autónoma, de forma coordinada; la autonómica defiende intereses supramunicipales"],
        ["Inspectores urbanísticos (art. 265.1)", "Son agentes de la autoridad y pueden pedir apoyo a las Fuerzas y Cuerpos de Seguridad, la Policía Autonómica y las Policías Locales, respetando la intimidad y la inviolabilidad del domicilio"],
        ["Entrada en domicilio (art. 265.1)", "Exige consentimiento del afectado o autorización judicial"],
        ["Obstrucción (art. 265.3)", "Negar el acceso a un inspector acreditado (salvo que falte la autorización judicial exigible), no exhibir la documentación o no comparecer"],
        ["Actas (art. 266)", "Documentos públicos que prueban los hechos salvo prueba en contrario; las que carecen de requisitos o no proceden de inspector con fe pública valen como denuncia"],
      ],
      preguntas: [
        ["media", "¿Qué condición tienen los inspectores urbanísticos?", ["Agentes de la autoridad", "Particulares", "Peritos judiciales"], "TR Ley de Urbanismo de Aragón, art. 265.1."],
        ["media", "¿Pueden los inspectores pedir el apoyo de la Policía Local?", ["Sí", "No", "Solo de noche"], "Art. 265.1."],
        ["media", "¿Qué hace falta para que un inspector entre en un domicilio?", ["Consentimiento del afectado o autorización judicial", "Nada", "Una orden del Alcalde"], "Art. 265.1."],
        ["media", "¿Qué valor tienen las actas de inspección urbanística?", ["Son documentos públicos que prueban los hechos salvo prueba en contrario", "Ninguno", "Solo informativo"], "Art. 266.1."],
        ["dificil", "Un acta que no procede de un inspector con fe pública se considera…", ["Denuncia", "Nula sin efecto alguno", "Sentencia"], "Art. 266.3."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Obras en curso sin título (art. 268.1)", "El Alcalde ordena su paralización inmediata y, tras expediente, la demolición o cese si son incompatibles, o requiere legalizarlas en dos meses si pueden ser compatibles"],
        ["Garantizar la paralización (art. 268.2)", "Suspensión de suministros provisionales de obra, precinto o retirada de materiales y maquinaria"],
        ["Caducidad (arts. 268.3 y 269.6)", "El procedimiento de protección de la legalidad caduca a los seis meses sin resolución expresa"],
        ["Obras terminadas (art. 269.1)", "El Alcalde actúa dentro del plazo de prescripción de la infracción, contado desde la total terminación"],
        ["Sin límite de plazo (art. 269.3)", "Si se edifica en sistemas generales, zonas verdes, espacios libres o suelo no urbanizable especial, con traslado al Ministerio Fiscal"],
        ["Fuera de ordenación (art. 269.4)", "El paso del plazo no legaliza la obra: solo se permiten pequeñas reparaciones de seguridad e higiene, no reformas ni ampliaciones"],
        ["Multas coercitivas (art. 270.2)", "Al menos mensuales, de hasta el 10 % del coste de las obras ordenadas cada una, hasta alcanzar el coste total"],
        ["Plazo de ejecución (art. 270.3)", "Seis años desde la firmeza para cumplir las medidas de restablecimiento"],
        ["Suspensión de suministros (art. 274)", "Las órdenes de paralización o demolición pueden cortar energía, agua, gas y teléfono; solo se reanudan tras la legalización"],
      ],
      preguntas: [
        ["media", "¿Quién ordena la paralización inmediata de una obra sin licencia en curso?", ["El Alcalde", "La Policía Local por sí sola", "El constructor"], "Art. 268.1."],
        ["media", "Si la obra puede ser compatible con la ordenación, ¿qué plazo se da para iniciar su legalización?", ["Dos meses", "Diez días", "Un año"], "Art. 268.1.b)."],
        ["media", "¿Qué medidas garantizan la paralización?", ["Suspensión de suministros de obra y precinto o retirada de materiales y maquinaria", "Solo una multa", "Ninguna"], "Art. 268.2."],
        ["media", "¿Cuánto tiempo tiene la Administración para resolver el procedimiento de protección de la legalidad?", ["Seis meses, si no caduca", "Diez años", "Un mes"], "Art. 268.3."],
        ["dificil", "¿Hay plazo para actuar contra una construcción levantada en una zona verde?", ["No, sin limitación de plazo", "Sí, un año", "Sí, cuatro años"], "Art. 269.3."],
        ["media", "¿Qué importe máximo tiene cada multa coercitiva?", ["El 10 % del coste estimado de las obras ordenadas", "600 euros", "El 50 %"], "Art. 270.2."],
        ["media", "¿Cuándo se reanuda un suministro suspendido por orden de paralización?", ["Tras la legalización de las obras", "Al día siguiente", "Al pagar la multa"], "Art. 274.3."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Leves (art. 277)", "Multa de 600 a 6.000 euros: obras sin título pero legalizables o de escasa entidad, incumplir el deber de conservación, obstaculizar la vigilancia"],
        ["Graves (art. 278)", "Multa de 6.000,01 a 60.000 euros: obras de entidad sin título y no legalizables, exceso de edificabilidad o altura de más del 10 %, desobedecer la orden de paralización, talas de masas arbóreas, derribos de edificios protegidos"],
        ["Muy graves (art. 279)", "Multa de 60.000,01 a 300.000 euros: parcelaciones que formen núcleo de población, urbanizaciones incompatibles sin planeamiento, actos sobre dominio público, espacios libres, bienes culturales o suelo no urbanizable especial"],
        ["Responsables (art. 280)", "Promotor, constructor, técnicos directores, urbanizador; en parcelaciones, propietarios y promotor; en conservación, los propietarios; las suministradoras si no exigen licencia"],
        ["Sin beneficio (art. 282.2)", "La infracción nunca puede suponer beneficio: la Administración cuantifica el beneficio y exige su pago además de la multa"],
        ["Eximente y atenuantes (art. 282.5-7)", "Exime reponer voluntariamente la realidad antes del procedimiento; atenúa parar la obra tras la advertencia del inspector o reponer antes de que termine"],
        ["Restauración (art. 283)", "Además de la sanción, la Administración impone restaurar el orden urbanístico, reponer los bienes e indemnizar"],
        ["Prescripción (art. 284)", "Infracciones: leves 1 año, graves 4 años, muy graves 10 años; sanciones: leves 1 año, graves 2, muy graves 3"],
        ["Competencia sancionadora (art. 285)", "El Alcalde en leves; el Pleno en graves y muy graves; la comarca puede subrogarse si el municipio no actúa"],
      ],
      preguntas: [
        ["media", "¿Qué multa corresponde a una infracción urbanística leve?", ["De 600 a 6.000 euros", "Hasta 750 euros", "De 6.000 a 60.000 euros"], "Art. 277."],
        ["media", "Desobedecer la orden de paralización de una obra es una infracción…", ["Grave", "Leve", "Muy grave"], "Art. 278.h)."],
        ["media", "Edificar en una superficie destinada a espacios libres en contra del planeamiento es infracción…", ["Muy grave", "Leve", "Grave"], "Art. 279.c)."],
        ["media", "¿En qué plazo prescribe una infracción urbanística grave?", ["Cuatro años", "Un año", "Diez años"], "Art. 284.1."],
        ["dificil", "¿Y una muy grave?", ["Diez años", "Tres años", "Seis meses"], "Art. 284.1."],
        ["media", "¿Quién sanciona las infracciones urbanísticas graves?", ["El Ayuntamiento Pleno", "El Alcalde", "La Policía Local"], "Art. 285.1."],
        ["media", "¿Atenúa la responsabilidad parar voluntariamente la obra tras la advertencia del inspector?", ["Sí", "No", "Solo en leves"], "Art. 282.7.b)."],
        ["media", "Además de la multa, ¿qué debe imponer la Administración?", ["Restaurar el orden urbanístico alterado, reponer e indemnizar", "Nada más", "Un arresto"], "Art. 283.1."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Clasificación de obras (art. 31 bis)", "Obras mayores de edificación: licencia; otras obras mayores: declaración responsable; obras menores: comunicación previa"],
        ["Documentación (art. 31 ter)", "Licencia: proyecto de edificación; declaración responsable: memoria técnica; comunicación previa: documentación justificativa"],
        ["Licencia urbanística (art. 32)", "Acto reglado que, tras comprobar la normativa, autoriza el ejercicio de un derecho preexistente a construir o usar el suelo"],
        ["Actos sujetos a licencia (art. 34)", "Movimientos de tierra y parcelaciones, edificación de nueva planta, reformas que alteren la configuración arquitectónica, demoliciones, obras en edificios protegidos, casas prefabricadas, actividades clasificadas y establecimientos públicos"],
        ["No sujetos (art. 35)", "Demolición de ruina inminente y apuntalamientos, obras de proyectos de urbanización aprobados, órdenes de ejecución sin proyecto, obras públicas exentas y celebraciones privadas"],
        ["Contenido (art. 36)", "Se otorga conforme al planeamiento vigente al resolver, dejando a salvo el derecho de propiedad y sin perjuicio de tercero"],
        ["Vigencia (art. 43)", "Inicio en un año desde la notificación y fin en dos años desde el inicio, salvo plazo superior en la licencia"],
        ["Prórroga y caducidad (arts. 44-45)", "Hasta dos prórrogas justificadas; caduca si no se inicia o termina en plazo o si la actividad se interrumpe más de seis meses, por procedimiento contradictorio"],
        ["Transmisión (art. 46)", "Debe comunicarse por ambos titulares; si no, responden solidariamente"],
        ["Inicio de obras (art. 47)", "Se notifica la fecha; sin aceptación del director facultativo no puede empezar la obra; el cambio de constructor se comunica en tres días"],
      ],
      preguntas: [
        ["media", "¿Qué título habilitante necesita una obra mayor de edificación de nueva planta?", ["Licencia urbanística", "Comunicación previa", "Ninguno"], "Ordenanza, art. 31 bis."],
        ["media", "¿Y una obra menor de reparación en una vivienda?", ["Comunicación previa", "Licencia", "Declaración responsable"], "Arts. 31 bis y 57."],
        ["media", "¿Necesita licencia el apuntalamiento de un edificio en ruina inminente?", ["No", "Sí", "Solo si es protegido"], "Art. 35.1.a)."],
        ["media", "¿En qué plazo deben iniciarse, con carácter general, las obras con licencia?", ["Un año desde la notificación", "Un mes", "Cinco años"], "Art. 43."],
        ["media", "¿Cuántas veces pueden prorrogarse los plazos de la licencia?", ["Hasta dos veces, por causa justificada", "Ninguna", "Indefinidamente"], "Art. 44."],
        ["dificil", "¿Puede empezar una obra sin que el director facultativo haya comunicado la aceptación del encargo?", ["No; se considera sin dirección facultativa y debe suspenderse", "Sí", "Solo los fines de semana"], "Art. 47.2-3."],
        ["media", "Si se transmite una licencia sin comunicarlo, ¿quién responde?", ["El antiguo y el nuevo titular, solidariamente", "Nadie", "Solo el nuevo"], "Art. 46.1."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["Comunicación previa y declaración responsable (art. 52)", "Documentos del interesado que permiten actuar con control posterior; en la declaración responsable manifiesta bajo su responsabilidad que cumple los requisitos y dispone de la documentación técnica"],
        ["Efectos (art. 53.2)", "Producen efectos desde que se presenta toda la documentación, sin perjuicio de la comprobación posterior"],
        ["Falsedad (art. 53.3)", "Una inexactitud o falsedad esencial impide continuar la actuación y puede impedir presentar otra con el mismo objeto durante al menos un año"],
        ["Excesos (art. 53.6)", "Cualquier extralimitación de lo comunicado o declarado es infracción urbanística"],
        ["Obras menores (art. 54.2)", "Se inician en un mes desde la comunicación y terminan en seis meses; si no, caducan salvo prórroga"],
        ["Prohibido en la vía (art. 54.4)", "Andamios, escaleras, máquinas o materiales en la vía pública que entorpezcan el tránsito sin autorización"],
        ["Control (art. 55)", "Si falta documentación, diez días hábiles para subsanar; en diez días hábiles el Ayuntamiento puede declarar que no puede continuar si es contraria a la normativa"],
        ["Sujetos a comunicación previa (art. 57)", "Actividades sin licencia ambiental con obras menores, cambios de titularidad y todo tipo de obras menores (reformas sin estructura, reparaciones de fachada, desbroce de solares, puntos de recarga); nunca cerrar balcones"],
        ["Sujetos a declaración responsable (art. 58)", "Obras mayores que no alteran la configuración del edificio, primera ocupación, talas sin valor paisajístico, ascensores sin afección estructural, vallados, grúas, badenes, antenas y la ocupación de aceras con vallas y andamios"],
        ["Vallas de obra en acera (art. 58.2.e)", "Prefabricadas; no pueden adelantarse más de 3 m desde la fachada, ni superar dos tercios de la acera, ni dejar menos de 1,20 m libres"],
      ],
      preguntas: [
        ["media", "¿Desde cuándo produce efectos una declaración responsable completa?", ["Desde su presentación con toda la documentación", "Desde que se concede la licencia", "A los tres meses"], "Ordenanza, art. 53.2."],
        ["media", "¿En qué plazo deben iniciarse las obras menores comunicadas?", ["Un mes", "Un año", "Seis meses"], "Art. 54.2."],
        ["media", "¿Y en qué plazo deben terminar?", ["Seis meses desde su inicio", "Dos años", "Un mes"], "Art. 54.2."],
        ["media", "¿Puede cerrarse un balcón mediante comunicación previa?", ["No", "Sí", "Solo en planta baja"], "Art. 57.2.d).3ª."],
        ["media", "¿Qué espacio libre mínimo de acera debe dejar una valla de obra?", ["1,20 metros", "50 centímetros", "3 metros"], "Art. 58.2.e).2ª."],
        ["dificil", "¿Cuánto puede adelantarse como máximo la valla de obra desde la línea de fachada?", ["3 metros, sin superar dos tercios de la acera", "5 metros", "Toda la acera"], "Art. 58.2.e).2ª."],
        ["media", "¿Qué título necesita la colocación de una grúa no prevista en el proyecto?", ["Declaración responsable", "Comunicación previa", "Ninguno"], "Art. 58.2.i)."],
        ["media", "¿Puede colocarse un andamio en la acera sin título habilitante?", ["No", "Sí", "Sí, de noche"], "Arts. 54.4 y 58.2.f)."],
      ],
    },
  ],
  glosario: [
    [S1, "Inspector urbanístico", "Funcionario que comprueba el cumplimiento de la normativa urbanística, con condición de agente de la autoridad."],
    [S2, "Protección de la legalidad urbanística", "Conjunto de medidas para restablecer el orden urbanístico: paralización, legalización o demolición."],
    [S2, "Multa coercitiva", "Multa periódica para forzar el cumplimiento de una orden, distinta de la sanción."],
    [S2, "Fuera de ordenación", "Situación de una edificación disconforme con el planeamiento en la que solo caben pequeñas reparaciones."],
    [S3, "Núcleo de población", "Agrupación de edificaciones que exige servicios urbanísticos; crearlo mediante parcelación es infracción muy grave."],
    [S4, "Licencia urbanística", "Acto reglado municipal que autoriza obras o usos del suelo tras comprobar la normativa."],
    [S4, "Caducidad de la licencia", "Pérdida de efectos de la licencia por no iniciar o terminar las obras en plazo."],
    [S5, "Comunicación previa", "Documento con el que se pone en conocimiento del Ayuntamiento una obra menor o actuación de escasa entidad."],
    [S5, "Declaración responsable", "Documento en el que el interesado manifiesta bajo su responsabilidad que cumple la normativa para una obra mayor sin licencia."],
    [S5, "Obra menor", "Intervención de sencillez técnica y escasa entidad que no requiere proyecto."],
  ],
  casos: [
    {
      slug: "caso-obra-sin-licencia-vivienda",
      titulo: "Una ampliación sin licencia en un barrio rural",
      supuesto: "Una patrulla que circula por Garrapinillos observa obras para levantar una segunda planta en una vivienda unifamiliar. El propietario no puede mostrar licencia y asegura que 'ya la pedirá'. Los agentes informan a la inspección urbanística, que constata que la ampliación supera en más de un 10 % la altura permitida.",
      preguntas: [
        [S2, "media", "¿Quién ordena paralizar la obra?", ["El Alcalde", "Los agentes por sí solos con carácter definitivo", "El vecino"], "TR, art. 268.1."],
        [S2, "media", "¿Qué medidas pueden garantizar la paralización?", ["Suspender suministros de obra y precintar o retirar materiales y maquinaria", "Ninguna", "Solo avisar"], "Art. 268.2."],
        [S4, "media", "¿Qué título habilitante hacía falta para ampliar con una segunda planta?", ["Licencia urbanística", "Comunicación previa", "Ninguno"], "Ordenanza, arts. 31 bis y 34."],
        [S3, "media", "Exceder en más del 10 % la altura máxima es una infracción…", ["Grave", "Leve", "Muy grave"], "TR, art. 278.c).3ª."],
        [S3, "media", "¿Qué multa corresponde a una infracción grave?", ["De 6.000,01 a 60.000 euros", "De 600 a 6.000 euros", "De 60.000,01 a 300.000 euros"], "Art. 278."],
        [S2, "media", "Si la ampliación no es legalizable, ¿qué decretará el Alcalde?", ["Su demolición a costa del interesado", "Nada", "Una multa simbólica"], "Art. 268.1.a)."],
        [S3, "media", "Si el propietario siguiera trabajando tras la orden de paralización, cometería…", ["Una infracción grave", "Una leve", "Nada"], "Art. 278.h)."],
        [S1, "media", "¿Pueden los inspectores pedir la colaboración de la Policía Local?", ["Sí", "No", "Solo con juez"], "Art. 265.1."],
        [S3, "dificil", "¿Quién impondría la sanción por esta infracción grave?", ["El Ayuntamiento Pleno", "El Alcalde", "La comarca siempre"], "Art. 285.1."],
        [S3, "media", "Además de la multa, ¿qué debe exigirse?", ["Restaurar el orden urbanístico y reponer los bienes", "Nada", "Un curso"], "Art. 283.1."],
      ],
    },
    {
      slug: "caso-valla-andamio-acera",
      titulo: "Una valla y un andamio en la acera",
      supuesto: "En una calle del Actur, una empresa rehabilita una fachada. La valla de obra se adelanta 4 metros desde la fachada y deja solo 80 cm de acera libre. En el andamio hay materiales que pueden caer, y junto al portal se acumulan sacos de escombro en la vía pública sin autorización.",
      preguntas: [
        [S5, "media", "¿Qué título habilitante necesita la ocupación de la acera con vallas de obra?", ["Declaración responsable", "Ninguno", "Comunicación previa"], "Ordenanza, art. 58.2.e)."],
        [S5, "media", "¿Cuánto puede adelantarse como máximo la valla?", ["3 metros desde la fachada", "5 metros", "Sin límite"], "Art. 58.2.e).2ª."],
        [S5, "media", "¿Qué anchura libre mínima de acera debe quedar?", ["1,20 metros", "80 centímetros", "50 centímetros"], "Art. 58.2.e).2ª."],
        [S5, "media", "¿Cómo deben montarse los andamios?", ["Según la normativa de seguridad en el trabajo, garantizando el paso seguro de peatones y vehículos de emergencia", "Libremente", "Sin requisito alguno"], "Art. 58.2.f)."],
        [S5, "media", "¿Pueden dejarse materiales en la vía pública sin autorización?", ["No, si entorpecen el tránsito", "Sí", "Solo de día"], "Art. 54.4."],
        [S5, "media", "Excederse de lo declarado se considera…", ["Infracción urbanística", "Correcto", "Mera irregularidad"], "Art. 53.6."],
        [S5, "media", "¿Debe la empresa tener a disposición del personal municipal la declaración responsable?", ["Sí", "No", "Solo el arquitecto"], "Art. 53.5."],
        [S5, "dificil", "Si la declaración contiene una falsedad esencial, ¿qué puede ocurrir?", ["Imposibilidad de continuar y de presentar otra con el mismo objeto durante al menos un año", "Nada", "Se archiva"], "Art. 53.3."],
        [S5, "media", "¿En qué plazo puede el Ayuntamiento declarar que no puede continuar una actuación contraria a la norma?", ["Diez días hábiles desde la presentación", "Un año", "Seis meses"], "Art. 55.3.c)."],
        [S5, "media", "¿Quién debe reparar los desperfectos que la obra cause en la vía pública?", ["El que ejecuta las obras", "El Ayuntamiento", "Nadie"], "Art. 54.3."],
      ],
    },
    {
      slug: "caso-licencia-caducada-traspaso",
      titulo: "Una licencia caducada y un cambio de dueño",
      supuesto: "Un promotor obtuvo licencia para un edificio en Delicias hace tres años, pero nunca empezó las obras ni pidió prórroga. Ahora ha vendido el solar a otra empresa, sin comunicarlo al Ayuntamiento, y la nueva empresa empieza a trabajar sin que el director facultativo haya aceptado el encargo.",
      preguntas: [
        [S4, "media", "¿En qué plazo debían iniciarse las obras, con carácter general?", ["Un año desde la notificación de la licencia", "Cinco años", "Un mes"], "Ordenanza, art. 43."],
        [S4, "media", "Al no iniciarse en plazo sin causa justificada, la licencia…", ["Puede ser declarada caducada", "Sigue siempre vigente", "Se prorroga sola"], "Art. 45.1.a)."],
        [S4, "media", "¿Cómo se declara la caducidad?", ["De forma expresa, por procedimiento contradictorio con audiencia", "Automáticamente", "Por la Policía Local"], "Art. 45.3."],
        [S4, "media", "¿Qué efecto tiene la caducidad?", ["No pueden ejecutarse las obras salvo trabajos de seguridad y mantenimiento", "Ninguno", "Se puede construir el doble"], "Art. 45.4."],
        [S4, "media", "Al no comunicar la transmisión, ¿quién responde?", ["Ambas empresas, solidariamente", "Solo la antigua", "Ninguna"], "Art. 46.1."],
        [S4, "media", "¿Podía empezar la obra sin aceptación del director facultativo?", ["No; debe suspenderse", "Sí", "Solo una semana"], "Art. 47.2-3."],
        [S2, "media", "Si se construye con la licencia caducada, ¿qué puede hacer el Alcalde?", ["Ordenar la paralización por falta de título habilitante", "Nada", "Felicitar al promotor"], "TR, art. 268.1."],
        [S4, "media", "¿Cuántas prórrogas podría haber pedido el promotor?", ["Hasta dos, con causa justificada y antes del vencimiento", "Ninguna", "Diez"], "Art. 44."],
        [S3, "dificil", "¿Quiénes pueden ser responsables de una infracción en la edificación?", ["El promotor, el constructor y los técnicos directores, entre otros", "Solo el Ayuntamiento", "Solo los vecinos"], "TR, art. 280.1."],
        [S4, "media", "¿Con qué planeamiento se otorgan las licencias?", ["Con el vigente en el momento de la resolución", "Con el de hace diez años", "Con el que elija el promotor"], "Art. 36.1."],
      ],
    },
  ],
});
