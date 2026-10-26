/**
 * Siembra un tema canónico completo y lo vincula a una oposición, a partir
 * de un objeto de datos. Usado por los scripts de la Parte II de Bombero/a
 * Conductor/a (seed-tema-304 en adelante) para no repetir en cada uno las
 * mismas utilidades de inserción.
 *
 * Convención de datos (la primera opción de cada pregunta es siempre la
 * correcta: el test, el simulacro y los casos barajan las opciones en el
 * navegador):
 *   {
 *     tema: { slug, titulo, descripcion, contenido, enlaces_boe, indice_estudio },
 *     vinculo: { oposicion, bloqueId, numero },
 *     secciones: [{ seccion, flashcards: [[anverso, reverso]],
 *                   preguntas: [[dificultad, enunciado, [opciones], explicacion]] }],
 *     glosario: [[seccion, termino, definicion]],
 *     casos: [{ slug, titulo, supuesto, preguntas: [[seccion, dificultad, enunciado, [opciones], explicacion]] }],
 *   }
 * Valida antes de escribir nada: 3 casos de 10 preguntas, secciones de
 * glosario y casos existentes en `secciones`, y opciones no repetidas.
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

async function pedir(ruta, opciones) {
  const res = await fetch(`${URL_BASE}/rest/v1/${ruta}`, { ...opciones, headers: { ...HEADERS, ...opciones.headers } });
  if (!res.ok) { console.error(`❌ ${ruta}: ${res.status} ${await res.text()}`); process.exit(1); }
  return res.json();
}
const insertar = (tabla, filas) => pedir(tabla, { method: "POST", headers: { Prefer: "return=representation" }, body: JSON.stringify(filas) });

async function insertarPreguntas(slug, preguntas) {
  const insertadas = await insertar("preguntas", preguntas.map((p) => ({ tema_slug: slug, seccion: p.seccion, dificultad: p.dificultad, enunciado: p.enunciado, explicacion: p.explicacion })));
  await insertar("opciones", insertadas.flatMap((fila, i) => preguntas[i].opciones.map((texto, orden) => ({ pregunta_id: fila.id, texto, es_correcta: orden === 0, orden }))));
  return insertadas;
}

function validar({ tema, secciones, glosario, casos }) {
  const errores = [];
  const nombres = new Set(secciones.map((s) => s.seccion));
  const revisar = (dónde, opciones) => {
    if (opciones.length < 3) errores.push(`${dónde}: menos de 3 opciones`);
    if (new Set(opciones).size !== opciones.length) errores.push(`${dónde}: opciones repetidas`);
  };
  for (const s of secciones) {
    if (!s.flashcards.length || !s.preguntas.length) errores.push(`${s.seccion}: sin flashcards o sin preguntas`);
    s.preguntas.forEach(([dif, enunciado, opciones], i) => {
      if (!["facil", "media", "dificil"].includes(dif)) errores.push(`${s.seccion} #${i}: dificultad "${dif}"`);
      revisar(`${s.seccion} #${i} "${enunciado.slice(0, 40)}"`, opciones);
    });
    if (!tema.indice_estudio.some((i) => i.seccion === s.seccion)) errores.push(`${s.seccion}: falta en indice_estudio`);
  }
  glosario.forEach(([seccion, termino]) => { if (!nombres.has(seccion)) errores.push(`glosario "${termino}": sección ${seccion} inexistente`); });
  if (casos.length !== 3) errores.push(`${casos.length} casos (se esperan 3)`);
  for (const c of casos) {
    if (c.preguntas.length !== 10) errores.push(`caso ${c.slug}: ${c.preguntas.length} preguntas`);
    c.preguntas.forEach(([seccion, dif, enunciado, opciones], i) => {
      if (!nombres.has(seccion)) errores.push(`caso ${c.slug} #${i}: sección ${seccion} inexistente`);
      if (!["facil", "media", "dificil"].includes(dif)) errores.push(`caso ${c.slug} #${i}: dificultad "${dif}"`);
      revisar(`caso ${c.slug} #${i} "${enunciado.slice(0, 40)}"`, opciones);
    });
  }
  if (errores.length) { console.error(`❌ Datos de ${tema.slug} no válidos:\n- ${errores.join("\n- ")}`); process.exit(1); }
}

export async function sembrarTema(datos) {
  if (!URL_BASE || !SERVICE_KEY) { console.error("❌ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY."); process.exit(1); }
  validar(datos);
  const { tema, vinculo, secciones, glosario, casos } = datos;
  const slug = tema.slug;

  const existente = await pedir(`temas?select=slug&slug=eq.${slug}`, { method: "GET", headers: {} });
  if (existente.length) { console.error(`❌ ${slug} ya existe; no se vuelve a sembrar.`); process.exit(1); }

  console.log(`📚 Creando ${slug}: ${tema.titulo}`);
  await insertar("temas", [tema]);

  for (const s of secciones) {
    await insertar("flashcards", s.flashcards.map(([anverso, reverso]) => ({ tema_slug: slug, seccion: s.seccion, anverso, reverso })));
    await insertarPreguntas(slug, s.preguntas.map(([dificultad, enunciado, opciones, explicacion]) => ({ seccion: s.seccion, dificultad, enunciado, opciones, explicacion })));
    console.log(`   ✓ ${s.seccion}: ${s.flashcards.length} flashcards, ${s.preguntas.length} preguntas`);
  }

  await insertar("glosario", glosario.map(([seccion, termino, definicion]) => ({ tema_slug: slug, seccion, termino, definicion })));
  console.log(`   ✓ glosario: ${glosario.length} términos`);

  for (const [i, c] of casos.entries()) {
    const [caso] = await insertar("casos_practicos", [{ tema_slug: slug, slug: c.slug, titulo: c.titulo, supuesto: c.supuesto, orden: i + 1 }]);
    const filas = await insertarPreguntas(slug, c.preguntas.map(([seccion, dificultad, enunciado, opciones, explicacion]) => ({ seccion, dificultad, enunciado, opciones, explicacion })));
    await insertar("caso_preguntas", filas.map((fila, orden) => ({ caso_id: caso.id, pregunta_id: fila.id, orden })));
    console.log(`   ✓ caso: ${c.titulo}`);
  }

  await pedir("tema_oposicion?on_conflict=tema_slug,oposicion_slug", {
    method: "POST",
    headers: { Prefer: "resolution=merge-duplicates,return=representation" },
    body: JSON.stringify([{ tema_slug: slug, oposicion_slug: vinculo.oposicion, bloque_id: vinculo.bloqueId, numero: vinculo.numero, orden: vinculo.numero, es_premium: false, publicado: true, secciones_incluidas: null }]),
  });
  console.log(`✅ ${slug} vinculado como Tema ${vinculo.numero} de ${vinculo.oposicion}.`);
}

/** Constantes de Bombero/a Conductor/a (Ayto. de Zaragoza). */
export const BOMBERO = {
  oposicion: "bombero-conductor-ayto-zaragoza",
  bloqueParteII: "336ae10e-fe81-42fe-8f98-8e9d201f5ac2",
  escuela: (archivo) => `https://www.zaragoza.es/cont/vistas/portal/bomberos/doc/${archivo}`,
};

/** Constantes de Administrativo del Gobierno de Aragón (C1); slug de tema nuevo = 372 + número. */
export const ADMIN_DGA = {
  oposicion: "administrativo-dga",
  bloqueDerecho: "f8053568-c72a-4125-b6e4-6a52cfe8e7e2",
  bloquePersonal: "5f860e9b-f3ec-4a75-b8c1-4bb29e816334",
  bloquePresupuesto: "9fdc5770-0578-40c6-8ca5-2495ae151e15",
  bloqueInformatica: "099011bb-5ff8-48bd-846b-fd0e92ccd080",
};

/** Constantes de Operario/a Especialista (Ayto. de Zaragoza); slug de tema nuevo = 407 + número. */
export const OPERARIO = {
  oposicion: "operario-especialista-ayto-zaragoza",
  bloque: "d9850c68-d26c-48c4-84a7-00027874e94c",
};

/** Constantes de Subalterno/a (Ayto. de Zaragoza); slug de tema nuevo = 414 + número. */
export const SUBALTERNO = {
  oposicion: "subalterno-ayto-zaragoza",
  bloque: "116c92c6-2c45-4720-b528-8f5adb4453ba",
};

/** Constantes de Policía Local (Ayto. de Zaragoza); slug de tema = 327 + número en la Parte segunda. */
export const POLICIA = {
  oposicion: "policia-local-ayto-zaragoza",
  bloqueParte1: "771bb2f3-bae8-4261-9b68-17e519bd6991",
  bloqueParte2: "a09c8f20-db05-4c77-8db9-8db6dcac4fa8",
};
