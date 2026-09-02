/**
 * Crea tema-194: "Otros elementos auxiliares de la red: hidrantes,
 * desagües, bocas de riego, ventosas, tomas de agua y válvulas de
 * seguridad" — Tema 14 (numero=14, bloque-2) de Oficial Guardallaves
 * (Ayto. Zaragoza).
 *
 * Corresponde al TEMA 12 oficial del Anexo I (bases2110.pdf, línea 921):
 *   "Otros elementos auxiliares de la red: Hidrantes, Desagües, Bocas de
 *   riego, Ventosas, Tomas de agua, Válvulas de seguridad."
 *
 * Fuente primaria verificada mediante búsqueda en esta sesión:
 * - UNE-EN 14339, "Hidrantes contra incendios bajo tierra" — hidrantes
 *   de arqueta, DN 80 y DN 100, con marcado CE conforme a esta norma.
 * - UNE-EN 1074-4, parte de la familia UNE-EN 1074 ya citada en
 *   tema-193, específica para ventosas y válvulas de vacío.
 * El resto de elementos (desagües, bocas de riego, tomas de agua) se
 * explican como conocimiento técnico consolidado del oficio de
 * guardallaves, sin una norma UNE-EN concreta verificada en esta sesión
 * para cada uno de ellos individualmente.
 *
 * Tres secciones:
 * 1. hidrantes-une-en-14339
 * 2. ventosas-une-en-1074-4-desagues
 * 3. bocas-riego-tomas-agua-valvulas-seguridad
 *
 * Uso: node --env-file=.env.local scripts/seed-tema-194-hidrantes-desagues-ventosas-elementos-auxiliares.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan variables de entorno."); process.exit(1); }
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const TEMA = "tema-194";
const OPOSICION = "oficial-guardallaves-ayto-zaragoza";
const BLOQUE_2_ID = "5bb8da57-00c3-4865-a0a1-651b70c85ba0";

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
  titulo: "Otros elementos auxiliares de la red: hidrantes, desagües, bocas de riego, ventosas, tomas de agua y válvulas de seguridad",
  descripcion: "Hidrantes bajo tierra (UNE-EN 14339). Ventosas (UNE-EN 1074-4) y desagües de la red. Bocas de riego, tomas de agua y válvulas de seguridad.",
  contenido: "Desarrolla los elementos auxiliares de la red de abastecimiento distintos de las conducciones y las válvulas de aislamiento principales: los hidrantes bajo tierra normalizados por UNE-EN 14339, las ventosas normalizadas por UNE-EN 1074-4 y su función de evacuar o admitir aire en la conducción, los desagües para el vaciado de tramos, las bocas de riego para el uso municipal del agua en la vía pública, las tomas de agua y las válvulas de seguridad.",
  enlaces_boe: [],
  indice_estudio: [
    { url: "", titulo: "Hidrantes bajo tierra (UNE-EN 14339)", seccion: "hidrantes-une-en-14339", articulos: "UNE-EN 14339" },
    { url: "", titulo: "Ventosas (UNE-EN 1074-4) y desagües de la red", seccion: "ventosas-une-en-1074-4-desagues", articulos: "UNE-EN 1074, Parte 4; resto, conocimiento técnico del oficio" },
    { url: "", titulo: "Bocas de riego, tomas de agua y válvulas de seguridad", seccion: "bocas-riego-tomas-agua-valvulas-seguridad", articulos: "Conocimiento técnico del oficio de guardallaves" },
  ],
}]);

const S1 = "hidrantes-une-en-14339";
console.log(`📝 flashcards (${S1})...`);
await insertar("flashcards", [
  { anverso: "¿Qué son los hidrantes de la red de abastecimiento?", reverso: "Bocas de conexión instaladas en la red que permiten tomar agua a presión directamente de la conducción, principalmente para la extinción de incendios, aunque también para otros usos autorizados por el Ayuntamiento" },
  { anverso: "¿Qué norma regula los hidrantes contra incendios bajo tierra?", reverso: "La norma UNE-EN 14339, que especifica los requisitos mínimos, los métodos de ensayo y el marcado de estos hidrantes en sistemas de distribución de agua" },
  { anverso: "¿Qué es un hidrante de arqueta o hidrante bajo tierra?", reverso: "Un hidrante enterrado, protegido por una tapa a nivel del pavimento, cuya toma de agua se sitúa dentro de una arqueta accesible, a diferencia del hidrante de columna, que sobresale del suelo" },
  { anverso: "¿Con qué diámetros nominales (DN) se fabrican habitualmente los hidrantes bajo tierra según UNE-EN 14339?", reverso: "DN 80 y DN 100, adecuados para presiones de funcionamiento de 10, 16 o 25 bar" },
  { anverso: "¿Por qué es importante para un guardallaves conocer la ubicación y el estado de los hidrantes de su zona?", reverso: "Porque de su correcto funcionamiento y accesibilidad puede depender la rapidez de actuación de los bomberos en una emergencia, y porque su maniobra incorrecta o un cierre defectuoso puede dejarlos inoperativos cuando se necesiten" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S1 })));
console.log(`📝 preguntas de test (${S1})...`);
await insertarPreguntasConOpciones(S1, [
  { enunciado: "¿Qué son los hidrantes de la red de abastecimiento?", explicacion: "Bocas de conexión que permiten tomar agua a presión de la conducción, principalmente contra incendios.", dificultad: "facil", opciones: ["Bocas de conexión que permiten tomar agua a presión de la red", "Válvulas que regulan automáticamente la presión de la red", "Elementos que purgan el aire acumulado en los puntos altos", "Contadores que miden el consumo total de un sector de la red"], correcta: 0 },
  { enunciado: "¿Qué norma regula los hidrantes contra incendios bajo tierra?", explicacion: "La norma UNE-EN 14339.", dificultad: "media", opciones: ["La norma UNE-EN 14339", "La norma UNE-EN 1074", "La norma UNE-EN 545", "La norma UNE-EN 124"], correcta: 0 },
  { enunciado: "¿Qué diferencia a un hidrante de arqueta (bajo tierra) de un hidrante de columna?", explicacion: "El de arqueta está enterrado, protegido por una tapa; el de columna sobresale del suelo.", dificultad: "media", opciones: ["El de arqueta está enterrado; el de columna sobresale del suelo", "Ambos tipos son exactamente equivalentes en su instalación", "El de columna solo puede instalarse en interior de edificios", "El de arqueta no puede emplearse en ningún caso contra incendios"], correcta: 0 },
  { enunciado: "¿Con qué diámetros nominales se fabrican habitualmente los hidrantes bajo tierra según UNE-EN 14339?", explicacion: "DN 80 y DN 100.", dificultad: "dificil", opciones: ["DN 80 y DN 100", "DN 15 y DN 20", "DN 300 y DN 400", "DN 1.000 y DN 1.400"], correcta: 0 },
  { enunciado: "¿Por qué es importante que un guardallaves conozca el estado de los hidrantes de su zona?", explicacion: "Porque de su correcto funcionamiento puede depender la rapidez de actuación de los bomberos.", dificultad: "media", opciones: ["Porque de su funcionamiento puede depender la actuación de bomberos", "Porque no tiene ninguna relación con la seguridad de la ciudadanía", "Porque solo se revisan una vez cada diez años, según la normativa", "Porque su mantenimiento corresponde en exclusiva a otro organismo"], correcta: 0 },
]);

const S2 = "ventosas-une-en-1074-4-desagues";
console.log(`📝 flashcards (${S2})...`);
await insertar("flashcards", [
  { anverso: "¿Qué función cumple una ventosa en una conducción de agua?", reverso: "Purgar (expulsar) el aire que se acumula en los puntos altos del trazado durante el funcionamiento normal, y admitir aire cuando la conducción se vacía, evitando así depresiones que podrían dañarla" },
  { anverso: "¿Qué norma regula específicamente las ventosas dentro de la familia UNE-EN 1074?", reverso: "La norma UNE-EN 1074-4, dedicada a ventosas y válvulas de vacío" },
  { anverso: "¿Por qué es importante purgar el aire acumulado en los puntos altos de una conducción?", reverso: "Porque el aire acumulado reduce la sección útil de paso del agua, aumenta la pérdida de carga, puede provocar golpes de ariete al desplazarse bruscamente, y falsea la medición de caudal en algunos puntos de la red" },
  { anverso: "¿Qué es un desagüe (o purga de fondo) en la red de abastecimiento?", reverso: "Un punto, situado habitualmente en las cotas más bajas del trazado, que permite vaciar completamente un tramo de conducción hacia la red de saneamiento o hacia el exterior, para labores de mantenimiento o reparación" },
  { anverso: "¿Qué relación existe entre las ventosas y los desagües a la hora de vaciar un tramo de conducción para una reparación?", reverso: "El desagüe permite evacuar el agua por el punto bajo del tramo, mientras que la ventosa (o una llave de admisión de aire) permite que entre aire por el punto alto, evitando así que se forme un vacío que dificultaría o impediría el vaciado" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S2 })));
console.log(`📝 preguntas de test (${S2})...`);
await insertarPreguntasConOpciones(S2, [
  { enunciado: "¿Qué función cumple una ventosa en una conducción de agua?", explicacion: "Purgar el aire acumulado en los puntos altos y admitir aire al vaciarse.", dificultad: "facil", opciones: ["Purgar el aire acumulado en los puntos altos de la conducción", "Medir el caudal exacto que circula por esa conducción", "Reducir de forma permanente la presión de servicio de la red", "Filtrar las partículas sólidas que arrastra el agua"], correcta: 0 },
  { enunciado: "¿Qué norma regula específicamente las ventosas dentro de la familia UNE-EN 1074?", explicacion: "La norma UNE-EN 1074-4.", dificultad: "media", opciones: ["La norma UNE-EN 1074-4", "La norma UNE-EN 1074-1", "La norma UNE-EN 14339", "La norma UNE-EN 545"], correcta: 0 },
  { enunciado: "¿Por qué es importante purgar el aire acumulado en los puntos altos de una conducción?", explicacion: "Reduce la sección útil, aumenta la pérdida de carga y puede provocar golpes de ariete.", dificultad: "media", opciones: ["Reduce la sección útil y puede provocar golpes de ariete", "No genera ningún inconveniente técnico real en la conducción", "Mejora de forma directa la calidad sanitaria del agua", "Reduce de forma permanente el consumo eléctrico de la red"], correcta: 0 },
  { enunciado: "¿Qué es un desagüe o purga de fondo en la red de abastecimiento?", explicacion: "Un punto en las cotas bajas que permite vaciar un tramo de conducción.", dificultad: "media", opciones: ["Un punto en las cotas bajas que permite vaciar un tramo de conducción", "Un punto en las cotas altas que permite purgar el aire acumulado", "Un elemento exclusivo para la medición del consumo de un abonado", "Un elemento exclusivo para la extinción de incendios en la vía pública"], correcta: 0 },
  { enunciado: "¿Qué relación existe entre ventosas y desagües al vaciar un tramo para una reparación?", explicacion: "El desagüe evacua el agua por el punto bajo; la ventosa admite aire por el punto alto.", dificultad: "dificil", opciones: ["El desagüe evacua el agua; la ventosa admite aire, evitando el vacío", "Ambos elementos cumplen exactamente la misma función en el vaciado", "El desagüe admite aire; la ventosa evacua el agua del tramo", "No existe ninguna relación real entre ambos elementos en el vaciado"], correcta: 0 },
]);

const S3 = "bocas-riego-tomas-agua-valvulas-seguridad";
console.log(`📝 flashcards (${S3})...`);
await insertar("flashcards", [
  { anverso: "¿Qué es una boca de riego en la red de abastecimiento municipal?", reverso: "Un punto de toma de agua instalado en la vía pública, habitualmente en arqueta, destinado al riego de zonas verdes, la limpieza viaria u otros usos municipales autorizados, con un consumo que debe controlarse conforme a la ordenanza del agua" },
  { anverso: "¿Qué es una toma de agua en la red de abastecimiento?", reverso: "El punto de conexión desde el cual se deriva agua de una conducción principal, ya sea hacia una acometida domiciliaria, una boca de riego, un hidrante o cualquier otro punto de consumo autorizado" },
  { anverso: "¿Qué es una válvula de seguridad en una instalación de la red de abastecimiento?", reverso: "Una válvula que se abre automáticamente cuando la presión supera un valor máximo predeterminado, aliviando el exceso de presión para proteger la instalación (por ejemplo, en depósitos o estaciones de bombeo) frente a sobrepresiones peligrosas" },
  { anverso: "¿Qué establece la Ordenanza Municipal para la Ecoeficiencia y la Gestión Integral del Agua (OMECGIA) sobre el consumo en bocas de riego e hidrantes de vía pública (art. 19)?", reverso: "Establece la necesidad de controlar el consumo de agua en las bocas de riego, hidrantes de vía pública y otros puntos de consumo municipal, para su adecuada facturación y gestión, dentro de los criterios generales de control de consumos de la ordenanza" },
  { anverso: "¿Por qué debe un guardallaves prestar especial atención al cierre correcto de bocas de riego y tomas de agua tras su uso?", reverso: "Porque un cierre defectuoso provoca fugas continuas de agua no controlada, con el consiguiente derroche, posible afección a la vía pública, y una facturación o imputación de consumo incorrecta si no se detecta a tiempo" },
].map((f) => ({ ...f, tema_slug: TEMA, seccion: S3 })));
console.log(`📝 preguntas de test (${S3})...`);
await insertarPreguntasConOpciones(S3, [
  { enunciado: "¿Qué es una boca de riego en la red de abastecimiento municipal?", explicacion: "Un punto de toma de agua en la vía pública para riego, limpieza u otros usos municipales.", dificultad: "facil", opciones: ["Un punto de toma de agua en la vía pública para usos municipales", "Un elemento exclusivo para la purga de aire de la conducción", "Un elemento exclusivo para el vaciado de tramos de conducción", "Una válvula que regula automáticamente la presión de la red"], correcta: 0 },
  { enunciado: "¿Qué es una toma de agua en la red de abastecimiento?", explicacion: "El punto de conexión desde el cual se deriva agua de una conducción principal.", dificultad: "media", opciones: ["El punto de conexión desde el que se deriva agua de la conducción", "El punto donde se purga el aire acumulado en la conducción", "El punto donde se vacía por completo un tramo de conducción", "El punto donde se mide la presión general de todo el sector"], correcta: 0 },
  { enunciado: "¿Qué función cumple una válvula de seguridad en una instalación de la red?", explicacion: "Se abre automáticamente al superarse una presión máxima, aliviando el exceso.", dificultad: "media", opciones: ["Se abre automáticamente al superarse una presión máxima", "Se cierra automáticamente al superarse un caudal máximo", "Regula el nivel de cloro residual del agua distribuida", "Filtra las partículas sólidas que arrastra el agua"], correcta: 0 },
  { enunciado: "¿Qué establece el art. 19 de la OMECGIA sobre bocas de riego e hidrantes de vía pública?", explicacion: "La necesidad de controlar el consumo de agua en esos puntos municipales.", dificultad: "dificil", opciones: ["La necesidad de controlar el consumo de agua en esos puntos", "La prohibición absoluta de instalar bocas de riego en la ciudad", "La obligación de facturar ese consumo directamente a los vecinos", "La necesidad de cerrar esos puntos durante todo el verano"], correcta: 0 },
  { enunciado: "¿Por qué debe prestarse especial atención al cierre correcto de una boca de riego tras su uso?", explicacion: "Un cierre defectuoso provoca fugas continuas de agua no controlada.", dificultad: "media", opciones: ["Un cierre defectuoso provoca fugas continuas de agua no controlada", "No tiene ninguna consecuencia relevante si el calibre es pequeño", "Mejora de forma automática la presión disponible en la zona", "Reduce de forma automática el consumo del resto de la red"], correcta: 0 },
]);

console.log(`\n🔗 Vinculando ${TEMA} como Tema 14 de ${OPOSICION}...`);
await upsert("tema_oposicion", [{ tema_slug: TEMA, oposicion_slug: OPOSICION, bloque_id: BLOQUE_2_ID, numero: 14, orden: 14, es_premium: false, publicado: true, secciones_incluidas: null }], "tema_slug,oposicion_slug");
console.log("\n✅ tema-194 creado y vinculado como Tema 14 de Oficial Guardallaves.");
