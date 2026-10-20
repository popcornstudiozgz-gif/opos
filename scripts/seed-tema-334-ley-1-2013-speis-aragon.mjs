/**
 * Crea tema-334 — Tema 39 de Bombero/a Conductor/a: "Normativa de los
 * servicios de prevención, extinción de incendios y salvamento de Aragón.
 * Ley 1/2013, de 7 de marzo, de Regulación y Coordinación de los Servicios
 * de Prevención, Extinción de Incendios y Salvamento de Aragón."
 *
 * Fuente: Ley 1/2013 de Aragón (BOA núm. 57, de 21-03-2013; BOE-A-2013-3810,
 * título verificado), texto consolidado del BOE leído íntegro (última
 * actualización: Ley 2/2014, que añadió la disposición adicional séptima).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-334-ley-1-2013-speis-aragon.mjs
 */
import { sembrarTema, BOMBERO } from "./lib/sembrar-tema.mjs";

const LEY = "https://www.boe.es/buscar/act.php?id=BOE-A-2013-3810";
const a = (ancla) => `${LEY}#${ancla}`;
const S1 = "objeto-funciones-principios";
const S2 = "competencias-personal";
const S3 = "coordinacion-organizacion";
const S4 = "academia-derechos-deberes";
const S5 = "regimen-disciplinario-financiacion";

await sembrarTema({
  tema: {
    slug: "tema-334",
    titulo: "Ley 1/2013 de Aragón: regulación y coordinación de los Servicios de Prevención, Extinción de Incendios y Salvamento",
    descripcion: "Objeto, concepto y funciones de los SPEIS, principios de actuación; competencias de municipios, comarcas, diputaciones y Gobierno de Aragón; personal operativo, bomberos voluntarios, personal de empresa, condición de agente de la autoridad y colaboración ciudadana; coordinación, Comisión de Coordinación, Registro de Bomberos, uniformidad e identificación; cuerpos de inspección, mando e intervención; Academia Aragonesa de Bomberos; derechos y deberes; régimen disciplinario y financiación.",
    contenido: "Recorre la ley aragonesa que regula los servicios de bomberos: qué funciones tienen, quién está obligado a prestarlos (los municipios de más de 20.000 habitantes), cómo se coordinan, qué cuerpos y categorías existen (el bombero es grupo C1), qué hace la Academia Aragonesa de Bomberos, los derechos y deberes del personal y qué conductas son faltas muy graves, graves o leves.",
    enlaces_boe: [{ url: LEY, titulo: "Ley 1/2013, de 7 de marzo, de Regulación y Coordinación de los SPEIS de Aragón (BOE-A-2013-3810)" }],
    indice_estudio: [
      { seccion: S1, titulo: "Objeto, concepto, funciones y principios de actuación", articulos: "arts. 1-3", url: a("a1") },
      { seccion: S2, titulo: "Competencias de las Administraciones y personal", articulos: "arts. 4-10", url: a("a4") },
      { seccion: S3, titulo: "Coordinación, Comisión, Registro, medios y organización", articulos: "arts. 11-23 y DA 7ª", url: a("a1-3") },
      { seccion: S4, titulo: "Formación, Academia Aragonesa de Bomberos, derechos y deberes", articulos: "arts. 24-33", url: a("a2-6") },
      { seccion: S5, titulo: "Régimen disciplinario y financiación", articulos: "arts. 34-45", url: a("a3-6") },
    ],
  },
  vinculo: { oposicion: BOMBERO.oposicion, bloqueId: BOMBERO.bloqueParteII, numero: 39 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Objeto de la Ley 1/2013 (art. 1)", "Establecer los criterios y principios básicos para la creación y coordinación de los SPEIS de Aragón, fijando su organización, funciones, recursos y financiación"],
        ["¿Qué son los SPEIS según el art. 2.1?", "Un servicio público de atención de emergencias cuya prestación deben garantizar los poderes públicos competentes"],
        ["Algunas funciones del art. 2.2", "Salvamento y rescate de personas, animales y bienes; prevención y extinción de incendios; salvamento acuático, subacuático y en cavidades; accidentes de tráfico; ruinas y hundimientos; mercancías peligrosas; informes de proyectos; fomento de la autoprotección"],
        ["¿Pueden actuar fuera de su ámbito territorial?", "Sí, a requerimiento de la autoridad competente o por convenio, bajo sus mandos inmediatos y previa autorización del Jefe del Servicio (art. 2.3-4)"],
        ["Principios de actuación (art. 3)", "Respeto a los derechos fundamentales, diligencia y celeridad con proporcionalidad, auxilio, secreto profesional, información a la autoridad, cooperación interadministrativa, colaboración con fuerzas de orden público y jerarquía"],
        ["¿Ampara la obediencia debida cualquier orden?", "No: nunca órdenes que constituyan manifiestamente delito o sean contrarias a la Constitución (art. 3.h)"],
      ],
      preguntas: [
        ["facil", "¿Qué tipo de servicio son los SPEIS según la Ley 1/2013?", ["Un servicio público de atención de emergencias", "Un servicio privado", "Un servicio militar"], "Art. 2.1."],
        ["media", "¿Es función de los SPEIS la intervención en salvamento subacuático y en cavidades?", ["Sí", "No", "Solo en verano"], "Art. 2.2.g)."],
        ["media", "¿Qué pueden adoptar los SPEIS a la espera de la decisión de la autoridad?", ["Medidas de seguridad extraordinarias y provisionales, como el desalojo", "Sanciones económicas", "Detenciones"], "Art. 2.2.l)."],
        ["media", "¿Qué principio obliga a guardar lo conocido en el servicio?", ["Secreto profesional", "Jerarquía", "Celeridad"], "Art. 3.d)."],
        ["dificil", "¿Quién autoriza la actuación fuera del ámbito territorial?", ["El mando natural que ostente la Jefatura del Servicio", "El alcalde de destino solamente", "Nadie"], "Art. 2.4."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["¿Qué municipios deben prestar el SPEIS?", "Los de más de 20.000 habitantes, por sí o asociados (art. 4.2.a)"],
        ["Competencias de las comarcas", "Colaborar y, en su caso, prestar el servicio, elaborar programas comarcales y promover organizaciones de voluntarios (art. 4.3)"],
        ["Papel de las Diputaciones Provinciales", "Garantizar el servicio en municipios sin obligación ni servicio propio hasta que el Gobierno de Aragón tenga organización propia (art. 4.4)"],
        ["¿Qué son los bomberos voluntarios?", "Personas que prestan el servicio de forma altruista y complementaria, sin ser personal funcionario ni laboral (art. 7)"],
        ["¿Quién es agente de la autoridad?", "El personal de los SPEIS en el ejercicio de sus funciones; no el personal de empresa ni los bomberos voluntarios (art. 9)"],
        ["Colaboración ciudadana (art. 10)", "Los mayores de edad, a requerimiento, deben colaborar; las prestaciones personales no se indemnizan (salvo daños), y las requisas sí"],
      ],
      preguntas: [
        ["facil", "¿A partir de qué población debe un municipio prestar el SPEIS?", ["Más de 20.000 habitantes", "Más de 5.000", "Más de 100.000"], "Art. 4.2.a)."],
        ["media", "¿Tienen los bomberos voluntarios la condición de agente de la autoridad?", ["No", "Sí", "Solo de noche"], "Art. 9.2."],
        ["media", "¿Quién forma a los bomberos voluntarios?", ["La Academia Aragonesa de Bomberos", "Las comarcas", "Las empresas"], "Art. 7.4."],
        ["media", "¿Dan derecho a indemnización las prestaciones personales obligatorias en grave riesgo?", ["No, salvo por las lesiones en bienes y derechos del prestador", "Sí, siempre", "Solo a menores"], "Art. 10.1.b)."],
        ["dificil", "¿Quién expide la habilitación del personal de empresa con funciones de extinción?", ["La Academia Aragonesa de Bomberos", "El ayuntamiento", "La propia empresa"], "Art. 8.1."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Órganos de coordinación (art. 12)", "El Gobierno de Aragón, el Departamento competente en protección civil y la Comisión de Coordinación"],
        ["¿Qué es la Comisión de Coordinación?", "Un órgano consultivo y de participación, presidido por el titular del Departamento de protección civil, con representantes autonómicos, locales y sindicales (arts. 14-15)"],
        ["Registro de Bomberos de Aragón", "Registro único y de inscripción obligatoria de los servicios y su personal, adscrito al Departamento de protección civil (art. 17)"],
        ["¿Qué incorpora siempre la uniformidad?", "El emblema del Servicio y el número de identificación (art. 18.2)"],
        ["Cuerpos jerárquicos (art. 21)", "Cuerpo de inspección, cuerpo de mando y cuerpo de intervención"],
        ["Categorías del cuerpo de intervención (DA 7ª)", "Jefe de intervención, subjefe de intervención, oficial y bombero, todas del grupo C, subgrupo C1"],
        ["¿Quién ejerce la Jefatura del Servicio?", "Quien ostente mayor jerarquía en él, bajo la autoridad del órgano superior competente (art. 23)"],
      ],
      preguntas: [
        ["facil", "¿En qué grupo y subgrupo se clasifica la categoría de bombero?", ["C1", "C2", "A2"], "DA 7ª."],
        ["media", "¿Qué naturaleza tiene la Comisión de Coordinación?", ["Consultiva y de participación", "Sancionadora", "Judicial"], "Art. 14."],
        ["media", "¿Qué cuerpo ejerce funciones operativas de nivel básico?", ["El de intervención", "El de inspección", "El de mando"], "Art. 22.1.c)."],
        ["media", "¿Qué debe figurar como mínimo en el documento de acreditación profesional?", ["Entidad titular, nombre, categoría y número de identificación", "Solo la foto", "La dirección del domicilio"], "Art. 19.2."],
        ["dificil", "¿Qué grupo corresponde a la categoría de Inspector?", ["A1", "A2", "C1"], "DA 7ª."],
        ["media", "¿En qué escala se integra el personal operativo funcionario de entidades locales?", ["Administración Especial, subescala de Servicios Especiales", "Administración General", "Habilitación nacional"], "Art. 21.1."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["¿Qué es la Academia Aragonesa de Bomberos?", "Una unidad administrativa sin personalidad jurídica, dependiente del Departamento de protección civil e integrada en la Escuela de Seguridad Pública de Aragón (art. 25)"],
        ["Funciones de la Academia (art. 27)", "Cursos selectivos y de especialidades, formación permanente, habilitar voluntarios y personal de empresa, colaborar en la selección, investigar y divulgar, formar al voluntariado de protección civil"],
        ["Escuelas que forman mientras no funcione la Academia", "Las Escuelas de Bomberos del Ayuntamiento y de la Diputación Provincial de Zaragoza (DA 4ª)"],
        ["Algunos derechos (art. 28)", "Remuneración justa, formación continuada, jornada adaptada, defensa jurídica, vestuario y equipo, seguro de vida, accidentes y responsabilidad civil, carrera profesional y protección de la salud"],
        ["Algunos deberes (art. 29)", "Diligencia y proporcionalidad, permanecer en servicio hasta ser relevado o si la gravedad lo exige, mantener la aptitud física y someterse a revisiones, usar los EPI, puntualidad y decoro"],
        ["¿Cuándo se presta defensa jurídica? (art. 31)", "Cuando el personal actuó conforme a la legalidad o cumpliendo órdenes que no constituyan infracción manifiesta del ordenamiento"],
      ],
      preguntas: [
        ["facil", "¿Tiene personalidad jurídica propia la Academia Aragonesa de Bomberos?", ["No", "Sí", "Solo en Zaragoza"], "Art. 25.1."],
        ["media", "¿Es deber del bombero permanecer en servicio hasta ser relevado?", ["Sí", "No", "Solo los mandos"], "Art. 29.d)."],
        ["media", "¿Qué seguro tiene el personal operativo según el art. 30?", ["Muerte o invalidez y responsabilidad civil", "Ninguno", "Solo de vehículo"], "Art. 30.1."],
        ["media", "¿Suponen devengo económico los premios y distinciones?", ["No, aunque pueden valorarse para promoción", "Sí", "Solo en metálico"], "Art. 33.2."],
        ["dificil", "¿En qué escuela se integra la Academia Aragonesa de Bomberos?", ["La Escuela de Seguridad Pública de Aragón", "La Escuela Nacional de Protección Civil", "La universidad"], "Art. 25.1."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["¿Quién sanciona las faltas leves y quién las graves y muy graves?", "Leves: la dirección del Servicio. Graves y muy graves: el Alcalde, Presidente de la entidad local o titular del Departamento autonómico (art. 34)"],
        ["Plazo para resolver el procedimiento disciplinario", "Doce meses desde su inicio; después, caducidad (art. 35.2)"],
        ["Algunas faltas muy graves (art. 40)", "No acudir a un siniestro estando de servicio, insubordinación, sustraer material, abuso de autoridad, permitir no usar EPI, aceptar gratificaciones, incumplir servicios mínimos"],
        ["Algunas faltas graves (art. 41)", "Usar uniforme o material fuera del servicio, no esperar al relevo, no usar EPI, no comparecer libre de servicio si se le requiere, falta de respeto a superiores"],
        ["Faltas leves (art. 42)", "Descuido injustificado en la presentación, no presentarse uniformado al relevo y otros incumplimientos menores"],
        ["Sanciones (art. 43)", "Separación del servicio (solo por muy graves), demérito, apercibimiento y otras legales"],
        ["Recursos de financiación (art. 45)", "Presupuestos, contribuciones especiales y tasas, subvenciones, precios públicos y otros; la DA 6ª prevé una contribución especial a las aseguradoras del ramo de incendios"],
      ],
      preguntas: [
        ["facil", "No acudir a una llamada de siniestro estando de servicio es una falta…", ["Muy grave", "Grave", "Leve"], "Art. 40.1."],
        ["media", "Usar el uniforme fuera del servicio es una falta…", ["Grave", "Muy grave", "Leve"], "Art. 41.3."],
        ["media", "¿Qué sanción solo puede imponerse por faltas muy graves?", ["La separación del servicio", "El apercibimiento", "El demérito"], "Art. 43.a)."],
        ["media", "¿En qué plazo alega el interesado frente a medidas provisionales?", ["Quince días naturales como máximo", "Un año", "Dos horas"], "Art. 36.2."],
        ["dificil", "¿Qué sujetos pasivos tiene la contribución especial de la DA 6ª?", ["Las aseguradoras con pólizas del ramo de incendios en Aragón", "Los propietarios de vehículos", "Los bomberos"], "DA 6ª."],
        ["media", "No presentarse uniformado al relevo sin causa es una falta…", ["Leve", "Muy grave", "No es falta"], "Art. 42.2."],
      ],
    },
  ],
  glosario: [
    [S1, "SPEIS", "Servicios de Prevención, Extinción de Incendios y Salvamento."],
    [S2, "Bombero voluntario", "Persona que presta servicio de forma altruista y complementaria, sin ser funcionario ni laboral."],
    [S2, "Agente de la autoridad", "Condición del personal de los SPEIS en el ejercicio de sus funciones."],
    [S3, "Comisión de Coordinación", "Órgano consultivo y de participación sobre los SPEIS de Aragón."],
    [S3, "Registro de Bomberos de Aragón", "Registro único y obligatorio de los servicios y de su personal."],
    [S4, "Academia Aragonesa de Bomberos", "Unidad que forma, perfecciona y participa en la selección del personal de los SPEIS."],
    [S5, "Demérito", "Sanción que penaliza a efectos de carrera, promoción o movilidad."],
  ],
  casos: [
    {
      slug: "caso-bombero-fuera-servicio-requerido",
      titulo: "Requerido estando libre de servicio",
      supuesto: "Durante un gran incendio, el Servicio llama a un bombero que está libre de servicio. Recibe la orden pero no comparece. Otro compañero, al acabar su turno, se marcha sin esperar a su relevo.",
      preguntas: [
        [S5, "facil", "¿Qué falta comete quien no comparece libre de servicio tras recibir la orden?", ["Grave", "Leve", "Ninguna"], "Art. 41.6."],
        [S5, "media", "¿Qué falta comete quien se va sin esperar a su relevo?", ["Grave", "Muy grave", "Leve"], "Art. 41.4."],
        [S4, "media", "¿Qué deber incumple quien se marcha sin relevo?", ["Permanecer en el servicio hasta ser relevado", "Mantener la aptitud física", "La puntualidad"], "Art. 29.d)."],
        [S5, "media", "¿Quién impone sanciones por faltas graves?", ["El Alcalde o el órgano equivalente", "La dirección del Servicio", "Cualquier compañero"], "Art. 34.2."],
        [S5, "media", "¿Cuánto puede durar como máximo el procedimiento?", ["Doce meses", "Un mes", "Cinco años"], "Art. 35.2."],
        [S5, "dificil", "Si reincide en una falta grave tras haber sido sancionado en firme por otra en los dos años anteriores, ¿qué falta será?", ["Muy grave", "Leve", "La misma"], "Art. 40.12."],
        [S5, "media", "¿Qué criterio de graduación tiene en cuenta el riesgo para la seguridad pública?", ["La trascendencia de la conducta para la seguridad pública", "La edad", "El color del uniforme"], "Art. 44.2.f)."],
        [S3, "media", "¿A qué cuerpo pertenecen los bomberos?", ["Al de intervención", "Al de inspección", "Al de mando"], "Art. 21 y DA 7ª."],
        [S4, "media", "¿Qué deber permite exigir tareas fuera de horario en situaciones excepcionales?", ["Ejecutar las tareas encomendadas por superiores en riesgo o emergencia", "Ninguno", "La puntualidad"], "Art. 29.c)."],
        [S5, "media", "¿Exime la sanción de indemnizar los daños causados?", ["No", "Sí", "Solo si es leve"], "Art. 44.3."],
      ],
    },
    {
      slug: "caso-colaboracion-ciudadana-inundacion",
      titulo: "Colaboración ciudadana en una inundación",
      supuesto: "En una inundación grave, la autoridad competente requiere a vecinos mayores de edad para llenar sacos y requisa una excavadora de una empresa cercana.",
      preguntas: [
        [S2, "facil", "¿Están obligados los vecinos mayores de edad a colaborar si se les requiere?", ["Sí", "No", "Solo los funcionarios"], "Art. 10.1."],
        [S2, "media", "¿Cobrarán los vecinos por esa prestación personal?", ["No, salvo indemnización por lesiones en sus bienes y derechos", "Sí, siempre", "Solo los jubilados"], "Art. 10.1.b)."],
        [S2, "media", "¿Se indemniza a la empresa por la requisa de la excavadora?", ["Sí, conforme a la normativa de expropiación forzosa", "No", "Solo si se rompe"], "Art. 10.2."],
        [S1, "media", "¿Qué principio guía la actuación de los bomberos en la emergencia?", ["Diligencia y celeridad con proporcionalidad", "Lentitud", "Secreto absoluto ante la autoridad"], "Art. 3.b)."],
        [S1, "media", "¿Qué función del art. 2 encaja con la evacuación de inmuebles?", ["La adopción de medidas de seguridad provisionales", "La emisión de informes de proyectos", "La investigación de sistemas"], "Art. 2.2.l)."],
        [S2, "media", "¿Son agentes de la autoridad los bomberos que dirigen a los vecinos?", ["Sí, en el ejercicio de sus funciones", "No", "Solo con casco"], "Art. 9.1."],
        [S1, "media", "¿A quién deben trasladar los bomberos sus actuaciones?", ["A la autoridad competente", "A la prensa", "A nadie"], "Art. 3.e)."],
        [S1, "dificil", "¿Pueden los bomberos de Zaragoza actuar en un municipio vecino?", ["Sí, si lo requiere la autoridad competente o hay convenio", "Nunca", "Solo con permiso del alcalde del pueblo"], "Art. 2.3."],
        [S2, "media", "¿Qué hace la comarca respecto a los voluntarios?", ["Promover organizaciones de voluntarios", "Sancionarlos", "Nada"], "Art. 4.3.c)."],
        [S1, "media", "¿Es función de los SPEIS participar en traslados sanitarios de emergencia?", ["Sí", "No", "Solo en carreteras"], "Art. 2.2.p)."],
      ],
    },
    {
      slug: "caso-nuevo-consorcio-comarcal",
      titulo: "Un consorcio para los municipios pequeños",
      supuesto: "Varios municipios de menos de 20.000 habitantes y una comarca estudian crear un consorcio de bomberos con apoyo del Gobierno de Aragón y la Diputación Provincial.",
      preguntas: [
        [S2, "facil", "¿Pueden las Administraciones gestionar el servicio mediante un consorcio?", ["Sí", "No", "Solo los de más de 100.000"], "Art. 5.2."],
        [S2, "media", "¿Quién garantiza hoy el servicio en municipios sin obligación ni servicio propio?", ["Las Diputaciones Provinciales", "Nadie", "La Guardia Civil"], "Art. 4.4."],
        [S2, "media", "¿Qué hace el Gobierno de Aragón respecto a los consorcios?", ["Asesorar y apoyar especialmente su constitución", "Prohibirlos", "Nada"], "Art. 5.3."],
        [S5, "media", "¿Cómo se financia un consorcio?", ["Con las contribuciones acordadas por sus Administraciones, además de los demás recursos", "Solo con multas", "Con donaciones exclusivamente"], "Art. 45.2."],
        [S3, "media", "¿Quién determina las dotaciones mínimas de los parques?", ["El Gobierno de Aragón, reglamentariamente", "Cada vecino", "La empresa de seguros"], "Art. 20.3."],
        [S3, "media", "¿En qué registro deben inscribirse el servicio y su personal?", ["En el Registro de Bomberos de Aragón", "En el Registro Civil", "En ninguno"], "Art. 17.1."],
        [S2, "dificil", "¿Qué conserva el personal municipal adscrito a un consorcio?", ["Antigüedad, categoría, retribución y su régimen de Seguridad Social", "Nada", "Solo el uniforme"], "DT 2ª."],
        [S3, "media", "¿Qué órgano informa los proyectos normativos sobre condiciones de trabajo del personal operativo?", ["La Comisión de Coordinación", "El Registro", "La Academia"], "Art. 16.c)."],
        [S4, "media", "¿Quién formaría al personal del nuevo consorcio?", ["La Academia Aragonesa de Bomberos", "La comarca", "La Diputación exclusivamente"], "Arts. 25 y 27."],
        [S3, "media", "¿Qué elabora el Departamento competente para garantizar la eficacia de los servicios?", ["El Plan Director de los SPEIS de Aragón", "Una ordenanza fiscal", "Un convenio colectivo"], "Art. 13.2.g)."],
      ],
    },
  ],
});
