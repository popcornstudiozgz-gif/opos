import { Container } from "@/components/ui/Container";
import { ArticuloForm } from "@/components/admin/ArticuloForm";
import { getOposiciones } from "@/lib/oposiciones";

export default async function NuevoArticuloPage() {
  const oposiciones = await getOposiciones();

  return (
    <Container className="max-w-3xl py-10">
      <h1 className="text-2xl font-black text-brand-900">Nuevo artículo</h1>
      <div className="mt-6">
        <ArticuloForm oposiciones={oposiciones} />
      </div>
    </Container>
  );
}
