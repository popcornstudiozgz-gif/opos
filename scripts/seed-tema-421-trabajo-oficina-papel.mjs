/**
 * Crea tema-421 — Tema 7 de Subalterna/o (Ayto. Zaragoza, CONV 5/2026,
 * Anexo I): "Trabajo de oficina. Manejo de máquinas reproductoras,
 * multicopistas, fax y otras análogas. Encuadernación. El papel: tipos y
 * formatos."
 *
 * Fuentes: conocimiento técnico consolidado de oficina sin norma jurídica
 * que lo regule (manejo de fotocopiadoras e impresoras multifunción,
 * multicopistas o duplicadoras, fax, escáner, destructora, plastificadora y
 * guillotina; sistemas de encuadernación; tipos de papel y gramaje). Para
 * los formatos de papel se cita la norma internacional ISO 216 (serie A:
 * A0 de 1 m², proporción 1:√2, A4 de 210 × 297 mm, cada formato es la mitad
 * del anterior), comprobada por búsqueda en esta sesión; no se ha podido
 * confirmar en AENOR su número de adopción UNE vigente, así que no se cita.
 * Los formatos de sobre (C4, C5, C6 y DL) se dan como formatos habituales,
 * sin norma. Lenguaje sencillo (convocatoria para personas con
 * discapacidad intelectual).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-421-trabajo-oficina-papel.mjs
 */
import { sembrarTema, SUBALTERNO } from "./lib/sembrar-tema.mjs";

const S1 = "maquinas-reproductoras-fax";
const S2 = "encuadernacion";
const S3 = "papel-tipos-formatos";

await sembrarTema({
  tema: {
    slug: "tema-421",
    titulo: "Trabajo de oficina: máquinas reproductoras, multicopistas y fax; encuadernación; el papel, tipos y formatos",
    descripcion: "Máquinas de oficina: fotocopiadora e impresora multifunción (copiar, imprimir, escanear, enviar fax), funciones habituales (número de copias, doble cara, ampliar y reducir, clasificar, grapar), atascos y tóner; la multicopista o duplicadora para tiradas grandes; el fax; escáner, destructora, plastificadora, guillotina y perforadora. Encuadernación: grapado, anillas y archivadores, canutillo, espiral, wire-o y térmica. El papel: formatos de la serie A de la ISO 216 (A3, A4, A5), sobres, gramaje y tipos de papel; ahorro y reciclaje.",
    contenido: "Cómo usar las máquinas de una oficina (fotocopiadora, multicopista, fax y otras), cómo encuadernar documentos y qué tipos y tamaños de papel existen.",
    enlaces_boe: [],
    indice_estudio: [
      { seccion: S1, titulo: "Máquinas reproductoras, multicopistas, fax y otras", articulos: "Conocimiento técnico", url: "" },
      { seccion: S2, titulo: "La encuadernación", articulos: "Conocimiento técnico", url: "" },
      { seccion: S3, titulo: "El papel: tipos y formatos", articulos: "ISO 216 y conocimiento técnico", url: "" },
    ],
  },
  vinculo: { oposicion: SUBALTERNO.oposicion, bloqueId: SUBALTERNO.bloque, numero: 7 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Máquina multifunción", "Aparato que fotocopia, imprime, escanea y, a veces, envía fax"],
        ["Fotocopiar", "Se pone el original boca abajo en el cristal (o en el alimentador), se eligen el número de copias y las opciones y se pulsa el botón de inicio"],
        ["Copia a doble cara", "Imprime por las dos caras de la hoja; ahorra papel"],
        ["Ampliar y reducir", "Para pasar de A3 a A4 se reduce al 71 %; para pasar de A4 a A3 se amplía al 141 %"],
        ["Clasificar y grapar", "La máquina ordena las copias en juegos completos y puede graparlas"],
        ["Atasco de papel", "Se sigue lo que indica la pantalla, se abre la tapa indicada y se retira el papel con cuidado; no se toca la zona caliente (fusor)"],
        ["Tóner", "Polvo de tinta de la fotocopiadora y de la impresora láser; el cartucho gastado se cambia según las instrucciones y se recicla"],
        ["Multicopista o duplicadora", "Máquina para hacer muchas copias de un mismo original de forma rápida y barata, con un cliché o máster y tinta"],
        ["Fax", "Aparato que envía y recibe documentos por la línea telefónica; el informe de transmisión prueba que se ha enviado"],
        ["Otras máquinas", "Escáner (pasa un documento a archivo digital), destructora (tritura papeles con datos personales), plastificadora (cubre con plástico) y guillotina (corta muchas hojas)"],
      ],
      preguntas: [
        ["facil", "Una máquina que fotocopia, imprime y escanea se llama:", ["Multifunción", "Destructora", "Plastificadora"], "Conocimiento técnico."],
        ["media", "Para hacer muchas copias baratas de un mismo original se usa:", ["La multicopista o duplicadora", "La plastificadora", "El fax"], "Conocimiento técnico."],
        ["media", "Para pasar un documento de A3 a A4 se reduce al:", ["71 %", "141 %", "50 %"], "Conocimiento técnico (relación entre formatos ISO 216)."],
        ["media", "Si se atasca el papel en la fotocopiadora:", ["Se siguen las indicaciones de la pantalla y se retira con cuidado", "Se tira fuerte del papel con la máquina en marcha", "Se golpea la máquina"], "Conocimiento técnico."],
        ["media", "El documento que prueba que un fax se ha enviado es:", ["El informe de transmisión", "El tóner", "El cliché"], "Conocimiento técnico."],
        ["media", "Los papeles con datos personales que ya no sirven se:", ["Destruyen en la destructora", "Tiran a la papelera tal cual", "Dejan en la mesa"], "Conocimiento técnico."],
        ["facil", "El polvo de tinta de la fotocopiadora se llama:", ["Tóner", "Grapa", "Cartulina"], "Conocimiento técnico."],
        ["media", "Para pasar un documento en papel a un archivo del ordenador se usa:", ["El escáner", "La guillotina", "La grapadora"], "Conocimiento técnico."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["Encuadernar", "Unir varias hojas para que formen un documento o libro y se conserven ordenadas"],
        ["Grapado", "La forma más sencilla: una o dos grapas en la esquina o en el lateral"],
        ["Anillas y archivadores", "Se hacen agujeros con la perforadora (taladro de papel) y las hojas se guardan en una carpeta de anillas o un archivador"],
        ["Canutillo", "Pieza de plástico con dientes que se introduce en agujeros rectangulares; permite abrir y cerrar el documento"],
        ["Espiral", "Alambre o plástico en forma de muelle que se enrosca en los agujeros; el documento se abre del todo"],
        ["Wire-o", "Doble anilla metálica que se cierra con una máquina; da un acabado de calidad"],
        ["Encuadernación térmica", "La máquina calienta la cola del lomo de una tapa especial y pega las hojas"],
        ["Tapas", "Normalmente una tapa delantera transparente y una trasera de cartulina para proteger el documento"],
      ],
      preguntas: [
        ["facil", "La forma más sencilla de unir unas hojas es:", ["Graparlas", "La encuadernación térmica", "El wire-o"], "Conocimiento técnico."],
        ["media", "Para guardar hojas en una carpeta de anillas antes hay que:", ["Hacer agujeros con la perforadora", "Plastificarlas", "Graparlas"], "Conocimiento técnico."],
        ["media", "La encuadernación con una pieza de plástico con dientes se llama:", ["Canutillo", "Wire-o", "Térmica"], "Conocimiento técnico."],
        ["media", "La encuadernación que pega las hojas con cola caliente en el lomo es:", ["La térmica", "La espiral", "El grapado"], "Conocimiento técnico."],
        ["media", "La doble anilla metálica que se cierra con una máquina es el:", ["Wire-o", "Canutillo", "Clip"], "Conocimiento técnico."],
        ["media", "Normalmente la tapa delantera de un documento encuadernado es:", ["Transparente", "De madera", "De metal"], "Conocimiento técnico."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Formatos de la serie A (ISO 216)", "El A0 mide 1 m²; cada formato es la mitad del anterior: A1, A2, A3, A4, A5…; todos tienen la misma forma (proporción 1:√2)"],
        ["Medidas más usadas", "A3: 297 × 420 mm. A4: 210 × 297 mm (el folio habitual). A5: 148 × 210 mm"],
        ["Relación entre formatos", "Dos hojas A4 juntas forman un A3; una hoja A4 doblada por la mitad da dos A5"],
        ["Sobres habituales", "C4 (para un A4 sin doblar), C5 (A4 doblado una vez), C6 (A4 doblado dos veces) y DL o americano (A4 doblado en tres)"],
        ["Gramaje", "Peso del papel en gramos por metro cuadrado (g/m²); el papel normal de oficina suele ser de 80 g/m²; la cartulina pesa mucho más"],
        ["Tipos de papel", "De fotocopia u offset, reciclado, couché (con brillo, para folletos), cartulina, autocopiativo (hace copias sin papel carbón), adhesivo y continuo"],
        ["Papel reciclado", "Fabricado con papel usado; ayuda a cuidar el medio ambiente"],
        ["Guardar el papel", "En un lugar seco, plano y lejos del calor, para que no se humedezca ni se doble y no atasque las máquinas"],
        ["Ahorro de papel", "Imprimir a doble cara, imprimir solo lo necesario, reutilizar las hojas para notas y tirar el papel usado al contenedor azul"],
      ],
      preguntas: [
        ["facil", "El folio habitual de oficina es el:", ["A4", "A3", "A0"], "ISO 216."],
        ["media", "El A4 mide:", ["210 × 297 mm", "297 × 420 mm", "148 × 210 mm"], "ISO 216."],
        ["media", "Dos hojas A4 juntas forman un:", ["A3", "A5", "A6"], "ISO 216."],
        ["media", "El A0 tiene una superficie de:", ["1 m²", "2 m²", "0,5 m²"], "ISO 216."],
        ["media", "El sobre para meter un A4 sin doblar es el:", ["C4", "DL", "C6"], "Conocimiento técnico."],
        ["media", "El gramaje del papel indica:", ["Su peso en gramos por metro cuadrado", "Su color", "Su precio"], "Conocimiento técnico."],
        ["media", "El papel que hace copias sin papel carbón es el:", ["Autocopiativo", "Couché", "Cartulina"], "Conocimiento técnico."],
        ["facil", "El papel usado se tira al contenedor:", ["Azul", "Verde", "Amarillo"], "Conocimiento técnico."],
      ],
    },
  ],
  glosario: [
    [S1, "Multifunción", "Máquina que fotocopia, imprime, escanea y a veces envía fax."],
    [S1, "Multicopista", "Máquina para hacer muchas copias rápidas y baratas de un original."],
    [S1, "Tóner", "Polvo de tinta de las fotocopiadoras e impresoras láser."],
    [S1, "Destructora", "Máquina que tritura papeles para que no se puedan leer."],
    [S2, "Perforadora", "Herramienta que hace agujeros en el papel para archivarlo."],
    [S2, "Canutillo", "Encuadernación con una pieza de plástico con dientes."],
    [S2, "Wire-o", "Encuadernación con doble anilla metálica."],
    [S3, "A4", "Formato de papel de 210 × 297 mm, el más usado en oficinas."],
    [S3, "Gramaje", "Peso del papel en gramos por metro cuadrado."],
    [S3, "Papel reciclado", "Papel fabricado a partir de papel usado."],
    [S3, "Couché", "Papel con brillo usado en folletos y revistas."],
  ],
  casos: [
    {
      slug: "fotocopias-para-reunion",
      titulo: "Las fotocopias para la reunión",
      supuesto: "Tu jefa te pide 30 copias de un documento de 10 páginas para una reunión de esta tarde. Quiere las copias a doble cara, ordenadas en juegos y grapadas. Además, una de las páginas es un plano en A3 que hay que reducir a A4.",
      preguntas: [
        [S1, "facil", "¿Qué máquina usarás?", ["La fotocopiadora o multifunción", "La plastificadora", "La destructora"], "Conocimiento técnico."],
        [S1, "media", "Para gastar menos papel elegirás:", ["Copia a doble cara", "Copia a una cara en papel grueso", "Hacer el doble de copias"], "Conocimiento técnico."],
        [S1, "media", "Para que las copias salgan en juegos completos elegirás la función:", ["Clasificar", "Ampliar", "Escanear"], "Conocimiento técnico."],
        [S1, "media", "Para reducir el plano de A3 a A4 elegirás:", ["71 %", "141 %", "100 %"], "Conocimiento técnico."],
        [S3, "media", "El formato A4 mide:", ["210 × 297 mm", "297 × 420 mm", "148 × 210 mm"], "ISO 216."],
        [S1, "media", "A mitad del trabajo se atasca el papel. Lo correcto es:", ["Seguir las indicaciones de la pantalla y sacar el papel con cuidado", "Tirar del papel con fuerza", "Apagar y marcharse"], "Conocimiento técnico."],
        [S1, "dificil", "Al sacar el papel atascado no debes tocar:", ["La zona caliente (fusor)", "La bandeja del papel", "El botón de inicio"], "Conocimiento técnico."],
        [S2, "media", "Las copias se unen de la forma más sencilla con:", ["Grapas", "Encuadernación térmica", "Wire-o"], "Conocimiento técnico."],
        [S3, "media", "¿Qué papel usarás para las copias normales?", ["Papel de oficina de unos 80 g/m²", "Cartulina gruesa", "Papel adhesivo"], "Conocimiento técnico."],
        [S1, "media", "Si la pantalla avisa de que falta tóner:", ["Se cambia el cartucho según las instrucciones o se avisa", "Se echa tinta de bolígrafo", "Se sigue imprimiendo hasta que se rompa"], "Conocimiento técnico."],
      ],
    },
    {
      slug: "memoria-anual-encuadernada",
      titulo: "La memoria anual encuadernada",
      supuesto: "En el centro cívico hay que preparar 5 ejemplares de la memoria anual (80 páginas) para entregarlos a los miembros del Consejo de Centro. Deben quedar bien presentados y poder abrirse con facilidad. Además, hay que enviar por fax una página a otra oficina.",
      preguntas: [
        [S2, "media", "Para que la memoria se abra del todo y quede bien, puedes usar:", ["Encuadernación en espiral", "Una sola grapa", "Un clip"], "Conocimiento técnico."],
        [S2, "media", "Si quieres un acabado de calidad con doble anilla metálica usarás:", ["Wire-o", "Canutillo", "Grapas"], "Conocimiento técnico."],
        [S2, "media", "La tapa delantera suele ser:", ["Transparente", "De cartón ondulado", "De metal"], "Conocimiento técnico."],
        [S2, "media", "La tapa trasera suele ser de:", ["Cartulina", "Papel de seda", "Cristal"], "Conocimiento técnico."],
        [S3, "media", "La cartulina se diferencia del papel normal por:", ["Su mayor gramaje (más gruesa)", "Su color siempre blanco", "Su tamaño A0"], "Conocimiento técnico."],
        [S2, "media", "Para encuadernar con canutillo, antes hay que:", ["Hacer agujeros rectangulares con la máquina de encuadernar", "Plastificar las hojas", "Pegar las hojas con cola"], "Conocimiento técnico."],
        [S1, "media", "El fax envía el documento por:", ["La línea telefónica", "Correo postal", "Mensajero"], "Conocimiento técnico."],
        [S1, "media", "Para comprobar que el fax ha llegado, se guarda:", ["El informe de transmisión", "El tóner", "La tapa"], "Conocimiento técnico."],
        [S1, "media", "Las páginas sobrantes con datos personales se:", ["Destruyen en la destructora", "Dejan en la papelera", "Reutilizan para notas con los datos visibles"], "Conocimiento técnico."],
        [S3, "media", "Para enviar la memoria por correo sin doblarla usarás un sobre:", ["C4", "DL", "C6"], "Conocimiento técnico."],
      ],
    },
    {
      slug: "almacen-de-papel",
      titulo: "El almacén de papel",
      supuesto: "Te encargan ordenar el almacén de material de oficina de la Junta Municipal. Hay paquetes de papel A4 y A3, papel reciclado, cartulinas, sobres de varios tamaños y algunos paquetes que se han mojado por una gotera.",
      preguntas: [
        [S3, "media", "El papel debe guardarse en un lugar:", ["Seco, plano y lejos del calor", "Húmedo y al sol", "En el suelo junto a la puerta"], "Conocimiento técnico."],
        [S3, "media", "¿Por qué no se debe usar el papel mojado en la fotocopiadora?", ["Porque se dobla y puede atascar la máquina", "Porque imprime más rápido", "Porque gasta menos tóner"], "Conocimiento técnico."],
        [S3, "facil", "El papel A3 es:", ["El doble de grande que el A4", "La mitad del A4", "Igual que el A4"], "ISO 216."],
        [S3, "media", "Los sobres para cartas con un A4 doblado en tres son los:", ["DL o americanos", "C4", "C3"], "Conocimiento técnico."],
        [S3, "media", "El papel reciclado:", ["Está hecho con papel usado y cuida el medio ambiente", "No se puede usar en fotocopiadoras", "Es de plástico"], "Conocimiento técnico."],
        [S3, "media", "Para ahorrar papel en la oficina conviene:", ["Imprimir a doble cara y solo lo necesario", "Imprimir todo dos veces", "Usar solo cartulina"], "Conocimiento técnico."],
        [S3, "media", "El A5 es:", ["La mitad de un A4", "El doble de un A4", "Un sobre"], "ISO 216."],
        [S3, "media", "El papel con brillo para folletos se llama:", ["Couché", "Autocopiativo", "Continuo"], "Conocimiento técnico."],
        [S1, "media", "Los cartuchos de tóner gastados se:", ["Llevan a reciclar", "Tiran al contenedor azul", "Vacían en el lavabo"], "Conocimiento técnico."],
        [S3, "dificil", "Todos los formatos de la serie A tienen:", ["La misma forma (proporción 1:√2)", "La misma superficie", "El mismo gramaje"], "ISO 216."],
      ],
    },
  ],
});
