import Link from "next/link";
import { SITE } from "@/lib/site";

const ENLACES = [
  { href: "/blog", label: "Blog" },
  { href: "/contacto", label: "Contacto" },
  { href: "/aviso-legal", label: "Aviso legal" },
  { href: "/privacidad", label: "Privacidad" },
  { href: "/cookies", label: "Cookies" },
];

export function Footer() {
  return (
    <footer className="border-t border-brand-100 bg-white py-8 text-center text-sm text-slate-500">
      <p>
        © {new Date().getFullYear()} {SITE.nombre} · Proyecto en desarrollo local
      </p>
      <nav className="mt-2 flex flex-wrap items-center justify-center gap-x-1 gap-y-1">
        {ENLACES.map((enlace, i) => (
          <span key={enlace.href} className="flex items-center gap-1">
            {i > 0 && <span className="text-slate-300">·</span>}
            <Link href={enlace.href} className="font-medium text-brand-600 hover:underline">
              {enlace.label}
            </Link>
          </span>
        ))}
      </nav>
    </footer>
  );
}
