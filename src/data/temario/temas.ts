import type { TemaCanonico } from "@/lib/types";

/**
 * Temas canónicos: el contenido reutilizable, sin ninguna referencia a
 * oposición ni a bloque/número (eso vive en `asignaciones.ts`). Portado del
 * temario oficial de Auxiliar Administrativo del Ayuntamiento de Zaragoza
 * (proyecto kubo-calendario / OposiZaragoza).
 *
 * Cuando se incorpore una segunda oposición: si un tema coincide (misma ley,
 * misma materia), NO se duplica aquí — se añade solo una nueva fila en
 * `asignaciones.ts` apuntando a este mismo slug.
 */
export const TEMAS: TemaCanonico[] = [
  {
    slug: "tema-1",
    titulo: "La Constitución Española",
    descripcion:
      "Elaboración y aprobación. Estructura y título preliminar. La Administración pública en la Constitución. Organización territorial del Estado: principios generales y Administración local.",
    contenido:
      "La Constitución Española de 1978 es la norma suprema del ordenamiento jurídico. Se divide en un Título Preliminar y 10 Títulos numerados (169 artículos). Consagra la soberanía nacional en el pueblo español y la forma política de la Monarquía parlamentaria.",
    enlacesBoe: [
      { titulo: "Constitución Española", url: "https://www.boe.es/buscar/act.php?id=BOE-A-1978-31229" },
    ],
  },
  {
    slug: "tema-3",
    titulo: "El Estatuto de Autonomía de Aragón",
    descripcion:
      "Título preliminar. Organización institucional de la Comunidad Autónoma (Cortes, Presidente y Gobierno). Clases de competencias de la Comunidad Autónoma.",
    contenido:
      "El Estatuto de Autonomía es la norma institucional básica de Aragón. El Título Preliminar define a Aragón como nacionalidad histórica y regula sus símbolos, derechos y lenguas. Organiza sus Cortes legislativas, la Presidencia y la Diputación General o Gobierno.",
    enlacesBoe: [
      { titulo: "Estatuto de Autonomía de Aragón", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2007-8444" },
    ],
  },
  {
    slug: "tema-14",
    titulo: "El municipio y régimen especial de Zaragoza",
    descripcion:
      "El municipio: territorio y población (Padrón). Competencias y servicios mínimos obligatorios. Régimen de municipios de gran población. Ley de régimen especial de Zaragoza.",
    contenido:
      "Estudia el término municipal y los vecinos del Padrón. Detalla las competencias exclusivas y delegadas y los servicios mínimos por población. Incorpora la organización de municipios de Gran Población y el Estatuto de Zaragoza como capital aragonesa.",
  },
  {
    slug: "tema-2",
    titulo: "Igualdad de género y Violencia de Género",
    descripcion:
      "La Ley para la igualdad efectiva de mujeres y hombres: el principio de igualdad y la tutela contra la discriminación. La Ley de Prevención y Protección Integral a las Mujeres Víctimas de Violencia en Aragón: disposiciones generales y medidas de protección y apoyo a las víctimas. El Plan de Igualdad para empleadas y empleados del Ayuntamiento de Zaragoza.",
    contenido:
      "Regula el principio de igualdad de trato y la tutela contra la discriminación directa o indirecta (LOIEMH), las medidas de protección y apoyo a las víctimas de violencia de género en Aragón (Ley 4/2007) y las directrices internas del II Plan de Igualdad para empleadas y empleados del Ayuntamiento de Zaragoza (2024).",
    enlacesBoe: [
      {
        titulo: "Ley para la igualdad efectiva de mujeres y hombres",
        url: "https://www.boe.es/buscar/act.php?id=BOE-A-2007-6115",
        pdf: "tema-2-ley-igualdad",
      },
      {
        titulo: "Ley de Prevención y Protección Integral a las Mujeres Víctimas de Violencia de Aragón",
        url: "https://www.boe.es/buscar/act.php?id=BOE-A-2007-11593",
        pdf: "tema-2-ley-violencia-genero",
      },
      {
        titulo: "Plan de Igualdad del Ayuntamiento de Zaragoza",
        url: "https://www.zaragoza.es/cont/paginas/catalogopublicaciones/doc/12293.pdf",
        pdf: "tema-2-plan-igualdad-zaragoza",
      },
    ],
  },
  {
    slug: "tema-4",
    titulo: "Los interesados en el procedimiento",
    descripcion:
      "La Ley del Procedimiento Administrativo Común (I): capacidad de obrar, concepto de interesado, representación y pluralidad de interesados.",
    contenido:
      "Regula quiénes son considerados interesados ante la administración (titulares de derechos o intereses legítimos), su capacidad de obrar y los mecanismos legales para actuar mediante representantes acreditados.",
    enlacesBoe: [
      { titulo: "Ley 39/2015, del Procedimiento Administrativo Común", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565" },
    ],
  },
  {
    slug: "tema-5",
    titulo: "La actividad de las Administraciones Públicas",
    descripcion:
      "La Ley del Procedimiento Administrativo Común (II): normas generales de actuación. Términos y plazos: obligatoriedad, cómputo y ampliación de plazos.",
    contenido:
      "Establece las reglas generales de la actividad administrativa, la lengua de los procedimientos, el derecho de acceso, la obligatoriedad de plazos expresados en horas, días, meses o años, y las normas de cómputo.",
    enlacesBoe: [
      { titulo: "Ley 39/2015, del Procedimiento Administrativo Común", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565" },
    ],
  },
  {
    slug: "tema-6",
    titulo: "Los actos administrativos",
    descripcion:
      "La Ley del Procedimiento Administrativo Común (III): requisitos de los actos. Eficacia. Nulidad y anulabilidad. Nulidad de pleno derecho.",
    contenido:
      "El acto administrativo es la declaración unilateral de voluntad realizada por la Administración en ejercicio de una potestad. Se presumen válidos y eficaces desde que se dictan, salvo supuestos específicos de nulidad de pleno derecho (art. 47) o anulabilidad (art. 48).",
    enlacesBoe: [
      { titulo: "Ley 39/2015, del Procedimiento Administrativo Común", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565" },
    ],
  },
  {
    slug: "tema-7",
    titulo: "Disposiciones sobre el procedimiento administrativo común",
    descripcion:
      "La Ley del Procedimiento Administrativo Común (IV): fases del procedimiento común: iniciación (de oficio y a solicitud), ordenación, instrucción y finalización.",
    contenido:
      "El procedimiento común discurre por cuatro fases obligatorias: 1. Iniciación (acuerdo o solicitud); 2. Ordenación (impulso de oficio); 3. Instrucción (pruebas, informes y alegaciones); y 4. Finalización (resolución expresa, desistimiento, renuncia o caducidad).",
    enlacesBoe: [
      { titulo: "Ley 39/2015, del Procedimiento Administrativo Común", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565" },
    ],
  },
  {
    slug: "tema-8",
    titulo: "Revisión de actos en vía administrativa",
    descripcion:
      "La Ley del Procedimiento Administrativo Común (V): revisión de oficio y recursos administrativos (recurso de alzada, de reposición y extraordinario de revisión).",
    contenido:
      "Mecanismos para corregir las actuaciones administrativas sin acudir a los tribunales. Regula la revisión de oficio de actos nulos y la interposición de recursos ordinarios de alzada (ante el superior) o reposición (ante el mismo órgano).",
    enlacesBoe: [
      { titulo: "Ley 39/2015, del Procedimiento Administrativo Común", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565" },
    ],
  },
  {
    slug: "tema-9",
    titulo: "Los contratos del sector público",
    descripcion:
      "Delimitación de los tipos contractuales. Competencias en materia de contratación en las Entidades Locales. Normas específicas de contratación local.",
    contenido:
      "Regula las tipologías de contratos (obras, servicios, suministros, concesiones) en la administración local, definiendo los órganos de contratación competentes y los trámites de adjudicación simplificados y ordinarios.",
    enlacesBoe: [
      { titulo: "Ley de Contratos del Sector Público", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2017-12902" },
    ],
  },
  {
    slug: "tema-10",
    titulo: "Los bienes de las entidades locales",
    descripcion:
      "Clasificación de los bienes locales: bienes de dominio público (uso público y servicio público) y bienes patrimoniales. Conservación y defensa.",
    contenido:
      "Los municipios poseen patrimonio propio. Los bienes de dominio público son inalienables, imprescriptibles e inembargables. Los bienes patrimoniales o de propios se rigen por el derecho privado con especialidades locales.",
  },
  {
    slug: "tema-11",
    titulo: "La actividad de las entidades locales",
    descripcion:
      "Formas de actividad de policía y fomento. El servicio público local: concepto, modos de gestión directa e indirecta.",
    contenido:
      "Las entidades locales intervienen en la vida ciudadana mediante policía (licencias y órdenes) y fomento (subvenciones). Prestan servicios mínimos bajo gestión directa (por la propia entidad) o indirecta (concesiones a terceros).",
  },
  {
    slug: "tema-15",
    titulo: "Participación ciudadana y atención al público",
    descripcion:
      "El Reglamento de Órganos territoriales y Participación ciudadana de Zaragoza. El Manual de Atención a la ciudadanía del Ayuntamiento de Zaragoza.",
    contenido:
      "Analiza los canales de participación colectiva e individual del municipio (Juntas de Distrito y Vecinales, consultas públicas) y el protocolo de calidad en el trato directo e informativo recogido en el Manual de Atención al Ciudadano.",
  },
  {
    slug: "tema-16",
    titulo: "Reglamentos y ordenanzas de los municipios",
    descripcion:
      "Reglamentos y ordenanzas municipales: concepto y procedimiento de elaboración. La aprobación de ordenanzas fiscales y reglamentos en la ley de capitalidad de Zaragoza.",
    contenido:
      "Las entidades locales ejercen su potestad reglamentaria a través de Ordenanzas (normas generales) y Reglamentos (autoorganización). Se detallan sus fases de aprobación y las especialidades fiscales simplificadas del Ayuntamiento de Zaragoza.",
  },
  {
    slug: "tema-12",
    titulo: "Haciendas Locales: Recursos municipales",
    descripcion:
      "La Ley reguladora de las Haciendas Locales (I): tributos municipales (tasas, contribuciones especiales e impuestos municipales obligatorios y potestativos) y precios públicos.",
    contenido:
      "Clasifica las fuentes de financiación del municipio: tasas por servicios o uso del espacio, contribuciones por obras que revaloricen inmuebles, impuestos locales (IBI, IAE, IVTM, ICIO) y precios públicos.",
    enlacesBoe: [
      { titulo: "Ley reguladora de las Haciendas Locales", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2004-4214" },
    ],
  },
  {
    slug: "tema-13",
    titulo: "Haciendas Locales: El presupuesto municipal",
    descripcion:
      "La Ley reguladora de las Haciendas Locales (II): estructura, contenido, aprobación y ejecución del presupuesto. Especialidades en la Ley de Capitalidad de Zaragoza.",
    contenido:
      "El presupuesto es la expresión contable anual de gastos y estimación de ingresos del municipio. Su aprobación requiere exposición pública, informe de intervención y el voto favorable del Pleno, con singularidades específicas en la Ley de Capitalidad de Zaragoza.",
    enlacesBoe: [
      { titulo: "Ley reguladora de las Haciendas Locales", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2004-4214" },
    ],
  },
  {
    slug: "tema-17",
    titulo: "Los empleados públicos: clases, derechos y deberes",
    descripcion:
      "El Estatuto Básico del Empleado Público (I): personal funcionario de carrera e interino, laboral y eventual. Derechos individuales, deberes y código de conducta.",
    contenido:
      "Regula las tipologías de personal al servicio de las administraciones, su régimen de derechos (vacaciones, retribuciones, carrera) y el catálogo ético y de conducta que deben guardar en el ejercicio de sus funciones.",
  },
  {
    slug: "tema-18",
    titulo: "Situaciones administrativas y régimen disciplinario",
    descripcion:
      "El Estatuto Básico del Empleado Público (II): adquisición y pérdida de la relación de servicio. Situaciones administrativas. Régimen disciplinario y faltas.",
    contenido:
      "Analiza el ingreso (oposición) y cese (jubilación, sanción). Clasifica las situaciones administrativas (servicio activo, servicios especiales, excedencias) y las faltas disciplinarias clasificadas en muy graves, graves y leves.",
  },
  {
    slug: "tema-19",
    titulo: "La función pública local",
    descripcion:
      "Peculiaridades del régimen de los empleados públicos de las entidades locales: planificación de recursos humanos, estructuración del empleo público y provisión de puestos de trabajo.",
    contenido:
      "Organización de los recursos humanos a nivel municipal: planificación de plantillas orgánicas y relaciones de puestos de trabajo (RPT), la oferta de empleo público (OEP), la provisión y movilidad de puestos, y los cuerpos específicos de funcionarios de habilitación nacional y locales.",
  },
  {
    slug: "tema-23",
    titulo: "La Ley de Urbanismo de Aragón",
    descripcion:
      "Aspectos básicos sobre régimen urbanístico del suelo, planeamiento urbanístico, gestión urbanística, edificación y uso del suelo, y disciplina urbanística.",
    contenido:
      "El texto refundido de la Ley de Urbanismo de Aragón regula el régimen urbanístico del suelo (clasificación y régimen de derechos y deberes), los instrumentos de planeamiento, los sistemas de gestión urbanística, las condiciones de edificación y uso del suelo, y el régimen de disciplina urbanística (inspección, protección de la legalidad y régimen sancionador).",
    enlacesBoe: [
      { titulo: "Ley de Urbanismo de Aragón", url: "https://www.boe.es/buscar/act.php?id=BOA-d-2014-90410" },
    ],
  },
];

/** Devuelve un tema canónico por su `slug`, o `undefined` si no existe. */
export function getTemaCanonico(slug: string): TemaCanonico | undefined {
  return TEMAS.find((tema) => tema.slug === slug);
}
