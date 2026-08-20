/** Cabecera de sección: título + subtítulo opcional, con variante centrada. */
export function SectionHeading({
  titulo,
  subtitulo,
  centrado = false,
}: {
  titulo: string;
  subtitulo?: string;
  centrado?: boolean;
}) {
  return (
    <div className={centrado ? "mx-auto max-w-2xl text-center" : ""}>
      <h2 className="text-2xl font-bold text-brand-900 sm:text-3xl">{titulo}</h2>
      {subtitulo && <p className="mt-3 text-slate-600">{subtitulo}</p>}
    </div>
  );
}
