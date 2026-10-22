/**
 * Crea tema-340 — Tema 13 de Policía Local: "El problema del consumo de
 * droga y alcohol en la sociedad actual. Repercusiones en la seguridad
 * ciudadana. Instrumentos de apoyo al drogodependiente."
 *
 * Fuentes leídas en esta sesión:
 * - Ley 3/2001, de 4 de abril, de prevención, asistencia y reinserción
 *   social en materia de drogodependencias de Aragón (BOE-A-2001-9342,
 *   título verificado en la API del BOE; texto consolidado de diciembre de
 *   2025): arts. 1-3, 13, 20-22, 24 y 27 (listado). Sus normas sobre tabaco
 *   (arts. 13-14) son anteriores a la legislación estatal posterior y no se
 *   preguntan como vigentes en detalle.
 * - LO 4/2015 de protección de la seguridad ciudadana (BOE-A-2015-3442):
 *   arts. 36.16-19, 37.17, 39.1 y disposición adicional quinta.
 * - Ordenanza municipal del consumo indebido de bebidas alcohólicas de
 *   Zaragoza (BOPZ nº 229, 03-10-2020), ya leída para tema-375.
 * - Carta de servicios y páginas municipales del Centro Municipal de
 *   Atención y Prevención de las Adicciones (CMAPA): servicio gratuito y
 *   confidencial, en la avenida Pablo Ruiz Picasso, 59. No se dan datos
 *   estadísticos de consumo.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-340-drogas-alcohol-seguridad.mjs
 */
import { sembrarTema, POLICIA } from "./lib/sembrar-tema.mjs";

const L3 = "https://www.boe.es/buscar/act.php?id=BOE-A-2001-9342";
const LOPSC = "https://www.boe.es/buscar/act.php?id=BOE-A-2015-3442";
const CMAPA = "https://zaragoza.es/sede/portal/calidad/centro-atencion";
const S1 = "drogas-conceptos";
const S2 = "drogas-principios-prevencion";
const S3 = "drogas-seguridad-ciudadana";
const S4 = "alcohol-convivencia-trafico";
const S5 = "apoyo-drogodependiente";

await sembrarTema({
  tema: {
    slug: "tema-340",
    titulo: "Drogas y alcohol: repercusiones en la seguridad ciudadana y apoyo al drogodependiente",
    descripcion: "Conceptos de droga, drogodependencia, abuso, prevención, desintoxicación, deshabituación y reinserción (Ley 3/2001 de Aragón); principios rectores y enfoque de salud; repercusiones del consumo en la seguridad ciudadana: infracciones de la LO 4/2015 (consumo y tenencia en lugares públicos, cultivo visible, tolerancia en locales, alcohol que perturba la tranquilidad) y suspensión de multas a menores que acceden a tratamiento; el alcohol en la vía pública y en la conducción; recursos de apoyo: niveles de atención de la red aragonesa, criterios de actuación, ámbito judicial y penitenciario y el Centro Municipal de Atención y Prevención de las Adicciones (CMAPA) de Zaragoza.",
    contenido: "Qué se considera droga (incluidos el alcohol y el tabaco), por qué la ley aragonesa trata la drogodependencia como un problema de salud, qué consecuencias tiene el consumo para la seguridad (multas por consumir o llevar droga en la calle, botellón, conducción bajo los efectos) y qué recursos existen para ayudar a quien tiene una adicción, empezando por el centro municipal de Zaragoza (CMAPA), gratuito y confidencial, al que el agente puede orientar.",
    enlaces_boe: [
      { url: L3, titulo: "Ley 3/2001, de 4 de abril, de prevención, asistencia y reinserción social en materia de drogodependencias de Aragón (BOE-A-2001-9342)" },
      { url: LOPSC, titulo: "Ley Orgánica 4/2015, de protección de la seguridad ciudadana (BOE-A-2015-3442)" },
      { url: CMAPA, titulo: "Carta de servicios del Centro Municipal de Atención y Prevención de las Adicciones (Ayuntamiento de Zaragoza)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "Conceptos: droga, drogodependencia, abuso, prevención, desintoxicación, deshabituación y reinserción", articulos: "Ley 3/2001, art. 2", url: `${L3}#a2` },
      { seccion: S2, titulo: "Principios rectores y prevención", articulos: "Ley 3/2001, arts. 1-8", url: `${L3}#a3` },
      { seccion: S3, titulo: "Repercusiones en la seguridad ciudadana", articulos: "LO 4/2015, arts. 36, 37 y 39 y D.A. 5.ª", url: `${LOPSC}#a36` },
      { seccion: S4, titulo: "Alcohol en la vía pública y en la conducción", url: "https://www.zaragoza.es/sede/servicio/normativa/12063" },
      { seccion: S5, titulo: "Instrumentos de apoyo al drogodependiente", articulos: "Ley 3/2001, arts. 19-27; CMAPA", url: `${L3}#a2-2` },
    ],
  },
  vinculo: { oposicion: POLICIA.oposicion, bloqueId: POLICIA.bloqueParte1, numero: 13 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Droga (Ley 3/2001, art. 2.1)", "Sustancia que, administrada al organismo, puede alterar el sistema nervioso central y generar dependencia física, psíquica o ambas"],
        ["Se consideran drogas (art. 2.1)", "Estupefacientes y psicótropos fiscalizados, bebidas alcohólicas de más del 1 % de graduación, tabaco y productos industriales o domésticos con esos efectos (inhalables)"],
        ["Drogodependencia (art. 2.2.a)", "Estado psíquico, y a veces físico, con modificaciones de conducta y una pulsión a consumir de forma continua o periódica"],
        ["Abuso o uso indebido (art. 2.2.b)", "Patrón desadaptativo de consumo con consecuencias adversas significativas y recurrentes"],
        ["Prevención (art. 2.2.c)", "Estrategias para reducir la demanda, limitar la oferta y reducir las consecuencias del consumo"],
        ["Desintoxicación (art. 2.2.d)", "Medidas terapéuticas para interrumpir el consumo continuado"],
        ["Deshabituación (art. 2.2.e)", "Rehabilitación para eliminar la conducta drogodependiente actuando sobre sus causas"],
        ["Reinserción social (art. 2.2.f)", "Proceso de integración plena de la persona en la sociedad en igualdad de condiciones"],
      ],
      preguntas: [
        ["media", "¿Es el alcohol una droga a efectos de la Ley 3/2001 de Aragón?", ["Sí, las bebidas de más del 1 % de graduación", "No", "Solo los licores"], "Ley 3/2001, art. 2.1.b)."],
        ["media", "¿Es el tabaco una droga a efectos de la Ley 3/2001?", ["Sí", "No", "Solo para menores"], "Art. 2.1.c)."],
        ["media", "La interrupción del consumo continuado mediante medidas terapéuticas es la…", ["Desintoxicación", "Deshabituación", "Reinserción"], "Art. 2.2.d)."],
        ["media", "El proceso que actúa sobre los factores que originaron la dependencia es la…", ["Deshabituación", "Desintoxicación", "Prevención"], "Art. 2.2.e)."],
        ["dificil", "¿Pueden considerarse drogas los productos de uso doméstico, como algunos pegamentos inhalables?", ["Sí, si producen los efectos descritos", "No", "Solo si son importados"], "Art. 2.1.d)."],
        ["media", "¿Qué objetivo tiene la reinserción social?", ["La integración plena de la persona en la sociedad en igualdad de condiciones", "Su internamiento", "Su sanción"], "Art. 2.2.f)."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Objeto (Ley 3/2001, art. 1)", "Coordinar las entidades que actúan en drogodependencias y regular la prevención, la asistencia y la reinserción, la formación y la investigación"],
        ["Problema de salud (art. 3.a)", "Las drogodependencias se consideran problemas de salud con repercusiones biológicas, psicológicas, sociales y familiares"],
        ["Otros principios (art. 3)", "Hábitos saludables y solidaridad, prioridad de la prevención, integración en los sistemas educativo, sanitario y social, responsabilidad pública y participación de la comunidad"],
        ["Tipos de prevención", "Universal (a toda la población), selectiva (grupos de riesgo) e indicada (personas que ya presentan consumos problemáticos)"],
        ["Ámbitos de prevención", "Escolar, familiar, comunitario, laboral y del ocio, con programas de información, educación para la salud y alternativas de ocio"],
        ["Venta de tabaco a menores (art. 13.1)", "Prohibida la venta y suministro de tabaco a menores de 18 años en Aragón"],
      ],
      preguntas: [
        ["media", "¿Cómo considera la Ley 3/2001 las drogodependencias?", ["Como problemas de salud con repercusiones biológicas, psicológicas y sociales", "Como delitos", "Como asuntos privados"], "Ley 3/2001, art. 3.a)."],
        ["media", "¿Qué intervenciones son prioritarias según la ley aragonesa?", ["Las de prevención", "Las sancionadoras", "Las penitenciarias"], "Art. 3.c)."],
        ["media", "¿Puede venderse tabaco a un menor de 18 años en Aragón?", ["No", "Sí", "Con permiso paterno"], "Art. 13.1."],
        ["media", "La prevención dirigida a toda la población escolar es…", ["Universal", "Indicada", "Selectiva"], "Conocimiento general de prevención."],
        ["dificil", "¿En qué sistemas deben integrarse las actuaciones en drogodependencias?", ["Educativo, sanitario y de servicios sociales", "Solo el policial", "Solo el judicial"], "Art. 3.d)."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Consumo o tenencia en lugares públicos (LO 4/2015, art. 36.16)", "Infracción grave: consumo o tenencia ilícitos de drogas en lugares, vías, establecimientos públicos o transportes colectivos, aunque no sea para traficar, y abandonar los instrumentos usados"],
        ["Traslado para facilitar drogas (art. 36.17)", "Infracción grave: llevar a personas en vehículo para facilitarles el acceso a drogas, si no es delito"],
        ["Cultivo visible (art. 36.18)", "Infracción grave: plantar o cultivar drogas en lugares visibles al público, si no es delito"],
        ["Tolerancia en locales (art. 36.19)", "Infracción grave: que los responsables toleren el consumo o tráfico en sus locales o no actúen con diligencia para impedirlo"],
        ["Alcohol que perturba (art. 37.17)", "Infracción leve: consumir alcohol en lugares o transportes públicos cuando perturbe gravemente la tranquilidad ciudadana"],
        ["Multas (art. 39.1)", "Graves: de 601 a 30.000 euros; leves: de 100 a 600 euros"],
        ["Menores y tratamiento (D.A. 5.ª)", "Las multas a menores por consumo o tenencia pueden suspenderse si, a su solicitud y de sus representantes, se someten a tratamiento, rehabilitación o actividades de reeducación"],
        ["Tráfico (Código Penal)", "El tráfico de drogas es delito (art. 368, véase el Tema 23); la tenencia para consumo propio en la vía pública es infracción administrativa"],
        ["Repercusiones en la seguridad", "Delitos para financiar el consumo, violencia ligada al tráfico, accidentes de tráfico, conflictos de convivencia y deterioro de espacios públicos"],
      ],
      preguntas: [
        ["media", "Consumir cannabis en la vía pública es, según la LO 4/2015, una infracción…", ["Grave", "Leve", "Muy grave"], "LO 4/2015, art. 36.16."],
        ["media", "¿Es infracción abandonar en la calle las jeringuillas usadas?", ["Sí, grave, junto con el consumo o la tenencia", "No", "Solo si hay niños"], "Art. 36.16."],
        ["media", "Consumir alcohol en la vía pública perturbando gravemente la tranquilidad es, según la LO 4/2015, infracción…", ["Leve", "Grave", "Muy grave"], "Art. 37.17."],
        ["media", "¿Qué multa corresponde a una infracción grave de la LO 4/2015?", ["De 601 a 30.000 euros", "De 100 a 600 euros", "De 30.001 a 600.000 euros"], "Art. 39.1."],
        ["dificil", "¿Puede suspenderse la multa por consumo a un menor que acepta someterse a tratamiento?", ["Sí, a su solicitud y de sus representantes legales", "No", "Solo si paga la mitad"], "LO 4/2015, disposición adicional quinta."],
        ["media", "Cultivar marihuana en un balcón visible desde la calle es, si no es delito, infracción…", ["Grave", "Leve", "No es infracción"], "Art. 36.18."],
        ["media", "El encargado de un bar que tolera el trapicheo en su local comete una infracción…", ["Grave", "Leve", "Ninguna"], "Art. 36.19."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Botellón en Zaragoza", "La Ordenanza municipal prohíbe beber alcohol con fines de ocio en grupos de tres o más personas en espacios públicos (véase el Tema 48)"],
        ["Venta en la vía pública", "La Ordenanza prohíbe vender alcohol desde coches, carritos, tenderetes o neveras y la venta ambulante fuera de ferias autorizadas"],
        ["Menores", "Proveer de alcohol a menores es infracción muy grave de la Ordenanza; los menores de 14 años están exentos de responsabilidad y se comunica al Ministerio Fiscal"],
        ["Alcohol y conducción", "Las tasas máximas, las pruebas y las sanciones están en la Ley de Tráfico y el Reglamento General de Circulación (Temas 37 y 38); por encima de ciertos límites, delito del art. 379.2 CP (Tema 24)"],
        ["Repercusiones del alcohol", "Accidentes de tráfico, agresiones, ruidos y molestias, suciedad en el espacio público y riesgos para la salud, sobre todo de los jóvenes"],
        ["Respuesta coordinada", "Policía Local, servicios sociales, salud y educación: sanción cuando procede y derivación a recursos de prevención y tratamiento"],
      ],
      preguntas: [
        ["media", "¿Dónde se regula en Zaragoza la prohibición del botellón?", ["En la Ordenanza del consumo indebido de bebidas alcohólicas (2020)", "En la LO 4/2015 exclusivamente", "En el Código Penal"], "Ordenanza municipal, art. 6."],
        ["media", "¿Qué norma fija las tasas máximas de alcohol para conducir?", ["La Ley de Tráfico y el Reglamento General de Circulación", "La Ley 3/2001 de Aragón", "La Ordenanza de limpieza"], "Véanse los Temas 37 y 38."],
        ["media", "Proveer de alcohol a menores es, según la Ordenanza de Zaragoza, una infracción…", ["Muy grave", "Leve", "Grave"], "Ordenanza municipal, art. 12.1.a)."],
        ["media", "¿Qué repercusión del alcohol afecta más directamente a la seguridad vial?", ["Los accidentes de tráfico", "La suciedad", "El precio de las bebidas"], "Conocimiento general."],
        ["dificil", "¿Qué delito del Código Penal castiga conducir con una tasa de alcohol superior a 0,60 mg/l en aire espirado?", ["El del art. 379.2", "El del art. 368", "El del art. 384"], "Código Penal, art. 379.2 (véase el Tema 24)."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["Criterios de atención (Ley 3/2001, art. 20)", "Preferentemente comunitaria y cercana al entorno, gratuita en la red pública, diversificada e individualizada, con especial atención a adolescentes, confidencial y voluntaria salvo excepciones legales"],
        ["Primer nivel (art. 21.2.A)", "Equipos de atención primaria, servicios sociales de base, servicios municipales de drogodependencias, asociaciones de apoyo y servicios de prevención de riesgos laborales"],
        ["Segundo nivel (art. 21.2.B)", "Centros de salud mental, unidades de desintoxicación hospitalaria, comunidades terapéuticas, centros de día, pisos de acogida y talleres ocupacionales"],
        ["Centros de atención (art. 22)", "Con libro de registro, personal técnico cualificado, programa terapéutico temporalizado y libro de reclamaciones"],
        ["Ámbito judicial y penitenciario (art. 24)", "Programas en prisión, alternativas a la privación de libertad cuando el penado tiene una adicción y asesoramiento a drogodependientes detenidos"],
        ["CMAPA de Zaragoza", "Centro Municipal de Atención y Prevención de las Adicciones: atención gratuita y confidencial a personas con adicciones (alcohol, tabaco, cannabis, cocaína, juego, tecnologías) y a sus familias, con tratamiento biopsicosocial y programas de prevención"],
        ["Dirección del CMAPA", "Avenida Pablo Ruiz Picasso, 59, Zaragoza; la primera cita se pide presencialmente"],
        ["Papel del agente", "Informar y orientar hacia los recursos, especialmente a jóvenes y familias, y coordinarse con servicios sociales y sanitarios"],
      ],
      preguntas: [
        ["media", "¿Es gratuita la atención a los drogodependientes en la red pública aragonesa?", ["Sí", "No", "Solo para menores"], "Ley 3/2001, art. 20.1.b)."],
        ["media", "¿Pertenecen los servicios municipales de drogodependencias al primer nivel de atención?", ["Sí", "No, al segundo", "No forman parte de la red"], "Art. 21.2.A).c)."],
        ["media", "Una comunidad terapéutica pertenece al…", ["Segundo nivel de atención", "Primer nivel", "Ámbito penitenciario exclusivamente"], "Art. 21.2.B).c)."],
        ["media", "¿Es voluntario, como regla general, iniciar y cesar un tratamiento?", ["Sí, salvo los casos de la legislación vigente", "No, es obligatorio", "Solo para adultos"], "Art. 20.1.e)."],
        ["media", "¿Qué recurso municipal de Zaragoza atiende de forma gratuita y confidencial las adicciones?", ["El Centro Municipal de Atención y Prevención de las Adicciones (CMAPA)", "La Policía Local", "El Registro Civil"], "Carta de servicios del CMAPA."],
        ["dificil", "¿Atiende el CMAPA adicciones sin sustancia, como el juego o el uso de tecnologías?", ["Sí", "No", "Solo el juego"], "Páginas municipales del CMAPA."],
        ["media", "¿Qué prevé la ley aragonesa para penados con adicción a estupefacientes?", ["Recursos para medidas alternativas a la privación de libertad", "Penas más duras", "Nada"], "Art. 24.c)."],
      ],
    },
  ],
  glosario: [
    [S1, "Droga", "Sustancia que altera el sistema nervioso central y puede generar dependencia física o psíquica."],
    [S1, "Drogodependencia", "Estado de dependencia con pulsión a consumir una sustancia de forma continua o periódica."],
    [S1, "Deshabituación", "Proceso de rehabilitación que actúa sobre las causas de la dependencia."],
    [S2, "Prevención universal", "La dirigida a toda la población, sin distinguir niveles de riesgo."],
    [S2, "Prevención selectiva", "La dirigida a grupos con mayor riesgo de consumo."],
    [S3, "Tenencia ilícita", "Posesión de drogas en lugares públicos, infracción grave aunque no sea para traficar."],
    [S3, "Tráfico de drogas", "Conducta delictiva de promover, favorecer o facilitar el consumo ilegal (art. 368 CP)."],
    [S4, "Botellón", "Consumo de alcohol con fines de ocio por grupos en el espacio público, prohibido en Zaragoza."],
    [S5, "Comunidad terapéutica", "Centro residencial de segundo nivel para la deshabituación y reinserción."],
    [S5, "CMAPA", "Centro Municipal de Atención y Prevención de las Adicciones del Ayuntamiento de Zaragoza."],
  ],
  casos: [
    {
      slug: "caso-joven-cannabis-parque",
      titulo: "Un joven fumando cannabis en un parque",
      supuesto: "En un parque del barrio de La Almozara, una patrulla sorprende a un chico de 16 años fumando un porro y con una pequeña cantidad de hachís en el bolsillo. Su madre llega poco después, preocupada porque cree que su hijo consume a diario.",
      preguntas: [
        [S3, "media", "¿Qué infracción comete el menor?", ["Grave, por consumo y tenencia ilícitos en un lugar público", "Leve", "Ninguna"], "LO 4/2015, art. 36.16."],
        [S3, "media", "¿Constituye delito de tráfico la pequeña cantidad para consumo propio?", ["No, es infracción administrativa", "Sí, siempre", "Depende del color"], "LO 4/2015, art. 36.16; CP art. 368."],
        [S3, "media", "¿Qué hacen los agentes con la sustancia?", ["La intervienen y levantan el acta de denuncia", "La devuelven", "La destruyen en el acto sin acta"], "LO 4/2015 (véase el Tema 33)."],
        [S3, "dificil", "¿Puede suspenderse la multa si el menor acepta un tratamiento o actividades de reeducación?", ["Sí, a su solicitud y de sus representantes legales", "No", "Solo si es mayor de edad"], "LO 4/2015, disposición adicional quinta."],
        [S5, "media", "¿A qué recurso municipal pueden orientar a la madre?", ["Al CMAPA", "Al Registro Civil", "A Hacienda"], "Carta de servicios del CMAPA."],
        [S5, "media", "¿Cómo es la atención del CMAPA?", ["Gratuita y confidencial", "De pago", "Pública con nombre y apellidos"], "Carta de servicios del CMAPA."],
        [S5, "media", "¿Atiende el CMAPA también a las familias?", ["Sí", "No", "Solo a los padres separados"], "Páginas municipales del CMAPA."],
        [S2, "media", "¿Qué tipo de prevención sería un programa dirigido a este chico que ya consume?", ["Indicada", "Universal", "Ninguna"], "Conocimiento general de prevención."],
        [S5, "media", "¿Qué criterio de la ley aragonesa protege la voluntad del joven en el tratamiento?", ["La voluntariedad para iniciar y cesar el proceso, salvo excepciones legales", "La obligatoriedad", "La publicidad"], "Ley 3/2001, art. 20.1.e)."],
        [S2, "media", "¿Cómo considera la ley aragonesa la drogodependencia del menor?", ["Como un problema de salud", "Como un delito", "Como un asunto escolar"], "Ley 3/2001, art. 3.a)."],
      ],
    },
    {
      slug: "caso-bar-trafico-tolerado",
      titulo: "Trapicheo tolerado en un bar",
      supuesto: "Tras varias quejas vecinales, la Policía Local comprueba que en un bar del centro varias personas venden pequeñas dosis de cocaína en el baño con conocimiento del encargado, que no hace nada para impedirlo. En la puerta se acumulan clientes bebiendo alcohol con gran escándalo a las 3 de la madrugada.",
      preguntas: [
        [S3, "media", "¿Qué infracción comete el encargado que tolera la venta?", ["Grave, por tolerancia del consumo o tráfico en el local", "Leve", "Ninguna"], "LO 4/2015, art. 36.19."],
        [S3, "media", "¿Qué naturaleza tiene la venta de cocaína por los clientes?", ["Puede ser delito de tráfico de drogas", "Es infracción leve", "Es legal"], "Código Penal, art. 368 (véase el Tema 23)."],
        [S3, "media", "¿Qué multa puede corresponder a una infracción grave de la LO 4/2015?", ["De 601 a 30.000 euros", "De 100 a 600 euros", "Hasta 6.000 euros"], "LO 4/2015, art. 39.1."],
        [S3, "media", "Beber en la vía pública perturbando gravemente la tranquilidad es infracción…", ["Leve de la LO 4/2015", "Grave", "Muy grave"], "LO 4/2015, art. 37.17."],
        [S4, "media", "Además, el consumo en grupo en la calle vulnera…", ["La Ordenanza municipal del consumo indebido de bebidas alcohólicas", "La Ley 3/2001", "Nada"], "Ordenanza municipal, art. 6.1."],
        [S3, "media", "¿Qué repercusión en la seguridad ciudadana ilustra este caso?", ["Conflictos de convivencia y riesgo de delitos asociados al tráfico", "Ninguna", "Solo ruido"], "Conocimiento general."],
        [S3, "dificil", "Si el tráfico es delito, ¿qué debe hacer la Policía Local además de la denuncia administrativa?", ["Instruir el atestado y ponerlo en conocimiento de la autoridad judicial", "Nada", "Solo multar"], "LECrim (véase el Tema 29)."],
        [S1, "media", "¿Es la cocaína un estupefaciente sometido a fiscalización?", ["Sí", "No", "Solo en polvo"], "Ley 3/2001, art. 2.1.a)."],
        [S4, "media", "¿Qué otra normativa regula los horarios de cierre del bar?", ["La Ley 11/2005 de espectáculos de Aragón", "La Ley de Extranjería", "La Constitución"], "Véase el Tema 49."],
        [S5, "media", "¿Qué recurso podría orientar a los consumidores que quieran dejarlo?", ["El CMAPA y la red pública de atención", "Ninguno", "El propio bar"], "Ley 3/2001, art. 21; CMAPA."],
      ],
    },
    {
      slug: "caso-detenido-drogodependiente",
      titulo: "Un detenido con adicción",
      supuesto: "La Policía Local detiene a un hombre que ha robado en varios coches para comprar heroína. Tiene síndrome de abstinencia en el calabozo y explica que ha intentado dejarlo varias veces. Su abogado pregunta por alternativas a la prisión.",
      preguntas: [
        [S3, "media", "¿Qué repercusión del consumo en la seguridad ilustra el caso?", ["La comisión de delitos para financiar el consumo", "El ruido", "La suciedad"], "Conocimiento general."],
        [S1, "media", "El síndrome de abstinencia es propio de la…", ["Drogodependencia", "Prevención", "Reinserción"], "Ley 3/2001, art. 2.2.a)."],
        [S5, "media", "¿Qué atención inmediata debe garantizarse al detenido con síntomas?", ["Asistencia sanitaria", "Ninguna", "Solo agua"], "Conocimiento policial general; LECrim, derechos del detenido (Tema 29)."],
        [S5, "media", "¿Qué prevé la ley aragonesa para penados con adicción?", ["Alternativas a la privación de libertad a través de recursos acreditados", "Prisión siempre", "Expulsión"], "Ley 3/2001, art. 24.c)."],
        [S5, "media", "¿Qué programa prevé la ley para los detenidos drogodependientes?", ["Asesoramiento jurídico y social para su reinserción", "Ninguno", "Sanciones adicionales"], "Art. 24.e)."],
        [S1, "media", "El tratamiento para interrumpir el consumo de heroína es la…", ["Desintoxicación", "Prevención universal", "Reinserción"], "Art. 2.2.d)."],
        [S5, "media", "¿Qué recurso de segundo nivel incluye la ley para la desintoxicación?", ["Las unidades de desintoxicación hospitalaria", "Los servicios de prevención laboral", "Las asociaciones vecinales"], "Art. 21.2.B).b)."],
        [S5, "dificil", "¿Qué criterio de la ley busca que la reinserción se haga a través de recursos normalizados de la comunidad?", ["El de reinserción mediante la red de servicios sociales y recursos comunitarios", "El de internamiento obligatorio", "Ninguno"], "Art. 20.1.f)."],
        [S2, "media", "¿Qué principio de la ley inspira ver al detenido también como persona enferma?", ["La consideración de la drogodependencia como problema de salud", "La represión", "El secreto"], "Art. 3.a)."],
        [S5, "media", "Tras salir del proceso, ¿qué recurso municipal podría acompañar su tratamiento?", ["El CMAPA", "Ninguno", "La Junta Municipal"], "Carta de servicios del CMAPA."],
      ],
    },
  ],
});
