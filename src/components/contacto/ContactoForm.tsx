"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { enviarContacto, TIPOS_CONTACTO, type TipoContacto } from "@/lib/contacto";
import type { Oposicion } from "@/lib/types";

const ESTILO_CAMPO =
  "w-full rounded-lg border border-brand-100 bg-white px-3.5 py-2.5 text-sm text-brand-950 placeholder:text-slate-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100";

function Campo({
  id,
  label,
  opcional,
  children,
}: {
  id: string;
  label: string;
  opcional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-brand-900">
        {label}
        {opcional && <span className="ml-1 font-normal text-slate-400">(opcional)</span>}
      </label>
      {children}
    </div>
  );
}

type Estado = "editando" | "enviando" | "enviado" | "error";

export function ContactoForm({ oposiciones, oposicionInicial }: { oposiciones: Oposicion[]; oposicionInicial?: string }) {
  const [estado, setEstado] = useState<Estado>("editando");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [oposicionSlug, setOposicionSlug] = useState(oposicionInicial ?? "");
  const [tipo, setTipo] = useState<TipoContacto>("duda");
  const [referencia, setReferencia] = useState("");
  const [mensaje, setMensaje] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Campo trampa para bots: invisible para personas (fuera de pantalla,
    // sin tabIndex), si llega relleno se descarta el envío en silencio.
    const formData = new FormData(e.currentTarget);
    if (formData.get("web-sitio")) {
      setEstado("enviado");
      return;
    }

    setEstado("enviando");
    try {
      await enviarContacto({
        nombre,
        email,
        oposicionSlug: oposicionSlug || null,
        tipo,
        mensaje,
        referencia,
      });
      setEstado("enviado");
    } catch {
      setEstado("error");
    }
  }

  if (estado === "enviado") {
    return (
      <Card className="p-8 text-center">
        <p className="text-4xl">✅</p>
        <h2 className="mt-3 text-xl font-bold text-brand-900">Mensaje enviado</h2>
        <p className="mt-2 text-slate-600">
          Gracias por escribir. Lo revisaremos y, si has dejado tu correo, te responderemos en cuanto podamos.
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6 sm:p-8">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Honeypot: oculto a personas, visible para bots que rellenan todos los campos. */}
        <input
          type="text"
          name="web-sitio"
          tabIndex={-1}
          autoComplete="off"
          className="absolute left-[-9999px] h-0 w-0 opacity-0"
          aria-hidden="true"
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <Campo id="nombre" label="Nombre" opcional>
            <input
              id="nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className={ESTILO_CAMPO}
              maxLength={120}
            />
          </Campo>
          <Campo id="email" label="Correo electrónico">
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={ESTILO_CAMPO}
              placeholder="tucorreo@ejemplo.com"
              maxLength={200}
            />
          </Campo>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Campo id="oposicion" label="Oposición relacionada" opcional>
            <select
              id="oposicion"
              value={oposicionSlug}
              onChange={(e) => setOposicionSlug(e.target.value)}
              className={ESTILO_CAMPO}
            >
              <option value="">General (no es sobre una oposición en concreto)</option>
              {oposiciones.map((o) => (
                <option key={o.slug} value={o.slug}>
                  {o.nombre}
                </option>
              ))}
            </select>
          </Campo>
          <Campo id="tipo" label="Motivo">
            <select id="tipo" value={tipo} onChange={(e) => setTipo(e.target.value as TipoContacto)} className={ESTILO_CAMPO}>
              {TIPOS_CONTACTO.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </Campo>
        </div>

        {(tipo === "error_contenido" || tipo === "fallo_web") && (
          <Campo id="referencia" label="Enlace de la página o pregunta" opcional>
            <input
              id="referencia"
              type="text"
              value={referencia}
              onChange={(e) => setReferencia(e.target.value)}
              className={ESTILO_CAMPO}
              placeholder="Pega aquí la URL donde lo has visto, si la tienes a mano"
              maxLength={300}
            />
          </Campo>
        )}

        <Campo id="mensaje" label="Mensaje">
          <textarea
            id="mensaje"
            required
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            rows={6}
            className={ESTILO_CAMPO}
            placeholder="Cuéntanos con el detalle que puedas..."
            maxLength={4000}
          />
        </Campo>

        {estado === "error" && (
          <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            No se ha podido enviar el mensaje. Inténtalo de nuevo en un momento.
          </p>
        )}

        <Button type="submit" tamano="lg" className="w-full" disabled={estado === "enviando"}>
          {estado === "enviando" ? "Enviando..." : "Enviar mensaje"}
        </Button>
      </form>
    </Card>
  );
}
