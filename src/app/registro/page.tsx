import { RegistroForm } from "@/components/registro/RegistroForm";
import { getOposiciones } from "@/lib/oposiciones";

// Dinámica a propósito (igual que /contacto): si no, Next la congela en
// build con las oposiciones de ese momento y una oposición nueva no
// aparecería en el desplegable hasta el siguiente deploy.
export const dynamic = "force-dynamic";

export default async function RegistroPage() {
  const oposiciones = await getOposiciones();
  return <RegistroForm oposiciones={oposiciones} />;
}
