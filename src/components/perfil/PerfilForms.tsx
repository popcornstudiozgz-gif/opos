"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface Props {
  user: { id: string; email: string };
  perfil: { nombre: string | null; created_at: string } | null;
}

function getInitials(nombre: string | null, email: string): string {
  if (nombre?.trim()) {
    const partes = nombre.trim().split(/\s+/);
    return partes.length >= 2 ? (partes[0][0] + partes[1][0]).toUpperCase() : nombre.slice(0, 2).toUpperCase();
  }
  return email.slice(0, 2).toUpperCase();
}

type Msg = { tipo: "ok" | "error"; texto: string };

export function PerfilForms({ user, perfil }: Props) {
  const [nombre, setNombre] = useState(perfil?.nombre ?? "");
  const [guardandoNombre, setGuardandoNombre] = useState(false);
  const [msgNombre, setMsgNombre] = useState<Msg | null>(null);

  const [nuevaPass, setNuevaPass] = useState("");
  const [confirmarPass, setConfirmarPass] = useState("");
  const [guardandoPass, setGuardandoPass] = useState(false);
  const [msgPass, setMsgPass] = useState<Msg | null>(null);

  const initials = getInitials(perfil?.nombre ?? null, user.email);
  const fechaRegistro = perfil?.created_at
    ? new Date(perfil.created_at).toLocaleDateString("es-ES", { year: "numeric", month: "long" })
    : null;

  async function handleGuardarNombre(e: React.FormEvent) {
    e.preventDefault();
    if (!nombre.trim()) return;
    setGuardandoNombre(true);
    setMsgNombre(null);
    const supabase = createClient();
    const { error } = await supabase.from("profiles").update({ nombre: nombre.trim() }).eq("id", user.id);
    setGuardandoNombre(false);
    setMsgNombre(
      error
        ? { tipo: "error", texto: "No se pudo guardar. Inténtalo de nuevo." }
        : { tipo: "ok", texto: "Nombre actualizado correctamente." }
    );
  }

  async function handleCambiarPassword(e: React.FormEvent) {
    e.preventDefault();
    setMsgPass(null);
    if (nuevaPass.length < 6) {
      setMsgPass({ tipo: "error", texto: "La contraseña debe tener al menos 6 caracteres." });
      return;
    }
    if (nuevaPass !== confirmarPass) {
      setMsgPass({ tipo: "error", texto: "Las contraseñas no coinciden." });
      return;
    }
    setGuardandoPass(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password: nuevaPass });
    setGuardandoPass(false);
    if (error) {
      setMsgPass({ tipo: "error", texto: error.message });
    } else {
      setMsgPass({ tipo: "ok", texto: "Contraseña actualizada correctamente." });
      setNuevaPass("");
      setConfirmarPass("");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-5">
        <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-xl font-black text-white shadow-md">
          {initials}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-brand-900">{perfil?.nombre || user.email.split("@")[0]}</h1>
          <p className="text-sm text-slate-500">{user.email}</p>
          {fechaRegistro && <p className="mt-2 text-xs text-slate-400">Miembro desde {fechaRegistro}</p>}
        </div>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-brand-900">Nombre</h2>
        <form onSubmit={handleGuardarNombre} className="space-y-4">
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Tu nombre y apellidos"
            className="w-full rounded-lg border border-brand-200 bg-white px-4 py-2.5 text-slate-800 transition-all focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
          {msgNombre && (
            <p className={`text-sm font-medium ${msgNombre.tipo === "ok" ? "text-emerald-600" : "text-rose-600"}`}>
              {msgNombre.texto}
            </p>
          )}
          <button
            type="submit"
            disabled={guardandoNombre}
            className="rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-60"
          >
            {guardandoNombre ? "Guardando…" : "Guardar nombre"}
          </button>
        </form>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-brand-900">Cambiar contraseña</h2>
        <form onSubmit={handleCambiarPassword} className="space-y-4">
          <input
            type="password"
            value={nuevaPass}
            onChange={(e) => setNuevaPass(e.target.value)}
            placeholder="Nueva contraseña (mín. 6 caracteres)"
            autoComplete="new-password"
            className="w-full rounded-lg border border-brand-200 bg-white px-4 py-2.5 text-slate-800 transition-all focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
          <input
            type="password"
            value={confirmarPass}
            onChange={(e) => setConfirmarPass(e.target.value)}
            placeholder="Confirmar nueva contraseña"
            autoComplete="new-password"
            className="w-full rounded-lg border border-brand-200 bg-white px-4 py-2.5 text-slate-800 transition-all focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
          {msgPass && (
            <p className={`text-sm font-medium ${msgPass.tipo === "ok" ? "text-emerald-600" : "text-rose-600"}`}>
              {msgPass.texto}
            </p>
          )}
          <button
            type="submit"
            disabled={guardandoPass}
            className="rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-60"
          >
            {guardandoPass ? "Actualizando…" : "Cambiar contraseña"}
          </button>
        </form>
      </section>
    </div>
  );
}
