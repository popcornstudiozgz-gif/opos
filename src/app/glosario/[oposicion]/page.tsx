import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { crearMetadata } from "@/lib/site";
import { getOposicion, getOposiciones, getBloquesConTemas } from "@/lib/oposiciones";
import { TemaExplorerLayout, RejillaTemas } from "@/components/layout/TemaExplorerLayout";

interface PageProps {
  /** `oposicion` es el slug INTERNO (PK), igual que el antiguo `?oposicion=`. */
  params: Promise<{ oposicion: string }>;
}

/** Glosario de una oposición, sin tema elegido. Estática (ver `/glosario/page.tsx`). */
export const dynamic = "force-static";
export const revalidate = 3600;

export async function generateStaticParams() {
  const oposiciones = await getOposiciones();
  return oposiciones.map((o) => ({ oposicion: o.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { oposicion: oposicionSlug } = await params;
  const oposicion = await getOposicion(oposicionSlug);
  if (!oposicion) return {};
  return crearMetadata({
    titulo: "Glosario",
    descripcion: `Definiciones de los conceptos clave de ${oposicion.nombre} (${oposicion.organismo}), tema a tema.`,
    ruta: "/glosario",
  });
}

export default async function GlosarioOposicionPage({ params }: PageProps) {
  const { oposicion: oposicionSlug } = await params;
  const oposicion = await getOposicion(oposicionSlug);
  if (!oposicion) notFound();
  const bloques = await getBloquesConTemas(oposicionSlug);

  return (
    <>
      <Navbar oposicionSlug={oposicionSlug} />
      <TemaExplorerLayout
        titulo="Glosario"
        subtitulo="Términos jurídicos y administrativos"
        bloques={bloques}
        basePath={`/glosario/${oposicionSlug}`}
        opcionTodos={{ label: "Todos los conceptos", icono: "📖", activo: false }}
      >
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-brand-900">Glosario</h2>
            <p className="mt-1 text-slate-500">
              Selecciona un tema del menú para ver sus términos, o consulta el glosario completo.
            </p>
          </div>
          <RejillaTemas bloques={bloques} basePath={`/glosario/${oposicionSlug}`} />
        </div>
      </TemaExplorerLayout>
    </>
  );
}
