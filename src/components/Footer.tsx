import Link from "next/link";
import { Icono } from "./Iconos";
import { familias, site } from "@/data/site";
import { ramos } from "@/data/ramos";

export function Footer() {
  return (
    <footer className="border-t border-hair surface-2">
      <div className="wrap py-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_2.2fr]">
          <div>
            <p className="t-seccion text-fg">
              Comparador de Seguros
            </p>
            <p className="t-pie mt-3 max-w-xs text-dim">
              Coberturas, carencias y precios orientativos de las principales
              aseguradoras, uno al lado del otro.
            </p>
            <div className="toca mt-6 grid gap-2.5 text-sm">
              <a href={`tel:${site.telefonoHref}`} className="pulsable-suave flex items-center gap-2.5 font-medium text-fg">
                <Icono name="telefono" className="h-4 w-4 text-accent" />
                {site.telefono}
              </a>
              <a href={`mailto:${site.email}`} className="pulsable-suave flex items-center gap-2.5 text-dim hover:text-accent">
                <Icono name="mail" className="h-4 w-4 text-accent" />
                {site.email}
              </a>
              <p className="flex items-center gap-2.5 text-dim">
                <Icono name="reloj" className="h-4 w-4 text-accent" />
                {site.horario}
              </p>
            </div>
          </div>

          <div className="grid gap-7 sm:grid-cols-3">
            {familias.map((f) => (
              <div key={f.slug}>
                <p className="t-rotulo text-dim">
                  {f.corto}
                </p>
                <ul className="toca mt-3 grid gap-1.5">
                  {ramos
                    .filter((r) => r.familia === f.slug)
                    .map((r) => (
                      <li key={r.slug}>
                        <Link href={`/seguros/${r.slug}`} className="t-pie text-dim hover:text-accent">
                          {r.nombreCorto}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="t-pie mt-11 grid gap-4 border-t border-hair pt-6 text-dim sm:flex sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.nombre}</p>
          <div className="toca flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/contacto" className="hover:text-accent">Contacto</Link>
            <Link href="/como-funciona" className="hover:text-accent">Cómo funciona</Link>
            <Link href="/seguros" className="hover:text-accent">Todos los seguros</Link>
          </div>
        </div>

        <p className="mt-5 max-w-3xl text-[0.75rem] leading-relaxed text-dim opacity-80">
          {site.registro} Las comparativas son orientativas y no constituyen una
          oferta contractual: las coberturas, límites, carencias y primas
          definitivas son las que figuren en las condiciones particulares y
          generales de cada póliza. Las marcas y logotipos de las aseguradoras
          pertenecen a sus respectivos titulares.
        </p>
      </div>
    </footer>
  );
}
