import Link from "next/link";
import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-brand-100 bg-white py-8 text-center text-sm text-slate-500">
      © {new Date().getFullYear()} {SITE.nombre} · Proyecto en desarrollo local ·{" "}
      <Link href="/contacto" className="font-medium text-brand-600 hover:underline">
        Contacto
      </Link>
    </footer>
  );
}
