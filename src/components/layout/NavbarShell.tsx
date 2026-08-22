"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

interface NavLink {
  href: string;
  label: string;
  principal?: boolean;
}

interface Props {
  siteNombre: string;
  oposicion: { slug: string; nombre: string } | null;
  navLinks: NavLink[];
}

interface Perfil {
  nombre: string | null;
}

/** Iniciales para el avatar del menú de usuario (nombre, o si no hay, el email). */
function iniciales(nombre?: string | null, email?: string | null): string {
  const base = nombre?.trim() || email?.split("@")[0] || "?";
  const partes = base.split(/\s+/).filter(Boolean);
  if (partes.length >= 2) return (partes[0][0] + partes[1][0]).toUpperCase();
  return base.slice(0, 2).toUpperCase();
}

export function NavbarShell({ siteNombre, oposicion, navLinks }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [menuUsuarioAbierto, setMenuUsuarioAbierto] = useState(false);
  const [masAbierto, setMasAbierto] = useState(false);
  const menuUsuarioRef = useRef<HTMLDivElement>(null);
  const masRef = useRef<HTMLDivElement>(null);

  const [usuario, setUsuario] = useState<User | null>(null);
  const [perfil, setPerfil] = useState<Perfil | null>(null);
  const [cargando, setCargando] = useState(true);

  const navPrincipales = navLinks.filter((l) => l.principal);
  const navSecundarios = navLinks.filter((l) => !l.principal);

  const esActivo = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const masActivo = navSecundarios.some((l) => esActivo(l.href));

  // Cierra los desplegables al cambiar de página. Se ajusta durante el
  // render (patrón recomendado por React para "resetear estado cuando
  // cambia una prop") en vez de con un useEffect, para no disparar un
  // render extra.
  const [pathnamePrevio, setPathnamePrevio] = useState(pathname);
  if (pathname !== pathnamePrevio) {
    setPathnamePrevio(pathname);
    setMenuUsuarioAbierto(false);
    setMasAbierto(false);
  }

  useEffect(() => {
    function alClicarFuera(e: MouseEvent) {
      if (menuUsuarioRef.current && !menuUsuarioRef.current.contains(e.target as Node)) {
        setMenuUsuarioAbierto(false);
      }
      if (masRef.current && !masRef.current.contains(e.target as Node)) {
        setMasAbierto(false);
      }
    }
    document.addEventListener("mousedown", alClicarFuera);
    return () => document.removeEventListener("mousedown", alClicarFuera);
  }, []);

  useEffect(() => {
    const supabase = createClient();

    async function cargarPerfil(uid: string) {
      try {
        const { data } = await supabase.from("profiles").select("nombre").eq("id", uid).single();
        if (data) setPerfil(data);
      } catch (err) {
        console.error("Error al cargar perfil:", err);
      }
    }

    async function inicializarSesion() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUsuario(user);
      if (user) await cargarPerfil(user.id);
      setCargando(false);
    }

    inicializarSesion();

    // El callback de onAuthStateChange se ejecuta mientras el cliente de
    // Supabase mantiene un lock interno de inicialización. Si desde aquí se
    // llama de forma síncrona a otro método del mismo cliente (como el
    // select de cargarPerfil), el cliente se queda esperándose a sí mismo y
    // se bloquea para siempre. Por eso el callback no es async y el trabajo
    // adicional se difiere con setTimeout, tal como recomienda Supabase.
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user ?? null;
      setUsuario(user);
      setCargando(false);
      if (user) {
        setTimeout(() => cargarPerfil(user.id), 0);
      } else {
        setPerfil(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleCerrarSesion() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-40 border-b border-brand-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl flex-wrap items-center justify-between gap-y-2 px-4 py-2 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-baseline gap-2 font-black text-brand-900">
          <span className="text-lg">{siteNombre}</span>
          {oposicion && (
            <span className="hidden text-sm font-medium text-slate-500 sm:inline">
              · {oposicion.nombre}
            </span>
          )}
        </Link>

        <nav className="flex flex-wrap items-center gap-1">
          {navPrincipales.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                esActivo(link.href)
                  ? "bg-brand-50 text-brand-700"
                  : "text-slate-600 hover:bg-brand-50 hover:text-brand-700"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {navSecundarios.length > 0 && (
            <div className="relative" ref={masRef}>
              <button
                type="button"
                onClick={() => setMasAbierto((v) => !v)}
                aria-expanded={masAbierto}
                aria-haspopup="menu"
                className={`flex cursor-pointer items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  masActivo ? "bg-brand-50 text-brand-700" : "text-slate-600 hover:bg-brand-50 hover:text-brand-700"
                }`}
              >
                Más
                <svg
                  className={`h-4 w-4 transition-transform ${masAbierto ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
                </svg>
              </button>
              {masAbierto && (
                <div
                  role="menu"
                  className="absolute top-full left-0 mt-1.5 w-52 rounded-lg border border-brand-100 bg-white py-1.5 shadow-lg"
                >
                  {navSecundarios.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      role="menuitem"
                      className={`block px-3.5 py-2 text-sm ${
                        esActivo(link.href)
                          ? "bg-brand-50 font-semibold text-brand-700"
                          : "text-slate-600 hover:bg-brand-50 hover:text-brand-700"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          {oposicion && (
            <Link
              href="/"
              className="ml-2 rounded-lg border border-brand-100 px-3 py-2 text-sm font-medium text-brand-700 hover:bg-brand-50"
            >
              Cambiar oposición
            </Link>
          )}

          {/* Bloque de autenticación */}
          {!cargando && (
            <div className="ml-2 border-l border-brand-100 pl-2">
              {usuario ? (
                <div className="relative" ref={menuUsuarioRef}>
                  <button
                    type="button"
                    onClick={() => setMenuUsuarioAbierto((v) => !v)}
                    aria-expanded={menuUsuarioAbierto}
                    aria-haspopup="menu"
                    className="flex cursor-pointer items-center gap-1.5 rounded-lg py-1 pr-1.5 pl-1 transition-colors hover:bg-brand-50"
                  >
                    <span
                      aria-hidden
                      className="grid h-8 w-8 place-items-center rounded-full bg-brand-600 text-xs font-bold text-white"
                    >
                      {iniciales(perfil?.nombre, usuario.email)}
                    </span>
                  </button>
                  {menuUsuarioAbierto && (
                    <div
                      role="menu"
                      className="absolute top-full right-0 mt-1.5 w-56 rounded-lg border border-brand-100 bg-white py-1.5 shadow-lg"
                    >
                      <p className="mb-1 border-b border-brand-50 px-3.5 py-2 text-xs text-slate-400">
                        Hola,{" "}
                        <span className="font-semibold text-brand-900">
                          {perfil?.nombre || usuario.email?.split("@")[0]}
                        </span>
                      </p>
                      <Link
                        href="/perfil"
                        role="menuitem"
                        className="block px-3.5 py-2 text-sm text-slate-600 hover:bg-brand-50 hover:text-brand-700"
                      >
                        Mi perfil
                      </Link>
                      <button
                        type="button"
                        role="menuitem"
                        onClick={handleCerrarSesion}
                        className="block w-full cursor-pointer px-3.5 py-2 text-left text-sm text-rose-600 hover:bg-rose-50"
                      >
                        Cerrar sesión
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <Link
                    href="/login"
                    className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-brand-50 hover:text-brand-700"
                  >
                    Iniciar sesión
                  </Link>
                  <Link
                    href="/registro"
                    className="rounded-lg bg-brand-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
                  >
                    Registrarse
                  </Link>
                </div>
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
