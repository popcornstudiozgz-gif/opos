/**
 * Crea tema-322 — Tema 27 de Bombero/a Conductor/a: "MMPP: normativa
 * SEVESO, principales empresas químicas de Zaragoza, empresas SEVESO;
 * clasificación, identificación y riesgos; documentación (fichas de
 * seguridad, fichas de intervención, cartas de porte); física y química de
 * las MMPP; EPI, niveles de protección y trajes del servicio; mitigación."
 *
 * Fuente: Tema 27 "MMPP" (V.2) de la Escuela de Bomberos del Ayuntamiento
 * de Zaragoza, leído íntegro. Normas que el documento cita y que se
 * recogen tal como las cita: Directiva 2012/18/UE (Seveso III), RD
 * 840/2015, RD 1196/2003, RD 387/1996 (directriz de transporte de MMPP),
 * ADR 2021, Reglamento CLP 1272/2008, RD 809/2021 (ITC EP-6), UNE-EN
 * 1089-3 y Reglamento (UE) 2016/425 de EPI. La tabla de establecimientos
 * SEVESO de Zaragoza se leyó con `pdftotext -table`; del nivel inferior
 * solo se recogen los nombres de las empresas, porque la correspondencia
 * empresa-sustancia no es inequívoca en el documento.
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-322-mercancias-peligrosas.mjs
 */
import { sembrarTema, BOMBERO } from "./lib/sembrar-tema.mjs";

const FUENTE = "https://www.zaragoza.es/cont/vistas/portal//bomberos/doc/Tema_27_MMPP_V2.pdf";
const S1 = "seveso-empresas-zaragoza";
const S2 = "documentacion-fichas-carta-porte";
const S3 = "identificacion-panel-naranja-etiquetas";
const S4 = "epi-niveles-trajes";
const S5 = "propiedades-mitigacion";

await sembrarTema({
  tema: {
    slug: "tema-322",
    titulo: "Mercancías peligrosas: normativa SEVESO, identificación, protección y mitigación",
    descripcion: "Normativa SEVESO y establecimientos de Zaragoza; planes PROCIRA y PROCIMER y tipos de accidente en el transporte; FISQ, FDS, fichas de intervención y carta de porte; identificación (colores de botellas, pictogramas CLP, panel naranja, placas-etiquetas, clases ADR); niveles de protección y tipos de trajes; propiedades físico-químicas y técnicas de mitigación.",
    contenido: "Sigue el Tema 27 de la Escuela de Bomberos: qué es la normativa Seveso y qué industrias de Zaragoza están afectadas, qué documentos informan sobre una mercancía peligrosa, cómo se identifica a distancia por el panel naranja, las etiquetas y los colores de las botellas, qué nivel de protección y qué traje corresponde a cada riesgo, cómo interpretar presión de vapor, densidad, solubilidad o pH, y qué técnicas permiten controlar un derrame o una fuga.",
    enlaces_boe: [{ url: FUENTE, titulo: "Escuela de Bomberos de Zaragoza — Tema 27: Mercancías peligrosas (V.2)" }],
    indice_estudio: [
      { seccion: S1, titulo: "Normativa SEVESO y empresas de Zaragoza", articulos: "Tema 27, normativa SEVESO", url: FUENTE },
      { seccion: S2, titulo: "Documentación: fichas y carta de porte", articulos: "Tema 27, documentación", url: FUENTE },
      { seccion: S3, titulo: "Identificación: panel naranja, etiquetas y clases ADR", articulos: "Tema 27, identificación y clasificación", url: FUENTE },
      { seccion: S4, titulo: "EPI, niveles de protección y trajes", articulos: "Tema 27, equipos de protección", url: FUENTE },
      { seccion: S5, titulo: "Propiedades físico-químicas y mitigación", articulos: "Tema 27, física y química y acciones de mitigación", url: FUENTE },
    ],
  },
  vinculo: { oposicion: BOMBERO.oposicion, bloqueId: BOMBERO.bloqueParteII, numero: 27 },
  secciones: [
    {
      seccion: S1,
      flashcards: [
        ["¿De dónde viene el nombre de la normativa SEVESO?", "De la localidad italiana de Seveso (Lombardía), donde en 1976 un accidente en una planta química liberó grandes cantidades de dioxina TCDD"],
        ["¿Qué directiva europea es Seveso III y qué real decreto la incorpora en España?", "La Directiva 2012/18/UE, incorporada por el Real Decreto 840/2015"],
        ["¿Qué diferencia los establecimientos de nivel superior e inferior?", "La cantidad de sustancias peligrosas presentes; solo los de nivel superior están obligados a tener plan de emergencia exterior, aunque todos deben informar de sus sustancias y riesgos"],
        ["Cita establecimientos SEVESO de nivel superior en el municipio de Zaragoza según el Tema 27", "Cepsa Comercial Petróleo (GLP), Exolum (combustibles, ctra. de Monzalbarba), Unión Derivan (sulfato de dimetilo), Pikolín (TDI, en PLAZA) y Productos QP (ácido tricloroisocianúrico e hipocloritos, ctra. de Logroño, Utebo); Kuehne + Nagel en tramitación"],
        ["¿Qué son PROCIRA y PROCIMER?", "Planes especiales de protección civil de Aragón ante riesgos radiológicos (PROCIRA) y ante accidentes en el transporte de mercancías peligrosas por carretera y ferrocarril (PROCIMER)"],
        ["¿En cuántos tipos clasifica el RD 387/1996 los accidentes de transporte de MMPP?", "En 5: tipo 1, avería sin daño al continente; tipo 2, continente dañado o vuelco sin fuga; tipo 3, fuga o derrame; tipo 4, fugas con llamas; tipo 5, explosión que destruye el continente"],
      ],
      preguntas: [
        ["facil", "¿En qué año ocurrió el accidente de Seveso?", ["1976", "1984", "2012"], "Tema 27."],
        ["media", "¿Qué real decreto incorpora la Directiva Seveso III?", ["RD 840/2015", "RD 1196/2003", "RD 387/1996"], "Tema 27."],
        ["media", "¿Qué establecimientos SEVESO deben tener plan de emergencia exterior?", ["Solo los de nivel superior", "Todos", "Solo los de nivel inferior"], "Tema 27."],
        ["media", "Según el RD 387/1996, un accidente con fuga o derrame del contenido es de tipo:", ["3", "1", "5"], "Tema 27."],
        ["dificil", "¿Qué sustancia peligrosa asocia el Tema 27 a Pikolín?", ["Diisocianato de tolueno (TDI)", "GLP", "Sulfato de dimetilo"], "Tema 27, tabla de nivel superior."],
      ],
    },
    {
      seccion: S2,
      flashcards: [
        ["¿Qué son las FISQ?", "Las Fichas Internacionales de Seguridad Química, versión española de las ICSC, con 11 bloques de información; no tienen validez legal"],
        ["¿Qué es la Ficha de Datos de Seguridad (FDS)?", "La ficha obligatoria que facilita gratuitamente el proveedor, con 16 epígrafes sobre peligrosidad, primeros auxilios, lucha contra incendios, propiedades, transporte…"],
        ["¿Qué fichas de intervención cita el Tema 27?", "Las del Ministerio del Interior (BOE), las del Gobierno Vasco, la Guía GRE (CANUTEC, revisada cada 4 años) y las fichas ERIC de CEFIC"],
        ["¿Para qué casos están pensadas las fichas ERIC?", "Para accidentes de transporte terrestre con gran cantidad de producto químico; se aplican a grupos de productos y no sustituyen la información específica"],
        ["¿Qué datos debe recoger la carta de porte de un transporte ADR?", "Número ONU precedido de «UN», designación oficial, etiquetas, grupo de embalaje (GE), número y descripción de bultos, cantidad total, expedidor y destinatario"],
      ],
      preguntas: [
        ["facil", "¿Quién debe facilitar la Ficha de Datos de Seguridad?", ["El proveedor de la sustancia", "Los bomberos", "El Ministerio del Interior"], "Tema 27."],
        ["media", "¿Cada cuánto se revisa la Guía GRE?", ["Cada 4 años", "Cada año", "Nunca"], "Tema 27."],
        ["media", "¿Tienen validez legal las FISQ?", ["No, reflejan la opinión de un comité de expertos", "Sí, son obligatorias", "Solo en Aragón"], "Tema 27."],
        ["media", "¿Con qué letras va precedido el número ONU en la carta de porte?", ["«UN»", "«ONU»", "«ADR»"], "Tema 27."],
        ["dificil", "¿Qué organismo elaboró la Guía GRE?", ["CANUTEC, el Centro de Emergencia de Transporte Canadiense", "La OMS", "CEFIC"], "Tema 27."],
      ],
    },
    {
      seccion: S3,
      flashcards: [
        ["¿Qué contiene el panel naranja y qué medidas tiene?", "Arriba el número de identificación de peligro (2-3 cifras, a veces con X) y abajo el número ONU (4 cifras), en cifras negras; 40 x 30 cm, retrorreflectante"],
        ["¿Qué indica la X delante del número de peligro?", "Que la materia reacciona peligrosamente con el agua: el agua solo puede usarse con aprobación de expertos"],
        ["¿Qué indica cada cifra del número de peligro?", "2 gas; 3 líquido inflamable; 4 sólido inflamable; 5 comburente; 6 tóxico o infeccioso; 7 radiactivo; 8 corrosivo; 9 reacción violenta espontánea; duplicar la cifra intensifica el peligro"],
        ["¿Qué significan los números de peligro 33, 23 y 80?", "33: líquido muy inflamable (inflamación < 23 ºC); 23: gas inflamable; 80: materia corrosiva"],
        ["¿En cuántas clases divide el ADR las mercancías peligrosas?", "En 13 clases"],
        ["¿Qué diferencia una etiqueta de una placa-etiqueta ADR?", "Solo el tamaño: la etiqueta mide al menos 100 x 100 mm (va en bultos) y la placa-etiqueta 250 x 250 mm (va en vehículos y contenedores)"],
        ["¿De qué color es el cuerpo de las botellas de gas de uso médico?", "Blanco; el color de identificación del peligro va en la ojiva (UNE-EN 1089-3)"],
      ],
      preguntas: [
        ["facil", "¿Qué número va en la parte inferior del panel naranja?", ["El número ONU", "El número de peligro", "La clase ADR"], "Tema 27."],
        ["media", "Un panel naranja con «X423» indica una materia que:", ["Reacciona peligrosamente con el agua desprendiendo gases inflamables", "Es radiactiva", "Es un gas tóxico"], "Tema 27."],
        ["media", "¿Qué indica la cifra 2 como primera cifra del número de peligro?", ["Emanación de gases por presión o reacción química", "Materia corrosiva", "Materia radiactiva"], "Tema 27."],
        ["media", "¿Qué indicaciones de peligro del CLP corresponden a peligros para la salud?", ["H300-H399", "H200-H299", "H400-H499"], "Tema 27."],
        ["dificil", "¿Cuál es la división más peligrosa de la clase 1 (explosivos)?", ["La 1.1, peligro de explosión en masa", "La 1.4", "La 1.6"], "Orden: 1.1, 1.5, 1.2, 1.3, 1.6, 1.4."],
        ["media", "¿Qué lleva un vehículo caja que transporta bultos de MMPP?", ["Panel naranja delante y detrás sin numerar", "Panel numerado en cada lateral", "Nada"], "Tema 27."],
      ],
    },
    {
      seccion: S4,
      flashcards: [
        ["¿Qué son los niveles de protección I, II y III de los bomberos?", "Una clasificación propia de los servicios (no normativa): I, traje de intervención con ERA; II, traje antisalpicaduras; III, traje estanco de tipo 1"],
        ["¿Qué limitación tiene el traje de nivel II?", "Protege bien de líquidos pero no del fuego: se funde a 90-100 ºC; es de uso limitado"],
        ["¿Qué es el nivel II aligerado?", "El traje antisalpicaduras sobre ropa ligera de parque, solo sin riesgo de inflamabilidad; se usa en descontaminación"],
        ["¿Qué trajes de nivel III usan los bomberos?", "Trajes estancos tipo 1a-ET (ERA en el interior) y 1b-ET (ERA en el exterior), según la UNE-EN 943-2"],
        ["¿Qué protegen los trajes de tipo 3, 4, 5 y 6?", "Tipo 3, líquidos a chorro; 4, líquidos pulverizados; 5, partículas sólidas (p. ej. amianto); 6, salpicaduras ligeras"],
        ["¿Qué tipos de trajes térmicos aluminizados existen?", "De acercamiento (más de 100 ºC), de aproximación (más de 250 ºC, aeronaves y petroquímicas) y de penetración (envuelto en llamas); bomberos usan aproximación y penetración (UNE-EN 1486)"],
      ],
      preguntas: [
        ["facil", "¿Qué nivel de protección corresponde al traje estanco de tipo 1?", ["Nivel III", "Nivel I", "Nivel II"], "Tema 27."],
        ["media", "¿A qué temperatura se funde un traje antisalpicaduras de nivel II?", ["Entre 90 y 100 ºC", "A 500 ºC", "A 30 ºC"], "Tema 27."],
        ["media", "¿Qué tipo de traje se recomienda frente a fibras de amianto?", ["Tipo 5", "Tipo 1a", "Tipo 3"], "Tema 27."],
        ["media", "¿Qué se lleva debajo de un traje de nivel III?", ["Solo ropa ligera de parque", "El traje de nivel I", "El traje de nivel II"], "Tema 27."],
        ["dificil", "¿Qué reglamento europeo clasifica los EPI en tres categorías?", ["Reglamento (UE) 2016/425", "Reglamento CLP 1272/2008", "Directiva 2012/18/UE"], "Tema 27."],
      ],
    },
    {
      seccion: S5,
      flashcards: [
        ["¿Qué indica la presión de vapor de una sustancia?", "Su volatilidad: a más presión de vapor, más se evapora y menor es la altura de aspiración posible; aumenta con la temperatura"],
        ["¿Por qué importa la densidad relativa de un gas?", "Si es mayor que 1 es más pesado que el aire y en interiores se acumula en zonas bajas; si es menor, tiende a subir"],
        ["¿Por qué es eficaz abatir una nube de amoniaco y no una de cloro?", "Porque el amoniaco es muy soluble en agua y el cloro poco soluble; al cloro se le puede desviar con conos de agua pulverizada"],
        ["¿Qué es la sepiolita?", "Un mineral poroso e incombustible que absorbe hasta 3 veces su peso (ácidos, hidrocarburos, aceites); el absorbente contaminado pasa a ser MMPP"],
        ["¿Qué hacer con una botella de acetileno afectada por las llamas?", "Refrigerarla durante horas hasta que se enfríe y después sumergirla 24 horas"],
        ["¿Qué es la combustión controlada?", "Dejar arder una fuga ya inflamada (p. ej. de gas natural) si no se está seguro de poder cortarla, o si extinguir generaría mucha agua contaminada"],
      ],
      preguntas: [
        ["facil", "¿Qué pH tiene una sustancia neutra?", ["7", "0", "14"], "Tema 27."],
        ["media", "¿Qué técnica de mitigación consiste en introducir el recipiente dañado en otro mayor y hermético?", ["Sobre-empaquetamiento", "Venteo", "Relicuación"], "Tema 27."],
        ["media", "¿Por qué no deben usarse cuñas metálicas para taponar grietas en depósitos metálicos?", ["Porque pueden producir chispas", "Porque son caras", "Porque se oxidan"], "Tema 27."],
        ["media", "¿Qué valor TLV representa la exposición media de 15 minutos que no debe superarse?", ["TLV-STEL", "TLV-TWA", "TLV-C"], "Tema 27."],
        ["dificil", "¿Para qué gas está indicada la relicuación según el Tema 27?", ["El amoniaco", "El propano", "El metano"], "No aconsejada para gases inflamables."],
        ["media", "¿Qué hay que comprobar antes de diluir con agua un derrame?", ["Que la sustancia no reaccione con el agua", "Que llueva", "Que sea de noche"], "Tema 27."],
      ],
    },
  ],
  glosario: [
    [S1, "Establecimiento SEVESO", "Instalación industrial con sustancias peligrosas por encima de los umbrales del RD 840/2015, de nivel superior o inferior."],
    [S2, "Carta de porte", "Documento que acompaña todo transporte ADR con el número ONU, designación, etiquetas, cantidades, expedidor y destinatario."],
    [S3, "Número de identificación de peligro", "Cifras de la parte superior del panel naranja que indican los peligros de la materia; la X indica reacción peligrosa con el agua."],
    [S3, "Número ONU", "Número de cuatro cifras que identifica la materia peligrosa; va en la parte inferior del panel naranja."],
    [S4, "Traje 1a-ET", "Traje de protección química estanco, con el equipo de respiración en el interior, destinado a equipos de emergencia."],
    [S5, "Abatimiento", "Técnica que usa agua pulverizada para disolver o desviar una nube de gas soluble."],
  ],
  casos: [
    {
      slug: "caso-cisterna-volcada-autovia",
      titulo: "Una cisterna volcada en la autovía",
      supuesto: "Una cisterna ha volcado en la autovía de Huesca. Desde la distancia se ve un panel naranja «33 / 1203» y hay un charco que crece junto al depósito.",
      preguntas: [
        [S3, "facil", "¿Qué indica el número 33 del panel?", ["Líquido muy inflamable, con punto de inflamación inferior a 23 ºC", "Gas tóxico", "Materia corrosiva"], "Tema 27."],
        [S3, "media", "¿Qué es el número 1203?", ["El número ONU de la materia", "El número de peligro", "La matrícula"], "Tema 27."],
        [S3, "media", "¿Desde dónde conviene identificar la materia?", ["A distancia, con prismáticos si es necesario", "Tocando el depósito", "Desde el charco"], "Tema 27."],
        [S1, "media", "Con fuga del contenido, ¿qué tipo de accidente es según el RD 387/1996?", ["Tipo 3", "Tipo 1", "Tipo 5"], "Tema 27."],
        [S2, "media", "¿Qué documento puede pedirse al conductor para conocer la carga?", ["La carta de porte", "El permiso de circulación", "La póliza del seguro"], "Tema 27."],
        [S5, "media", "¿Qué técnica impide que el producto llegue a una alcantarilla?", ["Retención o contención con diques", "Venteo", "Relicuación"], "Tema 27."],
        [S5, "media", "¿Con qué se reduce la emisión de vapores del charco de un líquido no soluble?", ["Cubrimiento con espuma normal", "Agua a chorro", "CO2"], "Tema 27."],
        [S5, "dificil", "¿Qué precaución hay que tener al cubrir con lonas un líquido inflamable?", ["Que sean antiestáticas, para no ser fuente de ignición", "Que sean blancas", "Ninguna"], "Tema 27."],
        [S4, "media", "Para manejar ese líquido inflamable por poco tiempo, ¿qué protección recomienda el Tema 27?", ["Traje de nivel I debajo del de nivel II", "Solo el nivel II aligerado", "Ropa de parque"], "Tema 27."],
        [S5, "media", "Los vapores de la gasolina, ¿dónde se quedarán?", ["A ras de suelo, por ser más densos que el aire", "En lo alto", "Se disuelven en el aire al instante"], "Tema 27."],
      ],
    },
    {
      slug: "caso-fuga-amoniaco-nave",
      titulo: "Fuga de amoniaco en una nave frigorífica",
      supuesto: "En una nave frigorífica de un polígono hay una fuga de amoniaco en un recinto cerrado. Los trabajadores han salido y huele intensamente.",
      preguntas: [
        [S4, "facil", "¿Qué nivel de protección corresponde para entrar ante un gas tóxico y corrosivo?", ["Nivel III, traje estanco", "Nivel I sin ERA", "Ropa de parque"], "Tema 27."],
        [S5, "media", "¿Es más o menos denso el amoniaco gaseoso que el aire?", ["Menos denso (densidad relativa 0,6)", "Más denso", "Igual"], "Tema 27."],
        [S5, "media", "¿Por qué es eficaz abatirlo con agua pulverizada?", ["Por su alta solubilidad en agua", "Porque es inflamable", "Porque es un líquido"], "Tema 27."],
        [S5, "media", "¿Qué hay que contener después del abatimiento?", ["El agua usada, que queda contaminada", "Nada", "El aire"], "Tema 27."],
        [S5, "media", "¿Qué hay que comprobar antes de actuar en el recinto?", ["Que la concentración no está en el rango de inflamabilidad", "La hora", "El color del gas"], "Tema 27."],
        [S5, "dificil", "Si la ventilación es complicada, ¿qué agente puede proyectarse para formar sales de amonio?", ["CO2", "Agua a chorro", "Espuma AFFF"], "Tema 27, neutralización."],
        [S4, "media", "¿Qué protección extra exige el amoniaco cerca de la fuga de gas licuado?", ["Fundas criogénicas sobre el traje", "Traje aluminizado", "Nada"], "Tema 27."],
        [S5, "media", "¿Qué técnica de mitigación sí está indicada para el amoniaco por no ser inflamable?", ["La relicuación", "La combustión controlada", "La inertización con oxígeno"], "Tema 27."],
        [S5, "media", "¿Afecta el amoniaco sobre todo a vías altas o a nivel pulmonar?", ["A las vías respiratorias altas, por ser muy soluble", "A nivel pulmonar", "A la piel solo"], "Tema 27."],
        [S2, "media", "¿Qué ficha consultar para conocer las medidas de intervención?", ["Una ficha de intervención (Ministerio del Interior, Gobierno Vasco, GRE o ERIC)", "El libro de familia", "Ninguna"], "Tema 27."],
      ],
    },
    {
      slug: "caso-incendio-almacen-botellas-gas",
      titulo: "Incendio en un almacén de botellas de gas",
      supuesto: "Arde un almacén con botellas de gases industriales. Entre ellas hay botellas de acetileno y otras con el cuerpo blanco.",
      preguntas: [
        [S3, "facil", "¿Para qué sirve el color de la ojiva de las botellas?", ["Para identificar a distancia el peligro del gas", "Por estética", "Para indicar el fabricante"], "Tema 27."],
        [S3, "media", "¿Qué indica un cuerpo de botella blanco?", ["Gas de uso médico", "Gas inflamable", "Gas tóxico"], "UNE-EN 1089-3."],
        [S3, "media", "¿Qué norma regula el código de colores de las botellas?", ["UNE-EN 1089-3", "UNE-EN 943-2", "UNE 23091"], "Tema 27."],
        [S5, "media", "¿Qué debe hacerse con las botellas expuestas al calor?", ["Refrigerarlas con abundante agua", "Abrirlas", "Dejarlas arder"], "Tema 27."],
        [S5, "dificil", "¿Cuánto tiempo debe sumergirse una botella de acetileno afectada por el fuego, una vez fría?", ["24 horas", "10 minutos", "1 semana"], "Tema 27."],
        [S5, "media", "¿Qué fenómeno se previene refrigerando los recipientes?", ["La BLEVE o explosión por aumento de presión", "El flashover", "La congelación"], "Tema 27."],
        [S3, "media", "¿Qué capacidad máxima tiene una «botella» según la ITC EP-6?", ["150 litros", "1.000 litros", "3.000 litros"], "Tema 27."],
        [S1, "media", "¿Qué normativa regula la prevención de accidentes graves en los establecimientos con sustancias peligrosas?", ["El RD 840/2015 (Seveso III)", "El RD 836/2012", "El RD 1428/2003"], "Tema 27."],
        [S5, "media", "Si hubiera una fuga de gas natural ya ardiendo y no fuera seguro cortarla, ¿qué técnica cabe?", ["Combustión controlada", "Extinguir y ventilar", "Taponar con cuña metálica"], "Tema 27."],
        [S4, "media", "Para acercarse a radiación térmica muy intensa, ¿qué traje se usa?", ["Traje aluminizado de aproximación", "Traje tipo 5", "Nivel II aligerado"], "Tema 27."],
      ],
    },
  ],
});
