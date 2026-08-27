import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Navbar } from "@/components/layout/Navbar";
import { ContactoForm } from "@/components/contacto/ContactoForm";
import { crearMetadata } from "@/lib/site";
import { getOposiciones } from "@/lib/oposiciones";

export const metadata = crearMetadata({
  titulo: "Contacto",
  descripcion: "Escríbenos tus dudas, generales o de una oposición en concreto, o avísanos de un error en una pregunta o un fallo en la web.",
  ruta: "/contacto",
});

interface PageProps {
  searchParams: Promise<{ oposicion?: string }>;
}

/**
 * Página global (fuera de `/[organismo]/[oposicion]/...`): quien pregunta puede no
 * estar viendo ninguna oposición en concreto, o puede llegar aquí desde el
 * enlace del pie de página en cualquier sección del sitio.
 */
export default async function ContactoPage({ searchParams }: PageProps) {
  const { oposicion: oposicionInicial } = await searchParams;
  const oposiciones = await getOposiciones();

  return (
    <>
      <Navbar />
      <PageHeader
        titulo="Contacto"
        descripcion="¿Tienes una duda, general o de una oposición en concreto? ¿Has visto una pregunta con un error, o un fallo en la web? Cuéntanoslo."
      />

      <Container className="py-12">
        <div className="mx-auto max-w-2xl">
          <ContactoForm oposiciones={oposiciones} oposicionInicial={oposicionInicial} />
        </div>
      </Container>
    </>
  );
}
