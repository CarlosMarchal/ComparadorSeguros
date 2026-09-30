import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ramos, ramoPorSlug } from "@/data/ramos";
import { productosPorRamo } from "@/data/productos";
import { site } from "@/data/site";
import { Comparador } from "@/components/Comparador";
import { FAQ } from "@/components/FAQ";
import { Boton, TituloSeccion } from "@/components/ui";
import { Icono } from "@/components/Iconos";
import { Foto } from "@/components/Foto";
import { CtaComparar } from "@/components/ModalContacto";
import { MockupMovil } from "@/components/MockupMovil";
import { Opiniones } from "@/components/Opiniones";
import { QueCubre } from "@/components/QueCubre";
import { faqsDe } from "@/data/faqs";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return ramos.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const ramo = ramoPorSlug(slug);
  if (!ramo) return {};
  return {
    title: `Comparar seguros ${ramo.paraTitulo}: coberturas y precios`,
    description: ramo.resumen,
    alternates: { canonical: `/seguros/${ramo.slug}` },
  };
}

export default async function RamoPage({ params }: Params) {
  const { slug } = await params;
  const ramo = ramoPorSlug(slug);
  if (!ramo) notFound();

  const productos = productosPorRamo(ramo.slug);
  const faqs = faqsDe(ramo);
  const otros = ramos.filter((r) => r.familia === ramo.familia && r.slug !== ramo.slug).slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: site.url },
          { "@type": "ListItem", position: 2, name: "Seguros", item: `${site.url}/seguros` },
          { "@type": "ListItem", position: 3, name: ramo.nombreCorto, item: `${site.url}/seguros/${ramo.slug}` },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.p,
          acceptedAnswer: { "@type": "Answer", text: f.r },
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ----------------------------------------------------------- Cabecera */}
      <section className="relative isolate text-white">
        <div className="velo-foto absolute inset-0 overflow-hidden">
          <Foto slug={ramo.slug} velo="ninguno" prioridad sizes="100vw" className="h-full w-full" />
        </div>

        <div className="wrap relative py-12 sm:py-16">
          <nav className="toca t-pie mb-6 flex items-center gap-1.5 text-white/70" aria-label="Migas de pan">
            <Link href="/" className="hover:text-white">Inicio</Link>
            <span>/</span>
            <Link href="/seguros" className="hover:text-white">Seguros</Link>
            <span>/</span>
            <span className="text-white">{ramo.nombreCorto}</span>
          </nav>

          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_auto] lg:gap-16">
            <div>
              <h1 className="t-display text-balance">
                Comparar seguros {ramo.paraTitulo}
              </h1>
              <p className="t-cuerpo mt-4 max-w-xl text-pretty text-white/80">
                {ramo.intro[0]}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {ramo.claves.map((c) => (
                  <span
                    key={c}
                    className="banda-borde inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[0.8125rem] font-medium text-white"
                  >
                    <Icono name="check" className="h-3 w-3 text-[var(--color-agua-400)]" />
                    {c}
                  </span>
                ))}
              </div>

              <div className="mt-8">
                <CtaComparar ramo={ramo.nombreCorto} frase={ramo.paraTitulo} />
              </div>
            </div>

            <div className="hidden justify-self-center lg:block">
              <MockupMovil ramo={ramo.nombreCorto} />
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ Qué cubre */}
      <QueCubre ramo={ramo} />

      {/* --------------------------------------------------------- Comparador */}
      {productos.length > 0 ? (
        <section className="wrap py-10 sm:py-12">
          <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="t-seccion text-fg">
              Las pólizas, una al lado de la otra
            </h2>
            <p className="t-pie text-dim">
              Precios orientativos · la prima final depende de tu perfil
            </p>
          </div>
          <Comparador ramo={ramo} productos={productos} />
        </section>
      ) : (
        <section className="wrap py-12">
          <div className="card p-8 text-center">
            <p className="text-base font-semibold text-fg">
              Este seguro se calcula siempre a medida
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm text-dim">
              Cuéntanos tu caso y preparamos una comparativa personalizada con
              las aseguradoras que mejor encajen.
            </p>
            <div className="mt-5 flex justify-center">
              <Boton href={`/contacto?ramo=${ramo.slug}`}>Pedir comparativa</Boton>
            </div>
          </div>
        </section>
      )}

      {/* ------------------------------------------------------------ Consejos */}
      {ramo.consejos.length > 0 && (
        <section className="border-y border-hair surface-2">
          <div className="wrap py-14">
            <TituloSeccion
              sobretitulo="Antes de firmar"
              titulo="Lo que de verdad hay que mirar"
            />
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {ramo.consejos.map((c) => (
                <div key={c.titulo} className="card p-5">
                  <h3 className="t-titular text-fg">{c.titulo}</h3>
                  <p className="t-pie mt-2 text-dim">{c.texto}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ----------------------------------------------------------------- FAQ */}
      <section className="wrap py-14">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,18rem)_1fr] lg:gap-14">
          <TituloSeccion
            sobretitulo="Dudas frecuentes"
            titulo={`Sobre el seguro de ${ramo.nombreCorto.toLowerCase()}`}
          />
          <FAQ items={faqs} />
        </div>
      </section>

      {/* ------------------------------------------------------ Valoraciones */}
      <Opiniones ramo={ramo.slug} titulo={`Clientes que compararon ${ramo.nombreCorto.toLowerCase()}`} />

      {/* -------------------------------------------------------- Otros ramos */}
      {otros.length > 0 && (
        <section className="wrap pb-16">
          <p className="t-rotulo text-dim">
            Comparar otro seguro
          </p>
          <div className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
            {otros.map((r) => (
              <Link
                key={r.slug}
                href={`/seguros/${r.slug}`}
                className="card pulsable-suave group flex items-center gap-3 p-4"
              >
                <Icono name={r.icono} className="h-5 w-5 shrink-0 text-accent" />
                <span className="text-sm font-semibold text-fg">{r.nombreCorto}</span>
                <Icono
                  name="flecha"
                  className="ml-auto h-4 w-4 text-dim"
                />
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
