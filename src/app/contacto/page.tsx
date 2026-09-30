import type { Metadata } from "next";
import { FormularioLead } from "@/components/FormularioLead";
import { Icono } from "@/components/Iconos";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Que te asesoren",
  description:
    "Déjanos tu teléfono y un asesor te llama para revisar contigo qué seguro encaja con tu caso. Sin coste y sin compromiso.",
  alternates: { canonical: "/contacto" },
};

export default function ContactoPage() {
  return (
    <section className="wrap py-12 sm:py-16">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div className="min-w-0">
          <h1 className="t-display text-fg">
            Que te llamen y lo vean contigo
          </h1>
          <p className="t-cuerpo mt-3 max-w-md text-dim">
            Nos cuentas qué necesitas y te decimos qué compañía tiene sentido
            para tu caso. Sin coste, sin compromiso y sin insistir después.
          </p>

          <div className="mt-8 grid gap-2.5">
            <a href={`tel:${site.telefonoHref}`} className="card pulsable-suave flex min-w-0 items-center gap-4 p-4">
              <span className="bg-accent-soft grid h-10 w-10 place-items-center rounded-[12px]">
                <Icono name="telefono" className="h-5 w-5" />
              </span>
              <span>
                <span className="t-pie block text-dim">Teléfono</span>
                <span className="t-titular block text-fg">{site.telefono}</span>
              </span>
            </a>

            <a href={`mailto:${site.email}`} className="card pulsable-suave flex min-w-0 items-center gap-4 p-4">
              <span className="bg-accent-soft grid h-10 w-10 place-items-center rounded-[12px]">
                <Icono name="mail" className="h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="t-pie block text-dim">Email</span>
                <span className="t-titular block truncate text-fg">{site.email}</span>
              </span>
            </a>

            <div className="card flex min-w-0 items-center gap-4 p-4">
              <span className="bg-accent-soft grid h-10 w-10 place-items-center rounded-[12px]">
                <Icono name="reloj" className="h-5 w-5" />
              </span>
              <span>
                <span className="t-pie block text-dim">Horario</span>
                <span className="t-titular block text-fg">{site.horario}</span>
              </span>
            </div>
          </div>

          <p className="t-pie mt-6 text-dim">{site.registro}</p>
        </div>

        <div className="card p-6 shadow-[var(--sombra-card)] sm:p-8">
          <FormularioLead />
        </div>
      </div>
    </section>
  );
}
