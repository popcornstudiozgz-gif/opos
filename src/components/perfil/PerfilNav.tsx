"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ENLACES = [
  { href: "/perfil", label: "Mi cuenta", icono: "👤" },
  { href: "/perfil/temario", label: "Temario", icono: "📘" },
  { href: "/perfil/flashcards", label: "Flashcards", icono: "🃏" },
  { href: "/perfil/simulacros", label: "Simulacros", icono: "🎯" },
  { href: "/perfil/tests", label: "Tests", icono: "📝" },
  { href: "/perfil/casos-practicos", label: "Casos prácticos", icono: "⚖️" },
] as const;

interface Props {
  /** vertical = sidebar de escritorio; horizontal = barra de píldoras con scroll en móvil. */
  variante: "vertical" | "horizontal";
}

/**
 * Navegación de `/perfil/*`, compartida por `PerfilLayout` — mismo patrón de
 * dos variantes que `TemaExplorerLayout` (sidebar fijo en escritorio, barra
 * horizontal con scroll en móvil), pero como Client Component porque aquí sí
 * hace falta saber qué enlace está activo a partir de la URL actual
 * (`usePathname`): a diferencia de temario/test/flashcards, estas páginas no
 * reciben el "activo" ya resuelto por `searchParams` desde el servidor.
 */
export function PerfilNav({ variante }: Props) {
  const pathname = usePathname();
  // Coincidencia exacta para la raíz (si no, "/perfil" se marcaría activo en
  // cualquier subpágina); el resto usa prefijo para que /perfil/tests/[id]
  // también resalte "Tests".
  const activo = (href: string) => (href === "/perfil" ? pathname === "/perfil" : pathname.startsWith(href));

  if (variante === "horizontal") {
    return (
      <>
        {ENLACES.map((e) => (
          <Link
            key={e.href}
            href={e.href}
            className={`flex-shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              activo(e.href) ? "bg-brand-600 text-white" : "bg-brand-50 text-brand-700 hover:bg-brand-100"
            }`}
          >
            {e.icono} {e.label}
          </Link>
        ))}
      </>
    );
  }

  return (
    <nav className="flex-1 overflow-y-auto p-3">
      {ENLACES.map((e) => (
        <Link
          key={e.href}
          href={e.href}
          className={`mb-0.5 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
            activo(e.href) ? "bg-brand-600 text-white" : "text-slate-600 hover:bg-brand-50 hover:text-brand-700"
          }`}
        >
          <span className="text-base" aria-hidden>
            {e.icono}
          </span>
          {e.label}
        </Link>
      ))}
    </nav>
  );
}
