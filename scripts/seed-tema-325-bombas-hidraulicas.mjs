/**
 * Crea tema-325 — Tema 30 de Bombero/a Conductor/a: "Bombas hidráulicas.
 * Bombas centrífugas. Elementos de una bomba centrífuga. Curvas
 * características de una bomba. Leyes de semejanza en bombas hidráulicas.
 * Bombas monocelulares y multicelulares. Punto de funcionamiento de una
 * instalación. Acoplamiento de bombas. Aspiración en bombas. Cebado de bombas
 * instaladas en aspiración. Cavitación."
 *
 * Fuente: la bibliografía oficial de la Escuela de Bomberos de Zaragoza
 * remite este tema al "Manual básico IVASPE para bomberos de nuevo ingreso"
 * (nov. 2017). Leído íntegro el Módulo 3, Tema 15 "Bombas e hidráulica
 * básica" (págs. 1785-1838 del PDF); este tema cubre sus apartados 4
 * (bombas) y 5 (aplicaciones prácticas). Las leyes de semejanza aparecen en
 * el PDF como imagen: se citan en su forma estándar (caudal proporcional a
 * las rpm, altura a su cuadrado y potencia a su cubo). Conocimiento técnico
 * sin norma legal, salvo la referencia del propio manual a la UNE-EN 1028
 * (válvula de protección térmica de las bombas de bomberos).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-325-bombas-hidraulicas.mjs
 */
import { sembrarTema, BOMBERO } from "./lib/sembrar-tema.mjs";

const IVASPE = "https://www.valencia.es/documents/d/guest/manual-20bomberos-pdf";
const BIBLIO = BOMBERO.escuela("Bibliografia_externa_recomendada_temario_BNI.pdf");
const S1 = "bombas-centrifugas-elementos";
const S2 = "curvas-semejanza-etapas";
const S3 = "punto-funcionamiento-acoplamiento";
const S4 = "aspiracion-cebado";
const S5 = "cavitacion-aplicaciones";

await sembrarTema({
  tema: {
    slug: "tema-325",
    titulo: "Bombas hidráulicas: bomba centrífuga, curvas, acoplamiento, aspiración, cebado y cavitación",
    descripcion: "Turbobombas y bombas de desplazamiento positivo; elementos de la bomba centrífuga (rodete, difusor, voluta); curvas H-Q, potencia y rendimiento; leyes de semejanza; bombas de una y dos etapas (BUP/BNP); punto de funcionamiento; acoplamiento en serie y en paralelo; aspiración y altura máxima; métodos de cebado; cavitación, NPSH; aplicaciones prácticas (sifón, recirculación, líneas bifurcadas, alcance).",
    contenido: "Sigue el Manual básico IVASPE (Módulo 3, Tema 15), que la Escuela de Bomberos de Zaragoza recomienda para este tema: cómo funciona la bomba centrífuga del camión, por qué baja la presión al abrir la lanza, cuándo se acoplan bombas en serie o en paralelo, hasta qué altura se puede aspirar agua de un río o una balsa y qué es la cavitación que destroza los rodetes.",
    enlaces_boe: [
      { url: IVASPE, titulo: "Manual básico IVASPE para bomberos de nuevo ingreso (nov. 2017) — Módulo 3, Tema 15" },
      { url: BIBLIO, titulo: "Escuela de Bomberos de Zaragoza — Bibliografía externa recomendada (remite el Tema 30 al Manual IVASPE)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "Bombas hidráulicas y elementos de la bomba centrífuga", articulos: "IVASPE M3-T15, apartados 4 y 4.1.1", url: IVASPE },
      { seccion: S2, titulo: "Curvas características, leyes de semejanza y bombas mono/multicelulares", articulos: "IVASPE M3-T15, apartados 4.1.2-4.1.4", url: IVASPE },
      { seccion: S3, titulo: "Punto de funcionamiento y acoplamiento de bombas", articulos: "IVASPE M3-T15, apartados 4.1.5-4.1.6", url: IVASPE },
      { seccion: S4, titulo: "Aspiración y cebado", articulos: "IVASPE M3-T15, apartados 4.1.7-4.1.8", url: IVASPE },
      { seccion: S5, titulo: "Cavitación y aplicaciones prácticas", articulos: "IVASPE M3-T15, apartados 4.1.9-4.1.10 y 5", url: IVASPE },
    ],
  },
  vinculo: { oposicion: BOMBERO.oposicion, bloqueId: BOMBERO.bloqueParteII, numero: 30 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["¿Qué es una bomba hidráulica?", "Una máquina que transforma la energía mecánica que recibe por el eje en energía de presión y caudal del líquido"],
        ["Grandes grupos de bombas", "Turbobombas (aumentan el momento cinético en el rodete) y de desplazamiento positivo (cámaras que se llenan y vacían)"],
        ["Tipos de turbobombas según la trayectoria", "Centrífugas (caudal moderado y altura notable), helicocentrífugas y axiales (gran caudal y poca altura)"],
        ["Elementos de una bomba centrífuga", "Entrada unida a la aspiración, rodete o impulsor que gira, difusor (no siempre) y voluta o caracol hasta la salida"],
        ["¿Qué hace el difusor?", "Reduce la velocidad del fluido a la salida del rodete transformándola en presión; es obligado en las multicelulares para orientar el flujo al siguiente rodete"],
        ["¿Qué hace la voluta?", "Recoge el fluido y, al aumentar su sección hacia la salida, transforma parte de la energía cinética en presión"],
      ],
      preguntas: [
        ["facil", "¿Qué tipo de bomba usan habitualmente los vehículos de bomberos?", ["Centrífuga", "De pistón manual", "Axial de gran caudal"], "IVASPE M3-T15."],
        ["media", "¿Qué elemento de la bomba centrífuga gira solidario al eje?", ["El rodete", "La voluta", "El difusor fijo"], "IVASPE M3-T15."],
        ["media", "¿Para qué están indicadas las bombas axiales?", ["Grandes caudales a poca altura", "Pequeños caudales a gran altura", "Aspirar aire"], "IVASPE M3-T15."],
        ["media", "¿Cómo se llama también la voluta?", ["Caracol", "Impulsor", "Mangote"], "IVASPE M3-T15."],
        ["dificil", "¿En qué tipo de bomba es obligado el difusor?", ["En las multicelulares", "En las monocelulares de baja potencia", "En ninguna"], "IVASPE M3-T15."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["¿Qué curvas características interesan de una bomba?", "Altura-caudal H(Q), potencia-caudal P(Q) y rendimiento-caudal η(Q), facilitadas por el fabricante"],
        ["¿Cuándo es máxima la altura manométrica?", "Con caudal nulo; disminuye al aumentar el caudal"],
        ["¿Por qué el rendimiento siempre es menor que 1?", "Por pérdidas mecánicas, rozamiento viscoso, choques y pequeñas fugas: la potencia hidráulica es menor que la absorbida"],
        ["Leyes de semejanza", "Al variar las rpm, el caudal varía proporcionalmente, la altura con su cuadrado y la potencia con su cubo"],
        ["¿Qué particularidad tienen las bombas de bomberos?", "Un mando de aceleración que regula las revoluciones (normalmente hasta unas 5.000 rpm) y con ello presión y caudal"],
        ["Bombas de un BUP y de un BNP", "El BUP suele llevar bomba multicelular de dos etapas (baja y alta presión); el BNP, de abastecimiento, suele ser monocelular de baja"],
      ],
      preguntas: [
        ["facil", "Al aumentar el caudal de una bomba, su altura manométrica…", ["Disminuye", "Aumenta", "No cambia"], "IVASPE M3-T15."],
        ["media", "Si se duplican las rpm de la bomba, la altura…", ["Se multiplica por cuatro", "Se duplica", "Se reduce"], "Leyes de semejanza."],
        ["media", "Cuando la bomba de doble etapa trabaja en alta, ¿cuántos rodetes trabajan?", ["Los dos, en serie", "Solo el de alta", "Ninguno"], "IVASPE M3-T15."],
        ["media", "¿Por qué los BUP usan dos rodetes en lugar de uno grande?", ["Por rendimiento y por espacio en el vehículo", "Por estética", "Por ser más baratos"], "IVASPE M3-T15."],
        ["dificil", "Si se duplican las rpm, ¿qué ocurre con la potencia?", ["Se multiplica por ocho", "Se duplica", "Se cuadruplica"], "Leyes de semejanza: con el cubo."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["¿Qué presión necesita la bomba para dar el caudal requerido en lanza?", "La suma de presión en lanza, altura geométrica hasta la lanza y pérdidas de carga"],
        ["¿Qué es el punto de funcionamiento?", "La intersección de la curva característica de la bomba con la curva resistente de la instalación"],
        ["Acoplamiento en serie", "La impulsión de una bomba es la aspiración de la siguiente: mismo caudal y se suman las alturas; útil para elevar a gran altura"],
        ["Acoplamiento en paralelo", "Aspiran de un punto común y descargan a una impulsión general: se suman los caudales a igual altura; útil para grandes caudales"],
        ["¿Por qué baja la presión en bomba al abrir la lanza?", "Porque parte de la presión estática se convierte en velocidad (Bernoulli) y la curva de la bomba da menos presión a más caudal"],
      ],
      preguntas: [
        ["facil", "¿Qué acoplamiento suma caudales?", ["En paralelo", "En serie", "Ninguno"], "IVASPE M3-T15."],
        ["media", "¿Qué acoplamiento conviene para elevar un caudal a gran altura?", ["En serie", "En paralelo", "Ninguno"], "IVASPE M3-T15."],
        ["media", "¿Qué forma tiene la curva resistente de una instalación?", ["Cuadrática, desplazada del origen por la altura", "Una recta horizontal", "Un círculo"], "IVASPE M3-T15."],
        ["media", "Con la bomba a 20 bar y la lanza a 50 l/min abierta, ¿qué marca el manómetro según el ejemplo del manual?", ["Unos 16 bar", "20 bar", "30 bar"], "IVASPE M3-T15."],
        ["dificil", "Un caso especial de bombas en serie en un mismo cuerpo es…", ["La bomba multicelular del BUP", "La motobomba de achique", "El hidrante"], "IVASPE M3-T15."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["¿Cuándo trabaja una bomba en aspiración?", "Cuando está a una cota superior al depósito o lámina de agua de alimentación"],
        ["Altura máxima teórica y real de aspiración", "Teórica 10,33 m; en la práctica entre 7 y 8 m"],
        ["¿Por qué no se alcanzan los 10,33 m?", "No se logra vacío absoluto, la presión atmosférica local puede ser menor, hay pérdidas en mangotes y válvula de pie, y la presión de vapor sube con la temperatura del agua"],
        ["¿Qué es el cebado?", "Llenar de agua el mangote de aspiración y el rodete, expulsando el aire, antes de que la bomba funcione normalmente"],
        ["Métodos de cebado", "Bombas autocebantes, eyector de gases de escape (Venturi), bomba de pistones, anillo de agua y depresor de vacío"],
      ],
      preguntas: [
        ["facil", "¿Cuál es la altura máxima teórica de aspiración?", ["10,33 m", "50 m", "1 m"], "IVASPE M3-T15."],
        ["media", "¿Qué altura de aspiración se logra realmente?", ["Entre 7 y 8 m", "Exactamente 10,33 m", "Más de 20 m"], "IVASPE M3-T15."],
        ["media", "Si el agua está más caliente, ¿qué pasa con la altura de aspiración?", ["Disminuye", "Aumenta", "No varía"], "Aumenta su presión de vapor."],
        ["media", "¿Qué método de cebado usa los gases de escape del motor?", ["Eyector de gases", "Anillo de agua", "Autocebado"], "IVASPE M3-T15."],
        ["dificil", "¿Qué empuja el agua hacia la bomba en la aspiración?", ["La presión atmosférica sobre la lámina de agua", "La bomba tira del agua por sí misma", "La gravedad"], "IVASPE M3-T15."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["¿Qué es la cavitación?", "Formación de burbujas de vapor al bajar localmente la presión hasta la de vapor del líquido y su posterior implosión al llegar a zonas de más presión"],
        ["¿Dónde aparece la cavitación en bomberos?", "En la brida de aspiración, estrangulamientos bruscos (válvulas a medio abrir) y rodetes"],
        ["Efectos de la cavitación", "Golpeteo como grava sobre chapa, nubes blancas en el líquido, vibraciones y erosión de los álabes (presiones locales de hasta 1.000 bar)"],
        ["Condición de no cavitación", "La NPSH disponible (de la instalación) debe ser mayor que la NPSH requerida (dada por el fabricante)"],
        ["¿Para qué está diseñado el 'sifón' de la bomba?", "Es la válvula de llenado de cisterna, para llenar la cuba por aspiración; no se recomienda para refrigerar la bomba por encima de 5 bar"],
        ["¿Qué hace la válvula de protección térmica (UNE-EN 1028)?", "Se dispara automáticamente cuando el agua del cuerpo de bomba alcanza unos 65-75 °C y la expulsa al exterior"],
        ["¿Qué ocurre si en una línea bifurcada un lancero cierra su lanza?", "Bajan las pérdidas en el tramo común, llega más presión a la otra lanza y aumentan su caudal y su reacción"],
      ],
      preguntas: [
        ["facil", "¿Qué daña la cavitación en una bomba?", ["Los álabes del rodete", "Las ruedas del camión", "La cisterna"], "IVASPE M3-T15."],
        ["media", "¿Qué ruido produce la cavitación?", ["Un golpeteo similar a grava sobre chapa", "Un silbido suave", "Ninguno"], "IVASPE M3-T15."],
        ["media", "¿Quién facilita la NPSH requerida?", ["El fabricante de la bomba", "El bombero", "El ayuntamiento"], "IVASPE M3-T15."],
        ["media", "¿Qué solución provisional propone el manual para refrigerar la bomba?", ["Recircular con una manguera de 25 mm a una toma de llenado de la cisterna", "Abrir el sifón a 15 bar", "Parar el motor"], "IVASPE M3-T15."],
        ["dificil", "¿Qué riesgo hay al acelerar la bomba con la lanza abierta en una línea de 45 mm desde alta?", ["Que al cerrar la lanza se supere la presión de trabajo de la manguera", "Ninguno", "Que se congele"], "IVASPE M3-T15."],
        ["dificil", "Según el manual, ¿qué da más alcance a una lanza?", ["Más caudal y velocidad de salida, no menos caudal", "Siempre menos caudal", "Bajar la presión"], "Mediciones de Akron citadas en IVASPE."],
      ],
    },
  ],
  glosario: [
    [S1, "Rodete", "Impulsor giratorio de la bomba centrífuga que comunica energía al líquido."],
    [S1, "Voluta", "Carcasa en espiral (caracol) que recoge el líquido y transforma velocidad en presión."],
    [S2, "Curva característica", "Gráfica del fabricante que relaciona la altura, la potencia o el rendimiento de la bomba con el caudal."],
    [S2, "Bomba multicelular", "Bomba con varios rodetes en serie, como la de dos etapas (baja y alta) de un BUP."],
    [S3, "Punto de funcionamiento", "Intersección entre la curva de la bomba y la curva resistente de la instalación."],
    [S4, "Cebado", "Operación de llenar de agua la aspiración y el rodete expulsando el aire."],
    [S5, "Cavitación", "Formación e implosión de burbujas de vapor por caída local de presión, que erosiona la bomba."],
    [S5, "NPSH", "Altura neta positiva en la aspiración; la disponible debe superar a la requerida para evitar cavitación."],
  ],
  casos: [
    {
      slug: "caso-aspiracion-balsa-riego",
      titulo: "Aspirar agua de una balsa de riego",
      supuesto: "En un incendio de nave agrícola sin hidrantes, el conductor coloca la autobomba junto a una balsa de riego cuya lámina de agua está a 6 m por debajo de la bomba. El agua está caliente por el verano.",
      preguntas: [
        [S4, "facil", "¿En qué situación trabaja la bomba?", ["En aspiración", "En carga", "En paralelo"], "IVASPE M3-T15."],
        [S4, "media", "¿Es factible aspirar a 6 m?", ["Sí, está por debajo de los 7-8 m prácticos", "No, el límite es 2 m", "Solo con bomba axial"], "IVASPE M3-T15."],
        [S4, "media", "¿Qué hay que hacer antes de bombear?", ["Cebar la bomba", "Abrir el sifón a tope", "Cerrar la cisterna con llave"], "IVASPE M3-T15."],
        [S4, "media", "¿Qué efecto tiene el agua caliente?", ["Reduce la altura de aspiración posible", "La aumenta", "Ninguno"], "IVASPE M3-T15."],
        [S5, "media", "Si se oye un golpeteo como grava en la bomba, ¿qué ocurre?", ["Cavitación", "Golpe de ariete en la lanza", "Nada"], "IVASPE M3-T15."],
        [S5, "media", "¿Qué favorece la cavitación en la aspiración?", ["Caudales elevados o mangotes de diámetro pequeño", "Mangotes cortos y gruesos", "Agua fría"], "IVASPE M3-T15."],
        [S5, "media", "¿Qué condición evita la cavitación?", ["NPSH disponible mayor que la requerida", "NPSH requerida mayor que la disponible", "Más rpm"], "IVASPE M3-T15."],
        [S4, "media", "¿Qué instrumento muestra el vacío en el mangote?", ["El manovacuómetro", "El termómetro", "El cuentarrevoluciones"], "IVASPE M3-T15."],
        [S5, "dificil", "¿Dónde aparece primero la cavitación dentro de la bomba?", ["En el punto de mínima presión sobre la cara de los álabes", "En la voluta de salida", "En la cisterna"], "IVASPE M3-T15."],
        [S4, "media", "¿Qué empuja realmente el agua por el mangote?", ["La presión atmosférica", "El rodete tirando", "El viento"], "IVASPE M3-T15."],
      ],
    },
    {
      slug: "caso-edificio-alto-bombas-serie",
      titulo: "Abastecer un incendio en un edificio alto",
      supuesto: "Un incendio en la planta 14 exige caudal a mucha altura. La primera autobomba no llega a la presión necesaria y se dispone de una segunda.",
      preguntas: [
        [S3, "facil", "¿Cómo se acoplarían para ganar altura?", ["En serie", "En paralelo", "No se pueden acoplar"], "IVASPE M3-T15."],
        [S3, "media", "¿Qué se suma en el acoplamiento en serie?", ["Las alturas, con el mismo caudal", "Los caudales", "Nada"], "IVASPE M3-T15."],
        [S2, "media", "¿En qué etapa trabaja la bomba del BUP para dar más presión?", ["En alta, con ambos rodetes", "En baja", "En aspiración"], "IVASPE M3-T15."],
        [S3, "media", "¿Qué tres factores debe superar la presión en bomba?", ["Presión en lanza, altura geométrica y pérdidas de carga", "Solo la altura", "El ruido"], "IVASPE M3-T15."],
        [S2, "media", "¿Qué mando permite al conductor variar el punto de funcionamiento?", ["El mando de aceleración del motor", "La radio", "La sirena"], "IVASPE M3-T15."],
        [S5, "media", "¿Qué riesgo hay si con la lanza abierta se acelera para compensar y luego se cierra?", ["Superar la presión de trabajo de las mangueras", "Que se vacíe la cisterna", "Nada"], "IVASPE M3-T15."],
        [S5, "media", "¿Qué presión máxima de trabajo suelen tener las mangueras de 45 mm según el manual?", ["Unos 20 bar", "Unos 200 bar", "Unos 2 bar"], "IVASPE M3-T15."],
        [S3, "media", "¿Qué determina el punto de funcionamiento?", ["La intersección de la curva de la bomba y la curva de la instalación", "El color de la bomba", "La marca del camión"], "IVASPE M3-T15."],
        [S2, "dificil", "Si el conductor sube las rpm un 10 %, ¿cuánto sube aproximadamente la altura?", ["Un 21 %", "Un 10 %", "Un 1 %"], "Proporcional al cuadrado: 1,1² = 1,21."],
        [S5, "media", "¿Qué presión en lanza da el caudal nominal seleccionado en las lanzas Akron?", ["7 bar", "20 bar", "1 bar"], "IVASPE M3-T15."],
      ],
    },
    {
      slug: "caso-buceo-humo-bomba-calentada",
      titulo: "La bomba se calienta durante un buceo largo",
      supuesto: "Durante un buceo de humo prolongado, la línea está presurizada pero apenas se consume agua. La bomba lleva mucho tiempo girando con las salidas casi cerradas.",
      preguntas: [
        [S5, "facil", "¿Qué le ocurre al agua del cuerpo de bomba?", ["Se sobrecalienta", "Se congela", "No cambia"], "IVASPE M3-T15."],
        [S5, "media", "¿Qué dispositivo se dispara a unos 65-75 °C?", ["La válvula de protección térmica", "El difusor", "La voluta"], "IVASPE M3-T15."],
        [S5, "media", "¿Qué peligro tiene el disparo de esa válvula para el operador?", ["Un chorro de agua casi hirviendo y una nube de vapor", "Ninguno", "Una descarga eléctrica"], "IVASPE M3-T15."],
        [S5, "media", "¿Por qué no conviene abrir el sifón trabajando a 10 bar?", ["Puede dañar los deflectores de la cisterna (5-7 bar)", "Porque se apaga el motor", "Porque es ilegal"], "IVASPE M3-T15."],
        [S5, "media", "¿Qué solución provisional describe el manual?", ["Recirculación con manguera de 25 mm a la toma de llenado de 70 mm", "Echar hielo", "Parar la intervención"], "IVASPE M3-T15."],
        [S5, "media", "¿Qué problema puede dejar la cal en la válvula térmica?", ["Que no se cierre y vacíe la cisterna", "Que se pinte", "Ninguno"], "IVASPE M3-T15."],
        [S5, "media", "Abrir parcialmente el sifón a alta presión puede producir…", ["Cavitación y daños en la válvula", "Más caudal en lanza", "Nada"], "IVASPE M3-T15."],
        [S2, "media", "¿Por qué el agua se calienta con caudal casi nulo?", ["La energía del rodete se absorbe como calor en el agua del cuerpo", "Por el sol", "Por el escape"], "IVASPE M3-T15."],
        [S5, "dificil", "¿Desde cuándo instalan los fabricantes la válvula térmica según la UNE-EN 1028?", ["Desde 2004", "Desde 1950", "Desde 2024"], "IVASPE M3-T15."],
        [S5, "media", "¿Qué solución definitiva propone el manual?", ["Una válvula reguladora de presión a la salida del sifón", "Quitar la cisterna", "Usar solo mangueras de 70"], "IVASPE M3-T15."],
      ],
    },
  ],
});
