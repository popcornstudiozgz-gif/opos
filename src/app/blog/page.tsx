import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Navbar } from "@/components/layout/Navbar";
import { ArticuloCard } from "@/components/blog/ArticuloCard";
import { crearMetadata } from "@/lib/site";
import { getArticulosPublicados } from "@/lib/blog";

export const metadata = crearMetadata({
  titulo: "Blog de oposiciones en Zaragoza",
  descripcion: "Noticias y artículos sobre oposiciones en Zaragoza: convocatorias, plazos, novedades del BOE y consejos de estudio.",
  ruta: "/blog",
});

export default async function BlogPage() {
  const articulos = await getArticulosPublicados();

  return (
    <>
      <Navbar />
      <section className="bg-white">
        <Container className="py-16 sm:py-20">
          <SectionHeading
            titulo="Blog"
            subtitulo="Noticias y artículos sobre oposiciones en Zaragoza: convocatorias, plazos y novedades de cada proceso."
          />

          {articulos.length === 0 ? (
            <p className="mt-10 text-slate-500">Todavía no hay artículos publicados. Vuelve pronto.</p>
          ) : (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articulos.map((articulo) => (
                <ArticuloCard key={articulo.id} articulo={articulo} />
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
