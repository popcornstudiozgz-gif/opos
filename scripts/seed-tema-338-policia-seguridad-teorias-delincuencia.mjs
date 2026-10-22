/**
 * Crea tema-338 — Tema 11 de Policía Local: "La Policía y su función en la
 * sociedad. La seguridad. Concepto. Seguridad individual y seguridad
 * colectiva. Seguridad pública y seguridad privada. La inseguridad. Teorías
 * explicativas de la delincuencia: Concepto, modelos explicativos y clases
 * de delincuencia."
 *
 * Fuentes normativas leídas en esta sesión (API del BOE, títulos
 * verificados): Constitución, art. 104 (BOE-A-1978-31229); LO 2/1986 de
 * Fuerzas y Cuerpos de Seguridad, art. 1 (BOE-A-1986-6859); LO 4/2015 de
 * protección de la seguridad ciudadana, arts. 1, 3 y 4 (BOE-A-2015-3442);
 * Ley 5/2014 de Seguridad Privada, arts. 1, 2, 4, 8 y 14 (BOE-A-2014-3649).
 *
 * La parte de criminología (conceptos de seguridad subjetiva e
 * inseguridad, escuelas y teorías de la delincuencia, clases de
 * delincuencia) no tiene norma que la regule: se trata como conocimiento
 * académico consolidado. Se buscó en esta sesión un temario oficial público
 * de alguna escuela de policía que pudiera citarse y no se encontró. Solo
 * se recogen atribuciones de autoría ampliamente asentadas en la
 * criminología (Beccaria, Lombroso, Durkheim, Merton, Sutherland, Cohen,
 * Becker, Wilson y Kelling, Cohen y Felson) y no se dan cifras.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-338-policia-seguridad-teorias-delincuencia.mjs
 */
import { sembrarTema, POLICIA } from "./lib/sembrar-tema.mjs";

const CE = "https://www.boe.es/buscar/act.php?id=BOE-A-1978-31229";
const LOFCS = "https://www.boe.es/buscar/act.php?id=BOE-A-1986-6859";
const LOPSC = "https://www.boe.es/buscar/act.php?id=BOE-A-2015-3442";
const LSP = "https://www.boe.es/buscar/act.php?id=BOE-A-2014-3649";
const S1 = "policia-funcion-social";
const S2 = "seguridad-concepto-clases";
const S3 = "seguridad-privada";
const S4 = "inseguridad-percepcion";
const S5 = "teorias-delincuencia";
const S6 = "clases-delincuencia";

await sembrarTema({
  tema: {
    slug: "tema-338",
    titulo: "La Policía y la seguridad; teorías explicativas de la delincuencia",
    descripcion: "La Policía y su función en la sociedad democrática (CE art. 104, LOFCS); concepto de seguridad, seguridad individual y colectiva, seguridad ciudadana como bien jurídico colectivo (LO 4/2015) y seguridad pública como competencia del Estado; seguridad privada (Ley 5/2014): concepto, fines, principios y colaboración con las Fuerzas y Cuerpos de Seguridad; la inseguridad objetiva y subjetiva; teorías explicativas de la delincuencia (escuela clásica, positivismo, anomia, asociación diferencial, subculturas, etiquetamiento, ventanas rotas, actividades rutinarias y elección racional) y clases de delincuencia.",
    contenido: "Para qué sirve la Policía en una sociedad democrática, qué se entiende por seguridad (la de cada persona y la de todos), qué diferencia hay entre la seguridad pública y la privada (vigilantes, detectives) y por qué la sensación de inseguridad no siempre coincide con la delincuencia real. Cierra con un repaso de las principales teorías que explican por qué se delinque y de los tipos de delincuencia, materia de cultura criminológica general.",
    enlaces_boe: [
      { url: CE, titulo: "Constitución Española, art. 104 (BOE-A-1978-31229)" },
      { url: LOFCS, titulo: "Ley Orgánica 2/1986, de Fuerzas y Cuerpos de Seguridad (BOE-A-1986-6859)" },
      { url: LOPSC, titulo: "Ley Orgánica 4/2015, de protección de la seguridad ciudadana (BOE-A-2015-3442)" },
      { url: LSP, titulo: "Ley 5/2014, de 4 de abril, de Seguridad Privada (BOE-A-2014-3649)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "La Policía y su función en la sociedad", articulos: "CE art. 104; LOFCS art. 1", url: `${CE}#a104` },
      { seccion: S2, titulo: "La seguridad: concepto, individual y colectiva, pública y ciudadana", articulos: "LO 4/2015, arts. 1, 3 y 4", url: `${LOPSC}#a1` },
      { seccion: S3, titulo: "La seguridad privada", articulos: "Ley 5/2014, arts. 1-14", url: `${LSP}#a1` },
      { seccion: S4, titulo: "La inseguridad: objetiva y subjetiva", url: "" },
      { seccion: S5, titulo: "Teorías explicativas de la delincuencia", url: "" },
      { seccion: S6, titulo: "Clases de delincuencia", url: "" },
    ],
  },
  vinculo: { oposicion: POLICIA.oposicion, bloqueId: POLICIA.bloqueParte1, numero: 11 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Misión constitucional (CE art. 104.1)", "Las Fuerzas y Cuerpos de Seguridad, bajo la dependencia del Gobierno, protegen el libre ejercicio de los derechos y libertades y garantizan la seguridad ciudadana"],
        ["Seguridad pública (LOFCS art. 1.1)", "Es competencia exclusiva del Estado y su mantenimiento corresponde al Gobierno de la Nación"],
        ["Corporaciones Locales (LOFCS art. 1.3)", "Participan en el mantenimiento de la seguridad pública en los términos de la LBRL y de la LOFCS"],
        ["Policía en democracia", "Su función es servir a la comunidad garantizando derechos, no solo reprimir: prevención, auxilio, mediación y persecución del delito bajo el principio de legalidad"],
        ["Policía de proximidad", "Modelo de trabajo cercano al ciudadano y al barrio, orientado a la prevención y la resolución de problemas, propio de las Policías Locales"],
        ["Principios básicos de actuación", "Los del art. 5 LOFCS (véase el Tema 32), a los que remite la LO 4/2015 (art. 4.2)"],
      ],
      preguntas: [
        ["facil", "¿Qué artículo de la Constitución define la misión de las Fuerzas y Cuerpos de Seguridad?", ["El 104", "El 149", "El 18"], "CE, art. 104.1."],
        ["media", "¿A quién corresponde, según la LOFCS, la competencia exclusiva en seguridad pública?", ["Al Estado", "A los municipios", "A las comunidades autónomas"], "LOFCS, art. 1.1."],
        ["media", "¿Participan las Corporaciones Locales en el mantenimiento de la seguridad pública?", ["Sí, en los términos de la LBRL y la LOFCS", "No", "Solo en Madrid"], "LOFCS, art. 1.3."],
        ["media", "¿Qué misión tienen las Fuerzas y Cuerpos de Seguridad según la Constitución?", ["Proteger el libre ejercicio de los derechos y libertades y garantizar la seguridad ciudadana", "Defender la soberanía exterior", "Recaudar tributos"], "CE, art. 104.1."],
        ["media", "¿Qué modelo policial se basa en la cercanía al ciudadano y la prevención en el barrio?", ["La policía de proximidad", "La policía militar", "La policía secreta"], "Conocimiento policial general."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Seguridad ciudadana (LO 4/2015, art. 1.1)", "Requisito indispensable para el pleno ejercicio de los derechos y libertades; su salvaguarda, como bien jurídico colectivo, es función del Estado"],
        ["Objeto de la LO 4/2015 (art. 1.2)", "Proteger a las personas y bienes y mantener la tranquilidad de los ciudadanos"],
        ["Fines (art. 3)", "Libre ejercicio de derechos, funcionamiento de las instituciones, convivencia, protección de personas y bienes (en especial menores y personas con discapacidad), uso pacífico de vías públicas, servicios básicos y prevención de delitos"],
        ["Principios (art. 4.1)", "Legalidad, igualdad de trato y no discriminación, oportunidad, proporcionalidad, eficacia, eficiencia y responsabilidad"],
        ["Intervención justificada (art. 4.3)", "Solo ante una amenaza concreta o un comportamiento objetivamente peligroso que pueda causar un perjuicio real a la seguridad"],
        ["Seguridad individual y colectiva", "Individual: la de cada persona en su vida, integridad, libertad y bienes (CE art. 17); colectiva: la de la comunidad en su conjunto, como bien de todos"],
        ["Seguridad pública y ciudadana", "La pública abarca la protección del orden y de las instituciones frente a riesgos graves; la ciudadana se refiere a la tranquilidad y convivencia en el espacio público"],
      ],
      preguntas: [
        ["media", "¿Cómo califica la LO 4/2015 la seguridad ciudadana?", ["Como un bien jurídico de carácter colectivo", "Como un derecho privado", "Como una competencia municipal exclusiva"], "LO 4/2015, art. 1.1."],
        ["media", "¿Cuál de estos es un principio rector de la acción de los poderes públicos en seguridad ciudadana?", ["Proporcionalidad", "Arbitrariedad", "Secreto"], "Art. 4.1."],
        ["media", "¿Qué justifica una intervención según la LO 4/2015?", ["Una amenaza concreta o un comportamiento objetivamente peligroso", "Una sospecha genérica", "El aspecto de una persona"], "Art. 4.3."],
        ["media", "¿A qué colectivos presta especial atención la LO 4/2015?", ["Menores y personas con discapacidad necesitadas de especial protección", "Turistas", "Empresarios"], "Art. 3.e)."],
        ["dificil", "Según la LO 4/2015, ¿cómo deben interpretarse sus disposiciones respecto de los derechos de reunión y manifestación?", ["Del modo más favorable a la plena efectividad de los derechos fundamentales", "Restrictivamente", "Libremente por cada agente"], "Art. 4.1, párrafo segundo."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Objeto (Ley 5/2014, art. 1)", "Regular las actividades y servicios de seguridad privada y las investigaciones privadas, y su coordinación con las Fuerzas y Cuerpos de Seguridad, de los que son complementarios"],
        ["Seguridad privada (art. 2.1)", "Actividades, servicios, funciones y medidas prestados por empresas de seguridad, despachos de detectives y personal habilitado frente a actos deliberados o riesgos accidentales"],
        ["Prestadores (art. 2.6)", "Empresas de seguridad privada, despachos de detectives y personal habilitado"],
        ["Fines (art. 4)", "Satisfacer necesidades legítimas de seguridad de los usuarios, contribuir a la seguridad pública y complementar el monopolio de la seguridad que corresponde al Estado"],
        ["Colaboración (art. 8.2-3)", "Colaboran en todo momento con las Fuerzas y Cuerpos de Seguridad y siguen sus instrucciones en lo que afecte a la seguridad pública"],
        ["Prohibiciones (art. 8.4)", "No intervenir en reuniones, manifestaciones o conflictos políticos o laborales, no controlar opiniones ni tratar datos de ideología o religión, y guardar secreto salvo ante autoridades judiciales y policiales"],
        ["Comunicación de delitos (art. 14.2)", "Deben comunicar cuanto antes a las Fuerzas y Cuerpos de Seguridad los hechos delictivos y las informaciones relevantes para la seguridad ciudadana"],
      ],
      preguntas: [
        ["media", "¿Qué relación tiene la seguridad privada con las Fuerzas y Cuerpos de Seguridad?", ["Es complementaria y está subordinada a la colaboración con ellas", "Las sustituye", "Es independiente"], "Ley 5/2014, arts. 1.2 y 4.c)."],
        ["media", "¿Pueden los vigilantes de seguridad intervenir en una manifestación?", ["No", "Sí", "Solo si es violenta"], "Art. 8.4.a)."],
        ["media", "¿Quiénes son prestadores de servicios de seguridad privada?", ["Empresas de seguridad, despachos de detectives y personal habilitado", "Cualquier persona", "Los policías locales"], "Art. 2.6."],
        ["media", "¿Qué deben hacer los vigilantes que conocen un delito en su servicio?", ["Comunicarlo cuanto antes a las Fuerzas y Cuerpos de Seguridad", "Investigarlo por su cuenta", "Nada"], "Art. 14.2."],
        ["dificil", "¿Pueden las empresas de seguridad tratar datos sobre la religión de las personas?", ["No", "Sí", "Solo con contrato"], "Art. 8.4.b)."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Inseguridad objetiva", "Riesgo real de ser víctima, medible por indicadores como la delincuencia registrada o las encuestas de victimización"],
        ["Inseguridad subjetiva", "Sensación o miedo al delito que percibe la población, que no siempre coincide con la objetiva"],
        ["Factores de la percepción", "Experiencias previas de victimización, vulnerabilidad personal, deterioro del entorno (suciedad, vandalismo, falta de iluminación), cobertura mediática y confianza en las instituciones"],
        ["Cifra negra", "Parte de la delincuencia que no llega a conocimiento de las autoridades porque no se denuncia o no se detecta"],
        ["Encuestas de victimización", "Preguntan a la población si ha sido víctima de delitos, denunciados o no; ayudan a estimar la cifra negra"],
        ["Respuesta policial", "Presencia visible, proximidad, atención a la víctima y mejora del entorno reducen la inseguridad subjetiva además de la objetiva"],
      ],
      preguntas: [
        ["media", "¿Qué es la cifra negra de la criminalidad?", ["La delincuencia que no llega a conocimiento de las autoridades", "Los delitos cometidos de noche", "Los delitos con armas"], "Conocimiento criminológico general."],
        ["media", "La sensación de miedo al delito de la población es la inseguridad…", ["Subjetiva", "Objetiva", "Jurídica"], "Conocimiento criminológico general."],
        ["media", "¿Qué instrumento ayuda a estimar la cifra negra?", ["Las encuestas de victimización", "Los presupuestos", "El padrón"], "Conocimiento criminológico general."],
        ["media", "¿Coinciden siempre la inseguridad objetiva y la subjetiva?", ["No", "Sí", "Solo en ciudades pequeñas"], "Conocimiento criminológico general."],
        ["media", "¿Cuál de estos factores aumenta la sensación de inseguridad?", ["El deterioro del entorno, como el vandalismo o la falta de iluminación", "La presencia policial visible", "La limpieza urbana"], "Conocimiento criminológico general."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["Escuela clásica", "Beccaria (siglo XVIII): el delito es una elección libre y racional; la pena debe ser proporcionada, cierta y legal"],
        ["Positivismo criminológico", "Lombroso (siglo XIX): buscó causas biológicas del delito ('delincuente nato'); hoy se estudia solo como antecedente histórico, superado científicamente"],
        ["Anomia", "Durkheim: ausencia o debilitamiento de normas en la sociedad; Merton: tensión entre las metas culturales y los medios legítimos para alcanzarlas"],
        ["Asociación diferencial", "Sutherland: la conducta delictiva se aprende en interacción con otras personas, como cualquier otra conducta"],
        ["Subculturas delictivas", "Cohen: grupos, sobre todo juveniles, que desarrollan valores propios contrarios a los dominantes"],
        ["Etiquetamiento (labelling)", "Becker: la desviación depende en parte de la reacción social; etiquetar a alguien como delincuente puede consolidar su carrera delictiva"],
        ["Ventanas rotas", "Wilson y Kelling: el desorden y el deterioro no atendidos transmiten abandono y favorecen delitos más graves"],
        ["Actividades rutinarias", "Cohen y Felson: el delito surge cuando coinciden un delincuente motivado, un objetivo adecuado y la ausencia de un guardián capaz"],
        ["Elección racional", "El delincuente valora costes y beneficios; la prevención situacional busca aumentar el esfuerzo y el riesgo y reducir la recompensa"],
      ],
      preguntas: [
        ["media", "¿A qué autor se asocia la escuela clásica del Derecho penal y la proporcionalidad de las penas?", ["Beccaria", "Lombroso", "Merton"], "Conocimiento criminológico general."],
        ["media", "¿Qué teoría sostiene que el delito se aprende en interacción con otras personas?", ["La asociación diferencial de Sutherland", "La teoría del delincuente nato", "La de las ventanas rotas"], "Conocimiento criminológico general."],
        ["media", "¿Qué teoría relaciona el desorden no atendido con la aparición de delitos más graves?", ["Las ventanas rotas", "La anomia", "El etiquetamiento"], "Conocimiento criminológico general."],
        ["media", "Según la teoría de las actividades rutinarias, ¿qué tres elementos deben coincidir?", ["Delincuente motivado, objetivo adecuado y ausencia de guardián capaz", "Pobreza, desempleo y droga", "Noche, lluvia y soledad"], "Conocimiento criminológico general."],
        ["dificil", "¿Qué autor explicó la anomia como tensión entre metas culturales y medios legítimos?", ["Merton", "Becker", "Beccaria"], "Conocimiento criminológico general."],
        ["media", "¿Qué teoría destaca el efecto de la reacción social y de la 'etiqueta' de delincuente?", ["El etiquetamiento", "La elección racional", "La escuela clásica"], "Conocimiento criminológico general."],
        ["media", "¿Cómo se considera hoy la teoría del 'delincuente nato' de Lombroso?", ["Superada científicamente; se estudia como antecedente histórico", "Plenamente vigente", "Base del Código Penal"], "Conocimiento criminológico general."],
      ],
    },
    {
      seccion: S6,
      flashcards: [
        ["Por su gravedad (Código Penal)", "Delitos graves, menos graves y leves, según la pena (véase el Tema 14)"],
        ["Delincuencia común o convencional", "Delitos contra el patrimonio y las personas más frecuentes (hurtos, robos, lesiones)"],
        ["Delincuencia juvenil", "La cometida por menores de 18 años, sujeta a la LO 5/2000 de responsabilidad penal del menor (véase el Tema 28)"],
        ["Delincuencia organizada", "Grupos estructurados y estables para cometer delitos graves con fines de lucro (tráfico de drogas, trata, blanqueo)"],
        ["Delincuencia de 'cuello blanco'", "Expresión de Sutherland para los delitos cometidos por personas de posición social elevada en su actividad profesional (económicos, corrupción)"],
        ["Delincuencia violenta", "La que emplea violencia o intimidación contra las personas"],
        ["Ciberdelincuencia", "Delitos cometidos a través de sistemas informáticos o contra ellos (estafas en línea, acoso, daños informáticos)"],
        ["Delincuencia ocasional y habitual", "Ocasional: hechos aislados; habitual o profesional: actividad delictiva reiterada como forma de vida"],
      ],
      preguntas: [
        ["media", "¿A qué autor se debe la expresión 'delincuencia de cuello blanco'?", ["Sutherland", "Lombroso", "Beccaria"], "Conocimiento criminológico general."],
        ["media", "La delincuencia cometida por menores de 18 años se rige por…", ["La LO 5/2000 de responsabilidad penal del menor", "El Código Civil", "La Ley de Tráfico"], "LO 5/2000, art. 1."],
        ["media", "Un grupo estable y jerarquizado dedicado al tráfico de drogas es un ejemplo de delincuencia…", ["Organizada", "Ocasional", "Juvenil"], "Conocimiento criminológico general."],
        ["media", "Una estafa a través de una tienda falsa en Internet es un caso de…", ["Ciberdelincuencia", "Delincuencia violenta", "Delito leve de tráfico"], "Conocimiento criminológico general."],
        ["media", "Según el Código Penal, por su gravedad los delitos se clasifican en…", ["Graves, menos graves y leves", "Faltas y delitos", "Civiles y penales"], "Código Penal, art. 13."],
      ],
    },
  ],
  glosario: [
    [S1, "Policía de proximidad", "Modelo policial basado en la cercanía al ciudadano, la prevención y la resolución de problemas del barrio."],
    [S2, "Seguridad ciudadana", "Bien jurídico colectivo que garantiza la tranquilidad y el libre ejercicio de los derechos en el espacio público."],
    [S2, "Seguridad pública", "Competencia exclusiva del Estado para proteger el orden y las instituciones, en la que participan las Corporaciones Locales."],
    [S3, "Seguridad privada", "Servicios de seguridad prestados por empresas, detectives y personal habilitado, complementarios de la seguridad pública."],
    [S4, "Cifra negra", "Delincuencia real que no consta en las estadísticas oficiales por no denunciarse o no detectarse."],
    [S4, "Inseguridad subjetiva", "Miedo o percepción de riesgo de ser víctima de un delito."],
    [S5, "Anomia", "Situación de debilitamiento de las normas sociales que orientan la conducta."],
    [S5, "Prevención situacional", "Estrategia que modifica el entorno para dificultar el delito y aumentar el riesgo de ser descubierto."],
    [S6, "Delincuencia organizada", "La cometida por grupos estructurados y estables para obtener beneficios ilícitos."],
    [S6, "Cuello blanco", "Delincuencia económica o profesional cometida por personas de posición social elevada."],
  ],
  casos: [
    {
      slug: "caso-barrio-percepcion-inseguridad",
      titulo: "Un barrio que se siente inseguro",
      supuesto: "Los vecinos de una zona de un distrito de Zaragoza denuncian ante la Junta Municipal que 'ya no se puede salir por la noche'. Los datos de denuncias apenas han variado, pero hay farolas fundidas, pintadas, solares sucios y grupos que beben en la calle. La Jefatura encarga a una unidad de proximidad un plan de actuación.",
      preguntas: [
        [S4, "media", "Si las denuncias no aumentan pero crece el miedo, el problema principal es de inseguridad…", ["Subjetiva", "Objetiva", "Jurídica"], "Conocimiento criminológico general."],
        [S4, "media", "¿Por qué los datos de denuncias pueden no reflejar toda la realidad?", ["Por la cifra negra de delitos no denunciados", "Porque son falsos", "Porque no hay delitos"], "Conocimiento criminológico general."],
        [S5, "media", "¿Qué teoría explica que la suciedad y las pintadas no atendidas favorezcan delitos más graves?", ["Las ventanas rotas", "La escuela clásica", "La asociación diferencial"], "Conocimiento criminológico general."],
        [S5, "media", "Reparar las farolas para aumentar la vigilancia natural es una medida de…", ["Prevención situacional", "Etiquetamiento", "Anomia"], "Conocimiento criminológico general."],
        [S1, "media", "¿Qué modelo policial encaja mejor con este encargo?", ["La policía de proximidad", "La intervención exclusivamente represiva", "Ninguna actuación"], "Conocimiento policial general."],
        [S2, "media", "Según la LO 4/2015, ¿qué fin está en juego con el consumo de alcohol en la calle y el deterioro del entorno?", ["La preservación de la seguridad y la convivencia ciudadanas y el uso pacífico de las vías públicas", "La defensa nacional", "La política exterior"], "LO 4/2015, art. 3.c) y f)."],
        [S5, "dificil", "Según la teoría de las actividades rutinarias, ¿qué aporta la presencia policial visible?", ["Un guardián capaz que reduce la oportunidad del delito", "Un objetivo adecuado", "Un delincuente motivado"], "Conocimiento criminológico general."],
        [S4, "media", "¿Qué instrumento permitiría conocer mejor la victimización real del barrio?", ["Una encuesta de victimización", "Un bando", "Una multa"], "Conocimiento criminológico general."],
        [S2, "media", "¿Qué principio exige que las medidas sean adecuadas a la gravedad del problema?", ["Proporcionalidad", "Oportunismo", "Secreto"], "LO 4/2015, art. 4.1."],
        [S1, "media", "¿Qué norma prevé la participación de las Corporaciones Locales en la seguridad pública?", ["La LOFCS, art. 1.3", "El Código Civil", "La Ley de Tráfico"], "LOFCS, art. 1.3."],
      ],
    },
    {
      slug: "caso-vigilante-centro-comercial",
      titulo: "Un vigilante en un centro comercial",
      supuesto: "Un vigilante de seguridad de un centro comercial retiene a una persona que ha sustraído productos y llama a la Policía Local. Mientras esperan, el vigilante quiere registrar el móvil del sospechoso y pregunta a los agentes si puede intervenir también en una concentración sindical que se celebra en la puerta.",
      preguntas: [
        [S3, "media", "¿Qué debe hacer el vigilante ante el hecho delictivo?", ["Comunicarlo cuanto antes a las Fuerzas y Cuerpos de Seguridad y ponerse a su disposición", "Juzgarlo él mismo", "Dejarlo marchar sin más"], "Ley 5/2014, art. 14.2."],
        [S3, "media", "¿Puede intervenir el vigilante en la concentración sindical?", ["No, tiene prohibido intervenir en reuniones, manifestaciones o conflictos laborales", "Sí", "Solo si se lo pide la empresa"], "Art. 8.4.a)."],
        [S3, "media", "¿Qué relación tiene el vigilante con los agentes que llegan?", ["Debe colaborar y seguir sus instrucciones en lo que afecte a la seguridad pública", "Ninguna", "Les da órdenes"], "Art. 8.3."],
        [S3, "media", "¿Puede el vigilante comunicar a terceros lo que sabe del cliente?", ["No, salvo a las autoridades judiciales y policiales", "Sí, a cualquiera", "Sí, a la prensa"], "Art. 8.4.c)."],
        [S3, "media", "La seguridad privada respecto de la pública es…", ["Complementaria", "Sustitutiva", "Superior"], "Art. 1.2."],
        [S2, "media", "¿A quién corresponde la competencia exclusiva sobre la seguridad pública?", ["Al Estado", "A las empresas de seguridad", "Al centro comercial"], "LOFCS, art. 1.1."],
        [S6, "media", "Un hurto en un comercio es un ejemplo de delincuencia…", ["Común o convencional", "Organizada siempre", "De cuello blanco"], "Conocimiento criminológico general."],
        [S3, "dificil", "¿Cuál es uno de los fines de la seguridad privada según la Ley 5/2014?", ["Complementar el monopolio de la seguridad que corresponde al Estado", "Sustituir a la Policía", "Juzgar delitos leves"], "Art. 4.c)."],
        [S1, "media", "¿Cuál es la misión constitucional de la Policía que acude?", ["Proteger el libre ejercicio de los derechos y libertades y garantizar la seguridad ciudadana", "Defender los intereses del centro comercial", "Cobrar las mercancías"], "CE, art. 104.1."],
        [S5, "media", "Si el sospechoso fuera un joven que actúa con un grupo que valora el hurto como prueba de pertenencia, ¿qué teoría lo explicaría?", ["Las subculturas delictivas", "La escuela clásica", "La de las ventanas rotas"], "Conocimiento criminológico general."],
      ],
    },
    {
      slug: "caso-charla-instituto-delincuencia",
      titulo: "Una charla en un instituto",
      supuesto: "Dos agentes de la Policía Local dan una charla en un instituto sobre prevención de la delincuencia juvenil. Los alumnos preguntan por qué algunos jóvenes acaban delinquiendo, qué pasa si se les 'marca' como conflictivos y qué tipos de delitos ven más los agentes.",
      preguntas: [
        [S5, "media", "Si un joven aprende a delinquir porque su grupo de amigos lo hace, ¿qué teoría lo explica?", ["La asociación diferencial", "La escuela clásica", "El positivismo biológico"], "Conocimiento criminológico general."],
        [S5, "media", "Si un joven etiquetado como 'delincuente' acaba asumiendo esa identidad, ¿qué teoría lo describe?", ["El etiquetamiento", "La elección racional", "Las actividades rutinarias"], "Conocimiento criminológico general."],
        [S5, "media", "Si un joven delinque porque no tiene medios legítimos para alcanzar el éxito que la sociedad valora, ¿qué teoría lo explica?", ["La anomia de Merton", "Las ventanas rotas", "La escuela clásica"], "Conocimiento criminológico general."],
        [S6, "media", "¿Qué norma regula la responsabilidad penal de los menores de 18 años?", ["La LO 5/2000", "El Código Civil", "La LO 4/2015"], "LO 5/2000."],
        [S6, "media", "El acoso a un compañero por redes sociales es una forma de…", ["Ciberdelincuencia", "Delincuencia de cuello blanco", "Delincuencia organizada"], "Conocimiento criminológico general."],
        [S1, "media", "¿Qué tipo de actuación policial es esta charla?", ["Preventiva y de proximidad", "Represiva", "Judicial"], "Conocimiento policial general."],
        [S5, "media", "¿Qué teoría parte de que el delincuente valora costes y beneficios antes de actuar?", ["La elección racional", "El etiquetamiento", "La anomia"], "Conocimiento criminológico general."],
        [S4, "dificil", "¿Por qué muchas agresiones entre adolescentes no aparecen en las estadísticas?", ["Porque no se denuncian (cifra negra)", "Porque no existen", "Porque son legales"], "Conocimiento criminológico general."],
        [S6, "media", "¿Cómo se clasifican los delitos por su gravedad en el Código Penal?", ["Graves, menos graves y leves", "Mayores y menores", "Civiles y administrativos"], "Código Penal, art. 13."],
        [S2, "media", "¿Qué fin de la LO 4/2015 destaca la especial protección de los alumnos menores?", ["La protección de personas y bienes, con especial atención a los menores", "El funcionamiento de las instituciones", "La transparencia"], "LO 4/2015, art. 3.e)."],
      ],
    },
  ],
});
