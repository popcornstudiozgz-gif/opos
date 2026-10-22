/**
 * Crea tema-339 — Tema 12 de Policía Local: "El fenómeno de la
 * marginación. Causas, efectos y problemática social. Las migraciones en la
 * actualidad. Integración social: factor de cohesión social."
 *
 * Fuente normativa leída en esta sesión: Ley Orgánica 4/2000, de 11 de
 * enero, sobre derechos y libertades de los extranjeros en España y su
 * integración social (BOE-A-2000-544, título verificado en la API del BOE),
 * arts. 1, 2 bis, 2 ter, 3, 4, 9, 12, 14, 30-32 y 53. Laguna señalada: su
 * texto sigue citando la LO 1/1992 de seguridad ciudadana, hoy sustituida
 * por la LO 4/2015.
 *
 * La marginación, la exclusión social y la descripción general de las
 * migraciones no tienen norma que las regule: se tratan como conocimiento
 * sociológico general, sin cifras ni datos estadísticos (que cambian cada
 * año y no se han verificado). La protección internacional (asilo y
 * refugio) se menciona solo como figura, sin desarrollar su ley, que no se
 * ha leído en esta sesión.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-339-marginacion-migraciones-integracion.mjs
 */
import { sembrarTema, POLICIA } from "./lib/sembrar-tema.mjs";

const LOEX = "https://www.boe.es/buscar/act.php?id=BOE-A-2000-544";
const S1 = "marginacion-concepto-causas";
const S2 = "marginacion-efectos-intervencion";
const S3 = "migraciones-actualidad";
const S4 = "extranjeria-derechos-situaciones";
const S5 = "integracion-cohesion-social";

await sembrarTema({
  tema: {
    slug: "tema-339",
    titulo: "Marginación, migraciones e integración social",
    descripcion: "La marginación y la exclusión social: concepto, causas (económicas, sociales, personales y culturales), colectivos vulnerables, efectos y problemática social; la intervención desde los servicios sociales y la actuación policial. Las migraciones en la actualidad: conceptos, causas y tipos; la inmigración en España y la LO 4/2000: derechos de los extranjeros, situaciones de estancia y residencia, irregularidad. La integración social como factor de cohesión: art. 2 ter de la LO 4/2000 y principios de la política inmigratoria.",
    contenido: "Por qué algunas personas quedan al margen de la sociedad (pobreza, paro, falta de vivienda, adicciones, discriminación) y qué consecuencias tiene para la convivencia; cómo son hoy las migraciones y qué derechos tienen las personas extranjeras en España según la Ley de Extranjería; y por qué la integración de todos es clave para la cohesión social. Para el agente, incluye cómo actuar con personas sin hogar o en situación irregular respetando sus derechos y derivándolas a los servicios sociales.",
    enlaces_boe: [{ url: LOEX, titulo: "Ley Orgánica 4/2000, de 11 de enero, sobre derechos y libertades de los extranjeros en España y su integración social (BOE-A-2000-544)" }],
    indice_estudio: [
      { seccion: S1, titulo: "La marginación: concepto, causas y colectivos", url: "" },
      { seccion: S2, titulo: "Efectos de la marginación y respuesta institucional", url: "" },
      { seccion: S3, titulo: "Las migraciones en la actualidad", url: "" },
      { seccion: S4, titulo: "Derechos de los extranjeros y situaciones administrativas", articulos: "LO 4/2000, arts. 1-14 y 30-32", url: `${LOEX}#a1` },
      { seccion: S5, titulo: "La integración social como factor de cohesión", articulos: "LO 4/2000, arts. 2 bis y 2 ter", url: `${LOEX}#a2.ter` },
    ],
  },
  vinculo: { oposicion: POLICIA.oposicion, bloqueId: POLICIA.bloqueParte1, numero: 12 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Marginación", "Situación de una persona o grupo que queda apartado de la participación normal en la vida social, económica, cultural o política"],
        ["Exclusión social", "Proceso acumulativo de pérdida de vínculos con el empleo, la vivienda, la salud, la educación y las redes sociales y familiares"],
        ["Pobreza y marginación", "La pobreza es falta de recursos económicos; la marginación incluye además el aislamiento y la ruptura de vínculos, aunque suelen ir unidas"],
        ["Causas económicas", "Desempleo, precariedad laboral, bajos ingresos, dificultad de acceso a la vivienda"],
        ["Causas sociales y familiares", "Ruptura familiar, falta de redes de apoyo, fracaso escolar, entorno degradado"],
        ["Causas personales", "Enfermedad mental, discapacidad, adicciones, problemas de salud"],
        ["Causas culturales", "Discriminación por origen, etnia, religión u orientación, barreras de idioma"],
        ["Colectivos vulnerables", "Personas sin hogar, personas mayores solas, menores en riesgo, víctimas de violencia, personas con adicciones o discapacidad y migrantes en situación precaria"],
      ],
      preguntas: [
        ["media", "¿Qué diferencia principal hay entre pobreza y marginación?", ["La marginación añade el aislamiento y la ruptura de vínculos sociales a la falta de recursos", "Son lo mismo", "La pobreza solo afecta a extranjeros"], "Conocimiento sociológico general."],
        ["media", "¿Cuál de estas es una causa económica de marginación?", ["El desempleo de larga duración", "La enfermedad mental", "La discriminación religiosa"], "Conocimiento sociológico general."],
        ["media", "La exclusión social se entiende como…", ["Un proceso acumulativo de pérdida de vínculos", "Un delito", "Una situación siempre voluntaria"], "Conocimiento sociológico general."],
        ["media", "¿Cuál de estos es un colectivo especialmente vulnerable?", ["Las personas sin hogar", "Los funcionarios", "Los empresarios"], "Conocimiento sociológico general."],
        ["media", "La discriminación por origen o etnia es una causa de marginación…", ["Cultural", "Económica", "Biológica"], "Conocimiento sociológico general."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Efectos individuales", "Deterioro de la salud física y mental, baja autoestima, dependencia, pérdida de habilidades sociales y laborales"],
        ["Efectos sociales", "Guetos o barrios degradados, desconfianza, conflictos de convivencia y mayor exposición a la delincuencia, como víctima o autor"],
        ["Círculo de la exclusión", "Las carencias se refuerzan entre sí (sin empleo no hay vivienda, sin domicilio es difícil encontrar empleo)"],
        ["Servicios sociales", "Son la vía principal de atención: valoración, prestaciones, acompañamiento e inserción"],
        ["Papel policial", "Detectar situaciones de riesgo, proteger a las víctimas, derivar a los servicios sociales y actuar con respeto a la dignidad y sin discriminación"],
        ["Prestaciones básicas para todos (LO 4/2000, art. 14.3)", "Los extranjeros, cualquiera que sea su situación administrativa, tienen derecho a los servicios y prestaciones sociales básicas"],
        ["No criminalizar la pobreza", "La situación de marginación no es por sí misma una infracción; el agente actúa ante conductas concretas, no ante la condición de la persona"],
      ],
      preguntas: [
        ["media", "¿Cuál es la principal vía institucional de atención a la marginación?", ["Los servicios sociales", "Los juzgados", "Las empresas privadas"], "Conocimiento sociológico general."],
        ["media", "¿Qué debe hacer el agente ante una persona sin hogar en situación de riesgo?", ["Protegerla si es necesario y derivarla a los servicios sociales", "Multarla por estar en la calle", "Ignorarla"], "Conocimiento policial general."],
        ["media", "¿Tienen derecho a los servicios sociales básicos los extranjeros en situación irregular?", ["Sí", "No", "Solo los menores"], "LO 4/2000, art. 14.3."],
        ["media", "¿Es la pobreza por sí misma una infracción?", ["No", "Sí", "Solo de noche"], "Conocimiento jurídico general."],
        ["media", "¿Qué se entiende por 'círculo de la exclusión'?", ["Que las carencias se refuerzan unas a otras", "Un programa municipal", "Una zona de la ciudad"], "Conocimiento sociológico general."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Migración", "Desplazamiento de personas de un lugar a otro para establecerse, temporal o definitivamente"],
        ["Emigración e inmigración", "Emigración: salida desde el lugar de origen; inmigración: llegada al lugar de destino"],
        ["Causas", "Económicas (empleo, salarios), políticas (conflictos, persecución), familiares (reagrupación), ambientales y educativas"],
        ["Factores de expulsión y atracción", "Expulsión: lo que empuja a salir del origen; atracción: lo que hace atractivo el destino"],
        ["Tipos", "Internas o internacionales, temporales o permanentes, voluntarias o forzosas, regulares o irregulares"],
        ["Migración forzosa", "Quien huye de persecución o conflicto puede solicitar protección internacional (asilo o protección subsidiaria), regulada por su propia ley"],
        ["Extranjero (LO 4/2000, art. 1)", "Quien carece de la nacionalidad española; los ciudadanos de la UE se rigen por su régimen propio, con la LO 4/2000 en lo más favorable"],
        ["Política inmigratoria (art. 2 bis.1)", "Corresponde al Gobierno, sin perjuicio de las competencias de comunidades autónomas y entidades locales"],
      ],
      preguntas: [
        ["media", "¿Quién es extranjero a efectos de la LO 4/2000?", ["Quien carece de la nacionalidad española", "Quien no nació en España", "Quien no habla castellano"], "LO 4/2000, art. 1.1."],
        ["media", "¿Qué régimen se aplica a los ciudadanos de la Unión Europea?", ["Su régimen comunitario, con la LO 4/2000 en lo más favorable", "Solo la LO 4/2000", "Ninguno"], "Art. 1.3."],
        ["media", "¿A quién corresponde la definición de la política de inmigración?", ["Al Gobierno", "A los Ayuntamientos", "A la Unión Europea en exclusiva"], "Art. 2 bis.1."],
        ["media", "Quien huye de una persecución en su país puede solicitar…", ["Protección internacional (asilo)", "Un visado de turista", "Nada"], "Conocimiento jurídico general."],
        ["media", "La llegada de personas a un país para establecerse es la…", ["Inmigración", "Emigración", "Repatriación"], "Conocimiento sociológico general."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Derechos (art. 3.1)", "Los extranjeros gozan de los derechos del Título I de la Constitución en los términos de los tratados y las leyes; como criterio general, en igualdad con los españoles"],
        ["Límite cultural (art. 3.2)", "No pueden alegarse creencias o convicciones culturales para justificar actos contrarios a los derechos humanos"],
        ["Documentación (art. 4)", "Derecho y deber de conservar su documentación; con autorización de más de seis meses, tarjeta de identidad de extranjero en un mes; no pueden ser privados de ella salvo en los casos legales"],
        ["Educación (art. 9)", "Los menores de 16 años tienen derecho y deber de educación básica, gratuita y obligatoria; los menores de 18, también a la posobligatoria"],
        ["Sanidad (art. 12)", "Asistencia sanitaria en los términos de la legislación sanitaria"],
        ["Estancia (art. 30)", "Permanencia de hasta 90 días"],
        ["Residencia temporal (art. 31)", "Más de 90 días y menos de cinco años; cabe por arraigo, razones humanitarias o colaboración con la Justicia"],
        ["Residencia de larga duración (art. 32)", "Residir y trabajar indefinidamente en igualdad con los españoles, tras cinco años de residencia temporal continuada"],
        ["Estancia irregular (art. 53.1.a)", "Encontrarse en España sin prórroga de estancia ni autorización de residencia es infracción grave administrativa, no delito"],
      ],
      preguntas: [
        ["media", "¿Cuánto dura como máximo la situación de estancia?", ["90 días", "Un año", "Cinco años"], "LO 4/2000, art. 30.1."],
        ["media", "¿Tras cuántos años de residencia temporal continuada se puede obtener la de larga duración?", ["Cinco", "Dos", "Diez"], "Art. 32.2."],
        ["media", "¿Tienen derecho a la educación obligatoria los menores extranjeros, aunque estén en situación irregular?", ["Sí, los menores de 16 años tienen derecho y deber de educación básica", "No", "Solo con residencia"], "Art. 9.1."],
        ["media", "Estar en España en situación irregular es…", ["Una infracción administrativa grave", "Un delito", "Legal sin más"], "Art. 53.1.a)."],
        ["dificil", "¿Puede alegarse una costumbre cultural para justificar una conducta contraria a los derechos humanos?", ["No", "Sí", "Solo si es tradicional"], "Art. 3.2."],
        ["media", "¿Puede privarse a un extranjero de su documentación?", ["Solo en los supuestos y con los requisitos legales", "Siempre que lo decida el agente", "Nunca, en ningún caso"], "Art. 4.3."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["Integración (art. 2 ter.1)", "Los poderes públicos promueven la plena integración de los extranjeros, en convivencia de identidades y culturas diversas, sin más límite que la Constitución y la ley"],
        ["Transversalidad (art. 2 ter.2)", "La integración es un objetivo de todas las políticas y servicios públicos, con participación económica, social, cultural y política en igualdad de trato"],
        ["Acciones formativas (art. 2 ter.2)", "Conocimiento de los valores constitucionales, de la UE y de los derechos humanos, la tolerancia y la igualdad entre mujeres y hombres; escolarización e idiomas"],
        ["Cooperación (art. 2 ter.3-4)", "Estado, comunidades autónomas y Ayuntamientos cooperan en un plan estratégico plurianual, que atiende también a los menores extranjeros no acompañados"],
        ["Principios de la política inmigratoria (art. 2 bis.2)", "Integración mediante políticas dirigidas a toda la ciudadanía, igualdad entre mujeres y hombres, no discriminación, lucha contra la inmigración irregular y contra la trata"],
        ["Esfuerzo de integración (art. 31.7)", "Se valora para renovar la residencia temporal mediante un informe de la comunidad autónoma"],
        ["Cohesión social", "Una sociedad cohesionada reduce la exclusión, previene conflictos y refuerza la convivencia y la seguridad"],
      ],
      preguntas: [
        ["media", "¿Qué límite pone la LO 4/2000 a la convivencia de culturas diversas?", ["El respeto a la Constitución y la ley", "Ninguno", "La religión mayoritaria"], "LO 4/2000, art. 2 ter.1."],
        ["media", "¿Cómo debe abordarse la integración en las políticas públicas?", ["De forma transversal en todas ellas", "Solo en servicios sociales", "Solo en educación"], "Art. 2 ter.2."],
        ["media", "¿Qué Administraciones cooperan en el plan estratégico de integración?", ["El Estado, las comunidades autónomas y los Ayuntamientos", "Solo el Estado", "Solo la UE"], "Art. 2 ter.3."],
        ["media", "¿Cuál es un principio de la política inmigratoria?", ["La persecución de la trata de seres humanos", "La discriminación por origen", "La libertad absoluta de entrada"], "Art. 2 bis.2.h)."],
        ["dificil", "¿Qué se valora especialmente al renovar una residencia temporal?", ["El esfuerzo de integración acreditado por informe de la comunidad autónoma", "El idioma materno", "La religión"], "Art. 31.7."],
      ],
    },
  ],
  glosario: [
    [S1, "Exclusión social", "Proceso de pérdida acumulada de vínculos con el empleo, la vivienda y las redes sociales."],
    [S1, "Vulnerabilidad", "Mayor riesgo de sufrir daños o exclusión por circunstancias personales o sociales."],
    [S2, "Inserción social", "Proceso de recuperación de la participación en la sociedad con apoyo de los servicios sociales."],
    [S3, "Factores de expulsión", "Causas que empujan a las personas a abandonar su lugar de origen."],
    [S3, "Protección internacional", "Protección que se concede a quien huye de persecución o grave riesgo (asilo o protección subsidiaria)."],
    [S4, "Estancia", "Permanencia de un extranjero en España de hasta 90 días."],
    [S4, "Arraigo", "Vinculación con España que permite obtener una residencia temporal por circunstancias excepcionales."],
    [S4, "Residencia de larga duración", "Autorización para residir y trabajar indefinidamente en igualdad con los españoles."],
    [S5, "Integración social", "Participación plena de los inmigrantes en la sociedad en igualdad de derechos y deberes."],
    [S5, "Cohesión social", "Grado de vínculo y convivencia entre los miembros de una sociedad."],
  ],
  casos: [
    {
      slug: "caso-persona-sin-hogar-invierno",
      titulo: "Una persona sin hogar en una noche de frío",
      supuesto: "En una noche de helada, una patrulla encuentra a un hombre de unos 50 años durmiendo en un cajero. Está desorientado, huele a alcohol y no tiene documentación. Dice que perdió su trabajo y su casa hace dos años y que no tiene familia en Zaragoza.",
      preguntas: [
        [S2, "media", "¿Cuál es la prioridad de los agentes?", ["Proteger su vida y su salud, valorando si necesita asistencia sanitaria", "Multarle", "Echarle del cajero sin más"], "Conocimiento policial general."],
        [S2, "media", "¿A qué servicio deben derivarle?", ["A los servicios sociales y de atención a personas sin hogar", "Al juzgado", "A una empresa"], "Conocimiento sociológico general."],
        [S1, "media", "Según su relato, ¿qué tipo de causas han provocado su situación?", ["Económicas (paro, pérdida de vivienda) y sociales (falta de red de apoyo)", "Solo culturales", "Ninguna"], "Conocimiento sociológico general."],
        [S2, "media", "¿Es dormir en la calle, por sí mismo, una infracción penal?", ["No", "Sí", "Solo en invierno"], "Conocimiento jurídico general."],
        [S2, "media", "¿Cómo se llama el proceso en que la falta de empleo, vivienda y apoyos se refuerzan?", ["Círculo de la exclusión", "Integración", "Arraigo"], "Conocimiento sociológico general."],
        [S1, "media", "¿Es el alcohol, en su caso, una posible causa o consecuencia de la marginación?", ["Puede ser ambas cosas", "Nunca", "Solo causa"], "Conocimiento sociológico general."],
        [S2, "dificil", "Si fuera extranjero en situación irregular, ¿tendría derecho a los servicios sociales básicos?", ["Sí", "No", "Solo si tiene pasaporte"], "LO 4/2000, art. 14.3."],
        [S2, "media", "¿Con qué principio debe actuar el agente?", ["Respeto a la dignidad y sin discriminación", "Rapidez sin más", "Severidad"], "Conocimiento policial general."],
        [S1, "media", "¿A qué colectivo vulnerable pertenece esta persona?", ["Personas sin hogar", "Menores en riesgo", "Turistas"], "Conocimiento sociológico general."],
        [S2, "media", "¿Qué efecto individual de la marginación puede apreciarse en su desorientación?", ["El deterioro de la salud física y mental", "El aumento de ingresos", "Ninguno"], "Conocimiento sociológico general."],
      ],
    },
    {
      slug: "caso-identificacion-extranjero-irregular",
      titulo: "Una identificación en la vía pública",
      supuesto: "Durante un control preventivo, los agentes identifican a un joven extranjero que lleva ocho meses en España y no tiene autorización de residencia. Acompaña a su hermano de 14 años, que va al instituto. El joven teme que le quiten el pasaporte.",
      preguntas: [
        [S4, "media", "Encontrarse en España sin autorización de residencia es…", ["Una infracción administrativa grave", "Un delito", "Una conducta legal"], "LO 4/2000, art. 53.1.a)."],
        [S4, "media", "¿Superaba el periodo de estancia?", ["Sí, la estancia es de hasta 90 días", "No", "No hay límite"], "Art. 30.1."],
        [S4, "media", "¿Tiene el hermano de 14 años derecho a estar escolarizado?", ["Sí, tiene derecho y deber de educación básica", "No", "Solo si es residente"], "Art. 9.1."],
        [S4, "media", "¿Pueden privarle de su pasaporte libremente?", ["No, solo en los supuestos y con los requisitos legales", "Sí", "Siempre"], "Art. 4.3."],
        [S4, "media", "¿Goza de los derechos del Título I de la Constitución?", ["Sí, en los términos de los tratados y las leyes", "No", "Solo de los civiles"], "Art. 3.1."],
        [S4, "dificil", "¿Qué figura podría permitirle, en su caso, regularizar su situación por su vinculación con España?", ["La residencia temporal por arraigo", "La nacionalidad automática", "La residencia de larga duración inmediata"], "Art. 31.3."],
        [S2, "media", "¿Tiene derecho a los servicios sociales básicos pese a su situación?", ["Sí", "No", "Solo a la sanidad"], "Art. 14.3."],
        [S5, "media", "¿Qué valor promueve el art. 2 ter respecto a estas personas?", ["La plena integración en convivencia de culturas diversas", "Su exclusión", "Su aislamiento"], "Art. 2 ter.1."],
        [S4, "media", "La identificación debe hacerse conforme a…", ["La LO 4/2015 de seguridad ciudadana y sin discriminación", "La voluntad del agente", "Ninguna norma"], "LO 4/2015, arts. 4 y 16."],
        [S3, "media", "¿Qué tipo de migración es la de quien llega por motivos laborales y voluntariamente?", ["Económica y voluntaria", "Forzosa", "Interna"], "Conocimiento sociológico general."],
      ],
    },
    {
      slug: "caso-mediacion-convivencia-barrio",
      titulo: "Conflicto de convivencia en un barrio diverso",
      supuesto: "En un barrio con vecinos de muchos orígenes, surgen quejas por ruidos y reuniones en una plaza. Algunos vecinos culpan 'a los inmigrantes' en general. La Policía Local organiza con la Junta Municipal y los servicios sociales una mesa de convivencia.",
      preguntas: [
        [S5, "media", "¿Qué objetivo general persigue la integración social?", ["La cohesión y la convivencia de toda la ciudadanía", "Separar a los grupos", "Expulsar a los extranjeros"], "LO 4/2000, art. 2 ter."],
        [S5, "media", "¿Deben dirigirse las políticas de integración solo a los inmigrantes?", ["No, son políticas transversales dirigidas a toda la ciudadanía", "Sí", "Solo a los menores"], "Art. 2 bis.2.c)."],
        [S2, "media", "¿Cómo debe actuar el agente ante las quejas?", ["Ante conductas concretas, sin atribuirlas a un colectivo por su origen", "Contra todo extranjero", "No actuar"], "LO 4/2000, art. 2 bis.2.e); LO 4/2015, art. 4.1."],
        [S5, "media", "¿Qué principio de la política inmigratoria se vulneraría culpando a un colectivo por su origen?", ["La no discriminación", "La ordenación de flujos", "La cooperación con terceros países"], "Art. 2 bis.2.e)."],
        [S5, "media", "¿Qué Administraciones deben colaborar en la integración?", ["El Estado, la comunidad autónoma y el Ayuntamiento", "Solo la Policía", "Solo los vecinos"], "Art. 2 ter.3."],
        [S2, "media", "Los ruidos se abordarán, en su caso, con…", ["La Ordenanza de Ruidos y la de convivencia, igual para todos", "La Ley de Extranjería", "El Código Penal siempre"], "Véase el Tema 48."],
        [S5, "dificil", "¿Qué tipo de acciones prevé el art. 2 ter para favorecer la integración?", ["Acciones formativas en valores constitucionales, derechos humanos, igualdad e idiomas", "Sanciones", "Expulsiones"], "Art. 2 ter.2."],
        [S1, "media", "¿Qué causa de marginación puede generar la estigmatización de un colectivo?", ["La discriminación (causa cultural)", "El desempleo", "La enfermedad"], "Conocimiento sociológico general."],
        [S5, "media", "¿Qué efecto tiene una sociedad cohesionada sobre la seguridad?", ["Previene conflictos y refuerza la convivencia", "Ninguno", "Aumenta la delincuencia"], "Conocimiento sociológico general."],
        [S2, "media", "¿Qué tipo de policía encaja con la mesa de convivencia?", ["La policía de proximidad", "La exclusivamente represiva", "La judicial"], "Véase el Tema 11."],
      ],
    },
  ],
});
