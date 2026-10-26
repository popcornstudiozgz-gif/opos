/**
 * Crea tema-411 — Tema 4 de Operario/a Especialista (Ayto. Zaragoza, CONV
 * 5/2026, Anexo I): "Electricidad: nociones básicas, herramientas y tipos de
 * materiales."
 *
 * Tema dedicado de nivel básico (los de Oficial Electricista, tema-139 a
 * tema-154, son de nivel de oficio y están repartidos en 16 temas; tema-61
 * de Oficial Mantenimiento incluye averías de luminarias y otras materias
 * que este temario no pide).
 *
 * Fuentes:
 * - Reglamento electrotécnico para baja tensión, RD 842/2002
 *   (BOE-A-2002-18099), leído en la API del BOE en esta sesión:
 *   ITC-BT-19 (colores de los conductores: neutro azul claro, protección
 *   verde-amarillo, fases marrón o negro y gris; prohibición de empalmes por
 *   simple retorcimiento) e ITC-BT-25 (protección general de la vivienda:
 *   interruptor general automático de al menos 25 A y diferenciales de
 *   30 mA como máximo; tabla 1 de circuitos C1 a C5 con su interruptor
 *   automático, toma y sección mínima).
 * - RD 614/2001, sobre protección frente al riesgo eléctrico
 *   (BOE-A-2001-11881), anexo II: las cinco reglas para trabajar sin
 *   tensión, leídas literalmente en la API del BOE.
 * - Magnitudes eléctricas, materiales y herramientas: conocimiento técnico
 *   consolidado sin una norma única que lo regule, ya contrastado en los
 *   temas de Oficial Electricista y Oficial Mantenimiento.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-411-electricidad-nociones-basicas.mjs
 */
import { sembrarTema, OPERARIO } from "./lib/sembrar-tema.mjs";

const REBT = "https://www.boe.es/buscar/act.php?id=BOE-A-2002-18099";
const RD614 = "https://www.boe.es/buscar/act.php?id=BOE-A-2001-11881";
const S1 = "magnitudes-conceptos-electricidad";
const S2 = "instalacion-vivienda-protecciones";
const S3 = "materiales-electricos";
const S4 = "herramientas-seguridad-electrica";

await sembrarTema({
  tema: {
    slug: "tema-411",
    titulo: "Electricidad: nociones básicas, herramientas y tipos de materiales",
    descripcion: "Nociones básicas: tensión, intensidad, resistencia, potencia y energía con sus unidades; ley de Ohm y fórmula de la potencia; corriente continua y alterna, red a 230/400 V y 50 Hz; conductores y aislantes. La instalación de una vivienda según el REBT: instalación de enlace, cuadro general de mando y protección (interruptor general automático, diferencial de 30 mA y magnetotérmicos), circuitos C1 a C5 de la ITC-BT-25, puesta a tierra y colores de los conductores de la ITC-BT-19. Materiales: cables y su designación, secciones, tubos y canales, cajas de registro, mecanismos (interruptor, conmutador, cruzamiento, bases de enchufe) y lámparas. Herramientas: destornilladores y alicates aislados, pelacables, buscapolos, polímetro y pinza amperimétrica. Seguridad: contactos directos e indirectos y las cinco reglas del RD 614/2001 para trabajar sin tensión.",
    contenido: "Lo que necesita saber un operario para hacer pequeñas reparaciones eléctricas con seguridad: qué son voltios, amperios y vatios, cómo es el cuadro eléctrico de una vivienda y para qué sirve cada interruptor, qué cables y mecanismos se usan, con qué herramientas se trabaja y las cinco reglas para trabajar sin tensión.",
    enlaces_boe: [
      { url: REBT, titulo: "Real Decreto 842/2002, de 2 de agosto, Reglamento electrotécnico para baja tensión (ITC-BT-19 e ITC-BT-25) (BOE-A-2002-18099)" },
      { url: RD614, titulo: "Real Decreto 614/2001, de 8 de junio, protección de la salud y seguridad de los trabajadores frente al riesgo eléctrico (BOE-A-2001-11881)" },
    ],
    indice_estudio: [
      { seccion: S1, titulo: "Magnitudes eléctricas y conceptos básicos", articulos: "Conocimiento técnico", url: "" },
      { seccion: S2, titulo: "La instalación eléctrica de una vivienda y sus protecciones", articulos: "REBT, ITC-BT-19 e ITC-BT-25", url: REBT },
      { seccion: S3, titulo: "Tipos de materiales eléctricos", articulos: "REBT, ITC-BT-19 y conocimiento técnico", url: REBT },
      { seccion: S4, titulo: "Herramientas y seguridad en trabajos eléctricos", articulos: "Anexo II RD 614/2001", url: RD614 },
    ],
  },
  vinculo: { oposicion: OPERARIO.oposicion, bloqueId: OPERARIO.bloque, numero: 4 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["Tensión", "Diferencia de potencial entre dos puntos que impulsa la corriente; se mide en voltios (V) con el voltímetro, en paralelo"],
        ["Intensidad", "Cantidad de carga que circula por un conductor en la unidad de tiempo; se mide en amperios (A) con el amperímetro, en serie, o con la pinza amperimétrica"],
        ["Resistencia", "Oposición de un material al paso de la corriente; se mide en ohmios (Ω)"],
        ["Ley de Ohm", "I = V / R: la intensidad es proporcional a la tensión e inversamente proporcional a la resistencia"],
        ["Potencia", "Energía por unidad de tiempo; se mide en vatios (W); en corriente continua o en receptores resistivos, P = V × I"],
        ["Energía y kWh", "Potencia por tiempo; el kilovatio-hora (kWh) es la energía de un aparato de 1 kW funcionando una hora, y es la unidad en que se factura"],
        ["Corriente continua y alterna", "La continua circula siempre en el mismo sentido (pilas, baterías); la alterna cambia de sentido periódicamente; la red española es alterna a 50 Hz"],
        ["Tensiones habituales", "230 V entre fase y neutro (monofásica) y 400 V entre fases (trifásica)"],
        ["Conductores y aislantes", "Conductores: dejan pasar la corriente (cobre, aluminio). Aislantes: se oponen a ella (PVC, goma, plástico, madera seca)"],
      ],
      preguntas: [
        ["facil", "La intensidad de corriente se mide en:", ["Amperios", "Voltios", "Ohmios"], "Conocimiento técnico."],
        ["facil", "La resistencia eléctrica se mide en:", ["Ohmios", "Vatios", "Hercios"], "Conocimiento técnico."],
        ["media", "Según la ley de Ohm, si la tensión es 230 V y la resistencia 46 Ω, la intensidad es:", ["5 A", "10 A", "184 A"], "I = V / R = 230 / 46 = 5 A."],
        ["media", "Un radiador eléctrico de 2.300 W conectado a 230 V consume una intensidad de:", ["10 A", "23 A", "1 A"], "I = P / V = 2.300 / 230 = 10 A."],
        ["media", "La frecuencia de la red eléctrica en España es de:", ["50 Hz", "60 Hz", "230 Hz"], "Conocimiento técnico."],
        ["media", "La unidad en la que se factura la energía consumida es:", ["El kilovatio-hora", "El kilovatio", "El voltio-amperio"], "Conocimiento técnico."],
        ["facil", "¿Cuál de estos materiales es un buen aislante?", ["El PVC", "El cobre", "El aluminio"], "Conocimiento técnico."],
        ["dificil", "El voltímetro se conecta respecto al elemento que se mide:", ["En paralelo", "En serie", "Indistintamente, en serie o en paralelo"], "Conocimiento técnico."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["REBT", "Reglamento electrotécnico para baja tensión (RD 842/2002) y sus 52 instrucciones técnicas complementarias (ITC-BT); se aplica hasta 1.000 V en alterna y 1.500 V en continua"],
        ["Instalación de enlace", "Une la red de la distribuidora con la instalación del usuario: caja general de protección, línea general de alimentación, contadores, derivación individual y dispositivos de mando y protección"],
        ["Interruptor general automático (IGA)", "Protección general del cuadro de la vivienda, de corte omnipolar y al menos 25 A; es independiente del interruptor de control de potencia (ITC-BT-25)"],
        ["Interruptor diferencial", "Protege a las personas frente a contactos indirectos: corta cuando detecta una fuga a tierra; en viviendas, 30 mA como máximo (ITC-BT-25)"],
        ["Magnetotérmico o PIA", "Protege cada circuito: la parte térmica frente a sobrecargas y la magnética frente a cortocircuitos"],
        ["Circuitos de una vivienda (ITC-BT-25)", "C1 iluminación (10 A, 1,5 mm²); C2 tomas de uso general y frigorífico (16 A, 2,5 mm²); C3 cocina y horno (25 A, 6 mm²); C4 lavadora, lavavajillas y termo (20 A, 4 mm²); C5 baño y bases auxiliares de cocina (16 A, 2,5 mm²)"],
        ["Puesta a tierra", "Conexión de las masas metálicas a un electrodo enterrado para derivar las corrientes de defecto y que actúe el diferencial"],
        ["Colores de los conductores (ITC-BT-19)", "Neutro: azul claro. Protección (tierra): verde-amarillo. Fases: marrón o negro, y gris si hay que distinguir tres fases"],
        ["Sobrecarga y cortocircuito", "Sobrecarga: intensidad superior a la nominal mantenida en el tiempo (demasiados aparatos). Cortocircuito: contacto directo entre conductores a distinto potencial, con intensidad muy elevada"],
      ],
      preguntas: [
        ["facil", "El conductor de protección (tierra) se identifica por el color:", ["Verde-amarillo", "Azul claro", "Marrón"], "ITC-BT-19 del REBT."],
        ["facil", "El conductor neutro se identifica por el color:", ["Azul claro", "Negro", "Gris"], "ITC-BT-19 del REBT."],
        ["media", "La sensibilidad máxima de los interruptores diferenciales en una vivienda es de:", ["30 mA", "300 mA", "10 A"], "ITC-BT-25, apartado 2.1."],
        ["media", "El interruptor diferencial protege principalmente frente a:", ["Contactos indirectos con masas en tensión por fugas a tierra", "Sobrecargas en un circuito", "Subidas de la factura"], "ITC-BT-25."],
        ["media", "El circuito C3 de una vivienda alimenta:", ["La cocina y el horno", "La iluminación", "La lavadora y el termo"], "ITC-BT-25, tabla 1."],
        ["media", "La sección mínima de los conductores del circuito de iluminación (C1) es:", ["1,5 mm²", "2,5 mm²", "6 mm²"], "ITC-BT-25, tabla 1."],
        ["dificil", "El interruptor automático del circuito de tomas de uso general (C2) es de:", ["16 A", "10 A", "25 A"], "ITC-BT-25, tabla 1."],
        ["media", "La parte magnética de un magnetotérmico actúa frente a:", ["Cortocircuitos", "Fugas a tierra", "Bajadas de tensión"], "Conocimiento técnico."],
        ["dificil", "El interruptor general automático de la vivienda debe tener una intensidad nominal mínima de:", ["25 A", "10 A", "63 A"], "ITC-BT-25, apartado 2.1."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["Partes de un cable", "Conductor (cobre o aluminio, rígido o flexible), aislamiento (PVC, polietileno reticulado XLPE, goma) y, en los multipolares, cubierta exterior común"],
        ["Cable unipolar y multipolar", "Unipolar: un solo conductor aislado. Multipolar (manguera): varios conductores aislados bajo una cubierta común"],
        ["Designación H07V-K", "H: cable armonizado; 07: tensión asignada 450/750 V; V: aislamiento de PVC; K: conductor flexible para instalación fija"],
        ["Secciones normalizadas", "Se expresan en mm² (1,5 - 2,5 - 4 - 6 - 10 - 16 - 25…); si el cálculo no coincide, se elige siempre la sección normalizada superior"],
        ["Tubos y canales protectoras", "Alojan y protegen los conductores: tubos rígidos (instalación vista), flexibles o corrugados (empotrada) y canales con tapa para montaje en superficie (ITC-BT-21)"],
        ["Conexiones", "Se hacen con bornes o regletas de conexión dentro de cajas de registro; el REBT prohíbe unir conductores por simple retorcimiento o arrollamiento (ITC-BT-19)"],
        ["Mecanismos de maniobra", "Interruptor (enciende un punto desde un lugar), conmutador (desde dos lugares, en pareja), cruzamiento (desde tres o más, entre dos conmutadores) y pulsador (actúa mientras se presiona, p. ej., timbre o temporizador)"],
        ["Bases de enchufe", "La habitual es la de 16 A con toma de tierra (2p+T, tipo schuko); la cocina y el horno usan base de 25 A"],
        ["Lámparas", "LED (bajo consumo y larga duración, sustituyen a las demás), fluorescentes (con reactancia y cebador o equipo electrónico), halógenas e incandescentes, estas últimas en desuso"],
      ],
      preguntas: [
        ["media", "Para encender una misma lámpara desde dos puntos distintos se utilizan:", ["Dos conmutadores", "Dos interruptores simples", "Un pulsador y un interruptor"], "Conocimiento técnico."],
        ["dificil", "Para encender un punto de luz desde tres lugares se necesitan:", ["Dos conmutadores y un cruzamiento", "Tres interruptores", "Tres conmutadores"], "Conocimiento técnico."],
        ["media", "En la designación de un cable H07V-K, la letra K indica:", ["Conductor flexible para instalación fija", "Aislamiento de goma", "Cable para exterior"], "Conocimiento técnico."],
        ["media", "Según el REBT, la unión de conductores por simple retorcimiento:", ["No está permitida; deben usarse bornes o regletas", "Está permitida si se encinta", "Está permitida en viviendas"], "ITC-BT-19 del REBT."],
        ["facil", "La base de enchufe habitual de una vivienda es de:", ["16 A con toma de tierra", "10 A sin tierra", "32 A trifásica"], "ITC-BT-25, tabla 1."],
        ["media", "Si el cálculo da una sección de 3,2 mm², ¿qué sección normalizada se elige?", ["4 mm²", "2,5 mm²", "3 mm²"], "Conocimiento técnico: la normalizada inmediatamente superior."],
        ["media", "El tubo corrugado flexible se emplea habitualmente en:", ["Instalaciones empotradas", "Instalaciones vistas en industria", "Líneas aéreas"], "Conocimiento técnico."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["Herramientas aisladas", "Destornilladores y alicates con mango aislado (marcados para 1.000 V) protegen frente al contacto eléctrico al manipular partes que puedan estar en tensión"],
        ["Alicates del electricista", "Universal (sujetar, doblar y cortar), de corte diagonal, de puntas planas o redondas y pelacables (retira el aislamiento sin dañar el conductor)"],
        ["Buscapolos", "Destornillador con piloto o detector que indica si un punto está en tensión (si es fase); orienta, pero no sustituye a un verificador de ausencia de tensión"],
        ["Polímetro", "Aparato que mide tensión, intensidad y resistencia y comprueba la continuidad de un circuito"],
        ["Pinza amperimétrica", "Mide la intensidad que circula por un conductor abrazándolo, sin necesidad de abrir el circuito"],
        ["Contacto directo e indirecto", "Directo: con una parte activa en tensión (un cable pelado). Indirecto: con una masa que ha quedado en tensión por un fallo de aislamiento (la carcasa de un aparato)"],
        ["Las cinco reglas para trabajar sin tensión (RD 614/2001)", "1.ª Desconectar. 2.ª Prevenir cualquier posible realimentación. 3.ª Verificar la ausencia de tensión. 4.ª Poner a tierra y en cortocircuito. 5.ª Proteger frente a elementos próximos en tensión y señalizar la zona de trabajo"],
        ["Prevenir la realimentación", "Asegurar los dispositivos de corte contra una reconexión, preferentemente bloqueando el mecanismo, y señalizar que no se debe maniobrar"],
      ],
      preguntas: [
        ["facil", "La primera de las cinco reglas para trabajar sin tensión es:", ["Desconectar", "Verificar la ausencia de tensión", "Poner a tierra"], "Anexo II RD 614/2001."],
        ["media", "Según el RD 614/2001, después de desconectar hay que:", ["Prevenir cualquier posible realimentación", "Poner a tierra y en cortocircuito", "Empezar a trabajar"], "Anexo II RD 614/2001."],
        ["media", "La tercera regla consiste en:", ["Verificar la ausencia de tensión", "Señalizar la zona de trabajo", "Desconectar"], "Anexo II RD 614/2001."],
        ["media", "Para medir la intensidad sin abrir el circuito se utiliza:", ["La pinza amperimétrica", "El buscapolos", "El pelacables"], "Conocimiento técnico."],
        ["media", "Tocar la carcasa metálica de una lavadora que ha quedado en tensión por un fallo de aislamiento es un contacto:", ["Indirecto", "Directo", "Por arco"], "Conocimiento técnico."],
        ["facil", "¿Qué aparato mide tensión, intensidad y resistencia?", ["El polímetro", "El cortatubos", "El nivel"], "Conocimiento técnico."],
        ["dificil", "¿Cuál es la quinta regla de oro?", ["Proteger frente a elementos próximos en tensión y establecer una señalización de seguridad", "Rearmar el diferencial", "Comprobar con el buscapolos"], "Anexo II RD 614/2001."],
      ],
    },
  ],
  glosario: [
    [S1, "Ley de Ohm", "Relación I = V / R entre la intensidad, la tensión y la resistencia de un circuito."],
    [S1, "Kilovatio-hora (kWh)", "Unidad de energía: la consumida por un aparato de 1.000 W durante una hora."],
    [S2, "Interruptor diferencial", "Dispositivo que corta el circuito al detectar una fuga de corriente a tierra, protegiendo a las personas."],
    [S2, "PIA (magnetotérmico)", "Pequeño interruptor automático que protege un circuito frente a sobrecargas y cortocircuitos."],
    [S2, "ITC-BT", "Instrucción técnica complementaria del Reglamento electrotécnico para baja tensión."],
    [S2, "Cortocircuito", "Contacto directo entre dos conductores a distinto potencial que provoca una intensidad muy elevada."],
    [S3, "Conmutador", "Mecanismo que, instalado por parejas, permite encender o apagar un punto de luz desde dos lugares."],
    [S3, "Cruzamiento", "Mecanismo que, colocado entre dos conmutadores, permite maniobrar un punto de luz desde tres o más lugares."],
    [S3, "Regleta de conexión", "Pieza con bornes para unir conductores de forma segura dentro de una caja de registro."],
    [S4, "Buscapolos", "Destornillador detector que indica si un punto de la instalación está en tensión."],
    [S4, "Realimentación", "Vuelta inesperada de la tensión a una instalación que se había desconectado."],
    [S4, "Contacto indirecto", "Contacto de una persona con una masa metálica que ha quedado en tensión por un fallo de aislamiento."],
  ],
  casos: [
    {
      slug: "enchufe-sin-corriente-aula",
      titulo: "El enchufe sin corriente en un aula del colegio",
      supuesto: "En un colegio público avisan de que en un aula no funciona ningún enchufe, aunque las luces sí encienden. Al abrir el cuadro eléctrico encuentras bajado uno de los magnetotérmicos. La conserje te comenta que esa mañana conectaron a la vez dos radiadores eléctricos de 2.000 W, el proyector y un ordenador.",
      preguntas: [
        [S2, "media", "Por lo que cuenta la conserje, la causa más probable del disparo es:", ["Una sobrecarga en el circuito de tomas de corriente", "Un cortocircuito en el alumbrado", "Una fuga a tierra en la iluminación", "Un corte de la compañía eléctrica"], "Conocimiento técnico: la parte térmica del magnetotérmico actúa por sobrecarga."],
        [S1, "media", "Dos radiadores de 2.000 W a 230 V consumen en total aproximadamente:", ["17,4 A", "4,6 A", "40 A", "8,7 A"], "I = P / V = 4.000 / 230 ≈ 17,4 A."],
        [S2, "dificil", "Si el circuito de tomas tuviera un magnetotérmico de 16 A, ¿qué ocurriría con esa carga?", ["Se dispararía por sobrecarga, porque 17,4 A más el resto superan los 16 A", "Nunca se dispararía", "Se dispararía el diferencial", "Saltaría el ICP de la compañía sin afectar al circuito"], "Conocimiento técnico."],
        [S4, "media", "Antes de revisar la base de enchufe, ¿cuál es la primera regla para trabajar sin tensión?", ["Desconectar", "Verificar la ausencia de tensión", "Poner a tierra", "Señalizar"], "Anexo II RD 614/2001."],
        [S4, "media", "Tras bajar el magnetotérmico, para que nadie lo vuelva a subir mientras trabajas debes:", ["Prevenir la realimentación bloqueándolo y señalizando", "Avisar de palabra y confiar", "Retirar el diferencial", "Dejar el cuadro abierto"], "Anexo II RD 614/2001, regla 2.ª."],
        [S4, "media", "¿Con qué comprobarías que la base ya no tiene tensión?", ["Con un verificador de ausencia de tensión o un polímetro", "Tocando los bornes con la mano", "Con un nivel de burbuja", "Con una llave inglesa"], "Anexo II RD 614/2001, regla 3.ª."],
        [S3, "media", "Al desmontar la base ves el cable verde-amarillo. ¿Qué conductor es?", ["El de protección (tierra)", "El neutro", "Una fase", "El de un timbre"], "ITC-BT-19."],
        [S3, "media", "El cable azul claro de la base corresponde al:", ["Neutro", "Conductor de protección", "Retorno de un conmutador", "Fase"], "ITC-BT-19."],
        [S3, "media", "Si hay que alargar un conductor dentro de la caja, ¿cómo se hace la unión?", ["Con un borne o regleta de conexión", "Retorciendo los dos cables y encintando", "Con cinta americana", "Con una grapa"], "ITC-BT-19."],
        [S2, "media", "Para que no se repita, ¿qué recomendación das?", ["No conectar varios aparatos de gran potencia a la vez en el mismo circuito", "Sustituir el magnetotérmico por otro de 32 A", "Puentear la protección", "Quitar la toma de tierra"], "Conocimiento técnico: nunca se debe sobredimensionar la protección respecto a la sección del cable."],
      ],
    },
    {
      slug: "diferencial-salta-almacen",
      titulo: "El diferencial que salta en el almacén",
      supuesto: "En un almacén municipal salta el interruptor diferencial cada vez que se enchufa una vieja hidrolimpiadora. Un compañero propone «puentear el diferencial para poder trabajar». Tu encargado te pide que expliques por qué no se debe hacer y cómo localizar la avería.",
      preguntas: [
        [S2, "media", "El disparo del diferencial al conectar la máquina indica muy probablemente:", ["Una fuga de corriente a tierra en la máquina", "Una sobrecarga por exceso de aparatos", "Que la tensión de red es baja", "Que el contador está averiado"], "Conocimiento técnico."],
        [S2, "media", "¿Qué protege el diferencial?", ["A las personas frente a contactos indirectos", "Solo a los cables frente al calor", "A la factura frente a excesos de consumo", "Al contador de la compañía"], "ITC-BT-25."],
        [S2, "media", "La sensibilidad máxima exigida a los diferenciales de una vivienda es de:", ["30 mA", "300 mA", "3 A", "30 A"], "ITC-BT-25."],
        [S4, "media", "Si un trabajador toca la carcasa metálica de la máquina con la fuga, sufre un contacto:", ["Indirecto", "Directo", "Por inducción", "Estático"], "Conocimiento técnico."],
        [S4, "dificil", "¿Por qué no se debe puentear el diferencial?", ["Porque se elimina la protección frente a contactos indirectos y una fuga podría electrocutar a alguien", "Porque se fundiría el contador", "Porque baja la potencia", "Porque solo lo puede hacer la compañía"], "Conocimiento técnico."],
        [S2, "media", "Para que la fuga derive a tierra y actúe el diferencial, la máquina debe estar conectada a:", ["La puesta a tierra mediante el conductor verde-amarillo", "El neutro", "Una fase", "Un pulsador"], "ITC-BT-19 y conocimiento técnico."],
        [S4, "media", "¿Con qué aparato puede comprobarse el aislamiento o la continuidad del cable de la máquina?", ["Con el polímetro (o un medidor de aislamiento)", "Con una pinza de presión", "Con un cortatubos", "Con un nivel láser"], "Conocimiento técnico."],
        [S3, "media", "La manguera de la máquina tiene la cubierta cortada. Es un cable:", ["Multipolar, con varios conductores bajo cubierta común", "Unipolar", "De aluminio desnudo", "Coaxial"], "Conocimiento técnico."],
        [S3, "media", "La base de enchufe del almacén debe ser:", ["Con toma de tierra (2p+T)", "Sin toma de tierra", "De dos polos sin protección", "Indiferente"], "ITC-BT-25."],
        [S4, "media", "Mientras se repara la máquina, lo correcto es:", ["Retirarla de uso y señalizarla como averiada", "Seguir usándola con guantes", "Conectarla a otro enchufe sin diferencial", "Mojarla para enfriarla"], "Conocimiento técnico y principios de prevención."],
      ],
    },
    {
      slug: "cambio-luminaria-pasillo",
      titulo: "El cambio de luminarias del pasillo",
      supuesto: "Te encargan sustituir los viejos tubos fluorescentes de un pasillo municipal por luminarias LED y añadir un segundo punto de encendido al final del pasillo, que hoy solo se enciende desde la entrada con un interruptor simple.",
      preguntas: [
        [S3, "media", "Para encender el pasillo desde la entrada y desde el final necesitas:", ["Sustituir el interruptor por dos conmutadores", "Añadir un segundo interruptor simple en paralelo", "Un cruzamiento solo", "Un diferencial"], "Conocimiento técnico."],
        [S3, "dificil", "Si más adelante se quiere añadir un tercer punto de encendido a mitad del pasillo, se instala:", ["Un cruzamiento entre los dos conmutadores", "Otro conmutador", "Un pulsador de timbre", "Un magnetotérmico"], "Conocimiento técnico."],
        [S2, "media", "El circuito de iluminación de una vivienda (C1) lleva un interruptor automático de:", ["10 A", "16 A", "25 A", "20 A"], "ITC-BT-25, tabla 1."],
        [S2, "media", "La sección mínima de los conductores de iluminación (C1) es:", ["1,5 mm²", "2,5 mm²", "4 mm²", "6 mm²"], "ITC-BT-25, tabla 1."],
        [S3, "media", "¿Qué ventaja tienen las luminarias LED frente a los tubos fluorescentes?", ["Menor consumo y mayor duración", "Necesitan cebador", "Consumen más pero iluminan menos", "Funcionan solo con corriente continua de red"], "Conocimiento técnico."],
        [S3, "media", "En un tubo fluorescente antiguo, el elemento que facilita el encendido y suele causar parpadeo cuando falla es:", ["El cebador", "El diferencial", "El borne", "El neutro"], "Conocimiento técnico."],
        [S4, "media", "Antes de desmontar las luminarias debes:", ["Desconectar el circuito, impedir la reconexión y verificar la ausencia de tensión", "Apagar solo el interruptor de pared", "Trabajar en tensión con guantes de jardinería", "Avisar al vigilante y empezar"], "Anexo II RD 614/2001."],
        [S4, "media", "Para trabajar en las conexiones usarás preferentemente:", ["Destornilladores y alicates con mango aislado", "Herramientas metálicas sin aislar", "Unas tijeras de oficina", "Un martillo"], "Conocimiento técnico."],
        [S3, "media", "Para retirar el aislamiento de los cables sin dañar el cobre se usa:", ["El pelacables", "El cortafríos", "La sierra de calar", "La lima"], "Conocimiento técnico."],
        [S1, "media", "Si se sustituyen 10 tubos de 36 W por 10 luminarias LED de 18 W, la potencia instalada pasa de:", ["360 W a 180 W", "36 W a 18 W", "3.600 W a 1.800 W", "360 W a 360 W"], "Cálculo: 10 × 36 = 360 W; 10 × 18 = 180 W."],
      ],
    },
  ],
});
