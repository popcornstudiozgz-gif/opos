"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SITE } from "@/lib/site";

const INICIALES_SITIO = SITE.nombre.slice(0, 2).toUpperCase();

export default function ActualizarPasswordPage() {
  const router = useRouter();
  const [nuevaPass, setNuevaPass] = useState("");
  const [confirmarPass, setConfirmarPass] = useState("");
  const [cargando, setCargando] = useState(false);
  const [exito, setExito] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sesionValida, setSesionValida] = useState<boolean | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth
      .getUser()
      .then(({ data: { user } }) => setSesionValida(!!user))
      .catch(() => setSesionValida(false));
  }, []);

  async function handleActualizar(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (nuevaPass.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (nuevaPass !== confirmarPass) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setCargando(true);
    const supabase = createClient();
    const { error: authError } = await supabase.auth.updateUser({ password: nuevaPass });
    setCargando(false);

    if (authError) {
      setError(authError.message);
    } else {
      setExito(true);
      setTimeout(() => router.push("/perfil"), 2500);
    }
  }

  if (sesionValida === null) {
    return <div className="min-h-[80vh] bg-radial from-brand-50 via-white to-white" />;
  }

  if (!sesionValida) {
    return (
      <div className="flex min-h-[80vh] flex-col items-center justify-center gap-4 py-12 text-center">
        <p className="text-slate-600">El enlace de recuperación ha caducado o no es válido.</p>
        <Link href="/recuperar-password" className="font-semibold text-brand-600 transition-colors hover:text-brand-800">
          Solicitar un nuevo enlace
        </Link>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-radial from-brand-50 via-white to-white py-12">
      <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-brand-100 opacity-50 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-brand-200 opacity-30 blur-3xl" />

      <Container className="relative z-10 max-w-md">
        <Card className="border border-brand-100/50 bg-white/80 p-8 shadow-xl backdrop-blur-md">
          <div className="text-center">
            <span className="inline-grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-lg font-black text-white shadow-md">
              {INICIALES_SITIO}
            </span>
            <h1 className="mt-4 text-2xl font-bold tracking-tight text-brand-900">Nueva contraseña</h1>
            <p className="mt-2 text-sm text-slate-500">Elige una contraseña segura para tu cuenta.</p>
          </div>

          {exito ? (
            <div className="mt-8 flex flex-col items-center gap-3 rounded-lg border border-emerald-100 bg-emerald-50 p-5 text-center">
              <svg className="h-10 w-10 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm font-medium text-emerald-800">¡Contraseña actualizada! Redirigiendo a tu perfil…</p>
            </div>
          ) : (
            <form onSubmit={handleActualizar} className="mt-8 space-y-5">
              <div>
                <label htmlFor="nueva-pass" className="block text-xs font-semibold uppercase tracking-wider text-brand-800">
                  Nueva contraseña
                </label>
                <div className="mt-1.5">
                  <input
                    id="nueva-pass"
                    type="password"
                    value={nuevaPass}
                    onChange={(e) => setNuevaPass(e.target.value)}
                    placeholder="Mínimo 6 caracteres"
                    required
                    minLength={6}
                    autoComplete="new-password"
                    className="w-full rounded-lg border border-brand-200 bg-white/50 px-4 py-2.5 text-slate-800 transition-all focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="confirmar-pass" className="block text-xs font-semibold uppercase tracking-wider text-brand-800">
                  Confirmar contraseña
                </label>
                <div className="mt-1.5">
                  <input
                    id="confirmar-pass"
                    type="password"
                    value={confirmarPass}
                    onChange={(e) => setConfirmarPass(e.target.value)}
                    placeholder="Repite la contraseña"
                    required
                    autoComplete="new-password"
                    className="w-full rounded-lg border border-brand-200 bg-white/50 px-4 py-2.5 text-slate-800 transition-all focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-start gap-2 rounded-lg border border-rose-100 bg-rose-50 p-3 text-sm font-medium text-rose-600">
                  <svg className="h-5 w-5 shrink-0 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={cargando}
                className="flex w-full items-center justify-center rounded-lg bg-brand-600 px-5 py-2.5 font-semibold text-white shadow-md shadow-brand-500/20 transition-colors hover:bg-brand-700 disabled:opacity-60 active:scale-[0.98]"
              >
                {cargando ? "Actualizando…" : "Establecer nueva contraseña"}
              </button>
            </form>
          )}
        </Card>
      </Container>
    </div>
  );
}
