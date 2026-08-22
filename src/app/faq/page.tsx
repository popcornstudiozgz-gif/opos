import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Navbar } from "@/components/layout/Navbar";
import { Card } from "@/components/ui/Card";
import { crearMetadata, SITE } from "@/lib/site";

export const metadata = crearMetadata({
  titulo: "Preguntas frecuentes",
  descripcion: `Cómo funciona ${SITE.nombre}, qué gana quien se registra, y de dónde sale el contenido.`,
  ruta: "/faq",
});

const PREGUNTAS = [
  {
    id: "que-es",
    pregunta: `¿Qué es ${SITE.nombre} y qué puedo hacer aquí?`,
    respuesta: (
      <>
        <p>
          Es una plataforma para preparar oposiciones en Zaragoza. Cada oposición del catálogo
          tiene su propio temario, con estas herramientas de estudio:
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li><strong>Temario</strong> organizado por bloques y temas, con la normativa de referencia enlazada al BOE.</li>
          <li><strong>Tests</strong> con corrección inmediata y explicación de cada pregunta.</li>
          <li><strong>Flashcards</strong> para memorizar conceptos con repaso activo.</li>
          <li><strong>Casos prácticos</strong>: supuestos resueltos con preguntas encadenadas.</li>
          <li><strong>Glosario</strong> de términos administrativos y jurídicos.</li>
          <li><strong>Simulacro</strong> de examen completo y cronometrado.</li>
          <li><strong>Blog</strong> con noticias de convocatoria, plazos y cambios normativos.</li>
        </ul>
      </>
    ),
  },
  {
    id: "registro-necesario",
    pregunta: "¿Tengo que registrarme para usarlo?",
    respuesta: (
      <p>
        No. Todo el contenido —temario, tests, flashcards, casos prácticos, simulacro y
        glosario— es gratuito y se puede usar sin crear una cuenta. El registro es opcional y
        solo añade las ventajas de la siguiente pregunta.
      </p>
    ),
  },
  {
    id: "ventajas-registro",
    pregunta: "Entonces, ¿qué gano si me registro?",
    respuesta: (
      <>
        <p>Registrarte (gratis) añade lo que necesita recordar quién eres entre visitas:</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>
            <strong>Historial de tests, casos prácticos y simulacros</strong>, con la revisión
            pregunta a pregunta de cada intento, en tu perfil.
          </li>
          <li>
            <strong>Repetición espaciada real en las flashcards</strong> (qué tarjetas te tocan
            repasar y cuándo): sin cuenta, ese cálculo se guarda solo en el navegador donde
            estudies, y se pierde si borras datos del navegador o cambias de dispositivo.
          </li>
          <li>
            <strong>Marcar temas del temario como completados</strong>, para llevar el control de
            qué te falta.
          </li>
          <li>
            Que todo lo anterior <strong>te siga en cualquier dispositivo</strong> donde inicies
            sesión, en vez de quedarse solo en un navegador.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "contenido-ia",
    pregunta: "¿El contenido lo ha escrito una persona o una IA?",
    respuesta: (
      <p>
        El temario, las preguntas de test, las flashcards, los casos prácticos y buena parte de
        los artículos del blog se han elaborado con ayuda de herramientas de inteligencia
        artificial a partir de la normativa oficial, con supervisión humana. Se cuida que sea
        preciso, pero puede haber erratas, imprecisiones o contenido desactualizado si una norma
        cambia. <strong>Verifica siempre los datos que vayan a condicionar tu preparación o tus
        trámites</strong> (plazos, requisitos, articulado exacto) en las fuentes oficiales: el
        BOE, el BOA, el BOPZ o la sede electrónica del organismo convocante. Si detectas un
        error, cuéntanoslo en la página de{" "}
        <Link href="/contacto" className="font-semibold text-brand-600 hover:underline">
          contacto
        </Link>
        {" "}— se corrige.
      </p>
    ),
  },
  {
    id: "reportar-error",
    pregunta: "He visto un error en una pregunta o en el temario, ¿qué hago?",
    respuesta: (
      <p>
        Escríbenos desde{" "}
        <Link href="/contacto" className="font-semibold text-brand-600 hover:underline">
          /contacto
        </Link>{" "}
        eligiendo &ldquo;He visto una pregunta o caso práctico con un error&rdquo;, e indica en
        qué tema o pregunta lo has visto. Es la forma más rápida de que lo revisemos.
      </p>
    ),
  },
  {
    id: "oficial",
    pregunta: "¿Es una web oficial del Ayuntamiento de Zaragoza o de algún organismo?",
    respuesta: (
      <p>
        No. Es un proyecto independiente y no oficial, sin vinculación con el Ayuntamiento de
        Zaragoza ni con ningún otro organismo público. Más detalles en el{" "}
        <Link href="/aviso-legal" className="font-semibold text-brand-600 hover:underline">
          aviso legal
        </Link>
        .
      </p>
    ),
  },
  {
    id: "precio",
    pregunta: "¿Cuánto cuesta?",
    respuesta: <p>Nada, es gratuito. Si esto cambiara en el futuro, se avisaría con antelación.</p>,
  },
  {
    id: "mas-oposiciones",
    pregunta: "¿Vais a añadir más oposiciones?",
    respuesta: (
      <p>
        Sí, está previsto ampliar el catálogo. Cuando dos oposiciones comparten materia (por
        ejemplo, la Constitución Española), comparten también ese contenido, así que añadir
        oposiciones nuevas no significa empezar de cero cada vez.
      </p>
    ),
  },
  {
    id: "datos",
    pregunta: "¿Cómo tratáis mis datos si me registro?",
    respuesta: (
      <p>
        Lo explicamos con detalle en la{" "}
        <Link href="/privacidad" className="font-semibold text-brand-600 hover:underline">
          política de privacidad
        </Link>
        . Resumen: no se venden ni ceden a terceros, y puedes pedir que se eliminen tu cuenta y
        tus datos cuando quieras.
      </p>
    ),
  },
];

export default function FaqPage() {
  return (
    <>
      <Navbar />
      <PageHeader
        titulo="Preguntas frecuentes"
        descripcion="Cómo funciona la web, qué gana quien se registra, y de dónde sale el contenido."
      />

      <Container className="max-w-3xl py-12">
        <div className="flex flex-wrap gap-2">
          {PREGUNTAS.map((p) => (
            <a
              key={p.id}
              href={`#${p.id}`}
              className="rounded-full bg-brand-50 px-3.5 py-1.5 text-sm font-medium text-brand-700 hover:bg-brand-100"
            >
              {p.pregunta}
            </a>
          ))}
        </div>

        <div className="mt-8 space-y-4">
          {PREGUNTAS.map((p) => (
            <div key={p.id} id={p.id} className="scroll-mt-20">
              <Card className="p-6">
                <h2 className="text-lg font-bold text-brand-900">{p.pregunta}</h2>
                <div className="mt-2 text-slate-700 [&_a]:underline-offset-2 [&_li]:leading-relaxed [&_p]:leading-relaxed [&_ul]:mt-2">
                  {p.respuesta}
                </div>
              </Card>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-slate-600">
          ¿Tu pregunta no está aquí?{" "}
          <Link href="/contacto" className="font-semibold text-brand-600 hover:underline">
            Escríbenos
          </Link>
          .
        </p>
      </Container>
    </>
  );
}
