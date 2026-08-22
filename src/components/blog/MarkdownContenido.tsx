import ReactMarkdown from "react-markdown";

/**
 * Renderiza el markdown de un artículo. Sin `@tailwindcss/typography` (no
 * está instalado): se estilan los elementos anidados a mano con
 * selectores de descendiente de Tailwind v4, coherente con el resto del
 * sitio (paleta `brand-*`).
 */
export function MarkdownContenido({ contenido }: { contenido: string }) {
  return (
    <div
      className="
        max-w-none text-slate-700 leading-relaxed
        [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-brand-900
        [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-brand-900
        [&_p]:mt-4 [&_p:first-child]:mt-0
        [&_a]:font-medium [&_a]:text-brand-600 [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-brand-800
        [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:pl-6
        [&_li]:mt-1.5
        [&_strong]:font-semibold [&_strong]:text-brand-950
        [&_blockquote]:mt-4 [&_blockquote]:border-l-4 [&_blockquote]:border-brand-200 [&_blockquote]:pl-4 [&_blockquote]:text-slate-600 [&_blockquote]:italic
        [&_code]:rounded [&_code]:bg-brand-50 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm [&_code]:text-brand-800
        [&_img]:mt-4 [&_img]:rounded-xl [&_img]:border [&_img]:border-brand-100
        [&_hr]:mt-8 [&_hr]:border-brand-100
      "
    >
      <ReactMarkdown>{contenido}</ReactMarkdown>
    </div>
  );
}
