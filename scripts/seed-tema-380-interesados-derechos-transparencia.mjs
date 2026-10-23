/**
 * Crea tema-380 — Tema 8 de Administrativo DGA (tema 3 del programa de
 * materias específicas): "Los interesados en el procedimiento
 * administrativo. El ciudadano y la Administración: derechos y deberes de
 * los ciudadanos. Colaboración y comparecencia de los ciudadanos. Derecho
 * de acceso a la información pública. La transparencia de las
 * Administraciones Públicas. Los servicios de información administrativa y
 * asistencia al ciudadano."
 *
 * Fuentes (textos consolidados leídos en esta sesión en la API del BOE):
 * - Ley 39/2015 (BOE-A-2015-10565): arts. 3-8 (capacidad, interesado,
 *   representación, apoderamientos), 12-14 (asistencia, derechos de las
 *   personas, relación electrónica), 16.4 (lugares de presentación), 18-19
 *   (colaboración y comparecencia) y 53 (derechos del interesado).
 * - Ley 19/2013, de transparencia (BOE-A-2013-12887): arts. 5-8 (publicidad
 *   activa), 12-20, 22 y 24 (derecho de acceso y reclamación).
 * - Ley 8/2015, de Transparencia de la Actividad Pública y Participación
 *   Ciudadana de Aragón (BOE-A-2015-5332): arts. 25-41. El art. 31.2
 *   (silencio positivo en el acceso) fue declarado inconstitucional y nulo
 *   por la STC 104/2018 (BOE-A-2018-15008): rige el silencio negativo del
 *   art. 20.4 de la Ley 19/2013.
 * - Real Decreto 208/1996, servicios de información administrativa y
 *   atención al ciudadano (BOE-A-1996-4997): arts. 1-4 (información general
 *   y particular, funciones de atención). Es norma de la Administración
 *   General del Estado, cuyo enunciado reproduce el programa; se usa por sus
 *   conceptos.
 * Laguna señalada: no se ha localizado en esta sesión un decreto aragonés
 * vigente específico sobre los servicios de información administrativa
 * (en aragon.es la red de oficinas de información y registro depende del
 * Servicio de Información y Documentación Administrativa, pero no se ha
 * encontrado su norma reguladora); el tema no inventa su contenido y se
 * apoya en la Ley 39/2015 (arts. 12 y 16) y en el RD 208/1996.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-380-interesados-derechos-transparencia.mjs
 */
import { sembrarTema, ADMIN_DGA } from "./lib/sembrar-tema.mjs";

const L39 = "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565";
const L19 = "https://www.boe.es/buscar/act.php?id=BOE-A-2013-12887";
const LTA = "https://www.boe.es/buscar/act.php?id=BOE-A-2015-5332";
const RD208 = "https://www.boe.es/buscar/act.php?id=BOE-A-1996-4997";
const S1 = "interesados-capacidad-representacion";
const S2 = "derechos-ciudadanos-interesados";
const S3 = "colaboracion-comparecencia";
const S4 = "derecho-acceso-informacion-publica";
const S5 = "transparencia-publicidad-activa-aragon";
const S6 = "servicios-informacion-asistencia";

await sembrarTema({
  tema: {
    slug: "tema-380",
    titulo: "Los interesados, derechos y deberes de los ciudadanos, acceso a la información pública, transparencia y servicios de información administrativa",
    descripcion: "Capacidad de obrar, concepto de interesado, representación, registros de apoderamientos y pluralidad de interesados (Ley 39/2015). Derechos de las personas y de los interesados; derecho y obligación de relacionarse electrónicamente. Colaboración y comparecencia. Derecho de acceso a la información pública: límites, protección de datos, solicitud, inadmisión, resolución y reclamación (Ley 19/2013 y Ley 8/2015 de Aragón; Consejo de Transparencia de Aragón). Publicidad activa y Portal de Transparencia. Servicios de información administrativa y asistencia: información general y particular, funciones de atención y oficinas de asistencia en materia de registros.",
    contenido: "Quién puede actuar ante la Administración y con qué derechos: cuándo se es interesado, cómo se nombra un representante, qué documentos no hay que volver a presentar y cuándo es obligatorio acudir a una oficina. Explica también cómo pedir información pública al Gobierno de Aragón, en qué plazos debe contestar, qué hacer si la deniega y qué información debe publicar por sí mismo, además de qué puede y qué no puede hacer una oficina de información al atender al público.",
    enlaces_boe: [
      { url: L39, titulo: "Ley 39/2015, del Procedimiento Administrativo Común (BOE-A-2015-10565)" },
      { url: L19, titulo: "Ley 19/2013, de transparencia, acceso a la información pública y buen gobierno (BOE-A-2013-12887)" },
      { url: LTA, titulo: "Ley 8/2015, de Transparencia de la Actividad Pública y Participación Ciudadana de Aragón (BOE-A-2015-5332)" },
      { url: RD208, titulo: "Real Decreto 208/1996, servicios de información administrativa y atención al ciudadano (BOE-A-1996-4997)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "Capacidad de obrar, interesados y representación", articulos: "arts. 3-8 Ley 39/2015", url: `${L39}#a3` },
      { seccion: S2, titulo: "Derechos de las personas y de los interesados", articulos: "arts. 12-14 y 53 Ley 39/2015", url: `${L39}#a13` },
      { seccion: S3, titulo: "Colaboración y comparecencia de las personas", articulos: "arts. 18-19 Ley 39/2015", url: `${L39}#a18` },
      { seccion: S4, titulo: "Derecho de acceso a la información pública", articulos: "arts. 12-24 Ley 19/2013; arts. 25-36 Ley 8/2015", url: `${L19}#a12` },
      { seccion: S5, titulo: "Publicidad activa, Portal y Consejo de Transparencia de Aragón", articulos: "arts. 5-8 Ley 19/2013; arts. 37-41 Ley 8/2015", url: `${LTA}#a37` },
      { seccion: S6, titulo: "Servicios de información administrativa y asistencia al ciudadano", articulos: "arts. 1-4 RD 208/1996; arts. 12 y 16.4 Ley 39/2015", url: `${RD208}#a1` },
    ],
  },
  vinculo: { oposicion: ADMIN_DGA.oposicion, bloqueId: ADMIN_DGA.bloqueDerecho, numero: 8 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Capacidad de obrar ante la Administración (art. 3 Ley 39/2015)", "Personas con capacidad según el Derecho civil; menores para los derechos que pueden ejercer sin asistencia; y, si una ley lo declara, grupos de afectados, uniones sin personalidad y patrimonios autónomos"],
        ["Interesados (art. 4.1 Ley 39/2015)", "Quienes promueven el procedimiento como titulares de derechos o intereses legítimos; quienes tienen derechos que pueden resultar afectados; y quienes tienen intereses legítimos afectados y se personan antes de la resolución definitiva"],
        ["Sucesión en la condición de interesado (art. 4.3)", "Si deriva de una relación jurídica transmisible, el derechohabiente sucede en ella cualquiera que sea el estado del procedimiento"],
        ["Cuándo hay que acreditar la representación (art. 5.3)", "Para formular solicitudes, presentar declaraciones responsables o comunicaciones, interponer recursos, desistir y renunciar; para los actos de mero trámite se presume"],
        ["Falta de acreditación de la representación (art. 5.6)", "No impide tener por realizado el acto si se subsana en 10 días (o plazo superior si las circunstancias lo requieren)"],
        ["Apoderamiento apud acta (art. 6.5)", "Por comparecencia electrónica en la sede con firma electrónica o por comparecencia personal en las oficinas de asistencia en materia de registros"],
        ["Validez de los poderes inscritos (art. 6.6)", "Máximo de cinco años desde la inscripción; el poderdante puede revocarlos o prorrogarlos antes (prórrogas también de hasta cinco años)"],
        ["Pluralidad de interesados (art. 7)", "Las actuaciones se hacen con el representante o interesado señalado expresamente y, en su defecto, con el que figure en primer término"],
        ["Nuevos interesados (art. 8)", "Si en un procedimiento sin publicidad aparecen titulares de derechos o intereses legítimos y directos identificables en el expediente, se les comunica la tramitación"],
      ],
      preguntas: [
        ["media", "Según el art. 4 de la Ley 39/2015, quien tiene un interés legítimo que puede verse afectado por la resolución es interesado:", ["Si se persona en el procedimiento mientras no haya recaído resolución definitiva", "Siempre, aunque no se persone", "Solo si inició el procedimiento", "Solo si es persona jurídica"], "Art. 4.1.c) Ley 39/2015."],
        ["media", "¿Para cuál de estas actuaciones se presume la representación?", ["Para los actos y gestiones de mero trámite", "Para interponer un recurso", "Para desistir de una solicitud", "Para renunciar a un derecho"], "Art. 5.3 Ley 39/2015."],
        ["media", "Si la representación no se acredita suficientemente, el órgano debe conceder para subsanarlo un plazo de:", ["Diez días, o superior si las circunstancias lo requieren", "Cinco días improrrogables", "Quince días", "Un mes"], "Art. 5.6 Ley 39/2015."],
        ["media", "Los poderes inscritos en un registro electrónico de apoderamientos tienen una validez máxima de:", ["Cinco años desde la inscripción", "Dos años", "Diez años", "Indefinida"], "Art. 6.6 Ley 39/2015."],
        ["facil", "Si una solicitud la firman varios interesados sin designar a ninguno, las actuaciones se entienden con:", ["El que figure en primer término", "Todos ellos por separado", "El de mayor edad", "El que resida en Aragón"], "Art. 7 Ley 39/2015."],
        ["dificil", "Los menores de edad tienen capacidad de obrar ante la Administración:", ["Para los derechos e intereses cuya actuación permita el ordenamiento sin la asistencia de quien ejerza la patria potestad, tutela o curatela", "Nunca", "Desde los 14 años en todo caso", "Solo con autorización judicial"], "Art. 3.b) Ley 39/2015."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Derechos de las personas (art. 13 Ley 39/2015)", "Punto de Acceso General electrónico; asistencia en medios electrónicos; lenguas oficiales; acceso a la información pública; trato respetuoso; exigir responsabilidades; identificación y firma electrónica; protección de datos"],
        ["Derecho a conocer el estado del procedimiento (art. 53.1.a)", "Estado de tramitación, sentido del silencio, órgano competente y actos de trámite; acceder y obtener copia de los documentos"],
        ["No presentar originales (art. 53.1.c)", "Salvo que excepcionalmente lo exija la normativa; si hay que presentarlo, derecho a copia autenticada"],
        ["No presentar lo que ya tiene la Administración (art. 53.1.d)", "Datos y documentos no exigidos por las normas o que ya obren en poder de las Administraciones o hayan sido elaborados por ellas"],
        ["Alegaciones (art. 53.1.e)", "En cualquier fase anterior al trámite de audiencia; deben tenerse en cuenta al redactar la propuesta de resolución"],
        ["Derechos del presunto responsable (art. 53.2)", "Ser notificado de hechos, infracciones, posibles sanciones, instructor y autoridad competente; presunción de no existencia de responsabilidad"],
        ["Relación electrónica de las personas físicas (art. 14.1)", "Pueden elegir en todo momento el medio, salvo que estén obligadas a relacionarse electrónicamente"],
        ["Obligados a relacionarse electrónicamente (art. 14.2)", "Personas jurídicas, entidades sin personalidad, profesionales colegiados obligatorios en su actividad, sus representantes y los empleados públicos por razón de su condición"],
        ["Asistencia en medios electrónicos (art. 12)", "Las Administraciones asisten a quienes no están obligados; un funcionario habilitado puede identificar o firmar por el interesado con su consentimiento expreso"],
      ],
      preguntas: [
        ["media", "¿Cuál de estos sujetos está obligado a relacionarse electrónicamente con las Administraciones Públicas?", ["Una asociación con personalidad jurídica", "Una persona física jubilada", "Un estudiante de bachillerato", "Una persona física que solicita una beca"], "Art. 14.2.a) Ley 39/2015: personas jurídicas."],
        ["media", "Un interesado puede presentar alegaciones:", ["En cualquier momento del procedimiento anterior al trámite de audiencia", "Solo en el trámite de audiencia", "Solo en los diez primeros días", "Únicamente al recurrir"], "Art. 53.1.e) y art. 76 Ley 39/2015."],
        ["facil", "El derecho a no presentar documentos que ya obren en poder de las Administraciones está reconocido en:", ["El art. 53 de la Ley 39/2015, como derecho del interesado", "La Ley 19/2013", "El Estatuto Básico del Empleado Público", "El Código Civil"], "Art. 53.1.d) Ley 39/2015."],
        ["media", "¿Puede un funcionario firmar electrónicamente en nombre de un interesado que no dispone de medios?", ["Sí, si es un funcionario habilitado y el interesado se identifica y presta su consentimiento expreso", "No, nunca", "Sí, sin necesidad de consentimiento", "Solo si el interesado es una empresa"], "Art. 12.2 Ley 39/2015."],
        ["media", "En un procedimiento sancionador, el presunto responsable tiene derecho, entre otros, a:", ["La presunción de no existencia de responsabilidad administrativa mientras no se demuestre lo contrario", "Elegir al instructor", "No ser notificado hasta la resolución", "Un abogado de oficio pagado por la Administración"], "Art. 53.2.b) Ley 39/2015."],
        ["dificil", "Los empleados públicos están obligados a relacionarse electrónicamente con las Administraciones:", ["Para los trámites que realicen con ellas por razón de su condición de empleado público, en la forma que determine cada Administración", "En todos sus trámites personales", "Nunca", "Solo si son funcionarios de carrera"], "Art. 14.2.e) Ley 39/2015."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Deber de colaboración (art. 18.1 Ley 39/2015)", "Facilitar informes, inspecciones y otros actos de investigación que requiera la Administración, salvo que afecten al honor, la intimidad o datos confidenciales de terceros conocidos por servicios profesionales"],
        ["Identificar a otros interesados (art. 18.2)", "Quien conozca datos que permitan identificar a otros interesados que no han comparecido debe proporcionarlos a la Administración"],
        ["Entrada en domicilio (art. 18.3)", "Si la inspección requiere entrar en el domicilio, se estará al art. 100 (consentimiento o autorización judicial)"],
        ["Comparecencia obligatoria (art. 19.1)", "Solo cuando esté prevista en una norma con rango de ley, presencial o electrónicamente"],
        ["Contenido de la citación (art. 19.2)", "Lugar, fecha, hora, medios disponibles, objeto de la comparecencia y efectos de no atenderla"],
        ["Certificado de comparecencia (art. 19.3)", "La Administración lo entrega al interesado si lo solicita"],
      ],
      preguntas: [
        ["media", "La comparecencia de las personas ante las oficinas públicas solo es obligatoria cuando:", ["Así esté previsto en una norma con rango de ley", "Lo decida el instructor", "Lo establezca una orden del consejero", "El interesado no se relacione electrónicamente"], "Art. 19.1 Ley 39/2015."],
        ["media", "¿Qué debe constar en la citación para comparecer?", ["Lugar, fecha, hora, medios disponibles, objeto y efectos de no atenderla", "Solo la fecha", "La sanción por no acudir, en todo caso", "El nombre del abogado del interesado"], "Art. 19.2 Ley 39/2015."],
        ["dificil", "El deber de colaborar con la Administración cede cuando la información solicitada:", ["Atentara contra el honor o la intimidad personal o familiar", "Fuera costosa de obtener", "Se pidiera por teléfono", "Afectara a una empresa"], "Art. 18.1 Ley 39/2015."],
        ["facil", "Quien haya comparecido puede obtener de la Administración:", ["Una certificación acreditativa de la comparecencia, si la solicita", "Una indemnización", "La suspensión del procedimiento", "Copia de todo el expediente sin más"], "Art. 19.3 Ley 39/2015."],
        ["media", "Un interesado que conoce los datos de otro interesado que no ha comparecido:", ["Tiene el deber de proporcionarlos a la Administración", "No puede revelarlos en ningún caso", "Solo debe darlos si se le paga", "Debe comunicarlos al Justicia de Aragón"], "Art. 18.2 Ley 39/2015."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Derecho de acceso (art. 12 Ley 19/2013)", "Todas las personas tienen derecho a acceder a la información pública, en los términos del art. 105.b) CE"],
        ["Información pública (art. 13 Ley 19/2013)", "Contenidos o documentos, en cualquier formato, en poder de los sujetos obligados, elaborados o adquiridos en el ejercicio de sus funciones"],
        ["Menores y acceso en Aragón (art. 25.2 Ley 8/2015)", "Pueden ejercer el derecho de acceso a partir de los 14 años"],
        ["Motivación de la solicitud (art. 17.3 Ley 19/2013)", "No es obligatoria; la falta de motivación no es por sí sola causa de rechazo"],
        ["Límites (art. 14 Ley 19/2013)", "Perjuicio a seguridad nacional, defensa, relaciones exteriores, seguridad pública, ilícitos, igualdad procesal, inspección, intereses económicos, política económica, secreto profesional, confidencialidad decisoria y medio ambiente; aplicación justificada y proporcionada"],
        ["Acceso parcial (art. 16)", "Si un límite no afecta a toda la información, se da el resto omitiendo lo afectado e indicándolo, salvo que quede distorsionada o sin sentido"],
        ["Causas de inadmisión (art. 18 Ley 19/2013)", "Información en elaboración, auxiliar o de apoyo, que requiera reelaboración, dirigida a órgano que no la tiene y desconoce el competente, o manifiestamente repetitiva o abusiva"],
        ["Plazo de resolución (art. 20.1 Ley 19/2013 y art. 31 Ley 8/2015)", "Un mes desde la recepción por el órgano competente, ampliable otro mes por volumen o complejidad; en Aragón, la inadmisión se notifica en 20 días"],
        ["Silencio en el acceso (art. 20.4 Ley 19/2013)", "Pasado el plazo sin resolución, la solicitud se entiende desestimada (el silencio positivo aragonés del art. 31.2 Ley 8/2015 fue anulado por la STC 104/2018)"],
        ["Alegaciones de terceros (art. 19.3 Ley 19/2013)", "Si la información puede afectar a terceros identificados, se les dan 15 días para alegar y se suspende el plazo para resolver"],
        ["Reclamación ante el Consejo de Transparencia de Aragón (art. 36 Ley 8/2015)", "Potestativa y previa al contencioso; plazo de un mes; el Consejo resuelve en tres meses (silencio desestimatorio)"],
        ["Gratuidad (art. 22.4 Ley 19/2013 y art. 33.3 Ley 8/2015)", "El acceso es gratuito; las copias o cambios de formato pueden someterse a tasas o precios"],
      ],
      preguntas: [
        ["media", "¿Debe motivarse la solicitud de acceso a la información pública?", ["No; el solicitante puede exponer sus motivos, pero la falta de motivación no es causa de rechazo", "Sí, siempre", "Solo si la pide una persona jurídica", "Solo en Aragón"], "Art. 17.3 Ley 19/2013 y art. 25.3 Ley 8/2015."],
        ["media", "En Aragón, ¿a partir de qué edad pueden los menores ejercer el derecho de acceso a la información pública?", ["14 años", "16 años", "12 años", "18 años"], "Art. 25.2 Ley 8/2015."],
        ["media", "El plazo máximo para resolver una solicitud de acceso es de:", ["Un mes, ampliable por otro mes por volumen o complejidad", "Tres meses", "Quince días hábiles", "Dos meses improrrogables"], "Art. 20.1 Ley 19/2013 y art. 31.1 Ley 8/2015."],
        ["dificil", "Si el Gobierno de Aragón no resuelve en plazo una solicitud de acceso, se entiende:", ["Desestimada, porque el silencio positivo de la ley aragonesa fue anulado por el Tribunal Constitucional", "Estimada, según la Ley 8/2015", "Inadmitida", "Archivada por caducidad"], "Art. 20.4 Ley 19/2013; STC 104/2018 sobre el art. 31.2 Ley 8/2015."],
        ["media", "¿Cuál es causa de inadmisión de una solicitud de acceso?", ["Que la información requiera una acción previa de reelaboración", "Que el solicitante no la motive", "Que afecte a datos meramente identificativos de un alto cargo", "Que el solicitante sea extranjero"], "Art. 18.1.c) Ley 19/2013. En Aragón no es reelaboración lo que se obtiene con un tratamiento informatizado corriente (art. 30.1.c Ley 8/2015)."],
        ["media", "La reclamación ante el Consejo de Transparencia de Aragón:", ["Es potestativa y previa al recurso contencioso-administrativo, en el plazo de un mes", "Es obligatoria antes de ir a los tribunales", "Se presenta en el plazo de tres meses", "Sustituye al recurso contencioso"], "Art. 36.1-2 Ley 8/2015."],
        ["dificil", "Contra las resoluciones de acceso dictadas por el Justicia de Aragón o la Cámara de Cuentas:", ["Solo cabe recurso contencioso-administrativo", "Cabe reclamación ante el Consejo de Transparencia", "Cabe recurso de alzada ante las Cortes", "No cabe recurso alguno"], "Art. 32.6 Ley 8/2015."],
        ["media", "Si la información solicitada puede afectar a derechos de terceros identificados, se les concede para alegar un plazo de:", ["Quince días, suspendiendo el plazo para resolver", "Diez días, sin suspensión", "Un mes", "Cinco días"], "Art. 19.3 Ley 19/2013."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["Publicidad activa (art. 5 Ley 19/2013)", "Publicación periódica y actualizada, por iniciativa propia, de la información relevante para la transparencia, de forma clara, estructurada y preferiblemente reutilizable"],
        ["Información institucional y organizativa (art. 6)", "Funciones, normativa aplicable, estructura y organigrama; planes y programas con su grado de cumplimiento"],
        ["Información de relevancia jurídica (art. 7)", "Directrices, instrucciones y circulares que interpreten el Derecho; anteproyectos y proyectos normativos y sus memorias; documentos sometidos a información pública"],
        ["Información económica (art. 8)", "Contratos, convenios y encomiendas, subvenciones, presupuestos y su ejecución, cuentas anuales, retribuciones de altos cargos, compatibilidades e inmuebles"],
        ["Portal de Transparencia del Gobierno de Aragón (art. 39 Ley 8/2015)", "Canal donde la Administración autonómica publica la información de publicidad activa; se accede desde la sede electrónica y en él se presentan las solicitudes de acceso"],
        ["Unidades de Transparencia (art. 40 Ley 8/2015)", "Una en cada departamento, dependiente de la secretaría general técnica: elaboran la información, tramitan las solicitudes de acceso y llevan su registro"],
        ["Consejo de Transparencia de Aragón (art. 37 Ley 8/2015)", "Órgano con independencia orgánica y funcional, adscrito al departamento competente en transparencia, que vela por la publicidad activa y resuelve las reclamaciones de acceso"],
        ["Incumplimiento reiterado (art. 41.3 Ley 8/2015)", "Se considera infracción grave a efectos del régimen disciplinario de los responsables"],
      ],
      preguntas: [
        ["media", "En la Administración de la Comunidad Autónoma de Aragón, las Unidades de Transparencia dependen orgánicamente de:", ["La secretaría general técnica de cada departamento", "El Consejo de Transparencia", "El Justicia de Aragón", "La Intervención General"], "Art. 40.1 Ley 8/2015."],
        ["media", "El Consejo de Transparencia de Aragón:", ["Actúa con independencia orgánica y funcional y conoce de las reclamaciones en materia de acceso", "Es un órgano jerárquicamente dependiente del consejero de Hacienda", "Es una sala del Tribunal Superior de Justicia", "Solo emite informes no vinculantes"], "Art. 37 Ley 8/2015."],
        ["facil", "La publicación por iniciativa propia de la información sobre contratos, subvenciones o presupuestos se denomina:", ["Publicidad activa", "Derecho de acceso", "Información particular", "Reutilización"], "Arts. 5 y 8 Ley 19/2013."],
        ["media", "¿Cuál de estas informaciones es de relevancia jurídica según el art. 7 de la Ley 19/2013?", ["Las circulares que supongan una interpretación del Derecho", "Las retribuciones de los altos cargos", "Los contratos adjudicados", "El organigrama"], "Art. 7.a) Ley 19/2013."],
        ["dificil", "En el ámbito de la Administración de la Comunidad Autónoma, las solicitudes electrónicas de acceso a la información se presentan en:", ["El Portal de Transparencia del Gobierno de Aragón", "La sede del Consejo de Transparencia y Buen Gobierno estatal", "El Registro de las Cortes de Aragón", "El tablón de anuncios del departamento"], "Art. 28.3 Ley 8/2015."],
        ["media", "El incumplimiento reiterado de las obligaciones de transparencia por los sujetos obligados:", ["Tiene la consideración de infracción grave a efectos disciplinarios", "Es una falta leve", "No tiene consecuencias", "Es un delito"], "Art. 41.3 Ley 8/2015."],
      ],
    },
    {
      seccion: S6,
      flashcards: [
        ["Información administrativa (art. 1 RD 208/1996)", "Cauce para que los ciudadanos conozcan sus derechos y obligaciones y accedan a los bienes y servicios públicos; puede ser general o particular"],
        ["Información general (art. 2 RD 208/1996)", "Identificación, fines, estructura y localización de órganos; requisitos de solicitudes; tramitación; servicios y prestaciones. Se facilita sin exigir legitimación"],
        ["Información particular (art. 3 RD 208/1996)", "Estado o contenido de procedimientos en tramitación e identificación del personal responsable; solo para los interesados o sus representantes"],
        ["Funciones de atención al ciudadano (art. 4 RD 208/1996)", "Recepción y acogida; orientación e información; gestión; recepción de iniciativas y sugerencias; recepción de quejas y reclamaciones; asistencia en el derecho de petición"],
        ["Límite de la orientación (art. 4.b RD 208/1996)", "No puede entrañar una interpretación normativa ni una consideración jurídica o económica: solo aclarar conceptos, opciones legales o ayudar a cumplimentar impresos"],
        ["Información y orientación como derecho (art. 53.1.f Ley 39/2015)", "Los interesados tienen derecho a obtener información y orientación sobre los requisitos jurídicos o técnicos de sus proyectos o solicitudes"],
        ["Lugares de presentación de documentos (art. 16.4 Ley 39/2015)", "Registros electrónicos de cualquier Administración, oficinas de Correos, representaciones diplomáticas y consulares, oficinas de asistencia en materia de registros y los demás que establezcan las normas"],
        ["Oficinas de asistencia en materia de registros", "Asisten en el uso de medios electrónicos, digitalizan los documentos presentados en papel y permiten otorgar apoderamientos apud acta (arts. 6, 12 y 16 Ley 39/2015)"],
      ],
      preguntas: [
        ["media", "Según el RD 208/1996, la información sobre el estado de un procedimiento en tramitación es información:", ["Particular, y solo puede darse a los interesados o a sus representantes", "General, y se da a cualquiera", "Reservada, que no puede darse nunca", "Publicidad activa"], "Art. 3 RD 208/1996."],
        ["media", "La información general se facilita:", ["Obligatoriamente y sin exigir acreditación de legitimación", "Solo a los interesados", "Previo pago de una tasa", "Solo por escrito"], "Art. 2.2 RD 208/1996."],
        ["dificil", "Al orientar a un ciudadano, el personal de una oficina de información NO puede:", ["Hacer una interpretación normativa o una consideración jurídica o económica del caso", "Ayudarle a rellenar un impreso", "Indicarle las opciones legales existentes", "Explicarle qué documentación necesita"], "Art. 4.b) RD 208/1996."],
        ["media", "¿En cuál de estos lugares NO pueden presentarse documentos dirigidos al Gobierno de Aragón según el art. 16.4 de la Ley 39/2015?", ["En la sede de un partido político", "En el registro electrónico de un ayuntamiento", "En una oficina de Correos", "En un consulado de España en el extranjero"], "Art. 16.4 Ley 39/2015."],
        ["media", "Los documentos presentados en papel en una oficina de asistencia en materia de registros:", ["Se digitalizan para el expediente electrónico y se devuelven los originales, salvo excepciones", "Se archivan en papel y no se devuelven", "Se remiten por correo postal al órgano destinatario", "Se destruyen tras escanearlos"], "Art. 16.5 Ley 39/2015."],
        ["facil", "Recibir quejas por tardanzas o desatenciones es una función de:", ["Atención al ciudadano", "Inspección de tributos", "Control externo", "Asesoría jurídica"], "Art. 4.e) RD 208/1996."],
      ],
    },
  ],
  glosario: [
    [S1, "Interés legítimo", "Situación en la que una persona obtendría un beneficio o evitaría un perjuicio concreto con la resolución del procedimiento, aunque no sea titular de un derecho subjetivo."],
    [S1, "Apoderamiento apud acta", "Poder que el interesado otorga ante la propia Administración, por comparecencia personal o electrónica, para que otra persona le represente."],
    [S1, "Bastanteo", "Comprobación de que un poder es suficiente para la actuación concreta que se pretende realizar en nombre de otro."],
    [S2, "Punto de Acceso General electrónico", "Portal a través del cual las personas pueden comunicarse electrónicamente con una Administración y consultar el estado de sus procedimientos."],
    [S3, "Comparecencia", "Presentación de una persona ante una oficina pública, en persona o por medios electrónicos, cuando una ley lo exige."],
    [S4, "Reelaboración", "Elaboración de información nueva a partir de datos dispersos, que no está obligada a hacer la Administración para atender una solicitud de acceso."],
    [S4, "Disociación de datos", "Tratamiento que impide identificar a las personas a las que se refieren los datos personales contenidos en la información."],
    [S5, "Publicidad activa", "Obligación de publicar por iniciativa propia, sin que nadie lo pida, determinada información pública en sedes electrónicas o portales."],
    [S5, "Portal de Transparencia", "Sitio web del Gobierno de Aragón que reúne la información de publicidad activa y permite solicitar el acceso a la información pública."],
    [S6, "Información general", "La que cualquier persona puede obtener sobre organización, servicios y requisitos de los trámites sin acreditar ningún interés."],
    [S6, "Oficina de asistencia en materia de registros", "Oficina presencial donde se registran documentos, se digitalizan los presentados en papel y se ayuda a relacionarse electrónicamente con la Administración."],
  ],
  casos: [
    {
      slug: "solicitud-acceso-contratos-departamento",
      titulo: "Una periodista pide datos de contratos",
      supuesto: "Una periodista de 25 años presenta en el Portal de Transparencia del Gobierno de Aragón una solicitud para conocer los contratos menores de un departamento en 2025, sin explicar para qué la quiere. Algunos documentos contienen datos de empresas que podrían verse perjudicadas. Pasa el plazo y la Administración no contesta.",
      preguntas: [
        [S4, "facil", "¿Es válida la solicitud aunque no se motive?", ["Sí, no es necesario motivar la solicitud", "No, debe motivarse siempre", "Solo si acredita ser periodista", "Solo si paga una tasa"], "Art. 17.3 Ley 19/2013 y art. 25.3 Ley 8/2015."],
        [S4, "media", "Dentro de los diez días siguientes a la entrada de la solicitud, el órgano debe comunicarle, entre otras cosas:", ["La fecha de recepción, el plazo máximo para resolver y los efectos del silencio", "La resolución definitiva", "El coste de las copias", "El nombre del Consejero"], "Art. 29 Ley 8/2015."],
        [S4, "media", "Como la información puede afectar a empresas identificadas, se les dará trámite de alegaciones durante:", ["Quince días, con suspensión del plazo para resolver", "Diez días, sin suspensión", "Un mes, sin suspensión", "Tres días"], "Art. 19.3 Ley 19/2013."],
        [S4, "media", "El plazo para resolver es de un mes, ampliable por otro mes:", ["Por el volumen o la complejidad de la información, notificándolo a la solicitante", "A voluntad del órgano", "Si la periodista no lo motiva", "Solo en agosto"], "Art. 20.1 Ley 19/2013 y art. 31.1 Ley 8/2015."],
        [S4, "dificil", "Pasado el plazo sin respuesta, la solicitud se entiende:", ["Desestimada", "Estimada", "Caducada", "Inadmitida"], "Art. 20.4 Ley 19/2013; el silencio positivo del art. 31.2 Ley 8/2015 fue anulado por la STC 104/2018."],
        [S4, "media", "Frente a ese silencio, la periodista puede presentar una reclamación ante:", ["El Consejo de Transparencia de Aragón, en un mes, con carácter potestativo", "El Consejo Consultivo de Aragón", "El Defensor del Pueblo, como paso obligatorio", "La Cámara de Cuentas"], "Art. 36 Ley 8/2015."],
        [S4, "media", "Si opta por no reclamar ante el Consejo, puede acudir directamente a:", ["La jurisdicción contencioso-administrativa", "El Tribunal Constitucional", "La jurisdicción civil", "Las Cortes de Aragón"], "Art. 32.5 Ley 8/2015 y art. 20.5 Ley 19/2013."],
        [S4, "media", "Si finalmente se concede el acceso, la consulta de la información será:", ["Gratuita, aunque las copias o cambios de formato pueden tener un coste", "Siempre de pago", "Gratuita solo para periodistas", "De pago si se pide en papel o electrónicamente"], "Art. 22.4 Ley 19/2013 y art. 33.3 Ley 8/2015."],
        [S5, "media", "Parte de lo que pide (contratos adjudicados) ya debería estar publicado. Si es así, la resolución puede:", ["Limitarse a indicarle cómo acceder a la información publicada", "Inadmitir la solicitud por abusiva", "Exigirle una tasa", "Remitirla al BOE"], "Art. 22.3 Ley 19/2013; publicidad activa de contratos en el art. 8.1.a)."],
        [S5, "media", "¿Qué unidad del departamento tramitará internamente la solicitud?", ["La Unidad de Transparencia, dependiente de la secretaría general técnica", "La Intervención Delegada", "El Servicio de Personal", "El gabinete del consejero"], "Art. 40 Ley 8/2015."],
      ],
    },
    {
      slug: "gestoria-representa-empresa",
      titulo: "Una gestoría que representa a una empresa",
      supuesto: "Una gestoría tramita ante un departamento del Gobierno de Aragón la solicitud de una autorización para una sociedad limitada. Presenta la solicitud en papel en una oficina de asistencia en materia de registros, sin aportar el poder de representación, y adjunta fotocopias de documentos que la Administración ya tiene. Durante la tramitación aparece un vecino al que la autorización podría afectar.",
      preguntas: [
        [S2, "media", "Como la solicitante es una sociedad limitada, la presentación:", ["Debió hacerse por medios electrónicos, porque las personas jurídicas están obligadas", "Es correcta en papel", "Solo puede hacerse en el BOA", "Debe hacerla el administrador en persona"], "Art. 14.2.a) Ley 39/2015."],
        [S2, "dificil", "En ese caso, ¿qué hará la Administración con la solicitud presentada en papel?", ["Requerir que se subsane mediante su presentación electrónica; la fecha de presentación será la de la subsanación", "Tramitarla igualmente con la fecha del papel", "Archivarla sin más", "Imponer una sanción"], "Art. 68.4 Ley 39/2015."],
        [S1, "media", "Su representante, la gestoría, también está obligado a relacionarse electrónicamente porque:", ["Representa a un interesado obligado a hacerlo", "Es una gestoría", "Lo dice su colegio profesional", "No está obligado"], "Art. 14.2.d) Ley 39/2015."],
        [S1, "media", "Para formular la solicitud en nombre de la sociedad, la representación:", ["Debe acreditarse", "Se presume", "No es necesaria", "Solo debe acreditarse si se recurre"], "Art. 5.3 Ley 39/2015."],
        [S1, "media", "Si no la acredita, la Administración concederá un plazo para subsanarlo de:", ["Diez días (o más si las circunstancias lo requieren)", "Tres días", "Un mes", "No cabe subsanación"], "Art. 5.6 Ley 39/2015."],
        [S1, "media", "La representación puede acreditarse, entre otras formas, mediante:", ["Apoderamiento apud acta en la sede electrónica o inscripción en el registro electrónico de apoderamientos", "Una declaración verbal en ventanilla", "Una carta firmada por un vecino", "Un correo electrónico sin firma"], "Art. 5.4 Ley 39/2015."],
        [S2, "media", "Sobre los documentos que la Administración ya tiene, la sociedad:", ["Tiene derecho a no presentarlos", "Debe aportarlos siempre en original", "Debe pagar por su consulta", "Debe presentarlos compulsados notarialmente"], "Art. 53.1.d) Ley 39/2015."],
        [S1, "media", "Respecto del vecino al que puede afectar la autorización, si el procedimiento no ha tenido publicidad y su identidad resulta del expediente, la Administración:", ["Le comunicará la tramitación del procedimiento", "No debe hacer nada", "Debe suspender el procedimiento", "Debe denunciarle"], "Art. 8 Ley 39/2015."],
        [S1, "media", "Si el vecino se persona antes de la resolución definitiva alegando que la autorización perjudica sus intereses legítimos, será:", ["Interesado en el procedimiento", "Mero denunciante sin derechos", "Tercero sin derecho a audiencia", "Coadyuvante de la Administración"], "Art. 4.1.c) Ley 39/2015."],
        [S6, "facil", "La oficina donde se presentó el papel digitalizará los documentos y:", ["Devolverá los originales, salvo excepciones", "Se quedará con los originales", "Los destruirá", "Los enviará al BOE"], "Art. 16.5 Ley 39/2015."],
      ],
    },
    {
      slug: "ventanilla-informacion-atencion",
      titulo: "Un día en la ventanilla de información",
      supuesto: "En una oficina de información y registro del Gobierno de Aragón, una persona administrativa atiende a varias personas: una pregunta qué requisitos tiene una ayuda; otro quiere saber cómo va el expediente de su hermano; una tercera pide que le digan si su caso concreto encaja en la ley y cuánto dinero cobrará; y un cuarto quiere presentar una queja por la tardanza en contestarle.",
      preguntas: [
        [S6, "facil", "La información sobre los requisitos de la ayuda es información:", ["General, que se facilita sin exigir legitimación", "Particular, solo para interesados", "Reservada", "De publicidad activa exclusivamente"], "Art. 2 RD 208/1996."],
        [S6, "media", "Sobre el expediente del hermano, la persona administrativa:", ["Solo puede informar al interesado o a su representante", "Puede informar a cualquier familiar", "Debe informar a quien lo pida", "Debe remitirle al Consejo de Transparencia"], "Art. 3 RD 208/1996 y art. 53.1.a) Ley 39/2015."],
        [S6, "dificil", "A la tercera persona, que pide una valoración de su caso y de la cuantía, se le debe:", ["Orientar sin hacer interpretación normativa ni consideración jurídica o económica", "Dar un dictamen jurídico completo", "Garantizar por escrito el importe", "Negar cualquier información"], "Art. 4.b) RD 208/1996."],
        [S6, "media", "La queja por la tardanza es una de las funciones de atención al ciudadano relativa a:", ["La recepción de quejas y reclamaciones por tardanzas, desatenciones o actuaciones irregulares", "La gestión de recursos administrativos", "La inspección de servicios", "El control de legalidad"], "Art. 4.e) RD 208/1996."],
        [S2, "media", "Si un ciudadano no obligado a relacionarse electrónicamente pide ayuda para presentar una solicitud por internet, la oficina:", ["Debe asistirle en el uso de medios electrónicos", "Puede negarse", "Solo puede darle un folleto", "Debe cobrarle una tasa"], "Art. 12.2 Ley 39/2015."],
        [S2, "media", "Para que una funcionaria habilitada firme electrónicamente por él, el ciudadano debe:", ["Identificarse y prestar su consentimiento expreso", "Presentar un poder notarial", "Ser mayor de 65 años", "No necesita nada"], "Art. 12.2 Ley 39/2015."],
        [S2, "facil", "Todas estas personas tienen derecho a ser tratadas con respeto y deferencia por el personal, según:", ["El art. 13 de la Ley 39/2015", "El Código Civil", "La Ley de Contratos", "El Estatuto de Autonomía, art. 1"], "Art. 13.e) Ley 39/2015."],
        [S1, "media", "Uno de ellos quiere dejar apoderado a su hijo para todos sus trámites con el Gobierno de Aragón. Puede hacerlo:", ["Mediante apoderamiento apud acta por comparecencia personal en la oficina de asistencia en materia de registros", "Con una nota manuscrita", "Solo ante notario", "No puede, la representación está prohibida"], "Art. 6.5 Ley 39/2015."],
        [S1, "media", "Ese poder inscrito tendrá una validez máxima de:", ["Cinco años", "Un año", "Diez años", "Indefinida"], "Art. 6.6 Ley 39/2015."],
        [S3, "media", "Otro ciudadano trae una citación para comparecer en la oficina. Esa comparecencia solo puede ser obligatoria si:", ["Está prevista en una norma con rango de ley", "La firma el jefe de la oficina", "Lo pide un vecino", "Se envía por correo certificado"], "Art. 19.1 Ley 39/2015."],
      ],
    },
  ],
});
