import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Navbar } from "@/components/layout/Navbar";
import { crearMetadata, SITE } from "@/lib/site";

export const metadata = crearMetadata({
  titulo: "Política de privacidad",
  descripcion: `Cómo tratamos tus datos personales en ${SITE.nombre}.`,
  ruta: "/privacidad",
  indexable: false,
});

const ULTIMA_ACTUALIZACION = "25 de agosto de 2026";

export default function PrivacidadPage() {
  return (
    <>
      <Navbar />
      <PageHeader titulo="Política de privacidad" descripcion={`Última actualización: ${ULTIMA_ACTUALIZACION}.`} />

      <Container className="max-w-3xl space-y-8 py-12">
        <section>
              <h2 className="text-xl font-bold text-brand-900">1. Responsable del tratamiento</h2>
              <p className="mt-2 text-slate-700">
                {SITE.titular}, como persona física, a título de proyecto personal sin ánimo de
                lucro. Puedes contactar para cualquier cuestión relacionada con tus datos en{" "}
                <a href={`mailto:${SITE.emailContacto}`} className="font-semibold text-brand-600 hover:underline">
                  {SITE.emailContacto}
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-900">2. Qué datos recogemos</h2>
              <ul className="mt-2 list-disc space-y-1.5 pl-5 text-slate-700">
                <li>
                  <strong>Al registrarte:</strong> email, nombre (si lo indicas) y contraseña. La
                  contraseña se gestiona de forma cifrada por nuestro proveedor de autenticación
                  (Supabase) — nunca la almacenamos en texto plano ni tenemos acceso a ella.
                  Opcionalmente, también qué oposición te interesa (o si quieres acceso a todas) y
                  si aceptas recibir comunicaciones por email (ver más abajo).
                </li>
                <li>
                  <strong>Al usar la plataforma:</strong> los resultados de tus tests, casos
                  prácticos y simulacros, y tu progreso en el temario y en las flashcards de repaso,
                  vinculados a tu cuenta para poder mostrarte tu propio historial y avance.
                </li>
                <li>
                  <strong>Si nos escribes:</strong> los datos que incluyas en el formulario de
                  contacto (nombre si lo indicas, tu email y el mensaje).
                </li>
                <li>
                  <strong>Si marcas la casilla de comunicaciones por email</strong> (al registrarte
                  o al escribirnos): tu email y nombre pasan también a nuestra plataforma de envío
                  de correos (Brevo) para poder mandarte esas comunicaciones.
                </li>
              </ul>
              <p className="mt-2 text-slate-700">
                No recogemos datos de pago: el servicio es gratuito y no solicitamos ningún dato
                bancario o de tarjeta. Tampoco usamos cookies de analítica o publicidad de terceros
                (más detalle en la{" "}
                <Link href="/cookies" className="font-semibold text-brand-600 hover:underline">
                  política de cookies
                </Link>
                ).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-900">3. Para qué usamos tus datos</h2>
              <ul className="mt-2 list-disc space-y-1.5 pl-5 text-slate-700">
                <li>Crear y gestionar tu cuenta, y mantener tu sesión iniciada.</li>
                <li>
                  Guardar y mostrarte tu progreso: historial de tests, avance en el temario y
                  repetición espaciada de tus flashcards.
                </li>
                <li>Responder a las consultas que nos envíes.</li>
                <li>
                  Avisarte por email de novedades y contenido de preparación, <strong>solo si has
                  marcado expresamente la casilla de consentimiento</strong> al registrarte o al
                  escribirnos. Puedes retirar este consentimiento cuando quieras, sin que afecte al
                  resto del servicio, dándote de baja desde el propio email o escribiéndonos.
                </li>
              </ul>
              <p className="mt-2 text-slate-700">
                No utilizamos tus datos con fines publicitarios sin tu consentimiento expreso, ni
                los cedemos a terceros para que los usen con sus propios fines.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-900">4. Base legal</h2>
              <p className="mt-2 text-slate-700">
                Tratamos tus datos para poder prestarte el servicio que solicitas al registrarte
                (gestión de tu cuenta y de tu progreso de estudio) y, cuando corresponda, con tu
                consentimiento (por ejemplo, al escribirnos a través del formulario de contacto, o
                al marcar la casilla de comunicaciones por email). El envío de novedades y
                comunicaciones comerciales por email se basa siempre en tu consentimiento expreso
                (casilla desmarcada por defecto), nunca en el simple hecho de registrarte.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-900">5. Cuánto tiempo conservamos tus datos</h2>
              <p className="mt-2 text-slate-700">
                Conservamos tus datos mientras mantengas tu cuenta activa. Puedes solicitar la
                eliminación de tu cuenta y de tus datos en cualquier momento escribiendo a{" "}
                <a href={`mailto:${SITE.emailContacto}`} className="font-semibold text-brand-600 hover:underline">
                  {SITE.emailContacto}
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-900">6. Con quién compartimos tus datos</h2>
              <p className="mt-2 text-slate-700">
                No vendemos ni cedemos tus datos a terceros con fines comerciales. Para poder
                ofrecer el servicio, usamos los siguientes proveedores, que actúan como encargados
                del tratamiento bajo sus propias garantías de seguridad:
              </p>
              <ul className="mt-2 list-disc space-y-1.5 pl-5 text-slate-700">
                <li>
                  <strong>Supabase</strong> — base de datos, autenticación y almacenamiento de la
                  información de tu cuenta y tu progreso.
                </li>
                <li>
                  <strong>Vercel</strong> — alojamiento (hosting) de la aplicación web.
                </li>
                <li>
                  <strong>Brevo</strong> — envío de correos electrónicos, tanto de gestión de tu
                  cuenta como, si has dado tu consentimiento, comunicaciones informativas o
                  comerciales.
                </li>
              </ul>
              <p className="mt-2 text-slate-700">
                Estos proveedores pueden alojar o procesar datos en servidores fuera del Espacio
                Económico Europeo; en ese caso, aplican las garantías previstas por el RGPD (como
                las cláusulas contractuales tipo de la Comisión Europea o su adhesión al Marco de
                Privacidad de Datos UE-EE. UU.).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-900">7. Tus derechos</h2>
              <p className="mt-2 text-slate-700">
                Puedes ejercer en cualquier momento tus derechos de acceso, rectificación,
                supresión, oposición, limitación del tratamiento y portabilidad de tus datos
                escribiendo a{" "}
                <a href={`mailto:${SITE.emailContacto}`} className="font-semibold text-brand-600 hover:underline">
                  {SITE.emailContacto}
                </a>
                . También tienes derecho a presentar una reclamación ante la Agencia Española de
                Protección de Datos (
                <a
                  href="https://www.aepd.es"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-brand-600 hover:underline"
                >
                  www.aepd.es
                </a>
                ) si consideras que no hemos tratado tus datos correctamente.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-900">8. Menores de edad</h2>
              <p className="mt-2 text-slate-700">
                Este servicio está pensado para personas que preparan el acceso a una oposición y no
                está dirigido específicamente a menores de 14 años. Si detectamos datos de un menor
                de esa edad registrados sin autorización de sus tutores, procederemos a eliminarlos.
              </p>
            </section>

        <section>
          <h2 className="text-xl font-bold text-brand-900">9. Cambios en esta política</h2>
          <p className="mt-2 text-slate-700">
            Podemos actualizar esta política para reflejar cambios en el servicio (por ejemplo,
            si en el futuro se incorporan funcionalidades de pago, nuevas oposiciones o nuevos
            proveedores). Publicaremos siempre la versión vigente en esta misma página con la
            fecha de última actualización.
          </p>
        </section>
      </Container>
    </>
  );
}
