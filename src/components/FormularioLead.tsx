"use client";

import { useState } from "react";
import { ramos } from "@/data/ramos";

/**
 * Preparado para HubSpot:
 *  · Con NEXT_PUBLIC_HUBSPOT_PORTAL_ID y NEXT_PUBLIC_HUBSPOT_FORM_ID
 *    el envío va directo al Forms API.
 *  · Sin esas variables, envía a /api/lead.
 * Los nombres de campo coinciden con las propiedades por defecto del CRM.
 */

const PORTAL_ID = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID;
const FORM_ID = process.env.NEXT_PUBLIC_HUBSPOT_FORM_ID;

type Estado = "idle" | "enviando" | "ok" | "error";

export function FormularioLead({ ramoInicial }: { ramoInicial?: string }) {
  const [estado, setEstado] = useState<Estado>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEstado("enviando");
    const datos = Object.fromEntries(new FormData(e.currentTarget));

    try {
      if (PORTAL_ID && FORM_ID) {
        const res = await fetch(
          `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_ID}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              fields: Object.entries(datos)
                .filter(([, v]) => typeof v === "string" && v !== "")
                .map(([name, value]) => ({ name, value: String(value) })),
              context: { pageUri: window.location.href, pageName: document.title },
            }),
          },
        );
        if (!res.ok) throw new Error("HubSpot rechazó el envío");
      } else {
        const res = await fetch("/api/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(datos),
        });
        if (!res.ok) throw new Error("Error al enviar");
      }
      setEstado("ok");
    } catch {
      setEstado("error");
    }
  }

  if (estado === "ok") {
    return (
      <div className="bg-ok-soft materializa rounded-[var(--radius-card)] p-7 text-center">
        <p className="text-lg font-semibold">Recibido</p>
        <p className="mt-1.5 text-sm opacity-90">
          Te llamamos en horario laboral, normalmente el mismo día.
        </p>
      </div>
    );
  }

  const campo =
    "surface w-full rounded-[var(--radius-control)] border border-hair px-3.5 py-2.5 text-[0.95rem] text-fg outline-none transition-colors placeholder:text-[var(--fg-muted)] focus:border-[var(--accent)]";
  const etiqueta = "mb-1.5 block text-xs font-semibold text-fg";

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="firstname" className={etiqueta}>Nombre</label>
          <input id="firstname" name="firstname" required className={campo} placeholder="Tu nombre" />
        </div>
        <div>
          <label htmlFor="phone" className={etiqueta}>Teléfono</label>
          <input id="phone" name="phone" type="tel" required inputMode="tel" className={campo} placeholder="600 000 000" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className={etiqueta}>Email</label>
          <input id="email" name="email" type="email" required className={campo} placeholder="tu@email.com" />
        </div>
        <div>
          <label htmlFor="ramo" className={etiqueta}>Seguro que te interesa</label>
          <select id="ramo" name="ramo" defaultValue={ramoInicial ?? ""} className={campo}>
            <option value="">Selecciona uno</option>
            {ramos.map((r) => (
              <option key={r.slug} value={r.slug}>{r.nombreCorto}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="mensaje" className={etiqueta}>
          Cuéntanos tu caso <span className="font-normal text-dim">(opcional)</span>
        </label>
        <textarea id="mensaje" name="mensaje" rows={3} className={campo} placeholder="Edad, provincia, si vienes de otra compañía…" />
      </div>

      <label className="flex items-start gap-2.5 text-xs leading-relaxed text-dim">
        <input type="checkbox" name="rgpd" required className="mt-0.5 h-4 w-4 shrink-0 rounded border-hair" style={{ accentColor: "var(--accent)" }} />
        <span>
          Acepto la política de privacidad y que se traten mis datos para
          enviarme información sobre el seguro solicitado.
        </span>
      </label>

      {estado === "error" && (
        <p className="bg-highlight-soft rounded-lg px-3.5 py-2.5 text-xs">
          No hemos podido enviar el formulario. Prueba de nuevo o llámanos.
        </p>
      )}

      <button
        type="submit"
        disabled={estado === "enviando"}
        className="bg-accent pulsable w-full rounded-full px-5 py-3 text-[0.95rem] font-medium disabled:opacity-60"
      >
        {estado === "enviando" ? "Enviando…" : "Que me llamen"}
      </button>
    </form>
  );
}
