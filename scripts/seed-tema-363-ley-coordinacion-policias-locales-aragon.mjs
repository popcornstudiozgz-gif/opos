/**
 * Crea tema-363 — Tema 36 de Policía Local: "Ley de Coordinación de
 * Policías Locales de Aragón y normativa de desarrollo."
 *
 * Fuentes:
 * - Ley 8/2013, de 12 de septiembre, de Coordinación de Policías Locales de
 *   Aragón (BOA núm. 188, de 24-09-2013; BOE-A-2013-11337, título
 *   verificado en la API de legislación consolidada, vigente), texto
 *   consolidado leído íntegro, con la modificación de la Ley 9/2018
 *   (BOE-A-2018-11934; art. 25 y DT 2.ª a 4.ª). Deroga la Ley 7/1987.
 * - Normativa de desarrollo, verificada por su título y contenido en
 *   fuentes secundarias que reproducen el BOA (La Administración al Día,
 *   INAP), sin acceso al texto íntegro del BOA en la sesión; por eso solo
 *   se recogen sus datos esenciales:
 *   · Decreto 222/1991, de 17 de diciembre, Reglamento Marco de
 *     Organización de las Policías Locales de Aragón (sigue vigente en lo
 *     no derogado).
 *   · Decreto 32/2019, de 26 de febrero, Registro de Policías Locales de
 *     Aragón (BOA núm. 45, de 6-03-2019), con el diseño del carné y la placa.
 *   · Decreto 92/2022, de 15 de junio, uniformidad y medios técnicos y de
 *     defensa (BOA de 24-06-2022): deroga el Decreto 121/1992 y el Cap. III
 *     del Decreto 222/1991.
 *   · Decreto 10/2023, de 8 de febrero, Academia Aragonesa de Policías
 *     Locales (BOA de 15-02-2023): suprime la altura mínima de ingreso del
 *     Decreto 222/1991.
 * Discrepancia señalada, no resuelta: el art. 24 fija una edad máxima de
 * ingreso de 35 años, pero las bases de la CONV 7.1/2026 de Zaragoza
 * (bases2106.pdf, base 2.1.1.b) exigen solo no exceder la edad de
 * jubilación forzosa. No se ha localizado la norma o resolución que lo
 * explique; se recogen ambos datos sin inventar la causa.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-363-ley-coordinacion-policias-locales-aragon.mjs
 */
import { sembrarTema, POLICIA } from "./lib/sembrar-tema.mjs";

const LEY = "https://www.boe.es/buscar/act.php?id=BOE-A-2013-11337";
const a = (ancla) => `${LEY}#${ancla}`;
const D92 = "https://laadministracionaldia.inap.es/noticia.asp?id=1223856";
const D10 = "https://laadministracionaldia.inap.es/noticia.asp?id=1230527";
const S1 = "coordinacion-organos";
const S2 = "naturaleza-principios-funciones";
const S3 = "organizacion-medios-tecnicos";
const S4 = "estructura-ingreso-movilidad";
const S5 = "derechos-deberes-condiciones";
const S6 = "normativa-desarrollo";

await sembrarTema({
  tema: {
    slug: "tema-363",
    titulo: "Ley 8/2013 de Coordinación de Policías Locales de Aragón y normativa de desarrollo",
    descripcion: "Objeto y ámbito; concepto y funciones de coordinación; Comisión de Coordinación, Registro de Policías Locales y Academia Aragonesa; naturaleza, régimen jurídico, ámbito territorial, principios y funciones de la Policía Local; obligación de Cuerpo en municipios de más de 10.000 habitantes, reglamento del Cuerpo y Jefe del Cuerpo; agrupaciones de municipios; uniformidad, identificación y armamento; escalas y categorías (Superior, Técnica y Ejecutiva); bases mínimas, requisitos de ingreso (18 a 35 años), sistemas de ingreso, movilidad y comisión de servicios; derechos, distinciones, deberes y régimen disciplinario; salud laboral y segunda actividad; reserva para militares; y decretos de desarrollo: Reglamento Marco (D. 222/1991), Registro (D. 32/2019), uniformidad y medios (D. 92/2022) y Academia (D. 10/2023).",
    contenido: "Recorre la ley aragonesa que coordina a todas las Policías Locales de Aragón, incluida la de Zaragoza: qué hace el Gobierno de Aragón (normas marco, formación, registro), qué funciones tiene la Policía Local, cuándo un municipio debe tener Cuerpo propio, cómo se nombra al Jefe, cuáles son las categorías (de Policía a Superintendente), los requisitos y sistemas de ingreso, la movilidad entre municipios, los derechos y deberes y el régimen disciplinario; y, de forma resumida, los decretos que la desarrollan.",
    enlaces_boe: [
      { url: LEY, titulo: "Ley 8/2013, de 12 de septiembre, de Coordinación de Policías Locales de Aragón (BOE-A-2013-11337)" },
      { url: "https://www.boe.es/buscar/act.php?id=BOE-A-2018-11934", titulo: "Ley 9/2018, de 28 de junio, de modificación de la Ley 8/2013 (BOE-A-2018-11934)" },
      { url: D92, titulo: "Decreto 92/2022, de 15 de junio, uniformidad y medios técnicos y de defensa de las Policías Locales de Aragón (reproducción INAP)" },
      { url: D10, titulo: "Decreto 10/2023, de 8 de febrero, Academia Aragonesa de Policías Locales (reproducción INAP)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "Título Preliminar y Título I: objeto, coordinación, Comisión, Registro y Academia", articulos: "arts. 1-9", url: a("a1") },
      { seccion: S2, titulo: "Título II, Cap. I: concepto, régimen jurídico, ámbito, principios y funciones", articulos: "arts. 10-14", url: a("a10") },
      { seccion: S3, titulo: "Título II, Caps. II y III: organización y medios técnicos", articulos: "arts. 15-20", url: a("a15") },
      { seccion: S4, titulo: "Título III, Caps. I y II: estructura, selección, ingreso y movilidad", articulos: "arts. 21-27", url: a("a21") },
      { seccion: S5, titulo: "Título III, Caps. III y IV y disposiciones: derechos, deberes, disciplina y condiciones de trabajo", articulos: "arts. 28-34 y DD. AA.", url: a("a28") },
      { seccion: S6, titulo: "Normativa de desarrollo: Decretos 222/1991, 32/2019, 92/2022 y 10/2023", articulos: "", url: D92 },
    ],
  },
  vinculo: { oposicion: POLICIA.oposicion, bloqueId: POLICIA.bloqueParte2, numero: 36 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Objeto (art. 1)", "Establecer los criterios de coordinación de las Policías Locales de Aragón, en desarrollo del art. 76.3 del Estatuto de Autonomía y con pleno respeto a la autonomía local"],
        ["Ámbito (art. 2)", "Las Policías Locales de los municipios aragoneses, sus funcionarios y los alumnos de los cursos selectivos de la Academia"],
        ["Concepto de coordinación (art. 3)", "Medidas para unificar criterios de organización, actuación, formación y uniformidad, homogeneizar medios y establecer información recíproca, asesoramiento y colaboración"],
        ["Algunas funciones de coordinación (art. 4.2)", "Normas marco de los reglamentos municipales, homologación de medios, uniformidad y armamento, homogeneización retributiva, bases mínimas de selección, formación y movilidad, Registro y red de transmisiones"],
        ["Comisión de Coordinación (art. 5)", "Órgano consultivo, deliberante y de participación; informa los proyectos de disposiciones y los reglamentos de los Cuerpos y propone mejoras"],
        ["Composición de la Comisión (art. 6)", "Preside el consejero competente; vicepresidente el director general; vocales: 2 del Gobierno de Aragón, 4 de municipios (uno del Ayuntamiento de Zaragoza), 4 de los sindicatos y 1 de los jefes; se reúne al menos dos veces al año"],
        ["Registro de los Policías Locales (art. 7)", "Censo informatizado e instrumento de identificación; inscripción obligatoria para todos los policías locales de Aragón"],
        ["Academia Aragonesa de Policías Locales (art. 8)", "Unidad administrativa sin personalidad jurídica, integrada en la Escuela de Seguridad Pública de Aragón, para la formación básica, perfeccionamiento, promoción y especialización y la participación en la selección"],
      ],
      preguntas: [
        ["facil", "¿En qué artículo del Estatuto de Autonomía de Aragón se apoya la Ley 8/2013?", ["Art. 76.3", "Art. 1", "Art. 149.1.29.ª"], "Art. 1."],
        ["media", "La Comisión de Coordinación de las Policías Locales de Aragón es un órgano…", ["Consultivo, deliberante y de participación", "Sancionador", "Judicial"], "Art. 5.1."],
        ["media", "¿Cuántos representantes de los municipios integran la Comisión y cuál está asegurado?", ["Cuatro, uno a propuesta del Ayuntamiento de Zaragoza", "Dos, ambos de Huesca", "Diez, uno por comarca"], "Art. 6.1.c)."],
        ["media", "La Comisión de Coordinación se reúne como mínimo…", ["Dos veces al año", "Una vez al mes", "Una vez cada cuatro años"], "Art. 6.4."],
        ["media", "¿Es obligatoria la inscripción en el Registro de los Policías Locales de Aragón?", ["Sí, para todos los policías locales", "No", "Solo para los jefes"], "Art. 7.2."],
        ["dificil", "La Academia Aragonesa de Policías Locales se integra en…", ["La Escuela de Seguridad Pública de Aragón", "La Universidad de Zaragoza", "El Ayuntamiento de Zaragoza"], "Art. 8.1."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Naturaleza (art. 10.1)", "Instituto armado de naturaleza civil, jerarquizado, bajo la jefatura y dependencia directa del alcalde"],
        ["Clasificación funcionarial (art. 10.2)", "Funcionarios de carrera de la Escala de Administración Especial, Subescala de Servicios Especiales, Clase de Funcionarios de Policía Local; agentes de la autoridad en el ejercicio de sus funciones"],
        ["Gestión directa (art. 10.4)", "El servicio lo presta directamente el municipio; no cabe gestión indirecta, contratación laboral ni personal interino"],
        ["Régimen jurídico (art. 11)", "LOFCS, esta ley, las normas marco del Gobierno de Aragón, los reglamentos municipales y las normas de régimen local y función pública"],
        ["Ámbito territorial (art. 12)", "Su municipio; fuera de él en emergencias o situaciones especiales con autorización del alcalde a solicitud del municipio que lo requiera, o en refuerzos por convenio bilateral en comisión de servicios, bajo el alcalde y el jefe del municipio de destino"],
        ["Principios (art. 13)", "Los de la LOFCS adaptados: respeto también al Estatuto de Aragón y no discriminación ampliada (etnia, ideología, orientación sexual…)"],
        ["Funciones propias de la ley aragonesa (art. 14.1)", "Además de las de la LOFCS, controlar el tráfico en vías urbanas, instruir atestados por accidentes y delitos contra la seguridad vial en vías urbanas, y policía medioambiental, urbanística, social o de atención a la marginación"],
        ["Comunicación a las FCSE (art. 14.2)", "Los atestados de tráfico y las diligencias de prevención se comunican a las FCS del Estado competentes"],
      ],
      preguntas: [
        ["media", "¿Puede un municipio aragonés prestar el servicio de Policía Local mediante personal interino?", ["No", "Sí", "Solo en verano"], "Art. 10.4."],
        ["media", "Según el art. 14, la Policía Local instruye atestados por…", ["Accidentes de circulación y delitos contra la seguridad vial en vías urbanas", "Cualquier delito", "Accidentes en autopistas"], "Art. 14.1.c)."],
        ["media", "Cuando actúan fuera de su municipio en un refuerzo, los policías locales dependen…", ["Del alcalde del municipio donde actúan y del jefe de su cuerpo", "De su alcalde de origen", "Del Gobierno de Aragón directamente"], "Art. 12.2."],
        ["media", "Los policías locales pertenecen a la Escala de…", ["Administración Especial, Subescala de Servicios Especiales", "Administración General", "Habilitación nacional"], "Art. 10.2."],
        ["dificil", "¿Qué funciones de policía especializada menciona expresamente el art. 14.1.j)?", ["Medioambiental, urbanística, social o de atención y denuncia de la marginación", "Aduanera y fiscal", "Militar"], "Art. 14.1.j)."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Obligación de Cuerpo (art. 15.1)", "En los municipios de más de 10.000 habitantes debe existir Cuerpo de Policía Local; los de 10.000 o menos pueden crearlo"],
        ["Cuerpo único (art. 15.3)", "En cada municipio, un Cuerpo único, aunque con especialidades"],
        ["Denominación (art. 15.5)", "«Policía Local de…» seguido del nombre oficial del municipio"],
        ["Reglamento del Cuerpo (art. 15.6-7)", "Cada municipio con Cuerpo aprueba su reglamento, ajustado a las normas marco, con unidades, empleos de mando, línea jerárquica, provisión de puestos y traslados; el alcalde desempeña la superior jefatura"],
        ["Jefe del Cuerpo (art. 16)", "Mando operativo bajo la autoridad directa del alcalde; lo nombra el alcalde por concurso-oposición libre, concurso entre policías de Aragón de igual o superior categoría o libre designación entre policías locales de cualquier comunidad"],
        ["Agrupaciones (art. 17)", "Dos o más municipios aragoneses limítrofes pueden asociarse para sostener personal común, con autorización del departamento competente"],
        ["Uniformidad (art. 18)", "Normas básicas por decreto del Gobierno de Aragón; el uniforme incorpora el escudo de Aragón y el del municipio; la seguridad privada no puede usar prendas que confundan"],
        ["Identificación (art. 19)", "Carné profesional expedido por el Gobierno de Aragón y placa con número de identificación personal (el del Registro), visible en el uniforme; obligación de identificarse con el carné si se lo piden"],
        ["Armamento (art. 20)", "Portan las armas que se señalen reglamentariamente; el municipio garantiza formación periódica con al menos una práctica de tiro anual; el alcalde puede retirar cautelarmente el arma ante riesgo"],
      ],
      preguntas: [
        ["facil", "¿A partir de qué población está obligado un municipio aragonés a tener Cuerpo de Policía Local?", ["Más de 10.000 habitantes", "Más de 5.000", "Más de 50.000"], "Art. 15.1."],
        ["media", "¿Quién nombra al Jefe del Cuerpo de la Policía Local?", ["El alcalde, previa convocatoria pública", "El Gobierno de Aragón", "La Comisión de Coordinación"], "Art. 16.3."],
        ["media", "El uniforme de los policías locales de Aragón incorpora preceptivamente…", ["El escudo de Aragón y el del municipio", "Solo el escudo de España", "El logotipo de la Academia"], "Art. 18.2."],
        ["media", "¿Quién expide el carné profesional de los policías locales de Aragón?", ["El Gobierno de Aragón", "El ayuntamiento", "La Guardia Civil"], "Art. 19.1."],
        ["dificil", "¿Cuántas prácticas de tiro anuales como mínimo debe promover el municipio según la Ley 8/2013?", ["Al menos una", "Al menos cuatro", "Ninguna"], "Art. 20.3."],
        ["media", "El número de identificación personal de la placa coincide con…", ["El del Registro de los Policías Locales de Aragón", "El DNI", "El número de nómina"], "Art. 19.1."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Escala Superior o de mando (art. 22)", "Grupo A, Subgrupo A1: Superintendente, Intendente Principal e Intendente"],
        ["Escala Técnica (art. 22)", "Grupo A, Subgrupo A2: Inspector y Subinspector"],
        ["Escala Ejecutiva (art. 22)", "Grupo C, Subgrupo C1: Oficial y Policía"],
        ["Regla de estructura (art. 22.2)", "No puede crearse una categoría sin todas las inferiores ni haber más de dos puestos de una categoría sin el inmediato superior"],
        ["Bases mínimas (art. 23)", "Las fija el Gobierno de Aragón; el alcalde puede completarlas; las bases se publican íntegras en el BOP y un anuncio en el BOA; puede encomendarse la selección a la comunidad autónoma"],
        ["Requisitos de ingreso (art. 24)", "Nacionalidad española, tener 18 años y no superar los 35, y los requisitos generales de función pública y de las normas marco"],
        ["Edad en la convocatoria de Zaragoza 2026", "Las bases de la CONV 7.1/2026 exigen tener 18 años y no exceder la edad de jubilación forzosa, sin el límite de 35 del art. 24 de la ley; en el examen, atender a lo que pregunten: la ley (35) o las bases (jubilación)"],
        ["Sistemas de ingreso (art. 25)", "Policía: oposición libre y/o movilidad. Subinspector e Intendente: oposición, promoción interna o movilidad. Oficial, Inspector e Intendente Principal: promoción interna o movilidad"],
        ["Movilidad (art. 26)", "Reserva de al menos el 20 % de las vacantes para concurso de méritos entre policías de Aragón de igual o superior categoría con cinco años de antigüedad"],
        ["Permuta y comisión de servicios (arts. 26.6 y 27)", "Permuta autorizada por los alcaldes, sin otra en cinco años; comisión de servicios en otro Cuerpo de hasta dos años"],
        ["Reserva para militares (DA 4.ª)", "Hasta el 20 % de las plazas de Policía para militares profesionales de tropa y marinería con más de cinco años de servicios"],
      ],
      preguntas: [
        ["media", "La categoría de Policía pertenece a…", ["La Escala Ejecutiva, Grupo C, Subgrupo C1", "La Escala Técnica, A2", "La Escala Superior, A1"], "Art. 22.1."],
        ["media", "¿Qué edad máxima establece la Ley 8/2013 para el ingreso en la Policía Local?", ["No superar los 35 años", "No superar los 30 años", "No hay límite"], "Art. 24."],
        ["media", "El ingreso en la categoría de Policía se realiza por…", ["Oposición libre y/o movilidad", "Concurso de méritos exclusivamente", "Libre designación"], "Art. 25.1."],
        ["media", "¿Qué porcentaje mínimo de vacantes se reserva a la movilidad entre policías de Aragón?", ["El 20 %", "El 50 %", "El 5 %"], "Art. 26.1."],
        ["dificil", "¿Qué antigüedad mínima en el puesto de origen se exige para el concurso de movilidad?", ["Cinco años", "Dos años", "Diez años"], "Art. 26.2.b)."],
        ["media", "Las categorías de Inspector y Subinspector forman la…", ["Escala Técnica (A2)", "Escala Ejecutiva", "Escala Superior"], "Art. 22.1."],
        ["dificil", "¿Qué porcentaje máximo de plazas de Policía puede reservarse a militares profesionales de tropa y marinería?", ["El 20 %", "El 10 %", "El 50 %"], "DA 4.ª."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["Algunos derechos (art. 28)", "Remuneración justa, carrera profesional, movilidad, jornada adaptada, afiliación sin discriminación, vestuario y equipo, protección de la salud, defensa y asistencia jurídica a cargo del Ayuntamiento cuando son inculpados por actos de servicio"],
        ["Excepción en la defensa jurídica (art. 28.q)", "Si resultan condenados por dolo, negligencia grave o abuso de autoridad, asumen íntegramente el coste de su defensa"],
        ["Distinciones (art. 29)", "Las conceden los ayuntamientos y el Gobierno de Aragón; se anotan en el expediente y en el Registro y valen como mérito"],
        ["Algunos deberes (art. 30)", "Jurar la Constitución y el Estatuto de Aragón, obedecer salvo ilícito penal o contradicción manifiesta, vigilancia activa, trato correcto, saludo reglamentario, intervenir para prevenir delitos, uniformidad, puntualidad, no ingerir alcohol o drogas en servicio y no hacer huelga"],
        ["Control de alcohol y drogas (art. 30.o)", "El policía que presente síntomas evidentes de ingesta durante el servicio puede ser sometido a un análisis clínico"],
        ["Iniciativa en el servicio (art. 30.m)", "La asume el de mayor categoría y, a igualdad, el de mayor antigüedad, salvo designación expresa"],
        ["Régimen disciplinario (art. 31)", "Infracciones y sanciones: las del Cuerpo Nacional de Policía; procedimiento y órganos: los de los funcionarios de la Administración local"],
        ["Salud laboral (art. 33)", "Revisión médica psicofísica anual; la insuficiencia sin incapacidad la evalúa un tribunal de tres médicos (Ayuntamiento, interesado y Servicio Aragonés de Salud)"],
        ["Segunda actividad (art. 34)", "Situación distinta del servicio activo para garantizar la aptitud psicofísica; la regulan los ayuntamientos; mismo régimen disciplinario e incompatibilidades"],
        ["Agentes de movilidad (DA 2.ª)", "En municipios de gran población, el Pleno puede crear cuerpos de funcionarios para la ordenación del tráfico, que no se integran en la Policía Local"],
      ],
      preguntas: [
        ["media", "Según la Ley 8/2013, el régimen disciplinario de la Policía Local, en cuanto a infracciones y sanciones, es…", ["El establecido para el Cuerpo Nacional de Policía", "El del Código Penal", "El de cada reglamento municipal exclusivamente"], "Art. 31.1."],
        ["media", "Los policías locales de Aragón deben jurar o prometer acatamiento a…", ["La Constitución y el Estatuto de Autonomía de Aragón", "Solo al alcalde", "Al reglamento del Cuerpo"], "Art. 30.a)."],
        ["media", "¿Quién asume la defensa jurídica del policía local inculpado por actos en el ejercicio de sus funciones?", ["El Ayuntamiento", "El propio policía siempre", "El Gobierno de Aragón"], "Art. 28.q)."],
        ["dificil", "¿Cuándo debe el policía asumir el coste íntegro de su defensa jurídica?", ["Si resulta condenado por dolo, negligencia grave o abuso de autoridad", "Siempre", "Nunca"], "Art. 28.q)."],
        ["media", "¿Con qué periodicidad se realiza la revisión médica psicofísica de los policías locales?", ["Anual", "Cada cinco años", "Solo al ingresar"], "Art. 33.1."],
        ["media", "En un servicio con dos policías de igual empleo, asume la iniciativa…", ["El de mayor antigüedad, salvo designación expresa", "El más joven", "El que conduzca"], "Art. 30.m)."],
      ],
    },
    {
      seccion: S6,
      flashcards: [
        ["Reglamento Marco (Decreto 222/1991)", "Decreto 222/1991, de 17 de diciembre, Reglamento Marco de Organización de las Policías Locales de Aragón; sigue vigente en lo no derogado ni opuesto a la Ley 8/2013"],
        ["Registro (Decreto 32/2019)", "Decreto 32/2019, de 26 de febrero, que regula la organización y el funcionamiento del Registro de Policías Locales de Aragón (BOA núm. 45, de 6-03-2019); sus anexos recogen el diseño del carné profesional y la placa"],
        ["Uniformidad y medios (Decreto 92/2022)", "Decreto 92/2022, de 15 de junio (BOA de 24-06-2022): uniformidad y medios técnicos y de defensa; deroga el Decreto 121/1992 y el Capítulo III del Decreto 222/1991"],
        ["Dotación mínima individual (D. 92/2022)", "Silbato, grilletes, defensa o tonfa, equipo reflectante, guantes anticorte, arma corta con munición no blindada, cinturón y chaleco de protección"],
        ["Color del uniforme (D. 92/2022)", "Predominantemente azul oscuro, con calzado negro"],
        ["Divisas de mando (D. 92/2022)", "Superintendente: tres ramas de roble doradas; Intendente Principal: dos; Intendente: una; Inspector: tres barras plateadas; Subinspector: dos; Oficial: una"],
        ["Academia (Decreto 10/2023)", "Decreto 10/2023, de 8 de febrero (BOA de 15-02-2023): crea y organiza la Academia Aragonesa de Policías Locales, con Consejo Rector y director"],
        ["Curso de ingreso (D. 10/2023)", "Formación básica selectiva: hay que obtener la calificación de apto; mínimo de 400 horas lectivas para la categoría de Policía"],
        ["Altura mínima (D. 10/2023)", "Suprime el requisito de estatura mínima de ingreso que fijaba el Reglamento Marco (165 cm hombres y 160 cm mujeres)"],
      ],
      preguntas: [
        ["media", "¿Qué decreto regula hoy la uniformidad y los medios técnicos y de defensa de las Policías Locales de Aragón?", ["El Decreto 92/2022", "El Decreto 121/1992", "El Decreto 10/2023"], "Decreto 92/2022, que deroga el 121/1992."],
        ["media", "El curso de formación básica para el ingreso en la categoría de Policía tiene una duración mínima de…", ["400 horas lectivas", "40 horas", "1.000 horas"], "Decreto 10/2023, art. 13."],
        ["media", "¿Exige hoy la normativa aragonesa una altura mínima para ingresar en la Policía Local?", ["No, la suprimió el Decreto 10/2023", "Sí, 170 cm", "Sí, 165 cm hombres y 160 cm mujeres"], "Decreto 10/2023, disposición final primera."],
        ["dificil", "La divisa de tres ramas de roble doradas corresponde a…", ["El Superintendente", "El Intendente", "El Inspector"], "Decreto 92/2022, art. 9."],
        ["media", "¿Qué regula el Decreto 32/2019?", ["El Registro de Policías Locales de Aragón", "El uso de drones", "Los horarios de servicio"], "Decreto 32/2019."],
        ["media", "El color predominante del uniforme de las Policías Locales de Aragón es…", ["Azul oscuro", "Verde", "Gris"], "Decreto 92/2022, art. 7.2."],
      ],
    },
  ],
  glosario: [
    [S1, "Coordinación", "Conjunto de medidas para unificar criterios y homogeneizar medios de las Policías Locales (art. 3)."],
    [S1, "Comisión de Coordinación de las Policías Locales de Aragón", "Órgano consultivo y de participación presidido por el consejero competente."],
    [S2, "Gestión directa", "Prestación del servicio por el propio municipio, sin interinos ni contratación laboral (art. 10.4)."],
    [S3, "Jefe del Cuerpo", "Mando operativo de la Policía Local, bajo la autoridad directa del alcalde (art. 16)."],
    [S3, "Agrupación de municipios", "Asociación de municipios limítrofes para sostener una Policía Local común (art. 17)."],
    [S4, "Movilidad", "Traslado voluntario entre Policías Locales de Aragón mediante concurso de méritos (art. 26)."],
    [S4, "Escala Ejecutiva", "Escala del Grupo C1 que integra las categorías de Oficial y Policía."],
    [S5, "Segunda actividad", "Situación distinta del servicio activo que garantiza la aptitud psicofísica (art. 34)."],
    [S6, "Reglamento Marco", "Norma autonómica (Decreto 222/1991) a la que se ajustan los reglamentos de los Cuerpos."],
  ],
  casos: [
    {
      slug: "caso-municipio-12000-habitantes-cuerpo",
      titulo: "Un municipio que supera los 10.000 habitantes",
      supuesto: "Un municipio aragonés del entorno de Zaragoza ha superado los 10.000 habitantes y no tiene Policía Local; hasta ahora, unos vigilantes contratados por una empresa vigilan los edificios municipales. El alcalde quiere crear el Cuerpo y, mientras tanto, pedir refuerzos a la Policía Local de un municipio vecino para sus fiestas.",
      preguntas: [
        [S3, "media", "Al superar los 10.000 habitantes, el municipio…", ["Debe tener Cuerpo de Policía Local", "Puede elegir no tenerlo", "Debe pedírselo al Estado"], "Art. 15.1."],
        [S2, "media", "¿Puede encomendar las funciones de Policía Local a la empresa de vigilancia?", ["No, el servicio se presta directamente, sin gestión indirecta", "Sí", "Solo de noche"], "Art. 10.4."],
        [S3, "media", "El Cuerpo se denominará…", ["«Policía Local de» seguido del nombre oficial del municipio", "Guardia Municipal", "Policía Comarcal"], "Art. 15.5."],
        [S2, "media", "Para el refuerzo en fiestas pueden firmarse…", ["Acuerdos bilaterales entre ayuntamientos, comunicados previamente al departamento competente", "Contratos con la seguridad privada", "Nada"], "Art. 12.2."],
        [S2, "media", "Durante el refuerzo, los policías del municipio vecino dependerán…", ["Del alcalde del municipio en fiestas y del jefe de su cuerpo", "De su alcalde de origen", "Del Gobierno de Aragón"], "Art. 12.2."],
        [S3, "media", "El municipio deberá aprobar…", ["Un reglamento de organización y funcionamiento del Cuerpo", "Un código penal municipal", "Nada"], "Art. 15.6."],
        [S3, "dificil", "Si el municipio fuera pequeño y limítrofe con otro, ¿podrían sostener una Policía Local común?", ["Sí, mediante una agrupación autorizada por el departamento competente", "No", "Solo con permiso del Estado"], "Art. 17."],
        [S1, "media", "¿Qué órgano autonómico informa los reglamentos de los Cuerpos que vayan a aprobar los ayuntamientos?", ["La Comisión de Coordinación", "La Academia", "El Registro"], "Art. 5.2.a)."],
        [S4, "media", "Las bases de la convocatoria para las primeras plazas se publicarán…", ["Íntegras en el Boletín Oficial de la Provincia y con anuncio en el BOA", "Solo en el tablón municipal", "En el BOE exclusivamente"], "Art. 23.3."],
        [S4, "media", "¿Podría encomendar la selección a la Comunidad Autónoma?", ["Sí, por acuerdo plenario y convenio, a través del Instituto Aragonés de Administración Pública", "No", "Solo para mandos"], "Art. 23.4."],
      ],
    },
    {
      slug: "caso-opositora-requisitos-movilidad",
      titulo: "Requisitos de una aspirante y un traslado",
      supuesto: "Una aspirante de 34 años y 1,58 m de estatura quiere presentarse a Policía Local en un municipio aragonés. Un policía de Huesca con siete años de antigüedad quiere trasladarse a Zaragoza por movilidad. Otro agente quiere permutar su destino con un compañero de Teruel.",
      preguntas: [
        [S4, "media", "Con 34 años, ¿cumple la aspirante el requisito de edad?", ["Sí, el límite es no superar los 35", "No, el límite es 30", "No hay límite de edad"], "Art. 24."],
        [S6, "media", "Su estatura de 1,58 m, ¿le impide presentarse según la normativa aragonesa vigente?", ["No: el Decreto 10/2023 suprimió la altura mínima", "Sí", "Solo en Zaragoza"], "Decreto 10/2023."],
        [S4, "media", "El policía de Huesca puede trasladarse por movilidad porque…", ["Tiene más de cinco años de antigüedad y es de igual o superior categoría", "Cualquiera puede", "Lo decide el Gobierno de Aragón"], "Art. 26.2."],
        [S4, "media", "Al ocupar el puesto por movilidad, respecto de su municipio de origen queda en…", ["Servicio en otras Administraciones públicas", "Excedencia voluntaria", "Suspensión"], "Art. 26.3."],
        [S4, "media", "La permuta la autorizan…", ["Los alcaldes", "La Comisión de Coordinación", "El juez"], "Art. 26.6."],
        [S4, "dificil", "Tras una permuta, ¿cuándo podría concederse otra a los mismos funcionarios?", ["Cuando transcurran cinco años", "Al año", "Nunca más"], "Art. 26.6."],
        [S6, "media", "Si supera la oposición, deberá superar un curso de formación básica selectivo de al menos…", ["400 horas lectivas", "40 horas", "2.000 horas"], "Decreto 10/2023."],
        [S4, "media", "Ingresará en la categoría de Policía, que pertenece al subgrupo…", ["C1", "C2", "A2"], "Art. 22."],
        [S4, "media", "La comisión de servicios en otro Cuerpo tiene una duración máxima de…", ["Dos años", "Seis meses", "Cinco años"], "Art. 27."],
        [S1, "media", "Una vez nombrada, deberá inscribirse en…", ["El Registro de los Policías Locales de Aragón", "El Registro Civil", "Ningún registro"], "Art. 7.2."],
      ],
    },
    {
      slug: "caso-agente-sintomas-alcohol-servicio",
      titulo: "Un agente con síntomas de embriaguez",
      supuesto: "Un mando observa que un agente de su turno presenta síntomas evidentes de haber bebido alcohol durante el servicio. El agente niega haber bebido. Días después, otro agente es inculpado penalmente por unas lesiones causadas durante una detención.",
      preguntas: [
        [S5, "media", "¿Puede someterse al agente a un análisis clínico?", ["Sí, si presenta síntomas evidentes de ingesta durante el servicio", "No, nunca", "Solo con orden judicial"], "Art. 30.o)."],
        [S5, "media", "Abstenerse de ingerir alcohol durante el servicio es…", ["Un deber del policía local", "Una recomendación", "Un derecho"], "Art. 30.o)."],
        [S5, "media", "La tipificación de la falta y su sanción serán las establecidas para…", ["El Cuerpo Nacional de Policía", "Los militares", "Los vigilantes privados"], "Art. 31.1."],
        [S5, "media", "El procedimiento disciplinario y los órganos competentes son los de…", ["Los funcionarios de la Administración local", "El Ministerio del Interior", "La Comisión de Coordinación"], "Art. 31.2."],
        [S3, "dificil", "Si hubiera indicios de que la tenencia del arma supone riesgo, ¿quién puede retirarla cautelarmente?", ["El alcalde o la persona en quien delegue", "Cualquier compañero", "El Gobierno de Aragón"], "Art. 20.4."],
        [S5, "media", "Respecto del agente inculpado por las lesiones en la detención, ¿quién asume su defensa?", ["El Ayuntamiento", "Nadie", "La Comunidad Autónoma"], "Art. 28.q)."],
        [S5, "media", "Si finalmente fuera condenado por abuso de autoridad…", ["Asumiría íntegramente el coste de su defensa", "El Ayuntamiento seguiría pagando todo", "Se le devolvería el dinero"], "Art. 28.q)."],
        [S2, "media", "En la detención, el agente debía velar por…", ["La vida e integridad física del detenido y respetar su honor y dignidad", "Su propia comodidad", "La rapidez"], "Art. 13.3.b)."],
        [S5, "media", "¿Puede un policía local participar en una huelga?", ["No, debe abstenerse", "Sí", "Solo con servicios mínimos"], "Art. 30.q)."],
        [S5, "dificil", "Si el agente con problemas tuviera una insuficiencia psíquica sin incapacidad, ¿quién la evaluaría?", ["Un tribunal de tres médicos", "El mando directo", "El propio agente"], "Art. 33.2."],
      ],
    },
  ],
});
