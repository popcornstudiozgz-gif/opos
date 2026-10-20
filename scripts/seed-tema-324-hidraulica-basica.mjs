/**
 * Crea tema-324 — Tema 29 de Bombero/a Conductor/a: "Hidráulica básica.
 * Definiciones y propiedades. Hidrostática. Presión. Ecuación fundamental de
 * la hidrostática. Principio de Arquímedes. Principio de Pascal.
 * Hidrodinámica. Principios fundamentales. Tipos de flujos. Caudal de una
 * instalación y ecuación de la continuidad. La energía del fluido y la
 * ecuación de Bernoulli. La realidad de un fluido en movimiento y la ecuación
 * de la energía. Pérdidas de carga. Aplicación del Teorema de Bernoulli. El
 * Golpe de ariete."
 *
 * Fuente: la bibliografía oficial de la Escuela de Bomberos de Zaragoza
 * remite este tema al "Manual básico IVASPE para bomberos de nuevo ingreso"
 * (nov. 2017). Leído íntegro el Módulo 3, Tema 15 "Bombas e hidráulica
 * básica" (págs. 1785-1838 del PDF); este tema cubre sus apartados 1-3 (los
 * apartados 4-5 van con el Tema 30). Conocimiento técnico sin norma legal.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-324-hidraulica-basica.mjs
 */
import { sembrarTema, BOMBERO } from "./lib/sembrar-tema.mjs";

const IVASPE = "https://www.valencia.es/documents/d/guest/manual-20bomberos-pdf";
const BIBLIO = BOMBERO.escuela("Bibliografia_externa_recomendada_temario_BNI.pdf");
const S1 = "definiciones-propiedades";
const S2 = "hidrostatica";
const S3 = "hidrodinamica-continuidad";
const S4 = "bernoulli-perdidas-carga";
const S5 = "aplicaciones-bernoulli-golpe-ariete";

await sembrarTema({
  tema: {
    slug: "tema-324",
    titulo: "Hidráulica básica: hidrostática, continuidad, Bernoulli, pérdidas de carga y golpe de ariete",
    descripcion: "Fluido, masa, densidad, peso específico y viscosidad; presión y sus unidades, presión absoluta, manométrica y de vacío; ecuación fundamental de la hidrostática, Arquímedes y Pascal; tipos de flujo y número de Reynolds; caudal y ecuación de la continuidad; Bernoulli y ecuación de la energía; pérdidas de carga (Darcy-Weisbach); efecto Venturi, ecuación de descarga, reacción en lanza y golpe de ariete.",
    contenido: "Sigue el Manual básico IVASPE (Módulo 3, Tema 15), que la Escuela de Bomberos de Zaragoza recomienda para este tema: la física del agua que maneja un bombero, desde por qué la presión en el portal es la misma con mangueras finas o gruesas hasta por qué el diámetro de la manguera es lo que más influye en las pérdidas, qué empuja la lanza hacia atrás y por qué no hay que cerrar una lanza de golpe.",
    enlaces_boe: [
      { url: IVASPE, titulo: "Manual básico IVASPE para bomberos de nuevo ingreso (nov. 2017) — Módulo 3, Tema 15" },
      { url: BIBLIO, titulo: "Escuela de Bomberos de Zaragoza — Bibliografía externa recomendada (remite el Tema 29 al Manual IVASPE)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "Definiciones y propiedades de los fluidos", articulos: "IVASPE M3-T15, apartado 1", url: IVASPE },
      { seccion: S2, titulo: "Hidrostática: presión, ecuación fundamental, Arquímedes y Pascal", articulos: "IVASPE M3-T15, apartado 2", url: IVASPE },
      { seccion: S3, titulo: "Hidrodinámica: principios, tipos de flujo, caudal y continuidad", articulos: "IVASPE M3-T15, apartados 3.1-3.4", url: IVASPE },
      { seccion: S4, titulo: "Bernoulli, ecuación de la energía y pérdidas de carga", articulos: "IVASPE M3-T15, apartados 3.5-3.7", url: IVASPE },
      { seccion: S5, titulo: "Aplicaciones de Bernoulli y golpe de ariete", articulos: "IVASPE M3-T15, apartados 3.8-3.9", url: IVASPE },
    ],
  },
  vinculo: { oposicion: BOMBERO.oposicion, bloqueId: BOMBERO.bloqueParteII, numero: 29 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["¿Qué es la hidráulica?", "La rama de la física que estudia el comportamiento de los fluidos según sus propiedades y las fuerzas a que se someten"],
        ["Diferencia hidráulica fundamental entre líquidos y gases", "La compresibilidad: los gases se comprimen fácilmente y los líquidos son prácticamente incompresibles"],
        ["Diferencia entre masa y peso", "La masa es la cantidad de materia (kg); el peso es la fuerza con que la gravedad la atrae (N)"],
        ["¿Qué es la viscosidad dinámica?", "La resistencia de un fluido a fluir; en los líquidos disminuye al aumentar la temperatura y en los gases aumenta"],
        ["¿Qué es la viscosidad cinemática?", "El cociente entre la viscosidad dinámica y la densidad"],
        ["¿Por qué el aceite flota sobre el agua siendo más viscoso?", "Porque densidad y viscosidad son conceptos distintos: el aceite es más viscoso pero menos denso"],
      ],
      preguntas: [
        ["facil", "¿En qué unidad del SI se mide la masa?", ["Kilogramo", "Newton", "Pascal"], "IVASPE M3-T15."],
        ["media", "¿Qué sustancia es la referencia para la densidad relativa de líquidos?", ["El agua", "El aire", "El mercurio"], "IVASPE M3-T15."],
        ["media", "¿Qué le ocurre a la viscosidad de un líquido al calentarse?", ["Disminuye", "Aumenta", "No cambia"], "IVASPE M3-T15."],
        ["media", "¿Qué es el peso específico?", ["El peso de un cuerpo por unidad de volumen", "La masa por unidad de superficie", "La presión por metro"], "IVASPE M3-T15."],
        ["dificil", "¿Tiene unidades la densidad relativa?", ["No, es adimensional", "Sí, kg/m³", "Sí, N"], "Es un cociente de dos densidades."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["¿Qué es la presión y cuál es su unidad SI?", "Fuerza por unidad de superficie; el pascal (Pa)"],
        ["Equivalencias de 1 atmósfera", "760 mm Hg = 1,01325 bar = 101.325 Pa = 10,33 m.c.a. = 1,033 kp/cm² = 14,7 psi"],
        ["Diferencia entre presión absoluta y manométrica", "La absoluta se mide respecto al vacío perfecto; la manométrica (relativa), respecto a la atmosférica local"],
        ["¿Qué mide un vacuómetro y dónde lo usa el bombero?", "Presiones por debajo de la atmosférica; en la aspiración de la bomba, para ver el vacío en el mangote"],
        ["Conclusiones de la ecuación fundamental de la hidrostática", "La presión aumenta con la profundidad, es igual a la misma profundidad, no depende de la forma del recipiente y es perpendicular a sus paredes"],
        ["Principio de Arquímedes", "Un cuerpo sumergido en un fluido en reposo recibe un empuje vertical hacia arriba igual al peso del fluido que desaloja"],
        ["Principio de Pascal", "La presión ejercida sobre un fluido incompresible en equilibrio se transmite con igual intensidad en todas las direcciones; base de la prensa hidráulica y de los equipos de excarcelación"],
      ],
      preguntas: [
        ["facil", "¿A cuántos pascales equivale 1 bar?", ["100.000 Pa", "1.000 Pa", "10 Pa"], "1 bar = 10⁵ Pa."],
        ["media", "¿Cuántos metros de columna de agua equivalen a 1 atm?", ["10,33 m", "1 m", "100 m"], "IVASPE M3-T15."],
        ["media", "En una instalación en volado por el hueco de escalera, ¿influye el diámetro de la manguera en la presión en la base?", ["No, solo influye la altura", "Sí, más diámetro más presión", "Sí, menos diámetro más presión"], "Consecuencia del principio de Pascal."],
        ["media", "¿Qué principio aprovechan las herramientas hidráulicas de excarcelación?", ["El de Pascal", "El de Arquímedes", "El de Torricelli"], "IVASPE M3-T15."],
        ["dificil", "¿De qué depende la presión estática en un punto de un líquido en reposo?", ["De la profundidad y del peso específico del líquido", "De la forma del recipiente", "De la velocidad"], "IVASPE M3-T15."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["¿Cuáles son los tres principios fundamentales de la hidrodinámica?", "Conservación de la masa (continuidad), conservación de la energía (Bernoulli) y cantidad de movimiento (fuerzas dinámicas)"],
        ["Tipos de flujo según densidad y velocidad", "Incompresible/compresible; permanente (estacionario)/no permanente"],
        ["¿Qué determina el número de Reynolds?", "Si el flujo es laminar (Re < 2.000), de transición (2.000-4.000) o turbulento (Re > 4.000)"],
        ["¿Qué es el caudal?", "Volumen de líquido que atraviesa una sección por unidad de tiempo (SI: m³/s; bomberos: l/min)"],
        ["Ecuación de la continuidad", "Q = S · v: en flujo permanente sin derivaciones el caudal es igual en todas las secciones"],
        ["¿Qué pasa con el caudal si se duplica el diámetro de la conducción a igual velocidad?", "Se cuadruplica, porque la sección depende del cuadrado del diámetro"],
      ],
      preguntas: [
        ["facil", "¿Qué tipo de flujo es el agua en una manguera según su densidad?", ["Incompresible", "Compresible", "Gaseoso"], "IVASPE M3-T15."],
        ["media", "¿Por encima de qué número de Reynolds el flujo es turbulento?", ["4.000", "200", "40"], "IVASPE M3-T15."],
        ["media", "Si la sección se estrecha manteniendo el caudal, la velocidad…", ["Aumenta", "Disminuye", "No cambia"], "Ecuación de la continuidad."],
        ["media", "¿Qué unidad de caudal usan habitualmente los bomberos?", ["Litros por minuto", "m³/hora", "Bares"], "IVASPE M3-T15."],
        ["dificil", "¿Qué es un fluido ideal?", ["El de viscosidad nula, que circula sin rozamiento", "El agua del grifo", "Cualquier gas"], "IVASPE M3-T15."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Teorema de Bernoulli", "La energía mecánica total de un fluido ideal (incompresible y no viscoso) es constante a lo largo de una línea de corriente"],
        ["¿Qué tres formas de energía suma Bernoulli?", "Energía de presión, cinética y potencial (alturas de presión, cinética y geométrica)"],
        ["¿Qué añade la ecuación de la energía a Bernoulli?", "Las pérdidas de carga por rozamiento y, si existen, la energía aportada por una bomba y la absorbida por un motor"],
        ["Tipos de pérdidas de carga", "Continuas o principales (rozamiento a lo largo de la manguera) y singulares o localizadas (codos, bifurcaciones, reducciones, racores)"],
        ["¿De qué dependen las pérdidas continuas según Darcy-Weisbach?", "Directamente de la longitud y del cuadrado del caudal, e inversamente de la quinta potencia del diámetro"],
        ["¿Cuál es el factor que más influye en las pérdidas de carga?", "El diámetro de la manguera"],
      ],
      preguntas: [
        ["facil", "¿Qué ecuación incluye las pérdidas de carga?", ["La ecuación de la energía (Bernoulli generalizada)", "La de Pascal", "La de Arquímedes"], "IVASPE M3-T15."],
        ["media", "Si se duplica el caudal en una manguera, las pérdidas de carga continuas…", ["Se multiplican por cuatro", "Se duplican", "No cambian"], "Son proporcionales al cuadrado del caudal."],
        ["media", "Si se duplica la longitud de la instalación, las pérdidas continuas…", ["Se duplican", "Se cuadruplican", "Se reducen"], "Son proporcionales a la longitud."],
        ["media", "¿Cuándo pueden despreciarse las pérdidas singulares?", ["Cuando suponen menos del 5 % de las totales", "Nunca", "Siempre"], "IVASPE M3-T15."],
        ["dificil", "¿Qué ecuación de pérdidas vale para flujo laminar, turbulento y de transición?", ["Darcy-Weisbach", "Torricelli", "Pascal"], "IVASPE M3-T15."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["¿Qué es el efecto Venturi?", "Al estrecharse la sección aumenta la velocidad y cae la presión estática, lo que crea succión en un orificio lateral"],
        ["¿Qué permite calcular la ecuación de descarga (Torricelli)?", "La velocidad de salida del agua por un orificio de un depósito o por una lanza"],
        ["¿Qué es la reacción en punta de lanza?", "El retroceso que produce el agua al salir, por el principio de acción y reacción; depende de la sección de salida y de la presión en lanza"],
        ["Regla práctica de la reacción a 7 bar en lanza", "La reacción es aproximadamente el 6 % del caudal seleccionado"],
        ["¿Qué es el golpe de ariete?", "La sobrepresión y depresión sucesivas que se producen al variar bruscamente el caudal en una tubería (pulso de Zhukowski); puede romper conductos"],
      ],
      preguntas: [
        ["facil", "¿Qué provoca el golpe de ariete?", ["Cerrar bruscamente una válvula o lanza", "Abrir lentamente", "El frío"], "IVASPE M3-T15."],
        ["media", "¿Qué fenómeno aprovecha un proporcionador de espumógeno o un eyector?", ["El efecto Venturi", "El principio de Arquímedes", "El golpe de ariete"], "IVASPE M3-T15."],
        ["media", "¿De qué depende la reacción en lanza?", ["De la sección de salida y de la presión en lanza", "Del color de la manguera", "De la temperatura"], "IVASPE M3-T15."],
        ["media", "A 7 bar en lanza y 230 l/min, ¿qué reacción aproximada habrá?", ["Unos 14 kg (6 %)", "Unos 230 kg", "1 kg"], "0,06 × 230 ≈ 13,8 kg."],
        ["dificil", "¿A qué velocidad puede desplazarse la onda de sobrepresión del golpe de ariete?", ["Puede superar la del sonido en el fluido", "1 m/s", "Ninguna"], "IVASPE M3-T15."],
      ],
    },
  ],
  glosario: [
    [S1, "Viscosidad", "Resistencia de un fluido a fluir o deformarse."],
    [S2, "Presión manométrica", "Presión medida respecto a la atmosférica local; la que marcan la mayoría de manómetros."],
    [S2, "m.c.a.", "Metros de columna de agua: unidad de presión; 10,33 m.c.a. equivalen a 1 atm."],
    [S3, "Número de Reynolds", "Valor adimensional que indica si el flujo es laminar, de transición o turbulento."],
    [S3, "Ecuación de la continuidad", "Q = S·v: el caudal se conserva a lo largo de una conducción sin derivaciones."],
    [S4, "Pérdida de carga", "Pérdida de presión del fluido por rozamiento y por singularidades de la instalación."],
    [S5, "Golpe de ariete", "Onda de sobrepresión y depresión por un cambio brusco de caudal en una tubería."],
  ],
  casos: [
    {
      slug: "caso-instalacion-volado-escalera",
      titulo: "Instalación en volado por el hueco de escalera",
      supuesto: "Incendio en un séptimo piso. La dotación tiende una instalación en volado por el hueco de escalera y discute qué diámetro usar.",
      preguntas: [
        [S2, "facil", "¿Influye el diámetro en la presión estática en la base de la instalación vertical?", ["No, solo la altura", "Sí, mucho", "Solo con 70 mm"], "Principio de Pascal."],
        [S2, "media", "¿Cuántos bar aproximados supone una columna de agua de 20 m?", ["Unos 2 bar", "20 bar", "0,2 bar"], "10,33 m.c.a. ≈ 1 atm ≈ 1 bar."],
        [S4, "media", "¿Qué diámetro reduce más las pérdidas de carga?", ["El mayor", "El menor", "Da igual"], "Dependen de la quinta potencia del diámetro."],
        [S4, "media", "¿Qué tipo de pérdidas añaden la bifurcación y los racores?", ["Singulares o localizadas", "Continuas", "Ninguna"], "IVASPE M3-T15."],
        [S4, "media", "¿Qué tres términos debe vencer la presión en bomba?", ["Presión en lanza, altura geométrica y pérdidas de carga", "Solo la altura", "El viento"], "IVASPE M3-T15."],
        [S3, "media", "Si el caudal es el mismo, ¿dónde va más rápido el agua, en 25 o en 45 mm?", ["En 25 mm", "En 45 mm", "Igual"], "Continuidad."],
        [S5, "media", "¿Qué hacer al cerrar la lanza para evitar daños en la instalación?", ["Cerrarla progresivamente, sin brusquedad", "Cerrarla de golpe", "Pisar la manguera"], "Golpe de ariete."],
        [S5, "media", "¿Qué siente el lancero al abrir la lanza?", ["La reacción en punta de lanza", "Nada", "Frío"], "IVASPE M3-T15."],
        [S4, "dificil", "Si se duplica el caudal, ¿cuánto aumentan las pérdidas continuas?", ["Se cuadruplican", "Se duplican", "Se reducen a la mitad"], "IVASPE M3-T15."],
        [S2, "media", "¿Qué presión mide el manómetro de la bomba?", ["La manométrica o relativa", "La absoluta", "La de vapor"], "IVASPE M3-T15."],
      ],
    },
    {
      slug: "caso-rescate-vehiculo-agua",
      titulo: "Un vehículo caído a un canal",
      supuesto: "Un turismo ha caído a un canal y flota parcialmente. Para la excarcelación posterior se usarán herramientas hidráulicas.",
      preguntas: [
        [S2, "facil", "¿Qué principio explica que el coche flote parcialmente?", ["Arquímedes", "Pascal", "Bernoulli"], "IVASPE M3-T15."],
        [S2, "media", "¿A qué es igual el empuje que recibe?", ["Al peso del agua que desaloja", "A su propio peso siempre", "A cero"], "IVASPE M3-T15."],
        [S2, "media", "¿Qué ocurre con la presión sobre las puertas al hundirse más?", ["Aumenta con la profundidad", "Disminuye", "No cambia"], "IVASPE M3-T15."],
        [S2, "media", "¿Qué principio usan las herramientas hidráulicas de excarcelación?", ["Pascal", "Arquímedes", "Venturi"], "IVASPE M3-T15."],
        [S2, "media", "En una prensa hidráulica, ¿cómo se multiplica la fuerza?", ["Por la relación entre las secciones de los émbolos", "Por la temperatura", "No se multiplica"], "IVASPE M3-T15."],
        [S1, "media", "¿Qué fluido suele usarse en esas herramientas?", ["Aceite hidráulico", "Aire comprimido", "Gasolina"], "IVASPE M3-T15."],
        [S1, "media", "¿Por qué se usa un líquido y no un gas en la transmisión?", ["Porque es prácticamente incompresible", "Porque pesa poco", "Porque es barato"], "IVASPE M3-T15."],
        [S2, "dificil", "¿Depende la presión sobre una puerta sumergida de la forma del canal?", ["No, solo de la profundidad y del peso específico", "Sí", "Solo de la anchura"], "IVASPE M3-T15."],
        [S2, "media", "¿Qué dirección tiene la presión de un fluido en reposo sobre las paredes?", ["Perpendicular a la superficie", "Paralela", "Hacia arriba siempre"], "IVASPE M3-T15."],
        [S1, "media", "¿Qué diferencia hay entre masa y peso del vehículo?", ["La masa es materia (kg) y el peso, fuerza (N)", "Ninguna", "El peso se mide en kg y la masa en N"], "IVASPE M3-T15."],
      ],
    },
    {
      slug: "caso-proporcionador-espuma-venturi",
      titulo: "Espuma con proporcionador",
      supuesto: "En un derrame de gasoil incendiado, la dotación monta un proporcionador de espumógeno con tubo de succión en la línea de 45 mm.",
      preguntas: [
        [S5, "facil", "¿Qué fenómeno hace que el proporcionador aspire espumógeno?", ["Efecto Venturi", "Golpe de ariete", "Arquímedes"], "IVASPE M3-T15."],
        [S5, "media", "¿Qué ocurre en el estrechamiento del proporcionador?", ["Aumenta la velocidad y cae la presión", "Baja la velocidad", "Sube la presión"], "IVASPE M3-T15."],
        [S4, "media", "¿Qué teorema explica esa caída de presión?", ["Bernoulli", "Pascal", "Arquímedes"], "IVASPE M3-T15."],
        [S3, "media", "¿Qué ecuación explica el aumento de velocidad en el estrechamiento?", ["La de la continuidad", "La de Darcy", "La de Torricelli"], "IVASPE M3-T15."],
        [S4, "media", "¿Qué tipo de pérdida introduce el propio proporcionador?", ["Singular", "Continua", "Ninguna"], "IVASPE M3-T15."],
        [S5, "media", "Si el lancero cierra de golpe la lanza de espuma, ¿qué riesgo hay?", ["Golpe de ariete", "Cavitación en el cielo", "Ninguno"], "IVASPE M3-T15."],
        [S3, "media", "¿Qué flujo suele haber en una manguera a caudal de servicio?", ["Turbulento", "Laminar perfecto", "Compresible"], "Alta velocidad y baja viscosidad."],
        [S4, "media", "¿Qué tres alturas componen la energía de Bernoulli?", ["De presión, cinética y geométrica", "Solo de presión", "Térmica y eléctrica"], "IVASPE M3-T15."],
        [S5, "dificil", "¿Qué ley explica la reacción en lanza?", ["La tercera ley de Newton (acción y reacción)", "La ley de Ohm", "La de Pascal"], "IVASPE M3-T15."],
        [S4, "media", "Si se alarga la línea con más tramos, ¿qué ocurre con las pérdidas continuas?", ["Aumentan proporcionalmente a la longitud", "Disminuyen", "No cambian"], "IVASPE M3-T15."],
      ],
    },
  ],
});
