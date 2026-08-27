"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { SITE } from "@/lib/site";

interface NavLink {
  href: string;
  label: string;
  principal?: boolean;
}

interface Props {
  siteNombre: string;
  oposicion: { href: string; nombre: string } | null;
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
  const [menuMovilAbierto, setMenuMovilAbierto] = useState(false);
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

  // Cierra los desplegables y el menú móvil al cambiar de página. Se ajusta
  // durante el render (patrón recomendado por React para "resetear estado
  // cuando cambia una prop") en vez de con un useEffect, para no disparar
  // un render extra.
  const [pathnamePrevio, setPathnamePrevio] = useState(pathname);
  if (pathname !== pathnamePrevio) {
    setPathnamePrevio(pathname);
    setMenuUsuarioAbierto(false);
    setMasAbierto(false);
    setMenuMovilAbierto(false);
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
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/*
          El logo lleva al inicio de "donde estás": la home de la oposición
          activa si hay una, o la portada general si no. "Cambiar oposición"
          (más abajo) es un elemento aparte para el otro caso de uso —
          antes ambos enlazaban a "/", duplicando la misma acción.
        */}
        <Link
          href={oposicion ? oposicion.href : "/"}
          className="flex items-center gap-2 font-black text-brand-900"
          onClick={() => setMenuMovilAbierto(false)}
        >
          <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 text-xs font-black text-white shadow-sm">
            {SITE.iniciales}
          </span>
          <span className="hidden text-lg sm:inline">{siteNombre}</span>
        </Link>

        {/* Navegación de escritorio */}
        <nav className="hidden items-center gap-1 md:flex">
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

        {/* Botón hamburguesa (móvil) */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-brand-700 hover:bg-brand-50 md:hidden"
          aria-expanded={menuMovilAbierto}
          aria-controls="menu-movil"
          aria-label={menuMovilAbierto ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setMenuMovilAbierto((v) => !v)}
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
            {menuMovilAbierto ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Menú desplegable (móvil): todos los enlaces en una sola lista, sin
          agrupar bajo "Más" — aquí no hace falta ahorrar espacio horizontal. */}
      {menuMovilAbierto && (
        <div id="menu-movil" className="border-t border-brand-100 bg-white md:hidden">
          <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6 lg:px-8">
            <ul className="flex flex-col gap-1">
              {[...navPrincipales, ...navSecundarios].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuMovilAbierto(false)}
                    aria-current={esActivo(link.href) ? "page" : undefined}
                    className={`block rounded-lg px-3 py-2.5 text-base font-medium ${
                      esActivo(link.href) ? "bg-brand-50 text-brand-700" : "text-slate-700 hover:bg-brand-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}

              {oposicion && (
                <li>
                  <Link
                    href="/"
                    onClick={() => setMenuMovilAbierto(false)}
                    className="mt-1 block rounded-lg border border-brand-100 px-3 py-2.5 text-base font-medium text-brand-700 hover:bg-brand-50"
                  >
                    Cambiar oposición
                  </Link>
                </li>
              )}

              {!cargando && (
                <>
                  {usuario ? (
                    <>
                      <li className="mt-2 border-t border-brand-100 pt-2">
                        <Link
                          href="/perfil"
                          onClick={() => setMenuMovilAbierto(false)}
                          className="block rounded-lg px-3 py-2.5 text-base font-medium text-slate-600 transition-colors hover:bg-brand-50 hover:text-brand-700"
                        >
                          Mi perfil —{" "}
                          <span className="font-semibold text-brand-900">
                            {perfil?.nombre || usuario.email?.split("@")[0]}
                          </span>
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            setMenuMovilAbierto(false);
                            handleCerrarSesion();
                          }}
                          className="w-full cursor-pointer rounded-lg px-3 py-2.5 text-left text-base font-semibold text-rose-600 transition-colors hover:bg-rose-50"
                        >
                          Cerrar sesión
                        </button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="mt-2 border-t border-brand-100 pt-2">
                        <Link
                          href="/login"
                          onClick={() => setMenuMovilAbierto(false)}
                          className="block rounded-lg px-3 py-2.5 text-base font-medium text-slate-700 hover:bg-brand-50"
                        >
                          Iniciar sesión
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/registro"
                          onClick={() => setMenuMovilAbierto(false)}
                          className="mt-1 block rounded-lg bg-brand-600 px-3 py-2.5 text-center text-base font-semibold text-white hover:bg-brand-700"
                        >
                          Registrarse
                        </Link>
                      </li>
                    </>
                  )}
                </>
              )}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
