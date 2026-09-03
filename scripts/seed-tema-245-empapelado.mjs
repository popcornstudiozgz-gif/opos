/**
 * Crea tema-245: "Empapelado" — Tema 17 (numero=17, bloque-2) de
 * Oficial Pintor, Especialidad General (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 15 oficial del Anexo I (bases2110.pdf, línea
 * 1474): "Empapelado. Materiales. Herramientas. Cálculos. Técnicas de
 * Aplicación."
 *
 * Conocimiento técnico consolidado del oficio (técnica de empapelado
 * sin regulación legal propia), sin ley española única que lo regule
 * — búsqueda previa realizada conforme al estándar de sourcing del
 * proyecto: no existe normativa específica distinta de la ya
 * introducida en temas anteriores sobre productos químicos (colas y
 * adhesivos, Reglamento CLP).
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-245-empapelado.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-245";
const OPOSICION = "oficial-pintor-general-ayto-zaragoza";
const BLOQUE_2_ID = "77506e2f-f4c6-4512-8bf8-99d0b3bbbafd";

const REGLAMENTO_CLP = "https://www.boe.es/buscar/doc.php?id=DOUE-L-2008-82637";

async function insertar(tabla, filas) {
  const res = await fetch(`${URL_BASE}/rest/v1/${tabla}`, { method: "POST", headers: { ...HEADERS, Prefer: "return=representation" }, body: JSON.stringify(filas) });
  if (!res.ok) { console.error(`❌ Error en ${tabla}: ${res.status} ${await res.text()}`); process.exit(1); }
  return res.json();
}
async function upsert(tabla, filas, onConflict) {
  const res = await fetch(`${URL_BASE}/rest/v1/${tabla}?on_conflict=${onConflict}`, { method: "POST", headers: { ...HEADERS, Prefer: "resolution=merge-duplicates,return=representation" }, body: JSON.stringify(filas) });
  if (!res.ok) { console.error(`❌ Error en ${tabla}: ${res.status} ${await res.text()}`); process.exit(1); }
  return res.json();
}
async function insertarPreguntasConOpciones(seccion, preguntas) {
  const filas = preguntas.map(({ opciones, correcta, ...p }) => ({ ...p, tema_slug: TEMA, seccion }));
  const insertadas = await insertar("preguntas", filas);
  console.log(`   ✓ preguntas: ${insertadas.length} filas`);
  const filasOpciones = insertadas.flatMap((pregunta, i) => preguntas[i].opciones.map((texto, orden) => ({ pregunta_id: pregunta.id, texto, es_correcta: orden === preguntas[i].correcta, orden })));
  const opcionesInsertadas = await insertar("opciones", filasOpciones);
  console.log(`   ✓ opciones: ${opcionesInsertadas.length} filas`);
}

console.log(`📚 Creando ${TEMA}...`);
await insertar("temas", [{
  slug: TEMA,
  titulo: "Empapelado",
  descripcion: "Tipos de papel pintado y materiales para su colocación. Herramientas específicas del empapelado. Cálculo de la cantidad de papel necesaria. Técnicas de aplicación.",
  contenido: "Desarrolla el empapelado como técnica de revestimiento de paramentos: los tipos de papel pintado (vinílico, de fibra de vidrio, tejido no tejido) y los materiales complementarios (cola, imprimación específica); las herramientas propias del empapelador (rasqueta, espátula de encolar, brocha de alisar, cúter); el cálculo de la cantidad de rollos necesaria según la superficie a cubrir y el tamaño del raport del dibujo; y las técnicas de aplicación, desde la preparación del paramento hasta el corte y el alisado final del papel.",
  enlaces_boe: [
    { url: REGLAMENTO_CLP, titulo: "Reglamento (CE) 1272/2008 (CLP) — clasificación, etiquetado y envasado" },
  ],
  indice_estudio: [
    { url: "", titulo: "Tipos de papel pintado y materiales para su colocación", seccion: "tipos-papel-pintado-materiales", articulos: "Conocimiento técnico del oficio" },
    { url: "", titulo: "Herramientas del empapelado y cálculo de la cantidad necesaria", seccion: "herramientas-empapelado-calculo-cantidad", articulos: "Conocimiento técnico del oficio" },
    { url: REGLAMENTO_CLP, titulo: "Técnicas de aplicación del papel pintado", seccion: "tecnicas-aplicacion-papel-pintado", articulos: "Reglamento CLP" },
  ],
}]);

const S1 = "tipos-papel-pintado-materiales";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es un papel pintado vinílico?", reverso: "Un papel pintado cuya superficie decorativa está formada por una capa de PVC (vinilo) sobre un soporte de papel, que ofrece una elevada resistencia a la humedad, a la limpieza y al desgaste, siendo especialmente adecuado para zonas de mayor tránsito o humedad" },
  { anverso: "¿Qué es un papel pintado de fibra de vidrio?", reverso: "Un revestimiento tejido a partir de hilos de fibra de vidrio, de elevada resistencia mecánica, transpirable y habitualmente destinado a pintarse posteriormente, empleado para reforzar y uniformizar superficies con pequeñas fisuras o irregularidades antes de decorarlas" },
  { anverso: "¿Qué es un papel pintado tejido no tejido (TNT)?", reverso: "Un papel pintado fabricado con fibras textiles y celulósicas no tejidas, dimensionalmente estable (no se encoge ni se hincha con la humedad de la cola), que se aplica encolando directamente la pared en lugar del propio papel, facilitando su colocación y un futuro retirado en seco" },
  { anverso: "¿Qué es la cola de empapelar?", reverso: "El adhesivo específico empleado para fijar el papel pintado a la pared, formulado según el tipo de papel (más o menos diluida, con mayor o menor tiempo abierto de trabajo), que puede presentarse en polvo para diluir en agua o ya preparada en pasta" },
  { anverso: "¿Por qué puede resultar necesaria una imprimación específica sobre la pared antes de aplicar el papel pintado, además de la propia limpieza de la superficie?", reverso: "Porque una imprimación selladora (o \"fondo para empapelar\") reduce y uniformiza la absorción del paramento, mejora el deslizamiento del papel durante su colocación y facilita un futuro retirado del papel sin dañar el yeso o el mortero de la pared" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué es un papel pintado vinílico?", explicacion: "Un papel con capa de PVC de elevada resistencia a la humedad, limpieza y desgaste.", dificultad: "facil", opciones: ["Un papel con capa de PVC resistente a humedad y desgaste", "Un papel exclusivo para pintar posteriormente, sin decoración propia", "Un adhesivo específico para fijar el papel a la pared", "Una herramienta específica para alisar el papel colocado"], correcta: 0 },
  { enunciado: "¿Qué es un papel pintado de fibra de vidrio?", explicacion: "Un revestimiento tejido de fibra de vidrio, resistente y destinado a pintarse posteriormente.", dificultad: "media", opciones: ["Un revestimiento tejido de fibra de vidrio para pintar después", "Un papel exclusivo de zonas de baño con acabado vinílico", "Un adhesivo específico de mayor tiempo abierto de trabajo", "Una herramienta para el corte del papel colocado"], correcta: 0 },
  { enunciado: "¿Qué caracteriza a un papel pintado tejido no tejido (TNT)?", explicacion: "Es dimensionalmente estable y se aplica encolando la pared, no el propio papel.", dificultad: "dificil", opciones: ["Es estable y se aplica encolando la pared, no el papel", "Se aplica siempre encolando directamente el propio papel", "Carece por completo de cualquier resistencia mecánica", "Solo puede emplearse en superficies exteriores"], correcta: 0 },
  { enunciado: "¿Qué es la cola de empapelar?", explicacion: "El adhesivo específico para fijar el papel pintado a la pared.", dificultad: "media", opciones: ["El adhesivo específico para fijar el papel a la pared", "Un tipo de papel pintado de fibra de vidrio", "Una herramienta para alisar el papel colocado", "Un tipo de imprimación antioxidante para metal"], correcta: 0 },
  { enunciado: "¿Por qué puede resultar necesaria una imprimación específica antes de empapelar una pared?", explicacion: "Uniformiza la absorción, mejora el deslizamiento y facilita un futuro retirado sin dañar la pared.", dificultad: "dificil", opciones: ["Uniformiza la absorción y facilita un futuro retirado del papel", "Una imprimación nunca resulta necesaria antes de empapelar", "Solo resulta necesaria si el papel es de fibra de vidrio", "Solo resulta necesaria en paredes de superficie metálica"], correcta: 0 },
]);

const S2 = "herramientas-empapelado-calculo-cantidad";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es una rasqueta de empapelador?", reverso: "Una herramienta de hoja ancha y flexible empleada para eliminar papel pintado antiguo de una pared, o para alisar y eliminar burbujas de aire durante la colocación de un nuevo papel, presionando y desplazando el aire hacia los bordes" },
  { anverso: "¿Qué es una brocha de alisar (o brocha de empapelador)?", reverso: "Una brocha de cerdas suaves y anchas, empleada para presionar suavemente el papel recién colocado contra la pared, eliminando pliegues y burbujas de aire sin dañar la superficie decorativa del papel" },
  { anverso: "¿Qué es el raport (o rapport), en relación con un papel pintado con dibujo repetitivo?", reverso: "La distancia a la que se repite el motivo decorativo del papel, que debe tenerse en cuenta al colocar tiras contiguas para que el dibujo case correctamente entre ellas, y que influye directamente en la cantidad de papel necesaria por el material sobrante en cada corte" },
  { anverso: "¿Cómo influye un raport grande (por ejemplo, de 64 cm) en la cantidad de papel pintado necesaria, respecto a un papel sin dibujo repetitivo (raport cero)?", reverso: "Un raport grande obliga a desperdiciar una parte de cada tira para casar correctamente el dibujo con la tira contigua, por lo que se necesita una cantidad de rollos mayor que la que resultaría de calcular la superficie sin considerar ese margen de ajuste" },
  { anverso: "¿Qué debe tenerse en cuenta, además de la superficie total de la pared, al calcular el número de rollos de papel pintado necesarios para una habitación?", reverso: "La altura de la pared en relación con el rendimiento de cada rollo (número de tiras completas que pueden cortarse de un rollo según esa altura), el raport del dibujo si lo hubiera, y un margen adicional para cubrir mermas, recortes en esquinas y posibles errores de colocación" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué es una rasqueta de empapelador?", explicacion: "Una herramienta de hoja ancha para eliminar papel antiguo o alisar y eliminar burbujas del nuevo.", dificultad: "facil", opciones: ["Una herramienta para retirar papel antiguo o alisar el nuevo", "Un adhesivo específico para fijar el papel pintado", "Un tipo de papel pintado de fibra de vidrio", "Una brocha de cerdas suaves para pintura decorativa"], correcta: 0 },
  { enunciado: "¿Qué es una brocha de alisar en el empapelado?", explicacion: "Una brocha de cerdas suaves para presionar el papel y eliminar pliegues y burbujas.", dificultad: "media", opciones: ["Una brocha de cerdas suaves para eliminar pliegues y burbujas", "Una herramienta de corte del papel sobrante", "Un adhesivo específico para papeles TNT", "Una herramienta para retirar papel antiguo"], correcta: 0 },
  { enunciado: "¿Qué es el raport de un papel pintado con dibujo repetitivo?", explicacion: "La distancia a la que se repite el motivo decorativo del papel.", dificultad: "media", opciones: ["La distancia a la que se repite el motivo decorativo", "El precio por rollo de un papel pintado concreto", "La resistencia mecánica del papel pintado", "El tiempo de secado de la cola de empapelar"], correcta: 0 },
  { enunciado: "¿Cómo influye un raport grande en la cantidad de papel necesaria?", explicacion: "Obliga a desperdiciar parte de cada tira para casar el dibujo, aumentando la cantidad necesaria.", dificultad: "dificil", opciones: ["Aumenta la cantidad necesaria por el desperdicio de ajuste", "Reduce siempre la cantidad de papel necesaria", "No influye en ningún caso en la cantidad necesaria", "Solo influye si el papel es de tipo vinílico"], correcta: 0 },
  { enunciado: "¿Qué debe tenerse en cuenta, además de la superficie total, al calcular el número de rollos necesarios?", explicacion: "El rendimiento de cada rollo según la altura, el raport y un margen para mermas.", dificultad: "media", opciones: ["El rendimiento por altura, el raport y un margen de mermas", "Únicamente el color del papel pintado elegido", "Únicamente la marca comercial del fabricante", "Ningún factor adicional distinto de la superficie total"], correcta: 0 },
]);

const S3 = "tecnicas-aplicacion-papel-pintado";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Cuál es la secuencia general para colocar una tira de papel pintado sobre una pared ya preparada?", reverso: "Medir y cortar la tira con el margen adicional necesario, aplicar la cola (al papel o a la pared, según el tipo), colocar la tira alineada verticalmente con ayuda de una plomada o nivel, alisar de arriba abajo eliminando burbujas de aire, y recortar el sobrante en los bordes superior e inferior" },
  { anverso: "¿Por qué es importante emplear una plomada o un nivel para colocar la primera tira de papel pintado de una pared?", reverso: "Porque las paredes reales rara vez son perfectamente verticales, y una primera tira mal alineada arrastraría el desvío al resto de tiras contiguas, siendo especialmente visible el desajuste acumulado al llegar a la última pared de la habitación" },
  { anverso: "¿Qué técnica se emplea para casar correctamente el dibujo entre dos tiras contiguas de un papel con raport?", reverso: "Colocar la segunda tira solapando ligeramente el borde de la primera, deslizándola hasta que el motivo decorativo coincida exactamente entre ambas, antes de presionar y fijar definitivamente la unión, cortando después el solape sobrante con una regla y un cúter" },
  { anverso: "¿Qué precaución debe adoptarse al empapelar una esquina interior o exterior de una habitación?", reverso: "Evitar doblar una única tira completa sobre la esquina (dado que las esquinas reales rara vez son perfectamente rectas), cortando la tira cerca de la esquina y solapando una segunda tira estrecha que cubra el resto, garantizando un acabado recto en la pared siguiente" },
  { anverso: "¿Qué debe hacerse con el exceso de cola que queda visible en la superficie del papel o en los bordes tras colocar una tira?", reverso: "Retirarlo de inmediato con una esponja húmeda limpia, antes de que la cola seque, dado que una vez seca resulta mucho más difícil de eliminar sin dañar o dejar marcas visibles sobre la superficie decorativa del papel" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Cuál es la secuencia general para colocar una tira de papel pintado?", explicacion: "Medir y cortar, encolar, colocar alineada, alisar y recortar el sobrante.", dificultad: "media", opciones: ["Medir, cortar, encolar, colocar alineada, alisar y recortar", "Colocar directamente sin ninguna medición ni corte previo", "Alisar la pared antes de aplicar cualquier cola o papel", "Recortar el sobrante antes de colocar la tira en la pared"], correcta: 0 },
  { enunciado: "¿Por qué es importante usar una plomada o nivel para la primera tira de papel pintado?", explicacion: "Las paredes reales rara vez son perfectamente verticales, y un desvío se arrastraría al resto.", dificultad: "media", opciones: ["Las paredes no suelen ser perfectamente verticales", "Las paredes siempre son perfectamente verticales por construcción", "La plomada solo resulta útil en papeles sin dibujo repetitivo", "El nivel solo resulta útil para papeles de fibra de vidrio"], correcta: 0 },
  { enunciado: "¿Qué técnica se emplea para casar el dibujo entre dos tiras contiguas con raport?", explicacion: "Solapar ligeramente el borde y deslizar hasta que el motivo coincida, luego cortar el solape sobrante.", dificultad: "dificil", opciones: ["Solapar el borde y deslizar hasta que coincida el motivo", "Colocar ambas tiras sin ningún solape entre ellas", "Recortar previamente ambas tiras al mismo tamaño exacto", "No existe ninguna técnica específica para este ajuste"], correcta: 0 },
  { enunciado: "¿Qué precaución debe adoptarse al empapelar una esquina de una habitación?", explicacion: "Evitar doblar una única tira completa; cortar cerca de la esquina y solapar una tira estrecha.", dificultad: "dificil", opciones: ["Evitar doblar una única tira completa sobre la esquina", "Doblar siempre una única tira completa sobre cualquier esquina", "Ninguna precaución adicional distinta del resto de la pared", "Solo resulta relevante en esquinas exteriores, nunca interiores"], correcta: 0 },
  { enunciado: "¿Qué debe hacerse con el exceso de cola visible tras colocar una tira?", explicacion: "Retirarlo de inmediato con una esponja húmeda antes de que seque.", dificultad: "media", opciones: ["Retirarlo de inmediato con una esponja húmeda", "Dejarlo secar y retirarlo después con un cúter", "Ignorarlo si no resulta visible a simple vista", "Aplicar más cola encima para disimularlo"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 17 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 17, orden: 17, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-245 creado y vinculado como Tema 17 de Oficial Pintor General.");
