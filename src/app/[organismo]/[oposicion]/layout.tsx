import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { getOposicionPorRuta, getOposiciones } from "@/lib/oposiciones";

/** Pre-renderiza una ruta por cada oposición activa del catálogo. */
export async function generateStaticParams() {
  const oposiciones = await getOposiciones();
  return oposiciones.map((o) => ({ organismo: o.organismoSlug, oposicion: o.puestoSlug }));
}

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ organismo: string; oposicion: string }>;
}

export default async function OposicionLayout({ children, params }: LayoutProps) {
  const { organismo, oposicion: puesto } = await params;
  const oposicion = await getOposicionPorRuta(organismo, puesto);
  if (!oposicion) notFound();

  // Navbar recibe el slug INTERNO (PK) de siempre: internamente vuelve a
  // resolver la oposición y ya construye sus enlaces con organismoSlug/
  // puestoSlug — ver components/layout/Navbar.tsx.
  return (
    <>
      <Navbar oposicionSlug={oposicion.slug} />
      {children}
    </>
  );
}
