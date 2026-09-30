import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { DirectorioRamos } from "@/components/DirectorioRamos";
import { TiraCompanias } from "@/components/TiraCompanias";
import { BotonAdjuntar } from "@/components/AdjuntarPoliza";
import { MockupMovil } from "@/components/MockupMovil";
import { RamosDestacados } from "@/components/RamosDestacados";
import { Opiniones } from "@/components/Opiniones";
import { Icono } from "@/components/Iconos";
import { ramos } from "@/data/ramos";
import { fotoHero } from "@/data/fotos";
import { site } from "@/data/site";
import { colorDeRamo } from "@/data/colores";

export const metadata: Metadata = {
  title: "Comparador de seguros: salud, hogar, coche, vida y empresa",
  description: site.descripcion,
  alternates: { canonical: "/" },
};

/** Los que concentran casi todas las búsquedas. */
const buscados = ["automovil", "salud", "hogar", "vida", "decesos", "mascotas"];

const ventajas = [
  {
    i: "balanza",
    t: "Coberturas, no solo precios",
    d: "Copagos, carencias, franquicias y exclusiones de cada póliza, fila a fila.",
  },
  {
    i: "escudo",
    t: "Sin registro previo",
    d: "Toda la comparativa se ve sin dejar un solo dato tuyo.",
  },
  {
    i: "chat",
    t: "Asesoría sin coste",
    d: "Un corredor revisa contigo cuál encaja. Lo paga la aseguradora, no tú.",
  },
  {
    i: "reloj",
    t: "Alta y siniestros",
    d: "Tramitamos la póliza y te defendemos ante la compañía si hay un parte.",
  },
];

export default function Home() {
  return (
    <>
      {/* ================================================================= HERO */}
      <section className="relative isolate text-white">
        <div className="velo-foto absolute inset-0 overflow-hidden">
          <Image
            src={fotoHero}
            alt=""
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "50% 55%" }}
          />
        </div>

        <div className="wrap relative pb-28 pt-14 sm:pb-32 sm:pt-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_auto] lg:gap-16">
            {/* ------------------------------------------------------ Columna texto */}
            <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
              <p className="t-rotulo" style={{ color: "var(--color-agua-400)" }}>
                Comparador de seguros
              </p>
              <h1 className="t-display mt-3 text-balance">
                Compara seguros y entiende lo que firmas
              </h1>
              <p className="t-cuerpo mx-auto mt-5 max-w-xl text-pretty text-white/80 lg:mx-0">
                Copagos, carencias, franquicias y precio, uno al lado del otro.
                Sube tu póliza actual y te decimos en un minuto si te conviene
                cambiar. Sin registro, sin coste y sin llamadas que no hayas
                pedido.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                <Link
                  href="#elegir"
                  className="pulsable w-full rounded-full px-7 py-3.5 text-center text-[1rem] font-semibold sm:w-auto"
                  style={{ background: "var(--color-agua-400)", color: "#04222a" }}
                >
                  Comparar seguros
                </Link>
                <BotonAdjuntar />
              </div>

              <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2.5 lg:justify-start">
                {[
                  ["escudo", "Sin coste para ti"],
                  ["reloj", "Respuesta en 24 h"],
                  ["balanza", "17 ramos comparados"],
                ].map(([i, t]) => (
                  <li key={t} className="flex items-center gap-2 text-[0.875rem] text-white/85">
                    <Icono
                      name={i}
                      className="h-4 w-4 shrink-0"
                      style={{ color: "var(--color-agua-400)" }}
                    />
                    {t}
                  </li>
                ))}
              </ul>

              <a
                href={`tel:${site.telefonoHref}`}
                className="pulsable-suave mt-7 inline-flex min-h-[32px] items-center justify-center gap-2 text-[0.95rem] font-medium text-white/85"
              >
                <Icono name="telefono" className="h-4 w-4" />
                o llámanos al {site.telefono}
              </a>
            </div>

            {/* ------------------------------------------------------ Columna móvil */}
            <div className="hidden justify-self-center lg:block">
              <MockupMovil />
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================== Los más buscados */}
      <div className="wrap relative z-10 -mt-20">
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 sm:gap-4 xl:grid-cols-6">
          {buscados.map((slug) => {
            const r = ramos.find((x) => x.slug === slug)!;
            const c = colorDeRamo(slug);
            return (
              <li key={slug}>
                <Link
                  href={`/seguros/${slug}`}
                  className="caja-ramo"
                  style={{ background: c.tenue, color: c.oscuro }}
                >
                  <span className="caja-ramo-disco" style={{ color: c.base }} aria-hidden="true">
                    <Icono name={r.icono} className="h-6 w-6" strokeWidth={1.9} />
                  </span>
                  <span className="caja-ramo-nombre">{r.nombreCorto}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* ========================================================== Aseguradoras */}
      <div className="pt-12" />
      <TiraCompanias />

      {/* ============================================================ Directorio */}
      <section id="elegir" className="scroll-mt-20 border-b border-hair surface-2">
        <div className="wrap py-14">
          <div className="mb-7 flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="t-titulo text-fg">Elige qué comparar</h2>
            <p className="t-pie text-dim">
              Diecisiete ramos, de lo personal a lo empresarial
            </p>
          </div>
          <DirectorioRamos />
        </div>
      </section>

      {/* ====================================================== Qué cubre cada uno */}
      <RamosDestacados />

      {/* =============================================================== Ventajas */}
      <section className="wrap py-14">
        <div className="grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
          {ventajas.map((v) => (
            <div key={v.t}>
              <Icono name={v.i} className="h-6 w-6 text-accent" />
              <h2 className="t-titular mt-3.5 text-fg">{v.t}</h2>
              <p className="t-pie mt-1.5 text-dim">{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ Valoraciones */}
      <Opiniones />

      {/* ================================================================= Cierre */}
      <section className="relative isolate overflow-hidden text-white">
        <div className="velo-foto absolute inset-0 overflow-hidden">
          <Image
            src="/fotos/vida.webp"
            alt=""
            fill
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "50% 35%" }}
          />
        </div>
        <div className="wrap relative flex flex-col items-start justify-between gap-6 py-16 md:flex-row md:items-center">
          <div className="max-w-xl">
            <h2 className="t-titulo text-balance">
              ¿Prefieres que lo veamos contigo?
            </h2>
            <p className="t-cuerpo mt-3 text-pretty text-white/80">
              Un corredor revisa tu caso, te explica la letra pequeña y tramita
              el alta. Lo paga la aseguradora, no tú.
            </p>
          </div>
          <Link
            href="/contacto"
            className="pulsable shrink-0 rounded-full px-6 py-3.5 text-[0.95rem] font-semibold"
            style={{ background: "var(--color-agua-400)", color: "#04222a" }}
          >
            Que me asesoren
          </Link>
        </div>
      </section>
    </>
  );
}
