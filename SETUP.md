# Puesta en producción: GitHub → Supabase → Vercel → dominio

Este orden importa: cada paso da algo que necesita el siguiente.

## 1. GitHub

**Ya hecho por mí:** el repo Git local existe (`git init`), con el primer commit
(353 archivos) en la rama `main`.

**Lo que haces tú** (no tengo `gh` CLI instalado en este equipo, así que va por la web):

1. Entra en https://github.com/new
2. Nombre del repo: `kiuti-cal` (o el que prefieras — solo dímelo si cambias el nombre).
3. Visibilidad: **privado** (recomendado mientras no haya página legal ni monetización
   definida — público no pasa nada grave, pero privado es más prudente por defecto).
4. **No marques** "Add a README" ni ".gitignore" ni licencia — ya los tenemos localmente
   y crear el repo con archivos generaría un conflicto al hacer push.
5. Pulsa "Create repository". GitHub te enseña una URL tipo
   `https://github.com/tu-usuario/kiuti-cal.git`.

**Cuando la tengas, pásamela** y hago yo el `git remote add` + `git push` — o, si
prefieres hacerlo tú mismo, es:

```bash
git remote add origin https://github.com/tu-usuario/kiuti-cal.git
git push -u origin main
```

## 2. Supabase

1. Entra en https://supabase.com y crea cuenta / inicia sesión (con GitHub es lo más
   cómodo, así quedan vinculados).
2. "New project". Datos a rellenar:
   - **Name**: `kiuti` (o lo que prefieras).
   - **Database password**: genera una segura y **guárdala en tu gestor de
     contraseñas** — yo no debo verla ni escribirla nunca, ese paso es tuyo.
   - **Region**: `eu-central-1 (Frankfurt)` o `eu-west-1/2/3` — cualquiera de Europa da
     mejor latencia que EE.UU. para usuarios en España.
   - Plan: **Free** es más que suficiente para empezar.
3. Espera 1-2 minutos a que aprovisione el proyecto.
4. Ve a **Project Settings → API**. Ahí tienes tres valores que necesito:
   - `Project URL` (algo como `https://xxxxx.supabase.co`)
   - `anon public` key
   - `service_role` key (⚠️ esta es secreta — nunca va en el código del cliente ni se
     publica; solo en variables de entorno del servidor)

**Cuando las tengas**, pásamelas (puedes pegarlas directamente en el chat — son claves
de API de tu propio proyecto, no contraseñas personales) y te creo el archivo
`.env.local` en `kiuti-cal/` — ya está en `.gitignore`, así que nunca se sube a GitHub.

El esquema de base de datos (tablas `oposiciones`, `bloques`, `temas`,
`tema_oposicion`, `flashcards`, `glosario`...) lo diseñamos y lo ejecutamos en el SQL
Editor de Supabase cuando lleguemos a esa parte — no hace falta ahora, solo dejar el
proyecto creado y las claves a mano.

## 3. Vercel

1. Entra en https://vercel.com y **"Continue with GitHub"** (inicia sesión con tu cuenta
   de GitHub — esto lo autorizas tú mismo en tu navegador, no es algo que yo pueda hacer
   por ti).
2. "Add New... → Project".
3. Busca y selecciona el repo `kiuti-cal` que acabas de crear — Vercel detecta que es
   Next.js automáticamente, no hay que tocar nada de la configuración de build.
4. Antes de darle a "Deploy", despliega **"Environment Variables"** y añade las tres de
   Supabase:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

   (Los mismos valores que en tu `.env.local`. Las que empiezan por `NEXT_PUBLIC_` son
   visibles en el navegador — es normal, están pensadas para eso. La `service_role`
   marcarla como disponible solo en "Production" si Vercel te deja elegirlo.)
5. "Deploy". En 1-2 minutos tienes una URL pública tipo `kiuti-cal.vercel.app`.

A partir de aquí, **cada `git push` a `main` despliega solo** — no hay que repetir el
proceso.

## 4. Dominio (más adelante, cuando lo compres)

1. Compra `oposicioneszaragoza.es` en el registrador que prefieras (no hace falta que
   sea el mismo sitio que Vercel).
2. En el proyecto de Vercel: **Settings → Domains → Add** → escribe el dominio.
3. Vercel te da uno o dos registros DNS que hay que crear en el panel del registrador
   (normalmente un `A` apuntando a una IP de Vercel, o un `CNAME` — Vercel te lo indica
   exacto según el registrador). Yo no tengo acceso a ese panel, así que esa parte es
   tuya, pero te guío si me dices qué panel usas.
4. Cuando el DNS propague (minutos a horas), Vercel emite el certificado HTTPS solo.
5. Avísame para actualizar `SITE.url` en `src/lib/site.ts` (hoy apunta a
   `http://localhost:3000`) y volver a desplegar.

## Resumen de quién hace qué

| Paso | Lo hago yo | Lo haces tú |
|---|---|---|
| Git local (init, commit) | ✅ ya hecho | — |
| Crear repo en GitHub | — | ✅ (no tengo `gh` instalado aquí) |
| Push a GitHub | ✅ (dame la URL) | o tú mismo, como prefieras |
| Cuenta y proyecto Supabase | — | ✅ (login/cuenta, contraseña de BD) |
| Pasarme las claves de API | — | ✅ |
| Crear `.env.local` | ✅ | — |
| Cuenta Vercel + importar repo | — | ✅ (login con GitHub) |
| Variables de entorno en Vercel | — | ✅ (te digo cuáles pegar) |
| Comprar dominio | — | ✅ |
| Configurar DNS | — | ✅ (te guío) |
| Actualizar `SITE.url` tras el dominio | ✅ | — |
