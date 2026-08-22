import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Navbar } from "@/components/layout/Navbar";
import { crearMetadata, SITE } from "@/lib/site";

export const metadata = crearMetadata({
  titulo: "Política de cookies",
  descripcion: `Qué cookies usa ${SITE.nombre} y para qué.`,
  ruta: "/cookies",
});

const ULTIMA_ACTUALIZACION = "22 de agosto de 2026";

export default function CookiesPage() {
  return (
    <>
      <Navbar />
      <PageHeader titulo="Política de cookies" descripcion={`Última actualización: ${ULTIMA_ACTUALIZACION}.`} />

      <Container className="max-w-3xl space-y-8 py-12">
        <section>
          <h2 className="text-xl font-bold text-brand-900">1. Qué son las cookies</h2>
          <p className="mt-2 text-slate-700">
            Las cookies son pequeños archivos que un sitio web guarda en tu navegador para
            recordar información entre visitas o durante tu sesión, como mantenerte identificado
            tras iniciar sesión.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-brand-900">2. Qué cookies usa esta web</h2>
          <p className="mt-2 text-slate-700">
            Actualmente solo usamos <strong>cookies técnicas o necesarias</strong>, gestionadas
            por nuestro proveedor de autenticación (Supabase), para mantener tu sesión iniciada
            mientras usas la web y poder mostrarte tu perfil, tu progreso y tu historial. Sin
            ellas no es posible iniciar sesión ni guardar tu avance.
          </p>
          <p className="mt-2 text-slate-700">
            Al ser estrictamente necesarias para el funcionamiento del servicio que solicitas,
            estas cookies no requieren tu consentimiento previo (artículo 22.2 de la LSSI).
          </p>
          <p className="mt-2 text-slate-700">
            <strong>No utilizamos</strong> cookies de analítica, publicidad ni de redes sociales
            de terceros.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-brand-900">3. Cómo desactivar o eliminar las cookies</h2>
          <p className="mt-2 text-slate-700">
            Puedes eliminar o bloquear las cookies desde la configuración de tu navegador en
            cualquier momento. Ten en cuenta que, si bloqueas las cookies técnicas de sesión, no
            podrás iniciar sesión ni se guardará tu progreso mientras navegues por la web.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-brand-900">4. Cambios en esta política</h2>
          <p className="mt-2 text-slate-700">
            Si en el futuro incorporamos cookies de analítica u otro tipo que requieran tu
            consentimiento, actualizaremos esta página y te lo pediremos expresamente antes de
            instalarlas.
          </p>
        </section>
      </Container>
    </>
  );
}
