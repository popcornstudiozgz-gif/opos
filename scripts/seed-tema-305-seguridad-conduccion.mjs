/**
 * Crea tema-305 — Tema 10 de Bombero/a Conductor/a: "Seguridad en la
 * conducción": art. 27 del RDLeg 6/2015; arts. 20-28 y 67-70 del RD
 * 1428/2003 (RGC); señales V-1, V-2 y V-3 del RD 2822/1998 (RGV); arts.
 * 379-385 del Código Penal; arts. 2-4 del RD 836/2012.
 *
 * Fuente principal: Tema 10 de la Escuela de Bomberos de Zaragoza
 * (V. 11-2024), leído íntegro, que transcribe literalmente esos preceptos.
 * Identificadores BOE verificados en la sesión: RDLeg 6/2015
 * (BOE-A-2015-11722), RD 1428/2003 (BOE-A-2003-23514), RD 2822/1998
 * (BOE-A-1999-1826), LO 10/1995 (BOE-A-1995-25444) y RD 836/2012
 * (BOE-A-2012-7655).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-305-seguridad-conduccion.mjs
 */
import { sembrarTema, BOMBERO } from "./lib/sembrar-tema.mjs";

const FUENTE = BOMBERO.escuela("Tema_10_Seguridad_en_la_conduccion_V_112024.pdf");
const boe = (id) => `https://www.boe.es/buscar/act.php?id=${id}`;
const S1 = "seguridad-vial-vehiculos-prioritarios";
const S2 = "alcohol-drogas-conduccion";
const S3 = "senales-v1-v2-v3";
const S4 = "delitos-seguridad-vial";
const S5 = "transporte-sanitario";

await sembrarTema({
  tema: {
    slug: "tema-305",
    titulo: "Seguridad en la conducción de vehículos de urgencia",
    descripcion: "Seguridad vial y conducción del vehículo prioritario; régimen de los vehículos en servicio de urgencia (art. 27 LTSV y arts. 67-70 RGC); alcohol y drogas (arts. 20-28 RGC); señales V-1, V-2 y V-3; delitos contra la seguridad vial (arts. 379-385 CP); clases, características y dotación de las ambulancias (RD 836/2012).",
    contenido: "Recoge lo que el bombero conductor debe saber para trasladar la dotación con seguridad: la seguridad activa y pasiva, la «escala de valores» de las salidas y los privilegios limitados del vehículo prioritario; las tasas de alcohol y las pruebas de detección; las señales luminosas V-1, V-2 y V-3; los delitos contra la seguridad vial; y las clases de ambulancias con su equipamiento y personal.",
    enlaces_boe: [
      { url: FUENTE, titulo: "Escuela de Bomberos de Zaragoza — Tema 10: Seguridad en la conducción (V.11-2024)" },
      { url: boe("BOE-A-2015-11722"), titulo: "RDLeg 6/2015, texto refundido de la Ley sobre Tráfico (art. 27)" },
      { url: boe("BOE-A-2003-23514"), titulo: "RD 1428/2003, Reglamento General de Circulación (arts. 20-28 y 67-70)" },
      { url: boe("BOE-A-1999-1826"), titulo: "RD 2822/1998, Reglamento General de Vehículos (señales V-1, V-2, V-3)" },
      { url: boe("BOE-A-1995-25444"), titulo: "LO 10/1995, Código Penal (arts. 379-385)" },
      { url: boe("BOE-A-2012-7655"), titulo: "RD 836/2012, vehículos de transporte sanitario por carretera (arts. 2-4)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "Seguridad vial y vehículos prioritarios", articulos: "LTSV art. 27; RGC arts. 67-70", url: `${boe("BOE-A-2003-23514")}#a67` },
      { seccion: S2, titulo: "Alcohol, drogas y conducción", articulos: "RGC arts. 20-28", url: `${boe("BOE-A-2003-23514")}#a20` },
      { seccion: S3, titulo: "Señales V-1, V-2 y V-3", articulos: "RGV, anexo XI", url: boe("BOE-A-1999-1826") },
      { seccion: S4, titulo: "Delitos contra la seguridad vial", articulos: "CP arts. 379-385 ter", url: `${boe("BOE-A-1995-25444")}#a379` },
      { seccion: S5, titulo: "Vehículos de transporte sanitario", articulos: "RD 836/2012 arts. 2-4", url: boe("BOE-A-2012-7655") },
    ],
  },
  vinculo: { oposicion: BOMBERO.oposicion, bloqueId: BOMBERO.bloqueParteII, numero: 10 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["¿Qué cuatro elementos intervienen en la producción de accidentes según el Tema 10?", "El hombre, el vehículo, la vía y las condiciones climatológicas adversas"],
        ["¿Qué diferencia la seguridad activa de la pasiva?", "La activa (primaria) depende del buen estado y uso de motor, luces, frenos y neumáticos con la atención del conductor; la pasiva (secundaria) actúa automáticamente en la colisión para proteger a los ocupantes: carrocería, cinturones, airbag"],
        ["¿Qué dice el art. 27 de la Ley sobre Tráfico de los vehículos de servicios de urgencia?", "Que tienen preferencia de paso cuando están en servicio urgente y pueden circular por encima de los límites de velocidad y quedar exentos de otras normas o señales en los términos reglamentarios"],
        ["¿Qué señales deben usar simultáneamente los vehículos prioritarios (art. 68.2 RGC)?", "La señal luminosa V-1 y el aparato emisor de señales acústicas especiales; la luminosa sola cuando omitir la acústica no entrañe peligro"],
        ["¿Qué normas no puede dejar de cumplir nunca el conductor de un vehículo prioritario (art. 68.1 RGC)?", "Las órdenes y señales de los agentes, que son siempre de obligado cumplimiento"],
        ["¿Qué deben hacer los demás conductores al percibir un vehículo prioritario (art. 69 RGC)?", "Facilitarle el paso apartándose normalmente a su derecha o deteniéndose si es preciso"],
        ["¿Qué es la «escala de valores» de la que habla el Tema 10?", "Que no todos los servicios exigen la misma rapidez: no es igual un achique con daños materiales que un accidente con atrapados o un incendio con personas bloqueadas, siempre dentro de los límites de la seguridad vial"],
      ],
      preguntas: [
        ["facil", "¿Qué tipo de seguridad incluye el airbag y los cinturones?", ["Seguridad pasiva o secundaria", "Seguridad activa o primaria", "Seguridad vial urbana"], "La pasiva actúa automáticamente en la colisión (Tema 10)."],
        ["media", "Según el art. 68.1 RGC, ¿qué deben respetar siempre los conductores de vehículos prioritarios?", ["Las órdenes y señales de los agentes", "Los límites de velocidad", "Los semáforos en rojo en todo caso"], "Pueden dejar de cumplir las normas de los títulos II, III y IV bajo su responsabilidad, salvo las órdenes y señales de los agentes."],
        ["media", "En autopista o autovía y en servicio urgente, el vehículo prioritario puede circular en sentido contrario:", ["Por el arcén, sin comprometer la seguridad de nadie", "Por cualquier carril", "Nunca"], "Art. 68.1 RGC."],
        ["media", "¿Qué tipo de infracción es incumplir las normas del art. 68 RGC?", ["Grave", "Leve", "Muy grave"], "Art. 68.3 RGC."],
        ["dificil", "Si un vehículo no prioritario debe hacer por fuerza mayor un servicio urgente, ¿cómo lo advierte (art. 70 RGC)?", ["Con el avisador acústico intermitente y la luz de emergencia, o agitando un pañuelo", "Con la señal V-1 azul", "No puede advertirlo de ninguna forma"], "Art. 70.1 RGC."],
        ["media", "¿Qué autoriza la instalación de luces y señales acústicas especiales en un vehículo prioritario (art. 67.3 RGC)?", ["La Jefatura Provincial de Tráfico", "El Ayuntamiento", "El fabricante"], "Art. 67.3 RGC."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["¿Cuál es la tasa máxima de alcohol para los conductores de vehículos de servicio de urgencia (art. 20 RGC)?", "0,3 gramos por litro en sangre o 0,15 miligramos por litro en aire espirado"],
        ["¿Cuál es la tasa general de alcohol para los demás conductores?", "0,5 g/l en sangre o 0,25 mg/l en aire espirado (0,3 y 0,15 durante los dos primeros años de permiso)"],
        ["¿Quién está obligado a someterse a las pruebas de alcoholemia (art. 21 RGC)?", "Todos los conductores de vehículos y bicicletas, y los demás usuarios de la vía implicados en un accidente"],
        ["¿Cuánto tiempo debe mediar entre la primera y la segunda prueba de alcoholemia (art. 23 RGC)?", "Un tiempo mínimo de 10 minutos, que el interesado tiene derecho a controlar"],
        ["¿Qué puede hacer el agente si la prueba da positivo o el conductor se niega (art. 25 RGC)?", "Inmovilizar el vehículo, salvo que otra persona habilitada pueda conducirlo"],
        ["¿Qué tipo de infracción es conducir con alcohol o drogas o negarse a las pruebas?", "Infracción muy grave"],
      ],
      preguntas: [
        ["facil", "¿Qué tasa de alcohol en aire espirado no puede superar el conductor de un camión de bomberos?", ["0,15 mg/l", "0,25 mg/l", "0,60 mg/l"], "Art. 20 RGC: servicio de urgencia, 0,3 g/l en sangre o 0,15 mg/l en aire."],
        ["media", "¿Qué tasa en sangre no pueden superar los conductores de vehículos de servicio de urgencia?", ["0,3 g/l", "0,5 g/l", "1,2 g/l"], "Art. 20 RGC."],
        ["media", "¿Con qué se realizan normalmente las pruebas de alcoholemia?", ["Con etilómetros oficialmente autorizados que analizan el aire espirado", "Con análisis de sangre en todos los casos", "Con un test de orina"], "Art. 22 RGC."],
        ["media", "Si el análisis de contraste pedido por el interesado da negativo, ¿quién paga?", ["La Administración competente, devolviéndose el depósito", "El interesado", "El agente que hizo la prueba"], "Art. 23.4 RGC."],
        ["dificil", "¿En qué consisten normalmente las pruebas de detección de drogas (art. 28 RGC)?", ["En el reconocimiento médico y los análisis clínicos que el facultativo estime adecuados", "Solo en una prueba de aire espirado", "En una entrevista con el agente"], "Art. 28.1.a) RGC."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["¿Qué indica la señal V-1?", "Vehículo prioritario: servicio de policía, extinción de incendios, protección civil y salvamento o asistencia sanitaria en servicio urgente"],
        ["¿De qué color es la V-1 y a qué distancia debe verse?", "Azul, homologada según el Reglamento CEPE/ONU nº 65, visible en todas las direcciones a 50 metros como mínimo"],
        ["¿Qué indica la señal V-2?", "Vehículo-obstáculo en la vía: vehículo que trabaja parado, estacionado o a no más de 40 km/h"],
        ["¿De qué color es la V-2 y a qué distancia debe verse?", "Amarillo auto, visible en todas las direcciones desde 100 metros"],
        ["¿Qué indica la señal V-3?", "Vehículo de policía en servicio no urgente: rotulación en los costados con la denominación del cuerpo y su imagen corporativa"],
        ["¿Requiere autorización administrativa usar la V-1 o la V-2?", "No, ni como elemento supletorio adicional ni como elemento constructivo; pero está prohibido montarlas en vehículos que no reúnan las condiciones"],
      ],
      preguntas: [
        ["facil", "¿De qué color es la señal luminosa V-1?", ["Azul", "Amarillo auto", "Rojo"], "V-1, vehículo prioritario: luz azul."],
        ["facil", "¿Qué señal usa un vehículo que trabaja en la vía a menos de 40 km/h?", ["V-2", "V-1", "V-3"], "V-2, vehículo-obstáculo en la vía."],
        ["media", "¿A qué distancia mínima debe ser visible la señal V-2?", ["100 metros", "50 metros", "200 metros"], "RGV, V-2.3."],
        ["media", "¿Qué deben usar los vehículos obligados a la V-2 si esta se avería?", ["La luz de cruce con los indicadores de dirección en emergencia", "La señal V-1", "Nada"], "RGV, V-2.1."],
        ["dificil", "¿Cómo son las franjas de los distintivos retrorreflectantes opcionales de la V-2?", ["Rojas y blancas inclinadas 45º, de 100 mm de anchura", "Amarillas y negras verticales", "Azules y blancas horizontales"], "RGV, V-2.4."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["¿Qué exceso de velocidad es delito según el art. 379.1 CP?", "Superar en 60 km/h la velocidad permitida en vía urbana o en 80 km/h en vía interurbana"],
        ["¿A partir de qué tasa de alcohol es siempre delito conducir (art. 379.2 CP)?", "Más de 0,60 mg/l en aire espirado o más de 1,2 g/l en sangre"],
        ["¿Qué castiga el art. 380 CP?", "Conducir con temeridad manifiesta poniendo en concreto peligro la vida o la integridad de las personas"],
        ["¿Qué castiga el art. 383 CP?", "Negarse, a requerimiento de un agente, a someterse a las pruebas legales de alcoholemia y drogas"],
        ["¿Qué castiga el art. 384 CP?", "Conducir con el permiso sin vigencia por pérdida total de puntos, tras privación judicial o sin haberlo obtenido nunca"],
        ["¿Qué castiga el art. 385 CP?", "Originar un grave riesgo para la circulación colocando obstáculos, derramando sustancias deslizantes o inflamables, alterando la señalización o no restableciendo la seguridad de la vía cuando hay obligación"],
      ],
      preguntas: [
        ["facil", "Conducir a más de 110 km/h en una vía urbana limitada a 50 km/h es:", ["Delito del art. 379.1 CP", "Solo una infracción leve", "Delito de omisión del deber de socorro"], "Se superan en 60 km/h los 50 permitidos en vía urbana."],
        ["media", "¿Qué pena de privación del derecho a conducir prevé el art. 379 CP?", ["Más de uno y hasta cuatro años", "De seis a diez años", "Hasta seis meses"], "Art. 379 CP."],
        ["media", "Negarse a la prueba de alcoholemia requerida por un agente es:", ["Delito del art. 383 CP", "Una infracción leve", "No tiene consecuencias"], "Art. 383 CP."],
        ["dificil", "Abandonar voluntariamente el lugar tras causar un accidente con fallecidos, fuera de los casos del art. 195 CP, es delito del:", ["Art. 382 bis CP", "Art. 384 CP", "Art. 385 CP"], "Art. 382 bis CP, abandono del lugar del accidente."],
        ["media", "¿Qué considera el art. 385 bis CP al vehículo utilizado en estos delitos?", ["Instrumento del delito", "Prueba pericial", "Bien embargable en todo caso"], "Art. 385 bis CP."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["¿Qué clases de ambulancias distingue el RD 836/2012?", "No asistenciales (A1 convencionales y A2 de transporte colectivo) y asistenciales (B, soporte vital básico; C, soporte vital avanzado)"],
        ["¿Qué identificación exterior deben llevar las ambulancias?", "La palabra «Ambulancia» detrás y delante; la delantera escrita en sentido inverso para leerse por reflexión"],
        ["¿Qué documentos obligatorios lleva toda ambulancia?", "Registro de desinfecciones del habitáculo y del equipamiento, y libro de reclamaciones"],
        ["¿Qué dotación mínima lleva una ambulancia de clase C?", "Un conductor técnico en emergencias sanitarias (o habilitado) y un enfermero; y un médico cuando la asistencia lo requiera"],
        ["¿Qué dotación mínima lleva una ambulancia de clase B?", "Un conductor y un ayudante con el título de técnico en emergencias sanitarias"],
        ["¿Qué neumáticos exige el RD 836/2012 en las ambulancias?", "Neumáticos de invierno o, en su defecto, cadenas, al menos de noviembre a marzo"],
      ],
      preguntas: [
        ["facil", "¿Qué clase de ambulancia proporciona soporte vital avanzado?", ["Clase C", "Clase B", "Clase A1"], "RD 836/2012, art. 2."],
        ["media", "Una ambulancia de transporte colectivo de enfermos no urgentes es de clase:", ["A2", "A1", "B"], "RD 836/2012, art. 2."],
        ["media", "¿Qué profesional sanitario debe llevar como mínimo una ambulancia de clase C?", ["Un enfermero", "Un médico en todo caso", "Ninguno"], "RD 836/2012, art. 4.1.c)."],
        ["media", "¿Por qué la palabra «Ambulancia» delantera se escribe en sentido inverso?", ["Para leerse por reflexión en los retrovisores", "Por tradición", "Para que no se lea de frente"], "RD 836/2012, art. 3."],
        ["dificil", "¿Con qué deben contar además las ambulancias asistenciales?", ["Transmisión de datos y localización GPS con su Centro de Coordinación de Urgencias", "Una grúa de arrastre", "Un remolque sanitario"], "RD 836/2012, art. 3.2."],
      ],
    },
  ],
  glosario: [
    [S1, "Vehículo prioritario", "Vehículo de policía, extinción de incendios, protección civil y salvamento o asistencia sanitaria que circula en servicio urgente con la señal V-1 y señales acústicas especiales."],
    [S1, "Seguridad pasiva", "Elementos del vehículo que protegen automáticamente a los ocupantes en una colisión, como la carrocería, los cinturones o el airbag."],
    [S2, "Etilómetro", "Aparato oficialmente autorizado que mide la concentración de alcohol en el aire espirado."],
    [S3, "Señal V-2", "Luz amarillo auto que indica un vehículo-obstáculo en la vía, trabajando parado o a no más de 40 km/h."],
    [S4, "Conducción temeraria", "Conducción con temeridad manifiesta que pone en concreto peligro la vida o integridad de las personas (art. 380 CP)."],
    [S5, "Ambulancia asistencial", "Ambulancia acondicionada para asistencia técnico-sanitaria en ruta: clase B (soporte vital básico) o C (avanzado)."],
  ],
  casos: [
    {
      slug: "caso-salida-urgente-incendio-vivienda",
      titulo: "Salida urgente a un incendio con personas atrapadas",
      supuesto: "Entra un aviso de incendio en una vivienda con personas atrapadas. El bombero conductor sale del parque con la autobomba y debe atravesar varias intersecciones con semáforos y tráfico denso.",
      preguntas: [
        [S1, "facil", "¿Qué señales debe usar para avisar de su presencia?", ["La V-1 junto con las señales acústicas especiales", "Solo las luces de cruce", "La V-2"], "Art. 68.2 RGC."],
        [S1, "media", "Ante un semáforo en rojo, ¿puede pasar?", ["Sí, tras extremar precauciones y cerciorarse de que no hay riesgo", "Sí, sin reducir la velocidad", "No, nunca"], "Art. 67.2 RGC."],
        [S1, "media", "Un agente de tráfico le ordena detenerse en un cruce. ¿Qué hace?", ["Obedecer: las órdenes de los agentes son siempre obligatorias", "Seguir, porque es prioritario", "Tocar la sirena y continuar"], "Art. 68.1 RGC."],
        [S1, "media", "¿Qué deben hacer los coches que circulan delante?", ["Facilitarle el paso apartándose a la derecha o deteniéndose", "Acelerar", "Nada"], "Art. 69 RGC."],
        [S1, "media", "Según la «escala de valores», ¿cómo valora este servicio respecto a un achique?", ["Exige más rapidez, siempre dentro de la seguridad vial", "Exige la misma rapidez", "Exige menos rapidez"], "Tema 10, escala de valores."],
        [S1, "dificil", "¿Quién responde de los efectos de la conducción y del personal trasladado?", ["El bombero conductor", "El oficial de la dotación", "El Ayuntamiento en exclusiva"], "Tema 10: el conductor es responsable de los efectos de su conducción."],
        [S2, "media", "¿Qué tasa de alcohol en aire no puede superar este conductor?", ["0,15 mg/l", "0,25 mg/l", "0,60 mg/l"], "Art. 20 RGC, vehículos de servicio de urgencia."],
        [S4, "media", "Si condujera con temeridad manifiesta poniendo en peligro concreto a peatones, ¿qué cometería?", ["Un delito del art. 380 CP", "Una simple infracción leve", "Nada, por ser prioritario"], "El régimen prioritario no ampara poner en peligro a otros."],
        [S1, "media", "¿Cuál es su misión según el Tema 10?", ["Llegar con la mayor seguridad, sin provocar otra emergencia", "Llegar lo antes posible a cualquier precio", "Abrir paso a la policía"], "Tema 10, apartado 2."],
        [S3, "media", "Al llegar y detenerse a trabajar en la calzada, ¿qué señal indica el vehículo-obstáculo?", ["La V-2", "La V-3", "Ninguna"], "La V-2 señaliza vehículos trabajando parados en la vía."],
      ],
    },
    {
      slug: "caso-control-alcoholemia-conductor-servicio",
      titulo: "Un control de alcoholemia a la salida de un servicio",
      supuesto: "De regreso al parque tras un servicio, un control preventivo de la Policía Local pide al bombero conductor que se someta a una prueba de alcoholemia.",
      preguntas: [
        [S2, "facil", "¿Está obligado a someterse a la prueba?", ["Sí, todos los conductores lo están", "No, por ser vehículo prioritario", "Solo si ha tenido un accidente"], "Art. 21 RGC."],
        [S2, "media", "¿Con qué aparato se le hará normalmente?", ["Con un etilómetro autorizado", "Con un análisis de sangre", "Con un test de saliva siempre"], "Art. 22 RGC."],
        [S2, "media", "Si diera 0,20 mg/l en aire, ¿superaría su tasa?", ["Sí, el límite para servicios de urgencia es 0,15 mg/l", "No, el límite es 0,25 mg/l", "No, el límite es 0,60 mg/l"], "Art. 20 RGC."],
        [S2, "media", "Si da positivo, ¿qué debe hacer el agente?", ["Hacer una segunda prueba de contraste informándole antes", "Detenerle de inmediato", "Nada más"], "Art. 23.1 RGC."],
        [S2, "media", "¿Cuánto tiempo debe pasar entre ambas pruebas?", ["Al menos 10 minutos", "Una hora", "Ninguno"], "Art. 23.2 RGC."],
        [S2, "media", "¿Puede pedir un análisis de sangre de contraste?", ["Sí, en un centro sanitario", "No", "Solo con permiso del juez"], "Art. 23.3 RGC."],
        [S2, "media", "Con resultado positivo, ¿qué puede pasar con la autobomba?", ["Puede inmovilizarse salvo que otro conductor habilitado se haga cargo", "Se requisa definitivamente", "Nada"], "Art. 25.1 RGC."],
        [S4, "dificil", "¿A partir de qué tasa en aire sería siempre delito?", ["Más de 0,60 mg/l", "Más de 0,15 mg/l", "Más de 0,30 mg/l"], "Art. 379.2 CP."],
        [S4, "media", "Si se negara a la prueba, ¿qué delito cometería?", ["El del art. 383 CP", "El del art. 385 CP", "Ninguno"], "Art. 383 CP."],
        [S2, "media", "Administrativamente, conducir con una tasa superior a la permitida es una infracción:", ["Muy grave", "Leve", "Grave"], "Art. 26.2 RGC."],
      ],
    },
    {
      slug: "caso-uvi-movil-servicio",
      titulo: "La UVI móvil acompaña a la dotación",
      supuesto: "En un accidente de tráfico con heridos, acude junto a la dotación una UVI móvil del Servicio, y el bombero conductor colabora en su colocación y en la señalización del lugar.",
      preguntas: [
        [S5, "facil", "¿Qué clase de ambulancia es una UVI móvil de soporte vital avanzado?", ["Clase C", "Clase A1", "Clase A2"], "RD 836/2012, art. 2."],
        [S5, "media", "¿Qué personal mínimo lleva una ambulancia de clase C?", ["Conductor técnico en emergencias sanitarias y enfermero, y médico cuando se requiera", "Solo un conductor", "Dos voluntarios"], "RD 836/2012, art. 4.1.c)."],
        [S5, "media", "¿Qué documento debe llevar la ambulancia sobre la limpieza?", ["Registro de desinfecciones del habitáculo y del equipamiento", "El parte de guardia", "Ninguno"], "RD 836/2012, art. 3."],
        [S5, "media", "¿Cómo deben ser los revestimientos interiores de la célula sanitaria?", ["Lisos, impermeables, autoextinguibles, lavables y resistentes a desinfectantes", "De moqueta", "De madera barnizada"], "RD 836/2012, art. 3."],
        [S3, "media", "Mientras la ambulancia va en servicio urgente, ¿qué señal luminosa lleva?", ["V-1 azul", "V-2 amarilla", "V-3"], "La V-1 identifica el servicio de asistencia sanitaria urgente."],
        [S3, "media", "Con los vehículos parados trabajando en la calzada, ¿qué señal advierte del obstáculo?", ["La V-2", "La V-1", "Ninguna"], "RGV, V-2."],
        [S1, "media", "¿Dónde deben situarse los vehículos de urgencia según el art. 68.1 RGC?", ["Donde determinen los agentes de vigilancia del tráfico", "Donde quiera cada conductor", "Siempre en el arcén"], "Art. 68.1 RGC."],
        [S5, "media", "¿Qué exige el RD 836/2012 sobre neumáticos de noviembre a marzo?", ["De invierno o cadenas", "Ninguna exigencia", "Neumáticos de competición"], "RD 836/2012, art. 3."],
        [S4, "dificil", "Si un conductor ajeno hubiera derramado combustible creando un grave riesgo para la circulación, ¿qué delito podría haber cometido?", ["El del art. 385 CP", "El del art. 379 CP", "El del art. 383 CP"], "Art. 385 CP."],
        [S5, "media", "¿Con qué norma técnica deben cumplir además las ambulancias según su clase?", ["UNE-EN 1789", "UNE-EN 124", "ISO 128"], "RD 836/2012, art. 3.2."],
      ],
    },
  ],
});
