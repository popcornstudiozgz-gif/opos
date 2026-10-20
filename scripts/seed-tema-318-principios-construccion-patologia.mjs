/**
 * Crea tema-318 — Tema 23 de Bombero/a Conductor/a: "Principios de la
 * construcción. Conceptos básicos de edificación. Tipos de fuerzas. Tipos de
 * esfuerzos. Mecanismo de transmisión de cargas de una estructura. Patología
 * estructural de las edificaciones. Conceptos básicos. Causas de las
 * lesiones. Manifestaciones patológicas. Fisuras y grietas. Clasificación y
 * control. Deformaciones. Desagregaciones. Desplomes y pandeos."
 *
 * Fuente: la bibliografía oficial de la Escuela de Bomberos de Zaragoza
 * remite este tema al "Manual básico IVASPE para bomberos de nuevo ingreso"
 * (nov. 2017). Leídos del Módulo 2, Tema 11 "Principios de construcción y
 * estabilización de estructuras" los apartados 1.1 (física y acciones en la
 * edificación, que remite al CTE DB SE-AE para los valores de cargas) y 2
 * (patología estructural: conceptos, causas, manifestaciones, fisuras y
 * grietas, y clasificación de lesiones por asientos). Conocimiento técnico
 * sin norma legal propia salvo la referencia del manual al CTE.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-318-principios-construccion-patologia.mjs
 */
import { sembrarTema, BOMBERO } from "./lib/sembrar-tema.mjs";

const IVASPE = "https://www.valencia.es/documents/d/guest/manual-20bomberos-pdf";
const BIBLIO = BOMBERO.escuela("Bibliografia_externa_recomendada_temario_BNI.pdf");
const S1 = "fuerzas-esfuerzos";
const S2 = "acciones-transmision-cargas";
const S3 = "patologia-conceptos-causas";
const S4 = "fisuras-grietas";
const S5 = "deformaciones-desagregaciones-desplomes";

await sembrarTema({
  tema: {
    slug: "tema-318",
    titulo: "Principios de la construcción: fuerzas, esfuerzos, transmisión de cargas y patología estructural",
    descripcion: "Fuerza, momento y par; esfuerzos de tracción, compresión, cortante, torsión y flexión; acciones permanentes, variables y accidentales; transmisión de cargas de forjados a pilares y cimentación; patología de la edificación: causas de las lesiones, manifestaciones, fisuras y grietas (vivas, muertas, mixtas) y su control, deformaciones, desagregaciones, desplomes y pandeos, disgregaciones y lesiones por asientos.",
    contenido: "Sigue el Manual IVASPE (Módulo 2, Tema 11), que la Escuela de Bomberos de Zaragoza recomienda para este tema: cómo trabaja un edificio (qué esfuerzos sufre cada pieza y cómo bajan las cargas hasta el terreno) y cómo leer sus lesiones en una inspección de urgencia: distinguir una grieta de una fisura, saber si sigue moviéndose y qué indican las deformaciones, los desplomes o los asientos.",
    enlaces_boe: [
      { url: IVASPE, titulo: "Manual básico IVASPE (nov. 2017) — Módulo 2, Tema 11: Principios de construcción y estabilización de estructuras" },
      { url: BIBLIO, titulo: "Escuela de Bomberos de Zaragoza — Bibliografía externa recomendada (remite el Tema 23 al Manual IVASPE)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "Tipos de fuerzas y de esfuerzos", articulos: "IVASPE M2-T11, apartados 1.1.1-1.1.2", url: IVASPE },
      { seccion: S2, titulo: "Acciones en la edificación y transmisión de cargas", articulos: "IVASPE M2-T11, apartados 1.1.3-1.1.4", url: IVASPE },
      { seccion: S3, titulo: "Patología estructural: conceptos y causas de las lesiones", articulos: "IVASPE M2-T11, apartados 2.1-2.2", url: IVASPE },
      { seccion: S4, titulo: "Fisuras y grietas: clasificación y control", articulos: "IVASPE M2-T11, apartado 2.3.1", url: IVASPE },
      { seccion: S5, titulo: "Deformaciones, desagregaciones, desplomes, pandeos y asientos", articulos: "IVASPE M2-T11, apartados 2.3.2-2.4", url: IVASPE },
    ],
  },
  vinculo: { oposicion: BOMBERO.oposicion, bloqueId: BOMBERO.bloqueParteII, numero: 23 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["¿Qué es una fuerza y su unidad?", "Todo agente capaz de modificar la cantidad de movimiento o la forma de un cuerpo; se mide en newtons (N) y es un vector con módulo, dirección y sentido"],
        ["¿Qué es el momento de una fuerza?", "El producto de la fuerza por la distancia al eje de giro; se mide en N·m"],
        ["¿Qué es un par de fuerzas?", "Dos fuerzas iguales, paralelas y de sentido contrario que producen un giro"],
        ["Cinco tipos de esfuerzos", "Tracción (alarga), compresión (acorta), cortante (desgarra entre planos próximos), torsión (giro de secciones) y flexión"],
        ["¿Qué es el pandeo?", "El colapso de una pieza comprimida por deformación perpendicular a la fuerza; depende de su esbeltez y de sus apoyos"],
        ["¿Qué ocurre en una viga flexionada?", "Se comprime una cara, se tracciona la opuesta y entre ambas hay una fibra neutra sin tensión"],
        ["Momento flector positivo y negativo", "Positivo si tracciona las fibras inferiores de la viga; negativo si tracciona las superiores"],
      ],
      preguntas: [
        ["facil", "¿Qué esfuerzo tiende a alargar una pieza?", ["Tracción", "Compresión", "Torsión"], "IVASPE M2-T11."],
        ["media", "¿Cómo aumenta el momento de una fuerza?", ["Aumentando la fuerza o la distancia al eje", "Solo con la fuerza", "Reduciendo la distancia"], "IVASPE M2-T11."],
        ["media", "¿Qué esfuerzo aparece típicamente en tornillos, remaches o soldaduras de unión?", ["Cortante", "Torsión pura", "Tracción únicamente"], "IVASPE M2-T11."],
        ["media", "¿De qué depende el pandeo?", ["De la esbeltez y las condiciones de apoyo", "Del color", "De la humedad solamente"], "IVASPE M2-T11."],
        ["dificil", "¿Qué esfuerzos se producen en la flexión de una viga?", ["Compresión, tracción y cortadura", "Solo tracción", "Solo torsión"], "IVASPE M2-T11."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Clasificación de las acciones según el CTE", "Permanentes (G: peso propio, terreno, pretensado), variables (Q: uso, viento, nieve, térmicas) y accidentales (A: sismo, incendio, impacto)"],
        ["Acciones estáticas y dinámicas", "Estáticas: aplicadas gradualmente y prolongadas (peso propio). Dinámicas: varían rápidamente (viento, sismo)"],
        ["Acciones repartidas y concentradas", "Repartidas en superficie (N/m²) o en línea (N/m); concentradas en un punto (N)"],
        ["Peso propio de tabiquería en viviendas según el manual", "En general, 1,0 kN por m² de superficie construida"],
        ["¿Qué es el valor de cálculo de una acción?", "El valor característico multiplicado por un coeficiente de seguridad"],
        ["Mecanismo de transmisión de cargas", "Forjados y losas → vigas → muros o pilares → cimentación → terreno"],
      ],
      preguntas: [
        ["facil", "¿Qué tipo de acción es el peso propio de la estructura?", ["Permanente", "Variable", "Accidental"], "IVASPE M2-T11."],
        ["media", "¿Qué tipo de acción es un incendio?", ["Accidental", "Permanente", "Variable"], "IVASPE M2-T11."],
        ["media", "¿Qué elementos reciben primero las acciones verticales?", ["Los forjados o losas", "La cimentación", "Los pilares"], "IVASPE M2-T11."],
        ["media", "¿Qué elemento transmite las cargas al terreno?", ["La cimentación", "La viga", "La cubierta"], "IVASPE M2-T11."],
        ["dificil", "¿Qué documento del CTE recoge los pesos y sobrecargas que cita el manual?", ["DB SE-AE", "DB SI", "DB HS"], "IVASPE M2-T11."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["¿Qué es la patología de la construcción?", "El estudio de las lesiones que se manifiestan en las edificaciones"],
        ["Causas de las lesiones según el manual", "Uso o explotación, modificaciones del suelo y aguas freáticas, influencias externas (incendio, inundación, xilófagos…), sismos, errores de proyecto, materiales o ejecución y causas inevitables"],
        ["¿Qué causas representan la mayoría de daños evitables?", "La explotación inadecuada y los errores de cálculo, materiales o ejecución"],
        ["¿Por qué preocupa la fisuración?", "Porque cambia el reparto de cargas y tensiones y puede llevar progresivamente al colapso"],
        ["Error frecuente en el diagnóstico", "Que cada técnico busque la causa solo dentro de su especialidad; casi nunca hay una sola causa"],
        ["¿Cuándo se dice que un edificio está en ruina?", "Cuando sus lesiones afectan a su estabilidad y, en grado avanzado, obligan al desalojo por peligro de derrumbe"],
      ],
      preguntas: [
        ["facil", "¿Cuál es la principal manifestación de las lesiones en un edificio?", ["Fisuras y grietas", "Cambios de color", "Ruidos"], "IVASPE M2-T11."],
        ["media", "¿Suele haber una única causa en una lesión estructural?", ["No, casi siempre es una combinación", "Sí, siempre", "Nunca hay causa"], "IVASPE M2-T11."],
        ["media", "¿Por qué las sobrecargas eventuales no suelen dañar la estructura?", ["Por los coeficientes de seguridad del cálculo", "Porque no pesan", "Porque se reparten solas al aire"], "IVASPE M2-T11."],
        ["media", "¿Qué suelen hacer las lesiones por exceso de carga?", ["Avisar, por ser progresivas", "Aparecer siempre de golpe", "Desaparecer"], "IVASPE M2-T11."],
        ["dificil", "¿Pueden aparecer los efectos de una sobrecarga años después?", ["Sí, al sumarse a fluencia, corrosión o xilófagos", "No", "Solo en madera nueva"], "IVASPE M2-T11."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Diferencia entre grieta y fisura", "Grieta: abertura que afecta a todo el espesor del elemento. Fisura: solo afecta a la superficie o al acabado"],
        ["Fisuras vivas", "Siguen moviéndose y progresan; bordes limpios y color vivo del material recién roto"],
        ["Fisuras muertas", "No progresan; bordes e interior sucios (p. ej. de retracción o que actúan como junta)"],
        ["Fisuras mixtas", "Fisuras muertas en cuyos extremos aparecen nuevas fisuras por un nuevo desequilibrio"],
        ["Métodos rápidos de control de fisuras", "Marca en cruz en el extremo, aguja encajada, testigo de yeso de 2-3 mm, clavos con calibre o fisurómetro; anotar fecha y hora"],
        ["¿Cómo detectar fisuras invisibles a simple vista?", "Mojar el paramento y esperar: la fisura queda húmeda más tiempo y se distingue"],
        ["¿Por dónde siguen las fisuras en fábricas de ladrillo?", "Por las llagas (juntas verticales) y tendeles (juntas horizontales) cuando el mortero es más débil"],
      ],
      preguntas: [
        ["facil", "Una abertura que atraviesa todo el espesor de un tabique es…", ["Una grieta", "Una fisura", "Un poro"], "IVASPE M2-T11."],
        ["media", "¿Cómo se reconoce una fisura viva?", ["Bordes limpios y color vivo del material", "Bordes sucios", "Pintura encima"], "IVASPE M2-T11."],
        ["media", "Si la fisura rebasa la marca en cruz hecha en su extremo, indica que…", ["Está evolucionando", "Está muerta", "Es superficial"], "IVASPE M2-T11."],
        ["media", "¿Qué inconveniente tiene el testigo de yeso?", ["La humedad puede entumecer el yeso y dificultar su rotura", "Es caro", "Es invisible"], "IVASPE M2-T11."],
        ["dificil", "¿Qué precisión dan los clavos con arandela medidos con calibre?", ["Del orden de 0,05 a 0,1 mm", "1 cm", "1 m"], "IVASPE M2-T11."],
        ["media", "¿Qué dato se anota junto a cualquier testigo de control?", ["Fecha y hora de colocación", "El nombre del vecino", "Nada"], "IVASPE M2-T11."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["¿A qué obedecen las deformaciones de vigas y forjados?", "A exceso de cargas, merma de sección de viguetas o descensos del encofrado"],
        ["¿Qué es la desagregación?", "Pérdida de cohesión del material por mala calidad o ataque químico (sobre todo sulfatos y cloruros), que libera los áridos"],
        ["¿Dónde aparecen desplomes y pandeos?", "En elementos verticales muy cargados, con empujes o con humedades continuas"],
        ["¿Por qué son graves los desplomes?", "Porque la causa suele seguir actuando y el elemento pasa de trabajar a compresión a flexión compuesta"],
        ["¿Qué es la disgregación?", "Rotura de material sano por tracciones internas, típicamente por la corrosión de armaduras que hace saltar el recubrimiento"],
        ["¿Qué es un asiento diferencial?", "El descenso desigual del apoyo de una parte de la cimentación respecto a otra"],
        ["Grietas por asiento central de un muro", "Forman un arco de descarga sobre la zona que cede, anchas en el centro y capilares en los extremos"],
      ],
      preguntas: [
        ["facil", "¿Qué compuestos son la principal causa de desagregación?", ["Sulfatos y cloruros", "Oxígeno y nitrógeno", "Agua destilada"], "IVASPE M2-T11."],
        ["media", "¿Qué indica una deformación de forjado sin fisuras en viguetas?", ["Un descenso del encofrado durante el hormigonado", "Un incendio", "Un sismo"], "IVASPE M2-T11."],
        ["media", "¿Qué produce la corrosión de armaduras?", ["Disgregación: salta el recubrimiento", "Endurecimiento", "Nada"], "IVASPE M2-T11."],
        ["media", "¿Qué elementos estructurales se separan con más facilidad?", ["Los de sistemas isostáticos sin arriostramiento", "Los muy arriostrados", "Ninguno"], "IVASPE M2-T11."],
        ["dificil", "¿Qué forma tienen las grietas en el relleno de un marco que sufre un asiento?", ["Parabólica, con la concavidad hacia el punto que cede", "Siempre recta horizontal", "Circular"], "Concepto de marco, IVASPE M2-T11."],
        ["media", "Con igual deformación, ¿qué elemento es menos seguro?", ["Uno de hormigón, frente a acero o madera", "Uno de madera", "Uno de acero"], "IVASPE M2-T11."],
      ],
    },
  ],
  glosario: [
    [S1, "Fibra neutra", "Línea de una pieza flexionada que no sufre ni tracción ni compresión."],
    [S1, "Pandeo", "Flexión lateral de una pieza esbelta comprimida que puede llevarla al colapso."],
    [S2, "Acción accidental", "Acción de baja probabilidad pero gran importancia: sismo, incendio o impacto."],
    [S2, "Forjado", "Elemento horizontal que recibe las cargas de cada planta y las transmite a vigas o muros."],
    [S4, "Fisura viva", "Fisura que sigue moviéndose; indica que la lesión no se ha estabilizado."],
    [S4, "Fisurómetro", "Regla graduada con corredera fijada a ambos lados de una fisura para medir su evolución."],
    [S5, "Asiento diferencial", "Descenso desigual de partes de la cimentación que provoca lesiones en el edificio."],
    [S5, "Desplome", "Pérdida de verticalidad de un muro o soporte."],
  ],
  casos: [
    {
      slug: "caso-grieta-medianera-obra",
      titulo: "Grietas tras una obra en el solar de al lado",
      supuesto: "Vecinos de un edificio antiguo de muros de carga llaman porque, desde que se excava el sótano del solar contiguo, aparecen grietas en la fachada junto a la medianera.",
      preguntas: [
        [S5, "facil", "¿Qué tipo de lesión es probable?", ["Un asiento por pérdida de apoyo del terreno", "Una fisura de pintura", "Una helada"], "IVASPE M2-T11."],
        [S4, "media", "¿Cómo se comprueba rápidamente si la grieta sigue moviéndose?", ["Con un testigo o una marca en su extremo, anotando fecha y hora", "Mirándola una vez", "Pintándola"], "IVASPE M2-T11."],
        [S4, "media", "Si tiene bordes limpios y color vivo, ¿qué es?", ["Viva", "Muerta", "Mixta"], "IVASPE M2-T11."],
        [S5, "media", "¿Cómo suelen ser las grietas en fachada por asiento junto a una medianera?", ["De cortante a unos 45°, ascendentes hacia el edificio que asienta", "Horizontales en el tejado", "Inexistentes"], "IVASPE M2-T11."],
        [S3, "media", "¿Qué causa del manual encaja con esta situación?", ["Modificaciones del suelo", "Uso normal", "Ninguna"], "IVASPE M2-T11."],
        [S2, "media", "¿Por qué afecta a todo el edificio un fallo de la cimentación?", ["Porque es donde terminan todas las cargas", "Porque es ligera", "No afecta"], "IVASPE M2-T11."],
        [S3, "media", "¿Qué estado alcanza un edificio cuyas lesiones comprometen su estabilidad?", ["Ruina, con posible desalojo", "Nuevo", "Reformado"], "IVASPE M2-T11."],
        [S4, "media", "¿Qué diferencia hay entre grieta y fisura?", ["La grieta atraviesa todo el espesor", "Ninguna", "La fisura es más grande"], "IVASPE M2-T11."],
        [S3, "dificil", "¿Qué error de diagnóstico advierte el manual?", ["Buscar la causa solo en la propia especialidad", "Llamar al arquitecto", "Medir la grieta"], "IVASPE M2-T11."],
        [S5, "media", "¿Qué elemento del muro sufre primero en un asiento?", ["Los cerramientos, antes que la estructura", "La cubierta", "El tejado"], "IVASPE M2-T11."],
      ],
    },
    {
      slug: "caso-forjado-flechado-almacen",
      titulo: "Un forjado muy flechado en un almacén",
      supuesto: "En un almacén en una primera planta, el forjado presenta una flecha visible bajo pilas de mercancía y las puertas de la planta inferior han dejado de cerrar.",
      preguntas: [
        [S2, "facil", "¿Qué tipo de acción es la mercancía almacenada?", ["Variable (sobrecarga de uso)", "Permanente", "Accidental"], "IVASPE M2-T11."],
        [S1, "media", "¿Qué esfuerzo sufre principalmente el forjado?", ["Flexión", "Torsión", "Tracción pura"], "IVASPE M2-T11."],
        [S1, "media", "¿Qué cara de la viga está traccionada con momento positivo?", ["La inferior", "La superior", "Ninguna"], "IVASPE M2-T11."],
        [S5, "media", "¿Por qué las puertas inferiores no cierran?", ["La deformación del forjado afecta a paramentos y huecos", "Por humedad", "Por el viento"], "IVASPE M2-T11."],
        [S5, "media", "¿A qué puede deberse la deformación según el manual?", ["Exceso de cargas o merma de sección de viguetas", "Al color de la pintura", "A la luz"], "IVASPE M2-T11."],
        [S2, "media", "¿Hacia dónde transmite el forjado su carga?", ["A vigas y luego a pilares o muros", "Al tejado", "A la calle"], "IVASPE M2-T11."],
        [S3, "media", "¿Qué tipo de causa es un almacenamiento excesivo?", ["Explotación inadecuada, evitable", "Inevitable", "Sísmica"], "IVASPE M2-T11."],
        [S2, "dificil", "¿Qué es el valor de cálculo de una acción?", ["El característico por un coeficiente de seguridad", "El peso real", "El precio"], "IVASPE M2-T11."],
        [S4, "media", "Si aparecen fisuras en la cara inferior, ¿qué se hace?", ["Controlar su evolución con testigos", "Taparlas", "Ignorarlas"], "IVASPE M2-T11."],
        [S5, "media", "Con igual flecha, ¿qué forjado preocupa más?", ["Uno de hormigón", "Uno de madera", "Uno de acero"], "IVASPE M2-T11."],
      ],
    },
    {
      slug: "caso-pilar-desplomado-fachada",
      titulo: "Un pilar de fachada desplomado",
      supuesto: "Tras unas lluvias persistentes, un pilar de fábrica en la fachada de un edificio antiguo muestra un desplome visible y fisuras a su alrededor; el ladrillo de la base se desmorona.",
      preguntas: [
        [S5, "facil", "¿Qué manifestación es la pérdida de verticalidad del pilar?", ["Desplome", "Fisura de retracción", "Disgregación por impacto"], "IVASPE M2-T11."],
        [S5, "media", "¿Por qué es grave?", ["La causa suele seguir actuando y el pilar pasa a flexión compuesta", "No es grave", "Por estética"], "IVASPE M2-T11."],
        [S5, "media", "¿Qué indica que el ladrillo se desmorone en masa incoherente?", ["Desagregación del material", "Que está nuevo", "Pandeo elástico"], "IVASPE M2-T11."],
        [S3, "media", "¿Qué causa externa puede intervenir?", ["Las humedades continuas", "El sol", "La radio"], "IVASPE M2-T11."],
        [S1, "media", "¿Qué esfuerzo soporta normalmente un pilar?", ["Compresión", "Tracción", "Torsión"], "IVASPE M2-T11."],
        [S1, "media", "¿Qué fenómeno puede hacer colapsar un pilar esbelto comprimido?", ["El pandeo", "La retracción", "La sublimación"], "IVASPE M2-T11."],
        [S4, "media", "¿Cómo se sabe si las fisuras alrededor progresan?", ["Con testigos o marcas fechadas", "Por el olor", "No se puede"], "IVASPE M2-T11."],
        [S5, "dificil", "¿Dónde debe estar la resultante de cargas para que no aparezcan tracciones?", ["Dentro del núcleo central de la sección", "Fuera de la sección", "En la cubierta"], "IVASPE M2-T11."],
        [S3, "media", "¿Qué estado puede alcanzar el inmueble si progresa?", ["Ruina", "Rehabilitado", "Ninguno"], "IVASPE M2-T11."],
        [S2, "media", "¿Qué tipo de acción es la lluvia acumulada sobre una cubierta?", ["Variable", "Permanente", "Accidental"], "IVASPE M2-T11."],
      ],
    },
  ],
});
