/**
 * Crea tema-330 — Tema 35 de Bombero/a Conductor/a: "Código Técnico de la
 * Edificación. Anejo SI A del Documento Básico SI, Seguridad en caso de
 * incendio."
 *
 * Fuente: Documento Básico SI del CTE, texto consolidado publicado por el
 * Ministerio en codigotecnico.org (versión de 4 de marzo de 2025, que
 * incorpora el RD 164/2025), descargado y leído íntegro el Anejo SI A
 * "Terminología". El CTE se aprobó por el RD 314/2006, de 17 de marzo
 * (BOE-A-2006-5515, título verificado). El propio documento advierte que el
 * texto consolidado no tiene valor jurídico.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-330-cte-db-si-anejo-a-terminologia.mjs
 */
import { sembrarTema, BOMBERO } from "./lib/sembrar-tema.mjs";

const DBSI = "https://www.codigotecnico.org/pdf/Documentos/SI/DBSI.pdf";
const RD = "https://www.boe.es/buscar/act.php?id=BOE-A-2006-5515";
const S1 = "evacuacion-conceptos";
const S2 = "escaleras-pasillos-vestibulos";
const S3 = "salidas-espacio-exterior-refugio";
const S4 = "sectores-fuego-carga";
const S5 = "usos-ascensor-otros";

await sembrarTema({
  tema: {
    slug: "tema-330",
    titulo: "CTE DB-SI, Anejo SI A: terminología de seguridad en caso de incendio",
    descripcion: "Definiciones del Anejo SI A del DB-SI: altura y origen de evacuación, recorridos de evacuación y alternativos, zona de ocupación nula; escalera protegida, especialmente protegida y abierta al exterior, pasillo protegido, vestíbulo de independencia; salidas de planta, de edificio y de emergencia, espacio exterior seguro, zona de refugio; sector de incendio, sector de riesgo mínimo y bajo rasante, carga y densidad de carga de fuego, curvas tiempo-temperatura, reacción y resistencia al fuego; usos (administrativo, almacén, aparcamiento, comercial, docente, hospitalario, residencial), ascensor de emergencia, atrio, caja escénica y ventilación.",
    contenido: "Recorre el glosario oficial del Documento Básico de Seguridad en caso de Incendio del Código Técnico de la Edificación: qué significa exactamente cada término que usa la normativa (una escalera protegida, un sector de incendio, una salida de planta, un espacio exterior seguro…) y los datos concretos que fija para cada uno, como las puertas EI2 60-C5 de la escalera protegida o el ascensor de emergencia por cada mil ocupantes.",
    enlaces_boe: [
      { url: DBSI, titulo: "CTE — Documento Básico SI, Seguridad en caso de incendio (consolidado, marzo 2025), Anejo SI A" },
      { url: RD, titulo: "RD 314/2006, de 17 de marzo, por el que se aprueba el Código Técnico de la Edificación (BOE-A-2006-5515)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "Evacuación: altura, origen, recorridos y zona de ocupación nula", articulos: "Anejo SI A", url: DBSI },
      { seccion: S2, titulo: "Escaleras protegidas, pasillo protegido y vestíbulo de independencia", articulos: "Anejo SI A", url: DBSI },
      { seccion: S3, titulo: "Salidas, espacio exterior seguro y zona de refugio", articulos: "Anejo SI A", url: DBSI },
      { seccion: S4, titulo: "Sectores de incendio, carga de fuego, curvas y comportamiento ante el fuego", articulos: "Anejo SI A", url: DBSI },
      { seccion: S5, titulo: "Usos, ascensor de emergencia y otros términos", articulos: "Anejo SI A", url: DBSI },
    ],
  },
  vinculo: { oposicion: BOMBERO.oposicion, bloqueId: BOMBERO.bloqueParteII, numero: 35 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Altura de evacuación", "La máxima diferencia de cotas entre un origen de evacuación y su salida de edificio, sin contar las plantas altas que solo tengan zonas de ocupación nula"],
        ["Origen de evacuación", "Todo punto ocupable de un edificio, salvo el interior de las viviendas y los recintos de hasta 50 m² con densidad no mayor de 1 persona/5 m² (habitaciones de hotel, despachos…)"],
        ["Recorrido de evacuación", "El que va desde un origen de evacuación hasta una salida de planta o de edificio; tras alcanzar la salida de planta, el resto no computa"],
        ["¿Qué recorridos no son válidos?", "Los de escaleras mecánicas y los que tengan tornos u otros elementos que dificulten el paso"],
        ["Recorridos alternativos", "Los que desde un punto forman un ángulo mayor de 45° o están separados por elementos EI 30 que impiden que el humo bloquee ambos"],
        ["Zona de ocupación nula", "Zona de presencia ocasional o de mantenimiento: salas de máquinas, cuartos de instalaciones, trasteros de viviendas…"],
        ["Máxima altura ascendente de un recorrido en general", "4 m hasta una salida de planta y 6 m hasta el espacio exterior seguro"],
      ],
      preguntas: [
        ["facil", "¿Es origen de evacuación un punto del interior de una vivienda?", ["No", "Sí", "Solo el salón"], "Anejo SI A."],
        ["media", "¿Son válidos los recorridos de evacuación por escaleras mecánicas?", ["No", "Sí", "Solo de bajada"], "Anejo SI A."],
        ["media", "¿Qué ángulo deben formar dos recorridos para ser alternativos?", ["Más de 45°", "Menos de 10°", "Exactamente 90°"], "Anejo SI A."],
        ["media", "¿Cómo se mide la longitud de un recorrido por pasillos y escaleras?", ["Sobre su eje", "Por el borde exterior", "En línea recta aérea"], "Anejo SI A."],
        ["dificil", "En uso Hospitalario (hospitalización), ¿qué altura ascendente máxima se admite hasta una salida de planta?", ["1 m", "4 m", "6 m"], "Tabla del Anejo SI A."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Escalera protegida", "Escalera de trazado continuo hasta la planta de salida que, en caso de incendio, es un recinto suficientemente seguro para permanecer en él un tiempo determinado"],
        ["Compartimentación de la escalera protegida", "Recinto exclusivo de circulación separado por elementos EI 120, con como máximo dos accesos por planta mediante puertas EI2 60-C5"],
        ["Recorrido máximo desde la escalera protegida hasta la salida de edificio en planta de salida", "15 m, salvo que discurra por un sector de riesgo mínimo"],
        ["Protección frente al humo de la escalera protegida", "Ventilación natural (al menos 1 m² por planta), dos conductos independientes de entrada y salida (50 cm² por m³) o presión diferencial (EN 12101-6)"],
        ["Escalera especialmente protegida", "La que cumple lo de la protegida y además tiene un vestíbulo de independencia en cada acceso desde cada planta"],
        ["Escalera abierta al exterior", "La que tiene huecos permanentemente abiertos de al menos 5A m² por planta (A = anchura del tramo); se considera especialmente protegida sin vestíbulos"],
        ["Vestíbulo de independencia", "Recinto exclusivo de circulación entre zonas para mejorar la compartimentación: paredes EI 120, puertas con 1/4 de la resistencia exigida y al menos EI2 30-C5, 0,50 m entre barridos de puertas"],
        ["Pasillo protegido", "Pasillo con condiciones equivalentes a una escalera protegida; si ventila por huecos, al menos 0,2L m² (L = longitud)"],
      ],
      preguntas: [
        ["facil", "¿Qué resistencia tienen los elementos que compartimentan una escalera protegida?", ["EI 120", "EI 30", "EI 15"], "Anejo SI A."],
        ["media", "¿Cuántos accesos por planta puede tener como máximo una escalera protegida?", ["Dos", "Uno", "Cinco"], "Anejo SI A."],
        ["media", "¿Qué añade la escalera especialmente protegida a la protegida?", ["Un vestíbulo de independencia en cada acceso", "Un ascensor", "Ventanas"], "Anejo SI A."],
        ["media", "¿Qué superficie mínima de ventilación natural por planta exige la escalera protegida?", ["1 m²", "0,1 m²", "10 m²"], "Anejo SI A."],
        ["dificil", "¿Qué resistencia mínima tienen las puertas de un vestíbulo de independencia?", ["EI2 30-C5", "EI 120", "Ninguna"], "Anejo SI A."],
        ["media", "¿Con qué pueden comunicar los vestíbulos de independencia?", ["Solo con las zonas a independizar, aseos de planta y ascensores", "Con cualquier local", "Con la calle"], "Anejo SI A."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Salida de planta", "El arranque de una escalera compartimentada, la puerta a escalera protegida, pasillo protegido o vestíbulo de escalera especialmente protegida; una puerta a otro sector con condiciones; o una salida de edificio"],
        ["Salida de edificio", "Puerta o hueco a un espacio exterior seguro; para hasta 500 personas, vale la que da a un espacio con dos recorridos alternativos a espacios exteriores seguros, uno de no más de 50 m"],
        ["Salida de emergencia", "Salida de planta, de edificio o de recinto prevista exclusivamente para emergencias y señalizada como tal"],
        ["Espacio exterior seguro", "Donde termina la evacuación: permite dispersarse con seguridad, disipar humo y calor y el acceso de bomberos; superficie de 0,5P m² en un radio de 0,1P m ante cada salida (P = ocupantes)"],
        ["Distancia mínima al edificio si el espacio no comunica con la red viaria", "No vale ninguna zona a menos de 15 m del edificio, salvo sectores estructuralmente independientes"],
        ["Zona de refugio", "Plazas de 1,20 × 0,80 m para silla de ruedas o 0,80 × 0,60 m para otra movilidad reducida, en rellanos de escaleras protegidas, vestíbulos o pasillos protegidos, con círculo de 1,50 m"],
      ],
      preguntas: [
        ["facil", "¿A qué da una salida de edificio?", ["A un espacio exterior seguro", "A un pasillo", "A un sótano"], "Anejo SI A."],
        ["media", "¿Qué superficie debe haber ante cada salida a un espacio exterior seguro?", ["0,5P m², con P los ocupantes", "1 m² fijo", "P m²"], "Anejo SI A."],
        ["media", "¿Cuándo no es necesario comprobar esa superficie?", ["Cuando P no excede de 50 personas", "Nunca", "Si llueve"], "Anejo SI A."],
        ["media", "¿Qué dimensiones tiene una plaza de refugio para silla de ruedas?", ["1,20 × 0,80 m", "0,50 × 0,50 m", "2 × 2 m"], "Anejo SI A."],
        ["dificil", "¿Puede una cubierta ser espacio exterior seguro?", ["Sí, si además su estructura es independiente y un incendio no puede afectar a ambos", "Nunca", "Siempre"], "Anejo SI A."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Sector de incendio", "Espacio separado por elementos resistentes al fuego un tiempo determinado, donde se confina el incendio; los locales de riesgo especial no son sectores"],
        ["Sector de riesgo mínimo", "Sector solo de circulación, no bajo rasante, con densidad de carga de fuego ≤ 40 MJ/m² (≤ 50 en cada recinto), separado EI 120 con vestíbulos y con salidas directas a espacio exterior seguro"],
        ["Sector bajo rasante", "Sector cuyos recorridos deben salvar una altura de evacuación ascendente de 1,5 m o más"],
        ["Carga de fuego", "Suma de las energías caloríficas liberadas en la combustión de todos los materiales combustibles de un espacio (UNE-EN 1991-1-2)"],
        ["Curva normalizada tiempo-temperatura", "Curva nominal que representa un fuego totalmente desarrollado en un sector"],
        ["Reacción al fuego frente a resistencia al fuego", "Reacción: contribución de un material al fuego con su propia combustión. Resistencia: capacidad de un elemento de mantener un tiempo su función portante, integridad o aislamiento"],
        ["Fuego totalmente desarrollado y fuego localizado", "Totalmente desarrollado: participan todas las superficies combustibles. Localizado: solo afecta a una zona limitada de la carga de fuego"],
      ],
      preguntas: [
        ["facil", "¿Son sectores de incendio los locales de riesgo especial?", ["No", "Sí", "Solo los grandes"], "Anejo SI A."],
        ["media", "¿Qué densidad de carga de fuego máxima tiene un sector de riesgo mínimo en su conjunto?", ["40 MJ/m²", "400 MJ/m²", "4.000 MJ/m²"], "Anejo SI A."],
        ["media", "¿A partir de qué altura ascendente es un sector bajo rasante?", ["1,5 m", "4 m", "10 m"], "Anejo SI A."],
        ["media", "¿Qué mide la reacción al fuego?", ["La contribución de un material al desarrollo del fuego con su combustión", "El tiempo que aguanta una estructura", "La temperatura del humo"], "Anejo SI A."],
        ["dificil", "¿Qué es el tiempo equivalente de exposición al fuego?", ["El tiempo bajo la curva normalizada con efecto térmico igual al del incendio real", "La duración real del incendio", "El tiempo de llegada de los bomberos"], "Anejo SI A."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["Ascensor de emergencia: características", "Acceso desde escalera protegida o vestíbulo (puerta E30), 630 kg, cabina de 1,10 × 1,40 m, paso de 1,00 m, recorrido completo en menos de 60 s y fuente propia de 1 h"],
        ["Número de ascensores de emergencia", "Uno accesible por cada mil ocupantes o fracción"],
        ["Pulsador del ascensor de emergencia", "En planta de acceso, bajo tapa de vidrio, rotulado 'USO EXCLUSIVO BOMBEROS': envía el ascensor a esa planta y solo permite maniobrarlo desde la cabina"],
        ["Uso Hospitalario según el DB-SI", "Asistencia sanitaria con hospitalización de 24 h de personas mayoritariamente incapaces de cuidarse (hospitales, residencias geriátricas); lo ambulatorio es Administrativo"],
        ["Uso Aparcamiento", "Destinado a estacionamiento de más de 100 m²; se excluyen los garajes de vivienda unifamiliar y los aparcamientos exteriores aunque estén cubiertos"],
        ["Aparcamiento abierto", "Con huecos permanentemente abiertos de al menos 1/20 de su superficie por planta (1/40 repartido en dos fachadas opuestas) y no más de 0,5 m del borde de los huecos al techo"],
        ["Ventilación natural y forzada", "Natural: por la fuerza ascensional del humo. Forzada: con ventiladores mecánicos"],
        ["Caja escénica: separación de la sala", "Elementos EI 120, con boca de escena cerrable con telón EI 60 incombustible en no más de 30 s"],
      ],
      preguntas: [
        ["facil", "¿Qué rótulo lleva el pulsador del ascensor de emergencia?", ["USO EXCLUSIVO BOMBEROS", "SALIDA", "NO USAR"], "Anejo SI A."],
        ["media", "¿Qué carga mínima tiene el ascensor de emergencia?", ["630 kg", "300 kg", "2.000 kg"], "Anejo SI A."],
        ["media", "¿Qué autonomía tiene su fuente propia de energía?", ["1 hora como mínimo", "5 minutos", "24 horas"], "Anejo SI A."],
        ["media", "Una residencia geriátrica, ¿qué uso tiene a efectos del DB-SI?", ["Hospitalario", "Residencial Vivienda", "Administrativo"], "Anejo SI A."],
        ["dificil", "¿Cuántos ascensores de emergencia necesita un edificio con 2.300 ocupantes?", ["Tres", "Dos", "Uno"], "Uno por cada mil o fracción."],
        ["media", "¿Es de uso Aparcamiento el garaje de una vivienda unifamiliar?", ["No, está excluido", "Sí", "Solo si supera 100 m²"], "Anejo SI A."],
        ["media", "¿Cómo se define el atrio?", ["Espacio diáfano de varias plantas comunicadas con él por huecos, balcones o pasillos abiertos", "Un sótano", "Una cubierta"], "Anejo SI A."],
      ],
    },
  ],
  glosario: [
    [S1, "Origen de evacuación", "Todo punto ocupable desde el que se inicia un recorrido de evacuación."],
    [S1, "Altura de evacuación", "Máxima diferencia de cotas entre un origen de evacuación y su salida de edificio."],
    [S2, "EI2 60-C5", "Clasificación de puerta con integridad y aislamiento 60 minutos y autocierre de alta durabilidad."],
    [S2, "Vestíbulo de independencia", "Recinto de paso que separa dos zonas para reforzar la compartimentación frente al incendio."],
    [S3, "Espacio exterior seguro", "Espacio donde termina la evacuación, que permite dispersar a los ocupantes y el acceso de bomberos."],
    [S3, "Zona de refugio", "Espacio protegido con plazas reservadas para personas con movilidad reducida a la espera de ayuda."],
    [S4, "Sector de incendio", "Espacio delimitado por elementos resistentes al fuego en el que se confina un incendio."],
    [S4, "Carga de fuego", "Energía calorífica total que liberarían todos los combustibles de un espacio."],
    [S5, "Ascensor de emergencia", "Ascensor con requisitos especiales que pueden usar los bomberos en un incendio."],
  ],
  casos: [
    {
      slug: "caso-inspeccion-escalera-edificio",
      titulo: "Revisión de una escalera en un edificio de oficinas",
      supuesto: "En una visita de prevención a un edificio de oficinas de ocho plantas, el oficial revisa la escalera principal, que el promotor califica de 'especialmente protegida'.",
      preguntas: [
        [S2, "facil", "¿Qué debe tener en cada acceso para ser especialmente protegida?", ["Un vestíbulo de independencia", "Un extintor", "Una ventana"], "Anejo SI A."],
        [S2, "media", "¿Qué puertas deben tener los accesos a la escalera protegida?", ["EI2 60-C5", "De cristal", "Sin requisito"], "Anejo SI A."],
        [S2, "media", "¿Puede abrir a la escalera un cuarto de limpieza?", ["No, solo aseos, ascensores y registros EI 60 además de los accesos", "Sí", "Solo de día"], "Anejo SI A."],
        [S2, "media", "¿Qué paredes tiene un vestíbulo de independencia?", ["EI 120", "EI 30", "De pladur sin requisito"], "Anejo SI A."],
        [S2, "media", "¿Qué distancia mínima debe haber entre los barridos de las puertas del vestíbulo?", ["0,50 m", "5 cm", "3 m"], "Anejo SI A."],
        [S1, "media", "¿Computan las plantas altas con solo cuartos de máquinas para la altura de evacuación?", ["No", "Sí", "Solo si tienen ascensor"], "Anejo SI A."],
        [S3, "media", "En la planta de salida, ¿qué recorrido máximo hay desde la escalera protegida hasta la salida de edificio?", ["15 m", "50 m", "1 m"], "Anejo SI A."],
        [S2, "dificil", "¿Qué tres opciones de protección frente al humo admite?", ["Ventilación natural, conductos de entrada y salida o presión diferencial", "Solo extintores", "Ninguna"], "Anejo SI A."],
        [S5, "media", "Con 1.500 ocupantes, ¿cuántos ascensores de emergencia necesitaría?", ["Dos", "Uno", "Ninguno"], "Uno por cada mil o fracción."],
        [S3, "media", "¿Dónde pueden situarse las zonas de refugio?", ["En rellanos de escaleras protegidas, vestíbulos o pasillos protegidos", "En el aparcamiento", "En la azotea"], "Anejo SI A."],
      ],
    },
    {
      slug: "caso-centro-comercial-evacuacion",
      titulo: "Evacuación de un centro comercial",
      supuesto: "En un centro comercial con supermercado, una dotación revisa tras un simulacro los recorridos de evacuación, las cajas de cobro y las salidas.",
      preguntas: [
        [S1, "facil", "¿Son válidos como recorrido de evacuación los pasos con tornos?", ["No", "Sí", "Solo de noche"], "Anejo SI A."],
        [S1, "media", "Con carros, ¿pueden las cajas de cobro ser elementos de evacuación?", ["No; se intercalan salidas sin más de diez cajas entre dos", "Sí", "Solo una"], "Anejo SI A."],
        [S1, "media", "Sin carros, ¿qué anchura libre mínima deben tener los pasos por caja para servir de evacuación?", ["0,70 m", "0,20 m", "2 m"], "Anejo SI A."],
        [S5, "media", "¿Qué uso tiene el centro comercial a efectos del DB-SI?", ["Comercial", "Almacén", "Residencial"], "Anejo SI A."],
        [S3, "media", "¿Qué superficie mínima debe haber ante una salida por la que evacuan 400 personas?", ["200 m² (0,5P)", "4 m²", "400 m²"], "Anejo SI A."],
        [S3, "media", "¿Dentro de qué radio se mide esa superficie?", ["0,1P m (40 m)", "1 m", "500 m"], "Anejo SI A."],
        [S1, "media", "¿Qué condición deben cumplir dos recorridos para ser alternativos?", ["Ángulo mayor de 45° o separación EI 30", "Ir paralelos", "Tener la misma longitud"], "Anejo SI A."],
        [S3, "media", "¿Cómo se señaliza una salida prevista solo para emergencias?", ["Como salida de emergencia", "No se señaliza", "Como salida normal"], "Anejo SI A."],
        [S1, "dificil", "En comercios de más de 400 m² de público, ¿cómo deben ser los recorridos tras los 10 primeros metros?", ["Por pasillos definidos o señalizados, con tramos de no más de 20 m entre transversales", "Libres", "Por los almacenes"], "Anejo SI A."],
        [S5, "media", "Si no se definen mostradores y estanterías, ¿qué superficie útil se toma en las zonas de público?", ["Al menos el 75 % de la construida", "El 10 %", "El 200 %"], "Anejo SI A."],
      ],
    },
    {
      slug: "caso-incendio-aparcamiento-sotano",
      titulo: "Incendio en un aparcamiento subterráneo",
      supuesto: "Arde un coche en la segunda planta bajo rasante de un aparcamiento de un edificio de viviendas. El oficial valora el sector y las vías de evacuación.",
      preguntas: [
        [S5, "facil", "¿Qué uso tiene el aparcamiento a efectos del DB-SI si supera 100 m²?", ["Aparcamiento", "Residencial Vivienda", "Almacén"], "Anejo SI A."],
        [S4, "media", "¿Por qué es un sector bajo rasante?", ["Porque sus recorridos salvan una altura ascendente de 1,5 m o más", "Por estar oscuro", "Por ser grande"], "Anejo SI A."],
        [S1, "media", "¿Por dónde deben discurrir los recorridos de evacuación en un aparcamiento?", ["Por las calles de circulación o itinerarios peatonales protegidos", "Por las rampas de coches siempre", "Por los trasteros"], "Anejo SI A."],
        [S1, "media", "¿Puede un recorrido desde las viviendas atravesar el aparcamiento?", ["Solo como alternativa a otro recorrido no afectado", "Siempre", "Nunca"], "Anejo SI A."],
        [S5, "media", "¿Cómo se extrae el humo en la ventilación forzada?", ["Con ventiladores mecánicos", "Por diferencia de densidades", "No se extrae"], "Anejo SI A."],
        [S5, "media", "¿Qué condición tiene un aparcamiento abierto respecto a sus huecos?", ["Al menos 1/20 de su superficie permanentemente abierta por planta", "Ninguna", "Una puerta"], "Anejo SI A."],
        [S4, "media", "¿Qué representa un incendio que afecta a todas las superficies combustibles del sector?", ["Fuego totalmente desarrollado", "Fuego localizado", "Fuego de cálculo"], "Anejo SI A."],
        [S4, "dificil", "¿Qué curva representa ese fuego en los ensayos?", ["La curva normalizada tiempo-temperatura", "La curva de Bernoulli", "La curva de pandeo"], "Anejo SI A."],
        [S1, "media", "¿Son origen de evacuación los cuartos de instalaciones de más de 50 m²?", ["Sí, aunque no cuentan para la altura de evacuación ni ocupación", "No", "Solo de día"], "Anejo SI A."],
        [S4, "media", "¿Para qué sirve el sector de incendio?", ["Para confinar el fuego e impedir que se propague a otras zonas", "Para aparcar", "Para ventilar"], "Anejo SI A."],
      ],
    },
  ],
});
