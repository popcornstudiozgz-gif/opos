// node --env-file=.env.local scripts/backup-supabase.mjs <carpeta-destino>
//
// Copia de seguridad de los DATOS de Supabase vía API (service_role), para
// poder volver a montar el proyecto en otro sitio. El esquema (tablas,
// políticas RLS, triggers) no se copia aquí: está en supabase/migrations/.
//
// Genera en <carpeta-destino>:
//   tablas/<tabla>.json  — todas las filas de cada tabla del esquema public
//   auth-usuarios.json   — usuarios de Supabase Auth (id, email, metadatos,
//                          fechas). La API no expone las contraseñas: tras
//                          restaurar, cada usuario tendría que recuperarla.
//   resumen.json         — fecha, proyecto y nº de filas por tabla
//
// Contiene datos personales (emails, progreso, mensajes de contacto): la
// carpeta de destino NO debe estar dentro del repo ni subirse a git.

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}` };
const PAGINA = 1000;

const destino = process.argv[2];
if (!URL_BASE || !SERVICE_KEY || !destino) {
  console.error("Uso: node --env-file=.env.local scripts/backup-supabase.mjs <carpeta-destino>");
  process.exit(1);
}

async function pedir(url, extra = {}) {
  const res = await fetch(url, { headers: { ...HEADERS, ...extra } });
  if (!res.ok) throw new Error(`${res.status} ${url}\n${await res.text()}`);
  return res;
}

/** Tablas del esquema public y su clave primaria, leídas del OpenAPI de PostgREST. */
async function listarTablas() {
  const spec = await (await pedir(`${URL_BASE}/rest/v1/`, { Accept: "application/openapi+json" })).json();
  return Object.entries(spec.definitions).map(([nombre, def]) => {
    const pk = Object.entries(def.properties ?? {})
      .filter(([, p]) => (p.description ?? "").includes("<pk/>"))
      .map(([col]) => col);
    return { nombre, pk };
  });
}

async function descargarTabla({ nombre, pk }) {
  // Orden estable por clave primaria para que la paginación no salte ni repita filas.
  const orden = pk.length ? `&order=${pk.map((c) => `${c}.asc`).join(",")}` : "";
  const filas = [];
  for (let offset = 0; ; offset += PAGINA) {
    const res = await pedir(`${URL_BASE}/rest/v1/${nombre}?select=*${orden}&limit=${PAGINA}&offset=${offset}`);
    const lote = await res.json();
    filas.push(...lote);
    if (lote.length < PAGINA) break;
  }
  return filas;
}

async function descargarUsuarios() {
  const usuarios = [];
  for (let pagina = 1; ; pagina++) {
    const res = await pedir(`${URL_BASE}/auth/v1/admin/users?page=${pagina}&per_page=${PAGINA}`);
    const { users } = await res.json();
    usuarios.push(...users);
    if (users.length < PAGINA) break;
  }
  return usuarios;
}

await mkdir(path.join(destino, "tablas"), { recursive: true });

const tablas = await listarTablas();
const conteos = {};
for (const tabla of tablas) {
  const filas = await descargarTabla(tabla);
  await writeFile(path.join(destino, "tablas", `${tabla.nombre}.json`), JSON.stringify(filas, null, 2));
  conteos[tabla.nombre] = filas.length;
  console.log(`${tabla.nombre}: ${filas.length}${tabla.pk.length ? "" : " (sin clave primaria detectada)"}`);
}

const usuarios = await descargarUsuarios();
await writeFile(path.join(destino, "auth-usuarios.json"), JSON.stringify(usuarios, null, 2));
console.log(`auth.users: ${usuarios.length}`);

await writeFile(
  path.join(destino, "resumen.json"),
  JSON.stringify(
    { fecha: new Date().toISOString(), proyecto: URL_BASE, filas_por_tabla: conteos, usuarios_auth: usuarios.length },
    null,
    2,
  ),
);
console.log(`\nCopia completa en ${path.resolve(destino)}`);
