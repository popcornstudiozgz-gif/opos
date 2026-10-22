/**
 * Crea tema-337 — Tema 6 de Policía Local: "Los bienes de las Entidades
 * locales. Reglamentos y Ordenanzas locales."
 *
 * Tema dedicado: existen tema-10 (bienes) y tema-16 (reglamentos y
 * ordenanzas), pero este número del temario reúne ambas materias y cada
 * número admite un solo canónico. Fuentes (textos consolidados de la API
 * del BOE, octubre de 2026, títulos verificados):
 * - Ley 7/1985, Reguladora de las Bases del Régimen Local
 *   (BOE-A-1985-5392): arts. 4, 21.1.e) y m), 49, 70.2, 79-82, 84, 123,
 *   124.4.g) y 127.
 * - Real Decreto 1372/1986, Reglamento de Bienes de las Entidades Locales
 *   (BOE-A-1986-17958): arts. 1-8, 17, 44, 55, 70-71, 74-78, 92-93.
 * - Ley 39/2015 (BOE-A-2015-10565): arts. 128 y 133.
 * - Ley 10/2017, de régimen especial del municipio de Zaragoza como capital
 *   de Aragón (BOE-A-2018-1683): arts. 48 y 49.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-337-bienes-reglamentos-ordenanzas-locales.mjs
 */
import { sembrarTema, POLICIA } from "./lib/sembrar-tema.mjs";

const LBRL = "https://www.boe.es/buscar/act.php?id=BOE-A-1985-5392";
const RBEL = "https://www.boe.es/buscar/act.php?id=BOE-A-1986-17958";
const L39 = "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565";
const CAP = "https://www.boe.es/buscar/act.php?id=BOE-A-2018-1683";
const S1 = "bienes-clasificacion";
const S2 = "bienes-prerrogativas-defensa";
const S3 = "bienes-utilizacion";
const S4 = "potestad-reglamentaria-ordenanzas";
const S5 = "ordenanzas-zaragoza-capitalidad";

await sembrarTema({
  tema: {
    slug: "tema-337",
    titulo: "Bienes de las entidades locales y reglamentos y ordenanzas locales",
    descripcion: "Patrimonio de las entidades locales; bienes de dominio público (uso y servicio público), comunales y patrimoniales; régimen jurídico, alteración de la calificación, parcelas sobrantes y efectos no utilizables; inventario; potestades de investigación, deslinde, recuperación de oficio y desahucio; utilización del dominio público (uso común general y especial, privativo, normal y anormal; licencias y concesiones). Potestad reglamentaria local: ordenanzas, reglamentos y bandos; procedimiento de aprobación (art. 49 LBRL), publicación y entrada en vigor, participación ciudadana (art. 133 Ley 39/2015) y procedimiento especial de Zaragoza (Ley 10/2017).",
    contenido: "Qué bienes tiene el Ayuntamiento (las calles y plazas, los edificios municipales, los bienes que puede vender o alquilar) y cómo los protege: puede recuperar por sí mismo una plaza ocupada ilegalmente en cualquier momento. Explica también qué es una ordenanza, un reglamento y un bando, cómo se aprueban (en Zaragoza, con un procedimiento propio de la Ley de Capitalidad) y cuándo entran en vigor; es la base de todas las normas municipales que aplica la Policía Local.",
    enlaces_boe: [
      { url: LBRL, titulo: "Ley 7/1985, de 2 de abril, Reguladora de las Bases del Régimen Local (BOE-A-1985-5392)" },
      { url: RBEL, titulo: "Real Decreto 1372/1986, Reglamento de Bienes de las Entidades Locales (BOE-A-1986-17958)" },
      { url: L39, titulo: "Ley 39/2015, del Procedimiento Administrativo Común (BOE-A-2015-10565), arts. 128 y 133" },
      { url: CAP, titulo: "Ley 10/2017, de régimen especial del municipio de Zaragoza como capital de Aragón (BOE-A-2018-1683)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "Concepto y clasificación de los bienes locales", articulos: "LBRL arts. 79-81; RBEL arts. 1-8", url: `${LBRL}#a79` },
      { seccion: S2, titulo: "Inventario y prerrogativas: investigación, deslinde, recuperación y desahucio", articulos: "LBRL art. 82; RBEL arts. 17, 44-73", url: `${RBEL}#art44` },
      { seccion: S3, titulo: "Utilización de los bienes: dominio público y patrimoniales", articulos: "RBEL arts. 74-93", url: `${RBEL}#art74` },
      { seccion: S4, titulo: "Potestad reglamentaria, ordenanzas, reglamentos y bandos", articulos: "LBRL arts. 4, 21, 49, 70.2, 84; Ley 39/2015 arts. 128 y 133", url: `${LBRL}#a49` },
      { seccion: S5, titulo: "Aprobación de ordenanzas en Zaragoza (Ley de Capitalidad)", articulos: "Ley 10/2017, arts. 48-49; LBRL arts. 123 y 127", url: CAP },
    ],
  },
  vinculo: { oposicion: POLICIA.oposicion, bloqueId: POLICIA.bloqueParte1, numero: 6 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Patrimonio local (LBRL art. 79.1)", "El conjunto de bienes, derechos y acciones que pertenecen a la entidad local"],
        ["Clases (art. 79.2-3)", "Bienes de dominio público (destinados a uso o servicio público) y patrimoniales; son comunales los de dominio público cuyo aprovechamiento corresponde al común de los vecinos"],
        ["Uso público (RBEL art. 3)", "Caminos, plazas, calles, paseos, parques, aguas de fuentes y estanques, puentes y demás obras de aprovechamiento general"],
        ["Servicio público (RBEL art. 4)", "Casas Consistoriales, mataderos, mercados, lonjas, hospitales, museos, escuelas, cementerios, elementos de transporte, piscinas y campos de deporte"],
        ["Régimen del dominio público (LBRL art. 80.1)", "Los bienes de dominio público y comunales son inalienables, inembargables e imprescriptibles y no están sujetos a tributo"],
        ["Patrimoniales (RBEL art. 6)", "Los que, siendo propiedad de la entidad, no se destinan a uso o servicio público y pueden ser fuente de ingresos; se rigen por su legislación y, en su defecto, por el Derecho privado"],
        ["Comunales (RBEL art. 2.4)", "Solo pueden pertenecer a los Municipios y a las Entidades locales menores"],
        ["Parcelas sobrantes y efectos no utilizables (RBEL art. 7)", "Bienes patrimoniales: terrenos sin uso adecuado por su extensión, forma o emplazamiento, y bienes deteriorados inaplicables a los servicios"],
        ["Alteración de la calificación (RBEL art. 8)", "Expediente con información pública de un mes y acuerdo por mayoría absoluta del número legal de miembros"],
        ["Alteración automática (RBEL art. 8.4)", "Aprobación definitiva de planes y proyectos, adscripción de bienes patrimoniales a un uso o servicio público durante más de 25 años y usucapión"],
      ],
      preguntas: [
        ["media", "Una plaza pública es un bien…", ["De dominio público, de uso público", "Patrimonial", "Comunal"], "RBEL, art. 3."],
        ["media", "Un mercado municipal es un bien de…", ["Servicio público", "Uso público", "Propios"], "RBEL, art. 4."],
        ["media", "¿Qué caracteres tienen los bienes de dominio público?", ["Inalienables, inembargables e imprescriptibles", "Libremente vendibles", "Embargables"], "LBRL, art. 80.1."],
        ["media", "¿Quién puede ser titular de bienes comunales?", ["Solo los Municipios y las Entidades locales menores", "Cualquier Administración", "Las Diputaciones"], "RBEL, art. 2.4."],
        ["media", "¿Por qué normas se rigen, en defecto de su legislación específica, los bienes patrimoniales?", ["Por el Derecho privado", "Por el Código Penal", "Por las ordenanzas fiscales"], "LBRL, art. 80.2."],
        ["dificil", "¿Cuánto tiempo de adscripción a un uso público convierte automáticamente un bien patrimonial en demanial?", ["Más de 25 años", "Diez años", "Cinco años"], "RBEL, art. 8.4.b)."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Inventario (RBEL art. 17)", "Las Corporaciones deben inventariar todos sus bienes y derechos, con inventarios separados de sus entes dependientes"],
        ["Potestades (RBEL art. 44)", "Investigación, deslinde, recuperación de oficio y desahucio administrativo; además, sanciones según la normativa sectorial"],
        ["Recuperación de oficio (LBRL art. 82.a)", "Los bienes de dominio público pueden recuperarse en cualquier momento; los patrimoniales, en el plazo de un año"],
        ["Plazo de los patrimoniales (RBEL art. 70.2)", "Un año desde el día siguiente a la usurpación; después, acción ante los Tribunales ordinarios"],
        ["Sin interdictos (RBEL art. 70.3)", "No se admiten interdictos contra las actuaciones de los agentes de la autoridad en esta materia"],
        ["Medios compulsorios (RBEL art. 71.3)", "La Corporación puede usar todos los medios legalmente admitidos y comunicar a la autoridad judicial si los hechos parecen delito"],
        ["Usurpaciones recientes (RBEL art. 71.2)", "Para repelerlas no hace falta acompañar los documentos de la posesión al acuerdo"],
        ["Deslinde (LBRL art. 82.b)", "Conforme a la legislación del Patrimonio del Estado y, en su caso, de montes"],
      ],
      preguntas: [
        ["media", "¿Cuándo puede el Ayuntamiento recuperar por sí mismo un bien de dominio público usurpado?", ["En cualquier momento", "Solo en un año", "Nunca, debe acudir al juez"], "LBRL, art. 82.a); RBEL, art. 70.1."],
        ["media", "¿Y un bien patrimonial?", ["En el plazo de un año desde la usurpación", "En cualquier momento", "En diez años"], "RBEL, art. 70.2."],
        ["media", "¿Caben interdictos contra la actuación de los agentes que recuperan un bien municipal?", ["No", "Sí", "Solo si es patrimonial"], "RBEL, art. 70.3."],
        ["media", "¿Qué potestades tienen los Municipios sobre sus bienes?", ["Investigación, deslinde, recuperación de oficio y desahucio administrativo", "Solo la de venta", "Ninguna especial"], "RBEL, art. 44.1."],
        ["dificil", "Si la ocupación de un terreno municipal parece delito, la Corporación…", ["Lo pone en conocimiento de la autoridad judicial", "No hace nada", "Lo vende"], "RBEL, art. 71.3."],
        ["media", "¿Están obligadas las Corporaciones a inventariar sus bienes?", ["Sí, todos sus bienes y derechos", "Solo los inmuebles", "No"], "RBEL, art. 17.1."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Uso común (RBEL art. 75.1)", "El que corresponde por igual a todos sin que el de unos impida el de otros; general si no hay circunstancias singulares, especial si las hay (peligrosidad, intensidad)"],
        ["Uso privativo (art. 75.2)", "Ocupación de una porción del dominio público que limita o excluye su uso por los demás"],
        ["Uso normal y anormal (art. 75.3-4)", "Normal: conforme al destino principal del bien; anormal: no conforme con él"],
        ["Uso común general (art. 76)", "Libre, conforme a la naturaleza de los bienes y a las disposiciones generales"],
        ["Uso común especial (art. 77)", "Sujeto a licencia; directa, o por licitación o sorteo si el número es limitado; no transmisibles si son personales o limitadas"],
        ["Uso privativo o anormal (art. 78)", "Sujetos a concesión administrativa, previa licitación"],
        ["Cesión de patrimoniales (art. 92)", "Arrendamiento según la normativa de contratación; subasta si dura más de cinco años o por precio elevado; canon no inferior al 6 % del valor en venta"],
        ["Viviendas del personal (art. 93)", "Se termina la ocupación por excedencia voluntaria de dos años sin reingreso o por extinción de la relación; la Corporación acuerda y ejecuta el desahucio"],
      ],
      preguntas: [
        ["media", "Instalar un quiosco que ocupa de forma permanente parte de una acera es un uso…", ["Privativo, sujeto a concesión", "Común general", "Común especial sin título"], "RBEL, arts. 75.2 y 78."],
        ["media", "¿Qué título exige el uso común especial del dominio público?", ["Licencia", "Concesión", "Ninguno"], "RBEL, art. 77.1."],
        ["media", "¿Qué título exige un uso privativo?", ["Concesión administrativa previa licitación", "Licencia directa", "Comunicación previa"], "RBEL, art. 78."],
        ["media", "Pasear por un parque es un uso…", ["Común general", "Privativo", "Anormal"], "RBEL, art. 75.1.a)."],
        ["dificil", "¿Qué canon mínimo debe pagarse por la cesión de uso de un bien patrimonial?", ["El 6 % del valor en venta", "El 1 %", "Ninguno"], "RBEL, art. 92.2."],
        ["media", "Si las licencias de uso común especial están limitadas en número, ¿cómo se otorgan?", ["Por licitación o, si no es posible, por sorteo", "A dedo", "Por orden de llegada siempre"], "RBEL, art. 77.2."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Potestad reglamentaria (LBRL art. 4.1.a)", "Corresponde en todo caso a municipios, provincias e islas, junto a la de autoorganización"],
        ["Ordenanza y reglamento", "Ordenanza: norma general municipal que regula relaciones con los ciudadanos; reglamento: norma de organización y funcionamiento (autoorganización)"],
        ["Bandos (LBRL art. 21.1.e)", "Los dicta el Alcalde; en los municipios de gran población, 'bandos, decretos e instrucciones' (art. 124.4.g)"],
        ["Límites (Ley 39/2015, art. 128)", "Los reglamentos no pueden vulnerar la Constitución ni las leyes ni regular materias reservadas a la ley; se sujetan a jerarquía"],
        ["Consulta pública previa (art. 133)", "Antes de redactar el proyecto, consulta en el portal web sobre problemas, necesidad, objetivos y alternativas; después, audiencia e información pública si afecta a derechos"],
        ["Procedimiento general (LBRL art. 49)", "Aprobación inicial por el Pleno; información pública y audiencia de al menos 30 días; resolución de reclamaciones y aprobación definitiva; sin reclamaciones, el acuerdo se entiende definitivo"],
        ["Publicación y vigencia (art. 70.2)", "Se publican en el Boletín Oficial de la Provincia y no entran en vigor hasta la publicación íntegra y el transcurso del plazo del art. 65.2 (quince días hábiles)"],
        ["Intervención (art. 84)", "Ordenanzas y bandos, licencias, comunicación previa o declaración responsable, control posterior y órdenes individuales, con igualdad, necesidad y proporcionalidad"],
        ["Tipificar en ordenanzas (art. 139)", "En defecto de normativa sectorial, las ordenanzas pueden tipificar infracciones de convivencia y uso de espacios públicos (véase Tema 46)"],
      ],
      preguntas: [
        ["media", "¿Quién dicta los bandos municipales?", ["El Alcalde", "El Pleno", "La Junta de Gobierno"], "LBRL, art. 21.1.e)."],
        ["media", "¿Cuál es el plazo mínimo de información pública en la aprobación de una ordenanza según el art. 49 LBRL?", ["Treinta días", "Diez días", "Dos meses"], "LBRL, art. 49.b)."],
        ["media", "Si no se presenta ninguna reclamación, la ordenanza aprobada inicialmente…", ["Se entiende definitivamente aprobada", "Debe volver a votarse", "Caduca"], "Art. 49, párrafo final."],
        ["media", "¿Dónde se publican las ordenanzas locales?", ["En el Boletín Oficial de la Provincia", "En el BOE", "Solo en el tablón"], "Art. 70.2."],
        ["media", "¿Puede un reglamento municipal vulnerar una ley?", ["No", "Sí", "Solo si es urgente"], "Ley 39/2015, art. 128.2."],
        ["dificil", "¿Qué trámite de participación exige el art. 133 de la Ley 39/2015 antes de redactar un proyecto de reglamento?", ["Una consulta pública en el portal web", "Un referéndum", "Un informe del Consejo de Estado"], "Art. 133.1."],
        ["media", "¿Qué medio de intervención municipal en la actividad de los ciudadanos consiste en normas generales?", ["Ordenanzas y bandos", "Licencias", "Órdenes individuales"], "LBRL, art. 84.1.a)."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["Régimen de gran población", "En los municipios de gran población, el Pleno aprueba las ordenanzas y reglamentos (LBRL art. 123.1.d) y la Junta de Gobierno aprueba los proyectos (art. 127.1.a)"],
        ["Zaragoza (Ley 10/2017, art. 48)", "Procedimiento propio para ordenanzas y reglamentos (salvo planeamiento urbanístico), conforme a la legislación del procedimiento administrativo común"],
        ["Iniciativa (art. 48.2)", "El Gobierno de Zaragoza (proyecto normativo), los grupos políticos (proposición) y la iniciativa popular"],
        ["Tramitación de proyectos (art. 48.3)", "Aprobación del proyecto por el Gobierno de Zaragoza; información pública de al menos 30 días naturales; dictamen de la Comisión plenaria; aprobación en acto único por el Pleno; publicación íntegra"],
        ["Proposiciones de grupos (art. 48.4)", "Con memoria, dictamen de la Comisión, información pública de 30 días naturales y aprobación en acto único por el Pleno"],
        ["Ordenanzas fiscales (art. 49)", "Aprobación inicial por la Comisión plenaria, exposición pública de 30 días y aprobación en acto único por el Pleno; sin reclamaciones, se entienden definitivamente aprobadas"],
        ["Enmiendas con gasto (art. 48.6)", "Las que aumentan créditos o reducen ingresos del ejercicio requieren la conformidad del Gobierno de Zaragoza"],
      ],
      preguntas: [
        ["media", "¿Quién aprueba el proyecto de una ordenanza municipal en Zaragoza?", ["El Gobierno de Zaragoza", "El Alcalde solo", "La Comisión plenaria"], "Ley 10/2017, art. 48.3.a)."],
        ["media", "¿Quién aprueba definitivamente la ordenanza?", ["El Pleno, en acto único", "El Gobierno de Zaragoza", "Las Juntas de Distrito"], "Art. 48.3.d)."],
        ["media", "¿Cuál es el plazo mínimo de información pública en Zaragoza?", ["Treinta días naturales", "Quince días hábiles", "Dos meses"], "Art. 48.3.b)."],
        ["media", "¿Pueden los grupos políticos presentar proposiciones de ordenanza?", ["Sí", "No", "Solo la oposición"], "Art. 48.2.b)."],
        ["dificil", "¿Quién aprueba inicialmente una ordenanza fiscal en Zaragoza?", ["La Comisión plenaria correspondiente", "El Pleno", "El Alcalde"], "Art. 49.a)-b)."],
        ["media", "¿Qué norma regula el procedimiento especial de ordenanzas de Zaragoza?", ["La Ley 10/2017 de Capitalidad", "La Ley 7/1999 de Administración Local de Aragón", "El Estatuto de Autonomía"], "Ley 10/2017, art. 48."],
      ],
    },
  ],
  glosario: [
    [S1, "Dominio público", "Bienes destinados a uso o servicio público, inalienables, inembargables e imprescriptibles."],
    [S1, "Bienes de propios", "Otra denominación de los bienes patrimoniales, que pueden producir ingresos."],
    [S1, "Bienes comunales", "Bienes demaniales cuyo aprovechamiento corresponde al común de los vecinos."],
    [S2, "Recuperación de oficio", "Potestad de recuperar por sí misma la posesión de un bien usurpado sin acudir al juez."],
    [S2, "Deslinde", "Potestad de fijar los límites de un bien de la entidad local."],
    [S3, "Uso privativo", "Ocupación de una parte del dominio público que excluye su uso por los demás; requiere concesión."],
    [S3, "Licencia de uso común especial", "Título para un uso del dominio público que, sin excluir a otros, tiene circunstancias especiales."],
    [S4, "Ordenanza", "Norma general municipal que regula relaciones con los ciudadanos."],
    [S4, "Bando", "Disposición del Alcalde para recordar o concretar obligaciones o para situaciones de urgencia."],
    [S5, "Aprobación en acto único", "Aprobación definitiva de una norma por el Pleno de una vez, resolviendo las reclamaciones."],
  ],
  casos: [
    {
      slug: "caso-ocupacion-solar-municipal",
      titulo: "La ocupación de un solar y de una plaza municipal",
      supuesto: "Una empresa ha vallado sin permiso una plaza municipal en Las Fuentes para guardar material, y hace dos años ocupó también un solar patrimonial del Ayuntamiento colindante. Cuando los agentes acuden con los servicios municipales para retirar la valla, la empresa anuncia que recurrirá con un interdicto.",
      preguntas: [
        [S1, "media", "¿Qué tipo de bien es la plaza?", ["De dominio público, uso público", "Patrimonial", "Comunal"], "RBEL, art. 3."],
        [S2, "media", "¿Cuándo puede el Ayuntamiento recuperar la plaza?", ["En cualquier momento, por sí mismo", "Solo en un año", "Nunca sin juez"], "LBRL, art. 82.a)."],
        [S2, "media", "¿Y el solar patrimonial ocupado hace dos años?", ["Ya no por sí mismo: pasado un año, debe acudir a los Tribunales ordinarios", "En cualquier momento", "Nunca"], "RBEL, art. 70.2."],
        [S2, "media", "¿Prospera un interdicto contra la actuación de los agentes?", ["No, no se admiten", "Sí", "Solo si es urgente"], "RBEL, art. 70.3."],
        [S2, "media", "¿Qué medios puede emplear la Corporación?", ["Todos los medios compulsorios legalmente admitidos", "Ninguno", "Solo una carta"], "RBEL, art. 71.3."],
        [S3, "media", "Si la empresa quisiera ocupar legalmente la plaza de forma permanente, ¿qué necesitaría?", ["Una concesión administrativa", "Nada", "Una comunicación previa"], "RBEL, art. 78."],
        [S1, "media", "¿Puede la empresa alegar que ha adquirido la plaza por el paso del tiempo?", ["No, el dominio público es imprescriptible", "Sí, a los diez años", "Sí, a los 30 años"], "LBRL, art. 80.1."],
        [S2, "dificil", "Si los hechos pudieran ser delito de usurpación, el Ayuntamiento…", ["Lo pone en conocimiento de la autoridad judicial", "No puede hacer nada", "Lo archiva"], "RBEL, art. 71.3."],
        [S2, "media", "¿Qué potestad permite fijar los límites del solar?", ["El deslinde", "El desahucio", "La expropiación"], "RBEL, art. 44.1.b)."],
        [S2, "media", "¿Deben figurar ambos bienes en un documento municipal?", ["Sí, en el inventario", "No", "Solo la plaza"], "RBEL, art. 17."],
      ],
    },
    {
      slug: "caso-nueva-ordenanza-convivencia",
      titulo: "Una nueva ordenanza de convivencia",
      supuesto: "El Gobierno de Zaragoza prepara una nueva ordenanza de convivencia que tipificará infracciones en el espacio público. Un grupo de la oposición presenta además su propia proposición. Mientras tanto, ante una ola de calor, el Alcalde dicta un bando con recomendaciones.",
      preguntas: [
        [S4, "media", "¿Qué trámite de participación debe hacerse antes de redactar el proyecto?", ["Consulta pública previa en el portal web", "Ninguno", "Un referéndum"], "Ley 39/2015, art. 133.1."],
        [S5, "media", "¿Quién aprueba el proyecto de ordenanza?", ["El Gobierno de Zaragoza", "El Pleno", "La Policía Local"], "Ley 10/2017, art. 48.3.a)."],
        [S5, "media", "¿Durante cuánto tiempo mínimo se somete a información pública?", ["Treinta días naturales", "Diez días", "Un año"], "Art. 48.3.b)."],
        [S5, "media", "¿Quién emite dictamen antes del Pleno?", ["La Comisión plenaria competente", "El Consejo de Estado", "El Justicia de Aragón"], "Art. 48.3.c)."],
        [S5, "media", "¿Puede el grupo de la oposición presentar su proposición?", ["Sí, con una memoria", "No", "Solo con firmas"], "Art. 48.2.b) y 48.4."],
        [S4, "media", "¿Dónde se publica la ordenanza aprobada?", ["Íntegra en el Boletín Oficial de la Provincia", "En la prensa", "Solo en redes sociales"], "LBRL, art. 70.2; Ley 10/2017, art. 48.3.e)."],
        [S4, "media", "¿Cuándo entra en vigor?", ["Tras su publicación íntegra y el plazo del art. 65.2 LBRL", "Al aprobarse", "Al año"], "LBRL, art. 70.2."],
        [S4, "dificil", "¿Puede la ordenanza tipificar infracciones de convivencia?", ["Sí, en defecto de normativa sectorial, conforme al Título XI de la LBRL", "No, nunca", "Solo con multa de 10 euros"], "LBRL, art. 139."],
        [S4, "media", "¿Quién es competente para dictar el bando por la ola de calor?", ["El Alcalde", "El Pleno", "La Junta Municipal"], "LBRL, arts. 21.1.e) y 124.4.g)."],
        [S4, "media", "En caso de catástrofe o grave riesgo, ¿qué puede hacer el Alcalde?", ["Adoptar personalmente las medidas necesarias dando cuenta inmediata al Pleno", "Nada sin el Pleno", "Suspender la Constitución"], "LBRL, art. 21.1.m)."],
      ],
    },
    {
      slug: "caso-terraza-quiosco-dominio",
      titulo: "Terrazas, quioscos y usos del dominio público",
      supuesto: "En la plaza del Pilar coinciden un vendedor de globos autorizado para un día, un quiosco de prensa fijo con concesión y un grupo de turistas que pasea. Un agente explica en una charla los distintos tipos de uso del dominio público.",
      preguntas: [
        [S3, "media", "Los turistas que pasean hacen un uso…", ["Común general", "Privativo", "Anormal"], "RBEL, art. 75.1.a)."],
        [S3, "media", "El quiosco fijo supone un uso…", ["Privativo", "Común general", "Ninguno"], "RBEL, art. 75.2."],
        [S3, "media", "¿Qué título necesita el quiosco?", ["Concesión administrativa", "Licencia", "Ninguno"], "RBEL, art. 78.1.a)."],
        [S3, "media", "El vendedor ambulante autorizado un día hace un uso común…", ["Especial, sujeto a licencia", "General libre", "Privativo"], "RBEL, arts. 75.1.b) y 77."],
        [S3, "media", "¿Cómo se otorga la concesión del quiosco?", ["Previa licitación", "A dedo", "Por sorteo sin más"], "RBEL, art. 78.2."],
        [S1, "media", "¿Qué tipo de bien es la plaza?", ["Dominio público de uso público", "Patrimonial", "Comunal"], "RBEL, art. 3."],
        [S3, "media", "¿Es transmisible una licencia cuyo número está limitado?", ["No", "Sí", "Solo a familiares"], "RBEL, art. 77.3."],
        [S3, "dificil", "¿Qué uso es el que no se ajusta al destino principal del bien?", ["Anormal", "Normal", "Común"], "RBEL, art. 75.4."],
        [S1, "media", "¿Puede embargarse la plaza para pagar una deuda municipal?", ["No, es inembargable", "Sí", "Solo una parte"], "LBRL, art. 80.1."],
        [S4, "media", "¿Qué norma municipal regula en concreto las actividades comerciales en terrenos públicos de Zaragoza?", ["Una ordenanza municipal (véase el Tema 47)", "Un bando", "El Código Civil"], "LBRL, art. 84; ORACITP."],
      ],
    },
  ],
});
