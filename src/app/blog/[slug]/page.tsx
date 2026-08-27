import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Navbar } from "@/components/layout/Navbar";
import { MarkdownContenido } from "@/components/blog/MarkdownContenido";
import { crearMetadata } from "@/lib/site";
import { getArticulosPublicados, getArticuloPublicadoPorSlug, getOposicionesDeArticulo } from "@/lib/blog";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articulos = await getArticulosPublicados();
  return articulos.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const articulo = await getArticuloPublicadoPorSlug(slug);
  if (!articulo) return {};
  return crearMetadata({
    titulo: articulo.titulo,
    descripcion: articulo.resumen,
    ruta: `/blog/${slug}`,
  });
}

function formatearFecha(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });
}

export default async function ArticuloPage({ params }: PageProps) {
  const { slug } = await params;
  const articulo = await getArticuloPublicadoPorSlug(slug);
  if (!articulo) notFound();

  const oposicionesRelacionadas = await getOposicionesDeArticulo(articulo.id);

  return (
    <>
      <Navbar />
      <section className="bg-white">
        <Container className="max-w-2xl py-16 sm:py-20">
          <Link href="/blog" className="text-sm font-medium text-brand-600 hover:underline">
            ← Volver al blog
          </Link>

          <p className="mt-6 text-xs font-semibold text-slate-400">{formatearFecha(articulo.publicadoEn)}</p>
          <h1 className="mt-1 text-3xl font-black text-brand-900 sm:text-4xl">{articulo.titulo}</h1>
          <p className="mt-3 text-lg text-slate-600">{articulo.resumen}</p>

          {articulo.imagenUrl && (
            // eslint-disable-next-line @next/next/no-img-element -- URL externa arbitraria
            <img src={articulo.imagenUrl} alt="" className="mt-8 w-full rounded-xl border border-brand-100 object-cover" />
          )}

          <MarkdownContenido contenido={articulo.contenido} />

          {oposicionesRelacionadas.length > 0 && (
            <div className="mt-10 border-t border-brand-100 pt-6">
              <p className="text-sm font-semibold text-brand-900">Afecta a estas oposiciones:</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {oposicionesRelacionadas.map((o) => (
                  <Link
                    key={o.slug}
                    href={`/blog?oposicion=${o.slug}`}
                    className="rounded-full bg-brand-50 px-3.5 py-1.5 text-sm font-medium text-brand-700 hover:bg-brand-100"
                  >
                    {o.nombre} {o.organismo && <span className="opacity-70">· {o.organismo}</span>}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
