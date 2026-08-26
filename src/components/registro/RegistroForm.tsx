"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SITE, organismoAbreviado } from "@/lib/site";
import type { Oposicion } from "@/lib/types";

/** Valor especial del `<select>` de interés para "todas", que no es un slug real. */
const VALOR_TODAS = "__todas__";

function RegistroContent({ oposiciones }: { oposiciones: Oposicion[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextRoute = searchParams.get("next") || "/";

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verPassword, setVerPassword] = useState(false);
  const [interes, setInteres] = useState(VALOR_TODAS); // VALOR_TODAS | slug de una oposición
  const [newsletterOptin, setNewsletterOptin] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [exitoMsg, setExitoMsg] = useState<string | null>(null);

  // Redirigir si el usuario ya está autenticado
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) router.push(nextRoute);
    });
  }, [router, nextRoute]);

  async function handleRegistro(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setExitoMsg(null);

    if (!nombre.trim() || !email.trim() || !password.trim()) {
      setError("Por favor, rellena todos los campos.");
      return;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    setCargando(true);
    const supabase = createClient();

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(nextRoute)}`,
          data: {
            nombre: nombre.trim(),
            oposicion_interes: interes !== VALOR_TODAS ? interes : null,
            interes_todas_oposiciones: interes === VALOR_TODAS,
            newsletter_optin: newsletterOptin,
          },
        },
      });

      if (signUpError) {
        setError(signUpError.message);
      } else if (data.user) {
        // Si la confirmación de email está activa, `session` es null. Si
        // está inactiva, `session` ya viene poblada y el usuario queda logueado.
        if (data.session) {
          setExitoMsg("¡Registro completado con éxito! Redirigiéndote…");
          setTimeout(() => {
            router.push(nextRoute);
            router.refresh();
          }, 1500);
        } else {
          setExitoMsg(
            "¡Registro iniciado! Te hemos enviado un enlace de confirmación a tu correo electrónico. Por favor, revísalo para activar tu cuenta."
          );
          setNombre("");
          setEmail("");
          setPassword("");
          setInteres(VALOR_TODAS);
          setNewsletterOptin(false);
        }
      }
    } catch (err) {
      setError("Ocurrió un error inesperado. Inténtalo de nuevo más tarde.");
      console.error(err);
    } finally {
      setCargando(false);
    }
  }

  return (
    <div className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-radial from-brand-50 via-white to-white py-12">
      <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-brand-100 opacity-50 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-brand-200 opacity-30 blur-3xl" />

      <Container className="relative z-10 max-w-md">
        <Card className="border border-brand-100/50 bg-white/80 p-8 shadow-xl backdrop-blur-md">
          <div className="text-center">
            <span className="inline-grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-lg font-black text-white shadow-md">
              {SITE.iniciales}
            </span>
            <h1 className="mt-4 text-2xl font-bold tracking-tight text-brand-900">Crea tu cuenta</h1>
            <p className="mt-2 text-sm text-slate-500">
              Empieza hoy mismo a preparar tu oposición con nosotros
            </p>
          </div>

          {exitoMsg ? (
            <div className="mt-8 flex flex-col items-center gap-3 rounded-lg border border-emerald-100 bg-emerald-50 p-4 text-center text-sm font-medium text-emerald-800">
              <svg className="h-10 w-10 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{exitoMsg}</span>
              <Link href="/login" className="mt-2 font-bold text-brand-600 underline transition-colors hover:text-brand-800">
                Ir a Iniciar Sesión
              </Link>
            </div>
          ) : (
            <form onSubmit={handleRegistro} className="mt-8 space-y-5">
              <div>
                <label htmlFor="nombre" className="block text-xs font-semibold uppercase tracking-wider text-brand-800">
                  Nombre completo
                </label>
                <div className="mt-1.5">
                  <input
                    id="nombre"
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Tu nombre y apellidos"
                    required
                    className="w-full rounded-lg border border-brand-200 bg-white/50 px-4 py-2.5 text-slate-800 transition-all focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-brand-800">
                  Correo electrónico
                </label>
                <div className="mt-1.5">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ejemplo@correo.com"
                    required
                    className="w-full rounded-lg border border-brand-200 bg-white/50 px-4 py-2.5 text-slate-800 transition-all focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-brand-800">
                  Contraseña (mín. 6 caracteres)
                </label>
                <div className="relative mt-1.5">
                  <input
                    id="password"
                    type={verPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    minLength={6}
                    className="w-full rounded-lg border border-brand-200 bg-white/50 py-2.5 pr-10 pl-4 text-slate-800 transition-all focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                  />
                  <button
                    type="button"
                    onClick={() => setVerPassword(!verPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 transition-colors hover:text-brand-600"
                  >
                    {verPassword ? (
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="interes" className="block text-xs font-semibold uppercase tracking-wider text-brand-800">
                  ¿Qué oposición te interesa? <span className="font-normal normal-case text-slate-400">(opcional)</span>
                </label>
                <div className="mt-1.5">
                  <select
                    id="interes"
                    value={interes}
                    onChange={(e) => setInteres(e.target.value)}
                    className="w-full rounded-lg border border-brand-200 bg-white/50 px-4 py-2.5 text-slate-800 transition-all focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                  >
                    <option value={VALOR_TODAS}>Todas</option>
                    {oposiciones.map((o) => (
                      <option key={o.slug} value={o.slug}>
                        {/* Nombre + organismo abreviado: dos oposiciones pueden
                            compartir el mismo nombre de puesto (p. ej. "Auxiliar
                            Administrativo" en el Ayto. de Zaragoza y en la DPZ),
                            y sin el organismo las opciones serían indistinguibles. */}
                        {o.nombre} · {organismoAbreviado(o.slug, o.organismo)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <label htmlFor="newsletter" className="flex cursor-pointer items-start gap-2.5 text-sm text-slate-600">
                <input
                  id="newsletter"
                  type="checkbox"
                  checked={newsletterOptin}
                  onChange={(e) => setNewsletterOptin(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-brand-300 text-brand-600 focus:ring-brand-500/30"
                />
                <span>
                  Quiero recibir por email novedades, contenido de preparación y avisos comerciales.
                  Puedes darte de baja cuando quieras. Consulta cómo tratamos tus datos en la{" "}
                  <Link href="/privacidad" className="font-semibold text-brand-600 underline hover:text-brand-800">
                    política de privacidad
                  </Link>
                  .
                </span>
              </label>

              {error && (
                <div className="flex items-start gap-2 rounded-lg border border-rose-100 bg-rose-50 p-3 text-sm font-medium text-rose-600">
                  <svg className="h-5 w-5 shrink-0 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span>{error}</span>
                </div>
              )}

              <Button
                type="submit"
                disabled={cargando}
                variante="primario"
                className="w-full shadow-md shadow-brand-500/20 transition-transform active:scale-[0.98]"
              >
                {cargando ? "Creando cuenta…" : "Registrarme gratis"}
              </Button>
            </form>
          )}

          <p className="mt-5 text-center text-xs text-slate-400">
            Al registrarte, aceptas el{" "}
            <Link href="/aviso-legal" className="underline hover:text-brand-600">
              aviso legal
            </Link>{" "}
            y la{" "}
            <Link href="/privacidad" className="underline hover:text-brand-600">
              política de privacidad
            </Link>
            .
          </p>

          <div className="mt-6 border-t border-brand-100 pt-6 text-center">
            <p className="text-sm text-slate-500">
              ¿Ya tienes una cuenta?{" "}
              <Link
                href={`/login${searchParams.toString() ? `?${searchParams.toString()}` : ""}`}
                className="font-semibold text-brand-600 transition-colors hover:text-brand-800"
              >
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </Card>
      </Container>
    </div>
  );
}

export function RegistroForm({ oposiciones }: { oposiciones: Oposicion[] }) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[80vh] items-center justify-center bg-radial from-brand-50 via-white to-white" />
      }
    >
      <RegistroContent oposiciones={oposiciones} />
    </Suspense>
  );
}
