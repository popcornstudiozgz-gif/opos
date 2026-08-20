import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { getOposicion, getOposiciones } from "@/lib/oposiciones";

/** Pre-renderiza una ruta por cada oposición activa del catálogo. */
export async function generateStaticParams() {
  const oposiciones = await getOposiciones();
  return oposiciones.map((o) => ({ oposicion: o.slug }));
}

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ oposicion: string }>;
}

export default async function OposicionLayout({ children, params }: LayoutProps) {
  const { oposicion: slug } = await params;
  const oposicion = await getOposicion(slug);
  if (!oposicion) notFound();

  return (
    <>
      <Navbar oposicionSlug={slug} />
      {children}
    </>
  );
}
