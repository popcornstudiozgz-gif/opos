import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Navbar } from "@/components/layout/Navbar";
import { crearMetadata, SITE } from "@/lib/site";

export const metadata = crearMetadata({
  titulo: "Aviso legal",
  descripcion: `Condiciones de uso y titularidad de ${SITE.nombre}.`,
  ruta: "/aviso-legal",
});

const ULTIMA_ACTUALIZACION = "22 de agosto de 2026";

export default function AvisoLegalPage() {
  return (
    <>
      <Navbar />
      <section className="bg-white">
        <Container className="max-w-3xl py-16 sm:py-20">
          <SectionHeading titulo="Aviso legal" subtitulo={`Última actualización: ${ULTIMA_ACTUALIZACION}.`} />

          <div className="mt-10 space-y-8">
            <section>
              <h2 className="text-xl font-bold text-brand-900">1. Titularidad del sitio</h2>
              <p className="mt-2 text-slate-700">
                {SITE.nombre} es un proyecto personal de {SITE.titular}, sin ánimo de lucro y sin
                actividad mercantil constituida (no se opera como empresa, por lo que no dispone de
                NIF ni domicilio social que publicar).
              </p>
              <p className="mt-2 text-slate-700">
                Contacto:{" "}
                <a href={`mailto:${SITE.emailContacto}`} className="font-semibold text-brand-600 hover:underline">
                  {SITE.emailContacto}
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-900">2. Objeto y naturaleza del sitio</h2>
              <p className="mt-2 text-slate-700">
                Este sitio ofrece material de estudio (temario, tests, flashcards, simulacros, casos
                prácticos, glosario y noticias) para ayudar a preparar oposiciones en Zaragoza.
                Actualmente incluye la oposición de Auxiliar Administrativo/a del Ayuntamiento de
                Zaragoza, y está previsto ampliar el catálogo con más oposiciones. Es un recurso{" "}
                <strong>no oficial</strong>, elaborado de forma independiente y sin vinculación con
                el Ayuntamiento de Zaragoza ni con ningún otro organismo público.
              </p>
              <p className="mt-2 text-slate-700">
                El contenido tiene fines exclusivamente formativos. La información sobre cada
                convocatoria, el temario oficial y sus fechas puede cambiar: verifica siempre los
                datos relevantes para trámites o plazos en las fuentes oficiales (BOE, BOA, BOPZ y la
                sede electrónica del organismo convocante correspondiente).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-900">3. Condiciones de uso</h2>
              <ul className="mt-2 list-disc space-y-1.5 pl-5 text-slate-700">
                <li>El acceso al contenido gratuito de la web es libre.</li>
                <li>
                  Algunas funciones (guardar tu progreso, tu historial de tests y tu repaso de
                  flashcards) requieren crear una cuenta.
                </li>
                <li>
                  No está permitido el uso fraudulento del sitio, la extracción masiva automatizada
                  de contenido (scraping) ni su redistribución con fines comerciales sin
                  autorización.
                </li>
                <li>
                  Actualmente el servicio es gratuito. Si en el futuro se introdujeran funciones de
                  pago, se informará con antelación y se actualizarán estas condiciones.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-900">4. Propiedad intelectual</h2>
              <p className="mt-2 text-slate-700">
                El diseño, el código y los materiales de estudio elaborados específicamente para
                esta web (resúmenes, preguntas de test, flashcards, casos prácticos, artículos del
                blog) son propiedad de {SITE.titular}, salvo que se indique lo contrario. El
                contenido normativo citado (leyes, reglamentos, boletines oficiales) es de dominio
                público.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-900">5. Responsabilidad</h2>
              <p className="mt-2 text-slate-700">
                Se procura que el contenido esté actualizado y sea correcto, pero no se garantiza su
                exactitud absoluta ni su vigencia permanente: el temario y las convocatorias pueden
                modificarse. {SITE.nombre} no asume responsabilidad por el resultado obtenido en
                ningún proceso selectivo ni por decisiones tomadas únicamente con base en este
                contenido.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-900">6. Enlaces a terceros</h2>
              <p className="mt-2 text-slate-700">
                La web puede incluir enlaces a sitios oficiales (BOE, BOA, BOPZ, sedes electrónicas
                de organismos convocantes) u otros recursos externos. {SITE.nombre} no se hace
                responsable del contenido ni de las políticas de esos sitios de terceros.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-900">7. Legislación aplicable</h2>
              <p className="mt-2 text-slate-700">Este aviso legal se rige por la legislación española.</p>
            </section>
          </div>
        </Container>
      </section>
    </>
  );
}
