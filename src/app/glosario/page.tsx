import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Navbar } from "@/components/layout/Navbar";
import { crearMetadata, organismoAbreviado, SITE } from "@/lib/site";
import { getOposiciones, getGlosarioCompleto } from "@/lib/oposiciones";
import { GlosarioBuscador } from "@/components/glosario/GlosarioBuscador";

/**
 * Glosario en raíz, independiente de oposición — a propósito, no vive bajo
 * `/[organismo]/[oposicion]/`. El `canonical` es SIEMPRE `/glosario`, también
 * en las vistas filtradas (`/glosario/[oposicion]` y
 * `/glosario/[oposicion]/[tema]`), así que Google nunca ve más de una URL
 * real — no hace falta ningún `noindex`, porque no hay ninguna página
 * duplicada que apagar.
 *
 * A diferencia de test/flashcards/casos prácticos, el glosario no guarda
 * progreso de usuario por oposición (sin tabla en
 * `0007_usuarios_progreso.sql`, sin llamada a Supabase en
 * `GlosarioBuscador`), así que consolidarlo en una sola ruta no pierde
 * nada — decisión del 24/08/2026, ver conversación.
 *
 * Esta página es el glosario general de toda la plataforma
 * (`getGlosarioCompleto`), la versión indexable de verdad. El filtro por
 * oposición y tema iba antes en `?oposicion=`/`&tema=`; desde octubre de
 * 2026 va en la ruta, para que todas las vistas sean estáticas (ver el
 * comentario de `TemaExplorerLayout`). Las URLs viejas redirigen (ver
 * `next.config.ts`).
 */
export const dynamic = "force-static";
export const revalidate = 3600;

export const metadata: Metadata = crearMetadata({
  titulo: "Glosario",
  descripcion: `Glosario de términos jurídicos y administrativos de ${SITE.nombre}, para todas las oposiciones del catálogo.`,
  ruta: "/glosario",
});

export default async function GlosarioPage() {
  const [terminos, oposiciones] = await Promise.all([getGlosarioCompleto(), getOposiciones()]);
  return (
    <>
      <Navbar />
      <section className="bg-white">
        <Container className="max-w-2xl py-16 sm:py-20">
          <p className="text-xs font-semibold tracking-wide text-brand-600 uppercase">Glosario</p>
          <h1 className="mt-1 text-3xl font-black text-brand-900 sm:text-4xl">
            Términos jurídicos y administrativos
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            {terminos.length} definiciones claras, de todas las oposiciones del catálogo. Si estás
            preparando una en concreto, entra en su ficha para ver el glosario filtrado por tema.
          </p>

          {/* Acceso directo al glosario ya filtrado por oposición — no un
              sidebar permanente como en test/flashcards, porque aquí no
              hay temas que listar sin elegir antes una oposición. */}
          {oposiciones.length > 0 && (
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-slate-500">Filtra por tu oposición:</span>
              {oposiciones.map((o) => (
                <Link
                  key={o.slug}
                  href={`/glosario/${o.slug}`}
                  prefetch={false}
                  className="rounded-full border border-brand-100 bg-brand-50 px-3.5 py-1.5 text-sm font-medium text-brand-700 transition-colors hover:bg-brand-100"
                >
                  {/* Nombre + organismo abreviado: dos oposiciones pueden
                      compartir el mismo nombre de puesto (p. ej. "Auxiliar
                      Administrativo" en el Ayto. de Zaragoza y en la DPZ),
                      y sin el organismo los chips serían indistinguibles. */}
                  {o.nombre} · {organismoAbreviado(o.organismoSlug, o.organismo)}
                </Link>
              ))}
            </div>
          )}

          <div className="mt-8">
            <GlosarioBuscador terminos={terminos} />
          </div>
        </Container>
      </section>
    </>
  );
}
