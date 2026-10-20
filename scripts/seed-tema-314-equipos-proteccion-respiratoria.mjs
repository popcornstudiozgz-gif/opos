/**
 * Crea tema-314 — Tema 19 de Bombero/a Conductor/a: "Equipos de protección
 * respiratoria. Fisiología de la respiración: Anatomía y fisiología del
 * sistema respiratorio. Anatomía de las vías aéreas. Fisiología de la
 * respiración. Fases de la respiración. Clasificación de los equipos de
 * protección respiratoria: Introducción. Conexiones respiratorias. Filtros.
 * Equipos autónomos de circuito cerrado. Equipos autónomos de circuito
 * abierto. Cálculos de consumo de aire: Factores que influyen en el consumo
 * de aire. Autonomía y cálculo de consumo de aire."
 *
 * Fuente principal: la bibliografía oficial de la Escuela de Bomberos de
 * Zaragoza remite este tema al "Manual del bombero" de Arkaute (Academia de
 * Policía del País Vasco, junio 2011), libro 4.1 "Equipos de protección
 * respiratoria" — cuyo índice coincide literalmente con el enunciado oficial.
 * Descargado de la web pública de Bomberos Forales de Álava y leído. Parte
 * del PDF publicado es un escaneo con páginas giradas cuyo texto no se
 * extrae (en concreto, las fases de la respiración y el detalle de filtros
 * y equipos de circuito cerrado): esas partes se completan con el Manual
 * básico IVASPE (nov. 2017), Módulo 3, Tema 13 "Equipos de protección
 * respiratoria", leído íntegro. Donde ambos manuales dan cifras distintas
 * (p. ej. presión de salida del manorreductor o alarma de reserva) se usa
 * la del manual de Arkaute o se evita la pregunta.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-314-equipos-proteccion-respiratoria.mjs
 */
import { sembrarTema, BOMBERO } from "./lib/sembrar-tema.mjs";

const ARKAUTE = "https://suhiltzaileak.araba.eus/documents/2160217/2160430/4.1.Equipos+de+proteccion+respiratoria.pdf/0319e575-aa8b-2e57-8c32-d600dbda1d17?t=1570782040637";
const IVASPE = "https://www.valencia.es/documents/d/guest/manual-20bomberos-pdf";
const BIBLIO = BOMBERO.escuela("Bibliografia_externa_recomendada_temario_BNI.pdf");
const S1 = "fisiologia-respiracion";
const S2 = "clasificacion-conexiones-filtros";
const S3 = "circuito-cerrado";
const S4 = "circuito-abierto-era";
const S5 = "consumo-autonomia-aire";

await sembrarTema({
  tema: {
    slug: "tema-314",
    titulo: "Equipos de protección respiratoria: fisiología, clasificación, ERA y cálculo de autonomía",
    descripcion: "Anatomía del aparato respiratorio y vías aéreas, fases de la respiración y respiración en esfuerzo; equipos filtrantes y aislantes, conexiones respiratorias (boquilla, mascarilla, máscara, capucha), filtros de partículas, gases y combinados; equipos de circuito cerrado (regeneradores y de oxígeno químico); ERA de circuito abierto (botella, manorreductor, alarma, pulmoautomático, máscara); factores del consumo de aire y cálculo de autonomía total, de reserva y de trabajo.",
    contenido: "Sigue el libro 4.1 del Manual del bombero de Arkaute, que la Escuela de Bomberos de Zaragoza recomienda para este tema, completado con el Manual IVASPE en las partes del escaneo que no se leen: cómo respiramos y por qué el esfuerzo dispara el consumo de aire, qué tipos de equipos hay y cuándo no sirve un filtro, cómo funciona el equipo de respiración autónoma y cómo se calcula cuánto tiempo puede trabajar un bombero con su botella.",
    enlaces_boe: [
      { url: ARKAUTE, titulo: "Manual del bombero (Arkaute, 2011) — 4.1 Equipos de protección respiratoria" },
      { url: IVASPE, titulo: "Manual básico IVASPE (nov. 2017) — Módulo 3, Tema 13 (complemento)" },
      { url: BIBLIO, titulo: "Escuela de Bomberos de Zaragoza — Bibliografía externa recomendada (remite el Tema 19 al Manual de Arkaute)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "Fisiología de la respiración", articulos: "Arkaute 4.1, apartado 1; IVASPE M3-T13, apartado 1", url: ARKAUTE },
      { seccion: S2, titulo: "Clasificación, conexiones respiratorias y filtros", articulos: "Arkaute 4.1, apartados 3.1-3.3", url: ARKAUTE },
      { seccion: S3, titulo: "Equipos autónomos de circuito cerrado", articulos: "Arkaute 4.1, apartado 3.4; IVASPE M3-T13, apartado 3.2.2.1", url: ARKAUTE },
      { seccion: S4, titulo: "Equipos autónomos de circuito abierto (ERA)", articulos: "Arkaute 4.1, apartado 3.5", url: ARKAUTE },
      { seccion: S5, titulo: "Cálculos de consumo de aire y autonomía", articulos: "Arkaute 4.1, apartado 4", url: ARKAUTE },
    ],
  },
  vinculo: { oposicion: BOMBERO.oposicion, bloqueId: BOMBERO.bloqueParteII, numero: 19 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Recorrido del aire inspirado", "Nariz o boca, faringe, laringe, tráquea y árbol bronquial (bronquios, bronquiolos) hasta los alvéolos"],
        ["¿Cuántos alvéolos hay y tras cuántas divisiones bronquiales se llega a ellos?", "Unos 300 millones, tras aproximadamente 23 generaciones de ramificación"],
        ["Zonas del árbol bronquial según Arkaute", "Zona de conducción (16 primeras generaciones, sin intercambio), de transición (17-19) y respiratoria (desde la 19, con alvéolos)"],
        ["¿Qué es el espacio muerto?", "El aire que queda en las vías aéreas no respiratorias sin participar en el intercambio: de unos 500 cc por respiración, unos 150 cc"],
        ["Fases de la respiración", "Ventilación pulmonar (entrada y salida de aire), difusión de O2 y CO2 entre alvéolos y sangre, transporte de gases por la sangre y regulación de la respiración"],
        ["¿Qué factor químico controla más la respiración?", "El nivel de CO2 en sangre, a través de los centros respiratorios del bulbo raquídeo"],
        ["¿Cómo se transporta el oxígeno en sangre?", "Alrededor del 97-99 % unido a la hemoglobina y el resto disuelto en el plasma"],
        ["Círculo vicioso del CO2 con ERA", "Más CO2 → respiración más rápida y superficial → más CO2 y estrés; se rompe respirando de forma profunda y pausada"],
      ],
      preguntas: [
        ["facil", "¿Dónde se produce el intercambio de gases?", ["En los alvéolos", "En la tráquea", "En la laringe"], "Arkaute 4.1."],
        ["media", "¿Qué volumen de aire mueve un adulto en una respiración normal en reposo?", ["Unos 500 cc", "Unos 5 litros", "Unos 50 cc"], "Arkaute 4.1."],
        ["media", "¿Dónde están los centros que controlan la respiración?", ["En el bulbo raquídeo", "En el corazón", "En los riñones"], "Arkaute 4.1."],
        ["media", "¿Cuánto aire por minuto puede necesitar un trabajo pesado?", ["Unos 100 l/min", "5 l/min", "1.000 l/min"], "IVASPE M3-T13: en reposo 5-8 l/min."],
        ["dificil", "¿Qué es el volumen residual?", ["El aire que queda en los pulmones tras una espiración máxima", "El aire de una respiración normal", "El aire de la botella"], "Arkaute 4.1."],
        ["media", "¿Qué conviene hacer con la respiración al usar el ERA?", ["Respirar de forma profunda y pausada", "Hacer inspiraciones cortas para ahorrar", "Contener la respiración"], "Evita el círculo vicioso del CO2."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Dos grandes grupos de equipos de protección respiratoria", "Filtrantes (dependientes del medio ambiente) y aislantes o autónomos (independientes del medio ambiente)"],
        ["¿Cuándo no deben usarse equipos filtrantes según Arkaute?", "Con menos del 19,5 % de oxígeno, con concentraciones inmediatamente peligrosas (IDLH), desconocidas o por encima de los límites"],
        ["Cuatro tipos de conexiones respiratorias", "Boquilla, mascarilla, máscara y capucha"],
        ["Ventajas e inconvenientes de la capucha", "La más cómoda y protege toda la cabeza, pero su estanqueidad por sobrepresión consume 200-300 l/min"],
        ["¿Qué protege la máscara completa?", "Toda la cara, aunque deja los oídos sin protección"],
        ["Tipos de filtros", "De partículas (mecánicos, blancos, P1-P2-P3), de gases y vapores (químicos, por colores según el gas) y combinados"],
        ["¿Qué impide usar máscaras ajustadas a la cara?", "La barba, las patillas o rasgos faciales que impidan el contacto directo y la estanqueidad"],
      ],
      preguntas: [
        ["facil", "¿Proporcionan oxígeno los equipos filtrantes?", ["No", "Sí", "Solo los de color blanco"], "Arkaute 4.1."],
        ["media", "¿Por qué no sirven los filtros en un incendio de interior?", ["Porque no aportan oxígeno y puede haber muy poco", "Porque pesan mucho", "Porque son caros"], "Arkaute 4.1 / IVASPE M3-T13."],
        ["media", "¿Qué conexión imposibilita la comunicación oral?", ["La boquilla", "La mascarilla", "La máscara"], "Arkaute 4.1."],
        ["media", "¿Qué color identifica a los filtros de partículas?", ["Blanco", "Marrón", "Amarillo"], "Arkaute 4.1 / IVASPE M3-T13."],
        ["dificil", "¿Qué filtro de partículas da mayor protección?", ["P3", "P1", "P2"], "IVASPE M3-T13."],
        ["media", "¿Para qué usan a veces los bomberos equipos filtrantes?", ["Incendios de vegetación y excarcelación con sierra de sable", "Incendios de sótanos", "Fugas de cloro"], "IVASPE M3-T13."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["¿Qué es un equipo autónomo de circuito cerrado?", "El que no expulsa el aire exhalado: lo reconduce, absorbe el CO2 y lo enriquece con oxígeno para volver a respirarlo"],
        ["Características de los equipos de circuito cerrado", "El aire se calienta con el uso (llevan refrigeración), tienen una bolsa respiratoria y dos tráqueas con válvulas direccionales"],
        ["Tipos de circuito cerrado según Arkaute", "De oxígeno químico (peróxido potásico) y de oxígeno presurizado"],
        ["¿Qué ventaja tienen frente al ERA?", "Gran autonomía (de varias horas en algunos modelos) con menos peso"],
        ["¿Dónde se usan?", "En trabajos prolongados como rescate minero o emergencias en túneles"],
      ],
      preguntas: [
        ["facil", "¿Qué se hace con el aire exhalado en un circuito cerrado?", ["Se regenera y se vuelve a respirar", "Se expulsa a la atmósfera", "Se guarda en la botella"], "Arkaute 4.1."],
        ["media", "¿Qué sustancia usa el equipo de oxígeno químico?", ["Peróxido potásico", "Cloro", "Nitrógeno"], "Arkaute 4.1."],
        ["media", "¿Qué inconveniente tienen estos equipos?", ["El aire se calienta y se seca", "No duran nada", "Pesan 50 kg"], "Arkaute 4.1 / IVASPE M3-T13."],
        ["media", "¿Qué absorbe el CO2 en los equipos regeneradores?", ["Un cartucho de cal sodada", "El agua", "Un filtro de papel"], "IVASPE M3-T13."],
        ["dificil", "¿Qué elemento hace de pulmón o depósito en el circuito cerrado?", ["La bolsa respiratoria", "El manorreductor", "La capucha"], "Arkaute 4.1."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["¿Qué es el ERA de circuito abierto?", "Un equipo autónomo en que el aire de una botella llega al usuario según su demanda y el exhalado sale a la atmósfera por la válvula de exhalación"],
        ["Componentes básicos del ERA", "Espaldera, botella de aire comprimido, máscara y regulador (pulmoautomático), con manorreductor y manómetro"],
        ["Datos de la botella descrita por Arkaute", "6,8 litros, llenado a 300 bar, prueba a 450 bar, unos 3,8 kg"],
        ["¿Qué hace el manorreductor?", "Primera etapa de reducción, de alta presión (300 bar) a media presión (unos 5,5 bar según Arkaute) para el regulador"],
        ["¿Qué es la presión positiva en la máscara?", "Una ligera sobrepresión interior que impide la entrada de contaminantes; el pulmoautomático se activa con la primera inspiración"],
        ["¿Para qué sirve la conexión de segundo regulador?", "Para dar aire a un segundo usuario (dispositivo de auxilio)"],
        ["Inspecciones de las botellas (ITC EP-5 citada por IVASPE)", "Inspección visual anual por organismo de control e inspección periódica con prueba hidráulica cada tres años"],
      ],
      preguntas: [
        ["facil", "¿Por dónde sale el aire exhalado en el ERA?", ["Por la válvula de exhalación de la máscara", "Vuelve a la botella", "Por el manorreductor"], "Arkaute 4.1."],
        ["media", "¿A qué presión se llena la botella descrita por Arkaute?", ["300 bar", "30 bar", "3.000 bar"], "Arkaute 4.1."],
        ["media", "¿Qué impide que la botella salga disparada si se rompe el grifo?", ["Un paso estrangulado o filtro limitador de caudal", "La espaldera", "Nada"], "Arkaute 4.1 / IVASPE M3-T13."],
        ["media", "¿Qué avisa al usuario de que entra en la reserva?", ["La alarma acústica (silbato) de baja presión", "Una luz roja en la botella", "El compañero"], "Arkaute 4.1."],
        ["dificil", "¿A qué presión se prueban las botellas?", ["450 bar", "300 bar", "200 bar"], "Arkaute 4.1."],
        ["media", "¿Qué funciones añaden las unidades de control electrónicas?", ["Presión, tiempo restante, alarma de movimiento y temperatura", "Solo la hora", "Música"], "Arkaute 4.1."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["Factores que influyen en el consumo de aire", "Capacidad pulmonar, edad, trabajo, peso, sexo, estrés, estado anímico, coordinación, calor, humedad, postura, entrenamiento, confianza en el equipo y autocontrol"],
        ["¿Cómo se calcula el aire disponible en la botella?", "Volumen geométrico por presión: Vd = v × p (p. ej. 6 l × 300 bar = 1.800 litros)"],
        ["¿Qué es la autonomía total?", "El tiempo de suministro de aire de toda la botella a un consumo medio prefijado: aire disponible / consumo"],
        ["¿Qué es la autonomía de reserva?", "El tiempo desde que salta la alarma acústica hasta agotar la botella: (v × presión de alarma) / consumo"],
        ["¿Qué es la autonomía de trabajo?", "El tiempo para entrar, cumplir el objetivo y volver al aire libre: autonomía total menos reserva"],
        ["Ejemplo de Arkaute: 6 l, 300 bar, 50 l/min, alarma a 50 bar", "Total 1.800/50 = 36 min; reserva 300/50 = 6 min; trabajo 30 min"],
        ["Recomendación de control durante la intervención", "Vigilar el manómetro con frecuencia, con un mínimo de unas 6 lecturas cada 100 bar gastados aproximadamente"],
      ],
      preguntas: [
        ["facil", "¿Cuántos litros de aire hay en una botella de 6 l a 300 bar?", ["1.800 litros", "300 litros", "6 litros"], "Arkaute 4.1."],
        ["media", "Con 1.800 litros y un consumo de 50 l/min, ¿cuál es la autonomía total?", ["36 minutos", "60 minutos", "18 minutos"], "Arkaute 4.1."],
        ["media", "Con la alarma a 50 bar en una botella de 6 l, ¿cuánto aire de reserva queda?", ["300 litros", "50 litros", "1.800 litros"], "6 × 50 = 300 l."],
        ["media", "¿Cómo se obtiene la autonomía de trabajo?", ["Restando la reserva a la autonomía total", "Sumando la reserva", "Multiplicando por dos"], "Arkaute 4.1."],
        ["dificil", "Botella de 6,8 l a 300 bar, consumo de 68 l/min: ¿autonomía total?", ["30 minutos", "68 minutos", "10 minutos"], "6,8 × 300 = 2.040 l / 68 = 30 min."],
        ["media", "¿Cuál de estos factores del consumo puede mejorarse con prácticas?", ["La confianza en el equipo y el autocontrol", "La edad", "El sexo"], "Arkaute 4.1."],
      ],
    },
  ],
  glosario: [
    [S1, "Alvéolo", "Pequeña bolsa pulmonar de pared muy fina donde se intercambian oxígeno y CO2 con la sangre."],
    [S1, "Espacio muerto", "Volumen de aire de las vías aéreas que no participa en el intercambio de gases."],
    [S2, "IDLH", "Concentración inmediatamente peligrosa para la vida o la salud."],
    [S2, "Equipo filtrante", "Equipo que depende del aire ambiente y elimina contaminantes con un filtro; no aporta oxígeno."],
    [S3, "Circuito cerrado", "Equipo autónomo que regenera el aire exhalado absorbiendo CO2 y añadiendo oxígeno."],
    [S4, "Manorreductor", "Elemento del ERA que reduce la alta presión de la botella a media presión."],
    [S4, "Pulmoautomático", "Regulador a demanda que entrega el aire a la máscara al inspirar."],
    [S5, "Autonomía de trabajo", "Tiempo útil del ERA para entrar, actuar y salir: autonomía total menos reserva."],
  ],
  casos: [
    {
      slug: "caso-calculo-autonomia-sotano",
      titulo: "Cálculo de autonomía para un sótano",
      supuesto: "Antes de entrar en un sótano lleno de humo, el jefe de dotación pide a un binomio que calcule su autonomía. Llevan botellas de 6 litros a 300 bar; se toma un consumo medio de 50 l/min y la alarma suena a 50 bar.",
      preguntas: [
        [S5, "facil", "¿Cuántos litros de aire lleva cada bombero?", ["1.800 litros", "6 litros", "300 litros"], "Arkaute 4.1."],
        [S5, "media", "¿Cuál es la autonomía total?", ["36 minutos", "30 minutos", "6 minutos"], "1.800 / 50."],
        [S5, "media", "¿Cuál es la autonomía de reserva?", ["6 minutos", "36 minutos", "50 minutos"], "300 / 50."],
        [S5, "media", "¿Cuál es la autonomía de trabajo?", ["30 minutos", "42 minutos", "6 minutos"], "36 − 6."],
        [S5, "media", "Si uno de ellos está muy nervioso, ¿qué ocurrirá con su consumo?", ["Aumentará", "Bajará", "No cambia"], "El estrés es un factor de consumo."],
        [S1, "media", "¿Cómo debe respirar para no entrar en el círculo vicioso del CO2?", ["De forma profunda y pausada", "Rápido y superficial", "Conteniendo el aire"], "IVASPE M3-T13."],
        [S4, "media", "¿Qué indica que ha entrado en reserva?", ["La alarma acústica de baja presión", "Que se empaña la máscara", "Nada"], "Arkaute 4.1."],
        [S4, "media", "¿Qué impide que entre humo en la máscara?", ["La presión positiva en su interior", "El filtro blanco", "La capucha"], "Arkaute 4.1."],
        [S5, "dificil", "Si el calor y la humedad son altos, ¿cómo afecta a la autonomía real?", ["La reduce, porque aumenta el consumo", "La aumenta", "No afecta"], "Arkaute 4.1."],
        [S2, "media", "¿Podrían usar máscaras con filtro en vez de ERA?", ["No, en un sótano incendiado puede faltar oxígeno", "Sí, siempre", "Solo de día"], "Arkaute 4.1."],
      ],
    },
    {
      slug: "caso-fuga-cloro-depuradora",
      titulo: "Fuga de cloro en una piscina",
      supuesto: "En el cuarto de depuración de una piscina municipal hay una fuga de cloro. El encargado ofrece a los bomberos unas máscaras con filtro que tienen en el almacén.",
      preguntas: [
        [S2, "facil", "¿Qué tipo de equipo es una máscara con filtro?", ["Filtrante, dependiente del ambiente", "Autónomo", "De circuito cerrado"], "Arkaute 4.1."],
        [S2, "media", "¿Por qué no es buena idea usarlas en un cuarto cerrado con fuga?", ["La concentración puede ser IDLH o desconocida y puede faltar oxígeno", "Porque son feas", "Porque huelen"], "Arkaute 4.1."],
        [S2, "media", "¿Por debajo de qué porcentaje de oxígeno no se usan filtros según Arkaute?", ["19,5 %", "50 %", "5 %"], "Arkaute 4.1."],
        [S4, "media", "¿Qué equipo deben usar los bomberos?", ["ERA de circuito abierto", "Mascarilla de papel", "Boquilla"], "Arkaute 4.1."],
        [S2, "media", "¿Qué rasgos impiden un buen ajuste de la máscara?", ["La barba o las patillas", "Las gafas de sol en el casco", "El pelo corto"], "Arkaute 4.1."],
        [S2, "media", "¿Cómo funcionan los filtros contra gases?", ["Por principios químicos (adsorción, absorción, oxidación)", "Por tamiz mecánico", "Por imán"], "IVASPE M3-T13."],
        [S4, "media", "¿Qué componente reduce la presión de la botella?", ["El manorreductor", "La máscara", "El atalaje"], "Arkaute 4.1."],
        [S2, "media", "¿Qué conexión ofrece la protección más completa de la cabeza?", ["La capucha", "La boquilla", "La mascarilla"], "Arkaute 4.1."],
        [S4, "dificil", "Si un compañero se queda sin aire, ¿qué permite el ERA?", ["Conectar un segundo regulador de auxilio", "Compartir la máscara", "Nada"], "Arkaute 4.1."],
        [S5, "media", "¿Qué conviene vigilar durante la intervención?", ["El manómetro, con frecuencia", "El reloj de la piscina", "El agua"], "Arkaute 4.1."],
      ],
    },
    {
      slug: "caso-tunel-largo-circuito-cerrado",
      titulo: "Una intervención larga en un túnel",
      supuesto: "Un incidente en un túnel largo obliga a trabajar mucho tiempo lejos de la boca. Se valora qué equipo respiratorio conviene.",
      preguntas: [
        [S3, "facil", "¿Qué equipo ofrece más autonomía para trabajos prolongados?", ["De circuito cerrado", "ERA de 6 litros", "Mascarilla filtrante"], "Arkaute 4.1 / IVASPE M3-T13."],
        [S3, "media", "¿Qué hace con el CO2 exhalado?", ["Lo absorbe para regenerar el aire", "Lo expulsa", "Lo acumula en la máscara"], "Arkaute 4.1."],
        [S3, "media", "¿Qué molestia aparece con el tiempo?", ["El aire se calienta", "El aire se enfría a cero grados", "Ninguna"], "Arkaute 4.1."],
        [S3, "media", "¿Qué componentes dirigen el aire en el sentido correcto?", ["Dos tráqueas con válvulas direccionales", "Un ventilador", "El casco"], "Arkaute 4.1."],
        [S3, "media", "¿En qué otro ámbito se usan mucho?", ["Rescate minero", "Incendios de cocina", "Rescate acuático"], "IVASPE M3-T13."],
        [S5, "media", "Con un ERA de 6 l a 300 bar y consumo de 60 l/min, ¿autonomía total?", ["30 minutos", "60 minutos", "6 minutos"], "1.800 / 60."],
        [S1, "media", "¿Por qué aumenta el consumo al caminar mucho con equipo?", ["El esfuerzo físico aumenta la necesidad de oxígeno", "Por el ruido", "No aumenta"], "IVASPE M3-T13."],
        [S5, "media", "¿Qué parte de la autonomía se reserva para emergencias?", ["La de reserva, desde la alarma", "La total", "Ninguna"], "Arkaute 4.1."],
        [S3, "dificil", "¿Qué tipos de circuito cerrado distingue Arkaute?", ["De oxígeno químico y de oxígeno presurizado", "De agua y de aceite", "De papel y de tela"], "Arkaute 4.1."],
        [S2, "media", "¿Cuáles son los dos grandes grupos de equipos respiratorios?", ["Filtrantes y aislantes (autónomos)", "Grandes y pequeños", "Rojos y blancos"], "Arkaute 4.1."],
      ],
    },
  ],
});
