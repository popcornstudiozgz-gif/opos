/**
 * Crea tema-370 — Tema 43 de Policía Local: "El Municipio de Zaragoza:
 * Distritos municipales. Calles, Plazas. Edificios públicos. Monumentos,
 * vías de acceso al término municipal."
 *
 * Tema de conocimiento del municipio, sin ley única; cada dato se ha
 * verificado en esta sesión en una fuente oficial:
 * - Reglamento de Órganos Territoriales y de Participación Ciudadana
 *   (aprob. definitiva Pleno 28-07-2005, BOPZ núm. 288 de 17-12-2005;
 *   modificación por la creación del Distrito Sur, Pleno 22-12-2017, BOPZ
 *   núm. 44 de 23-02-2018), ficha zaragoza.es/sede/servicio/normativa/109:
 *   art. 2 (dieciséis distritos y catorce barrios rurales), art. 17 (Pleno
 *   de la Junta Municipal: Presidente y diez Vocales), art. 33 (Juntas
 *   Vecinales: cuatro o seis Vocales según población). Contrastado con el
 *   directorio de Juntas del portal de participación (15 Juntas
 *   Municipales y 14 Juntas Vecinales).
 * - Casa Consistorial (Plaza del Pilar, 18) y Edificio Seminario (Vía
 *   Hispanidad, 20): pie de la sede electrónica municipal.
 * - Folleto municipal "Zaragoza, la ciudad de las dos catedrales"
 *   (zaragoza.es/cont/paginas/turismo/pdf/dos catedrales esp.pdf), leído
 *   íntegro; página municipal "Arquitectura Mudéjar: Patrimonio Mundial";
 *   ficha de Turismo de Aragón para la Aljafería como sede de las Cortes.
 * - Página municipal de turismo "Cómo llegar por carretera" (AP-2, AP-68,
 *   A-23, A-2, N-II, N-330, N-232, Z-40 y Z-30) y art. 15 de la Ordenanza
 *   de Movilidad Urbana (Z-30 y Z-20 como vías estructurantes).
 * No se fabrican direcciones de edificios ni listados de calles no
 * verificados: el callejero que exige la convocatoria de Bombero no forma
 * parte de las bases de Policía Local (CONV 7.1/2026).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-370-municipio-zaragoza-distritos-monumentos-accesos.mjs
 */
import { sembrarTema, POLICIA } from "./lib/sembrar-tema.mjs";

const REGLAMENTO = "https://www.zaragoza.es/sede/servicio/normativa/109";
const JUNTAS = "https://www.zaragoza.es/sede/portal/participacion/en-tu-barrio/servicio/distrito/";
const CATEDRALES = "https://www.zaragoza.es/cont/paginas/turismo/pdf/dos%20catedrales%20esp.pdf";
const MUDEJAR = "https://www.zaragoza.es/sede/portal/turismo/ver-y-hacer/patrimonio-mundial";
const CARRETERA = "https://www.zaragoza.es/sede/portal/turismo/post/por-carretera";
const S1 = "distritos-barrios-rurales";
const S2 = "juntas-municipales-vecinales";
const S3 = "edificios-publicos-plaza-pilar";
const S4 = "monumentos-patrimonio-mundial";
const S5 = "vias-acceso-cinturones";

await sembrarTema({
  tema: {
    slug: "tema-370",
    titulo: "El municipio de Zaragoza: distritos, edificios públicos, monumentos y vías de acceso",
    descripcion: "Los dieciséis distritos del término municipal (quince urbanos y el Distrito Rural con catorce barrios rurales) según el Reglamento de Órganos Territoriales y de Participación Ciudadana; Juntas Municipales y Juntas Vecinales; sedes municipales (Casa Consistorial y Edificio Seminario); la Plaza del Pilar y sus edificios; monumentos: Basílica del Pilar, Catedral del Salvador (La Seo), Aljafería, San Pablo y la arquitectura mudéjar Patrimonio Mundial; vías de acceso por carretera y cinturones de circunvalación (Z-40, Z-30 y Z-20).",
    contenido: "Lo que un policía local debe saber de su ciudad: en qué distritos y barrios rurales se divide Zaragoza y cómo se gobiernan, dónde están las sedes del Ayuntamiento, cuáles son los grandes monumentos (y cuáles son Patrimonio Mundial) y por qué carreteras y rondas se entra y se circula por el término municipal. Todos los datos están contrastados con documentos oficiales del Ayuntamiento.",
    enlaces_boe: [
      { url: REGLAMENTO, titulo: "Reglamento de Órganos Territoriales y de Participación Ciudadana de Zaragoza (BOPZ núm. 288 de 17-12-2005; modif. BOPZ núm. 44 de 23-02-2018)" },
      { url: JUNTAS, titulo: "Juntas Municipales y Vecinales (portal de participación del Ayuntamiento de Zaragoza)" },
      { url: CATEDRALES, titulo: "Zaragoza, la ciudad de las dos catedrales (folleto de Zaragoza Turismo)" },
      { url: MUDEJAR, titulo: "Arquitectura Mudéjar: Patrimonio Mundial (Zaragoza Turismo)" },
      { url: CARRETERA, titulo: "Cómo llegar por carretera (Zaragoza Turismo)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "Distritos y barrios rurales (art. 2 del Reglamento de Órganos Territoriales)", articulos: "art. 2", url: REGLAMENTO },
      { seccion: S2, titulo: "Juntas Municipales y Juntas Vecinales", articulos: "arts. 17 y 33", url: REGLAMENTO },
      { seccion: S3, titulo: "Sedes municipales y Plaza del Pilar", url: CATEDRALES },
      { seccion: S4, titulo: "Monumentos y Patrimonio Mundial mudéjar", url: MUDEJAR },
      { seccion: S5, titulo: "Vías de acceso y cinturones de circunvalación", url: CARRETERA },
    ],
  },
  vinculo: { oposicion: POLICIA.oposicion, bloqueId: POLICIA.bloqueParte2, numero: 43 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Distritos (art. 2)", "Divisiones territoriales propias con órganos de gestión desconcentrada (Juntas Municipales y Vecinales) para impulsar la participación, sin perjuicio de la unidad de gobierno del municipio"],
        ["Cuántos son", "Dieciséis: quince urbanos y el Distrito Rural, que comprende los catorce barrios rurales"],
        ["Distritos urbanos I", "Centro, Casco Histórico, Delicias, Universidad, San José, Las Fuentes, Almozara y Oliver-Valdefierro"],
        ["Distritos urbanos II", "Torrero, Actur-Rey Fernando, El Rabal, Casablanca, Santa Isabel, Miralbueno y Sur"],
        ["Distrito Sur", "El más reciente: se creó con la modificación del reglamento aprobada por el Pleno el 22-12-2017 (BOPZ núm. 44, de 23-02-2018)"],
        ["Barrios rurales I", "Alfocea, Casetas, Garrapinillos, Juslibol, La Cartuja Baja, Montañana y Monzalbarba"],
        ["Barrios rurales II", "Movera, Peñaflor, San Gregorio, San Juan de Mozarrifar, Torrecilla de Valmadrid, Venta del Olivar y Villarrapa"],
        ["Gobierno de cada uno", "Los distritos se rigen por Juntas Municipales y los barrios rurales por Juntas Vecinales"],
      ],
      preguntas: [
        ["media", "¿Cuántos distritos tiene el término municipal de Zaragoza según el Reglamento de Órganos Territoriales?", ["Dieciséis, incluido el Distrito Rural", "Diez", "Veinte"], "Art. 2."],
        ["media", "¿Cuántos barrios rurales comprende el Distrito Rural?", ["Catorce", "Doce", "Dieciséis"], "Art. 2."],
        ["media", "¿Cuál de estos es un distrito urbano de Zaragoza?", ["Miralbueno", "Casetas", "Movera"], "Art. 2."],
        ["media", "¿Cuál de estos es un barrio rural?", ["Peñaflor", "Torrero", "Delicias"], "Art. 2."],
        ["dificil", "¿Qué distrito se creó con la modificación del reglamento publicada en el BOPZ de 23-02-2018?", ["Sur", "Miralbueno", "Casablanca"], "Ficha del Reglamento en la sede electrónica."],
        ["media", "¿Qué órgano rige los barrios rurales?", ["La Junta Vecinal", "La Junta Municipal", "El Consejo de Ciudad"], "Art. 2."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Juntas Municipales", "Rigen los quince distritos urbanos; hay quince Juntas Municipales"],
        ["Pleno de la Junta Municipal (art. 17)", "Presidente y diez Vocales nombrados por el Alcalde a propuesta de los grupos políticos con representación en el Ayuntamiento"],
        ["Juntas Vecinales", "Rigen los catorce barrios rurales; hay catorce Juntas Vecinales"],
        ["Vocales de la Junta Vecinal (art. 33)", "Cuatro si el barrio tiene menos de 2.000 habitantes; seis en los demás"],
        ["Finalidad", "Gestión desconcentrada y participación ciudadana en los asuntos municipales, sin romper la unidad de gobierno"],
      ],
      preguntas: [
        ["media", "¿Cuántos Vocales integran, además del Presidente, el Pleno de una Junta Municipal?", ["Diez", "Seis", "Cuatro"], "Art. 17."],
        ["media", "¿Quién nombra a los Vocales de las Juntas Municipales?", ["El Alcalde, a propuesta de los grupos políticos municipales", "Los vecinos por votación directa", "El Gobierno de Aragón"], "Art. 17."],
        ["media", "¿Cuántos Vocales tiene una Junta Vecinal de un barrio de menos de 2.000 habitantes?", ["Cuatro", "Seis", "Diez"], "Art. 33."],
        ["media", "¿Cuántas Juntas Municipales hay en Zaragoza?", ["Quince", "Dieciséis", "Catorce"], "Directorio de Juntas del Ayuntamiento."],
        ["dificil", "¿Cuántas Juntas, entre Municipales y Vecinales, hay en total?", ["Veintinueve", "Dieciséis", "Treinta"], "Directorio de Juntas: 15 Municipales + 14 Vecinales."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Casa Consistorial", "Plaza del Pilar, 18"],
        ["Edificio Seminario", "Vía Hispanidad, 20: sede de servicios municipales"],
        ["Teléfonos municipales", "010 y 976 721 100 (información municipal)"],
        ["Plaza del Pilar", "Gran espacio público de la ciudad: Basílica del Pilar, Catedral del Salvador (La Seo), la Lonja, el Ayuntamiento y la Fuente de la Hispanidad"],
        ["Aljafería", "Palacio hispanomusulmán del siglo XI, sede de las Cortes de Aragón"],
      ],
      preguntas: [
        ["facil", "¿Dónde está la Casa Consistorial de Zaragoza?", ["Plaza del Pilar, 18", "Plaza de España, 1", "Paseo de la Independencia, 1"], "Sede electrónica municipal."],
        ["media", "¿En qué vía está el Edificio Seminario?", ["Vía Hispanidad, 20", "Calle Mayor, 20", "Avenida de Madrid, 20"], "Sede electrónica municipal."],
        ["media", "¿Qué institución tiene su sede en el Palacio de la Aljafería?", ["Las Cortes de Aragón", "El Ayuntamiento", "El Tribunal Superior de Justicia"], "Ficha de Turismo de Aragón."],
        ["media", "¿Qué fuente monumental está en la Plaza del Pilar?", ["La Fuente de la Hispanidad", "La Fuente de Neptuno", "La Fuente de Goya"], "Folleto municipal de las dos catedrales."],
        ["media", "¿Qué número de teléfono municipal de información se marca en Zaragoza?", ["010", "112", "092"], "Sede electrónica municipal."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Las dos catedrales", "Zaragoza tiene dos catedrales en la Plaza del Pilar: la Basílica del Pilar y la Catedral del Salvador (La Seo)"],
        ["Basílica del Pilar", "Templo barroco de cuatro altas torres y cúpulas de cerámica esmaltada; en la Santa Capilla se venera la Virgen del Pilar"],
        ["Goya en el Pilar", "Cúpula Regina Martyrum, pintada por Francisco de Goya en 1781"],
        ["Retablo mayor del Pilar", "De Damián Forment (1509-1515), en alabastro: obra maestra del Renacimiento aragonés"],
        ["La Seo", "Construida sobre el foro romano y la mezquita mayor; combina románico, gótico, mudéjar, renacentista y barroco; retablo mayor gótico de Pere Johan y Museo de Tapices"],
        ["Parroquieta de San Miguel", "Muro mudéjar del siglo XIV de La Seo, parte de la arquitectura mudéjar Patrimonio Mundial"],
        ["San Pablo", "Iglesia de los siglos XIII-XVIII, la 'tercera catedral', con esbelta torre octogonal; su torre e iglesia son Patrimonio Mundial desde 2001"],
        ["Mudéjar Patrimonio Mundial", "La inscripción de 1986 (Teruel) se amplió en 2001 a la Arquitectura Mudéjar de Aragón, con La Seo, San Pablo y la Aljafería en Zaragoza"],
      ],
      preguntas: [
        ["media", "¿Quién pintó la cúpula Regina Martyrum del Pilar?", ["Francisco de Goya", "Damián Forment", "Pere Johan"], "Folleto municipal de las dos catedrales."],
        ["media", "¿Sobre qué edificios previos se levantó La Seo?", ["El foro romano y la mezquita mayor", "Un castillo templario", "El teatro romano"], "Folleto municipal."],
        ["media", "¿De qué estilo es la basílica actual del Pilar?", ["Barroco", "Gótico", "Románico"], "Folleto municipal."],
        ["media", "¿Quién realizó el retablo mayor del Pilar?", ["Damián Forment", "Goya", "Pere Johan"], "Folleto municipal."],
        ["dificil", "¿Qué tres monumentos de Zaragoza se incluyeron en 2001 en la Arquitectura Mudéjar de Aragón Patrimonio Mundial?", ["La Seo, San Pablo y la Aljafería", "El Pilar, la Lonja y la Aljafería", "La Seo, el Pilar y el Ayuntamiento"], "Páginas municipales de turismo."],
        ["media", "¿Qué iglesia se conoce como la 'tercera catedral' de Zaragoza?", ["San Pablo", "San Gil", "Santa Engracia"], "Página municipal de Patrimonio Mundial."],
        ["media", "¿Qué museo alberga La Seo?", ["El Museo de Tapices", "El Museo Goya", "El Museo de Zaragoza"], "Folleto municipal."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["Nudo de comunicaciones", "Se llega por autovía desde Madrid, Huesca, Teruel y Valencia y por autopista desde Barcelona, Bilbao y Pamplona"],
        ["Autopistas", "AP-2 (Zaragoza-Barcelona) y AP-68 (Zaragoza-Bilbao)"],
        ["Autovías", "A-2 (Madrid-Zaragoza) y A-23, Autovía Mudéjar"],
        ["Carreteras nacionales", "N-II (Madrid-Zaragoza-Barcelona), N-330 (Levante-Francia por Zaragoza) y N-232 (Santander-Logroño-Zaragoza-Vinaròs)"],
        ["Z-40", "Autovía de circunvalación exterior (cuarto cinturón)"],
        ["Z-30", "Cinturón interior que facilita el acceso a los distintos barrios"],
        ["Vías estructurantes (OMU, art. 15)", "Las circunvalaciones Z-30 y Z-20 y las vías de penetración son vías de primer rango y primera categoría de la malla básica"],
      ],
      preguntas: [
        ["media", "¿Qué autopista une Zaragoza con Bilbao?", ["AP-68", "AP-2", "A-23"], "Página municipal 'Cómo llegar por carretera'."],
        ["media", "¿Cómo se denomina la A-23?", ["Autovía Mudéjar", "Autovía del Ebro", "Autovía del Nordeste"], "Página municipal."],
        ["media", "¿Qué cinturón es la autovía de circunvalación exterior de Zaragoza?", ["Z-40", "Z-30", "Z-20"], "Página municipal."],
        ["media", "¿Qué carretera nacional une el Levante con Francia por Zaragoza?", ["N-330", "N-232", "N-II"], "Página municipal."],
        ["media", "Según la Ordenanza de Movilidad Urbana, las rondas Z-30 y Z-20 son vías…", ["Estructurantes, de primer rango y primera categoría", "Locales", "De zona 30"], "OMU, art. 15.1.a."],
        ["media", "¿Qué autopista une Zaragoza con Barcelona?", ["AP-2", "AP-68", "A-68"], "Página municipal."],
      ],
    },
  ],
  glosario: [
    [S1, "Distrito", "División territorial del municipio con órganos de gestión desconcentrada y participación ciudadana."],
    [S1, "Distrito Rural", "Distrito que agrupa los catorce barrios rurales del término municipal."],
    [S2, "Junta Municipal", "Órgano que rige cada distrito urbano, con un Presidente y diez Vocales."],
    [S2, "Junta Vecinal", "Órgano que rige cada barrio rural, con cuatro o seis Vocales según su población."],
    [S3, "Casa Consistorial", "Sede del Ayuntamiento de Zaragoza, en la Plaza del Pilar, 18."],
    [S3, "Edificio Seminario", "Sede de servicios municipales en la Vía Hispanidad, 20."],
    [S4, "Mudéjar", "Arte de tradición islámica en territorio cristiano; la arquitectura mudéjar de Aragón es Patrimonio Mundial."],
    [S4, "Santa Capilla", "Espacio de la Basílica del Pilar donde se venera la imagen de la Virgen."],
    [S5, "Cinturón de circunvalación", "Vía que rodea la ciudad (Z-40, Z-30, Z-20) y distribuye el tráfico entre accesos y barrios."],
    [S5, "Vía de penetración", "Vía que conecta las carreteras de acceso con los cinturones y el interior de la ciudad."],
  ],
  casos: [
    {
      slug: "caso-turista-plaza-pilar",
      titulo: "Información a un turista en la Plaza del Pilar",
      supuesto: "Un agente de servicio en la Plaza del Pilar atiende a un grupo de turistas que quiere visitar los principales monumentos de la ciudad y luego seguir viaje a Bilbao por carretera. Le preguntan también dónde pueden presentar una queja ante el Ayuntamiento.",
      preguntas: [
        [S3, "media", "¿Qué edificio municipal está en la propia Plaza del Pilar?", ["La Casa Consistorial, en el número 18", "El Edificio Seminario", "Ninguno"], "Sede electrónica municipal."],
        [S4, "media", "¿Cuáles son las dos catedrales de la plaza?", ["La Basílica del Pilar y la Catedral del Salvador (La Seo)", "San Pablo y la Seo", "El Pilar y San Gil"], "Folleto municipal."],
        [S4, "media", "Si quieren ver una obra de Goya en el Pilar, ¿qué deben buscar?", ["La cúpula Regina Martyrum", "El retablo mayor", "La torre-mirador"], "Folleto municipal."],
        [S4, "media", "¿Qué parte de La Seo es Patrimonio Mundial por su arte mudéjar?", ["El muro de la Parroquieta de San Miguel", "La torre barroca", "El Museo de Tapices"], "Folleto municipal."],
        [S4, "media", "¿Qué otro monumento mudéjar Patrimonio Mundial pueden visitar, que alberga las Cortes de Aragón?", ["La Aljafería", "La Lonja", "El Pilar"], "Páginas municipales y Turismo de Aragón."],
        [S4, "media", "¿Qué iglesia tiene una torre octogonal mudéjar Patrimonio Mundial?", ["San Pablo", "Santa Engracia", "San Miguel de los Navarros"], "Página municipal de Patrimonio Mundial."],
        [S5, "media", "¿Por qué autopista seguirán viaje a Bilbao?", ["AP-68", "AP-2", "A-23"], "Página municipal 'Cómo llegar por carretera'."],
        [S5, "media", "¿Qué cinturón exterior pueden usar para salir sin cruzar la ciudad?", ["La Z-40", "La Z-30", "La Z-20"], "Página municipal."],
        [S3, "media", "¿A qué teléfono municipal de información pueden llamar?", ["010", "091", "016"], "Sede electrónica municipal."],
        [S4, "dificil", "¿En qué año se amplió la declaración de Patrimonio Mundial a la arquitectura mudéjar de Zaragoza?", ["2001", "1986", "2008"], "Páginas municipales de turismo."],
      ],
    },
    {
      slug: "caso-aviso-barrio-rural",
      titulo: "Un aviso desde un barrio rural",
      supuesto: "La sala del 092 recibe una llamada desde Montañana sobre un problema de tráfico en una calle del barrio. El vecino quiere además que su Junta lo trate en la próxima sesión. Días después, otro vecino de Valdefierro plantea una cuestión similar ante su Junta.",
      preguntas: [
        [S1, "media", "¿Montañana es un distrito urbano o un barrio rural?", ["Un barrio rural del Distrito Rural", "Un distrito urbano", "Un municipio distinto"], "Reglamento de Órganos Territoriales, art. 2."],
        [S2, "media", "¿Qué órgano rige Montañana?", ["Una Junta Vecinal", "Una Junta Municipal", "El Consejo Sectorial"], "Art. 2."],
        [S1, "media", "¿A qué distrito pertenece Valdefierro?", ["Al distrito Oliver-Valdefierro", "Al Distrito Rural", "A Delicias"], "Art. 2."],
        [S2, "media", "¿Qué órgano rige el distrito Oliver-Valdefierro?", ["Una Junta Municipal", "Una Junta Vecinal", "Ninguno"], "Art. 2."],
        [S2, "media", "¿Cuántos Vocales tiene el Pleno de esa Junta Municipal, además del Presidente?", ["Diez", "Cuatro", "Seis"], "Art. 17."],
        [S2, "dificil", "Si Montañana tiene más de 2.000 habitantes, ¿cuántos Vocales tiene su Junta Vecinal?", ["Seis", "Cuatro", "Diez"], "Art. 33."],
        [S1, "media", "¿Rompen los distritos la unidad de gobierno del municipio?", ["No, se crean sin perjuicio de la unidad de gobierno y gestión", "Sí", "Solo los rurales"], "Art. 2."],
        [S1, "media", "¿Cuál de estos también es un barrio rural?", ["Juslibol", "Universidad", "San José"], "Art. 2."],
        [S1, "media", "¿Cuál es la finalidad de los distritos?", ["Impulsar la participación ciudadana en la gestión municipal mediante órganos desconcentrados", "Recaudar impuestos propios", "Elegir al Alcalde"], "Art. 2."],
        [S1, "media", "¿Cuántos distritos urbanos tiene Zaragoza?", ["Quince", "Dieciséis", "Catorce"], "Art. 2 (dieciséis incluido el Rural)."],
      ],
    },
    {
      slug: "caso-transporte-especial-accesos",
      titulo: "Un transporte especial que entra en Zaragoza",
      supuesto: "Un transporte especial de grandes dimensiones procedente de Madrid debe llegar a un polígono del sur de la ciudad. La Policía Local tiene que fijar el itinerario de acompañamiento desde la entrada al término municipal, evitando las calles del centro.",
      preguntas: [
        [S5, "media", "¿Por qué vías llega el transporte desde Madrid?", ["Por la A-2 o la N-II", "Por la AP-68", "Por la N-232 desde Vinaròs"], "Página municipal 'Cómo llegar por carretera'."],
        [S5, "media", "¿Qué cinturón exterior permite rodear la ciudad?", ["La Z-40", "La Z-20", "Ninguno"], "Página municipal."],
        [S5, "media", "¿Qué cinturón interior da acceso a los barrios?", ["La Z-30", "La Z-40", "La A-23"], "Página municipal."],
        [S5, "media", "En la Ordenanza de Movilidad Urbana, ¿qué categoría tienen la Z-30 y la Z-20?", ["Vías estructurantes de primer rango", "Calles residenciales", "Caminos rurales"], "OMU, art. 15.1.a."],
        [S5, "dificil", "¿Quién otorga el permiso municipal para cada ocasión a un transporte especial?", ["La Policía Local", "La Junta Municipal del distrito", "El Gobierno de Aragón"], "OMU, art. 96."],
        [S1, "media", "Si el polígono está en el distrito creado en 2018, ¿cuál es?", ["El distrito Sur", "El distrito Centro", "El Distrito Rural"], "Ficha del Reglamento de Órganos Territoriales."],
        [S5, "media", "Si el transporte viniera de Teruel, ¿qué autovía usaría?", ["La A-23, Autovía Mudéjar", "La AP-2", "La AP-68"], "Página municipal."],
        [S5, "media", "¿Y si viniera de Barcelona por autopista?", ["La AP-2", "La AP-68", "La A-23"], "Página municipal."],
        [S5, "media", "¿Por qué la Policía planifica el recorrido por las rondas?", ["Para evitar las calles del centro y las vías de menor rango", "Por obligación turística", "No hay motivo"], "OMU, arts. 15 y 96."],
        [S5, "media", "¿Qué carretera une Santander, Logroño, Zaragoza y Vinaròs?", ["La N-232", "La N-330", "La N-II"], "Página municipal."],
      ],
    },
  ],
});
